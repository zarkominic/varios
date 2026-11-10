// Fontanería y decorados del episodio 29 (El mapa de Piri Reis: la Antártida que no era y el Colón que sí) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Estambul 1929 (la biblioteca de
// Topkapı, el palacio y su sala de museo de hoy, la prensa de 1929), B el mar 1500–1511 (la galera otomana, la costa de
// España, la costa de Brasil), C Galípoli y El Cairo 1513–1517 (el taller de Piri Reis, el puerto, el salón del sultán),
// D Estados Unidos 1956–1968 (el aula de Keene, la base aérea, la librería y la imprenta), E hoy (el estudio de Atom, la
// Antártida, el despacho del historiador) y F el pergamino de 1513 (el mapa mismo, a pantalla completa).
// EL MAPA se dibuja a nuestra manera, en pixel: pergamino de piel de gacela, costas a tinta, rosas de los vientos,
// barquitos, loros, el pez de san Brandán; NUNCA calcado, y sin letras legibles (las notas son garabatos de tinta).
// Personas reales por sus atributos. En 1929 nadie lleva fez (prohibido en Turquía desde 1925).
// Los personajes son los de ELENCO_PR y PIEZAS_PR (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bordas, pupitres) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/pr-comun.js';
//   const { E, R, M } = await T.preparar('pr-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'estudio' })]], { año: 2026 });
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import * as KIT from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras };
// las piezas del episodio (PIEZAS_PR: el rollo, el pergamino, cartas de navegación, lupa, compás, tintero, catalejo,
// libro, astrolabio, cofre, rosa de los vientos, testigo de hielo), las crea el reparto
export const PIEZAS_PR = KIT.PIEZAS_PR || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el pergamino de piel de gacela y sus tintas, el mar, el turquesa y el oro otomanos, el hielo
    pergamino: '#e8d4a4', pergaminoS: '#b89a64', tinta: '#2a2018', tintaRoja: '#a83224', tintaVerde: '#3a6a3a',
    tintaAzul: '#2a4a7a', mar: '#2a5a7a', marS: '#173a52', espuma: '#e8f0f0', turquesa: '#3a9a9a', oroOt: '#d8a838',
    hielo: '#e8f2f8', hieloS: '#a8c4d8', tweed: '#7a6a4a',
    // madera y piedra
    madera: '#7a4a2a', maderaS: '#4a2a18', piedra: '#7a7680', piedraS: '#4a4652', yeso: '#e4d8bc',
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
  const E = await escena(id, 'ep29');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1501 (la captura), 1513 (el mapa), 1929 (el hallazgo), 1966 (el libro de Hapgood), 2026
  Object.assign(R.ICONOS, {
    barco: ['...#...', '...##..', '...###.', '...#...', '#######', '.#####.', '.......'],
    rollo: ['.#####.', '#.....#', '.#####.', '.#...#.', '.#####.', '.......', '.......'],
    lupa: ['.###...', '#...#..', '#...#..', '.###...', '....#..', '.....#.', '.......'],
    copo: ['...#...', '#.#.#.#', '.#####.', '###.###', '.#####.', '#.#.#.#', '...#...'],
  });
  R.tramosTiempo([[1501, 1513, R.PALA.AZUL ?? R.PALA.ORO, 'barco'], [1513, 1929, R.PALA.ORO, 'rollo'], [1929, 1966, R.PALA.ROJO, 'lupa'], [1966, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'copo']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };


// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };



// ── A · Estambul, 1929 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'biblioteca': la biblioteca del palacio de Topkapı en 1929: estanterías de madera con libros y legajos atados, cofres
//     de madera con herrajes, alfombras, ventanas con celosía y luz polvorienta, azulejos de İznik (motivos vegetales
//     azules y turquesa) en el zócalo, una escalera de mano; montones de papeles olvidados con polvo. Una mesa en
//     estambulDelante. Cámara 'mesa': la mesa larga de cerca con el pergamino que se despliega (PIEZAS_PR.pergamino,
//     o.abre 0–1, y o.sigue 0–1 para el gag de que se sigue desplegando hasta el suelo), una lupa, una lámpara de 1929.
//   'palacio': el exterior del palacio de Topkapı: los muros, cúpulas de plomo y las chimeneas altas de las cocinas, el
//     patio con cipreses, y detrás el Bósforo con barcos de vapor de 1929 y la otra orilla; otoño. Cámara 'museo': la sala
//     del museo de HOY: penumbra, una vitrina con el pergamino iluminado, cordones, cartelas sin letras, azulejos,
//     visitantes.
//   'prensa': una imprenta de periódicos de 1929: rotativa que escupe pliegos, linotipias, operarios, periódicos colgados
//     a secar (columnas de rayas, un dibujito de un mapa, sin letras). Cámara 'quiosco': una calle de ciudad de 1929 con un
//     quiosco de periódicos, gente con sombrero que compra y lee, un tranvía.
export function estambul(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de estambul(); se llama después de los actores, con las mismas opciones
export function estambulDelante(R, t, o = {}) {
  return {};
}


// ── B · El mar, 1500–1511 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'galera': la cubierta de una galera otomana en alta mar: remos, el palo con la vela latina, cordajes, el castillo de
//     popa con el farol, una bandera roja (sin símbolos legibles), marineros; el mar con oleaje y el horizonte. La borda en
//     marDelante. Cámara 'bodega': la bodega de la galera: barriles, cuerdas, una lámpara que se mece, un prisionero con
//     un rollo de cartas de navegación (PIEZAS_PR.carta) sobre un barril.
//   'costa': el mar frente a la costa de España en 1501: la galera otomana alcanza naos españolas (cascos altos, velas
//     cuadradas con cruces genéricas), humo de cañonazos, la costa con montes y una torre vigía. Cámara 'tormenta': el
//     mar de noche con una tormenta, rayos y olas enormes (1511), un barco que lucha contra el viento (sin hundimientos
//     ni ahogados: solo el temporal).
//   'brasil': la costa de Brasil en 1500: playa con palmeras, selva espesa, loros, un monte, naos portuguesas (cruces
//     rojas en las velas) fondeadas y un bote. Cámara 'cubierta': la cubierta de una nao portuguesa: un piloto dibuja la
//     costa en una carta sobre un barril, con el astrolabio (PIEZAS_PR.astrolabio) y la costa al fondo.
export function mar(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de mar(); se llama después de los actores, con las mismas opciones
export function marDelante(R, t, o = {}) {
  return {};
}


// ── C · Galípoli y El Cairo, 1513–1517 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'taller': el taller de Piri Reis en Galípoli: una mesa de dibujo grande con cartas desplegadas, tinteros y plumas
//     (PIEZAS_PR.tintero), compases (PIEZAS_PR.compas), un astrolabio, rollos en cestas, alfombras, cojines, una ventana con
//     arco que da al puerto con galeras; lámpara de aceite. La mesa en galipoliDelante. Cámara 'mesa': la mesa de cerca,
//     cenital: el pergamino a medio dibujar, la mano con la pluma (o.trazo 0–1), cartas pequeñas alrededor como piezas de
//     un rompecabezas.
//   'puerto': el puerto de Galípoli hacia 1475–1513: el estrecho de los Dardanelos, galeras amarradas, el muelle de
//     piedra, almacenes, una mezquita con su alminar al fondo, gaviotas, pescadores. Cámara 'muelle': el muelle de cerca
//     con fardos, cuerdas, una pasarela a una galera.
//   'cairo': el salón del sultán en El Cairo en 1517: columnas, arcos de piedra a rayas, alfombras, un estrado con cojines,
//     lámparas colgadas, guardias con turbante, ventanas con celosía y palmeras fuera. Cámara 'trono': el estrado de cerca,
//     con el sultán sentado y un cofre.
export function galipoli(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de galipoli(); se llama después de los actores, con las mismas opciones
export function galipoliDelante(R, t, o = {}) {
  return {};
}


// ── D · Estados Unidos, 1956–1968 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'aula': un aula de un college de New Hampshire en los cincuenta: pupitres de madera, pizarra verde con tiza (dibujos
//     de costas, sin letras), mapas del mundo colgados, un globo, ventanas con árboles de otoño, radiador. Los pupitres
//     de delante en americaDelante. Cámara 'pupitre': un pupitre de cerca con el mapa de 1513 en copia y el papel de calco
//     encima (o.calco 0–1: se desliza), lápices y una regla.
//   'base': el despacho de una base aérea de EE. UU. en 1960: escritorio metálico, máquina de escribir, archivadores, una
//     ventana con aviones de reconocimiento en la pista (siluetas genéricas, sin insignias), un mapa polar en la pared.
//     Cámara 'buzon': el porche de una casa de profesor en New Hampshire con el buzón y hojas de otoño.
//   'libreria': una librería de 1966–1968: estanterías llenas, una mesa de novedades con pilas de libros (portadas con
//     carabelas, naves o mapas, sin letras), escaparate a la calle, clientes. Cámara 'imprenta': una imprenta de libros de
//     los sesenta: la máquina que saca pliegos, pilas de libros encuadernados.
export function america(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de america(); se llama después de los actores, con las mismas opciones
export function americaDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom: estantería, ventana con nubes que cambian de forma, un
//     globo terráqueo y un mapa enrollado (PIEZAS_PR.rollo) en el escritorio, un enchufe en la pared; en la cámara 'mesa',
//     el escritorio de cerca con el mapa desplegado, una taza y su mancha de café (o.mancha 0–1).
//   'antartida': la Antártida: la costa blanca con témpanos y el mar oscuro, un velero de 1820 entre los hielos, montañas
//     bajo la nieve, pingüinos a lo lejos. Cámara 'radar': un corte del hielo: kilómetros de capas de hielo encima y la roca
//     de debajo con su perfil; un avión con radar arriba; un testigo de hielo (PIEZAS_PR.testigoHielo) con sus capas.
//   'despacho': el despacho de un historiador de hoy: librerías, un escritorio con un globo y el mapa de 1513 en una
//     copia grande, una regla, un portátil, una lámpara. Cámara 'globo': el globo de cerca con Sudamérica, la Antártida y
//     el paso de Drake (mar bravo entre las dos).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}


// ── F · El pergamino de 1513 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'mapa' (sin personajes salvo una mano o una lupa): el mapa de Piri Reis a pantalla completa, a nuestra manera, en
//     pixel. o.vista: 'entero' (lo que se conserva: el Atlántico con la costa de España y África a la derecha y la de
//     Sudamérica a la izquierda, que abajo se tuerce hacia el este; islas del Caribe arriba a la izquierda; rosas de los
//     vientos con sus líneas de rumbo; barquitos; notas como garabatos de tinta), 'caribe' (de cerca: las islas, La
//     Española de pie, una carabela), 'brasil' (la costa con loros y árboles), 'sur' (la costa que se tuerce; o.borde
//     para enseñar el borde del pergamino), 'brandan' (el pez gigante con dos monjes y su fuego, o.pez 0–1 para que se
//     sumerja). o.trazo 0–1: la costa se va dibujando; o.borrado 0–1: el resto del mundo (los dos tercios perdidos) se
//     desvanece; o.vivo: los dibujos se mueven (loros, olas, barquitos). Cámara 'detalle': el pergamino de cerca, con su
//     textura, pliegues y una lupa (PIEZAS_PR.lupa) que lo recorre (o.lupa {x, y}).
export function pergamino(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de pergamino(); se llama después de los actores, con las mismas opciones
export function pergaminoDelante(R, t, o = {}) {
  return {};
}
