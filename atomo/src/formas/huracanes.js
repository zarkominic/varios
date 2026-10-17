// Escena 9: «En Sídney, horario. Solo con un tanque así gana la Tierra. En los huracanes,
// Coriolis manda de verdad». Primero, un tanque ancho visto desde arriba con el agua girando
// despacio en sentido horario hacia el desagüe. Desde ~3,2 s el borde del tanque se pone
// de canto y queda como la línea del ecuador, y el agua se reparte en dos huracanes vistos
// desde el espacio: arriba (norte) gira en sentido antihorario; abajo (sur), en espejo,
// en sentido horario. Los brazos espirales se arrastran por detrás del giro, así que el
// sentido se reconoce también en una imagen fija. En el vídeo, la transformación sigue a la
// palabra «huracanes» y cada huracán se ilumina (y sus flechas destellan) cuando la voz dice
// su sentido y su hemisferio.
import { N, TAU, S1, S2, S3, S4, C, poner, marca } from './base.js';

export const camara = { pos: [0, 0.4, 7], mira: [0, 0.4, 0], balanceo: 0 };

const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

// --- geometría ---------------------------------------------------------------
const EY = 0.85; // ecuador y centro del tanque
const RT = 1.12; // radio del tanque
const HX = 0; // centro de los huracanes
const HN = 1.54; // huracán norte
const HS = 0.16; // huracán sur
const RO = 0.6; // radio exterior de los brazos
const L_ECUADOR = 1.55; // al ponerse de canto, el borde se estira hasta salir del encuadre

// --- coreografía ---------------------------------------------------------------
const TM0 = 3.2; // empieza la transformación (por defecto; con voz, 0,8 s antes de «huracanes»)
let TM = TM0;
const D_RETRASO = 0.55; // el huracán se forma de dentro afuera
const D_VIAJE = 1.15; // duración del viaje de cada partícula
const W_TANQUE = 0.42; // giro del tanque (rad/s, horario)
const W_HUR = 0.7; // giro de los huracanes (rad/s)
const GIRO_VIAJE = 2.2; // cuánto gira cada partícula alrededor de su huracán mientras viaja
const CG0 = Math.cos(GIRO_VIAJE);
const SG0 = Math.sin(GIRO_VIAJE);

// --- reparto de partículas ---------------------------------------------------
const N_BORDE = 800; // borde del tanque → ecuador
const N_AGUA = N - N_BORDE; // agua del tanque → huracanes
const I_AGUA = N_BORDE;

// --- el agua del tanque (posición relativa al centro del tanque) -------------------
const T_BRAZOS = 6;
const T_TORSION = 0.85;
const tq = new Float64Array(2);
function tanque(i, ts) {
  const j = i - I_AGUA;
  if (S3[i] < 0.03) {
    // desagüe: un aro pequeño en el centro
    const a = TAU * S1[i] - W_TANQUE * ts * 2.5;
    const r = 0.05 + (S2[i] - 0.5) * 0.012;
    tq[0] = r * Math.cos(a);
    tq[1] = r * Math.sin(a);
    return -3;
  }
  if (S3[i] < 0.5) {
    // cuerpo de agua: gira como un todo, algo más deprisa cerca del desagüe
    const r = RT * 0.94 * Math.sqrt(0.004 + 0.996 * S2[i]);
    const a = TAU * S4[i] - W_TANQUE * ts * (1 + 0.7 * (1 - r / RT));
    tq[0] = r * Math.cos(a);
    tq[1] = r * Math.sin(a);
    return -1 - r / RT; // negativo: cuerpo (y su radio, para el color)
  }
  // brazos en espiral hacia el desagüe (horario: el ángulo baja al acercarse al centro)
  const u = (S1[i] + ts * 0.11) % 1;
  const rn = 1 - 0.9 * u;
  const a = ((j % T_BRAZOS) * TAU) / T_BRAZOS + (S2[i] - 0.5) * 0.2 - (W_TANQUE * ts + T_TORSION * Math.log(1 / rn));
  const r = RT * 0.93 * rn;
  tq[0] = r * Math.cos(a);
  tq[1] = r * Math.sin(a);
  return u;
}

