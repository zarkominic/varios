// Escena 1 (gancho): la Tierra con el ecuador como un anillo dorado. Una Luna creciente
// baja por la derecha del hemisferio norte al sur girando 180° en el plano de la pantalla;
// a la izquierda, un remolino de agua que invierte su sentido al cruzar el ecuador.
import { N, TAU, S1, S2, S3, S4, C, poner, continente } from './base.js';

export const camara = { pos: [0, 0.32, 7], mira: [0, 0.42, 0], balanceo: 0 };

// --- geometría de la escena ------------------------------------------------
const TX = 0.0; // centro de la Tierra
const TY = 0.86;
const R = 0.76; // radio de la Tierra
const INCL = 0.4; // el polo norte se inclina hacia la cámara (vemos el ecuador como elipse)
const RL = 0.2; // radio de la Luna
const RW = 0.17; // radio del remolino
const T_FIN = 6.8; // la Luna termina de bajar (dentro de la escena más corta, 7,3 s)
const ARCO_X = 1.1; // semiejes del arco que recorren Luna y remolino alrededor de la Tierra
const ARCO_Y = 1.18;
const TH0 = 0.93; // ángulo del arco al empezar (hemisferio norte) y al acabar (sur)
const TH1 = -0.93;

// Reparto de partículas.
const N_TIERRA = 3700;
const N_ATMOS = 900;
const N_ECUADOR = 700;
const N_LUNA = 1000;
const N_REMOLINO = 500;
const I_ATMOS = N_TIERRA;
const I_ECUADOR = I_ATMOS + N_ATMOS;
const I_LUNA = I_ECUADOR + N_ECUADOR;
const I_REMOLINO = I_LUNA + N_LUNA;
const I_ESTELA = I_REMOLINO + N_REMOLINO; // resto: estela de la Luna
const N_ESTELA = N - I_ESTELA;

// Generador determinista propio para muestrear tablas.
let semilla = 20251;
const azar = () => {
  semilla = (semilla * 16807) % 2147483647;
  return (semilla - 1) / 2147483646;
};
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const cs = Math.cos(INCL);
const sn = Math.sin(INCL);
// Luz (de arriba a la derecha, algo de frente).
const LX = 0.5;
const LY = 0.45;
const LZ = 0.74;

// --- Tierra: red de Fibonacci (reparto uniforme) y color base -----------------
const TU = new Float32Array(N_TIERRA * 3);
const TCOL = new Float32Array(N_TIERRA * 3);
const TTAM = new Float32Array(N_TIERRA);
for (let k = 0; k < N_TIERRA; k++) {
  const y = 1 - (2 * (k + 0.5)) / N_TIERRA;
  const rr = Math.sqrt(1 - y * y);
  const a = k * 2.399963229728653;
  const x = rr * Math.cos(a);
  const z = rr * Math.sin(a);
  TU[k * 3] = x;
  TU[k * 3 + 1] = y;
  TU[k * 3 + 2] = z;
  const n = continente(x * 1.9, y * 1.9, z * 1.9);
  let r, g, b, tm;
  if (Math.abs(y) > 0.88 - 0.04 * Math.sin(a * 3)) {
    r = 0.88;
    g = 0.94;
    b = 1.0;
    tm = 0.052;
    const v = 1.5;
    r *= v;
    g *= v;
    b *= v;
  } else if (n > 0.25) {
    // tierra firme: verde hacia el interior, arena en la costa
    const costa = Math.max(0, 1 - (n - 0.25) / 0.22);
    const m = Math.min(1, costa * 0.8 + S3[k] * 0.35);
    const v = 1.55 + 0.35 * costa;
    r = (C.tierra[0] + (C.arena[0] - C.tierra[0]) * m) * v;
    g = (C.tierra[1] + (C.arena[1] - C.tierra[1]) * m) * v;
    b = (C.tierra[2] + (C.arena[2] - C.tierra[2]) * m) * v;
    tm = 0.056;
  } else {
    const prof = Math.min(1, (0.25 - n) / 0.5);
    const v = 1.25 - 0.35 * prof;
    r = C.oceano[0] * v;
    g = (C.oceano[1] + 0.08 * (1 - prof)) * v;
    b = C.oceano[2] * v;
    tm = 0.05;
  }
  TCOL[k * 3] = r;
  TCOL[k * 3 + 1] = g;
  TCOL[k * 3 + 2] = b;
  TTAM[k] = tm;
}

