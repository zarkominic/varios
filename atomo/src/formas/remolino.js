// Escena 6: «Gana el giro que ya traía el agua. En el inodoro, el diseño de la taza.»
// (EN: «So the spin the water already had wins. Toilets? Angled rim jets.»)
// Toda la coreografía va anclada a las marcas de la voz (marca(); por defecto, las del español):
//  · «giro»: el mismo lavabo de la escena 5, visto desde arriba, con un remolino potente:
//    brazos en espiral de agua azul-blanca que giran en sentido HORARIO hacia el desagüe.
//  · «inodoro»: el contorno se transforma en un INODORO visto desde arriba: cisterna rectangular
//    arriba (con su pulsador), bisagras, aro del asiento ovalado y alargado y, dentro, la taza
//    con el mismo remolino, ya más pequeño.
//  · «diseño»: bajo el borde de la taza se encienden los chorros inclinados: trazos brillantes,
//    casi tangentes, que salen todos en sentido horario y alimentan el giro.
import { N, TAU, S1, S2, S3, marca } from './base.js';
import {
  suave,
  estatico,
  FX,
  FY,
  FASE,
  CY,
  EXT_A,
  EXT_B,
  INT_A,
  INT_B,
  INT_CY,
  I_BORDE,
  I_DESAGUE,
  I_GRIFO,
  I_FLECHA,
  I_AGUA,
  DES_X,
  DES_Y,
  AG_A,
  AG_B,
} from './lavabo.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

let semilla = 9917;
function rnd() {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
}

// --- el inodoro (visto desde arriba) --------------------------------------------------
// Aro del asiento: óvalo alargado, algo más ancho detrás (arriba) que delante.
const AS_YC = 0.6;
const AS_A = 0.76;
const AS_BT = 0.93; // semieje hacia atrás (arriba)
const AS_BF = 1.0; // semieje hacia delante (abajo)
const AS_E = 0.1; // ensanchamiento trasero
// Abertura del asiento (borde de la taza).
const AB_YC = 0.55;
const AB_A = 0.47;
const AB_BT = 0.6;
const AB_BF = 0.68;
const AB_E = 0.06;
// Cisterna: rectángulo redondeado detrás del asiento, con su pulsador doble.
const CI_Y = 1.86;
const CI_W = 0.72; // semiancho
const CI_H = 0.19; // semialto
const CI_R = 0.08; // radio de las esquinas
const PU_R = 0.075; // pulsador
// Remolino dentro de la taza.
const TZ_X = 0;
const TZ_Y = 0.53;
const TZ_A = 0.41;
const TZ_B = 0.57;
const TZ_OJO = 0.105;
const TZ_DES = 0.75; // escala del desagüe

