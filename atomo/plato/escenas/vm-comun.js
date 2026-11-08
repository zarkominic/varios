// Fontanería y decorados del episodio 25 (El manuscrito Voynich: el libro que nadie puede leer) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la biblioteca de Yale (la sala de libros raros,
// la mesa de estudio), B Praga y Roma (el gabinete de Rodolfo II hacia 1610, el estudio de Kircher en el Colegio Romano,
// el laboratorio del alquimista Baresch, la villa Mondragone en 1912, Nueva York en los sesenta), C los descifradores (el
// despacho de Newbold en Filadelfia en 1921, la oficina de descifrado de los cuarenta), D el laboratorio (radiocarbono en
// Arizona en 2009, la sala de ordenadores, un taller de escribas del siglo XV) y E hoy (el estudio de Atom con la maceta).
// Las páginas del libro, reinterpretadas en pixel (plantas, ruedas de estrellas, estanques, tarros), sin copiar páginas
// enteras; las figuras de los estanques, pequeñas y sin desnudos; los signos del libro, inventados (no letras reales).
// Los personajes son los de ELENCO_VM y PIEZAS_VM (pixel-chibi.js), sin logos ni letras legibles.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, atriles, bancos) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/vm-comun.js';
//   const { E, R, M } = await T.preparar('vm-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'estudio' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_VM: el libro, la planta imposible, la lupa, el microscopio…), las crea el reparto
export const PIEZAS_VM = KIT.PIEZAS_VM || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el pergamino y la tinta del libro, el verde de los estanques, el oro de Praga
    pergamino: '#e8d8b0', pergaminoS: '#b8a07a', tinta: '#5a3a24', verdeE: '#6aa86a', azulE: '#5a8ac8', oroP: '#d8a840',
    // las bibliotecas y laboratorios: mármol, madera oscura, bata, pantallas
    marmol: '#d8d0c0', marmolS: '#a8a090', nogal: '#5a3a24', nogalS: '#3a2414', bata: '#eef0f2', pantalla: '#2a5a8a',
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
  const E = await escena(id, 'ep25');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1404 (el pergamino), 1600 (Praga), 1912 (Voynich), 1944 (los descifradores), 2026
  Object.assign(R.ICONOS, {
    libro: ['#######', '#..#..#', '#..#..#', '#..#..#', '#..#..#', '#######', '.......'],
    corona: ['#..#..#', '##.#.##', '#######', '#######', '.#####.', '.......', '.......'],
    lupa: ['.###...', '#...#..', '#...#..', '#...#..', '.###...', '....##.', '.....##'],
    planta: ['..#.#..', '.#.#.#.', '..###..', '...#...', '..###..', '.#.#.#.', '#..#..#'],
  });
  R.tramosTiempo([[1404, 1600, R.PALA.ORO, 'libro'], [1600, 1912, R.PALA.ROJO, 'corona'], [1912, 1990, R.PALA.AZUL ?? R.PALA.ROJO, 'lupa'], [1990, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'planta']]);
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