// --- reparto del agua entre los dos huracanes ----------------------------------
// Al empezar la transformación, el agua de la mitad de arriba va al huracán norte y la de
// abajo al sur. Dentro de cada uno, las partículas más cercanas a su centro forman el ojo y
// el núcleo, y las más lejanas los brazos: así el huracán se condensa donde ya estaba el agua.
const HEMI = new Int8Array(N); // +1 norte, −1 sur
const ROL = new Int8Array(N); // 0 pared del ojo, 1 núcleo, 2 brazos, 3 flechas de giro
const RET = new Float32Array(N); // retraso de su viaje
const HA = new Float32Array(N); // ángulo base
const HU = new Float32Array(N); // parámetro radial (núcleo) o número de brazo
const HB = new Float32Array(N); // brillo
const HR = new Float32Array(N); // azar propio (sin correlación con S1..S4)
let semilla = 90731;
const azar = () => {
  semilla = (semilla * 16807) % 2147483647;
  return (semilla - 1) / 2147483646;
};
// Brazos: tres principales separados 120° y uno corto y tenue entre ellos.
const N_BRAZOS = 4;
const ANG_BRAZO = [0, TAU / 3, (2 * TAU) / 3, TAU / 6];
const LARGO_BRAZO = [1.0, 0.88, 0.78, 0.55];
const BRILLO_BRAZO = [1.0, 0.92, 0.85, 0.6];
const PESO_BRAZO = [0.34, 0.3, 0.26, 0.1];
{
  const listas = [[], []];
  for (let i = I_AGUA; i < N; i++) {
    tanque(i, TM0);
    const y = EY + tq[1];
    const norte = y >= EY;
    HEMI[i] = norte ? 1 : -1;
    const cy = norte ? HN : HS;
    listas[norte ? 0 : 1].push([Math.hypot(tq[0] - HX, y - cy), i, tq[0]]);
  }
  for (const lista of listas) {
    lista.sort((a, b) => a[0] - b[0]);
    const n = lista.length;
    const flechas = [];
    for (let k = 0; k < n; k++) {
      const i = lista[k][1];
      const q = k / n;
      RET[i] = D_RETRASO * q;
      HR[i] = azar();
      HB[i] = 0.78 + 0.44 * azar();
      if (q < 0.07) {
        ROL[i] = 0;
        HA[i] = TAU * azar();
        HU[i] = azar();
      } else if (q < 0.36) {
        ROL[i] = 1;
        HU[i] = azar();
        // la mitad del núcleo continúa los brazos hacia dentro; el resto, nube uniforme
        HA[i] = azar() < 0.45 ? ANG_BRAZO[Math.floor(azar() * 3)] + 100 : TAU * azar();
      } else if (q >= 0.86) {
        // flechas de giro a los lados del huracán (las partículas más lejanas)
        ROL[i] = 3;
        flechas.push(lista[k]);
      } else {
        ROL[i] = 2;
        let x = azar();
        let b = 0;
        while (b < N_BRAZOS - 1 && x > PESO_BRAZO[b]) x -= PESO_BRAZO[b++];
        HU[i] = b;
        HA[i] = ANG_BRAZO[b];
      }
    }
    // flechas: la mitad que viene de la izquierda del tanque forma la flecha izquierda (1)
    // y la otra mitad la derecha (0), para que sean iguales y el viaje sea corto
    // A lo largo de cada flecha se reparten de forma estratificada (sin huecos); la cola
    // llega antes que la punta, así que la flecha se dibuja en el sentido de giro.
    flechas.sort((a, b) => a[2] - b[2]);
    const mitad = Math.floor(flechas.length / 2);
    for (let k = 0; k < flechas.length; k++) {
      const i = flechas[k][1];
      const izq = k < mitad;
      HU[i] = izq ? 1 : 0;
      const n = izq ? mitad : flechas.length - mitad;
      const j = izq ? k : k - mitad;
      // orden pseudoaleatorio dentro de la flecha para que el viaje no vaya en bloque
      const pos = (j * 7919) % n;
      HA[i] = (pos + HR[i]) / n;
      RET[i] = D_RETRASO + 0.5 + 0.55 * HA[i];
    }
  }
}

