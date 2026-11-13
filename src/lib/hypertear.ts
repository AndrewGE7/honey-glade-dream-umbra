/** Interactive HyperTear bay.
 *
 * Second-order lattice from the Phase-F NumPy reference
 * (d²E/dt² = c² L26(E) − γ dE/dt + S + A), reduced for the browser:
 * leapfrog at dt = 0.05, N ≤ 20, local monopole or four-channel vector station.
 * Archive tables elsewhere are the published RK4 campaign. This bay is not that
 * campaign and carries no vehicle credit. Every quantity is dimensionless.
 */

export const WSUM = 6 + 12 * 0.5 + 8 / 3;
export const WAVE_C = 0.35;
export const DRIVE_OMEGA = 0.8;

export type Arm = "null" | "pd" | "vector";

export type BayParams = {
  n: number;
  seed: number;
  gamma: number;
  /** Standoff in lattice cells from the tear source. */
  d: number;
  arm: Arm;
};

export type BaySample = {
  step: number;
  t: number;
  tearActive: number;
  tearNull: number;
  /** 1 − tearActive/tearNull. Negative means the drive increased the tear. */
  tearReduction: number;
  fieldActive: number;
  fieldNull: number;
  /** |null| / max(|active|, ε). How hard the station nulls its own average. */
  fieldNulling: number;
  authRms: number;
  finite: boolean;
};

type Cell = { i: number; shape: number; w: number };

const DT = 0.05;
const KP = 2.2;
const KD = 1.4;
const GDIP = 0.85;
const TEAR_AMP = 0.05;
const TEAR_SIGMA = 1.2;
const ST_SIGMA = 1.5;
const NOISE = 1e-3;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function idx(n: number, x: number, y: number, z: number) {
  return (z * n + y) * n + x;
}

function buildBlob(
  n: number,
  cx: number,
  cy: number,
  cz: number,
  sigma: number,
  rad = 6,
): Cell[] {
  const raw: { i: number; g: number }[] = [];
  const x0 = Math.max(0, Math.floor(cx) - rad);
  const x1 = Math.min(n - 1, Math.ceil(cx) + rad);
  const y0 = Math.max(0, Math.floor(cy) - rad);
  const y1 = Math.min(n - 1, Math.ceil(cy) + rad);
  const z0 = Math.max(0, Math.floor(cz) - rad);
  const z1 = Math.min(n - 1, Math.ceil(cz) + rad);
  let max = 0;
  for (let z = z0; z <= z1; z++) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const r2 = (x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2;
        const g = Math.exp(-r2 / (2 * sigma * sigma));
        if (g < 1e-6) continue;
        if (g > max) max = g;
        raw.push({ i: idx(n, x, y, z), g });
      }
    }
  }
  if (max === 0 || raw.length === 0) return [];
  let sum = 0;
  const shaped = raw.map((c) => {
    const shape = c.g / max;
    sum += shape;
    return { i: c.i, shape };
  });
  return shaped.map((c) => ({
    i: c.i,
    shape: c.shape,
    w: c.shape / sum,
  }));
}

function laplacian(e: Float64Array, out: Float64Array, n: number) {
  const n2 = n * n;
  for (let z = 0; z < n; z++) {
    const zm = ((z + n - 1) % n) * n2;
    const z0 = z * n2;
    const zp = ((z + 1) % n) * n2;
    for (let y = 0; y < n; y++) {
      const ym = ((y + n - 1) % n) * n;
      const y0 = y * n;
      const yp = ((y + 1) % n) * n;
      const row = z0 + y0;
      for (let x = 0; x < n; x++) {
        const xm = (x + n - 1) % n;
        const xp = (x + 1) % n;
        const c = e[row + x]!;
        let s = 0;
        s += e[z0 + y0 + xm]! + e[z0 + y0 + xp]!;
        s += e[z0 + ym + x]! + e[z0 + yp + x]!;
        s += e[zm + y0 + x]! + e[zp + y0 + x]!;
        s +=
          0.5 *
          (e[z0 + ym + xm]! +
            e[z0 + ym + xp]! +
            e[z0 + yp + xm]! +
            e[z0 + yp + xp]! +
            e[zm + y0 + xm]! +
            e[zm + y0 + xp]! +
            e[zp + y0 + xm]! +
            e[zp + y0 + xp]! +
            e[zm + ym + x]! +
            e[zm + yp + x]! +
            e[zp + ym + x]! +
            e[zp + yp + x]!);
        s +=
          (1 / 3) *
          (e[zm + ym + xm]! +
            e[zm + ym + xp]! +
            e[zm + yp + xm]! +
            e[zm + yp + xp]! +
            e[zp + ym + xm]! +
            e[zp + ym + xp]! +
            e[zp + yp + xm]! +
            e[zp + yp + xp]!);
        out[row + x] = s - WSUM * c;
      }
    }
  }
}

