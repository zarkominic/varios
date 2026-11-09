// Fontanería y decorados del episodio 27 (Tetris: el juego que se escapó de la Unión Soviética) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Moscú en 1984 (el centro de cálculo de la
// Academia de Ciencias), B Occidente 1986–1988 (Budapest, la torre del magnate en Londres, una tienda de informática de
// EE. UU.), C Moscú en 1989 (la Plaza Roja nevada, el edificio de Elorg), D la guerra de los cartuchos (el juzgado, el
// almacén, la juguetería de 1989) y E hoy (el estudio de Atom, el laboratorio del sueño de 2000, el salón de 2023).
// DERECHOS (caso Tetris Holding contra Xio, 2012): nada del juego tal cual: ni las siete piezas con sus colores, ni el pozo
// alto y estrecho con piezas cayendo, ni la pieza siguiente, ni el logotipo; el juego de 1984 es corchetes de texto verde
// en pantalla negra, y las piezas, bloques sueltos de madera monocromos. Nada con la silueta de la Game Boy: la consola de
// bolsillo es la genérica de PIEZAS_TS. Sin logos de Nintendo, Atari, Tengen, Mirrorsoft ni letras legibles.
// Los personajes son los de ELENCO_TS y PIEZAS_TS (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, bancos) va en
// su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/ts-comun.js';
//   const { E, R, M } = await T.preparar('ts-gancho');
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
// las piezas del episodio (PIEZAS_TS: el terminal, el disquete, el télex, la consola de bolsillo genérica…), las crea el reparto
export const PIEZAS_TS = KIT.PIEZAS_TS || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Moscú: el gris soviético, el rojo de las banderas y estrellas, el verde del fósforo de las pantallas, la nieve
    grisSov: '#8a8a84', grisSovS: '#5a5a56', rojoSov: '#c8302a', fosforo: '#5aff8a', fosforoS: '#1a6a32', nieve: '#eef2f8',
    // Occidente y los ochenta: moqueta, plástico beige de los ordenadores, cartón de las cajas, el oro de las cúpulas
    beige: '#d8ccb0', beigeS: '#a89c80', carton: '#c8a06a', cartonS: '#8a6a3a', cupula: '#e8b040', bata: '#eef0f2',
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
  const E = await escena(id, 'ep27');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1984 (el laboratorio), 1989 (Moscú y la guerra de los cartuchos), 1996 (la compañía), 2023, 2026
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    disquete: ['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#.....#', '#######'],
    bolsillo: ['.#####.', '.#...#.', '.#...#.', '.#####.', '.#.#.#.', '.#####.', '.......'],
    bloques: ['##.##..', '##.##..', '.......', '##.##.#', '##.##.#', '.......', '.......'],
  });
  R.tramosTiempo([[1984, 1989, R.PALA.ROJO, 'estrella'], [1989, 1996, R.PALA.ORO, 'disquete'], [1996, 2023, R.PALA.AZUL ?? R.PALA.ROJO, 'bolsillo'], [2023, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'bloques']]);
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