// --- un huracán (posición absoluta en hx[0..1], brillo en hx[2]) -------------------
// Se calcula siempre el del norte (antihorario, brazos que se arrastran en sentido horario
// hacia fuera) y el del sur es su reflejo respecto al ecuador: dir = −1 invierte y.
const K_ESPIRAL = 2.6; // torsión de los brazos
const R_OJO = 0.12; // radio de la pared del ojo (el ojo queda oscuro dentro)
const R_NUCLEO = 0.33; // hasta aquí llega la nubosidad densa
const R_BRAZO = 0.2; // donde nacen los brazos
const R_FLECHA = 0.78; // flechas de giro
const F_BARRIDO = 0.9; // ángulo que abarca cada arco
const F_ARCO = 0.66; // fracción de partículas en el arco (el resto, la punta)
const hx = new Float64Array(3);
let fase = 0;
let pulsoN = -1; // destello que recorre las flechas en el sentido de giro (norte y sur)
let pulsoS = -1;
let realceN = 1; // brillo de cada huracán: sube cuando la voz lo nombra
let realceS = 1;
function huracan(i, ts, dir, cy) {
  const rol = ROL[i];
  let r, a, v, tam;
  if (rol === 0) {
    // pared del ojo: anillo brillante y nítido que gira deprisa
    r = R_OJO + (HU[i] - 0.5) * 0.034;
    a = HA[i] + fase * 2.2;
    v = 1.0 * HB[i];
    tam = 0.032;
  } else if (rol === 1) {
    // núcleo: nube densa que se difumina hacia fuera
    const s = HU[i];
    r = R_OJO + 0.022 + (R_NUCLEO - R_OJO) * s ** 0.85;
    if (HA[i] >= 100) {
      // continuación de un brazo hacia dentro
      a = HA[i] - 100 + fase * 1.3 - K_ESPIRAL * Math.log(r / R_BRAZO) + (HR[i] - 0.5) * 0.7;
    } else {
      a = HA[i] + fase * 1.3;
    }
    v = (0.95 - 0.45 * s) * HB[i];
    tam = 0.042;
  } else if (rol === 3) {
    // flecha curva fina a un lado: arco de radio R_FLECHA y punta al final, en el sentido de giro
    const sa = HA[i];
    const lado = HU[i] * Math.PI;
    if (sa < F_ARCO) {
      const s = sa / F_ARCO;
      r = R_FLECHA + (HR[i] - 0.5) * (0.012 + 0.026 * s);
      a = lado + F_BARRIDO * (s - 0.5);
    } else {
      // punta: triángulo (muestreo uniforme en área) en el extremo del arco
      const s = 1 - Math.sqrt((sa - F_ARCO) / (1 - F_ARCO));
      const w = (HR[i] - 0.5) * 0.17 * (1 - s);
      r = R_FLECHA + w;
      a = lado + F_BARRIDO * 0.5 - 0.01 + (s * 0.16) / R_FLECHA;
    }
    const dq = (sa - (dir > 0 ? pulsoN : pulsoS)) / 0.14;
    v = (1.1 + 0.9 * Math.exp(-dq * dq)) * (0.9 + 0.2 * HB[i]);
    tam = 0.034;
  } else {
    // brazos espirales: el aire entra girando y la nube dibuja una espiral que se arrastra
    const brazo = HU[i];
    const u = (S1[i] + ts * 0.07) % 1; // 0 fuera → 1 dentro
    const ln = 1.04 * LARGO_BRAZO[brazo] * (1 - u); // ln(r / R_BRAZO)
    const grueso = 0.12 + 0.16 * u; // más anchos cerca del núcleo, afilados en la punta
    r = R_BRAZO * Math.exp(ln) * (1 + (S2[i] - 0.5) * grueso);
    a = HA[i] + fase - K_ESPIRAL * ln + (HR[i] - 0.5) * (0.18 + 0.2 * u);
    const entrada = Math.min(1, u * 3);
    const textura = 0.74 + 0.26 * Math.sin(u * 37 + brazo * 2.3 + HR[i] * 2);
    v = entrada * (0.42 + 0.68 * u) * textura * BRILLO_BRAZO[brazo] * HB[i];
    tam = 0.044 - 0.008 * u;
  }
  hx[0] = HX + r * Math.cos(a);
  hx[1] = cy + dir * r * Math.sin(a);
  hx[2] = v * (dir > 0 ? realceN : realceS);
  return tam;
}

