// Escena 4 (solo inglés): «The Moon doesn't change. You do. Remember D, O, C: D waxes,
// O is full, C wanes. In Argentina, flip it: C, O, D.»
// Toda la coreografía va anclada a las marcas de la voz (marca(); por defecto, las del inglés,
// porque esta escena solo existe en ese idioma):
//   … → tu      Luna quieta; el anillo del punto de vista da media vuelta y termina con «You».
//   doc         la Luna se reparte en TRES, de izquierda a derecha: D (creciente iluminada a la
//               derecha, con su trazo vertical), O (llena: el anillo se cierra en ella) y C
//               (la copia que se voltea, iluminada a la izquierda), al ritmo de «D, O, C».
//   d           «D waxes»: flecha verde-azulada hacia ARRIBA bajo la D.
//   o           «O is full»: la O brilla un momento.
//   c           «C wanes»: flecha naranja-rojiza hacia ABAJO bajo la C.
//   argentina   bajo la O se escribe «AR» bajo una línea dorada (el ecuador): hemisferio sur.
//   flip        cada luna gira 180° en su sitio: la D queda con forma de C (y pierde el trazo)
//               y la C con forma de D (y lo gana). Las flechas no se mueven: ahora, de izquierda
//               a derecha, C ↑ verde, O, D ↓ naranja; el brillo las recorre al decir «C, O, D».
import { N, TAU, S1, S2, S3, S4, marca, glifo } from './base.js';

