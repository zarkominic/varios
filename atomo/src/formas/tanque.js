// Escena 8: «Aquí viene el giro: en Estados Unidos, un tanque ancho, de unos dos metros,
// reposó un día entero. Al vaciarlo despacio, giró en sentido antihorario.»
// El experimento de Shapiro (MIT, 1962), visto desde arriba (plano XY): un tanque circular
// ancho y poco profundo, borde blanco, agua azul profunda con partículas trazadoras.
//   ts 1,5-3,3  el agua aún gira en sentido HORARIO (como se llenó) y va frenando
//               (estelas largas, como una foto de exposición larga, que se acortan);
//   ts 2,9-5,3  agua quieta y un «reloj»: un arco dorado recorre el borde dos vueltas
//               (24 h en una esfera de 12 marcas) y se apaga;
//   ts 5,0-8,0  se abre el desagüe: el tapón se convierte en dos astillas cruzadas y
//               aparece una espiral ANTIHORARIA lenta que se acelera; sigue hasta el final.
// Son los tiempos por defecto; en el vídeo el reloj y el desagüe siguen a las marcas
// «reposo», «dia» y «vaciar» de la voz.
import { N, TAU, S1, S2, S3, S4, marca as marcaVoz } from './base.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const suave = (x) => {
  const v = clamp01(x);
  return v * v * (3 - 2 * v);
};

// --- geometría -------------------------------------------------------------------
const CX = 0;
const CY = 0.86;
const R = 1.1; // borde exterior
const RL = 1.05; // labio interior del borde
const RW = 1.025; // superficie del agua
const RH = 0.1; // desagüe

// --- bloques de partículas -------------------------------------------------------
const I_LABIO = 760;
const I_PARED = 1060;
const I_MARCAS = 1300;
const NM = 12; // marcas del reloj
const PM = 24; // partículas por marca
const I_ARO = I_MARCAS + NM * PM; // 1588
const N_ARO = 200;
const I_TAPON = I_ARO + N_ARO; // 1788
const N_CRUZ = 320;
const I_CUERPO = I_TAPON + N_CRUZ; // 2108
const N_CUERPO = 1000;
const I_TRAZ = I_CUERPO + N_CUERPO; // 3108
const NT = 12; // partículas por estela
const NTR = 200; // trazadores
const I_BRAZOS = I_TRAZ + NT * NTR; // 5508
const NBR = N - I_BRAZOS; // 1492 (en las fases 1-2 son estelas extra)
const NB = 3; // brazos de la espiral

// --- coreografía -------------------------------------------------------------------
// Fase 1: giro horario que frena. resto(ts) = cuánto le queda por girar (en s a velocidad W0).
const W0 = 1.5;
const TA = 1.6;
const TB = 3.3;
const DB = TB - TA;
function resto(ts) {
  if (ts < TA) return TA - ts + DB * 0.5;
  if (ts >= TB) return 0;
  const u = (ts - TA) / DB;
  return DB * (0.5 - u + u * u * u - (u * u * u * u) / 2);
}
function vel1(ts) {
  if (ts < TA) return 1;
  if (ts >= TB) return 0;
  return 1 - suave((ts - TA) / DB);
}
// Fase 3: tiempo «de flujo» acumulado desde que se abre el desagüe (se acelera).
// T3, TR0 y TR1 siguen a la voz (ver preparar): el reloj suena en «reposó un día» y el
// desagüe se abre justo antes de «vaciarlo».
let T3 = 5.0;
const D3 = 2.8;
const A0 = 0.14;
function tau3(ts) {
  if (ts <= T3) return 0;
  const x = ts - T3;
  if (x >= D3) return A0 * x + (1 - A0) * (D3 * 0.5 + (x - D3));
  const u = x / D3;
  return A0 * x + (1 - A0) * D3 * (u * u * u - (u * u * u * u) / 2);
}
function vel3(ts) {
  if (ts <= T3) return 0;
  return A0 + (1 - A0) * suave((ts - T3) / D3);
}
// Reloj: dos vueltas en sentido horario empezando arriba.
let TR0 = 3.25;
let TR1 = 4.85;