const Q = new Float64Array(2);
function asiento(fi) {
  const s = Math.sin(fi);
  Q[0] = AS_A * Math.cos(fi) * (1 + AS_E * s);
  Q[1] = AS_YC + (s > 0 ? AS_BT : AS_BF) * s;
}
function abertura(fi) {
  const s = Math.sin(fi);
  Q[0] = AB_A * Math.cos(fi) * (1 + AB_E * s);
  Q[1] = AB_YC + (s > 0 ? AB_BT : AB_BF) * s;
}
// Rectángulo redondeado recorrido por longitud de arco (u en [0, 1)).
function rectRedondeado(u, cx, cy, hw, hh, r) {
  const lx = 2 * (hw - r);
  const ly = 2 * (hh - r);
  const arco = (Math.PI / 2) * r;
  const tramos = [lx, arco, ly, arco, lx, arco, ly, arco];
  let L = 0;
  for (let k = 0; k < 8; k++) L += tramos[k];
  let d = (u - Math.floor(u)) * L;
  let k = 0;
  while (k < 7 && d > tramos[k]) d -= tramos[k++];
  const f = d / (tramos[k] || 1);
  const ax = hw - r;
  const ay = hh - r;
  // empieza abajo a la izquierda y va en sentido antihorario
  switch (k) {
    case 0: Q[0] = -ax + lx * f; Q[1] = -hh; break;
    case 1: Q[0] = ax + r * Math.sin(f * Math.PI / 2); Q[1] = -ay - r * Math.cos(f * Math.PI / 2); break;
    case 2: Q[0] = hw; Q[1] = -ay + ly * f; break;
    case 3: Q[0] = ax + r * Math.cos(f * Math.PI / 2); Q[1] = ay + r * Math.sin(f * Math.PI / 2); break;
    case 4: Q[0] = ax - lx * f; Q[1] = hh; break;
    case 5: Q[0] = -ax - r * Math.sin(f * Math.PI / 2); Q[1] = ay + r * Math.cos(f * Math.PI / 2); break;
    case 6: Q[0] = -hw; Q[1] = ay - ly * f; break;
    default: Q[0] = -ax - r * Math.cos(f * Math.PI / 2); Q[1] = -ay - r * Math.sin(f * Math.PI / 2);
  }
  Q[0] += cx;
  Q[1] += cy;
}
// luz que llega de arriba a la izquierda (como en el lavabo)
const LUZX = -0.7071;
const LUZY = 0.7071;

// --- reparto de partículas ---------------------------------------------------------
// [0, I_BORDE): borde del lavabo → aro del asiento (el reparto interno es el de lavabo.js)
const N_EXT = 560; // contorno exterior → borde exterior del asiento
const N_INT = 640; // contorno interior → borde de la taza
const N_REP = 110; // repisa → superficie del asiento
// [I_BORDE, I_DESAGUE): desagüe → desagüe de la taza
// [I_DESAGUE, I_GRIFO): grifo → cisterna y pulsador
// [I_GRIFO, I_FLECHA): ojo del remolino
// agua (j = i − I_AGUA):
const NW = N - I_AGUA;
const W_CHORRO = 1300; // [0, W_CHORRO): agua del lavabo → chorros del borde
const W_BRAZOS = W_CHORRO + 2130; // brazos del remolino (en estelas de 3)
const W_FONDO = W_BRAZOS + 600; // agua de fondo que gira con los brazos
// [W_FONDO, NW): agua del lavabo → tapa de la cisterna, bisagras y superficie del asiento
if (NW - W_FONDO !== 620) throw new Error('remolino: reparto de partículas incorrecto');
{
  // comprobación barata de que el reparto del borde sigue siendo el de lavabo.js
  let fuera = 0;
  for (let i = 0; i < N_EXT; i++) {
    const e = Math.abs(FX[i] / EXT_A) ** 2.6 + Math.abs((FY[i] - CY) / EXT_B) ** 2.6;
    if (Math.abs(e - 1) > 0.05) fuera++;
  }
  for (let i = N_EXT; i < N_EXT + N_INT; i++) {
    const e = (FX[i] / INT_A) ** 2 + ((FY[i] - INT_CY) / INT_B) ** 2;
    if (Math.abs(e - 1) > 0.05) fuera++;
  }
  if (fuera > 20) console.warn(`remolino: el reparto del borde de lavabo.js ha cambiado (${fuera} partículas fuera de sitio)`);
}

