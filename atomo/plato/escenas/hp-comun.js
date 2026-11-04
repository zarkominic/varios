// Fontanería y decorados del episodio 21 (Harry Potter: lo que hay que saber antes de la serie de HBO) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el mundo muggle (Privet Drive y el zoo), B el
// callejón Diagon (la calle, la tienda de túnicas, el banco de los duendes), C Hogwarts por dentro (el Gran Comedor, el
// andén y el lago, el tren, un aula, la sala común, la sala del espejo), D Hogwarts por fuera (la torre más alta, el bosque
// prohibido, el campo de quidditch, la cabaña de Hagrid, la sala del acertijo de pociones, el castillo de noche), E lo real
// (el tren de 1990, un café de Edimburgo, la imprenta, el París de Flamel, el museo, la sala de subastas) y F hoy (el salón
// de la fan en Navidad, el corcho de las pistas, el plató de rodaje, la sala de montaje).
// Los personajes son los de ELENCO_HP y PIEZAS_HP (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos, letras, escudos de las casas con letras ni nada copiado de las películas.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas, el
// sofá, la moviola) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/hp-comun.js';
//   const { E, R, M } = await T.preparar('hp-gancho');
//   T.rodar(E, R, [[0, (t) => T.hogwarts(R, t, { encuadre: 'comedor' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_HP: la snitch, el sombrero, la lechuza…), las crea el reparto
export const PIEZAS_HP = KIT.PIEZAS_HP || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el mundo muggle: ladrillo de las casas iguales, césped, la nieve de Nochebuena
    ladrillo: '#a85a3a', ladrilloS: '#6a3424', cesped: '#5a9a3a', nieve: '#eef4fa', nieveS: '#b8c8dc',
    // Hogwarts: piedra, madera, el oro de las velas, el cielo encantado
    piedra: '#7a7680', piedraS: '#4a4652', madera: '#7a4a2a', maderaS: '#4a2a18', vela: '#ffe08a', cieloH: '#1a2050',
    // las casas, sin escudos ni letras: rojo, verde, amarillo, azul
    rojoG: '#a8202a', verdeS: '#1e6a3a', amarilloH: '#e8b830', azulR: '#2a4a9a',
    // la snitch
    oroS: '#f0c040', oroSS: '#a87a18', alaS: '#f4f0e0',
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
  const E = await escena(id, 'ep21');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1990 (el tren), 1997 (el libro), 2001 (la película) y 2026 (la serie)
  Object.assign(R.ICONOS, {
    rayo: ['....#..', '...##..', '..##...', '.#####.', '...##..', '..##...', '.##....'],
    libro: ['#######', '#.....#', '#.###.#', '#.....#', '#.###.#', '#.....#', '#######'],
    tele: ['.#...#.', '..#.#..', '#######', '#.....#', '#.....#', '#######', '.#...#.'],
  });
  R.tramosTiempo([[1990, 1997, R.PALA.ORO, 'libro'], [1997, 2011, R.PALA.ROJO, 'rayo'], [2011, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'tele']]);
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

// ── A · El mundo muggle ───────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'calle': Privet Drive, una calle de casas de ladrillo idénticas con jardincitos, setos recortados, buzones, farolas y coches
//     aparcados; o.luz 'noche' (por omisión, con las farolas encendidas y estrellas), 'nochebuena' (nevando, luces de Navidad
//     en las casas, nieve en los tejados) o 'dia'; o.farolas (0–1): cuántas farolas siguen encendidas (se apagan de una en
//     una hacia el aparato del anciano); o.cartas (0–1): de la chimenea del número 4 salen volando cientos de cartas; un gato
//     atigrado en la tapia. o.camara 'general' o 'ventana' (la fachada del número 4 de cerca, con la ventana encendida y sitio
//     para un niño asomado, y el jardín con nieve).
//   'zoo': la casa de los reptiles: penumbra verde, vitrinas iluminadas con lagartos y ranas, y en el centro un terrario
//     grande con una boa enorme enroscada (o.guiño 0–1: abre un ojo y guiña); visitantes. o.camara 'general' o 'cristal' (el
//     cristal de cerca con la boa grande y sitio para un niño que la mira).
// Delante: muggleDelante (la barandilla del terrario, el seto delantero). Devuelve { suelo, … }.
export function muggle(R, t, o = {}) {
  provisional(R, t, hex('#2a3050'), hex('#a85a3a'));
  return { suelo: 160 };
}
export function muggleDelante(R, t, o = {}) {}

