// Escena 10 (remate): «Veredicto: la Luna, verdad. El inodoro, mentira. Sígueme: en clase no te
// contaron ni la mitad.» / «Verdict: the Moon, true. The toilet, a lie. Follow me: …»
// Vuelve el átomo narrador (núcleo de protones y neutrones y tres órbitas, como la forma «atomo»).
// En dos de sus órbitas, en lugar de electrones, van una Luna creciente (arriba a la izquierda) y
// un remolino de agua (abajo a la izquierda); en la tercera, dos electrones. Núcleo al 40 % de la
// altura. Toda la coreografía va anclada a las marcas de la voz (por defecto, las del español):
//   luna      la Luna se enciende y parte de su luz sale volando a dibujar, de izquierda a
//             derecha, un ✓ verde grande a su lado; está completo al decir «verdad», que lo hace latir.
//   inodoro   el remolino se enciende y lanza su agua (tangente al giro) a dibujar un ✗ rojo
//             grande a su derecha (trazo «\» y luego «/»); completo con «mentira», que lo sacude.
//   sigueme   la Luna y el remolino salen disparados por sus órbitas y se tragan los símbolos como
//             colas de cometa; el núcleo da un fogonazo, una onda de luz recorre las órbitas y los
//             electrones aceleran. Después el átomo se queda vivo, girando, hasta el final.
// Las partículas que más pronto se necesitan (Luna y ✓) tienen los índices más bajos: en la
// transición desde la escena anterior llegan antes, y la Luna y el ✓ ya se leen aunque el resto
// siga llegando.
import { N, TAU, S1, S2, S3, S4, C, marca, glifo } from './base.js';

