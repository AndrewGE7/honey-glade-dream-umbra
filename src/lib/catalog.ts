/** Published Phase-F record (ELY-SYS-PF-QGD-001, 12 Nov 2026).
 *  Dimensionless lattice quantities. Not an SI mapping. */

export const DOC = {
  id: "ELY-SYS-PF-QGD-001",
  date: "12 November 2026",
  massBasis: "ELY-MASS-E1",
  massMt: 224.76,
  proposedMassMt: 226.84,
  seed: 20261112,
  runs: "118 lattice runs + 100,000-sample Monte Carlo",
  phaseE: { a: 4.69732e-2, p: 1.7489, stencil: 1.4e-14 },
} as const;

export type ScheduleRow = {
  d: number;
  nullTear: number;
  auth: number;
  vsLaw: number;
  duty: number;
  mj: number;
  mw: number;
};

/** 64³, PD arm, steady-state window. Pulse columns allocate the 5 MJ / 50 MW / 0.1 s envelope. */
export const SCHEDULE: ScheduleRow[] = [
  { d: 3, nullTear: 1.65e-2, auth: 8.02e-3, vsLaw: 1.17, duty: 1, mj: 5, mw: 50 },
  { d: 4, nullTear: 1.28e-2, auth: 3.55e-3, vsLaw: 0.85, duty: 0.442, mj: 2.21, mw: 22.1 },
  { d: 5, nullTear: 9.78e-3, auth: 2.41e-3, vsLaw: 0.86, duty: 0.301, mj: 1.51, mw: 15.1 },
  { d: 6, nullTear: 7.59e-3, auth: 2.03e-3, vsLaw: 0.99, duty: 0.253, mj: 1.27, mw: 12.7 },
  { d: 7, nullTear: 6.06e-3, auth: 1.67e-3, vsLaw: 1.07, duty: 0.209, mj: 1.04, mw: 10.4 },
  { d: 8, nullTear: 4.95e-3, auth: 1.39e-3, vsLaw: 1.12, duty: 0.173, mj: 0.87, mw: 8.7 },
  { d: 9, nullTear: 4.12e-3, auth: 1.16e-3, vsLaw: 1.15, duty: 0.145, mj: 0.72, mw: 7.2 },
  { d: 12, nullTear: 2.54e-3, auth: 7.39e-4, vsLaw: 1.21, duty: 0.092, mj: 0.46, mw: 4.6 },
  { d: 16, nullTear: 1.46e-3, auth: 4.45e-4, vsLaw: 1.21, duty: 0.056, mj: 0.28, mw: 2.8 },
  { d: 20, nullTear: 9.06e-4, auth: 2.49e-4, vsLaw: 1, duty: 0.031, mj: 0.16, mw: 1.6 },
  { d: 24, nullTear: 5.85e-4, auth: 2.03e-4, vsLaw: 1.12, duty: 0.025, mj: 0.13, mw: 1.3 },
];

export const DAMPING = [
  { gamma: 0.04, p: 1.335, l: 31.6, lPred: 30.5 },
  { gamma: 0.08, p: 1.698, l: 10.4, lPred: 15.2 },
  { gamma: 0.16, p: 2.115, l: 5.7, lPred: 7.6 },
] as const;

export const SCREENED_L_64 = 18.1;

export type StationRow = {
  id: string;
  name: string;
  channels: string;
  fieldNull: string;
  tear: string;
  vsMk1: string;
  note: string;
};

