// Escena 7: «¿Y el truco del ecuador?». Una línea dorada (el ecuador pintado en el suelo)
// cruza el encuadre; en su centro, un «0» grande (Coriolis vertical = 0). Encima de la línea,
// un barreño cuyo remolino gira en sentido antihorario; debajo, otro que gira en sentido
// horario. Desde ~3 s, junto a cada barreño se dibuja una flecha curva naranja: el empujón
// de la mano del guía, que da un impulso al agua cada vez que la recorre un destello.
import { N, TAU, S1, S2, S3, S4, C, poner } from './base.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

// --- geometría ---------------------------------------------------------------
const LY = 0.85; // altura de la línea del ecuador
const L_X = 1.75; // la línea sale del encuadre por ambos lados
const CERO_A = 0.27; // semiejes del «0»
const CERO_B = 0.44;
const CERO_P = 2.35; // superelipse: un cero tipográfico, no una elipse
const HUECO = CERO_A + 0.1; // la línea se interrumpe junto al «0» (que no parezca una θ)
const RB = 0.3; // radio de los barreños
const B1X = -0.83; // barreño norte (antihorario)
const B1Y = 1.53;
const B2X = 0.83; // barreño sur (horario)
const B2Y = 0.17;
const RA = RB + 0.13; // radio del arco de la flecha
const T_FLECHA = 3.0; // empieza a dibujarse la flecha
const D_FLECHA = 0.7; // tiempo que tarda en dibujarse
const T_EMPUJE = 3.75; // primer empujón
const P_EMPUJE = 1.25; // un empujón cada P_EMPUJE segundos
const W0 = 1.5; // giro base del agua (rad/s)
const IMPULSO = 0.9; // giro extra que da cada empujón (rad)
const N_BRAZOS = 5;
const TORSION = 1.25;

// --- reparto de partículas ---------------------------------------------------
const N_LINEA = 1300;
const N_LINEA_NUCLEO = 900;
const N_CERO = 1300;
const N_LETRA = 150;
const N_BARRENO = 1300;
const N_BORDE = 260;
const N_DESAGUE = 40;
const N_FLECHA = 750;
const N_ARCO = 500;
const I_CERO = N_LINEA;
const I_LETRAS = I_CERO + N_CERO;
const I_B1 = I_LETRAS + 2 * N_LETRA;
const I_B2 = I_B1 + N_BARRENO;
const I_F1 = I_B2 + N_BARRENO;
const I_F2 = I_F1 + N_FLECHA;
if (I_F2 + N_FLECHA !== N) throw new Error('ecuador_truco: reparto de partículas incorrecto');

// --- el «0»: muestreo uniforme por longitud de arco de una superelipse --------
const ZX = new Float32Array(N_CERO);
const ZY = new Float32Array(N_CERO);
const ZA = new Float32Array(N_CERO); // ángulo (para el destello que lo recorre)
const ZB = new Float32Array(N_CERO); // brillo
const ZT = new Float32Array(N_CERO); // tamaño
{
  const M = 2048;
  const qx = new Float64Array(M + 1);
  const qy = new Float64Array(M + 1);
  const acum = new Float64Array(M + 1);
  const e = 2 / CERO_P;
  for (let k = 0; k <= M; k++) {
    const th = (TAU * k) / M;
    const cc = Math.cos(th);
    const ss = Math.sin(th);
    qx[k] = CERO_A * Math.sign(cc) * Math.abs(cc) ** e;
    qy[k] = CERO_B * Math.sign(ss) * Math.abs(ss) ** e;
    if (k > 0) acum[k] = acum[k - 1] + Math.hypot(qx[k] - qx[k - 1], qy[k] - qy[k - 1]);
  }
  const L = acum[M];
  let seg = 0;
  for (let j = 0; j < N_CERO; j++) {
    const i = I_CERO + j;
    const objetivo = (L * (j + S1[i])) / N_CERO;
    while (seg < M - 1 && acum[seg + 1] < objetivo) seg++;
    const f = (objetivo - acum[seg]) / (acum[seg + 1] - acum[seg] || 1);
    const x = qx[seg] + (qx[seg + 1] - qx[seg]) * f;
    const y = qy[seg] + (qy[seg + 1] - qy[seg]) * f;
    const tx = qx[seg + 1] - qx[seg];
    const ty = qy[seg + 1] - qy[seg];
    const tl = Math.hypot(tx, ty) || 1;
    const nx = ty / tl;
    const ny = -tx / tl;
    // trazo más grueso en los lados que arriba y abajo, como en una letra
    const ancho = 0.058 + 0.05 * nx * nx;
    const halo = S3[i] < 0.14;
    const d = (S2[i] - 0.5) * ancho * (halo ? 2.6 : 1);
    ZX[j] = x + nx * d;
    ZY[j] = y + ny * d;
    ZA[j] = Math.atan2(y, x);
    ZB[j] = halo ? 0.36 : 1.7 + 0.35 * (1 - Math.abs(S2[i] - 0.5) * 2);
    ZT[j] = halo ? 0.05 : 0.036;
  }
}

