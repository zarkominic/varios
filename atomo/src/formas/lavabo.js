// Escena 5: «¿Y el agua? El efecto Coriolis… es diminuto y necesita tiempo. Tu lavamanos
// se vacía en segundos.» Un lavamanos visto desde arriba (plano XY): borde ovalado, agua
// azul ondulando, desagüe en el centro. Junto al desagüe, una flecha amarilla diminuta
// (Coriolis) que una lupa amplía un poco (ts 2-5 s). Desde 4,5 s el agua se retira hacia
// el desagüe hasta casi vaciarse (~7,2 s) sin que la flecha haya cambiado nada.
// La geometría del lavabo se comparte con remolino.js (escena 6).
import { N, TAU } from './base.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

export const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10));

let semilla = 5150417;
function rnd() {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
}

// --- geometría del lavabo ---------------------------------------------------------
export const CY = 0.72; // centro del contorno exterior
export const EXT_A = 1.27; // contorno exterior: superelipse (óvalo algo cuadrado)
export const EXT_B = 1.01;
const EXT_E = 2 / 2.6;
export const INT_A = 1.07; // cuenca: elipse algo adelantada (deja una repisa detrás para el grifo)
export const INT_B = 0.79;
export const INT_CY = CY - 0.06;
export const DES_X = 0; // desagüe
export const DES_Y = INT_CY;
export const DES_R = 0.12;
export const AG_A = INT_A - 0.03; // lámina de agua
export const AG_B = INT_B - 0.03;
export const HUECO = 0.155; // el agua no tapa el desagüe

const potS = (v, e) => (v < 0 ? -Math.pow(-v, e) : Math.pow(v, e));
export const PT = new Float64Array(2);
export function contornoExterior(fi) {
  PT[0] = EXT_A * potS(Math.cos(fi), EXT_E);
  PT[1] = CY + EXT_B * potS(Math.sin(fi), EXT_E);
}
export function contornoInterior(fi) {
  PT[0] = INT_A * Math.cos(fi);
  PT[1] = INT_CY + INT_B * Math.sin(fi);
}
// Canal del borde (entre los dos contornos): por aquí corre el agua en el inodoro.
export function contornoCanal(fi) {
  contornoExterior(fi);
  const x = PT[0];
  const y = PT[1];
  contornoInterior(fi);
  PT[0] = 0.5 * (x + PT[0]);
  PT[1] = 0.5 * (y + PT[1]);
}

// Tabla de longitud de arco para muestrear un contorno de forma uniforme.
const NA = 2048;
function tablaArco(fn) {
  const acum = new Float64Array(NA + 1);
  fn(0);
  let px = PT[0];
  let py = PT[1];
  for (let k = 1; k <= NA; k++) {
    fn((TAU * k) / NA);
    acum[k] = acum[k - 1] + Math.hypot(PT[0] - px, PT[1] - py);
    px = PT[0];
    py = PT[1];
  }
  return acum;
}
function fiPorArco(acum, u) {
  const L = acum[NA] * (u - Math.floor(u));
  let a = 0;
  let b = NA;
  while (b - a > 1) {
    const m = (a + b) >> 1;
    if (acum[m] < L) a = m;
    else b = m;
  }
  const f = (L - acum[a]) / (acum[b] - acum[a] || 1);
  return (TAU * (a + f)) / NA;
}
const ARCO_EXT = tablaArco(contornoExterior);
const ARCO_INT = tablaArco(contornoInterior);
const dentroExt = (x, y) => Math.pow(Math.abs(x / EXT_A), 2.6) + Math.pow(Math.abs((y - CY) / EXT_B), 2.6) < 1;
const elipInt = (x, y) => (x / INT_A) ** 2 + ((y - INT_CY) / INT_B) ** 2;
// luz que llega de arriba a la izquierda
const LUZX = -0.7071;
const LUZY = 0.7071;

// --- reparto de partículas ----------------------------------------------------------
export const I_BORDE = 1400; // [0, I_BORDE): borde del lavabo
export const I_DESAGUE = I_BORDE + 300; // desagüe
export const I_GRIFO = I_DESAGUE + 420; // grifo
export const I_FLECHA = I_GRIFO + 230; // flecha de Coriolis
export const I_AGUA = I_FLECHA; // resto: agua (una parte forma la lupa)

