// Escena 6: «Gana el giro que ya traía el agua. En el inodoro, el diseño de la taza.»
// El mismo lavabo visto desde arriba con un remolino potente: brazos en espiral de agua
// azul-blanca que giran en sentido HORARIO hacia el desagüe. Desde ~2,2 s el grifo se
// vacía en el canal del borde, que recorre la taza en sentido horario y la alimenta por
// 9 chorros cortos inclinados (como los orificios del borde de un inodoro).
import { N, TAU, S1, S2 } from './base.js';
import {
  suave,
  estatico,
  contornoCanal,
  contornoInterior,
  PT,
  FX,
  FY,
  FASE,
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

// --- el remolino ---------------------------------------------------------------------
// Flujo de sumidero + vórtice libre: q = ρ² baja a ritmo constante (el agua se acelera
// hacia el centro) y el ángulo sigue una espiral logarítmica θ = θ0 + C·ln q, que con
// C > 0 avanza en sentido horario al acercarse al desagüe. Todo el dibujo gira, además,
// despacio en sentido horario (−WP).
const RHO_MIN = 0.135; // ojo del remolino (justo fuera del aro del desagüe)
const Q0 = RHO_MIN * RHO_MIN;
const C_ESP = 0.95;
const WP = 0.55;
const V_BRAZO = 0.34; // vueltas del ciclo de q por segundo
const V_FONDO = 0.22;
const NB = 3; // brazos
const DL = 0.03; // retardo entre las partículas de cada estela

function posVortice(q, th) {
  const rho = Math.sqrt(q);
  const u = 1 - rho;
  const ry = AG_B + (AG_A - AG_B) * u * u; // cerca del centro el remolino es redondo
  PT[0] = DES_X + rho * AG_A * Math.cos(th);
  PT[1] = DES_Y + rho * ry * Math.sin(th);
  return rho;
}

const NW = N - I_AGUA;
const N_EXTRA = 540; // las primeras del agua refuerzan los chorros (esperan como orificios del borde)
const N_BRAZOS = N_EXTRA + 2130; // después, los brazos (en estelas de 3)
const TH = new Float32Array(NW);
const PH = new Float32Array(NW);
const G = new Float32Array(NW);
for (let j = 0; j < NW; j++) {
  if (j < N_EXTRA) continue;
  if (j < N_BRAZOS) {
    const cabeza = j - ((j - N_EXTRA) % 3); // las 3 partículas de una estela comparten semilla
    if ((j - N_EXTRA) % 3 === 0) {
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

// Ojo del remolino (las partículas de la flecha): un anillo blanco continuo sobre el que
// barren en sentido horario K arcos brillantes con cola, como cometas. Las partículas
// giran despacio (≤ 1 rad/s, sin saltos entre fotogramas) y el dibujo de los cometas
// gira más deprisa sobre ellas; dentro, algo más rápido que fuera.
const NO = I_FLECHA - I_GRIFO;
const K_OJO = 3;
const OR = new Float32Array(NO);
const OT = new Float32Array(NO);
const OW = new Float32Array(NO); // giro de las partículas (rad/s)
const OF = new Float32Array(NO); // giro de los cometas (rad/s)
const OK = new Float32Array(NO); // brillo según el radio
for (let j = 0; j < NO; j++) {
  const r = 0.148 + 0.065 * Math.pow(S1[I_GRIFO + j], 1.8);
  OR[j] = r;
  OT[j] = (TAU * (j + 0.85 * S2[I_GRIFO + j])) / NO; // reparto estratificado: anillo sin huecos
  OW[j] = 1.0 * (0.15 / r) ** 2;
  OF[j] = 3.2 - 3 * (r - 0.15);
  OK[j] = 1.35 - 4 * (r - 0.15);
}

// --- chorros del borde -------------------------------------------------------------
const NJ = 9;
const T_SALIDA = 1.95; // el grifo empieza a vaciarse en el canal
const ESPARCIDO = 0.36; // reparto de las salidas (longitud del «cometa» de luz)
const T_BAJADA = 0.22; // del grifo a la entrada del canal
const W_CANAL = 9; // rad/s por el canal, en sentido horario
const V_CHORRO = 1 / ESPARCIDO; // ciclos por segundo de cada chorro
const L_CHORRO = 0.36;
const BETA = 0.6; // inclinación del chorro hacia dentro
const PSI0 = Math.PI / 2; // entrada del canal (arriba, bajo el grifo)
const JPSI = new Float32Array(NJ); // ángulo (desenrollado) de cada orificio
const JX = new Float32Array(NJ);
const JY = new Float32Array(NJ);
const JDX = new Float32Array(NJ);
const JDY = new Float32Array(NJ);
for (let k = 0; k < NJ; k++) {
  // el orificio está en el filo interior del borde; el chorro entra en la taza
  const psi = PSI0 - 0.35 - (k * TAU) / NJ;
  JPSI[k] = psi;
  contornoInterior(psi - 0.002);
  const ax = PT[0];
  const ay = PT[1];
  contornoInterior(psi);
  let tx = ax - PT[0]; // sentido horario
  let ty = ay - PT[1];
  const L = Math.hypot(tx, ty);
  tx /= L;
  ty /= L;
  const nx = ty; // normal hacia dentro
  const ny = -tx;
  JX[k] = PT[0] + nx * 0.012;
  JY[k] = PT[1] + ny * 0.012;
  JDX[k] = Math.cos(BETA) * tx + Math.sin(BETA) * nx;
  JDY[k] = Math.cos(BETA) * ty + Math.sin(BETA) * ny;
}
contornoCanal(PSI0);
const ENTRADA_X = PT[0];
const ENTRADA_Y = PT[1];
const NG = I_GRIFO - I_DESAGUE; // partículas del grifo
const NJT = NG + N_EXTRA; // todas las de los chorros
const JK = new Uint8Array(NJT);
const JU = new Float32Array(NJT); // salida del grifo
const JA = new Float32Array(NJT); // llegada al orificio (o encendido, para las de refuerzo)
const JW = new Float32Array(NJT);
const JO = new Float32Array(NJT); // desfase dentro del ciclo del chorro
for (let j = 0; j < NJT; j++) {
  const k = j % NJ;
  JK[j] = k;
  JW[j] = rnd() - 0.5;
  if (j < NG) {
    JU[j] = T_SALIDA + ESPARCIDO * rnd();
    JA[j] = JU[j] + T_BAJADA + (PSI0 - JPSI[k]) / W_CANAL;
    JO[j] = 0;
  } else {
    // se encienden cuando llega la cabeza del cometa a su orificio
    JA[j] = T_SALIDA + T_BAJADA + (PSI0 - JPSI[k]) / W_CANAL + 0.05;
    JO[j] = rnd();
  }
}

// --- coreografía -------------------------------------------------------------------
let ultimo = NaN;
let ALIMENTA = 0; // los chorros ya alimentan la espiral
function preparar(ts) {
  if (ts === ultimo) return;
  ultimo = ts;
  ALIMENTA = suave((ts - 2.4) / 1.0);
}

// Punto del chorro k en la fracción s (0 orificio, 1 final), con apertura lateral w.
function puntoChorro(k, s, w, p) {
  const dx = JDX[k];
  const dy = JDY[k];
  const ancho = w * (0.012 + 0.05 * s);
  const curva = 0.07 * s * s; // se curva hacia dentro, siguiendo el giro
  p[0] = JX[k] + dx * L_CHORRO * s + dy * (ancho + curva);
  p[1] = JY[k] + dy * L_CHORRO * s - dx * (ancho + curva);
  p[2] = 0.02;
}
function colorChorro(s, c, f) {
  const kb = (1.5 * Math.pow(1 - s, 1.2) + 0.15) * f;
  c[0] = 0.72 * kb;
  c[1] = 0.92 * kb;
  c[2] = 1.05 * kb;
  return 0.034 - 0.012 * s;
}

function chorro(i, j, t, p, c, ts) {
  const k = JK[j];
  const ta = ts - JA[j];
  if (j >= NG) {
    // refuerzo: espera como un orificio tenue y se enciende al llegar el agua
    if (ta < 0) {
      puntoChorro(k, 0.02 * JO[j], JW[j], p);
      c[0] = 0.03;
      c[1] = 0.05;
      c[2] = 0.08;
      return 0.03;
    }
    const s = (JO[j] + ta * V_CHORRO) % 1;
    puntoChorro(k, s, JW[j], p);
    return colorChorro(s, c, Math.min(1, ta / 0.25));
  }
  const tt = ts - JU[j];
  if (tt <= 0) return estatico(i, t, p, c); // aún es el grifo
  if (tt < T_BAJADA) {
    // del grifo a la entrada del canal
    const q = suave(tt / T_BAJADA);
    p[0] = FX[i] + (ENTRADA_X - FX[i]) * q;
    p[1] = FY[i] + (ENTRADA_Y - FY[i]) * q;
    p[2] = 0.05;
    c[0] = 0.75;
    c[1] = 0.9;
    c[2] = 1.0;
    return 0.03;
  }
  if (ta < 0) {
    // corriendo por el canal del borde en sentido horario
    contornoCanal(PSI0 - W_CANAL * (tt - T_BAJADA));
    p[0] = PT[0];
    p[1] = PT[1];
    p[2] = 0.02;
    const tw = 1 + 0.15 * Math.sin(t * 9 + FASE[i]);
    c[0] = 0.8 * tw;
    c[1] = 0.95 * tw;
    c[2] = 1.05 * tw;
    return 0.032;
  }
  const s = (ta * V_CHORRO) % 1;
  puntoChorro(k, s, JW[j], p);
  return colorChorro(s, c, 1);
}

export function forma(i, t, p, c, ts) {
  preparar(ts);
  if (i < I_DESAGUE) return estatico(i, t, p, c);
  if (i < I_GRIFO) return chorro(i, i - I_DESAGUE, t, p, c, ts);

  if (i < I_FLECHA) {
    // ojo del remolino: cometas blancos barriendo el anillo en sentido horario
    const j = i - I_GRIFO;
    const r = OR[j];
    const th = OT[j] - OW[j] * t;
    p[0] = DES_X + r * Math.cos(th);
    p[1] = DES_Y + r * Math.sin(th);
    p[2] = 0.0;
    // x = 0 en la cabeza del cometa; crece hacia la cola (ángulos mayores: detrás, si gira horario)
    let x = ((th + OF[j] * ts) * K_OJO) / TAU;
    x -= Math.floor(x);
    const b = 0.1 + 1.7 * Math.max(Math.exp(-2.6 * x), suave((x - 0.97) / 0.03));
    const k = OK[j] * b;
    c[0] = 0.75 * k;
    c[1] = 0.92 * k;
    c[2] = 1.05 * k;
    return 0.02 + 0.008 * b;
  }

  // agua
  const j = i - I_AGUA;
  if (j < N_EXTRA) return chorro(i, NG + j, t, p, c, ts);
  if (j < N_BRAZOS) {
    const lag = (j - N_EXTRA) % 3;
    const tt = t - lag * DL;
    let f = (PH[j] - V_BRAZO * tt) % 1;
    if (f < 0) f += 1;
    const q = Q0 + (1 - Q0) * f;
    const rho = Math.sqrt(q);
    const anchoMundo = 0.03 + 0.2 * rho * rho;
    const th = TH[j] + C_ESP * Math.log(q) - WP * tt + (G[j] * anchoMundo) / (rho * 0.95);
    posVortice(q, th);
    p[0] = PT[0];
    p[1] = PT[1];
    p[2] = 0.01;
    const dentro = 1 - rho;
    const blanco = Math.pow(dentro, 1.4);
    const borde = Math.min(1, (1 - q) / 0.1) * Math.min(1, (rho - RHO_MIN) / 0.06);
    const nucleo = 1 - 0.75 * G[j] * G[j];
    const k = (0.55 + 1.2 * dentro) * borde * nucleo * (1 - 0.3 * lag) * (1 + 0.15 * ALIMENTA);
    c[0] = (0.25 + 0.65 * blanco) * k;
    c[1] = (0.55 + 0.42 * blanco) * k;
    c[2] = 1.0 * k;
    return (0.036 + 0.014 * dentro) * (1 - 0.2 * lag);
  }
  // fondo de agua que gira con los brazos
  let f = (PH[j] - V_FONDO * t) % 1;
  if (f < 0) f += 1;
  const q = Q0 + (1 - Q0) * f;
  const th = TH[j] + C_ESP * Math.log(q) - WP * t;
  const rho = posVortice(q, th);
  p[0] = PT[0];
  p[1] = PT[1];
  p[2] = -0.02;
  const cerca = 0.5 + 0.5 * Math.cos(NB * (TH[j] - 0.4));
  const dentro = 1 - rho;
  const borde = Math.min(1, (1 - q) / 0.05) * Math.min(1, (rho - RHO_MIN) / 0.08);
  const somero = rho * rho * rho;
  if (j % 5 === 0) {
    // espuma: chispas que viajan con el giro
    const k = (0.45 + 0.6 * cerca + 0.5 * dentro) * borde * (0.8 + 0.3 * Math.sin(t * 2.7 + FASE[i]));
    c[0] = 0.4 * k;
    c[1] = 0.7 * k;
    c[2] = 1.1 * k;
    return 0.026;
  }
  const k = (0.32 + 0.55 * cerca * cerca + 0.35 * dentro) * borde;
  c[0] = (0.08 + 0.12 * somero + 0.2 * dentro * dentro) * k;
  c[1] = (0.27 + 0.26 * somero + 0.25 * dentro * dentro) * k;
  c[2] = 0.85 * k;
  return 0.068;
}
