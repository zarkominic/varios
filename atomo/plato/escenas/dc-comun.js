// Fontanería y decorados del episodio 24 (Los archivos desclasificados que parecen mentira) en el estilo canónico pixel
// chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la carrera espacial (un patio de 1957, el despacho de
// la Fuerza Aérea, el laboratorio de Chicago de 1958, un observatorio, una redacción de 2000), B los animales espías (el
// taller de la CIA de los sesenta, un parque europeo con su furgoneta, el laboratorio de Skinner, el campo alemán nevado
// con la mina, los Archivos Nacionales británicos en 2004), C los espías psíquicos (el laboratorio de Stanford de los
// setenta, la oficina de Fort Meade, la revisión de 1995), D la guerra de mentira (el campo de Francia de 1944 con tanques
// de goma, la orilla del Rin en 1945, la ceremonia de 2024) y el hielo (el despacho de Londres de 1942, el taller del
// pykrete, la bañera, el lago Patricia), y E hoy (el archivo de Atom).
// Los personajes son los de ELENCO_DC y PIEZAS_DC (pixel-chibi.js): dibujados por nosotros, sin logos ni letras.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bancos de trabajo, el
// escritorio, la barandilla) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de
// los actores». La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: nada morboso. Ninguna bomba estalla en pantalla, ningún animal sufre, nadie dispara contra nadie.
//
//   import * as T from '/atomo/plato/escenas/dc-comun.js';
//   const { E, R, M } = await T.preparar('dc-gancho');
//   T.rodar(E, R, [[0, (t) => T.hoy(R, t, { encuadre: 'archivo' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_DC: el gato espía, la mina, el tanque de goma, el bloque de hielo…), las crea el reparto
export const PIEZAS_DC = KIT.PIEZAS_DC || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la Guerra Fría: azul noche, verde de pizarra, tiza, gris de archivo, beige de carpeta, rojo de sello
    noche: '#141a3a', pizarra: '#2a4a3a', pizarraS: '#1a3226', tiza: '#e8ece4', luna: '#e8e4d0', lunaS: '#a8a490',
    carpeta: '#d8c8a0', carpetaS: '#a8946a', selloR: '#c8282a', archivo: '#6a6e78', archivoS: '#464a54',
    // la guerra de mentira: verde oliva, goma, lona; el hielo: azul hielo y pykrete gris
    oliva: '#5a6a3a', olivaS: '#3a4626', goma: '#4a5a3a', lona: '#a89a70', hielo: '#c8e4f0', hieloS: '#7aa8c0', pykrete: '#9aa4a8',
    // los setenta: naranja, mostaza y moqueta
    naranja70: '#d8742a', mostaza: '#c8a03a', moqueta: '#6a5034',
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
  const E = await escena(id, 'ep24');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1942 (la guerra: el hielo y el Ejército Fantasma), 1957 (la carrera espacial y la CIA), 1972 (los
  // psíquicos), 2000 (los secretos que salen a la luz) y 2026
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    luna: ['..###..', '.##....', '##.....', '##.....', '##.....', '.##....', '..###..'],
    ojo: ['.......', '..###..', '.#...#.', '#..#..#', '.#...#.', '..###..', '.......'],
    carpeta: ['###....', '#######', '#.....#', '#.....#', '#.....#', '#######', '.......'],
  });
  R.tramosTiempo([[1942, 1957, R.PALA.VERDE ?? R.PALA.ORO, 'estrella'], [1957, 1972, R.PALA.AZUL ?? R.PALA.ROJO, 'luna'], [1972, 2000, R.PALA.ROJO, 'ojo'], [2000, 2026, R.PALA.ORO, 'carpeta']]);
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





