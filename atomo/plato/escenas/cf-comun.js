// Fontanería y decorados del episodio 32 (The Secret: los doce cofres de 1982) en el estilo canónico pixel chibi, al nivel
// de episodios/ESTANDAR.md. Decorados (guion.md): A Nueva York 1981–2005 (la editorial de Preiss y la cámara de cajas de
// seguridad), B el cuento (el bosque antiguo, el barco de las hadas, la orilla del Nuevo Mundo), C Chicago 1983 (Grant
// Park), D Cleveland 2004 (el jardín griego), E Boston 2019 (el parque en obras y la ceremonia en Brooklyn) y F hoy (el
// estudio de Atom, el mapa de los doce puntos, un parque con la señal de no excavar).
// DERECHOS: NADA de las pinturas reales del libro (John Jude Palencar) ni de su portada: los cuadros que salen son NUESTROS
// (PIEZAS_CF.cuadro), de lejos o en trozos. Sin letras (solo números y símbolos). No se dan pistas nuevas. Nada morboso.
// Los personajes son los de ELENCO_CF y las piezas, PIEZAS_CF (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/cf-comun.js';
//   const { E, R, M } = await T.preparar('cf-gancho');
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
// las piezas del episodio (PIEZAS_CF: el cofre, la llave, la pala, las piedras, el libro, los cuadros nuestros, la excavadora…), las crea el reparto
export const PIEZAS_CF = KIT.PIEZAS_CF || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el papel y la tinta de la editorial, el verde de los parques, la tierra recién removida, la cerámica del cofre, el
    // mármol del jardín griego, el naranja de las obras y los colores de cuento
    papel: '#efe6d0', papelS: '#cfc4a8', tinta: '#2a2a3a', cesped: '#5a9a4a', cespedS: '#3e7436', tierra: '#7a5434',
    tierraS: '#523622', ceramica: '#e8dcc0', ceramicaS: '#b8a884', marmol: '#e4e0d4', marmolS: '#b4b0a4',
    obra: '#f0902a', obraS: '#c06a14', hada: '#c8a0ff', cuento: '#3a2a6a', cuentoL: '#7a5ac8', gema: '#3ad08a',
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
  const E = await escena(id, 'ep32');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1981–1983 (el libro y el primer cofre), 1983–2005 (la larga búsqueda y Cleveland), 2005–2019
  // (el secreto perdido y Boston), 2019–2027 (los nueve que faltan)
  Object.assign(R.ICONOS, {
    pala: ['...#...', '...#...', '...#...', '...#...', '..###..', '..###..', '...#...'],
    llave: ['..##...', '.#..#..', '..##...', '...#...', '...##..', '...#...', '...##..'],
    gema: ['.......', '.#####.', '#.#.#.#', '.#.#.#.', '..#.#..', '...#...', '.......'],
    cofre: ['.......', '.#####.', '#######', '#..#..#', '#######', '#######', '.......'],
  });
  R.tramosTiempo([[1981, 1983, R.PALA.ORO, 'pala'], [1983, 2005, R.PALA.VERDE ?? R.PALA.ORO, 'llave'], [2005, 2019, R.PALA.AZUL ?? R.PALA.ROJO, 'gema'], [2019, 2027, R.PALA.ROJO, 'cofre']]);
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