function dotW(field: Float64Array, cells: Cell[], pick: (c: Cell) => number) {
  let s = 0;
  for (const c of cells) s += pick(c) * field[c.i]!;
  return s;
}

function gradientTear(e: Float64Array, cells: Cell[], n: number) {
  const n2 = n * n;
  let s = 0;
  for (const c of cells) {
    const z = Math.floor(c.i / n2);
    const y = Math.floor((c.i - z * n2) / n);
    const x = c.i - z * n2 - y * n;
    const xm = (x + n - 1) % n;
    const xp = (x + 1) % n;
    const ym = (y + n - 1) % n;
    const yp = (y + 1) % n;
    const zm = (z + n - 1) % n;
    const zp = (z + 1) % n;
    const gx = 0.5 * (e[idx(n, xp, y, z)]! - e[idx(n, xm, y, z)]!);
    const gy = 0.5 * (e[idx(n, x, yp, z)]! - e[idx(n, x, ym, z)]!);
    const gz = 0.5 * (e[idx(n, x, y, zp)]! - e[idx(n, x, y, zm)]!);
    s += c.w * Math.sqrt(gx * gx + gy * gy + gz * gz);
  }
  return s;
}

type World = { e: Float64Array; v: Float64Array };

export class HyperTearBay {
  params: BayParams;
  source: Cell[];
  station: Cell[];
  dipAmp: [Float64Array, Float64Array, Float64Array];
  active: World;
  nullWorld: World;
  lap: Float64Array;
  step = 0;
  t = 0;
  authSq = 0;
  finite = true;
  last: BaySample;

  constructor(params: BayParams) {
    this.params = params;
    const n = params.n;
    const mid = (n - 1) / 2;
    const tearX = Math.max(2, Math.min(4, Math.floor(n / 5)));
    this.source = buildBlob(n, tearX, mid, mid, TEAR_SIGMA);
    const sx = Math.min(n - 3, tearX + params.d);
    this.station = buildBlob(n, sx, mid, mid, ST_SIGMA);
    this.dipAmp = [0, 1, 2].map(() => new Float64Array(this.station.length)) as [
      Float64Array,
      Float64Array,
      Float64Array,
    ];
    this.station.forEach((c, k) => {
      const z = Math.floor(c.i / (n * n));
      const y = Math.floor((c.i - z * n * n) / n);
      const x = c.i - z * n * n - y * n;
      this.dipAmp[0][k] = ((x - sx) / ST_SIGMA) * c.shape;
      this.dipAmp[1][k] = ((y - mid) / ST_SIGMA) * c.shape;
      this.dipAmp[2][k] = ((z - mid) / ST_SIGMA) * c.shape;
    });
    const len = n * n * n;
    const rng = mulberry32(params.seed >>> 0);
    const e0 = new Float64Array(len);
    for (let i = 0; i < len; i++) e0[i] = NOISE * gaussian(rng);
    this.active = { e: e0, v: new Float64Array(len) };
    this.nullWorld = { e: new Float64Array(e0), v: new Float64Array(len) };
    this.lap = new Float64Array(len);
    this.last = this.sample();
  }

