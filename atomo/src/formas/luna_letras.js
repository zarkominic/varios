// Escena 2: la misma Luna creciente vista desde España (D), desde el ecuador
// (sonrisa) y desde Argentina (C). Es un giro en el plano de la pantalla:
// la cara (los mares) gira con ella; no es un espejo.
import { N, TAU, S1, S2, S3, S4 } from './base.js';

export const camara = { pos: [0, 0.45, 7], mira: [0, 0.45, 0], balanceo: 0 };

const CX = 0;
const CY = 0.88;
const R = 1.14;
const K = 0.48; // el terminador corta el disco en x = K·√(1−y²)
const SF = Math.sqrt(1 - K * K);
const PROF = 0.22; // relieve en Z (aplanado para que la silueta no se deforme)

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

// --- la cara de la Luna (disco unidad, norte arriba, como se ve desde España) ---
const MARES = [
  // x, y, rx, ry, peso
  [0.68, 0.3, 0.12, 0.1, 1], // Crisium
  [0.6, -0.14, 0.11, 0.19, 0.9], // Fecunditatis
  [0.4, -0.33, 0.09, 0.09, 0.85], // Nectaris
  [0.36, 0.12, 0.17, 0.14, 0.95], // Tranquillitatis
  [0.23, 0.43, 0.13, 0.12, 0.95], // Serenitatis
  [0.04, 0.3, 0.07, 0.06, 0.7], // Vaporum
  [-0.22, 0.56, 0.22, 0.17, 1], // Imbrium
  [-0.05, 0.8, 0.36, 0.05, 0.7], // Frigoris
  [-0.56, 0.12, 0.22, 0.38, 0.9], // Procellarum
  [-0.25, 0.06, 0.1, 0.08, 0.75], // Insularum
  [-0.18, -0.37, 0.16, 0.13, 0.85], // Nubium
  [-0.58, -0.41, 0.08, 0.08, 0.85], // Humorum
  [0.08, -0.04, 0.08, 0.07, 0.6], // Sinus Medii
];
const CRATERES = [
  // x, y, radio, realce
  [-0.68, 0.4, 0.035, 1.6], // Aristarchus
  [-0.12, -0.73, 0.04, 1.1], // Tycho
  [-0.3, 0.18, 0.035, 0.9], // Copernicus
  [-0.52, 0.13, 0.025, 0.7], // Kepler
  [0.6, 0.27, 0.025, 0.8], // Proclus
  [0.86, -0.16, 0.03, 0.5], // Langrenus
  [0.75, -0.43, 0.035, 0.45], // Petavius
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

// Color de la Luna en (x, y) del disco unidad. Devuelve 1 si está iluminado.
const TMP = [0, 0, 0];
function sombrear(x, y) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const L = x * SF - z * K;
  const m = mares(x, y);
  const v = textura(x, y);
  const cr = crater(x, y);
  if (L > 0) {
    const b = (0.3 + 0.92 * Math.pow(Math.min(1, L / 0.55), 0.6)) * v * (1 - 0.55 * m) * (1 + 0.35 * cr) * 1.38;
    TMP[0] = (1.0 - 0.36 * m) * b;
    TMP[1] = (0.94 - 0.24 * m) * b;
    TMP[2] = (0.84 - 0.02 * m) * b;
    return 1;
  }
  // Luz cenicienta: apenas visible, azulada; se adivinan los mares.
  const e = 0.3 * v * (1 - 0.5 * m) * (1 + 0.7 * cr);
  TMP[0] = 0.42 * e;
  TMP[1] = 0.55 * e;
  TMP[2] = 0.9 * e;
  return 0;
}

// --- tablas por partícula (en el sistema de la Luna, antes de girar) ---
const I_TALLO = 490; // trazo que completa la D; luego, halo del limbo
const I_BORDE = I_TALLO + 420; // limbo
const PX = new Float32Array(N);
const PY = new Float32Array(N);
const PZ = new Float32Array(N);
const HX = new Float32Array(N); // destino de halo para las del tallo
const HY = new Float32Array(N);
const CR = new Float32Array(N);
const CG = new Float32Array(N);
const CB = new Float32Array(N);
const TM = new Float32Array(N);
const FASE = new Float32Array(N);

for (let i = 0; i < N; i++) FASE[i] = TAU * S3[i];