// Destino «inodoro» de las partículas que forman piezas fijas.
const TX = new Float32Array(N);
const TY = new Float32Array(N);
const TR = new Float32Array(N);
const TG = new Float32Array(N);
const TB = new Float32Array(N);
const TT = new Float32Array(N);
const TD = new Float32Array(N); // retraso de cada partícula en la transformación
function pieza(i, x, y, r, g, b, k, tam) {
  TX[i] = x;
  TY[i] = y;
  TR[i] = r * k;
  TG[i] = g * k;
  TB[i] = b * k;
  TT[i] = tam;
}
{
  // borde exterior del lavabo → borde exterior del asiento (mismo ángulo)
  for (let i = 0; i < N_EXT; i++) {
    const fi = Math.atan2((FY[i] - CY) / EXT_B, FX[i] / EXT_A);
    asiento(fi);
    const d = (S2[i] - 0.5) * 0.014;
    const luz = Math.cos(fi) * LUZX + Math.sin(fi) * LUZY;
    pieza(i, Q[0] + Math.cos(fi) * d, Q[1] + Math.sin(fi) * d, 0.74, 0.88, 1.0, 1.25 + 0.3 * luz, 0.034);
  }
  // borde interior → borde de la taza (el filo más brillante)
  for (let i = N_EXT; i < N_EXT + N_INT; i++) {
    const fi = Math.atan2((FY[i] - INT_CY) / INT_B, FX[i] / INT_A);
    abertura(fi);
    const d = (S2[i] - 0.5) * 0.012;
    const luz = -(Math.cos(fi) * LUZX + Math.sin(fi) * LUZY);
    pieza(i, Q[0] + Math.cos(fi) * d, Q[1] + Math.sin(fi) * d, 0.88, 0.95, 1.0, 1.3 + 0.4 * luz, 0.034);
  }
  // repisa → superficie del asiento (tenue)
  for (let i = N_EXT + N_INT; i < N_EXT + N_INT + N_REP; i++) {
    const fi = TAU * S1[i];
    const f = 0.15 + 0.7 * S3[i];
    asiento(fi);
    const ox = Q[0];
    const oy = Q[1];
    abertura(fi);
    const luz = Math.cos(fi) * LUZX + Math.sin(fi) * LUZY;
    pieza(i, Q[0] + (ox - Q[0]) * f, Q[1] + (oy - Q[1]) * f, 0.7, 0.84, 1.0, 0.22 + 0.08 * luz, 0.05);
  }
  // pared de la cuenca → pared de la taza (degradado justo por dentro del borde)
  for (let i = N_EXT + N_INT + N_REP; i < I_BORDE; i++) {
    const fi = TAU * S1[i];
    const s = Math.pow(S2[i], 1.4);
    abertura(fi);
    const rr = 0.99 - 0.08 * s;
    const luz = -(Math.cos(fi) * LUZX + Math.sin(fi) * LUZY);
    pieza(i, Q[0] * rr, AB_YC + (Q[1] - AB_YC) * rr, 0.55, 0.78, 1.0, (0.5 + 0.2 * luz) * (1 - s), 0.055);
  }
  // desagüe: el mismo, más pequeño, en el centro de la taza
  for (let i = I_BORDE; i < I_DESAGUE; i++) {
    TX[i] = TZ_X + (FX[i] - DES_X) * TZ_DES;
    TY[i] = TZ_Y + (FY[i] - DES_Y) * TZ_DES;
    TR[i] = 0;
    TG[i] = 0;
    TB[i] = 0;
    TT[i] = -1; // conserva el color y el tamaño del lavabo
  }
  // grifo → cisterna (contorno) y pulsador doble
  const nCont = 300;
  for (let j = 0; j < I_GRIFO - I_DESAGUE; j++) {
    const i = I_DESAGUE + j;
    if (j < nCont) {
      rectRedondeado((j + 0.6 * rnd()) / nCont, 0, CI_Y, CI_W, CI_H, CI_R);
      const nx = Math.abs(Q[0]) > CI_W - CI_R ? Math.sign(Q[0]) : 0;
      const ny = Math.abs(Q[1] - CI_Y) > CI_H - CI_R ? Math.sign(Q[1] - CI_Y) : 0;
      const luz = nx * LUZX + ny * LUZY;
      const d = (rnd() - 0.5) * 0.014;
      pieza(i, Q[0] + nx * d, Q[1] + ny * d, 0.76, 0.9, 1.0, 1.3 + 0.3 * luz, 0.034);
    } else if (j < nCont + 80) {
      // aro del pulsador
      const a = (TAU * (j - nCont + rnd())) / 80;
      const r = PU_R + (rnd() - 0.5) * 0.01;
      const brillo = Math.pow(Math.max(0, Math.cos(a - 2.36)), 2);
      pieza(i, r * Math.cos(a), CI_Y + r * Math.sin(a), 0.82, 0.92, 1.0, 0.95 + 0.6 * brillo, 0.026);
    } else {
      // división del pulsador doble (vertical, algo descentrada) y brillo de la tecla
      const s = rnd();
      if (s < 0.6) pieza(i, 0.012 + (rnd() - 0.5) * 0.006, CI_Y + (rnd() * 2 - 1) * PU_R * 0.92, 0.82, 0.92, 1.0, 0.9, 0.022);
      else pieza(i, -0.032 + (rnd() - 0.5) * 0.03, CI_Y + 0.02 + (rnd() - 0.5) * 0.06, 0.82, 0.92, 1.0, 0.55, 0.026);
    }
  }
  // agua sobrante del lavabo → tapa de la cisterna, bisagras y superficie del asiento
  const nTapa = 190;
  const nCara = 120;
  const nBis = 100;
  for (let j = W_FONDO; j < NW; j++) {
    const i = I_AGUA + j;
    const k = j - W_FONDO;
    if (k < nTapa) {
      // borde de la tapa: un rectángulo redondeado algo más pequeño
      rectRedondeado((k + 0.6 * rnd()) / nTapa, 0, CI_Y, CI_W - 0.065, CI_H - 0.055, CI_R * 0.6);
      pieza(i, Q[0] + (rnd() - 0.5) * 0.008, Q[1] + (rnd() - 0.5) * 0.008, 0.72, 0.86, 1.0, 0.48, 0.03);
    } else if (k < nTapa + nCara) {
      // cara superior de la tapa: brillo suave arriba a la izquierda
      let x = (rnd() * 2 - 1) * (CI_W - 0.08);
      const y = CI_Y + (rnd() * 2 - 1) * (CI_H - 0.07);
      if (Math.hypot(x, y - CI_Y) < PU_R + 0.03) x += x < 0 ? -0.14 : 0.14; // deja libre el pulsador
      const luz = Math.exp(-(((x + 0.35) / 0.35) ** 2) - (((y - CI_Y - 0.06) / 0.12) ** 2));
      pieza(i, x, y, 0.72, 0.86, 1.0, 0.1 + 0.3 * luz, 0.05);
    } else if (k < nTapa + nCara + nBis) {
      // bisagras: dos pequeñas cápsulas entre el asiento y la cisterna
      const lado = k % 2 ? 1 : -1;
      const u = rnd();
      const ang = TAU * u;
      const rx = 0.075;
      const ry = 0.04;
      const r = 0.85 + 0.15 * rnd();
      pieza(i, lado * 0.31 + rx * r * Math.cos(ang), 1.6 + ry * r * Math.sin(ang), 0.8, 0.9, 1.0, 0.85, 0.028);
    } else {
      // superficie del asiento (tenue, con la luz arriba a la izquierda)
      const fi = TAU * rnd();
      const f = 0.12 + 0.76 * rnd();
      asiento(fi);
      const ox = Q[0];
      const oy = Q[1];
      abertura(fi);
      const luz = Math.cos(fi) * LUZX + Math.sin(fi) * LUZY;
      pieza(i, Q[0] + (ox - Q[0]) * f, Q[1] + (oy - Q[1]) * f, 0.7, 0.84, 1.0, 0.2 + 0.1 * luz, 0.05);
    }
  }
  // retraso: la transformación baja como una ola desde la cisterna hasta la punta del asiento;
  // como varía poco entre vecinas, los contornos se deforman sin romperse
  for (let i = 0; i < N; i++) TD[i] = i < I_DESAGUE || i >= I_GRIFO ? 0.16 * Math.min(1, Math.max(0, (2.1 - TY[i]) / 2.5)) : 0;
}

