// Escena 3: ¿por qué la Luna se ve girada? Dos observadores en la Tierra (norte, cálido;
// sur, frío) miran a la misma Luna. Cada uno tiene su «arriba» local (radial): junto a la
// Luna, la flecha del norte apunta hacia arriba y la del sur hacia abajo.
// Después, la analogía de la mesa: la Tierra se apaga y la Luna se desdobla en dos lunas
// iguales. A la izquierda, tal como la ve el del norte (iluminada a la derecha, flecha cálida
// encima); a la derecha, LA MISMA Luna girada 180° con su flecha fría, que pasa de abajo
// a arriba (iluminada a la izquierda, los mares del revés): como leer una nota desde el otro
// lado de la mesa.
// Coreografía anclada a las marcas de la voz (por defecto, las del español):
//   norte → se enciende el observador del norte y traza su línea de visión; luego, su flecha.
//   sur   → lo mismo con el del sur.
//   mesa  → la Luna empieza a desdoblarse ~1 s antes («el otro lado de la…») y al decir
//           «mesa» las dos lunas ya están formadas, con un destello en las flechas.
import { N, TAU, S1, S2, S3, S4, C, poner, continente, marca } from './base.js';

export const camara = { pos: [0, 0.32, 7], mira: [0, 0.42, 0], balanceo: 0 };

// --- geometría del diagrama ----------------------------------------------------
const TX = -0.7; // Tierra
const TY = 0.9;
const R = 0.5;
const HALO = 0.15; // grosor de la atmósfera (fracción de R)
const INCL = 0.22;
const MX = 0.68; // Luna
const MY = 0.98;
const RL = 0.4;
const LAT_N = (40 * Math.PI) / 180;
const LAT_S = (-35 * Math.PI) / 180;
const ALTO = 0.28; // altura de los observadores
const ESC = ALTO / 0.25; // escala del dibujo de las figuras
// Flechas del «arriba» de cada observador, pegadas a su Luna (encima o debajo).
const F_HUECO = 0.11; // separación entre el borde de la Luna y la cola de la flecha
const F_LARGO = 0.5;
const F_PUNTA = 0.12;
const F_ALA = 0.085;

// --- composición final: dos lunas iguales, lado a lado ---------------------------
const XF = 0.7; // centros en ±XF
const YF = 0.92;
const RF = 0.55;
const PIE_F = YF - RF - 0.52; // suelo de los observadores, bajo cada luna

const CALIDO = [1.0, 0.6, 0.2];
const FRIO = [0.3, 1.0, 0.85];

// --- reparto de partículas (las primeras llegan antes en la transición) -----------
const N_OBS = 2 * 300; // figura y suelo de cada observador
const N_LINEA = 2 * 330;
const N_TIERRA = 2480;
const N_EJE = 110;
const N_ATMOS = 600;
const N_ECUADOR = 380;
const N_LD = 1570; // la Luna del diagrama (mitad → luna izquierda, mitad → derecha)
const I_LINEA = N_OBS;
const I_TIERRA = I_LINEA + N_LINEA;
const I_EJE = I_TIERRA + N_TIERRA;
const I_ATMOS = I_EJE + N_EJE;
const I_ECUADOR = I_ATMOS + N_ATMOS;
const I_LUNA = I_ECUADOR + N_ECUADOR;
const I_FLECHA = I_LUNA + N_LD; // resto: las dos flechas
const N_FLECHA = N - I_FLECHA;
const MITAD_FL = N_FLECHA >> 1;
const M = (N - N_OBS - N_FLECHA) >> 1; // puntos de cada luna final (2900)

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const suave5 = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
// Pulso breve y suave cuando se dice cada palabra clave.
const pulsoEn = (x) => (x < -0.1 ? 0 : x < 0.1 ? (x + 0.1) * 5 : Math.exp(-(x - 0.1) / 0.45));
const cs = Math.cos(INCL);
const sn = Math.sin(INCL);
const LX = 0.62;
const LY = 0.35;
const LZ = 0.7;

