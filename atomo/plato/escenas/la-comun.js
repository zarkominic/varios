// Fontanería y decorados del episodio 16 (homenaje a las aventuras de LucasArts, 1987–1998 y hoy) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Ocho decorados (guion.md): A la mansión del científico loco, B el estudio
// de los ochenta, C la isla de los piratas, D tres épocas en una casa, E la carretera, F la Tierra de los Muertos, G el
// espacio, H hoy; más las piezas que no son humanas (los dos tentáculos, el perro y el conejo detectives, el esqueleto
// agente de viajes, el demonio mecánico, el mono de tres cabezas, el hámster, el retrete del tiempo) y la línea de verbos
// del homenaje. Homenaje dibujado por nosotros: reconocible por la silueta, sin copiar sprites ni logotipos, sin letras.
// Desde el 16, CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y 'cerca' u otra que diga su cabecera),
// con el mismo detalle: dentro de una escena un encuadre no se repite.
//
//   import * as T from '/atomo/plato/escenas/la-comun.js';
//   const { E, R, M } = await T.preparar('la-gancho');
//   T.rodar(E, R, [[0, (t) => T.mansion(R, t, { encuadre: 'rio', luz: 'noche' })]], { año: 1993 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el lodo tóxico y los dos tentáculos
    lodo: '#6ac83a', lodoS: '#3e8a2a', lodoL: '#b8f070', morado: '#8a3ac8', moradoS: '#5e2490', moradoL: '#b87ae8',
    verde: '#3ab84a', verdeS: '#2a8434', verdeL: '#8ae87a', ventosa: '#f0d8a8',
    // los piratas (noche de luna, niebla verde del fantasma), la Tierra de los Muertos (cempasúchil, art déco)
    marNoche: '#1e3a5a', marNocheL: '#3a6a8a', niebla: '#8ae8a8', cempasuchil: '#f0a020', calaca: '#f2eee2', deco: '#c8a84a',
    // las pantallas de los ochenta (fósforo verde y ámbar) y la línea de verbos
    fosforo: '#5af08a', ambar: '#f0b03a', verbos: '#2a2a4a', verbosL: '#8a8ab8', cursor: '#f2eee2',
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
  const E = await escena(id, 'ep16');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el disquete (1987–1990), el CD (1991–1995) y el mando (1996–2026)
  Object.assign(R.ICONOS, {
    disquete: ['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#.###.#', '#######'],
    cd: ['..###..', '.#...#.', '#..#..#', '#.#.#.#', '#..#..#', '.#...#.', '..###..'],
    mando: ['.......', '.#####.', '#.#..##', '###.#.#', '#.#..##', '.#####.', '.......'],
  });
  R.tramosTiempo([[1987, 1990, R.PALA.ORO, 'disquete'], [1991, 1995, R.PALA.AZUL, 'cd'], [1996, 2026, R.PALA.ROJO, 'mando']]);
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

// ── A · La mansión del científico loco ──────────────────────────────────────────────────────────────────────────────
// La mansión de un científico loco, torcida y colorida como un dibujo animado clásico (homenaje, sin copiar). o.encuadre:
//   'rio': detrás de la mansión, el río de lodo tóxico verde que sale de un tubo de la máquina del laboratorio, burbujea,
//     hace espuma y brilla; la orilla con hierba amarillenta, un cartel de peligro con calavera en pictograma, un árbol
//     torcido; la mansión al fondo con ventanas encendidas y la luna; o.luz 'noche' (por omisión), 'dia', 'atardecer'.
//     o.camara: 'general' (la orilla y la mansión) o 'cerca' (la orilla del río a ras de suelo, el lodo en primer
//     término, sitio para los dos tentáculos a buen tamaño).
//   'fachada': la mansión de frente en la colina, con la escalinata, la puerta, la torre del laboratorio con su antena que
//     echa chispas y el jardín con estatuas raras; o.camara 'general' o 'puerta' (la escalinata y la puerta de cerca, para
//     chavales que se cuelan); o.anyo 1987 (más oscura, ochentera) o 1993 (colores de dibujo animado), o.hd (repintada,
//     colores más vivos y limpios, 2016).
//   'cuarto': el cuarto del ordenador: un ordenador antiguo de los ochenta sobre una mesa, con su pantalla (o.pantalla:
//     función que pinta dentro), pósters sin letras, un flexo, cables; o.camara 'general' o 'pantalla' (la pantalla de
//     cerca, a toda la pantalla, con su marco de plástico y el reflejo).
//   'pasillo': un pasillo de la mansión con puertas, cuadros torcidos y una lámpara que oscila.
// Devuelve { suelo, pies, rio?, pantalla?, puerta?… }.
export function mansion(R, t, o = {}) {
  provisional(R, t, C.moradoS, C.lodoS);
  return { suelo: 150, pies: [40, 260] };
}

