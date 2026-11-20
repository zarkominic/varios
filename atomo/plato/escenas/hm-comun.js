// Fontanería y decorados del episodio 43 (Haymitch: por qué el que ganó terminó destrozado), canon nuevo del 43 (relato
// hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate»), al nivel de episodios/ESTANDAR.md: el detalle de
// siempre. Reutiliza los decorados del 20 (jh-comun.js: distrito, interior, capitolio, arena (la sala de control), real,
// hoy, con sus Delante) y añade: B el prado del Covey, la casa de Haymitch, la destilería y la casa quemada (prado); D la
// arena de los Juegos 50 por dentro (arena50); F el estudio de las pausas y la consulta de los años sesenta (estudio).
// Personajes: ELENCO_JH y ELENCO_HM (pixel-chibi.js), por sus atributos, SIN logos, letras ni nada de las películas. LA
// VIOLENCIA NUNCA SE VE (las muertes se cuentan; nada de cuerpos, armas en uso ni sangre). CADA ENCUADRE TRAE DOS CÁMARAS
// (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en <x>Delante. Desde el 43 la
// esquina de Atom ya no hace falta dejarla vacía; la barra del tiempo (x 20–170, y 0–14), sí.
//
//   import * as T from '/atomo/plato/escenas/hm-comun.js';
//   const { E, R, M } = await T.preparar('hm-gancho');
//   T.rodar(E, R, [[0, (t) => T.prado(R, t, { encuadre: 'prado' })]], { año: 50 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_JH, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_JH, a_cifras };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el Distrito 12: carbón, madera gastada, tejados de chapa, el cielo gris del amanecer
    carbon: '#2a2a30', carbonL: '#4a4a52', tabla: '#7a6a5a', tablaS: '#4a3e34', chapa: '#8a8e96', polvo: '#b8aa98',
    // el Capitolio: colores chillones, cristal, mármol blanco, el dorado
    capRosa: '#e85aa8', capTurq: '#3ad0c8', capMorado: '#8a4ad8', marmol: '#eef0f4', marmolS: '#c8ccd8', oroCap: '#e8b830',
    // la arena: el verde del prado del 50, el azul de la cúpula y el brillo del campo de fuerza
    prado: '#5ab84a', pradoS: '#2e7a2e', cupula: '#8ad8ff', campoF: '#e8fbff',
    // lo real y hoy: el azul de las pantallas
    pantallaHoy: '#4a8ae8',
    // el pan con ojos: corteza dorada, miga
    corteza: '#c8843a', cortezaS: '#8a5220', miga: '#f6e2b0',
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
  const E = await escena(id, 'ep43');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en Juegos (los libros no dan años): la rosa de Snow (Juegos 10), el broche (Juegos 50) y la
  // llama de Katniss (Juegos 74–75)
  Object.assign(R.ICONOS, {
    rosa: ['..##...', '.####..', '######.', '.####..', '...#...', '..##...', '...#...'],
    broche: ['.#####.', '#..#..#', '#.###.#', '#######', '#.###.#', '#..#..#', '.#####.'],
    llama: ['...#...', '..##...', '..###..', '.####..', '.#####.', '#######', '.#####.'],
  });
  R.tramosTiempo([[1, 30, R.PALA.ROJO, 'rosa'], [30, 62, R.PALA.ORO, 'broche'], [62, 76, R.PALA.NARANJA ?? R.PALA.ROJO, 'llama']]);
  R.companero = () => {};   // desde el 43 Atom no vive en la esquina: actúa en la escena (atom-personaje.js)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

export { distrito, distritoDelante, interior, interiorDelante, capitolio, capitolioDelante, arena, arenaDelante, real, realDelante, hoy, hoyDelante } from '/atomo/plato/escenas/jh-comun.js';
export * as AT from '/atomo/plato/escenas/atom-personaje.js';

// ── B · El prado del Covey y la casa de Haymitch (Distrito 12, Juegos 50) ─────────────────────────────────────────────
// prado(R, t, o) pinta los 320 × 180 y devuelve su geometría ({ encuadre, camara, suelo, libre, … }); pradoDelante(R, t,
// o), con las MISMAS opciones, va DESPUÉS de los actores. o.luz: 'amanecer' | 'dia' (por omisión) | 'tarde' | 'noche'.
// Todo con textura y vida: hierba que se mece en ondas, flores silvestres, el bosque del 12 al fondo detrás de la
// alambrada, nubes de tres tonos a dos velocidades, pájaros, mariposas, humo de las chimeneas de la Veta a lo lejos.
// o.encuadre:
//   'prado': EL PRADO DEL COVEY, el sitio de Lenore Dove: una pradera con flores junto al bosque y una charca con juncos;
//     LAS OCAS (o.ocas, 0–6, 4 por omisión: blancas, con pico naranja, que pastan, se estiran, aletean y caminan en fila;
//     devuelve sus posiciones en ocas: [[x, y]…] para que una persiga a Atom); una manta en la hierba; un tronco caído
//     para sentarse; la alambrada del distrito y el bosque detrás. Cámara 'cerca': los dos sentados en el tronco junto a
//     la charca, las ocas alrededor, el reflejo del cielo; el sol (o.sol 0–1: de alto a puesto) que baja sobre el bosque.
//     Devuelve suelo, libre, tronco [x, y] (el asiento), charca [x0, y0, x1, y1].
//   'casa': DENTRO DE LA CASA DE HAYMITCH (la Veta): tablas con vetas y rendijas de luz, la cocina de hierro con la olla
//     que echa vapor, una mesa de tablas con dos sillas y un bollo con una vela (o.vela true: el cumpleaños), la ventana
//     con la Veta gris, ropa colgada, una cama de Sid con una manta de parches y juguetes de madera. Cámara 'mesa': la
//     mesa de cerca con el bollo y la vela que tiembla. Devuelve suelo, libre, mesa [x, y], ventana [x0, y0, x1, y1].
//   'destileria': LA DESTILERÍA DE HATTIE en el bosque: el alambique de cobre con su serpentín que gotea, el fuego bajo
//     la caldera, cajas de botellas transparentes, garrafas, sacos; pinos, luz entre los árboles. Cámara 'alambique': el
//     alambique de cerca, con las gotas que caen en la botella. Devuelve suelo, libre, cajas [x, y] (donde se cargan).
//   'quemada': LA CASA QUEMADA, de lejos y SIN fuego en primer plano: la silueta negra de tablas caídas, humo gris que
//     sube y se lo lleva el viento, vecinos pequeños mirando de lejos, la Veta alrededor (o.luz 'tarde'). Cámara 'cerca':
//     el porche caído y una taza de hojalata en el suelo. Devuelve suelo, libre.
export function prado(R, t, o = {}) { provisional(R, t, C.prado, C.pradoS); return { encuadre: o.encuadre || 'prado', camara: o.camara || 'general', suelo: 160, libre: [20, 300] }; }
export function pradoDelante(R, t, o = {}) {}