// --- el remolino ---------------------------------------------------------------------
// Flujo de sumidero + vórtice libre: q = ρ² baja a ritmo constante (el agua se acelera
// hacia el centro) y el ángulo sigue una espiral logarítmica θ = θ0 + C·ln q, que con
// C > 0 avanza en sentido horario al acercarse al desagüe. Todo el dibujo gira, además,
// despacio en sentido horario (−WP). La geometría (centro, semiejes y ojo) pasa del lavabo
// a la taza del inodoro.
const RHO_MIN = 0.135;
const Q0 = RHO_MIN * RHO_MIN;
const C_ESP = 0.95;
const WP = 0.55;
const V_BRAZO = 0.34; // vueltas del ciclo de q por segundo
const V_FONDO = 0.22;
const NB = 3; // brazos
const DL = 0.03; // retardo entre las partículas de cada estela

let VX = DES_X;
let VY = DES_Y;
let VA = AG_A;
let VB = AG_B;
let VE = RHO_MIN * AG_A;
function posVortice(q, th, p) {
  const rho = Math.sqrt(q);
  const f = (rho - RHO_MIN) / (1 - RHO_MIN);
  const u = 1 - rho;
  const ry = VB + (VA - VB) * u * u; // cerca del centro el remolino es redondo
  p[0] = VX + (VE + f * (VA - VE)) * Math.cos(th);
  p[1] = VY + (VE + f * (ry - VE)) * Math.sin(th);
  return rho;
}

