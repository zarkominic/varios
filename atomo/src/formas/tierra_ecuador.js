// Escena 1 (gancho; el primer fotograma, ts = 1,8, es la miniatura): la Tierra con el ecuador
// como un anillo dorado, una Luna creciente a la derecha (hemisferio norte) y, a la izquierda,
// un lavabo con su remolino. Toda la coreografía va anclada a las marcas de la voz:
//   «luna»     la Luna baja al hemisferio sur girando 180° (termina antes de «agua»).
//   «agua»     el remolino cruza el ecuador: se calma y vuelve a girar al revés.
//   «verdad»   Luna, remolino y estelas se funden en una carta luminosa con un ✓ verde.
//   «la otra»  la carta se desdobla: sale otra a su lado, en blanco…
//   «mentira»  …que muestra un ✗ rojo. Enseguida las dos se dan la vuelta («?») y se barajan.
import { N, TAU, S1, S2, S3, S4, C, poner, continente, marca, glifo } from './base.js';

export const camara = { pos: [0, 0.32, 7], mira: [0, 0.42, 0], balanceo: 0 };

// --- geometría de la escena ------------------------------------------------
const TX = 0.0; // centro de la Tierra
const TY = 0.9;
const R = 0.76; // radio de la Tierra
const INCL = 0.4; // el polo norte se inclina hacia la cámara (vemos el ecuador como elipse)
const RL = 0.2; // radio de la Luna
const RW = 0.2; // radio del remolino
const ARCO_X = 1.07; // semiejes del arco que recorren Luna y remolino alrededor de la Tierra
const ARCO_Y = 1.15;
const TH0 = 0.93; // ángulo del arco al empezar (hemisferio norte) y al acabar (sur)
const TH1 = -0.93;
const DW = 1.5; // duración del viaje del remolino (cruza el ecuador a la mitad)
const TAU_W = 0.22; // anchura temporal de la inversión del giro (≈ 0,6 s)
const W0 = 3.0; // velocidad angular del remolino

// Reparto de partículas.
const N_TIERRA = 3500;
const N_ATMOS = 850;
const N_ECUADOR = 650;
const N_LUNA = 800;
const N_REMOLINO = 650;
const I_ATMOS = N_TIERRA;
const I_ECUADOR = I_ATMOS + N_ATMOS;
const I_LUNA = I_ECUADOR + N_ECUADOR;
const I_REMOLINO = I_LUNA + N_LUNA;
const I_ESTELA = I_REMOLINO + N_REMOLINO; // resto: estelas de la Luna y del remolino
const N_ESTELA_L = 360; // de la Luna; las demás, gotas del remolino
const N_ESTELA_W = N - I_ESTELA - N_ESTELA_L;
// Las cartas se forman con las partículas de Luna + remolino + estelas (I_LUNA … N-1):
// por parejas (q, q+1) comparten punto: una va a la carta A (✓) y otra a la B (✗).
const N_POOL = N - I_LUNA;
const N_SLOT = N_POOL / 2;
const NG = 500; // glifo
const NB = 280; // borde
const NM = 90; // marco interior
const NF = N_SLOT - NG - NB - NM; // relleno

// Generador determinista propio para muestrear tablas.
let semilla = 20251;
const azar = () => {
  semilla = (semilla * 16807) % 2147483647;
  return (semilla - 1) / 2147483646;
};
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const lncosh = (x) => {
  const a = Math.abs(x);
  return a + Math.log1p(Math.exp(-2 * a)) - Math.LN2;
};
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
  const y0 = 1 - (2 * (k + 0.5)) / N_TIERRA;
  const rr = Math.sqrt(1 - y0 * y0);
  const a = k * 2.399963229728653;
  // pequeña irregularidad para que no se note la red
  let x = rr * Math.cos(a) + (S1[k] - 0.5) * 0.012;
  let y = y0 + (S2[k] - 0.5) * 0.012;
  let z = rr * Math.sin(a) + (S4[k] - 0.5) * 0.012;
  const L = Math.hypot(x, y, z);
  x /= L;
  y /= L;
  z /= L;
  TU[k * 3] = x;
  TU[k * 3 + 1] = y;
  TU[k * 3 + 2] = z;
  const n = continente(x * 1.9, y * 1.9, z * 1.9);
  let r, g, b, tm;
  if (Math.abs(y) > 0.88 - 0.04 * Math.sin(a * 3)) {
    r = 0.88;
    g = 0.94;
    b = 1.0;
    tm = 0.054;
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
    tm = 0.058;
  } else {
    const prof = Math.min(1, (0.25 - n) / 0.5);
    const v = 1.25 - 0.35 * prof;
    r = C.oceano[0] * v;
    g = (C.oceano[1] + 0.08 * (1 - prof)) * v;
    b = C.oceano[2] * v;
    tm = 0.052;
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
const N_LIT = 500;
const N_OSC = 210;
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
    b = iluminado(x * 0.98, y * 0.98) > 0.5 ? 1.2 : 0.6;
    tipo = 2;
  }
  LUX[k] = x;
  LUY[k] = y;
  LUB[k] = b;
  LUT[k] = tipo;
}