// --- Tierra -------------------------------------------------------------------
const TU = new Float32Array(N_TIERRA * 3);
const TCOL = new Float32Array(N_TIERRA * 3);
const TTAM = new Float32Array(N_TIERRA);
for (let k = 0; k < N_TIERRA; k++) {
  const i = I_TIERRA + k;
  const y0 = 1 - (2 * (k + 0.5)) / N_TIERRA;
  const rr = Math.sqrt(1 - y0 * y0);
  const a = k * 2.399963229728653;
  let x = rr * Math.cos(a) + (S1[i] - 0.5) * 0.014;
  let y = y0 + (S2[i] - 0.5) * 0.014;
  let z = rr * Math.sin(a) + (S4[i] - 0.5) * 0.014;
  const L = Math.hypot(x, y, z);
  x /= L;
  y /= L;
  z /= L;
  TU[k * 3] = x;
  TU[k * 3 + 1] = y;
  TU[k * 3 + 2] = z;
  const n = continente(x * 1.9 + 0.7, y * 1.9, z * 1.9 - 0.4);
  let r, g, b, tm;
  if (Math.abs(y) > 0.88 - 0.04 * Math.sin(a * 3)) {
    r = 1.3;
    g = 1.4;
    b = 1.5;
    tm = 0.042;
  } else if (n > 0.25) {
    const costa = Math.max(0, 1 - (n - 0.25) / 0.22);
    const m = Math.min(1, costa * 0.8 + S3[i] * 0.35);
    const v = 1.5 + 0.35 * costa;
    r = (C.tierra[0] + (C.arena[0] - C.tierra[0]) * m) * v;
    g = (C.tierra[1] + (C.arena[1] - C.tierra[1]) * m) * v;
    b = (C.tierra[2] + (C.arena[2] - C.tierra[2]) * m) * v;
    tm = 0.046;
  } else {
    const prof = Math.min(1, (0.25 - n) / 0.5);
    const v = 1.2 - 0.35 * prof;
    r = C.oceano[0] * v;
    g = (C.oceano[1] + 0.08 * (1 - prof)) * v;
    b = C.oceano[2] * v;
    tm = 0.042;
  }
  TCOL[k * 3] = r;
  TCOL[k * 3 + 1] = g;
  TCOL[k * 3 + 2] = b;
  TTAM[k] = tm;
}

// --- la cara de la Luna (la misma de la escena 2: disco unidad, norte arriba,
//     creciente iluminada a la derecha, como se ve desde el hemisferio norte) ----------
const K = 0.48; // el terminador corta el disco en x = K·√(1−y²)
const SF = Math.sqrt(1 - K * K);
const PROF = 0.22;
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
const TMP = [0, 0, 0];
function sombrear(x, y) {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const L = x * SF - z * K;
  const m = mares(x, y);
  const v = textura(x, y);
  const cr = crater(x, y);
  if (L > 0) {
    const b = (0.3 + 0.92 * Math.pow(Math.min(1, L / 0.55), 0.6)) * v * (1 - 0.55 * m) * (1 + 0.35 * cr) * 1.12;
    TMP[0] = (1.0 - 0.36 * m) * b;
    TMP[1] = (0.94 - 0.24 * m) * b;
    TMP[2] = (0.84 - 0.02 * m) * b;
    return 1;
  }
  // Luz cenicienta: tenue y azulada; se adivinan los mares y el contorno del disco.
  const e = 0.3 * v * (1 - 0.5 * m) * (1 + 0.7 * cr);
  TMP[0] = 0.42 * e;
  TMP[1] = 0.55 * e;
  TMP[2] = 0.9 * e;
  return 0;
}