const TH = new Float32Array(NW);
const PH = new Float32Array(NW);
const G = new Float32Array(NW);
for (let j = 0; j < NW; j++) {
  if (j >= W_CHORRO && j < W_BRAZOS) {
    const cabeza = j - ((j - W_CHORRO) % 3); // las 3 partículas de una estela comparten semilla
    if ((j - W_CHORRO) % 3 === 0) {
      const k = Math.floor(rnd() * NB);
      TH[j] = (TAU * k) / NB + 0.4;
      PH[j] = rnd();
      G[j] = (rnd() + rnd() + rnd() + rnd() - 2) / 2;
    } else {
      TH[j] = TH[cabeza];
      PH[j] = PH[cabeza];
      G[j] = G[cabeza];
    }
  } else {
    TH[j] = TAU * rnd();
    PH[j] = rnd();
    G[j] = rnd();
  }
}

// Ojo del remolino: un anillo blanco continuo sobre el que barren en sentido horario
// K arcos brillantes con cola, como cometas.
const NO = I_FLECHA - I_GRIFO;
const K_OJO = 3;
const OR = new Float32Array(NO);
const OT = new Float32Array(NO);
const OW = new Float32Array(NO);
const OF = new Float32Array(NO);
const OK = new Float32Array(NO);
for (let j = 0; j < NO; j++) {
  const r = 0.148 + 0.065 * Math.pow(S1[I_GRIFO + j], 1.8);
  OR[j] = r;
  OT[j] = (TAU * (j + 0.85 * S2[I_GRIFO + j])) / NO;
  OW[j] = 1.0 * (0.15 / r) ** 2;
  OF[j] = 3.2 - 3 * (r - 0.15);
  OK[j] = 1.35 - 4 * (r - 0.15);
}

