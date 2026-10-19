// Escena 4 (solo español): «La Luna no cambia: cambias tú. En España la llaman
// mentirosa: si parece la C, decrece; si parece la D, crece.»
// Toda la coreografía va anclada a las marcas de la voz (marca(); por defecto, las del español):
//   … → tu      Luna quieta; el anillo del punto de vista da media vuelta y termina con «tú».
//   espana      el anillo se deshace en polvo tenue y la Luna sube a preparar la regla.
//   c           la Luna se parte: una copia se voltea y queda como C (izquierda) y la otra
//               se apaga como Luna nueva a la derecha (el hueco de la D).
//   decrece     flecha naranja-rojiza hacia ABAJO bajo la C (se dibuja de la cola a la punta).
//   d           la Luna nueva se ilumina como D y se dibuja su trazo vertical.
//   crece       flecha verde-azulada hacia ARRIBA bajo la D.
import { N, TAU, S1, S2, S3, S4, marca } from './base.js';

export const camara = { pos: [0, 0.45, 7], mira: [0, 0.45, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
// Pulso breve cuando se dice una palabra clave.
const pulsoEn = (x) => (x < -0.1 ? 0 : x < 0.1 ? (x + 0.1) * 5 : Math.exp(-(x - 0.1) / 0.45));

// Primer tiempo: una Luna quieta y el anillo del observador alrededor.
const AX0 = 0;
const AY0 = 0.88;
const RA = 0.78;
const KA = 0.48; // terminador: x = K·√(1−y²)
const RHO = 1.15; // radio del anillo
// Mientras se dice «En España la llaman mentirosa», la Luna sube y se encoge un poco.
const MX = 0;
const MY = 1.36;
const RM = 0.68;
// Segundo tiempo: C a la izquierda y D a la derecha, con sus flechas debajo.
const BX0 = 0.7;
const BY0 = 1.56;
const RB = 0.56;
const KB = 0.42;
const FL_ARRIBA = 0.74; // extremo superior de las flechas
const FL_ABAJO = -0.22; // extremo inferior
const FL_PUNTA = 0.36; // altura de la punta
const FL_BASE = 0.48; // anchura de la punta
const FL_ASTIL = 0.15; // anchura del astil

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
// Devuelve 1 si el punto está iluminado. Con lado = 0, solo luz cenicienta (Luna nueva).
const TMP = [0, 0, 0];
function sombrear(x, y, K, lado) {
  const SF = Math.sqrt(1 - K * K);
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const L = lado === 0 ? -1 : lado * x * SF - z * K;
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

// --- bloques de partículas (las primeras llegan antes en la transición: el anillo) ---
const I_ANILLO = 500; // anillo fino
const I_HORIZONTE = 1100; // arco del horizonte
const I_OBSERVADOR = 1300; // figura del observador
const I_TRAZO = 1000; // desde aquí hasta I_OBSERVADOR: acabarán en el trazo de la D
// resto: la Luna → las dos copias (C y D) y su luz cenicienta sobrante → flechas

// Tipos (qué hace cada partícula en el segundo tiempo).
const R_FLECHA = 0; // anillo → polvo → flecha
const R_TRAZO = 1; // anillo / observador → polvo → trazo de la D
const L_FLECHA = 2; // luz cenicienta de la Luna → polvo → flecha
const L_C = 3; // copia que se voltea como una moneda y queda como C (izquierda)
const L_D = 4; // copia que se apaga (Luna nueva) a la derecha y se ilumina como D

const TIPO = new Int8Array(N);
const LADO = new Int8Array(N); // flecha: −1 izquierda (C, baja); 1 derecha (D, sube)
const PX = new Float32Array(N); // primer tiempo: ángulo (anillo) o x local (Luna)
const PY = new Float32Array(N); // primer tiempo: radio (anillo) o y local (Luna)
const XB = new Float32Array(N); // x local en la luna pequeña (iluminada a la derecha)
const XG = new Float32Array(N); // x local en la Luna nueva (copia D)
const ZB = new Float32Array(N); // relieve
const TX = new Float32Array(N); // destino (flechas y trazo)
const TY = new Float32Array(N);
const DXh = new Float32Array(N); // hogar en el polvo
const DYh = new Float32Array(N);
const LY = new Float32Array(N); // posición a lo largo de la flecha (0 cola, 1 punta) o del trazo
const CAr = new Float32Array(N); // color del primer tiempo
const CAg = new Float32Array(N);
const CAb = new Float32Array(N);
const CMr = new Float32Array(N); // color en la luna pequeña iluminada a la derecha
const CMg = new Float32Array(N);
const CMb = new Float32Array(N);
const CFr = new Float32Array(N); // color final (C), de Luna nueva (D) o de flecha / trazo
const CFg = new Float32Array(N);
const CFb = new Float32Array(N);
const TA = new Float32Array(N);
const TB = new Float32Array(N);
const FASE = new Float32Array(N);

for (let i = 0; i < N; i++) FASE[i] = TAU * S3[i];

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
  LADO[i] = lado;
  TX[i] = lado * BX0 + x;
  TY[i] = lado < 0 ? FL_ARRIBA - s : FL_ABAJO + s;
  LY[i] = s / largo;
  // borde del astil y de la punta algo más brillantes: la silueta se lee mejor
  const k = 1 + 0.25 * Math.abs(x) / (s < astil ? FL_ASTIL * 0.5 : FL_BASE * 0.5);
  if (lado < 0) {
    CFr[i] = 1.2 * k;
    CFg[i] = 0.4 * k;
    CFb[i] = 0.13 * k;
  } else {
    CFr[i] = 0.12 * k;
    CFg[i] = 0.95 * k;
    CFb[i] = 0.72 * k;
  }
  TB[i] = 0.041;
  // polvo: una nube amplia y tenue alrededor de su flecha
  DXh[i] = lado * BX0 + (rnd() - 0.5) * 1.15;
  DYh[i] = 0.26 + (rnd() - 0.5) * 1.3;
}

// Trazo vertical de la D (de cuerno a cuerno, x = 0 en la luna de la derecha).
function puntoTrazo(i, s) {
  const aura = rnd() > 0.8;
  TX[i] = BX0 + (rnd() - 0.5) * (aura ? 0.06 : 0.016);
  TY[i] = BY0 + RB * (1 - 2 * s);
  LY[i] = s;
  const k = aura ? 0.4 : 1.25;
  CFr[i] = 0.8 * k;
  CFg[i] = 0.92 * k;
  CFb[i] = 1.12 * k;
  TB[i] = aura ? 0.03 : 0.033;
  DXh[i] = BX0 + (rnd() - 0.5) * 1.3;
  DYh[i] = BY0 + (rnd() - 0.5) * 1.4;
}

// Anillo fino con marcas cada 30° (para que se note el giro).
for (let i = 0; i < I_ANILLO; i++) {
  const a = TAU * ((i + rnd() * 0.6) / I_ANILLO);
  PX[i] = a;
  PY[i] = RHO + (rnd() - 0.5) * 0.012;
  const mk = Math.pow(Math.max(0, Math.cos(12 * a)), 10);
  const k = 0.32 + 1.0 * mk;
  CAr[i] = 0.3 * k;
  CAg[i] = 0.72 * k;
  CAb[i] = 1.0 * k;
  TA[i] = 0.024 + 0.012 * mk;
}
// Arco del horizonte (el suelo del observador), más brillante y algo más grueso.
for (let i = I_ANILLO; i < I_HORIZONTE; i++) {
  const s = rnd() * 2 - 1;
  PX[i] = s * 0.62;
  PY[i] = RHO + 0.006 + rnd() * 0.03;
  const k = 1.15 * (1 - s * s) ** 0.6 + 0.15;
  CAr[i] = 0.45 * k;
  CAg[i] = 0.8 * k;
  CAb[i] = 1.0 * k;
  TA[i] = 0.03;
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
  PX[i] = Math.atan2(u, r);
  PY[i] = Math.hypot(u, r);
  CAr[i] = 1.15;
  CAg[i] = 1.08;
  CAb[i] = 1.0;
  TA[i] = 0.03;
}
// Destinos del anillo: flechas (cada mitad del anillo, a su lado) y el trazo de la D.
for (let i = 0; i < I_OBSERVADOR; i++) {
  if (i < I_TRAZO) {
    TIPO[i] = R_FLECHA;
    // al acabar el giro el observador está arriba: ángulo en pantalla = a + π/2
    puntoFlecha(i, Math.cos(PX[i] + Math.PI / 2) < 0 ? -1 : 1);
  } else {
    TIPO[i] = R_TRAZO;
    puntoTrazo(i, (i - I_TRAZO + rnd()) / (I_OBSERVADOR - I_TRAZO));
  }
}
// La Luna: muestreo del disco. Se parte en dos copias; dos tercios de su luz cenicienta
// se van a las flechas.
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
    PX[i] = x;
    PY[i] = y;
    CAr[i] = TMP[0] * 0.85;
    CAg[i] = TMP[1] * 0.85;
    CAb[i] = TMP[2] * 0.85;
    TA[i] = ilu ? 0.03 : 0.027;
    if (!ilu && u < 0.13 * 0.66) {
      TIPO[i] = L_FLECHA;
      puntoFlecha(i, turnoFlecha++ % 2 ? 1 : -1);
      i++;
      continue;
    }
    // Equivalente en una luna con terminador KB (conserva iluminado / sombra).
    const w = Math.sqrt(Math.max(0, 1 - y * y));
    const xb = ilu ? KB * w + ((x - KA * w) * (1 - KB)) / (1 - KA) : -w + ((x + w) * (1 + KB)) / (1 + KA);
    XB[i] = xb;
    const ce = ilu ? 1 : 0.75; // luz cenicienta algo más tenue: que destaquen las letras
    sombrear(xb, y, KB, 1);
    CMr[i] = TMP[0] * ce;
    CMg[i] = TMP[1] * ce;
    CMb[i] = TMP[2] * ce;
    ZB[i] = 0.18 * Math.sqrt(Math.max(0, 1 - xb * xb - y * y));
    TB[i] = ilu ? 0.029 : 0.026;
    const esC = turno++ % 2 === 0;
    if (esC) {
      TIPO[i] = L_C;
      // tras voltearse, el punto queda en −xb: color de la C (iluminada a la izquierda)
      sombrear(-xb, y, KB, -1);
      CFr[i] = TMP[0] * ce;
      CFg[i] = TMP[1] * ce;
      CFb[i] = TMP[2] * ce;
    } else {
      TIPO[i] = L_D;
      // Luna nueva: el creciente se reparte uniformemente por todo el disco
      const xg = ilu ? -w + (2 * (xb - KB * w)) / (1 - KB) : -w + (2 * (xb + w)) / (1 + KB);
      XG[i] = xg;
      sombrear(xg, y, KB, 0);
      CFr[i] = TMP[0] * 0.5;
      CFg[i] = TMP[1] * 0.5;
      CFb[i] = TMP[2] * 0.5;
    }
    i++;
  }
}

