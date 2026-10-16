// Escena 3: por qué la Luna se ve girada. Dos observadores en la Tierra (norte, cálido;
// sur, frío) miran a la Luna. Cada uno tiene su "arriba" local (radial): junto a la Luna,
// la flecha del norte apunta hacia arriba y la del sur hacia abajo.
import { N, TAU, S1, S2, S3, S4, C, poner, continente } from './base.js';

export const camara = { pos: [0, 0.32, 7], mira: [0, 0.42, 0], balanceo: 0 };

// --- geometría ---------------------------------------------------------------
// Tierra algo más baja y Luna algo más alta (diagonal suave); la Tierra, con margen respecto
// al borde izquierdo incluso con el latido de la voz (escala 1,045).
const TX = -0.73; // Tierra
const TY = 0.97;
const R = 0.49;
const HALO = 0.15; // grosor de la atmósfera (fracción de R)
const INCL = 0.22;
const MX = 0.6; // Luna
const MY = 1.1;
const RL = 0.36;
const LAT_N = (40 * Math.PI) / 180;
const LAT_S = (-35 * Math.PI) / 180;
const ALTO = 0.28; // altura de los observadores
const ESC = ALTO / 0.25; // escala del dibujo de las figuras
// Flechas del "arriba" de cada observador, a la derecha de la Luna. La del sur (hacia abajo)
// va en la columna interior y su punta queda alta, lejos de los iconos de la derecha de TikTok.
const FS_X = 1.05;
const FN_X = 1.2;
const F_Y0 = MY - 0.5;
const F_Y1 = MY + 0.62;
const F_PUNTA = 0.12;
const F_ALA = 0.08;

const CALIDO = [1.0, 0.6, 0.2];
const FRIO = [0.3, 1.0, 0.85];

// Reparto de partículas.
const N_TIERRA = 2480;
const N_EJE = 110;
const N_ATMOS = 600;
const N_ECUADOR = 380;
const N_LUNA = 1380;
const N_OBS = 2 * 300; // figura y suelo de cada observador
const N_LINEA = 2 * 330;
const I_EJE = N_TIERRA;
const I_ATMOS = I_EJE + N_EJE;
const I_ECUADOR = I_ATMOS + N_ATMOS;
const I_LUNA = I_ECUADOR + N_ECUADOR;
const I_OBS = I_LUNA + N_LUNA;
const I_LINEA = I_OBS + N_OBS;
const I_FLECHA = I_LINEA + N_LINEA; // resto: las dos flechas
const N_FLECHA = N - I_FLECHA;

let semilla = 7331;
const azar = () => {
  semilla = (semilla * 16807) % 2147483647;
  return (semilla - 1) / 2147483646;
};
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
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
  const y0 = 1 - (2 * (k + 0.5)) / N_TIERRA;
  const rr = Math.sqrt(1 - y0 * y0);
  const a = k * 2.399963229728653;
  let x = rr * Math.cos(a) + (S1[k] - 0.5) * 0.014;
  let y = y0 + (S2[k] - 0.5) * 0.014;
  let z = rr * Math.sin(a) + (S4[k] - 0.5) * 0.014;
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
    const m = Math.min(1, costa * 0.8 + S3[k] * 0.35);
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

// --- Luna creciente (iluminada por la derecha) --------------------------------
const BETA = 0.5;
const CB = Math.cos(BETA);
const SB = Math.sin(BETA);
const CRATERES = [
  [0.78, 0.32, 0.13],
  [0.7, -0.42, 0.12],
  [0.93, -0.04, 0.08],
  [0.55, 0.7, 0.1],
  [0.5, -0.78, 0.08],
];
const iluminado = (x, y) => {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  return (x * CB - z * SB) / 0.12;
};
const N_LIT = 880;
const N_OSC = 330;
const LUX = new Float32Array(N_LUNA);
const LUY = new Float32Array(N_LUNA);
const LUB = new Float32Array(N_LUNA);
const LUT = new Uint8Array(N_LUNA);
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
      if (d < 1) b *= 0.45 + 0.55 * d * d;
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