// Partes fijas (borde, desagüe, grifo): posición, color, tamaño y centelleo.
export const FX = new Float32Array(I_FLECHA);
export const FY = new Float32Array(I_FLECHA);
export const FZ = new Float32Array(I_FLECHA);
export const FR = new Float32Array(I_FLECHA);
export const FG = new Float32Array(I_FLECHA);
export const FB = new Float32Array(I_FLECHA);
export const FT = new Float32Array(I_FLECHA);
export const FK = new Float32Array(I_FLECHA); // amplitud del centelleo
export const FASE = new Float32Array(N);
for (let i = 0; i < N; i++) FASE[i] = TAU * rnd();

function fijo(i, x, y, z, r, g, b, k, tam, cent = 0.06) {
  FX[i] = x;
  FY[i] = y;
  FZ[i] = z;
  FR[i] = r * k;
  FG[i] = g * k;
  FB[i] = b * k;
  FT[i] = tam;
  FK[i] = cent;
}

// Borde: contorno exterior, contorno interior (más brillante), repisa y pared de la cuenca.
{
  const nExt = 560;
  const nInt = 640;
  const nRep = 110;
  const nPar = I_BORDE - nExt - nInt - nRep;
  let i = 0;
  for (let j = 0; j < nExt; j++, i++) {
    const fi = fiPorArco(ARCO_EXT, (j + 0.5 * rnd()) / nExt);
    contornoExterior(fi);
    const nx = Math.cos(fi);
    const ny = Math.sin(fi);
    const d = (rnd() - 0.5) * 0.012;
    const luz = nx * LUZX + ny * LUZY;
    fijo(i, PT[0] + nx * d, PT[1] + ny * d, 0, 0.72, 0.88, 1.0, 1.05 + 0.35 * luz, 0.034);
  }
  for (let j = 0; j < nInt; j++, i++) {
    const fi = fiPorArco(ARCO_INT, (j + 0.5 * rnd()) / nInt);
    contornoInterior(fi);
    const nx = Math.cos(fi);
    const ny = Math.sin(fi);
    const d = (rnd() - 0.5) * 0.012;
    const luz = -(nx * LUZX + ny * LUZY);
    fijo(i, PT[0] + nx * d, PT[1] + ny * d, 0, 0.88, 0.95, 1.0, 1.3 + 0.45 * luz, 0.034);
  }
  for (let j = 0; j < nRep; ) {
    const x = (2 * rnd() - 1) * EXT_A;
    const y = CY + (2 * rnd() - 1) * EXT_B;
    if (!dentroExt(x, y) || elipInt(x, y) < 1.04) continue;
    const luz = (x * LUZX + (y - CY) * LUZY) / 1.2;
    fijo(i, x, y, (rnd() - 0.5) * 0.02, 0.7, 0.82, 1.0, 0.2 + 0.07 * luz, 0.045, 0.12);
    j++;
    i++;
  }
  for (let j = 0; j < nPar; j++, i++) {
    // pared de la cuenca: un degradado justo por dentro del contorno interior
    const fi = TAU * rnd();
    const s = Math.pow(rnd(), 1.4);
    const rr = 0.995 - 0.07 * s;
    const x = INT_A * rr * Math.cos(fi);
    const y = INT_CY + INT_B * rr * Math.sin(fi);
    const luz = -(Math.cos(fi) * LUZX + Math.sin(fi) * LUZY);
    fijo(i, x, y, -0.01, 0.55, 0.78, 1.0, (0.5 + 0.2 * luz) * (1 - s), 0.06, 0.1);
  }
}

