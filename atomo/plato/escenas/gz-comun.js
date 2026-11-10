// Fontanería y decorados del episodio 30 (Bajo las pirámides: lo que dicen que hay y lo que se ha comprobado) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Giza hoy (la meseta, el pozo de Osiris,
// el cementerio con el georradar), B Italia 2025 (la rueda de prensa), C «según ellos» (el plano azul / holograma de lo que
// dicen Biondi, Malanga y Mei), D dentro de Keops (la Cámara de la Reina con los detectores, la cara norte con la rendija,
// el pasillo de 2023), E Hawara (el laberinto de Heródoto hacia el 450 a. C. y la excavación de Petrie en 1888) y F hoy (el
// estudio de Atom, el satélite de radar, el corte del suelo con el agua, la redacción de una revista).
// LO QUE DICEN LOS ITALIANOS se dibuja SOLO en C, con su propio código visual (fondo azul noche, rejilla, líneas cian que
// brillan, cotas sin letras, un leve parpadeo de holograma), nunca como un decorado real. Lo comprobado (A, D), en el
// estilo de siempre. Personas reales por sus atributos; nada de burla.
// Los personajes son los de ELENCO_GZ y PIEZAS_GZ (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bordas, pupitres) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/gz-comun.js';
//   const { E, R, M } = await T.preparar('gz-gancho');
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
// las piezas del episodio (PIEZAS_GZ: la pirámide de pisapapeles, la linterna, los detectores de muones, el endoscopio, el carrito de georradar…), las crea el reparto
export const PIEZAS_GZ = KIT.PIEZAS_GZ || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la piedra caliza de Giza a varias horas, la arena, el granito, el adobe de Hawara, el azul del plano «según ellos»
    // (fondo azul noche, líneas cian, rejilla) y el ámbar de los muones
    caliza: '#e0c890', calizaS: '#b8965e', calizaO: '#8a6a3e', arena: '#e8cc8a', arenaS: '#c4a060', granito: '#a8706a',
    granitoS: '#6e4440', adobe: '#a8805a', adobeS: '#76563a', planoFondo: '#0c1a3a', planoRejilla: '#1a3462',
    planoLinea: '#5ae0f0', planoBrillo: '#c8fbff', muon: '#ffd060', agua: '#3a7ab0',
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
  const E = await escena(id, 'ep30');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: hacia el 2550 a. C. (las pirámides), 450 a. C. (Heródoto), 1888 (Petrie), 2017–2024 (los muones y
  // el georradar), 2025–2026 (el anuncio y la retirada)
  Object.assign(R.ICONOS, {
    piramide: ['...#...', '..###..', '..###..', '.#####.', '.#####.', '#######', '.......'],
    columna: ['#######', '.#.#.#.', '.#.#.#.', '.#.#.#.', '.#.#.#.', '#######', '.......'],
    muon: ['#..#..#', '.#.#.#.', '..###..', '#######', '..###..', '.#.#.#.', '#..#..#'],
    satelite: ['##.#.##', '##.#.##', '..###..', '..###..', '##.#.##', '##.#.##', '.......'],
  });
  R.tramosTiempo([[-2600, -400, R.PALA.ORO, 'piramide'], [-400, 2000, R.PALA.ROJO, 'columna'], [2000, 2025, R.PALA.AZUL ?? R.PALA.ROJO, 'muon'], [2025, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'satelite']]);
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



// ── A · Giza, hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'meseta': la meseta de Giza: Kefrén en el centro (con su remate de caliza lisa arriba), Keops y Micerinos, la Esfinge
//     delante, las pirámides pequeñas de las reinas, arena con huellas, turistas, camelleros con camellos, un autobús a lo
//     lejos y El Cairo al fondo con la bruma. o.hora: 'dia' | 'atardecer' | 'noche' (estrellas, focos). o.vibra 0–1: la
//     pirámide tiembla un poquito (ondas finas en el aire, arena que salta). Cámara 'calzada': la calzada de Kefrén
//     bajando hacia la Esfinge y el templo del valle.
//   'osiris': el pozo de Osiris en CORTE (o.corte 0–1: el suelo se abre como una maqueta): la calzada arriba, un pozo que
//     baja por tres niveles con escaleras de roca, el del medio con salas y sarcófagos de granito, el de abajo con un
//     sarcófago entre cuatro pilares rodeado de agua; una regla de cotas sin letras (o.regla: treinta metros) y la
//     pirámide al lado para la escala. Cámara 'fondo': el nivel de abajo de cerca, el agua que brilla y una linterna.
//   'cementerio': el cementerio oeste de mastabas junto a Keops (filas de tumbas bajas de piedra, calles de arena), el
//     equipo con el carrito de georradar (PIEZAS_GZ.carritoRadar) y una pantalla que muestra la forma en L (o.ele 0–1).
//     Cámara 'pantalla': la pantalla del georradar de cerca: capas del suelo, la L clara y una mancha más abajo con «?».
export function giza(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de giza(); se llama después de los actores, con las mismas opciones
export function gizaDelante(R, t, o = {}) {
  return {};
}


// ── B · Italia, 2025 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'prensa': una sala de rueda de prensa en Italia (15 de marzo de 2025): la mesa larga con mantel y tres sitios con
//     micrófonos y botellas de agua (sin etiquetas), una pantalla grande detrás en la que se proyecta lo que diga
//     o.pantalla ('satelite': Giza vista desde arriba; 'plano': el corte azul de los pozos; 'reves': el mismo plano al
//     revés para el gag 2, o.giro 0–1 para girarlo), sillas con periodistas de espaldas, trípodes con cámaras, un roll-up
//     sin letras, ventanas con contraventanas y tejados de una ciudad italiana. La mesa va en italiaDelante.
//     Cámara 'mesa': la mesa de cerca, a la altura de los ponentes, con el portátil (PIEZAS_GZ.portatil) y los micrófonos.
//   'video': un estudio casero de vídeo: una pared con estanterías, una pantalla verde a medio recoger, un foco de aro,
//     una cámara en trípode; en una pantalla, el plano azul. Cámara 'movil': pantallas de móviles y teles de varios
//     países (cocina, metro, bar) con los dibujos azules (o.n de pantallas que se encienden 0–1).
export function italia(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de italia(); se llama después de los actores, con las mismas opciones
export function italiaDelante(R, t, o = {}) {
  return {};
}


// ── C · «Según ellos»: el plano azul ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   SIEMPRE en el código del plano: fondo azul noche (C.planoFondo) con rejilla (C.planoRejilla), líneas cian (C.planoLinea)
//   que brillan (C.planoBrillo), cotas y flechas sin letras, una línea de barrido de holograma que sube despacio y un
//   leve parpadeo. Nada de texturas reales: es un dibujo de lo que DICEN.
//   'corte': el corte vertical de la meseta: Kefrén arriba (pequeña), la superficie, y debajo, según ellos, cinco salas en
//     la base unidas por pasillos (o.salas 0–1: se encienden una a una), ocho pozos verticales huecos (o.pozos 0–1: se
//     dibujan bajando), cada uno con su rampa en espiral alrededor (o.espiral 0–1, gira con t), dos cubos al fondo
//     (o.cubos 0–1) y estructuras más abajo que se pierden (o.hondo 0–1). o.agua 0–1: la capa de agua subterránea (las
//     pocas decenas de metros reales) sube y llena los cubos como una pecera (gag 7). o.regla: una regla de cotas al lado.
//     Cámara 'pozos': los pozos de cerca, con la espiral como la rosca de un tornillo, y la cámara que baja (o.baja 0–1).
//   'keops': el corte de la Gran Pirámide en plano azul: las salas conocidas (la del Rey, la de la Reina, la Gran Galería,
//     la subterránea) en cian y otras «nuevas» en otro color (magenta suave) según el artículo de 2022 (o.nuevas 0–1).
//     Cámara 'leyenda': la Esfinge en holograma con puertas y salas con columnas debajo (las leyendas: la Sala de los
//     Registros), símbolos sin letras.
//   'mataha': una rejilla de muros enterrados en plano azul (lo que dicen haber visto en Hawara en 2008) bajo una losa,
//     con un «?» grande que late. Cámara 'regla': solo los pozos de 650 m junto a la pirámide y un pozo real de 30 m
//     (el de Osiris, en blanco) para comparar escalas.
export function plano(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de plano(); se llama después de los actores, con las mismas opciones
export function planoDelante(R, t, o = {}) {
  return {};
}


// ── D · Dentro de Keops ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'reina': la Cámara de la Reina: paredes de caliza en grandes bloques con juntas, el techo a dos aguas, el nicho en la
//     pared, cables por el suelo, placas de película (PIEZAS_GZ.placaEmulsion) y cajas de detectores (PIEZAS_GZ.detectorMuones)
//     con lucecitas, linternas de pie; lluvia de muones (o.muones 0–1: rayitas ámbar que caen atravesando la piedra).
//     Cámara 'galeria': la Gran Galería en perspectiva, alta y estrecha con sus hiladas en voladizo, la pasarela de madera,
//     y por encima un vacío alargado que se enciende (o.vacio 0–1, en blanco cálido sobre la piedra en corte).
//   'norte': la cara norte de Keops por fuera: la entrada de Al-Mamún y la de verdad, encima los grandes bloques en
//     chevrón (en forma de tejado), un andamio con técnicos, cables y una rendija entre dos piedras por donde entra el
//     endoscopio (PIEZAS_GZ.endoscopio, o.entra 0–1); turistas abajo. o.polvo 0–1: una nube de polvo que sale de la
//     rendija (gag 5). Cámara 'pasillo': lo que ve la cámara: un pasillo vacío con el techo en chevrón que se pierde en la
//     oscuridad, la luz de la cámara en la piedra, motas de polvo, el marco redondo de endoscopio con su viñeta.
//   'anuncio': la rueda de prensa al pie de la pirámide (2 de marzo de 2023): un atril con micrófonos, una pantalla con la
//     imagen del pasillo, periodistas y cámaras, la pirámide detrás bajo el sol. El atril va en keopsDelante.
//     Cámara 'radiografia': una placa de muones como una radiografía: grano ámbar, la silueta de la pirámide y las zonas
//     más claras donde hay hueco (o.revela 0–1).
export function keops(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de keops(); se llama después de los actores, con las mismas opciones
export function keopsDelante(R, t, o = {}) {
  return {};
}


// ── E · Hawara, 450 a. C. y 1888 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'lago': el gran lago (Moeris) hacia el 450 a. C.: agua con juncos, papiros y garzas, una barca de vela con el viajero,
//     y en la orilla el laberinto inmenso (o.revela 0–1) con sus muros de piedra blanca, columnatas y la pirámide de adobe
//     detrás; palmeras, campos verdes, cocodrilos que asoman en el agua (lejos, tranquilos).
//     Cámara 'patio': uno de los doce patios techados: columnas pintadas, techos de una sola losa, pasillos que se cruzan,
//     relieves (sin jeroglíficos legibles: trazos), luz de sol por aberturas, braseros.
//   'escalera': dentro del laberinto, el arranque de una escalera que baja a la oscuridad, con una puerta de madera con
//     herrajes (o.puerta 0–1: se cierra; gag 8), un cocodrilo sagrado pintado en la pared, lámparas de aceite. La puerta
//     va en hawaraDelante. Cámara 'pasillos': un laberinto de pasillos con columnas en perspectiva, que se ramifica.
//   'petrie': Hawara en 1888: la pirámide de adobe medio derruida, un campo enorme de esquirlas de piedra blanca que se
//     pierde a lo lejos, la huella del edificio (o.huella 0–1: las líneas de los muros asoman), tiendas de campaña de lona,
//     cestas, trabajadores, un canal con palmeras. Cámara 'zanja': una zanja de cerca con capas de tierra y esquirlas y
//     una losa del fondo; en 2008 (o.año 2008) la misma losa con cables y un aparato de escaneo.
export function hawara(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hawara(); se llama después de los actores, con las mismas opciones
export function hawaraDelante(R, t, o = {}) {
  return {};
}


// ── F · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom: estantería con libros y una maqueta, la ventana con nubes,
//     una pared con un armario empotrado (o.armario 0–1: se abre la puerta y asoma ropa; gag 4), la mesa con la pirámide
//     de pisapapeles (PIEZAS_GZ.piramidePisapapeles), una lupa, una lámpara; en la cámara 'mesa', la mesa de cerca con la
//     pirámide grande, la linterna y el lápiz.
//   'orbita': un satélite de radar en órbita (cuerpo dorado, panel de radar largo, paneles solares), la Tierra debajo con
//     el valle del Nilo y nubes, día o noche (o.noche); ondas que bajan y el eco que sube (o.ondas 0–1); la trompetilla
//     de oído enorme (PIEZAS_GZ.trompetilla, o.trompetilla 0–1; gag 3). Cámara 'rebote': la onda choca con la roca y vuelve
//     al satélite como una pelota (o.rebote 0–1; gag 6).
//   'suelo': un corte del suelo de Giza: la arena, las capas de caliza, la línea del radar que entra unos diez metros
//     (o.radar 0–1), la capa de agua subterránea a pocas decenas de metros (o.agua 0–1), la pirámide arriba; cotas sin
//     letras. Cámara 'campo': un campo de pruebas de georradar con un experto empujando el carrito, hierba, una camioneta.
//   'redaccion': la redacción de una revista científica (agosto de 2026): mesas con pantallas, pilas de revistas
//     (PIEZAS_GZ.revista), una ventana a una ciudad europea, un sello rojo que cae (o.sello 0–1); la mesa va en hoyDelante.
//     Cámara 'despacho': un despacho de El Cairo con una carpeta de solicitud (PIEZAS_GZ.carpeta) que llega a la mesa,
//     un ventilador, una ventana con alminares y la pirámide al fondo.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