export const camara = { pos: [0, 0.45, 7], mira: [0, 0.45, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const pulsoEn = (x) => (x < -0.1 ? 0 : x < 0.1 ? (x + 0.1) * 5 : Math.exp(-(x - 0.1) / 0.45));

// Primer tiempo: una Luna quieta y el anillo del observador alrededor.
const AX0 = 0;
const AY0 = 0.88;
const RA = 0.78;
const KA = 0.48; // terminador: x = K·√(1−y²)
const RHO = 1.15;
// Segundo tiempo: tres lunas en fila (D, O, C) y, debajo, flechas y la etiqueta «AR».
const FX = 0.9; // separación horizontal
const FY = 1.47; // altura de la fila
const R3 = 0.4; // radio de cada luna
const KB = 0.42;
const FL_ARRIBA = 0.8;
const FL_ABAJO = -0.24;
const FL_PUNTA = 0.33;
const FL_BASE = 0.46;
const FL_ASTIL = 0.145;
const AR_X = 0;
const AR_Y = 0.2; // centro de la etiqueta «AR»
const AR_H = 0.34; // altura de las letras
const EC_Y = 0.58; // línea del ecuador (dorada, como en la escena 1), encima
const EC_W = 0.5; // media anchura

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

// Color en (x, y) del disco unidad; lado = 1 iluminada a la derecha, −1 a la izquierda,
// 2 Luna llena. Devuelve 1 si el punto está iluminado.
const TMP = [0, 0, 0];
function sombrear(x, y, K, lado) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const m = mares(x, y);
  const v = textura(x, y);
  const cr = crater(x, y);
  if (lado === 2) {
    // llena: de frente, con un leve oscurecimiento hacia el limbo
    const b = (0.62 + 0.5 * Math.pow(z, 0.5)) * v * (1 - 0.5 * m) * (1 + 0.3 * cr) * 1.25;
    TMP[0] = (1.0 - 0.34 * m) * b;
    TMP[1] = (0.95 - 0.23 * m) * b;
    TMP[2] = (0.86 - 0.02 * m) * b;
    return 1;
  }
  const SF = Math.sqrt(1 - K * K);
  const L = lado * x * SF - z * K;
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

let semilla = 3051987;
function rnd() {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
}

// --- bloques de partículas (las primeras llegan antes en la transición: el anillo) ---
const I_ANILLO = 500;
const I_HORIZONTE = 1100;
const I_OBSERVADOR = 1300;
const I_AR = 800; // desde aquí hasta I_OBSERVADOR: etiqueta «AR» y ecuador
const N_AR = 420; // letras (el resto, la línea del ecuador)
// resto: la Luna → D, C, O, trazo de la D y flechas

const R_O = 0; // anillo → se cierra en la O
const R_AR = 1; // anillo / observador → polvo → «AR» o ecuador
const L_D = 2; // Luna → D (izquierda)
const L_C = 3; // Luna → se voltea como una moneda → C (derecha)
const L_O = 4; // Luna → O (centro)
const L_TRAZO = 5; // luz cenicienta → trazo de la D
const L_FLECHA = 6; // luz cenicienta → polvo → flecha

const TIPO = new Int8Array(N);
const COL = new Int8Array(N); // columna: 0 izquierda, 1 centro, 2 derecha
const PX = new Float32Array(N); // primer tiempo: ángulo (anillo) o x local (Luna)
const PY = new Float32Array(N); // primer tiempo: radio (anillo) o y local (Luna)
const QX = new Float32Array(N); // destino: x local en su luna (sin girar) o x del mundo
const QY = new Float32Array(N);
const XB = new Float32Array(N); // C: x local antes de voltearse
const ZB = new Float32Array(N); // relieve
const DXh = new Float32Array(N); // hogar en el polvo
const DYh = new Float32Array(N);
const LY = new Float32Array(N); // a lo largo de la flecha (0 cola, 1 punta) / del trazo / de la etiqueta
const CAr = new Float32Array(N);
const CAg = new Float32Array(N);
const CAb = new Float32Array(N);
const CFr = new Float32Array(N);
const CFg = new Float32Array(N);
const CFb = new Float32Array(N);
const CMr = new Float32Array(N); // C: color antes de voltearse (iluminada a la derecha)
const CMg = new Float32Array(N);
const CMb = new Float32Array(N);
const TA = new Float32Array(N);
const TB = new Float32Array(N);
const FASE = new Float32Array(N);

for (let i = 0; i < N; i++) FASE[i] = TAU * S3[i];

// Punto de una flecha (columna 0: bajo la D, verde, sube; columna 2: bajo la C, naranja, baja).
function puntoFlecha(i, col) {
  const largo = FL_ARRIBA - FL_ABAJO;
  const astil = largo - FL_PUNTA;
  const aAstil = astil * FL_ASTIL;
  const aPunta = 0.5 * FL_PUNTA * FL_BASE;
  let x;
  let s;
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
    s = astil + FL_PUNTA * v;
    x = (u - 0.5 * (1 - v)) * FL_BASE;
  }
  const sube = col === 0;
  COL[i] = col;
  QX[i] = (col - 1) * FX + x;
  QY[i] = sube ? FL_ABAJO + s : FL_ARRIBA - s;
  LY[i] = s / largo;
  const k = 1 + (0.25 * Math.abs(x)) / (s < astil ? FL_ASTIL * 0.5 : FL_BASE * 0.5);
  if (sube) {
    CFr[i] = 0.12 * k;
    CFg[i] = 0.95 * k;
    CFb[i] = 0.72 * k;
  } else {
    CFr[i] = 1.2 * k;
    CFg[i] = 0.4 * k;
    CFb[i] = 0.13 * k;
  }
  TB[i] = 0.038;
  DXh[i] = (col - 1) * FX + (rnd() - 0.5) * 0.9;
  DYh[i] = 0.28 + (rnd() - 0.5) * 1.25;
}

// Anillo fino con marcas cada 30°.
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
// Arco del horizonte.
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
// Observador.
for (let i = I_HORIZONTE; i < I_OBSERVADOR; i++) {
  const j = i - I_HORIZONTE;
  let u;
  let v;
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
// Destinos del anillo: el anillo se cierra en la O; el resto, a la etiqueta «AR».
for (let i = 0; i < I_OBSERVADOR; i++) {
  if (i < I_AR) {
    TIPO[i] = R_O;
    COL[i] = 1;
    // cae hacia dentro por su mismo ángulo de pantalla (el horizonte, a un ángulo cualquiera)
    const a = i < I_ANILLO ? PX[i] + Math.PI / 2 : TAU * rnd();
    const rr = Math.sqrt(rnd()) * 0.995;
    const x = rr * Math.cos(a);
    const y = rr * Math.sin(a);
    QX[i] = x;
    QY[i] = y;
    ZB[i] = 0.18 * Math.sqrt(Math.max(0, 1 - x * x - y * y));
    sombrear(x, y, 0, 2);
    CFr[i] = TMP[0];
    CFg[i] = TMP[1];
    CFb[i] = TMP[2];
    TB[i] = 0.031;
  } else {
    TIPO[i] = R_AR;
    COL[i] = 1;
    const j = i - I_AR;
    if (j < N_AR) {
      LY[i] = -1; // letras: la posición sale del glifo (se calcula al primer fotograma)
      CFr[i] = 0.72;
      CFg[i] = 0.95;
      CFb[i] = 1.3;
      TB[i] = 0.034;
    } else {
      // ecuador: línea fina punteada, de izquierda a derecha
      const s = (j - N_AR + rnd()) / (I_OBSERVADOR - I_AR - N_AR);
      LY[i] = s;
      QX[i] = AR_X - EC_W + 2 * EC_W * s;
      QY[i] = EC_Y + (rnd() - 0.5) * 0.012;
      const k = 1.15 * (0.85 + 0.15 * Math.cos(TAU * 7 * s)) * (0.4 + 0.6 * Math.sin(Math.PI * s) ** 0.3);
      CFr[i] = 1.1 * k;
      CFg[i] = 0.8 * k;
      CFb[i] = 0.32 * k;
      TB[i] = 0.032;
    }
    DXh[i] = AR_X + (rnd() - 0.5) * 1.0;
    DYh[i] = AR_Y + 0.15 + (rnd() - 0.5) * 0.9;
  }
}
// La Luna: muestreo del disco y reparto entre D, C, O, el trazo y las flechas.
{
  let i = I_OBSERVADOR;
  let turnoFlecha = 0;
  let nTrazo = 0;
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
    const w = Math.sqrt(Math.max(0, 1 - y * y));
    const xb = ilu ? KB * w + ((x - KA * w) * (1 - KB)) / (1 - KA) : -w + ((x + w) * (1 + KB)) / (1 + KA);
    const zb = 0.18 * Math.sqrt(Math.max(0, 1 - xb * xb - y * y));
    const v = rnd();
    if (ilu ? v < 0.265 : v < 0.08) {
      // D: la misma luna, más pequeña, a la izquierda
      TIPO[i] = L_D;
      COL[i] = 0;
      QX[i] = xb;
      QY[i] = y;
      ZB[i] = zb;
      sombrear(xb, y, KB, 1);
      const ce = ilu ? 1 : 0.7;
      CFr[i] = TMP[0] * ce;
      CFg[i] = TMP[1] * ce;
      CFb[i] = TMP[2] * ce;
      TB[i] = ilu ? 0.027 : 0.024;
    } else if (ilu ? v < 0.53 : v < 0.16) {
      // C: copia que se voltea como una moneda y queda iluminada a la izquierda
      TIPO[i] = L_C;
      COL[i] = 2;
      XB[i] = xb;
      QX[i] = -xb;
      QY[i] = y;
      ZB[i] = zb;
      const ce = ilu ? 1 : 0.7;
      sombrear(xb, y, KB, 1);
      CMr[i] = TMP[0] * ce;
      CMg[i] = TMP[1] * ce;
      CMb[i] = TMP[2] * ce;
      sombrear(-xb, y, KB, -1);
      CFr[i] = TMP[0] * ce;
      CFg[i] = TMP[1] * ce;
      CFb[i] = TMP[2] * ce;
      TB[i] = ilu ? 0.027 : 0.024;
    } else if (ilu) {
      // O: Luna llena
      TIPO[i] = L_O;
      COL[i] = 1;
      const a = TAU * rnd();
      const rr = Math.sqrt(rnd()) * 0.995;
      const ox = rr * Math.cos(a);
      const oy = rr * Math.sin(a);
      QX[i] = ox;
      QY[i] = oy;
      ZB[i] = 0.18 * Math.sqrt(Math.max(0, 1 - rr * rr));
      sombrear(ox, oy, 0, 2);
      CFr[i] = TMP[0];
      CFg[i] = TMP[1];
      CFb[i] = TMP[2];
      TB[i] = 0.031;
    } else if (nTrazo < 260 && v < 0.34) {
      // trazo vertical de la D (x = 0, de cuerno a cuerno)
      TIPO[i] = L_TRAZO;
      COL[i] = 0;
      const s = rnd();
      const aura = rnd() > 0.8;
      LY[i] = s;
      QX[i] = (rnd() - 0.5) * (aura ? 0.16 : 0.04);
      QY[i] = 1 - 2 * s;
      const k = aura ? 0.4 : 1.25;
      CFr[i] = 0.8 * k;
      CFg[i] = 0.92 * k;
      CFb[i] = 1.12 * k;
      TB[i] = aura ? 0.028 : 0.031;
      nTrazo++;
    } else {
      TIPO[i] = L_FLECHA;
      puntoFlecha(i, turnoFlecha++ % 2 ? 2 : 0);
    }
    i++;
  }
}

// Letras «AR»: se muestrean del glifo la primera vez que se dibuja (necesita el navegador).
let letras = null;
function prepararLetras() {
  letras = glifo('AR', N_AR, { semilla: 5 });
  for (let i = I_AR; i < I_AR + N_AR; i++) {
    const k = i - I_AR;
    const gx = letras[k * 2];
    const gy = letras[k * 2 + 1];
    QX[i] = AR_X + AR_H * gx;
    QY[i] = AR_Y + AR_H * gy;
    LY[i] = lim(0.5 + gx * 0.7); // se escribe de izquierda a derecha
  }
}

// --- coreografía, anclada a las marcas de la voz ---
let ultimo = NaN;
let ce = 0;
let se = -1;
let tSale = 1.9; // la Luna empieza a repartirse
let tDoc = 2.33;
let tFlD = 3.6;
let tFlC = 5.4;
let tAR = 6.2;
let cg = 1; // giro de 180° de las tres lunas
let sg = 0;
let qg = 0;
let pD = 0;
let pO = 0;
let pC = 0;
let pAR = 0;
const pCol = new Float32Array(3); // brillo de «C, O, D» por columnas
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  const mTu = marca('tu', 1.71);
  const mDoc = marca('doc', 2.33);
  const mD = marca('d', 3.77);
  const mO = marca('o', 4.85);
  const mC = marca('c', 5.57);
  const mAr = marca('argentina', 6.31);
  const mFlip = marca('flip', 7.11);
  const mCod = marca('cod', 7.65);
  // El observador da media vuelta y llega con «You».
  const g0 = Math.max(0.45, mTu - 1.25);
  const fi = -Math.PI / 2 + Math.PI * suave((ts - g0) / (mTu - g0));
  ce = Math.cos(fi);
  se = Math.sin(fi);
  // D, O, C se colocan al ritmo de «D, O, C».
  tDoc = mDoc;
  tSale = Math.max(mTu + 0.05, mDoc - 0.6);
  tFlD = mD - 0.15;
  tFlC = mC - 0.15;
  tAR = mAr - 0.2;
  // Giro de 180° (horario, como en luna_letras): empieza con «flip», acaba antes de «C, O, D».
  const g1 = Math.max(mFlip - 0.08, mAr + 0.5);
  const g2 = Math.max(g1 + 0.35, mCod - 0.08);
  qg = suave((ts - g1) / (g2 - g1));
  const th = -Math.PI * qg;
  cg = Math.cos(th);
  sg = Math.sin(th);
  pD = pulsoEn(ts - mD);
  pO = pulsoEn(ts - mO - 0.05);
  pC = pulsoEn(ts - mC);
  pAR = pulsoEn(ts - mAr - 0.35);
  pCol[0] = pulsoEn(ts - mCod);
  pCol[1] = pulsoEn(ts - mCod - 0.32);
  pCol[2] = pulsoEn(ts - mCod - 0.62);
}