// Desagüe: aro metálico con brillo arriba a la izquierda, aro interior y orificios.
{
  let i = I_BORDE;
  for (let j = 0; j < 180; j++, i++) {
    const a = TAU * (j + rnd()) / 180;
    const r = DES_R + (rnd() - 0.5) * 0.024;
    const brillo = Math.pow(Math.max(0, Math.cos(a - 2.36)), 3);
    const reflejo = Math.pow(Math.max(0, Math.cos(a + 0.785)), 6);
    fijo(i, DES_X + r * Math.cos(a), DES_Y + r * Math.sin(a), 0, 0.8, 0.9, 1.0, 0.65 + 1.1 * brillo + 0.4 * reflejo, 0.028, 0.08 + 0.25 * brillo);
  }
  for (let j = 0; j < 60; j++, i++) {
    const a = TAU * (j + rnd()) / 60;
    const r = 0.072 + (rnd() - 0.5) * 0.008;
    fijo(i, DES_X + r * Math.cos(a), DES_Y + r * Math.sin(a), -0.02, 0.6, 0.75, 1.0, 0.42, 0.022);
  }
  for (let j = 0; i < I_DESAGUE; j++, i++) {
    const k = j % 6;
    const a = (TAU * k) / 6 + 0.3;
    const th = TAU * rnd();
    const r = 0.011 * Math.sqrt(rnd());
    fijo(i, DES_X + 0.036 * Math.cos(a) + r * Math.cos(th), DES_Y + 0.036 * Math.sin(a) + r * Math.sin(th), -0.02, 0.6, 0.75, 1.0, 0.32, 0.02);
  }
}

// Grifo (monomando visto desde arriba): base redonda en la repisa, caño hacia la cuenca y palanca.
export const GR_X = 0;
export const GR_Y = CY + 0.885;
export const CANO_Y = CY + 0.5; // punta del caño (aireador)
{
  let i = I_DESAGUE;
  const cromo = (x, y, k, tam = 0.026) => {
    fijo(i++, x, y, 0.06, 0.82, 0.92, 1.0, k, tam, 0.1);
  };
  // cuerpo redondo: contorno con brillo arriba a la izquierda y relleno degradado
  for (let j = 0; j < 75; j++) {
    const a = TAU * (j + rnd()) / 75;
    const r = 0.088 + (rnd() - 0.5) * 0.01;
    cromo(GR_X + r * Math.cos(a), GR_Y + r * Math.sin(a), 0.6 + 0.75 * Math.pow(Math.max(0, Math.cos(a - 2.36)), 2), 0.028);
  }
  for (let j = 0; j < 70; j++) {
    const a = TAU * rnd();
    const r = 0.08 * Math.sqrt(rnd());
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    cromo(GR_X + x, GR_Y + y, 0.42 + 0.5 * Math.exp(-((x + 0.03) ** 2 + (y - 0.03) ** 2) / 0.0012), 0.032);
  }
  // caño: barra cromada de punta redondeada, con un reflejo a lo largo
  const y0 = GR_Y - 0.05;
  const largo = y0 - CANO_Y;
  const ANCHO = 0.036;
  for (let j = 0; j < 165; j++) {
    const w = (rnd() * 2 - 1) * ANCHO;
    const filo = Math.abs(w) / ANCHO;
    const k = 0.48 + 0.5 * filo ** 4;
    cromo(GR_X + w, y0 - largo * rnd(), k, 0.03);
  }
  for (let j = 0; j < 30; j++) {
    const a = Math.PI + Math.PI * rnd();
    const r = ANCHO * Math.sqrt(rnd());
    cromo(GR_X + r * Math.cos(a), CANO_Y + r * Math.sin(a), 0.6, 0.03);
  }
  for (let j = 0; j < 45; j++) cromo(GR_X - 0.013 + (rnd() - 0.5) * 0.007, CANO_Y + 0.01 + (y0 + 0.04 - CANO_Y) * rnd(), 1.3, 0.022);
  // palanca del monomando hacia atrás
  while (i < I_GRIFO) {
    const s = rnd();
    const w = (rnd() * 2 - 1) * 0.02;
    cromo(GR_X + w, GR_Y + 0.06 + 0.17 * s, 0.5 + 0.5 * (Math.abs(w) / 0.02) ** 2 + 0.25 * (1 - s), 0.028);
  }
}

