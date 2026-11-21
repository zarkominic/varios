// Fontanería y decorados del episodio 45 (Victor von Doom: el villano que solo quería recuperar a su madre), con el canon
// del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js) y el cine del
// 33 (du-comun.js: salas), y añade: A Latveria (latveria), B la universidad (universidad), C el Tíbet (tibet), D el
// reino de Mefisto (infierno) y E Battleworld (battleworld).
// DERECHOS: NADA de las películas ni de los cómics (ni viñetas, ni dibujos, ni logotipos, ni arquitectura reconocible):
// todo es NUESTRO, a partir de lo que cuenta la historia. Sin letras (solo números y símbolos). Personajes: ELENCO_VD y
// los de Marvel de ELENCO_CHIBI (doom, reed, sue, johnny, cosa, ironman, strange, monjeDD, doomJovenDD), por sus
// atributos. LA VIOLENCIA NUNCA SE VE (las muertes y el sacrificio se cuentan, con luz y de lejos; nada de armas en uso,
// cuerpos ni sangre). EL INFIERNO, ESTILIZADO: rocas, ríos de luz, cadenas y una puerta; nada morboso, nada de torturas.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/vd-comun.js';
//   const { E, R, M } = await T.preparar('vd-gancho');
//   T.rodar(E, R, [[0, (t) => T.latveria(R, t, { encuadre: 'tormenta' })]], {});
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 45 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores: lo aprendido en el 43)
export { ELENCO_VD as VD } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43) y el cine del cierre (salas, del 33): se usan tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';
export { salas, salasDelante } from '/atomo/plato/escenas/du-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Latveria: nieve, pino oscuro, piedra gris, madera de los carromatos, el verde de Doom y el gris de su armadura
    nieve: '#e8ecf4', nieveS: '#a8b4c8', pino: '#24402e', pinoS: '#142a1e', piedra: '#8a8a94', piedraS: '#5a5a66',
    madera: '#7a4a2a', maderaS: '#4e2e1a', verdeDoom: '#2e7a3e', verdeDoomS: '#1e5a2a', acero: '#a8acbc', aceroS: '#6a6e80',
    // la universidad: ladrillo rojo, pizarra verde, la luz fría del laboratorio
    ladrillo: '#a84a3a', ladrilloS: '#7a3028', pizarra: '#2a4a3a', labLuz: '#a8e8ff',
    // el Tíbet: azafrán, granate y el cielo de altura
    azafran: '#e8a030', granate: '#7a1e28', cieloAlto: '#4a7ac8',
    // el infierno (estilizado): rojo profundo, brasa, la luz verde de las almas libres
    infierno: '#5a1418', infiernoS: '#2a0a10', brasa: '#e86a2a', almaLuz: '#a8ffc8',
    // Battleworld: el mosaico de mundos y el oro del dios emperador
    mosaico: '#6a5a8a', oroDios: '#f0c848',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep45');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en los años de los cómics (las escenas de la infancia van sin año): la máscara (1962–1999)
  // y la corona (2000–2026)
  Object.assign(R.ICONOS, {
    mascara: ['.#####.', '#######', '#.#.#.#', '#######', '##...##', '.#####.', '..###..'],
    corona: ['#.#.#.#', '#######', '#.###.#', '#######', '.#####.', '.......', '.......'],
  });
  R.tramosTiempo([[1962, 2000, R.PALA.VERDE ?? R.PALA.ORO, 'mascara'], [2000, 2027, R.PALA.ROJO, 'corona']]);
  R.companero = () => {};   // canon del 43: Atom no vive en la esquina, actúa en la escena (T.AT)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };


// ── A · Latveria ───────────────────────────────────────────────────────────────────────────────────────────────────────
// Un país pequeño y frío de montaña en el este de Europa (NUESTRO): pinos oscuros, nieve, piedra gris, aldeas de madera.
// o.encuadre:
//   'campamento': EL CAMPAMENTO ROMANÍ en un claro de la montaña, al atardecer: carromatos de madera pintada con ruedas
//     grandes y toldos de colores, hogueras con chispas y humo, caballos atados, ropa tendida, faroles, pinos nevados y
//     montañas detrás, la luz naranja del fuego contra el azul de la nieve. Suelo y 150, libre x 30–260.
//     Cámara 'carromato': dentro de un carromato de noche: paredes de madera con telas y amuletos colgados, una vela en
//     una repisa, una cama de mantas, y EL BAÚL de Cynthia (x 170–230, y 128–150; o.baul 0–1: la tapa que se abre y la
//     luz cálida que sale; o.libros true: libros con símbolos sobre la manta). Suelo y 150, libre x 40–200.
//   'tormenta': LA MONTAÑA DE NOCHE EN LA TORMENTA DE NIEVE: ventisca en diagonal (tres capas a distinta velocidad),
//     pinos que se doblan, rocas, la ladera que sube, antorchas lejanas (o.antorchas 0–1: luces naranjas que se mueven a
//     lo lejos, x 200–310, y 70–110); o.amanecer 0–1: el cielo se aclara a rosa y la ventisca se calma. Suelo y 152,
//     libre x 30–220. Cámara 'abrigo': de cerca, el hueco entre dos rocas al pie de un pino, para un adulto arrodillado
//     que envuelve a un niño (x 120–200, suelo 152); la nieve cayendo delante.
//   'baron': EL CASTILLO DEL BARÓN: un castillo de piedra gris con torres y estandartes azules (un ciervo como símbolo),
//     sobre una colina nevada, de noche con ventanas encendidas; Cámara 'alcoba': dentro, una alcoba con una cama con
//     dosel (x 150–250; la enferma, de lejos, solo un bulto bajo la colcha), velas que se consumen (o.velas 0–1: más
//     bajas), una ventana con la nieve, un sillón; para el curandero junto a la cama (x 120–150) y el barón en la puerta
//     (x 40–80). Suelo y 150.
//   'doomstadt': LA CIUDAD DE DOOM, años después: un castillo enorme de piedra oscura con torres y estandartes verdes
//     sobre la ciudad de tejados rojos y nieve, de noche con luna; en la torre más alta, un balcón (x 150–170, y 60).
//     Cámara 'plaza': la plaza de la ciudad de día: mercado con puestos y toldos, niños jugando, fuente, casas con
//     ventanas, y EN LAS VENTANAS ROBOTS con la cara de hierro (o.robots 0–1: se giran a la vez hacia x o.mira). Suelo y
//     152, libre x 30–280.
//   'trono': LA SALA DEL TRONO DE DOOM: piedra oscura, columnas, estandartes verdes con un símbolo propio (un aro con
//     cuatro puntas, sin letras), antorchas, una alfombra verde hasta el trono de hierro (asiento en
//     x 160, y 120). Suelo y 150, libre x 40–280. Cámara 'enemigos': la sala de los enemigos: una pared de pantallas
//     (seis, la central grande x 110–210, y 30–100) con un brillo de cristal; o.pantallas: [cuál se enciende…] y
//     devuelve sus rectángulos en .pantallas para que la escena dibuje dentro; una mesa de mando delante (x 60–260,
//     y 140–160); Doom de pie delante (x 150–170, suelo 152).
// Devuelve { encuadre, camara, suelo, libre, baul?, cama?, pantallas?, trono?, balcon? }. Llama a latveriaDelante después
// de los actores (la nieve de primer término, la mesa de mando, los puestos del mercado de delante).
export function latveria(R, t, o = {}) {
  provisional(R, t, C.nieveS, C.pino);
  return { encuadre: o.encuadre ?? 'campamento', camara: o.camara ?? 'general', suelo: 150, libre: [30, 260] };
}
export function latveriaDelante(R, t, o = {}) { return {}; }

// ── B · La universidad ────────────────────────────────────────────────────────────────────────────────────────────────
// Una universidad de Estados Unidos (NUESTRA, sin logotipos): ladrillo rojo, hiedra, pizarras.
// o.encuadre:
//   'campus': EL CAMPUS de día en otoño: edificios de ladrillo con columnas y escalinata, árboles con hojas naranjas
//     que caen, el césped, estudiantes diminutos con libros que cruzan, una torre con reloj (sin letras). Suelo y 152,
//     libre x 30–280. Cámara 'pasillo': el pasillo de la residencia: puertas numeradas (solo números), tablón de corcho
//     con papelitos, taquillas, luz de ventanal; una maleta en el suelo si o.maleta.
//   'laboratorio': EL LABORATORIO DE VICTOR, de noche: mesas con aparatos, cables por el suelo, estanterías con frascos,
//     LA MÁQUINA en el centro (x 180–270, y 40–150: un aro de metal con antenas, bobinas y luces; o.carga 0–1: brilla
//     más; o.estalla 0–1: destello blanco, humo y chispas, sin heridas), una palanca (x 150, y 120). Suelo y 150, libre
//     x 30–170. Cámara 'pizarra': la pizarra llena de cálculos (garabatos de tiza, números y símbolos, sin letras) con
//     el número del error rodeado (o.error [x, y]); para dos estudiantes delante (x 80–220).
// Devuelve { encuadre, camara, suelo, libre, maquina?, palanca?, error? }. Llama a universidadDelante después de los
// actores (la mesa de primer término, los cables).
export function universidad(R, t, o = {}) {
  provisional(R, t, C.ladrillo, C.ladrilloS);
  return { encuadre: o.encuadre ?? 'campus', camara: o.camara ?? 'general', suelo: 150, libre: [30, 280] };
}
export function universidadDelante(R, t, o = {}) { return {}; }

