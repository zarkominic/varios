// Escena 7: «¿Y el truco del ecuador? Ahí Coriolis no hace girar el agua. El giro lo pone el guía.»
// Toda la coreografía va anclada a las marcas de la voz (marca(); por defecto, las del español):
//  · «truco»: la demostración para turistas. Una línea dorada (el ecuador pintado en el suelo)
//    cruza el encuadre; encima, el barreño del norte gira en sentido antihorario; debajo, el del
//    sur gira en sentido horario. Cada uno lleva su letra (N, S) al lado.
//  · «Coriolis»: la luz de la línea se condensa en un «0» grande en el centro (Coriolis = 0 en el
//    ecuador) y el agua de los dos barreños empieza a FRENARSE; con «girar» ya está quieta: los
//    brazos del remolino se deshacen en una lámina en calma y el «0» brilla.
//  · «guía»: se dibuja junto a cada barreño una flecha curva naranja (la mano del guía); un
//    destello la recorre de la cola a la punta y, con ese empujón, el agua vuelve a girar
//    (antihorario arriba, horario abajo).
import { N, TAU, S1, S2, S3, S4, C, poner, marca, glifo } from './base.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const lim = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

// --- geometría ---------------------------------------------------------------
const LY = 0.85; // altura de la línea del ecuador
const L_X = 1.75; // la línea sale del encuadre por ambos lados
const CERO_A = 0.27; // semiejes del «0»
const CERO_B = 0.44;
const CERO_P = 2.35; // superelipse: un cero tipográfico, no una elipse
const HUECO = CERO_A + 0.1; // la línea se abre junto al «0» (que no parezca una θ)
const RB = 0.3; // radio de los barreños
const B1X = -0.8; // barreño norte (antihorario)
const B1Y = LY + 0.76;
const B2X = 0.8; // barreño sur (horario)
const B2Y = LY - 0.76;
const LETRA_H = 0.25; // altura de las letras N y S (entre su barreño y la línea)
const N_CX = B1X;
const N_CY = LY + 0.24;
const S_CX = B2X;
const S_CY = LY - 0.24;
const RA = RB + 0.13; // radio del arco de la flecha
const W0 = 1.6; // giro del agua (rad/s)
const IMPULSO = 0.9; // giro extra que da cada empujón (rad)
const P_EMPUJE = 1.3; // un empujón cada P_EMPUJE segundos
const N_BRAZOS = 5;
const TORSION = 1.25;

// --- reparto de partículas ---------------------------------------------------
const N_LINEA = 1300;
const N_LINEA_NUCLEO = 900;
const N_CERO = 1200;
const N_LETRA = 250;
const N_BARRENO = 1300;
const N_BORDE = 260;
const N_DESAGUE = 40;
const N_FLECHA = 700;
const N_ARCO = 460;
// Los barreños van primero: en la transición desde la escena anterior llegan antes y la
// demostración («truco») se lee cuanto antes.
const I_B1 = 0;
const I_B2 = I_B1 + N_BARRENO;
const I_LINEA = I_B2 + N_BARRENO;
const I_LETRAS = I_LINEA + N_LINEA;
const I_CERO = I_LETRAS + 2 * N_LETRA;
const I_F1 = I_CERO + N_CERO;
const I_F2 = I_F1 + N_FLECHA;
if (I_F2 + N_FLECHA !== N) throw new Error('ecuador_truco: reparto de partículas incorrecto');

// Desfase angular de cada partícula de agua cuando los brazos se deshacen en calma.
const DESF = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const v = S4[i] * 13.37 + S1[i] * 3.1;
  DESF[i] = (v - Math.floor(v) - 0.5) * TAU;
}

// --- el «0»: muestreo uniforme por longitud de arco de una superelipse --------
const ZX = new Float32Array(N_CERO);
const ZY = new Float32Array(N_CERO);
const ZA = new Float32Array(N_CERO); // ángulo (para el brillo que lo recorre)
const ZB = new Float32Array(N_CERO); // brillo
const ZT = new Float32Array(N_CERO); // tamaño
const Z0 = new Float32Array(N_CERO); // posición de partida, repartida a lo largo de la línea
const ZR = new Float32Array(N_CERO); // retraso del viaje de la línea al «0»
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
    ZB[j] = halo ? 0.34 : 1.4 + 0.25 * (1 - Math.abs(S2[i] - 0.5) * 2);
    ZT[j] = halo ? 0.05 : 0.036;
    // antes de «Coriolis» estas partículas son parte del brillo de la línea
    const xl = (S4[i] * 2 - 1) * 1.6;
    Z0[j] = xl;
    ZR[j] = 0.16 * Math.abs(xl) / 1.6;
  }
}

