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
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Cada encuadre se pinta en tres capas: el fondo
// (cielo o calle por la ventana, en un búfer), la vida de detrás (nubes, estrellas, gente que pasa), el decorado fijo
// (un búfer con huecos en ventanas y puertas, que recorta solo lo de fuera) y la vida de delante (llamas, luces, humo).
//   'sol': la Puerta del Sol en Nochevieja: la Casa de Correos de ladrillo y piedra con su torre, el reloj y la bola en el
//     mástil, el templete de hierro, bombillas que parpadean en las cornisas; a la izquierda dos casas de balcones con
//     ventanas encendidas y gente asomada, el café con toldo; la estatua ecuestre y el oso del madroño; farolas fernandinas;
//     la multitud de fondo con gorros de fiesta que se mece; confeti que cae; cielo de noche tramado con estrellas, luna y
//     nubes. o.bola 0–1 (la bola baja por el mástil); o.campanada 0–12 (en cada entero: destello en el reloj y la multitud
//     levanta las uvas); o.fuegos 0–1 (fuegos artificiales en el cielo); o.confeti (true por omisión).
//     Cámara 'reloj': la torre de cerca desde la azotea: la esfera grande con 12, 3, 6 y 9 y sus agujas (o.minuto 0–60,
//     59,5 por omisión), la bola grande con bombillas en el mástil (o.bola), el templete con la campana, la puerta de la
//     torre encendida, la balaustrada y los tejados de Madrid de noche; o.campanada y o.fuegos igual que en 'sol'.
//   'casa1890': el salón de una casa burguesa de Madrid en 1890: papel pintado de damasco, chimenea de mármol con fuego,
//     espejo dorado, reloj de sobremesa, retrato, lámpara de gas de cinco globos, palmera en su macetero, alfombra persa,
//     sillas, el balcón con cortinas de terciopelo abierto a la calle de noche, un gato junto al fuego. La mesa con mantel,
//     el champán en su cubo, las copas con burbujas y el frutero con uvas van en anuevoDelante.
//     Cámara 'calle': la calle de abajo de noche: la fachada con el balcón principal encendido (la familia en silueta brinda),
//     el portal, la tienda cerrada, farolas de gas, adoquines mojados, la calle que se aleja con un coche de caballos y el
//     sereno con su farol.
//   'vinedo': un viñedo de Alicante en la vendimia de 1909: cepas en vaso con racimos en hileras que se pierden, tierra
//     roja con surcos, el camino del centro, la masía blanca con su riurau, palmera y almendro, sierras secas, cielo de otoño
//     con nubes y estorninos; vendimiadores pequeños con capazos y un carro con su mula. o.cartel (true por omisión): el
//     cartel de madera con una uva dorada pintada (sin letras).
//     Cámara 'cajas': el almacén: pared encalada con la piedra asomando, vigas, la puerta grande abierta al viñedo, la luz
//     que entra con motas de polvo, pilas de cajas de madera llenas de uvas, la báscula de pesas que oscila, capazos y
//     podaderas colgados, avispas sobre las uvas, un gato en las cajas. La pila de cajas de delante va en anuevoDelante.
//   'tele62': un salón de 1962: papel pintado de rombos y estrellas, la tele de madera con antena de cuernos sobre su mueble
//     de patas, el sofá turquesa con cojines y un gato dormido, la lámpara de pie, el reloj de sol en la pared, la estantería
//     con la pecera, el teléfono de disco, la ventana con visillo a la ciudad de noche y la alfombra trenzada. o.pantalla
//     (R, t, [x0, y0, x1, y1]) pinta dentro de la pantalla (recortada); sin ella sale el reloj de la Puerta del Sol en blanco
//     y negro con rayas y nieve. La mesita baja con el plato de uvas y las copas va en anuevoDelante.
//     Cámara 'pantalla': la tele de cerca (inserto): la pantalla grande con su cristal curvo y su reflejo, los mandos, el
//     altavoz, la antena, el tapete con el jarrón y la foto, el mueble de abajo; o.pantalla igual.
//   'despacho': el despacho de un recaudador inglés en 1752: paneles de roble, la ventana emplomada a una calle de Londres
//     con casas de ladrillo, gente con tricornio y lluvia, el calendario de pared (o.mes 1–12 con su número grande y la
//     cuadrícula de días; o.pasa 0–1 levanta la hoja), el mapa enmarcado, los casilleros con legajos y libros, un ratón,
//     el reloj de caja alta con su péndulo, el arcón con la bolsa de monedas, la silla de respaldo alto. El escritorio con
//     los libros, la vela, el tintero y la pluma va en anuevoDelante.
//     Cámara 'libro': el libro de cuentas abierto sobre el escritorio (inserto, sin letras: renglones, columnas y cifras):
//     o.mes 1–12 en la cabecera, o.pasa 0–1 pasa una hoja; vela, tintero con pluma, monedas, anteojos, lacre.
//   'babilonia': un templo de Babilonia en la fiesta del Año Nuevo, al amanecer: muro de ladrillo vidriado azul con leones y
//     dragones en relieve y rosetas, la torre con su banderola, el zigurat al fondo con la procesión de sacerdotes, palmeras,
//     casas de adobe, la gente tras el pretil, braseros con fuego y humo, el patio de ladrillo; cielo de amanecer con nubes.
//     Cámara 'altar': la cella: vigas de cedro, el nicho escalonado con el símbolo dorado del dios, el estrado con el trono,
//     lámparas de aceite, el incensario. El altar con las insignias del rey (o.insignias, true por omisión: la tiara, el cetro
//     y el aro con la vara) va en anuevoDelante.
// Delante: anuevoDelante (la multitud de delante en 'sol', la mesa del salón, las cajas, la mesita de 1962, el escritorio,
// la tinaja de dátiles y el altar), con las mismas opciones, después de los actores. Las dos funciones devuelven
// { suelo, … } con la geometría del encuadre (ver la nota de cada uno).
export function anuevo(R, t, o = {}) {
  const enc = o.encuadre ?? 'sol', cam = o.camara ?? 'general';
  const f = { sol: a_sol, casa1890: a_casa, vinedo: a_vinedo, tele62: a_tele, despacho: a_despacho, babilonia: a_babilonia }[enc] ?? a_sol;
  return f(R, t, o, cam);
}
// lo que va delante de los personajes en año nuevo (se llama después de los actores, con las mismas opciones)
export function anuevoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'sol', cam = o.camara ?? 'general';
  const f = { sol: a_solDelante, casa1890: a_casaDelante, vinedo: a_vinedoDelante, tele62: a_teleDelante, despacho: a_despachoDelante, babilonia: a_babiloniaDelante }[enc];
  return f ? f(R, t, o, cam) : null;
}
// ── B · El amor ─────────────────────────────────────────────────────────────────────────────────────────────
// Cinco decorados, cada uno con dos cámaras (o.camara: 'general' por omisión o la segunda que se dice). Lo fijo de cada
// encuadre va en un búfer (se pinta una vez) y encima, en cada fotograma, la vida: llamas que tiemblan con su resplandor,
// humo, polvo en la luz, nubes a tres velocidades, pájaros, agua, nieve, coches de caballos, gente pequeña de fondo.
// La línea de suelo de los personajes es y = 150 en las generales (en 'vitral' y 'ventana', 166).
//   'iglesia': una pequeña iglesia romana del siglo III, con respeto: techo de vigas, paredes de estuco con friso de
//     guirnaldas y zócalo pompeyano rojo con vetas; el ábside con su arco de dovelas, la media cúpula azul con estrellas
//     y una paloma, y abajo pintado el Buen Pastor con dos ovejas y dos palmeras (figuras sencillas, sin rostros); dos
//     columnas estriadas con capitel; el altar de mármol con su mantel, la lucerna, la copa y el pan; el pebetero con su
//     humo; una ventanita a la izquierda con su haz de luz y motas; la hornacina de la derecha con ánfora, jarra y la caja
//     de rollos; suelo de mosaico (círculos, cenefa trenzada); dos lámparas de bronce colgadas que se mecen; al fondo,
//     dos fieles que se inclinan y alguien que barre. Delante: el candelabro alto de la izquierda y el banco de la derecha.
//     Cámara 'vitral': el fresco de cerca (en el siglo III no había vidrieras): dos santos de túnica blanca con clavos
//     rojos, palio y la palma en la mano, aureolas doradas, la corona de laurel con la paloma, cipreses, prado con flores,
//     cielo azul con estrellas; desconchones y grietas; debajo, la repisa con tres lucernas cuyo resplandor late sobre la
//     pintura, el humo y una polilla. Suelo de losas.
//   'chaucer': el gabinete de un poeta inglés hacia 1380: paredes de entramado con yeso, friso de madera de pliegues, la
//     librería con códices de broches y rollos, el tapiz de mil flores con dos pájaros, el astrolabio colgado (gira),
//     la ventana gótica de dos luces con óculo, contraventanas abiertas, y fuera el jardín: cielo con nubes de tres tonos,
//     colinas, la torre de una iglesia, un seto, un majuelo en flor y la rama donde se posan los pájaros por parejas (o.parejas,
//     3 por omisión; o.llega: un pájaro llega y se posa junto al que está solo, sí por omisión); el haz de sol en el suelo,
//     suelo de tablas con una estera de junco, el arcón con un gato que duerme. Delante: el pupitre inclinado con el
//     pergamino, el cuerno de tinta y la pluma, la vela y el reloj de arena. Cámara 'ventana': la ventana de cerca, con
//     los pájaros grandes en la rama (las mismas opciones), el alféizar con un libro, un tintero y una maceta.
//   'torre': una celda de la Torre de Londres en el siglo XV: sillares grandes, la bóveda en sombra, el ventanuco en
//     derrame con barrotes y el Támesis detrás (el agua corre, pasa una coca con su vela, gaviotas, la otra orilla con casas
//     y una aguja), la puerta de roble con clavos, bisagras y su rejilla (detrás tiembla una antorcha y a ratos pasa el
//     casco de un guardia), el tapiz azul de lises, la repisa con jarra y cuenco, el arcón y el taburete, el camastro de
//     paja con su manta, las rayas de los días y un corazón grabados en la piedra, paja en el suelo de losas, un ratón que
//     cruza. Delante: la mesa de caballete con la vela, los papeles, el tintero y el lacre (o.carta 0–1: lo escrito).
//     Cámara 'mesa': la mesa de cerca: la carta (o.carta 0–1: los renglones aparecen; al final, un corazoncito), la vela
//     grande con sus chorretones, el tintero con la pluma, el lacre y el sello, cartas dobladas; detrás, el ventanuco con
//     el río y las rayas en la pared.
//   'correos': una oficina de correos de Londres en 1840: pared verde con cornisa, friso de caoba, la ventana de guillotina
//     a la calle nevada (casas de ladrillo con ventanas encendidas y chimeneas que humean, coches de caballos que pasan,
//     gente con chistera y paraguas, la farola de gas; nieva), el reloj regulador con su péndulo, el aplique de gas, la
//     estufa de hierro con la tetera que echa vapor, las sacas de correo con cartas, un perrito que mueve la cola, los
//     casilleros llenos de cartas (a ratos entra una), suelo de baldosas. Delante: el mostrador de caoba con la báscula
//     (el platillo oscila), el tampón y las cartas (o.tarjetas 0–1: el montón de tarjetas crece). Cámara 'mostrador': el
//     mostrador de cerca: el pliego de sellos negros de un penique, la báscula con su carta, el montón de tarjetas de
//     encaje (o.tarjetas), peniques, el sello de mano y el tampón; detrás, los casilleros grandes y el aplique.
//   'taller': el taller de Esther Howland en Worcester hacia 1848: papel pintado de rayas con ramitos, friso pintado, dos
//     ventanas de guillotina con cortinas a una calle nevada de Nueva Inglaterra (casas de tablas blancas con
//     contraventanas verdes, olmos desnudos, un trineo que pasa, nieve), la cuerda con tarjetas tendidas que se mecen, la
//     estantería con cajas de encaje y tarros de flores de papel, la puerta al cuarto de al lado donde dos mujeres montan
//     tarjetas en una mesa larga, la chimenea con la repisa (reloj, candeleros, flores de papel) y la estufa encendida con
//     la tetera, un gato en la alfombra, suelo de pino con alfombra trenzada. Delante: la mesa de trabajo con encajes,
//     tijeras, cola, flores y tarjetas. Cámara 'mesa': la mesa de cerca con la tarjeta a medio hacer (o.tarjeta 0–1: el
//     papel, el encaje, el corazón, las flores y el lazo), el encaje suelto que se mueve con el aire, las tijeras, el bote
//     de cola con su pincel, el carrete de cinta, flores sueltas y la caja de tarjetas acabadas; detrás, la ventana nevada.
// Delante: amorDelante (con las mismas opciones), después de los actores. Devuelve la geometría del encuadre:
// { suelo, … } (mesa / mostrador / altar: [x0, x1, yArriba]; ventana / puerta: [x0, y0, x1, y1]; libre: tramos de x).
export function amor(R, t, o = {}) {
  const enc = o.encuadre ?? 'iglesia', cam = o.camara ?? 'general';
  const f = { iglesia: b_iglesia, chaucer: b_chaucer, torre: b_torre, correos: b_correos, taller: b_taller }[enc] ?? b_iglesia;
  R.recorte(null);
  const g = f(R, t, o, cam);
  R.recorte(null);
  return g;
}
// lo que va delante de los personajes en el amor (se llama después de los actores, con las mismas opciones): el
// candelabro y el banco de la iglesia, el pupitre de Chaucer, la mesa de la celda (o su tablero de cerca), el mostrador
// de correos (o su tablero de cerca) y la mesa del taller (o su tablero de cerca); en 'vitral' y 'ventana', nada
export function amorDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'iglesia', cam = o.camara ?? 'general';
  const f = { iglesia: b_iglesiaDelante, chaucer: b_chaucerDelante, torre: b_torreDelante, correos: b_correosDelante, taller: b_tallerDelante }[enc];
  R.recorte(null);
  if (f) f(R, t, o, cam);
  R.recorte(null);
}
// ── C · Primavera y otoño ───────────────────────────────────────────────────────────────────────────────────
// estaciones(R, t, o) pinta los 320 × 180 y devuelve { suelo, … } con la geometría del encuadre. o.encuadre (y
// o.camara: 'general' por omisión o la segunda de cada uno; cualquier valor que no sea 'general' es la segunda):
//   'gallinero': una cocina rural de primavera: techo de vigas, pared encalada con zócalo azul, el hogar con su campana,
//     el fuego y el caldero donde hierven los huevos (vapor), la ventana con la iglesia y su campana que se mece, el
//     vasar de platos, el ramo de sauce, la puerta abierta al corral con el gallinero, gallinas (una entra en la cocina y
//     vuelve), un pollito, el gato junto al hogar y el suelo de barro cocido. Cámara 'cestas': la mesa de cerca con la
//     balda de tintes y pieles de cebolla, la ventana con la iglesia, la cesta grande de huevos, el cuenco de tinte rojo
//     que ondea, los tarritos con pinceles y la fila de ocho huevos que se pintan.
//     o.huevos 0–1: lo llenas que están las cestas (1); o.pintados 0–1: cuántos huevos están pintados (0; el último, a medias).
//   'jardin': un jardín alemán de 1682 en primavera: colinas con viñas y un castillo, el pueblo con su torre, la casa de
//     entramado (chimenea con humo), la cerca de mimbre, el manzano en flor que suelta pétalos, forsitia y lila, el pozo
//     con el cubo que sube y baja y el gato en el brocal, el parterre de tulipanes, el camino de grava, una gallina,
//     mariposas y una abeja. Cámara 'arbustos': la pared de entramado, el seto alto, tres arbustos en flor (lila, forsitia,
//     espirea) con los huevos de colores escondidos. o.huevos: cuántos huevos se ven todavía (6 en general, 8 de cerca; hasta 8).
//   'pensilvania': una granja de Pensilvania del XVIII: campos en mosaico con un labrador que ara, la casa de piedra de
//     dos plantas con tejadillo y dos chimeneas, el roble, el carro, el granero de banco (piedra abajo, tablas rojas,
//     cúpula con veleta), la cerca en zigzag, el camino con roderas, vacas y gallinas. Cámara 'porche': el porche de la
//     casa de piedra: ventana con contraventanas, puerta holandesa con el farol dentro, banco con el gato, maíz colgado,
//     golondrinas que entran a su nido, la baranda abierta a los campos y el granero; o.nido (true) y o.huevos (3, hasta
//     5): el nido hecho con un sombrero de paja vuelto, con huevos de colores.
//   'aldea': una aldea irlandesa en otoño: colinas con prados y muros, la colina con la hoguera de fiesta y gente
//     pequeña que baila, la iglesia de piedra con espadaña y velas en las ventanas (Todos los Santos), dos casitas
//     encaladas con tejado de paja y humo de turba, muros de piedra seca, el camino con charcos, el espino con bayas,
//     niebla, ovejas, hojas. o.noche 0–1 (0 = atardecer; 1 = noche con luna, estrellas, ventanas encendidas, linternas
//     de nabo en los muros y un búho); se funde con trama. Cámara 'hoguera': la hoguera de cerca en la cima (o.noche,
//     0.75 por omisión): el valle con el río y las luces del pueblo, el fuego grande con chispas, humo y su resplandor,
//     nueve bailarines pequeños detrás, un violinista y un tamborilero sentados en piedras y un menhir.
//   'calle1927': una calle de un pueblo de Canadá en 1927 con la primera nieve, al anochecer: pinos nevados, el
//     campanario, dos casas de madera con porche (ventanas encendidas, calabazas talladas, un gato), la imprenta de
//     ladrillo con la prensa que funciona en el escaparate y el impresor, farolas encendidas, la acera de tablas, la
//     calle de barro con nieve, hojas y la nieve que cae. Cámara 'puerta': el porche de cerca: la puerta con cristal y
//     visillo, la aldaba, el farol de pared, dos ventanas encendidas (alguien pasa), botellas de leche, la escoba, y a
//     los lados la calle nevada.
//   'calle50': una calle de las afueras de EE. UU. en Halloween, en los cincuenta: cielo de anochecer con luna creciente
//     y murciélagos, tres casas (la del centro de dos plantas, con antena), teles encendidas en los ventanales,
//     calabazas talladas, arces de otoño que sueltan hojas, cerca blanca, buzones, la farola, la acera y dos niños
//     pequeños disfrazados (fantasma y bruja) que piden dulces. Cámara 'porche': el porche de cerca: la puerta roja con
//     la mosquitera abierta, la lámpara con polillas, la ventana con un gato de papel, el ventanal con la tele, el
//     taburete con el cuenco de dulces (o.dulces 0–1, 1) y calabazas; o.pantalla(R, t, [x0, y0, x1, y1]) pinta dentro de
//     la tele (si no, un dibujo animado de un gato que persigue a un ratón).
// Delante: estacionesDelante (con las mismas opciones, después de los actores): la mesa con las cestas (gallinero) o el
// tablero de cerca con la cesta, el cuenco, los tintes y la fila de huevos (cestas); un arbusto en flor y tulipanes
// (jardín) o la mata blanca grande de la derecha (arbustos); la esquina de la cerca en zigzag (pensilvania) o el poste
// con un cubo (porche); el muro de piedra seca (aldea) o la leña (hoguera); el Ford T aparcado (calle1927) o la calabaza
// y el haz de maíz (puerta); el coche de aletas (calle50) o la bala de paja con calabazas (porche).
export function estaciones(R, t, o = {}) {
  const enc = o.encuadre ?? 'gallinero', cerca = (o.camara ?? 'general') !== 'general', f = c_ESTACIONES[enc] ?? c_ESTACIONES.gallinero;
  return f[0](R, t, o, cerca);
}
// lo que va delante de los personajes en primavera y otoño (se llama después de los actores, con las mismas opciones)
export function estacionesDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'gallinero', cerca = (o.camara ?? 'general') !== 'general', f = c_ESTACIONES[enc] ?? c_ESTACIONES.gallinero;
  if (f[1]) f[1](R, t, o, cerca);
}
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
    cerca: { suelo: 130, juez: [150, 127], tapa: 122, taco: [164, 124], mazo: [164, 116] },
  },
  capilla: {
    general: { suelo: 150, pasillo: [[150, 170, 114], [118, 202, 180]], altar: [128, 192, 112], novios: [[150, 150], [172, 150]], escala: 'pies de 118 (altar) a 172 (delante)' },
    cerca: { suelo: 160, altar: [110, 210, 136], ventanal: [118, 18, 202, 66], libre: [[90, 230]] },
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
  const { rect, pset, disco, linea } = R, D = d_C, B = R.buf;
  // se dibuja nítido y después se desenfoca (b_desenfoca): la boiserie con sus cuarterones, la cornisa, el friso dorado
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y < 10 ? D.estuco : h(x >> 3, y >> 3, 231) < 0.3 ? d_mez(D.boi, D.boiS, 0.25) : D.boi;
  rect(0, 7, 319, 9, C.oroS); rect(0, 8, 319, 8, C.oro); rect(0, 10, 319, 12, D.boiS);
  for (let k = 0; k < 8; k++) { const x0 = -14 + k * 46, x1 = x0 + 38;
    for (const [y0, y1] of [[18, 82], [94, 114]]) { rect(x0, y0, x1, y1, D.boiL); rect(x0 + 1, y0 + 1, x1, y1, D.boiS); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, d_mez(D.boi, D.boiL, 0.35)); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, D.boiS); rect(x0 + 4, y0 + 4, x1 - 3, y1 - 3, D.boiL); rect(x0 + 4, y0 + 4, x1 - 4, y1 - 4, D.boi); }
    disco(x0 + 19, 20, 3, C.oro); disco(x0 + 19, 20, 1.5, C.oroL); linea(x0 + 12, 22, x0 + 16, 20, C.oroS); linea(x0 + 22, 20, x0 + 26, 22, C.oroS); }
  rect(0, 86, 319, 90, D.boiS); rect(0, 86, 319, 87, D.boiL); rect(0, 116, 319, 117, D.boiD);
  // la ventana del atardecer a la izquierda, con su parteluz, la nieve en el alféizar y las cortinas de damasco
  for (let y = 18; y < 104; y++) for (let x = 10; x < 70; x++) pset(x, y, d_mez(hex('#4a4672'), hex('#e0a08e'), Math.min(1, (y - 18) / 76)));
  for (let x = 10; x < 70; x++) { const yy = Math.round(84 + 4 * Math.sin(x * 0.11)); for (let y = yy; y < 104; y++) pset(x, y, y === yy ? hex('#8a7a9a') : hex('#5a4e6e')); }
  for (const xx of [26, 54]) { linea(xx, 104, xx, 92, hex('#3a2e3e')); linea(xx - 3, 96, xx + 3, 94, hex('#3a2e3e')); }
  rect(38, 18, 41, 104, D.estuco); rect(10, 58, 70, 61, D.estuco); rect(8, 103, 72, 106, D.estuco); rect(8, 102, 72, 102, C.blanco);
  for (const [a, b] of [[0, 14], [66, 82]]) for (let y = 10; y < 118; y++) for (let x = a; x < b; x++) pset(x, y, Math.sin(x * 0.8) > 0.3 ? D.tercL : Math.sin(x * 0.8) < -0.5 ? D.tercS : D.terc);
  rect(0, 10, 84, 13, C.oroS);
  // el espejo dorado del centro: el marco con su copete y el cristal con el salón reflejado (luces cálidas, la ventana)
  rect(108, 16, 212, 74, C.oroS); rect(110, 18, 210, 72, C.oro); rect(110, 18, 210, 18, C.oroL); disco(160, 16, 6, C.oro); disco(160, 15, 3, C.oroL);
  for (let y = 22; y < 69; y++) for (let x = 114; x < 207; x++) pset(x, y, d_mez(D.espejoS, D.espejo, (y - 22) / 47));
  for (const [x, y, r] of [[136, 40, 4], [184, 44, 5], [160, 60, 6]]) disco(x, y, r, hex('#d8c8a0'));
  for (let y = 24; y < 67; y++) { const x = 126 + (y - 24) * 0.6; rect(Math.round(x), y, Math.round(x) + 5, y, D.espejoL); rect(Math.round(x) + 12, y, Math.round(x) + 13, y, D.espejoL); }
  // las girándolas doradas de las velas (los discos de luz los pinta el fotograma) y un paisaje con su marco
  for (const [gx, gy] of [[100, 40], [226, 42]]) { linea(gx, gy + 8, gx - 6, gy, C.oro); linea(gx, gy + 8, gx + 6, gy + 2, C.oro); rect(gx - 2, gy + 6, gx + 2, gy + 14, C.oroS); disco(gx, gy + 15, 2, C.oro); }
  rect(232, 50, 272, 80, C.oroS); rect(234, 52, 270, 78, C.oro); for (let y = 55; y < 76; y++) for (let x = 237; x < 268; x++) pset(x, y, y < 64 ? d_mez(hex('#a8c0d0'), hex('#e8d0a8'), (y - 55) / 9) : y < 68 ? hex('#5a7a4a') : hex('#7a8a4a'));
  disco(250, 64, 4, hex('#3a5a34')); rect(249, 66, 250, 70, hex('#4a3a2a'));
  // la chimenea de mármol a la derecha, con la boca encendida
  rect(248, 82, 319, 117, D.marmol); rect(248, 82, 319, 86, C.blanco); rect(248, 87, 319, 88, D.marmolS); for (let i = 0; i < 6; i++) linea(252 + i * 11, 89, 258 + i * 11, 116, D.marmolV);
  for (let y = 90; y < 118; y++) for (let x = 262; x < 316; x++) { const d = ((x - 289) / 26) ** 2 + ((y - 117) / 26) ** 2; if (d < 1) pset(x, y, d < 0.35 ? hex('#ffc070') : d < 0.7 ? hex('#e8803e') : hex('#7a3424')); }
  b_desenfoca(R, 0, 0, 319, 117, 2);
  // la luz baja de la tarde: más oscuro arriba y en los bordes, sin trama
  for (let y = 0; y < 118; y++) for (let x = 0; x < 320; x++) { const v = Math.hypot((x - 170) / 210, (y - 80) / 120); B[y * 320 + x] = d_mez(B[y * 320 + x], hex('#3a3040'), Math.min(0.55, 0.16 + v * 0.3)); }
  for (let y = 0; y < 118; y++) for (let x = 230; x < 320; x++) { const d = Math.hypot((x - 289) / 60, (y - 108) / 50); if (d < 1) B[y * 320 + x] = d_mez(B[y * 320 + x], hex('#ffb070'), 0.3 * (1 - d)); }
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
  rect(292, 88, 300, 128, K); rect(293, 89, 299, 127, D.plata); rect(293, 89, 294, 127, C.blanco); for (const yy of [98, 112]) { rect(291, yy, 301, yy + 2, K); rect(292, yy, 300, yy + 1, D.plata); } rect(286, 124, 306, 130, K); rect(287, 125, 305, 128, D.plata); rect(287, 125, 305, 125, C.blanco); rect(288, 84, 304, 88, K); rect(289, 85, 303, 87, D.plata); rect(290, 78, 302, 84, K); rect(291, 79, 301, 83, D.plataS); rect(291, 79, 292, 83, D.plata);
  d_pastelCuerpo(R, 160, 150, 1);
}
function d_pastelMesaVida(R, t, o) {
  d_pegar(R, d_capa(R, 'D|pastelMesa', () => d_pastelMesa(R), true), 0, 40, 319, 179);
  const v = d_pastelVelas(R, 160, 150, 1, t, o, 24), fl = 0.85 + Math.sin(t * 9) * 0.06 + Math.sin(t * 13.1) * 0.05;
  // el resplandor: más fuerte cuantas más velas siguen encendidas, y su reflejo en la plata
  if (v.enc > 0) { const m = Math.min(1, 0.35 + v.enc / 24); d_halo(R, 160, v.g.y2 - 4, 44 + Math.min(20, v.enc), 0.28 * fl * m); for (let x = 104; x < 216; x += 3) if (Math.sin(t * 5 + x) > 0.2) R.pset(x, 157, hex('#fff0c0')); }
  d_vela(R, 294, 78, 12, t, 55, true, 4, d_C.cera, 2); d_halo(R, 296, 60, 13, 0.25 * fl);
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
  // el sillón alto del juez, de cuero color tabaco (claro, para que la toga negra se lea delante), capitoné con sus
  // botones, el ribete de tachuelas doradas, las orejas redondeadas y la luz que le da desde la izquierda
  { const cu = hex('#8a5232'), cuL = hex('#a86a40'), cuS = hex('#6a3a22'), cuD = hex('#4a2614');
    rect(124, 72, 176, 124, K); rect(126, 68, 174, 72, K); rect(125, 72, 175, 124, cu); rect(127, 69, 173, 72, cuL); rect(125, 73, 128, 124, cuL); rect(171, 73, 175, 124, cuS); rect(174, 73, 175, 124, cuD);
    for (let y = 74; y < 124; y++) for (let x = 129; x < 171; x++) { const q = h(x, y, 268); if (q < 0.06) pset(x, y, cuS); else if (q > 0.96) pset(x, y, cuL); }
    for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const bx = 133 + i * 7 + (j % 2) * 3, by = 79 + j * 8; if (bx > 168) continue;
      linea(bx - 3, by - 3, bx, by, cuS); linea(bx + 3, by - 3, bx, by, cuS); pset(bx, by, cuD); pset(bx - 1, by - 1, cuL); pset(bx + 1, by + 1, cuD); pset(bx, by + 2, cuL); }
    for (let x = 126; x < 175; x += 3) { pset(x, 73, C.oro); pset(x, 72, C.oroS); } for (let y = 76; y < 124; y += 3) { pset(125, y, C.oroS); pset(175, y, C.oroS); }
    for (let y = 74; y < 124; y++) for (let x = 129; x < 150; x++) if ((x + y) % 2 === 0 && h(x >> 2, y >> 2, 269) < 0.25) pset(x, y, d_mez(R.pget(x, y), cuL, 0.5)); }
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
  // (al alcance de la mano del juez: centro en x 164, la cara de arriba en y 115–119, donde cae la cabeza del mazo)
  for (let y = 124; y < 128; y++) for (let x = 146; x < 186; x++) if (c_um(x, y) < 0.5 && ((x - 166) / 20) ** 2 + ((y - 125) / 3) ** 2 < 1) pset(x, y, d_mez(R.pget(x, y), K, 0.35));
  for (let y = 113; y < 127; y++) for (let x = 149; x < 180; x++) { const d = ((x - 164) / 15) ** 2 + ((y - 117) / 3.5) ** 2, d2 = ((x - 164) / 15) ** 2 + ((y - 123) / 3.5) ** 2; if (d < 1 || (y >= 117 && y <= 123 && Math.abs(x - 164) <= 15) || d2 < 1) pset(x, y, d < 0.9 && y < 119 ? (d < 0.45 ? hex('#9a6038') : hex('#7a4424')) : d < 1 && y < 119 ? K : d2 > 0.85 && y > 123 ? K : (x < 157 ? hex('#9a6038') : x > 174 ? hex('#3a1c0c') : hex('#6a3a1e'))); }
  linea(150, 120, 178, 120, hex('#b07040')); linea(150, 122, 178, 122, hex('#46220e')); pset(156, 116, hex('#c88a58')); pset(158, 116, hex('#c88a58')); linea(159, 117, 169, 117, hex('#5a3018'));
}
// el mazo, apoyado en el taco (o.mazo !== false)
function d_mazoApoyado(R) {
  const { rect, pset, linea, disco } = R, K = C.k;
  rect(154, 103, 174, 114, K); rect(155, 104, 173, 113, hex('#6a3a1e')); rect(155, 104, 173, 105, hex('#8e5430')); rect(155, 112, 173, 113, hex('#46220e')); rect(158, 104, 159, 113, C.oroS); rect(169, 104, 170, 113, C.oroS); pset(156, 105, hex('#b07040'));
  for (let i = 0; i < 24; i++) { const x = 172 + i, y = 109 + Math.round(i * 0.3); pset(x, y - 1, K); pset(x, y, hex('#8e5430')); pset(x, y + 1, hex('#46220e')); pset(x, y + 2, K); }
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
  for (let y = 70; y < 136; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 287) < 0.08 ? D.robleS : D.roble);
  for (let c = 0; c < 16; c++) { const x0 = 2 + c * 20; rect(x0, 74, x0 + 16, 132, D.robleS); rect(x0, 74, x0 + 15, 131, D.robleL); rect(x0 + 1, 75, x0 + 15, 131, D.roble); for (let i = 0; i < 4; i++) { const xx = x0 + 3 + i * 3; rect(xx, 78, xx, 128, D.robleL); rect(xx + 1, 78, xx + 1, 128, D.robleS); pset(xx, 77, D.robleS); pset(xx + 1, 129, D.robleL); } }
  rect(0, 68, 319, 72, K); rect(0, 69, 319, 70, D.robleL); for (let x = 0; x < 320; x += 4) pset(x, 71, C.oroS);
  // el ventanal y los paños de terciopelo carmesí a los lados, con sus borlas
  rect(114, 14, 206, 70, K);
  for (const [a, b] of [[96, 118], [202, 224]]) for (let y = 10; y < 136; y++) for (let x = a; x <= b; x++) { const f = Math.sin((x - a) * 0.9); pset(x, y, x === a || x === b ? K : f > 0.5 ? D.tercCL : f < -0.4 ? hex('#5a0e1a') : D.tercC); }
  for (const bx of [107, 213]) { rect(bx - 2, 60, bx + 2, 64, C.oro); rect(bx - 1, 65, bx + 1, 72, C.oroS); for (let x = bx - 2; x <= bx + 2; x++) pset(x, 73, C.oro); }
  // los escalones de mármol (dos peldaños bajos, con vetas) y el suelo de damero
  for (let y = 136; y < 153; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 136 || y === 144 ? C.blanco : y === 143 || y === 152 ? hex('#b8b4ac') : y === 142 || y === 151 ? hex('#cfcac0') : h(x, y, 282) < 0.05 ? hex('#c8c4bc') : Math.sin(x * 0.09 + y * 0.6 + Math.sin(x * 0.03) * 3) > 0.94 ? hex('#d4d0c6') : hex('#e8e4dc'));
  for (let y = 153; y < 180; y++) { const z = Math.floor((y - 153) / (6 + (y - 153) * 0.25)); for (let x = 0; x < 320; x++) { const X = Math.floor((x - 160) / (22 + (y - 153) * 0.6)); const c = (X + z) % 2 ? hex('#2a2a34') : hex('#e8e4dc'); pset(x, y, h(x, y, 283) < 0.05 ? d_mez(c, C.k, 0.2) : c); } }
  // el retablo bajo el ventanal: la grada dorada donde van los candeleros, la bandeja y los jarrones
  rect(106, 100, 214, 106, K); rect(107, 101, 213, 105, C.oroS); rect(107, 101, 213, 101, C.oroL); for (let x = 109; x < 212; x += 5) { pset(x, 103, C.oro); pset(x + 1, 104, hex('#8a6a20')); }
  for (let y = 107; y < 112; y++) for (let x = 108; x < 213; x++) if (c_um(x, y) < (112 - y) / 7) pset(x, y, d_mez(R.pget(x, y), C.k, 0.35));
  // el altar: el mantel de lino con su puntilla y el frontal de terciopelo con galones de oro y el sol bordado en el centro
  rect(110, 110, 210, 137, K); rect(111, 111, 209, 115, C.blanco); rect(111, 115, 209, 115, D.mantelS); for (let x = 112; x < 209; x += 3) { pset(x, 116, D.mantelS); pset(x + 1, 117, D.mantelS); }
  for (let y = 117; y < 137; y++) for (let x = 111; x < 210; x++) { const f = Math.sin((x - 111) * 0.5) * 0.5 + Math.sin(y * 0.7 + x * 0.05) * 0.3; pset(x, y, f > 0.55 ? D.tercCL : f < -0.45 ? hex('#5a0e1a') : D.tercC); }
  for (const [a, b] of [[111, 114], [206, 209]]) rect(a, 117, b, 136, C.oro); rect(111, 117, 209, 119, C.oro); rect(111, 134, 209, 136, C.oro); for (let x = 113; x < 208; x += 3) { pset(x, 118, C.oroS); pset(x, 135, C.oroS); } for (let y = 119; y < 134; y += 3) { pset(112, y, C.oroS); pset(207, y, C.oroS); }
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; linea(160 + Math.cos(a) * 4, 127 + Math.sin(a) * 4, 160 + Math.cos(a) * (k % 2 ? 7 : 9), 127 + Math.sin(a) * (k % 2 ? 6 : 7), k % 2 ? C.oroS : C.oro); }
  disco(160, 127, 4, C.oroL); disco(160, 127, 2.5, C.oro); pset(160, 126, C.blanco);
  for (const cx of [130, 190]) { for (let j = 0; j < 3; j++) { rect(cx - 5 + j, 121 + j * 4, cx + 5 - j, 122 + j * 4, C.oroS); pset(cx - 4 + j, 121 + j * 4, C.oro); } }
  // los lados del altar en sombra (su volumen) y la sombra que echa sobre el escalón
  rect(209, 111, 213, 137, hex('#4a0a14')); rect(213, 111, 213, 137, K); for (let y = 137; y < 141; y++) for (let x = 112; x < 216; x++) if (c_um(x, y) < 0.55) pset(x, y, d_mez(R.pget(x, y), C.k, 0.25));
}
function d_altarVida(R, t) {
  const { rect, pset, disco, linea } = R, D = d_C, K = C.k;
  d_vidriera(R, 116, 16, 204, 68, t, 3);
  // la gran bandeja de oro, de pie en la grada bajo el ventanal (ya no lo tapa), con sus reflejos que se mueven
  rect(156, 96, 164, 101, K); rect(157, 96, 163, 100, C.oroS); rect(158, 96, 158, 100, C.oroL);
  disco(160, 85, 13, K); disco(160, 85, 12, (x, y, d) => (d > 0.86 ? C.oroS : d > 0.72 ? C.oroL : d > 0.4 ? ((Math.floor(Math.atan2(y - 85, x - 160) * 4) & 1) ? C.oro : C.oroS) : C.oro)); disco(160, 85, 4, C.oroL); pset(159, 84, C.blanco);
  { const a = t * 0.6, gx = Math.round(160 + Math.cos(a) * 9), gy = Math.round(85 + Math.sin(a) * 9); pset(gx, gy, C.blanco); pset(gx + 1, gy, C.oroL); pset(gx - 1, gy, C.oroL); pset(gx, gy - 1, C.oroL); pset(gx, gy + 1, C.oroL); }
  // los dos candeleros altos de la grada, con sus cirios encendidos
  for (const cx of [116, 204]) { rect(cx - 5, 96, cx + 5, 101, K); rect(cx - 4, 97, cx + 4, 100, C.oro); rect(cx - 4, 97, cx + 4, 97, C.oroL); rect(cx - 2, 62, cx + 2, 96, K); rect(cx - 1, 63, cx + 1, 95, C.oro); rect(cx - 1, 63, cx - 1, 95, C.oroL);
    for (const yy of [70, 82]) { rect(cx - 3, yy, cx + 3, yy + 2, K); rect(cx - 2, yy, cx + 2, yy + 1, C.oroL); } rect(cx - 4, 60, cx + 4, 62, C.oroS);
    d_vela(R, cx - 1, 59, 11, t, cx, true, 3, D.cera, 2); d_halo(R, cx, 44, 13, 0.22); }
  // los jarrones de azahar y rosas blancas en la grada, que se mecen un poco
  for (const fx of [134, 186]) { rect(fx - 4, 89, fx + 4, 100, K); rect(fx - 3, 90, fx + 3, 99, C.oro); rect(fx - 3, 90, fx - 2, 99, C.oroL); rect(fx - 5, 88, fx + 5, 89, K); const m = Math.sin(t * 0.8 + fx) * 0.8;
    for (let k = 0; k < 16; k++) { const a = h(k, fx, 284) * Math.PI, r = 3 + h(k, fx, 285) * 8, x = fx + Math.cos(a) * r * 1.1 + m, y = 86 - Math.sin(a) * r; disco(x, y, k % 4 === 0 ? 1.4 : 2, K); disco(x, y, k % 4 === 0 ? 0.9 : 1.5, k % 4 === 0 ? D.hoja : k % 3 ? D.flor : D.florS); } }
  // el libro abierto en su atril sobre el mantel (las líneas, sin letras), con la cinta roja
  rect(147, 104, 173, 111, K); rect(148, 104, 159, 110, C.blanco); rect(161, 104, 172, 110, C.blanco); for (let y = 105; y < 110; y++) { linea(149, y, 158, y, D.mantelS); linea(162, y, 171, y, D.mantelS); } rect(160, 104, 160, 114, C.rojo); rect(152, 111, 168, 112, hex('#6a4426'));
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 286) * 90 + t * (2 + h(k, 4, 286) * 3)) % 90, x = Math.round(124 + h(k, 5, 286) * 72 + Math.sin(t * 0.6 + k) * 2), y = Math.round(40 + fy); if (Math.sin(t * 1.4 + k) > -0.2) pset(x, y, hex('#fff4d8')); }
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

const A_VACIO = 0x01020304;

const a_capas = new Map();

// a_capa: lo que no se mueve se pinta una vez en un búfer de R.nuevo() (lleno de huecos A_VACIO) y se guarda por clave
function a_capa(R, clave, dibuja) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(A_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); a_capas.set(clave, b); }
  return b;
}

// a_fondo: una capa que cubre toda la pantalla (cielo, calle de fuera): se copia de golpe
function a_fondo(R, clave, dibuja) { R.copiar(a_capa(R, clave, dibuja)); }

// a_pegar: copia el decorado fijo sobre el fotograma salvo sus huecos (una pasada de pantalla)
function a_pegar(R, clave, dibuja) { const b = a_capa(R, clave, dibuja), B = R.buf; for (let i = 0; i < B.length; i++) { const c = b[i]; if (c !== A_VACIO) B[i] = c; } }

// a_mez: mezcla dos colores (u = 0 el primero, 1 el segundo)
const a_mez = (a, b, u) => { const f = (s) => Math.round(((a >>> s) & 255) + (((b >>> s) & 255) - ((a >>> s) & 255)) * u); return (0xff000000 | (f(16) << 16) | (f(8) << 8) | f(0)) >>> 0; };

// a_tinte: tiñe un punto ya pintado (luz de una llama, sombra, resplandor de la tele)
const a_tinte = (R, x, y, c, u) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_mez(R.pget(x, y), c, u)); };

// a_luz: un resplandor redondo y tramado que tiñe lo de debajo (r radio, u fuerza en el centro)
function a_luz(R, cx, cy, r, c, u, aplast = 1) {
  for (let y = Math.floor(cy - r * aplast); y <= cy + r * aplast; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) / aplast) / r; if (g <= 0) continue; const v = g * g * u; if (v > 0.04 + R.b4(x, y) * 0.08) a_tinte(R, x, y, c, Math.min(0.85, v));
  }
}

// a_disco: disco relleno; c puede ser una función (x, y, d) que devuelve null para no pintar ese punto
function a_disco(R, cx, cy, r, c) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
    const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d2 = dx * dx + dy * dy; if (d2 > r * r) continue;
    const col = typeof c === 'function' ? c(x, y, Math.sqrt(d2) / r) : c; if (col != null) R.pset(x, y, col);
  }
}

// a_rect: rectángulo que respeta R.recorte (gente que se ve por una ventana o asoma tras un pretil)
function a_rect(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); }

// a_movido: el mismo R desplazado (dx, dy), para mover una pieza entera sin reescribir sus coordenadas
function a_movido(R, dx, dy) {
  return { ...R, pset: (x, y, c) => R.pset(x + dx, y + dy, c), pget: (x, y) => R.pget(x + dx, y + dy), rect: (a, b, c, d, col) => R.rect(a + dx, b + dy, c + dx, d + dy, col),
    linea: (a, b, c, d, col, q) => R.linea(a + dx, b + dy, c + dx, d + dy, col, q), anillo: (x, y, r, c) => R.anillo(x + dx, y + dy, r, c), poligono: (pts, c) => R.poligono(pts.map(([x, y]) => [x + dx, y + dy]), typeof c === 'function' ? (x, y) => c(x - dx, y - dy) : c) };
}

// zonas tranquilas: la barra del año y la esquina de Atom
const a_calma = (x, y) => (x >= 270 && y <= 50) || (x >= 14 && x <= 176 && y <= 17);

const a_r = (...l) => l.map((c) => hex(c));

const AK = hex('#1a1220'), AK2 = hex('#2a2030');

// a_cifra: cifras diminutas de 3 × 5 (libros de cuentas, calendarios, esferas); e escala; devuelve el ancho
const A_DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001010010', 8: '111101111101111', 9: '111101111001111', '.': '000000000000010', ',': '000000000010100', '-': '000000111000000' };

function a_cifra(R, x, y, s, c, e = 1) { let dx = 0; for (const ch of String(s)) { const m = A_DIG[ch]; if (m) for (let k = 0; k < 15; k++) if (m[k] === '1') R.rect(x + dx + (k % 3) * e, y + Math.floor(k / 3) * e, x + dx + (k % 3) * e + e - 1, y + Math.floor(k / 3) * e + e - 1, c); dx += 4 * e; } return dx; }

// a_degradado: degradado tramado vertical con grano (cielos, paredes con luz)
function a_degradado(R, x0, y0, x1, y1, rp, o = {}) {
  const L = rp.length - 1, k = o.k ?? 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const u = (y - y0) / Math.max(1, y1 - y0), v = u * L + (h(x >> 3, y >> 2, k) - 0.5) * (o.grano ?? 0.6) + Math.sin(x * 0.045 + y * 0.09 + k) * (o.onda ?? 0.25);
    R.pset(x, y, R.tone4(rp, v, x, y));
  }
}

// a_madera: madera con vetas onduladas, tablas con su junta, filo de luz y testas a tresbolillo; rp oscuro → claro
function a_madera(R, x0, y0, x1, y1, rp, o = {}) {
  const w = o.ancho ?? 8, vert = !!o.vert, k = o.k ?? 0, L = rp.length - 1, base = o.base ?? L * 0.55, largo = o.largo ?? 70;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = vert ? x - x0 : y - y0, b = vert ? y : x, p = Math.floor(a / w), f = a - p * w;
    const veta = Math.sin((b + h(p, k, 3) * 40) * 0.19 + Math.sin(b * 0.05 + p * 1.7) * 2.4 + f * 0.8);
    let v = base + veta * 0.6 + (h(p, k, 4) - 0.5) * 0.9 + (o.luz ? o.luz(x, y) : 0);
    if (f === 0) v = 0.1; else if (f === 1) v += 0.5; else if (f === w - 1) v -= 0.5;
    if (largo && (b + Math.floor(h(p, k, 5) * largo)) % largo === 0) v = 0.2;
    if (h(x, y, k + 9) < 0.004) v = 0;   // un nudo, un clavo
    R.pset(x, y, R.tone(rp, v, x, y));
  }
}

// a_ladrillos: aparejo de ladrillo o de azulejo vidriado: juntas, tono de cada pieza, filo de luz arriba y brillo (o.brillo)
function a_ladrillos(R, x0, y0, x1, y1, rp, junta, o = {}) {
  const bw = o.w ?? 8, bh = o.h ?? 4, k = o.k ?? 0, L = rp.length - 1;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / bh), fy = (y - y0) % bh;
    for (let x = x0; x <= x1; x++) { const xx = x - x0 + (fila % 2) * (bw >> 1), col = Math.floor(xx / bw), fx = xx % bw;
      if (fy === bh - 1 || fx === bw - 1) { R.pset(x, y, junta); continue; }
      const v = L * (o.base ?? 0.5) + (h(col, fila, k) - 0.5) * (o.var ?? 1.3) + (fy === 0 ? 0.6 : 0) + (o.brillo && fx === 1 && fy === 0 ? 1.5 : 0) + (o.luz ? o.luz(x, y) : 0);
      R.pset(x, y, R.tone(rp, v, x, y)); } }
}

// a_estuco: revoco con grano, manchas de humedad y desconchones (o.descon: proporción)
function a_estuco(R, x0, y0, x1, y1, rp, o = {}) {
  const k = o.k ?? 0, L = rp.length - 1, b = o.base ?? L * 0.6;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let v = b + (h(x >> 3, y >> 3, k) - 0.5) * 0.7 + (h(x, y, k + 1) - 0.5) * 0.5 + (o.luz ? o.luz(x, y) : 0);
    if (o.descon && h(x >> 2, y >> 2, k + 2) < o.descon) v -= 1.2;
    R.pset(x, y, R.tone(rp, v, x, y));
  }
}

// a_nube: una nube de bolas con tres tonos (luz arriba, cuerpo, sombra abajo) y base plana; col = [luz, cuerpo, sombra]
function a_nube(R, cx, cy, w, col, k = 0) {
  const n = Math.max(3, Math.round(w / 8));
  for (let i = 0; i < n; i++) {
    const u = n > 1 ? i / (n - 1) - 0.5 : 0, r = (w / 6) * (1 - Math.abs(u) * 0.8) + h(k, i) * 3 + 2, bx = cx + u * w * 0.9, by = cy - r * 0.45 + h(k, i, 2) * 2;
    a_disco(R, bx, by, r, (x, y) => { if (y > cy + 2) return null; const d = (y - by) / r + (R.b2(x, y) - 0.5) * 0.25; if (a_calma(x, y)) { a_tinte(R, x, y, col[1], 0.3); return null; } return d < -0.4 ? col[0] : d > 0.3 ? col[2] : col[1]; });
  }
}

// a_nubes: nubes a tres velocidades (lejos lentas y pequeñas, cerca rápidas): lista [[x0, y, ancho, velocidad, k]]
function a_nubes(R, t, lista, col) { for (const [x0, y, w, v, k] of lista) { const x = ((x0 + t * v) % (320 + 2 * w) + (320 + 2 * w)) % (320 + 2 * w) - w; a_nube(R, x, y, w, col, k); } }

// a_estrellas: estrellas que titilan, fuera de las zonas tranquilas
function a_estrellas(R, t, n, y0, y1, k = 0) {
  for (let i = 0; i < n; i++) { const x = Math.floor(h(i, k, 11) * 320), y = Math.floor(y0 + h(i, k, 12) * (y1 - y0)); if (a_calma(x, y)) continue;
    const b = Math.sin(t * (0.8 + h(i, k, 13) * 3) + i * 1.7);
    R.pset(x, y, b > 0.55 ? hex('#fff8e0') : b > -0.4 ? hex('#a8b0d8') : hex('#5a6090'));
    if (i % 7 === 0 && b > 0.75) { R.pset(x - 1, y, hex('#6a70a8')); R.pset(x + 1, y, hex('#6a70a8')); R.pset(x, y - 1, hex('#6a70a8')); R.pset(x, y + 1, hex('#6a70a8')); } }
}

// a_luna: la luna con sus mares, el borde en sombra y el halo
function a_luna(R, cx, cy, r) {
  R.halo(cx, cy, r * 3.2, a_r('#2a3062', '#363c72', '#464c82'), 0.9);
  a_disco(R, cx, cy, r, (x, y, d) => { const m = h(x >> 1, y >> 1, 77); return x - cx > r * 0.4 && d > 0.6 ? hex('#b8b4a0') : m < 0.22 ? hex('#d0ccb4') : hex('#f4f0dc'); });
}

// a_pajaros: pájaros en V que aletean y cruzan (n, banda de alturas, velocidad, color)
function a_pajaros(R, t, n, y0, v, c, k = 0) {
  for (let i = 0; i < n; i++) { const x = Math.round(((h(i, k, 21) * 400 + t * v * (0.8 + h(i, k, 22) * 0.4)) % 400) - 40), y = Math.round(y0 + h(i, k, 23) * 14 + Math.sin(t * 1.3 + i) * 2);
    if (a_calma(x, y)) continue; const a = Math.floor(t * 6 + i * 2) % 2;
    R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - a * 2 + 1 - 1, c); R.pset(x + 2, y - a * 2, c); }
}

// a_llama: una llama que tiembla (base en x, y; s de alto)
function a_llama(R, x, y, s, t, k = 0) {
  const fl = 0.85 + 0.15 * Math.sin(t * 13 + k * 3) + 0.1 * Math.sin(t * 29 + k);
  const al = Math.max(2, Math.round(s * fl));
  for (let j = 0; j < al; j++) { const u = j / al, w = (1 - u) * s * 0.32 + 0.3, dx = Math.sin(t * 8 + k + j * 0.6) * u * 1.1;
    for (let i = -Math.ceil(w); i <= Math.ceil(w); i++) { if (Math.abs(i) > w + 0.2) continue; const borde = Math.abs(i) > w - 0.8;
      R.pset(Math.round(x + i + dx), y - j, u > 0.72 || borde ? hex('#e8602a') : u > 0.38 ? hex('#ffb840') : hex('#fff4b0')); } }
}

// a_humo: humo que sube, se ensancha, se tuerce con el viento y se deshace (x, y de la boca; c color; n bocanadas)
function a_humo(R, t, x, y, c, o = {}) {
  const n = o.n ?? 6, alto = o.alto ?? 40, viento = o.viento ?? 0.25, k = o.k ?? 0;
  for (let i = 0; i < n; i++) { const u = ((t * (o.vel ?? 0.18) + i / n + h(i, k)) % 1), r = 1 + u * (o.r ?? 4), px = x + Math.sin(u * 5 + i + t * 0.6) * 2 + u * alto * viento, py = y - u * alto;
    a_disco(R, px, py, r, (xx, yy) => (R.b4(xx, yy) < 0.85 - u * 0.8 && !a_calma(xx, yy) ? c : null)); }
}

// a_persona: gente pequeña de fondo (de 7 a 13 px): piernas que andan, cuerpo, brazos, cabeza con pelo o sombrero
// c = [ropa, ropaSombra, piel, pelo]; o.anda, o.dir, o.gorro ('gorra', 'fiesta', 'tricornio', 'chistera', 'paja', 'tiara',
// 'velo'), o.brazo (levanta un brazo), o.carga (color de lo que lleva: farol, capazo…), o.al (alto)
function a_persona(R, x, y, t, c, o = {}) {
  const al = o.al ?? 10, s = al / 10, dir = o.dir ?? 1, fase = (o.k ?? x) * 0.7;
  const paso = o.anda ? Math.floor(t * 6 + fase) % 2 : 0, bob = o.anda ? paso : (Math.sin(t * 2 + fase) > 0.9 ? 1 : 0);
  const pierna = Math.max(2, Math.round(3 * s)), cuerpo = Math.max(3, Math.round(4 * s)), cab = Math.max(2, Math.round(3 * s)), an = Math.max(1, Math.round(1.2 * s));
  const yP = y - pierna, yC = yP - cuerpo + (bob ? 0 : 0), yH = yC - cab;
  // piernas
  a_rect(R, x - an, yP, x - an + Math.max(0, an - 1), y - 1 - (paso ? 1 : 0), c[1]); a_rect(R, x + 1, yP, x + an, y - 1 - (paso ? 0 : 1), c[1]);
  if (o.falda) a_rect(R, x - an - 1, yP, x + an + 1, y - 2, c[0]);
  // cuerpo con su sombra
  a_rect(R, x - an - 1, yC, x + an + 1, yP, c[0]); a_rect(R, x + an + 1 - (dir > 0 ? 2 * an + 2 : 0), yC + 1, x + an + 1 - (dir > 0 ? 2 * an + 2 : 0), yP, c[1]);
  // brazo
  if (o.brazo) { R.linea(x + dir * (an + 1), yC + 1, x + dir * (an + 2), yH - 1, c[0]); R.pset(x + dir * (an + 2), yH - 2, c[2]); if (o.uva) { R.pset(x + dir * (an + 2), yH - 3, hex('#7a3a9a')); R.pset(x + dir * (an + 3), yH - 3, hex('#5a2a7a')); } }
  else if (o.carga != null) { a_rect(R, x + dir * (an + 1), yC + 2, x + dir * (an + 2), yC + 3 + s, o.carga); }
  // cabeza
  a_rect(R, x - Math.floor(cab / 2), yH, x - Math.floor(cab / 2) + cab - 1, yC - 1, c[2]);
  a_rect(R, x - Math.floor(cab / 2), yH, x - Math.floor(cab / 2) + cab - 1, yH, c[3]); R.pset(x - dir * Math.floor(cab / 2), yH + 1, c[3]);
  const g = o.gorro;
  if (g === 'gorra') { a_rect(R, x - Math.floor(cab / 2) - 1, yH - 1, x + Math.floor(cab / 2), yH, hex('#3a3a44')); R.pset(x + dir * (Math.floor(cab / 2) + 1), yH, hex('#3a3a44')); }
  else if (g === 'fiesta') { const cc = [hex('#e84a6a'), hex('#f0c040'), hex('#4ab0e0'), hex('#8ad04a')][Math.floor(h(fase, 1) * 4)]; R.linea(x - 1, yH - 1, x, yH - 3 - s, cc); R.linea(x + 1, yH - 1, x, yH - 3 - s, cc); R.pset(x, yH - 4 - s, hex('#fff8e0')); }
  else if (g === 'tricornio') a_rect(R, x - Math.floor(cab / 2) - 1, yH - 1, x + Math.floor(cab / 2) + 1, yH, hex('#22202a'));
  else if (g === 'chistera') { a_rect(R, x - Math.floor(cab / 2), yH - 3, x + Math.floor(cab / 2), yH, hex('#1a1820')); a_rect(R, x - Math.floor(cab / 2) - 1, yH, x + Math.floor(cab / 2) + 1, yH, hex('#1a1820')); }
  else if (g === 'paja') { a_rect(R, x - Math.floor(cab / 2) - 2, yH, x + Math.floor(cab / 2) + 2, yH, hex('#e8c870')); a_rect(R, x - 1, yH - 1, x + 1, yH - 1, hex('#d4b058')); }
  else if (g === 'tiara') a_rect(R, x - 1, yH - 3, x + 1, yH - 1, hex('#e8c040'));
  else if (g === 'velo') { a_rect(R, x - Math.floor(cab / 2) - 1, yH - 1, x + Math.floor(cab / 2) + 1, yC + 1, c[3]); a_rect(R, x - Math.floor(cab / 2) + (dir > 0 ? 0 : 0), yH + 1, x + Math.floor(cab / 2) - 1, yC - 1, c[2]); }
}

const A_ROPA = [['#7a2a3a', '#521a28'], ['#2a4a7a', '#1a3050'], ['#3a5a3a', '#243a26'], ['#5a4a6a', '#3a2e48'], ['#8a6a3a', '#5a4424'], ['#2a2a34', '#18181e'], ['#9a3a2a', '#6a2418'], ['#4a6a8a', '#30485e']].map((p) => p.map((c) => hex(c)));

const A_PIEL = a_r('#f2c8a0', '#d8a47a', '#a8744e', '#7a5232'), A_PELO = a_r('#2a1a14', '#5a3a1e', '#8a6a3a', '#1a1418', '#c8c0b0');

// a_gentio: filas de gente de fondo, de la más lejana (pequeña y apagada) a la más cercana, que se mece; en cada campanada
// (brazos 0–1) levantan el brazo con una uva; filas = [[y, alto, separación, k, oscuridad 0–1]]; o.hueco [x0, x1] sin gente
function a_gentio(R, t, filas, brazos = 0, o = {}) {
  const noche = o.noche ?? hex('#141a3a');
  for (const [y, al, sep, k, osc] of filas) for (let i = 0, x = Math.round(h(k, 5) * sep) - 6; x < 330; i++, x += sep + Math.round(h(i, k, 6) * 3) - 1) {
    if (o.hueco && x > o.hueco[0] && x < o.hueco[1]) continue;
    const q = h(i, k, 7), r = A_ROPA[Math.floor(q * A_ROPA.length)], piel = A_PIEL[Math.floor(h(i, k, 8) * 4)], pelo = A_PELO[Math.floor(h(i, k, 9) * 5)];
    const c = [a_mez(r[0], noche, osc), a_mez(r[1], noche, osc), a_mez(piel, noche, osc * 0.8), a_mez(pelo, noche, osc * 0.8)];
    const sube = brazos > 0 && h(i, k, 10) < 0.7 ? 1 : 0, bob = Math.sin(t * (2.5 + q * 2.5) + i * 1.3) > 0.3 ? 1 : 0;
    a_persona(R, x, y + 3 - bob, t, c, { al, brazo: sube || (h(i, k, 12) < 0.12 && Math.sin(t * 1.5 + i) > 0), uva: sube, gorro: h(i, k, 11) < (o.fiesta ?? 0.45) ? 'fiesta' : h(i, k, 11) < 0.6 ? 'gorra' : null, dir: q > 0.5 ? 1 : -1, k: i + k * 13 });
  }
}

// a_confeti: papelitos de colores que caen girando (fuera de las zonas tranquilas); n cuántos
function a_confeti(R, t, n, o = {}) {
  const cols = a_r('#f04a6a', '#f8d040', '#4ac0f0', '#8ae05a', '#f0f0f0', '#c070f0');
  for (let i = 0; i < n; i++) { const vx = (h(i, 31) - 0.5) * 8, vy = 9 + h(i, 32) * 10, y = ((h(i, 33) * 200 + t * vy) % 200) - 10 + (o.y0 ?? 0), x = Math.round((h(i, 34) * 340 + t * vx + Math.sin(t * 2 + i) * 4) % 340 + 340) % 340 - 10;
    if (y > (o.y1 ?? 180) || a_calma(x, y)) continue; const c = cols[i % cols.length], g = Math.floor(t * 5 + i) % 3;
    R.pset(x, y, c); if (g === 0) R.pset(x + 1, y, c); else if (g === 1) R.pset(x, y + 1, c); }
}

// a_fuegos: fuegos artificiales que estallan en el cielo, cada uno con su color y su estela (u 0–1: intensidad)
function a_fuegos(R, t, u, zona) {
  if (!(u > 0)) return; const cols = [a_r('#fff4c0', '#f8c040', '#e86020'), a_r('#f0f8ff', '#80d0ff', '#3a70e0'), a_r('#fff0f8', '#f080c0', '#a03a90'), a_r('#f0fff0', '#90f070', '#3a9a3a')];
  const [x0, y0, x1, y1] = zona;
  for (let i = 0; i < 5; i++) { const per = 2.2 + h(i, 41) * 1.4, f = ((t + h(i, 42) * per) % per) / per; if (h(i, Math.floor((t + h(i, 42) * per) / per), 43) > u) continue;
    const ciclo = Math.floor((t + h(i, 42) * per) / per), cx = x0 + h(i, ciclo, 44) * (x1 - x0), cy = y0 + h(i, ciclo, 45) * (y1 - y0), c = cols[(i + ciclo) % 4];
    if (f < 0.25) { const yy = 180 - (180 - cy) * (f / 0.25); R.pset(cx, yy, c[0]); R.pset(cx, yy + 1, c[1]); R.pset(cx, yy + 3, c[2]); continue; }
    const g = (f - 0.25) / 0.75, r = 4 + g * 18;
    for (let a = 0; a < 16; a++) { const an = a / 16 * Math.PI * 2, px = Math.round(cx + Math.cos(an) * r), py = Math.round(cy + Math.sin(an) * r + g * g * 6);
      if (a_calma(px, py)) continue; R.pset(px, py, g < 0.4 ? c[0] : g < 0.75 ? c[1] : c[2]); if (g < 0.6) R.pset(Math.round(cx + Math.cos(an) * r * 0.7), Math.round(cy + Math.sin(an) * r * 0.7 + g * g * 4), c[2]); }
  }
}

// a_farola: farola fernandina de hierro (pie con basa, fuste estriado, brazos y faroles); x centro, y suelo, al alto
function a_farola(R, x, y, al, ramas = 1) {
  const k = hex('#141820'), m = hex('#2a3240'), l = hex('#4a5668');
  R.rect(x - 3, y - 6, x + 3, y, k); R.rect(x - 2, y - 6, x + 2, y - 1, m); R.pset(x - 2, y - 5, l);
  R.rect(x - 1, y - al, x + 1, y - 6, k); R.linea(x, y - al, x, y - 7, m); R.rect(x - 2, y - al * 0.55, x + 2, y - al * 0.55 + 1, k);
  const top = y - al;
  const farol = (fx, fy) => { R.rect(fx - 2, fy - 6, fx + 2, fy, k); R.rect(fx - 1, fy - 5, fx + 1, fy - 1, hex('#f8d880')); R.pset(fx - 1, fy - 5, hex('#fff8d0')); R.rect(fx - 3, fy - 7, fx + 3, fy - 7, k); R.pset(fx, fy - 8, k); };
  if (ramas === 3) { R.linea(x - 6, top + 2, x + 6, top + 2, k); farol(x - 6, top + 1); farol(x + 6, top + 1); farol(x, top - 2); }
  else farol(x, top);
  return top;
}

// a_destello: brillo en cruz que aparece y se apaga (bombillas, cristales)
function a_destello(R, x, y, c, s = 2) { R.pset(x, y, c); for (let i = 1; i <= s; i++) { R.pset(x - i, y, c); R.pset(x + i, y, c); R.pset(x, y - i, c); R.pset(x, y + i, c); } }

// a_gato: un gato pequeño tumbado o sentado que mueve la cola (y es el suelo)
function a_gato(R, x, y, t, c = hex('#3a3236'), cL = hex('#5a5058'), dir = 1, sentado = false) {
  const X = (i) => x + i * dir;
  if (sentado) { R.rect(X(0), y - 5, X(3), y - 1, c); R.rect(X(1), y - 8, X(4), y - 5, c); R.pset(X(1), y - 9, c); R.pset(X(4), y - 9, c); R.pset(X(3), y - 7, hex('#c8e040')); R.pset(X(1), y - 5, cL); }
  else { R.rect(Math.min(X(0), X(8)), y - 3, Math.max(X(0), X(8)), y - 1, c); R.rect(Math.min(X(0), X(8)) + 1, y - 4, Math.max(X(0), X(8)) - 1, y - 4, cL); R.rect(Math.min(X(7), X(10)), y - 5, Math.max(X(7), X(10)), y - 2, c); R.pset(X(7), y - 6, c); R.pset(X(10), y - 6, c); R.pset(X(9), y - 3, hex('#2a2224')); }
  const a = Math.sin(t * 2.2) * 2; R.linea(X(0), y - 2, X(-3), Math.round(y - 3 - a), c); R.pset(X(-4), Math.round(y - 4 - a), c);
}

// a_racimo: un racimo de uvas (cx, arriba; s tamaño 1–3; c = [sombra, cuerpo, brillo])
function a_racimo(R, cx, y, s, c) {
  const filas = s === 1 ? [3, 2, 1] : s === 2 ? [4, 3, 3, 2, 1] : [5, 4, 4, 3, 2, 1];
  const d = s === 1 ? 1 : 2;
  R.pset(cx, y - 1, hex('#5a7a2a')); R.pset(cx + 1, y - 2, hex('#5a7a2a'));
  filas.forEach((n, j) => { for (let i = 0; i < n; i++) { const gx = cx + (i - (n - 1) / 2) * d, gy = y + j * d; if (d === 1) R.pset(gx, gy, (i + j) % 2 ? c[1] : c[0]); else { R.rect(gx - 1, gy, gx, gy + 1, c[0]); R.pset(gx - 1, gy, c[1]); R.pset(gx - 1, gy, i === 0 && j < 2 ? c[2] : c[1]); } } });
}

const A_UVA = a_r('#3e1450', '#6a2a7a', '#b07ac8'), A_UVAV = a_r('#5a7a2a', '#9ac04a', '#e0f0a0');

const A_NOCHE = a_r('#080b24', '#0c1030', '#11163a', '#161c46', '#1d2252', '#26285c', '#302e64', '#3e3468', '#4e3a68', '#623e62');

// a_cieloNoche: el cielo de noche tramado (más claro abajo por las luces), estrellas, luna y nubes a tres velocidades
function a_cieloNoche(R, t, hor, o = {}) {
  a_fondo(R, 'nocheA' + hor, () => { a_degradado(R, 0, 0, 319, Math.min(179, hor), A_NOCHE, { k: 3 }); if (hor < 179) R.rect(0, hor + 1, 319, 179, A_NOCHE[A_NOCHE.length - 1]); });
  a_estrellas(R, t, o.estrellas ?? 70, 2, hor * 0.85, 1);
  if (o.luna) a_luna(R, ...o.luna);
  const nc = a_r('#4a4a7a', '#2e3260', '#20244a');
  a_nubes(R, t, o.nubes ?? [[20, 52, 44, 1.2, 1], [180, 30, 30, 0.6, 2], [90, 66, 60, 2.2, 3], [250, 60, 40, 1.6, 4]], nc);
}

function a_sol(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const bola = Math.max(0, Math.min(1, o.bola ?? 0)), camp = o.campanada ?? 0, ci = Math.floor(camp);
  const dest = ci >= 1 ? Math.max(0, 1 - (camp - ci) * 2.5) : 0;
  const LAD = a_r('#5a2220', '#7a3028', '#9a3e32', '#b24c3a', '#c45a44'), PIE = a_r('#7a6a58', '#a8967a', '#c8b898', '#e0d4b8', '#f0e8d2');
  const ORO = a_r('#7a5418', '#b8862a', '#e8b840', '#fff0a0');
  if (cam === 'reloj') return a_solReloj(R, t, o, bola, camp, dest, LAD, PIE, ORO);
  a_cieloNoche(R, t, 100, { luna: [94, 32, 5] });
  a_fuegos(R, t, o.fuegos ?? 0, [20, 22, 180, 60]);
  a_pegar(R, 'sol', () => {
    // ── las dos casas de la izquierda, con balcones de hierro y tejado de pizarra
    const casa = (x0, x1, top, rp, k) => {
      a_estuco(R, x0, top, x1, 128, rp, { k, luz: (x) => (x - x0 < 3 ? 0.8 : x1 - x < 4 ? -0.8 : 0) });
      rect(x0, top - 3, x1 + 1, top, PIE[3]); rect(x0, top, x1 + 1, top + 1, PIE[1]); for (let x = x0 + 1; x < x1; x += 3) pset(x, top + 2, PIE[0]);
      poligono([[x0 - 1, top - 3], [x0 + 6, top - 14], [x1 - 6, top - 14], [x1 + 2, top - 3]], (x, y) => R.tone(a_r('#1e2236', '#2c3248', '#3e465e'), 1.2 + ((y + (x >> 2)) % 3 === 0 ? -0.8 : 0) + (x - x0) / (x1 - x0) * 0.6, x, y));
      for (let x = x0 + 8; x < x1 - 6; x += 14) { rect(x, top - 12, x + 5, top - 4, AK); rect(x + 1, top - 10, x + 4, top - 5, h(x, k) < 0.5 ? hex('#f0b860') : hex('#2a3048')); poligono([[x - 1, top - 12], [x + 2.5, top - 16], [x + 6, top - 12]], hex('#3e465e')); }
      rect(x0 + 4, top - 22, x0 + 8, top - 12, hex('#5a3a32')); rect(x0 + 3, top - 23, x0 + 9, top - 22, hex('#3a2a28'));
      for (let fy = top + 6, fl = 0; fy < 100; fy += 18, fl++) for (let x = x0 + 5; x < x1 - 8; x += 13) {
        const lit = h(x, fy, k) < 0.55;
        rect(x - 1, fy - 1, x + 8, fy + 12, PIE[2]); rect(x, fy, x + 7, fy + 11, AK);
        rect(x + 1, fy + 1, x + 6, fy + 10, lit ? hex('#e8a850') : hex('#1e2440')); if (lit) { rect(x + 1, fy + 1, x + 6, fy + 2, hex('#f8d888')); linea(x + 3, fy + 1, x + 3, fy + 10, hex('#a86a30')); } else { pset(x + 2, fy + 2, hex('#4a5478')); linea(x + 3, fy + 1, x + 3, fy + 10, hex('#141830')); }
        rect(x - 2, fy - 3, x + 9, fy - 2, PIE[3]); rect(x - 1, fy - 2, x + 8, fy - 2, PIE[1]);
        rect(x - 3, fy + 12, x + 10, fy + 13, PIE[2]); rect(x - 3, fy + 14, x + 10, fy + 14, PIE[0]);
        for (let i = x - 3; i <= x + 10; i += 2) linea(i, fy + 7, i, fy + 11, AK); rect(x - 3, fy + 6, x + 10, fy + 6, AK); pset(x - 3, fy + 6, hex('#4a5060'));
      }
      // la planta baja: el café con su toldo a rayas y las puertas encendidas
      rect(x0, 104, x1, 128, hex('#3a2a28'));
      for (let x = x0 + 3; x < x1 - 6; x += 12) { rect(x, 110, x + 8, 127, AK); rect(x + 1, 111, x + 7, 127, hex('#f0b860')); rect(x + 1, 111, x + 7, 113, hex('#fff0b0')); linea(x + 4, 111, x + 4, 127, hex('#b07030')); rect(x + 1, 120, x + 7, 120, hex('#b07030')); }
      for (let x = x0; x <= x1; x++) { const r = Math.floor((x - x0) / 4) % 2; rect(x, 103, x, 107, r ? hex('#c83a3a') : hex('#f0e8e0')); if (x % 4 < 2) pset(x, 108, r ? hex('#8a2424') : hex('#c8c0b8')); }
      rect(x0, 102, x1, 102, AK);
    };
    casa(0, 52, 44, a_r('#7a5434', '#a8784a', '#c8925a', '#dcac74', '#ecc896'), 1);
    casa(54, 118, 52, a_r('#7a4a3e', '#a46a56', '#c88a72', '#dca48a', '#ecbea4'), 2);
    // ── la Casa de Correos: ladrillo, piedra en las esquinas y en los vanos, balaustrada arriba
    const X0 = 120, X1 = 304;
    poligono([[X0, 52], [X0 + 6, 44], [X1 - 6, 44], [X1, 52]], (x, y) => R.tone(a_r('#1a1e30', '#262c40', '#343c54'), 1 + ((x >> 1) + y) % 4 * 0.2, x, y));
    a_ladrillos(R, X0, 58, X1, 128, LAD, hex('#4a1c1a'), { w: 6, h: 3, k: 4, var: 0.9 });
    for (const px of [X0, X0 + 62, X0 + 120, X1 - 8]) { a_ladrillos(R, px, 58, px + 8, 128, PIE, PIE[1], { w: 9, h: 5, k: 5, var: 0.6 }); rect(px + 8, 58, px + 8, 128, PIE[0]); }
    rect(X0 - 2, 52, X1 + 2, 58, PIE[3]); rect(X0 - 2, 57, X1 + 2, 58, PIE[1]); rect(X0 - 2, 52, X1 + 2, 52, PIE[4]);
    for (let x = X0; x <= X1; x += 4) { rect(x + 1, 46, x + 2, 51, PIE[2]); pset(x + 1, 46, PIE[4]); } rect(X0 - 1, 45, X1 + 1, 45, PIE[3]);
    rect(X0 - 2, 86, X1 + 2, 88, PIE[3]); rect(X0 - 2, 88, X1 + 2, 88, PIE[1]); rect(X0, 102, X1, 104, PIE[2]); rect(X0, 104, X1, 104, PIE[0]);
    const vano = (x, y, w, hh, lit, fronton) => {
      rect(x - 2, y - 2, x + w + 1, y + hh + 1, PIE[2]); rect(x - 2, y + hh + 1, x + w + 1, y + hh + 1, PIE[0]); rect(x - 1, y - 1, x + w, y + hh, AK);
      rect(x, y, x + w - 1, y + hh - 1, lit ? hex('#e8a24a') : hex('#1c2240'));
      if (lit) { rect(x, y, x + w - 1, y + 1, hex('#f8d888')); for (let yy = y + 3; yy < y + hh; yy += 4) rect(x, yy, x + w - 1, yy, hex('#b87430')); } else { pset(x + 1, y + 1, hex('#4a5478')); pset(x + 2, y + 1, hex('#3a4268')); }
      linea(x + (w >> 1), y, x + (w >> 1), y + hh - 1, lit ? hex('#a8682a') : hex('#121630'));
      if (fronton) { poligono([[x - 3, y - 2], [x + w / 2, y - 6], [x + w + 2, y - 2]], PIE[3]); linea(x - 3, y - 2, x + w + 2, y - 2, PIE[1]); }
      else { rect(x - 3, y - 4, x + w + 2, y - 3, PIE[3]); rect(x - 3, y - 3, x + w + 2, y - 3, PIE[1]); }
    };
    for (let x = X0 + 12; x < X1 - 8; x += 15) { if (x > 182 && x < 236) continue; vano(x, 64, 7, 14, h(x, 7) < 0.4, false); vano(x, 92, 7, 9, h(x, 8) < 0.7, true);
      rect(x - 3, 101, x + 9, 101, AK); for (let i = x - 3; i <= x + 9; i += 2) linea(i, 98, i, 100, AK); rect(x - 3, 97, x + 9, 97, AK);
      rect(x - 1, 108, x + 8, 127, AK); rect(x, 110, x + 7, 127, hex('#e89a40')); disco(x + 3.5, 110, 4, hex('#e89a40')); rect(x + 1, 112, x + 6, 112, hex('#fff0b0')); }
    // el cuerpo central, que sobresale, con el balcón grande y las tres puertas
    a_ladrillos(R, 184, 50, 236, 128, LAD, hex('#4a1c1a'), { w: 6, h: 3, k: 6, base: 0.62, var: 0.8 });
    for (const px of [184, 206, 228]) { rect(px, 50, px + 7, 128, PIE[2]); for (let y = 50; y < 128; y += 5) rect(px, y, px + 7, y, PIE[1]); rect(px, 50, px, 128, PIE[4]); }
    rect(182, 44, 238, 50, PIE[3]); rect(182, 49, 238, 50, PIE[1]); rect(182, 44, 238, 44, PIE[4]);
    vano(194, 60, 9, 18, true, false); vano(216, 60, 9, 18, true, false); vano(194, 88, 9, 12, true, true); vano(216, 88, 9, 12, true, true);
    rect(186, 102, 234, 103, PIE[3]); for (let i = 187; i < 234; i += 2) linea(i, 99, i, 101, AK); rect(186, 98, 234, 98, AK);
    for (const dx of [193, 215]) { rect(dx, 108, dx + 11, 127, AK); rect(dx + 1, 112, dx + 10, 127, hex('#f0a848')); disco(dx + 5.5, 112, 5, hex('#f0a848')); rect(dx + 2, 115, dx + 9, 116, hex('#fff4c0')); }
    // la torre: el cuerpo del reloj, la cornisa y el templete de hierro con la campana; el mástil de la bola
    rect(195, 26, 225, 44, AK); a_ladrillos(R, 196, 27, 224, 44, PIE, PIE[1], { w: 7, h: 4, k: 9, var: 0.5 }); rect(222, 27, 224, 44, PIE[1]);
    rect(193, 23, 227, 26, PIE[3]); rect(193, 26, 227, 26, PIE[0]); rect(193, 23, 227, 23, PIE[4]);
    for (const x of [198, 205, 215, 222]) linea(x, 10, x, 22, hex('#20242e')); linea(198, 10, 222, 10, hex('#20242e')); linea(200, 8, 220, 8, hex('#20242e'));
    poligono([[199, 9], [210, 3], [221, 9]], hex('#2a303a')); linea(201, 8, 210, 4, hex('#4a5262'));
    disco(210, 17, 3.5, ORO[1]); disco(209, 16, 2, ORO[2]); rect(209, 20, 211, 21, ORO[0]);
    for (let x = 196; x <= 224; x += 2) pset(x, 22, hex('#30343e'));
    linea(210, 0, 210, 3, hex('#3a3e48'));
    // la esfera del reloj
    disco(210, 35, 7.5, AK); disco(210, 35, 6.5, hex('#f4ecd0')); for (let a = 0; a < 12; a++) { const an = a / 12 * Math.PI * 2; pset(Math.round(210 + Math.cos(an) * 5.4), Math.round(35 + Math.sin(an) * 5.4), AK); }
    // ── la estatua ecuestre (en sombra) y el oso del madroño, en bronce
    rect(86, 112, 104, 128, PIE[1]); rect(86, 112, 104, 113, PIE[3]); rect(88, 114, 102, 127, PIE[2]); rect(84, 126, 106, 128, PIE[0]);
    const bz = hex('#2a2a26'), bzL = hex('#4a4a3a');
    rect(88, 100, 101, 106, bz); rect(99, 95, 103, 101, bz); rect(101, 93, 105, 96, bz); rect(89, 106, 90, 111, bz); rect(99, 106, 100, 111, bz); rect(92, 106, 93, 110, bz); linea(88, 101, 85, 106, bz);
    rect(93, 91, 96, 100, bz); rect(93, 87, 96, 90, bz); rect(92, 86, 97, 86, bz); pset(94, 91, bzL); linea(88, 100, 101, 100, bzL); linea(100, 95, 103, 93, bzL);
    rect(262, 118, 280, 128, PIE[1]); rect(262, 118, 280, 119, PIE[3]); rect(264, 120, 278, 127, PIE[2]);
    linea(277, 96, 277, 118, hex('#2a2018')); disco(277, 98, 6, hex('#1e3a22')); disco(276, 96, 4, hex('#2a4e2e')); for (const [bx, by] of [[273, 99], [279, 95], [281, 100], [275, 94]]) pset(bx, by, hex('#c83a2a'));
    rect(268, 104, 273, 117, bz); rect(268, 99, 272, 104, bz); pset(268, 98, bz); pset(272, 98, bz); linea(273, 106, 276, 101, bz); pset(270, 101, bzL); linea(268, 105, 268, 116, bzL);
    // ── la casa de la derecha (cortada)
    a_estuco(R, 306, 50, 319, 128, a_r('#6a4a3e', '#946a56', '#b8866a', '#cca084'), { k: 8 });
    for (let fy = 58; fy < 100; fy += 18) { rect(310, fy, 316, fy + 11, AK); rect(311, fy + 1, 315, fy + 10, h(fy, 9) < 0.5 ? hex('#e8a850') : hex('#1e2440')); }
    rect(306, 104, 319, 128, hex('#3a2a28'));
    // ── la plaza: losas de granito en perspectiva, mojadas, con las luces reflejadas
    const GR = a_r('#1e1e2c', '#2a2a3a', '#36364a', '#46465a', '#585a6e');
    for (let y = 128; y < 180; y++) { const u = (y - 128) / 52, fh = Math.floor(Math.pow(u, 0.7) * 9), fw = 8 + u * 18;
      for (let x = 0; x < 320; x++) { const xx = (x - 160) / (0.6 + u) + 160 + (fh % 2) * fw / 2, col = Math.floor(xx / fw), fx = xx - col * fw;
        const junta = fx < 1 || Math.abs(Math.pow(u, 0.7) * 9 - fh - 0.98) < 0.05 + 0.02 * u;
        let v = 2 + (h(col, fh, 61) - 0.5) * 1.2 + (h(x, y, 62) - 0.5) * 0.6 - u * 0.4;
        const ref = Math.abs(x - 210) < 18 - u * 6 && h(x >> 1, y, 63) < 0.4 ? 1.4 : 0; v += ref;
        pset(x, y, junta ? GR[0] : R.tone(GR, v, x, y)); } }
    for (const [x, w] of [[30, 20], [150, 30], [250, 16]]) for (let y = 156; y < 164; y++) for (let i = 0; i < w; i++) if (Math.abs(i - w / 2) / (w / 2) + Math.abs(y - 160) / 4 < 1) pset(x + i, y, (i + y) % 3 ? hex('#2a3050') : hex('#3a4268'));
    // ── las farolas fernandinas
    a_farola(R, 20, 150, 52, 3); a_farola(R, 300, 150, 48, 3); a_farola(R, 140, 132, 30, 1);
  });
  // ── la vida: luces de los balcones y bombillas que parpadean, gente que se asoma
  for (let i = 0; i < 46; i++) { const x = 122 + i * 4, on = Math.sin(t * 3 + i * 0.9) > -0.2; if (on) pset(x, 51, i % 3 ? hex('#fff0a0') : hex('#f8c040')); }
  for (let i = 0; i < 14; i++) { const x = 184 + i * 4, on = Math.sin(t * 4 - i) > 0; pset(x, 43, on ? hex('#fff0a0') : hex('#8a6a30')); }
  for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2, on = (Math.floor(t * 4) + i) % 3 !== 0; pset(Math.round(210 + Math.cos(an) * 8.6), Math.round(35 + Math.sin(an) * 8.6), on ? hex('#fff4b0') : hex('#c89a40')); }
  for (const [x, y, k] of [[12, 64, 1], [36, 82, 2], [72, 92, 3], [98, 74, 4], [312, 62, 5]]) if (Math.sin(t * 0.7 + k * 2) > -0.3) { const dx = Math.round(Math.sin(t * 0.9 + k) * 1.5); rect(x + dx, y + 2, x + dx + 2, y + 6, hex('#3a2228')); rect(x + dx, y, x + dx + 2, y + 1, hex('#2a1a1c')); if (Math.sin(t * 2 + k) > 0.5) pset(x + dx + 3, y + 2, hex('#7a3a9a')); }
  // las agujas del reloj (casi las doce) y la bola en su mástil
  { const mi = o.minuto ?? (59.5 + Math.min(0.5, t * 0.01)), am = (mi / 60) * Math.PI * 2 - Math.PI / 2, ah = ((11 + mi / 60) / 12) * Math.PI * 2 - Math.PI / 2;
    linea(210, 35, 210 + Math.cos(am) * 5, 35 + Math.sin(am) * 5, AK); linea(210, 35, 210 + Math.cos(ah) * 3.5, 35 + Math.sin(ah) * 3.5, AK); pset(210, 35, ORO[1]); }
  { const yb = Math.round(1 + bola * 6), q = 1 + Math.sin(t * 7) * 0.5; rect(210, 0, 210, 9, hex('#4a4e58'));
    disco(210, yb, 3, (x, y) => ((x + y + Math.floor(t * 6)) % 3 === 0 ? hex('#fff8d0') : y < yb ? ORO[3] : ORO[2])); R.halo(210, yb, 7 + q, a_r('#5a4a3a', '#8a6a3a'), 0.6 + bola * 0.4); }
  // la campanada: el reloj y la torre destellan
  if (dest > 0) { R.halo(210, 35, 14 + dest * 10, a_r('#6a5a4a', '#c8a050', '#fff0a0'), 0.6 + dest); disco(210, 35, 6.5 * dest, hex('#fff8e0')); }
  // las farolas: llama y halo que tiemblan
  for (const [x, y] of [[14, 99], [26, 99], [20, 96], [294, 103], [306, 103], [300, 100], [140, 101]]) { const f = 0.85 + Math.sin(t * 9 + x) * 0.08; R.halo(x, y - 3, 10 * f, a_r('#4a3a3a', '#8a6a40', '#d8a850'), 0.8); pset(x, y - 3, hex('#fff8d0')); }
  // la luz cálida de las farolas y de los portales en las losas mojadas, donde están los protagonistas (destaca a los chibis)
  { const fl = 0.42 + Math.sin(t * 5.3) * 0.03; a_luz(R, 96, 166, 80, hex('#ffc070'), fl, 0.16); a_luz(R, 220, 166, 80, hex('#ffc070'), fl, 0.16); }
  // la multitud de detrás (de la torre a los pies de los protagonistas), más en sombra cuanto más lejos, para que los
  // protagonistas se lean delante de ella
  a_gentio(R, t, [[118, 7, 7, 1, 0.74], [125, 8, 8, 2, 0.64], [132, 9, 10, 3, 0.55], [140, 10, 13, 4, 0.48]], dest > 0.2 ? 1 : 0, { fiesta: 0.35 });
  if (o.confeti !== false) a_confeti(R, t, 90);
  return { suelo: 162, reloj: [210, 35, 7], bola: [210, Math.round(1 + bola * 6)], torre: [193, 0, 227, 44], horizonte: 128, multitud: [116, 150],
    libre: [36, 152, 284, 170], farolas: [20, 140, 300], estatua: [94, 128], oso: [271, 128] };
}
// 'sol' cámara 'reloj': la torre de cerca desde la azotea
function a_solReloj(R, t, o, bola, camp, dest, LAD, PIE, ORO) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  a_cieloNoche(R, t, 150, { luna: [62, 40, 7], nubes: [[10, 60, 60, 1.4, 5], [160, 28, 40, 0.7, 6], [240, 80, 70, 2.4, 7], [80, 96, 50, 1.9, 8]] });
  a_fuegos(R, t, o.fuegos ?? 0, [20, 30, 150, 90]);
  a_pegar(R, 'solReloj', () => {
    // los tejados de Madrid a lo lejos: cúpulas, chimeneas y ventanas encendidas
    const TJ = a_r('#141428', '#1c1c34', '#262640', '#30304c');
    for (let x = 0; x < 320; x++) { const top = Math.round(108 + Math.sin(x * 0.11) * 3 + (h(x >> 4, 1, 71) - 0.5) * 14); for (let y = top; y < 140; y++) pset(x, y, R.tone(TJ, 1.4 + (y - top) * 0.04 + ((x >> 4) % 2) * 0.4, x, y)); if (h(x >> 4, 2, 72) < 0.3 && x % 16 === 5) rect(x, top - 6, x + 2, top, TJ[2]); }
    for (const [cx, cy, r] of [[34, 104, 9], [276, 100, 7]]) { disco(cx, cy, r, (x, y) => R.tone(TJ, 3 - (x - cx + r) / (2 * r) * 2.4, x, y)); rect(cx - 1, cy - r - 6, cx + 1, cy - r, TJ[2]); pset(cx, cy - r - 7, hex('#c8a040')); }
    for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 73) * 320), y = 112 + Math.floor(h(i, 74) * 26); if (R.pget(x, y) !== A_VACIO) { rect(x, y, x + 1, y + 1, h(i, 75) < 0.7 ? hex('#e8a850') : hex('#a8c0e8')); } }
    // la azotea: el suelo de plomo y la balaustrada
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 140) / (3 + (y - 140) * 0.12)), v = 1.5 + (h(x >> 3, fy, 76) - 0.5) + ((x + fy * 7) % 24 === 0 ? -1 : 0) + (y - 140) * 0.02; pset(x, y, R.tone(a_r('#1a1a26', '#26263a', '#33334a', '#40405a'), v, x, y)); }
    rect(0, 120, 319, 124, PIE[3]); rect(0, 124, 319, 125, PIE[1]); rect(0, 120, 319, 120, PIE[4]);
    for (let x = 2; x < 320; x += 6) { rect(x, 126, x + 3, 137, PIE[2]); rect(x + 1, 128, x + 2, 135, PIE[3]); rect(x, 131, x + 3, 132, PIE[1]); rect(x + 3, 126, x + 3, 137, PIE[0]); }
    rect(0, 137, 319, 140, PIE[2]); rect(0, 140, 319, 140, PIE[0]);
    // en la azotea: la claraboya encendida, la chimenea de ladrillo y una caja de herramientas del relojero
    poligono([[44, 150], [92, 150], [98, 164], [38, 164]], hex('#3a3a46')); for (let y = 152; y < 163; y++) for (let x = 44; x < 92; x++) { const xx = x + (y - 152) * 0.4; if ((Math.round(xx) - 44) % 9 === 0) pset(x, y, hex('#3a3a46')); else pset(x, y, R.tone(a_r('#c87a30', '#e8a24a', '#f8c870'), 1.4 + (y - 152) * 0.06 + ((x + y) % 7 === 0 ? 0.8 : 0), x, y)); }
    rect(36, 164, 100, 167, hex('#5a5a66')); rect(36, 164, 100, 164, hex('#8a8a96'));
    a_ladrillos(R, 278, 112, 300, 160, LAD, hex('#3a1614'), { w: 6, h: 3, k: 13 }); rect(276, 108, 302, 112, PIE[3]); rect(276, 112, 302, 112, PIE[0]); for (const x of [281, 291]) { rect(x, 102, x + 6, 108, hex('#8a4a32')); rect(x, 102, x + 6, 102, hex('#b86a4a')); }
    rect(120, 156, 136, 164, hex('#7a2a22')); rect(120, 156, 136, 157, hex('#a84a3a')); rect(126, 154, 130, 155, hex('#3a3a3a')); linea(138, 164, 146, 158, hex('#8a8a96'));
    // la torre: el cuerpo de ladrillo con pilastras de piedra, la puerta, la esfera grande, la cornisa y el templete
    const X0 = 166, X1 = 254, cx = 210;
    a_ladrillos(R, X0, 60, X1, 150, LAD, hex('#4a1c1a'), { w: 8, h: 4, k: 11 });
    for (const px of [X0, X1 - 9]) { a_ladrillos(R, px, 60, px + 9, 150, PIE, PIE[1], { w: 10, h: 6, k: 12, var: 0.6 }); rect(px + 9, 60, px + 9, 150, PIE[0]); rect(px, 60, px, 150, PIE[4]); }
    rect(X0 - 4, 54, X1 + 4, 60, PIE[3]); rect(X0 - 4, 59, X1 + 4, 60, PIE[0]); rect(X0 - 4, 54, X1 + 4, 54, PIE[4]); for (let x = X0 - 3; x < X1 + 4; x += 4) pset(x, 61, PIE[0]);
    rect(X0 - 2, 110, X1 + 2, 113, PIE[3]); rect(X0 - 2, 113, X1 + 2, 113, PIE[0]);
    // la puerta de la torre, encendida
    rect(cx - 12, 120, cx + 12, 150, PIE[2]); rect(cx - 10, 124, cx + 10, 150, AK); rect(cx - 9, 126, cx + 9, 150, hex('#e89a40')); disco(cx, 126, 9, hex('#e89a40'));
    disco(cx, 125, 11, (x, y) => (y < 125 && Math.hypot(x - cx, y - 125) > 9 ? PIE[2] : null)); rect(cx - 13, 115, cx + 13, 116, PIE[3]);
    for (let y = 128; y < 150; y += 5) rect(cx - 9, y, cx + 9, y, hex('#c87a30')); linea(cx, 126, cx, 150, hex('#b06a28')); rect(cx - 8, 128, cx + 8, 129, hex('#fff0b0'));
    // la esfera: aro de hierro, fondo crema, marcas, cifras y la sombra del aro
    disco(cx, 84, 24, AK); disco(cx, 84, 22.5, hex('#4a4e58')); disco(cx, 84, 21, (x, y, d) => (d > 0.93 ? hex('#c8bc9a') : (y - 84) + (x - cx) * 0.3 > 12 ? hex('#e4d8b8') : hex('#f6eed6')));
    for (let a = 0; a < 60; a++) { const an = a / 60 * Math.PI * 2, r0 = a % 5 === 0 ? 16.5 : 18.5; for (let r = r0; r <= 19.5; r += 0.5) pset(Math.round(cx + Math.cos(an) * r), Math.round(84 + Math.sin(an) * r), a % 5 === 0 ? AK : hex('#7a7466')); }
    a_cifra(R, cx - 4, 68, '12', AK); a_cifra(R, cx + 11, 82, '3', AK); a_cifra(R, cx - 1, 96, '6', AK); a_cifra(R, cx - 14, 82, '9', AK);
    // la cornisa alta y el templete de hierro con la campana
    rect(X0 - 2, 48, X1 + 2, 54, PIE[2]); rect(X0 - 2, 48, X1 + 2, 48, PIE[4]);
    const HI = hex('#1c2028'), HL = hex('#3a4252');
    for (const x of [180, 194, 226, 240]) { rect(x, 26, x + 1, 47, HI); pset(x, 27, HL); }
    for (let x = 180; x <= 241; x += 3) { linea(x, 44, x + 1, 40, HI); } rect(178, 46, 242, 47, HI); rect(178, 38, 242, 39, HI); rect(182, 25, 238, 26, HI);
    poligono([[180, 25], [cx, 11], [240, 25]], (x, y) => R.tone(a_r('#1a1e28', '#2a303c', '#3c4454'), 2 - (x - 180) / 60 * 1.6 + ((x - cx) % 6 === 0 ? -1 : 0), x, y)); linea(182, 24, cx, 12, HL);
    poligono([[cx - 8, 41], [cx - 6, 30], [cx, 28], [cx + 6, 30], [cx + 8, 41]], (x, y) => R.tone(ORO, 2.4 - (x - cx + 8) / 16 * 2 + (y > 39 ? -1 : 0), x, y)); disco(cx, 42, 1.5, ORO[0]);
    rect(cx, 0, cx + 1, 11, hex('#3a3e48')); pset(cx, 0, HL);
  });
  // las agujas, el segundero que salta y la luz de la puerta
  { const cx = 210, mi = o.minuto ?? (59.5 + Math.min(0.49, t * 0.01)), am = (mi / 60) * Math.PI * 2 - Math.PI / 2, ah = ((11 + mi / 60) / 12) * Math.PI * 2 - Math.PI / 2, as = (Math.floor(t) % 60) / 60 * Math.PI * 2 - Math.PI / 2;
    for (const d of [-0.5, 0, 0.5]) linea(cx + d, 84, cx + d + Math.cos(am) * 17, 84 + Math.sin(am) * 17, AK);
    for (const d of [-0.6, 0, 0.6]) linea(cx + d, 84, cx + d + Math.cos(ah) * 11, 84 + Math.sin(ah) * 11, AK);
    linea(cx, 84, cx + Math.cos(as) * 18, 84 + Math.sin(as) * 18, hex('#b83a2a')); disco(cx, 84, 2, ORO[1]); pset(cx, 83, ORO[3]);
    R.halo(cx, 140, 22, a_r('#3a2a2a', '#6a4a30'), 0.5); }
  // la bola: baja por el mástil, con sus bombillas que corren
  { const cx = 210, yb = Math.round(8 + bola * 14); R.halo(cx, yb, 16 + bola * 6, a_r('#3a3450', '#6a5a50', '#a88a50'), 0.7);
    disco(cx + 0.5, yb, 6, (x, y, d) => { const an = Math.atan2(y - yb, x - cx - 0.5); if (d > 0.55 && (Math.round(an * 4 + t * 6) % 3 === 0)) return hex('#fff8d0'); return d > 0.85 ? ORO[0] : (x - cx) + (y - yb) < -3 ? ORO[3] : ORO[2]; });
    rect(cx - 1, yb - 6, cx + 2, yb - 6, ORO[0]); }
  if (dest > 0) { R.halo(210, 84, 28 + dest * 14, a_r('#5a4a40', '#c8a050', '#fff4c0'), 0.5 + dest); a_destello(R, 210, 56, hex('#fff8e0'), Math.round(2 + dest * 5)); }
  // la luz cálida de la puerta de la torre y de la claraboya sobre el plomo de la azotea (los chibis se leen sobre ella)
  { const fl = 0.5 + Math.sin(t * 4.1) * 0.04; a_luz(R, 210, 160, 64, hex('#ffd08a'), fl, 0.22); a_luz(R, 84, 162, 84, hex('#ffc070'), fl * 0.8, 0.18); a_luz(R, 286, 166, 40, hex('#ffc070'), fl * 0.6, 0.2); }
  // la guirnalda de bombillas de la torre a la balaustrada, y las palomas que duermen en la barandilla
  for (let i = 0; i <= 30; i++) { const u = i / 30, x = Math.round(166 - u * 166), y = Math.round(64 + u * 54 - Math.sin(u * Math.PI) * -10); pset(x, y, hex('#2a2a30')); if (i % 3 === 0) { const on = (Math.floor(t * 3) + i / 3) % 3 !== 0; pset(x, y + 1, on ? [hex('#f8d040'), hex('#f05a6a'), hex('#5ac0f0')][(i / 3) % 3] : hex('#5a4a3a')); } }
  for (const [x, k] of [[24, 0], [32, 1], [300, 2]]) { const g = Math.sin(t * 1.3 + k * 2) > 0.6 ? 1 : 0; rect(x, 116, x + 4, 119, hex('#6a6a7a')); rect(x + 1, 117, x + 3, 118, hex('#8a8a9a')); rect(x + 4 + g, 114, x + 5 + g, 116, hex('#5a5a6a')); pset(x + 5 + g, 114, hex('#2a2a2a')); pset(x + 6 + g, 115, hex('#c8a040')); }
  a_humo(R, t, 284, 100, hex('#3a3a50'), { alto: 30, n: 5, k: 9 }); a_humo(R, t, 294, 100, hex('#3a3a50'), { alto: 26, n: 5, k: 10 });
  // humo de las chimeneas lejanas
  a_humo(R, t, 84, 104, hex('#2a2a40'), { alto: 26, n: 5, k: 1 }); a_humo(R, t, 292, 100, hex('#2a2a40'), { alto: 22, n: 5, k: 2 });
  return { suelo: 166, claraboya: [38, 150, 100, 167], chimenea: [276, 102, 302, 160], caja: [120, 154, 136, 164], reloj: [210, 84, 21], bola: [210, Math.round(8 + bola * 14)], puerta: [198, 116, 222, 150], torre: [162, 0, 258, 150], balaustrada: [120, 140], libre: [20, 150, 160, 176], libre2: [258, 150, 312, 176] };
}
// delante en 'sol': la fila de gente de espaldas al pie del cuadro, que levanta las uvas en cada campanada
function a_solDelante(R, t, o, cam) {
  if (cam === 'reloj') { const PIE = a_r('#7a6a58', '#a8967a', '#c8b898', '#e0d4b8'); R.rect(0, 174, 319, 179, PIE[2]); R.rect(0, 174, 319, 174, PIE[3]); for (let x = 0; x < 320; x += 12) R.rect(x, 175, x, 179, PIE[0]); return { suelo: 166 }; }
  const camp = o.campanada ?? 0, ci = Math.floor(camp), dest = ci >= 1 ? Math.max(0, 1 - (camp - ci) * 2.5) : 0;
  for (let i = 0, x = 4; x < 330; i++, x += 22 + Math.round(h(i, 91) * 8)) {
    const r = A_ROPA[Math.floor(h(i, 92) * A_ROPA.length)], pelo = A_PELO[Math.floor(h(i, 93) * 4)], bob = Math.sin(t * 3 + i * 1.7) > 0.2 ? 1 : 0, y = 170 + bob;
    const c0 = a_mez(r[0], hex('#0a0c1c'), 0.35), c1 = a_mez(r[1], hex('#0a0c1c'), 0.35);
    a_disco(R, x, y + 9, 10, (xx, yy) => (yy > 179 ? null : xx > x + 4 ? c1 : c0)); a_disco(R, x, y - 2, 5, (xx, yy) => (xx > x + 2 ? a_mez(pelo, hex('#000000'), 0.3) : pelo));
    if (h(i, 94) < 0.5) { const cc = [hex('#e84a6a'), hex('#f0c040'), hex('#4ab0e0')][i % 3]; R.poligono([[x - 3, y - 5], [x, y - 14], [x + 3, y - 5]], cc); R.pset(x, y - 15, hex('#fff8e0')); }
    if (dest > 0.15 && h(i, 95) < 0.8) { R.linea(x + 6, y + 2, x + 9, y - 10, c0); R.linea(x + 7, y + 2, x + 10, y - 10, c0); R.rect(x + 9, y - 13, x + 11, y - 11, A_PIEL[0]); R.rect(x + 9, y - 16, x + 11, y - 14, hex('#7a3a9a')); R.pset(x + 9, y - 16, hex('#b07ac8')); }
  }
  return { suelo: 162 };
}

// a_calleNoche: la calle de enfrente por el balcón (la fachada de enfrente con ventanas, la farola, el cielo)
function a_calleBalcon(R, t) {
  a_fondo(R, 'calleBalcon', () => {
    a_degradado(R, 0, 0, 319, 179, A_NOCHE.slice(0, 7), { k: 9 });
    a_estuco(R, 230, 70, 290, 179, a_r('#2a2236', '#3a2e46', '#4a3a54', '#5a4860'), { k: 21 });
    rect2(R, 230, 66, 290, 70, hex('#5a4a5e'));
    for (let fy = 76; fy < 130; fy += 22) for (let x = 236; x < 290; x += 14) { R.rect(x, fy, x + 7, fy + 13, hex('#1a1424')); R.rect(x + 1, fy + 1, x + 6, fy + 12, h(x, fy, 3) < 0.6 ? hex('#d89a48') : hex('#262040')); R.rect(x - 1, fy + 13, x + 8, fy + 14, hex('#5a4a5e')); }
  });
}

const rect2 = (R, x0, y0, x1, y1, c) => R.rect(x0, y0, x1, y1, c);

function a_casa(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'calle') return a_casaCalle(R, t, o);
  // fuera, por el balcón
  a_calleBalcon(R, t);
  a_estrellas(R, t, 14, 52, 66, 4);
  for (let i = 0; i < 3; i++) { const x = Math.round(((t * (5 + i * 2) + i * 50) % 60) + 232), y = 124 + i; if (Math.sin(t * 0.5 + i * 2) > -0.2) a_persona(R, x, y, t, [hex('#2a2030'), hex('#1a1420'), hex('#8a6a58'), hex('#1a1418')], { al: 9, anda: true, gorro: i === 1 ? 'chistera' : 'gorra', k: i }); }
  const PAP = a_r('#3a0e18', '#4e1420', '#621a28', '#762232'), ORP = a_r('#7a5420', '#a87a30', '#d8a848', '#f4d880');
  const MAD = a_r('#2a160c', '#3e2214', '#56301c', '#6e4226', '#8a5832'), MAR = a_r('#8a8478', '#b0aa9c', '#d0cabc', '#e8e4d8', '#f8f6ee');
  a_pegar(R, 'casa1890', () => {
    // el techo con su moldura y el friso dorado
    a_degradado(R, 0, 0, 319, 9, a_r('#c8b89a', '#d8caa8', '#e4d8b8'), { k: 31, onda: 0.1 });
    for (let x = 0; x < 320; x += 4) { rect(x, 8, x + 1, 10, hex('#b8a888')); pset(x, 8, hex('#f0e8d0')); } rect(0, 11, 319, 12, hex('#8a7a5a'));
    for (let x = 0; x < 320; x++) for (let y = 13; y < 20; y++) { const m = ((x + (y - 13) * 2) % 8 < 2 || (x - (y - 13) * 2 + 80) % 8 < 2); pset(x, y, y === 13 || y === 19 ? ORP[0] : m ? (a_calma(x, y) ? ORP[1] : ORP[2]) : ORP[1]); }
    // el papel de damasco (más tranquilo arriba a la derecha)
    const DM = ['...#...', '..###..', '.#.#.#.', '##.#.##', '.#####.', '..###..', '.#.#.#.', '#..#..#', '...#...'];
    for (let y = 20; y < 100; y++) for (let x = 0; x < 320; x++) {
      const fila = Math.floor((y - 20) / 14), xx = (x + (fila % 2) * 8) % 16, yy = (y - 20) % 14, en = xx >= 4 && xx < 11 && yy >= 2 && yy < 11 && DM[yy - 2][xx - 4] === '#';
      let v = 1.6 + (h(x >> 2, y >> 2, 32) - 0.5) * 0.6 + (x % 16 === 0 ? -0.6 : 0) + (en ? (a_calma(x, y + 6) ? 0.6 : 1.4) : 0); pset(x, y, R.tone(PAP, v, x, y)); }
    // el zócalo de madera con sus cuarterones
    a_madera(R, 0, 100, 319, 129, MAD, { ancho: 10, vert: true, k: 33, base: 2.4 }); rect(0, 99, 319, 101, MAD[4]); rect(0, 102, 319, 102, MAD[0]);
    for (let x = 6; x < 316; x += 26) { rect(x, 106, x + 20, 124, MAD[1]); rect(x + 1, 107, x + 19, 123, MAD[3]); rect(x + 2, 108, x + 18, 122, MAD[2]); rect(x + 1, 107, x + 19, 107, MAD[4]); }
    rect(0, 126, 319, 130, MAD[1]); rect(0, 126, 319, 126, MAD[3]);
    // el suelo de parqué en espiga con brillo de cera y la alfombra persa
    const PQ = a_r('#3a2210', '#56341a', '#6e4422', '#8a5a2e', '#a87040');
    for (let y = 131; y < 180; y++) for (let x = 0; x < 320; x++) { const a = (x + y * 2) % 16, b = (x - y * 2 + 640) % 16, sel = Math.floor((x + (y >> 2) * 4) / 8) % 2;
      const v = 2 + (sel ? 0.5 : -0.3) + (h(Math.floor((x + y) / 8), Math.floor((x - y + 400) / 8), 34) - 0.5) * 1 + ((sel ? a : b) === 0 ? -1.4 : 0) + (Math.abs(x - 160) < 30 && (x + y) % 5 === 0 ? 0.8 : 0); pset(x, y, R.tone(PQ, v, x, y)); }
    const AL = a_r('#2a1430', '#5a1a24', '#8a2a2a', '#b84a32', '#d8a050', '#e8d0a0');
    poligono([[62, 140], [250, 140], [274, 178], [38, 178]], (x, y) => { const u = (y - 140) / 38, l = 62 - 24 * u, r = 250 + 24 * u, fx = Math.min(x - l, r - x), fy = Math.min(y - 140, 178 - y);
      if (fx < 2 || fy < 1) return AL[5]; if (fx < 6 || fy < 4) return ((x + y) % 4 < 2) ? AL[1] : AL[4];
      const cx = (x - 156) / (r - l) * 2, cy = (y - 159) / 19, d = Math.abs(cx) * 2 + Math.abs(cy); return d < 0.6 ? (((x >> 1) + (y >> 1)) % 2 ? AL[4] : AL[3]) : d < 0.9 ? AL[0] : ((x + 2 * y) % 7 === 0 ? AL[4] : AL[2]); });
    // la chimenea de mármol con su espejo dorado y el reloj de sobremesa
    rect(14, 86, 74, 130, MAR[1]); for (let y = 86; y < 130; y++) for (let x = 14; x <= 74; x++) { const vv = Math.sin(x * 0.3 + y * 0.12 + Math.sin(y * 0.2) * 2); pset(x, y, R.tone(MAR, 2.6 + vv * 0.6 + (x < 17 ? 0.8 : x > 71 ? -0.8 : 0), x, y)); }
    rect(10, 83, 78, 87, MAR[3]); rect(10, 87, 78, 88, MAR[0]); rect(10, 83, 78, 83, MAR[4]);
    rect(26, 96, 62, 130, hex('#120a0a')); rect(24, 94, 64, 96, MAR[2]); for (let x = 27; x < 62; x += 4) rect(x, 118, x + 1, 128, hex('#2a2a2a')); rect(28, 126, 60, 128, hex('#3a3a3a'));
    rect(18, 24, 70, 82, ORP[1]); rect(20, 26, 68, 80, ORP[2]); rect(22, 28, 66, 78, ORP[0]);
    for (let y = 29; y < 78; y++) for (let x = 23; x < 66; x++) pset(x, y, R.tone(a_r('#1a1a24', '#24283a', '#323a50', '#4a5470'), 1.4 + (y - 29) * 0.01 + (((x - y) % 23 + 23) % 23 < 3 ? 1.4 : 0), x, y));
    for (const [x, y] of [[18, 24], [70, 24], [18, 82], [70, 82]]) { disco(x, y, 3, ORP[2]); pset(x - 1, y - 1, ORP[3]); }
    poligono([[38, 24], [44, 16], [50, 24]], ORP[2]); pset(44, 17, ORP[3]);
    rect(38, 72, 50, 83, ORP[1]); rect(39, 73, 49, 82, ORP[2]); disco(44, 77, 3.5, hex('#f4ecd8')); pset(44, 75, AK); pset(45, 77, AK); rect(37, 82, 51, 83, ORP[0]);
    for (const x of [22, 64]) { rect(x - 2, 80, x + 2, 83, ORP[2]); rect(x - 1, 70, x + 1, 80, ORP[1]); rect(x - 1, 66, x + 1, 70, hex('#f4f0e0')); }
    rect(30, 79, 33, 83, hex('#3a5a8a')); rect(55, 78, 58, 83, hex('#8a3a5a'));
    // el retrato (una dama de pie, sin rostro dibujado)
    rect(88, 28, 128, 76, ORP[1]); rect(90, 30, 126, 74, ORP[2]); rect(92, 32, 124, 72, ORP[0]);
    a_degradado(R, 93, 33, 123, 71, a_r('#1a1410', '#2a2014', '#3a2c1c'), { k: 35 });
    poligono([[102, 71], [108, 46], [114, 46], [120, 71]], hex('#3a4a6a')); rect(108, 40, 114, 46, hex('#d8b090')); rect(107, 37, 115, 41, hex('#2a1a14')); linea(108, 48, 104, 60, hex('#d8b090'));
    // la palmera en su macetero de loza
    for (const [a, l] of [[-2.4, 22], [-2.0, 26], [-1.6, 28], [-1.25, 26], [-0.9, 22], [-2.7, 16], [-0.6, 16]]) { for (let r = 0; r < l; r++) { const x = Math.round(214 + Math.cos(a) * r), y = Math.round(100 + Math.sin(a) * r + (r / l) ** 2 * 10); pset(x, y, hex('#2a5a2a')); if (r % 2 === 0 && r > 4) { pset(x - 1, y + 1, hex('#3a7a34')); pset(x + 1, y + 1, hex('#4a8a3a')); } } }
    rect(206, 104, 222, 126, hex('#2a4a6a')); rect(207, 105, 221, 125, hex('#3a6a9a')); for (let y = 108; y < 124; y += 4) rect(207, y, 221, y, hex('#e8e0d0')); rect(205, 102, 223, 104, hex('#4a7aaa')); rect(209, 106, 210, 124, hex('#6a9aca'));
    // las sillas de los extremos
    for (const [x, d] of [[86, 1], [222, -1]]) { rect(x, 112, x + 2, 152, MAD[1]); rect(x + d * 10, 134, x + d * 10 + 1, 152, MAD[1]); rect(Math.min(x, x + d * 11), 132, Math.max(x, x + d * 11), 136, hex('#6a1a2a')); rect(Math.min(x, x + d * 11), 132, Math.max(x, x + d * 11), 132, hex('#9a3a4a')); rect(x, 112, x + 2, 112, MAD[4]); rect(x - 1, 116, x + 3, 128, hex('#6a1a2a')); }
    // el balcón: la puerta acristalada (con los huecos que dejan ver la calle), las cortinas de terciopelo y la galería
    const BX0 = 238, BX1 = 274;
    rect(BX0 - 2, 52, BX1 + 2, 130, hex('#e8e0cc')); rect(BX0, 54, BX1, 128, hex('#d4c8ac'));
    for (const [x0, x1] of [[BX0 + 2, 255], [257, BX1 - 2]]) for (let r = 0; r < 4; r++) { const y0 = 56 + r * 18; rect(x0, y0, x1, y0 + 15, A_VACIO); }
    rect(BX0, 127, BX1, 128, hex('#a89a7a'));
    const TV = a_r('#0e2a1e', '#163a28', '#1e4c34', '#2a6044', '#3a7a56');
    const cortina = (x0, x1, dir) => { for (let y = 48; y < 131; y++) { const ata = y > 88 && y < 98, ancho = ata ? (x1 - x0) * 0.45 : (x1 - x0); for (let x = x0; x <= x1; x++) { const lx = dir > 0 ? x - x0 : x1 - x; if (lx > ancho) continue; const pl = Math.sin(lx * 0.9 + (y > 96 ? (y - 96) * 0.05 : 0)); pset(x, y, R.tone(TV, 2 + pl * 1.4 + (lx < 1 ? -1 : 0), x, y)); } } };
    cortina(226, 241, 1); cortina(271, 286, -1);
    for (const x of [231, 281]) { rect(x - 2, 90, x + 2, 95, ORP[2]); pset(x, 96, ORP[2]); rect(x - 1, 97, x + 1, 101, ORP[1]); pset(x - 1, 90, ORP[3]); }
    rect(222, 44, 290, 51, ORP[1]); rect(222, 44, 290, 44, ORP[3]); for (let x = 222; x <= 290; x++) { const sw = Math.round(Math.abs(Math.sin((x - 222) / 68 * Math.PI * 2)) * 4); rect(x, 51, x, 51 + sw, TV[3]); pset(x, 52 + sw, x % 2 ? ORP[2] : ORP[1]); }
    rect(0, 100, 319, 100, MAD[4]);
  });
  // la vida: el fuego, el gas de los globos, las burbujas, el reflejo del espejo y el gato junto al fuego
  for (let i = 0; i < 6; i++) a_llama(R, 32 + i * 5, 125, 10 + Math.round(h(i, 51) * 6), t, i);
  for (let i = 0; i < 9; i++) { const x = 30 + i * 3.5, y = 126 - ((t * 9 + i * 7) % 16); if (Math.sin(t * 5 + i) > 0) pset(x, y, hex('#ffb040')); }
  a_luz(R, 44, 120, 46, hex('#ffb060'), 0.45, 0.6);
  { const r = 0.5 + Math.sin(t * 7) * 0.1; for (let y = 32; y < 76; y++) { const x = Math.round(26 + ((y * 0.6 + t * 4) % 36)); if (x < 65) a_tinte(R, x, y, hex('#a87850'), r * 0.6); } }
  // la lámpara de gas: cadena, cuerpo de latón, brazos y cinco globos con su llama
  { const x = 160; linea(x, 13, x, 26, hex('#8a6a30')); for (let y = 14; y < 26; y += 2) pset(x + 1, y, hex('#c8a048'));
    rect(x - 4, 26, x + 4, 29, hex('#a87a30')); rect(x - 3, 30, x + 3, 31, hex('#6a4a1a')); pset(x - 3, 26, hex('#f0d080')); pset(x, 33, hex('#c8a048'));
    for (const dx of [-20, -10, 10, 20, 0]) { const gx = x + dx, gy = dx === 0 ? 40 : 36; if (dx) { linea(x, 29, gx, gy - 4, hex('#a87a30')); } else linea(x, 31, x, 36, hex('#a87a30'));
      const fl = 0.8 + Math.sin(t * 11 + dx) * 0.1 + Math.sin(t * 23 + dx * 2) * 0.06; R.halo(gx, gy, 14 * fl, a_r('#5a2a2a', '#9a5a3a', '#e8b060'), 0.7);
      disco(gx, gy, 3.2, (xx, yy) => (yy < gy - 1 ? hex('#fff8e0') : hex('#f8e0a8'))); pset(gx, gy, hex('#fff4c0')); rect(gx - 2, gy + 3, gx + 2, gy + 4, hex('#a87a30')); } }
  a_luz(R, 160, 150, 70, hex('#f0c080'), 0.2, 0.35);
  a_gato(R, 66, 150, t, hex('#5a3a2a'), hex('#8a5a3a'), -1);
  // la cortina se mece con el aire del balcón
  { const sw = Math.round(Math.sin(t * 0.9) * 1.5); if (sw) for (let y = 104; y < 130; y++) { const x = sw > 0 ? 242 : 240; pset(x + sw, y, hex('#1e4c34')); } }
  return { suelo: 162, detrasMesa: 142, mesa: [100, 130, 206, 156], hueco: [[120, 140], [152, 172]], chimenea: [14, 86, 74, 130], espejo: [20, 26, 68, 80], lampara: [160, 36],
    balcon: [238, 52, 274, 128], retrato: [88, 28, 128, 76], libre: [[20, 96], [214, 300]], gato: [56, 150] };
}

// 'casa1890' cámara 'calle': la fachada de noche, el balcón encendido y la calle que se aleja
function a_casaCalle(R, t, o) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  a_cieloNoche(R, t, 120, { luna: [262, 66, 5], nubes: [[230, 40, 40, 1.1, 9], [280, 70, 30, 0.6, 10]], estrellas: 40 });
  // la calle que se aleja (detrás de la esquina): un coche de caballos y el sereno
  const FA = a_r('#5a4a3a', '#7a6650', '#9a8468', '#b8a080', '#d8c4a0'), PIE = a_r('#4a4048', '#6a5e62', '#8a7e7a', '#aaa094');
  a_pegar(R, 'casaCalleFondo', () => {
    for (let i = 0; i < 6; i++) { const u = 1 - i / 6, x0 = 236 + i * 12, w = Math.round(14 * u + 4), top = Math.round(60 + i * 8), base = Math.round(146 - i * 4);
      a_estuco(R, x0, top, x0 + w, base, a_r('#2a2232', '#3a2e40', '#4a3c4e', '#5a4a5a'), { k: 40 + i });
      for (let y = top + 4; y < base - 6; y += 10 - i) if (h(i, y, 41) < 0.6) rect(x0 + 2, y, x0 + Math.max(3, w - 3), y + 2, h(i, y, 42) < 0.5 ? hex('#d89a48') : hex('#20203a')); }
    for (let y = 132; y < 180; y++) for (let x = 236; x < 320; x++) { const v = 1.4 + (h(x >> 1, y, 43) - 0.5) * 0.8 + (Math.abs(x - 300) < 6 && y > 150 ? 0.8 : 0); pset(x, y, R.tone(a_r('#16141e', '#22202c', '#2e2c3a', '#3a384a'), v, x, y)); }
  });
  { const x = Math.round(((t * 7) % 120) + 236), u = (x - 236) / 84, s = 1 - u * 0.6, y = Math.round(146 - u * 10);
    if (x < 320) { R.recorte([236, 0, 319, 179]); disco(x, y - 2, 2.5 * s, hex('#141018')); poligono([[x - 4 * s, y - 10 * s], [x + 4 * s, y - 10 * s], [x + 4 * s, y - 3 * s], [x - 4 * s, y - 3 * s]], hex('#2a1a1a')); poligono([[x + 4 * s, y - 6 * s], [x + 10 * s, y - 7 * s], [x + 10 * s, y - 2 * s], [x + 4 * s, y - 2 * s]], hex('#3a2a20')); pset(x + 10 * s, y - 8 * s, hex('#3a2a20')); disco(x - 3 * s, y - 7 * s, 1, hex('#f8d070')); R.recorte(null); } }
  a_pegar(R, 'casaCalle', () => {
    // la fachada: tejado, cornisa con canecillos, dos pisos con balcones y la planta baja de sillería
    for (let y = 0; y < 18; y++) for (let x = 0; x < 236; x++) pset(x, y, R.tone(a_r('#2a1a1a', '#3a2420', '#4a2e28', '#5a3a30'), 1.5 + ((x + (y % 4 < 2 ? 0 : 3)) % 6 < 1 ? -1 : 0) + y * 0.05, x, y));
    rect(30, 0, 36, 12, hex('#3a2a28')); rect(150, 0, 156, 10, hex('#3a2a28'));
    a_estuco(R, 0, 18, 235, 104, FA, { k: 44, luz: (x, y) => (x > 226 ? -1 : 0) + ((y - 18) % 22 === 0 ? -0.6 : 0) });
    rect(0, 18, 235, 23, FA[3]); rect(0, 23, 235, 24, FA[0]); for (let x = 3; x < 235; x += 8) { rect(x, 24, x + 2, 27, FA[2]); pset(x + 2, 27, FA[0]); }
    rect(0, 104, 235, 146, FA[1]); for (let y = 104; y < 146; y++) for (let x = 0; x < 236; x++) { const f = Math.floor((y - 104) / 7), xx = x + (f % 2) * 10, j = (y - 104) % 7 === 0 || xx % 20 === 0; pset(x, y, j ? FA[0] : R.tone(FA, 2 + (h(xx >> 3, f, 45) - 0.5) + ((y - 104) % 7 === 1 ? 0.6 : 0), x, y)); }
    rect(0, 102, 235, 104, FA[3]); rect(0, 104, 235, 104, FA[0]);
    rect(236, 18, 238, 146, FA[0]);
    const balcon = (x, y, w, hh, lit) => {
      rect(x - 3, y - 4, x + w + 2, y - 2, FA[3]); rect(x - 3, y - 2, x + w + 2, y - 2, FA[0]); rect(x - 1, y - 1, x + w, y + hh, AK);
      rect(x, y, x + w - 1, y + hh - 1, lit ? hex('#f0b050') : hex('#1c1a2c')); if (!lit) { pset(x + 1, y + 1, hex('#4a4a6a')); linea(x + (w >> 1), y, x + (w >> 1), y + hh - 1, hex('#0e0c18')); }
      rect(x - 6, y + hh, x + w + 5, y + hh + 2, FA[3]); rect(x - 6, y + hh + 2, x + w + 5, y + hh + 2, FA[0]); pset(x - 5, y + hh + 3, FA[1]); pset(x + w + 4, y + hh + 3, FA[1]);
      rect(x - 6, y + hh - 10, x + w + 5, y + hh - 10, AK); for (let i = x - 6; i <= x + w + 5; i += 2) linea(i, y + hh - 9, i, y + hh - 1, AK); for (let i = x - 4; i <= x + w + 3; i += 6) { pset(i, y + hh - 6, AK); pset(i + 1, y + hh - 5, AK); }
    };
    balcon(20, 32, 12, 22, false); balcon(196, 32, 12, 22, h(1, 2) < 0.5); balcon(80, 32, 12, 22, false); balcon(140, 32, 12, 22, true);
    balcon(18, 64, 16, 30, false); balcon(196, 64, 16, 30, false);
    // el balcón principal, encendido: las cortinas recogidas y el hueco donde brinda la familia
    rect(84, 58, 154, 64, FA[3]); rect(84, 64, 154, 64, FA[0]); poligono([[84, 58], [119, 50], [154, 58]], FA[3]); linea(84, 58, 119, 50, FA[4]);
    rect(92, 65, 146, 98, AK); rect(93, 66, 145, 97, hex('#f4c060'));
    for (let y = 66; y < 98; y++) for (let x = 93; x < 146; x++) { const g = Math.hypot(x - 119, (y - 70) * 1.3) / 40; pset(x, y, R.tone(a_r('#fff0b0', '#f8d080', '#e8a850', '#c87a3a'), g * 3.2, x, y)); }
    for (let y = 66; y < 98; y++) { const w = y < 80 ? 6 : 6 - (y - 80) * 0.15; for (let i = 0; i < w; i++) { pset(93 + i, y, hex('#7a1a2a')); pset(145 - i, y, hex('#7a1a2a')); } pset(93 + Math.floor(w), y, hex('#a83a4a')); pset(145 - Math.floor(w), y, hex('#a83a4a')); }
    rect(86, 98, 152, 100, FA[3]); rect(86, 100, 152, 100, FA[0]); rect(86, 88, 152, 88, AK); for (let i = 86; i <= 152; i += 2) linea(i, 89, i, 97, AK); for (let i = 89; i < 152; i += 6) { pset(i, 92, AK); pset(i + 1, 93, AK); }
    // la planta baja: la tienda cerrada con sus cierres, el portal con aldaba y la reja
    rect(14, 110, 74, 146, hex('#1e2a1e')); for (let x = 16; x < 74; x += 3) { rect(x, 112, x + 1, 145, hex('#2e4a2e')); pset(x, 112, hex('#4a6a46')); } rect(14, 108, 74, 110, FA[3]);
    rect(36, 104, 52, 108, hex('#3a2a1a')); for (let x = 37; x < 52; x += 3) rect(x, 105, x + 1, 107, hex('#c8a048'));
    rect(98, 106, 140, 146, FA[2]); rect(100, 112, 138, 146, AK); a_madera(R, 101, 116, 138, 146, a_r('#2a160c', '#3e2214', '#56301c', '#6e4226'), { ancho: 6, vert: true, k: 46 });
    disco(119, 114, 18, (x, y) => (y < 116 && y > 96 && Math.hypot(x - 119, y - 116) < 18 && Math.hypot(x - 119, y - 116) > 4 ? (Math.round(Math.atan2(y - 116, x - 119) * 4) % 2 ? hex('#e8a850') : AK) : null)); rect(118, 116, 120, 146, AK);
    for (const x of [110, 128]) { disco(x, 128, 2, hex('#c8a048')); pset(x - 1, 127, hex('#f0d080')); } for (let y = 120; y < 146; y += 6) for (let x = 103; x < 138; x += 6) pset(x, y, hex('#a88a48'));
    rect(160, 112, 214, 140, AK); rect(161, 113, 213, 139, hex('#1c1a2c')); for (let x = 163; x < 213; x += 5) rect(x, 112, x, 140, hex('#3a3a44')); for (let y = 118; y < 140; y += 8) rect(160, y, 214, y, hex('#3a3a44'));
    // la acera de granito, el bordillo y los adoquines mojados
    for (let y = 146; y < 154; y++) for (let x = 0; x < 236; x++) pset(x, y, (x % 22 === 0) ? PIE[0] : R.tone(PIE, 1.6 + (h(x >> 3, 1, 47) - 0.5) + (y === 146 ? 0.8 : 0), x, y));
    rect(0, 154, 319, 156, PIE[3]); rect(0, 156, 319, 157, PIE[0]);
    const AD = a_r('#16141c', '#24222e', '#32303e', '#424052', '#565468');
    for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 158) / 5), xx = x + (f % 2) * 4, j = (y - 158) % 5 === 0 || xx % 8 === 0;
      let v = 2 + (h(xx >> 3, f, 48) - 0.5) * 1.2 + ((y - 158) % 5 === 1 ? 0.8 : 0); if (Math.abs(x - 119) < 30 && (x + y) % 4 === 0 && !j) v += 1; pset(x, y, j ? AD[0] : R.tone(AD, v, x, y)); }
    for (const [x, w] of [[50, 26], [200, 30]]) for (let y = 164; y < 172; y++) for (let i = 0; i < w; i++) if (Math.abs(i - w / 2) / (w / 2) + Math.abs(y - 168) / 4 < 1) pset(x + i, y, (i + y) % 3 ? hex('#262a44') : hex('#3a4062'));
    a_farola(R, 30, 152, 54, 1); a_farola(R, 186, 152, 54, 1);
    for (let i = 1; i < 4; i++) { const x = 238 + i * 20, al = 40 - i * 9; linea(x, 152 - i * 4, x, 152 - i * 4 - al, hex('#141820')); rect(x - 1, 152 - i * 4 - al - 3, x + 1, 152 - i * 4 - al, hex('#f8d880')); }
  });
  // la vida: las farolas tiemblan, la familia brinda en el balcón, el sereno pasea, el humo de las chimeneas, un gato
  for (const [x, y] of [[30, 95], [186, 95], [258, 106], [278, 117], [298, 128]]) { const f = 0.85 + Math.sin(t * 8 + x) * 0.1; R.halo(x, y, (x > 236 ? 8 : 18) * f, a_r('#3a2a30', '#7a5a40', '#c89a50'), 0.8); pset(x, y, hex('#fff8d0')); }
  a_luz(R, 119, 120, 50, hex('#f0b050'), 0.25, 0.8);
  R.recorte([99, 66, 139, 97]);
  for (const [x, k, g] of [[104, 0, 'chistera'], [116, 1, 'velo'], [127, 2, null], [135, 3, 'chistera']]) a_persona(R, x + Math.round(Math.sin(t * 0.8 + k) * 2), 98, t, [hex('#2a1418'), hex('#1a0c10'), hex('#6a3a2a'), hex('#1a0c10')], { al: 13, brazo: Math.sin(t * 1.4 + k * 1.3) > 0.2, gorro: g, falda: g === 'velo', dir: k % 2 ? -1 : 1, k });
  R.recorte(null);
  { const x = Math.round(318 - ((t * 4) % 90)), s = 1 - (x - 236) / 84 * 0.5; if (x > 238) { R.recorte([238, 0, 319, 179]); a_persona(R, x, Math.round(150 - (x - 236) * 0.12), t, [hex('#2a2a3a'), hex('#1a1a26'), hex('#8a6a58'), hex('#1a1418')], { al: Math.round(11 * s), anda: true, dir: -1, gorro: 'gorra', carga: hex('#f8d070') }); R.halo(x - 2, Math.round(150 - (x - 236) * 0.12) - 6, 6, a_r('#3a3030', '#8a6a40'), 0.6); R.recorte(null); } }
  a_humo(R, t, 33, 0, hex('#3a3448'), { alto: 14, n: 4, k: 3 }); a_humo(R, t, 153, 0, hex('#3a3448'), { alto: 12, n: 4, k: 4 });
  a_gato(R, 196 + Math.round(((t * 3) % 20)), 96, t, hex('#1a1418'), hex('#3a3236'), 1);
  return { suelo: 164, acera: 152, portal: [100, 112, 138, 146], balcon: [92, 65, 146, 98], tienda: [14, 110, 74, 146], farolas: [30, 186], calleFondo: [236, 60, 320, 156], libre: [20, 150, 232, 176] };
}

// delante en 'casa1890': la mesa con mantel de damasco, el champán en su cubo, las copas con burbujas y el frutero con uvas
function a_casaDelante(R, t, o, cam) {
  if (cam === 'calle') return { suelo: 164 };
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const M = a_r('#a8a49a', '#c8c4b8', '#e0dcd0', '#f2efe6', '#fffdf6');
  poligono([[100, 130], [206, 130], [210, 137], [96, 137]], (x, y) => R.tone(M, 3.2 - (y - 130) * 0.15 + ((x + y) % 9 === 0 ? -0.6 : 0), x, y));
  for (let y = 137; y < 157; y++) for (let x = 96; x <= 210; x++) { const pl = Math.sin((x - 96) * 0.55 + Math.floor((y - 137) / 6) * 0.15); pset(x, y, R.tone(M, 2.4 + pl * 0.9 - (y - 137) * 0.03 + ((x * 3 + y) % 13 === 0 ? -0.5 : 0), x, y)); }
  for (let x = 96; x <= 210; x++) { if (x % 3) pset(x, 157, M[2]); else pset(x, 158, M[1]); } linea(96, 137, 210, 137, M[1]);
  for (let x = 98; x < 210; x += 8) { pset(x, 150, M[4]); pset(x + 1, 151, M[4]); pset(x + 2, 150, M[4]); }
  // el cubo de plata con la botella
  rect(104, 120, 116, 131, hex('#6a7080')); rect(105, 121, 115, 130, hex('#a8b0c0')); rect(106, 122, 108, 129, hex('#e8f0f8')); rect(103, 119, 117, 120, hex('#c8d0dc'));
  rect(108, 104, 112, 120, hex('#1a3a22')); rect(109, 100, 111, 104, hex('#1a3a22')); rect(108, 97, 112, 101, hex('#d8b040')); pset(108, 98, hex('#fff0a0')); rect(108, 112, 112, 116, hex('#f0e8d0')); linea(109, 105, 109, 111, hex('#3a6a44'));
  // las copas con el champán y las burbujas
  for (const [x, k] of [[124, 0], [176, 1], [192, 2]]) { rect(x - 3, 120, x + 3, 120, hex('#e8f0f8')); rect(x - 3, 121, x + 3, 123, hex('#f0d070')); rect(x - 2, 124, x + 2, 124, hex('#d8b850')); pset(x, 125, hex('#c8d8e8')); rect(x, 126, x, 128, hex('#c8d8e8')); rect(x - 2, 129, x + 2, 129, hex('#c8d8e8')); pset(x - 3, 121, hex('#ffffff'));
    for (let i = 0; i < 3; i++) { const yy = 123 - ((t * 4 + i * 0.9 + k) % 3); pset(x - 1 + i, Math.round(yy), hex('#fff8d0')); } }
  // el frutero de plata con racimos de uvas, una granada y naranjas
  rect(184, 126, 196, 128, hex('#a8b0c0')); rect(188, 120, 192, 126, hex('#8a92a4')); rect(180, 116, 200, 120, hex('#c8d0dc')); rect(180, 116, 200, 116, hex('#eef2f8'));
  disco(186, 112, 4, hex('#e8902a')); pset(185, 110, hex('#f8c070')); disco(195, 113, 3.5, hex('#a82a3a')); pset(194, 111, hex('#e86a6a'));
  a_racimo(R, 190, 106, 3, A_UVA); a_racimo(R, 182, 110, 2, A_UVAV); a_racimo(R, 198, 108, 2, A_UVA);
  for (const x of [140, 160]) { disco(x, 133, 5, M[1]); disco(x, 133, 4, M[4]); R.rect(x - 2, 132, x + 2, 133, hex('#e8e4d8')); }
  return { suelo: 162, detrasMesa: 142, mesa: [96, 130, 210, 158] };
}

const A_DIA = a_r('#4a86c8', '#5692d0', '#64a0d8', '#74aedc', '#86bade', '#9ac6e0', '#b0d0dc', '#c8d8d4', '#dcdcc8');

function a_cieloDia(R, t, hor, o = {}) {
  a_fondo(R, 'diaA' + hor, () => {
    a_degradado(R, 0, 0, 319, 179, A_DIA, { k: 7 });
    if (o.sol) { const [sx, sy, sr] = o.sol; R.halo(sx, sy, sr * 4, a_r('#a8c8dc', '#c8dcd8', '#e8ecd0'), 1); a_disco(R, sx, sy, sr, (x, y) => (y - sy + x - sx < -sr * 0.6 ? hex('#ffffff') : hex('#fff8d8'))); }
  });
  a_nubes(R, t, o.nubes ?? [[30, 50, 70, 1.2, 11], [200, 24, 40, 0.5, 12], [120, 40, 54, 0.8, 13], [250, 56, 80, 1.8, 14], [70, 18, 30, 0.4, 15]], a_r('#ffffff', '#e4ecf2', '#b8c8d8'));
}

function a_vinedo(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'cajas') return a_vinedoCajas(R, t, o);
  a_cieloDia(R, t, 76, { sol: [54, 30, 7] });
  a_pajaros(R, t, 9, 22, 14, hex('#2a2a3a'), 1);
  a_pegar(R, 'vinedo' + (o.cartel === false ? 'S' : 'C'), () => a_vinedoFijo(R, o.cartel !== false));
  // la vida: el humo de la masía, los vendimiadores que se agachan y se levantan, el carro, las hojas que se mueven
  a_humo(R, t, 72, 50, hex('#e8e4dc'), { alto: 30, n: 6, viento: 0.6, k: 5 });
  for (const [u, i, k] of [[0.3, -2.5, 0], [0.42, 2.5, 1], [0.36, -1.4, 2], [0.55, 3.4, 3], [0.26, 1.6, 4]]) {
    const y = Math.round(76 + u * 104), x = Math.round(160 + i * 44 * u), al = Math.round(5 + u * 12), ag = Math.sin(t * 1.3 + k * 2) > 0;
    a_persona(R, x, y - (ag ? 0 : 0), t, [k % 2 ? hex('#e8e0cc') : hex('#3a4a6a'), hex('#8a8070'), A_PIEL[2], A_PELO[0]], { al: ag ? al - 2 : al, gorro: k % 2 ? 'paja' : 'velo', falda: k % 2 === 0, dir: k % 2 ? 1 : -1, k, brazo: !ag });
    rect(x + 3, y - 3, x + 5 + Math.round(u * 2), y - 1, hex('#c8a060')); pset(x + 4, y - 4, hex('#6a2a7a'));
  }
  { const x = Math.round(((t * 6) % 220) + 200), y = 89; if (x < 330) { R.recorte([0, 76, 319, 100]); rect(x - 14, y - 6, x - 4, y - 3, hex('#8a5a30')); for (let i = 0; i < 3; i++) rect(x - 13 + i * 3, y - 8, x - 12 + i * 3, y - 7, hex('#6a2a7a'));
    disco(x - 9, y - 1, 2.5, hex('#3a2a1a')); pset(x - 9, y - 1, hex('#8a6a40')); linea(x - 4, y - 4, x, y - 4, hex('#4a3a2a'));
    rect(x, y - 6, x + 6, y - 3, hex('#5a4a3a')); rect(x + 6, y - 8, x + 8, y - 5, hex('#5a4a3a')); pset(x + 7, y - 9, hex('#5a4a3a')); const p = Math.floor(t * 4) % 2; pset(x + 1, y - 2 + p, hex('#3a2a1a')); pset(x + 5, y - 2 + (1 - p), hex('#3a2a1a')); pset(x + 1, y - 2, hex('#3a2a1a')); pset(x + 5, y - 2, hex('#3a2a1a')); R.recorte(null); } }
  for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 81) * 320), y = 110 + Math.floor(h(i, 82) * 60); if (Math.sin(t * 3 + i) > 0.6) pset(x, y, hex('#e8d050')); }
  return { suelo: 160, horizonte: 76, camino: [[124, 160], [196, 160]], fuga: [160, 76], masia: [22, 50, 100, 84], cartel: o.cartel !== false ? [236, 106, 262, 130] : null, sol: [54, 30, 7], libre: [96, 148, 228, 172] };
}

// a_vinedoFijo: lo que no se mueve en el viñedo: sierras, masía, tierra roja con surcos y cepas en hileras
function a_vinedoFijo(R, cartel) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  // las sierras secas: lejos violeta, cerca ocre con terrazas y matas
  for (let x = 0; x < 320; x++) { const s1 = Math.round(54 + Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11 + 1) * 3 + (h(x >> 3, 1, 83) - 0.5) * 3); for (let y = s1; y < 80; y++) pset(x, y, R.tone(a_r('#7a7aa0', '#8a88aa', '#9c98b4', '#aeaabc'), 2.6 - (y - s1) * 0.04 + ((x - y * 0.6) % 14 < 2 ? -0.8 : 0), x, y));
    const s2 = Math.round(66 + Math.sin(x * 0.05 + 2) * 5 + Math.sin(x * 0.17) * 2); for (let y = s2; y < 80; y++) pset(x, y, R.tone(a_r('#8a6a42', '#a8804e', '#c49a62', '#d8b47a'), 2.4 - (y - s2) * 0.05 + ((y - s2) % 4 === 0 ? -0.8 : 0) + (h(x >> 2, y >> 1, 84) < 0.12 ? -1.6 : 0), x, y)); }
  // la tierra roja con los surcos de cada hilera y el camino del centro
  const TI = a_r('#5a2414', '#7a341c', '#984426', '#b05632', '#c46c44', '#d8906a');
  for (let y = 76; y < 180; y++) { const u = (y - 76) / 104; for (let x = 0; x < 320; x++) { const r = (x - 160) / (44 * Math.max(0.02, u)), f = r - Math.round(r);
    let v = 2.6 + Math.cos(f * Math.PI * 2) * 0.8 * Math.min(1, u * 3) + (h(x >> 1, y, 85) - 0.5) * 0.8 + (h(x >> 2, y >> 2, 86) < 0.08 ? -1 : 0);
    if (Math.abs(r) < 0.62) v = 3.6 + (h(x, y, 87) - 0.5) * 0.9 + (Math.abs(Math.abs(r) - 0.32) < 0.03 ? -1 : 0);
    pset(x, y, R.tone(TI, v, x, y)); } }
  // la masía blanca con el riurau de arcos, la palmera y el almendro
  const BL = a_r('#a8a49a', '#c8c4b8', '#e2ddd0', '#f4f0e6', '#ffffff');
  a_estuco(R, 30, 62, 92, 86, BL, { k: 88, base: 3, luz: (x) => (x > 76 ? -1.2 : 0) });
  poligono([[28, 62], [60, 50], [94, 62]], (x, y) => R.tone(a_r('#7a3418', '#a8482a', '#c8603a', '#e07a4a'), 2.2 + ((x + (y % 2) * 2) % 4 === 0 ? -1 : 0) - (x - 28) / 66, x, y)); linea(28, 62, 94, 62, hex('#5a2a14'));
  rect(70, 44, 74, 54, BL[2]); rect(69, 43, 75, 44, hex('#7a3418'));
  rect(56, 72, 64, 86, hex('#5a3a22')); disco(60, 72, 4, hex('#5a3a22')); for (const x of [38, 82]) { rect(x, 68, x + 5, 74, hex('#2a5a8a')); rect(x + 2, 68, x + 3, 74, hex('#1a3a5a')); }
  for (let i = 0; i < 3; i++) { const x = 96 + i * 9; rect(x, 66, x + 8, 86, BL[2]); rect(x + 2, 72, x + 6, 86, hex('#6a5a4a')); disco(x + 4, 72, 2, hex('#6a5a4a')); } rect(94, 64, 122, 66, hex('#c8603a'));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) pset(98 + i * 6 + j, 76 + j, hex('#8a5a8a'));
  rect(130, 54, 131, 86, hex('#6a5038')); for (let y = 56; y < 86; y += 3) pset(131, y, hex('#8a6a48'));
  for (const [a, l] of [[-2.6, 12], [-2.1, 13], [-1.57, 9], [-1.0, 13], [-0.5, 12], [-3.0, 9], [-0.1, 9]]) for (let r = 0; r < l; r++) { const x = Math.round(131 + Math.cos(a) * r), y = Math.round(54 + Math.sin(a) * r + (r / l) ** 2 * 6); pset(x, y, hex('#3a6a2a')); pset(x, y + 1, hex('#5a8a3a')); }
  linea(14, 86, 16, 68, hex('#4a3a2a')); linea(16, 72, 10, 64, hex('#4a3a2a')); linea(16, 70, 22, 62, hex('#4a3a2a'));
  for (const [x, y, r] of [[10, 62, 6], [22, 60, 7], [16, 56, 6]]) disco(x, y, r, (xx, yy) => (h(xx, yy, 89) < 0.5 ? hex('#6a8a3a') : h(xx, yy, 90) < 0.5 ? hex('#8aa84a') : hex('#4a6a2a')));
  // las cepas en vaso, de la más lejana a la más cercana, con sus racimos
  for (let u = 0.04; u < 1.08; u += 0.0045 + u * 0.075) for (let i = -9; i <= 9; i++) { if (i === 0) continue;
    const y = Math.round(76 + u * 104), x = Math.round(160 + i * 44 * u + (h(i, Math.round(u * 100), 91) - 0.5) * 4 * u), s = 1 + u * 10; if (x < -20 || x > 340) continue;
    if (s > 3) { linea(x, y, x - 1, y - s * 0.5, hex('#3a2414')); linea(x + 1, y, x + 1, y - s * 0.45, hex('#5a3a22')); }
    const fy = Math.round(y - s * 0.55), w = s * 0.95, hh = s * 0.55;
    for (let yy = Math.floor(fy - hh); yy <= fy + hh * 0.5; yy++) for (let xx = Math.floor(x - w); xx <= x + w; xx++) { const d = ((xx - x) / w) ** 2 + ((yy - fy) / hh) ** 2; if (d > 1 + (h(xx, yy, 92) - 0.5) * 0.5) continue;
      const q = h(xx >> (s > 6 ? 1 : 0), yy >> (s > 6 ? 1 : 0), 93 + i), top = yy < fy - hh * 0.3;
      pset(xx, yy, q < 0.12 ? hex('#c8a030') : q < 0.2 ? hex('#c8602a') : top ? (q < 0.6 ? hex('#8ab040') : hex('#6a9a34')) : (q < 0.6 ? hex('#4a7a2a') : hex('#36601e'))); }
    if (s > 4.5) for (let g = 0; g < (s > 7 ? 3 : 2); g++) { const gx = Math.round(x + (h(i, g, 94) - 0.5) * w * 1.3), gy = Math.round(fy + hh * 0.2); a_racimo(R, gx, gy, s > 8 ? 2 : 1, A_UVA); }
  }
  // el cartel de madera con la uva dorada
  if (cartel) { rect(247, 128, 249, 156, hex('#4a3020')); rect(249, 128, 249, 156, hex('#2a1a10')); rect(234, 106, 262, 130, hex('#2a1a10'));
    a_madera(R, 235, 107, 261, 129, a_r('#5a3a1e', '#7a5028', '#98683a', '#b0804a'), { ancho: 5, k: 95 });
    a_racimo(R, 248, 110, 3, a_r('#a87a18', '#e8b840', '#fff0a0')); linea(248, 109, 252, 107, hex('#5a8a2a')); disco(253, 108, 2, hex('#6a9a34'));
    for (const [x, y] of [[236, 108], [260, 108], [236, 128], [260, 128]]) pset(x, y, hex('#c8c0a8')); }
}

// 'vinedo' cámara 'cajas': el almacén de la uva que sobra
function a_vinedoCajas(R, t, o) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  // fuera, por la puerta: el cielo, el viñedo y un carro que pasa
  a_cieloDia(R, t, 100, { nubes: [[30, 60, 40, 1.4, 16], [80, 80, 30, 2.2, 17]] });
  a_pegar(R, 'cajasFuera', () => {
    for (let y = 92; y < 140; y++) for (let x = 20; x < 110; x++) { const r = ((x - 60) / ((y - 88) * 0.8)), f = r - Math.round(r); pset(x, y, Math.abs(f) < 0.2 + (y - 92) * 0.004 ? (h(x, y, 96) < 0.5 ? hex('#6a9a34') : hex('#4a7a2a')) : R.tone(a_r('#984426', '#b05632', '#c46c44'), 1.4 + (h(x, y, 97) - 0.5), x, y)); }
    for (let x = 20; x < 110; x++) { const s = Math.round(84 + Math.sin(x * 0.07) * 4); for (let y = s; y < 92; y++) pset(x, y, R.tone(a_r('#9a88a8', '#a898b4', '#c4a070'), y > 88 ? 2 : 0.6, x, y)); }
  });
  { const x = Math.round(((t * 9) % 140) - 20), y = 104; R.recorte([26, 46, 96, 140]); rect(x, y - 8, x + 16, y - 3, hex('#8a5a30')); for (let i = 0; i < 4; i++) rect(x + 1 + i * 4, y - 10, x + 3 + i * 4, y - 9, hex('#6a2a7a'));
    disco(x + 8, y - 1, 3.5, hex('#3a2a1a')); pset(x + 8, y - 1, hex('#8a6a40')); rect(x + 17, y - 8, x + 26, y - 4, hex('#5a4a3a')); rect(x + 25, y - 11, x + 28, y - 6, hex('#5a4a3a')); const p = Math.floor(t * 4) % 2; rect(x + 18 + p, y - 3, x + 18 + p, y, hex('#3a2a1a')); rect(x + 25 - p, y - 3, x + 25 - p, y, hex('#3a2a1a')); R.recorte(null); }
  const CAL = a_r('#8a8070', '#aaa08c', '#c8bea8', '#ded6c2', '#ece6d6'), MAD = a_r('#2a1a10', '#4a3020', '#6a4a30', '#8a6440', '#a87e52');
  a_pegar(R, 'cajas', () => {
    // el techo de tablas y la viga
    a_madera(R, 0, 0, 319, 15, a_r('#1e140e', '#2a1c12', '#3a2818', '#4a3420'), { ancho: 4, k: 101, base: 1.6 });
    rect(0, 16, 319, 22, MAD[1]); rect(0, 16, 319, 16, MAD[2]); rect(0, 22, 319, 23, MAD[0]); for (let x = 0; x < 320; x += 40) rect(x + 18, 16, x + 21, 22, MAD[0]);
    // la pared encalada con la piedra que asoma, grietas y la mancha de humedad abajo
    for (let y = 24; y < 142; y++) for (let x = 0; x < 320; x++) { const pie = h(x >> 3, y >> 2, 102) < 0.16 && h((x + (y >> 1)) >> 2, y >> 1, 103) < 0.75;
      let v; if (pie) { const f = Math.floor(y / 6), xx = x + (f % 2) * 6, j = y % 6 === 0 || xx % 12 === 0; v = j ? 0.2 : 1.4 + (h(xx >> 3, f, 104) - 0.5) * 1.2; }
      else v = 3.2 + (h(x >> 3, y >> 3, 105) - 0.5) * 0.6 + (h(x, y, 106) - 0.5) * 0.5 - (y > 124 ? (y - 124) * 0.08 : 0) - (y < 34 ? (34 - y) * 0.08 : 0);
      pset(x, y, R.tone(pie ? a_r('#5a5046', '#7a6e5e', '#9a8c76', '#b0a28a') : CAL, v, x, y)); }
    for (const [x0, y0, n] of [[150, 40, 18], [280, 90, 14], [118, 70, 12]]) { let x = x0, y = y0; for (let i = 0; i < n; i++) { pset(x, y, CAL[0]); x += h(i, x0, 107) < 0.5 ? 1 : 0; y++; } }
    // la puerta grande (el hueco deja ver el viñedo), el dintel, la hoja abierta y el umbral
    rect(26, 46, 96, 140, A_VACIO); rect(22, 40, 100, 46, MAD[2]); a_madera(R, 22, 40, 100, 45, MAD, { ancho: 3, k: 108 }); rect(22, 46, 25, 140, CAL[1]); rect(97, 46, 100, 140, CAL[0]);
    poligono([[4, 40], [24, 48], [24, 140], [4, 146]], (x, y) => R.tone(MAD, 2.2 + ((x - 4) % 5 === 0 ? -1.4 : 0) + Math.sin(y * 0.2 + x) * 0.3 - (24 - x) * 0.03, x, y));
    for (const y of [60, 120]) linea(5, y, 23, y + 3, hex('#2a2a2a'));
    // el suelo de tierra apisonada con paja y manchas de mosto
    for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2 + (h(x >> 2, y >> 1, 109) - 0.5) * 0.9 + (h(x, y, 110) - 0.5) * 0.5; if (h(x >> 3, y >> 2, 111) < 0.06) v -= 1.2; pset(x, y, R.tone(a_r('#4a3424', '#6a4a32', '#8a6644', '#a88258'), v, x, y)); if (h(x, y, 112) < 0.02) linea(x, y, x + 2, y - 1, hex('#d8b860')); }
    for (const [x, y] of [[120, 166], [160, 172], [232, 160], [72, 170]]) { disco(x, y, 2.5, hex('#4a1a3a')); pset(x + 3, y + 1, hex('#5a2a4a')); }
    // los capazos y las podaderas colgados, la estantería de jarras
    for (const [x, y] of [[112, 52], [128, 56]]) { linea(x, y - 6, x, y, hex('#3a2a1a')); poligono([[x - 6, y], [x + 6, y], [x + 4, y + 10], [x - 4, y + 10]], (xx, yy) => ((xx + yy) % 3 === 0 ? hex('#a8884a') : hex('#c8a860'))); rect(x - 6, y, x + 6, y, hex('#8a6a3a')); }
    for (const [x, y] of [[146, 50], [154, 50]]) { linea(x, y, x, y + 8, hex('#5a3a22')); linea(x, y + 8, x + 3, y + 12, hex('#8a8a92')); pset(x + 4, y + 11, hex('#c8c8d0')); }
    rect(104, 76, 172, 78, MAD[3]); rect(104, 78, 172, 78, MAD[0]); for (let x = 108; x < 170; x += 10) { rect(x, 66, x + 6, 76, hex('#a85a2a')); rect(x + 1, 64, x + 5, 66, hex('#c87a3a')); pset(x + 1, 68, hex('#e89a5a')); }
    // los toneles echados en su durmiente
    for (const [x, y] of [[106, 116], [138, 116]]) { disco(x + 14, y + 10, 13, (xx, yy) => R.tone(MAD, 2.4 - Math.abs(yy - y - 10) * 0.12 + ((xx - x) % 6 === 0 ? -1.2 : 0), xx, yy)); rect(x + 2, y + 3, x + 26, y + 4, hex('#3a3a3a')); rect(x + 2, y + 16, x + 26, y + 17, hex('#3a3a3a')); disco(x + 14, y + 10, 4, MAD[1]); }
    rect(104, 136, 170, 140, MAD[1]);
    // las pilas de cajas de madera llenas de uva
    const caja = (x, y, uva) => { rect(x, y, x + 23, y + 12, MAD[0]); for (let j = 0; j < 3; j++) { rect(x + 1, y + 1 + j * 4, x + 22, y + 3 + j * 4, R.tone(a_r('#8a6440', '#a87e52', '#c89a64', '#dcb47c'), 1.8 + h(x, y + j, 113) * 1.4, x, y)); rect(x + 1, y + 1 + j * 4, x + 22, y + 1 + j * 4, hex('#e8c890')); }
      rect(x + 9, y + 5, x + 13, y + 6, MAD[0]); rect(x + 1, y + 1, x + 2, y + 11, MAD[2]); rect(x + 21, y + 1, x + 22, y + 11, MAD[1]);
      if (uva) for (let i = 0; i < 20; i++) { const gx = x + 2 + (i % 10) * 2, gy = y - 1 - ((i / 10) | 0) - (Math.abs(i % 10 - 5) < 3 ? 1 : 0); rect(gx, gy, gx + 1, gy + 1, uva[(i * 7) % 3 === 0 ? 2 : (i % 2)]); } };
    for (let col = 0; col < 5; col++) { const x = 182 + col * 26, n = 6 - (col % 2) - (col === 4 ? 1 : 0); for (let j = 0; j < n; j++) caja(x, 128 - j * 13, j === n - 1 ? ((col % 3 === 1) ? A_UVAV : A_UVA) : null); }
    // la báscula de pesas: la plataforma, la columna, la cruz y el pilón
    rect(54, 152, 98, 160, hex('#2a2a2e')); rect(55, 152, 97, 153, hex('#6a6a72')); rect(56, 154, 96, 159, hex('#4a4a52')); for (let x = 58; x < 96; x += 6) pset(x, 156, hex('#8a8a92'));
    rect(92, 104, 96, 152, hex('#3a3a42')); rect(93, 104, 93, 152, hex('#6a6a72')); rect(88, 100, 100, 104, hex('#2a2a30'));
    caja(60, 140, A_UVA);
    rect(100, 166, 112, 170, hex('#3a3a42')); for (const [x, s] of [[102, 3], [108, 2]]) { rect(x - s, 166 - s * 2, x + s, 166, hex('#2a2a30')); pset(x - s + 1, 166 - s * 2, hex('#6a6a72')); }
  });
  // la vida: la cruz de la báscula oscila, el polvo en la luz, las avispas, el gato, el candil
  { const a = Math.sin(t * 1.6) * 0.06, cx = 94, cy = 98, L = 26; const x1 = cx - Math.cos(a) * 10, y1 = cy - Math.sin(a) * 10, x2 = cx + Math.cos(a) * L, y2 = cy + Math.sin(a) * L;
    linea(x1, y1, x2, y2, hex('#2a2a30')); linea(x1, y1 + 1, x2, y2 + 1, hex('#6a6a72')); disco(cx, cy, 2, hex('#c8a048'));
    const px = cx + Math.cos(a) * 16, py = cy + Math.sin(a) * 16; rect(px - 1, py - 2, px + 1, py + 1, hex('#8a8a92'));
    linea(x2, y2, x2, y2 + 10, hex('#4a4a52')); rect(x2 - 3, y2 + 10, x2 + 3, y2 + 11, hex('#2a2a30')); rect(x2 - 2, y2 + 6, x2 + 2, y2 + 9, hex('#3a3a42')); }
  for (let y = 46; y < 180; y++) { const x0 = 26 + (y - 46) * 0.7, x1 = 96 + (y - 46) * 1.4; for (let x = Math.round(x0); x < x1 && x < 320; x++) { if (y < 140 && x < 100) continue; if (R.b4(x, y) < 0.22) a_tinte(R, x, y, hex('#fff4d0'), 0.35); } }
  for (let i = 0; i < 30; i++) { const y = 60 + ((h(i, 121) * 110 + t * (2 + h(i, 122) * 3)) % 110), x = 40 + (y - 46) * 0.9 + h(i, 123) * 60 + Math.sin(t + i) * 4; if (Math.sin(t * 2 + i) > -0.2) pset(Math.round(x), Math.round(y), hex('#fff8e0')); }
  for (let i = 0; i < 6; i++) { const cx = 194 + (i % 3) * 52, cy = 50 + (i % 2) * 14, x = Math.round(cx + Math.sin(t * 7 + i * 2) * 6), y = Math.round(cy + Math.cos(t * 9 + i) * 3); pset(x, y, hex('#e8c030')); pset(x + 1, y, hex('#1a1410')); if (Math.floor(t * 20 + i) % 2) pset(x, y - 1, hex('#e0e8f0')); }
  a_gato(R, 240, 62, t, hex('#c88a3a'), hex('#e8b060'), -1, true);
  { const sw = Math.sin(t * 1.1) * 1.5; linea(160, 23, 160 + sw, 33, hex('#2a2a2a')); rect(156 + sw, 33, 164 + sw, 36, hex('#5a4a3a')); }
  return { suelo: 162, puerta: [26, 46, 96, 140], bascula: { plataforma: [54, 152, 98, 160], columna: [92, 100, 96, 152], cruz: [84, 98, 120, 98] }, cajas: [182, 50, 312, 140], toneles: [104, 104, 170, 140], libre: [100, 150, 290, 172] };
}

// delante en 'vinedo': hojas de parra grandes en las esquinas; en 'cajas', la pila de cajas de delante con uvas que se caen
function a_vinedoDelante(R, t, o, cam) {
  const { rect, pset, linea } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'cajas') {
    const MAD = a_r('#2a1a10', '#4a3020', '#6a4a30', '#8a6440', '#a87e52');
    for (let j = 0; j < 4; j++) { const x = -4 + (j % 2) * 3, y = 166 - j * 15; rect(x, y, x + 34, y + 14, MAD[0]); for (let k = 0; k < 3; k++) { rect(x + 1, y + 1 + k * 5, x + 33, y + 4 + k * 5, R.tone(a_r('#8a6440', '#a87e52', '#c89a64', '#dcb47c'), 2 + h(j, k, 125), x, y)); rect(x + 1, y + 1 + k * 5, x + 33, y + 1 + k * 5, hex('#e8c890')); } rect(x + 32, y + 1, x + 33, y + 13, MAD[1]); }
    for (let i = 0; i < 26; i++) { const gx = 1 + (i % 13) * 2.4, gy = 120 - ((i / 13) | 0) * 2 - (Math.abs(i % 13 - 6) < 4 ? 2 : 0); rect(gx, gy, gx + 1, gy + 1, A_UVA[i % 3 === 0 ? 2 : i % 2]); }
    const c = (t * 0.7) % 1; disco(36 + c * 6, 121 + c * c * 50, 1.2, A_UVA[1]);
    return { suelo: 162, pilaDelante: [0, 116, 36, 180] };
  }
  const hoja = (cx, cy, r, k) => { disco(cx, cy, r, (x, y) => { const a = Math.atan2(y - cy, x - cx), d = Math.hypot(x - cx, y - cy) / r, lob = 0.75 + 0.25 * Math.cos(a * 5 + k); if (d > lob) return null; const ner = Math.abs(((a * 5 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.06; return ner ? hex('#a8c860') : d > lob - 0.12 ? hex('#2a4a1a') : (x - cx) + (y - cy) < 0 ? hex('#5a8a2a') : hex('#3e6a22'); }); };
  const sw = Math.round(Math.sin(t * 1.4) * 1.5);
  hoja(-2 + sw, 170, 16, 1); hoja(18 + sw, 180, 12, 2); hoja(322 - sw, 166, 15, 3); hoja(302 - sw, 182, 11, 4);
  a_racimo(R, 22 + sw, 158, 3, A_UVA); a_racimo(R, 300 - sw, 156, 3, A_UVA);
  return { suelo: 160 };
}

// a_pantallaSol: lo que da la tele: el reloj de la Puerta del Sol en blanco y negro, con rayas, nieve y la barra que sube
function a_pantallaSol(R, t, r) {
  const [x0, y0, x1, y1] = r, w = x1 - x0, hh = y1 - y0, G = a_r('#141414', '#2a2a2a', '#444444', '#6a6a6a', '#929292', '#bcbcbc', '#e4e4e4');
  const cx = x0 + w * 0.5, rel = (x, y) => [(x - x0) / w, (y - y0) / hh], barra = ((t * 0.25) % 1.4) - 0.2;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const [u, v] = rel(x, y); let l = 2.2 - v * 1.2;
    if (Math.abs(u - 0.5) < 0.22 && v > 0.2) l = 3.4 + ((x + y) % 5 === 0 ? -0.6 : 0);
    if (Math.abs(u - 0.5) < 0.1 && v > 0.04 && v < 0.2) l = 3;
    const dd = Math.hypot((u - 0.5) * w, (v - 0.36) * hh); if (dd < hh * 0.14) l = dd > hh * 0.11 ? 1 : 5.6;
    if (v > 0.8) l = 1.2 + (h(x >> 1, y >> 1, Math.floor(t * 3)) < 0.5 ? 1.4 : 0);
    if ((y - y0) % 2 === 1) l -= 0.7; if (Math.abs(v - barra) < 0.05) l += 1;
    l += (h(x, y, Math.floor(t * 12)) - 0.5) * 1.6; R.pset(x, y, R.tone(G, l, x, y)); }
  const mi = Math.min(59.9, 59 + t * 0.05), am = mi / 60 * Math.PI * 2 - Math.PI / 2, ccy = y0 + hh * 0.36;
  R.linea(cx, ccy, cx + Math.cos(am) * hh * 0.1, ccy + Math.sin(am) * hh * 0.1, G[0]); R.linea(cx, ccy, cx + Math.cos(-Math.PI / 2 - 0.1) * hh * 0.07, ccy - hh * 0.07, G[0]);
}

function a_tele(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'pantalla') return a_telePantalla(R, t, o);
  // fuera: la ciudad de noche de 1962
  a_cieloNoche(R, t, 110, { luna: [264, 62, 4], nubes: [[240, 70, 30, 1, 21]], estrellas: 30 });
  a_pegar(R, 'tele62Fuera', () => {
    for (const [x0, x1, top, k] of [[244, 262, 76, 1], [262, 280, 70, 2], [280, 296, 82, 3]]) { a_estuco(R, x0, top, x1, 112, a_r('#1e1a2c', '#2a2438', '#363044'), { k: 130 + k }); for (let y = top + 4; y < 110; y += 7) for (let x = x0 + 2; x < x1 - 2; x += 5) if (h(x, y, 131) < 0.55) rect(x, y, x + 2, y + 3, h(x, y, 132) < 0.7 ? hex('#e8b060') : hex('#a8c8f0')); }
    linea(270, 70, 270, 60, hex('#2a2a3a')); linea(266, 62, 274, 62, hex('#2a2a3a')); linea(267, 65, 273, 65, hex('#2a2a3a'));
  });
  for (let i = 0; i < 6; i++) { const x = 246 + Math.floor(h(i, 133) * 46), y = 80 + Math.floor(h(i, 134) * 28); if (Math.sin(t * 0.6 + i * 3) > 0.3) rect(x, y, x + 2, y + 3, hex('#e8b060')); }
  const PP = a_r('#c8b890', '#d8caa4', '#e6dab8', '#f0e8cc'), MAD = a_r('#3a2010', '#5a3418', '#7a4a24', '#9a6234', '#b87e46');
  a_pegar(R, 'tele62', () => {
    // el papel pintado de los sesenta: rombos y estrellitas de mostaza y turquesa (apagado arriba a la derecha)
    for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const cx = ((x + ((y / 20) | 0) % 2 * 12) % 24) - 12, cy = (y % 20) - 10, rom = Math.abs(cx) + Math.abs(cy) * 1.2, cal = a_calma(x, y);
      let c = R.tone(PP, 2.2 + (h(x >> 2, y >> 2, 135) - 0.5) * 0.5 + (x % 48 === 0 ? -0.6 : 0), x, y);
      if (!cal && Math.abs(rom - 9) < 0.7) c = hex('#c8a04a'); else if (!cal && ((cx === 0 && Math.abs(cy) < 3) || (cy === 0 && Math.abs(cx) < 3))) c = hex('#4a9a94'); else if (cal && Math.abs(rom - 9) < 0.7) c = PP[1];
      pset(x, y, c); }
    rect(0, 126, 319, 132, MAD[2]); rect(0, 126, 319, 126, MAD[4]); rect(0, 132, 319, 132, MAD[0]);
    // el parqué y la alfombra trenzada
    a_madera(R, 0, 133, 319, 179, a_r('#5a3a1e', '#7a5028', '#9a6a36', '#b88448', '#cc9a5a'), { ancho: 6, k: 136, largo: 50 });
    for (let y = 146; y < 180; y++) for (let x = 96; x < 268; x++) { const d = Math.hypot((x - 182) / 86, (y - 163) / 17); if (d > 1) continue; const ring = Math.floor(d * 9), tr = ((x + y * 2) % 4 < 2);
      pset(x, y, [hex('#b8483a'), hex('#d8a040'), hex('#4a7a6a'), hex('#e8d8b8'), hex('#8a4a3a')][ring % 5] - (tr ? 0 : 0x00080808)); }
    // la ventana con visillo y cortinas
    rect(244, 50, 296, 116, hex('#f0ece0')); rect(246, 52, 294, 113, A_VACIO); rect(269, 52, 271, 113, hex('#f0ece0')); rect(246, 82, 294, 83, hex('#f0ece0')); rect(242, 114, 298, 117, hex('#e0dace')); rect(242, 117, 298, 118, hex('#a8a090'));
    for (let y = 52; y < 113; y++) for (let x = 246; x < 294; x++) if (R.pget(x, y) === A_VACIO && (x + y * 3) % 7 === 0) pset(x, y, hex('#d8d4cc'));
    for (const [x0, x1] of [[234, 246], [294, 306]]) for (let y = 46; y < 126; y++) for (let x = x0; x <= x1; x++) pset(x, y, R.tone(a_r('#8a4a14', '#b8661e', '#d8862c', '#ecaa48'), 2 + Math.sin((x - x0) * 1.1) * 1.2, x, y));
    rect(230, 45, 310, 46, hex('#3a2a1a')); disco(230, 45.5, 2, hex('#c8a048')); disco(310, 45.5, 2, hex('#c8a048'));
    // el reloj de sol en la pared (rayos dorados)
    { const cx = 194, cy = 50; for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2, l = a % 2 ? 14 : 18; linea(cx + Math.cos(an) * 8, cy + Math.sin(an) * 8, cx + Math.cos(an) * l, cy + Math.sin(an) * l, a % 2 ? hex('#a87a28') : hex('#d8a840')); disco(cx + Math.cos(an) * l, cy + Math.sin(an) * l, a % 2 ? 0.8 : 1.4, hex('#e8c050')); }
      disco(cx, cy, 8, hex('#a87a28')); disco(cx, cy, 7, hex('#f4ecd8')); for (let a = 0; a < 12; a++) pset(Math.round(cx + Math.cos(a / 12 * Math.PI * 2) * 5.5), Math.round(cy + Math.sin(a / 12 * Math.PI * 2) * 5.5), hex('#5a4a3a')); }
    // la estantería con libros, la pecera y el poto que cuelga
    rect(0, 70, 34, 72, MAD[3]); rect(0, 72, 34, 73, MAD[0]); for (let x = 2, i = 0; x < 20; i++) { const w = 2 + (i % 2), hh = 9 + (i % 3); rect(x, 70 - hh, x + w - 1, 69, [hex('#8a2a2a'), hex('#2a4a7a'), hex('#c8a040'), hex('#3a6a3a')][i % 4]); pset(x, 66 - (i % 3), hex('#f0e8d0')); x += w; }
    rect(22, 56, 33, 69, hex('#3a6a8a')); for (let y = 58; y < 70; y++) for (let x = 22; x < 34; x++) pset(x, y, y < 59 ? hex('#c8e8f0') : (x + y) % 5 === 0 ? hex('#6aa8c8') : hex('#4a8aaa')); rect(22, 68, 33, 69, hex('#c8b890')); rect(21, 56, 34, 57, hex('#e8f4f8'));
    for (let i = 0; i < 12; i++) { const x = 30 + Math.round(Math.sin(i * 0.7) * 2), y = 74 + i * 2; rect(x, y, x + 1, y + 1, i % 2 ? hex('#4a8a3a') : hex('#6aaa4a')); }
    // la mesita del teléfono
    rect(4, 112, 28, 115, MAD[3]); rect(4, 115, 28, 116, MAD[0]); linea(7, 116, 5, 132, MAD[1]); linea(25, 116, 27, 132, MAD[1]);
    rect(9, 106, 22, 111, hex('#1a1a1e')); rect(10, 104, 21, 106, hex('#2a2a30')); disco(15.5, 108.5, 2.5, hex('#3a3a42')); pset(15, 108, hex('#c8c8d0')); rect(8, 103, 23, 104, hex('#1a1a1e')); pset(10, 103, hex('#5a5a62'));
    // la tele sobre su mueble de patas, con la antena de cuernos
    linea(42, 120, 38, 134, MAD[0]); linea(43, 120, 39, 134, MAD[2]); linea(104, 120, 108, 134, MAD[0]); linea(105, 120, 109, 134, MAD[1]); pset(38, 134, hex('#c8a048')); pset(108, 134, hex('#c8a048'));
    rect(36, 98, 110, 120, MAD[0]); a_madera(R, 37, 99, 109, 119, MAD, { ancho: 4, vert: true, k: 137 }); rect(72, 100, 73, 118, MAD[0]); for (const x of [68, 77]) rect(x, 108, x + 1, 110, hex('#c8a048'));
    rect(40, 52, 106, 98, AK); a_madera(R, 41, 53, 105, 97, MAD, { ancho: 5, k: 138, base: 2.6 }); rect(41, 53, 105, 53, MAD[4]);
    rect(46, 58, 88, 94, hex('#2a2a2e')); rect(47, 59, 87, 93, hex('#4a4a52'));
    rect(91, 60, 102, 92, hex('#c8bea8')); for (let y = 62; y < 76; y += 2) rect(92, y, 101, y, hex('#a89a82')); for (const y of [80, 88]) { disco(96.5, y, 3, hex('#2a2a2e')); disco(96.5, y, 2, hex('#6a6a72')); pset(96, y - 1, hex('#c8c8d0')); }
    rect(64, 49, 82, 52, hex('#2a2a30')); rect(65, 48, 81, 49, hex('#4a4a52')); linea(70, 48, 54, 26, hex('#8a8a92')); linea(76, 48, 94, 24, hex('#8a8a92')); disco(54, 26, 1, hex('#c8c8d0')); disco(94, 24, 1, hex('#c8c8d0')); pset(62, 37, hex('#c8c8d0')); pset(85, 36, hex('#c8c8d0'));
    // la lámpara de pie de pantalla cónica
    disco(132, 133, 5, (x, y) => (y < 131 ? null : hex('#2a2a2e'))); rect(131, 66, 132, 131, hex('#3a3a42')); pset(131, 90, hex('#c8a048'));
    poligono([[124, 52], [140, 52], [146, 68], [118, 68]], (x, y) => R.tone(a_r('#c88a3a', '#e8b860', '#f8dc90', '#fff4c8'), 3 - (y - 52) * 0.08 - Math.abs(x - 132) * 0.06, x, y)); linea(118, 68, 146, 68, hex('#a8682a'));
    // el sofá turquesa con botones, cojines naranjas y patas de palo
    const SF = a_r('#1a4a4a', '#246060', '#2e7676', '#3a8a8a', '#56a4a0');
    for (let y = 100; y < 142; y++) for (let x = 150; x <= 238; x++) { let v = -1;
      if (y < 128 && x > 158 && x < 230) v = 2.4 - (y - 100) * 0.02 + ((x - 166) % 18 === 0 && y > 104 && y < 126 ? -1 : 0);
      if ((x < 162 || x > 226) && y > 112) v = 2.8 - Math.abs(x < 162 ? x - 156 : x - 232) * 0.2 + (y === 113 ? 1 : 0);
      if (y >= 126 && x >= 160 && x <= 228) v = y < 128 ? 3.8 : 2.8 - (y - 128) * 0.12 + ((x - 160) % 34 === 0 ? -1.2 : 0);
      if (v >= 0) pset(x, y, R.tone(SF, v, x, y)); }
    for (let x = 175; x < 228; x += 18) for (const y of [108, 118]) { pset(x, y, SF[0]); pset(x + 1, y + 1, SF[4]); }
    rect(150, 140, 238, 142, SF[0]); for (const x of [156, 230]) { linea(x, 142, x - 2, 150, MAD[1]); linea(x + 1, 142, x - 1, 150, MAD[3]); }
    for (const [x, y] of [[164, 112], [216, 112]]) { poligono([[x, y], [x + 12, y - 2], [x + 14, y + 12], [x + 2, y + 14]], (xx, yy) => R.tone(a_r('#a84a14', '#d06a20', '#ec8e38', '#f8b058'), 2.4 - (yy - y) * 0.1 + ((xx + yy) % 5 === 0 ? 0.6 : 0), xx, yy)); }
    // el cuadro abstracto
    rect(158, 70, 182, 90, hex('#2a2a2a')); rect(160, 72, 180, 88, hex('#f0e8d8')); rect(162, 74, 170, 82, hex('#c83a2a')); rect(172, 78, 178, 86, hex('#2a5a9a')); rect(164, 84, 168, 86, hex('#e8b830'));
  });
  // la vida: la pantalla (o lo que pase la escena), el resplandor azulado de la tele, la lámpara, la pecera, el gato
  const pr = [48, 60, 86, 92];
  R.recorte(pr); if (o.pantalla) o.pantalla(R, t, pr); else a_pantallaSol(R, t, pr); R.recorte(null);
  for (const [x, y] of [[48, 60], [86, 60], [48, 92], [86, 92]]) { pset(x, y, hex('#2a2a2e')); }
  linea(50, 62, 56, 61, hex('#e8eef0'));
  const fl = 0.3 + Math.sin(t * 13) * 0.05 + (h(Math.floor(t * 8), 1) - 0.5) * 0.1;
  a_luz(R, 67, 140, 60, hex('#a8c8f0'), fl, 0.35); a_luz(R, 132, 64, 30, hex('#fff0c0'), 0.45, 1); a_luz(R, 132, 140, 44, hex('#f8d890'), 0.25, 0.3);
  { const x = Math.round(27 + Math.sin(t * 0.9) * 4), y = 64 + Math.round(Math.sin(t * 1.7) * 1.5), d = Math.cos(t * 0.9) > 0 ? 1 : -1; rect(x - 1, y, x + 1, y + 1, hex('#f08a20')); pset(x - 2 * d, y, hex('#f8a840')); if (Math.floor(t * 2) % 3 === 0) pset(x + 2 * d, y - 2 - Math.floor(t * 4) % 3, hex('#e8f4f8')); }
  a_gato(R, 198, 126, t, hex('#5a5a62'), hex('#8a8a92'), 1);
  { const cx = 194, cy = 50, am = (Math.floor(t) % 60) / 60 * Math.PI * 2 - Math.PI / 2; linea(cx, cy, cx + Math.cos(am) * 5, cy + Math.sin(am) * 5, hex('#b83a2a')); linea(cx, cy, cx, cy - 5, hex('#2a2a2a')); linea(cx, cy, cx + 3, cy - 1, hex('#2a2a2a')); }
  return { suelo: 160, pantalla: pr, tele: [40, 24, 110, 134], sofa: [150, 100, 238, 150], lampara: [132, 52], ventana: [244, 50, 296, 116], mesita: [126, 152, 196, 172], libre: [112, 150, 244, 168], reloj: [194, 50] };
}

// 'tele62' cámara 'pantalla': la tele de cerca
function a_telePantalla(R, t, o) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const PP = a_r('#c8b890', '#d8caa4', '#e6dab8', '#f0e8cc'), MAD = a_r('#3a2010', '#5a3418', '#7a4a24', '#9a6234', '#b87e46');
  const pr = [84, 46, 204, 132];
  a_pegar(R, 'telePantalla', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = ((x + ((y / 30) | 0) % 2 * 18) % 36) - 18, cy = (y % 30) - 15, rom = Math.abs(cx) + Math.abs(cy) * 1.2, cal = a_calma(x, y);
      let c = R.tone(PP, 2 + (h(x >> 2, y >> 2, 141) - 0.5) * 0.5, x, y); if (!cal && Math.abs(rom - 14) < 0.8) c = hex('#c8a04a'); else if (!cal && ((cx === 0 && Math.abs(cy) < 4) || (cy === 0 && Math.abs(cx) < 4))) c = hex('#4a9a94'); pset(x, y, c); }
    // el mueble de abajo
    rect(40, 150, 280, 180, MAD[0]); a_madera(R, 41, 156, 279, 179, MAD, { ancho: 5, vert: true, k: 142 }); rect(36, 148, 284, 155, MAD[3]); rect(36, 148, 284, 148, MAD[4]); rect(160, 156, 161, 179, MAD[0]); for (const x of [150, 170]) rect(x, 164, x + 2, 168, hex('#c8a048'));
    // la caja de madera de la tele, con cantos redondeados
    for (let y = 28; y < 148; y++) for (let x = 64; x < 258; x++) { const ex = Math.max(0, Math.max(70 - x, x - 251)), ey = Math.max(0, Math.max(34 - y, y - 141)); if (ex * ex + ey * ey > 36) continue;
      const borde = ex * ex + ey * ey > 22; const veta = Math.sin(x * 0.05 + Math.sin(y * 0.11 + x * 0.02) * 3); pset(x, y, borde ? AK : R.tone(MAD, 2.4 + veta * 0.6 + (y < 32 ? 1.2 : 0) + (x > 250 ? -1 : 0), x, y)); }
    // el marco de la pantalla y su cristal
    for (let y = pr[1] - 6; y <= pr[3] + 6; y++) for (let x = pr[0] - 6; x <= pr[2] + 6; x++) { const ex = Math.max(0, Math.max(pr[0] + 6 - x, x - pr[2] + 6)), ey = Math.max(0, Math.max(pr[1] + 6 - y, y - pr[3] + 6)); const d = ex * ex + ey * ey; if (d > 144) continue; pset(x, y, d > 100 ? hex('#c8bea8') : d > 60 ? hex('#a89a82') : hex('#2a2a2e')); }
    // el panel de mandos: dos botones grandes y el altavoz de tela
    rect(214, 42, 248, 134, hex('#c8bea8')); rect(214, 42, 248, 42, hex('#e8e0cc'));
    for (let y = 46; y < 92; y++) for (let x = 218; x < 245; x++) pset(x, y, ((x + y) % 2 === 0) ? hex('#8a7a62') : ((x - y) % 4 === 0 ? hex('#6a5a46') : hex('#a89a82')));
    for (const y of [104, 122]) { disco(231, y, 8, hex('#2a2a2e')); disco(231, y, 7, hex('#4a4a52')); for (let a = 0; a < 12; a++) { const an = a / 12 * Math.PI * 2; pset(Math.round(231 + Math.cos(an) * 6), Math.round(y + Math.sin(an) * 6), hex('#2a2a2e')); } disco(229, y - 2, 2, hex('#8a8a92')); }
    // la antena de cuernos, el tapete con el jarrón de flores de plástico y la foto
    rect(216, 24, 240, 28, hex('#2a2a30')); rect(217, 23, 239, 24, hex('#4a4a52')); linea(222, 23, 206, 6, hex('#8a8a92')); linea(234, 23, 254, 4, hex('#8a8a92')); disco(206, 6, 1, hex('#c8c8d0')); disco(254, 4, 1, hex('#c8c8d0'));
    for (let x = 174; x < 214; x++) for (let y = 24; y < 29; y++) if ((x + y) % 2 === 0 || y === 28) if (!(y === 28 && x % 3 === 0)) pset(x, y, hex('#f8f4ec'));
    rect(180, 12, 188, 27, hex('#2a6a8a')); rect(181, 13, 182, 26, hex('#6aaac8')); for (const [x, y, c] of [[178, 7, '#e84a6a'], [185, 4, '#f0c040'], [191, 8, '#e84a6a'], [183, 9, '#f8f0f0']]) { disco(x, y, 2, hex(c)); linea(x, y + 2, 184, 12, hex('#3a7a3a')); }
    rect(194, 15, 208, 27, hex('#c8a048')); rect(195, 16, 207, 26, hex('#d8d0c0')); for (const [x, c] of [[198, '#3a3a40'], [202, '#5a5a62'], [205, '#3a3a40']]) { rect(x - 1, 21, x + 1, 26, hex(c)); disco(x, 19, 1.5, hex('#8a8a8a')); }
    // a un lado la lámpara, al otro el ficus
    poligono([[6, 58], [34, 58], [40, 82], [0, 82]], (x, y) => R.tone(a_r('#c88a3a', '#e8b860', '#f8dc90', '#fff4c8'), 3 - (y - 58) * 0.08, x, y)); rect(19, 82, 21, 148, hex('#3a3a42'));
    for (let i = 0; i < 14; i++) { const x = 274 + Math.round(h(i, 143) * 36), y = 70 + Math.round(h(i, 144) * 70); poligono([[x, y], [x + 5, y - 6], [x + 9, y + 1], [x + 3, y + 6]], (xx, yy) => (xx + yy < x + y + 4 ? hex('#3a7a3a') : hex('#24562a'))); }
    rect(286, 140, 304, 148, hex('#a8582a')); linea(294, 140, 292, 80, hex('#4a3a22'));
  });
  R.recorte(pr); if (o.pantalla) o.pantalla(R, t, pr); else a_pantallaSol(R, t, pr); R.recorte(null);
  // el cristal curvo: esquinas en sombra y el reflejo de la ventana
  for (let y = pr[1]; y <= pr[3]; y++) for (let x = pr[0]; x <= pr[2]; x++) { const ex = Math.max(0, Math.max(pr[0] + 8 - x, x - pr[2] + 8)), ey = Math.max(0, Math.max(pr[1] + 8 - y, y - pr[3] + 8)); const d = ex * ex + ey * ey; if (d > 64) pset(x, y, hex('#2a2a2e')); else if (d > 30) a_tinte(R, x, y, hex('#000000'), 0.5); }
  for (let i = 0; i < 26; i++) { pset(pr[0] + 10 + i, pr[1] + 6 + Math.round(i * 0.15), hex('#e8eef0')); if (i < 14) pset(pr[0] + 12 + i, pr[1] + 9 + Math.round(i * 0.15), hex('#a8b0b8')); }
  a_luz(R, 144, 160, 80, hex('#a8c8f0'), 0.25 + Math.sin(t * 11) * 0.03, 0.3);
  a_luz(R, 20, 70, 26, hex('#fff0c0'), 0.4, 1);
  return { pantalla: pr, mandos: [[231, 104], [231, 122]], antena: [228, 24], inserto: true, mano: [244, 118] };
}

// delante en 'tele62': la mesita baja de nogal con el plato de las doce uvas, dos copas y el turrón
function a_teleDelante(R, t, o, cam) {
  if (cam === 'pantalla') return null;
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const MAD = a_r('#3a2010', '#5a3418', '#7a4a24', '#9a6234', '#b87e46');
  for (const [x0, x1] of [[134, 130], [188, 192]]) { linea(x0, 158, x1, 176, MAD[0]); linea(x0 + 1, 158, x1 + 1, 176, MAD[2]); pset(x1, 176, hex('#c8a048')); }
  poligono([[128, 152], [196, 152], [200, 158], [124, 158]], (x, y) => R.tone(MAD, 3.4 - (y - 152) * 0.3 + Math.sin(x * 0.2) * 0.3, x, y)); rect(124, 158, 200, 159, MAD[0]);
  disco(150, 149, 9, (x, y) => (y > 152 ? null : hex('#f4f0e8'))); R.rect(141, 151, 159, 152, hex('#2a5a9a')); for (let i = 0; i < 12; i++) { const gx = 144 + (i % 6) * 2.4, gy = 147 - ((i / 6) | 0) * 2; R.rect(gx, gy, gx + 1, gy + 1, A_UVAV[i % 3 === 0 ? 2 : 1]); pset(gx, gy + 1, A_UVAV[0]); }
  for (const x of [168, 176]) { rect(x - 2, 141, x + 2, 145, hex('#f0d070')); rect(x - 2, 141, x + 2, 141, hex('#ffffff')); rect(x, 146, x, 149, hex('#c8d8e8')); rect(x - 2, 150, x + 2, 150, hex('#c8d8e8')); }
  rect(184, 146, 194, 151, hex('#d8b878')); rect(184, 146, 194, 146, hex('#f0dca8')); for (let x = 185; x < 194; x += 2) pset(x, 148, hex('#a87a3a'));
  return { suelo: 160, mesita: [124, 141, 200, 176] };
}

// a_mesCal: la hoja del calendario de pared: número del mes arriba y la cuadrícula de días (o.pasa levanta la hoja)
function a_mesCal(R, x0, y0, mes, pasa, t) {
  const { rect, pset } = R, w = 40, hh = 48;
  const hoja = (m, yy, alto) => { if (alto < 2) return; rect(x0, yy, x0 + w, yy + alto, hex('#e8dcb8')); rect(x0, yy, x0 + w, yy, hex('#f8f0d8')); rect(x0 + w, yy, x0 + w, yy + alto, hex('#b8a880'));
    if (alto < hh - 2) return; rect(x0 + 2, yy + 3, x0 + w - 2, yy + 15, hex('#8a2a24')); R.numero(String(m), x0 + w / 2, yy + 13, { centro: true, color: hex('#f8f0d8'), sombra: false });
    for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) { const d = j * 7 + i + 1 - ((m * 3) % 7); const cx = x0 + 3 + i * 5, cy = yy + 19 + j * 6; if (d < 1 || d > 31) continue; pset(cx, cy, hex('#5a4a3a')); pset(cx + 1, cy, hex('#5a4a3a')); if (i === 0) { pset(cx, cy, hex('#a83a2a')); pset(cx + 1, cy, hex('#a83a2a')); } if (d === 25 && m === 3) { R.rect(cx - 1, cy - 1, cx + 2, cy + 1, hex('#c8302a')); } } };
  rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh + 2, hex('#3a2a1a'));
  const sig = mes % 12 + 1; hoja(pasa > 0 ? sig : mes, y0, hh);
  if (pasa > 0 && pasa < 1) { const alto = Math.round(hh * (1 - pasa * 2)); if (alto > 0) hoja(mes, y0, alto); else { const a = Math.round(-alto * 0.6); rect(x0, y0 - a, x0 + w, y0, hex('#d8c8a0')); rect(x0, y0 - a, x0 + w, y0 - a, hex('#f8f0d8')); } }
  rect(x0 + w / 2 - 1, y0 - 4, x0 + w / 2 + 1, y0 - 2, hex('#6a6a72'));
}

function a_despacho(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'libro') return a_despachoLibro(R, t, o);
  // fuera: Londres en marzo, nublado, con llovizna, casas de ladrillo y gente con tricornio
  a_fondo(R, 'londres', () => {
    a_degradado(R, 0, 0, 319, 179, a_r('#6a7484', '#7a8494', '#8a94a2', '#9aa2ae', '#aab0b8', '#b8bcc0'), { k: 151 });
    a_ladrillos(R, 0, 50, 319, 120, a_r('#4a2a22', '#6a3a2c', '#844836', '#9a5a44'), hex('#3a2a26'), { w: 5, h: 3, k: 152 });
    for (let x = 4; x < 320; x += 16) { rect(x, 58, x + 7, 72, hex('#e8e4dc')); rect(x + 1, 59, x + 6, 71, hex('#2a2e3a')); rect(x + 1, 65, x + 6, 65, hex('#e8e4dc')); rect(x + 3, 59, x + 4, 71, hex('#e8e4dc')); if (h(x, 1, 153) < 0.3) rect(x + 1, 66, x + 2, 70, hex('#e8a850')); }
    for (let x = 0; x < 320; x += 24) { rect(x, 82, x + 9, 102, hex('#2a3a2a')); rect(x + 1, 83, x + 8, 102, hex('#1e2e22')); disco(x + 4.5, 80, 5, (xx, yy) => (yy < 82 ? hex('#e8e4dc') : null)); }
    rect(0, 44, 319, 50, hex('#3a3236')); for (let x = 10; x < 320; x += 30) { rect(x, 34, x + 6, 44, hex('#5a3a2e')); rect(x + 1, 32, x + 2, 34, hex('#8a5a3a')); rect(x + 4, 32, x + 5, 34, hex('#8a5a3a')); }
    rect(0, 102, 319, 106, hex('#6a6a6a')); for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, R.tone(a_r('#3a3a40', '#4a4a52', '#5a5a62', '#6a6a72'), 1.6 + (h(x >> 2, y >> 1, 154) - 0.5) + ((y - 106) % 5 === 0 ? -0.8 : 0), x, y));
    for (let x = 0; x < 320; x += 3) rect(x, 98, x, 104, hex('#1a1a1e')); rect(0, 98, 319, 98, hex('#1a1a1e'));
  });
  a_nubes(R, t, [[20, 16, 40, 1.4, 31], [90, 26, 50, 2.2, 32], [60, 8, 30, 0.8, 33]], a_r('#c8ccd2', '#a8aeb8', '#8a909c'));
  a_humo(R, t, 34, 32, hex('#8a8a92'), { alto: 26, viento: 0.8, k: 7 }); a_humo(R, t, 64, 32, hex('#8a8a92'), { alto: 24, viento: 0.8, k: 8 });
  for (let i = 0; i < 3; i++) { const dir = i % 2 ? -1 : 1, x = Math.round(dir > 0 ? ((t * (6 + i * 3) + i * 40) % 110) - 10 : 100 - ((t * (5 + i * 2) + i * 30) % 110)); a_persona(R, x, 116 + i * 4, t, [[hex('#5a2a2a'), hex('#2a3a5a'), hex('#3a3a3a')][i], hex('#1a1a1a'), A_PIEL[0], hex('#e8e4dc')], { al: 13 + i, anda: true, dir, gorro: i === 1 ? 'velo' : 'tricornio', falda: i === 1, k: i }); }
  { const x = Math.round(((t * 9) % 160) - 40); disco(x + 4, 122, 4, hex('#1a1414')); disco(x + 22, 122, 4, hex('#1a1414')); rect(x, 104, x + 26, 118, hex('#2a1a1a')); rect(x + 2, 106, x + 10, 112, hex('#4a5a6a')); rect(x + 28, 108, x + 40, 114, hex('#4a3a2a')); rect(x + 38, 102, x + 41, 109, hex('#4a3a2a')); const p = Math.floor(t * 5) % 2; rect(x + 30 + p, 114, x + 30 + p, 122, hex('#2a2018')); rect(x + 38 - p, 114, x + 38 - p, 122, hex('#2a2018')); }
  for (let i = 0; i < 40; i++) { const x = Math.floor((h(i, 155) * 100 + t * 20) % 100) + 20, y = Math.floor((h(i, 156) * 90 + t * 70) % 90) + 28; pset(x, y, hex('#c8d0d8')); pset(x - 1, y - 2, hex('#9aa4b0')); }
  const RO = a_r('#2a1608', '#3e2210', '#552f18', '#6c3e20', '#86522c', '#a06a3a');
  a_pegar(R, 'despacho', () => {
    // los paneles de roble: largueros, peinazos y cuarterones con su luz
    a_madera(R, 0, 0, 319, 130, RO, { ancho: 9, vert: true, k: 157, base: 2.4 });
    rect(0, 0, 319, 9, hex('#c8bca0')); rect(0, 9, 319, 12, RO[4]); rect(0, 12, 319, 13, RO[0]); for (let x = 0; x < 320; x += 5) { rect(x, 6, x + 2, 8, hex('#a89c80')); }
    for (let x = 4; x < 320; x += 34) for (const [y0, y1] of [[18, 64], [72, 120]]) { if (a_calma(x + 20, y0)) { rect(x, y0, x + 28, y1, RO[1]); rect(x + 1, y0 + 1, x + 27, y1 - 1, RO[2]); continue; }
      rect(x, y0, x + 28, y1, RO[0]); rect(x + 1, y0 + 1, x + 28, y0 + 1, RO[5]); rect(x + 1, y0 + 1, x + 1, y1, RO[4]); rect(x + 3, y0 + 3, x + 25, y1 - 3, RO[1]);
      for (let y = y0 + 4; y < y1 - 3; y++) for (let xx = x + 4; xx < x + 25; xx++) pset(xx, y, R.tone(RO, 2.6 + Math.sin(xx * 0.4 + Math.sin(y * 0.15) * 2) * 0.6 + (xx < x + 6 ? 0.8 : 0) + (y < y0 + 6 ? 0.8 : 0), xx, y)); }
    rect(0, 66, 319, 69, RO[4]); rect(0, 69, 319, 70, RO[0]); rect(0, 124, 319, 130, RO[1]); rect(0, 124, 319, 124, RO[4]);
    // la ventana emplomada: el derrame de piedra, el parteluz, los rombos de plomo (huecos) y el poyo con su cojín
    rect(18, 24, 96, 112, hex('#8a8478')); rect(20, 26, 94, 110, hex('#a8a294')); rect(22, 28, 92, 108, A_VACIO);
    for (let y = 28; y <= 108; y++) for (let x = 22; x <= 92; x++) { const a = ((x - 22) + (y - 28) * 0.7) % 8, b = ((x - 22) - (y - 28) * 0.7 + 800) % 8; if (a < 1 || b < 1) pset(x, y, hex('#2a2a2e')); else if (h(x >> 2, y >> 2, 158) < 0.05) pset(x, y, hex('#c8d8d0')); }
    rect(56, 28, 58, 108, hex('#4a4440')); rect(22, 66, 92, 68, hex('#4a4440')); rect(22, 28, 92, 28, hex('#4a4440'));
    rect(14, 110, 100, 116, hex('#9a9282')); rect(14, 110, 100, 110, hex('#c8c0b0')); rect(18, 104, 96, 110, hex('#6a2a3a')); rect(18, 104, 96, 104, hex('#9a4a5a'));
    // el calendario de pared con su clavo (el mes se pinta en cada fotograma)
    // el mapa enmarcado de Londres (el río y las calles insinuados)
    rect(156, 26, 208, 64, hex('#c8a048')); rect(158, 28, 206, 62, hex('#7a5a28')); rect(160, 30, 204, 60, hex('#e8dcb8'));
    for (let x = 160; x < 205; x++) { const y = Math.round(46 + Math.sin(x * 0.12) * 6); rect(x, y, x, y + 2, hex('#7aa0b8')); }
    for (let i = 0; i < 18; i++) { const x = 162 + Math.floor(h(i, 159) * 40), y = 32 + Math.floor(h(i, 160) * 26); linea(x, y, x + 4 + (i % 3), y + (i % 2 ? 2 : -1), hex('#8a6a4a')); } for (let i = 0; i < 8; i++) rect(164 + i * 5, 34 + (i % 3) * 7, 165 + i * 5, 35 + (i % 3) * 7, hex('#a84a3a'));
    // los casilleros con legajos atados con cinta roja, rollos y libros
    rect(212, 48, 286, 132, RO[0]); rect(214, 50, 284, 130, RO[1]);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const x = 216 + i * 17, y = 52 + j * 19; rect(x, y, x + 15, y + 17, RO[0]); rect(x + 1, y + 17, x + 15, y + 17, RO[3]);
      const k = h(i, j, 161); if (k < 0.4) { for (let r = 0; r < 3; r++) { disco(x + 4 + r * 4, y + 13, 2.5, hex('#e8dcb8')); pset(x + 4 + r * 4, y + 13, hex('#a89a78')); } rect(x + 2, y + 12, x + 13, y + 12, hex('#b02a2a')); }
      else if (k < 0.75) { for (let b = 0; b < 4; b++) { rect(x + 1, y + 14 - b * 3, x + 14, y + 16 - b * 3, b % 2 ? hex('#e0d4b0') : hex('#d0c4a0')); } rect(x + 7, y + 5, x + 8, y + 16, hex('#b02a2a')); }
      else for (let b = 0; b < 5; b++) { const c = [hex('#5a2a1a'), hex('#2a3a2a'), hex('#6a4a2a'), hex('#3a2a3a'), hex('#7a3a2a')][b]; rect(x + 1 + b * 3, y + 4 + (b % 2), x + 3 + b * 3, y + 16, c); pset(x + 2 + b * 3, y + 7, hex('#c8a048')); pset(x + 2 + b * 3, y + 13, hex('#c8a048')); } }
    rect(210, 46, 288, 49, RO[4]); rect(210, 130, 288, 133, RO[3]);
    // el reloj de caja alta, con su esfera y la ventanilla del péndulo
    rect(292, 54, 316, 150, RO[0]); a_madera(R, 293, 72, 315, 150, RO, { ancho: 22, k: 162, base: 3 }); rect(290, 52, 318, 72, RO[1]); rect(291, 53, 317, 71, RO[3]); poligono([[290, 52], [304, 46], [318, 52]], RO[2]);
    disco(304, 62, 7.5, hex('#c8a048')); disco(304, 62, 6.5, hex('#f0e8d0')); for (let a = 0; a < 12; a++) pset(Math.round(304 + Math.cos(a / 12 * 6.283) * 5), Math.round(62 + Math.sin(a / 12 * 6.283) * 5), hex('#3a2a1a'));
    rect(298, 86, 310, 122, hex('#1a100a')); rect(297, 85, 311, 85, hex('#c8a048'));
    // la silla de respaldo alto detrás del escritorio
    rect(158, 106, 190, 146, RO[0]); rect(160, 108, 188, 136, hex('#6a1a1a')); for (let y = 110; y < 136; y += 6) for (let x = 162; x < 188; x += 6) pset(x, y, hex('#c8a048')); poligono([[156, 106], [174, 98], [192, 106]], RO[2]); rect(158, 104, 190, 106, RO[3]);
    // el arcón de hierro con la bolsa de monedas
    rect(24, 128, 70, 150, RO[1]); rect(24, 128, 70, 132, RO[3]); for (const x of [28, 46, 64]) rect(x, 128, x + 2, 150, hex('#3a3a40')); rect(44, 138, 48, 143, hex('#c8a048'));
    poligono([[32, 128], [38, 116], [44, 116], [50, 128]], (x, y) => R.tone(a_r('#6a4a2a', '#8a6a3a', '#a8884a'), 2 - (x - 32) * 0.08, x, y)); rect(38, 116, 44, 117, hex('#3a2a1a'));
    for (let i = 0; i < 4; i++) { R.rect(52 + i * 3, 126 - (i % 2), 54 + i * 3, 127 - (i % 2), hex('#e8c048')); pset(52 + i * 3, 126 - (i % 2), hex('#fff0a0')); }
    // el suelo de tablas anchas con clavos y la alfombra turca
    a_madera(R, 0, 131, 319, 179, a_r('#2a180c', '#3e2614', '#56361e', '#6e4828', '#865a34'), { ancho: 10, k: 163, largo: 90 });
    for (let y = 150; y < 180; y++) for (let x = 100; x < 250; x++) { const fx = Math.min(x - 100, 249 - x), fy = Math.min(y - 150, 179 - y); const c = fx < 3 || fy < 2 ? hex('#c8a048') : fx < 8 || fy < 5 ? ((x + y) % 4 < 2 ? hex('#2a3a6a') : hex('#8a2a2a')) : (((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#d8b860') : (Math.abs(x - 175) + Math.abs(y - 165) * 3) % 20 < 3 ? hex('#2a3a6a') : hex('#8a2a2a')); pset(x, y, c); }
    for (let i = 0; i < 6; i++) disco(176 + i * 8, 116 + (i % 2) * 2, 1.5, hex('#c8c0a0'));
  });
  // el calendario con su mes, la luz de la ventana, el péndulo, el ratón y las motas
  a_mesCal(R, 108, 26, o.mes ?? 3, o.pasa ?? 0, t);
  for (let y = 108; y < 180; y++) { const x0 = 22 + (y - 108) * 0.9, x1 = 92 + (y - 108) * 1.6; for (let x = Math.round(x0); x < x1 && x < 320; x += 1) if (R.b4(x, y) < 0.2) a_tinte(R, x, y, hex('#d8e0e8'), 0.3); }
  for (let i = 0; i < 16; i++) { const y = 110 + ((h(i, 171) * 60 + t * 3) % 60), x = 30 + (y - 108) * 1.1 + h(i, 172) * 50 + Math.sin(t + i) * 3; if (Math.sin(t * 2 + i) > -0.1) pset(Math.round(x), Math.round(y), hex('#e8eef0')); }
  { const a = Math.sin(t * Math.PI) * 0.3; R.recorte([298, 86, 310, 122]); linea(304, 86, 304 + Math.sin(a) * 26, 86 + Math.cos(a) * 26, hex('#a88a3a')); disco(304 + Math.sin(a) * 28, 86 + Math.cos(a) * 28, 3, hex('#e8c048')); R.recorte(null);
    const am = 3 / 12 * Math.PI * 2 - Math.PI / 2; linea(304, 62, 304, 57, hex('#1a1a1a')); linea(304, 62, 304 + Math.cos(am) * 3, 62 + Math.sin(am) * 3, hex('#1a1a1a')); }
  { const s = Math.sin(t * 0.8), x = 230 + Math.round(Math.max(0, s) * 10), y = 108; if (s > -0.3) { rect(x, y - 2, x + 3, y, hex('#7a7068')); pset(x + 4, y - 1, hex('#7a7068')); pset(x + 3, y - 3, hex('#c8a0a0')); pset(x + 4, y - 2, AK); linea(x, y, x - 4, y - 1 + Math.round(Math.sin(t * 5)), hex('#b89a90')); } }
  return { suelo: 164, detrasEscritorio: 145, escritorio: [114, 124, 228, 168], ventana: [22, 28, 92, 108], calendario: [108, 26, 148, 74], mapa: [156, 26, 208, 64], casilleros: [212, 48, 288, 132], reloj: [292, 46, 316, 150], arcon: [24, 116, 70, 150], silla: [158, 98, 190, 146], libre: [[20, 112], [230, 290]] };
}

// 'despacho' cámara 'libro': el libro de cuentas abierto sobre el escritorio
function a_despachoLibro(R, t, o) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const mes = o.mes ?? 3, pasa = Math.max(0, Math.min(1, o.pasa ?? 0));
  a_pegar(R, 'libro', () => {
    a_madera(R, 0, 0, 319, 179, a_r('#2a160a', '#3e2210', '#552f18', '#6c3e20', '#86522c'), { ancho: 14, k: 181, largo: 0, base: 2.2 });
    rect(28, 30, 292, 172, hex('#1e3a2a')); for (let y = 31; y < 172; y++) for (let x = 29; x < 292; x++) pset(x, y, R.tone(a_r('#183022', '#1e3a2a', '#26482e'), 1.2 + (h(x >> 2, y >> 2, 182) - 0.5) * 0.6, x, y)); rect(28, 30, 292, 31, hex('#8a6a3a'));
    rect(44, 40, 276, 160, hex('#4a2410')); rect(46, 42, 274, 158, hex('#6a3418'));
    for (const [x0, x1, izq] of [[50, 158, true], [162, 270, false]]) { for (let y = 44; y < 156; y++) for (let x = x0; x <= x1; x++) { const dc = izq ? x1 - x : x - x0, cur = dc < 8 ? (8 - dc) * 0.25 : 0, b = y < 47 || y > 152 ? 0.6 : 0; pset(x, y, R.tone(a_r('#b8a678', '#d0c094', '#e4d8b4', '#f2ead0'), 3 - cur - b + (h(x >> 3, y >> 3, 183) - 0.5) * 0.3, x, y)); }
      for (let y = 62; y < 150; y += 6) for (let x = x0 + 3; x < x1 - 3; x++) pset(x, y, hex('#a8b8c8'));
      for (const cx of [x0 + 18, x1 - 30, x1 - 14]) linea(cx, 58, cx, 150, hex('#c86a5a')); linea(x0 + 3, 58, x1 - 3, 58, hex('#c86a5a')); linea(x0 + 3, 59, x1 - 3, 59, hex('#c86a5a'));
      for (let r = 0; r < 14; r++) { const y = 63 + r * 6; if (h(r, x0, 184) < 0.15) continue; a_cifra(R, x0 + 5, y, String(1 + r * 2 + (x0 > 100 ? 1 : 0)), hex('#3a2a4a'));
        let px = x0 + 21; const ln = 30 + Math.floor(h(r, x0, 185) * (x1 - x0 - 70)); for (let i = 0; i < ln; i++) { pset(px + i, y + 3 + Math.round(Math.sin(i * 1.3 + r) * 1.2), hex('#4a3a5a')); }
        const v = Math.floor(h(r, x0, 186) * 90) + 3; a_cifra(R, x1 - 28, y, String(v), hex('#3a2a4a')); a_cifra(R, x1 - 12, y, String(Math.floor(h(r, x0, 187) * 9)), hex('#3a2a4a')); }
      rect(x0 + 3, 150, x1 - 3, 150, hex('#3a2a4a')); a_cifra(R, x1 - 28, 152, String(140 + (x0 > 100 ? 47 : 12)), hex('#8a2a24')); }
    rect(158, 42, 162, 158, hex('#7a6a4a')); rect(160, 42, 160, 158, hex('#4a3a2a'));
    // la vela, el tintero de peltre con la pluma, las monedas, los anteojos, el lacre y el sello
    rect(18, 50, 30, 54, hex('#a87a30')); disco(24, 54, 7, (x, y) => (y < 54 ? null : hex('#c8a048'))); rect(21, 30, 27, 50, hex('#f0e8d0')); rect(26, 30, 27, 50, hex('#d8ccb0')); pset(24, 29, hex('#2a2a2a'));
    disco(286, 74, 9, hex('#5a5e66')); disco(286, 73, 7, hex('#8a8e98')); disco(286, 72, 3, hex('#1a1a20')); pset(284, 69, hex('#c8ccd4'));
    for (let i = 0; i < 6; i++) { a_disco(R, 30 + (i % 3) * 3, 160 - Math.floor(i / 3) * 2 - (i % 3), 5, (x, y) => ((x + y) % 4 === 0 ? hex('#fff0a0') : hex('#d8a838'))); R.linea(26 + (i % 3) * 3, 162 - Math.floor(i / 3) * 2, 34 + (i % 3) * 3, 162 - Math.floor(i / 3) * 2, hex('#8a6418')); }
    for (const cx of [282, 300]) { R.anillo(cx, 160, 6, hex('#3a3a3a')); disco(cx, 160, 5, (x, y) => (x + y < cx + 160 - 2 ? hex('#c8d8e0') : null)); } linea(288, 160, 294, 160, hex('#3a3a3a'));
    rect(252, 160, 272, 163, hex('#a82a2a')); rect(252, 160, 272, 160, hex('#e85a5a')); disco(244, 166, 4, hex('#4a3020')); rect(243, 156, 245, 163, hex('#6a4a2a'));
  });
  // la cabecera del mes (número grande) y el año; la hoja que pasa
  R.numero(String(mes), 104, 55, { centro: true, color: hex('#5a1e1a'), sombra: false });
  a_cifra(R, 206, 49, '1752', hex('#5a1e1a'), 2);
  if (pasa > 0 && pasa < 1) { const xe = 270 - pasa * 220, al = Math.sin(pasa * Math.PI) * 14;
    poligono([[160, 44], [xe, 44 - al], [xe, 156 - al * 0.4], [160, 156]], (x, y) => R.tone(a_r('#c8b88c', '#e4d8b4', '#f6eedc'), 1 + Math.abs(x - 160) / Math.abs(xe - 160 + 0.01) * 1.6, x, y)); linea(xe, 44 - al, xe, 156 - al * 0.4, hex('#a89870')); }
  // la llama de la vela y su luz sobre las hojas, la pluma que tiembla en el tintero
  a_llama(R, 24, 29, 8, t, 3); a_luz(R, 24, 30, 90, hex('#ffc070'), 0.32, 0.8);
  { const sw = Math.sin(t * 1.3) * 1.2; linea(286, 72, 262 + sw, 34, hex('#e8e0d0')); for (let i = 0; i < 14; i++) { const x = 286 - i * 1.7 + sw * i / 14, y = 72 - i * 2.7; pset(Math.round(x - 2), Math.round(y - 1), hex('#f8f4ec')); pset(Math.round(x + 1), Math.round(y - 2), hex('#c8c0b0')); } }
  return { inserto: true, libro: [44, 40, 276, 160], paginaIzq: [50, 44, 158, 156], paginaDer: [162, 44, 270, 156], mes: [104, 55], tintero: [286, 72], vela: [24, 29], mano: [210, 120] };
}

// delante en 'despacho': el escritorio de caoba con cajones y lo que hay encima
function a_despachoDelante(R, t, o, cam) {
  if (cam === 'libro') return null;
  R = a_movido(R, 0, 8);   // el escritorio bajo: detrás asoman cabeza y hombros
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const RO = a_r('#2a1206', '#40200e', '#583018', '#704024', '#8c5432', '#a86a40');
  rect(116, 132, 226, 160, RO[0]); a_madera(R, 117, 138, 225, 159, RO, { ancho: 22, k: 191, base: 2.6 });
  rect(114, 130, 228, 137, RO[4]); rect(114, 130, 228, 130, RO[5]); rect(114, 137, 228, 137, RO[0]);
  for (const x of [122, 172]) { rect(x, 142, x + 46, 154, RO[1]); rect(x + 1, 143, x + 45, 153, RO[3]); rect(x + 21, 147, x + 25, 148, hex('#c8a048')); pset(x + 21, 147, hex('#fff0a0')); }
  // libros apilados, el libro abierto, el tintero con la pluma, la vela con su llama y las monedas
  for (let i = 0; i < 3; i++) { rect(120, 124 - i * 4, 140, 127 - i * 4, [hex('#5a1e1a'), hex('#2a3a5a'), hex('#4a3a1a')][i]); rect(120, 124 - i * 4, 121, 127 - i * 4, hex('#c8a048')); rect(122, 125 - i * 4, 139, 125 - i * 4, hex('#e8dcb8')); }
  poligono([[150, 129], [168, 126], [186, 129], [168, 131]], hex('#efe4c4')); linea(168, 126, 168, 131, hex('#a89870')); for (let i = 0; i < 4; i++) { linea(153 + i, 128 - i * 0.4, 165, 127 - i * 0.6, hex('#8a7a6a')); }
  rect(208, 124, 214, 129, hex('#3a3a40')); rect(209, 123, 213, 123, hex('#6a6a72')); linea(212, 123, 220, 108, hex('#f0e8d8')); for (let i = 0; i < 8; i++) { pset(213 + i, 121 - i * 2, hex('#d8d0c0')); pset(215 + i, 121 - i * 2, hex('#f8f4ec')); }
  rect(194, 127, 202, 129, hex('#a87a30')); rect(196, 116, 199, 126, hex('#f0e8d0')); a_llama(R, 197, 115, 6, t, 7); a_luz(R, 197, 118, 30, hex('#ffc070'), 0.3, 0.8);
  for (let i = 0; i < 3; i++) { rect(142 + i * 3, 128 - i, 145 + i * 3, 129 - i, hex('#e8c048')); pset(142 + i * 3, 128 - i, hex('#fff0a0')); }
  return { suelo: 164, detrasEscritorio: 145, escritorio: [114, 138, 228, 168], libroAbierto: [150, 134, 186, 139], tintero: [211, 132], vela: [197, 123] };
}

const A_ALBA = a_r('#1e1e52', '#2a2660', '#3a2e6c', '#523874', '#6e4278', '#8e4c78', '#b05a72', '#d06e6a', '#e88a64', '#f4aa6a', '#fac87e');

function a_babilonia(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'altar') return a_babiloniaAltar(R, t, o);
  a_fondo(R, 'alba', () => { a_degradado(R, 0, 0, 319, 179, A_ALBA, { k: 201, onda: 0.35 }); R.halo(300, 104, 60, a_r('#f0a070', '#f8c080', '#fce0a0'), 1); a_disco(R, 300, 106, 9, (x, y) => (y > 96 ? null : hex('#fff4c8'))); });
  { const b = Math.sin(t * 1.5) > 0 ? hex('#fff8e0') : hex('#e8d8c8'); pset(108, 26, b); pset(107, 26, hex('#c8b8d8')); pset(109, 26, hex('#c8b8d8')); }
  a_estrellas(R, t, 12, 18, 40, 3);
  a_nubes(R, t, [[10, 40, 60, 0.9, 41], [150, 22, 40, 0.5, 42], [230, 60, 70, 1.5, 43], [90, 70, 46, 1.9, 44]], a_r('#fcc890', '#d8807a', '#8a4a74'));
  a_pajaros(R, t, 5, 30, 10, hex('#2a1a3a'), 2);
  const AZ = a_r('#0e2a6a', '#163a84', '#1e4a9c', '#2a5eb4', '#3a74c8'), AD = a_r('#6a4428', '#8a5c36', '#aa7848', '#c8965e', '#dcb27a');
  a_pegar(R, 'babilonia', () => {
    // el horizonte: palmerales y casas de adobe de azotea, el río que brilla
    for (let x = 0; x < 320; x++) { const top = Math.round(92 + (h(x >> 3, 1, 202) - 0.5) * 4); for (let y = top; y < 112; y++) pset(x, y, R.tone(a_r('#4a3050', '#5a3a58', '#6e4a5e', '#8a5a62'), 1.6 + (y - top) * 0.06, x, y)); }
    for (let i = 0; i < 12; i++) { const x = 150 + i * 15 + Math.round(h(i, 203) * 6), top = 96 + Math.round(h(i, 204) * 6); rect(x, top, x + 10, 112, hex('#a87858')); rect(x, top, x + 10, top, hex('#d8a878')); rect(x + 8, top + 1, x + 10, 112, hex('#7a5440')); rect(x + 3, top + 5, x + 4, top + 7, hex('#3a2430')); }
    for (const [x, s] of [[156, 0.7], [178, 0.6], [292, 0.8], [312, 0.6], [236, 0.5]]) { const top = Math.round(94 - 18 * s); linea(x, 100, x + 1, top, hex('#3a2430')); for (const a of [-2.8, -2.2, -1.6, -1.0, -0.4]) for (let r = 0; r < 9 * s; r++) pset(Math.round(x + Math.cos(a) * r), Math.round(top + Math.sin(a) * r + (r / 9 / s) ** 2 * 4), hex('#2a3a2a')); }
    rect(140, 112, 319, 114, hex('#f0b088')); for (let x = 140; x < 320; x += 3) pset(x, 113, hex('#fce0b0'));
    // el zigurat: siete pisos de adobe con la escalinata y el santuario azul arriba (luz del alba por la izquierda)
    const zx = 220; for (let p = 0; p < 7; p++) { const y1 = 112 - p * 10, y0 = y1 - 10, w = 62 - p * 8;
      for (let y = y0; y < y1; y++) for (let x = zx - w; x <= zx + w; x++) { const lado = x < zx ? -0.9 : 0.4, fila = (y - y0) % 3 === 0; pset(x, y, R.tone(AD, 2.4 + lado + (fila ? -0.7 : 0) + (h(x >> 1, y, 205) - 0.5) * 0.6 + (y === y0 ? 1.2 : 0), x, y)); }
      for (let x = zx - w + 3; x < zx + w - 2; x += 6) rect(x, y0 + 3, x, y1 - 2, AD[1]); }
    poligono([[zx - 6, 113], [zx + 6, 113], [zx + 3, 44], [zx - 3, 44]], (x, y) => (((y) % 3 === 0) ? AD[2] : AD[4]));
    rect(zx - 12, 30, zx + 12, 42, AZ[1]); a_ladrillos(R, zx - 11, 31, zx + 11, 42, AZ, AZ[0], { w: 4, h: 3, k: 206, brillo: true }); rect(zx - 14, 28, zx + 14, 30, hex('#e8c040')); rect(zx - 3, 35, zx + 3, 42, hex('#1a1020')); for (const dx of [-12, 12]) { poligono([[zx + dx - 2, 28], [zx + dx, 22], [zx + dx + 2, 28]], hex('#e8c040')); }
    // el muro de ladrillo vidriado azul con almenas, rosetas, leones y dragones en relieve
    const X1 = 136; a_ladrillos(R, 0, 54, X1, 140, AZ, hex('#0a1a44'), { w: 6, h: 4, k: 207, brillo: true, var: 1.1 });
    for (let x = 0; x <= X1; x += 12) { rect(x, 46, x + 7, 54, AZ[2]); rect(x + 2, 42, x + 5, 46, AZ[2]); rect(x, 46, x + 7, 46, AZ[4]); rect(x + 7, 46, x + 7, 54, AZ[0]); }
    for (const y of [58, 86, 118]) { rect(0, y - 3, X1, y + 3, AZ[1]); for (let x = 4; x < X1; x += 10) { disco(x, y, 2.5, hex('#f0e8d0')); pset(x, y, hex('#e8b830')); pset(x - 2, y - 2, hex('#2a5eb4')); } rect(0, y - 4, X1, y - 4, hex('#e8b830')); rect(0, y + 4, X1, y + 4, hex('#e8b830')); }
    const leon = (x, y) => { const O = hex('#e0a830'), OL = hex('#f8d870'), OS = hex('#9a6a18'), M = hex('#f0e8d0');
      rect(x, y + 4, x + 16, y + 10, O); rect(x, y + 4, x + 16, y + 4, OL); rect(x + 16, y + 1, x + 22, y + 9, M); rect(x + 18, y + 2, x + 23, y + 7, O); pset(x + 22, y + 4, AK); rect(x + 22, y + 6, x + 24, y + 7, OS);
      for (const lx of [x + 1, x + 4, x + 12, x + 15]) rect(lx, y + 10, lx + 1, y + 14, OS); linea(x, y + 5, x - 4, y + 1, O); pset(x - 5, y, OS); rect(x + 1, y + 9, x + 16, y + 10, OS); };
    for (let x = 4; x < X1 - 20; x += 32) leon(x, 64);
    const dragon = (x, y) => { const W = hex('#f0e8d0'), WS = hex('#b8a888'), G = hex('#e8b830');
      rect(x + 2, y + 6, x + 16, y + 11, W); rect(x + 2, y + 11, x + 16, y + 11, WS); for (let i = 0; i < 6; i++) rect(x + 15 + i, y + 6 - i * 1.2, x + 16 + i, y + 8 - i * 1.2, W); rect(x + 20, y - 2, x + 25, y + 1, W); linea(x + 22, y - 2, x + 25, y - 5, G); pset(x + 23, y - 1, AK);
      linea(x + 2, y + 7, x - 4, y + 4, W); linea(x - 4, y + 4, x - 6, y + 6, W); rect(x + 3, y + 12, x + 4, y + 16, G); rect(x + 14, y + 12, x + 15, y + 16, W); for (let i = x + 4; i < x + 15; i += 3) pset(i, y + 8, WS); };
    for (let x = 12; x < X1 - 24; x += 34) dragon(x, 94);
    // la torre del muro con su banderola y la puerta
    a_ladrillos(R, 112, 36, 140, 140, AZ, hex('#0a1a44'), { w: 6, h: 4, k: 208, brillo: true, base: 0.62 }); rect(138, 36, 140, 140, AZ[0]);
    for (let x = 112; x < 140; x += 8) { rect(x, 30, x + 5, 36, AZ[3]); rect(x + 1, 27, x + 4, 30, AZ[3]); }
    rect(118, 104, 134, 140, hex('#e8b830')); rect(120, 108, 132, 140, hex('#1a0c18')); disco(126, 108, 6, (x, y) => (y > 108 ? null : hex('#1a0c18'))); disco(126, 108, 8, (x, y) => (y > 107 || Math.hypot(x - 126, y - 108) < 6 ? null : hex('#e8b830')));
    rect(125, 17, 126, 30, hex('#5a3a22'));
    // el pretil del camino de las procesiones, el patio de ladrillo cocido con juntas de betún
    rect(140, 120, 319, 132, AD[2]); for (let x = 140; x < 320; x++) for (let y = 120; y < 132; y++) if ((y - 120) % 4 === 0 || (x + ((y - 120) >> 2) * 4) % 10 === 0) pset(x, y, AD[1]); rect(140, 119, 319, 120, AD[4]);
    const LB = a_r('#5a3422', '#7a4a30', '#9a6240', '#b47a52', '#c89466');
    for (let y = 132; y < 180; y++) { const u = (y - 132) / 48, bh = 3 + u * 5, fila = Math.floor(Math.log(1 + u * 4) * 6); for (let x = 0; x < 320; x++) { const bw = 8 + u * 10, xx = (x - 160) / (0.7 + u * 0.6) + 160 + (fila % 2) * bw / 2, col = Math.floor(xx / bw), j = (xx - col * bw) < 1 || Math.abs((Math.log(1 + u * 4) * 6) - fila) < 0.08 + u * 0.04;
      pset(x, y, j ? hex('#2a1a1e') : R.tone(LB, 2.2 + (h(col, fila, 209) - 0.5) * 1.2 + (h(x, y, 210) - 0.5) * 0.5 - (x > 140 ? 0 : 0.4), x, y)); } }
    // los braseros de bronce sobre su trípode
    for (const x of [30, 262]) { linea(x - 7, 158, x - 2, 140, hex('#5a3a18')); linea(x + 7, 158, x + 2, 140, hex('#5a3a18')); linea(x, 158, x, 140, hex('#7a5422')); poligono([[x - 9, 134], [x + 9, 134], [x + 6, 141], [x - 6, 141]], (xx, yy) => R.tone(a_r('#6a4418', '#a87a30', '#d8a848', '#f0d080'), 3 - (xx - x + 9) * 0.15, xx, yy)); rect(x - 10, 133, x + 10, 134, hex('#f0d080')); for (const dx of [-4, 0, 4]) pset(x + dx, 137, hex('#5a3a18')); }
  });
  // la vida: la banderola, el fuego de los braseros con su humo, la procesión en la escalinata, la gente tras el pretil
  { for (let i = 0; i < 14; i++) { const y = 18 + Math.round(Math.sin(t * 5 - i * 0.6) * 1.5 * (i / 14)); rect(127 + i, y, 127 + i, y + 5 - Math.floor(i / 5), i % 4 < 2 ? hex('#c83a2a') : hex('#e8b830')); } }
  for (const x of [30, 262]) { for (let k = 0; k < 4; k++) a_llama(R, x - 6 + k * 4, 133, 9 + (k % 2) * 4, t, k + x); a_luz(R, x, 128, 30, hex('#ffb060'), 0.4, 1); a_humo(R, t, x, 112, hex('#7a6070'), { alto: 40, n: 6, viento: 0.3, k: x }); for (let i = 0; i < 4; i++) { const u = ((t * 0.9 + i * 0.27) % 1); pset(Math.round(x + Math.sin(i * 3 + t) * 5 * u), Math.round(130 - u * 30), hex('#ffd060')); } }
  for (let i = 0; i < 5; i++) { const u = ((t * 0.04 + i * 0.2) % 1), y = Math.round(112 - u * 66), x = 220 + (i % 2 ? -1 : 1); a_persona(R, x, y, t, [hex('#f0e8d8'), hex('#b8a888'), A_PIEL[2], A_PELO[0]], { al: 6, anda: true, k: i }); }
  R.recorte([141, 90, 319, 119]); a_gentio(R, t, [[121, 8, 8, 21, 0.45]], 0, { noche: hex('#6a3a4a'), fiesta: 0, hueco: [-20, 142] }); R.recorte(null);
  return { suelo: 162, horizonte: 112, zigurat: [158, 22, 282, 112], muro: [0, 42, 140, 140], puerta: [118, 104, 134, 140], braseros: [[30, 134], [262, 134]], sol: [300, 106], libre: [44, 150, 250, 172] };
}

// 'babilonia' cámara 'altar': la cella con el nicho, el estrado y el trono
function a_babiloniaAltar(R, t, o) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  const AZ = a_r('#0a2058', '#123072', '#1a4088', '#24529e', '#3268b4'), CE = a_r('#2a1408', '#3e2010', '#552e18', '#6c3e22', '#86502c'), PI = a_r('#8a8070', '#aaa08c', '#c8bea8', '#e0d8c4', '#f0eadc');
  a_pegar(R, 'altar', () => {
    a_madera(R, 0, 0, 319, 16, CE, { ancho: 5, k: 221, base: 1.6 }); for (let x = 6; x < 320; x += 30) { rect(x, 0, x + 8, 18, CE[1]); rect(x, 0, x, 18, CE[3]); }
    rect(0, 18, 319, 24, hex('#a87a20')); for (let x = 4; x < 320; x += 10) { disco(x, 21, 2.5, hex('#f0e8d0')); pset(x, 21, hex('#e8b830')); }
    a_ladrillos(R, 0, 25, 319, 136, AZ, hex('#06143a'), { w: 6, h: 4, k: 222, brillo: true, var: 1, luz: (x, y) => (a_calma(x, y) ? -0.6 : 0) });
    for (const y of [70, 104]) { rect(0, y - 3, 319, y + 3, AZ[1]); for (let x = 5; x < 320; x += 10) { if (a_calma(x, y)) continue; disco(x, y, 2.5, hex('#f0e8d0')); pset(x, y, hex('#e8b830')); } }
    // el nicho escalonado con el símbolo dorado del dios (la pala sobre su asta) y su resplandor
    for (let s = 0; s < 4; s++) { const x0 = 112 + s * 6, x1 = 192 - s * 6, y0 = 32 + s * 5; rect(x0, y0, x1, 124, s === 3 ? hex('#0a0a1e') : [AZ[3], AZ[2], AZ[1]][s]); rect(x0, y0, x1, y0, hex('#e8b830')); rect(x0, y0, x0, 124, AZ[4]); }
    for (let y = 48; y < 124; y++) for (let x = 131; x < 174; x++) pset(x, y, R.tone(a_r('#0a0a1e', '#141430', '#1e1e44'), 2 - Math.hypot(x - 152, y - 76) / 30, x, y));
    rect(151, 70, 153, 118, hex('#c89a30')); poligono([[144, 70], [152, 52], [160, 70]], (x, y) => R.tone(a_r('#a87a20', '#e8b830', '#fff0a0'), 2.4 - (x - 144) / 16 * 1.6, x, y)); rect(146, 116, 158, 120, hex('#c89a30'));
    // el estrado de piedra con tres escalones, el trono de madera y oro con patas de león
    for (let s = 0; s < 3; s++) { const x0 = 92 + s * 8, x1 = 212 - s * 8, y0 = 140 - s * 6; rect(x0, y0 - 6, x1, y0, PI[2]); rect(x0, y0 - 6, x1, y0 - 6, PI[4]); rect(x0, y0, x1, y0, PI[0]); for (let x = x0 + 6; x < x1; x += 12) pset(x, y0 - 3, PI[1]); }
    rect(142, 96, 162, 122, CE[0]); a_madera(R, 143, 97, 161, 121, CE, { ancho: 4, vert: true, k: 223, base: 2.6 }); rect(141, 94, 163, 96, hex('#e8b830')); rect(140, 112, 164, 116, hex('#8a1a3a')); rect(140, 112, 164, 112, hex('#c84a6a'));
    for (const x of [140, 162]) { rect(x, 116, x + 2, 124, hex('#c89a30')); rect(x - 1, 124, x + 3, 126, hex('#e8b830')); pset(x - 1, 125, hex('#8a6418')); } disco(152, 100, 3, hex('#e8b830'));
    // la columna de tronco de palmera a la izquierda y la de la derecha
    for (const x0 of [8, 264]) { for (let y = 24; y < 146; y++) for (let x = x0; x < x0 + 14; x++) pset(x, y, R.tone(CE, 2.4 - (x - x0) * 0.18 + (((y + (x - x0) * 2) % 6) < 2 ? -1 : 0), x, y)); rect(x0 - 2, 24, x0 + 15, 28, hex('#a87a20')); rect(x0 - 2, 144, x0 + 15, 146, hex('#a87a20')); }
    // el suelo de piedra pulida con los reflejos
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 146) / (4 + (y - 146) * 0.2)), xx = (x - 160) / (0.6 + (y - 146) / 40) + 160, j = Math.abs(xx % 24) < 0.8; pset(x, y, j ? PI[0] : R.tone(PI, 2.2 + (h(Math.floor(xx / 24), f, 224) - 0.5) + (f % 2) * 0.3 - (y - 146) * 0.02, x, y)); }
    // los pies de las lámparas de aceite
    for (const x of [86, 218]) { rect(x - 1, 92, x + 1, 146, hex('#8a6418')); rect(x - 4, 144, x + 4, 146, hex('#a87a20')); poligono([[x - 6, 86], [x + 6, 86], [x + 3, 92], [x - 3, 92]], hex('#c89a30')); rect(x - 7, 85, x + 7, 86, hex('#f0d080')); }
  });
  // la vida: el resplandor del símbolo, las lámparas, el humo del incienso y sus reflejos en el suelo
  a_luz(R, 152, 68, 26, hex('#ffd880'), 0.35 + Math.sin(t * 1.4) * 0.08, 1);
  if (Math.sin(t * 2) > 0.6) a_destello(R, 148, 60, hex('#fff8d0'), 2);
  for (const x of [86, 218]) { a_llama(R, x - 2, 85, 7, t, x); a_llama(R, x + 2, 85, 6, t, x + 1); a_luz(R, x, 80, 34, hex('#ffb860'), 0.4, 1); for (let y = 150; y < 176; y += 2) if (Math.sin(t * 6 + y) > -0.3) pset(x + Math.round(Math.sin(y + t * 3)), y, hex('#e8c890')); }
  a_humo(R, t, 120, 122, hex('#8a7a9a'), { alto: 64, n: 9, viento: 0.15, k: 31, r: 6 });
  for (let i = 0; i < 14; i++) { const x = Math.floor(h(i, 231) * 300) + 6, y = 28 + Math.floor(h(i, 232) * 104); if (a_calma(x, y) || (x > 108 && x < 196)) continue; if (Math.sin(t * (1.5 + h(i, 233) * 2) + i * 2) > 0.85) a_destello(R, x, y, hex('#a8c8ff'), 1); }   // el vidriado que brilla con las llamas { rect(116, 122, 124, 126, hex('#a87a20')); rect(117, 126, 123, 128, hex('#6a4418')); pset(120, 121, hex('#ff8030')); }
  return { suelo: 162, estrado: [92, 122, 212, 140], trono: [140, 94, 164, 126], nicho: [112, 32, 192, 124], simbolo: [152, 52], lamparas: [86, 218], altar: [210, 126, 270, 174], detrasAltar: 147, detrasAltarX: [244, 262], libre: [30, 146, 214, 172] };
}

// delante en 'babilonia': la tinaja de dátiles y panes de ofrenda; en 'altar', el altar con las insignias del rey
function a_babiloniaDelante(R, t, o, cam) {
  const { rect, pset, linea, poligono } = R, disco = (...a) => a_disco(R, ...a);
  if (cam === 'altar') {
    R = a_movido(R, 0, 22);   // el altar bajo y cerca: detrás asoman cabeza y hombros
    const { rect, pset, linea, poligono } = R;
    const PI = a_r('#8a8070', '#aaa08c', '#c8bea8', '#e0d8c4', '#f0eadc');
    rect(212, 122, 268, 152, PI[1]); for (let y = 124; y < 152; y++) for (let x = 213; x < 268; x++) pset(x, y, R.tone(PI, 2.4 - (x - 213) * 0.03 + ((y - 124) % 7 === 0 ? -1 : 0), x, y));
    rect(210, 118, 270, 123, PI[3]); rect(210, 118, 270, 118, PI[4]); rect(214, 130, 266, 132, hex('#e8b830')); for (let x = 218; x < 266; x += 8) { disco(x, 141, 2.5, hex('#2a5eb4')); pset(x, 141, hex('#e8b830')); }
    rect(210, 117, 270, 118, hex('#8a1a3a')); rect(266, 124, 268, 152, PI[0]);
    if (o.insignias !== false) { // a la izquierda del ara, para no tapar la cara de quien está detrás: la tiara de cuernos, el cetro y el aro con la vara
      rect(214, 104, 224, 116, hex('#2a52a0')); rect(214, 104, 224, 105, hex('#e8b830')); rect(214, 110, 224, 111, hex('#e8b830')); for (let x = 215; x < 224; x += 3) pset(x, 107, hex('#f8e8a0')); poligono([[213, 104], [219, 98], [225, 104]], hex('#e8b830')); pset(219, 99, hex('#fff0a0'));
      linea(226, 116, 241, 111, hex('#c89a30')); linea(226, 115, 241, 110, hex('#f0d080')); disco(242, 110, 2, hex('#e8b830'));
      R.anillo(234, 114, 3, hex('#e8b830')); linea(229, 117, 240, 117, hex('#c89a30'));
      if (Math.sin(t * 2.3) > 0.7) a_destello(R, 219, 102, hex('#fff8d0'), 2); }
    return { suelo: 162, altar: [210, 126, 270, 174], detrasAltar: 147, detrasAltarX: [244, 262], insignias: { tiara: [219, 120], cetro: [234, 132], aro: [234, 136] } };
  }
  // la tinaja de barro con dátiles y panes de ofrenda, abajo a la izquierda
  disco(10, 168, 14, (x, y) => R.tone(a_r('#6a3a1e', '#8a4e2a', '#a8663a', '#c8824e'), 3 - (x + 4) * 0.1 - (y - 154) * 0.03, x, y)); rect(0, 152, 18, 156, hex('#8a4e2a')); rect(0, 152, 18, 152, hex('#c8824e'));
  for (let i = 0; i < 12; i++) { const x = 2 + (i % 6) * 3, y = 149 - ((i / 6) | 0) * 2; rect(x, y, x + 1, y + 2, hex('#5a2a14')); pset(x, y, hex('#a85a2a')); }
  for (const [x, y] of [[26, 172], [36, 176]]) { disco(x, y, 5, (xx, yy) => (yy < y - 2 ? hex('#e8c080') : hex('#c89a5a'))); linea(x - 3, y - 1, x + 3, y - 1, hex('#a87a3a')); }
  return { suelo: 162, tinaja: [0, 146, 40, 180] };
}

// ·· auxiliares del amor (b_) ··
const B_K = hex('#1c1418');

const b_capas = new Map();

// lo fijo de un encuadre se pinta una sola vez en un búfer (clave) y se copia en cada fotograma
function b_fijo(R, clave, pinta) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.recorte(null); R.usar(prev); b_capas.set(clave, b); }
  R.copiar(b);
}

// trama de Bayer 4 × 4 (0–1)
const B_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const b_b4 = (x, y) => (B_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0 → a, k = 1 → b)
function b_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe un píxel ya pintado hacia col
function b_tinte(R, x, y, col, k) { R.pset(x, y, b_mezcla(R.pget(x, y), col, k)); }

// resplandor de una llama o de una lámpara: aclara lo que hay debajo hacia col sin borrar su textura
function b_brillo(R, cx, cy, r, col, a = 0.5) {
  for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) * 1.1) / r; if (g <= 0) continue; const k = g * g * a + (b_b4(x, y) - 0.5) * 0.06; if (k < 0.04) continue;
    R.pset(x, y, b_mezcla(R.pget(x, y), col, Math.min(0.7, k)));
  }
}

// un haz de luz (polígono) que aclara en trama lo que hay debajo
function b_haz(R, pts, col, a = 0.18) { R.poligono(pts, (x, y) => { const c = R.pget(x, y); return b_b4(x, y) < 0.55 ? b_mezcla(c, col, a) : b_mezcla(c, col, a * 0.4); }); }

// estuco o yeso: manchas grandes en trama, grano fino y alguna grieta; P = [sombra, base, luz, grieta]
function b_yeso(R, x0, y0, x1, y1, P, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const v = 0.5 + 0.2 * Math.sin(x * 0.061 + y * 0.023 + k) + 0.16 * Math.sin(y * 0.093 - x * 0.031 + k * 2) + (h(x >> 2, y >> 2, k) - 0.5) * 0.34, n = h(x, y, k + 7), b = b_b4(x, y);
    let c = P[1];
    if (v > 0.68 && b < (v - 0.68) * 2.6) c = P[2]; else if (v < 0.32 && b < (0.32 - v) * 2.6) c = P[0];
    if (n < 0.03) c = P[0]; else if (n > 0.982) c = P[2];
    R.pset(x, y, c);
  }
  const n = Math.round((x1 - x0) * (y1 - y0) / 3800);
  for (let g = 0; g < n; g++) { let x = x0 + h(g, 1, k + 9) * (x1 - x0), y = y0 + h(g, 2, k + 9) * (y1 - y0); const L = 5 + h(g, 3, k + 9) * 12;
    for (let i = 0; i < L; i++) { R.pset(Math.round(x), Math.round(y), P[3]); x += h(g, i, k + 10) - 0.35; y += 0.85; if (x < x0 || x > x1 || y > y1) break; } }
}

// muro de sillares: hiladas de alto a con piezas de ancho variable, llaga, canto de luz arriba y a la izquierda, sombra
// abajo y a la derecha, grano, tono distinto por pieza y algún desconchón; P = [llaga, sombra, base, luz, base2]
function b_sillares(R, x0, y0, x1, y1, a, wMin, wMax, P, k = 0) {
  for (let f = 0, y = y0 - Math.round(h(k, 0, 1) * (a - 1)); y <= y1; f++, y += a) {
    let x = x0 - Math.round(h(f, 0, k) * wMax);
    while (x <= x1) {
      const w = wMin + Math.round(h(x, f, k + 1) * (wMax - wMin)), tono = h(x + 3, f, k + 2), cb = tono < 0.33 ? P[4] : P[2];
      for (let j = 0; j < a; j++) { const Y = y + j; if (Y < y0 || Y > y1) continue;
        for (let i = 0; i < w; i++) { const X = x + i; if (X < x0 || X > x1) continue;
          let c;
          if (j === a - 1 || i === w - 1) c = P[0];
          else if (j === a - 2 || i === w - 2) c = P[1];
          else if (j === 0 || i === 0) c = P[3];
          else { const n = h(X, Y, k + 3); c = n < 0.09 ? P[1] : n > 0.94 ? P[3] : cb; if (tono > 0.8 && b_b4(X, Y) < 0.3) c = P[1]; }
          R.pset(X, Y, c); } }
      if (h(x, f, k + 4) < 0.2 && w > 8 && a > 6) { const cx = x + 2 + Math.floor(h(x, f, k + 5) * (w - 5)), cy = y + 2 + Math.floor(h(x, f, k + 6) * (a - 4)); R.pset(cx, cy, P[0]); R.pset(cx + 1, cy, P[1]); R.pset(cx, cy + 1, P[1]); R.pset(cx + 1, cy - 1, P[3]); }
      x += w;
    }
  }
}

// un suelo en perspectiva: fn(u, z, du, dz, x, y) da el color de cada píxel (u: a lo ancho, z: hacia el fondo; du y dz,
// cuánto avanzan por píxel, para las juntas de un píxel)
function b_suelo(R, y0, y1, fn, kx = 3, kz = 1, yh = y0 - 40) {
  for (let y = y0; y <= y1; y++) { const d = y - yh, z = 600 * kz / d, dz = 600 * kz / (d * d), du = kx / d;
    for (let x = 0; x < 320; x++) R.pset(x, y, fn((x - 160) * du, z, du, dz, x, y)); }
}

// losas a matajunta: junta, canto de luz al fondo, sombra junto a la junta, tono por losa y grano; P = [junta, sombra, base, luz, base2]
function b_losas(P, k = 0, ancho = 1) {
  return (u, z, du, dz, x, y) => {
    const fila = Math.floor(z), uu = u / ancho + (fila & 1) * 0.5 + h(fila, 0, k) * 0.3, col = Math.floor(uu), fz = z - fila, fu = uu - col, dU = du / ancho;
    if (fz < dz || fu < dU) return P[0];
    if (fz > 1 - dz) return P[3];
    if (fu < dU * 2.2 || fz < dz * 2.2) return P[1];
    const tn = h(col, fila, k), n = h(x, y, k + 1);
    if (n < 0.06) return P[1]; if (n > 0.965) return P[3];
    return tn < 0.35 ? P[4] : tn > 0.82 ? b_mezcla(P[2], P[1], 0.35) : P[2];
  };
}

// tablas que corren hacia el fondo: junta, canto de luz, vetas a lo largo, testas a matajunta, tono por tabla; P como b_losas
function b_tablas(P, k = 0, ancho = 0.5, largo = 4) {
  return (u, z, du, dz, x, y) => {
    const uu = u / ancho, col = Math.floor(uu), fu = uu - col, zz = z / largo + h(col, 0, k), fila = Math.floor(zz), fz = zz - fila, dU = du / ancho;
    if (fu < dU || fz < dz / largo) return P[0];
    if (fu < dU * 2) return P[3];
    if (fu > 1 - dU) return P[1];
    const tn = h(col, fila, k + 1), veta = Math.sin(fu * 17 + Math.sin(zz * 9 + col) * 1.6 + col * 2);
    if (veta > 0.9) return P[1]; if (veta < -0.95) return P[3];
    if (h(x >> 1, y, k + 2) < 0.03) return P[1];
    return tn < 0.3 ? P[4] : tn > 0.8 ? b_mezcla(P[2], P[1], 0.3) : P[2];
  };
}

// tablero de madera visto de frente (tablas horizontales): juntas, vetas claras y oscuras, nudos y canto de luz
function b_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 7) {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += tabla, f++) {
    if (y + tabla - 1 <= y1) R.rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 3; g++) { const gy = y + 1 + Math.round(h(f, g, 510 + k) * (tabla - 3)); let x = x0 - Math.round(h(f, g, 511 + k) * 20);
      while (x < x1) { const L = 6 + Math.round(h(x, gy, 512 + k) * 26); if (h(x, g, 513 + k) < 0.7 && gy <= y1) R.rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 2 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 514 + k) * 10); } }
    if (h(f, 9, 515 + k) < 0.4 && y + 4 < y1) { const nx = x0 + 6 + Math.round(h(f, 7, 516 + k) * Math.max(1, x1 - x0 - 12)), ny = y + (tabla >> 1); R.rect(nx - 2, ny, nx + 2, ny, cS); R.pset(nx, ny, cD); }
  }
  R.rect(x0, y0, x1, y0, cL);
}

// una llama que tiembla (x, y: la base) con su resplandor; s: tamaño; brillo: radio del resplandor (0, sin él)
function b_llama(R, x, y, t, k = 0, s = 1, brillo = 22) {
  const f = Math.sin(t * 11 + k * 3) + Math.sin(t * 17.3 + k * 1.7), dx = f > 1.1 ? 1 : f < -1.1 ? -1 : 0, alto = Math.round((3 + (Math.sin(t * 7 + k) > 0.2 ? 1 : 0)) * s);
  if (brillo) b_brillo(R, x, y - alto * 0.6, brillo * (1 + f * 0.04), hex('#ffc070'), 0.42 + f * 0.04);
  const ex = Math.max(1, Math.round(s));
  for (let j = 0; j <= alto; j++) { const u = j / alto, w = Math.round((1 - u) * ex * 0.9 + (u < 0.4 ? 0.6 : 0)), xx = x + Math.round(dx * u * 1.5);
    for (let i = -w; i <= w; i++) R.pset(xx + i, y - j, j === 0 ? hex('#5a8ad8') : Math.abs(i) === w && w > 0 ? hex('#f07a28') : u < 0.55 ? hex('#fff6c8') : hex('#ffc848')); }
  R.pset(x + Math.round(dx * 1.5), y - alto - 1, hex('#f8a040'));
}

// un hilo de humo o de vapor que sube y se deshace (x, y: donde nace)
function b_humo(R, x, y, t, k = 0, alto = 30, col = hex('#d8d0d8'), a = 0.5) {
  for (let i = 0; i < alto; i++) { const u = i / alto, xx = Math.round(x + Math.sin(i * 0.17 - t * 1.6 + k) * (1 + i * 0.12) + i * 0.08), yy = y - i;
    if (b_b4(xx, yy) > (1 - u) * 0.95) continue; b_tinte(R, xx, yy, col, a * (1 - u * 0.7)); if (i > alto * 0.4 && h(i, k, 520) < 0.5) b_tinte(R, xx + 1, yy, col, a * 0.5 * (1 - u)); }
}

// motas de polvo que flotan dentro de un rectángulo (en un haz de luz)
function b_motas(R, t, x0, x1, y0, y1, n = 12, col = hex('#fff2cc'), inclin = 0) {
  for (let k = 0; k < n; k++) { const y = y1 - ((h(k, 1, 530) * (y1 - y0) + t * (1.5 + h(k, 2, 530) * 2)) % (y1 - y0)), x = x0 + ((h(k, 3, 530) * (x1 - x0) + Math.sin(t * 0.5 + k) * 4 + (y - y0) * inclin) % (x1 - x0));
    if (Math.sin(t * 1.4 + k * 2.1) > -0.2) b_tinte(R, Math.round(x), Math.round(y), col, 0.7); }
}

// nieve que cae dentro de un rectángulo (respeta R.recorte); n copos; dos tamaños
function b_nieve(R, t, x0, y0, x1, y1, n = 40, v = 9) {
  for (let k = 0; k < n; k++) { const ve = v * (0.6 + h(k, 1, 540) * 0.8), y = y0 + ((h(k, 2, 540) * (y1 - y0) + t * ve) % (y1 - y0)), x = x0 + ((h(k, 3, 540) * (x1 - x0) + Math.sin(t * 1.3 + k) * 2.5 - t * 2) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    R.pset(Math.round(x), Math.round(y), k % 3 ? hex('#f4f8ff') : hex('#c8d4e8')); if (k % 5 === 0) R.pset(Math.round(x) + 1, Math.round(y), hex('#dce6f4')); }
}

// nube de tres tonos (sombra abajo, cuerpo, luz arriba) dibujada con px (para recortarla a un hueco)
function b_nube(px, cx, cy, w, P) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.75], [-w * 0.1, -1, r], [w * 0.22, -0.5, r * 0.9], [w * 0.44, 1, r * 0.7]];
  const dsc = (x, y, rr, c) => { for (let j = Math.floor(-rr); j <= rr; j++) for (let i = Math.floor(-rr); i <= rr; i++) if (i * i + j * j <= rr * rr) px(Math.round(x + i), Math.round(y + j), c); };
  for (const [dx, dy, rr] of B) dsc(cx + dx, cy + dy + 1.5, rr, P[0]);
  for (const [dx, dy, rr] of B) dsc(cx + dx, cy + dy, rr * 0.92, P[1]);
  for (const [dx, dy, rr] of B) dsc(cx + dx - rr * 0.25, cy + dy - rr * 0.3, rr * 0.55, P[2]);
}

// un pájaro pequeño, posado (picotea y mueve la cabeza a ratos) o en vuelo; s: escala; P = [cuerpo, pecho, ala, pico];
// dir 1 mira a la derecha; px: con qué pintar (para recortarlo a una ventana)
function b_pajaro(px, x, y, t, dir, P, s = 1, vuela = false, k = 0) {
  const q = (i, j, c) => { for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) px(Math.round(x + (dir > 0 ? i : -i) * s + (dir > 0 ? a : -a)), Math.round(y + j * s + b), c); };
  if (vuela) { const al = Math.floor(t * 12 + k) % 2;
    q(-2, 0, P[2]); q(-1, 0, P[0]); q(0, 0, P[0]); q(1, 0, P[1]); q(1, -1, P[0]); q(2, -1, P[0]); q(3, -1, P[3]);
    if (al) { q(0, -1, P[2]); q(-1, -2, P[2]); q(0, -2, P[2]); } else { q(0, 1, P[2]); q(-1, 2, P[2]); q(0, 2, P[2]); } return; }
  const pic = ((t * 0.55 + k * 1.37) % 3.4) < 0.22 ? 1 : 0, gira = ((t * 0.4 + k * 0.71) % 5) < 0.6;
  q(-3, -1, P[2]); q(-2, 0, P[2]); q(-1, -1, P[0]); q(-1, 0, P[2]); q(0, -1, P[0]); q(0, 0, P[0]); q(1, 0, P[1]); q(-1, 1, P[2]); q(0, 1, P[1]); q(1, 1, P[1]);
  q(1, -2 + pic, P[0]); q(2, -2 + pic, P[0]); q(1, -1 + pic, P[0]); q(2, -1 + pic, P[1]);
  q(gira ? 1 : 2, -2 + pic, B_K); q(gira ? 0 : 3, -1 + pic, P[3]);
  q(0, 2, hex('#6a4a3a')); q(1, 2, hex('#6a4a3a'));
}

// un píxel pintado solo dentro de una máscara (para ventanas que no son rectángulos)
function b_enMascara(R, M) { return (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && M[y * 320 + x] === 1) R.pset(x, y, c); }; }

// figura pequeña de fondo (12–16 px): cabeza, cuerpo de túnica o de abrigo y, si se inclina, la espalda doblada; P = [ropa, ropaS, piel, pelo]
function b_figurita(R, x, suelo, alto, P, inclina = 0, sombrero = null) {
  const cab = Math.max(2, Math.round(alto * 0.16)), yc = suelo - alto + cab * 2, dx = Math.round(inclina * 3);
  R.poligono([[x - 3, suelo], [x + 4, suelo], [x + 3 + dx * 0.5, yc], [x - 2 + dx * 0.5, yc]], P[0]);
  R.linea(x + 3, suelo, x + 3 + dx * 0.5, yc, P[1]); R.rect(x - 3, suelo - 1, x + 3, suelo, P[1]);
  R.disco(x + 0.5 + dx, yc - cab + 0.5, cab, P[2]); R.rect(x - cab + 1 + dx, yc - cab * 2 + 1, x + cab + dx, yc - cab - 1, P[3]);
  if (sombrero) { R.rect(x - cab - 1 + dx, yc - cab * 2, x + cab + 1 + dx, yc - cab * 2, sombrero); R.rect(x - cab + 1 + dx, yc - cab * 2 - 4, x + cab - 1 + dx, yc - cab * 2, sombrero); }
}

function b_palIglesia() {
  return pal({ yeso: '#e6d2a8', yesoS: '#cbb286', yesoL: '#f4e6c4', yesoD: '#9a805c', rojo: '#9a3022', rojoS: '#6a1c14', rojoL: '#c04e34', ocre: '#cc9634', ocreS: '#946620',
    verde: '#5a7a44', verdeS: '#3a5430', verdeL: '#8aa45a', negro: '#2a1e1c', viga: '#4e3424', vigaS: '#2e1e14', vigaL: '#6c4c32', azul: '#2e4a78', azulS: '#1e3054', azulL: '#4a6a9a',
    oro: '#e8b84a', oroS: '#a87a26', marmol: '#e8e2d6', marmolS: '#bab2a4', marmolL: '#faf6ee', piedra: '#b8aa90', piedraS: '#8a7c66', piedraL: '#d8ccb2', bronce: '#a0703a', bronceS: '#6a4422', bronceL: '#d8a85a',
    piel: '#e0b088', pelo: '#4a3024', lino: '#f4eee0', linoS: '#cfc6b2', terracota: '#b4603a', terracotaS: '#7e3e24', cielo: '#f4ecd0', tunica: '#f0e8d8', tunicaS: '#c8bca6' });
}

function b_iglesia(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palIglesia();
  if (cam === 'vitral') return b_iglesiaFresco(R, t, o, P);
  const ax = 160, ay = 74, ar = 44;
  b_fijo(R, 'amor-iglesia', () => {
    // el techo de vigas, oscuro y tranquilo (por ahí pasa la barra del año)
    rect(0, 0, 319, 18, P.vigaS);
    for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 401) < 0.14) pset(x, y, P.viga);
    for (let x = 4; x < 320; x += 24) { rect(x, 0, x + 8, 13, P.viga); rect(x, 0, x, 13, P.vigaL); rect(x + 8, 0, x + 8, 13, b_mezcla(P.vigaS, B_K, 0.4)); for (let y = 2; y < 13; y += 4) pset(x + 3 + (y & 3), y, P.vigaS); }
    rect(0, 14, 319, 18, P.viga); rect(0, 14, 319, 14, P.vigaL); rect(0, 18, 319, 18, P.vigaS);
    // las paredes de estuco y el friso con guirnaldas (no llega a la esquina de Atom)
    b_yeso(R, 0, 19, 319, 92, [P.yesoS, P.yeso, P.yesoL, P.yesoD], 410);
    rect(0, 22, 268, 24, P.rojo); rect(0, 22, 268, 22, P.rojoL); rect(0, 25, 268, 25, P.ocre);
    for (let x0 = 0; x0 < 262; x0 += 26) { for (let i = 0; i <= 26; i++) { const yy = 27 + Math.round(Math.sin(i / 26 * Math.PI) * 6); pset(x0 + i, yy, P.verde); if (i % 3 === 0) pset(x0 + i, yy + 1, P.verdeS); if (i % 5 === 2) pset(x0 + i, yy - 1, P.verdeL); }
      pset(x0 + 13, 34, P.rojo); pset(x0 + 12, 34, P.rojoL); rect(x0, 26, x0, 28, P.rojoS); pset(x0, 29, P.rojo); pset(x0 - 1, 30, P.rojo); }
    // el zócalo pompeyano: paneles rojos con marco negro, filete ocre, vetas de mármol fingido y un pajarito pintado
    rect(0, 92, 319, 121, P.negro); rect(0, 92, 319, 92, P.ocre);
    for (let x0 = 0; x0 < 320; x0 += 40) { rect(x0 + 2, 94, x0 + 37, 115, P.rojo); rect(x0 + 2, 94, x0 + 37, 94, P.rojoL); rect(x0 + 2, 115, x0 + 37, 115, P.rojoS);
      for (let x = x0 + 5; x <= x0 + 34; x++) { pset(x, 97, P.ocre); pset(x, 112, P.ocre); } for (let y = 97; y <= 112; y++) { pset(x0 + 5, y, P.ocre); pset(x0 + 34, y, P.ocre); }
      for (let v = 0; v < 2; v++) { let y = 99 + h(x0, v, 412) * 10; for (let x = x0 + 7; x < x0 + 33; x++) { y += (h(x, v, 413) - 0.5) * 1.4; pset(x, Math.round(y), v ? P.rojoS : P.rojoL); } }
      if ((x0 / 40) % 2) { const bx = x0 + 19, by = 104; pset(bx, by, P.ocre); pset(bx + 1, by, P.ocre); pset(bx + 2, by - 1, P.ocre); pset(bx - 1, by - 1, P.ocreS); pset(bx + 1, by + 1, P.ocreS); }
      else { rect(x0 + 18, 102, x0 + 21, 106, P.ocreS); rect(x0 + 19, 101, x0 + 20, 101, P.ocre); pset(x0 + 17, 103, P.ocre); pset(x0 + 22, 103, P.ocre); } }
    rect(0, 116, 319, 121, P.piedraS); rect(0, 116, 319, 116, P.piedra); for (let x = 0; x < 320; x += 13) rect(x, 117, x, 121, P.negro);
    // el suelo de mosaico: cenefa trenzada, círculos de teselas y fondo crema moteado
    const M = [hex('#9a8a72'), P.marmol, P.marmolS, P.terracota, P.negro, P.ocre];
    b_suelo(R, 122, 179, (u, z, du, dz, x, y) => {
      const au = Math.abs(u);
      if (8 * du < 0.3 && ((u * 8) % 1 + 1) % 1 < du * 8 && b_b4(x, y) < 0.5) return M[2];
      if (5 * dz < 0.35 && ((z * 5) % 1) < dz * 5 && b_b4(x, y) < 0.5) return M[2];
      if (au > 2.15 && au < 2.55) { const b = Math.floor(z * 2.4) + Math.floor(u * 6); return au < 2.2 || au > 2.5 ? M[4] : b & 1 ? M[3] : M[5]; }
      if (au <= 2.15) { const cu = (u % 1 + 1) % 1 - 0.5, zc = z * 0.62, cz = zc - Math.floor(zc) - 0.5, r = Math.hypot(cu, cz);
        if (Math.abs(r - 0.33) < 0.06) return b_b4(x, y) < 0.2 ? M[5] : M[3]; if (r < 0.1) return M[4]; if (Math.abs(cu) > 0.43 && Math.abs(cz) > 0.43) return M[5];
        return h(x, y, 415) < 0.03 ? M[2] : M[1]; }
      const zz = z * 0.75, fila = Math.floor(zz), uu = u * 0.7 + (fila & 1) * 0.5, col = Math.floor(uu), fz = zz - fila, fu = uu - col;
      if (fz < dz * 0.75 || fu < du * 0.7) return M[0]; if (fz > 1 - dz * 0.75) return P.marmolL;
      const tn = h(col, fila, 418), veta = Math.sin(fu * 7 + fz * 5 * (tn - 0.5) * 4 + tn * 9);
      if (Math.abs(veta) < 0.06) return M[2]; return tn < 0.3 ? hex('#ddd2bc') : tn > 0.8 ? hex('#efe6d4') : M[1];
    }, 3, 1, 82);
    // el ábside: el arco de dovelas, la media cúpula azul con estrellas y la paloma, y abajo el Buen Pastor
    for (let y = 22; y <= 121; y++) for (let x = ax - ar - 8; x <= ax + ar + 8; x++) {
      const dx = x - ax, dy = y - ay, r = Math.hypot(dx, Math.min(0, dy)), s = Math.abs(dx) / ar;
      if (r <= ar) {
        let c;
        if (dy < 0) { const sh = r / ar; c = sh > 0.82 ? (b_b4(x, y) < (sh - 0.82) * 6 ? P.azulS : P.azul) : sh < 0.45 && b_b4(x, y) < (0.45 - sh) * 1.4 ? P.azulL : P.azul; if (h(x, y, 418) < 0.025 && sh < 0.9) c = h(x, y, 419) < 0.5 ? P.oro : P.oroS; }
        else if (dy < 3) c = dy === 0 ? P.yesoL : P.ocre;
        else { c = s > 0.68 && b_b4(x, y) < (s - 0.68) * 3 ? P.yesoS : s < 0.3 && b_b4(x, y) < 0.2 ? P.yesoL : P.yeso; if (h(x, y, 420) < 0.03) c = P.yesoS; if (y > 104) c = s > 0.7 && b_b4(x, y) < 0.5 ? P.verdeS : y === 105 ? P.verdeL : P.verde; if (y > 104 && h(x, y, 421) < 0.06) c = h(x, y, 422) < 0.5 ? P.rojoL : P.lino; }
        pset(x, y, c);
      } else if (dy < 0 && r <= ar + 7) { const a = Math.atan2(dy, dx), seg = (a + Math.PI) / (Math.PI / 13), fs = seg - Math.floor(seg), q = r - ar;
        pset(x, y, fs < 0.07 ? P.piedraS : q < 1.5 ? P.piedraS : q > 5.8 ? P.piedraL : Math.floor(seg) % 2 ? P.piedra : b_mezcla(P.piedra, P.terracota, 0.35)); if (q > 2 && q < 5 && h(x, y, 423) < 0.06) pset(x, y, P.piedraS); }
      else if (dy >= 0 && Math.abs(dx) > ar && Math.abs(dx) <= ar + 7 && y <= 117) { const q = Math.abs(dx) - ar, fila = Math.floor((y - ay) / 7);
        pset(x, y, (y - ay) % 7 === 6 ? P.piedraS : q < 1.5 ? P.piedraS : q > 5.8 ? P.piedraL : fila % 2 ? P.piedra : b_mezcla(P.piedra, P.terracota, 0.35)); }
    }
    // la paloma de la cúpula y las estrellas grandes
    for (const [i, j] of [[-6, -1], [-5, -2], [-4, -2], [-3, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, -1], [4, -2], [5, -2], [6, -1], [0, 1], [1, 1], [-1, 1], [0, -1], [1, -1], [2, -1], [0, 2]]) pset(ax + i, 44 + j, P.lino);
    pset(ax + 2, 43, P.oro); pset(ax + 3, 43, P.ocreS); for (const [sx, sy] of [[132, 58], [190, 56], [146, 40], [176, 42], [124, 70], [198, 68]]) { pset(sx, sy, P.oro); pset(sx - 1, sy, P.oroS); pset(sx + 1, sy, P.oroS); pset(sx, sy - 1, P.oroS); pset(sx, sy + 1, P.oroS); }
    // el Buen Pastor (figura sencilla, sin rostro) con la oveja a hombros, dos ovejas y dos palmeras
    { const x = ax; rect(x - 4, 92, x + 4, 103, P.tunica); rect(x + 3, 92, x + 4, 103, P.tunicaS); rect(x - 4, 97, x + 4, 97, P.ocre); rect(x - 3, 104, x - 2, 108, P.piel); rect(x + 2, 104, x + 3, 108, P.piel); rect(x - 3, 109, x - 1, 109, P.pelo); rect(x + 2, 109, x + 4, 109, P.pelo);
      rect(x - 7, 86, x + 7, 89, P.lino); rect(x - 7, 89, x + 7, 89, P.linoS); disco(x - 8, 87, 2, P.lino); pset(x - 9, 87, P.negro); rect(x + 6, 89, x + 7, 92, P.linoS);
      disco(x, 89, 3, P.piel); rect(x - 2, 86, x + 2, 87, P.pelo); linea(x + 7, 92, x + 9, 108, P.pelo); pset(x + 6, 91, P.piel); }
    for (const [sx, d] of [[136, 1], [184, -1]]) { rect(sx - 4, 100, sx + 4, 104, P.lino); rect(sx - 4, 104, sx + 4, 104, P.linoS); disco(sx + 5 * d, 100, 2, P.lino); pset(sx + 6 * d, 100, P.negro); for (const lx of [-3, -1, 2, 3]) rect(sx + lx, 105, sx + lx, 107, P.pelo); }
    for (const px of [122, 198]) { for (let y = 82; y <= 104; y++) pset(px + Math.round(Math.sin(y * 0.2) * 0.6), y, (y & 1) ? P.ocreS : P.pelo);
      for (const [dx, dy] of [[-6, 2], [-4, 0], [-1, -2], [2, -1], [5, 1], [6, 3], [-6, 3]]) linea(px, 82, px + dx, 82 + dy, P.verde); pset(px - 1, 81, P.verdeL); pset(px + 1, 81, P.verdeL); }
    rect(ax - ar, 78, ax + ar, 78, P.rojo);
    // el escalón del ábside
    rect(ax - ar - 10, 117, ax + ar + 10, 121, P.piedra); rect(ax - ar - 10, 117, ax + ar + 10, 117, P.piedraL); rect(ax - ar - 10, 121, ax + ar + 10, 121, P.piedraS);
    // las dos columnas estriadas con capitel y basa
    for (const x0 of [92, 216]) {
      for (let y = 30; y <= 112; y++) for (let i = 0; i < 12; i++) { const u = i / 11; let c = u < 0.18 ? P.marmolL : u > 0.78 ? P.marmolS : P.marmol; if (i % 3 === 1 && u > 0.1 && u < 0.92) c = b_mezcla(c, P.marmolS, 0.6); if (h(x0 + i, y, 425) < 0.04) c = P.marmolS; pset(x0 + i, y, c); }
      rect(x0 - 3, 19, x0 + 14, 21, P.piedra); rect(x0 - 3, 19, x0 + 14, 19, P.piedraL); rect(x0 - 3, 21, x0 + 14, 21, P.piedraS);
      for (let y = 22; y < 30; y++) { const w = Math.round(6 + (30 - y) * 0.45); rect(x0 + 6 - w, y, x0 + 5 + w, y, y < 25 ? P.marmolL : P.marmol); pset(x0 + 5 + w, y, P.marmolS); }
      for (const vx of [x0 - 1, x0 + 12]) { disco(vx, 24, 2, P.marmolS); pset(vx, 24, P.marmolL); }
      for (let k = 0; k < 4; k++) { pset(x0 + 2 + k * 3, 27, P.verdeS); pset(x0 + 2 + k * 3, 28, P.marmolS); }
      rect(x0 - 2, 112, x0 + 13, 114, P.marmol); rect(x0 - 2, 112, x0 + 13, 112, P.marmolL); rect(x0 - 3, 115, x0 + 14, 121, P.piedra); rect(x0 - 3, 115, x0 + 14, 115, P.piedraL); rect(x0 - 3, 121, x0 + 14, 121, P.piedraS);
      for (let k = 0; k < 18; k++) pset(x0 + 12 + (k & 1), 31 + k * 4.5, P.marmolS);
    }
    // la ventanita alta de la izquierda: cielo, un ciprés y el derrame de piedra
    for (let y = 36; y <= 70; y++) for (let x = 26; x <= 54; x++) { const dx = x - 40, dy = y - 48, r = Math.hypot(dx, Math.min(0, dy)); if (r > 14) continue;
      pset(x, y, r > 10.5 ? (dx < 0 ? P.piedraL : P.piedraS) : y > 66 ? P.piedraL : (y < 44 ? P.cielo : b_b4(x, y) < (y - 44) / 30 ? hex('#cfe0e6') : P.cielo)); }
    for (let y = 48; y <= 66; y++) { const w = Math.round((y - 48) * 0.18); rect(44 - w, y, 45 + w, y, P.verdeS); pset(44 - w, y, P.verde); }
    rect(30, 63, 50, 66, hex('#b8c8a0')); rect(26, 67, 54, 70, P.piedra); rect(26, 67, 54, 67, P.piedraL);
    // el haz de luz que baja hasta el suelo
    b_haz(R, [[30, 66], [50, 66], [142, 160], [96, 160]], hex('#fff0c0'), 0.2);
    b_haz(R, [[80, 140], [138, 140], [150, 160], [96, 160]], hex('#fff4d0'), 0.16);
    // la hornacina de la derecha con el ánfora, la jarra y la caja de rollos
    for (let y = 64; y <= 112; y++) for (let x = 248; x <= 300; x++) { const dx = x - 274, dy = y - 86, r = Math.hypot(dx, Math.min(0, dy)); if (r > 24) continue;
      pset(x, y, r > 21 ? (dx < 0 ? P.piedraS : P.piedraL) : b_b4(x, y) < 0.3 + Math.abs(dx) / 60 ? P.yesoD : P.yesoS); }
    rect(250, 98, 298, 100, P.piedra); rect(250, 98, 298, 98, P.piedraL); rect(250, 100, 298, 100, P.piedraS); rect(250, 110, 298, 112, P.piedra); rect(250, 110, 298, 110, P.piedraL);
    { const x = 260; for (let y = 78; y <= 97; y++) { const w = Math.round(y < 82 ? 1 : 4 * Math.sin((y - 80) / 18 * Math.PI) + 1); rect(x - w, y, x + w, y, P.terracota); pset(x - w, y, b_mezcla(P.terracota, P.lino, 0.4)); pset(x + w, y, P.terracotaS); } rect(x - 3, 78, x + 3, 79, P.terracotaS); linea(x - 3, 81, x - 5, 86, P.terracotaS); linea(x + 3, 81, x + 5, 86, P.terracotaS); rect(x - 4, 88, x + 4, 88, P.ocre); }
    { const x = 276; disco(x, 93, 4, P.bronce); rect(x - 4, 93, x + 4, 97, P.bronce); rect(x + 2, 90, x + 4, 97, P.bronceS); rect(x - 2, 87, x + 1, 89, P.bronce); pset(x - 2, 90, P.bronceL); pset(x - 3, 92, P.bronceL); linea(x + 4, 89, x + 6, 93, P.bronceS); }
    { const x = 286; rect(x, 86, x + 8, 97, P.terracotaS); rect(x, 86, x + 2, 97, P.terracota); rect(x, 86, x + 8, 86, P.ocre); for (const [i, j] of [[2, 84], [5, 83], [7, 85]]) { disco(x + i, j, 1.5, P.lino); pset(x + i, j, P.linoS); } }
    for (let i = 0; i < 4; i++) rect(256 + i * 9, 106, 262 + i * 9, 109, i % 2 ? P.lino : P.linoS);
    // el altar de mármol con el mantel de lino, la copa y el pan; el pez tallado en el frente
    rect(136, 117, 184, 134, P.marmol); rect(136, 117, 138, 134, P.marmolL); rect(181, 117, 184, 134, P.marmolS); rect(136, 134, 184, 134, P.marmolS);
    for (let v = 0; v < 3; v++) { let y = 119 + v * 5; for (let x = 139; x < 181; x++) { y += (h(x, v, 426) - 0.5) * 1.2; if (h(x, v, 427) < 0.7) pset(x, Math.round(y), P.marmolS); } }
    rect(144, 121, 176, 131, P.marmolS); rect(145, 122, 175, 130, P.marmol); rect(145, 122, 175, 122, P.marmolL);
    for (let i = 0; i < 14; i++) { const y = Math.round(126 + Math.sin(i / 13 * Math.PI) * -3); pset(152 + i, y, P.marmolS); pset(152 + i, 252 - y, P.marmolS); } linea(165, 126, 170, 123, P.marmolS); linea(165, 126, 170, 129, P.marmolS); pset(155, 125, P.marmolS);
    rect(130, 112, 190, 116, P.lino); rect(130, 112, 190, 112, hex('#fffaf0')); rect(130, 117, 135, 122, P.lino); rect(185, 117, 190, 122, P.lino); rect(130, 122, 135, 122, P.rojo); rect(185, 122, 190, 122, P.rojo); rect(131, 116, 189, 116, P.linoS); for (let x = 130; x <= 190; x += 2) pset(x, 123, P.linoS);
    rect(146, 104, 150, 106, hex('#c8c8d0')); rect(147, 107, 149, 109, hex('#a8a8b4')); rect(145, 110, 151, 111, hex('#c8c8d0')); pset(146, 104, C.blanco);
    disco(173, 109, 3, hex('#b07a3a')); rect(170, 110, 176, 111, hex('#e8d8b0')); pset(172, 108, hex('#d8a060')); linea(171, 109, 175, 109, hex('#7a4a22'));
    rect(157, 108, 163, 111, P.bronce); rect(157, 108, 163, 108, P.bronceL); rect(163, 109, 166, 110, P.bronce); rect(156, 111, 164, 111, P.bronceS);
    // el pebetero de bronce
    { const x = 206; linea(x, 112, x - 5, 134, P.bronceS); linea(x, 112, x + 5, 134, P.bronceS); rect(x, 112, x, 134, P.bronce); rect(x - 5, 108, x + 5, 111, P.bronce); rect(x - 5, 108, x + 5, 108, P.bronceL); rect(x - 4, 111, x + 4, 111, P.bronceS); for (const lx of [-5, 0, 5]) pset(x + lx, 134, P.bronceL); }
  });
  // la vida: las lámparas colgadas que se mecen con sus llamas, el humo del incienso, la lucerna del altar, el polvo en el haz,
  // los fieles al fondo que se inclinan y alguien que barre
  b_motas(R, t, 40, 130, 70, 156, 16, hex('#fff6d8'), 0.6);
  b_llama(R, 164, 107, t, 1, 1, 16);
  b_humo(R, 206, 106, t, 0, 58, hex('#e8e0e8'), 0.55); b_humo(R, 204, 106, t + 2.3, 3, 40, hex('#d8d0d8'), 0.4);
  for (const [lx, k] of [[64, 0], [256, 1]]) { const dx = Math.round(Math.sin(t * 0.9 + k * 2) * 1.6), by = 52;
    for (let y = 19; y < by; y++) { const xx = Math.round(lx + dx * (y - 19) / (by - 19)); pset(xx, y, (y & 1) ? P.bronceS : P.bronce); }
    const x = lx + dx; for (const [a, b] of [[-9, by], [9, by]]) linea(x, by - 6, x + a, b, P.bronceS);
    rect(x - 10, by, x + 10, by + 2, P.bronce); rect(x - 10, by, x + 10, by, P.bronceL); rect(x - 9, by + 2, x + 9, by + 2, P.bronceS);
    for (const c of [-7, 0, 7]) { rect(x + c - 1, by + 3, x + c + 1, by + 7, hex('#c8a060')); pset(x + c - 1, by + 3, hex('#f0d8a0')); pset(x + c, by + 8, hex('#a07a40')); }
    for (const c of [-7, 0, 7]) b_llama(R, x + c, by - 1, t, k * 5 + c, 1, c === 0 ? 24 : 0); }
  for (const [fx, k] of [[50, 0], [64, 1]]) { const inc = Math.max(0, Math.sin(t * 0.8 + k * 1.3)) * 1.2; b_figurita(R, fx, 125, 14, [k ? hex('#8a6a4a') : hex('#6a7a8a'), k ? hex('#5a442e') : hex('#48525e'), P.piel, P.pelo], inc); }
  { const bx = 242 + Math.round(Math.sin(t * 0.5) * 14), b = Math.sin(t * 3); b_figurita(R, bx, 125, 15, [hex('#a08a6a'), hex('#6e5a42'), P.piel, hex('#6a4a2a')], 0.6);
    linea(bx + 4, 116, bx + 8 + Math.round(b * 2), 125, P.bronceS); rect(bx + 6 + Math.round(b * 2), 124, bx + 10 + Math.round(b * 2), 125, hex('#c8a060')); if (b > 0.6) pset(bx + 12, 124, hex('#d8c8a8')); }
  return { suelo: 150, altar: [130, 190, 112], abside: [116, 204, 30, 117], ventana: [26, 36, 54, 70], hornacina: [248, 64, 300, 112], columnas: [98, 222], pebetero: [206, 108], libre: [[24, 130], [190, 300]] };
}

// la iglesia de cerca: el fresco de los dos santos
function b_iglesiaFresco(R, t, o, P) {
  const { rect, pset, disco, linea, poligono } = R, X0 = 54, X1 = 266, Y0 = 16, Y1 = 124;
  b_fijo(R, 'amor-fresco', () => {
    b_yeso(R, 0, 0, 319, 140, [P.yesoS, P.yeso, P.yesoL, P.yesoD], 430);
    // la pilastra de la izquierda
    for (let y = 0; y <= 134; y++) for (let i = 0; i < 16; i++) { const u = i / 15; let c = u < 0.15 ? P.piedraL : u > 0.8 ? P.piedraS : P.piedra; if (i % 4 === 2 && y > 14) c = b_mezcla(c, P.piedraS, 0.5); if (h(i, y, 431) < 0.05) c = P.piedraS; pset(20 + i, y, c); }
    // el marco del fresco: banda roja con filete ocre
    rect(X0 - 6, Y0 - 6, X1 + 6, Y1 + 6, P.negro); rect(X0 - 5, Y0 - 5, X1 + 5, Y1 + 5, P.rojo); rect(X0 - 5, Y0 - 5, X1 + 5, Y0 - 5, P.rojoL); rect(X0 - 5, Y1 + 5, X1 + 5, Y1 + 5, P.rojoS);
    rect(X0 - 2, Y0 - 2, X1 + 2, Y0 - 2, P.ocre); rect(X0 - 2, Y1 + 2, X1 + 2, Y1 + 2, P.ocre); rect(X0 - 2, Y0 - 2, X0 - 2, Y1 + 2, P.ocre); rect(X1 + 2, Y0 - 2, X1 + 2, Y1 + 2, P.ocre);
    for (let x = X0 - 4; x <= X1 + 4; x += 6) { pset(x, Y0 - 4, P.ocreS); pset(x, Y1 + 4, P.ocreS); }
    // el cielo azul con estrellas y el prado con flores
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { let c;
      if (y < 100) { const u = (y - Y0) / 84; c = u > 0.7 && b_b4(x, y) < (u - 0.7) * 2.5 ? P.azulL : u < 0.3 && b_b4(x, y) < (0.3 - u) * 2 ? P.azulS : P.azul; if (h(x, y, 432) < 0.012) c = P.oro; }
      else { c = y === 100 ? P.verdeL : b_b4(x, y) < 0.25 ? P.verdeS : P.verde; const f = h(x, y, 433); if (f < 0.03) c = P.rojoL; else if (f > 0.975) c = P.lino; }
      pset(x, y, c); }
    for (const [sx, sy] of [[80, 28], [236, 30], [150, 70], [170, 74], [100, 80], [222, 84], [128, 26], [196, 24]]) { pset(sx, sy, P.oro); for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) pset(sx + i, sy + j, P.oroS); }
    // los cipreses de los lados
    for (const cx of [74, 246]) for (let y = 46; y <= 102; y++) { const w = Math.round(Math.sin((y - 46) / 56 * Math.PI * 0.9 + 0.15) * 6); for (let i = -w; i <= w; i++) pset(cx + i, y, i < -w * 0.3 ? P.verdeL : i > w * 0.4 ? B_K : P.verdeS); if (h(cx, y, 434) < 0.3) pset(cx - w + 1, y, P.verde); }
    // los dos santos de túnica blanca con clavos rojos, palio, aureola y la palma (sin rostro)
    for (const [x, d] of [[120, 1], [200, -1]]) {
      disco(x, 42, 11, P.oroS); disco(x, 42, 10, P.oro); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j < 64 && b_b4(x + i, 42 + j) < 0.35) pset(x + i, 42 + j, hex('#f6dc8a'));
      poligono([[x - 9, 54], [x + 10, 54], [x + 14, 110], [x - 13, 110]], P.tunica);
      for (let y = 56; y < 110; y += 1) { pset(x - 4 + Math.round((y - 54) * -0.07), y, P.rojo); pset(x + 5 + Math.round((y - 54) * 0.07), y, P.rojo); }
      for (const fx of [-8, -1, 8]) for (let y = 70; y < 110; y += 2) pset(x + fx + Math.round((y - 54) * fx * 0.012), y, P.tunicaS);
      poligono(d > 0 ? [[x - 10, 54], [x - 3, 54], [x + 11, 86], [x + 13, 104], [x - 12, 104], [x - 11, 72]] : [[x + 10, 54], [x + 3, 54], [x - 11, 86], [x - 13, 104], [x + 12, 104], [x + 11, 72]], hex('#e2cfa4'));
      for (let k = 0; k < 5; k++) linea(x - 9 * d + k * 4 * d, 60 + k * 9, x - 11 * d + k * 4 * d, 102, hex('#bca67a'));
      rect(x - 12, 103, x + 12, 104, hex('#bca67a'));
      rect(x - 4, 110, x - 1, 112, P.pelo); rect(x + 2, 110, x + 5, 112, P.pelo);
      rect(x - 2, 51, x + 2, 54, P.piel); disco(x + 0.5, 45, 5.5, P.piel); for (let j = -6; j <= -1; j++) for (let i = -6; i <= 6; i++) if (i * i + (j + 0.5) ** 2 < 31) pset(x + i, 45 + j, P.pelo); rect(x - 5, 45, x - 5, 49, P.pelo); rect(x + 6, 45, x + 6, 49, P.pelo);
      const hx = x + 9 * d; rect(Math.min(hx, hx + 3 * d), 72, Math.max(hx, hx + 3 * d), 75, P.piel);
      linea(hx + d, 75, hx + 8 * d, 30, P.verdeS); for (let k = 0; k < 9; k++) { const sy = 34 + k * 4, sx = hx + d + Math.round((75 - sy) / 45 * 7 * d); linea(sx, sy, sx - 4, sy + 3, P.verde); linea(sx, sy, sx + 4, sy + 2, P.verdeL); }
    }
    // la corona de laurel con sus cintas y la paloma
    for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, x = Math.round(160 + Math.cos(an) * 8), y = Math.round(44 + Math.sin(an) * 7); pset(x, y, a % 2 ? P.verdeL : P.verde); pset(Math.round(160 + Math.cos(an) * 7), Math.round(44 + Math.sin(an) * 6), P.verdeS); }
    for (const s of [-1, 1]) for (let y = 51; y < 70; y++) pset(160 + s * (2 + Math.round(Math.sin(y * 0.4) * 1.5)), y, s > 0 ? P.rojo : P.rojoL);
    for (const [i, j] of [[-7, -1], [-6, -2], [-5, -2], [-4, -1], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, -1], [4, -2], [5, -2], [6, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [2, -1], [0, 2], [-1, 2]]) pset(160 + i, 28 + j, P.lino);
    pset(162, 27, P.oroS); pset(163, 28, P.ocre);
    // el arbusto en flor entre los santos
    for (let k = 0; k < 40; k++) { const bx = 160 + Math.round((h(k, 1, 435) - 0.5) * 22), by = 104 + Math.round((h(k, 2, 435) - 0.6) * 12); pset(bx, by, k % 4 ? P.verdeS : P.rojoL); }
    // los desconchones y las grietas del fresco, y una mancha de humedad arriba a la derecha
    for (const [cx, cy, r, k] of [[64, 26, 7, 0], [254, 116, 9, 1], [142, 118, 5, 2], [92, 108, 4, 3]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.2) + (h(i, j, 436 + k) - 0.5) * 3; if (d > r) continue;
      pset(cx + i, cy + j, d > r - 1.2 ? P.yesoL : h(cx + i, cy + j, 437) < 0.3 ? P.yesoD : P.yesoS); }
    for (let g = 0; g < 7; g++) { let x = X0 + h(g, 1, 438) * (X1 - X0), y = Y0 + h(g, 2, 438) * 40; for (let i = 0; i < 26; i++) { b_tinte(R, Math.round(x), Math.round(y), B_K, 0.45); x += h(g, i, 439) * 1.6 - 0.8; y += 1; if (y > Y1) break; } }
    for (let y = Y0; y < Y0 + 30; y++) for (let x = X1 - 40; x <= X1; x++) { const d = Math.hypot(x - X1, (y - Y0) * 1.4); if (d < 30 && b_b4(x, y) < (1 - d / 30) * 0.5) b_tinte(R, x, y, hex('#6a5a40'), 0.35); }
    // la repisa de piedra con las tres lucernas, un jarrito con lirios, y el zócalo
    rect(40, 128, 280, 133, P.piedra); rect(40, 128, 280, 128, P.piedraL); rect(40, 133, 280, 133, P.piedraS); for (let x = 42; x < 280; x += 3) pset(x, 134, b_mezcla(P.yesoS, B_K, 0.2));
    for (const lx of [100, 160, 220]) { for (let j = 0; j < 4; j++) rect(lx - 5 + (j === 0 ? 1 : 0), 124 + j, lx + 4 - (j === 0 ? 1 : 0), 124 + j, j === 0 ? hex('#d88a5a') : j === 3 ? P.terracotaS : P.terracota); rect(lx + 4, 125, lx + 7, 126, P.terracota); pset(lx - 6, 125, P.terracotaS); pset(lx - 1, 124, P.terracotaS); }
    rect(246, 120, 252, 127, P.terracota); rect(251, 120, 252, 127, P.terracotaS); for (const [i, j] of [[-1, -6], [2, -9], [5, -5]]) { linea(249, 120, 249 + i, 120 + j, P.verdeS); disco(249 + i, 120 + j - 1, 1.5, P.lino); }
    rect(0, 135, 319, 140, P.negro); rect(0, 135, 319, 135, P.ocreS);
    b_suelo(R, 141, 179, b_losas([hex('#6a5e4c'), P.piedraS, P.piedra, P.piedraL, b_mezcla(P.piedra, P.yesoD, 0.4)], 440, 1.4), 3, 1, 100);
    // el candelero alto de la derecha
    { const x = 296; rect(x, 70, x + 1, 160, P.bronce); rect(x + 1, 70, x + 1, 160, P.bronceS); for (const y of [90, 118, 140]) { rect(x - 2, y, x + 3, y + 2, P.bronce); pset(x - 2, y, P.bronceL); }
      linea(x, 160, x - 7, 168, P.bronceS); linea(x + 1, 160, x + 8, 168, P.bronceS); rect(x, 160, x + 1, 168, P.bronce); rect(x - 4, 66, x + 5, 69, P.bronce); rect(x - 4, 66, x + 5, 66, P.bronceL); rect(x - 1, 58, x + 2, 65, P.lino); rect(x + 2, 58, x + 2, 65, P.linoS); }
  });
  // la vida: las llamas, su resplandor que late sobre el fresco, el humo y una polilla que ronda la lucerna del centro
  for (const [lx, k] of [[100, 0], [160, 1], [220, 2]]) { b_brillo(R, lx + 6, 110, 38 + Math.sin(t * 5 + k * 2) * 2, hex('#ffcc7a'), 0.32 + Math.sin(t * 6.3 + k) * 0.04); b_llama(R, lx + 7, 123, t, k * 3, 1.2, 0); b_humo(R, lx + 7, 117, t, k * 2, 34, hex('#e8e0e0'), 0.35); }
  b_llama(R, 297, 57, t, 9, 1.2, 26);
  { const a = t * 3.1, mx = Math.round(166 + Math.cos(a) * 10 + Math.sin(t * 7) * 2), my = Math.round(108 + Math.sin(a * 1.3) * 6), al = Math.floor(t * 18) % 2; pset(mx, my, hex('#e8dcc0')); pset(mx - 1, my - al, hex('#c8b898')); pset(mx + 1, my - al, hex('#c8b898')); }
  return { suelo: 166, fresco: [X0, Y0, X1, Y1], santos: [120, 200], repisa: [40, 280, 128], lucernas: [100, 160, 220], candelero: [296, 168], libre: [[38, 280]] };
}

// delante de los personajes en la iglesia: el candelabro de bronce de la izquierda y el banco de madera de la derecha
function b_iglesiaDelante(R, t, o, cam) {
  if (cam === 'vitral') return;
  const { rect, pset, linea } = R, P = b_palIglesia(), x = 12;
  for (let y = 68; y <= 172; y++) { pset(x, y, P.bronceL); pset(x + 1, y, P.bronce); pset(x + 2, y, P.bronceS); }
  for (const y of [84, 110, 136, 158]) { rect(x - 2, y, x + 4, y + 2, P.bronce); rect(x - 2, y, x + 4, y, P.bronceL); rect(x - 2, y + 2, x + 4, y + 2, P.bronceS); }
  for (const s of [-1, 1]) { linea(x + 1, 166, x + 1 + s * 9, 179, P.bronceS); linea(x + 1, 167, x + 1 + s * 9, 179, P.bronce); }
  rect(x - 6, 62, x + 8, 67, P.bronce); rect(x - 6, 62, x + 8, 62, P.bronceL); rect(x - 5, 67, x + 7, 67, P.bronceS);
  b_llama(R, x + 1, 61, t, 7, 1.6, 30);
  // el banco
  b_madera(R, 262, 158, 319, 163, hex('#7a4e2c'), hex('#5a3820'), hex('#9a6a40'), hex('#3a2414'), 450, 6);
  rect(262, 164, 319, 165, hex('#3a2414'));
  for (const lx of [268, 312]) { rect(lx, 166, lx + 4, 179, hex('#6a4426')); rect(lx, 166, lx, 179, hex('#8a5e36')); rect(lx + 4, 166, lx + 4, 179, hex('#3a2414')); }
  rect(264, 172, 319, 174, hex('#5a3820'));
}

function b_palChaucer() {
  return pal({ yeso: '#e8e0cc', yesoS: '#c8bea6', yesoL: '#f6f0e0', yesoD: '#a89c82', roble: '#6a4428', robleS: '#4a2c18', robleL: '#8e623c', robleD: '#2e1a0e',
    piedra: '#c8bca0', piedraS: '#968a70', piedraL: '#e6dcc2', cielo: '#8ec4e8', cieloL: '#bfe0f4', cieloS: '#6aa4d4', colina: '#7aa06a', colinaS: '#5a8054', lejos: '#9ab8b0',
    hoja: '#4e8a3a', hojaS: '#2e5a26', hojaL: '#86c050', flor: '#f6d8e4', florS: '#e0a0b8', rama: '#5a3c26', ramaS: '#3a2618', tapiz: '#3e6a4a', tapizS: '#2a4a34', rojo: '#a83a2e', rojoS: '#702418',
    perg: '#efe2c0', pergS: '#cdb88a', laton: '#d0a040', latonS: '#8a6420', latonL: '#f4d27a', azul: '#3a5a8a', verde: '#4a7a4a', gato: '#8a8a92', gatoS: '#5a5a62', gatoL: '#b8b8c0' });
}

// la ventana gótica: máscara de los huecos (dos luces apuntadas y un óculo) dentro del arco mayor
function b_maskGotica(x0, x1, ys, yb, rA, ysL, rL, oc, mul) {
  const M = new Uint8Array(320 * 180), cx = (x0 + x1) / 2, en = (x, y, a, b, s, r) => y >= s ? x >= a && x <= b : Math.hypot(x - (a + r), y - s) <= r && Math.hypot(x - (b - r), y - s) <= r;
  for (let y = 0; y <= yb; y++) for (let x = x0; x <= x1; x++) {
    if (!en(x + 0.5, y + 0.5, x0, x1, ys, rA)) continue;
    const l1 = en(x + 0.5, y + 0.5, x0 + 3, cx - mul, ysL, rL), l2 = en(x + 0.5, y + 0.5, cx + mul, x1 - 3, ysL, rL), o = Math.hypot(x + 0.5 - cx, y + 0.5 - oc[1]) <= oc[0];
    M[y * 320 + x] = l1 || l2 || o ? 1 : 2;
  }
  return M;
}

const b_mascaras = new Map();

// el jardín de Chaucer por la ventana: cielo con nubes de tres tonos a tres velocidades, colinas, la torre de una iglesia, el
// seto, un majuelo en flor, la rama con las hojas que se mecen y los pájaros por parejas (s: escala de los pájaros)
function b_jardin(R, t, o, px, bx0, by0, bx1, by1, s, ramaY) {
  const P = b_palChaucer(), W = bx1 - bx0, Hh = by1 - by0, hor = by0 + Math.round(Hh * 0.62);
  for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) { const u = (y - by0) / Hh; px(x, y, u < 0.3 && b_b4(x, y) < (0.3 - u) * 2.5 ? P.cieloS : u > 0.45 && b_b4(x, y) < (u - 0.45) * 3 ? P.cieloL : P.cielo); }
  const NB = [hex('#a4bcd4'), hex('#e4eef8'), hex('#ffffff')];
  for (const [k, v, y, w] of [[0, 1.2, 0.12, 0.34], [1, 2.2, 0.28, 0.24], [2, 3.4, 0.4, 0.18]]) { const cx = bx0 + ((h(k, 1, 600) * W + t * v * s) % (W + 60)) - 30; b_nube(px, cx, by0 + Hh * y, W * w, NB); }
  for (let x = bx0; x <= bx1; x++) { const a = hor - Math.round(Hh * (0.08 + 0.05 * Math.sin(x * 0.04 / s + 1) + 0.03 * Math.sin(x * 0.11 / s))); for (let y = a; y <= hor + 2; y++) px(x, y, y === a ? hex('#b4cccc') : P.lejos); }
  { const tx = bx0 + Math.round(W * 0.3), ty = hor - Math.round(Hh * 0.22); for (let y = ty; y <= hor; y++) for (let i = -2 * s; i <= 2 * s; i++) px(tx + i, y, i < 0 ? hex('#c8c4b4') : hex('#a8a494')); for (let j = 0; j < 6 * s; j++) for (let i = -j / 3; i <= j / 3; i++) px(tx + i, ty - 6 * s + j, hex('#8a7a6a')); px(tx, ty + 3 * s, hex('#5a5a6a')); }
  for (let x = bx0; x <= bx1; x++) { const a = hor + Math.round(Hh * 0.03 * Math.sin(x * 0.07 / s)); for (let y = a; y <= by1; y++) px(x, y, y < a + 2 ? P.colina : h(x, y, 601) < 0.2 ? P.colinaS : y > hor + Hh * 0.18 ? P.hoja : P.colina); }
  for (let x = bx0; x <= bx1; x += 1) { const top = hor + Math.round(Hh * 0.1) + Math.round(Math.sin(x * 0.3) * 1.2); for (let y = top; y <= top + Math.round(Hh * 0.12); y++) px(x, y, h(x, y, 602) < 0.25 ? P.hojaL : h(x, y, 603) < 0.4 ? P.hojaS : P.hoja); }
  { const mx = bx0 + Math.round(W * 0.78), my = hor + Math.round(Hh * 0.04), r = Math.round(Hh * 0.13); px(mx, my + r, P.rama);
    for (let k = 0; k < 90 * s; k++) { const a = h(k, 1, 604) * Math.PI * 2, d = Math.sqrt(h(k, 2, 604)) * r, x = Math.round(mx + Math.cos(a) * d * 1.3 + Math.sin(t * 1.4 + k) * 0.5), y = Math.round(my + Math.sin(a) * d * 0.8); px(x, y, h(k, 3, 604) < 0.45 ? P.flor : h(k, 3, 604) < 0.7 ? P.florS : P.hojaS); }
    for (let y = my; y <= my + r * 1.6; y++) px(mx, y, P.ramaS); }
  // la rama y sus hojas, que se mecen con el viento
  const sw = (x) => Math.round(Math.sin(t * 1.3 + x * 0.05) * 1.2 * s);
  for (let x = bx0 + Math.round(W * 0.12); x <= bx1; x++) { const y = ramaY + Math.round((bx1 - x) * 0.12) + sw(x) * 0.5, g = Math.max(1, Math.round((x - bx0) / W * 2.4 * s)); for (let j = 0; j < g; j++) px(x, y + j, j === 0 ? hex('#7a5638') : P.ramaS); }
  for (let k = 0; k < 16 * s; k++) { const lx = bx0 + Math.round(W * (0.14 + h(k, 1, 605) * 0.84)), ly = ramaY + Math.round((bx1 - lx) * 0.12) + (k % 2 ? -1 : 2) * s + sw(lx), d = k % 2 ? -1 : 1;
    for (let i = 0; i < 3 * s; i++) for (let j = 0; j <= s; j++) px(lx + i * d, ly + d * Math.round(i * 0.6) + j - s, i === 0 ? P.hojaS : (i + k) % 3 ? P.hoja : P.hojaL);
    if (k % 4 === 1) { px(lx + d * 2 * s, ly - 2 * s, P.flor); px(lx + d * 2 * s + 1, ly - 2 * s, P.florS); } }
  // los pájaros por parejas: petirrojos, herrerillos y gorriones; uno solo espera y otro llega y se posa a su lado
  const TIP = [[hex('#7a5a3a'), hex('#e0622e'), hex('#5a4028'), hex('#2a2018')], [hex('#4a7ac0'), hex('#f0d040'), hex('#2e5a9a'), hex('#2a2a2a')], [hex('#8a6a48'), hex('#d8c8a8'), hex('#5a4430'), hex('#3a3028')]];
  const parejas = o.parejas ?? 3, pos = []; for (let p = 0; p < parejas; p++) pos.push(bx0 + Math.round(W * (0.22 + p * (0.66 / Math.max(1, parejas)))));
  pos.forEach((x, p) => { const y = (xx) => ramaY + Math.round((bx1 - xx) * 0.12) + sw(xx) - 1, T2 = TIP[p % 3];
    b_pajaro(px, x, y(x) - 2 * s + 1, t, 1, T2, s, false, p * 2); b_pajaro(px, x + 7 * s, y(x + 7 * s) - 2 * s + 1, t, -1, T2, s, false, p * 2 + 1);
    if (((t + p * 2.7) % 6) < 0.5 && s > 1) { const u = ((t + p * 2.7) % 6) / 0.5, hx = x + 4 * s, hy = y(x) - 6 * s - Math.round(u * 6); for (const [i, j] of [[-1, 0], [1, 0], [-2, -1], [-1, -1], [1, -1], [2, -1], [0, 1]]) px(hx + i, hy + j, hex('#e8406a')); px(hx, hy, hex('#e8406a')); } });
  if (o.llega !== false) { const xs = bx0 + Math.round(W * 0.9), ciclo = 7, u = (t % ciclo) / ciclo, y = (xx) => ramaY + Math.round((bx1 - xx) * 0.12) + sw(xx) - 1, T2 = TIP[0];
    b_pajaro(px, xs, y(xs) - 2 * s + 1, t, -1, T2, s, false, 9);
    if (u < 0.45) { const f = u / 0.45, fx = Math.round(bx0 - 10 + (xs - 7 * s - bx0 + 10) * f), fy = Math.round(by0 + Hh * 0.2 + (y(xs - 7 * s) - by0 - Hh * 0.2) * f * f); b_pajaro(px, fx, fy, t, 1, T2, s, true, 10); }
    else b_pajaro(px, xs - 7 * s, y(xs - 7 * s) - 2 * s + 1, t, 1, T2, s, false, 11); }
  // y una golondrina que cruza a lo lejos
  { const u = (t / 9) % 1, x = Math.round(bx1 + 10 - u * (W + 20)), y = Math.round(by0 + Hh * 0.18 + Math.sin(t * 2) * 3); px(x, y, hex('#2a2a3a')); px(x - 1, y - 1 + (Math.floor(t * 8) % 2) * 2, hex('#2a2a3a')); px(x + 1, y - 1 + (Math.floor(t * 8) % 2) * 2, hex('#2a2a3a')); }
}

// la piedra de la tracería, el derrame y la luz de la ventana gótica (sobre una máscara: 2 = piedra)
function b_traceria(R, M, x0, x1, yb, P) {
  for (let y = 0; y <= yb; y++) for (let x = x0; x <= x1; x++) { if (M[y * 320 + x] !== 2) continue;
    const ar = M[(y - 1) * 320 + x] === 1, ab = M[(y + 1) * 320 + x] === 1, iz = M[y * 320 + x - 1] === 1, de = M[y * 320 + x + 1] === 1;
    R.pset(x, y, ab || de ? P.piedraS : ar || iz ? P.piedraL : h(x, y, 610) < 0.08 ? P.piedraS : P.piedra); }
}

function b_chaucer(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palChaucer();
  if (cam === 'ventana') return b_chaucerVentana(R, t, o, P);
  const W0 = 182, W1 = 242, WY = 112;
  let M = b_mascaras.get('chaucer'); if (!M) { M = b_maskGotica(W0, W1, 70, WY, 60, 56, 24, [9, 32], 2); b_mascaras.set('chaucer', M); }
  b_fijo(R, 'amor-chaucer', () => {
    // el techo: vigas de roble y yeso entre ellas (tranquilo bajo la barra del año)
    rect(0, 0, 319, 15, P.yesoS); for (let x = 2; x < 320; x += 20) { rect(x, 0, x + 6, 11, P.robleS); rect(x, 0, x, 11, P.roble); } rect(0, 11, 319, 15, P.roble); rect(0, 11, 319, 11, P.robleL); rect(0, 15, 319, 15, P.robleD);
    // el yeso con el entramado de roble
    b_yeso(R, 0, 16, 319, 92, [P.yesoS, P.yeso, P.yesoL, P.yesoD], 620);
    const viga = (x0, y0, x1, y1) => { rect(x0, y0, x1, y1, P.roble); rect(x0, y0, x0, y1, P.robleL); rect(x1, y0, x1, y1, P.robleD); for (let y = y0; y <= y1; y++) if (h(x0, y, 621) < 0.2) pset(x0 + 1 + Math.floor(h(y, x0, 622) * (x1 - x0 - 1)), y, P.robleS); };
    viga(0, 16, 5, 92); viga(70, 16, 75, 92); viga(166, 16, 171, 92); viga(262, 16, 267, 92);
    rect(0, 88, 319, 93, P.roble); rect(0, 88, 319, 88, P.robleL); rect(0, 93, 319, 93, P.robleD);
    // el friso de madera de pliegues (linenfold)
    rect(0, 94, 319, 127, P.robleS);
    for (let x0 = 2; x0 < 318; x0 += 30) { rect(x0, 96, x0 + 26, 124, P.roble); rect(x0, 96, x0 + 26, 96, P.robleD); rect(x0, 124, x0 + 26, 124, P.robleL);
      for (let i = 3; i < 24; i++) { const f = (i - 3) % 5, c = f === 0 ? P.robleL : f === 1 ? hex('#7a5232') : f === 4 ? P.robleD : P.roble; for (let y = 100; y <= 120; y++) pset(x0 + i, y, c); }
      for (let i = 3; i < 24; i += 5) { pset(x0 + i + 1, 99, P.robleL); pset(x0 + i + 2, 99, P.robleL); pset(x0 + i + 1, 121, P.robleD); pset(x0 + i + 2, 121, P.robleD); } }
    rect(0, 125, 319, 127, P.robleD);
    // el suelo de tablas con la estera de junco bajo el pupitre
    b_suelo(R, 128, 179, b_tablas([P.robleD, P.robleS, hex('#7e5232'), P.robleL, hex('#6e4628')], 623, 0.45, 5), 3, 1, 88);
    for (let y = 142; y <= 172; y++) { const d = y - 88, ww = Math.round(60 * d / 70); for (let x = 108 - ww; x <= 108 + ww; x++) { const u = (x - 108) * 3 / d, z = 600 / d; const tr = (Math.floor(u * 6) + Math.floor(z * 3)) & 1;
      pset(x, y, Math.abs(x - 108) >= ww - 1 || y === 142 || y === 172 ? hex('#8a7040') : ((Math.floor(z * 12) + (tr ? 0 : 1)) & 1) ? hex('#c8aa6a') : hex('#b0924e')); } }
    // la librería con códices de broches, libros tumbados, rollos y un cesto
    rect(8, 26, 66, 128, P.robleD); rect(10, 28, 64, 126, hex('#3a2414'));
    for (const sy of [48, 72, 96, 120]) { rect(8, sy, 66, sy + 3, P.roble); rect(8, sy, 66, sy, P.robleL); rect(8, sy + 3, 66, sy + 3, P.robleD); }
    const CL = [hex('#8a2a22'), hex('#5a3a22'), hex('#2e4a6a'), hex('#3e5a2e'), hex('#7a5a2a'), hex('#6a2a4a')];
    [[30, 48], [52, 72], [76, 96]].forEach(([y0, y1], f) => { let x = 12; while (x < 60) { const w = 4 + Math.floor(h(x, f, 624) * 4), hh = y1 - y0 - 4 - Math.floor(h(x, f, 625) * 6), c = CL[Math.floor(h(x, f, 626) * 6)];
      if (h(x, f, 627) < 0.18) { for (let k = 0; k < 3; k++) { const c2 = CL[(k + f) % 6]; rect(x, y1 - 4 - k * 4, x + 14, y1 - 1 - k * 4, c2); rect(x, y1 - 4 - k * 4, x + 14, y1 - 4 - k * 4, b_mezcla(c2, C.blanco, 0.3)); rect(x + 14, y1 - 3 - k * 4, x + 14, y1 - 1 - k * 4, P.perg); } x += 16; continue; }
      rect(x, y1 - hh, x + w - 1, y1 - 1, c); rect(x, y1 - hh, x, y1 - 1, b_mezcla(c, C.blanco, 0.3)); rect(x + w - 1, y1 - hh, x + w - 1, y1 - 1, b_mezcla(c, B_K, 0.4));
      rect(x, y1 - hh + 3, x + w - 1, y1 - hh + 3, P.laton); rect(x, y1 - 5, x + w - 1, y1 - 5, P.laton); pset(x + (w >> 1), y1 - (hh >> 1), P.latonL); x += w + (h(x, f, 628) < 0.2 ? 2 : 0); } });
    for (let k = 0; k < 7; k++) { const rx = 13 + (k % 4) * 12, ry = 116 - Math.floor(k / 4) * 6; rect(rx, ry - 2, rx + 9, ry + 2, P.perg); rect(rx, ry + 2, rx + 9, ry + 2, P.pergS); disco(rx, ry, 2, P.pergS); pset(rx, ry, P.perg); rect(rx + 4, ry - 2, rx + 4, ry + 2, P.rojo); }
    // el tapiz de mil flores con el árbol y los dos pájaros
    rect(80, 24, 160, 25, P.robleD); disco(80, 24, 2, P.laton); disco(160, 24, 2, P.laton);
    for (let y = 26; y <= 86; y++) for (let x = 82; x <= 158; x++) { const borde = x < 85 || x > 155 || y < 29 || y > 83; let c = borde ? (((x + y) >> 1) & 1 ? P.rojo : P.rojoS) : h(x >> 2, y >> 2, 628) < 0.3 ? P.tapizS : P.tapiz;
      if (!borde) { const f = h(x >> 1, y >> 1, 629); if (f < 0.018 && (x + y) % 2) c = P.flor; else if (f > 0.985 && (x + y) % 2) c = hex('#e0c050'); else if (f > 0.97 && f <= 0.985 && (x & 1)) c = hex('#c84a4a'); }
      if (Math.sin(x * 0.5) > 0.92) c = b_mezcla(c, B_K, 0.2); pset(x, y + (y > 82 ? Math.round(Math.sin(x * 0.4)) : 0), c); }
    for (let x = 82; x <= 158; x += 2) linea(x, 87, x, 89 + (x % 4 ? 0 : 1), P.rojo);
    for (let y = 48; y <= 80; y++) pset(120, y, P.rama); disco(120, 44, 9, P.hojaS); disco(119, 42, 7, P.hoja); for (let k = 0; k < 10; k++) pset(114 + Math.floor(h(k, 1, 630) * 12), 37 + Math.floor(h(k, 2, 630) * 12), k % 2 ? P.flor : hex('#e05a3a'));
    b_pajaro(R.pset, 106, 76, 0, 1, [hex('#e8dcc0'), hex('#f0e4c8'), hex('#c8b898'), hex('#d0a040')], 2, false, 0); b_pajaro(R.pset, 134, 76, 0, -1, [hex('#e8dcc0'), hex('#f0e4c8'), hex('#c8b898'), hex('#d0a040')], 2, false, 0);
    // la ventana: el marco de piedra, el derrame, las contraventanas abiertas y el alféizar
    for (let y = 8; y <= WY + 4; y++) for (let x = W0 - 5; x <= W1 + 5; x++) { if (M[y * 320 + x]) continue; const cx = (W0 + W1) / 2;
      const d = y >= 70 ? Math.max(W0 - x, x - W1) : Math.max(Math.hypot(x - (W1 - 60), y - 70) - 60, Math.hypot(x - (W0 + 60), y - 70) - 60); if (d > 5 || (y > WY && y > WY + 4)) continue; pset(x, y, d < 1 ? P.piedraS : d > 4 ? P.piedraS : (x < cx ? P.piedraL : P.piedra)); }
    b_traceria(R, M, W0, W1, WY, P);
    rect(W0 - 6, WY + 1, W1 + 6, WY + 5, P.piedra); rect(W0 - 6, WY + 1, W1 + 6, WY + 1, P.piedraL); rect(W0 - 6, WY + 5, W1 + 6, WY + 5, P.piedraS);
    for (const [sx0, sx1] of [[W0 - 22, W0 - 8], [W1 + 8, W1 + 22]]) { b_madera(R, sx0, 46, sx1, 110, P.roble, P.robleS, P.robleL, P.robleD, sx0, 64); for (let x = sx0 + 3; x < sx1; x += 4) rect(x, 47, x, 109, P.robleS); for (const hy of [54, 100]) { rect(sx0, hy, sx1, hy + 1, B_K); pset(sx0 + 2, hy, P.latonS); } rect(sx0, 46, sx1, 46, P.robleL); }
    // el haz de sol que entra por la ventana y cae en el suelo
    b_haz(R, [[W0, WY + 6], [W1, WY + 6], [W1 - 40, 168], [W0 - 64, 168]], hex('#fff2c8'), 0.14);
    b_haz(R, [[W0 - 52, 150], [W1 - 46, 150], [W1 - 40, 168], [W0 - 64, 168]], hex('#fff6d8'), 0.2);
    // el arcón con herrajes y el laúd apoyado
    rect(258, 118, 312, 146, P.robleS); b_madera(R, 259, 124, 311, 145, P.roble, P.robleS, P.robleL, P.robleD, 631, 7); rect(256, 116, 314, 123, P.roble); rect(256, 116, 314, 116, P.robleL); rect(256, 123, 314, 123, P.robleD);
    for (const bx of [264, 284, 304]) { rect(bx, 116, bx + 2, 146, hex('#3a3a42')); pset(bx, 118, hex('#8a8a96')); pset(bx, 130, hex('#8a8a96')); pset(bx, 142, hex('#8a8a96')); }
    rect(281, 126, 289, 132, hex('#3a3a42')); rect(282, 127, 288, 131, P.latonS); pset(285, 129, B_K); rect(258, 146, 312, 147, P.robleD);
    // el astrolabio colgado de un clavo (la red gira en cada fotograma)
    pset(174, 32, B_K); linea(174, 33, 174, 37, P.latonS);
  });
  // la vida: el jardín por la ventana (nubes, rama, pájaros), el astrolabio que gira, motas en el haz y el gato del arcón
  b_jardin(R, t, o, b_enMascara(R, M), W0, 10, W1, WY, 1, 70);
  { const ax = 174, ay = 46, a = t * 0.25; disco(ax, ay, 8, P.latonS); disco(ax, ay, 7, P.laton); disco(ax, ay, 5, hex('#a07a2a')); pset(ax - 4, ay - 4, P.latonL); pset(ax - 5, ay - 2, P.latonL); rect(ax - 1, ay - 10, ax + 1, ay - 8, P.laton);
    for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; linea(ax, ay, Math.round(ax + Math.cos(an) * 5), Math.round(ay + Math.sin(an) * 5), P.latonL); } linea(Math.round(ax - Math.cos(-a) * 6), Math.round(ay - Math.sin(-a) * 6), Math.round(ax + Math.cos(-a) * 6), Math.round(ay + Math.sin(-a) * 6), hex('#3a2a10')); pset(ax, ay, B_K); }
  b_motas(R, t, W0 - 50, W1 - 20, WY + 8, 166, 14, hex('#fff6d8'), -0.5);
  { const gx = 272, gy = 115, res = Math.sin(t * 2.2) > 0 ? 1 : 0; for (let j = 0; j < 5; j++) rect(gx - 7 + (j === 0 ? 2 : 0), gy - j - res * (j > 1 ? 1 : 0), gx + 7 - (j === 0 ? 2 : 0), gy - j, j < 2 ? P.gatoS : P.gato);
    rect(gx + 4, gy - 8, gx + 9, gy - 4, P.gato); pset(gx + 5, gy - 9, P.gatoS); pset(gx + 8, gy - 9, P.gatoS); rect(gx + 6, gy - 6, gx + 7, gy - 6, P.gatoS); rect(gx - 5, gy - 4, gx + 2, gy - 4, P.gatoL);
    for (let i = 0; i < 8; i++) pset(gx - 8 - Math.round(i * 0.4), gy - Math.round(Math.max(0, i - 3) * (0.4 + 0.4 * Math.sin(t * 1.6))), P.gatoS);
    if ((t % 5) < 2.5) { const u = (t % 2.5) / 2.5; pset(gx + 11 + Math.round(u * 3), gy - 12 - Math.round(u * 6), hex('#d8d8e4')); } }
  return { suelo: 150, mesa: [54, 158, 139], ventana: [W0, 18, W1, WY], alfeizar: WY + 1, libreria: [8, 26, 66, 128], tapiz: [80, 24, 160, 89], arcon: [256, 116, 314, 147], libre: [[150, 256]] };
}

// la ventana de Chaucer de cerca
function b_chaucerVentana(R, t, o, P) {
  const { rect, pset, linea } = R, W0 = 96, W1 = 224, WY = 132, YS = 110, RA = 96;
  let M = b_mascaras.get('chaucerV'); if (!M) { M = b_maskGotica(W0, W1, YS, WY, RA, 84, 40, [12, 42], 4); b_mascaras.set('chaucerV', M); }
  b_fijo(R, 'amor-chaucerV', () => {
    b_yeso(R, 0, 0, 319, 150, [P.yesoS, P.yeso, P.yesoL, P.yesoD], 640);
    const viga = (x0, y0, x1, y1) => { rect(x0, y0, x1, y1, P.roble); rect(x0, y0, x0, y1, P.robleL); rect(x1, y0, x1, y1, P.robleD); for (let y = y0; y <= y1; y++) if (h(x0, y, 641) < 0.25) pset(x0 + 1 + Math.floor(h(y, x0, 642) * (x1 - x0 - 1)), y, P.robleS); };
    viga(14, 0, 22, 150); viga(0, 144, 319, 150);
    for (let y = 8; y <= WY + 8; y++) for (let x = W0 - 8; x <= W1 + 8; x++) { if (M[y * 320 + x]) continue; const d = y >= YS ? Math.max(W0 - x, x - W1) : Math.max(Math.hypot(x - (W1 - RA), y - YS) - RA, Math.hypot(x - (W0 + RA), y - YS) - RA); if (d > 7) continue; pset(x, y, d < 1.5 || d > 6 ? P.piedraS : x < 160 ? P.piedraL : P.piedra); }
    b_traceria(R, M, W0, W1, WY, P);
    // el alféizar hondo de piedra con el libro, el tintero y la maceta de romero
    rect(W0 - 12, WY + 1, W1 + 12, WY + 9, P.piedra); rect(W0 - 12, WY + 1, W1 + 12, WY + 2, P.piedraL); rect(W0 - 12, WY + 9, W1 + 12, WY + 10, P.piedraS); for (let x = W0 - 10; x < W1 + 10; x += 17) rect(x, WY + 3, x, WY + 9, P.piedraS);
    rect(104, WY - 3, 134, WY, hex('#7a2a22')); rect(104, WY - 3, 134, WY - 3, hex('#a84a3a')); rect(106, WY - 5, 132, WY - 4, P.perg); rect(119, WY - 5, 119, WY - 4, P.pergS); rect(134, WY - 2, 135, WY - 1, P.laton);
    rect(184, WY - 5, 190, WY, hex('#3a3040')); rect(185, WY - 6, 189, WY - 6, hex('#5a5060')); linea(188, WY - 6, 196, WY - 20, hex('#f0ece0')); linea(189, WY - 6, 197, WY - 19, hex('#c8c0b0'));
    rect(206, WY - 6, 216, WY, hex('#a8583a')); rect(206, WY - 6, 216, WY - 6, hex('#c87a5a')); for (let k = 0; k < 14; k++) linea(211, WY - 7, 205 + k, WY - 14 - (k % 3) * 2, k % 2 ? P.hojaS : P.hoja);
    // las contraventanas abiertas contra la pared
    for (const [sx0, sx1] of [[44, 82], [238, 274]]) { b_madera(R, sx0, 40, sx1, 138, P.roble, P.robleS, P.robleL, P.robleD, sx0, 98); for (let x = sx0 + 4; x < sx1; x += 6) rect(x, 41, x, 137, P.robleS); for (const hy of [52, 124]) { rect(sx0, hy, sx1, hy + 2, hex('#2e2e36')); pset(sx0 + 3, hy + 1, hex('#8a8a96')); pset(sx1 - 3, hy + 1, hex('#8a8a96')); } }
    // el suelo de tablas
    b_suelo(R, 151, 179, b_tablas([P.robleD, P.robleS, hex('#7e5232'), P.robleL, hex('#6e4628')], 643, 0.4, 5), 3, 1, 110);
    b_haz(R, [[W0, 151], [W1, 151], [W1 - 30, 179], [W0 - 50, 179]], hex('#fff2c8'), 0.16);
  });
  b_jardin(R, t, o, b_enMascara(R, M), W0, 20, W1, WY, 2, 82);
  b_motas(R, t, W0 - 30, W1, 150, 176, 12, hex('#fff6d8'), -0.4);
  return { suelo: 166, ventana: [W0, 20, W1, WY], alfeizar: WY + 1, rama: [W0 + 16, W1, 82], libre: [[20, 96], [224, 300]] };
}

// el pupitre de Chaucer, delante de él: tablero inclinado con el pergamino, el cuerno de tinta y la pluma, la vela y el reloj de arena
function b_chaucerDelante(R, t, o, cam) {
  if (cam === 'ventana') return;
  const { rect, pset, linea, poligono, disco } = R, P = b_palChaucer();
  for (const lx of [62, 146]) { rect(lx, 153, lx + 5, 168, P.robleS); rect(lx, 153, lx, 168, P.roble); rect(lx + 5, 153, lx + 5, 168, P.robleD); rect(lx - 1, 167, lx + 6, 168, P.robleD); }
  rect(60, 162, 152, 164, P.robleS); rect(60, 162, 152, 162, P.roble);
  b_madera(R, 58, 146, 154, 154, P.roble, P.robleS, P.robleL, P.robleD, 650, 5);
  for (let x = 66; x < 150; x += 14) { rect(x, 148, x, 153, P.robleD); rect(x + 1, 148, x + 1, 153, P.robleL); pset(x + 4, 148, P.robleD); pset(x + 5, 147, P.robleD); }
  poligono([[56, 139], [156, 139], [158, 146], [54, 146]], P.roble); linea(56, 139, 156, 139, P.robleL); linea(54, 146, 158, 146, P.robleD);
  for (let x = 58; x < 156; x += 9) pset(x, 142, P.robleS);
  poligono([[78, 138], [126, 138], [128, 145], [76, 145]], P.perg); linea(76, 145, 128, 145, P.pergS);
  for (let k = 0; k < 4; k++) for (let x = 82 + (k === 0 ? 4 : 0); x < 122; x++) if (h(x, k, 651) < 0.62) pset(x, 140 + k + (k > 1 ? 1 : 0), hex('#5a4030'));
  rect(82, 139, 84, 140, P.rojo); rect(83, 141, 84, 141, hex('#3a5a8a'));
  // el cuerno de tinta en su agujero y la pluma
  linea(134, 141, 141, 135, hex('#d8c8a8')); linea(135, 141, 142, 136, hex('#a89878')); rect(133, 141, 136, 143, B_K); linea(126, 131, 135, 141, hex('#f6f2e8')); linea(125, 132, 134, 141, hex('#c8c0b0')); pset(126, 130, C.blanco);
  // el reloj de arena (la arena cae)
  { const x = 146, y = 127, u = (t / 12) % 1; rect(x - 4, y, x + 4, y + 1, P.robleD); rect(x - 4, y + 12, x + 4, y + 13, P.robleD); rect(x - 4, y + 1, x - 4, y + 12, P.roble); rect(x + 4, y + 1, x + 4, y + 12, P.roble);
    for (let j = 0; j < 10; j++) { const w = Math.abs(j - 4.5) < 1 ? 0 : Math.round(Math.abs(j - 4.5) * 0.6); for (let i = -w; i <= w; i++) pset(x + i, y + 2 + j, hex('#d8e4ec')); }
    const arriba = Math.round(4 * (1 - u)); for (let j = 0; j < arriba; j++) { const w = Math.round((4.5 - (j + 4 - arriba)) * 0.6); for (let i = -w; i <= w; i++) pset(x + i, y + 6 - j, hex('#e0c070')); }
    for (let j = 0; j < Math.round(4 * u) + 1; j++) { const w = Math.round((j + 0.5) * 0.6) + 1; for (let i = -w; i <= w; i++) pset(x + i, y + 11 - j, hex('#e0c070')); } pset(x, y + 7, hex('#e0c070')); pset(x, y + 8 + (Math.floor(t * 8) % 2), hex('#e0c070')); }
  // la vela en su pincho, con la cera que gotea
  rect(64, 133, 67, 138, hex('#2e2a2a')); rect(62, 138, 69, 139, hex('#3e3a3a')); rect(64, 123, 67, 132, hex('#f4ecd4')); rect(67, 123, 67, 132, hex('#cfc4a4')); rect(64, 127, 64, 131, hex('#fffaf0')); pset(64, 133, hex('#f4ecd4'));
  b_llama(R, 65, 122, t, 2, 1.3, 30);
}

function b_palTorre() {
  return pal({ piedra: '#8a8a90', piedraS: '#5e5e66', piedraL: '#b2b0b4', llaga: '#3e3c44', piedra2: '#7a7880', roble: '#6a4a2e', robleS: '#46301c', robleL: '#8c6640', robleD: '#2a1c10', hierro: '#3a3a42', hierroL: '#7a7a86',
    cielo: '#c8d4dc', cieloL: '#e4e8e6', cieloS: '#a4b4c4', agua: '#5a7484', aguaS: '#3e5664', aguaL: '#9ab4c0', orilla: '#6e6a5a', casa: '#a89878', casaS: '#7a6a54', tejado: '#6a3a2e',
    paja: '#d8b860', pajaS: '#a8883a', manta: '#8a3a2e', mantaS: '#5e241a', lis: '#2e3e7a', lisS: '#1e2a5a', oro: '#e0b84a', perg: '#efe2c0', pergS: '#cdb88a', lacre: '#b8202a', fuego: '#ffb050' });
}

// el río por el ventanuco: cielo de nubes, la otra orilla con casas y una aguja, el agua que corre, una coca con su vela y gaviotas
function b_rio(R, t, x0, y0, x1, y1, s = 1) {
  const { pset, linea } = R, P = b_palTorre(), W = x1 - x0, Hh = y1 - y0, hor = y0 + Math.round(Hh * 0.55);
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= hor; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (hor - y0); pset(x, y, u > 0.6 && b_b4(x, y) < (u - 0.6) * 2 ? P.cieloL : u < 0.25 && b_b4(x, y) < 0.3 ? P.cieloS : P.cielo); }
  const NB = [hex('#9aa8b8'), hex('#d0d8e0'), hex('#f4f6f6')];
  for (const [k, v, yy, w] of [[0, 1, 0.12, 0.5], [1, 2, 0.28, 0.32]]) b_nube(pset, x0 + ((h(k, 1, 660) * W + t * v * s) % (W + 50)) - 25, y0 + Hh * yy, W * w, NB);
  // la otra orilla: tejados, casas con ventanitas, una aguja de iglesia y humo
  for (let x = x0; x <= x1; x++) { const k = Math.floor((x - x0) / (7 * s)), alto = Math.round((5 + h(k, 1, 661) * 6) * s), techo = hor - alto; for (let y = techo; y <= hor; y++) pset(x, y, y - techo < 2 * s ? P.tejado : (x - x0) % (7 * s) === 0 ? P.casaS : P.casa); if ((x - x0) % (7 * s) === 3 * s) pset(x, techo + 3 * s, h(k, 2, 661) < 0.4 ? hex('#f0d080') : P.casaS); }
  { const sx = x0 + Math.round(W * 0.68); for (let j = 0; j < 16 * s; j++) for (let i = -Math.floor(j / 8); i <= Math.floor(j / 8); i++) pset(sx + i, hor - 22 * s + j, j > 12 * s ? P.casa : hex('#6a6070')); }
  b_humo(R, x0 + Math.round(W * 0.25), hor - 8 * s, t, 1, 14 * s, hex('#d8dce0'), 0.5);
  for (let x = x0; x <= x1; x++) pset(x, hor + 1, P.orilla);
  // el agua que corre, con los reflejos
  for (let y = hor + 2; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = Math.sin(x * 0.35 / s + t * 2.2 + y * 1.3) + Math.sin(x * 0.13 / s - t * 1.4 + y * 0.6); pset(x, y, w > 1.25 ? P.aguaL : w < -1.1 ? P.aguaS : P.agua); }
  // la coca que pasa, con su vela
  { const u = (t / 30) % 1, bx = Math.round(x1 + 20 * s - u * (W + 50 * s)), by = hor + Math.round(3 * s) + Math.round(Math.sin(t * 1.5) * 0.5);
    for (let j = 0; j < 3 * s; j++) linea(bx - 7 * s + j, by + j, bx + 7 * s - j, by + j, j === 0 ? hex('#8a6440') : hex('#5a3e24'));
    linea(bx, by - 1, bx, by - 13 * s, hex('#3a2a1a')); for (let j = 0; j < 10 * s; j++) linea(bx + 1, by - 12 * s + j, bx + Math.round((5 - Math.abs(j - 5 * s) * 0.3) * s), by - 12 * s + j, j % 3 ? hex('#efe6d0') : hex('#d4c8a8'));
    pset(bx, by - 14 * s, hex('#b8202a')); }
  // las gaviotas
  for (let k = 0; k < 2; k++) { const a = t * (0.6 + k * 0.2) + k * 3, gx = Math.round(x0 + W * (0.3 + 0.4 * ((Math.sin(a * 0.5) + 1) / 2))), gy = Math.round(y0 + Hh * (0.25 + 0.1 * k) + Math.sin(a) * 2), al = Math.floor(t * 6 + k) % 2;
    pset(gx, gy, C.blanco); pset(gx - 1, gy - al, hex('#e8ecf0')); pset(gx + 1, gy - al, hex('#e8ecf0')); pset(gx - 2, gy - 1 + al, hex('#9aa4b0')); pset(gx + 2, gy - 1 + al, hex('#9aa4b0')); }
  R.recorte(null);
}

function b_torre(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palTorre(), PS = [P.llaga, P.piedraS, P.piedra, P.piedraL, P.piedra2];
  if (cam === 'mesa') return b_torreMesa(R, t, o, P, PS);
  const WX0 = 212, WX1 = 240, WY0 = 46, WY1 = 92;
  b_fijo(R, 'amor-torre', () => {
    b_sillares(R, 0, 0, 319, 129, 11, 14, 30, PS, 670);
    // la bóveda en sombra arriba (la barra del año y la zona de Atom quedan tranquilas)
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if (b_b4(x, y) < (1 - y / 30) * 0.85) b_tinte(R, x, y, hex('#2a2a32'), 0.55);
    // el suelo de losas con paja
    b_suelo(R, 130, 179, b_losas([hex('#3a3840'), P.piedraS, hex('#7a7680'), P.piedraL, hex('#6e6a74')], 671, 1.3), 3, 1, 90);
    for (let k = 0; k < 140; k++) { const y = 131 + Math.floor(h(k, 1, 672) ** 0.8 * 48), x = Math.floor(h(k, 2, 672) * 320), L = 2 + Math.floor((y - 130) / 14), d = h(k, 3, 672) < 0.5 ? 1 : -1; linea(x, y, x + L * d, y - (h(k, 4, 672) < 0.5 ? 1 : 0), h(k, 5, 672) < 0.5 ? P.paja : P.pajaS); }
    rect(0, 128, 319, 130, P.llaga);
    // el ventanuco en derrame: los costados de piedra con luz y sombra, el alféizar inclinado y el arco
    poligono([[192, 30], [WX0, WY0 - 6], [WX0, WY1], [192, 108]], P.piedraL); poligono([[260, 30], [WX1, WY0 - 6], [WX1, WY1], [260, 108]], P.piedraS); poligono([[192, 108], [260, 108], [WX1, WY1], [WX0, WY1]], hex('#c8c6c4'));
    for (let y = 30; y < 108; y += 6) { linea(192, y, WX0, WY0 - 6 + Math.round((y - 30) * (WY1 - WY0 + 6) / 78), P.piedra); linea(260, y, WX1, WY0 - 6 + Math.round((y - 30) * (WY1 - WY0 + 6) / 78), P.llaga); }
    for (let y = 18; y <= 40; y++) for (let x = 190; x <= 262; x++) { const d = Math.hypot(x - 226, (y - 40) * 1.6); if (d < 36 && d > 14 && y < 40) pset(x, y, d > 34 ? P.llaga : (x < 226 ? P.piedraL : P.piedraS)); }
    for (let a = 0; a < 15; a++) { const an = Math.PI + a / 14 * Math.PI; linea(Math.round(226 + Math.cos(an) * 22), Math.round(40 + Math.sin(an) * 14), Math.round(226 + Math.cos(an) * 34), Math.round(40 + Math.sin(an) * 21), P.llaga); }
    rect(190, 108, 262, 110, P.llaga);
    // la puerta de roble con clavos, bisagras, la aldaba y la rejilla
    for (let y = 46; y <= 128; y++) for (let x = 12; x <= 64; x++) { const d = y < 66 ? Math.hypot(x - 38, (y - 66) * 1.3) : Math.abs(x - 38); if (d > 26) continue; pset(x, y, d > 23 ? ((y + (x >> 2)) % 8 === 0 ? P.llaga : x < 38 ? P.piedraL : P.piedra) : B_K); }
    for (let y = 52; y <= 128; y++) for (let x = 16; x <= 60; x++) { const d = y < 66 ? Math.hypot(x - 38, (y - 66) * 1.3) : Math.abs(x - 38); if (d > 21) continue; const tb = (x - 16) % 9; pset(x, y, tb === 0 ? P.robleD : tb === 1 ? P.robleL : h(x, y >> 2, 673) < 0.12 ? P.robleS : P.roble); }
    for (let y = 72; y <= 124; y += 8) for (let x = 20; x <= 56; x += 9) { pset(x + 3, y, P.hierroL); pset(x + 4, y + 1, P.hierro); }
    for (const by of [74, 114]) { rect(17, by, 44, by + 2, P.hierro); rect(17, by, 44, by, P.hierroL); disco(44, by + 1, 2, P.hierro); }
    disco(52, 100, 3, P.hierro); disco(52, 100, 2, P.robleS); pset(51, 98, P.hierroL);
    rect(30, 62, 46, 76, P.hierro); rect(31, 63, 45, 75, hex('#1a1214'));
    rect(0, 129, 319, 129, P.llaga);
    // el tapiz azul de lises
    rect(74, 26, 124, 27, P.robleD);
    for (let y = 28; y <= 82; y++) for (let x = 76; x <= 122; x++) { const b = x < 79 || x > 119 || y > 79; let c = b ? P.oro : b_b4(x, y) < 0.18 ? P.lisS : P.lis; const cx = ((x - 79) % 12) - 6, cy = ((y - 28) % 14) - 7;
      if (!b && ((Math.abs(cx) <= 1 && cy >= -4 && cy <= 3) || (Math.abs(cx) === 2 && cy >= -2 && cy <= 0) || (Math.abs(cx) === 3 && cy === -1) || (cy === 1 && Math.abs(cx) <= 2))) c = P.oro; if (Math.sin(x * 0.45) > 0.93) c = b_mezcla(c, B_K, 0.25); pset(x, y, c); }
    for (let x = 76; x <= 122; x += 2) pset(x, 83, P.oro);
    // la repisa con jarra, cuenco y un libro
    rect(130, 92, 176, 95, P.roble); rect(130, 92, 176, 92, P.robleL); rect(130, 95, 176, 95, P.robleD); for (const bx of [134, 170]) linea(bx, 96, bx + 3, 100, P.robleS);
    { const x = 140; for (let y = 80; y <= 91; y++) { const w = y < 83 ? 2 : Math.round(3 + Math.sin((y - 82) / 9 * Math.PI) * 1.5); rect(x - w, y, x + w, y, hex('#a8704a')); pset(x - w, y, hex('#c89068')); pset(x + w, y, hex('#704028')); } linea(x + 4, 82, x + 6, 88, hex('#704028')); }
    rect(150, 87, 160, 91, hex('#c8bca0')); rect(150, 87, 160, 87, hex('#e8e0c8')); rect(164, 84, 174, 91, hex('#5a2a22')); rect(164, 84, 174, 84, hex('#7a4a3a')); rect(174, 85, 174, 90, P.perg);
    // las rayas de los días y el corazón con un escudo, grabados en la piedra
    for (let g = 0; g < 7; g++) { const gx = 262 + (g % 4) * 13, gy = 92 + Math.floor(g / 4) * 14; for (let i = 0; i < 4; i++) { linea(gx + i * 2, gy, gx + i * 2, gy + 8, hex('#c8c8cc')); pset(gx + i * 2 + 1, gy + 3, P.piedraS); } linea(gx - 1, gy + 7, gx + 7, gy + 1, hex('#c8c8cc')); }
    for (const [i, j] of [[-3, -1], [-2, -2], [-1, -2], [0, -1], [1, -2], [2, -2], [3, -1], [3, 0], [2, 1], [1, 2], [0, 3], [-1, 2], [-2, 1], [-3, 0]]) pset(290 + i, 80 + j, hex('#d8d6d8'));
    // el camastro de paja con la manta de lana y la almohada
    rect(248, 134, 252, 148, P.robleS); rect(312, 134, 316, 148, P.robleS); rect(246, 130, 318, 135, P.roble); rect(246, 130, 318, 130, P.robleL); rect(246, 135, 318, 135, P.robleD);
    for (let x = 248; x < 316; x++) for (let y = 124; y < 130; y++) pset(x, y, h(x, y, 674) < 0.3 ? P.pajaS : P.paja);
    for (let y = 120; y <= 131; y++) for (let x = 270; x <= 316; x++) { const top = 121 + Math.round(Math.sin((x - 270) * 0.2) * 1.2); if (y < top) continue; pset(x, y, (x - 270) % 8 < 2 ? P.mantaS : y === top ? hex('#b05a48') : P.manta); }
    rect(250, 118, 266, 125, hex('#e8e0cc')); rect(250, 124, 266, 125, hex('#c4b89c')); pset(251, 118, C.blanco);
    // el arcón y el taburete
    rect(70, 112, 104, 130, P.robleS); b_madera(R, 71, 117, 103, 129, P.roble, P.robleS, P.robleL, P.robleD, 675, 6); rect(68, 110, 106, 116, P.roble); rect(68, 110, 106, 110, P.robleL); for (const bx of [74, 98]) rect(bx, 110, bx + 1, 130, P.hierro);
    rect(84, 120, 90, 125, P.hierro); pset(87, 122, P.oro);
    // la luz del ventanuco en el suelo
    b_haz(R, [[WX0 - 6, 110], [WX1 + 6, 110], [190, 172], [140, 172]], hex('#e8f0f4'), 0.12);
    b_haz(R, [[146, 150], [196, 150], [190, 172], [140, 172]], hex('#f4f8fa'), 0.2);
  });
  // la vida: el río por el ventanuco, los barrotes, la antorcha tras la rejilla, el guardia que pasa, el polvo y el ratón
  b_rio(R, t, WX0, WY0 - 14, WX1, WY1, 1);
  for (let y = WY0 - 14; y <= WY0; y++) for (let x = WX0; x <= WX1; x++) if (Math.hypot(x - 226, (y - WY0) * 1) > 14) pset(x, y, x < 226 ? P.piedraL : P.piedraS);
  for (const bx of [218, 226, 234]) { rect(bx, WY0 - 12, bx + 1, WY1, P.hierro); pset(bx, WY0 - 12, P.hierroL); for (let y = WY0 - 10; y < WY1; y += 7) pset(bx, y, P.hierroL); }
  rect(WX0, 68, WX1, 69, P.hierro); rect(WX0, 68, WX1, 68, P.hierroL);
  { const f = 0.5 + 0.5 * Math.sin(t * 9) * Math.sin(t * 5.3 + 1); for (let y = 63; y <= 75; y++) for (let x = 31; x <= 45; x++) { const d = Math.hypot(x - 36, y - 68) / 9; if (d < 1 && b_b4(x, y) < (1 - d) * (0.6 + f * 0.4)) pset(x, y, d < 0.4 ? hex('#ffd890') : hex('#b0602a')); }
    const u = (t % 11) / 11; if (u < 0.3) { const gx = Math.round(26 + u / 0.3 * 26); R.recorte([31, 63, 45, 75]); disco(gx, 72, 5, hex('#3a3a46')); disco(gx, 71, 4, hex('#6a6a7a')); pset(gx - 2, 68, hex('#a8a8b8')); linea(gx - 7, 72, gx + 7, 72, hex('#5a5a6a')); R.recorte(null); }
    for (const bx of [34, 38, 42]) rect(bx, 63, bx, 75, P.hierro); rect(31, 69, 45, 69, P.hierro); }
  b_reflejos(R, t, 196, 50, 211, 104, 0.6);
  b_motas(R, t, 150, 230, 96, 170, 14, hex('#f0f4f8'), -0.6);
  { const u = (t % 10) / 10; if (u < 0.35) { const f = u / 0.35, mx = Math.round(108 + f * 140), my = 128 - (Math.floor(t * 12) % 2), d = 1; if (mx < 246) { rect(mx, my - 2, mx + 4, my, hex('#6a6068')); pset(mx + 5, my - 1, hex('#8a8088')); pset(mx + 5, my - 2, hex('#e0a0a8')); pset(mx + 4, my - 3, hex('#8a8088')); pset(mx + 6, my - 1, B_K); for (let i = 1; i <= 4; i++) pset(mx - i, my - Math.round(Math.sin(i + t * 10) * 0.6), hex('#a07880')); } } }
  return { suelo: 150, mesa: [108, 198, 136], ventana: [WX0, WY0 - 14, WX1, WY1], puerta: [17, 46, 59, 128], camastro: [246, 118, 318, 148], arcon: [68, 110, 106, 130], rayas: [260, 90, 312, 114], libre: [[60, 108], [198, 246]] };
}

// los reflejos del agua del río que tiemblan en la piedra (bandas claras que se mueven dentro del rectángulo)
function b_reflejos(R, t, x0, y0, x1, y1, a = 1) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = Math.sin(x * 0.42 + Math.sin(y * 0.3 + t * 1.7) * 2.2 + t * 2.4) + Math.sin(y * 0.55 - t * 1.9 + x * 0.1);
    const borde = Math.min(x - x0, x1 - x, y - y0, y1 - y) / 10; if (w > 1.35 && b_b4(x, y) < Math.min(1, borde) * 0.9) b_tinte(R, x, y, hex('#e8f4ff'), 0.22 * a); }
}

// la mesa de la celda de cerca: detrás, la pared con el ventanuco al río y las rayas; el tablero lo pinta torreDelante
function b_torreMesa(R, t, o, P, PS) {
  const { rect, pset, linea, disco } = R, X0 = 34, X1 = 86, Y0 = 24, Y1 = 84;
  b_fijo(R, 'amor-torreM', () => {
    b_sillares(R, 0, 0, 319, 142, 16, 22, 44, PS, 680);
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) if (b_b4(x, y) < (1 - y / 26) * 0.8) b_tinte(R, x, y, hex('#2a2a32'), 0.5);
    for (let y = Y0 - 8; y <= Y1 + 8; y++) for (let x = X0 - 10; x <= X1 + 10; x++) { const d = y < Y0 + 26 ? Math.hypot(x - 60, (y - Y0 - 26)) - 26 : Math.max(X0 - x, x - X1); if (d < 0 || d > 9) continue; pset(x, y, d > 8 ? P.llaga : x < 60 ? P.piedraL : P.piedraS); }
    rect(X0 - 10, Y1 + 1, X1 + 10, Y1 + 6, hex('#c8c6c4')); rect(X0 - 10, Y1 + 6, X1 + 10, Y1 + 7, P.llaga);
    for (let g = 0; g < 9; g++) { const gx = 210 + (g % 5) * 18, gy = 46 + Math.floor(g / 5) * 22; for (let i = 0; i < 4; i++) { linea(gx + i * 3, gy, gx + i * 3, gy + 13, hex('#c8c8cc')); linea(gx + i * 3 + 1, gy, gx + i * 3 + 1, gy + 13, P.piedraS); } linea(gx - 2, gy + 11, gx + 11, gy + 2, hex('#d0d0d4')); }
    for (const [i, j] of [[-5, -2], [-4, -3], [-3, -3], [-2, -3], [-1, -2], [0, -1], [1, -2], [2, -3], [3, -3], [4, -3], [5, -2], [5, -1], [4, 1], [3, 2], [2, 3], [1, 4], [0, 5], [-1, 4], [-2, 3], [-3, 2], [-4, 1], [-5, -1]]) pset(140 + i, 60 + j, hex('#d8d6d8'));
    rect(0, 132, 319, 146, hex('#2a2830')); for (let x = 0; x < 320; x += 2) pset(x, 132, P.piedraS);
  });
  b_rio(R, t, X0, Y0, X1, Y1, 2);
  for (let y = Y0; y < Y0 + 26; y++) for (let x = X0; x <= X1; x++) if (Math.hypot(x - 60, y - Y0 - 26) > 26) pset(x, y, x < 60 ? P.piedraL : P.piedraS);
  b_reflejos(R, t, 96, 26, 170, 92, 1);
  for (const bx of [46, 59, 72]) { rect(bx, Y0, bx + 2, Y1, P.hierro); rect(bx, Y0, bx, Y1, P.hierroL); } rect(X0, 54, X1, 56, P.hierro); rect(X0, 54, X1, 54, P.hierroL);
  return { suelo: 150, mesa: [0, 319, 146], carta: [110, 150, 206, 177], vela: [72, 118], tintero: [228, 156], ventana: [X0, Y0, X1, Y1], libre: [[100, 300]] };
}

// la mesa de la celda, delante del preso: en la general, la mesa de caballete con sus cosas; en 'mesa', el tablero de cerca
function b_torreDelante(R, t, o, cam) {
  const { rect, pset, linea, disco, poligono } = R, P = b_palTorre(), carta = o.carta ?? 1;
  const tinta = hex('#3a2a20');
  if (cam === 'mesa') {
    b_madera(R, 0, 146, 319, 179, P.roble, P.robleS, P.robleL, P.robleD, 690, 9); rect(0, 146, 319, 147, P.robleL);
    for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) if (b_b4(x, y) < (y - 148) / 80) b_tinte(R, x, y, B_K, 0.25);
    // las cartas dobladas, el lacre y el sello
    for (let k = 0; k < 3; k++) { rect(254 + k * 3, 156 - k * 3, 296 + k * 3, 172 - k * 3, P.pergS); rect(255 + k * 3, 157 - k * 3, 295 + k * 3, 171 - k * 3, P.perg); linea(255 + k * 3, 157 - k * 3, 275 + k * 3, 164 - k * 3, P.pergS); linea(295 + k * 3, 157 - k * 3, 275 + k * 3, 164 - k * 3, P.pergS); }
    disco(281, 158, 3, P.lacre); pset(280, 157, hex('#e85a5a'));
    rect(234, 172, 260, 175, P.lacre); rect(234, 172, 260, 172, hex('#e05050')); rect(260, 172, 262, 175, hex('#3a2a20'));
    // la carta: el pergamino con su esquina doblada, los renglones que aparecen y el corazoncito al final
    rect(108, 149, 208, 178, P.pergS); rect(110, 150, 206, 177, P.perg); for (let y = 151; y < 177; y++) for (let x = 111; x < 206; x++) if (h(x, y, 691) < 0.04) pset(x, y, P.pergS);
    poligono([[196, 150], [206, 150], [206, 160]], hex('#d8c89e')); linea(196, 150, 206, 160, P.pergS);
    const renglones = 7, hechos = carta * renglones;
    for (let r = 0; r < renglones; r++) { const f = Math.min(1, Math.max(0, hechos - r)); if (f <= 0) break; const y = 153 + r * 3.3, xa = 116 + (r === 0 ? 8 : 0), xb = r === renglones - 1 ? 160 : 198;
      for (let x = xa; x < xa + (xb - xa) * f; x++) { if (h(x, r, 692) < 0.25) continue; pset(x, Math.round(y + (h(x, r, 693) < 0.3 ? -1 : 0)), tinta); } }
    if (carta > 0.92) { const cx = 172, cy = 176; for (const [i, j] of [[-2, -1], [-1, -2], [1, -2], [2, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2], [0, -1]]) pset(cx + i, cy - 2 + j, P.lacre); }
    // el tintero con la pluma
    rect(222, 150, 234, 162, B_K); rect(223, 151, 233, 161, hex('#2e2a30')); rect(223, 151, 233, 152, hex('#5a5462')); rect(226, 149, 230, 150, hex('#4a4450')); pset(224, 153, hex('#8a8494'));
    linea(229, 149, 246, 122, hex('#f6f2e8')); linea(230, 149, 248, 123, hex('#d8d0c0')); for (let k = 0; k < 9; k++) { linea(236 + k * 1.2, 137 - k * 1.8, 233 + k * 1.2, 133 - k * 1.8, hex('#ece6d8')); linea(237 + k * 1.2, 137 - k * 1.8, 241 + k * 1.2, 134 - k * 1.8, hex('#c8c0b0')); }
    // la vela grande en su palmatoria, con chorretones
    { const x = 72; disco(x, 164, 11, P.hierro); disco(x, 163, 10, hex('#5a5a66')); disco(x - 2, 161, 4, P.hierroL); rect(x - 4, 150, x + 4, 162, hex('#4a4a56')); rect(x + 9, 160, x + 14, 163, P.hierro);
      rect(x - 4, 122, x + 4, 152, hex('#f2e8cc')); rect(x + 2, 122, x + 4, 152, hex('#cfc2a0')); rect(x - 3, 124, x - 3, 150, hex('#fffaf0'));
      for (const [dx, L] of [[-4, 9], [3, 14], [0, 5]]) { rect(x + dx, 122, x + dx + 1, 122 + L, hex('#f8f0dc')); pset(x + dx, 123 + L, hex('#e8dcc0')); } rect(x - 1, 119, x, 121, B_K);
      b_llama(R, x, 118, t, 4, 2.2, 70); }
    return;
  }
  // la mesa de caballete con la vela, los papeles, el tintero y el lacre
  for (const lx of [114, 188]) { poligono([[lx - 6, 166], [lx - 2, 166], [lx + 2, 142], [lx - 2, 142]], P.robleS); poligono([[lx + 6, 166], [lx + 2, 166], [lx - 2, 142], [lx + 2, 142]], P.roble); }
  rect(112, 154, 192, 156, P.robleS); rect(112, 154, 192, 154, P.roble);
  b_madera(R, 106, 136, 200, 142, P.roble, P.robleS, P.robleL, P.robleD, 694, 4); rect(106, 142, 200, 143, P.robleD);
  rect(126, 137, 150, 141, P.pergS); rect(127, 137, 149, 140, P.perg); poligono([[148, 136], [176, 136], [178, 141], [147, 141]], P.perg); linea(147, 141, 178, 141, P.pergS);
  const ren = Math.ceil((o.carta ?? 1) * 3); for (let r = 0; r < ren; r++) for (let x = 151; x < 174; x++) if (h(x, r, 695) < 0.6 && (r < ren - 1 || x < 151 + ((o.carta ?? 1) * 3 - r) * 23)) pset(x, 137 + r * 1.5, tinta);
  rect(184, 132, 190, 138, B_K); rect(185, 133, 189, 137, hex('#2e2a30')); linea(188, 132, 196, 122, hex('#f6f2e8')); linea(189, 132, 197, 123, hex('#c8c0b0'));
  rect(128, 138, 140, 139, P.lacre); pset(128, 138, hex('#e05050'));
  rect(116, 133, 124, 135, P.hierro); rect(118, 123, 122, 132, hex('#f2e8cc')); rect(121, 123, 122, 132, hex('#cfc2a0')); b_llama(R, 120, 122, t, 3, 1.3, 32);
}

function b_palCorreos() {
  return pal({ pared: '#a8b89a', paredS: '#86987a', paredL: '#c4d2b4', paredD: '#6a7a60', caoba: '#7a3a24', caobaS: '#4e2416', caobaL: '#a45a3a', caobaD: '#2e140c', blanco: '#f4f0e6', marco: '#e8e4d8', marcoS: '#b8b4a8',
    ladrillo: '#9a4a36', ladrilloS: '#6e3226', nieve: '#f2f6fa', nieveS: '#c4d0e0', cielo: '#b8c4d0', cieloS: '#98a6b8', cieloL: '#d4dce4', luz: '#ffd880', laton: '#d0a040', latonS: '#8a6420', latonL: '#f4d27a',
    hierro: '#2e2e34', hierroL: '#5a5a66', saca: '#c8b48a', sacaS: '#9a865e', carta: '#f4ecd8', cartaS: '#cfc4a8', negro: '#1e1e24', rojo: '#b8202a', baldosa1: '#a84a32', baldosa2: '#e4d8b8', baldosa3: '#4a2a22' });
}

// la calle nevada de Londres en 1840 por una ventana: cielo de nubes, casas de ladrillo con ventanas encendidas y chimeneas
// que humean, la farola de gas, la nieve en la calle, coches de caballos y gente que pasa; nieva
function b_calleNieve(R, t, x0, y0, x1, y1, s = 1) {
  const { pset, linea, disco } = R, P = b_palCorreos(), W = x1 - x0, Hh = y1 - y0, suelo = y0 + Math.round(Hh * 0.82);
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / Hh; pset(x, y, u < 0.2 && b_b4(x, y) < 0.4 ? P.cieloS : u > 0.3 && b_b4(x, y) < 0.3 ? P.cieloL : P.cielo); }
  b_nube(pset, x0 + ((t * 1.5 * s) % (W + 50)) - 25, y0 + Hh * 0.08, W * 0.45, [hex('#9aa6b4'), hex('#c4ccd6'), hex('#e0e6ec')]);
  b_nube(pset, x0 + ((W * 0.6 + t * 3 * s) % (W + 40)) - 20, y0 + Hh * 0.2, W * 0.3, [hex('#a4b0bc'), hex('#ccd4dc'), hex('#e8ecf0')]);
  // las casas de ladrillo de enfrente
  const casas = [[0.0, 0.3, 0.26], [0.3, 0.62, 0.2], [0.62, 1.0, 0.3]];
  casas.forEach(([a, b, tp], k) => { const xa = x0 + Math.round(W * a), xb = x0 + Math.round(W * b), yt = y0 + Math.round(Hh * tp);
    for (let y = yt; y <= suelo; y++) for (let x = xa; x <= xb; x++) pset(x, y, (y - yt) % (3 * s) === 0 ? P.ladrilloS : ((x + ((y - yt) / (3 * s) & 1) * 3 * s) % (6 * s) === 0 ? P.ladrilloS : P.ladrillo));
    for (let x = xa; x <= xb; x++) { pset(x, yt - 1, P.nieve); pset(x, yt - 2, P.nieveS); pset(x, yt, P.nieve); }
    const cx = xa + Math.round((xb - xa) * 0.7); for (let y = yt - 7 * s; y < yt; y++) for (let i = 0; i < 4 * s; i++) pset(cx + i, y, P.ladrilloS); for (let i = 0; i < 4 * s; i++) pset(cx + i, yt - 7 * s, P.nieve); b_humo(R, cx + 2 * s, yt - 8 * s, t, k, 18 * s, hex('#e0e4ea'), 0.6);
    for (let wy = yt + 5 * s; wy < suelo - 10 * s; wy += 11 * s) for (let wx = xa + 3 * s; wx < xb - 5 * s; wx += 9 * s) { const on = h(wx, wy + Math.floor((t + k) / 7), 700) < 0.45;
      for (let j = 0; j < 7 * s; j++) for (let i = 0; i < 5 * s; i++) pset(wx + i, wy + j, i === 0 || j === 0 ? P.marco : on ? (j > 4 * s ? hex('#e0a050') : P.luz) : hex('#4a5a6a'));
      for (let i = 0; i < 6 * s; i++) pset(wx - Math.floor(s / 2) + i, wy + 7 * s, P.nieve); } });
  // la acera y la calle nevadas
  for (let y = suelo; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < suelo + 2 ? P.nieveS : (h(x, y, 701) < 0.1 || (y - suelo) % (5 * s) === 0 && (x * 0.5 + y) % 9 < 5) ? P.nieveS : P.nieve);
  // la farola de gas encendida
  { const fx = x0 + Math.round(W * 0.48); for (let y = suelo - 22 * s; y <= suelo; y++) pset(fx, y, P.hierro); for (let j = 0; j < 4 * s; j++) for (let i = -2 * s; i <= 2 * s; i++) pset(fx + i, suelo - 26 * s + j, Math.abs(i) === 2 * s ? P.hierro : P.luz); b_brillo(R, fx, suelo - 24 * s, 10 * s, P.luz, 0.4); }
  // la gente que pasa con chistera, paraguas o chal
  for (let k = 0; k < 3; k++) { const v = (5 + k * 2) * s, d = k % 2 ? 1 : -1, u = ((t * v + k * 60) % (W + 30 * s)), px = d > 0 ? x0 - 15 + u : x1 + 15 - u, py = suelo + Math.round(3 * s);
    const ropa = [hex('#2e2e3a'), hex('#5a2a2a'), hex('#3a4a3a')][k], paso = Math.floor(t * 4 + k) % 2;
    for (let j = 0; j < 8 * s; j++) for (let i = -2 * s; i <= 2 * s; i++) pset(px + i, py - j - 2 * s, ropa);
    pset(px - s, py - paso, B_K); pset(px + s, py - 1 + paso, B_K); disco(px, py - 11 * s, 1.6 * s, hex('#e8c0a0'));
    if (k === 0) for (let j = 0; j < 4 * s; j++) for (let i = -2 * s; i <= 2 * s; i++) pset(px + i, py - 13 * s - j, B_K);
    if (k === 1) { for (let i = -5 * s; i <= 5 * s; i++) pset(px + i, py - 16 * s + Math.round(Math.abs(i) * 0.4), B_K); linea(px, py - 16 * s, px, py - 8 * s, B_K); } }
  // el coche de caballos que pasa
  { const u = (t / 11) % 1, cx = Math.round(x1 + 40 * s - u * (W + 90 * s)), cy = suelo + Math.round(5 * s), tr = Math.floor(t * 6) % 2;
    for (let j = 0; j < 8 * s; j++) for (let i = 0; i < 14 * s; i++) pset(cx + i, cy - 6 * s - j, j === 0 ? hex('#4a2a1a') : hex('#2a1a14'));
    for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 5 * s; i++) pset(cx + 3 * s + i, cy - 12 * s + j, P.luz);
    for (const wx of [cx + 3 * s, cx + 11 * s]) { R.anillo(wx, cy - 2 * s, 3 * s, hex('#6a3a1a')); pset(wx, cy - 2 * s, hex('#6a3a1a')); }
    const hx = cx - 13 * s; for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 10 * s; i++) pset(hx + i, cy - 9 * s + j, hex('#5a3a28')); for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 3 * s; i++) pset(hx - 2 * s + i, cy - 12 * s + j, hex('#5a3a28'));
    for (const [lx, f] of [[hx + s, tr], [hx + 3 * s, 1 - tr], [hx + 7 * s, tr], [hx + 9 * s, 1 - tr]]) linea(lx, cy - 5 * s, lx + (f ? s : -s), cy, hex('#3a2418'));
    linea(hx + 9 * s, cy - 8 * s, cx, cy - 7 * s, B_K); for (let j = 0; j < 5 * s; j++) pset(cx + 13 * s, cy - 15 * s - j, B_K); }
  b_nieve(R, t, x0, y0, x1, y1, Math.round(W * Hh / 90), 10 * s);
  R.recorte(null);
}

function b_correos(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palCorreos();
  if (cam === 'mostrador') return b_correosMostrador(R, t, o, P);
  const V0 = 16, V1 = 90, VY0 = 28, VY1 = 106;
  b_fijo(R, 'amor-correos', () => {
    // la pared verde con su cornisa y el friso de caoba
    b_yeso(R, 0, 0, 319, 96, [P.paredS, P.pared, P.paredL, P.paredD], 710);
    rect(0, 0, 319, 7, P.blanco); rect(0, 5, 319, 7, P.marcoS); for (let x = 0; x < 320; x += 6) rect(x, 3, x + 2, 4, P.marcoS); rect(0, 8, 319, 8, P.paredD);
    rect(0, 96, 319, 130, P.caobaS);
    for (let x0 = 2; x0 < 318; x0 += 32) { rect(x0, 99, x0 + 28, 126, P.caoba); rect(x0, 99, x0 + 28, 99, P.caobaD); rect(x0, 99, x0, 126, P.caobaD); rect(x0 + 28, 99, x0 + 28, 126, P.caobaL); rect(x0, 126, x0 + 28, 126, P.caobaL);
      rect(x0 + 4, 103, x0 + 24, 122, P.caobaS); rect(x0 + 5, 104, x0 + 23, 121, P.caoba); rect(x0 + 5, 104, x0 + 23, 104, P.caobaL); for (let v = 0; v < 3; v++) for (let x = x0 + 6; x < x0 + 23; x++) if (h(x, v + x0, 711) < 0.6) pset(x, 107 + v * 5 + Math.round(Math.sin(x * 0.3 + v) * 0.8), P.caobaS); }
    rect(0, 96, 319, 97, P.caobaL); rect(0, 128, 319, 130, P.caobaD);
    // el suelo de baldosas en damero, con el desgaste
    b_suelo(R, 131, 179, (u, z, du, dz, x, y) => { const a = u * 1.3, b = z * 0.9, ia = Math.floor(a + b), ib = Math.floor(a - b), fa = a + b - ia, fb = a - b - ib;
      if (fa < du * 1.3 + dz * 0.9 || fb < du * 1.3 + dz * 0.9) return hex('#5a4a40'); const c = (ia + ib) & 1 ? P.baldosa1 : ((ia & 1) ? P.baldosa3 : P.baldosa2);
      if (h(x, y, 712) < 0.05) return b_mezcla(c, C.blanco, 0.2); if (Math.abs(u) < 0.6 && b_b4(x, y) < 0.2) return b_mezcla(c, hex('#8a7a6a'), 0.4); return c; }, 3, 1, 91);
    // el marco de la ventana de guillotina, con el alféizar y la escarcha en las esquinas
    rect(V0 - 4, VY0 - 4, V1 + 4, VY1 + 2, P.marco); rect(V0 - 4, VY0 - 4, V1 + 4, VY0 - 4, C.blanco); rect(V1 + 3, VY0 - 3, V1 + 4, VY1 + 2, P.marcoS); rect(V0 - 6, VY1 + 2, V1 + 6, VY1 + 5, P.marco); rect(V0 - 6, VY1 + 5, V1 + 6, VY1 + 6, P.marcoS);
    // el reloj regulador con su caja y el aplique de gas
    rect(108, 18, 134, 82, P.caobaD); rect(110, 20, 132, 80, P.caoba); rect(110, 20, 110, 80, P.caobaL); rect(108, 16, 134, 18, P.caobaL); poligono([[106, 16], [136, 16], [121, 10]], P.caoba); rect(108, 82, 134, 84, P.caobaD);
    disco(121, 32, 9, P.laton); disco(121, 32, 8, P.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(121 + Math.cos(a) * 7), Math.round(32 + Math.sin(a) * 7), P.negro); } R.anillo(121, 32, 8.5, P.latonS);
    rect(113, 44, 129, 76, hex('#3a2a20')); rect(113, 44, 129, 44, P.latonS); rect(114, 45, 116, 75, hex('#5a4a40'));
    // los casilleros de las cartas, detrás del mostrador
    rect(170, 46, 306, 124, P.caobaD);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 11; c++) { const x = 172 + c * 12, y = 48 + r * 12; rect(x, y, x + 10, y + 10, hex('#2a140c')); rect(x, y, x + 10, y, hex('#1a0a06'));
      const n = Math.floor(h(c, r, 713) * 4); for (let k = 0; k < n; k++) { const ch = 5 + Math.floor(h(c, r + k, 714) * 4), cc = h(c, k, 715) < 0.2 ? hex('#e8d8a8') : h(c, k, 716) < 0.15 ? hex('#f0c8d0') : P.carta; rect(x + 1 + k * 2, y + 10 - ch, x + 8, y + 10, cc); rect(x + 1 + k * 2, y + 10 - ch, x + 1 + k * 2, y + 10, P.cartaS); }
      if (h(c, r, 717) < 0.15) { rect(x + 1, y + 4, x + 9, y + 10, hex('#b89a6a')); linea(x + 1, y + 7, x + 9, y + 7, P.rojo); } }
    for (let r = 0; r <= 6; r++) { rect(170, 47 + r * 12, 306, 47 + r * 12, P.caoba); rect(170, 46 + r * 12, 306, 46 + r * 12, P.caobaL); }
    for (let c = 0; c <= 11; c++) rect(171 + c * 12, 46, 171 + c * 12, 120, P.caoba);
    rect(168, 120, 308, 136, P.caoba); rect(168, 120, 308, 120, P.caobaL); for (let c = 0; c < 6; c++) { rect(172 + c * 23, 124, 190 + c * 23, 132, P.caobaS); rect(179 + c * 23, 127, 183 + c * 23, 128, P.laton); }
    // la estufa de hierro con su tubo
    rect(99, 10, 103, 96, P.hierro); rect(99, 10, 99, 96, P.hierroL); rect(99, 10, 108, 14, P.hierro);
    for (let y = 98; y <= 130; y++) { const w = Math.round(9 + Math.sin((y - 98) / 32 * Math.PI) * 4); rect(101 - w, y, 101 + w, y, P.hierro); pset(101 - w, y, P.hierroL); pset(101 - w + 1, y, P.hierroL); }
    rect(90, 96, 112, 98, P.hierroL); rect(91, 130, 111, 132, P.hierro); rect(92, 132, 94, 135, P.hierro); rect(108, 132, 110, 135, P.hierro);
    // las sacas de correo junto al mostrador, con cartas que asoman
    for (const [sx, sw, sh] of [[124, 16, 22], [138, 14, 16], [118, 12, 12]]) { for (let y = 134 - sh; y <= 134; y++) { const w = Math.round(sw / 2 * Math.sin(Math.min(1, (y - 134 + sh) / 6 + 0.3) * Math.PI / 2)); rect(sx - w, y, sx + w, y, P.saca); pset(sx + w, y, P.sacaS); pset(sx - w, y, b_mezcla(P.saca, C.blanco, 0.3)); }
      rect(sx - 2, 134 - sh - 2, sx + 2, 134 - sh, P.sacaS); linea(sx - 3, 134 - sh + 3, sx + 3, 134 - sh + 3, P.rojo); for (let k = 0; k < 3; k++) rect(sx - 4 + k * 3, 134 - sh - 4 - k, sx - 1 + k * 3, 134 - sh + 1 - k, P.carta); }
  });
  // la vida: la calle nevada por los cristales, el reloj, el gas, la estufa, la tetera, la carta que entra en un casillero, el perrito
  b_calleNieve(R, t, V0, VY0, V1, VY1, 1);
  for (const x of [V0 + 24, V0 + 49]) rect(x, VY0, x + 1, VY1, P.marco); rect(V0, 66, V1, 68, P.marco); rect(V0, 66, V1, 66, C.blanco); for (const y of [VY0 + 18, 86]) rect(V0, y, V1, y, P.marco);
  for (const [cx, cy] of [[V0, VY0], [V1, VY0], [V0, VY1], [V1, VY1], [V0, 68], [V1, 68]]) for (let k = 0; k < 18; k++) { const a = h(k, cx, 718) * 6, d = h(k, cy, 718) * 6; pset(Math.round(cx + Math.sign(V0 + 30 - cx) * a), Math.round(cy + Math.sign(70 - cy) * d * (k % 2 ? 1 : 0.5)), hex('#eef4fa')); }
  { const a = Math.sin(t * Math.PI) * 0.35, px = 121 + Math.round(Math.sin(a) * 24), py = 46 + Math.round(Math.cos(a) * 24); linea(121, 46, px, py, P.latonS); disco(px, py, 3, P.laton); pset(px - 1, py - 1, P.latonL);
    const m = t / 60 * Math.PI * 2 + 1, hr = t / 720 * Math.PI * 2 + 4; linea(121, 32, Math.round(121 + Math.sin(m) * 6), Math.round(32 - Math.cos(m) * 6), P.negro); linea(121, 32, Math.round(121 + Math.sin(hr) * 4), Math.round(32 - Math.cos(hr) * 4), P.negro); pset(121, 32, P.latonS); }
  { const x = 150, y = 52; rect(x - 1, y, x + 1, y + 10, P.latonS); rect(x - 5, y + 9, x + 1, y + 10, P.latonS); rect(x - 3, y - 4, x + 3, y, hex('#e8eef0')); rect(x - 3, y - 4, x - 3, y, C.blanco); b_llama(R, x, y - 1, t, 5, 1.1, 30); }
  { const f = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 3.1); rect(96, 110, 106, 118, hex('#3a1a10')); for (let y = 111; y <= 117; y++) for (let x = 97; x <= 105; x++) if (b_b4(x, y) < 0.4 + f * 0.5) pset(x, y, (y + x) % 3 ? hex('#ff9a3a') : hex('#ffd060')); for (let x = 97; x <= 105; x += 2) rect(x, 110, x, 118, P.hierro); b_brillo(R, 101, 116, 22, hex('#ff9a4a'), 0.3 + f * 0.1);
    rect(95, 90, 107, 95, hex('#3a3a44')); rect(95, 90, 107, 90, P.hierroL); rect(107, 91, 111, 92, hex('#3a3a44')); b_humo(R, 111, 89, t, 2, 22, hex('#f0f4f8'), 0.55); }
  { const u = (t % 5) / 5; if (u < 0.3) { const f = u / 0.3, lx = Math.round(250 - f * 30), ly = Math.round(40 + f * 24 - Math.sin(f * Math.PI) * 12); rect(lx - 3, ly - 2, lx + 3, ly + 2, P.carta); rect(lx - 3, ly + 2, lx + 3, ly + 2, P.cartaS); pset(lx, ly, P.rojo); } }
  { const dx = 60, dy = 148, cola = Math.round(Math.sin(t * 9)); rect(dx - 6, dy - 7, dx + 3, dy - 3, hex('#d8c8a8')); rect(dx - 6, dy - 3, dx - 5, dy, hex('#b8a888')); rect(dx + 1, dy - 3, dx + 2, dy, hex('#b8a888')); rect(dx + 2, dy - 11, dx + 7, dy - 6, hex('#d8c8a8'));
    rect(dx + 2, dy - 12, dx + 3, dy - 10, hex('#7a5a3a')); pset(dx + 5, dy - 9, B_K); pset(dx + 8, dy - 8, B_K); rect(dx - 4, dy - 6, dx - 1, dy - 4, hex('#7a5a3a')); linea(dx - 7, dy - 7, dx - 9 + cola, dy - 11, hex('#d8c8a8')); if (Math.sin(t * 0.7) > 0.7) pset(dx + 7, dy - 6, hex('#e06a7a')); }
  return { suelo: 150, mostrador: [150, 319, 136], ventana: [V0, VY0, V1, VY1], casilleros: [170, 46, 306, 124], reloj: [121, 32], estufa: [86, 96, 116, 134], sacas: [112, 112, 150, 134], perro: [52, 148], libre: [[20, 150]] };
}

// el mostrador de correos de cerca: detrás, los casilleros grandes y el aplique de gas
function b_correosMostrador(R, t, o, P) {
  const { rect, pset, linea, disco } = R;
  b_fijo(R, 'amor-correosM', () => {
    b_yeso(R, 0, 0, 319, 140, [P.paredS, P.pared, P.paredL, P.paredD], 720);
    rect(6, 22, 266, 136, P.caobaD);
    for (let r = 0; r < 6; r++) for (let c = 0; c < 13; c++) { const x = 9 + c * 20, y = 25 + r * 18; rect(x, y, x + 17, y + 15, hex('#2a140c')); rect(x, y, x + 17, y + 1, hex('#1a0a06'));
      const n = Math.floor(h(c, r, 721) * 5); for (let k = 0; k < n; k++) { const ch = 7 + Math.floor(h(c, r + k, 722) * 6), cc = h(c, k, 723) < 0.2 ? hex('#e8d8a8') : h(c + r, k, 724) < 0.2 ? hex('#f4c8d4') : P.carta;
        rect(x + 1 + k * 3, y + 15 - ch, x + 15, y + 15, cc); rect(x + 1 + k * 3, y + 15 - ch, x + 1 + k * 3, y + 15, P.cartaS); if (h(c, k + r, 725) < 0.3) { rect(x + 12, y + 16 - ch, x + 14, y + 17 - ch, B_K); } }
      if (h(c, r, 726) < 0.12) { rect(x + 1, y + 6, x + 16, y + 15, hex('#b89a6a')); linea(x + 1, y + 10, x + 16, y + 10, P.rojo); linea(x + 8, y + 6, x + 8, y + 15, P.rojo); } }
    for (let r = 0; r <= 6; r++) { rect(6, 23 + r * 18, 266, 24 + r * 18, P.caoba); rect(6, 23 + r * 18, 266, 23 + r * 18, P.caobaL); }
    for (let c = 0; c <= 13; c++) { rect(7 + c * 20, 22, 8 + c * 20, 134, P.caoba); rect(7 + c * 20, 22, 7 + c * 20, 134, P.caobaL); }
    rect(4, 18, 268, 22, P.caoba); rect(4, 18, 268, 18, P.caobaL);
    rect(0, 134, 319, 140, P.caobaS);
    // las cartas con sus señas (trazos), el sello y el lacre; los legajos atados con cinta; las chapas de latón con el número
    for (let r = 0; r < 6; r++) for (let c = 0; c < 13; c++) { const x = 9 + c * 20, y = 25 + r * 18;
      for (let yy = y + 2; yy <= y + 5; yy++) for (let xx = x; xx <= x + 17; xx++) if (b_b4(xx, yy) < 0.5 - (yy - y) * 0.1) b_tinte(R, xx, yy, B_K, 0.35);
      const n = Math.floor(h(c, r, 721) * 5); if (n > 0) { const k = n - 1, ch = 7 + Math.floor(h(c, r + k, 722) * 6), lx = x + 1 + k * 3, ly = y + 15 - ch;
        if (x + 15 - lx > 6) { rect(lx + 2, ly + 2, Math.min(x + 13, lx + 9), ly + 2, hex('#8a7a6a')); rect(lx + 2, ly + 4, Math.min(x + 11, lx + 7), ly + 4, hex('#a89a8a')); rect(x + 12, ly + 1, x + 14, ly + 3, h(c, r, 727) < 0.5 ? hex('#2a2a30') : P.rojo); }
        if (h(c, r, 728) < 0.25 && ch > 8) { disco(lx + 6, y + 12, 1.4, P.rojo); } }
      if (h(c, r, 729) < 0.18) { rect(x + 2, y + 8, x + 15, y + 15, hex('#e2d4b0')); rect(x + 2, y + 8, x + 15, y + 8, hex('#f4ecd8')); rect(x + 2, y + 11, x + 15, y + 11, hex('#c8b890')); rect(x + 8, y + 8, x + 9, y + 15, hex('#a8402a')); rect(x + 2, y + 13, x + 15, y + 13, hex('#a8402a')); }
      if ((c + r) % 3 === 0) { rect(x + 6, y + 17, x + 11, y + 17, P.latonS); pset(x + 7, y + 17, P.latonL); pset(x + 9, y + 17, P.latonL); } }
    // el remate de la casillería: la cornisa con dentículos y una moldura dorada
    for (let x = 4; x <= 268; x++) { pset(x, 15, P.caobaL); pset(x, 16, x % 4 < 2 ? P.caoba : P.caobaD); pset(x, 17, P.caobaS); }
    for (let x = 8; x <= 264; x += 20) { pset(x + 9, 20, P.laton); pset(x + 10, 20, P.latonL); }
    // la pared de la derecha: el zócalo de la estancia, la sombra de la casillería y el cuadro de tarifas (solo barras y cifras), más abajo
    for (let y = 18; y <= 133; y++) for (let x = 269; x <= 274; x++) if (b_b4(x, y) < 0.55 - (x - 269) * 0.09) b_tinte(R, x, y, B_K, 0.3);
    rect(278, 80, 312, 122, P.caobaD); rect(279, 81, 311, 121, P.caobaL); rect(280, 82, 310, 120, P.carta); for (let k = 0; k < 6; k++) { rect(283, 90 + k * 5, 296 - (k % 3) * 3, 91 + k * 5, hex('#5a5048')); a_cifra(R, 300, 89 + k * 5, String(k + 1), hex('#5a5048')); }
    rect(283, 84, 307, 86, P.rojo); disco(295, 85, 2, P.laton); pset(295, 78, hex('#5a4a40')); linea(295, 78, 281, 81, hex('#7a6a5a')); linea(295, 78, 309, 81, hex('#7a6a5a'));
    for (let y = 123; y <= 125; y++) for (let x = 279; x <= 313; x++) if (b_b4(x, y) < 0.45 - (y - 123) * 0.12) b_tinte(R, x, y, B_K, 0.3);
    rect(270, 126, 319, 133, P.caobaS); rect(270, 126, 319, 126, P.caobaL); rect(270, 133, 319, 133, P.caobaD);
  });
  // el aplique de gas en la pared de la derecha, por debajo de la zona de Atom (la llama hacia y 52)
  { const x = 292, y = 62; rect(x - 1, y, x + 1, y + 8, P.latonS); rect(x - 1, y + 7, x + 6, y + 8, P.latonS); rect(x + 5, y + 5, x + 7, y + 10, P.laton); rect(x - 3, y - 4, x + 3, y, hex('#e8eef0')); pset(x - 3, y - 4, C.blanco); b_llama(R, x, y - 1, t, 6, 1.1, 22); }
  // las motas de polvo en la luz del aplique y el ratoncito que asoma por un casillero de abajo
  b_motas(R, t, 262, 318, 50, 120, 7, hex('#fff2cc'));
  { const u = (t % 7) / 7, s = u < 0.45 ? Math.sin(u / 0.45 * Math.PI) : 0, mx = 9 + 20 * 1 + 17 - Math.round(s * 7), my = 25 + 5 * 18 + 13;
    if (s > 0.05) { R.recorte([9 + 20 * 1, 25 + 5 * 18, 9 + 20 * 1 + 17, 25 + 5 * 18 + 15]); disco(mx, my, 2.5, hex('#8a8088')); R.disco(mx - 2, my - 3, 1.2, hex('#a89aa8')); R.pset(mx - 3, my - 1, B_K); R.pset(mx - 5, my, hex('#e8a0b0')); R.recorte(null); } }
  { const u = (t % 4.5) / 4.5; if (u < 0.3) { const f = u / 0.3, c = 3 + Math.floor(t / 4.5) % 8, lx = Math.round(9 + c * 20 + 8 + (1 - f) * 30), ly = Math.round(25 + 2 * 18 + 8 - Math.sin(f * Math.PI) * 14); rect(lx - 4, ly - 3, lx + 4, ly + 3, P.carta); rect(lx - 4, ly + 3, lx + 4, ly + 3, P.cartaS); pset(lx + 2, ly - 1, P.negro); } }
  return { suelo: 152, mostrador: [0, 319, 144], casilleros: [6, 22, 266, 136], sellos: [16, 149, 88, 177], bascula: [118, 152], tarjetas: [196, 140, 252, 178], tampon: [268, 160, 306, 176], libre: [[100, 260]] };
}
// el mostrador de correos, delante del cartero: en la general, el mostrador de caoba con la báscula y las cartas; en
// 'mostrador', el tablero de cerca con sellos, báscula, tarjetas, peniques, sello de mano y tampón
function b_correosDelante(R, t, o, cam) {
  const { rect, pset, linea, disco, poligono } = R, P = b_palCorreos(), tar = o.tarjetas ?? 0.3;
  const tarjeta = (x, y, w, hh, k) => { rect(x, y, x + w, y + hh, hex('#e8e0d0')); for (let i = 0; i <= w; i += 2) { pset(x + i, y, C.blanco); pset(x + i, y + hh, C.blanco); } for (let j = 0; j <= hh; j += 2) { pset(x, y + j, C.blanco); pset(x + w, y + j, C.blanco); }
    rect(x + 2, y + 2, x + w - 2, y + hh - 2, [P.rojo, hex('#f0a0b8'), hex('#c8d8f0')][k % 3]); const cx = x + (w >> 1), cy = y + (hh >> 1); for (const [i, j] of [[-1, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [0, 1], [-2, -1], [2, -1]]) pset(cx + i, cy + j, k % 3 ? P.rojo : C.blanco); rect(x + 1, y + hh - 1, x + w - 1, y + hh, b_mezcla([P.rojo, hex('#f0a0b8'), hex('#c8d8f0')][k % 3], B_K, 0.15)); };
  if (cam === 'mostrador') {
    b_madera(R, 0, 144, 319, 179, P.caoba, P.caobaS, P.caobaL, P.caobaD, 730, 10); rect(0, 144, 319, 145, P.caobaL);
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) if (b_b4(x, y) < (y - 146) / 90) b_tinte(R, x, y, B_K, 0.2);
    // el pliego de sellos negros de un penique (una silueta clara en cada uno, sin letras)
    rect(16, 149, 88, 177, hex('#e8e0cc')); rect(16, 177, 88, 177, hex('#b8ae98'));
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 19 + c * 11, y = 151 + r * 6.5 | 0; rect(x, y, x + 9, y + 5, hex('#1e1e22')); rect(x + 1, y + 1, x + 8, y + 4, hex('#2e2e34')); disco(x + 5, y + 2.5, 1.8, hex('#9a9aa4')); pset(x + 4, y + 2, hex('#c8c8d0')); pset(x + 1, y + 1, hex('#5a5a66')); pset(x + 8, y + 4, hex('#5a5a66')); }
    rect(19 + 5 * 11, 170, 28 + 5 * 11, 176, hex('#e8e0cc'));
    // la báscula de latón con la carta en el platillo (oscila)
    { const x = 118, a = Math.sin(t * 2.4) * 2.2 * Math.exp(-((t % 6) / 3)); rect(x - 2, 152, x + 2, 172, P.latonS); rect(x - 10, 172, x + 10, 176, P.laton); rect(x - 10, 172, x + 10, 172, P.latonL); rect(x - 11, 176, x + 11, 177, P.latonS);
      const yl = Math.round(152 + a), yr = Math.round(152 - a); linea(x - 18, yl, x + 18, yr, P.laton); linea(x - 18, yl + 1, x + 18, yr + 1, P.latonS); disco(x, 152, 2, P.latonL);
      for (const [px, py] of [[x - 18, yl], [x + 18, yr]]) { linea(px, py, px - 5, py + 10, P.latonS); linea(px, py, px + 5, py + 10, P.latonS); rect(px - 7, py + 10, px + 7, py + 11, P.laton); rect(px - 6, py + 12, px + 6, py + 12, P.latonS); }
      rect(x - 24, yl + 4, x - 12, yl + 9, P.carta); linea(x - 24, yl + 4, x - 18, yl + 7, P.cartaS); linea(x - 12, yl + 4, x - 18, yl + 7, P.cartaS); disco(x + 18, yr + 9, 2, P.latonL); }
    // los peniques
    for (const [cx, cy] of [[150, 170], [158, 174], [154, 164], [166, 168]]) { disco(cx, cy, 3.5, hex('#8a4a2a')); disco(cx, cy, 2.5, hex('#b06a3a')); pset(cx - 1, cy - 1, hex('#e09a6a')); }
    // el montón de tarjetas de encaje, que crece (o.tarjetas)
    const n = 2 + Math.round(tar * 14); for (let k = 0; k < n; k++) tarjeta(196 + (k % 3) - 1, 170 - k * 2, 54, 8, k);
    // el sello de mano y el tampón
    rect(268, 160, 306, 176, hex('#2a2a30')); rect(270, 162, 304, 174, hex('#3a1a3a')); rect(270, 162, 304, 162, hex('#5a3a5a'));
    for (let y = 163; y <= 174; y++) for (let x = 270; x <= 304; x++) { const g = h(x >> 1, y, 732); if (g < 0.18) pset(x, y, hex('#2a0e2a')); else if (g > 0.9 && y < 168) pset(x, y, hex('#6a4a6a')); }
    rect(268, 176, 306, 177, hex('#16161a')); rect(268, 160, 268, 176, hex('#4a4a54')); for (const [i, j] of [[274, 166], [276, 165], [296, 170]]) pset(i, j, hex('#8a6a8a'));
    // el tintero con la pluma, entre las tarjetas y el tampón, y la campanilla del mostrador
    rect(254, 152, 264, 161, hex('#1e2a3a')); rect(255, 152, 263, 152, hex('#4a5a7a')); rect(256, 150, 262, 151, hex('#2a3a4a')); pset(257, 153, hex('#8aa0c0')); rect(253, 161, 265, 162, B_K);
    { const m = Math.round(Math.sin(t * 1.3) * 1); linea(259, 151, 266 + m, 136, hex('#f4f0e6')); linea(260, 151, 267 + m, 137, hex('#c8c2b4')); linea(262 + m, 142, 266 + m, 140, hex('#e8e4dc')); }
    disco(312, 158, 5, P.laton); disco(312, 157, 4, P.latonL); pset(310, 155, C.blanco); rect(311, 151, 313, 152, P.latonS); rect(306, 162, 318, 163, P.latonS);
    for (let x = 0; x < 320; x++) if (b_b4(x, 147) < 0.4) b_tinte(R, x, 146, hex('#ffe8b0'), 0.15 + 0.1 * Math.sin(t * 6 + x * 0.02));
    { const sube = Math.max(0, Math.sin(t * 2.2)) * 8; rect(282, 150 - sube, 292, 154 - sube, hex('#2a2a2a')); rect(285, 140 - sube, 289, 150 - sube, P.caoba); disco(287, 138 - sube, 4, P.caoba); pset(285, 136 - sube, P.caobaL); }
    return;
  }
  // el mostrador de caoba de la general
  b_madera(R, 150, 142, 319, 168, P.caoba, P.caobaS, P.caobaL, P.caobaD, 731, 13);
  for (let x0 = 154; x0 < 316; x0 += 28) { rect(x0, 145, x0 + 23, 164, P.caobaS); rect(x0 + 1, 146, x0 + 22, 163, P.caoba); rect(x0 + 1, 146, x0 + 22, 146, P.caobaD); rect(x0 + 1, 163, x0 + 22, 163, P.caobaL); rect(x0 + 3, 148, x0 + 20, 161, P.caobaL); rect(x0 + 4, 149, x0 + 19, 160, P.caoba); }
  rect(150, 142, 152, 168, P.caobaL); rect(150, 168, 319, 171, P.caobaD);
  rect(146, 136, 319, 141, P.caoba); rect(146, 136, 319, 136, P.caobaL); rect(146, 141, 319, 141, P.caobaD);
  // la báscula, las cartas y las tarjetas, el tampón y la campanilla
  { const x = 172, a = Math.sin(t * 2.4) * 1.5; rect(x - 1, 126, x + 1, 135, P.latonS); rect(x - 5, 134, x + 5, 135, P.laton); const yl = Math.round(126 + a), yr = Math.round(126 - a); linea(x - 9, yl, x + 9, yr, P.laton);
    for (const [px, py] of [[x - 9, yl], [x + 9, yr]]) { linea(px, py, px - 3, py + 5, P.latonS); linea(px, py, px + 3, py + 5, P.latonS); rect(px - 4, py + 5, px + 4, py + 6, P.laton); } rect(x - 13, yl + 2, x - 6, yl + 4, P.carta); }
  const n = 1 + Math.round(tar * 9); for (let k = 0; k < n; k++) tarjeta(206 + (k % 2), 133 - k * 2, 18, 3, k);
  rect(244, 132, 262, 135, P.carta); rect(246, 130, 260, 132, P.cartaS); rect(246, 130, 260, 130, P.carta);
  rect(286, 132, 300, 135, hex('#2a2a30')); rect(287, 132, 299, 132, hex('#5a3a5a'));
  disco(310, 132, 3, P.laton); rect(309, 128, 311, 129, P.latonS); pset(309, 131, P.latonL);
}
function b_palTaller() {
  return pal({ papel: '#ecdcc8', papelS: '#d8c4ac', papelL: '#f6ecdc', raya: '#e4c8c0', ramo: '#9ab08a', ramoR: '#d89aa0', friso: '#6a7a8a', frisoS: '#4e5a68', frisoL: '#8a9aa8', marco: '#f2eee4', marcoS: '#c8c2b4',
    pino: '#c8945a', pinoS: '#9a6a3a', pinoL: '#e2b47a', pinoD: '#6a4424', cielo: '#c8d4e0', cieloS: '#a8b8cc', cieloL: '#e4eaf0', nieve: '#f4f8fc', nieveS: '#c8d4e4', tabla: '#f0ece2', tablaS: '#c8c4b8', postigo: '#3a6a4a',
    cortina: '#b84a4a', cortinaS: '#8a2e30', cortinaL: '#d87a70', encaje: '#fbf8f0', encajeS: '#d8d2c4', rojo: '#c02a3a', rosa: '#f0a0b8', azul: '#8ab0d8', verde: '#5a8a4a', hierro: '#2e2e34', hierroL: '#5a5a66', fuego: '#ff9a3a', piel: '#e8bc98', pelo: '#5a3a24' });
}

// la calle nevada de Worcester por una ventana: cielo, casas de tablas blancas con contraventanas verdes y nieve en los tejados,
// olmos desnudos, un trineo que pasa y la nieve que cae
function b_calleWorcester(R, t, x0, y0, x1, y1, k = 0, s = 1) {
  const { pset, linea } = R, P = b_palTaller(), W = x1 - x0, Hh = y1 - y0, suelo = y0 + Math.round(Hh * 0.8);
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= suelo; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / Hh; pset(x, y, u < 0.25 && b_b4(x, y) < 0.35 ? P.cieloS : u > 0.35 && b_b4(x, y) < 0.35 ? P.cieloL : P.cielo); }
  b_nube(pset, x0 + ((h(k, 1, 740) * W + t * 1.6 * s) % (W + 40)) - 20, y0 + Hh * 0.1, W * 0.45, [hex('#a8b4c4'), hex('#d4dce6'), hex('#eef2f6')]);
  // una casa de tablas con su tejado nevado, la chimenea que humea y las contraventanas verdes
  const hx0 = x0 + Math.round(W * (k ? 0.05 : 0.3)), hx1 = hx0 + Math.round(W * 0.62), top = y0 + Math.round(Hh * 0.38);
  for (let y = top; y <= suelo; y++) for (let x = hx0; x <= hx1; x++) pset(x, y, (y - top) % (2 * s) === 0 ? P.tablaS : P.tabla);
  for (let j = 0; j < 12 * s; j++) for (let x = hx0 - 2 * s + j; x <= hx1 + 2 * s - j; x++) pset(x, top - j, j < 2 * s ? P.nieveS : P.nieve);
  { const cx = hx0 + Math.round((hx1 - hx0) * 0.7); for (let y = top - 16 * s; y < top - 6 * s; y++) for (let i = 0; i < 3 * s; i++) pset(cx + i, y, hex('#8a4a3a')); for (let i = 0; i < 3 * s; i++) pset(cx + i, top - 16 * s, P.nieve); b_humo(R, cx + s, top - 17 * s, t, k + 4, 14 * s, hex('#e4e8ee'), 0.55); }
  for (let wx = hx0 + 3 * s; wx < hx1 - 6 * s; wx += 11 * s) { for (let j = 0; j < 7 * s; j++) for (let i = 0; i < 4 * s; i++) pset(wx + i, top + 4 * s + j, j % (3 * s) === 0 ? P.tablaS : hex('#5a6a7a')); for (let j = 0; j < 7 * s; j++) { pset(wx - s, top + 4 * s + j, P.postigo); pset(wx + 4 * s, top + 4 * s + j, P.postigo); } }
  // los olmos desnudos
  const olmo = (ox, alto) => { for (let y = suelo - alto; y <= suelo; y++) pset(ox, y, hex('#4a3a34')); for (let r = 0; r < 6; r++) { let x = ox, y = suelo - alto * (0.5 + r * 0.08); const d = r % 2 ? 1 : -1; for (let i = 0; i < alto * 0.4; i++) { x += d * 0.7; y -= 0.8; pset(Math.round(x), Math.round(y), hex('#5a4a44')); if (i % 3 === 0) pset(Math.round(x), Math.round(y) - 1, P.nieve); } } };
  olmo(x0 + Math.round(W * (k ? 0.82 : 0.14)), Math.round(Hh * 0.6));
  for (let y = suelo; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y === suelo ? P.nieveS : (h(x, y, 741) < 0.08 || (y - suelo) % 4 === 2 && (x + y) % 7 < 3) ? P.nieveS : P.nieve);
  // el trineo con su caballo, que pasa
  { const u = ((t + k * 5) / 13) % 1, cx = Math.round(x0 - 40 * s + u * (W + 80 * s)), cy = suelo + 4 * s, tr = Math.floor(t * 6) % 2;
    for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 10 * s; i++) pset(cx - 12 * s + i, cy - 4 * s - j, hex('#8a2a22')); for (let i = 0; i < 12 * s; i++) pset(cx - 13 * s + i, cy - Math.round(i < 2 * s ? 1 : 0), hex('#3a2a20'));
    for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 3 * s; i++) pset(cx - 9 * s + i, cy - 10 * s + j, hex('#2e2e3a')); pset(cx - 8 * s, cy - 11 * s, P.piel);
    for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 8 * s; i++) pset(cx + i, cy - 8 * s + j, hex('#6a4a34')); for (let j = 0; j < 4 * s; j++) for (let i = 0; i < 2 * s; i++) pset(cx + 8 * s + i, cy - 11 * s + j, hex('#6a4a34'));
    for (const [lx, f] of [[cx + s, tr], [cx + 6 * s, 1 - tr]]) linea(lx, cy - 4 * s, lx + (f ? s : -s), cy, hex('#4a3020')); linea(cx - 3 * s, cy - 6 * s, cx, cy - 6 * s, B_K); }
  b_nieve(R, t + k * 3, x0, y0, x1, y1, Math.round(W * Hh / 70), 8 * s);
  R.recorte(null);
}

// una ventana de guillotina de seis por seis con su marco blanco y la cortina recogida (el exterior se pinta antes)
function b_ventanaGuillotina(R, x0, y0, x1, y1, P, cortina = true) {
  const { rect, pset } = R, mx = Math.round((y0 + y1) / 2);
  for (const x of [x0 + Math.round((x1 - x0) / 3), x0 + Math.round((x1 - x0) * 2 / 3)]) rect(x, y0, x, y1, P.marco);
  for (const y of [y0 + Math.round((mx - y0) / 2), mx + Math.round((y1 - mx) / 2)]) rect(x0, y, x1, y, P.marco);
  rect(x0, mx - 1, x1, mx + 1, P.marco); rect(x0, mx + 1, x1, mx + 1, P.marcoS);
  for (let k = 0; k < 14; k++) { pset(x0 + Math.floor(h(k, 1, 750) * 4), y1 - Math.floor(h(k, 2, 750) * 4), P.nieve); pset(x1 - Math.floor(h(k, 3, 750) * 4), y1 - Math.floor(h(k, 4, 750) * 4), P.nieve); }
}

function b_taller(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palTaller();
  if (cam === 'mesa') return b_tallerMesa(R, t, o, P);
  const VEN = [[24, 30, 70, 100], [194, 30, 240, 100]];
  b_fijo(R, 'amor-taller', () => {
    // el papel pintado de rayas con ramitos (suave) y la cornisa
    for (let y = 0; y <= 98; y++) for (let x = 0; x <= 251; x++) { let c = (x % 12) < 2 ? P.raya : P.papel; if (b_b4(x, y) < 0.08) c = P.papelS; const rx = (x + ((y / 16 | 0) & 1) * 6) % 12, ry = y % 16; if (rx === 7 && ry > 5 && ry < 9) c = P.ramo; if (rx === 6 && ry === 6) c = P.ramoR; if (rx === 8 && ry === 7) c = P.ramo; pset(x, y, c); }
    rect(0, 0, 251, 5, P.marco); rect(0, 5, 251, 6, P.marcoS); for (let x = 0; x < 252; x += 5) pset(x, 3, P.marcoS);
    // la luz de las dos ventanas sobre el papel y la sombra bajo la cornisa
    for (let y = 7; y <= 97; y++) for (let x = 0; x <= 251; x++) { const d = Math.min(Math.hypot((x - 47) / 60, (y - 64) / 60), Math.hypot((x - 217) / 60, (y - 64) / 60)); if (y < 12 && b_b4(x, y) < (12 - y) * 0.1) b_tinte(R, x, y, hex('#8a6a5a'), 0.2); else if (d > 1 && b_b4(x, y) < Math.min(0.45, (d - 1) * 0.9)) b_tinte(R, x, y, hex('#8a6a5a'), 0.14); }
    // el friso pintado
    rect(0, 99, 251, 130, P.friso); for (let x0 = 2; x0 < 250; x0 += 28) { rect(x0, 102, x0 + 24, 126, P.frisoS); rect(x0 + 1, 103, x0 + 23, 125, P.friso); rect(x0 + 1, 103, x0 + 23, 103, P.frisoL); rect(x0 + 1, 103, x0 + 1, 125, P.frisoL); }
    rect(0, 98, 251, 100, P.marco); rect(0, 128, 251, 130, P.marcoS);
    // la chimenea: el pecho de yeso, la repisa con el reloj, los candeleros y las flores de papel, y la estufa
    b_yeso(R, 252, 0, 319, 130, [hex('#d8ccb8'), hex('#e6dccb'), hex('#f2eadc'), hex('#b8ac98')], 751);
    rect(252, 0, 253, 130, P.marcoS); rect(256, 70, 316, 74, P.marco); rect(256, 70, 316, 70, C.blanco); rect(258, 75, 314, 76, P.marcoS);
    for (const cx of [262, 310]) { rect(cx - 1, 60, cx + 1, 69, P.marcoS); rect(cx - 3, 68, cx + 3, 69, hex('#c8a040')); rect(cx - 1, 54, cx, 59, hex('#f6f0e0')); }
    rect(280, 56, 292, 69, hex('#5a3a24')); disco(286, 61, 4, hex('#f4ecd8')); pset(286, 59, B_K); pset(287, 61, B_K); rect(279, 55, 293, 56, hex('#7a5a3a'));
    rect(298, 62, 304, 69, hex('#8ab0d8')); for (const [i, j, c] of [[-2, -4, P.rosa], [1, -6, P.rojo], [3, -3, P.rosa], [0, -2, hex('#f6e080')]]) disco(301 + i, 62 + j, 1.6, c);
    rect(258, 78, 314, 130, hex('#b8ac98')); rect(262, 82, 310, 130, hex('#3a2e2a')); for (let y = 82; y < 130; y += 4) rect(262, y, 310, y, hex('#4a3e38'));
    for (let y = 92; y <= 128; y++) { const w = y < 96 ? 14 : 18; rect(286 - w, y, 286 + w, y, P.hierro); pset(286 - w, y, P.hierroL); }
    rect(268, 90, 304, 92, P.hierroL); rect(270, 128, 302, 130, P.hierro);
    // el suelo de pino con la alfombra trenzada
    b_suelo(R, 131, 179, b_tablas([P.pinoD, P.pinoS, P.pino, P.pinoL, hex('#b8844a')], 752, 0.6, 6), 3, 1, 91);
    for (let y = 146; y <= 176; y++) for (let x = 14; x <= 98; x++) { const d = Math.hypot((x - 56) / 42, (y - 161) / 15); if (d > 1) continue; const anillo = Math.floor(d * 7); pset(x, y, d > 0.95 ? hex('#5a3a3a') : [hex('#a84a3a'), hex('#d8b878'), hex('#4a6a8a'), hex('#c87a5a'), hex('#7a8a5a'), hex('#d8b878'), hex('#a84a3a')][anillo] ?? hex('#a84a3a'));
      if ((x + y * 2) % 4 === 0) b_tinte(R, x, y, B_K, 0.2); }
    // la estantería con las cajas de encaje, los rollos de papel y los tarros de flores
    rect(80, 56, 118, 96, P.pinoD); for (const sy of [56, 70, 84, 96]) { rect(78, sy, 120, sy + 2, P.pino); rect(78, sy, 120, sy, P.pinoL); }
    for (let k = 0; k < 4; k++) { const bx = 82 + k * 9; rect(bx, 61, bx + 7, 69, [hex('#e8d8c8'), hex('#c8d8e8'), hex('#f0c8d0'), hex('#e8e0b0')][k]); rect(bx, 61, bx + 7, 61, C.blanco); rect(bx + 2, 64, bx + 5, 65, P.rojo); }
    for (let k = 0; k < 5; k++) { const rx = 82 + k * 7; disco(rx + 2, 80, 3, [P.rosa, P.azul, hex('#f6e080'), P.rojo, hex('#c8e0b0')][k]); pset(rx + 2, 80, C.blanco); }
    for (let k = 0; k < 3; k++) { const jx = 84 + k * 12; rect(jx, 88, jx + 6, 95, hex('#c8dce4')); rect(jx, 88, jx + 6, 88, C.blanco); for (let f = 0; f < 3; f++) disco(jx + 1 + f * 2, 86 - (f % 2) * 2, 1.4, [P.rosa, P.rojo, hex('#f6e080')][(f + k) % 3]); }
    // la puerta al cuarto de al lado: el marco, la pared del fondo, la ventana y la mesa larga
    rect(124, 40, 170, 130, P.marco); rect(124, 40, 170, 41, C.blanco); rect(169, 42, 170, 130, P.marcoS);
    for (let y = 44; y <= 130; y++) for (let x = 128; x <= 166; x++) pset(x, y, y > 112 ? (h(x, y, 753) < 0.2 ? P.pinoS : hex('#a87a4a')) : (x % 8 < 1 ? hex('#d8c4b0') : hex('#e2d0bc')));
    rect(138, 56, 156, 82, hex('#dce6ee')); rect(146, 56, 147, 82, P.marco); rect(138, 68, 156, 69, P.marco); rect(136, 54, 158, 55, P.marco);
    b_haz(R, [[138, 82], [156, 82], [168, 112], [132, 112]], hex('#ffffff'), 0.25);
    // la cuerda con las tarjetas tendidas: los clavos
    disco(78, 34, 1.5, hex('#8a6a3a')); disco(186, 34, 1.5, hex('#8a6a3a'));
    // los marcos de las ventanas, el alféizar y las cortinas recogidas
    for (const [x0, y0, x1, y1] of VEN) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 3, P.marco); rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, C.blanco); rect(x1 + 3, y0 - 3, x1 + 4, y1 + 3, P.marcoS); rect(x0 - 6, y1 + 3, x1 + 6, y1 + 6, P.marco); rect(x0 - 6, y1 + 6, x1 + 6, y1 + 7, P.marcoS);
      for (const [cx0, d] of [[x0 - 10, 1], [x1 + 4, -1]]) for (let y = y0 - 6; y <= y1 + 10; y++) { const w = y > y0 + 34 && y < y0 + 42 ? 3 : 6 + Math.round(Math.sin((y - y0) * 0.1) * 1); for (let i = 0; i < w; i++) { const xx = d > 0 ? cx0 + i : cx0 + 6 - i; pset(xx, y, i % 3 === 0 ? P.cortinaS : i % 3 === 1 ? P.cortina : P.cortinaL); } }
      rect(x0 - 12, y0 - 8, x1 + 12, y0 - 6, hex('#8a6a3a')); }
    // el haz de luz de invierno en el suelo
    b_haz(R, [[194, 104], [240, 104], [230, 176], [168, 176]], hex('#e8f0ff'), 0.12);
    b_haz(R, [[24, 104], [70, 104], [92, 150], [40, 150]], hex('#e8f0ff'), 0.1);
  });
  // la vida: las calles nevadas, las tarjetas tendidas que se mecen, las dos mujeres que montan tarjetas al lado, el fuego y la tetera, el gato
  for (const [[x0, y0, x1, y1], k] of VEN.map((v, i) => [v, i])) { b_calleWorcester(R, t, x0, y0, x1, y1, k, 1); b_ventanaGuillotina(R, x0, y0, x1, y1, P); }
  for (let x = 78; x <= 186; x++) pset(x, Math.round(34 + Math.sin((x - 78) / 108 * Math.PI) * 6), hex('#8a7a6a'));
  for (let k = 0; k < 7; k++) { const cx = 88 + k * 14, cy = Math.round(34 + Math.sin((cx - 78) / 108 * Math.PI) * 6), sw = Math.round(Math.sin(t * 1.8 + k) * 1.2), c = [P.rojo, P.rosa, P.encaje, P.azul][k % 4];
    rect(cx - 1, cy - 1, cx, cy + 1, hex('#c8a060')); for (let j = 0; j < 12; j++) { const xx = cx - 4 + Math.round(sw * j / 12); for (let i = 0; i < 9; i++) pset(xx + i, cy + 1 + j, i === 0 || i === 8 || j === 11 ? P.encaje : (i + j) % 5 === 0 ? P.encajeS : c); }
    const hx = cx + Math.round(sw * 0.5); for (const [i, j] of [[-1, 0], [1, 0], [0, 1], [-1, -1], [1, -1], [0, 0]]) pset(hx + i, cy + 6 + j, k % 4 === 0 ? P.encaje : P.rojo); }
  R.recorte([128, 44, 166, 130]);
  rect(130, 106, 164, 111, hex('#8a5a32')); for (let x = 131; x < 164; x += 1) if (x % 5 < 3) pset(x, 106, P.encaje); rect(132, 112, 133, 122, hex('#6a4424')); rect(161, 112, 162, 122, hex('#6a4424'));
  for (const [fx, k] of [[136, 0], [156, 1]]) { const b = Math.round(Math.sin(t * 2.4 + k * 2) * 0.8); b_figurita(R, fx, 118, 16, [k ? hex('#4a5a7a') : hex('#7a4a5a'), k ? hex('#34405a') : hex('#5a3442'), P.piel, P.pelo], 0.3 + b * 0.2); pset(fx + 3 + b, 106, k ? P.rojo : P.rosa); }
  { const u = (t % 3) / 3, cx = Math.round(140 + u * 12); pset(cx, 105 - Math.round(Math.sin(u * Math.PI) * 3), P.rosa); }
  R.recorte(null);
  { const f = 0.5 + 0.5 * Math.sin(t * 6) * Math.sin(t * 2.7); rect(280, 104, 292, 114, hex('#2a1408')); for (let y = 105; y <= 113; y++) for (let x = 281; x <= 291; x++) if (b_b4(x, y) < 0.35 + f * 0.55) pset(x, y, (x + y) % 3 ? P.fuego : hex('#ffd060')); for (let x = 281; x <= 291; x += 2) rect(x, 104, x, 114, P.hierro); b_brillo(R, 286, 112, 30, hex('#ff9a4a'), 0.32 + f * 0.1);
    rect(278, 84, 292, 90, hex('#3a3a44')); rect(278, 84, 292, 84, P.hierroL); rect(292, 85, 297, 87, hex('#3a3a44')); b_humo(R, 297, 83, t, 7, 26, hex('#f4f6f8'), 0.55); }
  { const gx = 252, gy = 152, res = Math.sin(t * 2) > 0 ? 1 : 0, G = [hex('#e08a3a'), hex('#a85a20'), hex('#f4b46a')]; for (let j = 0; j < 5; j++) rect(gx - 7 + (j === 0 ? 2 : 0), gy - j - (j > 1 ? res : 0), gx + 6 - (j === 0 ? 2 : 0), gy - j, j < 2 ? G[1] : (j + gx) % 3 ? G[0] : G[1]);
    rect(gx + 3, gy - 8, gx + 8, gy - 4, G[0]); pset(gx + 4, gy - 9, G[1]); pset(gx + 7, gy - 9, G[1]); rect(gx + 5, gy - 6, gx + 6, gy - 6, G[1]); rect(gx - 4, gy - 4, gx + 1, gy - 4, G[2]);
    for (let i = 0; i < 8; i++) pset(gx - 8 - Math.round(i * 0.3), gy - Math.round(Math.max(0, i - 3) * (0.4 + 0.4 * Math.sin(t * 1.4))), G[1]); }
  return { suelo: 150, mesa: [94, 228, 143], organizador: [188, 234, 136], ventanas: VEN, puerta: [124, 40, 170, 130], chimenea: [252, 0, 319, 130], estufa: [268, 90, 304, 130], alfombra: [14, 146, 98, 176], gato: [252, 152], libre: [[20, 96], [226, 300]] };
}
// la mesa del taller de cerca: detrás, la pared con la estantería, la cuerda con tarjetas y la ventana nevada
function b_tallerMesa(R, t, o, P) {
  const { rect, pset, disco, linea } = R, VX0 = 212, VY0 = 50, VX1 = 266, VY1 = 124;
  b_fijo(R, 'amor-tallerM', () => {
    for (let y = 0; y <= 140; y++) for (let x = 0; x <= 319; x++) { let c = (x % 16) < 3 ? P.raya : P.papel; if (b_b4(x, y) < 0.08) c = P.papelS; const rx = (x + ((y / 20 | 0) & 1) * 8) % 16, ry = y % 20; if (rx === 9 && ry > 6 && ry < 11) c = P.ramo; if (rx === 8 && ry === 7) c = P.ramoR; if (rx === 10 && ry === 8) c = P.ramo; if (x > 270 && y < 50 && c !== P.papel && b_b4(x, y) < 0.6) c = P.papel; pset(x, y, c); }
    rect(0, 0, 319, 6, P.marco); rect(0, 6, 319, 7, P.marcoS);
    // la luz de la ventana sobre el papel (más clara cerca) y la sombra de las esquinas
    for (let y = 8; y <= 111; y++) for (let x = 0; x <= 319; x++) { const d = Math.hypot((x - 239) / 150, (y - 87) / 90); if (d > 1.05 && b_b4(x, y) < Math.min(0.5, (d - 1.05) * 1.2)) b_tinte(R, x, y, hex('#8a6a5a'), 0.18); else if (d < 0.5 && b_b4(x, y) < (0.5 - d) * 0.8) b_tinte(R, x, y, C.blanco, 0.2); }
    // el friso pintado: tablas con la pintura gastada, los cuarterones con su moldura y la sombra bajo el pasamanos
    rect(0, 112, 319, 140, P.friso); rect(0, 112, 319, 114, P.marco); rect(0, 114, 319, 114, P.marcoS); for (let x = 0; x < 320; x++) if (b_b4(x, 115) < 0.5) pset(x, 115, P.frisoS);
    for (let x0 = 4; x0 < 316; x0 += 34) { rect(x0, 118, x0 + 28, 138, P.frisoS); rect(x0 + 1, 119, x0 + 27, 137, P.friso); rect(x0 + 1, 119, x0 + 27, 119, P.frisoL); rect(x0 + 1, 119, x0 + 1, 137, P.frisoL);
      rect(x0 + 4, 122, x0 + 24, 134, P.frisoL); rect(x0 + 5, 123, x0 + 24, 134, P.frisoS); rect(x0 + 5, 123, x0 + 23, 133, P.friso);
      for (let y = 123; y <= 133; y++) for (let x = x0 + 5; x <= x0 + 23; x++) { const g = h(x >> 1, y, 763); if (g < 0.1) pset(x, y, P.frisoS); else if (g > 0.93) pset(x, y, P.frisoL); }
      if (h(x0, 1, 764) < 0.5) { const cx = x0 + 6 + Math.floor(h(x0, 2, 764) * 14), cy = 125 + Math.floor(h(x0, 3, 764) * 6); rect(cx, cy, cx + 2, cy, hex('#c8b8a0')); pset(cx + 1, cy + 1, hex('#a89880')); } }
    for (let x = 0; x < 320; x += 1) if (h(x, 1, 765) < 0.25) pset(x, 139, P.frisoS);
    // el dechado bordado en su marco (una casita, dos árboles y una cenefa de corazones, sin letras)
    rect(128, 66, 182, 104, hex('#6a4424')); rect(129, 67, 181, 103, hex('#8a5a32')); rect(132, 70, 178, 100, hex('#efe6d0')); for (let y = 70; y <= 100; y += 2) for (let x = 132; x <= 178; x += 2) pset(x, y, hex('#e2d8c0'));
    for (let k = 0; k < 8; k++) { const cx = 136 + k * 6; for (const [i, j] of [[-1, 0], [1, 0], [0, 1], [-1, -1], [1, -1], [0, 0]]) { pset(cx + i, 73 + j, P.rojo); pset(cx + i, 97 + j, P.rojo); } }
    rect(149, 84, 161, 93, P.rojo); for (let j = 0; j < 6; j++) rect(148 + j, 83 - j, 162 - j, 83 - j, hex('#5a3a6a')); rect(153, 88, 156, 93, hex('#5a3a24')); rect(150, 86, 151, 87, hex('#f6e080')); rect(158, 86, 159, 87, hex('#f6e080'));
    for (const tx of [139, 171]) { for (let j = 0; j < 9; j++) for (let i = -Math.floor((9 - j) / 3); i <= Math.floor((9 - j) / 3); i++) pset(tx + i, 82 + j, (i + j) % 2 ? P.verde : hex('#3a6a3a')); rect(tx, 91, tx, 93, hex('#5a3a24')); }
    for (let x = 134; x <= 176; x += 2) pset(x, 94, P.verde);
    pset(155, 64, hex('#8a6a3a')); linea(155, 64, 132, 67, hex('#8a7a6a')); linea(155, 64, 178, 67, hex('#8a7a6a'));
    // un ramillete de lavanda seca colgado
    for (let k = 0; k < 7; k++) linea(100, 74, 96 + k * 1.4, 96 + (k % 3) * 2, k % 2 ? hex('#6a8a5a') : hex('#4a6a3a')); for (let k = 0; k < 14; k++) pset(95 + Math.floor(h(k, 1, 762) * 11), 92 + Math.floor(h(k, 2, 762) * 10), hex('#8a6ab0')); rect(98, 76, 102, 78, P.rojo); pset(100, 73, hex('#8a6a3a'));
    rect(10, 60, 120, 63, P.pino); rect(10, 60, 120, 60, P.pinoL); rect(10, 63, 120, 63, P.pinoD); for (const bx of [16, 112]) linea(bx, 64, bx + 4, 70, P.pinoS);
    for (let k = 0; k < 5; k++) { const bx = 14 + k * 20; rect(bx, 44, bx + 16, 59, [hex('#e8d8c8'), hex('#c8d8e8'), hex('#f0c8d0'), hex('#e8e0b0'), hex('#d8e8c8')][k]); rect(bx, 44, bx + 16, 45, C.blanco); rect(bx + 16, 45, bx + 16, 59, hex('#b8ae9e')); rect(bx + 5, 50, bx + 11, 52, P.rojo); }
    for (const [x0, y0, x1, y1] of [[VX0, VY0, VX1, VY1]]) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 3, P.marco); rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, C.blanco); rect(x0 - 6, y1 + 3, x1 + 6, y1 + 6, P.marco);
      for (const [cx0, d] of [[x0 - 12, 1], [x1 + 4, -1]]) for (let y = y0 - 6; y <= y1 + 12; y++) { const w = y > y0 + 40 && y < y0 + 48 ? 4 : 8; for (let i = 0; i < w; i++) { const xx = d > 0 ? cx0 + i : cx0 + 8 - i; pset(xx, y, i % 3 === 0 ? P.cortinaS : i % 3 === 1 ? P.cortina : P.cortinaL); } } rect(x0 - 14, y0 - 9, x1 + 14, y0 - 7, hex('#8a6a3a')); }
    disco(10, 24, 1.5, hex('#8a6a3a')); disco(196, 24, 1.5, hex('#8a6a3a'));
    // los patrones de papel clavados (corazones y abanicos de cartulina) y el almanaque de 1848, solo con cifras
    for (const [px, py, k] of [[24, 76, 0], [44, 80, 1], [30, 96, 2]]) { const c = [hex('#f6eedc'), hex('#e8d0c0'), hex('#f0e4c8')][k]; rect(px, py, px + 14, py + 12, hex('#b8a890')); rect(px - 1, py - 1, px + 13, py + 11, c);
      if (k === 1) { for (let j = 0; j < 8; j++) for (let i = -j; i <= j; i++) if ((i + j) % 2 === 0) pset(px + 6 + Math.round(i * 0.7), py + 9 - j, hex('#b89a7a')); } else { for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) { const X = i / 5, Y = -j / 4.5; if ((X * X + Y * Y - 1) ** 3 - X * X * Y ** 3 <= 0 && (X * X + Y * Y - 1) ** 3 - X * X * Y ** 3 > -0.08) pset(px + 6 + i, py + 5 + j, hex('#9a6a5a')); } }
      pset(px + 6, py, hex('#c0302a')); pset(px + 6, py - 1, hex('#e86a5a')); }
    rect(286, 58, 312, 96, hex('#b8a890')); rect(285, 57, 311, 95, hex('#f6f0e2')); rect(285, 57, 311, 64, hex('#c02a3a')); a_cifra(R, 290, 59, '1848', C.blanco);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 287 + c * 4, y = 68 + r * 6; rect(x, y, x + 2, y + 1, hex('#8a7a6a')); } rect(299, 80, 302, 81, hex('#c02a3a')); R.anillo(300, 80, 3, hex('#c02a3a'));
    pset(298, 56, hex('#8a6a3a'));
    // las tijeras grandes colgadas de un clavo
    pset(204, 76, hex('#8a6a3a')); R.anillo(202, 80, 2.5, hex('#3a3a42')); R.anillo(207, 80, 2.5, hex('#3a3a42')); linea(203, 82, 202, 98, hex('#9aa0aa')); linea(206, 82, 204, 98, hex('#7a808a')); pset(203, 84, hex('#d8dce4'));
  });
  b_calleWorcester(R, t, VX0, VY0, VX1, VY1, 1, 1); b_ventanaGuillotina(R, VX0, VY0, VX1, VY1, P);
  // el jilguero en su jaula colgada de la balda: salta de un palo a otro y picotea; cae alguna semilla
  { const jx = 78, jy = 68, salta = Math.floor(t / 1.3) % 3, fase = (t % 1.3) / 1.3, px = [jx - 4, jx + 3, jx][salta], py = [jy + 18, jy + 14, jy + 24][salta] - (fase < 0.2 ? Math.round(Math.sin(fase / 0.2 * Math.PI) * 3) : 0);
    linea(jx, 63, jx, jy - 2, hex('#8a6a3a')); for (let i = -8; i <= 8; i++) { const top = jy + Math.round(Math.abs(i) * Math.abs(i) / 10); pset(jx + i, top, hex('#c8a040')); if (i % 3 === 0) for (let y = top; y <= jy + 28; y++) pset(jx + i, y, (y + i) % 5 ? hex('#b89030') : hex('#e8c060')); }
    rect(jx - 9, jy + 28, jx + 9, jy + 30, hex('#8a6420')); rect(jx - 9, jy + 28, jx + 9, jy + 28, hex('#e8c060')); linea(jx - 7, jy + 19, jx - 1, jy + 19, hex('#8a5a32')); linea(jx + 1, jy + 15, jx + 7, jy + 15, hex('#8a5a32')); rect(jx - 3, jy + 25, jx + 3, jy + 27, hex('#e8e4dc'));
    const pica = salta === 2 && Math.sin(t * 9) > 0 ? 1 : 0; rect(px - 2, py - 3, px + 2, py, hex('#f0d040')); rect(px - 2, py - 1, px - 1, py, hex('#3a3a2a')); pset(px + 2, py - 4 + pica, hex('#f0d040')); pset(px + 3, py - 3 + pica, hex('#e8904a')); pset(px + 1, py - 3, B_K); rect(px - 1, py - 3, px - 1, py - 2, B_K);
    { const u = (t % 3.7) / 3.7; if (u < 0.4) pset(jx - 1 + Math.round(u * 6), jy + 30 + Math.round(u * 60), hex('#d8c070')); } }
  // las motas de polvo en la luz de la ventana
  b_motas(R, t, 200, 300, 60, 140, 10, hex('#fff8e8'), -0.3);
  for (let x = 10; x <= 196; x++) pset(x, Math.round(24 + Math.sin((x - 10) / 186 * Math.PI) * 8), hex('#8a7a6a'));
  for (let k = 0; k < 9; k++) { const cx = 24 + k * 20, cy = Math.round(24 + Math.sin((cx - 10) / 186 * Math.PI) * 8), sw = Math.round(Math.sin(t * 1.6 + k) * 1.4), c = [P.rojo, P.rosa, P.encaje, P.azul][k % 4];
    rect(cx - 1, cy - 1, cx, cy + 1, hex('#c8a060')); for (let j = 0; j < 14; j++) { const xx = cx - 5 + Math.round(sw * j / 14); for (let i = 0; i < 11; i++) pset(xx + i, cy + 1 + j, i === 0 || i === 10 || j === 13 ? P.encaje : (i + j) % 4 === 0 ? P.encajeS : c); }
    const hx = cx + Math.round(sw * 0.5); for (const [i, j] of [[-1, 0], [1, 0], [0, 1], [-1, -1], [1, -1], [0, 0], [-2, -1], [2, -1]]) pset(hx + i, cy + 7 + j, k % 4 === 0 ? P.rojo : P.encaje); }
  b_brillo(R, 240, 150, 60, hex('#eef4ff'), 0.12);
  return { suelo: 150, mesa: [0, 319, 144], tarjeta: [126, 146, 194, 177], ventana: [VX0, VY0, VX1, VY1], libre: [[20, 120], [200, 300]] };
}
// la mesa del taller, delante de Esther: en la general, la mesa larga con encajes, tijeras, cola, flores y tarjetas; en
// 'mesa', el tablero de cerca con la tarjeta a medio hacer (o.tarjeta 0–1)
function b_tallerDelante(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, P = b_palTaller();
  const encaje = (x0, y0, x1, y1, k = 0, a = 1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x, y - y0, y1 - y); let hueco = false;
      if (bx < 3) hueco = ((x + y) % 3 === 0) || (bx === 0 && (x + y) % 2 === 0); else { const cx = (x - x0) % 6 - 3, cy = (y - y0) % 6 - 3; hueco = cx * cx + cy * cy < 3; }
      if (!hueco && (a >= 1 || h(x, y, 760 + k) < a)) pset(x, y, bx === 0 ? P.encajeS : P.encaje); } };
  const tijeras = (x, y, ab) => { linea(x, y, x + 16, y - 4 - ab, hex('#9aa0aa')); linea(x, y + 1, x + 16, y + 4 + ab, hex('#7a808a')); linea(x, y, x + 15, y - 3 - ab, hex('#d8dce4')); R.anillo(x - 3, y - 3, 2.5, hex('#3a3a42')); R.anillo(x - 3, y + 4, 2.5, hex('#3a3a42')); pset(x + 1, y, hex('#3a3a42')); };
  const flor = (x, y, c) => { for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) pset(x + i, y + j, c); pset(x, y, hex('#f6e080')); };
  if (cam === 'mesa') {
    b_madera(R, 0, 144, 319, 179, P.pino, P.pinoS, P.pinoL, P.pinoD, 761, 10); rect(0, 144, 319, 145, P.pinoL);
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) if (b_b4(x, y) < (y - 146) / 100) b_tinte(R, x, y, B_K, 0.2);
    b_haz(R, [[180, 146], [319, 146], [319, 179], [220, 179]], hex('#f4f8ff'), 0.12);
    // la caja de tarjetas acabadas
    rect(8, 151, 70, 178, hex('#6a4a34')); rect(10, 153, 68, 176, hex('#e8d8c4')); for (let k = 0; k < 5; k++) { rect(12, 155 + k * 4, 66, 157 + k * 4, k % 2 ? P.rosa : P.encaje); for (let x = 12; x < 66; x += 2) pset(x, 155 + k * 4, C.blanco); } rect(8, 151, 70, 152, hex('#8a6a4a'));
    // las tijeras, el carrete de cinta y las flores sueltas
    tijeras(90, 164, Math.round(Math.max(0, Math.sin(t * 1.5)) * 2));
    disco(296, 164, 9, hex('#c8a060')); disco(296, 164, 7, P.rojo); disco(296, 164, 2, hex('#8a6a3a')); for (let i = 0; i < 6; i++) pset(296 - 8 - i * 3, 170 + Math.round(Math.sin(i + t * 2) * 1), P.rojo);
    for (const [fx, fy, c] of [[106, 152, P.rosa], [112, 175, P.azul], [204, 174, P.rojo], [214, 152, P.rosa]]) flor(fx, fy, c);
    // el bote de cola con su pincel, que entra y sale
    rect(256, 150, 272, 166, hex('#a8c0c8')); rect(256, 150, 272, 151, hex('#d8e8ee')); rect(257, 152, 271, 164, hex('#e8e0c8')); rect(256, 166, 272, 167, hex('#7a909a'));
    { const sube = Math.max(0, Math.sin(t * 1.3)) * 10; linea(264, 154 - sube, 274, 132 - sube, hex('#8a5a32')); rect(262, 154 - sube, 265, 157 - sube, hex('#d8d0b8')); }
    // el encaje suelto, que el aire levanta un poco
    { const lv = Math.round(Math.max(0, Math.sin(t * 1.1)) * 3); encaje(214, 156 - lv, 246, 173, 1); for (let x = 214; x <= 246; x++) pset(x, 174, hex('#a87a4a')); }
    // la tarjeta a medio hacer (o.tarjeta): el papel, el encaje, el corazón, las flores y el lazo
    const u = o.tarjeta ?? 0.5, x0 = 126, y0 = 146, x1 = 194, y1 = 177;
    rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, P.pinoD); rect(x0, y0, x1, y1, hex('#f8f0e0')); rect(x0 + 4, y0 + 4, x1 - 4, y1 - 4, hex('#e8a0b0'));
    if (u > 0.15) encaje(x0, y0, x1, y1, 2, Math.min(1, (u - 0.15) / 0.35));
    if (u > 0.5) { const cx = 160, cy = 162, s = Math.min(1, (u - 0.5) / 0.15); for (let j = -9; j <= 9; j++) for (let i = -11; i <= 11; i++) { const X = i / 10 / s, Y = -j / 9 / s; if ((X * X + Y * Y - 1) ** 3 - X * X * Y ** 3 <= 0) pset(cx + i, cy + j, j < -4 && i < -3 ? hex('#e85060') : P.rojo); } }
    if (u > 0.68) for (const [fx, fy, c] of [[x0 + 8, y0 + 8, P.rosa], [x1 - 8, y0 + 8, P.azul], [x0 + 8, y1 - 8, hex('#f6e080')], [x1 - 8, y1 - 8, P.rosa]].slice(0, Math.ceil((u - 0.68) / 0.06))) { disco(fx, fy, 2.5, c); pset(fx, fy, hex('#f6e080')); pset(fx - 3, fy + 1, P.verde); pset(fx + 3, fy + 1, P.verde); }
    if (u > 0.92) { const cx = 160, cy = y0 + 3; for (const [i, j] of [[-4, -2], [-3, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, -1], [4, -2], [-4, 1], [4, 1], [-1, 2], [1, 3]]) pset(cx + i, cy + j, P.rojo); pset(cx, cy, hex('#8a1a2a')); }
    return;
  }
  // la mesa larga de la general: baja (tablero en y 144), sin faldón, para que a Esther se le vea medio cuerpo y lo que
  // hace; encima, a la derecha, el organizador de cajoncitos (x 188–234, tapa en y 136) donde se dejan la caja y las tarjetas
  for (const lx of [98, 220]) { rect(lx, 150, lx + 5, 172, P.pinoS); rect(lx, 150, lx, 172, P.pino); rect(lx + 5, 150, lx + 5, 172, P.pinoD); rect(lx - 1, 171, lx + 6, 172, P.pinoD); }
  rect(103, 164, 219, 166, P.pinoS); rect(103, 164, 219, 164, P.pino); rect(103, 166, 219, 166, P.pinoD);
  for (let x = 96; x <= 226; x++) for (let y = 173; y <= 175; y++) if (b_b4(x, y) < 0.5 - (y - 173) * 0.15) b_tinte(R, x, y, B_K, 0.35);
  b_madera(R, 94, 143, 228, 146, P.pino, P.pinoS, P.pinoL, P.pinoD, 768, 4); rect(94, 143, 228, 143, P.pinoL);
  rect(94, 147, 228, 150, P.pinoS); rect(94, 147, 228, 147, P.pinoD); rect(94, 150, 228, 150, P.pinoD); for (let x = 98; x < 226; x += 23) { rect(x, 148, x + 1, 149, P.pinoD); pset(x + 12, 148, P.pino); }
  rect(94, 143, 94, 150, P.pinoL); rect(228, 143, 228, 150, P.pinoD);
  // el organizador de cajoncitos con tiradores de latón
  rect(188, 136, 234, 143, P.pinoD); rect(189, 137, 233, 142, P.pinoS); rect(188, 136, 234, 136, P.pinoL);
  for (let k = 0; k < 5; k++) { const dx = 190 + k * 9; rect(dx, 138, dx + 7, 141, P.pino); rect(dx, 138, dx + 7, 138, P.pinoL); pset(dx + 3, 140, hex('#e8c060')); pset(dx + 4, 140, hex('#a87a30')); }
  for (let x = 188; x <= 234; x++) if (b_b4(x, 142) < 0.5) b_tinte(R, x, 143, B_K, 0.3);
  // lo que hay en el tablero: los encajes, la tarjeta empezada, las tijeras, el bote de cola, el carrete, los papeles y flores
  encaje(102, 137, 122, 143, 3); encaje(106, 135, 124, 141, 4);
  rect(130, 138, 148, 143, hex('#e8a0b0')); encaje(130, 138, 148, 143, 5, 0.8); rect(131, 143, 149, 143, hex('#b87a5a'));
  rect(150, 140, 168, 142, hex('#f4ecd8')); rect(152, 139, 170, 141, hex('#f8f0e0')); linea(152, 139, 170, 139, C.blanco);
  tijeras(154, 141, Math.round(Math.max(0, Math.sin(t * 1.2)) * 1));
  rect(172, 136, 178, 142, hex('#a8c0c8')); rect(172, 136, 178, 136, hex('#d8e8ee')); rect(173, 137, 177, 141, hex('#e8e0c8')); linea(175, 137, 180, 129, hex('#8a5a32'));
  disco(184, 140, 3, hex('#c8a060')); disco(184, 140, 2, P.rojo); pset(184, 140, hex('#8a6a3a'));
  for (let k = 0; k < 5; k++) { rect(196, 134 - k * 2, 216, 135 - k * 2, k % 2 ? P.rosa : P.encaje); pset(196, 134 - k * 2, C.blanco); }
  for (const [fx, fy, c] of [[126, 140, P.rosa], [168, 137, P.rojo], [224, 133, P.azul], [128, 144, P.rosa], [212, 146, P.rojo]]) flor(fx, fy, c);
  // un recorte de papel que cuelga del borde y se mueve con el aire
  { const sw = Math.round(Math.sin(t * 1.7) * 1.5); for (let j = 0; j < 6; j++) { pset(140 + Math.round(sw * j / 6), 151 + j, P.encaje); pset(141 + Math.round(sw * j / 6), 151 + j, j % 2 ? P.encajeS : P.encaje); } }
}
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada 4 × 4 (0–1) en (x, y)
const c_um = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0: a; k = 1: b)
function c_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// los colores propios de primavera y otoño
const c_K = Object.fromEntries(Object.entries({
  cal: '#ece2cc', calS: '#d2c6aa', calL: '#f8f2e2', calD: '#ad9f84',
  zocalo: '#6a8aa8', zocaloS: '#4e6c8a', zocaloL: '#88a6be',
  viga: '#5a3a24', vigaS: '#3a2416', vigaL: '#7a5434', techo: '#4a3022', techoS: '#3a2618',
  terra: '#b8643e', terraS: '#9a4e30', terraL: '#cc7c52', junta: '#7a4630',
  hollin: '#2a2026', ladH: '#6a3a2e', ladHS: '#4a2820',
  cobre: '#c8763a', cobreS: '#8a4a22', cobreL: '#f0a868',
  mimbre: '#c8a060', mimbreS: '#8a6a38', mimbreL: '#e8c888', mimbreD: '#5e4626',
  huevo: '#f4ecdc', huevoS: '#cfc2a8', huevoM: '#d8a878', huevoMS: '#a87a50',
  tinte: '#a8201e', tinteS: '#6a1010', tinteL: '#d84a3a',
  fuego: '#f08a28', fuegoL: '#ffd860', fuegoS: '#c04818', brasa: '#ff6a20',
  hoja: '#4a8a34', hojaS: '#2e6024', hojaL: '#7ab84a', hojaD: '#1e4418',
  flor: '#f4b8d0', florS: '#d888a8', florL: '#fff0f6', lila: '#a07ac8', lilaS: '#7a58a0', lilaL: '#c8a8e8', forsit: '#f0c830', forsitS: '#c09a18', forsitL: '#fff08a',
  entram: '#4a2e1e', entramS: '#2e1c12', yesoE: '#f0e8d4', yesoES: '#d4c8b0',
  tejaR: '#b04a30', tejaRS: '#84321e', tejaRL: '#d06a48',
  piedraP: '#8a8478', piedraPS: '#625c52', piedraPL: '#aea694', mortero: '#b8ae9a',
  graneroR: '#9a3426', graneroRS: '#6e2218', graneroRL: '#b84a36',
  paja: '#c89a4a', pajaS: '#946e30', pajaL: '#e4bc6a', pajaD: '#6a4c22',
  turba: '#6a5a50', brezo: '#b0603a', brezoS: '#7a3e24',
  tabla: '#d8d0b0', tablaS: '#b0a888', tablaL: '#ece6cc',
  nieve: '#eef2f8', nieveS: '#c4ccdc', nieveL: '#ffffff',
  asfalto: '#4a4650', asfaltoS: '#3a3640', acera: '#a8a4a0', aceraS: '#8a8682',
  menta: '#a8d8c0', mentaS: '#80b49c', rosaC: '#f0b8b0', rosaCS: '#cc928a', amarC: '#f0dc98', amarCS: '#ccb470',
  luz: '#ffd878', luzL: '#fff4c0', luzS: '#e8a040', tele: '#8ab4f0', teleS: '#5a7ac8',
  calab: '#e8781e', calabS: '#b0501a', calabL: '#f8a040', calabT: '#4a6a28',
  ave: '#3a3446',
}).map(([k, v]) => [k, hex(v)]));

const c_NUBE_DIA = [hex('#b4c8e0'), hex('#e4eef8'), hex('#ffffff')];

const c_CIELO_PRIM = ['#4a8ed8', '#5e9ee0', '#78b2e8', '#98c6ee', '#bcdcf2', '#d8eaf2'].map(hex);

const c_CACHE = new WeakMap();

// un búfer fijo que se pinta una sola vez por clave (lo que no se pinta queda a 0, transparente); devuelve el búfer
function c_capa(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega lo pintado (≠ 0) de un búfer encima de lo que hay (un recorrido de la pantalla)
function c_pegar(R, b) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = b[i]; if (c) B[i] = c; } }

// pega con trama la mezcla de dos búferes (a con u = 0, b con u = 1); transp: solo lo pintado
function c_pegar2(R, a, b, u, transp) {
  if (u <= 0) return transp ? c_pegar(R, a) : R.copiar(a); if (u >= 1) return transp ? c_pegar(R, b) : R.copiar(b);
  const B = R.buf; for (let y = 0; y < 180; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const i = f + x, c = c_um(x, y) < u ? b[i] : a[i]; if (c || !transp) B[i] = c; } }
}

// degradado vertical tramado (cols de arriba abajo) en el rectángulo (x0, y0)–(x1, y1)
function c_grad(R, x0, y0, x1, y1, cols) {
  const B = R.buf, n = cols.length - 1;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, k = Math.min(n - 1, Math.floor(u)), f = u - k;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = f > c_um(x, y) ? cols[k + 1] : cols[k]; }
}

// superficie con manchas (cal, yeso, piedra lisa): base c, manchas de sombra cS y de luz cL en dos escalas, y motas
function c_textura(R, x0, y0, x1, y1, c, cS, cL, k = 0, esc = 3, pS = 0.2, pL = 0.14) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const n = h(Math.floor(x / esc), Math.floor(y / esc), k) * 0.58 + h(Math.floor(x / (esc * 3)), Math.floor(y / (esc * 3)), k + 1) * 0.36 + h(x, y, k + 2) * 0.06;
    B[y * 320 + x] = n < pS + 0.17 ? cS : n > 0.86 - pL ? cL : c; }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda) de ancho w
function c_nube(R, cx, cy, w, [cS, c, cL]) {
  const r = Math.max(2, w * 0.28), B = [[-w * 0.38, 1.2, r * 0.7], [-w * 0.14, -0.6, r * 0.95], [w * 0.14, -1, r], [w * 0.38, 1, r * 0.72]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.2, rr, cS);
  R.poligono([[cx - w * 0.5, cy + r * 0.4], [cx + w * 0.5, cy + r * 0.4], [cx + w * 0.46, cy + r * 0.95], [cx - w * 0.46, cy + r * 0.95]], cS);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.88, c);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - rr * 0.25, cy + dy - rr * 0.3, rr * 0.5, cL);
}

// las nubes de una lista [x0, y, ancho, velocidad] que cruzan y vuelven a entrar por el otro lado (no paran en la esquina de Atom: la cruzan bajas)
function c_nubes(R, t, lista, tonos) {
  for (const [x0, y, w, v] of lista) { const span = 320 + 2 * w, cx = ((x0 + t * v) % span + span) % span - w; c_nube(R, cx, y, w, tonos); }
}

// pájaros lejanos que aletean (una «v») entre y0 e y1; se saltan la esquina de Atom y la barra del año
function c_aves(R, t, n, y0, y1, k = 0, col = c_K.ave, v0 = 9) {
  for (let i = 0; i < n; i++) { const v = v0 + h(i, 1, 415 + k) * 8, x = Math.round(((h(i, 2, 415 + k) * 380 + t * v) % 380) - 30), y = Math.round(y0 + h(i, 3, 415 + k) * (y1 - y0) + Math.sin(t * 0.8 + i) * 3), a = Math.sin(t * 9 + i * 1.7) > 0;
    if ((x > 268 && y < 48) || (x > 16 && x < 174 && y < 17)) continue;
    R.pset(x, y, col); R.pset(x - 1, y - (a ? 1 : 0), col); R.pset(x + 1, y - (a ? 1 : 0), col); if (i % 2) { R.pset(x - 2, y - (a ? 2 : -1), col); R.pset(x + 2, y - (a ? 2 : -1), col); } }
}

// estrellas fijas y unas cuantas que titilan, hasta y1 (fuera de la esquina de Atom); u: cuánto se ven (0–1)
function c_estrellas(R, t, y1, k = 0, u = 1) {
  for (let i = 0; i < 120; i++) { const x = Math.floor(h(i, 1, 600 + k) * 320), y = Math.floor(h(i, 2, 600 + k) ** 1.4 * y1), q = h(i, 3, 600 + k);
    if ((x >= 274 && y <= 46) || q > u * 1.2 || c_um(x, y) > u) continue;
    const s = i % 7 === 0 ? Math.sin(t * (1.5 + q * 2) + i) : 0; R.pset(x, y, s > 0.6 ? hex('#ffffff') : q < 0.15 ? hex('#e8ecff') : q < 0.5 ? hex('#a8b4e0') : hex('#6a76b0'));
    if (s > 0.85 && i % 14 === 0) { R.pset(x - 1, y, hex('#6a76b0')); R.pset(x + 1, y, hex('#6a76b0')); R.pset(x, y - 1, hex('#6a76b0')); R.pset(x, y + 1, hex('#6a76b0')); } }
}

// la luna con su halo tramado, cráteres y el borde en sombra; creciente: la tapa un disco del color del cielo
function c_luna(R, x, y, r, cielo, creciente = false) {
  R.halo(x, y, r * 2.6, [c_mez(cielo, hex('#ffffff'), 0.06), c_mez(cielo, hex('#ffffff'), 0.12), c_mez(cielo, hex('#ffffff'), 0.2)], 1.1);
  R.disco(x, y, r, (px, py, d) => { const sh = (px - x) * 0.6 + (py - y) * 0.4; return d > 0.86 && sh > 0 ? hex('#c8c2a4') : sh > r * 0.45 ? hex('#e4dec0') : hex('#f6f2dc'); });
  if (creciente) R.disco(x + r * 0.55, y - r * 0.25, r * 0.9, cielo);
  else { for (const [dx, dy, rr] of [[-0.35, -0.2, 0.22], [0.25, 0.3, 0.16], [0.1, -0.45, 0.12]]) R.disco(x + dx * r, y + dy * r, Math.max(1, rr * r), hex('#d4ceb0')); }
}

// humo de una chimenea en bolitas que crecen y se aclaran (deriva: px por unidad de subida, hacia la izquierda si < 0)
function c_humo(R, x, y, t, k = 0, cols = [hex('#b8b4bc'), hex('#d4d0d8'), hex('#9a96a2')], alto = 24, deriva = -0.5) {
  for (let i = 0; i < 6; i++) { const u = ((t * 0.32 + i / 6 + k * 0.13) % 1), r = 1 + u * 3, xx = x + Math.sin(u * 5 + i + t * 0.6) * 1.5 + u * alto * deriva * -1 * -1, yy = y - u * alto;
    R.disco(Math.round(xx + 0.5), Math.round(yy + 0.6), r, cols[2]); R.disco(Math.round(xx), Math.round(yy), r * 0.85, u > 0.6 ? cols[1] : cols[0]); }
}

// un huevo (x, y: su centro) de tamaño s (1: 3 × 4 px; 2: 5 × 7; 3: 7 × 9) con su sombra y su brillo; deco: 'raya', 'puntos' o nada
function c_huevo(R, x, y, c, cS, s = 1, deco = null, cD = null) {
  x = Math.round(x); y = Math.round(y);
  const F = s === 1 ? ['.c.', 'ccc', 'ccS', '.S.'] : s === 2 ? ['.ccc.', 'cLccc', 'ccccc', 'cccSS', 'ccSSS', '.SSS.', '..k..'] : ['..ccc..', '.cLLcc.', 'cLccccc', 'ccccccc', 'cccccSS', 'ccccSSS', '.cSSSS.', '..SSS..', '...k...'];
  const w = F[0].length, hh = F.length; R.dibujo(F, x - (w >> 1), y - (hh >> 1), 1, { c, S: cS, L: c_mez(c, hex('#ffffff'), 0.55), k: c_mez(cS, hex('#000000'), 0.4) });
  if (deco && cD != null && s > 1) { const y0 = y - (hh >> 1);
    if (deco === 'raya') { R.rect(x - (w >> 1), y0 + (hh >> 1) - 1, x + (w >> 1), y0 + (hh >> 1) - 1, cD); if (s > 2) R.rect(x - 2, y0 + 2, x + 2, y0 + 2, cD); }
    else { R.pset(x - 1, y0 + 2, cD); R.pset(x + 1, y0 + 4, cD); if (s > 2) { R.pset(x + 2, y0 + 2, cD); R.pset(x - 2, y0 + 5, cD); } } }
}

// una gallina (x: centro, suelo) que picotea o anda; dir 1 mira a la derecha; parda o blanca
function c_gallina(R, x, suelo, t, dir = 1, k = 0, parda = false, anda = false) {
  x = Math.round(x); suelo = Math.round(suelo);
  const pal = { k: hex('#2a1c1a'), W: parda ? hex('#a8642e') : hex('#f2ece0'), S: parda ? hex('#7a4420') : hex('#c8bca8'), L: parda ? hex('#c88448') : hex('#ffffff'), T: parda ? hex('#4a2a14') : hex('#9a9080'), R: hex('#d8282a'), y: hex('#e8b030') };
  const pica = !anda && ((t * 0.7 + k * 0.37) % 2) < 0.5 && Math.sin(t * 14 + k) > -0.6, paso = anda ? Math.floor(t * 7 + k) % 2 : 0;
  R.dibujo(['.T.......', 'TTL......', 'TWWLLL...', '.WWWWWWW.', '.SWWWWWW.', '..SSSSS..'], x - 4, suelo - 8, dir, pal);
  R.dibujo(paso ? ['...y.y...', '..y...y..'] : ['...y.y...', '...y.y...'], x - 4, suelo - 2, dir, pal);
  const hx = x + dir * (pica ? 4 : 3), hy = suelo - (pica ? 6 : 11);
  R.dibujo(['.R..', 'WRW.', 'WkWy', 'WWR.'], dir > 0 ? hx - 1 : hx - 2, hy, dir, pal);
}

// una copa de árbol de tres tonos hecha de bolas [dx, dy, r] alrededor de (x, y); m: lo que se mece
function c_copa(R, x, y, bolas, [cD, cS, c, cL], m = 0) {
  for (const [dx, dy, r] of bolas) R.disco(x + dx + m, y + dy + 1, r + 1, cD);
  for (const [dx, dy, r] of bolas) R.disco(x + dx + m, y + dy, r, cS);
  for (const [dx, dy, r] of bolas) R.disco(x + dx - r * 0.2 + m, y + dy - r * 0.25, r * 0.72, c);
  for (const [dx, dy, r] of bolas) R.disco(x + dx - r * 0.4 + m, y + dy - r * 0.5, r * 0.3, cL);
  // la textura de hojas: grupitos de sombra abajo a la derecha y de luz arriba a la izquierda de cada bola
  bolas.forEach(([dx, dy, r], b) => { if (r < 5) return; const n = Math.round(r * r * 0.35);
    for (let i = 0; i < n; i++) { const a = h(i, b, 1200) * 6.283, d = Math.sqrt(h(i, b, 1201)) * r * 0.92, px = Math.round(x + dx + m + Math.cos(a) * d), py = Math.round(y + dy + Math.sin(a) * d), lado = Math.cos(a) * 0.6 + Math.sin(a) * 0.8;
      const q = lado > 0.3 ? (i % 3 ? cS : cD) : lado < -0.4 ? (i % 2 ? cL : c) : (i % 2 ? cS : c); R.pset(px, py, q); if (i % 4 === 0) R.pset(px + 1, py, q); } });
}

// hojas o pétalos que caen meciéndose dentro de una caja (n, colores, velocidad)
function c_caen(R, t, n, x0, x1, y0, y1, cols, k = 0, v = 9) {
  for (let i = 0; i < n; i++) { const vv = v * (0.7 + h(i, 1, 700 + k) * 0.6), y = y0 + ((h(i, 2, 700 + k) * (y1 - y0) + t * vv) % (y1 - y0)), x = x0 + ((h(i, 3, 700 + k) * (x1 - x0) + t * vv * 0.5 + Math.sin(t * 2 + i) * 5) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const c = cols[i % cols.length], f = Math.floor(t * 4 + i) % 2; R.pset(Math.round(x), Math.round(y), c); R.pset(Math.round(x) + (f ? 1 : -1), Math.round(y) + (f ? 0 : 1), c); }
}

// copos de nieve en dos planos: los de lejos, pequeños y lentos; los de cerca, de 2 px y más rápidos
function c_copos(R, t, n, k = 0, y1 = 180) {
  for (let i = 0; i < n; i++) { const cerca = i % 3 === 0, v = cerca ? 16 : 8, y = (h(i, 1, 720 + k) * (y1 + 10) + t * v * (0.8 + h(i, 4, 720 + k) * 0.4)) % (y1 + 10) - 5, x = ((h(i, 2, 720 + k) * 340 + Math.sin(t * 0.9 + i) * 6 - t * 3) % 340 + 340) % 340 - 10;
    if (x > 272 && y < 46) continue; const xx = Math.round(x), yy = Math.round(y);
    if (cerca) { R.pset(xx, yy, c_K.nieveL); R.pset(xx + 1, yy, c_K.nieve); R.pset(xx, yy + 1, c_K.nieve); R.pset(xx + 1, yy + 1, c_K.nieveS); } else R.pset(xx, yy, i % 2 ? c_K.nieve : c_K.nieveS); }
}

// una llama que baila (x, base y; ancho w, alto a): tres capas, de fuera a dentro
function c_llama(R, x, y, w, a, t, k = 0) {
  for (const [f, c] of [[1, c_K.fuegoS], [0.68, c_K.fuego], [0.36, c_K.fuegoL]]) {
    const ww = w * f, aa = a * (0.55 + 0.45 * f) * (0.85 + 0.15 * Math.sin(t * 11 + k * 3)), sw = Math.sin(t * 7 + k) * w * 0.25;
    R.poligono([[x - ww, y], [x - ww * 0.7, y - aa * 0.45], [x + sw * 0.6 - ww * 0.15, y - aa * 0.8], [x + sw, y - aa], [x + sw * 0.4 + ww * 0.3, y - aa * 0.6], [x + ww * 0.75, y - aa * 0.35], [x + ww, y]], c); }
}

// resplandor: mezcla tramada hacia col, más fuerte en el centro (radio r, fuerza a); limitado a su caja
function c_resplandor(R, cx, cy, r, col, a = 0.35, ry = r) {
  const B = R.buf;
  for (let y = Math.max(0, Math.round(cy - ry)); y <= Math.min(179, Math.round(cy + ry)); y++) for (let x = Math.max(0, Math.round(cx - r)); x <= Math.min(319, Math.round(cx + r)); x++) {
    const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue; const g = (1 - d) * a; if (g * 1.6 > c_um(x, y)) { const i = y * 320 + x; B[i] = c_mez(B[i], col, Math.min(0.6, g * 1.4)); } }
}

// una calabaza (x, y: su centro; r: radio) con gajos, rabo y hoja; tallada: ojos, nariz y boca con la vela que tiembla
function c_calabaza(R, x, y, r, t, tallada = false, k = 0, nabo = false) {
  x = Math.round(x); y = Math.round(y); const ry = Math.round(r * 0.82);
  const [c, cS, cL] = nabo ? [hex('#e8dcc0'), hex('#b8a080'), hex('#f8f0dc')] : [c_K.calab, c_K.calabS, c_K.calabL];
  for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = (i / (r + 0.5)) ** 2 + (j / (ry + 0.5)) ** 2; if (d > 1.08) continue;
    const gajo = Math.abs(Math.sin((i / r) * 2.4 * Math.PI / 2 * (nabo ? 0.6 : 1))) < 0.18 && Math.abs(i) < r - 1;
    const mor = nabo && j < -ry * 0.3; R.pset(x + i, y + j, d > 0.9 ? C.k : mor ? (i > r * 0.3 ? hex('#6a3a6a') : hex('#9a6a9a')) : gajo ? cS : (i + j * 0.6) < -r * 0.45 ? cL : (i > r * 0.35 || j > ry * 0.5) ? cS : c); }
  if (nabo) { R.rect(x - 1, y - ry - 3, x, y - ry, hex('#8a5a8a')); R.pset(x + 1, y - ry - 3, hex('#5a8a3a')); R.pset(x + 2, y - ry - 4, hex('#5a8a3a')); for (let i = -r + 1; i < r; i++) if (h(i, k, 730) < 0.5) R.pset(x + i, y - ry + 1, hex('#a07aa0')); }
  else { R.rect(x - 1, y - ry - 3, x, y - ry, hex('#5a4a24')); R.pset(x + 1, y - ry - 2, c_K.calabT); R.pset(x + 2, y - ry - 2, c_K.calabT); R.pset(x + 2, y - ry - 1, c_K.calabT); }
  if (tallada) { const fl = 0.75 + 0.25 * Math.sin(t * 13 + k * 2) * Math.sin(t * 5.3 + k), L = fl > 0.7 ? c_K.luzL : c_K.luz, Ls = c_K.luzS, s = Math.max(1, Math.round(r / 5));
    // los ojos triangulares, la nariz y la boca con dientes
    for (const d of [-1, 1]) R.poligono([[x + d * s * 1.2 - s * 1.2, y - s * 0.2], [x + d * s * 1.2 + s * 1.2, y - s * 0.2], [x + d * s * 1.2, y - s * 2]], L);
    R.pset(x, y + Math.round(s * 0.3), Ls);
    R.poligono([[x - s * 2.4, y + s * 0.9], [x + s * 2.4, y + s * 0.9], [x + s * 1.6, y + s * 2.2], [x - s * 1.6, y + s * 2.2]], L);
    R.pset(x - s, y + Math.round(s * 0.9), c); R.pset(x + s, y + Math.round(s * 2.1), c);
    R.disco(x, y, r * 0.35, (px, py) => { const q = R.pget(px, py); return q === L ? c_mez(L, hex('#ffffff'), 0.4) : q; }); }
}

// una farola de hierro (x, suelo; alto) con su farol; on: encendida con su halo
function c_farola(R, x, suelo, alto, t, on = true, tipo = 0) {
  const top = suelo - alto, k = hex('#1e1a22'), m = hex('#3a3644'), mL = hex('#5a5666');
  R.rect(x - 2, suelo - 4, x + 2, suelo, k); R.rect(x - 1, suelo - 3, x + 1, suelo - 1, m); R.rect(x - 1, top + 6, x + 1, suelo - 4, k); R.rect(x, top + 6, x, suelo - 5, mL);
  R.rect(x - 2, top + 13, x + 2, top + 14, k);
  const fl = on ? 0.9 + 0.1 * Math.sin(t * 9 + x) : 0;
  if (tipo === 0) { R.rect(x - 3, top + 5, x + 3, top + 6, k); R.rect(x - 3, top, x + 3, top + 4, k); R.rect(x - 2, top + 1, x + 2, top + 3, on ? (fl > 0.95 ? c_K.luzL : c_K.luz) : hex('#8a8a7a')); R.rect(x - 2, top - 2, x + 2, top - 1, k); R.pset(x, top - 3, k); }
  else { R.linea(x, top + 4, x + 8, top + 2, k); R.rect(x + 6, top + 1, x + 11, top + 3, k); R.rect(x + 7, top + 3, x + 10, top + 4, on ? c_K.luzL : hex('#c8ccd4')); }
}

// una tierra de hierba con matas: base, sombra y luz en manchas, briznas claras y oscuras (cols: [hD, hS, h, hL])
function c_hierba(R, x0, y0, x1, y1, [cD, cS, c, cL], k = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const prof = (y - y0) / Math.max(1, y1 - y0), e = 1 + Math.round(prof * 2);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const n = h(Math.floor(x / (3 + e)), Math.floor(y / (2 + e)), k) * 0.6 + h(x, y, k + 1) * 0.4;
      let col = n < 0.22 ? cS : n > 0.8 ? cL : c; const b = h(x, Math.floor(y / (2 + e)), k + 2); if (b < 0.06) col = cD; else if (b > 0.95) col = cL; B[y * 320 + x] = col; } }
}

// lo que se ve fuera de la cocina general (opaco): el cielo de primavera, colinas, el pueblo con la iglesia (por la
// ventana, x 104–148, y 44–84) y el corral con el gallinero (por la puerta, x 214–258, y 52–124)
function c_galExterior(R) {
  const { rect, pset, disco, poligono, linea } = R;
  c_grad(R, 0, 0, 319, 74, c_CIELO_PRIM);
  // colinas lejanas y el pueblo
  for (let x = 0; x < 320; x++) { const y = Math.round(66 + Math.sin(x * 0.05) * 3 + Math.sin(x * 0.13 + 1) * 1.5); for (let yy = y; yy < 180; yy++) pset(x, yy, yy < y + 2 ? hex('#8ab88a') : h(x >> 2, yy >> 1, 801) < 0.2 ? hex('#5a8a5a') : hex('#6a9a62')); }
  for (let x = 0; x < 320; x++) { const y = Math.round(74 + Math.sin(x * 0.07 + 2) * 2); for (let yy = y; yy < 180; yy++) pset(x, yy, yy === y ? hex('#7ab05a') : h(x >> 1, yy >> 1, 802) < 0.15 ? hex('#4a8034') : hex('#5c9440')); }
  // la iglesia blanca con su campanario (la campana la pinta el fotograma) y las casas del pueblo
  rect(110, 68, 126, 80, hex('#f0ece2')); rect(110, 68, 110, 80, hex('#d0c8b8')); poligono([[108, 69], [118, 62], [128, 69]], c_K.tejaR); linea(108, 69, 118, 62, c_K.tejaRL);
  rect(128, 52, 137, 80, hex('#f4f0e6')); rect(136, 52, 137, 80, hex('#d4ccbc')); rect(130, 55, 135, 61, hex('#3a3040')); rect(128, 51, 137, 52, hex('#c8c0b0'));
  poligono([[127, 51], [132.5, 43], [138, 51]], hex('#4a6a8a')); linea(127, 51, 132, 44, hex('#6a8aaa')); rect(132, 39, 132, 43, hex('#c8a040')); rect(131, 40, 133, 40, hex('#c8a040'));
  rect(130, 66, 134, 72, hex('#8a6a4a')); rect(114, 72, 116, 76, hex('#5a7aa0')); rect(120, 72, 122, 76, hex('#5a7aa0'));
  for (const [x, w, c] of [[100, 8, hex('#e8d8c0')], [140, 9, hex('#f0e4d0')], [150, 6, hex('#e4d4bc')]]) { rect(x, 72, x + w, 79, c); poligono([[x - 1, 73], [x + w / 2, 68], [x + w + 1, 73]], c_K.tejaRS); pset(x + 2, 75, hex('#5a6a8a')); }
  // árboles en flor junto a la iglesia
  for (const [x, y, c] of [[104, 76, c_K.flor], [146, 77, hex('#f8f0f4')]]) c_copa(R, x, y, [[0, 0, 4], [-3, 2, 3], [3, 2, 3]], [hex('#a87890'), c_mez(c, C.k, 0.15), c, hex('#ffffff')]);
  // el corral (por la puerta): seto lejano, prado, la cerca de tablas y el gallinero de madera con su rampa
  for (let x = 206; x < 266; x++) { const y = Math.round(72 + Math.sin(x * 0.4) * 1.5 + h(x >> 1, 0, 803) * 2); for (let yy = y; yy < 80; yy++) pset(x, yy, yy < y + 2 ? hex('#4a8a40') : hex('#2e6a30')); }
  for (let y = 80; y < 98; y++) for (let x = 206; x < 266; x++) pset(x, y, h(x >> 1, y, 804) < 0.2 ? hex('#7ab84a') : h(x, y, 805) < 0.1 ? hex('#4a8a34') : hex('#62a040'));
  for (let x = 206; x < 266; x += 5) { rect(x, 86, x + 1, 98, hex('#8a6a4a')); pset(x, 86, hex('#a8885a')); } rect(206, 89, 266, 89, hex('#7a5a3a')); rect(206, 94, 266, 94, hex('#7a5a3a'));
  // el suelo del corral: tierra, paja y un charco
  for (let y = 98; y < 130; y++) for (let x = 206; x < 266; x++) { const n = h(x >> 1, y >> 1, 806); pset(x, y, n < 0.25 ? c_K.pajaS : n > 0.78 ? c_K.pajaL : h(x, y, 807) < 0.3 ? hex('#8a6a44') : hex('#a07a4a')); }
  for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if ((i / 9.5) ** 2 + (j / 2.5) ** 2 < 1) pset(222 + i, 118 + j, j < 0 ? hex('#a8cce8') : hex('#7aa0c0'));
  // el gallinero: caseta de tablas con tejado a un agua, ventanuco, puerta de gallinas y rampa con listones
  poligono([[222, 80], [258, 74], [260, 77], [224, 83]], hex('#5a4a3a')); linea(222, 80, 258, 74, hex('#7a6a58'));
  rect(224, 82, 256, 104, hex('#6a4a2e')); for (let x = 224; x <= 256; x += 4) rect(x, 82, x, 104, hex('#4e341e')); for (let x = 226; x <= 256; x += 4) pset(x, 84 + (x % 7), hex('#8a6440'));
  rect(230, 86, 238, 92, hex('#2a1e18')); rect(234, 86, 234, 92, hex('#6a4a2e')); rect(244, 94, 250, 104, hex('#1e1612'));
  linea(244, 104, 236, 114, hex('#8a6a44')); linea(245, 104, 237, 114, hex('#6a4e30')); linea(250, 104, 242, 114, hex('#6a4e30')); for (let k = 0; k < 4; k++) linea(246 - k * 2, 106 + k * 2, 249 - k * 2, 106 + k * 2, hex('#a8845a'));
  rect(224, 104, 256, 105, hex('#3a2a1e'));
}

// la cocina (con huecos transparentes en la ventana y la puerta): techo de vigas, pared encalada con zócalo azul, el
// hogar con su campana, la ventana, el vasar con platos, la puerta abierta al corral, la alacena y el suelo de barro cocido
function c_galCocina(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = c_K;
  // el techo de tablas y las vigas que asoman
  for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (y % 5 === 4) ? K.techoS : h(x >> 3, (y / 5) | 0, 810) < 0.15 ? K.vigaS : K.techo;
  for (const x0 of [30, 92, 156, 220]) { poligono([[x0, 0], [x0 + 10, 0], [x0 + 11 + (x0 - 160) * 0.04, 19], [x0 - 1 + (x0 - 160) * 0.04, 19]], K.viga); linea(x0, 0, x0 - 1 + (x0 - 160) * 0.04, 19, K.vigaL); }
  rect(0, 19, 319, 24, K.viga); rect(0, 19, 319, 19, K.vigaL); rect(0, 24, 319, 24, K.vigaS); for (let x = 0; x < 320; x += 1) if (h(x, 0, 811) < 0.25) pset(x, 21 + (x % 3), K.vigaS);
  // la pared encalada con manchas, grietas y el zócalo azul desconchado
  c_textura(R, 0, 25, 319, 123, K.cal, K.calS, K.calL, 812, 3, 0.05, 0.1);
  for (let y = 25; y < 30; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (30 - y) / 7) B[y * 320 + x] = K.calS;   // la sombra de la viga
  for (const [x0, y0, l] of [[176, 30, 9], [96, 100, 7], [270, 70, 6], [8, 40, 5]]) { let x = x0; for (let i = 0; i < l; i++) { pset(x, y0 + i, K.calD); x += h(i, x0, 813) < 0.5 ? 1 : 0; } }
  for (let y = 98; y < 124; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 814) * 0.7 + h(x >> 4, y >> 3, 819) * 0.3; B[y * 320 + x] = y === 98 ? K.zocaloL : y === 99 ? K.zocaloS : n < 0.03 ? K.calS : n > 0.86 ? K.zocaloL : n < 0.2 ? K.zocaloS : K.zocalo; }
  for (const [x, y] of [[90, 100], [160, 110], [268, 104], [200, 116]]) { rect(x, y, x + 3, y + 2, K.cal); pset(x + 4, y + 1, K.calS); }
  // el hogar: campana de yeso con la repisa, el arco de ladrillo tiznado, el fondo con hollín y el poyo de piedra
  poligono([[20, 25], [70, 25], [88, 60], [2, 60]], (x, y) => { const l = 20 - (y - 25) * 18 / 35, r = 70 + (y - 25) * 18 / 35, u = (x - l) / (r - l); return u > 0.78 ? (c_um(x, y) < 0.5 ? K.calS : K.calD) : u < 0.1 ? K.calS : h(x >> 1, y >> 1, 816) < (y - 25) / 70 ? K.calS : K.calL; });
  linea(20, 25, 2, 60, K.calD); linea(70, 25, 88, 60, hex('#8a7c64')); linea(21, 25, 3, 60, K.calS); for (let x = 3; x < 88; x++) { pset(x, 58, hex('#9a8c74')); if (c_um(x, 57) < 0.5) pset(x, 57, K.calD); }
  for (let y = 44; y < 58; y++) for (let x = 6; x < 85; x++) if (h(x >> 1, y >> 1, 819) < (y - 44) / 30) pset(x, y, c_mez(R.pget(x, y), hex('#5a4a44'), 0.35));
  rect(2, 60, 88, 64, K.viga); rect(2, 60, 88, 60, K.vigaL); rect(2, 64, 88, 64, K.vigaS);
  // en la repisa: tarros de barro, un plato de pie, un candil y un ramo de sauce
  for (const [x, w, hh, c] of [[8, 6, 9, hex('#a8603a')], [16, 5, 7, hex('#c8a060')], [56, 6, 8, hex('#7a8aa0')], [64, 5, 10, hex('#a8603a')]]) { rect(x, 60 - hh, x + w, 59, C.k); rect(x + 1, 61 - hh, x + w - 1, 59, c); rect(x + 1, 61 - hh, x + 1, 59, c_mez(c, hex('#ffffff'), 0.3)); rect(x + 1, 60 - hh, x + w - 1, 60 - hh, c_mez(c, C.k, 0.4)); }
  disco(36, 51, 8, C.k); disco(36, 51, 7, hex('#f0ece0')); disco(36, 51, 5, hex('#3a6aa8')); disco(36, 51, 3, hex('#f0ece0')); pset(33, 47, hex('#ffffff'));
  rect(46, 56, 50, 59, hex('#c8a040')); rect(47, 54, 49, 55, hex('#a87a20'));
  for (let i = 0; i < 6; i++) linea(78, 59, 74 + i * 2 - (i > 2 ? 2 : 0), 44 + (i % 3) * 3, hex('#6a4a34')); for (let i = 0; i < 9; i++) pset(73 + (i * 7) % 10, 45 + (i * 5) % 12, hex('#e8e4d8'));
  rect(10, 64, 80, 123, K.ladHS); for (let y = 66; y < 118; y += 4) for (let x = 12 + ((y / 4) % 2) * 4; x < 78; x += 8) { rect(x, y, x + 6, y + 2, h(x, y, 817) < 0.4 ? K.hollin : K.ladH); }
  for (let y = 64; y < 100; y++) for (let x = 12; x < 79; x++) if (h(x >> 1, y >> 1, 818) < (100 - y) / 50) pset(x, y, K.hollin);
  rect(8, 64, 11, 123, K.ladH); rect(79, 64, 82, 123, K.ladH); for (let y = 64; y < 123; y += 3) { pset(9, y, K.ladHS); pset(80, y + 1, K.ladHS); }
  rect(8, 64, 82, 67, K.ladHS); for (let x = 8; x < 82; x += 5) pset(x, 65, K.ladH);
  rect(14, 68, 76, 69, hex('#2a2224')); for (let y = 69; y < 82; y += 2) { pset(45, y, hex('#4a4450')); pset(45, y + 1, hex('#2a2224')); }   // la cadena del caldero
  rect(6, 117, 84, 124, K.piedraP); rect(6, 117, 84, 117, K.piedraPL); for (let x = 6; x < 84; x += 9) rect(x, 118, x, 124, K.piedraPS);
  // la ventana: derrame encalado, marco de madera, cruceta y alféizar con un geranio y una jarra
  poligono([[98, 38], [154, 38], [149, 44], [103, 44]], K.calL); poligono([[98, 38], [103, 44], [103, 84], [98, 90]], K.calS); poligono([[154, 38], [154, 90], [149, 84], [149, 44]], K.calL);
  rect(103, 44, 149, 84, 0);
  rect(103, 43, 149, 44, K.viga); rect(103, 84, 149, 85, K.viga); rect(102, 43, 103, 85, K.viga); rect(149, 43, 150, 85, K.viga); rect(125, 44, 127, 84, K.viga); rect(103, 63, 149, 65, K.viga); rect(126, 44, 126, 84, K.vigaL); rect(103, 64, 149, 64, K.vigaL);
  rect(96, 86, 156, 89, K.calL); rect(96, 89, 156, 90, K.calD);
  rect(108, 78, 116, 86, C.k); rect(109, 79, 115, 86, hex('#b05a32')); rect(109, 79, 115, 79, hex('#d07a4a'));
  c_copa(R, 112, 74, [[0, 0, 4], [-3, 1, 3], [3, 1, 3]], [hex('#1e4418'), hex('#2e6024'), hex('#4a8a34'), hex('#7ab84a')]); for (const [dx, dy] of [[-2, -3], [2, -2], [0, -4], [4, 0], [-4, 0]]) pset(112 + dx, 74 + dy, hex('#e8283a'));
  rect(138, 76, 145, 86, C.k); rect(139, 77, 144, 86, hex('#e8e0d0')); rect(139, 80, 144, 81, hex('#3a6aa8')); rect(145, 79, 146, 83, C.k);
  // el vasar con platos de colores y tazas colgadas
  rect(158, 36, 208, 80, K.vigaS); rect(159, 37, 207, 79, K.viga); for (const y of [48, 62, 76]) { rect(158, y, 208, y + 2, K.vigaL); rect(158, y + 3, 208, y + 3, K.vigaS); }
  for (let f = 0; f < 3; f++) for (let i = 0; i < 4; i++) { const cx = 165 + i * 12, cy = 42 + f * 14, col = [hex('#3a6aa8'), hex('#c8402a'), hex('#3a8a5a'), hex('#d8a030')][(i + f) % 4]; disco(cx, cy, 5, C.k); disco(cx, cy, 4, hex('#f0ece0')); disco(cx, cy, 3, col); disco(cx, cy, 1.5, hex('#f0ece0')); pset(cx - 2, cy - 3, hex('#ffffff')); }
  for (let i = 0; i < 4; i++) { const x = 162 + i * 12; pset(x, 82, C.k); rect(x - 2, 84, x + 2, 88, C.k); rect(x - 1, 84, x + 1, 87, [hex('#f0ece0'), hex('#c8402a')][i % 2]); pset(x + 3, 85, C.k); }
  // el arcón bajo el vasar (lo tapa casi entero la mesa)
  rect(158, 100, 208, 123, C.k); rect(159, 101, 207, 122, K.viga); rect(159, 101, 207, 102, K.vigaL); for (const x of [163, 201]) rect(x, 101, x + 2, 122, hex('#3a3440')); rect(181, 106, 185, 110, hex('#3a3440'));
  // la puerta: el hueco (transparente), las jambas, el dintel, la hoja abierta con sus herrajes y el umbral
  rect(214, 52, 258, 124, 0);
  rect(210, 46, 262, 52, K.viga); rect(210, 46, 262, 46, K.vigaL); rect(210, 52, 214, 124, K.viga); rect(258, 52, 262, 124, K.viga); rect(213, 52, 213, 124, K.vigaS); rect(258, 52, 258, 124, K.vigaL);
  poligono([[262, 50], [276, 56], [276, 126], [262, 124]], K.vigaS); for (let x = 264; x < 276; x += 4) linea(x, 51 + (x - 262) * 0.43, x, 125, hex('#2a1a10')); for (const y of [64, 110]) linea(262, y, 276, y + 6, hex('#3a3440'));
  rect(212, 122, 260, 125, K.piedraP); rect(212, 122, 260, 122, K.piedraPL);
  // el ramo de sauce de Ramos sobre la puerta
  for (let i = 0; i < 7; i++) { linea(236, 44, 222 + i * 5, 32 + Math.abs(i - 3), hex('#5a3a2a')); pset(222 + i * 5, 32 + Math.abs(i - 3), hex('#e8e4d8')); pset(226 + i * 4, 37 + (i % 2), hex('#d8d4c8')); } rect(234, 42, 238, 45, hex('#c8402a'));
  // la alacena alta a la derecha, con sus cuarterones y la cesta encima
  rect(280, 58, 318, 124, C.k); rect(281, 59, 317, 123, K.viga); rect(281, 59, 317, 61, K.vigaL); rect(299, 61, 299, 123, K.vigaS);
  for (const [x0, y0] of [[284, 64], [302, 64], [284, 96], [302, 96]]) { rect(x0, y0, x0 + 12, y0 + 24, K.vigaS); rect(x0 + 1, y0 + 1, x0 + 11, y0 + 23, K.viga); rect(x0 + 1, y0 + 1, x0 + 11, y0 + 1, K.vigaL); }
  pset(297, 92, C.oro); pset(301, 92, C.oro);
  rect(286, 50, 312, 58, K.mimbreD); for (let x = 287; x < 312; x++) for (let y = 51; y < 58; y++) pset(x, y, (x + y) % 3 === 0 ? K.mimbreS : (x - y) % 4 === 0 ? K.mimbreL : K.mimbre);
  // la escoba apoyada junto a la puerta
  linea(266, 70, 270, 124, hex('#8a6a44')); poligono([[266, 112], [274, 112], [277, 125], [263, 125]], K.paja); for (let x = 264; x < 277; x += 2) linea(x, 114, x + (x - 270) * 0.2, 124, K.pajaS);
  // el suelo de barro cocido en perspectiva (fuga en 160, 40): juntas, piezas de tono distinto, desgaste y paja
  for (let y = 124; y < 180; y++) { const d = y - 40, fila = Math.floor(1470 / d), juntaF = Math.floor(1470 / (d + 1)) !== fila, tam = d / 6.4;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 6.4, col = Math.floor(u), fr = (u - col) * tam;
      let c = juntaF || fr < 1 ? K.junta : h(col, fila, 820) < 0.18 ? K.terraS : h(col, fila, 821) > 0.85 ? K.terraL : K.terra;
      if (c !== K.junta && h(x >> 1, y >> 1, 822) < 0.07) c = K.terraS; if (c !== K.junta && fr > tam - 1.5 && !juntaF) c = c_mez(c, K.junta, 0.35);
      B[y * 320 + x] = c; } }
  for (let y = 124; y < 128; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (128 - y) / 5) B[y * 320 + x] = K.junta;
  // la luz de la puerta y de la ventana sobre el suelo
  for (let y = 125; y < 180; y++) { const a = 214 - (y - 124) * 0.9, b = 258 - (y - 124) * 0.35; for (let x = Math.round(a); x <= Math.round(b); x++) if (x >= 0 && c_um(x, y) < 0.5 - (y - 124) / 140) B[y * 320 + x] = c_mez(B[y * 320 + x], hex('#fff0c8'), 0.35); }
  for (let i = 0; i < 26; i++) { const x = 200 + Math.round(h(i, 1, 823) * 60) - Math.round(h(i, 3, 823) * 20), y = 126 + Math.round(h(i, 2, 823) * 30); linea(x, y, x + 2 + (i % 3), y - (i % 2), i % 2 ? K.pajaL : K.paja); }
  for (const [x, y] of [[96, 172], [240, 160]]) { linea(x, y, x + 4, y - 1, hex('#f4f0e6')); pset(x + 1, y - 1, hex('#d8d0c0')); }
}

// la cocina de cerca (cámara 'cestas'): pared encalada con zócalo, la balda con los tintes y la piel de cebolla, ajos y
// hierbas colgados, la ventana con la iglesia (hueco transparente x 236–270, y 44–90)
function c_galCerca(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, K = c_K;
  rect(0, 0, 319, 7, K.viga); rect(0, 7, 319, 7, K.vigaS); for (let x = 0; x < 320; x++) if (h(x >> 2, 0, 830) < 0.3) pset(x, 3 + (x % 3), K.vigaS);
  c_textura(R, 0, 8, 319, 112, K.cal, K.calS, K.calL, 831, 4, 0.05, 0.1);
  for (let y = 8; y < 14; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (14 - y) / 8) B[y * 320 + x] = K.calS;
  for (let y = 84; y < 113; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 832) * 0.7 + h(x >> 4, y >> 3, 837) * 0.3; B[y * 320 + x] = y === 84 ? K.zocaloL : y === 85 ? K.zocaloS : n < 0.03 ? K.calS : n > 0.86 ? K.zocaloL : n < 0.2 ? K.zocaloS : K.zocalo; }
  b_galMuro(R);
  // la balda con tarros de tinte, un manojo de pieles de cebolla y el ramo de sauce en una jarra
  rect(14, 52, 150, 55, K.viga); rect(14, 52, 150, 52, K.vigaL); rect(14, 56, 150, 56, K.calD); for (const x of [24, 136]) { poligono([[x, 56], [x + 6, 56], [x + 6, 64]], K.vigaS); }
  for (const [x, c, l] of [[20, hex('#c8282a'), 0.8], [34, hex('#e8b020'), 0.6], [48, hex('#3a6ac8'), 0.7], [62, hex('#3a9a4a'), 0.5]]) { rect(x, 38, x + 10, 51, C.k); rect(x + 1, 39, x + 9, 51, hex('#e8eef0')); rect(x + 1, Math.round(51 - 11 * l), x + 9, 51, c); rect(x + 2, 39, x + 2, 50, hex('#ffffff')); rect(x, 36, x + 10, 38, hex('#a87a4a')); }
  for (let i = 0; i < 14; i++) { const x = 82 + (i * 5) % 22, y = 44 + (i * 3) % 8; disco(x, y, 3, i % 2 ? hex('#b8601e') : hex('#d88a3a')); pset(x - 1, y - 1, hex('#f0b060')); } rect(80, 50, 106, 51, hex('#8a4a1e'));
  rect(116, 40, 126, 51, C.k); rect(117, 41, 125, 51, hex('#c87a4a')); rect(117, 41, 118, 51, hex('#e09a6a')); for (let i = 0; i < 7; i++) { linea(121, 40, 112 + i * 3, 18 + Math.abs(i - 3) * 2, hex('#5a3a2a')); for (let k = 0; k < 3; k++) pset(113 + i * 3 + (k % 2), 22 + Math.abs(i - 3) * 2 + k * 5, hex('#ece8dc')); }
  // ajos y hierbas que cuelgan de la viga
  for (const [x, l] of [[168, 30], [196, 24], [214, 34]]) { linea(x, 8, x, 8 + l * 0.3, hex('#6a5a3a'));
    if (x === 196) for (let j = 0; j < 4; j++) { disco(x - 1 + (j % 2) * 2, 18 + j * 4, 3, hex('#f0e8d8')); pset(x - 2 + (j % 2) * 2, 17 + j * 4, hex('#ffffff')); pset(x + (j % 2) * 2, 20 + j * 4, hex('#c8b8a8')); }
    else for (let k = 0; k < 9; k++) linea(x, 8 + l * 0.3, x - 4 + k, 8 + l - (k % 3) * 2, k % 2 ? hex('#6a8a4a') : hex('#4a6a34')); }
  // la ventana con su derrame, marco y cruceta (el hueco queda transparente)
  poligono([[230, 38], [276, 38], [270, 44], [236, 44]], K.calL); poligono([[230, 38], [236, 44], [236, 90], [230, 96]], K.calS); poligono([[276, 38], [276, 96], [270, 90], [270, 44]], K.calL);
  rect(236, 44, 270, 90, 0);
  rect(235, 43, 271, 44, K.viga); rect(235, 90, 271, 91, K.viga); rect(235, 43, 236, 91, K.viga); rect(270, 43, 271, 91, K.viga); rect(252, 44, 254, 90, K.viga); rect(236, 66, 270, 68, K.viga); rect(253, 44, 253, 90, K.vigaL);
  rect(228, 92, 278, 95, K.calL); rect(228, 95, 278, 96, K.calD);
  // la sombra que la mesa echa sobre el zócalo
  for (let y = 104; y < 113; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (y - 104) / 10) B[y * 320 + x] = c_mez(B[y * 320 + x], C.k, 0.3);
}
// el exterior de la ventana de cerca (opaco): cielo, colinas y la iglesia más grande, con su campanario
function c_galCercaExt(R) {
  const { rect, pset, poligono, linea } = R;
  c_grad(R, 236, 44, 270, 90, c_CIELO_PRIM.slice(1));
  for (let x = 236; x <= 270; x++) { const y = Math.round(76 + Math.sin(x * 0.2) * 2); for (let yy = y; yy <= 90; yy++) pset(x, yy, yy < y + 2 ? hex('#7ab05a') : h(x >> 1, yy, 840) < 0.2 ? hex('#4a8034') : hex('#5c9440')); }
  rect(240, 70, 254, 84, hex('#f0ece2')); poligono([[238, 71], [247, 64], [256, 71]], c_K.tejaR);
  rect(256, 52, 266, 84, hex('#f4f0e6')); rect(265, 52, 266, 84, hex('#d4ccbc')); rect(258, 55, 264, 62, hex('#3a3040')); poligono([[255, 52], [261, 44], [267, 52]], hex('#4a6a8a')); linea(255, 52, 260, 45, hex('#6a8aaa'));
  rect(259, 70, 263, 78, hex('#8a6a4a')); rect(244, 74, 246, 78, hex('#5a7aa0')); rect(249, 74, 251, 78, hex('#5a7aa0'));
}

// la campana del campanario, que se mece (cx, cy: el eje; s: tamaño 1 o 2)
function c_campana(R, cx, cy, t, s = 1) {
  const a = Math.sin(t * 2.6) * 0.5, X = (dx, dy) => Math.round(cx + dx * Math.cos(a) - dy * Math.sin(a)), Y = (dx, dy) => Math.round(cy + dx * Math.sin(a) + dy * Math.cos(a));
  for (let j = 0; j <= 4 * s; j++) { const w = (1 + j * 0.5) * s * 0.5; for (let i = -w; i <= w; i += 0.5) R.pset(X(i, j), Y(i, j), i < 0 ? hex('#e8c050') : hex('#a87a20')); }
  R.pset(X(0, 5 * s), Y(0, 5 * s), hex('#6a4a18'));
}

function c_gallinero(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K;
  if (!cerca) {
    R.copiar(c_capa(R, 'gal-ext', () => c_galExterior(R)));
    c_nubes(R, t, [[10, 52, 18, 1.4], [150, 48, 24, 2.2], [230, 60, 12, 0.9], [90, 56, 14, 1.1]], c_NUBE_DIA);
    c_aves(R, t, 4, 46, 60, 3, hex('#2a3040'), 14);
    c_campana(R, 132.5, 56, t);
    // las gallinas del corral: una en la rampa, otra que picotea junto al charco
    c_gallina(R, 241 - Math.round(((t * 0.5) % 1) * 0), 112, t, -1, 1, true);
    c_gallina(R, 232 + Math.sin(t * 0.4) * 4, 121, t, Math.cos(t * 0.4) > 0 ? 1 : -1, 2, false, true);
    // la gallina que entra en la cocina: sale del corral, cruza el umbral y picotea junto a la mesa, y vuelve
    const ci = t % 16, fuera = ci < 3 || ci > 13, u = ci < 3 ? 0 : ci < 7 ? (ci - 3) / 4 : ci < 10 ? 1 : ci < 13 ? 1 - (ci - 10) / 3 : 0;
    const gx = 250 - u * 50, gy = 118 + u * 40, gd = ci > 10 && ci < 13 ? 1 : -1, ganda = (ci > 3 && ci < 7) || (ci > 10 && ci < 13);
    if (fuera || gy < 125) c_gallina(R, ci > 13 ? 250 + (ci - 13) * 5 : gx, gy, t, ci > 13 ? 1 : gd, 4, true, ganda || ci > 13);
    c_pegar(R, c_capa(R, 'gal-coc', () => c_galCocina(R)));
    if (!fuera && gy >= 125) c_gallina(R, gx, gy, t, gd, 4, true, ganda);
    // el polluelo que sigue a su madre
    const px = 178 + Math.sin(t * 0.7) * 8, py = 166; rect(px - 1, py - 3, px + 1, py - 1, hex('#f8e070')); pset(px + (Math.cos(t * 0.7) > 0 ? 2 : -2), py - 3, hex('#e8a020')); pset(px, py, hex('#e8a020'));
    // el fuego del hogar con su resplandor, el caldero con los huevos que hierven y el vapor
    c_resplandor(R, 45, 118, 44, K.fuegoL, 0.3, 20);
    for (const [x, a, k] of [[32, 12, 0], [45, 16, 1], [58, 11, 2]]) c_llama(R, x, 118, 6, a, t, k);
    rect(30, 116, 62, 119, hex('#3a2418')); rect(34, 115, 56, 116, hex('#5a3420')); for (let i = 0; i < 6; i++) if (Math.sin(t * 8 + i * 2) > 0) pset(33 + i * 5, 117, K.brasa);
    disco(45, 94, 13, C.k); disco(45, 94, 12, hex('#2e2a30')); rect(32, 82, 58, 88, C.k); rect(33, 83, 57, 87, hex('#3a3640')); disco(40, 92, 4, hex('#4a4652')); pset(37, 89, hex('#7a7684'));
    rect(34, 82, 56, 83, hex('#e8eef0')); for (let i = 0; i < 4; i++) { const ex = 37 + i * 5, ey = 81 + Math.round(Math.sin(t * 6 + i * 1.7)); c_huevo(R, ex, ey, i % 2 ? K.huevoM : K.huevo, i % 2 ? K.huevoMS : K.huevoS); }
    for (let i = 0; i < 5; i++) { const u2 = ((t * 0.45 + i / 5) % 1), vx = 45 + Math.sin(u2 * 6 + i) * 4 + u2 * 6, vy = 78 - u2 * 30; disco(Math.round(vx), Math.round(vy), 1 + u2 * 2.5, u2 > 0.6 ? hex('#f0ece6') : hex('#d8d4d0')); }
    // motas de polvo en la luz de la puerta y el gato que duerme junto al hogar
    for (let i = 0; i < 10; i++) { const mx = 218 + ((h(i, 1, 850) * 40 + t * 3) % 40) - (i % 4) * 4, my = 70 + ((h(i, 2, 850) * 60 + t * (1 + i % 3)) % 60); if (Math.sin(t * 2 + i) > -0.3) pset(Math.round(mx), Math.round(my), hex('#fff4d8')); }
    { const gx2 = 92, gy2 = 128; disco(gx2, gy2 - 3, 4, C.k); disco(gx2, gy2 - 3, 3, hex('#8a8a92')); rect(gx2 - 4, gy2 - 3, gx2 + 4, gy2, hex('#8a8a92')); rect(gx2 - 5, gy2 - 1, gx2 + 5, gy2, C.k);
      disco(gx2 - 5, gy2 - 4, 2.5, hex('#8a8a92')); pset(gx2 - 7, gy2 - 7, hex('#8a8a92')); pset(gx2 - 4, gy2 - 7, hex('#8a8a92')); pset(gx2 - 6, gy2 - 4, C.k); pset(gx2 - 4, gy2 - 4, C.k);
      const cola = Math.round(Math.sin(t * 1.3) * 2); R.linea(gx2 + 4, gy2 - 1, gx2 + 8, gy2 - 3 + cola, hex('#6a6a72')); pset(gx2 - 1, gy2 - 5, hex('#a8a8b0')); }
    return { suelo: 158, sueloMesa: 141, mesa: [92, 136, 206, 170], hogar: [10, 64, 82, 124], caldero: [45, 94], ventana: [104, 44, 148, 84], puerta: [214, 52, 258, 124], umbral: 124, alacena: [280, 58, 318, 124] };
  }
  // la mesa de cerca: la pared, la ventana con la iglesia y la luz que entra
  R.copiar(c_capa(R, 'gal-cext', () => c_galCercaExt(R)));
  R.recorte([236, 44, 270, 90]); c_nubes(R, t, [[0, 50, 14, 1.6], [20, 58, 10, 0.8]], c_NUBE_DIA); c_aves(R, t, 2, 48, 60, 7, hex('#2a3040'), 12); R.recorte(null);
  c_campana(R, 261, 57, t, 1);
  c_pegar(R, c_capa(R, 'gal-cer', () => c_galCerca(R)));
  // el tablero de la mesa (estacionesDelante lo vuelve a pintar con lo que hay encima, por delante de los actores)
  b_pegaFilas(R, c_capa(R, 'gal-tab', () => b_galTablero(R)), 112, 179);
  // la luz de la ventana que cae en diagonal sobre la pared, con motas de polvo que flotan en ella
  for (let y = 96; y < 112; y++) for (let x = 200 - (y - 96); x < 236 - (y - 96) * 0.5; x++) if (c_um(x, y) < 0.3) pset(x, y, c_mez(R.pget(x, y), hex('#fff0c8'), 0.3));
  for (let i = 0; i < 9; i++) { const u2 = (t * (0.05 + h(i, 1, 878) * 0.05) + h(i, 2, 878)) % 1, my = 50 + u2 * 60, mx = 236 - (my - 50) * 0.55 - h(i, 3, 878) * 26 + Math.sin(t * 0.9 + i) * 2; if (Math.sin(t * 1.7 + i * 2) > -0.4) pset(Math.round(mx), Math.round(my), hex('#fff6dc')); }
  // el vapor del cazo de agua caliente, que sube por detrás de la mesa
  for (let i = 0; i < 6; i++) { const u2 = ((t * 0.4 + i / 6) % 1), vx = 268 + Math.sin(u2 * 6 + i) * 4 - u2 * 8, vy = 112 - u2 * 40; disco(Math.round(vx), Math.round(vy), 1.5 + u2 * 3, u2 > 0.6 ? hex('#f6f2ec') : hex('#e4e0dc')); }
  return { suelo: 118, sueloMesa: 118, mesa: [0, 112, 319, 180], cesta: [28, 99, 84, 146], cuenco: [110, 118, 164, 146], tintes: [168, 126, 216, 146], fila: [204, 150, 304, 150], ventana: [236, 44, 270, 90] };
}
// lo que va delante en la cocina: la mesa con las cestas de huevos (general) o el tablero de cerca con la cesta, el
// cuenco de tinte rojo, los tintes y la fila de huevos que se pintan (o.huevos 0–1: lo llenas que están las cestas;
// o.pintados 0–1: cuántos de la fila están pintados; el último, a medias)
function c_gallineroDelante(R, t, o, cerca) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K, lleno = o.huevos ?? 1, pint = o.pintados ?? 0;
  const COL = [[hex('#c8282a'), hex('#8a1418')], [hex('#e8b020'), hex('#b07a10')], [hex('#3a6ac8'), hex('#2a4a90')], [hex('#3a9a4a'), hex('#246a30')], [hex('#c8282a'), hex('#8a1418')], [hex('#a85ac8'), hex('#743a90')], [hex('#e8782a'), hex('#a84a14')]];
  if (!cerca) {
    // la sombra, las patas, el travesaño, el tablero con su canto y las vetas
    for (let y = 166; y < 172; y++) for (let x = 90; x < 212; x++) if (c_um(x, y) < 0.55) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
    for (const x of [96, 198]) { rect(x, 144, x + 5, 170, C.k); rect(x + 1, 144, x + 4, 169, K.viga); rect(x + 1, 144, x + 1, 169, K.vigaL); }
    rect(100, 158, 198, 160, C.k); rect(100, 159, 198, 159, K.vigaS);
    rect(90, 134, 210, 147, C.k); rect(91, 135, 209, 140, hex('#9a6a42')); rect(91, 141, 209, 146, K.viga); rect(91, 141, 209, 141, K.vigaL); rect(91, 146, 209, 146, K.vigaS);
    for (let i = 0; i < 9; i++) { const y = 136 + (i % 4), x0 = 94 + Math.round(h(i, 1, 860) * 90); rect(x0, y, x0 + 8 + (i % 3) * 6, y, hex('#84583a')); } rect(91, 135, 209, 135, hex('#b8865a'));
    // el mantel de lino en el centro, con su orla
    rect(128, 135, 170, 140, hex('#f0ead8')); rect(128, 141, 170, 150, hex('#e4dcc4')); for (let x = 128; x <= 170; x += 3) pset(x, 150, hex('#c8402a')); rect(128, 148, 170, 148, hex('#c8402a'));
    // la cesta de los huevos de Cuaresma (se llena), la cesta de los pintados y el cuenco de tinte rojo
    const cesta = (x0, x1, n, pintados) => { const y0 = 128, y1 = 139;
      for (let i = 0; i < n; i++) { const fila = Math.floor(i / 6), ex = x0 + 3 + (i % 6) * ((x1 - x0 - 6) / 5) + (fila % 2) * 1.5, ey = y0 + 1 - fila * 2; const c = pintados ? COL[i % 7] : (i % 3 ? [K.huevo, K.huevoS] : [K.huevoM, K.huevoMS]); c_huevo(R, ex, ey, c[0], c[1]); }
      rect(x0, y0 + 2, x1, y1, K.mimbreD); for (let x = x0 + 1; x < x1; x++) for (let y = y0 + 3; y < y1; y++) pset(x, y, (x + y) % 3 === 0 ? K.mimbreS : (x - y + 30) % 4 === 0 ? K.mimbreL : K.mimbre);
      rect(x0, y0 + 2, x1, y0 + 2, K.mimbreL); for (let a = 0; a <= 16; a++) { const an = Math.PI * a / 16; pset(Math.round((x0 + x1) / 2 - Math.cos(an) * (x1 - x0) / 2.2), Math.round(y0 + 2 - Math.sin(an) * 10), a % 2 ? K.mimbreS : K.mimbre); } };
    cesta(100, 124, Math.round(4 + lleno * 14), false);
    const np = Math.round(pint * 12); cesta(176, 200, np, true);
    disco(149, 135, 9, C.k); rect(140, 135, 158, 140, C.k); disco(149, 135, 8, hex('#e8e0d0')); rect(141, 135, 157, 139, hex('#e8e0d0')); rect(141, 139, 157, 139, hex('#c8bca8'));
    for (let i = -7; i <= 7; i++) pset(149 + i, 133 + Math.round(Math.sin(t * 3 + i) * 0.5), K.tinte); rect(142, 131, 156, 132, K.tinte); rect(144, 130, 154, 130, K.tinteS); pset(146 + Math.round(Math.sin(t * 2) * 3), 131, K.tinteL);
    c_huevo(R, 147, 131, K.tinte, K.tinteS); c_huevo(R, 152, 132, K.tinteL, K.tinte);
    // huevos sueltos y la jarra
    c_huevo(R, 166, 137, K.huevo, K.huevoS); c_huevo(R, 132, 138, COL[0][0], COL[0][1]);
    return;
  }
  // de cerca: el tablero de tablas visto desde arriba, su canto y la cesta, el cuenco, los tintes y la fila de huevos
  b_pegaFilas(R, c_capa(R, 'gal-tab', () => b_galTablero(R)), 112, 179);
  // el paño de lino bajo la fila de huevos
  rect(198, 140, 312, 168, hex('#f0ead8')); for (let x = 198; x <= 312; x += 4) { pset(x, 168, hex('#c8402a')); pset(x + 1, 169, hex('#c8402a')); } rect(198, 164, 312, 164, hex('#c8402a')); for (let y = 141; y < 164; y += 3) pset(198 + (y * 7) % 110, y, hex('#e0d8c0'));
  // la cesta grande de mimbre con los huevos de Cuaresma
  const n = Math.round(5 + lleno * 15);
  for (let i = 0; i < n; i++) { const fila = Math.floor(i / 5), ex = 36 + (i % 5) * 9 + (fila % 2) * 4 - (fila > 1 ? 2 : 0), ey = 120 - fila * 5; const c = i % 3 ? [K.huevo, K.huevoS] : [K.huevoM, K.huevoMS]; c_huevo(R, ex, ey, c[0], c[1], 2); }
  for (let y = 122; y < 146; y++) { const w = 28 - Math.max(0, y - 138) * 1.2; for (let x = Math.round(56 - w); x <= Math.round(56 + w); x++) { const borde = x < 57 - w + 1 || x > 55 + w; pset(x, y, borde ? K.mimbreD : (y % 4 === 0) ? K.mimbreS : ((x + Math.floor(y / 4) * 3) % 6 < 3 ? K.mimbre : K.mimbreL)); } }
  rect(28, 121, 84, 123, K.mimbreL); rect(28, 124, 84, 124, K.mimbreD); for (let a = 0; a <= 40; a++) { const an = Math.PI * a / 40; for (let d = 0; d < 2; d++) pset(Math.round(56 - Math.cos(an) * 26), Math.round(121 - Math.sin(an) * 22) + d, a % 3 ? K.mimbreS : K.mimbreL); }
  for (let y = 146; y < 150; y++) for (let x = 30; x < 84; x++) if (c_um(x, y) < 0.5) pset(x, y, c_mez(R.pget(x, y), C.k, 0.35));
  // el cuenco de barro con el tinte rojo de piel de cebolla, que ondea, y los huevos dentro
  for (let y = 130; y < 148; y++) { const w = 26 - Math.max(0, y - 136) * 1.1; for (let x = Math.round(137 - w); x <= Math.round(137 + w); x++) pset(x, y, x < 137 - w + 2 ? hex('#7a3a1e') : (x > 137 + w - 3 || y > 144) ? hex('#8a4422') : hex('#b05a32')); }
  for (let y = 124; y < 131; y++) { const w = 27 * Math.sqrt(1 - ((y - 127.5) / 4) ** 2); for (let x = Math.round(137 - w); x <= Math.round(137 + w); x++) pset(x, y, (y === 124 || y === 130) ? hex('#d07a4a') : K.tinte); }
  for (let i = 0; i < 3; i++) { const r = ((t * 6 + i * 8) % 22); for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2, x = Math.round(140 + Math.cos(an) * r), y = Math.round(127.5 + Math.sin(an) * r * 0.15); if (Math.abs(x - 137) < 24 && (a + i) % 2) pset(x, y, K.tinteL); } }
  c_huevo(R, 128, 126, K.tinte, K.tinteS, 2); c_huevo(R, 147 + Math.round(Math.sin(t * 2)), 126, K.tinteL, K.tinte, 2);
  for (let i = 0; i < 6; i++) { const x = 116 + i * 9 + (i % 2) * 2, y = 150 + (i % 3) * 3; disco(x, y, 2.5, i % 2 ? hex('#b8601e') : hex('#d88a3a')); pset(x - 1, y - 1, hex('#f0b060')); }
  // los cuatro tarritos de pintura con sus pinceles
  for (const [i, c] of [[0, COL[0]], [1, COL[1]], [2, COL[2]], [3, COL[3]]]) { const x = 168 + i * 12, y = 132 + (i % 2) * 3;
    rect(x, y, x + 9, y + 10, C.k); rect(x + 1, y + 1, x + 8, y + 9, hex('#e8e4dc')); rect(x + 1, y + 1, x + 8, y + 3, c[0][0] ? c[0] : c[0]); rect(x + 1, y + 2, x + 8, y + 2, c[1]); rect(x + 1, y + 4, x + 1, y + 9, hex('#ffffff'));
    if (i % 2 === 0) { linea(x + 5, y + 1, x + 9, y - 9, hex('#a87a4a')); rect(x + 8, y - 11, x + 10, y - 9, hex('#3a2a1e')); } }
  // la fila de huevos: pintados (con raya o puntos), el que se pinta a medias y los que esperan, blancos
  const N = 8, hechos = pint * N;
  for (let i = 0; i < N; i++) { const x = 210 + i * 13, y = 152, c = COL[i % 7];
    for (let j = 0; j < 4; j++) for (let ii = -4; ii <= 4; ii++) if (c_um(x + ii, 159 + j) < 0.5 && Math.abs(ii) < 5 - j) pset(x + ii + 2, 159 + j, c_mez(R.pget(x + ii + 2, 159 + j), C.k, 0.25));
    if (i < Math.floor(hechos)) c_huevo(R, x, y, c[0], c[1], 3, i % 2 ? 'raya' : 'puntos', hex('#f8f0e0'));
    else { c_huevo(R, x, y, K.huevo, K.huevoS, 3); if (i === Math.floor(hechos)) { const f = hechos - i; if (f > 0) { const yb = Math.round(y + 4 - f * 9); R.recorte([x - 4, yb, x + 4, y + 4]); c_huevo(R, x, y, c[0], c[1], 3); R.recorte(null); } } } }
}
// un muro de piedras (mampostería) en (x0, y0)–(x1, y1): hiladas de piedras de ancho variable con el mortero, la luz
// arriba a la izquierda y la sombra abajo; cols: [mortero, piedra, piedraS, piedraL, otra]; alto: de cada hilada
function c_piedras(R, x0, y0, x1, y1, cols, k = 0, alto = 7, ancho = 14) {
  const { rect, pset } = R, [cm, c, cS, cL, cO] = cols;
  rect(x0, y0, x1, y1, cm);
  for (let y = y0, f = 0; y <= y1; f++) { const a = alto - 2 + Math.round(h(f, 0, 900 + k) * 3); let x = x0 - Math.round(h(f, 1, 900 + k) * ancho);
    while (x <= x1) { const w = Math.round(ancho * (0.6 + h(x, f, 901 + k) * 0.8)), q = h(x, f, 902 + k), base = q < 0.2 ? cO : q < 0.35 ? cS : c;
      const xa = Math.max(x0, x + 1), xb = Math.min(x1, x + w - 1), ya = y + 1, yb = Math.min(y1, y + a - 1);
      if (xb > xa && yb >= ya) { rect(xa, ya, xb, yb, base); rect(xa + 1, ya, xb - 1, ya, cL); if (xa + 1 <= xb) rect(xa, ya + 1, xa, yb - 1, c_mez(base, cL, 0.5)); rect(xa + 1, yb, xb, yb, c_mez(base, cm, 0.5)); rect(xb, ya + 1, xb, yb, cS);
        if (h(x, f, 903 + k) < 0.4) pset(xa + Math.round((xb - xa) * h(x, f, 904 + k)), ya + Math.round((yb - ya) * 0.6), cS); pset(xa, ya, cm); pset(xb, yb, cm); }
      x += w; }
    y += a; }
}

// un tejado de tejas (o tablillas) que rellena el polígono pts: hiladas cada fila px con las juntas a matajunta, la
// luz en el canto de cada pieza y alguna pieza más oscura; cols: [c, cS, cL, cD]
function c_tejado(R, pts, cols, k = 0, fila = 4, ancho = 5) {
  const [c, cS, cL, cD] = cols;
  R.poligono(pts, (x, y) => { const f = Math.floor(y / fila), r = y % fila, xx = x + (f % 2) * Math.floor(ancho / 2), col = Math.floor(xx / ancho), q = h(col, f, 910 + k);
    if (r === fila - 1) return cD; if (xx % ancho === 0) return cS; if (r === 0) return q < 0.3 ? c : cL; return q < 0.12 ? cS : q > 0.9 ? cL : c; });
}

// tablas verticales de madera (un granero, una caseta): juntas, vetas y nudos; cols: [c, cS, cL, cD]
function c_tablas(R, x0, y0, x1, y1, cols, k = 0, w = 4) {
  const B = R.buf, [c, cS, cL, cD] = cols;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const tb = Math.floor((x - x0) / w), r = (x - x0) % w;
    B[y * 320 + x] = r === 0 ? cD : r === 1 ? cL : h(tb, Math.floor(y / 5), 920 + k) < 0.18 ? cS : h(x, Math.floor(y / 3), 921 + k) < 0.08 ? cS : c; }
}

// tablas horizontales (tablilla solapada de una casa de madera): cada tabla con su sombra abajo y su luz arriba
function c_tablilla(R, x0, y0, x1, y1, cols, k = 0, a = 4) {
  const B = R.buf, [c, cS, cL, cD] = cols;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const r = (y - y0) % a, tb = Math.floor((y - y0) / a);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = r === a - 1 ? cD : r === 0 ? cL : h(Math.floor(x / 9), tb, 925 + k) < 0.1 ? cS : c; }
}

// una ventana de guillotina o de cuarterones (x0, y0)–(x1, y1): marco claro, cristales del color vidrio con el reflejo
// en diagonal, las cruces; luz: encendida por dentro (color cálido); cols: [marco, marcoS]
function c_ventana(R, x0, y0, x1, y1, nx, ny, vidrio, [cm, cmS], luz = null, t = 0) {
  const { rect, pset } = R; rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, cmS); rect(x0, y0, x1, y1, cm);
  const iw = (x1 - x0 - 1) / nx, ih = (y1 - y0 - 1) / ny;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const a = Math.round(x0 + 1 + i * iw), b = Math.round(x0 + (i + 1) * iw), c0 = Math.round(y0 + 1 + j * ih), d = Math.round(y0 + (j + 1) * ih);
    for (let y = c0; y < d; y++) for (let x = a; x < b; x++) { let col = luz ? (((y - c0) / (d - c0)) > 0.5 ? c_mez(luz, C.k, 0.12) : luz) : vidrio; if (!luz && (x - a + (y - c0)) % 9 < 2) col = c_mez(vidrio, hex('#ffffff'), 0.45); pset(x, y, col); } }
}

// contraventana de tablas (x0, y0)–(x1, y1) con su travesaño
function c_contra(R, x0, y0, x1, y1, c) { R.rect(x0, y0, x1, y1, c_mez(c, C.k, 0.45)); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); for (let x = x0 + 2; x < x1; x += 2) R.rect(x, y0 + 1, x, y1 - 1, c_mez(c, C.k, 0.2)); R.rect(x0 + 1, Math.round((y0 + y1) / 2), x1 - 1, Math.round((y0 + y1) / 2), c_mez(c, C.k, 0.3)); R.rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, c_mez(c, hex('#ffffff'), 0.25)); }

// una mariposa que revolotea alrededor de (cx, cy)
function c_mariposa(R, cx, cy, t, k, c) { const x = Math.round(cx + Math.sin(t * 0.9 + k) * 14 + Math.sin(t * 2.3 + k) * 4), y = Math.round(cy + Math.sin(t * 1.7 + k * 2) * 6), a = Math.sin(t * 16 + k) > 0;
  R.pset(x, y, C.k); if (a) { R.pset(x - 1, y - 1, c); R.pset(x + 1, y - 1, c); R.pset(x - 2, y - 1, c); R.pset(x + 2, y - 1, c); R.pset(x - 1, y, c); R.pset(x + 1, y, c); } else { R.pset(x - 1, y, c); R.pset(x + 1, y, c); } }

// flores sueltas en la hierba (margaritas, dientes de león) en la caja dada, fijas
function c_florecillas(R, x0, y0, x1, y1, n, k = 0, cols = [hex('#ffffff'), hex('#f8d838'), hex('#e8a0c8')]) {
  for (let i = 0; i < n; i++) { const x = Math.round(x0 + h(i, 1, 930 + k) * (x1 - x0)), y = Math.round(y0 + h(i, 2, 930 + k) * (y1 - y0)), c = cols[i % cols.length];
    R.pset(x, y, c); if (y > y0 + (y1 - y0) * 0.4) { R.pset(x - 1, y, c); R.pset(x + 1, y, c); R.pset(x, y - 1, c); R.pset(x, y, c === cols[0] ? hex('#f8d838') : c_mez(c, C.k, 0.2)); } R.pset(x, y + 1, c_K.hojaS); }
}

// un arbusto en flor de bolas (x, base y; w: medio ancho; a: alto) con flores de color f; m: lo que se mece
function c_arbusto(R, x, y, w, a, fl, k = 0, m = 0, verdes = [c_K.hojaD, c_K.hojaS, c_K.hoja, c_K.hojaL]) {
  const B = []; for (let i = 0; i < 9; i++) { const u = i / 8 - 0.5; B.push([u * w * 1.5, -a * (0.35 + (0.5 - Math.abs(u)) * 0.75) + h(i, 1, 940 + k) * 4, w * (0.32 + h(i, 2, 940 + k) * 0.12)]); }
  c_copa(R, x, y, B, verdes, m);
  if (fl) for (let i = 0; i < Math.round(w * a / 9); i++) { const px = Math.round(x + m + (h(i, 3, 941 + k) - 0.5) * w * 1.8), py = Math.round(y - h(i, 4, 941 + k) * a * 1.05); if (R.pget(px, py) === verdes[0] || !R.pget(px, py)) continue;
    const c = h(i, 5, 941 + k) < 0.3 ? fl[2] : h(i, 5, 941 + k) < 0.75 ? fl[0] : fl[1]; R.pset(px, py, c); R.pset(px + 1, py, fl[1]); if (i % 3 === 0) { R.pset(px, py - 1, fl[2]); R.pset(px + 1, py + 1, fl[1]); } }
}

// una vaca que pace (x: centro, suelo; dir), con la cabeza que sube y baja y la cola que se mueve
function c_vaca(R, x, suelo, t, dir = 1, k = 0) {
  x = Math.round(x); const B = hex('#f4f0e8'), N = hex('#2a2428'), S = hex('#c8c0b4'), pace = Math.sin(t * 0.6 + k) > -0.2;
  R.dibujo(['.NBBBBNNBBB.', 'BBNNBBBBBNNB', 'BBNNNBBBBBBB', 'SBBBBBBNNBBS', '.SSSSSSSSSS.', '.k.k....k.k.', '.k.k....k.k.'], x - 6, suelo - 7, dir, { B, N, S, k: hex('#3a3034') });
  const hx = dir > 0 ? x + 5 : x - 9, hy = suelo - (pace ? 5 : 9);
  R.dibujo(['.kk.', 'BBNB', 'BNNB', '.pp.'], hx, hy, dir, { B, N, k: hex('#c8b8a0'), p: hex('#e8a8a0') });
  const cola = Math.round(Math.sin(t * 3 + k) * 1.5), tx = dir > 0 ? x - 7 : x + 6; R.linea(tx, suelo - 6, tx - dir + cola, suelo - 2, hex('#3a3034'));
}

const c_HUEVOS_J = [[22, 140], [128, 138], [70, 138], [186, 142], [52, 154], [238, 142], [106, 168], [292, 156]];

const c_COLH = [[hex('#c8282a'), hex('#8a1418')], [hex('#e8b020'), hex('#b07a10')], [hex('#3a6ac8'), hex('#2a4a90')], [hex('#3a9a4a'), hex('#246a30')], [hex('#a85ac8'), hex('#743a90')], [hex('#e8782a'), hex('#a84a14')], [hex('#e86a9a'), hex('#a83a6a')], [hex('#30a8b8'), hex('#1a7080')]];

// el cielo de primavera con el sol (fijo)
function c_cieloPrim(R, hor = 110, sol = [204, 26]) {
  c_grad(R, 0, 0, 319, hor, c_CIELO_PRIM);
  if (sol) { R.halo(sol[0], sol[1], 22, [hex('#cfe4f4'), hex('#e0eef6'), hex('#f0f6f2')], 1.2); R.disco(sol[0], sol[1], 9, hex('#fff0b0')); R.disco(sol[0], sol[1], 8, hex('#fff8d8')); R.disco(sol[0] - 2, sol[1] - 2, 4, hex('#ffffff')); }
}

// el jardín (sin cielo): colinas con viñas y un castillo, el pueblo con la torre, la casa de entramado, la cerca de
// mimbre, el manzano en flor, los arbustos, el pozo y el césped con el camino
function c_jardinFondo(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  const yA = (x) => Math.round(68 + 6 * Math.sin(x * 0.02 + 1) + 2 * Math.sin(x * 0.09));
  for (let x = 0; x < 320; x++) for (let y = yA(x); y < 110; y++) pset(x, y, y === yA(x) ? hex('#a4bcc6') : h(x >> 2, y >> 2, 950) < 0.25 ? hex('#7e9aa8') : hex('#8aa6b2'));
  // el castillo en ruinas sobre la colina lejana
  { const b = yA(60) + 2; rect(48, b - 16, 56, b, hex('#9aa6b0')); rect(54, b - 16, 56, b, hex('#7e8a96')); for (let x = 48; x <= 56; x += 2) pset(x, b - 17, hex('#9aa6b0')); rect(57, b - 8, 72, b, hex('#94a0aa')); for (let x = 57; x <= 72; x += 3) pset(x, b - 9, hex('#94a0aa')); rect(51, b - 12, 52, b - 10, hex('#5a6470')); rect(62, b - 5, 63, b - 3, hex('#5a6470')); }
  const yB = (x) => Math.round(84 + 5 * Math.sin(x * 0.03) + 2 * Math.sin(x * 0.11 + 2));
  for (let x = 0; x < 320; x++) for (let y = yB(x); y < 120; y++) { let c = y === yB(x) ? hex('#8ab874') : h(x >> 2, y >> 1, 951) < 0.2 ? hex('#5e8e50') : hex('#6c9c5a'); if (x < 150 && (x + y * 2) % 7 === 0 && y > yB(x) + 1) c = hex('#4a7a40'); pset(x, y, c); }
  // el pueblo lejano con la torre de la iglesia
  for (const [x, w, c] of [[140, 8, hex('#e8dccc')], [150, 7, hex('#f0e4d0')], [176, 9, hex('#e4d8c4')], [188, 6, hex('#eee2cc')]]) { const b = yB(x + 3) + 1; rect(x, b - 6, x + w, b, c); poligono([[x - 1, b - 5], [x + w / 2, b - 10], [x + w + 1, b - 5]], c_K.tejaRS); pset(x + 2, b - 3, hex('#6a7a8a')); }
  { const b = yB(166) + 1; rect(162, b - 20, 170, b, hex('#f0ece0')); rect(169, b - 20, 170, b, hex('#d0c8b8')); rect(164, b - 17, 167, b - 13, hex('#4a4050')); poligono([[161, b - 20], [166, b - 34], [171, b - 20]], hex('#5a7088')); linea(161, b - 20, 165, b - 33, hex('#7a90a8')); pset(166, b - 36, hex('#c8a040')); pset(166, b - 35, hex('#c8a040')); }
  // la línea del bosque
  for (let i = 0; i < 70; i++) { const x = (i * 4.7) % 330 - 5, y = 100 + Math.round(h(i, 1, 952) * 4); disco(x, y, 3 + h(i, 2, 952) * 2, i % 3 ? hex('#3e6e3a') : hex('#4a7a44')); pset(x - 1, y - 2, hex('#6a9a5a')); }
  rect(0, 104, 319, 140, hex('#5a8a44'));
  // el césped con sus manchas, las florecillas y el camino de grava que sale de la puerta
  c_hierba(R, 0, 104, 319, 179, [K.hojaD, hex('#4a8a34'), hex('#5c9c40'), hex('#82c056')], 953);
  c_florecillas(R, 0, 140, 320, 180, 90, 1);
  poligono([[262, 136], [278, 136], [292, 158], [300, 180], [214, 180], [236, 158]], (x, y) => { const q = h(x >> 1, y >> 1, 954); return q < 0.2 ? hex('#a8988a') : q > 0.8 ? hex('#e0d4c0') : h(x, y, 955) < 0.15 ? hex('#8a7c70') : hex('#c8baa4'); });
  for (let y = 136; y < 180; y++) { const l = Math.round(262 - (y - 136) * (y < 158 ? 1.18 : 1)), r2 = Math.round(278 + (y - 136) * (y < 158 ? 0.64 : 0.36)); pset(l, y, hex('#4a7a34')); pset(r2, y, hex('#4a7a34')); }
  // la casa de entramado: tejado de tejas con buhardilla y chimenea, piso alto en voladizo, entramado con cruces de San Andrés
  rect(224, 34, 232, 56, C.k); rect(225, 35, 231, 56, hex('#a85a42')); for (let y = 38; y < 56; y += 3) rect(225, y, 231, y, hex('#84402e')); rect(223, 33, 233, 35, hex('#6a6670'));
  c_tejado(R, [[190, 76], [214, 50], [320, 50], [320, 76]], [K.tejaR, K.tejaRS, K.tejaRL, hex('#6a2a1a')], 1, 4, 6);
  linea(190, 76, 214, 50, hex('#5a2414')); rect(214, 49, 319, 50, hex('#6a2a1a'));
  rect(250, 54, 268, 72, C.k); rect(251, 58, 267, 72, K.yesoE); poligono([[248, 59], [259, 49], [270, 59]], K.tejaRS); linea(248, 59, 259, 49, K.tejaRL); c_ventana(R, 255, 61, 263, 70, 1, 2, hex('#5a7a90'), [K.entram, K.entramS]);
  const panel = (x0, y0, x1, y1) => { c_textura(R, x0, y0, x1, y1, K.yesoE, K.yesoES, hex('#fbf6ea'), 956, 3, 0, 0.05); };
  rect(194, 76, 319, 101, K.entram); panel(196, 78, 319, 99);
  for (let x = 194; x < 320; x += 20) { rect(x, 76, x + 2, 101, K.entram); rect(x, 76, x, 101, hex('#6a4a34')); }
  for (let i = 0; i < 6; i++) { const x = 196 + i * 20; if (i % 2) { linea(x, 99, x + 17, 78, K.entram); linea(x + 1, 99, x + 18, 78, K.entram); } else { linea(x, 78, x + 17, 99, K.entram); linea(x + 1, 78, x + 18, 99, K.entram); } }
  rect(192, 100, 319, 104, K.entram); rect(192, 100, 319, 100, hex('#6a4a34')); rect(192, 104, 319, 105, K.entramS);
  for (let x = 196; x < 320; x += 6) rect(x, 105, x + 1, 107, K.entramS);
  rect(196, 105, 319, 136, K.entram); panel(198, 107, 319, 133);
  for (let x = 196; x < 320; x += 24) { rect(x, 105, x + 2, 136, K.entram); rect(x, 105, x, 136, hex('#6a4a34')); }
  rect(196, 118, 319, 119, K.entram); for (let i = 0; i < 5; i++) { const x = 198 + i * 24; linea(x, 133, x + 21, 120, K.entram); }
  for (const [x, y] of [[202, 81], [242, 81], [282, 81]]) { c_contra(R, x - 6, y, x - 1, y + 14, hex('#3a6a4a')); c_contra(R, x + 15, y, x + 20, y + 14, hex('#3a6a4a')); c_ventana(R, x, y, x + 14, y + 14, 2, 2, hex('#6a8aa0'), [K.entram, K.entramS]);
    for (let j = 1; j < 14; j += 3) for (let i = 1; i < 14; i += 3) pset(x + i, y + j, hex('#9ab8c8')); }
  for (const [x, y] of [[208, 109], [292, 109]]) { c_ventana(R, x, y, x + 14, y + 15, 2, 2, hex('#6a8aa0'), [K.entram, K.entramS]); for (let j = 1; j < 15; j += 3) for (let i = 1; i < 14; i += 3) pset(x + i, y + j, hex('#9ab8c8'));
    rect(x - 2, y + 16, x + 16, y + 19, C.k); rect(x - 1, y + 16, x + 15, y + 18, hex('#7a4a2a')); for (let i = 0; i < 8; i++) { pset(x + i * 2, y + 15, i % 2 ? hex('#e8283a') : hex('#f04a5a')); pset(x + i * 2 + 1, y + 14, hex('#3a7a2a')); } }
  // la puerta de tablas con el arco y los escalones de piedra
  rect(258, 110, 277, 136, C.k); disco(267.5, 112, 9.5, C.k); rect(259, 112, 276, 136, hex('#7a4a2a')); disco(267.5, 112, 8.5, hex('#7a4a2a')); rect(259, 104, 276, 106, K.yesoE);
  for (let x = 261; x < 276; x += 3) rect(x, 106, x, 136, hex('#5a341e')); for (const y of [114, 128]) rect(259, y, 276, y + 1, hex('#3a3440')); pset(273, 122, C.oro);
  rect(256, 134, 280, 137, K.piedraP); rect(256, 134, 280, 134, K.piedraPL); rect(254, 137, 282, 139, K.piedraPS);
  rect(196, 133, 319, 137, K.piedraP); rect(196, 133, 319, 133, K.piedraPL); for (let x = 198; x < 320; x += 7) pset(x, 135, K.piedraPS);
  // la cerca de mimbre trenzado, con sus estacas
  for (let x = 0; x < 196; x += 14) { rect(x, 116, x + 1, 137, hex('#6a4a2e')); pset(x, 115, hex('#8a6a44')); }
  for (let f = 0; f < 6; f++) { const y0 = 119 + f * 3; for (let x = 0; x < 196; x++) { const y = y0 + Math.round(Math.sin((x / 14) * Math.PI + f * Math.PI) * 1); pset(x, y, f % 2 ? hex('#a8845a') : hex('#8a6a44')); pset(x, y + 1, hex('#5a4028')); } }
  // el manzano en flor
  rect(58, 98, 63, 138, C.k); rect(59, 98, 62, 138, hex('#6a5040')); rect(59, 98, 59, 138, hex('#8a7060')); linea(60, 108, 44, 88, hex('#5a4030')); linea(61, 104, 80, 84, hex('#5a4030')); linea(60, 112, 40, 100, hex('#5a4030'));
  for (let i = 0; i < 6; i++) { linea(58 + i, 138, 52 + i * 3, 141, hex('#5a4030')); }
  // la sombra del manzano y del pozo en la hierba
  for (let j = 0; j < 4; j++) for (let i = -26; i <= 26; i++) if (c_um(60 + i, 138 + j) < 0.6 - Math.abs(i) / 60) pset(60 + i, 138 + j, hex('#3e6e2a'));
  // el parterre: el seto de boj recortado con tulipanes detrás
  for (let x = 16; x < 116; x++) { for (let y = 146; y < 150; y++) if (h(x, y, 957) < 0.5) pset(x, y + 0, (x + y) % 3 ? hex('#e83a3a') : hex('#f8c838')); }
  for (let x = 16; x < 116; x += 3) { pset(x, 145, hex('#e83a3a')); pset(x + 1, 145, hex('#c82828')); pset(x, 146, hex('#3a7a2a')); }
  rect(14, 150, 116, 156, hex('#2a5a24')); rect(14, 150, 116, 151, hex('#4a8a3a')); for (let x = 14; x < 116; x++) if (h(x, 0, 958) < 0.4) pset(x, 152 + (x % 3), hex('#3a6a2e')); rect(14, 156, 116, 156, hex('#1e4418'));
  // el pozo: tambor de piedra, los postes, el tejadillo de tablilla, el torno y la cuerda
  c_piedras(R, 140, 124, 176, 140, [K.mortero, K.piedraP, K.piedraPS, K.piedraPL, hex('#9a8e7e')], 3, 5, 8);
  for (let x = 140; x <= 176; x++) { pset(x, 140, K.piedraPS); pset(x, 141, hex('#3e6e2a')); }
  for (let x = 141; x < 176; x++) { pset(x, 122, K.piedraPL); pset(x, 123, K.piedraPS); } rect(146, 121, 170, 121, hex('#1e1a20'));
  for (const x of [142, 172]) { rect(x, 92, x + 2, 122, C.k); rect(x + 1, 92, x + 1, 122, hex('#8a6a44')); }
  poligono([[136, 96], [158, 82], [180, 96]], (x, y) => ((y - 82) % 3 === 2) ? hex('#4a3a2e') : (x + Math.floor(y / 3) * 2) % 5 === 0 ? hex('#5a4a3a') : hex('#7a6450')); linea(136, 96, 158, 82, hex('#9a8068')); linea(158, 82, 180, 96, hex('#4a3a2e'));
  rect(143, 100, 173, 101, hex('#5a4030')); disco(174, 100, 2, hex('#3a3440')); linea(174, 100, 178, 104, hex('#3a3440'));
}

// lo de delante en el jardín: un arbusto en flor abajo a la izquierda y matas de tulipanes abajo a la derecha (cámara
// general) o la mata grande con flores blancas a la derecha y las briznas de la izquierda (cámara 'arbustos')
function c_jardinDelante(R, t, o, cerca) {
  const m = Math.round(Math.sin(t * 1.3) * 1);
  if (!cerca) {
    c_arbusto(R, 18, 182, 26, 30, [hex('#e8507a'), hex('#b8305a'), hex('#ffb0c8')], 4, m);
    for (let i = 0; i < 9; i++) { const x = 296 + i * 3 - (i % 2) * 2, y = 170 + (i % 3) * 3, s = Math.round(Math.sin(t * 2 + i) * 0.8); R.linea(x, 180, x + s, y, c_K.hojaS); R.linea(x + 1, 180, x + 1 + s, y + 2, c_K.hoja); R.rect(x - 1 + s, y - 4, x + 1 + s, y - 1, i % 2 ? hex('#e83a3a') : hex('#f8c838')); R.pset(x + s, y - 4, hex('#ffffff')); }
    return;
  }
  c_arbusto(R, 280, 184, 44, 54, [hex('#ffffff'), hex('#d8dce8'), hex('#fff8c8')], 7, m);
  for (let i = 0; i < 16; i++) { const x = 2 + i * 4 + (i % 3), y = 162 + (i % 4) * 4, s = Math.round(Math.sin(t * 2.2 + i * 0.7) * 1.2); R.linea(x, 180, x + s, y, i % 2 ? c_K.hojaS : c_K.hoja); R.linea(x + 1, 180, x + 1 + s, y + 3, c_K.hojaL); }
}

function c_jardin(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K, nh = Math.max(0, Math.min(8, Math.round(o.huevos ?? 6)));
  if (!cerca) {
    R.copiar(c_capa(R, 'jar-cielo', () => c_cieloPrim(R)));
    c_nubes(R, t, [[30, 56, 18, 0.9], [200, 60, 14, 0.7]], [hex('#bcd0e4'), hex('#e0ecf6'), hex('#f8fcff')]);
    c_nubes(R, t, [[80, 34, 30, 1.8], [250, 40, 22, 1.5]], c_NUBE_DIA);
    c_nubes(R, t, [[140, 22, 40, 3.2]], c_NUBE_DIA);
    c_aves(R, t, 5, 30, 56, 2, hex('#2a3040'), 16);
    c_pegar(R, c_capa(R, 'jar-fondo', () => c_jardinFondo(R)));
    // el humo de la chimenea, que se va a la izquierda
    c_humo(R, 228, 31, t, 0, [hex('#c8c4cc'), hex('#e4e0e8'), hex('#a8a4b0')], 26, -0.8);
    // la copa del manzano en flor (se mece) y los pétalos que se lleva el viento
    const m = Math.round(Math.sin(t * 0.9) * 1);
    c_copa(R, 60, 84, [[0, 0, 15], [-17, 6, 11], [17, 4, 12], [-8, -12, 11], [10, -11, 10], [-24, 14, 7], [25, 13, 7], [0, 12, 10]], [hex('#a86a88'), hex('#d890b0'), hex('#f4c0d4'), hex('#fff4f8')], m);
    for (let i = 0; i < 40; i++) { const a = h(i, 1, 960) * 6.28, r = 4 + h(i, 2, 960) * 24, x = Math.round(60 + m + Math.cos(a) * r), y = Math.round(82 + Math.sin(a) * r * 0.75); if (Math.sin(t * 2 + i) > -0.2) pset(x, y, i % 3 ? hex('#ffffff') : hex('#e888a8')); }
    c_caen(R, t, 14, 40, 200, 80, 170, [hex('#ffffff'), hex('#f4b8d0'), hex('#ffe0ea')], 1, 8);
    // los arbustos en flor (forsitia y lila) que se mecen un poco
    c_arbusto(R, 18, 140, 20, 28, [K.forsit, K.forsitS, K.forsitL], 1, Math.round(Math.sin(t * 1.1 + 1) * 0.8), [hex('#4a5a1e'), hex('#6a7a2a'), hex('#8a9a3a'), hex('#b0c050')]);
    c_arbusto(R, 126, 140, 16, 24, [K.lila, K.lilaS, K.lilaL], 2, Math.round(Math.sin(t * 1.2 + 2) * 0.8));
    // los huevos escondidos (o.huevos: cuántos quedan)
    for (let i = 0; i < nh; i++) { const [x, y] = c_HUEVOS_J[i], c = c_COLH[i]; c_huevo(R, x, y, c[0], c[1], 2, i % 2 ? 'raya' : 'puntos', hex('#fff8e8')); }
    // el cubo del pozo que sube y baja con su cuerda, y el gato en el brocal que mueve la cola
    const cb = Math.round(110 + Math.sin(t * 0.8) * 6); R.linea(158, 101, 158, cb - 4, hex('#c8b890')); rect(154, cb - 4, 162, cb + 3, C.k); rect(155, cb - 3, 161, cb + 2, hex('#8a6a44')); rect(155, cb - 1, 161, cb - 1, hex('#3a3440')); R.linea(154, cb - 4, 158, cb - 8, hex('#3a3440')); R.linea(162, cb - 4, 158, cb - 8, hex('#3a3440'));
    { const gx = 172, gy = 121; R.dibujo(['.k...k.', '.kgkgk.', '.kgggk.', '..kgk..', '.kgggk.', 'kgggggk', 'kgggggk', '.kkkkk.'], gx - 3, gy - 8, 1, { k: hex('#2a2224'), g: hex('#4a4048') }); pset(gx - 1, gy - 6, hex('#b8d040')); pset(gx + 1, gy - 6, hex('#b8d040')); const c2 = Math.round(Math.sin(t * 1.6) * 2); R.linea(gx + 3, gy - 1, gx + 6, gy + 2 + c2, hex('#2a2224')); }
    // la gallina junto a la casa, mariposas y una abeja
    c_gallina(R, 236 + Math.sin(t * 0.3) * 6, 146, t, Math.cos(t * 0.3) > 0 ? 1 : -1, 5, false, Math.abs(Math.cos(t * 0.3)) > 0.5);
    c_mariposa(R, 30, 118, t, 1, hex('#f8e858')); c_mariposa(R, 120, 112, t, 3, hex('#ffffff')); c_mariposa(R, 210, 150, t, 5, hex('#f8a040'));
    { const bx = Math.round(126 + Math.sin(t * 3) * 10), by = Math.round(122 + Math.sin(t * 5) * 4); pset(bx, by, hex('#e8b820')); pset(bx + 1, by, C.k); if (Math.sin(t * 30) > 0) pset(bx, by - 1, hex('#ffffff')); }
    // briznas de hierba que el viento mueve en primer plano
    for (let i = 0; i < 26; i++) { const x = Math.round(h(i, 1, 961) * 300) + 10, y = 174 + Math.round(h(i, 2, 961) * 6), s = Math.round(Math.sin(t * 2.4 + x * 0.05) * 1.2); R.linea(x, y, x + s, y - 4, i % 2 ? K.hojaL : K.hoja); }
    return { suelo: 162, sueloFondo: 146, huevos: c_HUEVOS_J.slice(0, nh), pozo: [140, 92, 180, 140], cubo: [158, cb], puerta: [258, 104, 277, 136], casa: [190, 50, 319, 137], manzano: [60, 84], cerca: [0, 116, 196, 137], camino: [214, 136, 300, 180] };
  }
  // los arbustos de cerca: el cielo, la pared de entramado, el seto alto y los tres arbustos en flor con los huevos
  R.copiar(c_capa(R, 'jar-c-cielo', () => c_grad(R, 0, 0, 319, 70, c_CIELO_PRIM)));
  c_nubes(R, t, [[40, 26, 30, 1.6], [220, 16, 22, 1.1], [130, 34, 18, 2.6]], c_NUBE_DIA);
  c_aves(R, t, 3, 14, 30, 4, hex('#2a3040'), 14);
  c_pegar(R, c_capa(R, 'jar-c-fondo', () => {
    const { rect, pset, linea } = R;
    // el árbol en flor que asoma por encima del seto
    c_copa(R, 214, 46, [[0, 0, 16], [-16, 6, 12], [18, 6, 12], [-6, -10, 10], [8, -8, 10]], [hex('#a86a88'), hex('#d890b0'), hex('#f4c0d4'), hex('#fff4f8')]);
    // la pared de entramado de la casa a la izquierda, con su ventana y la jardinera
    rect(0, 0, 112, 120, K.entram); c_textura(R, 3, 3, 109, 117, K.yesoE, K.yesoES, hex('#fbf6ea'), 970, 3, 0, 0.05);
    for (const x of [0, 54, 108]) rect(x, 0, x + 4, 120, K.entram); rect(0, 56, 112, 60, K.entram); linea(4, 117, 54, 60, K.entram); linea(5, 117, 55, 60, K.entram); linea(4, 116, 54, 59, K.entram);
    for (const x of [0, 54, 108]) rect(x, 0, x, 120, hex('#6a4a34'));
    c_ventana(R, 66, 14, 96, 46, 2, 3, hex('#6a8aa0'), [K.entram, K.entramS]); for (let j = 16; j < 46; j += 4) for (let i = 68; i < 96; i += 4) pset(i, j, hex('#9ab8c8'));
    rect(62, 47, 100, 52, C.k); rect(63, 47, 99, 51, hex('#7a4a2a')); for (let i = 0; i < 18; i++) { pset(64 + i * 2, 46, i % 2 ? hex('#e8283a') : hex('#f04a5a')); pset(64 + i * 2 + 1, 45, hex('#3a7a2a')); pset(64 + i * 2, 44 + (i % 3), hex('#e8283a')); }
    // el seto alto recortado, con su luz arriba
    for (let y = 44; y < 122; y++) for (let x = 112; x < 320; x++) { const q = h(x >> 1, y >> 1, 971); R.buf[y * 320 + x] = y < 46 ? hex('#6aa04a') : q < 0.2 ? hex('#1e4a1e') : q > 0.85 ? hex('#4a8a3a') : h(x, y, 972) < 0.2 ? hex('#2a5a26') : hex('#346a2e'); }
    for (let x = 112; x < 320; x++) if (h(x, 0, 973) < 0.5) pset(x, 43, hex('#5a9040'));
    // la hierba con tulipanes y prímulas
    c_hierba(R, 0, 118, 319, 179, [K.hojaD, hex('#4a8a34'), hex('#5c9c40'), hex('#82c056')], 974);
    c_florecillas(R, 0, 150, 320, 180, 70, 3, [hex('#ffffff'), hex('#f8e858'), hex('#f0a0c8'), hex('#c8a0f0')]);
  }));
  const ms = (k) => Math.round(Math.sin(t * 1.2 + k) * 0.9);
  c_arbusto(R, 60, 146, 44, 66, [K.lila, K.lilaS, K.lilaL], 11, ms(0));
  c_arbusto(R, 166, 148, 42, 60, [K.forsit, K.forsitS, K.forsitL], 12, ms(1), [hex('#4a5a1e'), hex('#6a7a2a'), hex('#8a9a3a'), hex('#b0c050')]);
  c_arbusto(R, 252, 150, 36, 52, [hex('#ffffff'), hex('#d8dce8'), hex('#fff8c8')], 13, ms(2));
  const HC = [[36, 140], [92, 132], [138, 144], [184, 128], [222, 142], [116, 160], [200, 162], [52, 166]];
  const nc = Math.max(0, Math.min(8, Math.round(o.huevos ?? 8)));
  for (let i = 0; i < nc; i++) { const [x, y] = HC[i], c = c_COLH[i]; c_huevo(R, x, y, c[0], c[1], 3, i % 2 ? 'raya' : 'puntos', hex('#fff8e8')); }
  c_caen(R, t, 10, 150, 300, 30, 150, [hex('#ffffff'), hex('#f4b8d0')], 4, 7);
  c_mariposa(R, 120, 80, t, 2, hex('#f8e858')); c_mariposa(R, 240, 96, t, 6, hex('#a8c8f8'));
  return { suelo: 168, huevos: HC.slice(0, nc), arbustos: [[60, 146], [166, 148], [252, 150]], escondite: [280, 170], pared: [0, 0, 112, 120], seto: [112, 44, 319, 122] };
}

// los campos, la casa de piedra, el roble, el granero de banco, la cerca en zigzag y el camino (sin cielo)
function c_granjaFondo(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  const yA = (x) => Math.round(72 + 5 * Math.sin(x * 0.018 + 2) + 2 * Math.sin(x * 0.07));
  for (let x = 0; x < 320; x++) for (let y = yA(x); y < 100; y++) pset(x, y, y === yA(x) ? hex('#a0b8c4') : h(x >> 2, y >> 2, 980) < 0.25 ? hex('#7e98a6') : hex('#8aa4b0'));
  // los campos en mosaico (trigo, prado, arado con surcos) y los setos
  const yB = (x) => Math.round(82 + 4 * Math.sin(x * 0.025 + 1));
  const CAMPOS = [hex('#c8b84a'), hex('#7aaa4a'), hex('#8a6a44'), hex('#9ac05a'), hex('#d8c060'), hex('#6a9a3a')];
  for (let x = 0; x < 320; x++) for (let y = yB(x); y < 120; y++) { const cx = Math.floor((x + (y - 80) * 1.5) / 46), cy = Math.floor((y - 80) / 7), q = CAMPOS[Math.floor(h(cx, cy, 981) * 6)];
    let c = q; if (q === CAMPOS[2] && (x + y) % 3 === 0) c = hex('#6a4e30'); if (q === CAMPOS[0] && (x * 2 + y) % 5 === 0) c = hex('#b0a03a'); if (y === yB(x)) c = c_mez(q, hex('#ffffff'), 0.2);
    if ((x + (y - 80) * 1.5) % 46 < 1 || (y - 80) % 7 === 0) c = hex('#4a6a34'); pset(x, y, c); }
  for (let i = 0; i < 60; i++) { const x = (i * 5.5) % 330, y = 98 + Math.round(h(i, 1, 982) * 5); disco(x, y, 3 + h(i, 2, 982) * 3, i % 3 ? hex('#3a6a34') : hex('#4a7a40')); pset(x - 1, y - 2, hex('#6a9a4a')); }
  c_hierba(R, 0, 104, 319, 179, [K.hojaD, hex('#4e8a36'), hex('#62a042'), hex('#8ac458')], 983);
  c_florecillas(R, 0, 138, 320, 180, 70, 5, [hex('#ffffff'), hex('#f8d838'), hex('#e8a0c8')]);
  // el camino de tierra con roderas y un charco, hasta la rampa del granero
  poligono([[96, 180], [200, 180], [214, 152], [236, 132], [212, 132], [178, 150]], (x, y) => { const q = h(x >> 1, y >> 1, 984); return q < 0.2 ? hex('#8a6a44') : q > 0.85 ? hex('#c8a87a') : hex('#a88a5e'); });
  for (let y = 133; y < 180; y++) { const u = (y - 132) / 48, a = Math.round(224 - u * 96 + u * u * 20), b = Math.round(230 - u * 52); pset(a, y, hex('#7a5a38')); pset(b, y, hex('#7a5a38')); }
  for (let j = -2; j <= 2; j++) for (let i = -8; i <= 8; i++) if ((i / 8.5) ** 2 + (j / 2.5) ** 2 < 1) pset(170 + i, 166 + j, j < 0 ? hex('#a8cce8') : hex('#7aa0c0'));
  // la casa de piedra de dos plantas: tejado de tablilla, las dos chimeneas, el tejadillo entre plantas, ventanas de cuarterones y la puerta con montante
  for (const x of [22, 98]) { rect(x, 34, x + 9, 52, C.k); c_piedras(R, x + 1, 35, x + 8, 52, [K.mortero, K.piedraP, K.piedraPS, K.piedraPL, hex('#9a8e7e')], 7, 4, 5); rect(x, 33, x + 9, 34, hex('#5a5660')); }
  c_tejado(R, [[12, 64], [26, 46], [104, 46], [118, 64]], [hex('#7a7068'), hex('#5a524c'), hex('#9a9088'), hex('#423c38')], 4, 3, 4);
  linea(12, 64, 26, 46, hex('#4a443e')); linea(104, 46, 118, 64, hex('#4a443e')); rect(26, 45, 104, 46, hex('#4a443e'));
  c_piedras(R, 16, 64, 114, 128, [K.mortero, hex('#a8907a'), hex('#80705e'), hex('#c8b49c'), hex('#94867a')], 8, 6, 12);
  for (let y = 64; y < 68; y++) for (let x = 16; x <= 114; x++) if (c_um(x, y) < (68 - y) / 5) pset(x, y, c_mez(R.pget(x, y), C.k, 0.35));
  c_tejado(R, [[12, 96], [16, 91], [114, 91], [118, 96]], [hex('#7a7068'), hex('#5a524c'), hex('#9a9088'), hex('#423c38')], 5, 2, 4);
  for (let x = 14; x <= 116; x++) for (let y = 97; y < 100; y++) if (c_um(x, y) < (100 - y) / 4) pset(x, y, c_mez(R.pget(x, y), C.k, 0.35));
  for (const x of [26, 59, 92]) { c_contra(R, x - 6, 70, x - 1, 87, hex('#4a6a5a')); c_contra(R, x + 13, 70, x + 18, 87, hex('#4a6a5a')); c_ventana(R, x, 70, x + 12, 87, 2, 3, hex('#4a6a80'), [hex('#f0ece0'), hex('#8a8478')]); }
  for (const x of [26, 92]) { c_contra(R, x - 6, 103, x - 1, 120, hex('#4a6a5a')); c_contra(R, x + 13, 103, x + 18, 120, hex('#4a6a5a')); c_ventana(R, x, 103, x + 12, 120, 2, 3, hex('#4a6a80'), [hex('#f0ece0'), hex('#8a8478')]); }
  rect(55, 100, 75, 128, hex('#f0ece0')); rect(57, 102, 73, 105, hex('#4a6a80')); for (let x = 59; x < 73; x += 3) rect(x, 102, x, 105, hex('#f0ece0'));
  rect(57, 107, 73, 128, hex('#5a3a24')); for (let x = 59; x < 73; x += 3) rect(x, 107, x, 128, hex('#4a2e1c')); rect(57, 116, 73, 117, hex('#3a2418')); pset(70, 118, C.oro);
  rect(51, 128, 79, 131, K.piedraP); rect(51, 128, 79, 128, K.piedraPL); rect(14, 128, 116, 130, hex('#6a6058'));
  // el roble entre la casa y el granero (el tronco; la copa se mece en el fotograma)
  rect(132, 84, 139, 132, C.k); rect(133, 84, 138, 132, hex('#6a5444')); rect(133, 84, 134, 132, hex('#8a7464')); for (let y = 88; y < 132; y += 5) pset(136, y, hex('#4a3a30'));
  linea(134, 98, 118, 80, hex('#4a3a30')); linea(137, 94, 156, 76, hex('#4a3a30')); for (let i = -3; i <= 4; i++) linea(135, 130, 135 + i * 3, 134, hex('#4a3a30'));
  for (let j = 0; j < 4; j++) for (let i = -30; i <= 30; i++) if (c_um(136 + i, 132 + j) < 0.6 - Math.abs(i) / 70) pset(136 + i, 132 + j, hex('#3e6e2a'));
  // el carro de granja aparcado
  rect(102, 120, 130, 126, C.k); rect(103, 121, 129, 125, hex('#8a6a44')); for (let x = 106; x < 130; x += 5) rect(x, 121, x, 125, hex('#6a4e30')); linea(102, 126, 88, 132, hex('#6a4e30'));
  for (const x of [108, 124]) { disco(x, 130, 5, C.k); disco(x, 130, 4, hex('#a07a4a')); disco(x, 130, 2, C.k); linea(x - 4, 130, x + 4, 130, hex('#6a4e30')); linea(x, 126, x, 134, hex('#6a4e30')); pset(x, 130, hex('#c8a87a')); }
  // el granero de banco: muro de piedra abajo con las puertas holandesas, el voladizo de tablas rojas, el tejado y la cúpula
  c_tejado(R, [[164, 72], [184, 48], [300, 48], [320, 72]], [hex('#8a7a68'), hex('#665848'), hex('#a8987e'), hex('#4a3e32')], 6, 3, 4);
  linea(164, 72, 184, 48, hex('#4a3e32')); rect(184, 47, 300, 48, hex('#4a3e32'));
  rect(234, 38, 246, 48, C.k); rect(235, 39, 245, 48, K.graneroR); for (let x = 236; x < 245; x += 2) rect(x, 41, x, 47, hex('#3a2418')); poligono([[232, 39], [240, 32], [248, 39]], hex('#5a5048')); linea(232, 39, 240, 32, hex('#8a7a68'));
  c_tablas(R, 168, 72, 316, 104, [K.graneroR, K.graneroRS, K.graneroRL, hex('#4a1810')], 9, 4);
  rect(166, 104, 318, 106, hex('#4a1810')); rect(166, 72, 318, 73, hex('#f0ece0'));
  rect(232, 76, 250, 98, hex('#f0ece0')); rect(234, 78, 248, 96, hex('#3a2418')); for (let i = 0; i < 20; i++) pset(235 + (i * 7) % 13, 88 + (i * 3) % 8, i % 2 ? K.pajaL : K.paja); rect(234, 90, 248, 96, K.paja); for (let x = 234; x <= 248; x += 2) pset(x, 89, K.pajaL);
  for (const x of [190, 288]) { rect(x - 6, 80, x + 6, 92, hex('#f0ece0')); for (let y = 82; y < 92; y += 2) rect(x - 5, y, x + 5, y, hex('#4a1810')); }
  c_piedras(R, 172, 106, 312, 132, [K.mortero, K.piedraP, K.piedraPS, K.piedraPL, hex('#9a8e7e')], 10, 6, 11);
  for (let y = 106; y < 112; y++) for (let x = 172; x <= 312; x++) if (c_um(x, y) < (112 - y) / 6.5) pset(x, y, c_mez(R.pget(x, y), C.k, 0.45));
  for (const x of [182, 226, 270]) { rect(x - 1, 110, x + 17, 132, hex('#f0ece0')); rect(x, 111, x + 16, 132, K.graneroR); c_tablas(R, x + 1, 112, x + 15, 131, [K.graneroR, K.graneroRS, K.graneroRL, hex('#4a1810')], x, 3); rect(x, 120, x + 16, 121, hex('#f0ece0')); linea(x + 1, 112, x + 15, 120, hex('#f0ece0')); }
  rect(170, 132, 314, 134, hex('#6a6058'));
  // la cerca de troncos en zigzag
  for (let i = 0; i < 16; i++) { const x0 = i * 20 - 4, xm = x0 + 10, y0 = 132, yb = 146; if (x0 > 90 && x0 < 236 && i !== 0) continue;
    for (let r = 0; r < 4; r++) { const y = 133 + r * 3; linea(x0, y + (i % 2 ? 2 : 0), x0 + 20, y + (i % 2 ? 0 : 2), hex('#5a4030')); linea(x0, y + 1 + (i % 2 ? 2 : 0), x0 + 20, y + 1 + (i % 2 ? 0 : 2), hex('#8a6a4a')); }
    rect(xm - 1, 130, xm, yb, hex('#4a3424')); }
}

// el porche de la casa de piedra (cámara 'porche'), con el hueco transparente a la derecha (x 231–319, y 17–125)
function c_porcheGranja(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  // el techo del porche de tablas y la viga
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) R.buf[y * 320 + x] = y % 4 === 3 ? hex('#8a7a62') : h(x >> 4, y >> 2, 990) < 0.2 ? hex('#a8987c') : hex('#b4a488');
  rect(0, 13, 319, 17, hex('#6a5a44')); rect(0, 13, 319, 13, hex('#8a7a62')); rect(0, 17, 319, 17, hex('#4a3e30'));
  // el muro de piedra de la casa
  c_piedras(R, 0, 18, 228, 128, [hex('#b8ac98'), hex('#a8907a'), hex('#80705e'), hex('#c8b49c'), hex('#94867a')], 11, 9, 18);
  for (let y = 18; y < 26; y++) for (let x = 0; x <= 228; x++) if (c_um(x, y) < (26 - y) / 9) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  // la ventana de cuarterones con contraventanas, el alféizar con un candelero
  c_contra(R, 14, 42, 24, 92, hex('#4a6a5a')); c_contra(R, 68, 42, 78, 92, hex('#4a6a5a'));
  c_ventana(R, 26, 42, 66, 92, 3, 4, hex('#2e3a4a'), [hex('#f0ece0'), hex('#8a8478')]);
  rect(27, 43, 34, 91, hex('#e8e0c8')); for (let y = 45; y < 91; y += 4) pset(30, y, hex('#c8bca0'));
  rect(22, 92, 70, 95, hex('#c8bca8')); rect(22, 95, 70, 96, hex('#8a7c68'));
  rect(56, 84, 58, 91, hex('#c8a040')); rect(54, 91, 60, 91, hex('#a87a20')); rect(57, 81, 57, 83, hex('#f0ece0'));
  // la puerta holandesa: la mitad de arriba abierta (dentro, oscuro con un farol), la de abajo cerrada; bisagras de hierro
  rect(90, 54, 128, 128, hex('#e8e0c8')); rect(93, 57, 125, 128, hex('#20181a'));
  for (let y = 58; y < 92; y++) for (let x = 94; x < 125; x++) if (h(x >> 2, y >> 2, 991) < 0.15) pset(x, y, hex('#2c2224'));
  rect(110, 60, 110, 70, hex('#4a4450')); rect(106, 70, 114, 80, C.k); rect(107, 71, 113, 79, hex('#c8a040')); rect(108, 73, 112, 77, hex('#f8d878'));
  c_tablas(R, 93, 92, 125, 128, [hex('#6a4a2e'), hex('#4e341e'), hex('#8a6440'), hex('#3a2416')], 12, 4);
  rect(93, 91, 125, 93, hex('#4e341e')); for (const y of [98, 120]) { rect(95, y, 116, y + 1, hex('#2a2a32')); pset(117, y, hex('#2a2a32')); } pset(121, 108, C.oro);
  linea(125, 57, 140, 52, hex('#6a4a2e')); poligono([[125, 57], [140, 52], [140, 88], [125, 92]], hex('#5a3e26')); for (let x = 128; x < 140; x += 3) linea(x, 57 - (x - 125) / 3, x, 91 - (x - 125) / 3, hex('#3a2416'));
  rect(88, 126, 130, 129, hex('#9a9488'));
  // la herradura y el manojo de maíz colgados, y el banco de respaldo
  for (let a = 0; a < 14; a++) { const an = Math.PI * (0.1 + a / 16), x = Math.round(109 + Math.cos(an) * 5), y = Math.round(44 - Math.sin(an) * 6 + 6); pset(x, y, hex('#5a5a66')); pset(x, y + 1, hex('#3a3a44')); }
  for (let i = 0; i < 4; i++) { const x = 150 + i * 4; linea(156, 24, x, 30, hex('#a87a3a')); for (let y = 30; y < 50; y++) pset(x + (y % 2), y, [hex('#e8b030'), hex('#c84a2a'), hex('#d8a040'), hex('#a8642a')][i]); pset(x, 50, hex('#e8c878')); }
  rect(140, 92, 210, 95, hex('#5a3e26')); rect(140, 92, 210, 92, hex('#7a5a3a')); rect(140, 96, 142, 128, hex('#4a3020')); rect(208, 96, 210, 128, hex('#4a3020'));
  for (let x = 144; x < 208; x += 8) rect(x, 96, x + 5, 108, hex('#6a4a2e'));
  rect(138, 110, 212, 114, hex('#7a5a3a')); rect(138, 110, 212, 110, hex('#9a7a52')); rect(140, 115, 142, 128, hex('#4a3020')); rect(208, 115, 210, 128, hex('#4a3020'));
  // la manta doblada y la cesta en el banco
  rect(178, 104, 196, 110, hex('#3a5a8a')); rect(178, 104, 196, 104, hex('#5a7aaa')); for (let x = 179; x < 196; x += 3) rect(x, 105, x, 109, hex('#c83a3a'));
  rect(150, 102, 166, 110, K.mimbreD); for (let x = 151; x < 166; x++) for (let y = 103; y < 110; y++) pset(x, y, (x + y) % 3 === 0 ? K.mimbreS : K.mimbre); for (let a = 0; a <= 10; a++) pset(150 + Math.round(a * 1.6), 102 - Math.round(Math.sin(a / 10 * Math.PI) * 7), K.mimbreS);
  // el poste del porche y la baranda con balaustres (lo de fuera queda transparente)
  rect(231, 17, 319, 125, 0);
  rect(222, 17, 232, 140, C.k); rect(223, 17, 231, 140, hex('#e8e0c8')); rect(223, 17, 224, 140, hex('#ffffff')); rect(229, 17, 231, 140, hex('#b8b0a0'));
  rect(232, 104, 319, 108, C.k); rect(232, 105, 319, 107, hex('#e8e0c8')); rect(232, 105, 319, 105, hex('#ffffff')); rect(232, 124, 319, 127, hex('#b8b0a0'));
  for (let x = 236; x < 320; x += 7) { rect(x, 108, x + 2, 124, hex('#e8e0c8')); rect(x + 2, 108, x + 2, 124, hex('#b8b0a0')); }
  // el suelo de tablas del porche, en perspectiva (fuga en 160, 60), con vetas y clavos
  for (let y = 128; y < 180; y++) { const d = y - 60; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 7.5, tb = Math.floor(u), fr = (u - tb) * d / 7.5;
      R.buf[y * 320 + x] = fr < 1 ? hex('#5a4630') : h(tb, Math.floor(y / 3), 992) < 0.15 ? hex('#8a6e4c') : h(x >> 1, y, 993) < 0.1 ? hex('#b8976a') : hex('#a08060'); } }
  rect(0, 128, 319, 129, hex('#5a4630'));
  for (let y = 129; y < 140; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (140 - y) / 16) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  // la luz que entra por el lado abierto
  for (let y = 129; y < 180; y++) for (let x = Math.round(232 - (y - 128) * 1.4); x < 320; x++) if (x >= 0 && c_um(x, y) < 0.35) pset(x, y, c_mez(R.pget(x, y), hex('#fff0c8'), 0.3));
}

// lo de fuera del porche (opaco): el cielo, las colinas, los campos, el granero rojo lejano, la cerca y el prado
function c_porcheFuera(R) {
  const { rect, pset, poligono, linea } = R;
  c_cieloPrim(R, 90, null);
  for (let x = 0; x < 320; x++) { const y = Math.round(70 + Math.sin(x * 0.04) * 3); for (let yy = y; yy < 180; yy++) pset(x, yy, yy === y ? hex('#a0b8c4') : hex('#8aa4b0')); }
  for (let x = 0; x < 320; x++) { const y = Math.round(80 + Math.sin(x * 0.05 + 1) * 3); for (let yy = y; yy < 180; yy++) { const cx = Math.floor((x + yy) / 24), c = [hex('#c8b84a'), hex('#7aaa4a'), hex('#9ac05a'), hex('#8a6a44')][Math.floor(h(cx, (yy / 6) | 0, 995) * 4)]; pset(x, yy, (x + yy) % 24 === 0 ? hex('#4a6a34') : c); } }
  rect(262, 70, 300, 92, hex('#9a3426')); for (let x = 264; x < 300; x += 3) rect(x, 72, x, 92, hex('#6e2218')); poligono([[258, 72], [281, 58], [304, 72]], hex('#7a6a58')); linea(258, 72, 281, 58, hex('#a8987e')); rect(270, 80, 278, 92, hex('#f0ece0')); rect(271, 81, 277, 92, hex('#6e2218'));
  c_hierba(R, 0, 92, 319, 179, [c_K.hojaD, hex('#4e8a36'), hex('#62a042'), hex('#8ac458')], 996);
  for (let i = 0; i < 6; i++) { const x0 = 228 + i * 18; for (let r = 0; r < 3; r++) { linea(x0, 98 + r * 3 + (i % 2) * 2, x0 + 18, 98 + r * 3 + (i % 2 ? 0 : 2), hex('#6a4e30')); } }
}

function c_granja(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K;
  if (!cerca) {
    R.copiar(c_capa(R, 'gra-cielo', () => c_cieloPrim(R, 110, [196, 28])));
    c_nubes(R, t, [[20, 60, 16, 0.8], [180, 64, 12, 0.6]], [hex('#bcd0e4'), hex('#e0ecf6'), hex('#f8fcff')]);
    c_nubes(R, t, [[60, 36, 30, 1.7], [230, 46, 22, 1.4]], c_NUBE_DIA);
    c_nubes(R, t, [[150, 22, 42, 3]], c_NUBE_DIA);
    c_aves(R, t, 5, 26, 58, 9, hex('#2a3040'), 14);
    c_pegar(R, c_capa(R, 'gra-fondo', () => c_granjaFondo(R)));
    // el labrador con su caballo que ara un campo lejano
    { const u = (t * 2.2) % 110, x = Math.round(20 + u), y = 92; rect(x, y - 4, x + 5, y - 2, hex('#6a4a2e')); rect(x + 5, y - 6, x + 6, y - 4, hex('#6a4a2e')); pset(x + 1, y - 1, hex('#4a3020')); pset(x + 4, y - 1, hex('#4a3020')); rect(x - 5, y - 5, x - 4, y - 1, hex('#2a3a5a')); pset(x - 5, y - 6, hex('#e8c8a0')); R.linea(x - 3, y - 2, x, y - 3, hex('#3a3040')); }
    // la copa del roble que se mece
    const m = Math.round(Math.sin(t * 0.8) * 1);
    c_copa(R, 136, 68, [[0, 0, 20], [-20, 8, 14], [20, 6, 15], [-10, -14, 13], [12, -13, 12], [-28, 18, 9], [28, 16, 9], [0, 16, 13]], [hex('#1e4418'), hex('#2e6024'), hex('#4a8a34'), hex('#7ab84a')], m);
    for (let i = 0; i < 16; i++) { const a = h(i, 1, 997) * 6.28, r = 6 + h(i, 2, 997) * 22, x = Math.round(136 + m + Math.cos(a) * r), y = Math.round(66 + Math.sin(a) * r * 0.7); if (Math.sin(t * 3 + i * 1.3) > 0.3) pset(x, y, hex('#9ad060')); }
    // el humo de las chimeneas, la veleta del gallo, que gira con el viento
    c_humo(R, 26, 31, t, 0, undefined, 22, -0.6); c_humo(R, 102, 31, t, 2, undefined, 22, -0.6);
    { const d = Math.sin(t * 0.5) > 0 ? 1 : -1; rect(240, 26, 240, 32, hex('#2a2a32')); R.dibujo(['.k...', 'kkk.k', '.kkkk', '..kk.'], 237, 22, d, { k: hex('#2a2a32') }); }
    // las vacas que pacen junto al granero y las gallinas de la casa
    c_vaca(R, 268, 140, t, -1, 0); c_vaca(R, 302, 146, t, 1, 2);
    c_gallina(R, 86 + Math.sin(t * 0.5) * 5, 140, t, Math.cos(t * 0.5) > 0 ? 1 : -1, 1, false, Math.abs(Math.cos(t * 0.5)) > 0.6); c_gallina(R, 64, 142, t, 1, 3, true);
    c_mariposa(R, 40, 150, t, 2, hex('#f8e858')); c_mariposa(R, 200, 164, t, 4, hex('#ffffff'));
    for (let i = 0; i < 24; i++) { const x = Math.round(h(i, 1, 998) * 300) + 10, y = 172 + Math.round(h(i, 2, 998) * 7), s = Math.round(Math.sin(t * 2.4 + x * 0.05) * 1.2); if (x > 96 && x < 210) continue; R.linea(x, y, x + s, y - 4, i % 2 ? K.hojaL : K.hoja); }
    return { suelo: 162, sueloCamino: 160, casa: [12, 34, 118, 131], puertaCasa: [57, 102, 73, 128], granero: [164, 32, 320, 134], puertasGranero: [[182, 110, 198, 132], [226, 110, 242, 132], [270, 110, 286, 132]], heno: [234, 78, 248, 96], roble: [136, 68], carro: [88, 120, 130, 135], cerca: [0, 130, 320, 146], camino: [96, 132, 236, 180] };
  }
  // el porche: fuera (cielo, campos, granero lejano) y el porche por encima, con el nido del sombrero
  R.copiar(c_capa(R, 'gra-p-fuera', () => c_porcheFuera(R)));
  c_nubes(R, t, [[250, 40, 22, 1.4], [300, 26, 30, 2.3], [200, 58, 14, 0.9]], c_NUBE_DIA);
  c_aves(R, t, 3, 30, 60, 6, hex('#2a3040'), 13);
  c_gallina(R, 250 + Math.sin(t * 0.6) * 10, 104, t, Math.cos(t * 0.6) > 0 ? 1 : -1, 2, true, true);
  c_mariposa(R, 290, 88, t, 1, hex('#f8e858'));
  c_pegar(R, c_capa(R, 'gra-porche', () => c_porcheGranja(R)));
  // el nido de golondrinas bajo la viga, con las golondrinas que entran y salen
  { rect(200, 18, 210, 22, hex('#8a6a4a')); for (let x = 201; x < 210; x++) pset(x, 22 + (x % 2), hex('#6a4e30'));
    const c = t % 6, u = c < 3 ? c / 3 : 1 - (c - 3) / 3, x = Math.round(205 + u * 90), y = Math.round(22 + Math.sin(u * Math.PI) * 30), a = Math.sin(t * 16) > 0;
    if (u > 0.04) { R.pset(x, y, hex('#1a1a3a')); R.pset(x - 1, y - (a ? 1 : -1), hex('#1a1a3a')); R.pset(x + 1, y - (a ? 1 : -1), hex('#1a1a3a')); R.pset(x - 2, y - (a ? 2 : -1), hex('#1a1a3a')); R.pset(x + 2, y - (a ? 2 : -1), hex('#1a1a3a')); R.pset(x, y + 1, hex('#e86a3a')); }
    if (Math.sin(t * 5) > 0) { R.pset(203, 17, hex('#f8d040')); R.pset(207, 17, hex('#f8d040')); } }
  // el gato que duerme en el banco y la llama del farol de dentro
  { const gx = 196, gy = 110; disco(gx, gy - 3, 4, C.k); disco(gx, gy - 3, 3, hex('#d88a3a')); rect(gx - 5, gy - 3, gx + 3, gy - 1, hex('#d88a3a')); rect(gx - 6, gy - 1, gx + 4, gy - 1, C.k); disco(gx - 6, gy - 4, 2.5, hex('#d88a3a')); pset(gx - 8, gy - 7, hex('#d88a3a')); pset(gx - 5, gy - 7, hex('#d88a3a')); pset(gx - 7, gy - 4, C.k); pset(gx - 5, gy - 4, C.k);
    for (const x of [gx - 2, gx + 1]) pset(x, gy - 4, hex('#b06a2a')); const r = Math.sin(t * 1.6) > 0 ? 1 : 0; R.linea(gx + 4, gy - 2, gx + 7, gy - 4 - r, hex('#b06a2a')); }
  c_llama(R, 110, 77, 1.5, 4, t, 2);
  // el nido hecho con un sombrero (o.nido; o.huevos: cuántos huevos de colores)
  if (o.nido !== false) { const nx = 164, ny = 150, n = Math.max(0, Math.min(5, Math.round(o.huevos ?? 3)));
    for (let j = 0; j < 4; j++) for (let i = -18; i <= 18; i++) if (c_um(nx + i, ny + 5 + j) < 0.6 - Math.abs(i) / 40) pset(nx + i, ny + 5 + j, c_mez(R.pget(nx + i, ny + 5 + j), C.k, 0.35));
    // el sombrero de paja vuelto boca arriba: la copa abajo (con su cinta roja), el ala alrededor de la boca y la paja dentro
    for (let j = 0; j < 9; j++) { const w = 11 - j * 0.5; for (let i = -w; i <= w; i++) pset(nx + Math.round(i), ny - 2 + j, i < -w + 2 ? K.pajaS : i > w - 2 ? K.pajaD : j < 3 ? (j === 2 ? hex('#8a1418') : hex('#c8282a')) : (Math.round(i) + j) % 3 === 0 ? K.pajaS : K.paja); }
    for (let j = -5; j <= 5; j++) for (let i = -19; i <= 19; i++) { const d = (i / 19) ** 2 + (j / 5) ** 2; if (d < 1) pset(nx + i, ny - 4 + j, d > 0.84 ? (j > 0 ? K.pajaD : K.pajaS) : (i + j * 2 + 40) % 3 === 0 ? K.pajaS : j < 0 ? K.pajaL : K.paja); }
    for (let j = -3; j <= 3; j++) for (let i = -12; i <= 12; i++) if ((i / 12) ** 2 + (j / 3) ** 2 < 1) pset(nx + i, ny - 5 + j, j < 0 ? K.pajaD : hex('#5a4020'));
    const PH = [[-6, -7], [1, -8], [7, -6], [-2, -10], [4, -11]];
    for (let i = 0; i < n; i++) { const c = c_COLH[i]; c_huevo(R, nx + PH[i][0], ny + PH[i][1], c[0], c[1], 2, i % 2 ? 'raya' : 'puntos', hex('#fff8e8')); }
    for (let i = 0; i < 10; i++) R.linea(nx - 10 + i * 2, ny - 3, nx - 9 + i * 2, ny - 6, i % 2 ? K.pajaS : K.paja); }
  return { suelo: 158, nido: [164, 146], puerta: [93, 57, 125, 128], ventana: [26, 42, 66, 92], banco: [138, 92, 212, 128], poste: [222, 17, 232, 140], fuera: [231, 17, 319, 104], baranda: [232, 104, 319, 127] };
}

// lo de delante en la granja: la esquina de la cerca en zigzag (general) o el poste del porche con un cubo (porche)
function c_granjaDelante(R, t, o, cerca) {
  const { rect, linea, pset } = R;
  if (!cerca) {
    for (let r = 0; r < 4; r++) { const y = 150 + r * 6; linea(0, y + 8, 70, y, hex('#3e2c1e')); linea(0, y + 9, 70, y + 1, hex('#8a6a4a')); linea(0, y + 10, 70, y + 2, hex('#a8845a')); linea(0, y + 11, 70, y + 3, hex('#5a4030')); }
    rect(64, 140, 69, 180, C.k); rect(65, 140, 68, 180, hex('#6a4e34')); rect(65, 140, 65, 180, hex('#8a6a4a')); pset(66, 139, hex('#8a6a4a'));
    for (let i = 0; i < 8; i++) { const x = 6 + i * 8, s = Math.round(Math.sin(t * 2 + i) * 1); linea(x, 180, x + s, 172, c_K.hoja); linea(x + 2, 180, x + 2 + s, 174, c_K.hojaL); }
    return;
  }
  rect(0, 0, 9, 180, C.k); rect(1, 0, 8, 180, hex('#e8e0c8')); rect(1, 0, 2, 180, hex('#ffffff')); rect(7, 0, 8, 180, hex('#b8b0a0'));
  rect(14, 160, 34, 180, C.k); rect(15, 161, 33, 180, hex('#8a6a44')); for (let x = 17; x < 33; x += 4) rect(x, 161, x, 180, hex('#6a4e30')); rect(15, 166, 33, 167, hex('#3a3440')); rect(15, 175, 33, 176, hex('#3a3440')); rect(15, 161, 33, 162, hex('#e8eef0'));
  linea(14, 160, 24, 150, hex('#3a3440')); linea(34, 160, 24, 150, hex('#3a3440'));
}

const c_CIELO_TARDE = ['#2e3470', '#46407e', '#6a4a88', '#9a5a86', '#d07478', '#f09a74', '#f8bc80'].map(hex);

const c_CIELO_NOCHE = ['#060920', '#0a1030', '#0e163a', '#141e46', '#1a2650', '#202e58', '#26345e'].map(hex);

const c_NUBE_TARDE = [hex('#6a3a6a'), hex('#b0687e'), hex('#f4a890')];

const c_NUBE_NOCHE = [hex('#121838'), hex('#1e2650'), hex('#36406a')];

// oscurece un búfer para la noche (salvo los colores de luz de deja) y lo enfría hacia el azul
function c_anochecer(b, deja, k = 0.62, hacia = hex('#0e1438')) { for (let i = 0; i < b.length; i++) { const c = b[i]; if (!c || deja.has(c)) continue; b[i] = c_mez(c, hacia, k); } }

// templa un búfer con la luz del atardecer (todo un poco hacia el rosa anaranjado)
function c_atardecer(b, k = 0.14, hacia = hex('#d07a6a')) { for (let i = 0; i < b.length; i++) { const c = b[i]; if (c) b[i] = c_mez(c, hacia, k); } }

const c_LUZV = [hex('#ffd060'), hex('#f8a838'), hex('#fff0a0')];

// una casita encalada con tejado de paja (x0–x1 de muro, base y1, alto a de muro); noc: ventanas encendidas; puerta: color
function c_casita(R, x0, x1, y1, a, puerta, noc, k = 0, fch = 0.78) {
  const { rect, pset, poligono, linea } = R, K = c_K, y0 = y1 - a, cx = (x0 + x1) / 2, w = x1 - x0;
  // la chimenea de piedra en el caballete
  const chx = Math.round(x0 + w * fch); rect(chx - 3, y0 - 30, chx + 3, y0 - 14, C.k); c_piedras(R, chx - 2, y0 - 29, chx + 2, y0 - 14, [K.mortero, K.piedraP, K.piedraPS, K.piedraPL, hex('#9a8e7e')], k, 3, 4); rect(chx - 4, y0 - 31, chx + 4, y0 - 30, hex('#5a5660'));
  // el muro encalado con su sombra bajo el alero y el zócalo
  rect(x0, y0, x1, y1, C.k); c_textura(R, x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f2eee4'), hex('#d8d0c0'), hex('#ffffff'), 1000 + k, 3, 0.02, 0.06);
  for (let y = y0 + 1; y < y0 + 6; y++) for (let x = x0 + 1; x < x1; x++) if (c_um(x, y) < (y0 + 6 - y) / 6) pset(x, y, hex('#b8b0a8'));
  rect(x0 + 1, y1 - 4, x1 - 1, y1 - 1, hex('#8a8a8e')); for (let x = x0 + 2; x < x1; x += 5) pset(x, y1 - 3, hex('#6a6a70'));
  // el tejado de paja: alero redondeado, haces en vertical, el caballete con su remate de varas
  const top = y0 - 22;
  poligono([[x0 - 6, y0 + 3], [x0 + 6, top], [x1 - 6, top], [x1 + 6, y0 + 3]], (x, y) => { const q = h(x, y >> 1, 1010 + k), r = (y - top) / (y0 + 3 - top); return y >= y0 + 1 ? K.pajaD : q < 0.15 ? K.pajaS : (x * 3 + (y >> 2)) % 7 === 0 ? K.pajaS : q > 0.88 || r < 0.15 ? K.pajaL : K.paja; });
  for (let x = x0 - 5; x < x1 + 6; x++) { if (h(x, 0, 1011 + k) < 0.6) pset(x, y0 + 4, K.pajaD); pset(x, y0 + 2, c_mez(K.paja, K.pajaD, 0.5)); }
  rect(x0 + 4, top - 2, x1 - 4, top + 2, K.pajaS); for (let x = x0 + 6; x < x1 - 4; x += 6) { linea(x, top + 2, x + 3, top - 1, K.pajaD); linea(x + 3, top - 1, x + 6, top + 2, K.pajaD); }
  rect(x0 + 4, top - 3, x1 - 4, top - 3, K.pajaL);
  // la puerta partida, las ventanas hondas de cuatro cristales
  const px = Math.round(cx - 5); rect(px - 1, y1 - 22, px + 11, y1, C.k); rect(px, y1 - 21, px + 10, y1 - 1, puerta); rect(px, y1 - 12, px + 10, y1 - 11, c_mez(puerta, C.k, 0.4)); for (let x = px + 3; x < px + 10; x += 3) rect(x, y1 - 21, x, y1 - 1, c_mez(puerta, C.k, 0.2)); pset(px + 8, y1 - 9, C.oro);
  rect(px - 2, y1, px + 12, y1 + 1, hex('#8a8a8e'));
  for (const vx of [x0 + Math.round(w * 0.16), x1 - Math.round(w * 0.16) - 10]) { rect(vx - 1, y0 + 8, vx + 11, y0 + 18, C.k); rect(vx, y0 + 9, vx + 10, y0 + 17, noc ? c_LUZV[0] : hex('#3a4a5a'));
    if (noc) { rect(vx, y0 + 13, vx + 10, y0 + 17, c_LUZV[1]); } else { pset(vx + 2, y0 + 10, hex('#8aa0b0')); pset(vx + 3, y0 + 11, hex('#8aa0b0')); }
    rect(vx + 5, y0 + 9, vx + 5, y0 + 17, hex('#f2eee4')); rect(vx, y0 + 13, vx + 10, y0 + 13, hex('#f2eee4')); rect(vx - 2, y0 + 18, vx + 12, y0 + 19, hex('#c8c0b0'));
    for (let i = 0; i < 4; i++) pset(vx + 1 + i * 3, y0 + 17, [hex('#d83a2a'), hex('#e8a030'), hex('#d83a2a'), hex('#a8c040')][i]); }
  return { puerta: [px, y1 - 21, px + 10, y1 - 1], chimenea: [chx, y0 - 31], ventanas: [[x0 + Math.round(w * 0.16), y0 + 9], [x1 - Math.round(w * 0.16) - 10, y0 + 9]] };
}

// un muro de piedra seca (x0–x1, de y0 a y1) con las piedras redondeadas y la albardilla de lajas de canto
function c_muroSeco(R, x0, x1, y0, y1, k = 0) {
  c_piedras(R, x0, y0 + 3, x1, y1, [hex('#4a4652'), hex('#8a8a8a'), hex('#6a6a70'), hex('#aaa8a4'), hex('#7a7e78')], 1020 + k, 5, 8);
  for (let x = x0; x <= x1; x += 2) { const a = 2 + Math.round(h(x, 0, 1021 + k) * 2); R.rect(x, y0 + 3 - a, x + 1, y0 + 3, hex('#6a6a70')); R.pset(x, y0 + 3 - a, hex('#aaa8a4')); }
  for (let x = x0; x <= x1; x++) if (h(x, 1, 1022 + k) < 0.3) R.pset(x, y0 + 4 + Math.round(h(x, 2, 1022 + k) * (y1 - y0 - 4)), hex('#5a7a3a'));
}

// la aldea (sin cielo): colinas con campos y muros, la colina de la hoguera, la iglesia de piedra con su espadaña, dos
// casitas encaladas con tejado de paja, los muros secos, el camino con charcos y el espino; noc: de noche
function c_aldeaFondo(R, noc) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  const yA = (x) => Math.round(80 + 4 * Math.sin(x * 0.022) + 2 * Math.sin(x * 0.08 + 1));
  for (let x = 0; x < 320; x++) for (let y = yA(x); y < 110; y++) pset(x, y, y === yA(x) ? hex('#8a90b0') : h(x >> 2, y >> 2, 1030) < 0.25 ? hex('#626c90') : hex('#6c769a'));
  // los prados en mosaico con sus muros de piedra (líneas claras) y setos
  const yB = (x) => Math.round(92 + 3 * Math.sin(x * 0.03 + 2));
  for (let x = 0; x < 320; x++) for (let y = yB(x); y < 130; y++) { const cx = Math.floor((x - (y - 92) * 2.2) / 38), cy = Math.floor((y - 90) / 6), q = [hex('#5e8a46'), hex('#6e9a50'), hex('#527e3e'), hex('#7a9a48')][Math.floor(h(cx, cy, 1031) * 4)];
    let c = q; if (((x - (y - 92) * 2.2) % 38 + 38) % 38 < 1 || (y - 90) % 6 === 0) c = (x + y) % 2 ? hex('#a8a8a0') : hex('#4a6a34'); if (y === yB(x)) c = hex('#8ab070'); pset(x, y, c); }
  // la colina de la hoguera, a la derecha (la hoguera la pinta el fotograma en 262, 70)
  for (let x = 168; x < 320; x++) { const d = (x - 262) / 76, y = Math.round(72 + d * d * 22 + Math.sin(x * 0.2) * 0.8); for (let yy = y; yy < 130; yy++) pset(x, yy, yy === y ? hex('#7aa05a') : h(x >> 2, yy >> 1, 1032) < 0.18 ? K.brezoS : h(x >> 1, yy >> 1, 1033) < 0.3 ? hex('#4e7a3a') : hex('#5a8644')); }
  for (let x = 200; x < 300; x += 3) { const d = (x - 262) / 76, y = Math.round(72 + d * d * 22); if (h(x, 0, 1034) < 0.5) { pset(x, y + 6, K.brezo); pset(x + 1, y + 7, K.brezoS); } }
  // los prados de delante y el verde general
  c_hierba(R, 0, 118, 319, 179, [hex('#2a4a22'), hex('#3e6a30'), hex('#4a7a38'), hex('#6a9a4a')], 1035);
  // la iglesia de piedra: el hastial con la espadaña y su cruz, la nave con tejado de pizarra y ventanas en arco
  c_tejado(R, [[42, 94], [50, 82], [102, 82], [106, 94]], [hex('#4a5060'), hex('#363a48'), hex('#6a7080'), hex('#262a36')], 21, 3, 4);
  c_piedras(R, 44, 94, 102, 128, [hex('#6a6668'), hex('#9a968e'), hex('#76726e'), hex('#b4b0a6'), hex('#8a8a86')], 22, 5, 9);
  for (let y = 94; y < 99; y++) for (let x = 44; x <= 102; x++) if (c_um(x, y) < (99 - y) / 5) pset(x, y, c_mez(R.pget(x, y), C.k, 0.4));
  for (const wx of [56, 72, 88]) { rect(wx - 3, 101, wx + 3, 116, C.k); disco(wx, 102, 3.2, C.k); rect(wx - 2, 102, wx + 2, 116, noc ? c_LUZV[0] : hex('#c89a50')); disco(wx, 102, 2.2, noc ? c_LUZV[0] : hex('#c89a50')); rect(wx - 2, 110, wx + 2, 116, noc ? c_LUZV[1] : hex('#a87a3a')); rect(wx, 101, wx, 116, hex('#5a5658')); rect(wx - 2, 108, wx + 2, 108, hex('#5a5658')); rect(wx - 4, 117, wx + 4, 118, hex('#b4b0a6')); }
  poligono([[16, 92], [31, 68], [46, 92]], hex('#4a4652')); c_piedras(R, 18, 92, 44, 128, [hex('#6a6668'), hex('#a8a49c'), hex('#84807a'), hex('#c4c0b6'), hex('#94948e')], 23, 5, 8);
  poligono([[18, 92], [31, 70], [44, 92]], (x, y) => { const q = h(x >> 1, y >> 1, 1036); return q < 0.2 ? hex('#84807a') : q > 0.8 ? hex('#c4c0b6') : hex('#a8a49c'); }); linea(16, 92, 31, 68, hex('#c4c0b6')); linea(31, 68, 46, 92, hex('#5a5658'));
  rect(27, 58, 35, 70, C.k); rect(28, 59, 34, 70, hex('#a8a49c')); rect(29, 61, 33, 67, hex('#2a2430')); rect(26, 57, 36, 58, hex('#c4c0b6')); rect(31, 50, 31, 56, hex('#c4c0b6')); rect(29, 52, 33, 52, hex('#c4c0b6')); pset(30, 51, hex('#c4c0b6')); pset(32, 51, hex('#c4c0b6')); pset(30, 53, hex('#c4c0b6')); pset(32, 53, hex('#c4c0b6'));
  rect(25, 104, 37, 128, C.k); disco(31, 105, 6, C.k); rect(26, 105, 36, 128, hex('#5a3a2a')); disco(31, 105, 5, hex('#5a3a2a')); for (let x = 28; x < 36; x += 3) rect(x, 101, x, 128, hex('#3e2618')); pset(34, 117, C.oro);
  if (noc) for (let x = 27; x < 36; x++) pset(x, 127, c_LUZV[1]);
  // el muro del atrio con la puerta de hierro
  c_muroSeco(R, 6, 108, 124, 134, 3); rect(22, 125, 40, 134, hex('#3e4a3a')); for (let x = 23; x < 40; x += 3) rect(x, 125, x, 134, hex('#2a2a32')); rect(22, 128, 40, 128, hex('#2a2a32'));
  // las dos casitas
  c_casita(R, 116, 178, 134, 32, hex('#b82a2a'), noc, 1);
  c_casita(R, 202, 254, 136, 28, hex('#2a5aa0'), noc, 2, 0.24);
  // los muros secos a los lados del camino
  c_muroSeco(R, 108, 116, 128, 140, 4); c_muroSeco(R, 178, 202, 128, 140, 5); c_muroSeco(R, 254, 319, 130, 141, 6);
  // el espino con bayas rojas y hojas de otoño (el tronco; la copa, en el fotograma)
  rect(294, 94, 298, 141, C.k); rect(295, 94, 297, 141, hex('#4a3a34')); linea(296, 106, 284, 92, hex('#4a3a34')); linea(297, 100, 308, 88, hex('#4a3a34')); linea(296, 112, 312, 104, hex('#4a3a34'));
  // el camino de tierra con roderas, charcos que reflejan el cielo y la franja de hierba del centro
  for (let y = 141; y < 180; y++) { const a = Math.round(40 - (y - 141) * 1.0), b = Math.round(300 + (y - 141) * 0.6); for (let x = Math.max(0, a); x < Math.min(320, b); x++) { const q = h(x >> 1, y >> 1, 1037); R.buf[y * 320 + x] = q < 0.2 ? hex('#5a4634') : q > 0.85 ? hex('#8a7058') : hex('#705a44'); } }
  for (let i = 0; i < 60; i++) { const x = Math.round(30 + h(i, 1, 1041) * 270), y = 143 + Math.round(h(i, 2, 1041) * 36); if (i % 3) { pset(x, y, hex('#9a8a7a')); pset(x + 1, y, hex('#7a6a5a')); pset(x, y - 1, hex('#b8a898')); } else { pset(x, y, [hex('#c86a2a'), hex('#e8a040'), hex('#a8402a')][i % 3 === 0 ? (i >> 2) % 3 : 0]); pset(x + 1, y + 1, hex('#a8402a')); } }
  for (let y = 142; y < 180; y++) { const u2 = (y - 141) / 39; for (const [xa, xb] of [[128, 92], [140, 128], [176, 214], [188, 250]]) { const x = Math.round(xa + (xb - xa) * u2); pset(x, y, hex('#4a3a2c')); if (u2 > 0.4) pset(x + 1, y, hex('#4a3a2c')); pset(x - 1, y, hex('#8a7058')); } }
  for (let y = 142; y < 180; y++) for (let x = 150 + Math.round((y - 142) * 0.1); x < 162 + Math.round((y - 142) * 0.25); x++) if (h(x, y, 1038) < 0.7) pset(x, y, h(x, y, 1039) < 0.4 ? hex('#4a7a38') : hex('#3e6a30'));
  for (const [cx2, cy2, rx] of [[96, 160, 14], [222, 170, 18], [270, 150, 9]]) for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) if ((i / (rx + 0.5)) ** 2 + (j / 3.5) ** 2 < 1) pset(cx2 + i, cy2 + j, noc ? (j < 0 ? hex('#26345e') : hex('#1a2650')) : j < 0 ? hex('#f0a07a') : j < 2 ? hex('#c8707a') : hex('#8a5a80'));
  // helechos secos junto a los muros
  for (let i = 0; i < 30; i++) { const x = Math.round(h(i, 1, 1040) * 320), y = 139 + Math.round(h(i, 2, 1040) * 3); linea(x, y, x - 2, y - 4, K.brezo); linea(x, y, x + 2, y - 4, K.brezoS); pset(x, y - 5, K.brezo); }
}

// la hoguera de la colina, de cerca (sin cielo): el valle lejano con las luces del pueblo y la cima de hierba
function c_cimaFondo(R, noc) {
  const { rect, pset, disco, linea } = R;
  for (let x = 0; x < 320; x++) { const y = Math.round(92 + 5 * Math.sin(x * 0.02 + 1) + 2 * Math.sin(x * 0.07)); for (let yy = y; yy < 130; yy++) pset(x, yy, yy === y ? hex('#7a7aa0') : hex('#5e6488')); }
  for (let x = 0; x < 320; x++) { const y = Math.round(104 + 3 * Math.sin(x * 0.04 + 3)); for (let yy = y; yy < 130; yy++) pset(x, yy, yy === y ? hex('#5a7a5a') : h(x >> 2, yy >> 1, 1050) < 0.3 ? hex('#3e5a40') : hex('#46644a')); }
  // el río que brilla en el valle
  for (let x = 0; x < 320; x++) { const y = Math.round(112 + Math.sin(x * 0.03) * 2); pset(x, y, noc ? hex('#3a4a7a') : hex('#e8a080')); if (x % 3) pset(x, y + 1, noc ? hex('#26345e') : hex('#b0707a')); }
  // la cima: hierba con matas, piedras y un menhir
  for (let x = 0; x < 320; x++) { const y = Math.round(118 + ((x - 160) / 160) ** 2 * 8); for (let yy = y; yy < 180; yy++) { const q = h(x >> 1, yy >> 1, 1051); R.buf[yy * 320 + x] = yy === y ? hex('#6a9a4a') : q < 0.18 ? hex('#2e4e26') : q > 0.86 ? hex('#5a8a44') : h(x, yy, 1052) < 0.12 ? c_K.brezoS : hex('#3e6a32'); } }
  // las piedras planas (con musgo) donde se sientan los músicos, y otras más pequeñas
  for (const [x, y, r] of [[34, 146, 9], [286, 152, 10], [228, 130, 4], [96, 131, 3]]) { const ry = Math.max(2, Math.round(r * 0.55));
    for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = (i / (r + 0.5)) ** 2 + (j / (ry + 0.5)) ** 2; if (d > 1.1 || j > ry) continue; const q = h(x + i, y + j, 1054);
      pset(x + i, y + j, d > 0.85 ? C.k : j > ry * 0.4 ? hex('#5a5a62') : (i + j) < -r * 0.4 ? hex('#a8a8ac') : q < 0.15 ? hex('#5a7a3a') : q > 0.85 ? hex('#6a6a72') : hex('#86868c')); } }
  // el menhir, con vetas, grietas y líquenes
  rect(262, 96, 274, 136, C.k); for (let y = 97; y <= 136; y++) for (let x = 263; x <= 273; x++) { const q = h(x >> 1, y >> 1, 1055); pset(x, y, x < 266 ? hex('#a8a8b0') : x > 270 ? hex('#6a6a72') : q < 0.15 ? hex('#6e6e76') : q > 0.88 ? hex('#9a9aa2') : hex('#8a8a90')); }
  for (let y = 99; y < 136; y += 4) { pset(264 + (y % 5), y, hex('#c8c8a0')); pset(268 + (y % 3), y + 2, hex('#7a9a5a')); } R.linea(268, 104, 270, 118, hex('#5a5a62')); pset(263, 96, hex('#a8a8b0')); rect(263, 95, 270, 96, hex('#8a8a90'));
  for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 1053) * 320), y = 130 + Math.round(h(i, 2, 1053) * 48); linea(x, y, x - 1, y - 3, hex('#5a8a44')); linea(x + 1, y, x + 2, y - 3, hex('#4a7a38')); }
}

// el fuego grande de la hoguera (x: centro, base y; s: tamaño) con los troncos cruzados, las brasas y las chispas
function c_fuego(R, x, y, s, t) {
  const { rect, linea, pset } = R;
  for (const [x0, y0, x1, y1] of [[-22, 0, 10, -14], [22, 0, -10, -14], [-18, -2, 18, -2], [-8, 0, 4, -20], [8, 0, -4, -20]]) for (let d = -2; d <= 2; d++) linea(x + x0 * s, y + y0 * s + d, x + x1 * s, y + y1 * s + d, d === -2 ? hex('#8a5a3a') : d === 2 ? hex('#2a1a12') : hex('#5a3a24'));
  for (const [dx, a, w, k] of [[-10, 26, 9, 0], [10, 24, 9, 1], [0, 40, 12, 2], [-4, 30, 8, 3], [6, 32, 7, 4]]) c_llama(R, x + dx * s, y - 2 * s, w * s, a * s, t, k);
  for (let i = 0; i < 14; i++) if (Math.sin(t * 7 + i * 1.9) > 0) pset(x - 18 * s + i * 2.6 * s, y - 1 + (i % 3), i % 2 ? c_K.brasa : c_K.fuegoL);
  for (let i = 0; i < 18 * s; i++) { const u = ((t * 0.55 + h(i, 1, 1060)) % 1), sx = x + (h(i, 2, 1060) - 0.5) * 24 * s + Math.sin(t * 3 + i) * 4 - u * 12 * s, sy = y - 20 * s - u * 70 * s; if (sy < 50 && sx > 270) continue; pset(Math.round(sx), Math.round(sy), u < 0.5 ? c_K.fuegoL : u < 0.8 ? c_K.fuego : c_K.fuegoS); }
}

// un bailarín pequeño de silueta (de fondo, 11 px) que salta y mueve los brazos, con el borde iluminado por el fuego
function c_bailarin(R, x, suelo, t, k, borde) {
  const s = Math.max(0, Math.sin(t * 6 + k * 1.3)), y = Math.round(suelo - s * 2), b = Math.sin(t * 6 + k * 1.3) > 0;
  const ropa = [hex('#6a2a3a'), hex('#2a4a6a'), hex('#4a5a2a'), hex('#6a4a2a'), hex('#5a2a5a')][k % 5], c = c_mez(ropa, hex('#f08a28'), 0.25), cS = c_mez(ropa, C.k, 0.45), piel = hex('#d89a70'), pelo = [hex('#3a2418'), hex('#c86a2a'), hex('#e8c878'), hex('#2a2024')][k % 4];
  R.rect(x - 1, y - 10, x + 1, y - 8, piel); R.rect(x - 1, y - 11, x + 1, y - 11, pelo); R.pset(x - 2 * borde, y - 10, pelo);
  R.rect(x - 2, y - 7, x + 2, y - 3, c); R.rect(x - 2 * borde, y - 7, x - 2 * borde, y - 3, cS); R.pset(x - 1, y - 2, cS); R.pset(x + 1, y - 2, cS); R.pset(x - 1 - (b ? 1 : 0), y - 1, hex('#2a1a14')); R.pset(x + 1 + (b ? 1 : 0), y - 1, hex('#2a1a14'));
  R.linea(x - 2, y - 7, x - 4, y - (b ? 10 : 5), c); R.linea(x + 2, y - 7, x + 4, y - (b ? 5 : 10), c); R.pset(x - 4, y - (b ? 10 : 5), piel); R.pset(x + 4, y - (b ? 5 : 10), piel);
  R.pset(x + borde, y - 9, hex('#ffd890'));
}

function c_aldea(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K, u = Math.max(0, Math.min(1, o.noche ?? (cerca ? 0.75 : 0)));
  const deja = new Set([...c_LUZV, c_K.luz, c_K.luzL]);
  const capas = (cl, dib) => { const d = c_capa(R, cl + '-d', () => { dib(false); c_atardecer(R.buf); }), n = c_capa(R, cl + '-n', () => { dib(true); c_anochecer(R.buf, deja); }); return [d, n]; };
  // el cielo del atardecer y el de la noche, mezclados con trama; el sol que se pone, la luna y las estrellas
  const [cd, cn] = [c_capa(R, 'ald-cielo-d' + cerca, () => { c_grad(R, 0, 0, 319, 180, c_CIELO_TARDE); R.halo(cerca ? 220 : 104, cerca ? 100 : 86, 40, [hex('#f8a878'), hex('#fcc088'), hex('#ffd898')], 1.1); R.disco(cerca ? 220 : 104, cerca ? 100 : 86, 8, hex('#ffd890')); R.disco(cerca ? 220 : 104, cerca ? 100 : 86, 6, hex('#fff0c0')); }),
    c_capa(R, 'ald-cielo-n' + cerca, () => c_grad(R, 0, 0, 319, 180, c_CIELO_NOCHE))];
  b_mezclaCapas(R, 'ald-cielo' + cerca, cd, cn, u, false);
  if (u > 0.3) c_estrellas(R, t, 90, cerca ? 3 : 1, (u - 0.3) / 0.7);
  if (u > 0.45) c_luna(R, cerca ? 66 : 214, cerca ? 34 : 30, 7, c_CIELO_NOCHE[0]);
  const nubes = u < 0.5 ? c_NUBE_TARDE : c_NUBE_NOCHE;
  c_nubes(R, t, [[20, 58, 18, 0.7], [180, 62, 14, 0.5]], nubes); c_nubes(R, t, [[90, 38, 30, 1.4], [240, 48, 24, 1.2]], nubes); c_nubes(R, t, [[150, cerca ? 30 : 24, 40, 2.4]], nubes);
  if (u < 0.6) c_aves(R, t, 4, 30, 66, 5, hex('#1e1626'), 11);
  else if (cerca) b_murcielagos(R, t, 3, 46, 84);
  if (!cerca) {
    const [fd, fn] = capas('ald', (noc) => c_aldeaFondo(R, noc)); b_mezclaCapas(R, 'ald', fd, fn, u, true);
    // la niebla que se arrastra por el valle
    for (let i = 0; i < 5; i++) { const x = ((h(i, 1, 1065) * 400 + t * (2 + i % 3)) % 400) - 40, y = 99 + (i % 3) * 5; c_resplandor(R, x, y, 34 + (i % 2) * 14, u < 0.5 ? hex('#e8c8c8') : hex('#3a4470'), 0.32, 3.5); }
    // la hoguera de la colina con su resplandor y la gente pequeña que baila alrededor
    c_resplandor(R, 262, 70, 22, K.fuego, 0.25 + u * 0.2, 12);
    for (let i = 0; i < 6; i++) { const a = t * 0.8 + i * Math.PI / 3, bx = Math.round(262 + Math.cos(a) * 10), by = Math.round(72 + Math.sin(a) * 2), sal = Math.sin(t * 7 + i) > 0.3 ? 1 : 0; if (Math.sin(a) < 0) { rect(bx, by - 5 - sal, bx + 1, by - sal, hex('#1e1620')); pset(bx, by - 6 - sal, hex('#1e1620')); } }
    c_llama(R, 260, 72, 3, 8, t, 0); c_llama(R, 264, 72, 3, 9, t, 1); rect(257, 72, 267, 73, hex('#3a2418'));
    for (let i = 0; i < 6; i++) { const a = t * 0.8 + i * Math.PI / 3, bx = Math.round(262 + Math.cos(a) * 10), by = Math.round(72 + Math.sin(a) * 2), sal = Math.sin(t * 7 + i) > 0.3 ? 1 : 0; if (Math.sin(a) >= 0) { rect(bx, by - 5 - sal, bx + 1, by - sal, hex('#1e1620')); pset(bx, by - 6 - sal, hex('#1e1620')); pset(bx + 1, by - 4 - sal, K.fuego); } }
    for (let i = 0; i < 8; i++) { const v = ((t * 0.5 + i / 8) % 1); pset(Math.round(262 + Math.sin(t * 3 + i) * 3 - v * 8), Math.round(66 - v * 26), v < 0.5 ? K.fuegoL : K.fuegoS); }
    // el humo de turba de las chimeneas
    const humo = u < 0.5 ? [hex('#b8a0b0'), hex('#d8c0c8'), hex('#9a8498')] : [hex('#3a4064'), hex('#4a5076'), hex('#2e3456')];
    c_humo(R, 164, 69, t, 0, humo, 24, -0.7); c_humo(R, 214, 77, t, 3, humo, 22, -0.7);
    // las velas de Todos los Santos que tiemblan en las ventanas de la iglesia
    for (const wx of [56, 72, 88]) { const f = Math.sin(t * 9 + wx) > 0.2; pset(wx - 1, 112, f ? K.luzL : K.luz); pset(wx + 1, 113, f ? K.luz : K.luzL); pset(wx - 1, 111, K.luzL); pset(wx + 1, 112, K.luzL); }
    // la copa del espino con hojas de otoño y bayas, que se mece; las hojas que vuelan
    const m = Math.round(Math.sin(t * 1.1) * 1);
    c_copa(R, 298, 88, [[0, 0, 11], [-12, 4, 8], [11, 2, 9], [-4, -8, 8], [6, -7, 7]], u < 0.5 ? [hex('#4a2a1a'), hex('#8a4a22'), hex('#c07030'), hex('#e8a848')] : [hex('#141026'), hex('#2a2238'), hex('#3a2e44'), hex('#4a3a4e')], m);
    for (let i = 0; i < 18; i++) pset(Math.round(298 + m + (h(i, 1, 1070) - 0.5) * 30), Math.round(88 + (h(i, 2, 1070) - 0.5) * 18), u < 0.5 ? hex('#d8202a') : hex('#6a1a2a'));
    c_caen(R, t, 12, 160, 320, 90, 175, u < 0.5 ? [hex('#c86a2a'), hex('#e8a040'), hex('#a8402a')] : [hex('#4a2e3a'), hex('#5a3a3a')], 2, 10);
    // las ovejas del prado lejano (de día) y el búho del espino (de noche)
    if (u < 0.7) for (let i = 0; i < 4; i++) { const x = Math.round(30 + i * 22 + Math.sin(t * 0.15 + i) * 4), y = 106 + (i % 2) * 3; rect(x, y - 2, x + 3, y, u < 0.4 ? hex('#f0ece4') : hex('#8a8aa0')); pset(x + (Math.sin(t * 0.15 + i) > 0 ? 4 : -1), y - 2, hex('#2a2428')); }
    if (u > 0.5) { const ab = Math.sin(t * 0.7) > 0.8; rect(286, 82, 289, 87, hex('#5a4a3a')); pset(287, 83, ab ? hex('#5a4a3a') : hex('#f0d040')); pset(288, 83, hex('#f0d040')); pset(286, 81, hex('#5a4a3a')); pset(289, 81, hex('#5a4a3a')); }
    // las linternas de nabo encendidas en la albardilla y en el alféizar (de noche)
    if (u > 0.4) for (const [x, y, k] of [[104, 123, 0], [190, 124, 1], [128, 114, 2]]) c_calabaza(R, x, y, 5, t, true, k, true);
    return { suelo: 158, camino: [40, 141, 300, 180], iglesia: [16, 50, 106, 128], puertaIglesia: [26, 100, 36, 128], ventanasIglesia: [[56, 101], [72, 101], [88, 101]], casitas: [[116, 178, 134], [202, 254, 136]], puertas: [[140, 113, 150, 133], [222, 115, 232, 135]], hoguera: [262, 72], muros: [108, 128, 319, 141], nabos: [[104, 124], [190, 125], [128, 115]], espino: [298, 88] };
  }
  // la hoguera de cerca
  const [fd, fn] = capas('cima', (noc) => c_cimaFondo(R, noc)); b_mezclaCapas(R, 'cima', fd, fn, u, true);
  // las luces del pueblo en el valle, que titilan (de noche)
  if (u > 0.3) for (let i = 0; i < 16; i++) { const x = Math.round(20 + h(i, 1, 1080) * 280), y = 104 + Math.round(h(i, 2, 1080) * 8); if (Math.sin(t * 2 + i * 3) > -0.5) pset(x, y, i % 3 ? K.luz : K.luzL); }
  // el resplandor del fuego sobre la hierba y el humo que se va a la izquierda
  c_resplandor(R, 160, 142, 104, K.fuego, 0.18 + u * 0.2, 40);
  for (let i = 0; i < 7; i++) { const v = ((t * 0.18 + i / 7) % 1), r = 4 + v * 10, sx = 156 - v * 80 + Math.sin(t + i) * 3, sy = 92 - v * 46; c_resplandor(R, sx, sy, r, u < 0.5 ? hex('#a88a9a') : hex('#3a3858'), 0.5 * (1 - v * 0.6), r * 0.8); }
  // la gente pequeña que baila detrás del fuego, el violinista y el del tambor
  for (let i = 0; i < 9; i++) { const x = 92 + i * 17, b = x < 160 ? 1 : -1; c_bailarin(R, x, 134 + (i % 2), t, i, b); }
  c_fuego(R, 160, 148, 1.15, t);
  // el violinista sentado en la piedra de la derecha y el del tambor en la de la izquierda
  { const x = 286, y = 145; rect(x - 2, y - 9, x + 2, y - 4, hex('#3a5a3a')); disco(x, y - 11, 2, hex('#e8b890')); rect(x - 2, y - 14, x + 2, y - 13, hex('#3a3440')); rect(x - 3, y - 4, x + 3, y - 2, hex('#3a3440'));
    rect(x - 5, y - 9, x - 3, y - 7, hex('#8a4a22')); const a = Math.round(Math.sin(t * 8) * 3); R.linea(x - 8 + a, y - 6, x + a, y - 11, hex('#d8c8a0')); pset(x - 3, y - 10, hex('#e8b890')); }
  { const x = 34, y = 139; rect(x - 2, y - 9, x + 2, y - 4, hex('#6a2a2a')); disco(x, y - 11, 2, hex('#e8b890')); rect(x - 1, y - 14, x + 1, y - 13, hex('#c8a040')); rect(x - 3, y - 4, x + 3, y - 2, hex('#3a3440'));
    R.disco(x + 5, y - 7, 4, hex('#e8dcc0')); R.disco(x + 5, y - 7, 3, hex('#d8c8a8')); pset(x + 4, y - 8, hex('#f8f0e0')); const g = Math.sin(t * 10) > 0 ? 0 : 1; R.linea(x + 1, y - 9 + g, x + 4, y - 7 + g, hex('#5a3a24')); }
  return { suelo: 160, hoguera: [160, 148], llamas: [130, 96, 190, 148], bailarines: [92, 134, 228, 134], violinista: [286, 145], tambor: [34, 139], menhir: [262, 96, 274, 136], libres: [[56, 124], [196, 256]] };
}
// lo de delante en la aldea: el muro de piedra seca de abajo a la derecha con helechos (general) o matas y una piedra
// abajo a la izquierda (hoguera); con o.noche se oscurece igual que el decorado
function c_aldeaDelante(R, t, o, cerca) {
  const u = Math.max(0, Math.min(1, o.noche ?? (cerca ? 0.75 : 0))), noc = u > 0.5;
  const b = c_capa(R, 'ald-del-' + (cerca ? 'c' : 'g') + (noc ? 'n' : 'd'), () => {
    if (!cerca) { c_muroSeco(R, 224, 319, 156, 180, 9); for (let i = 0; i < 14; i++) { const x = 226 + i * 7, y = 158; R.linea(x, y, x - 3, y - 6, c_K.brezo); R.linea(x, y, x + 3, y - 6, c_K.brezoS); R.linea(x, y, x, y - 8, c_K.brezo); } }
    else { for (let j = 0; j < 4; j++) for (let i = 0; i < 4 - (j > 1 ? 1 : 0); i++) { const x = 4 + i * 9 + (j % 2) * 4, y = 176 - j * 6; R.disco(x, y, 3.5, C.k); R.disco(x, y, 3, hex('#8a5a3a')); R.disco(x, y, 1.5, hex('#c89a6a')); R.pset(x, y, hex('#6a4028')); R.pset(x + 2, y - 2, c_K.fuego); } for (let i = 0; i < 12; i++) { const x = 30 + i * 4; R.linea(x, 180, x - 2, 168 + (i % 3) * 2, hex('#3e6a32')); R.linea(x + 1, 180, x + 2, 170, hex('#5a8a44')); } for (let i = 0; i < 10; i++) { const x = 284 + i * 4; R.linea(x, 180, x - 1, 170 + (i % 3) * 2, hex('#3e6a32')); } }
    if (noc) c_anochecer(R.buf, new Set([c_K.fuego]), cerca ? 0.4 : 0.62); else c_atardecer(R.buf);
  });
  c_pegar(R, b);
}

const c_CIELO_NUBLADO = ['#3e3e62', '#4c4a6e', '#5e5a7a', '#746e88', '#8c8496', '#a49aa2', '#b8aca8'].map(hex);

const c_NUBE_NIEVE = [hex('#4a4862'), hex('#626078'), hex('#7e788e')];

// una casa de madera de dos plantas con porche (x0–x1, base y1): tablilla, tejado a dos aguas con nieve, ventanas
// encendidas, el porche con sus postes y escalones; devuelve la geometría
function c_casaMadera(R, x0, x1, y1, pared, tejado, puerta, k = 0) {
  const { rect, pset, poligono, linea } = R, K = c_K, cx = Math.round((x0 + x1) / 2), w = x1 - x0, y0 = y1 - 66, pico = y0 - Math.round(w * 0.3);
  const [p, pS, pL, pD] = pared;
  // la chimenea de ladrillo
  const chx = cx + Math.round(w * 0.22); rect(chx - 3, pico + 6, chx + 3, pico + 22, C.k); rect(chx - 2, pico + 7, chx + 2, pico + 22, C.ladrillo); for (let y = pico + 9; y < pico + 22; y += 3) rect(chx - 2, y, chx + 2, y, C.ladrilloS); rect(chx - 4, pico + 5, chx + 4, pico + 6, hex('#5a5a62')); rect(chx - 3, pico + 4, chx + 3, pico + 4, K.nieve);
  // el hastial de tablilla y el tejado de tejuelas con la nieve en el borde
  rect(x0 + 4, y0, x1 - 4, y1, C.k); c_tablilla(R, x0 + 5, y0, x1 - 5, y1 - 1, pared, k, 4);
  poligono([[x0 + 5, y0 + 1], [cx, pico + 3], [x1 - 5, y0 + 1]], (x, y) => { const r = (y - pico) % 4; return r === 3 ? pD : r === 0 ? pL : p; });
  for (let d = 0; d < 5; d++) { linea(x0 - 2 + d, y0 + 2 - d * 0, cx, pico - 2 + d, d < 2 ? K.nieve : d < 3 ? K.nieveS : tejado[1]); linea(cx, pico - 2 + d, x1 + 2 - d, y0 + 2, d < 2 ? K.nieve : d < 3 ? K.nieveS : tejado[1]); }
  linea(x0 - 3, y0 + 3, cx, pico - 3, C.k); linea(cx, pico - 3, x1 + 3, y0 + 3, C.k); for (let x = x0; x < x1; x += 3) if (h(x, 1, 1100 + k) < 0.5) pset(x, y0 + 3 + Math.round(h(x, 2, 1100 + k)), K.nieveL);
  // la ventana del desván, encendida
  c_ventana(R, cx - 6, pico + 16, cx + 6, pico + 28, 2, 2, hex('#3a4a6a'), [hex('#f0ece0'), hex('#8a8478')], K.luz);
  // las ventanas de arriba y de abajo (encendidas, con visillo) y la puerta
  for (const vx of [x0 + 12, x1 - 28]) { c_ventana(R, vx, y0 + 6, vx + 15, y0 + 24, 2, 2, hex('#3a4a6a'), [hex('#f0ece0'), hex('#8a8478')], K.luz); rect(vx + 1, y0 + 7, vx + 3, y0 + 23, hex('#f8ead0')); rect(vx + 12, y0 + 7, vx + 14, y0 + 23, hex('#f8ead0')); rect(vx - 2, y0 + 25, vx + 17, y0 + 26, hex('#f0ece0')); rect(vx - 2, y0 + 25, vx + 17, y0 + 25, K.nieve); }
  const pv = x0 + 10; c_ventana(R, pv, y1 - 28, pv + 16, y1 - 10, 2, 2, hex('#3a4a6a'), [hex('#f0ece0'), hex('#8a8478')], K.luz); rect(pv + 1, y1 - 27, pv + 15, y1 - 24, hex('#f8ead0'));
  const px = x1 - 26; rect(px - 1, y1 - 30, px + 14, y1, hex('#f0ece0')); rect(px, y1 - 29, px + 13, y1, C.k); rect(px + 1, y1 - 28, px + 12, y1, puerta); rect(px + 3, y1 - 26, px + 10, y1 - 18, K.luz); rect(px + 6, y1 - 26, px + 6, y1 - 18, puerta); for (const yy of [y1 - 14, y1 - 7]) rect(px + 3, yy, px + 10, yy + 4, c_mez(puerta, C.k, 0.25)); pset(px + 11, y1 - 13, C.oro);
  // el tejadillo del porche con nieve, los postes, el suelo del porche y los escalones
  const yp = y1 - 36; poligono([[x0, yp + 6], [x0 + 4, yp], [x1 - 4, yp], [x1, yp + 6]], (x, y) => ((y - yp) % 2 ? tejado[1] : tejado[0])); rect(x0, yp - 1, x1, yp, K.nieve); for (let x = x0; x <= x1; x += 2) pset(x, yp - 2 + (h(x, 3, 1101 + k) < 0.5 ? 1 : 0), K.nieveL);
  rect(x0, yp + 6, x1, yp + 7, hex('#f0ece0'));
  for (const sx of [x0 + 1, cx - 1, x1 - 4]) { rect(sx, yp + 7, sx + 3, y1, hex('#f0ece0')); rect(sx + 3, yp + 7, sx + 3, y1, hex('#b8b0a0')); }
  rect(x0, y1 - 2, x1, y1 + 1, hex('#8a7a62')); rect(x0, y1 - 2, x1, y1 - 2, hex('#a8987c'));
  for (let x = x0 + 4; x < x1; x += 4) if (x < px - 5 || x > px + 15) { rect(x, y1 - 12, x + 1, y1 - 3, hex('#f0ece0')); } rect(x0, y1 - 13, px - 4, y1 - 12, hex('#f0ece0')); rect(x0, y1 - 14, px - 4, y1 - 14, K.nieve);
  return { puerta: [px + 1, y1 - 28, px + 12, y1], ventanaBaja: [pv, y1 - 28, pv + 16, y1 - 10], chimenea: [chx, pico + 4], porche: [x0, yp, x1, y1] };
}

// la calle de 1927 (sin cielo): bosque de pinos nevados, el campanario, las dos casas de madera, la imprenta de
// ladrillo con su escaparate (la prensa la pinta el fotograma), la acera de tablas y la calle de barro con nieve
function c_calle27Fondo(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  // los pinos nevados de la colina
  for (let x = 0; x < 320; x++) { const y = Math.round(86 + 4 * Math.sin(x * 0.03)); for (let yy = y; yy < 140; yy++) pset(x, yy, yy < y + 2 ? hex('#c8ccd8') : hex('#8a92a8')); }
  for (let i = 0; i < 46; i++) { const x = Math.round(i * 7.1 + h(i, 1, 1110) * 4), b = 92 + Math.round(h(i, 2, 1110) * 6), a = 12 + Math.round(h(i, 3, 1110) * 10);
    for (let j = 0; j < a; j++) { const w = Math.round(j * 0.35) + 1; for (let ii = -w; ii <= w; ii++) pset(x + ii, b - a + j, (j % 4 === 0 && ii < 0) ? hex('#e4e8f0') : ii > w / 2 ? hex('#2a3a44') : hex('#3a4a52')); } }
  // el campanario blanco detrás de la imprenta
  rect(154, 52, 166, 90, hex('#e8e4e0')); rect(163, 52, 166, 90, hex('#b8b4b8')); rect(157, 58, 163, 66, hex('#3a3444')); poligono([[152, 53], [160, 36], [168, 53]], hex('#5a5a6e')); linea(152, 53, 159, 37, K.nieve); linea(153, 53, 160, 38, K.nieve); rect(160, 30, 160, 35, hex('#2a2a32')); rect(158, 32, 162, 32, hex('#2a2a32'));
  // las dos casas de madera
  c_casaMadera(R, -2, 104, 134, [hex('#a8c0a8'), hex('#8aa48a'), hex('#c4d8c4'), hex('#6a846a')], [hex('#4a4a56'), hex('#3a3a44')], hex('#7a2a2a'), 1);
  c_casaMadera(R, 214, 322, 134, [hex('#e8d8a8'), hex('#c8b888'), hex('#f8ecc4'), hex('#a89868')], [hex('#5a4a44'), hex('#44363a')], hex('#2a4a6a'), 2);
  // la imprenta: fachada de ladrillo con el remate escalonado y la cornisa, el letrero con el pictograma, el escaparate y la puerta
  rect(108, 58, 210, 134, C.k);
  for (let y = 59; y < 134; y++) for (let x = 109; x < 210; x++) { const f = Math.floor((y - 59) / 3), r = (y - 59) % 3, xx = x + (f % 2) * 4; R.buf[y * 320 + x] = r === 2 || xx % 8 === 0 ? hex('#7a3a2e') : h(xx >> 3, f, 1111) < 0.2 ? C.ladrilloS : h(xx >> 3, f, 1112) > 0.85 ? C.ladrilloL : C.ladrillo; }
  poligono([[108, 59], [108, 54], [140, 54], [140, 50], [178, 50], [178, 54], [210, 54], [210, 59]], hex('#7a3a2e')); rect(140, 49, 178, 50, K.nieve); rect(108, 53, 140, 53, K.nieve); rect(178, 53, 210, 53, K.nieve);
  rect(106, 58, 212, 62, hex('#d8d0c0')); rect(106, 62, 212, 63, hex('#8a8478')); rect(106, 57, 212, 57, K.nieve);
  rect(118, 66, 200, 82, C.k); rect(119, 67, 199, 81, hex('#2a3a2e')); rect(120, 68, 198, 68, hex('#c8a040')); rect(120, 80, 198, 80, hex('#c8a040'));
  // el pictograma del letrero: un pliego con renglones, un rodillo y la gota de tinta
  rect(128, 70, 140, 79, hex('#f0ece0')); for (let y = 72; y < 79; y += 2) rect(130, y, 138, y, hex('#8a8478')); rect(146, 72, 166, 76, hex('#c8a040')); rect(146, 72, 166, 72, hex('#f0d878')); rect(166, 73, 172, 74, hex('#c8a040')); disco(184, 75, 3, hex('#1a1a22')); R.poligono([[181, 75], [184, 69], [187, 75]], hex('#1a1a22')); pset(183, 74, hex('#6a6a7a'));
  // el escaparate (la prensa y el impresor, en el fotograma) y el zócalo
  rect(114, 86, 174, 128, hex('#d8d0c0')); rect(116, 88, 172, 126, 0);
  rect(178, 88, 200, 134, hex('#d8d0c0')); rect(180, 90, 198, 134, hex('#4a2e22')); rect(182, 92, 196, 110, K.luz); rect(189, 92, 189, 110, hex('#4a2e22')); rect(182, 101, 196, 101, hex('#4a2e22')); for (const yy of [114, 124]) rect(182, yy, 196, yy + 6, hex('#3a2418')); pset(195, 116, C.oro);
  rect(108, 128, 178, 134, hex('#6a5a52')); rect(108, 128, 178, 128, hex('#8a7a70'));
  // la acera de tablas con nieve en polvo y la calle de barro helado con roderas, charcos con hielo y montones de hojas
  for (let y = 134; y < 144; y++) for (let x = 0; x < 320; x++) { const r = (x + (y > 138 ? 6 : 0)) % 12; R.buf[y * 320 + x] = y === 143 ? hex('#4a3a2a') : r === 0 ? hex('#5a4630') : h(x >> 1, y, 1113) < 0.35 ? K.nieve : h(x >> 2, y, 1114) < 0.15 ? hex('#8a6e4c') : hex('#a08060'); }
  for (let y = 144; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1115), ns = Math.sin(x * 0.05 + y * 0.11) * 0.5 + Math.sin(x * 0.13 - y * 0.2 + 2) * 0.3 + h(x >> 3, y >> 2, 1116) * 0.4;
    R.buf[y * 320 + x] = ns > 0.55 ? (q < 0.15 ? K.nieveS : K.nieve) : ns > 0.45 ? (c_um(x, y) < 0.5 ? K.nieveS : hex('#7a6e66')) : q < 0.25 ? hex('#4a3e38') : q > 0.8 ? hex('#7a6a5a') : hex('#5e5048'); }
  for (const yy of [154, 160, 170, 176]) for (let x = 0; x < 320; x++) if (h(x >> 3, yy, 1117) < 0.8) { const w = R.pget(x, yy) === K.nieve; pset(x, yy, w ? K.nieveS : hex('#3a302c')); pset(x, yy + 1, w ? hex('#a8a4b0') : hex('#6a5a50')); }
  for (const [cx2, cy2, rx] of [[60, 166, 12], [232, 172, 16]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / (rx + 0.5)) ** 2 + (j / 2.5) ** 2 < 1) pset(cx2 + i, cy2 + j, (i + j * 3) % 7 === 0 ? hex('#e8f0f8') : j < 0 ? hex('#a8b8cc') : hex('#8a98b0'));
  for (const [lx, ly] of [[24, 144], [150, 145], [278, 144]]) for (let i = 0; i < 14; i++) { const x = lx + (i * 5) % 16 - 6, y = ly + (i * 3) % 4; pset(x, y, [hex('#c84a2a'), hex('#e8902a'), hex('#a8642a')][i % 3]); pset(x + 1, y, [hex('#a83a1a'), hex('#c87020')][i % 2]); if (i % 3 === 0) pset(x, y - 1, K.nieve); }
  rect(0, 144, 319, 144, hex('#8a8478'));
}

// el interior del escaparate de la imprenta (opaco, del tamaño de la pantalla): la pared con pliegos colgados, la luz
// de la lámpara y la mesa con las resmas
function c_imprentaDentro(R) {
  const { rect, pset, disco, linea } = R;
  c_grad(R, 116, 88, 172, 126, [hex('#c8a070'), hex('#b08860'), hex('#8a6a4a'), hex('#6a503a')]);
  linea(116, 92, 172, 92, hex('#4a3a2a')); for (let i = 0; i < 6; i++) { const x = 120 + i * 9; rect(x, 93, x + 6, 104, hex('#f0ece0')); for (let y = 95; y < 103; y += 2) rect(x + 1, y, x + 5, y, hex('#9a948a')); rect(x + 1, 95, x + 5, 97, hex('#4a4a52')); pset(x + 3, 92, hex('#2a2a32')); }
  rect(118, 112, 136, 126, hex('#5a3e2a')); rect(118, 112, 136, 112, hex('#7a5a3a')); for (let j = 0; j < 4; j++) { rect(120, 108 - j * 2, 134, 109 - j * 2, hex('#f0ece0')); rect(120, 109 - j * 2, 134, 109 - j * 2, hex('#c8c0b0')); }
  disco(160, 88, 8, hex('#4a6a3a')); rect(152, 88, 168, 89, hex('#3a5a2e')); rect(159, 88, 161, 91, hex('#fff0b0'));
}

// la prensa de platina con el volante que gira y el impresor que mete el pliego (dentro del escaparate)
function c_prensa(R, t) {
  const { rect, pset, disco, linea } = R, x = 150, y = 126, a = t * 3;
  R.recorte([116, 88, 172, 126]);
  rect(x - 8, y - 22, x + 6, y, hex('#1e1e26')); rect(x - 7, y - 21, x - 6, y - 1, hex('#4a4a5a')); rect(x - 10, y - 2, x + 8, y, hex('#2a2a32'));
  const ab = (Math.sin(a) + 1) / 2; R.poligono([[x - 8, y - 22], [x - 14 - ab * 4, y - 26 + ab * 6], [x - 14 - ab * 4, y - 10 + ab * 2], [x - 8, y - 8]], hex('#2e2e3a'));
  disco(x + 12, y - 12, 9, hex('#1e1e26')); disco(x + 12, y - 12, 7, hex('#6a5a4a'));
  for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; linea(x + 12, y - 12, Math.round(x + 12 + Math.cos(an) * 7), Math.round(y - 12 + Math.sin(an) * 7), hex('#1e1e26')); } disco(x + 12, y - 12, 2, hex('#c8a040'));
  disco(x + 2, y - 26, 3, hex('#3a3a4a')); pset(x + 1, y - 27, hex('#8a8a9a'));
  // el impresor con delantal: el brazo va y viene con el pliego
  const ix = 128, iy = 126, br = Math.round(Math.sin(a) * 3); rect(ix - 2, iy - 13, ix + 2, iy - 4, hex('#e8e4dc')); rect(ix - 1, iy - 12, ix + 1, iy - 4, hex('#3a4a6a')); disco(ix, iy - 16, 2.5, hex('#e8b890')); rect(ix - 2, iy - 19, ix + 2, iy - 18, hex('#4a3a2a'));
  linea(ix + 2, iy - 11, ix + 6 + br, iy - 13, hex('#e8e4dc')); rect(ix + 6 + br, iy - 15, ix + 10 + br, iy - 13, hex('#f8f4ec'));
  R.recorte(null);
}

// la puerta de cerca (cámara 'puerta'): techo del porche, pared de tablilla, puerta con cristal y visillo, ventana
// encendida, el farol de pared, las botellas de leche; huecos transparentes a los lados (x 0–17 y 269–319, y 16–150)
function c_puerta27(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K, pared = [hex('#a8c0a8'), hex('#8aa48a'), hex('#c4d8c4'), hex('#6a846a')];
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) R.buf[y * 320 + x] = y % 4 === 3 ? hex('#7a8a7a') : h(x >> 4, y >> 2, 1120) < 0.2 ? hex('#a0b0a0') : hex('#aabaaa');
  rect(0, 12, 319, 16, hex('#f0ece0')); rect(0, 16, 319, 16, hex('#8a8478'));
  c_tablilla(R, 0, 17, 319, 131, pared, 3, 5);
  for (let y = 17; y < 26; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (26 - y) / 10) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  // la puerta con su marco, el montante, el cristal con visillo y la luz de dentro, los cuarterones, el pomo y la aldaba
  rect(124, 40, 172, 132, hex('#f0ece0')); rect(124, 40, 172, 41, hex('#ffffff')); rect(124, 36, 172, 39, hex('#d8d0c0')); rect(128, 42, 168, 50, K.luz); for (let x = 134; x < 168; x += 7) rect(x, 42, x, 50, hex('#f0ece0'));
  rect(128, 52, 168, 132, C.k); rect(129, 53, 167, 132, hex('#6a2a2a')); rect(129, 53, 130, 132, hex('#8a3a3a'));
  rect(135, 58, 161, 86, hex('#3a1a1a')); rect(136, 59, 160, 85, K.luz); for (let y = 60; y < 85; y += 3) for (let x = 137; x < 160; x += 3) pset(x + (y % 2), y, hex('#fff8e0')); rect(136, 76, 160, 85, K.luzS);
  for (const [x0, y0] of [[134, 92], [150, 92], [134, 112], [150, 112]]) { rect(x0, y0, x0 + 12, y0 + 14, hex('#4a1a1a')); rect(x0 + 1, y0 + 1, x0 + 11, y0 + 13, hex('#7a2e2e')); rect(x0 + 1, y0 + 1, x0 + 11, y0 + 1, hex('#9a4a4a')); }
  disco(162, 100, 2, hex('#c8a040')); pset(161, 99, hex('#fff0a0')); rect(146, 88, 150, 89, hex('#c8a040'));
  // el farol de pared, encendido, y la ventana con su visillo y la persiana
  rect(180, 56, 186, 58, hex('#2a2a32')); rect(178, 58, 188, 72, C.k); rect(179, 59, 187, 71, K.luz); rect(181, 61, 185, 69, K.luzL); rect(177, 72, 189, 74, hex('#2a2a32')); rect(182, 54, 184, 55, hex('#2a2a32'));
  rect(196, 46, 254, 112, hex('#f0ece0')); rect(199, 49, 251, 109, C.k); rect(200, 50, 250, 108, K.luz); rect(224, 50, 226, 108, hex('#f0ece0')); rect(200, 78, 250, 80, hex('#f0ece0'));
  rect(200, 50, 250, 58, hex('#e8dcc0')); for (let x = 201; x < 250; x += 2) pset(x, 58, hex('#c8b898'));
  for (const xc of [[200, 206], [244, 250]]) for (let y = 59; y < 108; y++) for (let x = xc[0]; x <= xc[1]; x++) if ((x + y) % 3) pset(x, y, hex('#f8ecd0'));
  rect(194, 112, 256, 115, hex('#f0ece0')); rect(194, 115, 256, 116, hex('#8a8478')); rect(194, 111, 256, 111, K.nieve);
  // la ventana de la izquierda, también con luz
  rect(40, 46, 98, 112, hex('#f0ece0')); rect(43, 49, 95, 109, C.k); rect(44, 50, 94, 108, K.luz); rect(68, 50, 70, 108, hex('#f0ece0')); rect(44, 78, 94, 80, hex('#f0ece0')); rect(44, 50, 94, 58, hex('#e8dcc0'));
  for (const xc of [[44, 50], [88, 94]]) for (let y = 59; y < 108; y++) for (let x = xc[0]; x <= xc[1]; x++) if ((x + y) % 3) pset(x, y, hex('#f8ecd0'));
  rect(38, 112, 100, 115, hex('#f0ece0')); rect(38, 115, 100, 116, hex('#8a8478'));
  // el felpudo, las botellas de leche y la escoba
  rect(130, 132, 166, 136, hex('#8a6a3a')); for (let x = 131; x < 166; x += 2) pset(x, 133, hex('#a8844a'));
  for (const x of [112, 117]) { rect(x, 122, x + 3, 132, hex('#d8e4ec')); rect(x, 125, x + 3, 132, hex('#ffffff')); rect(x, 121, x + 3, 121, hex('#c8a040')); pset(x, 126, hex('#c8d4dc')); }
  linea(104, 86, 108, 132, hex('#8a6a44')); poligono([[103, 120], [111, 120], [113, 133], [100, 133]], K.paja); for (let x = 101; x < 113; x += 2) linea(x, 122, x, 132, K.pajaS);
  // los huecos de fuera (transparentes) y los postes del porche
  rect(0, 17, 17, 150, 0); rect(269, 17, 319, 150, 0);
  for (const sx of [18, 262]) { rect(sx, 12, sx + 7, 152, C.k); rect(sx + 1, 12, sx + 6, 152, hex('#f0ece0')); rect(sx + 1, 12, sx + 2, 152, hex('#ffffff')); rect(sx + 5, 12, sx + 6, 152, hex('#b8b0a0')); }
  rect(0, 12, 17, 16, hex('#f0ece0')); rect(269, 12, 319, 16, hex('#f0ece0'));
  // el suelo del porche (tablas hacia el fondo) con nieve en polvo y hojas, y los escalones
  for (let y = 132; y < 152; y++) { const d = y - 40; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 8, tb = Math.floor(u), fr = (u - tb) * d / 8; R.buf[y * 320 + x] = fr < 1 ? hex('#4a5a5a') : h(tb, y >> 2, 1121) < 0.15 ? hex('#6a7a7a') : hex('#7a8c8a'); } }
  for (let y = 132; y < 138; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (138 - y) / 8) pset(x, y, c_mez(R.pget(x, y), C.k, 0.35));
  for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 1122) * 320), y = 140 + Math.round(h(i, 2, 1122) * 11); if (x > 120 && x < 176) continue; pset(x, y, i % 4 ? K.nieve : [hex('#c84a2a'), hex('#e8902a')][i % 2]); }
  for (let s = 0; s < 3; s++) { const y0 = 152 + s * 10, a = 4 + s * 6; rect(0, y0, 319, y0 + 2, hex('#a8b8b4')); rect(0, y0, 319, y0, K.nieve); for (let x = 0; x < 320; x++) if (h(x >> 1, s, 1123) < 0.4) pset(x, y0 + 1, K.nieveL); rect(0, y0 + 3, 319, y0 + 9, hex('#5a6a6a')); for (let x = 0; x < 320; x += 13 + s) rect(x, y0 + 3, x, y0 + 9, hex('#4a5858')); }
}

// lo de fuera del porche de 1927 (opaco): el cielo nublado de anochecer, la casa de enfrente con las ventanas
// encendidas, una farola y la calle con nieve
function c_puerta27Fuera(R) {
  const { rect, pset, poligono } = R, K = c_K;
  c_grad(R, 0, 0, 319, 110, c_CIELO_NUBLADO);
  for (let x = 0; x < 320; x++) { const y = Math.round(96 + 3 * Math.sin(x * 0.05)); for (let yy = y; yy < 180; yy++) pset(x, yy, yy < y + 2 ? hex('#c8ccd8') : hex('#8a92a8')); }
  rect(276, 70, 324, 120, hex('#c8b898')); for (let y = 72; y < 120; y += 3) rect(276, y, 324, y, hex('#a89878')); poligono([[272, 72], [300, 56], [328, 72]], hex('#4a4a56')); poligono([[272, 72], [300, 56], [300, 58], [274, 72]], K.nieve);
  rect(284, 80, 292, 92, K.luz); rect(304, 80, 312, 92, K.luz); rect(288, 80, 288, 92, hex('#c8b898')); rect(284, 98, 292, 110, K.luzS);
  rect(-2, 80, 16, 122, hex('#b0a8c0')); for (let y = 82; y < 122; y += 3) rect(-2, y, 16, y, hex('#9088a0')); rect(4, 88, 12, 100, K.luz);
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1124); R.buf[y * 320 + x] = q < 0.6 ? K.nieve : q < 0.8 ? K.nieveS : hex('#6a5e58'); }
}

function c_calle27(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K;
  if (!cerca) {
    R.copiar(c_capa(R, 'c27-cielo', () => c_grad(R, 0, 0, 319, 140, c_CIELO_NUBLADO)));
    c_nubes(R, t, [[0, 70, 40, 0.5], [160, 74, 36, 0.4]], [hex('#5a5876'), hex('#6e6a86'), hex('#86809a')]);
    c_nubes(R, t, [[60, 44, 60, 0.9], [240, 52, 50, 0.8]], c_NUBE_NIEVE);
    c_nubes(R, t, [[130, 22, 80, 1.5]], [hex('#3e3c5a'), hex('#524e6c'), hex('#686480')]);
    c_aves(R, t, 3, 36, 60, 8, hex('#2a2834'), 10);
    // el escaparate por dentro (y la prensa) va detrás de la fachada
    { const b = c_capa(R, 'c27-dentro', () => c_imprentaDentro(R)); const B = R.buf; for (let y = 88; y <= 126; y++) for (let x = 116; x <= 172; x++) B[y * 320 + x] = b[y * 320 + x]; }
    c_prensa(R, t);
    c_pegar(R, c_capa(R, 'c27-fondo', () => c_calle27Fondo(R)));
    // el reflejo del cristal del escaparate
    for (let i = 0; i < 3; i++) R.linea(120 + i * 18, 126, 136 + i * 18, 90, hex('#e8d8b8'), 3);
    // el humo de las chimeneas, las farolas encendidas con su halo, las calabazas talladas de los porches
    c_humo(R, 63, 79, t, 0, [hex('#8a86a0'), hex('#a8a4b8'), hex('#6e6a86')], 26, -0.6); c_humo(R, 291, 79, t, 2, [hex('#8a86a0'), hex('#a8a4b8'), hex('#6e6a86')], 26, -0.6);
    for (const lx of [106, 211]) { c_resplandor(R, lx, 72, 26, K.luz, 0.35, 22); c_farola(R, lx, 142, 72, t, true, 0); }
    c_calabaza(R, 70, 128, 5, t, true, 0); c_calabaza(R, 236, 129, 4, t, true, 2);
    // alguien que pasa por detrás del visillo de abajo de la casa de la derecha
    { const c2 = t % 9; if (c2 > 3 && c2 < 7) { const sx = Math.round(225 + (c2 - 3) / 4 * 13); R.recorte([225, 107, 240, 123]); rect(sx, 112, sx + 3, 123, hex('#8a6a40')); disco(sx + 1.5, 110, 2, hex('#8a6a40')); R.recorte(null); } }
    // el gato del porche de la izquierda, que mueve la cola
    { const gx = 30, gy = 120; R.dibujo(['.k...k.', '.kkkkk.', '.kgkgk.', '..kkk..', '.kkkkk.', 'kkkkkkk', 'kkkkkkk'], gx - 3, gy - 7, 1, { k: hex('#2a2224'), g: hex('#b8d040') }); R.linea(gx + 3, gy - 1, gx + 6, gy - 3 + Math.round(Math.sin(t * 1.5) * 2), hex('#2a2224')); }
    // hojas que se lleva el viento y la nieve que cae
    c_caen(R, t, 6, 0, 320, 100, 170, [hex('#c84a2a'), hex('#e8902a')], 3, 12);
    c_copos(R, t, 90, 1);
    return { suelo: 142, sueloCalle: 164, acera: [0, 134, 320, 143], imprenta: [108, 50, 212, 134], escaparate: [116, 88, 172, 126], prensa: [150, 126], puertaImprenta: [180, 90, 198, 134], casas: [[-2, 104], [214, 322]], puertas: [[79, 106, 90, 134], [289, 106, 300, 134]], calabazas: [[70, 128], [236, 129]], farolas: [106, 211] };
  }
  // la puerta de cerca: fuera (cielo, casa de enfrente, nieve) y el porche
  R.copiar(c_capa(R, 'c27-p-fuera', () => c_puerta27Fuera(R)));
  c_nubes(R, t, [[280, 30, 40, 0.8], [0, 50, 30, 0.6]], c_NUBE_NIEVE);
  c_farola(R, 300, 128, 50, t, true, 0); c_resplandor(R, 300, 80, 14, K.luz, 0.4, 12);
  R.recorte([0, 17, 17, 151]); c_copos(R, t, 40, 5); R.recorte([269, 17, 319, 151]); c_copos(R, t, 40, 6); R.recorte(null);
  c_pegar(R, c_capa(R, 'c27-puerta', () => c_puerta27(R)));
  // la luz del farol que tiembla y alguien que pasa por detrás del visillo
  c_resplandor(R, 183, 66, 26, K.luz, 0.22 + 0.04 * Math.sin(t * 9), 22);
  { const c2 = t % 8; if (c2 > 2 && c2 < 6) { const sx = Math.round(206 + (c2 - 2) / 4 * 36); R.recorte([207, 59, 243, 107]); rect(sx, 72, sx + 8, 107, hex('#a07a4a')); disco(sx + 4, 66, 5, hex('#a07a4a')); R.recorte(null); } }
  // la nieve que entra con el viento por los lados del porche y se posa
  for (let i = 0; i < 12; i++) { const u2 = ((t * 0.3 + h(i, 1, 1130)) % 1), x = i % 2 ? 268 - u2 * 30 : 20 + u2 * 30, y = 30 + h(i, 2, 1130) * 100 + u2 * 20; pset(Math.round(x), Math.round(y), K.nieve); }
  return { suelo: 148, sueloEscalon: [158, 168, 178], puerta: [129, 53, 167, 132], pomo: [162, 100], aldaba: [148, 88], ventana: [200, 50, 250, 108], farol: [183, 64], postes: [[18, 25], [262, 269]] };
}

// lo de delante en la calle de 1927: el Ford T aparcado abajo a la derecha (general) o la calabaza tallada y el haz de
// cañas de maíz atado al poste (puerta)
function c_calle27Delante(R, t, o, cerca) {
  const { rect, pset, disco, poligono, linea } = R;
  if (!cerca) {
    const x = 272, s = 168; for (let j = 0; j < 3; j++) rect(x - 34 + j * 2, s + j, x + 40 - j * 2, s + j, hex('#3a3236'));
    rect(x - 30, s - 14, x + 34, s - 5, C.k); rect(x - 29, s - 13, x + 33, s - 6, hex('#1e1e26')); rect(x - 29, s - 13, x + 33, s - 13, hex('#4a4a5a'));
    rect(x - 12, s - 30, x + 14, s - 14, C.k); rect(x - 11, s - 29, x + 13, s - 15, hex('#24242e')); rect(x - 9, s - 27, x - 1, s - 17, hex('#6a7a9a')); rect(x + 2, s - 27, x + 11, s - 17, hex('#6a7a9a')); rect(x - 13, s - 31, x + 15, s - 30, hex('#1e1e26'));
    rect(x - 30, s - 22, x - 14, s - 14, hex('#24242e')); rect(x - 36, s - 20, x - 31, s - 14, hex('#3a3a44')); disco(x - 33, s - 18, 2, hex('#e8e0b0'));
    for (const dx of [-20, 24]) { disco(x + dx, s - 2, 8, C.k); disco(x + dx, s - 2, 7, hex('#2a2a32')); disco(x + dx, s - 2, 3, hex('#c8c0a8')); for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; linea(x + dx, s - 2, Math.round(x + dx + Math.cos(an) * 6), Math.round(s - 2 + Math.sin(an) * 6), hex('#6a6a72')); } }
    rect(x - 12, s - 31, x + 14, s - 31, c_K.nieve); rect(x - 29, s - 14, x - 14, s - 14, c_K.nieve); for (let i = -28; i < 32; i += 3) pset(x + i, s - 14, c_K.nieveL);
    return;
  }
  // el haz de cañas de maíz atado al poste derecho
  for (let i = 0; i < 9; i++) { const x = 254 + i * 3, a = Math.round(Math.sin(t * 1.4 + i) * 1); linea(x, 152, x - 4 + i + a, 70 + (i % 3) * 6, i % 2 ? hex('#c8a860') : hex('#a88a48')); linea(x - 4 + i + a, 70 + (i % 3) * 6, x - 10 + i * 2 + a, 64 + (i % 4) * 3, hex('#d8bc78')); }
  rect(252, 118, 282, 121, hex('#6a4a2a'));
  // la calabaza tallada en el suelo del porche, encendida
  for (let j = 0; j < 3; j++) for (let i = -12; i <= 12; i++) if (c_um(214 + i, 150 + j) < 0.5 - Math.abs(i) / 30) pset(214 + i, 150 + j, c_mez(R.pget(214 + i, 150 + j), C.k, 0.4));
  c_calabaza(R, 214, 141, 10, t, true, 3); c_resplandor(R, 214, 141, 22, c_K.luz, 0.15 + 0.05 * Math.sin(t * 11), 16);
}

const c_CIELO_50 = ['#1a1e4e', '#262866', '#3a3274', '#5a3a7a', '#8a4a78', '#c0606a', '#e8804e', '#f4a456'].map(hex);

const c_NUBE_50 = [hex('#3a2a5a'), hex('#7a4a70'), hex('#c87a6a')];

// una casa de una planta de los cincuenta (x0–x1, base y1): tejado a cuatro aguas, tablilla pastel, ventanal, puerta y luz del porche
function c_casa50(R, x0, x1, y1, pared, puerta, k = 0, garaje = false) {
  const { rect, pset, poligono, linea } = R, K = c_K, y0 = y1 - 34, top = y0 - 16;
  c_tejado(R, [[x0 - 6, y0 + 2], [x0 + 14, top], [x1 - 14, top], [x1 + 6, y0 + 2]], [hex('#5a5a66'), hex('#44444e'), hex('#74747e'), hex('#33333c')], 1140 + k, 3, 5);
  linea(x0 - 6, y0 + 2, x0 + 14, top, hex('#2a2a32')); rect(x0 + 14, top - 1, x1 - 14, top, hex('#2a2a32')); linea(x1 - 14, top, x1 + 6, y0 + 2, hex('#2a2a32'));
  rect(x0 - 6, y0 + 2, x1 + 6, y0 + 3, hex('#f0ece0'));
  rect(x0, y0 + 4, x1, y1, C.k); c_tablilla(R, x0 + 1, y0 + 4, x1 - 1, y1 - 1, pared, 1141 + k, 4);
  for (let y = y0 + 4; y < y0 + 8; y++) for (let x = x0 + 1; x < x1; x++) if (c_um(x, y) < (y0 + 8 - y) / 5) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  rect(x0 + 1, y1 - 3, x1 - 1, y1 - 1, hex('#8a8482'));
  // el ventanal (el resplandor de la tele lo pinta el fotograma) y la puerta con su lámpara
  const vx = x0 + 8; rect(vx - 1, y0 + 9, vx + 34, y0 + 26, hex('#f0ece0')); rect(vx, y0 + 10, vx + 33, y0 + 25, hex('#e8b860')); rect(vx, y0 + 10, vx + 33, y0 + 13, hex('#f8d888')); rect(vx + 11, y0 + 10, vx + 11, y0 + 25, hex('#f0ece0')); rect(vx + 22, y0 + 10, vx + 22, y0 + 25, hex('#f0ece0'));
  rect(vx, y0 + 10, vx + 3, y0 + 25, hex('#c86a5a')); rect(vx + 30, y0 + 10, vx + 33, y0 + 25, hex('#c86a5a')); rect(vx - 2, y0 + 26, vx + 35, y0 + 27, hex('#f0ece0'));
  for (let i = 0; i < 9; i++) { pset(vx + i * 4, y0 + 28, i % 2 ? hex('#e8a030') : hex('#c84a2a')); pset(vx + i * 4 + 1, y0 + 29, hex('#3a6a2a')); }
  const px = x0 + 50; rect(px - 1, y0 + 8, px + 12, y1, hex('#f0ece0')); rect(px, y0 + 9, px + 11, y1, puerta); for (let j = 0; j < 3; j++) rect(px + 3 + j * 2, y0 + 12 + j * 3, px + 5 + j * 2, y0 + 13 + j * 3, hex('#f8d888')); pset(px + 9, y0 + 21, C.oro);
  rect(px + 14, y0 + 13, px + 16, y0 + 17, C.k); rect(px + 15, y0 + 14, px + 15, y0 + 16, K.luzL);
  rect(px - 4, y1, px + 16, y1 + 2, hex('#c8c0b8')); rect(px - 4, y1, px + 16, y1, hex('#e0d8d0'));
  if (garaje) { const gx = x1 - 48; rect(gx - 1, y0 + 6, gx + 42, y1, hex('#f0ece0')); for (let y = y0 + 7; y < y1; y++) for (let x = gx; x < gx + 42; x++) pset(x, y, (y - y0 - 7) % 7 === 6 ? hex('#a8a098') : (x - gx) % 14 === 0 ? hex('#b8b0a8') : hex('#d8d0c8')); }
  return { puerta: [px, y0 + 9, px + 11, y1], ventanal: [vx, y0 + 10, vx + 33, y0 + 25], luz: [px + 15, y0 + 15] };
}

// la calle de los cincuenta (sin cielo): árboles lejanos, tres casas (una de dos plantas con buhardillas), césped con
// hojas, la cerca blanca, los buzones, la acera, el bordillo y el asfalto con hojas
function c_calle50Fondo(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  for (let i = 0; i < 60; i++) { const x = (i * 5.6) % 330 - 4, y = 92 + Math.round(h(i, 1, 1150) * 6); disco(x, y, 5 + h(i, 2, 1150) * 4, i % 3 ? hex('#4a2a40') : hex('#5a3044')); pset(x - 2, y - 4, hex('#7a3a4a')); }
  rect(0, 96, 319, 130, hex('#3a3040'));
  // la casa de la izquierda, la de dos plantas del centro y la del garaje a la derecha
  c_casa50(R, -6, 92, 132, [hex('#e8b8b0'), hex('#c89890'), hex('#f8d4cc'), hex('#a87870')], hex('#2a8a8a'), 1);
  c_casa50(R, 214, 330, 132, [hex('#a8d8c0'), hex('#80b49c'), hex('#c8f0dc'), hex('#5a947c')], hex('#c83a3a'), 2, true);
  // la casa de dos plantas (Cape Cod): tejado empinado con dos buhardillas, chimenea, antena de tele
  rect(176, 40, 184, 70, C.k); rect(177, 41, 183, 70, C.ladrillo); for (let y = 43; y < 70; y += 3) rect(177, y, 183, y, C.ladrilloS); rect(175, 39, 185, 41, hex('#5a5a62'));
  c_tejado(R, [[104, 92], [140, 56], [172, 56], [208, 92]], [hex('#4a4652'), hex('#36323e'), hex('#625e6a'), hex('#28242e')], 1151, 3, 5);
  linea(104, 92, 140, 56, hex('#22202a')); linea(172, 56, 208, 92, hex('#22202a')); rect(140, 55, 172, 56, hex('#22202a'));
  linea(122, 40, 122, 64, hex('#2a2a32')); for (const [a, b] of [[114, 130], [116, 128], [118, 126]]) linea(a, 44 + (a - 114), b, 44 + (a - 114), hex('#2a2a32'));
  for (const dx of [128, 168]) { rect(dx - 8, 66, dx + 8, 82, C.k); rect(dx - 7, 68, dx + 7, 82, hex('#f0dc98')); poligono([[dx - 10, 69], [dx, 60], [dx + 10, 69]], hex('#4a4652')); linea(dx - 10, 69, dx, 60, hex('#625e6a')); c_ventana(R, dx - 4, 71, dx + 4, 81, 2, 2, hex('#3a3a5a'), [hex('#f0ece0'), hex('#8a8478')], c_K.luz); }
  rect(108, 92, 204, 132, C.k); c_tablilla(R, 109, 92, 203, 131, [hex('#f0dc98'), hex('#ccb470'), hex('#fff0c0'), hex('#a8904a')], 1152, 4); rect(104, 91, 208, 92, hex('#f0ece0'));
  for (let y = 92; y < 97; y++) for (let x = 109; x < 204; x++) if (c_um(x, y) < (97 - y) / 6) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  for (const vx of [116, 182]) { c_contra(R, vx - 5, 98, vx - 1, 118, hex('#2a4a6a')); c_contra(R, vx + 15, 98, vx + 19, 118, hex('#2a4a6a')); c_ventana(R, vx, 98, vx + 14, 118, 2, 3, hex('#3a3a5a'), [hex('#f0ece0'), hex('#8a8478')], c_K.luz); }
  rect(148, 98, 164, 132, hex('#f0ece0')); rect(150, 100, 162, 132, hex('#b82a2a')); for (const [x0, y0] of [[152, 103], [157, 103], [152, 116], [157, 116]]) rect(x0, y0, x0 + 3, y0 + 9, hex('#9a2020')); pset(160, 115, C.oro); rect(152, 100, 160, 101, hex('#f8d888'));
  rect(166, 104, 168, 108, C.k); pset(167, 105, K.luzL); pset(167, 106, K.luz);
  rect(144, 132, 168, 135, hex('#c8c0b8')); rect(144, 132, 168, 132, hex('#e0d8d0')); rect(146, 135, 166, 137, hex('#b0a8a0'));
  // el césped con las hojas caídas y montones rastrillados
  for (let y = 132; y < 142; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y, 1153); R.buf[y * 320 + x] = q < 0.12 ? hex('#c86a2a') : q < 0.2 ? hex('#e8a040') : q > 0.85 ? hex('#7a9a4a') : h(x, y, 1154) < 0.3 ? hex('#4a6a32') : hex('#5a7a3a'); }
  for (const [mx, my] of [[30, 138], [196, 139]]) for (let j = 0; j < 6; j++) for (let i = -10 + j; i <= 10 - j; i++) pset(mx + i, my - j, [hex('#c84a2a'), hex('#e8902a'), hex('#a8642a'), hex('#f0b040')][Math.floor(h(i, j, 1155 + mx) * 4)]);
  // el camino de entrada de la casa central, el de coches del garaje y la cerca blanca
  rect(150, 137, 162, 141, hex('#c8c4bc')); poligono([[262, 132], [314, 132], [330, 142], [256, 142]], hex('#a8a4a0')); for (let x = 262; x < 320; x += 9) pset(x, 137, hex('#8a8682'));
  for (let x = 108; x < 206; x++) { if (x > 144 && x < 168) continue; if ((x - 108) % 5 === 0) { rect(x, 124, x + 2, 136, hex('#f6f2ea')); pset(x + 1, 123, hex('#f6f2ea')); rect(x + 2, 124, x + 2, 136, hex('#c8c0b4')); } }
  for (let x = 108; x < 206; x++) if (x < 145 || x > 167) { pset(x, 127, hex('#f6f2ea')); pset(x, 133, hex('#f6f2ea')); }
  // los buzones
  for (const [mx, c] of [[96, hex('#3a3a46')], [240, hex('#c84a3a')]]) { rect(mx, 128, mx, 141, hex('#4a3a2a')); rect(mx - 4, 123, mx + 4, 128, C.k); rect(mx - 3, 124, mx + 3, 127, c); rect(mx + 4, 122, mx + 5, 124, C.rojo); }
  // la acera de losas con grietas, la franja de hierba, el bordillo y el asfalto con hojas
  for (let y = 142; y < 150; y++) for (let x = 0; x < 320; x++) R.buf[y * 320 + x] = y === 142 ? K.aceraS : x % 20 === 0 ? K.aceraS : h(x >> 1, y, 1156) < 0.05 ? hex('#c86a2a') : h(x, y, 1157) < 0.06 ? hex('#9894a0') : K.acera;
  rect(0, 150, 319, 151, hex('#c8c4cc')); rect(0, 152, 319, 152, K.aceraS); rect(0, 153, 319, 153, hex('#2a2830'));
  for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 1158); R.buf[y * 320 + x] = q < 0.06 ? K.asfaltoS : q > 0.965 ? hex('#5a5662') : K.asfalto; }
  for (let i = 0; i < 70; i++) { const x = Math.round(h(i, 1, 1159) * 320), y = 154 + Math.round(h(i, 2, 1159) ** 2 * 24); pset(x, y, [hex('#c84a2a'), hex('#e8902a'), hex('#a8642a'), hex('#f0b040')][i % 4]); if (i % 2) pset(x + 1, y, hex('#a8642a')); }
  for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) { const e = (i / 8.5) ** 2 + (j / 3.4) ** 2; if (e < 1) pset(160 + i, 170 + j, e > 0.7 ? C.k : (i + j) % 3 ? hex('#5a5a66') : hex('#46464e')); }
  // el tronco del arce grande (la copa, en el fotograma) y la farola
  rect(94, 70, 99, 142, C.k); rect(95, 70, 98, 142, hex('#5a4a40')); rect(95, 70, 95, 142, hex('#7a6a5a')); linea(96, 86, 84, 72, hex('#4a3a30')); linea(97, 82, 110, 68, hex('#4a3a30'));
  rect(212, 78, 216, 142, C.k); rect(213, 78, 215, 142, hex('#5a4a40')); linea(214, 92, 204, 80, hex('#4a3a30'));
}

// el porche de los cincuenta (cámara 'porche'): tablilla pastel, la puerta roja con la mosquitera abierta, la lámpara,
// el ventanal con la tele (el hueco de la tele, x 220–248, y 70–92, lo pinta el fotograma), la ventana con un gato
// de papel, la baranda de hierro, el suelo y los escalones
function c_porche50(R) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K, pared = [hex('#f0dc98'), hex('#ccb470'), hex('#fff0c0'), hex('#a8904a')];
  c_tablilla(R, 0, 0, 319, 126, pared, 7, 5);
  // la puerta roja con los tres cristales escalonados, la mirilla y el buzón; la mosquitera de aluminio abierta
  rect(116, 40, 156, 126, hex('#f6f2ea')); rect(116, 40, 156, 41, hex('#ffffff')); rect(120, 44, 152, 126, C.k); rect(121, 45, 151, 126, hex('#c83a3a')); rect(121, 45, 122, 126, hex('#e05a4a'));
  for (let j = 0; j < 3; j++) { rect(126 + j * 6, 52 + j * 6, 130 + j * 6, 56 + j * 6, hex('#2a1a1a')); rect(127 + j * 6, 53 + j * 6, 129 + j * 6, 55 + j * 6, K.luz); }
  rect(128, 86, 144, 89, hex('#c8a040')); rect(129, 87, 143, 88, hex('#8a6a20')); disco(147, 96, 2, hex('#c8a040')); pset(146, 95, hex('#fff0a0'));
  poligono([[116, 44], [96, 52], [96, 130], [116, 126]], hex('#b8bcc8')); poligono([[114, 47], [98, 54], [98, 127], [114, 123]], hex('#5a5e6a'));
  for (let y = 56; y < 126; y += 2) linea(99, y, 113, y - 6, hex('#6a6e7a')); linea(98, 90, 114, 85, hex('#b8bcc8'));
  // la lámpara del porche
  rect(160, 54, 166, 56, hex('#2a2a32')); rect(159, 56, 167, 70, C.k); rect(160, 57, 166, 69, hex('#f8e8b0')); rect(161, 59, 165, 67, K.luzL); rect(158, 70, 168, 71, hex('#2a2a32'));
  // el ventanal con cortinas estampadas y la lámpara de dentro; la tele en su mueble
  rect(176, 38, 268, 108, hex('#f6f2ea')); rect(180, 42, 264, 104, C.k); rect(181, 43, 263, 103, hex('#e8b860')); rect(181, 43, 263, 50, hex('#f8d888'));
  for (const [a, b] of [[181, 196], [248, 263]]) for (let y = 43; y < 104; y++) for (let x = a; x <= b; x++) pset(x, y, (x + y * 2) % 9 === 0 ? hex('#3a6a6a') : (x * 3 + y) % 11 === 0 ? hex('#e86a3a') : (x - a) % 4 === 0 ? hex('#c8b898') : hex('#e8dcc0'));
  rect(198, 60, 204, 76, hex('#c8a040')); poligono([[194, 52], [208, 52], [210, 60], [192, 60]], hex('#f8f0d0')); rect(200, 76, 202, 98, hex('#4a3a2a'));
  rect(214, 64, 254, 98, C.k); rect(215, 65, 253, 97, hex('#7a4a2a')); rect(215, 65, 253, 66, hex('#9a6a3a')); rect(218, 68, 250, 94, hex('#3a3a42')); for (const x of [222, 246]) { linea(x + 8, 64, x, 52, hex('#2a2a32')); }
  rect(208, 98, 260, 103, hex('#5a3a22')); rect(208, 98, 260, 98, hex('#7a5a3a'));
  rect(172, 108, 272, 111, hex('#f6f2ea')); rect(172, 111, 272, 112, hex('#a89870'));
  // la ventana pequeña de la izquierda con un gato negro de papel pegado
  rect(20, 42, 68, 100, hex('#f6f2ea')); rect(23, 45, 65, 97, C.k); rect(24, 46, 64, 96, hex('#e8b860')); rect(43, 46, 45, 96, hex('#f6f2ea')); rect(24, 70, 64, 72, hex('#f6f2ea'));
  R.dibujo(['.k.....k', '.kk...kk', '.kkkkkkk', '.kykkyk.', '..kkkk..', '..kkkk..', '.kkkkkk.', 'kkkkkkkk', 'kkkkkkkk', '.kkkkkk.'], 28, 76, 1, { k: hex('#1a1420'), y: hex('#f8d838') }); linea(36, 85, 40, 80, hex('#1a1420'));
  rect(18, 100, 70, 103, hex('#f6f2ea')); rect(18, 103, 70, 104, hex('#a89870'));
  // la maceta con crisantemos naranjas
  rect(76, 112, 92, 126, C.k); rect(77, 113, 91, 126, hex('#b05a32')); rect(77, 113, 91, 114, hex('#d07a4a')); c_copa(R, 84, 108, [[0, 0, 7], [-6, 2, 5], [6, 2, 5]], [hex('#7a3a10'), hex('#c8601a'), hex('#e8902a'), hex('#f8c060')]);
  // la baranda de hierro forjado a la izquierda
  rect(0, 98, 70, 100, hex('#1e1e26')); rect(0, 124, 70, 125, hex('#1e1e26')); for (let x = 2; x < 70; x += 8) { rect(x, 100, x, 124, hex('#1e1e26')); for (let a = 0; a < 10; a++) pset(x + 4 + Math.round(Math.cos(a * 0.7) * 2), 106 + a, hex('#1e1e26')); }
  // el suelo del porche de cemento pintado y los escalones
  for (let y = 126; y < 148; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1160); R.buf[y * 320 + x] = y === 126 ? hex('#6a4a4a') : q < 0.1 ? hex('#8a5a5a') : q > 0.9 ? hex('#b88078') : hex('#a06a66'); }
  for (let y = 127; y < 133; y++) for (let x = 0; x < 320; x++) if (c_um(x, y) < (133 - y) / 7) pset(x, y, c_mez(R.pget(x, y), C.k, 0.3));
  for (let s = 0; s < 3; s++) { const y0 = 148 + s * 11; rect(0, y0, 319, y0 + 2, hex('#c89890')); rect(0, y0, 319, y0, hex('#e0b0a8')); rect(0, y0 + 3, 319, y0 + 10, hex('#7a5250')); for (let x = 0; x < 320; x++) if (h(x >> 2, s, 1161) < 0.2) pset(x, y0 + 4 + (x % 5), hex('#6a4644')); }
  for (let i = 0; i < 30; i++) { const x = Math.round(h(i, 1, 1162) * 320), y = 132 + Math.round(h(i, 2, 1162) * 44); pset(x, y, [hex('#c84a2a'), hex('#e8902a'), hex('#a8642a'), hex('#f0b040')][i % 4]); pset(x + 1, y, hex('#a8642a')); }
  // el taburete con el cuenco de los dulces (los dulces, en el fotograma)
  rect(188, 130, 212, 132, C.k); rect(189, 130, 211, 131, hex('#2a8a8a')); for (const x of [190, 209]) { rect(x, 132, x + 1, 148, hex('#c8c8d0')); }
  rect(191, 140, 208, 140, hex('#a8a8b0'));
}

// la tele de los cincuenta en blanco y negro con un dibujo animado (sin letras): un gato que persigue a un ratón
function c_dibujoTele(R, t, [x0, y0, x1, y1]) {
  const { rect, pset, disco } = R; R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y + Math.floor(t * 30)) % 3 === 0 ? hex('#9aa4b4') : hex('#b8c2cc'));
  rect(x0, y1 - 4, x1, y1, hex('#6a7484'));
  const u = (t * 0.4) % 1, mx = Math.round(x0 + 2 + u * (x1 - x0 + 10) - 6), gx = mx - 9, sal = Math.abs(Math.sin(t * 8)) * 2;
  disco(mx, y1 - 6, 2, hex('#2a2a32')); pset(mx - 1, y1 - 9, hex('#2a2a32')); pset(mx + 1, y1 - 9, hex('#2a2a32')); pset(mx + 2, y1 - 6, hex('#ffffff'));
  disco(gx, y1 - 8 - sal, 3, hex('#1a1a22')); rect(gx - 2, y1 - 12 - sal, gx - 1, y1 - 11 - sal, hex('#1a1a22')); rect(gx + 1, y1 - 12 - sal, gx + 2, y1 - 11 - sal, hex('#1a1a22')); pset(gx + 1, y1 - 9 - sal, hex('#ffffff')); R.linea(gx - 3, y1 - 7 - sal, gx - 6, y1 - 11 - sal, hex('#1a1a22'));
  R.recorte(null);
}

function c_calle50(R, t, o, cerca) {
  const { rect, pset, disco } = R, K = c_K;
  // el resplandor azulado de la tele en un ventanal
  const V1 = hex('#e8b860'), V2 = hex('#f8d888');
  const tele = (x0, y0, x1, y1, k) => { const f = 0.5 + 0.5 * Math.sin(t * 7 + k) * Math.sin(t * 3.1 + k * 2); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (c_um(x, y) < 0.35 + f * 0.3) { const c = R.pget(x, y); if (c === V1 || c === V2) pset(x, y, f > 0.5 ? K.tele : K.teleS); } };
  if (!cerca) {
    R.copiar(c_capa(R, 'c50-cielo', () => { c_grad(R, 0, 0, 319, 130, c_CIELO_50); c_estrellas(R, 0, 40, 9, 0.5); }));
    c_luna(R, 238, 30, 6, c_CIELO_50[1], true);
    c_nubes(R, t, [[20, 76, 24, 0.6], [200, 80, 18, 0.5]], c_NUBE_50); c_nubes(R, t, [[100, 52, 34, 1.2]], c_NUBE_50); c_nubes(R, t, [[250, 34, 30, 1.8]], [hex('#2a2452'), hex('#4a3a6a'), hex('#8a5a78')]);
    // tres murciélagos que cruzan el cielo, lejos
    for (let i = 0; i < 3; i++) { const x = Math.round(((t * (14 + i * 4) + i * 120) % 360) - 20), y = Math.round(58 + i * 8 + Math.sin(t * 3 + i) * 4); if (x > 268 && y < 48) continue; const a = Math.sin(t * 18 + i) > 0 ? -1 : 1, c = hex('#1a1424'); pset(x, y, c); pset(x, y - 1, c); R.linea(x - 1, y, x - 3, y + a, c); R.linea(x + 1, y, x + 3, y + a, c); }
    c_pegar(R, c_capa(R, 'c50-fondo', () => c_calle50Fondo(R)));
    tele(2, 108, 35, 123, 0); tele(222, 108, 255, 123, 2);
    // el humo de la chimenea, las lámparas de los porches y las calabazas encendidas de los escalones
    c_humo(R, 180, 36, t, 1, [hex('#5a4a6a'), hex('#7a6a88'), hex('#4a3a5a')], 24, -0.7);
    for (const [lx, ly] of [[59, 119], [167, 106], [279, 119]]) c_resplandor(R, lx, ly, 12, K.luz, 0.4, 10);
    for (const [x, y, r, k] of [[70, 128, 5, 0], [140, 130, 5, 1], [172, 131, 4, 2], [258, 130, 5, 3]]) c_calabaza(R, x, y, r, t, true, k);
    // la gente pequeña que pide dulces: un fantasma de sábana y una brujita que suben al porche del centro y vuelven
    { const c2 = t % 12, u = c2 < 5 ? c2 / 5 : c2 < 7 ? 1 : c2 < 12 ? 1 - (c2 - 7) / 5 : 0, y = Math.round(140 - u * 6), x = 156, an = c2 < 5 || c2 > 7;
      const b = an && Math.floor(t * 6) % 2 ? 1 : 0; rect(x - 8, y - 9 - b, x - 4, y, hex('#f6f6f8')); rect(x - 8, y - 9 - b, x - 4, y - 9 - b, hex('#d8d8e0')); pset(x - 7, y - 7 - b, C.k); pset(x - 5, y - 7 - b, C.k); pset(x - 8, y, hex('#d8d8e0')); pset(x - 4, y - 1, hex('#d8d8e0'));
      rect(x + 3, y - 6 + b, x + 7, y, hex('#3a2a5a')); rect(x + 4, y - 9 + b, x + 6, y - 7 + b, hex('#e8b890')); R.poligono([[x + 1, y - 9 + b], [x + 9, y - 9 + b], [x + 5, y - 15 + b]], hex('#1a1424')); rect(x + 8, y - 4 + b, x + 9, y - 2 + b, hex('#e8782a')); }
    // las copas de los arces, que se mecen y sueltan hojas
    const m = Math.round(Math.sin(t * 0.9) * 1);
    c_copa(R, 96, 64, [[0, 0, 18], [-17, 6, 12], [17, 5, 13], [-8, -12, 12], [9, -12, 11], [-24, 14, 8], [24, 13, 8], [0, 12, 12]], [hex('#6a1a12'), hex('#a8321a'), hex('#e0602a'), hex('#f8a040')], m);
    c_copa(R, 212, 76, [[0, 0, 14], [-13, 5, 10], [13, 5, 10], [-6, -10, 9], [7, -9, 9]], [hex('#6a3a0a'), hex('#b8701a'), hex('#e8a830'), hex('#f8d060')], m);
    c_caen(R, t, 16, 60, 250, 60, 178, [hex('#c84a2a'), hex('#e8902a'), hex('#f0b040'), hex('#a8642a')], 6, 9);
    // la farola de la acera, encendida, con su cono de luz
    c_farola(R, 236, 150, 74, t, true, 1); c_resplandor(R, 245, 110, 24, K.luz, 0.3, 40);
    return { suelo: 150, sueloCalle: 172, acera: [0, 142, 320, 150], casas: [[-6, 92], [104, 208], [214, 330]], puertas: [[44, 107, 55, 132], [150, 100, 162, 132], [264, 107, 275, 132]], porcheCentro: [144, 132, 168, 137], calabazas: [[70, 128], [140, 130], [172, 131], [258, 130]], ventanales: [[2, 108, 35, 123], [222, 108, 255, 123]], arce: [96, 64], farola: [236, 76] };
  }
  // el porche de cerca
  R.copiar(c_capa(R, 'c50-porche', () => c_porche50(R)));
  tele(181, 51, 213, 103, 1);
  // la tele: o.pantalla(R, t, rect) para pintar dentro, o el dibujo animado de un gato y un ratón
  const pant = [219, 69, 249, 93]; if (o.pantalla) { R.recorte(pant); o.pantalla(R, t, pant); R.recorte(null); } else c_dibujoTele(R, t, pant);
  rect(218, 68, 250, 68, hex('#5a5a62'));
  // la luz de la lámpara del porche con las polillas que dan vueltas
  c_resplandor(R, 163, 63, 30, K.luz, 0.3, 26);
  for (let i = 0; i < 3; i++) { const a = t * (4 + i) + i * 2, x = Math.round(163 + Math.cos(a) * (6 + i * 3)), y = Math.round(62 + Math.sin(a * 1.3) * (5 + i * 2)); pset(x, y, hex('#e8e0d0')); pset(x + 1, y, hex('#c8c0b0')); }
  // el cuenco de los dulces en el taburete (o.dulces 0–1: lo lleno que está)
  { const d = Math.max(0, Math.min(1, o.dulces ?? 1)), n = Math.round(d * 16), cx = 200, cy = 128;
    for (let i = 0; i < n; i++) { const x = cx - 8 + (i * 5) % 17, y = cy - 2 - Math.floor(i / 4) * 2 + (i % 2), c = [hex('#e83a5a'), hex('#f8d838'), hex('#3a8ae8'), hex('#3ac86a'), hex('#e8782a')][i % 5]; rect(x - 1, y, x + 1, y + 1, c); pset(x - 2, y, c_mez(c, hex('#ffffff'), 0.4)); pset(x + 2, y + 1, c_mez(c, C.k, 0.3)); }
    for (let j = 0; j < 6; j++) { const w = 12 - j * 1.3; rect(Math.round(cx - w), cy + j, Math.round(cx + w), cy + j, j === 0 ? hex('#f8a040') : j < 3 ? hex('#e8782a') : hex('#b0501a')); } rect(cx - 12, cy, cx - 10, cy, hex('#fff0c0')); }
  // las calabazas talladas del porche y de los escalones
  c_calabaza(R, 92, 136, 7, t, true, 0); c_resplandor(R, 92, 136, 16, K.luz, 0.18, 12);
  c_calabaza(R, 268, 160, 8, t, true, 1); c_resplandor(R, 268, 160, 18, K.luz, 0.18, 12);
  return { suelo: 146, sueloEscalon: [158, 169], puerta: [121, 45, 151, 126], timbre: [158, 92], lampara: [163, 63], tele: pant, ventanal: [181, 43, 263, 103], cuenco: [200, 128], taburete: [188, 130, 212, 148], calabazas: [[92, 136], [268, 160]] };
}

// lo de delante en la calle de los cincuenta: el coche de aletas aparcado abajo a la izquierda (general) o la bala de
// paja con calabazas y cañas de maíz abajo a la izquierda (porche)
function c_calle50Delante(R, t, o, cerca) {
  const { rect, pset, disco, poligono, linea } = R, K = c_K;
  if (!cerca) {
    const x = 40, s = 176; for (let j = 0; j < 3; j++) rect(x - 44 + j * 2, s + j, x + 50 - j * 2, s + j, hex('#2a2830'));
    poligono([[x - 46, s - 6], [x - 44, s - 16], [x + 50, s - 16], [x + 54, s - 20], [x + 54, s - 6]], C.k); poligono([[x - 45, s - 7], [x - 43, s - 15], [x + 50, s - 15], [x + 53, s - 18], [x + 53, s - 7]], hex('#3ab0b0'));
    rect(x - 44, s - 10, x + 53, s - 9, hex('#f0ece0')); rect(x - 46, s - 6, x + 54, s - 4, hex('#d8dce4'));
    poligono([[x - 22, s - 16], [x - 14, s - 28], [x + 22, s - 28], [x + 32, s - 16]], C.k); poligono([[x - 20, s - 16], [x - 13, s - 27], [x + 21, s - 27], [x + 30, s - 16]], hex('#f0ece0'));
    poligono([[x - 17, s - 17], [x - 12, s - 25], [x + 2, s - 25], [x + 2, s - 17]], hex('#6a7a9a')); poligono([[x + 5, s - 17], [x + 5, s - 25], [x + 20, s - 25], [x + 26, s - 17]], hex('#6a7a9a')); linea(x - 10, s - 24, x - 6, s - 18, hex('#a8b8d0'));
    for (const dx of [-26, 32]) { disco(x + dx, s - 4, 7, C.k); disco(x + dx, s - 4, 6, hex('#2a2a32')); disco(x + dx, s - 4, 3.5, hex('#f0ece0')); disco(x + dx, s - 4, 2, hex('#c8c8d0')); }
    rect(x - 46, s - 13, x - 44, s - 10, hex('#f8e8a0')); rect(x + 52, s - 15, x + 54, s - 11, hex('#e83a3a'));
    return;
  }
  for (let j = 0; j < 4; j++) for (let i = -22; i <= 22; i++) if (c_um(26 + i, 176 + j) < 0.6) pset(26 + i, 176 + j, c_mez(R.pget(26 + i, 176 + j), C.k, 0.3));
  for (let i = 0; i < 8; i++) { const x = 4 + i * 3, a = Math.round(Math.sin(t * 1.2 + i) * 1); linea(x, 150, x - 2 + i + a, 96 + (i % 3) * 6, i % 2 ? hex('#c8a860') : hex('#a88a48')); linea(x - 2 + i + a, 96 + (i % 3) * 6, x - 8 + i * 2 + a, 90 + (i % 4) * 3, hex('#d8bc78')); }
  rect(0, 150, 50, 176, C.k); for (let y = 151; y < 176; y++) for (let x = 1; x < 50; x++) pset(x, y, (y - 151) % 8 === 7 ? K.pajaD : (x * 3 + y) % 5 === 0 ? K.pajaS : (x + y * 2) % 7 === 0 ? K.pajaL : K.paja); rect(1, 157, 49, 157, hex('#6a4a22')); rect(1, 169, 49, 169, hex('#6a4a22'));
  c_calabaza(R, 18, 142, 8, t, false, 4); c_calabaza(R, 36, 145, 5, t, false, 5);
}

// los encuadres de primavera y otoño: [decorado, lo de delante]
const c_ESTACIONES = {
  gallinero: [c_gallinero, c_gallineroDelante],
  jardin: [c_jardin, c_jardinDelante],
  pensilvania: [c_granja, c_granjaDelante],
  aldea: [c_aldea, c_aldeaDelante],
  calle1927: [c_calle27, c_calle27Delante],
  calle50: [c_calle50, c_calle50Delante],
};

// desenfoca el rectángulo (x0, y0)–(x1, y1) del búfer actual con dos pasadas de caja de radio r (solo para capas fijas)
function b_desenfoca(R, x0, y0, x1, y1, r) {
  const B = R.buf, W = x1 - x0 + 1, H = y1 - y0 + 1, ch = [new Float32Array(W * H), new Float32Array(W * H), new Float32Array(W * H)], tmp = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const c = B[(y + y0) * 320 + x + x0]; ch[0][y * W + x] = c & 255; ch[1][y * W + x] = (c >>> 8) & 255; ch[2][y * W + x] = (c >>> 16) & 255; }
  for (let pas = 0; pas < 2; pas++) for (const A of ch) {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let s = 0, n = 0; for (let i = -r; i <= r; i++) { const X = x + i; if (X >= 0 && X < W) { s += A[y * W + X]; n++; } } tmp[y * W + x] = s / n; }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let s = 0, n = 0; for (let j = -r; j <= r; j++) { const Y = y + j; if (Y >= 0 && Y < H) { s += tmp[Y * W + x]; n++; } } A[y * W + x] = s / n; } }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; B[(y + y0) * 320 + x + x0] = (0xff000000 | (Math.round(ch[2][i]) << 16) | (Math.round(ch[1][i]) << 8) | Math.round(ch[0][i])) >>> 0; }
}

// el muro encalado de la cocina de cerca (y 8–84, sobre la textura de cal ya pintada): el grano de la cal, las piedras
// que se adivinan bajo el encalado, dos desconchones con la piedra al aire, grietas, el cedazo colgado de un clavo y el
// colgador de los cacharros (cucharón, espumadera, cuchara de palo y un cazo de cobre); la esquina de Atom queda en cal lisa
function b_galMuro(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, K = c_K, calma = (x, y) => (x >= 274 && y <= 48) || y < 16;
  for (let y = 8; y < 84; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 833); if (q < 0.07) B[y * 320 + x] = K.calS; else if (q > 0.95 && !calma(x, y)) B[y * 320 + x] = K.calL; }
  // las juntas de las piedras, a medias bajo la cal
  for (let y = 16; y < 82;) { const alto = 9 + Math.floor(h(y, 0, 833) * 4); let x = -Math.floor(h(y, 1, 833) * 12);
    while (x < 320) { const w = 14 + Math.floor(h(x + 400, y, 834) * 14);
      for (let i = 0; i < w; i++) { const X = x + i; if (X >= 0 && X < 320 && !calma(X, y) && h(X, y, 835) < 0.5) { B[y * 320 + X] = K.calS; if (h(X, y, 838) < 0.25 && y + 1 < 84) B[(y + 1) * 320 + X] = K.calL; } }
      for (let j = 1; j < alto; j++) if (x >= 0 && y + j < 84 && !calma(x, y + j) && h(x, y + j, 836) < 0.5) B[(y + j) * 320 + x] = K.calS;
      x += w; }
    y += alto; }
  // los desconchones: la piedra gris al aire, con su borde de cal rota
  for (const [cx, cy, rx, ry] of [[146, 28, 10, 6], [122, 74, 13, 5], [34, 72, 7, 4]]) for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x, y, 839) - 0.5) * 0.5; if (d > 1.25) continue;
    pset(x, y, d > 0.95 ? K.calD : d > 0.8 ? hex('#c4b494') : (y - cy + Math.round((x - cx) * 0.2)) % 5 === 0 || h(x >> 2, y, 840) < 0.08 ? hex('#7e7262') : h(x, y, 841) < 0.3 ? hex('#a09482') : hex('#b4a892')); }
  // las grietas finas
  for (const [x0, y0, n, k] of [[58, 40, 22, 0], [226, 22, 18, 1], [180, 58, 14, 2]]) { let x = x0, y = y0; for (let i = 0; i < n; i++) { pset(x, y, K.calD); if (i % 4 === 0) pset(x + 1, y, K.calS); y++; x += h(i, k, 842) < 0.33 ? -1 : h(i, k, 842) > 0.7 ? 1 : 0; } }
  // el cedazo de aro de madera, colgado de su clavo
  pset(162, 59, C.k); linea(162, 59, 157, 63, hex('#6a5a3a')); linea(162, 59, 167, 63, hex('#6a5a3a'));
  disco(162, 71, 9, C.k); disco(162, 71, 8, K.vigaL); disco(162, 71, 6, hex('#8a6a48'));
  for (let y = 65; y <= 77; y++) for (let x = 156; x <= 168; x++) if (Math.hypot(x - 162, y - 71) < 5.6) pset(x, y, (x + y) % 2 ? hex('#c8b088') : hex('#9a7e58'));
  pset(158, 67, hex('#e8d0a0')); pset(157, 69, hex('#e8d0a0')); for (let y = 72; y < 80; y++) if (c_um(162, y) < 0.5) pset(163 + ((y - 72) >> 1), y + 8, c_mez(B[(y + 8) * 320 + 163], C.k, 0.15));
  // el colgador de los cacharros: la tabla con sus clavijas y lo que cuelga de ella
  rect(176, 58, 226, 62, C.k); rect(177, 59, 225, 61, K.viga); rect(177, 59, 225, 59, K.vigaL); for (const x of [180, 223]) pset(x, 60, hex('#2a1a10'));
  for (let y = 63; y < 66; y++) for (let x = 177; x < 226; x++) if (c_um(x, y) < 0.4) pset(x, y, c_mez(B[y * 320 + x], C.k, 0.18));
  // el cucharón de hierro
  rect(184, 62, 185, 77, C.k); rect(184, 62, 184, 76, hex('#7a7a84')); disco(185, 80, 4, C.k); disco(185, 80, 3, hex('#5a5a64')); rect(182, 78, 188, 78, hex('#8a8a94')); pset(183, 81, hex('#9a9aa4'));
  // la espumadera con sus agujeros
  rect(196, 62, 197, 72, C.k); rect(196, 62, 196, 72, hex('#7a7a84')); disco(196, 77, 5, C.k); disco(196, 77, 4, hex('#9a9aa4')); for (const [a, b] of [[-2, -1], [1, -2], [0, 1], [2, 1], [-1, 3], [-3, 1]]) pset(196 + a, 77 + b, hex('#3a3a44')); pset(194, 75, hex('#c8c8d0'));
  // la cuchara de palo
  rect(207, 62, 208, 76, C.k); rect(207, 62, 207, 75, hex('#c89a62')); disco(207.5, 79, 3, C.k); disco(207.5, 79, 2, hex('#b8844e')); pset(207, 78, hex('#e0b882'));
  // el cazo de cobre, colgado del mango
  linea(219, 62, 219, 70, C.k); linea(220, 62, 220, 70, hex('#8a4a22')); disco(219.5, 77, 7, C.k); disco(219.5, 77, 6, hex('#b8602e')); disco(217.5, 75, 3, hex('#d8844a')); pset(216, 74, hex('#f8c890')); rect(214, 82, 225, 83, hex('#7a3a1a'));
  // el hollín del hogar sobre la balda y una mancha de humedad en el rincón del zócalo
  for (let y = 16; y < 34; y++) for (let x = 30; x < 120; x++) if (c_um(x, y) < (34 - y) / 40 * (1 - Math.abs(x - 75) / 45)) B[y * 320 + x] = c_mez(B[y * 320 + x], hex('#6a5a48'), 0.25);
  for (let y = 70; y < 84; y++) for (let x = 0; x < 26; x++) if (c_um(x, y) < (y - 70) / 18 * (1 - x / 26)) B[y * 320 + x] = c_mez(B[y * 320 + x], hex('#a89a70'), 0.35);
}

// el tablero de la mesa de cerca, de tablas vistas desde arriba (y 112–179): vetas onduladas que siguen cada tabla, las
// juntas a tope con sus clavos, nudos con sus anillos, arañazos de cuchillo, el cerco de una jarra, gotas de tinte rojo,
// el cuchillo, cáscaras y migas; se pinta una vez (en un búfer) y lo usan estaciones y estacionesDelante
function b_galTablero(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, K = c_K;
  const VET = [hex('#9a6a42'), hex('#8e623c'), hex('#84583a'), hex('#a8764a'), hex('#b07a50'), hex('#76502f')];
  for (let y = 112; y < 180; y++) { const tab = Math.floor((y - 112) / 11), v = (y - 112) % 11, osc = h(tab, 0, 873) < 0.4 ? 0.12 : 0;
    for (let x = 0; x < 320; x++) {
      const s = Math.sin(x * 0.05 + tab * 1.7 + Math.sin(x * 0.013 + tab * 2.3) * 2.4 + v * 0.85), q = h(x, y, 874);
      let c = y < 114 ? K.vigaL : v === 10 ? K.vigaS : v === 0 ? VET[4] : s > 0.88 ? VET[2] : s > 0.72 ? VET[1] : s < -0.92 ? VET[3] : q < 0.07 ? VET[1] : q > 0.97 ? VET[3] : VET[0];
      if (osc && y >= 114 && v !== 10) c = c_mez(c, VET[5], osc);
      B[y * 320 + x] = c; } }
  // las juntas a tope de cada tabla con sus dos clavos
  for (let tab = 0; tab < 6; tab++) { const y0 = 114 + tab * 11 - (tab ? 2 : 0), y1 = Math.min(179, 112 + tab * 11 + 9); for (const x of [Math.round(40 + h(tab, 1, 875) * 240), Math.round(h(tab, 2, 875) * 60)]) {
    for (let y = y0; y <= y1; y++) { pset(x, y, K.vigaS); pset(x + 1, y, VET[3]); } pset(x - 2, y0 + 2, hex('#3a2a20')); pset(x - 2, y1 - 2, hex('#3a2a20')); pset(x + 3, y0 + 2, hex('#3a2a20')); pset(x + 3, y1 - 2, hex('#3a2a20')); } }
  // los nudos con sus anillos
  for (const [x, y, r] of [[70, 128, 2.5], [250, 168, 2.5], [182, 117, 2], [300, 136, 3], [12, 140, 2]]) { for (let a = 0; a < 3; a++) for (let i = -r - a * 2 - 2; i <= r + a * 2 + 2; i++) { pset(Math.round(x + i), Math.round(y - Math.sqrt(Math.max(0, 1 - (i / (r + a * 2 + 2)) ** 2)) * (1 + a)), a === 1 ? VET[3] : VET[2]); }
    disco(x, y, r, hex('#6a4028')); pset(x, y, hex('#4a2a18')); pset(x - 1, y - 1, hex('#8a5a38')); }
  // los arañazos del cuchillo, el cerco de una jarra y las gotas de tinte
  for (let i = 0; i < 26; i++) { const x = Math.round(h(i, 1, 876) * 310), y = 116 + Math.round(h(i, 2, 876) * 60), l = 3 + Math.round(h(i, 3, 876) * 6); linea(x, y, x + l, y + (i % 3) - 1, i % 4 ? VET[4] : VET[5]); }
  for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; if (a % 7) pset(Math.round(268 + Math.cos(an) * 9), Math.round(124 + Math.sin(an) * 4), hex('#6e4a30')); }
  for (const [x, y, r] of [[106, 152, 1.5], [112, 158, 1], [168, 152, 1], [172, 160, 1.5], [98, 147, 1]]) { disco(x, y, r, K.tinteS); pset(Math.round(x), Math.round(y - r + 0.5), K.tinte); }
  // el cuchillo de cocina, abajo a la izquierda, y unas cáscaras de huevo
  linea(10, 170, 34, 162, C.k); linea(10, 171, 34, 163, C.k); linea(11, 169, 33, 162, hex('#c8ccd4')); linea(12, 170, 33, 163, hex('#8a8e98')); rect(35, 159, 50, 163, C.k); rect(36, 160, 49, 162, hex('#6a3a1e')); rect(36, 160, 49, 160, hex('#9a5e34')); pset(40, 161, hex('#c8a040')); pset(45, 161, hex('#c8a040'));
  for (let y = 165; y < 168; y++) for (let x = 14; x < 52; x++) if (c_um(x, y) < 0.45 && x > 10 + (168 - y) * 3) pset(x, y, c_mez(B[y * 320 + x], C.k, 0.3));
  for (const [x, y] of [[66, 166], [74, 170], [60, 174]]) { disco(x, y, 2.5, C.k); disco(x, y, 2, K.huevo); rect(x - 1, y - 1, x + 1, y - 1, K.huevoS); pset(x - 1, y, hex('#fff8ec')); }
  for (let i = 0; i < 14; i++) pset(Math.round(80 + h(i, 1, 877) * 30), Math.round(160 + h(i, 2, 877) * 16), i % 2 ? hex('#d8b080') : hex('#f0d8a8'));
  // la luz de la ventana sobre el tablero (a la derecha) y la sombra del rincón (a la izquierda)
  for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) { const l = Math.max(0, 1 - Math.hypot((x - 250) / 120, (y - 130) / 40)), s2 = Math.max(0, 1 - Math.hypot(x / 90, (180 - y) / 40));
    if (l > 0 && c_um(x, y) < l * 0.5) B[y * 320 + x] = c_mez(B[y * 320 + x], hex('#ffe8c0'), 0.18); else if (s2 > 0 && c_um(x, y) < s2 * 0.6) B[y * 320 + x] = c_mez(B[y * 320 + x], C.k, 0.2); }
}

// copia las filas y0–y1 de un búfer a la pantalla (un trozo de un recorrido)
function b_pegaFilas(R, b, y0, y1) { R.buf.set(b.subarray(y0 * 320, (y1 + 1) * 320), y0 * 320); }

// mezcla de dos búferes del mismo dibujo (a con u = 0, b con u = 1) color a color, sin trama: la mezcla se guarda en
// un búfer por cada 1/24 de u, así que el cielo de la noche que cae queda liso y tranquilo (la trama de dos cielos muy
// distintos llenaba de puntos la zona de Atom y la barra del año); transp: solo lo pintado (≠ 0) de los dos
function b_mezclaCapas(R, clave, a, b, u, transp) {
  const q = Math.round(Math.max(0, Math.min(1, u)) * 24);
  if (q === 0 || q === 24) return c_pegar2(R, a, b, q / 24, transp);
  const m = c_capa(R, 'mez-' + clave + '-' + q, () => { const M = R.buf, k = q / 24; for (let i = 0; i < 57600; i++) { const ca = a[i], cb = b[i]; M[i] = ca && cb ? c_mez(ca, cb, k) : (k < 0.5 ? ca : cb); } });
  if (transp) c_pegar(R, m); else R.copiar(m);
}

// murciélagos que revolotean de noche entre y0 e y1 (aleteo rápido, vuelo en zigzag); no entran en la esquina de Atom
function b_murcielagos(R, t, n, y0, y1) {
  for (let k = 0; k < n; k++) { const v = 14 + k * 5, span = 380, x = ((h(k, 1, 1090) * span + t * v * (k % 2 ? 1 : -1)) % span + span) % span - 30, y = y0 + (y1 - y0) * h(k, 2, 1090) + Math.sin(t * 3.1 + k * 2) * 5 + Math.sin(t * 7.3 + k) * 1.5;
    if (x < 0 || x > 319 || (x > 268 && y < 50)) continue; const X = Math.round(x), Y = Math.round(y), a = Math.sin(t * 22 + k * 3) > 0, col = hex('#0a0814');
    R.pset(X, Y, col); R.pset(X, Y + 1, col); R.pset(X - 1, Y + (a ? -1 : 1), col); R.pset(X + 1, Y + (a ? -1 : 1), col); R.pset(X - 2, Y + (a ? -2 : 1), col); R.pset(X + 2, Y + (a ? -2 : 1), col); R.pset(X - 3, Y + (a ? -2 : 0), col); R.pset(X + 3, Y + (a ? -2 : 0), col); }
}
