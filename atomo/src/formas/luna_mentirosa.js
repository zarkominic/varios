// Escena 4: «La Luna no cambia: cambias tú» (gira el punto de vista alrededor
// de una Luna quieta) y luego la regla de la Luna mentirosa: C = decrece (flecha
// abajo), D = crece (flecha arriba).
import { N, TAU } from './base.js';

export const camara = { pos: [0, 0.45, 7], mira: [0, 0.45, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

// Primer tiempo: una Luna (D) quieta y el anillo del observador alrededor.
const AX0 = 0;
const AY0 = 0.88;
const RA = 0.78;
const KA = 0.48;
const RHO = 1.15; // radio del anillo
// Segundo tiempo: dos lunas, C a la izquierda y D a la derecha, con flechas debajo.
const BX0 = 0.67;
const BY0 = 1.54;
const RB = 0.53;
const KB = 0.42;
const FL_ARRIBA = 0.76; // extremo superior de las flechas
const FL_ABAJO = -0.16; // extremo inferior
const FL_PUNTA = 0.34; // altura de la punta
const FL_BASE = 0.46; // anchura de la punta
const FL_ASTIL = 0.14; // anchura del astil

// --- la cara de la Luna (disco unidad, norte arriba) ---
const MARES = [
  [0.68, 0.3, 0.12, 0.1, 1],
  [0.6, -0.14, 0.11, 0.19, 0.9],
  [0.4, -0.33, 0.09, 0.09, 0.85],
  [0.36, 0.12, 0.17, 0.14, 0.95],
  [0.23, 0.43, 0.13, 0.12, 0.95],
  [0.04, 0.3, 0.07, 0.06, 0.7],
  [-0.22, 0.56, 0.22, 0.17, 1],
  [-0.05, 0.8, 0.36, 0.05, 0.7],
  [-0.56, 0.12, 0.22, 0.38, 0.9],
  [-0.25, 0.06, 0.1, 0.08, 0.75],
  [-0.18, -0.37, 0.16, 0.13, 0.85],
  [-0.58, -0.41, 0.08, 0.08, 0.85],
  [0.08, -0.04, 0.08, 0.07, 0.6],
];
const CRATERES = [
  [-0.68, 0.4, 0.035, 1.6],
  [-0.12, -0.73, 0.04, 1.1],
  [-0.3, 0.18, 0.035, 0.9],
  [-0.52, 0.13, 0.025, 0.7],
  [0.6, 0.27, 0.025, 0.8],
  [0.86, -0.16, 0.03, 0.5],
  [0.75, -0.43, 0.035, 0.45],
  [-0.84, 0.0, 0.03, 0.6],
];
function mares(x, y) {
  let m = 0;
  for (let k = 0; k < MARES.length; k++) {
    const a = MARES[k];
    const dx = (x - a[0]) / a[2];
    const dy = (y - a[1]) / a[3];
    const s = lim((1.3 - (dx * dx + dy * dy)) / 0.7);
    const v = a[4] * s * s * (3 - 2 * s);
    if (v > m) m = v;
  }
  const r = 0.5 * Math.sin(9.1 * x + 2.3 * y) * Math.sin(7.7 * y - 1.1 * x + 0.6) + 0.3 * Math.sin(17 * x + 13 * y + 1.7);
  return lim(m + 0.22 * r * m);
}
function crater(x, y) {
  let b = 0;
  for (let k = 0; k < CRATERES.length; k++) {
    const a = CRATERES[k];
    const d = Math.hypot(x - a[0], y - a[1]) / a[2];
    if (d < 1.6) b += a[3] * (1 - d / 1.6);
  }
  return b;
}
const textura = (x, y) => 1 + 0.07 * Math.sin(11 * x - 5 * y + 0.4) * Math.sin(8 * y + 3 * x);

// Color en (x, y) del disco unidad; lado = 1 iluminada a la derecha, −1 a la izquierda.
const TMP = [0, 0, 0];
function sombrear(x, y, K, lado) {
  const SF = Math.sqrt(1 - K * K);
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const L = lado * x * SF - z * K;
  const m = mares(x, y);
  const v = textura(x, y);
  const cr = crater(x, y);
  if (L > 0) {
    const b = (0.3 + 0.92 * Math.pow(Math.min(1, L / 0.55), 0.6)) * v * (1 - 0.55 * m) * (1 + 0.35 * cr) * 1.3;
    TMP[0] = (1.0 - 0.36 * m) * b;
    TMP[1] = (0.94 - 0.24 * m) * b;
    TMP[2] = (0.84 - 0.02 * m) * b;
    return 1;
  }
  const e = 0.3 * v * (1 - 0.5 * m) * (1 + 0.7 * cr);
  TMP[0] = 0.42 * e;
  TMP[1] = 0.55 * e;
  TMP[2] = 0.9 * e;
  return 0;
}

let semilla = 7031977;
function rnd() {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
}

// --- bloques de partículas ---
const I_ANILLO = 500; // anillo fino → flechas
const I_HORIZONTE = 1100; // arco del horizonte → flechas
const I_OBSERVADOR = 1300; // figura del observador → trazo de la D
// resto: la Luna → las dos lunas (y su luz cenicienta sobrante → flechas)

// Tipos de viaje en el segundo tiempo.
const A_FLECHA = 0; // del anillo a una flecha
const A_TALLO = 1; // del observador al trazo de la D
const A_LUNA_D = 2; // copia de la Luna que se queda como D (derecha)
const A_LUNA_C = 3; // copia que se voltea como una moneda y queda como C (izquierda)
const L_FLECHA = 4; // de la Luna a una flecha

const TIPO = new Int8Array(N);
const AA = new Float32Array(N); // ángulo (anillo) o x local (luna)
const AR = new Float32Array(N); // radio (anillo) o y local (luna)
const XB = new Float32Array(N); // x local en la luna pequeña (iluminada a la derecha)
const BXp = new Float32Array(N);
const BYp = new Float32Array(N);
const BZp = new Float32Array(N);
const CAr = new Float32Array(N);
const CAg = new Float32Array(N);
const CAb = new Float32Array(N);
const CMr = new Float32Array(N);
const CMg = new Float32Array(N);
const CMb = new Float32Array(N);
const CBr = new Float32Array(N);
const CBg = new Float32Array(N);
const CBb = new Float32Array(N);
const TA = new Float32Array(N);
const TB = new Float32Array(N);
const T0 = new Float32Array(N); // inicio de su viaje al segundo tiempo
const DUR = new Float32Array(N);
const TF = new Float32Array(N); // inicio del volteo (copia C)
const FASE = new Float32Array(N);
const LY = new Float32Array(N); // posición a lo largo de la flecha (0 cola, 1 punta)

const RAM = Math.PI / 2; // ángulo final del observador (arriba)

// Punto de una flecha (lado −1: izquierda, baja; 1: derecha, sube).
function puntoFlecha(i, lado) {
  const largo = FL_ARRIBA - FL_ABAJO;
  const astil = largo - FL_PUNTA;
  const aAstil = astil * FL_ASTIL;
  const aPunta = 0.5 * FL_PUNTA * FL_BASE;
  let x;
  let s; // distancia desde la cola
  if (rnd() < aAstil / (aAstil + aPunta)) {
    x = (rnd() - 0.5) * FL_ASTIL;
    s = rnd() * astil;
  } else {
    let u = rnd();
    let v = rnd();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    s = astil + FL_PUNTA * v; // base del triángulo en s = astil, punta en s = largo
    x = (u - 0.5 * (1 - v)) * FL_BASE;
  }
  BXp[i] = lado * BX0 + x;
  BYp[i] = lado < 0 ? FL_ARRIBA - s : FL_ABAJO + s;
  BZp[i] = (rnd() - 0.5) * 0.04;
  LY[i] = s / largo;
  if (lado < 0) {
    CBr[i] = 1.2;
    CBg[i] = 0.42;
    CBb[i] = 0.14;
  } else {
    CBr[i] = 0.12;
    CBg[i] = 0.95;
    CBb[i] = 0.7;
  }
  TB[i] = 0.041;
  // la flecha crece de la cola a la punta
  T0[i] = (lado < 0 ? 3.0 : 3.3) + 0.5 * LY[i] + 0.15 * rnd();
  DUR[i] = 0.8;
}

for (let i = 0; i < N; i++) FASE[i] = TAU * rnd();

// Anillo fino con marcas cada 30° (para que se note el giro).
for (let i = 0; i < I_ANILLO; i++) {
  const a = TAU * ((i + rnd() * 0.6) / I_ANILLO);
  TIPO[i] = A_FLECHA;
  AA[i] = a;
  AR[i] = RHO + (rnd() - 0.5) * 0.012;
  const marca = Math.pow(Math.max(0, Math.cos(12 * a)), 10);
  const k = 0.32 + 1.0 * marca;
  CAr[i] = 0.3 * k;
  CAg[i] = 0.72 * k;
  CAb[i] = 1.0 * k;
  TA[i] = 0.024 + 0.012 * marca;
  puntoFlecha(i, Math.cos(a + RAM) < 0 ? -1 : 1);
}
// Arco del horizonte (el suelo del observador), más brillante y algo más grueso.
for (let i = I_ANILLO; i < I_HORIZONTE; i++) {
  const s = rnd() * 2 - 1;
  const a = s * 0.62;
  TIPO[i] = A_FLECHA;
  AA[i] = a;
  AR[i] = RHO + 0.006 + rnd() * 0.03;
  const k = 1.15 * (1 - s * s) ** 0.6 + 0.15;
  CAr[i] = 0.45 * k;
  CAg[i] = 0.8 * k;
  CAb[i] = 1.0 * k;
  TA[i] = 0.03;
  puntoFlecha(i, Math.cos(a + RAM) < 0 ? -1 : 1);
}
// Observador: cabeza, cuerpo y brazos, de pie sobre el horizonte mirando a la Luna.
for (let i = I_HORIZONTE; i < I_OBSERVADOR; i++) {
  const j = i - I_HORIZONTE;
  let u;
  let v; // u: tangencial; v: altura hacia la Luna desde el suelo
  if (j < 70) {
    const th = TAU * rnd();
    const rr = 0.055 * Math.sqrt(rnd());
    u = rr * Math.cos(th);
    v = 0.255 + rr * Math.sin(th);
  } else if (j < 160) {
    u = (rnd() - 0.5) * 0.04;
    v = 0.015 + rnd() * 0.165;
  } else {
    const s = rnd() * 2 - 1;
    u = s * 0.095;
    v = 0.15 - Math.abs(s) * 0.04 + (rnd() - 0.5) * 0.022;
  }
  const r = RHO - v;
  TIPO[i] = A_TALLO;
  AA[i] = Math.atan2(u, r);
  AR[i] = Math.hypot(u, r);
  CAr[i] = 1.15;
  CAg[i] = 1.08;
  CAb[i] = 1.0;
  TA[i] = 0.03;
  // Después: el trazo que completa la D de la luna de la derecha (de arriba abajo).
  const t = (j + 0.5) / (I_OBSERVADOR - I_HORIZONTE);
  BXp[i] = BX0 + (rnd() - 0.5) * 0.012;
  BYp[i] = BY0 + RB * (1 - 2 * t);
  BZp[i] = 0.02;
  CBr[i] = 0.55;
  CBg[i] = 0.66;
  CBb[i] = 0.92;
  TB[i] = 0.026;
  T0[i] = 3.45 + 0.35 * t;
  DUR[i] = 0.8;
}
// La Luna: muestreo del disco. Se parte en dos copias; la izquierda se voltea (C).
{
  let i = I_OBSERVADOR;
  let turno = 0;
  let turnoFlecha = 0;
  while (i < N) {
    const x = 2 * rnd() - 1;
    const y = 2 * rnd() - 1;
    const u = rnd();
    if (x * x + y * y > 0.997) continue;
    const ilu = sombrear(x, y, KA, 1);
    if (!ilu && u > 0.13) continue;
    AA[i] = x;
    AR[i] = y;
    CAr[i] = TMP[0] * 0.85;
    CAg[i] = TMP[1] * 0.85;
    CAb[i] = TMP[2] * 0.85;
    TA[i] = ilu ? 0.03 : 0.027;
    if (!ilu && u < 0.13 * 0.66) {
      // dos tercios de la luz cenicienta se van a engrosar las flechas
      TIPO[i] = L_FLECHA;
      puntoFlecha(i, turnoFlecha++ % 2 ? 1 : -1);
      T0[i] = 2.75 + 0.15 * rnd() + 0.45 * LY[i];
      DUR[i] = 0.95;
      i++;
      continue;
    }
    // Equivalente en una luna con terminador KB (conserva iluminado/sombra).
    const w = Math.sqrt(Math.max(0, 1 - y * y));
    const xb = ilu ? KB * w + ((x - KA * w) * (1 - KB)) / (1 - KA) : -w + ((x + w) * (1 + KB)) / (1 + KA);
    XB[i] = xb;
    const ce = ilu ? 1 : 0.8; // luz cenicienta algo más tenue: que destaquen las letras
    sombrear(xb, y, KB, 1);
    CMr[i] = TMP[0] * ce;
    CMg[i] = TMP[1] * ce;
    CMb[i] = TMP[2] * ce;
    const esC = turno++ % 2 === 0;
    TIPO[i] = esC ? A_LUNA_C : A_LUNA_D;
    if (esC) sombrear(-xb, y, KB, -1);
    CBr[i] = TMP[0] * ce;
    CBg[i] = TMP[1] * ce;
    CBb[i] = TMP[2] * ce;
    BZp[i] = 0.18 * Math.sqrt(Math.max(0, 1 - xb * xb - y * y));
    TB[i] = ilu ? 0.029 : 0.026;
    T0[i] = 2.75 + 0.15 * rnd();
    DUR[i] = 0.85;
    TF[i] = 3.05 + 0.12 * rnd();
    i++;
  }
}

// --- coreografía ---
let ultimo = NaN;
let ce = 0;
let se = -1;
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  // el observador da media vuelta (de abajo a arriba, en sentido antihorario)
  const fi = -Math.PI / 2 + Math.PI * suave((ts - 0.85) / 1.75);
  ce = Math.cos(fi);
  se = Math.sin(fi);
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  const tipo = TIPO[i];
  const q = suave((ts - T0[i]) / DUR[i]);
  const tw = 1 + 0.08 * Math.sin(t * 1.7 + FASE[i]);

  if (tipo === A_LUNA_D || tipo === A_LUNA_C) {
    // La Luna se encoge y se parte en dos; la copia izquierda se voltea y queda como C.
    const lado = tipo === A_LUNA_D ? 1 : -1;
    const cx = AX0 + (lado * BX0 - AX0) * q;
    const cy = AY0 + (BY0 - AY0) * q;
    const r = RA + (RB - RA) * q;
    const lx = AA[i] + (XB[i] - AA[i]) * q;
    let X = lx;
    let Z = BZp[i] * q;
    let cr = CAr[i] + (CMr[i] - CAr[i]) * q;
    let cg = CAg[i] + (CMg[i] - CAg[i]) * q;
    let cb = CAb[i] + (CMb[i] - CAb[i]) * q;
    if (lado < 0) {
      const qf = suave((ts - TF[i]) / 0.75);
      if (qf > 0) {
        const ang = Math.PI * qf;
        X = lx * Math.cos(ang);
        Z += lx * Math.sin(ang) * 0.6;
        const m = suave((qf - 0.38) / 0.24);
        cr += (CBr[i] - cr) * m;
        cg += (CBg[i] - cg) * m;
        cb += (CBb[i] - cb) * m;
      }
    }
    p[0] = cx + r * X;
    p[1] = cy + r * AR[i];
    p[2] = r * Z;
    c[0] = cr * tw;
    c[1] = cg * tw;
    c[2] = cb * tw;
    return TA[i] + (TB[i] - TA[i]) * q;
  }

  let ax;
  let ay;
  if (tipo === L_FLECHA) {
    ax = AX0 + RA * AA[i];
    ay = AY0 + RA * AR[i];
  } else {
    const a = AA[i];
    const rr = AR[i];
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    ax = AX0 + rr * (ca * ce - sa * se); // ángulo total = a + fi
    ay = AY0 + rr * (sa * ce + ca * se);
  }
  if (q <= 0) {
    p[0] = ax;
    p[1] = ay;
    p[2] = 0;
    c[0] = CAr[i] * tw;
    c[1] = CAg[i] * tw;
    c[2] = CAb[i] * tw;
    return TA[i];
  }
  // pulso que recorre las flechas en su sentido
  let kb = tw;
  if (tipo !== A_TALLO) {
    const ola = 0.5 + 0.5 * Math.sin(TAU * (LY[i] * 1.3 - t * 0.8));
    kb = 0.8 + 0.45 * ola * ola;
  }
  const arco = Math.sin(Math.PI * q);
  p[0] = ax + (BXp[i] - ax) * q;
  p[1] = ay + (BYp[i] - ay) * q;
  p[2] = BZp[i] * q + arco * 0.25 * Math.sin(FASE[i]);
  c[0] = CAr[i] * tw + (CBr[i] * kb - CAr[i] * tw) * q;
  c[1] = CAg[i] * tw + (CBg[i] * kb - CAg[i] * tw) * q;
  c[2] = CAb[i] * tw + (CBb[i] * kb - CAb[i] * tw) * q;
  return TA[i] + (TB[i] - TA[i]) * q;
}