// ── B · El callejón Diagon ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'calle': una calle empedrada y torcida de tiendas mágicas (escaparates con calderos, escobas, lechuzas en jaulas, libros
//     apilados, carteles sin letras), magos con túnicas de colores y sombreros puntiagudos; al fondo, un edificio blanco
//     enorme con columnas (el banco). o.camara 'general' o 'escaparate' (el escaparate de la tienda de túnicas desde la calle,
//     con sitio para un gigante con un helado mirando).
//   'tunicas': la tienda de túnicas por dentro: rollos de tela, maniquíes, taburetes de prueba, espejos, cintas métricas
//     que flotan solas. o.camara 'general' o 'probador' (dos taburetes de cerca con sitio para dos niños de pie encima).
//   'banco': el gran vestíbulo de mármol de los duendes: mostradores altos, balanzas, montones de monedas, lámparas; o.camara
//     'general' o 'camara' (abajo, en las cuevas: raíles, una vagoneta y la puerta redonda de una cámara acorazada con su
//     número, o.numero con a_cifras; o.abierta 0–1).
// Delante: diagonDelante (los mostradores del banco, la vagoneta). Devuelve { suelo, … }.
export function diagon(R, t, o = {}) {
  provisional(R, t, hex('#3a2a40'), hex('#c8a060'));
  return { suelo: 160 };
}
export function diagonDelante(R, t, o = {}) {}

// ── C · Hogwarts por dentro ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'comedor': el Gran Comedor: cuatro mesas largas, cientos de velas flotando, el techo encantado de estrellas, la mesa de
//     los profesores al fondo, estandartes de cuatro colores SIN escudos ni letras; o.lleno (0–1) alumnos sentados; o.vacio
//     de noche. o.camara 'general' o 'mesa' (la mesa de los profesores de cerca con sitio para tres o cuatro personajes de pie
//     o sentados detrás, y el taburete del sombrero delante).
//   'anden': el andén de una estación pequeña de noche con la locomotora roja que echa vapor (sin letras) y el lago negro
//     con el castillo iluminado al fondo; o.barcas (0–1) cruzan el lago. o.camara 'general' o 'lago' (las barcas de cerca con
//     el castillo grande).
//   'tren': un compartimento del tren: asientos de terciopelo, rejilla para el equipaje, ventana con el paisaje de colinas
//     que corre (recortado), un carrito de golosinas. o.camara 'general' o 'ventana'.
//   'aula': un aula de piedra con pupitres de madera, pizarra, una chimenea, telarañas y polvo en la luz. o.camara 'general'
//     o 'pizarra' (la pizarra y la mesa del profesor de cerca).
//   'sala': la sala común roja y dorada: chimenea encendida, butacas, alfombras, tapices sin letras, ventanas con nieve.
//     o.camara 'general' o 'chimenea'.
//   'espejo': una sala vacía con un espejo enorme de marco dorado (o.reflejo: función que pinta dentro) y pupitres apilados.
//     o.camara 'general' o 'cerca'.
// Delante: hogwartsDelante (la mesa de los profesores, los pupitres, el respaldo de la butaca). Devuelve { suelo, … }.
export function hogwarts(R, t, o = {}) {
  provisional(R, t, hex('#1a2050'), hex('#ffe08a'));
  return { suelo: 160 };
}
export function hogwartsDelante(R, t, o = {}) {}