// Sumidero + vórtice: q = r² baja a ritmo K; dθ/dτ = OMP + G·K/(q + QC) (antihorario).
const QW = (RW - 0.02) * (RW - 0.02);
const QH = (RH + 0.035) * (RH + 0.035);
const SPAN = QW - QH;
const P_CRUCE = 2.6; // τ que tarda una partícula en ir del borde al desagüe
const K = SPAN / P_CRUCE;
const G = 0.95;
const QC = 0.012;
const OMP = 0.45;
const LQW = Math.log(QW + QC);

// --- tablas por partícula ----------------------------------------------------------
let semilla = 80619;
function rnd() {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let q = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q;
  return ((q ^ (q >>> 14)) >>> 0) / 4294967296;
}
// borde: ángulos estratificados (línea uniforme)
const ANG = new Float32Array(I_MARCAS);
for (let i = 0; i < I_MARCAS; i++) {
  let j;
  let n;
  if (i < I_LABIO) {
    j = i;
    n = I_LABIO;
  } else if (i < I_PARED) {
    j = i - I_LABIO;
    n = I_PARED - I_LABIO;
  } else {
    j = i - I_PARED;
    n = I_MARCAS - I_PARED;
  }
  ANG[i] = (TAU * (j + rnd())) / n;
}
// cuerpo de agua: espiral de Vogel con algo de desorden (cobertura uniforme)
const CU = new Float32Array(N_CUERPO);
const CTH = new Float32Array(N_CUERPO);
for (let j = 0; j < N_CUERPO; j++) {
  CU[j] = clamp01((j + 0.5 + (rnd() - 0.5) * 0.6) / N_CUERPO);
  CTH[j] = j * 2.39996323 + (rnd() - 0.5) * 0.04;
}
// estelas (trazadores + brazos en las fases 1-2): reposo uniforme en área
const NE = NTR + Math.ceil(NBR / NT);
const TQ0 = new Float32Array(NE);
const TTH = new Float32Array(NE);
const TFA = new Float32Array(NE);
const QMIN0 = (RH + 0.05) * (RH + 0.05);
for (let k = 0; k < NE; k++) {
  TQ0[k] = QMIN0 + (QW - QMIN0) * ((k + rnd()) / NE);
  TTH[k] = TAU * rnd();
  TFA[k] = TAU * rnd();
}
// barajamos los radios para que las estelas de los brazos no queden todas fuera
for (let k = NE - 1; k > 0; k--) {
  const m = Math.floor(rnd() * (k + 1));
  const q = TQ0[k];
  TQ0[k] = TQ0[m];
  TQ0[m] = q;
}
const BE = new Float32Array(NBR); // fase a lo largo del brazo
const BW = new Float32Array(NBR); // desvío lateral
const BK = new Float32Array(NBR); // ángulo del brazo
for (let j = 0; j < NBR; j++) {
  BE[j] = (j + rnd()) / NBR;
  BW[j] = rnd() + rnd() + rnd() - 1.5;
  BK[j] = (TAU * (j % NB)) / NB + 0.6;
}

// --- estado por fotograma ------------------------------------------------------------
const DL = 0.026; // s entre partículas de una estela
const RESTO = new Float64Array(NT);
const TAUS = new Float64Array(NT);
let ultimo = NaN;
let CABEZA = 0; // ángulo de la cabeza del arco del reloj
let RECORRIDO = 0; // ángulo total recorrido por el reloj
let EA = 0; // intensidad del arco
let KM = 0; // marcas desplegadas
let ABRE = 0; // desagüe abierto
let CRUZ = 0; // ángulo de las astillas
let RREV = 0; // radio hasta el que se ve la espiral
let PUNTOS = 1; // brillo de las estelas que luego forman los brazos
let RMIN = 0; // radio interior del cuerpo de agua
let COLA = 1; // visibilidad de las colas (0 con el agua quieta)