// --- Observadores y líneas de visión ----------------------------------------
// Por observador (8 valores): pie x, y; dirección "arriba" x, y; inicio de la línea x, y;
// final de la línea (en el borde de la Luna) x, y.
const OBS = new Float32Array(16);
[LAT_N, LAT_S].forEach((lat, o) => {
  const ux = Math.cos(lat);
  const uy = Math.sin(lat);
  const px = TX + R * 1.03 * ux;
  const py = TY + R * 1.03 * uy;
  const hx = px + ALTO * ux; // cabeza
  const hy = py + ALTO * uy;
  const dx = MX - hx;
  const dy = MY - hy;
  const L = Math.hypot(dx, dy);
  OBS.set([px, py, ux, uy, hx + (dx / L) * 0.08, hy + (dy / L) * 0.08, MX - (dx / L) * RL * 1.12, MY - (dy / L) * RL * 1.12], o * 8);
});

// Coreografía: [inicio, fin] de cada aparición.
const T_LINEA = [
  [1.5, 2.4],
  [2.7, 3.5],
];
const T_FLECHA = [
  [2.2, 2.95],
  [3.3, 4.0],
];

let tsCache = NaN;
let cg = 1;
let sg = 0;
const crecLinea = [0, 0];
const crecFlecha = [0, 0];
let flujo = 0;