// Letras N y S: se muestrean (glifo) la primera vez que se dibujan, porque necesitan el navegador.
let LN = null;
let LS = null;

// --- flechas curvas: arco tangente al barreño y punta triangular ------------------
// dir = +1 antihorario, −1 horario. El arco va de th0 a th0 + dir·barrido.
function construirFlecha(i0, dir, th0, barrido) {
  const FX = new Float32Array(N_FLECHA); // posición final (relativa al barreño)
  const FY = new Float32Array(N_FLECHA);
  const FS = new Float32Array(N_FLECHA); // posición a lo largo de la flecha (0 cola, 1 punta)
  const MX = new Float32Array(N_FLECHA); // posición previa: bruma alrededor del barreño
  const MY = new Float32Array(N_FLECHA);
  const largoArco = RA * barrido;
  const largoPunta = 0.16;
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
      const ancho = 0.026 + 0.034 * s;
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
      const bx0 = RA * rx + rx * 0.09;
      const by0 = RA * ry + ry * 0.09;
      const bx1 = RA * rx - rx * 0.09;
      const by1 = RA * ry - ry * 0.09;
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
let flujo = 0; // avance acumulado del agua hacia el desagüe
let calma = 0; // 0 = remolino; 1 = brazos deshechos, agua quieta
let dibujo = 0; // progreso del dibujo de las flechas
let pulsoQ = -1; // posición del destello a lo largo de la flecha
let pulsoK = 0; // intensidad del destello
let golpe = 0; // agitación del agua justo tras el empujón
let abre = 0; // la línea se abre en el centro para dejar sitio al «0»
let tCero = 0; // inicio del viaje de la luz de la línea hacia el centro
let abreCero = 0; // el «0», aplastado en la línea, se abre en vertical
let ceroBrillo = 1;
let lineaK = 1;
// marcas
let T_COR = 1.75;
let T_FRENO0 = 1.85;
let T_FRENO1 = 2.9;
let T_ARRANQUE = 4.75;
let T_EMP = 4.58;

// Cuánto gira el agua (1 = remolino de la demostración, 0 = quieta).
function giroEn(x) {
  const frena = 1 - suave((x - T_FRENO0) / (T_FRENO1 - T_FRENO0));
  const arranca = suave((x - T_ARRANQUE) / 0.4);
  return frena > arranca ? frena : arranca;
}

function preparar(ts) {
  tsCache = ts;
  const mTruco = marca('truco', 0.55);
  T_COR = marca('coriolis', 1.75);
  const mGirar = marca('girar', 2.63);
  const mGuia = marca('guia', 4.63);
  // el agua empieza a frenar con «Coriolis» y está quieta poco después de «girar»
  T_FRENO0 = T_COR + 0.1;
  T_FRENO1 = Math.max(T_FRENO0 + 0.7, mGirar + 0.3);
  // la flecha del guía se dibuja justo antes de «guía»; su empujón vuelve a hacer girar el agua
  T_EMP = mGuia - 0.2;
  T_ARRANQUE = mGuia - 0.08;
  dibujo = lim((ts - (mGuia - 0.5)) / 0.32);

  // giro acumulado: integral de giroEn (paso fijo, una vez por fotograma)
  let integ = 0;
  const paso = 1 / 120;
  for (let x = 0; x < ts; x += paso) {
    const h = Math.min(paso, ts - x);
    integ += giroEn(x + 0.5 * h) * h;
  }
  let extra = 0;
  golpe = 0;
  for (let k = 0; k < 4; k++) {
    const tk = T_EMP + k * P_EMPUJE + 0.3; // el destello llega a la punta
    const x = (ts - tk + 0.2) / 0.6;
    extra += IMPULSO * suave(x);
    if (x > 0 && x < 1.6) golpe = Math.max(golpe, Math.sin((Math.PI * x) / 1.6));
  }
  fase = W0 * integ + extra;
  flujo = 0.3 * integ + 0.1 * extra;
  const g = giroEn(ts);
  calma = 1 - g;

  const q = ts - T_EMP;
  if (q >= 0) {
    const ciclo = q % P_EMPUJE;
    pulsoQ = ciclo / 0.42;
    pulsoK = ciclo < 0.6 ? 1 : 0;
  } else {
    pulsoQ = -1;
    pulsoK = 0;
  }

  // el «0»: la luz de la línea se condensa en él al decir «Coriolis»
  tCero = T_COR - 0.5;
  abre = suave((ts - (T_COR - 0.42)) / 0.4);
  abreCero = suave((ts - (T_COR - 0.1)) / 0.38);
  // brilla al formarse, sigue encendido mientras el agua está quieta y vuelve a destellar con «girar»
  const a = (ts - (T_COR + 0.45)) / 0.35;
  const b = (ts - (mGirar + 0.1)) / 0.4;
  const sosten = suave((ts - T_COR) / 0.5) * (1 - 0.6 * suave((ts - mGuia + 0.4) / 0.5));
  ceroBrillo = 0.95 + 0.25 * Math.exp(-a * a) + 0.3 * Math.exp(-b * b) + 0.22 * sosten;
  // la línea destella un poco al decir «truco» (la demostración)
  const tr = (ts - (mTruco + 0.15)) / 0.45;
  lineaK = 1 + 0.25 * Math.exp(-tr * tr);
}

// Barreño (borde, desagüe y agua) con centro (bx, by) y sentido dir.
function barreno(j, i, t, bx, by, dir, p, c) {
  if (j < N_BORDE) {
    // borde del barreño: anillo fino y un labio exterior más tenue
    const a = TAU * S1[i];
    const labio = S3[i] < 0.35;
    const r = RB * (labio ? 1.075 : 1) + (S2[i] - 0.5) * 0.012;
    poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), 0);
    const v = (labio ? 0.38 : 0.95) * (0.9 + 0.1 * Math.sin(a * 3 + t));
    poner(c, 0.62 * v, 0.78 * v, 1.0 * v);
    return 0.03;
  }
  if (j < N_BORDE + N_DESAGUE) {
    const a = TAU * S1[i] + dir * fase * 1.6;
    const r = 0.035 + (S2[i] - 0.5) * 0.008;
    poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), 0.01);
    poner(c, 0.75, 0.85, 1.0);
    return 0.022;
  }
  // agua: brazos en espiral que fluyen hacia el desagüe; su torsión sigue al giro.
  // En calma, los brazos se deshacen en una lámina uniforme con ondas concéntricas muy suaves.
  const brazo = j % N_BRAZOS;
  const cuerpo = S3[i] < 0.22; // agua de fondo, sin brazos
  let u = (S1[i] + flujo) % 1;
  if (u < 0) u += 1;
  const rn = cuerpo ? 0.15 + 0.82 * Math.sqrt(S2[i]) : 1 - 0.86 * u;
  const desv = cuerpo ? TAU * S4[i] : (brazo * TAU) / N_BRAZOS + (S2[i] - 0.5) * 0.3;
  let a = desv + dir * (fase + TORSION * Math.log(1 / rn));
  let rr = rn;
  if (!cuerpo) {
    const rc = 0.13 + 0.84 * Math.sqrt(1 - u);
    rr = rn + (rc - rn) * calma;
    a += DESF[i] * calma;
  }
  const r = RB * 0.93 * rr * (1 + 0.025 * golpe * Math.sin(a * 3 + t * 9));
  poner(p, bx + r * Math.cos(a), by + r * Math.sin(a), (S4[i] - 0.5) * 0.03);
  const onda = 0.5 + 0.5 * Math.sin(26 * rr - 1.4 * t);
  if (cuerpo) {
    const v = 0.3 + 0.12 * golpe + 0.1 * calma * onda;
    poner(c, 0.2 * v, 0.45 * v, 1.0 * v);
    return 0.034;
  }
  const entrada = Math.min(1, u * 5);
  const caida = Math.min(1, (1 - u) * 4);
  const vs = entrada * caida * (0.62 + 0.68 * u) * (1 + 0.35 * golpe);
  const vc = 0.16 + 0.55 * onda * onda * onda;
  const v = vs + (vc - vs) * calma;
  const w = u * (1 - calma);
  poner(c, (0.25 + 0.35 * w) * v, (0.6 + 0.25 * w) * v, 1.0 * v);
  return 0.032 - 0.008 * w;
}