// --- chorros del borde de la taza ----------------------------------------------------
// Salen de orificios bajo el borde, casi tangentes y todos en sentido horario, inclinados
// hacia dentro: el agua entra girando y alimenta el remolino.
const NJ = 10;
const L_CHORRO = 0.29;
const BETA = 0.62; // inclinación hacia dentro respecto a la tangente
const CURVA = 0.05; // el chorro se curva hacia dentro, siguiendo el giro
const V_CHORRO = 2.3; // ciclos por segundo del agua a lo largo del chorro
const JX = new Float32Array(NJ);
const JY = new Float32Array(NJ);
const JDX = new Float32Array(NJ);
const JDY = new Float32Array(NJ);
for (let k = 0; k < NJ; k++) {
  const psi = Math.PI / 2 - 0.3 - (k * TAU) / NJ;
  abertura(psi + 0.002);
  const ax = Q[0];
  const ay = Q[1];
  abertura(psi);
  let tx = Q[0] - ax; // sentido horario (ángulo decreciente)
  let ty = Q[1] - ay;
  const L = Math.hypot(tx, ty);
  tx /= L;
  ty /= L;
  const nx = ty; // normal hacia dentro (a la derecha de la marcha horaria)
  const ny = -tx;
  JX[k] = Q[0] + nx * 0.02;
  JY[k] = Q[1] + ny * 0.02;
  JDX[k] = Math.cos(BETA) * tx + Math.sin(BETA) * nx;
  JDY[k] = Math.cos(BETA) * ty + Math.sin(BETA) * ny;
}

// --- coreografía -------------------------------------------------------------------
let ultimo = NaN;
let T_INO = 2.53; // empieza la transformación en inodoro
let MORF = 0; // geometría del remolino: 0 lavabo, 1 taza
let T_DIS = 3.57; // se encienden los chorros
let ALIMENTA = 0; // los chorros ya alimentan la espiral
let EXTRA = 0; // giro extra acumulado desde que llegan los chorros
let GIRO = 0; // realce del remolino al decir «giro»
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  const mGiro = marca('giro', 0.71);
  T_INO = marca('inodoro', 2.83) - 0.36;
  T_DIS = marca('diseno', 3.57);
  MORF = suave((ts - T_INO - 0.02) / 0.52);
  VX = DES_X + (TZ_X - DES_X) * MORF;
  VY = DES_Y + (TZ_Y - DES_Y) * MORF;
  VA = AG_A + (TZ_A - AG_A) * MORF;
  VB = AG_B + (TZ_B - AG_B) * MORF;
  VE = RHO_MIN * AG_A + (TZ_OJO - RHO_MIN * AG_A) * MORF;
  ALIMENTA = suave((ts - T_DIS - 0.1) / 0.6);
  // integral de ALIMENTA (para acelerar el giro sin saltos)
  const x = (ts - T_DIS - 0.1) / 0.6;
  EXTRA = x <= 0 ? 0 : x >= 1 ? 0.6 * (x - 0.5) : 0.6 * (x * x * x - 0.5 * x * x * x * x);
  const g = (ts - mGiro - 0.35) / 0.7;
  GIRO = Math.exp(-g * g);
}

// Pieza fija: del lavabo (estatico) a su destino en el inodoro.
function fija(i, t, p, c, ts) {
  const tam = estatico(i, t, p, c);
  const m = suave((ts - T_INO - TD[i]) / 0.46);
  if (m <= 0) return tam;
  if (TT[i] < 0) {
    // desagüe: solo cambia de sitio
    p[0] += (TX[i] - p[0]) * m;
    p[1] += (TY[i] - p[1]) * m;
    return tam * (1 - 0.15 * m);
  }
  const tw = 1 + 0.06 * Math.sin(t * 1.6 + FASE[i]);
  p[0] += (TX[i] - p[0]) * m;
  p[1] += (TY[i] - p[1]) * m;
  p[2] = p[2] * (1 - m) + 0.05 * Math.sin(Math.PI * m);
  c[0] += (TR[i] * tw - c[0]) * m;
  c[1] += (TG[i] * tw - c[1]) * m;
  c[2] += (TB[i] * tw - c[2]) * m;
  return tam + (TT[i] - tam) * m;
}

