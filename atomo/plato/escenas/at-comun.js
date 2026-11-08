// Fontanería y decorados del episodio 26 (Atari enterró sus juegos en el desierto) en el estilo canónico pixel chibi, al
// nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Atari (un bar de 1972 con la máquina de Pong, un salón de 1977,
// las oficinas de 1982, el despacho del programador, la sala de juntas), B las tiendas (la juguetería de 1982 y de 1984,
// el almacén), M el mundo (el cine de 1982, una tienda de Tokio en 1983, un escaparate de Nueva York en 1985), C el
// desierto (el vertedero de Alamogordo en 1983 y en 2014, el pueblo de noche, la carpa de los arqueólogos) y E hoy (el
// estudio de Atom con el foso, la consulta del psicoterapeuta, la vitrina del museo).
// SIN E.T. NI LOGOS: los juegos son cartuchos genéricos con un icono pixel sin letras, y las pantallas, juegos inventados
// al estilo de la consola (fosos, un teléfono, flores). Los personajes son los de ELENCO_AT y PIEZAS_AT (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mostradores, mesas, la barra del
// bar, vallas) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/at-comun.js';
//   const { E, R, M } = await T.preparar('at-gancho');
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
// las piezas del episodio (PIEZAS_AT: cartuchos genéricos, la consola vieja, la tele, el foso…), las crea el reparto
export const PIEZAS_AT = KIT.PIEZAS_AT || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // los ochenta: madera de consola, negro, naranja y marrón de la época, el verde de los monitores
    maderaC: '#8a5a2a', maderaCS: '#5a3a1a', negroC: '#1a1a1e', naranja80: '#e07a2a', marron80: '#7a4a24', verdeMon: '#5adc5a',
    // el desierto: arena, matorral, cielo de Nuevo México, cemento
    arena: '#d8b47a', arenaS: '#a8844a', matorral: '#7a8a4a', cieloNM: '#5aa8e0', cemento: '#9a9a96', cementoS: '#6a6a66',
    // cartuchos y cajas
    carton: '#c8a06a', cartonS: '#8a6a3a', plastico: '#2a2a30',
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
  const E = await escena(id, 'ep26');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1972 (Pong), 1982 (E.T. y el entierro), 1985 (la vuelta), 2014 (la excavación) y 2026
  Object.assign(R.ICONOS, {
    mando: ['...#...', '...#...', '..###..', '.#####.', '#######', '#######', '.......'],
    cartucho: ['#######', '#.....#', '#.###.#', '#.###.#', '#######', '.#.#.#.', '.......'],
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    pala: ['...#...', '...#...', '...#...', '..###..', '.#####.', '.#####.', '..###..'],
  });
  R.tramosTiempo([[1972, 1982, R.PALA.ORO, 'mando'], [1982, 1985, R.PALA.ROJO, 'cartucho'], [1985, 2014, R.PALA.AZUL ?? R.PALA.ROJO, 'estrella'], [2014, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'pala']]);
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