// --- letras N y S (rótulos de cada hemisferio), muestreadas sobre trazos --------
function muestrearTrazo(puntos, n, i0, ox, oy, esc, X, Y) {
  const acum = [0];
  for (let k = 1; k < puntos.length; k++) {
    acum.push(acum[k - 1] + Math.hypot(puntos[k][0] - puntos[k - 1][0], puntos[k][1] - puntos[k - 1][1]));
  }
  const L = acum[acum.length - 1];
  let seg = 0;
  for (let j = 0; j < n; j++) {
    const i = i0 + j;
    const objetivo = (L * (j + S1[i])) / n;
    while (seg < puntos.length - 2 && acum[seg + 1] < objetivo) seg++;
    const f = (objetivo - acum[seg]) / (acum[seg + 1] - acum[seg] || 1);
    const a = puntos[seg];
    const b = puntos[seg + 1];
    X[j] = ox + esc * (a[0] + (b[0] - a[0]) * f) + (S2[i] - 0.5) * 0.012;
    Y[j] = oy + esc * (a[1] + (b[1] - a[1]) * f) + (S4[i] - 0.5) * 0.012;
  }
}
const TRAZO_N = [
  [0, 0],
  [0, 1],
  [0.72, 0],
  [0.72, 1],
];
const TRAZO_S = [];
for (let k = 0; k <= 40; k++) {
  const a = (25 + (245 * k) / 40) * (Math.PI / 180);
  TRAZO_S.push([0.38 + 0.34 * Math.cos(a), 0.75 + 0.25 * Math.sin(a)]);
}
for (let k = 1; k <= 40; k++) {
  const a = (90 - (245 * k) / 40) * (Math.PI / 180);
  TRAZO_S.push([0.38 + 0.36 * Math.cos(a), 0.25 + 0.25 * Math.sin(a)]);
}
const LETRA_ALTO = 0.19;
const NX_ = new Float32Array(N_LETRA);
const NY_ = new Float32Array(N_LETRA);
const SX_ = new Float32Array(N_LETRA);
const SY_ = new Float32Array(N_LETRA);
muestrearTrazo(TRAZO_N, N_LETRA, I_LETRAS, 1.02, LY + 0.13, LETRA_ALTO, NX_, NY_);
muestrearTrazo(TRAZO_S, N_LETRA, I_LETRAS + N_LETRA, -1.16, LY - 0.13 - LETRA_ALTO, LETRA_ALTO, SX_, SY_);

// --- flechas curvas: arco tangente al barreño y punta triangular ------------------
// dir = +1 antihorario, −1 horario. El arco va de th0 a th0 + dir·barrido.
function construirFlecha(i0, dir, th0, barrido) {
  const FX = new Float32Array(N_FLECHA); // posición final (relativa al barreño)
  const FY = new Float32Array(N_FLECHA);
  const FS = new Float32Array(N_FLECHA); // posición a lo largo de la flecha (0 cola, 1 punta)
  const MX = new Float32Array(N_FLECHA); // posición previa: bruma alrededor del barreño
  const MY = new Float32Array(N_FLECHA);
  const largoArco = RA * barrido;
  const largoPunta = 0.15;
  const total = largoArco + largoPunta;
  const thF = th0 + dir * barrido; // donde acaba el arco
  // tangente en el sentido de giro al final del arco
  const tx = -Math.sin(thF) * dir;
  const ty = Math.cos(thF) * dir;
  const rx = Math.cos(thF);
  const ry = Math.sin(thF);
  for (let j = 0; j < N_FLECHA; j++) {
    const i = i0 + j;
    if (j < N_ARCO) {
      const s = (j + S1[i]) / N_ARCO;
      // el arco se afina un poco hacia la cola
      const ancho = 0.028 + 0.03 * s;
      const r = RA + (S2[i] - 0.5) * ancho;
      const th = th0 + dir * barrido * s;
      FX[j] = r * Math.cos(th);
      FY[j] = r * Math.sin(th);
      FS[j] = (s * largoArco) / total;
    } else {
      // punta: triángulo con la base centrada en el final del arco
      let a = S1[i];
      let b = S2[i];
      if (a + b > 1) {
        a = 1 - a;
        b = 1 - b;
      }
      // vértices: base izquierda, base derecha, punta (algo desplazada hacia delante)
      const bx0 = RA * rx + rx * 0.085;
      const by0 = RA * ry + ry * 0.085;
      const bx1 = RA * rx - rx * 0.085;
      const by1 = RA * ry - ry * 0.085;
      const px = RA * rx + tx * largoPunta;
      const py = RA * ry + ty * largoPunta;
      FX[j] = bx0 + (bx1 - bx0) * a + (px - bx0) * b;
      FY[j] = by0 + (by1 - by0) * a + (py - by0) * b;
      FS[j] = (largoArco + b * largoPunta) / total;
    }
    const am = TAU * S3[i];
    const rm = RB * (1.14 + 0.28 * S4[i] ** 1.5);
    MX[j] = rm * Math.cos(am);
    MY[j] = rm * Math.sin(am);
  }
  return { FX, FY, FS, MX, MY };
}
// Norte (antihorario): el arco pasa por encima del barreño y baja por su lado exterior.
const F1 = construirFlecha(I_F1, 1, 0.75, 2.45);
// Sur (horario): reflejo de la del norte respecto a la línea; pasa por debajo del barreño.
const F2 = construirFlecha(I_F2, -1, -0.75, 2.45);