// Agua de fondo del remolino (también la que luego será chorro o pieza del inodoro).
function fondo(i, j, t, p, c) {
  let f = (PH[j] - V_FONDO * t - 0.5 * EXTRA) % 1;
  if (f < 0) f += 1;
  const q = Q0 + (1 - Q0) * f;
  const th = TH[j] + C_ESP * Math.log(q) - WP * t - 1.2 * EXTRA;
  const rho = posVortice(q, th, p);
  p[2] = -0.02;
  const cerca = 0.5 + 0.5 * Math.cos(NB * (TH[j] - 0.4));
  const dentro = 1 - rho;
  const borde = Math.min(1, (1 - q) / 0.05) * Math.min(1, (rho - RHO_MIN) / 0.08);
  const somero = rho * rho * rho;
  const apretado = 1 - 0.3 * MORF; // en la taza, el agua está más junta
  if (j % 5 === 0) {
    // espuma: chispas que viajan con el giro
    const k = (0.45 + 0.6 * cerca + 0.5 * dentro) * borde * (0.8 + 0.3 * Math.sin(t * 2.7 + FASE[i])) * apretado;
    c[0] = 0.4 * k;
    c[1] = 0.7 * k;
    c[2] = 1.1 * k;
    return 0.026;
  }
  const k = (0.32 + 0.55 * cerca * cerca + 0.35 * dentro) * borde * apretado;
  c[0] = (0.08 + 0.12 * somero + 0.2 * dentro * dentro) * k;
  c[1] = (0.27 + 0.26 * somero + 0.25 * dentro * dentro) * k;
  c[2] = 0.85 * k;
  return 0.068 - 0.018 * MORF;
}