// Puntos de la Luna (en orden aleatorio: cualquier tramo es una muestra uniforme).
// La luna izquierda y la derecha usan EXACTAMENTE los mismos puntos; la derecha, girada 180°.
const MUX = new Float32Array(M);
const MUY = new Float32Array(M);
const MUZ = new Float32Array(M);
const MCR = new Float32Array(M);
const MCG = new Float32Array(M);
const MCB = new Float32Array(M);
const MTM = new Float32Array(M);
const MFASE = new Float32Array(M);
{
  let a = 20240611;
  const rnd = () => {
    a = (a + 0x6d2b79f5) | 0;
    let q = Math.imul(a ^ (a >>> 15), 1 | a);
    q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
    return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
  };
  let j = 0;
  while (j < M) {
    let x, y, ilu, k, tm;
    if (rnd() < 0.075) {
      // limbo: arco iluminado nítido y arco en sombra muy tenue
      const lit = rnd() < 0.72;
      const an = lit ? (rnd() - 0.5) * Math.PI : Math.PI / 2 + Math.PI * rnd();
      const r = 1 - 0.014 * rnd();
      x = r * Math.cos(an);
      y = r * Math.sin(an);
      sombrear(x, y);
      k = lit ? 1.05 : 0.85;
      tm = lit ? 0.03 : 0.026;
      MUZ[j] = 0;
    } else {
      x = 2 * rnd() - 1;
      y = 2 * rnd() - 1;
      const u = rnd();
      if (x * x + y * y > 0.997) continue;
      ilu = sombrear(x, y);
      if (!ilu && u > 0.15) continue;
      k = 1;
      tm = ilu ? 0.03 : 0.027;
      MUZ[j] = PROF * Math.sqrt(Math.max(0, 1 - x * x - y * y));
    }
    MUX[j] = x;
    MUY[j] = y;
    MCR[j] = TMP[0] * k;
    MCG[j] = TMP[1] * k;
    MCB[j] = TMP[2] * k;
    MTM[j] = tm;
    MFASE[j] = TAU * rnd();
    j++;
  }
}

// Destino final de las partículas de las líneas y de la Tierra: rellenan las dos lunas.
// La Luna del diagrama ya aporta los puntos [0, N_LD/2) a la izquierda y [N_LD/2, N_LD)
// a la derecha; el resto se reparte alternando izquierda / derecha.
const FO = new Uint8Array(N); // 0: luna izquierda (norte); 1: derecha (sur)
const FJ = new Uint16Array(N); // punto de la luna
{
  const ML = N_LD >> 1;
  let a = ML; // siguientes puntos libres de la izquierda: [ML, M)
  let b = 0; // de la derecha: [0, ML) y después [N_LD, M)
  for (let i = I_LINEA; i < I_LUNA; i++) {
    if ((i - I_LINEA) % 2 === 0) {
      FO[i] = 0;
      FJ[i] = a++;
    } else {
      FO[i] = 1;
      FJ[i] = b < ML ? b : b - ML + N_LD;
      b++;
    }
  }
}

// --- observadores y líneas de visión --------------------------------------------
// Por observador (8 valores): pie x, y; dirección «arriba» x, y; inicio de la línea x, y;
// final de la línea (en el borde de la Luna) x, y.
const OBS = new Float32Array(16);
const LAT = [LAT_N, LAT_S];
for (let o = 0; o < 2; o++) {
  const ux = Math.cos(LAT[o]);
  const uy = Math.sin(LAT[o]);
  const px = TX + R * 1.03 * ux;
  const py = TY + R * 1.03 * uy;
  const hx = px + ALTO * ux; // cabeza
  const hy = py + ALTO * uy;
  const dx = MX - hx;
  const dy = MY - hy;
  const L = Math.hypot(dx, dy);
  OBS.set([px, py, ux, uy, hx + (dx / L) * 0.08, hy + (dy / L) * 0.08, MX - (dx / L) * RL * 1.12, MY - (dy / L) * RL * 1.12], o * 8);
}

