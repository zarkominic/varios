// Fontanería y decorados del episodio 15 (Nueva York, de isla de bosques a ciudad de rascacielos) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Ocho decorados (guion.md): A la bahía 1524–1609, B Nueva Ámsterdam
// 1624–1664, C Nueva York colonial 1765–1789 (y C2, la guerra de 1776), D el puerto y el canal 1811–1860, E los que
// llegaron 1840–1898, F la feria y la obra 1854–1916, G la carrera al cielo 1929–1931, H la ciudad de hoy; más el mapa de
// papel (mapaNY). Los lenapes, con respeto y según las fuentes; las guerras, sin violencia en la imagen; sin letras ni
// marcas reales. Reutiliza del 10 la paleta, rodar, la mano, el brazo y la silla.
//
//   import * as T from '/atomo/plato/escenas/ny-comun.js';
//   const { E, R, M } = await T.preparar('ny-gancho');
//   T.rodar(E, R, [[0, (t) => T.bahia1524(R, t, { encuadre: 'estrecho' })]], { año: 1524 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { equirect, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el puerto: el agua de la bahía, las marismas, el bosque de 1524
    bahia: '#3a6e8e', bahiaS: '#28506a', bahiaL: '#6aa0be', espuma: '#e8f0f0', marisma: '#8a9a5a', marismaS: '#6a7a42',
    bosque: '#3a6a3a', bosqueS: '#28502c', bosqueL: '#5a8a4a',
    // la ciudad: el ladrillo holandés, la piedra rojiza de las brownstones, la piedra caliza y el acero
    ladrillo: '#a84a34', ladrilloS: '#7a3424', ladrilloL: '#c86a4a', brown: '#7a4a3a', brownS: '#5a3428', brownL: '#9a6450',
    caliza: '#d8d0bc', calizaS: '#b0a890', calizaL: '#ece6d6', acero: '#8a96a2', aceroS: '#5e6a76', aceroL: '#c8d2dc',
    // el cristal de la posguerra, el art déco del Chrysler, el cobre verde de la estatua
    cristal: '#6aa0b8', cristalS: '#3e6a80', cristalL: '#b8dcea', deco: '#c8ccd4', decoS: '#8a909c', cobre: '#5aa898', cobreS: '#3a7a6c',
    // las banderas (holandesa, inglesa y la de las barras y estrellas de 1783) y el oro
    rojoBandera: '#c8303a', azulBandera: '#2a3a7a', naranja: '#e8783a', oro: '#e8b830', oroS: '#a8801c',
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
  const E = await escena(id, 'ep15');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el barco de vela (el puerto), el barril (el canal y los que llegaron) y el rascacielos
  Object.assign(R.ICONOS, {
    barco: ['...#...', '...##..', '...###.', '...#...', '#######', '.#####.', '.......'],
    barril: ['.#####.', '#.....#', '#######', '#.....#', '#######', '#.....#', '.#####.'],
    rascacielos: ['...#...', '...#...', '..###..', '..###..', '.#####.', '.#####.', '#######'],
  });
  // la barra de tiempo: el puerto (1524–1824), el canal y los que llegaron (1825–1899) y los rascacielos (1900–2026)
  R.tramosTiempo([[1524, 1824, R.PALA.ORO, 'barco'], [1825, 1899, R.PALA.AZUL, 'barril'], [1900, 2026, R.PALA.ROJO, 'rascacielos']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// sitios ([lon, lat]) para las chinchetas del mapa
export const LUGARES = {
  nuevaYork: [-74.0, 40.71], dieppe: [1.08, 49.92], madeira: [-16.9, 32.65], albany: [-73.76, 42.65], buffalo: [-78.88, 42.89],
  londres: [-0.13, 51.5], amsterdam: [4.9, 52.37], cork: [-8.47, 51.9],
};
// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── A · La bahía, 1524–1613 ───────────────────────────────────────────────────────────────────────────────────────────
// La bahía de Nueva York antes de la ciudad: bosque de robles, castaños y pinos, marismas con garzas, playas, colinas
// (Manhattan era «la isla de muchas colinas»), el agua viva con olas, reflejos y espuma; cielo tramado de primavera con
// nubes de tres tonos a varias velocidades, gaviotas, cormoranes. o.encuadre:
//   'estrecho': desde el mar, el estrecho entre dos colinas boscosas (los Narrows, Staten Island a la izquierda y Brooklyn
//     a la derecha) y, al fondo, el agua de la bahía que se abre; delante, mar abierto con olas en perspectiva; el sitio del
//     barco fondeado a un lado (la escena pone T.dauphine) y el carril del bote que entra remando hacia el estrecho.
//   'bahia': dentro de la bahía: agua tranquila, la orilla de bosque con una playa de arena, marismas con garzas y juncos,
//     el humo de un poblado lenape entre los árboles (casas largas de corteza insinuadas), la isla larga de Manhattan con
//     sus colinas al fondo; sitio en el agua para canoas (T.canoa) y el bote.
//   'rio': el gran río (el Hudson de 1609) entre acantilados altos de roca (las Palisades) cubiertos de bosque, agua ancha
//     que corre, aves; sitio en el centro para el Halve Maen.
//   'orilla': la orilla de Manhattan de 1613: la linde del bosque, la playa con troncos y piedras, una cabaña de troncos a
//     medio hacer, fardos de pieles de castor y un hacha en un tocón; sitio para personajes en la arena y un barco que se
//     va al fondo.
// o.viento (0–1): el viento del mar que dobla las copas, riza el agua, hincha las nubes y levanta espuma (la frase 4).
// o.luz ('dia', 'tarde', 'anochecer'). Pinta los 320×180 en cada fotograma: el fondo fijo (R.nuevo) más el agua y el cielo
// vivos. Devuelve { suelo, hor, pies: [x0, x1], agua: [x0, y0, x1, y1] } y los puntos útiles de cada encuadre.
export function bahia1524(R, t, o = {}) {
  provisional(R, t, C.bahia, C.bosque);
  return { suelo: 150, hor: 80, pies: [40, 260], agua: [0, 90, 319, 179] };
}
// La Dauphine (la nao francesa de 1524, tres palos, velas cuadras con flor de lis insinuada en la mayor, castillo de
// popa) o, con o.barco 'halveMaen', el Halve Maen de Hudson (más pequeño, holandés, popa alta con decoración, bandera
// tricolor). Tamaño de escena (~60 px de eslora con o.s 1); se mece con las olas, las velas se hinchan con o.viento; o.ancla
// true: fondeada con el cable del ancla y las velas recogidas; o.dir 1 / −1. (x, y): la línea de flotación en el centro.
export function dauphine(R, x, y, t, o = {}) {
  R.rect(x - 30, y - 30, x + 30, y, C.robleS ?? hex('#4a3018'));
  return { x, y };
}
// Una canoa lenape de tronco vaciado (o de corteza) con dos o tres remeros pequeños con plumas de colores, que avanza y
// rema; o.n remeros, o.dir. La escena puede poner encima personajes chibi en su lugar. (x, y): la línea del agua.
export function canoa(R, x, y, t, o = {}) {
  R.rect(x - 14, y - 3, x + 14, y, hex('#6a4a2a'));
  return { x, y };
}

// ── B · Nueva Ámsterdam, 1624–1664 ───────────────────────────────────────────────────────────────────────────────────
// El pueblo holandés en la punta sur de Manhattan. o.encuadre:
//   'puerto': desde el agua: el fuerte de tierra con empalizada y la bandera de la compañía, el molino de viento (T.molino)
//     que gira, las casas de ladrillo con tejados en escalera y tejas rojas, la iglesia de piedra, el muelle de madera con
//     barcos holandeses de carga, barricas y fardos; colonos pequeños de fondo. o.crece (0–1): de 1625 (fuerte a medio
//     hacer, casas de corteza y madera) a 1660 (pueblo lleno de ladrillo). o.ingleses (0–1): entran los barcos de guerra
//     ingleses por la bahía con los cañones asomados (llegan y se quedan quietos).
//   'calle': una calle del pueblo: casas de ladrillo con tejados en escalera, contraventanas, un canal pequeño con un
//     puente, cerdos y gallinas, el molino al fondo; sitio para personajes en la calle. o.muro (0–1): el muro de troncos
//     que se levanta de lado a lado al fondo de la calle; o.hoy (0–1): el mismo sitio se convierte en la calle de hoy
//     (fachadas de piedra altas y un letrero de calle sin letras: un pictograma de un muro).
//   'fuerte': dentro del fuerte: la muralla de tierra con cañones, el mástil con la bandera, la casa del gobernador, el
//     puerto detrás con los barcos ingleses. o.bandera: 'holandesa', 'blanca' o 'inglesa' (la que ondea; con o.cambio 0–1
//     baja una y sube otra).
//   'mesa': un inserto: la mesa de un comerciante con la carta de 1626 (papel con renglones sin letras y el sello), y las
//     mercancías del trueque: telas, hachas, cazos de cobre, cuentas; la ventana con el puerto detrás.
// Devuelve { suelo, pies, ... } con los puntos útiles (el mástil, la mesa, la boca del puerto).
export function nuevaAmsterdam(R, t, o = {}) {
  provisional(R, t, C.ladrillo, C.bahia);
  return { suelo: 150, pies: [40, 260] };
}
// El molino de viento holandés de Nueva Ámsterdam (torre de madera, caperuza, cuatro aspas con lona) que gira con t; o.s
// escala, o.giro fija el ángulo; devuelve las puntas de las aspas en cada instante (para el gag del sombrero).
export function molino(R, x, y, t, o = {}) {
  R.rect(x - 6, y - 30, x + 6, y, hex('#7a5a3a'));
  return { x, y, puntas: [] };
}

// ── C · Nueva York colonial, 1765–1789 ───────────────────────────────────────────────────────────────────────────────
// La ciudad británica del siglo XVIII. o.encuadre:
//   'wallStreet': Wall Street con el ayuntamiento al fondo de la calle (1765: el edificio de ladrillo con arcadas; con
//     o.anyo 1789: el Federal Hall reformado con su balcón de columnas y frontón, banderas y gente en los tejados); casas
//     de ladrillo georgianas, la torre de la iglesia de la Trinidad al fondo, faroles, carros, adoquines; sitio para la
//     multitud y los personajes. o.multitud (0–1): la calle se llena de gente pequeña.
//   'taberna': el interior de una taberna (vigas, chimenea, jarras de peltre, mesas con naipes y periódicos, un mostrador
//     con barricas, ventanas a la calle); sitio para la mesa de los naipes delante.
//   'bateria': la punta de la isla (la Batería) con el mástil alto de la bandera, el puerto con barcos británicos que se van
//     a vela, la multitud que mira; o.bandera ('britanica' o 'barras') y o.salen (0–1: los barcos se alejan).
//   'salon': un interior del Federal Hall: o.sala 'congreso' (pupitres, plumas y pergaminos), 'tribunal' (estrado, togas)
//     o 'cena' (una mesa con velas, de noche, para tres); paredes con molduras y ventanas altas.
// Devuelve { suelo, pies, balcon?, mastil?, mesa? }.
export function colonial(R, t, o = {}) {
  provisional(R, t, C.ladrillo, C.caliza);
  return { suelo: 150, pies: [40, 260] };
}

// ── C2 · La guerra de 1776 (sin violencia en la imagen) ──────────────────────────────────────────────────────────────
// o.encuadre:
//   'flota': el puerto en el verano de 1776 lleno de velas británicas (cientos, en tres términos, hasta el horizonte),
//     visto desde una colina de Manhattan con hierba y una cerca; humo de cocinas, gaviotas.
//   'campamento': Brooklyn junto al río Este: tiendas de lona del ejército continental, hogueras, carros, la tienda de
//     Washington con su banderín; el río detrás con Manhattan al otro lado. o.vacio (0–1): el campamento queda vacío
//     (hogueras humeando, una cacerola olvidada, huellas); o.niebla (0–1).
//   'rio': el río Este de noche: agua oscura con reflejos de luna, la orilla de Brooklyn y la de Manhattan con luces, el
//     carril de las barcas de remos (las pone la escena con T.barcaRemos); o.niebla (0–1) y o.luz ('noche' o 'alba').
//   'altos': los altos de Harlem: una loma con rocas y árboles otoñales, el río Hudson abajo con barcos británicos lejanos.
// Devuelve { suelo, pies, rio: [y0, y1], ... }.
export function guerra1776(R, t, o = {}) {
  provisional(R, t, C.bahiaS, C.bosqueS);
  return { suelo: 150, pies: [40, 260], rio: [100, 170] };
}
// Una barca de remos de 1776 con o.n soldados pequeños (6–10 px) que reman en silencio, con faroles tapados; o.dir; la
// estela en el agua. La escena pone delante a los personajes chibi si hace falta. (x, y): la línea del agua.
export function barcaRemos(R, x, y, t, o = {}) {
  R.rect(x - 16, y - 3, x + 16, y, hex('#5a3a24'));
  return { x, y };
}

// ── D · El puerto y el canal, 1811–1860 ──────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'planos': la mesa de los comisionados de 1811: el plano grande de la isla (colinas, arroyos y granjas dibujados a
//     tinta), compases, reglas, tintero, velas; con o.cuadricula (0–1) se va trazando la cuadrícula de calles rectas sobre
//     el dibujo (avenidas y calles, de sur a norte). o.casas (0–1): las manzanas se llenan de casitas que encajan.
//   'canal': el canal del Erie: el agua quieta entre orillas, una esclusa de piedra con sus compuertas de madera, el camino
//     de sirga con mulas que tiran de una barcaza cargada de trigo, sauces, una granja; o.esclusa (0–1) llena la cámara.
//   'boda': la bahía de Nueva York el 4 de noviembre de 1825: barcos engalanados con banderas, humo de saludos, la
//     multitud en el muelle; un barco grande en primer plano con su cubierta (sitio para el gobernador y el barril).
//   'muelles': los muelles de South Street: veleros de tres palos con los bauprés sobre la calle, almacenes de ladrillo,
//     barriles, sacos, grúas de madera, carros de caballos, estibadores pequeños.
//   'brownstones': una calle de brownstones (piedra rojiza, escalinatas con barandillas de hierro, cornisas, ventanas
//     altas), farolas de gas, árboles jóvenes, un coche de caballos; al fondo, el humo de una locomotora (o.tren 0–1 la
//     hace cruzar por un puente al fondo).
//   'parque': Central Park: con o.obra (0–1) de la obra (tierra removida, carretillas, rocas, un lago a medio cavar,
//     arbolitos plantados) al parque terminado (lago con barcas, puente de piedra, árboles grandes, paseantes).
// Devuelve { suelo, pies, mesa?, barril?, ... }.
export function puerto(R, t, o = {}) {
  provisional(R, t, C.bahia, C.brown);
  return { suelo: 150, pies: [40, 260] };
}

// ── E · Los que llegaron, 1840–1898 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cubierta': la cubierta de un barco de emigrantes (un vapor con velas) que entra en el puerto: barandilla, baúles y
//     maletas, chimenea con humo; delante, la bahía y, con o.estatua (0–1), la Estatua de la Libertad que aparece por la
//     proa (cobre verde, la antorcha); con o.ciudad, la punta de Manhattan al fondo.
//   'ellis': la gran sala de registro de Ellis Island: bóveda de azulejos, ventanas en arco, banderas, barandillas de
//     hierro que hacen filas, bancos, mesas de los funcionarios con libros; mucha gente pequeña de fondo con bultos.
//   'puente': el puente de Brooklyn desde la pasarela: las torres de granito con sus arcos góticos, los cables en abanico,
//     el río Este abajo con barcos y Manhattan al fondo; con o.inauguracion, banderas y gente en la calzada; sitio para un
//     carruaje abierto con caballo (T.carruaje) que cruza; o.ventana: el inserto de la ventana de una casa de Brooklyn
//     Heights desde la que se ve el puente (para Washington Roebling con su catalejo).
// Devuelve { suelo, pies, calzada?, ... }.
export function llegada(R, t, o = {}) {
  provisional(R, t, C.cobre, C.caliza);
  return { suelo: 150, pies: [40, 260] };
}
// Un carruaje abierto con un caballo (1883) que trota; la escena pone a Emily Roebling sentada (devuelve el asiento).
export function carruaje(R, x, y, t, o = {}) {
  R.rect(x - 14, y - 10, x + 14, y, hex('#2a2430'));
  return { x, y, asiento: [x, y - 8] };
}

// ── F · La feria y la obra, 1854–1916 ────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'palacio': el interior del Palacio de Cristal de 1854 (estructura de hierro y cristal, cúpula, banderas, máquinas y
//     expositores, público de fondo); en el centro, la torre del ascensor de Otis con la plataforma alta y la cuerda; o.cuerda
//     (0–1: entera, cortada) y o.plataforma (altura 0–1); devuelve la plataforma para poner a Otis encima.
//   'obra': una obra de 1900 con el esqueleto de acero que crece (o.pisos 0–1), grúas de vigas, remaches al rojo, chispas,
//     obreros pequeños en las vigas, la calle con tranvías y coches de caballos.
//   'flatiron': el cruce de Broadway y la Quinta Avenida con el Flatiron (triangular, de piedra caliza clara con su
//     ornamento) en el centro, tranvías, gente, el escaparate de una tienda al lado (para la plancha del gag).
//   'calle1915': una calle de Downtown con una torre enorme y recta que tapa el sol; o.ley (0–1): la calle pasa de la
//     sombra a la luz cuando aparecen edificios en escalones; gente pequeña con abrigo o en mangas de camisa.
//   'pasteleria': el escaparate de una pastelería con una tarta de boda de pisos, pasteles y luz cálida, y en el reflejo
//     o al otro lado de la calle, el rascacielos en escalones con la misma silueta.
// Devuelve { suelo, pies, ... }.
export function alturas(R, t, o = {}) {
  provisional(R, t, C.caliza, C.acero);
  return { suelo: 150, pies: [40, 260] };
}

// ── G · La carrera al cielo, 1929–1931 ───────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'carrera': el perfil de Manhattan de 1929 con dos torres que crecen a la vez (el Chrysler con su cúpula de arcos y el
//     rival de Wall Street con su pirámide), con o.alturas [a, b] (0–1); grúas en lo alto, cielo de otoño.
//   'cupula': el interior de la cúpula del Chrysler: vigas de acero, la aguja montada por piezas en el hueco, obreros
//     pequeños con remaches, luz por las ventanas triangulares.
//   'aguja': la cúpula del Chrysler por fuera (acero inoxidable con los arcos y las ventanas triangulares) y, con o.aguja
//     (0–1), la aguja que sube como un periscopio; a un lado, en otro plano, la azotea del rival con un obrero (la escena
//     pone al obrero del bocadillo).
//   'empire': el Empire State en obra con o.pisos (0–1), obreros sentados en las vigas, grúas, banderas en la inauguración
//     con o.inauguracion; el Chrysler al lado, más bajo.
//   'oficinas': una planta vacía del Empire State: escritorios sin nadie, polvo, eco, ventanas con la ciudad abajo; sitio
//     para un oficinista solo.
// Devuelve { suelo, pies, ... }.
export function cielo1930(R, t, o = {}) {
  provisional(R, t, C.deco, C.cristal);
  return { suelo: 150, pies: [40, 260] };
}

// ── H · La ciudad de hoy ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'muelle': un muelle de hoy con barandilla, bancos y farolas, el río y el perfil de Manhattan detrás, un ferry que pasa;
//     o.luz ('dia', 'tarde', 'anochecer': las ventanas se encienden).
//   'onu': la orilla del río Este con la sede de las Naciones Unidas (la torre de cristal alta y estrecha, la fila de
//     banderas sin escudos legibles), el río con barcos.
//   'capas': una calle de hoy en la que conviven todas las épocas: un tejado en escalera, una casa federal, brownstones,
//     un rascacielos en escalones y una torre de cristal; gente de hoy, taxis amarillos, carritos de comida, vapor de la
//     alcantarilla.
//   'puente': el puente Verrazzano sobre el estrecho (torres altas, cables, la calzada con coches), el agua de la bahía y
//     un barco grande que entra por debajo; o.luz (también atardecer); o.fantasma (0–1): la bahía de 1524 superpuesta
//     (bosque, canoas, el bote de Verrazzano).
// Devuelve { suelo, pies, ... }.
export function hoy(R, t, o = {}) {
  provisional(R, t, C.cristal, C.acero);
  return { suelo: 150, pies: [40, 260] };
}

// ── El mapa de papel ─────────────────────────────────────────────────────────────────────────────────────────────────
// Un mapa antiguo grabado sobre la mesa de madera, como el del 13 (fa-comun.js mapa). o.vista:
//   'atlantico': el Atlántico de Francia (Dieppe) a la costa de América, con la ruta de La Dauphine en línea de puntos que
//     avanza con o.u (0–1), una flecha que apunta a «China» al oeste y se queda en el aire (sin letras: un pictograma).
//   'noreste': el Hudson y el canal del Erie de Albany a Buffalo y los Grandes Lagos; con o.canal (0–1) se dibuja el canal.
//   'bahia': la bahía de Nueva York con Manhattan, Brooklyn, Staten Island y el estrecho, dibujada a mano como un plano
//     antiguo (bosques, colinas); con o.isla la isla como una llave.
//   'distritos': los cinco distritos como piezas de puzle que se juntan (o.u 0–1).
//   'mundo': el mundo con Londres y Nueva York (o.globo), o con la torre de la ONU y sus copias por el mundo (o.copias).
// Devuelve la proyección P([lon, lat]) → [x, y] para las chinchetas.
export function mapaNY(R, t, o = {}) {
  provisional(R, t, hex('#e6d8b6'), hex('#b8a684'));
  return (p) => [160, 90];
}