export function forma(i, t, p, c, ts) {
  if (letras === null) prepararLetras();
  preparar(ts);
  const tipo = TIPO[i];
  const col = COL[i];
  const tw = 1 + 0.08 * Math.sin(t * 1.7 + FASE[i]);

  if (tipo === L_D || tipo === L_C || tipo === L_O || tipo === R_O) {
    // posición del primer tiempo
    let ax;
    let ay;
    if (tipo === R_O) {
      const a = PX[i];
      const rr = PY[i];
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      ax = AX0 + rr * (ca * ce - sa * se);
      ay = AY0 + rr * (sa * ce + ca * se);
    } else {
      ax = AX0 + RA * PX[i];
      ay = AY0 + RA * PY[i];
    }
    // viaje a su sitio en la fila (D primero, luego O, luego C)
    const t0 = tSale + 0.32 * col + 0.12 * S2[i];
    const q = suave((ts - t0) / (col === 2 ? 0.75 : 0.55));
    let lx = QX[i];
    let lz = ZB[i];
    let cr = CFr[i];
    let cgr = CFg[i];
    let cb = CFb[i];
    if (tipo === L_C) {
      // se voltea como una moneda durante el viaje
      const qf = suave((ts - t0 - 0.12) / 0.55);
      const ang = Math.PI * qf;
      const xb = XB[i];
      lx = xb * Math.cos(ang);
      lz = ZB[i] + xb * Math.sin(ang) * 0.6;
      const m = suave((qf - 0.38) / 0.24);
      cr = CMr[i] + (CFr[i] - CMr[i]) * m;
      cgr = CMg[i] + (CFg[i] - CMg[i]) * m;
      cb = CMb[i] + (CFb[i] - CMb[i]) * m;
    }
    // brillo: pulso de su palabra y el barrido de «C, O, D»
    const pp = col === 0 ? pD : col === 1 ? pO : pC;
    const k = (1 + (col === 1 ? 0.95 : 0.35) * pp + 0.45 * pCol[col]) * tw;
    const r = R3 * (1 + (col === 1 ? 0.08 * pO : 0));
    // giro de 180° en su sitio
    const ly = QY[i];
    const gx = lx * cg - ly * sg;
    const gy = lx * sg + ly * cg;
    const bx = (col - 1) * FX + r * gx;
    const by = FY + r * gy;
    if (q >= 1) {
      p[0] = bx;
      p[1] = by;
      p[2] = r * lz;
      c[0] = cr * k;
      c[1] = cgr * k;
      c[2] = cb * k;
      return TB[i];
    }
    const arco = Math.sin(Math.PI * q);
    p[0] = ax + (bx - ax) * q;
    p[1] = ay + (by - ay) * q + arco * 0.08 * (col - 1) * (col - 1);
    p[2] = r * lz * q + arco * 0.2 * (S4[i] - 0.5);
    c[0] = CAr[i] * tw + (cr * k - CAr[i] * tw) * q;
    c[1] = CAg[i] * tw + (cgr * k - CAg[i] * tw) * q;
    c[2] = CAb[i] * tw + (cb * k - CAb[i] * tw) * q;
    return TA[i] + (TB[i] - TA[i]) * q;
  }

  if (tipo === L_TRAZO) {
    // Trazo de la D: se reúne de arriba abajo en cuanto la D llega; al girar se apaga
    // y reaparece en la luna de la derecha (que ahora tiene forma de D).
    const ax = AX0 + RA * PX[i];
    const ay = AY0 + RA * PY[i];
    const s = LY[i];
    const t0 = tDoc - 0.05 + 0.3 * s;
    const q = suave((ts - t0) / 0.32);
    const apaga = 1 - suave(qg / 0.4);
    const enciende = suave((qg - 0.62 - 0.3 * s) / 0.12);
    const lado = enciende > 0 ? 1 : -1;
    let gx;
    let gy;
    if (lado < 0) {
      gx = QX[i] * cg - QY[i] * sg;
      gy = QX[i] * sg + QY[i] * cg;
    } else {
      gx = QX[i];
      gy = QY[i];
    }
    const bx = lado * FX + R3 * gx;
    const by = FY + R3 * gy;
    const vis = lado < 0 ? apaga : enciende;
    const pp = lado < 0 ? 1 + 0.35 * pD + 0.45 * pCol[0] : 1 + 0.45 * pCol[2];
    const kb = vis * pp * (1 + 0.06 * Math.sin(t * 3 + s * 9));
    const punta = 1 + 0.5 * Math.exp(-Math.max(0, ts - t0 - 0.32) / 0.25);
    p[0] = ax + (bx - ax) * q;
    p[1] = ay + (by - ay) * q;
    p[2] = 0.04 * q;
    const k0 = (1 - q) * tw;
    c[0] = CAr[i] * k0 + CFr[i] * kb * punta * q;
    c[1] = CAg[i] * k0 + CFg[i] * kb * punta * q;
    c[2] = CAb[i] * k0 + CFb[i] * kb * punta * q;
    return TA[i] + (TB[i] - TA[i]) * q;
  }

  // --- flechas y etiqueta: primer tiempo → polvo tenue → su sitio ---
  let ax;
  let ay;
  if (tipo === L_FLECHA) {
    ax = AX0 + RA * PX[i];
    ay = AY0 + RA * PY[i];
  } else {
    const a = PX[i];
    const rr = PY[i];
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    ax = AX0 + rr * (ca * ce - sa * se);
    ay = AY0 + rr * (sa * ce + ca * se);
  }
  const qd = suave((ts - tSale - 0.4 * S1[i]) / 0.8);
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
  const brillo = (0.08 + 0.1 * S4[i]) * (0.75 + 0.25 * Math.sin(t * 2.3 + 2 * f));
  let x = ax + (dx - ax) * qd;
  let y = ay + (dy - ay) * qd;
  let z = Math.sin(Math.PI * qd) * 0.3 * (S2[i] - 0.5);
  let cr = CAr[i] * tw + (0.42 * brillo - CAr[i] * tw) * qd;
  let cgr = CAg[i] * tw + (0.6 * brillo - CAg[i] * tw) * qd;
  let cb = CAb[i] * tw + (1.0 * brillo - CAb[i] * tw) * qd;
  let tam = TA[i] + (0.02 - TA[i]) * qd;
  let t0;
  let dur;
  let kb;
  if (tipo === R_AR) {
    t0 = tAR + 0.3 * LY[i] + 0.05 * S3[i];
    dur = 0.4;
    kb = (1 + 0.05 * Math.sin(t * 2.1 + f)) * (1 + 0.45 * pAR);
  } else {
    t0 = (col === 0 ? tFlD : tFlC) + 0.4 * LY[i] + 0.06 * S3[i];
    dur = 0.5;
    const ola = 0.5 + 0.5 * Math.sin(TAU * (LY[i] * 1.3 - t * 0.8));
    kb = (0.8 + 0.45 * ola * ola) * (1 + 0.5 * pCol[col]);
  }
  const qa = suave((ts - t0) / dur);
  if (qa > 0) {
    const punta = 1 + 0.5 * Math.exp(-Math.max(0, ts - t0 - dur) / 0.25);
    x += (QX[i] - x) * qa;
    y += (QY[i] - y) * qa;
    z = z * (1 - qa) + Math.sin(Math.PI * qa) * 0.15 * Math.sin(f);
    cr += (CFr[i] * kb * punta - cr) * qa;
    cgr += (CFg[i] * kb * punta - cgr) * qa;
    cb += (CFb[i] * kb * punta - cb) * qa;
    tam += (TB[i] - tam) * qa;
  }
  p[0] = x;
  p[1] = y;
  p[2] = z;
  c[0] = cr;
  c[1] = cgr;
  c[2] = cb;
  return tam;
}
