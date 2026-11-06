// Fontanería y decorados del episodio 23 (Las tradiciones del año: de dónde vienen de verdad) en el estilo canónico pixel
// chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Año Nuevo (la Puerta del Sol, una casa burguesa de
// Madrid de 1890, un viñedo de Alicante, un salón de 1962, el despacho de un recaudador inglés de 1752, un templo de
// Babilonia), B el amor (una iglesia romana del siglo III, el gabinete de Chaucer, una celda de la Torre de Londres, una
// oficina de correos victoriana, el taller de Esther Howland), C primavera y otoño (una cocina rural con gallinero, un
// jardín alemán de 1682, una granja de Pensilvania, una aldea irlandesa, una calle de Canadá en 1927, una calle de EE. UU.
// en los cincuenta), D las celebraciones (un salón alemán de 1746, un kínder de 1893, un juzgado de 2015, la capilla real
// de 1840, una iglesia de París en 1558, el taller de un joyero) y E hoy (el salón de Atom, la medianoche).
// Los personajes son los de ELENCO_TR y PIEZAS_TR (pixel-chibi.js): dibujados por nosotros, sin logos ni letras.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, bancos, el
// estrado) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: respeto a las religiones; nada morboso (la cachetada al rey, de teatro; el diablo de Jack, de cuento).
//
//   import * as T from '/atomo/plato/escenas/tr-comun.js';
//   const { E, R, M } = await T.preparar('tr-gancho');
//   T.rodar(E, R, [[0, (t) => T.anuevo(R, t, { encuadre: 'sol' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_TR: la uva con ojos, el pastel, la liebre, el nabo…), las crea el reparto
export const PIEZAS_TR = KIT.PIEZAS_TR || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // noche de fiesta: azul noche, dorado de las luces, morado de Nochevieja
    noche: '#141a3a', nieve: '#eef4fa', nieveS: '#b8c8dc', oroN: '#f0c040', oroNS: '#a87a18', moradoN: '#5a2a7a', vela: '#ffe08a',
    // la uva con ojos
    uva: '#6a2a7a', uvaS: '#3e1450', uvaB: '#b07ac8', uvaV: '#7ab83a',
    // el amor: rojo, rosa, encaje
    rojoA: '#b8202a', rosa: '#f0a0b8', encaje: '#f6f0e4',
    // la primavera y el otoño: hierba, cáscara de huevo, calabaza, nabo
    hierba: '#5a9a3a', calabaza: '#e07a20', nabo: '#e8e0c8', naboS: '#9a6a8a',
    // piedra, madera y yeso de las épocas
    piedra: '#7a7680', piedraS: '#4a4652', madera: '#7a4a2a', maderaS: '#4a2a18', yeso: '#e4d8bc',
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
  const E = await escena(id, 'ep23');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1415 (el preso de Azincourt), 1682 (la liebre), 1840 (el penique y el vestido), 1893 (la canción), 2026
  Object.assign(R.ICONOS, {
    corazon: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...', '.......'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
    uva: ['...#...', '..#....', '.##.##.', '#######', '.##.##.', '..###..', '...#...'],
  });
  R.tramosTiempo([[1415, 1700, R.PALA.ORO, 'corazon'], [1700, 1900, R.PALA.ROJO, 'vela'], [1900, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'uva']]);
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