// --- coreografía, anclada a las marcas de la voz ---
let ultimo = NaN;
let ce = 0;
let se = -1;
let tPolvo = 2.31; // el anillo se deshace
let tSube = 2.31; // la Luna sube
let tParte = 4.25; // la Luna se parte (C y Luna nueva)
let tVuelta = 4.3; // la copia C se voltea
let tFlC = 4.6; // empieza la flecha de la C
let tLuz = 5.75; // la Luna nueva se ilumina como D
let tTrazo = 5.95; // se dibuja el trazo de la D
let tFlD = 6.05; // empieza la flecha de la D
let pC = 0;
let pD = 0;
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  const mTu = marca('tu', 1.79);
  const mEsp = marca('espana', 2.31);
  const mC = marca('c', 4.59);
  const mDec = marca('decrece', 4.77);
  const mD = marca('d', 6.07);
  const mCre = marca('crece', 6.35);
  // El observador da media vuelta (de abajo a arriba, antihorario) y llega con «tú».
  const g0 = Math.max(0.45, mTu - 1.25);
  const fi = -Math.PI / 2 + Math.PI * suave((ts - g0) / (mTu - g0));
  ce = Math.cos(fi);
  se = Math.sin(fi);
  tPolvo = Math.max(mTu + 0.25, mEsp - 0.1);
  tSube = tPolvo + 0.1;
  // La C está entera ≈0,25 s después de decirse «C».
  tParte = mC - 0.5;
  tVuelta = mC - 0.42;
  // Flecha de la C: arranca con «decrece» y se dibuja durante la palabra.
  tFlC = mDec - 0.2;
  // La D se ilumina justo al decirse «D» y el trazo la cierra enseguida.
  tLuz = mD - 0.42;
  tTrazo = mD - 0.36;
  // Flecha de la D: algo más rápida (la escena acaba pronto).
  tFlD = mCre - 0.35;
  pC = pulsoEn(ts - mC - 0.15);
  pD = pulsoEn(ts - mD - 0.1);
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  const tipo = TIPO[i];
  const tw = 1 + 0.08 * Math.sin(t * 1.7 + FASE[i]);

  if (tipo === L_C || tipo === L_D) {
    const x0 = PX[i];
    const y = PY[i];
    // 1) la Luna sube y se encoge (y su terminador pasa de KA a KB)
    const qm = suave((ts - tSube - 0.15 * S3[i]) / 1.25);
    let cx = AX0 + (MX - AX0) * qm;
    let cy = AY0 + (MY - AY0) * qm;
    let r = RA + (RM - RA) * qm;
    let lx = x0 + (XB[i] - x0) * qm;
    let lz = ZB[i] * qm;
    let cr = CAr[i] + (CMr[i] - CAr[i]) * qm;
    let cg = CAg[i] + (CMg[i] - CAg[i]) * qm;
    let cb = CAb[i] + (CMb[i] - CAb[i]) * qm;
    // 2) se parte: cada copia a su sitio
    const qs = suave((ts - tParte - 0.12 * S2[i]) / 0.7);
    let X = lx;
    if (qs > 0) {
      const lado = tipo === L_D ? 1 : -1;
      cx += (lado * BX0 - cx) * qs;
      cy += (BY0 - cy) * qs;
      r += (RB - r) * qs;
      if (lado < 0) {
        // la C: se voltea como una moneda y aparece iluminada a la izquierda
        const qf = suave((ts - tVuelta - 0.08 * S2[i]) / 0.55);
        const ang = Math.PI * qf;
        X = lx * Math.cos(ang);
        lz += lx * Math.sin(ang) * 0.6;
        const m = suave((qf - 0.38) / 0.24);
        const k = 1 + 0.35 * pC;
        cr = (cr + (CFr[i] - cr) * m) * k;
        cg = (cg + (CFg[i] - cg) * m) * k;
        cb = (cb + (CFb[i] - cb) * m) * k;
      } else {
        // la D: se apaga (Luna nueva) y, al decir «D», se ilumina desde el limbo derecho
        const ql = suave((ts - tLuz - 0.16 * (1 - XB[i]) * 0.5) / 0.42);
        const xg = lx + (XG[i] - lx) * qs;
        X = xg + (XB[i] - xg) * ql;
        const ag = qs * (1 - ql);
        const k = 1 + 0.35 * pD;
        cr = (cr + (CFr[i] - cr) * ag) * (1 + (k - 1) * ql);
        cg = (cg + (CFg[i] - cg) * ag) * (1 + (k - 1) * ql);
        cb = (cb + (CFb[i] - cb) * ag) * (1 + (k - 1) * ql);
        lz *= 1 - 0.6 * ag;
      }
    }
    p[0] = cx + r * X;
    p[1] = cy + r * y;
    p[2] = r * lz;
    c[0] = cr * tw;
    c[1] = cg * tw;
    c[2] = cb * tw;
    return TA[i] + (TB[i] - TA[i]) * qm;
  }

  // --- primer tiempo: anillo / observador (giran) o luz cenicienta de la Luna ---
  let ax;
  let ay;
  if (tipo === L_FLECHA) {
    const qm = suave((ts - tSube) / 1.25);
    ax = AX0 + (MX - AX0) * qm + (RA + (RM - RA) * qm) * PX[i];
    ay = AY0 + (MY - AY0) * qm + (RA + (RM - RA) * qm) * PY[i];
  } else {
    const a = PX[i];
    const rr = PY[i];
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    ax = AX0 + rr * (ca * ce - sa * se); // ángulo total = a + fi
    ay = AY0 + rr * (sa * ce + ca * se);
  }
  // 2) se deshace en polvo tenue que deriva despacio
  const qd = suave((ts - tPolvo - (tipo === L_FLECHA ? 0.5 : 0.45) * S1[i]) / 0.95);
  if (qd <= 0) {
    p[0] = ax;
    p[1] = ay;
    p[2] = 0;
    c[0] = CAr[i] * tw;
    c[1] = CAg[i] * tw;
    c[2] = CAb[i] * tw;
    return TA[i];
  }
  const f = FASE[i];
  const dx = DXh[i] + 0.05 * Math.sin(t * 0.55 + f);
  const dy = DYh[i] + 0.05 * Math.cos(t * 0.47 + 1.3 * f);
  const brillo = (0.1 + 0.12 * S4[i]) * (0.75 + 0.25 * Math.sin(t * 2.3 + 2 * f));
  let x = ax + (dx - ax) * qd;
  let yy = ay + (dy - ay) * qd;
  let z = Math.sin(Math.PI * qd) * 0.3 * (S2[i] - 0.5);
  let cr = CAr[i] * tw + (0.42 * brillo - CAr[i] * tw) * qd;
  let cg = CAg[i] * tw + (0.6 * brillo - CAg[i] * tw) * qd;
  let cb = CAb[i] * tw + (1.0 * brillo - CAb[i] * tw) * qd;
  let tam = TA[i] + (0.022 - TA[i]) * qd;
  // 3) se reúne en su flecha (de la cola a la punta) o en el trazo de la D (de arriba abajo)
  let t0;
  let dur;
  if (tipo === R_TRAZO) {
    t0 = tTrazo + 0.2 * LY[i] + 0.04 * S3[i];
    dur = 0.28;
  } else if (LADO[i] < 0) {
    t0 = tFlC + 0.42 * LY[i] + 0.06 * S3[i];
    dur = 0.5;
  } else {
    t0 = tFlD + 0.25 * LY[i] + 0.05 * S3[i];
    dur = 0.35;
  }
  const qa = suave((ts - t0) / dur);
  if (qa > 0) {
    let kb = tw;
    if (tipo === R_TRAZO) {
      kb = (1 + 0.06 * Math.sin(t * 3 + LY[i] * 9)) * (1 + 0.35 * pD);
    } else {
      // pulso que recorre la flecha en su sentido
      const ola = 0.5 + 0.5 * Math.sin(TAU * (LY[i] * 1.3 - t * 0.8));
      kb = 0.8 + 0.45 * ola * ola;
    }
    // la punta del dibujo llega más brillante
    const punta = 1 + 0.5 * Math.exp(-Math.max(0, ts - t0 - dur) / 0.25);
    x += (TX[i] - x) * qa;
    yy += (TY[i] - yy) * qa;
    z = z * (1 - qa) + Math.sin(Math.PI * qa) * 0.15 * Math.sin(f);
    cr += (CFr[i] * kb * punta - cr) * qa;
    cg += (CFg[i] * kb * punta - cg) * qa;
    cb += (CFb[i] * kb * punta - cb) * qa;
    tam += (TB[i] - tam) * qa;
  }
  p[0] = x;
  p[1] = yy;
  p[2] = z;
  c[0] = cr;
  c[1] = cg;
  c[2] = cb;
  return tam;
}