// --- flecha de Coriolis y lupa -------------------------------------------------------
export const LU_X = DES_X + 0.44; // centro de la lupa (y de la flecha)
export const LU_Y = DES_Y + 0.08;
const LU_R = 0.28;
const MANGO_A = -0.87; // ángulo del mango
const MANGO_L = 0.34;
const M_MAX = 2.2; // aumento de la lupa sobre el agua
const MA_MAX = 2.0; // aumento de la flecha

// Flecha diminuta curvada en sentido antihorario (lo que haría Coriolis en el norte).
const NF = I_FLECHA - I_GRIFO;
const AX = new Float32Array(NF);
const AY = new Float32Array(NF);
const AS = new Float32Array(NF); // posición a lo largo (0 cola, 1 punta)
{
  // astil: arco suave; punta: dos trazos en «V» (se leen mejor que un triángulo a este tamaño)
  const ra = 0.15;
  const a0 = -0.6;
  const a1 = 0.5;
  const nAstil = 120;
  const BR = 0.068; // largo de cada trazo de la punta
  const AB = 0.68; // apertura de la «V» respecto al astil
  const tx = -Math.sin(a1);
  const ty = Math.cos(a1);
  const px = ra * Math.cos(a1) + tx * 0.012; // la punta asoma un poco más allá del astil
  const py = ra * Math.sin(a1) + ty * 0.012;
  for (let j = 0; j < NF; j++) {
    const g = (rnd() - 0.5) * 0.013;
    if (j < nAstil) {
      const s = rnd();
      const a = a0 + (a1 - a0) * s;
      AX[j] = (ra + g) * Math.cos(a);
      AY[j] = (ra + g) * Math.sin(a);
      AS[j] = s * 0.8;
    } else {
      const lado = j % 2 ? 1 : -1;
      const s = rnd();
      const ang = Math.atan2(-ty, -tx) + lado * AB;
      const dx = Math.cos(ang);
      const dy = Math.sin(ang);
      // grano lateral más fino que en el astil: la «V» sigue nítida bajo la lupa
      AX[j] = px + dx * BR * s - dy * g * 0.5;
      AY[j] = py + dy * BR * s + dx * g * 0.5;
      AS[j] = 1 - 0.2 * s;
    }
  }
  let mx = Infinity;
  let Mx = -Infinity;
  let my = Infinity;
  let My = -Infinity;
  for (let j = 0; j < NF; j++) {
    mx = Math.min(mx, AX[j]);
    Mx = Math.max(Mx, AX[j]);
    my = Math.min(my, AY[j]);
    My = Math.max(My, AY[j]);
  }
  for (let j = 0; j < NF; j++) {
    AX[j] -= 0.5 * (mx + Mx);
    AY[j] -= 0.5 * (my + My);
  }
}