// --- Remolino (lavabo visto desde arriba) ------------------------------------
const W_BORDE = 80; // borde de porcelana
const W_DESAGUE = 45; // aro del desagüe (el centro queda oscuro)
const W_ESPUMA = 200; // brazos de espuma
const W_BRAZOS = 3;
const W_TORSION = 1.8;

// --- Cartas: geometría en unidades «aparentes» (como si estuvieran en z = 0) ------
const CW = 0.72; // ancho
const CH = 1.0; // alto
const CR = 0.09; // radio de las esquinas
const CY = 0.25; // altura del centro de las cartas
const CXS = 0.44; // separación de cada carta respecto al centro una vez desdobladas
const ZC = 1.4; // profundidad (delante de la Tierra)
const KZ = (7 - ZC) / 7; // escala que compensa la perspectiva
const GH = 0.46; // altura del glifo
const DUR_VUELO = 0.42; // vuelo de las partículas hasta la carta

// Punto u ∈ [0, 1) del contorno de un rectángulo redondeado (escribe en _bx, _by).
let _bx = 0;
let _by = 0;
function contorno(u, w, h, r) {
  const a = w / 2 - r;
  const b = h / 2 - r;
  const L1 = 2 * a;
  const L2 = 2 * b;
  const LA = (Math.PI / 2) * r;
  let s = u * (2 * L1 + 2 * L2 + 4 * LA);
  if (s < L1) return ((_bx = -a + s), (_by = h / 2));
  if ((s -= L1) < LA) return ((_bx = a + r * Math.cos(Math.PI / 2 - s / r)), (_by = b + r * Math.sin(Math.PI / 2 - s / r)));
  if ((s -= LA) < L2) return ((_bx = w / 2), (_by = b - s));
  if ((s -= L2) < LA) return ((_bx = a + r * Math.cos(-s / r)), (_by = -b + r * Math.sin(-s / r)));
  if ((s -= LA) < L1) return ((_bx = a - s), (_by = -h / 2));
  if ((s -= L1) < LA) return ((_bx = -a + r * Math.cos(-Math.PI / 2 - s / r)), (_by = -b + r * Math.sin(-Math.PI / 2 - s / r)));
  if ((s -= LA) < L2) return ((_bx = -w / 2), (_by = -b + s));
  s -= L2;
  return ((_bx = -a + r * Math.cos(Math.PI - s / r)), (_by = b + r * Math.sin(Math.PI - s / r)));
}
// Por punto de la carta («hueco» 0…N_SLOT-1): posición local para borde, marco y relleno,
// y una posición dispersa (carta en blanco) para los puntos del glifo.
const HX = new Float32Array(N_SLOT);
const HY = new Float32Array(N_SLOT);
const HU = new Float32Array(N_SLOT); // posición a lo largo del contorno (para el brillo que lo recorre)
for (let s = 0; s < N_SLOT; s++) {
  if (s < NG) {
    HX[s] = (azar() - 0.5) * (CW - 0.2);
    HY[s] = (azar() - 0.5) * (CH - 0.2);
  } else if (s < NG + NB) {
    const u = (s - NG + 0.5) / NB;
    contorno(u, CW, CH, CR);
    HX[s] = _bx;
    HY[s] = _by;
    HU[s] = u;
  } else if (s < NG + NB + NM) {
    const u = (s - NG - NB + 0.5) / NM;
    contorno(u, CW - 0.13, CH - 0.13, CR * 0.6);
    HX[s] = _bx;
    HY[s] = _by;
    HU[s] = u;
  } else {
    HX[s] = (azar() - 0.5) * (CW - 0.06);
    HY[s] = (azar() - 0.5) * (CH - 0.06);
  }
}
// Retraso del vuelo de cada partícula: los glifos llegan antes (se leen enseguida).
const RETRASO = new Float32Array(N_POOL);
for (let q = 0; q < N_POOL; q++) {
  const s = ((q >> 1) * 7) % N_SLOT;
  RETRASO[q] = (s < NG ? 0.1 : 0.22) * S3[I_LUNA + q];
}
// Glifos (necesitan el navegador: se calculan la primera vez que se usan).
let GV = null; // ✓
let GX = null; // ✗
let GQ = null; // ?