  private accel(world: World, driven: boolean) {
    const { gamma, arm } = this.params;
    const e = world.e;
    const v = world.v;
    laplacian(e, this.lap, this.params.n);
    const c2 = WAVE_C * WAVE_C;
    const src = TEAR_AMP * Math.sin(DRIVE_OMEGA * this.t);
    const n = e.length;
    const acc = new Float64Array(n);
    for (let i = 0; i < n; i++) acc[i] = c2 * this.lap[i]! - gamma * v[i]!;
    for (const c of this.source) acc[c.i] = (acc[c.i] ?? 0) + src * c.shape;

    let a0 = 0;
    if (driven && arm !== "null" && this.station.length) {
      const eMon = dotW(e, this.station, (c) => c.w);
      const vMon = dotW(v, this.station, (c) => c.w);
      a0 = -(KP * eMon + KD * vMon);
      for (const c of this.station) acc[c.i] = (acc[c.i] ?? 0) + a0 * c.shape;
      if (arm === "vector") {
        for (let ch = 0; ch < 3; ch++) {
          const amp = this.dipAmp[ch]!;
          let es = 0;
          let vs = 0;
          let norm = 0;
          for (let k = 0; k < this.station.length; k++) {
            const dip = amp[k]!;
            const i = this.station[k]!.i;
            es += dip * e[i]!;
            vs += dip * v[i]!;
            norm += dip * dip;
          }
          const inv = norm > 0 ? 1 / norm : 0;
          const a = -GDIP * (KP * es * inv + KD * vs * inv);
          for (let k = 0; k < this.station.length; k++) {
            const i = this.station[k]!.i;
            acc[i] = (acc[i] ?? 0) + a * amp[k]!;
          }
        }
      }
    }
    return { acc, a0 };
  }

  /** One leapfrog step on the paired active and null worlds. */
  advance() {
    if (!this.finite) return this.last;
    const dt = DT;
    const kick = (world: World, acc: Float64Array) => {
      const v = world.v;
      const e = world.e;
      for (let i = 0; i < e.length; i++) {
        v[i] = (v[i] ?? 0) + dt * (acc[i] ?? 0);
        e[i] = (e[i] ?? 0) + dt * (v[i] ?? 0);
        if (!Number.isFinite(e[i]!) || Math.abs(e[i]!) > 40) this.finite = false;
      }
    };
    const aAct = this.accel(this.active, true);
    const aNull = this.accel(this.nullWorld, false);
    kick(this.active, aAct.acc);
    kick(this.nullWorld, aNull.acc);
    this.authSq += aAct.a0 * aAct.a0;
    this.step += 1;
    this.t += dt;
    this.last = this.sample();
    return this.last;
  }

  sample(): BaySample {
    const tearActive = gradientTear(this.active.e, this.station, this.params.n);
    const tearNull = gradientTear(this.nullWorld.e, this.station, this.params.n);
    const fieldActive = dotW(this.active.e, this.station, (c) => c.w);
    const fieldNull = dotW(this.nullWorld.e, this.station, (c) => c.w);
    const tearReduction = tearNull > 1e-12 ? 1 - tearActive / tearNull : 0;
    const fieldNulling = Math.abs(fieldNull) / Math.max(Math.abs(fieldActive), 1e-9);
    const authRms = this.step > 0 ? Math.sqrt(this.authSq / this.step) : 0;
    return {
      step: this.step,
      t: this.t,
      tearActive,
      tearNull,
      tearReduction,
      fieldActive,
      fieldNull,
      fieldNulling,
      authRms,
      finite: this.finite,
    };
  }

  /** Mid-plane of the active field, row-major y-major x, length n*n. z = floor(n/2). */
  midplane(): Float64Array {
    const n = this.params.n;
    const z = Math.floor(n / 2);
    const out = new Float64Array(n * n);
    const base = z * n * n;
    for (let i = 0; i < n * n; i++) out[i] = this.active.e[base + i]!;
    return out;
  }
}

export function maxStandoff(n: number) {
  const tearX = Math.max(2, Math.min(4, Math.floor(n / 5)));
  return Math.max(3, Math.min(9, n - tearX - 3));
}