// --- agua ------------------------------------------------------------------------
const NW = N - I_AGUA;
const WX = new Float32Array(NW);
const WY = new Float32Array(NW);
const WRHO = new Float32Array(NW); // radio elíptico normalizado (0 desagüe, 1 borde)
const TD = new Float32Array(NW); // instante en que el agua se retira de esa partícula
// Vaciado: el borde del agua se retira de W=1 a W_FIN entre T_V0 y T_V1.
const T_V0 = 4.5;
const T_V1 = 7.2;
const W_FIN = 0.27;
const nivel = (ts) => 1 - (1 - W_FIN) * suave((ts - T_V0) / (T_V1 - T_V0));
// Reparto casi uniforme (rejilla hexagonal con algo de desorden) para que la lámina se vea continua.
{
  const h = 0.0238;
  const cand = [];
  for (let fy = 0, y = INT_CY - AG_B; y < INT_CY + AG_B; y += h * 0.866, fy++) {
    for (let x = -AG_A + (fy % 2) * 0.5 * h; x < AG_A; x += h) {
      const px = x + (rnd() - 0.5) * 0.45 * h;
      const py = y + (rnd() - 0.5) * 0.45 * h;
      const e = (px / AG_A) ** 2 + ((py - INT_CY) / AG_B) ** 2;
      if (e < 1 && Math.hypot(px - DES_X, py - DES_Y) > HUECO) cand.push(px, py);
    }
  }
  // barajado determinista; si sobran se descartan, si faltan se completan al azar
  const nc = cand.length / 2;
  for (let k = nc - 1; k > 0; k--) {
    const r = Math.floor(rnd() * (k + 1));
    let tmp = cand[2 * k];
    cand[2 * k] = cand[2 * r];
    cand[2 * r] = tmp;
    tmp = cand[2 * k + 1];
    cand[2 * k + 1] = cand[2 * r + 1];
    cand[2 * r + 1] = tmp;
  }
  for (let j = 0; j < NW; ) {
    let x;
    let y;
    if (j < nc) {
      x = cand[2 * j];
      y = cand[2 * j + 1];
    } else {
      x = (2 * rnd() - 1) * AG_A;
      y = INT_CY + (2 * rnd() - 1) * AG_B;
      if ((x / AG_A) ** 2 + ((y - INT_CY) / AG_B) ** 2 >= 1 || Math.hypot(x - DES_X, y - DES_Y) < HUECO) continue;
    }
    WX[j] = x;
    WY[j] = y;
    const rho = Math.sqrt((x / AG_A) ** 2 + ((y - INT_CY) / AG_B) ** 2);
    WRHO[j] = rho;
    if (rho <= W_FIN) TD[j] = 1e9;
    else {
      let a = 0;
      let b = 1;
      for (let k = 0; k < 30; k++) {
        const m = 0.5 * (a + b);
        if (1 - (1 - W_FIN) * suave(m) > rho) a = m;
        else b = m;
      }
      TD[j] = T_V0 + (T_V1 - T_V0) * 0.5 * (a + b);
    }
    j++;
  }
}

// Parte del agua forma la lupa entre ts 2 y 5: aro, mango y un destello en el cristal.
const LUPA = 7; // una de cada 7 partículas de agua
const NL = Math.floor((NW - 3) / LUPA) + 1;
const N_ARO = 380;
const N_MANGO = 220;
const LX = new Float32Array(NL);
const LY = new Float32Array(NL);
const LR = new Float32Array(NL);
const LG = new Float32Array(NL);
const LB = new Float32Array(NL);
const LT = new Float32Array(NL);
const T_IN = new Float32Array(NL);
const T_OUT = new Float32Array(NL);
for (let l = 0; l < NL; l++) {
  if (l < N_ARO) {
    const s = l / N_ARO;
    const a = MANGO_A + TAU * s + 0.004 * rnd();
    const borde = rnd() < 0.3;
    const r = borde ? LU_R - 0.012 + (rnd() - 0.5) * 0.004 : LU_R + (rnd() - 0.5) * 0.026;
    LX[l] = LU_X + r * Math.cos(a);
    LY[l] = LU_Y + r * Math.sin(a);
    const k = borde ? 1.25 : 0.95;
    LR[l] = 0.9 * k;
    LG[l] = 0.95 * k;
    LB[l] = 1.0 * k;
    LT[l] = borde ? 0.022 : 0.03;
    T_IN[l] = 1.95 + 0.5 * s;
    T_OUT[l] = 5.0 + 0.35 * (1 - s);
  } else if (l < N_ARO + N_MANGO) {
    const s = rnd();
    const ancho = s < 0.12 ? 0.045 : 0.078;
    const d = LU_R + 0.02 + MANGO_L * s;
    const w = (rnd() - 0.5) * ancho;
    const filo = Math.abs(w) > 0.4 * ancho;
    LX[l] = LU_X + d * Math.cos(MANGO_A) - w * Math.sin(MANGO_A);
    LY[l] = LU_Y + d * Math.sin(MANGO_A) + w * Math.cos(MANGO_A);
    const k = filo ? 1.1 : 0.7;
    LR[l] = 0.62 * k;
    LG[l] = 0.78 * k;
    LB[l] = 1.0 * k;
    LT[l] = 0.034;
    T_IN[l] = 2.45 + 0.35 * s;
    T_OUT[l] = 4.95 + 0.2 * (1 - s);
  } else {
    const s = rnd();
    const a = 1.95 + 0.85 * s;
    const r = 0.74 * LU_R + (rnd() - 0.5) * 0.02;
    LX[l] = LU_X + r * Math.cos(a);
    LY[l] = LU_Y + r * Math.sin(a);
    const k = 1.1 * Math.sin(Math.PI * s);
    LR[l] = 0.95 * k;
    LG[l] = 0.97 * k;
    LB[l] = 1.0 * k;
    LT[l] = 0.026;
    T_IN[l] = 2.7 + 0.2 * s;
    T_OUT[l] = 4.95;
  }
}