// ── A · Nueva York, 1981–2005 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio': la editorial de Byron Preiss en Manhattan a principios de los ochenta: mesas de dibujo inclinadas con
//     lámparas de brazo, caballetes con cuadros de fantasía NUESTROS (PIEZAS_CF.cuadro), estanterías de libros ilustrados y
//     cómics (lomos de colores, sin letras), galeradas colgadas, cajas de libros, una máquina de escribir, plantas, ventanal
//     con los depósitos de agua y los rascacielos; o.epoca: 1981 | 1997 (un ordenador beige) | 2005 (atardecer, cajas de
//     mudanza con o.mudanza, la libreta en blanco). Las mesas de delante en editorialDelante. Cámara 'mesa': la mesa de
//     Preiss de cerca, con el teléfono (o.suena), la libreta en blanco, un reloj de arena y montañas de cartas (o.cartas 0–1).
//   'banco': la cámara de cajas de seguridad de un banco de Nueva York: pared de cajitas metálicas numeradas (números
//     pequeños), reja, la puerta redonda de la cámara acorazada, suelo de mármol, una mesa de consulta (en
//     editorialDelante). Cámara 'caja': una caja abierta de cerca sobre la mesa, con el hueco para las doce piedras
//     (o.piedras 0–12, de colores) y sitio para los bonos que vuelan (los pinta la escena).
export function editorial(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de editorial(); se llama después de los actores, con las mismas opciones
export function editorialDelante(R, t, o = {}) {
  return {};
}


// ── B · El cuento ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'bosque': el Viejo Mundo de cuento, pintado como una ilustración antigua (más saturado y con orla): un bosque de
//     árboles enormes y retorcidos, setas, luciérnagas, un castillo lejano entre la niebla, la luna; hadas, duendes y un
//     dragón pequeño (PIEZAS_CF.hada, duende, dragon) que se mueven; al fondo, hombres con antorchas (siluetas lejanas).
//     Cámara 'barco': el barco de las criaturas cruzando el océano de noche, con velas de hoja, farolillos, olas con
//     espuma, estrellas fugaces y las piedras preciosas que brillan en cubierta (o.piedras).
//   'orilla': la orilla del Nuevo Mundo al amanecer: una playa con dunas y bosque, el barco fondeado, criaturas que
//     desembarcan con sus cofrecitos (o.cofres 0–12 que se esconden: brillan y se apagan). Cámara 'doce': un mapa antiguo de
//     pergamino de Norteamérica (sin letras) con doce gemas de colores que se posan en doce puntos.
export function cuento(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.cuento);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de cuento(); se llama después de los actores, con las mismas opciones
export function cuentoDelante(R, t, o = {}) {
  return {};
}


// ── C · Chicago, 1983 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'parque': Grant Park en el verano de 1983: césped, árboles, senderos, bancos, el lago Michigan con veleros al fondo y
//     el skyline de Chicago de los ochenta, una fuente lejana, gente de paseo, palomas; o.hoyos 0–6 (hoyos con montones de
//     tierra); o.hora: 'dia' | 'tarde'. Cámara 'hoyo': un hoyo de cerca en corte (se ve la tierra por capas, raíces,
//     piedras y, con o.caja 0–1, la esquina de la caja transparente asomando en la pared del hoyo), con el césped y los
//     árboles arriba; lo de delante (montón de tierra, mochila) en chicagoDelante.
//   'ciudad': las tres pistas en la ciudad: la vieja torre del agua de piedra clara (gótica, con torrecillas) en una
//     avenida con coches de los ochenta. Cámara 'sala': la fachada de una sala de conciertos de ladrillo con ventanales en
//     arco y dos medallones con notas musicales (sin letras), y al lado una plaza con una estatua de bronce de un hombre
//     alto con levita, de pie (Lincoln, de lejos).
export function chicago(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.cesped);
  return { suelo: 156 };
}
// lo de delante de los personajes en cada encuadre de chicago(); se llama después de los actores, con las mismas opciones
export function chicagoDelante(R, t, o = {}) {
  return {};
}