export const STATIONS: StationRow[] = [
  {
    id: "m1",
    name: "Mk-I monopole, PD",
    channels: "1",
    fieldNull: "2.2×",
    tear: "0.4 to 6.5%",
    vsMk1: "1×",
    note: "Phase-E single channel. It senses and drives the field average. Gains kp = 2.2, kd = 1.4.",
  },
  {
    id: "m1r",
    name: "Mk-I monopole, PD + resonator",
    channels: "1",
    fieldNull: "17 to 1,349×",
    tear: "−3.7 to +3.3%",
    vsMk1: "0.9×",
    note: "Raising controller order nulls the station-averaged field and leaves the tear metric almost unchanged.",
  },
  {
    id: "m2",
    name: "Mk-II vector, PD + resonator",
    channels: "4",
    fieldNull: "same band",
    tear: "6 to 17%",
    vsMk1: "2.0 to 3.9×",
    note: "Monopole plus three gradient channels. Research baseline. A half-frequency check did not improve it (12.6% vs 14.1%).",
  },
  {
    id: "m3",
    name: "Mk-III cage, R = 5",
    channels: "80",
    fieldNull: "1.3 to 2.2×",
    tear: "14 to 38%",
    vsMk1: "14 to 24×",
    note: "Enclosing patches. Gains were not tuned: explicit RK4 goes unstable at high gain. Single seeds, one or two ranges.",
  },
];

export type Finding = {
  id: string;
  severity: string;
  finding: string;
  disposition: string;
};

export const FINDINGS: Finding[] = [
  {
    id: "QGD-002",
    severity: "Revised",
    finding: "Exponent holds at 32³ / 64³ (1.64–1.78) but tracks lattice damping (1.34 to 2.12).",
    disposition:
      "Withdraw 1.749 as a standalone prediction. Preregister e^(−d/l)/d with l measured on a ring-down before any active trial.",
  },
  {
    id: "QGD-003",
    severity: "Recast",
    finding: "Controller order nulls the field, not the tear metric. The limit is actuator geometry.",
    disposition: "Close the controller-order action. Mk-II vector station is the research baseline. Mk-III cage is the candidate.",
  },
  {
    id: "QGD-005",
    severity: "New",
    finding: "Authority is 1.04–1.14× the uncontrolled station field at every range.",
    disposition: "Local closed-loop control replaces the range schedule. Range knowledge is retired as a controlling tolerance.",
  },
  {
    id: "QGD-006",
    severity: "New",
    finding: "The 21³ periodic box contaminates steady state. The station sees the tear’s images.",
    disposition: "32³ minimum for steady-state work. Absorbing boundary before extending past d = 24.",
  },
  {
    id: "QGD-004",
    severity: "Open",
    finding: "No mapping from lattice authority to any SI quantity.",
    disposition: "Unchanged. Section 12 gates only. Force, thrust and shielding stay undefined.",
  },
  {
    id: "STR-002",
    severity: "Open",
    finding: "310 mm band passes 0%. A band floored at 338.3 mm passes 97.3%.",
    disposition: "Allocation 343 / 353 / 363 mm proposed, +2.08 Mt, awaiting a configuration decision. Mass ledger not changed.",
  },
  {
    id: "BRG-002",
    severity: "Holds",
    finding: "Bearing N-2 worst-normal 2.16 on the E1 basis, 2.14 with the thicker shell.",
    disposition: "0.05% trim retained.",
  },
];

export function lawCurves(gamma: number) {
  const damp = DAMPING.find((row) => row.gamma === gamma) ?? DAMPING[1];
  const anchor = SCHEDULE.find((row) => row.d === 6)!;
  const lScreen = gamma === 0.08 ? SCREENED_L_64 : damp.l;
  const rows = [];
  for (let d = 3; d <= 24; d++) {
    const screenedShape = Math.exp(-d / lScreen) / d;
    const anchorScreen = Math.exp(-6 / lScreen) / 6;
    const powerShape = d ** -damp.p;
    const anchorPower = 6 ** -damp.p;
    const archive = gamma === 0.08 ? (SCHEDULE.find((row) => row.d === d)?.auth ?? null) : null;
    rows.push({
      d,
      archive,
      screened: (anchor.auth * screenedShape) / anchorScreen,
      power: (anchor.auth * powerShape) / anchorPower,
    });
  }
  return { damp, lScreen, rows };
}