// Chorro: el agua corre del orificio (s = 0) hacia dentro (s = 1).
function chorro(i, j, t, p, c, ts) {
  const k = j % NJ;
  const w = S2[i] - 0.5;
  const orificio = S3[i] < 0.12;
  const s = orificio ? 0.03 * S1[i] : (S1[i] + V_CHORRO * ts) % 1;
  const dx = JDX[k];
  const dy = JDY[k];
  const ancho = w * (orificio ? 0.04 : 0.024 + 0.04 * s);
  const curva = CURVA * s * s;
  // normal hacia dentro respecto a la marcha del chorro
  const nx = dy;
  const ny = -dx;
  p[0] = JX[k] + dx * L_CHORRO * s + nx * (ancho + curva);
  p[1] = JY[k] + dy * L_CHORRO * s + ny * (ancho + curva);
  p[2] = 0.03;
  // el chorro sale disparado desde el orificio al decir «diseño»
  const frente = (ts - T_DIS + 0.08) / 0.24;
  const visible = frente <= 0 ? 0 : Math.min(1, (frente - s) / 0.12);
  if (visible <= 0) {
    c[0] = 0;
    c[1] = 0;
    c[2] = 0;
    return 0.03;
  }
  const destello = 1 + 0.3 * Math.exp(-(((ts - T_DIS - 0.25) / 0.3) ** 2));
  const cola = Math.min(1, (1 - s) / 0.2); // el final del chorro se deshace en el remolino
  const kb = (orificio ? 1.35 : (1.5 - 0.8 * s) * cola + 0.1) * visible * destello * (1 - 0.4 * Math.abs(w) * 2);
  c[0] = 0.6 * kb;
  c[1] = 0.95 * kb;
  c[2] = 1.08 * kb;
  return orificio ? 0.044 : 0.044 - 0.016 * s;
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  if (i < I_GRIFO) return fija(i, t, p, c, ts);

  if (i < I_FLECHA) {
    // ojo del remolino: cometas blancos barriendo el anillo en sentido horario
    const j = i - I_GRIFO;
    const esc = VE / (RHO_MIN * AG_A);
    const r = OR[j] * esc;
    const th = OT[j] - OW[j] * t;
    p[0] = VX + r * Math.cos(th);
    p[1] = VY + r * Math.sin(th);
    p[2] = 0.0;
    let x = ((th + OF[j] * ts) * K_OJO) / TAU;
    x -= Math.floor(x);
    const b = 0.1 + 1.7 * Math.max(Math.exp(-2.6 * x), suave((x - 0.97) / 0.03));
    const k = OK[j] * b;
    c[0] = 0.75 * k;
    c[1] = 0.92 * k;
    c[2] = 1.05 * k;
    return (0.02 + 0.008 * b) * (0.85 + 0.15 * esc);
  }

  const j = i - I_AGUA;
  if (j < W_CHORRO) {
    // agua del lavabo que, en el inodoro, será chorro
    const m = suave((ts - T_INO - TD[i]) / 0.46);
    if (m <= 0) return fondo(i, j, t, p, c);
    if (m >= 1) return chorro(i, j, t, p, c, ts);
    const tam = fondo(i, j, t, p, c);
    const x = p[0];
    const y = p[1];
    const r = c[0];
    const g = c[1];
    const b = c[2];
    chorro(i, j, t, p, c, ts);
    p[0] = x + (p[0] - x) * m;
    p[1] = y + (p[1] - y) * m;
    p[2] = -0.02 + 0.05 * m;
    c[0] = r * (1 - m) + c[0] * m;
    c[1] = g * (1 - m) + c[1] * m;
    c[2] = b * (1 - m) + c[2] * m;
    return tam;
  }
  if (j < W_BRAZOS) {
    // brazos del remolino, en estelas de 3
    const lag = (j - W_CHORRO) % 3;
    const tt = t - lag * DL;
    let f = (PH[j] - V_BRAZO * tt - EXTRA) % 1;
    if (f < 0) f += 1;
    const q = Q0 + (1 - Q0) * f;
    const rho = Math.sqrt(q);
    const anchoMundo = (0.03 + 0.2 * rho * rho) * (1 - 0.45 * MORF);
    const escala = VA / AG_A;
    const th = TH[j] + C_ESP * Math.log(q) - WP * tt - 2.2 * EXTRA + (G[j] * anchoMundo) / (rho * 0.95 * escala);
    posVortice(q, th, p);
    p[2] = 0.01;
    const dentro = 1 - rho;
    const blanco = Math.pow(dentro, 1.4);
    const borde = Math.min(1, (1 - q) / 0.1) * Math.min(1, (rho - RHO_MIN) / 0.06);
    const nucleo = 1 - 0.75 * G[j] * G[j];
    const realce = (1 + 0.25 * GIRO) * (1 - 0.3 * MORF) * (1 - 0.35 * ALIMENTA);
    const k = (0.55 + 1.2 * dentro) * borde * nucleo * (1 - 0.3 * lag) * realce;
    c[0] = (0.25 + 0.65 * blanco) * k;
    c[1] = (0.55 + 0.42 * blanco) * k;
    c[2] = 1.0 * k;
    return (0.036 + 0.014 * dentro) * (1 - 0.2 * lag) * (1 - 0.15 * MORF);
  }
  if (j < W_FONDO) return fondo(i, j, t, p, c);
  // agua del lavabo que, en el inodoro, será tapa de la cisterna, bisagra o asiento
  const m = suave((ts - T_INO - TD[i]) / 0.46);
  if (m <= 0) return fondo(i, j, t, p, c);
  const tam = m >= 1 ? 0 : fondo(i, j, t, p, c);
  const tw = 1 + 0.06 * Math.sin(t * 1.6 + FASE[i]);
  if (m >= 1) {
    p[0] = TX[i];
    p[1] = TY[i];
    p[2] = 0;
    c[0] = TR[i] * tw;
    c[1] = TG[i] * tw;
    c[2] = TB[i] * tw;
    return TT[i];
  }
  p[0] += (TX[i] - p[0]) * m;
  p[1] += (TY[i] - p[1]) * m;
  p[2] = -0.02 * (1 - m) + 0.05 * Math.sin(Math.PI * m);
  c[0] += (TR[i] * tw - c[0]) * m;
  c[1] += (TG[i] * tw - c[1]) * m;
  c[2] += (TB[i] * tw - c[2]) * m;
  return tam + (TT[i] - tam) * m;
}