// --- Recorrido (Luna a la derecha, remolino a la izquierda) ----------------
const posEn = (e) => TH0 + (TH1 - TH0) * e;
const progreso = (x) => {
  x = x <= 0 ? 0 : x >= 1 ? 1 : x;
  // suave en los extremos, con algo de velocidad desde el principio
  return 0.12 * x + 0.88 * (x * x * (3 - 2 * x));
};
const velocidad = (x) => (x <= 0 || x >= 1 ? 0 : (0.12 + 0.88 * 6 * x * (1 - x)) / 1.44);

// --- valores por fotograma ---------------------------------------------------
let tsCache = NaN;
let cg = 1;
let sg = 0;
// Luna
let eL = 0;
let velL = 0;
let lunaX = 0;
let lunaY = 0;
let lca = 1;
let lsa = 0;
// Remolino
let eW = 0;
let velW = 0;
let remX = 0;
let remY = 0;
let remFase = 0;
let remDir = 1;
let remCalma = 0;
// destellos del ecuador al cruzarlo (derecha: Luna; izquierda: remolino)
let pulsoD = 0;
let pulsoI = 0;
// Cartas
let tCarta = 0;
let pres = 0; // cuánto tapan las cartas lo que hay detrás
let luz = 0.5; // brillo de cada mitad (0,5 mientras las dos cartas coinciden)
let blanco = 0; // la carta B deshace su ✓ (carta en blanco)
let aspa = 0; // la carta B dibuja el ✗
let aX = 0;
let aY = 0;
let aZ = 0;
let aCos = 1;
let aSin = 0;
let aDorso = false;
let bX = 0;
let bY = 0;
let bZ = 0;
let bCos = 1;
let bSin = 0;
let bDorso = false;
let ocAx = 0; // rectángulos aparentes para tapar la Tierra: centro y semiancho
let ocAy = 0;
let ocAw = 0;
let ocBx = 0;
let ocBy = 0;
let ocBw = 0;