// --- Luna: puntos en el disco (marco propio, radio 1) con su brillo ---------
// Creciente iluminada por la derecha (Sol a la derecha y algo por detrás).
const BETA = 0.56;
const CB = Math.cos(BETA);
const SB = Math.sin(BETA);
const CRATERES = [
  [0.8, 0.3, 0.12],
  [0.72, -0.4, 0.11],
  [0.93, -0.05, 0.07],
  [0.6, 0.66, 0.09],
];
const iluminado = (x, y) => {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  return (x * CB - z * SB) / 0.12;
};
const N_LIT = 620;
const N_OSC = 250;
const LUX = new Float32Array(N_LUNA);
const LUY = new Float32Array(N_LUNA);
const LUB = new Float32Array(N_LUNA); // brillo
const LUT = new Uint8Array(N_LUNA); // 0 iluminada, 1 oscura, 2 borde
for (let k = 0; k < N_LUNA; k++) {
  let x, y, b, tipo;
  if (k < N_LIT) {
    for (;;) {
      const a = TAU * azar();
      const rr = Math.sqrt(azar());
      x = rr * Math.cos(a);
      y = rr * Math.sin(a);
      if (iluminado(x, y) > 0.05 + 0.4 * azar()) break;
    }
    b = 0.55 + 0.45 * Math.min(1, iluminado(x, y));
    for (const [cx, cy, cr0] of CRATERES) {
      const d = Math.hypot(x - cx, y - cy) / cr0;
      if (d < 1) b *= 0.5 + 0.5 * d * d;
    }
    tipo = 0;
  } else if (k < N_LIT + N_OSC) {
    for (;;) {
      const a = TAU * azar();
      const rr = Math.sqrt(azar()) * 0.96;
      x = rr * Math.cos(a);
      y = rr * Math.sin(a);
      if (iluminado(x, y) < 0.2) break;
    }
    b = 1;
    tipo = 1;
  } else {
    const a = TAU * azar();
    x = Math.cos(a) * (0.99 + 0.02 * azar());
    y = Math.sin(a) * (0.99 + 0.02 * azar());
    b = iluminado(x * 0.98, y * 0.98) > 0.5 ? 1.3 : 0.6;
    tipo = 2;
  }
  LUX[k] = x;
  LUY[k] = y;
  LUB[k] = b;
  LUT[k] = tipo;
}

// --- Remolino: trazos concéntricos (cabeza brillante y cola) -----------------
const W_BORDE = 70;
const W_NUCLEO = 30;
const W_LARGO = 10; // partículas por trazo
const W_TRAZOS = Math.floor((N_REMOLINO - W_BORDE - W_NUCLEO) / W_LARGO);
const WR = new Float32Array(W_TRAZOS); // radio relativo de cada trazo
const WA = new Float32Array(W_TRAZOS); // ángulo inicial
const WV = new Float32Array(W_TRAZOS); // factor de velocidad (más rápido cerca del centro)
for (let k = 0; k < W_TRAZOS; k++) {
  const rn = 0.2 + 0.8 * ((k * 0.6180339) % 1);
  WR[k] = rn;
  WA[k] = TAU * azar();
  WV[k] = (0.35 / rn) ** 0.85;
}

// --- Recorrido (Luna a la derecha, remolino a la izquierda) ----------------
const posEn = (e) => TH0 + (TH1 - TH0) * e;
const progreso = (ts) => {
  const x = Math.min(1, Math.max(0, ts / T_FIN));
  // suave en los extremos, con algo de velocidad desde el principio
  return 0.12 * x + 0.88 * (x * x * (3 - 2 * x));
};
const velocidad = (ts) => {
  if (ts <= 0 || ts >= T_FIN) return 0;
  const x = ts / T_FIN;
  return (0.12 + 0.88 * 6 * x * (1 - x)) / 1.44;
};
// Fase acumulada del remolino: su velocidad angular cambia de signo al cruzar el ecuador.
const W0 = 3.0;
const sentido = (y) => Math.tanh((y - TY) / 0.07);
const PASO = 0.01;
const FASE = new Float32Array(1600);
{
  let fase = 0;
  for (let k = 0; k < FASE.length; k++) {
    FASE[k] = fase;
    const y = TY + ARCO_Y * Math.sin(posEn(progreso(k * PASO)));
    fase += W0 * sentido(y) * PASO;
  }
}