// ── D · Cleveland, 2004 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'jardin': el jardín de estilo griego en un parque de Cleveland, primavera de 2004: dos columnas dóricas en la entrada,
//     un estanque rectangular, un muro largo de piedra con una fila de nombres grabados (medallones y rayas, sin letras
//     legibles), parterres con flores, cipreses y árboles en flor, escalinatas, pájaros; o.hoyo 0–1 (el hoyo junto al muro,
//     con su montón de tierra). Cámara 'muro': el muro de cerca con tres medallones (un filósofo, una lira, una paleta de
//     pintor), el rectángulo de piedras del suelo contadas (o.cuenta 0–1: se iluminan una a una) y el hoyo; lo de delante
//     (carretilla, varillas, cubo) en clevelandDelante.
//   'biblioteca': una biblioteca pública de los noventa: estanterías altas, mesas con lámparas verdes, mapas desplegados,
//     un ordenador beige con módem (1997), ficheros, un globo terráqueo. Cámara 'despacho': el despacho de un abogado de
//     Nueva Jersey: diplomas (sin letras), el libro abierto, un teléfono, mapas con chinchetas, la ventana con casas.
export function cleveland(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.marmol);
  return { suelo: 154 };
}
// lo de delante de los personajes en cada encuadre de cleveland(); se llama después de los actores, con las mismas opciones
export function clevelandDelante(R, t, o = {}) {
  return {};
}


// ── E · Boston, 2019 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'obras': el parque del North End en obras, otoño de 2019: el campo de sóftbol levantado, vallas metálicas con malla
//     naranja, montones de tierra, conos, tubos, casetas de obra, el puerto y un puente al fondo, casas de ladrillo del
//     barrio con escaleras de incendios, árboles de otoño; la base del bateador (un pentágono blanco) con o.base; la
//     excavadora la pone la escena (PIEZAS_CF.excavadora). La valla de delante en bostonDelante. Cámara 'hoyo': el hoyo de
//     las obras de cerca, con trozos de plástico y cerámica en la tierra (o.trozos 0–1) y las orugas de la excavadora.
//   'biblioteca': la fachada de una gran biblioteca pública de piedra con arcos y una fila de nombres grabados (rayas, sin
//     letras) con dos medallones iluminados (o.luz), farolas y gente; en una esquina, una iglesia de ladrillo con campanario
//     y un farol (Paul Revere). Cámara 'ceremonia': una sala de un edificio histórico de Brooklyn: paneles de madera,
//     ventanales, sillas, una mesa con un paño y un cojín para la piedra (en bostonDelante), cuadros antiguos (sin
//     retratos reconocibles), flores.
export function boston(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.obra);
  return { suelo: 156 };
}
// lo de delante de los personajes en cada encuadre de boston(); se llama después de los actores, con las mismas opciones
export function bostonDelante(R, t, o = {}) {
  return {};
}


// ── F · Hoy ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio': el estudio de Atom: escritorio con una maceta grande con tierra (PIEZAS_CF.maceta), una pala de juguete,
//     libros, una lupa, la ventana con un parque, estantería, un mapa enmarcado, lámpara; lo de delante en hoyDelante.
//     Cámara 'maceta': la maceta de cerca sobre la mesa, en corte (se ve la tierra por dentro, con o.cofre 0–1 enterrado y
//     o.llave 0–1 asomando), con las cosas de la mesa alrededor.
//   'mapa': un gran mapa mural de Norteamérica (sin letras: costas, lagos, ríos, relieve) con doce chinchetas: o.encontrados
//     (0–3: Chicago, Cleveland, Boston se ponen verdes) y o.dudas 0–1 (los nueve interrogantes que saltan); marco de
//     madera, hilos rojos, fotos sujetas. Cámara 'tele': un salón de 2018 con un televisor grande (un programa de aventuras
//     genérico: selva, linterna, sin logos), un portátil con una subasta (un libro y una cifra que sube con o.precio), sofá.
//   'parque': un parque público de hoy con una señal de «no excavar» (icono: una pala tachada, sin letras), un guarda,
//     sendero, bancos, árboles, un cañón antiguo y una muralla de ladrillo de un fuerte (terreno federal). Cámara
//     'muelle': un muelle de Charleston con un gran barco museo gris al fondo (un portaaviones, de lejos), palmeras,
//     marisma; con o.cambio 0–1 el parque se llena de edificios nuevos y pasa una tormenta (los parques cambian).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 160 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
