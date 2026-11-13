import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GitBranch, Pause, Play, RotateCcw } from "lucide-react";
import {
  DAMPING,
  DOC,
  FINDINGS,
  lawCurves,
  SCHEDULE,
  STATIONS,
} from "@/lib/catalog";
import { HyperTearBay, maxStandoff, type Arm, type BayParams, type BaySample } from "@/lib/hypertear";
import { drawShell, RPM0, SHELL_ARCHIVE, type ShellDraw } from "@/lib/shell";

type Tab = "lattice" | "law" | "stations" | "shell" | "register";

const TABS: { id: Tab; label: string }[] = [
  { id: "lattice", label: "Live lattice" },
  { id: "law", label: "Distance law" },
  { id: "stations", label: "Stations" },
  { id: "shell", label: "Shell screen" },
  { id: "register", label: "Register" },
];

const ARMS: { id: Arm; label: string }[] = [
  { id: "null", label: "Null" },
  { id: "pd", label: "Mk-I PD" },
  { id: "vector", label: "Mk-II vector" },
];

type Branch = {
  id: string;
  label: string;
  arm: Arm;
  n: number;
  d: number;
  gamma: number;
  seed: number;
  tearReduction: number;
  fieldNulling: number;
  authRms: number;
  steps: number;
  finite: boolean;
};

const BRANCH_KEY = "elysium-branches-v1";

function sci(n: number) {
  if (!Number.isFinite(n)) return "—";
  const a = Math.abs(n);
  if (a !== 0 && (a < 0.001 || a >= 1000)) return n.toExponential(2);
  return a < 1 ? n.toFixed(4) : n.toFixed(2);
}

