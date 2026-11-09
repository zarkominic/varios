// Fontanería y decorados del episodio 28 (La New Coke: el día que Estados Unidos se rebeló por un refresco) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Atlanta 1886 (la farmacia con su fuente
// de soda, la cámara acorazada), B la guerra de las colas (el supermercado de 1975 con la cata a ciegas, la sede y el
// laboratorio de sabores), C el anuncio (la rueda de prensa del Lincoln Center en 1985, la oficina del rival), D la
// rebelión (la centralita, la calle de la protesta, el sótano) y E hoy (el estudio de Atom, el laboratorio del escáner).
// DERECHOS: ningún logotipo de Coca-Cola ni de Pepsi, ni su letra, ni la onda blanca, ni el disco rojo, ni el globo
// tricolor, ni la botella de contorno (con cintura y estrías), ni latas reales, ni Papá Noel ni osos polares, ni jingles:
// latas lisas rojas (C.rojoCola) y azules (C.azulCola) sin nada blanco encima, botellas rectas. Sin letras legibles.
// Los personajes son los de ELENCO_NC y PIEZAS_NC (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mostradores, mesas, atriles) va en
// su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/nc-comun.js';
//   const { E, R, M } = await T.preparar('nc-gancho');
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
// las piezas del episodio (PIEZAS_NC: latas y botellas genéricas, vasos de cata, la caja fuerte, los teléfonos…), las crea el reparto
export const PIEZAS_NC = KIT.PIEZAS_NC || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // las dos colas (rojo y azul planos, distintos de los de las marcas), el mármol y el latón de 1886, el cartón de las
  // cajas, el beige de los ochenta
  rojoCola: '#c8382e', rojoColaS: '#8a2018', azulCola: '#2e5aa8', azulColaS: '#1a3a78', jarabe: '#4a2414', espuma: '#f4ece0',
  marmol: '#e0d8cc', marmolS: '#b0a898', laton: '#c8a040', latonS: '#8a6a24', carton: '#c8a06a', cartonS: '#8a6a3a',
  beige: '#d8ccb0', beigeS: '#a89c80', bata: '#eef0f2',
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
  const E = await escena(id, 'ep28');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1886 (la farmacia), 1975 (el reto), 1985 (el cambio y la vuelta), 2004 (el escáner), 2026
  Object.assign(R.ICONOS, {
    botella: ['...#...', '...#...', '..###..', '..###..', '..###..', '..###..', '.......'],
    vaso: ['#.....#', '#.....#', '.#...#.', '.#...#.', '.#####.', '.......', '.......'],
    lata: ['.#####.', '#######', '#.....#', '#######', '#######', '.#####.', '.......'],
    cerebro: ['.##.##.', '#######', '#######', '.#####.', '..#.#..', '.......', '.......'],
  });
  R.tramosTiempo([[1886, 1975, R.PALA.ORO, 'botella'], [1975, 1985, R.PALA.AZUL ?? R.PALA.ROJO, 'vaso'], [1985, 2004, R.PALA.ROJO, 'lata'], [2004, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'cerebro']]);
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