// ── A · Atari ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'bar72': un bar de California en 1972: barra de madera, taburetes, neones sin letras, una gramola, la máquina de Pong
//     de madera con su pantalla (dos rayas y una pelota que rebota), gente pequeña al fondo, la ventana a la calle con un
//     coche de época. La barra y los taburetes de delante van en atariDelante.
//     Cámara 'pantalla': la pantalla de la máquina de cerca: las dos palas, la pelota que rebota, el marcador en cifras.
//   'salon77': un salón de 1977: moqueta naranja, papel pintado marrón, sofá de pana, lámpara de lava, la tele de madera
//     con la consola nueva enchufada (PIEZAS_AT.consolaVieja) y cartuchos en la mesita; ventana a una calle de
//     suburbio. o.pantalla (R, t, [x0, y0, x1, y1]) pinta dentro de la tele. La mesita va en atariDelante.
//     Cámara 'tele': la tele de cerca, con o.pantalla, la consola, los mandos y los cartuchos.
//   'oficinas': las oficinas de Atari en 1982: cubículos con monitores, pósteres de juegos inventados (sin letras),
//     máquinas recreativas al fondo, una máquina de café, plantas, ventanales con palmeras de California. Las mesas de
//     delante van en atariDelante.
//     Cámara 'calendario': el calendario gigante de pared (o.mes 7–9, o.dia, o.marca: el 1 de septiembre rodeado en rojo,
//     o.hojas 0–1: hojas que se arrancan) y un cronómetro.
//   'despachoProg': el despacho del programador de noche: terminal con texto verde (rayas, sin letras), torres de manuales,
//     tazas de café, pizarra blanca con dibujos de fosos, la tele de pruebas con la consola, la ventana con la noche.
//     El escritorio va en atariDelante.
//     Cámara 'pantalla': la pantalla de la tele con un juego inventado (o.juego 'fosos' | 'telefono' | 'retocado': el
//     protagonista, un muñequito genérico verde, que cae en un foso y sale; o.cae 0–1).
//   'juntas': la sala de juntas de 1983: mesa larga, sillones, la ventana a la ciudad, un proyector con una gráfica que
//     cae (o.grafica 0–1). La mesa va en atariDelante.
//     Cámara 'grafica': la pantalla de proyección con la gráfica en rojo que se desploma y cifras.
export function atari(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de atari(); se llama después de los actores, con las mismas opciones
export function atariDelante(R, t, o = {}) {
  return {};
}


// ── B · Las tiendas ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'jugueteria82': una tienda de juguetes de 1982: estanterías altas llenas de cajas de cartuchos de colores (iconos sin
//     letras), consolas en exposición con una tele encendida, juguetes de la época, el mostrador con la caja registradora,
//     luces fluorescentes, la puerta a un centro comercial. El mostrador va en tiendasDelante.
//     Cámara 'estante': un estante de cerca con cajas de cartuchos iguales y chillonas.
//   'jugueteria84': la misma tienda en 1984, de bajón: estanterías medio vacías, cestas de rebajas llenas de cartuchos,
//     etiquetas de precio (o.precio 35→5), luces que parpadean. Las cestas de delante van en tiendasDelante.
//     Cámara 'cesta': una cesta de saldo de cerca con cartuchos revueltos y una etiqueta de precio que baja (o.precio).
//   'almacen': un almacén enorme: pasillos de estanterías metálicas con cajas hasta el techo, polvo, una carretilla
//     elevadora, la puerta de carga abierta con un camión. Lo de delante va en tiendasDelante.
//     Cámara 'pasillo': un pasillo en perspectiva con cajas que se pierden al fondo.
export function tiendas(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de tiendas(); se llama después de los actores, con las mismas opciones
export function tiendasDelante(R, t, o = {}) {
  return {};
}


// ── M · El mundo ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'cine82': la calle de un cine de 1982 de noche: la marquesina con bombillas (sin letras: una luna grande y una bicicleta
//     en silueta), la cola de gente que da la vuelta a la manzana, coches de la época, farolas. Lo de delante va en
//     mundoDelante.
//     Cámara 'taquilla': la taquilla de cerca con su cristal, las entradas y las palomitas.
//   'tokio83': una tienda de electrónica de Tokio en 1983: carteles de colores sin letras, televisores en el escaparate,
//     la consola roja y blanca genérica (PIEZAS_AT.consolaJaponesa) en un pedestal, niños en cola, la calle con neones.
//     El mostrador va en mundoDelante.
//     Cámara 'escaparate': el escaparate de cerca con la consola y las cajas.
//   'ny85': una calle de Nueva York en 1985: el escaparate de una juguetería con la consola gris genérica
//     (PIEZAS_AT.consolaGris) y el sello dorado (PIEZAS_AT.selloCalidad), nieve, taxis amarillos, gente con abrigos,
//     edificios de ladrillo. Lo de delante va en mundoDelante.
//     Cámara 'escaparate': el escaparate de cerca con la consola, las cajas y el sello.
export function mundo(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de mundo(); se llama después de los actores, con las mismas opciones
export function mundoDelante(R, t, o = {}) {
  return {};
}


// ── C · El desierto ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'vertedero83': el vertedero municipal de Alamogordo en septiembre de 1983: el desierto con matorral y montañas al
//     fondo, una fosa abierta, camiones que vuelcan cajas (o.camion 0–1), una apisonadora que pasa (o.apisonadora 0–1),
//     una hormigonera que echa cemento (o.cemento 0–1); o.noche (true: de noche, con faros y estrellas). Lo de delante
//     (la valla, el cartel sin letras) va en desiertoDelante.
//     Cámara 'cemento': la fosa de cerca: cajas aplastadas, cartuchos sueltos y el cemento que avanza.
//   'pueblo': Alamogordo de noche en 1983: calle principal con tiendas, un motel con neón sin letras, la imprenta del
//     periódico con luz, la valla del vertedero a lo lejos. Lo de delante va en desiertoDelante.
//     Cámara 'imprenta': la rotativa con el periódico que sale (una foto del vertedero, rayas de texto).
//   'excavacion14': el mismo vertedero el 26 de abril de 2014, de día: excavadoras amarillas, montañas de tierra y
//     basura, carpas blancas, cámaras de televisión, público pequeño con camisetas retro detrás de una valla, polvo y
//     viento. La valla y el público de delante van en desiertoDelante.
//     Cámara 'pala': la pala de la excavadora de cerca levantando tierra con cartuchos y cajas (o.saca 0–1).
//   'carpa': la carpa de los arqueólogos: mesas plegables con cartuchos ordenados, bolsas con etiquetas numeradas,
//     pinceles, periódicos viejos, el desierto por la abertura. La mesa va en desiertoDelante.
//     Cámara 'mesa': la mesa de cerca con un periódico de 1983 y un cartucho limpio.
export function desierto(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de desierto(); se llama después de los actores, con las mismas opciones
export function desiertoDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'estudio': el estudio de Atom: una mesa con la consola vieja y una tele de tubo, una caja de cartuchos, estanterías con
//     cajas de juegos, pósteres sin letras, una lámpara; o.foso 0–1: un foso negro que se abre en el suelo. La mesa va
//     en hoyDelante.
//     Cámara 'mesa': la mesa de cerca con la consola, los mandos y los cartuchos.
//   'consulta': la consulta de un psicoterapeuta en Silicon Valley: dos sillones, un diván, estantería de libros, una
//     planta grande, la ventana a colinas con oficinas de cristal, un cartucho viejo enmarcado en la pared. Los sillones
//     de delante van en hoyDelante.
//     Cámara 'divan': el diván y la mesita con un vaso de agua y una caja de pañuelos.
//   'museo': una sala de museo: vitrinas iluminadas con objetos de la historia de los videojuegos (consolas genéricas,
//     mandos), una vitrina central con un cartucho sucio del desierto, visitantes pequeños. Lo de delante va en
//     hoyDelante.
//     Cámara 'vitrina': la vitrina de cerca con el cartucho, su caja rota y una tarjeta (rayas, sin letras).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
