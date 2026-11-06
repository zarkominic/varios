// Fontanería y decorados del episodio 23 (Las tradiciones del año: de dónde vienen de verdad) en el estilo canónico pixel
// chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Año Nuevo (la Puerta del Sol, una casa burguesa de
// Madrid de 1890, un viñedo de Alicante, un salón de 1962, el despacho de un recaudador inglés de 1752, un templo de
// Babilonia), B el amor (una iglesia romana del siglo III, el gabinete de Chaucer, una celda de la Torre de Londres, una
// oficina de correos victoriana, el taller de Esther Howland), C primavera y otoño (una cocina rural con gallinero, un
// jardín alemán de 1682, una granja de Pensilvania, una aldea irlandesa, una calle de Canadá en 1927, una calle de EE. UU.
// en los cincuenta), D las celebraciones (un salón alemán de 1746, un kínder de 1893, un juzgado de 2015, la capilla real
// de 1840, una iglesia de París en 1558, el taller de un joyero) y E hoy (el salón de Atom, la medianoche).
// Los personajes son los de ELENCO_TR y PIEZAS_TR (pixel-chibi.js): dibujados por nosotros, sin logos ni letras.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, bancos, el
// estrado) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: respeto a las religiones; nada morboso (la cachetada al rey, de teatro; el diablo de Jack, de cuento).
//
//   import * as T from '/atomo/plato/escenas/tr-comun.js';
//   const { E, R, M } = await T.preparar('tr-gancho');
//   T.rodar(E, R, [[0, (t) => T.anuevo(R, t, { encuadre: 'sol' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_TR: la uva con ojos, el pastel, la liebre, el nabo…), las crea el reparto
export const PIEZAS_TR = KIT.PIEZAS_TR || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // noche de fiesta: azul noche, dorado de las luces, morado de Nochevieja
    noche: '#141a3a', nieve: '#eef4fa', nieveS: '#b8c8dc', oroN: '#f0c040', oroNS: '#a87a18', moradoN: '#5a2a7a', vela: '#ffe08a',
    // la uva con ojos
    uva: '#6a2a7a', uvaS: '#3e1450', uvaB: '#b07ac8', uvaV: '#7ab83a',
    // el amor: rojo, rosa, encaje
    rojoA: '#b8202a', rosa: '#f0a0b8', encaje: '#f6f0e4',
    // la primavera y el otoño: hierba, cáscara de huevo, calabaza, nabo
    hierba: '#5a9a3a', calabaza: '#e07a20', nabo: '#e8e0c8', naboS: '#9a6a8a',
    // piedra, madera y yeso de las épocas
    piedra: '#7a7680', piedraS: '#4a4652', madera: '#7a4a2a', maderaS: '#4a2a18', yeso: '#e4d8bc',
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
  const E = await escena(id, 'ep23');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1415 (el preso de Azincourt), 1682 (la liebre), 1840 (el penique y el vestido), 1893 (la canción), 2026
  Object.assign(R.ICONOS, {
    corazon: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...', '.......'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
    uva: ['...#...', '..#....', '.##.##.', '#######', '.##.##.', '..###..', '...#...'],
  });
  R.tramosTiempo([[1415, 1700, R.PALA.ORO, 'corazon'], [1700, 1900, R.PALA.ROJO, 'vela'], [1900, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'uva']]);
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



// ── A · Año Nuevo ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'sol': la Puerta del Sol de Madrid en la última noche del año: la Casa de Correos con su torre y el reloj grande (la bola que baja), los edificios de alrededor con balcones, farolas, la multitud con gorros de fiesta y racimos, confeti, el cielo de noche con estrellas; o.bola 0–1 (baja la bola), o.campanada 0–12 (destellos en cada una). Cámara 'reloj': la torre del reloj de cerca con la esfera y la bola.
//   'casa1890': el salón de una casa burguesa de Madrid en 1890: papel pintado, cortinas de terciopelo, lámpara de gas, mesa con mantel, champán y un frutero con uvas, balcón a la calle; cámara 'calle': la calle de abajo de noche con farolas de gas y unos madrileños con gorra que miran (y se burlan).
//   'vinedo': un viñedo de Alicante en 1909 en la vendimia tardía: cepas en hileras con racimos, tierra roja, masía blanca, montañas secas, cielo de otoño; cámara 'cajas': cajas de madera llenas de uvas que sobran en el almacén con una báscula.
//   'tele62': un salón de 1962: tele de tubo en blanco y negro sobre un mueble, sofá, lámpara de pie, papel pintado de época, mesa con un plato de uvas; o.pantalla(R,t,rect) para pintar dentro. Cámara 'pantalla': la tele de cerca.
//   'despacho': el despacho de un recaudador inglés en 1752: escritorio con libros de cuentas, pluma y tintero, estantes con legajos, ventana emplomada a una calle de Londres, calendario de pared con meses; cámara 'libro': el libro de cuentas abierto de cerca (sin letras: columnas y cifras).
//   'babilonia': un templo de Babilonia en la fiesta de Año Nuevo: ladrillo vidriado azul con relieves de leones y dragones (sin escritura legible), el zigurat al fondo, braseros, palmeras, cielo de amanecer; cámara 'altar': el altar con el trono y las insignias del rey.
// Delante: anuevoDelante (la mesa del salón, las cajas, el escritorio, el altar). Devuelve { suelo, … } con la geometría de cada encuadre.
export function anuevo(R, t, o = {}) {
  const enc = o.encuadre ?? 'sol';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en año nuevo (se llama después de los actores, con las mismas opciones)
export function anuevoDelante(R, t, o = {}) {}

// ── B · El amor ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'iglesia': una pequeña iglesia romana del siglo III, con respeto: ábside con pinturas sencillas (sin rostros detallados), lámparas de aceite, columnas; cámara 'vitral': un vitral o fresco con dos santos de túnica, sencillo.
//   'chaucer': el gabinete de un poeta inglés del siglo XIV: escritorio de madera, rollos y códices, vela, ventana gótica abierta a un jardín con una rama donde se posan pájaros por parejas; cámara 'ventana': la ventana de cerca con la rama y los pájaros.
//   'torre': una celda de la Torre de Londres en el siglo XV: muros de piedra gruesos, ventana con barrotes y el Támesis al fondo, una mesa con vela y papel, un camastro, rayas en la pared; cámara 'mesa': la mesa de cerca con la carta y la vela.
//   'correos': una oficina de correos victoriana de 1840: mostrador de madera, casilleros, básculas, sacas, una ventana a la calle con nieve y coches de caballos; cámara 'mostrador': el mostrador de cerca con sellos y tarjetas.
//   'taller': el taller de Esther Howland en Worcester, Massachusetts, hacia 1848: mesas largas con encaje de papel, tijeras, cola, flores de papel, ventanas con luz de invierno; cámara 'mesa': la mesa de trabajo de cerca con una tarjeta a medio hacer.
// Delante: amorDelante (el escritorio, la mesa de la celda, el mostrador, la mesa del taller). Devuelve { suelo, … } con la geometría de cada encuadre.
export function amor(R, t, o = {}) {
  const enc = o.encuadre ?? 'iglesia';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en el amor (se llama después de los actores, con las mismas opciones)
export function amorDelante(R, t, o = {}) {}

// ── C · Primavera y otoño ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'gallinero': una cocina rural de primavera con la puerta abierta al gallinero: fogón, ollas, una mesa con cestas de huevos, gallinas que entran y salen, una iglesia con campanario al fondo por la ventana; cámara 'cestas': la mesa de cerca con huevos pintándose.
//   'jardin': un jardín alemán de 1682 en primavera: setos, arbustos en flor, un pozo, una casa de entramado, niños con ropa de la época; cámara 'arbustos': los arbustos de cerca con huevos de colores escondidos.
//   'pensilvania': una granja de Pensilvania en el siglo XVIII: granero rojo de piedra y madera, cercas, campos, un camino; cámara 'porche': el porche con un nido hecho con un gorro.
//   'aldea': una aldea irlandesa en otoño: casas encaladas con tejado de paja, muros de piedra seca, colinas verdes, niebla, una iglesia con velas por Todos los Santos y una hoguera de fiesta en la colina; o.noche 0–1. Cámara 'hoguera': la hoguera de cerca con gente bailando.
//   'calle1927': una calle de un pueblo de Canadá en 1927 con la primera nieve: casas de madera con porche, farolas, hojas secas, una imprenta pequeña; cámara 'puerta': una puerta con calabaza tallada y niños disfrazados.
//   'calle50': una calle de las afueras de EE. UU. en los años cincuenta: casas con jardín, calabazas en los porches, coches de época, árboles de otoño; cámara 'porche': un porche de cerca con un tazón de dulces.
// Delante: estacionesDelante (la mesa de la cocina, la cerca, el muro de piedra, el porche). Devuelve { suelo, … } con la geometría de cada encuadre.
export function estaciones(R, t, o = {}) {
  const enc = o.encuadre ?? 'gallinero';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en primavera y otoño (se llama después de los actores, con las mismas opciones)
export function estacionesDelante(R, t, o = {}) {}

// ── D · Las celebraciones ───────────────────────────────────────────────────────────────────────────────────
// Seis decorados, cada uno con dos cámaras (o.camara: 'general' por omisión o la segunda). Lo fijo de cada encuadre va en
// un búfer de R.nuevo() (se pinta una vez); lo de delante (mesas, estrado, banco) en otro búfer transparente que se pega
// encima; la vida (llamas, cielos, gente pequeña, reflejos) se pinta en cada fotograma. fiestas() pinta TODO el encuadre
// (también lo de delante, para que el plano quede completo sin más); fiestasDelante() vuelve a pintar lo de delante:
// se llama DESPUÉS de los actores que están detrás de la mesa (los que van por delante se pintan después de ella).
// Ninguno dibuja a los protagonistas; sí gente pequeña de fondo (niños, invitados, la corte, paseantes).
//   'salon1746': un salón rococó alemán de 1746 en una tarde de invierno: boiserie verde agua con molduras doradas, la
//     chimenea de mármol con el fuego, el espejo dorado (por el que cruza un criado con una bandeja), dos ventanas altas
//     con cortinas de damasco (nieve que cae, árboles pelados, nubes del atardecer), el reloj de caja alta con su péndulo,
//     un paisaje y un retrato, girándulas con velas, parqué de espiga, la alfombra, una butaca y un perrito que duerme
//     junto al fuego. Delante: la mesa con mantel de encaje y el pastel con velas, candeleros, copas y platos.
//     Cámara 'pastel': el pastel de cerca sobre el mantel, con el salón desenfocado detrás (el fuego, la ventana, las
//     velas como manchas de luz). o.velas: cuántas velas (por omisión 12 en 'general' y 24 en 'pastel'; hasta ~50, en dos
//     coronas, para el pastel de Goethe); o.encendidas: cuántas siguen encendidas (por omisión todas; las apagadas echan
//     un hilo de humo); o.centro (true): la vela gorda del centro, la «luz de la vida».
//   'kinder': el kínder de Louisville en 1893 por la mañana: la pizarra con dibujos de tiza (sol, casa, flor, pájaro, 1 2 3),
//     el piano vertical con el metrónomo, la estufa de hierro, dos ventanas de guillotina (árboles de primavera, nubes,
//     pájaros, un coche de caballos que pasa), el canario en su jaula, macetas y la pecera, el caballito de madera que se
//     mece, los bloques de Froebel, el círculo pintado en el suelo y doce niños pequeños en dos mesas bajas que cantan
//     (o.canta, por omisión true; o.ninos false los quita). Delante: las dos mesas bajas.
//     Cámara 'piano': el piano de cerca (teclas que se hunden si o.toca, partitura de pentagramas, candeleros, metrónomo,
//     jarrón y retratos encima) con la ventana a la derecha y las notas que suben si o.notas.
//   'juzgado': la sala de un tribunal federal de 2015 en Los Ángeles: paneles de arce, el sello con la balanza, la bandera
//     de EE. UU., el estrado elevado con el sillón alto, el monitor de pruebas (o.pantalla(R, t, [x0, y0, x1, y1]) para
//     pintar dentro; por omisión pentagrama, pastel y monedas), la taquígrafa, el secretario, ventanas altas con palmeras y
//     la puerta con gente que pasa por el pasillo; los abogados en sus mesas. Delante: el frente del estrado, las dos mesas
//     y la barandilla. Cámara 'estrado': la mesa del juez de cerca con el taco y el mazo (o.mazo, por omisión true: el mazo
//     descansa en el taco; false si el juez lo tiene en la mano), carpetas, micrófono y vaso.
//   'capilla': la capilla real de St James's en 1840, el día de la boda: el techo artesonado azul y oro, el ventanal de
//     vidrieras que brilla, el altar con velas y flores blancas, el órgano dorado, la tribuna, los bancos llenos de
//     invitados (uniformes rojos, plumas, tocados) y la alfombra roja con pétalos hacia el altar. Delante: los extremos de
//     los bancos de primera fila con sus ramos. Cámara 'altar': el altar de cerca (frontal bordado, la gran bandeja de oro,
//     los candeleros, las flores de azahar, el ventanal) con el reclinatorio de terciopelo delante.
//   'paris1558': Notre Dame de París por dentro en 1558: la nave con sus pilares en haz y arcos apuntados, el triforio, el
//     rosetón que brilla, los rayos de luz con polvo, la corte vestida de blanco (el luto real) a lo lejos, un monaguillo
//     con el incensario, una paloma bajo las bóvedas y el tablado de la boda con su dosel azul a la derecha. Delante: los
//     dos pilares de primer término y las cabezas del público. Cámara 'nave': el tablado de cerca, con el dosel de flecos,
//     los cirios, el coro tallado detrás y los reclinatorios.
//   'joyero': el taller de un joyero: el banco de joyero con la piel recogedora, la lámpara articulada, el motor colgado,
//     el soplete con su llama azul, estantes con cajitas, la vitrina con anillos que destellan, la ventana a la calle (gente
//     que pasa) y la lámina anatómica de una mano en la pared. Delante: el banco. Cámara 'lamina': la lámina de cerca (un
//     brazo con la mano y el corazón; las venas de los cinco dedos). o.vena 0–1: un pulso de luz recorre la vena del anular
//     hasta el corazón (en 1 el corazón brilla); o.todas 0–1: se encienden las venas de los cinco dedos; o.anillo (true):
//     el anillo dorado en el anular.
// Devuelve { suelo, … } con la geometría del encuadre (pies de los personajes, mesa, objetos): ver d_GEO.
export function fiestas(R, t, o = {}) {
  const enc = d_ENC[o.encuadre] ? o.encuadre : 'salon1746', cam = o.camara ?? 'general', E = d_ENC[enc];
  E.fondo(R, t, o, cam); R.recorte(null);
  E.delante(R, t, o, cam); R.recorte(null);
  return d_GEO[enc][cam === 'general' ? 'general' : 'cerca'];
}
// lo que va delante de los personajes en las celebraciones (se llama después de los actores, con las mismas opciones):
// la mesa del pastel, las mesitas del kínder, el estrado y las mesas del juzgado, los bancos de la capilla, los pilares y
// el público de Notre Dame y el banco del joyero
export function fiestasDelante(R, t, o = {}) {
  const enc = d_ENC[o.encuadre] ? o.encuadre : 'salon1746', cam = o.camara ?? 'general';
  d_ENC[enc].delante(R, t, o, cam); R.recorte(null);
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────────────────────
// El salón de Atom (el mismo del 22: papel pintado verde de rayas y rombos, zócalo de cuarterones de nogal, suelo de
// tablas) en la última noche del año. Dos encuadres, cada uno con dos cámaras del mismo detalle:
//   'salon' (general): la pared del calendario. Techo con cornisa tranquila (la barra del año); el abeto todavía puesto a
//     la izquierda (luces que parpadean, bolas, espumillón, la estrella que brilla, agujas caídas, un regalo que queda y
//     papel de regalo arrugado); el calendario gigante de pared en el centro (x 90–166, y 22–96: la estampa del mes, la
//     cabecera roja con el número del mes, la cuadrícula con los días tachados y el de hoy rodeado; la esquina se levanta);
//     la lámpara de pie con su luz cálida; la ventana con cortinas (cristal x 196–258, y 24–86) y la ciudad de noche con
//     fuegos artificiales lejanos (cohetes que suben, palmeras, peonías y sauces dorados, humo; ventanas que se encienden,
//     la luz roja de la antena), todo recortado al hueco, y su destello que se refleja en el alféizar y el suelo; el
//     aparador de la derecha con la radio y el jarrón, el reloj de pared encima (por debajo de la esquina de Atom), y el
//     gato que duerme en la alfombra junto al árbol (respira, mueve la cola y levanta la oreja con cada estallido).
//     o.mes (1–12, por omisión 12), o.dia (el día rodeado; por omisión el último del mes), o.hoja 0–1 (la hoja de encima
//     se levanta y pasa), o.pasa (hojas por segundo: el calendario las pasa solo) y o.salta (meses que se salta, p. ej.
//     [12]); o.hora (la hora del reloj al empezar, en horas: por omisión 22,75). Delante (hoyDelante): el respaldo del sofá
//     con la manta y la mesita baja con el racimo, las dos copas de las doce uvas, dos copas de cava con burbujas, la
//     botella, un gorro de fiesta y un matasuegras; la taza de chocolate humea.
//   'salon', cámara 'calendario': el calendario gigante de cerca (x 96–212, y 22–128), con los números de los días; a su
//     pie, el taburete de madera (sube el personaje para pasar la hoja); a la izquierda, dos estampas enmarcadas (A arriba,
//     B abajo) y a la derecha la tercera (C), que se iluminan con o.estampas = [a, b, c] (0–1 cada una; apagadas, en
//     penumbra): A el rey con su corona que llora con la mano de la cachetada en el aire (de teatro), B la carta con el
//     corazón tras los barrotes, C el pastel con velas junto a la montaña de monedas; el borde del abeto a la derecha con
//     sus luces. Las mismas o.mes, o.dia, o.hoja, o.pasa y o.salta. Delante: la planta en su maceta, abajo a la izquierda.
//   'medianoche' (general): la otra pared, a medianoche y con las luces bajas: la ventana grande de tres hojas (cristal
//     x 79–201, y 23–93) con la ciudad y los fuegos artificiales grandes, cuyo destello tiñe el suelo; el reloj de caja
//     alta a la derecha (esfera en 250, 56) que marca casi las doce (o.hora; por omisión 23 h 59 min 50 s: el segundero
//     llega a las doce a los 10 s) con el péndulo que oscila; serpentinas que cuelgan de la cornisa y se mecen; globos que
//     cabecean; el abeto a la izquierda con sus luces; confeti que cae (o.confeti 0–1, por omisión 1) y confeti ya en el
//     suelo. Delante: la mesa de fiesta (mantel con flecos, racimo, copas de uvas y de cava, la cubitera con la botella,
//     gorros, velas) y el confeti que cae por delante.
//   'medianoche', cámara 'mesa': la mesa de cerca. Fondo en penumbra: la esfera del reloj de caja alta a la izquierda (en
//     54, 52), la ventana a la derecha (cristal x 155–261, y 21–105) con fuegos grandes, serpentinas y dos globos. En
//     hoyDelante, el tablero (de y 130 a 158) y el mantel: el racimo grande en su plato (la uva con ojos la pone la escena
//     en .uva), las dos copas con las doce uvas, las copas de cava con burbujas, la botella con su papel dorado, la vela,
//     un gorro, el matasuegras que se estira y el confeti. Las mismas o.hora y o.confeti.
// Devuelve { suelo, … } con la geometría de cada encuadre. Llama a hoyDelante después de los actores.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'medianoche') return cam === 'mesa' ? e_mesaCerca(R, t, o) : e_medianoche(R, t, o);
  return cam === 'calendario' ? e_calCerca(R, t, o) : e_salon(R, t, o);
}
// lo que va delante de los personajes en hoy (se llama después de los actores, con las mismas opciones): el sofá y la
// mesita ('salon'), la planta ('calendario'), la mesa de fiesta y el confeti ('medianoche'), la mesa de cerca ('mesa')
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'medianoche') return cam === 'mesa' ? e_mesaCercaDelante(R, t, o) : e_fiestaDelante(R, t, o);
  return cam === 'calendario' ? e_plantaDelante(R, t, o) : e_sofaMesita(R, t, o);
}
// la uva con ojos, el gag del episodio (PIEZAS_TR.uva)
export function uva(R, x, y, t, o = {}) { if (PIEZAS_TR.uva) PIEZAS_TR.uva(R, x, y, { t, ...o }); }

// la geometría de cada encuadre para las escenas (ver la cabecera de fiestas): suelo = línea de los pies por omisión
const d_GEO = {
  salon1746: {
    general: { suelo: 160, detrasMesa: { suelo: 150, x: [126, 194] }, mesa: { x0: 112, x1: 208, tapa: 140 }, pastel: [160, 141], libre: [[16, 104], [216, 300]], chimenea: [118, 202, 70], espejo: [128, 18, 192, 64], ventanas: [[10, 20, 46, 106], [240, 20, 274, 106]] },
    cerca: { suelo: 128, detrasMesa: { suelo: 128, x: [56, 264] }, mesa: { tapa: 118 }, sobreMesa: 160, pastel: [160, 150], velasY: 80 },
  },
  kinder: {
    general: { suelo: 150, piano: [14, 62, 124], banqueta: [44, 134], pizarra: [72, 30, 170, 80], circulo: [150, 146, 66, 11], mesas: [[14, 104, 162], [206, 300, 162]], ventanas: [[202, 24, 236, 92], [244, 24, 276, 92]], libre: [[96, 210]] },
    cerca: { suelo: 174, teclado: [56, 236, 146], atril: [96, 100, 196, 138], libre: [[40, 270]] },
  },
  juzgado: {
    general: { suelo: 150, juez: [160, 82], estrado: [104, 216, 72], testigo: [86, 104], mesas: [[24, 116, 142], [204, 296, 142]], pantalla: [14, 22, 62, 56], puerta: [262, 50, 290, 112], libre: [[120, 200]] },
    cerca: { suelo: 130, juez: [150, 127], tapa: 122, taco: [222, 124], mazo: [222, 118] },
  },
  capilla: {
    general: { suelo: 150, pasillo: [[150, 170, 114], [118, 202, 180]], altar: [128, 192, 112], novios: [[150, 150], [172, 150]], escala: 'pies de 118 (altar) a 172 (delante)' },
    cerca: { suelo: 160, altar: [70, 250, 128], ventanal: [118, 18, 202, 66], libre: [[90, 230]] },
  },
  paris1558: {
    general: { suelo: 126, tablado: [128, 296, 126], naveSuelo: 168, libre: [[30, 112]], roseton: [70, 46, 26] },
    cerca: { suelo: 142, tablado: [40, 280, 142], dosel: [86, 22, 234, 58], libre: [[70, 250]] },
  },
  joyero: {
    general: { suelo: 166, joyero: [134, 138], banco: [58, 204, 132], lamina: [204, 20, 250, 82], vitrina: [252, 64, 314, 152], ventana: [118, 22, 190, 84], libre: [[16, 54], [210, 248]] },
    cerca: { suelo: 159, banco: 150, lamina: [56, 14, 264, 140], corazon: [250, 54], anular: [72, 74], libre: [[16, 50], [262, 300]] },
  },
};

const d_C = pal({
  mecha: '#2a2018', llamaA: '#ff8a30', humo: '#c8c4c0', humoS: '#8a8680', brasa: '#e04a20',
  // el salón de 1746
  boi: '#a9c2b0', boiL: '#c4d8c6', boiS: '#8ea896', boiD: '#6a8676', estuco: '#efe6d2', estucoS: '#d6cab0',
  parq: '#a06a38', parqL: '#bc8448', parqS: '#84542a', parqD: '#5e3818',
  marmol: '#ebe3d6', marmolS: '#c8bcaa', marmolV: '#a8988a', terc: '#8a2234', tercL: '#b0384a', tercS: '#5e1424',
  mantel: '#f6f2e8', mantelS: '#dcd4c4', mantelD: '#b8ae9a', plata: '#d4d8e0', plataS: '#8a909c', espejo: '#8eaab8', espejoL: '#bcd4dc', espejoS: '#6a8494',
  glaseado: '#fbf6ec', glaseadoS: '#e0d2bc', glaseadoD: '#bca88a', rosaA: '#e8889a', rosaS: '#b85a6e', cera: '#f4ecd6', ceraS: '#d0c2a2',
  alfombra: '#8a2a2a', alfombraS: '#6a1e22', alfombraA: '#2a3a6a', alfombraO: '#c89a48',
  // el kínder de 1893
  yesoK: '#e8d8b2', yesoKS: '#d2c098', yesoKL: '#f4e8cc', friso: '#8e5c34', frisoL: '#a8723e', frisoS: '#6a4020', pizarra: '#2c3a34', pizarraL: '#3a4a42', tiza: '#e8ece4', tizaS: '#a0aca4',
  tablaK: '#b88450', tablaKL: '#cc9a62', tablaKS: '#94643a', piano: '#3e2216', pianoL: '#64382a', pianoS: '#24120c', marfil: '#f4ecd8', marfilS: '#cfc4aa', hierro: '#2e2c32', hierroL: '#4e4a54',
  // el juzgado de 2015
  arce: '#d2a66c', arceL: '#e6c08a', arceS: '#b08654', arceD: '#8e6a40', moqJ: '#36486a', moqJL: '#44587e', moqJS: '#2a3854', paredJ: '#e6dfd0', paredJS: '#d2c9b6', cueroJ: '#2e2e3a', cueroJL: '#4a4a58',
  // la capilla de 1840
  roble: '#6a4426', robleL: '#87592f', robleS: '#4a2c18', techoA: '#2c3c6a', techoB: '#b89848', techoR: '#8a2a2a', techoW: '#d8d0bc', alfR: '#a8202a', alfRL: '#c83a40', alfRS: '#78141c', tercC: '#7a1424', tercCL: '#9a2a38',
  flor: '#fbfaf4', florS: '#d8dccc', hoja: '#4a7a3a', hojaS: '#2e5428',
  // París, 1558
  pied: '#9a948a', piedL: '#b8b2a4', piedS: '#78726a', piedD: '#58544e', azulF: '#2a3a8a', azulFL: '#4a5ab0', azulFS: '#1a2460',
  // el taller del joyero
  papT: '#4e5e4c', papTL: '#5e6e5a', papTS: '#3e4c3c', banco: '#8a5a32', bancoL: '#a8744a', bancoS: '#64401e', lam: '#efe2c0', lamS: '#d8c69a', lamD: '#b8a272', tinta: '#5a3a22', vena: '#3a5aa8', venaL: '#7aa0f0', arteria: '#b83a3a',
});

const d_PIEL = hex('#f6c290'), d_PIELS = hex('#d48a5a');

const d_VACIO = 0x01020304;

// las capas fijas de cada encuadre: se pintan una vez en un búfer de R.nuevo() (las de delante, transparentes)
const d_capas = new Map();

function d_capa(R, clave, dibuja, transparente = false) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); if (transparente) b.fill(d_VACIO); const prev = R.usar(b); dibuja(); R.recorte(null); R.usar(prev); d_capas.set(clave, b); }
  return b;
}

// pega una capa transparente sobre la pantalla, solo en su rectángulo (lo de delante: no borra a los actores)
function d_pegar(R, b, x0, y0, x1, y1) { const B = R.buf; for (let y = y0; y <= y1; y++) for (let i = y * 320 + x0, e = y * 320 + x1; i <= e; i++) { const c = b[i]; if (c !== d_VACIO) B[i] = c; } }

// mezcla dos colores (k 0–1)
const d_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

const d_CALIDA = hex('#ffd890'), d_FRIA = hex('#c8e0ff');

// aclara (o tiñe) un píxel ya pintado
function d_aclara(R, x, y, m, c = d_CALIDA) { if (x < 0 || x > 319 || y < 0 || y > 179 || m <= 0) return; R.pset(x, y, d_mez(R.pget(x, y), c, Math.min(1, m))); }

// el halo de una luz: tiñe un disco con caída suave (m en el centro)
function d_halo(R, cx, cy, r, m, c = d_CALIDA) { for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) { const d = Math.hypot(x - cx, (y - cy) * 1.1) / r; if (d < 1) d_aclara(R, x, y, m * (1 - d) * (1 - d), c); } }

// una textura de ruido: el color base con motas claras y oscuras
function d_textura(R, x0, y0, x1, y1, base, claro, oscuro, k = 0, pc = 0.06, po = 0.12) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, k); R.pset(x, y, n < po ? oscuro : n > 1 - pc ? claro : base); } }

// un cuarterón de madera en relieve (copiado de th-comun.js): bisel con luz arriba a la izquierda, el campo y dos vetas
function d_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// un marco dorado con su luz, su sombra y las cuentas; g = grosor
function d_marco(R, x0, y0, x1, y1, g = 3) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, C.oroS); rect(x0 + 1, y0 + 1, x1 - 2, y1 - 2, C.oroL); rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, C.oro);
  if (g > 2) { for (let x = x0 + 3; x < x1 - 2; x += 3) { pset(x, y0 + 1 + (g >> 1), C.oroS); pset(x, y1 - 1 - (g >> 1), C.oroS); } for (let y = y0 + 3; y < y1 - 2; y += 3) { pset(x0 + 1 + (g >> 1), y, C.oroS); pset(x1 - 1 - (g >> 1), y, C.oroS); } }
  rect(x0 + g, y0 + g, x1 - g, y1 - g, C.k);
}

// una llama de vela de pie en (x, y) = la punta de la mecha: parpadea y se inclina; s 1 (pequeña) o 2 (de cerca)
function d_llama(R, x, y, t, k = 0, s = 1) {
  const f = Math.sin(t * 13 + k * 2.1) + Math.sin(t * 7.3 + k * 0.7), alto = (s > 1 ? 5 : 2) + (f > 0.5 ? 1 : 0) + (f < -1.2 ? -1 : 0), lado = Math.sin(t * 5 + k * 1.3) > 0.55 ? 1 : 0;
  R.pset(x, y, d_C.mecha);
  for (let j = 1; j <= alto; j++) { const xx = x + (j >= alto - 1 && alto > 2 ? lado : 0), c = j === 1 ? (s > 1 ? hex('#5a8ae0') : d_C.llamaA) : j < alto ? C.fuegoL : C.fuego; R.pset(xx, y - j, c);
    if (s > 1 && j > 1 && j < alto - 1) { R.pset(xx - 1, y - j, j === 2 ? d_C.llamaA : C.fuego); R.pset(xx + 1, y - j, j === 2 ? d_C.llamaA : C.fuego); } }
  if (s > 1) R.pset(x, y - 2, hex('#ffffff'));
}

// un hilo de humo que sube de una mecha apagada
function d_humo(R, x, y, t, k = 0, largo = 9) { for (let j = 1; j < largo; j++) { const u = (j + (t * 6 + k * 3) % 3) / largo; if (u > 1) continue; const xx = x + Math.round(Math.sin(t * 2.4 + j * 0.7 + k) * u * 2.2); if (h(j, Math.floor(t * 8), k) < 0.75) R.pset(xx, y - j, u < 0.5 ? d_C.humo : d_C.humoS); } }

// una vela de pie: cuerpo de cera (ancho w), base en (x, y), alto a; encendida (llama) o apagada (humo)
function d_vela(R, x, y, a, t, k, encendida = true, w = 1, cera = d_C.cera, s = 1) {
  const { rect, pset } = R; if (w > 1) { rect(x, y - a, x + w - 1, y, cera); rect(x + w - 1, y - a + 1, x + w - 1, y, d_C.ceraS); pset(x, y - a, C.blanco); if (k % 3 === 0) pset(x + w - 1, y - a + 2, cera); }
  else { rect(x, y - a, x, y, cera); pset(x, y, d_C.ceraS); }
  const mx = x + (w > 2 ? 1 : 0); if (encendida) d_llama(R, mx, y - a - 1, t, k, s); else { pset(mx, y - a - 1, d_C.mecha); d_humo(R, mx, y - a - 1, t, k, s > 1 ? 12 : 6); }
}

// una nube de tres tonos (sombra, cuerpo, luz), con discos (respeta R.recorte)
function d_nube(R, cx, cy, w, [cs, cc, cl]) {
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.12, 0.24], [0.14, -0.08, 0.2]];
  for (const [dx, dy, r] of B) R.disco(cx + dx * w, cy + dy * w + 1, r * w, cs);
  for (const [dx, dy, r] of B) R.disco(cx + dx * w, cy + dy * w, r * w * 0.92, cc);
  for (const [dx, dy, r] of B) R.disco(cx + dx * w - 1, cy + dy * w - 1.5, r * w * 0.6, cl);
}

// los cielos que se ven por las ventanas: degradado tramado, nubes de tres tonos a tres velocidades y pájaros. Deja puesto
// el recorte de la ventana (quien llama pinta lo de fuera y luego R.recorte(null))
const d_CIELOS = {
  invierno: { f: ['#3e3a6a', '#6a5a8a', '#b8848e', '#eab08e'], n: ['#5a4a6e', '#8a6a84', '#c89aa4'], p: '#2a2440' },
  primavera: { f: ['#4a8ad0', '#6aa6e2', '#94c4ee', '#c4e0f6'], n: ['#a4b4d0', '#e0e8f4', '#ffffff'], p: '#2a3040' },
  la: { f: ['#2e6ac8', '#4a8ad8', '#7ab2e8', '#b4d6f0'], n: ['#a8bcd8', '#e4ecf6', '#ffffff'], p: '#2a3040' },
  calle: { f: ['#7a9cc0', '#96b4d2', '#b6cee2', '#d2e2ee'], n: ['#9aaabc', '#d0dae6', '#eef4fa'], p: '#3a4050' },
};

function d_cielo(R, x0, y0, x1, y1, t, tipo, k = 0) {
  const S = d_CIELOS[tipo], F = S.f.map(hex), N = S.n.map(hex), alto = y1 - y0 + 1;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / alto * 3, i = Math.min(2, Math.floor(u)), fr = u - i; for (let x = x0; x <= x1; x++) R.pset(x, y, fr > 0.5 + (((x + y) & 1) ? 0.22 : -0.22) || (fr > 0.82 && ((x + y) & 1)) ? F[i + 1] : F[i]); }
  const W = x1 - x0 + 60;
  for (let c = 0; c < 6; c++) { const v = [1.2, 2.6, 4.4][c % 3], w = [14, 18, 24][c % 3], cx = x0 - 30 + ((h(c, 1, 300 + k) * W + t * v) % W), cy = y0 + 6 + h(c, 2, 300 + k) * alto * 0.55 + (c % 3) * 4; d_nube(R, cx, cy, w, N); }
  const P = hex(S.p); for (let b = 0; b < 2; b++) { const u = ((t + b * 3.1 + k * 1.7) % 11) / 11, bx = Math.round(x0 - 6 + u * (x1 - x0 + 12)), by = Math.round(y0 + 8 + b * 5 + Math.sin(u * 9) * 2), a = Math.sin(t * 10 + b) > 0;
    R.pset(bx, by, P); R.pset(bx - 1, by - (a ? 1 : 0), P); R.pset(bx + 1, by - (a ? 1 : 0), P); R.pset(bx - 2, by - (a ? 1 : -1), P); R.pset(bx + 2, by - (a ? 1 : -1), P); }
}

// copos de nieve que caen en un rectángulo (con el recorte puesto)
function d_nieve(R, x0, y0, x1, y1, t, n = 26) { for (let k = 0; k < n; k++) { const v = 6 + h(k, 1, 310) * 8, y = y0 + ((h(k, 2, 310) * (y1 - y0) + t * v) % (y1 - y0)), x = x0 + ((h(k, 3, 310) * (x1 - x0) + Math.sin(t * 1.3 + k) * 2.5) % (x1 - x0 + 1)); R.pset(x, y, k % 3 ? C.blanco : hex('#d8e4f0')); } }

// un árbol pelado de invierno con nieve en las ramas, que se mece (dentro del recorte)
function d_arbolPelado(R, x, base, alto, t, k = 0) {
  const T = hex('#3a2e3a'), N = hex('#e8eef6'), m = Math.sin(t * 0.9 + k) * 1.2;
  const rama = (x0, y0, ang, l, n) => { const x1 = x0 + Math.cos(ang) * l + m * (1 - y0 / 180) * (n < 2 ? 1 : 0.4), y1 = y0 - Math.sin(ang) * l; R.linea(x0, y0, x1, y1, T); if (n < 3 && l > 3) { rama(x1, y1, ang + 0.5, l * 0.68, n + 1); rama(x1, y1, ang - 0.45, l * 0.62, n + 1); } else R.pset(Math.round(x1), Math.round(y1) - 1, N); };
  R.linea(x, base, x, base - alto * 0.45, T); R.linea(x + 1, base, x + 1, base - alto * 0.4, T); rama(x, base - alto * 0.45, Math.PI / 2 + 0.25, alto * 0.32, 0); rama(x, base - alto * 0.45, Math.PI / 2 - 0.3, alto * 0.3, 0);
}

// un árbol de hojas (primavera o California) que se mece, con copa de tres tonos (dentro del recorte)
function d_arbolHojas(R, x, base, r, t, k = 0, cols = ['#2e6a34', '#4a8a3e', '#7ab24e']) {
  const [s, c, l] = cols.map(hex), m = Math.round(Math.sin(t * 1.1 + k) * 1.4);
  R.linea(x, base, x, base - r, hex('#5a3a24')); R.linea(x + 1, base, x + 1, base - r, hex('#3e2818'));
  const B = [[0, -r * 1.3, r], [-r * 0.7, -r * 0.9, r * 0.7], [r * 0.7, -r * 0.95, r * 0.75], [0, -r * 1.9, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(x + dx + m, base + dy + 1, rr, s); for (const [dx, dy, rr] of B) R.disco(x + dx + m - 0.5, base + dy, rr * 0.86, c); for (const [dx, dy, rr] of B) R.disco(x + dx + m - 1.5, base + dy - 1.5, rr * 0.48, l);
  for (let i = 0; i < 6; i++) { const a = h(i, k, 320) * 6.28, d = r * 1.2 * h(i, k, 321); R.pset(x + m + Math.cos(a) * d, base - r * 1.3 + Math.sin(a) * d, ((i + Math.floor(t * 3)) % 4) ? l : s); }
}

// una figurita de fondo (6–12 px): cabeza, cuerpo con su sombra, piernas que andan si o.anda; o.alto, o.dir, o.tocado
function d_figura(R, x, suelo, t, k, ropa, ropaS, pelo, o = {}) {
  const { rect, pset } = R, a = o.alto ?? 10, c = Math.max(2, Math.round(a * 0.28)), yb = suelo - Math.round(a * 0.3), yc = suelo - a, ph = o.anda ? Math.floor(t * 7 + k) % 2 : 0, w = Math.max(2, Math.round(a * 0.22));
  rect(x - w + 1, yb, x - w + 1, suelo - (ph ? 1 : 0), C.k); rect(x + w - 1, yb, x + w - 1, suelo - (ph ? 0 : 1), C.k);
  if (o.falda) rect(x - w - 1, yb - 1, x + w + 1, suelo - 1, ropa);
  rect(x - w, yc + c + 1, x + w, yb, ropa); rect(x + w, yc + c + 1, x + w, yb, ropaS); rect(x - w, yc + c + 1, x + w, yc + c + 1, ropaS);
  rect(x - (c >> 1), yc, x + (c >> 1), yc + c, o.piel ?? d_PIEL); rect(x - (c >> 1), yc, x + (c >> 1), yc, pelo); if (c > 2) pset(x - (c >> 1), yc + 1, pelo);
  if (o.tocado) { rect(x - (c >> 1) - 1, yc - 1, x + (c >> 1) + 1, yc - 1, o.tocado); pset(x, yc - 2, o.tocado); }
}

// un número de tres por cinco píxeles (los rótulos de la lámina y los dibujos de tiza)
const d_CIFRAS = { 1: ['.#', '##', '.#', '.#', '.#'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'] };

function d_cifra(R, n, x, y, c, esc = 1) { d_CIFRAS[n].forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(x + i * esc + a, y + j * esc + b, c); }); }

// un panel de la boiserie: campo con la luz arriba, moldura de sombra, filete dorado, volutas en las esquinas y la concha
function d_panelRococo(R, x0, y0, x1, y1) {
  const { rect, pset } = R, D = d_C;
  for (let y = y0 + 2; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) if ((x + y) % 2 === 0 && y < y0 + (y1 - y0) * 0.35) pset(x, y, D.boiL);
  for (let y = y1 - 6; y < y1 - 1; y++) for (let x = x0 + 2; x < x1 - 1; x++) if ((x + y) % 2 === 0) pset(x, y, D.boiS);
  rect(x0, y0, x1, y0, D.boiD); rect(x0, y0, x0, y1, D.boiD); rect(x0, y1, x1, y1, D.boiL); rect(x1, y0, x1, y1, D.boiL);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, C.oro); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, C.oro); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, C.oroS); rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, C.oroS);
  for (const [cx, cy, sx, sy] of [[x0 + 1, y0 + 1, 1, 1], [x1 - 1, y0 + 1, -1, 1], [x0 + 1, y1 - 1, 1, -1], [x1 - 1, y1 - 1, -1, -1]]) { pset(cx + 2 * sx, cy + 2 * sy, C.oroL); pset(cx + 3 * sx, cy + 2 * sy, C.oro); pset(cx + 2 * sx, cy + 3 * sy, C.oro); pset(cx + 3 * sx, cy + 3 * sy, C.oroS); }
  const mx = (x0 + x1) >> 1; rect(mx - 3, y0 - 1, mx + 3, y0, C.oro); rect(mx - 2, y0 - 2, mx + 2, y0 - 2, C.oroL); pset(mx, y0 - 3, C.oroL); pset(mx - 1, y0 + 2, C.oroS); pset(mx + 1, y0 + 2, C.oroS); pset(mx, y0 + 2, C.oro); pset(mx - 2, y0 + 1, C.oroS); pset(mx + 2, y0 + 1, C.oroS);
}

// una ventana alta con su marco blanco, el alféizar de mármol y las cortinas de damasco recogidas con el lambrequín
function d_ventanaSalon(R, x0, y0, x1, y1) {
  const { rect, pset } = R, D = d_C, K = C.k;
  rect(x0 - 3, y0 - 3, x1 + 3, y1 + 2, K); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 1, D.estuco); rect(x1 + 1, y0 - 2, x1 + 2, y1 + 1, D.estucoS); rect(x0, y0, x1, y1, hex('#3a3a5a'));
  rect(x0 - 5, y1 + 1, x1 + 5, y1 + 4, K); rect(x0 - 4, y1 + 2, x1 + 4, y1 + 3, D.marmol); rect(x0 - 4, y1 + 3, x1 + 4, y1 + 3, D.marmolS);
  for (const [a, b, dir] of [[x0 - 7, x0 + 3, 1], [x1 - 3, x1 + 7, -1]]) for (let y = y0 - 6; y <= y1 + 8; y++) {
    const ata = y > y0 + 42 && y < y0 + 48, ciñe = ata ? 3 : y > y0 + 30 && y < y0 + 60 ? 1 : 0, aa = dir > 0 ? a : a + ciñe, bb = dir > 0 ? b - ciñe : b;
    for (let x = aa; x <= bb; x++) { const f = Math.sin((x - a) * 1.3 + y * 0.02); pset(x, y, x === aa || x === bb ? K : f > 0.5 ? D.tercL : f < -0.4 ? D.tercS : D.terc); if (!ata && (x * 3 + y * 5) % 11 === 0 && f > -0.4) pset(x, y, D.tercL); }
    if (ata) for (let x = aa; x <= bb; x++) pset(x, y, y === y0 + 45 ? C.oroL : C.oro);
  }
  for (let x = x0 - 8; x <= x1 + 8; x++) { const yb = y0 - 4 + Math.round(Math.abs(Math.sin((x - x0 + 8) / (x1 - x0 + 16) * Math.PI * 2)) * 6); rect(x, y0 - 9, x, yb, D.terc); pset(x, yb, K); pset(x, yb - 1, x % 2 ? D.tercL : D.terc); if (x % 2) pset(x, yb + 1, C.oro); pset(x, y0 - 9, D.tercS); }
  rect(x0 - 9, y0 - 11, x1 + 9, y0 - 9, K); rect(x0 - 8, y0 - 10, x1 + 8, y0 - 10, C.oro);
}

function d_salonFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  // la cornisa de yeso con dentículos y el filete dorado (tranquila bajo la barra del año)
  d_textura(R, 0, 0, 319, 9, D.estuco, D.estuco, D.estucoS, 201, 0, 0.06); rect(0, 5, 319, 5, D.estucoS); for (let x = 1; x < 320; x += 5) rect(x, 7, x + 2, 8, D.estucoS);
  rect(0, 9, 319, 9, C.oroS); rect(0, 10, 319, 10, C.oro);
  // la boiserie verde agua con su trama, la moldura del zócalo y los paneles altos y bajos
  d_textura(R, 0, 11, 319, 118, D.boi, D.boiL, D.boiS, 202, 0.04, 0.1);
  for (let c = 0; c < 8; c++) { const x0 = 4 + c * 40, x1 = x0 + 32; d_panelRococo(R, x0, x0 > 270 ? 52 : 18, x1, 82); d_panelRococo(R, x0, 95, x1, 112); }
  rect(0, 86, 319, 86, D.boiL); rect(0, 87, 319, 88, D.boi); rect(0, 89, 319, 90, D.boiD); for (let x = 0; x < 320; x += 3) pset(x, 87, C.oroS);
  rect(0, 113, 319, 118, D.boiD); rect(0, 113, 319, 113, D.boiL); rect(0, 118, 319, 118, K);
  // las dos ventanas con sus cortinas
  d_ventanaSalon(R, 12, 24, 46, 104); d_ventanaSalon(R, 242, 24, 268, 104);
  // el reloj de caja alta: el remate, la esfera, el tronco con la ventanita del péndulo y la peana
  rect(56, 30, 70, 118, K); rect(57, 31, 69, 117, D.parqS); rect(57, 31, 58, 117, D.parqL); poligono([[55, 31], [63, 22], [71, 31]], K); poligono([[57, 30], [63, 24], [69, 30]], D.parq); pset(63, 21, C.oro); pset(63, 20, C.oroL);
  disco(63, 39, 5, K); disco(63, 39, 4, D.estuco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(63 + Math.cos(a) * 3), Math.round(39 + Math.sin(a) * 3), C.grisS ?? K); } linea(63, 39, 63, 36, K); linea(63, 39, 65, 40, K); pset(60, 37, C.blanco);
  rect(59, 50, 67, 90, K); rect(60, 51, 66, 89, hex('#2a1a12')); pset(60, 51, D.espejoL); pset(61, 52, D.espejoL);
  rect(55, 104, 71, 118, K); rect(56, 105, 70, 117, D.parq); rect(56, 105, 70, 105, D.parqL); d_cuarteron(R, 58, 107, 68, 115, D.parq, D.parqL, D.parqD, D.parqS, 3);
  // el paisaje en su marco dorado (cielo, colinas, un castillo y un río)
  d_marco(R, 78, 22, 112, 52, 3); for (let y = 25; y < 50; y++) for (let x = 81; x < 110; x++) { const u = (y - 25) / 25; let c = u < 0.45 ? (((x + y) & 1) && u > 0.3 ? hex('#e8d0a0') : hex('#a8c0d0')) : hex('#6a8a4a');
    if (u >= 0.45 && y > 40 + Math.sin(x * 0.3) * 2) c = hex('#4a6a3a'); if (y > 44 && Math.abs(x - 96 - (y - 44) * 1.5) < 2) c = hex('#8ab0c8'); pset(x, y, c); }
  rect(98, 33, 103, 37, hex('#c8b8a0')); rect(99, 31, 100, 33, hex('#c8b8a0')); pset(101, 31, hex('#8a4a3a')); pset(99, 30, hex('#8a4a3a')); rect(84, 36, 87, 40, hex('#3a5a2a')); rect(85, 34, 86, 36, hex('#3a5a2a'));
  // el retrato oval de un caballero con peluca empolvada (de lejos, sin rasgos)
  disco(222, 40, 15, K); disco(222, 40, 14, (x, y, d) => (d > 0.8 ? (x + y < 262 ? C.oroL : C.oroS) : C.oro)); disco(222, 40, 11, K); disco(222, 40, 10, (x, y, d) => (d > 0.7 ? hex('#2a2224') : hex('#3a2e2c')));
  rect(216, 44, 228, 50, hex('#3a4a7a')); rect(221, 44, 223, 47, C.blanco); disco(222, 37, 4, hex('#e8e4dc')); rect(219, 37, 225, 41, d_PIEL); rect(219, 37, 225, 37, hex('#e8e4dc')); pset(222, 32, C.oroL); pset(212, 30, C.oroL);
  // la chimenea de mármol: repisa, jambas con volutas, la boca con el ladrillo y la placa de hierro, los morillos
  rect(114, 66, 206, 72, K); rect(115, 67, 205, 70, D.marmol); rect(115, 70, 205, 71, D.marmolS); rect(115, 67, 205, 67, C.blanco);
  rect(120, 72, 200, 118, K); d_textura(R, 121, 73, 199, 118, D.marmol, C.blanco, D.marmolS, 205, 0.03, 0.08);
  for (let k = 0; k < 7; k++) { let x = 122 + h(k, 1, 206) * 76, y = 74; for (let s = 0; s < 40; s++) { x += Math.sin(s * 0.4 + k) * 0.8; y += 1; if (y > 117) break; if (x < 136 || x > 184 || y < 82) pset(x, y, D.marmolV); } }
  rect(136, 82, 184, 118, K); rect(137, 83, 183, 118, hex('#3a2622')); for (let y = 84; y < 118; y += 3) for (let x = 137 + (y % 6 ? 0 : 3); x < 183; x += 6) { rect(x, y, x + 4, y + 1, hex('#5a3226')); }
  rect(150, 86, 170, 100, hex('#24181a')); rect(152, 88, 168, 98, hex('#2e2224')); disco(160, 93, 3, hex('#3e3034'));
  for (const sx of [126, 194]) { rect(sx - 3, 74, sx + 3, 80, D.marmolS); disco(sx, 77, 3, D.marmol); pset(sx, 77, D.marmolV); }
  rect(156, 74, 164, 79, D.marmolS); disco(160, 76, 3, D.marmol); pset(160, 75, C.oroL);
  // el espejo del trumeau en su marco dorado con la crestería
  d_marco(R, 128, 20, 192, 64, 3); for (let y = 23; y < 62; y++) for (let x = 131; x < 190; x++) { const d = (x - 131) - (y - 23) * 0.8; pset(x, y, Math.abs(d - 14) < 3 || Math.abs(d - 36) < 1.5 ? D.espejoL : y > 54 ? D.espejoS : (x + y) % 2 ? D.espejo : hex('#86a2b0')); }
  rect(131, 50, 189, 61, hex('#7a8e94')); rect(131, 50, 189, 50, D.espejoS); for (let x = 133; x < 189; x += 9) rect(x, 52, x + 5, 58, hex('#8a9ea2'));
  poligono([[146, 21], [160, 13], [174, 21]], K); poligono([[148, 20], [160, 15], [172, 20]], C.oro); pset(160, 16, C.oroL); pset(155, 18, C.oroS); pset(165, 18, C.oroS);
  // la repisa: el jarrón de porcelana con flores y los dos candelabros de tres brazos
  rect(156, 58, 164, 66, K); rect(157, 59, 163, 65, C.blanco); rect(158, 61, 162, 63, hex('#4a6ab0')); pset(157, 59, D.espejoL); for (const [dx, dy, c] of [[-3, -2, '#e8889a'], [0, -4, '#f0e070'], [3, -2, '#e8889a'], [-1, -1, '#7aa04a'], [2, -1, '#7aa04a'], [-5, 0, '#c8a0e0'], [5, 0, '#f6f0e0']]) disco(160 + dx, 57 + dy, 1.4, hex(c));
  for (const cx of [124, 196]) { rect(cx - 1, 54, cx + 1, 66, K); rect(cx, 55, cx, 65, C.oro); rect(cx - 7, 56, cx + 7, 57, K); rect(cx - 6, 56, cx + 6, 56, C.oro); rect(cx - 3, 64, cx + 3, 66, K); rect(cx - 2, 65, cx + 2, 65, C.oro); for (const dx of [-6, 0, 6]) { rect(cx + dx - 1, 53, cx + dx + 1, 55, C.oroS); rect(cx + dx, 47, cx + dx, 53, D.cera); } }
  // las girándulas de la pared: el respaldo dorado y dos brazos con su vela
  for (const gx of [95, 222, 300]) { const gy = gx > 290 ? 70 : 64; rect(gx - 3, gy - 6, gx + 3, gy + 6, K); rect(gx - 2, gy - 5, gx + 2, gy + 5, C.oro); pset(gx - 1, gy - 4, C.oroL); pset(gx, gy + 6, C.oroS);
    for (const s of [-1, 1]) { linea(gx, gy + 2, gx + s * 6, gy + 1, C.oroS); rect(gx + s * 6 - 1, gy - 1, gx + s * 6 + 1, gy, C.oro); rect(gx + s * 6, gy - 7, gx + s * 6, gy - 2, D.cera); } }
  // el parqué de espiga con sus juntas, el brillo de las ventanas y la luz de la chimenea en el suelo
  for (let y = 119; y < 180; y++) { const v = (y - 119) / 61, Y = (y - 119) * 1.3; for (let x = 0; x < 320; x++) { const X = (x - 160) / (0.7 + v * 0.6) + 160, col = Math.floor(X / 12), par = col & 1, u = X - col * 12, d = Y + (par ? u : 12 - u), s = Math.floor(d / 6);
    let c = [D.parq, D.parqL, D.parq, D.parqS][Math.floor(h(col, s, 207) * 4)]; const f = ((d % 6) + 6) % 6; if (f < 1 || u < 0.8) c = D.parqD; else if (f < 2) c = d_mez(c, C.blanco, 0.12); else if (Math.sin(X * 1.7 + d * 0.4) > 0.93) c = D.parqS; pset(x, y, c); } }
  for (const [wx, ww] of [[29, 18], [255, 14]]) for (let y = 120; y < 150; y++) for (let x = wx - ww; x <= wx + ww; x++) if ((x + y) % 2 === 0) d_aclara(R, x + Math.round((y - 120) * 0.3), y, 0.16 * (1 - (y - 120) / 30), hex('#e8d8f0'));
  // la alfombra de nudos: cenefa con dos franjas, el campo rojo con el medallón azul y los flecos
  poligono([[90, 132], [230, 132], [258, 177], [62, 177]], (x, y) => { const v = (y - 132) / 45, xl = 90 - 28 * v, xr = 230 + 28 * v, u = (x - xl) / (xr - xl);
    const b = u < 0.07 || u > 0.93 || v < 0.12 || v > 0.88, b2 = u < 0.035 || u > 0.965 || v < 0.06 || v > 0.94, m = Math.abs(u - 0.5) * 2 + Math.abs(v - 0.5) * 2.6;
    if (b2) return D.alfombraA; if (b) return ((x >> 1) + (y >> 1)) % 3 === 0 ? D.alfombraO : D.alfombraS;
    if (m < 0.5) return m > 0.42 ? D.alfombraO : ((x + y) % 4 === 0 ? D.alfombraO : D.alfombraA); if (h(x, y, 209) < 0.1) return D.alfombraS; return ((x * 3 + y * 7) % 13 === 0) ? D.alfombraO : D.alfombra; });
  for (let x = 62; x <= 258; x += 2) { pset(x, 178, D.estuco); pset(x + 1, 179, D.estucoS); }
  // la sombra de la mesa sobre la alfombra
  for (let y = 158; y < 172; y++) for (let x = 106; x < 216; x++) if ((x + y) % 2 === 0 && ((x - 161) / 56) ** 2 + ((y - 165) / 7) ** 2 < 1) d_aclara(R, x, y, 0.35, hex('#2a1010'));
  // la butaca Luis XV de seda rosa, girada hacia la mesa, y el cojín del perrito junto al fuego
  rect(22, 124, 44, 160, K); rect(23, 125, 43, 146, hex('#d89aa8')); rect(23, 125, 43, 126, C.oro); rect(23, 125, 24, 146, C.oro); rect(42, 125, 43, 146, C.oroS); for (let y = 129; y < 144; y += 4) for (let x = 27 + (y % 8 ? 2 : 0); x < 41; x += 4) pset(x, y, hex('#b87888'));
  rect(19, 144, 47, 151, K); rect(20, 145, 46, 149, hex('#e8aab8')); rect(20, 145, 46, 145, hex('#f4c8d0')); rect(20, 150, 46, 151, C.oro); for (const lx of [22, 44]) { linea(lx, 152, lx - (lx < 30 ? 2 : -2), 162, K); linea(lx + 1, 152, lx + 1 - (lx < 30 ? 2 : -2), 162, C.oro); }
  disco(104, 127, 7, K); disco(104, 126, 6, hex('#3a5aa0')); disco(103, 125, 3, hex('#5a7ac0')); for (const [dx, dy] of [[-6, 1], [6, 1], [0, -6]]) pset(104 + dx, 126 + dy, C.oro);
}

// la vida del salón: el atardecer de nieve por las ventanas, el fuego, las velas, el péndulo, el criado del espejo y el perrito
function d_salonVida(R, t) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  for (const [x0, x1, k] of [[12, 46, 0], [242, 268, 1]]) {
    d_cielo(R, x0, 24, x1, 104, t, 'invierno', k);
    rect(x0, 92, x1, 104, hex('#d8dcea')); for (let x = x0; x <= x1; x++) { pset(x, 91 - Math.round(Math.sin(x * 0.2 + k) * 1.5), hex('#eef2fa')); if (h(x, 1, 330) < 0.2) pset(x, 96, hex('#b8c0d4')); }
    if (k === 0) { rect(36, 74, 40, 92, hex('#4a3a4a')); R.poligono([[34, 76], [38, 66], [42, 76]], hex('#3a2e3a')); pset(38, 65, C.oroL); for (let x = 14; x < 34; x += 7) { rect(x, 84, x + 5, 91, hex('#5a4a5a')); rect(x, 83, x + 5, 83, hex('#eef2fa')); if (Math.sin(t * 2 + x) > -0.6) pset(x + 2, 87, hex('#ffd070')); } }
    d_arbolPelado(R, k ? 256 : 22, 93, k ? 50 : 44, t, k); d_nieve(R, x0, 24, x1, 104, t, 18);
    R.recorte(null);
    // los parteluces y los junquillos de la ventana, encima
    const xm = (x0 + x1) >> 1; rect(xm - 1, 24, xm + 1, 104, D.estuco); rect(xm + 1, 24, xm + 1, 104, D.estucoS);
    for (let y = 24 + 16; y < 104; y += 16) { rect(x0, y, x1, y + 1, D.estuco); rect(x0, y + 1, x1, y + 1, D.estucoS); }
    for (let x = x0 + 8; x < x1; x += 8) if (Math.abs(x - xm) > 3) linea(x, 24, x, 104, D.estucoS);
  }
  // el fuego: las llamas que lamen los troncos, las brasas que laten y las chispas que suben
  rect(142, 110, 178, 113, hex('#2a1a14')); for (const [a, b] of [[143, 160], [158, 177]]) { rect(a, 106, b, 110, K); rect(a + 1, 107, b - 1, 109, hex('#6a3a1e')); rect(a + 1, 107, b - 1, 107, hex('#8a5a32')); }
  for (let i = 0; i < 30; i++) { const x = 145 + i, ph = t * 9 + i * 0.7, hgt = 7 + Math.round((Math.sin(ph) + Math.sin(ph * 0.61 + i)) * 3 + 9 * Math.sin((i / 30) * Math.PI));
    for (let j = 0; j < hgt; j++) { const u = j / hgt; pset(x, 106 - j, u < 0.3 ? C.fuegoL : u < 0.7 ? C.fuego : D.brasa); } }
  for (let x = 144; x < 177; x++) if (Math.sin(t * 4 + x) > 0.3) pset(x, 110, hex('#ff7030'));
  for (let k = 0; k < 6; k++) { const u = ((t * 0.9 + k * 0.37) % 1), x = 150 + h(k, 1, 340) * 20 + Math.sin(t * 3 + k) * 2, y = 100 - u * 18; if (u < 0.9) pset(x, y, u < 0.5 ? C.fuegoL : C.fuego); }
  for (const [cx, n] of [[124, 3], [196, 3]]) for (let i = 0; i < n; i++) d_llama(R, cx - 6 + i * 6, 46, t, cx + i);
  for (const gx of [95, 222, 300]) { const gy = gx > 290 ? 70 : 64; for (const s of [-1, 1]) d_llama(R, gx + s * 6, gy - 8, t, gx + s); }
  // el resplandor del fuego y de las velas
  const fl = 0.8 + Math.sin(t * 7) * 0.1 + Math.sin(t * 11.3) * 0.08;
  for (let y = 112; y < 140; y++) for (let x = 128; x < 194; x++) if ((x + y) % 2 === 0) { const d = ((x - 160) / 34) ** 2 + ((y - 118) / 22) ** 2; if (d < 1) d_aclara(R, x, y, 0.3 * fl * (1 - d), hex('#ffb060')); }
  for (const [gx, gy] of [[95, 56], [222, 56], [300, 62], [124, 44], [196, 44]]) d_halo(R, gx, gy, 9, 0.22 * fl);
  // el péndulo del reloj
  const pa = Math.sin(t * Math.PI) * 0.22; linea(63, 52, Math.round(63 + Math.sin(pa) * 30), 82, C.oroS); disco(63 + Math.sin(pa) * 31, 84, 2, C.oro); pset(Math.round(62 + Math.sin(pa) * 31), 83, C.oroL);
  // en el espejo, un criado con peluca cruza la sala con una bandeja de vasos (de vez en cuando)
  { const u = ((t + 2) % 9) / 9, x = Math.round(118 + u * 90); R.recorte([131, 23, 189, 61]);
    if (u < 0.95) { d_figura(R, x, 58, t, 3, hex('#5a6a8a'), hex('#46546e'), hex('#e8e4dc'), { alto: 13, anda: true }); rect(x + 2, 49, x + 8, 49, D.plata); pset(x + 3, 48, D.espejoL); pset(x + 6, 48, D.espejoL); } R.recorte(null); }
  // el perrito duerme junto al fuego: respira, mueve la oreja y de vez en cuando la cola
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, cola = (t % 6) < 1.2 ? Math.round(Math.sin(t * 18)) : 0, P = hex('#d8b080'), PS = hex('#a87a4a');
    disco(104, 123 - r * 0.5, 4.5, K); disco(104, 123 - r * 0.5, 3.6, P); rect(100, 124, 108, 125, PS); disco(99, 123, 2.6, K); disco(99, 123, 1.8, P); pset(98, 124, hex('#3a2a20')); pset(100, 121, PS); pset(101, 121 - (Math.floor(t / 3) % 3 === 0 ? 1 : 0), PS);
    linea(108, 123, 110 + cola, 120, PS); pset(97, 123, K); if (Math.floor(t * 0.7) % 3 === 0) { const z = (t * 0.7) % 1; pset(97, 117 - Math.round(z * 4), hex('#f6f6f6')); } }
}

// el pastel parametrizado: dos pisos de bizcocho glaseado con guirnaldas, rosas de azúcar, grageas y la cinta dorada
// (cx, yb) = el centro de la base del piso de abajo; s = escala (0.3 en la sala, 1 de cerca)
function d_pastelCuerpo(R, cx, yb, s) {
  const { rect, pset, disco } = R, D = d_C, K = C.k, a1 = Math.round(52 * s), h1 = Math.round(36 * s), a2 = Math.round(32 * s), h2 = Math.round(24 * s), r1 = Math.max(2, a1 * 0.16), r2 = Math.max(1.5, a2 * 0.18);
  const cil = (a, ytop, yb2, ry) => { for (let y = Math.floor(ytop - ry) - 1; y <= yb2 + ry + 1; y++) for (let x = cx - a - 1; x <= cx + a + 1; x++) { const dx = (x - cx) / (a + 0.5), inB = y <= yb2 + Math.sqrt(Math.max(0, 1 - dx * dx)) * ry, inT = y >= ytop - Math.sqrt(Math.max(0, 1 - dx * dx)) * ry;
      if (Math.abs(dx) > 1 || !inB || !inT) continue; const borde = Math.abs(dx) > 1 - 1.2 / a || y > yb2 + Math.sqrt(Math.max(0, 1 - dx * dx)) * ry - 1;
      const tapa = y < ytop + Math.sqrt(Math.max(0, 1 - dx * dx)) * ry; pset(x, y, borde ? K : tapa ? (dx < -0.3 ? C.blanco : D.glaseado) : dx < -0.45 ? C.blanco : dx > 0.55 ? D.glaseadoD : dx > 0.15 ? D.glaseadoS : D.glaseado); } };
  const y1 = yb - h1, y2 = y1 - h2;
  cil(a1, y1, yb, r1);
  // las guirnaldas de glaseado y las rosas de azúcar del piso de abajo; la cinta dorada de la base
  const nG = Math.max(4, Math.round(8 * s + 2)); for (let g = 0; g < nG; g++) { const u0 = -0.92 + g * 1.84 / nG, u1 = u0 + 1.84 / nG;
    for (let i = 0; i <= 12; i++) { const u = u0 + (u1 - u0) * i / 12, x = cx + u * a1, yy = y1 + h1 * 0.35 + Math.sin(i / 12 * Math.PI) * h1 * 0.2 + Math.sqrt(1 - u * u) * r1 * 0.6; pset(x, yy, s > 0.5 ? D.glaseadoD : D.glaseadoS); if (s > 0.5) pset(x, yy - 1, C.blanco); }
    const ux = cx + u0 * a1, uy = y1 + h1 * 0.35 + Math.sqrt(1 - u0 * u0) * r1 * 0.6; if (g > 0) { if (s > 0.5) { disco(ux, uy, 2.2, D.rosaS); disco(ux - 0.5, uy - 0.5, 1.5, D.rosaA); pset(ux - 1, uy - 1, C.blanco); pset(ux + 2, uy + 1, d_C.hoja); } else pset(ux, uy, D.rosaA); } }
  for (let x = cx - a1; x <= cx + a1; x++) { const dx = (x - cx) / a1, yy = yb + Math.sqrt(Math.max(0, 1 - dx * dx)) * r1; const bh = Math.max(1, Math.round(4 * s)); for (let j = 1; j <= bh; j++) pset(x, Math.round(yy) - j, dx < -0.3 ? C.oroL : dx > 0.5 ? C.oroS : C.oro); if (s > 0.5 && x % 4 === 0) pset(x, Math.round(yy) - bh - 1, D.plata); }
  cil(a2, y2, y1, r2);
  // el enrejado de glaseado y las cerezas del piso de arriba
  if (s > 0.5) { for (let x = cx - a2 + 3; x < cx + a2 - 2; x += 4) for (let j = 0; j < h2 - 6; j += 2) { pset(x + (j >> 1) % 2, y2 + 4 + j + Math.round(Math.sqrt(Math.max(0, 1 - ((x - cx) / a2) ** 2)) * r2), D.glaseadoS); } }
  const nC = Math.max(3, Math.round(7 * s + 1)); for (let i = 0; i < nC; i++) { const u = -0.85 + i * 1.7 / (nC - 1), x = cx + u * a2, y = y1 - h2 * 0.25 + Math.sqrt(1 - u * u) * r2; if (s > 0.5) { disco(x, y, 1.8, hex('#8a1424')); disco(x - 0.4, y - 0.4, 1.2, hex('#c82a3a')); pset(x - 1, y - 1, C.blanco); } else pset(x, y, hex('#c82a3a')); }
  return { a1, a2, y1, y2, r1, r2 };
}

// las velas del pastel: o.velas en una corona sobre el piso de arriba (y, si son muchas, otra en el escalón de abajo), la
// vela gorda del centro, las apagadas con su humo y el resplandor según cuántas quedan
function d_pastelVelas(R, cx, yb, s, t, o, nDef) {
  const n = Math.max(0, Math.round(o.velas ?? nDef)), enc = Math.min(n, Math.round(o.encendidas ?? n)), g = d_pastelGeo(cx, yb, s), cap = Math.max(8, Math.round(18 * s + (s > 0.5 ? 0 : 4)));
  const n1 = Math.min(n, cap), n2 = n - n1, va = Math.round(9 * s + (s > 0.5 ? 1 : 1.5)), w = s > 0.5 ? 2 : 1, S = s > 0.5 ? 2 : 1, P = [];
  for (let i = 0; i < n1; i++) { const a = i / n1 * Math.PI * 2 + 0.2; P.push([cx + Math.cos(a) * g.a2 * 0.74, g.y2 + Math.sin(a) * g.r2 * 0.74, i]); }
  for (let i = 0; i < n2; i++) { const a = i / n2 * Math.PI * 2 + 0.1; P.push([cx + Math.cos(a) * (g.a1 + g.a2) * 0.5, g.y1 + Math.sin(a) * (g.r1 + g.r2) * 0.5 - 1, n1 + i]); }
  P.sort((a, b) => a[1] - b[1]);
  const COL = [d_C.cera, hex('#f6d8e0'), hex('#dce8f6'), hex('#f6eab8')];
  for (const [x, y, i] of P) { const front = y > g.y1 - 1 && Math.abs(x - cx) < g.a2 + 1 && i >= n1; if (i >= n1 && !front && y > g.y2 + g.r2 && Math.abs(x - cx) < g.a2 - 1) continue;
    d_vela(R, Math.round(x - (w - 1) / 2), Math.round(y), va, t, i * 7 + 1, i < enc, w, COL[i % 4], S); }
  if (o.centro !== false) d_vela(R, cx - (w > 1 ? 2 : 1), g.y2 - 1, Math.round(va * 1.4), t, 99, enc > 0 || n === 0, w > 1 ? 4 : 2, d_C.cera, S);
  return { enc, n, g };
}

const d_pastelGeo = (cx, yb, s) => { const a1 = Math.round(52 * s), h1 = Math.round(36 * s), a2 = Math.round(32 * s), h2 = Math.round(24 * s); return { a1, a2, y1: yb - h1, y2: yb - h1 - h2, r1: Math.max(2, a1 * 0.16), r2: Math.max(1.5, a2 * 0.18) }; };

// la mesa de la sala, por delante de los que están detrás: mantel con pliegues y puntilla, patas doradas, el pastel,
// los candeleros de plata, las copas y los platos (capa transparente fija)
function d_salonMesa(R) {
  const { rect, pset, disco, linea } = R, D = d_C, K = C.k;
  for (const lx of [118, 202]) { rect(lx - 2, 158, lx + 2, 169, K); rect(lx - 1, 158, lx + 1, 168, C.oro); pset(lx - 1, 160, C.oroL); rect(lx - 3, 166, lx + 3, 169, K); rect(lx - 2, 167, lx + 2, 168, C.oroS); }
  rect(110, 139, 210, 144, K); rect(111, 140, 209, 143, D.mantel); rect(111, 140, 209, 140, C.blanco);
  for (let y = 144; y < 160; y++) for (let x = 111; x <= 209; x++) { const f = Math.sin((x - 111) * 0.55); pset(x, y, f > 0.6 ? C.blanco : f < -0.5 ? D.mantelS : D.mantel); if ((x * 7 + y * 3) % 17 === 0) pset(x, y, D.mantelS); }
  rect(110, 144, 110, 159, K); rect(210, 144, 210, 159, K);
  for (let x = 110; x <= 210; x++) { const yb = 159 + (Math.abs(((x - 110) % 6) - 3) < 2 ? 1 : 0); pset(x, yb, (x % 2) ? D.mantelS : C.blanco); pset(x, yb + 1, (x % 3) ? K : D.mantelD); }
  for (let x = 112; x < 209; x += 6) { pset(x + 2, 157, D.mantelD); pset(x + 3, 156, D.mantelS); }
  // los platos con su filete dorado, las copas de vino y los candeleros
  for (const px of [138, 182]) { rect(px - 6, 140, px + 6, 141, K); rect(px - 5, 140, px + 5, 140, C.blanco); pset(px - 4, 140, C.oro); pset(px + 4, 140, C.oro); rect(px + 7, 138, px + 7, 141, D.plata); }
  for (const gx of [128, 192]) { rect(gx - 2, 130, gx + 2, 135, K); rect(gx - 1, 131, gx + 1, 134, hex('#9a1a2a')); pset(gx - 1, 131, hex('#e8a0a8')); rect(gx, 136, gx, 138, D.plata); rect(gx - 2, 139, gx + 2, 139, D.plata); }
  for (const cx of [116, 204]) { rect(cx - 1, 126, cx + 1, 139, K); rect(cx, 127, cx, 138, D.plata); rect(cx - 3, 137, cx + 3, 139, K); rect(cx - 2, 138, cx + 2, 138, D.plata); rect(cx - 2, 126, cx + 2, 127, D.plata); rect(cx, 120, cx, 125, D.cera); }
  d_pastelCuerpo(R, 160, 140, 0.3);
}

function d_salonMesaVida(R, t, o) {
  d_pegar(R, d_capa(R, 'D|salonMesa', () => d_salonMesa(R), true), 104, 105, 214, 170);
  for (const cx of [116, 204]) d_llama(R, cx, 119, t, cx);
  const v = d_pastelVelas(R, 160, 140, 0.3, t, o, 12), fl = 0.85 + Math.sin(t * 9) * 0.08;
  if (v.enc > 0) d_halo(R, 160, 120, 14 + Math.min(10, v.enc * 0.4), 0.22 * fl * Math.min(1, 0.3 + v.enc / 12));
  for (const cx of [116, 204]) d_halo(R, cx, 117, 6, 0.2 * fl);
}

// el salón de cerca, desenfocado detrás del pastel: la boiserie en manchas, la ventana del atardecer con la nieve, el
// espejo dorado, el fuego a la derecha y las velas de las girándulas como discos de luz
function d_pastelFijo(R) {
  const { rect, pset, disco } = R, D = d_C;
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const u = y / 118, n = h(x >> 1, y >> 1, 230); pset(x, y, n < 0.1 ? D.boiS : u < 0.08 ? D.estuco : ((x >> 4) % 3 === 0 && y > 16 && y < 90) ? (((x + y) & 1) ? D.boiL : D.boi) : D.boi); }
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.25 + 0.2 * (y / 118), hex('#3a3040'));
  rect(0, 8, 319, 9, C.oroS);
  // la ventana borrosa a la izquierda (el atardecer) con sus cortinas y el espejo dorado en el centro
  for (let y = 18; y < 104; y++) for (let x = 10; x < 70; x++) { const u = (y - 18) / 86; pset(x, y, d_mez(hex('#4a4672'), hex('#d89a8e'), Math.min(1, u * 1.2 + (((x + y) & 1) ? 0.06 : 0)))); }
  for (let y = 18; y < 104; y += 2) { pset(39, y, D.estucoS); pset(40, y + 1, D.estuco); } for (let x = 10; x < 70; x += 2) pset(x, 60, D.estuco);
  for (const [a, b] of [[0, 14], [66, 82]]) for (let y = 10; y < 118; y++) for (let x = a; x < b; x++) pset(x, y, Math.sin(x * 0.8) > 0.3 ? D.tercL : (x + y) % 2 ? D.terc : D.tercS);
  for (let y = 20; y < 70; y++) for (let x = 112; x < 208; x++) { const e = Math.min(x - 112, 207 - x, y - 20, 69 - y); if (e < 4) pset(x, y, (x + y) % 2 ? C.oro : C.oroS); else pset(x, y, (x + y) % 3 ? D.espejo : D.espejoS); }
  for (let y = 24; y < 66; y++) { const x = 130 + (y - 24) * 0.6; for (let i = 0; i < 6; i++) if ((x + i + y) % 2) pset(x + i, y, D.espejoL); }
  // el fuego a la derecha: la boca de la chimenea en una mancha cálida
  for (let y = 60; y < 118; y++) for (let x = 250; x < 320; x++) { const d = ((x - 290) / 34) ** 2 + ((y - 100) / 30) ** 2; if (d < 1) pset(x, y, d < 0.3 ? hex('#ffb060') : d < 0.6 ? ((x + y) & 1 ? hex('#e07a40') : hex('#ffb060')) : ((x + y) & 1 ? hex('#8a4a3a') : D.marmolS)); }
  // la mesa, por si no se pinta delante (la cubre d_pastelMesa)
}

// la mesa de cerca: el mantel adamascado con su dibujo de rombos y los pliegues del planchado, el pie del pastel de plata,
// las copas, un plato con su tenedor, flores sueltas y un candelero; y el pastel grande (capa transparente fija)
function d_pastelMesa(R) {
  const { rect, pset, disco, linea } = R, D = d_C, K = C.k;
  for (let y = 118; y < 180; y++) { const v = (y - 118) / 62; for (let x = 0; x < 320; x++) { const X = (x - 160) / (0.5 + v * 0.7), Y = (y - 118) / (0.5 + v * 0.7) * 1.8, ax = ((X % 28) + 28) % 28 - 14, ay = ((Y % 28) + 28) % 28 - 14, rombo = Math.abs(ax) + Math.abs(ay), flor = Math.hypot(ax, ay);
      let c = D.mantel; if (Math.abs(rombo - 11) < 0.9) c = D.mantelD; else if (Math.abs(rombo - 9) < 0.6) c = D.mantelS; else if (flor < 4 && (Math.floor(Math.atan2(ay, ax) * 2.5) & 1)) c = D.mantelS; else if (flor < 1.5) c = D.mantelD; else if (rombo > 13 && ((x + y) & 1)) c = hex('#ece6da');
      if (Math.abs(y - 146) < 1 || Math.abs(Math.abs(X) - 90) < 0.7) c = d_mez(c, D.mantelD, 0.4); if (y === 118) c = D.mantelD; pset(x, y, c); } }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.06 + (y - 150) * 0.004, hex('#5a4a40'));
  for (let y = 119; y < 124; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.2, hex('#5a4a4a'));
  // el pie del pastel: la bandeja de plata con su reborde y el reflejo
  for (let y = 140; y < 164; y++) for (let x = 90; x < 231; x++) { const d = ((x - 160) / 70) ** 2 + ((y - 152) / 11) ** 2; if (d < 1) pset(x, y, d > 0.84 ? K : d > 0.72 ? (x < 160 ? C.blanco : D.plataS) : (y > 152 ? D.plataS : D.plata)); }
  for (let x = 100; x < 222; x += 7) pset(x, 160 + Math.round(Math.sqrt(Math.max(0, 1 - ((x - 160) / 70) ** 2)) * 1), C.blanco);
  rect(142, 162, 178, 170, K); rect(143, 162, 177, 169, D.plataS); rect(143, 162, 150, 169, D.plata); rect(136, 169, 184, 172, K); rect(137, 169, 183, 171, D.plata);
  // las copas, el plato con el tenedor, las flores y el candelero de la izquierda
  for (const [gx, gy] of [[92, 132], [232, 136]]) { rect(gx - 5, gy - 14, gx + 5, gy, K); rect(gx - 4, gy - 13, gx + 4, gy - 1, hex('#9a1a2a')); rect(gx - 4, gy - 13, gx + 4, gy - 9, hex('#e0d8e8')); pset(gx - 3, gy - 12, C.blanco); pset(gx - 3, gy - 8, hex('#e8a0a8')); rect(gx, gy + 1, gx, gy + 8, D.plata); rect(gx - 5, gy + 9, gx + 5, gy + 10, K); rect(gx - 4, gy + 9, gx + 4, gy + 9, D.plata); }
  for (let y = 156; y < 176; y++) for (let x = 20; x < 76; x++) { const d = ((x - 48) / 27) ** 2 + ((y - 166) / 9) ** 2; if (d < 1) pset(x, y, d > 0.86 ? K : d > 0.7 ? C.oro : C.blanco); }
  linea(30, 160, 64, 172, K); linea(31, 160, 65, 172, D.plata); rect(70, 168, 78, 170, K); rect(71, 169, 77, 169, D.plata);
  for (const [fx, fy, c] of [[106, 126, '#e8889a'], [114, 130, '#f6f0e0'], [214, 128, '#e8889a'], [248, 132, '#f0e070'], [256, 124, '#f6f0e0']]) { disco(fx, fy, 3, K); disco(fx, fy, 2.4, hex(c)); pset(fx - 1, fy - 1, C.blanco); linea(fx + 2, fy + 2, fx + 7, fy + 4, d_C.hoja); }
  rect(292, 70, 300, 128, K); rect(293, 71, 299, 127, D.plata); rect(293, 71, 294, 127, C.blanco); rect(286, 124, 306, 130, K); rect(287, 125, 305, 128, D.plata); rect(290, 60, 302, 70, K); rect(291, 61, 301, 69, D.plataS);
  d_pastelCuerpo(R, 160, 150, 1);
}

function d_pastelMesaVida(R, t, o) {
  d_pegar(R, d_capa(R, 'D|pastelMesa', () => d_pastelMesa(R), true), 0, 40, 319, 179);
  const v = d_pastelVelas(R, 160, 150, 1, t, o, 24), fl = 0.85 + Math.sin(t * 9) * 0.06 + Math.sin(t * 13.1) * 0.05;
  // el resplandor: más fuerte cuantas más velas siguen encendidas, y su reflejo en la plata
  if (v.enc > 0) { const m = Math.min(1, 0.35 + v.enc / 24); d_halo(R, 160, v.g.y2 - 4, 44 + Math.min(20, v.enc), 0.28 * fl * m); for (let x = 104; x < 216; x += 3) if (Math.sin(t * 5 + x) > 0.2) R.pset(x, 157, hex('#fff0c0')); }
  R.pset(296, 58, d_C.mecha); d_vela(R, 294, 60, 14, t, 55, true, 4, d_C.cera, 2); d_halo(R, 296, 40, 18, 0.25 * fl);
}

function d_salonFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|salon', () => d_salonFijo(R))); d_salonVida(R, t); return; }
  R.copiar(d_capa(R, 'D|pastelFondo', () => d_pastelFijo(R)));
  // las velas de las girándulas, desenfocadas: discos de luz que laten; la nieve en la ventana; el fuego que baila
  for (const [bx, by, r] of [[96, 34, 6], [104, 30, 4], [230, 40, 7], [222, 36, 4], [150, 44, 3], [176, 46, 3]]) { const m = 0.5 + Math.sin(t * 6 + bx) * 0.1; R.disco(bx, by, r, (x, y, d) => d_mez(R.pget(x, y), hex('#ffe0a0'), m * (1 - d * 0.6))); }
  R.recorte([10, 18, 65, 103]); for (let k = 0; k < 22; k++) { const y = 18 + ((h(k, 2, 350) * 86 + t * (5 + h(k, 1, 350) * 6)) % 86), x = 10 + h(k, 3, 350) * 56 + Math.sin(t + k) * 2; R.disco(x, y, 1, hex('#f0f0f8')); } R.recorte(null);
  for (let k = 0; k < 9; k++) { const x = 266 + k * 6, hh = 10 + Math.round(6 * Math.sin(t * 8 + k * 1.7)); for (let j = 0; j < hh; j++) if ((j + k) % 2 === 0 || j < hh / 2) R.pset(x + (j % 2), 110 - j, j < hh / 2 ? C.fuegoL : C.fuego); }
}

function d_salonDelante(R, t, o, cam) { if (cam === 'general') d_salonMesaVida(R, t, o); else d_pastelMesaVida(R, t, o); }

// un niño pequeño sentado (9 × 10 px, la esquina de arriba en x, y): canta (abre y cierra la boca), parpadea, ladea la cabeza
const d_NINO = ['..kkkkk..', '.kHHHHHk.', 'kHHHHHHHk', 'kHSSSSSHk', 'kSeSSSeSk', '.kSSmSSk.', '..kkkkk..', '.kCCWCCk.', 'kCCCCCCCk', 'kCcCCCcCk'];

const d_NINAS = [['#e8c060', '#c84a4a', '#a83434'], ['#5a3418', '#3e6aa8', '#2e508a'], ['#2a1a14', '#e8e0d0', '#c0b8a8'], ['#a85a2a', '#5a8a4a', '#3e6a34'], ['#e8c878', '#8a4a8a', '#6a346a'], ['#3a2418', '#d8a040', '#a87a28']];

function d_nino(R, x, y, t, k, canta = true) {
  const [pe, ro, roS] = d_NINAS[k % d_NINAS.length].map(hex), piel = k % 4 === 2 ? hex('#a8704a') : k % 4 === 3 ? hex('#e0a878') : d_PIEL;
  const abre = canta && Math.sin(t * 7.2 + k * 1.1) > -0.1, ojo = (t + k * 0.37) % 3.1 < 0.12, dy = canta ? Math.round(Math.sin(t * 3.6 + k) * 0.6) : 0;
  R.dibujo(d_NINO, x, y + dy, 1, { k: C.k, H: pe, S: piel, e: ojo ? piel : C.k, m: abre ? hex('#7a2a2a') : piel, C: ro, c: roS, W: C.blanco });
  if (k % 2 === 0) { R.pset(x + 1, y + 2 + dy, ro); R.pset(x + 7, y + 2 + dy, ro); }   // el lazo de las niñas
}

function d_kinderFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  // el techo de yeso con su viga y la cornisa de madera
  d_textura(R, 0, 0, 319, 8, D.yesoKL, D.yesoKL, D.yesoK, 240, 0, 0.08); rect(0, 8, 319, 10, D.friso); rect(0, 8, 319, 8, D.frisoL); rect(0, 10, 319, 10, D.frisoS);
  // la pared de yeso con su trama, el friso pintado a plantilla y el zócalo de tablillas
  d_textura(R, 0, 11, 319, 99, D.yesoK, D.yesoKL, D.yesoKS, 241, 0.05, 0.1);
  for (let x = 0; x < 320; x++) { if (x > 270) continue; const u = x % 12; pset(x, 14, D.yesoKS); pset(x, 19, D.yesoKS); if (u === 3 || u === 9) { pset(x, 16, hex('#a8b48a')); pset(x, 17, hex('#a8b48a')); } if (u === 6) pset(x, 16, hex('#c89a7a')); }
  for (let x = 0; x < 320; x++) { const u = x % 5; for (let y = 100; y < 124; y++) pset(x, y, u === 0 ? D.frisoS : u === 1 ? D.frisoL : h(x, y, 242) < 0.1 ? D.frisoS : D.friso); }
  rect(0, 98, 319, 100, K); rect(0, 98, 319, 98, D.frisoL); rect(0, 99, 319, 99, D.friso); rect(0, 122, 319, 124, D.frisoS); rect(0, 124, 319, 124, K);
  // las tarjetas de Froebel encima de la pizarra: círculo, cuadrado, triángulo, cruz
  for (let i = 0; i < 6; i++) { const x = 80 + i * 15; rect(x, 22, x + 10, 30, K); rect(x + 1, 23, x + 9, 29, C.blanco); const c = hex(['#c84a4a', '#3e6aa8', '#e8b030', '#5a9a4a', '#8a4a8a', '#e07a30'][i]);
    if (i % 3 === 0) disco(x + 5, 26, 2.6, c); else if (i % 3 === 1) rect(x + 3, 24, x + 7, 28, c); else poligono([[x + 2, 29], [x + 5, 23], [x + 8, 29]], c); pset(x + 5, 21, C.grisS ?? K); }
  // la pizarra: marco de roble, la pizarra con el borrado y los dibujos de tiza, la repisa con tizas y el borrador
  rect(70, 33, 172, 84, K); rect(71, 34, 171, 83, D.frisoL); rect(73, 36, 169, 81, K); for (let y = 37; y < 81; y++) for (let x = 74; x < 169; x++) pset(x, y, h(x >> 1, y, 243) < 0.18 ? D.pizarraL : (Math.sin((x + y * 0.3) * 0.15) > 0.8 && h(x, y, 244) < 0.5) ? D.pizarraL : D.pizarra);
  { const T2 = D.tiza, TS = D.tizaS;
    disco(88, 48, 5, T2); disco(88, 48, 4, D.pizarra); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(88 + Math.cos(a) * 6, 48 + Math.sin(a) * 6, 88 + Math.cos(a) * 8, 48 + Math.sin(a) * 8, T2); }
    linea(104, 64, 104, 54, T2); linea(120, 64, 120, 54, T2); linea(104, 54, 112, 46, T2); linea(112, 46, 120, 54, T2); linea(103, 64, 121, 64, T2); rect(110, 58, 113, 63, TS); rect(115, 55, 117, 57, TS); linea(117, 50, 117, 46, T2);
    for (let p = 0; p < 5; p++) { const a = p * 1.256; disco(136 + Math.cos(a) * 3, 54 + Math.sin(a) * 3, 1.6, T2); } disco(136, 54, 1, hex('#e8d070')); linea(136, 58, 137, 66, hex('#a8d0a0')); linea(137, 62, 140, 60, hex('#a8d0a0'));
    linea(150, 46, 154, 49, T2); linea(154, 49, 158, 46, T2); linea(160, 50, 163, 52, TS); linea(163, 52, 166, 50, TS);
    d_cifra(R, 1, 92, 70, T2, 2); d_cifra(R, 2, 104, 70, T2, 2); d_cifra(R, 3, 118, 70, T2, 2); for (let x = 132; x < 164; x += 6) disco(x, 74, 1.5, TS); linea(80, 79, 164, 79, TS, 3); }
  rect(68, 84, 174, 88, K); rect(69, 85, 173, 86, D.frisoL); rect(69, 87, 173, 87, D.frisoS); rect(84, 83, 90, 84, D.tiza); rect(96, 83, 99, 84, hex('#e8a0a0')); rect(150, 82, 160, 84, D.frisoS); rect(151, 82, 159, 82, hex('#8a8a8a'));
  // el reloj regulador de la escuela, encima del piano (la caja del péndulo con su ventanita)
  rect(30, 24, 46, 62, K); rect(31, 25, 45, 61, D.friso); rect(31, 25, 31, 61, D.frisoL); disco(38, 34, 7, K); disco(38, 34, 6, D.frisoL); disco(38, 34, 5, D.marfil); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(38 + Math.cos(a) * 4), Math.round(34 + Math.sin(a) * 4), K); }
  linea(38, 34, 38, 31, K); linea(38, 34, 41, 35, K); rect(34, 44, 42, 58, K); rect(35, 45, 41, 57, hex('#2a1a14')); poligono([[29, 25], [38, 19], [47, 25]], K); poligono([[31, 24], [38, 21], [45, 24]], D.friso);
  // el piano vertical: tapa, el panel calado con la seda roja, el atril con la partitura, el teclado, los candeleros y las patas
  rect(12, 68, 64, 125, K); rect(13, 69, 63, 124, D.piano); rect(13, 69, 63, 70, D.pianoL); rect(10, 66, 66, 69, K); rect(11, 67, 65, 68, D.pianoL);
  rect(17, 73, 59, 88, D.pianoS); for (let y = 74; y < 88; y++) for (let x = 18; x < 59; x++) if ((Math.abs(((x - 18) % 8) - 4) + Math.abs(((y - 74) % 7) - 3)) > 3) pset(x, y, hex('#8a2a2a')); else pset(x, y, D.pianoL);
  rect(24, 80, 52, 90, K); rect(25, 81, 37, 89, D.marfil); rect(39, 81, 51, 89, D.marfil); for (let y = 83; y < 89; y += 2) { linea(26, y, 36, y, D.marfilS); linea(40, y, 50, y, D.marfilS); } pset(30, 84, K); pset(33, 86, K); pset(44, 85, K); pset(47, 83, K);
  rect(12, 93, 64, 96, K); rect(13, 94, 63, 95, D.pianoL); rect(13, 96, 63, 100, D.marfil); for (let x = 15; x < 63; x += 3) rect(x, 96, x, 100, D.marfilS); for (let x = 16; x < 62; x += 3) if ((x / 3 | 0) % 7 !== 2 && (x / 3 | 0) % 7 !== 6) rect(x, 96, x + 1, 98, K);
  rect(12, 101, 64, 103, K); rect(13, 101, 63, 102, D.piano); d_cuarteron(R, 17, 105, 36, 119, D.piano, D.pianoL, D.pianoS, D.pianoS, 5); d_cuarteron(R, 40, 105, 59, 119, D.piano, D.pianoL, D.pianoS, D.pianoS, 6);
  for (const px of [15, 61]) { rect(px - 1, 101, px + 1, 124, K); rect(px, 102, px, 123, D.pianoL); }
  for (const cx of [10, 66]) { rect(cx - 2, 80, cx + 2, 81, C.oro); rect(cx, 74, cx, 79, D.marfil); pset(cx, 73, d_C.mecha); }
  rect(44, 58, 56, 66, K); rect(45, 59, 55, 65, C.oro); rect(46, 60, 54, 64, hex('#a89a7a')); disco(50, 62, 1.5, hex('#5a4a3a'));
  rect(14, 56, 20, 66, K); rect(15, 57, 19, 65, hex('#4a7ab0')); pset(15, 57, C.blanco); for (const [dx, dy, c] of [[-2, -2, '#e8c040'], [0, -4, '#f6f0e0'], [2, -2, '#c84a4a'], [1, -1, '#5a9a4a']]) disco(17 + dx, 54 + dy, 1.5, hex(c));
  // una lámina enmarcada de animales a la izquierda del reloj y otra de la granja junto a la estufa
  d_marco(R, 4, 28, 24, 52, 2); for (let y = 31; y < 50; y++) for (let x = 7; x < 22; x++) pset(x, y, y > 44 ? hex('#8aa860') : hex('#e8e0c8')); rect(10, 40, 17, 44, hex('#c8c8c8')); rect(15, 37, 18, 40, hex('#c8c8c8')); pset(17, 38, K); for (const lx of [10, 12, 15, 17]) rect(lx, 45, lx, 46, K);
  d_marco(R, 50, 30, 66, 50, 2); for (let y = 33; y < 48; y++) for (let x = 53; x < 64; x++) pset(x, y, y > 43 ? hex('#7a9a50') : hex('#a8c8e0')); rect(55, 38, 61, 43, hex('#a83a2a')); R.poligono([[54, 38], [58, 34], [62, 38]], hex('#6a2a1a')); rect(57, 40, 58, 43, hex('#3a2418'));
  // la estufa de hierro con su tubo, el codo y la tetera; el ladrillo refractario detrás
  rect(176, 92, 198, 126, hex('#8a4a3a')); for (let y = 92; y < 126; y += 3) for (let x = 176 + (y % 6 ? 0 : 3); x < 198; x += 6) rect(x, y, x + 4, y + 1, hex('#a85a44'));
  rect(185, 10, 189, 102, K); rect(186, 10, 188, 102, D.hierro); rect(186, 10, 186, 102, D.hierroL); rect(183, 40, 191, 42, K); rect(184, 41, 190, 41, D.hierroL);
  disco(187, 112, 9, K); disco(187, 112, 8, D.hierro); disco(185, 110, 4, D.hierroL); rect(180, 100, 194, 104, K); rect(181, 101, 193, 103, D.hierroL); rect(183, 113, 191, 117, K); rect(184, 114, 190, 116, hex('#3a2a2a'));
  for (const lx of [181, 193]) rect(lx, 119, lx + 1, 126, K); rect(182, 96, 192, 100, K); rect(183, 97, 191, 99, D.hierroL); disco(194, 94, 3, K); disco(194, 94, 2, hex('#8a8a96')); linea(197, 93, 199, 91, K);
  // las dos ventanas de guillotina con el alféizar, las macetas de geranios y la pecera (lo de fuera va en la vida)
  for (const [x0, x1] of [[202, 236], [244, 276]]) { rect(x0 - 3, 21, x1 + 3, 96, K); rect(x0 - 2, 22, x1 + 2, 95, C.blanco); rect(x1 + 1, 22, x1 + 2, 95, hex('#c8c8c0')); rect(x0, 24, x1, 92, hex('#7ab0e0'));
    rect(x0 - 5, 93, x1 + 5, 97, K); rect(x0 - 4, 94, x1 + 4, 95, C.blanco); rect(x0 - 4, 96, x1 + 4, 96, hex('#c8c8c0')); }
  // el perchero de la pared derecha con abrigos y sombreros pequeños; la jaula del canario cuelga de su gancho
  rect(282, 70, 316, 73, K); rect(283, 71, 315, 72, D.frisoL); for (const [cx, c, sh] of [[287, '#3e6aa8', '#e8c060'], [298, '#c84a4a', '#5a3418'], [309, '#5a8a4a', '#e8c060']]) { rect(cx - 3, 74, cx + 3, 92, K); rect(cx - 2, 75, cx + 2, 91, hex(c)); rect(cx, 75, cx, 91, d_mez(hex(c), K, 0.3)); rect(cx - 4, 68, cx + 4, 70, K); rect(cx - 3, 68, cx + 3, 69, hex(sh)); rect(cx - 2, 66, cx + 2, 67, hex(sh)); }
  linea(298, 46, 298, 50, K);
  // el suelo de tablas en perspectiva (fugan hacia el centro), con sus juntas, nudos y el círculo de juegos pintado
  for (let y = 125; y < 180; y++) { const v = (y - 125) / 55; for (let x = 0; x < 320; x++) { const X = (x - 160) / (0.55 + v * 0.9), tabla = Math.floor((X + 400) / 11), u = ((X + 400) % 11);
    let c = [D.tablaK, D.tablaKL, D.tablaK, D.tablaKS][Math.floor(h(tabla, 0, 245) * 4)]; if (u < 0.9) c = D.frisoS; else if (((y * 3 + tabla * 37) % 60) === 0) c = D.frisoS; else if (h(x, y, 246) < 0.06) c = D.tablaKS; else if (h(x >> 1, y, 247) > 0.96) c = D.tablaKL; pset(x, y, c); } }
  for (let a = 0; a < Math.PI * 2; a += 0.004) { const x = Math.round(150 + Math.cos(a) * 66), y = Math.round(146 + Math.sin(a) * 11); if (h(x, y, 248) > 0.15) { pset(x, y, hex('#f0e8d4')); if (Math.sin(a) > 0) pset(x, y + 1, hex('#e0d4b8')); } }
  for (let y = 124; y < 140; y++) for (let x = 200; x < 280; x++) if ((x + y) % 2 === 0 && x - 200 > (y - 124) * 1.4 && x - 200 < (y - 124) * 1.4 + 60) d_aclara(R, x, y, 0.18, hex('#fff4d0'));
  // los bloques de madera de Froebel en el suelo
  for (const [bx, by, c] of [[112, 152, '#c84a4a'], [118, 154, '#e8b030'], [115, 148, '#3e6aa8'], [188, 156, '#5a9a4a'], [194, 157, '#e8e0c8'], [76, 132, '#e07a30']]) { rect(bx - 3, by - 3, bx + 3, by + 3, K); rect(bx - 2, by - 2, bx + 2, by + 2, hex(c)); rect(bx - 2, by - 2, bx + 2, by - 2, d_mez(hex(c), C.blanco, 0.4)); rect(bx + 2, by - 1, bx + 2, by + 2, d_mez(hex(c), K, 0.3)); }
  // la banqueta del piano, redonda, con patas de garra
  rect(39, 126, 53, 129, K); rect(40, 126, 52, 128, D.pianoL); rect(40, 126, 52, 126, hex('#8a5040')); rect(45, 129, 47, 133, K); for (const lx of [41, 51]) linea(46, 132, lx, 136, K);
}

// las dos mesas bajas de los niños (capa transparente fija)
function d_kinderMesas(R) {
  const { rect, pset } = R, D = d_C, K = C.k;
  for (const [a, b] of [[14, 104], [206, 300]]) { rect(a, 156, b, 161, K); rect(a + 1, 157, b - 1, 158, D.tablaKL); rect(a + 1, 159, b - 1, 160, D.tablaK); rect(a + 3, 161, b - 3, 166, K); rect(a + 4, 161, b - 4, 165, D.friso); rect(a + 4, 161, b - 4, 161, D.frisoS);
    for (const lx of [a + 4, b - 6]) { rect(lx, 166, lx + 2, 177, K); rect(lx + 1, 166, lx + 1, 176, D.frisoL); }
    for (let x = a + 6; x < b - 6; x += 15) { rect(x, 153, x + 8, 156, K); rect(x + 1, 154, x + 7, 155, C.blanco); pset(x + 2 + (x % 3), 154, hex('#3e6aa8')); pset(x + 5, 155, hex('#c84a4a')); }
    rect(a + 10, 151, a + 13, 156, K); rect(a + 11, 152, a + 12, 155, hex('#e8b030')); }
}

function d_kinderVida(R, t, o) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  // por las ventanas: el cielo de primavera, los árboles, la acera de enfrente y un coche de caballos que pasa
  for (const [x0, x1, k] of [[202, 236, 0], [244, 276, 1]]) {
    d_cielo(R, x0, 24, x1, 92, t, 'primavera', 5 + k);
    rect(x0, 70, x1, 92, hex('#b8a888')); for (let x = x0; x <= x1; x++) { pset(x, 70, hex('#d0c4a8')); if (x % 9 === 0) rect(x, 62, x + 6, 69, hex('#a86a4a')); }
    d_arbolHojas(R, k ? 262 : 214, 74, 9, t, k);
    const u = ((t * 0.09) % 1.4) - 0.2, cx = Math.round(196 + u * 110); if (u > -0.1 && u < 1.2) { rect(cx - 9, 76, cx + 1, 83, K); rect(cx - 8, 77, cx, 82, hex('#3a3a4a')); disco(cx - 6, 85, 3, K); disco(cx - 2, 85, 3, K); rect(cx + 2, 77, cx + 12, 82, hex('#6a4a2a')); rect(cx + 10, 73, cx + 13, 77, hex('#6a4a2a')); const pa = Math.floor(t * 6) % 2; rect(cx + 3 + pa, 83, cx + 3 + pa, 88, K); rect(cx + 10 - pa, 83, cx + 10 - pa, 88, K); rect(cx - 7, 73, cx - 4, 76, hex('#2a2a34')); }
    R.recorte(null);
    // la guillotina: el travesaño del medio y los junquillos de los seis vidrios por hoja
    rect(x0, 57, x1, 59, C.blanco); rect(x0, 59, x1, 59, hex('#c8c8c0')); const xm = (x0 + x1) >> 1; for (const xx of [x0 + Math.round((x1 - x0) / 3), x0 + Math.round((x1 - x0) * 2 / 3)]) rect(xx, 24, xx, 92, C.blanco); rect(x0, 40, x1, 40, C.blanco); rect(x0, 75, x1, 75, C.blanco); void xm;
    for (let y = 26; y < 56; y++) if ((y + k * 3) % 9 === 0) pset(x0 + 3 + (y % 4), y, hex('#e8f4ff'));
  }
  // la guirnalda de cadeneta de papel de colores, colgada de lado a lado de las ventanas, que se mece
  for (let i = 0; i < 46; i++) { const u = i / 45, x = Math.round(176 + u * 100), y = Math.round(16 + Math.sin(u * Math.PI) * 7 + Math.sin(t * 1.2 + u * 3) * 0.8), c = hex(['#c84a4a', '#e8b030', '#3e6aa8', '#5a9a4a', '#8a4a8a'][Math.floor(i / 2) % 5]); if (i % 2) { pset(x, y - 1, c); pset(x, y + 1, c); } else { pset(x, y, c); pset(x + 1, y, c); } }
  // los geranios y la pecera del alféizar (el pez da vueltas)
  for (const px of [206, 222, 250]) { rect(px - 3, 87, px + 3, 93, K); rect(px - 2, 88, px + 2, 92, hex('#b85a3a')); rect(px - 2, 88, px + 2, 88, hex('#d87a4a')); const m = Math.round(Math.sin(t * 1.3 + px) * 0.6); disco(px + m, 84, 3.4, hex('#3e7a34')); disco(px + m - 1, 83, 2, hex('#5a9a4a')); for (const [dx, dy] of [[-2, -2], [1, -3], [2, 0]]) pset(px + dx + m, 84 + dy, hex('#e83a4a')); }
  disco(268, 87, 6, K); disco(268, 87, 5, hex('#a8d0e8')); rect(263, 82, 273, 83, hex('#d0e8f4')); { const a = t * 1.4, fx = Math.round(268 + Math.cos(a) * 3), fy = Math.round(88 + Math.sin(a * 2) * 1); pset(fx, fy, hex('#f08020')); pset(fx - Math.sign(Math.cos(a + 1.57)), fy, hex('#f0a040')); } pset(265, 84, C.blanco);
  // el canario salta en su jaula
  { const cx = 298, cy = 58; R.disco(cx, cy - 7, 2, K); for (let x = cx - 7; x <= cx + 7; x += 2) linea(x, cy - 6 + Math.round(Math.abs(x - cx) * 0.3), x, cy + 6, hex('#c8a040')); rect(cx - 8, cy + 6, cx + 8, cy + 8, K); rect(cx - 7, cy + 6, cx + 7, cy + 7, hex('#c8a040')); rect(cx - 6, cy + 1, cx + 6, cy + 1, hex('#8a6a3a'));
    const s = (t % 2.2) < 0.25 ? -2 : 0, d = Math.floor(t / 2.2) % 2 ? 1 : -1, bx = cx + d * 2; disco(bx, cy - 2 + s, 2, hex('#f0d030')); pset(bx + d * 2, cy - 3 + s, hex('#e88a20')); pset(bx + d, cy - 3 + s, K); pset(bx - d * 2, cy - 1 + s, hex('#c8a020')); }
  // el péndulo del reloj y el metrónomo del piano
  { const a = Math.sin(t * Math.PI) * 0.3; linea(38, 46, Math.round(38 + Math.sin(a) * 10), 55, C.oroS); disco(38 + Math.sin(a) * 10, 55, 1.5, C.oro); }
  { rect(23, 56, 31, 67, K); R.poligono([[24, 66], [27, 57], [30, 66]], hex('#6a3a24')); const a = Math.sin(t * 4.2) * 0.5; linea(27, 64, Math.round(27 + Math.sin(a) * 7), Math.round(64 - Math.cos(a) * 7), C.oroL); }
  // el vaho de la tetera de la estufa
  for (let k = 0; k < 5; k++) { const u = ((t * 0.5 + k * 0.2) % 1); pset(200 + Math.round(u * 4 + Math.sin(t * 2 + k) * 1.5), 90 - Math.round(u * 12), u < 0.6 ? C.blanco : hex('#e0d8c8')); }
  // el caballito de madera se mece junto a la estufa
  { const a = Math.sin(t * 2.1) * 0.12, cx = 214, cy = 136, rot = (x, y) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
    for (let i = -14; i <= 14; i++) { const [x, y] = rot(cx + i, cy + 6 - Math.round(Math.cos(i / 14 * 1.3) * 4)); pset(x, y, K); pset(x, y - 1, hex('#8a2a2a')); }
    for (const [x0, y0, x1, y1] of [[cx - 7, cy + 2, cx - 6, cy - 6], [cx + 7, cy + 2, cx + 6, cy - 6]]) { const [a0, b0] = rot(x0, y0), [a1, b1] = rot(x1, y1); linea(a0, b0, a1, b1, K); }
    const [bx, by] = rot(cx, cy - 9); disco(bx, by, 6.5, K); disco(bx, by, 5.5, hex('#e8dcc0')); for (let k = 0; k < 5; k++) pset(bx - 4 + k * 2, by - 1 + (k % 2), hex('#5a7ab0'));
    const [hx, hy] = rot(cx + 9, cy - 15); disco(hx, hy, 3.6, K); disco(hx, hy, 2.8, hex('#e8dcc0')); pset(hx + 1, hy - 1, K); const [mx, my] = rot(cx + 5, cy - 16); linea(mx, my, mx - 3, my + 4, hex('#8a5a32')); const [ox, oy] = rot(cx - 7, cy - 10); linea(ox, oy, ox - 4, oy + 5, hex('#8a5a32')); rect(bx - 2, by - 6, bx + 2, by - 5, hex('#c84a4a')); }
  // la luz de la mañana que cae por las ventanas, con motas de polvo
  for (let k = 0; k < 10; k++) { const fy = (h(k, 3, 250) * 50 + t * (2 + h(k, 4, 250) * 3)) % 50, x = Math.round(200 + fy * 1.2 + h(k, 5, 250) * 30), y = Math.round(92 + fy * 0.8); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
  // los niños, sentados detrás de sus mesas bajas, cantan (salvo con o.canta false)
  if (o.ninos !== false) { const canta = o.canta !== false; for (let i = 0; i < 6; i++) { d_nino(R, 18 + i * 14, 144, t, i, canta); d_nino(R, 211 + i * 14, 144, t, i + 3, canta); }
    const mano = Math.floor(t / 3) % 2; if (mano) { const x = 18 + 2 * 14 + 8; rect(x, 139, x, 146, K); rect(x + 1, 138, x + 1, 146, d_PIEL); } }
}

function d_kinderMesasVida(R, t) { d_pegar(R, d_capa(R, 'D|kinderMesas', () => d_kinderMesas(R), true), 14, 150, 300, 178); }

// el piano de cerca: la pared de yeso y el zócalo, la ventana de la derecha con su luz, la tapa con el metrónomo, el jarrón
// y los retratos, el panel calado de seda, el atril con la partitura, los candeleros, el teclado y el zócalo del piano
function d_pianoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  d_textura(R, 0, 0, 319, 122, D.yesoK, D.yesoKL, D.yesoKS, 251, 0.05, 0.1);
  for (let x = 0; x < 320; x++) { const u = x % 6; for (let y = 122; y < 172; y++) pset(x, y, u === 0 ? D.frisoS : u === 1 ? D.frisoL : h(x, y, 252) < 0.1 ? D.frisoS : D.friso); } rect(0, 120, 319, 122, K); rect(0, 121, 319, 121, D.frisoL);
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 13 === 0 ? D.frisoS : h(x, y, 253) < 0.1 ? D.tablaKS : D.tablaK);
  rect(277, 47, 319, 154, K); rect(278, 48, 319, 153, C.blanco); rect(280, 50, 319, 150, hex('#7ab0e0'));
  // el cuadro de la izquierda: una lámina de niños jugando al corro (siluetas)
  d_marco(R, 4, 30, 30, 70, 2); for (let y = 33; y < 68; y++) for (let x = 7; x < 28; x++) pset(x, y, y > 58 ? hex('#8aa860') : hex('#d8e4e8')); for (let i = 0; i < 4; i++) { const x = 9 + i * 5; rect(x, 52, x + 2, 58, hex(['#c84a4a', '#3e6aa8', '#e8b030', '#5a9a4a'][i])); disco(x + 1, 50, 1.4, d_PIEL); }
  // el cuerpo del piano
  rect(28, 30, 264, 176, K); rect(29, 31, 263, 175, D.piano); rect(24, 26, 268, 31, K); rect(25, 27, 267, 29, D.pianoL); rect(25, 27, 267, 27, hex('#8a5040'));
  for (let x = 29; x < 264; x++) for (let y = 31; y < 176; y++) if (h(x, y, 254) < 0.05) pset(x, y, D.pianoL);
  for (const px of [34, 252]) { rect(px, 34, px + 6, 140, D.pianoS); rect(px + 1, 34, px + 2, 140, D.pianoL); for (let y = 40; y < 138; y += 14) { rect(px, y, px + 6, y + 1, D.pianoS); pset(px + 3, y + 6, C.oroS); } }
  rect(44, 36, 248, 96, D.pianoS); for (let y = 37; y < 96; y++) for (let x = 45; x < 248; x++) { const a = Math.abs(((x - 45) % 16) - 8) + Math.abs(((y - 37) % 14) - 7), b2 = Math.hypot(((x - 45) % 16) - 8, ((y - 37) % 14) - 7); pset(x, y, a > 7 || b2 < 2.2 ? D.pianoL : (((x + y) & 1) && a > 5) ? hex('#6a1a1a') : hex('#8a2a2a')); }
  rect(44, 36, 248, 37, D.pianoL); rect(44, 95, 248, 96, hex('#1a0a06'));
  // el atril y la partitura abierta: pentagramas con notas (sin letras)
  rect(84, 98, 208, 141, K); rect(85, 99, 207, 140, D.pianoL); rect(85, 136, 207, 140, D.piano); for (let x = 88; x < 206; x += 8) rect(x, 100, x + 3, 134, hex('#7a4432'));
  for (const [a, b] of [[94, 146], [148, 200]]) { rect(a, 102, b, 136, K); rect(a + 1, 103, b - 1, 135, D.marfil); rect(b - 2, 103, b - 1, 135, D.marfilS);
    for (let st = 0; st < 4; st++) { const y0 = 107 + st * 7; for (let l = 0; l < 5; l++) linea(a + 3, y0 + l, b - 3, y0 + l, l % 2 ? D.marfilS : hex('#b8ac94')); }
    for (let st = 0; st < 4; st++) for (let n = 0; n < 6; n++) { const nx = a + 7 + n * 8, ny = 107 + st * 7 + Math.floor(h(n, st + a, 255) * 5); disco(nx, ny + 0.5, 1.3, K); linea(nx + 1, ny, nx + 1, ny - 5, K); if (n % 2 === 0) linea(nx + 1, ny - 5, nx + 9, ny - 5, K); } }
  // los dos candeleros de brazo con sus velas (apagadas: es de día)
  for (const cx of [66, 226]) { linea(cx, 118, cx + (cx < 160 ? -12 : 12), 112, C.oroS); disco(cx, 118, 3, K); disco(cx, 118, 2, C.oro); const vx = cx + (cx < 160 ? -12 : 12); rect(vx - 3, 108, vx + 3, 112, K); rect(vx - 2, 109, vx + 2, 111, C.oro); rect(vx - 1, 94, vx + 1, 108, D.cera); rect(vx + 1, 95, vx + 1, 108, D.ceraS); pset(vx, 93, d_C.mecha); }
  // el teclado: la regleta, cuarenta y cinco teclas blancas con su sombra, las negras con su brillo, y la tapa abatida
  rect(44, 142, 248, 147, K); rect(45, 143, 247, 146, D.pianoL); rect(45, 143, 247, 143, hex('#8a5040'));
  rect(48, 148, 244, 160, K); for (let i = 0; i < 49; i++) { const x = 49 + i * 4; rect(x, 148, x + 2, 159, D.marfil); rect(x + 2, 149, x + 2, 159, D.marfilS); rect(x, 159, x + 2, 159, D.marfilS); }
  for (let i = 0; i < 48; i++) { const n = i % 7; if (n === 2 || n === 6) continue; const x = 51 + i * 4; rect(x, 148, x + 2, 154, K); pset(x + 1, 149, D.pianoL); }
  rect(44, 160, 248, 164, K); rect(45, 161, 247, 163, D.piano); rect(45, 161, 247, 161, D.pianoL);
  d_cuarteron(R, 50, 166, 140, 175, D.piano, D.pianoL, D.pianoS, D.pianoS, 9); d_cuarteron(R, 152, 166, 242, 175, D.piano, D.pianoL, D.pianoS, D.pianoS, 10); for (const px of [128, 164]) { rect(px - 2, 172, px + 2, 176, C.oroS); rect(px - 1, 172, px + 1, 175, C.oro); }
  // encima: el jarrón con lilas, los retratos y el metrónomo (lejos de la barra del año)
  rect(176, 10, 186, 26, K); rect(177, 11, 185, 25, hex('#c8dce8')); rect(177, 11, 178, 25, C.blanco); for (const [dx, dy, c] of [[-4, -3, '#b88ad8'], [0, -6, '#d8b8f0'], [4, -2, '#b88ad8'], [-2, -1, '#5a9a4a'], [3, -5, '#f6f0e0']]) { disco(181 + dx, 9 + dy, 2.4, K); disco(181 + dx, 9 + dy, 1.8, hex(c)); }
  rect(198, 14, 214, 26, K); rect(199, 15, 213, 25, C.oro); rect(201, 17, 211, 24, hex('#b8a888')); disco(206, 20, 2, hex('#5a4a3a')); rect(204, 22, 208, 24, hex('#5a4a3a'));
  rect(90, 16, 104, 26, K); rect(91, 17, 103, 25, hex('#4a3a2a')); rect(93, 19, 101, 24, hex('#c8b898')); disco(97, 21, 1.5, hex('#6a5a4a'));
}

function d_pianoVida(R, t, o) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  d_cielo(R, 280, 50, 319, 150, t, 'primavera', 9); d_arbolHojas(R, 300, 150, 16, t, 3); R.recorte(null);
  rect(278, 98, 319, 100, C.blanco); rect(296, 50, 297, 150, C.blanco); rect(278, 100, 319, 100, hex('#c8c8c0'));
  // la luz de la ventana sobre la pared y el piano, con motas de polvo
  for (let y = 40; y < 172; y++) { const x0 = 276 - (y - 40) * 0.9; for (let x = Math.round(x0 - 26); x < x0; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.14, hex('#fff4d0')); }
  for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 256) * 120 + t * (2 + h(k, 4, 256) * 3)) % 120, x = Math.round(262 - fy * 0.9 - h(k, 5, 256) * 26 + Math.sin(t * 0.7 + k) * 2), y = Math.round(44 + fy); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
  // el metrónomo: la pirámide de madera y el péndulo que va y viene
  { rect(226, 4, 244, 27, K); R.poligono([[228, 26], [235, 6], [242, 26]], hex('#6a3a24')); R.poligono([[230, 25], [235, 10], [236, 25]], hex('#8a5a3a')); const a = Math.sin(t * 4.2) * 0.45; linea(235, 23, Math.round(235 + Math.sin(a) * 15), Math.round(23 - Math.cos(a) * 15), C.oroL); disco(235 + Math.sin(a) * 10, 23 - Math.cos(a) * 10, 1.4, C.oro); }
  // las teclas que se hunden mientras toca y las notas que suben (o.toca, o.notas)
  if (o.toca) for (let k = 0; k < 4; k++) { const i = Math.floor(h(Math.floor(t * 5 + k * 0.25), k, 257) * 30) + 8, x = 49 + i * 4; rect(x, 148, x + 2, 159, D.marfilS); rect(x, 158, x + 2, 159, hex('#8a8070')); }
  if (o.notas) for (let k = 0; k < 4; k++) { const u = ((t * 0.35 + k * 0.25) % 1), x = Math.round(120 + k * 18 + Math.sin(t * 2 + k) * 6), y = Math.round(100 - u * 70); if (u > 0.85) continue; const c = u < 0.6 ? K : D.pianoL;
    disco(x, y, 2, c); linea(x + 2, y, x + 2, y - 7, c); linea(x + 2, y - 7, x + 5, y - 5, c); }
}

function d_kinderFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|kinder', () => d_kinderFijo(R))); d_kinderVida(R, t, o); return; }
  R.copiar(d_capa(R, 'D|piano', () => d_pianoFijo(R))); d_pianoVida(R, t, o);
}

function d_kinderDelante(R, t, o, cam) { if (cam === 'general') d_kinderMesasVida(R, t); }

// la bandera de EE. UU. colgada de su mástil sin viento: cae en pliegues que se mecen con el aire acondicionado
function d_banderaColgada(R, x0, y0, W, H, t, dir = 1) {
  const RJ = [C.rojo, C.rojoS, hex('#e05a5a')], BL = [C.blanco, hex('#cfc8bc'), hex('#ffffff')], AZ = [hex('#2a4a9a'), hex('#1c3470'), hex('#3a5ab0')];
  for (let i = 0; i < W; i++) { const f = Math.sin(i * 0.9 + Math.sin(t * 0.6 + x0) * 0.9), l = f > 0.4 ? 2 : f < -0.4 ? 1 : 0, x = x0 + i * dir, alto = H + Math.round(f * 1.2) - Math.round(i * 0.12);
    R.pset(x, y0 - 1, C.k);
    for (let j = 0; j < alto; j++) { const c = i < Math.round(W * 0.45) && j < Math.round(H * 0.5) ? (i % 2 === 1 && j % 3 === 1 ? BL : AZ) : Math.floor(j / 2) % 2 ? BL : RJ; R.pset(x, y0 + j, c[l]); }
    R.pset(x, y0 + alto, i % 2 ? C.oro : C.oroS); }
}

// el mástil dorado con su punta, la peana y el cordón con la borla
function d_mastil(R, x, y0, y1, t) {
  const { rect, poligono, pset, linea, disco } = R;
  rect(x - 3, y1 - 4, x + 4, y1, C.k); rect(x - 2, y1 - 4, x + 3, y1 - 1, C.oroS); rect(x - 2, y1 - 4, x + 3, y1 - 4, C.oro); rect(x, y0, x + 1, y1 - 4, C.oroS); rect(x, y0, x, y1 - 4, C.oro);
  poligono([[x - 2, y0 - 1], [x + 0.5, y0 - 8], [x + 3, y0 - 1]], C.k); poligono([[x - 1, y0 - 2], [x + 0.5, y0 - 6], [x + 2, y0 - 2]], C.oro); disco(x + 0.5, y0, 2, C.k); disco(x + 0.5, y0, 1, C.oro);
  const b = Math.round(Math.sin(t * 0.8 + x) * 1.2); linea(x, y0 + 2, x - 3 + b, y0 + 18, C.oroS); rect(x - 4 + b, y0 + 18, x - 2 + b, y0 + 22, C.oro);
}

// el sello del tribunal: aro dorado con cuentas, campo azul con estrellas y la balanza; un brillo recorre el aro
function d_sello(R, sx, sy, r, t) {
  const { disco, pset } = R;
  disco(sx, sy, r + 1, C.k); disco(sx, sy, r, (x, y) => (x + y < sx + sy - r * 0.4 ? C.oroL : x + y > sx + sy + r * 0.5 ? C.oroS : C.oro));
  for (let k = 0; k < 30; k++) { const a = k / 30 * Math.PI * 2; pset(Math.round(sx + Math.cos(a) * (r - 2.5)), Math.round(sy + Math.sin(a) * (r - 2.5)), C.oroS); }
  disco(sx, sy, r - 4, C.k); disco(sx, sy, r - 5, (x, y, d) => (d > 0.82 ? hex('#1e2c66') : hex('#26387a')));
  for (let k = 0; k < 13; k++) { const a = -Math.PI / 2 + (k - 6) * 0.33; pset(Math.round(sx + Math.cos(a) * (r - 7.5)), Math.round(sy + Math.sin(a) * (r - 7.5)), C.blanco); }
  R.icono('balanza', sx - 3, sy - 3, C.oroL, C.k, 1);
  const g = (t % 5.5) / 1.1; if (g < 1) { const a = -2.4 + g * Math.PI * 2, gx = Math.round(sx + Math.cos(a) * (r - 1)), gy = Math.round(sy + Math.sin(a) * (r - 1)); pset(gx, gy, C.blanco); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pset(gx + dx, gy + dy, C.oroL); }
}

// la pared de paneles de arce: retícula de juntas en sombra, vetas y la luz de los focos
function d_paredArce(R, x0, y0, x1, y1, k = 0, paso = 24) {
  const { pset } = R, D = d_C;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) % paso, v = (y - y0) % 30, n = h(x, y >> 2, 260 + k), veta = Math.sin(x * 0.9 + Math.sin(y * 0.05 + x) * 2) > 0.85;
    pset(x, y, u === 0 || v === 0 ? D.arceD : u === 1 || v === 1 ? D.arceL : veta ? D.arceS : n < 0.08 ? D.arceS : n > 0.95 ? D.arceL : D.arce); }
}

const d_ABOG = [['calvo', tela('#2a2a36', '#1c1c26', { W: '#8c8ca0', S: '#e0a878', s: '#b87a4a' })], ['mujer', tela('#3a4a7a', '#2a3660', { V: '#1c1424', H: '#3a3046', S: '#a8704a', s: '#7e4e30' })], ['rizos', tela('#4a4a5a', '#36364a', { H: '#6a3a1a', h: '#8a5428' })], ['mujer', tela('#7a2a3a', '#5a1e2a', { V: '#c8a060', H: '#e0c080' })], ['calvo', tela('#2a3a4a', '#1e2a36', { W: '#2c2232', S: '#8a5a3a', s: '#6a4028' })], ['rizos', tela('#5a5a6a', '#46465a', { H: '#c8a060', h: '#e0c080' })]];

function d_juzgadoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  // el techo de placas con los focos empotrados
  rect(0, 0, 319, 9, D.paredJ); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 9, D.paredJS); rect(0, 4, 319, 4, D.paredJS); for (const fx of [50, 110, 210, 260]) { rect(fx - 6, 6, fx + 6, 9, K); rect(fx - 5, 7, fx + 5, 8, C.blanco); }
  rect(0, 10, 319, 11, D.arceD);
  // la pared de arce, el muro de nogal detrás del estrado y las dos ventanas altas
  d_paredArce(R, 0, 12, 319, 110, 0);
  rect(98, 12, 222, 72, K); for (let y = 13; y < 72; y++) for (let x = 99; x < 222; x++) { const u = (x - 99) % 6; pset(x, y, u === 0 ? hex('#4a2c18') : u === 1 ? hex('#8a5a34') : h(x, y >> 1, 262) < 0.1 ? hex('#5a3820') : hex('#6e4426')); }
  for (let y = 13; y < 60; y++) for (let x = 120; x < 201; x++) if ((x + y) % 2 === 0 && ((x - 160) / 40) ** 2 + ((y - 13) / 46) ** 2 < 1) d_aclara(R, x, y, 0.1, hex('#ffd690'));
  for (const [x0, x1] of [[10, 62], [230, 270]]) { rect(x0 - 2, 14, x1 + 2, 36, K); rect(x0 - 1, 15, x1 + 1, 35, hex('#c8c8cc')); rect(x0, 16, x1, 34, hex('#5a9ae0')); rect(x0 - 3, 36, x1 + 3, 38, hex('#a8a8b0')); }
  // el monitor de las pruebas en su brazo, debajo de la ventana
  rect(12, 40, 64, 72, K); rect(13, 41, 63, 71, hex('#2a2a32')); rect(15, 43, 61, 69, hex('#101820')); rect(36, 72, 40, 76, hex('#4a4a52'));
  // el mástil y la bandera, a la izquierda del estrado
  // (se pintan en la vida, porque se mecen)
  // la puerta del fondo a la derecha, con su ventanita, y el pictograma de salida encima
  rect(262, 48, 292, 112, K); rect(263, 49, 291, 111, D.arceS); d_cuarteron(R, 266, 52, 276, 108, D.arce, D.arceL, D.arceD, D.arceS, 4); rect(279, 54, 288, 76, K); rect(280, 55, 287, 75, hex('#c8d8e0')); rect(280, 84, 282, 88, C.oroS); rect(280, 84, 281, 84, C.oro);
  rect(270, 41, 284, 46, K); rect(271, 42, 283, 45, hex('#2a8a4a')); linea(274, 43, 280, 43, C.blanco); pset(279, 42, C.blanco); pset(279, 44, C.blanco);
  // el sillón alto del juez, de cuero negro con botones
  rect(144, 40, 176, 74, K); rect(145, 41, 175, 74, D.cueroJ); rect(145, 41, 175, 42, D.cueroJL); rect(174, 43, 175, 74, hex('#1e1e26')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const bx = 150 + i * 6 + (j % 2) * 3, by = 46 + j * 6; pset(bx, by, hex('#1e1e26')); pset(bx - 1, by - 1, D.cueroJL); }
  // el estrado elevado: tapa con vuelo, el monitor del juez de espaldas, el micrófono, la placa sin letras y el frente
  rect(116, 60, 128, 72, K); rect(117, 61, 127, 71, hex('#3a3a44')); rect(120, 72, 124, 74, hex('#3a3a44'));
  // el banco de los testigos con su silla y el micrófono; la taquígrafa con la estenotipia; el secretario con su pantalla
  rect(70, 76, 100, 108, K); rect(71, 77, 99, 108, D.arceS); rect(68, 74, 102, 78, K); rect(69, 75, 101, 76, D.arceL); d_cuarteron(R, 74, 81, 84, 104, D.arce, D.arceL, D.arceD, D.arceS, 6); d_cuarteron(R, 87, 81, 97, 104, D.arce, D.arceL, D.arceD, D.arceS, 7);
  rect(80, 64, 92, 74, K); rect(81, 65, 91, 74, D.cueroJ); linea(96, 74, 96, 68, K); linea(96, 68, 93, 66, K);
  rect(222, 82, 258, 108, K); rect(223, 83, 257, 108, D.arceS); rect(220, 80, 260, 84, K); rect(221, 81, 259, 82, D.arceL); d_cuarteron(R, 226, 88, 240, 104, D.arce, D.arceL, D.arceD, D.arceS, 8); d_cuarteron(R, 242, 88, 256, 104, D.arce, D.arceL, D.arceD, D.arceS, 9);
  rect(244, 68, 258, 80, K); rect(245, 69, 257, 79, hex('#1a2a44')); rect(250, 80, 251, 81, hex('#3a3a44'));
  // la moqueta azul con su dibujo de cuadritos y la luz de los focos
  for (let y = 108; y < 180; y++) { const v = (y - 108) / 72; for (let x = 0; x < 320; x++) { const X = Math.floor((x - 160) / (4 + v * 6)), Y = Math.floor((y - 108) / (2 + v * 4)); pset(x, y, (X + Y) % 5 === 0 ? D.moqJL : h(x, y, 263) < 0.08 ? D.moqJS : D.moqJ); } }
  rect(0, 108, 319, 109, D.moqJS); for (const fx of [110, 210]) for (let y = 120; y < 140; y++) for (let x = fx - 40; x <= fx + 40; x++) if ((x + y) % 2 === 0 && ((x - fx) / 40) ** 2 + ((y - 130) / 9) ** 2 < 1) d_aclara(R, x, y, 0.12, hex('#c8d8f0'));
  rect(0, 108, 319, 108, K);
}

// lo de delante en la sala: el frente del estrado (que tapa al juez de pecho para abajo), las mesas de las partes con lo
// suyo encima y la barandilla (capa transparente fija)
function d_juzgadoDelanteFijo(R) {
  const { rect, pset, linea } = R, D = d_C, K = C.k;
  rect(110, 100, 210, 110, K); rect(111, 101, 209, 110, D.arceD); rect(111, 101, 209, 101, D.arceL);
  rect(116, 72, 204, 102, K); rect(117, 73, 203, 101, D.arce); rect(112, 69, 208, 74, K); rect(113, 70, 207, 72, D.arceL); rect(113, 73, 207, 73, D.arce);
  for (let k = 0; k < 5; k++) { const x = 121 + k * 17; d_cuarteron(R, x, 78, x + 13, 97, D.arce, D.arceL, D.arceD, D.arceS, k + 30); }
  rect(150, 74, 170, 77, K); rect(151, 75, 169, 76, C.oro); rect(151, 75, 169, 75, C.oroL);
  linea(184, 70, 184, 64, K); linea(184, 64, 181, 62, K); rect(179, 61, 181, 62, hex('#3a3a46')); rect(138, 66, 148, 69, K); rect(139, 67, 147, 68, C.blanco);
  for (const [a, b] of [[24, 116], [204, 296]]) { rect(a + 3, 146, b - 3, 164, K); rect(a + 4, 147, b - 4, 164, D.arceS); for (let x = a + 7; x + 16 < b - 4; x += 20) d_cuarteron(R, x, 150, x + 16, 162, D.arceS, D.arce, D.arceD, D.arceD, x);
    rect(a, 140, b, 146, K); rect(a + 1, 141, b - 1, 143, D.arceL); rect(a + 1, 144, b - 1, 145, D.arce); }
  rect(30, 133, 48, 140, K); rect(31, 134, 47, 135, hex('#2a3a6a')); rect(31, 136, 47, 137, C.papel ?? C.blanco); rect(31, 138, 47, 139, hex('#6a2a2a')); rect(94, 132, 98, 140, K); rect(95, 133, 97, 139, hex('#c8dce4')); rect(95, 136, 97, 139, hex('#8ab8d8'));
  rect(212, 131, 230, 140, K); rect(213, 132, 229, 139, hex('#1c2230')); rect(210, 140, 232, 141, K); rect(211, 140, 231, 140, C.metalL ?? C.blanco);
  for (let k = 0; k < 3; k++) { const y = 140 - k * 3; rect(268, y - 3, 286, y, K); rect(269, y - 2, 285, y - 1, k % 2 ? hex('#e0c080') : C.ocre ?? hex('#c8a040')); }
  rect(0, 166, 319, 179, K); rect(0, 167, 319, 179, D.arceD); rect(0, 167, 319, 167, D.arceS);
  for (let x = 4; x < 320; x += 10) { if (x > 140 && x < 176) continue; rect(x, 160, x + 2, 166, K); rect(x + 1, 160, x + 1, 166, D.arce); }
  rect(146, 160, 170, 166, K); rect(147, 161, 169, 165, D.arce); rect(147, 161, 169, 161, D.arceL);
  rect(0, 157, 319, 160, K); rect(0, 158, 319, 158, D.arceL); rect(0, 159, 319, 159, D.arce);
}

function d_juzgadoVida(R, t, o) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  // por las ventanas altas: el cielo de Los Ángeles y las copas de las palmeras
  for (const [x0, x1, k] of [[10, 62, 0], [230, 270, 1]]) { d_cielo(R, x0, 16, x1, 34, t, 'la', 11 + k);
    for (const px of k ? [246] : [24, 50]) { const m = Math.sin(t * 1.2 + px) * 1.5; linea(px, 34, px + 1, 26, hex('#6a5a3a')); for (let f = 0; f < 6; f++) { const a = f / 6 * Math.PI * 2 + m * 0.1; for (let s = 0; s < 8; s++) pset(Math.round(px + 1 + Math.cos(a) * s + m), Math.round(25 + Math.sin(a) * s * 0.5 + s * s * 0.05), s < 4 ? hex('#3a7a3a') : hex('#5a9a4a')); } } R.recorte(null);
    for (let x = x0 + 13; x < x1; x += 13) rect(x, 16, x, 34, hex('#c8c8cc')); }
  // el sello, el mástil con la bandera y la luz cálida
  d_sello(R, 160, 26, 13, t); d_mastil(R, 104, 22, 106, t); d_banderaColgada(R, 106, 24, 14, 24, t, 1);
  // el monitor de pruebas: pentagrama con notas, el pastel con velas y la bolsa de dinero con un 2, por turnos
  { const [x0, y0, x1, y1] = [15, 43, 61, 69], sc = Math.floor(t / 3) % 3;
    if (o.pantalla) { R.recorte([x0, y0, x1, y1]); o.pantalla(R, t, [x0, y0, x1, y1]); R.recorte(null); }
    else if (sc === 0) { rect(x0, y0, x1, y1, hex('#f2eee2')); for (let l = 0; l < 5; l++) linea(x0 + 3, 50 + l * 3, x1 - 3, 50 + l * 3, hex('#8a8a90')); for (let n = 0; n < 5; n++) { const nx = x0 + 8 + n * 8, ny = 53 + ((n * 3) % 7); disco(nx, ny, 1.5, K); linea(nx + 1, ny, nx + 1, ny - 6, K); } }
    else if (sc === 1) { rect(x0, y0, x1, y1, hex('#2a3a5a')); rect(28, 56, 48, 64, C.blanco); rect(31, 50, 45, 56, hex('#f6d8e0')); for (let c = 0; c < 4; c++) { rect(33 + c * 3, 46, 33 + c * 3, 49, d_C.cera); d_llama(R, 33 + c * 3, 45, t, c); } rect(28, 62, 48, 63, C.oro); }
    else { rect(x0, y0, x1, y1, hex('#1e3a2a')); R.icono('bolsa', 22, 49, C.oroL, K, 2); R.numero('2', 44, 64, { color: C.oroL }); }
    for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) if ((x + y) % 4 === 0) d_aclara(R, x, y, 0.05, C.blanco); }
  // por la ventanita de la puerta pasa alguien por el pasillo
  { const u = ((t + 3) % 8) / 8, x = Math.round(272 + u * 26); R.recorte([280, 55, 287, 75]); d_figura(R, x, 80, t, 2, hex('#3a4a6a'), hex('#2a364e'), hex('#3a2418'), { alto: 22, anda: true }); R.recorte(null); }
  // el secretario teclea (las líneas suben) y los focos
  for (let k = 0; k < 3; k++) { const yy = 70 + ((k * 2 + Math.floor(t * 2)) % 8); rect(246, yy, 246 + 3 + (k * 3 + Math.floor(t * 2)) % 7, yy, hex('#7ac8e8')); }
  R.busto('calvo', tela('#4a5a7a', '#36445e', { W: '#3a2418' }), 232, 70, t + 1.1);
  // la taquígrafa, delante del estrado, con su estenotipia (las manos teclean)
  R.busto('mujer', tela('#6a4a8a', '#4e346a', { V: '#1c1424', H: '#3a3046', S: '#c88a5a', s: '#9a6038' }), 194, 88, t);
  rect(190, 98, 208, 101, K); rect(191, 99, 207, 100, hex('#3a3a46')); pset(193 + Math.floor(t * 8) % 12, 98, d_PIEL); pset(200 - Math.floor(t * 7) % 8, 98, d_PIEL);
  // los abogados, sentados en sus mesas: pasan hojas, toman notas, se giran
  [[34, 128], [58, 128], [82, 128], [214, 128], [244, 128], [270, 128]].forEach(([x, y], i) => { const [tipo, tl] = d_ABOG[i]; R.busto(tipo, tl, x, y + (i === 4 && (t % 7) < 1 ? 1 : 0), t + i * 1.7, { rie: i === 2 && (t % 9) < 0.6 }); });
  { const p = Math.floor(t * 1.3) % 6; rect(62 + p, 134, 64 + p, 135, C.blanco); }
}

// la mesa del juez de cerca: la pared de arce, el sello grande, la bandera, el sillón alto
function d_estradoFijo(R) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  d_paredArce(R, 0, 0, 319, 122, 3, 30);
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) { const d = Math.hypot((x - 150) / 120, (y - 30) / 90); if (d < 1) d_aclara(R, x, y, 0.1 * (1 - d), hex('#ffd690')); }
  for (let y = 0; y < 122; y++) for (let x = 278; x < 320; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.15, hex('#6a4a2a'));
  rect(124, 70, 176, 124, K); rect(125, 71, 175, 124, D.cueroJ); rect(125, 71, 175, 73, D.cueroJL); rect(172, 74, 175, 124, hex('#1e1e26')); rect(125, 74, 127, 124, D.cueroJL);
  for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const bx = 131 + i * 8 + (j % 2) * 4, by = 78 + j * 8; if (bx > 170) continue; pset(bx, by, hex('#1a1a22')); pset(bx - 1, by - 1, D.cueroJL); linea(bx + 1, by + 1, bx + 2, by + 2, hex('#24242e')); }
  for (let x = 126; x < 174; x += 3) pset(x, 74, C.oroS);
  // la librería de los códigos (lomos de colores con sus filetes dorados, sin letras) y el reloj de pared
  rect(0, 70, 58, 92, K); for (let j = 0; j < 1; j++) { let x = 1; while (x < 56) { const w = 3 + Math.floor(h(x, j, 266) * 3), c = hex(['#6a1a1a', '#1a3a6a', '#2a4a2a', '#5a3a1a', '#3a1a3a'][Math.floor(h(x, 1, 267) * 5)]); rect(x, 73, x + w - 1, 90, c); rect(x, 76, x + w - 1, 76, C.oroS); rect(x, 86, x + w - 1, 86, C.oroS); rect(x + w - 1, 73, x + w - 1, 90, K); x += w; } }
  rect(0, 90, 58, 92, D.arceD); rect(0, 70, 58, 72, D.arceD);
  { const cx = 222, cy = 64; R.disco(cx, cy, 10, K); R.disco(cx, cy, 9, D.arceD); R.disco(cx, cy, 7, hex('#f4f0e6')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), K); } linea(cx, cy, cx + 3, cy - 4, K); linea(cx, cy, cx - 4, cy + 1, K); }
  // el monitor del juez, de espaldas, a la izquierda
  rect(16, 92, 62, 122, K); rect(17, 93, 61, 121, hex('#3a3a44')); rect(18, 94, 60, 95, hex('#5a5a66')); rect(36, 122, 42, 124, hex('#3a3a44'));
}

// la tapa de la mesa del juez y su frente, con carpetas, el vaso, el micrófono y la placa (capa transparente fija)
function d_estradoDelanteFijo(R) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  for (let y = 120; y < 134; y++) for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.07 + Math.sin(y * 0.6 + x * 0.02) * 2) > 0.9; pset(x, y, y === 120 ? K : y < 123 ? D.arceL : veta ? D.arceS : h(x, y, 264) < 0.06 ? D.arceS : D.arce); }
  for (let x = 0; x < 320; x++) { pset(x, 133, D.arceD); pset(x, 134, K); }
  for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, D.arceS);
  for (let k = 0; k < 6; k++) { const x = 6 + k * 52; d_cuarteron(R, x, 140, x + 44, 176, D.arceS, D.arce, D.arceD, D.arceD, k + 40); }
  rect(136, 136, 184, 143, K); rect(137, 137, 183, 142, C.oro); rect(137, 137, 183, 137, C.oroL); rect(137, 142, 183, 142, C.oroS);
  // las carpetas, el expediente con su pestaña roja y el vaso de agua
  rect(30, 112, 82, 124, K); rect(31, 113, 81, 115, C.blanco); rect(31, 116, 81, 118, hex('#2a3a6a')); rect(31, 119, 81, 121, hex('#e8e0d0')); rect(31, 122, 81, 123, hex('#6a2a2a')); rect(70, 110, 74, 113, hex('#c83a3a')); for (let x = 33; x < 80; x += 2) pset(x, 114, hex('#d0d0d0'));
  rect(90, 106, 98, 124, K); rect(91, 107, 97, 123, hex('#c8dce4')); rect(91, 113, 97, 123, hex('#8ab8d8')); pset(91, 107, C.blanco); pset(92, 108, C.blanco);
  rect(196, 122, 204, 125, K); rect(197, 122, 203, 124, hex('#2a2a34')); linea(200, 122, 200, 108, K); linea(201, 122, 201, 108, hex('#4a4a56')); linea(200, 108, 194, 102, K); rect(190, 99, 195, 103, K); rect(191, 100, 194, 102, hex('#3a3a46'));
  // el taco del mazo, redondo y torneado, con sus anillos
  for (let y = 116; y < 126; y++) for (let x = 204; x < 241; x++) { const d = ((x - 222) / 18) ** 2 + ((y - 119) / 4) ** 2, d2 = ((x - 222) / 18) ** 2 + ((y - 123) / 4) ** 2; if (d < 1 || (y >= 119 && y <= 123 && Math.abs(x - 222) <= 18) || d2 < 1) pset(x, y, d < 0.9 && y < 121 ? (d < 0.5 && ((x + y) & 1) ? hex('#8e5430') : hex('#6a3a1e')) : d < 1 && y < 121 ? K : (x < 216 ? hex('#8e5430') : hex('#46220e'))); }
  linea(206, 122, 238, 122, hex('#b07040'));
}

// el mazo, apoyado en el taco (o.mazo !== false)
function d_mazoApoyado(R) {
  const { rect, pset, linea, disco } = R, K = C.k;
  rect(212, 104, 232, 115, K); rect(213, 105, 231, 114, hex('#6a3a1e')); rect(213, 105, 231, 106, hex('#8e5430')); rect(213, 113, 231, 114, hex('#46220e')); rect(216, 105, 217, 114, C.oroS); rect(227, 105, 228, 114, C.oroS); pset(214, 106, hex('#b07040'));
  for (let i = 0; i < 26; i++) { const x = 230 + i, y = 110 + Math.round(i * 0.15); pset(x, y - 1, K); pset(x, y, hex('#8e5430')); pset(x, y + 1, hex('#46220e')); pset(x, y + 2, K); }
}

function d_juzgadoFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|juzgado', () => d_juzgadoFijo(R))); d_juzgadoVida(R, t, o); return; }
  R.copiar(d_capa(R, 'D|estrado', () => d_estradoFijo(R)));
  d_sello(R, 62, 44, 24, t); d_mastil(R, 262, 26, 120, t); d_banderaColgada(R, 260, 28, 22, 44, t, -1);
  for (let k = 0; k < 10; k++) { const fy = (h(k, 3, 265) * 90 + t * (2 + h(k, 4, 265) * 3)) % 90, x = Math.round(100 + h(k, 5, 265) * 120 + Math.sin(t * 0.6 + k) * 3), y = Math.round(10 + fy); if (Math.sin(t * 1.4 + k) > -0.2) R.pset(x, y, hex('#fff4d8')); }
}

function d_juzgadoDelante(R, t, o, cam) {
  if (cam === 'general') { d_pegar(R, d_capa(R, 'D|juzgadoDelante', () => d_juzgadoDelanteFijo(R), true), 0, 60, 319, 179); R.pset(184 + 0, 70, Math.floor(t * 1.5) % 2 ? C.rojo : C.rojoS);
    const p = Math.floor(t / 2.7) % 2; if (p) { R.rect(214, 133, 228, 138, C.blanco); for (let k = 0; k < 3; k++) R.rect(215, 134 + k * 2, 225 - k, 134 + k * 2, hex('#a8a8b0')); } else for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R.rect(214 + i * 4, 133 + j * 2, 216 + i * 4, 133 + j * 2, (i + j + Math.floor(t * 2)) % 4 ? hex('#5a9ad8') : C.amarillo ?? C.oro);
    return; }
  d_pegar(R, d_capa(R, 'D|estradoDelante', () => d_estradoDelanteFijo(R), true), 0, 98, 319, 179);
  if (o.mazo !== false) d_mazoApoyado(R);
  R.pset(198, 122, Math.floor(t * 1.5) % 2 ? C.rojo : C.rojoS);
  const g = ((t * 0.25) % 2) * 320; if (g < 300) R.rect(Math.round(g), 121, Math.round(g) + 8, 121, hex('#f4d8a8'));
}

// los invitados de la boda: (ropa, sombra, tocado) — uniformes rojos, levitas, vestidos de seda, plumas y tocados
const d_INVITADOS = [['#c83a3a', '#8e2424', '#1c1424'], ['#f2eee2', '#c8c0b0', '#f6f0e0'], ['#2a2a36', '#1c1c26', '#5a3418'], ['#5a7ab0', '#3e5a8a', '#f6f0e0'], ['#8a4a8a', '#6a346a', '#e8c060'], ['#2a4a3a', '#1e362a', '#3a2418'], ['#e8c8d0', '#c8a0a8', '#f6f6f6'], ['#c83a3a', '#8e2424', '#e8c060']];

// un invitado sentado de espaldas al pasillo, a escala s: hombros, cabeza (de perfil hacia el altar) y su tocado; se gira a veces
function d_invitado(R, x, y, s, t, k) {
  const [ro, roS, to] = d_INVITADOS[k % d_INVITADOS.length].map(hex), r = Math.max(1, Math.round(2.4 * s)), w = Math.max(2, Math.round(4 * s)), gira = Math.sin(t * 0.7 + k * 2.3) > 0.93 ? 1 : 0;
  const pelo = [hex('#5a3418'), hex('#1c1424'), hex('#c8a060'), hex('#8c8ca0')][k % 4];
  R.rect(x - w - 1, y - Math.round(3 * s) - 1, x + w + 1, y + 1, C.k); R.rect(x - w, y - Math.round(3 * s), x + w, y, ro); R.rect(x + Math.max(1, w - 1), y - Math.round(3 * s), x + w, y, roS);
  const cy = y - Math.round(3 * s) - r - 1; R.disco(x, cy, r + 0.6, C.k); R.disco(x, cy, r, pelo); R.disco(x + (gira ? 0 : -1), cy + (s > 0.7 ? 1 : 0), Math.max(0.8, r - 1), d_PIEL);
  if (s > 0.7 && gira) { R.pset(x - 1, cy, C.k); R.pset(x + 1, cy, C.k); }
  if (k % 3 === 1) { R.rect(x - r - 1, cy - r, x + r + 1, cy - r, to); R.pset(x + r, cy - r - 1, to); R.pset(x + r + 1, cy - r - 2 - Math.round(Math.sin(t * 2 + k)), to); }
  else if (k % 3 === 2 && s > 0.6) { R.rect(x - r, cy - r - 2, x + r, cy - r, hex('#1c1424')); }
  if (k % 5 === 4 && s > 0.6) { const ab = Math.round(Math.sin(t * 8 + k) * 1.5); R.rect(x + w + 1, y - 4 + ab, x + w + 3, y - 1 + ab, hex('#f6f0e0')); }
}

// un banco de capilla visto desde el pasillo: respaldo de roble a escala s entre xa y xb, en la fila y
function d_banco(R, xa, xb, y, s) { const { rect, pset } = R, D = d_C, a = Math.max(2, Math.round(5 * s)); rect(xa, y, xb, y + a, C.k); rect(xa, y + 1, xb, y + a - 1, D.roble); rect(xa, y + 1, xb, y + 1, D.robleL); for (let x = xa + 2; x < xb; x += Math.max(3, Math.round(9 * s))) pset(x, y + Math.round(a / 2), D.robleS); }

// la vidriera de un ventanal ojival: plomos negros, vidrios de colores, el rosetón de arriba y la luz que tiembla
function d_vidriera(R, x0, y0, x1, y1, t, k = 0) {
  const cx = (x0 + x1) / 2, w = (x1 - x0) / 2, ya = y0 + w;
  const VID = ['#2a4aa8', '#c83a3a', '#e8b030', '#3a8a5a', '#8a4ab0', '#5a8ad8'].map(hex);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dx = (x - cx) / w; if (y < ya && Math.hypot(dx * w, y - ya) > w + 0.4) continue;
    const lx = Math.floor((x - x0) / 5), ly = Math.floor((y - y0) / 6), plomo = (x - x0) % 5 === 0 || (y - y0) % 6 === 0 || Math.abs(x - cx) < 0.6;
    if (plomo) { R.pset(x, y, hex('#2a2430')); continue; } const c = VID[Math.floor(h(lx, ly, 270 + k) * 6)], br = Math.sin(t * 1.3 + lx * 0.9 + ly * 0.7) > 0.8; R.pset(x, y, br ? d_mez(c, C.blanco, 0.45) : c); }
  R.disco(cx, y0 + w * 0.8, w * 0.5, (x, y, d) => (d > 0.8 ? hex('#2a2430') : d < 0.3 ? C.oroL : (Math.floor(Math.atan2(y - y0 - w * 0.8, x - cx) * 2.5) & 1) ? hex('#c83a3a') : hex('#2a4aa8')));
}

function d_capillaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k, VX = 160, VY = 70;
  // el artesonado de Holbein en perspectiva: casetones azules, filetes dorados y florones (suave junto a la barra y a Atom)
  poligono([[0, 0], [320, 0], [208, 30], [112, 30]], D.techoA);
  for (let y = 0; y < 30; y++) { const v = y / 30, xl = 112 * v, xr = 320 - 112 * v; for (let x = Math.ceil(xl); x < xr; x++) { const u = (x - xl) / (xr - xl), Y = Math.floor(Math.log(1 + v * 6) * 5), U = Math.floor(u * (12 - v * 4));
      const fu = (u * (12 - v * 4)) % 1, fy = (Math.log(1 + v * 6) * 5) % 1; let c = fu < 0.1 || fy < 0.12 ? D.techoB : (U + Y) % 2 ? D.techoA : hex('#34467a'); if (Math.abs(fu - 0.5) < 0.12 && Math.abs(fy - 0.55) < 0.18) c = (U + Y) % 3 ? D.techoR : D.techoW; pset(x, y, c); } }
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 && (x < 60 || x > 250 || y < 12)) d_aclara(R, x, y, 0.35, hex('#1a2040'));
  // las paredes laterales: arriba yeso con su trama, abajo los paneles de roble, en perspectiva
  poligono([[0, 0], [112, 30], [112, 112], [0, 180]], D.estuco); poligono([[320, 0], [208, 30], [208, 112], [320, 180]], D.estuco);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const izq = x < 112 && y > x * 30 / 112 - 0.5 && y < 180 - x * 68 / 112, der = x > 208 && y > (320 - x) * 30 / 112 - 0.5 && y < 180 - (320 - x) * 68 / 112; if (!izq && !der) continue;
    const d = izq ? x : 320 - x, yz = 112 + (112 - d) * 0 + (180 - 112) * (1 - d / 112) - (52 + 30 * (1 - d / 112)) * 1, top = d * 30 / 112, bot = 180 - d * 68 / 112, zocalo = bot - (bot - top) * 0.42; void yz;
    if (y > zocalo) { const col = Math.floor(Math.log(1 + d / 6) * 7); pset(x, y, Math.abs(y - zocalo) < 1 ? D.robleL : (Math.log(1 + d / 6) * 7) % 1 < 0.14 ? D.robleS : h(x, y, 271) < 0.1 ? D.robleS : col % 2 ? D.roble : D.robleL); }
    else pset(x, y, h(x, y, 272) < 0.1 ? D.estucoS : (x + y) % 2 ? D.estuco : hex('#e6dcc4')); }
  for (let y = 0; y < 180; y++) for (let x = 0; x < 112; x++) if ((x + y) % 2 === 0 && y > x * 30 / 112 && y < 180 - x * 68 / 112) d_aclara(R, x, y, 0.18, hex('#3a2a2a'));
  // las lápidas de mármol con su filete dorado y los apliques de velas en las paredes laterales (bajo la zona de Atom)
  for (const [x0, y0, w, hh] of [[96, 58, 8, 14], [212, 98, 10, 12], [298, 112, 14, 20], [272, 104, 12, 18]]) { poligono([[x0, y0], [x0 + w, y0 + (x0 > 160 ? -w * 0.25 : w * 0.25)], [x0 + w, y0 + hh + (x0 > 160 ? -w * 0.25 : w * 0.25)], [x0, y0 + hh]], K); poligono([[x0 + 1, y0 + 1], [x0 + w - 1, y0 + 1 + (x0 > 160 ? -w * 0.25 : w * 0.25)], [x0 + w - 1, y0 + hh - 1 + (x0 > 160 ? -w * 0.25 : w * 0.25)], [x0 + 1, y0 + hh - 1]], C.blanco); for (let j = 3; j < hh - 2; j += 3) linea(x0 + 2, y0 + j + (x0 > 160 ? 0 : 1), x0 + w - 2, y0 + j + (x0 > 160 ? -w * 0.2 : w * 0.2), j === 3 ? C.oro : hex('#c8c4bc')); }
  for (const [ax, ay] of [[100, 92], [222, 92], [250, 96], [292, 100]]) { rect(ax - 1, ay - 2, ax + 1, ay + 4, C.oroS); rect(ax, ay - 7, ax, ay - 3, d_C.cera); }
  // el órgano en su tribuna (izquierda): la caja de roble, los tubos dorados en tres torres y la baranda
  poligono([[14, 40], [92, 52], [92, 92], [14, 98]], D.robleS);
  for (let i = 0; i < 18; i++) { const x = 20 + i * 4, base = 86 - i * 0.4, alto = 22 + Math.round(Math.abs(Math.sin(i * 0.55)) * 14) - Math.floor(i / 6) * 2; rect(x, base - alto, x + 2, base, K); rect(x + 1, base - alto + 1, x + 1, base - 1, C.oroL); rect(x + 2, base - alto + 1, x + 2, base - 1, C.oroS); pset(x + 1, base - 6, K); }
  poligono([[12, 88], [94, 86], [94, 92], [12, 96]], D.roble); for (let x = 14; x < 92; x += 5) linea(x, 92 - (x - 12) * 0.05, x, 100 - (x - 12) * 0.09, D.robleS);
  // la tribuna real (derecha), con su balaustrada y la cortina de terciopelo
  poligono([[212, 60], [268, 52], [268, 86], [212, 88]], D.tercC); for (let x = 214; x < 268; x += 3) linea(x, 61 - (x - 212) * 0.14, x, 86 - (x - 212) * 0.04, D.tercCL);
  poligono([[210, 84], [270, 80], [270, 96], [210, 96]], D.roble); for (let x = 213; x < 268; x += 4) { linea(x, 86 - (x - 210) * 0.06, x, 95, D.robleS); pset(x + 1, 89, D.robleL); } linea(210, 84, 270, 80, C.oro);
  // el testero: el ventanal de vidrieras, el retablo de madera y el altar con su frontal blanco y oro
  rect(112, 30, 208, 112, D.robleS); for (let y = 30; y < 112; y++) for (let x = 112; x < 208; x++) pset(x, y, (x - 112) % 12 === 0 ? D.robleS : h(x, y, 273) < 0.08 ? D.robleS : D.roble);
  rect(128, 34, 192, 94, K); rect(130, 36, 190, 92, D.estuco);
  rect(118, 96, 202, 112, K); rect(119, 97, 201, 111, D.roble); rect(126, 92, 194, 98, K); rect(127, 93, 193, 97, C.blanco); rect(127, 97, 193, 97, d_C.mantelS);
  rect(132, 98, 188, 110, K); rect(133, 98, 187, 109, C.blanco); rect(133, 98, 187, 99, C.oro); rect(133, 108, 187, 109, C.oro); for (let x = 135; x < 186; x += 4) pset(x, 104, C.oroS); rect(158, 101, 162, 107, C.oro); rect(156, 103, 164, 104, C.oro);
  // la barandilla del presbiterio y los escalones
  rect(112, 110, 208, 114, K); rect(113, 111, 207, 112, C.oro); for (let x = 114; x < 207; x += 4) rect(x, 112, x, 116, C.oroS);
  // el suelo de mármol ajedrezado en perspectiva
  for (let y = 112; y < 180; y++) { const v = (y - VY) / (180 - VY), z = 1 / v; for (let x = 0; x < 320; x++) { if (y < 180 - Math.min(x, 320 - x) * 68 / 112 - 0.5 && (x < 112 || x > 208)) continue; const X = Math.floor((x - VX) / (v * 26)), Z = Math.floor(z * 4); const c = (X + Z) % 2 ? hex('#2a2a34') : hex('#e8e4dc'); pset(x, y, h(x, y, 274) < 0.05 ? d_mez(c, C.k, 0.2) : c); } }
  // la alfombra roja hacia el altar, con su cenefa dorada y los pétalos
  poligono([[150, 114], [170, 114], [204, 180], [116, 180]], (x, y) => { const v = (y - 114) / 66, xl = 150 - 34 * v, xr = 170 + 34 * v, u = (x - xl) / (xr - xl); if (u < 0.08 || u > 0.92) return D.alfRS; if (u < 0.12 || u > 0.88) return C.oro; return h(x, y, 275) < 0.08 ? D.alfRS : (x + y) % 7 === 0 ? D.alfRL : D.alfR; });
  for (let k = 0; k < 40; k++) { const v = h(k, 1, 276), y = 116 + v * 62, x = 160 + (h(k, 2, 276) - 0.5) * (20 + 60 * v); pset(x, y, D.flor); if (v > 0.5) pset(x + 1, y, D.florS); }
}

// los bancos con sus invitados, por filas de atrás adelante (la vida: se giran, se abanican, se mueven las plumas)
const d_FILAS = [114, 119, 125, 132, 140, 149, 159];

function d_capillaBancos(R, t, hasta) {
  d_FILAS.forEach((y, f) => { if (f >= hasta) return; const s = (y - 70) / 100, v = (y - 114) / 66, xa = 150 - 34 * v - 4, xb = 170 + 34 * v + 4, wl = Math.max(0, Math.round((180 - y) * 112 / 68)), sep = Math.max(6, Math.round(13 * s));
    for (let x = xa - sep * 0.6, k = f * 7; x > wl + 2; x -= sep, k++) d_invitado(R, Math.round(x), y, s, t, k);
    for (let x = xb + sep * 0.6, k = f * 7 + 3; x < 320 - wl - 2; x += sep, k++) d_invitado(R, Math.round(x), y, s, t, k);
    d_banco(R, wl, Math.round(xa), y, s); d_banco(R, Math.round(xb), 320 - wl, y, s); });
}

function d_capillaVida(R, t) {
  const { pset } = R;
  d_vidriera(R, 132, 38, 188, 90, t, 0);
  // los candeleros y las flores del altar
  for (const cx of [130, 190]) { R.rect(cx - 1, 82, cx + 1, 93, C.k); R.rect(cx, 83, cx, 92, C.oro); R.rect(cx, 77, cx, 82, d_C.cera); d_llama(R, cx, 76, t, cx); d_halo(R, cx, 74, 7, 0.25); }
  for (const fx of [142, 178]) { R.rect(fx - 2, 87, fx + 2, 92, C.k); R.rect(fx - 1, 88, fx + 1, 91, C.oro); for (let k = 0; k < 7; k++) R.disco(fx - 4 + h(k, fx, 277) * 8, 83 + h(k, fx, 278) * 5, 1.3, k % 3 ? d_C.flor : d_C.hoja); }
  // el organista, pequeño en su tribuna, que se mece al tocar
  d_figura(R, 54 + Math.round(Math.sin(t * 3) * 1), 88, t, 1, hex('#2a2a36'), hex('#1c1c26'), hex('#e8e4dc'), { alto: 9 });
  // la corte en la tribuna real asoma por la baranda
  for (let k = 0; k < 5; k++) d_figura(R, 220 + k * 10, 86 - k, t, k, hex(['#c83a3a', '#f2eee2', '#2a2a36', '#8a4a8a', '#5a7ab0'][k]), hex('#2a2430'), hex(['#5a3418', '#c8a060', '#1c1424', '#8c8ca0', '#5a3418'][k]), { alto: 10 + (k % 2) });
  for (const [ax, ay] of [[100, 92], [222, 92], [250, 96], [292, 100]]) { d_llama(R, ax, ay - 8, t, ax); d_halo(R, ax, ay - 9, 6, 0.25); }
  d_capillaBancos(R, t, 5);
  // la luz del ventanal que baja en abanico hacia la alfombra, con motas de polvo y algún pétalo que cae
  for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 279) * 70 + t * (2 + h(k, 4, 279) * 3)) % 70, x = Math.round(160 + (h(k, 5, 279) - 0.5) * (20 + fy) + Math.sin(t * 0.6 + k) * 2), y = Math.round(92 + fy); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff4d8')); }
  for (let k = 0; k < 4; k++) { const u = ((t * 0.08 + k * 0.25) % 1), x = Math.round(130 + k * 22 + Math.sin(t * 1.5 + k) * 5), y = Math.round(20 + u * 150); pset(x, y, d_C.flor); pset(x + 1, y + (Math.sin(t * 3 + k) > 0 ? 1 : 0), d_C.florS); }
}

// la primera fila (los bancos más cercanos, con un ramo blanco y un lazo en cada extremo), por delante de los actores
function d_capillaDelanteVida(R, t) {
  d_capillaBancos(R, t, 7); const D = d_C;
  // vuelve a pintar la alfombra en el hueco de las dos filas de delante? no: los bancos no la pisan. Los ramos de las puntas:
  for (const [x, y] of [[120, 150], [200, 150], [110, 162], [210, 162]]) { const s = x < 160 ? -1 : 1; R.rect(x - 2, y - 8, x + 2, y + 6, C.k); R.rect(x - 1, y - 7, x + 1, y + 5, D.robleL);
    for (let k = 0; k < 7; k++) R.disco(x + s * 2 + (h(k, x, 280) - 0.5) * 8, y - 9 + h(k, y, 280) * 6, 1.6, k % 3 ? D.flor : D.hoja); R.pset(x + s * 3, y - 2, hex('#f6f0e0')); R.pset(x + s * 4, y - 1 + Math.round(Math.sin(t * 2 + x)), hex('#f6f0e0')); }
}

// el altar de cerca: el ventanal y su retablo, los paños de terciopelo, el frontal bordado, los escalones y el suelo
function d_altarFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  d_textura(R, 0, 0, 319, 70, D.estuco, C.blanco, D.estucoS, 281, 0.03, 0.1);
  for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 && (x > 268 || y < 16)) d_aclara(R, x, y, 0.12, hex('#8a7a6a'));
  // dos lápidas de mármol con su filete dorado (sin letras: rayas) y el friso pintado de arriba
  for (const [x0, x1] of [[20, 80], [236, 270]]) { rect(x0, 20, x1, 56, K); rect(x0 + 1, 21, x1 - 1, 55, hex('#f2eee6')); rect(x0 + 1, 21, x1 - 1, 22, C.oro); rect(x0 + 1, 54, x1 - 1, 55, C.oro); for (let y = 27; y < 52; y += 4) linea(x0 + 5, y, x1 - 5 - (y % 8), y, hex('#c8c4bc')); disco((x0 + x1) >> 1, 17, 4, C.oro); disco((x0 + x1) >> 1, 17, 2, C.oroL); }
  for (let x = 0; x < 320; x++) { pset(x, 8, x % 6 < 3 ? hex('#c8a048') : hex('#2c3c6a')); pset(x, 9, hex('#8a7a5a')); }
  // los paneles de pliegue de servilleta (linenfold) en roble
  for (let y = 70; y < 132; y++) for (let x = 0; x < 320; x++) pset(x, y, D.roble);
  for (let c = 0; c < 16; c++) { const x0 = 2 + c * 20; rect(x0, 74, x0 + 16, 128, D.robleS); rect(x0, 74, x0 + 15, 127, D.robleL); rect(x0 + 1, 75, x0 + 15, 127, D.roble); for (let i = 0; i < 4; i++) { const xx = x0 + 3 + i * 3; rect(xx, 78, xx, 124, D.robleL); rect(xx + 1, 78, xx + 1, 124, D.robleS); pset(xx, 77, D.robleS); pset(xx + 1, 125, D.robleL); } }
  rect(0, 68, 319, 72, K); rect(0, 69, 319, 70, D.robleL); for (let x = 0; x < 320; x += 4) pset(x, 71, C.oroS);
  // el ventanal y los paños de terciopelo carmesí a los lados, con sus borlas
  rect(114, 14, 206, 70, K);
  for (const [a, b] of [[96, 118], [202, 224]]) for (let y = 10; y < 132; y++) for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 0.9); pset(x, y, x === a || x === b ? K : f > 0.5 ? D.tercCL : f < -0.4 ? hex('#5a0e1a') : D.tercC); }
  for (const bx of [107, 213]) { rect(bx - 2, 60, bx + 2, 64, C.oro); rect(bx - 1, 65, bx + 1, 72, C.oroS); for (let x = bx - 2; x <= bx + 2; x++) pset(x, 73, C.oro); }
  // los escalones de mármol y el suelo de damero
  rect(0, 132, 319, 152, hex('#e8e4dc')); rect(0, 132, 319, 133, C.blanco); rect(0, 141, 319, 142, hex('#c8c4bc')); rect(0, 143, 319, 143, C.blanco); rect(0, 151, 319, 152, hex('#b8b4ac'));
  for (let x = 0; x < 320; x++) for (let y = 134; y < 151; y++) if (h(x, y, 282) < 0.05) pset(x, y, hex('#c8c4bc'));
  for (let y = 153; y < 180; y++) { const z = Math.floor((y - 153) / (6 + (y - 153) * 0.25)); for (let x = 0; x < 320; x++) { const X = Math.floor((x - 160) / (22 + (y - 153) * 0.6)); const c = (X + z) % 2 ? hex('#2a2a34') : hex('#e8e4dc'); pset(x, y, h(x, y, 283) < 0.05 ? d_mez(c, C.k, 0.2) : c); } }
  // el altar: el mantel de lino y el frontal de terciopelo con galones de oro y el sol bordado en el centro
  rect(66, 76, 254, 132, K); rect(67, 77, 253, 82, C.blanco); rect(67, 82, 253, 82, D.mantelS); for (let x = 68; x < 253; x += 3) pset(x, 83, D.mantelS);
  for (let y = 84; y < 132; y++) for (let x = 67; x < 254; x++) pset(x, y, (x + y) % 2 ? D.tercC : hex('#6a1020'));
  for (const [a, b] of [[67, 72], [248, 253]]) rect(a, 84, b, 131, C.oro); rect(67, 84, 253, 88, C.oro); rect(67, 127, 253, 131, C.oro); for (let x = 70; x < 252; x += 4) { pset(x, 86, C.oroS); pset(x, 129, C.oroS); }
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; linea(160 + Math.cos(a) * 6, 108 + Math.sin(a) * 6, 160 + Math.cos(a) * (k % 2 ? 11 : 15), 108 + Math.sin(a) * (k % 2 ? 11 : 15), k % 2 ? C.oroS : C.oro); }
  disco(160, 108, 6, C.oroL); disco(160, 108, 4, C.oro); rect(159, 104, 161, 112, C.oroL); rect(157, 106, 163, 107, C.oroL);
  for (const cx of [104, 216]) { for (let j = 0; j < 4; j++) { rect(cx - 6 + j, 90 + j * 9, cx + 6 - j, 92 + j * 9, C.oroS); pset(cx - 5 + j, 91 + j * 9, C.oro); } }
}

function d_altarVida(R, t) {
  const { rect, pset, disco, linea } = R, D = d_C, K = C.k;
  d_vidriera(R, 116, 16, 204, 68, t, 3);
  // la gran bandeja de oro de pie en el centro, con sus reflejos que se mueven
  disco(160, 54, 21, K); disco(160, 54, 20, (x, y, d) => (d > 0.86 ? C.oroS : d > 0.74 ? C.oroL : d > 0.4 ? ((Math.floor(Math.atan2(y - 54, x - 160) * 4) & 1) ? C.oro : C.oroS) : C.oro)); disco(160, 54, 6, C.oroL);
  { const a = t * 0.6, gx = Math.round(160 + Math.cos(a) * 15), gy = Math.round(54 + Math.sin(a) * 15); pset(gx, gy, C.blanco); pset(gx + 1, gy, C.oroL); pset(gx - 1, gy, C.oroL); pset(gx, gy - 1, C.oroL); pset(gx, gy + 1, C.oroL); }
  rect(156, 74, 164, 77, K); rect(157, 74, 163, 76, C.oroS);
  // los dos candeleros altos con sus cirios encendidos
  for (const cx of [92, 228]) { rect(cx - 6, 72, cx + 6, 77, K); rect(cx - 5, 73, cx + 5, 76, C.oro); rect(cx - 2, 36, cx + 2, 72, K); rect(cx - 1, 37, cx + 1, 71, C.oro); rect(cx - 1, 37, cx - 1, 71, C.oroL); for (const yy of [46, 58]) { rect(cx - 3, yy, cx + 3, yy + 2, K); rect(cx - 2, yy, cx + 2, yy + 1, C.oroL); } rect(cx - 4, 34, cx + 4, 36, C.oroS);
    d_vela(R, cx - 1, 33, 13, t, cx, true, 3, D.cera, 2); d_halo(R, cx, 16, 16, 0.25); }
  // los jarrones de azahar y rosas blancas, que se mecen un poco
  for (const fx of [124, 196]) { rect(fx - 5, 64, fx + 5, 77, K); rect(fx - 4, 65, fx + 4, 76, C.oro); rect(fx - 4, 65, fx - 3, 76, C.oroL); const m = Math.sin(t * 0.8 + fx) * 0.8;
    for (let k = 0; k < 18; k++) { const a = h(k, fx, 284) * Math.PI, r = 4 + h(k, fx, 285) * 9, x = fx + Math.cos(a) * r * 1.1 + m, y = 62 - Math.sin(a) * r; disco(x, y, k % 4 === 0 ? 1.4 : 2, K); disco(x, y, k % 4 === 0 ? 0.9 : 1.5, k % 4 === 0 ? D.hoja : k % 3 ? D.flor : D.florS); } }
  // el libro abierto en su atril (las líneas, sin letras), con la cinta roja
  rect(146, 72, 174, 78, K); rect(147, 72, 159, 77, C.blanco); rect(161, 72, 173, 77, C.blanco); for (let y = 73; y < 77; y++) { linea(148, y, 158, y, D.mantelS); linea(162, y, 172, y, D.mantelS); } rect(160, 72, 160, 82, C.rojo);
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 286) * 90 + t * (2 + h(k, 4, 286) * 3)) % 90, x = Math.round(130 + h(k, 5, 286) * 60 + Math.sin(t * 0.6 + k) * 2), y = Math.round(40 + fy); if (Math.sin(t * 1.4 + k) > -0.2) pset(x, y, hex('#fff4d8')); }
}

// el comulgatorio en primer término: pasamanos de terciopelo y balaustres de latón, a los dos lados (el centro, libre)
function d_altarDelante(R, t) {
  const { rect, pset } = R, D = d_C, K = C.k;
  for (const [a, b] of [[0, 104], [216, 319]]) { rect(a, 162, b, 168, K); rect(a, 163, b, 166, D.tercC); rect(a, 163, b, 163, D.tercCL); for (let x = a + 3; x < b; x += 3) pset(x, 165, hex('#5a0e1a'));
    for (let x = a + 6; x < b - 2; x += 12) { rect(x, 168, x + 3, 179, K); rect(x + 1, 168, x + 2, 179, C.oro); rect(x + 1, 168, x + 1, 179, C.oroL); rect(x - 1, 171, x + 4, 173, K); rect(x, 172, x + 3, 172, C.oroL); } }
  for (const x of [104, 216]) { rect(x - 3, 156, x + 3, 179, K); rect(x - 2, 157, x + 2, 179, C.oro); rect(x - 2, 157, x - 1, 179, C.oroL); R.disco(x, 155, 3, K); R.disco(x, 155, 2, C.oroL); }
  const g = ((t * 0.3) % 2) * 104; if (g < 100) R.rect(Math.round(g), 163, Math.round(g) + 5, 163, hex('#e8a0a8'));
}

function d_capillaFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|capilla', () => d_capillaFijo(R))); d_capillaVida(R, t); return; }
  R.copiar(d_capa(R, 'D|altar', () => d_altarFijo(R))); d_altarVida(R, t);
}

function d_capillaDelante(R, t, o, cam) { if (cam === 'general') d_capillaDelanteVida(R, t); else d_altarDelante(R, t); }

// un pilar gótico en haz: el fuste central con columnillas a los lados, luz a la izquierda, sombra a la derecha, el capitel
// de hojas y la basa
function d_pilar(R, x0, x1, y0, y1, k = 0) {
  const { rect, pset } = R, D = d_C, w = x1 - x0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / w, f = Math.cos((u * 3.5) * Math.PI * 2); let c = u < 0.2 ? D.piedL : u > 0.75 ? D.piedS : D.pied; if (f > 0.85) c = d_mez(c, C.blanco, 0.2); if (f < -0.85) c = D.piedS; if (x === x0 || x === x1) c = D.piedD; if (h(x, y >> 1, 290 + k) < 0.06) c = D.piedS; if ((y - y0) % 14 === 0 && h(x, y, 291) < 0.5) c = D.piedS; pset(x, y, c); }
  rect(x0 - 3, y0, x1 + 3, y0 + 4, D.piedD); rect(x0 - 2, y0, x1 + 2, y0 + 3, D.piedL); for (let x = x0 - 2; x <= x1 + 2; x += 3) { pset(x, y0 + 2, D.piedS); pset(x + 1, y0 + 4, D.piedS); }
  rect(x0 - 3, y1 - 5, x1 + 3, y1, D.piedD); rect(x0 - 2, y1 - 5, x1 + 2, y1 - 4, D.piedL); rect(x0 - 4, y1 - 2, x1 + 4, y1, D.piedS);
}

const d_CORTE = [['#f2eee2', '#c8c0b0', '#f6f0e0'], ['#e8e4dc', '#c0b8a8', '#1c1424'], ['#f6f6ee', '#d0c8b8', '#c8a060'], ['#a8202a', '#78141c', '#a8202a'], ['#f2eee2', '#c8c0b0', '#5a3418'], ['#2a2a36', '#1c1c26', '#e8e4dc']];

function d_parisFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  // las bóvedas de crucería en lo alto (piedra en penumbra, tranquila bajo la barra) y los nervios
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 292) < 0.12 ? D.piedD : (x + y) % 2 ? hex('#6a665e') : hex('#625e56'));
  for (const cx of [60, 175, 290]) for (const s of [-1, 1]) for (let i = 0; i < 70; i++) { const x = cx + s * i, y = 30 - Math.sqrt(Math.max(0, 70 * 70 - (70 - i) * (70 - i))) * 0.36; if (y > 0) { pset(x, y, D.piedS); pset(x, y + 1, hex('#8a8478')); } }
  // el muro del crucero a la izquierda: sillares, el rosetón (se pinta en la vida) y las lancetas bajo él
  for (let y = 24; y < 116; y++) for (let x = 0; x < 132; x++) { const fila = Math.floor(y / 7), jx = (x + (fila % 2) * 9) % 18; pset(x, y, y % 7 === 0 || jx === 0 ? D.piedS : h(x, y, 293) < 0.07 ? D.piedS : h(fila, Math.floor((x + (fila % 2) * 9) / 18), 294) < 0.3 ? D.piedL : D.pied); }
  disco(70, 46, 30, K); disco(70, 46, 29, D.piedS); disco(70, 46, 27, D.piedD);
  for (let i = 0; i < 6; i++) { const x = 16 + i * 18; rect(x - 1, 82, x + 9, 112, D.piedD); rect(x, 86, x + 8, 112, hex('#2a3a6a')); disco(x + 4, 86, 4, hex('#2a3a6a')); }
  // la nave a la derecha: dos grandes arcos apuntados sobre pilares en haz, el triforio y las capillas del fondo
  for (let y = 24; y < 116; y++) for (let x = 132; x < 320; x++) pset(x, y, h(x, y, 295) < 0.08 ? D.piedS : (x + y) % 2 ? D.pied : hex('#928c82'));
  for (let x = 140; x < 320; x += 12) { rect(x, 26, x + 8, 40, hex('#3a3632')); disco(x + 4, 27, 4, hex('#3a3632')); rect(x + 4, 26, x + 4, 40, D.piedS); rect(x - 1, 40, x + 9, 42, D.piedL); }
  rect(132, 42, 319, 44, D.piedD); rect(132, 42, 319, 42, D.piedL);
  for (const [a, b] of [[146, 226], [232, 312]]) { rect(a, 64, b, 116, hex('#3a3430')); for (let y = 52; y < 64; y++) for (let x = a; x <= b; x++) { const m = (a + b) / 2, w = (b - a) / 2; if (Math.abs(x - m) / w < Math.sqrt(1 - ((64 - y) / 16) ** 2) * 1.0 + 0.02) pset(x, y, hex('#3a3430')); }
    for (let i = 0; i < 3; i++) { const x = a + 12 + i * 24; rect(x, 70, x + 8, 98, hex('#2a2440')); disco(x + 4, 70, 4, hex('#2a2440')); }
    rect(a + 4, 104, b - 4, 116, hex('#2e2a26')); }
  d_pilar(R, 132, 144, 44, 118, 1); d_pilar(R, 226, 232, 44, 118, 2); d_pilar(R, 312, 319, 44, 118, 3);
  // el suelo de losas en perspectiva, gastadas, con juntas y alguna lápida
  for (let y = 116; y < 180; y++) { const v = (y - 116) / 64, Z = Math.floor(Math.log(1 + v * 8) * 6); for (let x = 0; x < 320; x++) { const X = Math.floor((x - 200) / (10 + v * 26) + Z * 0.5);
      let c = h(X, Z, 296) < 0.3 ? D.piedL : h(X, Z, 296) > 0.85 ? D.piedS : D.pied; if ((Math.log(1 + v * 8) * 6) % 1 < 0.12 || (((x - 200) / (10 + v * 26) + Z * 0.5) % 1 + 1) % 1 < 0.06) c = D.piedD; else if (h(x, y, 297) < 0.06) c = D.piedS; pset(x, y, c); } }
  rect(0, 116, 319, 116, D.piedD);
  for (const [lx, ly] of [[52, 150], [92, 168]]) { rect(lx - 10, ly - 3, lx + 10, ly + 3, D.piedS); rect(lx - 9, ly - 2, lx + 9, ly + 2, hex('#8a8478')); rect(lx - 1, ly - 2, lx + 1, ly + 2, D.piedD); rect(lx - 4, ly - 1, lx + 4, ly - 1, D.piedD); }
  // los estandartes lisos que cuelgan de la tribuna
  for (const [bx, c] of [[186, '#2a3a8a'], [272, '#a8202a']]) { rect(bx - 6, 44, bx + 6, 46, K); for (let y = 46; y < 72; y++) for (let x = bx - 5; x <= bx + 5; x++) pset(x, y, (x - bx) % 4 === 0 ? d_mez(hex(c), K, 0.3) : hex(c)); for (let x = bx - 5; x <= bx + 5; x++) { pset(x, 72 + (x % 2), C.oro); } rect(bx - 1, 52, bx + 1, 62, C.oro); rect(bx - 3, 56, bx + 3, 57, C.oro); }
}

// el tablado de la boda (a la derecha): la tarima con su paño azul de estrellas doradas, los flecos, la escalera y el dosel
function d_tablado(R, t, x0, x1, top, base, esc = 1) {
  const { rect, pset, linea, poligono } = R, D = d_C, K = C.k;
  // la tapa de la tarima con la alfombra
  rect(x0 - 4, top - 6, x1 + 4, top, K); for (let y = top - 5; y < top; y++) for (let x = x0 - 3; x <= x1 + 3; x++) pset(x, y, ((x * 3 + y * 5) % 11 === 0) ? C.oro : (x + y) % 2 ? hex('#7a1a24') : hex('#8a2230'));
  // el paño del frente, azul con estrellas doradas y flecos, en pliegues que se mecen
  for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 0.5 + Math.sin(t * 0.8) * 0.4); for (let y = top; y < base - 2; y++) { let c = f > 0.5 ? D.azulFL : f < -0.5 ? D.azulFS : D.azulF; if (((x - x0) % 10 === 5 && (y - top) % 8 === 4) || ((x - x0) % 10 === 0 && (y - top) % 8 === 0)) c = C.oro; pset(x, y, c); }
    pset(x, top, C.oro); pset(x, top + 1, C.oroS); pset(x, base - 2, x % 2 ? C.oro : C.oroS); if (x % 2) pset(x, base - 1, C.oroS); }
  rect(x0 - 1, top, x0 - 1, base, K); rect(x1 + 1, top, x1 + 1, base, K);
  // la escalera de madera que baja al suelo, con su alfombra roja
  const ex = Math.round(x0 + (x1 - x0) * 0.42), ew = Math.round(28 * esc), n = Math.max(3, Math.round((base - top) / 6));
  for (let s = 0; s < n; s++) { const y = top + s * Math.round((base - top) / n), w = ew + s * 4; rect(ex - (w >> 1) - 1, y, ex + (w >> 1) + 1, y + 6, K); rect(ex - (w >> 1), y + 1, ex + (w >> 1), y + 2, hex('#8a2230')); rect(ex - (w >> 1), y + 3, ex + (w >> 1), y + 5, hex('#5a3a24')); rect(ex - (w >> 1), y + 3, ex + (w >> 1), y + 3, hex('#7a5a3a')); }
}

function d_dosel(R, t, x0, x1, ytop, yb, esc = 1) {
  const { rect, pset, linea } = R, D = d_C, K = C.k;
  for (const px of [x0, x1]) { rect(px - 1, ytop, px + 1, yb, K); rect(px, ytop, px, yb, C.oro); d_bola(R, px, ytop - 1, 2); }
  const fy = ytop + Math.round(10 * esc);
  for (let x = x0 - 4; x <= x1 + 4; x++) { const m = Math.sin(t * 1.1 + x * 0.12) * 0.8; for (let y = ytop - 2; y < fy; y++) { const f = Math.sin(x * 0.45); pset(x, y, y === ytop - 2 ? K : ((x - x0) % 12 === 6 && (y - ytop) % 6 === 2) ? C.oro : f > 0.6 ? D.azulFL : f < -0.5 ? D.azulFS : D.azulF); }
    const fl = fy + Math.round(Math.abs(Math.sin((x - x0) * 0.26)) * 3 + m); for (let y = fy; y <= fl; y++) pset(x, y, x % 2 ? C.oro : C.oroS); pset(x, fl + 1, K); }
  // la tela del fondo del dosel, que cae detrás
  for (let x = x0 + 2; x < x1 - 1; x++) { const f = Math.sin(x * 0.3); for (let y = fy + 4; y < Math.min(yb - 4, fy + 34 * esc); y++) if ((x + y) % 3 !== 0 || f > 0.3) pset(x, y, f > 0.5 ? hex('#2a3a7a') : f < -0.5 ? hex('#14204e') : hex('#1e2c66')); }
}

// la bola dorada que remata los varales del dosel
function d_bola(R, x, y, r) { R.disco(x, y, r + 1, C.k); R.disco(x, y, r, C.oro); R.pset(x - 1, y - 1, C.oroL); }

function d_parisVida(R, t) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  // el rosetón: pétalos de vidrio en dos coronas que brillan por turnos
  { const cx = 70, cy = 46; for (let y = cy - 27; y <= cy + 27; y++) for (let x = cx - 27; x <= cx + 27; x++) { const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy); if (r > 26.5) continue; const a = Math.atan2(dy, dx), n = 16, sec = Math.floor(((a + Math.PI) / (Math.PI * 2)) * n), fs = (((a + Math.PI) / (Math.PI * 2)) * n) % 1;
      let c; if (r < 5) c = r < 3 ? C.oroL : hex('#c83a3a'); else if (fs < 0.1 || Math.abs(r - 15) < 1 || Math.abs(r - 26) < 1 || Math.abs(r - 5) < 0.8) c = hex('#2a2430'); else { const base = r < 15 ? ['#2a4aa8', '#c83a3a'][sec % 2] : ['#5a8ad8', '#e8b030', '#8a4ab0', '#3a8a5a'][sec % 4]; c = hex(base); if (Math.sin(t * 1.6 - sec * 0.8 + (r < 15 ? 0 : 2)) > 0.75) c = d_mez(c, C.blanco, 0.4); }
      pset(x, y, c); } }
  // las lancetas y las capillas del fondo, con el brillo de los cirios
  for (let i = 0; i < 6; i++) { const x = 16 + i * 18; if (Math.sin(t * 1.2 + i) > 0.4) { pset(x + 3, 95, hex('#8ab0e8')); pset(x + 5, 100, hex('#e8c060')); } }
  for (const [a] of [[146], [232]]) for (let i = 0; i < 5; i++) { const x = a + 10 + i * 16; rect(x, 104, x, 112, d_C.cera); d_llama(R, x, 103, t, a + i); d_halo(R, x, 102, 6, 0.3); }
  // los rayos del rosetón que cruzan la nave en diagonal, con motas de polvo
  for (let y = 60; y < 170; y++) { const xa = 60 + (y - 60) * 1.15, xb = xa + 34 + (y - 60) * 0.12; for (let x = Math.round(xa); x < xb; x++) if ((x + y) % 2 === 0 && x < 320) d_aclara(R, x, y, 0.1 + 0.03 * Math.sin(t * 0.8 + y * 0.05), hex('#fff0d0')); }
  for (let k = 0; k < 18; k++) { const fy = (h(k, 3, 298) * 100 + t * (2 + h(k, 4, 298) * 3)) % 100, x = Math.round(70 + fy * 1.15 + h(k, 5, 298) * 34 + Math.sin(t * 0.6 + k) * 2), y = Math.round(64 + fy); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
  // la corte de blanco (el luto real) y algún cardenal, de pie al fondo de la nave: se mueven, se inclinan, susurran
  for (let k = 0; k < 16; k++) { const [ro, roS, pe] = d_CORTE[k % d_CORTE.length].map(hex), x = 8 + k * 7 + (k > 7 ? 4 : 0), y = 122 + (k % 2) * 3, m = Math.sin(t * 0.9 + k * 1.7) > 0.9 ? 1 : 0; if (x > 124) continue;
    d_figura(R, x + m, y, t, k, ro, roS, pe, { alto: 11 + (k % 3), falda: k % 2 === 0, tocado: k % 4 === 0 ? hex('#f6f0e0') : undefined }); }
  for (let k = 0; k < 14; k++) { const [ro, roS, pe] = d_CORTE[(k + 2) % d_CORTE.length].map(hex), x = 150 + k * 12, y = 114 + (k % 2) * 2; d_figura(R, x + (Math.sin(t * 0.7 + k * 2.1) > 0.92 ? 1 : 0), y, t, k + 20, ro, roS, pe, { alto: 9 + (k % 2), falda: k % 3 === 0 }); }
  // el monaguillo con el incensario que se balancea y el humo que sube
  { const mx = 116, sy = 150; d_figura(R, mx, sy, t, 7, hex('#f6f6ee'), hex('#c8c0b0'), hex('#5a3418'), { alto: 14 }); const a = Math.sin(t * 2.2) * 0.7, ix = Math.round(mx + 3 + Math.sin(a) * 9), iy = Math.round(sy - 10 + Math.cos(a) * 9); linea(mx + 3, sy - 10, ix, iy, C.oroS); disco(ix, iy + 1, 2, K); disco(ix, iy + 1, 1.4, C.oro);
    for (let k = 0; k < 10; k++) { const u = ((t * 0.3 + k * 0.1) % 1); pset(Math.round(ix + Math.sin(t * 1.3 + k) * 3 * u + u * 6), Math.round(iy - 2 - u * 34), u < 0.5 ? hex('#e8e4dc') : hex('#b8b4ac')); } }
  // una paloma que cruza bajo las bóvedas de vez en cuando
  { const u = ((t + 4) % 10) / 3; if (u < 1) { const x = Math.round(330 - u * 360), y = Math.round(36 + Math.sin(u * 6) * 4), al = Math.sin(t * 14) > 0; rect(x - 2, y, x + 2, y + 1, hex('#e8e4e0')); pset(x - 3, y, hex('#b8b4b0')); pset(x + 2, y - 1, hex('#e8e4e0')); pset(x, y + (al ? -2 : 2), hex('#d8d4d0')); pset(x + 1, y + (al ? -3 : 3), hex('#d8d4d0')); } }
  // el tablado y su dosel, con los cirios de las esquinas
  d_dosel(R, t, 150, 284, 50, 122, 1);
  for (const cx of [140, 292]) { rect(cx - 1, 98, cx + 1, 122, K); rect(cx, 99, cx, 121, C.oro); rect(cx - 3, 96, cx + 3, 98, C.oroS); rect(cx - 1, 86, cx + 1, 96, d_C.cera); d_llama(R, cx, 85, t, cx, 1); d_halo(R, cx, 82, 8, 0.3); }
  d_tablado(R, t, 128, 296, 128, 150);
}

// lo de delante en Notre Dame: el gran pilar de la izquierda en primer término y las cabezas del público (velos blancos,
// gorros), que se mueven
function d_parisDelante(R, t, o, cam) {
  const D = d_C;
  if (cam === 'general') { d_pilar(R, 0, 14, 0, 179, 5); for (let x = 0; x <= 14; x++) for (let y = 0; y < 180; y++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.35, hex('#2a2620')); }
  for (let k = 0; k < 15; k++) { const x = 18 + k * 21 + (k % 2) * 4, y = 176 - (k % 3) + Math.round(Math.sin(t * 1.1 + k * 1.9) * 0.8), [ro, , pe] = d_CORTE[k % d_CORTE.length].map(hex), r = 6;
    R.disco(x, y + 6, r + 3, C.k); R.disco(x, y + 6, r + 2, ro); R.disco(x, y - 2, r, C.k); R.disco(x, y - 2, r - 1, k % 2 ? hex('#f6f0e2') : pe); R.disco(x - 1, y - 3, r - 3, k % 2 ? hex('#ffffff') : d_mez(pe, C.blanco, 0.25)); }
}

// el tablado de cerca: el coro tallado detrás, el dosel de flecos, los cirios altos y los reclinatorios
function d_naveFijo(R) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 299) < 0.12 ? D.piedD : (x + y) % 2 ? hex('#6a665e') : hex('#625e56'));
  // el coro tallado: arquerías ciegas con figuritas de piedra en sus hornacinas, pináculos y la crestería
  for (let y = 22; y < 128; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y >> 1, 300) < 0.08 ? D.piedS : (x + y) % 2 ? D.pied : hex('#928c82'));
  for (let i = 0; i < 11; i++) { const x = 4 + i * 30; rect(x, 40, x + 22, 108, D.piedD); rect(x + 2, 46, x + 20, 106, hex('#4a4640')); disco(x + 11, 46, 9, D.piedD); disco(x + 11, 46, 8, hex('#4a4640'));
    rect(x + 8, 64, x + 14, 96, D.piedL); disco(x + 11, 60, 3, D.piedL); rect(x + 7, 96, x + 15, 99, D.pied); rect(x + 9, 66, x + 13, 94, D.pied); pset(x + 10, 59, D.piedS); rect(x + 24, 30, x + 27, 110, D.piedL); rect(x + 27, 30, x + 27, 110, D.piedS); R.poligono([[x + 23, 32], [x + 25.5, 22], [x + 28, 32]], D.piedL); }
  for (let x = 0; x < 320; x += 6) { R.poligono([[x, 30], [x + 3, 25], [x + 6, 30]], D.piedL); pset(x + 3, 26, D.piedS); } rect(0, 30, 319, 32, D.piedD); rect(0, 108, 319, 112, D.piedD); rect(0, 108, 319, 108, D.piedL);
  for (let y = 112; y < 128; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 16 === 0) ? D.piedD : D.piedS);
  for (let y = 22; y < 128; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 && x > 270 && y < 50) d_aclara(R, x, y, 0.3, hex('#2a2620'));
  // el suelo de losas de delante
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const X = Math.floor((x - 160) / (30 + (y - 128))), Z = Math.floor((y - 128) / 9); pset(x, y, ((x - 160) / (30 + (y - 128)) % 1 + 1) % 1 < 0.04 || (y - 128) % 9 === 0 ? D.piedD : h(X, Z, 301) < 0.3 ? D.piedL : h(x, y, 304) < 0.05 ? D.piedS : D.pied); }
}

function d_naveVida(R, t) {
  const { rect, pset, disco, linea } = R, D = d_C, K = C.k;
  d_dosel(R, t, 90, 230, 24, 132, 1.4);
  // los dos reclinatorios forrados de terciopelo, detrás de donde se ponen los novios
  for (const rx of [118, 190]) { rect(rx - 10, 112, rx + 10, 134, K); rect(rx - 9, 113, rx + 9, 118, hex('#5a3a24')); rect(rx - 9, 113, rx + 9, 113, hex('#7a5a3a')); rect(rx - 8, 119, rx + 8, 133, hex('#4a2c1a')); rect(rx - 10, 126, rx + 10, 130, K); rect(rx - 9, 127, rx + 9, 129, D.azulF); rect(rx - 9, 127, rx + 9, 127, D.azulFL); }
  // los cirios altos en sus candeleros de hierro
  for (const cx of [52, 268]) { rect(cx - 6, 140, cx + 6, 144, K); rect(cx - 5, 141, cx + 5, 143, hex('#3a3632')); rect(cx - 1, 70, cx + 1, 140, K); rect(cx, 71, cx, 139, hex('#5a5650')); rect(cx - 5, 66, cx + 5, 70, K); rect(cx - 4, 67, cx + 4, 69, C.oroS);
    d_vela(R, cx - 2, 65, 24, t, cx, true, 5, D.cera, 2); d_halo(R, cx, 34, 20, 0.3); }
  d_tablado(R, t, 40, 280, 142, 168, 1.6);
  // el humo del incienso que flota y las motas en la luz de arriba a la izquierda
  for (let y = 0; y < 150; y++) { const xa = (y) * 0.9 - 10, xb = xa + 50; for (let x = Math.max(0, Math.round(xa)); x < xb && x < 320; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.09, hex('#fff0d0')); }
  for (let k = 0; k < 14; k++) { const u = ((t * 0.05 + k / 14) % 1), x = Math.round(20 + u * 280 + Math.sin(t * 0.7 + k) * 8), y = Math.round(80 + Math.sin(u * 7 + k) * 20); if (h(k, Math.floor(t * 2), 302) < 0.85) pset(x, y, hex('#d8d4cc')); }
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 303) * 120 + t * (2 + h(k, 4, 303) * 3)) % 120, x = Math.round(fy * 0.9 + h(k, 5, 303) * 50), y = Math.round(fy); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
}

function d_parisFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|paris', () => d_parisFijo(R))); d_parisVida(R, t); return; }
  R.copiar(d_capa(R, 'D|nave', () => d_naveFijo(R))); d_naveVida(R, t);
}

// el papel pintado verde del taller, a rayas con un dibujo de hojitas, y el zócalo de madera
function d_papelVerde(R, x0, y0, x1, y1, k = 0) { const D = d_C; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = x % 10, v = (y + (Math.floor(x / 10) % 2) * 6) % 12; R.pset(x, y, u === 0 ? D.papTS : u === 5 ? D.papTL : (v === 3 && (u === 2 || u === 8)) || (v === 4 && (u === 3 || u === 7)) ? D.papTL : h(x, y, 310 + k) < 0.06 ? D.papTS : D.papT); } }

// el dibujo de la lámina: el brazo con la mano (los dedos a la izquierda), el pecho con el corazón y las venas de los cinco
// dedos que se juntan en la muñeca y suben por el brazo. Devuelve los caminos de las venas (para encenderlas)
function d_laminaCaminos(x0, y0, s) {
  const P = (x, y) => [x0 + x * s, y0 + y * s], dedos = [[[-46, 6], [-36, 4], [-24, 4]], [[-48, -2], [-36, -1], [-24, 0]], [[-46, -10], [-35, -8], [-24, -5]], [[-41, -17], [-32, -14], [-23, -10]], [[-30, 18], [-24, 13], [-18, 8]]];
  const tronco = [[-10, 0], [10, 1], [34, 2], [52, 0], [70, -6], [82, -16], [90, -24]];
  return dedos.map((d) => [...d.map(([x, y]) => P(x, y)), ...tronco.map(([x, y]) => P(x, y))]);
}

function d_laminaDibujo(R, x0, y0, s) {
  const { pset, linea, disco, poligono } = R, D = d_C, T2 = D.tinta, P = (x, y) => [x0 + x * s, y0 + y * s];
  const contorno = [[-50, -2], [-48, -5], [-24, -6], [-34, -11], [-48, -13], [-46, -16], [-34, -16], [-42, -20], [-40, -22], [-26, -16], [-14, -10], [10, -9], [40, -10], [62, -16], [76, -26], [86, -34], [100, -32], [96, -18], [80, -4], [60, 10], [36, 12], [10, 10], [-12, 10], [-16, 12], [-26, 22], [-32, 22], [-28, 14], [-30, 10], [-44, 10], [-46, 7], [-26, 6], [-30, 2], [-50, 2]].map(([x, y]) => P(x, y));
  poligono(contorno, D.lamS); for (let i = 0; i < contorno.length; i++) { const [a, b] = contorno[i], [c, d] = contorno[(i + 1) % contorno.length]; linea(a, b, c, d, T2); }
  // el sombreado a plumilla del brazo y los pliegues de los nudillos
  for (let i = 0; i < 40; i++) { const [x, y] = P(-6 + i * 2.2, 6 + Math.sin(i) * 1.5); pset(x, y, D.lamD); pset(x + 1, y + 1, D.lamD); }
  for (const [x, y] of [[-30, -4], [-31, -10], [-30, 4], [-28, -15]]) { const [a, b] = P(x, y); linea(a, b - 1, a, b + 1, D.lamD); }
  // el pecho y el corazón, con las cavidades
  const [hx, hy] = P(92, -18); disco(hx, hy, 9 * s / 1.6, D.lamD); R.disco(hx - 3, hy - 2, 5 * s / 1.6, hex('#c88a7a')); R.disco(hx + 2, hy - 2, 5 * s / 1.6, hex('#c88a7a')); poligono([[hx - 8, hy], [hx + 7, hy], [hx, hy + 9]], hex('#c88a7a'));
  linea(hx - 1, hy - 7, hx - 1, hy + 4, D.lamD); pset(hx - 3, hy - 3, D.lam);
  // las venas en azul y las arterias en rojo (finas, a plumilla)
  for (const cam of d_laminaCaminos(x0, y0, s)) for (let i = 0; i + 1 < cam.length; i++) linea(cam[i][0], cam[i][1], cam[i + 1][0], cam[i + 1][1], D.vena);
  for (let i = 0; i < 8; i++) { const [a, b] = P(-8 + i * 12, -4 + Math.sin(i) * 2), [c, d] = P(4 + i * 12, -3 + Math.sin(i + 1) * 2); linea(a, b, c, d, D.arteria); }
}

function d_joyeroFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  // el techo con la viga y el papel pintado verde; el zócalo de madera
  rect(0, 0, 319, 7, hex('#d8ccb0')); for (let x = 0; x < 320; x++) if (h(x, 1, 311) < 0.2) pset(x, 3, hex('#c8bca0')); rect(0, 7, 319, 9, D.bancoS); rect(0, 7, 319, 7, D.bancoL);
  d_papelVerde(R, 0, 10, 319, 120);
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 7 === 0 ? D.bancoS : h(x, y, 312) < 0.08 ? D.bancoS : D.banco); rect(0, 120, 319, 121, K); rect(0, 122, 319, 122, D.bancoL);
  // el suelo de tablas gastadas y la alfombrilla de goma
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const X = Math.floor((x - 160) / (16 + (y - 150) * 0.5)); pset(x, y, (((x - 160) / (16 + (y - 150) * 0.5)) % 1 + 1) % 1 < 0.06 ? D.bancoS : h(X, 0, 313) < 0.4 ? hex('#7a5034') : hex('#6a442a')); }
  for (let y = 158; y < 176; y++) for (let x = 64; x < 200; x++) pset(x, y, (x + y) % 4 === 0 ? hex('#3a3a3a') : hex('#2e2e30'));
  // el mueble de cajoncitos (a la izquierda): decenas de cajones con tirador de latón y etiqueta, y la balanza encima
  rect(0, 24, 54, 150, K); rect(0, 25, 53, 149, D.bancoS); for (let j = 0; j < 12; j++) for (let i = 0; i < 4; i++) { const x = 2 + i * 13, y = 40 + j * 9; rect(x, y, x + 11, y + 7, D.banco); rect(x, y, x + 11, y, D.bancoL); rect(x + 11, y, x + 11, y + 7, K); rect(x + 4, y + 3, x + 7, y + 4, C.oro); pset(x + 4, y + 3, C.oroL); rect(x + 2, y + 1, x + 9, y + 1, hex('#e8dcc0')); }
  rect(0, 26, 56, 30, K); rect(0, 27, 55, 28, D.bancoL);
  { const b = 6; rect(8 + 0, 10 + b, 34, 22 + b, d_C.papT); rect(16, 12 + b, 26, 13 + b, C.oro); rect(20, 12 + b, 21, 21 + b, C.oro); linea(10, 13 + b, 16, 13 + b, C.oroS); linea(26, 13 + b, 32, 13 + b, C.oroS); rect(8, 17 + b, 16, 18 + b, C.oro); rect(26, 17 + b, 34, 18 + b, C.oro); linea(9, 13 + b, 9, 17 + b, C.oroS); linea(33, 13 + b, 33, 17 + b, C.oroS); rect(16, 25, 26, 26, C.oroS); }
  // el reloj de pared, entre el mueble y la ventana
  disco(84, 40, 10, K); disco(84, 40, 9, D.bancoL); disco(84, 40, 7, hex('#f4ecd8')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(84 + Math.cos(a) * 6), Math.round(40 + Math.sin(a) * 6), K); } linea(84, 40, 84, 35, K); linea(84, 40, 88, 42, K);
  rect(79, 50, 89, 72, K); rect(80, 51, 88, 71, D.bancoS); rect(81, 53, 87, 69, hex('#2a1a12'));
  // la ventana a la calle (lo de fuera va en la vida): marco, cruz y el alféizar con una planta
  rect(114, 18, 194, 88, K); rect(115, 19, 193, 87, hex('#e8e0cc')); rect(118, 22, 190, 84, hex('#a8c4dc')); rect(110, 88, 198, 92, K); rect(111, 89, 197, 90, hex('#e8e0cc')); rect(111, 91, 197, 91, hex('#c8c0ac'));
  // la lámina anatómica en su marco (la mano con las venas)
  d_marco(R, 202, 18, 252, 84, 2); for (let y = 21; y < 82; y++) for (let x = 205; x < 250; x++) pset(x, y, h(x >> 1, y >> 1, 314) < 0.05 ? D.lamS : D.lam);
  d_laminaDibujo(R, 226, 54, 0.3);
  // la vitrina: el mueble de madera con el cristal, tres baldas de terciopelo y el zócalo
  rect(250, 62, 316, 152, K); rect(251, 63, 315, 151, D.bancoS); rect(251, 63, 315, 66, D.bancoL); rect(254, 68, 312, 140, hex('#1e2234'));
  for (const y of [86, 108, 130]) { rect(254, y, 312, y + 8, K); rect(255, y, 311, y + 6, D.terciopeloJ); rect(255, y, 311, y, hex('#3a3a6a')); rect(254, y + 7, 312, y + 8, hex('#c8c4bc')); }
  rect(252, 140, 314, 151, D.banco); d_cuarteron(R, 256, 142, 282, 150, D.banco, D.bancoL, D.bancoS, D.bancoS, 2); d_cuarteron(R, 286, 142, 312, 150, D.banco, D.bancoL, D.bancoS, D.bancoS, 3);
  // los anillos, las pulseras y los colgantes de la vitrina (los destellos van en la vida)
  for (const [y, n] of [[84, 6], [106, 5], [128, 6]]) for (let i = 0; i < n; i++) { const x = 260 + i * (n === 5 ? 11 : 9), oro = (i + y) % 3 !== 0, c = oro ? C.oro : hex('#d4d8e0'), cs = oro ? C.oroS : hex('#8a909c'); R.disco(x, y - 1, 3, K); R.disco(x, y - 1, 2.2, c); R.disco(x, y - 1, 1.1, D.terciopeloJ); pset(x - 1, y - 3, oro ? C.oroL : C.blanco); pset(x + 1, y + 1, cs);
    if (i % 2 === 0) { const g = hex(['#c83a3a', '#3a8ae0', '#3ac85a', '#f6f6ff'][(i + y) % 4]); R.disco(x, y - 4, 1.4, K); pset(x, y - 4, g); } }
  for (let i = 0; i < 3; i++) { const x = 266 + i * 18; for (let a = 0; a < Math.PI; a += 0.15) pset(Math.round(x + Math.cos(a) * 6), Math.round(72 + Math.sin(a) * 8), C.oro); R.disco(x, 81, 2, K); pset(x, 81, hex(['#c83a3a', '#3a8ae0', '#3ac85a'][i])); }
  // el estante alto de la derecha de la ventana, con cajas y el gato que duerme (el gato es vida)
  rect(56, 92, 110, 95, K); rect(57, 93, 109, 94, D.bancoL); for (const [bx, w, c] of [[60, 10, '#8a2a3a'], [72, 8, '#2a3a6a'], [82, 12, '#c8b898'], [96, 10, '#3a5a3a']]) { rect(bx, 84, bx + w, 92, K); rect(bx + 1, 85, bx + w - 1, 91, hex(c)); rect(bx + 1, 85, bx + w - 1, 85, d_mez(hex(c), C.blanco, 0.3)); }
}

// el banco de joyero por delante: tablero con la muesca y el taco de limar, la piel recogedora, los cajones, las
// herramientas, la tas, el lastrón de anillos, las lupas y el soplete (capa transparente fija)
function d_joyeroBanco(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  rect(56, 130, 206, 136, K); rect(57, 131, 205, 133, D.bancoL); rect(57, 134, 205, 135, D.banco);
  for (let x = 58; x < 205; x++) if (h(x, 0, 315) < 0.15) pset(x, 132, D.banco);
  disco(131, 137, 14, K); for (let y = 131; y < 137; y++) for (let x = 117; x < 146; x++) if (Math.hypot(x - 131, (y - 137) * 1.4) < 13) pset(x, y, hex('#2a1a12'));
  rect(126, 127, 136, 131, K); rect(127, 128, 135, 130, hex('#c8a070')); rect(129, 128, 133, 128, hex('#e0c090'));
  // el frente: cajoncitos con tiradores, la piel recogedora colgando en su bolsa y las patas
  rect(56, 136, 206, 156, K); rect(57, 137, 205, 156, D.bancoS); for (const [a, b] of [[60, 112], [150, 202]]) for (let j = 0; j < 2; j++) { rect(a, 139 + j * 9, b, 146 + j * 9, D.banco); rect(a, 139 + j * 9, b, 139 + j * 9, D.bancoL); rect(((a + b) >> 1) - 3, 142 + j * 9, ((a + b) >> 1) + 3, 143 + j * 9, C.oro); }
  for (let y = 137; y < 152; y++) for (let x = 116; x < 147; x++) { const d = Math.abs(x - 131) / 15, yb = 137 + Math.round(13 * Math.sqrt(Math.max(0, 1 - d * d))); if (y <= yb) pset(x, y, y === yb ? K : (x + y) % 3 === 0 ? hex('#a87a4a') : hex('#c89a62')); }
  for (const lx of [58, 202]) { rect(lx, 156, lx + 3, 168, K); rect(lx + 1, 156, lx + 2, 168, D.banco); }
  // encima: las limas y los alicates en su soporte, la tas, el lastrón cónico, la lupa, el soplete y la taza
  for (let i = 0; i < 6; i++) { const x = 66 + i * 4; rect(x, 116, x + 1, 130, K); rect(x, 117, x, 129, i % 2 ? hex('#9aa4b4') : hex('#c8d0dc')); rect(x - 1, 124, x + 2, 130, hex(['#c83a3a', '#2a4a8a', '#e8b030'][i % 3])); }
  rect(62, 128, 92, 131, K); rect(63, 129, 91, 130, D.bancoL);
  rect(160, 124, 172, 130, K); rect(161, 125, 171, 129, hex('#5a5e6a')); rect(161, 125, 171, 125, hex('#9aa4b4'));
  poligono([[184, 130], [190, 108], [194, 108], [200, 130]], K); poligono([[186, 129], [190.5, 110], [193.5, 110], [198, 129]], hex('#8a909c')); linea(190, 111, 187, 128, hex('#c8d0dc')); for (let y = 112; y < 128; y += 3) pset(192, y, hex('#5a5e6a'));
  disco(104, 126, 4, K); disco(104, 126, 3, hex('#c8e8f8')); pset(103, 125, C.blanco); linea(107, 129, 112, 131, K);
  rect(72, 124, 76, 130, K); rect(73, 125, 75, 129, hex('#c83a3a')); rect(73, 120, 75, 124, hex('#8a909c'));
  rect(176, 124, 183, 130, K); rect(177, 125, 182, 129, C.blanco); rect(183, 126, 184, 128, K); rect(177, 125, 182, 125, hex('#5a3a24'));
}

function d_joyeroVida(R, t, o) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  // por la ventana: el cielo, la fachada de ladrillo de enfrente con sus ventanas y la gente que pasa por la acera
  d_cielo(R, 118, 22, 190, 84, t, 'calle', 21);
  for (let y = 38; y < 84; y++) for (let x = 118; x <= 190; x++) { const fila = Math.floor(y / 3); pset(x, y, y % 3 === 0 || (x + (fila % 2) * 3) % 6 === 0 ? hex('#8a5a4a') : h(x, fila, 316) < 0.2 ? hex('#a8604a') : hex('#b86a50')); }
  for (const wx of [126, 150, 174]) { rect(wx, 44, wx + 10, 60, hex('#e8e0cc')); rect(wx + 1, 45, wx + 9, 59, hex('#3a4a5a')); rect(wx + 5, 45, wx + 5, 59, hex('#e8e0cc')); if (wx === 150 && Math.floor(t / 4) % 2) rect(wx + 1, 45, wx + 4, 59, hex('#e8d090')); }
  rect(118, 72, 190, 84, hex('#9a9a9a')); for (let x = 118; x <= 190; x += 8) pset(x, 78, hex('#7a7a7a'));
  for (let k = 0; k < 3; k++) { const u = ((t * (0.05 + k * 0.02) + k * 0.37) % 1), dir = k % 2 ? -1 : 1, x = Math.round(dir > 0 ? 110 + u * 90 : 200 - u * 90); d_figura(R, x, 82, t, k, hex(['#3a4a7a', '#8a3a3a', '#4a6a4a'][k]), hex('#2a2a3a'), hex(['#3a2418', '#c8a060', '#1c1424'][k]), { alto: 18 - k * 2, anda: true }); }
  { const pu = Math.sin(t * 0.8) > 0; pset(150, 87, hex('#7a7a8a')); pset(151, 86, hex('#9a9aaa')); pset(152, 87 - (pu ? 1 : 0), hex('#7a7a8a')); }
  R.recorte(null); rect(153, 22, 155, 84, hex('#e8e0cc')); rect(118, 52, 190, 54, hex('#e8e0cc')); rect(155, 22, 155, 84, hex('#c8c0ac'));
  // el péndulo del reloj
  { const a = Math.sin(t * Math.PI * 0.8) * 0.3; linea(84, 54, Math.round(84 + Math.sin(a) * 10), 66, C.oroS); disco(84 + Math.sin(a) * 10, 66, 1.6, C.oro); }
  // el gato dormido en el estante: respira y mueve la punta de la cola
  { const r = Math.sin(t * 2) > 0 ? 1 : 0, G = hex('#e0a050'), GS = hex('#a86a30'); disco(68, 80 - r * 0.4, 5, K); disco(68, 80 - r * 0.4, 4.2, G); disco(62, 79, 3, K); disco(62, 79, 2.2, G); pset(60, 76, K); pset(63, 76, K); linea(61, 80, 63, 80, GS); for (let i = 0; i < 4; i++) pset(66 + i * 2, 78, GS);
    const c = Math.round(Math.sin(t * 2.6) * 2); linea(73, 83, 77, 86 + c, G); pset(77, 86 + c, GS); }
  // el motor colgado con su cable que se mece y la pieza de mano en el banco
  { rect(92, 54, 104, 68, K); rect(93, 55, 103, 67, hex('#5a5e6a')); rect(93, 55, 103, 56, hex('#8a909c')); linea(98, 54, 98, 46, K); rect(96, 44, 100, 46, K); const m = Math.sin(t * 0.9) * 3;
    for (let i = 0; i < 30; i++) { const u = i / 29, x = Math.round(98 + m * Math.sin(u * Math.PI) + u * 22), y = Math.round(68 + u * 56 - Math.sin(u * Math.PI) * 6); pset(x, y, K); pset(x + 1, y, hex('#3a3a46')); } }
  // la lámpara articulada: el brazo desde el fondo del banco y la pantalla que alumbra en cono
  { linea(196, 128, 202, 98, K); linea(197, 128, 203, 98, hex('#5a5e6a')); linea(202, 98, 168, 100, K); linea(202, 99, 168, 101, hex('#5a5e6a')); disco(202, 98, 2, K); R.poligono([[160, 98], [176, 98], [180, 106], [156, 106]], K); R.poligono([[161, 99], [175, 99], [178, 105], [158, 105]], hex('#2a5a3a')); rect(160, 106, 176, 107, hex('#fff4c0'));
    for (let y = 108; y < 132; y++) { const w = 8 + (y - 108) * 0.9; for (let x = Math.round(168 - w); x < 168 + w; x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.16, hex('#fff4c0')); } }
  // la luz de la ventana en el suelo y las motas
  for (let k = 0; k < 10; k++) { const fy = (h(k, 3, 317) * 60 + t * (2 + h(k, 4, 317) * 3)) % 60, x = Math.round(130 + fy * 0.6 + h(k, 5, 317) * 50 + Math.sin(t * 0.6 + k) * 2), y = Math.round(88 + fy); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
  // los destellos de las joyas de la vitrina, por turnos
  for (let k = 0; k < 4; k++) { const i = Math.floor(t * 1.5 + k * 7) % 17, x = 260 + (i % 6) * 9, y = [83, 105, 127][Math.floor(i / 6) % 3] - 3, f = (t * 1.5 + k * 7) % 1; if (f < 0.5) { pset(x, y, C.blanco); if (f < 0.3) { pset(x - 1, y, C.oroL); pset(x + 1, y, C.oroL); pset(x, y - 1, C.oroL); pset(x, y + 1, C.oroL); } } }
  for (let y = 68; y < 140; y++) { const g = ((t * 12) % 140) - 30; for (let x = 254; x < 313; x++) { const d = x - 254 - (y - 68) * 0.3 - g; if (d > 0 && d < 3 && (x + y) % 2 === 0) d_aclara(R, x, y, 0.2, C.blanco); } }
}

function d_joyeroBancoVida(R, t) {
  d_pegar(R, d_capa(R, 'D|joyeroBanco', () => d_joyeroBanco(R), true), 56, 104, 206, 168);
  // el soplete con su llama azul que tiembla; el vaho del café; el anillo en el taco de limar que brilla
  const f = Math.sin(t * 20) > 0 ? 1 : 0; R.pset(74, 119, hex('#8ab8ff')); R.pset(74, 118 - f, hex('#5a8ae0')); R.pset(75, 117, hex('#c8e0ff')); R.pset(74, 116 - f, hex('#3a6ad0'));
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.25) % 1); R.pset(180 + Math.round(Math.sin(t * 2 + k) * 1.5), 123 - Math.round(u * 10), u < 0.6 ? C.blanco : hex('#d8d0c0')); }
  R.disco(131, 126, 2, C.k); R.disco(131, 126, 1.4, C.oro); if (Math.sin(t * 3) > 0.6) { R.pset(132, 124, C.blanco); R.pset(133, 124, C.oroL); }
  const m = Math.round(Math.sin(t * 0.9) * 2); R.rect(118 + m, 124, 124 + m, 127, C.k); R.rect(119 + m, 125, 123 + m, 126, hex('#c8d0dc'));
}

// la lámina de cerca: la pared verde, el marco, el papel con manchas de humedad, el dibujo grande y los números
function d_laminaFijo(R) {
  const { rect, pset, linea, disco } = R, D = d_C, K = C.k;
  d_papelVerde(R, 0, 0, 319, 150, 2);
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 && (x > 276 || y < 14)) d_aclara(R, x, y, 0.2, hex('#2a3a2a'));
  rect(52, 10, 268, 144, K); rect(53, 11, 267, 143, hex('#3a2416')); rect(53, 11, 267, 12, hex('#5a3a24')); rect(55, 13, 265, 141, C.oroS); rect(55, 13, 264, 140, C.oro); rect(57, 15, 263, 139, K);
  for (let y = 16; y < 139; y++) for (let x = 58; x < 263; x++) { const n = h(x >> 2, y >> 2, 318), b = Math.min(x - 58, 262 - x, y - 16, 138 - y); pset(x, y, b < 3 ? D.lamS : n < 0.04 ? D.lamS : h(x, y, 319) < 0.03 ? D.lamD : D.lam); }
  for (const [mx, my, r] of [[76, 124, 7], [244, 30, 5], [210, 128, 4]]) for (let y = my - r; y <= my + r; y++) for (let x = mx - r; x <= mx + r; x++) if (Math.hypot(x - mx, y - my) < r && h(x, y, 320) < 0.6) d_aclara(R, x, y, 0.15, hex('#a88a5a'));
  linea(64, 24, 256, 24, D.lamD); linea(64, 132, 256, 132, D.lamD);
  d_laminaDibujo(R, 128, 86, 1.35);
  // el recuadro de detalle: el corazón en corte dentro de un círculo, con su llamada, y las rayas del pie (sin letras)
  disco(232, 114, 17, D.lamD); disco(232, 114, 16, D.lam); disco(227, 111, 6, hex('#c88a7a')); disco(237, 111, 6, hex('#c88a7a')); R.poligono([[221, 113], [243, 113], [232, 126], [231, 126]], hex('#c88a7a'));
  linea(232, 106, 232, 122, D.lamD); disco(227, 112, 2.5, hex('#a85a5a')); disco(237, 112, 2.5, hex('#7a8ab0')); linea(226, 104, 222, 98, D.vena); linea(238, 104, 242, 97, D.arteria); linea(244, 100, 250, 72, D.lamD, 2);
  for (const [a, b] of [[90, 190], [96, 170]]) linea(a, b === 190 ? 124 : 128, b, b === 190 ? 124 : 128, D.lamD);
  // los números de cada dedo (1 el pulgar … 5 el meñique) con su línea de llamada (sin letras)
  const C5 = [[-46, 6], [-48, -2], [-46, -10], [-41, -17], [-30, 18]], rot = [[62, 96], [62, 82], [64, 66], [70, 50], [82, 120]], NUM = [2, 3, 4, 5, 1];
  C5.forEach(([x, y], i) => { const [tx, ty] = rot[i], ax = 128 + x * 1.35, ay = 86 + y * 1.35; linea(ax, ay, tx + 4, ty + 2, D.lamD, 2); d_cifra(R, NUM[i], tx, ty - 2, D.tinta); });
  // las chinchetas de las esquinas del papel
  for (const [cx, cy] of [[62, 20], [258, 20], [62, 134], [258, 134]]) { disco(cx, cy, 2, K); disco(cx, cy, 1.4, hex('#c83a3a')); pset(cx - 1, cy - 1, C.blanco); }
}

// la vida de la lámina: el reflejo del cristal que pasa, la sombra de un paseante por la pared, y las venas encendidas
function d_laminaVida(R, t, o) {
  const { pset, disco } = R, D = d_C;
  const cams = d_laminaCaminos(128, 86, 1.35), todas = Math.max(0, Math.min(1, o.todas ?? 0)), vena = Math.max(0, Math.min(1, o.vena ?? 0));
  // o.todas: las venas de los cinco dedos se encienden a la vez (hasta la muñeca), latiendo
  if (todas > 0) cams.forEach((cam, i) => { for (let j = 0; j + 1 < 4; j++) { const [a, b] = cam[j], [c, d] = cam[j + 1]; const n = Math.ceil(Math.hypot(c - a, d - b)); for (let s = 0; s <= n * todas; s++) { const x = a + (c - a) * s / n, y = b + (d - b) * s / n, p = 0.6 + 0.4 * Math.sin(t * 6 - s * 0.3 - i); pset(x, y, D.venaL); pset(x, y - 1, d_mez(D.lam, D.venaL, 0.5 * p)); } } });
  // o.vena: un pulso de luz recorre la vena del anular (camino 2) hasta el corazón
  if (vena > 0) { const cam = cams[2], L = []; for (let j = 0; j + 1 < cam.length; j++) { const [a, b] = cam[j], [c, d] = cam[j + 1], n = Math.ceil(Math.hypot(c - a, d - b)); for (let s = 0; s < n; s++) L.push([a + (c - a) * s / n, b + (d - b) * s / n]); }
    const fin = Math.floor(L.length * vena); for (let i = 0; i < fin; i++) { const [x, y] = L[i], cerca = fin - i < 10; pset(x, y, cerca ? hex('#fff0a0') : hex('#f0b040')); if (cerca) { pset(x, y - 1, hex('#ffd060')); pset(x, y + 1, hex('#ffd060')); } }
    if (fin > 3) d_halo(R, L[fin - 1][0], L[fin - 1][1], 7, 0.5, hex('#fff0a0'));
    if (vena >= 1) { const [hx, hy] = cams[0][cams[0].length - 1], p = 0.5 + 0.5 * Math.sin(t * 7); d_halo(R, hx + 3, hy + 6, 18, 0.35 + 0.25 * p, hex('#ff8a8a')); } }
  // el anillo dorado en el anular del dibujo
  if (o.anillo !== false) { const [x, y] = cams[2][1]; R.rect(x - 1, y - 3, x + 1, y + 3, C.k); R.rect(x, y - 2, x, y + 2, C.oro); pset(x, y - 2, C.oroL); if (Math.sin(t * 2.5) > 0.7) { pset(x + 1, y - 4, C.blanco); pset(x + 2, y - 5, C.oroL); } }
  // el reflejo del cristal que cruza despacio y la sombra de alguien que pasa por la calle
  { const g = ((t * 22) % 420) - 60; for (let y = 16; y < 139; y++) for (let x = Math.max(58, Math.round(g + (y - 16) * 0.5)); x < Math.min(263, g + (y - 16) * 0.5 + 12); x++) if ((x + y) % 2 === 0) d_aclara(R, x, y, 0.18, C.blanco); }
  { const u = ((t + 1) % 9) / 9; if (u < 0.6) { const sx = Math.round(-40 + u / 0.6 * 400); for (let y = 30; y < 150; y++) for (let x = sx - 14; x < sx + 14; x++) if ((x + y) % 2 === 0 && ((x - sx) / 14) ** 2 + ((y - 90) / 70) ** 2 < 1) d_aclara(R, x, y, 0.12, hex('#1a2a1a')); } }
  // la lámpara del banco que alumbra desde la derecha, con su brazo
  R.linea(308, 150, 306, 96, C.k); R.linea(309, 150, 307, 96, hex('#5a5e6a')); R.linea(306, 96, 294, 82, C.k); R.linea(307, 96, 295, 82, hex('#5a5e6a')); disco(306, 96, 2, C.k);
  R.poligono([[280, 78], [294, 74], [300, 84], [286, 90]], C.k); R.poligono([[282, 79], [293, 76], [298, 83], [287, 88]], hex('#2a5a3a')); R.linea(282, 86, 286, 89, hex('#fff4c0'));
  for (let k = 0; k < 10; k++) { const fy = (h(k, 3, 321) * 100 + t * (2 + h(k, 4, 321) * 3)) % 100, x = Math.round(282 - fy * 1.2 - h(k, 5, 321) * 30), y = Math.round(86 + fy * 0.5); if (Math.sin(t * 1.4 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
}

// el banco de cerca, por delante: el tablero con la caja del anillo abierta, la lupa, el lastrón, las pinzas
function d_laminaBanco(R) {
  const { rect, pset, linea, disco, poligono } = R, D = d_C, K = C.k;
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) { const veta = Math.sin(x * 0.06 + Math.sin(y * 0.5 + x * 0.03) * 2) > 0.88; pset(x, y, y === 148 ? K : y < 151 ? D.bancoL : veta ? D.bancoS : h(x, y, 322) < 0.06 ? D.bancoS : D.banco); }
  rect(190, 152, 222, 170, K); rect(191, 153, 221, 169, hex('#8a1a2a')); rect(191, 140, 221, 152, K); rect(192, 141, 220, 151, hex('#6a1020')); rect(193, 142, 219, 150, hex('#f2eee2')); rect(196, 158, 216, 166, D.terciopeloJ); rect(196, 158, 216, 158, hex('#3a3a6a'));
  poligono([[236, 168], [244, 142], [250, 142], [258, 168]], K); poligono([[238, 167], [245, 144], [249, 144], [256, 167]], hex('#8a909c')); linea(245, 146, 241, 166, hex('#c8d0dc'));
  disco(130, 162, 8, K); disco(130, 162, 7, hex('#c8e8f8')); disco(128, 160, 2, C.blanco); linea(136, 168, 150, 176, K); linea(137, 168, 151, 176, hex('#3a2418'));
  linea(80, 166, 104, 158, K); linea(80, 167, 104, 159, hex('#c8d0dc')); linea(82, 168, 104, 160, K);
  for (let i = 0; i < 6; i++) { const x = 270 + i * 6; disco(x, 166, 2.4, K); disco(x, 166, 1.6, i % 2 ? C.oro : hex('#d4d8e0')); disco(x, 166, 0.7, D.banco); }
}

function d_laminaBancoVida(R, t) {
  d_pegar(R, d_capa(R, 'D|laminaBanco', () => d_laminaBanco(R), true), 0, 138, 319, 179);
  R.disco(206, 161, 3, C.k); R.disco(206, 161, 2.2, C.oro); R.disco(206, 161, 1, hex('#6a1020')); R.disco(206, 157, 1.6, C.k); R.pset(206, 157, hex('#f6f6ff'));
  const f = (t * 0.7) % 1; if (f < 0.35) { R.pset(207, 155, C.blanco); R.pset(208, 155, C.oroL); R.pset(206, 155, C.oroL); R.pset(207, 154, C.oroL); R.pset(207, 156, C.oroL); }
}

function d_joyeroFondo(R, t, o, cam) {
  if (cam === 'general') { R.copiar(d_capa(R, 'D|joyero', () => d_joyeroFijo(R))); d_joyeroVida(R, t, o); return; }
  R.copiar(d_capa(R, 'D|lamina', () => d_laminaFijo(R))); d_laminaVida(R, t, o);
}

function d_joyeroDelante(R, t, o, cam) { if (cam === 'general') d_joyeroBancoVida(R, t); else d_laminaBancoVida(R, t); }

// los seis encuadres: su fondo (con la vida) y lo que va por delante de los personajes
const d_ENC = {
  salon1746: { fondo: d_salonFondo, delante: d_salonDelante },
  kinder: { fondo: d_kinderFondo, delante: d_kinderDelante },
  juzgado: { fondo: d_juzgadoFondo, delante: d_juzgadoDelante },
  capilla: { fondo: d_capillaFondo, delante: d_capillaDelante },
  paris1558: { fondo: d_parisFondo, delante: d_parisDelante },
  joyero: { fondo: d_joyeroFondo, delante: d_joyeroDelante },
};

// la paleta del salón de Atom (la misma del 22) y de la Nochevieja
const ET = pal({
  pap: '#2c4a3a', papL: '#3e604a', papS: '#223a2e', papM: '#4c7056', techo: '#e6dcc4', techoS: '#c4b89c', cornisa: '#7a4a2a', cornisaL: '#b07a48',
  mad: '#7a4626', madS: '#552e18', madL: '#a2643a', madD: '#3a1e10', suelo: '#8a5430', sueloS: '#6c3e22', sueloL: '#b07a48', junta: '#40220f',
  terc: '#6a1c26', tercL: '#9a3440', tercS: '#3e0e16', abeto: '#1e5a34', abetoS: '#0e3a22', abetoL: '#2f7a44', abetoB: '#5aa060',
  luzV: '#ffd77a', luzVS: '#d89a40', hoja: '#f6f2e8', hojaS: '#d8d0c0', hojaD: '#b8ae9c', rojo: '#c8303a', rojoS: '#8a1a22', rojoL: '#e85a5a',
  noche: '#141a3a', cava: '#f0d070', cavaS: '#c8a040', vidrio: '#c8dcec', botella: '#1e4a2e', mantel: '#f2ece0', mantelS: '#cfc4b0',
  sky0: '#080c22', sky1: '#10163a', sky2: '#1c2050', sky3: '#2e2a62', sky4: '#4a3470', ed0: '#1a1e44', ed1: '#11142e', edL: '#2a2e5a',
});

// la trama de Bayer 4 × 4 (para los degradados y las luces tramadas)
const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_b4 = (x, y) => (e_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (a: cuánto del segundo)
const e_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// un degradado vertical tramado entre varios colores
function e_degr(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.floor(v); R.pset(x, y, v - i > e_b4(x, y) && i < n ? cols[i + 1] : cols[i]); }
}

// un fondo fijo que se pinta una vez por lienzo y clave y se copia entero en cada fotograma
const e_CACHE = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// oscurece hacia la noche todo el búfer actual salvo el hueco [x0, y0, x1, y1] (las luces bajas de medianoche)
function e_penumbra(R, a, hueco) {
  const B = R.buf, N = ET.noche;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (hueco && x >= hueco[0] && x <= hueco[2] && y >= hueco[1] && y <= hueco[3]) continue; const i = y * 320 + x; B[i] = e_mez(B[i], N, a); }
}

// cifras de 3 × 5 (los días del calendario)
const E_DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };

function e_cifras(R, txt, x, y, col) { for (const ch of String(txt)) { const g = E_DIG[ch]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') R.pset(x + i, y + j, col); }); x += 4; } }

// un dibujito de filas de caracteres a escala s (dic: carácter → color; '.' transparente)
function e_picto(R, filas, x, y, s, dic) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = dic[f[i]]; if (c != null) R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } }); }

// el papel pintado del salón (rayas y rombos), más tranquilo en la esquina de Atom; esc: tamaño del dibujo
function e_papel(R, x0, y0, x1, y1, esc = 1) {
  const w = Math.round(16 * esc), a = Math.round(20 * esc);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const raya = Math.floor(x / w) & 1, lx = ((x % w) + w) % w, ly = (((y - y0) % a) + a) % a, atom = x > 268 && y < 54;
    let c = raya ? ET.pap : ET.papL;
    if (!atom && raya) { const d = Math.abs(lx - w / 2) / (w / 2) + Math.abs(ly - a / 2) / (a / 2); if (Math.abs(d - 0.62) < 0.1 || d < 0.14) c = ET.papM; }
    if (lx === 0) c = ET.papS;
    if (h(x, y, 903) < 0.06) c = e_mez(c, ET.papS, 0.5);
    const f = (y - y0) / ((y1 - y0) * 0.16); if (f < 1 && e_b4(x, y) < (1 - f) * 0.5) c = ET.papS;   // la sombra de la cornisa
    R.pset(x, y, c);
  }
}

// techo con la cornisa (de poco contraste: es la franja de la barra del año)
function e_techo(R) {
  const { rect, pset } = R;
  e_degr(R, 0, 0, 319, 6, [ET.techoS, ET.techo]); rect(0, 7, 319, 11, ET.cornisa); rect(0, 7, 319, 7, ET.cornisaL); rect(0, 9, 319, 9, ET.madS);
  for (let x = 2; x < 320; x += 5) pset(x, 10, ET.cornisaL); rect(0, 11, 319, 11, ET.madD);
}

// el zócalo de cuarterones de nogal (moldura arriba, paneles con vetas, rodapié) entre y0 e y1
function e_zocalo(R, y0, y1, paso = 38) {
  const { rect } = R;
  rect(0, y0, 319, y0 + 2, ET.madL); rect(0, y0 + 2, 319, y0 + 2, ET.madS); rect(0, y0 + 3, 319, y1 - 4, ET.mad);
  for (let x = 4; x < 320; x += paso) { const a = y0 + 6, b = y1 - 7; rect(x, a, x + paso - 6, b, ET.madS); rect(x + 1, a + 1, x + paso - 7, b - 1, ET.mad); rect(x + 1, a + 1, x + paso - 7, a + 1, ET.madD); rect(x + 1, b - 1, x + paso - 7, b - 1, ET.madL); rect(x + paso - 7, a + 1, x + paso - 7, b - 1, ET.madL);
    for (let g = 0; g < 3; g++) { const gy = a + 3 + Math.round((b - a - 6) * g / 3 + h(x, g, 950) * 2); rect(x + 4 + Math.round(h(x, g, 951) * 8), gy, x + 12 + Math.round(h(x, g, 952) * (paso - 22)), gy, ET.madS); } }
  rect(0, y1 - 3, 319, y1, ET.madD); rect(0, y1 - 3, 319, y1 - 3, ET.madL);
}

// tablas de suelo en perspectiva entre y0 e y1; las tablas más claras cerca de xLuz
function e_tablas(R, y0, y1, xLuz = 220, ancho = 12) {
  const fy = y0 - 170;
  for (let y = y0; y <= y1; y++) { const z = 1600 / (y - fy), zp = 1600 / (y - 1 - fy);
    for (let x = 0; x < 320; x++) { const u = 160 + (x - 160) * (y0 - fy) / (y - fy), id = Math.floor(u / ancho), idp = Math.floor((160 + (x - 1 - 160) * (y0 - fy) / (y - fy)) / ancho);
      const desf = h(id, 1, 904) * 6, j1 = Math.floor(z / 1.1 + desf), j0 = Math.floor(zp / 1.1 + desf);
      let c = h(id, j1, 905) < 0.33 ? ET.sueloS : h(id, j1, 905) > 0.8 ? e_mez(ET.suelo, ET.sueloL, 0.4) : ET.suelo;
      if (h(id, Math.floor(z * 4), 906) < 0.18 && ((x + y) & 1)) c = e_mez(c, ET.junta, 0.4);
      if (id !== idp || (j1 !== j0 && y > y0)) c = ET.junta;
      const luz = 1 - Math.abs(x - xLuz) / 140; if (luz > 0 && luz * 0.5 > e_b4(x, y) + 0.1) c = e_mez(c, ET.sueloL, 0.35);
      if (y - y0 < 4 && e_b4(x, y) < 0.5) c = e_mez(c, ET.junta, 0.35);
      R.pset(x, y, c); } }
}

// la alfombra trenzada ovalada (centro, radios)
function e_alfombra(R, cx, cy, rx, ry) {
  const cs = [ET.terc, hex('#c8b890'), ET.abeto, ET.terc, hex('#c8b890'), hex('#8a3a2a'), ET.abetoS, ET.tercS];
  for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue;
    const an = Math.floor(d * 8); let c = cs[an]; if (((x + y * 2 + an) % 3) === 0) c = e_mez(c, C.k, 0.3); if (d > 0.96) c = ET.tercS; R.pset(x, y, c); }
}

// un abeto de Navidad a capas (cx, punta ytop, base del follaje yb, ancho de la capa de abajo); luz por la derecha
function e_abeto(R, cx, ytop, yb, w0, k = 0) {
  const n = 5, alto = yb - ytop;
  for (let i = n - 1; i >= 0; i--) { const ya = ytop + Math.round(alto * i / n * 0.86), yz = ytop + Math.round(alto * (i + 1) / n) + 2, wb = Math.round(w0 * (0.32 + 0.68 * (i + 1) / n));
    for (let y = ya; y <= yz; y++) { const ww = 1 + (y - ya) / (yz - ya) * wb;
      for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) { const u = (x - cx) / ww; if (y > yz - 3 && Math.abs(Math.sin((x - cx) * 0.55 + i)) > 0.5 + (yz - y) * 0.2) continue;
        let c = u < -0.45 ? ET.abetoS : u < 0.25 ? ET.abeto : ET.abetoL; const n2 = h(x, y, 910 + k);
        if (n2 < 0.18) c = ET.abetoS; else if (n2 > 0.9 && u > -0.2) c = ET.abetoB; if (y >= yz - 1) c = ET.abetoS;
        R.pset(x, y, c); } }
    for (let x = Math.round(cx - wb); x <= cx + wb; x += 3) if (h(x, i, 911 + k) < 0.7) R.pset(x, yz - 2, x > cx ? ET.abetoB : ET.abetoL);
  }
}

// las bolas y el espumillón de un abeto (fijos)
function e_adornos(R, cx, ytop, yb, w0, n, k = 0) {
  const COL = [[ET.terc, hex('#e04050'), hex('#ffb0b8')], [hex('#a07820'), C.oroN, hex('#fff0b0')], [hex('#284a9a'), hex('#4a7ad8'), hex('#c8dcff')], [hex('#8a8aa0'), hex('#d0d4e0'), C.blanco]];
  for (let g = 0; g < 4; g++) { const y0 = ytop + (yb - ytop) * (0.25 + g * 0.19);
    for (let x = -w0; x <= w0; x++) { const ww = (0.15 + 0.85 * (y0 - ytop) / (yb - ytop)) * w0; if (Math.abs(x) > ww * 0.95) continue; const y = Math.round(y0 + x * 0.32 + Math.sin(x * 0.3) * 1.5); if ((x + g) % 2 === 0) R.pset(cx + x, y, (x + g) % 6 === 0 ? hex('#fff6c0') : C.oroN); } }
  for (let i = 0; i < n; i++) { const f = 0.2 + h(i, 4, 930 + k) * 0.78, y = Math.round(ytop + f * (yb - ytop)), ww = (0.15 + 0.82 * f) * w0, x = Math.round(cx + (h(i, 5, 930 + k) - 0.5) * 1.6 * ww), c = COL[i % 4];
    R.pset(x, y - 2, hex('#c8b070')); R.rect(x, y, x + 1, y + 1, c[1]); R.pset(x + 1, y + 1, c[0]); R.pset(x, y, c[2]); }
}

// las luces de un abeto; parpadean por turnos en cuatro colores (o.os: atenuadas, salvo la que brilla)
function e_luces(R, t, cx, ytop, yb, w0, n, k = 0) {
  const COL = [hex('#ff5a4a'), hex('#ffd050'), hex('#5ad0ff'), hex('#8aff7a')];
  for (let i = 0; i < n; i++) { const f = 0.12 + h(i, 1, 920 + k) * 0.86, y = Math.round(ytop + f * (yb - ytop)), ww = (0.15 + 0.8 * f) * w0, x = Math.round(cx + (h(i, 2, 920 + k) - 0.5) * 1.7 * ww);
    const on = Math.sin(t * (1.4 + (i % 3) * 0.5) + i * 1.7) > -0.3, c = COL[i % 4];
    if (on) { R.pset(x, y, c); R.pset(x, y - 1, e_mez(c, C.blanco, 0.5)); } else R.pset(x, y, e_mez(c, C.k, 0.55)); }
}

// la estrella de la punta, que late
function e_estrella(R, t, x, y) {
  const b = 0.6 + 0.4 * Math.sin(t * 2.4); R.halo(x, y + 2, 6 + b * 2, [hex('#3e604a'), hex('#a89a4a'), hex('#f8e08a')], 1);
  ['..#..', '.###.', '#####', '.###.', '.#.#.'].forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.pset(x - 2 + i, y - 1 + j, j < 2 ? hex('#fff6c0') : C.oroN); });
  if (b > 0.85) { R.pset(x, y - 4, C.blanco); R.pset(x - 4, y + 1, C.blanco); R.pset(x + 4, y + 1, C.blanco); }
}

// una llama de vela de 1–2 px que tiembla, con su halo
function e_llama(R, x, y, t, k = 0, grande = false) {
  const f = Math.sin(t * 11 + k * 3.1) + Math.sin(t * 7.3 + k), dx = f > 1.1 ? 1 : f < -1.2 ? -1 : 0;
  if (grande) R.halo(x, y - 1, 6, [hex('#a86a30'), hex('#e8b060'), hex('#fde2a0')], 0.9);
  R.pset(x + dx, y - 2, hex('#fff2b0')); R.pset(x, y - 1, hex('#ffd060')); R.pset(x, y, hex('#f08a30')); if (grande) { R.pset(x + dx, y - 3, hex('#fff8d8')); R.pset(x - 1, y - 1, hex('#f0a040')); }
}

// humo o vapor que sube y se deshace desde (x, y)
function e_humo(R, x, y, t, k, col, alto = 14) {
  for (let i = 0; i < 7; i++) { const u = ((t * 0.4 + i / 7 + k * 0.13) % 1), yy = y - u * alto, xx = x + Math.sin(u * 5 + t * 0.8 + k) * (1 + u * 3), r = 0.6 + u * 2;
    if (u > 0.8 && (i & 1)) continue; for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j <= r * r && e_b4(Math.round(xx + ii), Math.round(yy + j)) < 0.8 - u * 0.6) R.pset(Math.round(xx + ii), Math.round(yy + j), col); }
}

// la ciudad de noche dentro de un hueco cl (fija, para el búfer): cielo tramado de añil a morado sobre el horizonte yh,
// estrellas, dos capas de edificios con ventanas encendidas, la torre con su aguja y el resplandor de las calles
function e_ciudad(R, cl, yh, k = 0) {
  const [x0, y0, x1, y1] = cl, { rect, pset } = R;
  e_degr(R, x0, y0, x1, yh, [ET.sky0, ET.sky1, ET.sky2, ET.sky3, ET.sky4]);
  for (let i = 0; i < (x1 - x0) * 0.5; i++) { const x = x0 + Math.round(h(i, 1, 960 + k) * (x1 - x0)), y = y0 + Math.round(h(i, 2, 960 + k) ** 1.6 * (yh - y0) * 0.75); pset(x, y, h(i, 3, 960 + k) < 0.25 ? hex('#e8ecff') : hex('#5a6098')); }
  // la capa lejana: azoteas bajas en añil, con ventanitas sueltas
  for (let x = x0, j = 0; x <= x1; j++) { const w = 5 + Math.floor(h(j, 1, 961 + k) * 9), a = 8 + Math.floor(h(j, 2, 961 + k) * 12);
    rect(x, yh - a, Math.min(x1, x + w - 1), y1, ET.ed0); for (let yy = yh - a + 2; yy < y1; yy += 3) for (let xx = x + 1; xx < Math.min(x1, x + w - 1); xx += 2) if (h(xx, yy, 962 + k) < 0.18) pset(xx, yy, hex('#a88a4a')); x += w; }
  // la capa cercana: torres más altas, una con aguja, con filas de ventanas cálidas
  for (let x = x0 - 3, j = 0; x <= x1; j++) { const w = 8 + Math.floor(h(j, 3, 963 + k) * 12), a = 4 + Math.floor(h(j, 4, 963 + k) ** 2 * 26), top = yh - a + 8;
    rect(x, top, Math.min(x1, x + w - 1), y1, ET.ed1); rect(x, top, Math.min(x1, x + w - 1), top, ET.edL);
    if (j % 4 === 2) { rect(x + (w >> 1), top - 8, x + (w >> 1), top, ET.ed1); rect(x + (w >> 1) - 1, top - 3, x + (w >> 1) + 1, top, ET.ed1); }
    for (let yy = top + 3; yy < y1 - 2; yy += 3) for (let xx = x + 2; xx < Math.min(x1, x + w - 2); xx += 3) { const v = h(xx, yy, 964 + k); if (v < 0.32) pset(xx, yy, v < 0.1 ? hex('#ffe29a') : hex('#d8a858')); else if (v < 0.4) pset(xx, yy, hex('#5a7ab8')); }
    x += w + 1; }
  // el resplandor de las calles al pie
  for (let y = y1 - 4; y <= y1; y++) for (let x = x0; x <= x1; x++) if (e_b4(x, y) < (y - y1 + 5) / 7) pset(x, y, hex('#e0a050'));
}

// la vida de la ciudad: la luz roja de la antena y alguna ventana que se enciende y se apaga
function e_ciudadVida(R, t, cl, yh, k = 0) {
  const [x0, , x1, y1] = cl;
  for (let x = x0 - 3, j = 0; x <= x1; j++) { const w = 8 + Math.floor(h(j, 3, 963 + k) * 12), a = 4 + Math.floor(h(j, 4, 963 + k) ** 2 * 26), top = yh - a + 8;
    if (j % 4 === 2 && Math.sin(t * 3 + j) > 0.2) { R.pset(x + (w >> 1), top - 9, hex('#ff4a3a')); R.pset(x + (w >> 1), top - 10, hex('#a02020')); }
    if (j % 3 === 1) { const yy = top + 3 + 3 * Math.floor(h(j, 7, 965) * 3); if (yy < y1 - 2) R.pset(x + 2 + 3 * (j % 2), yy, Math.sin(t * 0.8 + j * 2.3) > 0 ? hex('#ffe29a') : ET.ed1); }
    x += w + 1; }
}

// fuegos artificiales dentro del hueco cl (recortados): cohetes que suben con su estela, y palmeras de oro, peonías, anillos
// y crisantemos de dos colores que se abren, caen y se apagan centelleando, con el humo que dejan; o.s escala (1 lejos), o.n
// cuántos a la vez, o.alto (qué parte del hueco usan), o.os (atenúa el humo). Devuelve { luz, col }: el destello más fuerte
const E_FUEGO = [['#ff5a5a', '#ffc0a8'], ['#ffc040', '#fff2b0'], ['#5aff8a', '#d8ffe0'], ['#5ab0ff', '#d8ecff'], ['#ff6ad0', '#ffd8f4'], ['#e8e8ff', '#ffffff']].map((p) => p.map(hex));

function e_fuegos(R, t, cl, o = {}) {
  const [x0, y0, x1, y1] = cl, s = o.s ?? 1, n = o.n ?? 4, k0 = o.k ?? 0, alto = o.alto ?? 0.55, TAU = Math.PI * 2;
  let luz = 0, col = E_FUEGO[1][0];
  R.recorte(cl);
  for (let i = 0; i < n; i++) {
    const P = 3.0 + h(i, 1, 800 + k0) * 2.2, f = t / P + h(i, 2, 800 + k0), ciclo = Math.floor(f), u = (f - ciclo) * P, sem = ciclo * 7 + i * 13 + k0 * 31;
    const bx = x0 + (0.12 + 0.76 * h(sem, 3, 801)) * (x1 - x0), by = y0 + (0.1 + alto * h(sem, 4, 801)) * (y1 - y0);
    const tipo = Math.floor(h(sem, 5, 801) * 4), pal = tipo === 0 ? E_FUEGO[1] : E_FUEGO[Math.floor(h(sem, 6, 801) * 6)], pal2 = E_FUEGO[(Math.floor(h(sem, 6, 801) * 6) + 2) % 6];
    const sube = 0.75;
    if (u < sube) {   // el cohete y su estela de chispas
      const v = u / sube, ry = y1 + (by - y1) * (1 - (1 - v) ** 2), rx = bx + Math.sin(v * 9 + sem) * 0.7;
      R.pset(Math.round(rx), Math.round(ry), hex('#fff4d0'));
      for (let j = 1; j < 7; j++) if (h(j, Math.floor(t * 24), 802 + i) < 0.75) R.pset(Math.round(rx + (h(j, sem + Math.floor(t * 12), 803) - 0.5) * 1.6), Math.round(ry + j * 1.5 * s), j < 3 ? hex('#ffd890') : hex('#a86a40'));
      continue;
    }
    const tau = u - sube, T = tipo === 0 ? 2.4 : 1.9; if (tau > T + 1.2) continue;
    // el humo que queda donde estalló, que se desplaza despacio
    if (tau > 0.3) { const e = Math.min(1, (tau - 0.3) / 0.5) * Math.max(0, 1 - (tau - 0.3) / (T + 0.9));
      for (let p = 0; p < 26 * s; p++) { const a = h(p, sem, 805) * TAU, rr = h(p, sem, 806) * 9 * s * (0.6 + tau * 0.3), x = Math.round(bx + Math.cos(a) * rr + tau * 2), y = Math.round(by + Math.sin(a) * rr * 0.7 + tau * 1.5); if (e > e_b4(x, y) + 0.25) R.pset(x, y, o.os ? hex('#2e3058') : hex('#3c3a6a')); } }
    if (tau < 0.5) { const g = 1 - tau / 0.5; if (g > luz) { luz = g; col = pal[0]; } if (tau < 0.14) R.halo(bx, by, 7 * s, [e_mez(pal[0], ET.sky1, 0.6), pal[0], pal[1]], 1.1); }
    if (tau >= T) continue;
    const N = Math.round((tipo === 2 ? 16 : 24) * Math.min(1.5, s)), V = (9 + h(sem, 7, 801) * 6) * s * (tipo === 0 ? 1.15 : 1), g = (tipo === 0 ? 6 : 3.5) * s, b = 1 - tau / T;
    for (let p = 0; p < N; p++) {
      const a = p / N * TAU + h(sem, 8, 801), vv = V * (tipo === 1 ? 0.55 + 0.45 * h(p, sem, 804) : 1), c2 = tipo === 3 && p % 2 ? pal2 : pal;
      const pos = (tt) => { const r = vv * (1 - Math.exp(-tt * 2.6)) / 1.0; return [Math.round(bx + Math.cos(a) * r), Math.round(by + Math.sin(a) * r * 0.92 + g * tt * tt)]; };
      const [px, py] = pos(tau);
      if (b < 0.35 && h(p, Math.floor(t * 14), 807) < 0.45) continue;   // el centelleo del final
      R.pset(px, py, b > 0.6 ? c2[1] : b > 0.22 ? c2[0] : e_mez(c2[0], ET.sky1, 0.5));
      const cola = tipo === 0 ? 4 : 2;   // la estela (más larga en la palmera de oro, que cae)
      for (let q = 1; q <= cola; q++) { const [qx, qy] = pos(Math.max(0, tau - q * 0.07)); if (qx !== px || qy !== py) R.pset(qx, qy, e_mez(c2[0], ET.sky1, 0.25 + q * 0.15)); }
    }
  }
  R.recorte(null);
  return { luz, col };
}

// el destello de los fuegos que entra por la ventana: tiñe tramado un trapecio del suelo (y0–y1; ancho de a0 a a1)
function e_destello(R, f, col, y0, y1, a0, a1, fuerza = 0.5) {
  if (f <= 0.05) return;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), xa = Math.round(a0[0] + (a1[0] - a0[0]) * u), xb = Math.round(a0[1] + (a1[1] - a0[1]) * u);
    for (let x = Math.max(0, xa); x <= Math.min(319, xb); x++) { const borde = Math.min(x - xa, xb - x) / 14; if (f * Math.min(1, borde) * (1 - u * 0.5) * fuerza > e_b4(x, y) + 0.12) R.pset(x, y, e_mez(R.pget(x, y), col, 0.3)); } }
}

// el confeti que cae en la caja (n trocitos que giran: se ven anchos o de canto); cant 0–1
const E_CONF = ['#ff5a6a', '#ffd040', '#5ad08a', '#5aa8ff', '#f08ae0', '#ffffff', '#ff9a3a'].map(hex);

function e_confeti(R, t, x0, y0, x1, y1, n, k = 0, cant = 1) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, m = Math.round(n * cant);
  for (let i = 0; i < m; i++) { const v = 12 + h(i, 3, 970 + k) * 16, y = y0 + (((h(i, 2, 970 + k) * H + t * v) % H) + H) % H, x = x0 + (((h(i, 1, 970 + k) * W + Math.sin(t * 2 + i) * 4 + t * 3) % W) + W) % W;
    const c = E_CONF[i % 7], fase = Math.floor(t * 8 + i) % 3, X = Math.round(x), Y = Math.round(y);
    if (fase === 0) { R.pset(X, Y, c); R.pset(X + 1, Y, c); } else if (fase === 1) { R.pset(X, Y, c); R.pset(X, Y + 1, e_mez(c, C.k, 0.3)); } else R.pset(X, Y, e_mez(c, C.blanco, 0.3)); }
}

// el confeti ya caído, esparcido en el suelo o la mesa (fijo)
function e_confetiSuelo(R, x0, y0, x1, y1, n, k = 0) { for (let i = 0; i < n; i++) { const x = x0 + Math.round(h(i, 1, 975 + k) * (x1 - x0)), y = y0 + Math.round(h(i, 2, 975 + k) * (y1 - y0)), c = E_CONF[i % 7]; R.pset(x, y, c); if (i % 3 === 0) R.pset(x + 1, y, e_mez(c, C.k, 0.3)); } }

// un reloj de pared redondo: aro, esfera con sus marcas, las agujas (hora: la hora al empezar, en horas) y el segundero rojo
function e_reloj(R, cx, cy, r, t, hora, aro, os = 0) {
  const { disco, pset, linea } = R, K = C.k, esf = os ? e_mez(hex('#f4ecd8'), ET.noche, os) : hex('#f4ecd8'), esfL = os ? e_mez(C.blanco, ET.noche, os * 0.8) : C.blanco;
  disco(cx, cy, r + 1, K); disco(cx, cy, r, aro); disco(cx - 1, cy - 1, r - 1, e_mez(aro, C.oroN, 0.35)); disco(cx, cy, r - 1, aro);
  disco(cx, cy, r - 2, K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - r * 0.6 ? esfL : esf));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 5; pset(Math.round(cx + Math.cos(a) * q), Math.round(cy + Math.sin(a) * q), k % 3 ? hex('#8a8478') : K); if (k % 3 === 0 && r > 12) pset(Math.round(cx + Math.cos(a) * (q - 1)), Math.round(cy + Math.sin(a) * (q - 1)), K); }
  const ho = hora + t / 3600, am = (ho % 1) * Math.PI * 2 - Math.PI / 2, ah = (ho % 12) / 12 * Math.PI * 2 - Math.PI / 2, sg = Math.floor((ho * 3600) % 60), as = sg * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * (r * 0.45)), Math.round(cy + Math.sin(ah) * (r * 0.45)), K);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 4)), Math.round(cy + Math.sin(am) * (r - 4)), K);
  linea(Math.round(cx - Math.cos(as) * 2), Math.round(cy - Math.sin(as) * 2), Math.round(cx + Math.cos(as) * (r - 4)), Math.round(cy + Math.sin(as) * (r - 4)), C.rojo);
  pset(cx, cy, C.oroN);
}

// las estampas de cada mes del calendario (dibujitos de 10 px) y su color de fondo
const E_PIC = {
  corazon: ['.aa...aa.', 'abba.aaas', 'abaaaaaas', 'aaaaaaaas', '.aaaaaas.', '..aaaas..', '...aas...', '....s....'],
  trebol: ['...gg....', '..gbgg...', '..gggg...', '.gg.gg.gg', 'gbgg.ggbg', 'gggg.gggg', '.gg.s.gg.', '....s....', '.....s...'],
  huevo: ['...aa...', '..abaa..', '.abaaaa.', '.rrrrrr.', 'aaaaaaas', 'yayayays', 'aaaaaaas', '.rrrrrs.', '.aaaaas.', '..aass..'],
  flor: ['..pp.pp..', '.pbppbpp.', '.ppyyypp.', '..pyoyp..', '.ppyyypp.', '.ppp.ppp.', '..pp|pp..', '....|....', '..gg|....', '....|gg..'],
  sombrilla: ['....r.....', '..rwrwr...', '.rwrwrwr..', 'rwrwrwrwr.', '....|.....', '....|.....', '....|.....', '...y|y....', 'yyyyyyyyyy'],
  hoja: ['....o....', '.o.ooo.o.', '.ooooooo.', 'oooobooo.', '.ooooooo.', '..ooooo..', '.oo.o.oo.', '....o....', '....o....'],
  calabaza: ['....gg....', '..ooooo...', '.oaoaoao..', 'oaoaoaoao.', 'oaoaoaoao.', 'oaoaoaoao.', '.oaoaoao..', '..ooooo...'],
  maiz: ['..yy..', '.yyyy.', '.ybyy.', '.yyby.', '.yyyy.', '.ybyy.', 'gyyyyg', 'gyyyyg', '.gyyg.', '..gg..', '...g..'],
  abeto: ['....y....', '....g....', '...ggg...', '..gbggg..', '...ggg...', '..ggrgg..', '.gbgggg..', '..ggggg..', '.ggggggg.', 'gggrgggbg', '....m....'],
};

const E_PICDIC = { a: hex('#e04050'), b: hex('#ffb0b8'), s: hex('#8a1a2a'), g: hex('#3a9a4a'), r: hex('#e04050'), y: hex('#f0c040'), w: C.blanco, p: hex('#f07ab0'), o: hex('#e07a20'), '|': hex('#3a8a3a'), m: hex('#7a4a2a') };

const E_MES = [null,
  { fondo: '#2a3a7a', pic: 'uvas' }, { fondo: '#f6d0d8', pic: 'corazon' }, { fondo: '#d8f0c8', pic: 'trebol' }, { fondo: '#d8e8f8', pic: 'huevo' },
  { fondo: '#e8f4d0', pic: 'flor' }, { fondo: '#a8d8f0', pic: 'sol' }, { fondo: '#1c2458', pic: 'fuegos' }, { fondo: '#a8e0f0', pic: 'sombrilla' },
  { fondo: '#f4e4c0', pic: 'hoja' }, { fondo: '#3a2a4a', pic: 'calabaza' }, { fondo: '#f0dcb8', pic: 'maiz' }, { fondo: '#dceaf4', pic: 'abeto' }];

const E_MESPAL = E_MES.map((m) => m && hex(m.fondo));

// un racimo de uvas (cx, arriba cy; r: radio de cada uva) con su rabo y su hoja, con la luz arriba a la izquierda
function e_racimo(R, cx, cy, r = 2, t = 0, falta = -1) {
  const filas = [4, 5, 4, 3, 3, 2, 1], d = r * 1.7;
  R.linea(cx, cy - r * 2, cx + 1, cy - r * 3.4, hex('#6a4a1a')); R.linea(cx + 1, cy - r * 3.4, cx + 3, cy - r * 3.8, hex('#6a4a1a'));
  { const lx = cx + Math.round(r * 2.2), ly = cy - Math.round(r * 2.6), s = Math.max(2, r + 1); R.disco(lx, ly, s, hex('#2a6a2a')); R.disco(lx - 0.5, ly - 0.5, s - 1, ET.abetoB); R.pset(lx - 1, ly - 1, hex('#a8d870')); R.linea(lx - s + 1, ly + s - 1, lx + s - 1, ly - s + 1, hex('#2a6a2a')); }
  let idx = 0;
  filas.forEach((nf, j) => { for (let i = 0; i < nf; i++, idx++) { if (idx === falta) continue; const x = cx + (i - (nf - 1) / 2) * d, y = cy + j * d * 0.85;
    R.disco(x, y, r + 0.6, C.uvaS); R.disco(x - 0.3, y - 0.3, r, C.uva); R.pset(Math.round(x - r * 0.5), Math.round(y - r * 0.5), C.uvaB); if (r > 2) R.pset(Math.round(x - r * 0.5) + 1, Math.round(y - r * 0.5), e_mez(C.uvaB, C.uva, 0.5)); } });
}

// la estampa del mes dentro de [x0, y0, x1, y1]: fondo del mes con su degradado, el dibujito a escala s y su suelo
function e_estampaMes(R, mes, x0, y0, x1, y1, s, t) {
  const { rect, pset, disco, linea } = R, fondo = E_MESPAL[mes], cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, pic = E_MES[mes].pic;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0); pset(x, y, u * 0.6 > e_b4(x, y) + 0.2 ? e_mez(fondo, C.k, 0.18) : u < 0.25 && e_b4(x, y) < 0.3 ? e_mez(fondo, C.blanco, 0.25) : fondo); }
  const oscuro = mes === 1 || mes === 7 || mes === 10;
  for (let i = 0; i < (x1 - x0) / 3; i++) { const x = x0 + 1 + Math.round(h(i, mes, 980) * (x1 - x0 - 2)), y = y0 + 1 + Math.round(h(i, mes, 981) * (y1 - y0) * 0.5); pset(x, y, oscuro ? (i % 3 ? hex('#8a90d0') : C.blanco) : e_mez(fondo, C.blanco, 0.5)); }
  if (pic === 'uvas') { const r = s > 2 ? 2.4 : 1.6; e_racimo(R, cx - 2, cy - Math.round(r * 3.6), r); return; }
  if (pic === 'sol') { const r = 5 * s; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + t * 0.3; linea(Math.round(cx + Math.cos(a) * (r + 2)), Math.round(cy + Math.sin(a) * (r + 2)), Math.round(cx + Math.cos(a) * (r + 2 + 2 * s)), Math.round(cy + Math.sin(a) * (r + 2 + 2 * s)), hex('#f0a020')); } disco(cx, cy, r, hex('#f0a020')); disco(cx - 1, cy - 1, r - 1, hex('#ffd040')); disco(cx - s, cy - s, Math.max(1, r * 0.4), hex('#fff0a0')); return; }
  if (pic === 'fuegos') { for (const [dx, dy, c, r] of [[-6 * s, -2, '#ff6a6a', 5], [5 * s, -3 * s, '#ffd040', 6], [1, 4 * s, '#6ac0ff', 4]]) for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, rr = r * s * 0.8; linea(Math.round(cx + dx + Math.cos(a) * 2), Math.round(cy + dy + Math.sin(a) * 2), Math.round(cx + dx + Math.cos(a) * rr), Math.round(cy + dy + Math.sin(a) * rr), hex(c)); } return; }
  const g = E_PIC[pic], w = g[0].length * s, hh = g.length * s;
  rect(x0 + 1, y1 - Math.max(1, s), x1 - 1, y1 - 1, e_mez(fondo, C.k, 0.3));
  e_picto(R, g, cx - (w >> 1) + 1, cy - (hh >> 1) + 1, s, Object.fromEntries(Object.entries(E_PICDIC).map(([k, v]) => [k, e_mez(v, C.k, 0.55)])));
  e_picto(R, g, cx - (w >> 1), cy - (hh >> 1), s, E_PICDIC);
}

// el mes que viene después de m saltándose los de la lista
const e_sigMes = (m, salta) => { let n = m % 12 + 1, g = 0; while (salta.includes(n) && g++ < 12) n = n % 12 + 1; return n; };

// el calendario de pared gigante en [x0, y0, x1, y1]: el clavo y el cordel, su sombra en la pared, el canto de las hojas, la
// hoja del mes (estampa, cabecera roja con el número del mes, cuadrícula de domingo a sábado con los días que ya pasaron
// tachados y el de hoy rodeado), la espiral, la esquina que se levanta con el aire y la hoja que pasa (o.hoja / o.pasa)
function e_calendario(R, t, x0, y0, x1, y1, o, grande) {
  const { rect, pset, linea, poligono, disco } = R, K = C.k, salta = o.salta ?? [];
  let mes = o.mes ?? 12, hoja = o.hoja ?? 0;
  if (o.pasa) { const f = t * o.pasa, n = Math.floor(f); hoja = Math.min(1, (f - n) * 1.6); for (let i = 0; i < n; i++) mes = e_sigMes(mes, salta); }
  const sig = e_sigMes(mes, salta), cx = (x0 + x1) >> 1;
  // el clavo, el cordel y la sombra en la pared
  const ny = y0 - (grande ? 7 : 5); disco(cx, ny, 2, K); disco(cx, ny, 1, C.metalL); linea(cx - 1, ny + 1, cx - (grande ? 26 : 16), y0, hex('#4a3a2a')); linea(cx + 1, ny + 1, cx + (grande ? 26 : 16), y0, hex('#4a3a2a'));
  for (let y = y0 + 3; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if (x > x1 || y > y1) pset(x, y, e_mez(R.pget(x, y), C.k, 0.4));
  // el canto de las hojas que quedan (más gordo cuanto más al principio del año)
  const grosor = Math.max(1, Math.round((13 - mes) / 4));
  for (let g = grosor; g >= 1; g--) { rect(x0 + g, y0 + 2, x1 + g, y1 + g, K); rect(x0 + g, y1 + g - 1, x1 + g - 1, y1 + g - 1, g % 2 ? ET.hojaS : ET.hojaD); }
  e_hojaCal(R, t, hoja > 0 ? sig : mes, x0, y0, x1, y1, o, grande, hoja > 0 ? -1 : (o.dia ?? new Date(2026, mes, 0).getDate()));
  // la espiral de alambre
  const yb = y0 + (grande ? 5 : 3); rect(x0, y0, x1, yb, hex('#3a2a20')); rect(x0, y0, x1, y0, hex('#6a5040'));
  for (let x = x0 + 3; x < x1 - 1; x += grande ? 5 : 4) { rect(x, y0 - 2, x, yb + 1, C.metalL); rect(x + 1, y0 - 2, x + 1, yb + 1, C.metalD); }
  // la hoja que pasa: se levanta desde abajo hacia la espiral (la vemos por delante, cada vez más corta) y vuelve por arriba
  if (hoja > 0 && hoja < 1) {
    if (hoja < 0.55) { const v = hoja / 0.55, ye = Math.round(y1 - (y1 - yb) * v * v), ar = Math.round(Math.sin(v * Math.PI) * (grande ? 6 : 4));
      for (let y = yb + 1; y <= ye; y++) { const u = (y - yb) / Math.max(1, ye - yb), xa = x0 - Math.round(ar * u), xb = x1 + Math.round(ar * u);
        rect(xa, y, xb, y, u > 0.85 ? ET.hojaD : u * v > e_b4(xa, y) + 0.3 ? ET.hojaS : ET.hoja); pset(xa, y, K); pset(xb, y, K);
        if (((y - yb) % (grande ? 6 : 4)) === 0 && u > 0.45) rect(xa + 4, y, xb - 4, y, e_mez(ET.hojaS, ET.hojaD, 0.5)); }
      rect(x0 - ar, ye, x1 + ar, ye, K); rect(x0 - ar + 1, ye - 1, x1 + ar - 1, ye - 1, C.blanco); }
    else { const v = (hoja - 0.55) / 0.45, al = Math.round(Math.sin(v * Math.PI) * (grande ? 8 : 6)), ar = Math.round((1 - v) * (grande ? 6 : 4));
      if (al > 0) { poligono([[x0 - ar, y0 - al], [x1 + ar, y0 - al], [x1, yb], [x0, yb]], hex('#c8c0b0')); linea(x0 - ar, y0 - al, x1 + ar, y0 - al, K); linea(x0 - ar, y0 - al, x0, yb, K); linea(x1 + ar, y0 - al, x1, yb, K); } }
  }
  return { mes, sig, hoja };
}

// una hoja del calendario: estampa, cabecera con el número del mes y cuadrícula (dia: el día de hoy, rodeado; −1: ninguno)
function e_hojaCal(R, t, mes, x0, y0, x1, y1, o, grande, dia) {
  const { rect, pset, linea } = R, K = C.k, cx = (x0 + x1) >> 1;
  rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, ET.hoja);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if (h(x, y, 985) < 0.04) pset(x, y, ET.hojaS);   // la fibra del papel
  const yb = y0 + (grande ? 6 : 4), py1 = y0 + Math.round((y1 - y0) * 0.43), hy1 = py1 + (grande ? 15 : 9);
  e_estampaMes(R, mes, x0 + 3, yb + 2, x1 - 3, py1, grande ? 3 : 2, t);
  rect(x0 + 2, yb + 1, x1 - 2, yb + 1, ET.hojaS); rect(x0 + 2, py1 + 1, x1 - 2, py1 + 1, ET.hojaS);
  // la cabecera roja con el número del mes y dos estrellitas
  rect(x0 + 3, py1 + 2, x1 - 3, hy1, ET.rojo); rect(x0 + 3, py1 + 2, x1 - 3, py1 + 2, ET.rojoL); rect(x0 + 3, hy1, x1 - 3, hy1, ET.rojoS);
  if (grande) R.numero(String(mes), cx, hy1 - 2, { tam: 16, centro: true, color: C.blanco, sombra: false, contorno: false }); else R.numero(String(mes), cx + 1, hy1 - 1, { centro: true, color: C.blanco, sombra: false });
  for (const sx of [x0 + 8, x1 - 8]) { pset(sx, py1 + 6 + (grande ? 2 : 0), C.oroN); pset(sx - 1, py1 + 6 + (grande ? 2 : 0), hex('#f8e0a0')); pset(sx + 1, py1 + 6 + (grande ? 2 : 0), hex('#f8e0a0')); pset(sx, py1 + 5 + (grande ? 2 : 0), hex('#f8e0a0')); pset(sx, py1 + 7 + (grande ? 2 : 0), hex('#f8e0a0')); }
  // la cuadrícula: la fila de los días de la semana y las casillas
  const ini = new Date(2026, mes - 1, 1).getDay(), dias = new Date(2026, mes, 0).getDate(), filas = Math.ceil((ini + dias) / 7);
  const gx0 = x0 + 3, gx1 = x1 - 3, cw = Math.floor((gx1 - gx0) / 7), gy0 = hy1 + (grande ? 6 : 4), ch = Math.floor((y1 - 3 - gy0) / filas), ox = gx0 + Math.floor((gx1 - gx0 - cw * 7) / 2);
  for (let c = 0; c < 7; c++) rect(ox + c * cw + 1, hy1 + 2, ox + c * cw + cw - 2, hy1 + (grande ? 3 : 2), c === 0 ? ET.rojoL : ET.hojaD);
  for (let d = 1; d <= dias; d++) { const p = ini + d - 1, c = p % 7, f = Math.floor(p / 7), bx = ox + c * cw, by = gy0 + f * ch;
    rect(bx, by, bx + cw, by, ET.hojaS); rect(bx, by, bx, by + ch, ET.hojaS);
    if (grande) e_cifras(R, d, bx + 2, by + 2, c === 0 ? ET.rojo : hex('#4a4440')); else { pset(bx + 2, by + 2, c === 0 ? ET.rojo : hex('#6a6058')); if (d > 9) pset(bx + 3, by + 2, c === 0 ? ET.rojo : hex('#6a6058')); }
    if (dia > 0 && d < dia) linea(bx + 1, by + ch - 1, bx + cw - 1, by + 1, e_mez(ET.rojo, ET.hoja, 0.6));   // los días que ya pasaron, tachados
    if (d === dia) { const r = Math.max(cw, ch) * 0.62, mx = bx + cw / 2, my = by + ch / 2; for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2.15; pset(Math.round(mx + Math.cos(an) * r * (1 + a * 0.004)), Math.round(my + Math.sin(an) * r * 0.75), ET.rojo); } } }
  rect(gx0, gy0 + filas * ch, gx1, gy0 + filas * ch, ET.hojaS);
  // la esquina de abajo que se levanta con el aire
  const L = 3 + Math.round(Math.sin(t * 1.7) + 1); R.poligono([[x1 - L, y1], [x1, y1 - L], [x1, y1]], ET.hojaD); R.poligono([[x1 - L, y1], [x1, y1 - L], [x1 - L, y1 - L]], K); R.poligono([[x1 - L + 1, y1 - 1], [x1 - 1, y1 - L + 1], [x1 - L + 1, y1 - L + 1]], ET.hojaS);
}

// salón (general): la pared del calendario
function e_salon(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  const W = [196, 24, 258, 86];
  e_capa(R, 'tr_salon', () => {
    e_techo(R); e_papel(R, 0, 12, 319, 94); e_zocalo(R, 95, 118); e_tablas(R, 119, 179, 226);
    e_alfombra(R, 168, 160, 122, 17);
    // la ciudad por la ventana
    e_ciudad(R, W, 70, 0);
    // el marco blanco con la cruz y el alféizar
    rect(190, 18, 264, 23, hex('#e8e2d4')); rect(190, 18, 264, 18, C.blanco); rect(190, 18, 195, 90, hex('#e8e2d4')); rect(259, 18, 264, 90, hex('#c8c0b0')); rect(190, 87, 264, 90, hex('#d8d0c0'));
    rect(226, 24, 228, 86, hex('#e8e2d4')); rect(228, 24, 228, 86, hex('#a8a090')); rect(196, 54, 258, 56, hex('#e8e2d4')); rect(196, 56, 258, 56, hex('#a8a090'));
    for (let i = 0; i < 9; i++) { pset(200 + i, 36 - i, hex('#3a4078')); pset(234 + i, 50 - i, hex('#2e3468')); }
    rect(186, 90, 268, 93, hex('#f0eadc')); rect(186, 93, 268, 94, hex('#a89c88')); rect(186, 90, 268, 90, C.blanco);
    // en el alféizar: la maceta con su planta y el farolillo con la vela (la llama, en vida)
    rect(202, 83, 210, 89, C.k); rect(203, 84, 209, 89, hex('#c86a3a')); rect(203, 84, 209, 84, hex('#e8904a'));
    for (const [dx, dy, r] of [[-3, -2, 2], [3, -3, 2], [0, -5, 2], [-1, -1, 1]]) { disco(206 + dx, 82 + dy, r + 0.5, ET.abetoS); disco(206 + dx - 0.5, 82 + dy - 0.5, r, ET.abetoL); }
    rect(244, 80, 252, 89, C.k); rect(245, 81, 251, 88, hex('#f8e0a0')); rect(245, 81, 251, 81, hex('#4a3a2a')); rect(247, 78, 249, 80, C.k); rect(248, 85, 248, 88, hex('#f4ecd8'));
    // las cortinas de terciopelo con sus pliegues, la barra y los alzapaños
    rect(178, 13, 274, 15, ET.madD); rect(178, 13, 274, 13, C.oroN); disco(178, 14, 2, C.oroN); disco(274, 14, 2, C.oroN);
    for (const [a, b, lado] of [[180, 194, -1], [260, 272, 1]]) for (let y = 16; y <= 114; y++) { const cint = y > 60 && y < 66, w = cint ? 0.55 : 1;
      for (let x = a; x <= b; x++) { const m = lado < 0 ? a : b, u = (x - m) * -lado / (b - a); if (u > w) continue; const ph = Math.sin((x + (y > 66 ? (y - 66) * 0.08 * lado : 0)) * 1.1); pset(x, y, ph > 0.5 ? hex('#9a3440') : ph > -0.3 ? ET.terc : ET.tercS); }
      if (cint) rect(lado < 0 ? a : b - 7, 62, lado < 0 ? a + 7 : b, 63, C.oroN); }
    // la lámpara de pie con su pantalla de flecos y el círculo de luz en la pared
    R.halo(174, 46, 24, [hex('#3a5a44'), hex('#4c6e52'), hex('#6a8a62')], 0.9);
    rect(173, 52, 174, 121, hex('#3a3026')); rect(173, 52, 173, 121, hex('#8a7a5a')); rect(168, 120, 179, 122, hex('#2a2018'));
    poligono([[164, 52], [184, 52], [180, 38], [168, 38]], hex('#e8c88a')); poligono([[176, 52], [184, 52], [180, 38], [176, 38]], hex('#c8a060')); rect(168, 38, 180, 38, hex('#f8e8c0')); for (let x = 164; x <= 184; x += 2) pset(x, 53, hex('#a8783a'));
    // el aparador de la derecha: tablero, cajones con tiradores, patas; encima la radio de válvulas y el jarrón con ramas
    rect(274, 100, 319, 103, ET.madL); rect(274, 103, 319, 104, ET.madS); rect(276, 104, 319, 122, ET.mad); rect(276, 104, 276, 122, ET.madL);
    for (const y of [106, 114]) { rect(279, y, 319, y + 6, ET.madS); rect(280, y + 1, 319, y + 5, ET.mad); rect(280, y + 1, 319, y + 1, ET.madL); rect(296, y + 3, 299, y + 3, C.oroN); }
    rect(278, 122, 280, 128, ET.madD); rect(314, 122, 316, 128, ET.madD);
    rect(280, 88, 302, 99, C.k); rect(281, 89, 301, 99, hex('#8a5a2a')); rect(281, 89, 301, 89, hex('#b07a40')); rect(283, 91, 292, 97, hex('#d8c08a')); for (let y = 92; y < 97; y += 2) rect(284, y, 291, y, hex('#a8905a'));
    disco(297, 93, 2, C.k); disco(297, 93, 1, hex('#d8c08a')); disco(297, 97, 1, C.k);
    rect(306, 90, 312, 99, C.k); rect(307, 91, 311, 99, hex('#3a6a9a')); rect(307, 91, 308, 99, hex('#6a9ac8')); linea(309, 90, 305, 78, hex('#5a3a1a')); linea(309, 90, 314, 80, hex('#5a3a1a')); for (const [x, y] of [[305, 78], [306, 82], [314, 80], [312, 84]]) { pset(x, y, hex('#f0f0f0')); pset(x + 1, y, hex('#e04050')); }
    // el abeto todavía puesto, con su cubo, la falda, agujas caídas, el último regalo y el papel arrugado
    rect(30, 112, 46, 123, C.k); rect(31, 113, 45, 123, hex('#a83a2a')); rect(31, 113, 45, 114, hex('#d86a4a')); rect(42, 115, 45, 123, hex('#7a2418'));
    rect(36, 104, 40, 112, ET.madS); rect(36, 104, 36, 112, ET.madL);
    e_abeto(R, 38, 34, 106, 27, 0); e_adornos(R, 38, 34, 106, 27, 16, 0);
    for (let i = 0; i < 40; i++) { const x = 14 + Math.round(h(i, 1, 990) * 56), y = 121 + Math.round(h(i, 2, 990) * 8); pset(x, y, i % 3 ? ET.abetoS : ET.abeto); if (i % 2) pset(x + 1, y - 1, ET.abetoS); }
    { const x = 52, yb = 128; rect(x, yb - 9, x + 13, yb, C.k); rect(x + 1, yb - 8, x + 12, yb - 1, hex('#2a5aa8')); rect(x + 1, yb - 8, x + 12, yb - 7, hex('#4a7ac8')); rect(x + 6, yb - 8, x + 7, yb - 1, hex('#f0f0f0')); rect(x + 10, yb - 6, x + 12, yb - 1, hex('#1a3a78')); disco(x + 5, yb - 10, 2, hex('#f0f0f0')); disco(x + 9, yb - 10, 2, hex('#f0f0f0')); }
    for (const [x, y, c] of [[20, 128, '#e04050'], [70, 131, '#f0c040']]) { disco(x, y, 3, C.k); disco(x, y, 2.5, hex(c)); for (let k = 0; k < 4; k++) pset(x - 2 + Math.round(h(k, x, 991) * 4), y - 2 + Math.round(h(k, y, 991) * 4), e_mez(hex(c), C.k, 0.4)); pset(x - 1, y - 1, C.blanco); }
    // unas tiras de espumillón dorado colgadas de la cornisa, a los lados del calendario (bajo la barra del año)
    for (const [a, b] of [[60, 84], [200, 250]]) for (let x = a; x <= b; x++) { const y = 17 + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 5); pset(x, y, (x & 1) ? C.oroN : hex('#fff0b0')); if ((x % 3) === 0) pset(x, y + 1, C.oroNS); }
  });
  // la vida de la ventana: fuegos lejanos, la ciudad, el farolillo; el destello en el alféizar y el suelo
  e_ciudadVida(R, t, W, 70, 0);
  const fu = e_fuegos(R, t, W, { s: 0.85, n: 4, k: 1, alto: 0.45 });
  e_llama(R, 248, 84, t, 2, true);
  e_destello(R, fu.luz, fu.col, 91, 94, [186, 268], [186, 268], 0.9);
  e_destello(R, fu.luz, fu.col, 120, 179, [196, 258], [176, 300], 0.45);
  // la estrella y las luces del abeto
  e_estrella(R, t, 38, 31); e_luces(R, t, 38, 34, 106, 27, 30, 0);
  // el calendario gigante
  const cal = e_calendario(R, t, 90, 22, 166, 96, o, false);
  // el reloj de pared sobre el aparador (por debajo de la esquina de Atom)
  e_reloj(R, 297, 68, 10, t, o.hora ?? 22.75, ET.madS);
  // el gato que duerme en la alfombra junto al árbol: respira, mueve la cola y levanta la oreja con cada estallido
  { const x = 82, y = 141, r = Math.sin(t * 1.8) > 0 ? 1 : 0, oreja = fu.luz > 0.6;
    for (let i = -8; i <= 8; i++) pset(x + i, y + 1, e_mez(R.pget(x + i, y + 1), C.k, 0.35));
    for (let j = -4 - r; j <= 0; j++) for (let i = -7; i <= 7; i++) if ((i / 7.5) ** 2 + ((j + 2) / (4 + r)) ** 2 < 1) pset(x + i, y + j, j < -3 ? hex('#a8a8b8') : i < -3 ? hex('#4a4a5a') : (i + 9) % 4 === 0 ? hex('#5a5a6a') : hex('#70707e'));
    disco(x + 6, y - 3, 3, hex('#70707e')); pset(x + 5, y - 6, hex('#5a5a6a')); pset(x + 8, y - (oreja ? 7 : 6), hex('#5a5a6a')); if (oreja) pset(x + 8, y - 6, hex('#5a5a6a'));
    if (oreja) { pset(x + 5, y - 3, hex('#c8e070')); pset(x + 7, y - 3, hex('#c8e070')); } else { pset(x + 5, y - 3, C.k); pset(x + 7, y - 3, C.k); } pset(x + 6, y - 2, hex('#f0a0a0')); pset(x + 9, y - 2, C.blanco);
    const c = Math.round(Math.sin(t * 0.9) * 2); linea(x - 7, y, x - 11, y - 1 + c, hex('#4a4a5a')); pset(x - 12, y - 2 + c, hex('#4a4a5a')); }
  return { suelo: 148, sueloFondo: 128, ventana: W, calendario: [90, 22, 166, 96], mes: cal.mes, arbol: [38, 31, 123], reloj: [297, 68], lampara: [174, 46], aparador: [274, 100, 319, 128], gato: [82, 141], mesa: [118, 222, 152], sofa: [0, 76, 136], libre: [[86, 118], [222, 272]], fuegos: fu };
}

// delante en el salón (general): el respaldo del sofá con la manta de cuadros, y la mesita baja con la fiesta preparada
function e_sofaMesita(R, t, o) {
  const { rect, pset, disco, linea } = R;
  // el sofá de terciopelo, de espaldas, con su capitoné, el brazo enrollado y la manta caída
  for (let y = 136; y <= 179; y++) for (let x = 0; x <= 76; x++) { const top = 136 + (x > 64 ? Math.round((x - 64) * 0.6) : 0); if (y < top) continue;
    const u = y - top; let c = u < 3 ? ET.tercL : (x + y) % 9 === 0 ? ET.tercS : ET.terc; if (x > 66) c = u < 3 ? ET.tercL : ET.tercS; if (x === 76 || y === top) c = C.k; pset(x, y, c); }
  for (let y = 147; y < 176; y += 11) for (let x = 6 + ((y / 11) & 1) * 6; x < 60; x += 12) { pset(x, y, ET.tercS); pset(x - 1, y - 1, ET.tercS); pset(x + 1, y + 1, ET.tercL); }
  disco(68, 146, 6, C.k); disco(68, 146, 5, ET.terc); disco(67, 145, 3, ET.tercL);
  for (let y = 136; y <= 166; y++) for (let x = 16; x <= 42; x++) { const zz = ((Math.floor((x - 16) / 4) + Math.floor((y - 136) / 4)) & 1); let c = zz ? hex('#f0e8d8') : hex('#2a5aa8'); if ((x - 16) % 4 === 0 || (y - 136) % 4 === 0) c = e_mez(c, C.k, 0.2); if (y === 166 || x === 16 || x === 42) c = e_mez(c, C.k, 0.45); pset(x, y + Math.round(Math.sin(x * 0.5) * 0.8), c); }
  for (let x = 17; x < 42; x += 2) pset(x, 168, hex('#f0e8d8'));
  // la mesita: tablero de nogal con vetas, canto, faldón y patas torneadas
  rect(118, 152, 222, 160, C.k); rect(119, 153, 221, 159, ET.mad); for (let g = 0; g < 4; g++) { const y = 154 + g * 1.4 | 0; for (let x = 120; x < 220; x++) if (h(x >> 3, g, 995) < 0.6 && ((x + g * 5) % 11) < 7) pset(x, y, g % 2 ? ET.madS : ET.madL); }
  rect(119, 153, 221, 153, ET.madL); rect(118, 160, 222, 163, ET.madS); rect(118, 163, 222, 163, C.k); rect(122, 164, 218, 167, ET.madD);
  for (const x of [122, 214]) { rect(x, 164, x + 4, 179, C.k); rect(x + 1, 164, x + 3, 179, ET.madS); rect(x + 1, 164, x + 1, 179, ET.madL); rect(x, 170, x + 4, 171, ET.madL); }
  e_confetiSuelo(R, 122, 153, 218, 158, 18, 1);
  // el plato con el racimo
  for (let j = -3; j <= 3; j++) for (let i = -12; i <= 12; i++) { const d = (i / 12) ** 2 + (j / 3.2) ** 2; if (d < 1) pset(146 + i, 156 + j, d > 0.7 ? hex('#8a8478') : d > 0.5 ? C.blanco : hex('#e8e4dc')); }
  e_racimo(R, 145, 146, 1.6, t);
  // las dos copas con las doce uvas
  for (const x of [170, 182]) e_copaUvas(R, x, 157, 1);
  // las copas de cava con sus burbujas y la botella con el papel dorado
  e_flauta(R, 198, 157, t, 0); e_flauta(R, 205, 157, t, 1); e_botella(R, 213, 157);
  // el gorro de fiesta tumbado y el matasuegras
  e_gorro(R, 128, 157, hex('#e04080'), hex('#f0c040'), true);
  linea(158, 158, 166, 158, hex('#5ab0ff')); disco(166, 157, 1.5, hex('#5ab0ff')); pset(158, 157, C.oroN);
  // la taza de chocolate que humea, en el brazo del sofá
  rect(62, 136, 68, 142, C.k); rect(63, 137, 67, 141, hex('#f0e8d8')); rect(63, 137, 67, 137, hex('#5a3020')); rect(68, 138, 70, 140, C.k); e_humo(R, 65, 134, t, 0, hex('#d8d0c8'), 12);
}

// una copa de cristal ancha con las doce uvas (base en x, yb)
function e_copaUvas(R, x, yb, s = 1) {
  const w = 4 * s, a = 5 * s; R.rect(x - 1, yb - 1, x + 1, yb, hex('#a8bccc')); R.rect(x, yb - 3 * s, x, yb - 1, hex('#c8dcec'));
  for (let j = 0; j <= a; j++) { const ww = Math.round(w * (1 - (j / a) ** 2 * 0.5)), y = yb - 3 * s - a + j; R.pset(x - ww, y, hex('#a8bccc')); R.pset(x + ww, y, hex('#e8f4fc')); }
  for (let i = 0; i < 12; i++) { const fx = (i % 4) - 1.5, fy = Math.floor(i / 4); R.pset(Math.round(x + fx * 1.6 * s), yb - 3 * s - 1 - fy * s, i % 3 ? C.uva : C.uvaS); if (s > 1) R.pset(Math.round(x + fx * 1.6 * s) + 1, yb - 3 * s - 1 - fy * s, C.uvaS); if (i > 7) R.pset(Math.round(x + fx * 1.6 * s), yb - 3 * s - 2 - fy * s, C.uvaB); }
  R.pset(x - w + 1, yb - 3 * s - a + 1, C.blanco);
}

// una copa de cava (flauta) con burbujas que suben (base en x, yb)
function e_flauta(R, x, yb, t, k = 0, s = 1) {
  const a = 7 * s, b = 3 * s; R.rect(x - 1 - (s > 1 ? 1 : 0), yb, x + 1 + (s > 1 ? 1 : 0), yb, hex('#a8bccc')); R.rect(x, yb - b, x, yb - 1, hex('#c8dcec'));
  for (let j = 0; j < a; j++) { const y = yb - b - 1 - j, w = s > 1 ? 2 : 1; R.pset(x - w - 1, y, hex('#90a8bc')); R.pset(x + w + 1, y, hex('#e8f4fc')); for (let i = -w; i <= w; i++) R.pset(x + i, y, j < a - 2 * s ? (i === -w ? ET.cavaS : ET.cava) : hex('#d8e8f4')); }
  for (let q = 0; q < 2 + s; q++) { const u = ((t * 0.9 + q / (2 + s) + k * 0.37) % 1), y = Math.round(yb - b - 1 - u * (a - 2 * s)); R.pset(x + ((q + k) % 2 ? 0 : (s > 1 ? 1 : 0)), y, hex('#fff8d8')); }
}

// la botella de cava con su papel dorado y la etiqueta lisa (base en x, yb)
function e_botella(R, x, yb, s = 1) {
  const { rect, pset } = R; rect(x - 2 * s, yb - 8 * s, x + 2 * s, yb, C.k); rect(x - 2 * s + 1, yb - 8 * s + 1, x + 2 * s - 1, yb, ET.botella); rect(x - 2 * s + 1, yb - 8 * s + 1, x - 2 * s + 1, yb, hex('#3a7a4a'));
  rect(x - s, yb - 12 * s, x + s, yb - 8 * s, ET.botella); rect(x - s, yb - 13 * s, x + s, yb - 10 * s, C.oroN); pset(x - s, yb - 12 * s, hex('#fff0b0'));
  rect(x - 2 * s + 1, yb - 5 * s, x + 2 * s - 1, yb - 3 * s, hex('#f0e8d0')); rect(x - s, yb - 4 * s, x + s, yb - 4 * s, hex('#c8a040'));
}

// un gorro de fiesta en cono con rayas y pompón (base en x, yb); tumbado: de lado
function e_gorro(R, x, yb, c, c2, tumbado = false) {
  if (tumbado) { for (let i = 0; i < 9; i++) { const w = Math.round((9 - i) * 0.45); for (let j = -w; j <= w; j++) R.pset(x + i, yb - 3 + j, (i >> 1) % 2 ? c2 : c); } R.disco(x + 10, yb - 3, 1.5, C.blanco); return; }
  for (let j = 0; j < 9; j++) { const w = Math.round(j * 0.45); for (let i = -w; i <= w; i++) R.pset(x + i, yb - 9 + j, ((j + i) >> 1) % 2 ? c2 : c); } R.disco(x, yb - 10, 1.5, C.blanco); R.pset(x - 1, yb - 11, hex('#f0f0f0'));
}

// las tres estampas del viaje enmarcadas (k 0 el rey, 1 la carta tras los barrotes, 2 el pastel y las monedas) en
// [x0, y0, x1, y1]; luz 0–1: apagada (en penumbra) o iluminada, con su halo dorado y destellos
function e_estampaViaje(R, t, k, x0, y0, x1, y1, luz) {
  const { rect, pset, disco, linea, poligono } = R, cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1, K = C.k;
  if (luz > 0.05) R.halo(cx, cy, Math.max(x1 - x0, y1 - y0) * 0.8, [hex('#3a5a44'), hex('#7a8a4a'), hex('#c8b860')], 0.6 + luz * 0.6);
  rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, K); rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, C.oroNS); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, C.oroN); rect(x0 - 2, y0 - 2, x0 - 2, y1 + 2, C.oroN); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, K);
  for (let x = x0 - 1; x <= x1 + 1; x += 3) { pset(x, y0 - 2, hex('#fff0b0')); pset(x, y1 + 2, e_mez(C.oroNS, K, 0.3)); }
  const ax = x0, ay = y0, aw = x1 - x0, ah = y1 - y0;
  if (k === 0) {   // el rey de Babilonia que llora con la corona torcida; la mano de la cachetada, de teatro, en el aire
    e_degr(R, ax, ay, x1, y1, [hex('#e8b860'), hex('#d89a48'), hex('#b87038')]);
    for (let x = ax; x <= x1; x += 6) for (let y = ay + 2; y <= y1; y += 4) pset(x + ((y >> 2) & 1) * 3, y, hex('#c88a40'));
    const fx = ax + Math.round(aw * 0.38), fy = ay + Math.round(ah * 0.58);
    rect(fx - 9, fy + 6, fx + 9, y1, hex('#3a3a8a')); rect(fx - 9, fy + 6, fx + 9, fy + 7, C.oroN); rect(fx - 1, fy + 8, fx + 1, y1, C.oroN);
    disco(fx, fy, 8, K); disco(fx, fy, 7, hex('#e8a878')); disco(fx - 2, fy - 2, 3, hex('#f8c8a0'));
    for (let i = -6; i <= 6; i++) for (let j = 3; j <= 9 - Math.abs(i) * 0.5; j++) pset(fx + i, fy + j, (i + j) % 3 ? hex('#3a2a1a') : hex('#5a4030'));
    linea(fx - 4, fy - 1, fx - 2, fy, K); linea(fx + 2, fy, fx + 4, fy - 1, K); rect(fx - 1, fy + 3, fx + 1, fy + 3, hex('#8a3a3a'));
    disco(fx + 5, fy + 1, 2, hex('#f0707a'));   // la mejilla colorada
    { const u = (t * 0.8) % 1; disco(fx - 5, fy + 2 + Math.round(u * 6), 1.2, hex('#7ac8ff')); pset(fx - 5, fy + 1 + Math.round(u * 6), C.blanco); }
    poligono([[fx - 8, fy - 6], [fx + 7, fy - 9], [fx + 6, fy - 14], [fx + 3, fy - 10], [fx, fy - 15], [fx - 3, fy - 10], [fx - 7, fy - 13]], C.oroN); linea(fx - 8, fy - 6, fx + 7, fy - 9, C.oroNS);
    for (const [px, py, c] of [[fx + 6, fy - 14, '#e04050'], [fx, fy - 15, '#4a8ad8'], [fx - 7, fy - 13, '#3aa860']]) pset(px, py, hex(c));
    const mx = fx + 18 + Math.round(Math.sin(t * 3) * 2), my = fy - 2; mano(R, mx, my, -1, '#c8a040', { sinManga: true });
    for (let q = 0; q < 3; q++) linea(mx + 9, my - 4 + q * 4, mx + 13, my - 5 + q * 4, C.blanco);
    for (const [sx, sy] of [[fx + 9, fy - 8], [fx + 12, fy + 6]]) { pset(sx, sy, C.blanco); pset(sx - 1, sy, hex('#fff0b0')); pset(sx + 1, sy, hex('#fff0b0')); pset(sx, sy - 1, hex('#fff0b0')); pset(sx, sy + 1, hex('#fff0b0')); }
  } else if (k === 1) {   // la carta con el corazón, tras los barrotes de una celda de piedra
    for (let y = ay; y <= y1; y++) for (let x = ax; x <= x1; x++) { const f = Math.floor((y - ay) / 6), lx = (x - ax + (f & 1) * 6) % 12; let c = h(Math.floor((x - ax + (f & 1) * 6) / 12), f, 996) < 0.3 ? hex('#6a6670') : hex('#7e7a84'); if ((y - ay) % 6 === 5 || lx === 11) c = hex('#4a4652'); pset(x, y, c); }
    const ex = cx - 11, ey = cy - 7; rect(ex, ey, ex + 22, ey + 15, K); rect(ex + 1, ey + 1, ex + 21, ey + 14, hex('#f6efe0')); linea(ex + 1, ey + 1, ex + 11, ey + 8, hex('#c8bca0')); linea(ex + 21, ey + 1, ex + 11, ey + 8, hex('#c8bca0'));
    const b = 0.6 + 0.4 * Math.sin(t * 3); e_picto(R, ['.aa.aa.', 'abaaaaa', 'aaaaaaa', '.aaaaa.', '..aaa..', '...a...'], ex + 8, ey + 6, 1, { a: b > 0.8 ? hex('#ff5060') : hex('#d02838'), b: hex('#ffb0b8') });
    R.halo(cx, cy, 6, [hex('#8a5a5a'), hex('#c87a6a')], 0.3 + b * 0.3);
    for (let x = ax + 5; x < x1; x += 9) { rect(x, ay, x + 2, y1, K); rect(x, ay, x, y1, hex('#8a8a96')); }
    rect(ax, ay + 3, x1, ay + 5, K); rect(ax, ay + 3, x1, ay + 3, hex('#8a8a96')); rect(ax, y1 - 5, x1, y1 - 3, K); rect(ax, y1 - 5, x1, y1 - 5, hex('#8a8a96'));
  } else {   // el pastel con sus velas junto a la montaña de monedas
    e_degr(R, ax, ay, x1, y1, [hex('#f8d8e0'), hex('#f0c0cc'), hex('#d8a0b0')]);
    for (let x = ax + 2; x < x1; x += 5) for (let y = ay + 3; y < y1 - 8; y += 5) pset(x + ((y / 5) & 1) * 2, y, hex('#fff0f4'));
    rect(ax, y1 - 6, x1, y1, hex('#a87a5a')); rect(ax, y1 - 6, x1, y1 - 6, hex('#c89a7a'));
    const px = ax + Math.round(aw * 0.32), pb = y1 - 6;
    rect(px - 12, pb - 2, px + 12, pb, hex('#d8d8e0')); rect(px - 10, pb - 12, px + 10, pb - 2, K); rect(px - 9, pb - 11, px + 9, pb - 3, hex('#f4e0c0')); rect(px - 9, pb - 7, px + 9, pb - 6, hex('#e06a8a'));
    rect(px - 7, pb - 19, px + 7, pb - 12, K); rect(px - 6, pb - 18, px + 6, pb - 12, hex('#fff4e8')); for (let x = px - 9; x <= px + 9; x += 3) rect(x, pb - 11, x, pb - 10 + (x & 1) * 2, hex('#fff4e8'));
    for (let q = 0; q < 4; q++) { const vx = px - 5 + q * 3 + (q > 1 ? 1 : 0); rect(vx, pb - 23, vx, pb - 19, q % 2 ? hex('#5ab0ff') : hex('#ff7ab0')); e_llama(R, vx, pb - 24, t, q, false); }
    const mx = ax + Math.round(aw * 0.72);
    for (let f = 0; f < 6; f++) { const n = 6 - f; for (let i = 0; i < n; i++) { const x = mx - (n - 1) * 2.5 + i * 5, y = pb - 2 - f * 3; disco(x, y, 2.5, hex('#a87a18')); rect(Math.round(x) - 2, y - 1, Math.round(x) + 2, y - 1, C.oroN); pset(Math.round(x) - 1, y - 1, hex('#fff0b0')); } }
    { const u = (t * 1.3) % 1; const sx = mx - 6 + Math.round(h(Math.floor(t * 1.3), 1, 997) * 12), sy = pb - 6 - Math.round(h(Math.floor(t * 1.3), 2, 997) * 12); if (u < 0.5) { pset(sx, sy, C.blanco); pset(sx - 1, sy, hex('#fff0b0')); pset(sx + 1, sy, hex('#fff0b0')); pset(sx, sy - 1, hex('#fff0b0')); pset(sx, sy + 1, hex('#fff0b0')); } }
  }
  // apagada: en penumbra, un velo tramado
  const os = (1 - luz) * 0.6; if (os > 0.02) for (let y = ay; y <= y1; y++) for (let x = ax; x <= x1; x++) pset(x, y, e_mez(R.pget(x, y), hex('#1e2a24'), os));
  if (luz > 0.6) for (let q = 0; q < 3; q++) { const a = t * 1.5 + q * 2.1, sx = Math.round(cx + Math.cos(a) * (aw * 0.55)), sy = Math.round(cy + Math.sin(a) * (ah * 0.6)); if (Math.sin(t * 6 + q) > 0) { pset(sx, sy, C.blanco); pset(sx - 1, sy, hex('#fff0b0')); pset(sx + 1, sy, hex('#fff0b0')); pset(sx, sy - 1, hex('#fff0b0')); pset(sx, sy + 1, hex('#fff0b0')); } }
}

// salón, cámara 'calendario': el calendario gigante de cerca, las tres estampas, el taburete y el borde del abeto
function e_calCerca(R, t, o) {
  const { rect, pset, disco, linea } = R;
  e_capa(R, 'tr_calCerca', () => {
    e_techo(R); e_papel(R, 0, 12, 319, 133, 1.5); e_zocalo(R, 134, 154, 46); e_tablas(R, 155, 179, 150, 16);
    // el aplique de pared sobre la tercera estampa (luz suave por debajo de la esquina de Atom)
    R.halo(251, 48, 12, [hex('#3a5a44'), hex('#5a7a5a'), hex('#8a9a6a')], 0.8); rect(250, 47, 252, 51, C.oroNS); rect(247, 43, 255, 46, hex('#f0dcaa')); rect(247, 43, 255, 43, hex('#fff4d8'));
    // el taburete de madera de dos peldaños bajo la esquina del calendario
    rect(184, 146, 212, 149, C.k); rect(185, 147, 211, 148, ET.madL); rect(185, 149, 211, 150, ET.madS);
    for (const x of [186, 208]) { rect(x, 150, x + 3, 170, C.k); rect(x + 1, 150, x + 2, 170, ET.mad); rect(x + 1, 150, x + 1, 170, ET.madL); }
    rect(188, 158, 208, 160, C.k); rect(189, 158, 207, 159, ET.mad); rect(189, 158, 207, 158, ET.madL);
    for (let x = 184; x <= 214; x++) if (e_b4(x, 171) < 0.6) pset(x, 171, e_mez(ET.suelo, C.k, 0.45));
    // el borde del abeto que entra por la derecha (las luces, en vida)
    e_abeto(R, 326, 58, 146, 30, 3); e_adornos(R, 326, 58, 146, 30, 10, 3);
    // la alfombra que asoma
    for (let y = 166; y <= 179; y++) for (let x = 40; x <= 280; x++) { const d = Math.hypot((x - 160) / 130, (y - 182) / 14); if (d > 1) continue; const an = Math.floor(d * 6); let c = [ET.terc, hex('#c8b890'), ET.abeto, ET.terc, hex('#c8b890'), ET.tercS][an]; if (((x + y * 2 + an) % 3) === 0) c = e_mez(c, C.k, 0.3); pset(x, y, c); }
  });
  e_luces(R, t, 326, 58, 146, 30, 16, 3);
  const L = o.estampas ?? [1, 1, 1];
  e_estampaViaje(R, t, 0, 16, 26, 78, 72, L[0] ?? 1); e_estampaViaje(R, t, 1, 16, 84, 78, 126, L[1] ?? 1); e_estampaViaje(R, t, 2, 228, 58, 282, 100, L[2] ?? 1);
  const cal = e_calendario(R, t, 96, 24, 212, 128, o, true);
  return { suelo: 168, taburete: [184, 212, 146], calendario: [96, 24, 212, 128], esquina: [212, 128], estampas: [[16, 26, 78, 72], [16, 84, 78, 126], [228, 58, 282, 100]], mes: cal.mes, libre: [[86, 180], [216, 290]] };
}

// delante en la cámara 'calendario': la planta de hojas grandes en su maceta, abajo a la izquierda, que se mece
function e_plantaDelante(R, t, o) {
  const { rect, disco, linea, pset } = R;
  rect(6, 160, 34, 179, C.k); rect(7, 161, 33, 179, hex('#c86a3a')); rect(7, 161, 33, 163, hex('#e8904a')); rect(28, 164, 33, 179, hex('#9a4a24'));
  for (let k = 0; k < 7; k++) { const a = -2.5 + k * 0.42 + Math.sin(t * 0.9 + k) * 0.06, l = 18 + (k % 3) * 6, bx = 20, by = 161, ex = Math.round(bx + Math.cos(a) * l), ey = Math.round(by + Math.sin(a) * l);
    linea(bx, by, ex, ey, ET.abetoS); for (let q = 4; q <= l; q++) { const px = bx + Math.cos(a) * q, py = by + Math.sin(a) * q, w = Math.sin((q - 4) / (l - 4) * Math.PI) * 4; for (let s = -w; s <= w; s++) pset(Math.round(px - Math.sin(a) * s), Math.round(py + Math.cos(a) * s), s < 0 ? ET.abetoL : ET.abeto); }
    linea(bx, by, ex, ey, ET.abetoS); pset(ex, ey, ET.abetoB); }
}

// medianoche (general): la pared de la ventana grande, con las luces bajas
function e_medianoche(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  const W = [79, 23, 201, 93];
  e_capa(R, 'tr_medianoche', () => {
    e_techo(R); e_papel(R, 0, 12, 319, 98); e_zocalo(R, 99, 118); e_tablas(R, 119, 179, 140);
    e_alfombra(R, 160, 162, 128, 15); e_confetiSuelo(R, 20, 122, 300, 179, 220, 2);
    e_ciudad(R, W, 76, 5);
    // el marco blanco de tres hojas, con el travesaño, y el alféizar
    rect(73, 17, 207, 22, hex('#e8e2d4')); rect(73, 17, 207, 17, C.blanco); rect(73, 17, 78, 98, hex('#e8e2d4')); rect(202, 17, 207, 98, hex('#c8c0b0'));
    for (const x of [119, 160]) { rect(x, 23, x + 2, 93, hex('#e8e2d4')); rect(x + 2, 23, x + 2, 93, hex('#a8a090')); }
    rect(79, 46, 201, 48, hex('#e8e2d4')); rect(79, 48, 201, 48, hex('#a8a090'));
    rect(68, 94, 212, 98, hex('#f0eadc')); rect(68, 98, 212, 99, hex('#a89c88')); rect(68, 94, 212, 94, C.blanco);
    // las cortinas recogidas, la barra
    rect(56, 13, 224, 15, ET.madD); rect(56, 13, 224, 13, C.oroN); disco(56, 14, 2, C.oroN); disco(224, 14, 2, C.oroN);
    for (const [a, b, lado] of [[58, 76, -1], [204, 222, 1]]) for (let y = 16; y <= 116; y++) { const cint = y > 58 && y < 64, w = cint ? 0.5 : y > 64 ? 0.9 : 1;
      for (let x = a; x <= b; x++) { const m = lado < 0 ? a : b, u = (x - m) * -lado / (b - a); if (u > w) continue; const ph = Math.sin((x + (y > 64 ? (y - 64) * 0.08 * lado : 0)) * 1.1); pset(x, y, ph > 0.5 ? hex('#9a3440') : ph > -0.3 ? ET.terc : ET.tercS); }
      if (cint) rect(lado < 0 ? a : b - 8, 60, lado < 0 ? a + 8 : b, 61, C.oroN); }
    // el abeto a la izquierda, con su cubo
    rect(22, 112, 38, 123, C.k); rect(23, 113, 37, 123, hex('#a83a2a')); rect(23, 113, 37, 114, hex('#d86a4a')); rect(28, 104, 32, 112, ET.madS);
    e_abeto(R, 30, 40, 106, 24, 5); e_adornos(R, 30, 40, 106, 24, 14, 5);
    // el reloj de caja alta: copete, caja de nogal con la puerta de cristal del péndulo y el zócalo
    rect(234, 32, 266, 36, C.k); rect(235, 33, 265, 35, ET.madL); poligono([[234, 32], [250, 24], [266, 32]], C.k); poligono([[237, 31], [250, 26], [263, 31]], ET.mad); disco(250, 23, 2, C.oroN);
    rect(236, 36, 264, 74, C.k); rect(237, 37, 263, 74, ET.mad); rect(237, 37, 238, 74, ET.madL); rect(261, 37, 263, 74, ET.madS);
    rect(240, 76, 260, 128, C.k); rect(241, 77, 259, 128, ET.mad); rect(241, 77, 241, 128, ET.madL); rect(258, 77, 259, 128, ET.madS);
    rect(244, 82, 256, 122, C.k); rect(245, 83, 255, 121, hex('#2a1a12'));
    rect(236, 128, 264, 146, C.k); rect(237, 129, 263, 145, ET.mad); rect(237, 129, 263, 129, ET.madL); rect(241, 133, 259, 141, ET.madS); rect(242, 134, 258, 140, ET.mad); rect(234, 145, 266, 147, ET.madD);
    for (let k = 0; k < 4; k++) { const vx = 248 + Math.round(h(k, 1, 998) * 6); for (let y = 132; y < 144; y++) if (h(vx, y, 999) > 0.1) pset(vx + Math.round(Math.sin(y * 0.3 + k) * 0.8), y, ET.madS); }
    for (let x = 230; x <= 270; x++) if (e_b4(x, 148) < 0.6) pset(x, 148, e_mez(ET.suelo, C.k, 0.5));
    // las luces bajas: todo en penumbra menos la ventana
    e_penumbra(R, 0.5, W);
  });
  // la ciudad y los fuegos grandes; el destello por la habitación y el suelo
  e_ciudadVida(R, t, W, 76, 5);
  const fu = e_fuegos(R, t, W, { s: 1.35, n: 5, k: 4, alto: 0.5 });
  e_destello(R, fu.luz, fu.col, 94, 99, [68, 212], [68, 212], 1);
  e_destello(R, fu.luz, fu.col, 119, 179, [76, 204], [30, 250], 0.55);
  e_destello(R, fu.luz, fu.col, 23, 116, [56, 76], [56, 76], 0.5); e_destello(R, fu.luz, fu.col, 23, 116, [204, 224], [204, 224], 0.5);
  // las luces del abeto (en la penumbra lucen más) y su estrella
  e_luces(R, t, 30, 40, 106, 24, 26, 5); e_estrella(R, t, 30, 37);
  // el reloj de caja alta: la esfera que marca casi las doce y el péndulo que oscila
  e_reloj(R, 250, 55, 11, t, o.hora ?? (23 + 59 / 60 + 50 / 3600), ET.madS, 0.15);
  { const a = Math.sin(t * Math.PI) * 0.32, px = 250 + Math.round(Math.sin(a) * 26), py = 84 + Math.round(Math.cos(a) * 26);
    R.recorte([245, 83, 255, 121]); linea(250, 84, px, py, hex('#a88a3a')); disco(px, py, 4, hex('#6a4a12')); disco(px, py, 3, C.oroNS); disco(px - 1, py - 1, 1.5, C.oroN);
    for (const [wx, wy] of [[247, 92 + Math.round(Math.sin(t * 0.2) * 2)], [253, 98 - Math.round(Math.sin(t * 0.2) * 2)]]) { linea(wx, 84, wx, wy, hex('#6a5a3a')); rect(wx - 1, wy, wx + 1, wy + 7, hex('#8a7a4a')); pset(wx - 1, wy, hex('#c8b070')); }
    R.recorte(null); for (let y = 84; y < 120; y += 3) pset(246, y, hex('#4a3a3a')); }
  // las serpentinas que cuelgan de la cornisa y se mecen
  e_serpentinas(R, t, [[0, 56], [56, 120], [120, 178], [178, 230]], 0.35);
  // los globos que cabecean, con sus cintas hasta el peso del suelo
  for (const [x, y, c, k] of [[284, 72, '#e04060', 0], [296, 64, '#f0c040', 1], [306, 76, '#5aa8ff', 2], [290, 86, '#8ae07a', 3]]) e_globo(R, t, x, y, hex(c), k, 294, 142, 0.3);
  rect(291, 140, 297, 145, C.k); rect(292, 141, 296, 144, e_mez(hex('#c8c0b0'), ET.noche, 0.35));
  // el confeti que cae por la habitación
  e_confeti(R, t, 0, 16, 319, 179, 90, 3, o.confeti ?? 1);
  return { suelo: 146, ventana: W, reloj: [250, 55], relojCaja: [234, 24, 266, 147], arbol: [30, 37, 123], globos: [294, 64, 142], mesa: [100, 220, 146], libre: [[40, 100], [216, 236], [266, 300]], fuegos: fu };
}

// las serpentinas de colores colgadas en guirnalda (tramos [a, b] de la cornisa) que se mecen, con rizos que caen; os: penumbra
function e_serpentinas(R, t, tramos, os = 0) {
  const COL = ['#ff5a6a', '#ffd040', '#5ad08a', '#5aa8ff', '#f08ae0'].map((c) => e_mez(hex(c), ET.noche, os));
  tramos.forEach(([a, b], k) => { const c = COL[k % 5], sw = Math.sin(t * 1.2 + k) * 1.5;
    for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = 13 + Math.round(Math.sin(u * Math.PI) * (7 + sw)); R.pset(x, y, c); if (((x + k) & 3) === 0) R.pset(x, y + 1, e_mez(c, C.k, 0.35)); }
    const rx = b, ry = 14; for (let j = 0; j < 14; j++) { const x = rx + Math.round(Math.sin(j * 0.9 + t * 2 + k) * 1.5), y = ry + j; R.pset(x, y, j % 3 ? c : e_mez(c, C.blanco, 0.4)); } });
}

// un globo que cabecea (centro x, y) con su brillo, el nudo y la cinta ondulada hasta (ax, ay); os: penumbra
function e_globo(R, t, x, y, c, k, ax, ay, os = 0) {
  const dy = Math.round(Math.sin(t * 1.3 + k * 1.9) * 1.5), dx = Math.round(Math.sin(t * 0.8 + k) * 1), cx = x + dx, cy = y + dy, cc = e_mez(c, ET.noche, os);
  for (let j = 0; j <= ay - cy - 8; j += 1) { const u = j / (ay - cy - 8), px = Math.round(cx + (ax - cx) * u + Math.sin(j * 0.4 + t * 2 + k) * 1.2); R.pset(px, cy + 8 + j, e_mez(hex('#d8d0c0'), ET.noche, 0.4)); }
  for (let j = -7; j <= 7; j++) for (let i = -6; i <= 6; i++) { const d = (i / 6) ** 2 + (j / 7) ** 2; if (d > 1) continue; R.pset(cx + i, cy + j, d > 0.8 ? e_mez(cc, C.k, 0.35) : i + j < -4 ? e_mez(cc, C.blanco, 0.2) : cc); }
  R.pset(cx - 3, cy - 4, e_mez(C.blanco, cc, 0.2)); R.pset(cx - 2, cy - 5, e_mez(C.blanco, cc, 0.4)); R.pset(cx - 3, cy - 3, e_mez(C.blanco, cc, 0.5));
  R.pset(cx, cy + 8, e_mez(cc, C.k, 0.3)); R.pset(cx - 1, cy + 8, e_mez(cc, C.k, 0.3)); R.pset(cx + 1, cy + 8, e_mez(cc, C.k, 0.3));
}

// delante a medianoche (general): la mesa de fiesta con el mantel de flecos y lo que hay encima, y el confeti por delante
function e_fiestaDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, os = (c) => e_mez(c, ET.noche, 0.2);
  rect(100, 146, 220, 150, C.k); rect(101, 147, 219, 149, os(ET.mantel)); rect(101, 147, 219, 147, os(C.blanco));
  for (let y = 150; y <= 170; y++) for (let x = 100; x <= 220; x++) { const f = Math.sin((x - 100) * 0.45 + (y - 150) * 0.05); pset(x, y, x === 100 || x === 220 ? C.k : os(f > 0.6 ? ET.mantel : f < -0.5 ? ET.mantelS : e_mez(ET.mantel, ET.mantelS, 0.4))); }
  for (let x = 101; x < 220; x++) { pset(x, 171, os(ET.mantelS)); if (x % 3 === 0) { pset(x, 172 + Math.round(Math.sin(t * 2 + x) * 0.6), os(hex('#f0c040'))); pset(x, 173, os(hex('#c8a040'))); } }
  rect(104, 174, 107, 179, C.k); rect(213, 174, 216, 179, C.k);
  for (let y = 150; y <= 166; y++) for (let x = 146; x <= 174; x++) { const g = x === 147 || x === 173; pset(x, y, os(g ? hex('#d8a840') : (x + y) % 7 === 0 ? ET.tercS : ET.terc)); }
  for (let x = 147; x <= 173; x += 2) pset(x, 167 + (x % 4 ? 0 : 1), os(hex('#d8a840')));
  for (let x = 100; x <= 220; x += 10) if (x < 140 || x > 176) rect(x + 2, 151, x + 3, 152, os(hex('#e04060')));
  // encima: el racimo en su plato, las copas de uvas, la cubitera con la botella, las flautas, los gorros y dos velas
  for (let j = -2; j <= 2; j++) for (let i = -11; i <= 11; i++) { const d = (i / 11) ** 2 + (j / 2.6) ** 2; if (d < 1) pset(150 + i, 148 + j, os(d > 0.6 ? hex('#a8a090') : C.blanco)); }
  e_racimo(R, 149, 138, 1.6, t);
  for (const x of [124, 136, 170, 182]) e_copaUvas(R, x, 149, 1);
  { const x = 200; rect(x - 6, 140, x + 6, 149, C.k); rect(x - 5, 141, x + 5, 149, hex('#a8acb8')); rect(x - 5, 141, x - 4, 149, hex('#e0e4ec')); e_botella(R, x, 141); for (let i = -4; i <= 4; i += 2) pset(x + i, 141, hex('#e8f4fc')); }
  e_flauta(R, 112, 149, t, 0); e_flauta(R, 212, 149, t, 1);
  e_gorro(R, 160, 149, hex('#5aa8ff'), C.blanco); e_gorro(R, 104, 149, hex('#e04080'), hex('#f0c040'), true);
  for (const [x, k] of [[143, 0], [158, 1]]) { rect(x - 1, 141, x + 1, 147, hex('#f4ecd8')); pset(x + 1, 142, hex('#c8bca0')); e_llama(R, x, 139, t, k, true); }
  e_confetiSuelo(R, 102, 146, 218, 149, 20, 4);
  // el confeti que cae por delante (poco, para no tapar caras)
  e_confeti(R, t, 0, 100, 319, 179, 26, 8, o.confeti ?? 1);
}

// medianoche, cámara 'mesa': el fondo en penumbra (reloj de caja alta, ventana con fuegos grandes, serpentinas y globos)
function e_mesaCerca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  const W = [155, 21, 261, 105];
  e_capa(R, 'tr_mesaCerca', () => {
    e_techo(R); e_papel(R, 0, 12, 319, 114, 1.5); e_zocalo(R, 115, 134, 46); e_tablas(R, 135, 179, 200, 16);
    e_ciudad(R, W, 86, 9);
    rect(149, 15, 267, 20, hex('#e8e2d4')); rect(149, 15, 267, 15, C.blanco); rect(149, 15, 154, 110, hex('#e8e2d4')); rect(262, 15, 267, 110, hex('#c8c0b0'));
    rect(206, 21, 209, 105, hex('#e8e2d4')); rect(209, 21, 209, 105, hex('#a8a090')); rect(155, 60, 261, 62, hex('#e8e2d4')); rect(155, 62, 261, 62, hex('#a8a090'));
    rect(144, 106, 272, 110, hex('#f0eadc')); rect(144, 110, 272, 111, hex('#a89c88')); rect(144, 106, 272, 106, C.blanco);
    for (const [a, b, lado] of [[132, 150, -1], [266, 276, 1]]) for (let y = 14; y <= 132; y++) { const w = y > 70 && y < 77 ? 0.5 : 1;
      for (let x = a; x <= b; x++) { const m = lado < 0 ? a : b, u = (x - m) * -lado / (b - a); if (u > w) continue; const ph = Math.sin((x + (y > 77 ? (y - 77) * 0.08 * lado : 0)) * 0.8); pset(x, y, ph > 0.5 ? hex('#9a3440') : ph > -0.3 ? ET.terc : ET.tercS); } }
    rect(130, 11, 278, 13, ET.madD); rect(130, 11, 278, 11, C.oroN);
    // el reloj de caja alta, de cerca: el copete, la caja con molduras y la puerta del péndulo
    poligono([[22, 28], [54, 16], [86, 28]], C.k); poligono([[26, 27], [54, 19], [82, 27]], ET.mad); rect(22, 28, 86, 33, C.k); rect(23, 29, 85, 32, ET.madL); disco(54, 14, 3, C.oroN);
    rect(26, 33, 82, 76, C.k); rect(27, 34, 81, 76, ET.mad); rect(27, 34, 29, 76, ET.madL); rect(79, 34, 81, 76, ET.madS);
    for (const x of [32, 74]) { rect(x, 36, x + 2, 74, ET.madS); rect(x, 36, x, 74, ET.madL); disco(x + 1, 37, 2, C.oroNS); }
    rect(34, 78, 74, 134, C.k); rect(35, 79, 73, 134, ET.mad); rect(35, 79, 36, 134, ET.madL); rect(71, 79, 73, 134, ET.madS);
    rect(41, 84, 67, 132, C.k); rect(42, 85, 66, 131, hex('#2a1a12'));
    e_penumbra(R, 0.5, W);
  });
  e_ciudadVida(R, t, W, 86, 9);
  const fu = e_fuegos(R, t, W, { s: 1.6, n: 4, k: 9, alto: 0.45 });
  e_destello(R, fu.luz, fu.col, 106, 111, [144, 272], [144, 272], 1);
  e_destello(R, fu.luz, fu.col, 112, 179, [150, 266], [100, 319], 0.5);
  e_reloj(R, 54, 54, 17, t, o.hora ?? (23 + 59 / 60 + 50 / 3600), ET.madS, 0.12);
  { const a = Math.sin(t * Math.PI) * 0.3, px = 54 + Math.round(Math.sin(a) * 34), py = 84 + Math.round(Math.cos(a) * 34); R.recorte([42, 85, 66, 131]); linea(54, 84, px, py, hex('#a88a3a')); linea(55, 84, px + 1, py, hex('#6a5020')); disco(px, py, 6, hex('#6a4a12')); disco(px, py, 5, C.oroNS); disco(px - 1, py - 1, 3, C.oroN); pset(px - 2, py - 2, hex('#fff0b0')); R.recorte(null); }
  e_serpentinas(R, t, [[0, 40], [40, 92], [92, 140], [150, 206], [206, 262]], 0.35);
  for (const [x, y, c, k] of [[104, 54, '#e04060', 0], [120, 66, '#f0c040', 1]]) e_globo(R, t, x, y, hex(c), k, 112, 130, 0.3);
  e_confeti(R, t, 0, 16, 319, 179, 70, 5, o.confeti ?? 1);
  return { suelo: 138, mesa: [0, 319, 130, 158], racimo: [158, 120, 3.4], uva: [167, 120], reloj: [54, 54], ventana: W, fuegos: fu };
}

// delante en la cámara 'mesa': el tablero con el mantel y la fiesta encima, de cerca
function e_mesaCercaDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, os = (c) => e_mez(c, ET.noche, 0.12);
  // el tablero con su mantel (tramado de luz de las velas en el centro) y el faldón con encaje
  for (let y = 130; y <= 158; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 120, (y - 142) / 22); let c = os(ET.mantel); if ((x + y * 3) % 23 === 0) c = os(ET.mantelS); if (d > 0.8 && e_b4(x, y) < (d - 0.8) * 2) c = os(ET.mantelS); if (d < 0.5 && e_b4(x, y) < (0.5 - d)) c = os(hex('#fff8e8')); pset(x, y, c); }
  rect(0, 130, 319, 130, C.k);
  // el damasco del mantel: rombos tramados que se estrechan hacia el fondo
  for (let y = 131; y <= 158; y++) { const p = 6 + (y - 130) * 0.25; for (let x = 0; x < 320; x++) { const u = ((x - 160) / p + 400) % 4, v = ((y - 130) / (p * 0.5)) % 4; if (Math.abs(Math.abs(u - 2) + Math.abs(v - 2) - 1.4) < 0.18) pset(x, y, e_mez(R.pget(x, y), ET.mantelS, 0.5)); } }
  // el camino de mesa de terciopelo granate con su galón dorado y los flecos
  for (let y = 136; y <= 154; y++) for (let x = 6; x <= 314; x++) { const g = y === 137 || y === 153; let c = g ? hex('#d8a840') : (x + y) % 7 === 0 ? ET.tercS : ET.terc; if (y === 136 || y === 154) c = hex('#3e0e16'); if (!g && y < 141 && e_b4(x, y) < 0.3) c = ET.tercL; pset(x, y, os(c)); }
  for (let x = 6; x <= 314; x += 2) { pset(x, 155, os(hex('#c8a040'))); }
  // los dos platos con sus cubiertos y servilleta, delante de cada comensal
  for (const px of [92, 228]) { for (let j = -3; j <= 3; j++) for (let i = -13; i <= 13; i++) { const d = (i / 13) ** 2 + (j / 3.4) ** 2; if (d < 1) pset(px + i, 133 + j, os(d > 0.7 ? hex('#3a6a9a') : d > 0.55 ? C.blanco : hex('#ece8e0'))); }
    linea(px - 17, 131, px - 17, 136, os(hex('#b8bcc8'))); linea(px + 17, 131, px + 17, 136, os(hex('#b8bcc8'))); pset(px + 17, 131, C.blanco); rect(px - 22, 131, px - 19, 135, os(hex('#e04060'))); }
  // la luz de la vela sobre el mantel
  for (let y = 134; y <= 158; y++) for (let x = 170; x <= 232; x++) { const d = Math.hypot((x - 200) / 32, (y - 148) / 10); if (d < 1 && (1 - d) * 0.8 > e_b4(x, y) + 0.2) pset(x, y, e_mez(R.pget(x, y), hex('#ffd890'), 0.25)); }
  for (let y = 159; y <= 179; y++) for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.3 + (y - 159) * 0.04); pset(x, y, os(f > 0.55 ? ET.mantel : f < -0.5 ? hex('#b8ac98') : ET.mantelS)); }
  for (let y = 166; y <= 179; y++) for (let x = 0; x < 320; x++) { const u = (x % 20) - 10, v = y - 166; if (Math.abs(Math.abs(u) - v * 0.8) < 0.7 || (v === 6 && Math.abs(u) < 3)) pset(x, y, os(hex('#e8dcc0'))); }
  for (let x = 0; x < 320; x++) { pset(x, 159, os(hex('#a89c88'))); const e = (x % 6); if (e < 4) pset(x, 160 + (e === 1 || e === 2 ? 1 : 0), os(C.blanco)); if (e === 2) pset(x, 163, os(C.blanco)); }
  e_confetiSuelo(R, 4, 132, 316, 157, 70, 6);
  // el plato grande con el racimo (falta la uva de la derecha: es la que tiene ojos)
  for (let j = -5; j <= 5; j++) for (let i = -26; i <= 26; i++) { const d = (i / 26) ** 2 + (j / 5.5) ** 2; if (d < 1) pset(160 + i, 146 + j, os(d > 0.75 ? hex('#a8a090') : d > 0.6 ? C.blanco : hex('#ece8e0'))); }
  for (const [sx, w] of [[40, 7], [74, 5], [104, 9], [222, 9], [250, 5], [284, 6]]) for (let i = -w; i <= w + 3; i++) if (e_b4(sx + i, 151) < 0.6) pset(sx + i + 2, 151, os(ET.mantelS));
  e_racimo(R, 158, 120, 3.4, t, 3);
  // las dos copas con las doce uvas, las flautas con burbujas, la botella, la vela, el gorro y el matasuegras
  e_copaUvas(R, 104, 150, 2); e_copaUvas(R, 222, 150, 2);
  e_flauta(R, 74, 150, t, 0, 2); e_flauta(R, 250, 150, t, 1, 2); e_botella(R, 40, 150, 2);
  rect(198, 130, 202, 147, os(hex('#f4ecd8'))); rect(201, 131, 202, 147, os(hex('#c8bca0'))); rect(195, 147, 205, 149, os(hex('#c8a040'))); e_llama(R, 200, 128, t, 4, true);
  e_gorro(R, 284, 150, hex('#e04080'), hex('#f0c040'));
  { const u = Math.max(0, Math.sin(t * 1.6)), L = Math.round(4 + u * 16); linea(124, 154, 124 + L, 154 - Math.round(u * 3), hex('#5ab0ff')); linea(124, 155, 124 + L, 155 - Math.round(u * 3), hex('#2a6ad0')); if (u < 0.5) disco(124 + L, 153, 2, hex('#5ab0ff')); rect(118, 153, 123, 156, hex('#f0c040')); rect(116, 154, 118, 155, C.blanco); }
  e_confeti(R, t, 0, 120, 319, 179, 22, 11, o.confeti ?? 1);
}