// Tallo de la D (x = 0, de cuerno a cuerno) y su destino como halo.
for (let i = 0; i < I_TALLO; i++) {
  const s = (i + 0.5) / I_TALLO;
  PX[i] = (S2[i] - 0.5) * 0.014;
  PY[i] = 1 - 2 * s;
  PZ[i] = 0.05;
  const a = (S1[i] - 0.5) * Math.PI * 0.95;
  const r = 1.012 + 0.07 * S4[i] * S4[i];
  HX[i] = r * Math.cos(a);
  HY[i] = r * Math.sin(a);
  const k = 0.55 * Math.cos(a) * (1 - (r - 1.012) / 0.07);
  CR[i] = 0.5 * k;
  CG[i] = 0.62 * k;
  CB[i] = 0.95 * k;
  TM[i] = 0.05;
}
// Limbo: arco iluminado nítido y arco en sombra muy tenue.
for (let i = I_TALLO; i < I_BORDE; i++) {
  const iluminado = S2[i] < 0.72;
  const a = iluminado ? (S1[i] - 0.5) * Math.PI : Math.PI / 2 + Math.PI * S1[i];
  const r = 1 - 0.014 * S3[i];
  const x = r * Math.cos(a);
  const y = r * Math.sin(a);
  PX[i] = x;
  PY[i] = y;
  PZ[i] = 0;
  sombrear(x, y);
  const k = iluminado ? 1.05 : 0.8;
  CR[i] = TMP[0] * k;
  CG[i] = TMP[1] * k;
  CB[i] = TMP[2] * k;
  TM[i] = iluminado ? 0.03 : 0.026;
}
// Disco: muestreo uniforme (generador fijo); la zona en sombra, aclarada.
{
  let a = 20240611;
  const rnd = () => {
    a = (a + 0x6d2b79f5) | 0;
    let q = Math.imul(a ^ (a >>> 15), 1 | a);
    q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
    return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
  };
  let i = I_BORDE;
  while (i < N) {
    const x = 2 * rnd() - 1;
    const y = 2 * rnd() - 1;
    const u = rnd();
    if (x * x + y * y > 0.997) continue;
    const ilu = sombrear(x, y);
    if (!ilu && u > 0.13) continue;
    PX[i] = x;
    PY[i] = y;
    PZ[i] = PROF * Math.sqrt(Math.max(0, 1 - x * x - y * y));
    CR[i] = TMP[0];
    CG[i] = TMP[1];
    CB[i] = TMP[2];
    TM[i] = ilu ? 0.034 : 0.03;
    i++;
  }
}

// --- coreografía ---
// D hasta 3,2 s; gira 90° (sonrisa) de 3,2 a 4,8; espera; gira hasta 180° (C) de 5,8 a 7,3.
const angulo = (ts) => -0.5 * Math.PI * (suave((ts - 3.2) / 1.6) + suave((ts - 5.8) / 1.5));
let ultimo = NaN;
let cs = 1;
let sn = 0;
let dibujo = 0;
let apagar = 1;
let viaje = 0;
let halo = 0;
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  const th = angulo(ts);
  cs = Math.cos(th);
  sn = Math.sin(th);
  dibujo = suave((ts - 1.2) / 0.7);
  apagar = 1 - suave((ts - 2.6) / 0.55);
  viaje = suave((ts - 3.0) / 0.45);
  halo = suave((ts - 3.3) / 1.4);
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  let x = PX[i];
  let y = PY[i];
  let k = 1 + 0.08 * Math.sin(t * 1.7 + FASE[i]);
  let tam = TM[i];
  if (i < I_TALLO) {
    // Trazo de la D: se dibuja de cuerno a cuerno, se apaga y se convierte en halo.
    const s = (1 - y) * 0.5;
    const vis = lim((dibujo * 1.2 - s) / 0.2) * apagar;
    const brillo = vis * (0.85 + 0.3 * Math.sin(t * 3 + s * 9));
    x += (HX[i] - x) * viaje;
    y += (HY[i] - y) * viaje;
    const h = halo * (0.85 + 0.15 * Math.sin(t * 0.9 + FASE[i]));
    c[0] = 0.62 * brillo + CR[i] * h;
    c[1] = 0.72 * brillo + CG[i] * h;
    c[2] = 0.95 * brillo + CB[i] * h;
    const X = x * cs - y * sn;
    const Y = x * sn + y * cs;
    p[0] = CX + R * X;
    p[1] = CY + R * Y;
    p[2] = PZ[i];
    return 0.026 + 0.008 * viaje;
  }
  const X = x * cs - y * sn;
  const Y = x * sn + y * cs;
  p[0] = CX + R * X;
  p[1] = CY + R * Y;
  p[2] = R * PZ[i];
  c[0] = CR[i] * k;
  c[1] = CG[i] * k;
  c[2] = CB[i] * k;
  return tam;
}