function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  TR0 = marcaVoz('reposo', 3.55) - 0.3;
  TR1 = marcaVoz('dia', 4.65) + 0.2;
  T3 = marcaVoz('vaciar', 5.4) - 0.4;
  for (let k = 0; k < NT; k++) {
    RESTO[k] = resto(ts - k * DL);
    TAUS[k] = tau3(ts - k * DL);
  }
  const x = clamp01((ts - TR0) / (TR1 - TR0));
  const pr = 0.5 - 0.5 * Math.cos(Math.PI * x);
  RECORRIDO = 2 * TAU * pr;
  CABEZA = Math.PI / 2 - RECORRIDO;
  EA = suave((ts - (TR0 - 0.2)) / 0.3) * (1 - suave((ts - TR1 + 0.05) / 0.45));
  KM = suave((ts - (TR0 - 0.4)) / 0.45) * (1 - suave((ts - (TR1 + 0.1)) / 0.45));
  ABRE = suave((ts - T3) / 0.6);
  CRUZ = 0.35 + 2.6 * TAUS[0];
  RREV = RH + (RW + 0.25 - RH) * suave((ts - (T3 + 0.25)) / 1.4);
  PUNTOS = 1 - suave((ts - (T3 - 0.15)) / 0.4);
  RMIN = RH + 0.005 + 0.045 * ABRE;
  const v = Math.max(vel1(ts), vel3(ts) * 1.5);
  COLA = clamp01(v * 4);
}

// Intensidad del arco de luz en el ángulo th (la cabeza avanza en sentido horario).
function arco(th) {
  if (EA <= 0) return 0;
  let d = (th - CABEZA) % TAU;
  if (d < 0) d += TAU;
  const cola = d < RECORRIDO ? Math.exp(-d / 1.25) : 0;
  const frente = Math.exp(-(TAU - d) / 0.03);
  return EA * (cola > frente ? cola : frente);
}

// --- piezas ----------------------------------------------------------------------------
function borde(i, t, p, c) {
  const th = ANG[i];
  const a = arco(th);
  let r;
  let k;
  let tam;
  let z = 0;
  let g;
  if (i < I_LABIO) {
    r = R + (S2[i] - 0.5) * (0.012 + 0.03 * a) + 0.01 * a;
    k = 1.25;
    tam = 0.034;
    g = a * 3.4;
  } else if (i < I_PARED) {
    r = RL + (S2[i] - 0.5) * 0.008;
    k = 0.6;
    tam = 0.028;
    g = a * 1.6;
  } else {
    const s = S2[i];
    r = RL + (R - RL) * s;
    z = -0.02;
    k = 0.12 + 0.18 * s;
    tam = 0.045;
    g = a * 2.2;
  }
  p[0] = CX + r * Math.cos(th);
  p[1] = CY + r * Math.sin(th);
  p[2] = z;
  // blanco frío que se vuelve dorado bajo el arco
  c[0] = k + 1.0 * g;
  c[1] = 0.96 * k + 0.7 * g;
  c[2] = 0.92 * k + 0.28 * g;
  return tam * (1 + 0.4 * a);
}