// ── A · Atlanta 1886 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'farmacia': la farmacia de Atlanta en 1886: estanterías de madera con frascos de colores y cajones, el mostrador de
//     mármol de la fuente de soda con sus grifos de latón y taburetes, un perol de jarabe (PIEZAS_NC.jarabe), tarros con
//     hojas y nueces, lámparas de gas, el escaparate a una calle de Atlanta con carruajes. El mostrador va en atlantaDelante.
//     Cámara 'fuente': la fuente de soda de cerca: el grifo que sirve un vaso de jarabe con agua con gas y burbujas.
//   'banco': la cámara acorazada de un banco: la puerta redonda enorme de acero (PIEZAS_NC.cajaFuerte, o.abre 0–1), los
//     cerrojos, cajas de seguridad numeradas, un guardia, luz de lámparas verdes.
//     Cámara 'despacho': el despacho de Candler en los 1890: escritorio de caoba, una caja fuerte pequeña, cuadros, la
//     ventana a Atlanta con tranvías; un mapa con rutas de botellas.
export function atlanta(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de atlanta(); se llama después de los actores, con las mismas opciones
export function atlantaDelante(R, t, o = {}) {
  return {};
}


// ── B · La guerra de las colas ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'super': un supermercado de 1975: pasillos con estanterías llenas de latas lisas rojas y azules, carritos, luces
//     fluorescentes, carteles de precios con cifras; la mesa de la cata a ciegas con dos vasos (PIEZAS_NC.vaso) y una
//     cámara de tele con su foco. La mesa va en colasDelante.
//     Cámara 'mesa': la mesa de la cata de cerca: dos vasos sin marca (A y B en pictograma), manos que prueban.
//   'sede': la sede de la empresa en Atlanta: un despacho alto con ventanal a la ciudad, una gráfica de dos líneas en la
//     pared (roja que baja y azul que sube), la mesa de juntas.
//     Cámara 'laboratorio': el laboratorio de sabores: probetas, jarabes de colores, una pizarra con fórmulas en símbolos,
//     una carpeta con candado.
export function colas(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de colas(); se llama después de los actores, con las mismas opciones
export function colasDelante(R, t, o = {}) {
  return {};
}


// ── C · El anuncio ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'prensa': la rueda de prensa del Lincoln Center en abril de 1985: el escenario con atril y micrófonos, una mesa con
//     una lata tapada con un paño (PIEZAS_NC.paño), focos, filas de periodistas con libretas y cámaras de los ochenta,
//     flashes. El atril va en anuncioDelante.
//     Cámara 'atril': el atril de cerca con los micrófonos y la lata nueva bajo los focos.
//   'rival': la oficina del rival (azul): mesas de los ochenta, ordenadores beige, globos azules, confeti, un periódico
//     con una página entera de rayas (sin letras) clavado en la pared.
//     Cámara 'tele': un salón de 1985 con una tele de tubo que interrumpe una telenovela (un icono de «urgente», sin
//     letras), un sofá y una lata en la mesita.
export function anuncio(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de anuncio(); se llama después de los actores, con las mismas opciones
export function anuncioDelante(R, t, o = {}) {
  return {};
}


// ── D · La rebelión ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'centralita': la centralita de atención de la empresa: filas de mesas con teléfonos de los ochenta (PIEZAS_NC.telefono,
//     o.suena) y operadoras con cascos, sacos de cartas (PIEZAS_NC.sacoCartas), un reloj de pared, un tablero con un
//     contador de llamadas en cifras. Las mesas de delante van en rebelionDelante.
//     Cámara 'cartas': una mesa llena de cartas abiertas con dibujos (un dodo, corazones rotos, una lata tachada).
//   'calle': una calle de Seattle de 1985: manifestantes con pancartas de pictogramas (PIEZAS_NC.pancarta), un camión de
//     reparto, una tienda con escaparate, una alcantarilla, cámaras de la tele local, lluvia ligera.
//     Cámara 'sotano': un sótano de una casa de 1985: cajas de latas rojas apiladas hasta el techo, una bombilla que se
//     mece, una escalera de madera, una lavadora.
export function rebelion(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de rebelion(); se llama después de los actores, con las mismas opciones
export function rebelionDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom: estantería, ventana, un escritorio con una lata roja y una
//     azul; en la cámara 'mesa', la lata de cerca que suelta espuma (o.espuma 0–1).
//   'escaner': el laboratorio de neurociencia de Texas en 2004: la máquina de resonancia (PIEZAS_NC.escaner) con un
//     voluntario tumbado, un tubito para beber, la sala de control con pantallas que muestran cerebros (PIEZAS_NC.cerebro,
//     o.zonas que se iluminan).
//     Cámara 'pantalla': la pantalla de cerca con dos cerebros: uno igual y otro que se ilumina.
//   'aula': un aula de una escuela de negocios: pizarra, gradas, estudiantes con portátiles, un profesor.
//     Cámara 'pizarra': la pizarra de cerca con una lata dibujada y una X, y un corazón.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