function preparar(ts) {
  tsCache = ts;
  const mLuna = marca('luna', 2.98);
  const mAgua = marca('agua', 4.6);
  const mVerdad = marca('verdad', 6.92);
  const mVerdadFin = marca('verdad_fin', 7.22);
  const mMentira = marca('mentira', 7.9);

  const giro = 0.6 + ts * 0.2;
  cg = Math.cos(giro);
  sg = Math.sin(giro);

  // Luna: baja con «luna» y llega girada 180° antes de «agua».
  const tLi = mLuna;
  const tLf = Math.max(mLuna + 0.9, mAgua - 0.15);
  const xL = (ts - tLi) / (tLf - tLi);
  eL = progreso(xL);
  velL = velocidad(xL) * suave((ts - tLi) / 0.25) * suave((tLf - ts) / 0.25);
  const thL = posEn(eL);
  const flotarL = 0.025 * Math.sin(ts * 1.3) * suave((ts - tLf + 0.3) / 0.8);
  lunaX = TX + ARCO_X * Math.cos(thL);
  lunaY = TY + ARCO_Y * Math.sin(thL) + flotarL;
  // Gira como la aguja de un reloj: 180° en total, a la par que baja.
  const a = -Math.PI * eL;
  lca = Math.cos(a);
  lsa = Math.sin(a);

  // Remolino: cruza el ecuador justo con «agua» y su giro se invierte.
  const tWc = mAgua + 0.1;
  const xW = (ts - (tWc - DW / 2)) / DW;
  eW = progreso(xW);
  velW = velocidad(xW);
  const thW = posEn(eW);
  const flotarW = 0.025 * Math.sin(ts * 1.1 + 1) * suave((ts - tWc - DW / 2 + 0.3) / 0.8);
  remX = TX - ARCO_X * Math.cos(thW);
  remY = TY + ARCO_Y * Math.sin(thW) - flotarW;
  // Sentido (+1 antihorario en el norte, −1 horario en el sur) y su fase integrada.
  remDir = Math.tanh((tWc - ts) / TAU_W);
  remFase = -W0 * TAU_W * lncosh((tWc - ts) / TAU_W);
  remCalma = 1 - remDir * remDir;
  pulsoD = Math.exp(-(((eL - 0.5) / 0.09) ** 2));
  pulsoI = Math.exp(-(((eW - 0.5) / 0.09) ** 2));

  // Cartas.
  tCarta = mVerdad - 0.4;
  pres = suave((ts - (mVerdad - 0.12)) / 0.4);
  const s1 = mMentira - 0.3; // la carta B termina de salir y empieza a dibujar el ✗
  const s0 = Math.min(s1 - 0.15, Math.max(mVerdadFin + 0.05, s1 - 0.5, mVerdad + 0.35));
  const sp = suave((ts - s0) / (s1 - s0));
  luz = 0.5 + 0.5 * sp;
  blanco = sp;
  aspa = suave((ts - s1) / 0.28);
  const flA = suave((ts - (mMentira + 0.2)) / 0.22);
  const flB = suave((ts - (mMentira + 0.25)) / 0.22);
  const sw = suave((ts - (mMentira + 0.34)) / 0.32);
  const arco = Math.sin(Math.PI * sw);
  const bob = 0.015 * Math.sin(ts * 1.6);
  aX = -CXS * sp + 2 * CXS * sw;
  bX = CXS * sp - 2 * CXS * sw;
  aY = CY + bob - 0.06 * arco;
  bY = CY + bob + 0.06 * arco;
  aZ = 0.6 * arco;
  bZ = -0.6 * arco;
  const angA = Math.PI * flA + 0.09 * Math.sin(ts * 1.2);
  const angB = Math.PI * flB + 0.09 * Math.sin(ts * 1.2 + 1.7);
  aCos = Math.cos(angA);
  aSin = Math.sin(angA);
  bCos = Math.cos(angB);
  bSin = Math.sin(angB);
  aDorso = flA > 0.5;
  bDorso = flB > 0.5;
  const escA = (7 - ZC) / (7 - ZC - aZ);
  const escB = (7 - ZC) / (7 - ZC - bZ);
  ocAx = aX * escA;
  ocAy = 0.32 + (aY - 0.32) * escA;
  ocAw = (CW / 2) * Math.abs(aCos) * escA;
  ocBx = bX * escB;
  ocBy = 0.32 + (bY - 0.32) * escB;
  ocBw = (CW / 2) * Math.abs(bCos) * escB;
}

// Cuánto tapan las cartas un punto del mundo (0…1).
function tapado(x, y, z) {
  const m = 7 / (7 - z);
  const xa = x * m;
  const ya = 0.32 + (y - 0.32) * m;
  const hh = CH / 2 + 0.02;
  let oa = 0;
  let dy = (hh - Math.abs(ya - ocAy)) / 0.06;
  if (dy > 0) {
    const dx = (ocAw + 0.02 - Math.abs(xa - ocAx)) / 0.06;
    if (dx > 0) oa = Math.min(1, dx) * Math.min(1, dy);
  }
  dy = (hh - Math.abs(ya - ocBy)) / 0.06;
  if (dy > 0) {
    const dx = (ocBw + 0.02 - Math.abs(xa - ocBx)) / 0.06;
    if (dx > 0) oa = Math.max(oa, Math.min(1, dx) * Math.min(1, dy));
  }
  return 1 - 0.86 * pres * oa;
}