function marca(i, t, p, c) {
  const j = i - I_MARCAS;
  const m = (j / PM) | 0;
  const s = (j % PM) / PM;
  const am = Math.PI / 2 - (m * TAU) / NM;
  // reposo: repartidas sobre el borde; activas: marca radial fuera del borde
  const thR = am + (S1[i] - 0.5) * (TAU / NM);
  const larga = m === 0 ? 1.5 : m % 3 === 0 ? 1.2 : 1;
  const thA = am + (S2[i] - 0.5) * 0.008;
  const rA = R + 0.05 + s * 0.07 * larga;
  // primero se juntan sobre el borde y luego salen hacia fuera (y al revés al recogerse)
  const ka = suave(2 * KM);
  const kr = suave(2 * KM - 1);
  const th = thR + (thA - thR) * ka;
  const r = R + (rA - R) * kr;
  p[0] = CX + r * Math.cos(th);
  p[1] = CY + r * Math.sin(th);
  p[2] = 0;
  // vueltas que ya ha dado la cabeza sobre esta marca
  const pasadas = (RECORRIDO - (m * TAU) / NM) / TAU;
  let lit = 0.3;
  if (pasadas >= 0) {
    lit = pasadas >= 1 ? 1.0 : 0.62;
    const desde = pasadas - Math.floor(pasadas);
    lit += 1.6 * Math.exp(-desde * 10) * EA;
  }
  // al desplegarse o recogerse se apagan un instante (el cambio de sitio no se ve)
  const vis = (2 * KM - 1) * (2 * KM - 1);
  const a = arco(th) * (1 - KM) * vis;
  const w = KM < 0.5 ? vis : 0;
  const gold = KM >= 0.5 ? vis * lit : 0;
  c[0] = 1.25 * w + gold * 1.0 + a * 2.6;
  c[1] = 1.2 * w + gold * 0.74 + a * 1.8;
  c[2] = 1.15 * w + gold * 0.3 + a * 0.7;
  return 0.032 + 0.004 * KM;
}

function aro(i, t, p, c) {
  const j = i - I_ARO;
  const th = (TAU * (j + S1[i])) / N_ARO;
  const r = RH + (S2[i] - 0.5) * 0.012 + 0.012 * ABRE;
  p[0] = CX + r * Math.cos(th);
  p[1] = CY + r * Math.sin(th);
  p[2] = 0.005;
  const k = 0.7 + 0.5 * ABRE;
  c[0] = 0.82 * k;
  c[1] = 0.9 * k;
  c[2] = 1.05 * k;
  return 0.03;
}

const LC = 0.38; // largo de cada astilla
const NBARRA = N_CRUZ / 2;
function tapon(i, t, p, c, ts) {
  const j = i - I_TAPON;
  // tapón: disco metálico
  const rr = 0.085 * Math.sqrt(S1[i]);
  const ta = TAU * S2[i];
  const px = rr * Math.cos(ta);
  const py = rr * Math.sin(ta);
  if (ABRE <= 0) {
    p[0] = CX + px;
    p[1] = CY + py;
    p[2] = 0.01;
    c[0] = 0.42;
    c[1] = 0.48;
    c[2] = 0.6;
    return 0.032;
  }
  // astillas cruzadas que giran en sentido antihorario
  const b = j & 1;
  const s = ((j >> 1) + S3[i]) / NBARRA - 0.5;
  const fin = 1 - Math.pow(Math.abs(2 * s), 2.2);
  const lat = (S4[i] - 0.5) * 0.032 * (0.15 + 0.85 * fin);
  const fi = CRUZ + b * (Math.PI / 2) + 0.03 * Math.sin(t * 2.1);
  const cf = Math.cos(fi);
  const sf = Math.sin(fi);
  const lx = s * LC * (b ? 0.86 : 1);
  const qx = lx * cf - lat * sf;
  const qy = lx * sf + lat * cf;
  const m = suave((ts - T3 - 0.05) / 0.55);
  p[0] = CX + px + (qx - px) * m;
  p[1] = CY + py + (qy - py) * m;
  p[2] = 0.03 * m + 0.01;
  // madera clara con veta
  const veta = 0.85 + 0.15 * Math.sin(s * 40 + b * 2);
  const k = 1.45 * veta;
  c[0] = 0.42 + (1.0 * k - 0.42) * m;
  c[1] = 0.48 + (0.64 * k - 0.48) * m;
  c[2] = 0.6 + (0.32 * k - 0.6) * m;
  return 0.03;
}

function cuerpo(i, t, p, c) {
  const j = i - I_CUERPO;
  const rb = RW - 0.06;
  const r = Math.sqrt(RMIN * RMIN + CU[j] * (rb * rb - RMIN * RMIN));
  const th = CTH[j];
  const x = r * Math.cos(th);
  const y = r * Math.sin(th);
  p[0] = CX + x;
  p[1] = CY + y;
  p[2] = -0.04 - 0.06 * S3[i];
  // cáusticas suaves
  const ca = Math.sin(3.1 * x + 1.3 * t) * Math.sin(2.7 * y - 1.1 * t) + 0.5 * Math.sin(4.3 * (x + y) + 0.7 * t);
  const k = 0.085 + 0.02 * ca;
  c[0] = 0.16 * k;
  c[1] = 0.55 * k;
  c[2] = 1.6 * k;
  return 0.2;
}