// ── A · La biblioteca ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'biblioteca': la sala de libros raros de Yale de noche: paredes de paneles de mármol translúcido por los que entra una
//     luz dorada, una torre de cristal llena de libros antiguos en el centro, vitrinas, la sala en penumbra; en un atril,
//     el libro abierto bajo un foco (PIEZAS_VM.libroVoynich, o.pagina). El atril y la vitrina de delante van en
//     bibliotecaDelante.
//     Cámara 'mesa': la mesa de estudio: el libro abierto grande con sus signos y un dibujo (o.pagina 'planta' |
//     'estrellas' | 'estanques' | 'tarros'), guantes blancos, una lupa, un lápiz, una libreta, la lámpara verde.
//   'pagina': una página del libro a pantalla completa como inserto (o.pagina; o.pasa 0–1 pasa la hoja; o.brilla los
//     signos en oro): pergamino con manchas, cosido, el dibujo grande y los renglones de signos inventados.
//     Cámara 'tablero': un tablero de detective sobre la mesa: el libro en el centro con un «?», hilos rojos a una moneda
//     con corona, un microscopio, una etiqueta de librero y un mapa de Europa con Praga, Roma y Nueva York.
export function biblioteca(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de biblioteca(); se llama después de los actores, con las mismas opciones
export function bibliotecaDelante(R, t, o = {}) {
  return {};
}


// ── B · Praga y Roma ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'gabinete': el gabinete de curiosidades de Rodolfo II en Praga hacia 1610: estanterías con relojes, astrolabios,
//     conchas, un cocodrilo disecado colgado del techo, globos, alambiques, un cuadro de frutas, la ventana al castillo de
//     Praga; el trono pequeño. La mesa de las rarezas va en praguaDelante.
//     Cámara 'ultravioleta': la primera página del libro bajo una lámpara de luz violeta, donde aparece una firma borrada
//     (rayas, sin letras) que brilla (o.uv 0–1).
//   'colegio': el estudio de Kircher en el Colegio Romano en 1665: jeroglíficos en las paredes, un obelisco de maqueta,
//     estanterías de libros, un telescopio, una ventana a los tejados de Roma. El escritorio va en praguaDelante.
//     Cámara 'carta': una carta con lacre sobre el escritorio, que se abre (o.abre 0–1), la pluma y el tintero.
//   'alquimista': el laboratorio de Baresch en Praga hacia 1639: alambiques, hornillo con fuego, frascos, pergaminos,
//     calaveras NO (nada morboso: tarros y hierbas colgando). La mesa va en praguaDelante.
//     Cámara 'copia': la mesa de cerca con Baresch copiando unas páginas a la luz de una vela.
//   'villa': la villa Mondragone cerca de Roma en 1912: una sala grande con frescos desvaídos, cajas de libros de los
//     jesuitas abiertas, polvo en los haces de luz, la ventana a los jardines y los cipreses. Las cajas de delante van en
//     praguaDelante.
//     Cámara 'caja': una caja abierta de cerca con libros viejos y el libro asomando.
//   'nuevaYork': una librería de Nueva York en los sesenta: estanterías, una caja fuerte, un cartel de precio sin letras
//     (cifras), la ventana a la calle con taxis. El mostrador va en praguaDelante.
//     Cámara 'cajaFuerte': la caja fuerte que se abre (o.abre 0–1) con el libro dentro.
export function pragua(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de pragua(); se llama después de los actores, con las mismas opciones
export function praguaDelante(R, t, o = {}) {
  return {};
}


// ── C · Los descifradores ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'filadelfia': el despacho de un profesor de Filadelfia en 1921: estanterías, el microscopio en la mesa, periódicos,
//     una pizarra con signos, la ventana a la ciudad con humo. El escritorio va en descifradoresDelante.
//     Cámara 'ocular': lo que se ve por el microscopio: un trazo de tinta enorme con sus grietas, en el círculo del ocular
//     (o.mosca: una mosca que cruza, para el gag).
//   'oficina44': una oficina de descifrado de los años cuarenta: mesas largas con máquinas de escribir y de tarjetas,
//     archivadores, mapas y tablas en la pared, lámparas colgantes, una máquina de descifrar con su tira de papel
//     (PIEZAS_VM.maquinaDescifrar, o.tira). Las mesas de delante van en descifradoresDelante.
//     Cámara 'fichas': las fichas del texto extendidas sobre la mesa, con una lupa y un lápiz.
export function descifradores(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de descifradores(); se llama después de los actores, con las mismas opciones
export function descifradoresDelante(R, t, o = {}) {
  return {};
}


// ── D · El laboratorio ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'radiocarbono': el laboratorio de radiocarbono de Arizona en 2009: el acelerador con sus tubos, pantallas, batas
//     colgadas, la ventana al desierto con saguaros. La mesa de muestras va en laboratorioDelante.
//     Cámara 'muestra': unas pinzas que cortan un trocito del borde del pergamino y la pantalla con la franja 1404–1438.
//   'ordenadores': una sala de ordenadores de hoy: pantallas con gráficas de palabras (barras), una pizarra con signos del
//     libro, tazas, plantas. Las mesas de delante van en laboratorioDelante.
//     Cámara 'grafica': la pantalla de cerca con la gráfica de frecuencias (o.baila 0–1: las barras se mueven en fila).
//   'escriptorio': un taller de escribas del siglo XV: pupitres inclinados, tinteros, plumas, pergaminos tensados, una
//     ventana gótica con luz. Los pupitres de delante van en laboratorioDelante.
//     Cámara 'pluma': un pupitre de cerca con la pluma escribiendo signos en el pergamino.
export function laboratorio(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de laboratorio(); se llama después de los actores, con las mismas opciones
export function laboratorioDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'estudio': el estudio de Atom de noche: estanterías con libros raros, un globo terráqueo, la ventana con la luna, la
//     lámpara; en la mesa, la maceta con la planta imposible (PIEZAS_VM.plantaImposible, o.crece, o.flor). La mesa va en
//     hoyDelante.
//     Cámara 'pantalla': la pantalla de Atom con el libro escaneado (páginas que pasan) y la maceta al lado.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
