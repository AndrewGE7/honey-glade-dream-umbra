/** Coupled shell-load screen from coupled_tolerance_mc.py.
 *  Conventional habitat structure only. No QGD credit.
 *  A fresh draw uses the same distributions; it is not the archived 100,000-sample file. */

const G0 = 9.80665;
const AREA = 2 * Math.PI * 500 * 18000;
const RHO = 1600;
const RING = 0.3;
const MU_FIXED = ((26.75 + 10.8 + 9 + 7.2) * 1e9) / AREA;
const P_ULT = 160e3;
const FS_SPIN = 1.5;
const ALLOW = 300e6;
const TARGET = 1.1;
export const RPM0 = (60 / (2 * Math.PI)) * Math.sqrt(G0 / 500);

export const SHELL_ARCHIVE = [
  {
    key: "d",
    name: "Phase-D band",
    lower: 293.6,
    nominal: 310,
    upper: 320,
    pass: 0,
    p001: 0.956,
    status: "Fail",
  },
  {
    key: "e1n",
    name: "E1 as nominal",
    lower: 328.3,
    nominal: 338.3,
    upper: 348.3,
    pass: 51.8,
    p001: 1.062,
    status: "Fail",
  },
  {
    key: "e1f",
    name: "E1 as floor",
    lower: 338.3,
    nominal: 348.3,
    upper: 358.3,
    pass: 97.3,
    p001: 1.093,
    status: "Marginal",
  },
  {
    key: "f",
    name: "Phase-F proposal",
    lower: 343,
    nominal: 353,
    upper: 363,
    pass: 100,
    p001: 1.107,
    status: "Proposed",
  },
] as const;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pEq(t: number, rho: number, muf: number, w2r: number) {
  return (1 + RING) * rho * t * w2r + muf * w2r;
}

function margin(t: number, r: number, w2r: number, rho: number, muf: number) {
  return (ALLOW * t) / ((P_ULT + FS_SPIN * pEq(t, rho, muf, w2r)) * r);
}

export type ShellDraw = {
  samples: number;
  gravityPass: number;
  bands: { key: string; pass: number }[];
};

const LIVE_BANDS = [
  { key: "d", lo: 0.293627, hi: 0.32 },
  { key: "e1n", lo: 0.3283, hi: 0.3483 },
  { key: "e1f", lo: 0.3383, hi: 0.3583 },
  { key: "f", lo: 0.343, hi: 0.363 },
];

export function drawShell(samples = 8000, seed = 20261112): ShellDraw {
  const rng = mulberry32(seed);
  const hits = LIVE_BANDS.map(() => 0);
  let gPass = 0;
  for (let i = 0; i < samples; i++) {
    const r = 499.5 + rng();
    const rpm = RPM0 - 0.003 + rng() * 0.006;
    const w = (rpm * 2 * Math.PI) / 60;
    const w2r = w * w * r;
    const rho = RHO * (0.95 + rng() * 0.1);
    const muf = MU_FIXED * (0.9 + rng() * 0.2);
    if (w2r / G0 >= 0.99 && w2r / G0 <= 1.01) gPass += 1;
    for (let b = 0; b < LIVE_BANDS.length; b++) {
      const band = LIVE_BANDS[b]!;
      const t = band.lo + rng() * (band.hi - band.lo);
      if (margin(t, r, w2r, rho, muf) >= TARGET) hits[b] = (hits[b] ?? 0) + 1;
    }
  }
  return {
    samples,
    gravityPass: gPass / samples,
    bands: LIVE_BANDS.map((band, i) => ({ key: band.key, pass: (hits[i] ?? 0) / samples })),
  };
}