// ---- Luna creciente ----
function luna(i, p, c) {
  const k = i - I_LUNA;
  const x = LUX[k];
  const y = LUY[k];
  poner(p, lunaX + RL * (x * lca - y * lsa), lunaY + RL * (x * lsa + y * lca), 0.05);
  const tipo = LUT[k];
  const b = LUB[k];
  if (tipo === 0) {
    const v = 0.98 * b;
    poner(c, 1.0 * v, 0.96 * v, 0.88 * v);
    return 0.031;
  }
  if (tipo === 1) {
    poner(c, 0.12, 0.15, 0.27);
    return 0.032;
  }
  const v = 0.5 * b;
  poner(c, 0.75 * v, 0.82 * v, 1.0 * v);
  return 0.025;
}

// ---- Remolino de agua (visto desde arriba): borde, agua azul, espuma y desagüe oscuro ----
function remolino(i, p, c, t, ts) {
  const k = i - I_REMOLINO;
  if (k < W_BORDE) {
    // borde de porcelana
    const a = TAU * ((k + 0.5) / W_BORDE) + (S1[i] - 0.5) * 0.04;
    const r = RW * (1.22 + (S2[i] - 0.5) * 0.04);
    poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), 0);
    const v = 0.62 + 0.18 * Math.sin(a - 0.8);
    poner(c, 0.62 * v, 0.74 * v, 1.0 * v);
    return 0.026;
  }
  if (k < W_BORDE + W_DESAGUE) {
    // aro del desagüe: gira deprisa; dentro, nada (agujero oscuro)
    const a = TAU * S1[i] + remFase * 2.2;
    const r = RW * (0.24 + 0.035 * S2[i]);
    poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), -0.01);
    const v = 0.6 + 0.3 * S3[i];
    poner(c, 0.3 * v, 0.62 * v, 1.0 * v);
    return 0.021;
  }
  // El agua entra por fuera y cae al centro (u avanza con el tiempo).
  const u = (S1[i] + ts * 0.3) % 1;
  const rn = 1 - 0.7 * u; // de 1 (borde) a 0,3 (desagüe)
  if (k < W_BORDE + W_DESAGUE + W_ESPUMA) {
    // Brazos de espuma: su torsión sigue al sentido de giro; al cruzar el ecuador se
    // disuelven y se vuelven a enroscar al revés.
    const brazo = k % W_BRAZOS;
    const disuelto = (S3[i] - 0.5) * (TAU / W_BRAZOS) * remCalma;
    const a =
      (brazo * TAU) / W_BRAZOS + remFase + remDir * W_TORSION * Math.log(1 / rn) + (S2[i] - 0.5) * 0.3 + disuelto;
    const r = RW * rn;
    poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), 0.01);
    const entrada = Math.min(1, u * 5);
    // más brillante fuera, se apaga al caer al desagüe (nada de núcleo de galaxia)
    const v = entrada * (0.2 + 0.8 * rn * rn) * 1.25 * (1 - 0.4 * remCalma);
    poner(c, 0.6 * v, 0.86 * v, 1.0 * v);
    return 0.026;
  }
  // Masa de agua: azul, gira más deprisa cerca del desagüe y se oscurece hacia el centro.
  const r = RW * (0.32 + 0.8 * Math.sqrt(S3[i]));
  const rr = r / RW;
  const a = TAU * S2[i] + remFase * (0.55 + 0.9 * (1.1 - rr)) + 0.25 * Math.sin(t * 0.7 + S4[i] * 6);
  poner(p, remX + r * Math.cos(a), remY + r * Math.sin(a), -0.005);
  const v = (0.25 + 0.75 * Math.min(1, (rr - 0.3) / 0.7)) * (0.75 + 0.25 * Math.sin(S4[i] * 20 + t * 2));
  poner(c, 0.1 * v, 0.36 * v, 1.05 * v);
  return 0.034;
}