// --- coreografía -------------------------------------------------------------------
let ultimo = NaN;
let W = 1; // nivel del agua (radio elíptico de su borde)
let VAC = 0; // 0 → 1 al empezar el vaciado
let LUP = 0; // presencia de la lupa (0 → 1 → 0)
let M = 1; // aumento de la lupa sobre el agua
let MA = 1; // aumento de la flecha
let RESALTE = 0; // la flecha se ilumina un momento al nombrar a Coriolis
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  W = nivel(ts);
  VAC = suave((ts - T_V0) / 0.6);
  LUP = suave((ts - 2.25) / 0.7) - suave((ts - 4.95) / 0.55);
  M = 1 + (M_MAX - 1) * LUP;
  MA = 1 + (MA_MAX - 1) * LUP;
  RESALTE = Math.exp(-(((ts - 1.85) / 0.45) ** 2));
}

// Lupa: «ojo de pez» dentro del círculo (aumento M en el centro, 1 en el aro).
let lupaEsc = 1;
function lupa(x, y) {
  lupaEsc = 1;
  if (M <= 1.0001) return;
  const dx = x - LU_X;
  const dy = y - LU_Y;
  const d2 = dx * dx + dy * dy;
  if (d2 >= LU_R * LU_R) return;
  const xn = Math.sqrt(d2) / LU_R;
  const xs = xn * Math.sqrt(xn);
  const den = 1 + (M - 1) * xs;
  const k = M / den;
  PT[0] = LU_X + dx * k;
  PT[1] = LU_Y + dy * k;
  lupaEsc = Math.sqrt(Math.max(0.05, (M * (1 - 0.5 * (M - 1) * xs)) / (den * den)) * k);
}