// ── D · La arena de los Juegos 50, por dentro ────────────────────────────────────────────────────────────────────────
// arena50(R, t, o) y arena50Delante(R, t, o). Una arena PRECIOSA Y VENENOSA: todo brilla demasiado. LA VIOLENCIA NUNCA SE
// VE: ni cuerpos, ni sangre, ni armas en uso. o.luz: 'dia' (por omisión) | 'tarde' | 'noche'. o.encuadre:
//   'prado': EL PRADO DE FLORES de la arena: flores de colores irreales (rosas, violetas, amarillos) que se mecen, un
//     bosque verde intenso detrás, una montaña nevada al fondo, mariposas de colores; o.polen (0–1): un humo violeta que
//     sale de las flores y se extiende; o.paracaidas (0–1): un paracaídas plateado del Capitolio que baja con una
//     botellita. Cámara 'flores': las flores de cerca, con el polen. Devuelve suelo, libre, paracaidas [x, y].
//   'bosque': EL BOSQUE de la arena: árboles con frutos brillantes (venenosos), un arroyo que destella, pájaros de
//     colores, una rama gruesa donde cabe una persona (para Maysilee). Cámara 'rama': la rama de cerca. Devuelve suelo,
//     libre, rama [x, y].
//   'deposito': EL DEPÓSITO DE AGUA bajo tierra: una caverna con paredes de roca húmeda, tuberías enormes, el agua quieta
//     con reflejos, luces de mantenimiento; o.estalla (0–1): el agua revienta y sale a chorro (sin nadie herido). Cámara
//     'tuberia': la tubería de cerca, con la carga y el pedernal. Devuelve suelo, libre, carga [x, y].
//   'borde': EL BORDE DE LA ARENA: un acantilado sobre un vacío con niebla, y el CAMPO DE FUERZA invisible que solo se ve
//     cuando algo lo toca (o.campo 0–1: un brillo de hexágonos que ondula); o.rebote: [t0, x0, y0] un objeto (un piñón o
//     un hacha) lanzado en t0 que choca con el campo y vuelve. Cámara 'acantilado': el borde de cerca, desde un lado.
//     Devuelve suelo, libre, campo [x0, x1] (dónde está el muro invisible).
export function arena50(R, t, o = {}) { provisional(R, t, C.prado, C.cupula); return { encuadre: o.encuadre || 'prado', camara: o.camara || 'general', suelo: 160, libre: [20, 300] }; }
export function arena50Delante(R, t, o = {}) {}

// ── F · El estudio de las pausas y la consulta ──────────────────────────────────────────────────────────────────────
// estudio(R, t, o) y estudioDelante(R, t, o). o.encuadre:
//   'estudio': EL ESTUDIO DE ATOM, donde explica (pausas, el aviso y el cierre): pared de ladrillo cálido con estanterías
//     llenas de libros (lomos sin letras), una pizarra verde con tiza (o.pizarra: función (R, t, rect) para dibujar en
//     ella), una lámpara de mesa, un globo terráqueo, una planta, una ventana con la noche y la luna, una mesa grande con
//     un cerebro de juguete, una lupa, un reloj de arena y una cesta de huevos de oca; vida: la lámpara que parpadea un
//     poco, polvo en el haz de luz, la planta que se mueve con la corriente. Cámara 'mesa': la mesa de cerca. Devuelve
//     suelo, libre, pizarra [x0, y0, x1, y1], mesa [x0, y0, x1, y1].
//   'consulta': LA CONSULTA DE UN PSIQUIATRA DE LOS AÑOS SESENTA: escritorio de madera con máquina de escribir y archivos,
//     un diván, diplomas (sin letras) en la pared, persiana veneciana con luz a rayas, un reloj de pared, una lámpara
//     verde de banquero; vida: el humo de una taza, las rayas de luz que se mueven, el péndulo. Cámara 'escritorio': el
//     escritorio de cerca con fichas. Devuelve suelo, libre, escritorio [x, y], divan [x, y].
export function estudio(R, t, o = {}) { provisional(R, t, C.tabla, C.tablaS); return { encuadre: o.encuadre || 'estudio', camara: o.camara || 'general', suelo: 160, libre: [20, 300] }; }
export function estudioDelante(R, t, o = {}) {}