// ---- Estelas: polvo de luz tras la Luna y gotas tras el remolino; quietas, un halo tenue ----
function estela(i, p, c, t) {
  const k = i - I_ESTELA;
  const deLuna = k < N_ESTELA_L;
  const frac = deLuna ? k / N_ESTELA_L : (k - N_ESTELA_L) / N_ESTELA_W;
  const e = deLuna ? eL : eW;
  const vel = deLuna ? velL : velW;
  const cx = deLuna ? lunaX : remX;
  const cy = deLuna ? lunaY : remY;
  const lado = deLuna ? 1 : -1;
  const rad = deLuna ? RL : RW * 1.15;
  const d = 0.035 + frac * 0.17;
  const th = posEn(Math.max(0, e - d));
  const ancho = (S2[i] - 0.5) * 1.5 * rad * (1 - (d - 0.035) / 0.24);
  const w = Math.min(1, vel * 2.5);
  // posición de reposo: alrededor de su dueño
  const ah = TAU * S1[i] + t * 0.15 * lado;
  const rh = rad * (1.12 + 0.55 * S3[i]);
  const hx = cx + rh * Math.cos(ah);
  const hy = cy + rh * Math.sin(ah);
  const sx = TX + lado * (ARCO_X + ancho) * Math.cos(th);
  const sy = TY + (ARCO_Y + ancho) * Math.sin(th);
  poner(p, hx + (sx - hx) * w, hy + (sy - hy) * w, (S4[i] - 0.5) * 0.1);
  const traza = vel * (1 - (d - 0.035) / 0.17) ** 2 * (0.4 + 0.6 * S3[i] ** 3) * 0.75;
  const halo = (deLuna ? 0.2 : 0.16) * (1 - S3[i]) * (0.6 + 0.4 * Math.sin(t * 2 + S2[i] * 20));
  const v = traza * w + halo * (1 - w);
  if (deLuna) poner(c, 0.85 * v, 0.9 * v, 1.0 * v);
  else poner(c, 0.35 * v, 0.62 * v, 1.0 * v);
  return 0.022 + 0.01 * S3[i];
}

// ---- Carta: punto q de la reserva (pareja q, q^1 → cartas A y B) ----
function carta(q, p, c, ts) {
  const esB = (q & 1) === 1;
  const s = ((q >> 1) * 7) % N_SLOT;
  const dorso = esB ? bDorso : aDorso;
  let lx, ly, r, g, b, tm;
  if (s < NG) {
    const j = s * 2;
    if (dorso) {
      lx = GQ[j] * GH;
      ly = GQ[j + 1] * GH;
      const v = 0.95 * luz;
      r = 1.0 * v;
      g = 0.8 * v;
      b = 0.42 * v;
    } else if (!esB) {
      lx = GV[j] * GH;
      ly = GV[j + 1] * GH;
      const v = 0.95 * luz;
      r = 0.3 * v;
      g = 1.0 * v;
      b = 0.45 * v;
    } else {
      // ✓ (mientras coincide con A) → carta en blanco → ✗
      let x0 = GV[j] * GH + (HX[s] - GV[j] * GH) * blanco;
      let y0 = GV[j + 1] * GH + (HY[s] - GV[j + 1] * GH) * blanco;
      lx = x0 + (GX[j] * GH - x0) * aspa;
      ly = y0 + (GX[j + 1] * GH - y0) * aspa;
      const vv = 0.95 * luz * (1 - blanco);
      const vf = 0.22 * blanco * (1 - aspa);
      const vr = 1.3 * aspa;
      r = 0.3 * vv + 0.2 * vf + 1.0 * vr;
      g = 1.0 * vv + 0.3 * vf + 0.24 * vr;
      b = 0.45 * vv + 0.6 * vf + 0.2 * vr;
    }
    tm = 0.033;
  } else if (s < NG + NB) {
    lx = HX[s];
    ly = HY[s];
    const v = 1.2 * luz * (0.8 + 0.2 * Math.sin(HU[s] * TAU * 2 - ts * 3.5));
    r = 0.8 * v;
    g = 0.9 * v;
    b = 1.0 * v;
    tm = 0.036;
  } else if (s < NG + NB + NM) {
    lx = HX[s];
    ly = HY[s];
    const v = (dorso ? 0.55 : 0.35) * luz;
    if (dorso) {
      r = 1.0 * v;
      g = 0.78 * v;
      b = 0.4 * v;
    } else {
      r = 0.5 * v;
      g = 0.7 * v;
      b = 1.0 * v;
    }
    tm = 0.022;
  } else {
    lx = HX[s];
    ly = HY[s];
    const v = 0.6 * luz;
    r = 0.14 * v;
    g = 0.24 * v;
    b = 0.62 * v;
    tm = 0.042;
  }
  if (dorso) lx = -lx; // el dorso no se ve en espejo
  const cx = esB ? bX : aX;
  const cy = esB ? bY : aY;
  const cz = esB ? bZ : aZ;
  const ca = esB ? bCos : aCos;
  const sa = esB ? bSin : aSin;
  poner(p, (cx + lx * ca) * KZ, 0.32 + (cy + ly - 0.32) * KZ, ZC + cz - lx * sa * KZ);
  poner(c, r, g, b);
  return tm;
}