// ── B · El estudio de los ochenta ────────────────────────────────────────────────────────────────────────────────────
// Un estudio de videojuegos de California entre 1987 y 1990: mesas con ordenadores de monitor de fósforo (verde y ámbar),
// cajas de disquetes, cuadernos de diseño con bocetos, un corcho con dibujos (piratas, monos, una mansión) sin letras, una
// pizarra, tazas, una planta, la ventana con palmeras y sol de California. o.encuadre:
//   'oficina': la sala con dos o tres puestos; o.camara 'general' o 'mesa' (una mesa de cerca con el teclado, la pantalla
//     con la línea de verbos y el cursor; o.pantalla: función que pinta dentro).
//   'pizarra': la pizarra y el corcho de cerca (bocetos, flechas, pictogramas); o.camara 'general' o 'corcho'.
//   'dibujo': la mesa de dibujo con un fondo pintado en papel, pinceles, botes, y un escáner antiguo con su luz que pasa;
//     o.camara 'general' o 'escaner'.
//   'musica': un rincón con un teclado de sintetizador, altavoces y un ordenador con pentagramas; o.camara 'general' o 'teclado'.
// o.anyo (1987–1991): más o menos máquinas. Devuelve { suelo, pies, pantalla?, mesa?… }.
export function estudio(R, t, o = {}) {
  provisional(R, t, C.fosforo, C.ambar);
  return { suelo: 150, pies: [40, 260] };
}

// ── C · La isla de los piratas ───────────────────────────────────────────────────────────────────────────────────────
// Un puerto pirata del Caribe de noche, homenaje: luna grande, agua con reflejos, palmeras. o.encuadre:
//   'muelle': el muelle de tablas, la taberna iluminada con su letrero de pictograma (una jarra), barcos con velas,
//     faroles; o.camara 'general' o 'taberna' (la puerta de la taberna de cerca, con piratas dentro por la ventana).
//   'bosque': el bosque de la isla con caminos, un claro para el duelo y un mapa del tesoro clavado en un árbol;
//     o.camara 'general' o 'claro'.
//   'mansion': la mansión de la gobernadora en la colina, con su jardín y un ídolo dorado tras una ventana; o.camara
//     'general' o 'ventana'.
//   'fondo': el fondo del mar con arena, algas, peces, un ancla y rayos de luz; o.camara 'general' o 'cerca'.
//   'barcoFantasma': el barco fantasma en la niebla verde, translúcido, con su tripulación de fantasmas pequeños.
// o.luz 'noche' (por omisión) o 'dia'. Devuelve { suelo, pies, agua?, claro?… }.
export function isla(R, t, o = {}) {
  provisional(R, t, C.marNoche, C.marNocheL);
  return { suelo: 150, pies: [40, 260] };
}