// --- valores por fotograma ---------------------------------------------------
let tsCache = NaN;
let cg = 1;
let sg = 0;
let eActual = 0;
let lunaX = 0;
let lunaY = 0;
let lca = 1;
let lsa = 0;
let remX = 0;
let remY = 0;
let remFase = 0;
let remDir = 1;
let pulso = 0;
let vel = 0;

function preparar(ts) {
  tsCache = ts;
  const giro = 0.6 + ts * 0.2;
  cg = Math.cos(giro);
  sg = Math.sin(giro);
  const e = progreso(ts);
  eActual = e;
  vel = velocidad(ts);
  const th = posEn(e);
  const flotar = 0.025 * Math.sin(ts * 1.3) * suave((ts - T_FIN + 0.6) / 1.2);
  lunaX = TX + ARCO_X * Math.cos(th);
  lunaY = TY + ARCO_Y * Math.sin(th) + flotar;
  // Gira como la aguja de un reloj: 180° en total, a la par que baja.
  const a = -Math.PI * e;
  lca = Math.cos(a);
  lsa = Math.sin(a);
  remX = TX - ARCO_X * Math.cos(th);
  remY = TY + ARCO_Y * Math.sin(th) - flotar;
  const kf = Math.max(0, ts / PASO);
  if (kf >= FASE.length - 1) {
    remFase = FASE[FASE.length - 1] + (ts - (FASE.length - 1) * PASO) * W0 * sentido(remY);
  } else {
    const k0 = Math.floor(kf);
    remFase = FASE[k0] + (FASE[k0 + 1] - FASE[k0]) * (kf - k0);
  }
  remDir = sentido(remY);
  // destello del ecuador cuando la Luna lo cruza
  pulso = Math.exp(-(((e - 0.5) / 0.09) ** 2));
}