// ── D · Hogwarts por fuera ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'castillo': el castillo de noche visto desde lejos, torres con ventanas encendidas, el lago y las montañas; o.camara
//     'general' o 'cerca' (las puertas y la escalinata).
//   'torre': lo alto de la torre más alta de noche: almenas, el cielo estrellado y la luna; o.escobas (0–1) llegan cuatro
//     siluetas en escoba. o.camara 'general' o 'almenas'.
//   'bosque': el bosque prohibido de noche: troncos enormes, raíces, niebla azul, ojos que brillan, un claro con luz de luna.
//     o.camara 'general' o 'claro'.
//   'quidditch': el campo de quidditch de día: torres de gradas de colores con banderas sin letras, los tres aros dorados a
//     cada lado, el césped. o.camara 'general' o 'gradas'.
//   'cabana': la cabaña de piedra de Hagrid nevada, con humo en la chimenea, calabazas y una puerta enorme. o.camara
//     'general' o 'puerta'.
//   'pociones': una sala subterránea con fuego negro en una puerta y morado en la otra, y una mesa con siete botellas; un
//     pergamino. o.camara 'general' o 'mesa'.
// Delante: exteriorDelante (la mesa del acertijo, la barandilla de la grada). Devuelve { suelo, … }.
export function exterior(R, t, o = {}) {
  provisional(R, t, hex('#0e1430'), hex('#5a7a9a'));
  return { suelo: 160 };
}
export function exteriorDelante(R, t, o = {}) {}

// ── E · Lo real detrás de la historia ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'tren': el interior de un tren británico de 1990 parado en el campo: asientos de tela, ventanilla con prados, vacas y
//     postes, nubes. o.camara 'general' o 'ventanilla'.
//   'cafe': un café de Edimburgo de los noventa: mesas de madera, ventana a una calle de piedra con lluvia fina, tazas, un
//     cochecito de bebé. o.camara 'general' o 'mesa'.
//   'imprenta': una imprenta pequeña: máquina, pilas de libros, cajas, papel. o.camara 'general' o 'pila'.
//   'paris': el París medieval: calle de casas de madera y piedra, un puesto de escribano con pergaminos, una casa de piedra
//     con su año grabado (o.anio con a_cifras). o.camara 'general' o 'casa'.
//   'museo': una sala de museo con una lápida antigua tras un cordón, vitrinas y visitantes. o.camara 'general' o 'lapida'.
//   'subasta': una sala de subastas: atril con martillo, sillas, pantalla con una cifra (o.cifra con a_cifras), un libro en
//     una vitrina. o.camara 'general' o 'atril'.
// Delante: realDelante (el atril, el mostrador del escribano). Devuelve { suelo, … }.
export function real(R, t, o = {}) {
  provisional(R, t, hex('#2a3a4a'), hex('#c8b8a0'));
  return { suelo: 160 };
}
export function realDelante(R, t, o = {}) {}

// ── F · Hoy ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'salon': el salón de una fan en Navidad: árbol con luces, chimenea con calcetines, tele encendida (o.pantalla: función
//     (R, t, [x0,y0,x1,y1]) que pinta dentro), sofá con manta, estantería con siete libros sin letras, ventana con nieve.
//     o.camara 'general' o 'sofa'.
//   'corcho': un corcho con chinchetas e hilo rojo (o.pistas 0–4: cuántas se encienden). o.camara 'general' o 'cerca'.
//   'plato': un plató de rodaje: focos, cámara de cine en grúa, claqueta sin letras, decorado a medio montar, monitor.
//     o.camara 'general' o 'monitor'.
//   'montaje': una sala de montaje con moviola, tiras de película colgadas, una papelera con trozos. o.camara 'general' o
//     'moviola'.
// Delante: hoyDelante (el brazo del sofá, la mesa de montaje). Devuelve { suelo, pantalla, … }.
export function hoy(R, t, o = {}) {
  provisional(R, t, hex('#1a1022'), hex('#a8283a'));
  return { suelo: 160 };
}
export function hoyDelante(R, t, o = {}) {}

// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// La snitch con ojos (PIEZAS_HP.snitch del reparto), animada: aletea, revolotea en un ocho alrededor de (x, y) con o.vuela
// (0–1), se esconde detrás de algo con o.esconde, o.expresion 'normal'|'susto'|'risa'; o.s escala. Devuelve { x, y }.
export function snitch(R, x, y, t, o = {}) {
  const v = o.vuela ?? 0, X = x + Math.sin(t * 2.3) * 10 * v, Y = y + Math.sin(t * 4.6) * 4 * v;
  if (PIEZAS_HP.snitch) PIEZAS_HP.snitch(R, X, Y, { ...o, t });
  else R.disco(X, Y - 3, 3, C.oroS);
  return { x: X, y: Y };
}