export function estatico(i, t, p, c) {
  const tw = 1 + FK[i] * Math.sin(t * 1.6 + FASE[i]);
  p[0] = FX[i];
  p[1] = FY[i];
  p[2] = FZ[i];
  c[0] = FR[i] * tw;
  c[1] = FG[i] * tw;
  c[2] = FB[i] * tw;
  return FT[i];
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  if (i < I_GRIFO) return estatico(i, t, p, c);

  if (i < I_FLECHA) {
    // la flecha de Coriolis: diminuta; la lupa la amplía un poco (escala uniforme)
    const j = i - I_GRIFO;
    p[0] = LU_X + AX[j] * MA;
    p[1] = LU_Y + AY[j] * MA;
    p[2] = 0.03;
    const ola = 0.5 + 0.5 * Math.sin(TAU * (AS[j] * 1.2 - t * 0.9));
    const k = (0.72 + 0.3 * ola * ola) * (1 + 0.7 * RESALTE);
    c[0] = 1.0 * k;
    c[1] = 0.8 * k;
    c[2] = 0.16 * k;
    return 0.019 * Math.pow(MA, 0.85);
  }

  // agua
  const j = i - I_AGUA;
  const x0 = WX[j];
  const y0 = WY[j];
  const rho = WRHO[j];
  // ondulación suave: dos trenes de ondas que se cruzan (+ ondas hacia el desagüe al vaciarse)
  const o1 = Math.sin(5.3 * x0 + 3.1 * y0 - 1.15 * t);
  const o2 = Math.sin(4.1 * y0 - 2.6 * x0 + 0.85 * t + 1.3);
  let rip = 0.65 * o1 * o2 + 0.35 * Math.sin(8.2 * x0 - 6.4 * y0 + 1.6 * t);
  if (VAC > 0) rip = rip * (1 - 0.4 * VAC) + 0.5 * VAC * Math.sin(24 * rho + 6.5 * ts);
  let x = x0 + 0.007 * o1;
  let y = y0 + 0.007 * o2;
  // brillo especular (reflejo de la luz arriba a la izquierda)
  const ex = (x0 + 0.4) * 0.82 + (y0 - INT_CY - 0.32) * 0.57;
  const ey = -(x0 + 0.4) * 0.57 + (y0 - INT_CY - 0.32) * 0.82;
  const reflejo = Math.exp(-(ex * ex) / 0.07 - (ey * ey) / 0.004) * (0.7 + 0.3 * o1) * 0.45;
  // poco fondo junto al borde (más cian), más hondo hacia el desagüe (azul intenso)
  const somero = rho * rho * rho;
  const destello = j % 4 === 0;
  let cr;
  let cg;
  let cb;
  let tam;
  if (destello) {
    const kb = (0.5 + 0.5 * rip) * (0.75 + 0.35 * Math.sin(t * 2.3 + FASE[i]));
    cr = (0.3 + 0.2 * somero) * kb;
    cg = (0.62 + 0.2 * somero) * kb;
    cb = 1.15 * kb;
    tam = 0.028;
  } else {
    const kb = 0.6 + 0.38 * rip;
    cr = (0.08 + 0.12 * somero) * kb;
    cg = (0.27 + 0.26 * somero) * kb;
    cb = 0.85 * kb;
    tam = 0.07;
  }
  cr += 0.8 * reflejo;
  cg += 0.88 * reflejo;
  cb += 0.95 * reflejo;
  // línea de agua (menisco) cuando el nivel baja
  const ml = (W - rho) / 0.05;
  if (ml < 1 && ml > -0.0001) {
    const b = VAC * (1 - ml) * (1 - ml);
    cr += 0.55 * b;
    cg += 0.9 * b;
    cb += 0.85 * b;
  }
  // ya sin agua: queda la loza, apenas visible; una de cada cinco gotas corre recta al desagüe
  const a = ts - TD[j];
  if (a > 0) {
    if (j % 5 === 2) {
      const m = Math.min(1, a / 0.65);
      const g = m * m;
      x += (DES_X - x) * g;
      y += (DES_Y - y) * g;
      const f = (1 - m) * Math.min(1, a / 0.1);
      cr = 0.22 * f;
      cg = 0.5 * f;
      cb = 1.0 * f;
      tam = 0.024 * (1 - 0.6 * g);
    } else {
      const m = suave(a / 0.4);
      const seca = 0.035 + 0.05 * rho * rho;
      cr += (0.6 * seca - cr) * m;
      cg += (0.75 * seca - cg) * m;
      cb += (1.0 * seca - cb) * m;
      tam += (0.03 - tam) * m;
    }
  }
  lupa(x, y);
  if (lupaEsc !== 1) {
    x = PT[0];
    y = PT[1];
    tam *= lupaEsc;
    const vidrio = 1 - 0.4 * LUP;
    cr *= vidrio;
    cg *= vidrio;
    cb *= vidrio;
  }
  // partículas que se van a formar la lupa
  if (j >= 3 && (j - 3) % LUPA === 0) {
    const l = (j - 3) / LUPA;
    if (l < NL) {
      const q = suave((ts - T_IN[l]) / 0.5) * (1 - suave((ts - T_OUT[l]) / 0.5));
      if (q > 0) {
        const tw = 1 + 0.08 * Math.sin(t * 2.1 + FASE[i]);
        p[0] = x + (LX[l] - x) * q;
        p[1] = y + (LY[l] - y) * q;
        p[2] = 0.08 * q + 0.3 * Math.sin(Math.PI * q);
        c[0] = cr + (LR[l] * tw - cr) * q;
        c[1] = cg + (LG[l] * tw - cg) * q;
        c[2] = cb + (LB[l] * tw - cb) * q;
        return tam + (LT[l] - tam) * q;
      }
    }
  }
  p[0] = x;
  p[1] = y;
  p[2] = -0.02;
  c[0] = cr;
  c[1] = cg;
  c[2] = cb;
  return tam;
}