// ── A · Año Nuevo ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'sol': la Puerta del Sol de Madrid en la última noche del año: la Casa de Correos con su torre y el reloj grande (la bola que baja), los edificios de alrededor con balcones, farolas, la multitud con gorros de fiesta y racimos, confeti, el cielo de noche con estrellas; o.bola 0–1 (baja la bola), o.campanada 0–12 (destellos en cada una). Cámara 'reloj': la torre del reloj de cerca con la esfera y la bola.
//   'casa1890': el salón de una casa burguesa de Madrid en 1890: papel pintado, cortinas de terciopelo, lámpara de gas, mesa con mantel, champán y un frutero con uvas, balcón a la calle; cámara 'calle': la calle de abajo de noche con farolas de gas y unos madrileños con gorra que miran (y se burlan).
//   'vinedo': un viñedo de Alicante en 1909 en la vendimia tardía: cepas en hileras con racimos, tierra roja, masía blanca, montañas secas, cielo de otoño; cámara 'cajas': cajas de madera llenas de uvas que sobran en el almacén con una báscula.
//   'tele62': un salón de 1962: tele de tubo en blanco y negro sobre un mueble, sofá, lámpara de pie, papel pintado de época, mesa con un plato de uvas; o.pantalla(R,t,rect) para pintar dentro. Cámara 'pantalla': la tele de cerca.
//   'despacho': el despacho de un recaudador inglés en 1752: escritorio con libros de cuentas, pluma y tintero, estantes con legajos, ventana emplomada a una calle de Londres, calendario de pared con meses; cámara 'libro': el libro de cuentas abierto de cerca (sin letras: columnas y cifras).
//   'babilonia': un templo de Babilonia en la fiesta de Año Nuevo: ladrillo vidriado azul con relieves de leones y dragones (sin escritura legible), el zigurat al fondo, braseros, palmeras, cielo de amanecer; cámara 'altar': el altar con el trono y las insignias del rey.
// Delante: anuevoDelante (la mesa del salón, las cajas, el escritorio, el altar). Devuelve { suelo, … } con la geometría de cada encuadre.
export function anuevo(R, t, o = {}) {
  const enc = o.encuadre ?? 'sol';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en año nuevo (se llama después de los actores, con las mismas opciones)
export function anuevoDelante(R, t, o = {}) {}

// ── B · El amor ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'iglesia': una pequeña iglesia romana del siglo III, con respeto: ábside con pinturas sencillas (sin rostros detallados), lámparas de aceite, columnas; cámara 'vitral': un vitral o fresco con dos santos de túnica, sencillo.
//   'chaucer': el gabinete de un poeta inglés del siglo XIV: escritorio de madera, rollos y códices, vela, ventana gótica abierta a un jardín con una rama donde se posan pájaros por parejas; cámara 'ventana': la ventana de cerca con la rama y los pájaros.
//   'torre': una celda de la Torre de Londres en el siglo XV: muros de piedra gruesos, ventana con barrotes y el Támesis al fondo, una mesa con vela y papel, un camastro, rayas en la pared; cámara 'mesa': la mesa de cerca con la carta y la vela.
//   'correos': una oficina de correos victoriana de 1840: mostrador de madera, casilleros, básculas, sacas, una ventana a la calle con nieve y coches de caballos; cámara 'mostrador': el mostrador de cerca con sellos y tarjetas.
//   'taller': el taller de Esther Howland en Worcester, Massachusetts, hacia 1848: mesas largas con encaje de papel, tijeras, cola, flores de papel, ventanas con luz de invierno; cámara 'mesa': la mesa de trabajo de cerca con una tarjeta a medio hacer.
// Delante: amorDelante (el escritorio, la mesa de la celda, el mostrador, la mesa del taller). Devuelve { suelo, … } con la geometría de cada encuadre.
export function amor(R, t, o = {}) {
  const enc = o.encuadre ?? 'iglesia';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en el amor (se llama después de los actores, con las mismas opciones)
export function amorDelante(R, t, o = {}) {}

// ── C · Primavera y otoño ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'gallinero': una cocina rural de primavera con la puerta abierta al gallinero: fogón, ollas, una mesa con cestas de huevos, gallinas que entran y salen, una iglesia con campanario al fondo por la ventana; cámara 'cestas': la mesa de cerca con huevos pintándose.
//   'jardin': un jardín alemán de 1682 en primavera: setos, arbustos en flor, un pozo, una casa de entramado, niños con ropa de la época; cámara 'arbustos': los arbustos de cerca con huevos de colores escondidos.
//   'pensilvania': una granja de Pensilvania en el siglo XVIII: granero rojo de piedra y madera, cercas, campos, un camino; cámara 'porche': el porche con un nido hecho con un gorro.
//   'aldea': una aldea irlandesa en otoño: casas encaladas con tejado de paja, muros de piedra seca, colinas verdes, niebla, una iglesia con velas por Todos los Santos y una hoguera de fiesta en la colina; o.noche 0–1. Cámara 'hoguera': la hoguera de cerca con gente bailando.
//   'calle1927': una calle de un pueblo de Canadá en 1927 con la primera nieve: casas de madera con porche, farolas, hojas secas, una imprenta pequeña; cámara 'puerta': una puerta con calabaza tallada y niños disfrazados.
//   'calle50': una calle de las afueras de EE. UU. en los años cincuenta: casas con jardín, calabazas en los porches, coches de época, árboles de otoño; cámara 'porche': un porche de cerca con un tazón de dulces.
// Delante: estacionesDelante (la mesa de la cocina, la cerca, el muro de piedra, el porche). Devuelve { suelo, … } con la geometría de cada encuadre.
export function estaciones(R, t, o = {}) {
  const enc = o.encuadre ?? 'gallinero';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en primavera y otoño (se llama después de los actores, con las mismas opciones)
export function estacionesDelante(R, t, o = {}) {}

// ── D · Las celebraciones ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'salon1746': un salón alemán de 1746: chimenea, cuadros, candelabros, mesa con un pastel con velas, ventanas altas; cámara 'pastel': el pastel de cerca (o.velas, o.encendidas).
//   'kinder': un kínder de Louisville, Kentucky, en 1893: pupitres pequeños, piano vertical, pizarra con dibujos (sin letras), ventanas con luz, juguetes de madera; cámara 'piano': el piano de cerca con la maestra.
//   'juzgado': una sala de juzgado de 2015: estrado de madera con el juez, bandera sin escudo, bancos, mesas de abogados; cámara 'estrado': el estrado de cerca con el mazo.
//   'capilla': la capilla real de 1840 en Londres: bancos, órgano, vitrales, flores blancas, alfombra roja hacia el altar; cámara 'altar': el altar de cerca.
//   'paris1558': Notre Dame de París en 1558, por dentro: nave gótica con columnas, rosetón, velas, un tablado para la boda; cámara 'nave': el tablado de cerca.
//   'joyero': el taller de un joyero: banco de trabajo con lupas y herramientas, vitrina con anillos, una lámina anatómica de una mano en la pared; cámara 'lamina': la lámina de cerca (o.vena 0–1).
// Delante: fiestasDelante (la mesa del pastel, los pupitres, el estrado, el banco de trabajo). Devuelve { suelo, … } con la geometría de cada encuadre.
export function fiestas(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon1746';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en las celebraciones (se llama después de los actores, con las mismas opciones)
export function fiestasDelante(R, t, o = {}) {}

// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'salon': el salón de Atom en la última noche del año: árbol todavía puesto, ventana con fuegos artificiales lejanos, calendario gigante en la pared (o.mes), mesa con un racimo de uvas, sofá; cámara 'calendario': el calendario de cerca que pasa hojas.
//   'medianoche': el mismo salón a medianoche, con confeti y luces bajas, el reloj de pared casi en las doce; cámara 'mesa': la mesa de cerca con el racimo y la uva con ojos.
// Delante: hoyDelante (el sofá y la mesa). Devuelve { suelo, … } con la geometría de cada encuadre.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en hoy (se llama después de los actores, con las mismas opciones)
export function hoyDelante(R, t, o = {}) {}

// la uva con ojos, el gag del episodio (PIEZAS_TR.uva)
export function uva(R, x, y, t, o = {}) { if (PIEZAS_TR.uva) PIEZAS_TR.uva(R, x, y, { t, ...o }); }