// --- estado por instante (se calcula una vez por fotograma) -----------------------
let tsCache = NaN;
let cg = 1;
let sg = 0;
const crecLinea = new Float32Array(2);
const crecFlecha = new Float32Array(2);
const pulsoObs = new Float32Array(2);
let flujo = 0;
let u = 0; // avance de la transformación a las dos lunas (0 diagrama, 1 dos lunas)
let retro = 1; // las líneas se recogen
let escT = 1; // la Tierra se encoge
let visT = 1; // y se apaga
let realce = 0; // brillo extra de las copias mientras faltan partículas
let pulsoMesa = 0;
// Marco de cada luna: centro, radio y giro (0 izquierda, 1 derecha).
const FCX = new Float32Array(2);
const FCY = new Float32Array(2);
const FR = new Float32Array(2);
const FCOS = new Float32Array(2);
const FSEN = new Float32Array(2);
const FLARGO = new Float32Array(2); // la flecha se acorta mientras gira
// Observadores: pie, «arriba» (ángulo) y orientación.
const OPX = new Float32Array(2);
const OPY = new Float32Array(2);
const OUX = new Float32Array(2);
const OUY = new Float32Array(2);

function preparar(ts) {
  tsCache = ts;
  const mN = marca('norte', 1.03);
  const mS = marca('sur', 3.23);
  const mM = marca('mesa', 6.13);
  const giro = 2.2 + ts * 0.18;
  cg = Math.cos(giro);
  sg = Math.sin(giro);
  // Línea de visión: arranca con la palabra; la flecha, cuando la línea llega a la Luna.
  crecLinea[0] = suave((ts - mN - 0.04) / 0.8);
  crecFlecha[0] = suave((ts - mN - 0.72) / 0.6);
  crecLinea[1] = suave((ts - mS - 0.04) / 0.8);
  crecFlecha[1] = suave((ts - mS - 0.72) / 0.6);
  pulsoObs[0] = pulsoEn(ts - mN);
  pulsoObs[1] = pulsoEn(ts - mS);
  pulsoMesa = pulsoEn(ts - mM);
  flujo = ts * 0.28;

  // Las dos lunas: empieza ~1 s antes de «mesa» (sin pisar la flecha del sur) y
  // queda formada justo antes de la palabra.
  const B = mM - 0.08;
  const A = Math.min(B - 0.45, Math.max(mS + 1.45, mM - 1.05));
  u = lim((ts - A) / (B - A));
  retro = 1 - suave(u / 0.3);
  escT = 1 - 0.45 * suave(u / 0.45);
  visT = 1 - suave(u / 0.42);
  const e1 = suave5((u - 0.04) / 0.62); // se desdobla y crece
  const e2 = suave5((u - 0.26) / 0.74); // la copia derecha gira 180°
  realce = e1 * (1 - suave((u - 0.5) / 0.5));
  const r = RL + (RF - RL) * e1;
  FR[0] = r;
  FR[1] = r;
  FCX[0] = MX + (-XF - MX) * e1;
  FCY[0] = MY + (YF - MY) * e1 + 0.16 * Math.sin(Math.PI * e1); // pasa por encima, en arco
  FCX[1] = MX + (XF - MX) * e1;
  FCY[1] = MY + (YF - MY) * e1;
  FCOS[0] = 1;
  FSEN[0] = 0;
  // Giro horario: la flecha fría pasa por el hueco entre las dos lunas (nunca sale de
  // pantalla) y se acorta mientras está tumbada.
  const th = -Math.PI * e2;
  FCOS[1] = Math.cos(th);
  FSEN[1] = Math.sin(th);
  FLARGO[0] = 1;
  FLARGO[1] = 1 - 0.78 * Math.abs(FSEN[1]);
  for (let o = 0; o < 2; o++) {
    // Los observadores se colocan bajo su luna: el del norte, pronto (cruza antes de que
    // llegue la luna izquierda); el del sur, en un arco bajo, por debajo de su flecha
    // mientras esta gira.
    const e3 = o === 0 ? suave5(u / 0.5) : suave5((u - 0.12) / 0.75);
    const a0 = LAT[o];
    const an = a0 + (Math.PI / 2 - a0) * e3;
    OUX[o] = Math.cos(an);
    OUY[o] = Math.sin(an);
    const fx = o === 0 ? -XF : XF;
    OPX[o] = OBS[o * 8] + (fx - OBS[o * 8]) * e3;
    OPY[o] = OBS[o * 8 + 1] + (PIE_F - OBS[o * 8 + 1]) * e3 - (o === 0 ? 0.12 : 0.58) * Math.sin(Math.PI * e3);
  }
}