// ── A · Moscú 1984 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'centro': el centro de cálculo de la Academia de Ciencias en Moscú, 1984, de noche: sala larga con armarios de cinta
//     magnética que giran, paneles con pilotos, ordenadores soviéticos beige y gris, cables por el suelo, fluorescentes
//     (uno parpadea), carteles sin letras (una estrella, un engranaje), ventanas altas con la nieve cayendo y la calle de
//     Moscú con farolas y un tranvía; científicos pequeños de fondo. Las mesas de delante van en centroDelante.
//     Cámara 'terminal': la mesa de Pázhitnov de cerca: el terminal (PIEZAS_TS.terminal) con corchetes verdes que caen y
//     una fila que parpadea y desaparece (o.fila 0–1), el rompecabezas de madera de cinco cuadrados, el cuaderno con
//     pictogramas, la taza de café que humea, la lámpara de flexo.
//   'pasillo': el pasillo del instituto: puertas de madera con números, un tablón de corcho, una ventana con nieve; gente
//     que pasa con disquetes en la mano (PIEZAS_TS.disquete); al fondo, una sala de ordenadores de oficina.
//     Cámara 'archivo': un despacho con archivadores grises, un sello rojo con una estrella (o.sello 0–1: baja sobre una
//     carpeta), una caja con candado y un globo terráqueo.
export function centro(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de centro(); se llama después de los actores, con las mismas opciones
export function centroDelante(R, t, o = {}) {
  return {};
}


// ── B · Occidente 1986–1988 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'budapest': una oficina de un instituto de Budapest en 1986: ventanas al Danubio y al puente de cadenas (insinuado,
//     sin copiar), un ordenador de los ochenta en una mesa, estanterías, un télex (PIEZAS_TS.telex; o.cinta 0–1 llena la
//     oficina de cinta de papel). La mesa de delante va en occidenteDelante.
//     Cámara 'telex': la máquina de télex de cerca con la cinta que sale (o.cinta) y la mano que teclea.
//   'torre': el despacho alto del magnate en Londres, 1987: ventanal con el Támesis y la ciudad, moqueta, mesa enorme de
//     caoba, teléfonos, maquetas de periódicos sin letras; el magnate pequeño detrás de la mesa.
//     Cámara 'tienda': una tienda de informática de EE. UU. en 1988: estanterías con cajas de programas, ordenadores beige
//     encendidos, el escaparate con la caja del juego (PIEZAS_TS.cajaJuego, la Plaza Roja sin letras), un dependiente.
export function occidente(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de occidente(); se llama después de los actores, con las mismas opciones
export function occidenteDelante(R, t, o = {}) {
  return {};
}


// ── C · Moscú 1989 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'plaza': la Plaza Roja nevada de noche en 1989, evocada (cúpulas de cebolla de colores, la muralla roja, farolas,
//     copos que caen, huellas en la nieve, una cola de gente lejos), con un hombre que cruza con maleta.
//     Cámara 'puerta': la entrada del edificio gris de la agencia (puerta de madera maciza, un guardia, una placa sin
//     letras, la nieve en el escalón).
//   'elorg': la sala de reuniones de la agencia: mesa larga con tapete verde, sillas, botellas de agua, un retrato oficial
//     sin rasgos reconocibles (de lejos), ventanas con cortinas pesadas, ceniceros, un reloj de pared; el pasillo con tres
//     puertas visible por una puerta abierta. La mesa de delante va en moscuDelante.
//     Cámara 'mesa': la mesa de cerca con el cartucho genérico (PIEZAS_TS.cartucho) bajo la lámpara, papeles, un contrato
//     con casillas (PIEZAS_TS.contrato), tazas de té, un ábaco.
export function moscu(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de moscu(); se llama después de los actores, con las mismas opciones
export function moscuDelante(R, t, o = {}) {
  return {};
}


// ── D · La guerra de los cartuchos ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'juzgado': una sala de juzgado de EE. UU. en 1989: estrado de madera, bandera sin estrellas reconocibles (rayas),
//     bancos de público, ventanales, el escudo sin letras (una balanza), la mesa de las partes con cajas de cartuchos
//     detrás. El estrado de delante va en guerraDelante.
//     Cámara 'almacen': un almacén con estanterías de cajas de cartuchos, una carretilla, operarios que retiran cajas.
//   'jugueteria': una juguetería de 1989: estanterías de colores, la consola de bolsillo genérica (PIEZAS_TS.consolaBolsillo)
//     en sus cajas, un mostrador con caja registradora, niños y adultos que juegan; el escaparate a la calle.
//     Cámara 'autobus': el interior de un autobús de 1989 con pasajeros que juegan con la consola de bolsillo; la ciudad
//     que pasa por las ventanas.
export function guerra(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de guerra(); se llama después de los actores, con las mismas opciones
export function guerraDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio' (cámaras 'general' y 'estanteria'): el estudio de Atom de noche, cálido, con la estantería grande donde
//     los libros caen y encajan solos (o.encajan 0–1; o.desaparece 0–1: la balda completa se ilumina y desaparece), un
//     escritorio con ordenador viejo, bloques de madera, la ventana con la ciudad.
//   'sueno': el laboratorio del sueño de Harvard en 2000: ordenadores de la época con voluntarios que juegan (pantallas con
//     bloques monocromos sueltos, sin pozo), y la habitación de dormir con la cama, electrodos y una pantalla de control.
//     Cámara 'cama': la cama de cerca: el voluntario con los ojos cerrados y bloques que caen sobre la almohada (o.suena).
//   'salon23': un salón de Oklahoma en 2023: una tele vieja de tubo con la consola antigua (sin logos), un sofá, posters
//     sin letras, luces de colores; la pantalla congelada (o.congela 0–1).
//   'oficina96': una oficina de EE. UU. en 1996: ventana soleada con palmeras, mesa con ordenador de los noventa, dos
//     tazas de café y un contrato.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
