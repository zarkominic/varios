// Fontanería y decorados del episodio 37 (La señal «Wow!»: setenta y dos segundos que nadie ha vuelto a oír) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la gran oreja en su campo de Ohio
// (oreja), B la sala de la computadora en 1977 (sala), C la mesa de Ehman y el listado (listado), D el cielo (cielo),
// E otros telescopios (telescopios), F el archivo de papeles (archivo) y G hoy, con un despacho de 1959 (hoy).
// CUIDADO (es un misterio abierto y la gente lo cuenta con mucho ruido):
// · NADA DE EXTRATERRESTRES: ni platillos, ni hombrecillos verdes, ni ojos en el cielo, ni rayos que bajan. La señal se
//   dibuja como lo que es: una curva, una raya en un dial, una línea de cifras en papel.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Las DOS EXCEPCIONES, porque son el objeto de la
//   historia: la línea «6EQUJ5» del listado y la palabra «Wow!» escrita a mano en rojo (dibujadas píxel a píxel como
//   letras de impresora y de bolígrafo, con su propia rejilla; las da piezaListado() más abajo, que se comparte).
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales.
// · Los objetos NO tienen cara (las bocinas, las impresoras, los telescopios no sonríen ni miran: se inclinan, tiemblan).
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila (cielo liso o pared en dos tonos casi iguales), y la barra
//   del año (x 20–170, y 0–14; las cifras del año bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_WO (krausWO, cocconiWO, morrisonWO, ehmanWO, voluntario1WO, voluntaria2WO, grayWO,
// marvelWO, caballeroWO, abelWO, mendezWO) y los que ya existen en ELENCO_CHIBI (genéricos: EL.turista1…). Los escribe
// pixel-chibi.js (T.ELENCO_WO).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }. Lo dibujado tiene que cuadrar con esos
// números (o se cambian aquí y en las escenas).
// LA BARRA DEL AÑO: tres tramos, 1956–1977 (la oreja), 1978–2000 (la antena) y 2001–2027 (el papel). 1959 cae en el
// primero.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · LA GRAN OREJA (Big Ear): en un campo llano de Ohio (hierba, maizales al fondo, una granja, un bosquecillo). Dos
//   MUROS DE METAL enfrentados: a la IZQUIERDA el reflector PLANO, alto e INCLINADO hacia atrás, una celosía de vigas
//   blancas con su chapa de aluminio gris; a la DERECHA el reflector CURVO (parabólico), más bajo, de chapa gris con
//   costillas. Entre los dos, el SUELO de aluminio, enorme, plano y brillante como un lago de metal (refleja el cielo),
//   con sus juntas en rejilla. Junto al reflector curvo, sobre el suelo, el CARRO de las bocinas: dos bocinas (dos
//   embudos rectangulares de metal, uno junto al otro, apuntando al reflector curvo) sobre un carrito con ruedas en un
//   raíl corto. A un lado, la CASETA de los receptores (de bloques, tejado plano, una puerta, una antena pequeña, un
//   coche de los setenta aparcado). De noche: estrellas, la Vía Láctea, el suelo de metal que refleja las estrellas.
// · EL LISTADO: papel continuo de impresora, blanco algo amarillento, con las bandas verdes claras alternas y los
//   agujeros de arrastre a los dos lados (las «orejas» perforadas). Columnas de caracteres de impresora: casi todo «1» y
//   espacios en blanco; en una columna, de arriba abajo, la secuencia 6, E, Q, U, J, 5. El círculo y el «Wow!» en el
//   margen izquierdo, en ROJO a mano. piezaListado(R, x, y, o) lo dibuja (abajo): úsala en los dos decorados que lo
//   enseñan (listado y archivo) para que sea el mismo papel.
// · LA SEÑAL COMO CURVA: una campana de seis escalones (las seis lecturas de 12 s) que sube y baja; la U arriba. Se
//   dibuja en ámbar sobre papel o en verde sobre pantalla de fósforo.
//
//   import * as T from '/atomo/plato/escenas/wo-comun.js';
//   const { E, R, M } = await T.preparar('wo-gancho');
//   T.rodar(E, R, [[0, (t) => T.oreja(R, t, { encuadre: 'campo', luz: 'noche' })]], { año: 1977 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras };
// el reparto del episodio (ELENCO_WO) lo crea pixel-chibi.js
export const ELENCO_WO = KIT.ELENCO_WO || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el aluminio de la gran oreja (tres tonos y el brillo), la celosía blanca, la hierba y el maíz de Ohio, el papel
    // del listado y sus bandas verdes, la tinta roja del bolígrafo, el fósforo verde y el ámbar de las pantallas, el
    // cielo de noche y la nube de hidrógeno
    alu: '#a8b0b8', aluS: '#6e7680', aluL: '#dce2e8', aluB: '#f4f8fc', celosia: '#eef0f0', hierba: '#6a9a3a', hierbaS: '#4a7228',
    maiz: '#c8b04a', papel: '#f4efe0', papelS: '#d8d0b8', banda: '#d8ecd0', rojo: '#d02a2a', fosforo: '#5aff8a', ambar: '#ffb43a',
    noche: '#0e1428', nocheL: '#24305a', hidrogeno: '#c06ae0', hidrogenoL: '#f0b8ff', magnetar: '#9ad8ff',
  }),
};

const ATOM = [297, 24];
// Atom arriba a la derecha, grande y solo (GUIA-ESTILO.md)
function conAtomGrande(R) {
  R.companero = (t, e = 0) => {
    const x = ATOM[0], y = ATOM[1] + Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)), r = 13 + 2.4 * e;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) R.pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
    R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e });
  };
  R.caja = () => {};
}

export async function preparar(id) {
  const E = await escena(id, 'ep37');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1956–1977 (la gran oreja: se construye, escucha y oye el «Wow!»), 1978–2000 (las búsquedas y
  // el derribo), 2001–2027 (los papeles: las fotos, Puerto Rico, los cincuenta años)
  Object.assign(R.ICONOS, {
    oreja: ['#.....#', '##...##', '#.#.#.#', '#..#..#', '#.....#', '.#...#.', '..###..'],
    antena: ['#.....#', '.#...#.', '..#.#..', '...#...', '...#...', '..###..', '.#####.'],
    papel: ['#######', '#.....#', '#.###.#', '#.....#', '#.##..#', '#.....#', '#######'],
  });
  R.tramosTiempo([[1956, 1977, R.PALA.ORO, 'oreja'], [1978, 2000, R.PALA.AZUL ?? R.PALA.ROJO, 'antena'], [2001, 2027, R.PALA.ROJO, 'papel']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado por encima del suelo y el color oscuro
// por debajo, para que la página pinte
const provisional = (R, t, c0, c1, suelo = 180) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y >= suelo ? (h(x >> 1, y >> 1, 3) > 0.85 ? c0 : c1) : (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ESQUELETO: cada decorado tiene su tabla { encuadre: { cam: '<segunda cámara>', general: { col, geo }, <cam>: { col,
// geo } } }; la vista que piden las opciones (un encuadre que no existe cae en el primero; una cámara que no es la suya,
// en 'general') pinta su provisional y devuelve una copia de su geometría
function vista(R, t, o, V) {
  const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general', v = e[cam];
  provisional(R, t, hex(v.col[0]), hex(v.col[1]), v.geo.suelo ?? 180);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(v.geo)) };
}

// EL LISTADO (canon, compartido por listado, archivo y la impresora de la sala): papel continuo de impresora de o.w
// (por omisión 150) × o.hh (120) desde (x, y) arriba a la izquierda. Se ve: el papel blanco algo amarillento con su
// fibra, las BANDAS VERDES claras alternas (tres renglones cada una, solo entre las perforaciones), las dos tiras de
// arrastre con sus AGUJEROS redondos y su línea de picado, el PLIEGUE picado de cada hoja (cada o.pagina renglones: 22)
// con su sombra y su luz, y renglones de CARACTERES DE IMPRESORA de 3×5 píxeles (por o.s): casi todo «1» y espacios, algún
// 2 o 3, con la cinta que a ratos imprime más clara, y a la derecha una columna de cuatro cifras por renglón (el reloj).
// LAS ÚNICAS LETRAS DEL EPISODIO: la secuencia 6EQUJ5 en vertical y el «Wow!» a mano. Opciones:
//   o.s 1 | 2 | 3: la escala entera de todo el papel (agujeros, renglones, letras y trazos rojos); 1 por omisión.
//   o.col: la columna de canales de la secuencia (por omisión 1, la segunda); o.linea: su primer renglón, contado desde
//     el borde de arriba del papel (por omisión, el que la deja en el centro del papel).
//   o.rodea 0–1: el CÍRCULO ROJO a mano que se cierra alrededor de la secuencia (empieza arriba a la derecha, baja por la
//     izquierda y se pasa un poco al cerrarse); o.wow 0–1: el «Wow!» ROJO que se escribe en el margen izquierdo, trazo a
//     trazo (W, o, w, el palo y el punto de la exclamación).
//   o.resalta 0–1: un halo cálido detrás de la secuencia (el «de pronto»; aclara el papel, no la tinta).
//   o.desplaza: cuántos píxeles ha corrido el papel hacia arriba (bandas, agujeros, pliegues, renglones y lo que devuelve
//     corren juntos: la secuencia está siempre en su renglón del papel).
//   o.calido 0–1: tiñe el papel de la luz ámbar de una lámpara.
//   o.recorte [x0, y0, x1, y1]: solo pinta dentro (además del propio papel: la ranura de la impresora, el cristal…).
//   o.sombra (true): la sombra del papel abajo y a la derecha (2·s píxeles).
//   o.margen: el margen en blanco a la izquierda de los canales, donde cabe el «Wow!» (26·s).
//   o.agujero: el color de lo que se ve por los agujeros (un gris pardo oscuro).
//   o.soloRojo: no pinta el papel, solo los trazos rojos y el halo (para pintar el papel una vez en un búfer).
// TODO se recorta al papel (no usa R.rect). Devuelve { seq: [x, y] (el centro de la secuencia), wow: [x, y] (donde
// acaba el «Wow!»), punta: [x, y] (la punta del bolígrafo: el final de lo trazado; sin trazar, donde empieza el círculo, arriba
// a la derecha), anillo: [cx, cy, rx, ry], caja: [x0, y0, x1, y1] (el papel), paso: [ancho de columna, alto de renglón],
// cajaWow: [x0, y0, x1, y1] (donde va el «Wow!») }.
export function piezaListado(R, x, y, o = {}) {
  x = Math.round(x); y = Math.round(y);
  const s = Math.max(1, Math.min(3, Math.round(o.s ?? 1))), w = Math.round(o.w ?? 150), hh = Math.round(o.hh ?? 120), d = Math.round(o.desplaza ?? 0);
  const rc = o.recorte, cl = [Math.max(x, rc ? Math.round(rc[0]) : x, 0), Math.max(y, rc ? Math.round(rc[1]) : y, 0), Math.min(x + w - 1, rc ? Math.round(rc[2]) : 319, 319), Math.min(y + hh - 1, rc ? Math.round(rc[3]) : 179, 179)];
  const P = (px, py, c) => { px = Math.round(px); py = Math.round(py); if (px >= cl[0] && px <= cl[2] && py >= cl[1] && py <= cl[3]) R.pset(px, py, c); };
  const cal = Math.max(0, Math.min(1, o.calido ?? 0)), ti = (c) => cal > 0 ? c_mez(c, C.ambar, cal * 0.28) : c;
  const K = { papel: ti(C.papel), papelS: ti(C.papelS), fibra: ti(c_mez(C.papel, C.papelS, 0.45)), banda: ti(C.banda), bandaF: ti(c_mez(C.banda, C.papelS, 0.4)),
    perfo: ti(c_mez(C.papelS, C.k, 0.12)), luz: ti(hex('#fffbf0')), canto: ti(c_mez(C.papelS, C.k, 0.2)), tinta: hex('#33333f'), tintaL: hex('#5c5c6c'), tintaB: hex('#7a7a88'),
    agujero: o.agujero ?? hex('#4a4038'), agujeroL: c_mez(o.agujero ?? hex('#4a4038'), C.k, 0.35) };
  // la rejilla: la tira de arrastre (mh), el cuerpo entre perforaciones, el margen del «Wow!», los canales y el reloj
  const mh = 6 * s, cp = 4 * s, ph = 6 * s, g = Math.round(o.margen ?? 26 * s), pag = (o.pagina ?? 22) * ph;
  const bx0 = x + mh + 1, bx1 = x + w - 2 - mh, canal0 = bx0 + s + g, rx0 = bx1 - 2 * s - 4 * cp + s + 1;
  const ncol = Math.max(1, Math.floor((rx0 - 3 * s - canal0) / cp)), col = Math.max(0, Math.min(ncol - 1, o.col ?? 1));
  const linea = o.linea ?? Math.max(0, Math.round(hh / ph / 2 - 3)), arriba = (f) => y - d + 2 * s + f * ph;
  const sx = canal0 + col * cp + 1.5 * s - 0.5, sy = arriba(linea) + 17.5 * s - 0.5, rx = 1.3 * cp + s, ry = 20.5 * s;
  const wx = sx - rx - 2 * s - 22 * s, wy = sy - 7 * s;
  if (!o.soloRojo) {
    // la sombra del papel sobre lo que hay debajo (solo dentro de o.recorte)
    if (o.sombra !== false) { const sc = rc ? [Math.round(rc[0]), Math.round(rc[1]), Math.round(rc[2]), Math.round(rc[3])] : [0, 0, 319, 179];
      const os = (px, py) => { if (px >= sc[0] && px <= sc[2] && py >= sc[1] && py <= sc[3]) R.pset(px, py, c_mez(R.pget(px, py), C.k, 0.28)); };
      for (let py = y + 2 * s; py < y + hh + 2 * s; py++) for (let px = x + w; px < x + w + 2 * s; px++) os(px, py);
      for (let py = y + hh; py < y + hh + 2 * s; py++) for (let px = x + 2 * s; px < x + w; px++) os(px, py); }
    // el papel: bandas, fibra, perforaciones, pliegues y cantos, píxel a píxel dentro del recorte
    for (let py = cl[1]; py <= cl[3]; py++) {
      const pv = py - y + d, bandaOn = (Math.floor((pv - 2 * s) / (3 * ph)) & 1) === 1, pl = ((pv % pag) + pag) % pag;
      for (let px = cl[0]; px <= cl[2]; px++) {
        const qx = px - x, cuerpo = px >= bx0 && px <= bx1; let c = cuerpo && bandaOn ? K.banda : K.papel;
        const n = h(qx, pv, 43); if (n < 0.05) c = cuerpo && bandaOn ? K.bandaF : K.fibra;
        if ((px === bx0 - 1 || px === bx1 + 1) && (pv & 1)) c = K.perfo;
        if (pl === 0 && (qx & 1)) c = K.perfo; else if (pl === 0) c = K.papelS; else if (pl === 1) c = K.luz; else if (pl === pag - 1) c = c_mez(c, K.papelS, 0.5);
        if (qx === w - 1) c = K.canto; else if (qx === 0) c = K.luz;
        R.pset(px, py, c);
      }
    }
    // los agujeros de arrastre (cada 6·s, centrados en la tira)
    for (let k = Math.floor((d - mh) / mh) - 1; k * mh - d < hh + mh; k++) { const cy = y - d + k * mh + 3 * s;
      for (const cx of [x + 3 * s, x + w - 1 - 3 * s]) {
        if (s === 1) { P(cx - 1, cy - 1, K.agujeroL); P(cx, cy - 1, K.agujeroL); P(cx - 1, cy, K.agujero); P(cx, cy, K.agujero); P(cx + 1, cy, K.papelS); P(cx, cy + 1, K.papelS); }
        else for (let j = -s; j <= s; j++) for (let i = -s; i <= s; i++) { const r = Math.hypot(i + 0.5, j + 0.5); if (r <= s + 0.2) P(cx + i, cy + j, j < 0 ? K.agujeroL : K.agujero); else if (r <= s + 1.1 && i + j > 0) P(cx + i, cy + j, K.papelS); }
      }
    }
    // los renglones: casi todo «1» y espacios; la secuencia en su columna; el reloj a la derecha
    const glifo = (ch, gx, gy, c) => { const G = c_GLIFO[ch]; if (!G) return;
      for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (G[j][i] === '#') for (let b = 0; b < s; b++) for (let a = 0; a < s; a++) {
        const px = gx + i * s + a, py = gy + j * s + b; if (s > 1 && a === s - 1 && b === s - 1 && h(px, py + d, 44) < 0.5) continue;
        P(px, py, s > 1 && h(px, py - gy + j, 45) < 0.12 ? K.tintaB : c); } };
    const f0 = Math.max(0, Math.floor((d - 2 * s) / ph) - 1), f1 = Math.ceil((d + hh) / ph);
    for (let f = f0; f <= f1; f++) { const gy = arriba(f); if (gy > cl[3] || gy + 5 * s < cl[1]) continue;
      for (let c = 0; c < ncol; c++) { const enSeq = c === col && f >= linea && f < linea + 6, ch = enSeq ? '6EQUJ5'[f - linea] : f >= linea && f < linea + 6 && Math.abs(c - col) === 1 ? '' : c_car(c, f); if (!ch) continue;
        glifo(ch, canal0 + c * cp, gy, enSeq ? K.tinta : h(c, f, 46) < 0.18 ? K.tintaL : K.tinta); }
      const reloj = String(2200 + ((f * 7) % 7800) + Math.floor(f / 13)).padStart(4, '0');
      for (let i = 0; i < 4; i++) glifo(reloj[i], rx0 + i * cp, gy, h(f, 3, 47) < 0.3 ? K.tintaL : K.tinta);
    }
  }
  // el halo del «de pronto»: aclara y calienta el papel (no la tinta) alrededor de la secuencia
  const re = Math.max(0, Math.min(1, o.resalta ?? 0));
  if (re > 0) for (let j = -Math.ceil(ry + 3 * s); j <= ry + 3 * s; j++) for (let i = -Math.ceil(rx + 4 * s); i <= rx + 4 * s; i++) {
    const q = (i / (rx + 4 * s)) ** 2 + (j / (ry + 3 * s)) ** 2; if (q >= 1) continue; const px = Math.round(sx + i), py = Math.round(sy + j); if (px < cl[0] || px > cl[2] || py < cl[1] || py > cl[3]) continue;
    const c = R.pget(px, py), lum = (c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255); if (lum < 420) continue; if ((px + py) & 1 && q > 0.6) continue;
    R.pset(px, py, c_mez(c, hex('#fff2b0'), re * 0.55 * (1 - q)));
  }
  // los trazos rojos: el círculo (una elipse temblona que se pasa al cerrarse) y el «Wow!» (inclinado, en su caja)
  const anillo = []; { const N = 84, a0 = -1.05, a1 = a0 - Math.PI * 2 - 0.6;
    for (let i = 0; i <= N; i++) { const u = i / N, a = a0 + (a1 - a0) * u, wob = 1 + 0.05 * Math.sin(a * 3 + 0.7) + 0.03 * Math.sin(a * 7 + 2) + 0.08 * u; anillo.push([sx + Math.cos(a) * rx * wob, sy + Math.sin(a) * ry * wob]); } }
  const trazosWow = c_WOW.map((tr) => tr.map(([u, v]) => [wx + (u + (10 - v) * 0.16) * s, wy + v * s]));
  const tk = s >= 3 ? 3 : s >= 2 ? 2 : 1, rojos = [C.rojo, hex('#a81c20'), hex('#e8584a')];
  const rodea = Math.max(0, Math.min(1, o.rodea ?? 0)), wow = Math.max(0, Math.min(1, o.wow ?? 0));
  const pr = c_trazos(P, [anillo], rodea, tk, rojos, 48), pw = c_trazos(P, trazosWow, wow, tk, rojos, 49);
  const finWow = trazosWow[4][1];
  const punta = wow > 0 && wow < 1 ? pw : wow >= 1 ? finWow : rodea > 0 ? pr : anillo[0];
  return { seq: [Math.round(sx), Math.round(sy)], wow: [Math.round(finWow[0]), Math.round(finWow[1])], punta: [Math.round(punta[0]), Math.round(punta[1])],
    anillo: [Math.round(sx), Math.round(sy), Math.round(rx), Math.round(ry)], caja: [x, y, x + w - 1, y + hh - 1], paso: [cp, ph],
    cajaWow: [Math.round(wx), Math.round(wy), Math.round(wx + 23.6 * s), Math.round(wy + 10 * s)] };
}
// ── A · La gran oreja (Big Ear), en su campo de Ohio, de 1956 a 1998 ─────────────────────────────────────────────────
// oreja(R, t, o) pinta los 320×180 de la vista que piden o.encuadre y o.camara ('general' por omisión o la segunda de
// cada encuadre; un encuadre que no existe cae en 'campo', una cámara ajena en 'general') y devuelve su geometría
// { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie: R.actor toma x como el borde IZQUIERDO
// del sprite de 15 px, así que los pies van de x a x + 15), y los puntos de cada vista }. Lo de delante de los
// personajes va en orejaDelante(R, t, o) (con las MISMAS opciones; se llama después de los actores).
// Opciones de todo el grupo: o.luz 'dia' (sol de verano, cielo tramado con cúmulos de tres tonos a tres velocidades,
// golondrinas, la hierba que ondea, mariposas) | 'tarde' (sol bajo a la izquierda, cielo naranja y malva, la sombra
// rayada de la celosía sobre el suelo de metal, la luz roja de la celosía que parpadea) | 'noche' (azul oscuro con
// estrellas que titilan y la Vía Láctea, la luna, el suelo de metal que refleja la luna y las estrellas, la caseta con la
// ventana encendida y una farola con polillas, luciérnagas). o.epoca: 1958 (en obras: la celosía del plano a medio
// levantar y sin chapas al fondo, una grúa de celosía que gira despacio con una chapa colgada, andamios, chapas
// apiladas, el suelo de metal a medio poner sobre la tierra, obreros pequeños que acarrean chapas y martillean) | 1977
// (por omisión: entero) | 1998 (el derribo: chapas arrancadas, la celosía desnuda y medio caída, el suelo levantado a
// trozos con montones de chapa, máquinas amarillas, polvo) | 2000 (el campo de golf y casas nuevas donde estuvo).
//   'campo' (luz 'dia' y época 1977 por omisión): LA GRAN OREJA entera en tres cuartos desde un poco alto. El reflector
//     PLANO a la izquierda (cara de chapa gris entre vigas blancas, inclinado hacia atrás, con los puntales de celosía
//     que lo apuntalan por detrás y una luz roja en la esquina de arriba), el CURVO a la derecha (más bajo, una rampa
//     cóncava de chapa con costillas y juntas curvas, sobre postes y riostras), y entre los dos el SUELO de aluminio,
//     el objeto más claro del plano: juntas en rejilla en perspectiva, bordillo de hormigón, el reflejo de los dos muros
//     junto a su pie, y el de las nubes (o las estrellas y la luna) que pasan. El carro de las bocinas junto al curvo,
//     la caseta y un coche de los setenta abajo a la izquierda; al fondo, entre los muros, maizales, una granja con
//     granero rojo, una casa y un silo, un bosquecillo azulado, la carretera con postes y una camioneta que pasa. Vida:
//     nubes y su reflejo, un brillo que barre el metal, un pájaro que llega, se posa en lo alto de la celosía, picotea y
//     se va, la hierba de delante que ondea. o.cinta 0–1 (el gag 2): el cielo entero (estrellas, Vía Láctea, nubes,
//     luna o sol) corre de izquierda a derecha como una cinta de supermercado, con su banda de goma estriada y sus
//     rodillos de acero en el horizonte; con o.cinta > 0,7 una estrella se cae por el extremo derecho de la cinta,
//     describe un arco y rebota dos veces en el suelo de metal con un destello («clin»). Devuelve suelo 158 (la hierba
//     de delante), libre [20, 290], plano: [x0, y0, x1, y1] (la caja del reflector plano), curvo: [x0, y0, x1, y1],
//     suelo de metal: metal: [x0, y0, x1, y1], bocinas: [x, y] (el carro), caseta: [x, y] (la puerta, abajo), estrella:
//     [x, y] (donde cae y rebota). Cámara 'muros': A RAS DEL SUELO DE METAL, junto al pie del plano: su celosía
//     altísima a la izquierda en escorzo (las vigas convergen hacia arriba, NUNCA por encima de y 20 en x 20–170), el
//     curvo enfrente de punta a punta (juntas que se curvan, costillas, el labio de arriba que brilla), el suelo de
//     aluminio en perspectiva hasta el pie del curvo (juntas que convergen) con el reflejo invertido del curvo y del
//     cielo; una figura diminuta (un técnico con una fregona) pasea por el fondo junto al pie del curvo. Vida: nubes y
//     su reflejo, un pájaro que se posa en el labio del curvo, brillos que barren el metal. o.epoca 1958: la celosía
//     del plano sin chapas, con andamios y dos obreros pequeños que atornillan arriba (destellos de la llave), la mitad
//     del suelo aún de tierra con chapas apiladas, una carretilla, un nivel y un rollo de planos (sin letras) sobre una
//     caja en primer término a la derecha (la pinta orejaDelante). Las épocas 1998 y 2000 se ven aquí como 1977.
//     Devuelve suelo 160, libre [60, 250], curvo: [x0, y0, x1, y1], horizonte: y.
//   'caseta' (luz 'tarde' por omisión aquí): la CASETA de los receptores: bloques de hormigón pintados con sus juntas y
//     la luz baja de la izquierda, tejado plano con albardilla y una antena de varillas, la puerta de metal abierta
//     (la hoja hacia fuera) con la luz amarilla dentro, recortada al hueco (un banco de trabajo con aparatos, diales, un
//     osciloscopio verde que late, cables y una lámpara), una ventana con persiana y luz, una placa junto a la puerta
//     con el pictograma de una oreja (sin letras), un aplique sobre la puerta, el buzón en su poste, un cubo de basura,
//     la grava con rodadas, el poste de la luz con su cable, el maizal y un árbol; detrás asoma el reflector curvo con
//     sus costillas. o.coche 0–1 (por omisión 1: aparcado): el coche de los setenta (familiar granate con el lateral de
//     madera) llega por la derecha levantando polvo y se para (el polvo de delante lo pinta orejaDelante). Devuelve suelo
//     156, libre [30, 186] (el buzón queda a la izquierda, en x 10–22; el coche, de x 204 a 252, y el cubo, en x 260–272),
//     puerta: [x0, y0, x1, y1] (el hueco), coche: [x, y] (el centro del coche, en el suelo; cambia con o.coche), buzon:
//     [x, y]. La caseta no cambia con la época. Cámara 'bocinas' (luz 'noche' por omisión aquí): EL CARRO DE LAS BOCINAS de cerca (canon): dos bocinas de
//     chapa remachada (pirámides truncadas de boca rectangular) una al lado de la otra, que apuntan arriba a la derecha
//     hacia el reflector curvo, sobre el carrito de vigas con ruedas en dos raíles; cajas de los receptores en la garganta
//     con un piloto, los cables que bajan y se van, el suelo de metal brillante que las refleja y el reflector curvo
//     enorme detrás. EL GAG 5: o.respingo 0–1: la bocina de la izquierda da un respingo (un temblor que se apaga, una
//     chispa en la garganta y motas que saltan); o.espera 0–1: la de la derecha se va inclinando poco a poco hacia la
//     izquierda, como esperando, y se queda así con un leve balanceo. Ninguna tiene cara (las bocas se ven de canto).
//     Devuelve suelo 170, libre [0, 0], bocinaE: [x, y] (el centro de la boca de la izquierda, la que oye), bocinaO.
//   'cinta': el ESQUEMA de la deriva (luz de noche siempre): la Tierra curva abajo (pradera y bosques con su borde
//     azul de atmósfera, luces de pueblos, la carretera y la gran oreja diminuta encima con su caseta), el cielo
//     nocturno arriba con la Vía Láctea, constelaciones tenues y estrellas que pasan de izquierda a derecha con o.u
//     (0–1: cuánto ha girado la Tierra), una flecha punteada de giro sobre la Tierra, y el HAZ de la gran oreja: un cono
//     estrecho de luz tenue que sube. Un punto del cielo (una estrella marcada con un anillo) cruza el haz con o.u y
//     brilla mientras está dentro. Abajo a la derecha, un reloj de arena (la arena cae con o.u) y el número 72. Devuelve
//     punto: [x, y] (dónde está el punto con ese o.u), haz: [x0, x1] (dónde cruza el haz a la altura del punto).
//     Cámara 'haz': EL CRUCE de cerca, sobre una hoja de papel milimetrado encima de la mesa (madera con vetas, una
//     taza de café con vapor, un lápiz, una goma, una regla): el eje del tiempo abajo con siete marcas (0, 12, 24…72,
//     números de R.numero), la curva teórica punteada y la campana de seis escalones que se va dibujando con o.u (ámbar,
//     la U arriba), con un punto de luz en la punta; a la derecha, una tarjeta con el haz en pequeño y el punto que lo
//     cruza. Devuelve curva: [x0, y0, x1, y1] (la caja de la gráfica), punta: [x, y] (dónde va la curva con ese o.u).
//   'golf' (época 1998 por omisión aquí): EL FINAL, desde más bajo y más cerca que 'campo' (mismo sitio: plano a la
//     izquierda, curvo a la derecha, la granja y el silo al fondo). 1998: la celosía del plano desnuda y medio caída,
//     el curvo sin la mitad de sus chapas, el suelo levantado a trozos con montones de chapa, una excavadora amarilla
//     que muerde el curvo (el brazo sube y baja), un volquete con chapas, polvo, obreros con casco. 2000: el mismo sitio
//     hecho campo de golf: calles segadas a franjas, un green con su bandera roja sin letras que ondea, un búnker, un
//     estanque con patos, un carrito blanco, una segadora que pasa al fondo, un aspersor, árboles jóvenes con tutores y
//     casas nuevas de tejados iguales donde estaba el maizal. Devuelve suelo 156, libre [40, 280], bandera: [x, y]
//     (2000) o pala: [x, y] (1998, donde muerde la excavadora). Cámara 'plancha': EL GAG 6 (2000, tarde de verano): una
//     plancha de aluminio olvidada entre la hierba sin segar del borde de un green, de cerca, con sus remaches, un
//     doblez y el cielo reflejado; detrás, el green con la bandera, los árboles y las casas. o.pelota 0–1: una pelota de
//     golf entra botando por la izquierda, rebota en la plancha (destello y ondas de «tonk») y se queda quieta al lado,
//     y la plancha tiembla un momento. Devuelve suelo 150, plancha: [x, y] (donde golpea), pelota: [x, y] (dónde está).
const V_OREJA = {
  campo: { cam: 'muros', general: { col: ['#9ec8ec', '#6a9a3a'], geo: { suelo: 158, libre: [20, 290], plano: [8, 50, 114, 146], curvo: [212, 64, 296, 148], metal: [70, 92, 254, 148], bocinas: [206, 124], caseta: [36, 152], estrella: [160, 120] } }, muros: { col: ['#9ec8ec', '#a8b0b8'], geo: { suelo: 160, libre: [60, 250], curvo: [74, 44, 319, 112], horizonte: 108 } } },
  caseta: { cam: 'bocinas', general: { col: ['#f0a868', '#8a7a62'], geo: { suelo: 156, libre: [30, 186], puerta: [122, 118, 138, 155], coche: [228, 152], buzon: [16, 156] } }, bocinas: { col: ['#b8c0c8', '#6e7680'], geo: { suelo: 170, libre: [0, 0], bocinaE: [142, 85], bocinaO: [230, 86] } } },
  cinta: { cam: 'haz', general: { col: ['#0e1428', '#24305a'], geo: { suelo: 180, libre: [0, 0], punto: [40, 52], haz: [150, 170] } }, haz: { col: ['#f4efe0', '#d8d0b8'], geo: { suelo: 180, libre: [0, 0], curva: [40, 36, 226, 150], punta: [44, 150] } } },
  golf: { cam: 'plancha', general: { col: ['#9ec8ec', '#6a9a3a'], geo: { suelo: 156, libre: [40, 280], pala: [236, 92], bandera: [168, 112] } }, plancha: { col: ['#9ec8ec', '#4a7228'], geo: { suelo: 150, plancha: [166, 140], pelota: [0, 150] } } },
};
export function oreja(R, t, o = {}) {
  const v = a_orVista(o), P = a_orPal(v.luz), g = v.geo;
  if (v.enc === 'campo' && v.cam === 'general') a_orCampo(R, t, o, v, P, a_OR_LCAMPO, g);
  else if (v.enc === 'campo') a_orMuros(R, t, o, v, P, g);
  else if (v.enc === 'caseta' && v.cam === 'general') a_orCasetaV(R, t, o, v, P, g);
  else if (v.enc === 'caseta') a_orBocinas(R, t, o, v, P, g);
  else if (v.enc === 'cinta' && v.cam === 'general') a_orCinta(R, t, o, v, a_orPal('noche'), g);
  else if (v.enc === 'cinta') a_orHaz(R, t, o, v, g);
  else if (v.cam === 'general') a_orCampo(R, t, o, v, P, a_OR_LGOLF, g);
  else a_orPlancha(R, t, o, v, P, g);
  if (v.enc === 'golf' && v.cam === 'general') delete g[v.epoca === 2000 ? 'pala' : 'bandera'];
  return { encuadre: v.enc, camara: v.cam, ...g };
}
// lo de delante de los personajes en cada encuadre de oreja(); se llama después de los actores, con las mismas
// opciones. 'campo': matas de hierba alta y un poste de la cerca en las esquinas de abajo. 'muros' (1958): la caja con
// el rollo de planos y el nivel, abajo a la derecha (x 268–319, y 150–180). 'caseta': matas de hierba en las esquinas y
// el polvo que levanta el coche al llegar. 'bocinas': el cable grueso que cruza la esquina de abajo a la izquierda.
// 'golf' 1998: el polvo que flota por delante; 2000: dos matas. 'plancha': las briznas largas que tapan el borde de la
// plancha y, si la pelota está ahí, la tapan un poco. 'cinta' y 'haz': nada. Devuelve {}.
export function orejaDelante(R, t, o = {}) {
  const v = a_orVista(o), P = a_orPal(v.luz);
  if (v.enc === 'cinta') return {};
  if (v.enc === 'campo' && v.cam === 'muros') { if (v.epoca === 1958) a_orCajaPlanos(R, t, P); return {}; }
  if (v.enc === 'caseta' && v.cam === 'bocinas') { a_orCable(R, P, [[-4, 150], [30, 166], [70, 184]], 4); return {}; }
  if (v.enc === 'golf' && v.cam === 'plancha') { a_orBriznasPlancha(R, t, P); return {}; }
  if (v.enc === 'caseta') { const c = o.coche ?? 1; if (c < 1) a_orPolvo(R, t, Math.round(a_orCocheX(c)) + 24, 156, 1 - c, P, 9); }
  if (v.enc === 'golf' && v.epoca === 1998) for (let k = 0; k < 5; k++) { const x = ((h(k, 1, 960) * 360 + t * (4 + k)) % 380) - 30, y = 120 + k * 9 + Math.sin(t * 0.7 + k) * 3; a_orNubePolvo(R, x, y, 10 + k * 2, P, 0.22); }
  // las matas de hierba alta de las esquinas, que se mecen
  for (const [x0, n, s] of [[0, 9, 1], [304, 8, -1]]) for (let k = 0; k < n; k++) { const x = x0 + k * 2 * (s > 0 ? 1 : 1), alto = 9 + Math.round(h(k, x0, 961) * 10), m = Math.sin(t * 1.8 + k * 0.7) * 2;
    R.linea(x, 180, Math.round(x + m * s + s * 2), 180 - alto, P.hierba[k % 2 ? 0 : 1]); R.pset(Math.round(x + m * s + s * 2), 180 - alto, P.hierba[3]); }
  if (v.enc === 'campo') { R.rect(8, 150, 11, 180, P.k); R.rect(9, 151, 10, 180, P.madera[1]); R.pset(9, 152, P.madera[2]); for (const y of [158, 168]) R.linea(0, y + 1, 8, y, P.alambre); }
  return {};
}
// ── B · La sala de la computadora, 1977 ──────────────────────────────────────────────────────────────────────────────
// o.encuadre 'sala' (y o.camara 'general' por omisión | 'impresora'). Lo de delante de los personajes va en salaDelante
// (se llama después de los actores, con las mismas opciones). Opciones de todo el grupo: o.luz 'noche' (por omisión:
// los fluorescentes fríos encendidos, uno que parpadea, la lámpara de mesa ámbar con su charco de luz, las esquinas en
// penumbra azulada, la ventana negra con estrellas que titilan y la silueta de la gran oreja recortada a su hueco) |
// 'dia' (la lámpara apagada, sin penumbra, la ventana con cielo azul, nubes de tres tonos que pasan, el campo verde y la
// gran oreja blanca al sol). o.reloj: la hora del reloj de pared en horas (23,27 por omisión: las once y cuarto pasadas);
// el minutero avanza con t y el segundero da saltos. Fondo fijo en un búfer (R.nuevo) por cada luz.
//   'sala' (general): la sala sin nadie, de frente, en tres términos. FONDO: el techo de placas acústicas con dos
//     pantallas de fluorescentes (x 186–248; la segunda parpadea a ratos; una polilla da vueltas a la primera); la pared
//     de bloques pintados con su zócalo; a la izquierda dos ARMARIOS DE CINTA (x 0–48, y 44–131: una bobina llena arriba
//     y otra casi vacía abajo, que giran a tirones; el bucle de cinta sube y baja en las columnas de vacío); la ventana
//     (x 58–122, y 26–76) con la gran oreja a lo lejos (su luz roja parpadea) y la persiana recogida; una balda con
//     archivadores y el RECEPTOR (x 160–188, y 62–76: la aguja del medidor tiembla con el ruido del cielo); el tubo de
//     los cables que baja a su caja (x 135–143, y 84–121); el RELOJ (centro 170, 44); el corcho con hojas a rayas, una
//     gráfica, una foto de la antena y chinchetas (x 196–244, y 34–70: una hoja se levanta con el aire de la rejilla de
//     debajo, que tiene su cinta roja); el termostato, el interruptor, el extintor y el cartel de no fumar (pictograma);
//     y la PUERTA abierta a la derecha (hueco x 256–294, y 66–125; la hoja abierta en x 297–311) con el pasillo recortado
//     detrás (bombilla con su halo, cartel verde de salida con flecha, puerta del fondo, tablón, fuente). MEDIO: la
//     COMPUTADORA IBM grande como un escritorio (x 54–134, tablero y 116–124, base y 148): la consola de luces que
//     parpadean en filas (en la de arriba corren dos), el teclado, las tarjetas perforadas, la taza de café olvidada (un
//     hilo de vapor ya frío cada cinco segundos), la lámpara y la unidad de disco con su plato que gira (centro 113, 137)
//     y el brazo de las cabezas; la SILLA de oficina vacía (pie en 118, 155) que gira sola muy despacio; la IMPRESORA DE
//     LÍNEA (x 146–194, y 95–148) con la tapa de cristal (el cabezal va y viene dentro), la rejilla, la botonera y el
//     piloto rojo; el papel continuo (canon: bandas verdes, agujeros de arrastre, columnas de cifras, el pliegue cada 24
//     px) cuelga de la boca y corre hacia abajo hasta la CAJA de cartón (x 152–190, y 125–154, con sus flechas). Suelo
//     técnico de placas en perspectiva (algunas perforadas), cables, sombras y el brillo de los fluorescentes.
//     EL GAG 3: o.papel 0–1: hasta 0,25 la pila sube en la caja; de 0,25 a 0,45 rebosa (un montón de pliegues encima y
//     una cascada por la derecha, y desde 0,37 otra por la izquierda); desde 0,3 el papel se extiende por el suelo (por
//     debajo de los muebles, por encima de las placas: pliegues que corren hacia la puerta con t, bandas verdes, tiendas
//     de papel que se levantan, la orilla con su sombra y los agujeros); desde 0,42 nace un río de pliegues, estrecho al
//     principio, que llega al umbral en 0,8, con dos crestas que viajan hacia la puerta; desde 0,8 se levanta en el hueco
//     de la puerta una OLA de pliegues (hasta 27 px en 1) con el labio que se enrosca y hojas sueltas que vuelan, y el
//     papel se va por el pasillo (recortado al hueco). Con o.papel > 0,8 salaDelante pinta además el borde del papel
//     que llega hasta abajo. Devuelve suelo 158, libre [40, 250], impresora: [x, y] (la boca por donde sale el papel),
//     puerta: [x0, y0, x1, y1] (el hueco), caja: [x0, y0, x1, y1], receptor: [x, y] (el medidor), mesa: [x0, y0, x1, y1]
//     (el tablero de la computadora), consola: [x0, y0, x1, y1] (las luces), disco: [x, y], silla: [x, y] (el pie),
//     reloj: [x, y], ventana: [x0, y0, x1, y1], cintas: [x0, y0, x1, y1], papel: [x, y] (el frente del papel con ese
//     o.papel).
//   Cámara 'impresora': LA BOCA DE LA IMPRESORA de cerca. Detrás, desenfocados, la pared de bloques, un armario de cinta
//     (una bobina llena y otra casi vacía que giran a tirones, y luces), el corcho y una ventana arriba a la derecha (de
//     noche, estrellas que titilan; de día, una nube que pasa). La impresora ocupa la parte de abajo: la tapa de cristal
//     (con su reflejo) deja ver el rodillo, la cinta entintada que corre y el CABEZAL que va de izquierda a derecha
//     imprimiendo la línea y vuelve mientras el papel sube una línea; el frontal gris con las rejillas, el contador de
//     líneas (cifras verdes) y la botonera con el piloto rojo encendido. El papel continuo (canon del listado, imitado
//     aquí porque piezaListado aún es un esqueleto: x 100–220, bandas verdes cada tres líneas, agujeros de arrastre a los
//     dos lados, perforación de corte, columnas de caracteres de impresora de 5×7: casi todo «1» y espacios, algún 2 o 3)
//     sale por la ranura de la tapa y sube línea a línea (10 px por línea) hasta la barra guía de arriba (y 30). Polvo de
//     papel que flota en el cono de luz de la lámpara (de noche ámbar, de día blanco). o.linea 0–1 mueve el papel (de la
//     línea 4 a la 20) y HAY QUE ANIMARLO con t: fijo, el papel y el cabezal se paran (siguen la cinta entintada, las
//     bobinas, las luces, la ventana y el polvo). Con o.linea > 0,5 las líneas que salen llevan, en la columna o.col (1,
//     la segunda, por omisión, como piezaListado), la secuencia 6, E, Q, U, J, 5 de arriba abajo, con las columnas de al
//     lado en blanco (sin círculo: nadie la ha visto aún); el «6» se imprime hacia o.linea 0,56 y el «5» hacia 0,88; en 1
//     se ve entera. Sin o.linea el papel corre solo con t (o.velocidad líneas por segundo, 0,9 por omisión) y o.seqT
//     (opcional) es el instante en que empieza a imprimirse la secuencia. Devuelve linea: [x, y] (la columna de la
//     secuencia a la altura de la línea que se imprime), cabezal: [x, y], papel: [x0, y0, x1, y1], secuencia: [x, y] (el
//     centro del «U» si ya está impreso y a la vista, si no null).
const V_SALA = {
  sala: { cam: 'impresora', general: { geo: { suelo: 158, libre: [40, 250], impresora: [171, 105], puerta: [256, 66, 294, 125], caja: [152, 130, 190, 154], receptor: [174, 69], mesa: [54, 116, 134, 124], consola: [60, 88, 108, 116], disco: [113, 137], silla: [118, 155], reloj: [170, 44], ventana: [58, 26, 122, 76], cintas: [0, 44, 48, 131] } },
    impresora: { geo: { suelo: 180, libre: [0, 0], linea: [126, 121], papel: [100, 34, 220, 128] } } },
};
export function sala(R, t, o = {}) {
  const e = V_SALA.sala, cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: 'sala', camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  return cam === 'impresora' ? b_salaImpresora(R, t, o, geo) : b_salaGeneral(R, t, o, geo);
}
// lo de delante de los personajes en sala(): en la general, el carrito de tarjetas perforadas abajo a la izquierda
// (x 0–30, y 138–178), la papelera de rejilla con una bola de papel abajo a la derecha (x 298–318, y 152–179; con
// o.papel > 0,6 otra bola) y, con o.papel > 0,8, el borde del papel que rueda a nuestros pies (y 172–180, por debajo de
// los pies de los personajes, del ancho de lo que cubre el suelo); en 'impresora', motas de polvo grandes y
// desenfocadas que flotan delante (por debajo de y 50). Se llama después de los actores, con las mismas opciones.
export function salaDelante(R, t, o = {}) {
  if (o.camara === 'impresora') { b_motas(R, t, 6, [40, 50, 276, 175], 2, o.luz === 'dia'); return {}; }
  const { rect, pset, linea, disco, poligono } = R, p = Math.max(0, Math.min(1, o.papel ?? 0)), S = b_S;
  // el borde del papel que llega hasta nosotros: un pliegue que se enrolla y avanza
  if (p > 0.8) {
    const q = Math.min(1, (p - 0.8) / 0.2), y0 = Math.round(181 - 9 * q), rx = (4 + 112 * Math.min(1, (p - 0.3) / 0.6)) * (0.8 + 0.2 * q), xa = Math.round(194 - rx), xb = Math.round(194 + rx), n = Math.ceil((xb - xa) / 10);
    poligono([[xa, 181], ...Array.from({ length: n + 1 }, (_, i) => { const x = xa + i * 10; return [x, y0 + 2 * Math.sin(x * 0.11 + t * 2.2) + (i === 0 || i === n ? 4 : 0)]; }), [xb, 181]], (x, y) => {
      const f = Math.log(y - 100) * 14 + t * 1.5, n = Math.floor(f), fr = f - n;
      return fr < 0.2 ? C.papelS : (n >> 1) % 2 ? b_SP.papelD : C.papel; });
    for (let x = xa + 6; x < xb - 6; x++) { const y = Math.round(y0 + 2 * Math.sin(x * 0.11 + t * 2.2)); pset(x, y, b_SP.papelL); pset(x, y - 1, C.papelS); if ((x + Math.floor(t * 6)) % 7 === 0) pset(x, y + 2, S.agujero); }
  }
  // el carrito de las tarjetas perforadas: bandeja con su pila (franja de color y muescas), barandilla, ruedas
  rect(0, 146, 30, 149, C.k); rect(0, 147, 29, 148, S.metalL); rect(0, 150, 28, 166, C.k); rect(0, 151, 27, 165, S.metal);
  rect(2, 152, 25, 152, S.metalL); for (let y = 155; y < 164; y += 3) rect(2, y, 25, y, S.metalS);
  rect(2, 138, 22, 146, C.k); rect(3, 139, 21, 145, S.tarjeta); for (let y = 140; y < 145; y += 2) rect(3, y, 21, y, S.tarjetaS); rect(3, 139, 6, 145, S.tarjetaR); pset(21, 139, C.k);
  rect(23, 140, 28, 146, C.k); rect(24, 141, 27, 145, S.tarjeta); rect(24, 141, 27, 141, S.tarjetaR);
  rect(1, 166, 3, 172, C.k); rect(24, 166, 26, 172, C.k); for (const x of [2, 25]) { disco(x, 174, 3, C.k); disco(x, 174, 1.5, S.metalD); }
  // la papelera de rejilla, con una bola de papel arrugado encima
  rect(298, 158, 318, 179, C.k); rect(299, 159, 317, 179, S.metalD); for (let x = 301; x < 317; x += 3) rect(x, 160, x, 179, S.metal); rect(299, 159, 317, 160, S.metalL);
  disco(306, 157, 4, C.papelS); disco(306, 156, 3, C.papel); pset(305, 155, b_SP.papelL); linea(303, 157, 308, 155, C.papelS);
  if (p > 0.6) { disco(312, 156, 3, C.papel); pset(311, 155, C.papelS); }
  return {};
}
// ── C · La mesa de Ehman y lo que dice el papel ────────────────────────────────────────────────────────────────────
// listado(R, t, o): o.encuadre ('mesa' por omisión | 'escala') y o.camara ('general' o la segunda de cada uno). Pinta
// los 320 × 180 en cada fotograma (lo fijo, en un búfer por encuadre, cámara y luz) y devuelve la geometría.
// Opciones comunes: o.luz 'noche' (por omisión: la lámpara de pinza, ámbar, y el resto de la casa en penumbra azul) |
// 'dia' (luz de mañana por la ventana, la lámpara apagada).
//   'mesa' (general): LA COCINA DE EHMAN EN 1977, de noche. Al fondo, de izquierda a derecha: la NEVERA redondeada color
//     aguacate (tirador cromado, imanes, un dibujo infantil) con un GATO dormido encima que mueve la cola; los armarios
//     altos de madera; el banco con su encimera dorada, la TOSTADORA cromada, los tres botes naranjas, el fregadero con
//     el grifo que GOTEA; los AZULEJOS con su florecilla; la VENTANA con visillos de cuadros (de noche: estrellas que
//     titilan, la luna, el bosquecillo, la casa del vecino con una ventana que se enciende y se apaga, el poste con sus
//     cables y un coche que pasa con los faros; de día: cielo con nubes de tres tonos a tres velocidades y pájaros); la
//     balda con la RADIO (el dial ámbar que late) y un poto que cuelga; el papel pintado de los setenta; el CALENDARIO
//     de pared con un paisaje (sin letras; el día 15 rodeado); el RELOJ de sol con el segundero; el TELÉFONO de pared
//     naranja con su cordón rizado; la PUERTA al pasillo oscuro con la luz azul de una tele que parpadea; el suelo de
//     linóleo a cuadros en perspectiva con la alfombra ovalada trenzada. La MESA de formica con patas cromadas y el
//     LISTADO desplegado (el montón plegado, la tira sobre el tablero y los pliegues que caen hasta el suelo), la taza
//     que humea, la LÁMPARA DE PINZA con su cono de luz y una polilla, y una silla de vinilo naranja: todo eso va en
//     listadoDelante (llámala DESPUÉS de los actores). ehmanWO va de pie DETRÁS de la mesa (no hay pose sentada): sus
//     pies en ehman: [x, suelo] y le asoman la cabeza y los hombros. Devuelve suelo 160 (los que están de pie delante
//     del banco), libre [28, 90], ehman: [162, 152] (x del sprite y su suelo, detrás de la mesa), mesa: [94, 147, 246,
//     161] (el tablero, borde de atrás y cromado de delante), papel: [176, 152] (donde mira Ehman), lampara: [214, 116],
//     ventana: [102, 26, 148, 74], puerta: [288, 50, 316, 134], nevera: [6, 42, 44, 134], radio: [172, 55].
//   'mesa' cámara 'listado': EL LISTADO DESDE ARRIBA (el plano del golpe): el papel continuo (canon, piezaListado con
//     o.s 2) casi de arriba abajo, con el pliegue de la hoja anterior arriba, las columnas de «1» y espacios y la secuencia
//     6EQUJ5 en vertical, bajo el foco de la lámpara; alrededor, la formica moteada de la mesa con su sombra, una mancha
//     de café, una goma con sus virutas, la taza que humea vista desde arriba, el cantillo cromado de la mesa abajo (el
//     papel cae por encima) y una polilla cuya sombra cruza a ratos; motas de polvo en la luz. EL GAG 4 Y EL GOLPE:
//     o.boli 0–3: una mano (con 1 y 2, T.brazo que entra desde abajo a la derecha, manga verde oliva de Ehman; con 3, que
//     escribe a 80–100 px del borde, solo la mano canónica con su puño y su sombra, sin brazo palo) prueba en el margen de
//     abajo con el LÁPIZ ROTO (1: la punta astillada, migas de madera), luego con el BOLÍGRAFO AZUL que no pinta (2: raya
//     el papel y solo deja surcos sin tinta) y por fin coge el ROJO (3); los que ya ha probado vuelven a la mesa, a la
//     derecha (con 0, los tres esperan allí). o.rodea 0–1: el círculo rojo se cierra; o.wow 0–1: el «Wow!» rojo se
//     escribe en el margen; con o.boli 3 la punta del bolígrafo va justo donde acaba el trazo. o.resalta 0–1: el halo de
//     «de pronto» en la secuencia. o.manga: el color de la manga. o.retira 0–1: la mano se
//     retira con su útil (brazo, mano y útil salen juntos hacia abajo a la derecha, por la línea del antebrazo; con 1 ya no
//     queda nada en el cuadro y el útil no vuelve a la mesa). Devuelve seq: [x, y], wow: [x, y], punta: [x, y] (la punta
//     del trazo rojo, aunque la mano se haya ido), mano: [x, y] (la muñeca; null sin mano o con o.retira 1), anillo: [cx, cy, rx, ry], papelCaja: [x0, y0, x1, y1].
//   'escala' (general): LA ESCALA (vista didáctica, desde arriba, sobre la misma mesa de formica): una hoja de PAPEL
//     MILIMETRADO verde sujeta con cinta de pintor; abajo, los seis caracteres 6 E Q U J 5 grandes, de impresora, en fila
//     sobre la línea base; encima de cada uno una BARRA ámbar rayada a lápiz que crece (o.u 0–1, una tras otra) hasta su
//     altura (6, 14, 26, 30, 19, 5 en una escala de 30), la U la más alta, con su brillo; una línea punteada azul de
//     «ruido de fondo» (1) abajo; el número 30 (R.numero) junto a la U cuando llega. Alrededor: una tira del listado de
//     verdad (canon, ya rodeado) a la izquierda, debajo de la hoja; una CALCULADORA de los setenta con su pantalla de LED
//     rojos que cuenta la barra que crece; un lápiz, una regla y la taza que humea. Devuelve barras: [x0, y0, x1, y1] (la
//     caja de las barras a tamaño completo: base en y1), base: y de la línea base, cols: [x de cada barra], u30: [x, y]
//     (la punta de la U).
//   'escala' cámara 'curva': LA CURVA de la señal (canon) en un MONITOR de fósforo verde de los setenta: la carcasa de
//     plástico beis con su bisel, las rejillas, la placa sin letras, dos mandos y el piloto rojo; la pantalla abombada
//     con líneas de barrido, la banda que baja, el moteado del fósforo, el reflejo del cristal, la retícula tenue, los ejes
//     y la CAMPANA DE SEIS ESCALONES (o.u 0–1 la dibuja, con el punto del haz que deja estela) y una campana suave
//     punteada detrás; debajo del eje del tiempo, el 72 (R.numero) y un relojito; el cursor que parpadea. Detrás, la sala
//     de la computadora en penumbra (armarios con filas de luces que parpadean); delante, la mesa de madera con el
//     teclado, la taza que humea y un montón de listado. Devuelve pantalla: [x0, y0, x1, y1] (el cristal), curva: [x0, y0,
//     x1, y1] (la caja de la gráfica: el eje del tiempo en y1), cima: [x, y] (lo alto de la U).
const V_LISTADO = {
  mesa: { cam: 'listado', general: { col: ['#e8c890', '#6a5038'], geo: { suelo: 160, libre: [28, 90], ehman: [162, 152], mesa: [94, 147, 246, 161], papel: [176, 152], lampara: [214, 116], ventana: [102, 26, 148, 74], puerta: [288, 50, 316, 134], nevera: [6, 42, 44, 134], radio: [172, 55] } },
    listado: { col: ['#f4efe0', '#c8a878'], geo: { suelo: 180, libre: [0, 0] } } },
  escala: { cam: 'curva', general: { col: ['#f4efe0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], barras: [66, 37, 230, 133] } }, curva: { col: ['#0a2014', '#c8b898'], geo: { suelo: 180, libre: [0, 0], pantalla: [64, 38, 256, 142] } } },
};
export function listado(R, t, o = {}) {
  const enc = V_LISTADO[o.encuadre] ? o.encuadre : 'mesa', e = V_LISTADO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
  const pinta = { 'mesa.general': c_cocina, 'mesa.listado': c_listadoArriba, 'escala.general': c_escala, 'escala.curva': c_curva }[enc + '.' + cam];
  return Object.assign(geo, pinta(R, t, o) || {});
}
// lo de delante de los personajes en 'mesa' general (la mesa con el listado, la taza, la lámpara con su cono de luz y la
// polilla, la silla): se llama DESPUÉS de los actores, con las mismas opciones; en los demás encuadres no pinta nada
export function listadoDelante(R, t, o = {}) {
  const enc = V_LISTADO[o.encuadre] ? o.encuadre : 'mesa', e = V_LISTADO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  return enc === 'mesa' && cam === 'general' ? c_cocinaDelante(R, t, o) : {};
}
// ── D · El cielo ────────────────────────────────────────────────────────────────────────────────────────────────────
// Todo de noche o en el espacio: estrellas de varios tamaños que titilan, la Vía Láctea con su polvo, colores fríos.
// cielo2(R, t, o) pinta la vista que piden o.encuadre y o.camara y devuelve su geometría (V_CIELO, con los puntos que se
// mueven en su sitio de ahora). cielo2Delante(R, t, o): llámala después de los actores en las vistas con suelo
// (sagitario, cometas, caminos y franja): matas de hierba y espigas que se mecen en las esquinas de abajo.
//   'sagitario': EL CIELO DE VERANO desde un campo de Ohio: la Vía Láctea sube desde el horizonte (a la derecha, sobre
//     el centro de la galaxia, con su grieta de polvo oscuro), la constelación de Sagitario (la «tetera», con las
//     posiciones de verdad mirando al sur: el asa a la izquierda, el pico a la derecha; sus estrellas unidas por líneas
//     finas que se encienden con o.lineas 0–1), un meteoro de vez en cuando, nubes finas bajas, la línea de árboles, la
//     granja con su silo y una ventana encendida, coches lejanos, el maizal que se mece, la gran oreja diminuta a la
//     izquierda con su caseta, el camino de tierra, la valla, las pacas de heno, flores silvestres, piedras, un charco que refleja
//     las estrellas, la ola del viento en la hierba y las luciérnagas sobre el prado. o.puntos 0–1: los DOS
//     PUNTOS POSIBLES de la señal, dos círculos finos discontinuos en ámbar, muy cerca y en diagonal, que se dibujan
//     juntos A LA IZQUIERDA del asa (donde caen de verdad, junto a chi de Sagitario). Devuelve suelo 174, libre
//     [88, 252], horizonte 148, tetera [x0, y0, x1, y1], punto1, punto2. Cámara 'dial': UNA RADIO ANTIGUA de cerca sobre
//     su mesa: mueble de nogal con vetas, bisel de latón, el cristal de la escala iluminado por detrás con sus rayitas y
//     las cifras 1300–1500 (sin unidades), la ventana del espectro donde las «emisoras» naturales son manchas anchas y
//     borrosas (azules) que respiran, y una sola RAYA FINA y brillante en 1420 con el átomo de hidrógeno encima (núcleo,
//     órbita y electrón que gira); el altavoz de lamas sobre la tela, el selector, la luz piloto que late, el
//     sintonizador grande a la derecha que gira con la aguja, motas de polvo en la luz, y en la mesa un cuaderno, un
//     lápiz y una taza que humea. o.aguja 0–1: la aguja roja va a la raya, se pasa un poco, vuelve y se queda quieta.
//     Sin personajes (inserto). Devuelve raya [170, 80], perilla [256, 136] (para una T.mano), cristal, mesa 162 y
//     aguja [x, y] (donde está ahora).
//   'hidrogeno': EL ESPACIO PROFUNDO: una NUBE fría de hidrógeno (violeta, de borde blando, con filamentos, que respira)
//     sobre un fondo con la Vía Láctea tenue, una nebulosa azul, galaxias diminutas y estrellas que titilan, y lejos una
//     ESTRELLA MUERTA muy magnética (el magnetar: un punto azul blanco con su halo, un haz que gira como un faro y las
//     líneas de campo curvas de un dipolo que se tambalea). o.destello 0–1: el magnetar destella (una cruz y un anillo
//     que se expande) y, cuando llega, la nube se ENCIENDE de golpe, brilla mucho más un instante y se apaga; o.ondas
//     0–1: ondas finas que salen de la nube hacia la derecha (para enlazar con el dial). Sin suelo ni personajes.
//     Devuelve nube [118, 104], magnetar [262, 72], brillo (0–1, lo encendida que está). Cámara 'cometas': un cielo de
//     otoño violeta sobre colinas (un árbol solo a la izquierda, una valla, una antena lejana con su luz roja, nubes
//     finas) con DOS COMETAS (núcleo, coma, cola de polvo cálida y cola de gas azul, envueltos en un halo violeta de
//     hidrógeno) que cruzan de derecha a izquierda; o.u 0–1: lo que han avanzado; o.trazas 0–1: un avión (luces roja y
//     verde, destello blanco) y un satélite (punto que cruza recto) pasan con su estela, por otro camino; o.candado
//     0–1: la franja del cielo del hidrógeno (banda [0, 96, 319, 112]) se marca con bordes discontinuos ámbar y, desde
//     la mitad, baja un candado (icono) sobre ella. Devuelve suelo 174, libre [40, 270], horizonte 156, banda, candado,
//     cometa1: [x, y], cometa2: [x, y].
//   'caminos': TRES CAMINOS en el cielo (vista de cierre, con un alba verdosa muy tenue): desde la gran oreja diminuta
//     abajo en el centro, tres senderos de luz suben y se abren: a la izquierda (violeta) hacia una nube de hidrógeno, en
//     el centro (ámbar) hacia un «?» (R.icono) y a la derecha (azul) hacia una lucecita lejana que parpadea (sin nave,
//     sin forma: una luz). o.u 0–1: los senderos se dibujan de abajo arriba, uno tras otro, y lo de arriba aparece al
//     llegar; luego suben chispas por ellos. Detrás: el alba verdosa en bandas con cirros encendidos, el lucero, nubes en
//     dos capas, montes lejanos, la granja (casa, granero, silo, molino que gira), un coche lejano, el maizal en surcos
//     con la ola del viento, la cuneta con matas y flores, charcos en el camino y luciérnagas.
//     Devuelve suelo 174, libre [24, 124] y libre2 [196, 300], nube, duda, luz.
//     Cámara 'franja': la FRANJA de cielo que barre la gran oreja, una cinta horizontal de estrellas de borde a borde
//     (y 26–64) con el haz de la oreja (a la izquierda, grande) que sube hasta ella; a la derecha, de cerca, la CASETA de
//     los receptores (muro de bloques, tejado, puerta con su ventanuco encendido, el farol con polillas) y en su pared,
//     colgado de un clavo, un CALENDARIO de taco grande (cabecera roja con anillas, el número del día 1–60 con R.numero)
//     que pasa hojas (o.dias 0–60): cada hoja que cae al suelo, la cinta vuelve a pasar entera, igual y vacía; las hojas
//     se amontonan junto a la pared. Alrededor: montes lejanos y bosque de coníferas, el mástil de la radio con su luz
//     roja, dos postes del teléfono con los cables hasta la caseta, el prado segado en bandas con matas, flores y piedras,
//     el camino de grava con charcos, una bicicleta y un cubo de chapa junto a la pared, la rejilla, la bajante, la manga
//     de viento del tejado que ondea, nubes bajas, un coche lejano, la ola del viento en la hierba. o.luz 'noche' (por
//     omisión: Vía Láctea, estrellas, luciérnagas, farol encendido), 'tarde' (cielo malva y naranja, pocas estrellas,
//     pájaros, farol encendido) o 'dia' (cielo azul con cirros y cúmulos, pájaros, la cinta sin estrellas, solo marcada).
//     Devuelve suelo 174, libre [130, 214], calendario [248, 118], caseta, puerta, dia.
const V_CIELO = {
  sagitario: { cam: 'dial', general: { col: ['#0e1428', '#24305a'], geo: { suelo: 174, libre: [88, 252], horizonte: 148, oreja: [16, 150, 84, 150], granja: [262, 150], tetera: [160, 80, 234, 130], punto1: [140, 86], punto2: [127, 95] } }, dial: { col: ['#6a4428', '#f0e0b0'], geo: { suelo: 180, libre: [0, 0], cristal: [30, 40, 290, 98], raya: [170, 80], perilla: [256, 136], mesa: 162 } } },
  hidrogeno: { cam: 'cometas', general: { col: ['#06081a', '#3a2a6a'], geo: { suelo: 180, libre: [0, 0], nube: [118, 104], magnetar: [262, 72] } }, cometas: { col: ['#0e1428', '#24305a'], geo: { suelo: 174, libre: [40, 270], horizonte: 156, banda: [0, 96, 319, 112], candado: [160, 78], cometa1: [100, 70], cometa2: [180, 100] } } },
  caminos: { cam: 'franja', general: { col: ['#0e1428', '#3a2a6a'], geo: { suelo: 174, libre: [24, 124], libre2: [196, 300], horizonte: 158, oreja: [128, 158, 192, 158], nube: [70, 60], duda: [160, 50], luz: [250, 62] } }, franja: { col: ['#0e1428', '#f4efe0'], geo: { suelo: 174, libre: [130, 214], horizonte: 140, franja: [0, 26, 319, 64], oreja: [8, 146, 120, 146], caseta: [206, 76, 319, 168], puerta: [292, 128, 310, 168], calendario: [248, 118] } } },
};
// D · el cielo: elige la vista (un encuadre que no existe cae en 'sagitario'; una cámara que no es la suya, en
// 'general'), la pinta y devuelve su geometría (con los puntos que se mueven, como los cometas, en su sitio de ahora)
export function cielo2(R, t, o = {}) {
  const enc = V_CIELO[o.encuadre] ? o.encuadre : 'sagitario', cam = o.camara === V_CIELO[enc].cam ? V_CIELO[enc].cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(V_CIELO[enc][cam].geo)) };
  const extra = (enc === 'sagitario' ? (cam === 'dial' ? d_dialRadio : d_cieloSagitario) : enc === 'hidrogeno' ? (cam === 'cometas' ? d_cometas : d_hidrogeno) : (cam === 'franja' ? d_franja : d_caminos))(R, t, o);
  return Object.assign(geo, extra || {});
}
// lo que va por delante de los personajes en las vistas con suelo (llámala después de los actores): matas de hierba
// y espigas que se mecen en las esquinas de abajo (tapan como mucho los pies, nunca el centro libre) y, en 'franja',
// el farol de la caseta con sus polillas. En el espacio y en el dial no pinta nada. Devuelve {}.
export function cielo2Delante(R, t, o = {}) {
  const enc = V_CIELO[o.encuadre] ? o.encuadre : 'sagitario', cam = o.camara === V_CIELO[enc].cam ? V_CIELO[enc].cam : 'general';
  if ((enc === 'sagitario' && cam === 'dial') || (enc === 'hidrogeno' && cam === 'general')) return {};
  const P = d_P, oscuro = enc === 'caminos' && cam === 'franja' ? [P.prado[0], P.prado[1], P.prado[2]] : [P.sil[0], P.prado[0], P.prado[1]];
  const matas = enc === 'sagitario' ? [[4, 22], [30, 10], [268, 14], [300, 20]] : enc === 'hidrogeno' ? [[6, 18], [34, 8], [282, 12], [306, 18]] : cam === 'franja' ? [[4, 18], [118, 8], [314, 10]] : [[2, 18], [150, 6], [174, 6], [306, 16]];
  for (const [mx, w] of matas) d_mata(R, t, mx, 180, w, oscuro, mx * 7 + 3);
  if (enc === 'sagitario') { // dos espigas de maíz que asoman por la izquierda, con su penacho que se mece
    for (const [ex, alt] of [[8, 40], [22, 30], [312, 34]]) { const s = Math.round(Math.sin(t * 1.3 + ex) * 2), top = 180 - alt;
      R.linea(ex, 180, ex + s, top, P.maiz[0]); R.linea(ex + 1, 180, ex + 1 + s, top, P.maiz[1]);
      // las hojas: arcos que salen del tallo a un lado y a otro, con el nervio más claro
      for (let k = 0; k < 4; k++) { const by = top + 6 + k * 7, dir = k % 2 ? 1 : -1, L = 9 + (k % 3) * 2, ba = Math.sin(t * 1.8 + k + ex) * 1.5;
        for (let i = 0; i <= L; i++) { const x = Math.round(ex + s * (1 - (by - top) / alt) + dir * i), y = Math.round(by - Math.sin(i / L * 2.4) * 4 + (i / L) ** 2 * (5 + ba)); R.pset(x, y, P.maiz[1]); R.pset(x, y + 1, i < L - 2 ? P.maiz[0] : P.sil[0]); } }
      R.linea(ex + s, top, ex + s - 2, top - 5, P.maiz[2]); R.linea(ex + s, top, ex + s + 2, top - 4, P.maiz[2]); R.pset(ex + s, top - 5, P.maiz[2]); }
  }
  return {};
}
// ── E · Otros telescopios (1995–2022) ───────────────────────────────────────────────────────────────────────────────
// Tres paisajes reales que se distinguen por la luz, el color y la vegetación, y un despacho de noche:
//   'vla' (general): EL GRAN CONJUNTO DE ANTENAS DEL DESIERTO DE NUEVO MÉXICO (1995–1996), mediodía seco y cielo alto.
//     Cielo azul tramado con cúmulos de tres tonos a tres alturas y velocidades, el sol a la derecha (230, 30) con su
//     halo, dos cuervos que planean en círculo; una sierra lejana azul violeta con sus cárcavas y dos mesetas rosadas
//     con estratos (la de la izquierda, detrás del edificio); la llanura ocre con manchas, matas de gobernadora con su
//     sombra, piedras y matojos. Las ANTENAS blancas (platos de 25 m con su cuadrípode y subreflector, sobre su pedestal
//     con la escalerilla) en fila sobre una vía doble con balasto y traviesas que se pierde hacia el centro del conjunto
//     (cubo en geo.cubo), y un segundo brazo más pequeño que sale hacia la izquierda: todas apuntan al mismo sitio y
//     giran juntas (o.giro 0–1; sin o.giro, derivan despacio con t). Un camino de tierra con postes de la luz y sus
//     cables cruza por detrás de la primera antena; una furgoneta blanca de los noventa lo recorre levantando polvo
//     (o.furgoneta: false la quita); un remolino de polvo vaga por la llanura; el EDIFICIO DE CONTROL bajo a la izquierda
//     (bloques claros, ventanas en banda que reflejan, equipos en el tejado, un mástil con su luz roja que parpadea, un
//     coche aparcado y un técnico pequeño que va y viene). Matojos secos que se mecen con el viento.
//     Devuelve suelo 156, libre [30, 250], horizonte 104, sol, cubo, edificio [x0, y0, x1, y1], platos: [[cx, cy, r]…]
//     (el primero, el grande de la derecha), camino (y del camino). Delante (telescopiosDelante): una planta rodadora
//     que cruza rodando y botando por debajo de los pies (y 160–176) cada ~11 s (o.rodadora: false la quita) y dos
//     matas en las esquinas de abajo, fuera de libre.
//   'vla' + o.camara 'tasmania': UNA ANTENA en Tasmania (Australia), de cerca, en invierno austral: luz fría y gris
//     azulada. Estratocúmulos de tres tonos en tres capas a distinta velocidad con claros, un chubasco lejano que cae en
//     cortinas sobre el mar, gaviotas; el MAR al fondo con brillos que se mueven y un pesquero que cruza despacio; un cabo
//     azulado al otro lado; colinas verdes en tres términos con prados de distinto verde, setos y cercas; eucaliptos
//     (copas ralas gris verdosas y troncos claros, uno grande a la izquierda que se mece); ovejas que pastan y caminan en
//     la colina del medio. LA ANTENA (plato de 26 m) sobre su torre de hormigón con encofrado, puerta y barandilla, el
//     yugo y el cuadrípode; gira despacio (o.giro 0–1); al pie, una caseta de chapa con su ventana encendida, un depósito
//     y una camioneta. Hierba que se mece en ondas, matas, piedras, cardos y el camino de la granja. Devuelve suelo 150, libre [48, 200]
//     (el tronco del eucalipto grande está en x 28–32), antena [cx, cy] (centro del
//     plato), torre [x0, y0, x1, y1], mar (y), caseta [x0, y0, x1, y1]. Delante: una cerca de postes y alambre en la
//     esquina de abajo a la derecha (x 204–320), fuera de libre.
//   'ata' (general): LAS ANTENAS DEL NORTE DE CALIFORNIA (2020), mañana clara de montaña, luz desde la izquierda.
//     Cielo azul intenso tramado, un volcán nevado al fondo (sin rasgos reconocibles: cono ancho con canales de nieve y
//     roca, la ladera de la derecha en sombra azul) con una nube lenticular que se deforma en la cima y cúmulos que pasan;
//     un cinturón de bosque azulado y un muro de pinos oscuros en dos términos; la pradera dorada verdosa con flores
//     (altramuces morados, amarillas), un camino de tierra con rodadas que llega a las antenas; MUCHAS ANTENAS PEQUEÑAS
//     iguales (plato de 6 m con el brazo lateral de la bocina) en cinco grupos a varias distancias, todas girando juntas
//     (o.giro); un edificio blanco bajo con un remolque y un depósito; una camioneta que sube por el camino con su polvo;
//     dos ciervos al borde del bosque que pastan y levantan la cabeza; un arroyo con juncos y brillos que corren cruza la
//     pradera por detrás de los personajes (y ≈ 125–138); un ratonero que planea; un pino grande en cada
//     lado del encuadre que se mece; ondas de viento en la hierba. Devuelve suelo 152, libre [56, 250] (el pino de la izquierda llega a x ≈ 44 a la altura de
//     los personajes), horizonte 100,
//     volcan [x, y] (la cima), platos: [[cx, cy, r]…], edificio [x0, y0, x1, y1], camino [[x, y]…], arroyo [[x, y]…].
//   'ata' + o.camara 'estrella': UN DESPACHO DE CASA DE NOCHE (2020), con caballeroWO de pie a la izquierda. Pared
//     enlucida con la luz azul del monitor y la cálida del flexo, zócalo, parqué con vetas y una alfombra; una ventana con
//     cortinas que se mecen, un gato naranja que duerme en el alféizar moviendo la cola (cielo de noche con estrellas que titilan y luces de un pueblo lejano), un radiador debajo,
//     un telescopio de aficionado en su trípode apuntando a la ventana, un cuadro de una galaxia y una balda con libros
//     sin letras y un globo. En la pared del fondo, sobre la mesa, UN MONITOR GRANDE con EL MAPA DE ESTRELLAS: una
//     rejilla de coordenadas curva, la Vía Láctea tenue, unas doscientas estrellas de colores (algunas titilan), la
//     franja marcada en ámbar discontinuo que palpita y, dentro, LA ESTRELLA AMARILLA parecida al Sol, grande, con halo
//     y cuatro puntas; o.rodea 0–1: un círculo rojo que se cierra a su alrededor y, al cerrarse, un recuadro con «1800»
//     (años luz) y unas barras; un cursor que va hacia ella. Devuelve suelo 156, libre [20, 120], estrella [x, y],
//     pantalla [x0, y0, x1, y1], mesa [x0, y, x1] (y = borde de atrás del tablero; el canto, en y + 6; las patas llegan a 163), portatil [x, y], taza [x, y], ventana, telescopio.
//     telescopiosDelante pinta LA MESA (tablero de madera con vetas, faldón, cajonera con tiradores y patas), el pie del
//     monitor, el PORTÁTIL abierto (con el mismo mapa en pequeño y el punto amarillo), la TAZA con vapor, un planisferio,
//     una libreta con un lápiz y el FLEXO encendido: llámala después de los actores.
// Las dos zonas tranquilas (Atom y la barra del año) quedan en cielo o pared: las nubes y los pájaros que pasan por ahí
// se apagan casi del todo.
const V_TELESCOPIOS = {
  vla: { cam: 'tasmania',
    general: { col: ['#bcd8f0', '#c8a878'], geo: { suelo: 156, libre: [30, 250], horizonte: 104, sol: [230, 30], cubo: [112, 111], edificio: [8, 110, 66, 132], camino: 125,
      platos: [[296, 108, 22], [210, 106, 13.8], [171, 105, 10], [148, 104, 7.9], [134, 105, 6.5], [124, 104, 5.5], [116, 104, 4.8], [110, 104, 4.2], [84, 103, 4.2], [60, 105, 4.6], [36, 106, 5]] } },
    tasmania: { col: ['#a8c8e0', '#5a8a3a'], geo: { suelo: 150, libre: [48, 200], antena: [246, 90], torre: [234, 100, 264, 150], mar: 95, caseta: [268, 132, 304, 150] } } },
  ata: { cam: 'estrella',
    general: { col: ['#bcd8f0', '#4a7228'], geo: { suelo: 152, libre: [56, 250], horizonte: 100, volcan: [196, 30], edificio: [246, 100, 296, 116],
      platos: [[167, 101, 4], [204, 101, 4], [181, 102, 4], [213, 102, 4], [190, 103, 4], [145, 104, 5], [116, 104, 5], [163, 104, 5], [134, 106, 5], [211, 107, 5.6], [256, 107, 5.6], [224, 108, 5.6], [192, 109, 5.6], [244, 109, 5.6], [77, 109, 6.6], [100, 110, 6.6], [115, 111, 6.6], [177, 114, 7.6], [133, 115, 7.6], [204, 115, 7.6], [160, 116, 7.6]],
      camino: [[30, 182], [70, 160], [112, 140], [150, 126], [180, 118], [210, 112], [246, 110]], arroyo: [[0, 134], [80, 136], [160, 125], [240, 134], [319, 126]] } },
    estrella: { col: ['#1a2034', '#5a4430'], geo: { suelo: 156, libre: [20, 120], estrella: [214, 80], pantalla: [152, 50, 290, 116], mesa: [122, 142, 320], portatil: [158, 145], taza: [194, 146], ventana: [44, 22, 104, 90], telescopio: [22, 104] } } },
};
export function telescopios(R, t, o = {}) {
  const [enc, cam, geo] = e_vista(o), g = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(geo)) };
  const giro = o.giro != null ? e_lim(o.giro) : 0.5 + 0.5 * Math.sin(t * 0.09);
  if (enc === 'vla' && cam === 'general') e_vla(R, t, o, giro, g);
  else if (enc === 'vla') e_tasmania(R, t, o, giro, g);
  else if (cam === 'general') e_ata(R, t, o, giro, g);
  else e_estrella(R, t, o, g);
  return g;
}
// lo que va por delante de los personajes: la planta rodadora del desierto, la cerca de Tasmania, la mesa del despacho
export function telescopiosDelante(R, t, o = {}) {
  const [enc, cam, geo] = e_vista(o);
  if (enc === 'vla' && cam === 'general') e_vlaDelante(R, t, o);
  else if (enc === 'vla') e_tasmaniaDelante(R, t, o);
  else if (cam === 'estrella') e_mesaDelante(R, t, o, geo);
  return {};
}
// ── F · El archivo: los papeles que vuelven (2006–2026) ───────────────────────────────────────────────────────────
// archivo(R, t, o) pinta la vista que piden o.encuadre y o.camara (un encuadre que no existe cae en 'garaje'; una cámara
// que no es la suya, en 'general') y devuelve su geometría (V_ARCHIVO, abajo). archivoDelante(R, t, o) se llama DESPUÉS
// de los actores con las mismas opciones: pinta lo que va por delante (las tarjetas que vuelan, el costado de la
// estantería cercana, la pila de cajas del sótano, la planta del laboratorio). El listado es f_listado (versión fiel al
// canon del grupo F, con las opciones de piezaListado), porque en esta copia piezaListado aún era esqueleto.
//   'garaje': UN GARAJE de una casa de Ohio a media tarde: vigas vistas, pared de bloques pintados, la puerta basculante
//     subida a medias (fuera: dos casas de enfrente, un árbol, la calle por la que pasa un coche, un niño en bici, nubes
//     a tres velocidades, un pájaro), la estantería de cajas de cartón con números a rotulador, la bici colgada, el
//     tablero perforado con herramientas, el banco con la radio encendida (notas que suben), la lavadora con su cesto, la
//     estantería del fondo con cajas largas de tarjetas perforadas y una nevera, el cortacésped, la bombona, el suelo de
//     hormigón con juntas, mancha de aceite y la luz de la tarde con motas. En el suelo, la CAJA «77» (x 150–181, y
//     138–158) y, a su derecha, dos cajas apiladas con el GATO atigrado dormido encima. EL GAG 7: o.confeti 0–1: la caja
//     da un salto y se abre (0,02–0,08), salen 28 tarjetas perforadas que suben girando y caen revoloteando por el suelo
//     (y 158–174, x 104–256) y se quedan; la primera cae en la cabeza del gato (o.confeti ≈ 0,52), que se despierta,
//     levanta la cabeza con la tarjeta encima, abre los ojos, sale un «!» y mueve la cola. El voluntario (voluntario1WO;
//     el kit no tiene opción de «mayor») se pone a la izquierda de la caja, x ≈ 128–134, dir 1. Cámara 'archivo': UN
//     ARCHIVO DE HISTORIA: tres pasillos de estanterías con cajas grises iguales que huyen al fondo (costados numerados
//     36, 37, 38; en uno, una archivera diminuta empuja su carrito; un fluorescente tiembla), la sala de consulta con zócalo
//     de madera, la foto en sepia de la gran oreja, el reloj, el planero y el termohigrógrafo, y la mesa de consulta con
//     guantes blancos, lápiz y lupa, la lámpara verde de banquero y la VITRINA inclinada con el LISTADO (canon, con el
//     círculo y el «Wow!») bajo el cristal, por el que corre un destello. Delante: el costado de la estantería más
//     cercana en el borde izquierdo (x 0–13).
//   'fotos': EL SÓTANO (2006–2017): viguetas, tuberías de cobre, pared de bloques con humedad, un ventanuco por el que
//     pasan unos pies, montañas de cajas de listados a la izquierda, la caldera (llama azul) y el calentador, una bombilla
//     desnuda que se balancea, y la mesa del ATRIL en la línea de suelo de los actores (x 138–250, tablero y 136–145): la
//     peana con la página, la columna y el brazo con la cámara que mira abajo, dos focos en trípode, el cable del
//     disparador que cuelga hasta x 138, y 146 (para la mano de abelWO, que va a la izquierda de la mesa, x ≈ 120), el
//     portátil que enseña la última foto. o.flash 0–1: el destello (estrella en el objetivo y la luz que blanquea el centro).
//     o.u 0–1: la pila de por hacer (izquierda) mengua y la de hechas (derecha) crece; la foto del portátil cambia con
//     cada página. Delante: un montón de cajas en la esquina de abajo a la izquierda (x 0–34, y 132–180) con una tira de
//     papel que se mueve. Cámara 'laboratorio': EL LABORATORIO DE PUERTO RICO (2024–2026): pared amarilla clara, pizarra
//     blanca con la curva (canon) en rojo, rayas azules, 72 y 1977; la ventana con palmeras que se mecen, montes verdes,
//     tejados del campus, nubes y pájaros (sin el radiotelescopio, que ya no existe), un anolis en la repisa; ventilador de
//     techo y de pie que giran, el tablón con fotos de listados, archivadores, la mesa con dos monitores (la foto del
//     listado con su círculo y una curva verde; miniaturas que pasan), teclado, taza que humea, la silla, una caja de
//     listados en el suelo, una alfombra tejida bajo los personajes y el terrazo con la mancha de sol. mendezWO de pie a
//     la izquierda de la mesa, x ≈ 170, mirando a la pantalla. Delante: la planta grande abajo a la izquierda (x 0–30).
//   'pantalla': LA PANTALLA de cerca (sin actores): el monitor sobre la mesa, con la foto del listado ampliada (canon,
//     con círculo y «Wow!») en la ventana grande y, encima, el panel de la gráfica: la curva vieja de 1977 en ámbar tenue,
//     baja, y la nueva en verde fósforo, que crece al CUÁDRUPLE con o.alto 0–1 (suave); con o.alto > 0,95 sale una flecha
//     de la vieja a la nueva y un «4×» que late. A la derecha, la consola de 1977 de imitación: filas de luces que
//     parpadean y, debajo, líneas de código como rayas que se escriben solas (o.codigo 0–1, con cursor); debajo, una tira
//     de miniaturas de páginas que corre. Puntero, reflejo, teclado sin letras, pila de listados, taza que humea.
//     Cámara 'calendario': un CALENDARIO de agosto de 2027 en la pared del laboratorio (foto de costa con palmera, 2027,
//     la tira de los días de la semana en colores, el domingo en rojo, los días 1–31 desde el domingo 1) con el 15
//     rodeado a mano en rojo (o.rodea 0–1); la ventana con palmeras a la izquierda, el tablón con fotos, una lagartija que
//     trepa por la pared; delante, la mesa con montañas de listados (sus hojas de arriba tiemblan con el aire), cajas,
//     carpetas, la taza, los lápices, una banderita de Puerto Rico y los cajones con tiradores de latón.
const V_ARCHIVO = {
  garaje: { cam: 'archivo',
    general: { col: ['#d6cab2', '#a6a096'], geo: { suelo: 158, libre: [30, 240], caja: [164, 138], gato: [211, 118], puerta: [13, 39, 99, 131], banco: [152, 100, 228, 131] } },
    archivo: { col: ['#dcd6c8', '#bcb4a2'], geo: { suelo: 158, libre: [20, 178], listado: [243, 93], vitrina: [198, 66, 272, 127], mesa: [180, 127, 292, 152] } } },
  fotos: { cam: 'laboratorio',
    general: { col: ['#8e8c88', '#9a9a96'], geo: { suelo: 156, libre: [30, 250], foto: [189, 104], disparador: [138, 146], pagina: [190, 140], mesa: [138, 136, 250, 158], porHacer: [153, 142], hechas: [219, 142] } },
    laboratorio: { col: ['#efe2b4', '#d2cec2'], geo: { suelo: 156, libre: [30, 186], pantalla: [200, 86, 262, 121], ventana: [112, 28, 184, 96], pizarra: [17, 31, 103, 91], mesa: [186, 127, 298, 150] } } },
  pantalla: { cam: 'calendario',
    general: { col: ['#0c1820', '#2a2e36'], geo: { suelo: 180, libre: [0, 0], curva: [112, 46, 194, 134], vieja: [154, 108], nueva: [154, 48], consola: [203, 33, 261, 109], teclado: [70, 161, 196, 174] } },
    calendario: { col: ['#efe2b4', '#4a3420'], geo: { suelo: 180, libre: [0, 0], dia: [107, 107], calendario: [96, 28, 212, 129] } } },
};
export function archivo(R, t, o = {}) {
  const enc = V_ARCHIVO[o.encuadre] ? o.encuadre : 'garaje', e = V_ARCHIVO[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const pinta = { garaje: { general: f_garaje, archivo: f_archivoHist }, fotos: { general: f_sotano, laboratorio: f_labPR }, pantalla: { general: f_pantalla, calendario: f_calendario } }[enc][cam];
  pinta(R, t, o);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) };
}
// lo de delante de los personajes en cada vista de archivo(); se llama después de los actores, con las mismas opciones:
// el garaje, las tarjetas perforadas que vuelan y caen (o.confeti); el archivo, el costado de la estantería más cercana y
// el carrito de libros; el sótano, la pila de cajas del primer término; el laboratorio, la planta grande de la esquina.
// La pantalla y el calendario no llevan nada delante. Nunca copia un fondo entero (no borra a los actores).
export function archivoDelante(R, t, o = {}) {
  const enc = V_ARCHIVO[o.encuadre] ? o.encuadre : 'garaje', cam = o.camara === V_ARCHIVO[enc].cam ? V_ARCHIVO[enc].cam : 'general';
  if (enc === 'garaje' && cam === 'general') f_tarjetasVuelan(R, t, o.confeti ?? 0);
  else if (enc === 'garaje') f_archivoDelante(R, t);
  else if (enc === 'fotos' && cam === 'general') f_sotanoDelante(R, t);
  else if (enc === 'fotos') f_plantaGrande(R, t, 0, 180);
  return {};
}
// ── G · Hoy (el estudio de Atom) y un despacho de 1959 ─────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo,
// libre y los puntos que usan las escenas). Lo de delante de los personajes va en hoyDelante (se llama DESPUÉS de los
// actores, con las mismas opciones). Las cámaras de cerca ('techo', 'pizarra') son insertos: libre [0, 0].
//   'estudio': EL ESTUDIO DE ATOM, de día (el de siempre: moldura, papel pintado, friso de cuarterones verde azulado,
//     tarima, alfombra, librería de nogal con su helecho, ventana con el parque y sus cortinas, radiador, sillón con el
//     gato gris), esta vez con el techo a la vista (y 0–20, liso bajo el año; moldura y 21–27, lisa tras Atom) y un papel de estrellitas y planetas en
//     azul y ocre apagados (tranquilo tras Atom). EL GAG 1 Y 8: la «gran oreja» casera, un EMBUDO de cocina de aluminio
//     con un VASO pegado del pitorro boca abajo, sujeto al TECHO con dos tiras de cinta (boca en x 246, y 11; el vaso
//     acaba en y ≈ 51), y debajo LA SILLA con dos libros gordos y el rollo de cinta (con lo que se subió a pegarlo: un
//     chibi de pie sobre los libros (y 119) llega con la cabeza a y ≈ 94; el embudo queda alto, a propósito). La LÁMPARA de techo
//     (pantalla verde, x 200) con su luz sobre el escritorio; el escritorio contra la pared (x 146–222, tablero y 116)
//     con la radio de transistores (la aguja del dial que busca, el piloto), la taza con vapor y una pila de papel
//     continuo de bandas verdes que cuelga del canto; el reloj de pared (x 228, y 70) con su segundero; el CUADRO de
//     una antena bajo las estrellas (x 270–306, y 56–80) sobre el sillón. La PIZARRA de pared (x 128–184, y 38–86) con
//     su repisa, la tiza y el borrador (a su derecha, una repisa de pared con un catalejo y libros, x 190–218, y 78):
//     o.pizarra 0–1: UNA SOLA MARCA de tiza, un palo vertical (x 140, y 48–76) que se
//     traza de arriba abajo, y nada al lado (el hueco, con la mancha de un borrado viejo). o.oreja 0–1 (por omisión 1):
//     1 = pegado al techo con su cinta; menos de 1, el embudo baja (sin cinta) hasta 30 px (la escena pone la mano).
//     o.ruido: 0 (nada), 1 (LA ASPIRADORA DEL VECINO: rayitas de vibración que tiemblan en el techo alrededor del
//     embudo, el embudo y el vaso que tiritan, polvo de yeso que cae del techo, el cuadro que tiembla y se tuerce un
//     poco), 2 (TRES GOLPECITOS: tres ondas de puntos que bajan del techo por el embudo, una tras otra, en u = 0,08,
//     0,38 y 0,68, y la lámpara que se mece después de cada una); o.u 0–1 marca el avance de los golpecitos (sin o.u,
//     se repiten cada 3 s con t). o.luz 'dia' (por omisión), 'tarde' (todo se entibia hacia el ámbar) o 'noche' (la
//     penumbra azul con el cono de la lámpara de techo, la bombilla que brilla, la polilla, y por la ventana la luna, las
//     estrellas y una farola; el ficus de hoyDelante queda sin teñir). En hoyDelante: la maceta con el ficus (x 0–32, y 112–179), que se mece.
//     Devuelve suelo 158, libre [40, 240], embudo: [x, y] (el centro de la boca, ahora), vaso: [x, y] (el fondo del
//     vaso, ahora), silla: [x, y] (el asiento, sobre los libros: y 119), pizarra: [x0, y0, x1, y1], marca: [x, y] (la
//     punta de la tiza, ahora), lampara: [x, y] (la bombilla), toc: [x, y] (el punto del techo donde suenan los
//     golpes), toques: [u ×3], golpe: el índice del golpecito que acaba de sonar (o −1).
//     Cámara 'techo': EL EMBUDO Y EL VASO DE CERCA CONTRA EL TECHO (a escala ≈ 3): el yeso del techo (y 0–61) con su
//     grieta, la mancha de una gotera vieja y el rosetón de la lámpara (que asoma y se mece a la izquierda), la moldura
//     a escala 2 (y 62–75), el papel a escala 2 (y 76–179), una TELARAÑA colgada de la moldura (x 6–40) con su araña
//     que sube y baja por el hilo, el RELOJ de pared a escala 2 (x 70, y 140, con su segundero), el interruptor de latón
//     con su cable (x 122–134) y la esquina del cuadro abajo a la derecha; el gotelé y los remiendos del yeso, el cable
//     de la lámpara grapado al techo, el halo de la bombilla en el papel, UNA MOSCA que se pasea por el techo (x 190–260)
//     y la sombra del embudo y el vaso en el papel, corrida a la derecha. El embudo (boca en x 176, y 30; cono y 30–90; pitorro y 90–111; vaso y 112–148) con TRES TIRAS
//     DE CINTA al techo; o.oreja 0–1: lo mismo que arriba (baja hasta 22 px, el vaso hasta y 172,
//     sin cinta, con la sombra en el techo que crece al acercarse); o.ruido 1 y 2 como arriba, de cerca (las ondas
//     bajan por el cono como chevrones de luz hasta el vaso). Devuelve embudo: [x, y] (donde la mano lo coge: el
//     fondo del vaso: y 150 pegado, hasta 172 con o.oreja 0; para la mano canónica T.mano), boca: [x, y], techo: la y
//     del techo donde se pegan las cintas (30, fija), caida: la bajada máxima (22), toc, toques, golpe.
//   'despacho': UN DESPACHO DE 1959 de una universidad (suelo 156): de
//     arriba abajo, paneles de madera oscura con sus vetas y algún nudo (tranquilos bajo el año y tras Atom), la
//     barandilla (y 116–119) con cuarterones en relieve debajo; LA PIZARRA VERDE grande (x 60–220, y 40–110) con
//     marco de roble, borrones del borrador y, en tiza, UN ÁTOMO DE HIDRÓGENO (un punto con su órbita, centro 100, 74)
//     y UNA ONDA con su «1420» y su «21» (solo cifras), la repisa con tizas y borrador y el polvo que cae; a la
//     izquierda la estantería de libros (lomos de colores sin letras, una lámpara de válvula, un globo) con una pila de
//     revistas en el suelo (x 53–68), el reloj
//     eléctrico (x 228, y 54) con su segundero; a la derecha LA VENTANA (x 238–272, y 42–104) con árboles de otoño que
//     se mecen, hojas que caen, cielo tramado con nubes de tres tonos, pájaros, el ala de ladrillo de enfrente y un
//     estudiante que pasa con sus libros; la persiana veneciana medio subida; el radiador debajo y el PERCHERO con el
//     sombrero y la gabardina (x 300); el suelo de espiga con su alfombra y la
//     mancha de sol con motas; sobre la pizarra, LA FOTO ENMARCADA de un radiotelescopio (x 178–214, y 8–31) colgada de
//     su cordel. o.luz 'dia' (por omisión), 'tarde' o 'noche' (la penumbra azul con el cono del flexo, en 276, 104, y por la
//     ventana la luna y una farola del campus; el escritorio de hoyDelante queda sin teñir). En hoyDelante: EL ESCRITORIO de roble oscuro (x 226–319, tablero y 126) con el flexo
//     encendido, el teléfono negro de disco, papeles, una regla de cálculo y el tintero (todo fuera de libre: nadie
//     detrás del escritorio, tapa entero a un chibi). Devuelve suelo 156, libre [40, 210], pizarra: [x0, y0, x1, y1], atomo: [x, y], onda: [x0, y, x1], mesa: [x0, y,
//     x1]. Cámara 'pizarra': LA PIZARRA DE CERCA (x 8–312, de arriba hasta y 148, a escala 2; se sale por arriba, sin tiza en
//     y ≤ 22) con el marco de roble a los lados y abajo, el borde del
//     átomo cortado a la izquierda, los borrones del borrador en abanico, cuentas viejas mal borradas, el polvo acumulado
//     abajo, el brillo de la ventana que respira con las nubes, y, en fila (y 92–134), LA FRASE DEL FINAL EN ICONOS que se escribe con
//     tiza (o.u 0–1; por omisión 1): UNA LUPA (aro, mango largo doble y un brillo dentro; x 80–128), UNA FLECHA (x 136–196) y UN CERO TACHADO (x 214–252: «si
//     nunca buscamos, es cero»), con el polvo de tiza que cae del trazo; abajo la repisa (y 149–156) con las tizas, los
//     cabos, la caja de tizas, el borrador y el panel de madera. o.cifras 1 (por omisión 0): LAS CUENTAS DE 1959 de la
//     vista general a escala 2 (la onda de x 47 a 203 en y 31–57, el «1420» en x 103 base 74 y el «21» en x 75 base 102,
//     de 16 px, y su línea de puntos en y 98), para el plano de Morrison (con o.u 0: la frase no cabe con ellas). Devuelve tiza: [x, y] (la punta del trazo, ahora: la escena pone ahí la mano),
//     iconos: [[x, y] ×3] (sus centros), repisa: [x0, y, x1].
const V_HOY = {
  estudio: { cam: 'techo', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 240], embudo: [246, 11], vaso: [246, 51], silla: [247, 119], pizarra: [128, 38, 184, 86], marca: [140, 76], lampara: [200, 40], toc: [246, 4], toques: [0.08, 0.38, 0.68] } }, techo: { col: ['#f0e8dc', '#c8b8a0'], geo: { suelo: 180, libre: [0, 0], embudo: [176, 150], boca: [176, 30], toc: [176, 22], toques: [0.08, 0.38, 0.68] } } },
  despacho: { cam: 'pizarra', general: { col: ['#6a4a30', '#2a3a2a'], geo: { suelo: 156, libre: [40, 210], pizarra: [60, 40, 220, 110], atomo: [100, 74], onda: [132, 66, 206], mesa: [226, 126, 319] } }, pizarra: { col: ['#2a3a2a', '#6a4a30'], geo: { suelo: 180, libre: [0, 0], tiza: [252, 113], iconos: [[95, 113], [166, 113], [233, 113]], repisa: [8, 149, 312] } } },
};
export function hoy(R, t, o = {}) {
  const [enc, cam] = g_whVista(o), geo = JSON.parse(JSON.stringify(V_HOY[enc][cam].geo));
  const f = { estudio: { general: g_whEstudio, techo: g_whTecho }, despacho: { general: g_whDespacho, pizarra: g_whPizarra } }[enc][cam];
  return { encuadre: enc, camara: cam, ...geo, ...(f(R, t, o) || {}) };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const [enc, cam] = g_whVista(o);
  const f = { estudio: { general: g_whEstudioDelante }, despacho: { general: g_whDespachoDelante } }[enc]?.[cam];
  return f ? f(R, t, o) || {} : {};
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_WO = { oreja: V_OREJA, sala: V_SALA, listado: V_LISTADO, cielo2: V_CIELO, telescopios: V_TELESCOPIOS, archivo: V_ARCHIVO, hoy: V_HOY };

// resuelve encuadre, cámara, luz y época con las mismas reglas en oreja() y orejaDelante()
function a_orVista(o) {
  const enc = V_OREJA[o.encuadre] ? o.encuadre : 'campo', e = V_OREJA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const luzDef = enc === 'caseta' ? (cam === 'bocinas' ? 'noche' : 'tarde') : enc === 'cinta' ? 'noche' : enc === 'golf' && cam === 'plancha' ? 'tarde' : 'dia';
  const luz = ['dia', 'tarde', 'noche'].includes(o.luz) ? o.luz : luzDef;
  let epoca = [1958, 1977, 1998, 2000].includes(o.epoca) ? o.epoca : enc === 'golf' ? 1998 : 1977;
  if (enc === 'golf' && epoca < 1998) epoca = 1998;
  if (enc === 'golf' && cam === 'plancha') epoca = 2000;
  return { enc, cam, luz, epoca, geo: JSON.parse(JSON.stringify(e[cam].geo)) };
}

// mezcla dos colores (k = 0 → a, 1 → b)
function a_orMez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// umbral de trama ordenada 4×4 (0–1)
const a_OR_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_orU = (x, y) => (a_OR_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// el tono de una rampa en f (0–1), tramado entre escalones
const a_orTono = (rp, f, x, y) => rp[Math.max(0, Math.min(rp.length - 1, Math.floor(f * (rp.length - 1) + a_orU(x, y))))];

const a_orCl = (v) => Math.max(0, Math.min(1, v));

const a_orSuave = (v) => { v = a_orCl(v); return v * v * (3 - 2 * v); };

// las paletas de la gran oreja por luz (los tonos se convierten una vez)
const a_OR_PALS = {
  dia: { cielo: ['#2c66b8', '#3876c4', '#4886ce', '#5a98d8', '#70aade', '#8abce4', '#a8cee8', '#c4dcec'], nube: ['#ffffff', '#e4ecf6', '#b8cade'], sol: '#fff8d8', solH: '#fff0b0',
    lejos: ['#6e8ea8', '#86a2b8', '#a0b6c6'], bosque: ['#2a4426', '#3a5a30', '#4e723c', '#68904a'], campo: ['#6a8a3a', '#84a24a', '#a0b85a', '#c2ae4a', '#d6c462', '#9a7a48'],
    hierba: ['#335a22', '#467228', '#5e8c34', '#78a644', '#98c25a'], tierra: ['#5e4430', '#7c5c40', '#9c7a56'], flor: ['#f4f0e0', '#f0d048', '#c86ad0'],
    alu: ['#4e5662', '#646e7a', '#7c8692', '#959eaa', '#b0b8c2', '#ccd2da', '#e6eaee'], cel: ['#6e7680', '#b4bac2', '#e2e6ea', '#ffffff'],
    suelo: ['#5a7898', '#7092b4', '#88aacc', '#a4c2de', '#c0d6ea', '#dceaf6', '#ffffff'], hormigon: ['#7a7670', '#9c978e', '#bcb7ac', '#d6d2c6'],
    madera: ['#4a3020', '#6e4a30', '#946a44'], ladrillo: ['#7a2e26', '#a03c30', '#c05a44'], blanco: '#f4f2ea', k: '#1c1222', alambre: '#5a5e66', luzRoja: '#ff4a3a',
    ventana: ['#2a3a4c', '#4a6a88', '#9cc0dc'], amarillo: ['#a87a10', '#e0b020', '#f8d860'], coche: ['#4e1a1c', '#7a2a2a', '#a44438', '#c86a50'], noche: 0, tarde: 0 },
  tarde: { cielo: ['#3a3a78', '#54468a', '#7a5290', '#a65c84', '#cc6a70', '#e4805c', '#f09a58', '#f6be70'], nube: ['#ffe0a8', '#f0a07a', '#9a5e80'], sol: '#fff2c0', solH: '#ffc870',
    lejos: ['#7a5a7c', '#94687a', '#b07e7e'], bosque: ['#2a2430', '#3a3036', '#54443c', '#6e5a40'], campo: ['#6a6a34', '#887a3c', '#a88a44', '#d09a48', '#e8b45a', '#9a6a40'],
    hierba: ['#2e3a1e', '#465226', '#62682e', '#86803a', '#b8984a'], tierra: ['#4e3428', '#704a34', '#946448'], flor: ['#f8e0c0', '#f8c048', '#d070b0'],
    alu: ['#3a3242', '#4e4250', '#68565e', '#86706e', '#a88a80', '#cca690', '#f0c8a0'], cel: ['#5a4a52', '#a88a84', '#e0b8a0', '#fff0d8'],
    suelo: ['#6a4a6a', '#8e5a6e', '#b46a6a', '#d88a6a', '#ecaa74', '#f8cc8c', '#fff4cc'], hormigon: ['#5e4a46', '#806660', '#a2847a', '#c8a48e'],
    madera: ['#3a2418', '#5e3a26', '#86583a'], ladrillo: ['#6a2622', '#90382c', '#b85a40'], blanco: '#fae6cc', k: '#1c1222', alambre: '#4a3a40', luzRoja: '#ff4a3a',
    ventana: ['#3a2a3a', '#7a5a6a', '#f0c898'], amarillo: ['#a06a10', '#e0a020', '#f8d070'], coche: ['#3e141a', '#6a2224', '#963a34', '#c46448'], noche: 0, tarde: 1 },
  noche: { cielo: ['#05081a', '#080c20', '#0a1026', '#0d142c', '#111a34', '#16203e', '#1c2848', '#243254'], nube: ['#3a4670', '#283358', '#1a2242'], sol: '#f4f0d8', solH: '#c8ccd8',
    lejos: ['#141c34', '#1a2440', '#222e4c'], bosque: ['#070c12', '#0c1418', '#121c20', '#1a2628'], campo: ['#121e1c', '#182620', '#1e2e24', '#262e22', '#2e3626', '#22201c'],
    hierba: ['#0a1410', '#0e1c14', '#14261a', '#1c3222', '#28402c'], tierra: ['#16120e', '#201a14', '#2c241a'], flor: ['#7a8090', '#8a8a5a', '#6a5a80'],
    alu: ['#121826', '#1a2232', '#222c40', '#2c384e', '#384660', '#4a5a76', '#62749a'], cel: ['#222a3c', '#3c4862', '#5a6886', '#8494b8'],
    suelo: ['#0a1024', '#101830', '#16223e', '#1e2e50', '#2a3e66', '#3c5482', '#6a84b8'], hormigon: ['#1a1c24', '#24262e', '#30323a', '#3e4048'],
    madera: ['#120c0c', '#1e1614', '#2c201c'], ladrillo: ['#1e1416', '#2a1a1c', '#3a2424'], blanco: '#8a90a4', k: '#05060c', alambre: '#2a3040', luzRoja: '#ff3a2a',
    ventana: ['#0e1420', '#3a3220', '#ffd27a'], amarillo: ['#3a2c10', '#6a5418', '#a08428'], coche: ['#1a0e12', '#2a1418', '#3e2024', '#5a3434'], noche: 1, tarde: 0 },
};

const a_OR_PC = {};

function a_orPal(luz) {
  if (a_OR_PC[luz]) return a_OR_PC[luz];
  const P = {}; for (const [k, v] of Object.entries(a_OR_PALS[luz])) P[k] = Array.isArray(v) ? v.map(hex) : typeof v === 'string' ? hex(v) : v;
  P.luz = luz; return (a_OR_PC[luz] = P);
}

// una capa fija guardada en un búfer (se dibuja la primera vez con dibuja(), que puede devolver datos extra, p. ej.
// máscaras) y se copia en cada fotograma
const a_OR_CAPAS = new Map();

function a_orCapa(R, clave, dibuja) {
  let c = a_OR_CAPAS.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja() || {}; R.usar(prev); c = { b, ...extra }; a_OR_CAPAS.set(clave, c); }
  R.copiar(c.b); return c;
}

// una foto del búfer en uso (para sacar máscaras comparando antes y después)
const a_orFoto = (R) => Uint32Array.from(R.buf);

// ¿está (x, y) en una zona tranquila (la esquina de Atom o la barra del año)?
const a_orTranquila = (x, y) => (x >= 274 && y <= 47) || (x >= 16 && x <= 174 && y <= 21);

// lo lejos que está (x, y) de las zonas tranquilas, en píxeles (0 dentro): para fundir hacia ellas sin bordes duros
const a_orLejosTranq = (x, y) => Math.min(Math.hypot(Math.max(0, 274 - x), Math.max(0, y - 47)), Math.hypot(Math.max(0, 16 - x, x - 174), Math.max(0, y - 21)));

// el cielo tramado por bandas de la rampa entre y0 e y1 (sin escalones lisos: cada píxel elige entre dos tonos con la
// trama y una ondulación suave), con el sol y su halo (día y tarde), o la luna y la Vía Láctea (noche)
function a_orCielo(R, P, y0, y1, o = {}) {
  const B = R.buf, rp = P.cielo, n = rp.length - 1, [sx, sy, sr] = o.sol ?? (P.luz === 'tarde' ? [58, y1 - 12, 9] : P.luz === 'noche' ? [228, 30, 5] : [236, 28, 7]);
  for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) {
    let f = (y - y0) / Math.max(1, y1 - y0 - 1) + Math.sin(x * 0.045 + y * 0.12) * 0.025 + (h(x >> 3, y >> 2, 701) - 0.5) * 0.03;
    if (P.luz !== 'noche') { const d = Math.hypot(x - sx, (y - sy) * 1.3); f += Math.max(0, 1 - d / (P.luz === 'tarde' ? 120 : 70)) * (P.luz === 'tarde' ? 0.45 : 0.22); }
    if (a_orTranquila(x, y)) f -= Math.sin(x * 0.045 + y * 0.12) * 0.025 + (h(x >> 3, y >> 2, 701) - 0.5) * 0.03;   // sin ondulación ni ruido
    B[y * 320 + x] = a_orTono(rp, a_orCl(f), x, y);
  }
  if (P.luz === 'noche') {
    // la Vía Láctea: una banda diagonal de polvo tramado con nudos más claros y una grieta oscura, lejos de las zonas
    // tranquilas
    for (let y = y0; y < y1 - 4; y++) for (let x = 0; x < 320; x++) { if (a_orTranquila(x, y)) continue; const d = (x * 0.42 + y - 128) / 15, e = Math.exp(-d * d), r = h(x >> 1, y >> 1, 702), g = Math.abs(d + 0.15 + Math.sin(x * 0.05) * 0.2) < 0.18;
      const k = (e * (0.55 + r * 0.6) - (g ? 0.35 : 0)) * a_orCl(a_orLejosTranq(x, y) / 14); if (k > 0.3 + a_orU(x, y) * 0.5) B[y * 320 + x] = a_orMez(B[y * 320 + x], k > 0.75 ? hex('#7a86b4') : hex('#3c4a7a'), 0.55); }
    R.disco(sx, sy, sr + 4, a_orMez(rp[3], P.solH, 0.25)); R.disco(sx, sy, sr + 2, a_orMez(rp[3], P.solH, 0.45)); R.disco(sx, sy, sr, P.sol); R.disco(sx + 2, sy - 1, sr - 1, a_orMez(P.sol, rp[2], 0.15));
    R.pset(sx - 2, sy + 1, hex('#c8c4b0')); R.pset(sx - 1, sy - 2, hex('#d8d4c0'));
  } else if (o.sinSol !== true) { R.disco(sx, sy, sr + 3, a_orMez(B[sy * 320 + sx], P.solH, 0.5)); R.disco(sx, sy, sr + 1, P.solH); R.disco(sx, sy, sr, P.sol); R.disco(sx - 2, sy - 2, Math.max(1, sr - 4), hex('#ffffff')); }
}

// una nube de tres tonos (sombra abajo a la derecha, cuerpo y luz arriba a la izquierda) hecha de lóbulos; ps(x, y, c)
// decide dónde se puede pintar; w: ancho; sem: forma
function a_orNube(ps, cx, cy, w, tonos, sem) {
  const L = [], n = 3 + Math.floor(h(sem, 1, 703) * 3);
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5; L.push([cx + u * w * 0.85, cy - (1 - Math.abs(u) * 1.6) * w * 0.12 - h(sem, i, 704) * w * 0.08, w * (0.2 + h(sem, i, 705) * 0.1) * (1 - Math.abs(u) * 0.6)]); }
  const x0 = Math.floor(cx - w * 0.6), x1 = Math.ceil(cx + w * 0.6), y0 = Math.floor(cy - w * 0.45), y1 = Math.ceil(cy + w * 0.16);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (y > cy + w * 0.12) continue;   // la base plana del cúmulo
    let dn = 9, dl = 9; for (const [lx, ly, r] of L) { const d = Math.hypot(x - lx, (y - ly) * 1.25) / r; if (d < dn) dn = d; const d2 = Math.hypot(x - lx + r * 0.3, (y - ly + r * 0.35) * 1.25) / r; if (d2 < dl) dl = d2; }
    if (dn > 1) continue;
    const base = (y - (cy + w * 0.12)) > -w * 0.08, c = dl < 0.55 + a_orU(x, y) * 0.25 ? tonos[0] : base || dn > 0.86 - a_orU(x, y) * 0.2 ? tonos[2] : tonos[1];
    ps(x, y, c);
  }
}

// las nubes que pasan (tres tamaños a tres velocidades); en el cielo solo donde masc lo deja (la capa fija dejó cielo),
// y su reflejo (más tenue) en el suelo de metal si refl(x, y) devuelve dónde cae; off: lo que corre la cinta
function a_orNubes(R, t, P, o) {
  const B = R.buf, { masc, refl, y0 = 26, y1 = 60, n = 6, off = 0, sem = 0, escala = 1 } = o, tonos = P.luz === 'noche' ? P.nube : P.nube, mR = o.mascR;
  for (let k = 0; k < n; k++) {
    const capa = k % 3, v = [1.2, 2.1, 3.4][capa], w = Math.round(([34, 24, 16][capa] + h(k, 2, 706 + sem) * 10) * escala), y = Math.round(y0 + (y1 - y0) * ((capa === 2 ? 0.15 : capa === 1 ? 0.5 : 0.85) + (h(k, 3, 706 + sem) - 0.5) * 0.3));
    const x = Math.round(((h(k, 1, 706 + sem) * 380 + t * v + off) % 400 + 400) % 400 - 40);
    a_orNube((xx, yy, c) => {
      if (xx < 0 || xx > 319 || yy < 0 || yy > 179) return; if (yy < 60 && a_orU(xx, yy) >= a_orCl(a_orLejosTranq(xx, yy) / 12)) return; const i = yy * 320 + xx;
      if (masc[i]) B[i] = P.luz === 'noche' ? a_orMez(B[i], c, 0.55) : c;
      if (refl) { const r = refl(xx, yy); if (r) { const [rx, ry] = r, j = ry * 320 + rx; if (rx >= 0 && rx < 320 && ry >= 0 && ry < 180 && mR[j]) B[j] = a_orMez(B[j], c, P.luz === 'noche' ? 0.25 : 0.42); } }
    }, x, y, w, tonos, k + sem * 7);
  }
}

// estrellas que titilan donde masc deja cielo (lejos de las zonas tranquilas), corridas off píxeles; y su reflejo en el
// metal si refl(x, y) devuelve dónde cae
function a_orEstrellas(R, t, P, o) {
  const B = R.buf, { masc, refl, y1 = 64, n = 150, off = 0, mascR } = o;
  for (let k = 0; k < n; k++) {
    const x = Math.round(((h(k, 1, 707) * 320 + off + t * 0.25) % 320 + 320) % 320), y = Math.round(h(k, 2, 707) * (y1 - 3));
    if (a_orTranquila(x, y) || !masc[y * 320 + x]) continue;
    const b = h(k, 3, 707), tw = Math.sin(t * (1.5 + b * 3) + k) > 0.6 ? 1 : 0, c = b > 0.93 ? hex('#ffffff') : b > 0.7 ? hex('#dfe6ff') : b > 0.4 ? hex('#a8b4dc') : hex('#6a76a4');
    B[y * 320 + x] = tw && b < 0.4 ? hex('#3c4670') : c;
    if (b > 0.9) { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && xx < 320 && yy >= 0 && masc[yy * 320 + xx]) B[yy * 320 + xx] = a_orMez(B[yy * 320 + xx], c, tw ? 0.25 : 0.55); } }
    if (refl && b > 0.45) { const r = refl(x, y); if (r) { const [rx, ry] = r; if (rx >= 0 && rx < 320 && ry >= 0 && ry < 180 && mascR[ry * 320 + rx]) B[ry * 320 + rx] = a_orMez(B[ry * 320 + rx], c, 0.5); } }
  }
}

// el fondo lejano entre el horizonte hor y yH: el bosquecillo azulado y los árboles de las lindes, los campos a parches
// (maizales en hileras, trigo, pasto, tierra arada) que se ensanchan hacia delante, la carretera con sus postes de la
// luz, una granja (granero rojo con tejado a dos aguas, casa blanca, silo de hormigón con cúpula) en (gx, hor); o.casas:
// en su lugar una urbanización nueva de tejados iguales (2000)
function a_orLejos(R, P, hor, yH, o = {}) {
  const B = R.buf, { gx = 152, casas = false } = o;
  // los campos: franjas que se ensanchan hacia abajo, partidas en parches por lindes inclinadas
  for (let y = hor; y < yH; y++) { const z = (y - hor + 2) / (yH - hor + 2), fila = Math.floor(Math.log(y - hor + 3) * 4.2);
    for (let x = 0; x < 320; x++) { const lin = Math.floor((x - 160) / (60 + z * 160) + (y - hor) * 0.012 + 20), tipo = Math.floor(h(fila, lin, 708) * 5);
      let c; const r = h(x, y, 709);
      if (tipo === 0 || tipo === 1) { // maizal: hileras verticales que se abren en abanico hacia el punto de fuga
        const hil = ((x - 160) / (1 + z * 2.6) + 400) % 3 < 1.2; c = hil ? P.campo[0] : r < 0.3 ? P.campo[2] : P.campo[1]; }
      else if (tipo === 2) c = ((y + Math.floor(x / 9)) & 1) ? P.campo[3] : (r < 0.4 ? P.campo[4] : P.campo[3]);   // trigo segado
      else if (tipo === 3) c = (x + y * 2) % 4 === 0 ? P.campo[5] : r < 0.5 ? P.tierra[1] : P.tierra[2];   // tierra arada
      else c = r < 0.25 ? P.hierba[3] : P.hierba[2];   // pasto
      if (Math.abs(((x - 160) / (60 + z * 160) + (y - hor) * 0.012 + 20) % 1) < 0.02 / (0.4 + z)) c = P.bosque[2];   // las lindes
      if (y - hor < 3) c = a_orMez(c, P.lejos[2], 0.5);
      B[y * 320 + x] = c; } }
  // la carretera que cruza los campos, con postes y su cable
  const yc = hor + 7;
  for (let x = 0; x < 320; x++) { B[yc * 320 + x] = P.hormigon[1]; B[(yc + 1) * 320 + x] = (x % 6 < 3 && P.luz !== 'noche') ? P.hormigon[3] : P.hormigon[1]; B[(yc + 2) * 320 + x] = P.hierba[0]; }
  for (let x = 6; x < 320; x += 34) { R.linea(x, yc - 1, x, yc - 9, P.madera[0]); R.linea(x - 2, yc - 8, x + 2, yc - 8, P.madera[0]); if (x + 34 < 320) for (let i = 0; i <= 34; i++) R.pset(x + i, yc - 8 + Math.round(Math.sin(i / 34 * Math.PI) * 2), P.alambre); }
  // el bosquecillo del horizonte: copas en dos tonos lejanos, a parches
  for (let x = 0; x < 320; x++) { const alto = Math.round(3 + Math.sin(x * 0.11) * 2 + Math.sin(x * 0.037 + 1) * 3 + h(x >> 2, 0, 710) * 3); if (h(x >> 4, 1, 711) < 0.25) continue;
    for (let j = 0; j < alto; j++) { const y = hor - j; if (y < 0) continue; B[y * 320 + x] = j === alto - 1 ? P.lejos[2] : (h(x, j, 712) < 0.4 ? P.lejos[0] : P.lejos[1]); } }
  if (casas) { // la urbanización nueva: casas iguales en fila, con tejados de dos aguas grises, puertas de garaje y árboles jóvenes
    for (let x = -4; x < 320; x += 22) a_orCasa(R, P, x, hor + 3, 18 + (x % 3), x);
  } else { // la granja: granero rojo, casa blanca, silo con cúpula, molino y árboles del corral
    const gy = hor + 4;
    R.rect(gx - 2, gy - 4, gx + 34, gy, P.hierba[1]);
    R.disco(gx - 6, gy - 7, 5, P.bosque[1]); R.disco(gx - 3, gy - 9, 4, P.bosque[2]); R.disco(gx + 38, gy - 6, 5, P.bosque[1]); R.disco(gx + 36, gy - 8, 3, P.bosque[3]);
    R.rect(gx, gy - 9, gx + 14, gy, P.ladrillo[1]); for (let x = gx; x <= gx + 14; x += 2) R.linea(x, gy - 8, x, gy, P.ladrillo[0]);   // el granero
    R.poligono([[gx - 1, gy - 9], [gx + 7, gy - 15], [gx + 15, gy - 9]], P.k); R.poligono([[gx, gy - 9], [gx + 7, gy - 14], [gx + 14, gy - 9]], P.ladrillo[2]);
    R.rect(gx + 4, gy - 5, gx + 10, gy, P.blanco); R.rect(gx + 5, gy - 4, gx + 9, gy, P.ladrillo[0]); R.linea(gx + 7, gy - 4, gx + 7, gy, P.k); R.rect(gx + 6, gy - 13, gx + 8, gy - 11, P.blanco); R.pset(gx + 7, gy - 12, P.k);
    R.rect(gx + 18, gy - 6, gx + 27, gy, P.blanco); R.poligono([[gx + 17, gy - 6], [gx + 22, gy - 10], [gx + 28, gy - 6]], P.hormigon[0]);   // la casa
    R.rect(gx + 20, gy - 4, gx + 21, gy - 3, P.ventana[P.luz === 'noche' ? 2 : 0]); R.rect(gx + 24, gy - 4, gx + 25, gy - 3, P.ventana[P.luz === 'noche' ? 2 : 0]);
    R.rect(gx + 29, gy - 19, gx + 33, gy, P.hormigon[2]); R.rect(gx + 32, gy - 19, gx + 33, gy, P.hormigon[1]); R.disco(gx + 31, gy - 19, 2, P.alu[3]);   // el silo
    for (let y = gy - 17; y < gy; y += 3) R.linea(gx + 29, y, gx + 33, y, P.hormigon[0]);
    R.linea(gx - 10, gy, gx - 10, gy - 13, P.alu[1]);   // el molino (las aspas giran en la vida)
  }
}

// una casa nueva de la urbanización (2000): fachada clara, tejado gris a dos aguas, garaje y ventana
function a_orCasa(R, P, x, y, w, k) {
  const pared = [P.blanco, a_orMez(P.blanco, P.amarillo[2], 0.3), a_orMez(P.blanco, P.lejos[2], 0.3)][((k >> 1) % 3 + 3) % 3];
  R.rect(x, y - 7, x + w, y, pared); R.rect(x + w - 6, y - 5, x + w - 1, y, P.hormigon[2]); R.linea(x + w - 6, y - 3, x + w - 1, y - 3, P.hormigon[1]);
  R.rect(x + 2, y - 5, x + 4, y - 3, P.ventana[P.luz === 'noche' ? 2 : 1]);
  R.poligono([[x - 2, y - 7], [x + w / 2, y - 12], [x + w + 2, y - 7]], P.alu[1]); R.linea(x - 2, y - 7, x + w / 2, y - 12, P.alu[3]);
  R.rect(x + 3, y - 11, x + 4, y - 9, P.ladrillo[1]);
}

// la hierba fija entre y0 e y1 (la de delante): verdes con trama, matas más oscuras, florecillas, piedras y la tierra
// del sendero
function a_orHierba(R, P, y0, y1, o = {}) {
  const B = R.buf;
  for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) { const r = h(x, y, 713), m = h(x >> 3, y >> 2, 714), z = (y - y0) / Math.max(1, y1 - y0);
    let f = 0.35 + z * 0.25 + (m - 0.5) * 0.35 + (r - 0.5) * 0.2 + (((x + y * 3) % 7 === 0) ? 0.15 : 0);
    let c = a_orTono(P.hierba, a_orCl(f), x, y);
    if (o.sendero && Math.abs(x - o.sendero(y)) < 3 + z * 6 + Math.sin(y * 0.7) * 1.5) c = r < 0.3 ? P.tierra[0] : r < 0.7 ? P.tierra[1] : P.tierra[2];
    else if (r > 0.992) c = P.flor[Math.floor(h(x, y, 715) * 3)]; else if (r < 0.004) c = P.hormigon[2];
    B[y * 320 + x] = c; }
}

// briznas que se mecen con el viento entre y0 e y1 (n briznas; las de abajo, más largas)
function a_orBriznas(R, t, P, y0, y1, n, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(h(k, 1, 716 + sem) * 320), y = Math.round(y0 + h(k, 2, 716 + sem) * (y1 - y0)), z = (y - y0) / Math.max(1, y1 - y0), alto = 2 + Math.round(z * 4 + h(k, 3, 716) * 2);
    const m = Math.sin(t * 2.2 + x * 0.06 + Math.sin(t * 0.7) * 2) * (0.8 + z) + 0.6, c = P.hierba[k % 3 === 0 ? 4 : 3];
    R.linea(x, y, Math.round(x + m), y - alto, c); }
}

// las mariposas (día) o las luciérnagas (noche) que revolotean entre y0 e y1
function a_orBichos(R, t, P, y0, y1, n = 4) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 717) * 320 + t * (6 + k * 2)) % 340) - 10 + Math.sin(t * 1.3 + k) * 8), y = Math.round(y0 + h(k, 2, 717) * (y1 - y0) + Math.sin(t * 2.1 + k * 2) * 4);
    if (P.luz === 'noche') { if (Math.sin(t * 2 + k * 1.7) > 0.1) { R.pset(x, y, hex('#e8ff8a')); R.pset(x + 1, y, hex('#7a9a3a')); } }
    else { const a = Math.floor(t * 9 + k) % 2, c = [hex('#f8f0c8'), hex('#f0a838'), hex('#ffffff')][k % 3]; R.pset(x, y, P.k); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); if (!a) { R.pset(x - 1, y + 1, c); R.pset(x + 1, y + 1, c); } } }
}

// recorre una superficie paramétrica F(u, v) → [x, y] con nu × nv muestras y pinta cada una con col(u, v, x, y)
// (null: nada); marca en masc lo pintado si se le da
function a_orSup(R, F, nu, nv, col, masc) {
  const B = R.buf;
  for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv; j++) { const u = i / nu, v = j / nv, p = F(u, v), x = Math.round(p[0]), y = Math.round(p[1]);
    if (x < 0 || x > 319 || y < 0 || y > 179) continue; const c = col(u, v, x, y); if (c == null) continue; B[y * 320 + x] = c; if (masc) masc[y * 320 + x] = 1; }
}

const a_orL2 = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];

// la profundidad «de verdad» (0 delante, 1 al fondo) de un punto que está a u del recorrido en pantalla de una línea que
// se aleja, si el fondo está r veces más lejos (para repartir vigas y juntas en perspectiva)
const a_orProf = (u, r) => { const d = 1 / (1 - u * (1 - 1 / r)); return (d - 1) / (r - 1); };

const a_orProfInv = (w, r) => { const d = 1 + w * (r - 1); return (1 - 1 / d) / (1 - 1 / r); };

// una viga de celosía de a a b, de grosor g (1–2), en el tono c con su filo de sombra
function a_orViga(R, a, b, c, cs, g = 1) {
  R.linea(Math.round(a[0]) + 1, Math.round(a[1]) + 1, Math.round(b[0]) + 1, Math.round(b[1]) + 1, cs);
  R.linea(Math.round(a[0]), Math.round(a[1]), Math.round(b[0]), Math.round(b[1]), c);
  if (g > 1) R.linea(Math.round(a[0]) + 1, Math.round(a[1]), Math.round(b[0]) + 1, Math.round(b[1]), c);
}

// EL REFLECTOR PLANO de la vista general: Q = { bf, bb, tf, tb } (pie delante, pie al fondo, arriba delante, arriba al
// fondo), r: cuánto más lejos está el fondo. est: 'entero' | 'obras' | 'derribo'. Primero los puntales que lo apuntalan
// por detrás (a la izquierda) y luego la cara: chapa gris en paneles con trama de malla, entre vigas blancas
function a_orPlano(R, P, Q, r, est, masc) {
  const F = (u, v) => a_orL2(a_orL2(Q.bf, Q.bb, u), a_orL2(Q.tf, Q.tb, u), v), cel = P.cel, alu = P.alu;
  const hayCol = (w) => est !== 'obras' || w < 0.78, hayFila = (w, v) => est === 'derribo' ? !(w > 0.6 && v > 0.45) : est !== 'obras' || w < 0.62 || v < 0.3;
  // los puntales: de lo alto hasta el suelo por detrás, con riostras en cruz entre uno y otro y la viga de tierra
  const N = 8, G = [], T = [], M = [];
  for (let k = 0; k <= N; k++) { const w = k / N, u = a_orProfInv(w, r), b = F(u, 0), tp = F(u, 1), hgt = b[1] - tp[1]; G.push([b[0] - hgt * 0.62, b[1] - hgt * 0.07]); T.push(tp); M.push(a_orL2(tp, G[k], 0.5)); }
  for (let k = 0; k <= N; k++) { const w = k / N; if (!hayCol(w)) continue; if (est === 'derribo' && w > 0.6) continue;
    a_orViga(R, T[k], G[k], cel[k === 0 ? 2 : 1], cel[0], k < 3 ? 2 : 1);
    if (k < N && hayCol(w + 1 / N) && !(est === 'derribo' && w + 1 / N > 0.6)) { a_orViga(R, T[k], G[k + 1], cel[0], alu[0]); a_orViga(R, M[k], M[k + 1], cel[1], cel[0]); a_orViga(R, G[k], G[k + 1], cel[1], cel[0]); } }
  // la cara: vigas cada 1/12 a lo largo y cada 1/7 a lo alto; paneles de chapa con trama de malla y un tono por panel
  const nu = Math.ceil(Math.hypot(Q.bb[0] - Q.bf[0], Q.bb[1] - Q.bf[1]) * 2.4 + Math.hypot(Q.tb[0] - Q.tf[0], Q.tb[1] - Q.tf[1]) * 0.6), nv = Math.ceil(Math.hypot(Q.tf[0] - Q.bf[0], Q.tf[1] - Q.bf[1]) * 2.2);
  a_orSup(R, F, nu, nv, (u, v, x, y) => {
    const w = a_orProf(u, r), cu = w * 12, cv = v * 7, fu = Math.abs(cu - Math.round(cu)), fv = Math.abs(cv - Math.round(cv)), pi = Math.floor(cu), pj = Math.floor(cv);
    const anchoU = 0.09 + (1 - w) * 0.05, borde = u * nu < 1.5 || u > 1 - 1.5 / nu || v < 1.2 / nv || v > 1 - 1.6 / nv;
    if (borde) return hayCol(w) && hayFila(w, v) ? (v > 0.5 ? cel[3] : cel[1]) : null;
    if (fu < anchoU) return hayCol(Math.round(cu) / 12) && (est !== 'obras' || w < 0.78 || v < 0.55 + (Math.round(cu) % 2) * 0.2) && !(est === 'derribo' && w > 0.62 && v > 0.42 + h(Math.round(cu), 0, 718) * 0.3) ? (cu > Math.round(cu) ? cel[2] : cel[1]) : null;
    if (fv < 0.07) return hayFila(w, v) && hayCol(w) ? (cv > Math.round(cv) ? cel[1] : cel[2]) : null;
    // el panel: ¿tiene chapa?
    const tiene = est === 'entero' || (est === 'obras' && w < 0.42 && v < 0.86) || (est === 'derribo' && h(pi, pj, 719) > 0.62 && w < 0.7);
    if (!tiene) { // sin chapa: la diagonal de la celosía y, detrás, lo que haya (transparente)
      const dg = Math.abs((cu - pi) - (cv - pj)) < 0.08; return dg && hayCol(w) && hayFila(w, v) ? cel[0] : null; }
    let f = 0.32 + v * 0.42 + (h(pi, pj, 720) - 0.5) * 0.16 + (((x + y) & 1) ? -0.06 : 0.02) - (cv - pj) * 0.06;
    if (P.luz === 'tarde') f = 0.18 + v * 0.3 + (h(pi, pj, 720) - 0.5) * 0.12 + (((x + y) & 1) ? -0.05 : 0) + (v > 0.9 ? 0.4 : 0);
    if (fu < anchoU + 0.05 && cu > Math.round(cu)) f -= 0.12;   // la sombra de la viga sobre el panel
    return a_orTono(alu, a_orCl(f), x, y);
  }, masc);
  return { F, T, G };
}

// EL REFLECTOR CURVO de la vista general: una rampa cóncava (el pie casi vertical que se abre hacia arriba), sobre postes
// y riostras por detrás (a la derecha); costillas cada 1/16 a lo largo y juntas curvas cada 1/6 a lo alto; el labio
// de arriba coge la luz. est como en a_orPlano
function a_orCurvo(R, P, Q, r, est, masc) {
  const F = (u, v) => { const b = a_orL2(Q.bf, Q.bb, u), tp = a_orL2(Q.tf, Q.tb, u); return [b[0] + (tp[0] - b[0]) * v * v, b[1] + (tp[1] - b[1]) * v]; }, cel = P.cel, alu = P.alu;
  const N = 9;
  // los postes desde el labio hasta el suelo y las riostras en diagonal entre poste y poste
  for (let k = 0; k <= N; k++) { const w = k / N, u = a_orProfInv(w, r), tp = F(u, 1), b = a_orL2(Q.bf, Q.bb, u), pie = [tp[0], b[1] - 1];
    if (est === 'obras' && w > 0.7) continue; if (est === 'derribo' && w < 0.35 && k % 2) continue;
    a_orViga(R, tp, pie, cel[1], alu[0], k < 3 ? 2 : 1);
    if (k < N) { const u2 = a_orProfInv((k + 1) / N, r), tp2 = F(u2, 1), b2 = a_orL2(Q.bf, Q.bb, u2); a_orViga(R, [tp[0], b[1] - 1], tp2, cel[0], alu[0]); a_orViga(R, a_orL2(tp, pie, 0.5), a_orL2(tp2, [tp2[0], b2[1] - 1], 0.5), cel[0], alu[0]); } }
  const nu = Math.ceil(Math.hypot(Q.bb[0] - Q.bf[0], Q.bb[1] - Q.bf[1]) * 2.4 + 40), nv = Math.ceil(Math.hypot(Q.tf[0] - Q.bf[0], Q.tf[1] - Q.bf[1]) * 2.4);
  a_orSup(R, F, nu, nv, (u, v, x, y) => {
    const w = a_orProf(u, r), cu = w * 16, cv = Math.sqrt(v) * 6, pi = Math.floor(cu), pj = Math.floor(cv), fu = Math.abs(cu - Math.round(cu)), fv = Math.abs(cv - Math.round(cv));
    if (est === 'obras' && w > 0.55 + (v < 0.3 ? 0.2 : 0)) return fu < 0.1 && w < 0.72 ? cel[1] : null;
    if (est === 'derribo' && w < 0.45 && h(pi, pj, 721) < 0.6) return fu < 0.1 ? cel[0] : null;
    if (u * nu < 1.5 || u > 1 - 1.5 / nu) return cel[1];
    if (v > 1 - 2.2 / nv) return P.luz === 'noche' ? alu[5] : cel[3];   // el labio
    if (v < 1.2 / nv) return alu[0];
    let f = 0.22 + v * 0.5 + Math.sin(v * 3.1) * 0.08 + (h(pi, pj, 722) - 0.5) * 0.1 + (((x + y) & 1) ? -0.04 : 0.02);
    if (P.luz === 'tarde') f += (1 - w) * 0.12;
    if (fu < 0.08) f = cu > Math.round(cu) ? f + 0.18 : f - 0.2;   // la costilla con su luz
    else if (fv < 0.06) f -= 0.16;   // la junta curva
    return a_orTono(alu, a_orCl(f), x, y);
  }, masc);
  return { F };
}

// EL SUELO DE METAL entre el pie del plano (lp: [delante, fondo]) y el del curvo (lc): el objeto más claro del plano,
// que refleja el cielo (más hondo cerca, más claro lejos), con juntas en rejilla en perspectiva, el reflejo oscuro de
// cada muro junto a su pie, paneles que brillan y, por la tarde, la sombra rayada de la celosía. est: 'entero' |
// 'obras' (el fondo, de tierra con chapas apiladas) | 'derribo' (trozos levantados). Marca en masc el metal
function a_orSueloMetal(R, P, lp, lc, r, est, masc) {
  const F = (u, s) => a_orL2(a_orL2(lp[0], lp[1], u), a_orL2(lc[0], lc[1], u), s), sl = P.suelo;
  const nu = Math.ceil(Math.abs(lp[0][1] - lp[1][1]) * 2.6), ns = Math.ceil(Math.abs(lc[0][0] - lp[0][0]) * 2.2);
  a_orSup(R, F, nu, ns, (u, s, x, y) => {
    const w = a_orProf(u, r), cu = w * 14, cs = s * 12, pi = Math.floor(cu), pj = Math.floor(cs);
    const tierra = (est === 'obras' && w > 0.5 + Math.sin(s * 9) * 0.04) || (est === 'derribo' && h(pi >> 1, pj >> 1, 723) < 0.42);
    if (tierra) { const q = h(x, y, 724); return q < 0.3 ? P.tierra[0] : q < 0.75 ? P.tierra[1] : P.tierra[2]; }
    if (masc) masc[y * 320 + x] = 1;
    if (Math.abs(cu - Math.round(cu)) < 0.06 + (1 - w) * 0.03 || Math.abs(cs - Math.round(cs)) < 0.05) return sl[1];
    let f = 0.42 + w * 0.36 + (h(pi, pj, 725) - 0.5) * 0.1 + (h(pi, pj, 726) < 0.06 ? 0.22 : 0) + (cu - pi) * 0.05;
    if (s < 0.16) f -= (0.16 - s) * 2.6 * (P.luz === 'noche' ? 0.6 : 1); if (s > 0.9) f -= (s - 0.9) * 2.2;   // el reflejo de cada muro junto a su pie
    if (P.luz === 'tarde' && s < 0.42 + w * 0.2) f -= ((w * 16) % 1 < 0.35 ? 0.3 : 0.18);   // la sombra rayada de la celosía
    return a_orTono(sl, a_orCl(f), x, y);
  });
  // el bordillo de hormigón por delante
  R.linea(Math.round(lp[0][0]), Math.round(lp[0][1]) + 1, Math.round(lc[0][0]), Math.round(lc[0][1]) + 1, P.hormigon[2]);
  R.linea(Math.round(lp[0][0]), Math.round(lp[0][1]) + 2, Math.round(lc[0][0]), Math.round(lc[0][1]) + 2, P.hormigon[0]);
  return { F };
}

// el carro de las bocinas en pequeño (vista general): dos embudos que apuntan a la derecha sobre un carrito con ruedas
// en su raíl corto; (x, y): el centro del carro en el suelo
function a_orCarroPeq(R, P, x, y) {
  R.linea(x - 16, y + 4, x + 10, y - 5, P.k); R.linea(x - 14, y + 6, x + 12, y - 3, P.k);   // los dos raíles cortos
  R.poligono([[x - 9, y - 1], [x + 7, y - 6], [x + 9, y - 3], [x - 7, y + 2]], P.k); R.poligono([[x - 8, y - 1], [x + 7, y - 5], [x + 8, y - 3], [x - 7, y + 1]], P.amarillo[1]);
  R.linea(x - 8, y - 1, x + 7, y - 5, P.amarillo[2]);
  for (const [dx, dy] of [[-6, 2], [6, -2]]) { R.pset(x + dx, y + dy, P.k); R.pset(x + dx + 1, y + dy, P.alu[2]); }
  // las dos bocinas, una junto a la otra, que se abren hacia el curvo (a la derecha)
  for (const [dx, dy] of [[-6, -4], [1, -7]]) { const bx = x + dx, by = y + dy;
    R.poligono([[bx - 1, by - 2], [bx + 9, by - 6], [bx + 9, by + 4], [bx - 1, by + 2]], P.k);
    R.poligono([[bx, by - 1], [bx + 8, by - 5], [bx + 8, by + 3], [bx, by + 1]], P.alu[4]);
    R.linea(bx, by - 1, bx + 8, by - 5, P.alu[6]); R.linea(bx, by + 1, bx + 8, by + 3, P.alu[2]); R.linea(bx + 8, by - 5, bx + 8, by + 3, P.cel[3]);
    R.rect(bx - 3, by - 2, bx - 1, by + 2, P.alu[1]); R.pset(bx - 2, by - 1, P.luz === 'noche' ? hex('#5aff8a') : P.alu[4]); }
}

// la caseta en pequeño (vista general): bloques claros, tejado plano, puerta (x, y: su pie), ventana, antena
function a_orCasita(R, P, x, y) {
  const x0 = x - 22, x1 = x + 18, y0 = y - 20;
  R.rect(x0 - 1, y0 - 1, x1 + 1, y, P.k); R.rect(x0, y0, x1, y - 1, P.hormigon[3]);
  for (let yy = y0 + 2; yy < y; yy += 3) for (let xx = x0 + ((yy >> 1) & 2); xx < x1; xx += 6) R.pset(xx, yy, P.hormigon[1]);
  for (let yy = y0 + 2; yy < y; yy += 3) R.linea(x0, yy, x1, yy, a_orMez(P.hormigon[3], P.hormigon[1], 0.35));
  R.rect(x1 - 8, y0, x1, y - 1, P.hormigon[2]);   // el costado en sombra
  R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 1, P.hormigon[1]); R.linea(x0 - 2, y0 - 3, x1 + 2, y0 - 3, P.hormigon[3]);
  R.rect(x - 3, y - 11, x + 3, y - 1, P.k); R.rect(x - 2, y - 10, x + 2, y - 1, P.luz === 'noche' ? P.ventana[2] : P.alu[2]); R.pset(x + 1, y - 6, P.k);
  R.rect(x - 15, y - 13, x - 8, y - 8, P.k); R.rect(x - 14, y - 12, x - 9, y - 9, P.luz === 'noche' ? P.ventana[2] : P.ventana[1]); R.linea(x - 14, y - 11, x - 9, y - 11, P.ventana[0]);
  R.linea(x + 10, y0 - 3, x + 10, y0 - 14, P.alu[1]); for (let k = 0; k < 3; k++) R.linea(x + 7, y0 - 12 + k * 3, x + 13, y0 - 12 + k * 3, P.alu[2]);   // la antena de varillas
}

// el coche de los setenta de perfil (un familiar granate con el lateral de madera), del tamaño de un chibi: (x, y)
// el centro en el suelo; dir 1 mira a la derecha; giro: lo que han girado las ruedas
function a_orCoche(R, P, x, y, dir = 1, giro = 0) {
  const X = (dx) => Math.round(x + dx * dir), c = P.coche;
  const silueta = [[-23, -3], [-23, -9], [-14, -10], [-10, -17], [12, -17], [17, -10], [23, -9], [24, -3]];
  R.poligono(silueta.map(([a, b]) => [X(a), y + b]).concat([[X(24), y - 2], [X(-23), y - 2]]), P.k);
  R.poligono([[X(-22), y - 4], [X(-22), y - 8], [X(-13), y - 9], [X(-9), y - 16], [X(11), y - 16], [X(16), y - 9], [X(22), y - 8], [X(23), y - 4]], c[1]);
  R.linea(X(-21), y - 8, X(22), y - 8, c[3]); R.linea(X(-9), y - 15, X(11), y - 15, c[2]);
  R.rect(Math.min(X(-17), X(15)), y - 7, Math.max(X(-17), X(15)), y - 5, P.madera[1]); R.linea(X(-17), y - 7, X(15), y - 7, P.madera[2]);   // el lateral de madera
  R.poligono([[X(-8), y - 10], [X(-6), y - 15], [X(0), y - 15], [X(0), y - 10]], P.ventana[1]); R.poligono([[X(2), y - 10], [X(2), y - 15], [X(10), y - 15], [X(14), y - 10]], P.ventana[1]);
  R.linea(X(-6), y - 14, X(-3), y - 14, P.ventana[2]); R.pset(X(23), y - 7, P.amarillo[2]); R.pset(X(-22), y - 7, P.luzRoja);
  R.rect(Math.min(X(-23), X(24)), y - 3, Math.max(X(-23), X(24)), y - 3, P.alu[4]);   // el parachoques cromado
  for (const dx of [-14, 14]) { R.disco(X(dx), y - 1, 4, P.k); R.disco(X(dx), y - 1, 2, P.alu[3]); const a = giro + dx; R.pset(Math.round(X(dx) + Math.cos(a) * 2), Math.round(y - 1 + Math.sin(a) * 2), P.k); }
}

// una figura pequeña de fondo (8 px: un obrero, un técnico), de pie o andando, con el color de su ropa; acc:
// 'anda' | 'martillo' | 'carga' (una chapa sobre la cabeza) | 'fregona'
function a_orFigura(R, P, x, y, t, ropa, acc = 'anda', dir = 1, casco = null) {
  const pie = acc === 'anda' || acc === 'carga' || acc === 'fregona' ? Math.floor(t * 5 + x) % 2 : 0, piel = P.luz === 'noche' ? hex('#8a6a5a') : hex('#e0a878');
  R.pset(x - 1, y, P.k); R.pset(x + 1, y, P.k); if (pie) { R.pset(x - 1, y, ropa); R.pset(x - 2, y, P.k); }
  R.rect(x - 1, y - 3, x + 1, y - 1, a_orMez(ropa, P.k, 0.4)); R.rect(x - 1, y - 6, x + 1, y - 4, ropa); R.rect(x - 1, y - 8, x + 1, y - 7, piel);
  if (casco) R.rect(x - 1, y - 9, x + 1, y - 9, casco); else R.rect(x - 1, y - 9, x + 1, y - 9, P.madera[0]);
  if (acc === 'martillo') { const g = Math.floor(t * 4 + x) % 2; R.linea(x + dir, y - 5, x + dir * 3, y - 6 - g * 2, piel); R.pset(x + dir * 3, y - 7 - g * 2, P.alu[1]); }
  else if (acc === 'carga') R.rect(x - 5, y - 11, x + 5, y - 10, P.alu[4]);
  else if (acc === 'fregona') { R.linea(x + dir, y - 5, x + dir * 4, y, P.madera[2]); R.rect(x + dir * 4 - 1, y, x + dir * 4 + 1, y, P.blanco); }
  else R.pset(x + dir * 2, y - 5 + pie, piel);
}

// un pájaro pequeño de perfil: posado (picotea) o volando (aletea)
function a_orPajaro(R, P, x, y, t, vuela, dir = 1) {
  x = Math.round(x); y = Math.round(y); const c = P.luz === 'noche' ? hex('#1a1a24') : hex('#3a3238');
  if (vuela) { const a = Math.floor(t * 10) % 2; R.pset(x, y, c); R.pset(x - 1, y - 1 + a * 2, c); R.pset(x + 1, y - 1 + a * 2, c); R.pset(x - 2, y - 1 + a * 2, c); R.pset(x + 2, y - 1 + a * 2, c); return; }
  const pica = Math.sin(t * 5) > 0.7 ? 1 : 0; R.rect(x - 1, y - 2, x + 1, y - 1, c); R.pset(x + dir * 2, y - 2 + pica, c); R.pset(x + dir * 3, y - 2 + pica, P.amarillo[1]); R.pset(x - dir * 2, y - 2, c); R.pset(x, y, P.k);
}

// una nube de polvo tramada (centro x, y; radio r; intensidad a)
function a_orNubePolvo(R, x, y, r, P, a) {
  const c = P.luz === 'noche' ? hex('#3a3a44') : a_orMez(P.tierra[2], P.blanco, 0.45), B = R.buf;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const xx = Math.round(x + i), yy = Math.round(y + j * 0.6); if (xx < 0 || xx > 319 || yy < 0 || yy > 179) continue; const d = Math.hypot(i, j) / r; if (d > 1 || a_orU(xx, yy) > (1 - d) * a * 2.2) continue; B[yy * 320 + xx] = a_orMez(B[yy * 320 + xx], c, 0.6); }
}

// el polvo que levanta algo que se mueve: bolas que crecen y se deshacen detrás de x (fuerza 0–1)
function a_orPolvo(R, t, x, y, fuerza, P, n = 6) { for (let k = 0; k < n; k++) { const e = ((t * 1.3 + k / n) % 1); a_orNubePolvo(R, x + k * 6 + e * 10, y - 3 - e * 8, 3 + e * 7, P, fuerza * (1 - e) * 0.9); } }

// un cable grueso de goma que pasa por los puntos (curva suave), con su brillo
function a_orCable(R, P, pts, g = 3) {
  for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]];
    for (let s = 0; s <= 1; s += 0.02) { const x = a[0] + (b[0] - a[0]) * s, y = a[1] + (b[1] - a[1]) * s + Math.sin(s * Math.PI) * 4; R.disco(x, y, g / 2, P.k); R.pset(Math.round(x), Math.round(y - g / 2 + 1), P.alu[1]); } }
}

// la luz roja de balizamiento en lo alto de la celosía, que parpadea (de día casi no se ve)
function a_orBaliza(R, P, x, y, t) { const on = Math.sin(t * 3.2) > 0.2; R.pset(x, y, on ? P.luzRoja : hex('#6a1a1a')); if (on && P.luz !== 'dia') { R.pset(x - 1, y, hex('#a02a2a')); R.pset(x + 1, y, hex('#a02a2a')); R.pset(x, y - 1, hex('#a02a2a')); } }

const a_OR_LCAMPO = { hor: 64, yH: 150, r: 3, gx: 146, pl: { bf: [70, 146], bb: [114, 92], tf: [24, 50], tb: [84, 60] }, cu: { bf: [254, 148], bb: [212, 92], tf: [294, 76], tb: [240, 64] },
  carro: [206, 124], caseta: [36, 152], coche: [72, 154], estrella: [160, 120], pajaro: 0.56, espejo: 92, luna: 46 };

const a_OR_LGOLF = { hor: 78, yH: 150, r: 2.6, gx: 132, pl: { bf: [60, 150], bb: [118, 106], tf: [6, 58], tb: [80, 74] }, cu: { bf: [262, 152], bb: [214, 106], tf: [304, 92], tb: [244, 80] },
  carro: null, caseta: null, coche: null, estrella: [160, 128], pajaro: 0.5, espejo: 106, luna: 228 };

function a_orCampo(R, t, o, v, P, L, g) {
  const ep = v.epoca, golf = ep === 2000, est = ep === 1958 ? 'obras' : ep === 1998 ? 'derribo' : 'entero', clave = 'campo|' + (L === a_OR_LGOLF ? 'g' : 'c') + '|' + v.luz + '|' + ep;
  const lp = [L.pl.bf, L.pl.bb], lc = [L.cu.bf, L.cu.bb];
  const capa = a_orCapa(R, clave, () => {
    a_orCielo(R, P, 0, L.hor, { sol: P.luz === 'noche' ? [L.luna, 32, 5] : undefined });
    a_orLejos(R, P, L.hor, L.yH, { gx: L.gx, casas: golf });
    const cielo = a_orFoto(R);
    const metal = new Uint8Array(57600), pl = { T: [] };
    if (!golf) {
      Object.assign(pl, a_orPlano(R, P, L.pl, L.r, est));
      a_orCurvo(R, P, L.cu, L.r, est);
      a_orSueloMetal(R, P, lp, lc, L.r, est, metal);
    } else a_orGolf(R, P, L, lp, lc);
    a_orHierba(R, P, L.yH, 180, { sendero: L.caseta && !golf ? (y) => 40 + (y - 150) * 2.2 : null });
    if (L.caseta && !golf) { a_orCasita(R, P, L.caseta[0], L.caseta[1]); if (ep !== 1958) a_orCoche(R, P, L.coche[0], L.coche[1], 1); }
    if (L.carro && ep === 1977) a_orCarroPeq(R, P, L.carro[0], L.carro[1]);
    if (ep === 1958) a_orObrasCampo(R, P, L);
    if (ep === 1998) a_orDerriboCampo(R, P, L, lp, lc);
    // la cerca de alambre al borde de la hierba, detrás de los actores
    for (let x = 10; x < 320; x += 26) { if (L.caseta && x < 70) continue; R.rect(x, L.yH - 2, x + 1, L.yH + 6, P.madera[0]); R.pset(x, L.yH - 2, P.madera[2]); }
    for (const dy of [0, 4]) for (let x = 70; x < 320; x++) R.pset(x, L.yH + dy + Math.round(Math.sin(x / 26 * Math.PI) * 0.6), P.alambre);
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { cielo, fondo, metal, T: pl.T };
  });
  const B = R.buf, cinta = o.cinta ?? 0, off = Math.round(a_orSuave(cinta) * 150);
  // el cielo que corre como una cinta (se redibuja corrido desde la foto del cielo)
  if (off) for (let y = 0; y < L.hor - 2; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!capa.fondo[i]) continue; const c = capa.cielo[y * 320 + ((x - off) % 320 + 320) % 320], w = y < 50 ? a_orCl(a_orLejosTranq(x, y) / 14) : 1;
    B[i] = w >= 1 ? c : w <= 0 ? capa.cielo[i] : a_orMez(capa.cielo[i], c, w); }
  const refl = (x, y) => (y < L.hor ? [x, Math.round(L.espejo + (L.hor - y) * 0.95)] : null);
  if (P.luz === 'noche') a_orEstrellas(R, t, P, { masc: capa.fondo, refl: golf ? null : refl, y1: L.hor - 4, off, mascR: capa.metal });
  a_orNubes(R, t, P, { masc: capa.fondo, refl: golf ? null : refl, mascR: capa.metal, off, n: P.luz === 'noche' ? 3 : 7, y0: 26, y1: L.hor - 6 });
  if (P.luz === 'dia') bandada(R, t, { tipo: 'golondrina', n: 4, y: 50, cada: 13, v: 30, semilla: 2 });
  // el molino de la granja que gira y la camioneta que pasa por la carretera del fondo (tapada por lo de delante)
  if (!golf) { const mx = L.gx - 10, my = L.hor + 4 - 13; for (let k = 0; k < 4; k++) { const a = t * 2 + k * Math.PI / 2, x = Math.round(mx + Math.cos(a) * 3), y = Math.round(my + Math.sin(a) * 3); R.linea(mx, my, x, y, P.alu[3]); } }
  { const x = Math.round(((t * 9 + 40) % 380) - 30), y = L.hor + 6; for (let i = -4; i <= 4; i++) for (let j = -3; j <= 0; j++) { const xx = x + i, yy = y + j; if (xx < 0 || xx > 319 || !capa.fondo[yy * 320 + xx]) continue; B[yy * 320 + xx] = j === -3 ? (i > -2 && i < 2 ? P.ventana[1] : B[yy * 320 + xx]) : j === 0 && Math.abs(i) === 3 ? P.k : i > 0 && j === -2 ? P.ventana[1] : hex(P.luz === 'noche' ? '#3a3a50' : '#4a7ab0'); }
    if (P.luz === 'noche') { const xx = x + 5; if (xx >= 0 && xx < 320 && capa.fondo[(y - 1) * 320 + xx]) B[(y - 1) * 320 + xx] = hex('#fff0b0'); } }
  if (!golf) {
    // el brillo que barre el metal despacio y, de noche, el reflejo de la luna
    const gx = ((t * 14) % 260) - 20 + 60;
    for (let y = L.espejo; y < L.yH; y++) for (let x = 60; x < 262; x++) { const i = y * 320 + x; if (!capa.metal[i]) continue; const d = Math.abs(x + (y - L.espejo) * 0.7 - gx); if (d < 5) B[i] = a_orMez(B[i], P.suelo[6], (1 - d / 5) * (P.luz === 'noche' ? 0.2 : 0.45)); }
    if (P.luz === 'noche') { const [mx, my] = [(L.luna + off) % 320, Math.round(L.espejo + (L.hor - 32) * 0.95)]; for (let j = -3; j <= 3; j++) for (let i = -2; i <= 2; i++) { const xx = mx + i + Math.round(Math.sin(t * 2 + j) * 1), yy = my + j; if (capa.metal[yy * 320 + xx] && i * i + j * j < 7) B[yy * 320 + xx] = a_orMez(B[yy * 320 + xx], P.sol, 0.6); } }
    // la luz roja en lo alto de la celosía, delante
    if (ep !== 1958) a_orBaliza(R, P, L.pl.tf[0] + 1, L.pl.tf[1] - 1, t);
    // el pájaro que llega, se posa en lo alto de la celosía, picotea y se va (ciclo de 12 s)
    if (capa.T.length && ep !== 1998) { const k = Math.round(L.pajaro * (capa.T.length - 1)), [px, py] = capa.T[k], f = (t % 12) / 12;
      if (f < 0.22) { const u = f / 0.22; a_orPajaro(R, P, px + (1 - u) * 120, py - 1 - Math.sin(u * Math.PI) * 10 - (1 - u) * 14, t, true, -1); }
      else if (f < 0.85) a_orPajaro(R, P, px, py - 1, t, false, Math.floor(t / 2.5) % 2 ? 1 : -1);
      else { const u = (f - 0.85) / 0.15; a_orPajaro(R, P, px - u * 90, py - 1 - u * 30, t, true, -1); } }
  }
  if (golf) a_orGolfVida(R, t, P, L, capa);
  if (ep === 1958) a_orObrasVida(R, t, P, L);
  if (ep === 1998) a_orDerriboVida(R, t, P, L, g);
  // la caseta: de noche la ventana tiembla un poco
  if (L.caseta && !golf && P.luz === 'noche') { const [x, y] = L.caseta; if (Math.sin(t * 7) > 0.85) R.rect(x - 14, y - 12, x - 9, y - 9, P.ventana[1]); }
  // la cinta: la banda de goma estriada que corre en el horizonte y los rodillos de los extremos
  if (cinta > 0) { const y = L.hor - 3, ap = a_orSuave(cinta * 6);
    for (let x = 0; x < 320; x++) { const s = ((x - off * 1.0) % 6 + 6) % 6; R.pset(x, y, s < 1 ? P.k : hex('#3a3a44')); R.pset(x, y + 1, s < 1 ? hex('#2a2a30') : hex('#56565e')); R.pset(x, y - 1, a_orMez(hex('#56565e'), B[(y - 1) * 320 + x], 1 - ap)); }
    for (const x of [4, 315]) { R.disco(x, y, 3, P.k); R.disco(x, y, 2, P.alu[4]); const a = off * 0.5; R.pset(Math.round(x + Math.cos(a) * 2), Math.round(y + Math.sin(a) * 2), P.alu[1]); } }
  // la estrella que se cae de la cinta y rebota en el metal
  if (cinta > 0.7) { const f = (cinta - 0.7) / 0.3, [ex, ey] = L.estrella; let x, y, brillo = 0;
    if (f < 0.55) { const u = f / 0.55; x = lerp(312, ex, u); y = lerp(L.hor - 6, ey, u * u) - Math.sin(u * Math.PI) * 14; }
    else { const u = (f - 0.55) / 0.45, b = u < 0.6 ? u / 0.6 : (u - 0.6) / 0.4, alto = u < 0.6 ? 12 : 4; x = ex - u * 14; y = ey - Math.sin(b * Math.PI) * alto; brillo = u < 0.12 ? 1 - u / 0.12 : u > 0.6 && u < 0.7 ? 0.5 : 0; }
    x = Math.round(x); y = Math.round(y);
    if (brillo > 0) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, l = 3 + brillo * 6; R.linea(x + Math.round(Math.cos(a) * 3), y + Math.round(Math.sin(a) * 3), x + Math.round(Math.cos(a) * l), y + Math.round(Math.sin(a) * l), hex('#fff6c0')); }
    if (f < 0.55) for (let k = 1; k < 7; k++) { const u2 = Math.max(0, f / 0.55 - k * 0.025), tx = Math.round(lerp(312, ex, u2)), ty = Math.round(lerp(L.hor - 6, ey, u2 * u2) - Math.sin(u2 * Math.PI) * 14); R.pset(tx, ty, a_orMez(B[ty * 320 + tx] ?? 0, hex('#ffe680'), 0.8 - k * 0.11)); }
    const ESTR = ['...#...', '...#...', '.#####.', '#######', '.#####.', '.##.##.', '##...##'];
    ESTR.forEach((fl, j) => { for (let i = 0; i < 7; i++) if (fl[i] === '#') { const borde = j === 0 || i === 0 || i === 6 || j === 6 || ESTR[j - 1]?.[i] !== '#'; R.pset(x - 3 + i, y - 3 + j, borde ? hex('#ffd040') : hex('#fff4a0')); } });
    R.pset(x - 1, y - 1, hex('#ffffff'));
    if (f >= 0.55) { const rx = x, ry = ey + (ey - y) + 2; if (capa.metal[ry * 320 + rx]) R.pset(rx, ry, a_orMez(B[ry * 320 + rx], hex('#ffe680'), 0.6)); }
    g.estrella = [x, y]; }
  // la hierba de delante que ondea y los bichos
  a_orBriznas(R, t, P, L.yH + 2, 180, 170);
  a_orBichos(R, t, P, L.yH - 6, 176, 4);
}

// 1958, vista general: la grúa de celosía junto al fondo del plano (su pluma gira despacio con una chapa colgada en la
// vida), andamios en el curvo y montones de chapas
function a_orObrasCampo(R, P, L) {
  const [bx, by] = a_orL2(L.pl.bb, L.cu.bb, 0.35);
  R.rect(bx - 6, by - 4, bx + 6, by, P.amarillo[0]); R.rect(bx - 5, by - 4, bx + 5, by - 1, P.amarillo[1]); R.rect(bx - 6, by, bx + 6, by + 1, P.k);   // la cabina de la grúa
  for (let k = 0; k < 4; k++) { const [x, y] = a_orL2(L.cu.bf, L.cu.bb, 0.5 + k * 0.12); for (let j = 0; j < 30 - k * 5; j += 5) { R.linea(Math.round(x) + 10, Math.round(y) - j, Math.round(x) + 18, Math.round(y) - j, P.madera[2]); } R.linea(Math.round(x) + 10, Math.round(y), Math.round(x) + 10, Math.round(y) - 28 + k * 5, P.madera[1]); }
  for (const [s, u, n] of [[0.3, 0.25, 6], [0.55, 0.4, 5], [0.7, 0.18, 4]]) { const [x, y] = a_orL2(a_orL2(L.pl.bf, L.pl.bb, u), a_orL2(L.cu.bf, L.cu.bb, u), s); for (let k = 0; k < n; k++) R.rect(Math.round(x) - 5, Math.round(y) - k, Math.round(x) + 5, Math.round(y) - k, k % 2 ? P.alu[3] : P.alu[5]); R.rect(Math.round(x) - 5, Math.round(y) + 1, Math.round(x) + 5, Math.round(y) + 1, P.k); }
}

function a_orObrasVida(R, t, P, L) {
  // la pluma de la grúa que gira despacio y la chapa que cuelga y se balancea
  const [bx, by] = a_orL2(L.pl.bb, L.cu.bb, 0.35), a = -1.9 + Math.sin(t * 0.25) * 0.5, lx = bx + Math.cos(a) * 52, ly = by - 4 + Math.sin(a) * 52 * 0.9;
  for (let s = 0; s <= 1; s += 0.08) { const x = bx + (lx - bx) * s, y = by - 4 + (ly - by + 4) * s; R.pset(Math.round(x), Math.round(y), P.amarillo[1]); R.pset(Math.round(x + 1), Math.round(y + 1), P.amarillo[0]); }
  R.linea(Math.round(bx), Math.round(by - 4), Math.round(lx), Math.round(ly), P.amarillo[2]); R.linea(Math.round(bx) + 2, Math.round(by - 4), Math.round(lx) + 1, Math.round(ly) + 1, P.amarillo[0]);
  const sw = Math.sin(t * 1.4) * 2, cx = Math.round(lx + sw), cy = Math.round(ly + 16); R.linea(Math.round(lx), Math.round(ly), cx, cy - 2, P.k); R.rect(cx - 5, cy - 1, cx + 5, cy + 1, P.alu[4]); R.linea(cx - 5, cy + 1, cx + 5, cy + 1, P.alu[1]);
  // los obreros: dos que llevan una chapa por el suelo, uno que martillea en la celosía, uno con la carretilla
  const ida = (t * 0.08) % 2, s = ida < 1 ? ida : 2 - ida, [x0, y0] = a_orL2(a_orL2(L.pl.bf, L.pl.bb, 0.3), a_orL2(L.cu.bf, L.cu.bb, 0.3), 0.2 + s * 0.5), d = ida < 1 ? 1 : -1;
  a_orFigura(R, P, Math.round(x0), Math.round(y0), t, hex('#3a5a8a'), 'carga', d, P.blanco); a_orFigura(R, P, Math.round(x0) + 7, Math.round(y0) + 1, t + 0.3, hex('#8a4a2a'), 'carga', d, P.amarillo[2]);
  const [hx, hy] = a_orL2(a_orL2(L.pl.bf, L.pl.bb, 0.55), a_orL2(L.pl.tf, L.pl.tb, 0.55), 0.3); a_orFigura(R, P, Math.round(hx) + 2, Math.round(hy), t, hex('#6a6a3a'), 'martillo', 1, P.blanco);
  if (Math.floor(t * 4) % 2 === 0) R.pset(Math.round(hx) + 5, Math.round(hy) - 7, hex('#fff6c0'));
  const [wx, wy] = a_orL2(a_orL2(L.pl.bf, L.pl.bb, 0.12), a_orL2(L.cu.bf, L.cu.bb, 0.12), 0.65 - ((t * 0.05) % 0.4)); a_orFigura(R, P, Math.round(wx), Math.round(wy), t, hex('#4a3a5a'), 'anda', -1, P.blanco);
  R.rect(Math.round(wx) - 8, Math.round(wy) - 3, Math.round(wx) - 3, Math.round(wy) - 1, P.alu[1]); R.disco(Math.round(wx) - 8, Math.round(wy), 1, P.k);
}

// 1998, vista general: montones de chapa arrugada, un volquete y la excavadora (fijos; el brazo y el polvo en la vida)
function a_orDerriboCampo(R, P, L, lp, lc) {
  for (const [s, u, w] of [[0.25, 0.3, 12], [0.5, 0.6, 9], [0.72, 0.2, 10]]) { const [x, y] = a_orL2(a_orL2(lp[0], lp[1], u), a_orL2(lc[0], lc[1], u), s);
    for (let k = 0; k < w * 3; k++) { const a = h(k, 1, 727) * Math.PI, l = 2 + h(k, 2, 727) * w * 0.6, xx = Math.round(x + (h(k, 3, 727) - 0.5) * w), yy = Math.round(y - h(k, 4, 727) * w * 0.5); R.linea(xx, yy, Math.round(xx + Math.cos(a) * l), Math.round(yy - Math.sin(a) * l * 0.4), [P.alu[2], P.alu[4], P.alu[5], P.alu[1]][k % 4]); } }
  if (L === a_OR_LGOLF) a_orVolquete(R, P, 118, 150, 1); else a_orVolquete(R, P, 132, 136, 0.7);
}

function a_orDerriboVida(R, t, P, L, g) {
  const golf = L === a_OR_LGOLF, s = golf ? 1 : 0.7, [x, y] = golf ? [244, 152] : [230, 140];
  const pala = a_orExcavadora(R, P, x, y, t, s); g.pala = pala;
  for (let k = 0; k < 4; k++) { const e = (t * 0.4 + k / 4) % 1; a_orNubePolvo(R, pala[0] - 6 + e * 20 * s, pala[1] + 4 - e * 18 * s, (4 + e * 10) * s, P, (1 - e) * 0.7); }
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k * 0.33) % 1; if (f < 0.5) R.pset(Math.round(pala[0] + (h(k, Math.floor(t * 0.6 + k * 0.33), 728) - 0.5) * 10), Math.round(pala[1] + f * 30), P.alu[5]); }
  a_orFigura(R, P, Math.round(golf ? 170 : 172), golf ? 152 : 142, t, hex('#e07820'), 'anda', -1, P.amarillo[2]); a_orFigura(R, P, golf ? 96 : 104, golf ? 154 : 140, t * 0.3, hex('#e07820'), 'martillo', 1, P.blanco);
}

// la excavadora amarilla de cadenas, de perfil mirando a la izquierda; (x, y): el centro de las cadenas en el suelo; s:
// escala; el brazo sube y baja con t. Devuelve dónde está la pala
function a_orExcavadora(R, P, x, y, t, s = 1) {
  const S = (v) => Math.round(v * s), am = P.amarillo, k = P.k;
  R.rect(x - S(24), y - S(8), x + S(24), y, k); R.rect(x - S(23), y - S(7), x + S(23), y - 1, hex('#3a3a3a'));
  for (let i = -20; i <= 20; i += 4) R.pset(x + S(i) + (Math.floor(t * 6) % 2), y - S(4), hex('#6a6a6a'));
  R.rect(x - S(18), y - S(22), x + S(20), y - S(9), k); R.rect(x - S(17), y - S(21), x + S(19), y - S(10), am[1]); R.linea(x - S(17), y - S(21), x + S(19), y - S(21), am[2]);
  R.rect(x - S(17), y - S(13), x + S(19), y - S(10), am[0]);
  R.rect(x - S(12), y - S(34), x + S(4), y - S(21), k); R.rect(x - S(11), y - S(33), x + S(3), y - S(22), am[1]); R.rect(x - S(10), y - S(32), x - S(2), y - S(25), P.ventana[1]); R.pset(x - S(9), y - S(31), P.ventana[2]);
  R.rect(x + S(10), y - S(28), x + S(12), y - S(22), hex('#3a3a3a'));   // el tubo de escape
  const a = -0.9 - (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.8, l1 = S(40), cx = x - S(14), cy = y - S(20), ey = cy + Math.sin(a) * l1;
  const codo = [cx - Math.cos(a) * l1, ey], pala = [codo[0] - S(10), codo[1] + S(22) - Math.sin(t * 0.9) * S(6)];
  for (const [p, q, g] of [[[cx, cy], codo, 3], [codo, pala, 2]]) { R.linea(Math.round(p[0]), Math.round(p[1]) + 1, Math.round(q[0]), Math.round(q[1]) + 1, k); for (let i = -g; i < g; i++) R.linea(Math.round(p[0]), Math.round(p[1]) + i, Math.round(q[0]), Math.round(q[1]) + i, i < 0 ? am[2] : am[1]); }
  R.poligono([[pala[0] - S(6), pala[1] - S(4)], [pala[0] + S(4), pala[1] - S(4)], [pala[0] + S(2), pala[1] + S(5)], [pala[0] - S(7), pala[1] + S(3)]], k);
  R.poligono([[pala[0] - S(5), pala[1] - S(3)], [pala[0] + S(3), pala[1] - S(3)], [pala[0] + S(1), pala[1] + S(4)], [pala[0] - S(6), pala[1] + S(2)]], am[0]);
  for (let i = 0; i < 3; i++) R.pset(Math.round(pala[0] - S(6) + i * S(3)), Math.round(pala[1] + S(4)), P.alu[4]);
  return [Math.round(pala[0]), Math.round(pala[1])];
}

// el volquete amarillo de perfil, con la caja llena de chapas; (x, y): el centro en el suelo
function a_orVolquete(R, P, x, y, s = 1) {
  const S = (v) => Math.round(v * s), am = P.amarillo;
  R.rect(x - S(26), y - S(20), x + S(10), y - S(6), P.k); R.rect(x - S(25), y - S(19), x + S(9), y - S(7), am[1]); for (let i = -22; i < 10; i += 6) R.linea(x + S(i), y - S(19), x + S(i), y - S(7), am[0]);
  for (let i = 0; i < 9; i++) R.linea(x - S(24) + S(i * 4), y - S(20) - (i % 3), x - S(20) + S(i * 4), y - S(21) - ((i + 1) % 2), [P.alu[4], P.alu[2], P.alu[5]][i % 3]);
  R.rect(x + S(11), y - S(18), x + S(24), y - S(6), P.k); R.rect(x + S(12), y - S(17), x + S(23), y - S(7), am[1]); R.rect(x + S(16), y - S(16), x + S(22), y - S(11), P.ventana[1]);
  R.rect(x - S(26), y - S(6), x + S(24), y - S(4), P.k);
  for (const dx of [-18, -8, 17]) { R.disco(x + S(dx), y - S(3), Math.max(2, S(4)), P.k); R.disco(x + S(dx), y - S(3), Math.max(1, S(2)), P.alu[2]); }
}

// 2000 (fijo): donde estuvo la gran oreja, un campo de golf: la calle segada a franjas que sigue el antiguo suelo, el
// green con su collar más claro, un búnker de arena, el estanque, árboles jóvenes con tutores y, al borde del green, la
// plancha olvidada
function a_orGolf(R, P, L, lp, lc) {
  const B = R.buf, hor = L.hor;
  for (let y = hor + 9; y < L.yH; y++) for (let x = 0; x < 320; x++) { const z = (y - hor) / (L.yH - hor), franja = Math.floor((x - 160) / (14 + z * 40) + (y - hor) * 0.05) & 1, r = h(x, y, 729);
    B[y * 320 + x] = a_orTono(P.hierba, 0.45 + (franja ? 0.18 : 0) + (r - 0.5) * 0.12 + z * 0.1, x, y); }
  // el rough más oscuro a los lados, las chuletas (calvas de hierba arrancada) y el camino de los carritos que serpentea
  for (let y = hor + 9; y < L.yH; y++) { const z = (y - hor) / (L.yH - hor), ancho = 70 + z * 110, cx = 168 + Math.sin(y * 0.08) * 10;
    for (let x = 0; x < 320; x++) { const i = y * 320 + x, d = Math.abs(x - cx) - ancho; if (d > 0) B[i] = a_orTono(P.hierba, a_orCl(0.22 + (h(x >> 1, y, 765) - 0.5) * 0.3 + ((x * 7 + y * 3) % 11 === 0 ? 0.25 : 0)), x, y); else if (d > -2) B[i] = P.hierba[1];
      if (h(x, y, 766) > 0.996) B[i] = P.tierra[1]; } }
  for (let y = hor + 12; y < L.yH; y++) { const z = (y - hor) / (L.yH - hor), cx = 262 - (y - hor) * 0.9 + Math.sin(y * 0.15) * 6, w = 1 + z * 4;
    for (let x = Math.floor(cx - w); x <= cx + w; x++) if (x >= 0 && x < 320) B[y * 320 + x] = Math.abs(x - cx) > w - 1 ? P.hormigon[1] : a_orTono(P.hormigon, 0.55 + (h(x, y, 767) - 0.5) * 0.3, x, y); }
  // el green, el búnker y el estanque
  const elipse = (cx, cy, rx, ry, f) => { for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d <= 1 && x >= 0 && x < 320 && y >= 0 && y < 180) f(x, y, d); } };
  elipse(168, 116, 44, 11, (x, y, d) => { B[y * 320 + x] = d > 0.8 ? P.hierba[3] : a_orTono(P.hierba, 0.72 + (((x >> 2) + (y >> 1)) & 1 ? 0.06 : 0) + (h(x, y, 730) - 0.5) * 0.06, x, y); });
  elipse(120, 122, 14, 4, (x, y, d) => { B[y * 320 + x] = d > 0.75 ? P.tierra[2] : h(x, y, 731) < 0.5 ? hex(P.luz === 'noche' ? '#4a4a40' : '#ecdcae') : hex(P.luz === 'noche' ? '#3e3e36' : '#e0cc98'); });
  elipse(74, 136, 34, 9, (x, y, d) => { B[y * 320 + x] = d > 0.82 ? P.tierra[1] : a_orTono(P.suelo, 0.2 + (y - 127) / 18 * 0.4 + (h(x >> 1, y, 732) - 0.5) * 0.1, x, y); });
  elipse(214, 106, 10, 3, (x, y, d) => { B[y * 320 + x] = d > 0.75 ? P.tierra[2] : h(x, y, 731) < 0.5 ? hex(P.luz === 'noche' ? '#4a4a40' : '#ecdcae') : hex(P.luz === 'noche' ? '#3e3e36' : '#e0cc98'); });
  for (const [x, y] of [[230, 104], [262, 112], [28, 108], [292, 132], [104, 100], [20, 130]]) elipse(x + 3, y + 1, 7, 2, (xx, yy) => { B[yy * 320 + xx] = a_orMez(B[yy * 320 + xx], P.hierba[0], 0.5); });   // las sombras de los árboles
  { const x = 30, y = 146; R.rect(x, y - 5, x + 12, y - 4, P.madera[2]); R.rect(x, y - 8, x + 12, y - 7, P.madera[1]); R.linea(x + 1, y - 3, x + 1, y, P.k); R.linea(x + 11, y - 3, x + 11, y, P.k);   // el banco
    R.linea(x + 18, y, x + 18, y - 9, P.alu[1]); R.rect(x + 16, y - 12, x + 20, y - 9, hex('#2a5a9a')); R.pset(x + 17, y - 11, P.blanco); }   // el lavabolas
  for (const [x, y, c] of [[150, 128, '#e02a2a'], [186, 128, P.luz === 'noche' ? '#8a8a8a' : '#f4f4f4']]) { R.linea(x, y, x, y - 4, hex(c)); R.pset(x, y + 1, P.k); }   // las estacas de distancia
  for (const [x, y] of [[230, 104], [262, 112], [28, 108], [292, 132], [104, 100], [20, 130]]) { R.linea(x, y, x, y - 12, P.madera[1]); R.linea(x + 2, y, x + 1, y - 7, P.madera[2]); R.disco(x, y - 13, 5, P.bosque[1]); R.disco(x - 1, y - 14, 3, P.bosque[2]); R.pset(x - 2, y - 15, P.bosque[3]); }
  // la plancha olvidada al borde del green (la cámara 'plancha' la ve de cerca)
  R.poligono([[206, 121], [214, 119], [216, 122], [208, 124]], P.alu[4]); R.linea(206, 121, 214, 119, P.alu[6]); R.linea(208, 124, 216, 122, P.alu[1]);
}

// la vida del campo de golf ('golf' 2000, general): la bandera roja del green que ondea (con su sombra y el hoyo), el
// carrito blanco aparcado con su toldo, la bolsa de palos y un jugador que espera sentado, la segadora naranja que pasa
// al fondo dejando su franja recién segada, el aspersor que gira y echa chorros de gotas sobre una mancha mojada, un
// jugador que hace el swing y la pelota que vuela en arco, y los patos del estanque con su estela
function a_orGolfVida(R, t, P, L, capa) {
  const piel = hex('#e0a878'), B = R.buf;
  // la bandera: el mástil con su sombra en el green, el hoyo y la tela que ondea en dos tonos
  { const fx = 168, fy = 112; R.linea(fx + 1, fy + 1, fx + 7, fy + 2, a_orMez(P.hierba[3], P.k, 0.4)); R.disco(fx, fy + 1, 1, P.k); R.linea(fx, fy, fx, fy - 18, P.blanco); R.linea(fx - 1, fy, fx - 1, fy - 18, P.alu[2]);
    for (let i = 0; i < 9; i++) { const o = Math.round(Math.sin(t * 5 - i * 0.7) * (i / 9) * 1.8); R.linea(fx + 1 + i, fy - 18 + o, fx + 1 + i, fy - 13 + o - (i > 6 ? 1 : 0), Math.sin(t * 5 - i * 0.7) > 0.5 ? hex('#a01818') : hex('#e02a2a')); } }
  // el carrito aparcado: toldo blanco sobre dos postes, la carrocería, el asiento, la bolsa de palos y el jugador
  { const x = 196, y = 134; R.rect(x - 9, y - 12, x + 8, y - 11, P.blanco); R.linea(x - 9, y - 10, x + 8, y - 10, P.alu[2]); R.linea(x - 7, y - 10, x - 7, y - 4, P.alu[1]); R.linea(x + 6, y - 10, x + 6, y - 4, P.alu[1]);
    R.rect(x - 9, y - 4, x + 9, y - 1, P.blanco); R.rect(x - 9, y - 2, x + 9, y - 1, P.alu[3]); R.rect(x - 4, y - 6, x + 2, y - 5, hex('#3a3a46'));
    R.rect(x + 7, y - 9, x + 9, y - 3, hex('#2a5a9a')); R.pset(x + 7, y - 10, P.alu[4]); R.pset(x + 8, y - 11, P.alu[4]); R.pset(x + 9, y - 10, P.alu[3]);
    R.rect(x - 2, y - 9, x, y - 7, hex('#f0f0f0')); R.rect(x - 2, y - 11 + 0, x, y - 10, piel); R.pset(x - 2, y - 11, hex('#5a3a24')); R.pset(x + 1, y - 8, piel);
    R.disco(x - 5, y, 2, P.k); R.disco(x + 6, y, 2, P.k); R.pset(x - 5, y, P.alu[3]); R.pset(x + 6, y, P.alu[3]); R.linea(x - 8, y + 2, x + 9, y + 2, a_orMez(P.hierba[2], P.k, 0.4)); }
  // la segadora que pasa al fondo y la franja recién segada que deja detrás (más clara)
  { const x = Math.round(((t * 7) % 360) - 20), y = L.hor + 16;
    for (let i = 5; i < 40; i++) { const xx = x - i; if (xx < 0 || xx > 319) continue; for (let j = -1; j <= 0; j++) { const k2 = (y + j) * 320 + xx; B[k2] = a_orMez(B[k2], P.hierba[4], 0.35 * (1 - i / 40)); } }
    R.rect(x - 4, y - 4, x + 4, y, hex('#e05a20')); R.linea(x - 4, y - 4, x + 4, y - 4, hex('#f08a50')); R.rect(x - 2, y - 7, x + 1, y - 5, hex('#3a6a3a')); R.pset(x - 1, y - 8, piel); R.pset(x - 1, y - 9, hex('#f0d040'));
    R.disco(x - 3, y, 1, P.k); R.disco(x + 3, y, 1, P.k); for (let i = 1; i < 6; i++) if (x - 4 - i * 2 >= 0) R.pset(x - 4 - i * 2, y - 1 - (Math.floor(t * 8 + i) & 1), P.hierba[4]); }
  // el aspersor: la mancha mojada, el cabezal y dos chorros de gotas que giran
  { const ax = 252, ay = 126, a = Math.sin(t * 1.2) * 1.2;
    for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3) ** 2 < 1) { const k2 = (ay + j) * 320 + ax + i; B[k2] = a_orMez(B[k2], P.hierba[1], 0.3); }
    R.linea(ax, ay, ax, ay - 2, P.alu[1]); R.pset(ax, ay - 3, P.alu[4]);
    for (const s of [1, -0.6]) for (let k2 = 0; k2 < 12; k2++) { const q = k2 / 11, x = Math.round(ax + Math.sin(a * s) * q * 24 * Math.sign(s)), y = Math.round(ay - 3 - q * 9 + q * q * 13); if (k2 > 1 && (k2 + Math.floor(t * 10)) % 2 === 0) R.pset(x, y, hex('#e0f0ff')); else if (k2 > 1) R.pset(x, y, hex('#9ac8e8')); } }
  // el jugador del swing (el palo sube, baja y sigue) y la pelota que vuela en arco tras el golpe
  { const x = 134, y = 120, f = (t % 5) / 5, a = f < 0.5 ? -2.4 + f * 1.2 : f < 0.62 ? -1.8 + (f - 0.5) * 30 : 1.8;
    R.linea(x - 2, y + 1, x + 4, y + 1, a_orMez(P.hierba[3], P.k, 0.35)); R.pset(x - 1, y, P.k); R.pset(x + 1, y, P.k); R.rect(x - 1, y - 3, x + 1, y - 1, hex('#3a3a5a')); R.rect(x - 1, y - 6, x + 1, y - 4, hex('#f0f0f0')); R.rect(x - 1, y - 8, x + 1, y - 7, piel); R.rect(x - 2, y - 9, x + 2, y - 9, hex('#e02a2a'));
    R.linea(x, y - 5, Math.round(x + Math.cos(a) * 7), Math.round(y - 4 + Math.sin(a) * 7), P.alu[1]);
    if (f < 0.56) R.pset(x + 3, y, P.blanco);
    else { const q = (f - 0.56) / 0.44, bx = Math.round(x + 3 + q * 60), by = Math.round(y - Math.sin(q * Math.PI) * 26); R.pset(bx, by, P.blanco); R.pset(bx - 1, by + (q < 0.5 ? 1 : -1), a_orMez(B[by * 320 + bx - 1], P.blanco, 0.4)); } }
  // los patos del estanque con su estela en uve
  for (let k2 = 0; k2 < 2; k2++) { const vx = Math.cos(t * 0.4 + k2 * 2) * 8 * 0.4, x = Math.round(64 + k2 * 14 + Math.sin(t * 0.4 + k2 * 2) * 8), y = 135 + k2 * 3, dir = vx >= 0 ? 1 : -1;
    for (let i = 1; i < 6; i++) { const e = a_orMez(P.suelo[4], P.blanco, 0.45); R.pset(x - dir * (2 + i), y + 1 + (i >> 1), e); R.pset(x - dir * (2 + i), y + 1 - (i >> 2), e); }
    R.rect(x - 2, y - 1, x + 1, y, hex('#f4f0e0')); R.pset(x - 2, y, hex('#c8c4b4')); R.pset(x + dir * 2, y - 2, hex('#2a6a3a')); R.pset(x + dir * 3, y - 2, hex('#e0a020')); }
  void capa;
}
const a_OR_MU = { hor: 108, vp: [80, 106], base: 112, labio: 44 };

function a_orMuros(R, t, o, v, P, g) {
  const ep = v.epoca === 1958 ? 1958 : 1977, M = a_OR_MU, clave = 'muros|' + v.luz + '|' + ep;
  const labio = (x) => M.labio + Math.round(((x - 200) / 125) ** 2 * 7);   // el labio del curvo, más alto en el centro
  const capa = a_orCapa(R, clave, () => {
    const B = R.buf; a_orCielo(R, P, 0, M.base, { sol: P.luz === 'tarde' ? [140, 70, 9] : P.luz === 'noche' ? [196, 30, 5] : [214, 24, 7] });
    const cielo = a_orFoto(R), metal = new Uint8Array(57600);
    // el reflector curvo enfrente: columnas de x 74 a 319 desde su pie (y base) hasta el labio, cóncavo: las juntas
    // horizontales se arquean y las costillas se abren en abanico
    for (let x = 74; x < 320; x++) { const yt = labio(x), alto = M.base - yt;
      for (let y = yt; y < M.base; y++) { const v2 = (M.base - y) / alto, xs = x + (v2 * v2) * (x - 200) * 0.12, cu = (xs - 74) / 15.4, fu = Math.abs(cu - Math.round(cu)), cv = Math.sqrt(v2) * 7 + ((x - 200) / 125) ** 2 * 0.6, fv = Math.abs(cv - Math.round(cv));
        let f = 0.2 + v2 * 0.5 + Math.sin(v2 * 3.1) * 0.1 + (h(Math.floor(cu), Math.floor(cv), 733) - 0.5) * 0.1 + (((x + y) & 1) ? -0.04 : 0.02);
        if (a_orTranquila(x, y)) f += fu < 0.07 ? (cu > Math.round(cu) ? 0.05 : -0.05) : fv < 0.07 ? -0.04 : 0;
        else if (fu < 0.07) f += cu > Math.round(cu) ? 0.16 : -0.2; else if (fv < 0.07) f -= 0.15;
        B[y * 320 + x] = y - yt < 2 ? (P.luz === 'noche' ? P.alu[5] : P.cel[3]) : y === M.base - 1 ? P.alu[0] : a_orTono(P.alu, a_orCl(f), x, y); }
      if (!a_orTranquila(x, yt - 1)) B[(yt - 1) * 320 + x] = P.cel[1]; }
    // el suelo de metal: refleja el cielo (más hondo cerca) y el curvo invertido junto a su pie; juntas que convergen
    for (let y = M.base; y < 180; y++) for (let x = 0; x < 320; x++) { const z = 1 / (y - M.vp[1]), xr = (x - M.vp[0]) * z;
      const tierra = ep === 1958 && (xr * 6 + 1 / z * 0.02 > 3.4 + Math.sin(y * 0.3) * 0.1);
      if (tierra) { const q = h(x, y, 734); B[y * 320 + x] = q < 0.3 ? P.tierra[0] : q < 0.8 ? P.tierra[1] : P.tierra[2]; continue; }
      metal[y * 320 + x] = 1; const jx = Math.abs(xr * 1.6 - Math.round(xr * 1.6)) < 0.05 + z * 0.1, jy = Math.abs(1 / z * 0.08 - Math.round(1 / z * 0.08)) < 0.09;
      let f = 0.66 - (y - M.base) / 70 * 0.38 + (h(Math.floor(xr * 1.6), Math.floor(0.08 / z), 735) - 0.5) * 0.08;
      const dy = y - M.base, ym = M.base - dy * 1.15;   // el reflejo del curvo
      if (x >= 74 && ym > labio(x)) f = 0.32 + (M.base - ym) / 70 * 0.25 + (((Math.round(ym) + x) % 9 === 0) ? -0.06 : 0);
      B[y * 320 + x] = jx || jy ? P.suelo[1] : a_orTono(P.suelo, a_orCl(f), x, y); }
    // el plano en escorzo: una pared inclinada hacia atrás de la que solo cabe el fondo; vigas que convergen hacia arriba
    const Q = { bf: [-34, 198], bb: [76, 112], tf: [-150, 30], tb: [34, 24] }, r = 5;
    a_orSup(R, (u, w) => a_orL2(a_orL2(Q.bf, Q.bb, u), a_orL2(Q.tf, Q.tb, u), w), 520, 420, (u, w, x, y) => {
      if (x >= 16 && x <= 174 && y <= 21) return null;
      const d = a_orProf(u, r), cu = d * 10, cv = w * 9, fu = Math.abs(cu - Math.round(cu)), fv = Math.abs(cv - Math.round(cv)), pi = Math.floor(cu), pj = Math.floor(cv);
      if (u > 0.995) return P.cel[3];
      if (fu < 0.05 + (1 - d) * 0.05) return cu > Math.round(cu) ? P.cel[3] : P.cel[1];
      if (fv < 0.05 + (1 - d) * 0.02) return cv > Math.round(cv) ? P.cel[2] : P.cel[0];
      const tiene = ep === 1977 || (w < 0.22 && d < 0.6);
      if (!tiene) return Math.abs((cu - pi) - (cv - pj)) < 0.05 || Math.abs((cu - pi) + (cv - pj) - 1) < 0.05 ? P.cel[1] : null;
      let f = 0.3 + w * 0.38 + (h(pi, pj, 736) - 0.5) * 0.14 + (((x + y) & 1) ? -0.06 : 0.02) - (cv - pj) * 0.06;
      if (P.luz === 'tarde') f -= 0.12;
      return a_orTono(P.alu, a_orCl(f), x, y); });
    // su reflejo oscuro en el metal junto a su pie
    for (let y = M.base; y < 180; y++) { const xb = 76 + (y - M.base) * (-110 / 86); for (let x = Math.max(0, Math.floor(xb)); x < Math.min(320, xb + 10 + (y - M.base) * 0.3); x++) if (metal[y * 320 + x]) R.pset(x, y, a_orMez(R.pget(x, y), P.alu[1], 0.5 * (1 - (x - xb) / (10 + (y - M.base) * 0.3)))); }
    if (ep === 1958) { // los andamios en el plano y chapas apiladas en la tierra
      for (let k = 0; k < 4; k++) { const x = 30 + k * 12, y0 = 150 - k * 12, y1 = 70 + k * 8; R.linea(x, y0, x, y1, P.madera[1]); R.linea(x + 8, y0 - 6, x + 8, y1 - 2, P.madera[1]); for (let y = y0 - 4; y > y1; y -= 12) R.linea(x - 2, y, x + 10, y - 5, P.madera[2]); }
      for (const [x, y, n] of [[236, 134, 7], [270, 126, 5], [208, 122, 4]]) { for (let k = 0; k < n; k++) { R.rect(x - 16, y - k * 2, x + 16, y - k * 2, P.alu[k % 2 ? 3 : 5]); R.rect(x - 16, y - k * 2 + 1, x + 16, y - k * 2 + 1, P.alu[1]); } R.rect(x - 14, y + 2, x - 12, y + 3, P.madera[1]); R.rect(x + 12, y + 2, x + 14, y + 3, P.madera[1]); }
      { const x = 150, y = 170; R.rect(x, y - 6, x + 14, y - 4, P.alu[2]); R.linea(x - 6, y - 2, x, y - 5, P.madera[1]); R.disco(x + 14, y - 1, 2, P.k); R.rect(x + 1, y - 7, x + 13, y - 7, P.tierra[0]); }   // la carretilla
    }
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { fondo, metal };
  });
  const refl = (x, y) => [x, Math.round(M.base + (M.base - y) * 1.15)];
  if (P.luz === 'noche') a_orEstrellas(R, t, P, { masc: capa.fondo, refl, mascR: capa.metal, y1: 60 });
  a_orNubes(R, t, P, { masc: capa.fondo, refl, mascR: capa.metal, n: P.luz === 'noche' ? 3 : 6, y0: 22, y1: 44, escala: 1.3, sem: 3 });
  // brillos que barren el metal
  const B = R.buf, gx = ((t * 22) % 420) - 50;
  for (let y = M.base; y < 180; y++) for (let x = Math.max(0, Math.floor(gx - 12 - (y - M.base))); x < Math.min(320, gx + 12 - (y - M.base)); x++) { const i = y * 320 + x; if (!capa.metal[i]) continue; const d = Math.abs(x + (y - M.base) - gx) / 12; B[i] = a_orMez(B[i], P.suelo[6], (1 - d) * (P.luz === 'noche' ? 0.15 : 0.35)); }
  // el técnico diminuto que friega el metal junto al pie del curvo, y el pájaro que se posa en el labio
  if (ep === 1977) { const ida = (t * 0.06) % 2, s = ida < 1 ? ida : 2 - ida; a_orFigura(R, P, Math.round(140 + s * 110), M.base + 1, t, hex('#3a5a8a'), 'fregona', ida < 1 ? 1 : -1); }
  { const f = (t % 10) / 10, px = 232, py = labio(232) - 1; if (f < 0.25) { const u = f / 0.25; a_orPajaro(R, P, px - (1 - u) * 90, py - (1 - u) * 20 - Math.sin(u * Math.PI) * 6, t, true, 1); } else if (f < 0.9) a_orPajaro(R, P, px, py, t, false, Math.floor(t / 2) % 2 ? 1 : -1); else { const u = (f - 0.9) / 0.1; a_orPajaro(R, P, px + u * 60, py - u * 25, t, true, 1); } }
  if (ep === 1958) { // dos obreros en el andamio que atornillan (destellos de la llave)
    for (const [x, y, k] of [[44, 116, 0], [62, 92, 1]]) { a_orFigura(R, P, x, y, t + k, k ? hex('#6a6a3a') : hex('#3a5a8a'), 'martillo', -1, P.blanco); if (Math.floor(t * 3 + k * 1.5) % 3 === 0) R.pset(x - 4, y - 7, hex('#fff6c0')); } }
  g.horizonte = M.vp[1] + 2;
}

// 1958, primer término de 'muros' (orejaDelante): la caja de madera con el rollo de planos atado y el nivel encima
function a_orCajaPlanos(R, t, P) {
  const x = 274, y = 180;
  R.rect(x, y - 22, x + 46, y, P.k); R.rect(x + 1, y - 21, x + 46, y, P.madera[1]); for (let yy = y - 18; yy < y; yy += 5) R.linea(x + 1, yy, x + 46, yy, P.madera[0]); R.linea(x + 1, y - 21, x + 46, y - 21, P.madera[2]);
  R.rect(x + 4, y - 29, x + 40, y - 23, P.k); R.rect(x + 5, y - 28, x + 39, y - 24, hex('#e8e4f0')); R.linea(x + 5, y - 28, x + 39, y - 28, P.blanco); R.rect(x + 37, y - 28, x + 39, y - 24, hex('#b8b4c8'));
  R.linea(x + 14, y - 29, x + 14, y - 23, hex('#a02a2a')); R.linea(x + 30, y - 29, x + 30, y - 23, hex('#a02a2a'));
  R.rect(x + 8, y - 34, x + 36, y - 31, P.k); R.rect(x + 9, y - 33, x + 35, y - 32, hex('#d8a020')); const b = Math.round(Math.sin(t * 1.3) * 2); R.rect(x + 20 + b, y - 33, x + 23 + b, y - 32, hex('#8ae070'));
}

const a_orCocheX = (c) => lerp(360, 228, a_orSuave(c));

function a_orCasetaV(R, t, o, v, P, g) {
  const clave = 'caseta|' + v.luz, coche = o.coche ?? 1, PU = g.puerta;
  const capa = a_orCapa(R, clave, () => {
    const B = R.buf; a_orCielo(R, P, 0, 104, { sol: P.luz === 'tarde' ? [150, 74, 10] : undefined });
    const cielo = a_orFoto(R);
    // detrás, el reflector curvo que asoma: su labio y sus costillas, y la celosía del plano a lo lejos
    for (let x = 176; x < 320; x++) { const yt = 58 + Math.round(((x - 330) / 160) ** 2 * 22); for (let y = yt; y < 104; y++) { const v2 = (104 - y) / (104 - yt), cu = (x - 176) / 9, fu = Math.abs(cu - Math.round(cu));
      let f = 0.2 + v2 * 0.45 + (h(Math.floor(cu), y >> 3, 737) - 0.5) * 0.1 + (((x + y) & 1) ? -0.04 : 0); if (fu < 0.1) f += cu > Math.round(cu) ? 0.15 : -0.18; else if (y % 9 === 0) f -= 0.12;
      B[y * 320 + x] = y - yt < 2 ? P.cel[2] : a_orTono(P.alu, a_orCl(f), x, y); } }
    for (let x = 180; x < 320; x += 18) { const yt = 58 + Math.round(((x - 330) / 160) ** 2 * 22); R.linea(x, yt, x, 104, P.cel[0]); }   // los postes del curvo por detrás, entre las costillas
    // el campo: maizal a la izquierda, la grava delante con rodadas y piedras
    for (let y = 96; y < 112; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 738); B[y * 320 + x] = (x % 4 < 2) ? a_orTono(P.campo, 0.1 + q * 0.25, x, y) : a_orTono(P.hierba, 0.3 + q * 0.3, x, y); }
    for (let x = 0; x < 90; x++) { const alto = 8 + Math.round(h(x >> 1, 0, 739) * 6 + Math.sin(x * 0.4) * 2); for (let j = 0; j < alto; j++) { const y = 104 - j; B[y * 320 + x] = (x + j) % 3 === 0 ? P.campo[3] : j > alto - 3 ? P.campo[4] : P.campo[(x & 1) ? 0 : 1]; } }
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 740), z = (y - 112) / 68, rod = Math.abs(x - (200 + (y - 112) * 0.6)) < 3 + z * 4 || Math.abs(x - (250 + (y - 112) * 0.9)) < 3 + z * 4;
      let f = 0.45 + (q - 0.5) * 0.4 + (rod ? -0.18 : 0) + z * 0.1; B[y * 320 + x] = q > 0.985 ? P.hormigon[3] : a_orTono(P.hormigon, a_orCl(f), x, y);
      if (y < 118 && h(x >> 1, y, 741) < 0.5) B[y * 320 + x] = P.hierba[1 + (x & 1)]; }
    // un árbol a la izquierda, detrás de la caseta
    for (const [dx, dy, r, c] of [[0, 0, 16, 0], [-12, 8, 11, 0], [12, 6, 12, 0], [-2, -2, 13, 1], [-6, -8, 8, 2], [6, -6, 7, 2]]) R.disco(46 + dx, 70 + dy, r, P.bosque[c]);
    for (let k = 0; k < 40; k++) R.pset(Math.round(46 + (h(k, 1, 742) - 0.5) * 30), Math.round(66 + (h(k, 2, 742) - 0.5) * 26), P.bosque[3]);
    R.rect(44, 84, 48, 114, P.madera[0]); R.linea(47, 86, 47, 114, P.madera[1]);
    // el poste de la luz con su cable hasta la caseta
    R.rect(266, 58, 268, 120, P.madera[0]); R.linea(267, 58, 267, 120, P.madera[1]); R.rect(260, 62, 274, 63, P.madera[0]); R.disco(262, 61, 1, P.blanco); R.disco(272, 61, 1, P.blanco);
    for (let i = 0; i <= 70; i++) R.pset(262 - i, 61 + Math.round(Math.sin(i / 70 * Math.PI) * 6 + i * 0.32), P.alambre);
    // la caseta: bloques de hormigón con sus juntas, luz de la izquierda, tejado plano con albardilla
    const X0 = 80, X1 = 190, Y0 = 100, Y1 = 156;
    R.rect(X0 - 1, Y0 - 1, X1 + 1, Y1, P.k);
    for (let y = Y0; y < Y1; y++) for (let x = X0; x <= X1; x++) { const fila = Math.floor((y - Y0) / 5), jy = (y - Y0) % 5 === 4, jx = ((x - X0) + (fila & 1) * 6) % 12 === 11, q = h(Math.floor((x - X0 + (fila & 1) * 6) / 12), fila, 743);
      let f = 0.72 - (x - X0) / (X1 - X0) * 0.22 + (q - 0.5) * 0.08 + (h(x, y, 744) - 0.5) * 0.08 - (y > Y1 - 6 ? 0.1 : 0);
      B[y * 320 + x] = jx || jy ? a_orTono(P.hormigon, a_orCl(f - 0.3), x, y) : a_orTono(P.hormigon, a_orCl(f), x, y); }
    R.rect(X0 - 3, Y0 - 5, X1 + 3, Y0 - 1, P.k); R.rect(X0 - 2, Y0 - 4, X1 + 2, Y0 - 2, P.hormigon[2]); R.linea(X0 - 2, Y0 - 4, X1 + 2, Y0 - 4, P.hormigon[3]); R.linea(X0 - 2, Y0 - 1, X1 + 2, Y0 - 1, P.hormigon[0]);
    for (let x = X0 + 2; x < X1; x += 3) R.pset(x, Y0, a_orMez(P.hormigon[0], P.k, 0.4));   // la sombra de la albardilla
    // la antena de varillas en el tejado, con su mástil y sus vientos
    R.linea(104, Y0 - 5, 104, 64, P.alu[2]); R.linea(105, Y0 - 5, 105, 64, P.alu[0]); for (let k = 0; k < 5; k++) { const y = 66 + k * 5, w = 10 - k; R.linea(104 - w, y, 104 + w, y, P.alu[3]); }
    R.linea(104, 70, 92, Y0 - 5, P.alambre); R.linea(104, 70, 118, Y0 - 5, P.alambre);
    // la puerta abierta: el hueco con el interior recortado (banco de trabajo, aparatos, cables, lámpara) y la hoja
    R.rect(PU[0] - 2, PU[1] - 2, PU[2] + 2, PU[3], P.k); R.rect(PU[0] - 1, PU[1] - 1, PU[2] + 1, PU[1] - 1, P.alu[2]);
    R.recorte([PU[0], PU[1], PU[2], PU[3]]);
    for (let y = PU[1]; y <= PU[3]; y++) for (let x = PU[0]; x <= PU[2]; x++) R.pset(x, y, a_orTono([hex('#5a3a1e'), hex('#8a5e2a'), hex('#c49040'), hex('#f0c868')], 0.85 - (y - PU[1]) / 50 - Math.abs(x - 130) / 30, x, y));
    R.linea(PU[0], 140, PU[2], 140, P.madera[0]); R.linea(PU[0], 141, PU[2], 141, P.madera[2]); R.linea(PU[0] + 2, 142, PU[0] + 2, 155, P.madera[0]);   // el banco
    for (const [x, y, w, hh, c] of [[PU[0], 130, 8, 10, hex('#4a4e58')], [PU[0] + 9, 133, 7, 7, hex('#6a5a4a')], [PU[0] + 2, 122, 12, 7, hex('#3a3e48')]]) { R.poligono([[x, y], [x + w, y], [x + w, y + hh], [x, y + hh]], P.k); R.poligono([[x + 1, y + 1], [x + w - 1, y + 1], [x + w - 1, y + hh - 1], [x + 1, y + hh - 1]], c); }
    R.disco(PU[0] + 3, 135, 1, hex('#f0e0a0')); R.disco(PU[0] + 6, 135, 1, hex('#f0e0a0'));
    R.linea(PU[0] + 4, 140, PU[0] + 1, 155, P.k); R.linea(PU[0] + 12, 140, PU[0] + 15, 155, P.k);
    R.recorte(null);
    // la hoja de la puerta, abierta hacia fuera a la derecha, de chapa con su tirador
    R.poligono([[PU[2] + 2, PU[1] - 1], [PU[2] + 10, PU[1] + 3], [PU[2] + 10, PU[3] + 1], [PU[2] + 2, PU[3]]], P.k); R.poligono([[PU[2] + 3, PU[1]], [PU[2] + 9, PU[1] + 4], [PU[2] + 9, PU[3]], [PU[2] + 3, PU[3] - 1]], P.alu[3]);
    R.linea(PU[2] + 4, PU[1] + 2, PU[2] + 4, PU[3] - 2, P.alu[5]); R.pset(PU[2] + 8, 138, P.k); R.pset(PU[2] + 8, 139, P.alu[6]);
    R.rect(PU[0] - 4, PU[3], PU[2] + 4, PU[3] + 1, P.hormigon[2]); R.linea(PU[0] - 4, PU[3] + 1, PU[2] + 4, PU[3] + 1, P.hormigon[0]);   // el escalón
    // la ventana con su persiana
    R.rect(150, 116, 178, 136, P.k); R.rect(151, 117, 177, 135, P.ventana[1]); for (let y = 118; y < 128; y += 2) R.linea(151, y, 177, y, P.blanco); R.linea(151, 128, 177, 128, P.alu[1]); R.linea(164, 117, 164, 135, P.k);
    R.rect(149, 136, 179, 137, P.hormigon[3]); R.linea(149, 138, 179, 138, P.hormigon[0]);
    // la placa con el pictograma de la oreja (sin letras)
    R.rect(102, 120, 116, 134, P.k); R.rect(103, 121, 115, 133, hex('#e8e0c8')); R.rect(103, 121, 115, 122, hex('#2a5a9a'));
    ['.####...', '#....#..', '#.##.#.#', '#.#..#..', '#..#.#.#', '....#...', '...#....', '.##.....'].forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.pset(105 + i, 124 + j, hex('#2a3a5a')); });   // una oreja y dos rayitas de sonido
    // el aplique sobre la puerta
    R.rect(127, 111, 133, 113, P.k); R.rect(128, 112, 132, 113, P.amarillo[P.luz === 'noche' ? 2 : 0]);
    // el buzón en su poste y el cubo de basura
    { const [x, y] = g.buzon; R.rect(x - 1, y - 16, x + 1, y, P.madera[0]); R.rect(x - 6, y - 23, x + 6, y - 16, P.k); R.rect(x - 5, y - 22, x + 5, y - 17, hex('#7a8a96')); R.linea(x - 5, y - 22, x + 5, y - 22, hex('#a8b8c4')); R.rect(x + 4, y - 26, x + 5, y - 20, hex('#d02a2a')); }
    { const x = 266, y = 156; R.rect(x - 5, y - 12, x + 5, y, P.k); R.rect(x - 4, y - 11, x + 4, y - 1, P.alu[2]); for (let yy = y - 9; yy < y; yy += 3) R.linea(x - 4, yy, x + 4, yy, P.alu[0]); R.rect(x - 6, y - 14, x + 6, y - 12, P.alu[3]); R.rect(x - 1, y - 15, x + 1, y - 15, P.k); }
    // matas al pie de la caseta
    for (let x = X0 - 6; x < X1 + 8; x++) if (h(x, 1, 745) < 0.45 && (x < PU[0] - 4 || x > PU[2] + 10)) R.linea(x, Y1, x + (h(x, 2, 745) < 0.5 ? -1 : 1), Y1 - 2 - Math.round(h(x, 3, 745) * 3), P.hierba[1 + (x % 3)]);
    // la sombra larga de la caseta hacia la derecha (tarde)
    if (P.luz === 'tarde') for (let y = 150; y < 166; y++) for (let x = X1 + 2; x < X1 + 2 + (166 - y) * 4; x++) if (x < 320) R.pset(x, y, a_orMez(R.pget(x, y), hex('#3a2a40'), 0.35));
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { fondo };
  });
  a_orNubes(R, t, P, { masc: capa.fondo, n: P.luz === 'noche' ? 3 : 6, y0: 26, y1: 60, sem: 9 });
  if (P.luz === 'noche') a_orEstrellas(R, t, P, { masc: capa.fondo, y1: 60 });
  if (P.luz === 'dia') bandada(R, t, { tipo: 'golondrina', n: 3, y: 58, cada: 12, v: 30, semilla: 7 });
  if (P.luz === 'tarde') bandada(R, t, { tipo: 'golondrina', n: 5, y: 60, cada: 14, v: 26, semilla: 3 });
  // dentro: el osciloscopio que late y la lámpara que tiembla (recortado a la puerta)
  R.recorte([PU[0], PU[1], PU[2], PU[3]]);
  for (let i = 0; i < 9; i++) R.pset(PU[0] + 4 + i, 125 + Math.round(Math.sin(t * 6 + i * 0.9) * 1.5), hex('#5aff8a'));
  for (let i = 0; i < 3; i++) R.pset(PU[0] + 10 + i, 136, Math.sin(t * 4 + i) > 0 ? hex('#ff5a3a') : hex('#5a2a1a'));
  R.recorte(null);
  // el aplique: de noche (y a última hora) las polillas que dan vueltas
  if (P.luz !== 'dia') for (let k = 0; k < 3; k++) { const a = t * (3 + k) + k * 2; R.pset(Math.round(130 + Math.cos(a) * (4 + k * 2)), Math.round(110 + Math.sin(a * 1.3) * 3), hex('#e8e0c0')); }
  // el coche que llega por la derecha levantando polvo y se para
  const cx = a_orCocheX(coche); a_orCoche(R, P, Math.round(cx), 152, -1, -cx * 0.5);
  g.coche = [Math.round(cx), 152];
  a_orBriznas(R, t, P, 158, 180, 60, 3);
  a_orBichos(R, t, P, 100, 150, 3);
}

// una bocina: pirámide truncada de chapa remachada, con la garganta en (px, py) y la boca hacia el ángulo a (radianes,
// 0 = derecha, negativo = arriba); se ve su costado y su tapa (en 3/4) y la boca de canto. Devuelve el centro de la boca
function a_orBocina(R, P, px, py, a, s = 1) {
  const L = 56 * s, g0 = 6 * s, g1 = 22 * s, ca = Math.cos(a), sa = Math.sin(a), nx = -sa, ny = ca, X = (u, w) => [px + ca * u + nx * w, py + sa * u + ny * w], T = [3 * s, -5 * s];
  const lado = [X(0, -g0), X(L, -g1), X(L, g1), X(0, g0)], tapa = [X(0, -g0), X(L, -g1), [X(L, -g1)[0] + T[0], X(L, -g1)[1] + T[1]], [X(0, -g0)[0] + T[0] * 0.4, X(0, -g0)[1] + T[1] * 0.4]];
  R.poligono(lado.map(([x, y]) => [x + 1, y + 1]), P.k); R.poligono(tapa.map(([x, y]) => [x - 1, y - 1]), P.k);
  const [cL, cT, cS] = P.luz === 'noche' ? [P.alu[5], P.alu[6], P.alu[3]] : [P.alu[3], P.alu[5], P.alu[1]];
  R.poligono(lado, cL); R.poligono(tapa, cT);
  // el costado: tramado hacia la boca, las costuras de las chapas y los remaches
  for (let k = 1; k < 4; k++) { const u = L * k / 4, w = g0 + (g1 - g0) * k / 4, [x0, y0] = X(u, -w), [x1, y1] = X(u, w); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), cS);
    for (let j = -2; j <= 2; j++) { const [rx, ry] = X(u + 2, w * j / 2.5); R.pset(Math.round(rx), Math.round(ry), P.alu[5]); } }
  for (let k = 0; k < 6; k++) { const u = L * (k + 0.5) / 6, w = g0 + (g1 - g0) * (k + 0.5) / 6, [x, y] = X(u, w * 0.75); R.pset(Math.round(x), Math.round(y), P.alu[2]); }
  { const [x0, y0] = X(0, g0), [x1, y1] = X(L, g1); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), cS); }
  { const [x0, y0] = X(0, -g0), [x1, y1] = X(L, -g1); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), P.alu[6]); }
  // la boca de canto: el filo del marco, claro, y una rendija del interior en sombra (no se ve de frente)
  { const [x0, y0] = X(L, -g1), [x1, y1] = X(L, g1); R.linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), P.cel[3]); R.linea(Math.round(x0 + T[0]), Math.round(y0 + T[1]), Math.round(x0), Math.round(y0), P.cel[3]);
    R.linea(Math.round(x0 - ca * 2), Math.round(y0 - sa * 2), Math.round(x1 - ca * 2), Math.round(y1 - sa * 2), P.alu[2]); }
  // la caja del receptor en la garganta, con su piloto
  { const [x, y] = X(-6 * s, 0); R.rect(Math.round(x - 7 * s), Math.round(y - 6 * s), Math.round(x + 5 * s), Math.round(y + 6 * s), P.k); R.rect(Math.round(x - 6 * s), Math.round(y - 5 * s), Math.round(x + 4 * s), Math.round(y + 5 * s), P.alu[2]); R.linea(Math.round(x - 6 * s), Math.round(y - 5 * s), Math.round(x + 4 * s), Math.round(y - 5 * s), P.alu[4]); }
  const m = X(L, 0); return [Math.round(m[0]), Math.round(m[1])];
}

function a_orBocinas(R, t, o, v, P, g) {
  const clave = 'bocinas|' + v.luz, resp = o.respingo ?? 0, esp = o.espera ?? 0;
  const capa = a_orCapa(R, clave, () => {
    const B = R.buf; a_orCielo(R, P, 0, 40, { sol: P.luz === 'noche' ? [40, 10, 0] : [40, -40, 0], sinSol: true });
    const cielo = a_orFoto(R), metal = new Uint8Array(57600);
    // el reflector curvo, enorme, ocupa todo el fondo: costillas en abanico y juntas que se curvan; tranquilo arriba
    for (let x = 0; x < 320; x++) { const yt = 24 + Math.round(((x - 150) / 170) ** 2 * 8);
      for (let y = yt; y < 118; y++) { const v2 = (118 - y) / (118 - yt), cu = (x - 160) / (22 - v2 * 6) + 20, fu = Math.abs(cu - Math.round(cu)), cv = Math.sqrt(v2) * 5 + ((x - 160) / 160) ** 2 * 0.8, fv = Math.abs(cv - Math.round(cv));
        let f = 0.18 + v2 * 0.42 + (h(Math.floor(cu), Math.floor(cv), 746) - 0.5) * 0.08 + (((x + y) & 1) ? -0.04 : 0.02);
        if (a_orTranquila(x, y)) f += fu < 0.06 ? (cu > Math.round(cu) ? 0.05 : -0.05) : fv < 0.05 ? -0.04 : 0; else if (fu < 0.06) f += cu > Math.round(cu) ? 0.14 : -0.16; else if (fv < 0.05) f -= 0.12;
        const sh = (x * 0.55 + y - 150) / 26; if (!a_orTranquila(x, y)) f += Math.exp(-sh * sh) * 0.2;   // el brillo de la luna, en diagonal
        B[y * 320 + x] = y - yt < 2 ? (a_orTranquila(x, y) ? P.alu[3] : P.cel[2]) : a_orTono(P.alu, a_orCl(f), x, y); } }
    // el suelo de metal brillante, en perspectiva, con el reflejo del curvo y los dos raíles
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const z = 1 / (y - 104), xr = (x - 160) * z, jx = Math.abs(xr * 0.9 - Math.round(xr * 0.9)) < 0.03 + z * 0.4, jy = Math.abs(1 / z * 0.1 - Math.round(1 / z * 0.1)) < 0.12;
      metal[y * 320 + x] = 1; let f = 0.62 - (y - 118) / 62 * 0.3 + (h(Math.floor(xr * 0.9), Math.floor(0.1 / z), 747) - 0.5) * 0.1; if (y < 132) f -= (132 - y) / 14 * 0.25;
      B[y * 320 + x] = jx || jy ? P.suelo[1] : a_orTono(P.suelo, a_orCl(f), x, y); }
    for (const y of [150, 160]) { R.rect(0, y, 319, y + 1, P.alu[1]); R.linea(0, y, 319, y, P.alu[5]); R.linea(0, y + 2, 319, y + 2, P.k); for (let x = 4; x < 320; x += 14) R.rect(x, y + 2, x + 6, y + 3, P.madera[0]); }
    // el carrito: plataforma de vigas pintada, con barandilla, ruedas en los raíles
    R.rect(64, 124, 262, 140, P.k); R.rect(65, 125, 261, 139, P.amarillo[0]); R.rect(65, 125, 261, 127, P.amarillo[2]); R.rect(65, 128, 261, 132, P.amarillo[1]);
    for (let x = 70; x < 260; x += 16) { R.linea(x, 128, x + 8, 138, P.amarillo[0]); R.linea(x + 8, 128, x, 138, P.amarillo[0]); R.pset(x, 126, P.k); }
    for (let x = 70; x < 262; x += 24) { R.rect(x, 140, x + 3, 151, P.k); R.rect(x + 1, 140, x + 2, 150, P.alu[2]); }
    for (const x of [82, 140, 200, 246]) { R.disco(x, 151, 6, P.k); R.disco(x, 151, 4, P.alu[2]); R.disco(x, 151, 2, P.alu[0]); R.pset(x - 2, 148, P.alu[5]); }
    R.linea(64, 110, 64, 124, P.amarillo[1]); R.linea(262, 110, 262, 124, P.amarillo[1]); R.linea(64, 110, 92, 110, P.amarillo[2]); R.linea(240, 110, 262, 110, P.amarillo[2]);
    // la caja de herramientas y el termo sobre el carro, la lámpara de pinza en la barandilla
    R.rect(226, 114, 246, 124, P.k); R.rect(227, 115, 245, 123, hex('#a02a2a')); R.linea(227, 115, 245, 115, hex('#d04a3a')); R.rect(233, 111, 239, 113, P.k);
    R.rect(250, 112, 254, 124, P.k); R.rect(251, 113, 253, 123, hex('#3a6a9a')); R.linea(251, 113, 251, 123, hex('#6a9ac8')); R.rect(250, 110, 254, 111, P.alu[4]);
    R.linea(262, 110, 266, 100, P.k); R.poligono([[262, 96], [270, 98], [266, 105]], P.k); R.poligono([[263, 97], [269, 99], [266, 103]], hex('#3a5a3a')); R.pset(264, 101, hex('#fff2c0'));
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { fondo, metal };
  });
  const B = R.buf;
  for (let k = 0; k < 6; k++) { const f = (t * 0.7 + k / 6) % 1; if (f > 0.25) continue; const x = Math.round(30 + h(k, Math.floor(t * 0.7 + k / 6), 770) * 220), y = Math.round(40 + h(k, 2, 770) * 60); if (a_orTranquila(x, y)) continue; const c = hex('#e8f0ff'); R.pset(x, y, c); if (f < 0.12) { R.pset(x - 1, y, P.alu[5]); R.pset(x + 1, y, P.alu[5]); R.pset(x, y - 1, P.alu[5]); R.pset(x, y + 1, P.alu[5]); } }   // destellos en los remaches
  if (P.luz === 'noche') a_orEstrellas(R, t, P, { masc: capa.fondo, y1: 24, n: 50 }); else a_orNubes(R, t, P, { masc: capa.fondo, n: 4, y0: 6, y1: 22, sem: 11 });
  // brillos que barren el metal del suelo
  const gx = ((t * 26) % 480) - 80; for (let y = 118; y < 180; y++) for (let x = Math.max(0, Math.floor(gx - 14)); x < Math.min(320, gx + 14); x++) { const i = y * 320 + x; if (!capa.metal[i] || B[i] === P.alu[1]) continue; const d = Math.abs(x - gx + (y - 118) * 0.3) / 14; if (d < 1) B[i] = a_orMez(B[i], P.suelo[6], (1 - d) * 0.3); }
  // la luz cálida de la lámpara, que baña la barandilla y el borde del carro, y las polillas que dan vueltas
  if (P.luz !== 'dia') { for (let y = 90; y < 126; y++) for (let x = 222; x < 284; x++) { const d = Math.hypot(x - 265, (y - 102) * 1.3), i = y * 320 + x, k = (1 - d / 22) * 0.45; if (k > 0 && a_orU(x, y) < k * 2) B[i] = a_orMez(B[i], hex('#ffe0a0'), k); }
    for (const [x, y] of [[227, 115], [228, 115], [229, 115], [251, 113], [251, 114]]) R.pset(x, y, hex('#ffe0a0'));
    for (let k = 0; k < 3; k++) { const a = t * (4 + k) + k * 2.1; R.pset(Math.round(262 + Math.cos(a) * (5 + k * 2)), Math.round(100 + Math.sin(a * 1.4) * 4), hex('#f0e8d0')); } }
  // las dos bocinas: la de la izquierda tiembla con el respingo; la de la derecha se va inclinando a la izquierda
  const env = resp > 0 && resp < 1 ? Math.exp(-resp * 4) * Math.sin(resp * 70) : 0;
  const aE = -0.62 + env * 0.09, aO = -0.62 - a_orSuave(esp) * 0.55 + (esp >= 1 ? Math.sin(t * 1.5) * 0.02 : 0);
  // su reflejo en el suelo, tenue e invertido
  for (const [px, a] of [[96, aE], [184, aO]]) for (let k = 0; k < 30; k++) { const u = k * 1.8, x = Math.round(px + Math.cos(a) * u), y = Math.round(240 - (118 + Math.sin(a) * u)); for (let j = -2; j <= 2; j++) { const yy = y + j; if (yy >= 132 && yy < 180 && x >= 0 && x < 320 && capa.metal[yy * 320 + x]) B[yy * 320 + x] = a_orMez(B[yy * 320 + x], P.alu[2], 0.35); } }
  // los cables que bajan de las cajas y se van por el suelo
  a_orCable(R, P, [[86, 120], [70, 140], [20, 146], [-6, 148]], 3); a_orCable(R, P, [[174, 120], [160, 141], [100, 146], [40, 152]], 3);
  const bE = a_orBocina(R, P, 96, 118 + Math.round(env * 2), aE), bO = a_orBocina(R, P, 184, 118, aO);
  // pilotos de las cajas: el de la izquierda se enciende con el respingo
  R.pset(92, 118, resp > 0 && resp < 1 ? hex('#ff5a3a') : Math.sin(t * 2) > 0 ? hex('#5aff8a') : hex('#1a5a2a')); R.pset(180, 118, Math.sin(t * 2 + 1) > 0 ? hex('#5aff8a') : hex('#1a5a2a'));
  // la chispa en la garganta y las motas que saltan
  if (resp > 0 && resp < 0.6) { const f = resp / 0.6, x = 100, y = 112; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3, l = 2 + (1 - f) * 7; R.linea(x, y, Math.round(x + Math.cos(a) * l), Math.round(y + Math.sin(a) * l), hex('#fff6c0')); } R.disco(x, y, 1, hex('#ffffff'));
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (h(k, 1, 748) - 0.5) * 2.4, d = f * (14 + h(k, 2, 748) * 18); R.pset(Math.round(bE[0] - 20 + k * 3 + Math.cos(a) * d), Math.round(bE[1] + 12 + Math.sin(a) * d + f * f * 20), P.cel[3]); } }
  g.bocinaE = bE; g.bocinaO = bO;
}

const a_OR_CI = { cx: 160, cy: 560, r: 452, y: 52, x0: 40, x1: 280, oreja: [160, 108] };

// 'cinta' general (EL ESQUEMA de la deriva, de noche): el cielo con la Vía Láctea y las constelaciones que corren con
// o.u, la Tierra curva abajo hecha de parches (bosques de copas redondas, campos arados a surcos, rastrojos y prados
// con sus lindes), un río que serpentea con brillos, un lago, la carretera con farolas y coches que pasan con los faros
// encendidos, pueblos con ventanas que se encienden y se apagan; la gran oreja diminuta con su caseta, el HAZ que sube,
// la flecha del giro, el punto marcado que cruza el haz con o.u y brilla dentro, el reloj de arena torneado (la arena
// cae con o.u) y el 72. o.cinta (true, por omisión no): la CINTA DE SUPERMERCADO sobre el borde de la Tierra: banda de
// goma estriada que corre o.u · (o.vCinta ?? 240) px, con su bastidor de acero atornillado y sus patas, dos rodillos
// de acero con radios que giran sobre caballetes clavados en la hierba (x 6 y 314, y limbo + 8), y cuatro estrellas y
// una galaxia que viajan encima (destello «visto» al pasar bajo la oreja); o.cintaObjetos false: la banda sin
// estrellas. La estrella del gag que se cae es cosa de la escena. Devuelve punto, haz y, con o.cinta, banda: [6, 314].
function a_orCinta(R, t, o, v, P, g) {
  const u = a_orCl(o.u ?? 0), C0 = a_OR_CI, off = Math.round(u * (C0.x1 - C0.x0));
  const capa = a_orCapa(R, 'cinta', () => {
    const B = R.buf; a_orCielo(R, P, 0, 180, { sol: [-60, -60, 0] });
    const cielo = a_orFoto(R), agua = [], ventanas = [];
    // la Tierra: parches de bosque, campo arado, rastrojo y prado separados por lindes, con el borde de atmósfera
    for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) { const dx = x - C0.cx, dy = C0.cy - y, d = Math.hypot(dx, dy) - C0.r;
      if (d > 7) continue; if (d > 0) { if (!a_orTranquila(x, y)) B[y * 320 + x] = a_orMez(B[y * 320 + x], hex('#4a8ae0'), (1 - d / 7) * 0.7); continue; }
      const p = -d, a = Math.atan2(dx, dy) * C0.r, fila = Math.floor(p / 9), fa = (a + fila * 13) / (26 + fila * 3), col = Math.floor(fa), tipo = h(col, fila, 771), q = h(x, y, 772);
      const bos = tipo < 0.3 || Math.sin(a * 0.07 + p * 0.2) + Math.sin(a * 0.03 - p * 0.11) > 1.1;
      let c;
      if (bos) { const ca = ((a % 4) + 4) % 4, cb = p % 4; c = ca < 1.3 && cb < 1.3 ? hex('#24482c') : ca > 2.6 && cb > 2.6 ? hex('#08140e') : q < 0.5 ? hex('#0e2018') : hex('#14301e'); }
      else if (tipo < 0.5) c = (Math.floor(a * 0.6 + p * 0.25) & 1) ? hex('#2e3c24') : hex('#1c2a1a');
      else if (tipo < 0.64) c = q < 0.4 ? hex('#3e4a2c') : (x + y) % 3 === 0 ? hex('#2e3a24') : hex('#36442a');
      else c = q < 0.3 ? hex('#1a3424') : q < 0.8 ? hex('#22402a') : hex('#2c4c30');
      if (!bos && ((p % 9 < 0.9 && h(col, fila, 786) < 0.6) || fa - col < 0.035)) c = hex('#0c1a12');
      if (d > -1.5) c = hex('#8ac8ff'); else if (d > -3) c = a_orMez(c, hex('#4a8ae0'), 0.35);
      B[y * 320 + x] = c; }
    const dentro = (x, y, m = 4) => Math.hypot(x - C0.cx, C0.cy - y) - C0.r < -m;
    // el río que serpentea hacia abajo a la izquierda, con sus brillos, y el lago de la derecha
    for (let y = 116; y < 180; y++) { const xr = 104 - (y - 116) * 0.55 + Math.sin(y * 0.16) * 7, w = 0.6 + (y - 116) / 40;
      for (let x = Math.floor(xr - w); x <= Math.ceil(xr + w); x++) if (dentro(x, y)) { B[y * 320 + x] = Math.abs(x - xr) > w - 0.5 ? hex('#16243c') : hex('#1e3258'); if (h(x, y, 773) > 0.8) agua.push([x, y]); } }
    for (let y = 143; y <= 153; y++) for (let x = 196; x <= 228; x++) { const e = ((x - 212) / 14) ** 2 + ((y - 148) / 4.5) ** 2; if (e > 1) continue; B[y * 320 + x] = e > 0.75 ? hex('#16243c') : (y === 146 && x > 203 && x < 216) ? hex('#3a5a8a') : hex('#1e3258'); if (h(x, y, 774) > 0.88) agua.push([x, y]); }
    // la carretera que baja de la oreja (dos píxeles, con el arcén) y sus farolas naranjas
    for (let y = 112; y < 180; y++) { const xc = Math.round(160 - (y - 110) * 1.4); for (const [dd, cc] of [[-1, '#2a2a28'], [0, '#3a3a36'], [1, '#3a3a36'], [2, '#1a1a18']]) if (dentro(xc + dd, y)) B[y * 320 + xc + dd] = hex(cc);
      if (y % 7 === 0 && dentro(xc + 4, y)) { B[y * 320 + xc + 4] = hex('#ffb04a'); B[(y + 1) * 320 + xc + 4] = hex('#5a4020'); } }
    // los pueblos: tejados oscuros con una ventana encendida cada uno, alrededor de una plaza con farola
    for (const [px, py, n] of [[92, 146, 9], [236, 134, 7], [190, 166, 10], [130, 175, 6], [40, 158, 5]]) for (let k = 0; k < n; k++) {
      const x = Math.round(px + (h(k, px, 775) - 0.5) * n * 4), y = Math.round(py + (h(k, py, 776) - 0.5) * n * 1.4); if (!dentro(x, y, 6) || (x > 258 && y > 162)) continue;
      R.rect(x - 1, y - 1, x + 1, y, hex('#2a2620')); R.pset(x - 1, y - 2, hex('#3a342a')); R.pset(x, y - 2, hex('#3a342a'));
      const w = [x + (k & 1 ? 1 : -1), y]; B[w[1] * 320 + w[0]] = hex(k % 3 ? '#ffd27a' : '#ffb04a'); ventanas.push(w); }
    // la gran oreja diminuta y su caseta en lo alto del arco
    const [ox, oy] = C0.oreja; R.poligono([[ox - 9, oy], [ox - 12, oy - 9], [ox - 10, oy - 9], [ox - 6, oy]], hex('#c8ccd8')); R.linea(ox - 12, oy - 9, ox - 6, oy, hex('#f0f2f8'));
    R.rect(ox - 6, oy - 1, ox + 5, oy, hex('#a8c8f0')); R.poligono([[ox + 5, oy], [ox + 9, oy - 6], [ox + 10, oy - 6], [ox + 7, oy]], hex('#9aa2b4'));
    R.rect(ox - 17, oy - 3, ox - 14, oy, hex('#d8d4c8')); R.pset(ox - 16, oy - 2, hex('#ffd27a'));
    R.numero('72', 262, 176, { color: hex('#ffd27a') });
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { fondo, cielo, agua, ventanas };
  });
  const B = R.buf, [ox, oy] = C0.oreja;
  // el cielo que pasa: la Vía Láctea y las estrellas corridas off píxeles hacia la derecha
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!capa.fondo[i]) continue; const c = capa.cielo[y * 320 + ((x - off) % 320 + 320) % 320], w = y < 50 ? a_orCl(a_orLejosTranq(x, y) / 14) : 1;
    B[i] = w >= 1 ? c : w <= 0 ? capa.cielo[i] : a_orMez(capa.cielo[i], c, w); }
  a_orEstrellas(R, t, P, { masc: capa.fondo, y1: 118, n: 190, off });
  // constelaciones tenues (líneas punteadas entre estrellas que viajan con el cielo)
  for (const pts of [[[60, 30], [74, 38], [90, 34], [100, 46]], [[200, 70], [214, 62], [228, 72], [222, 86]]]) for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]]; for (let s = 0; s <= 1; s += 0.1) { const x = Math.round(((a[0] + (b[0] - a[0]) * s + off) % 320 + 320) % 320), y = Math.round(a[1] + (b[1] - a[1]) * s); if (!a_orTranquila(x, y) && capa.fondo[y * 320 + x]) B[y * 320 + x] = a_orMez(B[y * 320 + x], hex('#6a7ab0'), 0.6); } }
  // la vida de la Tierra: el agua que brilla, ventanas que se encienden y se apagan, coches con los faros por la carretera
  for (let k = 0; k < capa.agua.length; k++) { const [x, y] = capa.agua[k]; if (Math.sin(t * 2.6 + k * 1.7) > 0.7) B[y * 320 + x] = hex('#8ab0e0'); }
  for (let k = 0; k < capa.ventanas.length; k++) if (k % 4 === 1 && Math.sin(t * 0.7 + k * 2.3) < -0.4) { const [x, y] = capa.ventanas[k]; B[y * 320 + x] = hex('#3a342a'); }
  for (let k = 0; k < 3; k++) { const s = (t * 0.035 + k * 0.37) % 1, y = Math.round(114 + s * 64), x = Math.round(160 - (y - 110) * 1.4), sube = k === 1;
    if (y < 178 && x > 1) { R.pset(x + (sube ? 1 : 0), y, sube ? hex('#ff4a3a') : hex('#fff4c0')); R.pset(x + (sube ? 1 : 0), y + (sube ? 1 : -1), sube ? hex('#8a2a20') : a_orMez(B[(y - 1) * 320 + x], hex('#fff4c0'), 0.5)); } }
  // el haz: un cono estrecho de luz tenue que sube desde la gran oreja (más tenue arriba)
  const hz = (y) => [ox - 3 - (oy - y) * 0.075, ox + 3 + (oy - y) * 0.075];
  for (let y = 22; y < oy - 8; y++) { const [a, b] = hz(y); for (let x = Math.floor(a); x <= Math.ceil(b); x++) { const i = y * 320 + x, e = 1 - Math.abs(x - (a + b) / 2) / ((b - a) / 2 + 0.5), k = (0.3 + e * 0.35) * (0.5 + (y - 22) / (oy - 30) * 0.5); if (a_orU(x, y) < k * 1.8) B[i] = a_orMez(B[i], hex('#bfe0ff'), 0.4 + e * 0.25); }
    const pulso = Math.floor(t * 8 + y * 0.3) % 6 === 0; R.pset(Math.round(a), y, pulso ? hex('#e0f0ff') : hex('#5a8ac0')); R.pset(Math.round(b), y, pulso ? hex('#e0f0ff') : hex('#5a8ac0')); }
  // la flecha punteada del giro, sobre la Tierra (de izquierda a derecha, por debajo)
  for (let k = 0; k < 24; k++) { const a = -Math.PI / 2 - 0.3 + k * 0.025, x = Math.round(C0.cx + Math.cos(a) * (C0.r - 20)), y = Math.round(C0.cy + Math.sin(a) * (C0.r - 20)); if ((k + Math.floor(t * 6)) % 3 === 0) R.pset(x, y, hex('#9ad8ff')); }
  { const a = -Math.PI / 2 - 0.3, x = Math.round(C0.cx + Math.cos(a) * (C0.r - 20)), y = Math.round(C0.cy + Math.sin(a) * (C0.r - 20)); R.linea(x, y, x - 3, y - 2, hex('#9ad8ff')); R.linea(x, y, x - 3, y + 2, hex('#9ad8ff')); }
  // el punto marcado: cruza el haz y brilla mientras está dentro
  const px = C0.x0 + off, py = C0.y, [ha, hb] = hz(py), dentro = px >= ha - 1 && px <= hb + 1;
  if (dentro) { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t, l = 6 + Math.sin(t * 8) * 2; R.pset(Math.round(px + Math.cos(a) * l), Math.round(py + Math.sin(a) * l), hex('#ffe680')); } R.disco(px, py, 3, hex('#fff2b0')); }
  for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2; R.pset(Math.round(px + Math.cos(a) * 5), Math.round(py + Math.sin(a) * 5), hex('#ffb43a')); }
  R.disco(px, py, 1, hex('#ffffff')); R.pset(px - 2, py, hex('#ffe680')); R.pset(px + 2, py, hex('#ffe680'));
  // la cinta de supermercado (opcional), por delante de la Tierra y por detrás del reloj de arena
  if (o.cinta) { a_orCintaBanda(R, t, P, u * (o.vCinta ?? 240), o.cintaObjetos !== false); g.banda = [6, 314]; }
  a_orRelojArena(R, u);
  g.punto = [px, py]; g.haz = [Math.round(ha), Math.round(hb)];
}
// las seis lecturas de 12 s (las alturas de 6, 14, 26, 30, 19 y 5 veces el ruido: la campana; la U es el 30)
const a_OR_CURVA = [6, 14, 26, 30, 19, 5];

// 'cinta' cámara 'haz' (EL CRUCE de cerca, sobre la mesa): la hoja de papel milimetrado con los ejes, las siete marcas
// del tiempo con sus números, la curva teórica en trazos gruesos (se lee también con o.u 0), apuntes a lápiz (1420),
// un clip y la mancha de una taza, y la campana de seis escalones que se dibuja con o.u (ámbar, punta que brilla);
// debajo, otra hoja vieja. La mesa: tablas con vetas, nudos, juntas, clavos y el charco de luz de la lámpara; la regla,
// el lápiz, la goma con sus virutas, la taza con vapor, la tarjeta con el haz en pequeño (el punto lo cruza con o.u);
// arriba, una calculadora de LED rojo que va echando cuentas y el papel pijama de la impresora plegado. Vida: el vapor,
// los LED, las estrellas de la tarjeta y una polilla que revolotea por el margen de arriba con su sombra. Devuelve curva y punta.
function a_orHaz(R, t, o, v, g) {
  const u = a_orCl(o.u ?? 0), [x0, y0, x1, y1] = g.curva;
  a_orCapa(R, 'haz', () => {
    const B = R.buf;
    // la mesa: tablas de 30 px con vetas que rodean los nudos, juntas a tope con clavos, más oscura en los bordes
    const nudos = []; for (let k = 0; k < 7; k++) nudos.push([Math.round(h(k, 1, 777) * 320), k * 30 + 8 + Math.round(h(k, 2, 777) * 14)]);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), jx = Math.round(30 + h(tabla, 0, 778) * 250), d = Math.hypot(x - 140, y - 100) / 200;
      let nud = 0; for (const [nx, ny] of nudos) { const dn = Math.hypot((x - nx) / 2.4, y - ny); if (dn < 9) nud += Math.sin(dn * 2.2) * (1 - dn / 9) * 0.5; }
      const veta = Math.sin(y * 0.55 + Math.sin(x * 0.02 + y * 0.05) * 3 + h(0, y >> 3, 751) * 6 + nud * 4);
      let f = 0.58 + veta * 0.12 + (h(x >> 3, y, 752) - 0.5) * 0.1 + (h(tabla, x < jx ? 0 : 1, 753) - 0.5) * 0.14 - d * 0.5 + nud * 0.25;
      if (y % 30 === 0) f = 0.04; else if (y % 30 === 1) f -= 0.12; else if (y % 30 === 29) f += 0.08;
      if (x === jx) f = 0.06; else if (x === jx + 1) f += 0.1;
      if (a_orTranquila(x, y)) f = 0.3 - d * 0.2;
      B[y * 320 + x] = a_orTono([hex('#3a2416'), hex('#52341e'), hex('#6e4628'), hex('#8a5a32'), hex('#a8703e')], a_orCl(f), x, y); }
    for (let tb = 0; tb < 6; tb++) { const jx = Math.round(30 + h(tb, 0, 778) * 250); for (const yy of [tb * 30 + 5, tb * 30 + 24]) for (const xx of [jx - 3, jx + 4]) if (!a_orTranquila(xx, yy)) { R.pset(xx, yy, hex('#1e140c')); R.pset(xx - 1, yy - 1, hex('#c8a070')); } }
    // la hoja vieja de debajo, amarillenta, un poco girada (asoma a la derecha y abajo) con su sombra
    R.poligono([[x0 - 8, y0 - 4], [x1 + 20, y0 - 9], [x1 + 24, y1 + 22], [x0 - 4, y1 + 26]], hex('#2a1a10'));
    R.poligono([[x0 - 10, y0 - 6], [x1 + 18, y0 - 11], [x1 + 22, y1 + 20], [x0 - 6, y1 + 24]], hex('#e4d8b8'));
    for (let y = y0; y < y1 + 22; y += 4) for (let x = x1 + 10; x < x1 + 22; x++) if (R.pget(x, y) === hex('#e4d8b8')) R.pset(x, y, hex('#cfc4a2'));
    for (let k = 0; k < 4; k++) R.linea(x1 + 12, y0 + 30 + k * 18, x1 + 18, y0 + 26 + k * 18 + (k & 1) * 2, hex('#8a8478'));
    // la hoja de papel milimetrado con su sombra
    R.rect(x0 - 12, y0 - 8, x1 + 12, y1 + 22, hex('#2a1a10')); R.rect(x0 - 14, y0 - 10, x1 + 10, y1 + 20, hex('#f4f0e2'));
    for (let y = y0 - 9; y < y1 + 20; y++) for (let x = x0 - 13; x < x1 + 10; x++) { const gx = (x - x0) % 4 === 0, gy = (y - y0) % 4 === 0, GX = (x - x0) % 20 === 0, GY = (y - y0) % 20 === 0;
      if (GX || GY) R.pset(x, y, hex('#9ac4b4')); else if (gx || gy) R.pset(x, y, hex('#d4e6d8')); else if (h(x, y, 754) < 0.04) R.pset(x, y, hex('#ece6d4')); }
    R.linea(x0 - 14, y0 - 10, x1 + 10, y0 - 10, hex('#ffffff')); R.linea(x1 + 10, y0 - 10, x1 + 10, y1 + 20, hex('#d8d0b8'));
    // la mancha de una taza (un aro de café a medio cerrar) arriba a la derecha de la hoja
    for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2; if (a > 4.4 && a < 5.2) continue; for (const r of [8, 8.8]) { const x = Math.round(214 + Math.cos(a) * r), y = Math.round(62 + Math.sin(a) * r * 0.9); R.pset(x, y, a_orMez(R.pget(x, y), hex('#a0703a'), r === 8 ? 0.55 : 0.3)); } }
    // los ejes, las siete marcas del tiempo (cada 12 s) con su número, y la marca de la altura
    R.linea(x0 + 4, y1, x1, y1, hex('#2a2a3a')); R.linea(x0 + 4, y0, x0 + 4, y1, hex('#2a2a3a')); R.linea(x1, y1, x1 - 3, y1 - 2, hex('#2a2a3a')); R.linea(x1, y1, x1 - 3, y1 + 2, hex('#2a2a3a'));
    R.linea(x0 + 4, y0, x0 + 2, y0 + 3, hex('#2a2a3a')); R.linea(x0 + 4, y0, x0 + 6, y0 + 3, hex('#2a2a3a'));
    for (let k = 0; k <= 6; k++) { const x = x0 + 4 + k * 30; R.linea(x, y1, x, y1 + 3, hex('#2a2a3a')); R.numero(String(k * 12), x, y1 + 13, { color: hex('#3a3a4a'), centro: true, sombra: false }); }
    for (let k = 1; k <= 3; k++) R.linea(x0 + 1, y1 - k * 33, x0 + 4, y1 - k * 33, hex('#2a2a3a'));
    // la curva teórica, en trazos gruesos de lápiz naranja: la que deja un punto fijo al cruzar el haz
    for (let x = x0 + 4; x <= x0 + 184; x++) { const s = (x - x0 - 94) / 44, y = y1 - Math.round(Math.exp(-s * s) * 104), s2 = (x + 1 - x0 - 94) / 44, y2 = y1 - Math.round(Math.exp(-s2 * s2) * 104);
      if ((x - x0) % 7 < 4) { R.linea(x, y, x, y2, hex('#d0782a')); R.pset(x, y + 1, hex('#f0b070')); R.pset(x, y - 1, hex('#e8a060')); } }
    // los apuntes a lápiz: la frecuencia (1420) arriba y una flecha hasta la cima de la curva
    R.numero('1420', x0 + 150, y0 + 12, { color: hex('#6a6a78'), centro: true, sombra: false });
    for (let k = 0; k < 10; k++) R.pset(x0 + 132 - k * 3, y0 + 10 + Math.round(k * 0.2), hex('#8a8a96')); R.linea(x0 + 104, y0 + 12, x0 + 107, y0 + 9, hex('#8a8a96')); R.linea(x0 + 104, y0 + 12, x0 + 108, y0 + 13, hex('#8a8a96'));
    // el clip de la esquina de arriba a la izquierda
    { const cx = x0 - 6, cy = y0 - 14; R.rect(cx - 2, cy, cx + 3, cy + 15, hex('#5a5e66')); R.rect(cx - 1, cy + 1, cx + 2, cy + 14, hex('#c8ccd4')); R.rect(cx, cy + 3, cx + 1, cy + 12, hex('#f4f0e2')); R.linea(cx, cy + 2, cx, cy + 10, hex('#e8ecf4')); R.pset(cx + 2, cy + 14, hex('#ffffff')); }
    // los objetos de la mesa: la taza de café, el lápiz, la goma con sus virutas y la regla
    { const x = 290, y = 158; R.disco(x + 1, y + 2, 13, hex('#2a1a10')); R.disco(x - 1, y - 1, 12, hex('#e8e4dc')); R.disco(x - 1, y - 1, 11, hex('#c8c4bc')); R.disco(x - 1, y - 1, 9, hex('#3a2010')); R.disco(x - 2, y - 2, 7, hex('#5a3418')); R.pset(x - 5, y - 4, hex('#a07850')); R.pset(x - 4, y - 5, hex('#c8a078'));
      R.rect(x + 10, y - 3, x + 14, y + 2, hex('#e8e4dc')); R.rect(x + 11, y - 2, x + 13, y + 1, hex('#5a3a28')); R.linea(x - 9, y - 9, x - 4, y - 12, hex('#ffffff')); R.rect(x - 2, y + 8, x + 2, y + 9, hex('#c83a2a')); }
    R.poligono([[248, 168], [306, 128], [308, 131], [250, 171]], hex('#2a1a10')); R.poligono([[248, 167], [304, 128], [306, 130], [250, 169]], hex('#f0c030')); R.linea(248, 167, 304, 128, hex('#f8e070')); R.poligono([[304, 128], [310, 125], [306, 130]], hex('#e8c8a0')); R.pset(310, 125, hex('#2a2a2a'));
    R.rect(247, 165, 251, 170, hex('#d8d8d0')); R.rect(244, 167, 247, 171, hex('#e88a9a'));
    R.rect(252, 70, 268, 78, hex('#2a1a10')); R.rect(251, 69, 266, 76, hex('#f0a0a8')); R.rect(251, 69, 257, 76, hex('#4a6ab8')); R.linea(258, 69, 266, 69, hex('#ffc8cc')); R.linea(251, 69, 257, 69, hex('#7a9ae0'));
    for (let k = 0; k < 7; k++) { const x = 238 + Math.round(h(k, 1, 779) * 12), y = 64 + Math.round(h(k, 2, 779) * 10); R.pset(x, y, hex('#f0a0a8')); R.pset(x + 1, y + (k & 1), hex('#d07a84')); }
    R.poligono([[14, 30], [26, 26], [36, 170], [24, 174]], hex('#2a1a10')); R.poligono([[12, 28], [24, 24], [34, 168], [22, 172]], hex('#e8e0c0')); R.linea(24, 24, 34, 168, hex('#b8ae8a')); for (let k = 0; k < 28; k++) { const yy = 30 + k * 5; R.linea(Math.round(13 + k * 0.72), yy, Math.round(13 + k * 0.72) + (k % 2 ? 2 : 4), yy - 1, hex('#5a5040')); }
    // la tarjeta con el haz en pequeño (a la derecha, por debajo de la esquina de Atom)
    R.rect(250, 84, 300, 136, hex('#2a1a10')); R.rect(248, 82, 298, 134, hex('#141c34')); R.linea(248, 82, 298, 82, hex('#2a3658'));
    for (let y = 84; y < 132; y++) for (let x = 250; x < 296; x++) if (h(x, y, 755) > 0.96) R.pset(x, y, hex('#a8b4dc'));
    R.poligono([[273, 130], [262, 88], [284, 88]], hex('#2a3e66')); R.linea(273, 130, 262, 88, hex('#7ab0e0')); R.linea(273, 130, 284, 88, hex('#7ab0e0')); R.rect(268, 130, 278, 132, hex('#c8ccd8'));
    // arriba: la calculadora (cuerpo, ventana del LED, teclas) y el papel pijama de la impresora plegado en acordeón
    R.rect(186, 2, 214, 25, hex('#140e0a')); R.rect(184, 0, 212, 23, hex('#2e2a2e')); R.linea(184, 0, 212, 0, hex('#5a565c')); R.linea(184, 0, 184, 23, hex('#4a464c'));
    R.rect(187, 2, 209, 8, hex('#0a0606'));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const kx = 187 + i * 5, ky = 11 + j * 3, c = i === 4 ? hex('#d8782a') : j === 0 && i < 2 ? hex('#a83a2a') : hex('#c8c4bc'); R.rect(kx, ky, kx + 2, ky + 1, c); R.pset(kx, ky, a_orMez(c, hex('#ffffff'), 0.5)); }
    R.rect(224, 0, 272, 24, hex('#2a1a10'));
    for (let y = 0; y < 23; y++) for (let x = 222; x < 270; x++) { let c = (Math.floor(y / 4) & 1) ? hex('#cfe6c8') : hex('#f4f2e8'); if (x < 226 || x > 265) c = hex('#f4f2e8'); if ((x === 223 || x === 268) && y % 4 === 1) c = hex('#6a4a30'); if (y === 11) c = hex('#b8b4a4'); else if (y === 12) c = hex('#ffffff'); R.pset(x, y, c); }
    R.linea(222, 23, 269, 23, hex('#c8c4b4'));
  });
  // la calculadora echa cuentas: el LED rojo cambia de número cada poco (y brilla en la ventana)
  { const nums = [1420, 72, 6, 30, 1977, 12, 144, 37], n = String(nums[Math.floor(t / 0.8) % nums.length]), x = 207 - n.length * 4;
    for (let i = 0; i < n.length; i++) a_orLed(R, x + i * 4, 3, +n[i], hex('#ff4a2a'));
    for (let xx = 187; xx <= 209; xx++) if (R.pget(xx, 2) === hex('#0a0606')) R.pset(xx, 2, hex('#2a0a06')); }
  // las estrellas de la tarjeta que titilan
  for (let k = 0; k < 10; k++) { const x = 252 + Math.round(h(k, 1, 780) * 42), y = 86 + Math.round(h(k, 2, 780) * 40); if (Math.sin(t * 3 + k * 2.1) > 0.6) R.pset(x, y, hex('#ffffff')); }
  // el vapor del café que sube y se enrosca
  for (let k = 0; k < 14; k++) { const f = (t * 0.5 + k / 14) % 1, x = Math.round(289 + Math.sin(f * 7 + t + k) * 3 * f), y = Math.round(150 - f * 34); if (y > 48) { R.pset(x, y, a_orMez(R.pget(x, y), hex('#e8e0d0'), 0.55 * (1 - f))); if (f < 0.5) R.pset(x + 1, y, a_orMez(R.pget(x + 1, y), hex('#e8e0d0'), 0.3 * (1 - f))); } }
  // la campana de seis escalones que se dibuja con o.u (ámbar, con su sombra y la punta que brilla)
  const n = u * 6, alto = (k) => Math.round(a_OR_CURVA[k] / 30 * 104);
  let px = x0 + 4, py = y1;
  for (let k = 0; k < 6; k++) { if (n <= k) break; const f = Math.min(1, n - k), xa = x0 + 4 + k * 30, xb = Math.round(xa + 30 * f), ya = y1 - alto(k);
    R.rect(xa + 1, ya + 1, xb - 1, y1 - 1, a_orMez(hex('#ffe0a0'), hex('#f4f0e2'), 0.5)); for (let y = ya + 3; y < y1; y += 3) R.linea(xa + 1, y, xb - 1, y, hex('#ffd890'));
    R.linea(xa, ya, xb, ya, hex('#e08a10')); R.linea(xa, ya + 1, xb, ya + 1, hex('#ffb43a')); R.linea(xa, ya, xa, k === 0 ? y1 : y1 - alto(k - 1), hex('#e08a10'));
    if (f >= 1 && k === 5) R.linea(xb, ya, xb, y1, hex('#e08a10'));
    px = xb; py = ya; }
  if (u > 0 && u < 1) { R.disco(px, py, 2, hex('#fff2b0')); R.pset(px, py, hex('#ffffff')); for (let k = 0; k < 4; k++) { const a = t * 6 + k * Math.PI / 2; R.pset(Math.round(px + Math.cos(a) * 4), Math.round(py + Math.sin(a) * 4), hex('#ffb43a')); } }
  // el punto que cruza el haz pequeño de la tarjeta
  { const x = Math.round(252 + u * 42), y = 98, dentro = x > 264 && x < 282; R.disco(x, y, dentro ? 2 : 1, dentro ? hex('#ffe680') : hex('#ffb43a')); R.pset(x, y, hex('#ffffff')); }
  // la polilla que revolotea por el margen de arriba (entre la calculadora, el papel pijama y la hoja), con su sombra
  { const a = t * 1.1, mx = Math.round(226 + Math.cos(a) * 38 + Math.sin(a * 2.3) * 4), my = Math.round(24 + Math.sin(a) * 6 + Math.cos(a * 1.7) * 2), ala = Math.floor(t * 16) % 2;
    for (let i = -2; i <= 3; i++) R.pset(mx + 4 + i, my + 6, a_orMez(R.pget(mx + 4 + i, my + 6), hex('#1a1008'), 0.45));
    const W = hex('#c8b490'), Wo = hex('#5a4630');
    if (ala) { R.rect(mx - 3, my - 2, mx - 1, my - 1, W); R.rect(mx + 2, my - 2, mx + 4, my - 1, W); R.pset(mx - 3, my - 2, Wo); R.pset(mx + 4, my - 2, Wo); }
    else { R.rect(mx - 3, my, mx - 1, my + 2, W); R.rect(mx + 2, my, mx + 4, my + 2, W); R.pset(mx - 3, my + 2, Wo); R.pset(mx + 4, my + 2, Wo); }
    R.rect(mx, my - 1, mx + 1, my + 2, hex('#3a2a1c')); R.pset(mx, my - 2, Wo); R.pset(mx + 1, my - 2, Wo); }
  g.punta = [px, py];
  void v;
}
const a_OR_PL = { x: 166, y: 140 };

// 'golf' cámara 'plancha' (EL GAG 6, tarde de verano): una plancha de aluminio olvidada entre la hierba sin segar del
// borde de un green, de cerca: chapa ondulada con remaches a lo largo de los dos cantos, un doblez, abolladuras, barro
// seco y el cielo reflejado en diagonal; detrás, el green con su bandera que ondea, el búnker con su rastrillo, el
// camino de los carritos (pasa uno), dos jugadores lejos, árboles de copa redonda con su luz y su sombra, las casas
// nuevas, nubes y golondrinas. o.pelota 0–1: la pelota entra botando por la izquierda, golpea la plancha en 0,5 y se va
// rodando a la derecha; EL «TONK» se lee solo (de 0,5 a 0,95): estrella de impacto maciza con contorno, tres arcos
// gruesos con contorno que se abren, un brillo que corre por la chapa hacia las dos puntas, marcas de vibración en las
// puntas y la chapa que se cimbrea 2 px (en reposo, el cuadrilátero exacto). Devuelve suelo 150, plancha y pelota.
function a_orPlancha(R, t, o, v, P, g) {
  const pel = o.pelota ?? 0, [qx, qy] = g.plancha, golpe = 0.5, k = (pel - golpe) / 0.45, suena = k > 0 && k < 1;
  const capa = a_orCapa(R, 'plancha|' + v.luz, () => {
    const B = R.buf; a_orCielo(R, P, 0, 80, { sol: P.luz === 'tarde' ? [62, 50, 9] : undefined });
    const cielo = a_orFoto(R);
    // al fondo: la fila de casas, el seto, árboles y el green con la bandera
    for (let x = -6; x < 320; x += 26) a_orCasa(R, P, x, 74, 22, x + 3);
    for (let y = 74; y < 120; y++) for (let x = 0; x < 320; x++) { const z = (y - 74) / 46, q = h(x >> 1, y >> 1, 756); B[y * 320 + x] = a_orTono(P.hierba, 0.46 + z * 0.1 + (q - 0.5) * 0.14 + ((Math.floor((x + y * 1.5) / 18)) & 1 ? 0.14 : 0) + (h(x, y, 769) > 0.97 ? -0.2 : 0), x, y); }
    for (let x = 0; x < 320; x++) { const a = 2 + Math.round(h(x >> 2, 0, 784) * 2); for (let j = 0; j < a; j++) B[(75 + j) * 320 + x] = j === 0 ? P.hierba[3] : h(x, j, 785) < 0.5 ? P.bosque[2] : P.bosque[1]; }
    for (const [x, r, s] of [[30, 12, 1], [70, 9, 2], [250, 13, 3], [296, 10, 4]]) a_orCopaGolf(R, P, x, Math.round(72 - r * 0.5), r, s);
    // el camino de los carritos que cruza a lo lejos, un búnker con su rastrillo y las sombras de los árboles
    for (let x = 0; x < 320; x++) { const y = Math.round(90 + Math.sin(x * 0.02 + 1) * 4); B[y * 320 + x] = P.hormigon[3]; B[(y + 1) * 320 + x] = a_orTono(P.hormigon, 0.5 + (h(x, y, 768) - 0.5) * 0.3, x, y + 1); B[(y + 2) * 320 + x] = P.hormigon[0]; }
    for (let y = 96; y < 106; y++) for (let x = 210; x < 270; x++) { const d = ((x - 240) / 30) ** 2 + ((y - 101) / 5) ** 2; if (d <= 1) B[y * 320 + x] = d > 0.8 ? P.tierra[1] : ((x + y * 3) % 7 === 0 ? hex('#d8c08a') : hex('#ecd8a4')); }
    R.linea(262, 98, 274, 92, P.madera[2]); R.linea(258, 100, 264, 97, P.alu[1]);
    for (const [x, r] of [[30, 12], [70, 9], [250, 13], [296, 10]]) for (let y = 80; y < 84; y++) for (let xx = x - r; xx < x + r + 6; xx++) if (xx >= 0 && xx < 320 && ((xx - x - 3) / (r + 3)) ** 2 + ((y - 81.5) / 2) ** 2 < 1) B[y * 320 + xx] = a_orMez(B[y * 320 + xx], P.hierba[0], 0.5);
    // el green (más claro y liso) y la hierba sin segar delante, en la que está la plancha
    for (let y = 104; y < 128; y++) for (let x = 0; x < 320; x++) { const d = (y - 104) / 24 + Math.sin(x * 0.03) * 0.2; if (d < 0.6) B[y * 320 + x] = a_orTono(P.hierba, 0.78 + (((x >> 3) + (y >> 2)) & 1 ? 0.05 : -0.02) + (h(x, y, 757) - 0.5) * 0.06, x, y); }
    for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (y - 104) / 24 + Math.sin(x * 0.03) * 0.2; if (d < 0.6) continue; const q = h(x, y, 758), m = h(x >> 2, y >> 1, 759), z = (y - 118) / 62;
      B[y * 320 + x] = a_orTono(P.hierba, a_orCl(0.3 + (m - 0.5) * 0.4 + (q - 0.5) * 0.3 - z * 0.1 + ((x * 3 + y) % 5 === 0 ? 0.2 : 0)), x, y); if (q > 0.993) B[y * 320 + x] = P.flor[Math.floor(h(x, y, 760) * 3)]; }
    for (let k2 = 0; k2 < 400; k2++) { const x = Math.round(h(k2, 1, 761) * 320), y = 122 + Math.round(h(k2, 2, 761) * 58), l = 3 + Math.round(h(k2, 3, 761) * (y - 110) / 10); R.linea(x, y, x + Math.round((h(k2, 4, 761) - 0.5) * 3), y - l, P.hierba[k2 % 2 ? 2 : 3]); }
    // en la hierba de delante: dientes de león, una piedra, una chuleta de tierra y una estaca de distancia
    for (const [x, y] of [[40, 166], [70, 172], [262, 170], [296, 160], [18, 150]]) { R.linea(x, y, x, y - 4, P.hierba[1]); R.disco(x, y - 5, 1, hex('#f0d040')); R.pset(x, y - 5, hex('#fff4a0')); }
    R.rect(56, 156, 61, 158, P.hormigon[2]); R.linea(56, 156, 60, 156, P.hormigon[3]); R.pset(61, 158, P.hormigon[0]);
    R.poligono([[280, 146], [290, 145], [291, 148], [281, 149]], P.tierra[1]); R.linea(281, 146, 289, 145, P.tierra[2]);
    R.rect(302, 124, 304, 140, hex('#f4f4f4')); R.rect(302, 124, 304, 127, hex('#e02a2a')); R.linea(305, 125, 305, 140, P.hierba[0]);
    const fin = R.buf, fondo = new Uint8Array(57600); for (let i = 0; i < 57600; i++) fondo[i] = fin[i] === cielo[i] ? 1 : 0;
    return { fondo };
  });
  a_orNubes(R, t, P, { masc: capa.fondo, n: 6, y0: 24, y1: 60, sem: 13 });
  bandada(R, t, { tipo: 'golondrina', n: 3, y: 58, cada: 12, v: 30, semilla: 9 });
  { const x = Math.round(((t * 11) % 380) - 30), y = Math.round(90 + Math.sin(x * 0.02 + 1) * 4); if (x > -10 && x < 330) { R.rect(x - 4, y - 5, x + 4, y - 5, P.blanco); R.linea(x - 3, y - 4, x - 3, y - 2, P.alu[1]); R.rect(x - 4, y - 2, x + 5, y, P.blanco); R.pset(x - 2, y + 1, P.k); R.pset(x + 3, y + 1, P.k); R.pset(x, y - 3, hex('#e0a878')); } }
  for (const [x, k2] of [[196, 0], [204, 1]]) { const y = 104, sw = Math.floor((t + k2 * 1.7) % 4) === 0; R.pset(x, y, P.k); R.rect(x, y - 3, x, y - 2, k2 ? hex('#3a5a9a') : hex('#e8e8e8')); R.pset(x, y - 4, hex('#e0a878')); if (sw) R.pset(x + 1, y - 3, P.alu[1]); }
  // la bandera del green, lejos, que ondea
  { const fx = 120, fy = 108; R.linea(fx, fy, fx, fy - 14, P.blanco); R.pset(fx, fy + 1, P.k); for (let i = 0; i < 7; i++) { const o2 = Math.round(Math.sin(t * 5 - i * 0.7) * (i / 7) * 1.4); R.linea(fx + 1 + i, fy - 14 + o2, fx + 1 + i, fy - 10 + o2, i % 3 === 2 ? hex('#a01818') : hex('#e02a2a')); } }
  // la plancha: en reposo, el cuadrilátero exacto; con el golpe se cimbrea (las dos puntas en contra del centro)
  const cim = suena ? Math.round(Math.sin(k * 34) * 2.4 * (1 - k)) : 0;
  const Q = [[100, 150 + cim], [208, 130 - cim], [232, 138 - cim], [124, 160 + cim]], B = R.buf;
  R.poligono(Q.map(([x, y]) => [x, y + 2]), hex('#1e2a14'));
  const enChapa = (a, b) => a_orL2(a_orL2(Q[0], Q[1], a), a_orL2(Q[3], Q[2], a), b);
  a_orSup(R, (a, b) => enChapa(a, b), 300, 60, (a, b, x, y) => {
    if (a < 0.006 || a > 0.994 || b < 0.03) return P.cel[a < 0.5 ? 3 : 2];
    if (b > 0.97) return P.alu[1];
    const cor = Math.abs((a * 18) % 1 - 0.5) < 0.12, dob = a > 0.72 && a < 0.76, abol = Math.hypot((a - 0.3) * 6, (b - 0.55) * 1.6);
    let f = 0.74 - b * 0.3 + Math.sin(a * 6) * 0.06 + (h(Math.floor(a * 40), Math.floor(b * 8), 762) - 0.5) * 0.08 + (((x + y) & 1) ? -0.04 : 0) + ((a * 18) % 1 < 0.5 ? 0.06 : -0.04);
    const ref = a - b * 0.35; if (ref > 0.22 && ref < 0.42) f += 0.32 - Math.abs(ref - 0.32) * 2;   // el cielo reflejado, en diagonal
    if (b > 0.88) f -= 0.25;   // el canto de abajo
    if (dob) f += a < 0.74 ? 0.2 : -0.3; if (cor) f -= 0.1;
    if (abol < 0.5) f += abol < 0.25 ? -0.15 : 0.12;   // una abolladura con su filo de luz
    if (h(Math.floor(a * 60), Math.floor(b * 12), 763) < 0.04) return P.tierra[1];   // barro seco
    return a_orTono(P.alu, a_orCl(f), x, y); });
  // los remaches a lo largo de los dos cantos (cabeza oscura y su brillo)
  for (let i = 0; i < 12; i++) for (const b of [0.12, 0.84]) { const [x, y] = enChapa((i + 0.5) / 12, b).map(Math.round); R.pset(x, y, P.alu[0]); R.pset(x - 1, y - 1, P.alu[6]); }
  // EL «TONK»: el brillo que corre por la chapa hacia las dos puntas, las marcas de vibración, los arcos y la estrella
  if (suena) {
    const kb = a_orCl(k / 0.5), BL = hex('#ffffff');
    if (kb < 1) for (const a of [0.6 - kb * 0.6, 0.6 + kb * 0.4]) for (let i = 0; i <= 16; i++) { const bb = i / 16; for (const da of [-0.014, 0, 0.014]) { const [x, y] = enChapa(a_orCl(a + da - bb * 0.04), bb).map(Math.round); if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = a_orMez(B[y * 320 + x], BL, da === 0 ? 0.9 : 0.5); } }
    if (k < 0.8) { const vb = Math.floor(t * 16) % 2;
      for (const [ex, ey, s] of [[Q[0][0] + 6, Q[0][1] + 4, -1], [Q[2][0] - 2, Q[2][1] - 4, 1]]) for (let m = 0; m < 2; m++) { const r = 5 + m * 4 + vb; for (let j = -3; j <= 3; j++) { const x = Math.round(ex + s * (r - j * j * 0.25)), y = ey + j * 2; R.pset(x, y, P.k); R.pset(x, y - 1, BL); } } }
    for (let m = 0; m < 3; m++) { const q = a_orCl(k * 1.25 - m * 0.12); if (q <= 0 || q >= 1) continue; const rr = 8 + q * 34, c = m === 1 ? hex('#ffe070') : BL;
      for (let a = -Math.PI * 0.95; a < -Math.PI * 0.05; a += 0.5 / rr) { const x = Math.round(qx + Math.cos(a) * rr), y = Math.round(qy - 2 + Math.sin(a) * rr * 0.6); if (y < 26 || x < 0 || x > 319) continue; R.pset(x, y - 1, P.k); R.pset(x, y, c); R.pset(x, y + 1, c); R.pset(x, y + 2, P.k); } }
    if (k < 0.45) { const l = Math.round(6 + (1 - k / 0.45) * 8);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + 0.2, ll = i % 2 ? l * 0.6 : l, xa = Math.round(qx + Math.cos(a) * ll), ya = Math.round(qy - 2 + Math.sin(a) * ll * 0.8); R.linea(qx + 1, qy - 1, xa + 1, ya + 1, P.k); R.linea(qx, qy - 2, xa, ya, i % 2 ? hex('#ffe070') : BL); }
      R.disco(qx, qy - 2, 3, P.k); R.disco(qx, qy - 2, 2, hex('#ffe070')); R.pset(qx, qy - 2, BL); }
  }
  // la pelota: entra botando por la izquierda, golpea la plancha y se queda quieta al lado
  if (pel > 0) { let x, y;
    if (pel <= golpe) { const s = pel / golpe; x = lerp(-6, qx, s); const b = s < 0.5 ? s / 0.5 : (s - 0.5) / 0.5, alto = s < 0.5 ? 34 : 18, suelo = lerp(150, qy, s); y = suelo - Math.sin(b * Math.PI) * alto; }
    else { const s = Math.min(1, (pel - golpe) / 0.35); x = lerp(qx, qx + 52, a_orSuave(s)); y = lerp(qy, 154, s) - Math.sin(Math.min(1, s * 1.4) * Math.PI) * 14; }
    x = Math.round(x); y = Math.round(y); R.disco(x + 1, Math.max(y + 3, 150), 2, hex('#1e2a14'));
    R.disco(x, y - 2, 3, P.k); R.disco(x, y - 2, 2, P.blanco); R.pset(x - 1, y - 3, hex('#ffffff')); R.pset(x + 1, y - 1, hex('#c8c8c0')); R.pset(x, y - 2, hex('#dcdcd4'));
    g.pelota = [x, y]; }
  else g.pelota = [-10, 150];
  a_orBriznas(R, t, P, 120, 180, 90, 5);
}
// las briznas largas por delante de la plancha (orejaDelante de 'plancha'), que se mecen
function a_orBriznasPlancha(R, t, P) {
  for (let k = 0; k < 26; k++) { const x = Math.round(96 + h(k, 1, 764) * 150), y = Math.round(156 + h(k, 2, 764) * 20), l = 7 + Math.round(h(k, 3, 764) * 9), m = Math.sin(t * 2 + k) * 1.5;
    R.linea(x, y, Math.round(x + m + (h(k, 4, 764) - 0.5) * 4), y - l, P.hierba[k % 3 + 1]); }
}

// la paleta de la sala (los objetos) y las de la pared y el suelo, de noche y de día
const b_S = pal({
  azul: '#3e5a86', azulS: '#2c4268', azulL: '#6a88b4', gris: '#c4c6c8', grisS: '#9a9ea4', grisL: '#e2e4e4', grisD: '#6e727a',
  metal: '#8c949e', metalS: '#666e78', metalL: '#bcc4cc', metalD: '#4a5058', cristal: '#263040', cristalL: '#5a6a80',
  cinta: '#3a2a22', cintaL: '#5a4434', luzOn: '#fff0c0', luzOff: '#4a3e34', luzR: '#ff4a3a', luzV: '#6aff8a',
  vinilo: '#c8702a', viniloS: '#8e4c1c', viniloL: '#e8944c', carton: '#c09058', cartonS: '#94683a', cartonL: '#dcae78', cartonD: '#6e4a28',
  corcho: '#b8875a', corchoS: '#94683e', corchoL: '#d4a274', marco: '#7a5634', hoja: '#eeeae0', hojaS: '#b8b4aa',
  tarjeta: '#e8dcb4', tarjetaS: '#c8bc94', tarjetaR: '#c84a3a', taza: '#e8e0d0', cafe: '#3a2418', lamp: '#2e5a3e', lampL: '#4a7a5a',
  agujero: '#5a5650', puerta: '#6a7c90', puertaS: '#4e5e72', puertaL: '#8a9cb0', extintor: '#c83a2a', extintorL: '#e86a5a',
  pasillo: '#b8a880', pasilloS: '#94865e', pasilloT: '#d0c49c', pasilloF: '#8a7e66', salida: '#2aa85a', tinta: '#2c2a36',
});

const b_SP = pal({ papelL: '#fffcf0', papelD: '#e6dfca', bandaS: '#c4dcba' });

const b_PN = pal({
  techo: '#9ea2a2', techoS: '#8a8e90', techoP: '#929698', cornisa: '#7e8484',
  pared: '#8c9a8e', paredS: '#7e8c80', paredL: '#9aa89b', paredJ: '#778579', zocalo: '#3a3e44', zocaloL: '#5a6068',
  suelo: '#a6a49a', sueloS: '#929086', sueloL: '#b8b6ac', sueloJ: '#6e6c66', sueloP: '#848278', sombra: '#5e5c58', brillo: '#c8c8c0',
  cielo0: '#0a0f20', cielo1: '#121a34', cielo2: '#1c2648', via: '#2e3a62', tierra: '#0c120e', tierraL: '#16201a', oreja: '#2a3240', orejaL: '#3e4858',
});

const b_PD = pal({
  techo: '#c4c6c2', techoS: '#b0b2ae', techoP: '#b8bab6', cornisa: '#a2a6a2',
  pared: '#b0bca8', paredS: '#a0ac98', paredL: '#c0cab8', paredJ: '#98a490', zocalo: '#4a4e54', zocaloL: '#6a7078',
  suelo: '#c6c2b4', sueloS: '#b0ac9e', sueloL: '#d8d4c6', sueloJ: '#8a867a', sueloP: '#a29e90', sombra: '#86827a', brillo: '#e4e2d8',
  cielo0: '#4a9ae0', cielo1: '#6eb2ea', cielo2: '#9acef2', via: '#9acef2', tierra: '#6a9a3a', tierraL: '#8ab44a', oreja: '#dce2e8', orejaL: '#f4f8fc',
});

// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function b_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// un fondo fijo que se pinta una vez por lienzo en un búfer de R.nuevo() y se copia entero en cada fotograma; dibuja()
// puede devolver datos (la máscara del suelo) que se guardan con él
const b_CACHE = new WeakMap();

function b_fijo(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja(b); R.usar(prev); m[clave] = { b, extra }; }
  R.copiar(m[clave].b); return m[clave].extra;
}

// caracteres de impresora de 5×7 (las cifras y las cuatro letras de la secuencia 6EQUJ5, la única excepción)
const b_F57 = {
  '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'], '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  '3': ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'], '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'], '6': ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'], '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'], '9': ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'], Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'], J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
};

// un carácter de impresora en (x, y) arriba a la izquierda; gasto: la fracción de puntos que el martillo no marca
function b_glifo(R, ch, x, y, c, gasto = 0.06) { const f = b_F57[ch]; if (!f) return; const cG = b_mezcla(c, C.papel, 0.3); for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) if (f[j][i] === '#') R.pset(x + i, y + j, h(x + i, y + j, 9) > gasto ? c : cG); }

// el carácter de la línea k y la columna c del listado: casi todo «1» y espacios; la secuencia en la columna col
// desde la línea s0 (con las columnas de al lado en blanco en esas seis líneas, para que se lea)
function b_car(k, c, s0, col) { if (s0 != null && k >= s0 && k < s0 + 6) { if (c === col) return '6EQUJ5'[k - s0]; if (Math.abs(c - col) === 1) return ''; } const v = h(k, c, 37); return v < 0.44 ? '' : v < 0.9 ? '1' : v < 0.96 ? '2' : '3'; }

// motas de polvo que flotan y brillan dentro de la caja [x0, y0, x1, y1] (tam 1: pequeñas; 2: grandes y desenfocadas)
function b_motas(R, t, n, [x0, y0, x1, y1], tam = 1, dia = false) {
  const c1 = dia ? hex('#fffcf0') : hex('#ffe6a8'), c2 = dia ? hex('#d8dce0') : hex('#c8a870');
  for (let k = 0; k < n; k++) { const u = (h(k, 1, 77) + t * (0.012 + h(k, 2, 77) * 0.02)) % 1, x = Math.round(x0 + u * (x1 - x0) + Math.sin(t * 0.7 + k) * 6),
    y = Math.round(y0 + ((h(k, 3, 77) + t * 0.01 * (k % 3 - 1)) % 1 + 1) % 1 * (y1 - y0) + Math.sin(t * 0.9 + k * 2) * 4), on = Math.sin(t * 2 + k * 1.7) > -0.3;
    if (!on) continue; if (tam === 2) { R.pset(x, y, c2); R.pset(x + 1, y, c2); R.pset(x, y + 1, c2); R.pset(x + 1, y + 1, c1); } else R.pset(x, y, Math.sin(t * 3 + k) > 0.4 ? c1 : c2); }
}

// la pared de bloques de hormigón pintados: hiladas de 8 px, juntas, la luz arriba de cada bloque y poros; en la
// esquina de Atom (x > 274, y < 48) y bajo la barra del año, casi lisa
function b_bloques(R, x0, y0, x1, y1, P) {
  const { rect, pset } = R;
  rect(x0, y0, x1, y1, P.pared);
  for (let y = y0, f = 0; y <= y1; y += 8, f++) {
    const calmaY = y < 48;
    for (let x = x0 - (f % 2) * 8; x <= x1; x += 16) {
      const calma = calmaY && x > 266, cJ = calma ? P.paredS : P.paredJ;
      if (!calma) { rect(Math.max(x0, x + 1), y + 1, Math.min(x1, x + 14), y + 1, P.paredL); if (h(x, y, 5) > 0.6) rect(Math.max(x0, x + 2), y + 6, Math.min(x1, x + 13), y + 6, P.paredS); }
      rect(Math.max(x0, x), y, Math.min(x1, x + 15), y, cJ); if (x >= x0) rect(x, y, x, Math.min(y1, y + 7), cJ);
    }
  }
  for (let k = 0; k < 700; k++) { const x = Math.floor(h(k, 1, 51) * (x1 - x0)) + x0, y = Math.floor(h(k, 2, 51) * (y1 - y0)) + y0; if (x > 274 && y < 48) continue; pset(x, y, h(k, 3, 51) > 0.5 ? P.paredS : P.paredL); }
}

// el suelo técnico (placas de 60 cm en perspectiva, algunas perforadas) entre y0 y 179, con su punto de fuga en (160, 20)
function b_sueloTecnico(R, P, y0 = 126) {
  const filas = [y0, 129, 133, 138, 144, 151, 159, 168, 178, 190];
  for (let y = y0; y < 180; y++) {
    let r = 0; while (filas[r + 1] <= y) r++;
    const s = (y - 20) / (y0 - 20);
    for (let x = 0; x < 320; x++) {
      const u = (x - 160) / s / 22, cI = Math.floor(u), fu = u - cI, fy = (y - filas[r]) / (filas[r + 1] - filas[r]);
      let c = (cI + r) % 2 ? P.suelo : b_mezcla(P.suelo, P.sueloL, 0.35);
      const perf = h(cI, r, 61) > 0.78;
      if (perf && fu > 0.15 && fu < 0.85 && fy > 0.15 && fy < 0.85 && (x + y) % 2 === 0 && y % 2 === 0) c = P.sueloP;
      else if (h(x, y, 63) > 0.93) c = P.sueloS;
      if (y === filas[r]) c = P.sueloJ; else if (y === filas[r] + 1) c = P.sueloL;
      if (fu < 0.02 * s + 0.02) c = P.sueloJ;
      R.pset(x, y, c);
    }
  }
}

// una cifra de 3×5 (para contadores pequeños)
const b_D35 = ['###,#.#,#.#,#.#,###', '.#.,##.,.#.,.#.,###', '###,..#,###,#..,###', '###,..#,.##,..#,###', '#.#,#.#,###,..#,..#', '###,#..,###,..#,###', '###,#..,###,#.#,###', '###,..#,.#.,.#.,.#.', '###,#.#,###,#.#,###', '###,#.#,###,..#,###'].map((s) => s.split(','));

function b_cifras(R, n, x, y, c) { String(n).split('').forEach((d, i) => { const f = b_D35[+d]; if (f) for (let j = 0; j < 5; j++) for (let k = 0; k < 3; k++) if (f[j][k] === '#') R.pset(x + i * 4 + k, y + j, c); }); }

// el fondo fijo de la sala general (pared, techo, suelo, ventana, corcho, puerta y pasillo, armarios de cinta,
// computadora, impresora, cables y sombras); devuelve la máscara del suelo visible (donde puede ir el papel)
function b_salaFondo(R, dia) {
  const { rect, pset, linea, poligono, disco, anillo } = R, P = dia ? b_PD : b_PN, S = b_S, K = C.k;
  // el techo de placas acústicas con sus poros y la perfilería; bajo la barra del año, muy suave
  rect(0, 0, 319, 15, P.techo);
  for (let k = 0; k < 500; k++) pset(Math.floor(h(k, 1, 41) * 320), Math.floor(h(k, 2, 41) * 15), P.techoP);
  for (let x = 4; x < 320; x += 30) rect(x, 0, x, 14, P.techoS); rect(0, 7, 319, 7, P.techoS);
  rect(0, 15, 319, 16, P.cornisa); rect(0, 15, 319, 15, P.techoS);
  b_bloques(R, 0, 17, 319, 121, P);
  rect(0, 122, 319, 125, P.zocalo); rect(0, 122, 319, 122, P.zocaloL);
  b_sueloTecnico(R, P, 126);
  // el brillo de los fluorescentes en el suelo y los cables que lo cruzan (por debajo del papel)
  for (const [x, y, w] of [[188, 131, 40], [196, 136, 30], [214, 141, 34], [60, 133, 24], [24, 139, 20], [232, 164, 30], [70, 170, 26]]) for (let i = 0; i < w; i += 2) pset(x + i, y, P.brillo);
  for (let i = 0; i <= 40; i++) { const x = 104 + i * 1.2, y = 149 + Math.sin(i / 40 * Math.PI) * 5; pset(x, y, K); pset(x, y + 1, S.metalD); }
  for (let i = 0; i <= 30; i++) { const x = 40 + i * 0.8, y = 132 + i * 0.5 + Math.sin(i * 0.4); pset(x, y, K); }
  for (let i = 0; i <= 24; i++) { const x = 194 + i, y = 146 + Math.sin(i * 0.3) * 2; pset(x, y, hex('#2a2a30')); }
  // las sombras al pie de los muebles
  for (const [x0, x1, y] of [[0, 50, 132], [52, 136, 149], [144, 196, 149]]) for (let yy = y; yy < y + 3; yy++) for (let x = x0 + (yy - y); x <= x1 + (yy - y) * 2; x++) if ((x + yy) % 2 === 0 || yy === y) pset(x, yy, P.sombra);
  const snap = R.buf.slice();

  // la ventana: el cielo (de noche, estrellas y la Vía Láctea; de día, el azul), el campo con la gran oreja a lo lejos,
  // la persiana recogida arriba con su cordón y el alféizar
  const W = [61, 29, 119, 71];
  rect(58, 26, 122, 74, K); rect(59, 27, 121, 73, S.metalL); rect(60, 28, 120, 72, S.metalS);
  R.recorte(W);
  for (let y = W[1]; y <= W[3]; y++) for (let x = W[0]; x <= W[2]; x++) { const g = (y - W[1]) / (W[3] - W[1]) + (h(x >> 1, y >> 1, 43) - 0.5) * 0.25; pset(x, y, g < 0.35 ? P.cielo0 : g < 0.7 ? P.cielo1 : P.cielo2); }
  if (!dia) { for (let k = 0; k < 120; k++) { const u = h(k, 1, 44), x = 61 + u * 58, y = 30 + u * 26 + (h(k, 2, 44) - 0.5) * 14; if (h(k, 3, 44) > 0.4) pset(x, y, P.via); }
    for (let k = 0; k < 30; k++) pset(61 + h(k, 4, 44) * 58, 30 + h(k, 5, 44) * 30, h(k, 6, 44) > 0.7 ? C.blanco : hex('#9aa8d0')); }
  poligono([[61, 64], [80, 62], [100, 63], [120, 61], [120, 72], [61, 72]], P.tierra);
  for (let x = 61; x < 120; x += 3) pset(x, 66 + (x % 2), P.tierraL);
  // la gran oreja a lo lejos: el reflector plano inclinado (la celosía) y el curvo, más bajo
  poligono([[68, 63], [72, 50], [92, 50], [90, 63]], P.oreja); for (let x = 71; x < 92; x += 3) linea(x, 51, x - 2, 62, P.orejaL); linea(72, 56, 91, 56, P.orejaL);
  poligono([[100, 63], [101, 57], [110, 56], [112, 63]], P.oreja); linea(101, 57, 110, 56, P.orejaL); rect(90, 62, 101, 63, P.orejaL);
  R.recorte(null);
  for (let y = 29; y < 34; y++) rect(61, y, 119, y, y % 2 ? S.grisL : S.grisS); rect(61, 34, 119, 34, K);
  linea(116, 34, 116, 50, K); rect(115, 50, 117, 52, S.grisS);
  rect(56, 72, 124, 75, K); rect(57, 72, 123, 73, S.grisL); rect(57, 74, 123, 74, S.grisS);
  // el reloj de pared (la esfera y las horas; las agujas van aparte)
  disco(170, 44, 11, K); disco(170, 44, 10, S.metalL); disco(170, 44, 9, C.blanco); anillo(170, 44, 8.6, hex('#e0dcd0'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(170 + Math.cos(a) * 7.5), Math.round(44 + Math.sin(a) * 7.5), k % 3 ? S.grisD : K); }
  pset(165, 39, C.blanco); rect(169, 55, 171, 56, S.grisS);
  // el tablón de corcho: el marco, los poros, las hojas a rayas, una gráfica con su curva, la foto de la antena y las
  // chinchetas
  rect(196, 34, 244, 70, S.marco); rect(198, 36, 242, 68, S.corcho);
  for (let k = 0; k < 260; k++) pset(198 + Math.floor(h(k, 1, 47) * 45), 36 + Math.floor(h(k, 2, 47) * 33), h(k, 3, 47) > 0.5 ? S.corchoS : S.corchoL);
  rect(196, 70, 244, 70, K); rect(244, 34, 244, 70, K);
  for (const [x, y, w, hh] of [[201, 39, 12, 15], [229, 38, 11, 13], [215, 52, 12, 13]]) { rect(x + 1, y + 1, x + w + 1, y + hh + 1, S.corchoS); rect(x, y, x + w, y + hh, S.hoja); for (let yy = y + 3; yy < y + hh - 1; yy += 2) rect(x + 2, yy, x + 2 + Math.round(w * (0.5 + h(x, yy, 3) * 0.4)), yy, S.hojaS); }
  rect(215, 38, 227, 49, S.hoja); for (let x = 216; x < 227; x += 2) for (let y = 39; y < 49; y += 2) pset(x, y, hex('#cfe0cf')); for (let i = 0; i < 11; i++) pset(216 + i, Math.round(47 - Math.exp(-((i - 5) ** 2) / 5) * 7), C.rojo);
  rect(231, 53, 241, 62, C.blanco); rect(232, 54, 240, 61, hex('#6a9ac8')); poligono([[232, 61], [234, 57], [237, 57], [239, 61]], hex('#dce2e8')); rect(232, 60, 240, 61, hex('#5a8a3a'));
  for (const [x, y, c] of [[207, 39, C.rojo], [234, 38, hex('#3a6ae0')], [221, 52, hex('#e0c03a')], [221, 38, hex('#3aa05a')], [236, 53, C.rojo]]) { pset(x, y, c); pset(x + 1, y + 1, K); }
  // la balda con archivadores (lomos de colores sin letras) y el RECEPTOR de la gran oreja (la aguja del medidor y el
  // dial van aparte); el tubo de los cables que baja del techo entre la computadora y la impresora, con su caja
  rect(126, 77, 190, 79, K); rect(127, 77, 189, 77, S.grisL); rect(127, 78, 189, 78, S.grisS); for (const x of [132, 184]) { rect(x, 80, x + 1, 84, K); linea(x, 80, x + 3, 80, K); }
  [[hex('#3a6ab0'), 128], [hex('#c84a3a'), 133], [hex('#3a8a5a'), 137], [hex('#d8a83a'), 142], [hex('#3a6ab0'), 146]].forEach(([c, x], i) => { const hh = 11 - (i % 2); rect(x, 76 - hh, x + 3, 76, K); rect(x + 1, 77 - hh, x + 2, 76, c); rect(x + 1, 77 - hh, x + 1, 76, b_mezcla(c, C.blanco, 0.3)); rect(x + 1, 71 - (i % 2), x + 2, 72 - (i % 2), C.blanco); });
  poligono([[151, 76], [156, 66], [159, 67], [154, 76]], K); poligono([[152, 75], [156, 67], [158, 68], [154, 75]], hex('#8a5aa0'));
  rect(160, 62, 188, 76, K); rect(161, 63, 187, 75, S.gris); rect(161, 63, 187, 63, S.grisL); rect(186, 64, 187, 75, S.grisS);
  rect(163, 65, 174, 72, K); rect(164, 66, 173, 71, hex('#f0e8c8')); for (let x = 165; x < 173; x += 2) pset(x, 67, S.grisD);
  disco(181, 69, 3.5, K); disco(181, 69, 2.5, S.grisD); pset(180, 68, S.grisL); rect(164, 74, 166, 74, hex('#3aa05a'));
  rect(135, 84, 143, 90, K); rect(136, 85, 142, 89, S.metalS); rect(138, 90, 140, 121, K); rect(139, 90, 139, 121, S.metal); rect(137, 98, 141, 99, S.metalD); linea(143, 86, 147, 86, K); rect(135, 108, 143, 116, K); rect(136, 109, 142, 115, S.metalS); pset(139, 112, S.metalD);
  // la rejilla del aire acondicionado bajo el corcho; el termostato, el interruptor, el extintor y el cartel de no
  // fumar (un cigarrillo tachado)
  rect(200, 80, 240, 89, K); rect(201, 81, 239, 88, S.grisL); for (let y = 82; y < 88; y += 2) rect(202, y, 238, y, S.grisS);
  disco(248, 92, 3, K); disco(248, 92, 2, S.tarjeta); pset(248, 91, C.rojo); rect(246, 100, 249, 105, K); rect(247, 101, 248, 104, S.grisL); pset(247, 102, S.grisD);
  rect(237, 96, 239, 98, K); rect(234, 99, 242, 120, K); rect(235, 100, 241, 119, S.extintor); rect(235, 100, 236, 119, S.extintorL); rect(236, 98, 240, 99, S.metalD); linea(241, 100, 243, 110, K); rect(235, 108, 241, 111, C.blanco);
  rect(266, 49, 280, 59, K); rect(267, 50, 279, 58, C.blanco); disco(273, 54, 4.2, C.rojo); disco(273, 54, 3, C.blanco); rect(270, 54, 276, 55, S.grisD); pset(276, 54, C.naranja); linea(270, 57, 276, 51, C.rojo); linea(271, 57, 277, 51, C.rojo);
  // la puerta abierta: el pasillo recortado al hueco (techo, paredes, suelo de baldosas, la bombilla con su luz, el
  // cartel verde de salida con su flecha, el tablón, la fuente de agua y la puerta del fondo) y la hoja abierta
  const D = [256, 66, 294, 125], vx0 = 270, vx1 = 281, vy0 = 88, vy1 = 107;
  R.recorte(D);
  poligono([[256, 66], [295, 66], [vx1, vy0], [vx0, vy0]], P.techo);
  poligono([[256, 66], [vx0, vy0], [vx0, vy1], [256, 126]], S.pasillo); poligono([[295, 66], [vx1, vy0], [vx1, vy1], [295, 126]], S.pasilloS);
  poligono([[vx0, vy0], [vx1 + 1, vy0], [vx1 + 1, vy1], [vx0, vy1]], S.pasilloT);
  poligono([[256, 126], [295, 126], [vx1, vy1], [vx0, vy1]], S.pasilloF);
  for (const y of [108, 110, 113, 117, 122]) linea(256, y, 295, y, P.sueloJ);
  for (let k = -3; k <= 3; k++) linea(275.5 + k * 3.5, vy1, 275.5 + k * 13, 126, P.sueloJ);
  poligono([[272, vy0 + 4], [279, vy0 + 4], [279, vy1], [272, vy1]], S.puertaS); pset(278, 99, S.grisL);
  poligono([[272, 91], [279, 91], [279, 94], [272, 94]], S.salida); linea(273, 92, 277, 92, C.blanco); pset(276, 91, C.blanco); pset(276, 93, C.blanco);
  poligono([[259, 82], [266, 87], [266, 97], [259, 95]], S.corcho); for (let k = 0; k < 3; k++) poligono([[260 + k * 2, 86 + k], [261 + k * 2, 87 + k], [261 + k * 2, 92 + k], [260 + k * 2, 91 + k]], S.hoja);
  poligono([[287, 100], [292, 98], [292, 106], [287, 106]], S.metalL); poligono([[287, 106], [292, 106], [291, 112], [288, 110]], S.metalS);
  for (let y = 67; y < 108; y++) for (let x = 256; x <= 294; x++) { const d = Math.hypot(x - 275.5, (y - 74) * 1.4); if (d < 18 && (x + y) % 3 === 0 && d > 5) { const c0 = R.pget(x, y); pset(x, y, b_mezcla(c0, hex('#fff2c0'), 0.35 * (1 - d / 18))); } }
  disco(275.5, 72, 2.2, hex('#fff6d0')); pset(275, 69, S.grisD);
  R.recorte(null);
  rect(253, 63, 297, 65, K); rect(253, 63, 255, 125, K); rect(295, 63, 297, 125, K); rect(254, 64, 296, 64, S.grisS); rect(254, 64, 254, 125, S.grisL); rect(296, 64, 296, 125, S.grisS);
  poligono([[297, 64], [311, 57], [311, 135], [297, 126]], K); poligono([[298, 65], [310, 59], [310, 133], [298, 125]], S.puerta);
  linea(298, 65, 310, 59, S.puertaL); for (let y = 75; y < 120; y += 22) linea(300, y, 308, y - 4, S.puertaS);
  poligono([[300, 112], [308, 108], [308, 126], [300, 125]], S.metalS); rect(299, 92, 300, 96, S.metalL);
  // los dos armarios de cinta: la ventanilla de las bobinas (van aparte), las columnas de vacío, la botonera y el zócalo
  for (const x0 of [0, 25]) {
    rect(x0, 44, x0 + 23, 131, K); rect(x0 + 1, 45, x0 + 22, 130, S.azul); rect(x0 + 1, 45, x0 + 22, 48, S.azulL); rect(x0 + 21, 49, x0 + 22, 130, S.azulS);
    rect(x0 + 2, 50, x0 + 20, 77, K); rect(x0 + 3, 51, x0 + 19, 76, S.cristal);
    rect(x0 + 2, 79, x0 + 20, 111, S.gris); rect(x0 + 2, 79, x0 + 20, 79, S.grisL);
    for (const cx of [x0 + 4, x0 + 13]) { rect(cx, 81, cx + 5, 109, K); rect(cx + 1, 82, cx + 4, 108, hex('#1a2030')); }
    rect(x0 + 2, 113, x0 + 20, 121, S.grisS); for (let k = 0; k < 4; k++) rect(x0 + 4 + k * 4, 116, x0 + 5 + k * 4, 118, [C.blanco, S.luzR, C.blanco, hex('#3aa05a')][k]);
    rect(x0 + 1, 124, x0 + 22, 130, S.azulS); for (let x = x0 + 3; x < x0 + 21; x += 3) rect(x, 126, x, 129, K);
  }
  // la computadora: la consola de luces sobre el tablero, el tablero, el teclado, las tarjetas, la unidad de disco y
  // el frente con sus puertas; la lámpara (la luz va aparte) y la taza
  rect(60, 88, 108, 116, K); rect(61, 89, 107, 115, S.gris); rect(61, 89, 107, 90, S.grisL); rect(104, 91, 107, 115, S.grisS);
  rect(63, 92, 104, 112, K); rect(64, 93, 103, 111, hex('#1a1c24'));
  for (let i = 0; i < 13; i++) rect(65 + i * 3, 109, 65 + i * 3, 110, S.grisL);
  poligono([[54, 116], [134, 116], [137, 124], [51, 124]], K); poligono([[55, 117], [133, 117], [135, 123], [53, 123]], S.grisL);
  rect(52, 122, 136, 123, S.gris); for (let x = 60; x < 130; x += 9) pset(x, 119, S.gris);
  rect(52, 124, 136, 126, S.azulS); rect(54, 126, 134, 147, K); rect(55, 127, 133, 146, S.azul); rect(55, 127, 133, 127, S.azulL); rect(131, 127, 133, 146, S.azulS);
  for (const x of [57, 75]) { rect(x, 129, x + 16, 144, S.azulS); rect(x + 1, 130, x + 15, 143, S.azul); rect(x + 1, 130, x + 15, 130, S.azulL); rect(x + 13, 135, x + 14, 138, S.metalL); }
  rect(95, 129, 130, 145, S.azulS); rect(96, 130, 129, 144, S.gris); rect(96, 130, 129, 130, S.grisL); disco(113, 137, 7.5, K); rect(98, 141, 104, 142, S.grisD); pset(126, 132, S.luzR);
  rect(55, 146, 133, 148, hex('#22283a'));
  rect(68, 117, 94, 121, K); rect(69, 117, 93, 120, S.grisS); for (let y = 117; y < 121; y++) for (let x = 70 + (y % 2); x < 93; x += 2) pset(x, y, y === 120 ? S.grisD : S.grisL); rect(76, 120, 86, 120, S.grisL);
  rect(56, 114, 66, 118, S.tarjetaS); rect(56, 113, 65, 116, S.tarjeta); rect(56, 113, 58, 116, S.tarjetaR); for (let x = 59; x < 65; x += 2) pset(x, 114, S.tarjetaS);
  rect(97, 112, 103, 119, K); rect(98, 113, 102, 119, S.taza); rect(98, 113, 102, 114, S.cafe); rect(103, 114, 104, 117, K); pset(98, 115, C.blanco);
  disco(124, 120, 3, K); rect(122, 119, 126, 120, S.lamp); linea(124, 119, 119, 108, K); linea(125, 119, 120, 108, S.lampL);
  poligono([[112, 102], [120, 102], [124, 109], [108, 109]], K); poligono([[113, 103], [119, 103], [122, 108], [110, 108]], S.lamp); linea(114, 103, 111, 107, S.lampL);
  // la impresora de línea: el cuerpo gris, la tapa de cristal (el cabezal va aparte), la boca, la rejilla, la botonera
  // y el zócalo
  rect(146, 104, 194, 148, K); rect(147, 105, 193, 147, S.gris); rect(147, 105, 193, 106, S.grisL); rect(189, 107, 193, 147, S.grisS);
  poligono([[148, 95], [192, 95], [195, 104], [145, 104]], K); poligono([[149, 96], [191, 96], [193, 103], [147, 103]], S.azul);
  poligono([[152, 97], [188, 97], [189, 102], [151, 102]], S.cristal); linea(153, 102, 157, 97, S.cristalL);
  rect(156, 104, 186, 106, K);
  for (let y = 110; y < 142; y += 3) rect(148, y, 155, y, S.grisS);
  rect(186, 109, 192, 126, K); rect(187, 110, 191, 125, hex('#2a2c34')); for (const [y, c] of [[115, hex('#3aa05a')], [119, C.blanco], [123, hex('#e0b03a')]]) rect(188, y, 190, y + 1, c);
  rect(147, 144, 193, 147, S.azulS); for (let x = 150; x < 192; x += 4) pset(x, 145, K);
  // la máscara: el suelo que se ve (no lo tapa ningún mueble)
  const B = R.buf, mask = new Uint8Array(320 * 180);
  for (let i = 126 * 320; i < 320 * 180; i++) mask[i] = B[i] === snap[i] ? 1 : 0;
  // de noche, las esquinas y el suelo de delante en penumbra azulada (tramada), lejos de los fluorescentes
  if (!dia) for (let y = 17; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 200) / 210, (y - 70) / 120); if (d > 0.62 && (x + y) % 2 === 0) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#141a30'), Math.min(0.42, (d - 0.62) * 1.1)); }
  return mask;
}

// el color del papel continuo tendido en el suelo en (x, y): pliegues en perspectiva (cada hoja con su luz) que corren
// hacia la puerta con t, las bandas verdes cada dos hojas
function b_papelSuelo(x, y, t) {
  const f = Math.log(y - 96) * 16 + t * 1.6, n = Math.floor(f), fr = f - n;
  if (fr < 0.16) return C.papelS;
  const c = n % 2 ? b_SP.papelD : C.papel;
  return (n >> 1) % 2 && fr > 0.3 && fr < 0.8 ? (n % 2 ? b_SP.bandaS : C.banda) : c;
}

function b_salaGeneral(R, t, o, geo) {
  const { rect, pset, linea, disco, poligono, anillo } = R, dia = o.luz === 'dia', P = dia ? b_PD : b_PN, S = b_S, K = C.k;
  const p = Math.max(0, Math.min(1, o.papel ?? 0)), cl = (v) => Math.max(0, Math.min(1, v));
  const mask = b_fijo(R, dia ? 'wo-sala-dia' : 'wo-sala-noche', () => b_salaFondo(R, dia));
  // los fluorescentes del techo (el segundo parpadea a ratos) con su luz tramada en las placas, y la polilla
  for (const [x0, x1, k] of [[186, 214, 0], [220, 248, 1]]) {
    const on = !(k && (t % 6.1) < 0.35 && Math.sin(t * 70) > -0.3);
    rect(x0, 1, x1, 6, K); rect(x0 + 1, 2, x1 - 1, 5, on ? C.blanco : P.techoS); for (let x = x0 + 4; x < x1; x += 4) rect(x, 2, x, 5, on ? hex('#d8e4ec') : P.techo);
    if (on) for (let y = 8; y < 15; y++) for (let x = x0 - (y - 7); x <= x1 + (y - 7); x++) if ((x + y) % 4 === 0) pset(x, y, hex('#d8dcd8'));
  }
  { const mx = Math.round(200 + Math.cos(t * 1.7) * 11 + Math.sin(t * 7.3) * 2), my = Math.round(10 + Math.sin(t * 2.3) * 3), al = Math.sin(t * 30) > 0;
    pset(mx, my, hex('#6a5a48')); pset(mx - 1, my - (al ? 1 : 0), hex('#9a8a70')); pset(mx + 1, my - (al ? 1 : 0), hex('#9a8a70')); }
  // la ventana: las estrellas que titilan y la luz roja de la gran oreja; de día, las nubes de tres tonos que pasan
  R.recorte([61, 35, 119, 63]);
  if (!dia) { for (let k = 0; k < 8; k++) { const x = 63 + Math.floor(h(k, 7, 44) * 54), y = 36 + Math.floor(h(k, 8, 44) * 16), b = Math.sin(t * (1.5 + k * 0.4) + k * 2); if (b > 0.2) { pset(x, y, C.blanco); if (b > 0.85) { pset(x - 1, y, hex('#8a98c8')); pset(x + 1, y, hex('#8a98c8')); } } }
    if (Math.sin(t * 3.4) > 0.3) { pset(72, 49, hex('#ff4a3a')); pset(72, 48, hex('#a02a20')); } }
  else for (const [x0, y, w, v] of [[0, 40, 13, 1.6], [40, 46, 9, 2.6], [80, 38, 7, 1.1]]) { const x = 61 - 20 + ((x0 + t * v) % 90); for (const [dx, dy, r, c] of [[0, 1, w * 0.35, hex('#c8d4e4')], [w * 0.35, 0, w * 0.4, hex('#e8eef6')], [-w * 0.3, -1, w * 0.3, C.blanco], [w * 0.1, -2, w * 0.3, C.blanco]]) disco(x + dx, y + dy, r, c); }
  R.recorte(null);
  // las bobinas de cinta (giran a tirones) con su reflejo, y el bucle de cinta en las columnas de vacío
  for (const [x0, ph] of [[0, 0], [25, 2.3]]) {
    const a = t * 1.4 + Math.sin(t * 0.9 + ph) * 2.5;
    // la bobina llena (arriba a la izquierda) y la casi vacía (abajo a la derecha), con la cinta que va de una a otra
    const lleno = x0 ? 0.35 + 0.05 * Math.sin(t * 0.2) : 0.75;
    for (const [cx, cy, dir, pk] of [[x0 + 8, 60, 1, lleno], [x0 + 14, 69, -1, 1 - lleno]]) { disco(cx, cy, 5.5, hex('#4a5060')); disco(cx, cy, 5, hex('#1e2430')); disco(cx, cy, 2.6 + pk * 2.6, S.cinta); anillo(cx, cy, 2.6 + pk * 2.6, S.cintaL); disco(cx, cy, 2, S.metalL);
      for (let k = 0; k < 3; k++) { const b = dir * a + k * 2.09; linea(cx, cy, Math.round(cx + Math.cos(b) * 2.4), Math.round(cy + Math.sin(b) * 2.4), S.metalD); } pset(cx, cy, K); }
    linea(x0 + 3, 61, x0 + 4, 75, S.cinta);
    linea(x0 + 4, 74, x0 + 9, 52, S.cristalL); linea(x0 + 13, 74, x0 + 17, 56, S.cristalL);
    for (const [cx, k] of [[x0 + 4, 0], [x0 + 13, 1]]) { const yb = Math.round(94 + Math.sin(t * 1.3 + k * 1.7 + ph) * 9); rect(cx + 1, 82, cx + 1, yb, S.cinta); rect(cx + 4, 82, cx + 4, yb, S.cinta); rect(cx + 2, yb + 1, cx + 3, yb + 1, S.cinta); }
    pset(x0 + 19, 46, Math.floor(t * 2 + ph) % 2 ? S.luzV : hex('#2a5a3a'));
  }
  // la consola: filas de luces que parpadean (la de arriba con una luz que corre)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 13; i++) {
    const on = j === 0 ? i === Math.floor(t * 7) % 13 || i === (Math.floor(t * 7) + 6) % 13 : h(i, j, Math.floor(t * (3 + j)) + j * 17) > 0.55;
    rect(65 + i * 3, 94 + j * 4, 66 + i * 3, 95 + j * 4, on ? (j === 3 && i > 9 ? S.luzR : S.luzOn) : S.luzOff);
  }
  // el plato del disco gira detrás de su ventanilla, con el brazo de las cabezas que va y viene
  { disco(113, 137, 6.5, hex('#3a3e48')); disco(113, 137, 5.5, hex('#6a707c')); const a = t * 9; linea(113, 137, Math.round(113 + Math.cos(a) * 5), Math.round(137 + Math.sin(a) * 5), hex('#a8b0bc')); linea(113, 137, Math.round(113 - Math.cos(a) * 4), Math.round(137 - Math.sin(a) * 4), hex('#4a505a'));
    disco(113, 137, 1.4, S.metalL); const r = 3 + Math.round((Math.sin(t * 2.7) * 0.5 + 0.5) * 2); linea(120, 141, 113 + r, 138, S.grisD); pset(102, 133, C.blanco); }
  // el reloj: la hora de o.reloj, el minutero que avanza con t y el segundero a saltos
  { const hr = (o.reloj ?? 23.27) + t / 3600, s = Math.floor(t + 14) % 60;
    const ag = (ang, l, c) => linea(170, 44, Math.round(170 + Math.sin(ang) * l), Math.round(44 - Math.cos(ang) * l), c);
    ag((hr % 12) / 12 * Math.PI * 2, 4, K); ag((hr % 1) * Math.PI * 2, 6.5, K); ag(s / 60 * Math.PI * 2, 7, C.rojo); pset(170, 44, C.rojo); }
  // el receptor: la aguja del medidor tiembla con el ruido del cielo y el piloto del dial parpadea
  { const v = 0.35 + 0.18 * Math.sin(t * 7.3) + 0.12 * Math.sin(t * 13.1) + (h(Math.floor(t * 8), 1, 5) - 0.5) * 0.15, a = -2.5 + v * 1.8;
    linea(168, 71, Math.round(168 + Math.cos(a) * 5), Math.round(71 + Math.sin(a) * 5), C.rojo); pset(168, 71, K); pset(184, 64, Math.sin(t * 3) > 0 ? hex('#ffb43a') : S.grisS); }
  // la hoja del corcho que levanta el aire, y la cinta de la rejilla
  { const v = Math.max(0, Math.sin(t * 2.6) * 0.5 + Math.sin(t * 5.1) * 0.3); if (v > 0.15) { poligono([[228, 63], [235, 64], [234, 64 - Math.round(v * 5)]], S.hojaS); pset(234, 64 - Math.round(v * 5), S.hoja); }
    for (let i = 0; i < 6; i++) pset(Math.round(230 + Math.sin(t * 9 + i * 0.8) * i * 0.5), 90 + i, i % 2 ? hex('#a02a2a') : C.rojo); }
  // la lámpara: de noche, la bombilla y el halo ámbar sobre el tablero y la pared
  if (!dia) { for (let y = 96; y < 150; y++) for (let x = 84; x < 148; x++) { const d = Math.hypot(x - 116, (y - 119) * 1.5); if (d < 32 && (x + y) % 2 === 0 && (d < 16 || (x * 3 + y) % 5 < 3)) pset(x, y, b_mezcla(R.pget(x, y), hex('#ffc860'), 0.34 * (1 - d / 32))); }
    rect(112, 109, 118, 109, hex('#ffe8a0')); pset(115, 110, hex('#fff4d0')); }
  // el hilo de vapor ya frío de la taza, de vez en cuando
  { const u = (t % 5) / 2.2; if (u < 1) for (let i = 0; i < 6; i++) { const yy = 111 - i - Math.round(u * 4); if (h(i, Math.floor(t * 4), 3) > 0.3) pset(Math.round(100 + Math.sin(t * 2 + i * 0.7) * 1.5), yy, b_mezcla(R.pget(100, yy), C.blanco, 0.35 * (1 - u))); } }
  // EL PAPEL. La cantidad de cada fase: c llena la caja, m el montón que rebosa, q el papel por el suelo, r el río hasta
  // la puerta y w la ola que sale
  const c = cl(p / 0.25), m = cl((p - 0.25) / 0.2), q = cl((p - 0.3) / 0.6), r = cl((p - 0.42) / 0.38), w = cl((p - 0.8) / 0.2);
  const enSuelo = (x, y) => (mask[y * 320 + x] ? b_papelSuelo(x, y, t) : R.pget(x, y));
  let frente = [196, 156];
  if (q > 0) {
    const cx = 194, cy = 155, rx = 4 + 112 * q, ry = 2 + 26 * q, pts = [];
    for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2, wv = 1 + 0.06 * Math.sin(a * 7 + t * 2); pts.push([cx + Math.cos(a) * rx * wv, Math.max(127, cy + Math.sin(a) * ry * wv)]); }
    poligono(pts, enSuelo);
    // el borde: la orilla de abajo con su sombra en el suelo, la de arriba con su luz y los agujeros de arrastre
    for (let k = 0; k < 48; k++) { const [ax, ay] = pts[k], [bx, by] = pts[(k + 1) % 48], abajo = Math.sin((k + 0.5) / 48 * Math.PI * 2) > 0;
      linea(ax, ay, bx, by, (x, y) => (y < 179 && mask[y * 320 + x] ? (abajo ? C.papelS : b_SP.papelL) : null));
      if (abajo) linea(ax, ay + 1, bx, by + 1, (x, y, i) => (y < 180 && mask[y * 320 + x] ? (i % 3 ? P.sombra : P.sueloJ) : null));
      else linea(ax, ay + 2, bx, by + 2, (x, y, i) => (mask[y * 320 + x] && (i + Math.floor(t * 3)) % 3 === 0 ? S.agujero : null)); }
    frente = [Math.round(cx + rx), cy];
  }
  if (r > 0) {
    // el río: sus dos orillas van de la caja al umbral; al nacer es estrecho (wf) y se ensancha
    const L0 = (u) => [lerp(184, 257, u), lerp(150, 125, u)], R0 = (u) => [lerp(232, 293, u), lerp(165, 125, u)], wf = 0.25 + 0.75 * cl(r / 0.3);
    const mid = (u) => [(L0(u)[0] + R0(u)[0]) / 2, (L0(u)[1] + R0(u)[1]) / 2], L = (u) => [lerp(mid(u)[0], L0(u)[0], wf), lerp(mid(u)[1], L0(u)[1], wf)], Rr = (u) => [lerp(mid(u)[0], R0(u)[0], wf), lerp(mid(u)[1], R0(u)[1], wf)];
    const pts = [L(0)]; for (let i = 1; i <= 12; i++) pts.push(L(r * i / 12)); const n = 10;
    for (let i = 0; i <= n; i++) { const a = L(r), b = Rr(r), u = i / n, wv = Math.sin(u * 6 + t * 4) * 1.5; pts.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u) + wv]); }
    for (let i = 12; i >= 0; i--) pts.push(Rr(r * i / 12));
    poligono(pts, enSuelo);
    // la cresta que viaja hacia la puerta y el labio del frente
    const crest = (u, c1, c2) => { const a = L(u), b = Rr(u); linea(a[0], a[1], b[0], b[1], (x, y) => (mask[y * 320 + x] ? c1 : null)); linea(a[0], a[1] + 1, b[0], b[1] + 1, (x, y) => (mask[y * 320 + x] ? c2 : null)); };
    for (let k = 0; k < 2; k++) { const u = ((t * 0.3 + k * 0.5) % 1) * r; if (u > 0.05) crest(u, b_SP.papelL, C.papelS); }
    crest(r, b_SP.papelL, C.papelS);
    frente = [Math.round(lerp(L(r)[0], Rr(r)[0], 0.5)), Math.round(lerp(L(r)[1], Rr(r)[1], 0.5))];
  }
  // los pliegues sueltos que se levantan en el papel del suelo (tiendas de dos caras, una con luz y otra en sombra)
  if (q > 0) for (let k = 0; k < 90; k++) {
    const x = Math.round(40 + h(k, 1, 91) * 270), y = Math.round(128 + h(k, 2, 91) * 50); if (y > 178 || !mask[y * 320 + x]) continue;
    const c0 = R.pget(x, y); if (c0 !== C.papel && c0 !== b_SP.papelD && c0 !== C.banda && c0 !== b_SP.bandaS && c0 !== C.papelS) continue;
    const sz = Math.round(1 + (y - 126) / 14 + h(k, 3, 91) * 1.5 + Math.max(0, Math.sin(t * 1.3 + k)) * 0.8), vb = (k >> 1) % 3 === 0;
    for (let dx = -sz * 2; dx <= sz * 2; dx++) { const top = y - Math.round(sz - Math.abs(dx) / 2); for (let yy = top; yy <= y; yy++) if (mask[yy * 320 + x + dx]) pset(x + dx, yy, yy === top ? b_SP.papelL : dx < 0 ? (vb ? C.banda : C.papel) : (vb ? b_SP.bandaS : b_SP.papelD)); }
    for (let dx = -sz * 2; dx <= sz * 2; dx++) if (mask[(y + 1) * 320 + x + dx]) pset(x + dx, y + 1, C.papelS);
  }
  // por la puerta: el papel que se va por el pasillo (recortado al hueco) y LA OLA de pliegues que se levanta en el
  // umbral, con la cresta que se enrosca hacia fuera y hojas sueltas que vuelan por encima
  if (w > 0) {
    R.recorte([256, 66, 294, 125]);
    const yf = lerp(125, 106, cl(w * 1.5)), xa = lerp(256, 270, (125 - yf) / 19), xb = lerp(295, 281, (125 - yf) / 19);
    if (yf < 124.5) poligono([[256, 126], [295, 126], [xb, yf], [xa, yf]], (x, y) => b_papelSuelo(x, y + 30, t));
    for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1, y = Math.round(lerp(125, yf, u)), x = Math.round(lerp(270, 281, h(k, 4, 83)) + (1 - u) * (h(k, 5, 83) - 0.5) * 20); pset(x, y, b_SP.papelL); pset(x + 1, y, b_SP.papelL); pset(x, y + 1, C.papelS); }
    R.recorte(null);
    const hh = (1 + 26 * w) * (0.88 + 0.12 * Math.sin(t * 3)), yT = (x) => { const u = (x - 248) / 54; return 129 - hh * (0.45 + 0.55 * Math.sin(u * Math.PI)) - 1.6 * Math.sin(u * 9 + t * 5); };
    for (let x = 248; x <= 302; x++) { const y0 = Math.round(yT(x));
      for (let y = y0; y <= 130; y++) { const d = y - y0, f = (d * 0.9 + t * 7) % 5; let c = f < 1 ? C.papelS : Math.floor((d * 0.9 + t * 7) / 5) % 2 ? C.papel : b_SP.papelD;
        if (d < 2) c = b_SP.papelL; else if (d < 4 && x > 256 && x < 296) c = C.papelS; else if (Math.floor((d * 0.9 + t * 7) / 10) % 2 && f > 1.5) c = c === C.papel ? C.banda : b_SP.bandaS;
        if ((x === 250 || x === 300) && (y + Math.floor(t * 7)) % 3 === 0) c = S.agujero; pset(x, y, c); } }
    // el labio de la cresta, que se enrosca hacia el pasillo, y las hojas sueltas
    for (let x = 256; x <= 296; x += 1) { const y0 = Math.round(yT(x)), cu = Math.round(2 + Math.sin((x - 256) * 0.25 + t * 4) * 1.5); pset(x, y0 - 1, b_SP.papelL); if (cu > 2) pset(x, y0 - 2, C.papel); }
    for (let k = 0; k < 7; k++) { const u = (t * (0.45 + h(k, 1, 85) * 0.3) + h(k, 2, 85)) % 1, x = Math.round(256 + h(k, 3, 85) * 38 + Math.sin(t * 2 + k) * 4), y = Math.round(yT(x) - 3 - Math.sin(u * Math.PI) * (6 + 8 * w)), g = Math.floor(t * 6 + k) % 3;
      if (u > 0.9) continue; rect(x, y, x + (g ? 2 : 1), y + (g === 1 ? 0 : 1), C.papel); pset(x, y + (g === 1 ? 1 : 2), C.papelS); if (k % 3 === 0) pset(x + 1, y, C.banda); }
    frente = [275, Math.round(yT(275))];
  }
  // la caja de cartón: el fondo y la solapa de atrás, la pila de pliegues que sube, el papel que cuelga de la boca de la
  // impresora y corre hacia abajo, el frente de la caja y el montón que rebosa con su cascada
  const Y = -4;   // la caja se apoya en y 154 (un poco detrás de la línea de los personajes)
  rect(152, 134 + Y, 190, 142 + Y, K); poligono([[154, 134 + Y], [188, 134 + Y], [188, 141 + Y], [154, 141 + Y]], S.cartonD);
  poligono([[153, 134 + Y], [189, 134 + Y], [186, 129 + Y], [156, 129 + Y]], S.cartonS); linea(156, 129 + Y, 186, 129 + Y, S.cartonL);
  const ys = Math.round(157 + Y - 17 * c);
  for (let y = Math.max(135 + Y, ys); y < 142 + Y; y++) rect(155, y, 187, y, (y - ys) % 2 ? C.papelS : C.papel);
  const yb = m > 0 ? Math.round(140 + Y - 10 * m) : Math.max(136 + Y, ys);
  { const sc = t * 4, sw = Math.sin(t * 1.3) * 0.6;
    for (let y = 106; y <= yb; y++) { const dx = Math.round(sw * (y - 106) / 40), v = y - sc, mv = ((v % 24) + 24) % 24, band = Math.floor(v / 6) % 2 === 0;
      for (let x = 158; x <= 184; x++) { let col = band ? C.banda : C.papel; if (x === 158 || x === 184) col = C.papelS; else if ((x === 160 || x === 182) && ((Math.round(v) % 3) + 3) % 3 === 0) col = S.agujero;
        else if (x > 162 && x < 180 && (x - 163) % 3 === 0 && ((Math.round(v) % 3) + 3) % 3 === 1 && h(x, Math.floor(v / 3), 31) > 0.5) col = hex('#8a8a90');
        if (mv < 0.9) col = C.papelS; pset(x + dx, y, col); } } }
  rect(152, 142 + Y, 190, 158 + Y, K); rect(153, 143 + Y, 189, 157 + Y, S.carton); rect(153, 143 + Y, 189, 143 + Y, S.cartonL); rect(187, 144 + Y, 189, 157 + Y, S.cartonS);
  for (let x = 156; x < 186; x += 2) pset(x, 156 + Y, S.cartonS); rect(168, 143 + Y, 174, 157 + Y, hex('#c8a870')); rect(168, 143 + Y, 168, 157 + Y, S.cartonL);
  for (const ax of [157, 178]) { const y = 146 + Y; pset(ax + 3, y, S.cartonD); rect(ax + 2, y + 1, ax + 4, y + 1, S.cartonD); rect(ax + 1, y + 2, ax + 5, y + 2, S.cartonD); rect(ax + 3, y + 3, ax + 3, y + 6, S.cartonD); rect(ax + 1, y + 7, ax + 5, y + 7, S.cartonD); }
  for (let x = 152; x <= 190; x++) if (mask[(159 + Y) * 320 + x] && x % 2) pset(x, 159 + Y, P.sombra);
  poligono([[152, 143 + Y], [148, 137 + Y], [152, 135 + Y]], S.cartonS); poligono([[190, 143 + Y], [195, 138 + Y], [190, 135 + Y]], S.cartonS); linea(148, 137 + Y, 152, 143 + Y, K); linea(195, 138 + Y, 190, 143 + Y, K);
  if (m > 0) {
    const top = 141 + Y - Math.round(12 * m), pts = [[151, 143 + Y]];
    for (let i = 0; i <= 10; i++) { const x = 151 + i * 4, u = i / 10; pts.push([x, top + Math.round((1 - Math.sin(u * Math.PI)) * 5 * m + Math.sin(i * 1.7 + t * 1.5))]); }
    pts.push([192, 143 + Y]);
    poligono(pts, (x, y) => ((y - top + Math.floor(t * 3)) % 3 === 0 ? C.papelS : (Math.floor((y - top) / 3) % 4 === 1 ? C.banda : C.papel)));
    if (m > 0.3) { const k = cl((m - 0.3) / 0.7); poligono([[186, 140 + Y], [192, 141 + Y], [192 + 10 * k, 158], [186 + 4 * k, 158]], (x, y) => ((y + Math.floor(t * 8)) % 4 === 0 ? C.papelS : (y >> 2) % 2 ? b_SP.papelD : C.papel)); linea(192, 141 + Y, 192 + 10 * k, 158, b_SP.papelL); }
    if (m > 0.6) { const k = cl((m - 0.6) / 0.4); poligono([[156, 141 + Y], [150, 141 + Y], [147 - 4 * k, 158], [152, 158]], (x, y) => ((y + Math.floor(t * 8)) % 4 === 0 ? C.papelS : (y >> 2) % 2 ? C.papel : b_SP.papelD)); }
  }
  // la impresora: el cabezal que va y viene bajo el cristal y el piloto rojo
  { const hx = Math.round(156 + (Math.sin(t * 3.1) * 0.5 + 0.5) * 28); rect(hx, 99, hx + 3, 101, S.metalL); pset(hx + 1, 100, K); pset(hx + 4, 100, hex('#1a1c24')); }
  disco(189, 112, 1.5, Math.sin(t * 2) > -0.6 ? S.luzR : hex('#7a2a2a')); if (Math.sin(t * 2) > 0.4) pset(188, 111, hex('#ffb0a0'));
  // la silla de oficina vacía, que gira sola muy despacio: la estrella de cinco patas con ruedas, la columna, el asiento
  // de vinilo y el respaldo
  { const cx = 118, a = Math.sin(t * 0.35) * 0.9, ca = Math.cos(a), sa = Math.sin(a);
    for (let k = 0; k < 5; k++) { const b = a + k * 1.2566, ex = Math.round(cx + Math.cos(b) * 8), ey = Math.round(154 + Math.sin(b) * 2); linea(cx, 152, ex, ey, K); pset(ex, ey + 1, S.metalD); }
    rect(cx - 1, 144, cx + 1, 152, K); pset(cx, 145, S.metalL);
    const bw = Math.max(2, Math.round(Math.abs(ca) * 7)), bx = Math.round(cx + sa * 5);
    if (ca < 0) { rect(bx - bw, 124, bx + bw, 138, K); rect(bx - bw + 1, 125, bx + bw - 1, 137, S.viniloS); }
    rect(cx - 9, 139, cx + 9, 144, K); rect(cx - 8, 140, cx + 8, 143, S.vinilo); rect(cx - 8, 140, cx + 8, 140, S.viniloL); rect(cx - 8, 143, cx + 8, 143, S.viniloS);
    if (ca >= 0) { rect(bx - bw, 124, bx + bw, 139, K); rect(bx - bw + 1, 125, bx + bw - 1, 138, S.vinilo); rect(bx - bw + 1, 125, bx + bw - 1, 126, S.viniloL); rect(bx + bw - 1, 127, bx + bw - 1, 138, S.viniloS);
      for (let y = 129; y < 137; y += 3) rect(bx - bw + 2, y, bx + bw - 2, y, S.viniloS); }
    rect(bx - 1, 139, bx + 1, 141, K);
  }
  geo.papel = frente;
  return geo;
}

// el fondo fijo de la impresora de cerca (se pinta una vez en un búfer): la pared de bloques desenfocada (cada bloque
// con su tono, juntas con su sombra y su luz, manchas de humedad abajo y, de noche, el halo cálido del flexo), el
// armario de cinta, el tubo de la luz con su caja y el interruptor, el flexo sujeto al soporte de la barra, la ventana, el
// corcho con hojas, el hueco del reloj de pared (las agujas van aparte), las latas de cinta apiladas en su balda abajo a
// la izquierda y la papelera de rejilla abajo a la derecha con el cable de la impresora al enchufe; la barra guía del
// papel (y 15–19) con sus soportes; la impresora: la cubierta (por delante del papel, va aparte), el interior bajo el
// cristal con el rodillo, el frontal gris con la franja azul, tornillos, la placa sin letras, las rejillas, el
// contador y la botonera; encima, a la izquierda, un montón de listados plegados y un lápiz; a la derecha, la taza (el
// vapor lo pone cada fotograma). dia: la luz del día (pared más clara, sin halo, ventana azul)
function b_impresoraFondo(R, dia) {
  const { rect, pset, linea, poligono, disco } = R, P = dia ? b_PD : b_PN, S = b_S, K = C.k;
  const pa = dia ? P.pared : b_mezcla(P.pared, hex('#1a2030'), 0.45);
  // la pared: bloques de 32 × 16 a soga, cada uno con su tono, poros, la junta oscura y la luz de debajo; manchas de
  // humedad que suben del suelo y el halo del flexo (de noche) que calienta la pared alrededor de la lámpara
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const f = Math.floor((y - 4) / 16), ox = (f & 1) * 16, bx = Math.floor((x + ox) / 32), jy = ((y - 4) % 16 + 16) % 16, jx = ((x + ox) % 32 + 32) % 32;
    let c = b_mezcla(pa, h(bx, f, 61) > 0.5 ? C.blanco : K, 0.03 + h(bx, f, 62) * 0.05);
    const tranquila = x > 274 && y < 50;
    if (!tranquila) { if (jy === 0) c = b_mezcla(c, K, 0.2); else if (jy === 1) c = b_mezcla(c, C.blanco, 0.07); else if (jx === 0) c = b_mezcla(c, K, (y & 1) ? 0.16 : 0.1); else if (jx === 1) c = b_mezcla(c, C.blanco, 0.05);
      const pn = h(x >> 1, y >> 1, 63); if (pn > 0.94) c = b_mezcla(c, K, 0.08); else if (pn < 0.04) c = b_mezcla(c, C.blanco, 0.06); }
    const hu = y > 120 ? (y - 120) / 60 * (0.5 + 0.5 * Math.sin(x * 0.045 + 1.3) * Math.sin(x * 0.11)) : 0; if (hu > 0.25) c = b_mezcla(c, hex('#3a3a30'), Math.min(0.16, (hu - 0.25) * 0.4));
    if (!dia) { const d = Math.hypot(x - 77, (y - 46) * 1.3); if (d < 110) c = b_mezcla(c, hex('#ffcf7a'), 0.16 * (1 - d / 110) * (1 - d / 110)); }
    pset(x, y, c);
  }
  // el armario de cinta desenfocado a la izquierda (las bobinas van aparte): el cristal y el panel tramado
  for (let y = 26; y < 112; y++) for (let x = 0; x < 58; x++) { const e = Math.min(x, 58 - x, y - 26); if (e > 2 || (x + y) % 2 === 0) pset(x, y, e < 4 ? b_mezcla(S.azul, pa, 0.4) : S.azul); }
  for (let y = 34; y < 78; y++) for (let x = 6; x < 52; x++) if (Math.min(x - 6, 52 - x, y - 34, 78 - y) > 1 || (x + y) % 2) pset(x, y, b_mezcla(S.cristal, S.azul, 0.2));
  for (let y = 82; y < 110; y++) for (let x = 6; x < 52; x++) pset(x, y, (x + y) % 2 ? S.gris : b_mezcla(S.gris, S.azul, 0.4));
  for (let y = 36; y < 76; y++) { const x = 8 + Math.round((y - 36) * 0.3); pset(x, y, b_mezcla(S.cristalL, S.cristal, 0.3)); pset(x + 1, y, b_mezcla(S.cristalL, S.cristal, 0.6)); }
  rect(0, 112, 58, 113, b_mezcla(K, pa, 0.5));
  // la balda de abajo a la izquierda con las latas de cinta apiladas (cantos con su aro, una etiqueta de color)
  rect(2, 154, 38, 157, K); rect(3, 154, 37, 155, S.metalL); rect(3, 156, 37, 156, S.metalS); for (const x of [6, 32]) { rect(x, 157, x + 1, 164, S.metalD); }
  for (let k = 0; k < 6; k++) { const y = 148 - k * 6, x = 5 + Math.round(h(k, 1, 64) * 4) - 2; rect(x, y, x + 28, y + 5, K); rect(x + 1, y + 1, x + 27, y + 4, k % 2 ? S.metalS : S.metal); rect(x + 1, y + 1, x + 27, y + 1, S.metalL); rect(x + 1, y + 4, x + 27, y + 4, S.metalD);
    rect(x + 10 + (k % 3) * 3, y + 2, x + 15 + (k % 3) * 3, y + 3, [S.luzR, hex('#e0b03a'), S.azulL, C.blanco][k % 4]); pset(x + 25, y + 2, S.metalL); }
  // el tubo de la luz que baja por la pared con sus abrazaderas, la caja de empalmes y el interruptor
  rect(64, 24, 67, 104, K); rect(65, 24, 66, 104, S.grisS); rect(65, 24, 65, 104, S.grisL); for (let y = 30; y < 104; y += 22) { rect(63, y, 68, y + 1, S.metalD); pset(63, y, S.metalL); }
  rect(60, 58, 71, 69, K); rect(61, 59, 70, 68, S.gris); rect(61, 59, 70, 59, S.grisL); rect(70, 60, 70, 68, S.grisS); pset(62, 60, S.metalD); pset(69, 67, S.metalD);
  rect(74, 78, 81, 88, K); rect(75, 79, 80, 87, S.grisL); rect(77, 81, 78, 84, S.grisD); pset(77, 81, C.blanco);
  // el flexo sujeto al soporte izquierdo de la barra: la pinza, el brazo con su muelle y la pantalla verde que mira al
  // papel (bajo la barra del año)
  rect(84, 52, 92, 57, K); rect(85, 53, 91, 56, S.metalS); pset(86, 53, S.metalL);
  linea(85, 54, 78, 42, K); linea(86, 54, 79, 42, S.metalL); for (let k = 0; k < 4; k++) pset(83 - k * 2, 50 - k * 3, S.metalD); disco(79, 42, 1.5, S.metalD);
  poligono([[70, 33], [80, 36], [83, 45], [71, 44]], K); poligono([[71, 34], [79, 37], [81, 44], [72, 43]], S.lamp); linea(71, 34, 79, 37, S.lampL); linea(72, 43, 81, 44, b_mezcla(S.lamp, K, 0.4));
  rect(73, 44, 81, 45, dia ? hex('#e8e0c0') : hex('#fff4c8')); pset(77, 45, C.blanco);
  // la ventana desenfocada arriba a la derecha (las estrellas o la nube van aparte) con su travesaño
  for (let y = 8; y < 49; y++) for (let x = 232; x < 273; x++) { const e = Math.min(x - 232, 272 - x, y - 8, 48 - y); if (e > 2 || (x + y) % 2) pset(x, y, e < 3 ? b_mezcla(S.metalL, pa, 0.4) : dia ? b_mezcla(hex('#6eb2ea'), hex('#9acef2'), (y - 8) / 40) : b_mezcla(hex('#0e1428'), hex('#24305a'), (y - 8) / 40)); }
  for (let x = 233; x < 272; x++) if (x % 2) pset(x, 28, b_mezcla(S.metalL, pa, 0.3));
  for (let x = 230; x < 275; x++) pset(x, 49, b_mezcla(pa, C.blanco, 0.2)); for (let x = 230; x < 275; x++) pset(x, 50, b_mezcla(pa, K, 0.2));
  // el corcho con sus hojas clavadas (desenfocado) y el reloj de pared redondo entre el soporte y el corcho
  for (let y = 54; y < 102; y++) for (let x = 248; x < 304; x++) { const e = Math.min(x - 248, 304 - x, y - 54, 102 - y); if (e > 3 || (x + y) % 2) pset(x, y, e < 4 ? b_mezcla(S.marco, pa, 0.4) : h(x >> 1, y >> 1, 47) > 0.7 ? S.corchoS : S.corcho); }
  for (const [x, y, w, hh] of [[256, 60, 18, 20], [280, 64, 16, 22], [262, 84, 22, 12]]) for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) if (Math.min(i, w - i, j, hh - j) > 1 || (i + j) % 2) pset(x + i, y + j, j % 3 === 2 && i > 2 && i < w - 3 ? b_mezcla(S.hoja, S.hojaS, 0.5) : S.hoja);
  for (const [x, y, c] of [[264, 61, S.luzR], [288, 65, hex('#e0b03a')], [272, 85, S.azulL]]) { disco(x, y, 1.2, c); pset(x - 1, y - 1, C.blanco); }
  disco(241, 68, 6, K); disco(241, 68, 5, hex('#e8e4d8')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(241 + Math.sin(a) * 4), Math.round(68 - Math.cos(a) * 4), k % 3 ? S.hojaS : K); }
  for (let y = 75; y <= 76; y++) for (let x = 237; x <= 246; x++) if ((x + y) % 2) pset(x, y, b_mezcla(pa, K, 0.25));
  // la papelera de rejilla abajo a la derecha con una bola de papel, y el cable de la impresora que baja al enchufe
  rect(300, 160, 309, 167, K); rect(301, 161, 308, 166, S.grisL); rect(303, 162, 303, 164, K); rect(306, 162, 306, 164, K);
  for (let y = 124; y < 150; y++) pset(Math.round(280 + (y - 124) * 0.15 + Math.sin(y * 0.2) * 1.2), y, K); linea(284, 150, 300, 163, K); linea(284, 151, 300, 164, b_mezcla(K, pa, 0.5));
  poligono([[286, 152], [316, 152], [312, 180], [290, 180]], K); poligono([[287, 153], [315, 153], [311, 180], [291, 180]], S.metalS);
  for (let y = 155; y < 180; y += 3) for (let x = 288; x < 315; x++) if ((x + (y >> 1)) % 3 === 0) pset(x, y, S.metalD);
  for (let x = 288; x < 315; x += 4) linea(x, 154, x + Math.round((x - 301) * -0.1), 180, S.metalD); rect(286, 152, 316, 153, S.metalL);
  disco(298, 150, 5, b_SP.papelD); disco(297, 149, 4, C.papel); linea(294, 148, 300, 151, C.papelS); linea(296, 146, 299, 150, C.papelS); disco(306, 152, 3, b_SP.papelD); pset(305, 150, C.papel);
  // la barra guía del papel con sus dos soportes que bajan a la impresora
  for (const x of [86, 228]) { rect(x, 16, x + 5, 110, K); rect(x + 1, 16, x + 4, 110, S.metalS); rect(x + 1, 16, x + 1, 110, S.metalL); rect(x + 4, 16, x + 4, 110, S.metalD); for (let y = 40; y < 108; y += 34) { rect(x, y, x + 5, y + 2, K); rect(x + 1, y + 1, x + 4, y + 1, S.metal); } }
  rect(84, 14, 235, 20, K); rect(85, 15, 234, 19, S.metal); rect(85, 15, 234, 15, S.metalL); rect(85, 19, 234, 19, S.metalD); for (const x of [88, 231]) { disco(x, 17, 2, S.metalD); pset(x - 1, 16, S.metalL); }
  // la impresora: el interior bajo el cristal con el rodillo, el frontal con la franja, tornillos, la placa, las
  // rejillas, el contador, la botonera y la palanca de la izquierda
  rect(40, 106, 280, 180, K);
  poligono([[62, 112], [258, 112], [264, 133], [56, 133]], hex('#20242c'));
  rect(60, 114, 260, 116, hex('#14161c')); rect(60, 128, 260, 131, hex('#2a2e38')); for (let x = 62; x < 258; x += 5) pset(x, 129, hex('#3a3e4a'));
  rect(42, 134, 278, 180, S.gris); rect(42, 134, 278, 138, S.azul); rect(42, 134, 278, 134, S.azulL); rect(42, 138, 278, 138, S.azulS); rect(42, 139, 278, 139, S.grisL);
  rect(270, 140, 278, 180, S.grisS); rect(42, 140, 44, 180, S.grisL);
  for (let y = 141; y < 180; y++) for (let x = 45; x < 270; x++) if (h(x, y, 65) > 0.985) pset(x, y, S.grisS); else if (h(x, y, 66) > 0.992) pset(x, y, S.grisL);
  for (let y = 148; y < 174; y += 3) { rect(60, y, 190, y, S.grisD); rect(60, y + 1, 190, y + 1, S.grisL); } rect(58, 146, 192, 146, S.grisS); rect(58, 175, 192, 175, S.grisL);
  for (const [x, y] of [[48, 142], [266, 142], [48, 176], [266, 176], [196, 142], [196, 176]]) { disco(x, y, 1.5, S.grisD); pset(x, y - 1, S.grisL); pset(x - 1, y, S.grisS); }
  rect(110, 140, 150, 144, S.grisD); rect(111, 141, 149, 143, S.metalL); rect(113, 142, 120, 142, S.azul); rect(123, 142, 147, 142, S.metalS);
  rect(204, 144, 262, 172, K); rect(205, 145, 261, 171, hex('#24262e')); rect(205, 145, 261, 145, hex('#3a3c46'));
  rect(208, 148, 230, 158, K); rect(209, 149, 229, 157, hex('#0a140c'));
  for (const [x, c] of [[214, hex('#3aa05a')], [226, C.blanco], [238, hex('#e0b03a')]]) { rect(x - 3, 162, x + 3, 168, K); rect(x - 2, 163, x + 2, 167, c); rect(x - 2, 163, x + 2, 163, b_mezcla(c, C.blanco, 0.4)); rect(x - 2, 167, x + 2, 167, b_mezcla(c, K, 0.3)); }
  for (const x of [236, 244]) { rect(x, 150, x + 4, 152, hex('#3a3c46')); pset(x + 2, 151, hex('#6a6c76')); }
  disco(252, 165, 4, K);
  rect(46, 150, 52, 170, K); rect(47, 151, 51, 169, S.grisS); rect(45, 156, 53, 159, S.azul); rect(45, 156, 53, 156, S.azulL);
  // encima de la impresora: el montón de listados plegados con un lápiz, a la izquierda, y la taza a la derecha
  for (let k = 0; k < 6; k++) { const y = 103 - k * 2, x = 44 + (k % 2); rect(x, y - 1, x + 38, y, k % 2 ? C.banda : C.papel); pset(x, y, C.papelS); pset(x + 38, y - 1, C.papelS); for (let i = 3; i < 36; i += 6) pset(x + i, y - 1, C.papelS); }
  linea(52, 91, 72, 88, K); linea(52, 90, 71, 87, hex('#e0b03a')); pset(72, 88, hex('#f0c8a0')); pset(51, 91, hex('#e88a8a'));
  rect(240, 93, 250, 104, K); rect(241, 94, 249, 103, S.taza); rect(241, 94, 249, 94, C.blanco); rect(248, 95, 249, 103, b_mezcla(S.taza, K, 0.25)); rect(242, 95, 248, 95, S.cafe);
  R.anillo(252, 98, 2, K); pset(252, 98, pa); rect(243, 98, 246, 99, S.luzR);
}
// la cubierta de la impresora de cerca, por delante del papel: el borde de arriba a los dos lados de la ranura (con sus
// tornillos y el canto gastado), la sombra que echa la ranura sobre el papel y los laterales de la tapa de cristal
function b_impresoraTapa(R, t) {
  const { rect, poligono, linea, pset } = R, S = b_S, K = C.k;
  // el borde de arriba, a los dos lados del papel (el papel sale por su ranura y pasa por delante)
  for (const [a, b] of [[40, 98], [222, 280]]) { rect(a, 104, b, 106, K); rect(a, 107, b, 111, S.azul); rect(a, 107, b, 107, S.azulL); rect(a, 111, b, 111, S.azulS);
    for (let x = a + 3; x < b - 2; x += 7) if (h(x, 1, 67) > 0.6) pset(x, 108, b_mezcla(S.azul, S.azulL, 0.6)); for (const x of [a + 5, b - 5]) { pset(x, 109, S.azulS); pset(x, 108, S.azulL); } }
  for (let x = 100; x <= 220; x++) { pset(x, 111, b_mezcla(R.pget(x, 111), K, 0.45)); pset(x, 112, b_mezcla(R.pget(x, 112), K, 0.2)); } rect(99, 104, 99, 112, K); rect(221, 104, 221, 112, K);
  poligono([[40, 111], [62, 111], [56, 134], [40, 134]], S.azul); poligono([[258, 111], [280, 111], [280, 134], [264, 134]], S.azulS);
  linea(41, 112, 58, 112, S.azulL); linea(61, 112, 56, 132, b_mezcla(S.azul, S.azulL, 0.5)); for (const y of [118, 127]) { pset(46, y, S.azulS); pset(272, y, K); }
  linea(62, 111, 56, 133, K); linea(258, 111, 264, 133, K); rect(40, 133, 280, 133, K);
}
// LA BOCA DE LA IMPRESORA de cerca (cámara 'impresora' de sala()): el fondo fijo de b_impresoraFondo, y en cada
// fotograma las bobinas que giran a tirones y las luces del armario, la ventana (estrellas o nube), el segundero del
// reloj, el vapor de la taza, la hoja de arriba del montón que tiembla, y EL PAPEL: el listado del canon (piezaListado,
// s 2, x 100–220, de la barra guía en y 20 a la ranura) que sube renglón a renglón (12 px) mientras el CABEZAL lo va
// imprimiendo de izquierda a derecha: lo que aún no ha pasado el cabezal y los renglones de debajo quedan en blanco. La
// secuencia 6EQUJ5 sale en la columna o.col (con las de al lado en blanco) desde la línea s0 (o.linea > 0,5 o o.seqT).
// Opciones (las de sala): o.luz, o.linea 0–1, o.velocidad, o.seqT, o.col. Devuelve en geo: papel, linea, cabezal,
// secuencia (el centro de la «U» impresa y a la vista, o null)
function b_salaImpresora(R, t, o, geo) {
  const { rect, pset, linea, disco } = R, dia = o.luz === 'dia', S = b_S, K = C.k;
  b_fijo(R, dia ? 'wo-impresora-dia-37' : 'wo-impresora-noche-37', () => b_impresoraFondo(R, dia));
  // las bobinas desenfocadas del armario de fondo, que giran a tirones, y sus luces
  { const a = t * 1.2 + Math.sin(t * 0.8) * 2.4;
    for (const [cx, cy, r, dir] of [[19, 50, 11, 1], [41, 66, 7, -1]]) { disco(cx, cy, r + 1, b_mezcla(hex('#4a5060'), S.cristal, 0.3)); disco(cx, cy, r, b_mezcla(S.cinta, S.cristal, 0.3)); disco(cx, cy, r * 0.6, b_mezcla(S.cintaL, S.cristal, 0.3)); disco(cx, cy, 2.5, b_mezcla(S.metalL, S.cristal, 0.3));
      for (let k = 0; k < 3; k++) { const b = dir * a + k * 2.09; linea(cx + Math.cos(b) * 2.5, cy + Math.sin(b) * 2.5, cx + Math.cos(b) * r * 0.55, cy + Math.sin(b) * r * 0.55, b_mezcla(S.metalD, S.cristal, 0.3)); } }
    linea(8, 52, 34, 70, b_mezcla(S.cinta, S.cristal, 0.4));
    for (let k = 0; k < 6; k++) { const on = h(k, Math.floor(t * 2.5 + k * 0.4), 7) > 0.4; if (on) disco(10 + k * 7, 86 + (k % 2) * 4, 1.4, b_mezcla([C.blanco, S.luzR, C.blanco, S.luzV, C.blanco, hex('#e0b03a')][k], S.gris, 0.3)); }
    for (let k = 0; k < 4; k++) { const v = (Math.sin(t * (1.7 + k * 0.6) + k) + 1) / 2; rect(10 + k * 10, 100, 10 + k * 10 + Math.round(v * 6), 101, b_mezcla(S.luzV, S.gris, 0.35)); } }
  // la ventana desenfocada arriba a la derecha (de noche, estrellas que titilan; de día, una nube que pasa)
  R.recorte([234, 10, 270, 46]);
  if (!dia) { for (let k = 0; k < 10; k++) { const b = Math.sin(t * (1.2 + k * 0.3) + k); if (b > 0) { const x = 236 + h(k, 1, 13) * 32, y = 12 + h(k, 2, 13) * 30; disco(x, y, 1 + b * 0.6, b_mezcla(hex('#9aa8d0'), hex('#141c34'), 0.4)); } } }
  else { const x = 230 + ((t * 2) % 50); disco(x, 26, 6, hex('#e8eef6')); disco(x + 5, 24, 5, C.blanco); }
  R.recorte(null);
  // el reloj de pared: el minutero quieto y el segundero que salta cada segundo
  { const sg = Math.floor(t) / 60 * Math.PI * 2; linea(241, 68, 241 + Math.round(Math.sin(1.1) * 3), 68 - Math.round(Math.cos(1.1) * 3), K); linea(241, 68, 241, 64, K);
    linea(241, 68, Math.round(241 + Math.sin(sg) * 4), Math.round(68 - Math.cos(sg) * 4), S.luzR); pset(241, 68, S.metalD); }
  // el vapor de la taza y la hoja de arriba del montón, que tiembla con la impresora
  for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1, x = Math.round(245 + Math.sin(u * 6 + k * 1.3) * 2), y = Math.round(92 - u * 16); if (y > 76) pset(x, y, b_mezcla(C.blanco, b_PN.pared, 0.3 + u * 0.6)); }
  { const q = Math.round(Math.sin(t * 13) * 0.6 + Math.sin(t * 2.1)); linea(45, 92 + q, 82, 93, C.papel); pset(83, 93, C.papelS); }
  // el papel: la línea que se imprime (n), lo que ha corrido el cabezal (f), la línea en que empieza la secuencia (s0)
  const vel = o.velocidad ?? 0.9, pos = o.linea != null ? 4 + Math.max(0, Math.min(1, o.linea)) * 16 : t * vel;
  const s0 = o.linea != null ? (o.linea > 0.5 ? 13 : null) : o.seqT != null ? Math.floor(o.seqT * vel) : null;
  const n = Math.floor(pos), f = pos - n, adv = R.tramo(f, 0.78, 1), col = o.col ?? 1;
  const headX = f < 0.78 ? 112 + Math.min(1, f / 0.72) * 100 : lerp(212, 112, adv);
  // el listado del canon: s 2, de x 100 a 220, de la barra (y 20) a la ranura (y 127); el renglón que se imprime tiene
  // su parte de arriba en y 118 (el cabezal le tapa la de abajo) y sube 12 px al correr el papel; K0 renglones de
  // ventaja para que el papel esté lleno desde el principio
  const K0 = 10, PY = 20, YP = 118, ph = 12, d = (n + K0 + adv) * ph + PY + 4 - YP;
  const gy = (r) => PY - d + 4 + r * ph;
  const L = piezaListado(R, 100, PY, { s: 2, w: 121, hh: 108, desplaza: d, margen: 3, col, linea: s0 != null ? s0 + K0 : 1e6, recorte: [100, PY, 220, 127], sombra: false,
    calido: dia ? 0 : 0.3, agujero: hex('#1c1e26') });
  // lo que aún no se ha impreso: los renglones de debajo y, en el que se imprime, lo que no ha pasado el cabezal
  { const lum = (c) => (c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255), y0 = gy(n + K0);
    for (let y = Math.max(PY, y0); y <= 127; y++) {
      const a = R.pget(114, y), b = R.pget(115, y), ref = a === b ? a : R.pget(116, y), xa = y < y0 + ph && f < 0.78 ? Math.max(116, Math.floor(headX) - 1) : 116;
      for (let x = xa; x <= 208; x++) if (lum(R.pget(x, y)) < 420) pset(x, y, ref); } }
  // la sombra de la barra guía arriba, donde el papel se dobla hacia atrás
  for (let x = 100; x <= 220; x++) { pset(x, 20, b_mezcla(R.pget(x, 20), K, 0.35)); if (x % 2) pset(x, 21, b_mezcla(R.pget(x, 21), K, 0.15)); }
  // el cono de luz del flexo (de día, de la ventana) sobre el papel, con el polvo que flota
  { const lc = dia ? C.blanco : hex('#ffd890');
    for (let y = 22; y < 128; y++) { const xa = 58 + (y - 22) * 0.85, xb = xa + 80; for (let x = Math.max(101, Math.round(xa)); x < Math.min(220, xb); x++) if ((x + y) % 3 === 0 && (x * 7 + y * 3) % 5 < 2) pset(x, y, b_mezcla(R.pget(x, y), lc, 0.22)); }
    b_motas(R, t, 22, [70, 24, 230, 126], 1, dia); }
  // la cubierta por delante del papel; la cinta entintada que corre, el cabezal, y el cristal con su reflejo
  b_impresoraTapa(R, t);
  rect(66, 126, 254, 128, hex('#2a2236')); for (let x = 66 + Math.floor(t * 9) % 6; x < 254; x += 6) pset(x, 127, hex('#4a3a5a'));
  { const hx = Math.round(headX), tr = f < 0.78 ? Math.round(Math.sin(t * 60)) : 0; rect(hx - 7, 123 + tr, hx + 7, 131, K); rect(hx - 6, 124 + tr, hx + 6, 130, S.metal); rect(hx - 6, 124 + tr, hx + 6, 124 + tr, S.metalL); rect(hx - 2, 126, hx + 2, 128, S.metalD); rect(hx + 5, 125, hx + 6, 130, S.metalS);
    if (f < 0.78 && Math.sin(t * 40) > 0.3) { pset(hx - 8, 121, hex('#ffe6a8')); pset(hx - 9, 122, b_mezcla(hex('#ffe6a8'), K, 0.4)); }
    rect(60, 130, 260, 131, S.metalD); linea(60, 129, 260, 129, b_mezcla(S.metalD, S.metalL, 0.4)); }
  for (let y = 112; y <= 132; y++) for (let x = 60; x <= 260; x++) if ((x + y) % 2 === 0 && ((x - (132 - y) * 0.8 + 400) % 70) < 7) pset(x, y, b_mezcla(R.pget(x, y), C.blanco, 0.3));
  // el contador de líneas (cifras verdes) y el piloto rojo, encendido, con su brillo
  b_cifras(R, 1000 + ((n % 900) + 900) % 900, 211, 151, S.luzV);
  { const on = Math.sin(t * 2.2) > -0.7; disco(252, 165, 3, on ? S.luzR : hex('#7a2a2a')); if (on) { pset(251, 163, hex('#ffc0b0')); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; if ((k + Math.floor(t * 4)) % 2) pset(Math.round(252 + Math.cos(a) * 5), Math.round(165 + Math.sin(a) * 5), hex('#a03a30')); } } }
  for (const [x, on] of [[236, Math.floor(t * 3) % 2], [244, h(Math.floor(t * 5), 2, 68) > 0.5]]) if (on) rect(x + 1, 151, x + 3, 151, S.luzV);
  const cx = L.seq[0];
  geo.papel = [100, PY, 220, 128];
  geo.linea = [cx, Math.round(gy(n + K0) + 5)];
  geo.cabezal = [Math.round(headX), 127];
  geo.secuencia = s0 != null && n >= s0 + 3 && gy(s0 + 3 + K0) > PY ? [cx, Math.round(gy(s0 + 3 + K0) + 5)] : null;
  return geo;
}
// los caracteres de impresora del listado, de 3×5 (las cifras y las cuatro letras de la secuencia: no hay más letras)
const c_GLIFO = {
  0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'],
  E: ['###', '#..', '##.', '#..', '###'], Q: ['.#.', '#.#', '#.#', '##.', '.##'], U: ['#.#', '#.#', '#.#', '#.#', '###'], J: ['..#', '..#', '..#', '#.#', '.#.'],
};

// lo que imprime cada canal en cada renglón: casi todo «1» o nada, algún 2, 3 o 4 (siempre lo mismo en el mismo sitio)
const c_car = (c, f) => { const v = h(c * 1.37 + 0.5, f * 0.71 + 0.25, 41); return v < 0.5 ? '' : v < 0.9 ? '1' : v < 0.96 ? '2' : v < 0.985 ? '3' : '4'; };

// mezcla de dos colores (k = 0: el primero; 1: el segundo)
const c_mez = (a, b, k) => { const f = (s) => Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (0xff000000 | f(0) | f(8) | f(16)) >>> 0; };

// el «Wow!» a mano en una caja de 22 × 10 (W, o, w, el palo y el punto de la exclamación), cada trazo una polilínea
const c_WOW = [
  [[0.2, 1.4], [1.0, 5.4], [1.7, 9.0], [2.7, 6.0], [3.7, 3.2], [4.6, 6.2], [5.5, 9.0], [6.6, 4.8], [7.8, 0.8]],
  [[11.4, 4.6], [10.0, 4.9], [9.3, 6.6], [9.7, 8.7], [11.0, 9.2], [12.2, 8.2], [12.5, 6.2], [11.9, 4.8], [10.9, 4.5]],
  [[13.7, 4.3], [14.2, 6.8], [14.7, 9.0], [15.6, 7.0], [16.2, 5.6], [16.9, 7.4], [17.6, 9.0], [18.4, 6.4], [18.9, 3.9]],
  [[21.4, 0.2], [21.0, 3.4], [20.6, 6.4]],
  [[20.3, 8.7], [20.4, 9.5]],
];

// trazos a mano (polilíneas) que se dibujan hasta la fracción u de su largo total, con grosor tk y la tinta con algo de
// textura (más oscura donde aprieta); P es el pset recortado de quien llama. Devuelve la punta [x, y]
function c_trazos(P, trazos, u, tk, [c, cS, cL], k) {
  let L = 0; for (const tr of trazos) for (let i = 1; i < tr.length; i++) L += Math.hypot(tr[i][0] - tr[i - 1][0], tr[i][1] - tr[i - 1][1]);
  let queda = u * L, punta = trazos[0][0];
  if (u <= 0) return punta;
  for (const tr of trazos) for (let i = 1; i < tr.length && queda > 0; i++) {
    const [ax, ay] = tr[i - 1], [bx, by] = tr[i], l = Math.hypot(bx - ax, by - ay), f = Math.min(1, queda / l); queda -= l;
    for (let m = 0; m <= l * f; m += 0.35) { const px = ax + (bx - ax) * m / l, py = ay + (by - ay) * m / l, x0 = Math.round(px - (tk - 1) / 2), y0 = Math.round(py - (tk - 1) / 2);
      for (let b = 0; b < tk; b++) for (let a = 0; a < tk; a++) { const r = h(x0 + a, y0 + b, k); P(x0 + a, y0 + b, r < 0.22 ? cS : tk > 1 && r > 0.93 ? cL : c); } }
    punta = [ax + (bx - ax) * f, ay + (by - ay) * f];
  }
  return punta;
}

// los búferes de lo fijo, por lienzo y por clave (encuadre, cámara y luz); el color VACIO marca lo transparente
const c_CACHE = new WeakMap(), c_VACIO = 0x01020304;

function c_fijo(R, clave, dibuja, capa = false) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); if (capa) b.fill(c_VACIO); dibuja(b); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// copia una capa con huecos (VACIO) sobre la pantalla, solo dentro de la caja [x0, y0, x1, y1]
function c_pegaCapa(R, b, [x0, y0, x1, y1]) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = b[y * 320 + x]; if (c !== c_VACIO) R.pset(x, y, c); } }

// la luz de la noche sobre un búfer entero, una sola vez: penumbra azulada y la lámpara ámbar en (lx, ly) con alcance r;
// de día, solo un poco de luz de la ventana arriba a la izquierda
function c_alumbra(b, dia, lx, ly, r, amb = 0.4) {
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = b[i]; if (c === c_VACIO) continue;
    let fr, fg, fb; if (dia) { const k = 1.04 - 0.1 * (x + y) / 500; fr = fg = k; fb = k * 1.01; }
    else { const l = Math.exp(-(((x - lx) ** 2 + ((y - ly) * 1.25) ** 2) / (r * r))), n = (h(x, y, 50) - 0.5) * 0.04; fr = amb + 0.7 * l + n; fg = amb + 0.06 + 0.58 * l + n; fb = amb + 0.2 + 0.34 * l + n; }
    const R0 = Math.min(255, (c & 255) * fr), G0 = Math.min(255, ((c >>> 8) & 255) * fg), B0 = Math.min(255, ((c >>> 16) & 255) * fb);
    b[i] = (0xff000000 | (Math.round(B0) << 16) | (Math.round(G0) << 8) | Math.round(R0)) >>> 0; }
}

// aclara (o tiñe) un píxel de la pantalla hacia col en la proporción a
const c_tine = (R, x, y, col, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c_mez(R.pget(x, y), col, a)); };

// la formica de la mesa vista desde arriba (amarillo pálido con motas doradas, grises y blancas y algún «bumerán»)
function c_formica(R, x0, y0, x1, y1, k = 0) {
  const F = [hex('#ecdca8'), hex('#e4d29a'), hex('#d4b45a'), hex('#b8ac94'), hex('#fff6d8'), hex('#c89a3a')];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, 60 + k); R.pset(x, y, n < 0.035 ? F[2] : n < 0.06 ? F[3] : n < 0.085 ? F[4] : h(x >> 2, y >> 2, 61 + k) < 0.3 ? F[1] : F[0]); }
  for (let i = 0; i < Math.round((x1 - x0) * (y1 - y0) / 700); i++) { const bx = x0 + Math.round(h(i, 1, 62 + k) * (x1 - x0)), by = y0 + Math.round(h(i, 2, 62 + k) * (y1 - y0)), a = h(i, 3, 62 + k) * 6.28, c = i % 3 ? F[2] : F[5];
    for (let m = -3; m <= 3; m++) { const q = Math.abs(m) / 3; R.pset(Math.round(bx + Math.cos(a) * m * 1.3), Math.round(by + Math.sin(a) * m * 1.3 + q * q * 2), c); } }
}

// una sombra suave (oscurece en elipse) sobre la pantalla
function c_sombra(R, cx, cy, rx, ry, a = 0.3) { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const q = (i / rx) ** 2 + (j / ry) ** 2; if (q < 1) c_tine(R, Math.round(cx + i), Math.round(cy + j), C.k, a * (1 - q * 0.6)); } }

// el vapor de una taza: tres hilos que suben ondulando y se deshacen (t mueve)
function c_vapor(R, x, y, t, alto = 16, k = 0) {
  for (let v = 0; v < 3; v++) for (let j = 0; j < alto; j++) { const f = (j + (t * 9 + v * 5 + k) % alto) % alto, px = Math.round(x + (v - 1) * 3 + Math.sin(t * 2.2 + j * 0.35 + v * 2 + k) * (1 + j * 0.12)), py = y - f;
    if (h(v, j, 63 + Math.floor(t * 4)) < 0.75 - f / alto * 0.5) c_tine(R, px, py, hex('#ffffff'), 0.45 - f / alto * 0.35); }
}

// un útil de escribir tumbado o en la mano, desde la punta (x, y) hacia el ángulo ang, largo L: 'lapiz' (amarillo, de
// madera, con la goma rosa; roto: la punta astillada sin mina), 'azul' y 'rojo' (bolígrafos de cuerpo blanco y capuchón
// de su color); o.sombra: su sombra en la mesa; o.desde: pinta solo desde esa fracción del largo
function c_util(R, x, y, ang, L, tipo, o = {}) {
  const ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux, lap = tipo === 'lapiz';
  const tinta = tipo === 'rojo' ? [hex('#e04a3a'), C.rojo, hex('#8a1414')] : [hex('#5a8ae8'), hex('#2a5ac8'), hex('#183a8a')];
  const parte = (i) => { const f = i / L;
    if (lap) { if (f < 0.1) return o.roto ? [hex('#e8c89a'), hex('#c89a64'), hex('#8a6a44')] : [hex('#6a6a72'), hex('#3a3a44'), hex('#2a2a30')]; if (f < 0.22) return [hex('#f0d8aa'), hex('#d8b47a'), hex('#a88050')];
      if (f < 0.86) return [hex('#ffe070'), hex('#f0b830'), hex('#b07c10')]; if (f < 0.92) return [hex('#e0e4ea'), hex('#a8aeb8'), hex('#6a707a')]; return [hex('#f8a8b0'), hex('#e07a88'), hex('#a04a58')]; }
    if (f < 0.07) return [hex('#e8eaee'), hex('#a8aeb8'), hex('#5a606a')]; if (f < 0.2) return [hex('#f4f4f0'), hex('#d8d8d0'), hex('#9a9a94')];
    if (f < 0.7) return [hex('#fbfbf6'), hex('#e6e6de'), hex('#a8a8a0')]; return tinta; };
  if (o.sombra) for (let i = 0; i <= L; i++) for (let s = -1; s <= 1; s++) c_tine(R, Math.round(x + ux * i + nx * s + 2), Math.round(y + uy * i + ny * s + 2), C.k, 0.25);
  const i0 = Math.round((o.desde ?? 0) * L);
  for (let i = i0; i <= L; i++) { const w = i / L < 0.12 ? (i / L < 0.05 ? 0 : 1) : lap && o.roto && i / L < 0.14 ? 1 : 1.5;
    for (let s = -w - 1; s <= w + 1; s += 0.5) R.pset(Math.round(x + ux * i + nx * s), Math.round(y + uy * i + ny * s), C.k); }
  for (let i = i0; i <= L; i++) { const w = i / L < 0.12 ? 0 : 1, [cl, cm, cs] = parte(i);
    for (let s = -w; s <= w; s += 0.5) R.pset(Math.round(x + ux * i + nx * s), Math.round(y + uy * i + ny * s), s < -0.4 ? cl : s > 0.4 ? cs : cm);
    if (lap && i / L > 0.22 && i / L < 0.86 && i % 4 === 0) R.pset(Math.round(x + ux * i), Math.round(y + uy * i), hex('#e0a020')); }
  if (lap && o.roto) for (const [a, b] of [[1, -1], [2, 1], [0, 1]]) R.pset(Math.round(x + ux * a + nx * b), Math.round(y + uy * a + ny * b), hex('#c89a64'));
  if (!lap && i0 === 0) { R.pset(Math.round(x + ux * 0.7 * L + nx * 2), Math.round(y + uy * 0.7 * L + ny * 2), tinta[1]); R.pset(Math.round(x + ux * 0.75 * L + nx * 2), Math.round(y + uy * 0.75 * L + ny * 2), tinta[1]); }   // la pinza del capuchón
}

// una polilla pequeña (alas que baten) en (x, y)
function c_polilla(R, x, y, t) { const a = Math.sin(t * 38) > 0; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, hex('#5a4a3a')); R.pset(x, y + 1, hex('#5a4a3a')); const c = hex('#c8b898');
  if (a) { R.pset(x - 1, y - 1, c); R.pset(x - 2, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x + 2, y - 1, c); } else { R.pset(x - 1, y, c); R.pset(x - 2, y + 1, c); R.pset(x + 1, y, c); R.pset(x + 2, y + 1, c); } }

function c_cocina(R, t, o) {
  const dia = o.luz === 'dia', { rect, pset, disco, linea, poligono } = R;
  R.copiar(c_fijo(R, 'cocina.' + (dia ? 'dia' : 'noche'), (b) => { c_cocinaFija(R, dia); c_alumbra(b, dia, 196, 140, 84, 0.27); }));
  // la ventana: el cielo y la calle de fuera, recortados al cristal
  const V = [104, 28, 146, 72]; R.recorte(V);
  if (dia) { for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) { const p = (y - V[1]) / 44; pset(x, y, h(x, y, 64) < p * 0.8 - 0.1 ? hex('#a8d0f0') : p > 0.55 && ((x + y) & 1) ? hex('#a8d0f0') : hex('#7ab4e8')); }
    for (const [v, y0, w0, k] of [[1.1, 34, 14, 0], [2.0, 42, 10, 1], [3.2, 37, 8, 2]]) { const cx = V[0] + ((h(k, 1, 65) * 80 + t * v) % 70) - 12; c_nubeV(R, cx, y0, w0); }
    for (let k = 0; k < 2; k++) { const bx = Math.round(V[0] + ((t * (6 + k * 3) + k * 30) % 60) - 8), by = 40 + k * 6 + Math.round(Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k) > 0;
      pset(bx, by, hex('#3a3a44')); pset(bx - 1, by - (a ? 1 : 0), hex('#3a3a44')); pset(bx + 1, by - (a ? 1 : 0), hex('#3a3a44')); } }
  else { for (let y = V[1]; y <= V[3]; y++) for (let x = V[0]; x <= V[2]; x++) { const p = (y - V[1]) / 44; pset(x, y, h(x, y, 64) < p - 0.25 ? hex('#26305a') : p > 0.6 && ((x + y) & 1) ? hex('#26305a') : hex('#121a38')); }
    for (let k = 0; k < 16; k++) { const sx = V[0] + Math.round(h(k, 1, 66) * 42), sy = V[1] + 1 + Math.round(h(k, 2, 66) * 24), tw = Math.sin(t * (1.4 + h(k, 3, 66) * 2.5) + k * 1.7); if (tw > -0.3) pset(sx, sy, tw > 0.6 ? hex('#ffffff') : hex('#8a9ac8')); }
    for (let y = 31; y <= 39; y++) for (let x = 130; x <= 140; x++) { const d1 = Math.hypot(x - 135, y - 35), d2 = Math.hypot(x - 137.4, y - 34); if (d1 <= 4.2 && d2 > 3.6) pset(x, y, d1 > 3.4 ? hex('#c8c0a0') : hex('#f4ecd0')); } }
  // el bosquecillo y la casa del vecino al fondo; el poste con los cables; la calle con el coche que pasa
  const silueta = dia ? hex('#4a7a4a') : hex('#0c1428'), casa = dia ? hex('#c8a882') : hex('#141a2c');
  for (let x = V[0]; x <= V[2]; x++) { const yy = Math.round(58 - 3 * Math.sin(x * 0.21) - 2 * Math.sin(x * 0.53 + 1) - (h(x >> 1, 0, 67) * 2)); linea(x, yy, x, 64, silueta); }
  poligono([[112, 56], [120, 50], [128, 56]], dia ? hex('#8a4a3a') : hex('#1a1424')); rect(113, 56, 127, 64, casa);
  const luzVecino = dia || h(Math.floor(t / 3.5), 0, 68) < 0.7; R.pset(117, 59, luzVecino && !dia ? hex('#f0c060') : dia ? hex('#6a8aa8') : hex('#1e2440')); pset(118, 59, luzVecino && !dia ? hex('#f0c060') : dia ? hex('#6a8aa8') : hex('#1e2440'));
  pset(117, 60, luzVecino && !dia ? hex('#d8a040') : dia ? hex('#5a7a98') : hex('#1e2440')); pset(118, 60, luzVecino && !dia ? hex('#d8a040') : dia ? hex('#5a7a98') : hex('#1e2440'));
  linea(140, 40, 140, 66, dia ? hex('#6a5038') : hex('#0a0e1a')); linea(137, 43, 143, 43, dia ? hex('#6a5038') : hex('#0a0e1a'));
  for (let x = V[0]; x <= V[2]; x++) { const yy = Math.round(44 + ((x - 122) / 20) ** 2 * 1.5); if (x < 140) pset(x, yy, dia ? hex('#3a3a3a') : hex('#3a4268')); }
  rect(V[0], 65, V[2], 72, dia ? hex('#7a7a74') : hex('#0e121e')); for (let x = V[0] + 2; x < V[2]; x += 8) pset(x, 68, dia ? hex('#e8d890') : hex('#3a3a3a'));
  { const u = (t % 9) / 9, cx = Math.round(lerp(V[2] + 14, V[0] - 14, u));
    const rr = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, c); };   // R.rect no respeta el recorte
    if (dia) { rr(cx - 6, 65, cx + 6, 68, hex('#a83a2a')); rr(cx - 3, 63, cx + 3, 65, hex('#a83a2a')); pset(cx - 4, 69, C.k); pset(cx + 4, 69, C.k); }
    else { rr(cx - 6, 66, cx + 6, 68, hex('#0a0c14')); pset(cx - 6, 67, hex('#fff0b0')); for (let k = 1; k < 9; k++) if (((cx - 6 - k) + 67) % 2 === 0 || k < 4) c_tine(R, cx - 6 - k, 67, hex('#fff0b0'), 0.6 - k * 0.06); pset(cx + 6, 67, hex('#c82020')); } }
  R.recorte(null);
  // los visillos de cuadros (se mecen un poco), su barra y la galería
  const vis = (x0, x1, y0, y1, dx) => { for (let y = y0; y <= y1; y++) { const m = Math.round(Math.sin(t * 1.1 + y * 0.2) * 0.6 * (y - y0) / (y1 - y0 + 1)) * dx;
    for (let x = x0; x <= x1; x++) { const q = (((x + m) >> 1) + (y >> 1)) & 1, c = q ? hex('#e88a4a') : hex('#f4e4c8'); pset(x + m, y, ((x + m) >> 1 & 1) && (y >> 1 & 1) ? hex('#c8682a') : c); } pset((dx < 0 ? x1 : x0) + m, y, hex('#a8582a')); } };
  vis(104, 115, 52, 72, -1); vis(135, 146, 52, 72, 1); vis(102, 148, 24, 31, 0);
  for (let x = 102; x <= 148; x += 3) pset(x, 32, hex('#a8582a'));
  // el grifo que gotea en el fregadero
  { const u = (t % 2.3) / 2.3; if (u < 0.15) pset(126, 86, hex('#a8d0f0')); else if (u < 0.4) { const yy = Math.round(86 + (u - 0.15) * 26); pset(126, yy, hex('#c8e8ff')); pset(126, yy - 1, hex('#7aa8d0')); } else if (u < 0.5) { pset(124, 92, hex('#c8e8ff')); pset(128, 92, hex('#c8e8ff')); } }
  // el reloj de sol: las agujas (las dos y diez de la noche) y el segundero que barre
  { const cx = 250, cy = 40, ang = (f, r, c) => linea(cx, cy, Math.round(cx + Math.sin(f * 6.283) * r), Math.round(cy - Math.cos(f * 6.283) * r), c);
    ang(dia ? 0.38 : 0.18, 4, C.k); ang(dia ? 0.75 : 0.17, 6, C.k); ang((t / 60) % 1, 6, C.rojo); pset(cx, cy, hex('#c89a3a')); }
  // la radio: el dial que late con la música y la aguja que tiembla
  { const k = 0.5 + 0.5 * Math.sin(t * 5.3) * Math.sin(t * 1.7), c = dia ? hex('#e8d8a0') : c_mez(hex('#c8781a'), hex('#ffd070'), k);
    rect(165, 51, 177, 54, c); pset(169 + Math.round(Math.sin(t * 3) * 0.6), 52, hex('#c82020')); pset(169 + Math.round(Math.sin(t * 3) * 0.6), 53, hex('#c82020'));
    if (!dia) for (let i = -3; i <= 15; i++) for (let j = -2; j <= 5; j++) if (((i + j) & 1) && (j < 0 || j > 3 || i < 0 || i > 12)) c_tine(R, 165 + i, 51 + j, hex('#ffb040'), 0.12 * k); }
  // el gato dormido encima de la nevera: respira y mueve la punta de la cola
  { const gx = 14, gy = 41, r = Math.sin(t * 2.2) > 0.6 ? 1 : 0, G = hex('#e8a050'), GS = hex('#b8702a'), GL = hex('#f8c88a');
    rect(gx + 1, gy - 4 - r, gx + 13, gy, C.k); rect(gx + 2, gy - 3 - r, gx + 12, gy, G); rect(gx + 2, gy - 1, gx + 12, gy, GS); for (let x = gx + 4; x < gx + 12; x += 3) pset(x, gy - 3 - r, GS);
    disco(gx + 13, gy - 3, 3, C.k); disco(gx + 13, gy - 3, 2, G); pset(gx + 12, gy - 6, C.k); pset(gx + 15, gy - 6, C.k); pset(gx + 12, gy - 5, G); pset(gx + 15, gy - 5, G); pset(gx + 12, gy - 3, C.k); pset(gx + 14, gy - 3, C.k); pset(gx + 13, gy - 2, GL);
    const c = Math.sin(t * 1.3) * Math.sin(t * 0.37); linea(gx + 1, gy - 1, gx - 3, gy, C.k); linea(gx - 3, gy, gx - 4, gy - 2 - Math.round(c * 2), C.k); pset(gx - 2, gy - 1, G); }
  // la tele del cuarto de al lado: su luz azul parpadea en el pasillo
  if (!dia) { const k = 0.35 + 0.35 * Math.abs(Math.sin(t * 7.1) * Math.sin(t * 2.3 + 1)) + (h(Math.floor(t * 6), 0, 69) < 0.2 ? 0.25 : 0);
    for (let y = 70; y <= 133; y++) for (let x = 300; x <= 315; x++) if (((x + y) & 1) === 0 && h(x, y, 70) < (y - 70) / 70 + 0.15) c_tine(R, x, y, hex('#6a9aff'), k * 0.35); }
  return {};
}

// una nube pequeña de tres tonos para la ventana (la recorta R.recorte)
function c_nubeV(R, cx, cy, w) { for (const [dx, dy, r] of [[0, 0, w * 0.3], [-w * 0.3, 1, w * 0.22], [w * 0.28, 1, w * 0.24]]) { R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), hex('#b8c8e0')); R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r), hex('#e8f0f8')); R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 1), Math.max(1, Math.round(r * 0.6)), hex('#ffffff')); } }

// lo fijo de la cocina (con la luz de día; c_alumbra pone la noche): techo, papel pintado, nevera, armarios, banco,
// azulejos, ventana (el marco), balda con la radio y el poto, calendario, reloj de sol, teléfono, puerta, suelo y alfombra
function c_cocinaFija(R, dia) {
  const { rect, pset, disco, linea, poligono } = R;
  // el techo, tranquilo (debajo va la barra del año), y la moldura
  for (let y = 0; y <= 19; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 71) < 0.08 ? hex('#e2d6b8') : hex('#eadfc4'));
  rect(0, 19, 319, 21, hex('#8a6040')); rect(0, 19, 319, 19, hex('#a87a54')); rect(0, 22, 319, 22, hex('#5a3c28'));
  // el papel pintado de los setenta: anillos naranjas con su punto pardo, en tresbolillo, y una raya fina vertical; arriba
  // a la derecha (junto a Atom) se queda liso, en dos tonos casi iguales
  for (let y = 23; y <= 123; y++) for (let x = 0; x < 320; x++) { const quieto = x > 266 && y < 50;
    let c = (x % 16 === 0) && !quieto ? hex('#e8d6b0') : h(x, y, 72) < 0.04 ? hex('#e6d4ae') : hex('#efe0bc');
    if (!quieto) { const fy = Math.floor((y - 23) / 14), cx = (Math.floor((x + (fy & 1) * 8) / 16)) * 16 + 8 - (fy & 1) * 8, cy = 23 + fy * 14 + 7, d = Math.hypot(x - cx, y - cy);
      if (d > 2.6 && d < 4.2) c = hex('#e09a52'); else if (d < 1.2) c = hex('#9a6a3a'); else if (d >= 4.2 && d < 5 && x > cx && y > cy) c = hex('#e2cca2'); }
    if (quieto && y < 49) c = y > 45 ? hex('#ecdcb8') : hex('#efe0bc');
    pset(x, y, c); }
  rect(0, 123, 319, 128, hex('#7a5232')); rect(0, 123, 319, 123, hex('#a07448')); rect(0, 128, 319, 128, hex('#4a3020'));   // el rodapié
  // el suelo de linóleo a cuadros en perspectiva (fuga arriba en el centro), moteado, con el brillo cerca de la mesa
  const filas = [129, 134, 140, 147, 155, 164, 174, 186];
  for (let y = 129; y < 180; y++) { let f = 0; while (filas[f + 1] <= y) f++; const z = (y - 60) / 120;
    for (let x = 0; x < 320; x++) { const col = Math.floor(((x - 160) / z + 2000) / 22); let c = (col + f) & 1 ? hex('#c8a870') : hex('#e8d8b0');
      const n = h(x, y, 73); if (n < 0.06) c = c_mez(c, hex('#7a5a3a'), 0.3); else if (n > 0.96) c = c_mez(c, hex('#ffffff'), 0.4);
      if (y === filas[f] || Math.abs(((x - 160) / z + 2000) % 22) < 0.6 / z * 0.6) c = c_mez(c, hex('#6a4a2a'), 0.35);
      pset(x, y, c); } }
  // la alfombra ovalada trenzada debajo de la mesa (anillos pardos, naranjas y verde oliva, con la trenza)
  { const cx = 170, cy = 166, ax = 92, ay = 15, A = [hex('#7a4a2a'), hex('#c8742a'), hex('#8a8a3a'), hex('#a8582a'), hex('#6a6a2a'), hex('#d89a4a')];
    for (let y = cy - ay - 1; y <= 179; y++) for (let x = cx - ax - 1; x <= cx + ax + 1; x++) { const q = Math.hypot((x - cx) / ax, (y - cy) / ay); if (q > 1) continue;
      const anillo = Math.floor(q * 9), c = A[anillo % 6], tr = ((x + y * 2 + anillo) % 4) < 2; pset(x, y, q > 0.97 ? hex('#4a2a1a') : tr ? c : c_mez(c, C.k, 0.18)); } }
  // la nevera aguacate, redondeada, con su sombra en el suelo
  for (let x = 4; x <= 48; x++) pset(x, 135, c_mez(hex('#c8a870'), C.k, 0.4));
  { const N = hex('#8a9a3e'), NL = hex('#aab85a'), NS = hex('#6a7a2a'), NSS = hex('#4e5a1e');
    rect(6, 46, 44, 134, C.k); rect(8, 42, 42, 46, C.k); disco(10, 46, 4, C.k); disco(40, 46, 4, C.k);
    rect(7, 46, 43, 133, N); rect(9, 43, 41, 46, N); disco(10, 46, 3, N); disco(40, 46, 3, N);
    rect(7, 46, 9, 133, NL); rect(9, 43, 12, 45, NL); rect(39, 47, 43, 133, NS); rect(42, 48, 43, 133, NSS);
    rect(7, 74, 43, 75, C.k); rect(7, 76, 43, 76, NL);   // la junta del congelador
    rect(8, 128, 42, 133, hex('#3a3a30')); for (let x = 10; x < 41; x += 2) rect(x, 129, x, 132, hex('#6a6a5a'));   // la rejilla de abajo
    for (const [y0, y1] of [[54, 68], [82, 110]]) { rect(37, y0, 39, y1, C.k); rect(37, y0 + 1, 38, y1 - 1, hex('#e8eef4')); pset(37, y0 + 2, hex('#ffffff')); }   // los tiradores cromados
    for (const [mx, my, c] of [[16, 56, C.rojo], [26, 62, hex('#3a7ac8')], [20, 90, hex('#f0c030')]]) { disco(mx, my, 2, C.k); disco(mx, my, 1, c); pset(mx - 1, my - 1, hex('#ffffff')); }
    rect(14, 92, 30, 112, C.k); rect(15, 93, 29, 111, hex('#fbf8ee')); disco(19, 98, 3, hex('#f0c030')); for (let k = 0; k < 6; k++) pset(19 + Math.round(Math.cos(k) * 5), 98 + Math.round(Math.sin(k) * 5), hex('#f0c030'));
    rect(16, 106, 28, 107, hex('#5aa85a')); poligono([[21, 105], [24, 100], [27, 105]], hex('#c84a3a')); rect(22, 102, 26, 105, hex('#c84a3a')); pset(24, 94, C.rojo); disco(22, 92, 1, hex('#3a7ac8'));   // un dibujo infantil (una casa y el sol)
  }
  // los armarios altos de madera, con dos puertas en relieve y sus tiradores
  const madera = (x0, y0, x1, y1, k) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = Math.sin(x * 0.9 + Math.sin(y * 0.11 + k) * 3 + k) > 0.75; pset(x, y, v ? hex('#6e4426') : h(x, y, 74 + k) < 0.06 ? hex('#7a4e2c') : hex('#8a5a34')); } };
  rect(47, 23, 99, 57, C.k); madera(48, 23, 98, 56, 1);
  for (const [x0, x1] of [[50, 72], [74, 96]]) { rect(x0, 25, x1, 54, hex('#5a3a20')); madera(x0 + 2, 27, x1 - 2, 52, x0); rect(x0 + 1, 25, x1, 25, hex('#a87a4a')); rect(x0, 25, x0, 54, hex('#a87a4a')); }
  for (const kx of [70, 76]) { rect(kx, 46, kx + 1, 50, hex('#c8a040')); pset(kx, 46, hex('#fff0a0')); }
  rect(47, 57, 99, 58, hex('#3a2416'));
  // los azulejos con su florecilla (en el banco, de la encimera a los armarios y a la ventana)
  for (let y = 59; y <= 91; y++) for (let x = 47; x <= 151; x++) { if (x > 99 && x < 151 && y < 76) continue; const i = (x - 47) % 9, j = (y - 59) % 9, ti = Math.floor((x - 47) / 9) + Math.floor((y - 59) / 9);
    let c = i === 8 || j === 8 ? hex('#c8bca0') : i === 0 || j === 0 ? hex('#ffffff') : hex('#f4eee0');
    if (ti % 2 === 0 && i > 1 && i < 7 && j > 1 && j < 7) { const d = Math.abs(i - 4) + Math.abs(j - 4); if (d === 0) c = hex('#c8742a'); else if (d === 2 && (i === 4 || j === 4)) c = hex('#e8a050'); else if (d === 2) c = hex('#8a9a3e'); }
    pset(x, y, c); }
  // la ventana (el marco blanco, el parteluz, el alféizar; el cristal lo pinta cada fotograma)
  rect(100, 24, 150, 76, hex('#d8d2c4')); rect(100, 24, 150, 24, C.k); rect(102, 26, 148, 74, hex('#121a38')); rect(124, 26, 126, 74, hex('#e8e4dc')); rect(102, 48, 148, 49, hex('#e8e4dc'));
  rect(98, 75, 152, 77, hex('#f0ece4')); rect(98, 78, 152, 78, hex('#8a8478')); rect(100, 24, 101, 76, hex('#f4f0e8')); rect(149, 24, 150, 76, hex('#b8b2a4'));
  for (const [px, c] of [[106, hex('#c84a8a')], [140, hex('#e8c040')]]) { rect(px - 2, 71, px + 2, 75, hex('#c0603a')); rect(px - 2, 71, px + 2, 71, hex('#e08050')); disco(px, 68, 2, hex('#4a8a3a')); pset(px, 66, c); pset(px - 1, 67, c); }   // dos macetas en el alféizar
  // el banco: la encimera dorada con su canto cromado, los cajones y las puertas de madera, el zócalo
  rect(46, 91, 152, 95, hex('#d8a838')); rect(46, 91, 152, 91, hex('#f0c860')); for (let k = 0; k < 60; k++) pset(46 + Math.round(h(k, 1, 75) * 106), 92 + Math.round(h(k, 2, 75) * 3), hex('#c08a28'));
  rect(46, 96, 152, 97, hex('#c8ced8')); rect(46, 96, 152, 96, hex('#f4f8fc'));
  rect(46, 98, 152, 131, hex('#4a2e1c')); madera(48, 99, 150, 130, 7);
  for (let k = 0; k < 4; k++) { const x0 = 48 + k * 26, x1 = x0 + 24; rect(x0, 99, x1, 107, hex('#5a3a20')); madera(x0 + 1, 100, x1 - 1, 106, k + 11); rect(x0, 99, x1, 99, hex('#a87a4a')); rect(x0 + 9, 103, x0 + 15, 104, hex('#c8a040')); pset(x0 + 9, 103, hex('#fff0a0'));
    rect(x0, 109, x1, 130, hex('#5a3a20')); madera(x0 + 2, 111, x1 - 2, 128, k + 21); rect(x0, 109, x1, 109, hex('#a87a4a')); rect(x0, 109, x0, 130, hex('#a87a4a')); rect(k & 1 ? x0 + 3 : x1 - 4, 112, k & 1 ? x0 + 4 : x1 - 3, 117, hex('#c8a040')); }
  rect(46, 131, 152, 134, hex('#2a1c14'));
  // el fregadero bajo la ventana y el grifo cromado de cuello de cisne
  rect(108, 91, 144, 94, hex('#9aa2ac')); rect(110, 92, 142, 93, hex('#4a525c')); rect(108, 91, 144, 91, hex('#e8eef4'));
  linea(126, 90, 126, 82, hex('#b8c0c8')); linea(127, 90, 127, 82, hex('#e8eef4')); linea(126, 82, 124, 81, hex('#b8c0c8')); pset(125, 80, hex('#e8eef4')); pset(124, 80, hex('#b8c0c8')); pset(126, 84, C.k); rect(122, 89, 131, 90, hex('#8a929c'));
  for (const kx of [120, 133]) { disco(kx, 88, 1, hex('#c8d0d8')); pset(kx, 87, hex('#ffffff')); }
  // la tostadora cromada (las ranuras, la palanca y los reflejos) y los tres botes naranjas
  rect(54, 79, 74, 91, C.k); rect(55, 80, 73, 90, hex('#b8c0c8')); rect(55, 80, 73, 81, hex('#f4f8fc')); rect(56, 82, 57, 89, hex('#ffffff')); rect(70, 82, 72, 90, hex('#7a828c'));
  rect(59, 79, 64, 80, hex('#2a2a30')); rect(66, 79, 69, 80, hex('#2a2a30')); rect(74, 84, 75, 87, C.k); pset(61, 85, c_mez(hex('#c8742a'), hex('#b8c0c8'), 0.5)); pset(62, 86, c_mez(hex('#8a9a3e'), hex('#b8c0c8'), 0.6));
  for (const [bx, al] of [[80, 14], [89, 11], [96, 8]]) { const w = bx === 96 ? 5 : 7; rect(bx - 1, 91 - al, bx + w + 1, 91, C.k); rect(bx, 92 - al, bx + w, 90, hex('#e0782a')); rect(bx, 92 - al, bx + 1, 90, hex('#f8a050')); rect(bx + w - 1, 92 - al, bx + w, 90, hex('#a8501a'));
    rect(bx - 1, 89 - al, bx + w + 1, 91 - al, hex('#5a3a20')); rect(bx + 2, 88 - al, bx + w - 2, 88 - al, hex('#3a2416')); rect(bx + 1, 95 - al, bx + w - 1, 96 - al, hex('#f4e4c8')); }
  // la balda con la radio de madera (el dial, la rejilla del altavoz, dos mandos) y el poto que cuelga
  rect(154, 62, 198, 64, hex('#8a5a34')); rect(154, 62, 198, 62, hex('#b07a4a')); for (const bx of [158, 192]) { rect(bx, 65, bx + 1, 70, hex('#5a3a20')); linea(bx, 70, bx + 4, 65, hex('#5a3a20')); }
  rect(160, 46, 186, 61, C.k); rect(161, 47, 185, 60, hex('#9a6a3a')); rect(161, 47, 185, 47, hex('#c8945a')); rect(185, 47, 185, 60, hex('#6a4426'));
  rect(164, 50, 178, 55, C.k); for (let y = 57; y <= 59; y++) for (let x = 163; x <= 179; x += 2) pset(x, y, hex('#4a2e1a'));
  for (const kx of [181, 181]) { disco(kx, 51, 2, C.k); disco(kx, 51, 1, hex('#e8e0c8')); } disco(181, 57, 2, C.k); disco(181, 57, 1, hex('#e8e0c8'));
  rect(166, 61, 168, 61, C.k); rect(180, 61, 182, 61, C.k);
  rect(188, 54, 196, 61, C.k); rect(189, 55, 195, 61, hex('#c86a3a')); rect(189, 55, 195, 55, hex('#e8904a'));
  for (const [x0, l, k] of [[190, 18, 0], [194, 24, 1], [192, 10, 2]]) for (let j = 0; j < l; j++) { const x = Math.round(x0 + Math.sin(j * 0.4 + k) * 2 + (k - 1) * j * 0.1), y = 58 + j; pset(x, y, hex('#3a7a3a')); if (j % 3 === 0) { pset(x + 1, y, hex('#5aaa4a')); pset(x + 1, y + 1, hex('#4a9a3a')); } }
  for (let k = 0; k < 7; k++) { const a = -2.8 + k * 0.4; for (let r = 1; r < 5; r++) pset(Math.round(192 + Math.cos(a) * r * 1.4), Math.round(54 + Math.sin(a) * r), k & 1 ? hex('#5aaa4a') : hex('#3a7a3a')); }
  // el calendario de pared (sin letras): un paisaje arriba y la rejilla de los días, con el 15 rodeado
  linea(216, 34, 216, 38, hex('#5a5a5a')); rect(203, 38, 229, 80, C.k); rect(204, 39, 228, 79, hex('#fbf8f0')); rect(204, 39, 228, 39, hex('#ffffff')); rect(228, 40, 228, 79, hex('#d8d0c0'));
  for (let y = 41; y <= 57; y++) for (let x = 206; x <= 226; x++) { const mont = y > 47 + Math.abs(x - 214) * 0.7 - (x > 218 ? 3 : 0); pset(x, y, y > 53 ? (h(x, y, 76) < 0.3 ? hex('#5a9ac8') : hex('#3a7ab8')) : mont ? (y < 47 + Math.abs(x - 214) * 0.7 + 1 ? hex('#ffffff') : hex('#6a7a8a')) : hex('#9ad0f0')); }
  for (let x = 206; x <= 226; x += 3) pset(x, 53, hex('#2a6a3a'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const x = 206 + i * 3, yy = 61 + j * 3, n = j * 7 + i; if (n < 2 || n > 32) continue; pset(x, yy, n % 7 === 0 ? C.rojo : hex('#6a6a7a')); pset(x + 1, yy, n % 7 === 0 ? C.rojo : hex('#6a6a7a')); }
  for (let a = 0; a < 6.3; a += 0.25) pset(Math.round(215.5 + Math.cos(a) * 2.5), Math.round(67.5 + Math.sin(a) * 2), C.rojo);   // el 15, rodeado
  // el reloj de sol: los rayos dorados largos y cortos, la esfera crema (las agujas, cada fotograma)
  { const cx = 250, cy = 40;
    for (let k = 0; k < 24; k++) { const a = k / 24 * 6.283, r1 = k & 1 ? 12 : 15; for (let r = 8; r <= r1; r++) { pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), r === r1 ? hex('#8a5a1a') : k & 1 ? hex('#c89a3a') : hex('#e8c060')); } if (!(k & 1)) disco(Math.round(cx + Math.cos(a) * 16), Math.round(cy + Math.sin(a) * 16), 1, hex('#e8c060')); }
    disco(cx, cy, 8, C.k); disco(cx, cy, 7, hex('#c89a3a')); disco(cx, cy, 6, hex('#f8f0dc')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k / 12 * 6.283) * 5), Math.round(cy + Math.sin(k / 12 * 6.283) * 5), hex('#8a7a5a')); }
  // el teléfono de pared naranja con el auricular y el cordón rizado
  { rect(256, 66, 268, 90, C.k); rect(257, 67, 267, 89, hex('#e0702a')); rect(257, 67, 258, 89, hex('#f89a50')); rect(266, 67, 267, 89, hex('#a8501a'));
    disco(262, 80, 4, C.k); disco(262, 80, 3, hex('#f4e8d8')); for (let k = 0; k < 8; k++) pset(Math.round(262 + Math.cos(k * 0.75) * 2), Math.round(80 + Math.sin(k * 0.75) * 2), hex('#6a5a4a')); pset(262, 80, hex('#e0702a'));
    rect(252, 64, 255, 92, C.k); rect(253, 65, 254, 91, hex('#e0702a')); rect(251, 64, 256, 67, C.k); rect(251, 89, 256, 92, C.k); rect(252, 65, 255, 66, hex('#f89a50')); rect(252, 90, 255, 91, hex('#c8601a'));
    for (let j = 0; j < 26; j++) { const x = Math.round(253 + Math.sin(j * 1.6) * 1.5 + (j > 18 ? (j - 18) * 0.6 : 0)), y = 93 + j; pset(x, y, hex('#c8601a')); pset(x + 1, y, j & 1 ? hex('#e0702a') : C.k); } }
  // la puerta al pasillo oscuro (el marco, el fondo del pasillo con un cuadro y una percha con un abrigo) y el interruptor
  rect(284, 47, 319, 134, hex('#7a5232')); rect(284, 47, 285, 134, hex('#a07448')); rect(288, 51, 319, 134, hex('#24202a'));
  for (let y = 51; y <= 134; y++) for (let x = 288; x <= 319; x++) { if (y > 116) pset(x, y, ((x + y) & 3) ? hex('#3a2e2a') : hex('#4a3a30')); else if (h(x, y, 77) < 0.05) pset(x, y, hex('#2c2832')); }
  rect(288, 116, 319, 116, hex('#4a3c34')); rect(300, 64, 312, 76, hex('#3a3440')); rect(302, 66, 310, 74, hex('#4a5a6a')); rect(302, 71, 310, 74, hex('#3a4a3a'));
  rect(291, 66, 293, 67, hex('#6a6a6a')); rect(290, 68, 296, 92, hex('#3a2a24')); rect(290, 68, 291, 92, hex('#4a3a30'));
  rect(276, 84, 280, 91, hex('#d8d0c0')); rect(276, 84, 280, 84, hex('#ffffff')); rect(278, 86, 278, 88, hex('#8a8478'));
  // la mesa también en el fondo (por si queda algo a la vista detrás de quien está de pie); la de verdad va delante
  c_mesaCocina(R, dia);
}

// la mesa de la cocina con el listado: el tablero de formica en perspectiva (motas, «bumeranes» dorados, más oscuro
// hacia el canto) con su canto cromado acanalado, las patas cromadas con su travesaño, el listado (el montón plegado, la
// tira sobre el tablero con sus bandas y renglones, los pliegues que caen y el montón del suelo), la taza, la libreta
// de notas con su lápiz, la lámpara de pinza (brazo y pantalla verde) y la silla de vinilo naranja a la derecha con sus
// botones y una rebeca de punto colgada del respaldo. Todo fijo (sin t); capa: sin mezclas con lo de detrás
function c_mesaCocina(R, dia, capa = false) {
  const { rect, pset, disco, linea, poligono } = R;
  // la silla de la derecha: el respaldo de vinilo naranja acolchado, el asiento y el armazón cromado
  rect(252, 120, 270, 140, C.k); rect(253, 121, 269, 139, hex('#d8682a')); rect(253, 121, 269, 122, hex('#f8984a')); for (const y of [127, 133]) rect(254, y, 268, y, hex('#a8481a'));
  rect(250, 140, 252, 178, hex('#9aa2ac')); rect(270, 140, 272, 178, hex('#9aa2ac')); rect(250, 140, 250, 178, hex('#e8eef4')); rect(270, 140, 270, 178, hex('#e8eef4'));
  rect(248, 148, 274, 154, C.k); rect(249, 149, 273, 153, hex('#d8682a')); rect(249, 149, 273, 149, hex('#f8984a')); rect(249, 153, 273, 153, hex('#a8481a'));
  rect(254, 155, 256, 172, hex('#7a828c')); rect(266, 155, 268, 172, hex('#7a828c'));
  // los botones del acolchado y la rebeca marrón de punto colgada del respaldo (con su canalé y un botón)
  for (const [bx, by] of [[257, 124], [265, 124], [261, 130], [257, 136], [265, 136]]) { pset(bx, by, hex('#a8481a')); pset(bx, by - 1, hex('#f8984a')); }
  poligono([[251, 119], [263, 119], [262, 133], [258, 131], [254, 134], [252, 126]], hex('#6a4a2a')); linea(251, 119, 263, 119, hex('#8a6a42'));
  for (let x = 253; x < 262; x += 2) linea(x, 121, x - 1, 131, hex('#56391e')); linea(254, 133, 258, 130, hex('#8a6a42')); linea(258, 130, 262, 132, hex('#8a6a42')); pset(256, 125, hex('#d8c8a0'));
  // las sombras de la mesa en la alfombra
  if (!capa) for (let y = 172; y <= 179; y++) for (let x = 96 + (y - 172); x <= 244 - (y - 172); x++) if ((x + y) & 1) pset(x, y, c_mez(R.pget(x, y), C.k, 0.35));
  // las patas cromadas (las de atrás, más cortas) con sus contoños
  for (const [lx, y1] of [[108, 170], [232, 170], [100, 178], [240, 178]]) { rect(lx - 1, 160, lx + 1, y1, hex('#9aa2ac')); rect(lx - 1, 160, lx - 1, y1, hex('#f4f8fc')); rect(lx + 1, 160, lx + 1, y1, hex('#5a626c')); rect(lx - 2, y1, lx + 2, y1 + 1, hex('#3a3a3a')); }
  // el travesaño cromado entre las patas de atrás
  rect(108, 165, 232, 166, hex('#9aa2ac')); rect(108, 165, 232, 165, hex('#e8eef4')); rect(108, 167, 232, 167, hex('#4a525c'));
  // el tablero: un trapecio de formica (más estrecho atrás), con la luz de la lámpara y el canto cromado acanalado
  const F = [hex('#ecdca8'), hex('#d4b45a'), hex('#b8ac94'), hex('#fff6d8'), hex('#dccb94')];
  for (let y = 147; y <= 157; y++) { const u = (y - 147) / 10, xa = Math.round(100 - u * 6), xb = Math.round(240 + u * 6);
    for (let x = xa; x <= xb; x++) { const n = h(x, y, 78); pset(x, y, n < 0.05 ? F[1] : n < 0.08 ? F[2] : n < 0.1 ? F[3] : (y > 153 && (x + y) % 2) || y === 157 ? F[4] : F[0]); } pset(xa, y, C.k); pset(xb, y, C.k); }
  for (let i = 0; i < 9; i++) { const bx = 104 + Math.round(h(i, 1, 90) * 138), by = 149 + Math.round(h(i, 2, 90) * 6), d = i % 2 ? 1 : -1;
    pset(bx - 2, by + 1, F[1]); pset(bx - 1, by, F[1]); pset(bx, by, F[1]); pset(bx + 1, by + d, F[1]); pset(bx + 2, by + 1 + d, F[1]); }
  // la libreta de notas (renglones sin letras, la espiral arriba) y el lápiz tumbado delante, a la derecha
  poligono([[226, 150], [243, 150], [245, 156], [224, 156]], C.k); poligono([[227, 151], [242, 151], [243, 155], [226, 155]], hex('#f8f0d8'));
  for (let x = 228; x <= 241; x += 2) pset(x, 150, hex('#8a8e98')); for (const y of [152, 154]) linea(228, y, 241, y, hex('#9ab0d0')); linea(229, 153, 236, 153, hex('#5a5a6a'));
  linea(207, 157, 221, 154, hex('#f0b830')); linea(207, 156, 221, 153, hex('#ffe070')); pset(206, 157, hex('#3a3a44')); pset(222, 154, hex('#e07a88')); pset(222, 153, hex('#f8a8b0'));
  rect(100, 146, 240, 146, C.k); rect(100, 147, 240, 147, hex('#fff6d8'));
  rect(93, 158, 247, 161, hex('#9aa2ac')); rect(93, 158, 247, 158, hex('#f4f8fc')); rect(93, 160, 247, 160, hex('#c8d0d8')); rect(93, 161, 247, 161, hex('#5a626c')); rect(92, 158, 92, 161, C.k); rect(248, 158, 248, 161, C.k);
  // el listado: el montón plegado a la izquierda (los cantos de las hojas), la tira sobre el tablero y lo que cae
  for (let k = 0; k < 6; k++) { const y = 147 - k * 1.6; rect(104 + k, Math.round(y) - 1, 134 - k, Math.round(y), k & 1 ? C.papelS : C.papel); pset(104 + k, Math.round(y), hex('#9ac89a')); }
  rect(108, 137, 130, 139, C.papel); rect(108, 137, 130, 137, hex('#fffbf0')); for (let x = 109; x < 130; x += 2) { pset(x, 138, C.banda); }
  for (let y = 148; y <= 157; y++) { const u = (y - 147) / 10, xa = Math.round(134 - u * 2), xb = Math.round(204 + u * 2);
    for (let x = xa; x <= xb; x++) { let c = (Math.floor((y - 147) / 3) & 1) ? C.banda : C.papel; if (y === 148 || y === 157) c = ((x & 1) ? C.papelS : C.papel); else if (x > xa + 3 && x < xb - 3 && (x % 3 === 0) && h(x, y, 79) < 0.45 && (y & 1)) c = hex('#6a6a78'); pset(x, y, c); } }
  for (let y = 158; y <= 167; y++) { const sw = Math.round(Math.sin((y - 158) * 0.5) * 1.5); for (let x = 150 + sw; x <= 196 + sw; x++) { let c = (Math.floor((y - 158) / 3) & 1) ? C.banda : C.papel; if (x === 150 + sw || x === 196 + sw) c = C.papelS; else if ((x - sw) % 4 === 0 && (y & 1) && h(x, y, 80) < 0.5) c = hex('#7a7a88'); pset(x, y, c); } }
  for (let k = 0; k < 3; k++) { const y0 = 168 + k * 4, dx = k & 1 ? -3 : 3; poligono([[148 + dx, y0], [198 + dx, y0], [200 - dx, y0 + 4], [146 - dx, y0 + 4]], k & 1 ? C.papelS : C.papel); linea(148 + dx, y0, 198 + dx, y0, k & 1 ? hex('#fffbf0') : C.papelS); }
  rect(140, 178, 206, 179, C.papelS); for (let x = 142; x < 206; x += 3) pset(x, 179, hex('#9ac89a'));
  // la taza naranja con su asa
  rect(213, 141, 222, 152, C.k); rect(214, 142, 221, 151, hex('#e8782a')); rect(214, 142, 215, 151, hex('#f8a050')); rect(220, 142, 221, 151, hex('#a8501a')); rect(214, 142, 221, 143, hex('#3a2416')); rect(215, 142, 220, 142, hex('#5a3a20'));
  rect(222, 144, 225, 149, C.k); rect(223, 145, 224, 148, hex('#e8782a')); rect(223, 146, 223, 147, C.k);
  // la lámpara de pinza: la pinza en el canto de atrás, el brazo cromado y la pantalla verde que mira al papel
  rect(228, 143, 236, 148, C.k); rect(229, 144, 235, 147, hex('#2a2a30')); rect(229, 144, 235, 144, hex('#5a5a62'));
  linea(232, 143, 234, 124, hex('#c8d0d8')); linea(233, 143, 235, 124, hex('#6a727c')); linea(234, 124, 222, 112, hex('#c8d0d8')); linea(235, 125, 223, 113, hex('#6a727c')); disco(234, 124, 1, hex('#3a3a3a'));
  poligono([[218, 106], [226, 111], [218, 126], [206, 122]], C.k); poligono([[218, 108], [224, 112], [217, 124], [208, 121]], hex('#2a7a6a')); linea(218, 108, 210, 120, hex('#4aa894')); linea(223, 113, 217, 122, hex('#1a5a4a'));
  linea(207, 122, 217, 126, dia ? hex('#c8c0a0') : hex('#fff4c0')); linea(208, 123, 216, 125, dia ? hex('#e8e0c0') : hex('#ffffff'));
}
// 'mesa' general, lo de delante: la mesa (capa con huecos), el cono de luz de la lámpara (también sobre Ehman), la
// polilla, el vapor de la taza
function c_cocinaDelante(R, t, o) {
  const dia = o.luz === 'dia', b = c_fijo(R, 'cocinaMesa.' + (dia ? 'dia' : 'noche'), (bf) => { c_mesaCocina(R, dia, true); c_alumbra(bf, dia, 196, 140, 84, 0.27); }, true);
  c_pegaCapa(R, b, [92, 104, 274, 179]);
  if (!dia) { // el cono de luz desde la pantalla hasta el papel, tramado (aclara y calienta lo que toca, Ehman incluido)
    for (let y = 124; y <= 157; y++) { const u = (y - 124) / 33, xa = Math.round(lerp(207, 150, u)), xb = Math.round(lerp(217, 206, u));
      for (let x = xa; x <= xb; x++) if (((x + y) & 1) === 0 || (u > 0.75 && x > xa + 4 && x < xb - 4)) c_tine(R, x, y, hex('#ffe8a0'), 0.18 + (1 - u) * 0.12); }
    for (let k = 0; k < 5; k++) { const mx = Math.round(lerp(212, 178, ((t * 0.07 + h(k, 1, 81)) % 1)) + Math.sin(t * 1.3 + k) * 4), my = Math.round(lerp(126, 152, ((t * 0.07 + h(k, 1, 81)) % 1))); if (h(k, Math.floor(t * 2), 82) < 0.8) c_tine(R, mx, my, hex('#ffffff'), 0.6); }
    const a = t * 2.4; c_polilla(R, 214 + Math.cos(a) * 9 + Math.sin(a * 2.7) * 2, 110 + Math.sin(a) * 5, t);
  }
  c_vapor(R, 217, 140, t, 14);
  return {};
}

const c_LA = { x: 50, y: 24, w: 212, hh: 160, s: 2, linea: 5 };

// 'mesa' cámara 'listado': el listado desde arriba sobre la formica (fondo fijo en búfer), lo rojo que cambia (halo,
// círculo, «Wow!»), los útiles tumbados, la mano canónica con su útil (o.boli 0–3: con 1 y 2 al final del brazo
// canónico, con 3 sola con su puño; o.retira 0–1: sale por abajo a la derecha con el útil) y la vida (vapor, motas, la sombra de la polilla). Las opciones, en la cabecera de listado()
function c_listadoArriba(R, t, o) {
  const dia = o.luz === 'dia', s = o.s ?? c_LA.s, L = { ...c_LA, s, ...(s === 3 ? { x: 14, w: 262, linea: 3 } : s === 1 ? { linea: 12 } : {}) };
  const opc = { s, w: L.w, hh: L.hh, linea: L.linea, recorte: [0, 0, 319, 171], agujero: hex('#8a7a5a') };
  R.copiar(c_fijo(R, 'listadoArriba.' + s + (dia ? 'dia' : 'noche'), (b) => {
    c_formica(R, 0, 0, 319, 179, 1);
    // la mancha de café (un aro seco con su chorrito), la goma con sus virutas
    for (let a = 0; a < 6.28; a += 0.04) { const r = 9 + Math.sin(a * 3) * 0.6; if (a > 0.6 && a < 1.3) continue; R.pset(Math.round(24 + Math.cos(a) * r), Math.round(64 + Math.sin(a) * r * 0.9), hex('#b88a4a')); if (h(Math.round(a * 20), 1, 83) < 0.5) R.pset(Math.round(24 + Math.cos(a) * (r - 1)), Math.round(64 + Math.sin(a) * (r - 1) * 0.9), hex('#d4ac6a')); }
    for (let k = 0; k < 8; k++) R.pset(30 + k, 73 + Math.round(k * 0.6), hex('#c89a5a'));
    c_sombra(R, 26, 106, 10, 5, 0.25); R.rect(15, 97, 34, 106, C.k); R.rect(16, 98, 33, 105, hex('#f08a98')); R.rect(16, 98, 33, 99, hex('#ffb8c0')); R.rect(16, 104, 33, 105, hex('#c86070')); R.rect(25, 98, 33, 105, hex('#a8c8f0')); R.rect(25, 98, 33, 99, hex('#d0e4ff')); R.rect(25, 104, 33, 105, hex('#7a9ac8'));
    for (let k = 0; k < 7; k++) { const vx = 12 + Math.round(h(k, 1, 84) * 26), vy = 110 + Math.round(h(k, 2, 84) * 10); R.pset(vx, vy, hex('#e07a88')); R.pset(vx + 1, vy, hex('#c86070')); }
    // la taza vista desde arriba: el borde, el café con su brillo y el asa
    c_sombra(R, 28, 152, 15, 13, 0.3); R.disco(25, 148, 13, C.k); R.disco(25, 148, 12, hex('#e8782a')); R.disco(24, 147, 10, hex('#fbe8d8')); R.disco(25, 148, 9, hex('#4a2a16')); R.disco(25, 148, 8, hex('#5a341c')); R.rect(21, 144, 23, 144, hex('#c8a07a')); R.pset(20, 145, hex('#8a5a3a'));
    R.rect(37, 145, 44, 151, C.k); R.rect(38, 146, 43, 150, hex('#e8782a')); R.rect(39, 147, 42, 149, C.k);
    // el papel (sin los trazos rojos), con la hoja anterior plegada por debajo arriba y el cantillo cromado abajo
    for (let x = L.x; x < L.x + L.w; x++) { R.pset(x, L.y - 3, c_mez(C.papelS, C.k, 0.15)); R.pset(x, L.y - 2, C.papelS); R.pset(x, L.y - 1, C.papel); }
    piezaListado(R, L.x, L.y, opc);
    R.rect(0, 172, 319, 175, hex('#9aa2ac')); R.rect(0, 172, 319, 172, hex('#f4f8fc')); R.rect(0, 174, 319, 174, hex('#c8d0d8')); R.rect(0, 175, 319, 175, hex('#4a525c'));
    for (let y = 176; y <= 179; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x >> 3) + (y >> 2)) & 1 ? hex('#5a4a34') : hex('#6e5a40'));
    for (let y = 172; y <= 179; y++) for (let x = L.x - 1; x <= L.x + L.w; x++) { const q = y - 172; R.pset(x, y, x === L.x - 1 || x === L.x + L.w ? C.k : q === 0 ? hex('#fffbf0') : c_mez(C.papel, C.k, 0.08 + q * 0.05)); }
    c_alumbra(b, dia, 128, 116, 150, 0.4);
  }));
  // lo que cambia: el halo, el círculo y el «Wow!»
  const g = piezaListado(R, L.x, L.y, { ...opc, soloRojo: true, rodea: o.rodea ?? 0, wow: o.wow ?? 0, resalta: o.resalta ?? 0 });
  // los útiles: los que esperan o ya se han probado, tumbados a la derecha (con su sombra)
  const boli = Math.max(0, Math.min(3, Math.floor(o.boli ?? 0)));
  if (boli !== 1) c_util(R, boli >= 2 ? 274 : 278, boli >= 2 ? 104 : 94, boli >= 2 ? 2.2 : 1.2, 28, 'lapiz', { sombra: true, roto: boli >= 2 });
  if (boli !== 2) c_util(R, boli >= 3 ? 296 : 284, boli >= 3 ? 150 : 124, boli >= 3 ? -2.5 : 1.9, 26, 'azul', { sombra: true });
  if (boli !== 3) c_util(R, 272, 152, 0.35, 26, 'rojo', { sombra: true });
  // la mano con el útil: prueba en el margen de abajo (1 y 2) o escribe donde va el trazo rojo (3)
  let muneca = null;
  if (boli > 0) {
    let P;
    if (boli === 3) P = g.punta;
    else { const bx = g.anillo[0] - 52, by = g.anillo[1] + 30; P = [Math.round(bx + Math.sin(t * 9) * 5), Math.round(by + Math.sin(t * 17) * 1.5 - Math.abs(Math.sin(t * 4.5)) * 2)];
      if (boli === 1) for (let k = 0; k < 6; k++) { const cx = bx - 8 + Math.round(h(k, 1, 85) * 14), cy = by + 2 + Math.round(h(k, 2, 85) * 5); R.pset(cx, cy, hex('#c89a64')); }
      else for (let k = 0; k < 3; k++) for (let i = 0; i < 18; i++) { const sx = bx - 8 + i, sy = by - 3 + k * 3 + Math.round(Math.sin(i * 1.3 + k) * 1.5); R.pset(sx, sy, c_mez(R.pget(sx, sy), hex('#8a8478'), 0.35)); } }
    // o.retira: todo (útil, mano, codo y hombro) se desliza junto por la línea del antebrazo hasta salir por abajo
    const re = Math.max(0, Math.min(1, o.retira ?? 0)), rq = re * re * (3 - 2 * re), ox = Math.round(rq * 96), oy = Math.round(rq * 144);
    if (re < 1) {
      const Q = [P[0] + ox, P[1] + oy], ang = 0.42, tipo = boli === 1 ? 'lapiz' : boli === 2 ? 'azul' : 'rojo', manga = o.manga ?? '#5a6a3a';
      c_util(R, Q[0], Q[1], ang, 24, tipo, { roto: boli === 1 });
      muneca = [Q[0] + 16, Q[1] + 8];
      // con el lápiz y el azul (1 y 2) la muñeca está a ~20 px del borde de abajo y entra el brazo canónico (se ven
      // 20–30 px de antebrazo); con el rojo (3) la punta recorre el círculo y el «Wow!» a 80–100 px del borde: un
      // antebrazo hasta ahí sería un «brazo palo», así que va SOLO LA MANO canónica con su puño (como la tiza de
      // wo-cierre), con su sombra blanda en el papel, desplazada abajo a la derecha por la lámpara
      if (boli === 3) { c_sombra(R, muneca[0] + 2, muneca[1] + 5, 9, 4, 0.22); mano(R, muneca[0] - 3, muneca[1], -1, '#efe6d0', { sinManga: true }); }
      else brazo(R, P[0] + 74 + ox, 214 + oy, muneca[0], muneca[1], manga, -1, { puno: '#efe6d0', codo: [Q[0] + 44, Q[1] + 50] });
      c_util(R, Q[0], Q[1], ang, 24, tipo, { roto: boli === 1, desde: 0.62 });
      R.rect(Q[0] + 5, Q[1] + 1, Q[0] + 7, Q[1] + 3, C.k); R.rect(Q[0] + 5, Q[1] + 2, Q[0] + 6, Q[1] + 3, hex('#f6c290'));   // el pulgar sobre el útil
      if (muneca[1] > 179) muneca = null;
    }
  }
  // vida: el vapor de la taza, motas de polvo en la luz y, a ratos, la sombra de la polilla que cruza
  c_vapor(R, 25, 146, t, 20, 3);
  if (!dia) { for (let k = 0; k < 7; k++) { const u = (t * 0.05 + h(k, 1, 86)) % 1, mx = Math.round(70 + h(k, 2, 86) * 140 + Math.sin(t * 0.8 + k) * 6), my = Math.round(40 + u * 120); if (mx > 268 && my < 48) continue; if (h(k, Math.floor(t * 3), 87) < 0.85) c_tine(R, mx, my, hex('#fff8e0'), 0.5); }
    const u = (t % 7) / 7; if (u < 0.35) { const q = u / 0.35, mx = lerp(-10, 330, q), my = 60 + Math.sin(q * 9) * 14 + q * 50; c_sombra(R, mx, my, 5 + Math.round(Math.abs(Math.sin(t * 30)) * 3), 3, 0.18); } }
  const [x0, y0, x1, y1] = g.caja;
  return { seq: g.seq, wow: g.wow, punta: g.punta, mano: muneca, anillo: g.anillo, papelCaja: [x0, y0, x1, Math.min(y1, 179)] };
}
const c_ESC = { base: 133, alto: 96, cols: [73, 103, 133, 163, 193, 223], vals: [6, 14, 26, 30, 19, 5], ancho: 7 };

function c_escala(R, t, o) {
  const dia = o.luz === 'dia', u = Math.max(0, Math.min(1, o.u ?? 1)), { base, alto, cols, vals, ancho } = c_ESC;
  R.copiar(c_fijo(R, 'escala.' + (dia ? 'dia' : 'noche'), (b) => {
    c_formica(R, 0, 0, 319, 179, 2);
    // la tira del listado de verdad, ya rodeada, asomando por debajo de la hoja a la izquierda
    piezaListado(R, -8, 34, { w: 48, hh: 150, margen: 2, col: 2, linea: 3, rodea: 1, s: 1 });
    // la hoja de papel milimetrado: la retícula fina y la gruesa, la fibra, su sombra y la cinta de pintor en las esquinas
    for (let y = 29; y <= 173; y++) for (let x = 39; x <= 265; x++) if (x > 262 || y > 170) R.pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
    for (let y = 26; y <= 170; y++) for (let x = 36; x <= 262; x++) { const gx = (x - 37) % 20 === 0, gy = (y - 37) % 20 === 0 || (y - 133) % 20 === 0, fx = (x - 37) % 4 === 0, fy = (y - 37) % 4 === 0;
      let c = h(x, y, 88) < 0.04 ? hex('#ece8d4') : hex('#f6f3e2'); if (gx || ((y - 133) % 20 === 0)) c = hex('#9cc4a8'); else if (fx || fy) c = hex('#d4e6d4');
      if (x === 36 || y === 26) c = hex('#fffdf4'); if (x === 262) c = hex('#d8d4c0'); R.pset(x, y, c); }
    for (const [cx, cy, a] of [[40, 30, -0.7], [258, 30, 0.7], [40, 166, 0.7], [258, 166, -0.7]]) for (let i = -9; i <= 9; i++) for (let j = -3; j <= 3; j++) { const px = Math.round(cx + Math.cos(a) * i - Math.sin(a) * j), py = Math.round(cy + Math.sin(a) * i + Math.cos(a) * j); if (px < 278 || py > 46) R.pset(px, py, c_mez(R.pget(px, py), hex('#e8d8a0'), Math.abs(j) === 3 ? 0.85 : 0.6)); }
    // la línea base a lápiz y los seis caracteres de impresora, grandes, debajo
    R.rect(56, base + 1, 242, base + 1, hex('#5a5a64')); R.rect(56, base + 2, 242, base + 2, hex('#a8a8b0'));
    for (let k = 0; k < 6; k++) { const G = c_GLIFO['6EQUJ5'[k]], gx = cols[k] - 6, gy = 140;
      for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (G[j][i] === '#') for (let bb = 0; bb < 4; bb++) for (let aa = 0; aa < 4; aa++) R.pset(gx + i * 4 + aa, gy + j * 4 + bb, aa === 3 && bb === 3 ? hex('#5c5c6c') : h(gx + i * 4 + aa, gy + j * 4 + bb, 89) < 0.1 ? hex('#5c5c6c') : hex('#2e2e3a')); }
    // el eje de la escala a la izquierda con sus marcas (cada 10) y la regla de plástico abajo
    R.rect(56, base - alto, 56, base, hex('#5a5a64')); for (let v = 10; v <= 30; v += 10) R.rect(53, Math.round(base - v / 30 * alto), 58, Math.round(base - v / 30 * alto), hex('#5a5a64'));
    c_sombra(R, 152, 166, 70, 3, 0.2); R.rect(84, 160, 220, 168, C.k); R.rect(85, 161, 219, 167, hex('#d8e8f0')); R.rect(85, 161, 219, 161, hex('#ffffff'));
    for (let x = 86; x < 219; x += 3) R.rect(x, 161, x, (x - 86) % 15 === 0 ? 165 : 163, hex('#4a5a6a'));
    // la calculadora de los setenta: el cuerpo pardo, la ventana de los LED, las teclas (sin letras) y su sombra
    c_sombra(R, 294, 140, 24, 32, 0.3); R.rect(272, 106, 314, 172, C.k); R.rect(273, 107, 313, 171, hex('#4a3a30')); R.rect(273, 107, 313, 108, hex('#7a6656')); R.rect(312, 109, 313, 171, hex('#2a2018'));
    R.rect(276, 111, 310, 124, hex('#1a0c0c')); R.rect(276, 111, 310, 111, hex('#0a0404'));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const kx = 277 + i * 9, ky = 129 + j * 10, c = i === 3 ? hex('#e07a3a') : j === 0 ? hex('#c8b8a0') : hex('#f0e8d8');
      R.rect(kx, ky, kx + 6, ky + 7, C.k); R.rect(kx + 1, ky + 1, kx + 5, ky + 6, c); R.rect(kx + 1, ky + 1, kx + 5, ky + 1, c_mez(c, hex('#ffffff'), 0.5)); R.rect(kx + 1, ky + 6, kx + 5, ky + 6, c_mez(c, C.k, 0.3));
      R.pset(kx + 3, ky + 3, c_mez(c, C.k, 0.55)); if (i === 3) { R.pset(kx + 2, ky + 3, c_mez(c, C.k, 0.55)); R.pset(kx + 4, ky + 3, c_mez(c, C.k, 0.55)); } }
    // un lápiz tumbado y la taza desde arriba
    c_util(R, 10, 30, 1.2, 26, 'lapiz', { sombra: true });
    c_sombra(R, 296, 70, 15, 13, 0.3); R.disco(292, 66, 13, C.k); R.disco(292, 66, 12, hex('#e8782a')); R.disco(291, 65, 10, hex('#fbe8d8')); R.disco(292, 66, 9, hex('#4a2a16')); R.disco(292, 66, 8, hex('#5a341c')); R.rect(288, 62, 290, 62, hex('#c8a07a'));
    R.rect(276, 63, 279, 70, C.k); R.rect(277, 64, 278, 69, hex('#e8782a'));
    c_alumbra(b, dia, 150, 95, 175, 0.42);
  }));
  // la línea punteada del ruido de fondo (1 de 30), a lápiz azul
  const yr = Math.round(base - alto / 30); for (let x = 58; x < 244; x++) if ((x >> 1) & 1) R.pset(x, yr, hex('#3a6ac8'));
  // las barras: crecen una tras otra, ámbar rayado a lápiz, con su contorno, la luz a la izquierda y la U que brilla
  let cuenta = 0;
  for (let k = 0; k < 6; k++) { const f = Math.max(0, Math.min(1, (u - k * 0.1) / 0.45)), e = 1 - (1 - f) ** 3, top = Math.round(base - vals[k] / 30 * alto * e); if (f > 0 && f < 1) cuenta = Math.round(vals[k] * e); else if (f >= 1) cuenta = Math.max(cuenta, vals[k]); if (top >= base) continue;
    const x0 = cols[k] - ancho, x1 = cols[k] + ancho - 1, U = k === 3;
    for (let y = top; y <= base; y++) for (let x = x0; x <= x1; x++) { let c = (x + y) % 4 === 0 ? hex('#c8741a') : (x - y + 400) % 7 === 0 ? hex('#ffd890') : U ? hex('#ffb43a') : hex('#f0a838');
      if (x === x0 + 1 || x === x0 + 2) c = c_mez(c, hex('#ffffff'), 0.3); if (x === x1 || x === x1 - 1) c = c_mez(c, hex('#8a4a10'), 0.3); if (x === x0 || x === x1 || y === top) c = hex('#7a4a14'); R.pset(x, y, c); }
    if (U && f >= 1) { const br = 0.5 + 0.5 * Math.sin(t * 4); for (let x = x0 - 2; x <= x1 + 2; x++) { if ((x + Math.floor(t * 6)) % 3 === 0) c_tine(R, x, top - 2, hex('#fff4c0'), 0.5 * br); } for (let y = top; y <= base; y += 3) { c_tine(R, x0 - 2, y, hex('#fff4c0'), 0.4 * br); c_tine(R, x1 + 2, y, hex('#fff4c0'), 0.4 * br); } } }
  // el 30 junto a la U, cuando llega
  const fU = Math.max(0, Math.min(1, (u - 0.3) / 0.45)); if (fU >= 1) R.numero('30', cols[3] + 11, base - alto + 9, { color: hex('#c8301a'), sombra: false });
  // la calculadora cuenta la barra que crece (LED rojos de siete segmentos que tiemblan un poco)
  c_led(R, 307, 113, String(cuenta), 0.85 + 0.15 * Math.sin(t * 23));
  c_vapor(R, 292, 64, t, 18, 5);
  if (!dia) { const v = (t % 8) / 8; if (v < 0.3) { const q = v / 0.3; c_sombra(R, lerp(330, -10, q), 40 + q * 100 + Math.sin(q * 11) * 10, 5 + Math.round(Math.abs(Math.sin(t * 30)) * 3), 3, 0.15); } }
  return { barras: [cols[0] - ancho, base - alto, cols[5] + ancho - 1, base], base, cols: [...cols], u30: [cols[3], base - alto] };
}

// cifras de siete segmentos en rojo LED, alineadas a la derecha en xd (cada cifra 5 × 9, con su resplandor)
function c_led(R, xd, y, s, k = 1) {
  const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' }, on = c_mez(hex('#5a0808'), hex('#ff4030'), k), apag = hex('#2a0a0a');
  const seg = { a: [[1, 0], [2, 0], [3, 0]], b: [[4, 1], [4, 2], [4, 3]], c: [[4, 5], [4, 6], [4, 7]], d: [[1, 8], [2, 8], [3, 8]], e: [[0, 5], [0, 6], [0, 7]], f: [[0, 1], [0, 2], [0, 3]], g: [[1, 4], [2, 4], [3, 4]] };
  for (let n = 0; n < 4; n++) { const ch = s[s.length - 1 - n], x = xd - 4 - n * 7;
    for (const [nm, pts] of Object.entries(seg)) { const lit = ch !== undefined && SEG[ch].includes(nm); for (const [i, j] of pts) R.pset(x + i, y + j, lit ? on : apag); } }
}

const c_CUR = { pan: [64, 38, 256, 142], x0: 78, x1: 246, eje: 124, alto: 70 };

function c_curva(R, t, o) {
  const u = Math.max(0, Math.min(1, o.u ?? 1)), { pan, x0, x1, eje, alto } = c_CUR, vals = c_ESC.vals;
  R.copiar(c_fijo(R, 'curva', () => {
    const { rect, pset, disco, linea } = R;
    // la sala en penumbra: la pared de paneles y los armarios de la computadora a los lados
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 40 === 0 && y < 150) ? hex('#1a2030') : h(x >> 1, y >> 1, 90) < 0.06 ? hex('#22283a') : hex('#262c40'));
    for (const [ax0, ax1] of [[0, 34], [286, 319]]) { rect(ax0, 50, ax1, 150, hex('#3a4a66')); rect(ax0, 50, ax1, 52, hex('#5a6a88')); rect(ax0 + 2, 56, ax1 - 2, 104, hex('#2a3448')); rect(ax0 + 2, 110, ax1 - 2, 148, hex('#4a5a7a'));
      for (let y = 114; y < 146; y += 6) rect(ax0 + 3, y, ax1 - 3, y, hex('#3a4a66')); }
    // la mesa de madera con sus vetas
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.07 + Math.sin(y * 0.6) * 2 + y * 0.3) > 0.8; pset(x, y, y === 150 ? hex('#c89a64') : v ? hex('#6a4426') : h(x, y, 91) < 0.05 ? hex('#7a4e2c') : hex('#8a5a34')); }
    // la sombra del monitor en la mesa, la carcasa beis redondeada con su luz y su sombra, el bisel hundido
    for (let y = 151; y <= 160; y++) for (let x = 40; x <= 284; x++) pset(x, y, c_mez(R.pget(x, y), C.k, 0.4 - (y - 151) * 0.03));
    const B = hex('#d8ccb0'), BL = hex('#eee4cc'), BS = hex('#b8aa8a'), BSS = hex('#958866');
    for (let y = 22; y <= 158; y++) for (let x = 42; x <= 278; x++) { const dx = Math.max(0, Math.max(50 - x, x - 270)), dy = Math.max(0, Math.max(30 - y, y - 150)); if (dx * dx + dy * dy > 64) continue;
      const borde = dx * dx + dy * dy > 49; let c = borde ? C.k : x < 47 ? BL : x > 273 ? BSS : y < 26 ? BL : y > 154 ? BS : B; if (!borde && h(x, y, 92) < 0.05) c = c_mez(c, BS, 0.5); pset(x, y, c); }
    for (let y = 31; y <= 149; y++) for (let x = 56; x <= 264; x++) { const dx = Math.max(0, Math.max(62 - x, x - 258)), dy = Math.max(0, Math.max(37 - y, y - 143)); if (dx * dx + dy * dy > 49) continue;
      pset(x, y, y < 34 || x < 59 ? BSS : y > 146 || x > 261 ? BL : hex('#3a3830')); }
    // las rejillas, la placa sin letras, los dos mandos y el piloto
    for (let x = 120; x <= 200; x += 3) rect(x, 151, x + 1, 155, BSS);
    rect(70, 151, 98, 155, hex('#a8aeb8')); rect(70, 151, 98, 151, hex('#e8eef4')); rect(72, 153, 96, 153, hex('#8a909a'));
    for (const kx of [236, 252]) { disco(kx, 153, 4, C.k); disco(kx, 153, 3, hex('#5a5048')); disco(kx - 1, 152, 1, hex('#8a8070')); pset(kx, 150, hex('#f0e8d8')); }
    for (let x = 230; x <= 268; x += 4) pset(x, 26, BS);
    // el teclado delante (las teclas en filas), un montón de listado a la derecha y la taza a la izquierda
    rect(84, 164, 236, 179, C.k); rect(85, 165, 235, 179, hex('#c8bca0')); rect(85, 165, 235, 165, hex('#e8dcc4'));
    for (let j = 0; j < 2; j++) for (let i = 0; i < 16; i++) { const kx = 88 + i * 9 + j * 4, ky = 168 + j * 6; if (kx + 7 > 233) continue; rect(kx, ky, kx + 7, ky + 4, hex('#5a5048')); rect(kx + 1, ky, kx + 6, ky + 3, i > 13 ? hex('#a8582a') : hex('#efe6d0')); rect(kx + 1, ky, kx + 6, ky, hex('#ffffff')); }
    for (let k = 0; k < 9; k++) { const y = 160 - k * 2; rect(282, y, 316, y + 1, k & 1 ? C.papelS : C.papel); for (let x = 284; x < 316; x += 5) pset(x, y, hex('#9ac89a')); pset(282, y, C.k); }
    rect(10, 144, 26, 164, C.k); rect(11, 145, 25, 163, hex('#e8e2d4')); rect(11, 145, 13, 163, hex('#ffffff')); rect(23, 145, 25, 163, hex('#a8a296')); rect(11, 145, 25, 146, hex('#4a2a16'));
    rect(26, 149, 30, 158, C.k); rect(27, 150, 29, 157, hex('#e8e2d4')); rect(27, 151, 28, 156, C.k);
    c_util(R, 250, 176, -0.08, 24, 'lapiz', { sombra: true });
  }));
  // las luces de los armarios que parpadean (filas de pilotos)
  for (const ax0 of [4, 290]) for (let j = 0; j < 6; j++) for (let i = 0; i < 6; i++) { const on = h(i + ax0, j, 93 + Math.floor(t * (2 + (i + j) % 3))) < 0.5; R.pset(ax0 + i * 4, 60 + j * 7, on ? (j % 3 === 0 ? hex('#ff6a4a') : hex('#ffd85a')) : hex('#3a3020')); R.pset(ax0 + i * 4 + 1, 60 + j * 7, on ? hex('#fff0c0') : hex('#2a2418')); }
  { const on = Math.sin(t * 3) > -0.8; R.disco(222, 153, 1, on ? hex('#ff4030') : hex('#7a1a10')); if (on) R.pset(221, 152, hex('#ffd0c0')); }
  // la pantalla: el fósforo apagado con líneas de barrido, el moteado, la banda que baja, el abombado (bordes oscuros)
  const [px0, py0, px1, py1] = pan, cx = (px0 + px1) / 2, cy = (py0 + py1) / 2, banda = py0 + ((t * 18) % (py1 - py0 + 30)) - 15, ruido = Math.floor(t * 12);
  for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) { const dx = Math.max(0, Math.max(px0 + 6 - x, x - px1 + 6)), dy = Math.max(0, Math.max(py0 + 6 - y, y - py1 + 6)); if (dx * dx + dy * dy > 36) continue;
    const q = ((x - cx) / (px1 - px0)) ** 2 * 2.2 + ((y - cy) / (py1 - py0)) ** 2 * 2.2, bb = Math.abs(y - banda) < 6 ? 0.05 : 0;
    let g = 0.1 + bb - q * 0.1 + (h(x, y, ruido) < 0.015 ? 0.12 : 0); if (y & 1) g *= 0.7;
    if ((x - x0) % 28 === 0 && x >= x0 && x <= x1 && y >= eje - alto - 4 && y <= eje && (y & 1)) g += 0.08;   // la retícula
    if ((eje - y) % 24 === 0 && y <= eje && y >= eje - alto && x >= x0 && x <= x1 && (x % 3 === 0)) g += 0.08;
    R.pset(x, y, c_fosforo(Math.max(0, g))); }
  // los ejes: el del tiempo con sus seis marcas, el vertical
  for (let x = x0; x <= x1; x++) R.pset(x, eje, c_fosforo(0.55)); for (let y = eje - alto - 4; y <= eje; y++) R.pset(x0, y, c_fosforo(0.55));
  for (let k = 0; k <= 6; k++) { const xm = x0 + k * 28; R.pset(xm, eje + 1, c_fosforo(0.6)); R.pset(xm, eje + 2, c_fosforo(0.6)); }
  // la campana suave punteada (lo que haría un punto que cruza el haz), y la de seis escalones que dibuja el haz
  const bell = (x) => Math.exp(-(((x - (x0 + 3.5 * 28 - 14 + 14)) / 44) ** 2));
  for (let x = x0 + 1; x < x1; x += 2) { const y = Math.round(eje - 30 / 30 * alto * bell(x) * 0.98); if (y < eje) R.pset(x, y, c_fosforo(0.35)); }
  const pts = []; let yA = eje; for (let k = 0; k < 6; k++) { const yk = Math.round(eje - vals[k] / 30 * alto), xa = x0 + k * 28; pts.push([xa, yA], [xa, yk]); yA = yk; } pts.push([x1, yA], [x1, eje]);
  let Lt = 0; for (let i = 1; i < pts.length; i++) Lt += Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]);
  let queda = u * Lt, haz = pts[0], hecho = 0; const recorrido = [];
  for (let i = 1; i < pts.length && queda > 0; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], l = Math.abs(bx - ax) + Math.abs(by - ay), f = Math.min(1, queda / l); queda -= l;
    for (let m = 0; m <= l * f; m++) { const x = Math.round(ax + Math.sign(bx - ax) * m), y = Math.round(ay + Math.sign(by - ay) * m); recorrido.push([x, y, hecho + m]); }
    hecho += l * f; haz = [ax + (bx - ax) * f, ay + (by - ay) * f]; }
  for (const [x, y, d] of recorrido) { const viejo = u < 1 ? Math.min(1, (hecho - d) / 260) : 0; const g = 1 - viejo * 0.45; R.pset(x, y, c_fosforo(g)); c_tine(R, x - 1, y, c_fosforo(0.5), 0.35 * g); c_tine(R, x + 1, y, c_fosforo(0.5), 0.35 * g); c_tine(R, x, y - 1, c_fosforo(0.5), 0.35 * g); }
  if (u > 0 && u < 1) { const [hx, hy] = haz.map(Math.round); R.disco(hx, hy, 2, c_fosforo(0.8)); R.pset(hx, hy, hex('#f0fff0')); R.pset(hx - 1, hy, hex('#c8ffd8')); R.pset(hx + 1, hy, hex('#c8ffd8')); }
  // el 72 debajo del eje, con un relojito, y el cursor que parpadea
  R.numero('72', 162, eje + 13, { centro: true, color: c_fosforo(0.95), sombra: false });
  { const rx = 182, ry = eje + 9; for (let a = 0; a < 6.3; a += 0.4) R.pset(Math.round(rx + Math.cos(a) * 3), Math.round(ry + Math.sin(a) * 3), c_fosforo(0.75)); R.pset(rx, ry - 1, c_fosforo(0.9)); R.pset(rx, ry - 2, c_fosforo(0.9)); R.pset(rx + 1, ry, c_fosforo(0.9)); }
  if (Math.floor(t * 2.2) % 2) for (let y = py1 - 10; y <= py1 - 6; y++) for (let x = px0 + 8; x <= px0 + 11; x++) R.pset(x, y, c_fosforo(0.85));
  // el reflejo del cristal: una franja diagonal clara arriba a la izquierda y un brillo en la esquina
  for (let k = 0; k < 26; k++) for (let j = 0; j < 3; j++) c_tine(R, px0 + 14 + k + j, py0 + 34 - k, hex('#d8ffe8'), 0.09);
  for (let k = 0; k < 6; k++) c_tine(R, px0 + 9 + k, py0 + 4, hex('#ffffff'), 0.25);
  return { pantalla: [...pan], curva: [x0, eje - alto, x1, eje], cima: [x0 + 3 * 28 + 14, eje - alto] };
}

// el verde del fósforo con su intensidad g (0 apagado … 1 encendido a tope)
const c_FOS = []; for (let i = 0; i <= 32; i++) { const g = i / 32; c_FOS.push(hex('#' + [Math.round(6 + 140 * g ** 1.6), Math.round(18 + 237 * g), Math.round(10 + 140 * g ** 1.4)].map((v) => Math.min(255, v).toString(16).padStart(2, '0')).join(''))); }

const c_fosforo = (g) => c_FOS[Math.max(0, Math.min(32, Math.round(g * 32)))];

// la paleta del cielo (D): el cielo de noche en siete tonos, la Vía Láctea, las estrellas (blancas, azules, cálidas), las
// siluetas del campo, el prado de noche, el maíz, el hidrógeno (de oscuro a encendido), el magnetar, los cometas, la
// madera y el cristal de la radio, la baquelita, la tela del altavoz, la pared y la mesa del cuarto, el calendario
const d_hx = (a) => a.map(hex);

const d_P = {
  noche: d_hx(['#05071a', '#080b22', '#0c112c', '#111836', '#172042', '#1e2a50', '#28365e', '#33426a']),
  via: d_hx(['#2a3460', '#3c4a78', '#56669a', '#7c8cbc', '#b4c0e0']), polvo: hex('#0a0d20'),
  est: hex('#ffffff'), estA: hex('#c4ccec'), estB: hex('#8c96c4'), estAz: hex('#a8c4ff'), estC: hex('#ffe2b4'), estR: hex('#ffb4a0'),
  sil: d_hx(['#04060e', '#080b18', '#0e1324', '#151c32']), prado: d_hx(['#0c1616', '#12201c', '#1a2c24', '#24382c', '#30483a']),
  maiz: d_hx(['#141c12', '#1e2a18', '#3a3a24']), luz: d_hx(['#ffd890', '#f0b450', '#a8743a']), luciernaga: d_hx(['#e8ff8a', '#9ac04a']),
  hid: d_hx(['#170f30', '#22143e', '#2e1a50', '#3e2266', '#542c80', '#7038a0', '#9450c4', '#c07ae4', '#e8b4ff', '#fbe8ff']),
  neb: d_hx(['#0e1838', '#14224a', '#1c2e5c']), mag: d_hx(['#ffffff', '#cdeeff', '#8ad0ff', '#4a8ad0', '#2a4a8a']),
  alu: d_hx(['#1c2234', '#2a3248', '#3e4862', '#5a6684', '#8a96b4']),
  madera: d_hx(['#2a1408', '#3e200e', '#552e14', '#6e3e1c', '#8a5026', '#a66632', '#c07e42']),
  laton: d_hx(['#5a3e14', '#8a6420', '#c09a3a', '#f0d070']), escala: d_hx(['#7a5a2a', '#b08848', '#d8b46a', '#ecd292', '#f8e8b8', '#fff8e0']),
  espectro: d_hx(['#1a2030', '#24304a', '#304468', '#40608e', '#5a82b8', '#86aae0']), raya: d_hx(['#ffffff', '#c8f4ff', '#70d8ff']),
  baq: d_hx(['#120c08', '#24180e', '#3a2a1c', '#5a4430', '#8a7258']), tela: d_hx(['#2a2016', '#3a2e20', '#4c3c2a', '#5e4c36']),
  pared: d_hx(['#2a2232', '#30283a', '#383042', '#40384a']), mesa: d_hx(['#2e1a0e', '#40240f', '#563218', '#6c4220', '#84542a']),
  rojo: hex('#e03a2a'), rojoS: hex('#8a1a14'), ambar: hex('#ffb43a'), papel: d_hx(['#a89c84', '#cfc4a8', '#ece4cc', '#faf6e8']),
  bloque: d_hx(['#3a3a44', '#46464e', '#52525a', '#5e5e66']), k: hex('#06060c'),
};

const d_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_bay = (x, y) => d_BAYER[((y & 3) << 2) | (x & 3)];

// ruido de valor suave (bilineal sobre la rejilla de h): de 0 a 1
const d_vr = (x, y, k = 0) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

// las zonas tranquilas: la de Atom y la barra del año (con sus cifras)
const d_quieto = (x, y) => (x >= 272 && y <= 48) || (x >= 14 && x <= 176 && y <= 20);

const d_cl = (v, a, b) => Math.max(a, Math.min(b, v));

// los fondos fijos, uno por vista: se pintan una vez en su búfer y se copian en cada fotograma
const d_capas = new Map();

function d_fijo(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(R.buf); R.usar(prev); d_capas.set(clave, b); }
  R.copiar(b);
}

// el cielo de noche tramado en la caja (sobre el búfer B): degradado de tonos (o.tonos; o.ini/o.fin, donde empieza y
// acaba de aclararse), nubecillas de ruido, la Vía Láctea (o.via: { a: [x, y], b: [x, y], w, nucleo: [x, y, r] }) con su
// resplandor tramado, su grieta de polvo oscuro y sus estrellitas apretadas, y estrellas fijas de tres brillos y colores.
// En la esquina de Atom y bajo la barra del año, todo más apagado
function d_cieloNoche(B, x0, y0, x1, y1, k, o = {}) {
  const T = o.tonos || d_P.noche, ini = o.ini ?? y0, fin = o.fin ?? y1, V = o.via, base = o.base ?? 0;
  let ax = 0, ay = 0, vx = 1, vy = 0, vl = 1;
  if (V) { [ax, ay] = V.a; vx = V.b[0] - ax; vy = V.b[1] - ay; vl = Math.hypot(vx, vy); vx /= vl; vy /= vl; }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const f = d_cl((y - ini) / Math.max(1, fin - ini), 0, 1);
    let v = base + f * f * (T.length - 2.2) + (d_vr(x / 26, y / 12, k) - 0.5) * 0.9 + (d_vr(x / 9, y / 9, k + 7) - 0.5) * 0.35;
    let polvo = false, g = 0;
    if (V) {
      const s = (x - ax) * vx + (y - ay) * vy, d = (x - ax) * vy - (y - ay) * vx, w = V.w * (0.8 + 0.4 * d_vr(s / 40, 0, k + 3));
      g = Math.exp(-((d / w) ** 2)); const n = d_vr(x / 7, y / 7, k + 1) * 0.6 + d_vr(x / 3, y / 3, k + 2) * 0.4;
      v += g * (n * 3.2 + 0.8) * (o.viaF ?? 1);
      if (V.nucleo) { const [nx, ny, nr] = V.nucleo; v += 3.4 * Math.exp(-(((x - nx) / nr) ** 2) - (((y - ny) / (nr * 0.7)) ** 2)) * (0.6 + n * 0.6); }
      const grieta = Math.exp(-(((d - w * 0.15) / (w * 0.22)) ** 2)) * g; polvo = grieta > 0.45 && d_vr(x / 8, y / 5, k + 4) > 0.38;
      if (polvo) v -= 1.6 * grieta;
    }
    if (d_quieto(x, y)) v = Math.min(v, base + 1.2 + f);
    const l = d_cl(Math.floor(v + d_bay(x, y)), 0, T.length - 1);
    B[y * 320 + x] = polvo && l < 2 ? d_P.polvo : T[l];
    if (V && g > 0.3 && !polvo && !d_quieto(x, y) && h(x, y, k + 9) < 0.09 * g) B[y * 320 + x] = h(x, y, k + 10) < 0.5 ? d_P.via[3] : d_P.via[2];
  }
  const n = Math.round((x1 - x0) * (y1 - y0) / (o.cada ?? 55));
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.floor(h(i, 6, k) * (x1 - x0 + 1)), y = y0 + Math.floor(h(i, 7, k) * (y1 - y0 + 1)), b = h(i, 8, k), q = d_quieto(x, y);
    const c = h(i, 9, k) < 0.12 ? d_P.estC : h(i, 9, k) < 0.18 ? d_P.estR : h(i, 9, k) < 0.32 ? d_P.estAz : d_P.estA;
    if (b > 0.975 && !q) { for (const [i2, j2] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) B[(y + j2) * 320 + x + i2] = d_P.estB; B[y * 320 + x] = c; }
    else if (b > 0.85 && !q) B[y * 320 + x] = c; else B[y * 320 + x] = b > 0.45 && !q ? d_P.estB : d_P.via[1];
  }
}

// estrellas que titilan encima del fondo fijo (n, en la caja; ninguna en las zonas tranquilas): unas se encienden en
// blanco con su cruz, otras en azul o cálidas
function d_titila(R, t, x0, y0, x1, y1, k, n = 40, fuera = null) {
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.floor(h(i, 1, k + 50) * (x1 - x0)), y = y0 + Math.floor(h(i, 2, k + 50) * (y1 - y0)); if (d_quieto(x, y) || (fuera && fuera(x, y))) continue;
    const s = Math.sin(t * (1.4 + h(i, 3, k) * 2.6) + i * 2.3); if (s < 0.1) continue;
    const c = h(i, 4, k) < 0.2 ? d_P.estAz : h(i, 4, k) < 0.3 ? d_P.estC : d_P.est;
    R.pset(x, y, s > 0.7 ? c : d_P.estA);
    if (s > 0.9 && i % 3 === 0) { R.pset(x - 1, y, d_P.estB); R.pset(x + 1, y, d_P.estB); R.pset(x, y - 1, d_P.estB); R.pset(x, y + 1, d_P.estB); }
  }
}

// una estrella fugaz (un meteoro) cada «cada» segundos, que dura 0,6 s, de p0 a p1
function d_fugaz(R, t, cada, fase, p0, p1) {
  const u = ((t + fase) % cada) / 0.6; if (u > 1) return;
  for (let i = 0; i < 14; i++) { const v = u - i * 0.022; if (v < 0) break; const x = Math.round(lerp(p0[0], p1[0], v)), y = Math.round(lerp(p0[1], p1[1], v)); if (!d_quieto(x, y)) R.pset(x, y, i === 0 ? d_P.est : i < 4 ? d_P.via[4] : d_P.via[2]); }
}

// nubes de noche, alargadas y finas, en tres tonos (sombra, cuerpo y el filo que encienden las estrellas): n nubes en la
// franja y0–y1, cada una a su velocidad; o.no(x, y): dónde no se pintan
function d_nubesNoche(R, t, y0, y1, n, k, tonos, no = null) {
  for (let i = 0; i < n; i++) {
    const w = 30 + Math.round(h(i, 1, k) * 40), v = 1.2 + h(i, 2, k) * 2.6, cx = ((h(i, 3, k) * 420 + t * v) % 420) - 50, cy = y0 + Math.round(h(i, 4, k) * (y1 - y0));
    for (let j = -3; j <= 3; j++) for (let x = Math.round(cx - w / 2); x <= Math.round(cx + w / 2); x++) {
      const e = Math.abs(x - cx) / (w / 2), alto = (1 - e * e) * (2.4 + d_vr(x / 6, i, k) * 1.6); if (Math.abs(j) > alto) continue; const y = cy + j;
      if (x < 0 || x > 319 || d_quieto(x, y) || (no && no(x, y))) continue;
      const c = j < -alto + 1 ? tonos[2] : j > alto * 0.3 ? tonos[0] : tonos[1]; if ((x + y) % 2 === 0 || Math.abs(j) < alto - 1) R.pset(x, y, c);
    }
  }
}

// una mata de hierba de noche de ancho w con la base en (x, y): hojas que se mecen con el viento en tres tonos
function d_mata(R, t, x, y, w, tonos, k) {
  for (let i = 0; i < w; i++) { const alt = 4 + Math.round(h(i, 1, k) * 10 * (1 - Math.abs(i - w / 2) / (w / 2 + 2))), sw = Math.round(Math.sin(t * 1.6 + i * 0.5 + k) * (alt / 6));
    R.linea(x + i, y, x + i + sw, y - alt, tonos[i % 3 === 0 ? 2 : i % 2 ? 1 : 0]); }
}

// la gran oreja en miniatura, de lejos y de noche (canon): a la izquierda el reflector plano inclinado (celosía de vigas
// con su chapa), en medio el suelo de aluminio que brilla y refleja las estrellas, a la derecha el reflector curvo más
// bajo con sus costillas y, entre los dos, el carro de las bocinas. (x, y): la esquina de abajo a la izquierda; w: ancho
function d_orejaMini(B, x, y, w, k) {
  const P = d_P, A = P.alu, hF = Math.round(w * 0.24), xF = x + Math.round(w * 0.26), xC = x + Math.round(w * 0.8), hC = Math.round(w * 0.13);
  const put = (X, Y, c) => { if (X >= 0 && X < 320 && Y >= 0 && Y < 180) B[Y * 320 + X] = c; };
  // el suelo de aluminio, un lago de metal con su rejilla y las estrellas reflejadas
  for (let j = 0; j < 6; j++) for (let X = xF - 2 + j; X <= xC - j; X++) { const Y = y - j, ref = d_vr(X / 5, Y, k) > 0.55; put(X, Y, (X - xF + j) % 7 === 0 ? A[1] : j === 5 ? A[3] : (h(X, Y, k) < 0.07 ? P.est : ref ? A[4] : j % 2 ? A[3] : A[2])); }
  for (let X = xF; X <= xC; X++) put(X, y + 1, A[0]);
  // el reflector plano: un muro de celosía, alto e inclinado hacia atrás
  for (let j = 0; j <= hF; j++) { const sh = -Math.round(j * 0.45); for (let X = x + 4 + sh; X <= xF + sh; X++) { const i = X - x - sh;
    const viga = j === 0 || j === hF || i % 5 === 0 || j % 4 === 0, diag = (i + j) % 5 === 0 || (i - j + 50) % 5 === 0;
    put(X, y - j, viga ? (j > hF - 2 || i % 5 === 0 && j % 2 ? P.estA : A[4]) : diag ? A[3] : (j % 2 ? A[1] : A[0])); } }
  // los puntales de atrás que lo sujetan
  for (let j = 0; j <= hF; j++) { const sh = -Math.round(j * 0.45); put(x + 4 + sh - 1, y - j, A[0]); if (j % 3 === 0) put(x + 4 + sh - 2 - Math.round((hF - j) * 0.1), y - j, A[1]); }
  // el reflector curvo: más bajo, de chapa con costillas y el borde de arriba en arco
  for (let X = xC; X <= x + w; X++) { const u = (X - xC) / (x + w - xC), alt = Math.round(hC * (0.35 + 0.65 * u * u)); for (let j = 0; j <= alt; j++) put(X, y - j, j === alt ? A[4] : (X - xC) % 3 === 0 ? A[3] : A[1]); }
  // el carro de las bocinas: dos embudos junto al reflector curvo
  for (const bx of [xC - 7, xC - 4]) { put(bx, y - 4, A[4]); put(bx + 1, y - 4, A[3]); put(bx, y - 5, A[3]); put(bx + 1, y - 5, A[2]); }
}

// la caseta de los receptores en miniatura (bloques, tejado plano, una ventana encendida y su antena); (x, y): abajo
function d_casetaMini(R, t, x, y, k) {
  const P = d_P; R.rect(x, y - 7, x + 10, y, P.sil[2]); R.rect(x - 1, y - 8, x + 11, y - 8, P.alu[1]); R.linea(x + 8, y - 8, x + 8, y - 15, P.alu[2]); R.pset(x + 8, y - 15, Math.sin(t * 3 + k) > 0 ? P.rojo : P.rojoS);
  const on = Math.sin(t * 0.7 + k) > -0.85; R.rect(x + 2, y - 5, x + 4, y - 3, on ? P.luz[0] : P.luz[2]); R.pset(x + 3, y - 4, on ? P.luz[1] : P.luz[2]);
}

// ─ sagitario · general: el cielo de verano desde un campo de Ohio ─
// La tetera de Sagitario (posiciones de verdad, mirando al sur: el asa a la izquierda, al este; el pico a la derecha,
// al oeste) y, junto a él, el centro de la galaxia: la Vía Láctea sube desde el horizonte como el vapor de la tetera
const d_TETERA = { gam: [234, 108], del: [215, 105], eps: [212, 130], lam: [207, 80], phi: [186, 89], sig: [174, 85], tau: [160, 93], zet: [165, 105] };

const d_TETERA_L = [['gam', 'del'], ['gam', 'eps'], ['del', 'eps'], ['del', 'lam'], ['lam', 'phi'], ['phi', 'del'], ['phi', 'sig'], ['sig', 'tau'], ['tau', 'zet'], ['zet', 'phi'], ['zet', 'eps']];

function d_cieloSagitario(R, t, o) {
  const P = d_P;
  d_fijo(R, 'sagitario', (B) => {
    d_cieloNoche(B, 0, 0, 319, 159, 37, { ini: 0, fin: 150, via: { a: [262, 150], b: [118, 0], w: 24, nucleo: [254, 114, 30] }, viaF: 1.7, cada: 75 });
    // el resplandor del horizonte (un pueblo lejos a la derecha, cálido y tenue)
    for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) { const g = Math.exp(-(((x - 300) / 70) ** 2)) * (y - 120) / 30; if (g > d_bay(x, y) + 0.35) B[y * 320 + x] = (y > 140 && g > 0.7) ? hex('#3a3450') : hex('#2c2a4a'); }
    // la línea de árboles lejana, en silueta, con su borde de copas
    for (let x = 0; x < 320; x++) { const top = 146 - Math.round(d_vr(x / 9, 0, 41) * 7 + d_vr(x / 3, 1, 42) * 2 + (x > 96 && x < 150 ? 4 : 0)); for (let y = top; y < 150; y++) B[y * 320 + x] = y === top ? P.sil[2] : P.sil[1]; }
    // la granja a la derecha: el granero con su tejado a dos aguas, el silo con su cúpula y la casa
    for (let y = 133; y < 150; y++) for (let x = 262; x < 284; x++) { const tj = 133 + Math.abs(x - 273) * 0.55; if (y >= tj) B[y * 320 + x] = (x - 262) % 4 === 0 ? P.sil[0] : P.sil[2]; }
    for (let y = 122; y < 150; y++) for (let x = 286; x < 293; x++) B[y * 320 + x] = x === 286 ? P.sil[3] : (y % 4 === 0 ? P.sil[1] : P.sil[2]);
    for (let x = 286; x < 293; x++) B[121 * 320 + x] = P.sil[3]; for (let x = 287; x < 292; x++) B[120 * 320 + x] = P.sil[3];
    for (let y = 138; y < 150; y++) for (let x = 296; x < 314; x++) { const tj = 138 + Math.abs(x - 305) * 0.6; if (y >= tj) B[y * 320 + x] = P.sil[1]; }
    // el campo: la gran oreja diminuta a la izquierda, el maizal en filas y el prado delante
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) {
      let c;
      if (y < 160) { const fila = (x + Math.round((y - 150) * 1.8)) % 5; c = fila === 0 ? P.maiz[0] : (h(x, y, 43) < 0.2 ? P.maiz[1] : P.sil[2]); if (y === 150) c = P.sil[3]; }
      else { const v = (y - 160) / 20 * 2.2 + d_vr(x / 10, y / 4, 44) * 1.4 + (h(x, y, 45) - 0.5) * 0.8; c = P.prado[d_cl(Math.floor(v + d_bay(x, y)), 0, 3)]; if (h(x, y, 46) < 0.05) c = P.prado[4]; }
      B[y * 320 + x] = c;
    }
    d_orejaMini(B, 14, 151, 72, 47);
    // el camino de tierra que cruza el prado hacia la oreja
    for (let y = 160; y < 180; y++) { const cx = 60 + (y - 160) * 1.6 + Math.sin(y * 0.4) * 1.5, w = 1 + (y - 160) * 0.35; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) if (x >= 0 && x < 320) B[y * 320 + x] = (h(x, y, 48) < 0.25) ? P.prado[1] : hex('#2a2c2a'); }
    // los postes de la valla, que se pierden hacia la granja
    for (let i = 0; i < 9; i++) { const px = 200 + i * 13, py = 164 - i; for (let j = 0; j < 7 - Math.floor(i / 3); j++) B[(py - j) * 320 + px] = P.sil[0]; if (i < 8) for (let x = px; x < px + 13; x++) B[(py - 4 + Math.round((x - px) / 13)) * 320 + x] = P.sil[1]; }
    const put = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };
    // el prado de verano: matas de hierba que crecen hacia delante, flores silvestres (zanahoria blanca y achicoria
    // azul) que recogen la luz de las estrellas y piedras con su filo claro
    for (let i = 0; i < 560; i++) { const x = Math.floor(h(i, 1, 170) * 320), y = 161 + Math.floor(h(i, 2, 170) ** 0.8 * 19), p = (y - 160) / 20, alt = 1 + Math.round(p * 4 * h(i, 3, 170)), sw = i % 3 - 1;
      for (let j = 0; j < alt; j++) put(x + (j > alt / 2 ? sw : 0), y - j, j === alt - 1 ? P.prado[4] : P.prado[3]); put(x + 1, y, P.prado[0]); }
    for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 171) * 320), y = 162 + Math.floor(h(i, 2, 171) * 17); if (y > 170 && x > 52 && x < 100) continue; const c = i % 4 === 0 ? hex('#7a8ac8') : hex('#c8ccd8');
      put(x, y, c); if (y > 170) { put(x + 1, y, c); put(x, y - 1, hex('#e8ecf4')); put(x, y + 1, P.prado[1]); } }
    for (let i = 0; i < 12; i++) { const x = Math.floor(h(i, 1, 172) * 310) + 5, y = 164 + Math.floor(h(i, 2, 172) * 14), w = 1 + (i % 3);
      for (let a = -w; a <= w; a++) { put(x + a, y, hex('#2a3038')); put(x + a, y + 1, P.sil[1]); } put(x - w + 1, y - 1, hex('#5a6478')); }
    // las pacas redondas de heno del prado segado, con su espiral y el filo de luz arriba
    for (const [bx, by, r] of [[158, 162, 3], [171, 161, 3], [184, 163, 4], [264, 164, 4]]) { for (let j = -r; j <= r; j++) for (let i = -r - 1; i <= r + 1; i++) { if ((i / (r + 1)) ** 2 + (j / r) ** 2 > 1) continue;
      put(bx + i, by + j, j < -r + 1 ? hex('#6a6448') : (Math.round(Math.hypot(i, j * 1.2)) % 2) ? hex('#3a3626') : hex('#4a4430')); }
      for (let i = -r - 1; i <= r + 1; i++) put(bx + i, by + r + 1, P.sil[0]); }
    // el charco de la última tormenta, que refleja el cielo
    for (let j = 0; j <= 4; j++) for (let i = -16 + j; i <= 16 - j; i++) put(274 + i, 172 + j, j === 0 ? P.prado[0] : (h(i, j, 173) < 0.12 ? P.estA : j < 2 ? P.noche[6] : P.noche[5]));
  });
  // vida: estrellas que titilan, un meteoro, las nubes finas bajas, el maizal que se mece, la granja y los coches
  d_titila(R, t, 0, 0, 320, 140, 51, 60);
  d_fugaz(R, t, 7.5, 2.2, [70, 30], [20, 64]);
  d_nubesNoche(R, t, 134, 144, 4, 52, [P.noche[3], P.noche[5], P.noche[7]], (x, y) => x > 150 && x < 245 && y < 133);
  for (let x = 0; x < 320; x += 3) { if (x > 12 && x < 90) continue; const s = Math.round(Math.sin(t * 1.4 + x * 0.09) * 1.2); R.pset(x + s, 150, P.maiz[2]); R.pset(x + s + 1, 149, P.maiz[1]); }
  { const v = Math.sin(t * 0.5) > -0.6; R.pset(300, 143, v ? P.luz[0] : P.luz[2]); R.pset(301, 143, v ? P.luz[1] : P.luz[2]); R.pset(266, 145, P.luz[2]); }
  { const u = ((t * 0.07) % 1), cx = Math.round(330 - u * 360); if (cx > 96 && cx < 320) { R.pset(cx, 147, P.luz[0]); R.pset(cx + 2, 147, P.luz[0]); R.pset(cx - 1, 147, P.luz[2]); } }
  d_casetaMini(R, t, 88, 151, 3);
  // el viento en el prado: una ola que pasa y levanta las puntas de la hierba; las estrellas del charco que tiemblan
  { const ola = (t * 32) % 420 - 50; for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 174) * 320), y = 162 + Math.floor(h(i, 2, 174) * 17), cerca = Math.abs(x - ola) < 26, s = Math.round(Math.sin(t * 2 + x * 0.2) * (cerca ? 2 : 1));
    R.pset(x + s, y - 2, cerca ? hex('#4a6a54') : P.prado[4]); R.pset(x + Math.round(s / 2), y - 1, P.prado[3]); } }
  for (let k = 0; k < 6; k++) { const x = 262 + Math.round(h(k, 1, 175) * 24), y = 173 + Math.round(h(k, 2, 175) * 2), s = Math.sin(t * 3 + k * 1.9); if (s > 0.2) R.pset(x + Math.round(Math.sin(t * 2 + k)), y, s > 0.7 ? P.est : P.estB); }
  // las luciérnagas sobre el prado
  for (let i = 0; i < 12; i++) { const s = Math.sin(t * (1.1 + h(i, 1, 53)) + i * 1.7); if (s < 0.3) continue; const x = Math.round(h(i, 2, 53) * 320 + Math.sin(t * 0.4 + i) * 6), y = Math.round(154 + h(i, 3, 53) * 22 + Math.cos(t * 0.6 + i) * 3); R.pset(x, y, s > 0.75 ? P.luciernaga[0] : P.luciernaga[1]); }
  // la tetera: sus ocho estrellas (las más brillantes con su cruz), las líneas finas que se encienden con o.lineas
  const ln = d_cl(o.lineas ?? 0, 0, 1);
  if (ln > 0) d_TETERA_L.forEach(([a, b], i) => { const u = d_cl(ln * d_TETERA_L.length - i, 0, 1); if (u <= 0) return; const [x0, y0] = d_TETERA[a], [x1, y1] = d_TETERA[b], n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * u);
    for (let s = 2; s < n - 1; s++) { const f = s / Math.hypot(x1 - x0, y1 - y0); if (s % 3 !== 2) R.pset(Math.round(lerp(x0, x1, f)), Math.round(lerp(y0, y1, f)), u >= 1 ? hex('#7aa0d8') : hex('#b8d0f4')); } });
  Object.entries(d_TETERA).forEach(([nom, [x, y]], i) => { const br = 0.75 + 0.25 * Math.sin(t * 2.1 + i * 1.9), grande = nom === 'eps' || nom === 'sig' || nom === 'zet' || nom === 'del';
    R.pset(x, y, P.est); for (const [i2, j2] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(x + i2, y + j2, br > 0.8 || grande ? P.estA : P.estB);
    if (grande && br > 0.85) { R.pset(x - 2, y, P.estB); R.pset(x + 2, y, P.estB); R.pset(x, y - 2, P.estB); R.pset(x, y + 2, P.estB); } });
  // los dos puntos posibles de la señal: dos círculos finos discontinuos, en diagonal, que se dibujan juntos (o.puntos)
  const pu = d_cl(o.puntos ?? 0, 0, 1), g = V_CIELO.sagitario.general.geo;
  if (pu > 0) for (const [cx, cy] of [g.punto1, g.punto2]) { const r = 6, fin = pu * Math.PI * 2;
    for (let a = 0; a < fin; a += 0.09) { if (Math.floor(a / 0.36) % 2) continue; R.pset(Math.round(cx + Math.cos(a - Math.PI / 2) * r), Math.round(cy + Math.sin(a - Math.PI / 2) * r), pu >= 1 && Math.sin(t * 4) > 0.6 ? hex('#ffe08a') : P.ambar); }
  }
  return {};
}
// ─ sagitario · dial: la radio antigua de cerca, sobre su mesa ─
// la escala va de 1300 a 1520 (un píxel por unidad) entre x 50 y 270: la raya del hidrógeno, en 1420, cae en x 170
const d_DIAL = { x0: 50, f0: 1300, raya: 170, emisoras: [[72, 9, 0.8], [104, 14, 1], [131, 6, 0.6], [214, 16, 0.9], [246, 10, 0.7], [263, 6, 0.5]] };

function d_dialRadio(R, t, o) {
  const P = d_P, cx0 = 10, cx1 = 310, cy0 = 22, cy1 = 162;
  d_fijo(R, 'dial', (B) => {
    // la pared del cuarto (papel pintado de rayas finas, tranquilo) y la mesa con sus vetas
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      let c;
      if (y < 164) { const ra = (x % 12) < 6 ? 1 : 0, luzL = Math.exp(-(((x - 160) / 150) ** 2)) * 1.3; c = P.pared[d_cl(Math.floor(ra * 0.6 + luzL + (d_vr(x / 20, y / 20, 61) - 0.5) * 0.4 + d_bay(x, y) * 0.8), 0, 3)]; if (x >= 272 && y <= 48) c = P.pared[1 + ((x % 12) < 6 ? 1 : 0)]; }
      else { const veta = Math.sin((x * 0.05 + d_vr(x / 30, y / 2, 62) * 3) * 3.1) * 0.5 + 0.5; c = P.mesa[d_cl(Math.floor(1 + veta * 2.2 + (y - 164) / 16 + d_bay(x, y) * 0.7), 0, 4)]; if (y === 164) c = P.mesa[4]; if (y === 165) c = P.mesa[0]; }
      B[y * 320 + x] = c;
    }
    // la sombra de la radio en la pared y en la mesa
    for (let y = cy0 + 4; y < 164; y++) for (let x = cx1 + 1; x < Math.min(319, cx1 + 6); x++) if ((x + y) % 2 === 0) B[y * 320 + x] = P.pared[0];
    for (let y = 164; y < 170; y++) for (let x = cx0 + 4; x < cx1 + 6; x++) B[y * 320 + x] = (y < 167 || (x + y) % 2) ? P.mesa[0] : P.mesa[1];
    // el mueble de nogal: esquinas redondeadas, chapa con vetas (más tranquilas en la esquina de Atom), filo claro arriba
    const rr = 12;
    for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) {
      const dx = x < cx0 + rr ? cx0 + rr - x : x > cx1 - rr ? x - (cx1 - rr) : 0, dy = y < cy0 + rr ? cy0 + rr - y : 0; if (dx && dy && dx * dx + dy * dy > rr * rr) continue;
      const q = x >= 268 && y <= 50, veta = Math.sin((y * 0.22 + d_vr(x / 46, y / 9, 63) * 5 + d_vr(x / 12, y / 30, 64) * 1.2) * 2.3) * 0.5 + 0.5;
      let v = 2.2 + veta * (q ? 0.8 : 2.2) + (h(x >> 1, y, 65) - 0.5) * (q ? 0.2 : 0.6) - (x - cx0) / (cx1 - cx0) * 0.8;
      if (y < cy0 + 3) v += 1.4; if (x < cx0 + 3) v += 0.8; if (x > cx1 - 3 || y > cy1 - 3) v -= 1.2;
      B[y * 320 + x] = P.madera[d_cl(Math.floor(v + d_bay(x, y) * 0.9), 0, 6)];
    }
    // la moldura de arriba y el zócalo con sus patas
    for (let x = cx0 + 8; x <= cx1 - 8; x++) { B[(cy0 + 6) * 320 + x] = P.madera[1]; B[(cy0 + 7) * 320 + x] = P.madera[5]; B[(cy1 - 8) * 320 + x] = P.madera[1]; B[(cy1 - 7) * 320 + x] = P.madera[5]; }
    for (const px of [cx0 + 10, cx1 - 30]) for (let y = cy1 + 1; y < 166; y++) for (let x = px; x < px + 20; x++) B[y * 320 + x] = y === cy1 + 1 ? P.madera[4] : P.madera[x < px + 3 ? 3 : 1];
    // el bisel de latón alrededor del cristal
    for (let y = 34; y <= 104; y++) for (let x = 24; x <= 296; x++) { const e = Math.min(x - 24, 296 - x, y - 34, 104 - y); if (e > 5) continue; B[y * 320 + x] = e === 0 ? P.laton[0] : e === 1 ? (y < 40 || x < 30 ? P.laton[3] : P.laton[1]) : e === 5 ? P.k : (y < 40 || x < 30 ? P.laton[2] : P.laton[1]); }
    // el cristal de la escala, iluminado por detrás (más claro en el centro), con la pátina en las esquinas
    for (let y = 40; y <= 98; y++) for (let x = 30; x <= 290; x++) { const g = Math.exp(-(((x - 160) / 150) ** 2) - (((y - 66) / 50) ** 2)), pat = d_vr(x / 14, y / 10, 66) * 0.6; B[y * 320 + x] = P.escala[d_cl(Math.floor(1.6 + g * 3.6 - pat + d_bay(x, y) * 0.8), 0, 5)]; }
    // la ventana del espectro (vidrio ahumado) donde se ven las emisoras naturales
    for (let y = 70; y <= 94; y++) for (let x = 36; x <= 284; x++) B[y * 320 + x] = (y === 70 || y === 94 || x === 36 || x === 284) ? P.escala[0] : P.espectro[d_cl(Math.floor(0.4 + d_vr(x / 5, y / 4, 67) * 0.9 + d_bay(x, y) * 0.5), 0, 1)];
    // las rayitas de la escala (cada 5, más largas cada 10 y cada 50) y las cifras de cada 50 (sin unidades)
    for (let f = 1300; f <= 1520; f += 5) { const x = d_DIAL.x0 + f - d_DIAL.f0, l = f % 50 === 0 ? 7 : f % 10 === 0 ? 5 : 3; if (Math.abs(x - d_DIAL.raya) < 9) continue; for (let j = 0; j < l; j++) B[(68 - j) * 320 + x] = P.escala[0]; }
    // la cinta de tela con su cordel que mueve la aguja, por debajo de la ventana
    for (let x = 36; x <= 284; x++) B[96 * 320 + x] = (x % 4 === 0) ? P.escala[1] : P.escala[0];
    // el altavoz: un calado de madera (lamas verticales con el arco arriba, asimétrico) sobre la tela
    for (let y = 114; y <= 152; y++) for (let x = 70; x <= 210; x++) {
      const arco = 114 + Math.round(((x - 140) / 70) ** 2 * 8); if (y < arco) continue;
      const lama = (x - 70) % 9 < 3, tela = ((x + y) % 2 === 0 ? 1 : 0) + (x % 3 === 0 ? 1 : 0) + (y % 3 === 0 ? 0 : 1) - 1;
      B[y * 320 + x] = (y === arco || y === 152 || x === 70 || x === 210) ? P.madera[0] : lama ? P.madera[(x - 70) % 9 === 0 ? 5 : 3] : P.tela[d_cl(tela, 0, 3)];
    }
    // la placa de latón de la marca (sin letras: una estrella y dos rayas)
    for (let y = 108; y <= 111; y++) for (let x = 126; x <= 154; x++) B[y * 320 + x] = y === 108 ? P.laton[3] : P.laton[1];
    // los mandos: el selector de banda (una palanca) a la izquierda y un mando de volumen pequeño; el sintonizador
    // grande a la derecha (se pinta con su giro en cada fotograma)
    for (let y = 126; y <= 146; y++) for (let x = 28; x <= 52; x++) { const d = Math.hypot(x - 40, y - 136); if (d > 10.5) continue; B[y * 320 + x] = d > 9.5 ? P.baq[0] : P.baq[d_cl(Math.floor(3 - (x - 40 + y - 136) / 7 + d_bay(x, y) * 0.6), 0, 4)]; }
    for (let y = 118; y <= 130; y++) for (let x = 224; x <= 236; x++) B[y * 320 + x] = (x === 224 || x === 236 || y === 118 || y === 130) ? P.laton[0] : P.laton[1];
  });
  // las cifras de la escala, impresas en marrón (cifras de verdad, sin unidades)
  for (let f = 1300; f <= 1500; f += 50) { if (f === 1400) continue; R.numero(String(f), d_DIAL.x0 + f - d_DIAL.f0, 54, { centro: true, color: P.escala[0], sombra: false }); }
  R.numero('1400', d_DIAL.x0 + 100, 54, { centro: true, color: P.escala[0], sombra: false });
  // las emisoras naturales: manchas anchas y borrosas que respiran; y la RAYA fina y brillante del hidrógeno
  const brillo = (x) => { let v = 0; for (const [ex, w, a] of d_DIAL.emisoras) v += a * (0.8 + 0.2 * Math.sin(t * 1.7 + ex)) * Math.exp(-(((x - ex) / w) ** 2)); return v; };
  R.recorte([37, 71, 283, 93]);
  for (let x = 37; x <= 283; x++) { const v = brillo(x); if (v < 0.08) continue; for (let y = 71; y <= 93; y++) { const ruido = (h(x, y + Math.floor(t * 12), 68) - 0.5) * 0.7, vv = v * 4.4 * (1 - Math.abs(y - 82) / 22) + ruido; if (vv + d_bay(x, y) > 1) R.pset(x, y, P.espectro[d_cl(Math.floor(1 + vv), 2, 5)]); } }
  const fl = 0.85 + 0.15 * Math.sin(t * 9), rx = d_DIAL.raya;
  for (let y = 71; y <= 93; y++) { R.pset(rx, y, P.raya[0]); if (fl > 0.8 || y % 2) { R.pset(rx - 1, y, P.raya[2]); R.pset(rx + 1, y, P.raya[2]); } if (y % 3 === 0) { R.pset(rx - 2, y, P.espectro[4]); R.pset(rx + 2, y, P.espectro[4]); } }
  R.recorte(null);
  // el átomo de hidrógeno encima de la raya: el núcleo y su órbita, con el electrón que gira
  { const hx0 = rx, hy0 = 62; for (let a = 0; a < Math.PI * 2; a += 0.2) R.pset(Math.round(hx0 + Math.cos(a) * 6), Math.round(hy0 + Math.sin(a) * 3), P.escala[0]); R.disco(hx0, hy0, 1, P.rojoS); R.pset(hx0, hy0, P.rojo);
    const ae = t * 3; R.pset(Math.round(hx0 + Math.cos(ae) * 6), Math.round(hy0 + Math.sin(ae) * 3), hex('#1a6ad8')); R.pset(Math.round(hx0 + Math.cos(ae) * 6) + 1, Math.round(hy0 + Math.sin(ae) * 3), hex('#1a6ad8')); }
  // la aguja roja: va de la izquierda a la raya (o.aguja 0–1), se pasa un poco, vuelve y se queda quieta encima
  const ag = d_cl(o.aguja ?? 0, 0, 1), e = ag < 1 ? 1 - Math.pow(1 - ag, 3) : 1, rebote = ag > 0.7 && ag < 1 ? Math.sin((ag - 0.7) / 0.3 * Math.PI * 2) * 4 * (1 - ag) / 0.3 : 0;
  const nx = Math.round(lerp(64, rx, e) + rebote) + (ag >= 1 ? 0 : 0);
  R.linea(nx + 1, 42, nx + 1, 97, P.escala[1]); R.linea(nx, 41, nx, 97, P.rojo); R.pset(nx, 41, P.rojoS); R.rect(nx - 1, 96, nx + 1, 98, P.rojoS);
  // el reflejo del cristal: una franja diagonal clara y otra fina
  for (let y = 41; y <= 97; y++) { const xa = 214 + (97 - y) * 0.5; for (let x = Math.round(xa); x < xa + 5; x++) if ((x + y) % 2 === 0) R.pset(x, y, P.escala[5]); R.pset(Math.round(xa + 9), y, P.escala[5]); }
  // el sintonizador grande, que gira con la aguja: borde moleteado, cara cóncava con su marca y su sombra
  { const kx = 256, ky = 136, r = 17, giro = e * 5.2 + rebote * 0.2;
    R.disco(kx + 2, ky + 3, r, P.madera[0]);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const a = Math.atan2(j, i);
      const c = d > r - 3 ? (Math.floor((a - giro) / (Math.PI / 14)) % 2 ? P.baq[1] : P.baq[3]) : d > r - 5 ? P.baq[2] : P.baq[d_cl(Math.floor(2.4 - (i + j) / 12 + d_bay(kx + i, ky + j) * 0.6), 0, 4)]; R.pset(kx + i, ky + j, c); }
    R.linea(kx, ky, Math.round(kx + Math.cos(giro - Math.PI / 2) * (r - 5)), Math.round(ky + Math.sin(giro - Math.PI / 2) * (r - 5)), P.laton[3]);
    R.pset(kx - 6, ky - 7, P.baq[4]); R.pset(kx - 5, ky - 8, P.baq[4]); }
  // la palanca del selector y el mando de volumen (marca que no se mueve), la luz piloto que late
  R.linea(40, 136, 40 + 6, 136 - 6, P.laton[2]); R.disco(46, 130, 1, P.laton[3]); R.pset(32, 133, P.laton[3]);
  { const pl = 0.5 + 0.5 * Math.sin(t * 2.4); R.disco(230, 124, 3, pl > 0.5 ? P.ambar : hex('#c07020')); R.pset(229, 123, hex('#fff0c0')); }
  // motas de polvo en la luz de la escala
  for (let i = 0; i < 10; i++) { const x = Math.round(40 + h(i, 1, 69) * 240 + Math.sin(t * 0.3 + i) * 8), y = Math.round(((h(i, 2, 69) * 70 + t * (1 + h(i, 3, 69) * 2)) % 70) + 30); if (Math.sin(t * 2 + i) > 0) R.pset(x, y, P.escala[5]); }
  // sobre la mesa: un cuaderno de rayas con un lápiz (izquierda) y una taza humeante (derecha)
  for (let y = 166; y <= 178; y++) for (let x = 14; x <= 52; x++) R.pset(x, y, y === 166 || x === 14 ? P.papel[3] : (y % 3 === 0 && x > 18 && x < 50 ? P.papel[1] : P.papel[2]));
  R.linea(30, 176, 58, 170, hex('#e0b040')); R.pset(58, 170, P.k); R.pset(29, 176, P.rojo);
  { const mx = 288; R.rect(mx, 164, mx + 14, 178, hex('#c8c0b0')); R.rect(mx, 164, mx + 3, 178, hex('#e8e2d4')); R.rect(mx + 1, 164, mx + 13, 165, hex('#3a2416')); R.linea(mx + 15, 167, mx + 18, 170, hex('#a8a090')); R.linea(mx + 18, 170, mx + 15, 174, hex('#a8a090'));
    for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, sx = Math.round(mx + 6 + Math.sin(t * 2 + i * 2) * 2 + u * 3), sy = Math.round(162 - u * 14); if (u < 0.85) R.pset(sx, sy, u < 0.5 ? hex('#a8a4b0') : hex('#7a7684')); } }
  return { aguja: [nx, 70] };
}

// ─ hidrógeno · general: el espacio profundo, la nube fría de hidrógeno y el magnetar ─
let d_densNube = null;

// la densidad de la nube (una vez): un cuerpo de ruido de borde blando con filamentos alargados
function d_nubeDens() {
  if (d_densNube) return d_densNube;
  const D = new Float32Array(320 * 180);
  for (let y = 30; y < 180; y++) for (let x = 0; x < 250; x++) {
    const dx = (x - 118) / 96, dy = (y - 104) / 56, r = Math.hypot(dx, dy * (1 + 0.3 * dx));
    const n = d_vr(x / 22, y / 14, 71) * 0.55 + d_vr(x / 8, y / 6, 72) * 0.3 + d_vr(x / 3, y / 3, 73) * 0.15;
    const fil = Math.pow(1 - Math.abs(d_vr(x / 30 + y / 60, y / 7, 74) - 0.5) * 2, 6) * 0.55;
    D[y * 320 + x] = Math.max(0, (1 - r * 0.95) * 1.3 + (n - 0.5) * 0.9 + fil * Math.max(0, 1.3 - r));
  }
  return (d_densNube = D);
}

function d_hidrogeno(R, t, o) {
  const P = d_P, [mx, my] = V_CIELO.hidrogeno.general.geo.magnetar, [nx, ny] = V_CIELO.hidrogeno.general.geo.nube;
  d_fijo(R, 'hidrogeno', (B) => {
    d_cieloNoche(B, 0, 0, 319, 179, 81, { tonos: [P.noche[0], P.noche[1], P.noche[2], P.noche[3], P.noche[4], P.noche[5]], ini: 0, fin: 400, base: 0.6, via: { a: [0, 170], b: [320, 20], w: 26 }, cada: 45 });
    // una nebulosa azul muy tenue a la derecha y abajo, y galaxias diminutas lejos
    for (let y = 100; y < 180; y++) for (let x = 200; x < 320; x++) { const d = Math.hypot((x - 280) / 50, (y - 150) / 34), n = d_vr(x / 12, y / 9, 82) * (1 - d); if (n > 0.25 + d_bay(x, y) * 0.25) B[y * 320 + x] = P.neb[n > 0.5 ? 2 : n > 0.36 ? 1 : 0]; }
    for (const [gx, gy, a] of [[40, 40, 0.4], [226, 150, -0.3], [300, 96, 0.8]]) for (let i = -3; i <= 3; i++) { B[(gy + Math.round(i * a)) * 320 + gx + i] = Math.abs(i) < 2 ? P.estA : P.estB; }
  });
  // la nube: su densidad, que respira despacio, y el destello que la enciende (o.destello 0–1: el anillo sale del
  // magnetar y, cuando llega, la nube brilla de golpe y se vuelve a apagar)
  const D = d_nubeDens(), de = d_cl(o.destello ?? 0, 0, 1), dist = Math.hypot(mx - nx, my - ny);
  const rAn = de * 300, llega = (dist - 70) / 300, enc = de < llega ? 0 : Math.max(0, 1 - (de - llega) / 0.45) * Math.min(1, (de - llega) / 0.04);
  const res = 0.08 * Math.sin(t * 0.8);
  for (let y = 30; y < 180; y++) for (let x = 0; x < 250; x++) {
    const d = D[y * 320 + x]; if (d < 0.12) continue;
    const v = (d + res + (d_vr(x / 10 + t * 0.15, y / 10, 75) - 0.5) * 0.25) * (1 + enc * 1.9) * 4.2 + enc * 1.2;
    if (v < 0.9 + d_bay(x, y)) continue; R.pset(x, y, P.hid[d_cl(Math.floor(v - 0.4 + d_bay(x, y) * 0.8), 0, 9)]);
  }
  // estrellas por delante de la nube y por todo el cielo, que titilan
  d_titila(R, t, 0, 0, 320, 180, 83, 70, (x, y) => Math.hypot(x - mx, y - my) < 14);
  // el magnetar: un punto azul blanco con su halo y las líneas de campo curvas (un dipolo inclinado que gira despacio)
  const inc = 0.5 + Math.sin(t * 0.6) * 0.25;
  for (let L = 10; L <= 26; L += 8) for (let a = 0.18; a < Math.PI - 0.18; a += 0.05) { const r = L * Math.sin(a) ** 2;
    for (const s of [1, -1]) { const px = r * Math.sin(a) * s, py = r * Math.cos(a), x = Math.round(mx + px * Math.cos(inc) - py * Math.sin(inc)), y = Math.round(my + px * Math.sin(inc) + py * Math.cos(inc));
      if (!d_quieto(x, y) && (Math.floor(a * 20 + t * 6) % 3)) R.pset(x, y, L < 20 ? P.mag[3] : P.mag[4]); } }
  // el haz que gira (como un faro) y el núcleo
  { const ah = t * 2.2; for (let s = 4; s < 18; s++) for (const sg of [1, -1]) { const x = Math.round(mx + Math.cos(ah) * s * sg), y = Math.round(my + Math.sin(ah) * s * sg * 0.5); if (!d_quieto(x, y) && s % 2) R.pset(x, y, s < 10 ? P.mag[2] : P.mag[3]); } }
  R.disco(mx, my, 3, P.mag[3]); R.disco(mx, my, 2, P.mag[2]); R.disco(mx, my, 1, P.mag[1]); R.pset(mx, my, P.mag[0]);
  // el destello: la cruz y el anillo que se expande (no cruza la esquina de Atom)
  if (de > 0 && de < 1) {
    if (de < 0.12) { const L = Math.round(14 * (1 - de / 0.12)) + 4; for (let i = -L; i <= L; i++) { if (!d_quieto(mx + i, my)) R.pset(mx + i, my, P.mag[Math.abs(i) < L / 2 ? 0 : 1]); if (!d_quieto(mx, my + i)) R.pset(mx, my + i, P.mag[Math.abs(i) < L / 2 ? 0 : 1]); } R.disco(mx, my, 3, P.mag[0]); }
    for (const [dr, c] of [[0, P.mag[1]], [-3, P.mag[2]], [-7, P.mag[3]]]) { const r = rAn + dr; if (r < 4) continue; for (let a = 0; a < Math.PI * 2; a += 0.9 / r) { const x = Math.round(mx + Math.cos(a) * r), y = Math.round(my + Math.sin(a) * r * 0.85); if (!d_quieto(x, y) && (de < 0.6 || Math.floor(a * r / 2) % 2)) R.pset(x, y, c); } }
  }
  // o.ondas 0–1: la emisión de la nube, ondas finas que salen de su borde derecho (para enlazar con el dial)
  const on = d_cl(o.ondas ?? 0, 0, 1);
  if (on > 0) for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); if (u > on + 0.01) continue; const r = 40 + u * 120;
    for (let a = -0.5; a <= 0.5; a += 0.6 / r) { const x = Math.round(nx + 60 + Math.cos(a) * r * 0.6), y = Math.round(ny + Math.sin(a) * r * 0.6); if (!d_quieto(x, y)) R.pset(x, y, u < 0.5 ? P.hid[8] : P.hid[6]); } }
  return { brillo: enc };
}

// ─ hidrógeno · cometas: un cielo de otoño sobre colinas, con dos cometas, un avión, un satélite y la banda protegida ─
function d_cometas(R, t, o) {
  const P = d_P, gg = V_CIELO.hidrogeno.cometas.geo, hor = gg.horizonte;
  const T2 = d_hx(['#07061a', '#0c0a26', '#120e32', '#1a1440', '#24194e', '#2e205a', '#3a2a66', '#4a3672']);
  d_fijo(R, 'cometas', (B) => {
    d_cieloNoche(B, 0, 0, 319, 170, 91, { tonos: T2, ini: 10, fin: 168, via: { a: [40, 170], b: [110, 0], w: 16 }, cada: 50 });
    // las colinas en dos capas (la lejana azulada con un bosque de copas, la cercana oscura) y el prado
    for (let x = 0; x < 320; x++) {
      const lej = hor - 10 - Math.round(Math.sin(x / 44 + 1) * 6 + d_vr(x / 6, 0, 92) * 3), cer = hor - Math.round(Math.sin(x / 70 + 3) * 5 + d_vr(x / 20, 1, 93) * 3);
      for (let y = lej; y < 180; y++) { let c;
        if (y < cer) c = y === lej ? P.sil[3] : P.sil[2];
        else if (y < cer + 16) c = y === cer ? P.prado[2] : P.prado[d_cl(Math.floor((y - cer) / 8 + d_vr(x / 7, y / 3, 94) * 1.3 + d_bay(x, y) * 0.6), 0, 2)];
        else c = P.prado[d_cl(Math.floor(1 + (y - cer - 16) / 10 + d_vr(x / 8, y / 4, 95) * 1.6 + d_bay(x, y) * 0.6), 0, 4)];
        B[y * 320 + x] = c; }
    }
    // un árbol solo a la izquierda (silueta con la copa recortada) y una valla de troncos que baja la colina
    for (let y = hor - 38; y < hor + 2; y++) for (let x = 20; x < 64; x++) { const d = Math.hypot((x - 42) / 20, (y - (hor - 24)) / 15) + (d_vr(x / 4, y / 4, 96) - 0.5) * 0.45; if (d < 1) B[y * 320 + x] = d > 0.85 ? P.sil[2] : (h(x, y, 97) < 0.15 ? P.sil[2] : P.sil[0]); }
    for (let y = hor - 12; y < hor + 4; y++) { B[y * 320 + 41] = P.sil[0]; B[y * 320 + 42] = P.sil[0]; B[y * 320 + 43] = P.sil[1]; }
    for (let i = 0; i < 8; i++) { const px = 220 + i * 13, py = hor + 6 - Math.round(Math.sin(px / 70 + 3) * 5); for (let j = 0; j < 8; j++) B[(py - j) * 320 + px] = P.sil[0]; for (let x = px; x < px + 13 && x < 320; x++) { B[(py - 6) * 320 + x] = P.sil[1]; B[(py - 3) * 320 + x] = P.sil[1]; } }
    // una antena de radio lejana en la colina, con su caseta
    for (let y = hor - 30; y < hor - 10; y++) B[y * 320 + 168] = P.sil[1];
    for (let y = hor - 14; y < hor - 9; y++) for (let x = 160; x < 176; x++) B[y * 320 + x] = P.sil[1];
  });
  d_titila(R, t, 0, 0, 320, 140, 98, 55);
  d_nubesNoche(R, t, 126, 140, 3, 99, [T2[3], T2[5], T2[7]], (x, y) => x > 18 && x < 66);
  // la luz roja de la antena y la ventana de la caseta lejana
  R.pset(168, hor - 31, Math.sin(t * 3) > 0 ? P.rojo : P.rojoS); R.pset(170, hor - 12, P.luz[Math.sin(t * 0.4) > -0.7 ? 0 : 2]);
  // la banda del hidrógeno, marcada en el cielo (o.candado 0–1): bordes discontinuos ámbar, un tinte tramado y el candado
  const cd = d_cl(o.candado ?? 0, 0, 1), [b0x, b0y, b1x, b1y] = gg.banda;
  if (cd > 0) { const w = Math.round(cd * 320);
    for (let x = 0; x < w; x++) { if (Math.floor((x + t * 10) / 4) % 2) { R.pset(x, b0y, P.ambar); R.pset(x, b1y, P.ambar); } for (let y = b0y + 1; y < b1y; y++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#3a3060')); }
    const k = d_cl((cd - 0.5) / 0.5, 0, 1); if (k > 0) { const s = k < 1 ? 1 + Math.sin(k * Math.PI) * 0.3 : 1, [lx, ly] = gg.candado, esc = 3; const yy = Math.round(ly - (k < 1 ? (1 - k) * 8 : 0));
      R.rect(lx - 13, yy - 3, lx + 13, yy + 24, hex('#14102a')); R.icono('candado', lx - 10, yy, P.ambar, hex('#6a3a10'), esc); if (s > 1.1) R.pset(lx + 13, yy - 3, P.est); } }
  // los dos cometas (o.u 0–1): núcleo, coma, cola que se abre hacia arriba a la derecha y el halo violeta del hidrógeno
  const u = d_cl(o.u ?? 0, 0, 1), c1 = [Math.round(lerp(300, 30, u)), Math.round(lerp(58, 46, u))], c2 = [Math.round(lerp(330, 80, u * 1.1)), Math.round(lerp(118, 96, u))];
  for (const [[cx, cy], L, k] of [[c1, 74, 0], [c2, 54, 1]]) {
    if (cx < -30 || cx > 360) continue;
    // el halo de hidrógeno (tramado, grande y tenue)
    for (let j = -16; j <= 16; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i / 22, j / 16); const x = cx + i, y = cy + j; if (d < 1 && !d_quieto(x, y) && (1 - d) * 1.3 > d_bay(x, y) + 0.3) R.pset(x, y, d < 0.5 ? P.hid[3] : P.hid[2]); }
    // la cola: dos colas, la de polvo curvada y cálida y la de gas recta y azul
    for (let s = 2; s < L; s++) { const f = s / L, w = 1.5 + f * 7;
      for (let q = -w; q <= w; q++) { const x = Math.round(cx + s * 0.95 + q * 0.3), y = Math.round(cy - s * 0.32 + q + f * f * 6); if (d_quieto(x, y) || h(x, y, 100 + k) > (1 - f) * 1.1) continue; R.pset(x, y, Math.abs(q) < w * 0.35 ? (f < 0.3 ? P.estC : hex('#c8a87a')) : hex('#7a6a7a')); }
      const xg = Math.round(cx + s * 1.0), yg = Math.round(cy - s * 0.42); if (!d_quieto(xg, yg) && (s + Math.floor(t * 8)) % 3) R.pset(xg, yg, f < 0.5 ? P.estAz : hex('#5a7ab0')); }
    R.disco(cx, cy, 5, P.hid[5]); R.disco(cx, cy, 4, P.hid[7]); R.disco(cx, cy, 3, P.hid[8]); R.disco(cx, cy, 2, P.estA); R.disco(cx, cy, 1, P.est); R.pset(cx - 2, cy, P.est);
  }
  // o.trazas 0–1: un avión (luces de posición roja y verde, el destello blanco) y un satélite que cruza recto y fijo
  const tr = d_cl(o.trazas ?? 0, 0, 1);
  if (tr > 0 && tr < 1) {
    const ax = Math.round(lerp(-10, 330, tr)), ay = Math.round(lerp(84, 60, tr));
    for (let i = 4; i < 60; i += 2) { const x = ax - i, y = Math.round(ay + i * 24 / 340); if (!d_quieto(x, y)) R.pset(x, y, i < 20 ? hex('#4a4a6a') : hex('#2e2c4a')); }
    R.rect(ax - 3, ay, ax + 3, ay, hex('#3a3a50')); R.pset(ax - 1, ay - 1, Math.sin(t * 6) > 0 ? P.rojo : P.rojoS); R.pset(ax + 1, ay + 1, Math.sin(t * 6) > 0 ? hex('#3aff6a') : hex('#1a8a3a'));
    if ((t * 1.3) % 1 < 0.15) { R.pset(ax, ay, P.est); R.pset(ax - 1, ay, P.est); R.pset(ax + 1, ay, P.est); R.pset(ax, ay - 1, P.estA); R.pset(ax, ay + 1, P.estA); }
    const sx = Math.round(lerp(20, 300, tr)), sy = Math.round(lerp(150, 52, tr));
    for (let i = 2; i < 30; i += 3) { const x = Math.round(sx - i * 280 / 300), y = Math.round(sy + i * 98 / 300); if (!d_quieto(x, y)) R.pset(x, y, hex('#3e4a6a')); }
    if (!d_quieto(sx, sy)) { R.pset(sx, sy, P.estA); R.pset(sx + 1, sy, P.estB); }
  }
  return { cometa1: c1, cometa2: c2 };
}

// ─ caminos · general: la vista de cierre, tres caminos de luz que suben desde la gran oreja ─
const d_CAMINOS = [
  { a: [150, 150], c: [70, 120], b: [70, 66], col: () => d_P.hid[8], colS: () => d_P.hid[6] },
  { a: [160, 148], c: [160, 104], b: [160, 66], col: () => d_P.ambar, colS: () => hex('#a86a20') },
  { a: [170, 150], c: [250, 120], b: [250, 68], col: () => d_P.raya[1], colS: () => d_P.mag[3] },
];

// caminos (general): el alba sobre el campo de Ohio con la oreja diminuta, la granja y el molino, y los tres caminos de
// luz (o.u); la cabecera de cielo2 dice qué se ve y qué devuelve
function d_caminos(R, t, o) {
  const P = d_P, gg = V_CIELO.caminos.general.geo, hor = gg.horizonte;
  const T3 = d_hx(['#060818', '#0a0e22', '#0e142c', '#141c38', '#1a2644', '#22324e', '#2a3e58', '#3a5064']);
  const ALBA = d_hx(['#22364a', '#2c4656', '#3a5a60', '#527468', '#6e8c70']), LEJOS = d_hx(['#16222e', '#1e2e3c', '#3e5a62']);
  d_fijo(R, 'caminos', (B) => {
    const put = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };
    d_cieloNoche(B, 0, 0, 319, hor, 111, { tonos: T3, ini: 20, fin: hor, via: { a: [0, 40], b: [320, 70], w: 18 }, viaF: 1.3, cada: 48 });
    // el alba que asoma por el horizonte: bandas verdosas tramadas que suben más a la derecha (por donde sale el sol)
    for (let y = hor - 40; y < hor; y++) for (let x = 0; x < 320; x++) { const f = (y - hor + 40) / 40 * (0.55 + 0.45 * Math.exp(-(((x - 230) / 120) ** 2)));
      const v = f * f * 5.2 - 0.6 + (d_vr(x / 24, y / 6, 150) - 0.5) * 0.6; if (v > d_bay(x, y)) B[y * 320 + x] = ALBA[d_cl(Math.floor(v - d_bay(x, y) * 0.5), 0, 4)]; }
    // cirros finos que el alba enciende por debajo
    for (let i = 0; i < 6; i++) { const cy = hor - 30 + Math.round(h(i, 1, 151) * 18), cx = 20 + Math.round(h(i, 2, 151) * 280), w = 20 + Math.round(h(i, 3, 151) * 30);
      for (let x = cx - w; x <= cx + w; x++) { const e = 1 - Math.abs(x - cx) / w; if (x < 0 || x > 319 || e * d_vr(x / 4, i, 152) < 0.18) continue; put(x, cy, ALBA[4]); if ((x & 1) && e > 0.4) put(x, cy - 1, ALBA[2]); } }
    // el lucero del alba (un planeta, más fuerte que las estrellas, con su halo y su cruz)
    { const vx = 296, vy = hor - 34; for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j) / 4; if (d < 1 && (1 - d) * 0.9 > d_bay(vx + i, vy + j) + 0.15) put(vx + i, vy + j, ALBA[4]); }
      for (let k = -3; k <= 3; k++) { put(vx + k, vy, k ? P.estC : P.est); put(vx, vy + k, k ? P.estC : P.est); } }
    // los montes lejanos con el filo encendido y, delante, la línea de árboles con la granja: la casa con su porche, el
    // granero de tejado a dos aguas, el silo con su cúpula y la torre del molino (las aspas giran por encima)
    for (let x = 0; x < 320; x++) { const top = hor - 9 - Math.round(d_vr(x / 34, 0, 153) * 8 + d_vr(x / 10, 1, 153) * 2); for (let y = top; y < hor; y++) put(x, y, y === top ? LEJOS[2] : y < top + 2 && (x & 1) ? LEJOS[1] : LEJOS[0]); }
    for (let x = 0; x < 320; x++) { const top = hor - 3 - Math.round(d_vr(x / 14, 0, 112) * 6 + (h(x >> 2, 0, 154) < 0.3 ? 2 : 0)); for (let y = top; y < hor; y++) put(x, y, y === top ? P.sil[3] : P.sil[2]); }
    for (let y = hor - 9; y < hor; y++) for (let x = 12; x < 34; x++) { const tj = hor - 9 + Math.abs(x - 23) * 0.5; if (y >= tj) put(x, y, y === Math.ceil(tj) ? P.sil[3] : P.sil[1]); }
    for (let y = hor - 4; y < hor; y++) for (let x = 34; x < 40; x++) put(x, y, y === hor - 4 ? P.sil[3] : P.sil[1]);
    for (let y = hor - 13; y < hor; y++) for (let x = 262; x < 284; x++) { const tj = hor - 13 + Math.abs(x - 273) * 0.55; if (y >= tj) put(x, y, (x - 262) % 4 === 0 ? P.sil[0] : P.sil[2]); }
    for (let y = hor - 22; y < hor; y++) for (let x = 286; x < 292; x++) put(x, y, x === 286 ? P.sil[3] : y % 4 === 0 ? P.sil[1] : P.sil[2]);
    for (let x = 287; x < 291; x++) put(x, hor - 23, P.sil[3]);
    for (let y = hor - 24; y < hor; y++) { const w = Math.round((y - hor + 24) * 0.12); put(228 - w, y, P.sil[1]); put(228 + w, y, P.sil[1]); if (y % 4 === 0) for (let x = 228 - w; x <= 228 + w; x++) put(x, y, P.sil[0]); }
    // el campo de maíz en surcos que se van hacia el horizonte (cada mata un punto con su brillo) y la cuneta de hierba
    for (let y = hor; y < 180; y++) for (let x = 0; x < 320; x++) {
      const p = (y - hor) / (180 - hor); let c;
      if (p < 0.55) { const u = (x - 160) / (2 + p * 26) + 100, fila = Math.floor(u) % 2, mata = fila && h(Math.floor(u), y >> 1, 155) < 0.6;
        c = fila ? (mata ? P.maiz[1] : P.maiz[0]) : P.sil[2]; if (mata && (u % 1) < 0.25 && y % 3 === 0) c = p < 0.3 ? ALBA[1] : P.maiz[2]; if (y === hor) c = P.sil[3]; }
      else c = P.prado[d_cl(Math.floor(1 + p * 2 + d_vr(x / 9, y / 4, 114) * 1.4 + d_bay(x, y) * 0.6), 0, 4)];
      B[y * 320 + x] = c;
    }
    for (let i = 0; i < 300; i++) { const x = Math.floor(h(i, 1, 156) * 320), y = 170 + Math.floor(h(i, 2, 156) * 10), alt = 1 + Math.floor(h(i, 3, 156) * 3); for (let j = 0; j < alt; j++) put(x, y - j, j === alt - 1 ? P.prado[4] : P.prado[3]); }
    for (let i = 0; i < 26; i++) { const x = Math.floor(h(i, 1, 157) * 320), y = 168 + Math.floor(h(i, 2, 157) * 11); put(x, y, i % 3 ? hex('#8a94a8') : hex('#b0a070')); }
    d_orejaMini(B, gg.oreja[0], gg.oreja[1], 64, 115);
    // el camino de tierra hasta la oreja, con dos charcos que reflejan el alba
    for (let y = 164; y < 180; y++) { const w = 2 + (y - 164) * 0.6; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) B[y * 320 + x] = h(x, y, 116) < 0.25 ? P.prado[1] : Math.abs(x - 160) > w - 1 ? hex('#26262a') : hex('#2e2e30'); }
    for (const [cx, cy, rw] of [[157, 170, 3], [163, 176, 4]]) for (let i = -rw; i <= rw; i++) { put(cx + i, cy, ALBA[i < 0 ? 3 : 2]); if (Math.abs(i) < rw) put(cx + i, cy + 1, ALBA[1]); }
  });
  d_titila(R, t, 0, 0, 320, hor - 8, 117, 60, (x, y) => (Math.hypot(x - 160, y - 54) < 14) || Math.hypot(x - 250, y - 62) < 12);
  // nubes en dos capas: altas y lentas (lejos de la nube, la duda y la luz) y las bajas del alba, más rápidas
  d_nubesNoche(R, t * 0.4, 74, 96, 2, 158, [T3[2], T3[4], T3[6]], (x, y) => Math.abs(x - 70) < 34 || Math.abs(x - 160) < 12 || Math.abs(x - 250) < 22);
  d_nubesNoche(R, t, 108, 130, 4, 118, [T3[3], T3[5], ALBA[3]], (x, y) => Math.abs(x - 70) < 26 || Math.abs(x - 160) < 6 || Math.abs(x - 250) < 6 || (Math.abs(x - 228) < 8 && y > 126) || (x >= 284 && x <= 293 && y > 133));
  d_fugaz(R, t, 8.5, 3, [196, 24], [236, 40]);
  // la granja: la ventana de la casa y la del granero encendidas (una se apaga a ratos), el molino que gira con el viento
  { const on = Math.sin(t * 0.4) > -0.7; R.pset(20, hor - 5, on ? P.luz[0] : P.luz[2]); R.pset(21, hor - 5, on ? P.luz[1] : P.luz[2]); R.pset(26, hor - 5, P.luz[1]); R.pset(277, hor - 6, P.luz[1]); }
  { const mx = 228, my = hor - 25, a0 = t * 1.6; for (let k = 0; k < 6; k++) { const a = a0 + k * 1.047; for (let r = 1; r <= 5; r++) R.pset(Math.round(mx + Math.cos(a) * r), Math.round(my + Math.sin(a) * r), r > 2 ? P.sil[3] : P.sil[1]); }
    R.pset(mx, my, P.sil[0]); R.linea(mx + 1, my, mx + 6, my - 1, P.sil[1]); R.linea(mx + 6, my - 1, mx + 6, my + 2, P.sil[1]); }
  // un coche lejano por la carretera del horizonte, con sus faros
  { const u = (t * 0.06) % 1, cx = Math.round(330 - u * 360); if (cx > 40 && cx < 250 && Math.abs(cx - 160) > 34) { R.pset(cx, hor - 1, P.luz[0]); R.pset(cx + 2, hor - 1, P.luz[0]); R.pset(cx - 1, hor - 1, P.luz[2]); } }
  d_casetaMini(R, t, 204, hor, 9);
  // el viento en el maíz y la hierba de la cuneta: las puntas se mecen y una ola de luz del alba las recorre
  { const ola = (t * 30) % 420 - 50; for (let i = 0; i < 60; i++) { const x = Math.floor(h(i, 1, 159) * 320), y = hor + 3 + Math.floor(h(i, 2, 159) * (178 - hor)); if (Math.abs(x - 160) < 10) continue; const s = Math.round(Math.sin(t * 1.8 + x * 0.15)), cerca = Math.abs(x - ola) < 24;
    R.pset(x + s, y - 1, cerca ? ALBA[3] : P.maiz[2]); } }
  for (let i = 0; i < 7; i++) { const s = Math.sin(t * (1.1 + h(i, 1, 160)) + i * 1.7); if (s < 0.4) continue; const x = Math.round(h(i, 2, 160) * 320 + Math.sin(t * 0.4 + i) * 5), y = Math.round(162 + h(i, 3, 160) * 14); R.pset(x, y, s > 0.8 ? P.luciernaga[0] : P.luciernaga[1]); }
  // los caminos (o.u 0–1: se dibujan de abajo arriba, uno tras otro, con una chispa en la punta; luego suben chispas)
  const u = d_cl(o.u ?? 0, 0, 1), bez = (C3, v) => { const a = (1 - v) * (1 - v), b = 2 * (1 - v) * v, c = v * v; return [a * C3.a[0] + b * C3.c[0] + c * C3.b[0], a * C3.a[1] + b * C3.c[1] + c * C3.b[1]]; };
  const fin = d_CAMINOS.map((C3, i) => d_cl(u * 1.6 - i * 0.3, 0, 1));
  d_CAMINOS.forEach((C3, i) => { const f = fin[i]; if (f <= 0) return;
    for (let v = 0; v <= f; v += 0.006) { const [x, y] = bez(C3, v), X = Math.round(x), Y = Math.round(y), w = 1 + Math.round((1 - v) * 1.5);
      for (let q = -w; q <= w; q++) if (!d_quieto(X + q, Y) && (q === 0 || (X + Y + q) % 2 === 0)) R.pset(X + q, Y, q === 0 ? C3.col() : C3.colS()); }
    if (f < 1) { const [x, y] = bez(C3, f); R.disco(Math.round(x), Math.round(y), 2, C3.colS()); R.pset(Math.round(x), Math.round(y), P.est); }
    else for (let k = 0; k < 3; k++) { const v = (t * 0.35 + k / 3 + i * 0.1) % 1, [x, y] = bez(C3, v); R.pset(Math.round(x), Math.round(y), P.est); R.pset(Math.round(x), Math.round(y) + 1, C3.col()); } });
  // al final de cada camino: la nube de hidrógeno pequeña, la «?» y la luz lejana que parpadea (sin forma: una luz)
  const ap = (i) => d_cl((fin[i] - 0.85) / 0.15, 0, 1);
  { const a = ap(0), [cx, cy] = gg.nube; if (a > 0) for (let j = -14; j <= 14; j++) for (let i = -24; i <= 24; i++) { const d = Math.hypot(i / 24, j / 14) + (d_vr((cx + i) / 6 + t * 0.2, (cy + j) / 5, 119) - 0.5) * 0.6; if (d < 1 && (1 - d) * 2.4 * a > d_bay(cx + i, cy + j) + 0.15) R.pset(cx + i, cy + j, P.hid[d_cl(Math.floor((1 - d) * 7 * a + 2), 2, 8)]); } }
  { const a = ap(1), [cx, cy] = gg.duda; if (a > 0) { const y = Math.round(cy - 10 + (1 - a) * 6 + Math.sin(t * 1.5) * 1.5); R.icono('?', cx - 7, y, a >= 1 ? hex('#ffe08a') : P.ambar, hex('#5a3a10'), 3); } }
  { const a = ap(2), [cx, cy] = gg.luz; if (a > 0) { const p = a * (0.55 + 0.45 * Math.max(0, Math.sin(t * 2.1) * Math.sin(t * 0.7 + 1)));
    for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j) / 7; if (d < 1 && (1 - d) * p * 1.3 > d_bay(cx + i, cy + j) + 0.3) R.pset(cx + i, cy + j, d < 0.45 ? P.mag[2] : P.mag[3]); }
    R.pset(cx, cy, P.est); if (p > 0.6) { R.pset(cx + 1, cy, P.mag[1]); R.pset(cx, cy + 1, P.mag[1]); R.pset(cx - 1, cy, P.mag[1]); R.pset(cx, cy - 1, P.mag[1]); } } }
  return {};
}
// caminos · franja: la cinta de cielo, la caseta de cerca con el calendario (o.dias) y el campo en su luz (o.luz); la
// cabecera de cielo2 dice qué se ve y qué devuelve
function d_franja(R, t, o) {
  const P = d_P, gg = V_CIELO.caminos.franja.geo, hor = gg.horizonte, [f0x, f0y, f1x, f1y] = gg.franja;
  const luz = o.luz === 'dia' || o.luz === 'tarde' ? o.luz : 'noche', L = c_LUZ_FRANJA[luz], noche = luz === 'noche', sh = L.sh;
  const [kx0, ky0, kx1, ky1] = gg.caseta, [px0, py0, px1, py1] = gg.puerta;
  d_fijo(R, 'franja.' + luz, (B) => {
    const put = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };
    // el cielo: de noche con la Vía Láctea que sube en diagonal por detrás de la oreja; de tarde y de día, degradado y cirros
    if (noche) d_cieloNoche(B, 0, 0, 319, hor, 121, { ini: 0, fin: hor + 10, cada: 62, via: { a: [0, 150], b: [230, 40], w: 15 }, viaF: 1.2 });
    else c_cieloLuz(B, hor, L.cielo, L.nube, 121);
    if (luz === 'tarde') for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 1, 130) * 320), y = Math.floor(h(i, 2, 130) * 60); if (!d_quieto(x, y)) put(x, y, h(i, 3, 130) < 0.3 ? P.estA : P.estB); }
    // los montes lejanos (dos tonos, con el filo aclarado por el cielo) y el bosque de coníferas por delante
    for (let x = 0; x < 320; x++) { const top = hor - 12 - Math.round(d_vr(x / 40, 0, 131) * 9 + d_vr(x / 12, 1, 131) * 2);
      for (let y = top; y <= hor; y++) put(x, y, y === top ? L.lejos[1] : (y - top < 3 && (x + y) % 2) ? L.lejos[1] : L.lejos[0]); }
    for (let x = 0; x < 320; x++) { let top = hor - 3 - Math.round(d_vr(x / 8, 0, 122) * 3);
      for (let i = 0; i < 70; i++) { const tx = Math.round(h(i, 1, 132) * 330) - 5, th = 4 + Math.round(h(i, 2, 132) * 8), y = hor - 2 - th + Math.round(Math.abs(x - tx) * 1.8); if (y < top) top = y; }
      for (let y = top; y < hor + 1; y++) put(x, y, y === top ? L.sil[3] : (y < top + 3 && (x & 1)) ? L.sil[2] : L.sil[1]); }
    // el mástil de la radio, lejos, con su celosía, y los postes del teléfono que traen los cables hasta la caseta
    for (let y = 104; y < hor; y++) { put(186, y, L.sil[2]); put(188, y, L.sil[2]); if (y % 3 === 0) put(187, y, L.sil[3]); }
    const postes = [[118, 104, 148], [168, 114, 144]];
    for (const [x, y0, y1] of postes) { for (let y = y0; y <= y1; y++) { put(x, y, L.sil[0]); put(x + 1, y, L.sil[2]); } for (let i = -5; i <= 6; i++) put(x + i, y0 + 3, L.sil[0]); put(x - 4, y0 + 2, L.sil[3]); put(x + 5, y0 + 2, L.sil[3]); }
    const cable = (a, b, cae) => { for (let s = 0; s <= 1; s += 0.004) put(Math.round(lerp(a[0], b[0], s)), Math.round(lerp(a[1], b[1], s) + Math.sin(s * Math.PI) * cae), L.sil[0]); };
    cable([114, 106], [164, 116], 4); cable([123, 106], [173, 116], 4); cable([164, 116], [kx0 + 4, ky0 + 9], 3); cable([173, 116], [kx0 + 4, ky0 + 12], 2);
    // el prado: segado en bandas que se van haciendo anchas hacia delante, con su ruido, matas, tréboles y piedras
    for (let y = hor + 1; y < 180; y++) for (let x = 0; x < 320; x++) { const p = (y - hor) / (180 - hor), banda = Math.floor(Math.log(y - hor + 2) * 5) % 2;
      B[y * 320 + x] = L.prado[d_cl(Math.floor(0.4 + p * 2.2 + banda * 0.5 + d_vr(x / 12, y / 3, 123) * 1.2 + d_bay(x, y) * 0.6), 0, 4)]; }
    for (let i = 0; i < 520; i++) { const x = Math.floor(h(i, 1, 133) * 320), y = hor + 4 + Math.floor(h(i, 2, 133) ** 0.7 * (176 - hor)), p = (y - hor) / (180 - hor), alt = 1 + Math.round(p * 3 * h(i, 3, 133));
      for (let j = 0; j < alt; j++) put(x + (j === alt - 1 && i % 2 ? 1 : 0), y - j, j === alt - 1 ? L.prado[4] : L.prado[3]); put(x, y + 1, L.prado[0]); }
    for (let i = 0; i < 60; i++) { const x = Math.floor(h(i, 1, 134) * 320), y = hor + 10 + Math.floor(h(i, 2, 134) * (168 - hor)); put(x, y, c_enLuz(i % 3 ? '#f4f0e0' : '#f0d050', sh)); }
    for (let i = 0; i < 14; i++) { const x = Math.floor(h(i, 1, 135) * 300) + 8, y = 150 + Math.floor(h(i, 2, 135) * 28), w = 1 + (i % 3);
      for (let a = -w; a <= w; a++) { put(x + a, y, c_enLuz('#8a8a84', sh)); put(x + a, y + 1, c_enLuz('#5a5a56', sh)); } put(x - w + 1, y - 1, c_enLuz('#b8b8b0', sh)); }
    d_orejaMini(B, gg.oreja[0], gg.oreja[1], 112, 124);
    // el camino de grava que viene de la izquierda hasta la puerta, con sus rodadas y los charcos de la última lluvia
    for (let x = 0; x <= px1 + 4; x++) { const u = Math.min(1, x / kx0), cy = x < kx0 ? 152 + u * u * 17 : 170 + (x - kx0) * 0.02, w = 1.5 + u * 3;
      for (let y = Math.round(cy - w); y <= Math.round(cy + w); y++) { const e = Math.abs(y - cy) / w, n = h(x, y, 136); let c = L.grava[n < 0.25 ? 0 : n < 0.8 ? 1 : 2];
        if (e > 0.85 && (x + y) % 2) c = L.prado[2]; else if (Math.abs(Math.abs(y - cy) - w * 0.5) < 0.5) c = L.grava[0]; put(x, y, c); } }
    for (const [cx, cy, rw] of [[96, 159, 6], [250, 172, 8]]) for (let j = -1; j <= 1; j++) for (let i = -rw; i <= rw; i++) if ((i / rw) ** 2 + j * j * 0.3 < 1)
      put(cx + i, cy + j, noche ? (h(cx + i, j, 137) < 0.1 ? P.estA : P.noche[6]) : luz === 'tarde' ? (j < 0 ? hex('#e8905a') : hex('#8a5a6a')) : (j < 0 ? hex('#c8e0f4') : hex('#8ab0d8')));
    // la caseta de los receptores, de cerca a la derecha: muro de bloques con sus juntas, manchas de agua bajo el alero y
    // verdín abajo, el tejado plano con el canalón, la bajante, la puerta de metal con su ventanuco y su chapa (rayas)
    for (let y = ky0 + 6; y <= ky1; y++) for (let x = kx0; x <= kx1; x++) {
      const fila = Math.floor((y - ky0) / 5), junta = (y - ky0) % 5 === 0 || (x - kx0 + (fila % 2) * 8) % 16 === 0;
      let v = junta ? 0 : 2 + (d_vr(x / 4, y / 3, 125) - 0.5) * 1.2 - (y < ky0 + 14 ? 1 : 0) - (x - kx0) / (kx1 - kx0) * 0.6; if (x === kx0) v = 3.5;
      if (!junta && y < ky0 + 6 + d_vr(x / 3, 0, 138) * 30 && d_vr(x / 2, 1, 139) > 0.62) v -= 0.8;
      if (!junta && y > ky1 - 8 && h(x, y, 140) < (y - ky1 + 8) / 14) v -= 1;
      B[y * 320 + x] = P.bloque === L.bloque || !junta ? L.bloque[d_cl(Math.floor(v + d_bay(x, y) * 0.7), 0, 3)] : L.bloque[0];
      if (!junta && y > ky1 - 6 && h(x, y, 141) < 0.12) B[y * 320 + x] = L.prado[3];
    }
    for (let y = ky0; y < ky0 + 6; y++) for (let x = kx0 - 4; x <= 319; x++) B[y * 320 + x] = y === ky0 ? P.alu[3] : y === ky0 + 5 ? P.sil[0] : y === ky0 + 2 && x % 9 === 0 ? P.alu[2] : (noche ? P.alu[1] : L.bloque[1]);
    for (let y = ky1 - 1; y <= ky1 + 2; y++) for (let x = kx0 - 2; x <= 319; x++) B[y * 320 + x] = (y === ky1 - 1 && x % 7 === 0) ? L.bloque[0] : L.sil[1];
    for (let y = ky0 + 6; y <= ky1; y++) { put(316, y, L.bloque[0]); put(317, y, P.alu[noche ? 2 : 3]); put(318, y, P.alu[noche ? 1 : 2]); if (y % 20 === 0) for (let x = 315; x <= 319; x++) put(x, y, P.alu[0]); }
    for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) B[y * 320 + x] = (x === px0 || x === px1 || y === py0) ? P.sil[0] : (x === px0 + 1 ? P.alu[3] : (y - py0) % 9 === 0 ? P.alu[1] : P.alu[2]);
    for (let y = py0 + 5; y <= py0 + 12; y++) for (let x = px0 + 5; x <= px1 - 5; x++) B[y * 320 + x] = noche || luz === 'tarde' ? P.luz[(y < py0 + 7) ? 0 : 1] : (y < py0 + 8 ? hex('#cfe0f0') : hex('#7a8ca8'));
    B[(py0 + 22) * 320 + px0 + 3] = P.laton[3]; B[(py0 + 23) * 320 + px0 + 3] = P.laton[1];
    for (let x = px0 + 4; x <= px1 - 4; x++) { put(x, py0 + 16, P.papel[1]); put(x, py0 + 19, P.papel[1]); if (x % 3) put(x, py0 + 17, P.alu[0]); }
    for (let y = py1 - 5; y <= py1; y++) for (let x = px0 + 1; x < px1; x++) put(x, y, (x + y) % 3 ? P.alu[3] : P.alu[4]);
    // el cable de la antena que baja por la pared y la caja de empalmes; la rejilla de ventilación
    for (let y = ky0 + 6; y < ky0 + 50; y++) B[y * 320 + kx0 + 6] = P.sil[0];
    for (let y = ky0 + 50; y < ky0 + 58; y++) for (let x = kx0 + 3; x < kx0 + 10; x++) B[y * 320 + x] = y === ky0 + 50 ? P.alu[4] : P.alu[2];
    for (let y = 96; y <= 106; y++) for (let x = 278; x <= 290; x++) put(x, y, x === 278 || x === 290 || y === 96 || y === 106 ? P.alu[1] : (y % 2 ? L.sil[0] : P.alu[3]));
    // la bicicleta apoyada en la pared (ruedas con radios, cuadro rojo, sillín y manillar) y el cubo de basura de chapa
    const bc = (c) => c_enLuz(c, sh), ru = [[222, 162], [240, 162]];
    for (const [cx, cy] of ru) { for (let a = 0; a < 6.283; a += 0.05) { put(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), bc('#1a1a1e')); put(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), bc('#3a3a40')); }
      for (let k = 0; k < 8; k++) { const a = k * 0.785; R.linea(cx, cy, Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), bc('#a8acb4')); } put(cx, cy, bc('#e8eaee')); }
    for (const [a, b, c, d] of [[222, 162, 230, 162], [230, 162, 236, 152], [228, 152, 236, 152], [222, 162, 228, 152], [236, 152, 240, 162], [228, 152, 227, 149]]) { R.linea(a, b, c, d, bc('#c83a2a')); R.linea(a, b - 1, c, d - 1, bc('#e86a4a')); }
    R.rect(225, 148, 229, 149, bc('#2a2a2e')); R.linea(236, 152, 238, 147, bc('#a8acb4')); R.linea(236, 147, 241, 147, bc('#c8ccd4')); R.pset(241, 148, bc('#2a2a2e'));
    for (let y = 150; y <= 168; y++) for (let x = 266; x <= 279; x++) { const e = (x - 266) / 13; put(x, y, y === 150 ? bc('#c8ccd4') : (y - 150) % 6 === 0 ? bc('#6a6e78') : e < 0.25 ? bc('#b8bcc4') : e > 0.8 ? bc('#5a5e66') : bc('#8a8e98')); }
    for (let x = 265; x <= 280; x++) { put(x, 149, bc('#9a9ea8')); put(x, 148, x > 268 && x < 277 ? bc('#6a6e78') : B[148 * 320 + x]); }
    // de noche, la luz del farol que cae en la grava delante de la puerta
    if (!(luz === 'dia')) for (let y = 169; y < 180; y++) for (let x = 270; x < 320; x++) { const d = Math.hypot((x - 300) / 26, (y - 172) / 6); if (d < 1 && (1 - d) * 0.8 > d_bay(x, y) + 0.2) B[y * 320 + x] = c_mez(B[y * 320 + x], P.luz[1], 0.35); }
  });
  // la cinta de cielo que barre la gran oreja (o.dias: cada día la Tierra la vuelve a pasar entera; vuelve igual y vacía);
  // de día, sin estrellas: solo se marca y aclara; de tarde, las más brillantes
  const dias = Math.max(0, o.dias ?? 0), des = ((dias % 1) * 320 + t * 6) % 320, borde = noche ? hex('#5a6a9a') : luz === 'tarde' ? hex('#ffd8a0') : hex('#ffffff');
  for (let y = f0y; y <= f1y; y++) for (let x = 0; x < 320; x++) { if (d_quieto(x, y)) continue; const X = (x + des) % 320;
    if ((y === f0y || y === f1y)) { if (Math.floor(x / 3) % 2) R.pset(x, y, borde); continue; }
    if (!noche) { if ((x + y) % 3 === 0) c_tine(R, x, y, hex('#ffffff'), luz === 'dia' ? 0.18 : 0.12); if (luz === 'tarde' && h(Math.floor(X), y, 126) > 0.985) R.pset(x, y, P.estA); continue; }
    if ((x + y) % 3 === 0) R.pset(x, y, hex('#1a2448')); const s = h(Math.floor(X), y, 126); if (s > 0.985) R.pset(x, y, P.est); else if (s > 0.96) R.pset(x, y, P.estA); else if (s > 0.94) R.pset(x, y, P.estB); }
  // el haz de la oreja, un cono tenue que sube hasta la cinta
  const haz = noche ? hex('#28365e') : luz === 'tarde' ? hex('#c88a8a') : hex('#c8dcf0');
  for (let y = f1y + 1; y < gg.oreja[1] - 12; y++) { const w = 4 + (gg.oreja[1] - 12 - y) * 0.05, cx = 60 - (gg.oreja[1] - y) * 0.06; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) if ((x + y) % 3 === 0) R.pset(x, y, haz); }
  if (noche) { d_titila(R, t, 0, f1y + 2, 206, hor - 14, 127, 26); d_fugaz(R, t, 9, 4, [40, 72], [96, 96]); }
  // las nubes bajas, a tres velocidades, por encima de los montes y por detrás de la caseta, el mástil y el poste
  d_nubesNoche(R, t, 94, 108, noche ? 3 : 4, 129, L.nube, (x, y) => x >= kx0 - 2 || (y >= 102 && ((x >= 111 && x <= 126) || (x >= 184 && x <= 190))));
  // de día y de tarde, dos cúmulos de tres tonos que pasan despacio (cada uno a su velocidad), detrás de la caseta
  if (!noche) for (let k = 0; k < 2; k++) { const cx = ((h(k, 1, 144) * 260 + t * (2 + k * 1.5)) % 300) - 40, cy = 76 + k * 14; c_cumulo(R, cx, cy, 16 - k * 4, L.nube, kx0 - 2); }
  // vida lejos: la luz roja del mástil, un coche por la carretera del horizonte, pájaros de día y de tarde
  if (luz !== 'dia') { const on = Math.sin(t * 2.6) > 0; R.pset(187, 103, on ? P.rojo : P.rojoS); if (on) { R.pset(186, 103, P.rojoS); R.pset(188, 103, P.rojoS); } }
  { const u = (t * 0.045) % 1, cx = Math.round(-10 + u * 220); if (cx < kx0 - 4) { if (luz === 'dia') { R.rect(cx, hor - 1, cx + 3, hor, hex('#c8d0d8')); R.pset(cx + 1, hor - 2, hex('#e8ecf0')); }
    else { R.pset(cx + 3, hor, P.luz[0]); R.pset(cx + 4, hor, P.luz[0]); R.pset(cx + 5, hor, P.luz[2]); R.pset(cx, hor, P.rojoS); } } }
  if (luz !== 'noche') for (let k = 0; k < 3; k++) { const bx = Math.round(((t * (9 + k * 3) + k * 70) % 260) - 20), by = 78 + k * 7 + Math.round(Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 9 + k * 2) > 0, c = luz === 'dia' ? hex('#2a3040') : hex('#1a1424');
    if (bx < 0 || bx > kx0 - 4) continue; R.pset(bx, by, c); R.pset(bx - 1, by - (a ? 1 : 0), c); R.pset(bx + 1, by - (a ? 1 : 0), c); R.pset(bx - 2, by - (a ? 2 : -1), c); R.pset(bx + 2, by - (a ? 2 : -1), c); }
  // la manga de viento del tejado (se hincha y ondea con las rachas)
  { const mx = 296, my = ky0 - 16, racha = 0.6 + 0.4 * Math.sin(t * 0.9) * Math.sin(t * 2.3 + 1); R.linea(mx, ky0, mx, my, P.alu[luz === 'dia' ? 4 : 2]);
    for (let i = 0; i < 12; i++) { const x = mx + 1 + Math.round(i * racha), y = my + 1 + Math.round(i * (1 - racha) * 0.8 + Math.sin(t * 7 - i * 0.6) * i * 0.12), w = 2 - Math.floor(i / 5), c = c_enLuz(Math.floor(i / 3) % 2 ? '#f4f0e8' : '#e8602a', sh);
      for (let j = -w; j <= w; j++) R.pset(x, y + j, c); } }
  // el viento en la hierba: una ola que pasa y levanta las puntas; luciérnagas de noche sobre el prado
  { const ola = (t * 34) % 420 - 50; for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 142) * 320), y = 146 + Math.floor(h(i, 2, 142) * 32); if (x >= kx0 && y < ky1 + 3) continue; const cerca = Math.abs(x - ola) < 26, s = Math.round(Math.sin(t * 2 + x * 0.2) * (cerca ? 2 : 1));
    R.pset(x + s, y - 1, cerca ? L.prado[4] : L.prado[3]); R.pset(x + Math.round(s / 2), y, L.prado[3]); } }
  if (noche) for (let i = 0; i < 8; i++) { const s = Math.sin(t * (1.2 + h(i, 1, 143)) + i * 2.1); if (s < 0.35) continue; const x = Math.round(h(i, 2, 143) * 200 + Math.sin(t * 0.5 + i) * 6), y = Math.round(146 + h(i, 3, 143) * 20 + Math.cos(t * 0.7 + i) * 3); R.pset(x, y, s > 0.8 ? P.luciernaga[0] : P.luciernaga[1]); }
  // el farol del alero (de noche y de tarde, encendido, con su luz en la pared y las polillas)
  const lx = 300, ly = ky0 + 9;
  if (luz !== 'dia') for (let j = 0; j < 30; j++) for (let i = -30; i <= 30; i++) { const x = lx + i, y = ly + j; const d = Math.hypot(i / 30, j / 30); if (x > kx0 && d < 1 && (1 - d) * 0.6 > d_bay(x, y) + 0.1 && (x + y) % 2) R.pset(x, y, L.bloque[3]); }
  R.rect(lx - 3, ly - 3, lx + 3, ly - 2, P.sil[0]); R.rect(lx - 2, ly - 1, lx + 2, ly + 1, luz === 'dia' ? hex('#d8d4c0') : P.luz[0]); R.pset(lx, ly, luz === 'dia' ? hex('#f4f0e0') : hex('#fff8e0'));
  if (luz !== 'dia') for (let i = 0; i < 3; i++) { const a = t * (3 + i) + i * 2; R.pset(Math.round(lx + Math.cos(a) * (5 + i * 2)), Math.round(ly + 2 + Math.sin(a * 1.3) * 3), P.papel[2]); }
  // el calendario de taco colgado de su clavo: la cabecera roja con las anillas, la hoja con el número del día (1–60) y
  // la hoja de ayer que cae al suelo; las hojas caídas se amontonan junto a la pared
  const [cx, cy] = gg.calendario, dia = Math.min(60, Math.floor(dias) + 1), cae = dias % 1, ok = dias < 60;
  R.pset(cx, cy - 34, P.laton[3]); R.linea(cx, cy - 34, cx - 10, cy - 28, P.sil[0]); R.linea(cx, cy - 34, cx + 10, cy - 28, P.sil[0]);
  R.rect(cx - 22, cy - 26, cx + 24, cy + 30, P.sil[0]);
  R.rect(cx - 24, cy - 28, cx + 22, cy - 18, P.rojo); R.rect(cx - 24, cy - 28, cx + 22, cy - 27, hex('#ff6a5a')); R.rect(cx - 24, cy - 19, cx + 22, cy - 18, P.rojoS);
  for (const ax of [cx - 14, cx - 1, cx + 12]) { R.rect(ax, cy - 23, ax + 2, cy - 22, P.sil[0]); R.pset(ax + 1, cy - 25, P.laton[3]); }
  for (let j = 0; j < 4; j++) R.linea(cx - 23 + j, cy + 28 - j, cx + 21 - j, cy + 28 - j, P.papel[j === 0 ? 0 : 1]);
  R.rect(cx - 24, cy - 17, cx + 22, cy + 24, P.papel[3]); R.linea(cx - 24, cy - 17, cx + 22, cy - 17, P.papel[1]);
  R.numero(String(dia), cx - 1, cy + 9, { centro: true, tam: 16, color: hex('#2a2030'), sombra: false, contorno: false });
  for (let i = 0; i < 7; i++) R.rect(cx - 19 + i * 6, cy + 16, cx - 16 + i * 6, cy + 17, i === 6 ? P.rojo : P.papel[1]);
  if (ok && cae > 0.06 && cae < 0.6 && dias >= 1) { const v = 0.15 + (cae - 0.06) / 0.54 * 0.85, py = Math.round(cy - 17 + v * (gg.suelo - cy + 17) * v), px = Math.round(cx - 1 + Math.sin(v * 7) * 10 + v * 16), w = Math.round(22 * (1 - Math.abs(Math.sin(v * 7)) * 0.5));
    R.poligono([[px - w, py], [px + w, py + Math.round(Math.sin(v * 7) * 4)], [px + w, py + 30 + Math.round(Math.sin(v * 7) * 4)], [px - w, py + 30]], P.papel[2]); R.linea(px - w, py, px + w, py + Math.round(Math.sin(v * 7) * 4), P.papel[0]); }
  const mon = Math.min(14, Math.floor(dias / 4)); for (let i = 0; i < mon; i++) { const x = 272 + Math.round(h(i, 1, 128) * 14), y = gg.suelo + 2 - Math.floor(i / 3); R.rect(x, y, x + 9, y + 1, i % 2 ? P.papel[2] : P.papel[1]); R.pset(x + 2, y, P.papel[3]); }
  return { dia };
}
// el encuadre y la cámara que piden las opciones (las mismas reglas que vista(): un encuadre que no existe cae en el
// primero; una cámara que no es la suya, en 'general')
function e_vista(o) { const enc = V_TELESCOPIOS[o.encuadre] ? o.encuadre : 'vla', e = V_TELESCOPIOS[enc], cam = o.camara === e.cam ? e.cam : 'general'; return [enc, cam, e[cam].geo]; }

// trama ordenada de Bayer 4×4 (umbral 0–1 por píxel), límites y mezcla de dos colores del búfer
const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_um = (x, y) => e_B4[((y & 3) << 2) | (x & 3)];

const e_lim = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

function e_mez(a, b, f) { const g = 1 - f; return (((((a >>> 24) * g + (b >>> 24) * f) & 255) << 24) | (((((a >> 16) & 255) * g + ((b >> 16) & 255) * f) & 255) << 16) | (((((a >> 8) & 255) * g + ((b >> 8) & 255) * f) & 255) << 8) | (((a & 255) * g + (b & 255) * f) & 255)) >>> 0; }

// un tono de una rampa (u 0–1) con trama, sin escalones lisos
const e_tono = (cs, u, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(u * (cs.length - 1) + e_um(x, y))))];

// una lista de colores '#rrggbb' a colores del búfer
const e_hx = (a) => a.map(hex);

// ruido suave en 1D y 2D (para crestas, manchas y nubes)
const e_r1 = (x, s) => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return h(i, s, 5) * (1 - u) + h(i + 1, s, 5) * u; };

const e_r2 = (x, y, s) => { const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  return (h(i, j, s) * (1 - u) + h(i + 1, j, s) * u) * (1 - v) + (h(i, j + 1, s) * (1 - u) + h(i + 1, j + 1, s) * u) * v; };

// cuánto se ve lo que pasa por las zonas tranquilas (la de Atom, x 278–318 e y 4–44, y la barra del año con sus cifras,
// x 20–170 e y 0–20): dentro, casi nada (0,08); en un margen de 14 px por fuera, sube tramado hasta 1 (sin bordes duros)
const e_vis = (x, y) => { const a = Math.max(278 - x, x - 318, 4 - y, y - 44), b = Math.max(20 - x, x - 170, -y, y - 20), d = Math.min(a, b);
  return d >= 14 ? 1 : d <= 0 ? 0.08 : Math.min(1, Math.max(0.08, 0.08 + 0.92 * d / 14 + (h(x, y, 9) - 0.5) * 0.12)); };

// un fondo fijo por clave, pintado una vez en un búfer propio (con lo que devuelva dibuja: máscaras) y copiado cada vez
const e_CAPAS = new Map();

function e_capa(R, clave, dibuja) {
  let c = e_CAPAS.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja() || {}; R.usar(prev); c = { b, ...extra }; e_CAPAS.set(clave, c); }
  R.copiar(c.b); return c;
}

// un píxel que solo se pinta donde la máscara M lo deja (y en las zonas tranquilas, casi transparente)
const e_psM = (R, M, x, y, c, f = 1) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const i = y * 320 + x; if (M && !M[i]) return; const B = R.buf, v = e_vis(x, y) * f; B[i] = v < 1 ? e_mez(B[i], c, v) : c; };

// el cielo en degradado tramado con un poco de ruido (sin franjas lisas); guarda el color de cada píxel para la máscara
function e_degradado(R, CI, hor, pot, sem) {
  const B = R.buf;
  for (let y = 0; y < hor; y++) { const u = Math.pow(y / hor, pot); for (let x = 0; x < 320; x++) B[y * 320 + x] = e_tono(CI, e_lim(u + (e_r2(x / 23, y / 7, sem) - 0.5) * 0.07), x, y); }
}

// la máscara del cielo: lo que, al acabar la capa fija, sigue siendo el color del degradado
function e_mascara(B, cop, hor) { const M = new Uint8Array(57600); for (let i = 0; i < hor * 320; i++) M[i] = B[i] === cop[i] ? 1 : 0; return M; }

// un cúmulo: bolas de distinto tamaño con la base casi plana, a cuatro tonos [base, sombra, cuerpo, luz] con la luz del
// lado ld (1 derecha, -1 izquierda); aplana: cuánto baja la base plana (en anchos); ey: aplastado vertical (0,45–0,5 para
// los estratocúmulos); solo donde M deja cielo
function e_cumulo(R, M, cx, cy, w, sem, T4, ld = 1, aplana = 0.07, ey = 1) {
  const B = R.buf, n = 3 + Math.floor(w / 8), bolas = [];
  for (let i = 0; i < n; i++) { const f = (i + 0.5) / n, r = w * (0.16 + 0.2 * Math.sin(f * Math.PI)) * (0.75 + h(i, sem, 31) * 0.5); bolas.push([cx + (f - 0.5) * w * 0.9 + (h(i, sem, 33) - 0.5) * 4, cy - r * ey * (0.3 + h(i, sem, 32) * 0.35), r]); }
  const yb = Math.round(cy + Math.max(1, w * aplana)), x0 = Math.floor(cx - w * 0.72), x1 = Math.ceil(cx + w * 0.72), y0 = Math.floor(cy - w * 0.8 * ey);
  for (let y = Math.max(0, y0); y <= Math.min(179, yb); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const i = y * 320 + x; if (M && !M[i]) continue;
    let best = -9, dd = 9;
    for (let k = 0; k < bolas.length; k++) { const [bx, by, r] = bolas[k], dx = x + 0.5 - bx, dy = (y + 0.5 - by) / ey, d = (dx * dx + dy * dy) / (r * r); if (d < 1) { const s = (dx * ld * 0.55 - dy) / r; if (s > best) best = s; if (d < dd) dd = d; } }
    if (best === -9) continue;
    if (dd > 0.82 && h(x, y, sem + 34) < 0.45) continue;   // el borde deshilachado
    const l = 0.5 + best * 0.42 - (y >= yb - 1 ? 0.45 : y >= yb - 3 ? 0.2 : 0) + (h(x >> 1, y >> 1, sem) - 0.5) * 0.12;
    const c = e_tono(T4, e_lim(l), x, y), vi = e_vis(x, y); B[i] = vi < 1 ? e_mez(B[i], c, vi) : c;
  }
}

// un pájaro pequeño (cuervo, gaviota, ratonero) que bate o planea; c y, si hay, la punta de las alas cp
function e_ave(R, M, x, y, f, c, cp = c, grande = false) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(f) > 0.2 ? -1 : Math.sin(f) < -0.6 ? 1 : 0;
  e_psM(R, M, x, y, c); e_psM(R, M, x - 1, y + (a < 0 ? -1 : 0), c); e_psM(R, M, x + 1, y + (a < 0 ? -1 : 0), c);
  e_psM(R, M, x - 2, y + a, cp); e_psM(R, M, x + 2, y + a, cp);
  if (grande) { e_psM(R, M, x - 3, y + a * 2 - (a === 0 ? 0 : 0), cp); e_psM(R, M, x + 3, y + a * 2, cp); e_psM(R, M, x, y + 1, c); }
}

// UNA ANTENA PARABÓLICA vista desde abajo y de lado: (cx, cy) el centro del plato, r el radio, a el ángulo de pantalla
// hacia el que apunta (radianes; −π/2 es arriba), k (0–1) cuánto se le ve la cara. P: [contorno, sombra, medio, luz,
// brillo]; ld: de qué lado viene el sol (1 derecha, −1 izquierda). El lomo asoma por debajo como una media luna oscura,
// la cara cóncava se sombrea con la luz, las juntas de los paneles en anillos y radios (si es grande), el labio de
// delante coge brillo. o.foco: 'cuadripode' (cuatro patas y el subreflector) o 'brazo' (un brazo de lado con la
// bocina, las antenas pequeñas de California); o.M: una máscara donde no se pinta (lo de delante)
function e_plato(R, cx, cy, r, a, k, P, ld = 1, o = {}) {
  const dx = Math.cos(a), dy = Math.sin(a), mx = -dy, my = dx, rk = Math.max(1, r * k), B = R.buf, ext = r + 3;
  const gro = Math.max(1, r * 0.07 + (1 - k) * r * 0.06), q = Math.sqrt(1 - k * k);
  const pt = (u, v) => [cx + mx * u * r + dx * v * rk, cy + my * u * r + dy * v * rk];
  const e1 = 1 - 1.4 / r, e2 = 1 - 1.15 / r, anillos = r >= 12 && o.anillos !== false;
  for (let y = Math.max(0, Math.floor(cy - ext)); y <= Math.min(179, Math.ceil(cy + ext)); y++) for (let x = Math.max(0, Math.floor(cx - ext)); x <= Math.min(319, Math.ceil(cx + ext)); x++) {
    const i = y * 320 + x; if (o.M && o.M[i]) continue;
    const px = x + 0.5 - cx, py = y + 0.5 - cy, u = (px * mx + py * my) / r, v = (px * dx + py * dy) / rk, rr = u * u + v * v;
    if (rr <= 1) {
      let l = 0.62 + 0.2 * v * (v > 0 ? 1 : 0.4) - 0.24 * u * ld * Math.sign(mx || 1) + (1 - rr) * 0.08;
      if (anillos) { const s = Math.sqrt(rr) * 3.4; if (s - Math.floor(s) < 0.13 && rr > 0.06) l -= 0.09; const an = Math.atan2(v, u) / (2 * Math.PI) * 16; if (an - Math.floor(an) < 0.08 && rr > 0.12) l -= 0.06; }
      let c = e_tono(P.slice(1, 5), e_lim(l), x, y);
      if (rr > e1 * e1) c = v < 0.15 ? P[4] : rr > e2 * e2 ? P[0] : P[1];
      B[i] = c; continue;
    }
    const pxb = px + dx * gro, pyb = py + dy * gro, ub = (pxb * mx + pyb * my) / r, vb = (pxb * dx + pyb * dy) / rk, rb = ub * ub + vb * vb;
    if (rb <= 1) B[i] = rb > e2 * e2 || vb > 0.3 ? P[0] : (h(x, y, 77) < 0.25 ? P[0] : P[1]);
  }
  // el cono de la bocina en el vértice y el foco
  if (r >= 6) { const [hx, hy] = [cx + dx * rk * 0.18, cy + dy * rk * 0.18]; R.pset(Math.round(hx), Math.round(hy), P[0]); if (r >= 10) { R.pset(Math.round(hx + mx), Math.round(hy + my), P[1]); R.pset(Math.round(hx - mx), Math.round(hy - my), P[1]); } }
  const lar = r * 0.82 * Math.max(0.25, q), ax = cx + dx * lar, ay = cy + dy * lar;
  if ((o.foco ?? 'cuadripode') === 'cuadripode') {
    const pies = [pt(0.72, 0.62), pt(-0.72, 0.62), pt(0.72, -0.62), pt(-0.72, -0.62)];
    pies.forEach(([fx, fy], j) => { R.linea(fx, fy, ax, ay, j < 2 ? P[1] : P[0]); if (r >= 24) R.linea(fx + 1, fy, ax + 1, ay, j < 2 ? P[2] : P[1]); });
    const sr = Math.max(1, Math.round(r * 0.09)); R.disco(ax, ay, sr + 0.6, P[0]); R.disco(ax, ay, sr - 0.2, P[3]);
    if (r >= 14) R.pset(Math.round(ax + ld), Math.round(ay - 1), P[4]);
  } else {
    const [bx, by] = pt(0, -0.92), fx = bx + dx * lar * 1.05 + mx * 0.6, fy = by + dy * lar * 1.05 + my * 0.6;
    R.linea(bx, by, fx, fy, P[0]); R.linea(bx + mx * 0.7, by + my * 0.7, fx, fy, P[1]);
    R.disco(fx, fy, Math.max(1, r * 0.16), P[0]); R.pset(Math.round(fx), Math.round(fy), P[3]);
  }
  return [ax, ay];
}

// 3×5 cifras (para «1800» y lecturas): x, y arriba a la izquierda
const e_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];

function e_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = e_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

const e_PLATO = e_hx(['#5a6470', '#a4aebb', '#c8d0d8', '#e4e8ec', '#fbfcfd']);

const e_VLA = { hor: 104, N: [296, 142], V: [66, 103] };

// la posición sobre la vía (s 0 delante, 1 en el punto de fuga) y la escala de cada antena del primer brazo
const e_vlaS = (i) => 1 - 1 / (1 + i * 0.6);

const e_vlaXY = (s) => [e_VLA.N[0] + (e_VLA.V[0] - e_VLA.N[0]) * s, e_VLA.N[1] + (e_VLA.V[1] - e_VLA.N[1]) * s];

// el pedestal de una antena del conjunto: base sobre la vía, la torre con la escalerilla y la horquilla
function e_pedestalVLA(R, x, base, r, ld = 1) {
  const P = e_PLATO, w = Math.max(1.5, r * 0.32), alto = r * 1.2, x0 = Math.round(x - w), x1 = Math.round(x + w), y0 = Math.round(base - alto);
  for (let y = y0; y <= base; y++) for (let xx = x0; xx <= x1; xx++) { const f = (xx - x0) / Math.max(1, x1 - x0); R.pset(xx, y, xx === x0 || xx === x1 ? P[0] : (ld > 0 ? f > 0.55 : f < 0.45) ? P[3] : P[2]); }
  if (r >= 9) { for (let y = y0 + 2; y < base - 1; y += 2) R.pset(x0 + 1, y, P[1]); R.pset(Math.round(x), y0 + 3, P[0]); R.rect(x0 - 1, base - 1, x1 + 1, base, P[0]); R.rect(x0, base - 2, x1, base - 2, P[1]); }
  // la horquilla: dos brazos que suben hasta el eje del plato
  const yh = Math.round(base - alto - r * 0.15);
  R.linea(x0, y0, x0 + 1, yh, P[1]); R.linea(x1, y0, x1 - 1, yh, P[0]);
  return yh;
}

// la capa fija del desierto (cielo, sierra, mesetas, llanura, vías, camino, matas y postes); devuelve la máscara del cielo
function e_vlaFijo(R) {
  const B = R.buf, HOR = e_VLA.hor;
  // el cielo: azul alto del desierto, más pálido abajo
  e_degradado(R, e_hx(['#3460a6', '#3e6cb0', '#4a7aba', '#5888c4', '#6898cc', '#7aa8d4', '#8eb6da', '#a4c4e0', '#bad2e4', '#cedce4', '#dee2e0']), HOR, 1.15, 40);
  const cop = B.slice();
  // la sierra lejana azul violeta, con cárcavas y el lado del sol más claro
  const SI = e_hx(['#6a6c9c', '#7678a6', '#8486b0', '#9496ba', '#a6a6c4', '#b8b6cc']);
  const cresta = (x) => 84 - 13 * e_r1(x / 52 + 3, 1) - 6 * e_r1(x / 15, 2) - 2 * e_r1(x / 5, 3);
  for (let x = 0; x < 320; x++) { const top = Math.round(cresta(x)), sl = cresta(x + 2) - cresta(x - 2);
    for (let y = top; y < HOR; y++) { const pr = (y - top) / Math.max(1, HOR - top), carc = e_r2((x + (y - top) * (sl > 0 ? 0.9 : -0.9)) / 4, (y - top) / 6, 4);
      B[y * 320 + x] = e_tono(SI, e_lim(0.42 + sl * 0.09 + (carc - 0.5) * 0.36 * (1 - pr * 0.7) + pr * 0.4 + (y === top ? 0.12 : 0)), x, y); } }
  // dos mesetas rosadas con estratos y su derrubio (la grande a la izquierda, detrás del edificio)
  const ME = e_hx(['#8a6a5e', '#9c786a', '#b08a76', '#c29c84', '#d2ae94', '#dcbea2']);
  const meseta = (xa, xb, top, pie) => { for (let x = Math.max(0, xa - 14); x <= Math.min(319, xb + 14); x++) {
    const borde = x < xa ? (xa - x) : x > xb ? (x - xb) : 0, yt = Math.round(top + (borde > 0 ? borde * 0.9 + (h(x, 1, 44) < 0.3 ? 1 : 0) : (h(x >> 2, 2, 44) < 0.2 ? 1 : 0)));
    for (let y = yt; y < HOR; y++) { const capa = Math.floor((y - top) / 3) & 1, der = y > pie - (borde > 0 ? 0 : 0) && borde > 0;
      let l = 0.48 + (capa ? 0.1 : -0.04) + (x > xb - 3 && x <= xb + 14 ? -0.22 : 0) + (y === yt ? 0.3 : 0) + (h(x, y, 45) - 0.5) * 0.14;
      if (y > pie) l = 0.5 + (h(x >> 1, y, 46) - 0.5) * 0.25 - (x > xb ? 0.15 : 0);
      if (der) l -= 0.05;
      B[y * 320 + x] = e_tono(ME, e_lim(l), x, y); } } };
  meseta(-10, 62, 88, 97); meseta(214, 252, 95, 100);
  // la llanura ocre: manchas grandes, grano fino y la bruma del horizonte
  const SU = e_hx(['#9a7048', '#a87c52', '#b6895c', '#c29668', '#cca474', '#d4b084', '#dabc94', '#ddc6a4']);
  for (let y = HOR; y < 180; y++) { const dz = (y - HOR) / (180 - HOR);
    for (let x = 0; x < 320; x++) { const n = e_r2(x / (8 + dz * 26), y / (2 + dz * 9), 47), g = h(x, y, 48);
      B[y * 320 + x] = e_tono(SU, e_lim(0.86 - dz * 0.42 + (n - 0.5) * 0.4 + (g - 0.5) * 0.14), x, y); } }
  // la vía doble del primer brazo: balasto, traviesas y carriles que convergen hacia el centro del conjunto
  const [Nx, Ny] = e_VLA.N, [Vx, Vy] = e_VLA.V, sFin = 0.8;
  for (let x = Math.round(Vx + (Nx - Vx) * (1 - sFin)); x <= 330; x++) { const s = (Nx - x) / (Nx - Vx); if (s < -0.2) continue; const yc = Ny + (Vy - Ny) * s, w = 9 * (1 - s) + 1;
    for (let y = Math.round(yc - w * 0.5); y <= Math.round(yc + w * 0.5); y++) { if (x < 0 || x > 319) continue; const g = h(x, y, 49); B[y * 320 + x] = g < 0.35 ? hex('#8a7a68') : g < 0.75 ? hex('#a69680') : hex('#bcae98'); }
    const pas = Math.max(1, Math.round(3 * (1 - s) + 1)); if (x % pas === 0 && x >= 0 && x <= 319) R.linea(x, Math.round(yc - w * 0.36), x, Math.round(yc + w * 0.36), hex('#6a5038'));
    for (const f of [-0.3, -0.12, 0.12, 0.3]) { const yy = Math.round(yc + f * w); if (x >= 0 && x <= 319) { B[yy * 320 + x] = hex('#4a4a50'); if (w > 4 && f < 0) B[(yy - 1) * 320 + x] = hex('#b8bcc0'); } } }
  // el segundo brazo, hacia la izquierda: más estrecho
  for (let x = 0; x <= 104; x++) { const yc = 109 + (104 - x) * 0.07; R.pset(x, Math.round(yc), hex('#8a7a68')); R.pset(x, Math.round(yc) + 1, (x & 1) ? hex('#4a4a50') : hex('#a69680')); }
  // el camino de tierra con sus rodadas, de la izquierda (el edificio) hacia la derecha
  const CAM = e_VLA.camino = (x) => 125 + Math.sin(x * 0.012) * 1.5;
  for (let x = 0; x < 320; x++) { const yc = CAM(x); for (let y = Math.round(yc - 2); y <= Math.round(yc + 2); y++) { const f = y - yc; B[y * 320 + x] = Math.abs(f) > 1.6 ? hex('#b08a60') : Math.abs(f + 0.8) < 0.4 || Math.abs(f - 0.9) < 0.4 ? hex('#c8a87c') : (h(x, y, 50) < 0.5 ? hex('#d6b88c') : hex('#ceb084')); } }
  // las matas de gobernadora, los matojos y las piedras, más grandes cuanto más cerca; con su sombra a la izquierda
  const MA = e_hx(['#3a4426', '#4c5830', '#5e6a3a', '#748048', '#8a9258']);
  for (let k = 0; k < 520; k++) { const dz = Math.pow(h(k, 1, 51), 1.5), y = HOR + 2 + dz * (178 - HOR), x = h(k, 2, 51) * 330 - 5, s = 0.5 + dz * 4.2, tipo = h(k, 3, 51);
    const yv = Ny + (Vy - Ny) * ((Nx - x) / (Nx - Vx)); if (Math.abs(y - yv) < 3 + 6 * (1 - (Nx - x) / (Nx - Vx)) && x > 60) continue; if (Math.abs(y - CAM(x)) < 3.5) continue;
    if (tipo < 0.62) { // mata: cúpula irregular con luz a la derecha y su sombra
      const rx = s * 1.35, ry = s;
      for (let j = -Math.ceil(ry); j <= 1; j++) for (let i = -Math.ceil(rx) - 2; i <= Math.ceil(rx); i++) { const X = Math.round(x + i), Y = Math.round(y + j); if (X < 0 || X > 319 || Y >= 180) continue;
        const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (j >= 0 && d < 1.4 && i < 0) { B[Y * 320 + X] = e_mez(B[Y * 320 + X], hex('#6a4a2c'), 0.45); continue; }
        if (d > 1 || h(X, Y, 52) < 0.15 * d) continue; B[Y * 320 + X] = e_tono(MA, e_lim(0.4 + (i / rx) * 0.35 - (j / ry) * 0.25 + (h(X, Y, 53) - 0.5) * 0.4), X, Y); } }
    else if (tipo < 0.85) { const n = Math.max(1, Math.round(s * 1.2)); for (let i = -n; i <= n; i++) R.linea(Math.round(x + i), Math.round(y), Math.round(x + i * 1.5), Math.round(y - s * 1.3 - (i & 1)), (i & 1) ? hex('#d8c27c') : hex('#b8a058')); }
    else { const rr = Math.max(0.8, s * 0.6); R.disco(x, y - rr * 0.5, rr, hex('#8a8078')); R.pset(Math.round(x + rr * 0.3), Math.round(y - rr), hex('#c8beb2')); R.pset(Math.round(x - rr), Math.round(y), hex('#6a4a2c')); } }
  // los postes de la luz a lo largo del camino, con los cables en catenaria
  const postes = [30, 92, 160, 226, 300], top = (x) => CAM(x) - 13;
  for (let k = 0; k < postes.length; k++) { const x = postes[k], y = Math.round(CAM(x) - 1); R.linea(x, y, x, Math.round(top(x)), hex('#5a4030')); R.linea(x - 3, Math.round(top(x)) + 1, x + 3, Math.round(top(x)) + 1, hex('#5a4030')); R.pset(x + 1, y, hex('#3a2a20'));
    if (k + 1 < postes.length) { const x2 = postes[k + 1]; for (const off of [-3, 3]) for (let xx = x + off; xx <= x2 + off; xx++) { const u = (xx - x - off) / (x2 - x), yy = Math.round(top(x) + 1 + (top(x2) - top(x)) * u + Math.sin(u * Math.PI) * 3); R.pset(xx, yy, hex('#4a4040')); } } }
  return { M: e_mascara(B, cop, HOR) };
}

// el edificio de control (se pinta cada vez, porque tapa las antenas del segundo brazo): bloques claros con juntas,
// banda de ventanas que reflejan el cielo, un cuerpo alto, equipos en el tejado, el mástil con su luz roja, la puerta,
// un coche aparcado y un técnico que va y viene
function e_vlaEdificio(R, t) {
  const B = R.buf, [X0, Y0, X1, Y1] = [8, 110, 66, 132];
  const MU = e_hx(['#a89884', '#c2b29c', '#d6c8b2', '#e6dac6', '#f0e8d8']);
  // la sombra en el suelo (sol a la derecha: hacia la izquierda)
  for (let y = Y1 - 2; y <= Y1 + 1; y++) for (let x = X0 - 6; x < X0 + 4; x++) if (x >= 0) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#6a4a2c'), 0.4);
  const cuerpo = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const junta = (y - y0) % 3 === 2 || ((x + ((((y - y0) / 3) | 0) & 1) * 3) % 6 === 0);
    B[y * 320 + x] = e_tono(MU, e_lim(0.62 + (x - x0) / (x1 - x0) * 0.25 - (junta ? 0.18 : 0) - (y - y0) / (y1 - y0) * 0.1), x, y); }
    R.rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, hex('#8a7c6c')); R.rect(x0 - 1, y0 - 2, x1 + 1, y0 - 2, hex('#e8e0d0')); R.rect(x0, y1 + 1, x1, y1 + 1, hex('#7a6a5a')); };
  cuerpo(X0, 118, X1, Y1 - 1); cuerpo(X0 + 34, Y0 + 2, X1 - 4, 117);
  // la banda de ventanas, con el cielo reflejado que corre
  for (let x = X0 + 3; x <= X1 - 3; x++) { if ((x - X0) % 8 === 7) continue; const ref = ((x * 2 + Math.floor(t * 3)) % 23) < 3;
    for (let y = 121; y <= 125; y++) B[y * 320 + x] = ref && y < 124 ? hex('#cfe2ee') : y === 121 ? hex('#2a3a4a') : (x + y) % 5 === 0 ? hex('#6a8aa6') : hex('#3e5670'); }
  for (let x = X0 + 37; x <= X1 - 7; x += 5) { R.rect(x, Y0 + 5, x + 2, Y0 + 7, hex('#3e5670')); R.pset(x, Y0 + 5, hex('#9ab8d0')); }
  // la puerta, con su luz encendida
  R.rect(X0 + 22, 126, X0 + 26, Y1 - 1, hex('#5a4a3a')); R.rect(X0 + 23, 127, X0 + 25, 129, hex('#e8c878'));
  // los equipos del tejado y el mástil con su luz roja que parpadea
  R.rect(X0 + 6, 113, X0 + 14, 116, hex('#9aa0a8')); R.rect(X0 + 6, 113, X0 + 14, 113, hex('#c8ced4')); for (let x = X0 + 7; x < X0 + 14; x += 2) R.pset(x, 115, hex('#6a7078'));
  R.rect(X0 + 18, 114, X0 + 22, 116, hex('#b8bcc0')); R.disco(X0 + 20, 113, 1.6, hex('#e8ecf0'));
  R.linea(X0 + 50, Y0, X0 + 50, Y0 - 16, hex('#6a6e74')); R.linea(X0 + 48, Y0 - 10, X0 + 52, Y0 - 10, hex('#6a6e74')); R.linea(X0 + 47, Y0 - 14, X0 + 53, Y0 - 14, hex('#6a6e74'));
  R.pset(X0 + 50, Y0 - 17, Math.sin(t * 4) > 0 ? hex('#ff4a3a') : hex('#7a2a24'));
  // el coche aparcado: un sedán de los noventa, beis
  const cx = X1 - 12, cy = Y1 + 1; R.rect(cx, cy - 4, cx + 11, cy - 2, hex('#c8b89a')); R.rect(cx + 2, cy - 6, cx + 8, cy - 5, hex('#b4a486')); R.rect(cx + 3, cy - 6, cx + 7, cy - 6, hex('#7a9ab4')); R.rect(cx, cy - 2, cx + 11, cy - 2, hex('#8a7a62'));
  R.pset(cx + 2, cy - 1, hex('#2a2a2a')); R.pset(cx + 9, cy - 1, hex('#2a2a2a')); R.pset(cx + 11, cy - 4, hex('#f8e8b0'));
  // el técnico pequeño (camisa clara, gorra) que va de la puerta al coche y vuelve
  const u = (Math.sin(t * 0.35) + 1) / 2, tx = Math.round(X0 + 28 + u * 14), ty = Y1 + 2, paso = Math.floor(t * 5) & 1;
  R.rect(tx, ty - 7, tx + 1, ty - 4, hex('#e8e4dc')); R.rect(tx, ty - 9, tx + 1, ty - 8, hex('#c89a74')); R.rect(tx, ty - 10, tx + 1, ty - 10, hex('#3a5a8a'));
  R.pset(tx + (paso ? 0 : 1), ty - 3, hex('#3a3a4a')); R.pset(tx + (paso ? 1 : 0), ty - 2, hex('#3a3a4a')); R.pset(tx, ty - 1, hex('#2a2a2a')); R.pset(tx + 1, ty - 1, hex('#2a2a2a'));
}

// el desierto en cada fotograma: sol, nubes, cuervos, remolino, antenas que giran, furgoneta, edificio y matojos
function e_vla(R, t, o, giro, g) {
  const capa = e_capa(R, 'tel|vla', () => e_vlaFijo(R)), M = capa.M, B = R.buf;
  // el sol con su halo tramado (a la derecha, lejos de Atom)
  const [sx, sy] = g.sol;
  for (let y = sy - 18; y <= sy + 18; y++) for (let x = sx - 18; x <= sx + 18; x++) { const i = y * 320 + x; if (!M[i]) continue; const d = Math.hypot(x - sx, y - sy); if (d > 18) continue;
    B[i] = d < 5 ? (d < 3.6 ? hex('#fffef0') : hex('#fff4c8')) : e_um(x, y) < (1 - d / 18) * 0.55 ? e_mez(B[i], hex('#fff8e0'), 0.5) : B[i]; }
  // las nubes: altas y grandes (lentas), medias, y pequeñas cerca del horizonte (más rápidas)
  const NU = e_hx(['#9eb0c8', '#c4d0de', '#e6ecf2', '#ffffff']);
  [[40, 40, 0.6, 1], [190, 36, 0.6, 2], [110, 54, 1.1, 3], [262, 60, 1.1, 4], [20, 66, 1.8, 5], [160, 72, 1.8, 6], [240, 82, 2.6, 7], [80, 87, 2.6, 8]].forEach(([x0, y, v, s], k) => {
    const w = [44, 36, 30, 26, 22, 20, 16, 14][k], x = ((x0 + t * v) % 380) - 30; e_cumulo(R, M, x, y, w, 60 + s, NU, 1); });
  // dos cuervos que planean en círculo
  for (let k = 0; k < 2; k++) { const an = t * 0.35 + k * 2.6, x = 150 + Math.cos(an) * (34 + k * 8), y = 52 + Math.sin(an) * 9 + k * 4; e_ave(R, M, x, y, t * (k ? 5 : 3) + k, hex('#1e1a20'), hex('#2a2630'), true); }
  // el remolino de polvo que vaga por la llanura
  { const bx = 236 + Math.sin(t * 0.21) * 22, by = 112; for (let j = 0; j < 22; j++) { const yy = by - j, w = 1 + j * 0.16, fase = t * 6 - j * 0.5;
    for (let s = 0; s < 3; s++) { const xx = bx + Math.sin(fase + s * 2.1) * w + j * 0.15; if (h(Math.round(xx), yy, Math.floor(t * 8)) < 0.75 - j / 30) { const i = yy * 320 + Math.round(xx); B[i] = e_mez(B[i], hex('#e2cca4'), 0.6 - j / 50); } } } }
  // las antenas: todas apuntan al mismo sitio (giro 0–1) y se dibujan de la más lejana a la más cercana
  const a = -2.25 + giro * 0.7, k = 0.42 + giro * 0.2, platos = [];
  // el segundo brazo (pequeñas, detrás del edificio)
  [[84, 110, 4.2], [60, 112, 4.6], [36, 114, 5]].forEach(([x, base, r]) => { const yh = e_pedestalVLA(R, x, base, r); e_plato(R, x, yh - r * 0.2, r, a, k, e_PLATO, 1); platos.push([x, Math.round(yh - r * 0.2), r]); });
  // el primer brazo
  const lista = []; for (let i = 7; i >= 0; i--) { const s = e_vlaS(i), [x, base] = e_vlaXY(s), r = 22 / (1 + i * 0.6); lista.push([x, base, r]); }
  const vanX = ((t * 22) % 420) - 50, vanY = e_VLA.camino(vanX);
  let vanHecha = o.furgoneta === false;
  for (const [x, base, r] of lista) {
    if (!vanHecha && base > vanY + 1) { e_vlaFurgoneta(R, t, vanX, vanY); vanHecha = true; }
    const yh = e_pedestalVLA(R, x, base, r), cy = yh - r * 0.2; e_plato(R, x, cy, r, a, k, e_PLATO, 1); platos.unshift([Math.round(x), Math.round(cy), Math.round(r * 10) / 10]);
  }
  if (!vanHecha) e_vlaFurgoneta(R, t, vanX, vanY);
  e_vlaEdificio(R, t);
  // matojos secos que se mecen (por delante de la llanura, por detrás de los personajes)
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 70) * 320), y = Math.round(132 + h(k, 2, 70) * 44), n = 3 + Math.floor(h(k, 3, 70) * 3), vi = Math.sin(t * 2.2 + x * 0.05) * 1.5;
    for (let j = -n; j <= n; j++) R.linea(x + j, y, x + j * 1.6 + vi, y - 5 - (j & 1) - n * 0.5, (j & 1) ? hex('#e0c884') : hex('#b89c5a')); }
  g.platos = platos;
}

// la furgoneta blanca de los noventa por el camino, con el polvo que levanta detrás
function e_vlaFurgoneta(R, t, x, y) {
  const B = R.buf; x = Math.round(x); y = Math.round(y);
  for (let k = 0; k < 14; k++) { const u = k / 14, px = x - 3 - u * 26 + Math.sin(t * 3 + k) * 1.5, py = y - 1 - u * 5 - h(k, 1, 71) * 3; if (px < 0 || px > 319) continue; const rr = 1 + u * 3;
    for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= rr * rr && h(i + k, j, 72) < 0.6 - u * 0.4) { const X = Math.round(px + i), Y = Math.round(py + j); if (X >= 0 && X < 320 && Y >= 0 && Y < 180) B[Y * 320 + X] = e_mez(B[Y * 320 + X], hex('#dcc6a0'), 0.55 - u * 0.4); } }
  R.rect(x, y - 6, x + 11, y - 1, hex('#e8ecee')); R.rect(x + 8, y - 6, x + 11, y - 4, hex('#5a7a96')); R.rect(x, y - 6, x + 11, y - 6, hex('#ffffff'));
  R.rect(x, y - 3, x + 11, y - 3, hex('#3a6ab0')); R.rect(x, y - 1, x + 11, y - 1, hex('#8a9096'));
  R.pset(x + 2, y, hex('#1e1e22')); R.pset(x + 9, y, hex('#1e1e22')); R.pset(x + 11, y - 2, hex('#fff2b0'));
}

// delante del desierto: la planta rodadora que cruza botando por debajo de los pies y dos matas en las esquinas
function e_vlaDelante(R, t, o) {
  const MA = e_hx(['#3a4426', '#4c5830', '#5e6a3a', '#748048']);
  for (const [x0, y0, s] of [[-4, 180, 9], [324, 180, 10]]) for (let j = -s; j <= 0; j++) for (let i = -s * 1.4; i <= s * 1.4; i++) { const d = (i * i) / (s * s * 1.96) + (j * j) / (s * s); if (d > 1 || h(x0 + i, j, 73) < 0.12 * d) continue; R.pset(x0 + i, y0 + j, e_tono(MA, e_lim(0.45 + i / s * 0.2 - j / s * 0.3 + (h(Math.round(x0 + i), j, 74) - 0.5) * 0.5), Math.round(x0 + i), j)); }
  if (o.rodadora === false) return;
  const per = 11, u = (t % per) / per, x = -14 + u * 350, bote = Math.abs(Math.sin(u * Math.PI * 7)) * 5, y = 172 - bote, rot = t * 5;
  const B = R.buf; for (let j = -1; j <= 1; j++) for (let i = -6; i <= 6; i++) { const X = Math.round(x + i), Y = 176 + j; if (X >= 0 && X < 320 && h(X, Y, 75) < 0.7 - bote / 12) B[Y * 320 + X] = e_mez(B[Y * 320 + X], hex('#6a4a2c'), 0.35); }
  for (let k = 0; k < 26; k++) { const an = rot + k * 2.4, rr = 2 + (k % 5) * 0.9; R.linea(x + Math.cos(an) * rr, y + Math.sin(an) * rr, x + Math.cos(an + 1.9) * (rr + 1), y + Math.sin(an + 1.9) * (rr + 1), (k % 3) ? hex('#b08a54') : hex('#dcc08a')); }
}

const e_TAS_P = e_hx(['#3e4652', '#8a96a2', '#adb8c2', '#ccd4dc', '#eef2f4']);

const e_TAS = { hor: 92 };

// las crestas de la colina del medio y de la lejana en Tasmania (y de la cresta en cada x)
const e_tasCrestaM = (x) => 114 - 10 * e_r1(x / 70 + 2, 81) - 4 * e_r1(x / 21, 82);

const e_tasCrestaF = (x) => 101 - 8 * e_r1(x / 60 + 5, 83) - 2 * e_r1(x / 13, 84) + (x > 200 ? (x - 200) * 0.03 : 0);

// un eucalipto: tronco claro con vetas, ramas y copa rala en racimos con huecos y luz fría desde la izquierda; (x, base)
// el pie, alto en px, sem la semilla, CO cinco tonos de copa y TR cuatro de tronco; mece: cuánto se desplaza la copa
function e_eucalipto(R, x, base, alto, sem, CO, TR, mece = 0) {
  const ancho = Math.max(0, Math.round(alto / 48));
  for (let y = base - Math.round(alto * 0.55); y <= base; y++) for (let i = -ancho; i <= ancho; i++) R.pset(x + i + Math.round(Math.sin(y * 0.15 + sem) * 0.8), y, ancho === 0 ? TR[1] : i === ancho ? TR[0] : h(x + i, y >> 1, sem) < 0.3 ? TR[1] : i < 0 ? TR[3] : TR[2]);
  const ramas = 3 + Math.floor(alto / 22);
  for (let k = 0; k < ramas; k++) { const yb = base - alto * (0.45 + k * 0.08), d = k & 1 ? 1 : -1, lx = x + mece + d * alto * (0.12 + h(k, sem, 85) * 0.14), ly = yb - alto * 0.18; R.linea(x, yb, lx, ly, TR[1]); }
  const n = 6 + Math.floor(alto / 6);
  for (let k = 0; k < n; k++) { const ux = (h(k, sem, 86) - 0.5) * alto * 0.7, uy = -alto * (0.5 + h(k, sem, 87) * 0.42), rr = Math.max(1.5, alto * (0.1 + h(k, sem, 88) * 0.08)), cx = x + mece + ux, cy = base + uy;
    for (let j = -rr; j <= rr; j++) for (let i = -rr * 1.3; i <= rr * 1.3; i++) { const d = (i * i) / (rr * rr * 1.69) + (j * j) / (rr * rr); const X = Math.round(cx + i), Y = Math.round(cy + j); if (d > 1 || h(X, Y, sem + 89) < (alto < 20 ? 0.05 : 0.2) + d * (alto < 20 ? 0.15 : 0.35)) continue;
      R.pset(X, Y, e_tono(CO, e_lim(0.36 - i / rr * 0.16 - j / rr * 0.26 + (h(X, Y, sem + 90) - 0.5) * 0.4), X, Y)); } }
}

// la capa fija de Tasmania (cielo, cabo, mar, colinas, eucaliptos, prado, camino, torre, caseta y camioneta); devuelve
// las máscaras del cielo (M), de la hierba (Mh) y del mar (Mm)
function e_tasFijo(R) {
  const B = R.buf, HOR = e_TAS.hor;
  e_degradado(R, e_hx(['#4a6280', '#546c8a', '#5e7894', '#6a849e', '#7890a8', '#889cb0', '#9aaab8', '#acb8c2', '#bcc4c8']), HOR + 4, 0.95, 80);
  const cop = B.slice();
  // el cabo azulado al otro lado del mar
  const CB = e_hx(['#56687a', '#62748a', '#6e8094', '#7c8c9c']);
  for (let x = 0; x < 320; x++) { const top = Math.round(86 - 9 * e_r1(x / 40 + 1, 91) * (x < 170 ? 1 : 0.3) - 2 * e_r1(x / 9, 92) + (x > 150 ? (x - 150) * 0.03 : 0));
    for (let y = top; y < HOR; y++) B[y * 320 + x] = e_tono(CB, e_lim(0.35 + (h(x >> 1, y, 93) - 0.5) * 0.3 + (y === top ? 0.4 : 0) + (y - top) * 0.05), x, y); }
  // el mar: vetas horizontales que se aclaran hacia la orilla
  const MA = e_hx(['#34505e', '#3e5c6c', '#4a6a7a', '#587a8a', '#6a8a98']);
  for (let y = HOR; y < 112; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = e_tono(MA, e_lim(0.35 + (y - HOR) * 0.02 + (e_r1(x / 9 + y * 3.1, 94) - 0.5) * 0.5), x, y);
  const copMar = B.slice();
  // la colina lejana: prados de distinto verde, setos y eucaliptos pequeños
  const VF = e_hx(['#46603e', '#506c44', '#5c784a', '#688452', '#76905a']);
  for (let x = 0; x < 320; x++) { const top = Math.round(e_tasCrestaF(x));
    for (let y = top; y < 132; y++) { const campo = e_r2(x / 26, y / 6, 95), seto = Math.abs(e_r1(x / 18 + 0.2 * y, 96) - 0.5) < 0.03;
      B[y * 320 + x] = seto ? hex('#334a30') : e_tono(VF, e_lim(0.25 + campo * 0.5 + (y === top ? 0.3 : 0) + (h(x, y, 97) - 0.5) * 0.2), x, y); } }
  const CO = e_hx(['#3e4a38', '#56624a', '#6e7a5c', '#8a9474', '#a0a888']), TR = e_hx(['#6a6458', '#8a8070', '#d8d0c0', '#efe8da']);
  for (let k = 0; k < 9; k++) { const x = Math.round(20 + k * 33 + h(k, 1, 98) * 16); if (x > 210) continue; e_eucalipto(R, x, Math.round(e_tasCrestaF(x)) + 3, 8 + Math.round(h(k, 2, 98) * 5), 100 + k, CO, TR); }
  // la colina del medio, con sus cercas
  const VM = e_hx(['#3c5a32', '#46663a', '#527440', '#5e8048', '#6c8e52', '#7a9a5c']);
  for (let x = 0; x < 320; x++) { const top = Math.round(e_tasCrestaM(x));
    for (let y = top; y < 180; y++) { const pr = (y - top) / 40, campo = e_r2(x / 34, y / 9, 99);
      B[y * 320 + x] = e_tono(VM, e_lim(0.3 + campo * 0.35 + (y - top < 2 ? 0.3 : 0) - pr * 0.18 + (h(x, y >> 1, 101) - 0.5) * 0.26), x, y); } }
  for (let x = 0; x < 230; x++) { const y = Math.round(e_tasCrestaM(x) + 8 + x * 0.04); R.pset(x, y, hex('#3a3a30')); if (x % 9 === 0) { R.pset(x, y - 1, hex('#5a4a38')); R.pset(x, y - 2, hex('#5a4a38')); } }
  // los eucaliptos de la colina del medio
  [[96, 18, 120], [128, 14, 121], [176, 20, 122], [200, 13, 123]].forEach(([x, a, s]) => e_eucalipto(R, x, Math.round(e_tasCrestaM(x)) + 6, a, s, CO, TR));
  // el prado de delante: hierba con matas
  const VN = e_hx(['#2e5226', '#38602c', '#426c32', '#4e7838', '#5c8640', '#6a944a']);
  for (let y = 132; y < 180; y++) { const dz = (y - 132) / 48; for (let x = 0; x < 320; x++) { if (y < e_tasCrestaM(x) + 16) continue; const n = e_r2(x / (6 + dz * 10), y / (2 + dz * 4), 102);
    B[y * 320 + x] = e_tono(VN, e_lim(0.62 - dz * 0.3 + (n - 0.5) * 0.45 + (h(x, y, 103) - 0.5) * 0.22 + ((x + (y >> 1)) % 5 === 0 ? -0.12 : 0)), x, y); } }
  const copHierba = B.slice();
  // el camino de la granja: dos rodadas de tierra con hierba en medio, de abajo a la izquierda hasta la caseta
  for (let x = 0; x < 268; x++) { const u = x / 268, yc = 176 - u * 26 + Math.sin(u * 3.2) * 4, w = 7 - u * 4;
    for (const d of [-1, 1]) for (let j = -1; j <= 1; j++) { const y = Math.round(yc + d * w * 0.5 + j * (1 - u * 0.5)); if (y < 0 || y > 179) continue; const g = h(x, y, 109); B[y * 320 + x] = j === -1 ? hex('#5a4a34') : g < 0.4 ? hex('#7a6448') : g < 0.8 ? hex('#8a7254') : hex('#9a8466'); } }
  // matas de hierba alta (penachos con la punta clara), piedras y cardos
  for (let k = 0; k < 90; k++) { const dz = Math.pow(h(k, 1, 110), 1.2), y = Math.round(134 + dz * 44), x = Math.round(h(k, 2, 110) * 230), s = 1 + dz * 3, tipo = h(k, 3, 110);
    if (y < e_tasCrestaM(x) + 18) continue;
    if (tipo < 0.7) for (let j = -s; j <= s; j++) R.linea(x + j, y, Math.round(x + j * 1.4), Math.round(y - s * 1.6 - (Math.abs(j) < 1 ? 1 : 0)), (Math.round(j) & 1) ? hex('#8aa65a') : hex('#3a5e2a'));
    else if (tipo < 0.88) { R.disco(x, y - s * 0.4, s * 0.7, hex('#7a7a70')); R.pset(x - 1, Math.round(y - s * 0.8), hex('#b0b0a4')); }
    else { R.linea(x, y, x, Math.round(y - s * 2), hex('#4a6a3a')); R.disco(x, Math.round(y - s * 2), 1, hex('#8a5aa0')); } }
  // la torre de hormigón de la antena: encofrado, puerta, barandilla arriba; el yugo
  const HO = e_hx(['#6e6e6a', '#8a8a84', '#a2a29a', '#b8b8ae', '#ccccc2']);
  for (let y = 100; y <= 150; y++) { const u = (y - 100) / 50, x0 = Math.round(238 - u * 4), x1 = Math.round(260 + u * 4);
    for (let x = x0; x <= x1; x++) { const f = (x - x0) / (x1 - x0); B[y * 320 + x] = x === x0 || x === x1 ? HO[0] : (y % 7 === 0) ? HO[1] : e_tono(HO, e_lim(0.75 - f * 0.55 + (h(x, y, 104) - 0.5) * 0.18), x, y); } }
  R.rect(244, 138, 250, 150, hex('#4a4e56')); R.rect(245, 139, 249, 149, hex('#5e646e')); R.pset(248, 144, hex('#c8c8b8'));
  R.linea(236, 104, 262, 104, hex('#e0e0d8')); for (let x = 236; x <= 262; x += 3) R.linea(x, 100, x, 104, hex('#9a9a94')); R.linea(236, 100, 262, 100, hex('#c8c8c0'));
  R.rect(238, 94, 260, 99, HO[2]); R.rect(238, 94, 260, 94, HO[4]); R.rect(250, 95, 260, 99, HO[1]);
  // la caseta de chapa al pie, con su ventana encendida, el depósito y la camioneta
  for (let y = 134; y <= 150; y++) for (let x = 268; x <= 304; x++) B[y * 320 + x] = y < 137 ? (x % 2 ? hex('#7a7e84') : hex('#9a9ea4')) : (x % 3 === 0 ? hex('#a8aca4') : x > 292 ? hex('#8e9288') : hex('#bcc0b6'));
  R.rect(267, 133, 305, 134, hex('#5a5e64')); R.rect(274, 140, 281, 145, hex('#3a3e46')); R.rect(275, 141, 280, 144, hex('#f0d890')); R.pset(277, 141, hex('#fff4c8'));
  R.rect(288, 139, 293, 150, hex('#5a5048')); R.pset(292, 145, hex('#c8c0a0'));
  for (let y = 126; y <= 150; y++) for (let x = 308; x <= 318; x++) { const f = (x - 308) / 10; B[y * 320 + x] = y === 126 ? hex('#d8dcd8') : (y % 3 === 0) ? hex('#7a8078') : f < 0.4 ? hex('#b4bab2') : hex('#949a92'); }
  R.rect(206, 141, 222, 146, hex('#e8e8e0')); R.rect(210, 137, 216, 140, hex('#d0d0c8')); R.rect(211, 138, 215, 139, hex('#6a8296')); R.rect(206, 146, 222, 146, hex('#6a6a64'));
  R.pset(208, 147, hex('#1e1e22')); R.pset(209, 147, hex('#1e1e22')); R.pset(219, 147, hex('#1e1e22')); R.pset(220, 147, hex('#1e1e22')); R.pset(222, 143, hex('#ffe8a0'));
  // el eucalipto grande de la izquierda, en primer término (su copa se mece por encima, en la parte que cambia)
  const Mh = new Uint8Array(57600), Mm = new Uint8Array(57600);
  for (let i = 0; i < 57600; i++) { Mh[i] = B[i] === copHierba[i] && i >= 128 * 320 ? 1 : 0; Mm[i] = B[i] === copMar[i] && i >= HOR * 320 && i < 112 * 320 ? 1 : 0; }
  return { M: e_mascara(B, cop, HOR + 4), Mh, Mm };
}

// Tasmania en cada fotograma: nubes, chubasco, mar con brillos y pesquero, gaviotas, ovejas, viento en la hierba, la
// antena que gira y el eucalipto grande que se mece
function e_tasmania(R, t, o, giro, g) {
  const capa = e_capa(R, 'tel|tas', () => e_tasFijo(R)), M = capa.M, B = R.buf;
  // las tres capas de estratocúmulos (alta y clara, media, baja y oscura que corre más)
  const N1 = e_hx(['#8696a8', '#a2b0bc', '#bcc6ce', '#d8dee2']), N2 = e_hx(['#6a7a8c', '#8492a2', '#9eaab6', '#bcc4cc']), N3 = e_hx(['#56606e', '#6a7684', '#808c98', '#9aa4ae']);
  for (let k = 0; k < 5; k++) e_cumulo(R, M, ((k * 82 + t * 0.7) % 420) - 50, 34 + (k & 1) * 5, 52 + h(k, 1, 139) * 40, 140 + k, N1, -1, 0.05, 0.45);
  for (let k = 0; k < 5; k++) e_cumulo(R, M, ((k * 90 + 40 + t * 1.6) % 450) - 60, 56 + (k % 3) * 3, 40 + h(k, 2, 139) * 36, 150 + k, N2, -1, 0.05, 0.5);
  for (let k = 0; k < 4; k++) e_cumulo(R, M, ((k * 110 + 10 + t * 3.2) % 440) - 60, 76 + (k & 1) * 4, 34 + h(k, 3, 139) * 30, 160 + k, N3, -1, 0.05, 0.5);
  // el chubasco lejano sobre el mar: cortinas que cuelgan de la nube y derivan
  for (let y = 70; y < 98; y++) for (let x = 150; x < 196; x++) { const i = y * 320 + x; if (!M[i]) continue; const xs = x + (y - 70) * 0.25 - t * 1.2, d = Math.sin(xs * 0.35) * 0.5 + 0.5;
    if (h(Math.round(xs), Math.floor((y - t * 30) / 3), 105) < d * 0.5 * Math.sin((x - 150) / 46 * Math.PI)) B[i] = e_mez(B[i], hex('#6a7886'), 0.5); }
  // los brillos del mar que se mueven y el pesquero que cruza despacio
  const Mm = capa.Mm;
  for (let k = 0; k < 40; k++) { const y = 93 + Math.floor(h(k, 1, 106) * 18), x = Math.round((h(k, 2, 106) * 320 + t * (4 + k % 3)) % 320), on = Math.sin(t * 3 + k * 1.7) > 0.4; if (!on) continue; e_psM(R, Mm, x, y, hex('#b8ccd4')); e_psM(R, Mm, x + 1, y, hex('#9ab4c0')); }
  { const bx = Math.round(60 + ((t * 2.2) % 160)), by = 101; for (let i = 0; i < 9; i++) { e_psM(R, Mm, bx + i, by, hex('#2a3038')); if (i > 0 && i < 8) e_psM(R, Mm, bx + i, by - 1, hex('#e8e4dc')); } e_psM(R, Mm, bx + 2, by - 2, hex('#c84a3a')); e_psM(R, Mm, bx + 3, by - 2, hex('#c84a3a')); e_psM(R, Mm, bx + 5, by - 4, hex('#3a3a40')); e_psM(R, Mm, bx + 5, by - 3, hex('#3a3a40'));
    for (let i = 1; i < 7; i++) e_psM(R, Mm, bx - i, by + (i & 1), hex('#8aa4b0')); }
  // las gaviotas
  for (let k = 0; k < 3; k++) { const x = ((k * 90 + t * (9 + k * 3)) % 360) - 20, y = 60 + k * 9 + Math.sin(t * 0.8 + k) * 4; e_ave(R, M, x, y, t * 6 + k * 2, hex('#f0f2f2'), hex('#3a3e44')); }
  // las ovejas en la colina del medio: pastan (la cabeza sube y baja) y caminan un poco
  for (let k = 0; k < 9; k++) { const x0 = 30 + k * 19 + h(k, 1, 107) * 8, x = Math.round(x0 + Math.sin(t * 0.15 + k) * 4), y = Math.round(e_tasCrestaM(x) + 14 + h(k, 2, 107) * 10), dir = Math.cos(t * 0.15 + k) > 0 ? 1 : -1, come = Math.sin(t * 0.9 + k * 2) > 0;
    R.rect(x - 2, y - 3, x + 2, y - 1, hex('#e8e4d6')); R.rect(x - 2, y - 1, x + 2, y - 1, hex('#bcb6a4')); R.pset(x - 2 * dir, y - 3, hex('#f8f6ee'));
    R.pset(x + 3 * dir, come ? y - 1 : y - 3, hex('#2a2624')); R.pset(x + 3 * dir, come ? y : y - 2, hex('#3a3430')); R.pset(x - 1, y, hex('#2a2624')); R.pset(x + 1, y, hex('#2a2624')); }
  // la hierba en ondas de viento (solo sobre el prado)
  const Mh = capa.Mh;
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!Mh[i]) continue; const w = Math.sin(x * 0.045 - t * 1.6 + y * 0.12) + Math.sin(x * 0.11 + t * 0.7) * 0.4;
    if (w > 1.05 && e_um(x, y) < (w - 1.05) * 2.2) B[i] = e_mez(B[i], hex('#8aac5a'), 0.5); }
  // el yugo y la antena (gira despacio)
  const a = -2.32 + giro * 0.42, k = 0.5 + giro * 0.16, [cx, cy] = g.antena;
  R.linea(240, 95, cx - 6, cy + 4, e_TAS_P[0]); R.linea(241, 95, cx - 5, cy + 4, e_TAS_P[1]); R.linea(258, 95, cx + 7, cy + 2, e_TAS_P[0]); R.linea(257, 95, cx + 6, cy + 2, e_TAS_P[2]);
  e_plato(R, cx, cy, 38, a, k, e_TAS_P, -1);
  // el eucalipto grande de la izquierda, que se mece
  const CO = e_hx(['#34402e', '#4a5640', '#5e6a50', '#7a8466', '#949c7e']), TR = e_hx(['#4a443c', '#6a6254', '#a8a090', '#c4bcaa']);
  const vi = Math.round(Math.sin(t * 0.9) * 1.2);
  e_eucalipto(R, 30, 152, 104, 130, CO, TR, vi);
  for (let y = 150; y <= 154; y++) for (let x = 20; x <= 44; x++) { const i = y * 320 + x; B[i] = e_mez(B[i], hex('#1e3418'), 0.35); }
}

// delante de Tasmania: la cerca de la esquina de abajo a la derecha (postes de madera con vetas y tres alambres que se
// combean) y matas de hierba que se mecen, fuera de libre
function e_tasmaniaDelante(R, t, o) {
  const postes = [212, 246, 282, 318];
  for (let k = 0; k < postes.length; k++) { const x = postes[k], y0 = 156 + k * 3, y1 = 180;
    for (let y = y0; y < y1; y++) for (let i = 0; i < 3; i++) R.pset(x + i, y, i === 0 ? hex('#8a7254') : i === 2 ? hex('#4a3a28') : (h(x, y, 108) < 0.3 ? hex('#5a4630') : hex('#6e583e'))); R.rect(x, y0, x + 2, y0, hex('#a08a6a'));
    if (k + 1 < postes.length) for (const dy of [3, 9, 15]) for (let xx = x + 3; xx < postes[k + 1]; xx++) { const u = (xx - x) / (postes[k + 1] - x); R.pset(xx, Math.round(y0 + dy + (k * 3 + 3) * u * 0 + 3 * u + Math.sin(u * Math.PI) * 1.5), hex('#3a3c40')); } }
  for (let k = 0; k < 10; k++) { const x = 206 + k * 11, y = 179, vi = Math.sin(t * 2 + k) * 1.2; for (let j = -2; j <= 2; j++) R.linea(x + j, y, x + j * 1.5 + vi, y - 6 - (j & 1) * 2, (j & 1) ? hex('#6a944a') : hex('#4e7838')); }
}

const e_ATA = { hor: 100, cima: [196, 30] };

const e_ATA_P = e_hx(['#4a5462', '#9aa6b4', '#c2ccd6', '#e2e8ee', '#ffffff']);

// los cinco grupos de antenas pequeñas: [x, base, r] (de la más lejana a la más cercana)
const e_ATA_GR = (() => { const L = []; [[190, 108, 4, 5], [138, 112, 5, 4], [224, 116, 5.6, 5], [96, 120, 6.6, 3], [166, 126, 7.6, 4]].forEach(([x0, b0, r, n], gi) => {
  for (let i = 0; i < n; i++) { const x = x0 + (i - (n - 1) / 2) * r * 2.9 + (i & 1) * r * 0.6, b = b0 + ((i * 7 + gi) % 3) - 1; L.push([Math.round(x), b, r]); } }); return L.sort((a, b) => a[1] - b[1]); })();

// el perfil del volcán (y de la cresta en cada x)
const e_ataCresta = (x) => { const d = Math.abs(x - 196); return 30 + (d < 7 ? d * 0.15 : 1 + (d - 7) * (x < 196 ? 0.36 : 0.44)) + 3 * e_r1(x / 11, 120) - 1.5; };

// un pino: tronco y pisos de ramas en zigzag, más anchos abajo, con luz desde la izquierda; PI cinco tonos; mece: cuánto
// se mece la punta con t
function e_pino(R, x, base, alto, PI, t = 0, mece = 0) {
  const w0 = alto * 0.3;
  R.linea(x, base, x, base - alto * 0.25, hex('#3a2a1e'));
  for (let y = base - alto; y <= base - Math.round(alto * 0.12); y++) { const u = (y - base + alto) / alto, piso = ((y - base + alto) % 5) / 5, w = w0 * u * (0.65 + piso * 0.45), dx = mece * (1 - u) * Math.sin(t * 1.3 + x);
    for (let i = Math.round(-w); i <= Math.round(w); i++) { const X = Math.round(x + i + dx); R.pset(X, y, e_tono(PI, e_lim(0.5 - i / Math.max(1, w) * 0.35 - piso * 0.25 + (h(X, y, 121) - 0.5) * 0.35), X, y)); } }
}

// la capa fija de California (cielo, volcán, bosques, pradera, flores, arroyo, camino y edificio); devuelve las máscaras
// del cielo (M) y de la pradera (Mp)
function e_ataFijo(R) {
  const B = R.buf, HOR = e_ATA.hor;
  e_degradado(R, e_hx(['#2654a2', '#2e60ac', '#386cb6', '#4478c0', '#5286c8', '#6294d0', '#74a2d6', '#88b2dc', '#9cc0e2', '#b0cce6']), HOR, 1.05, 110);
  const cop = B.slice();
  // el volcán: roca con canales de nieve, la ladera izquierda al sol, la derecha en sombra azul
  const RO = e_hx(['#4a4e66', '#5a5e76', '#6a6c84', '#7c7c92', '#8e8ca0']), NI = e_hx(['#8a9ab8', '#a8b6cc', '#c8d2e0', '#e4eaf2', '#fafcff']);
  for (let x = 0; x < 320; x++) { const top = Math.round(e_ataCresta(x)), lado = x < 196 ? 1 : -1;
    for (let y = top; y < HOR; y++) { const dy = y - top, canal = e_r2(x / 3 + dy * 0.08 * -lado, dy / 9, 122), nieve = dy < 18 + (canal > 0.55 ? 14 : 0) + e_r1(x / 7, 123) * 6 && y < 70;
      const l = (lado > 0 ? 0.6 : 0.3) + (canal - 0.5) * 0.45 + (e_r1(x / 6, 119) - 0.5) * 0.25 + (dy === 0 ? 0.25 : 0) - dy * 0.004 + (h(x, y, 124) - 0.5) * 0.12;
      B[y * 320 + x] = nieve ? e_tono(NI, e_lim(l + 0.12), x, y) : e_tono(RO, e_lim(l - (y > 72 ? (y - 72) * 0.02 : 0)), x, y); } }
  // el cinturón de bosque azulado al pie del volcán
  const BA = e_hx(['#2e4a52', '#38565c', '#446268', '#507074']);
  for (let x = 0; x < 320; x++) { const top = Math.round(80 + 3 * e_r1(x / 30, 125) - ((x * 7) % 5 < 2 ? 2 : 0) - (h(x >> 1, 1, 126) < 0.3 ? 1 : 0));
    for (let y = top; y < HOR + 4; y++) B[y * 320 + x] = e_tono(BA, e_lim(0.4 + (h(x, y, 127) - 0.5) * 0.4 + (y - top) * 0.02 + (y === top ? 0.2 : 0)), x, y); }
  // el muro de pinos oscuros: copas en punta de varios tamaños
  const PI = e_hx(['#142a1c', '#1c3622', '#26442a', '#305232', '#3c603a']);
  for (let k = 0; k < 70; k++) { const x = Math.round(k * 4.7 + h(k, 1, 128) * 4 - 6), alto = 12 + Math.round(h(k, 2, 128) * 9); e_pino(R, x, 104 + (k % 3), alto, PI); }
  // la pradera: dorada verdosa, con manchas, grano de hierba y flores
  const PR = e_hx(['#5a6a2a', '#687830', '#788636', '#8a9440', '#9ea24c', '#b2b05a', '#c2bc6a']);
  for (let y = 100; y < 180; y++) { const dz = (y - 100) / 80; for (let x = 0; x < 320; x++) { if (y < 104 + (h(x >> 2, 0, 129) < 0.5 ? 0 : 1) + ((x * 7) % 5 < 2 ? -1 : 1) && B[y * 320 + x] !== cop[y * 320 + x] && y < 106) continue;
    if (y < 103) continue; const n = e_r2(x / (10 + dz * 20), y / (3 + dz * 6), 130), br = (x + Math.floor(h(x, 3, 131) * 3)) % 3 === 0 && h(x, y, 132) < 0.5;
    B[y * 320 + x] = e_tono(PR, e_lim(0.72 - dz * 0.35 + (n - 0.5) * 0.45 + (br ? -0.15 : 0) + (h(x, y, 133) - 0.5) * 0.16), x, y); } }
  for (let k = 0; k < 260; k++) { const dz = Math.pow(h(k, 1, 134), 1.3), y = Math.round(106 + dz * 72), x = Math.round(h(k, 2, 134) * 320), c = h(k, 3, 134) < 0.6 ? (h(k, 4, 134) < 0.5 ? hex('#7a5ab0') : hex('#9a7ad0')) : hex('#e8d450');
    R.pset(x, y, c); if (dz > 0.5) { R.pset(x, y - 1, c); R.pset(x, y + 1, hex('#4a5a24')); } }
  // el arroyo que cruza la pradera, con sus orillas oscuras y juncos
  const ARR = (x) => 134 + Math.sin(x * 0.03) * 4 + Math.sin(x * 0.11) * 1.5 - x * 0.02;
  for (let x = 0; x < 320; x++) { const yc = ARR(x), w = 1.6 + Math.sin(x * 0.07) * 0.5; for (let y = Math.round(yc - w - 1); y <= Math.round(yc + w + 1); y++) { const f = (y - yc) / w;
    B[y * 320 + x] = Math.abs(f) > 1 ? (f < 0 ? hex('#4a5424') : hex('#5e6a2c')) : f < -0.3 ? hex('#7aa8d0') : h(x, y, 138) < 0.3 ? hex('#4a7aa8') : hex('#5a8ab8'); }
    if (h(x, 1, 139) < 0.12) { R.linea(x, Math.round(yc - w - 1), x + 1, Math.round(yc - w - 5), hex('#4a6a2a')); R.pset(x + 1, Math.round(yc - w - 5), hex('#6a4a2a')); } }
  e_ATA.arroyo = ARR;
  // el camino de tierra con rodadas
  const CAM = [[30, 182], [70, 160], [112, 140], [150, 126], [180, 118], [210, 112], [246, 110]];
  for (let s = 0; s < CAM.length - 1; s++) { const [x0, y0] = CAM[s], [x1, y1] = CAM[s + 1]; for (let u = 0; u <= 1; u += 0.02) { const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u, w = 1 + (y - 104) * 0.11;
    for (let i = -w; i <= w; i++) { const X = Math.round(x + i), Y = Math.round(y); if (X < 0 || X > 319 || Y > 179) continue; const f = i / w; B[Y * 320 + X] = Math.abs(f) > 0.85 ? hex('#8a7a48') : Math.abs(Math.abs(f) - 0.45) < 0.12 ? hex('#9a7e56') : h(X, Y, 135) < 0.5 ? hex('#c0a272') : hex('#b49668'); } } }
  // el edificio blanco con el remolque y el depósito
  R.rect(246, 104, 282, 116, hex('#e4e6e2')); R.rect(246, 104, 282, 105, hex('#9aa0a6')); R.rect(270, 106, 282, 116, hex('#c4c8c6')); for (let x = 249; x < 268; x += 5) { R.rect(x, 108, x + 2, 110, hex('#3e5670')); R.pset(x, 108, hex('#a8c4d8')); }
  R.rect(274, 110, 277, 116, hex('#6a6e74')); R.rect(284, 108, 296, 116, hex('#cfc8b4')); R.rect(284, 108, 296, 108, hex('#f0ead8')); R.rect(287, 111, 290, 113, hex('#3e5670')); R.pset(286, 117, hex('#2a2a2a')); R.pset(294, 117, hex('#2a2a2a'));
  R.rect(233, 100, 240, 115, hex('#b8bcbc')); R.rect(233, 100, 240, 101, hex('#e0e4e4')); R.rect(238, 102, 240, 115, hex('#8e9494'));
  return { M: e_mascara(B, cop, HOR), Mp: (() => { const Mp = new Uint8Array(57600); for (let i = 106 * 320; i < 57600; i++) { const c = B[i]; Mp[i] = PR.includes(c) ? 1 : 0; } return Mp; })() };
}

// California en cada fotograma: nubes, ratonero, viento en la hierba, arroyo, ciervos, camioneta, antenas y pinos
function e_ata(R, t, o, giro, g) {
  const capa = e_capa(R, 'tel|ata', () => e_ataFijo(R)), M = capa.M, B = R.buf;
  // la nube lenticular en la cima, que respira, y cúmulos que pasan
  const NU = e_hx(['#9aaccc', '#c4d2e4', '#e8eef6', '#ffffff']);
  { const [cx, cy] = e_ATA.cima, w = 44 + Math.sin(t * 0.3) * 4; for (let j = -4; j <= 3; j++) for (let x = Math.round(cx - w / 2); x <= cx + w / 2; x++) { const u = (x - cx) / (w / 2), alto = 4.2 * Math.sqrt(Math.max(0, 1 - u * u)); if (j < -alto || j > alto * 0.6) continue;
    const y = cy - 9 + j, i = y * 320 + x; if (!M[i]) continue; const l = 0.65 - j / 6 * 0.6 + u * 0.15 * -1 + Math.sin(x * 0.4 + t) * 0.06; B[i] = e_tono(NU, e_lim(l), x, y); } }
  [[30, 48, 1.2, 30], [150, 60, 2, 24], [250, 58, 0.8, 30], [80, 72, 2.8, 18], [-60, 56, 1.6, 26], [120, 44, 0.9, 22], [40, 66, 2.3, 16]].forEach(([x0, y, v, w], k) => e_cumulo(R, M, ((x0 + 60 + t * v) % 380) - 30, y, w, 170 + k, NU, -1));
  // el ratonero que planea
  { const an = t * 0.3, x = 110 + Math.cos(an) * 40, y = 44 + Math.sin(an) * 8; e_ave(R, M, x, y, 0.5, hex('#4a3426'), hex('#2a1e18'), true); }
  // la hierba en ondas de viento
  const Mp = capa.Mp;
  for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (!Mp[i]) continue; const w = Math.sin(x * 0.05 + t * 1.4 - y * 0.1) + Math.sin(x * 0.13 - t * 0.6) * 0.35;
    if (w > 1.0 && e_um(x, y) < (w - 1.0) * 2) B[i] = e_mez(B[i], hex('#d8d080'), 0.45); }
  // los brillos del agua del arroyo, que corren
  for (let k = 0; k < 26; k++) { const x = Math.round((h(k, 1, 141) * 320 + t * 9) % 320), y = Math.round(e_ATA.arroyo(x) + (h(k, 2, 141) - 0.5) * 2); if (Math.sin(t * 4 + k) > 0) { R.pset(x, y, hex('#e8f4ff')); R.pset(x + 1, y, hex('#a8d0f0')); } }
  // los dos ciervos al borde del bosque: pastan y levantan la cabeza
  for (let k = 0; k < 2; k++) { const x = 52 + k * 9 + Math.round(Math.sin(t * 0.1 + k) * 2), y = 109, arriba = Math.sin(t * 0.7 + k * 2.5) > 0.3, c = hex('#8a5a34');
    R.rect(x, y - 3, x + 3, y - 2, c); R.pset(x, y - 3, hex('#a87448')); R.pset(x, y - 1, hex('#4a3020')); R.pset(x + 3, y - 1, hex('#4a3020')); R.pset(x - 1, y - 3, hex('#e8dcc8'));
    if (arriba) { R.pset(x + 4, y - 4, c); R.pset(x + 4, y - 5, c); R.pset(x + 5, y - 5, hex('#6a4428')); R.pset(x + 4, y - 6, hex('#4a3020')); } else { R.pset(x + 4, y - 2, c); R.pset(x + 5, y - 1, hex('#6a4428')); } }
  // la camioneta que sube por el camino con su polvo
  { const CAM = g.camino, per = 16, u = (t % per) / per, f = u * (CAM.length - 1), s = Math.min(CAM.length - 2, Math.floor(f)), v = f - s, x = CAM[s][0] + (CAM[s + 1][0] - CAM[s][0]) * v, y = CAM[s][1] + (CAM[s + 1][1] - CAM[s][1]) * v, sc = 0.5 + (y - 104) / 70;
    if (y < 178) { for (let k = 0; k < 10; k++) { const px = x - k * 2.2 * sc - 2, py = y + k * 1.4 * sc - 1 - h(k, 1, 136) * 2, rr = (1 + k * 0.4) * sc; for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= rr * rr && h(Math.round(px + i), Math.round(py + j), 137) < 0.55 - k * 0.05) { const X = Math.round(px + i), Y = Math.round(py + j); if (X >= 0 && X < 320 && Y < 180 && Y >= 0) B[Y * 320 + X] = e_mez(B[Y * 320 + X], hex('#d8c49c'), 0.5); } }
      const w = Math.round(7 * sc) + 2, hh = Math.round(3 * sc) + 2, X = Math.round(x - w / 2), Y = Math.round(y); R.rect(X, Y - hh, X + w, Y - 1, hex('#a83a2e')); R.rect(X + Math.round(w * 0.5), Y - hh - Math.round(2 * sc) - 1, X + w, Y - hh, hex('#8a2e24')); R.pset(X + w - 1, Y - hh - 1, hex('#9ac0dc'));
      R.rect(X, Y - 1, X + w, Y - 1, hex('#5a2018')); R.pset(X + 1, Y, hex('#1e1e22')); R.pset(X + w - 1, Y, hex('#1e1e22')); } }
  // las antenas pequeñas, todas a una (giro), de la más lejana a la más cercana
  const a = -2.3 + giro * 0.8, k = 0.5 + giro * 0.2, platos = [];
  for (const [x, base, r] of e_ATA_GR) {
    const yh = base - r * 1.15; R.rect(Math.round(x - r * 0.18), Math.round(yh), Math.round(x + r * 0.18), base, e_ATA_P[2]); R.pset(Math.round(x + r * 0.18), Math.round(yh + 1), e_ATA_P[1]); R.linea(Math.round(x - r * 0.4), base, Math.round(x + r * 0.4), base, e_ATA_P[0]);
    for (let i = -Math.round(r * 0.6); i <= Math.round(r * 0.6); i++) { const X = x + i - 1, Y = base + 1; if (X >= 0 && X < 320 && Y < 180) B[Y * 320 + X] = e_mez(B[Y * 320 + X], hex('#2a3418'), 0.4); }
    e_plato(R, x, yh - r * 0.35, r, a, k, e_ATA_P, -1, { foco: 'brazo' }); platos.push([x, Math.round(yh - r * 0.35), r]);
  }
  g.platos = platos;
  // los dos pinos grandes de los lados, que se mecen (el de la derecha, bajo la zona de Atom)
  const PI = e_hx(['#0e2014', '#16301c', '#203e24', '#2a4c2c', '#365a34']);
  e_pino(R, 8, 182, 150, PI, t, 2); e_pino(R, 312, 182, 128, PI, t + 1, 2);
}

const e_EST = { pant: [152, 50, 290, 116], est: [214, 80] };

// la capa fija del despacho (pared, zócalo, parqué, alfombra, ventana, radiador, cuadro, balda y marco del monitor)
function e_estFijo(R) {
  const B = R.buf;
  // la pared enlucida con la luz azul del monitor y la cálida del flexo (la esquina de Atom, pared tranquila)
  const PA = e_hx(['#262e3e', '#2e3748', '#364052', '#3e4a5e', '#485670', '#56647c']), PC = e_hx(['#5a4a44', '#6e5a4e', '#84705e']);
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const az = Math.max(0, 1 - Math.hypot((x - 221) / 110, (y - 84) / 70)), ca = Math.max(0, 1 - Math.hypot((x - 304) / 70, (y - 120) / 50));
    const l = 0.28 + az * 0.5 + (e_r2(x / 5, y / 5, 140) - 0.5) * 0.12 + (h(x, y, 141) - 0.5) * 0.08 - (y < 10 ? (10 - y) * 0.02 : 0);
    let c = e_tono(PA, e_lim(l), x, y); if (ca > 0.05) c = e_mez(c, e_tono(PC, e_lim(ca * 1.2), x, y), Math.min(0.75, ca * 1.1)); B[y * 320 + x] = c; }
  // el zócalo y el parqué con vetas en perspectiva
  for (let x = 0; x < 320; x++) { R.pset(x, 118, hex('#6a5444')); R.pset(x, 119, hex('#4a3a30')); R.pset(x, 120, hex('#3a2c24')); }
  const MD = e_hx(['#3a281c', '#4a3424', '#5a402c', '#6a4c34', '#7a583c']);
  for (let y = 121; y < 180; y++) { const dz = (y - 121) / 59, fila = Math.floor(Math.pow(dz, 0.7) * 12), pos = Math.pow(dz, 0.7) * 12 - fila, lar = 24 + fila * 6;
    for (let x = 0; x < 320; x++) { const xs = (x - 160) / (0.6 + dz * 0.6) + 160 + fila * 37, tabla = Math.floor(xs / lar), junta = xs - tabla * lar < 1.2 || pos < 0.06;
      const veta = Math.sin(xs * 0.4 + h(tabla, fila, 142) * 9 + Math.sin(xs * 0.07) * 2) * 0.08;
      B[y * 320 + x] = junta ? MD[0] : e_tono(MD, e_lim(0.35 + h(tabla, fila, 143) * 0.3 + veta + dz * 0.12 + (h(x, y, 144) - 0.5) * 0.1), x, y); } }
  // la alfombra redonda bajo los pies del personaje, con su cenefa
  for (let y = 146; y <= 170; y++) for (let x = 24; x <= 118; x++) { const d = Math.hypot((x - 71) / 47, (y - 158) / 12); if (d > 1) continue; const anillo = d > 0.82 ? 0 : d > 0.72 ? 1 : (Math.floor(d * 6) & 1) ? 2 : 3;
    B[y * 320 + x] = [hex('#5a2a2e'), hex('#c8a060'), hex('#8a3a3a'), hex('#7a3234')][anillo] ; if (anillo >= 2 && h(x, y, 145) < 0.12) B[y * 320 + x] = hex('#a85048'); }
  // la ventana con su marco, el alféizar y el radiador debajo
  const [w0, w1, w2, w3] = [44, 22, 104, 90];
  R.rect(w0 - 3, w1 - 3, w2 + 3, w3 + 3, hex('#b8b0a4')); R.rect(w0 - 3, w1 - 3, w2 + 3, w1 - 3, hex('#d8d0c4')); R.rect(w0 - 2, w1 - 2, w2 + 2, w3 + 2, hex('#8a8478'));
  R.rect(w0 - 6, w3 + 3, w2 + 6, w3 + 5, hex('#c8c0b4')); R.rect(w0 - 6, w3 + 5, w2 + 6, w3 + 5, hex('#7a7468'));
  for (let x = 48; x <= 100; x++) for (let y = 98; y <= 114; y++) { const aleta = (x - 48) % 4; B[y * 320 + x] = y === 98 || y === 114 ? hex('#8a8e92') : aleta === 0 ? hex('#6a6e74') : aleta === 1 ? hex('#c4c8cc') : hex('#a2a6ac'); }
  R.rect(100, 112, 102, 113, hex('#8a8e92'));
  // el cuadro de la galaxia (un pictograma en espiral, sin letras)
  R.rect(118, 28, 142, 52, hex('#6a5038')); R.rect(119, 29, 141, 51, hex('#8a6a48')); R.rect(121, 31, 139, 49, hex('#0e1028'));
  for (let k = 0; k < 120; k++) { const an = k * 0.21, rr = 1 + k * 0.065, s = k & 1 ? Math.PI : 0; R.pset(Math.round(130 + Math.cos(an + s) * rr), Math.round(40 + Math.sin(an + s) * rr * 0.7), k < 20 ? hex('#fff0c8') : k % 3 ? hex('#8ab0e8') : hex('#d8c8f0')); }
  R.disco(130, 40, 1.6, hex('#fff8e0'));
  // la balda con libros sin letras y un globo
  R.rect(112, 74, 146, 75, hex('#7a5a3c')); R.rect(112, 76, 146, 76, hex('#3a2a20'));
  let bx = 114; for (let k = 0; k < 7; k++) { const w = 2 + (k % 3 === 0 ? 1 : 0), hh = 9 + (k * 5) % 5, c = [hex('#8a3a34'), hex('#3a5a7a'), hex('#c8a44a'), hex('#4a6a3a'), hex('#6a4a7a'), hex('#a86a3a'), hex('#3a4a5a')][k]; R.rect(bx, 74 - hh, bx + w, 73, c); R.linea(bx, 74 - hh, bx, 73, e_mez(c, hex('#ffffff'), 0.25)); R.pset(bx + 1, 74 - hh + 2, e_mez(c, hex('#000000'), 0.3)); bx += w + 1; }
  R.disco(139, 67, 4.4, hex('#3a6aa0')); R.pset(137, 65, hex('#6aa060')); R.pset(138, 66, hex('#6aa060')); R.pset(140, 68, hex('#6aa060')); R.pset(141, 67, hex('#6aa060')); R.linea(139, 72, 139, 73, hex('#8a7048')); R.linea(136, 73, 142, 73, hex('#8a7048'));
  // el monitor grande: marco y el brillo azul en la pared alrededor
  const [p0, p1, p2, p3] = e_EST.pant;
  R.rect(p0 - 4, p1 - 4, p2 + 4, p3 + 6, hex('#16181e')); R.rect(p0 - 4, p1 - 4, p2 + 4, p1 - 4, hex('#3a3e48')); R.rect(p0 - 4, p3 + 3, p2 + 4, p3 + 6, hex('#22252c')); R.pset(Math.round((p0 + p2) / 2), p3 + 5, hex('#5aff8a'));
  return {};
}

// el despacho en cada fotograma: la noche por la ventana, cortinas, telescopio, gato y el mapa de estrellas
function e_estrella(R, t, o, g) {
  e_capa(R, 'tel|est', () => e_estFijo(R));
  const B = R.buf, [w0, w1, w2, w3] = [44, 22, 104, 90];
  // la noche por la ventana: degradado, estrellas que titilan, las colinas y las luces de un pueblo lejano
  R.recorte([w0, w1, w2, w3]);
  const NO = e_hx(['#0a1024', '#101a34', '#16223e', '#1e2c4a', '#283656']);
  for (let y = w1; y <= w3; y++) for (let x = w0; x <= w2; x++) B[y * 320 + x] = e_tono(NO, (y - w1) / (w3 - w1) * 0.9, x, y);
  for (let k = 0; k < 40; k++) { const x = w0 + Math.floor(h(k, 1, 150) * (w2 - w0)), y = w1 + Math.floor(h(k, 2, 150) * 50), on = Math.sin(t * (1.5 + h(k, 3, 150) * 3) + k) > -0.3; if (on) R.pset(x, y, h(k, 4, 150) < 0.2 ? hex('#fff4c8') : hex('#c8d4f0')); }
  for (let x = w0; x <= w2; x++) { const top = Math.round(80 - 5 * e_r1(x / 14, 151)); for (let y = top; y <= w3; y++) R.pset(x, y, y === top ? hex('#1a2030') : hex('#10141e')); }
  for (let k = 0; k < 18; k++) { const x = w0 + 3 + Math.floor(h(k, 1, 152) * (w2 - w0 - 6)), y = Math.round(82 + h(k, 2, 152) * 7); R.pset(x, y, Math.sin(t * 2 + k * 3) > -0.8 ? (k % 3 ? hex('#ffd890') : hex('#ffffff')) : hex('#a08850')); }
  R.recorte(null);
  // el travesaño de la ventana y su reflejo
  R.linea((w0 + w2) >> 1, w1, (w0 + w2) >> 1, w3, hex('#b8b0a4')); R.linea(w0, 56, w2, 56, hex('#b8b0a4')); R.linea(((w0 + w2) >> 1) + 1, w1, ((w0 + w2) >> 1) + 1, w3, hex('#8a8478'));
  for (let k = 0; k < 8; k++) R.pset(w0 + 4 + k, w1 + 4 + k, hex('#4a5a7a'));
  // las cortinas, con pliegues que se mecen un poco
  const CO = e_hx(['#5a2e3a', '#74404c', '#8e5260', '#a4687a']);
  for (const [xa, d] of [[w0 - 8, 1], [w2 + 8, -1]]) for (let y = w1 - 6; y <= w3 + 8; y++) { const sw = Math.sin(t * 0.8 + y * 0.05) * (y - w1) / 50 * 1.5; for (let i = 0; i < 12; i++) { const x = Math.round(xa + d * i + sw * (i / 12)), pl = Math.sin(i * 1.3 + y * 0.02) * 0.5 + 0.5; R.pset(x, y, e_tono(CO, e_lim(pl * 0.8 + (d > 0 ? 0.1 : 0)), x, y)); } }
  R.rect(w0 - 12, w1 - 8, w2 + 12, w1 - 7, hex('#8a6a48'));
  // el telescopio de aficionado en su trípode, apuntando a la ventana
  { const bx = 22, by = 104; R.linea(bx, by, bx - 10, 150, hex('#4a4e56')); R.linea(bx, by, bx + 9, 152, hex('#5a5e66')); R.linea(bx, by, bx + 1, 146, hex('#3a3e46')); R.linea(bx - 4, 124, bx + 4, 125, hex('#5a5e66'));
    R.rect(bx - 2, by - 3, bx + 2, by, hex('#2a2e36'));
    for (let k = -14; k <= 16; k++) { const x = bx + k * 0.86, y = by - 5 - k * 0.5; for (let j = -2; j <= 2; j++) R.pset(Math.round(x - j * 0.5), Math.round(y + j * 0.86), j === -2 ? hex('#ffffff') : j === 2 ? hex('#8a929e') : k > 14 ? hex('#2a2e36') : hex('#d8dce4')); }
    R.linea(bx - 11, by + 2, bx - 15, by + 4, hex('#2a2e36')); R.pset(bx + 15, by - 14, hex('#9ab8e0')); }
  // el gato que duerme en el alféizar y mueve la cola
  { const gx = 88, gy = 92, c = hex('#c8823a'), cS = hex('#8a5426'), cL = hex('#e8a85a'); for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) if (!(j === 0 && (i < 1 || i > 7))) R.pset(gx + i, gy - j, j === 3 ? cL : (i + j) % 3 === 0 ? cS : c);
    R.rect(gx + 7, gy - 5, gx + 10, gy - 2, c); R.pset(gx + 7, gy - 6, cS); R.pset(gx + 10, gy - 6, cS); R.pset(gx + 9, gy - 3, hex('#3a2416'));
    const cola = Math.sin(t * 2.2); R.linea(gx, gy, gx - 3, gy - 1 - Math.round(cola * 2), cS); R.pset(gx - 4, gy - 2 - Math.round(cola * 3), c); }
  // EL MAPA DE ESTRELLAS en el monitor
  e_mapaEstrellas(R, t, e_EST.pant, e_EST.est, o.rodea ?? 0, 1);
}

// el mapa de estrellas dentro del rectángulo P = [x0, y0, x1, y1], con la estrella en S; esc 1 (monitor) o pequeño
function e_mapaEstrellas(R, t, P, S, rodea, esc) {
  const B = R.buf, [x0, y0, x1, y1] = P, [sx, sy] = S, grande = esc >= 1;
  const FO = e_hx(['#060a1c', '#0a1026', '#0e1630', '#121c3a']);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const vl = Math.exp(-Math.pow(((x - x0) * 0.6 - (y - y0) + 10) / 14, 2)); B[y * 320 + x] = e_tono(FO, e_lim(0.25 + vl * 0.55 + (h(x >> 1, y >> 1, 153) - 0.5) * 0.2 * vl), x, y); }
  R.recorte([x0, y0, x1, y1]);
  // la rejilla de coordenadas, curva
  if (grande) { for (let k = 0; k < 6; k++) for (let x = x0; x <= x1; x += 2) R.pset(x, Math.round(y0 + 8 + k * 12 + Math.pow((x - x0 - (x1 - x0) / 2) / 60, 2) * 5), hex('#1c2e5a'));
    for (let k = 0; k < 7; k++) for (let y = y0; y <= y1; y += 2) R.pset(Math.round(x0 + 10 + k * 21 + (y - y0) * 0.18 * (k - 3) / 3), y, hex('#1c2e5a')); }
  // las estrellas (algunas titilan)
  const n = grande ? 210 : 40;
  for (let k = 0; k < n; k++) { const x = Math.round(x0 + h(k, 1, 154) * (x1 - x0)), y = Math.round(y0 + h(k, 2, 154) * (y1 - y0)), b = h(k, 3, 154), tw = Math.sin(t * (2 + h(k, 5, 154) * 3) + k) > 0.6;
    const c = b > 0.93 ? hex('#ffffff') : h(k, 4, 154) < 0.2 ? hex('#ffb89a') : h(k, 4, 154) < 0.4 ? hex('#a8c8ff') : b > 0.6 ? hex('#c8d0e8') : hex('#6a7aa0');
    R.pset(x, y, tw && b > 0.5 ? hex('#ffffff') : c); if (grande && b > 0.93) { R.pset(x + 1, y, hex('#8a9ac8')); R.pset(x - 1, y, hex('#8a9ac8')); R.pset(x, y + 1, hex('#8a9ac8')); R.pset(x, y - 1, hex('#8a9ac8')); } }
  // la franja marcada (los dos haces de la gran oreja) en ámbar discontinuo, que palpita
  const pal = 0.5 + 0.5 * Math.sin(t * 3), cA = pal > 0.5 ? hex('#ffb43a') : hex('#b0782a');
  if (grande) { for (const xx of [sx - 14, sx - 6, sx + 6, sx + 14]) R.linea(xx, y0 + 4, xx, y1 - 4, cA, 4); for (const yy of [y0 + 4, y1 - 4]) { R.linea(sx - 14, yy, sx - 6, yy, cA, 4); R.linea(sx + 6, yy, sx + 14, yy, cA, 4); } }
  else for (const xx of [sx - 4, sx + 4]) R.linea(xx, y0 + 1, xx, y1 - 1, cA, 2);
  // LA ESTRELLA AMARILLA parecida al Sol: halo, cuatro puntas y núcleo, que late
  const lat = 1 + Math.sin(t * 2.4) * 0.15;
  if (grande) { for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j) / (7 * lat); if (d < 1 && e_um(sx + i, sy + j) < (1 - d) * 0.8) B[(sy + j) * 320 + sx + i] = e_mez(B[(sy + j) * 320 + sx + i], hex('#ffd040'), 0.55); }
    for (let k = 3; k <= 6; k++) { const c = k > 5 ? hex('#a08020') : hex('#ffe070'); R.pset(sx + k, sy, c); R.pset(sx - k, sy, c); R.pset(sx, sy + k, c); R.pset(sx, sy - k, c); }
    R.disco(sx + 0.5, sy + 0.5, 2.8, hex('#ffd030')); R.disco(sx + 0.5, sy + 0.5, 1.8, hex('#fff2a0')); R.pset(sx, sy, hex('#ffffff')); }
  else { R.pset(sx, sy, hex('#fff2a0')); R.pset(sx + 1, sy, hex('#ffd030')); R.pset(sx - 1, sy, hex('#ffd030')); R.pset(sx, sy + 1, hex('#ffd030')); R.pset(sx, sy - 1, hex('#ffd030')); }
  // el círculo rojo que se cierra a su alrededor
  if (rodea > 0) { const rr = grande ? 11 : 4, n = Math.round(rodea * 80); for (let k = 0; k < n; k++) { const an = -Math.PI * 0.6 + k / 80 * Math.PI * 2.1, x = Math.round(sx + Math.cos(an) * rr), y = Math.round(sy + Math.sin(an) * rr * 0.92); R.pset(x, y, hex('#ff3a3a')); if (grande) R.pset(x, y + 1, hex('#a02020')); } }
  // el cursor que va hacia la estrella (y el recuadro con «1800» cuando se cierra el círculo)
  if (grande) {
    const u = e_lim(rodea * 1.3), cx = Math.round(x1 - 30 + (sx + 12 - x1 + 30) * u + Math.sin(t * 1.3) * (1 - u) * 6), cy = Math.round(y1 - 10 + (sy + 12 - y1 + 10) * u + Math.cos(t * 1.1) * (1 - u) * 4);
    for (let j = 0; j < 7; j++) for (let i = 0; i <= j && i < 5; i++) R.pset(cx + i, cy + j, i === 0 || i === j ? hex('#1a1a1a') : hex('#ffffff'));
    if (rodea >= 0.98) { const bx = sx + 22, by = sy - 26; R.rect(bx, by, bx + 30, by + 14, hex('#0a1430')); R.linea(bx, by, bx + 30, by, hex('#5aff8a')); R.linea(bx, by + 14, bx + 30, by + 14, hex('#5aff8a')); R.linea(bx, by, bx, by + 14, hex('#5aff8a')); R.linea(bx + 30, by, bx + 30, by + 14, hex('#5aff8a'));
      e_cifras(R, '1800', bx + 3, by + 3, hex('#5aff8a')); for (let k = 0; k < 4; k++) R.linea(bx + 20, by + 3 + k * 3, bx + 20 + Math.round(3 + h(k, 1, 155) * 6), by + 3 + k * 3, hex('#3aa060')); R.linea(bx, by + 14, sx + 8, sy - 8, hex('#3aa060'), 2); }
    // la barra lateral con miniaturas que cambian y una lectura que corre
    for (let k = 0; k < 4; k++) { const yy = y0 + 4 + k * 15; R.linea(x0 + 3, yy, x0 + 14, yy, hex('#26386a')); R.linea(x0 + 3, yy + 10, x0 + 14, yy + 10, hex('#26386a')); R.linea(x0 + 3, yy, x0 + 3, yy + 10, hex('#26386a')); R.linea(x0 + 14, yy, x0 + 14, yy + 10, hex('#26386a'));
      if (Math.floor(t * 0.8) % 4 === k) R.disco(x0 + 8.5, yy + 5.5, 2, hex('#ffd030')); else R.pset(x0 + 8, yy + 5, hex('#8a9ac8')); }
    const rd = Math.floor(t * 4) % 40; for (let i = 0; i < 40; i++) R.pset(x1 - 44 + i, y1 - 3, i < rd ? hex('#3aa060') : hex('#16284a'));
  }
  // el reflejo del cristal
  for (let k = 0; k < (grande ? 20 : 6); k++) R.pset(x0 + 2 + k, y0 + 2 + k, e_mez(R.pget(x0 + 2 + k, y0 + 2 + k), hex('#ffffff'), 0.12));
  R.recorte(null);
}

// LA MESA del despacho (por delante de los personajes), a la escala del chibi: el tablero a 13–15 px sobre el suelo
// de los personajes, con todo lo de encima
function e_mesaDelante(R, t, o, geo) {
  const B = R.buf, [mx0, my, mx1] = geo.mesa, MD = e_hx(['#3e2818', '#5a3c26', '#6e4a30', '#82593a', '#966a46', '#ac7e56']), PIE = 163;
  // el pie del monitor
  R.rect(215, 122, 225, my + 1, hex('#2a2c32')); R.rect(215, 122, 216, my + 1, hex('#4a4e56')); R.rect(224, 122, 225, my + 1, hex('#1a1c20'));
  // el tablero en perspectiva, con vetas y la luz del flexo y la del monitor
  for (let y = my; y <= my + 5; y++) { const xa = Math.round(mx0 - (y - my) * 0.8); for (let x = xa; x <= mx1; x++) { if (x < 0 || x > 319) continue; const veta = Math.sin(x * 0.11 + Math.sin(x * 0.02 + y * 0.6) * 3 + y * 0.9) * 0.1, luz = Math.max(0, 1 - Math.hypot((x - 300) / 60, (y - my) / 10)) * 0.3 + Math.max(0, 1 - Math.abs(x - 221) / 60) * 0.12;
    B[y * 320 + x] = y === my ? MD[5] : e_tono(MD, e_lim(0.5 + veta + luz + (h(x, y, 156) - 0.5) * 0.1), x, y); } }
  R.rect(205, my, 235, my + 2, hex('#2a2c32')); R.rect(205, my, 235, my, hex('#5a5e66'));
  // el canto, el faldón, la cajonera con tiradores y las patas
  const yc = my + 6; R.rect(mx0 - 5, yc, mx1, yc, MD[5]); R.rect(mx0 - 5, yc + 1, mx1, yc + 4, MD[1]); for (let x = mx0 - 4; x <= mx1; x += 3) R.pset(x, yc + 2 + ((x >> 2) & 1), MD[2]);
  for (let y = yc + 5; y <= PIE; y++) { for (let i = 0; i < 4; i++) R.pset(mx0 - 4 + i, y, i === 0 ? MD[3] : i === 3 ? MD[0] : MD[2]); }
  for (let y = yc + 5; y <= PIE; y++) for (let x = 264; x <= 316; x++) B[y * 320 + x] = x === 264 ? MD[3] : y === yc + 11 ? MD[0] : e_tono(MD, e_lim(0.42 + Math.sin(x * 0.2 + y * 0.05) * 0.06 + (h(x, y, 157) - 0.5) * 0.08), x, y);
  for (let k = 0; k < 2; k++) { const yy = yc + 7 + k * 6; R.rect(286, yy, 294, yy, hex('#d8d0b8')); R.pset(286, yy + 1, hex('#6a6050')); R.pset(294, yy + 1, hex('#6a6050')); }
  for (let x = mx0 - 1; x < 264; x++) for (let y = yc + 5; y <= yc + 10; y++) { const i = y * 320 + x; B[i] = e_mez(B[i], hex('#000000'), 0.4 * (1 - (y - yc - 5) / 6)); }
  for (let x = mx0 - 6; x <= 319; x++) { const i = (PIE + 1) * 320 + x; if (x >= 0) B[i] = e_mez(B[i], hex('#000000'), 0.35); }
  // el portátil abierto con el mismo mapa en pequeño
  const [lx, ly] = geo.portatil; for (let y = ly - 2; y <= ly; y++) { const xa = lx - 19 - (y - ly + 2), xb = lx + 17 + (y - ly + 2); for (let x = xa; x <= xb; x++) R.pset(x, y, y === ly ? hex('#5a5e66') : ((x + y) % 3 === 0 ? hex('#3a3e46') : hex('#a8acb4'))); }
  R.rect(lx - 17, ly - 21, lx + 15, ly - 3, hex('#2a2c32')); R.rect(lx - 17, ly - 21, lx + 15, ly - 21, hex('#6a6e76'));
  e_mapaEstrellas(R, t, [lx - 15, ly - 19, lx + 13, ly - 5], [lx + 2, ly - 12], o.rodea ?? 0, 0);
  // la taza con su vapor
  const [tx, ty] = geo.taza; R.rect(tx - 3, ty - 7, tx + 2, ty, hex('#d8dce0')); R.rect(tx + 1, ty - 7, tx + 2, ty, hex('#a8acb0')); R.rect(tx - 3, ty - 7, tx + 2, ty - 7, hex('#5a3a24')); R.pset(tx + 3, ty - 5, hex('#c8ccd0')); R.pset(tx + 4, ty - 4, hex('#c8ccd0')); R.pset(tx + 3, ty - 3, hex('#c8ccd0')); R.rect(tx - 2, ty - 4, tx, ty - 3, hex('#c84a3a'));
  for (let k = 0; k < 6; k++) { const u = ((t * 0.6 + k / 6) % 1), x = Math.round(tx + Math.sin(u * 7 + k) * 2), y = Math.round(ty - 9 - u * 14); if (h(k, Math.floor(t * 3), 158) < 0.8) R.pset(x, y, e_mez(R.pget(x, y), hex('#e8ecf0'), 0.6 - u * 0.5)); }
  // el planisferio (un disco de cartón con su ventana de cielo) y la libreta con el lápiz
  for (let j = -2; j <= 2; j++) for (let i = -11; i <= 11; i++) { if ((i * i) / 121 + (j * j) / 6.25 > 1) continue; const x = 248 + i, y = my + 3 + j; R.pset(x, y, (i * i) / 121 + (j * j) / 6.25 > 0.7 ? hex('#2a3a6a') : (i * i) / 49 + (j * j) / 2 < 1 ? hex('#0e1630') : hex('#c8b890')); if (h(x, y, 159) < 0.15 && (i * i) / 49 + (j * j) / 2 < 1) R.pset(x, y, hex('#e8ecff')); }
  R.rect(126, my + 2, 140, my + 4, hex('#f0ece0')); R.rect(126, my + 4, 140, my + 4, hex('#b8b0a0')); for (let x = 128; x < 139; x += 2) R.pset(x, my + 3, hex('#8aa0c0')); R.linea(129, my + 1, 141, my + 4, hex('#e8b830')); R.pset(141, my + 4, hex('#2a2a2a'));
  // el flexo encendido (base, brazo articulado, pantalla y su luz)
  R.rect(296, my + 1, 310, my + 3, hex('#2a2c32')); R.rect(296, my + 1, 310, my + 1, hex('#5a5e66')); R.linea(303, my + 1, 297, my - 20, hex('#3a3e46')); R.linea(304, my + 1, 298, my - 20, hex('#5a5e66'));
  R.linea(297, my - 20, 308, my - 31, hex('#3a3e46')); R.linea(298, my - 19, 309, my - 30, hex('#5a5e66')); R.disco(297, my - 20, 1.4, hex('#1a1c20'));
  R.poligono([[304, my - 33], [316, my - 29], [314, my - 23], [302, my - 27]], hex('#2a2c32')); R.linea(304, my - 33, 316, my - 29, hex('#6a6e76'));
  for (let k = 0; k < 4; k++) R.pset(306 + k * 2, my - 25 + (k >> 1), hex('#fff0c0'));
}

// la paleta del archivo: el garaje de Ohio (bloques pintados, vigas, cartón, tablero perforado, la tarde de fuera), el
// archivo de historia (acero gris, cajas grises, linóleo, madera de la sala de consulta), el sótano (hormigón, cobre,
// la caldera) y el laboratorio de Puerto Rico (pared amarilla clara, terrazo, palmeras y montes verdes)
const F = pal({
  techo: '#5e4a38', viga: '#6e5642', vigaS: '#4e3c2c', vigaL: '#8a6c50',
  bloque: '#d6cab2', bloqueS: '#bcae94', bloqueL: '#e4dac6', mortero: '#a89a82', poro: '#b0a38a',
  suelo: '#a6a096', sueloS: '#8c867c', sueloL: '#bcb6ac', sueloD: '#726c64', aceite: '#5e5a54', aceiteS: '#4a4640',
  carton: '#c49a62', cartonS: '#9a7444', cartonL: '#dcb47c', cartonD: '#6e5030', cinta: '#e2d6b0', rotulador: '#2a2a34',
  estante: '#727a84', estanteS: '#4a505a', estanteL: '#a6aeb8',
  perfo: '#caa876', perfoS: '#a07e4e', perfoD: '#6e5434',
  puerta: '#e6dece', puertaS: '#bcb29e', puertaL: '#f6f0e4',
  tarj: '#f2e6c2', tarjS: '#c8b68a', tarjD: '#5a4a32', tarjB: '#e4d4a8',
  gato: '#9a8e84', gatoS: '#6a5e56', gatoL: '#c4b8ac', gatoR: '#e8a0a8', gatoO: '#8ac850',
  cieloT0: '#7eaad6', cieloT1: '#b8c0d4', cieloT2: '#f2c89a', cieloT3: '#f6dcb4', nubeL: '#fff6e8', nubeM: '#f2dccc', nubeS: '#c8a8b4',
  cesped: '#6a9a3a', cespedS: '#4a7228', cespedL: '#94bc50', asfalto: '#5c5c64', asfaltoL: '#76767e', acera: '#c0bab0',
  casaA: '#e0c8a4', casaAS: '#b89e7c', casaB: '#a8c4d4', casaBS: '#8098aa', tejado: '#7a4a3a', tejadoS: '#5a3428', ventL: '#f6dc94',
  arbol: '#4e7e3a', arbolS: '#30582a', arbolL: '#74a24a', tronco: '#6a4a30', rojoC: '#c8402e', rojoCS: '#8e2a20', azulC: '#3a6aa8',
  gris: '#9aa0a8', grisS: '#767c86', grisL: '#bec4cc', grisD: '#4e545e', grisF: '#5e6470', caja: '#a9aeb5', cajaS: '#868b93', cajaL: '#cacdd3',
  etiqueta: '#f2eee2', linoleo: '#bcb4a2', linoleoS: '#a49c8a', linoleoL: '#d2cab8', linoleoD: '#8a8270',
  panel: '#8a6a48', panelS: '#6a4e34', panelL: '#aa885e', paredA: '#dcd6c8', paredAS: '#cac4b6', paredAL: '#e8e4da',
  terciopelo: '#2c2a3a', terciopeloL: '#3e3c50', verdeLamp: '#2a7a4a', verdeLampL: '#62b882', laton: '#c8a040', latonL: '#f0d070', latonS: '#8a6a24',
  guante: '#f6f6f2', guanteS: '#d0d0cc', cristal: '#dceef6', luzCal: '#fff0c8',
  cemento: '#8e8c88', cementoS: '#74726e', cementoL: '#a6a4a0', mancha: '#6e6a62', joist: '#5e4a36', joistL: '#7a6248',
  tuboCu: '#c07444', tuboCuL: '#eca070', pvc: '#e6e6de', pvcS: '#b4b4ac', caldera: '#5a6670', calderaS: '#3e4850', calderaL: '#7e8a94',
  llama: '#ffa838', llamaL: '#fff0a0', llamaA: '#5a8aff', foco: '#fff6d8', cuerpoCam: '#26262c', cuerpoCamL: '#4a4a54',
  paredP: '#efe2b4', paredPS: '#dccf9e', paredPL: '#f8f0d0', pizarra: '#f6f8f8', pizarraS: '#d4dade', aluM: '#b6bcc2', aluMS: '#8a9096',
  terrazo: '#d2cec2', terrazoS: '#b2ac9e', terrazoM: '#8a8478', terrazoR: '#c49a84',
  mesa: '#c8a878', mesaS: '#9e7e50', mesaL: '#e2c69a', mesaD: '#6e5434',
  monte0: '#86b878', monte1: '#5a9a54', monte2: '#38783e', cieloP0: '#4a94dc', cieloP1: '#7cbcf0', cieloP2: '#bce0f8',
  palma: '#3a8a3a', palmaL: '#6ab84a', palmaS: '#2a6a2e', corteza: '#8a7050', cortezaS: '#6a5238',
  pant: '#0c1820', ui: '#1c3240', uiL: '#3a5a6c', uiS: '#122230', fosfL: '#b8ffd0',
  rotuR: '#c83a2a', rotuA: '#2a5ac8', rotuN: '#2a2a30', planta: '#3a8a4a', plantaL: '#6ab86a', plantaS: '#24592e', maceta: '#c06a3a', macetaS: '#8a4a2a', macetaL: '#dc8a56',
  tinta: '#3a3842', tintaF: '#2c2c30', papelF: '#d6d2c6', bandaF: '#c2cabc', papelFS: '#b4b0a4',
});

// el búfer fijo de cada vista: lo que no se mueve se pinta una vez (por lienzo y por clave) y luego se copia entero
const f_CAPAS = new WeakMap();

function f_fondo(R, clave, dibuja) {
  let m = f_CAPAS.get(R); if (!m) f_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// el umbral de tramado ordenado 4×4 (Bayer) de un píxel, de 0 a 1: para los degradados de los cielos
const f_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_bayer = (x, y) => (f_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_mez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// tiñe un rectángulo hacia un color (paso 2: en tramado, la mitad de los píxeles)
function f_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, f_mez(R.pget(x, y), col, a));
}

// un rectángulo hecho con líneas (respeta R.recorte, al contrario que R.rect)
function f_rr(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); }

// motas sueltas de un color en un rectángulo (textura), fijas por su semilla k
function f_motas(R, x0, y0, x1, y1, n, c, k = 0) { for (let i = 0; i < n; i++) R.pset(Math.floor(x0 + h(i, 1, k) * (x1 - x0 + 1)), Math.floor(y0 + h(i, 2, k) * (y1 - y0 + 1)), c); }

// nube de tres tonos (sombra abajo, cuerpo y luz arriba), solo con discos: respeta R.recorte
function f_nube(R, cx, cy, w, c) {
  cx = Math.round(cx); cy = Math.round(cy); const r = Math.max(2, Math.round(w / 4));
  const bolas = [[-0.32, 0.2, 0.75], [0.3, 0.2, 0.8], [0, 0, 1], [-0.12, -0.5, 0.8], [0.16, -0.42, 0.7]];
  for (const [dx, dy, k] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * r + 1), Math.round(r * k), c[0]);
  for (const [dx, dy, k] of bolas) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * r - 1), Math.round(r * k) - 1, c[1]);
  for (const [dx, dy, k] of bolas.slice(2)) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * r - 2), Math.max(1, Math.round(r * k) - 2), c[2]);
}

// letras de impresora de 3×5 (solo las cifras y las letras de la secuencia 6EQUJ5) y su escritura, a escala e
const f_G3 = {
  ' ': ['...', '...', '...', '...', '...'], '0': ['###', '#.#', '#.#', '#.#', '###'], '1': ['.#.', '##.', '.#.', '.#.', '###'], '2': ['##.', '..#', '.#.', '#..', '###'],
  '3': ['##.', '..#', '.#.', '..#', '##.'], '4': ['#.#', '#.#', '###', '..#', '..#'], '5': ['###', '#..', '##.', '..#', '##.'], '6': ['.##', '#..', '###', '#.#', '###'],
  '7': ['###', '..#', '.#.', '.#.', '.#.'], '8': ['###', '#.#', '###', '#.#', '###'], '9': ['###', '#.#', '###', '..#', '##.'],
  E: ['###', '#..', '##.', '#..', '###'], Q: ['.#.', '#.#', '#.#', '##.', '.##'], U: ['#.#', '#.#', '#.#', '#.#', '###'], J: ['..#', '..#', '..#', '#.#', '.#.'],
};

function f_texto3(R, s, x, y, c, e = 1) {
  for (let n = 0; n < s.length; n++) { const g = f_G3[s[n]] || f_G3[' ']; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') {
    if (e === 1) R.pset(x + n * 4 + i, y + j, c); else for (let b = 0; b < e; b++) for (let a = 0; a < e; a++) R.pset(x + (n * 4 + i) * e + a, y + j * e + b, c); } }
}

// el «Wow!» a bolígrafo: trazos en una caja de 17×8 unidades; f 0–1 dice cuánto se ha escrito
const f_WOW = [[[0, 0.5], [1, 7.5], [2.6, 3], [4.2, 7.5], [5.4, 0]], [[8.2, 3.2], [7, 4.4], [7.2, 7], [8.6, 7.4], [9.6, 5.6], [9.2, 3.6], [8.2, 3.2]], [[11, 3], [12, 7.5], [13.2, 4.6], [14.4, 7.5], [15.4, 2.8]], [[17, 0], [16.8, 5]], [[16.8, 7.2], [16.9, 7.6]]];

function f_wow(R, x, y, e, f, c) {
  const segs = []; for (const tr of f_WOW) for (let i = 1; i < tr.length; i++) segs.push([tr[i - 1], tr[i]]);
  const tot = segs.reduce((s, [a, b]) => s + Math.hypot(b[0] - a[0], b[1] - a[1]), 0); let quedan = tot * f, fin = [x, y];
  for (const [a, b] of segs) { if (quedan <= 0) break; const l = Math.hypot(b[0] - a[0], b[1] - a[1]), u = Math.min(1, quedan / l); quedan -= l;
    const n = Math.ceil(l * e * 2); for (let i = 0; i <= n * u; i++) { const px = x + (a[0] + (b[0] - a[0]) * i / n) * e, py = y + (a[1] + (b[1] - a[1]) * i / n) * e;
      R.pset(Math.round(px), Math.round(py), c); if (e > 1) { R.pset(Math.round(px) + 1, Math.round(py), c); R.pset(Math.round(px), Math.round(py) + 1, c); } fin = [Math.round(px), Math.round(py)]; } }
  return fin;
}

// EL LISTADO en un recuadro de o.w × o.hh (por omisión 150 × 120) con la esquina de arriba a la izquierda en (x, y): un
// trozo del listado del canon (piezaListado, a escala o.e 1–3) recortado al recuadro y colocado como siempre: la
// secuencia en la columna o.col (1) a partir del renglón o.linea (2) contado desde arriba (la del archivo queda en
// [243, 93]). o.rodea, o.wow y o.desplaza como en piezaListado; o.foto: los colores apagados de una foto en pantalla
// (b_foto). Devuelve { seq, wow } (los de piezaListado: el centro de la secuencia y dónde acaba el «Wow!»)
function f_listado(R, x, y, o = {}) {
  const e = Math.max(1, Math.min(3, Math.round(o.e ?? 1))), w = Math.round(o.w ?? 150), hh = Math.round(o.hh ?? 120);
  const xs = Math.round(x + 28 * e + Math.round(1.5 * e) - 34.5 * e - 0.5);
  const L = piezaListado(R, xs, y, { s: e, w: Math.max(150 * e, w + x - xs), hh, col: o.col ?? 1, linea: o.linea ?? 2, rodea: o.rodea ?? 0, wow: o.wow ?? 0,
    desplaza: o.desplaza ?? 0, recorte: [x, y, x + w - 1, y + hh - 1], sombra: false });
  if (o.foto) b_foto(R, x, y, x + w - 1, y + hh - 1);
  return { seq: L.seq, wow: L.wow };
}
// una caja de cartón vista de frente (x0, y0)–(x1, y1), con su canto de luz, la sombra del lado, la cinta de la solapa,
// las vetas del cartón y, según su semilla k, un garabato de rotulador o un número escrito a mano (nunca letras)
function f_caja(R, x0, y0, x1, y1, k = 0, o = {}) {
  const c = o.c ?? [F.carton, F.cartonS, F.cartonL, F.cartonD], { rect, pset } = R;
  rect(x0, y0, x1, y1, c[3]); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c[0]); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, c[2]); rect(x1 - 2, y0 + 2, x1 - 1, y1 - 1, c[1]);
  for (let i = 0; i < (x1 - x0) * (y1 - y0) / 18; i++) pset(x0 + 1 + Math.floor(h(i, k, 51) * (x1 - x0 - 2)), y0 + 2 + Math.floor(h(k, i, 52) * (y1 - y0 - 3)), h(i, k, 53) > 0.5 ? c[1] : c[2]);
  const mx = Math.round((x0 + x1) / 2);
  if (o.cinta !== false && x1 - x0 > 8) { rect(mx - 1, y0 + 1, mx + 1, Math.min(y1 - 1, y0 + 4), o.cintaC ?? F.cinta); pset(mx + 1, y0 + 4, c[1]); }
  if (o.asas) { rect(x0 + 2, y0 + 3, x0 + 4, y0 + 4, c[3]); rect(x1 - 5, y0 + 3, x1 - 3, y0 + 4, c[3]); }
  const w = x1 - x0, hh = y1 - y0, v = h(k, 3, 54);
  if (o.numero) f_texto3(R, o.numero, x0 + 3, y0 + Math.max(3, Math.round(hh / 2) - 1), F.rotulador);
  else if (o.etiqueta) { rect(x0 + 3, y0 + Math.round(hh / 2) - 2, x0 + Math.min(w - 4, 12), y0 + Math.round(hh / 2) + 2, F.etiqueta); for (let i = x0 + 4; i < x0 + Math.min(w - 5, 11); i += 2) pset(i, y0 + Math.round(hh / 2), F.cajaS); }
  else if (v > 0.45 && w > 10 && hh > 6) { const yy = y0 + Math.round(hh * 0.55); for (let i = 0; i < Math.min(w - 6, 12); i++) pset(x0 + 3 + i, yy + Math.round(Math.sin(i * 1.3 + k) * 1), F.rotulador); }
  else if (w > 12 && hh > 8) f_texto3(R, '' + (2 + Math.floor(h(k, 5, 55) * 8)) + (Math.floor(h(k, 6, 56) * 10)), x0 + 3, y0 + Math.round(hh / 2) - 1, F.rotulador);
}

// una estantería de metal de x0 a x1 con baldas en las alturas ys (la última es el suelo) y lo que lleva cada hueco:
// cada cosa es [tipo, x0, x1, alto] con tipo 'caja', 'bote', 'caja2' (más clara), 'nevera', 'tarjetas' (las cajas largas
// y bajas de tarjetas perforadas), 'herr' (la caja de herramientas roja), 'gris' (las cajas grises de archivo)
function f_estanteria(R, x0, x1, ys, cosas, k = 0) {
  const { rect, pset } = R, y0 = ys[0], yb = ys[ys.length - 1];
  rect(x0 + 2, y0, x1 - 2, yb, f_mez(F.bloqueS, C.k, 0.35));
  ys.forEach((ysh, i) => { if (i === 0) return; const top = ys[i - 1] + 2, bot = ysh - 1;
    for (const [tipo, a, b, alto] of cosas[i - 1] || []) { const y = Math.max(top, bot - alto);
      if (tipo === 'caja' || tipo === 'caja2') f_caja(R, a, y, b, bot, k * 31 + a * 7 + i, tipo === 'caja2' ? { c: [F.cartonL, F.carton, f_mez(F.cartonL, C.blanco, 0.4), F.cartonS] } : {});
      else if (tipo === 'gris') f_caja(R, a, y, b, bot, k * 31 + a * 7 + i, { c: [F.caja, F.cajaS, F.cajaL, F.grisD], cinta: false, etiqueta: true });
      else if (tipo === 'bote') { const cs = [F.azulC, C.blanco, F.rojoC, F.verdeLamp][(a + i) % 4]; rect(a, y + 1, b, bot, F.grisD); rect(a + 1, y + 1, b - 1, bot, F.grisL); rect(a + 1, y + 3, b - 1, bot - 2, cs); rect(a, y, b, y, F.grisS); pset(a + 1, y + 3, F.grisL); rect(b - 1, y + 1, b - 1, bot, F.grisS); }
      else if (tipo === 'nevera') { rect(a, y, b, bot, F.rojoCS); rect(a + 1, y + 4, b - 1, bot - 1, F.rojoC); rect(a, y, b, y + 3, F.grisL); rect(a + 1, y + 1, b - 1, y + 1, C.blanco); rect(a + 3, y + 6, b - 3, y + 6, f_mez(F.rojoC, C.blanco, 0.4)); rect(b - 3, y + 4, b - 2, bot - 1, F.rojoCS); }
      else if (tipo === 'herr') { rect(a, y, b, bot, F.rojoCS); rect(a + 1, y + 2, b - 1, bot - 1, F.rojoC); rect(a + 1, y + 2, b - 1, y + 2, f_mez(F.rojoC, C.blanco, 0.4)); rect(Math.round((a + b) / 2) - 3, y - 2, Math.round((a + b) / 2) + 3, y - 1, F.grisD); rect(a + 1, y + 5, b - 1, y + 5, F.rojoCS); pset(a + 2, y + 6, F.latonL); pset(b - 2, y + 6, F.latonL); }
      else if (tipo === 'tarjetas') { for (let yy = bot; yy - 3 >= y; yy -= 4) { rect(a, yy - 3, b, yy, F.tarjS); rect(a, yy - 3, b, yy - 3, F.tarj); rect(a + 1, yy - 2, b - 1, yy - 1, F.tarjB); rect(b - 3, yy - 2, b - 1, yy - 1, F.cartonS); } } } });
  for (const ysh of ys.slice(0, -1)) { rect(x0, ysh, x1, ysh + 1, F.estante); rect(x0, ysh, x1, ysh, F.estanteL); rect(x0, ysh + 2, x1, ysh + 2, f_mez(F.estanteS, C.k, 0.3)); }
  for (const xu of [x0, x1 - 1]) { rect(xu, y0 - 2, xu + 1, yb, F.estante); rect(xu, y0 - 2, xu, yb, F.estanteL); for (let y = y0; y < yb; y += 3) pset(xu + 1, y, F.estanteS); }
}

// lo fijo del garaje: las vigas del techo, la pared de bloques pintados, el marco de la puerta basculante con su hoja
// subida a medias, sus raíles y el muelle; la estantería de cajas, la bici colgada, el tablero de herramientas, el banco,
// la lavadora con su cesto, la estantería del fondo (con las cajas de tarjetas perforadas y la nevera), el suelo de
// hormigón con sus juntas, la mancha de aceite, el sumidero y la luz de la tarde que entra; las cajas del gato y el cortacésped
function f_garajeFondo(R) {
  const { rect, pset, linea, disco, anillo, poligono } = R;
  // el techo de vigas vistas (contraste bajo bajo la barra del año)
  rect(0, 0, 319, 16, F.techo);
  for (let x = 4; x < 320; x += 22) { rect(x, 0, x + 5, 16, x > 170 ? F.viga : f_mez(F.viga, F.techo, 0.5)); rect(x + 5, 0, x + 5, 16, F.vigaS); if (x > 170) rect(x, 0, x, 16, F.vigaL); }
  f_motas(R, 0, 0, 319, 16, 90, F.vigaS, 3);
  rect(0, 17, 319, 19, F.vigaS); rect(0, 17, 319, 17, F.viga);
  // la pared de bloques pintados de crema: hiladas al tresbolillo, juntas de mortero, poros y bloques algo distintos
  for (let y = 20, f = 0; y < 132; y += 8, f++) for (let x = -(f % 2) * 8; x < 320; x += 16) {
    const v = h(x, y, 5), c = v < 0.25 ? F.bloqueS : v > 0.88 ? F.bloqueL : F.bloque;
    rect(x, y, x + 15, y + 7, F.mortero); rect(x + 1, y + 1, x + 15, y + 7, c); rect(x + 1, y + 1, x + 15, y + 1, f_mez(c, C.blanco, 0.25)); rect(x + 1, y + 7, x + 15, y + 7, f_mez(c, F.mortero, 0.5));
    for (let i = 0; i < 3; i++) pset(x + 2 + Math.floor(h(x, y, i + 6) * 12), y + 2 + Math.floor(h(y, x, i + 9) * 5), F.poro);
  }
  // un enchufe con su cable, un interruptor y el rastro de humedad abajo
  rect(186, 112, 190, 117, F.grisD); rect(187, 113, 189, 116, C.blanco); pset(188, 114, F.grisD); pset(188, 115, F.grisD);
  for (let x = 0; x < 320; x++) if (h(x, 1, 13) > 0.4) rect(x, 126 + Math.floor(h(x, 2, 13) * 3), x, 131, f_mez(F.bloqueS, F.mortero, 0.5));
  // la puerta basculante: el marco de madera, la hoja subida a medias (paneles con su relieve, los refuerzos, el tirador y
  // la goma), los raíles a los lados con sus ruedas y el muelle de torsión encima
  rect(8, 34, 104, 131, F.vigaS); rect(9, 35, 103, 131, F.viga); rect(9, 35, 103, 35, F.vigaL); rect(9, 35, 9, 131, F.vigaL);
  rect(13, 39, 99, 72, F.puerta);
  for (let s = 0; s < 3; s++) { const y = 39 + s * 11; rect(13, y, 99, y, F.puertaL); rect(13, y + 10, 99, y + 10, F.puertaS);
    for (let x = 16; x < 96; x += 14) { rect(x, y + 3, x + 10, y + 7, F.puertaS); rect(x, y + 3, x + 10, y + 3, f_mez(F.puertaS, C.k, 0.2)); rect(x + 1, y + 4, x + 10, y + 7, F.puertaL); rect(x + 1, y + 7, x + 10, y + 7, F.puerta); }
    for (const x of [14, 97]) { rect(x, y + 4, x + 1, y + 6, F.grisD); } }
  rect(13, 71, 99, 72, F.grisD); rect(52, 68, 60, 69, F.grisS); rect(52, 68, 60, 68, F.grisL);
  for (const x of [10, 100]) { rect(x, 34, x + 2, 131, F.estanteS); rect(x + 1, 34, x + 1, 131, F.estanteL); for (const y of [44, 55, 66]) { disco(x + 1, y, 2, F.grisD); pset(x + 1, y, F.grisL); } }
  rect(14, 29, 98, 31, F.grisD); for (let x = 20; x < 92; x += 2) { pset(x, 29, F.grisL); pset(x + 1, 31, F.grisS); } rect(54, 27, 58, 33, F.estanteS); rect(14, 27, 16, 33, F.estanteS); rect(96, 27, 98, 33, F.estanteS);
  // la escoba apoyada en el marco
  linea(107, 131, 113, 86, F.mesaS); linea(108, 131, 114, 86, F.mesaL); poligono([[103, 131], [111, 131], [110, 122], [105, 122]], F.cartonS); for (let x = 104; x < 111; x += 2) linea(x, 124, x, 131, F.cartonD);
  // la estantería de las cajas
  f_estanteria(R, 116, 152, [32, 54, 76, 98, 120, 131], [
    [['caja', 118, 134, 13], ['caja2', 135, 149, 9]], [['bote', 118, 123, 8], ['bote', 125, 130, 8], ['caja', 132, 149, 14]],
    [['caja2', 118, 140, 15], ['bote', 142, 148, 7]], [['herr', 119, 133, 8], ['caja', 135, 149, 12]], [['caja', 118, 149, 8]]], 1);
  // la bici colgada de dos ganchos: ruedas con radios, cuadro rojo, sillín, manillar y el plato
  for (const x of [176, 210]) { linea(x, 18, x, 27, F.grisD); pset(x + 1, 27, F.grisD); }
  for (const cx of [176, 210]) { anillo(cx, 38, 9, C.k); anillo(cx, 38, 8, F.grisD); anillo(cx, 38, 7, F.grisL); for (let a = 0; a < 6; a++) linea(cx, 38, Math.round(cx + Math.cos(a * 1.05) * 7), Math.round(38 + Math.sin(a * 1.05) * 7), F.grisS); disco(cx, 38, 1, F.grisD); }
  for (const [a, b, c, d] of [[176, 38, 192, 40], [192, 40, 188, 31], [188, 31, 176, 38], [188, 31, 205, 31], [205, 31, 192, 40], [205, 31, 210, 38], [204, 28, 206, 33]]) { linea(a, b, c, d, F.rojoCS); linea(a, b - 1, c, d - 1, F.rojoC); }
  rect(184, 28, 191, 29, C.k); rect(185, 28, 190, 28, F.grisD); rect(201, 26, 208, 27, F.grisD); pset(208, 27, C.k); disco(192, 40, 2, F.grisS); pset(192, 40, F.grisL);
  // el tablero perforado con las herramientas (cada una con su sombra)
  rect(156, 56, 226, 98, F.perfoS); rect(157, 57, 225, 97, F.perfo); rect(157, 57, 225, 57, f_mez(F.perfo, C.blanco, 0.3));
  for (let y = 60; y < 96; y += 4) for (let x = 160; x < 224; x += 4) pset(x, y, F.perfoD);
  const herr = (dib) => { dib(1, F.perfoS); dib(0, null); };
  herr((s, c) => { rect(161 + s, 62 + s, 162 + s, 77 + s, c ?? F.mesaS); rect(158 + s, 59 + s, 165 + s, 62 + s, c ?? F.grisS); if (!c) { rect(158, 59, 165, 59, F.grisL); rect(161, 62, 161, 77, F.mesaL); } });
  herr((s, c) => { poligono([[168 + s, 62 + s], [190 + s, 61 + s], [190 + s, 68 + s], [170 + s, 70 + s]], c ?? F.grisL); if (!c) { for (let x = 170; x < 190; x += 2) pset(x, 69 - Math.round((x - 170) / 10), F.grisS); linea(169, 62, 189, 61, C.blanco); } rect(190 + s, 60 + s, 196 + s, 70 + s, c ?? F.mesaS); if (!c) { rect(192, 63, 194, 67, F.perfo); rect(190, 60, 196, 60, F.mesaL); } });
  for (let i = 0; i < 5; i++) { const x = 200 + i * 5, l = 8 + i * 2; herr((s, c) => { rect(x + s, 61 + s, x + 1 + s, 61 + l + s, c ?? F.grisL); rect(x - 1 + s, 60 + s, x + 2 + s, 62 + s, c ?? F.grisS); if (!c) { pset(x, 60, F.perfo); rect(x + 1, 63, x + 1, 60 + l, F.grisS); } }); }
  for (let i = 0; i < 5; i++) { const x = 160 + i * 5, cs = [F.rojoC, F.azulC, F.laton, F.verdeLamp, F.rojoC][i]; herr((s, c) => { rect(x + s, 80 + s, x + 2 + s, 85 + s, c ?? cs); rect(x + 1 + s, 86 + s, x + 1 + s, 92 - i % 2 * 2 + s, c ?? F.grisL); if (!c) pset(x, 80, f_mez(cs, C.blanco, 0.4)); }); }
  herr((s, c) => { linea(188 + s, 80 + s, 190 + s, 92 + s, c ?? F.rojoC); linea(193 + s, 80 + s, 191 + s, 92 + s, c ?? F.rojoC); if (!c) { rect(189, 78, 192, 80, F.grisS); } });
  herr((s, c) => { rect(198 + s, 82 + s, 205 + s, 89 + s, c ?? F.laton); if (!c) { rect(198, 82, 205, 82, F.latonL); disco(201, 85, 2, F.latonS); rect(204, 89, 207, 90, F.grisL); } });
  for (const r of [6, 4]) anillo(216, 86, r, F.perfoS); anillo(215, 85, 6, F.rojoC); anillo(215, 85, 4, F.rojoCS); anillo(215, 85, 5, f_mez(F.rojoC, C.blanco, 0.3));
  // el banco de trabajo: tablero con vetas, patas, la balda de abajo con botes y la caja de herramientas; encima, el
  // tornillo de banco, una lata de tornillos, un tarro de clavos y la radio (su luz la pone cada fotograma)
  rect(152, 100, 228, 104, F.mesaS); rect(152, 100, 228, 101, F.mesaL); rect(152, 104, 228, 104, F.mesaD);
  for (let i = 0; i < 26; i++) { const x = 153 + Math.floor(h(i, 1, 60) * 74); rect(x, 102, x + 4, 102, F.mesa); }
  for (const x of [154, 223]) { rect(x, 105, x + 3, 131, F.mesaD); rect(x, 105, x, 131, F.mesaS); }
  rect(156, 118, 225, 119, F.mesaS); rect(156, 118, 225, 118, F.mesaL);
  for (const [x, cs] of [[160, F.azulC], [167, C.blanco], [174, F.rojoC]]) { rect(x, 109, x + 5, 117, F.grisD); rect(x + 1, 110, x + 4, 117, F.grisL); rect(x + 1, 112, x + 4, 115, cs); pset(x + 1, 110, C.blanco); }
  rect(188, 109, 206, 117, F.rojoCS); rect(189, 111, 205, 116, F.rojoC); rect(189, 111, 205, 111, f_mez(F.rojoC, C.blanco, 0.35)); rect(194, 107, 200, 108, F.grisD);
  rect(156, 93, 165, 99, F.grisD); rect(157, 94, 164, 98, F.estanteS); rect(157, 94, 164, 94, F.grisL); rect(165, 95, 165, 97, F.grisL); rect(166, 96, 172, 96, F.grisL); pset(172, 95, F.grisS); pset(172, 97, F.grisS);
  rect(175, 92, 182, 99, F.grisD); rect(176, 93, 181, 99, F.grisL); rect(176, 95, 181, 97, F.rojoC); pset(176, 93, C.blanco);
  rect(184, 94, 189, 99, f_mez(F.cristal, F.grisS, 0.4)); for (let i = 0; i < 6; i++) pset(185 + (i % 4), 96 + (i >> 1) % 3, F.grisD); rect(184, 93, 189, 93, F.grisS);
  rect(198, 88, 216, 99, F.mesaD); rect(199, 89, 215, 98, F.cartonL); rect(199, 89, 215, 89, f_mez(F.cartonL, C.blanco, 0.4));
  for (let y = 91; y < 98; y += 2) for (let x = 201; x < 207; x += 2) pset(x, y, F.cartonD); rect(208, 91, 214, 94, C.k); disco(210, 96, 1, F.grisD); disco(213, 96, 1, F.grisD); linea(214, 88, 222, 72, F.grisL); pset(222, 72, F.grisD);
  // la lavadora vieja con su panel de mandos y el cesto de la ropa encima
  rect(230, 92, 258, 131, F.grisD); rect(231, 98, 257, 130, hex('#ecebe2')); rect(231, 93, 257, 97, hex('#d8d6cc')); rect(231, 93, 257, 93, C.blanco);
  for (const x of [236, 246, 252]) { disco(x, 95, 1, F.grisS); pset(x, 94, F.grisL); }
  rect(255, 99, 257, 130, hex('#c8c6bc')); rect(231, 99, 254, 99, C.blanco); rect(231, 128, 257, 130, hex('#b4b2a8')); rect(234, 104, 252, 104, hex('#c8c6bc'));
  rect(233, 84, 255, 92, F.cartonS); for (let x = 234; x < 255; x += 2) for (let y = 85; y < 92; y++) if ((x + y) % 4 === 0) pset(x, y, F.carton); rect(233, 84, 255, 84, F.cartonL);
  for (const [x, c] of [[236, F.azulC], [242, F.rojoC], [247, hex('#e8e0c8')], [251, F.verdeLamp]]) { disco(x, 83, 2, c); pset(x - 1, 82, f_mez(c, C.blanco, 0.4)); }
  // la estantería del fondo: cajas largas de tarjetas perforadas, la nevera de playa y más cajas
  f_estanteria(R, 264, 318, [52, 74, 96, 118, 131], [
    [['tarjetas', 267, 290, 14], ['caja', 293, 314, 12]], [['caja2', 267, 284, 13], ['tarjetas', 287, 313, 10]],
    [['nevera', 267, 287, 15], ['caja', 290, 314, 14]], [['caja', 267, 288, 10], ['bote', 291, 296, 8], ['bote', 298, 303, 8]]], 2);
  // el suelo de hormigón: motas, juntas que huyen hacia el fondo, la mancha de aceite, las grietas y el sumidero
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 21), w = h(x, y, 22); pset(x, y, v < 0.07 ? F.sueloS : v > 0.95 ? F.sueloL : w > 0.985 ? F.sueloD : F.suelo); }
  rect(0, 132, 319, 133, f_mez(F.suelo, C.k, 0.3));
  for (let xs = -160; xs <= 480; xs += 80) for (let y = 134; y < 180; y++) pset(Math.round(160 + (xs - 160) * (y - 40) / 140), y, F.sueloS);
  rect(0, 152, 319, 152, F.sueloS); rect(0, 153, 319, 153, F.sueloL);
  for (let j = -4; j <= 4; j++) for (let i = -16; i <= 16; i++) if ((i * i) / 256 + (j * j) / 16 < 1 - h(i, j, 23) * 0.3) pset(124 + i, 170 + j, Math.abs(i) < 8 && Math.abs(j) < 2 ? F.aceiteS : F.aceite);
  for (const [x, y] of [[104, 167], [146, 173], [140, 166]]) pset(x, y, F.aceite);
  { let x = 60, y = 140; for (let i = 0; i < 18; i++) { pset(x, y, F.sueloD); x += 1 + (h(i, 1, 24) > 0.6 ? 1 : 0); y += h(i, 2, 24) > 0.5 ? 1 : 0; } }
  disco(240, 170, 4, F.sueloD); disco(240, 170, 3, F.grisS); for (let i = -2; i <= 2; i += 2) linea(237, 170 + i, 243, 170 + i, F.grisD);
  // la luz de la tarde que entra por la puerta y se tiende en el suelo; el lado derecho, más en sombra
  for (let y = 132; y < 180; y++) { const u = (y - 132) / 48, xl = Math.round(13 + u * 30), xr = Math.round(99 + u * 76); f_velo(R, xl, y, xr, y, F.cieloT3, 0.32 - u * 0.12); }
  f_velo(R, 250, 20, 319, 179, hex('#3a3040'), 0.14);
  // la bombona de gasolina roja y el cortacésped
  rect(244, 148, 254, 158, F.rojoCS); rect(245, 150, 253, 157, F.rojoC); rect(245, 150, 253, 150, f_mez(F.rojoC, C.blanco, 0.4)); rect(246, 145, 249, 148, F.rojoCS); linea(252, 148, 256, 143, C.k);
  linea(296, 147, 312, 122, C.k); linea(297, 147, 313, 122, F.grisS); linea(310, 125, 316, 125, C.k);
  rect(276, 132, 300, 145, F.verdeLamp); rect(277, 133, 299, 144, hex('#3a9a5a')); for (let y = 135; y < 144; y += 2) rect(278, y, 298, y, F.verdeLamp);
  rect(268, 146, 310, 154, F.rojoCS); rect(269, 147, 309, 153, F.rojoC); rect(269, 147, 309, 147, f_mez(F.rojoC, C.blanco, 0.4)); rect(280, 140, 292, 146, F.grisD); rect(281, 141, 291, 145, F.grisS); disco(286, 139, 2, C.k);
  for (const x of [273, 305]) { disco(x, 156, 4, C.k); disco(x, 156, 2, F.grisS); pset(x, 156, F.grisL); }
  // las cajas del gato (una sobre otra) y la sombra en el suelo
  rect(190, 157, 226, 159, f_mez(F.suelo, C.k, 0.3));
  f_caja(R, 192, 143, 224, 158, 7, { numero: '84' }); poligono([[192, 143], [224, 143], [227, 140], [195, 140]], F.cartonL); rect(224, 141, 226, 155, F.cartonS);
  f_caja(R, 196, 131, 220, 140, 9); poligono([[196, 131], [220, 131], [223, 128], [199, 128]], F.cartonL); rect(220, 129, 222, 139, F.cartonS);
}

// lo de fuera por la puerta del garaje (recortado a su hueco): el cielo de la tarde tramado con tres nubes a tres
// velocidades, el sol bajo, los árboles lejos, dos casas de enfrente con su luz encendida, un árbol que se mece, la calle
// por la que pasa un coche, un niño en bici por la acera, un pájaro, el buzón, el césped y la entrada de hormigón
function f_garajeFuera(R, t) {
  const { pset, linea, disco, poligono } = R, X0 = 13, X1 = 99;
  R.recorte([X0, 73, X1, 131]);
  const cols = [F.cieloT0, F.cieloT1, F.cieloT2, F.cieloT3];
  for (let y = 73; y <= 96; y++) { const u = (y - 73) / 23 * 3, i = Math.min(2, Math.floor(u)), f = u - i; for (let x = X0; x <= X1; x++) pset(x, y, f_bayer(x, y) < f ? cols[i + 1] : cols[i]); }
  disco(84, 89, 5, F.cieloT3); disco(84, 89, 4, hex('#fff2d0')); disco(84, 89, 2, C.blanco);
  for (const [b, v, y, w] of [[0, 1.1, 78, 16], [60, 2, 83, 11], [30, 3.2, 76, 8]]) f_nube(R, X0 - 16 + ((b + t * v) % 120), y, w, [F.nubeS, F.nubeM, F.nubeL]);
  { const u = ((t + 2) / 9) % 1, bx = Math.round(X0 - 4 + u * 100), by = Math.round(80 + Math.sin(t * 2.3) * 2), al = Math.sin(t * 15) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); }
  for (let x = X0; x <= X1; x++) { const hy = 92 - Math.round(2 + 2 * Math.sin(x * 0.5) + 2 * h(x >> 2, 1, 25)); linea(x, hy, x, 96, (x + hy) % 3 ? F.arbolS : F.arbol); }
  poligono([[12, 90], [30, 80], [48, 90]], F.tejado); for (let y = 84; y < 90; y += 2) linea(30 - (y - 80) * 1.8, y, 30 + (y - 80) * 1.8, y, F.tejadoS);
  f_rr(R, 16, 90, 44, 101, F.casaA); f_rr(R, 38, 90, 44, 101, F.casaAS); linea(36, 81, 36, 85, F.tejadoS); linea(37, 81, 37, 85, F.tejadoS);
  for (const x of [19, 32]) { f_rr(R, x, 92, x + 4, 96, F.grisD); f_rr(R, x + 1, 93, x + 3, 95, F.ventL); }
  f_rr(R, 26, 94, 29, 101, F.tejadoS);
  poligono([[53, 89], [77, 78], [101, 89]], F.tejado); for (let y = 82; y < 89; y += 2) linea(77 - (y - 78) * 2.2, y, 77 + (y - 78) * 2.2, y, F.tejadoS);
  f_rr(R, 57, 89, 97, 101, F.casaB); f_rr(R, 88, 89, 97, 101, F.casaBS); f_rr(R, 61, 92, 66, 96, F.grisD); f_rr(R, 62, 93, 65, 95, Math.sin(t * 0.7) > -0.6 ? F.ventL : F.casaBS); f_rr(R, 72, 94, 86, 101, hex('#e8e4dc')); for (let y = 96; y < 101; y += 2) linea(72, y, 86, y, F.casaBS);
  { const m = Math.round(Math.sin(t * 1.2) * 1); f_rr(R, 49, 91, 51, 102, F.tronco); for (const [dx, dy, r, c] of [[0, -14, 6, F.arbolS], [-3, -16, 4, F.arbol], [3, -12, 5, F.arbol], [1, -18, 3, F.arbolL], [-2, -12, 3, F.arbolL]]) disco(50 + dx + m, 103 + dy, r, c); }
  f_rr(R, X0, 101, X1, 103, F.cespedL); f_rr(R, X0, 104, X1, 105, F.acera); f_rr(R, X0, 106, X1, 113, F.asfalto); linea(X0, 106, X1, 106, F.asfaltoL);
  for (let x = X0 + ((Math.floor(t * 0) % 8)); x < X1; x += 8) linea(x, 110, x + 3, 110, hex('#e8c860'));
  { const u = (t % 8) / 8, cx = Math.round(-30 + u * 170); f_rr(R, cx, 107, cx + 20, 111, F.rojoC); f_rr(R, cx + 4, 104, cx + 15, 107, F.rojoCS); f_rr(R, cx + 5, 105, cx + 14, 106, hex('#9ab8d0')); linea(cx, 107, cx + 20, 107, f_mez(F.rojoC, C.blanco, 0.4)); disco(cx + 4, 112, 2, C.k); disco(cx + 16, 112, 2, C.k); pset(cx + 20, 109, F.ventL); }
  { const u = ((t + 5) % 11) / 11, kx = Math.round(110 - u * 120); disco(kx, 104, 1, C.k); disco(kx + 4, 104, 1, C.k); linea(kx, 104, kx + 4, 104, F.azulC); pset(kx + 2, 101, F.azulC); pset(kx + 2, 102, F.azulC); pset(kx + 2, 100, hex('#e0b090')); pset(kx + 2, 99, F.tejadoS); }
  f_rr(R, X0, 114, X1, 115, F.acera); f_rr(R, X0, 116, X1, 131, F.cesped); for (let y = 117; y < 131; y += 3) linea(X0, y, X1, y, F.cespedS);
  for (let i = 0; i < 30; i++) { const x = X0 + Math.floor(h(i, 1, 26) * 86), y = 117 + Math.floor(h(i, 2, 26) * 14), s = Math.round(Math.sin(t * 2 + i) * 0.6); pset(x + s, y - 1, F.cespedL); }
  poligono([[38, 116], [74, 116], [100, 132], [12, 132]], F.acera); linea(56, 116, 56, 131, F.sueloS); linea(25, 124, 87, 124, F.sueloS);
  f_rr(R, 85, 107, 85, 114, F.grisD); f_rr(R, 82, 105, 88, 108, F.grisS); pset(83, 106, F.grisL);
  R.recorte(null);
}

// el garaje entero: el fondo fijo, lo de fuera, el fluorescente que tiembla, la luz de la radio, las motas en el rayo de
// sol, la caja que se abre (o.confeti) y el gato que duerme encima de las otras dos cajas (y se despierta)
function f_garaje(R, t, o) {
  f_fondo(R, 'garaje', () => f_garajeFondo(R));
  f_garajeFuera(R, t);
  const { rect, pset, linea } = R, c = o.confeti ?? 0;
  // el fluorescente colgado de dos cadenas (parpadea de vez en cuando) y su reflejo en la pared
  for (const x of [200, 236]) for (let y = 17; y < 23; y += 2) pset(x, y, F.grisD);
  const on = !((t % 6.1) < 0.2 && Math.sin(t * 60) > 0); rect(194, 23, 242, 26, F.grisD); rect(195, 24, 241, 25, on ? C.blanco : F.grisL); rect(195, 26, 241, 26, F.grisS);
  if (on) for (let y = 27; y < 34; y++) for (let x = 192 - (y - 27); x <= 244 + (y - 27); x++) if ((x + y) % 4 === 0) pset(x, y, f_mez(R.pget(x, y), C.blanco, 0.35));
  // la radio encendida: la aguja del dial se mueve y la luz respira; dos notas suben de vez en cuando
  { const g = 0.5 + 0.5 * Math.sin(t * 3); rect(208, 91, 214, 94, f_mez(hex('#5a3a10'), F.llama, 0.5 + g * 0.3)); pset(209 + Math.round((Math.sin(t * 0.4) + 1) * 2), 92, C.k);
    for (let k = 0; k < 2; k++) { const u = ((t * 0.5 + k * 0.5) % 1); if (u < 0.8) { const nx = Math.round(200 + k * 6 + Math.sin(u * 6) * 2), ny = Math.round(84 - u * 18), nc = f_mez(F.perfoD, F.bloque, u); rect(nx, ny, nx + 1, ny + 1, nc); rect(nx + 1, ny - 4, nx + 1, ny, nc); pset(nx + 2, ny - 4, nc); pset(nx + 3, ny - 3, nc); } } }
  // las motas que flotan en el rayo de sol
  for (let k = 0; k < 16; k++) { const u = (h(k, 1, 27) + t * 0.015 * (1 + k % 3)) % 1, s = (h(k, 2, 27) + Math.sin(t * 0.3 + k) * 0.05 + 1) % 1, y = 76 + u * 96, xl = 13 + (y - 76) / 96 * 30, xr = 99 + (y - 76) / 96 * 70;
    if (Math.sin(t * 1.3 + k * 2) > -0.3) pset(Math.round(xl + s * (xr - xl)), Math.round(y), F.luzCal); }
  f_cajaGaraje(R, t, c);
  const desp = Math.max(0, Math.min(1, (c - 0.52) / 0.1));
  f_gato(R, 197, 128, t, desp, c >= 0.52);
}

// la caja que abre el voluntario (en su línea de suelo, x 150–181, y 138–158): cerrada con cinta y un «77» de rotulador;
// con c > 0 da un salto, las solapas se abren y por dentro asoma el taco de tarjetas
function f_cajaGaraje(R, t, c) {
  const { rect, pset, poligono } = R, sh = c > 0.02 && c < 0.12 ? Math.round(Math.sin(t * 40)) : 0, x0 = 150 + sh, a = Math.max(0, Math.min(1, (c - 0.02) / 0.06));
  rect(148, 157, 184, 159, f_mez(F.suelo, C.k, 0.3));
  f_caja(R, x0, 142, x0 + 28, 158, 3, { numero: '77', cinta: a === 0 });
  rect(x0 + 28, 140, x0 + 31, 155, F.cartonS); rect(x0 + 28, 140, x0 + 28, 155, F.cartonD);
  if (a === 0) { poligono([[x0, 142], [x0 + 28, 142], [x0 + 31, 138], [x0 + 3, 138]], F.cartonL); rect(x0 + 13, 138, x0 + 16, 142, F.cinta); rect(x0 + 2, 140, x0 + 29, 140, F.cartonS); return; }
  poligono([[x0, 142], [x0 + 28, 142], [x0 + 31, 138], [x0 + 3, 138]], F.cartonD);
  for (let i = 0; i < 6; i++) rect(x0 + 6 + i * 3, 139, x0 + 7 + i * 3, 141, i % 2 ? F.tarjB : F.tarj);
  poligono([[x0 + 3, 138], [x0 + 31, 138], [x0 + 31 + Math.round(a * 2), 138 - Math.round(a * 9)], [x0 + 3 + Math.round(a * 2), 138 - Math.round(a * 9)]], F.cartonL);
  rect(x0 + 3, 138, x0 + 31, 138, F.cartonS);
  poligono([[x0, 142], [x0 + 3, 138], [x0 - Math.round(a * 8), 136 - Math.round(a * 2)]], F.carton);
  poligono([[x0 + 28, 142], [x0 + 31, 138], [x0 + 31 + Math.round(a * 8), 137]], F.carton);
  poligono([[x0, 142], [x0 + 28, 142], [x0 + 28, 142 + Math.round(a * 6)], [x0, 142 + Math.round(a * 6)]], f_mez(F.carton, F.cartonL, 0.5)); rect(x0, 142, x0 + 28, 142, F.cartonD);
}

// el gato atigrado sobre la caja (x, y: la esquina izquierda de su barriga; mide 22 × 9): enroscado y dormido, respira;
// con d > 0 levanta la cabeza, abre los ojos y mueve la cola; con tarjeta, lleva una tarjeta perforada sobre la cabeza
function f_gato(R, x, y, t, d, tarjeta) {
  const { pset, rect } = R, resp = Math.sin(t * 1.7) > 0.6 ? 1 : 0, anchos = [12, 17, 20, 22, 22, 22, 21], CK = hex('#3a3036');
  // la silueta con su contorno oscuro, el lomo claro, las rayas del atigrado y la barriga en sombra
  for (let j = -1; j < 8; j++) { const w = anchos[Math.max(0, Math.min(6, j))] + 2, x0 = x + Math.round((22 - w) / 2); rect(x0, y - 7 + j - (j <= 0 ? resp : 0), x0 + w - 1, y - 7 + j - (j <= 0 ? resp : 0), CK); }
  for (let j = 0; j < 7; j++) { const w = anchos[j], x0 = x + Math.round((22 - w) / 2), yy = y - 7 + j - (j === 0 ? resp : 0);
    for (let i = 0; i < w; i++) pset(x0 + i, yy, j <= 1 ? F.gatoL : (x0 + i + Math.round(j / 2)) % 4 === 0 && j < 5 ? F.gatoS : j === 6 ? F.gatoS : F.gato); }
  if (d <= 0) {
    // dormido: la cabeza metida a la derecha con sus orejas, el ojo cerrado, la nariz y la cola que rodea por delante
    rect(x + 15, y - 9, x + 23, y - 1, CK); rect(x + 16, y - 8, x + 22, y - 2, F.gato); rect(x + 16, y - 8, x + 22, y - 8, F.gatoL);
    rect(x + 16, y - 10, x + 17, y - 9, CK); rect(x + 21, y - 10, x + 22, y - 9, CK); pset(x + 17, y - 9, F.gatoR); pset(x + 21, y - 9, F.gatoR);
    rect(x + 17, y - 5, x + 19, y - 5, CK); pset(x + 22, y - 3, F.gatoR); for (const yy of [y - 7, y - 6]) pset(x + 20, yy, F.gatoS);
    rect(x, y - 2, x + 15, y - 1, CK); rect(x + 1, y - 2, x + 14, y - 2, F.gatoS); pset(x + 14, y - 2, F.gatoL); pset(x + 13, y - 2, F.gatoL);
    return;
  }
  // despierto: la cabeza arriba con orejas de punta, ojos verdes abiertos y la cola que se mueve
  const hy = y - 14 - Math.round(2 * Math.min(1, d * 2)), hx = x + 14;
  rect(hx + 1, hy + 6, hx + 6, y - 6, CK); rect(hx + 2, hy + 6, hx + 5, y - 6, F.gato);
  rect(hx - 1, hy - 1, hx + 8, hy + 7, CK); rect(hx, hy, hx + 7, hy + 6, F.gato); rect(hx, hy, hx + 7, hy, F.gatoL); rect(hx + 2, hy + 5, hx + 5, hy + 6, F.gatoL);
  for (const ex of [hx - 1, hx + 6]) { rect(ex, hy - 3, ex + 2, hy - 1, CK); pset(ex + 1, hy - 2, F.gatoR); }
  const parp = (t % 3.2) < 0.12; for (const ex of [hx + 1, hx + 5]) { if (parp) rect(ex, hy + 3, ex + 1, hy + 3, CK); else { rect(ex, hy + 2, ex + 1, hy + 3, F.gatoO); pset(ex + 1, hy + 3, C.k); } }
  pset(hx + 3, hy + 4, F.gatoR); pset(hx + 4, hy + 4, F.gatoR); rect(hx + 3, hy + 1, hx + 4, hy + 1, F.gatoS);
  for (let i = 0; i < 8; i++) { const cx = x - 1 - Math.round(i * 0.5), cy = y - 3 - i + Math.round(Math.sin(i * 0.7 + t * 5) * i * 0.3); pset(cx - 1, cy, CK); pset(cx, cy, i % 2 ? F.gatoS : F.gato); pset(cx + 1, cy, CK); }
  if (tarjeta) f_tarjeta(R, hx - 1, hy - 6, 1, 0);
  if (d > 0 && d < 1) R.icono('!', hx + 11, hy - 10, F.ventL, C.k);
}

// una tarjeta perforada de 9×5 (beis, con la esquina cortada y sus agujeros rectangulares) en cuatro posturas al girar:
// 0 plana, 1 inclinada, 2 de canto, 3 de pie; k cambia el dibujo de los agujeros
function f_tarjeta(R, x, y, fase, k = 0) {
  x = Math.round(x); y = Math.round(y); const ag = (i, j) => j >= 1 && j <= 3 && i >= 1 && i <= 7 && h(k * 7 + i, j, 31) > 0.7;
  if (fase === 0) { for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) if (i || j) R.pset(x + i, y + j, ag(i, j) ? F.tarjD : j === 4 || i === 8 ? F.tarjS : j === 0 ? C.blanco : F.tarj); }
  else if (fase === 1) { for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) if (i || j) R.pset(x + i, y + j + Math.round(i * 0.45), ag(i, j) ? F.tarjD : j === 3 ? F.tarjS : F.tarj); }
  else if (fase === 2) { R.rect(x, y + 2, x + 8, y + 2, F.tarj); R.rect(x + 1, y + 3, x + 8, y + 3, F.tarjS); }
  else { for (let j = 0; j < 9; j++) for (let i = 0; i < 5; i++) if (i || j) R.pset(x + i + 2, y + j - 2, ag(j, i) ? F.tarjD : i === 4 || j === 8 ? F.tarjS : F.tarj); }
}

// EL GAG 7 (delante de los personajes): con c = o.confeti 0–1, las tarjetas salen de la caja (x 164, y 138) en un chorro,
// suben girando y caen revoloteando por el suelo del garaje (y 159–175); la primera cae en la cabeza del gato (c ≈ 0,52),
// y desde ahí la dibuja f_gato. Las que han caído se quedan quietas en el suelo.
function f_tarjetasVuelan(R, t, c) {
  if (c <= 0) return;
  for (let i = 1; i < 28; i++) {
    const ti = 0.03 + i * 0.012, d = 0.34 + h(i, 4, 40) * 0.2, u = (c - ti) / d; if (u <= 0) continue;
    const lx = Math.max(104, Math.min(256, 166 + (h(i, 1, 40) - 0.5) * 180)), ly = 158 + h(i, 2, 40) * 16, H = 36 + h(i, 3, 40) * 44;
    if (u >= 1) { f_tarjeta(R, lx - 4, ly - 2, h(i, 5, 40) > 0.75 ? 1 : 0, i); continue; }
    const x = 164 + (lx - 164) * u + Math.sin(u * 9 + i) * 6 * u, y = 136 + (ly - 136) * u - H * 4 * u * (1 - u) * (1 - 0.25 * u);
    f_tarjeta(R, x - 4, y - 2, Math.floor(t * 9 + i * 1.7) % 4, i);
  }
  // la del gato: sale la primera y aterriza en su cabeza
  const u = (c - 0.12) / 0.4; if (u > 0 && u < 1) f_tarjeta(R, 164 + (214 - 164) * u - 4, 136 + (106 - 136) * u - 50 * 4 * u * (1 - u) - 2, Math.floor(t * 9) % 4, 0);
}

// un pasillo entre dos estanterías que huyen hacia el fondo (a0–a1, centro cx): el techo con los fluorescentes que se
// alejan, las baldas de cajas grises iguales (cada una con su etiqueta) que se oscurecen con la distancia, el suelo con su
// brillo y la pared del fondo con su pictograma verde de salida (una figura que corre, sin letras)
function f_pasillo(R, a0, a1, cx) {
  const { pset, linea, poligono } = R, fx0 = cx - 8, fx1 = cx + 8, fy0 = 58, fy1 = 104, lado = (x, u, izq) => {
    const yt = Math.round(26 + (fy0 + 2 - 26) * u), yb = Math.round(146 + (fy1 - 146) * u), z = u / (1 - u * 0.82), seg = Math.floor(z * 5), sx = (z * 5) % 1;
    for (let y = yt; y <= yb; y++) { const l = (y - yt) / (yb - yt) * 6, nl = l % 1, osc = u * 0.6;
      const tono = [F.caja, F.cajaL, f_mez(F.caja, F.cajaS, 0.5)][Math.floor(h(seg, Math.floor(l), cx) * 3)];
      let c = nl < 0.12 ? F.grisD : nl < 0.2 ? F.grisL : nl < 0.28 && sx > 0.15 ? f_mez(tono, C.blanco, 0.3) : sx < 0.14 ? F.grisD : tono;
      if (nl > 0.48 && nl < 0.66 && sx > 0.4 && sx < 0.75 && u < 0.75) c = F.etiqueta;
      pset(x, y, f_mez(c, F.grisF, osc)); } };
  R.recorte([Math.max(0, a0), 22, a1 - 1, 146]);
  poligono([[a0, 22], [a1, 22], [fx1, fy0], [fx0, fy0]], F.grisF);
  for (let k = 0; k < 6; k++) { const u0 = 1 - 1 / (1 + k * 0.5), u1 = u0 + (1 - u0) * 0.12, y0 = Math.round(22 + (fy0 - 22) * u0), y1 = Math.round(22 + (fy0 - 22) * u1), w = Math.round(6 * (1 - u0)) + 1; for (let y = y0; y <= y1; y++) linea(cx - w, y, cx + w, y, k % 2 ? C.blanco : F.luzCal); }
  poligono([[a0, 147], [a1, 147], [fx1, fy1], [fx0, fy1]], F.linoleoS);
  for (let y = fy1; y < 147; y++) { const u = (y - fy1) / (147 - fy1), w = Math.round(3 + u * 10); for (let x = cx - w; x <= cx + w; x++) if ((x + y) % 2 === 0) pset(x, y, F.linoleoL); if (y % 6 === 0) linea(a0, y, a1, y, F.linoleoD); }
  for (let x = a0; x < fx0; x++) lado(x, (x - a0) / (fx0 - a0), true);
  for (let x = a1 - 1; x > fx1; x--) lado(x, (a1 - 1 - x) / (a1 - 1 - fx1), false);
  f_rr(R, fx0, fy0, fx1, fy1, F.paredAS); f_rr(R, fx0, fy1 - 4, fx1, fy1, F.grisS);
  f_rr(R, cx - 3, fy0 + 4, cx + 3, fy0 + 8, F.verdeLamp); pset(cx, fy0 + 5, C.blanco); linea(cx - 1, fy0 + 6, cx + 1, fy0 + 6, C.blanco); pset(cx - 1, fy0 + 7, C.blanco); pset(cx + 1, fy0 + 7, C.blanco);
  R.recorte(null);
}

// el costado de una estantería (x0–x1) de cara: chapa gris con canto de luz, zócalo, la placa con su número de pasillo y
// el tarjetero
function f_costado(R, x0, x1, num, y0 = 24, y1 = 146) {
  const { rect, pset } = R;
  rect(x0, y0, x1, y1, F.grisD); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, F.gris); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, F.grisL); rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, F.grisS);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 3, F.grisL); rect(x0 + 1, y1 - 7, x1 - 1, y1 - 1, F.grisS); rect(x0 + 1, y1 - 7, x1 - 1, y1 - 7, F.grisD);
  for (let y = y0 + 8; y < y1 - 10; y += 14) for (const x of [x0 + 3, x1 - 4]) pset(x, y, F.grisS);
  const mx = Math.round((x0 + x1) / 2); rect(mx - 6, y0 + 12, mx + 6, y0 + 22, F.grisD); rect(mx - 5, y0 + 13, mx + 5, y0 + 21, F.etiqueta); f_texto3(R, num, mx - 3, y0 + 15, F.rotulador);
  rect(mx - 5, y0 + 34, mx + 5, y0 + 41, F.grisS); rect(mx - 4, y0 + 35, mx + 4, y0 + 40, F.etiqueta); for (let y = y0 + 36; y < y0 + 40; y += 2) rect(mx - 3, y, mx + 2, y, F.cajaS);
}

// lo fijo del archivo: el techo de placas, tres pasillos de estanterías con sus costados numerados, la sala de consulta
// (pared con zócalo de madera, la foto enmarcada de la gran oreja en sepia con su lámpara, el reloj, el planero con el
// termohigrógrafo), la mesa de consulta con los guantes blancos, el lápiz y la lupa, la vitrina inclinada con la carpeta y
// el listado del «Wow!» bajo el cristal, la lámpara verde de banquero y el suelo de linóleo con sus brillos
function f_archivoFondo(R) {
  const { rect, pset, linea, disco, anillo, poligono } = R;
  rect(0, 0, 319, 21, F.paredAS); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 21, f_mez(F.paredAS, F.grisS, 0.25)); rect(0, 10, 319, 10, f_mez(F.paredAS, F.grisS, 0.25)); f_motas(R, 0, 0, 319, 21, 120, f_mez(F.paredAS, F.grisS, 0.4), 41);
  rect(0, 21, 319, 22, F.grisS);
  for (const [x0, x1] of [[190, 222], [236, 268]]) { rect(x0, 4, x1, 9, F.grisS); rect(x0 + 1, 5, x1 - 1, 8, C.blanco); for (let x = x0 + 3; x < x1; x += 4) rect(x, 5, x, 8, F.luzCal); }
  // la sala de consulta
  rect(162, 22, 319, 146, F.paredA); f_motas(R, 162, 22, 319, 112, 260, F.paredAS, 42); f_motas(R, 162, 22, 319, 112, 80, F.paredAL, 43);
  rect(162, 108, 319, 110, F.panelS); rect(162, 108, 319, 108, F.panelL);
  rect(162, 111, 319, 146, F.panel); for (let x = 166; x < 320; x += 26) { rect(x, 115, x + 21, 140, F.panelS); rect(x + 1, 116, x + 21, 140, F.panel); rect(x + 1, 116, x + 21, 116, F.panelL); for (let i = 0; i < 6; i++) { const y = 118 + Math.floor(h(x, i, 44) * 21); rect(x + 3 + Math.floor(h(i, x, 45) * 6), y, x + 9 + Math.floor(h(i, x, 46) * 10), y, F.panelS); } }
  rect(162, 141, 319, 146, F.panelS);
  // la foto de la gran oreja (sepia) con su marco, el paspartú y la lámpara de cuadro
  rect(194, 32, 254, 68, F.panelS); rect(196, 34, 252, 66, F.etiqueta); rect(200, 38, 248, 62, hex('#e8d8b4'));
  for (let y = 38; y < 50; y++) linea(200, y, 248, y, f_mez(hex('#f0e2c0'), hex('#d8c49c'), (y - 38) / 12));
  poligono([[204, 58], [214, 41], [218, 41], [210, 58]], hex('#8a7254')); for (let k = 0; k < 6; k++) linea(205 + k * 2, 57 - k * 3, 213 + k, 57 - k * 3, hex('#b8a07c'));
  poligono([[236, 58], [240, 47], [246, 48], [246, 58]], hex('#7a6448')); for (let x = 238; x < 246; x += 2) linea(x, 49, x, 57, hex('#a08868'));
  rect(210, 55, 238, 59, hex('#c8b490')); rect(210, 55, 238, 55, hex('#f0e6cc')); rect(200, 59, 248, 62, hex('#9a8460'));
  rect(212, 28, 236, 30, F.latonS); rect(213, 28, 235, 28, F.latonL); for (let y = 31; y < 38; y++) for (let x = 206 - (y - 31); x < 242 + (y - 31); x++) if ((x + y) % 3 === 0) pset(x, y, F.paredAL);
  // el planero de cajones con sus tiradores de latón y el termohigrógrafo encima
  rect(292, 110, 319, 146, F.grisD); for (let y = 112; y < 144; y += 5) { rect(293, y, 318, y + 3, F.gris); rect(293, y, 318, y, F.grisL); rect(303, y + 1, 308, y + 2, F.laton); pset(303, y + 1, F.latonL); }
  rect(294, 98, 314, 109, F.grisD); rect(295, 99, 313, 108, hex('#5a6a7a')); rect(296, 100, 306, 107, hex('#e8e4d8')); for (let x = 297; x < 306; x += 3) linea(x, 100, x, 107, hex('#c4b8a8'));
  rect(307, 100, 312, 107, F.cristal); rect(294, 109, 314, 109, F.grisS);
  // la mesa de consulta: tablero de madera, faldón, patas y su sombra
  rect(180, 151, 292, 153, f_mez(F.linoleo, C.k, 0.3));
  rect(180, 127, 292, 131, F.mesaS); rect(180, 127, 292, 128, F.mesaL); for (let i = 0; i < 30; i++) { const x = 181 + Math.floor(h(i, 1, 47) * 104); rect(x, 129, x + 5, 129, F.mesa); }
  rect(182, 132, 290, 136, F.mesaD); rect(182, 132, 290, 132, F.mesaS);
  for (const x of [184, 285]) { rect(x, 137, x + 3, 152, F.mesaD); rect(x, 137, x, 152, F.mesaS); }
  // los guantes blancos de algodón, el lápiz (aquí solo se escribe con lápiz) y la lupa
  for (const gx of [184, 191]) { rect(gx, 123, gx + 5, 126, F.guanteS); rect(gx, 122, gx + 4, 125, F.guante); for (let i = 0; i < 4; i++) pset(gx + i + 1, 121, F.guante); pset(gx + 5, 123, F.guante); }
  linea(186, 120, 197, 117, hex('#e0b030')); pset(197, 117, F.mesaL); pset(198, 117, C.k); pset(185, 120, hex('#e88aa0'));
  anillo(282, 123, 3, C.k); disco(282, 123, 2, F.cristal); pset(281, 122, C.blanco); linea(279, 126, 276, 127, C.k);
  // la vitrina inclinada: peana de madera, el marco, el terciopelo, la carpeta gris abierta y el listado del «Wow!»
  rect(196, 120, 274, 127, F.panelS); rect(197, 120, 273, 121, F.panelL); rect(198, 124, 272, 124, F.panel);
  rect(198, 66, 272, 120, F.panelS); rect(199, 67, 271, 119, F.panel); rect(199, 67, 271, 67, F.panelL);
  rect(202, 70, 268, 117, F.terciopelo); for (let y = 71; y < 117; y += 2) for (let x = 203 + (y % 4 ? 1 : 0); x < 268; x += 4) pset(x, y, F.terciopeloL);
  rect(205, 72, 265, 116, F.grisS); rect(206, 73, 264, 115, F.cajaL); rect(206, 73, 264, 73, C.blanco); rect(234, 73, 235, 115, F.cajaS);
  f_listado(R, 209, 74, { w: 54, hh: 42, col: 1, linea: 0, rodea: 1, wow: 1 });
  for (let y = 70; y < 118; y++) for (const d of [0, 1, 18]) { const x = 214 + d + Math.round((118 - y) * 0.5); if (x < 268) pset(x, y, f_mez(R.pget(x, y), C.blanco, d === 18 ? 0.25 : 0.4)); }
  rect(199, 66, 271, 66, F.panelL); rect(202, 69, 268, 69, F.luzCal);
  // la lámpara verde de banquero (pie y barra de latón, pantalla verde) y su luz sobre la mesa
  rect(273, 125, 291, 127, F.latonS); rect(274, 124, 290, 125, F.laton); rect(274, 124, 290, 124, F.latonL); rect(281, 112, 283, 123, F.laton); rect(281, 112, 281, 123, F.latonL);
  poligono([[272, 113], [292, 113], [289, 105], [275, 105]], F.verdeLamp); linea(275, 105, 289, 105, F.verdeLampL); linea(276, 107, 288, 107, F.verdeLampL); rect(272, 113, 292, 114, F.latonS);
  for (let y = 115; y < 131; y++) for (let x = 266 - (y - 115); x < 298 + (y - 115) * 0.3; x++) if ((x + y) % 2 === 0 && x > 180) pset(x, y, f_mez(R.pget(x, y), F.luzCal, 0.35));
  // los pasillos de estanterías y sus costados numerados
  f_pasillo(R, -26, 20, -6); f_pasillo(R, 38, 82, 60); f_pasillo(R, 100, 144, 122);
  f_costado(R, 20, 38, '36'); f_costado(R, 82, 100, '37'); f_costado(R, 144, 162, '38');
  rect(88, 110, 94, 124, F.rojoCS); rect(89, 111, 93, 123, F.rojoC); rect(89, 111, 89, 123, f_mez(F.rojoC, C.blanco, 0.4)); rect(90, 108, 92, 110, C.k); linea(93, 109, 96, 112, C.k);
  rect(162, 22, 166, 146, F.paredAS); rect(166, 22, 167, 146, f_mez(F.paredAS, C.k, 0.2));
  // el suelo de linóleo en losetas grandes con sus brillos
  for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) { const tx = Math.floor((x + (y - 147) * (x - 160) / 160) / 16), ty = Math.floor((y - 147) / 8), v = h(x >> 1, y, 48);
    pset(x, y, (tx + ty) % 2 ? (v > 0.96 ? F.linoleoD : F.linoleo) : (v > 0.96 ? F.linoleoD : F.linoleoS)); }
  rect(0, 146, 319, 147, F.grisD);
  for (const [cx, w] of [[60, 8], [122, 8], [206, 18], [252, 18]]) for (let y = 149; y < 178; y += 2) for (let x = cx - w + (y % 4 ? 1 : 0); x < cx + w; x += 3) pset(x, y, f_mez(R.pget(x, y), C.blanco, 0.25));
  f_velo(R, 0, 146, 319, 150, C.k, 0.12);
}

// el archivo entero: el fondo fijo y su vida (la archivera que empuja su carrito al fondo del pasillo, el fluorescente
// del pasillo que tiembla, el reloj, la plumilla del termohigrógrafo, el destello que corre por el cristal de la vitrina y
// las motas en la luz de la lámpara)
function f_archivoHist(R, t, o) {
  f_fondo(R, 'archivo', () => f_archivoFondo(R));
  const { rect, pset, linea, disco } = R;
  { const u = (t % 14) / 14, ax = Math.round(108 + u * 28), ay = 103; R.recorte([115, 58, 129, 104]);
    disco(ax, ay - 9, 1, hex('#e0b090')); disco(ax, ay - 10, 1, hex('#6a4a30')); f_rr(R, ax - 1, ay - 7, ax + 1, ay - 3, hex('#7a5aa0')); pset(ax - 1, ay - 2, F.grisD); pset(ax + 1, ay - 2, F.grisD);
    f_rr(R, ax + 3, ay - 6, ax + 9, ay - 2, F.grisS); f_rr(R, ax + 4, ay - 7, ax + 8, ay - 6, F.caja); pset(ax + 4, ay - 1, C.k); pset(ax + 8, ay - 1, C.k); linea(ax + 1, ay - 6, ax + 3, ay - 6, F.grisD); R.recorte(null); }
  if ((t % 4.7) < 0.3 && Math.sin(t * 50) > 0) { R.recorte([40, 22, 81, 60]); for (let y = 23; y < 32; y++) linea(55, y, 65, y, F.grisF); R.recorte(null); }
  // el reloj de pared
  { const cx = 270, cy = 58; disco(cx, cy, 7, F.panelS); disco(cx, cy, 6, C.blanco); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * 0.5236) * 5), Math.round(cy + Math.sin(k * 0.5236) * 5), F.grisS);
    const am = -Math.PI / 2 + t * 0.05, as = -Math.PI / 2 + t * 1.05; linea(cx, cy, Math.round(cx + Math.cos(am) * 4), Math.round(cy + Math.sin(am) * 4), C.k); linea(cx, cy, Math.round(cx + Math.cos(am * 0.3 + 2) * 3), Math.round(cy + Math.sin(am * 0.3 + 2) * 3), C.k); linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), C.rojo); }
  { const y = Math.round(103 + Math.sin(t * 0.8) * 2); linea(297, y, 305, y, F.rojoC); pset(305, y, C.k); }
  { const g = ((t * 0.25) % 1.6) - 0.3; if (g > 0 && g < 1) for (let y = 70; y < 118; y++) { const x = Math.round(200 + g * 80 + (118 - y) * 0.5); if (x > 202 && x < 268) pset(x, y, f_mez(R.pget(x, y), C.blanco, 0.45)); } }
  for (let k = 0; k < 8; k++) { const u = (h(k, 1, 49) + t * 0.03) % 1, x = Math.round(268 + h(k, 2, 49) * 26 + Math.sin(t * 0.7 + k) * 2), y = Math.round(114 + u * 12); if (Math.sin(t * 1.4 + k) > 0) pset(x, y, F.luzCal); }
}

// delante de los personajes en el archivo: el costado de la estantería más cercana, en el borde izquierdo (más oscuro,
// más grande) con su número; no tapa nada a la derecha de x 14
function f_archivoDelante(R, t) {
  const { rect, pset } = R;
  rect(0, 0, 13, 179, F.grisD); rect(0, 0, 12, 179, F.grisS); rect(10, 0, 12, 179, F.grisD); rect(1, 0, 1, 179, F.gris);
  for (let y = 6; y < 170; y += 16) pset(5, y, F.grisD);
  rect(2, 40, 10, 52, F.grisD); rect(3, 41, 9, 51, F.cajaL); f_texto3(R, '35', 3, 44, F.rotulador);
  rect(0, 164, 13, 179, F.grisF); rect(0, 164, 13, 164, F.grisS);
}

// lo fijo del sótano: las viguetas del techo con las tuberías de cobre y de plástico, la pared de bloques de hormigón con
// manchas de humedad y salitre, el ventanuco del patio, las montañas de cajas de listados a la izquierda (algunas abiertas,
// con el papel continuo asomando), los listados apilados en el suelo, la caja de fusibles, la caldera y el calentador a la
// derecha, los dos focos en sus trípodes, la mesa del atril (tablero en perspectiva, faldón y patas) con la peana, la
// columna y el brazo de la cámara, el portátil, y el suelo de hormigón pintado con su cable
function f_sotanoFondo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 0, 319, 23, hex('#4e3e30')); for (let x = 2; x < 320; x += 18) { rect(x, 0, x + 4, 23, x > 170 ? F.joist : hex('#56442f')); if (x > 170) rect(x, 0, x, 23, F.joistL); } f_motas(R, 0, 0, 319, 23, 100, hex('#3e3024'), 61);
  // la pared de bloques de hormigón con su humedad
  for (let y = 24, f = 0; y < 131; y += 8, f++) for (let x = -(f % 2) * 8; x < 320; x += 16) { const v = h(x, y, 62), c = v < 0.3 ? F.cementoS : v > 0.9 ? F.cementoL : F.cemento;
    rect(x, y, x + 15, y + 7, F.cementoS); rect(x + 1, y + 1, x + 15, y + 7, c); rect(x + 1, y + 1, x + 15, y + 1, f_mez(c, C.blanco, 0.12)); for (let i = 0; i < 4; i++) pset(x + 2 + Math.floor(h(x, y, i + 63) * 12), y + 2 + Math.floor(h(y, x, i + 67) * 5), F.cementoS); }
  for (const [mx, w, l] of [[30, 14, 40], [150, 10, 30], [205, 16, 50]]) for (let x = mx - w; x < mx + w; x++) { const len = Math.round(l * (1 - Math.abs(x - mx) / w) * (0.6 + h(x, 1, 64) * 0.4)); for (let y = 26; y < 26 + len; y++) if ((x + y) % 2 === 0) pset(x, y, f_mez(R.pget(x, y), F.mancha, 0.45)); }
  for (let x = 0; x < 320; x++) if (h(x, 3, 65) > 0.8) pset(x, 128 + Math.floor(h(x, 4, 65) * 3), f_mez(F.cementoL, C.blanco, 0.2));
  // las tuberías bajo el techo: cobre y desagüe de plástico, con sus abrazaderas
  rect(0, 24, 262, 26, F.tuboCu); rect(0, 24, 262, 24, F.tuboCuL); for (let x = 20; x < 262; x += 40) rect(x, 23, x + 1, 27, F.grisD);
  rect(176, 28, 262, 31, F.pvcS); rect(176, 28, 262, 29, F.pvc); for (let x = 190; x < 262; x += 30) rect(x, 27, x + 1, 32, F.grisD);
  // el ventanuco al patio (lo de fuera lo pone cada fotograma)
  rect(118, 30, 168, 48, F.cementoS); rect(120, 32, 166, 46, hex('#6a7e5a')); rect(142, 32, 143, 46, F.cementoS);
  // la caja de fusibles con su tubo
  rect(196, 40, 214, 62, F.grisD); rect(197, 41, 213, 61, F.gris); rect(197, 41, 213, 41, F.grisL); rect(211, 50, 212, 53, F.grisS); rect(204, 33, 206, 40, F.grisS);
  // las montañas de cajas de listados a la izquierda
  const cols = [[2, 6], [26, 7], [50, 5], [74, 6], [96, 3]];
  for (const [cx, n] of cols) for (let i = 0; i < n; i++) { const y1 = 130 - i * 14, x = cx + Math.round((h(cx, i, 66) - 0.5) * 3), blanca = h(cx, i, 67) > 0.5;
    f_caja(R, x, y1 - 13, x + 22, y1, cx + i * 5, { c: blanca ? [hex('#e8e4d8'), hex('#c4c0b4'), C.blanco, hex('#8a867c')] : [F.carton, F.cartonS, F.cartonL, F.cartonD], cinta: false, asas: true, etiqueta: h(cx, i, 68) > 0.4 });
    if (i === n - 1 && h(cx, i, 69) > 0.3) { for (let k = 0; k < 4; k++) { const yy = y1 - 15 - k * 2; rect(x + 3, yy, x + 19, yy + 1, k % 2 ? C.papel : C.banda); pset(x + 3, yy, C.papelS); } } }
  for (const [x, n] of [[12, 9], [38, 6], [118, 5]]) for (let k = 0; k < n; k++) { const y = 130 - k * 2; rect(x, y - 1, x + 20, y, (k >> 1) % 2 ? C.banda : C.papel); pset(x, y, C.papelS); pset(x + 20, y - 1, C.papelS); }
  // la caldera (con su ventanilla de la llama, que pone cada fotograma) y el calentador de agua
  rect(258, 56, 298, 130, F.calderaS); rect(259, 57, 297, 129, F.caldera); rect(259, 57, 297, 58, F.calderaL); for (let y = 66; y < 128; y += 20) rect(260, y, 296, y, F.calderaS);
  rect(266, 38, 276, 56, F.grisS); rect(266, 38, 267, 56, F.grisL); rect(262, 30, 280, 38, F.grisS); rect(262, 30, 280, 31, F.grisL);
  for (let y = 70; y < 80; y += 2) rect(264, y, 292, y, F.calderaS); rect(276, 104, 286, 112, C.k);
  rect(300, 74, 318, 130, F.grisD); rect(301, 75, 317, 129, hex('#c8c4b4')); rect(301, 75, 303, 129, hex('#e4e0d0')); rect(314, 75, 317, 129, hex('#9a968a')); rect(300, 74, 318, 77, F.grisS);
  rect(306, 60, 309, 74, F.tuboCu); rect(298, 60, 309, 62, F.tuboCu); rect(306, 112, 312, 118, F.rojoC);
  // los focos en sus trípodes, detrás de la mesa
  for (const [x, dir] of [[156, 1], [236, -1]]) { linea(x, 96, x, 134, F.grisD); linea(x, 134, x - 6, 140, F.grisD); linea(x, 134, x + 6, 140, F.grisD);
    poligono([[x - 5 * dir, 88], [x + 6 * dir, 92], [x + 4 * dir, 100], [x - 6 * dir, 96]], F.grisD); poligono([[x - 4 * dir, 89], [x + 5 * dir, 93], [x + 3 * dir, 99], [x - 5 * dir, 95]], F.foco); }
  for (let y = 96; y < 136; y++) for (let x = 150; x < 246; x++) { const a = Math.max(0, 1 - Math.abs(x - 190) / (20 + (y - 96) * 0.8)); if (a > 0 && (x + y) % 2 === 0) pset(x, y, f_mez(R.pget(x, y), F.foco, a * 0.3)); }
  // el suelo de hormigón pintado de gris, con grietas, el sumidero y la sombra del fondo
  for (let y = 131; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 70); pset(x, y, v < 0.08 ? F.cementoS : v > 0.95 ? F.cementoL : hex('#9a9a96')); }
  rect(0, 131, 319, 132, F.cementoS); f_velo(R, 0, 133, 319, 140, C.k, 0.1);
  { let x = 230, y = 168; for (let i = 0; i < 24; i++) { pset(x, y, F.cementoS); x += 1; y += h(i, 1, 71) > 0.6 ? 1 : h(i, 1, 71) < 0.2 ? -1 : 0; } }
  disco(280, 170, 4, F.cementoS); disco(280, 170, 3, F.grisD); for (let i = -2; i <= 2; i += 2) linea(277, 170 + i, 283, 170 + i, F.grisS);
  // la mesa del atril: tablero en perspectiva, faldón, patas y su sombra
  rect(138, 156, 252, 159, f_mez(hex('#9a9a96'), C.k, 0.3));
  poligono([[142, 136], [246, 136], [250, 145], [138, 145]], F.mesa); rect(140, 136, 248, 136, F.mesaS); rect(138, 145, 250, 145, F.mesaL); for (let i = 0; i < 24; i++) { const y = 137 + Math.floor(h(i, 1, 72) * 7), x = 142 + Math.floor(h(i, 2, 72) * 100); rect(x, y, x + 6, y, F.mesaS); }
  rect(138, 146, 250, 149, F.mesaD); rect(138, 146, 250, 146, F.mesaS);
  for (const x of [139, 246]) { rect(x, 150, x + 3, 158, F.mesaD); rect(x, 150, x, 158, F.mesaS); }
  // la peana del atril con su columna, el brazo y la cámara que mira abajo; el cable hasta el disparador
  poligono([[170, 137], [212, 137], [214, 143], [168, 143]], F.cuerpoCam); linea(168, 143, 214, 143, F.cuerpoCamL);
  rect(206, 84, 209, 138, F.grisD); rect(206, 84, 206, 138, F.grisL); rect(184, 86, 210, 89, F.grisD); rect(184, 86, 210, 86, F.grisL); disco(212, 88, 2, F.grisS);
  rect(180, 90, 198, 101, F.cuerpoCam); rect(181, 91, 197, 92, F.cuerpoCamL); rect(194, 88, 197, 90, F.cuerpoCam); rect(185, 102, 193, 108, F.grisD); rect(186, 102, 192, 107, F.cuerpoCamL); rect(185, 105, 193, 105, C.k); pset(196, 94, F.rojoC);
  for (let i = 0; i <= 80; i++) { const u = i / 80; pset(Math.round(180 - u * 38 + Math.sin(u * 9) * 2), Math.round(96 + u * 48 + Math.sin(u * 3) * 4), hex('#2a2a30')); }
  // el portátil abierto sobre la mesa (la foto la pone cada fotograma)
  rect(226, 120, 246, 135, F.grisD); rect(227, 121, 245, 134, C.k); poligono([[224, 136], [248, 136], [250, 140], [222, 140]], F.grisS); linea(224, 136, 248, 136, F.grisL);
}

// la pila de páginas del listado en la mesa: n hojas de papel continuo (alto 2n) apiladas en (x, yBase), con sus bandas
function f_pila(R, x, yb, n, w = 18) {
  for (let k = 0; k < n; k++) { const y = yb - k * 2, dx = Math.round(Math.sin(k * 1.7) * 1); R.rect(x + dx, y - 1, x + dx + w, y, (k >> 1) % 2 ? C.banda : C.papel); R.pset(x + dx, y, C.papelS); R.pset(x + dx + w, y - 1, C.papelS); }
  R.rect(x, yb + 1, x + w, yb + 1, F.mesaS);
}

// el sótano entero: fondo fijo, lo de fuera del ventanuco (hierba que se mueve y unos pies que pasan), la llama azul de
// la caldera, la bombilla desnuda que se balancea en su cadena, las dos pilas de páginas (o.u 0–1: la de por hacer mengua,
// la de hechas crece), la página bajo la cámara, la foto del portátil y el destello del flash (o.flash 0–1)
function f_sotano(R, t, o) {
  f_fondo(R, 'sotano', () => f_sotanoFondo(R));
  const { rect, pset, linea, disco } = R, u = Math.max(0, Math.min(1, o.u ?? 0.5)), fl = Math.max(0, Math.min(1, o.flash ?? 0));
  R.recorte([120, 32, 166, 46]);
  f_rr(R, 120, 32, 166, 37, hex('#9ac4e0')); f_rr(R, 120, 38, 166, 46, hex('#5a4a3a'));
  for (let x = 120; x <= 166; x++) { const s = Math.round(Math.sin(t * 2 + x * 0.6) * 1); linea(x, 38, x + s, 33 + Math.floor(h(x, 1, 73) * 4), x % 3 ? F.cesped : F.cespedL); }
  { const v = ((t + 1) % 9) / 9, px = Math.round(110 + v * 70); if (v < 0.9) { const p = Math.floor(t * 6) % 2; f_rr(R, px, 33 + p, px + 4, 36 + p, hex('#3a4a6a')); f_rr(R, px - 1, 37, px + 5, 38, hex('#2a2a30')); f_rr(R, px + 6, 34 - p, px + 10, 36, hex('#3a4a6a')); f_rr(R, px + 5, 37, px + 11, 38, hex('#2a2a30')); } }
  R.recorte(null);
  rect(118, 30, 168, 31, F.cementoL); rect(119, 33, 166, 33, f_mez(hex('#9ac4e0'), C.blanco, 0.5));
  { const f = 0.6 + 0.4 * Math.sin(t * 13) * Math.sin(t * 7); rect(277, 105, 285, 111, hex('#1a1a28')); for (let k = 0; k < 5; k++) { const hh = Math.round(2 + f * 3 * h(k, Math.floor(t * 8), 74)); rect(278 + k * 2, 111 - hh, 278 + k * 2, 111, k % 2 ? F.llamaA : hex('#9ac0ff')); } }
  { const a = Math.sin(t * 1.4) * 0.12, bx = Math.round(244 + Math.sin(a) * 18), by = Math.round(22 + Math.cos(a) * 18); linea(244, 4, bx, by - 3, F.grisD);
    disco(bx, by, 3, F.foco); pset(bx - 1, by - 1, C.blanco); rect(bx - 1, by - 4, bx + 1, by - 3, F.grisS); linea(bx + 2, by, bx + 3, by + 8, F.latonS);
    for (let k = 0; k < 18; k++) { const an = k * 0.35, r = 5 + (k % 3); pset(Math.round(bx + Math.cos(an) * r), Math.round(by + Math.sin(an) * r), f_mez(R.pget(Math.round(bx + Math.cos(an) * r), Math.round(by + Math.sin(an) * r)), F.foco, 0.4)); } }
  f_pila(R, 144, 142, Math.round(1 + 9 * (1 - u))); f_pila(R, 214, 142, Math.round(1 + 9 * u), 10);
  // la página bajo la cámara (en perspectiva, con sus bandas) y, a su lado, la que acaba de pasar
  { const pass = (t % 1.6) / 1.6; R.poligono([[176, 138], [204, 138], [206, 142], [174, 142]], C.papel); for (let k = 0; k < 3; k++) linea(176 - k, 139 + k, 204 + k, 139 + k, k % 2 ? C.papel : C.banda); pset(185, 140, C.rojo); pset(186, 139, C.rojo); pset(187, 140, C.rojo); }
  // la foto en el portátil: la última página hecha, con su círculo rojo; cambia con cada página
  { const n = Math.floor(u * 40); rect(228, 122, 244, 133, n % 2 ? hex('#e8e2d0') : hex('#e2dccc')); for (let y = 123; y < 133; y += 3) rect(229, y, 243, y, C.banda); for (let k = 0; k < 10; k++) pset(230 + Math.floor(h(k, n, 75) * 13), 123 + Math.floor(h(n, k, 75) * 10), F.tinta); R.anillo(236, 127, 2, C.rojo); }
  if (fl > 0) { f_velo(R, 120, 60, 260, 150, C.blanco, fl * 0.35, 2); disco(189, 109, Math.round(2 + fl * 4), C.blanco); for (let k = 0; k < 8; k++) { const an = k * 0.785; linea(189, 109, Math.round(189 + Math.cos(an) * (6 + fl * 8)), Math.round(109 + Math.sin(an) * (6 + fl * 8)), f_mez(F.foco, C.blanco, fl)); } }
  else if (Math.floor(t * 2) % 2) pset(196, 94, hex('#ff6a5a'));
}

// delante de los personajes en el sótano: un montón de cajas de listados en el primer término, en la esquina de abajo a
// la izquierda (x 0–34), con una tira de papel continuo que cuelga y se mueve con la corriente
function f_sotanoDelante(R, t) {
  f_caja(R, -4, 150, 30, 179, 91, { c: [hex('#e8e4d8'), hex('#c4c0b4'), C.blanco, hex('#6a665c')], cinta: false, asas: true, etiqueta: true });
  f_caja(R, 0, 132, 26, 150, 92, { cinta: false, asas: true, numero: '79' });
  for (let k = 0; k < 14; k++) { const x = Math.round(26 + k * 0.4 + Math.sin(t * 1.5 + k * 0.4) * (k * 0.25)), y = 134 + k * 2; R.rect(x, y, x + 5, y + 1, (k >> 1) % 2 ? C.banda : C.papel); R.pset(x + 5, y, C.papelS); }
}

// la curva canónica de la señal como escalones: las seis lecturas de 12 s (6, E=14, Q=26, U=30, J=19, 5), de 0 a 1
const f_CURVA = [6, 14, 26, 30, 19, 5].map((v) => v / 30);

// una palmera que se mece (tronco curvo anillado y siete pencas con su luz), respeta R.recorte
function f_palmera(R, x, suelo, alto, t, k = 0) {
  const m = Math.sin(t * 1.1 + k) * 1.6;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + Math.sin(u * 1.6) * 4 + m * u * u); R.pset(px, suelo - j, j % 3 ? F.corteza : F.cortezaS); R.pset(px + 1, suelo - j, F.cortezaS); }
  const tx = Math.round(x + Math.sin(1.6) * 4 + m), ty = suelo - alto;
  for (let f = 0; f < 7; f++) { const a = -Math.PI + f * Math.PI / 6 + Math.sin(t * 1.8 + f + k) * 0.12; for (let d = 1; d < 12; d++) { const px = Math.round(tx + Math.cos(a) * d), py = Math.round(ty + Math.sin(a) * d * 0.55 + d * d / 16); R.pset(px, py, d > 8 ? F.palmaS : F.palma); if (d % 2) R.pset(px, py + 1, F.palmaL); } }
  R.disco(tx, ty + 1, 1, F.cortezaS);
}

// lo de fuera de la ventana del laboratorio (x0–x1, y0–y1, recortado): cielo tramado del Caribe, nubes de tres tonos a
// tres velocidades, dos sierras verdes, los tejados del campus, tres palmeras que se mecen y un par de pájaros
function f_fueraPR(R, t, x0, y0, x1, y1) {
  const { pset, linea } = R; R.recorte([x0, y0, x1, y1]);
  const cols = [F.cieloP0, F.cieloP1, F.cieloP2];
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0) * 2.2, i = Math.min(1, Math.floor(u)), f = Math.min(1, u - i); for (let x = x0; x <= x1; x++) pset(x, y, f_bayer(x, y) < f ? cols[i + 1] : cols[i]); }
  for (const [b, v, y, w] of [[0, 1, y0 + 8, 18], [50, 1.8, y0 + 16, 12], [90, 2.8, y0 + 5, 9]]) f_nube(R, x0 - 20 + ((b + t * v) % (x1 - x0 + 40)), y, w, [hex('#b8cce0'), hex('#e4eef8'), C.blanco]);
  const base = y1 - 22;
  for (let x = x0; x <= x1; x++) { const a = base - Math.round(10 + 8 * Math.sin(x * 0.07 + 1) + 3 * Math.sin(x * 0.23)); linea(x, a, x, y1, h(x, 1, 81) > 0.8 ? F.monte1 : F.monte0); }
  for (let x = x0; x <= x1; x++) { const a = base + 4 - Math.round(5 + 5 * Math.sin(x * 0.11 + 3)); linea(x, a, x, y1, (x + a) % 4 ? F.monte1 : F.monte2); }
  for (let x = x0; x <= x1; x++) if (h(x >> 1, 2, 82) > 0.5) pset(x, base + 4 - Math.round(5 + 5 * Math.sin(x * 0.11 + 3)), F.palmaL);
  f_rr(R, x0, y1 - 9, x0 + 30, y1, hex('#e8dcc0')); f_rr(R, x0, y1 - 11, x0 + 32, y1 - 9, hex('#b8543a')); for (let x = x0 + 3; x < x0 + 28; x += 6) f_rr(R, x, y1 - 6, x + 2, y1 - 3, hex('#5a7a9a'));
  f_rr(R, x0, y1 - 2, x1, y1, F.palmaS);
  f_palmera(R, x0 + 40, y1, 30, t); f_palmera(R, x1 - 14, y1, 38, t, 2); f_palmera(R, x0 + 14, y1, 22, t, 4);
  for (let k = 0; k < 2; k++) { const u = ((t + k * 3) / 10) % 1, bx = Math.round(x0 + u * (x1 - x0)), by = Math.round(y0 + 10 + k * 6 + Math.sin(t * 2 + k) * 2), al = Math.sin(t * 13 + k) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); }
  R.recorte(null);
}

// lo fijo del laboratorio: el techo de placas, la pared amarilla clara, la pizarra blanca con la curva de rotulador, sus
// rayas, los números y el pósit; el marco de la ventana con la persiana subida y su repisa, el tablón de corcho con las
// fotos de los listados, la estantería de archivadores, la mesa (tablero, faldón y cajonera) con el teclado, la taza, las
// fotos impresas y los dos monitores (lo de dentro lo pone cada fotograma), la silla, el ventilador de pie, la planta de
// la ventana y el suelo de terrazo con la mancha de sol
function f_labFondo(R) {
  const { rect, pset, linea, disco, anillo, poligono } = R;
  rect(0, 0, 319, 13, F.paredPL); for (let x = 0; x < 320; x += 30) rect(x, 0, x, 13, f_mez(F.paredPL, F.paredPS, 0.5)); rect(0, 7, 319, 7, f_mez(F.paredPL, F.paredPS, 0.5)); f_motas(R, 0, 0, 319, 13, 70, F.paredPS, 83);
  rect(0, 13, 319, 15, F.paredPS);
  rect(0, 16, 319, 137, F.paredP); f_motas(R, 0, 16, 319, 137, 380, F.paredPS, 84); f_motas(R, 0, 16, 319, 137, 160, F.paredPL, 85);
  rect(0, 134, 319, 137, hex('#8a7a5a')); rect(0, 134, 319, 134, hex('#a8987a'));
  // la pizarra blanca
  rect(14, 28, 106, 94, F.aluMS); rect(15, 29, 105, 93, F.aluM); rect(17, 31, 103, 91, F.pizarra); rect(17, 31, 103, 31, C.blanco); f_motas(R, 18, 32, 102, 90, 70, F.pizarraS, 86);
  linea(24, 82, 70, 82, F.rotuN); linea(24, 82, 24, 40, F.rotuN); for (let i = 0; i < 6; i++) { const x = 28 + i * 7, y = 82 - Math.round(f_CURVA[i] * 36); linea(x, y, x + 6, y, F.rotuR); linea(x, y, x, 82 - (i ? Math.round(f_CURVA[i - 1] * 36) : 0), F.rotuR); pset(x + 3, 84, F.rotuN); }
  linea(70, 82, 70, 81, F.rotuR); f_texto3(R, '72', 60, 86, F.rotuN);
  for (let r = 0; r < 6; r++) { const y = 40 + r * 7, l = 10 + Math.floor(h(r, 1, 87) * 14); for (let i = 0; i < l; i++) pset(76 + i, y + Math.round(Math.sin(i * 1.4 + r) * 1), r % 3 === 2 ? F.rotuR : F.rotuA); }
  f_texto3(R, '1977', 76, 82, F.rotuA); rect(90, 34, 99, 42, hex('#f0e070')); rect(90, 34, 99, 34, hex('#f8f0a0')); for (let y = 37; y < 42; y += 2) linea(92, y, 97, y, hex('#a89a40'));
  rect(20, 93, 100, 96, F.aluMS); rect(20, 93, 100, 93, F.aluM);
  for (const [x, c] of [[30, F.rotuR], [38, F.rotuA], [46, F.rotuN], [54, F.verdeLamp]]) { rect(x, 91, x + 6, 92, c); rect(x + 6, 91, x + 7, 92, C.blanco); } rect(70, 89, 80, 92, hex('#3a3a44')); rect(70, 89, 80, 89, hex('#6a6a74'));
  // la ventana: el marco blanco, la persiana subida arriba con su cordón, la repisa con un cactus
  rect(110, 26, 186, 98, hex('#c8c4b8')); rect(111, 27, 185, 97, C.blanco); rect(147, 27, 149, 97, C.blanco);
  rect(108, 97, 188, 100, hex('#d8d2c2')); rect(108, 97, 188, 97, C.blanco); rect(108, 100, 188, 101, F.paredPS);
  rect(170, 89, 176, 96, F.maceta); rect(170, 89, 176, 89, F.macetaL); rect(172, 82, 174, 88, F.planta); pset(171, 85, F.planta); pset(175, 84, F.planta); pset(173, 82, F.plantaL);
  // el ventilador de pie que gira la cabeza (las aspas las pone cada fotograma)
  rect(28, 112, 30, 136, F.grisD); rect(29, 112, 29, 136, F.grisL); poligono([[20, 138], [38, 138], [34, 135], [24, 135]], F.grisD);
  // el tablón de corcho con fotos de listados clavadas y chinchetas
  rect(248, 50, 298, 92, F.mesaD); rect(250, 52, 296, 90, hex('#c49a64')); f_motas(R, 250, 52, 296, 90, 160, hex('#a87e4a'), 88); f_motas(R, 250, 52, 296, 90, 60, hex('#dcb47c'), 89);
  for (const [x, y, r] of [[253, 55, 1], [270, 58, 0], [284, 54, 1], [256, 72, 0], [276, 74, 1]]) { rect(x + 1, y + 1, x + 13, y + 15, hex('#8a6a40')); rect(x, y, x + 12, y + 14, C.papel); for (let yy = y + 1; yy < y + 14; yy += 4) rect(x, yy, x + 12, yy + 1, C.banda); for (let k = 0; k < 8; k++) pset(x + 2 + Math.floor(h(k, x, 90) * 9), y + 2 + Math.floor(h(y, k, 90) * 11), F.tinta); if (r) anillo(x + 6, y + 8, 3, C.rojo); disco(x + 6, y + 1, 1, [F.rotuR, F.rotuA, F.laton][x % 3]); }
  // la estantería de archivadores a la derecha
  rect(300, 48, 319, 137, F.mesaD); for (const y of [50, 72, 94, 116]) { rect(301, y, 319, y + 20, hex('#5a4630'));
    for (let x = 302, k = 0; x < 318; x += 4, k++) { const c = [F.rotuA, F.verdeLamp, F.rotuR, F.laton, hex('#e8e4d8')][(k + y) % 5]; rect(x, y + 3 + (k % 2), x + 3, y + 19, c); rect(x, y + 3 + (k % 2), x, y + 19, f_mez(c, C.blanco, 0.3)); rect(x + 1, y + 12, x + 2, y + 13, C.blanco); } rect(301, y + 20, 319, y + 21, F.mesaS); }
  // la mesa con su cajonera, los monitores (marcos), el teclado, el ratón, las fotos impresas y la taza
  rect(186, 148, 298, 150, f_mez(F.terrazo, C.k, 0.3));
  rect(186, 127, 298, 131, F.mesaS); rect(186, 127, 298, 128, F.mesaL); for (let i = 0; i < 20; i++) { const x = 188 + Math.floor(h(i, 1, 91) * 104); rect(x, 129, x + 5, 129, F.mesa); }
  rect(188, 132, 296, 136, F.mesaD); rect(190, 137, 193, 149, F.mesaD); rect(262, 132, 296, 149, F.mesaS); for (const y of [134, 140, 146]) { rect(263, y, 295, y + 4, F.mesa); rect(263, y, 295, y, F.mesaL); rect(276, y + 2, 282, y + 2, F.grisS); }
  rect(198, 84, 264, 123, hex('#1e2228')); rect(199, 85, 263, 122, hex('#2e333a')); rect(199, 85, 263, 85, hex('#4a5058')); rect(226, 123, 236, 126, hex('#2e333a')); rect(220, 126, 242, 127, hex('#1e2228')); pset(231, 121, F.verdeLampL);
  rect(266, 96, 298, 122, hex('#1e2228')); rect(267, 97, 297, 121, hex('#2e333a')); rect(280, 122, 284, 126, hex('#2e333a')); rect(276, 126, 288, 127, hex('#1e2228'));
  rect(212, 124, 240, 126, hex('#c8ccd0')); rect(212, 124, 240, 124, C.blanco); for (let x = 213; x < 240; x += 2) pset(x, 125, hex('#8a9096'));
  rect(246, 124, 249, 126, hex('#c8ccd0')); pset(247, 124, C.blanco);
  for (let k = 0; k < 4; k++) { rect(188 + k, 122 - k * 2, 200 + k, 126 - k * 2, k % 2 ? hex('#e2dccc') : C.papel); rect(188 + k, 123 - k * 2, 200 + k, 123 - k * 2, C.banda); }
  rect(202, 119, 207, 126, hex('#f0f0ec')); rect(202, 119, 207, 119, C.blanco); rect(207, 121, 209, 124, hex('#d0d0cc')); rect(203, 121, 206, 123, F.rotuR);
  // la silla de oficina girada hacia la ventana
  rect(266, 138, 292, 141, hex('#2a3a5a')); rect(266, 138, 292, 138, hex('#4a5a7a')); rect(286, 118, 292, 138, hex('#2a3a5a')); rect(286, 118, 287, 138, hex('#4a5a7a')); rect(277, 142, 279, 150, F.grisD); rect(268, 150, 290, 151, F.grisD); for (const x of [268, 279, 290]) disco(x, 153, 1, C.k);
  // la planta de la ventana en su maceta
  rect(98, 124, 112, 137, F.macetaS); rect(99, 124, 111, 136, F.maceta); rect(99, 124, 111, 125, F.macetaL);
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.35, l = 14 + (k % 3) * 4; for (let d = 0; d < l; d++) { const px = Math.round(105 + Math.cos(a) * d * 0.8), py = Math.round(124 + Math.sin(a) * d); pset(px, py, d > l - 4 ? F.plantaL : F.planta); pset(px + 1, py, F.plantaS); } }
  // el suelo de terrazo: losas con sus juntas, las piedrecitas de colores y la mancha de sol de la ventana
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 92); pset(x, y, v > 0.97 ? F.terrazoM : v > 0.93 ? F.terrazoS : v > 0.915 ? F.terrazoR : F.terrazo); }
  for (let y = 146; y < 180; y += 14) rect(0, y, 319, y, F.terrazoS); for (let xs = -160; xs <= 480; xs += 48) for (let y = 138; y < 180; y++) pset(Math.round(160 + (xs - 160) * (y - 60) / 120), y, F.terrazoS);
  rect(0, 138, 319, 139, f_mez(F.terrazo, C.k, 0.2));
  for (let y = 142; y < 176; y++) { const u = (y - 142) / 34, xl = Math.round(124 + u * 30), xr = Math.round(190 + u * 46); f_velo(R, xl, y, xr, y, hex('#fff4d0'), 0.3); }
  // la alfombra tejida bajo los personajes (franjas, cenefa y flecos) y la caja de listados en el suelo junto a la mesa
  for (let j = -9; j <= 9; j++) for (let i = -52; i <= 52; i++) { const e = (i * i) / 2704 + (j * j) / 81; if (e > 1) continue; const x = 100 + i, y = 166 + j, b = e > 0.8 ? 0 : e > 0.6 ? 1 : (Math.abs(j) + (i >> 2)) % 3;
    pset(x, y, [hex('#8a3a2a'), hex('#e0c890'), hex('#3a6a7a'), hex('#c87a3a')][b === 0 ? 0 : b === 1 ? 1 : (j + 20) % 2 ? 2 : 3]); }
  for (const s of [-1, 1]) for (let j = -6; j <= 6; j += 2) pset(100 + s * 53, 166 + j, hex('#e0c890'));
  f_caja(R, 196, 136, 224, 152, 108, { c: [hex('#e8e4d8'), hex('#c4c0b4'), C.blanco, hex('#8a867c')], cinta: false, asas: true, etiqueta: true });
  for (let k = 0; k < 4; k++) rect(199, 132 - k * 2 + 2, 220, 133 - k * 2 + 2, k % 2 ? C.banda : C.papel);
}

// la pantalla grande del laboratorio (dentro de x 200–262, y 86–121): a la izquierda, la ventana de la foto del
// listado (barra de título con sus tres botones; el canon, piezaListado a s 1, con el «Wow!» y el círculo rojo
// centrados y la franja del escáner que baja) y, a la derecha, el panel de la gráfica con su rejilla, la curva verde
// que se dibuja escalón a escalón y su punto de luz; en la pequeña (x 267–297, y 97–121), las miniaturas de las
// páginas que pasan, una resaltada con su circulito, y la barra de progreso; el cursor que parpadea y el reflejo
function f_labPantallas(R, t) {
  const { rect, pset, linea } = R;
  rect(200, 86, 262, 121, F.pant);
  rect(200, 86, 241, 88, F.ui); for (let i = 0; i < 3; i++) pset(202 + i * 2, 87, [F.rotuR, F.laton, F.verdeLampL][i]); rect(232, 87, 239, 87, F.uiL);
  piezaListado(R, 194, 86, { s: 1, w: 150, hh: 40, col: 1, linea: 0, rodea: 1, wow: 1, recorte: [201, 89, 240, 120], sombra: false });
  b_foto(R, 201, 89, 240, 120, t);
  rect(242, 86, 262, 121, F.ui); rect(242, 86, 262, 88, F.uiS); pset(260, 87, F.uiL);
  for (let y = 92; y < 117; y += 6) for (let x = 244; x < 261; x += 2) pset(x, y, F.uiS);
  linea(244, 117, 260, 117, F.uiL); linea(244, 92, 244, 117, F.uiL);
  const n = Math.floor(t * 0.8) % 7, k6 = Math.min(6, n + 1);
  for (let i = 0; i < k6; i++) { const x = 245 + i * 3, y = 117 - Math.round(f_CURVA[i] * 24); linea(x, y, x + 2, y, C.fosforo); linea(x, y, x, 116, f_mez(C.fosforo, F.ui, 0.6)); if (i === k6 - 1 && Math.sin(t * 8) > -0.2) { pset(x + 2, y - 1, F.fosfL); pset(x + 3, y, F.fosfL); } }
  rect(267, 97, 297, 121, F.pant); const sel = Math.floor(t * 1.3) % 6;
  for (let k = 0; k < 6; k++) { const x = 269 + (k % 3) * 9, y = 99 + Math.floor(k / 3) * 10; rect(x, y, x + 7, y + 8, k === sel ? C.fosforo : F.uiS); rect(x + 1, y + 1, x + 6, y + 7, F.papelF); for (let yy = y + 2; yy < y + 7; yy += 3) rect(x + 1, yy, x + 6, yy, F.bandaF);
    for (let yy = y + 2; yy < y + 7; yy += 2) { pset(x + 2, yy, F.tintaF); if (h(k, yy, 69) > 0.5) pset(x + 4 + (yy & 1), yy, F.tintaF); } if (k === sel) { pset(x + 1, y + 2, C.rojo); pset(x + 1, y + 6, C.rojo); pset(x + 3, y + 2, C.rojo); pset(x + 3, y + 6, C.rojo); } }
  rect(269, 119, 295, 119, F.uiS); rect(269, 119, 269 + Math.round(((t * 0.35) % 1) * 26), 119, C.fosforo);
  if (Math.floor(t * 2) % 2) rect(241, 113, 241, 116, C.blanco);
  for (let i = 0; i < 10; i++) pset(204 + i * 2, 89 + i * 3, f_mez(R.pget(204 + i * 2, 89 + i * 3), C.blanco, 0.25));
  for (let i = 0; i < 6; i++) pset(270 + i * 2, 98 + i * 3, f_mez(R.pget(270 + i * 2, 98 + i * 3), C.blanco, 0.2));
}
// el laboratorio entero: el fondo fijo, lo de fuera, el ventilador del techo y el de pie, las pantallas, el vapor de la
// taza, el cordón de la persiana y la lagartija (un anolis) de la repisa que infla su papada
function f_labPR(R, t, o) {
  f_fondo(R, 'lab', () => f_labFondo(R));
  const { rect, pset, linea, disco, anillo } = R;
  f_fueraPR(R, t, 112, 28, 184, 96);
  rect(111, 27, 185, 27, C.blanco); rect(147, 27, 149, 96, C.blanco); rect(111, 28, 185, 37, hex('#e8e4d8')); for (let y = 29; y < 37; y += 2) rect(111, y, 185, y, hex('#c8c4b8')); rect(111, 37, 185, 38, hex('#a8a498'));
  { const s = Math.round(Math.sin(t * 1.1) * 1.5); linea(180, 38, 180 + s, 58, hex('#8a867a')); rect(179 + s, 58, 181 + s, 61, hex('#a8a498')); }
  { const g = Math.sin(t * 3) > 0.2 ? 1 : 0, lx = Math.round(126 + Math.sin(t * 0.25) * 8); rect(lx, 95, lx + 6, 96, F.verdeLamp); pset(lx + 7, 95, F.verdeLamp); pset(lx + 6, 94, C.k); linea(lx - 1, 96, lx - 5, 95, F.verdeLamp); pset(lx + 1, 97, F.verdeLamp); pset(lx + 5, 97, F.verdeLamp); if (g) { rect(lx + 4, 97, lx + 5, 98, hex('#e85a3a')); } }
  // el ventilador del techo: la barra, el motor y cuatro aspas que giran (vistas un poco desde abajo)
  rect(225, 0, 226, 6, F.grisD); disco(225, 8, 3, F.grisD); rect(222, 7, 228, 9, F.grisS);
  for (let k = 0; k < 4; k++) { const a = t * 7 + k * Math.PI / 2, ex = Math.round(225 + Math.cos(a) * 22), ey = Math.round(9 + Math.sin(a) * 3); linea(225, 9, ex, ey, F.mesaD); linea(225, 10, ex, ey + 1, F.mesaS); }
  // el ventilador de pie: la cabeza oscila, rejilla y aspas que giran
  { const cx = 29 + Math.round(Math.sin(t * 0.6) * 2), cy = 104; disco(cx, cy, 9, F.grisD); disco(cx, cy, 8, hex('#d8dce0')); for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.09; for (let d = 1; d < 7; d++) { pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), F.rotuA); pset(Math.round(cx + Math.cos(a + 0.3) * d), Math.round(cy + Math.sin(a + 0.3) * d), F.rotuA); } }
    anillo(cx, cy, 8, F.grisS); anillo(cx, cy, 5, F.grisS); linea(cx - 8, cy, cx + 8, cy, F.grisS); linea(cx, cy - 8, cx, cy + 8, F.grisS); disco(cx, cy, 1, F.grisD); rect(28, 112, 30, 114, F.grisD); }
  f_labPantallas(R, t);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); pset(Math.round(204 + Math.sin(u * 7 + k) * 1.5), Math.round(117 - u * 10), f_mez(C.blanco, F.paredP, u)); }
}

// la planta grande del primer término (una costilla de Adán en su maceta), abajo a la izquierda (x 0–30): sus hojas
// se mecen con el aire del ventilador; va delante de los personajes
function f_plantaGrande(R, t, x0 = 0, yb = 180) {
  const { rect, pset, disco, poligono } = R;
  rect(x0, yb - 16, x0 + 22, yb, F.macetaS); rect(x0 + 1, yb - 16, x0 + 21, yb, F.maceta); rect(x0 + 1, yb - 16, x0 + 21, yb - 14, F.macetaL);
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.45 + Math.sin(t * 1.6 + k) * 0.06, l = 18 + (k % 2) * 8, ex = Math.round(x0 + 11 + Math.cos(a) * l), ey = Math.round(yb - 16 + Math.sin(a) * l);
    R.linea(x0 + 11, yb - 16, ex, ey, F.plantaS);
    for (let s = 0; s <= 12; s++) { const w = Math.round(Math.sin(s / 12 * Math.PI) * 5), px = Math.round(ex + Math.cos(a) * s), py = Math.round(ey + Math.sin(a) * s), nx = -Math.sin(a), ny = Math.cos(a);
      for (let q = -w; q <= w; q++) { if (s % 3 === 0 && Math.abs(q) > 1 && Math.abs(q) < w) continue; pset(Math.round(px + nx * q), Math.round(py + ny * q), Math.abs(q) === w ? F.plantaS : q < 0 ? F.plantaL : F.planta); } } }
}

// lo fijo: la pared, el monitor con su marco, el pie y el pósit con un número, la mesa con vetas, el teclado (teclas sin
// letras), el ratón, la pila de listados a la izquierda, la maceta y el bote de bolígrafos a la derecha
function f_pantallaFondo(R) {
  const { rect, pset, linea, disco } = R;
  rect(0, 0, 319, 179, F.paredP); f_motas(R, 0, 0, 319, 179, 500, F.paredPS, 93); f_motas(R, 0, 0, 319, 179, 200, F.paredPL, 94);
  rect(0, 150, 319, 179, F.mesaS); rect(0, 150, 319, 151, F.mesaL); for (let i = 0; i < 70; i++) { const y = 153 + Math.floor(h(i, 1, 95) * 26), x = Math.floor(h(i, 2, 95) * 320); rect(x, y, x + 6 + Math.floor(h(i, 3, 95) * 10), y, h(i, 4, 95) > 0.5 ? F.mesa : F.mesaD); }
  rect(124, 146, 156, 154, hex('#1e2228')); rect(112, 154, 168, 157, hex('#1e2228')); rect(113, 154, 167, 154, hex('#4a5058'));
  rect(8, 20, 272, 148, hex('#16191e')); rect(9, 21, 271, 147, hex('#2a2e36')); rect(9, 21, 271, 22, hex('#4a5058')); rect(9, 144, 271, 147, hex('#22262c')); disco(140, 145, 1, F.verdeLampL);
  rect(250, 134, 266, 146, hex('#f0e070')); rect(250, 134, 266, 135, hex('#f8f0a0')); f_texto3(R, '50', 254, 138, hex('#6a5a20'));
  rect(70, 161, 196, 174, hex('#b8bcc2')); rect(70, 161, 196, 161, C.blanco); for (let y = 163; y < 173; y += 3) for (let x = 72; x < 194; x += 5) { rect(x, y, x + 3, y + 1, hex('#e8eaec')); pset(x + 3, y + 1, hex('#8a9096')); } rect(100, 172, 160, 173, hex('#e8eaec'));
  rect(208, 164, 218, 174, hex('#c8ccd0')); rect(208, 164, 218, 164, C.blanco); linea(213, 164, 213, 168, hex('#8a9096')); linea(213, 164, 222, 156, hex('#4a5058'));
  for (let k = 0; k < 14; k++) { const y = 178 - k * 3, x = 2 + Math.round(Math.sin(k) * 1); rect(x, y - 2, x + 46, y, (k >> 1) % 2 ? C.banda : C.papel); pset(x, y, C.papelS); pset(x + 46, y - 2, C.papelS); }
  rect(282, 140, 300, 160, F.macetaS); rect(283, 140, 299, 159, F.maceta); rect(283, 140, 299, 142, F.macetaL);
  rect(304, 144, 316, 160, hex('#3a3a44')); rect(305, 144, 315, 145, hex('#5a5a64')); for (const [x, c] of [[306, F.rotuR], [309, F.rotuA], [312, F.rotuN]]) rect(x, 132, x + 1, 143, c);
}

// la consola de 1977 de imitación (ventana x0, y0, de 58 × 76): filas de luces que parpadean y, debajo, las líneas de
// código como rayas que se escriben solas (codigo 0–1) con su cursor
function f_consola(R, t, x0, y0, codigo) {
  const { rect, pset } = R;
  rect(x0, y0, x0 + 58, y0 + 76, hex('#3a4a5a')); rect(x0, y0, x0 + 58, y0 + 4, F.uiL); for (let i = 0; i < 3; i++) rect(x0 + 2 + i * 4, y0 + 1, x0 + 3 + i * 4, y0 + 2, [F.rotuR, F.laton, F.verdeLampL][i]);
  rect(x0 + 2, y0 + 6, x0 + 56, y0 + 34, hex('#5a6a7a')); rect(x0 + 2, y0 + 6, x0 + 56, y0 + 6, hex('#8a9aaa'));
  const paso = Math.floor(t * 7);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 12; c++) { const x = x0 + 5 + c * 4, y = y0 + 9 + r * 5, on = h(r * 13 + c, paso + r, 96) > 0.5; rect(x, y, x + 1, y + 1, on ? (r === 4 ? F.rotuR : r % 2 ? F.latonL : C.blanco) : hex('#2a3440')); }
  rect(x0 + 2, y0 + 36, x0 + 56, y0 + 74, hex('#0a1410'));
  const n = Math.floor(codigo * 9), f = codigo * 9 - n;
  for (let i = 0; i < Math.min(9, n + 1); i++) { const y = y0 + 38 + i * 4, ind = Math.floor(h(i, 1, 97) * 3) * 3, l = Math.round((10 + h(i, 2, 97) * 30) * (i === n ? f : 1));
    for (let x = 0; x < l; x++) if (h(i, x >> 2, 98) > 0.2 || x % 4 !== 3) pset(x0 + 5 + ind + x, y, x < 4 ? C.ambar : C.fosforo);
    if (i === n && Math.floor(t * 3) % 2) rect(x0 + 6 + ind + l, y - 1, x0 + 7 + ind + l, y + 1, F.fosfL); }
}

// la pantalla de cerca: escritorio con su barra, la ventana grande con la foto del listado ampliada (el canon,
// piezaListado a s 2, con su círculo y su «Wow!», con los colores de foto y la franja del escáner), el panel de la
// gráfica encima con la curva vieja (ámbar tenue, baja) y la nueva (verde fósforo) que crece al cuádruple con o.alto,
// la flecha y el 4 cuando llega; la consola de 1977 de imitación (o.codigo) y una tira de miniaturas que corre; el
// puntero, el reflejo del cristal; en la pared, el cuadro de la gran oreja; en la mesa, la taza con su
// vapor, la planta que se mece con el aire y el piloto del monitor que respira
function f_pantalla(R, t, o) {
  f_fondo(R, 'pantalla37', () => { f_pantallaFondo(R); b_pantallaExtra(R); });
  const { rect, pset, linea, disco } = R, al = Math.max(0, Math.min(1, o.alto ?? 0)), ea = al * al * (3 - 2 * al);
  rect(14, 26, 266, 142, F.pant); rect(14, 26, 266, 30, F.ui); for (let i = 0; i < 4; i++) rect(18 + i * 7, 27, 22 + i * 7, 29, F.uiL); rect(250, 27, 262, 29, F.uiL);
  rect(18, 33, 198, 139, F.uiL); rect(18, 33, 198, 37, F.ui); for (let i = 0; i < 3; i++) disco(22 + i * 5, 35, 1, [F.rotuR, F.laton, F.verdeLampL][i]); rect(180, 34, 194, 36, F.uiS);
  piezaListado(R, 19, 38, { s: 2, w: 179, hh: 101, col: 1, linea: 1, rodea: 1, wow: 1, recorte: [19, 38, 197, 138], sombra: false });
  b_foto(R, 19, 38, 111, 138, t); b_foto(R, 112, 38, 197, 138);
  const B = [112, 46, 194, 134]; f_velo(R, B[0], B[1], B[2], B[3], F.pant, 0.82);
  rect(B[0], B[1], B[2], B[1], F.uiL); rect(B[0], B[3], B[2], B[3], F.uiL);
  const yb = 128, x0 = 118, hv = 20, hn = hv * (1 + 3 * ea);
  linea(x0 - 2, yb, B[2] - 4, yb, F.uiL); linea(x0 - 2, B[1] + 4, x0 - 2, yb, F.uiL);
  for (let y = yb - 20; y > B[1]; y -= 20) for (let x = x0; x < B[2] - 4; x += 3) pset(x, y, F.uiS);
  for (let i = 0; i < 6; i++) { pset(x0 + 6 + i * 12, yb + 2, F.uiL); pset(x0 + 6 + i * 12, yb + 3, F.uiL); }
  // la curva vieja (1977), tenue y baja
  for (let i = 0; i < 6; i++) { const x = x0 + i * 12, y = yb - Math.round(f_CURVA[i] * hv), yp = i ? yb - Math.round(f_CURVA[i - 1] * hv) : yb;
    for (let xx = x; xx < x + 12; xx += 2) pset(xx, y, f_mez(C.ambar, F.pant, 0.35)); for (let yy = Math.min(y, yp); yy <= Math.max(y, yp); yy += 2) pset(x, yy, f_mez(C.ambar, F.pant, 0.35)); }
  // la curva nueva, que sube
  if (al > 0) for (let i = 0; i < 6; i++) { const x = x0 + i * 12, y = yb - Math.round(f_CURVA[i] * hn), yp = i ? yb - Math.round(f_CURVA[i - 1] * hn) : yb;
    for (let yy = y + 2; yy < yb; yy++) for (let xx = x + 1; xx < x + 12; xx++) if ((xx + yy) % 3 === 0) pset(xx, yy, f_mez(C.fosforo, F.pant, 0.7));
    linea(x, y, x + 11, y, C.fosforo); linea(x, y - 1, x + 11, y - 1, f_mez(C.fosforo, F.pant, 0.5)); linea(x, Math.min(y, yp), x, Math.max(y, yp), C.fosforo); if (i === 3) rect(x + 4, y - 1, x + 7, y, F.fosfL); }
  if (al > 0.95) { const xp = x0 + 2, yv = yb - hv, yn = yb - hn, ym = Math.round((yv + yn) / 2); for (let y = yv - 6; y > yn + 1; y--) pset(xp, y, F.fosfL); pset(xp - 1, yn + 3, F.fosfL); pset(xp + 1, yn + 3, F.fosfL); pset(xp - 2, yn + 4, F.fosfL); pset(xp + 2, yn + 4, F.fosfL);
    linea(xp - 3, yv, xp + 3, yv, f_mez(C.ambar, F.pant, 0.2)); linea(xp - 3, yn, xp + 3, yn, F.fosfL);
    if (Math.sin(t * 6) > -0.5) { f_texto3(R, '4', xp + 4, ym - 5, F.fosfL, 2); for (let k = 0; k < 4; k++) { pset(xp + 12 + k, ym - 3 + k, F.fosfL); pset(xp + 15 - k, ym - 3 + k, F.fosfL); } } }
  f_consola(R, t, 203, 33, o.codigo ?? 0);
  rect(203, 113, 261, 139, F.ui); for (let k = 0; k < 7; k++) { const x = Math.round(205 + ((k * 10 - t * 6) % 70 + 70) % 70 - 6); if (x < 204 || x > 252) continue; rect(x, 117, x + 7, 135, F.uiS); rect(x + 1, 118, x + 6, 134, F.papelF); for (let y = 119; y < 134; y += 4) rect(x + 1, y, x + 6, y + 1, F.bandaF); for (let yy = 120; yy < 133; yy += 2) pset(x + 2, yy, F.tintaF); if (k === 3) R.anillo(x + 3, 125, 2, C.rojo); }
  { const px = Math.round(150 + Math.sin(t * 0.7) * 20), py = Math.round(90 + Math.cos(t * 0.5) * 10); for (let j = 0; j < 7; j++) { for (let i = 0; i <= j / 2; i++) pset(px + i, py + j, C.blanco); pset(px + Math.floor(j / 2) + 1, py + j, C.k); } }
  for (let y = 26; y < 142; y++) { const x = 40 + Math.round((142 - y) * 0.6); for (const d of [0, 2, 24]) if (x + d < 266) pset(x + d, y, f_mez(R.pget(x + d, y), C.blanco, 0.1)); }
  // el piloto del monitor que respira, el vapor de la taza y la planta de la maceta que se mece con el aire
  { const b = (Math.sin(t * 1.6) + 1) / 2; pset(140, 145, f_mez(hex('#1e4a2e'), F.verdeLampL, b)); if (b > 0.7) { pset(139, 145, f_mez(hex('#2a2e36'), F.verdeLampL, 0.4)); pset(141, 145, f_mez(hex('#2a2e36'), F.verdeLampL, 0.4)); } }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1); pset(Math.round(240 + Math.sin(u * 6 + k) * 2), Math.round(155 - u * 18), f_mez(C.blanco, F.paredP, 0.2 + u * 0.7)); if (u < 0.5) pset(Math.round(241 + Math.sin(u * 6 + k) * 2), Math.round(154 - u * 18), f_mez(C.blanco, F.paredP, 0.5 + u)); }
  for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.42 + Math.sin(t * 1.3 + k * 0.9) * 0.07, l = 12 + (k % 3) * 5, bx = 291, by = 140;
    const ex = Math.round(bx + Math.cos(a) * l), ey = Math.round(by + Math.sin(a) * l); linea(bx, by, ex, ey, F.plantaS);
    for (let s = 0; s <= 7; s++) { const w = Math.round(Math.sin(s / 7 * Math.PI) * 3), px = Math.round(ex + Math.cos(a) * s * 0.6), py = Math.round(ey + Math.sin(a) * s * 0.6), nx = -Math.sin(a), ny = Math.cos(a);
      for (let q = -w; q <= w; q++) pset(Math.round(px + nx * q), Math.round(py + ny * q), Math.abs(q) === w ? F.plantaS : q < 0 ? F.plantaL : F.planta); } }
}
// lo fijo: la pared, el borde de la ventana a la izquierda, el tablón con fotos, el calendario colgado de su clavo (foto
// de la costa con palmera y monte, la espiral, 2027 y la cuadrícula de los días sin letras: la fila de los días de la
// semana es una tira de colores, el domingo en rojo), la mesa delante con montañas de listados, carpetas y cajas, la taza,
// el bote de lápices y una banderita
function f_calendarioFondo(R) {
  const { rect, pset, linea, disco, anillo, poligono } = R;
  rect(0, 0, 319, 179, F.paredP); f_motas(R, 0, 0, 319, 179, 500, F.paredPS, 101); f_motas(R, 0, 0, 319, 179, 200, F.paredPL, 102);
  rect(0, 22, 36, 118, C.blanco); rect(36, 22, 38, 118, hex('#c8c4b8')); rect(0, 116, 40, 120, hex('#d8d2c2'));
  rect(232, 46, 300, 104, F.mesaD); rect(234, 48, 298, 102, hex('#c49a64')); f_motas(R, 234, 48, 298, 102, 200, hex('#a87e4a'), 103);
  for (const [x, y] of [[238, 52], [256, 56], [276, 51], [240, 76], [262, 80], [282, 74]]) { rect(x + 1, y + 1, x + 15, y + 19, hex('#8a6a40')); rect(x, y, x + 14, y + 18, C.papel); for (let yy = y + 1; yy < y + 18; yy += 4) rect(x, yy, x + 14, yy + 1, C.banda); for (let k = 0; k < 10; k++) pset(x + 2 + Math.floor(h(k, x, 104) * 11), y + 2 + Math.floor(h(y, k, 104) * 14), F.tinta); disco(x + 7, y + 1, 1, [F.rotuR, F.rotuA, F.laton][(x + y) % 3]); }
  anillo(271, 89, 4, C.rojo);
  // el calendario
  disco(155, 18, 1, F.grisD); linea(155, 19, 120, 30, F.grisS); linea(155, 19, 190, 30, F.grisS);
  rect(97, 29, 214, 131, hex('#b8b4a8')); rect(96, 28, 212, 129, C.blanco); rect(212, 30, 213, 129, hex('#d8d4c8'));
  for (let x = 100; x < 210; x += 5) { rect(x, 26, x + 1, 31, F.grisD); pset(x, 26, F.grisL); }
  for (let y = 33; y < 70; y++) { const u = (y - 33) / 37; for (let x = 100; x < 209; x++) pset(x, y, u < 0.45 ? f_mez(F.cieloP1, F.cieloP2, u * 2) : u < 0.6 ? F.monte1 : u < 0.75 ? (x + y) % 3 ? hex('#3aa0c8') : hex('#6ac0e0') : hex('#f0dca8')); }
  for (let x = 100; x < 209; x++) { const a = 56 - Math.round(10 * Math.sin((x - 100) * 0.035) + 3 * Math.sin(x * 0.2)); linea(x, a, x, 55, x % 3 ? F.monte1 : F.monte2); }
  f_nube(R, 128, 40, 14, [hex('#b8cce0'), hex('#e4eef8'), C.blanco]); f_palmera(R, 186, 68, 26, 0, 1);
  rect(99, 70, 209, 70, F.grisL);
  f_texto3(R, '2027', 140, 74, hex('#2a2a34'), 2);
  for (let c = 0; c < 7; c++) rect(100 + c * 16, 86, 113 + c * 16, 88, c === 0 ? hex('#d86a5a') : hex('#8a9aaa'));
  for (let r = 0; r <= 5; r++) linea(99, 90 + r * 7, 211, 90 + r * 7, hex('#dcdcd4')); for (let c = 0; c <= 7; c++) linea(99 + c * 16, 90, 99 + c * 16, 125, hex('#dcdcd4'));
  const pd = new Date(2027, 7, 1).getDay();
  for (let d = 1; d <= 31; d++) { const k = d - 1 + pd, c = k % 7, r = Math.floor(k / 7), s = '' + d; f_texto3(R, s, 99 + c * 16 + 8 - s.length * 2, 91 + r * 7, c === 0 ? hex('#c83a2a') : hex('#3a3a44')); }
  // la mesa delante: tablero, canto, y las montañas de papel
  rect(0, 131, 319, 179, F.mesaD); rect(0, 131, 319, 136, F.mesaS); rect(0, 131, 319, 131, F.mesaL); for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 1, 105) * 320), y = 132 + Math.floor(h(i, 2, 105) * 4); rect(x, y, x + 8, y, F.mesa); }
  rect(0, 137, 319, 179, hex('#4a3420'));
  for (const [x0, w, n] of [[4, 40, 20], [46, 44, 14], [222, 46, 16], [270, 46, 22]]) for (let k = 0; k < n; k++) { const y = 134 - k * 2, dx = Math.round(Math.sin(k * 1.9 + x0) * 1.5); rect(x0 + dx, y - 1, x0 + dx + w, y, (k >> 1) % 2 ? C.banda : C.papel); pset(x0 + dx, y, C.papelS); pset(x0 + dx + w, y - 1, C.papelS); }
  f_caja(R, 50, 92, 86, 106, 106, { cinta: false, asas: true, numero: '85' }); f_caja(R, 226, 84, 264, 101, 107, { c: [hex('#e8e4d8'), hex('#c4c0b4'), C.blanco, hex('#8a867c')], cinta: false, asas: true, etiqueta: true });
  for (const [x, c] of [[8, F.rotuA], [16, F.verdeLamp], [24, F.rotuR]]) { rect(x, 76, x + 6, 94, c); rect(x, 76, x, 94, f_mez(c, C.blanco, 0.3)); disco(x + 3, 88, 1, C.blanco); }
  rect(64, 120, 74, 132, hex('#f0f0ec')); rect(64, 120, 74, 120, C.blanco); rect(74, 123, 76, 128, hex('#d0d0cc')); rect(66, 123, 72, 127, F.rotuA);
  rect(80, 122, 86, 132, hex('#3a3a44')); for (const [x, c] of [[81, F.rotuR], [83, F.laton], [85, F.rotuA]]) rect(x, 114, x, 121, c);
  linea(216, 98, 216, 131, F.grisS); rect(214, 130, 219, 132, F.grisD);
  for (let r = 0; r < 5; r++) rect(217, 98 + r * 2, 230, 98 + r * 2 + 1, r % 2 ? C.blanco : hex('#d02a2a')); poligono([[217, 98], [217, 107], [223, 102]], hex('#2a5ab8')); pset(219, 102, C.blanco);
  // los cajones de la mesa: frentes con su bisel, vetas y tiradores de latón
  for (const [x0, x1] of [[6, 102], [112, 208], [218, 314]]) for (const [y0, y1] of [[142, 158], [162, 178]]) { rect(x0, y0, x1, y1, hex('#4a3420')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, F.mesaD); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, F.mesaS);
    for (let i = 0; i < 8; i++) { const y = y0 + 3 + Math.floor(h(i, x0, 109) * (y1 - y0 - 5)), x = x0 + 4 + Math.floor(h(x0, i, 110) * (x1 - x0 - 30)); rect(x, y, x + 10 + Math.floor(h(i, y0, 111) * 14), y, hex('#5a4228')); }
    const mx = Math.round((x0 + x1) / 2); rect(mx - 6, y0 + 6, mx + 6, y0 + 8, F.latonS); rect(mx - 6, y0 + 6, mx + 6, y0 + 6, F.latonL); }
}

// el calendario entero: el fondo fijo, la palmera que asoma por la ventana, el círculo rojo que rodea el 15 (o.rodea
// 0–1, a mano, con doble trazo), la esquina de abajo de la hoja que se levanta con el aire, las hojas de arriba de las
// pilas que tiemblan y la lagartija que trepa por la pared
function f_calendario(R, t, o) {
  f_fondo(R, 'calendario', () => f_calendarioFondo(R));
  const { rect, pset, linea } = R;
  f_fueraPR(R, t, 0, 22, 35, 115); rect(0, 66, 35, 67, C.blanco);
  const rod = Math.max(0, Math.min(1, o.rodea ?? 0)), pd = new Date(2027, 7, 1).getDay(), k = 14 + pd, cx = 99 + (k % 7) * 16 + 8, cy = 91 + Math.floor(k / 7) * 7 + 2;
  for (const [dr, dc] of [[0, 0], [0.6, 0.4]]) for (let a = 0; a <= rod * Math.PI * 2.2; a += 0.05) { const an = -2.4 + a, rr = 1 + 0.06 * Math.sin(an * 3 + dc * 5); pset(Math.round(cx + Math.cos(an) * (10 + dr) * rr), Math.round(cy + Math.sin(an) * (5 + dr * 0.5) * rr), C.rojo); }
  { const l = Math.round(1 + Math.sin(t * 1.7) * 1.5 + 1.5); for (let i = 0; i < l + 2; i++) linea(212 - i, 129, 212, 129 - l - 2 + i, i === 0 ? hex('#c8c4b8') : C.blanco); pset(212 - l, 129, hex('#9a968a')); }
  for (const [x0, w, n] of [[4, 40, 20], [46, 44, 14], [222, 46, 16], [270, 46, 22]]) { const y = 134 - (n - 1) * 2 - 1, l = Math.max(0, Math.round(Math.sin(t * 2 + x0) * 2)); if (l) linea(x0 + w - 6, y - l, x0 + w + 1, y, C.papel); }
  { const lx = Math.round(44 + Math.sin(t * 0.3) * 2), ly = Math.round(96 - ((t * 2) % 30)), g = Math.sin(t * 3) > 0.3; rect(lx, ly, lx + 1, ly + 6, F.verdeLamp); pset(lx, ly - 1, F.verdeLamp); pset(lx + 1, ly - 1, C.k); linea(lx + 1, ly + 7, lx + 2, ly + 12, F.verdeLamp); pset(lx - 1, ly + 1, F.verdeLamp); pset(lx + 2, ly + 1, F.verdeLamp); pset(lx - 1, ly + 5, F.verdeLamp); pset(lx + 2, ly + 5, F.verdeLamp); if (g) { pset(lx - 1, ly + 2, hex('#e85a3a')); pset(lx - 2, ly + 2, hex('#e85a3a')); } }
}

// la vista que piden las opciones: un encuadre que no existe cae en el primero; una cámara que no es la suya, en 'general'
function g_whVista(o) { const enc = V_HOY[o.encuadre] ? o.encuadre : Object.keys(V_HOY)[0], e = V_HOY[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; }

// la paleta de lo nuevo: el techo de yeso, el papel de estrellitas, la pizarra negra y la verde con su tiza, el
// aluminio del embudo, la cinta de carrocero, el vaso, la madera oscura y el roble del despacho, el yeso de 1959 y el otoño
const g_whW = pal({
  techo: '#efe7d6', techoS: '#e4dac6', techoD: '#cfc3aa', grieta: '#9c8e74', mancha: '#d8c9a6',
  papel: '#e8dcc0', papelS: '#dccfb0', motA: '#8a9ab6', motAS: '#6e7e9c', motB: '#c49a68', motBS: '#a47c4e',
  pizN: '#2a3430', pizS: '#323e39', pizL: '#44524b', tiza: '#f4f2e8', tizaS: '#c9cec4', tizaD: '#8a968e',
  emb: '#b8c0c8', embS: '#7e8894', embD: '#525a66', embL: '#e4eaf0', embB: '#ffffff',
  cinta: '#eadcae', cintaS: '#c8b886', cintaL: '#f8f0d0',
  vaso: '#d4ecf4', vasoS: '#9cc4d4', vasoL: '#ffffff',
  verdeL: '#4a8a5a', verdeLS: '#2e6040', verdeLL: '#7ab88a',
  mad: '#5a3a24', madS: '#43291a', madD: '#2a180e', madL: '#77503a', madB: '#94684a',
  roble: '#b88a54', robleS: '#8c6236', robleL: '#d8ac70', robleD: '#5e3e20',
  yeso: '#d9cfb4', yesoS: '#cbbf9f', pizV: '#2f4c3c', pizVS: '#273f32', pizVL: '#3d5e4b', pizVB: '#4c6e5a',
  ot0: '#e8842a', ot1: '#c8501e', ot2: '#f2b438', ot3: '#9a3418', ot4: '#7a5a2a',
  baqu: '#3a2a20', gabardina: '#b09868', gabardinaS: '#86704a', sombrero: '#4a4a52', sombreroS: '#2e2e36',
  radio: '#c84a3a', radioS: '#8e2e24', radioL: '#ec7a62', dial: '#f4e2a8',
});

// el papel pintado del estudio (a escala e): crema con listas finas y, al tresbolillo, una estrellita azul y un planeta
// ocre con su anillo, pequeños (de 7 × 7); calma(x, y): solo listas
const G_WHMOT = [
  ['...a...', '...a...', '..aAa..', 'aaAAAaa', '..aAa..', '...a...', '...a...'],
  ['.......', '..ooo..', '.oOooo.', 'OOOOOOO', '.ooooO.', '..ooo..', '.......'],
];

function g_whPapel(R, x0, y0, x1, y1, e = 1, calma = null) {
  const W = g_whW;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const xs = Math.floor(x / e), ys = Math.floor(y / e); let c = xs % 8 === 0 ? W.papelS : W.papel;
    if (h(xs >> 1, ys >> 1, 91) < 0.05) c = W.papelS;
    if (!(calma && calma(x, y))) { const fila = Math.floor(ys / 14), xx = xs + (fila & 1) * 8, i = (xx % 16) - 4, j = (ys % 14) - 3;
      if (i >= 0 && i < 7 && j >= 0 && j < 7) { const ch = G_WHMOT[(Math.floor(xx / 16) + fila) & 1][j][i]; if (ch === 'a') c = W.motA; else if (ch === 'A') c = W.motAS; else if (ch === 'o') c = W.motB; else if (ch === 'O') c = W.motBS; } }
    R.pset(x, y, c);
  }
}

// el yeso del techo visto desde abajo (de y0 a y1, a escala e): dos tonos casi iguales, la llana en manchas suaves y la
// sombra tramada que se espesa hacia la moldura
function g_whTechoYeso(R, y0, y1, e = 1) {
  const W = g_whW;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const q = h(x >> (1 + e), y >> e, 92), s = (y - y0) / Math.max(1, y1 - y0);
    R.pset(x, y, y > y1 - 4 && g_whB4(x, y) < (y - y1 + 4) / 5 ? W.techoD : q < 0.16 ? W.techoS : W.techo); }
}

// la moldura del techo de y0 a y0 + 6e: la sombra, el bocel, los dentículos y el filete
// (x ≥ xl: lisa, sin dentículos ni filete claro, para la esquina de Atom)
function g_whMoldura(R, y0, e = 1, xl = 320) {
  const K = g_whK;
  R.rect(0, y0, 319, y0 + e - 1, K.molduraS); R.rect(0, y0 + e, 319, y0 + 3 * e - 1, K.moldura); if (xl > 0) R.rect(0, y0 + e, Math.min(319, xl - 1), y0 + e, K.blanco);
  for (let x = 0; x < 320; x++) for (let y = y0 + 3 * e; y < y0 + 4 * e; y++) R.pset(x, y, x < xl && (Math.floor(x / e) % 6) < 3 ? K.moldura : x >= xl ? K.moldura : K.molduraS);
  R.rect(0, y0 + 4 * e, 319, y0 + 5 * e - 1, K.moldura); R.rect(0, y0 + 5 * e, 319, y0 + 6 * e - 1, K.molduraS);
  for (let x = 0; x < 320; x++) if ((x & 1) === 0) R.pset(x, y0 + 6 * e, g_whW.papelS);
}

// el friso de cuarterones verde azulado (de y0 a y1) y su rodapié, como en el estudio de siempre
function g_whFriso(R, y0, y1) {
  const K = g_whK, { rect, pset } = R;
  rect(0, y0, 319, y1, K.friso); rect(0, y0, 319, y0, K.frisoL); rect(0, y0 + 2, 319, y0 + 2, K.frisoD); rect(0, y1 - 3, 319, y1, K.frisoS); rect(0, y1 - 3, 319, y1 - 3, K.frisoL); rect(0, y1, 319, y1, K.frisoD);
  const a = y0 + 5, b = y1 - 6;
  for (let x = 4; x < 320; x += 28) { rect(x, a, x + 22, b, K.frisoS); rect(x, a, x + 22, a, K.frisoD); rect(x, a, x, b, K.frisoD); rect(x + 22, a + 1, x + 22, b, K.frisoL); rect(x + 1, b, x + 22, b, K.frisoL);
    rect(x + 3, a + 3, x + 19, b - 3, K.friso); rect(x + 3, a + 3, x + 19, a + 3, K.frisoL); rect(x + 3, a + 3, x + 3, b - 3, K.frisoL); rect(x + 19, a + 4, x + 19, b - 3, K.frisoD); rect(x + 4, b - 3, x + 19, b - 3, K.frisoD);
    for (let y = a + 5; y < b - 4; y++) for (let i = 5; i < 18; i++) if (h((x + i) >> 1, y >> 2, 32) < 0.12) pset(x + i, y, K.frisoS); }
}

// el embudo de cocina de aluminio con el vaso pegado boca abajo al pitorro, a escala e, con el centro de la boca en
// (mx, my): la boca (elipse), el cono con su brillo, la anilla de colgar, el pitorro, el anillo de cinta y el vaso de
// cristal facetado (tiñe lo de detrás); devuelve el fondo del vaso [x, y]
function g_whEmbudo(R, mx, my, e = 1) {
  const W = g_whW, K = g_whK, rx = 13 * e, ry = Math.max(2, Math.round(3 * e)), hc = 20 * e, rp = Math.max(1, Math.round(1.6 * e)), hp = 7 * e, hv = 12 * e;
  // el cono: de la boca (radio rx) al pitorro (radio 2,5e), sombreado con la luz a la izquierda
  for (let y = my; y <= my + hc; y++) { const u = (y - my) / hc, r = rx + (2.5 * e - rx) * u;
    for (let x = Math.round(mx - r); x <= Math.round(mx + r); x++) { const v = (x - mx) / Math.max(1, r); let c = v < -0.85 ? W.embD : v < -0.55 ? W.emb : v < -0.25 ? W.embL : v < 0.35 ? W.emb : v < 0.8 ? W.embS : W.embD;
      if (Math.abs(v + 0.4) < 0.07 && u > 0.1 && u < 0.85) c = W.embB; if (e > 1 && Math.floor((y - my) / (3 * e)) % 2 === 0 && Math.abs(v) > 0.92) c = W.embD; R.pset(x, y, c); }
    R.pset(Math.round(mx - r) - 1, y, K.k); R.pset(Math.round(mx + r) + 1, y, K.k); }
  // la boca, pegada al techo: el borde enrollado (elipse clara arriba, oscura abajo)
  for (let i = -rx - 1; i <= rx + 1; i++) { const yy = Math.round(ry * Math.sqrt(Math.max(0, 1 - (i / (rx + 1)) ** 2))); R.pset(mx + i, my + yy, K.k); R.pset(mx + i, my + yy - 1, i < 0 ? W.embL : W.emb); if (e > 1) R.pset(mx + i, my + yy - 2, W.embS); }
  // la anilla de colgar, al lado
  R.disco(mx + rx - e, my + 4 * e, Math.max(1, Math.round(1.5 * e)), K.k); R.pset(mx + rx - e, my + 4 * e, W.embS);
  // el pitorro
  const yp = my + hc; R.rect(mx - rp - 1, yp, mx + rp + 1, yp + hp, K.k); R.rect(mx - rp, yp, mx + rp, yp + hp, W.emb); R.rect(mx - rp, yp, mx - rp, yp + hp, W.embL); R.rect(mx + rp, yp, mx + rp, yp + hp, W.embS);
  // el anillo de cinta que une pitorro y vaso
  const yc = yp + hp - Math.max(1, e); R.rect(mx - rp - 2, yc - e, mx + rp + 2, yc + e, K.k); R.rect(mx - rp - 1, yc - e + 1, mx + rp + 1, yc + e - 1, W.cinta); R.pset(mx - rp - 1, yc - e + 1, W.cintaL); if (e > 1) R.rect(mx - rp - 1, yc + e - 1, mx + rp + 1, yc + e - 1, W.cintaS);
  // el vaso boca abajo: el culo arriba (estrecho), la boca abajo (ancha), facetas, brillo y lo de detrás teñido
  const yv = yp + hp + 1, r0 = 4 * e, r1 = 6 * e;
  for (let y = yv; y <= yv + hv; y++) { const u = (y - yv) / hv, r = Math.round(r0 + (r1 - r0) * u);
    for (let x = mx - r; x <= mx + r; x++) { const v = (x - mx) / Math.max(1, r); if (y < yv + Math.max(2, e * 2)) R.pset(x, y, W.vasoS); else if (v < -0.55 && v > -0.75) R.pset(x, y, W.vasoL); else if (e > 1 && Math.round((x - mx) / (2 * e)) % 2 === 0 && Math.abs(v) < 0.9) g_whTinta(R, x, y, W.vasoS, 0.35); else g_whTinta(R, x, y, W.vaso, 0.5); }
    R.pset(mx - r - 1, y, K.k); R.pset(mx + r + 1, y, K.k); }
  R.rect(mx - r1, yv + hv + 1, mx + r1, yv + hv + 1, K.k); R.rect(mx - r1 + 1, yv + hv, mx + r1 - 1, yv + hv, W.vasoL);
  return [mx, yv + hv + 1];
}

// una tira de cinta de carrocero de (x0, y0) a (x1, y1), de ancho a (con su filo claro y el corte en zigzag)
function g_whCinta(R, x0, y0, x1, y1, a = 2) {
  const W = g_whW, n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0))), nx = -(y1 - y0) / n, ny = (x1 - x0) / n;
  for (let s = 0; s <= n; s++) { const u = s / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u;
    for (let k = -a; k <= a; k++) R.pset(Math.round(x + nx * k * 0.5), Math.round(y + ny * k * 0.5), k === -a ? W.cintaL : k === a ? W.cintaS : (s + k) % 5 === 0 ? W.cintaS : W.cinta); }
  for (let k = -a; k <= a; k += 2) R.pset(Math.round(x1 + nx * k * 0.5 + (x1 - x0) / n), Math.round(y1 + ny * k * 0.5 + (y1 - y0) / n), W.cinta);
}

// el momento de los tres golpecitos (o.ruido 2): u el avance 0–1 (o.u, o el ciclo de 3 s con t); devuelve
// { u, golpe: índice del último que ha sonado (−1 si ninguno), f: 0–1 desde ese golpe (su onda dura 0,22 de u) }
const G_WHTOQUES = [0.08, 0.38, 0.68];

function g_whToques(t, o) {
  const u = o.u != null ? g_whCl(o.u) : (t / 3) % 1; let golpe = -1; for (let i = 0; i < 3; i++) if (u >= G_WHTOQUES[i]) golpe = i;
  return { u, golpe, f: golpe < 0 ? 1 : g_whCl((u - G_WHTOQUES[golpe]) / 0.22) };
}

// la lámpara de techo con su pantalla de esmalte verde, colgada de (x, y0) con un cable de largo l, que se mece un
// ángulo a; la bombilla encendida y su halo tramado (a escala e); devuelve la bombilla [x, y]
function g_whLampara(R, x, y0, l, a, e = 1) {
  const W = g_whW, K = g_whK, bx = Math.round(x + Math.sin(a) * l), by = Math.round(y0 + Math.cos(a) * l);
  R.linea(x, y0, bx, by, K.k); R.disco(x, y0, 2 * e, K.k); R.disco(x, y0, 2 * e - 1, g_whW.techoD);
  const w = 8 * e, hh = 6 * e;
  R.poligono([[bx - 2 * e, by], [bx + 2 * e, by], [bx + w + Math.round(a * 4), by + hh], [bx - w + Math.round(a * 4), by + hh]], K.k);
  R.poligono([[bx - 2 * e + 1, by + 1], [bx + 2 * e - 1, by + 1], [bx + w - 1 + Math.round(a * 4), by + hh - 1], [bx - w + 1 + Math.round(a * 4), by + hh - 1]], W.verdeL);
  R.linea(bx - 2 * e + 1, by + 1, bx - w + 2 + Math.round(a * 4), by + hh - 2, W.verdeLL); R.linea(bx + 2 * e - 1, by + 1, bx + w - 2 + Math.round(a * 4), by + hh - 2, W.verdeLS);
  R.rect(bx - w + Math.round(a * 4), by + hh, bx + w + Math.round(a * 4), by + hh, W.verdeLS);
  const lx = bx + Math.round(a * 4), ly = by + hh + e; R.disco(lx, ly, 2 * e, K.luz); R.disco(lx, ly - e, e, K.blanco);
  return [lx, ly];
}

// el cuadro de la antena bajo las estrellas (marco dorado, cielo de noche con estrellas que titilan, una antena
// parabólica blanca sobre una loma), a escala e, con la esquina de arriba a la izquierda en (x, y); sacude: temblor
function g_whCuadro(R, x, y, t, e = 1, sacude = 0) {
  const K = g_whK, W = g_whW, w = 34 * e, hh = 22 * e, dx = sacude > 0 ? (Math.floor(t * 30) % 2 ? 1 : -1) * Math.round(sacude) : 0, dy = sacude > 0 ? Math.floor(t * 23) % 2 : 0, X = x + dx, Y = y + dy;
  // el cordel y el clavo
  R.linea(X + w / 2 - 7 * e, Y, x + w / 2, y - 6 * e, K.k); R.linea(X + w / 2 + 7 * e, Y, x + w / 2, y - 6 * e, K.k); R.pset(x + w / 2, y - 6 * e, K.metalL);
  // la sombra, el marco y el cielo
  for (let j = 2; j <= hh + 2; j++) for (let i = 2; i <= w + 2; i++) if (g_whB4(X + i, Y + j) < 0.5 && (i > w || j > hh)) g_whTinta(R, X + i, Y + j, K.k, 0.18);
  R.rect(X, Y, X + w, Y + hh, K.k); R.rect(X + 1, Y + 1, X + w - 1, Y + hh - 1, K.oroS); R.rect(X + 1, Y + 1, X + w - 1, Y + 1, K.oroL); R.rect(X + 1, Y + 1, X + 1, Y + hh - 1, K.oro);
  const a = X + 1 + 2 * e, b = Y + 1 + 2 * e, c = X + w - 1 - 2 * e, d = Y + hh - 1 - 2 * e;
  for (let yy = b; yy <= d; yy++) for (let xx = a; xx <= c; xx++) { const u = (yy - b) / (d - b); R.pset(xx, yy, u < 0.45 ? (g_whB4(xx, yy) < 0.3 ? K.noche : hex('#141a3a')) : u < 0.7 ? (g_whB4(xx, yy) < (u - 0.45) * 3 ? hex('#2a3468') : K.noche) : hex('#2a3a2a')); }
  for (let k = 0; k < 9 * e; k++) { const sx = a + Math.floor(h(k, 1, 93) * (c - a)), sy = b + Math.floor(h(k, 2, 93) * (d - b) * 0.6); R.pset(sx, sy, Math.sin(t * 2 + k * 1.7) > 0.3 ? K.blanco : K.nubeS); }
  // la loma y la antena
  for (let xx = a; xx <= c; xx++) { const top = d - Math.round(3 * e + Math.sin((xx - a) / (c - a) * 3) * 1.5 * e); for (let yy = top; yy <= d; yy++) R.pset(xx, yy, yy === top ? hex('#4a6a3a') : hex('#24341f')); }
  const ax = a + Math.round((c - a) * 0.62), ay = d - 4 * e; R.linea(ax, ay, ax, ay - 4 * e, K.blanco); R.linea(ax - 2 * e, ay, ax + 2 * e, ay, K.metalL);
  for (let i = -5 * e; i <= 5 * e; i++) { const yy = Math.round(ay - 6 * e + (i * i) / (5 * e) * 0.5 - i * 0.4); R.pset(ax + i, yy, K.blanco); if (e > 1) R.pset(ax + i, yy + 1, K.metalL); }
  R.linea(ax, ay - 6 * e, ax - 1 * e, ay - 10 * e, K.metalL);
  R.rect(X, Y + hh, X + w, Y + hh, K.oroS); R.rect(X + w, Y, X + w, Y + hh, K.oroS);
}

// la pizarra negra de pared del estudio (x0, y0)–(x1, y1): marco de nogal, la pizarra con borrones viejos tramados
// (en el hueco de la derecha, la mancha de un borrado) y la repisa con su tiza y el borrador
function g_whPizarraNegra(R, x0, y0, x1, y1) {
  const W = g_whW, K = g_whK, { rect, pset } = R;
  rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K.k); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K.nogal); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, K.nogalL); rect(x0 - 2, y0 - 2, x0 - 2, y1 + 2, K.nogalL); rect(x1 + 2, y0 - 1, x1 + 2, y1 + 2, K.nogalS); rect(x0 - 1, y1 + 2, x1 + 2, y1 + 2, K.nogalS);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x >> 1, y, 94), sw = Math.sin((x - x0) * 0.25 + Math.sin(y * 0.2) * 2) > 0.85 && h(x >> 3, y >> 3, 95) < 0.4;
    pset(x, y, sw ? W.pizS : q < 0.1 ? W.pizS : W.pizN); }
  // la mancha de un borrado viejo en el hueco de la derecha
  for (let y = y0 + 10; y <= y1 - 12; y++) for (let x = x0 + 24; x <= x1 - 6; x++) { const d = Math.hypot((x - (x0 + x1 + 16) / 2) / 14, (y - (y0 + y1) / 2) / 14); if (d < 1 && g_whB4(x, y) < (1 - d) * 0.35) pset(x, y, W.pizL); }
  pset(x0 + 1, y0 + 1, W.pizL); pset(x0 + 2, y0 + 1, W.pizL);
  // la repisa, la tiza y el borrador
  rect(x0 - 4, y1 + 4, x1 + 4, y1 + 6, K.k); rect(x0 - 3, y1 + 4, x1 + 3, y1 + 5, K.nogalL); rect(x0 - 3, y1 + 5, x1 + 3, y1 + 5, K.nogalS);
  rect(x0 + 6, y1 + 3, x0 + 10, y1 + 3, W.tiza); pset(x0 + 10, y1 + 3, W.tizaS); for (let i = 0; i < 9; i++) if (h(i, 1, 96) < 0.6) pset(x0 + 2 + i * 5, y1 + 4, W.tizaS);
  rect(x1 - 18, y1, x1 - 6, y1 + 3, K.k); rect(x1 - 17, y1, x1 - 7, y1 + 1, K.nogalL); rect(x1 - 17, y1 + 2, x1 - 7, y1 + 3, hex('#4a4a52')); for (let x = x1 - 17; x <= x1 - 7; x += 2) pset(x, y1 + 3, W.tizaS);
}

const G_WHEST = { suelo: 158, ventana: [74, 38, 112, 94], pizarra: [128, 38, 184, 86], lampara: [200, 2, 30], embudo: [246, 11], silla: [236, 258, 129], cuadro: [270, 58], reloj: [228, 70], mesa: [146, 222, 116] };

// LO FIJO DEL ESTUDIO: todo menos el hueco de la ventana (vacío para la vista del parque), la lámpara, el embudo, el
// cuadro, el reloj y la marca de tiza, que se pintan en cada fotograma
function g_whEstudioFijo(R) {
  const K = g_whK, W = g_whW, G = G_WHEST, { rect, pset, disco, linea, poligono } = R;
  // el techo (liso bajo el año), con una grieta fina y la mancha de una gotera cerca del embudo; la moldura
  g_whTechoYeso(R, 0, 20);
  for (const [x, y] of [[214, 9], [218, 10], [221, 9], [224, 11], [228, 12], [231, 12]]) pset(x, y, W.grieta);
  for (let i = -12; i <= 12; i++) { const y = 8 + Math.round(3 * Math.sqrt(Math.max(0, 1 - (i / 12) ** 2))); if ((i & 1) === 0) pset(268 + i, y, W.mancha); }
  for (let x = 0; x < 320; x++) pset(x, 27, (x & 1) ? W.papelS : K.molduraS);   // el filo de abajo de la moldura (la moldura solo pinta los pares)
  g_whMoldura(R, 21, 1, 262);
  // la pared: el papel de estrellitas y planetas (liso tras Atom) y el friso de cuarterones
  g_whPapel(R, 0, 28, 319, 116, 1, (x, y) => x >= 264 && y <= 50);
  g_whFriso(R, 117, 150);
  // la tarima y la alfombra
  g_whTarima(R, 151, 179, [151, 155, 160, 166, 173]); for (let x = 0; x < 320; x++) { pset(x, 151, K.tarimaD); if ((x & 1) === 0) pset(x, 152, K.tarimaD); }
  { const A = (x, y) => { const u = (y - 157) / 20, xa = 60 - u * 12, xb = 226 + u * 12; return x >= xa && x <= xb ? [(x - xa) / (xb - xa), u] : null; };
    for (let y = 157; y <= 177; y++) for (let x = 44; x <= 242; x++) { const p = A(x, y); if (!p) continue; const [v, u] = p, bx = Math.min(v, 1 - v) * 170, by = Math.min(u, 1 - u) * 18;
      let c = bx < 2 || by < 1 ? K.alfombraL : bx < 6 || by < 2.6 ? K.alfombraR : bx < 8 || by < 3.6 ? K.alfombraL : K.alfombra;
      if (c === K.alfombra) { const dx = (v * 170) % 20 - 10, dy = (u - 0.5) * 22, d = Math.abs(dx) + Math.abs(dy) * 1.6; c = d < 2 ? K.alfombraL : d < 5 ? K.alfombraR : d < 6.2 ? K.alfombraL : (x + y) % 2 && h(x, y, 33) < 0.3 ? K.alfombraS : K.alfombra; }
      else if (c === K.alfombraR && (x + y) % 4 === 0) c = K.cortinaS;
      pset(x, y, c); }
    for (let y = 158; y <= 177; y += 2) { const u = (y - 157) / 20; pset(Math.round(60 - u * 12) - 1, y, K.alfombraL); pset(Math.round(60 - u * 12) - 2, y, K.papelS); pset(Math.round(226 + u * 12) + 1, y, K.alfombraL); pset(Math.round(226 + u * 12) + 2, y, K.papelS); } }
  // LA LIBRERÍA de nogal (x 6–60, y 34–152): baldas con libros, el globo, la antena de juguete, el bote de lápices, cajas y el helecho de encima
  rect(6, 38, 60, 152, K.k); rect(7, 39, 59, 151, K.nogal); rect(9, 41, 57, 146, K.nogalD); rect(4, 34, 62, 37, K.k); rect(5, 35, 61, 36, K.nogalL); rect(5, 36, 61, 36, K.nogalS); rect(7, 39, 8, 151, K.nogalL); rect(58, 39, 59, 151, K.nogalS); rect(7, 147, 59, 151, K.nogal); rect(7, 147, 59, 147, K.nogalL);
  { const COL = [K.rojo, K.azul, K.oroS, K.friso, K.cortina, K.noche, K.papelS, K.rojoS, K.azulS, K.hojaS, K.lila, K.sillon];
    [59, 81, 103, 125, 146].forEach((by, b) => { if (b < 4) { rect(9, by, 57, by + 1, K.nogalL); rect(9, by + 1, 57, by + 1, K.nogalS); for (let x = 9; x <= 57; x++) if (x % 2) pset(x, by + 2, K.k); }
      let x = 10, n = 0; const y = by - 1;
      while (x < 56) { const hueco = (b === 0 && x > 40) || (b === 2 && x > 15 && x < 41) || (b === 3 && x < 26) || (b === 4 && x > 30); if (hueco) { x++; continue; }
        const w = 2 + Math.floor(h(x, b, 34) * 3), a = 11 + Math.floor(h(x, b, 35) * 7); if (x + w > 56) break;
        if (h(x, b, 36) < 0.1 && x + 6 < 56) { linea(x, y, x + 4, y - a, COL[(n * 5 + b) % 12]); linea(x + 1, y, x + 5, y - a, g_whMez(COL[(n * 5 + b) % 12], K.k, 0.3)); x += 7; n++; continue; }
        g_whLomo(R, x, y, w, a, COL[(n * 5 + b * 3) % 12], n); x += w; n++; } });
    // el globo terráqueo
    rect(46, 56, 52, 57, K.oroS); linea(49, 52, 49, 56, K.oroS); disco(49, 48, 5, K.k); disco(49, 48, 4, K.azul); pset(47, 46, K.cielo3); pset(48, 47, K.hoja); pset(49, 47, K.hoja); pset(50, 49, K.hoja); pset(51, 48, K.hoja); pset(48, 50, K.hojaL); linea(44, 44, 54, 52, K.oro);
    // LA ANTENA DE JUGUETE (un plato blanco en su trípode, mirando arriba) y el bote de lápices, en la balda del medio
    rect(19, 101, 31, 102, K.k); linea(25, 100, 21, 94, K.metalS); linea(25, 100, 29, 94, K.metalS); linea(25, 100, 25, 93, K.metal);
    for (let i = -8; i <= 8; i++) { const yy = 89 + Math.round((i * i) / 16) - Math.round(i * 0.3); pset(25 + i, yy, K.k); pset(25 + i, yy - 1, i < 0 ? K.blanco : K.metalL); if (Math.abs(i) < 6) pset(25 + i, yy - 2, K.metalL); }
    linea(25, 92, 22, 84, K.metalS); disco(22, 83, 1, K.rojo);
    rect(34, 92, 40, 102, K.k); rect(35, 93, 39, 102, K.azulS); rect(35, 93, 39, 93, K.azul); for (const [dx, a, c] of [[35, 6, K.amarillo], [37, 8, K.rojo], [39, 5, K.verde]]) { linea(dx, 92, dx, 92 - a, c); pset(dx, 92 - a, K.k); }
    rect(10, 121, 24, 123, K.rojoS); rect(10, 121, 24, 121, K.rojo); rect(11, 118, 23, 120, K.papel); rect(11, 118, 23, 118, K.azul); rect(12, 115, 22, 117, K.oroS); rect(12, 115, 22, 115, K.oro); disco(17, 111, 3, K.metalS); disco(17, 111, 2, K.metalL); pset(16, 110, K.blanco);
    rect(32, 132, 44, 145, K.papelS); rect(32, 132, 44, 133, K.papel); rect(36, 137, 40, 139, K.nogalD); rect(46, 128, 56, 145, K.frisoS); rect(46, 128, 56, 129, K.frisoL); rect(49, 134, 53, 136, K.papel); }
  // el helecho de encima y una caja de cartón
  rect(14, 28, 24, 33, K.barro); rect(13, 27, 25, 28, K.barroL); rect(14, 32, 24, 33, K.barroS);
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.52, l = 9 + (k % 3) * 3; for (let i = 0; i < l; i++) { const x = 19 + Math.cos(a) * i * 1.1, y = 27 + Math.sin(a) * i * 0.5 + i * i * 0.07 - 3; pset(Math.round(x), Math.round(y), i % 3 ? K.hoja : K.hojaL); if (i % 2) pset(Math.round(x), Math.round(y) + 1, K.hojaS); } }
  rect(38, 27, 58, 33, K.papelS); rect(38, 27, 58, 27, K.papel); rect(38, 27, 39, 33, K.nogalL); rect(57, 27, 58, 33, K.nogalL); rect(44, 29, 52, 30, K.nogalS);
  // LA VENTANA (el hueco queda vacío), su alféizar con una maceta, las cortinas recogidas, la barra y el radiador
  { const [a, b, c, d] = G.ventana; rect(a - 5, b - 5, c + 5, d + 5, K.k); rect(a - 4, b - 4, c + 4, d + 4, K.marco); rect(a - 4, b - 4, c + 4, b - 4, K.blanco); rect(a - 1, b - 1, c + 1, d + 1, K.marcoS); rect(a, b, c, d, G_WHVACIO);
    rect(a + 18, b, a + 20, d, K.marco); rect(a + 18, b, a + 18, d, K.blanco); rect(a + 20, b, a + 20, d, K.marcoS); rect(a, b + 26, c, b + 27, K.marco); rect(a, b + 26, c, b + 26, K.blanco);
    rect(a - 9, d + 3, c + 9, d + 7, K.k); rect(a - 8, d + 4, c + 8, d + 5, K.blanco); rect(a - 8, d + 6, c + 8, d + 6, K.marcoS);
    rect(c - 12, d - 5, c - 4, d, K.barro); rect(c - 12, d - 5, c - 4, d - 5, K.barroL); for (let k = 0; k < 5; k++) linea(c - 8, d - 6, c - 12 + k * 2, d - 13 + (k % 2) * 2, K.hoja); disco(c - 9, d - 13, 1, K.rojo); disco(c - 6, d - 12, 1, K.rosa);
    // las cortinas recogidas con su abrazadera, a los dos lados, y la barra
    for (const [x0, s] of [[a - 12, 1], [c + 6, -1]]) for (let y = b - 7; y <= 118; y++) { const at = Math.abs(y - 72) < 3, w = at ? 4 : y < 72 ? 6 : Math.max(4, 7 - (y - 72) * 0.06);
      for (let i = 0; i <= w; i++) { const x = s > 0 ? x0 + i : x0 + 6 - i, f = Math.sin(i * 1.3 + y * 0.04); pset(x, y, at ? K.oro : i === 0 || i === Math.round(w) ? K.cortinaD : f > 0.5 ? K.cortinaL : f < -0.4 ? K.cortinaS : K.cortina); } }
    rect(a - 14, b - 9, c + 14, b - 8, K.k); rect(a - 13, b - 9, c + 13, b - 9, K.oro); disco(a - 14, b - 9, 1, K.oroL); disco(c + 14, b - 9, 1, K.oroL);
    rect(a - 4, 122, c + 4, 146, K.k); for (let x = a - 3; x <= c + 3; x += 4) { rect(x, 123, x + 2, 145, K.metal); rect(x, 123, x, 145, K.metalL); rect(x + 2, 123, x + 2, 145, K.metalS); } rect(a - 3, 123, c + 3, 124, K.metalL); rect(a - 3, 144, c + 3, 145, K.metalS); disco(c + 6, 140, 1, K.oro); }
  // LA PIZARRA de pared
  g_whPizarraNegra(R, ...G.pizarra);
  // la repisa de pared con el catalejo de latón, dos libros tumbados y una piña
  { rect(190, 78, 218, 80, K.k); rect(191, 78, 217, 79, K.nogalL); rect(191, 79, 217, 79, K.nogalS); for (const x of [194, 213]) { linea(x, 81, x + 2, 85, K.k); linea(x + 1, 81, x + 3, 85, K.nogal); }
    for (let x = 191; x <= 217; x++) if (g_whB4(x, 82) < 0.5) g_whTinta(R, x, 81, K.k, 0.15);
    rect(192, 73, 204, 77, K.k); rect(193, 74, 203, 74, K.rojo); rect(193, 75, 203, 75, K.papel); rect(193, 76, 203, 76, K.azul); rect(194, 70, 202, 72, K.k); rect(195, 71, 201, 71, K.verde);
    linea(205, 76, 216, 70, K.k); linea(205, 77, 216, 71, K.oroS); linea(206, 75, 215, 70, K.oroL); disco(216, 70, 1, K.oro); pset(205, 77, K.k);
    disco(198, 67, 2, K.troncoS); pset(197, 66, K.tronco); pset(199, 68, K.tronco); }
  // EL ESCRITORIO contra la pared (tablero y 116; cajonera a la derecha), con la radio, la taza, el papel continuo y un cuaderno
  { const [x0, x1, y] = G.mesa;
    for (let yy = y + 4; yy <= 154; yy++) for (let xx = x0 + 2; xx <= x1 - 2; xx++) if (g_whB4(xx, yy) < 0.5) g_whTinta(R, xx, yy, K.k, 0.25);
    rect(x0, y, x1, y + 4, K.k); rect(x0 + 1, y + 1, x1 - 1, y + 2, K.nogalL); rect(x0 + 1, y + 1, x1 - 1, y + 1, K.nogalB); rect(x0 + 1, y + 3, x1 - 1, y + 3, K.nogalS); for (let xx = x0 + 2; xx < x1; xx++) if (h(xx >> 2, 1, 97) < 0.3) pset(xx, y + 2, K.nogal);
    rect(x0 + 2, y + 5, x0 + 5, 154, K.k); rect(x0 + 3, y + 5, x0 + 4, 153, K.nogal); rect(x0 + 3, y + 5, x0 + 3, 153, K.nogalL);
    rect(x1 - 30, y + 5, x1 - 2, 154, K.k); rect(x1 - 29, y + 5, x1 - 3, 153, K.nogal);
    for (const [a, b] of [[y + 6, y + 14], [y + 16, y + 25], [y + 27, 151]]) { rect(x1 - 28, a, x1 - 4, b, K.nogalS); rect(x1 - 27, a + 1, x1 - 5, b - 1, K.nogal); rect(x1 - 27, a + 1, x1 - 5, a + 1, K.nogalL); rect(x1 - 19, a + 3, x1 - 13, a + 3, K.oro); pset(x1 - 19, a + 4, K.oroS); pset(x1 - 13, a + 4, K.oroS); }
    rect(x0 + 6, y + 5, x1 - 31, y + 9, K.nogalS); rect(x0 + 6, y + 5, x1 - 31, y + 5, K.k);
    // la radio de transistores (el dial y la aguja van aparte), con su antena telescópica
    rect(x0 + 4, y - 13, x0 + 28, y - 1, K.k); rect(x0 + 5, y - 12, x0 + 27, y - 1, W.radio); rect(x0 + 5, y - 12, x0 + 27, y - 12, W.radioL); rect(x0 + 5, y - 2, x0 + 27, y - 1, W.radioS);
    for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2 === 0) pset(x0 + 7 + i, y - 10 + j, W.radioS);
    rect(x0 + 18, y - 10, x0 + 26, y - 6, K.k); rect(x0 + 19, y - 9, x0 + 25, y - 7, W.dial); disco(x0 + 22, y - 3, 1, K.metalL); rect(x0 + 6, y - 15, x0 + 26, y - 14, K.metalS); rect(x0 + 6, y - 15, x0 + 26, y - 15, K.metalL);
    linea(x0 + 26, y - 13, x0 + 40, y - 34, K.metalS); linea(x0 + 27, y - 13, x0 + 41, y - 34, K.metalL); disco(x0 + 41, y - 35, 1, K.metalL);
    // la taza (el vapor va aparte), un cuaderno abierto y el papel continuo de bandas verdes, plegado y colgando del canto
    rect(x0 + 34, y - 7, x0 + 40, y - 1, K.k); rect(x0 + 35, y - 6, x0 + 39, y - 1, K.blanco); rect(x0 + 35, y - 6, x0 + 39, y - 6, K.cielo3); rect(x0 + 39, y - 5, x0 + 39, y - 2, K.papelS); linea(x0 + 41, y - 5, x0 + 42, y - 3, K.k); pset(x0 + 41, y - 2, K.k);
    poligono([[x0 + 44, y - 1], [x0 + 64, y - 1], [x0 + 62, y - 4], [x0 + 46, y - 4]], K.papel); linea(x0 + 54, y - 4, x0 + 54, y - 1, K.papelD); for (const xx of [x0 + 48, x0 + 58]) linea(xx, y - 3, xx + 3, y - 3, K.azul);
    for (let k = 0; k < 5; k++) { rect(x1 - 26, y - 2 - k * 2, x1 - 6, y - 1 - k * 2, k % 2 ? C.banda : C.papel); rect(x1 - 26, y - 2 - k * 2, x1 - 26, y - 1 - k * 2, C.papelS); pset(x1 - 25, y - 2 - k * 2, C.papelS); pset(x1 - 7, y - 2 - k * 2, C.papelS); }
    rect(x1 - 26, y - 11, x1 - 6, y - 11, K.k);
    for (let yy = y + 1; yy <= y + 22; yy++) { const xs = x1 - 22 + Math.round(Math.sin((yy - y) * 0.3) * 1.2); for (let i = 0; i <= 12; i++) pset(xs + i, yy, i === 0 || i === 12 ? C.papelS : (Math.floor((yy - y) / 3) % 2) ? C.banda : C.papel); if ((yy - y) % 3 === 0) { pset(xs + 1, yy, K.k); pset(xs + 11, yy, K.k); } }
    for (let yy = y + 3; yy <= y + 20; yy += 2) for (let i = 3; i <= 9; i += 2) if (h(i, yy, 98) < 0.7) pset(x1 - 22 + i + Math.round(Math.sin((yy - y) * 0.3) * 1.2), yy, K.papelD); }
  // LA SILLA debajo del embudo, con dos libros gordos en el asiento y el rollo de cinta encima
  { const [x0, x1, y] = G.silla;
    rect(x0, y - 26, x0 + 2, 154, K.k); rect(x0 + 1, y - 25, x0 + 1, 153, K.nogalL); rect(x0 + 2, y - 25, x0 + 2, 153, K.nogalS); for (const yy of [y - 22, y - 14]) { rect(x0, yy, x0 + 6, yy + 2, K.k); rect(x0 + 1, yy + 1, x0 + 5, yy + 1, K.nogal); }
    rect(x0, y, x1, y + 3, K.k); rect(x0 + 1, y + 1, x1 - 1, y + 1, K.nogalB); rect(x0 + 1, y + 2, x1 - 1, y + 2, K.nogal);
    rect(x1 - 3, y + 4, x1 - 1, 154, K.k); rect(x1 - 2, y + 4, x1 - 2, 153, K.nogal); rect(x0 + 4, y + 4, x0 + 6, 154, K.k); rect(x0 + 5, y + 4, x0 + 5, 153, K.nogalS); rect(x0 + 3, 142, x1 - 2, 143, K.k);
    for (let xx = x0 + 3; xx <= x1 - 1; xx++) if (g_whB4(xx, 155) < 0.5) g_whTinta(R, xx, 155, K.k, 0.3);
    rect(x0 + 3, y - 5, x1 - 2, y - 1, K.k); rect(x0 + 4, y - 4, x1 - 3, y - 2, K.azul); rect(x0 + 4, y - 4, x1 - 3, y - 4, K.cielo3); rect(x1 - 5, y - 3, x1 - 3, y - 2, K.papel);
    rect(x0 + 5, y - 10, x1 - 4, y - 6, K.k); rect(x0 + 6, y - 9, x1 - 5, y - 7, K.oroS); rect(x0 + 6, y - 9, x1 - 5, y - 9, K.oro); rect(x1 - 7, y - 8, x1 - 5, y - 7, K.papel);
    disco(x0 + 12, y - 12, 2, K.k); disco(x0 + 12, y - 12, 1, W.cinta); pset(x0 + 12, y - 12, K.k); }
  // el rollo de cinta caído en la tarima, con su tira suelta
  disco(268, 160, 2, K.k); pset(268, 160, W.cintaS); pset(267, 159, W.cinta); pset(269, 159, W.cinta); pset(267, 161, W.cinta); pset(269, 161, W.cinta); linea(270, 161, 276, 162, W.cintaS);
  // EL SILLÓN mostaza (x 266–318) con su cojín (el gato lo pinta g_whEstudio)
  { const x0 = 268, x1 = 319; rect(x0 + 3, 150, x0 + 5, 156, K.k); rect(x1 - 5, 150, x1 - 3, 156, K.k);
    rect(x0 + 4, 104, x1 - 4, 150, K.k); rect(x0 + 5, 105, x1 - 5, 149, K.sillon); rect(x0 + 5, 105, x1 - 5, 106, K.sillonL); for (let y = 108; y < 134; y++) for (let x = x0 + 6; x < x1 - 5; x++) if ((x + y) % 5 === 0 && h(x, y, 173) < 0.5) pset(x, y, K.sillonS);
    rect(x0, 122, x0 + 9, 150, K.k); rect(x0 + 1, 123, x0 + 8, 149, K.sillon); rect(x0 + 1, 123, x0 + 8, 124, K.sillonL); rect(x0 + 8, 125, x0 + 8, 149, K.sillonS); rect(x1 - 9, 122, x1, 150, K.k); rect(x1 - 8, 123, x1 - 1, 149, K.sillon); rect(x1 - 8, 123, x1 - 1, 124, K.sillonL);
    rect(x0 + 10, 136, x1 - 10, 137, K.sillonL); rect(x0 + 10, 138, x1 - 10, 149, K.sillonS); rect(x0 + 10, 143, x1 - 10, 143, K.sillonD); for (let x = x0 + 11; x < x1 - 10; x += 2) pset(x, 149, K.sillonD);
    rect(x0 + 12, 116, x0 + 24, 130, K.k); rect(x0 + 13, 117, x0 + 23, 129, K.friso); for (let y = 117; y <= 129; y++) for (let x = x0 + 13; x <= x0 + 23; x++) if ((x - y) % 4 === 0) pset(x, y, K.alfombraL); }
}
// EL ESTUDIO (general): la vista del parque por la ventana, lo fijo encima, y lo que se mueve: la marca de tiza, la
// radio (la aguja que busca y el piloto), el vapor de la taza, el reloj, la lámpara, el embudo con su vaso y su cinta,
// el cuadro, el gato, la polilla de la lámpara, las motas de sol, y el ruido del vecino (o.ruido 1 y 2)
function g_whEstudio(R, t, o = {}) {
  const K = g_whK, W = g_whW, G = G_WHEST, { pset, linea, disco } = R, ru = o.ruido || 0, ore = o.oreja == null ? 1 : g_whCl(o.oreja), luz = ['tarde', 'noche'].includes(o.luz) ? o.luz : 'dia';
  g_whVistaParque(R, t, ...G.ventana);
  g_whPegar(R, g_whCapa(R, 'estudio37', () => g_whEstudioFijo(R)));
  // el reflejo del cristal de la ventana
  { const [a, b, c, d] = G.ventana; for (let i = 0; i < 18; i++) { const x = a + 4 + i, y = d - 4 - i * 2; if (y > b) { g_whTinta(R, x, y, K.blanco, 0.3); g_whTinta(R, x + 1, y, K.blanco, 0.2); } } }
  // la marca de tiza (o.pizarra 0–1): un palo vertical que baja trazo a trazo, con el polvo que suelta
  const pz = g_whCl(o.pizarra || 0), ym = 48 + Math.round(pz * 28);
  if (pz > 0) { for (let y = 48; y <= ym; y++) { pset(139, y, h(139, y, 99) < 0.2 ? W.tizaS : W.tiza); pset(140, y, h(140, y, 99) < 0.12 ? W.tizaS : W.tiza); if (h(141, y, 99) < 0.6) pset(141, y, W.tizaS); }
    if (pz < 1) for (let k = 0; k < 3; k++) { const f = (t * 1.3 + k / 3) % 1; pset(141 + k - 1, ym + Math.round(f * 12), W.tizaS); } }
  // la radio: la aguja del dial que busca despacio y el piloto que late
  { const [x0, , y] = G.mesa; const ax = x0 + 19 + Math.round((Math.sin(t * 0.37) * 0.5 + 0.5) * 6); linea(ax, y - 9, ax, y - 7, K.rojo); pset(x0 + 7, y - 13, Math.sin(t * 3) > 0 ? K.verdeL : K.verdeS);
    // el vapor de la taza
    for (let k = 0; k < 3; k++) { const f = ((t * 0.6 + k / 3) % 1), y2 = y - 9 - Math.round(f * 14), x2 = x0 + 37 + Math.round(Math.sin(t * 2 + k * 2 + f * 5) * 2); if (f < 0.85) { pset(x2, y2, K.blanco); if (f < 0.5) pset(x2 + 1, y2 - 1, K.papel); } } }
  // el reloj de pared, con su segundero
  { const [cx, cy] = G.reloj, { k } = K; disco(cx, cy + 1, 8, hex('#c8b896')); disco(cx, cy, 8, K.k); disco(cx, cy, 7, K.nogal); disco(cx, cy, 6, K.blanco);
    for (let a = 0; a < 12; a++) pset(cx + Math.round(Math.sin(a * Math.PI / 6) * 5), cy - Math.round(Math.cos(a * Math.PI / 6) * 5), a % 3 ? K.papelD : k);
    const as = Math.floor(t) * Math.PI / 30, am = t * 0.02 + 1.2, ah = 3.3; linea(cx, cy, cx + Math.round(Math.sin(ah) * 3), cy - Math.round(Math.cos(ah) * 3), k); linea(cx, cy, cx + Math.round(Math.sin(am) * 4), cy - Math.round(Math.cos(am) * 4), k); linea(cx, cy, cx + Math.round(Math.sin(as) * 5), cy - Math.round(Math.cos(as) * 5), K.rojo); pset(cx, cy, K.oro); }
  // el ruido del vecino: 1 la aspiradora (tiembla todo un poco), 2 los tres golpecitos (la lámpara se mece después)
  const T3 = ru === 2 ? g_whToques(t, o) : null, tiembla = ru === 1 ? (Math.floor(t * 28) % 2 ? 1 : 0) : 0;
  const mece = T3 && T3.golpe >= 0 ? Math.sin((T3.u - G_WHTOQUES[T3.golpe]) * 40) * 0.22 * Math.exp(-(T3.u - G_WHTOQUES[T3.golpe]) * 6) * (1 + T3.golpe * 0.25) : 0;
  // la lámpara de techo (se mece con los golpes; si no, apenas respira) y su luz en la pared y el escritorio
  const [lx, ly0, ll] = G.lampara, bomb = g_whLampara(R, lx, ly0, ll, mece + Math.sin(t * 0.7) * 0.015 + (ru === 1 ? tiembla * 0.02 : 0));
  for (let y = bomb[1] + 3; y <= 116; y++) { const w = (y - bomb[1]) * 0.55; for (let x = Math.round(bomb[0] - w); x <= bomb[0] + w; x++) if (g_whB4(x, y) < 0.16 && x > 187 && x < 236) g_whTinta(R, x, y, K.luz, 0.35); }
  g_whPolilla(R, bomb[0], bomb[1] + 4, t, 9, 5, 3);
  // el cuadro de la antena (tiembla con la aspiradora)
  g_whCuadro(R, ...G.cuadro, t, 1, ru === 1 ? 1 : 0);
  // EL EMBUDO con su vaso: pegado al techo con dos tiras de cinta (o.oreja 1) o bajando (o.oreja < 1)
  const [ex, ey0] = G.embudo, baja = Math.round((1 - ore) * 30), ex2 = ex + (ru === 1 ? tiembla : 0), ey = ey0 + baja;
  if (baja > 0) for (let i = -10; i <= 10; i++) if (g_whB4(ex + i, 12) < 0.4 * (1 - baja / 30)) g_whTinta(R, ex + i, 13, K.k, 0.2);   // su sombra en el techo
  const vaso = g_whEmbudo(R, ex2, ey, 1);
  if (ore >= 1) { g_whCinta(R, ex2 - 9, ey + 4, ex2 - 17, ey - 4, 2); g_whCinta(R, ex2 + 9, ey + 4, ex2 + 17, ey - 4, 2); }
  // la aspiradora: rayitas de vibración que tiemblan en el techo y polvo de yeso que cae
  if (ru === 1) {
    for (let k = 0; k < 6; k++) { const x = 206 + k * 13 + ((Math.floor(t * 14) + k) % 2), y = 6 + (k % 2) * 6 + ((Math.floor(t * 11) + k) % 2);
      if (x < 276 && Math.abs(x - ex) > 14) { linea(x - 3, y, x + 3, y, W.grieta); linea(x - 3, y, x - 2, y - 1, W.grieta); linea(x + 2, y + 1, x + 3, y, W.grieta); } }
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const x = ex + s * (12 + k * 3) + (Math.floor(t * 20) % 2), y = ey + 8 + k * 6; linea(x, y, x, y + 3, K.k); }
    for (let k = 0; k < 10; k++) { const f = (t * (0.7 + (k % 3) * 0.2) + h(k, 1, 100)) % 1, x = Math.round(ex - 22 + h(k, 2, 100) * 44 + Math.sin(t * 2 + k) * 2), y = 13 + Math.round(f * 140); if (y < 150) pset(x, y, k % 2 ? K.blanco : W.techoD); } }
  // los tres golpecitos: tres ondas de puntos que bajan del techo por el embudo, una tras otra
  if (T3 && T3.golpe >= 0 && T3.f < 1) { const f = T3.f;
    for (const dr of [0, 5]) for (let a = 0.15; a <= Math.PI - 0.15; a += 0.07) { const r = 8 + f * 38 - dr, x = Math.round(ex + Math.cos(a) * r * 1.3), y = Math.round(6 + Math.sin(a) * r); if (r > 4 && Math.round(a * 14) % 3 && x > 192 && x < 277 && y > 3) pset(x, y, dr ? W.grieta : (f < 0.6 ? K.k : W.grieta)); }
    if (f < 0.35) { for (const [dx, dy] of [[-17, -1], [17, -1], [-21, 3], [21, 3], [-13, -4], [13, -4]]) { pset(ex + dx, 6 + dy, K.k); pset(ex + dx + Math.sign(dx), 6 + dy - 1, K.k); } } }
  // EL GATO en el sillón, que mira hacia el embudo (y levanta las orejas con el ruido)
  g_whGato(R, 286, 134, t, { dir: -1 });
  if (ru) { pset(283, 115 - (Math.floor(t * 6) % 2), K.k); pset(289, 115 - (Math.floor(t * 6 + 1) % 2), K.k); }
  // motas en la luz de la ventana
  if (luz !== 'noche') for (let k = 0; k < 7; k++) { const x = 70 + Math.round(h(k, 1, 77) * 50 + Math.sin(t * 0.5 + k) * 3), y = 100 + Math.round((h(k, 2, 77) * 44 + t * (1.5 + k % 3)) % 44); if (Math.sin(t * 1.4 + k * 1.9) > 0.3) pset(x, y, K.solL); }
  // la hora (o.luz): de tarde todo se entibia; de noche, la penumbra azul con el cono de la lámpara, la ventana con la
  // luna y la farola, la bombilla que brilla y la polilla en su luz
  if (luz !== 'dia') { d_whLuz(R, luz, bomb, 0, 0, 319, 179, 158);
    if (luz === 'noche') { d_whVentanaNoche(R, t, ...G.ventana, 84, 78); R.disco(bomb[0], bomb[1] + 1, 2, D_WHCAL); R.pset(bomb[0], bomb[1] + 1, K.blanco); g_whPolilla(R, bomb[0], bomb[1] + 4, t, 12, 6, 0); } }
  R.recorte(null);
  const golpe = T3 ? (T3.f < 1 ? T3.golpe : -1) : -1;
  return { embudo: [ex2, ey], vaso, silla: [247, G.silla[2] - 10], marca: [140, ym], lampara: bomb, toc: [ex, 4], toques: G_WHTOQUES.slice(), golpe };
}
// DELANTE EN EL ESTUDIO: la maceta con el ficus, abajo a la izquierda (fuera de libre), que se mece despacio
function g_whEstudioDelante(R, t, o = {}) {
  const K = g_whK, { rect, pset, linea, disco } = R;
  rect(6, 158, 28, 179, K.k); rect(7, 159, 27, 179, K.barro); rect(7, 159, 27, 160, K.barroL); rect(24, 161, 27, 179, K.barroS); rect(5, 156, 29, 159, K.k); rect(6, 157, 28, 158, K.barroL); for (let y = 164; y < 179; y += 5) rect(8, y, 23, y, K.barroS);
  rect(9, 155, 25, 156, K.troncoS);
  const m = Math.sin(t * 0.8) * 1.2; linea(17, 156, 16, 128, K.troncoS); linea(18, 156, 17, 128, K.tronco);
  for (let k = 0; k < 16; k++) { const a = -2.9 + (k % 8) * 0.4, l = 9 + (k % 3) * 3, bx = 17 + Math.round(m * (1 - k / 20)), by = 120 + Math.floor(k / 2) * 4;
    const x = bx + Math.round(Math.cos(a) * l), y = by + Math.round(Math.sin(a) * l * 0.5) + 2; linea(bx, by, x, y, K.hojaS);
    disco(x, y, 2, k % 3 ? K.hoja : K.hojaS); pset(x - 1, y - 1, K.hojaL); }
  for (let k = 0; k < 5; k++) { const x = 10 + Math.round(h(k, 1, 101) * 16 + m), y = 116 + Math.round(h(k, 2, 101) * 36); disco(x, y, 2, K.hojaD); pset(x, y - 1, K.hojaB); }
  d_whLuz(R, o.luz, [200, 44], 0, 0, 319, 179, 158);
  return { maceta: [6, 112, 32, 179] };
}

const G_WHTEC = { boca: [176, 30], lampara: [52, 30, 54] };

// LO FIJO DEL TECHO DE CERCA: el yeso con su grieta, la mancha de la gotera y el rosetón; la moldura y el papel a
// escala 2 y la telaraña colgada de la moldura
function g_whTechoFijo(R) {
  const K = g_whK, W = g_whW, { pset, linea, disco } = R;
  g_whTechoYeso(R, 0, 61, 2);
  // la grieta, que se ramifica
  { const P = [[132, 61], [140, 55], [151, 52], [160, 49], [168, 44], [180, 40], [196, 35], [214, 33], [230, 28]]; for (let i = 0; i < P.length - 1; i++) { linea(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1], W.grieta); pset(P[i][0], P[i][1] + 1, W.techoS); }
    linea(196, 35, 202, 42, W.grieta); linea(214, 33, 220, 24, W.grieta); }
  // la mancha de una gotera vieja (dos anillos tramados)
  for (let j = -10; j <= 10; j++) for (let i = -26; i <= 26; i++) { const d = Math.hypot(i / 26, j / 10); if (d < 1 && (d > 0.86 || (d > 0.55 && d < 0.6)) && g_whB4(100 + i, 40 + j) < 0.6) pset(100 + i, 40 + j, W.mancha); }
  // el rosetón de la lámpara
  { const [x, y] = G_WHTEC.lampara; for (let i = -14; i <= 14; i++) { const r = Math.round(4 * Math.sqrt(1 - (i / 14) ** 2)); for (let j = -r; j <= r; j++) pset(x + i, y + j, j > r - 2 ? W.techoD : (i + j) % 4 === 0 ? W.techoS : K.blanco); } }
  g_whMoldura(R, 62, 2);
  g_whPapel(R, 0, 75, 319, 179, 2);
  // la telaraña colgada de la moldura, en la esquina de la izquierda
  { const cx = 6, cy = 75; for (let k = 0; k < 6; k++) { const a = 0.15 + k * 0.27; linea(cx, cy, cx + Math.round(Math.cos(a) * 34), cy + Math.round(Math.sin(a) * 26), hex('#f4f2ee')); }
    for (let r = 6; r <= 30; r += 6) for (let a = 0.15; a < 1.5; a += 0.04) { const x = Math.round(cx + Math.cos(a) * r * 1.2), y = Math.round(cy + Math.sin(a) * r * 0.85 + Math.sin(a * 5) * 0.6); if (h(x, y, 102) < 0.75) pset(x, y, hex('#e6e2da')); } }
}

// EL TECHO DE CERCA (cámara 'techo'): lo fijo, la lámpara que asoma y se mece con su halo, la mosca del techo, el
// cuadro que asoma abajo a la derecha, la araña que sube y baja, y EL EMBUDO a escala 3 con su sombra en el papel y sus
// tres tiras de cinta (o.oreja: baja hasta D_WHCAIDA px; o.ruido como en 'estudio')
function g_whTecho(R, t, o = {}) {
  const K = g_whK, W = g_whW, { pset, linea } = R, ru = o.ruido || 0, ore = o.oreja == null ? 1 : g_whCl(o.oreja);
  g_whPegar(R, g_whCapa(R, 'techo37', () => { g_whTechoFijo(R); d_whTechoExtra(R); }));
  const T3 = ru === 2 ? g_whToques(t, o) : null, tiembla = ru === 1 ? (Math.floor(t * 28) % 2 ? 1 : 0) : 0;
  const mece = T3 && T3.golpe >= 0 ? Math.sin((T3.u - G_WHTOQUES[T3.golpe]) * 40) * 0.22 * Math.exp(-(T3.u - G_WHTOQUES[T3.golpe]) * 6) * (1 + T3.golpe * 0.25) : 0;
  // la lámpara del techo, que asoma a la izquierda
  const [lx, ly, ll] = G_WHTEC.lampara, am = mece + Math.sin(t * 0.7) * 0.02, bl = [Math.round(lx + Math.sin(am) * ll), Math.round(ly + Math.cos(am) * ll)];
  // el halo cálido de la bombilla en el papel, que late apenas (por detrás de la lámpara)
  { const v = 0.32 + Math.sin(t * 9) * Math.sin(t * 2.3) * 0.04; for (let yy = bl[1] - 14; yy <= bl[1] + 40; yy++) for (let xx = bl[0] - 46; xx <= bl[0] + 46; xx++) { if (yy < 76 || xx < 0) continue; const d = Math.hypot((xx - bl[0]) / 46, (yy - bl[1] - 10) / 30); if (d < 1 && g_whB4(xx, yy) < (1 - d) * v) g_whTinta(R, xx, yy, K.luz, 0.35); } }
  g_whLampara(R, lx, ly, ll, am, 2);
  // LA MOSCA que se pasea por el techo: anda a saltitos, se para, se frota las patas y a ratos cruza volando
  { const c = (t * 0.09) % 1, vuela = c > 0.78; let fx, fy;
    if (vuela) { const u = (c - 0.78) / 0.22; fx = 250 - u * 50 + Math.sin(u * 20) * 4; fy = 46 - Math.sin(u * Math.PI) * 14; }
    else { const u = c / 0.78, paso = Math.floor(u * 14) / 14; fx = 200 + paso * 50 + Math.sin(paso * 9) * 3; fy = 44 + Math.round(Math.sin(paso * 7) * 5); }
    fx = Math.round(fx); fy = Math.round(fy);
    if (!(fx > 270 && fy < 48)) { pset(fx, fy, K.k); pset(fx + 1, fy, K.k); pset(fx, fy + 1, hex('#3a3a44'));
      if (vuela) { const a = Math.floor(t * 30) % 2; pset(fx - 1, fy - 1 - a, hex('#c8d8e8')); pset(fx + 2, fy - 1 - a, hex('#c8d8e8')); } else { pset(fx - 1, fy - 1, hex('#b8c8d8')); pset(fx + 2, fy - 1, hex('#b8c8d8')); if (Math.sin(t * 13) > 0.6) pset(fx - 1, fy + 1, K.k); } } }
  // la araña, que sube y baja por su hilo
  { const y = 92 + Math.round((Math.sin(t * 0.6) * 0.5 + 0.5) * 30); linea(26, 80, 26, y, hex('#d8d4cc')); pset(26, y + 1, K.k); pset(25, y + 1, K.k); pset(27, y + 1, K.k); pset(26, y + 2, K.k); for (const s of [-1, 1]) { pset(26 + 2 * s, y + (Math.floor(t * 4) % 2), K.k); pset(26 + 2 * s, y + 2, K.k); } }
  // el cuadro de la antena, que asoma abajo a la derecha (tiembla con la aspiradora)
  g_whCuadro(R, 246, 132, t, 2, ru === 1 ? 1 : 0);
  // el reloj de pared a escala 2, con su segundero (tiembla con la aspiradora)
  { const cx = 70 + tiembla, cy = 140; R.disco(cx + 2, cy + 3, 16, hex('#c8b896')); R.disco(cx, cy, 16, K.k); R.disco(cx, cy, 14, K.nogal); R.disco(cx - 1, cy - 1, 13, K.nogalL); R.disco(cx, cy, 12, K.oroS); R.disco(cx, cy, 11, K.blanco);
    for (let a = 0; a < 12; a++) { const xx = cx + Math.round(Math.sin(a * Math.PI / 6) * 9), yy = cy - Math.round(Math.cos(a * Math.PI / 6) * 9); pset(xx, yy, K.k); if (a % 3 === 0) pset(xx + 1, yy, K.k); }
    const as = Math.floor(t) * Math.PI / 30, am = t * 0.02 + 1.2, ah = 3.3; linea(cx, cy, cx + Math.round(Math.sin(ah) * 5), cy - Math.round(Math.cos(ah) * 5), K.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 8), cy - Math.round(Math.cos(am) * 8), K.k); linea(cx, cy, cx + Math.round(Math.sin(as) * 10), cy - Math.round(Math.cos(as) * 10), K.rojo); R.disco(cx, cy, 1, K.oro);
    for (let i = -6; i <= 6; i++) if (g_whB4(cx + i, cy - 9) < 0.5) g_whTinta(R, cx + i - 4, cy - 8 + Math.abs(i) / 3, K.blanco, 0.4); }
  // el embudo (baja hasta D_WHCAIDA px si o.oreja < 1, y el vaso queda dentro del cuadro; su sombra en el techo crece
  // al acercarse)
  const [bx, by0] = G_WHTEC.boca, baja = Math.round((1 - ore) * D_WHCAIDA), x = bx + tiembla, y = by0 + baja;
  if (baja > 0) for (let j = -5; j <= 5; j++) for (let i = -34; i <= 34; i++) if (Math.hypot(i / 34, j / 5) < 1 && g_whB4(bx + i, by0 + 1 + j) < 0.4 * (1 - baja / D_WHCAIDA)) g_whTinta(R, bx + i, by0 + 1 + j, K.k, 0.2);
  // su sombra en el papel de la pared (la lámpara alumbra desde la izquierda): la silueta del cono, el pitorro y el
  // vaso, corrida a la derecha y tramada
  for (let yy = 77; yy <= 179; yy++) { const q = yy - 8 - y; let r = q < 0 ? -1 : q <= 60 ? 39 - 31.5 * q / 60 : q <= 81 ? 6 : q <= 118 ? 12 + 6 * (q - 82) / 36 : -1; if (r < 0) continue;
    const cx = x + 14; for (let xx = Math.round(cx - r); xx <= cx + r; xx++) if (g_whB4(xx, yy) < 0.5) g_whTinta(R, xx, yy, K.k, 0.13); }
  const vaso = g_whEmbudo(R, x, y, 3);
  if (ore >= 1) { g_whCinta(R, x - 30, y + 9, x - 40, y - 7, 7); g_whCinta(R, x + 30, y + 9, x + 40, y - 7, 7); g_whCinta(R, x + 4, y + 14, x + 5, y - 6, 7); }
  // la aspiradora: rayitas de vibración en el techo y polvo de yeso de la grieta
  if (ru === 1) {
    for (let k = 0; k < 8; k++) { const s = k % 2 ? 1 : -1, xx = bx + s * (58 + (k >> 1) * 12) + ((Math.floor(t * 14) + k) % 2), yy = 30 + (k >> 1) * 7 + ((Math.floor(t * 11) + k) % 2);
      if (xx > 8 && xx < 270) { linea(xx - 5, yy, xx + 5, yy, W.grieta); linea(xx - 5, yy, xx - 3, yy - 2, W.grieta); linea(xx + 3, yy + 2, xx + 5, yy, W.grieta); } }
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const xx = x + s * (34 - k * 6) + (Math.floor(t * 20) % 2) * s, yy = y + 14 + k * 14; linea(xx, yy, xx, yy + 6, K.k); }
    for (let k = 0; k < 16; k++) { const f = (t * (0.6 + (k % 3) * 0.2) + h(k, 1, 103)) % 1, xx = Math.round(140 + h(k, 2, 103) * 100 + Math.sin(t * 2 + k) * 2), yy = 36 + Math.round(f * 140); pset(xx, yy, k % 2 ? K.blanco : W.techoD); if (k % 3 === 0) pset(xx + 1, yy, W.techoS); } }
  // los tres golpecitos: el anillo en el techo y la onda que baja por el cono como chevrones de luz hasta el vaso
  if (T3 && T3.golpe >= 0 && T3.f < 1) { const f = T3.f;
    if (f < 0.5) for (let a = 0; a < Math.PI * 2; a += 0.08) { const r = 10 + f * 80, xx = Math.round(bx + Math.cos(a) * r * 1.4), yy = Math.round(30 + Math.sin(a) * r * 0.3); if (Math.round(a * 12) % 2 === 0 && yy < 61 && yy > 21) pset(xx, yy, W.grieta); }
    const yb = y + Math.round(f * 100); for (let i = -10; i <= 10; i++) { const yy = yb - Math.abs(i); if (yy > y + 4 && yy < vaso[1]) { pset(x + i * 2, yy, K.oroL); pset(x + i * 2 + 1, yy, K.blanco); } }
    if (f < 0.3) for (const [dx, dy] of [[-10, -6], [10, -6], [-16, 0], [16, 0], [0, -10]]) pset(bx + dx, 30 + dy, K.oro); }
  const golpe = T3 ? (T3.f < 1 ? T3.golpe : -1) : -1;
  R.recorte(null);
  return { embudo: [vaso[0], vaso[1] + 1], boca: [x, y], techo: by0, caida: D_WHCAIDA, toc: [bx, 22], toques: G_WHTOQUES.slice(), golpe };
}
const G_WHDES = { pizarra: [60, 40, 220, 110], ventana: [238, 42, 272, 104], reloj: [228, 54], perchero: 300, atomo: [100, 74], onda: [132, 66, 206] };

// los paneles de madera oscura (de y0 a y1): tablas verticales con sus vetas y, cada tanto, un cuarterón con su moldura
function g_whPaneles(R, y0, y1, calma = null) {
  const W = g_whW;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(x / 20), r = x % 20, v = Math.sin(r * 1.1 + tb * 2.3 + Math.sin(y * 0.045 + tb) * 2.2), nudo = Math.hypot(r - 6 - (tb % 3) * 3, (y - 40 - (tb * 37) % 90) * 0.5);
    let c = r === 0 ? W.madD : r === 1 ? W.madL : nudo < 2.5 ? (nudo < 1.2 ? W.madD : W.madS) : v > 0.86 ? W.madS : v < -0.92 ? W.madL : h(x, y >> 3, 104) < 0.05 ? W.madS : W.mad;
    if (calma && calma(x, y)) c = r === 0 ? W.madS : W.mad;
    R.pset(x, y, c); }
}

// el árbol de otoño (copa de bolas en tres tonos naranjas y rojos que se mece), recortado a lo que diga R.recorte
function g_whArbolOtono(R, cx, base, r, t, k) {
  const W = g_whW, m = Math.round(Math.sin(t * 0.9 + k * 2) * 1.2);
  R.linea(cx, base, cx, base - r - 4, W.baqu); R.linea(cx + 1, base, cx + 1, base - r - 4, hex('#5a4030'));
  R.disco(cx + m, base - r - 6, r, W.ot3); R.disco(cx + m - 1, base - r - 7, r - 1, W.ot1); R.disco(cx + m - 2, base - r - 8, r - 3, W.ot0); R.disco(cx + m - 3, base - r - 9, Math.max(1, r - 6), W.ot2);
  for (let j = 0; j < 6; j++) R.pset(cx + m + Math.round((h(k, j, 105) - 0.5) * r * 1.5), base - r - 6 + Math.round((h(k, j, 106) - 0.5) * r * 1.3), j % 2 ? W.ot2 : W.ot4);
}

// EL CAMPUS EN OTOÑO por la ventana del despacho, recortado a su hueco: el cielo con nubes de tres tonos a tres
// velocidades y pájaros, el ala de ladrillo de otro edificio con sus ventanas, árboles de otoño, el césped con hojas,
// el sendero y un estudiante que pasa con sus libros; hojas que caen
function g_whVistaCampus(R, t, x0, y0, x1, y1) {
  const K = g_whK, W = g_whW, hor = y0 + Math.round((y1 - y0) * 0.6);
  R.recorte([x0, y0, x1, y1]);
  g_whCielo(R, t, x0, y0, x1, hor, { esc: 0.5, capas: [[0.8, 0.5, 1.2, 3, 0], [0.5, 0.75, 2.4, 2, 1], [0.2, 1, 4.2, 2, 2]] });
  for (let k = 0; k < 2; k++) { const u = ((t * (5 + k * 2) + k * 19) % (x1 - x0 + 30)); g_whPajaro(R, Math.round(x1 + 10 - u), y0 + 8 + k * 6 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#3a4a6a'), x0, x1); }
  // el ala de ladrillo de enfrente, con su cornisa blanca y sus ventanas
  for (let y = hor - 22; y <= hor; y++) for (let x = x0 + 14; x <= x1; x++) { const fila = y - hor + 22; let c = fila < 2 ? K.blanco : (fila % 3 === 2 || ((x + (Math.floor(fila / 3) & 1) * 3) % 6 === 0)) ? hex('#7a3a2a') : hex('#a4503a');
    if (fila > 5 && fila < 14 && (x - x0 - 18) % 9 < 5 && x > x0 + 16) c = (x - x0 - 18) % 9 === 0 || fila === 6 ? K.blanco : hex('#5a6a8a'); R.pset(x, y, c); }
  // el césped con hojas caídas y el sendero
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = h(x, y, 107); R.pset(x, y, q < 0.08 ? W.ot0 : q < 0.13 ? W.ot1 : (y - hor) < 2 ? K.cespedS : ((x + (y - hor) * 2) >> 3) & 1 ? K.cesped : hex('#6aa04a')); }
  for (let y = hor + 4; y <= y1; y++) { const cx = x0 + 20 + Math.round((y - hor) * 0.6), w = 2 + ((y - hor) >> 3); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w ? K.sendaS : K.senda); }
  // el estudiante que pasa con sus libros bajo el brazo
  { const an = x1 - x0 + 16, x = Math.round(x0 - 8 + ((t * 3.5) % an)), y = hor + 8, p = Math.floor(t * 4) % 2; R.linea(x, y - 6, x, y - 2, hex('#2a3a5a')); R.pset(x, y - 7, hex('#f0c8a0')); R.pset(x, y - 8, hex('#3a2a1a')); R.pset(x - p, y - 1, K.k); R.pset(x + 1 - p, y, K.k); R.pset(x + 1, y - 4, K.rojo); R.pset(x + 1, y - 5, hex('#d8c070')); }
  g_whArbolOtono(R, x0 + 8, hor + 6, 9, t, 0); g_whArbolOtono(R, x1 - 6, hor + 10, 11, t, 1);
  // las hojas que caen, dando vueltas
  for (let k = 0; k < 6; k++) { const f = (t * 0.18 + h(k, 1, 108)) % 1, x = Math.round(x0 + h(k, 2, 108) * (x1 - x0) + Math.sin(t * 2 + k) * 3 - f * 6), y = Math.round(y0 + f * (y1 - y0)); R.pset(x, y, [W.ot0, W.ot1, W.ot2][k % 3]); if (Math.sin(t * 5 + k) > 0) R.pset(x + 1, y, W.ot3); }
  R.recorte(null);
}

// LO FIJO DEL DESPACHO: yeso y moldura arriba, paneles de madera oscura, la pizarra verde con el dibujo de tiza, la
// estantería, la ventana (hueco vacío), el radiador, el perchero, el suelo de espiga y la alfombra
function g_whDespachoFijo(R) {
  const K = g_whK, W = g_whW, G = G_WHDES, { rect, pset, linea, disco } = R;
  // los paneles de madera oscura de arriba abajo (tranquilos bajo el año y tras Atom)
  g_whPaneles(R, 0, 150, (x, y) => (x >= 262 && y <= 48) || (y <= 22 && x <= 196));
  // la barandilla de la pared (y 116–119) y, debajo, los cuarterones en relieve; el rodapié
  rect(0, 116, 319, 119, W.madD); rect(0, 116, 319, 117, W.madB); rect(0, 118, 319, 118, W.madL);
  for (let x = 6; x < 320; x += 34) { rect(x, 123, x + 27, 142, W.madD); rect(x + 1, 124, x + 27, 142, W.madS); rect(x + 3, 126, x + 25, 140, W.mad); rect(x + 3, 126, x + 25, 126, W.madL); rect(x + 3, 126, x + 3, 140, W.madL); rect(x + 25, 127, x + 25, 140, W.madD); rect(x + 4, 140, x + 25, 140, W.madD); }
  rect(0, 146, 319, 150, W.madD); rect(0, 146, 319, 146, W.madB);
  // una pila de revistas en el suelo junto a la estantería
  for (let k = 0; k < 5; k++) { const yy = 150 - k * 2, dx = (k % 2) * 2; rect(53 + dx, yy - 2, 66 + dx, yy, K.k); rect(54 + dx, yy - 2, 65 + dx, yy - 1, [K.papel, hex('#c8b070'), K.papelS, hex('#a8c0c8'), K.papel][k]); }
  // el suelo de espiga (roble), con su alfombra
  for (let y = 151; y <= 179; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((x + (y - 151) * 2) / 8), g = Math.floor((x - (y - 151) * 2) / 8), dir = (f + g) & 1, r = dir ? (x + (y - 151) * 2) % 8 : (x - (y - 151) * 2 + 800) % 8;
    pset(x, y, r === 0 ? W.robleD : h(f, g, 110) < 0.3 ? W.robleS : h(f, g, 111) > 0.8 ? W.robleL : W.roble); }
  for (let x = 0; x < 320; x++) pset(x, 151, W.robleD);
  for (let y = 158; y <= 178; y++) for (let x = 30; x <= 226; x++) { const u = (y - 158) / 20, xa = 44 - u * 12, xb = 214 + u * 10; if (x < xa || x > xb) continue; const bx = Math.min(x - xa, xb - x), by = Math.min(y - 158, 178 - y);
    pset(x, y, bx < 2 || by < 1 ? hex('#d8c08a') : bx < 5 || by < 3 ? hex('#7a2a2a') : (Math.floor(x / 6) + Math.floor(y / 3)) % 2 && h(x, y, 112) < 0.4 ? hex('#5a2a3a') : hex('#6a3040')); }
  // LA PIZARRA VERDE: marco de roble, la pizarra con los borrones del borrador
  { const [a, b, c, d] = G.pizarra; rect(a - 4, b - 4, c + 4, d + 4, K.k); rect(a - 3, b - 3, c + 3, d + 3, W.roble); rect(a - 3, b - 3, c + 3, b - 3, W.robleL); rect(a - 3, b - 3, a - 3, d + 3, W.robleL); rect(c + 3, b - 2, c + 3, d + 3, W.robleS); rect(a - 1, b - 1, c + 1, d + 1, W.robleD);
    for (let y = b; y <= d; y++) for (let x = a; x <= c; x++) { const sw = Math.sin((x - a) * 0.11 + Math.sin(y * 0.09 + x * 0.02) * 3) > 0.9 && h(x >> 3, y >> 3, 113) < 0.5; pset(x, y, sw ? W.pizVL : h(x >> 1, y, 114) < 0.08 ? W.pizVS : W.pizV); }
    // el dibujo de tiza: el ÁTOMO DE HIDRÓGENO (el núcleo y su órbita, con el electrón) y una flechita hacia la onda
    const [ax, ay] = G.atomo; for (let i = 0; i < 160; i++) { const an = i / 160 * Math.PI * 2, x = Math.round(ax + Math.cos(an) * 24), y = Math.round(ay + Math.sin(an) * 17); if (h(i, 1, 115) < 0.88) pset(x, y, W.tiza); if (h(i, 2, 115) < 0.4) pset(x, y + 1, W.tizaS); }
    disco(ax, ay, 3, W.tiza); pset(ax + 1, ay - 1, K.blanco); pset(ax - 2, ay + 2, W.tizaS); disco(ax + 17, ay - 12, 2, W.tiza);
    // la ONDA (cinco crestas), su «1420» y su «21», y unas rayas de otras cuentas medio borradas
    const [o0, oy, o1] = G.onda; for (let x = o0; x <= o1; x++) { const y = Math.round(oy + Math.sin((x - o0) / (o1 - o0) * Math.PI * 10) * 7); pset(x, y, W.tiza); if (h(x, 3, 115) < 0.5) pset(x, y + 1, W.tizaS); }
    linea(130, 74, 128, 74, W.tiza); for (const [x, y] of [[126, 73], [126, 75]]) pset(x, y, W.tiza);
    for (let x = 140; x <= 200; x += 2) pset(x, 92, W.tizaS);
    R.numero('1420', 170, 82, { color: W.tiza, centro: true, sombra: false }); R.numero('21', 150, 96, { color: W.tiza, centro: true, sombra: false });
    for (const [x, y, l] of [[72, 100, 18], [96, 102, 10], [180, 100, 22], [196, 50, 14]]) for (let i = 0; i < l; i++) if (h(x + i, y, 116) < 0.5) pset(x + i, y, W.pizVB);
    // la repisa con tizas y el borrador
    rect(a - 6, d + 4, c + 6, d + 7, K.k); rect(a - 5, d + 4, c + 5, d + 5, W.robleL); rect(a - 5, d + 6, c + 5, d + 6, W.robleS);
    for (const [x, l] of [[80, 5], [92, 3], [104, 4]]) { rect(x, d + 3, x + l, d + 3, W.tiza); pset(x + l, d + 3, W.tizaS); }
    rect(190, d, 204, d + 3, K.k); rect(191, d, 203, d + 1, W.roble); rect(191, d + 2, 203, d + 3, hex('#4a4a52')); for (let x = 191; x <= 203; x += 2) pset(x, d + 3, W.tizaS);
    for (let i = 0; i < 30; i++) if (h(i, 4, 117) < 0.5) pset(a + 4 + Math.floor(h(i, 5, 117) * (c - a - 8)), d + 4, W.tizaS); }
  // LA ESTANTERÍA de la izquierda (x 2–50): libros de lomos de colores sin letras, una lámpara de válvula y un globo
  { rect(2, 34, 50, 150, K.k); rect(3, 35, 49, 149, W.madS); rect(5, 38, 47, 146, W.madD); rect(3, 35, 49, 36, W.madB);
    const COL = [hex('#7a2a24'), hex('#2a3a6a'), hex('#4a5a2a'), hex('#8a6a2a'), hex('#5a2a4a'), hex('#2a4a4a'), hex('#9a8a6a'), hex('#3a2a1a')];
    [62, 86, 110, 146].forEach((by, b) => { rect(5, by, 47, by + 1, W.madB); rect(5, by + 2, 47, by + 2, K.k);
      let x = 6, n = 0; while (x < 46) { if ((b === 1 && x > 30) || (b === 2 && x < 18)) { x++; continue; } const w = 2 + Math.floor(h(x, b, 118) * 3), a = 12 + Math.floor(h(x, b, 119) * 8); if (x + w > 46) break; g_whLomo(R, x, by - 1, w, Math.min(a, 21), COL[(n * 3 + b) % 8], n); x += w; n++; } });
    // la lámpara de válvula (un tubo de radio de cristal sobre su zócalo) y el globo
    rect(33, 82, 43, 85, K.k); rect(34, 82, 42, 84, K.metalS); for (let y = 66; y <= 81; y++) { const r = y < 69 ? 2 + (y - 66) : 4; for (let i = -r; i <= r; i++) g_whTinta(R, 38 + i, y, W.vaso, 0.35); pset(38 - r - 1, y, K.k); pset(38 + r + 1, y, K.k); } rect(36, 72, 40, 78, K.metalS); pset(38, 70, K.oro);
    disco(12, 102, 6, K.k); disco(12, 102, 5, K.azul); pset(10, 100, K.cielo3); pset(11, 101, K.hoja); pset(13, 103, K.hoja); pset(14, 101, K.hoja); rect(9, 109, 15, 110, K.oroS); }
  // LA FOTO ENMARCADA de un radiotelescopio (el plato blanco en su armazón bajo un cielo de tarde) sobre la pizarra,
  // con su clavo, el cordel y su sombra en el panel
  { const x0 = 178, y0 = 8, x1 = 214, y1 = 31;
    for (let y = y0 + 2; y <= y1 + 2; y++) for (let x = x0 + 2; x <= x1 + 2; x++) if (g_whB4(x, y) < 0.5) g_whTinta(R, x, y, K.k, 0.3);
    linea(x0 + 4, y0, 196, 3, K.k); linea(x1 - 4, y0, 196, 3, K.k); disco(196, 3, 1, K.oroS);
    rect(x0, y0, x1, y1, K.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#1e1a16')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#5a4a3a'));
    rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#e8e0c8'));
    for (let y = y0 + 5; y <= y1 - 5; y++) for (let x = x0 + 5; x <= x1 - 5; x++) { const u = (y - y0 - 5) / (y1 - y0 - 10); pset(x, y, u > 0.78 ? (h(x, y, 136) < 0.3 ? hex('#4a5a3a') : hex('#6a7a4a')) : g_whB4(x, y) < u ? hex('#e8b080') : hex('#8aa8c8')); }
    for (let i = -8; i <= 8; i++) { const yy = 16 + Math.round(i * i / 14); pset(196 + i, yy, K.blanco); pset(196 + i, yy + 1, hex('#b8c0c8')); }
    linea(196, 21, 192, 26, hex('#3a3a44')); linea(196, 21, 200, 26, hex('#3a3a44')); linea(196, 20, 196, 13, hex('#5a5a66')); pset(196, 12, K.rojo); }
  // EL RELOJ eléctrico de pared (las agujas van aparte)
  { const [cx, cy] = G.reloj; disco(cx, cy + 1, 7, W.madD); disco(cx, cy, 7, K.k); disco(cx, cy, 6, K.metalS); disco(cx, cy, 5, K.blanco); for (let a = 0; a < 12; a++) pset(cx + Math.round(Math.sin(a * Math.PI / 6) * 4), cy - Math.round(Math.cos(a * Math.PI / 6) * 4), a % 3 ? K.papelD : K.k); }
  // LA VENTANA (hueco vacío) con su marco blanco de guillotina, el alféizar y el radiador
  { const [a, b, c, d] = G.ventana; rect(a - 4, b - 4, c + 4, d + 4, K.k); rect(a - 3, b - 3, c + 3, d + 3, K.marco); rect(a - 3, b - 3, c + 3, b - 3, K.blanco); rect(a - 1, b - 1, c + 1, d + 1, K.marcoS); rect(a, b, c, d, G_WHVACIO);
    rect(a, b + 30, c, b + 32, K.marco); rect(a, b + 30, c, b + 30, K.blanco); rect(a + 16, b, a + 17, d, K.marco);
    // la persiana veneciana, medio subida, con su cordón y su borla
    for (let y = b; y <= b + 16; y++) { const r = (y - b) % 3; rect(a, y, c, y, r === 0 ? K.k : r === 1 ? hex('#ece4cc') : hex('#c8bea2')); } rect(a, b + 17, c, b + 18, hex('#a89c80')); rect(a, b + 18, c, b + 18, K.k);
    linea(c - 3, b + 18, c - 3, b + 30, hex('#d8d0b8')); disco(c - 3, b + 31, 1, hex('#c8a060'));
    rect(a - 7, d + 3, c + 7, d + 7, K.k); rect(a - 6, d + 4, c + 6, d + 5, K.blanco); rect(a - 6, d + 6, c + 6, d + 6, K.marcoS);
    rect(a - 2, 116, c + 2, 144, K.k); for (let x = a - 1; x <= c + 1; x += 4) { rect(x, 117, x + 2, 143, K.metal); rect(x, 117, x, 143, K.metalL); rect(x + 2, 117, x + 2, 143, K.metalS); } rect(a - 1, 117, c + 1, 118, K.metalL); }
  // EL PERCHERO de pie con la gabardina y el sombrero
  { const x = G.perchero; rect(x - 1, 54, x + 1, 152, K.k); rect(x, 54, x, 151, W.madB); for (const s of [-1, 1]) { linea(x, 148, x + s * 9, 153, K.k); linea(x, 147, x + s * 9, 152, W.madL); } for (const s of [-1, 1]) { linea(x, 60, x + s * 6, 56, K.k); disco(x + s * 6, 56, 1, W.madB); } disco(x, 53, 2, K.k); pset(x, 52, W.madB);
    // la gabardina colgada (pliegues, cinturón y botones)
    for (let y = 58; y <= 116; y++) { const w = y < 64 ? 2 + (y - 58) : 8 + Math.round((y - 64) * 0.06); for (let i = -w; i <= w; i++) { const f = Math.sin(i * 0.9 + y * 0.04); pset(x - 6 + i, y, i === -w || i === w || y === 116 ? K.k : i === -w + 1 ? W.gabardinaS : f > 0.7 ? hex('#c8b080') : f < -0.6 ? W.gabardinaS : W.gabardina); } }
    linea(x - 6, 60, x - 10, 72, W.gabardinaS); linea(x - 6, 60, x - 2, 72, W.gabardinaS); linea(x - 6, 60, x - 6, 116, W.gabardinaS);
    linea(x + 1, 66, x + 3, 100, K.k); linea(x, 66, x + 2, 100, W.gabardinaS); rect(x + 1, 100, x + 3, 102, W.gabardinaS);
    rect(x - 15, 84, x + 2, 86, W.gabardinaS); rect(x - 15, 84, x + 2, 84, K.k); rect(x - 8, 84, x - 6, 86, K.oroS); for (const y of [72, 80, 94, 102]) { pset(x - 4, y, K.k); pset(x - 8, y, K.k); }
    // el sombrero de fieltro en el gancho de la derecha
    rect(x + 1, 56, x + 15, 57, K.k); rect(x + 2, 56, x + 14, 56, W.sombrero); rect(x + 4, 50, x + 12, 55, K.k); rect(x + 5, 51, x + 11, 55, W.sombrero); rect(x + 5, 54, x + 11, 54, hex('#7a2a24')); rect(x + 5, 51, x + 11, 51, hex('#6a6a74')); pset(x + 8, 50, W.sombreroS); }
}
// EL DESPACHO (general): el campus por la ventana, lo fijo, el reloj, la mancha de sol con sus motas, el polvo de
// tiza que cae de la repisa y el destello del cristal
function g_whDespacho(R, t, o = {}) {
  const K = g_whK, W = g_whW, G = G_WHDES, { pset, linea } = R, luz = ['tarde', 'noche'].includes(o.luz) ? o.luz : 'dia';
  g_whVistaCampus(R, t, ...G.ventana);
  g_whPegar(R, g_whCapa(R, 'despacho37', () => g_whDespachoFijo(R)));
  { const [a, b, c, d] = G.ventana; for (let i = 0; i < 16; i++) { const x = a + 3 + i, y = d - 3 - i * 2; if (y > b) g_whTinta(R, x, y, K.blanco, 0.3); } }
  // el reloj eléctrico: el segundero que barre sin saltos
  { const [cx, cy] = G.reloj, as = t * Math.PI / 30 + 0.8, am = 2.1, ah = 5.0; linea(cx, cy, cx + Math.round(Math.sin(ah) * 2), cy - Math.round(Math.cos(ah) * 2), K.k); linea(cx, cy, cx + Math.round(Math.sin(am) * 4), cy - Math.round(Math.cos(am) * 4), K.k); linea(cx, cy, cx + Math.round(Math.sin(as) * 4), cy - Math.round(Math.cos(as) * 4), K.rojo); }
  // la mancha de sol de la ventana en el suelo (con la sombra de la cruceta) y las motas en el haz
  if (luz !== 'noche') for (let y = 154; y <= 178; y++) { const u = (y - 154) / 24, xa = Math.round(196 - u * 30), xb = Math.round(232 - u * 26); for (let x = xa; x <= xb; x++) { const cruz = Math.abs(x - (xa + xb) / 2) < 1 || Math.abs(y - 165) < 1; if (!cruz && g_whB4(x, y) < 0.45) g_whTinta(R, x, y, K.solL, 0.35); } }
  if (luz !== 'noche') for (let k = 0; k < 8; k++) { const f = (t * 0.05 + h(k, 1, 120)) % 1, x = Math.round(240 - f * 50 + Math.sin(t + k) * 3), y = Math.round(100 + f * 60 + h(k, 2, 120) * 10); if (Math.sin(t * 1.3 + k * 2) > 0.2) pset(x, y, K.solL); }
  // el polvo de tiza que cae de la repisa
  for (let k = 0; k < 4; k++) { const f = (t * 0.4 + k / 4) % 1, x = 84 + k * 7 + Math.round(Math.sin(t + k) * 1); pset(x, 115 + Math.round(f * 30), W.tizaS); }
  // la hora (o.luz): de tarde todo se entibia; de noche, la penumbra azul con el cono del flexo del escritorio (276, 104)
  // y la ventana con la luna y una farola del campus
  if (luz !== 'dia') { d_whLuz(R, luz, [276, 104], 0, 0, 319, 179, 156); if (luz === 'noche') d_whVentanaNoche(R, t, ...G.ventana, 248, 86); }
  R.recorte(null);
  return {};
}
// DELANTE EN EL DESPACHO: el escritorio de roble oscuro a la derecha (x 226–319, tablero y 126) con el flexo
// encendido (su luz en el tablero), el teléfono negro de disco, papeles, la regla de cálculo y el tintero; fuera de libre
function g_whDespachoDelante(R, t, o = {}) {
  const K = g_whK, W = g_whW, { rect, pset, linea, disco, poligono } = R, x0 = 226, x1 = 319, y = 126;
  // el frente y el costado
  rect(x0, y + 4, x1, 179, K.k); for (let yy = y + 5; yy <= 179; yy++) for (let xx = x0 + 1; xx <= x1; xx++) { const v = Math.sin(xx * 0.3 + yy * 0.05) + (h(xx >> 2, yy, 121) - 0.5); pset(xx, yy, v > 0.9 ? W.madL : v < -0.8 ? W.madD : W.mad); }
  for (const [a, b] of [[y + 8, y + 22], [y + 26, y + 44]]) { rect(x0 + 6, a, x0 + 40, b, K.k); rect(x0 + 7, a + 1, x0 + 39, b - 1, W.madS); rect(x0 + 7, a + 1, x0 + 39, a + 1, W.madL); rect(x0 + 19, a + 5, x0 + 27, a + 6, K.oroS); rect(x0 + 19, a + 5, x0 + 27, a + 5, K.oro); }
  rect(x0 + 46, y + 8, x1, 179, W.madS); for (let yy = y + 10; yy < 179; yy += 9) rect(x0 + 48, yy, x1, yy, W.madD);
  // el tablero con su canto
  rect(x0 - 2, y, x1, y + 4, K.k); rect(x0 - 1, y + 1, x1, y + 2, W.madB); rect(x0 - 1, y + 3, x1, y + 3, W.madS); rect(x0 - 1, y + 1, x1, y + 1, hex('#b0886a'));
  // la luz del flexo en el tablero
  for (let xx = x0 + 10; xx <= x1; xx++) for (let yy = y + 1; yy <= y + 2; yy++) if (Math.abs(xx - 282) < 26 && g_whB4(xx, yy) < 0.6) g_whTinta(R, xx, yy, K.luz, 0.4);
  // papeles, la regla de cálculo y el tintero
  poligono([[244, y + 1], [266, y + 1], [268, y - 2], [247, y - 2]], K.papel); linea(248, y - 1, 262, y - 1, K.papelD); poligono([[250, y - 2], [270, y - 2], [271, y - 4], [252, y - 4]], K.blanco);
  rect(232, y - 2, 252, y - 1, K.k); rect(233, y - 2, 251, y - 2, hex('#f0e8c8')); for (let x = 234; x < 251; x += 2) pset(x, y - 1, hex('#c8b880')); rect(240, y - 2, 242, y - 1, hex('#a8c8d8'));
  rect(272, y - 5, 278, y - 1, K.k); rect(273, y - 4, 277, y - 1, hex('#2a2a5a')); pset(274, y - 4, K.blanco); linea(276, y - 5, 281, y - 13, hex('#2a2a2a')); pset(281, y - 14, K.blanco);
  // el teléfono negro de disco
  rect(290, y - 7, 310, y - 1, K.k); rect(291, y - 6, 309, y - 2, hex('#2a2a30')); rect(291, y - 6, 309, y - 6, hex('#4a4a56')); disco(300, y - 4, 3, hex('#5a5a66')); disco(300, y - 4, 1, K.blanco);
  rect(288, y - 11, 312, y - 9, K.k); rect(289, y - 11, 311, y - 10, hex('#3a3a44')); rect(287, y - 12, 291, y - 8, K.k); rect(309, y - 12, 313, y - 8, K.k); linea(312, y - 2, 318, y + 6, K.k);
  // EL FLEXO (base, brazo con su codo, pantalla) encendido; la luz parpadea un poco
  rect(276, y - 3, 288, y - 1, K.k); rect(277, y - 3, 287, y - 2, hex('#2e4a3a')); linea(282, y - 3, 286, y - 22, K.k); linea(283, y - 3, 287, y - 22, hex('#4a6a5a')); disco(287, y - 23, 1, K.oro); linea(287, y - 23, 279, y - 30, K.k); linea(287, y - 24, 279, y - 31, hex('#4a6a5a'));
  poligono([[270, y - 22], [282, y - 22], [281, y - 31], [275, y - 34], [271, y - 31]], K.k); poligono([[272, y - 23], [281, y - 23], [280, y - 30], [275, y - 32], [272, y - 30]], hex('#2e5a44')); rect(273, y - 29, 274, y - 25, hex('#5a8a70'));
  const pp = Math.sin(t * 11) > 0.97 ? 0.16 : 0.26; rect(272, y - 22, 281, y - 22, K.luz); for (let yy = y - 21; yy <= y; yy++) { const u = (yy - y + 21) / 21, xa = Math.round(276 - 5 - u * 10), xb = Math.round(277 + 5 + u * 12); for (let xx = xa; xx <= xb; xx++) if (g_whB4(xx, yy) < pp && R.pget(xx, yy) !== K.k) g_whTinta(R, xx, yy, K.luz, 0.4); }
  d_whLuz(R, o.luz, [276, 104], 0, 0, 319, 179, 156);
  return { mesa: [x0, y, x1], telefono: [300, y - 6], flexo: [276, y - 22] };
}

// LO FIJO DE LA PIZARRA DE CERCA: el panel de madera de arriba (tranquilo), el marco de roble, la pizarra verde a
// escala 2 con sus borrones, el borde del átomo cortado a la izquierda, la repisa con tizas y borrador y el panel de abajo
function g_whPizarraFijo(R) {
  const K = g_whK, W = g_whW, { rect, pset } = R, a = 8, b = -10, c = 312, d = 148;
  g_whPaneles(R, 150, 179);
  rect(0, 0, 319, d + 7, K.k);   // el filo del marco hasta los bordes del cuadro
  rect(a - 7, b - 7, c + 7, d + 7, K.k); rect(a - 6, b - 6, c + 6, d + 6, W.roble); rect(a - 6, b - 6, c + 6, b - 5, W.robleL); rect(a - 6, b - 6, a - 5, d + 6, W.robleL); rect(c + 5, b - 5, c + 6, d + 6, W.robleS); rect(a - 2, b - 2, c + 2, d + 2, W.robleD);
  for (let y = b - 6; y <= d + 6; y++) for (let x = a - 6; x <= c + 6; x++) if ((x < a - 2 || x > c + 2 || y < b - 2 || y > d + 2) && h(x >> 2, y, 122) < 0.12) pset(x, y, W.robleS);
  for (let y = 0; y <= d; y++) for (let x = a; x <= c; x++) { const sw = Math.sin((x - a) * 0.06 + Math.sin(y * 0.05 + x * 0.012) * 3) > 0.95 && h(x >> 4, y >> 4, 123) < 0.35 && !(x > 262 && y < 48) && y > 22; pset(x, y, sw ? W.pizVL : h(x >> 1, y >> 1, 124) < 0.07 ? W.pizVS : W.pizV); }
  // los BORRONES del borrador: arcos anchos de verde lavado, tramados (cada pasada deja su abanico) y, dentro, el
  // fantasma de cuentas viejas mal borradas (ondas, puntos y rayas a medio tono, sin letras)
  for (const [cx, cy, r, a0, a1, k] of [[70, 150, 120, -1.9, -1.1, 0], [250, 160, 110, -2.2, -1.25, 1], [160, -30, 120, 0.5, 1.2, 2], [300, 40, 70, 2.0, 3.0, 3], [40, 20, 60, -0.3, 0.9, 4]])
    for (let rr = r - 16; rr <= r + 16; rr++) for (let an = a0; an <= a1; an += 0.7 / rr) { const x = Math.round(cx + Math.cos(an) * rr), y = Math.round(cy + Math.sin(an) * rr * 0.8);
      if (x < a || x > c || y < 23 || y > d - 2 || (x > 262 && y < 48)) continue; const f = 1 - Math.abs(rr - r) / 16; if (g_whB4(x, y) < f * 0.55 && h(x >> 2, y >> 2, 130 + k) < 0.8) pset(x, y, f > 0.75 && g_whB4(x, y) < 0.12 ? W.pizVB : W.pizVL); }
  for (const [x0, y0, l, am, k] of [[150, 60, 70, 4, 0], [30, 112, 44, 3, 1], [246, 30, 40, 3, 2], [190, 128, 50, 2, 3]])
    for (let i = 0; i < l; i++) { const x = x0 + i, y = Math.round(y0 + Math.sin(i * 0.45 + k) * am); if (h(x, y, 131 + k) < 0.55 && !(x > 262 && y < 48)) { pset(x, y, W.pizVB); if (h(x, y, 137) < 0.5) pset(x, y + 1, W.pizVL); } }
  for (let k = 0; k < 26; k++) { const x = a + 10 + Math.floor(h(k, 1, 132) * (c - a - 20)), y = 26 + Math.floor(h(k, 2, 132) * (d - 34)); if (!(x > 262 && y < 48)) { pset(x, y, W.pizVB); if (k % 3 === 0) pset(x + 1, y, W.pizVL); } }
  // dos dibujos viejos a medio borrar, en tiza gastada: el SAGITARIO de la clase anterior (estrellas unidas por rayas,
  // abajo a la izquierda) y el boceto de UN PLATO DE ANTENA en su pie (arriba a la derecha)
  { const G = (x, y) => { if (h(x, y, 138) < 0.62) pset(x, y, h(x, y, 139) < 0.3 ? W.pizVB : W.tizaD); };
    const S = [[16, 128], [28, 118], [40, 124], [52, 112], [62, 120], [48, 136], [34, 140], [22, 104], [58, 102]];
    for (const [i, j] of [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [1, 7], [3, 8]]) { const [x0, y0] = S[i], [x1, y1] = S[j], n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let q = 0; q <= n; q += 2) G(Math.round(x0 + (x1 - x0) * q / n), Math.round(y0 + (y1 - y0) * q / n)); }
    for (const [x, y] of S) { pset(x, y, W.tizaS); pset(x + 1, y, W.tizaD); pset(x, y + 1, W.tizaD); }
    for (let i = -16; i <= 16; i++) { const y = 28 + Math.round(i * i / 22); G(226 + i, y); if (Math.abs(i) < 14) G(226 + i, y + 1); }
    for (let y = 30; y <= 44; y++) { G(226, y); if (y > 38) { G(226 - (y - 38), y); G(226 + (y - 38), y); } } for (let x = 214; x <= 238; x += 2) G(x, 45);
    for (let y = 22; y <= 28; y++) G(226, y); }
  // la mancha de polvo de tiza que se acumula sobre la repisa (más clara abajo)
  for (let y = d - 14; y <= d; y++) for (let x = a; x <= c; x++) { const f = (y - d + 14) / 14 * (0.55 + 0.45 * Math.sin(x * 0.05 + 1.3)); if (g_whB4(x, y) < f * 0.38) pset(x, y, f > 0.7 && h(x, y, 133) < 0.3 ? W.pizVB : W.pizVL); }
  // el borde del átomo de la general, a escala 2, cortado por la izquierda, y unas rayas medio borradas
  for (let i = 0; i < 260; i++) { const an = i / 260 * Math.PI * 2, x = Math.round(-10 + Math.cos(an) * 48), y = Math.round(58 + Math.sin(an) * 34); if (x >= a && x <= c && y > 22 && y <= d && h(i, 1, 125) < 0.85) { pset(x, y, W.tiza); pset(x, y + 1, W.tizaS); } }
  R.disco(30, 34, 4, W.tiza);
  for (const [x, y, l] of [[60, 40, 30], [140, 34, 40], [210, 148 - 8, 26], [40, 138, 20]]) for (let i = 0; i < l; i++) if (h(x + i, y, 126) < 0.5) { pset(x + i, y, W.pizVB); pset(x + i, y + 1, W.pizVL); }
  // la repisa (y 149–156) con tizas, el borrador de fieltro y el polvo de tiza
  rect(a - 8, d + 1, c + 8, d + 9, K.k); rect(a - 7, d + 2, c + 7, d + 5, W.robleL); rect(a - 7, d + 6, c + 7, d + 8, W.robleS); rect(a - 7, d + 2, c + 7, d + 2, hex('#e8c088'));
  for (let i = 0; i < 70; i++) if (h(i, 6, 127) < 0.6) pset(a + Math.floor(h(i, 7, 127) * (c - a)), d + 3 + (i % 2), W.tizaS);
  for (const [x, l] of [[40, 12], [62, 7], [84, 10]]) { rect(x, d - 1, x + l, d + 2, K.k); rect(x + 1, d, x + l - 1, d + 1, W.tiza); rect(x + 1, d + 1, x + l - 1, d + 1, W.tizaS); }
  rect(230, d - 6, 262, d + 2, K.k); rect(231, d - 5, 261, d - 2, W.roble); rect(231, d - 5, 261, d - 5, W.robleL); rect(231, d - 1, 261, d + 1, hex('#4a4a52')); for (let x = 231; x <= 261; x += 2) pset(x, d + 1, W.tizaS);
  // más en la repisa: cabos de tiza rotos, una tiza de color, la caja de tizas de cartón y el clavo de la repisa
  for (const [x, l, cc] of [[110, 3, W.tiza], [118, 2, W.tizaS], [140, 6, hex('#e8c8a0')], [196, 4, hex('#a8c8e0')], [282, 3, W.tiza]]) { rect(x, d, x + l, d + 2, K.k); rect(x + 1, d + 1, x + l - 1, d + 1, cc); }
  rect(160, d - 7, 182, d + 2, K.k); rect(161, d - 6, 181, d + 1, hex('#c8b890')); rect(161, d - 6, 181, d - 6, hex('#e8dcb8')); rect(161, d - 2, 181, d - 1, hex('#8a3a2a')); rect(178, d - 6, 181, d + 1, hex('#a89870'));
  for (let i = 0; i < 4; i++) { rect(163 + i * 4, d - 9, 165 + i * 4, d - 6, K.k); pset(164 + i * 4, d - 8, W.tiza); pset(164 + i * 4, d - 7, W.tizaS); }
  for (const x of [a + 30, c - 30]) { pset(x, d + 7, K.k); pset(x, d + 6, hex('#d0c8b0')); }
  // el canto de abajo del marco proyecta su sombra en el panel
  for (let x = 0; x < 320; x++) for (let y = d + 10; y <= d + 13; y++) if (g_whB4(x, y) < 0.55 - (y - d - 10) * 0.12) g_whTinta(R, x, y, K.k, 0.35);
}
// la frase en iconos de la pizarra de cerca (cada uno, una lista de trazos que se dibujan en orden): LA LUPA (aro y
// mango), LA FLECHA (el palo y la punta) y EL CERO TACHADO (el óvalo y la raya)
const G_WHICON = [
  [[(s) => [95 + Math.cos(s * Math.PI * 2 - 2) * 14, 106 + Math.sin(s * Math.PI * 2 - 2) * 14], 1], [(s) => [106 + s * 20, 117 + s * 20], 0.45], [(s) => [108 + s * 19, 116 + s * 19], 0.4], [(s) => [87 + Math.cos(3.6 + s * 1.1) * 8, 106 + Math.sin(3.6 + s * 1.1) * 8], 0.2]],
  [[(s) => [136 + s * 58, 113 + Math.sin(s * 9) * 0.6], 0.8], [(s) => [196 - s * 12, 113 - s * 10], 0.25], [(s) => [196 - s * 12, 113 + s * 10], 0.25]],
  [[(s) => [233 + Math.sin(s * Math.PI * 2) * 13, 113 - Math.cos(s * Math.PI * 2) * 20], 1], [(s) => [216 + s * 34, 136 - s * 46], 0.6]],
];

// LA PIZARRA DE CERCA (cámara 'pizarra' del despacho): o.u 0–1 escribe la frase de iconos trazo a trazo con su polvo;
// o.cifras 0/1 (por omisión 0): las cuentas de 1959 de la vista general a escala 2 (la onda, el 1420 y el 21; para
// el plano de Morrison: con cifras, o.u 0). La luz de la ventana pasa por la pizarra como un brillo ancho y tramado que
// se aviva y se apaga cuando pasan las nubes; el polvo de tiza flota en él
function g_whPizarra(R, t, o = {}) {
  const W = g_whW, K = g_whK, { pset } = R, u = o.u == null ? 1 : g_whCl(o.u);
  g_whPegar(R, g_whCapa(R, 'pizarra37', () => g_whPizarraFijo(R)));
  // el brillo de la ventana (de la derecha, en diagonal), que respira con las nubes
  { const v = 0.55 + 0.45 * Math.sin(t * 0.31) * Math.sin(t * 0.17 + 1);
    for (let y = 24; y <= 146; y++) { const xc = 236 - (y - 24) * 0.55; for (let x = Math.round(xc - 26); x <= xc + 26; x++) { if (x < 9 || x > 311 || (x > 262 && y < 48)) continue; const f = (1 - Math.abs(x - xc) / 26) * v; if (g_whB4(x, y) < f * 0.3) { const q = R.pget(x, y); if (q === W.pizV || q === W.pizVS) pset(x, y, W.pizVL); } } } }
  if (o.cifras) d_whCifras(R);
  // el reparto del avance: cada icono un tercio; cada trazo, según su peso
  let tip = null;
  G_WHICON.forEach((trazos, n) => { const v = g_whCl(u * 3 - n); if (v <= 0) return; const tot = trazos.reduce((s, z) => s + z[1], 0); let acc = 0;
    for (const [f, p] of trazos) { const a = acc / tot, b = (acc + p) / tot; acc += p; const s1 = g_whCl((v - a) / (b - a)); if (s1 <= 0) continue; const N = Math.round(p * 140);
      for (let i = 0; i <= N * s1; i++) { const [x, y] = f(i / N), xx = Math.round(x), yy = Math.round(y); for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) if (h(xx + dx, yy + dy, 128) < 0.82) pset(xx + dx, yy + dy, (dx + dy) === 2 ? W.tizaS : W.tiza); }
      if (s1 < 1) tip = f(s1).map(Math.round); } });
  // el polvo de tiza que cae del trazo mientras se escribe
  if (tip) for (let k = 0; k < 5; k++) { const f = (t * 1.6 + k / 5) % 1; pset(tip[0] + Math.round(Math.sin(k * 2 + t) * 2), tip[1] + 2 + Math.round(f * 24), f < 0.5 ? W.tiza : W.tizaS); }
  // un poco de polvo que flota en la luz, siempre
  for (let k = 0; k < 6; k++) { const x = 30 + Math.round(h(k, 1, 129) * 260 + Math.sin(t * 0.4 + k) * 6), y = 30 + Math.round((h(k, 2, 129) * 110 + t * (2 + k % 3)) % 110); if (Math.sin(t * 1.2 + k * 1.7) > 0.4 && !(x > 270 && y < 46)) g_whTinta(R, x, y, K.blanco, 0.5); }
  const fin = G_WHICON[2][1][0](1).map(Math.round);
  R.recorte(null);
  return { tiza: tip || (u >= 1 ? fin : [136, 113]), iconos: [[95, 113], [166, 113], [233, 113]], repisa: [8, 149, 312] };
}
// la paleta del estudio de siempre (de tu-comun.js)
const g_whK = pal({
  k: '#1c1222', blanco: '#f6f2ea', pared: '#ecd2a8', paredS: '#dcbc8c', paredL: '#f6e2c0', motivo: '#cf9a68', motivoS: '#b87e52',
  moldura: '#f4ead6', molduraS: '#cdbfa2', friso: '#447674', frisoS: '#2f5a5a', frisoL: '#62948e', frisoD: '#1f3f42',
  tarima: '#b88450', tarimaS: '#93603a', tarimaL: '#d4a066', tarimaD: '#6c4426', sol: '#f2cf88', solL: '#fbe6b0',
  nogal: '#70462a', nogalS: '#50301a', nogalL: '#94623a', nogalD: '#321d10', nogalB: '#b88250',
  cortina: '#c2603a', cortinaS: '#93401f', cortinaL: '#e08a5a', cortinaD: '#6a2a14', marco: '#f4f0e6', marcoS: '#c4bcae',
  cielo0: '#3f8fd8', cielo1: '#58a4e4', cielo2: '#78baee', cielo3: '#9ccef4', cielo4: '#c0e0f6', cielo5: '#e2f0f4',
  gris0: '#6a7890', gris1: '#7e8ca2', gris2: '#94a2b4', gris3: '#aab6c4', gris4: '#c0cad4', gris5: '#d4dce0',
  nubeL: '#ffffff', nubeM: '#eef4fa', nubeS: '#c8d8ea', nubeD: '#a4b8d4', nubeG0: '#dfe4ea', nubeG1: '#b8c2d0', nubeG2: '#8e9aae', nubeG3: '#727e94',
  hoja: '#4c9a40', hojaL: '#74bc50', hojaB: '#a4d868', hojaS: '#347a38', hojaD: '#1e4a2c', tronco: '#6a4a30', troncoS: '#46301e',
  cesped: '#62ac48', cespedL: '#86c85a', cespedS: '#468a3a', cespedD: '#2f6a30', senda: '#dcc89a', sendaS: '#b8a070', sendaL: '#eedcb4',
  alfombra: '#2f5e6a', alfombraS: '#20444e', alfombraL: '#e8d4a4', alfombraR: '#c2603a',
  sillon: '#d0883a', sillonS: '#a4622a', sillonL: '#eca858', sillonD: '#6e3e1a', gato: '#8a8e9a', gatoS: '#5e626e', gatoL: '#c4c8d0',
  oro: '#e8b840', oroS: '#a87820', oroL: '#f8e080', rojo: '#d8423a', rojoS: '#96241e', azul: '#3a6ab0', azulS: '#24447a', papel: '#efe6d0', papelS: '#cfc4a8', papelD: '#a89c80',
  barro: '#c8683a', barroS: '#96442a', barroL: '#e89060', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#d0d8e4', metalD: '#4a5262', luz: '#fff0b8',
  noche: '#1c2450', lila: '#9a6ad0', rosa: '#f08aa0', amarillo: '#f0c030', verde: '#3aa860', verdeL: '#7ae08a', verdeS: '#1e7040',
  cristal: '#cfe8f4', cristalL: '#f4fcff', cristalD: '#4a6e8e', agua0: '#a8e0ec', agua1: '#6cc0dc', agua2: '#4a9cc8', agua3: '#3478ac', aguaD: '#245a8c',
  grava: '#d8c090', gravaS: '#a88c5c', gravaL: '#f0e0b4', naranja: '#f08828', naranjaL: '#fcb850', naranjaS: '#c85a18', naranjaD: '#8a3610',
  barcoW: '#fbfaf4', barcoS: '#cdd4e2', barcoD: '#7a86a6',
  nieve: '#f0f4fa', nieveS: '#b8c8e0', monte: '#7a88a8', monteS: '#56648c', monteL: '#9aa8c4',
});

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() que empieza «vacío» y en cada fotograma
// se pega sobre lo que se mueve por detrás (lo que se ve por la ventana); una por encuadre y lienzo
const G_WHVACIO = 0x01020304, g_whCapas = new WeakMap();

function g_whCapa(R, clave, dibuja) {
  let m = g_whCapas.get(R); if (!m) g_whCapas.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); b.fill(G_WHVACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega una capa fija (solo las filas y0–y1, bajadas dy filas) sobre el búfer en uso, dejando ver lo de detrás por sus huecos
function g_whPegar(R, b, y0 = 0, y1 = 179, dy = 0) { const d = R.buf, k = dy * 320; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== G_WHVACIO) d[i + k] = c; } }

// el umbral de la trama ordenada 4 × 4 (0–1), para degradados y luces tramados
const G_WHB4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_whB4 = (x, y) => (G_WHB4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const g_whCl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const g_whMez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// tiñe el píxel (x, y) hacia el color c con fuerza f, con memoria por color (para luces, cristales y sombras)
const g_whTintes = new Map();

function g_whTinta(R, x, y, c, f) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const p = R.pget(x, y), k = c + ':' + f; let M = g_whTintes.get(k); if (!M) g_whTintes.set(k, (M = new Map()));
  let v = M.get(p); if (v === undefined) { v = g_whMez(p, c, f); M.set(p, v); } R.pset(x, y, v);
}

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo (respeta R.recorte)
function g_whDegradado(R, x0, y0, x1, y1, cols, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const v = ((y - y0) / alto) ** curva * n, l = Math.floor(v), f = v - l; for (let x = x0; x <= x1; x++) R.pset(x, y, cols[Math.min(n, f > g_whB4(x, y) ? l + 1 : l)]); }
}

// una nube de bolas que se solapan, con la base plana: c = [luz, cuerpo, panza, filo de abajo]; (cx, cy) el centro de
// su base, w el ancho, k la semilla; se recorta a [rx0, rx1] y por arriba a ry0
function g_whNube(R, cx, cy, w, k, c, rx0 = 0, rx1 = 319, ry0 = 0) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3.4 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.max(rx0, Math.floor(cx - w * 0.62)), x1 = Math.min(rx1, Math.ceil(cx + w * 0.62));
  for (let y = Math.max(ry0, Math.floor(cy - 13)); y <= cy + 1; y++) for (let x = x0; x <= x1; x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 2) ? c[0] : c[1]);
}

// el cielo en [x0, x1] × [y0, hor]: degradado tramado y nubes de tres tonos a tres velocidades (lejanas pequeñas y
// lentas, medias, cercanas grandes y rápidas); o.esc: la escala de las nubes; o.gris 0–1: el cielo de lluvia (encapotado)
function g_whCielo(R, t, x0, y0, x1, hor, o = {}) {
  const K = g_whK, w = x1 - x0 + 90, esc = o.esc ?? 1, gr = (o.gris ?? 0) > 0.5, N = gr ? [K.nubeG0, K.nubeG1, K.nubeG2, K.nubeG3] : [K.nubeL, K.nubeM, K.nubeS, K.nubeD];
  g_whDegradado(R, x0, y0, x1, hor, gr ? [K.gris0, K.gris1, K.gris2, K.gris3, K.gris4, K.gris5] : [K.cielo0, K.cielo1, K.cielo2, K.cielo3, K.cielo4, K.cielo5], 0.9);
  for (const [fy, s, v, n, kk] of (o.capas ?? [[0.82, 0.45, 2.2, 5, 0], [0.58, 0.7, 4.5, 4, 1], [0.3, 1, 8, 3, 2]])) for (let i = 0; i < n + (gr ? 2 : 0); i++) {
    const cx = x0 - 45 + (((h(i, kk, 61) * w + t * v + i * w / n) % w) + w) % w, cy = Math.round(y0 + (hor - y0) * (fy + (h(i, kk, 62) - 0.5) * 0.22)), an = Math.round((26 + h(i, kk, 63) * 30) * s * esc * (gr ? 1.4 : 1));
    g_whNube(R, Math.round(cx), cy, an, i * 7 + kk * 31, kk === 0 ? [N[1], N[1], N[2], N[3]] : N, x0, x1, y0); }
}

// un pájaro pequeño (una uve que aletea), recortado a [x0, x1]
function g_whPajaro(R, x, y, t, k, c, x0 = 0, x1 = 319) {
  const a = Math.sin(t * 9 + k * 2.1) > 0 ? 1 : -1; for (const [i, j] of [[0, 0], [-1, -a], [1, -a], [-2, -a * (a > 0 ? 2 : 1)], [2, -a * (a > 0 ? 2 : 1)]]) if (x + i >= x0 && x + i <= x1) R.pset(x + i, y + j, c);
}

// LA VISTA DE LA VENTANA del estudio, recortada a su hueco: cielo con nubes de tres tonos, pájaros, los tejados
// lejanos, los árboles del parque que se mecen, el césped con su sendero, una cometa, un paseante y una ciclista;
// ll 0–1: llueve (cielo encapotado, sin cometa, el paseante con paraguas, charcos con ondas y la lluvia fina)
function g_whVistaParque(R, t, x0, y0, x1, y1, ll = 0) {
  const K = g_whK, hor = y0 + Math.round((y1 - y0) * 0.62), llueve = ll > 0.5;
  R.recorte([x0, y0, x1, y1]);
  g_whCielo(R, t, x0, y0, x1, hor, { esc: 0.55, gris: ll, capas: [[0.8, 0.5, 1.2, 3, 0], [0.5, 0.75, 2.4, 3, 1], [0.2, 1, 4.2, 2, 2]] });
  if (!llueve) {
    for (let k = 0; k < 3; k++) { const u = ((t * (5 + k * 2) + k * 31) % (x1 - x0 + 30)); g_whPajaro(R, Math.round(x1 + 10 - u), y0 + 9 + k * 6 + Math.round(Math.sin(t * 1.3 + k) * 2), t, k, hex('#3a4a6a'), x0, x1); }
    // la cometa, con su cola
    const cx = x0 + 50 + Math.round(Math.sin(t * 0.7) * 6), cy = y0 + 22 + Math.round(Math.cos(t * 0.9) * 3); R.poligono([[cx, cy - 4], [cx + 3, cy], [cx, cy + 4], [cx - 3, cy]], K.rojo); R.linea(cx, cy - 3, cx, cy + 3, K.oro); for (let i = 1; i < 6; i++) R.pset(cx - i + Math.round(Math.sin(t * 5 + i) * 1), cy + 4 + i, i % 2 ? K.oro : K.rojo); R.linea(cx, cy + 4, x0 + 40, hor + 8, K.nubeD, 2);
  }
  // tejados lejanos y la hilera de árboles
  for (let x = x0; x <= x1; x++) { const b = Math.floor((x - x0) / 11), a = 5 + Math.round(h(b, 1, 71) * 7), te = (x - x0) % 11; for (let y = hor - a - 4; y <= hor; y++) R.pset(x, y, y === hor - a - 4 ? hex('#a86a5a') : te === 0 ? hex('#a8a4b8') : (te === 4 || te === 7) && (y - hor + a) % 4 === 1 ? hex('#f4e8b8') : llueve ? hex('#b0aec0') : hex('#c4c0d0')); }
  for (let x = x0; x <= x1; x++) { const a = Math.round(4 + 2.5 * Math.sin(x * 0.31) + 1.5 * Math.sin(x * 0.83 + 2)); R.linea(x, hor - a, x, hor, llueve ? hex('#4a8470') : hex('#5a9a7a')); R.pset(x, hor - a, llueve ? hex('#6ea08c') : hex('#86b89a')); }
  // el césped, el sendero y sus flores
  for (let y = hor + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 51) < 0.12 ? (llueve ? K.cesped : K.cespedL) : (y - hor) < 3 ? K.cespedS : ((x + (y - hor) * 2) >> 3) & 1 ? (llueve ? K.cespedS : K.cesped) : (llueve ? hex('#4f9442') : hex('#6cb450')));
  for (let y = hor + 3; y <= y1; y++) { const cx = x0 + 24 + Math.round(Math.sin((y - hor) * 0.2) * 9), w = 2 + ((y - hor) >> 2); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, x === cx - w ? K.sendaS : (x + y) % 5 === 0 ? K.sendaL : llueve ? K.sendaS : K.senda); }
  for (let k = 0; k < 9; k++) R.pset(x0 + 3 + Math.round(h(k, 1, 72) * (x1 - x0 - 6)), hor + 5 + Math.round(h(k, 2, 72) * (y1 - hor - 6)), k % 3 ? K.blanco : K.amarillo);
  // los charcos, con sus ondas
  if (llueve) for (const [dx, dy, w] of [[40, 12, 6], [58, 19, 8], [12, 21, 5]]) { const px = x0 + dx, py = hor + dy; for (let i = -w; i <= w; i++) { R.pset(px + i, py, K.gris4); if (Math.abs(i) < w - 1) R.pset(px + i, py + 1, K.gris2); } const u = (t * 1.4 + dx) % 1, r = Math.round(u * (w - 1)); R.pset(px - r, py, K.blanco); R.pset(px + r, py, K.blanco); }
  // los árboles del parque, que se mecen
  for (const [dx, r, k] of [[8, 8, 0], [40, 10, 1], [64, 7, 2]]) { const m = Math.round(Math.sin(t * (llueve ? 1.7 : 0.9) + k * 2) * 1.2), cx = x0 + dx;
    R.linea(cx, hor - 2, cx, hor + 7, K.troncoS); R.linea(cx + 1, hor - 2, cx + 1, hor + 7, K.tronco); R.disco(cx + m, hor - r, r, K.hojaD); R.disco(cx + m - 1, hor - r - 1, r - 1, K.hojaS); R.disco(cx + m - 2, hor - r - 2, r - 3, llueve ? K.hojaS : K.hoja); R.disco(cx + m - 3, hor - r - 3, Math.max(1, r - 6), llueve ? K.hoja : K.hojaL);
    for (let j = 0; j < 5; j++) R.pset(cx + m + Math.round((h(k, j, 73) - 0.5) * r * 1.4), hor - r + Math.round((h(k, j, 74) - 0.5) * r * 1.2), llueve ? K.hoja : K.hojaB); }
  // el paseante (con paraguas si llueve) y la ciclista
  for (const [v, y, c, k] of [[4.5, hor + 9, '#c8423a', 0], [-9, hor + 15, '#3a5a9a', 1]]) { if (llueve && k === 1) continue; const an = x1 - x0 + 20, x = Math.round(x0 - 10 + ((((t * v + k * 40) % an) + an) % an)), p = Math.floor(t * 4 + k) % 2;
    R.linea(x, y - 5, x, y - 2, hex(c)); R.pset(x, y - 6, hex('#f0c8a0')); R.pset(x, y - 7, hex('#4a3020'));
    if (k === 0) { R.pset(x - p, y - 1, K.k); R.pset(x + 1 - p, y, K.k); if (llueve) { R.linea(x + 1, y - 4, x + 1, y - 10, K.k); R.linea(x - 3, y - 10, x + 5, y - 10, K.amarillo); R.linea(x - 2, y - 11, x + 4, y - 11, K.amarillo); R.linea(x, y - 12, x + 2, y - 12, K.oroL); } }
    else { R.disco(x - 3, y - 1, 2, K.k); R.disco(x + 3, y - 1, 2, K.k); R.pset(x - 3, y - 1, K.metalL); R.pset(x + 3, y - 1, K.metalL); R.linea(x - 3, y - 2, x + 3, y - 2, K.rojo); } }
  // la lluvia fina: trazos inclinados que caen, en dos planos
  if (ll > 0) { const n = Math.round(ll * 70), an = x1 - x0 + 12, al = y1 - y0 + 8;
    for (let k = 0; k < n; k++) { const v = 70 + (k % 3) * 24, x = x0 + ((h(k, 1, 75) * an - t * 9) % an + an) % an, y = y0 - 4 + ((h(k, 2, 75) * al + t * v) % al); R.linea(Math.round(x), Math.round(y), Math.round(x) - 1, Math.round(y) + (k % 3 ? 3 : 2), k % 3 ? K.gris5 : K.blanco); } }
  R.recorte(null);
}

// la tarima: tablas a lo largo con las juntas al tresbolillo, vetas y nudos; las filas se ensanchan hacia la cámara
function g_whTarima(R, y0, y1, filas, P = null) {
  const K = P ?? { c: g_whK.tarima, s: g_whK.tarimaS, l: g_whK.tarimaL, d: g_whK.tarimaD }; let f = 0;
  for (let y = y0; y <= y1; y++) { while (f + 1 < filas.length && y >= filas[f + 1]) f++; const junta = y === filas[f], an = 34 + f * 9, des = Math.round(h(f, 1, 41) * an);
    for (let x = 0; x < 320; x++) { const tb = Math.floor((x + des) / an), r = (x + des) % an, tono = h(tb, f, 42);
      let c = junta ? K.s : r === 0 ? K.d : tono < 0.3 ? K.l : tono > 0.8 ? g_whMez(K.c, K.s, 0.5) : K.c;
      if (!junta && r > 0) { if (h(x >> 3, y, 43 + tb) < 0.16) c = K.s; else if (h((x + 3) >> 2, y, 44) < 0.07) c = K.l; if (Math.hypot(r - an * (0.3 + tono * 0.4), (y - filas[f] - 2) * 2) < 1.6 && tono > 0.55) c = K.d; }
      R.pset(x, y, c); } }
}

// un lomo de libro de pie en la balda: x, base y, ancho w, alto a, color c (con su tejuelo y su filo de luz)
function g_whLomo(R, x, y, w, a, c, k) {
  R.rect(x, y - a, x + w - 1, y, c); R.rect(x, y - a, x, y, g_whMez(c, g_whK.blanco, 0.3)); R.rect(x + w - 1, y - a + 1, x + w - 1, y, g_whMez(c, g_whK.k, 0.4)); R.rect(x, y - a, x + w - 1, y - a, g_whMez(c, g_whK.blanco, 0.45));
  if (w > 2) { R.rect(x + 1, y - a + 3, x + w - 2, y - a + 3, g_whK.oro); if (k % 2) R.rect(x + 1, y - 4, x + w - 2, y - 3, g_whK.papel); else R.rect(x + 1, y - a + 5, x + w - 2, y - a + 5, g_whK.oro); }
}

// EL GATO GRIS, despierto y sentado, que mira fijo (o.dir: hacia dónde, −1 por omisión: hacia la mesa): (x, y) el
// centro de su base. Mueve la punta de la cola, una oreja de vez en cuando, y parpadea
function g_whGato(R, x, y, t, o = {}) {
  const K = g_whK, d = o.dir ?? -1, { pset, rect, disco, linea, poligono } = R, hx = x + d * 3, hy = y - 13;
  // la cola, enroscada por detrás, con la punta que se mueve
  { const cl = Math.round(Math.sin(t * 2.4) * 1.6); linea(x - d * 4, y - 1, x - d * 9, y - 2, K.k); linea(x - d * 4, y - 2, x - d * 9, y - 3, K.gato); linea(x - d * 9, y - 3, x - d * 11, y - 5 - cl, K.gato); linea(x - d * 10, y - 2, x - d * 12, y - 4 - cl, K.k); pset(x - d * 11, y - 6 - cl, K.gatoL); }
  // el cuerpo de pera y el pecho claro
  for (let j = 0; j <= 10; j++) { const w = j < 3 ? 5 : j < 7 ? 5 - ((j - 2) >> 1) : 3; rect(x - w - 1, y - j, x + w + 1, y - j, K.k); rect(x - w, y - j, x + w, y - j, K.gato); pset(x - d * w, y - j, K.gatoS); if (j > 1 && j < 8) pset(x + d * (w - 1), y - j, K.gatoL); if (j % 3 === 1) pset(x - d * (w - 2), y - j, K.gatoS); }
  rect(x - 5, y, x + 5, y, K.k); rect(x + d * 2, y - 1, x + d * 5, y - 1, K.gatoL); pset(x + d * 3, y, K.gatoL);
  // la cabeza, las orejas (una se mueve) y la cara: dos ojos amarillos muy abiertos
  const or = (t % 4.7) < 0.18 ? 1 : 0, cierra = (t % 3.9) > 3.75;
  disco(hx, hy, 5, K.k); disco(hx, hy, 4, K.gato);
  poligono([[hx - 5, hy - 2], [hx - 4, hy - 7 - or], [hx - 1, hy - 4]], K.k); poligono([[hx + 1, hy - 4], [hx + 4, hy - 7], [hx + 5, hy - 2]], K.k); pset(hx - 4, hy - 5 - or, K.rosa); pset(hx + 4, hy - 5, K.rosa); pset(hx - 3, hy - 4, K.gato); pset(hx + 3, hy - 4, K.gato);
  rect(hx - 3, hy + 2, hx + 3, hy + 3, K.gatoL);
  for (const ex of [hx + d * 3, hx - d * 0]) { if (cierra) { pset(ex, hy, K.k); pset(ex - d, hy, K.k); } else { pset(ex, hy - 1, K.amarillo); pset(ex - d, hy - 1, K.amarillo); pset(ex, hy, K.k); pset(ex - d, hy, K.amarillo); } }
  pset(hx + d * 2, hy + 2, K.rosa); pset(hx + d * 5, hy + 2, K.gatoL); pset(hx + d * 6, hy + 1, K.gatoL);
}

// una polilla que ronda una luz en (cx, cy): rx, ry lo que se aleja; k la semilla del vuelo
function g_whPolilla(R, cx, cy, t, rx = 8, ry = 6, k = 0) {
  const K = g_whK, x = Math.round(cx + Math.sin(t * 1.7 + k) * rx + Math.sin(t * 4.1 + k * 2) * 2), y = Math.round(cy + Math.cos(t * 2.3 + k) * ry + Math.sin(t * 5.3 + k) * 1.5), al = Math.sin(t * 30) > 0 ? 1 : 0;
  R.pset(x, y, K.k); R.pset(x - 1, y - al, K.papel); R.pset(x + 1, y - al, K.papel);
}

// el borde de la Tierra en el esquema 'cinta' (y del horizonte en x): la banda de la cinta va 2 px por debajo
const a_orLimbo = (x) => 107 + 31 * ((x - 160) / 160) ** 2;

// una estrella de cinco puntas de 7 × 7 con su filo (c1 relleno, c2 filo), apoyada en (x, y) (la fila de abajo)
const a_OR_ESTR = ['...#...', '...#...', '.#####.', '#######', '.#####.', '.##.##.', '##...##'];

function a_orEstrella7(R, x, y, c1, c2) {
  a_OR_ESTR.forEach((fl, j) => { for (let i = 0; i < 7; i++) if (fl[i] === '#') { const borde = j === 0 || i === 0 || i === 6 || j === 6 || a_OR_ESTR[j - 1]?.[i] !== '#'; R.pset(x - 3 + i, y - 6 + j, borde ? c2 : c1); } });
}

// la cinta de supermercado del esquema 'cinta' sobre el borde de la Tierra: la banda de goma (filo de luz arriba,
// estrías que corren off píxeles a la derecha, sombra), el bastidor de acero con sus tornillos y patas, los objetos
// del cielo que viajan encima (si objetos) y los dos rodillos con caballete en los extremos
function a_orCintaBanda(R, t, P, off, objetos) {
  const B = R.buf, en = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180;
  for (let x = 6; x <= 314; x++) { const y = Math.round(a_orLimbo(x)) + 3, s = ((x - off) % 6 + 6) % 6;
    const col = [[-2, s < 1 ? hex('#7a7a88') : hex('#c8c8d4')], [-1, hex('#9a9aa8')], [0, s < 1 ? hex('#4a4a56') : hex('#6a6a74')], [1, s < 1 ? P.k : hex('#4a4a56')], [2, s < 1 ? P.k : hex('#3a3a44')], [3, s < 1.5 ? hex('#1e1e24') : hex('#30303a')],
      [4, hex('#a8b0bc')], [5, hex('#6a727e')], [6, x % 16 === 3 ? hex('#d8e0e8') : hex('#3e444e')], [7, hex('#22262c')]];
    for (const [dy, c] of col) if (en(x, y + dy)) B[(y + dy) * 320 + x] = c;
    if (en(x, y + 8)) B[(y + 8) * 320 + x] = a_orMez(B[(y + 8) * 320 + x], hex('#05100a'), 0.5); }
  // las patas del bastidor, clavadas en la hierba con su pie
  for (let x = 38; x < 290; x += 42) { const y = Math.round(a_orLimbo(x)) + 11; R.linea(x, y, x, y + 5, hex('#5a626c')); R.linea(x + 1, y, x + 1, y + 5, hex('#2a2e34')); R.linea(x - 1, y + 6, x + 2, y + 6, hex('#8a929c')); }
  if (objetos) for (let k = 0; k < 5; k++) { const x = Math.round(((k * 68 + off + 20) % 340) - 10); if (x < 10 || x > 300) continue; const yb = Math.round(a_orLimbo(x)) + 2;
    if (k === 2) { // una galaxia espiral de canto
      for (let i = 0; i < 18; i++) { const a = i * 0.55 + t * 0.4, r = i * 0.32; R.pset(Math.round(x + Math.cos(a) * r * 1.6), Math.round(yb - 3 + Math.sin(a) * r * 0.6), hex('#8a8ad8')); R.pset(Math.round(x - Math.cos(a) * r * 1.6), Math.round(yb - 3 - Math.sin(a) * r * 0.6), hex('#a8a8f0')); }
      R.disco(x, yb - 3, 1, hex('#fff4d0')); R.pset(x, yb - 3, hex('#ffffff')); }
    else { const c1 = hex(k % 2 ? '#f4f0ff' : '#fff4a0'), c2 = hex(k % 2 ? '#a8b0e8' : '#e8c040');
      for (const [dx, dy] of [[-5, -3], [5, -3], [0, -9], [-4, 1], [4, 1]]) if (en(x + dx, yb + dy)) B[(yb + dy) * 320 + x + dx] = a_orMez(B[(yb + dy) * 320 + x + dx], c1, 0.35);
      a_orEstrella7(R, x, yb, c1, c2); R.pset(x - 1, yb - 4, hex('#ffffff')); }
    if (Math.abs(x - 158) < 6) for (let r = 0; r < 8; r++) { const a = r * Math.PI / 4, l = r % 2 ? 6 : 9; R.linea(Math.round(x + Math.cos(a) * 4), Math.round(yb - 3 + Math.sin(a) * 3), Math.round(x + Math.cos(a) * l), Math.round(yb - 3 + Math.sin(a) * l * 0.8), hex('#bfe8ff')); } }
  for (const x of [6, 314]) a_orRodillo(R, x, Math.round(a_orLimbo(x)) + 8, off);
}

// un rodillo de acero de la cinta en (x, y): el caballete de hierro (dos patas abiertas clavadas en la hierba, el
// travesaño con tornillos), el tambor con su llanta, los radios que giran con off y el buje, y la goma que lo abraza
function a_orRodillo(R, x, y, off) {
  for (const d of [-6, 6]) { R.linea(x, y, x + d, 177, hex('#1a1e24')); R.linea(x + (d < 0 ? -1 : 1), y + 1, x + d + (d < 0 ? -1 : 1), 177, hex('#6a727e')); R.linea(x + d - 2, 178, x + d + 2, 178, hex('#8a929c')); R.linea(x + d - 2, 179, x + d + 2, 179, hex('#2a2e34')); }
  R.rect(x - 5, 165, x + 5, 166, hex('#4a525c')); R.linea(x - 5, 165, x + 5, 165, hex('#8a929c')); R.pset(x - 4, 166, hex('#d8e0e8')); R.pset(x + 4, 166, hex('#d8e0e8'));
  R.disco(x, y, 10, hex('#141418')); R.disco(x, y, 9, hex('#3a3a44'));
  for (let k = 0; k < 18; k++) { const a = off / 9 + k * Math.PI / 9; R.pset(Math.round(x + Math.cos(a) * 9.5), Math.round(y + Math.sin(a) * 9.5), hex('#141418')); }   // las estrías de la goma que giran
  R.disco(x, y, 7, hex('#5a626c')); R.disco(x, y, 6, hex('#8a929c')); R.disco(x - 1, y - 1, 4, hex('#a8b0b8'));
  for (let k = 0; k < 4; k++) { const a = off / 7 + k * Math.PI / 2; R.linea(x, y, Math.round(x + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 6), hex('#3a424c')); }
  R.disco(x, y, 2, hex('#dce2e8')); R.pset(x, y, hex('#1a1e24')); R.pset(x - 4, y - 5, hex('#ffffff')); R.pset(x - 3, y - 6, hex('#ffffff')); R.pset(x - 5, y - 4, hex('#d8e0e8'));
}

// el reloj de arena del esquema 'cinta' (en [277, 128, 295, 155]): tapas de madera torneada, dos columnas con su
// cuenta, el cristal con su brillo, la arena que cae con u (arriba se vacía, abajo se llena) y un hilo por el cuello
function a_orRelojArena(R, u) {
  const x = 286, y = 150, c = hex('#f0c060');
  R.linea(277, 155, 295, 155, hex('#0a140c'));
  for (const yy of [128, 152]) { R.rect(277, yy, 295, yy + 2, hex('#6a4028')); R.linea(278, yy, 294, yy, hex('#b47e50')); R.linea(277, yy + 2, 295, yy + 2, hex('#3a2214')); R.pset(277, yy + 1, hex('#8a5a3a')); R.pset(295, yy + 1, hex('#8a5a3a')); }
  for (const xx of [278, 294]) { R.linea(xx, 131, xx, 151, hex('#6a4028')); R.pset(xx, 141, hex('#b47e50')); R.pset(xx, 133, hex('#3a2214')); R.pset(xx, 149, hex('#3a2214')); }
  R.linea(279, 131, 279, 151, hex('#9a6a44'));
  // el cristal: dos bulbos que se estrechan en el cuello
  for (let yy = 131; yy <= 151; yy++) { const s = Math.abs(yy - 141) / 10, w = Math.round(1 + Math.sqrt(s) * 6);
    R.linea(x - w, yy, x + w, yy, hex('#202a44')); R.pset(x - w, yy, hex('#8aa0c0')); R.pset(x + w, yy, hex('#5a6a8a')); if (w > 2) R.pset(x - w + 1, yy, hex('#c8d8f0')); }
  const arriba = Math.round((1 - u) * 8), abajo = Math.round(u * 8);
  for (let j = 0; j < arriba; j++) { const yy = 140 - j, w = Math.round((j + 1) * 0.6); R.linea(x - w, yy, x + w, yy, c); }
  for (let j = 0; j < abajo; j++) { const yy = 151 - j, w = Math.round(6 - j * 0.6); R.linea(x - w, yy, x + w, yy, c); R.pset(x - w, yy, hex('#c89040')); }
  if (u > 0 && u < 1) R.linea(x, 141, x, 151 - abajo, c);
}

// una cifra de siete segmentos de 3 × 5 (LED de calculadora) en (x, y) arriba a la izquierda
const a_OR_7S = ['1111110', '0110000', '1101101', '1111001', '0110011', '1011011', '1011111', '1110000', '1111111', '1111011'];

function a_orLed(R, x, y, d, c) {
  const s = a_OR_7S[d]; if (s[0] === '1') R.linea(x, y, x + 2, y, c); if (s[1] === '1') R.linea(x + 2, y, x + 2, y + 2, c); if (s[2] === '1') R.linea(x + 2, y + 2, x + 2, y + 4, c);
  if (s[3] === '1') R.linea(x, y + 4, x + 2, y + 4, c); if (s[4] === '1') R.linea(x, y + 2, x, y + 4, c); if (s[5] === '1') R.linea(x, y, x, y + 2, c); if (s[6] === '1') R.linea(x, y + 2, x + 2, y + 2, c);
}

// la copa de un árbol del fondo del campo de golf en (cx, cy) de radio r: lóbulos con luz por la izquierda (el sol de
// la tarde), tres tonos tramados, el filo de luz y el tronco con su sombra
function a_orCopaGolf(R, P, cx, cy, r, sem) {
  R.rect(cx - 1, cy + Math.round(r * 0.5), cx + 1, 80, P.madera[1]); R.linea(cx + 1, cy + Math.round(r * 0.5), cx + 1, 80, P.madera[0]);
  const L = []; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + h(sem, i, 781); L.push([cx + Math.cos(a) * r * 0.45, cy + Math.sin(a) * r * 0.35 - (i === 0 ? r * 0.15 : 0), r * (0.5 + h(sem, i, 782) * 0.15)]); }
  L.push([cx, cy - r * 0.2, r * 0.6]);
  const B = R.buf;
  for (let y = Math.floor(cy - r * 1.1); y <= cy + r; y++) for (let x = Math.floor(cx - r * 1.1); x <= cx + r * 1.1; x++) { if (x < 0 || x > 319 || y < 0 || y > 179 || a_orTranquila(x, y)) continue;
    let best = 9, nx = 0, ny = 0; for (const [lx, ly, lr] of L) { const d = Math.hypot(x - lx, y - ly) / lr; if (d < best) { best = d; nx = (x - lx) / lr; ny = (y - ly) / lr; } }
    if (best > 1) continue;
    const luz = -nx * 0.7 - ny * 0.6 + (h(x >> 1, y >> 1, 783 + sem) - 0.5) * 0.5, k = luz > 0.55 ? 3 : luz > 0.05 ? 2 : luz > -0.45 ? 1 : 0;
    B[y * 320 + x] = best > 0.88 && k >= 2 ? P.hierba[4] : a_orTono(P.bosque, a_orCl((k + a_orU(x, y) * 0.9) / 3.4), x, y); }
}

// una foto escaneada vista en una pantalla, sobre lo ya pintado en [x0, y0, x1, y1]: los colores algo apagados y
// fríos, los renglones de trama de la pantalla (uno de cada dos, más oscuro) y, con t, una franja de luz del escáner
// que baja despacio
function b_foto(R, x0, y0, x1, y1, t = null) {
  const fr = t == null ? -99 : y0 + ((t * 9) % (y1 - y0 + 24)) - 12, gris = hex('#b4bcbc'), K = C.k;
  for (let y = y0; y <= y1; y++) { const dy = Math.abs(y - fr), luz = dy < 3 ? 0.16 * (1 - dy / 3) : 0;
    for (let x = x0; x <= x1; x++) { let c = c_mez(R.pget(x, y), gris, 0.2); if (y & 1) c = c_mez(c, K, 0.07); if (luz > 0) c = c_mez(c, hex('#e8fff0'), luz); R.pset(x, y, c); } }
}

// lo que se añade al fondo fijo de la pantalla de cerca (va en el mismo búfer): la sombra del monitor en la pared, el
// cuadro de la gran oreja al atardecer (sin letras) colgado de su clavo, la sombra del monitor sobre la mesa, la taza (el vapor va aparte), un bolígrafo y un clip
function b_pantallaExtra(R) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k;
  for (let y = 24; y < 150; y++) for (let x = 272; x < 280; x++) R.pset(x, y, f_mez(R.pget(x, y), K, 0.16 * (1 - (x - 272) / 8)));
  for (let x = 10; x < 280; x++) for (let y = 150; y < 154; y++) R.pset(x, y, f_mez(R.pget(x, y), K, 0.18 * (1 - (y - 150) / 4)));
  // el cuadro: marco de madera, cielo de atardecer tramado, el reflector plano y el curvo en silueta, la hierba
  linea(297, 50, 286, 56, F.mesaD); linea(297, 50, 308, 56, F.mesaD); disco(297, 50, 1, F.latonS);
  rect(283, 56, 311, 80, F.mesaD); rect(284, 57, 310, 79, F.mesa); rect(284, 57, 310, 57, F.mesaL); rect(310, 58, 310, 79, F.mesaS);
  for (let y = 59; y < 78; y++) for (let x = 286; x < 309; x++) { const u = (y - 59) / 19; pset(x, y, f_bayer(x, y) < u ? hex('#f4b07a') : hex('#8a7ab8')); }
  disco(301, 70, 2, hex('#fff0b0')); rect(286, 73, 308, 77, hex('#3a5a2a')); for (let x = 286; x < 309; x += 2) pset(x, 73, hex('#5a7a3a'));
  poligono([[288, 73], [292, 63], [296, 63], [295, 73]], hex('#4a4a5e')); linea(292, 63, 296, 63, hex('#c8c0d0'));
  poligono([[298, 73], [298, 69], [302, 67], [307, 66], [307, 73]], hex('#3e3e52')); linea(298, 69, 307, 66, hex('#b8b0c8'));
  for (let x = 289; x < 307; x += 3) pset(x, 72, hex('#c8c0d0'));
  for (let i = 0; i < 6; i++) pset(285 + i * 4, 79 - (i & 1), f_mez(F.mesa, C.blanco, 0.3));
  // la taza en la mesa (con su asa y su sombra), el bolígrafo y un clip
  for (let i = -8; i <= 8; i++) pset(240 + i, 171, f_mez(R.pget(240 + i, 171), K, 0.3));
  rect(234, 157, 246, 170, K); rect(235, 158, 245, 169, hex('#2a6aa8')); rect(235, 158, 245, 158, hex('#5a9ad8')); rect(243, 159, 245, 169, hex('#1a4a80')); rect(236, 159, 244, 159, hex('#3a2418'));
  R.anillo(248, 163, 3, K); R.anillo(248, 163, 2, hex('#2a6aa8')); for (let i = 0; i < 3; i++) pset(237 + i * 3, 164, hex('#f4f0e0'));
  linea(252, 177, 270, 172, K); linea(252, 176, 269, 171, hex('#c83a2a')); pset(270, 171, hex('#e8e8ec')); linea(253, 176, 256, 175, hex('#e86a5a'));
  rect(178, 176, 186, 178, hex('#a8b0b8')); rect(179, 177, 185, 177, F.mesa);
}

// ─ caminos · franja: la cinta de cielo que vuelve a pasar cada noche y el calendario en la pared de la caseta ─
// las tres luces de la franja (o.luz 'noche' por omisión, 'tarde', 'dia'): cielo (8 tonos de arriba abajo; la noche usa
// el de siempre), nubes (sombra, cuerpo, filo), prado (5), bosque (4), bloques de la caseta (4), grava (3), montes
// lejanos (2), cuánto se oscurecen y enfrían los objetos (sh) y si se ven estrellas (est 0–1)
const c_LUZ_FRANJA = {
  noche: { prado: d_P.prado, sil: d_P.sil, bloque: d_P.bloque, nube: [d_P.noche[3], d_P.noche[5], d_P.noche[7]], grava: d_hx(['#16181e', '#22242c', '#30323c']), lejos: d_hx(['#0e1428', '#16203a']), sh: 0.62, est: 1 },
  tarde: { cielo: d_hx(['#1c1a44', '#28245a', '#3a2c66', '#56386e', '#7e486e', '#ac5c64', '#d8805a', '#f2b064']), prado: d_hx(['#20241a', '#2c3020', '#3a3e26', '#4c4c2c', '#625a34']),
    sil: d_hx(['#140f1e', '#1e1628', '#2a1e34', '#4a3044']), bloque: d_hx(['#4a4250', '#5c525e', '#6e626a', '#86727a']), nube: d_hx(['#4e3456', '#a85a6a', '#ffbc84']), grava: d_hx(['#3a3434', '#524a46', '#6e6258']), lejos: d_hx(['#4a3a5e', '#6a4a66']), sh: 0.32, est: 0.35 },
  dia: { cielo: d_hx(['#3a72c0', '#447cc8', '#4e88d0', '#5c94d8', '#6aa2de', '#7cb0e4', '#90c0ea', '#a8d0f0']), prado: d_hx(['#3a5a28', '#466c2e', '#567e36', '#6a9240', '#82aa4c']),
    sil: d_hx(['#24402e', '#2e4e38', '#3a5c42', '#5a7e5a']), bloque: d_hx(['#7a7a82', '#8e8e96', '#a4a4aa', '#bcbcc0']), nube: d_hx(['#a8bcd8', '#e2eaf4', '#ffffff']), grava: d_hx(['#7a7268', '#988e80', '#b8ac9a']), lejos: d_hx(['#6e8cb4', '#8aa2c0']), sh: 0, est: 0 },
};

// un cielo de día o de tarde en el búfer B (sin estrellas), de y 0 a y1: degradado tramado con ruido suave y cirros
// finos estirados en el tono del filo de las nubes; en las zonas tranquilas, liso y suave
function c_cieloLuz(B, y1, T, nube, k) {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) { const f = y / y1, q = d_quieto(x, y);
    let v = f * f * 0.4 + f * 0.6; v = v * (T.length - 1.3) + (q ? 0 : (d_vr(x / 30, y / 10, k) - 0.5) * 0.8 + (d_vr(x / 8, y / 6, k + 3) - 0.5) * 0.3);
    B[y * 320 + x] = T[d_cl(Math.floor(v + d_bay(x, y)), 0, T.length - 1)]; }
  for (let i = 0; i < 9; i++) { const cy = 66 + Math.round(h(i, 1, k) * (y1 - 86)), cx = Math.round(h(i, 2, k) * 300), w = 30 + Math.round(h(i, 3, k) * 50);
    for (let x = cx - w; x <= cx + w; x++) for (let j = 0; j < 3; j++) { const y = cy + j - Math.round((x - cx) * 0.04); if (x < 0 || x > 319 || y < 0 || y > y1 || d_quieto(x, y)) continue;
      const e = 1 - Math.abs(x - cx) / w; if (e * (j === 1 ? 1 : 0.5) * d_vr(x / 5, i, k + 5) > d_bay(x, y) * 0.6 + 0.15) B[y * 320 + x] = j === 0 ? nube[2] : nube[1]; } }
}

// un cúmulo pequeño (bolas de tres tonos: sombra abajo, cuerpo y filo arriba a la izquierda) centrado en (cx, cy), de
// radio r; no pinta a partir de x = xmax ni en las zonas tranquilas
function c_cumulo(R, cx, cy, r, tonos, xmax) {
  const bolas = [[-r * 0.9, 1, 0.55], [-r * 0.35, -0.5, 0.8], [r * 0.3, -0.2, 0.7], [r * 0.85, 1.2, 0.5]];
  for (const [dx, dy, f] of bolas) { const bx = cx + dx, by = cy + dy * r * 0.3, br = r * f * 0.6;
    for (let j = -Math.ceil(br); j <= Math.ceil(br); j++) for (let i = -Math.ceil(br); i <= Math.ceil(br); i++) { const x = Math.round(bx + i), y = Math.round(by + j); if (i * i + j * j > br * br || x < 0 || x >= xmax || y < 0 || y > 179 || d_quieto(x, y)) continue;
      const l = (-i - j) / br; R.pset(x, y, y > cy + r * 0.25 ? tonos[0] : l > 0.55 ? tonos[2] : l < -0.4 && (x + y) % 2 ? tonos[0] : tonos[1]); } }
  for (let x = Math.round(cx - r * 1.3); x <= Math.round(cx + r * 1.3); x++) { const y = Math.round(cy + r * 0.3); if (x >= 0 && x < xmax && (x + y) % 2) R.pset(x, y, tonos[0]); }
}

// un objeto de la franja en su luz: el color oscurecido y enfriado hacia la noche (sh 0–1)
const c_enLuz = (c, sh) => sh > 0 ? c_mez(hex(c), hex('#0a1030'), sh) : hex(c);

// la bajada máxima del embudo de cerca con o.oreja 0 (el vaso acaba en y 172, dentro del cuadro)
const D_WHCAIDA = 22;

// LO FIJO DEL TECHO DE CERCA, lo que se añade encima de g_whTechoFijo: el filo de abajo de la moldura (sus impares), el
// gotelé y los remiendos del yeso, el cable de la lámpara grapado al techo y el interruptor de latón con su cable
function d_whTechoExtra(R) {
  const K = g_whK, W = g_whW, { pset, linea, disco } = R;
  for (let x = 1; x < 320; x += 2) pset(x, 74, W.papelS);
  // el gotelé del yeso: grumos con su luz arriba a la izquierda y su sombra abajo a la derecha (más suave bajo el año
  // y en la esquina de Atom), y dos remiendos de yeso más blanco
  for (let k = 0; k < 320; k++) { const x = Math.floor(h(k, 1, 134) * 318), y = 2 + Math.floor(h(k, 2, 134) * 56); if ((x < 176 && y < 22) || (x > 270 && y < 48)) continue;
    pset(x, y, K.blanco); pset(x + 1, y + 1, k % 2 ? W.techoD : W.techoS); if (k % 3 === 0) { pset(x + 1, y, K.blanco); pset(x + 2, y + 1, W.techoS); } }
  for (const [cx, cy, rx, ry] of [[226, 50, 16, 5], [118, 26, 12, 4]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d < 1 && g_whB4(cx + i, cy + j) < (1 - d) * 0.7) pset(cx + i, cy + j, d > 0.8 ? W.techoS : K.blanco); }
  // el cable de la lámpara, grapado al techo, que va del rosetón hacia la pared
  for (let x = 66; x <= 132; x++) { const y = 31 + Math.round((x - 66) * 0.42); pset(x, y, W.grieta); if ((x - 66) % 16 === 0) { pset(x, y - 1, K.blanco); pset(x + 1, y - 1, K.blanco); pset(x - 1, y, W.techoD); } }
  // el interruptor de palanca de la luz, en la pared bajo el reloj (placa de latón con sus dos tornillos), y el cable
  // de tela que sube por la pared hasta la moldura, sujeto con grapas
  { const { rect } = R; rect(122, 156, 134, 174, K.k); rect(123, 157, 133, 173, K.oroS); rect(123, 157, 133, 157, K.oroL); rect(124, 158, 124, 172, K.oro); rect(133, 158, 133, 173, hex('#7a5a18'));
    pset(128, 159, hex('#7a5a18')); pset(128, 171, hex('#7a5a18')); rect(127, 163, 129, 167, K.k); rect(128, 160, 128, 164, K.metalL); pset(128, 160, K.blanco);
    for (let y = 77; y <= 155; y++) { pset(129, y, hex('#6a5a48')); if ((y - 77) % 3 === 0) pset(130, y, hex('#4a3a2a')); if ((y - 77) % 26 === 0) { pset(128, y, K.metalS); pset(130, y, K.metalS); } } }
}

// las cuentas de 1959 en la pizarra de cerca (las de la vista general, a escala 2): LA ONDA con su arranque de puntos,
// EL «1420» y EL «21» (solo cifras) con su línea de puntos, a medio borrar; con la misma tiza que las escenas
const D_WHCH = hex('#e4eae0'), D_WHCH2 = hex('#aebcae');

function d_whCifras(R) {
  const tiza = (x, y, c = D_WHCH) => R.pset(x, y, h(x, y, 7) < 0.82 ? c : D_WHCH2);
  for (let x = 47; x <= 203; x++) { const y = Math.round(44 + Math.sin((x - 47) / 13.5 * Math.PI) * 13); tiza(x, y); tiza(x, y + 1, D_WHCH2); }
  for (let x = 30; x < 46; x += 3) tiza(x, 46);
  R.numero('1420', 103, 74, { tam: 16, color: D_WHCH, contorno: false, sombra: false });
  R.numero('21', 75, 102, { tam: 16, color: D_WHCH, contorno: false, sombra: false });
  for (let x = 110; x <= 191; x += 4) { tiza(x, 98); tiza(x + 1, 98); }
  for (let y = 54; y < 104; y++) for (let x = 70; x < 166; x++) if (R.pget(x, y) === D_WHCH && h(x, y, 3) < 0.18) R.pset(x, y, D_WHCH2);
}

// LA LUZ DEL DÍA en los encuadres de hoy() (o.luz): 'dia' no toca nada; 'tarde' lo entibia todo hacia el ámbar y lo
// apaga un poco; 'noche' lo hunde en la penumbra azul salvo el cono de la lámpara que cae desde foco [x, y] (hacia abajo,
// abriéndose) y su halo; [x0, y0, x1, y1] el rectángulo que se tiñe (lo de delante lo tiñe hoyDelante con el mismo
// rectángulo); suelo: por debajo, la luz de la lámpara ya no calienta. Un recorrido de píxeles, con caché por color
const D_WHNOC = hex('#10163a'), D_WHCAL = hex('#ffd890'), D_WHAMB = hex('#ff9a50'), D_WHMOR = hex('#3a2040'), d_whLuzC = new Map();

function d_whLuz(R, luz, foco = [160, 40], x0 = 0, y0 = 0, x1 = 319, y1 = 179, suelo = 158) {
  if (luz !== 'tarde' && luz !== 'noche') return;
  const B = R.buf, [lx, ly] = foco;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const i = y * 320 + x, c = B[i]; let lv = 0;
    if (luz === 'noche') { const dy = y - ly, an = 18 + Math.max(0, dy) * 0.75, dx = Math.abs(x - lx), dentro = dy > -6 && dx < an ? 1 - dx / an : 0, d = Math.hypot(x - lx, dy * 1.2);
      const k = g_whCl(0.75 - dentro * 0.9 - g_whCl(1 - d / 40) * 0.6); lv = Math.min(15, Math.floor(k * 15 + g_whB4(x, y))) + (dentro > 0.2 && y < suelo ? 16 * Math.min(3, 1 + Math.floor(dentro * 3)) : 0); }
    const key = c * 128 + lv + (luz === 'tarde' ? 64 : 0); let v = d_whLuzC.get(key);
    if (v === undefined) { if (luz === 'tarde') v = g_whMez(g_whMez(c, D_WHAMB, 0.17), D_WHMOR, 0.1);
      else { const k = (lv & 15) / 15, w = lv >> 4; v = g_whMez(c, D_WHNOC, 0.1 + 0.62 * k); if (w) v = g_whMez(v, D_WHCAL, 0.04 * w); }
      if (d_whLuzC.size > 200000) d_whLuzC.clear(); d_whLuzC.set(key, v); }
    B[i] = v; }
}

// LA VENTANA DE NOCHE ([x0, y0, x1, y1], recortada a su hueco): el cielo hundido en azul, la luna con sus manchas,
// estrellas que titilan y una farola encendida abajo, con su halo (fx, fy)
function d_whVentanaNoche(R, t, x0, y0, x1, y1, fx, fy) {
  R.recorte([x0, y0, x1, y1]);
  const hor = y0 + Math.round((y1 - y0) * 0.5);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g_whTinta(R, x, y, hex('#0a0f2a'), y < hor ? 0.62 : 0.4);
  const mx = x1 - 10, my = y0 + 9; R.disco(mx, my, 4, hex('#e8e4d0')); R.disco(mx + 1, my - 1, 1, hex('#c8c4b0')); R.pset(mx - 2, my + 2, hex('#c8c4b0'));
  for (let k = 0; k < 10; k++) { const x = x0 + 2 + Math.floor(h(k, 1, 135) * (x1 - x0 - 4)), y = y0 + 2 + Math.floor(h(k, 2, 135) * (hor - y0 - 4)); if (Math.hypot(x - mx, y - my) > 6 && Math.sin(t * 2.4 + k * 1.7) > -0.3) R.pset(x, y, k % 3 ? g_whK.blanco : hex('#c8d8ff')); }
  R.linea(fx, fy + 2, fx, y1, hex('#2a2a3a')); R.disco(fx, fy, 5, hex('#5a4a2a')); R.disco(fx, fy, 3, hex('#ffe08a')); R.disco(fx, fy, 1, hex('#fff6d0'));
  for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j) / 9; if (d < 1 && d > 0.4 && g_whB4(fx + i, fy + j) < (1 - d) * 0.5) g_whTinta(R, fx + i, fy + j, hex('#ffe08a'), 0.3); }
  R.recorte(null);
}
