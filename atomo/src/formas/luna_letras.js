// Escena 2: la misma Luna creciente vista desde España / Nueva York (D), desde el
// ecuador (sonrisa) y desde Argentina (C). Es un giro en el plano de la pantalla:
// la cara (los mares) gira con ella; no es un espejo.
// Toda la coreografía va anclada a las marcas de la voz (marca()):
//   letra → se dibuja el trazo que convierte la creciente en «D»; se mantiene hasta d_fin + 0,3 s.
//   d_fin → gira 90° en sentido horario: sonrisa completa ≈0,15 s antes de «sonrisa».
//   sonrisa_fin → gira otros 90°: C completa ≈0,15 s antes de «C»; se queda así hasta el final.
import { N, TAU, S1, S2, S3, S4, marca } from './base.js';

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
const I_TALLO = 520; // halo del limbo que se reúne en el trazo de la D
const I_BORDE = I_TALLO + 420; // limbo
const PX = new Float32Array(N);
const PY = new Float32Array(N);
const PZ = new Float32Array(N);
const HX = new Float32Array(N); // posición de halo (para las del trazo)
const HY = new Float32Array(N);
const BT = new Float32Array(N); // brillo propio dentro del trazo (núcleo / aura)
const CR = new Float32Array(N);
const CG = new Float32Array(N);
const CB = new Float32Array(N);
const TM = new Float32Array(N);
const FASE = new Float32Array(N);

for (let i = 0; i < N; i++) FASE[i] = TAU * S3[i];

// Trazo de la D (x = 0, de cuerno a cuerno). Fuera del trazo, cada partícula es
// halo junto al limbo iluminado, a la misma altura: así se reúne en horizontal.
for (let i = 0; i < I_TALLO; i++) {
  const s = (i + 0.5) / I_TALLO;
  const aura = S4[i] > 0.78;
  PX[i] = (S2[i] - 0.5) * (aura ? 0.08 : 0.022);
  PY[i] = 1 - 2 * s;
  PZ[i] = 0.3;
  BT[i] = aura ? 0.32 : 1;
  const r = 1.012 + 0.07 * S1[i] * S1[i];
  const a = Math.asin(Math.max(-0.995, Math.min(0.995, PY[i] / r)));
  HX[i] = r * Math.cos(a);
  HY[i] = r * Math.sin(a);
  const k = 0.22 + 0.4 * Math.cos(a) * (1 - (r - 1.012) / 0.07);
  CR[i] = 0.5 * k;
  CG[i] = 0.62 * k;
  CB[i] = 0.95 * k;
  TM[i] = 0.026;
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

// --- coreografía, anclada a las marcas de la voz (por defecto, las del español) ---
// Pulso breve y suave cuando se dice cada palabra clave.
const pulsoEn = (x) => (x < -0.1 ? 0 : x < 0.1 ? (x + 0.1) * 5 : Math.exp(-(x - 0.1) / 0.45));
let ultimo = NaN;
let cs = 1;
let sn = 0;
let t0 = 0; // empieza a dibujarse el trazo
let dur = 0.3; // lo que tarda en dibujarse, de cuerno a cuerno
let apagar = 1;
let vuelta = 0;
let pulso = 0;
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  const mLetra = marca('letra', 4.79);
  const mD = marca('d', 5.07);
  const mDfin = marca('d_fin', 5.21);
  const mSonrisa = marca('sonrisa', 6.53);
  const mSonrisaFin = marca('sonrisa_fin', 7.19);
  const mC = marca('c', 8.81);
  // Giro 1 (D → sonrisa): empieza al acabar «D»; completo 0,15 s antes de «sonrisa».
  const g1b = mSonrisa - 0.15;
  const g1a = Math.min(mDfin, g1b - 0.7);
  // Giro 2 (sonrisa → C): empieza al acabar «sonrisa»; completo 0,15 s antes de «C».
  const g2b = mC - 0.15;
  const g2a = Math.min(Math.max(mSonrisaFin + 0.05, g2b - 1.5, g1b + 0.3), g2b - 0.6);
  const th = -0.5 * Math.PI * (suave((ts - g1a) / (g1b - g1a)) + suave((ts - g2a) / (g2b - g2a)));
  cs = Math.cos(th);
  sn = Math.sin(th);
  // Trazo: se dibuja durante «letra / like» y está entero al decir «D».
  t0 = mLetra;
  dur = Math.max(0.24, Math.min(0.45, mD - mLetra));
  // Se mantiene mientras se dice «D» (hasta d_fin + 0,3 s); luego se apaga y vuelve a ser halo.
  const fin = mDfin + 0.3;
  apagar = 1 - suave((ts - fin) / 0.4);
  vuelta = suave((ts - fin - 0.05) / 0.55);
  pulso = 0.6 * pulsoEn(ts - mD) + pulsoEn(ts - mSonrisa) + pulsoEn(ts - mC);
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  if (i < I_TALLO) {
    // Halo que se reúne en el trazo de la D (de arriba abajo), brilla y vuelve a ser halo.
    const s = (1 - PY[i]) * 0.5;
    const llega = t0 + dur * (0.2 + 0.8 * s); // instante en que esta partícula alcanza el trazo
    const ir = suave((ts - llega + 0.2 * dur) / (0.2 * dur));
    const f = ir * (1 - vuelta);
    const x = HX[i] + (PX[i] - HX[i]) * f;
    const y = HY[i] + (PY[i] - HY[i]) * f;
    const punta = Math.exp(-Math.max(0, ts - llega) / 0.22); // la punta del trazo, más brillante
    const vis = ir * apagar * BT[i] * (1.1 + 0.08 * Math.sin(t * 3 + s * 9) + 0.35 * punta * ir);
    const h = (1 - ir * apagar) * (0.85 + 0.15 * Math.sin(t * 0.9 + FASE[i]));
    c[0] = 0.72 * vis + CR[i] * h;
    c[1] = 0.86 * vis + CG[i] * h;
    c[2] = 1.05 * vis + CB[i] * h;
    p[0] = CX + R * (x * cs - y * sn);
    p[1] = CY + R * (x * sn + y * cs);
    p[2] = PZ[i] * f;
    return TM[i] + 0.01 * ir * apagar;
  }
  const x = PX[i];
  const y = PY[i];
  const k = (1 + 0.08 * Math.sin(t * 1.7 + FASE[i])) * (1 + 0.1 * pulso);
  p[0] = CX + R * (x * cs - y * sn);
  p[1] = CY + R * (x * sn + y * cs);
  p[2] = R * PZ[i];
  c[0] = CR[i] * k;
  c[1] = CG[i] * k;
  c[2] = CB[i] * k;
  return TM[i];
}