// ── D · Tres épocas en una casa ──────────────────────────────────────────────────────────────────────────────────────
// La misma casa (la mansión, en una versión propia) en tres épocas. o.encuadre:
//   'pasado': 1793: la casa como posada colonial, caballeros con peluca escribiendo con plumas, velas, una tormenta por
//     la ventana con una cometa y un rayo; o.camara 'general' o 'cometa' (el tejado en la tormenta con la cometa).
//   'presente': 1993: el vestíbulo de la mansión con escaleras, un reloj de pie y los retretes portátiles en el jardín.
//   'futuro': 2193: la casa convertida en palacio de los tentáculos: estandartes morados, humanos en jaulas cómicas
//     (sin crueldad: con almohadas y caramelos), máquinas raras.
//   'triple': la pantalla partida en tres con las tres épocas a la vez (cada una en su franja, con su luz).
// o.camara en cada uno ('general' o 'cerca'). Devuelve { suelo, pies, retretes?… }.
export function epocas(R, t, o = {}) {
  provisional(R, t, C.ladrillo ?? hex('#a84a34'), C.morado);
  return { suelo: 150, pies: [40, 260] };
}

// ── E · La carretera ─────────────────────────────────────────────────────────────────────────────────────────────────
// La América de las carreteras de los sesenta, homenaje: o.encuadre:
//   'carretera': una carretera recta por el desierto con mesetas, postes de teléfono, un cactus y un coche de los
//     sesenta que pasa (pieza T.coche60, devuelve los asientos para los detectives); o.camara 'general' o 'coche' (el coche
//     de cerca, de lado, en marcha, con el paisaje que corre).
//   'feria': una feria con carpa de rayas, noria, puestos y un letrero de pictograma con una huella gigante; o.camara
//     'general' o 'carpa'.
//   'atraccion': una atracción de borde de carretera absurda (un animal gigante de fibra de vidrio, un ovillo enorme) con
//     su aparcamiento; o.camara 'general' o 'cerca'.
//   'moteros': una carretera de noche con un bar de moteros, neones de pictograma y motos aparcadas.
// Devuelve { suelo, pies, coche?… }.
export function carretera(R, t, o = {}) {
  provisional(R, t, C.arena ?? hex('#d8c8a0'), C.cielo ?? hex('#6aaae0'));
  return { suelo: 150, pies: [40, 260] };
}

// ── F · La Tierra de los Muertos ─────────────────────────────────────────────────────────────────────────────────────
// Una ciudad de esqueletos con el Día de Muertos de México y el art déco (homenaje, sin copiar): o.encuadre:
//   'ciudad': la calle con un rascacielos art déco, papel picado de colores entre las farolas, flores de cempasúchil,
//     altares con velas y un tranvía o un tren dorado al fondo; o.camara 'general' o 'altar' (un altar de cerca).
//   'agencia': la oficina de una agencia de viajes art déco con su ventanilla, carteles de viaje en pictograma (un tren,
//     un barco), un ventilador de techo y una persiana; o.camara 'general' o 'ventanilla'.
//   'taller': un taller de coches con un coche antiguo con el capó abierto y herramientas; o.camara 'general' o 'capo'.
//   'calendario': un muro con cuatro hojas de calendario de Día de Muertos (sin letras) para el paso de los años.
// o.luz 'noche' (por omisión, con velas) o 'dia'. Devuelve { suelo, pies, ventanilla?, capo?… }.
export function muertos(R, t, o = {}) {
  provisional(R, t, C.cempasuchil, C.deco);
  return { suelo: 150, pies: [40, 260] };
}

// ── G · El espacio ───────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre: 'combate' (un caza de alas en X propio, sin marcas, entre estrellas con una nave grande al fondo; la cabina
// con sitio para un piloto; o.camara 'general' o 'cabina') y 'asteroide' (un asteroide con una puerta extraña que se abre
// con luz y un astronauta; o.camara 'general' o 'puerta'). Devuelve { cabina?, suelo?… }.
export function espacio(R, t, o = {}) {
  provisional(R, t, hex('#0a0a1e'), hex('#2a2a4a'));
  return { suelo: 150, pies: [40, 260] };
}