function preparar(ts) {
  tsCache = ts;
  const giro = 2.2 + ts * 0.18;
  cg = Math.cos(giro);
  sg = Math.sin(giro);
  for (let o = 0; o < 2; o++) {
    crecLinea[o] = suave((ts - T_LINEA[o][0]) / (T_LINEA[o][1] - T_LINEA[o][0]));
    crecFlecha[o] = suave((ts - T_FLECHA[o][0]) / (T_FLECHA[o][1] - T_FLECHA[o][0]));
  }
  flujo = ts * 0.28;
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

  // ---- Eje de la Tierra (asoma por los polos: el norte está arriba) ----
  if (i < I_ATMOS) {
    const k = i - I_EJE;
    const norte = k % 2 === 0;
    const h = 1.03 + 0.4 * S1[i];
    const y = (norte ? 1 : -1) * h * cs;
    const z = (norte ? 1 : -1) * h * sn;
    poner(p, TX + (S2[i] - 0.5) * 0.012, TY + R * y, R * z);
    const v = (norte ? 0.8 : 0.5) * (1 - (h - 1.03) / 0.45);
    poner(c, 0.85 * v, 0.9 * v, 1.0 * v);
    return 0.026;
  }

  // ---- Atmósfera ----
  if (i < I_ECUADOR) {
    const r = R * (1.0 + S3[i] ** 1.8 * HALO);
    const th = TAU * S1[i];
    const ca = Math.cos(th);
    const sa = Math.sin(th);
    poner(p, TX + r * ca, TY + r * sa, (S4[i] - 0.5) * 0.2);
    const k = 1 - (r - R) / (HALO * R);
    const lado = 0.75 + 0.4 * ca;
    const v = (0.1 + 1.1 * k * k * k) * lado * (0.9 + 0.1 * Math.sin(t * 1.3 + th * 5));
    poner(c, 0.35 * v, 0.68 * v, 1.0 * v);
    return 0.04 + 0.025 * (1 - k);
  }

  // ---- Ecuador (dorado, como en la escena 1) ----
  if (i < I_LUNA) {
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
    poner(p, TX + rr * x1, TY + rr * y2, rr * z2);
    const frente = suave((z2 + 0.15) / 0.4);
    const v = (0.18 + 0.85 * frente) * (halo ? 0.3 : 1.15);
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return halo ? 0.065 : 0.032;
  }

  // ---- Luna ----
  if (i < I_OBS) {
    const k = i - I_LUNA;
    poner(p, MX + RL * LUX[k], MY + RL * LUY[k], 0.05);
    const tipo = LUT[k];
    const b = LUB[k];
    if (tipo === 0) {
      const v = 1.35 * b;
      poner(c, 1.0 * v, 0.97 * v, 0.9 * v);
      return 0.036;
    }
    if (tipo === 1) {
      poner(c, 0.12, 0.15, 0.26);
      return 0.036;
    }
    const v = 0.55 * b;
    poner(c, 0.75 * v, 0.82 * v, 1.0 * v);
    return 0.028;
  }

  // ---- Observadores: figura de luz orientada según su "arriba" local (radial) ----
  if (i < I_LINEA) {
    const k = i - I_OBS;
    const o = k < N_OBS / 2 ? 0 : 1;
    const q = k % (N_OBS / 2);
    const px = OBS[o * 8];
    const py = OBS[o * 8 + 1];
    const ux = OBS[o * 8 + 2];
    const uy = OBS[o * 8 + 3];
    const col = o === 0 ? CALIDO : FRIO;
    const vivo = 0.92 + 0.08 * Math.sin(t * 3 + o * 2);
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
    poner(p, px + ux * a - uy * b, py + uy * a + ux * b, 0.03);
    v *= vivo;
    poner(c, (0.15 + 0.85 * col[0]) * v, (0.15 + 0.85 * col[1]) * v, (0.15 + 0.85 * col[2]) * v);
    return tm;
  }

  // ---- Líneas de visión punteadas (del observador a la Luna) ----
  if (i < I_FLECHA) {
    const k = i - I_LINEA;
    const o = k < N_LINEA / 2 ? 0 : 1;
    const q = k % (N_LINEA / 2);
    const ox = OBS[o * 8 + 4];
    const oy = OBS[o * 8 + 5];
    const ex = OBS[o * 8 + 6];
    const ey = OBS[o * 8 + 7];
    const col = o === 0 ? CALIDO : FRIO;
    const crece = crecLinea[o];
    const PUNTOS = 11;
    const d = q % PUNTOS;
    // los puntos avanzan hacia la Luna; las partículas de cada punto se agrupan a su alrededor
    const u = (d + flujo * 2) / PUNTOS;
    const s = u - Math.floor(u) + (S1[i] - 0.5) * 0.012;
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

  // ---- Flechas del "arriba" de cada observador ----
  const k = i - I_FLECHA;
  const mitad = N_FLECHA >> 1;
  const o = k < mitad ? 0 : 1;
  const q = k - o * mitad;
  const col = o === 0 ? CALIDO : FRIO;
  const ax = o === 0 ? FN_X : FS_X;
  const dir = o === 0 ? 1 : -1; // norte: hacia arriba; sur: hacia abajo
  const base = o === 0 ? F_Y0 : F_Y1;
  const largo = F_Y1 - F_Y0;
  const crece = crecFlecha[o];
  const puntaY = base + dir * largo * crece;
  const latido = 1 + 0.12 * Math.sin(t * 2.4 + o * Math.PI) * suave((ts - 4.2) / 0.6);
  if (crece <= 0) {
    poner(p, ax, base, 0);
    poner(c, 0, 0, 0);
    return 0;
  }
  if (q < mitad * 0.62) {
    // asta (reparto escalonado para que se vea continua)
    const s = (q + 0.5 * S1[i]) / (mitad * 0.62);
    const g = (S2[i] - 0.5) * 0.014;
    if (s > crece) {
      poner(p, ax, puntaY, 0);
      poner(c, 0, 0, 0);
      return 0;
    }
    poner(p, ax + g, base + dir * largo * s * 0.97, 0.02);
    const v = (0.6 + 0.7 * s) * 1.25 * latido;
    poner(c, col[0] * v, col[1] * v, col[2] * v);
    return 0.036;
  }
  // punta: dos trazos en V
  const lado = S3[i] < 0.5 ? -1 : 1;
  const s = S1[i];
  const g = (S2[i] - 0.5) * 0.022;
  const aparece = suave((crece - 0.15) / 0.3);
  const ex = ax + lado * F_ALA * s;
  const ey = puntaY - dir * F_PUNTA * s;
  poner(p, ex + g * 0.7, ey + g * 0.7 * lado, 0.02);
  const v = 1.55 * aparece * latido;
  poner(c, col[0] * v, col[1] * v, col[2] * v);
  return 0.034 * (0.3 + 0.7 * aparece);
}