// --- valores por fotograma ---------------------------------------------------
let tsCache = NaN;
let fase = 0; // giro acumulado del agua (positivo = antihorario en el norte)
let dibujo = 0; // progreso del dibujo de las flechas
let pulsoQ = -1; // posición del destello a lo largo de la flecha
let pulsoK = 0; // intensidad del destello
let golpe = 0; // agitación del agua justo tras el empujón
let ceroBrillo = 1;
function preparar(ts) {
  tsCache = ts;
  let extra = 0;
  golpe = 0;
  for (let k = 0; k < 8; k++) {
    const tk = T_EMPUJE + k * P_EMPUJE + 0.45; // el destello llega a la punta
    const x = (ts - tk + 0.25) / 0.7;
    extra += IMPULSO * suave(x);
    if (x > 0 && x < 1.6) golpe = Math.max(golpe, Math.sin((Math.PI * x) / 1.6));
  }
  fase = W0 * ts + extra;
  dibujo = lim((ts - T_FLECHA) / D_FLECHA);
  const q = ts - T_EMPUJE;
  if (q >= 0) {
    const ciclo = q % P_EMPUJE;
    pulsoQ = ciclo / 0.55;
    pulsoK = ciclo < 0.75 ? 1 : 0;
  } else {
    pulsoQ = -1;
    pulsoK = 0;
  }
  // el «0» se ilumina un poco cuando se dice «Coriolis no hace girar el agua»
  const x = (ts - 2.3) / 0.8;
  ceroBrillo = 1.1 + 0.2 * Math.exp(-x * x);
}

// Barreño (borde, desagüe y remolino) con centro (bx, by) y sentido dir.
function barreno(j, i, t, ts, bx, by, dir, p, c) {
  if (j < N_BORDE) {
    // borde del barreño: anillo fino y un labio exterior más tenue
    const a = TAU * S1[i];
    const labio = S3[i] < 0.35;
    const r = RB * (labio ? 1.075 : 1) + (S2[i] - 0.5) * 0.012;
    poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), 0);
    const v = (labio ? 0.38 : 0.95) * (0.9 + 0.1 * Math.sin(a * 3 + t));
    poner(c, 0.62 * v, 0.78 * v, 1.0 * v);
    return labio ? 0.03 : 0.03;
  }
  if (j < N_BORDE + N_DESAGUE) {
    const a = TAU * S1[i] + dir * fase * 1.6;
    const r = 0.035 + (S2[i] - 0.5) * 0.008;
    poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), 0.01);
    poner(c, 0.75, 0.85, 1.0);
    return 0.022;
  }
  // agua: brazos en espiral que fluyen hacia el desagüe; su torsión sigue al giro
  const brazo = j % N_BRAZOS;
  const cuerpo = S3[i] < 0.22; // agua de fondo, sin brazos
  const u = (S1[i] + ts * 0.3) % 1;
  const rn = cuerpo ? 0.15 + 0.82 * Math.sqrt(S2[i]) : 1 - 0.86 * u;
  const desv = cuerpo ? TAU * S4[i] : (brazo * TAU) / N_BRAZOS + (S2[i] - 0.5) * 0.3;
  const a = desv + dir * (fase + TORSION * Math.log(1 / rn));
  const r = RB * 0.93 * rn * (1 + 0.025 * golpe * Math.sin(a * 3 + ts * 9));
  poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), (S4[i] - 0.5) * 0.03);
  if (cuerpo) {
    const v = 0.3 + 0.12 * golpe;
    poner(c, 0.2 * v, 0.45 * v, 1.0 * v);
    return 0.034;
  }
  const entrada = Math.min(1, u * 5);
  const caida = Math.min(1, (1 - u) * 4);
  const v = entrada * caida * (0.62 + 0.68 * u) * (1 + 0.35 * golpe);
  poner(c, (0.25 + 0.35 * u) * v, (0.6 + 0.25 * u) * v, 1.0 * v);
  return 0.032 - 0.008 * u;
}