// ── A · La carrera espacial ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'patio57': el patio trasero de una casa de suburbio en octubre de 1957, de noche: la casa de madera con porche y
//     ventanas encendidas, la valla blanca, el césped, el columpio, la antena de tele en el tejado, casas vecinas, un
//     cielo estrellado tramado con la Vía Láctea; o.sputnik 0–1: un puntito brillante que cruza el cielo de izquierda a
//     derecha. La mesa de jardín con el radio de onda corta (con su dial que brilla) va en carreraDelante.
//     Cámara 'cielo': mirando hacia arriba: el cielo estrellado grande, las copas de los árboles y la antena en silueta
//     abajo; o.sputnik igual.
//   'despachoAF': un despacho de la Fuerza Aérea en 1957: paneles de madera, banderas sin letras, un globo terráqueo, una
//     maqueta de la Luna sobre su pie, mapas con chinchetas, una ventana a Washington de noche con la cúpula del Capitolio
//     iluminada, persianas, archivadores, el teléfono negro. La mesa grande va en carreraDelante.
//     Cámara 'mesa': la mesa de cerca (inserto): la maqueta de la Luna, una carpeta con el sello rojo, ceniceros, gafas,
//     un cohete de juguete.
//   'laboratorio': el laboratorio de la Armour Research Foundation en Chicago, 1958: pizarras verdes llenas de cálculos con
//     tiza (cifras, curvas, flechas, un dibujo de la Luna con la línea del día y la noche), bancos con aparatos y reglas de
//     cálculo, lámparas colgantes, la ventana con el tren elevado de Chicago que pasa; o.nube 0–1 dibuja en la pizarra la
//     nube de polvo que crece. El banco de delante va en carreraDelante.
//     Cámara 'pizarra': la pizarra de cerca: la Luna grande dibujada con tiza, la línea del día y la noche, un cohete de
//     tiza que avanza hacia ella (o.cohete 0–1), la nube de polvo con su brillo al Sol (o.nube 0–1), cifras y un «?».
//   'observatorio': un observatorio de noche: la cúpula con la ranura abierta al cielo y la Luna enorme y detallada, el
//     telescopio en su montura, la escalera, la consola con luces, mapas lunares en la pared. La barandilla va en
//     carreraDelante.
//     Cámara 'luna': lo que se ve por el telescopio: la Luna grande y detallada con mares y cráteres y la línea del día y
//     la noche, en el círculo del ocular, con el retículo.
//   'redaccion': una redacción de periódico en el año 2000: mesas con monitores de tubo, teléfonos, montones de papel,
//     corchos con recortes (sin letras: rayas), la ventana a Londres con el Big Ben de noche, la impresora que escupe hojas.
//     El escritorio va en carreraDelante.
//     Cámara 'cajon': un archivo polvoriento: el cajón metálico que se abre con el informe dentro (o.abre 0–1), una carpeta
//     con candado (o.candado true por omisión) y el polvo que cae.
export function carrera(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de carrera(); se llama después de los actores, con las mismas opciones
export function carreraDelante(R, t, o = {}) {
  return {};
}


// ── B · Los animales espías ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'tallerCIA': el taller técnico de la CIA en los años sesenta: paneles de herramientas, osciloscopios con ondas verdes,
//     un magnetofón de bobinas que giran, cables, cajas de componentes, una cesta con cojín para el gato, la ventana con
//     persiana, la lámpara de flexo. El banco de trabajo va en animalesDelante.
//     Cámara 'mesa': el banco de cerca (inserto): un micrófono diminuto, una pila, un cable fino, la lupa con su brillo,
//     el soldador que humea, un esquema técnico sin letras.
//   'parque': un parque europeo en los sesenta: bancos de hierro, castaños, la fuente con su chorro, palomas que picotean
//     y vuelan, farolas, edificios clásicos al fondo, una furgoneta gris aparcada en el borde (la de los espías, con una
//     antena), gente pequeña que pasea. Los bancos de delante van en animalesDelante.
//     Cámara 'furgoneta': dentro de la furgoneta: magnetófonos, auriculares colgados, luces de aparatos, la ventanita
//     trasera por la que se ve el parque (recortado a su hueco).
//   'labSkinner': el laboratorio de Skinner en los años cuarenta: jaulas con palomas que se mueven, la punta de una bomba
//     de maqueta abierta, pizarra, bata colgada, un proyector, la ventana. La mesa va en animalesDelante.
//     Cámara 'punta': dentro de la punta de la bomba (inserto): la pantallita con la imagen de un barco que se mueve, el
//     arnés, el visor redondo.
//   'campoNieve': un campo alemán nevado en los años cincuenta: pinos con nieve, la mina enorme de acero (un depósito con
//     remaches) enterrada a medias en un hoyo, huellas, un camión militar, una caseta de madera con humo, nieve que cae,
//     cielo gris. Lo de delante (la valla, la nieve del primer plano) va en animalesDelante.
//     Cámara 'plano': un plano técnico azul sobre una mesa (sin letras): el corte de la mina con gallinas dentro, su
//     comedero y su bebedero, la regla y el compás.
//   'archivos2004': la sala de lectura de los Archivos Nacionales británicos en 2004: estanterías con cajas grises, mesas
//     largas con lámparas verdes, un calendario de pared que marca el 1 de abril (o.dia, o.mes), cámaras de los periodistas
//     con flashes (o.flash 0–1). La mesa larga va en animalesDelante.
//     Cámara 'caja': una caja de archivo que se abre (inserto): expedientes atados con cinta, el sello rojo, papeles que
//     salen (o.abre 0–1).
export function animales(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de animales(); se llama después de los actores, con las mismas opciones
export function animalesDelante(R, t, o = {}) {
  return {};
}


// ── C · Los espías psíquicos ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'sri': un laboratorio de los años setenta en el Instituto de Investigación de Stanford: un cuarto aislado con malla
//     metálica y una mesa con papel, la ventana de observación, aparatos con agujas y luces, moqueta naranja, paneles de
//     madera, plantas colgantes, la ventana con palmeras de California. La mesa del cuarto va en psiquicosDelante.
//     Cámara 'dibujo': el papel de cerca (inserto): un boceto a lápiz que se va dibujando solo (o.trazo 0–1) y un mapa del
//     mundo con un «?» en un punto.
//   'fortmeade': la oficina de Fort Meade en los ochenta: mesas con lámparas, mapas con chinchetas, bocetos de bases, barcos
//     y aviones clavados en un corcho, archivadores, cafetera, la ventana a una base militar con barracones. Las mesas van
//     en psiquicosDelante.
//     Cámara 'pared': el corcho de cerca: bocetos, chinchetas, hilos rojos, fotos sin caras.
//   'revision': una sala de reuniones de 1995: mesa larga, carpetas con cruces, un proyector, persianas, un ordenador
//     beige. La mesa va en psiquicosDelante.
//     Cámara 'pantalla2017': un ordenador de 2017 de cerca: la pantalla plana con miles de páginas que pasan (rayas, sin
//     letras), el teclado, una taza.
export function psiquicos(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de psiquicos(); se llama después de los actores, con las mismas opciones
export function psiquicosDelante(R, t, o = {}) {
  return {};
}


// ── D · La guerra de mentira ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'campo44': un campo de Francia en 1944 al anochecer: setos, prados, árboles, una granja de piedra, tanques inflables
//     verdes de goma en fila (o.inflado 0–1: se arrugan y se aplastan si baja), un camión con un altavoz enorme, una
//     tienda de lona con una antena de radio, cielo de atardecer con nubes; vida: humo, pájaros, el altavoz que vibra.
//     Lo de delante (el seto, las cajas) va en guerraDelante.
//     Cámara 'tienda': dentro de la tienda de radio: la lona iluminada por una lámpara, la radio con sus diales, auriculares,
//     el mapa, cajas de munición convertidas en mesa.
//   'rin': la orilla del Rin en marzo de 1945, de noche: el río ancho con reflejos, al otro lado colinas y pueblos a
//     oscuras; en esta orilla un campamento de mentira con tanques de goma, hogueras y tiendas; muy a lo lejos, en otro punto
//     del río, botes pequeños que cruzan. Lo de delante va en guerraDelante.
//     Cámara 'mapa': la mesa de mapas (inserto): el mapa del río con dos flechas (una falsa y otra real), fichas, un compás.
//   'capitolio': una sala del Capitolio en 2024: columnas, cortinas, banderas sin letras, el atril, sillas con público
//     pequeño, focos; o.medalla true: un brillo dorado. El atril va en guerraDelante.
//     Cámara 'taller': el taller de un artista: un caballete con un cuadro de grandes campos de color, bocetos de vestidos
//     de moda en la pared, un maniquí, botes de pintura, la ventana con luz.
export function guerra(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de guerra(); se llama después de los actores, con las mismas opciones
export function guerraDelante(R, t, o = {}) {
  return {};
}


// ── D2 · El hielo ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'londres42': un despacho de Londres en 1942: el mapa grande del Atlántico en la pared con submarinos y una zona sin
//     aviones, la ventana con lluvia y los tejados de Londres, una estufa, sillones de cuero, libros, el teléfono. La mesa
//     va en hieloDelante.
//     Cámara 'mapa': el mapa de cerca: el Atlántico, los convoyes, los submarinos, un iceberg dibujado que se convierte en
//     portaaviones (o.dibuja 0–1).
//   'tallerHielo': un taller frío: moldes de madera, bloques de hielo y de pykrete grises, sacos de serrín, cubos de agua,
//     un congelador industrial con vaho, un martillo; o.rompe 0–1: un bloque de hielo normal que se raja. El banco va en
//     hieloDelante.
//     Cámara 'reunion': una sala de reuniones de 1943: mesa larga con mantel verde, un bloque de pykrete en la mesa, sillas
//     de altos mandos (los personajes los pone la escena), mapas, ventanas altas.
//   'banera': un cuarto de baño elegante de los cuarenta: la bañera con patas llena de agua con vapor, azulejos, un espejo
//     empañado, toallas, un patito; nadie dentro; o.bloque 0–1: un bloque que cae y flota.
//     Cámara 'cerca': la bañera de cerca, con el bloque flotando y las ondas.
//   'patricia': el lago Patricia en las Rocosas de Canadá: montañas nevadas, pinos, el lago azul verdoso con reflejos, el
//     prototipo (un barquito de hielo con tejado de madera) flotando; o.estacion 'verano' | 'otono' | 'invierno' (colores,
//     hojas, nieve); o.hundido 0–1 (se va hundiendo). La orilla de delante va en hieloDelante.
//     Cámara 'fondo': bajo el agua: el fondo del lago con los restos de madera y metal, algas, peces, la luz desde arriba.
export function hielo(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hielo(); se llama después de los actores, con las mismas opciones
export function hieloDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'archivo': el archivo de Atom de noche: estanterías altas llenas de carpetas con sellos rojos (sin letras), cajas, una
//     escalera de biblioteca, un archivador metálico, la ventana con la Luna llena, una lámpara de pie, un reloj, una planta;
//     o.luz 0–1 (1 encendido, 0 a oscuras con un haz de linterna en o.linterna [x, y]). El escritorio con las carpetas va en
//     hoyDelante.
//     Cámara 'mesa': el escritorio de cerca: carpetas (o.carpetas: lista de 'luna', 'gato', 'gallina', 'ojo', 'tanque',
//     'hielo' con su dibujo en la tapa), el sello de goma, la lámpara, el micrófono de Atom (o.microfono true por omisión).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  const c = [C.noche, C.archivo]; provisional(R, t, c[0], c[1]);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}

export function gatoEspia(R, x, y, t, o = {}) { if (PIEZAS_DC.gatoEspia) PIEZAS_DC.gatoEspia(R, x, y, { t, ...o }); }