function fuente(i, p, c, t, ts) {
  if (i < I_REMOLINO) return luna(i, p, c);
  if (i < I_ESTELA) return remolino(i, p, c, t, ts);
  return estela(i, p, c, t);
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
    const X = TX + R * x1;
    const Y = TY + R * y2;
    const Z = R * z2;
    poner(p, X, Y, Z);
    const frente = suave((z2 + 0.22) / 0.5);
    const luzT = Math.max(0, x1 * LX + y2 * LY + z2 * LZ);
    let k = (0.07 + 0.93 * frente) * (0.5 + 0.78 * luzT);
    if (pres > 0) k *= tapado(X, Y, Z);
    poner(c, TCOL[j] * k, TCOL[j + 1] * k, TCOL[j + 2] * k);
    return TTAM[i] * (0.6 + 0.4 * frente);
  }

  // ---- Atmósfera: halo en el plano de la pantalla ----
  if (i < I_ECUADOR) {
    const r = R * (1.0 + S3[i] ** 1.8 * 0.24);
    const th = TAU * S1[i];
    const ca = Math.cos(th);
    const sa = Math.sin(th);
    const X = TX + r * ca;
    const Y = TY + r * sa;
    const Z = (S4[i] - 0.5) * 0.25;
    poner(p, X, Y, Z);
    const k = 1 - (r - R) / (0.24 * R);
    const lado = 0.75 + 0.4 * (ca * 0.75 + sa * 0.66);
    let v = (0.1 + 1.35 * k * k * k) * lado * (0.9 + 0.1 * Math.sin(t * 1.3 + th * 5));
    if (pres > 0) v *= tapado(X, Y, Z);
    poner(c, 0.35 * v, 0.68 * v, 1.0 * v);
    return 0.045 + 0.03 * (1 - k);
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
    const X = TX + rr * x1;
    const Y = TY + rr * y2;
    const Z = rr * z2;
    poner(p, X, Y, Z);
    const frente = suave((z2 + 0.15) / 0.4);
    // destello que recorre el ecuador cuando la Luna (derecha) o el remolino (izquierda) lo cruzan
    const brillo = 1 + 1.2 * pulsoD * (0.4 + 0.6 * Math.max(0, x1)) + 1.2 * pulsoI * (0.4 + 0.6 * Math.max(0, -x1));
    const chispa = 0.85 + 0.15 * Math.sin(lon * 9 - t * 2.2);
    let v = (0.2 + 1.0 * frente) * brillo * chispa * (halo ? 0.42 : 1.55);
    if (pres > 0) v *= tapado(X, Y, Z);
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return halo ? 0.085 : 0.038;
  }

  // ---- Luna, remolino y estelas; con «verdad» vuelan a formar las cartas ----
  const q = i - I_LUNA;
  const f = (ts - tCarta - RETRASO[q]) / DUR_VUELO;
  if (f <= 0) return fuente(i, p, c, t, ts);
  if (GV === null) {
    GV = glifo('✔', NG);
    GX = glifo('✘', NG, { semilla: 5 });
    GQ = glifo('?', NG, { semilla: 7 });
  }
  if (f >= 1) return carta(q, p, c, ts);
  const tm0 = fuente(i, p, c, t, ts);
  const x0 = p[0];
  const y0 = p[1];
  const z0 = p[2];
  const r0 = c[0];
  const g0 = c[1];
  const b0 = c[2];
  const tm1 = carta(q, p, c, ts);
  const k = suave(f);
  const w = Math.sin(Math.PI * k);
  poner(
    p,
    x0 + (p[0] - x0) * k + w * 0.3 * (S2[i] - 0.5),
    y0 + (p[1] - y0) * k + w * 0.2 * (S4[i] - 0.5),
    z0 + (p[2] - z0) * k + w * 0.6,
  );
  poner(c, r0 + (c[0] - r0) * k + 0.25 * w, g0 + (c[1] - g0) * k + 0.3 * w, b0 + (c[2] - b0) * k + 0.4 * w);
  return tm0 + (tm1 - tm0) * k;
}