function pct(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(1)}%`;
}

function tone(v: number, peak: number) {
  const t = Math.max(-1, Math.min(1, peak > 0 ? v / peak : 0));
  const r = t >= 0 ? 18 + t * 183 : 14 + (1 + t) * 10;
  const g = t >= 0 ? 22 + t * 139 : 26 + (1 + t) * 12;
  const b = t >= 0 ? 20 + t * 70 : 22 + (1 + t) * 8;
  return `rgb(${r | 0} ${g | 0} ${b | 0})`;
}

export function Simulator() {
  const [tab, setTab] = useState<Tab>("lattice");
  return (
    <div className="min-h-screen text-parchment">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-brass">
              {DOC.id} · ASGARD RESTORATION
            </p>
            <h1 className="mt-1 font-serif text-3xl leading-tight text-parchment sm:text-4xl">
              Multiverse Research Simulator
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
              Elysium Tube, Phase-F. Each branch is a paired numerical universe of the same seed:
              a null lattice beside a driven station. Nothing here is thrust, shielding, or proof of
              a drive.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs text-mist sm:grid-cols-3">
            <div>
              <dt className="tracking-wide">Mass basis</dt>
              <dd className="text-parchment">{DOC.massMt} Mt</dd>
            </div>
            <div>
              <dt className="tracking-wide">Seed base</dt>
              <dd className="text-parchment">{DOC.seed}</dd>
            </div>
            <div>
              <dt className="tracking-wide">Archive</dt>
              <dd className="text-parchment">118 + 1e5</dd>
            </div>
          </dl>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6" aria-label="Sections">
          {TABS.map((item) => {
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => setTab(item.id)}
                className={
                  "min-h-11 shrink-0 border px-4 text-sm " +
                  (on
                    ? "border-brass bg-panel-2 text-parchment"
                    : "border-line bg-panel text-mist hover:text-parchment")
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {tab === "lattice" && <LatticeBay />}
        {tab === "law" && <LawPanel />}
        {tab === "stations" && <StationsPanel />}
        {tab === "shell" && <ShellPanel />}
        {tab === "register" && <RegisterPanel />}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-mist">
            Boundary. Every lattice quantity is dimensionless and non-credit. Nothing converts to
            force, thrust, gravity shielding, inertia relief, or structural tolerance. QGD off
            remains the safe state. The habitat must stay fully operable with the QGD layer
            removed, unpowered, or failed. Sources: Drive folder “Asgarde restoration project”
            (ELY-SYS-PF-QGD-001, phase_f_simulator) and{" "}
            <a
              className="text-brass underline decoration-brass-dim underline-offset-2"
              href="https://github.com/AndrewGE7/QGD"
            >
              AndrewGE7/QGD
            </a>
            . The GitHub reference is the N0 diffusion audit, not this second-order wave.
          </p>
        </div>
      </footer>
    </div>
  );
}

function LatticeBay() {
  const [n, setN] = useState(16);
  const [seed, setSeed] = useState<number>(DOC.seed);
  const [gamma, setGamma] = useState(0.08);
  const [d, setD] = useState(5);
  const [arm, setArm] = useState<Arm>("pd");
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hist, setHist] = useState<number[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [epoch, setEpoch] = useState(0);
  const [, bump] = useState(0);
  const playingRef = useRef(false);
  playingRef.current = playing;

  const dMax = maxStandoff(n);
  const dUse = Math.min(d, dMax);
  const params = useMemo<BayParams>(
    () => ({ n, seed: seed >>> 0, gamma, d: dUse, arm }),
    [n, seed, gamma, dUse, arm],
  );
  const bay = useMemo(() => new HyperTearBay(params), [params, epoch]);
  const sample: BaySample = bay.last;

  useEffect(() => {
    setPlaying(false);
    setHist([]);
  }, [bay]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BRANCH_KEY);
      if (raw) setBranches(JSON.parse(raw) as Branch[]);
    } catch {
      /* ignore a bad local cache */
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!playingRef.current || now - last < 40) return;
      last = now;
      const steps = bay.params.n >= 20 ? 1 : 2;
      let s = bay.last;
      for (let i = 0; i < steps; i++) s = bay.advance();
      setHist((prev) => {
        const next = prev.length > 140 ? prev.slice(prev.length - 140) : prev.slice();
        next.push(s.tearReduction);
        return next;
      });
      bump((v) => v + 1);
      if (!s.finite) setPlaying(false);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [bay]);

  const settle = () => {
    if (busy) return;
    setPlaying(false);
    setBusy(true);
    let left = 200;
    const chunk = () => {
      const take = Math.min(25, left);
      let s = bay.last;
      for (let i = 0; i < take; i++) s = bay.advance();
      left -= take;
      setHist((prev) => {
        const next = prev.length > 140 ? prev.slice(prev.length - 140) : prev.slice();
        next.push(s.tearReduction);
        return next;
      });
      bump((v) => v + 1);
      if (left > 0 && s.finite) window.setTimeout(chunk, 0);
      else setBusy(false);
    };
    chunk();
  };

  const fork = () => {
    if (sample.step === 0) return;
    const next: Branch = {
      id: `${Date.now()}`,
      label: `${arm === "null" ? "Null" : arm === "pd" ? "Mk-I" : "Mk-II"} · N=${n} · d=${dUse}`,
      arm,
      n,
      d: dUse,
      gamma,
      seed,
      tearReduction: sample.tearReduction,
      fieldNulling: sample.fieldNulling,
      authRms: sample.authRms,
      steps: sample.step,
      finite: sample.finite,
    };
    setBranches((prev) => {
      const list = [next, ...prev].slice(0, 6);
      localStorage.setItem(BRANCH_KEY, JSON.stringify(list));
      return list;
    });
  };

  const plane = bay.midplane();
  let peak = 1e-8;
  for (let i = 0; i < plane.length; i++) peak = Math.max(peak, Math.abs(plane[i] ?? 0));
  const tearX = Math.max(2, Math.min(4, Math.floor(n / 5)));
  const gy = Math.round((n - 1) / 2);
  const sx = Math.round(Math.min(n - 3, tearX + bay.params.d));

  const spark = hist
    .map((v, i) => {
      const x = hist.length < 2 ? 0 : (i / (hist.length - 1)) * 100;
      const y = 18 - Math.max(-1, Math.min(1, v)) * 14;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="grid gap-4 lg:grid-cols-[17rem_minmax(0,1fr)_16rem]">
      <section className="border border-line bg-panel p-4">
        <h2 className="font-mono text-xs tracking-widest text-brass">BAY CONTROLS</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Leapfrog on a {n}³ box, dt = 0.05. The archive is RK4 at 32³ and 64³. This bay will not
          reproduce those exponents.
        </p>
        <label className="mt-4 block text-xs tracking-wide text-mist">
          Arm
          <div className="mt-2 grid grid-cols-3 gap-1">
            {ARMS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={arm === item.id}
                onClick={() => setArm(item.id)}
                className={
                  "min-h-11 border px-1 text-xs " +
                  (arm === item.id ? "border-brass text-parchment" : "border-line text-mist")
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </label>
        <label className="mt-4 block text-xs tracking-wide text-mist">
          Lattice
          <select
            className="mt-2 min-h-11 w-full border border-line bg-ink px-2 text-sm text-parchment"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          >
            <option value={12}>12³ interactive</option>
            <option value={16}>16³ interactive</option>
            <option value={20}>20³ slower</option>
          </select>
        </label>
        <label className="mt-4 block text-xs tracking-wide text-mist">
          Damping γ
          <select
            className="mt-2 min-h-11 w-full border border-line bg-ink px-2 text-sm text-parchment"
            value={gamma}
            onChange={(e) => setGamma(Number(e.target.value))}
          >
            {DAMPING.map((row) => (
              <option key={row.gamma} value={row.gamma}>
                {row.gamma.toFixed(2)} · archive p = {row.p.toFixed(3)}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-xs tracking-wide text-mist">
          Standoff d = {dUse}
          <input
            className="mt-3 w-full accent-brass"
            type="range"
            min={3}
            max={dMax}
            value={dUse}
            onChange={(e) => setD(Number(e.target.value))}
          />
        </label>
        <label className="mt-4 block text-xs tracking-wide text-mist">
          Seed
          <input
            className="mt-2 min-h-11 w-full border border-line bg-ink px-2 font-mono text-sm text-parchment"
            type="number"
            min={0}
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-brass bg-panel-2 text-sm text-parchment"
            onClick={() => setPlaying((v) => !v)}
            disabled={busy || sample.finite === false}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Run"}
          </button>
          <button
            type="button"
            className="min-h-11 border border-line text-sm text-mist"
            onClick={settle}
            disabled={busy}
          >
            {busy ? "Settling…" : "Settle 200"}
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-line text-sm text-mist"
            onClick={() => {
              setPlaying(false);
              setEpoch((v) => v + 1);
            }}
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
        <p className="mt-2 text-xs text-mist">Reset rebuilds the pair from the seed. Change any control to do the same.</p>
        <button
          type="button"
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line text-sm text-mist"
          onClick={fork}
          disabled={sample.step === 0}
        >
          <GitBranch className="size-4" />
          Fork this reading
        </button>
      </section>

      <section className="border border-line bg-panel">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="font-mono text-xs tracking-widest text-brass">ACTIVE MIDPLANE</h2>
          <p className="font-mono text-xs text-mist">
            t = {sample.t.toFixed(2)} · step {sample.step}
          </p>
        </div>
        <div className="p-3">
          <div
            className="grid aspect-square w-full bg-ink"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            role="img"
            aria-label="Midplane of the active scalar field. A light edge marks the tear, a brass edge marks the station."
          >
            {Array.from(plane, (v, i) => {
              const x = i % n;
              const y = Math.floor(i / n);
              const mark = x === tearX && y === gy ? "parchment" : x === sx && y === gy ? "brass" : "";
              return (
                <div
                  key={i}
                  style={{
                    background: tone(v ?? 0, peak),
                    boxShadow:
                      mark === "brass"
                        ? "inset 0 0 0 1px var(--color-brass)"
                        : mark === "parchment"
                          ? "inset 0 0 0 1px var(--color-parchment)"
                          : undefined,
                  }}
                />
              );
            })}
          </div>
          <p className="mt-2 font-mono text-xs text-mist">
            Light edge: tear source. Brass edge: station. Bright is positive E, dark is negative.
          </p>
          <svg viewBox="0 0 100 28" className="mt-3 h-16 w-full" role="img" aria-label="Tear reduction history">
            <line x1="0" y1="18" x2="100" y2="18" stroke="var(--color-line)" strokeWidth="0.4" />
            {spark && (
              <polyline fill="none" stroke="var(--color-brass)" strokeWidth="0.8" points={spark} />
            )}
          </svg>
          <p className="font-mono text-xs text-mist">Tear reduction against the paired null. Zero line is no effect.</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="border border-line bg-panel p-4">
          <h2 className="font-mono text-xs tracking-widest text-brass">PAIRED READING</h2>
          <dl className="mt-3 space-y-3 font-mono text-sm">
            <Metric label="Tear reduction" value={pct(sample.tearReduction)} />
            <Metric label="Tear, active" value={sci(sample.tearActive)} />
            <Metric label="Tear, null" value={sci(sample.tearNull)} />
            <Metric label="Field nulling" value={`${sample.fieldNulling.toFixed(2)}×`} />
            <Metric label="Authority RMS" value={sci(sample.authRms)} />
            <Metric label="Finite" value={sample.finite === false ? "Left screen" : "Yes"} />
          </dl>
          {sample.step > 20 && sample.tearReduction < 0 && arm !== "null" && (
            <p className="mt-3 text-sm leading-relaxed text-mist">
              The mean is falling while the tear is not. That is QGD-003: a monopole channel does
              not observe the gradient. Mk-II in this bay is the geometry, not the archived
              resonator result.
            </p>
          )}
          {sample.finite === false && (
            <p className="mt-3 text-sm text-brass">
              Explicit step left the stability screen. Change a control to rebuild. QGD off is the safe state.
            </p>
          )}
        </div>
        <div className="border border-line bg-panel p-4">
          <h2 className="font-mono text-xs tracking-widest text-brass">FORKED BRANCHES</h2>
          {branches.length === 0 ? (
            <p className="mt-2 text-sm text-mist">
              Run, then fork. Up to six readings stay in this browser.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {branches.map((b) => (
                <li key={b.id} className="border-t border-line pt-2">
                  <p className="text-sm text-parchment">{b.label}</p>
                  <p className="font-mono text-xs text-mist">
                    tear {pct(b.tearReduction)} · nulling {b.fieldNulling.toFixed(2)}× · {b.steps} steps
                  </p>
                </li>
              ))}
            </ul>
          )}
          {branches.length > 0 && (
            <button
              type="button"
              className="mt-3 min-h-11 text-sm text-mist underline decoration-line underline-offset-2"
              onClick={() => {
                setBranches([]);
                localStorage.removeItem(BRANCH_KEY);
              }}
            >
              Clear branches
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs tracking-wide text-mist">{label}</dt>
      <dd className="text-parchment">{value}</dd>
    </div>
  );
}

function LawPanel() {
  const [gamma, setGamma] = useState(0.08);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { damp, lScreen, rows } = useMemo(() => lawCurves(gamma), [gamma]);
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section className="border border-line bg-panel p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl">Screened spreading, not a constant exponent</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-mist">
              Phase E reported p = 1.749. Phase F keeps 1.64–1.78 under grid scaling and shows the
              slope moves with damping. The 64³ steady state prefers e^(−d/l)/d.
            </p>
          </div>
          <label className="text-xs tracking-wide text-mist">
            γ for the model
            <select
              className="mt-2 min-h-11 border border-line bg-ink px-2 text-sm text-parchment"
              value={gamma}
              onChange={(e) => setGamma(Number(e.target.value))}
            >
              {DAMPING.map((row) => (
                <option key={row.gamma} value={row.gamma}>
                  {row.gamma.toFixed(2)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 h-72">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-line)" strokeDasharray="3 3" />
                <XAxis dataKey="d" stroke="var(--color-mist)" tick={{ fill: "var(--color-mist)", fontSize: 12 }} />
                <YAxis
                  stroke="var(--color-mist)"
                  tick={{ fill: "var(--color-mist)", fontSize: 12 }}
                  tickFormatter={(v: number) => v.toExponential(0)}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-panel)",
                    border: "1px solid var(--color-line)",
                    color: "var(--color-parchment)",
                    fontSize: 12,
                  }}
                  formatter={(value) => (typeof value === "number" ? value.toExponential(3) : "—")}
                />
                <Line type="monotone" dataKey="screened" name="Screened e^(−d/l)/d" stroke="var(--color-brass)" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="power" name="Local power law" stroke="var(--color-mist)" dot={false} strokeDasharray="4 3" />
                <Line type="monotone" dataKey="archive" name="64³ archive authority" stroke="var(--color-parchment)" connectNulls={false} dot={{ r: 3 }} strokeWidth={0} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full border border-line bg-ink" />
          )}
        </div>
        <p className="mt-3 text-sm text-mist">
          Brass is the screened form anchored at d = 6. Dashed is d^(−{damp.p.toFixed(3)}). Dots are
          the published 64³ PD authority and appear only at γ = 0.08. Decay length in view: l = {lScreen}.
          Dispersion-predicted length at this γ: {damp.lPred}.
        </p>
      </section>
      <section className="border border-line bg-panel p-4">
        <h2 className="font-mono text-xs tracking-widest text-brass">64³ PD SCHEDULE</h2>
        <p className="mt-2 text-sm text-mist">
          Pulse columns only allocate the 5 MJ / 50 MW / 0.1 s research envelope. They are not effect sizes.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead className="text-mist">
              <tr>
                <th className="py-2 text-left font-medium">d</th>
                <th className="py-2 text-right font-medium">Auth</th>
                <th className="py-2 text-right font-medium">/ law</th>
                <th className="py-2 text-right font-medium">MW</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row) => (
                <tr key={row.d} className="border-t border-line text-parchment">
                  <td className="py-2">{row.d}</td>
                  <td className="py-2 text-right">{row.auth.toExponential(2)}</td>
                  <td className="py-2 text-right">{row.vsLaw.toFixed(2)}</td>
                  <td className="py-2 text-right">{row.mw.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StationsPanel() {
  const [open, setOpen] = useState("m2");
  return (
    <div>
      <h2 className="font-serif text-2xl">Station architecture is the limit</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
        QGD-003 closed the controller-order action. Extra poles null the station average and miss
        the tear, which is a gradient. Mk-II is the research baseline. Mk-III is a candidate, not a
        tuned design. Explicit RK4 diverged at a dipole gain of 50.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {STATIONS.map((row) => {
          const on = open === row.id;
          return (
            <button
              key={row.id}
              type="button"
              aria-pressed={on}
              onClick={() => setOpen(row.id)}
              className={
                "border p-4 text-left " + (on ? "border-brass bg-panel-2" : "border-line bg-panel")
              }
            >
              <p className="font-mono text-xs tracking-widest text-brass">{row.channels} CH</p>
              <h3 className="mt-1 font-serif text-xl text-parchment">{row.name}</h3>
              <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs">
                <div>
                  <dt className="text-mist">Field null</dt>
                  <dd className="text-parchment">{row.fieldNull}</dd>
                </div>
                <div>
                  <dt className="text-mist">Tear</dt>
                  <dd className="text-parchment">{row.tear}</dd>
                </div>
                <div>
                  <dt className="text-mist">vs Mk-I</dt>
                  <dd className="text-parchment">{row.vsMk1}</dd>
                </div>
              </dl>
              {on && <p className="mt-3 text-sm leading-relaxed text-mist">{row.note}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShellPanel() {
  const [draw, setDraw] = useState<ShellDraw | null>(null);
  const [busy, setBusy] = useState(false);
  const run = () => {
    setBusy(true);
    window.setTimeout(() => {
      setDraw(drawShell(8000, DOC.seed));
      setBusy(false);
    }, 30);
  };
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl">Coupled shell screen, no QGD credit</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Habitat ring at 500 m, spin for 1 g ({RPM0.toFixed(3)} rpm nominal), laminate 1,600 kg/m³,
            30% ring allowance. The Phase-F proposal is 343 / 353 / 363 mm. Adopting 353 mm adds 2.08 Mt
            with reserve, for 226.84 Mt. ELY-MASS-E1 stays 224.76 Mt until that decision.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="min-h-11 border border-brass bg-panel px-4 text-sm text-parchment"
        >
          {busy ? "Drawing…" : "Draw 8,000 samples"}
        </button>
      </div>
      <div className="mt-4 overflow-x-auto border border-line">
        <table className="w-full text-sm">
          <thead className="bg-panel font-mono text-xs text-mist">
            <tr>
              <th className="px-3 py-3 text-left font-medium">Band</th>
              <th className="px-3 py-3 text-right font-medium">mm</th>
              <th className="px-3 py-3 text-right font-medium">Archive pass</th>
              <th className="px-3 py-3 text-right font-medium">Fresh draw</th>
              <th className="px-3 py-3 text-left font-medium">Record</th>
            </tr>
          </thead>
          <tbody>
            {SHELL_ARCHIVE.map((band) => {
              const live = draw?.bands.find((b) => b.key === band.key);
              return (
                <tr key={band.key} className="border-t border-line bg-panel">
                  <td className="px-3 py-3 text-parchment">{band.name}</td>
                  <td className="px-3 py-3 text-right font-mono text-mist">
                    {band.lower} / {band.nominal} / {band.upper}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-parchment">{band.pass.toFixed(1)}%</td>
                  <td className="px-3 py-3 text-right font-mono text-brass">
                    {live ? `${(live.pass * 100).toFixed(1)}%` : "—"}
                  </td>
                  <td className="px-3 py-3 text-mist">{band.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-mist">
        Gravity at 500 m passed 100% of the archived 100,000 samples (0.99–1.01 g).
        {draw ? ` This draw: ${(draw.gravityPass * 100).toFixed(1)}% of ${draw.samples.toLocaleString()}.` : " Draw a fresh sample to compare."}{" "}
        Worst-corner coupled requirement was 342.3 mm, 345.0 mm if the 20% dry-growth reserve lands on
        retained outfitting. Bearing N-2 holds at a 0.05% trim.
      </p>
    </div>
  );
}

function RegisterPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section>
        <h2 className="font-serif text-2xl">Findings carried from Phase F</h2>
        <ol className="mt-4 space-y-3">
          {FINDINGS.map((item) => (
            <li key={item.id} className="border border-line bg-panel p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm text-brass">{item.id}</h3>
                <p className="font-mono text-xs tracking-widest text-mist">{item.severity}</p>
              </div>
              <p className="mt-2 text-sm text-parchment">{item.finding}</p>
              <p className="mt-1 text-sm leading-relaxed text-mist">{item.disposition}</p>
            </li>
          ))}
        </ol>
      </section>
      <aside className="h-fit border border-line bg-panel p-4">
        <h2 className="font-mono text-xs tracking-widest text-brass">RECONCILED</h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          The Phase-F note was written before AndrewGE7/QGD could be opened. It is open now.
          N0 is a first-order symmetric diffusion audit on a unit cube. HyperTear Phase F is a
          second-order 26-neighbour wave, tear = |∇E|, RK4, dt = 0.05. They are not the same model.
        </p>
        <dl className="mt-4 space-y-2 font-mono text-xs text-mist">
          <div className="flex justify-between gap-3">
            <dt>Phase-E replay</dt>
            <dd className="text-parchment">p = {DOC.phaseE.p}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Amplitude a</dt>
            <dd className="text-parchment">{DOC.phaseE.a.toExponential(4)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Stencil check</dt>
            <dd className="text-parchment">{DOC.phaseE.stencil.toExponential(1)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Wave speed</dt>
            <dd className="text-parchment">0.729</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>λ at ω = 0.8</dt>
            <dd className="text-parchment">5.40</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Next package in the record: decide the shell, preregister the ring-down, add an implicit
          integrator and an absorbing boundary, then propagate Mk-II to the visualizers. A numerical
          pass cannot close a habitat gate.
        </p>
      </aside>
    </div>
  );
}