// ── C · El Tíbet ────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'montana': LAS MONTAÑAS DEL TÍBET: picos nevados enormes, cielo azul de altura con nubes que pasan, un camino de
//     piedra con banderas de oración de colores que ondean (sin letras), el MONASTERIO de muros blancos y tejados
//     rojos en la ladera (x 200–300, y 60–110); nieve que vuela. Suelo y 152, libre x 30–220. Cámara 'monasterio': el
//     patio del monasterio: muros blancos, puertas rojas, ruedas de oración que giran, un incensario con humo, monjes al
//     fondo.
//   'forja': LA FORJA del monasterio, de noche: un horno con fuego vivo, el yunque, herramientas colgadas, piezas de la
//     armadura gris sobre una mesa, el resplandor naranja en las paredes; o.mascara 0–1: LA MÁSCARA de hierro al rojo en
//     el yunque (x 150–170, y 118), que se enfría de rojo a gris; vapor. Suelo y 150, libre x 40–220. Cámara 'mascara':
//     de cerca, el yunque y la máscara brillando, las chispas, la mano con guante que la sostiene.
// Devuelve { encuadre, camara, suelo, libre, monasterio?, yunque?, mascara? }. Llama a tibetDelante después de los actores.
export function tibet(R, t, o = {}) {
  provisional(R, t, C.cieloAlto, C.nieve);
  return { encuadre: o.encuadre ?? 'montana', camara: o.camara ?? 'general', suelo: 152, libre: [30, 220] };
}
export function tibetDelante(R, t, o = {}) { return {}; }

// ── D · El reino de Mefisto ─────────────────────────────────────────────────────────────────────────────────────────
// ESTILIZADO, nada morboso: rocas rojas, ríos de luz naranja, cadenas que cuelgan, humo; Mefisto NUNCA tiene cara (una
// silueta enorme o una mano de luz roja).
// o.encuadre:
//   'camino': EL CAMINO DE LA NOCHE DE SAN JUAN: un sendero de luz entre rocas rojas que sube hacia una PUERTA enorme
//     de piedra con una cerradura de luz (x 200–290, y 30–150); ríos de luz al fondo, cadenas, ceniza que sube. Suelo y
//     152, libre x 30–200. o.alma 0–1: una luz blanca con forma de mujer que sube hacia arriba desde la puerta.
//     Cámara 'puerta': la puerta de cerca, para dos personajes delante (x 100–200).
//   'trono': EL TRONO DE MEFISTO: una sala de roca roja con columnas como raíces, un trono enorme (x 130–190, y 40–140),
//     la mano de luz roja de Mefisto sobre él (o.mefisto 0–1; con o.rey true: Doom en el trono, y la sala se vuelve
//     verde poco a poco); o.contratos 0–1: pergaminos que flotan y arden en el aire en llamas verdes y se deshacen en
//     luz; o.almas 0–1: luces verdes que suben libres. Suelo y 152, libre x 30–280. Cámara 'contratos': de cerca, los
//     pergaminos que arden y las luces que suben.
// Devuelve { encuadre, camara, suelo, libre, puerta?, trono? }. Llama a infiernoDelante después de los actores.
export function infierno(R, t, o = {}) {
  provisional(R, t, C.infierno, C.infiernoS);
  return { encuadre: o.encuadre ?? 'camino', camara: o.camara ?? 'general', suelo: 152, libre: [30, 200] };
}
export function infiernoDelante(R, t, o = {}) { return {}; }

// ── E · Battleworld ─────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'planeta': BATTLEWORLD desde el espacio: un planeta hecho de pedazos de mundos distintos cosidos (desierto, hielo,
//     selva, ciudades, mares) con costuras de luz dorada, estrellas, y al lado los restos de otros planetas que se
//     deshacen; Cámara 'trono': EL TRONO DEL DIOS EMPERADOR: una sala dorada inmensa con un árbol de luz detrás, el trono
//     enorme (asiento en x 160, y 110; un niño chibi sentado no llega al suelo), escalinata; o.halo 0–1; Suelo y 152,
//     libre x 40–280.
//   'tribunal': EL ESPACIO DEL JUEZ: un vacío de estrellas con una figura cósmica enorme de tres caras de luz (de
//     espaldas o en silueta, por atributos), una luz cálida sobre una niña dormida en una camilla de luz (x 140–180,
//     y 140); o.desvanece 0–1: el que está arrodillado (x 100) se vuelve polvo de luz. Cámara 'globo': el globo
//     terráqueo grande (x 110–210) con banderas verdes que se plantan (o.banderas 0–1). Suelo y 152.
// Devuelve { encuadre, camara, suelo, libre, trono?, nina?, globo? }. Llama a battleworldDelante después de los actores.
export function battleworld(R, t, o = {}) {
  provisional(R, t, C.mosaico, C.oroDios);
  return { encuadre: o.encuadre ?? 'planeta', camara: o.camara ?? 'general', suelo: 152, libre: [40, 280] };
}
export function battleworldDelante(R, t, o = {}) { return {}; }
