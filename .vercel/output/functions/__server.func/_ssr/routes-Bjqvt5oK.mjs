import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as GitBranch, i as Pause, n as RotateCcw, r as Play } from "../_libs/lucide-react.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bjqvt5oK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Published Phase-F record (ELY-SYS-PF-QGD-001, 12 Nov 2026).
*  Dimensionless lattice quantities. Not an SI mapping. */
var DOC = {
	id: "ELY-SYS-PF-QGD-001",
	date: "12 November 2026",
	massBasis: "ELY-MASS-E1",
	massMt: 224.76,
	proposedMassMt: 226.84,
	seed: 20261112,
	runs: "118 lattice runs + 100,000-sample Monte Carlo",
	phaseE: {
		a: .0469732,
		p: 1.7489,
		stencil: 14e-15
	}
};
/** 64³, PD arm, steady-state window. Pulse columns allocate the 5 MJ / 50 MW / 0.1 s envelope. */
var SCHEDULE = [
	{
		d: 3,
		nullTear: .0165,
		auth: .00802,
		vsLaw: 1.17,
		duty: 1,
		mj: 5,
		mw: 50
	},
	{
		d: 4,
		nullTear: .0128,
		auth: .00355,
		vsLaw: .85,
		duty: .442,
		mj: 2.21,
		mw: 22.1
	},
	{
		d: 5,
		nullTear: .00978,
		auth: .00241,
		vsLaw: .86,
		duty: .301,
		mj: 1.51,
		mw: 15.1
	},
	{
		d: 6,
		nullTear: .00759,
		auth: .00203,
		vsLaw: .99,
		duty: .253,
		mj: 1.27,
		mw: 12.7
	},
	{
		d: 7,
		nullTear: .00606,
		auth: .00167,
		vsLaw: 1.07,
		duty: .209,
		mj: 1.04,
		mw: 10.4
	},
	{
		d: 8,
		nullTear: .00495,
		auth: .00139,
		vsLaw: 1.12,
		duty: .173,
		mj: .87,
		mw: 8.7
	},
	{
		d: 9,
		nullTear: .00412,
		auth: .00116,
		vsLaw: 1.15,
		duty: .145,
		mj: .72,
		mw: 7.2
	},
	{
		d: 12,
		nullTear: .00254,
		auth: 739e-6,
		vsLaw: 1.21,
		duty: .092,
		mj: .46,
		mw: 4.6
	},
	{
		d: 16,
		nullTear: .00146,
		auth: 445e-6,
		vsLaw: 1.21,
		duty: .056,
		mj: .28,
		mw: 2.8
	},
	{
		d: 20,
		nullTear: 906e-6,
		auth: 249e-6,
		vsLaw: 1,
		duty: .031,
		mj: .16,
		mw: 1.6
	},
	{
		d: 24,
		nullTear: 585e-6,
		auth: 203e-6,
		vsLaw: 1.12,
		duty: .025,
		mj: .13,
		mw: 1.3
	}
];
var DAMPING = [
	{
		gamma: .04,
		p: 1.335,
		l: 31.6,
		lPred: 30.5
	},
	{
		gamma: .08,
		p: 1.698,
		l: 10.4,
		lPred: 15.2
	},
	{
		gamma: .16,
		p: 2.115,
		l: 5.7,
		lPred: 7.6
	}
];
var SCREENED_L_64 = 18.1;
var STATIONS = [
	{
		id: "m1",
		name: "Mk-I monopole, PD",
		channels: "1",
		fieldNull: "2.2×",
		tear: "0.4 to 6.5%",
		vsMk1: "1×",
		note: "Phase-E single channel. It senses and drives the field average. Gains kp = 2.2, kd = 1.4."
	},
	{
		id: "m1r",
		name: "Mk-I monopole, PD + resonator",
		channels: "1",
		fieldNull: "17 to 1,349×",
		tear: "−3.7 to +3.3%",
		vsMk1: "0.9×",
		note: "Raising controller order nulls the station-averaged field and leaves the tear metric almost unchanged."
	},
	{
		id: "m2",
		name: "Mk-II vector, PD + resonator",
		channels: "4",
		fieldNull: "same band",
		tear: "6 to 17%",
		vsMk1: "2.0 to 3.9×",
		note: "Monopole plus three gradient channels. Research baseline. A half-frequency check did not improve it (12.6% vs 14.1%)."
	},
	{
		id: "m3",
		name: "Mk-III cage, R = 5",
		channels: "80",
		fieldNull: "1.3 to 2.2×",
		tear: "14 to 38%",
		vsMk1: "14 to 24×",
		note: "Enclosing patches. Gains were not tuned: explicit RK4 goes unstable at high gain. Single seeds, one or two ranges."
	}
];
var FINDINGS = [
	{
		id: "QGD-002",
		severity: "Revised",
		finding: "Exponent holds at 32³ / 64³ (1.64–1.78) but tracks lattice damping (1.34 to 2.12).",
		disposition: "Withdraw 1.749 as a standalone prediction. Preregister e^(−d/l)/d with l measured on a ring-down before any active trial."
	},
	{
		id: "QGD-003",
		severity: "Recast",
		finding: "Controller order nulls the field, not the tear metric. The limit is actuator geometry.",
		disposition: "Close the controller-order action. Mk-II vector station is the research baseline. Mk-III cage is the candidate."
	},
	{
		id: "QGD-005",
		severity: "New",
		finding: "Authority is 1.04–1.14× the uncontrolled station field at every range.",
		disposition: "Local closed-loop control replaces the range schedule. Range knowledge is retired as a controlling tolerance."
	},
	{
		id: "QGD-006",
		severity: "New",
		finding: "The 21³ periodic box contaminates steady state. The station sees the tear’s images.",
		disposition: "32³ minimum for steady-state work. Absorbing boundary before extending past d = 24."
	},
	{
		id: "QGD-004",
		severity: "Open",
		finding: "No mapping from lattice authority to any SI quantity.",
		disposition: "Unchanged. Section 12 gates only. Force, thrust and shielding stay undefined."
	},
	{
		id: "STR-002",
		severity: "Open",
		finding: "310 mm band passes 0%. A band floored at 338.3 mm passes 97.3%.",
		disposition: "Allocation 343 / 353 / 363 mm proposed, +2.08 Mt, awaiting a configuration decision. Mass ledger not changed."
	},
	{
		id: "BRG-002",
		severity: "Holds",
		finding: "Bearing N-2 worst-normal 2.16 on the E1 basis, 2.14 with the thicker shell.",
		disposition: "0.05% trim retained."
	}
];
function lawCurves(gamma) {
	const damp = DAMPING.find((row) => row.gamma === gamma) ?? DAMPING[1];
	const anchor = SCHEDULE.find((row) => row.d === 6);
	const lScreen = gamma === .08 ? SCREENED_L_64 : damp.l;
	const rows = [];
	for (let d = 3; d <= 24; d++) {
		const screenedShape = Math.exp(-d / lScreen) / d;
		const anchorScreen = Math.exp(-6 / lScreen) / 6;
		const powerShape = d ** -damp.p;
		const anchorPower = 6 ** -damp.p;
		const archive = gamma === .08 ? SCHEDULE.find((row) => row.d === d)?.auth ?? null : null;
		rows.push({
			d,
			archive,
			screened: anchor.auth * screenedShape / anchorScreen,
			power: anchor.auth * powerShape / anchorPower
		});
	}
	return {
		damp,
		lScreen,
		rows
	};
}
/** Interactive HyperTear bay.
*
* Second-order lattice from the Phase-F NumPy reference
* (d²E/dt² = c² L26(E) − γ dE/dt + S + A), reduced for the browser:
* leapfrog at dt = 0.05, N ≤ 20, local monopole or four-channel vector station.
* Archive tables elsewhere are the published RK4 campaign. This bay is not that
* campaign and carries no vehicle credit. Every quantity is dimensionless.
*/
var WSUM = 12 + 8 / 3;
var WAVE_C = .35;
var DRIVE_OMEGA = .8;
var DT = .05;
var KP = 2.2;
var KD = 1.4;
var TEAR_AMP = .05;
var TEAR_SIGMA = 1.2;
var ST_SIGMA = 1.5;
var NOISE = .001;
function mulberry32$1(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function gaussian(rng) {
	let u = 0;
	let v = 0;
	while (u === 0) u = rng();
	while (v === 0) v = rng();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function idx(n, x, y, z) {
	return (z * n + y) * n + x;
}
function buildBlob(n, cx, cy, cz, sigma, rad = 6) {
	const raw = [];
	const x0 = Math.max(0, Math.floor(cx) - rad);
	const x1 = Math.min(n - 1, Math.ceil(cx) + rad);
	const y0 = Math.max(0, Math.floor(cy) - rad);
	const y1 = Math.min(n - 1, Math.ceil(cy) + rad);
	const z0 = Math.max(0, Math.floor(cz) - rad);
	const z1 = Math.min(n - 1, Math.ceil(cz) + rad);
	let max = 0;
	for (let z = z0; z <= z1; z++) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
		const r2 = (x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2;
		const g = Math.exp(-r2 / (2 * sigma * sigma));
		if (g < 1e-6) continue;
		if (g > max) max = g;
		raw.push({
			i: idx(n, x, y, z),
			g
		});
	}
	if (max === 0 || raw.length === 0) return [];
	let sum = 0;
	return raw.map((c) => {
		const shape = c.g / max;
		sum += shape;
		return {
			i: c.i,
			shape
		};
	}).map((c) => ({
		i: c.i,
		shape: c.shape,
		w: c.shape / sum
	}));
}
function laplacian(e, out, n) {
	const n2 = n * n;
	for (let z = 0; z < n; z++) {
		const zm = (z + n - 1) % n * n2;
		const z0 = z * n2;
		const zp = (z + 1) % n * n2;
		for (let y = 0; y < n; y++) {
			const ym = (y + n - 1) % n * n;
			const y0 = y * n;
			const yp = (y + 1) % n * n;
			const row = z0 + y0;
			for (let x = 0; x < n; x++) {
				const xm = (x + n - 1) % n;
				const xp = (x + 1) % n;
				const c = e[row + x];
				let s = 0;
				s += e[z0 + y0 + xm] + e[z0 + y0 + xp];
				s += e[z0 + ym + x] + e[z0 + yp + x];
				s += e[zm + y0 + x] + e[zp + y0 + x];
				s += .5 * (e[z0 + ym + xm] + e[z0 + ym + xp] + e[z0 + yp + xm] + e[z0 + yp + xp] + e[zm + y0 + xm] + e[zm + y0 + xp] + e[zp + y0 + xm] + e[zp + y0 + xp] + e[zm + ym + x] + e[zm + yp + x] + e[zp + ym + x] + e[zp + yp + x]);
				s += 1 / 3 * (e[zm + ym + xm] + e[zm + ym + xp] + e[zm + yp + xm] + e[zm + yp + xp] + e[zp + ym + xm] + e[zp + ym + xp] + e[zp + yp + xm] + e[zp + yp + xp]);
				out[row + x] = s - WSUM * c;
			}
		}
	}
}
function dotW(field, cells, pick) {
	let s = 0;
	for (const c of cells) s += pick(c) * field[c.i];
	return s;
}
function gradientTear(e, cells, n) {
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
		const gx = .5 * (e[idx(n, xp, y, z)] - e[idx(n, xm, y, z)]);
		const gy = .5 * (e[idx(n, x, yp, z)] - e[idx(n, x, ym, z)]);
		const gz = .5 * (e[idx(n, x, y, zp)] - e[idx(n, x, y, zm)]);
		s += c.w * Math.sqrt(gx * gx + gy * gy + gz * gz);
	}
	return s;
}
var HyperTearBay = class {
	params;
	source;
	station;
	dipAmp;
	active;
	nullWorld;
	lap;
	step = 0;
	t = 0;
	authSq = 0;
	finite = true;
	last;
	constructor(params) {
		this.params = params;
		const n = params.n;
		const mid = (n - 1) / 2;
		const tearX = Math.max(2, Math.min(4, Math.floor(n / 5)));
		this.source = buildBlob(n, tearX, mid, mid, TEAR_SIGMA);
		const sx = Math.min(n - 3, tearX + params.d);
		this.station = buildBlob(n, sx, mid, mid, ST_SIGMA);
		this.dipAmp = [
			0,
			1,
			2
		].map(() => new Float64Array(this.station.length));
		this.station.forEach((c, k) => {
			const z = Math.floor(c.i / (n * n));
			const y = Math.floor((c.i - z * n * n) / n);
			const x = c.i - z * n * n - y * n;
			this.dipAmp[0][k] = (x - sx) / ST_SIGMA * c.shape;
			this.dipAmp[1][k] = (y - mid) / ST_SIGMA * c.shape;
			this.dipAmp[2][k] = (z - mid) / ST_SIGMA * c.shape;
		});
		const len = n * n * n;
		const rng = mulberry32$1(params.seed >>> 0);
		const e0 = new Float64Array(len);
		for (let i = 0; i < len; i++) e0[i] = NOISE * gaussian(rng);
		this.active = {
			e: e0,
			v: new Float64Array(len)
		};
		this.nullWorld = {
			e: new Float64Array(e0),
			v: new Float64Array(len)
		};
		this.lap = new Float64Array(len);
		this.last = this.sample();
	}
	accel(world, driven) {
		const { gamma, arm } = this.params;
		const e = world.e;
		const v = world.v;
		laplacian(e, this.lap, this.params.n);
		const c2 = WAVE_C * WAVE_C;
		const src = TEAR_AMP * Math.sin(DRIVE_OMEGA * this.t);
		const n = e.length;
		const acc = new Float64Array(n);
		for (let i = 0; i < n; i++) acc[i] = c2 * this.lap[i] - gamma * v[i];
		for (const c of this.source) acc[c.i] = (acc[c.i] ?? 0) + src * c.shape;
		let a0 = 0;
		if (driven && arm !== "null" && this.station.length) {
			const eMon = dotW(e, this.station, (c) => c.w);
			const vMon = dotW(v, this.station, (c) => c.w);
			a0 = -(KP * eMon + KD * vMon);
			for (const c of this.station) acc[c.i] = (acc[c.i] ?? 0) + a0 * c.shape;
			if (arm === "vector") for (let ch = 0; ch < 3; ch++) {
				const amp = this.dipAmp[ch];
				let es = 0;
				let vs = 0;
				let norm = 0;
				for (let k = 0; k < this.station.length; k++) {
					const dip = amp[k];
					const i = this.station[k].i;
					es += dip * e[i];
					vs += dip * v[i];
					norm += dip * dip;
				}
				const inv = norm > 0 ? 1 / norm : 0;
				const a = -.85 * (KP * es * inv + KD * vs * inv);
				for (let k = 0; k < this.station.length; k++) {
					const i = this.station[k].i;
					acc[i] = (acc[i] ?? 0) + a * amp[k];
				}
			}
		}
		return {
			acc,
			a0
		};
	}
	/** One leapfrog step on the paired active and null worlds. */
	advance() {
		if (!this.finite) return this.last;
		const dt = DT;
		const kick = (world, acc) => {
			const v = world.v;
			const e = world.e;
			for (let i = 0; i < e.length; i++) {
				v[i] = (v[i] ?? 0) + dt * (acc[i] ?? 0);
				e[i] = (e[i] ?? 0) + dt * (v[i] ?? 0);
				if (!Number.isFinite(e[i]) || Math.abs(e[i]) > 40) this.finite = false;
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
	sample() {
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
			finite: this.finite
		};
	}
	/** Mid-plane of the active field, row-major y-major x, length n*n. z = floor(n/2). */
	midplane() {
		const n = this.params.n;
		const z = Math.floor(n / 2);
		const out = new Float64Array(n * n);
		const base = z * n * n;
		for (let i = 0; i < n * n; i++) out[i] = this.active.e[base + i];
		return out;
	}
};
function maxStandoff(n) {
	const tearX = Math.max(2, Math.min(4, Math.floor(n / 5)));
	return Math.max(3, Math.min(9, n - tearX - 3));
}
/** Coupled shell-load screen from coupled_tolerance_mc.py.
*  Conventional habitat structure only. No QGD credit.
*  A fresh draw uses the same distributions; it is not the archived 100,000-sample file. */
var G0 = 9.80665;
var AREA = 2 * Math.PI * 500 * 18e3;
var RHO = 1600;
var MU_FIXED = 5375e7 / AREA;
var P_ULT = 16e4;
var FS_SPIN = 1.5;
var ALLOW = 3e8;
var TARGET = 1.1;
var RPM0 = 60 / (2 * Math.PI) * Math.sqrt(G0 / 500);
var SHELL_ARCHIVE = [
	{
		key: "d",
		name: "Phase-D band",
		lower: 293.6,
		nominal: 310,
		upper: 320,
		pass: 0,
		p001: .956,
		status: "Fail"
	},
	{
		key: "e1n",
		name: "E1 as nominal",
		lower: 328.3,
		nominal: 338.3,
		upper: 348.3,
		pass: 51.8,
		p001: 1.062,
		status: "Fail"
	},
	{
		key: "e1f",
		name: "E1 as floor",
		lower: 338.3,
		nominal: 348.3,
		upper: 358.3,
		pass: 97.3,
		p001: 1.093,
		status: "Marginal"
	},
	{
		key: "f",
		name: "Phase-F proposal",
		lower: 343,
		nominal: 353,
		upper: 363,
		pass: 100,
		p001: 1.107,
		status: "Proposed"
	}
];
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pEq(t, rho, muf, w2r) {
	return 1.3 * rho * t * w2r + muf * w2r;
}
function margin(t, r, w2r, rho, muf) {
	return ALLOW * t / ((P_ULT + FS_SPIN * pEq(t, rho, muf, w2r)) * r);
}
var LIVE_BANDS = [
	{
		key: "d",
		lo: .293627,
		hi: .32
	},
	{
		key: "e1n",
		lo: .3283,
		hi: .3483
	},
	{
		key: "e1f",
		lo: .3383,
		hi: .3583
	},
	{
		key: "f",
		lo: .343,
		hi: .363
	}
];
function drawShell(samples = 8e3, seed = 20261112) {
	const rng = mulberry32(seed);
	const hits = LIVE_BANDS.map(() => 0);
	let gPass = 0;
	for (let i = 0; i < samples; i++) {
		const r = 499.5 + rng();
		const w = (RPM0 - .003 + rng() * .006) * 2 * Math.PI / 60;
		const w2r = w * w * r;
		const rho = RHO * (.95 + rng() * .1);
		const muf = MU_FIXED * (.9 + rng() * .2);
		if (w2r / G0 >= .99 && w2r / G0 <= 1.01) gPass += 1;
		for (let b = 0; b < LIVE_BANDS.length; b++) {
			const band = LIVE_BANDS[b];
			if (margin(band.lo + rng() * (band.hi - band.lo), r, w2r, rho, muf) >= TARGET) hits[b] = (hits[b] ?? 0) + 1;
		}
	}
	return {
		samples,
		gravityPass: gPass / samples,
		bands: LIVE_BANDS.map((band, i) => ({
			key: band.key,
			pass: (hits[i] ?? 0) / samples
		}))
	};
}
var TABS = [
	{
		id: "lattice",
		label: "Live lattice"
	},
	{
		id: "law",
		label: "Distance law"
	},
	{
		id: "stations",
		label: "Stations"
	},
	{
		id: "shell",
		label: "Shell screen"
	},
	{
		id: "register",
		label: "Register"
	}
];
var ARMS = [
	{
		id: "null",
		label: "Null"
	},
	{
		id: "pd",
		label: "Mk-I PD"
	},
	{
		id: "vector",
		label: "Mk-II vector"
	}
];
var BRANCH_KEY = "elysium-branches-v1";
function sci(n) {
	if (!Number.isFinite(n)) return "—";
	const a = Math.abs(n);
	if (a !== 0 && (a < .001 || a >= 1e3)) return n.toExponential(2);
	return a < 1 ? n.toFixed(4) : n.toFixed(2);
}
function pct(n) {
	if (!Number.isFinite(n)) return "—";
	return `${(n * 100).toFixed(1)}%`;
}
function tone(v, peak) {
	const t = Math.max(-1, Math.min(1, peak > 0 ? v / peak : 0));
	const r = t >= 0 ? 18 + t * 183 : 14 + (1 + t) * 10;
	const g = t >= 0 ? 22 + t * 139 : 26 + (1 + t) * 12;
	const b = t >= 0 ? 20 + t * 70 : 22 + (1 + t) * 8;
	return `rgb(${r | 0} ${g | 0} ${b | 0})`;
}
function Simulator() {
	const [tab, setTab] = (0, import_react.useState)("lattice");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen text-parchment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs tracking-widest text-brass",
								children: [DOC.id, " · ASGARD RESTORATION"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-serif text-3xl leading-tight text-parchment sm:text-4xl",
								children: "Multiverse Research Simulator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm leading-relaxed text-mist",
								children: "Elysium Tube, Phase-F. Each branch is a paired numerical universe of the same seed: a null lattice beside a driven station. Nothing here is thrust, shielding, or proof of a drive."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs text-mist sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "tracking-wide",
								children: "Mass basis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-parchment",
								children: [DOC.massMt, " Mt"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "tracking-wide",
								children: "Seed base"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: DOC.seed
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "tracking-wide",
								children: "Archive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: "118 + 1e5"
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6",
					"aria-label": "Sections",
					children: TABS.map((item) => {
						const on = tab === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": on,
							onClick: () => setTab(item.id),
							className: "min-h-11 shrink-0 border px-4 text-sm " + (on ? "border-brass bg-panel-2 text-parchment" : "border-line bg-panel text-mist hover:text-parchment"),
							children: item.label
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 sm:px-6",
				children: [
					tab === "lattice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatticeBay, {}),
					tab === "law" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LawPanel, {}),
					tab === "stations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationsPanel, {}),
					tab === "shell" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellPanel, {}),
					tab === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterPanel, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-5 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-mist",
						children: [
							"Boundary. Every lattice quantity is dimensionless and non-credit. Nothing converts to force, thrust, gravity shielding, inertia relief, or structural tolerance. QGD off remains the safe state. The habitat must stay fully operable with the QGD layer removed, unpowered, or failed. Sources: Drive folder “Asgarde restoration project” (ELY-SYS-PF-QGD-001, phase_f_simulator) and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-brass underline decoration-brass-dim underline-offset-2",
								href: "https://github.com/AndrewGE7/QGD",
								children: "AndrewGE7/QGD"
							}),
							". The GitHub reference is the N0 diffusion audit, not this second-order wave."
						]
					})
				})
			})
		]
	});
}
function LatticeBay() {
	const [n, setN] = (0, import_react.useState)(16);
	const [seed, setSeed] = (0, import_react.useState)(DOC.seed);
	const [gamma, setGamma] = (0, import_react.useState)(.08);
	const [d, setD] = (0, import_react.useState)(5);
	const [arm, setArm] = (0, import_react.useState)("pd");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hist, setHist] = (0, import_react.useState)([]);
	const [branches, setBranches] = (0, import_react.useState)([]);
	const [epoch, setEpoch] = (0, import_react.useState)(0);
	const [, bump] = (0, import_react.useState)(0);
	const playingRef = (0, import_react.useRef)(false);
	playingRef.current = playing;
	const dMax = maxStandoff(n);
	const dUse = Math.min(d, dMax);
	const params = (0, import_react.useMemo)(() => ({
		n,
		seed: seed >>> 0,
		gamma,
		d: dUse,
		arm
	}), [
		n,
		seed,
		gamma,
		dUse,
		arm
	]);
	const bay = (0, import_react.useMemo)(() => new HyperTearBay(params), [params, epoch]);
	const sample = bay.last;
	(0, import_react.useEffect)(() => {
		setPlaying(false);
		setHist([]);
	}, [bay]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(BRANCH_KEY);
			if (raw) setBranches(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let last = 0;
		const loop = (now) => {
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
		const next = {
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
			finite: sample.finite
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
	const spark = hist.map((v, i) => {
		return `${hist.length < 2 ? 0 : i / (hist.length - 1) * 100},${18 - Math.max(-1, Math.min(1, v)) * 14}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[17rem_minmax(0,1fr)_16rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-xs tracking-widest text-brass",
						children: "BAY CONTROLS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed text-mist",
						children: [
							"Leapfrog on a ",
							n,
							"³ box, dt = 0.05. The archive is RK4 at 32³ and 64³. This bay will not reproduce those exponents."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-mist",
						children: ["Arm", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-1",
							children: ARMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": arm === item.id,
								onClick: () => setArm(item.id),
								className: "min-h-11 border px-1 text-xs " + (arm === item.id ? "border-brass text-parchment" : "border-line text-mist"),
								children: item.label
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-mist",
						children: ["Lattice", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-2 min-h-11 w-full border border-line bg-ink px-2 text-sm text-parchment",
							value: n,
							onChange: (e) => setN(Number(e.target.value)),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 12,
									children: "12³ interactive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 16,
									children: "16³ interactive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 20,
									children: "20³ slower"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-mist",
						children: ["Damping γ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-2 min-h-11 w-full border border-line bg-ink px-2 text-sm text-parchment",
							value: gamma,
							onChange: (e) => setGamma(Number(e.target.value)),
							children: DAMPING.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: row.gamma,
								children: [
									row.gamma.toFixed(2),
									" · archive p = ",
									row.p.toFixed(3)
								]
							}, row.gamma))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-mist",
						children: [
							"Standoff d = ",
							dUse,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-3 w-full accent-brass",
								type: "range",
								min: 3,
								max: dMax,
								value: dUse,
								onChange: (e) => setD(Number(e.target.value))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-mist",
						children: ["Seed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-2 min-h-11 w-full border border-line bg-ink px-2 font-mono text-sm text-parchment",
							type: "number",
							min: 0,
							value: seed,
							onChange: (e) => setSeed(Number(e.target.value) || 0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex min-h-11 items-center justify-center gap-2 border border-brass bg-panel-2 text-sm text-parchment",
								onClick: () => setPlaying((v) => !v),
								disabled: busy || sample.finite === false,
								children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), playing ? "Pause" : "Run"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 border border-line text-sm text-mist",
								onClick: settle,
								disabled: busy,
								children: busy ? "Settling…" : "Settle 200"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex min-h-11 items-center justify-center gap-2 border border-line text-sm text-mist",
								onClick: () => {
									setPlaying(false);
									setEpoch((v) => v + 1);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-mist",
						children: "Reset rebuilds the pair from the seed. Change any control to do the same."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-line text-sm text-mist",
						onClick: fork,
						disabled: sample.step === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-4" }), "Fork this reading"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-xs tracking-widest text-brass",
						children: "ACTIVE MIDPLANE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-mist",
						children: [
							"t = ",
							sample.t.toFixed(2),
							" · step ",
							sample.step
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid aspect-square w-full bg-ink",
							style: { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` },
							role: "img",
							"aria-label": "Midplane of the active scalar field. A light edge marks the tear, a brass edge marks the station.",
							children: Array.from(plane, (v, i) => {
								const x = i % n;
								const y = Math.floor(i / n);
								const mark = x === tearX && y === gy ? "parchment" : x === sx && y === gy ? "brass" : "";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									background: tone(v ?? 0, peak),
									boxShadow: mark === "brass" ? "inset 0 0 0 1px var(--color-brass)" : mark === "parchment" ? "inset 0 0 0 1px var(--color-parchment)" : void 0
								} }, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xs text-mist",
							children: "Light edge: tear source. Brass edge: station. Bright is positive E, dark is negative."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 100 28",
							className: "mt-3 h-16 w-full",
							role: "img",
							"aria-label": "Tear reduction history",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "18",
								x2: "100",
								y2: "18",
								stroke: "var(--color-line)",
								strokeWidth: "0.4"
							}), spark && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
								fill: "none",
								stroke: "var(--color-brass)",
								strokeWidth: "0.8",
								points: spark
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-mist",
							children: "Tear reduction against the paired null. Zero line is no effect."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-panel p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-xs tracking-widest text-brass",
							children: "PAIRED READING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 space-y-3 font-mono text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Tear reduction",
									value: pct(sample.tearReduction)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Tear, active",
									value: sci(sample.tearActive)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Tear, null",
									value: sci(sample.tearNull)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Field nulling",
									value: `${sample.fieldNulling.toFixed(2)}×`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Authority RMS",
									value: sci(sample.authRms)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Finite",
									value: sample.finite === false ? "Left screen" : "Yes"
								})
							]
						}),
						sample.step > 20 && sample.tearReduction < 0 && arm !== "null" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-mist",
							children: "The mean is falling while the tear is not. That is QGD-003: a monopole channel does not observe the gradient. Mk-II in this bay is the geometry, not the archived resonator result."
						}),
						sample.finite === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-brass",
							children: "Explicit step left the stability screen. Change a control to rebuild. QGD off is the safe state."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-panel p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-xs tracking-widest text-brass",
							children: "FORKED BRANCHES"
						}),
						branches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-mist",
							children: "Run, then fork. Up to six readings stay in this browser."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-parchment",
									children: b.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs text-mist",
									children: [
										"tear ",
										pct(b.tearReduction),
										" · nulling ",
										b.fieldNulling.toFixed(2),
										"× · ",
										b.steps,
										" steps"
									]
								})]
							}, b.id))
						}),
						branches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 min-h-11 text-sm text-mist underline decoration-line underline-offset-2",
							onClick: () => {
								setBranches([]);
								localStorage.removeItem(BRANCH_KEY);
							},
							children: "Clear branches"
						})
					]
				})]
			})
		]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs tracking-wide text-mist",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-parchment",
			children: value
		})]
	});
}
function LawPanel() {
	const [gamma, setGamma] = (0, import_react.useState)(.08);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const { damp, lScreen, rows } = (0, import_react.useMemo)(() => lawCurves(gamma), [gamma]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border border-line bg-panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Screened spreading, not a constant exponent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm leading-relaxed text-mist",
						children: "Phase E reported p = 1.749. Phase F keeps 1.64–1.78 under grid scaling and shows the slope moves with damping. The 64³ steady state prefers e^(−d/l)/d."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs tracking-wide text-mist",
						children: ["γ for the model", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-2 min-h-11 border border-line bg-ink px-2 text-sm text-parchment",
							value: gamma,
							onChange: (e) => setGamma(Number(e.target.value)),
							children: DAMPING.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: row.gamma,
								children: row.gamma.toFixed(2)
							}, row.gamma))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-72",
					children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: rows,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-line)",
									strokeDasharray: "3 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "d",
									stroke: "var(--color-mist)",
									tick: {
										fill: "var(--color-mist)",
										fontSize: 12
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-mist)",
									tick: {
										fill: "var(--color-mist)",
										fontSize: 12
									},
									tickFormatter: (v) => v.toExponential(0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "var(--color-panel)",
										border: "1px solid var(--color-line)",
										color: "var(--color-parchment)",
										fontSize: 12
									},
									formatter: (value) => typeof value === "number" ? value.toExponential(3) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "screened",
									name: "Screened e^(−d/l)/d",
									stroke: "var(--color-brass)",
									dot: false,
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "power",
									name: "Local power law",
									stroke: "var(--color-mist)",
									dot: false,
									strokeDasharray: "4 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "archive",
									name: "64³ archive authority",
									stroke: "var(--color-parchment)",
									connectNulls: false,
									dot: { r: 3 },
									strokeWidth: 0
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full border border-line bg-ink" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-mist",
					children: [
						"Brass is the screened form anchored at d = 6. Dashed is d^(−",
						damp.p.toFixed(3),
						"). Dots are the published 64³ PD authority and appear only at γ = 0.08. Decay length in view: l = ",
						lScreen,
						". Dispersion-predicted length at this γ: ",
						damp.lPred,
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border border-line bg-panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-xs tracking-widest text-brass",
					children: "64³ PD SCHEDULE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "Pulse columns only allocate the 5 MJ / 50 MW / 0.1 s research envelope. They are not effect sizes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-mist",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-left font-medium",
									children: "d"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-right font-medium",
									children: "Auth"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-right font-medium",
									children: "/ law"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 text-right font-medium",
									children: "MW"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SCHEDULE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line text-parchment",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: row.d
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right",
									children: row.auth.toExponential(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right",
									children: row.vsLaw.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-right",
									children: row.mw.toFixed(1)
								})
							]
						}, row.d)) })]
					})
				})
			]
		})]
	});
}
function StationsPanel() {
	const [open, setOpen] = (0, import_react.useState)("m2");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl",
			children: "Station architecture is the limit"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-mist",
			children: "QGD-003 closed the controller-order action. Extra poles null the station average and miss the tear, which is a gradient. Mk-II is the research baseline. Mk-III is a candidate, not a tuned design. Explicit RK4 diverged at a dipole gain of 50."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 md:grid-cols-2",
			children: STATIONS.map((row) => {
				const on = open === row.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": on,
					onClick: () => setOpen(row.id),
					className: "border p-4 text-left " + (on ? "border-brass bg-panel-2" : "border-line bg-panel"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tracking-widest text-brass",
							children: [row.channels, " CH"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-serif text-xl text-parchment",
							children: row.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid grid-cols-3 gap-2 font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Field null"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-parchment",
									children: row.fieldNull
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "Tear"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-parchment",
									children: row.tear
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-mist",
									children: "vs Mk-I"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-parchment",
									children: row.vsMk1
								})] })
							]
						}),
						on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-mist",
							children: row.note
						})
					]
				}, row.id);
			})
		})
	] });
}
function ShellPanel() {
	const [draw, setDraw] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const run = () => {
		setBusy(true);
		window.setTimeout(() => {
			setDraw(drawShell(8e3, DOC.seed));
			setBusy(false);
		}, 30);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: "Coupled shell screen, no QGD credit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-mist",
					children: [
						"Habitat ring at 500 m, spin for 1 g (",
						RPM0.toFixed(3),
						" rpm nominal), laminate 1,600 kg/m³, 30% ring allowance. The Phase-F proposal is 343 / 353 / 363 mm. Adopting 353 mm adds 2.08 Mt with reserve, for 226.84 Mt. ELY-MASS-E1 stays 224.76 Mt until that decision."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: run,
				disabled: busy,
				className: "min-h-11 border border-brass bg-panel px-4 text-sm text-parchment",
				children: busy ? "Drawing…" : "Draw 8,000 samples"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-panel font-mono text-xs text-mist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 text-left font-medium",
							children: "Band"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 text-right font-medium",
							children: "mm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 text-right font-medium",
							children: "Archive pass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 text-right font-medium",
							children: "Fresh draw"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 text-left font-medium",
							children: "Record"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SHELL_ARCHIVE.map((band) => {
					const live = draw?.bands.find((b) => b.key === band.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line bg-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-parchment",
								children: band.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3 text-right font-mono text-mist",
								children: [
									band.lower,
									" / ",
									band.nominal,
									" / ",
									band.upper
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-3 text-right font-mono text-parchment",
								children: [band.pass.toFixed(1), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right font-mono text-brass",
								children: live ? `${(live.pass * 100).toFixed(1)}%` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-mist",
								children: band.status
							})
						]
					}, band.key);
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-mist",
			children: [
				"Gravity at 500 m passed 100% of the archived 100,000 samples (0.99–1.01 g).",
				draw ? ` This draw: ${(draw.gravityPass * 100).toFixed(1)}% of ${draw.samples.toLocaleString()}.` : " Draw a fresh sample to compare.",
				" ",
				"Worst-corner coupled requirement was 342.3 mm, 345.0 mm if the 20% dry-growth reserve lands on retained outfitting. Bearing N-2 holds at a 0.05% trim."
			]
		})
	] });
}
function RegisterPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl",
			children: "Findings carried from Phase F"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-4 space-y-3",
			children: FINDINGS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-line bg-panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-sm text-brass",
							children: item.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-widest text-mist",
							children: item.severity
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-parchment",
						children: item.finding
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-mist",
						children: item.disposition
					})
				]
			}, item.id))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit border border-line bg-panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-xs tracking-widest text-brass",
					children: "RECONCILED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-mist",
					children: "The Phase-F note was written before AndrewGE7/QGD could be opened. It is open now. N0 is a first-order symmetric diffusion audit on a unit cube. HyperTear Phase F is a second-order 26-neighbour wave, tear = |∇E|, RK4, dt = 0.05. They are not the same model."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-2 font-mono text-xs text-mist",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Phase-E replay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-parchment",
								children: ["p = ", DOC.phaseE.p]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Amplitude a" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: DOC.phaseE.a.toExponential(4)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Stencil check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: DOC.phaseE.stencil.toExponential(1)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Wave speed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: "0.729"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "λ at ω = 0.8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-parchment",
								children: "5.40"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-mist",
					children: "Next package in the record: decide the shell, preregister the ring-down, add an implicit integrator and an absorbing boundary, then propagate Mk-II to the visualizers. A numerical pass cannot close a habitat gate."
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Simulator, {});
}
//#endregion
export { Home as component };