export const camara = { pos: [0, -0.5, 7], mira: [0, -0.5, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
// Pulso: sube en `sube` segundos y cae exponencialmente con constante `cae`.
const golpe = (x, sube, cae) => (x <= -sube ? 0 : x < 0 ? (x + sube) / sube : Math.exp(-x / cae));
// Integral de una rampa de velocidad 0 → 1 en `w` segundos (avance sin saltos de velocidad).
const rampa = (x, w) => (x <= 0 ? 0 : x < w ? (x * x) / (2 * w) : x - w / 2);

// --- reparto de partículas ---------------------------------------------------------------
const NL = 560; // Luna
const NV = 1000; // ✓ (antes de «luna», escondidas en la Luna)
const NNUC = 900; // núcleo
const NW = 640; // remolino
const NX = 850; // ✗ (antes de «inodoro», agua del remolino)
const NE = 750; // dos electrones con cola
const NCO = 700; // corona del núcleo (la onda de luz de «sígueme»)
const I_V = NL;
const I_NUC = I_V + NV;
const I_REM = I_NUC + NNUC;
const I_X = I_REM + NW;
const I_ELEC = I_X + NX;
const I_COR = I_ELEC + NE;
const I_ANILLO = I_COR + NCO;
const NA = N - I_ANILLO; // anillos de las tres órbitas
if (NA < 900) throw new Error('veredicto: reparto de partículas incorrecto');

// --- geometría ---------------------------------------------------------------------------
const R_ORB = 1.05; // semieje mayor de las órbitas
const BE = 0.33; // semieje menor / mayor (órbitas inclinadas, como el logo del átomo)
const PZ = Math.sqrt(1 - BE * BE);
const GIRO = [0, Math.PI / 3, (2 * Math.PI) / 3]; // electrones, remolino, Luna
const O_E = 0;
const O_REM = 1;
const O_LUNA = 2;
// Estación de la Luna: θ = 0 en la órbita de 120° (arriba a la izquierda).
// Estación del remolino: θ = π en la órbita de 60° (abajo a la izquierda).
const RL0 = 0.19; // radio de la Luna (crece al encenderse)
const RW0 = 0.2; // radio del remolino
const VX = 0.52; // centro del ✓
const VY = 0.86;
const VZ = 0.2;
const GHV = 0.58; // altura del ✓ (el glifo ✔ es 1,32 veces más ancho que alto)
const XX = 0.52; // centro del ✗
const XY = -0.8;
const XZ = 0.2;
const GHX = 0.58; // altura del ✗ (✘: 1,13 veces más ancho que alto)
const DV = 0.24; // vuelo de cada partícula de la Luna al ✓
const DX = 0.26; // vuelo de cada gota al ✗

const VERDE = [0.3, 1.0, 0.45];
const ROJO = [1.0, 0.22, 0.17];

// Punto de la órbita k en el ángulo th (radio r): escribe en P.
const P = new Float32Array(3);
const OC = new Float32Array(3);
const OS = new Float32Array(3);
function orb(k, th, r) {
  const s = Math.sin(th);
  const lx = r * Math.cos(th);
  const ly = r * BE * s;
  P[0] = lx * OC[k] - ly * OS[k];
  P[1] = lx * OS[k] + ly * OC[k];
  P[2] = r * PZ * s;
}

// Generador determinista para muestrear tablas.
let semilla = 731;
const azar = () => {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
};

// --- Luna creciente (disco unidad, iluminada por la derecha) -----------------------------
const K_L = 0.55;
const SF_L = Math.sqrt(1 - K_L * K_L);
const MARES = [
  // x, y, rx, ry, peso
  [0.62, 0.28, 0.2, 0.17, 0.9],
  [0.55, -0.22, 0.17, 0.24, 0.8],
  [0.3, 0.1, 0.2, 0.16, 0.85],
  [-0.25, 0.5, 0.3, 0.22, 0.9],
  [-0.5, 0.0, 0.25, 0.4, 0.85],
  [-0.15, -0.42, 0.2, 0.16, 0.75],
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
  return m;
}
const TMP = [0, 0, 0];
function sombrearLuna(x, y) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const L = x * SF_L - z * K_L;
  const m = mares(x, y);
  const v = 1 + 0.07 * Math.sin(11 * x - 5 * y + 0.4) * Math.sin(8 * y + 3 * x);
  if (L > 0) {
    const b = (0.45 + 0.85 * Math.pow(Math.min(1, L / 0.5), 0.6)) * v * (1 - 0.4 * m) * 1.35;
    TMP[0] = (1.0 - 0.3 * m) * b;
    TMP[1] = (0.95 - 0.2 * m) * b;
    TMP[2] = (0.86 - 0.02 * m) * b;
    return 1;
  }
  const e = 0.32 * v * (1 - 0.45 * m);
  TMP[0] = 0.42 * e;
  TMP[1] = 0.55 * e;
  TMP[2] = 0.9 * e;
  return 0;
}
const MX = new Float32Array(NL);
const MY = new Float32Array(NL);
const MZ = new Float32Array(NL);
const MR = new Float32Array(NL);
const MG = new Float32Array(NL);
const MB = new Float32Array(NL);
const MT = new Float32Array(NL);
{
  const N_LIMBO = 130;
  for (let j = 0; j < N_LIMBO; j++) {
    const iluminado = j % 5 !== 0;
    const a = iluminado ? (((j + 0.5) / N_LIMBO) - 0.5) * Math.PI : Math.PI / 2 + Math.PI * azar();
    const r = 1 - 0.02 * azar();
    MX[j] = r * Math.cos(a);
    MY[j] = r * Math.sin(a);
    MZ[j] = 0;
    sombrearLuna(MX[j] * 0.97, MY[j] * 0.97);
    const k = iluminado ? 1.15 : 0.75;
    MR[j] = TMP[0] * k;
    MG[j] = TMP[1] * k;
    MB[j] = TMP[2] * k;
    MT[j] = iluminado ? 0.03 : 0.024;
  }
  let j = N_LIMBO;
  while (j < NL) {
    const x = 2 * azar() - 1;
    const y = 2 * azar() - 1;
    const u = azar();
    if (x * x + y * y > 0.995) continue;
    const ilu = sombrearLuna(x, y);
    if (!ilu && u > 0.16) continue;
    MX[j] = x;
    MY[j] = y;
    MZ[j] = Math.sqrt(Math.max(0, 1 - x * x - y * y));
    MR[j] = TMP[0];
    MG[j] = TMP[1];
    MB[j] = TMP[2];
    MT[j] = ilu ? 0.032 : 0.028;
    j++;
  }
}
// Partículas del ✓ antes de «luna»: escondidas en la parte iluminada de la Luna (la refuerzan).
const HX = new Float32Array(NV);
const HY = new Float32Array(NV);
const HB = new Float32Array(NV);
{
  let j = 0;
  while (j < NV) {
    const x = 2 * azar() - 1;
    const y = 2 * azar() - 1;
    if (x * x + y * y > 0.97 || !sombrearLuna(x, y)) continue;
    HX[j] = x;
    HY[j] = y;
    HB[j] = TMP[1];
    j++;
  }
}

// --- remolino: flujo de sumidero + vórtice (espiral que gira en sentido horario) ---------
const Q0 = 0.018;
const C_ESP = 0.95;
const NB = 3;
const N_OJO = 70;
const N_ORILLA = 110;
const WT = new Float32Array(NW + NX); // ángulo base del brazo
const WF = new Float32Array(NW + NX); // fase del ciclo de caída
const WG = new Float32Array(NW + NX); // desvío respecto al centro del brazo
for (let j = 0; j < NW + NX; j++) {
  WT[j] = (TAU * Math.floor(azar() * NB)) / NB + 0.4;
  WF[j] = azar();
  WG[j] = (azar() + azar() + azar() + azar() - 2) / 2;
}

// --- núcleo (como en «atomo»: 14 nucleones) ---------------------------------------------
const NUCLEONES = (() => {
  const lista = [[0, 0, 0]];
  const n = 13;
  for (let k = 0; k < n; k++) {
    const y = 1 - (2 * (k + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = k * 2.39996;
    lista.push([0.2 * r * Math.cos(th), 0.2 * y, 0.2 * r * Math.sin(th)]);
  }
  return lista;
})();
const ESC_NUC = 0.92;
const NUX = new Float32Array(NNUC);
const NUY = new Float32Array(NNUC);
const NUZ = new Float32Array(NNUC);
const NUK = new Uint8Array(NNUC);
for (let j = 0; j < NNUC; j++) {
  const i = I_NUC + j;
  const k = j % NUCLEONES.length;
  NUK[j] = k;
  const th = TAU * S1[i];
  const ph = Math.acos(2 * S2[i] - 1);
  const r = 0.1 * Math.cbrt(S3[i]);
  const n = NUCLEONES[k];
  NUX[j] = (n[0] * 1.15 + r * Math.sin(ph) * Math.cos(th)) * ESC_NUC;
  NUY[j] = (n[1] * 1.15 + r * Math.cos(ph)) * ESC_NUC;
  NUZ[j] = (n[2] * 1.15 + r * Math.sin(ph) * Math.sin(th)) * ESC_NUC;
}

// --- anillos de las órbitas (posición local; se giran cada fotograma) --------------------
const AX = new Float32Array(NA);
const AY = new Float32Array(NA);
const AZ = new Float32Array(NA);
for (let j = 0; j < NA; j++) {
  const i = I_ANILLO + j;
  const th = (TAU * (Math.floor(j / 3) + 0.8 * S1[i])) / Math.ceil(NA / 3);
  const r = R_ORB + (S2[i] - 0.5) * 0.018;
  AX[j] = r * Math.cos(th);
  AY[j] = r * BE * Math.sin(th);
  AZ[j] = r * PZ * Math.sin(th);
}

// --- corona del núcleo ------------------------------------------------------------------
const CA = new Float32Array(NCO);
const CRr = new Float32Array(NCO);
for (let j = 0; j < NCO; j++) {
  CA[j] = (TAU * (j + 0.7 * S1[I_COR + j])) / NCO;
  CRr[j] = 0.3 + 0.28 * Math.pow(S2[I_COR + j], 1.4);
}

// --- glifos (necesitan el navegador: se calculan la primera vez que se usan) ------------
let GV = null; // ✓
let GX = null; // ✗
const VU = new Float32Array(NV); // orden de dibujo del ✓ (de izquierda a derecha)
const XS = new Uint8Array(NX); // trazo del ✗: 0 «\», 1 «/»
const XU = new Float32Array(NX); // avance a lo largo de su trazo
const XD = new Float32Array(NX); // orden en que lo engulle el remolino
function prepararGlifos() {
  GV = glifo('✔', NV, { semilla: 4 });
  GX = glifo('✘', NX, { semilla: 6 });
  let x0 = Infinity;
  let x1 = -Infinity;
  for (let j = 0; j < NV; j++) {
    const x = GV[2 * j];
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
  }
  const ancho = Math.max(1e-3, x1 - x0);
  for (let j = 0; j < NV; j++) VU[j] = lim((GV[2 * j] - x0) / ancho);
  let a = 1e-3;
  for (let j = 0; j < NX; j++) a = Math.max(a, Math.abs(GX[2 * j]), Math.abs(GX[2 * j + 1]));
  for (let j = 0; j < NX; j++) {
    const x = GX[2 * j];
    const y = GX[2 * j + 1];
    const t = Math.abs(x + y) < Math.abs(x - y) ? 0 : 1;
    XS[j] = t;
    XU[j] = t === 0 ? lim((x - y + 2 * a) / (4 * a)) : lim((2 * a - (x + y)) / (4 * a));
    XD[j] = lim((x + a) / (2 * a));
  }
}

// --- velocidad tras «sígueme»: arranca suave, acelera fuerte y se queda en un giro vivo ---
const VB = 1.3; // rad/s que quedan al final
const VK = 7.0; // impulso
const TK = 0.85;
const TA = 0.12;
const TC = 1 / (1 / TK + 1 / TA);
function giroExtra(x) {
  if (x <= 0) return 0;
  return VB * (x - TA * (1 - Math.exp(-x / TA))) + VK * (TK * (1 - Math.exp(-x / TK)) - TC * (1 - Math.exp(-x / TC)));
}
// Para la longitud de las colas, una velocidad que sube algo más despacio (se estiran sin saltos).
const velCola = (x) => (x <= 0 ? 0 : (VB + VK * Math.exp(-x / TK)) * (1 - Math.exp(-x / 0.35)));

// --- valores por fotograma -------------------------------------------------------------
let ultimo = NaN;
// Las órbitas no se mueven: sus giros se calculan una vez.
for (let k = 0; k < 3; k++) {
  OC[k] = Math.cos(GIRO[k]);
  OS[k] = Math.sin(GIRO[k]);
}
let thL = 0; // ángulo de la Luna en su órbita
let thW = Math.PI; // del remolino
let thE = 0; // del primer electrón
let lunaX = 0;
let lunaY = 0;
let lunaZ = 0;
let remX = 0;
let remY = 0;
let remZ = 0;
let rl = RL0;
let rw = RW0;
let luzL = 1;
let luzW = 1;
let giroW = 0; // fase de giro del remolino
let caidaW = 0; // fase de caída del agua hacia el centro
let mIno = 2.07;
// (antes de «sígueme»; al encenderse con «inodoro» gira y traga más deprisa)
const giroRemolino = (x) => 0.6 * x + 1.1 * rampa(x - mIno, 0.3);
const caidaRemolino = (x) => 0.34 * x + 0.25 * rampa(x - mIno, 0.3);
let colaL = 0.5; // longitud (rad) de las colas
let colaW = 0.5;
let colaE = 1;
let offL = 0.3;
let offW = 0.3;
let vA0 = 0; // llegada de las primeras partículas al ✓
let vA1 = 0;
let escV = 1;
let luzV = 1;
let xA0 = 0;
let xMid = 0;
let xA1 = 0;
let escX = 1;
let luzX = 1;
let sacudida = 0;
let visV = 0;
let visX = 0;
let engulle = 0; // inicio de la absorción de los símbolos
let fogonazo = 0;
let ondaR = 0;
let ondaK = 0;
let coronaFuera = 0;
let coronaBase = 1;
let ondaLuz = 0;
let luzE = 1;
let resaltaL = 0;
let resaltaW = 0;
let cNy = 1; // giro lento del núcleo
let sNy = 0;
let latido = 1; // escala del núcleo (late con cada palabra clave y con el fogonazo)

function preparar(ts, t) {
  if (ts === ultimo) return;
  ultimo = ts;
  if (GV === null) prepararGlifos();
  const mLuna = marca('luna', 1.07);
  const mVerdad = marca('verdad', 1.35);
  const mInodoro = marca('inodoro', 2.07);
  const mMentira = marca('mentira', 2.49);
  const mSig = marca('sigueme', 3.37);

  // Lanzamiento («sígueme»): justo después del fogonazo todo acelera; el remolino sale un poco
  // después que la Luna (que no pasen a la vez junto al núcleo).
  const L0 = mSig + 0.1;
  const tau = ts - L0;
  const X = giroExtra(tau);
  const v = velCola(tau);
  const XW = giroExtra(tau - 0.15);
  const vW = velCola(tau - 0.15);

  // Luna: llega a su estación antes de «luna» (frenando) y allí espera.
  const aL = lim(ts / Math.max(0.3, mLuna - 0.1));
  thL = -0.45 * (1 - aL) * (1 - aL) - X;
  orb(O_LUNA, thL, R_ORB);
  lunaX = P[0];
  lunaY = P[1];
  lunaZ = P[2];
  // Remolino: baja deslizándose por su órbita y llega a su estación justo antes de «inodoro».
  const aW = lim(ts / Math.max(0.3, mInodoro - 0.08));
  thW = Math.PI + 1.3 * (1 - aW) * (1 - aW) - 0.92 * XW;
  orb(O_REM, thW, R_ORB);
  remX = P[0];
  remY = P[1];
  remZ = P[2];
  thE = 0.6 - 1.5 * ts - 1.15 * X; // todo gira en sentido horario, como en «atomo»

  // Encendidos.
  const encL = suave((ts - mLuna + 0.06) / 0.3);
  const encW = suave((ts - mInodoro + 0.06) / 0.3);
  const relaja = 1 - 0.6 * suave((ts - mSig) / 0.8); // al salir disparados vuelven a su tamaño
  rl = RL0 + 0.05 * encL * relaja;
  rw = RW0 + 0.045 * encW * relaja;
  // El destello de la Luna llega con la palabra, pero no antes de que la Luna esté ya nítida
  // (si la marca cae muy pronto, en plena transición, sería solo una mancha blanca).
  const tDestello = Math.max(mLuna + 0.05, 1.1);
  luzL = 0.85 + 0.35 * encL * relaja + 0.9 * golpe(ts - tDestello, 0.1, 0.3) + 0.35 * golpe(ts - mVerdad, 0.05, 0.25);
  luzW = 0.85 + 0.3 * encW * relaja + 0.9 * golpe(ts - mInodoro, 0.08, 0.3) + 0.35 * golpe(ts - mMentira, 0.05, 0.25);
  resaltaL = 0.25 * encL + 0.9 * golpe(ts - tDestello, 0.1, 0.35);
  resaltaW = 0.25 * encW + 0.9 * golpe(ts - mInodoro, 0.08, 0.35);
  mIno = mInodoro;
  giroW = giroRemolino(ts) + 1.6 * XW;
  caidaW = caidaRemolino(ts);
  colaL = 0.6 + 0.42 * v;
  colaW = 0.6 + 0.42 * 0.92 * vW;
  // las estelas arrancan justo detrás del cuerpo, medido en pantalla
  offL = separacion(thL, rl);
  offW = separacion(thW, rw);
  const vE = 1.5 + 1.15 * v;
  colaE = 0.55 + 0.32 * vE;

  // ✓: se dibuja de izquierda a derecha entre «luna» y «verdad».
  vA0 = mLuna + 0.12;
  vA1 = Math.max(vA0 + 0.15, mVerdad + 0.02);
  const tv = ts - mVerdad;
  escV = 1 + 0.1 * golpe(tv, 0.07, 0.16);
  luzV = (1 + 0.75 * golpe(tv, 0.05, 0.28)) * (1 + 0.05 * Math.sin(t * 2.3));
  // ✗: «\» y luego «/», entre «inodoro» y «mentira»; con «mentira», se sacude.
  xA0 = mInodoro + 0.12;
  xA1 = Math.max(xA0 + 0.24, mMentira - 0.02);
  xMid = xA0 + (xA1 - xA0) * 0.48;
  const tm = ts - mMentira;
  escX = 1 + 0.08 * golpe(tm, 0.05, 0.14);
  luzX = (1 + 0.6 * golpe(tm, 0.05, 0.25)) * (1 + 0.05 * Math.sin(t * 2.1 + 1));
  sacudida = tm > 0 ? 0.05 * Math.sin(tm * TAU * 7) * Math.exp(-tm / 0.17) : 0;
  engulle = L0 - 0.08;
  visV = lim((ts - vA0) / 0.3) * (1 - lim((ts - engulle) / 0.6));
  visX = lim((ts - xA0) / 0.35) * (1 - lim((ts - engulle) / 0.6));

  // Fogonazo del núcleo y onda de luz.
  const tf = ts - (mSig + 0.02);
  fogonazo = tf > 0 ? (1 - Math.exp(-tf / 0.05)) * Math.exp(-tf / 0.42) : 0;
  ondaR = 0.32 + 0.98 * (1 - Math.exp(-Math.max(0, tf) / 0.28));
  ondaK = tf > 0 ? Math.exp(-tf / 0.6) : 0;
  // corona: se sube a la onda, viaja con ella y vuelve (ya apagada) a su sitio
  coronaFuera = tf > 0 ? suave(tf / 0.12) * (1 - suave((tf - 0.8) / 1.4)) : 0;
  coronaBase = tf > 0 ? 1 - suave(tf / 0.12) * (1 - suave((tf - 1.7) / 0.8)) : 1;
  ondaLuz = tf > 0 ? 1.7 * Math.exp(-tf / 0.3) * (1 - suave((tf - 0.25) / 0.35)) : 0;
  // los electrones se apagan un poco mientras se dicta el veredicto (que manden la Luna y el remolino)
  luzE = (1 - 0.45 * suave((ts - 0.5) / 0.5) * (1 - suave((ts - mSig + 0.1) / 0.3))) * (1 + 0.6 * fogonazo);

  const gn = t * 0.3;
  cNy = Math.cos(gn);
  sNy = Math.sin(gn);
  latido = 1 + 0.22 * fogonazo + 0.05 * golpe(ts - tDestello, 0.06, 0.2) + 0.05 * golpe(ts - mInodoro, 0.06, 0.2);
}

// Atenuación de los anillos bajo los símbolos (para que se lean limpios).
function bajoSimbolos(x, y) {
  let m = 1;
  if (visV > 0) {
    const dx = (x - VX) / 0.5;
    const dy = (y - VY) / 0.42;
    m -= 0.8 * visV * lim(1.4 - 1.4 * (dx * dx + dy * dy));
  }
  if (visX > 0) {
    const dx = (x - XX) / 0.46;
    const dy = (y - XY) / 0.4;
    m -= 0.8 * visX * lim(1.4 - 1.4 * (dx * dx + dy * dy));
  }
  return m < 0.15 ? 0.15 : m;
}

// Avance en pantalla (por radián y por unidad de radio) de una órbita en el ángulo th: cerca de
// las puntas de la elipse es pequeño (allí la órbita viene hacia la cámara).
const avance = (s, c) => Math.sqrt(s * s + BE * BE * c * c);
// Ángulo que hay que retroceder desde un cuerpo de radio r para salir de él (medido en pantalla).
const separacion = (th, r) => Math.min(1.1, (1.15 * r) / (R_ORB * Math.max(0.2, avance(Math.sin(th), Math.cos(th)))));
// Estela de luz: punto d (0 cabeza, 1 final) detrás de la Luna (o del remolino), fina y larga.
// Escribe en P y devuelve el brillo, repartido según lo que avanza en pantalla (para que no se
// amontone en las puntas de la elipse).
function enCola(esLuna, d, i) {
  const ancho = 0.025 + 0.1 * (1 - d) * (1 - d);
  const th = esLuna ? thL + offL + d * colaL : thW + offW + d * colaW;
  const s = Math.sin(th);
  const cs = Math.cos(th);
  const k = esLuna ? O_LUNA : O_REM;
  const r = R_ORB + (S2[i] - 0.5) * ancho;
  const lx = r * cs;
  const ly = r * BE * s;
  P[0] = lx * OC[k] - ly * OS[k];
  P[1] = lx * OS[k] + ly * OC[k];
  P[2] = r * PZ * s + (S4[i] - 0.5) * ancho;
  return (0.85 * Math.pow(1 - d, 1.8) * (0.3 + 0.7 * lim(d / 0.1)) + 0.03) * (0.25 + 0.75 * avance(s, cs));
}

// Posición del agua del remolino (j: 0…NW+NX-1) con las fases de caída y giro dadas. Escribe en
// P, deja en fundido cuánto se ve (el agua aparece en el borde y se apaga al llegar al ojo, sin
// saltos al reciclarse) y devuelve el radio relativo (0 centro, 1 borde).
let fundido = 1;
function enRemolino(j, rmin, rmax, caida, giro) {
  let f = (WF[j] - caida) % 1;
  if (f < 0) f += 1;
  fundido = lim(f / 0.07) * lim((1 - f) / 0.12);
  const q = Q0 + (1 - Q0) * f;
  const rho = rmin + (rmax - rmin) * Math.sqrt(q);
  const anchoMundo = 0.08 + 0.3 * rho * rho;
  const th = WT[j] + C_ESP * Math.log(q) - giro + (WG[j] * anchoMundo) / Math.max(0.15, rho);
  P[0] = remX + rw * rho * Math.cos(th);
  P[1] = remY + rw * rho * Math.sin(th);
  P[2] = remZ + 0.02;
  return rho;
}

// ---- ✓ (antes: luz de la Luna) ----
function paloma(j, i, t, ts, p, c) {
  const llega = vA0 + (vA1 - vA0) * VU[j] + 0.025 * S4[i];
  const sale = llega - DV;
  // su sitio en la Luna
  const hx = lunaX + rl * HX[j];
  const hy = lunaY + rl * HY[j];
  const hz = lunaZ + 0.05;
  if (ts < sale) {
    p[0] = hx;
    p[1] = hy;
    p[2] = hz;
    const b = 0.3 * HB[j] * luzL;
    c[0] = 1.0 * b;
    c[1] = 0.95 * b;
    c[2] = 0.88 * b;
    return 0.03;
  }
  const gx = VX + GV[2 * j] * GHV * escV;
  const gy = VY + GV[2 * j + 1] * GHV * escV;
  if (ts < llega) {
    // vuelo en arco desde la Luna hasta su sitio en el ✓
    const u = suave((ts - sale) / DV);
    const qx = (hx + gx) * 0.5;
    const qy = Math.max(hy, gy) + 0.12;
    const a = (1 - u) * (1 - u);
    const b2 = 2 * u * (1 - u);
    const cc = u * u;
    p[0] = a * hx + b2 * qx + cc * gx;
    p[1] = a * hy + b2 * qy + cc * gy;
    p[2] = hz + (VZ - hz) * u;
    const ch = Math.sin(Math.PI * u);
    c[0] = 0.35 * (1 - u) + VERDE[0] * u + 0.5 * ch;
    c[1] = 0.33 * (1 - u) + VERDE[1] * u + 0.6 * ch;
    c[2] = 0.3 * (1 - u) + VERDE[2] * u + 0.5 * ch;
    return 0.03 + 0.008 * ch;
  }
  // en el ✓; la punta recién dibujada destella
  const chispa = Math.exp(-(ts - llega) / 0.13);
  let x = gx;
  let y = gy;
  let z = VZ;
  const k = 0.95 * luzV * (0.92 + 0.08 * Math.sin(t * 3.1 + S2[i] * 40));
  let r = VERDE[0] * k + 0.7 * chispa;
  let g = VERDE[1] * k + 0.6 * chispa;
  let b = VERDE[2] * k + 0.5 * chispa;
  let tam = 0.034 + 0.01 * chispa;
  // «sígueme»: la Luna se lo traga como cola de cometa
  const e = suave((ts - engulle - 0.3 * VU[j]) / 0.35);
  if (e > 0) {
    const d = Math.pow(S3[i], 1.3);
    const bc = enCola(true, d, i);
    x += (P[0] - x) * e;
    y += (P[1] - y) * e;
    z += (P[2] - z) * e;
    r += (0.8 * bc - r) * e;
    g += (0.88 * bc - g) * e;
    b += (1.0 * bc - b) * e;
    tam += (0.036 * (1 - 0.5 * d) - tam) * e;
  }
  p[0] = x;
  p[1] = y;
  p[2] = z;
  c[0] = r;
  c[1] = g;
  c[2] = b;
  return tam;
}

// ---- ✗ (antes: agua del remolino) ----
function aspa(j, i, t, ts, p, c) {
  const u = XU[j];
  const llega = (XS[j] === 0 ? xA0 + (xMid - xA0) * u : xMid + 0.03 + (xA1 - xMid - 0.03) * u) + 0.02 * S4[i];
  const sale = llega - DX;
  // agua del remolino; al salir despedida, el punto de partida queda fijo (el de ese instante)
  const ya = ts >= sale;
  const rho = enRemolino(NW + j, 0.25, 1.15, ya ? caidaRemolino(sale) : caidaW, ya ? giroRemolino(sale) : giroW);
  const sx = P[0];
  const sy = P[1];
  const sz = P[2];
  if (!ya) {
    p[0] = sx;
    p[1] = sy;
    p[2] = sz;
    const b = (0.2 + 0.25 * (1 - rho)) * fundido * (0.85 + 0.15 * Math.sin(t * 2.3 + S1[i] * 25));
    c[0] = 0.35 * b;
    c[1] = 0.62 * b;
    c[2] = 1.05 * b;
    return 0.028;
  }
  const gx = XX + GX[2 * j] * GHX * escX + sacudida;
  const gy = XY + GX[2 * j + 1] * GHX * escX;
  if (ts < llega) {
    // sale despedida en la dirección del giro (horario) y se curva hasta su sitio
    const w = suave((ts - sale) / DX);
    const dx = sx - remX;
    const dy = sy - remY;
    const L = Math.hypot(dx, dy) || 1;
    const qx = sx + (dy / L) * 0.32 + (gx - sx) * 0.35;
    const qy = sy - (dx / L) * 0.32 + (gy - sy) * 0.35;
    const a = (1 - w) * (1 - w);
    const b2 = 2 * w * (1 - w);
    const cc = w * w;
    p[0] = a * sx + b2 * qx + cc * gx;
    p[1] = a * sy + b2 * qy + cc * gy;
    p[2] = sz + (XZ - sz) * w;
    const ch = Math.sin(Math.PI * w);
    c[0] = 0.35 * 0.35 * (1 - w) + ROJO[0] * 1.2 * w + 0.5 * ch;
    c[1] = 0.62 * 0.35 * (1 - w) + ROJO[1] * 1.2 * w + 0.45 * ch;
    c[2] = 1.05 * 0.35 * (1 - w) + ROJO[2] * 1.2 * w + 0.45 * ch;
    return 0.03 + 0.008 * ch;
  }
  const chispa = Math.exp(-(ts - llega) / 0.13);
  let x = gx;
  let y = gy;
  let z = XZ;
  const k = 1.2 * luzX * (0.92 + 0.08 * Math.sin(t * 2.9 + S2[i] * 40));
  let r = ROJO[0] * k + 0.6 * chispa;
  let g = ROJO[1] * k + 0.45 * chispa;
  let b = ROJO[2] * k + 0.4 * chispa;
  let tam = 0.034 + 0.01 * chispa;
  const e = suave((ts - engulle - 0.3 * XD[j]) / 0.35);
  if (e > 0) {
    const d = Math.pow(S3[i], 1.3);
    const bc = enCola(false, d, i);
    x += (P[0] - x) * e;
    y += (P[1] - y) * e;
    z += (P[2] - z) * e;
    r += (0.35 * bc - r) * e;
    g += (0.68 * bc - g) * e;
    b += (1.05 * bc - b) * e;
    tam += (0.036 * (1 - 0.5 * d) - tam) * e;
  }
  p[0] = x;
  p[1] = y;
  p[2] = z;
  c[0] = r;
  c[1] = g;
  c[2] = b;
  return tam;
}

export function forma(i, t, p, c, ts) {
  preparar(ts, t);

  // ---- Luna creciente ----
  if (i < I_V) {
    const j = i;
    p[0] = lunaX + rl * MX[j];
    p[1] = lunaY + rl * MY[j];
    p[2] = lunaZ + rl * 0.3 * MZ[j];
    const k = luzL * (0.93 + 0.07 * Math.sin(t * 1.7 + S3[i] * 20));
    c[0] = MR[j] * k;
    c[1] = MG[j] * k;
    c[2] = MB[j] * k;
    return MT[j] * (1 + 0.15 * (rl - RL0) / 0.05);
  }

  if (i < I_NUC) return paloma(i - I_V, i, t, ts, p, c);

  // ---- núcleo: protones y neutrones que vibran; fogonazo con «sígueme» ----
  if (i < I_REM) {
    const j = i - I_NUC;
    const k = NUK[j];
    const vib = 0.012 * Math.sin(t * 11 + k * 1.7);
    const s = latido;
    const x = (NUX[j] + vib) * s;
    const y = NUY[j] * s;
    const z = (NUZ[j] - vib) * s;
    p[0] = x * cNy + z * sNy;
    p[1] = y;
    p[2] = -x * sNy + z * cNy;
    const col = k % 2 ? C.proton : C.neutron;
    const f = fogonazo;
    const kk = 1 + 1.3 * f;
    c[0] = (col[0] + (1.0 - col[0]) * 0.6 * f) * kk;
    c[1] = (col[1] + (0.95 - col[1]) * 0.6 * f) * kk;
    c[2] = (col[2] + (0.9 - col[2]) * 0.6 * f) * kk;
    return 0.05 * (1 + 0.25 * f);
  }

  // ---- remolino de agua ----
  if (i < I_X) {
    const j = i - I_REM;
    if (j < N_OJO) {
      // ojo: anillo blanco que gira
      const th = (TAU * j) / N_OJO - giroW * 1.6;
      const r = rw * (0.13 + 0.05 * S1[i]);
      p[0] = remX + r * Math.cos(th);
      p[1] = remY + r * Math.sin(th);
      p[2] = remZ + 0.03;
      const k = 1.25 * luzW;
      c[0] = 0.85 * k;
      c[1] = 0.95 * k;
      c[2] = 1.05 * k;
      return 0.026;
    }
    if (j < N_OJO + N_ORILLA) {
      // orilla: el contorno del agua, tenue
      const th = (TAU * (j - N_OJO + 0.6 * S1[i])) / N_ORILLA - giroW * 0.3;
      const r = rw * (1.12 + 0.05 * S2[i]);
      p[0] = remX + r * Math.cos(th);
      p[1] = remY + r * Math.sin(th);
      p[2] = remZ;
      const k = 0.42 * luzW * (0.8 + 0.2 * Math.sin(th * 3 + t * 2));
      c[0] = 0.3 * k;
      c[1] = 0.6 * k;
      c[2] = 1.05 * k;
      return 0.026;
    }
    const rho = enRemolino(j, 0.16, 1.05, caidaW, giroW);
    p[0] = P[0];
    p[1] = P[1];
    p[2] = P[2];
    const dentro = 1 - rho;
    const blanco = Math.pow(lim(dentro * 1.15), 1.4);
    const nucleo = 1 - 0.7 * WG[j] * WG[j];
    const k = (0.55 + 1.15 * dentro) * nucleo * luzW * fundido;
    c[0] = (0.25 + 0.65 * blanco) * k;
    c[1] = (0.55 + 0.42 * blanco) * k;
    c[2] = 1.05 * k;
    return 0.03 + 0.008 * dentro;
  }

  if (i < I_ELEC) return aspa(i - I_X, i, t, ts, p, c);

  // ---- electrones (órbita horizontal), con cola de cometa ----
  if (i < I_COR) {
    const j = i - I_ELEC;
    const e = j < NE / 2 ? 0 : 1;
    const cabeza = thE + e * Math.PI;
    const s = S1[i];
    if (s < 0.08) {
      orb(O_E, cabeza, R_ORB);
      p[0] = P[0] + (S2[i] - 0.5) * 0.08;
      p[1] = P[1] + (S3[i] - 0.5) * 0.08;
      p[2] = P[2] + (S4[i] - 0.5) * 0.08;
      const k = 1.4 * luzE;
      c[0] = C.electron[0] * k;
      c[1] = C.electron[1] * k;
      c[2] = C.electron[2] * k;
      return 0.06;
    }
    const d = (s - 0.08) / 0.92;
    orb(O_E, cabeza + d * colaE, R_ORB + (S2[i] - 0.5) * 0.03 * d);
    p[0] = P[0];
    p[1] = P[1];
    p[2] = P[2];
    const k = 1.1 * Math.pow(1 - d, 1.6) * luzE;
    c[0] = C.electron[0] * k;
    c[1] = C.electron[1] * k;
    c[2] = C.electron[2] * k;
    return 0.05 * (1 - d * 0.7);
  }

  // ---- corona del núcleo: brillo tenue; con «sígueme», onda de luz que se expande ----
  if (i < I_ANILLO) {
    const j = i - I_COR;
    const a = CA[j] + 0.2 * t;
    const r = CRr[j] + (ondaR + (S2[i] - 0.5) * 0.1 * (1 - S3[i] * S3[i]) - CRr[j]) * coronaFuera;
    p[0] = r * Math.cos(a);
    p[1] = r * Math.sin(a);
    p[2] = (S3[i] - 0.5) * 0.2 * (1 - coronaFuera);
    const base = (0.1 + 0.14 * (1 - (CRr[j] - 0.3) / 0.28)) * coronaBase;
    const k = base + ondaLuz * coronaFuera * (0.75 + 0.25 * S4[i]);
    c[0] = 1.0 * k;
    c[1] = 0.85 * k;
    c[2] = 0.62 * k;
    return 0.045 + 0.02 * coronaFuera;
  }

  // ---- anillos de las órbitas ----
  const j = i - I_ANILLO;
  const k = j % 3;
  const x = AX[j] * OC[k] - AY[j] * OS[k];
  const y = AX[j] * OS[k] + AY[j] * OC[k];
  p[0] = x;
  p[1] = y;
  p[2] = AZ[j];
  const delante = 0.75 + 0.35 * (AZ[j] / R_ORB);
  const resalta = k === O_LUNA ? resaltaL : k === O_REM ? resaltaW : 0;
  const rho = Math.hypot(x, y);
  const dr = (rho - ondaR) / 0.2;
  const onda = ondaK * Math.exp(-dr * dr);
  const v = 0.5 * delante * (1 + resalta + 2.4 * onda) * bajoSimbolos(x, y);
  c[0] = C.cian[0] * v + 0.5 * onda;
  c[1] = C.cian[1] * v + 0.5 * onda;
  c[2] = C.cian[2] * v + 0.4 * onda;
  return 0.026;
}