// Punto j de la luna o (en su marco actual), con brillo k.
function puntoLuna(j, o, t, k, p, c) {
  const x = MUX[j];
  const y = MUY[j];
  const r = FR[o];
  const co = FCOS[o];
  const si = FSEN[o];
  poner(p, FCX[o] + r * (x * co - y * si), FCY[o] + r * (x * si + y * co), r * MUZ[j]);
  const v = k * (1 + 0.08 * Math.sin(t * 1.7 + MFASE[j]));
  poner(c, MCR[j] * v, MCG[j] * v, MCB[j] * v);
  return MTM[j] * (0.92 + 0.12 * (r - RL) / (RF - RL));
}

export function forma(i, t, p, c, ts) {
  if (ts !== tsCache) preparar(ts);

  // ---- Observadores: figura de luz orientada según su «arriba» local ----
  if (i < I_LINEA) {
    const k = i;
    const o = k < N_OBS / 2 ? 0 : 1;
    const q = k % (N_OBS / 2);
    const px = OPX[o];
    const py = OPY[o];
    const ux = OUX[o];
    const uy = OUY[o];
    const col = o === 0 ? CALIDO : FRIO;
    const pul = pulsoObs[o];
    const vivo = (0.92 + 0.08 * Math.sin(t * 3 + o * 2)) * (1 + 0.55 * pul);
    const s = S1[i];
    const g = (S2[i] - 0.5) * 0.024;
    let a; // altura sobre el suelo
    let b; // desplazamiento tangente
    let v = 1.6;
    let tm = 0.034;
    if (q < 60) {
      // piernas
      const lado = q < 30 ? -1 : 1;
      a = ALTO * 0.4 * s;
      b = lado * 0.06 * ESC * (1 - s) + g * 0.5;
    } else if (q < 130) {
      // tronco
      a = ALTO * (0.4 + 0.42 * s);
      b = g * 0.6;
    } else if (q < 180) {
      // brazos
      const lado = q < 155 ? -1 : 1;
      a = ALTO * (0.72 - 0.2 * s);
      b = lado * 0.065 * ESC * s + g * 0.4;
      v = 1.4;
    } else if (q < 260) {
      // cabeza
      const an = TAU * s;
      const r = (q < 220 ? 0.042 * Math.sqrt(S2[i]) : 0.046) * ESC;
      a = ALTO + r * Math.cos(an);
      b = r * Math.sin(an);
      v = 1.75;
    } else {
      // suelo: su horizonte local
      const d = s - 0.5;
      a = g * 0.3;
      b = d * 0.26 * ESC;
      v = 1.0 * (1 - Math.abs(d) * 1.8);
      tm = 0.028;
    }
    const e = 1 + 0.12 * pul; // al nombrarlo, crece un poco
    poner(p, px + (ux * a - uy * b) * e, py + (uy * a + ux * b) * e, 0.03);
    v *= vivo;
    poner(c, (0.15 + 0.85 * col[0]) * v, (0.15 + 0.85 * col[1]) * v, (0.15 + 0.85 * col[2]) * v);
    return tm;
  }

  // ---- Líneas de visión punteadas (del observador a la Luna) ----
  if (i < I_TIERRA) {
    if (u > 0.33) {
      const f = suave((u - 0.33 - 0.27 * S3[i]) / 0.3);
      return puntoLuna(FJ[i], FO[i], t, f, p, c);
    }
    const k = i - I_LINEA;
    const o = k < N_LINEA / 2 ? 0 : 1;
    const q = k % (N_LINEA / 2);
    const ox = OBS[o * 8 + 4];
    const oy = OBS[o * 8 + 5];
    const ex = OBS[o * 8 + 6];
    const ey = OBS[o * 8 + 7];
    const col = o === 0 ? CALIDO : FRIO;
    const crece = crecLinea[o] * retro;
    const PUNTOS = 11;
    const d = q % PUNTOS;
    // los puntos avanzan hacia la Luna; las partículas de cada punto se agrupan a su alrededor
    const w = (d + flujo * 2) / PUNTOS;
    const s = w - Math.floor(w) + (S1[i] - 0.5) * 0.012;
    const g = (S2[i] - 0.5) * 0.014;
    const dx = ex - ox;
    const dy = ey - oy;
    const L = Math.hypot(dx, dy);
    if (s > crece) {
      // aún no ha llegado hasta aquí: esperan escondidas en la punta
      poner(p, ox + dx * crece, oy + dy * crece, 0);
      poner(c, 0, 0, 0);
      return 0;
    }
    poner(p, ox + dx * s - (dy / L) * g, oy + dy * s + (dx / L) * g, 0.02);
    const extremos = Math.min(1, s * 10) * Math.min(1, (1 - s) * 10);
    const punta = crece < 1 ? Math.exp(-(((crece - s) / 0.05) ** 2)) * 1.3 : 0;
    const v = (0.95 * extremos + punta) * (0.85 + 0.15 * S3[i]);
    poner(c, col[0] * v, col[1] * v, col[2] * v);
    return 0.028;
  }

  // ---- La Tierra (con su eje, atmósfera y ecuador): se encoge y se apaga con «mesa» ----
  if (i < I_LUNA) {
    if (u > 0.43) {
      const f = suave((u - 0.43 - 0.27 * S3[i]) / 0.3);
      return puntoLuna(FJ[i], FO[i], t, f, p, c);
    }
    let tm;
    if (i < I_EJE) {
      const k = i - I_TIERRA;
      const j = k * 3;
      const ux = TU[j];
      const uy = TU[j + 1];
      const uz = TU[j + 2];
      const x1 = ux * cg + uz * sg;
      const z1 = -ux * sg + uz * cg;
      const y2 = uy * cs - z1 * sn;
      const z2 = uy * sn + z1 * cs;
      poner(p, R * x1, R * y2, R * z2);
      const frente = suave((z2 + 0.22) / 0.5);
      const luz = Math.max(0, x1 * LX + y2 * LY + z2 * LZ);
      const kk = (0.07 + 0.93 * frente) * (0.6 + 0.6 * luz);
      poner(c, TCOL[j] * kk, TCOL[j + 1] * kk, TCOL[j + 2] * kk);
      tm = TTAM[k] * (0.6 + 0.4 * frente);
    } else if (i < I_ATMOS) {
      // eje (asoma por los polos: el norte está arriba)
      const k = i - I_EJE;
      const norte = k % 2 === 0;
      const h = 1.03 + 0.4 * S1[i];
      const y = (norte ? 1 : -1) * h * cs;
      const z = (norte ? 1 : -1) * h * sn;
      poner(p, (S2[i] - 0.5) * 0.012, R * y, R * z);
      const v = (norte ? 0.8 : 0.5) * (1 - (h - 1.03) / 0.45);
      poner(c, 0.85 * v, 0.9 * v, 1.0 * v);
      tm = 0.026;
    } else if (i < I_ECUADOR) {
      // atmósfera
      const r = R * (1.0 + S3[i] ** 1.8 * HALO);
      const th = TAU * S1[i];
      const ca = Math.cos(th);
      const sa = Math.sin(th);
      poner(p, r * ca, r * sa, (S4[i] - 0.5) * 0.2);
      const k = 1 - (r - R) / (HALO * R);
      const lado = 0.75 + 0.4 * ca;
      const v = (0.1 + 1.1 * k * k * k) * lado * (0.9 + 0.1 * Math.sin(t * 1.3 + th * 5));
      poner(c, 0.35 * v, 0.68 * v, 1.0 * v);
      tm = 0.04 + 0.025 * (1 - k);
    } else {
      // ecuador (dorado, como en la escena 1)
      const lon = TAU * S1[i];
      const halo = S3[i] < 0.3;
      const lat = (S2[i] - 0.5) * (halo ? 0.07 : 0.022);
      const ux = Math.cos(lon);
      const uz = Math.sin(lon);
      const rr = R * 1.014;
      const x1 = ux * cg + uz * sg;
      const z1 = -ux * sg + uz * cg;
      const y2 = lat * cs - z1 * sn;
      const z2 = lat * sn + z1 * cs;
      poner(p, rr * x1, rr * y2, rr * z2);
      const frente = suave((z2 + 0.15) / 0.4);
      const v = (0.18 + 0.85 * frente) * (halo ? 0.3 : 1.15);
      poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
      tm = halo ? 0.065 : 0.032;
    }
    poner(p, TX + p[0] * escT, TY + p[1] * escT, p[2] * escT);
    poner(c, c[0] * visT, c[1] * visT, c[2] * visT);
    return tm * (0.5 + 0.5 * escT);
  }

  // ---- Luna del diagrama: con «mesa» se desdobla en las dos lunas ----
  if (i < I_FLECHA) {
    const j = i - I_LUNA;
    return puntoLuna(j, j < N_LD >> 1 ? 0 : 1, t, 1 + 0.9 * realce, p, c);
  }

  // ---- Flechas del «arriba» de cada observador, pegadas a su luna ----
  // Norte: encima, hacia arriba. Sur: debajo, hacia abajo; al girar su luna 180°,
  // queda encima y apuntando hacia arriba.
  const k = i - I_FLECHA;
  const o = k < MITAD_FL ? 0 : 1;
  const q = k - o * MITAD_FL;
  const col = o === 0 ? CALIDO : FRIO;
  const sg0 = o === 0 ? 1 : -1;
  const fl = FLARGO[o];
  const dx = -FSEN[o] * sg0; // dirección de la flecha (girada con su luna)
  const dy = FCOS[o] * sg0;
  const hueco = FR[o] + F_HUECO * (0.6 + 0.4 * fl);
  const bx = FCX[o] + dx * hueco; // cola
  const by = FCY[o] + dy * hueco;
  const crece = crecFlecha[o];
  const largo = F_LARGO * fl * crece;
  const latido = 1 + 0.5 * pulsoMesa + 0.1 * Math.sin(t * 2.4 + o * Math.PI) * u;
  if (crece <= 0) {
    poner(p, bx, by, 0);
    poner(c, 0, 0, 0);
    return 0;
  }
  if (q < MITAD_FL * 0.62) {
    // asta (reparto escalonado para que se vea continua)
    const s = (q + 0.5 * S1[i]) / (MITAD_FL * 0.62);
    const g = (S2[i] - 0.5) * 0.014;
    if (s > crece) {
      poner(p, bx + dx * largo, by + dy * largo, 0);
      poner(c, 0, 0, 0);
      return 0;
    }
    const d = F_LARGO * fl * s * 0.97;
    poner(p, bx + dx * d - dy * g, by + dy * d + dx * g, 0.02);
    const v = (0.6 + 0.7 * s) * 1.25 * latido;
    poner(c, col[0] * v, col[1] * v, col[2] * v);
    return 0.036;
  }
  // punta: dos trazos en V
  const lado = S3[i] < 0.5 ? -1 : 1;
  const s = S1[i];
  const g = (S2[i] - 0.5) * 0.022;
  const aparece = suave((crece - 0.15) / 0.3);
  const tx = bx + dx * largo;
  const ty = by + dy * largo;
  const pu = F_PUNTA * (0.55 + 0.45 * fl) * s;
  const al = F_ALA * (0.55 + 0.45 * fl) * s * lado;
  const ex = tx - dx * pu - dy * al;
  const ey = ty - dy * pu + dx * al;
  poner(p, ex + g * 0.7, ey + g * 0.7 * lado, 0.02);
  const v = 1.55 * aparece * latido;
  poner(c, col[0] * v, col[1] * v, col[2] * v);
  return 0.034 * (0.3 + 0.7 * aparece);
}