// Color de un huracán: blanco en el núcleo, azulado hacia las puntas de los brazos.
function colorHuracan(i, c, v) {
  const rol = ROL[i];
  if (rol === 0) poner(c, 1.0 * v, 0.98 * v, 0.95 * v);
  else if (rol === 1) poner(c, 0.93 * v, 0.97 * v, 1.0 * v);
  else if (rol === 2) poner(c, 0.74 * v, 0.88 * v, 1.0 * v);
  else poner(c, 0.45 * v, 0.82 * v, 1.0 * v);
}

// --- valores por fotograma ---------------------------------------------------
let tsCache = NaN;
let canto = 0; // 0 tanque visto desde arriba, 1 de canto (= ecuador)
let reparto = 0; // reparto uniforme de las partículas a lo largo del ecuador
function preparar(ts) {
  tsCache = ts;
  TM = marca('huracanes', 4.0) - 0.8;
  fase = W_HUR * ts;
  canto = suave((ts - TM) / 1.1);
  reparto = suave((ts - TM - 0.7) / 1.0);
  // «antihorarios en el norte, horarios en el sur»: cada huracán destaca mientras se nombra.
  const an = marca('antihorarios', 5.8) - 0.1;
  const as = marca('horarios', 7.4) - 0.1;
  const ventana = (a, b) => suave((ts - a) / 0.25) * (1 - suave((ts - b) / 0.4));
  const gN = ventana(an, marca('norte_fin', an + 1.5));
  const gS = ventana(as, marca('sur_fin', as + 0.9));
  realceN = 1 + 0.35 * gN - 0.3 * gS;
  realceS = 1 + 0.35 * gS - 0.3 * gN;
  const barrido = (q) => (q > 0 ? ((q % 1.6) / 1.1) * 1.3 - 0.15 : -1);
  pulsoN = barrido(ts - an);
  pulsoS = barrido(ts - as);
}