// Posición del punto de flujo (q0, th0) con retardo k; devuelve el brillo (0 en el desagüe).
function posFlujo(q0, th0, k, p) {
  const tau = TAUS[k];
  let r;
  let th;
  let env = 1;
  if (tau <= 0) {
    const f = 1 - (0.3 * q0) / QW;
    th = th0 + W0 * f * RESTO[k];
    r = Math.sqrt(q0);
  } else {
    const u = (QW - q0) / SPAN + (K * tau) / SPAN;
    const n = Math.floor(u);
    const fr = u - n;
    const q = QW - fr * SPAN;
    const base = n === 0 ? Math.log(q0 + QC) : LQW;
    th = th0 + n * 2.39996 + OMP * tau + G * (base - Math.log(q + QC));
    r = Math.sqrt(q);
    env = suave((q - QH) / 0.03) * (n > 0 ? suave((QW - q) / 0.12) : 1);
  }
  p[0] = CX + r * Math.cos(th);
  p[1] = CY + r * Math.sin(th);
  p[2] = 0.01;
  return env;
}

function estela(e, k, t, p, c, f) {
  const env = posFlujo(TQ0[e], TTH[e], k, p) * f;
  // vida en reposo: deriva mínima
  const fa = TFA[e];
  p[0] += 0.004 * Math.sin(t * 0.8 + fa);
  p[1] += 0.004 * Math.cos(t * 0.7 + fa * 1.3);
  const cola = 1 - k / NT;
  const b = env * (k === 0 ? 1.6 : 0.5 * cola * cola * (0.1 + 0.9 * COLA));
  c[0] = 0.55 * b;
  c[1] = 0.88 * b;
  c[2] = 1.05 * b;
  return k === 0 ? 0.048 : 0.042 - 0.0015 * k;
}

function trazador(i, t, p, c) {
  const j = i - I_TRAZ;
  return estela((j / NT) | 0, j % NT, t, p, c, 1);
}

function brazo(i, t, p, c, ts) {
  const j = i - I_BRAZOS;
  if (ts < T3 + 0.35) return estela(NTR + ((j / NT) | 0), j % NT, t, p, c, PUNTOS);
  const tau = TAUS[0];
  const u0 = BE[j] + tau / P_CRUCE;
  const u = u0 - Math.floor(u0);
  const q = QW - u * SPAN;
  const r = Math.sqrt(q);
  const ancho = 0.035 + 0.07 * (r / RW);
  const th = BK[j] + OMP * tau + G * (LQW - Math.log(q + QC)) + (BW[j] * ancho) / r;
  p[0] = CX + r * Math.cos(th);
  p[1] = CY + r * Math.sin(th);
  p[2] = 0.015;
  const env = suave((q - QH) / 0.03) * suave((QW - q) / 0.1) * suave((RREV - r) / 0.18);
  const lat = 1 - Math.abs(BW[j]) / 1.5;
  const dentro = 1 - r / RW;
  const b = env * (0.7 + 1.0 * dentro) * (0.45 + 0.75 * lat);
  c[0] = (0.45 + 0.5 * dentro) * b;
  c[1] = (0.82 + 0.15 * dentro) * b;
  c[2] = 1.05 * b;
  return 0.034;
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  if (i < I_MARCAS) return borde(i, t, p, c);
  if (i < I_ARO) return marca(i, t, p, c);
  if (i < I_TAPON) return aro(i, t, p, c);
  if (i < I_CUERPO) return tapon(i, t, p, c, ts);
  if (i < I_TRAZ) return cuerpo(i, t, p, c);
  if (i < I_BRAZOS) return trazador(i, t, p, c);
  return brazo(i, t, p, c, ts);
}