// ── H · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cuarto90': un cuarto de chico de los noventa con un ordenador de tubo, cajas de juegos en la estantería (inventadas,
//     sin logos), pósters sin letras, una lámpara de lava; o.camara 'general' o 'pantalla'.
//   'cuartoHoy': un cuarto de hoy con un ordenador moderno de pantalla ancha, la misma estantería de cajas viejas, un
//     teléfono y una tableta; o.camara 'general' o 'pantalla'.
//   'estudioHoy': un estudio de hoy con jóvenes y portátiles, pantallas con aventuras nuevas; o.camara 'general' o 'mesa'.
//   'foro': una pared de pantallas con avatares de aficionados (sin letras).
// Devuelve { suelo, pies, pantalla?… }.
export function hoy(R, t, o = {}) {
  provisional(R, t, hex('#3a4a6a'), hex('#c8a878'));
  return { suelo: 150, pies: [40, 260] };
}

// ── Las piezas que no son humanas ────────────────────────────────────────────────────────────────────────────────────
// Los dos tentáculos (homenaje propio): un tentáculo erguido (~22–28 px a o.s 1) con base de ventosa, dos ojos grandes y
// boca expresiva, que salta para moverse. o.color 'morado' o 'verde'; o.brazos (0–1: le salen dos bracitos tras beber);
// o.expresion 'normal', 'feliz', 'malvado', 'preocupado', 'sorpresa'; o.anda (salta), o.dir, o.s (escala), o.habla;
// o.accesorio 'peluca', 'calavera', 'casco', 'disfraz' (bigfoot). Devuelve { x, y, ojos, boca, mano? }.
export function tentaculo(R, x, y, t, o = {}) {
  R.rect(x - 5, y - 24, x + 5, y, o.color === 'verde' ? C.verde : C.morado);
  return { x, y };
}
// El perro detective (traje y sombrero de fieltro) y el conejo blanco hiperactivo, homenaje propio a escala chibi;
// o.quien 'perro' o 'conejo', o.dir, o.anda, o.habla, o.salta (el conejo no para quieto).
export function detective(R, x, y, t, o = {}) {
  R.rect(x - 6, y - 24, x + 6, y, o.quien === 'conejo' ? C.blanco : hex('#5a5a6a'));
  return { x, y };
}
// Un esqueleto con traje y sombrero (el agente de viajes) o con chaqueta (otros), cara de calaca alegre; o.ropa, o.dir,
// o.anda, o.habla. Y el demonio mecánico: enorme, naranja, bonachón, con mono de trabajo (o.quien 'demonio').
export function calaca(R, x, y, t, o = {}) {
  R.rect(x - 6, y - 24, x + 6, y, o.quien === 'demonio' ? C.naranja ?? hex('#e8783a') : C.calaca);
  return { x, y };
}
// Animalillos de los gags: o.quien 'mono3' (un mono de tres cabezas), 'hamster' (mareado, con o.mareo), 'mono'.
export function bicho(R, x, y, t, o = {}) {
  R.rect(x - 4, y - 8, x + 4, y, hex('#8a5a30'));
  return { x, y };
}
// El retrete portátil del tiempo: una caseta de plástico con un reloj encima y una antena; o.puerta (0–1), o.viaje (0–1:
// destello y desaparece), o.s. Devuelve { x, y, puerta }.
export function retrete(R, x, y, t, o = {}) {
  R.rect(x - 8, y - 26, x + 8, y, hex('#3a8ac8'));
  return { x, y };
}
// La línea de verbos del homenaje, abajo (y 150–179): nueve botones con pictogramas (ojo = mirar, mano = coger, boca =
// hablar, puerta = abrir…), sin letras; o.activo (índice del verbo resaltado), o.inventario (iconos a la derecha), y el
// cursor en cruz en (o.cursor [x, y]). Se pinta encima de todo en los planos de homenaje.
export function verbos(R, t, o = {}) {
  R.rect(0, 150, 319, 179, C.verbos);
}