// Flecha curva naranja: antes de dibujarse, sus partículas son bruma tenue alrededor del barreño.
function flecha(j, i, t, bx, by, dir, F, p, c) {
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
  const dq = (s - pulsoQ) / 0.13;
  const destello = pulsoK * Math.exp(-dq * dq);
  const vf = (1.2 + 0.12 * Math.sin(t * 2.3 + s * 6) + 0.8 * destello) * llegada;
  const vm = 0.1 * (1 - llegada) * (0.7 + 0.3 * Math.sin(t * 1.7 + S2[i] * 12));
  poner(
    c,
    C.naranja[0] * vf + 0.35 * vm,
    C.naranja[1] * vf + 0.6 * vm + 0.3 * destello * llegada,
    C.naranja[2] * vf + 1.0 * vm + 0.1 * destello * llegada,
  );
  return 0.03 + 0.009 * llegada + 0.01 * destello;
}

export function forma(i, t, p, c, ts) {
  if (ts !== tsCache) preparar(ts);

  // ---- barreños ----
  if (i < I_B2) return barreno(i - I_B1, i, t, B1X, B1Y, 1, p, c);
  if (i < I_LINEA) return barreno(i - I_B2, i, t, B2X, B2Y, -1, p, c);

  // ---- línea del ecuador: entera durante la demostración; se abre en el centro para el «0» ----
  if (i < I_LETRAS) {
    const nucleo = i - I_LINEA < N_LINEA_NUCLEO;
    const tramo = L_X - HUECO;
    const s = S1[i] * 2 * tramo;
    const xHueco = s < tramo ? -L_X + s : HUECO + (s - tramo);
    const xEntera = (S1[i] * 2 - 1) * L_X;
    const x = xEntera + (xHueco - xEntera) * abre;
    const g = nucleo ? 0.026 : 0.11;
    poner(p, x, LY + (S2[i] - 0.5) * g, (S4[i] - 0.5) * g);
    const borde = 1 - abre * (1 - suave((Math.abs(x) - HUECO) / 0.06));
    const chispa = 0.85 + 0.15 * Math.sin(Math.abs(x) * 7 - t * 2.4);
    const v = (nucleo ? 1.45 : 0.32) * chispa * borde * lineaK;
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return nucleo ? 0.036 : 0.06;
  }

  // ---- letras N (norte) y S (sur), cada una junto a su barreño ----
  if (i < I_CERO) {
    if (LN === null) {
      LN = glifo('N', N_LETRA, { semilla: 5 });
      LS = glifo('S', N_LETRA, { semilla: 9 });
    }
    const j = i - I_LETRAS;
    if (j < N_LETRA) poner(p, N_CX + LN[2 * j] * LETRA_H, N_CY + LN[2 * j + 1] * LETRA_H, 0);
    else {
      const k = j - N_LETRA;
      poner(p, S_CX + LS[2 * k] * LETRA_H, S_CY + LS[2 * k + 1] * LETRA_H, 0);
    }
    const v = 1.3 + 0.08 * Math.sin(t * 1.4 + j * 0.05);
    poner(c, C.sol[0] * v, C.sol[1] * v, C.sol[2] * v);
    return 0.03;
  }

  // ---- el «0»: primero brillo de la línea; con «Coriolis» la luz se condensa en él ----
  if (i < I_F1) {
    const j = i - I_CERO;
    // 1) la luz corre por la línea hacia el centro y forma una lente plana;
    // 2) la lente se abre en vertical y queda el «0»
    const m = suave((ts - tCero - ZR[j]) / 0.36);
    const x0 = Z0[j];
    const h = 0.05 + 0.95 * abreCero;
    const y = LY + (S2[i] - 0.5) * 0.05 * (1 - abreCero) + ZY[j] * h;
    poner(p, x0 + (ZX[j] - x0) * m, LY + (y - LY) * m, (S4[i] - 0.5) * 0.03);
    const brillo = 0.88 + 0.12 * Math.sin(ZA[j] * 2 - t * 1.8);
    const vz = ZB[j] * brillo * ceroBrillo * (0.45 + 0.55 * abreCero);
    const vl = 0.42 * lineaK;
    const k = 1 - m;
    poner(c, C.sol[0] * vl * k + 1.0 * vz * m, C.sol[1] * vl * k + 0.96 * vz * m, C.sol[2] * vl * k + 0.9 * vz * m);
    return 0.04 + (ZT[j] - 0.04) * m;
  }

  // ---- flechas del empujón ----
  if (i < I_F2) return flecha(i - I_F1, i, t, B1X, B1Y, 1, F1, p, c);
  return flecha(i - I_F2, i, t, B2X, B2Y, -1, F2, p, c);
}