export function forma(i, t, p, c, ts) {
  if (ts !== tsCache) preparar(ts);

  // ---- borde del tanque → línea del ecuador ----
  if (i < N_BORDE) {
    // el tanque gira con su reloj propio (ts desplazado), así su fase al transformarse no cambia
    const a = TAU * S1[i] - W_TANQUE * Math.min(ts - TM + TM0, TM0 + 0.4);
    const labio = S3[i] < 0.25;
    const r = RT * (labio ? 1.04 : 1) + (S2[i] - 0.5) * 0.012;
    // se pone de canto (se aplana) y se estira hasta ser una línea uniforme de lado a lado
    const ca = Math.cos(a);
    // primero se aplana como un aro que se pone de canto; luego se reparte por igual a lo largo
    const xe = r * ca * (1 + (L_ECUADOR - 1) * canto);
    const xl = L_ECUADOR * RT * (2 / Math.PI) * Math.asin(ca);
    const x = xe + (xl - xe) * reparto;
    const halo = labio ? (S2[i] - 0.5) * 0.06 * canto : 0;
    const y = EY + r * Math.sin(a) * (1 - canto) + (S4[i] - 0.5) * 0.016 + halo;
    poner(p, x, y, 0);
    // de acero azulado a oro
    const vb = labio ? 0.35 : 1.1;
    const ve = labio ? 0.28 : 1.35;
    const ch = 0.86 + 0.14 * Math.sin(Math.abs(x) * 6 - t * 2);
    const ve2 = ve * (1 + 0.4 * Math.exp(-(((Math.abs(x) - (ts - TM - 0.9) * 1.4) / 0.25) ** 2)));
    poner(
      c,
      (0.62 * vb * (1 - canto) + C.sol[0] * ve2 * canto) * ch,
      (0.76 * vb * (1 - canto) + C.sol[1] * ve2 * canto) * ch,
      (1.0 * vb * (1 - canto) + C.sol[2] * ve2 * canto) * ch,
    );
    return labio ? 0.034 : 0.032;
  }

  // ---- agua → huracanes ----
  const dir = HEMI[i];
  const cy = dir > 0 ? HN : HS;
  const k = suave((ts - TM - RET[i]) / D_VIAJE);
  let tam;
  if (k >= 1) {
    tam = huracan(i, ts, dir, cy);
    poner(p, hx[0], hx[1], (S4[i] - 0.5) * 0.06);
    colorHuracan(i, c, hx[2]);
    return tam;
  }
  // agua del tanque
  const u = tanque(i, ts - TM + TM0);
  const tx = tq[0];
  const ty = EY + tq[1];
  let vt;
  let tt;
  let cr, cg, cb;
  if (u === -3) {
    vt = 0.95;
    cr = 0.75;
    cg = 0.85;
    cb = 1.0;
    tt = 0.024;
  } else if (u < 0) {
    const rr = -1 - u;
    vt = 0.36 + 0.08 * Math.sin(t * 1.3 + S2[i] * 30);
    cr = 0.22;
    cg = 0.45 + 0.1 * (1 - rr);
    cb = 1.0;
    tt = 0.036;
  } else {
    const entrada = Math.min(1, u * 5);
    const caida = Math.min(1, (1 - u) * 5);
    vt = entrada * caida * (0.45 + 0.5 * u);
    cr = 0.25 + 0.35 * u;
    cg = 0.6 + 0.25 * u;
    cb = 1.0;
    tt = 0.032 - 0.006 * u;
  }
  if (k <= 0) {
    poner(p, tx, ty, (S4[i] - 0.5) * 0.04);
    poner(c, cr * vt, cg * vt, cb * vt);
    return tt;
  }
  tam = huracan(i, ts, dir, cy);
  if (ROL[i] === 3) {
    // las flechas se dibujan sin remolino, en línea recta desde su lado del tanque
    poner(p, tx + (hx[0] - tx) * k, ty + (hx[1] - ty) * k, (S4[i] - 0.5) * 0.06 * (1 - k));
    colorHuracan(i, c, hx[2]);
    c[0] = c[0] * k + cr * vt * (1 - k);
    c[1] = c[1] * k + cg * vt * (1 - k);
    c[2] = c[2] * k + cb * vt * (1 - k);
    return tt + (tam - tt) * k;
  }
  // viaje en remolino hacia su huracán, girando en el sentido de ese huracán: se interpola
  // entre el origen (girado de antemano GIRO_VIAJE en su sentido) y el destino, y se deshace
  // ese giro poco a poco. El radio se cierra antes que el giro, así que el remolino ocurre
  // ya cerca del centro.
  const g = dir > 0 ? 1 : -1;
  const dx0 = tx - HX;
  const dy0 = ty - cy;
  const ox = dx0 * CG0 - g * dy0 * SG0;
  const oy = g * dx0 * SG0 + dy0 * CG0;
  const kr = 1 - (1 - k) * (1 - k) * (1 - k);
  const lx = ox + (hx[0] - HX - ox) * kr;
  const ly = oy + (hx[1] - cy - oy) * kr;
  const b = -g * GIRO_VIAJE * (1 - k);
  const cb2 = Math.cos(b);
  const sb2 = Math.sin(b);
  const campana = 4 * k * (1 - k);
  poner(p, HX + lx * cb2 - ly * sb2, cy + lx * sb2 + ly * cb2, (S4[i] - 0.5) * 0.06 * (1 + 3 * campana));
  const destello = 0.25 * campana;
  colorHuracan(i, c, hx[2]);
  c[0] = c[0] * k + cr * vt * (1 - k) + destello * 0.5;
  c[1] = c[1] * k + cg * vt * (1 - k) + destello * 0.7;
  c[2] = c[2] * k + cb * vt * (1 - k) + destello;
  return tt + (tam - tt) * k;
}