// Flecha curva naranja: antes de dibujarse, sus partículas son bruma tenue alrededor del barreño.
function flecha(j, i, t, ts, bx, by, dir, F, p, c) {
  const s = F.FS[j];
  const llegada = suave((dibujo * 1.25 - s) / 0.25);
  const am = dir * fase * 0.25;
  const ca = Math.cos(am);
  const sa = Math.sin(am);
  const mx = F.MX[j] * ca - F.MY[j] * sa;
  const my = F.MX[j] * sa + F.MY[j] * ca;
  const x = mx + (F.FX[j] - mx) * llegada;
  const y = my + (F.FY[j] - my) * llegada;
  poner(p, bx + x, by + y, (S4[i] - 0.5) * 0.04 * (1 - llegada));
  // destello que recorre la flecha de la cola a la punta en cada empujón
  const dq = (s - pulsoQ) / 0.12;
  const destello = pulsoK * Math.exp(-dq * dq);
  const vf = (1.15 + 0.12 * Math.sin(t * 2.3 + s * 6) + 1.1 * destello) * llegada;
  const vm = 0.11 * (1 - llegada) * (0.7 + 0.3 * Math.sin(t * 1.7 + S2[i] * 12));
  poner(
    c,
    C.naranja[0] * vf + 0.35 * vm,
    C.naranja[1] * vf + 0.6 * vm + 0.3 * destello * llegada,
    C.naranja[2] * vf + 1.0 * vm + 0.1 * destello * llegada,
  );
  return 0.03 + 0.008 * llegada + 0.01 * destello;
}

export function forma(i, t, p, c, ts) {
  if (ts !== tsCache) preparar(ts);

  // ---- línea del ecuador ----
  if (i < N_LINEA) {
    const nucleo = i < N_LINEA_NUCLEO;
    // x uniforme en los dos tramos, a ambos lados del «0»
    const tramo = L_X - HUECO;
    const s = S1[i] * 2 * tramo;
    const x = s < tramo ? -L_X + s : HUECO + (s - tramo);
    const g = nucleo ? 0.026 : 0.11;
    poner(p, x, LY + (S2[i] - 0.5) * g, (S4[i] - 0.5) * g);
    const borde = suave((Math.abs(x) - HUECO) / 0.06);
    const chispa = 0.85 + 0.15 * Math.sin(Math.abs(x) * 7 - t * 2.4);
    const v = (nucleo ? 1.45 : 0.32) * chispa * borde;
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return nucleo ? 0.036 : 0.06;
  }

  // ---- el «0» ----
  if (i < I_LETRAS) {
    const j = i - I_CERO;
    poner(p, ZX[j], LY + ZY[j], (S4[i] - 0.5) * 0.03);
    const brillo = 0.88 + 0.12 * Math.sin(ZA[j] * 2 - t * 1.8);
    const v = ZB[j] * brillo * ceroBrillo;
    poner(c, 1.0 * v, 0.96 * v, 0.9 * v);
    return ZT[j];
  }

  // ---- letras N (norte) y S (sur) ----
  if (i < I_B1) {
    const j = i - I_LETRAS;
    if (j < N_LETRA) poner(p, NX_[j], NY_[j], 0);
    else poner(p, SX_[j - N_LETRA], SY_[j - N_LETRA], 0);
    const v = 0.92 + 0.08 * Math.sin(t * 1.4 + j * 0.05);
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return 0.026;
  }

  // ---- barreños ----
  if (i < I_B2) return barreno(i - I_B1, i, t, ts, B1X, B1Y, 1, p, c);
  if (i < I_F1) return barreno(i - I_B2, i, t, ts, B2X, B2Y, -1, p, c);

  // ---- flechas del empujón ----
  if (i < I_F2) return flecha(i - I_F1, i, t, ts, B1X, B1Y, 1, F1, p, c);
  return flecha(i - I_F2, i, t, ts, B2X, B2Y, -1, F2, p, c);
}