export function forma(i, t, p, c, ts) {
  if (ts !== tsCache) preparar(ts);

  // ---- Tierra ----
  if (i < N_TIERRA) {
    const j = i * 3;
    const ux = TU[j];
    const uy = TU[j + 1];
    const uz = TU[j + 2];
    const x1 = ux * cg + uz * sg;
    const z1 = -ux * sg + uz * cg;
    const y2 = uy * cs - z1 * sn;
    const z2 = uy * sn + z1 * cs;
    poner(p, TX + R * x1, TY + R * y2, R * z2);
    const frente = suave((z2 + 0.22) / 0.5);
    const luz = Math.max(0, x1 * LX + y2 * LY + z2 * LZ);
    const k = (0.07 + 0.93 * frente) * (0.6 + 0.6 * luz);
    poner(c, TCOL[j] * k, TCOL[j + 1] * k, TCOL[j + 2] * k);
    return TTAM[i] * (0.6 + 0.4 * frente);
  }

  // ---- Atmósfera: halo en el plano de la pantalla ----
  if (i < I_ECUADOR) {
    const r = R * (1.0 + S3[i] ** 1.6 * 0.3);
    const th = TAU * S1[i];
    const ca = Math.cos(th);
    const sa = Math.sin(th);
    poner(p, TX + r * ca, TY + r * sa, (S4[i] - 0.5) * 0.25);
    const k = 1 - (r - R) / (0.3 * R);
    const lado = 0.75 + 0.4 * (ca * 0.75 + sa * 0.66);
    const v = (0.1 + 1.0 * k * k) * lado * (0.9 + 0.1 * Math.sin(t * 1.3 + th * 5));
    poner(c, 0.35 * v, 0.68 * v, 1.0 * v);
    return 0.045;
  }

  // ---- Ecuador: anillo dorado sobre la superficie ----
  if (i < I_LUNA) {
    const lon = TAU * S1[i];
    const halo = S3[i] < 0.3;
    const lat = (S2[i] - 0.5) * (halo ? 0.07 : 0.02);
    const ux = Math.cos(lon);
    const uz = Math.sin(lon);
    const rr = R * 1.012;
    const x1 = ux * cg + uz * sg;
    const z1 = -ux * sg + uz * cg;
    const y2 = lat * cs - z1 * sn;
    const z2 = lat * sn + z1 * cs;
    poner(p, TX + rr * x1, TY + rr * y2, rr * z2);
    const frente = suave((z2 + 0.15) / 0.4);
    // destello que recorre el ecuador cuando la Luna lo cruza (desde el borde derecho)
    const brillo = 1 + 1.2 * pulso * (0.4 + 0.6 * Math.max(0, x1));
    const chispa = 0.85 + 0.15 * Math.sin(lon * 9 - t * 2.2);
    const v = (0.2 + 1.0 * frente) * brillo * chispa * (halo ? 0.32 : 1.3);
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return halo ? 0.075 : 0.036;
  }

  // ---- Luna creciente ----
  if (i < I_REMOLINO) {
    const k = i - I_LUNA;
    const x = LUX[k];
    const y = LUY[k];
    poner(p, lunaX + RL * (x * lca - y * lsa), lunaY + RL * (x * lsa + y * lca), 0.05);
    const tipo = LUT[k];
    const b = LUB[k];
    if (tipo === 0) {
      const v = 1.45 * b;
      poner(c, 1.0 * v, 0.97 * v, 0.9 * v);
      return 0.034;
    }
    if (tipo === 1) {
      poner(c, 0.13, 0.16, 0.27);
      return 0.032;
    }
    const v = 0.55 * b;
    poner(c, 0.75 * v, 0.82 * v, 1.0 * v);
    return 0.026;
  }

  // ---- Remolino de agua (visto desde arriba) ----
  if (i < I_ESTELA) {
    const k = i - I_REMOLINO;
    if (k < W_BORDE) {
      // borde del lavabo
      const a = TAU * S1[i];
      const r = RW * (1.22 + (S2[i] - 0.5) * 0.04);
      poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), 0);
      poner(c, 0.2, 0.36, 0.7);
      return 0.028;
    }
    if (k < W_BORDE + W_NUCLEO) {
      // desagüe
      const a = TAU * S1[i];
      const r = RW * 0.1 * Math.sqrt(S2[i]);
      poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), 0);
      poner(c, 0.35, 0.7, 1.0);
      return 0.03;
    }
    const q = k - W_BORDE - W_NUCLEO;
    const tr = Math.floor(q / W_LARGO) % W_TRAZOS;
    const j = q % W_LARGO;
    const rn = WR[tr];
    const cabeza = WA[tr] + remFase * WV[tr];
    const a = cabeza - remDir * j * (0.05 / rn);
    const r = RW * rn * (1 + (S2[i] - 0.5) * 0.04);
    poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), (S4[i] - 0.5) * 0.03);
    const cola = (1 - j / W_LARGO) ** 1.4;
    const v = (0.25 + 1.1 * cola) * (0.75 + 0.25 * (1 - rn));
    poner(c, (0.25 + 0.25 * (1 - rn)) * v, 0.6 * v, 1.0 * v);
    return 0.024 + 0.008 * cola;
  }

  // ---- Estela de la Luna (camino ya recorrido, se apaga al detenerse) ----
  const k = i - I_ESTELA;
  const d = (k / N_ESTELA) * 0.16;
  const th = posEn(Math.max(0, eActual - d));
  const g = (S2[i] - 0.5) * 0.22 * RL * (d / 0.16 + 0.3);
  const ca = Math.cos(th);
  const sa = Math.sin(th);
  poner(p, TX + (ARCO_X + g) * ca, TY + (ARCO_Y + g) * sa, 0);
  const v = vel * (1 - d / 0.16) ** 2 * (0.6 + 0.4 * S3[i]) * 0.9;
  poner(c, 0.85 * v, 0.9 * v, 1.0 * v);
  return 0.028;
}
