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
// o.encuadre (y o.camara, 'general' por omisión o la segunda que dice cada uno):
//   'castillo': el castillo de noche desde la orilla del lago: cielo tramado con estrellas que titilan, la luna con su halo,
//     nubes de tres tonos a tres velocidades, dos cordilleras, el castillo sobre su peñasco (torres de tejado cónico, el Gran
//     Comedor con sus ventanales, la torre más alta, el puente cubierto) con ventanas que se encienden y se apagan, el lago
//     que se mueve y refleja el castillo y la luna, el embarcadero con su farol y dos barcas que cabecean, lechuzas y
//     murciélagos. o.barcas (0–1): cuatro barquitas con farol cruzan el lago hacia el castillo.
//     o.camara 'cerca': las puertas y la escalinata: fachada de sillares con dos antorchas que chisporrotean, el arco
//     apuntado con tres molduras, las dos hojas de roble con herrajes y aldabas, ventanales de vidriera, la hiedra que se
//     mece, el muro bajo con la lechuza, el patio enlosado con charcos. o.puertas (0–1) abre las hojas: dentro, el vestíbulo
//     dorado con velas que flotan, la escalera y un fantasma que pasa; la luz se derrama por la escalinata.
//   'torre': lo alto de la torre de Astronomía de noche: la luna grande, estrellas, nubes; abajo, el lago y los montes entre
//     las almenas; la garita del caracol con su puerta encendida, el telescopio de latón en su trípode y la mesita con cartas
//     del cielo; el suelo de losas en perspectiva. o.escobas (0–1): cuatro jinetes en escoba llegan desde la derecha y se
//     quedan flotando junto a las almenas. o.camara 'almenas': las almenas de cerca (sillares con musgo, el farol colgado, la
//     gárgola) con el lago y el castillo muy abajo entre ellas; las escobas llegan más grandes.
//   'bosque': el bosque prohibido de noche: troncos enormes con corteza, raíces, troncos lejanos azulados, la niebla que se
//     arrastra a dos velocidades, rayos de luna, ojos que parpadean en lo oscuro, luciérnagas, el sendero de hojarasca.
//     o.centauros (0–1): tres centauros (siluetas con el filo de luna, lejanos, con arco) salen de entre los troncos.
//     o.camara 'claro': el claro con luz de luna: el agujero en las copas con la luna, el charco de luz en el suelo, un tronco
//     caído con musgo, un corro de setas que brilla, helechos, niebla, polillas y ojos en los bordes.
//   'quidditch': el campo de día: cielo tramado con nubes de tres tonos a tres velocidades y pájaros, los montes y el castillo
//     lejos, ocho torres de gradas con lonas a rayas de los cuatro colores (sin letras ni escudos), banderines que ondean y
//     público diminuto que se mueve, los tres aros dorados a cada lado, el césped a franjas con la sombra de las nubes, jugadores
//     lejanos en escoba y el baúl de las pelotas. o.camara 'gradas': una torre de gradas de cerca con el público (bufandas,
//     brazos que se agitan, banderitas), la lona a rayas con su faldón, el andamio de madera y la escalera; la barandilla va
//     delante (exteriorDelante).
//   'cabana': la cabaña de piedra de Hagrid nevando al anochecer: tejado cónico con nieve, el humo de la chimenea, la puerta
//     enorme, la ventana encendida, la leñera, el huerto de calabazas nevadas, el perrazo tumbado que respira y mueve el rabo,
//     los pinos nevados, el castillo lejos con sus luces, huellas en la nieve. o.camara 'puerta': la puerta de cerca (tablones,
//     herrajes, corona de acebo, el farol, la ventana con la tetera al fuego, el paraguas rosa, la leña, carámbanos);
//     o.puerta (0–1) la abre y asoma el perro.
//   'pociones': la sala subterránea: bóveda de nervios, sillares húmedos con musgo, cadenas, el fuego negro en la puerta de
//     la izquierda y el morado en la de la derecha (sus luces tiñen paredes y suelo), gotas que caen al charco; la mesa con
//     las siete botellas y el pergamino va delante (exteriorDelante). o.camara 'mesa': la mesa de cerca, con las siete
//     botellas grandes de formas distintas y el pergamino desenrollado (sin letras), el fuego en los bordes. o.elegida (0–6):
//     la botella que brilla (la pequeña es la 2).
// Devuelve { suelo, … } con la geometría de cada encuadre (puertas, mesa, botellas…). Delante: exteriorDelante(R, t, o),
// después de los actores, con las mismas opciones: los juncos de la orilla, la barandilla de la grada, los helechos del
// bosque, la valla nevada y la mesa del acertijo con las botellas y el pergamino.
export function exterior(R, t, o = {}) {
  const cam = o.camara ?? 'general', f = c_EXT[o.encuadre ?? 'castillo'] ?? c_EXT.castillo;
  return f(R, t, o, cam);
}
// Lo que va DELANTE de los personajes en los exteriores: se llama después de los actores, con las mismas opciones que
// exterior(). Castillo general: los juncos de la orilla (abajo a los lados) que se mecen. Bosque (las dos cámaras): helechos
// en las esquinas de abajo. Quidditch 'gradas': la barandilla de madera (pasamanos y 164, paño 166–171, postes cada 48 px desde x 2, de y 159 a 179), que
// tapa las piernas de quien está detrás en y 168. Cabaña general: una
// mata nevada en la esquina de abajo a la izquierda. Pociones: la mesa del acertijo con las siete botellas y el pergamino
// (general: mesa x 102–218, tablero y 140; de cerca: todo el ancho desde y 136), con o.elegida (0–6) la botella que brilla.
export function exteriorDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'castillo', cam = o.camara ?? 'general';
  if (enc === 'castillo' && cam !== 'cerca') { c_juncos(R, t, 0, 44, 180); c_juncos(R, t, 252, 278, 178, 1); }
  else if (enc === 'bosque') { c_helechos(R, t, 0, 180, 1); c_helechos(R, t, 320, 180, -1); }
  else if (enc === 'quidditch' && cam === 'gradas') c_barandilla(R, t);
  else if (enc === 'cabana' && cam !== 'puerta') { for (const [x, y, r] of [[6, 176, 12], [22, 180, 9]]) { R.disco(x, y, r, hex('#2a3a2a')); R.disco(x - 1, y - 3, r * 0.8, hex('#e8eef8')); R.disco(x - 3, y - 5, r * 0.4, hex('#ffffff')); } }
  else if (enc === 'pociones') c_mesaPociones(R, t, o, cam === 'mesa');
}
// ── E · Lo real detrás de la historia ─────────────────────────────────────────────────────────────────────────────────
// Lugares y épocas reales, con respeto: la escritora es una figura pequeña que ponen las escenas. Sin letras: los libros,
// los carteles y los periódicos van insinuados con barras y trazos. Cada encuadre tiene su fondo fijo en un búfer (se
// pinta una vez) y encima, en cada fotograma, la vida: nubes de tres tonos a tres velocidades, pájaros, vapor, lluvia,
// gente pequeña de fondo, luces que titilan y máquinas que giran.
// o.encuadre:
//   'tren': el interior de un vagón británico de 1990 parado en el campo, de día: techo crema con plafones (uno titila),
//     portaequipajes con maletas, tres ventanillas de esquinas redondas con cortinillas, respaldos de moqueta azul con su
//     paño blanco, mesitas pegadas a la pared con té humeante y periódico, moqueta en el suelo y dos pasajeros de fondo
//     (uno lee el periódico y pasa la hoja; una señora dormita en el otro extremo). Por las ventanillas, el campo inglés:
//     colinas, prados en mosaico con setos, una granja con humo, postes de telégrafo con sus cables, vacas que pastan,
//     ovejas, nubes y pájaros. o.camara 'general' (suelo 158; la mesa del centro, libre para la escritora) o
//     'ventanilla' (una ventanilla grande con el campo de cerca, la mesita con el té y la libreta, y sitio para la
//     escritora delante y para un globo de pensamiento dentro del cristal). Devuelve { suelo, ventana: [x0, y0, x1, y1] }
//     (el cristal donde se recorta lo que pase por fuera, como la lechuza).
//   'cafe': un café de Edimburgo de los noventa: friso de madera, pared verde con molduras, lámparas de globo que se
//     mecen, una ventana de cuarterones a una calle de piedra con lluvia fina (fachadas de arenisca, adoquines mojados,
//     gente con paraguas, un autobús granate), el mostrador con la cafetera que echa vapor, tarta bajo campana, la
//     camarera de fondo, mesitas con un cliente que lee el periódico, suelo de tablas. o.carrito (por omisión true): el
//     cochecito con el bebé dormido junto a la mesa de la ventana (se mece). o.camara 'general' (suelo 160) o 'mesa' (la
//     mesa junto a la ventana de cerca, con gotas que resbalan por el cristal; delante, con realDelante, el tablero con
//     la libreta —o.escrito 0–1: cuántas líneas lleva—, el café humeante, folios y bolígrafo). Devuelve { suelo, mesa, ventana }.
//   'imprenta': una imprenta pequeña de 1997: nave de ladrillo con cerchas de acero y ventanales con haces de luz y motas,
//     la máquina encuadernadora con rodillos que giran, manómetros y pilotos, la cinta que lleva los libros de tapa dura a
//     la pila, palés con resmas, cajas de cartón, una transpaleta y dos operarios de fondo. o.libros (0–1): cuánto ha
//     crecido la pila. o.camara 'general' (suelo 162) o 'pila' (el palé de cerca, con los libros en columnas, cajas
//     abiertas, la cinta que deja caer libros, el reloj de pared y el corcho). Devuelve { suelo, pila: [x0, yTope, x1], … }.
//   'paris': el París de hacia 1400: casas de entramado con pisos volados, una casa de piedra, tejados con chimeneas que
//     humean, las torres de Notre-Dame a lo lejos, el puesto del escribano con toldo que ondea y pergaminos colgados,
//     adoquines con el arroyo del centro, palomas, una gallina, un gato y paseantes pequeños. o.camara 'general' (suelo
//     166; el escribano detrás de su mostrador, que pinta realDelante) o 'casa' (la fachada de piedra de la casa de 1407
//     de cerca, con su puerta claveteada, ventanas emplomadas, figuras talladas y el año grabado: o.anio, por omisión
//     '1407', con a_cifras). Devuelve { suelo, puesto | puerta, … }.
//   'museo': una sala de museo: claraboya, paredes con molduras y cuadros con marco dorado, parqué en espiga con brillo,
//     vitrinas con piezas medievales, la lápida antigua en su peana bajo un foco, detrás de un cordón de terciopelo, un
//     vigilante sentado que da cabezadas, visitantes de fondo y una cámara de seguridad que parpadea. o.camara 'general'
//     (suelo 166) o 'lapida' (la lápida de cerca con sus relieves, el foco y las motas, el cordón y la cartela sin letras).
//   'subasta': una sala de subastas: tela verde con molduras doradas, dos arañas de luz, la pantalla con la cifra
//     (o.cifra, por omisión '471000', con a_cifras) y su fila de divisas, el libro en una vitrina con foco, la mesa de los
//     teléfonos con tres empleados de fondo, y o.montana (0–1): la montaña de libros que crece detrás hasta el techo.
//     Delante (realDelante), el atril y la fila de pujadores de espaldas que levantan la paleta. o.camara 'general' (suelo
//     154 para el subastador en la tarima, 160 en la sala) o 'atril' (el atril de cerca con el martillo y la pantalla
//     grande detrás). Devuelve { suelo, pantalla, atril, … }.
// Delante: realDelante(R, t, o) con las mismas opciones, después de los actores: los respaldos del vagón ('tren'), la
// mesa del café ('cafe'), el mostrador del escribano ('paris' general), el atril y los pujadores ('subasta'). En 'cafe' y
// 'subasta' 'atril' pinta además lo que va encima (la libreta, el martillo: o.martillo false lo quita para que la escena
// lo ponga en una mano; o.golpe 0–1 hace saltar el polvo del taco).
export function real(R, t, o = {}) {
  const enc = o.encuadre ?? 'tren', cam = o.camara ?? 'general';
  if (enc === 'cafe') return d_cafe(R, t, o, cam);
  if (enc === 'imprenta') return d_imprenta(R, t, o, cam);
  if (enc === 'paris') return d_paris(R, t, o, cam);
  if (enc === 'museo') return d_museo(R, t, o, cam);
  if (enc === 'subasta') return d_subasta(R, t, o, cam);
  return d_tren(R, t, o, cam);
}
// lo que va delante de los personajes en cada encuadre de lo real (se llama después de los actores)
export function realDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'tren', cam = o.camara ?? 'general';
  if (enc === 'tren') d_trenDelante(R, t, o, cam);
  else if (enc === 'cafe') d_cafeDelante(R, t, o, cam);
  else if (enc === 'paris' && cam === 'general') d_parisDelante(R, t, o);
  else if (enc === 'subasta') d_subastaDelante(R, t, o, cam);
}
// ── F · Hoy ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// El presente (2026), de noche y en invierno. Cada encuadre pinta los 320 × 180 cada fotograma: lo fijo va en un búfer
// (e_fijo) y encima la vida animada. o.encuadre:
//   'salon': el salón de una fan en Navidad. Papel pintado verde de damasco con su moldura y el friso de cuarterones, la
//     tarima de tablas con la alfombra y unas zapatillas; la ventana con cortinas de terciopelo y su guirnalda de luces, y por ella la calle
//     nevada (tejados con nieve, ventanas que se encienden, la farola, el humo de las chimeneas, un coche que pasa, todo
//     recortado al hueco); el sofá de terciopelo azul con cojines y la manta de cuadros; la corona en la pared; la chimenea
//     de ladrillo con el cesto de la leña, el fuego vivo (llamas, chispas y el resplandor que tiembla en el suelo), la repisa con ramas, luces,
//     dos velas y un reloj que anda, cuatro calcetines que se mecen y el cuadro de un lago con su castillo; la cómoda de la
//     tele con la consola (piloto que late), la lámpara encendida, la balda con SIETE libros sin letras, los sujetalibros y
//     una lechucita; el árbol con bolas, espumillón, luces de colores que parpadean y la estrella; los regalos al pie, y un
//     gato que duerme junto al fuego y respira. La tele: o.pantalla(R, t, [x0, y0, x1, y1]) pinta dentro (con R.recorte
//     ya puesto; usa pset, linea, disco o poligono, no R.rect); sin ella, un menú de series insinuado sin logos ni letras.
//     o.camara 'general' (todo el salón) o 'sofa' (el sofá grande de frente bajo la ventana nevada, el árbol asomando por la
//     izquierda y la tele GRANDE a la derecha, con su luz azul que tiembla en el sofá; o.libro (true por omisión): sobre la
//     mesa baja, el libro boca abajo con la piedra roja en la tapa, que va en hoyDelante).
//   'corcho': el cuarto de estudio de la fan de noche: pared de yeso con su grano, el corcho grande con marco de roble y,
//     clavadas con chinchetas, las cuatro pistas (1 las gafas redondas, 2 la lista de reparto con caras y renglones, 3 unas
//     tijeras sobre un rollo de película, 4 el «?» con la moto voladora) y el relleno (un mapa con su camino, notas
//     adhesivas, la hoja del calendario con el 25, el billete con el 9 3/4, la foto del castillo, la ficha del rayo), todo
//     unido con hilo rojo; o.pistas (0–4, admite decimales para encender la siguiente poco a poco; sin la opción, todas
//     normales): las encendidas brillan con su marco dorado y el hilo que las une se enciende y le corre un pulso; las
//     apagadas se oscurecen. Escritorio con el flexo encendido (su luz baña el corcho), el portátil, el bote de lápices y
//     la ventanita con nieve, el reloj de pared que anda, la papelera con bolas de papel; a la derecha, la librería
//     con un gato negro que parpadea y mueve la cola. o.camara 'general' o 'cerca' (el
//     corcho a toda pantalla, las pistas al doble, y debajo el tablero de la mesa con el ovillo rojo, la caja de
//     chinchetas, la lupa, las tijeras y la taza que humea).
//   'plato': un plató de rodaje (las naves de Leavesden por dentro): la parrilla de focos colgados del techo, las paredes
//     acolchadas, el decorado del Gran Comedor a medio montar (muro de piedra pintada con su ventanal gótico iluminado por
//     detrás, pilares, antorchas que titilan, dos estandartes sin escudos, un tramo de mesa larga con su banco) y su otra
//     mitad en contrachapado desnudo con riostras, el andamio con un pintor que pinta y un carpintero que clava; el suelo
//     de hormigón con cinta, cables y la vía del travelín; la grúa con la cámara que sube y baja despacio (piloto rojo),
//     el foco de pie con viseras y su haz con motas, la mesa de vídeo con su monitor (o.pantalla, como la tele; sin ella,
//     el castillo de noche), la silla de director y la claqueta sin letras sobre unas cajas (o.claqueta 0–1: abierta;
//     0 cerrada). Un tramoyista cruza con un tablón; en el suelo, sacos de arena, el rollo de cable y la caja de herramientas. o.camara 'general' o 'monitor' (el monitor grande con su visera y el
//     marco de grabación con el código de tiempo que corre y el punto rojo, el carrito con los cascos, el guion, el
//     walkie y el café que humea; dos sillas de director a la izquierda y el plató desenfocado detrás, con sus manchas de
//     luz, las velas de la mesa y alguien del equipo que cruza borroso). o.hud (true): el marco de grabación encima de lo que pinte o.pantalla.
//   'montaje': la sala de montaje de 2001 de noche: paredes de espuma acústica, la estantería metálica con latas de
//     película, el tablero con las fotos de las escenas en filas, la moviola de mesa con sus cuatro platos que giran
//     (o.gira, 1 por omisión; 0 parada), la película que corre por los rodillos y el visor encendido (o.pantalla, como la
//     tele; sin ella, un fotograma que parpadea con su contador), la lámpara de brazo, el colgador de tiras de película
//     sobre su saco con ruedas (las tiras se mecen), el monitor de tubo con la línea de tiempo y la torre, la silla del montador, latas apiladas en el suelo; la moqueta con
//     recortes de película por el suelo. o.camara 'general' o 'moviola' (la mesa de cerca, los dos platos grandes, la
//     película que corre por la ventanilla con sus perforaciones, la empalmadora en el borde de delante, el lápiz graso, los guantes blancos, la balda
//     de latas con el altavoz, el visor grande
//     y, a la derecha, el saco de las tiras con su suelo libre).
// Delante (llama a hoyDelante con las mismas opciones después de los actores): en el salón general, la mesa baja con las
// palomitas, la taza que humea, el mando y un libro; en 'sofa', la mesa baja con el libro de la piedra roja (o.libro), las
// palomitas, la taza y la vela en su tarro; en el plató general, los cables del suelo de delante y el pie del foco; en
// montaje general, la papelera de rejilla rebosante de recortes; en 'moviola', el canto de delante de la mesa con la tira
// que cuelga. El corcho no lleva nada delante.
// Devuelve { suelo, pantalla, … } con la geometría de cada encuadre (ver los return).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'corcho') return e_corcho(R, t, o, cam === 'cerca');
  if (enc === 'plato') return e_plato(R, t, o, cam === 'monitor');
  if (enc === 'montaje') return e_montaje(R, t, o, cam === 'moviola');
  return e_salon(R, t, o, cam === 'sofa');
}
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'salon') return cam === 'sofa' ? e_mesaBaja(R, t, 66, 176, 154, o.libro ?? true) : e_mesaBaja(R, t, 116, 202, 160, false);
  if (enc === 'plato' && cam !== 'monitor') return e_platoDelante(R, t);
  if (enc === 'montaje') return cam === 'moviola' ? e_moviolaDelante(R, t) : e_papelera(R, t, 252, 176);
}
// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// La snitch con ojos (PIEZAS_HP.snitch del reparto), animada: aletea, revolotea en un ocho alrededor de (x, y) con o.vuela
// (0–1), se esconde detrás de algo con o.esconde, o.expresion 'normal'|'susto'|'risa'; o.s escala. Devuelve { x, y }.
export function snitch(R, x, y, t, o = {}) {
  const v = o.vuela ?? 0, X = x + Math.sin(t * 2.3) * 10 * v, Y = y + Math.sin(t * 4.6) * 4 * v;
  if (PIEZAS_HP.snitch) PIEZAS_HP.snitch(R, X, Y, { ...o, t });
  else R.disco(X, Y - 3, 3, C.oroS);
  return { x: X, y: Y };
}

const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de la trama 4 × 4 (Bayer) para degradados y brillos tramados
const e_b4 = (x, y) => e_B4[((y & 3) << 2) | (x & 3)];

// la mezcla de dos colores (a: cuánto del segundo)
const e_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// aclara (o tiñe) el píxel (x, y) hacia el color c en la proporción a
const e_tine = (R, x, y, c, a) => { const p = R.pget(x, y); if (p) R.pset(x, y, e_mezcla(p, c, a)); };

// un color de la paleta hecho a partir de una lista de hex
const e_hx = (l) => l.map(hex);

const e_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en su búfer (R.nuevo) y se copia en cada fotograma
function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un rectángulo que sí respeta un recorte cl = [x0, y0, x1, y1] (R.rect no lo respeta)
function e_rectC(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// un resplandor que tiñe lo que hay debajo (no lo tapa): radio r, color c, fuerza a, aplastado en vertical por ry
function e_resplandor(R, cx, cy, r, c, a, ry = 1) {
  for (let y = Math.floor(cy - r * ry); y <= cy + r * ry; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) / ry) / r; if (g > 0 && g * a > e_b4(x, y) * 0.5) e_tine(R, x, y, c, Math.min(0.85, g * a)); }
}

// vapor que sube de una taza (x, y: la boca) en bocanadas que crecen y se deshacen por el borde
function e_vapor(R, x, y, t, k = 0, col = hex('#e8e4f0'), alto = 14) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.32 + i / 3 + k * 0.29) % 1, r = 1.2 + u * 2.8, cx = x + Math.sin(u * 6 + k + t * 0.7) * 1.6, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (e_b4(xx, yy) < (1.05 - u) * (1.2 - d) * 0.8) e_tine(R, xx, yy, col, 0.55 * (1 - u * 0.6)); } }
}

// las luces de Navidad: rojo, oro, verde, azul y rosa, encendidas y apagadas
const E_LUZ = e_hx(['#ff5a4a', '#ffd84a', '#5ae07a', '#5ab4ff', '#ff86e0']), E_LUZA = e_hx(['#7a2a2a', '#7a6420', '#2a6a3a', '#2a4a7a', '#7a3a6a']);

// una bombilla de colores (x, y) que parpadea a su ritmo (k: su semilla); con su brillo alrededor cuando luce
function e_bombilla(R, x, y, t, k, fuerte = 1) {
  const c = k % 5, on = Math.sin(t * (1.3 + (k % 4) * 0.45) + k * 2.1) > -0.35;
  if (on) { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) e_tine(R, x + dx, y + dy, E_LUZ[c], 0.45 * fuerte); R.pset(x, y, E_LUZ[c]); if (fuerte > 0.8) R.pset(x, y - 1, e_mezcla(E_LUZ[c], hex('#ffffff'), 0.5)); }
  else R.pset(x, y, E_LUZA[c]);
}

// una guirnalda de luces colgada entre dos puntos, con su comba (cae píxeles en el centro) y n bombillas
function e_guirnalda(R, x0, y0, x1, y1, cae, n, t, k = 0, cable = hex('#1e2a1e')) {
  const P = (u) => [Math.round(x0 + (x1 - x0) * u), Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * cae)];
  const L = Math.max(4, Math.abs(x1 - x0)); let ant = P(0);
  for (let i = 1; i <= L; i++) { const p = P(i / L); R.linea(ant[0], ant[1], p[0], p[1], cable); ant = p; }
  for (let i = 0; i < n; i++) { const [x, y] = P((i + 0.5) / n); e_bombilla(R, x, y + 1, t, i + k); }
}

// la nieve que cae (dentro del recorte que tenga puesto el llamador): copos de dos tamaños a tres velocidades
function e_nieve(R, t, x0, y0, x1, y1, n = 36, k = 0) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const v = 5 + (i % 3) * 4, x = x0 + ((Math.round(h(i, 1, 600 + k) * W + Math.sin(t * 0.9 + i) * 2.5 + t * 2) % W) + W) % W, y = y0 + Math.round(h(i, 2, 600 + k) * H + t * v) % H;
    R.pset(x, y, i % 3 === 2 ? hex('#ffffff') : hex('#c8d8f0')); if (i % 5 === 0) { R.pset(x + 1, y, hex('#e8f0ff')); R.pset(x, y + 1, hex('#e8f0ff')); R.pset(x + 1, y + 1, hex('#ffffff')); } }
}

// el papel pintado de damasco: rayas finas, un rombo con sus puntos, y la luz cálida que da luz(x, y) (0–1); en tranq(x, y)
// queda liso de motivo (la esquina de Atom)
const E_PAPEL = e_hx(['#16302a', '#1f3c33', '#2a4c3f', '#38604f', '#4c7660']);

function e_papel(R, x0, y0, x1, y1, luz, tranq = () => false) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let v = 1 + luz(x, y) * 2.4; const mx = ((x % 14) + 14) % 14, my = ((y % 18) + 18) % 18, q = tranq(x, y);
    if (mx < 2) v -= q ? 0.3 : 0.7;
    else if (!q) { const d = Math.abs(mx - 8) + Math.abs(my - 9); if (d === 3 || d === 0) v += 0.9; else if (d < 3) v += 0.35; if ((mx === 8 && (my === 2 || my === 16)) || ((mx === 4 || mx === 12) && my === 9)) v += 0.8; }
    let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; R.pset(x, y, E_PAPEL[Math.max(0, Math.min(4, l))]);
  }
}

// una moldura de techo (cornisa) de madera pintada: filo oscuro, cuerpo, luz y los dentículos
function e_cornisa(R, y0, c = e_hx(['#2a1a12', '#5a3a26', '#7a5236', '#9a7050'])) {
  const { rect, pset } = R; rect(0, y0, 319, y0 + 1, c[1]); rect(0, y0 + 2, 319, y0 + 3, c[2]); rect(0, y0 + 4, 319, y0 + 4, c[3]); rect(0, y0 + 5, 319, y0 + 5, c[0]);
  for (let x = 0; x < 320; x += 4) { rect(x, y0 + 6, x + 1, y0 + 7, c[1]); pset(x, y0 + 6, c[2]); } rect(0, y0 + 8, 319, y0 + 8, c[0]);
}

// el friso de cuarterones de madera (y0–y1, con el junquillo arriba y el rodapié abajo); luz(x) aclara
const E_MAD = e_hx(['#24140c', '#3e2416', '#5a3620', '#74482a', '#946038', '#b47e4c']);

function e_friso(R, x0, x1, y0, y1, luz = () => 0) {
  const { rect, pset } = R, M = E_MAD;
  rect(x0, y0, x1, y1, M[2]);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (h(x >> 1, y * 7, 640) < 0.18) pset(x, y, M[(x + y) % 3 ? 1 : 3]);
  rect(x0, y0, x1, y0 + 1, M[4]); rect(x0, y0 + 2, x1, y0 + 2, M[1]); rect(x0, y0, x1, y0, M[5]);
  for (let x = x0 + 4; x + 22 <= x1; x += 28) { const a = y0 + 6, b = y1 - 7;
    rect(x, a, x + 22, b, M[1]); rect(x + 1, a + 1, x + 22, b, M[3]); rect(x + 2, a + 2, x + 21, b - 1, M[2]); rect(x + 3, a + 3, x + 20, b - 2, M[3]);
    for (let g = 0; g < 3; g++) { const gx = x + 6 + g * 6; for (let y = a + 4; y < b - 2; y++) if (h(gx, y >> 2, 641 + g) < 0.6) pset(gx + (y % 9 < 4 ? 0 : 1), y, M[2]); }
    rect(x + 21, a + 2, x + 21, b - 1, M[1]); rect(x + 2, b - 1, x + 21, b - 1, M[1]); rect(x + 2, a + 2, x + 20, a + 2, M[4]); }
  rect(x0, y1 - 4, x1, y1, M[1]); rect(x0, y1 - 4, x1, y1 - 4, M[4]); rect(x0, y1 - 3, x1, y1 - 3, M[3]);
  for (let x = x0; x <= x1; x++) { const l = luz(x); if (l > 0) for (let y = y0; y <= y1; y++) if (l > e_b4(x, y) + 0.2) e_tine(R, x, y, hex('#ffd890'), 0.18); }
}

// la tarima de tablas vista de frente y un poco desde arriba: filas que crecen hacia nosotros, juntas a matajunta, vetas,
// nudos y el brillo de las luces; luz(x, y) (−1–1) aclara u oscurece
const E_TAR = e_hx(['#2a1810', '#43281a', '#5a3622', '#70442a', '#885636', '#a46c44']);

function e_tarima(R, y0, y1, luz = () => 0, k = 0) {
  const { pset } = R; let y = y0, f = 0;
  while (y <= y1) { const alto = Math.round(3 + (y - y0) * 0.16), yb = Math.min(y1, y + alto - 1);
    let x = -Math.round(h(f, 1, 650 + k) * 60); const cortes = [];
    while (x < 320) { cortes.push(x); x += 46 + Math.round(h(x, f, 651 + k) * 40); }
    for (let yy = y; yy <= yb; yy++) for (let xx = 0; xx < 320; xx++) {
      let tabla = 0; for (let i = 0; i < cortes.length; i++) if (xx >= cortes[i]) tabla = i;
      const tono = h(tabla, f, 652 + k), veta = Math.sin(xx * 0.06 + tono * 9 + (yy - y) * 1.7) > 0.86 ? -0.7 : 0;
      let v = 2.4 + tono * 0.9 + veta + luz(xx, yy) * 2 + (yy === y ? 0.8 : 0) + (yy === yb ? -0.9 : 0);
      if (xx === cortes[tabla] || xx === cortes[tabla] - 1) v -= 1.2;
      let l = Math.floor(v); if (v - l > e_b4(xx, yy)) l++; pset(xx, yy, E_TAR[Math.max(0, Math.min(5, l))]);
    }
    y = yb + 1; f++; }
}

// una alfombra ovalada de lana (centro, radios): el campo, la cenefa de dos colores, los flecos y su trama
function e_alfombra(R, cx, cy, rx, ry, c = e_hx(['#5a1a22', '#8a2a30', '#a8403a', '#e8c890', '#2a4a3a'])) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d > 1) continue;
    const x = cx + i, y = cy + j; let col = d > 0.9 ? c[0] : d > 0.82 ? (((i >> 1) + (j >> 0)) & 1 ? c[3] : c[4]) : d > 0.76 ? c[0] : d < 0.3 ? (((i >> 2) ^ (j >> 1)) & 1 ? c[2] : c[3]) : (Math.abs(((i >> 2) + (j >> 1)) % 4) === 0 ? c[2] : c[1]);
    if (e_b4(x, y) < 0.12) col = e_mezcla(col, hex('#000000'), 0.25); R.pset(x, y, col); }
  for (let i = -rx + 3; i <= rx - 3; i += 2) { const j = Math.round(ry * Math.sqrt(1 - (i / rx) ** 2)); R.pset(cx + i, cy + j + 1, c[3]); }
}

// la sombra blanda de un objeto: oscurece en una elipse
function e_sombra(R, cx, cy, rx, ry, a = 0.35) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) e_tine(R, x, cy + j, hex('#0a0608'), a); }
}

// el árbol de Navidad (cx, punta, pie, medio ancho abajo): pisos de ramas con su filo dentado, agujas en tres verdes con
// la luz por la izquierda, bolas con su brillo, espumillón dorado, el tronco y la cesta; las luces y la estrella van aparte
const E_ABE = e_hx(['#0e2a1a', '#17402a', '#22583a', '#2e6e44', '#4a8a52', '#7aa860']);

function e_abetoAncho(top, bot, half, y) { const u = (y - top) / (bot - top), piso = (u * 4) % 1; return half * (0.12 + u * 0.7 + piso * 0.24); }

function e_abeto(R, cx, top, bot, half) {
  const { rect, pset, disco } = R;
  rect(cx - 3, bot, cx + 3, bot + 5, hex('#3a2214')); rect(cx - 3, bot, cx - 2, bot + 5, hex('#5a3622'));
  for (let y = bot + 4; y <= bot + 12; y++) { const w = 12 - Math.round((y - bot - 4) * 0.4); for (let x = cx - w; x <= cx + w; x++) pset(x, y, ((x + (y >> 1)) & 3) === 0 ? hex('#6a4a24') : (y & 1) ? hex('#a87a3a') : hex('#c8964a')); pset(cx - w, y, hex('#4a3018')); pset(cx + w, y, hex('#4a3018')); }
  rect(cx - 13, bot + 4, cx + 13, bot + 5, hex('#d8aa5a'));
  for (let y = top + 2; y < bot + 1; y++) { const w = e_abetoAncho(top, bot, half, y);
    for (let x = Math.floor(cx - w - 1); x <= cx + w + 1; x++) { const dx = (x - cx) / Math.max(1, w), filo = Math.abs(dx) > 0.86;
      if (Math.abs(x - cx) > w + (h(x, y, 660) < 0.45 ? 1 : 0)) continue; if (filo && h(x, y, 661) < 0.35) continue;
      const borde = (y - top) / (bot - top) * 4 % 1 > 0.82; let v = 2.6 - dx * 1.1 + (h(x, y, 662) - 0.5) * 1.6 - (borde ? -0.4 : 0) + ((x + y * 2) % 5 === 0 ? 0.8 : 0);
      if (Math.abs(x - cx) < 2 && h(x, y, 663) < 0.3) v -= 1.2; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, E_ABE[Math.max(0, Math.min(5, l))]); } }
  // el espumillón: dos vueltas doradas en diagonal
  for (const [a, b] of [[0.28, 0.42], [0.55, 0.7], [0.8, 0.92]]) for (let x = -half; x <= half; x++) { const y = Math.round(top + (bot - top) * (a + (b - a) * (x + half) / (2 * half)) + Math.sin(x * 0.6) * 0.8), w = e_abetoAncho(top, bot, half, y); if (Math.abs(x) < w - 1) pset(cx + x, y, (x & 1) ? hex('#f0d070') : hex('#c89a3a')); }
  // las bolas: rojas, doradas y azules, con su brillo y su sombra
  const B = [hex('#c8282e'), hex('#e8b830'), hex('#3a6ad8'), hex('#c8c8d8'), hex('#a83aa8')];
  for (let k = 0; k < 22; k++) { const u = 0.12 + h(k, 1, 664) * 0.84, y = Math.round(top + (bot - top) * u), w = e_abetoAncho(top, bot, half, y) - 2, x = Math.round(cx + (h(k, 2, 664) * 2 - 1) * w), r = u > 0.6 && k % 3 === 0 ? 2 : 1, c = B[k % 5];
    disco(x, y, r, c); pset(x - (r > 1 ? 1 : 0), y - r, e_mezcla(c, hex('#ffffff'), 0.7)); if (r > 1) pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.4)); pset(x, y - r - 1, hex('#c8c8d0')); }
}

// las luces del árbol, en espiral (las de detrás no se ven) y la estrella de la punta que destella
function e_abetoLuces(R, cx, top, bot, half, t) {
  for (let i = 0; i < 46; i++) { const u = 0.06 + i / 46 * 0.92, a = u * 26, y = Math.round(top + (bot - top) * u), w = e_abetoAncho(top, bot, half, y) - 1; if (Math.cos(a) < -0.25) continue; e_bombilla(R, Math.round(cx + Math.sin(a) * w), y, t, i * 3); }
  const s = 0.6 + 0.4 * Math.sin(t * 2.4), sy = top - 1;
  e_resplandor(R, cx, sy, 7, hex('#fff0a0'), 0.5 * s);
  for (const [dx, dy] of [[0, -3], [0, 3], [-3, 0], [3, 0], [-2, -2], [2, -2], [-2, 2], [2, 2]]) R.linea(cx, sy, cx + dx, sy + dy, Math.abs(dx) + Math.abs(dy) > 3 ? hex('#e8b830') : hex('#ffd84a'));
  R.pset(cx, sy, hex('#ffffff')); if (s > 0.85) { R.pset(cx, sy - 4, hex('#fff6c8')); R.pset(cx + 4, sy, hex('#fff6c8')); }
}

// un regalo (x0–x1, y0–y1) con su papel, la cinta en cruz, el lazo y la luz por la izquierda
function e_regalo(R, x0, y0, x1, y1, c, cinta) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#140c10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, e_mezcla(c, hex('#ffffff'), 0.3)); rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, e_mezcla(c, hex('#000000'), 0.3));
  for (let y = y0 + 2; y < y1; y += 3) for (let x = x0 + 2 + (y % 2); x < x1 - 1; x += 4) pset(x, y, e_mezcla(c, hex('#ffffff'), 0.18));
  const mx = (x0 + x1) >> 1; rect(mx - 1, y0 + 1, mx, y1 - 1, cinta); rect(x0 + 1, y0 + 3, x1 - 1, y0 + 4, cinta);
  for (const d of [-1, 1]) { R.linea(mx, y0, mx + d * 4, y0 - 3, cinta); R.linea(mx + d * 4, y0 - 3, mx + d * 2, y0, cinta); } pset(mx, y0 - 1, e_mezcla(cinta, hex('#ffffff'), 0.5));
}

// el sofá de terciopelo azul (x0–x1; respaldo desde yr, asiento en ya, base en yb): respaldo con cojines y costuras,
// brazos enrollados, cojines del asiento con su canto, faldón y patas; el terciopelo con su brillo
const E_SOF = e_hx(['#121628', '#1e2440', '#2a3456', '#3a4874', '#4e5e92', '#6a7ab0']);

function e_sofa(R, x0, x1, yr, ya, yb) {
  const { rect, pset } = R, S = E_SOF, aw = Math.round((x1 - x0) * 0.1), yBr = Math.round(yr + (ya - yr) * 0.45);
  const tercio = (x, y, v) => { v += (h(x, y, 670) - 0.5) * 0.7; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, S[Math.max(0, Math.min(5, l))]); };
  // el respaldo, en n cojines
  const n = (x1 - x0) > 120 ? 3 : 2, cw = (x1 - x0 - 2 * aw) / n;
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + aw + i * cw), b = Math.round(x0 + aw + (i + 1) * cw) - 1;
    for (let y = yr; y < ya; y++) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), w = (y - yr) / (ya - yr); if ((y === yr && (x < a + 2 || x > b - 2)) || (y === yr + 1 && (x === a || x === b))) continue;
      tercio(x, y, 3 + (0.5 - Math.abs(u - 0.45)) * 1.6 - w * 0.9 - (x === a || x === b ? 1.3 : 0) - (y === yr ? -0.8 : 0)); }
    // el capitoné: botones en dos filas al tresbolillo, con las arrugas en diagonal y su brillo
    for (let f = 0; f < 2; f++) { const by = yr + Math.round((ya - yr) * (0.3 + f * 0.36)); for (let x = a + 5 + f * 4; x < b - 3; x += 9) { pset(x, by, S[0]); pset(x + 1, by, S[1]); pset(x, by - 1, S[4]);
      for (let i = 1; i <= 3; i++) { pset(x - i, by - i, S[1]); pset(x + i, by + i, S[1]); pset(x + i, by - i, S[2]); pset(x - i, by + i, S[2]); } } } }
  // los cojines del asiento: cara de arriba y canto
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + aw + i * cw), b = Math.round(x0 + aw + (i + 1) * cw) - 1;
    for (let y = ya; y < ya + 5; y++) for (let x = a; x <= b; x++) tercio(x, y, 3.6 - (y - ya) * 0.15 - (x === a ? 1.2 : 0));
    rect(a, ya, b, ya, S[5]); for (let y = ya + 5; y < yb - 4; y++) for (let x = a; x <= b; x++) tercio(x, y, 2.4 - (y - ya - 5) * 0.12 - (x === a || x === b ? 0.8 : 0)); rect(a + 1, ya + 5, b - 1, ya + 5, S[4]); }
  // el faldón y las patas
  for (let y = yb - 4; y <= yb; y++) for (let x = x0 + 1; x < x1; x++) tercio(x, y, 1.6 - (y - yb + 4) * 0.2);
  rect(x0 + 1, yb - 4, x1 - 1, yb - 4, S[1]);
  for (const x of [x0 + 3, x1 - 5]) { rect(x, yb + 1, x + 2, yb + 4, hex('#2a1810')); pset(x, yb + 1, hex('#6a4a2a')); }
  // los brazos enrollados
  for (const [a, b, lado] of [[x0, x0 + aw, -1], [x1 - aw, x1, 1]]) {
    for (let y = yBr; y <= yb - 1; y++) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), rollo = y < yBr + 6; if (rollo && ((y === yBr && (u < 0.2 || u > 0.8)) || (y === yBr + 1 && (u < 0.08 || u > 0.92)))) continue;
      tercio(x, y, rollo ? 4.2 - Math.abs(u - 0.4) * 3 - (y - yBr) * 0.25 : 2.8 - (lado < 0 ? -u : u) * 1.2 + (lado < 0 ? -0.3 : 0) - (y > yb - 5 ? 0.8 : 0)); }
    rect(a, yBr + 6, b, yBr + 6, S[1]); for (let y = yBr + 9; y < yb - 6; y += 6) pset(lado < 0 ? b - 2 : a + 2, y, S[1]); }
  // el filo de abajo en sombra sobre el suelo
  for (let x = x0 - 2; x <= x1 + 2; x++) for (let y = yb + 1; y <= yb + 3; y++) if (e_b4(x, y) < 0.7 - (y - yb) * 0.2) e_tine(R, x, y, hex('#000000'), 0.4);
}

// la manta de cuadros (tartán rojo y verde) caída sobre el respaldo y el asiento: x0–x1, y0–y1, con el filo de abajo en
// ondas y los flecos; los pliegues verticales la oscurecen
function e_manta(R, x0, x1, y0, y1) {
  for (let x = x0; x <= x1; x++) { const fondo = y1 - Math.round(Math.abs(Math.sin(x * 0.35)) * 3); for (let y = y0 + Math.round(Math.abs(Math.sin(x * 0.2)) * 2); y <= fondo; y++) {
    const gx = (x - x0) % 12, gy = (y - y0) % 12; let c = hex('#a8282e'); if (gx < 4 || gy < 4) c = gx < 4 && gy < 4 ? hex('#1e3a2a') : hex('#3a4a32'); if (gx === 8 || gy === 8) c = hex('#e8c860'); if (gx === 6 && gy % 2) c = hex('#f0e8d8');
    const pl = Math.sin((x - x0) * 0.42); if (pl < -0.55) c = e_mezcla(c, hex('#000000'), 0.35); else if (pl > 0.75) c = e_mezcla(c, hex('#ffffff'), 0.12); R.pset(x, y, c); }
    if (x % 2 === 0) R.linea(x, fondo + 1, x, fondo + 2, hex('#e8d8b0')); }
}

// un cojín de ganchillo o de tela (cx, cy, medio ancho w, medio alto a) con su estampado
function e_cojin(R, cx, cy, w, a, c, cL, cS, copo = false) {
  for (let j = -a; j <= a; j++) for (let i = -w; i <= w; i++) { const d = (Math.abs(i) / w) ** 3 + (Math.abs(j) / a) ** 3; if (d > 1) continue; R.pset(cx + i, cy + j, d > 0.7 ? cS : (i < -w * 0.3 && j < 0) ? cL : c); }
  if (copo) { R.pset(cx, cy, cL); for (const [dx, dy] of [[0, -2], [0, 2], [-2, 0], [2, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]) R.pset(cx + dx, cy + dy, hex('#f0f0f8')); }
  else for (let j = -a + 2; j <= a - 2; j += 2) for (let i = -w + 2; i <= w - 2; i += 2) R.pset(cx + i + (j & 2 ? 1 : 0), cy + j, cS);
}

// la ventana nevada por fuera (hueco x0–x1, y0–y1): el cielo de noche tramado con su brillo de ciudad, estrellas, la luna
// tras las nubes, las casas de enfrente con nieve en los tejados y ventanas cálidas, la farola; lo fijo (va al búfer)
function e_calleNevadaFija(R, x0, y0, x1, y1) {
  const { rect, pset, disco } = R, cl = [x0, y0, x1, y1], CI = e_hx(['#0c1230', '#141c44', '#1e2a58', '#2e3a6a', '#4a4a78', '#6a5a80']);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (y1 - y0) * 4.2 + (h(x >> 2, y >> 2, 680) - 0.5) * 0.4; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CI[Math.min(5, l)]); }
  for (let k = 0; k < 14; k++) { const x = Math.round(x0 + h(k, 1, 681) * (x1 - x0)), y = Math.round(y0 + 2 + h(k, 2, 681) * (y1 - y0) * 0.35); pset(x, y, k % 3 ? hex('#8a90c8') : hex('#e8ecff')); }
  const mx = Math.round(x0 + (x1 - x0) * 0.72), my = y0 + 8; disco(mx, my, 4, hex('#e8e4d0')); disco(mx + 2, my - 1, 4, CI[0]); pset(mx - 3, my, hex('#fff8e0'));
  // las casas de enfrente: dos tejados a dos aguas con nieve, chimeneas y ventanas cálidas
  const base = y1, techo = (x) => { const a = ((x - x0) % 38 + 38) % 38; return Math.round(base - 22 + Math.abs(a - 19) * 0.6); };
  for (let x = x0; x <= x1; x++) { const yt = techo(x); for (let y = yt; y <= base; y++) pset(x, y, y < yt + 3 ? (h(x, y, 682) < 0.7 ? hex('#f0f4fc') : hex('#c8d4ea')) : y < yt + 4 ? hex('#8a98b8') : ((x + (y >> 2)) % 5 === 0 ? hex('#3a2a3a') : hex('#4a3040'))); }
  for (let x = x0 + 5; x < x1 - 4; x += 9) { const yt = techo(x + 2) + 7; if (yt + 6 > base) continue; e_rectC(R, cl, x, yt, x + 4, yt + 5, hex('#1a1220')); e_rectC(R, cl, x + 1, yt + 1, x + 3, yt + 4, h(x, 1, 683) < 0.6 ? hex('#ffcc70') : hex('#3a3a5a')); pset(x + 2, yt + 1, hex('#e89a40')); }
  for (const cx of [x0 + 12, x0 + 49]) { const yt = techo(cx) - 5; e_rectC(R, cl, cx, yt, cx + 3, yt + 6, hex('#5a3030')); e_rectC(R, cl, cx - 1, yt - 1, cx + 4, yt, hex('#f0f4fc')); }
  // la farola con su resplandor
  const fx = x0 + 6; e_rectC(R, cl, fx, y0 + 26, fx + 1, base, hex('#1a1a28')); e_rectC(R, cl, fx - 2, y0 + 23, fx + 3, y0 + 26, hex('#2a2a3a')); e_rectC(R, cl, fx - 1, y0 + 26, fx + 2, y0 + 27, hex('#fff0b0'));
  R.recorte(cl); e_resplandor(R, fx + 0.5, y0 + 30, 14, hex('#ffe0a0'), 0.5, 1.3); R.recorte(null);
}

// lo que se mueve fuera de la ventana: la nieve, el humo de las chimeneas, una ventana que se enciende y un coche que pasa
// con sus faros, recortado al hueco
function e_calleNevadaVida(R, t, x0, y0, x1, y1, k = 0) {
  R.recorte([x0, y0, x1, y1]);
  for (const cx of [x0 + 13, x0 + 50]) { const yt = Math.round(y1 - 22 + Math.abs(((cx - x0) % 38) - 19) * 0.6) - 6; for (let i = 0; i < 4; i++) { const u = (t * 0.25 + i / 4 + cx * 0.01) % 1; R.disco(Math.round(cx + u * 9 + Math.sin(u * 5 + t) * 1.5), Math.round(yt - u * 18), Math.round(1 + u * 2.4), u < 0.5 ? hex('#5a6280') : hex('#3a4268')); } }
  const u = ((t + k * 4) % 11) / 11, cx = Math.round(x1 + 16 - u * (x1 - x0 + 40)), cy = y1 - 2;
  if (cx > x0 - 20 && cx < x1 + 16) { R.poligono([[cx - 8, cy], [cx - 6, cy - 4], [cx + 3, cy - 4], [cx + 6, cy - 1], [cx + 8, cy - 1], [cx + 8, cy + 1], [cx - 8, cy + 1]], hex('#2a1a28')); R.linea(cx - 5, cy - 3, cx + 2, cy - 3, hex('#6a8ab0')); R.pset(cx - 8, cy - 1, hex('#fff6c8')); R.pset(cx + 8, cy - 1, hex('#ff3a3a'));
    for (let i = 1; i < 10; i++) if (e_b4(cx - 8 - i, cy) < 0.8 - i * 0.07) e_tine(R, cx - 8 - i, cy - 1 + (i > 5 ? 1 : 0), hex('#fff6c8'), 0.5); }
  e_nieve(R, t, x0, y0, x1, y1, 30, k);
  R.recorte(null);
}

// el marco de la ventana (por encima de lo de fuera): el bastidor blanco con su sombra, la cruz, la escarcha de las
// esquinas y el alféizar
function e_marcoVentana(R, x0, y0, x1, y1) {
  const { rect, pset } = R, B = hex('#e8e0d0'), S = hex('#a89880'), D = hex('#4a3a30'), mx = (x0 + x1) >> 1, my = Math.round(y0 + (y1 - y0) * 0.42);
  rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, B); rect(x0 - 3, y0 - 3, x0 - 1, y1 + 1, B); rect(x1 + 1, y0 - 3, x1 + 3, y1 + 1, S); rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, D); rect(x0 - 4, y0 - 4, x0 - 4, y1 + 2, D); rect(x1 + 4, y0 - 4, x1 + 4, y1 + 2, D);
  rect(x0, y0, x1, y0, S); rect(x0, y0, x0, y1, S);
  rect(mx - 1, y0, mx + 1, y1, B); rect(mx + 1, y0, mx + 1, y1, S); rect(x0, my - 1, x1, my + 1, B); rect(x0, my + 1, x1, my + 1, S);
  for (const [cx, cy, dx, dy] of [[x0, y1, 1, -1], [x1, y1, -1, -1], [mx - 1, my - 2, -1, -1], [mx + 2, my - 2, 1, -1], [mx - 1, y1, -1, -1], [mx + 2, y1, 1, -1]]) for (let i = 0; i < 7; i++) for (let j = 0; j < 7 - i; j++) if (h(i, j, cx) < 0.55 - (i + j) * 0.05) e_tine(R, cx + dx * i, cy + dy * j, hex('#e8f0ff'), 0.55);
  rect(x0 - 6, y1 + 2, x1 + 6, y1 + 4, B); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 5, S); rect(x0 - 6, y1 + 6, x1 + 6, y1 + 6, D);
}

// una cortina de terciopelo rojo (x0–x1 desde y0 hasta y1) con pliegues y recogida por un alzapaño en ya
function e_cortina(R, x0, x1, y0, y1, ya, lado) {
  const C3 = e_hx(['#3a0a12', '#5a1420', '#7a1e2a', '#9a2a34', '#b84048']);
  for (let y = y0; y <= y1; y++) { const ap = y < ya ? 1 - (y - y0) / (ya - y0) * 0.45 : 0.55 + (y - ya) / (y1 - ya) * 0.45, w = (x1 - x0) * ap, a = lado < 0 ? x0 : x1 - w;
    for (let x = Math.round(a); x <= Math.round(a + w); x++) { const v = 2.2 + Math.sin((x - a) / Math.max(4, w) * 9) * 1.4 + (lado < 0 ? -0.3 : 0.2); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; R.pset(x, y, C3[Math.max(0, Math.min(4, l))]); }
    if (y === y1) for (let x = Math.round(a); x <= Math.round(a + w); x += 2) R.pset(x, y + 1, hex('#e8b830')); }
  const ax = lado < 0 ? x0 + Math.round((x1 - x0) * 0.27) : x1 - Math.round((x1 - x0) * 0.27); R.rect(ax - 3, ya - 1, ax + 3, ya + 1, hex('#e8b830')); R.pset(ax, ya + 2, hex('#c89a2a')); R.pset(ax, ya + 3, hex('#e8b830'));
}

// el fuego de la chimenea (hueco x0–x1, base yb): los troncos, las llamas que bailan en cuatro colores, las brasas y las
// chispas que suben; devuelve la fuerza del resplandor (para teñir el salón)
function e_fuego(R, x0, x1, yb, t) {
  const { rect, pset, disco } = R, w = x1 - x0;
  for (const [a, b, y] of [[x0 + 3, x1 - 6, yb - 3], [x0 + 8, x1 - 2, yb - 6]]) { rect(a, y, b, y + 3, hex('#3a2014')); rect(a, y, b, y, hex('#6a4024')); disco(a, y + 1, 2, hex('#c89a6a')); pset(a, y + 1, hex('#7a5a3a')); }
  const fuerza = 0.8 + 0.2 * Math.sin(t * 7.3) * Math.sin(t * 3.1 + 1);
  for (let x = x0 + 2; x <= x1 - 2; x++) { const u = (x - x0) / w, env = Math.sin(u * Math.PI), alto = (6 + 12 * env) * (0.75 + 0.25 * Math.sin(t * 9 + x * 0.9) * Math.sin(t * 5.3 + x * 0.37)) * fuerza;
    for (let j = 0; j < alto; j++) { const y = yb - 5 - j, f = j / alto; if (f > 0.7 && e_b4(x, y) > (1 - f) * 2.6) continue; pset(x, y, f < 0.18 ? hex('#fff6c0') : f < 0.42 ? hex('#ffd060') : f < 0.7 ? hex('#ff8a2a') : hex('#d8402a')); } }
  for (let x = x0 + 4; x < x1 - 3; x += 2) pset(x, yb - 1, Math.sin(t * 4 + x) > 0.2 ? hex('#ff7a2a') : hex('#a82a1a'));
  for (let i = 0; i < 5; i++) { const u = (t * 0.7 + i * 0.23) % 1, x = Math.round(x0 + w * (0.3 + h(i, 1, 690) * 0.4) + Math.sin(u * 9 + i) * 3), y = Math.round(yb - 8 - u * 26); if (u < 0.9) pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c84a2a')); }
  return fuerza;
}

// un calcetín de Navidad colgado (x arriba, y0 el gancho), de color c con su puño blanco, que se mece un poco
function e_calcetin(R, x, y0, c, t, k) {
  const d = Math.round(Math.sin(t * 0.9 + k * 1.7) * 0.8), L = 13;
  R.linea(x, y0, x + d, y0 + 2, hex('#e8b830'));
  for (let j = 0; j < L; j++) { const xx = x + d + Math.round(j * d * 0.15); R.rect(xx - 3, y0 + 3 + j, xx + 2, y0 + 3 + j, j < 3 ? (j === 0 ? hex('#ffffff') : hex('#e8e4dc')) : (j % 4 === 1 ? e_mezcla(c, hex('#ffffff'), 0.25) : c)); R.pset(xx + 2, y0 + 3 + j, e_mezcla(c, hex('#000000'), 0.35)); }
  const xx = x + d * 2; R.rect(xx - 3, y0 + 3 + L, xx + 5, y0 + 6 + L, c); R.rect(xx + 4, y0 + 4 + L, xx + 6, y0 + 6 + L, c); R.rect(xx - 3, y0 + 6 + L, xx + 5, y0 + 6 + L, e_mezcla(c, hex('#000000'), 0.4)); R.pset(xx + 5, y0 + 3 + L, e_mezcla(c, hex('#ffffff'), 0.3));
}

// la tele plana (bastidor x0–x1, y0–y1) con su pie: lo de dentro lo pinta o.pantalla; devuelve el hueco de la pantalla
function e_teleMarco(R, x0, y0, x1, y1) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#0a0a10')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#3a3a48')); rect(x0, y1, x1, y1, hex('#1a1a24'));
  const mx = (x0 + x1) >> 1; rect(mx - 3, y1 + 1, mx + 3, y1 + 3, hex('#1a1a24')); rect(mx - 10, y1 + 3, mx + 10, y1 + 4, hex('#2a2a34')); rect(mx - 10, y1 + 3, mx + 10, y1 + 3, hex('#5a5a6a')); pset(x1 - 4, y1, hex('#3aa84a'));
  return [x0 + 2, y0 + 2, x1 - 2, y1 - 2];
}

// lo que sale en la tele sin o.pantalla: un menú de series sin logos ni letras (un cartel grande con su paisaje de noche
// que cambia, filas de portadas que corren y el recuadro que salta de una a otra)
function e_teleMenu(R, t, cl) {
  const [x0, y0, x1, y1] = cl, W = x1 - x0, H = y1 - y0, hb = y0 + Math.round(H * 0.5);
  e_rectC(R, cl, x0, y0, x1, y1, hex('#0e1020'));
  const tema = Math.floor(t / 4) % 3, CI = [[hex('#1a2a5a'), hex('#3a4a8a'), hex('#e8b830')], [hex('#3a1a3a'), hex('#8a3a4a'), hex('#ffd890')], [hex('#0e3a3a'), hex('#2a6a5a'), hex('#c8e8f0')]][tema];
  for (let y = y0; y < hb; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(CI[0], CI[1], (y - y0) / (hb - y0)));
  for (let x = x0; x <= x1; x++) { const yy = Math.round(hb - 4 - Math.abs(Math.sin(x * 0.11 + tema)) * H * 0.18); e_rectC(R, cl, x, yy, x, hb - 1, hex('#0a0c18')); }
  if (tema === 0) { const cx = x0 + Math.round(W * 0.66), by = hb - 4; for (const [dx, a] of [[-6, 9], [-2, 14], [3, 11], [7, 7]]) { e_rectC(R, cl, cx + dx, by - a, cx + dx + 2, by, hex('#0a0c18')); R.pset(cx + dx + 1, by - a - 1, hex('#0a0c18')); } R.pset(cx - 1, by - 8, CI[2]); R.pset(cx + 4, by - 6, CI[2]); }
  else R.disco(x0 + Math.round(W * 0.7), y0 + Math.round(H * 0.18), 3, CI[2]);
  e_rectC(R, cl, x0 + 3, hb - 10, x0 + 3 + Math.round(W * 0.32), hb - 9, hex('#e8e8f0')); e_rectC(R, cl, x0 + 3, hb - 7, x0 + 3 + Math.round(W * 0.2), hb - 7, hex('#8a8aa0'));
  e_rectC(R, cl, x0 + 3, hb - 4, x0 + 12, hb - 2, hex('#e8e8f0'));
  const tw = Math.max(6, Math.round(W / 6)), sel = Math.floor(t / 1.1) % 5, PC = e_hx(['#c83a3a', '#3a6ad8', '#e8b830', '#3aa86a', '#a83aa8', '#e86a3a']);
  for (let f = 0; f < 2; f++) { const yy = hb + 3 + f * Math.round(H * 0.24), off = f === 1 ? Math.round((t * 3) % (tw + 2)) : 0;
    for (let i = -1; i < 7; i++) { const xx = x0 + 3 + i * (tw + 2) - off, c = PC[(i + f * 2 + 6) % 6]; e_rectC(R, cl, xx, yy, xx + tw - 1, yy + Math.round(H * 0.18), e_mezcla(c, hex('#0e1020'), 0.35)); e_rectC(R, cl, xx, yy + Math.round(H * 0.12), xx + tw - 1, yy + Math.round(H * 0.18), e_mezcla(c, hex('#000000'), 0.4));
      if (f === 0 && i === sel) { R.recorte(cl); for (let x = xx - 1; x <= xx + tw; x++) { R.pset(x, yy - 1, hex('#ffffff')); R.pset(x, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); } R.linea(xx - 1, yy - 1, xx - 1, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); R.linea(xx + tw, yy - 1, xx + tw, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); R.recorte(null); } } }
}

// pinta la pantalla cl con o.pantalla (o con def) y encima el reflejo suave del cristal
function e_pantalla(R, t, cl, o, def) {
  R.recorte(cl); if (o.pantalla) o.pantalla(R, t, cl); else def(R, t, cl); R.recorte(cl);
  for (let y = cl[1]; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) { const d = (x - cl[0]) - (y - cl[1]) * 1.4 - (cl[2] - cl[0]) * 0.55; if (d > 0 && d < 5 && ((x + y) & 1)) e_tine(R, x, y, hex('#ffffff'), 0.08); }
  R.recorte(null);
}

// el gato que duerme hecho un ovillo (x, y: el suelo bajo su centro); respira y mueve la punta de la cola
function e_gatoDuerme(R, x, y, t) {
  const r = Math.sin(t * 1.6) > 0 ? 1 : 0, N = hex('#d8843a'), NL = hex('#f0a858'), NS = hex('#9a5424'), K = hex('#2a1810');
  for (let j = -4 - r; j <= 0; j++) for (let i = -8; i <= 8; i++) { const d = (i / 8) ** 2 + (j / (4.5 + r)) ** 2; if (d > 1) continue; R.pset(x + i, y + j, d > 0.82 ? K : j < -2 && i < 2 ? NL : (i + 20) % 4 === 0 ? NS : N); }
  R.disco(x + 6, y - 3, 3, K); R.disco(x + 6, y - 3, 2, N); R.pset(x + 5, y - 6, K); R.pset(x + 8, y - 6, K); R.pset(x + 5, y - 5, NS); R.pset(x + 8, y - 5, NS); R.rect(x + 5, y - 3, x + 6, y - 3, K); R.pset(x + 8, y - 2, hex('#e88a8a'));
  const c = Math.round(Math.sin(t * 0.8) * 1.5); R.linea(x - 8, y, x - 3, y + 1, NS); R.linea(x - 3, y + 1, x + 2, y + 1 + (c > 0 ? 0 : 0), N); R.pset(x + 3, y + c, NL);
  e_sombra(R, x, y + 2, 9, 1, 0.3);
}

function e_salon(R, t, o, sofa) {
  const { rect, pset, disco, linea } = R;
  if (!sofa) {
    const VEN = [20, 26, 60, 76], PANT = [188, 64, 242, 96];
    e_fijo(R, 'hp:salon', () => {
      const luz = (x, y) => Math.max(0, 1 - Math.hypot(x - 131, (y - 104) * 1.2) / 120) * 0.9 + Math.max(0, 1 - Math.hypot(x - 180, y - 84) / 70) * 0.7 + Math.max(0, 1 - Math.hypot(x - 284, y - 90) / 70) * 0.35;
      e_papel(R, 0, 9, 319, 97, luz, (x, y) => x > 262 && y < 50);
      e_cornisa(R, 0);
      e_friso(R, 0, 319, 98, 123, (x) => Math.max(0, 1 - Math.abs(x - 131) / 50));
      e_tarima(R, 124, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 131, (y - 124) * 2.2) / 90) * 0.7 - (y > 168 ? 0.3 : 0));
      e_alfombra(R, 152, 156, 88, 14);
      // la ventana y lo de fuera, las cortinas con su barra y la guirnalda (la guirnalda se enciende en vida)
      e_calleNevadaFija(R, ...VEN); e_marcoVentana(R, ...VEN);
      rect(4, 15, 76, 16, hex('#2a1a12')); rect(4, 15, 76, 15, hex('#c89a3a')); disco(4, 15, 2, hex('#e8b830')); disco(76, 15, 2, hex('#e8b830'));
      e_cortina(R, 6, 22, 17, 94, 66, -1); e_cortina(R, 58, 74, 17, 94, 66, 1);
      // la corona de la pared, con su lazo
      for (let a = 0; a < Math.PI * 2; a += 0.12) for (let r = 5; r <= 8; r++) { const x = Math.round(88 + Math.cos(a) * r), y = Math.round(40 + Math.sin(a) * r); pset(x, y, h(x, y, 700) < 0.35 ? hex('#4a8a52') : h(x, y, 701) < 0.5 ? hex('#22583a') : hex('#17402a')); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + 0.3; disco(Math.round(88 + Math.cos(a) * 6.5), Math.round(40 + Math.sin(a) * 6.5), 1, hex('#d8282e')); }
      for (const d of [-1, 1]) { linea(88, 47, 88 + d * 4, 44, hex('#c8282e')); linea(88 + d * 4, 44, 88 + d * 4, 48, hex('#c8282e')); linea(88, 47, 88 + d * 2, 54, hex('#a81e24')); } pset(88, 47, hex('#ff6a6a'));
      // el sofá bajo la ventana, con los cojines y la manta
      e_sofa(R, 2, 96, 100, 122, 138);
      e_cojin(R, 22, 115, 7, 6, hex('#c8282e'), hex('#e85a5a'), hex('#8a1a20'), true); e_cojin(R, 40, 116, 7, 5, hex('#e8dcc0'), hex('#f8f0e0'), hex('#b8a888'));
      e_manta(R, 62, 90, 100, 136);
      // las zapatillas de borreguito junto al sofá y el cesto de la leña al lado de la chimenea
      for (const [x, y] of [[54, 146], [63, 148]]) { R.rect(x - 4, y - 2, x + 4, y, hex('#1a1010')); R.rect(x - 3, y - 2, x + 3, y - 1, hex('#8a2a3a')); R.rect(x - 4, y - 3, x - 1, y - 2, hex('#f0e8d8')); R.pset(x + 3, y - 2, hex('#c84a5a')); }
      for (let y = 112; y <= 126; y++) { const w = 8 - Math.round((y - 112) * 0.1); R.rect(172 - w - 6, y, 172 + w - 6, y, ((y >> 1) & 1) ? hex('#8a6a3a') : hex('#a8844a')); } for (const [x, y, c] of [[160, 110, '#6a4a2a'], [166, 108, '#7a5a34'], [172, 111, '#5a3a20']]) { R.rect(x - 2, y - 2, x + 3, y + 2, hex(c)); R.disco(x - 2, y, 2, hex('#c8a070')); R.pset(x - 2, y, hex('#8a6a40')); }
      // la chimenea: los pilares de ladrillo, el dintel, el hueco con su arco, el hogar y la repisa
      for (let y = 74; y <= 124; y++) for (let x = 102; x <= 160; x++) { const fila = Math.floor((y - 74) / 4), off = fila % 2 ? 4 : 0, junta = (y - 74) % 4 === 3 || ((x + off - 102) % 9 === 8);
        pset(x, y, junta ? hex('#5a4a44') : h(Math.floor((x + off) / 9), fila, 702) < 0.25 ? hex('#7a3a2a') : h(Math.floor((x + off) / 9), fila, 703) < 0.5 ? hex('#a85a3e') : hex('#94503a')); }
      rect(102, 74, 102, 124, hex('#c8784e')); rect(160, 74, 160, 124, hex('#5a2a1e'));
      for (let y = 88; y <= 122; y++) { const ar = y < 94 ? Math.round(Math.sqrt(Math.max(0, 36 - (94 - y) ** 2)) * 2.4) : 15; rect(131 - ar, y, 131 + ar, y, y < 100 ? hex('#140a0a') : hex('#1e100e')); }
      for (let y = 96; y < 122; y += 4) for (let x = 118 + (y % 8 ? 0 : 4); x < 145; x += 8) rect(x, y, x + 6, y + 2, hex('#2a1612'));
      rect(96, 122, 166, 124, hex('#8a8078')); rect(96, 122, 166, 122, hex('#c8bcb0')); rect(94, 125, 168, 128, hex('#6a625c')); rect(94, 125, 168, 125, hex('#a8a098'));
      rect(96, 66, 166, 73, hex('#24140c')); rect(96, 66, 166, 70, hex('#74482a')); rect(96, 66, 166, 66, hex('#b47e4c')); rect(96, 71, 166, 72, hex('#3e2416')); for (let x = 100; x < 164; x += 6) pset(x, 68, hex('#5a3620'));
      // el cuadro del lago con su castillo, encima de la repisa
      rect(110, 26, 152, 58, hex('#5a3a12')); rect(111, 27, 151, 57, hex('#c8962a')); rect(111, 27, 151, 27, hex('#f0cc6a')); rect(113, 29, 149, 55, hex('#3a2410'));
      for (let y = 30; y <= 54; y++) for (let x = 114; x <= 148; x++) { const v = y < 44 ? (y - 30) / 14 : 0; let c = y < 44 ? e_mezcla(hex('#2a2a5a'), hex('#c87a6a'), v) : e_mezcla(hex('#1a2a4a'), hex('#3a4a6a'), (Math.sin(x * 0.8 + y * 2) + 1) / 2 * 0.5); if (y >= 44 && y < 46) c = hex('#1a1a30'); pset(x, y, c); }
      for (let x = 114; x <= 148; x++) { const m = Math.round(44 - Math.max(0, 9 - Math.abs(x - 122) * 0.9) - Math.max(0, 6 - Math.abs(x - 142) * 0.8)); for (let y = m; y < 44; y++) pset(x, y, y < m + 2 && Math.abs(x - 122) < 4 ? hex('#e8e8f0') : hex('#2a2440')); }
      for (const [dx, a] of [[0, 8], [3, 12], [7, 9], [10, 6]]) rect(128 + dx, 44 - a, 129 + dx, 43, hex('#14101e')); pset(131, 37, hex('#ffd060')); pset(135, 39, hex('#ffd060')); pset(131, 47, hex('#a88a40'));
      // la cómoda de la tele: madera, puertas de cristal con la consola y las cajas, los tiradores y las patas
      rect(174, 100, 250, 126, hex('#1a0e08')); rect(175, 101, 249, 125, hex('#5a3620')); rect(175, 101, 249, 102, hex('#946038')); rect(175, 101, 249, 101, hex('#b47e4c'));
      for (let x = 176; x < 249; x++) for (let y = 104; y < 124; y++) if (h(x >> 1, y * 5, 704) < 0.14) pset(x, y, hex('#43281a'));
      for (const [a, b] of [[178, 210], [214, 246]]) { rect(a, 105, b, 122, hex('#24140c')); rect(a + 1, 106, b - 1, 121, hex('#1a1420')); rect(a + 1, 106, a + 3, 121, hex('#2a2430')); }
      rect(181, 115, 199, 120, hex('#0e0e14')); rect(181, 115, 199, 115, hex('#4a4a5a'));
      for (let x = 217, k = 0; x < 244; x += 3, k++) rect(x, 109 + (k % 3), x + 1, 121, [hex('#c83a3a'), hex('#3a6ad8'), hex('#e8b830'), hex('#3aa86a')][k % 4]);
      for (const x of [207, 217]) rect(x, 112, x + 1, 114, hex('#e8b830'));
      for (const x of [177, 246]) { rect(x, 126, x + 2, 130, hex('#24140c')); pset(x, 126, hex('#74482a')); }
      // la tele y la barra de sonido
      e_teleMarco(R, 186, 62, 244, 98); rect(196, 99, 234, 100, hex('#1a1a22')); for (let x = 198; x < 234; x += 2) pset(x, 99, hex('#3a3a48'));
      // la balda con los siete libros, los sujetalibros y la lechucita
      rect(184, 46, 248, 48, hex('#3e2416')); rect(184, 46, 248, 46, hex('#946038')); for (const x of [190, 240]) { rect(x, 49, x + 1, 53, hex('#2a2a30')); linea(x, 53, x + 4, 49, hex('#2a2a30')); }
      const LB = e_hx(['#8a2a2a', '#2a5a8a', '#2a6a3a', '#c88a2a', '#5a2a6a', '#8a5a2a', '#3a3a5a']), alt = [9, 10, 11, 12, 12, 13, 14];
      rect(190, 35, 192, 45, hex('#6a6a7a')); rect(190, 35, 190, 45, hex('#a8a8b8'));
      for (let i = 0; i < 7; i++) { const x = 194 + i * 5, a = alt[i]; rect(x, 46 - a, x + 3, 45, LB[i]); rect(x, 46 - a, x, 45, e_mezcla(LB[i], hex('#ffffff'), 0.3)); rect(x + 3, 46 - a, x + 3, 45, e_mezcla(LB[i], hex('#000000'), 0.35)); rect(x, 48 - a, x + 3, 48 - a, hex('#e8c860')); rect(x, 41, x + 3, 41, hex('#e8c860')); rect(x + 1, 44 - Math.round(a / 2), x + 2, 45 - Math.round(a / 2), hex('#f0e0b0')); }
      rect(230, 35, 232, 45, hex('#6a6a7a')); rect(232, 35, 232, 45, hex('#4a4a58'));
      disco(240, 41, 3, hex('#8a6a4a')); disco(240, 43, 3, hex('#8a6a4a')); pset(239, 40, hex('#f0e8d0')); pset(241, 40, hex('#f0e8d0')); pset(239, 40, hex('#1a1010')); pset(241, 40, hex('#1a1010')); pset(240, 42, hex('#e8a83a')); pset(238, 37, hex('#5a3a2a')); pset(242, 37, hex('#5a3a2a')); rect(238, 45, 242, 45, hex('#5a3a2a'));
      // la lámpara de la cómoda (la luz se pinta en vida)
      rect(179, 92, 181, 100, hex('#c89a3a')); rect(176, 99, 184, 100, hex('#8a6a2a')); for (let y = 80; y <= 91; y++) { const w = 3 + Math.round((y - 80) * 0.4); rect(180 - w, y, 180 + w, y, y === 91 ? hex('#c8a870') : hex('#f0dca0')); pset(180 - w, y, hex('#d8c080')); }
      // el árbol y los regalos
      e_abeto(R, 284, 52, 122, 30);
      e_regalo(R, 254, 128, 270, 140, hex('#c8282e'), hex('#e8c860')); e_regalo(R, 296, 126, 314, 140, hex('#2a5ab8'), hex('#f0f0f8')); e_regalo(R, 270, 132, 290, 142, hex('#2a7a4a'), hex('#d8282e')); e_regalo(R, 240, 134, 252, 143, hex('#e8b830'), hex('#c8282e'));
      // la repisa: la rama de pino con piñas, las velas y el reloj
      for (let x = 97; x <= 165; x++) for (let y = 62; y <= 66; y++) if (h(x, y, 705) < 0.6 - Math.abs(y - 64) * 0.12) pset(x, y, h(x, y, 706) < 0.3 ? hex('#4a8a52') : hex('#1e4a2e'));
      for (const x of [108, 150]) { disco(x, 64, 1, hex('#6a3a1a')); pset(x, 63, hex('#a8703a')); }
      for (const x of [100, 162]) { rect(x - 2, 64, x + 2, 65, hex('#c89a3a')); rect(x - 1, 56, x + 1, 63, hex('#f0e8d8')); rect(x + 1, 56, x + 1, 63, hex('#c8bca8')); }
      disco(131, 57, 5, hex('#3a2416')); disco(131, 57, 4, hex('#f0e8d0')); rect(126, 62, 136, 65, hex('#5a3620')); rect(126, 62, 136, 62, hex('#946038'));
      e_sombra(R, 152, 147, 54, 4, 0.18);
    });
    // la vida: la calle nevada, la guirnalda de la ventana, el fuego y su resplandor, los calcetines, las velas, el reloj,
    // la lámpara, la consola, la tele, el árbol y el gato
    e_calleNevadaVida(R, t, ...VEN); e_marcoVentana(R, ...VEN);
    e_guirnalda(R, 14, 19, 68, 19, 5, 11, t, 0);
    e_guirnalda(R, 96, 64, 166, 64, 3, 12, t, 20);
    const f = e_fuego(R, 117, 145, 122, t);
    e_resplandor(R, 131, 112, 30, hex('#ff9a40'), 0.32 * f, 1); e_resplandor(R, 131, 134, 50, hex('#ff9a40'), 0.22 * f, 0.3);
    [[108, hex('#c8282e')], [121, hex('#2a7a4a')], [141, hex('#c8282e')], [154, hex('#e8e4dc')]].forEach(([x, c], k) => e_calcetin(R, x, 72, c, t, k));
    for (const x of [100, 162]) { const fl = Math.sin(t * 11 + x) > 0.3; pset(x, 55, hex('#ffd060')); pset(x, 54, fl ? hex('#fff6c0') : hex('#ffd060')); if (fl) pset(x + (Math.sin(t * 7 + x) > 0 ? 1 : -1), 53, hex('#ff8a2a')); e_resplandor(R, x, 54, 6, hex('#ffd890'), 0.3); }
    { const a = t * 0.5, b = t * 0.04; linea(131, 57, Math.round(131 + Math.sin(a) * 3), Math.round(57 - Math.cos(a) * 3), hex('#1a1010')); linea(131, 57, Math.round(131 + Math.sin(b) * 2), Math.round(57 - Math.cos(b) * 2), hex('#1a1010')); }
    e_resplandor(R, 180, 88, 26, hex('#ffe0a0'), 0.35); rect(178, 92, 182, 92, hex('#fff6d0'));
    pset(197, 117, Math.sin(t * 2) > 0 ? hex('#3ad8ff') : hex('#1a5a7a'));
    e_pantalla(R, t, PANT, o, e_teleMenu);
    e_resplandor(R, 215, 104, 28, hex('#8ab0ff'), 0.12 + 0.05 * Math.sin(t * 3), 0.4);
    e_abetoLuces(R, 284, 52, 122, 30, t);
    e_gatoDuerme(R, 82, 146, t);
    return { suelo: 150, pantalla: PANT, ventana: VEN, sofa: { x0: 2, x1: 96, asiento: 122, respaldo: 100 }, chimenea: { hueco: [117, 88, 145, 122], repisa: 66 },
      arbol: { x: 284, punta: 51, pie: 132 }, libros: [194, 33, 228, 45], tele: [186, 62, 244, 98], mesa: [116, 160, 202, 166], gato: [82, 146], libre: [100, 250] };
  }
  // la cámara del sofá: el sofá grande bajo la ventana, el árbol que asoma a la izquierda y la tele grande a la derecha
  const VEN = [74, 22, 146, 74], PANT = [218, 58, 302, 102];
  e_fijo(R, 'hp:salonSofa', () => {
    const luz = (x, y) => Math.max(0, 1 - Math.hypot(x - 12, y - 90) / 80) * 0.5 + Math.max(0, 1 - Math.hypot(x - 260, y - 80) / 90) * 0.5;
    e_papel(R, 0, 9, 319, 103, luz, (x, y) => x > 262 && y < 52);
    e_cornisa(R, 0);
    e_friso(R, 0, 319, 104, 131);
    e_tarima(R, 132, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 260, (y - 132) * 2) / 90) * 0.4, 3);
    e_alfombra(R, 122, 162, 104, 12, e_hx(['#2a1a3a', '#4a2a5a', '#6a3a6a', '#e8c890', '#8a2a30']));
    e_calleNevadaFija(R, ...VEN); e_marcoVentana(R, ...VEN);
    rect(56, 13, 164, 14, hex('#2a1a12')); rect(56, 13, 164, 13, hex('#c89a3a')); disco(56, 13, 2, hex('#e8b830')); disco(164, 13, 2, hex('#e8b830'));
    e_cortina(R, 58, 78, 15, 98, 64, -1); e_cortina(R, 142, 162, 15, 98, 64, 1);
    // un cuadrito con una lechuza y otro con una foto, a los lados de la ventana
    for (const [x0, y0, x1, y1, k] of [[22, 30, 44, 52, 0], [178, 34, 196, 50, 1]]) { rect(x0, y0, x1, y1, hex('#2a1a10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#c8962a')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0cc6a')); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, k ? hex('#d8c8a8') : hex('#2a3a5a'));
      if (k === 0) { const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1; disco(cx, cy + 2, 5, hex('#e8e0d0')); disco(cx, cy - 3, 4, hex('#e8e0d0')); pset(cx - 2, cy - 3, hex('#1a1010')); pset(cx + 2, cy - 3, hex('#1a1010')); pset(cx, cy - 1, hex('#e8a83a')); for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y0 + 4 + ((x * 7) % 3 === 0 ? 1 : 0), hex('#e8e8f8')); }
      else { for (const [dx, c] of [[-4, hex('#c8282e')], [0, hex('#e8b830')], [4, hex('#3a6ad8')]]) { disco(((x0 + x1) >> 1) + dx, y0 + 8, 2, hex('#e8b890')); rect(((x0 + x1) >> 1) + dx - 2, y0 + 11, ((x0 + x1) >> 1) + dx + 2, y1 - 4, c); } } }
    e_sofa(R, 26, 198, 82, 116, 140);
    e_cojin(R, 52, 108, 9, 7, hex('#c8282e'), hex('#e85a5a'), hex('#8a1a20'), true); e_cojin(R, 172, 108, 9, 7, hex('#2a6a3a'), hex('#4a8a5a'), hex('#1a4a2a'), true); e_cojin(R, 74, 110, 7, 6, hex('#e8dcc0'), hex('#f8f0e0'), hex('#b8a888'));
    e_manta(R, 122, 166, 84, 136);
    // el árbol que asoma por la izquierda y sus regalos
    e_abeto(R, 4, 40, 128, 34);
    e_regalo(R, 0, 136, 18, 150, hex('#2a5ab8'), hex('#f0f0f8'));
    // la cómoda baja y la tele grande
    rect(208, 108, 316, 136, hex('#1a0e08')); rect(209, 109, 315, 135, hex('#5a3620')); rect(209, 109, 315, 110, hex('#946038')); rect(209, 109, 315, 109, hex('#b47e4c'));
    for (let x = 210; x < 315; x++) for (let y = 112; y < 134; y++) if (h(x >> 1, y * 5, 707) < 0.14) pset(x, y, hex('#43281a'));
    for (const [a, b] of [[212, 246], [250, 280], [284, 312]]) { rect(a, 113, b, 132, hex('#24140c')); rect(a + 1, 114, b - 1, 131, hex('#4a2c1a')); rect(a + 2, 115, b - 2, 130, hex('#5a3620')); rect(((a + b) >> 1) - 2, 121, ((a + b) >> 1) + 2, 122, hex('#e8b830')); }
    for (const x of [211, 312]) { rect(x, 136, x + 2, 141, hex('#24140c')); }
    e_teleMarco(R, 216, 56, 304, 104);
    rect(226, 105, 294, 107, hex('#1a1a22'));
    e_sombra(R, 112, 143, 90, 4, 0.25);
  });
  e_calleNevadaVida(R, t, ...VEN, 2); e_marcoVentana(R, ...VEN);
  e_guirnalda(R, 66, 17, 154, 17, 6, 16, t, 5);
  e_abetoLuces(R, 4, 40, 128, 34, t);
  e_pantalla(R, t, PANT, o, e_teleMenu);
  // la luz de la tele que tiembla sobre el sofá, la alfombra y la cómoda
  { const c = R.pget((PANT[0] + PANT[2]) >> 1, (PANT[1] + PANT[3]) >> 1), luzT = e_mezcla(c || hex('#6a8ad8'), hex('#a8c8ff'), 0.5), a = 0.12 + 0.05 * Math.sin(t * 5) * Math.sin(t * 1.3);
    for (let y = 82; y <= 150; y++) for (let x = 120; x <= 210; x++) { const g = 1 - Math.hypot(x - 215, (y - 100) * 1.2) / 110; if (g > 0 && ((x + y) & 1) && g * 1.4 > e_b4(x, y)) e_tine(R, x, y, luzT, a * g * 2); } }
  return { suelo: 148, pantalla: PANT, ventana: VEN, sofa: { x0: 26, x1: 198, asiento: 116, respaldo: 82, sitios: [64, 112, 160] }, mesa: [66, 154, 176, 160], tele: [216, 56, 304, 104], arbol: { x: 4, punta: 39 }, libre: [40, 200] };
}

// la mesa baja de madera (x0–x1, tablero en y) con sus patas, las palomitas, la taza que humea, el mando y un libro;
// libro = true: el libro boca abajo con la piedra roja en la tapa y una vela en su tarro (la cámara del sofá)
function e_mesaBaja(R, t, x0, x1, y, libro) {
  const { rect, pset, disco } = R;
  e_sombra(R, (x0 + x1) >> 1, y + 18, ((x1 - x0) >> 1) + 4, 2, 0.3);
  for (const x of [x0 + 4, x1 - 7]) { rect(x, y + 6, x + 3, y + 18, hex('#24140c')); rect(x, y + 6, x, y + 18, hex('#74482a')); }
  rect(x0, y, x1, y + 6, hex('#24140c')); rect(x0 + 1, y, x1 - 1, y + 3, hex('#946038')); rect(x0 + 1, y, x1 - 1, y, hex('#c8925a')); rect(x0 + 1, y + 4, x1 - 1, y + 5, hex('#5a3620'));
  for (let x = x0 + 2; x < x1 - 1; x++) if (h(x, 3, 720) < 0.3) pset(x, y + 1 + (x % 2), hex('#74482a'));
  const mx = (x0 + x1) >> 1;
  // las palomitas en su cubo de rayas
  { const bx = x0 + 14; for (let j = 0; j < 7; j++) { const w = 6 - Math.round(j * 0.25); for (let i = -w; i <= w; i++) pset(bx + i, y - 1 - j, ((i + 20) >> 1) % 2 ? hex('#c8282e') : hex('#f0f0f0')); } for (let k = 0; k < 14; k++) disco(bx - 5 + Math.round(h(k, 1, 721) * 10), y - 9 - Math.round(h(k, 2, 721) * 3), 1, k % 4 ? hex('#fff6d8') : hex('#e8c860')); }
  // la taza que humea
  { const tx = libro ? x1 - 22 : mx - 4; rect(tx - 3, y - 7, tx + 3, y - 1, hex('#1a1010')); rect(tx - 2, y - 6, tx + 2, y - 1, hex('#c8282e')); rect(tx - 2, y - 6, tx + 2, y - 6, hex('#5a2a1a')); rect(tx - 2, y - 5, tx - 2, y - 2, hex('#e85a5a')); rect(tx + 4, y - 5, tx + 5, y - 3, hex('#1a1010')); pset(tx + 4, y - 4, hex('#c8282e')); e_vapor(R, tx, y - 8, t, 0.4); }
  // el mando
  { const rx = libro ? mx + 2 : mx + 14; rect(rx, y - 2, rx + 9, y - 1, hex('#1a1a22')); pset(rx + 2, y - 2, hex('#c83a3a')); pset(rx + 5, y - 2, hex('#5a5a6a')); pset(rx + 7, y - 2, hex('#5a5a6a')); }
  if (!libro) { const bx = x1 - 22; rect(bx, y - 4, bx + 14, y - 1, hex('#1a1010')); rect(bx + 1, y - 4, bx + 13, y - 2, hex('#2a4a8a')); rect(bx + 1, y - 1, bx + 13, y - 1, hex('#f0e8d0')); rect(bx + 3, y - 3, bx + 11, y - 3, hex('#e8c860')); return; }
  // el libro boca abajo, abierto como una tienda: la tapa con la piedra roja que brilla, las hojas y el lomo
  { const bx = x0 + 34, w = 26; R.poligono([[bx, y], [bx + w / 2, y - 9], [bx + w, y]], hex('#1a1010')); R.poligono([[bx + 1, y - 1], [bx + w / 2, y - 8], [bx + w / 2, y - 1]], hex('#8a2a2a')); R.poligono([[bx + w / 2, y - 8], [bx + w - 1, y - 1], [bx + w / 2, y - 1]], hex('#6a1e1e'));
    rect(bx + 2, y - 1, bx + w - 2, y - 1, hex('#f0e8d0')); R.linea(bx + w / 2, y - 9, bx + w / 2, y - 1, hex('#c89a3a'));
    const gx = bx + 7, gy = y - 4, b = 0.5 + 0.5 * Math.sin(t * 2.2); R.poligono([[gx, gy - 2], [gx + 2, gy], [gx, gy + 2], [gx - 2, gy]], hex('#e8283a')); pset(gx - 1, gy - 1, hex('#ff8a8a')); if (b > 0.6) { e_resplandor(R, gx, gy, 5, hex('#ff5a5a'), 0.5 * b); pset(gx, gy - 3, hex('#ffd0d0')); } }
  // la vela en su tarro
  { const vx = x1 - 10; rect(vx - 3, y - 8, vx + 3, y - 1, hex('#8a8a9a')); rect(vx - 2, y - 7, vx + 2, y - 1, hex('#c8a8b8')); rect(vx - 2, y - 4, vx + 2, y - 1, hex('#e8e0d0')); const fl = Math.sin(t * 9) > 0; pset(vx, y - 5, hex('#ffd060')); pset(vx, y - 6, fl ? hex('#fff6c0') : hex('#ff9a3a')); e_resplandor(R, vx, y - 5, 7, hex('#ffd890'), 0.35); }
}

// las cuatro pistas y el relleno, en coordenadas de la cámara 'cerca' (s = 2); la general las pone a s = 1 dentro de su
// corcho. P: [x, y, ancho, alto] de cada tarjeta; la chincheta va arriba en el centro
const E_PISTAS = [[20, 26, 60, 58], [96, 22, 56, 72], [170, 28, 64, 56], [224, 88, 66, 54]];

const E_RELLENO = { mapa: [16, 96, 66, 46], nota1: [90, 102, 30, 30], nota2: [124, 112, 28, 28], cal: [158, 96, 40, 44], billete: [96, 140, 72, 0], foto: [244, 30, 32, 40], rayo: [202, 98, 0, 0] };

// una chincheta (x, y) de color c con su brillo y su sombra
function e_chincheta(R, x, y, c, s = 1) {
  if (s > 1) { e_tine(R, x + 2, y + 3, hex('#000000'), 0.35); e_tine(R, x + 3, y + 3, hex('#000000'), 0.3); R.disco(x, y, 2, hex('#140a0a')); R.disco(x, y, 2 - 0.5, c); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.4)); }
  else { e_tine(R, x + 1, y + 2, hex('#000000'), 0.35); R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, e_mezcla(c, hex('#000000'), 0.3)); R.pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.3)); R.pset(x, y, e_mezcla(c, hex('#ffffff'), 0.5)); }
}

// un papel (x0, y0, w, a) con su sombra en el corcho, el color c y un poco torcido por la esquina de abajo
function e_papelito(R, x0, y0, w, a, c, s) {
  const { rect, pset } = R; for (let y = y0 + s; y <= y0 + a + s; y++) for (let x = x0 + s; x <= x0 + w + s; x++) if (((x + y) & 1) || s > 1) e_tine(R, x, y, hex('#2a1408'), 0.4);
  rect(x0, y0, x0 + w, y0 + a, c); rect(x0, y0, x0 + w, y0, e_mezcla(c, hex('#ffffff'), 0.35)); rect(x0 + w, y0, x0 + w, y0 + a, e_mezcla(c, hex('#000000'), 0.18)); rect(x0, y0 + a, x0 + w, y0 + a, e_mezcla(c, hex('#000000'), 0.22));
  for (let i = 0; i < 3 * s; i++) for (let j = 0; j <= i; j++) pset(x0 + w - i, y0 + a - (3 * s - 1 - i) + j - 0, e_mezcla(c, hex('#000000'), 0.1));
}

// las gafas redondas (cx, cy, escala s): dos aros finos de alambre con su puente y el brillo en el cristal
function e_gafas(R, cx, cy, s, c = hex('#1a1424')) {
  const r = 5 * s; for (const d of [-1, 1]) { const x = cx + d * (r + s); for (let a = 0; a < Math.PI * 2; a += 0.5 / r) R.pset(Math.round(x + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), c); if (s > 1) for (let a = 0; a < Math.PI * 2; a += 0.5 / r) R.pset(Math.round(x + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), c);
    R.linea(x - Math.round(r * 0.4), cy - Math.round(r * 0.5), x - Math.round(r * 0.1), cy - Math.round(r * 0.7), hex('#ffffff')); R.linea(x + d * r, cy - 1, x + d * (r + 3 * s), cy - 2 * s, c); }
  R.linea(cx - s, cy - s, cx + s, cy - s, c); R.pset(cx, cy - 2 * s, c);
}

// la moto voladora: rueda, rueda, el depósito, el sidecar y el humo que sale; mira a la derecha
function e_moto(R, x, y, s, t) {
  const K = hex('#1a1424'), r = 3 * s; R.anillo(x - 6 * s, y, r, K); R.anillo(x + 6 * s, y, r, K); R.pset(x - 6 * s, y, K); R.pset(x + 6 * s, y, K);
  R.poligono([[x - 6 * s, y - s], [x - 2 * s, y - 5 * s], [x + 4 * s, y - 5 * s], [x + 6 * s, y - s]], hex('#3a3a4a')); R.linea(x + 3 * s, y - 6 * s, x + 7 * s, y - 8 * s, K); R.rect(x - 2 * s, y - 6 * s, x + 2 * s, y - 5 * s, hex('#c83a3a'));
  R.poligono([[x - 10 * s, y + 4 * s], [x - 14 * s, y - s], [x - 9 * s, y - 2 * s]], hex('#8a8a9a'));
  for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; R.disco(Math.round(x - 10 * s - u * 10 * s), Math.round(y + 2 * s + Math.sin(u * 6 + i) * s), Math.max(1, Math.round((1 + u * 2) * s * 0.7)), hex('#b8b8c8')); }
  for (let i = 0; i < 3; i++) R.linea(x - 12 * s, y - 4 * s + i * 3 * s, x - 16 * s - i * 2 * s, y - 4 * s + i * 3 * s, hex('#6a6a8a'));
}

// unas tijeras abiertas (cx, cy, escala s) en diagonal: dos hojas plateadas y dos aros rojos
function e_tijeras(R, cx, cy, s, ab = 0.35) {
  for (const d of [-1, 1]) { const a = -0.8 + d * ab, ex = Math.round(cx + Math.cos(a) * 11 * s), ey = Math.round(cy + Math.sin(a) * 11 * s);
    for (let i = 0; i < s; i++) R.linea(cx, cy + i, ex, ey + i, hex('#c8d0dc')); R.linea(cx, cy + s, ex, ey + s, hex('#6c7688'));
    const ax = Math.round(cx - Math.cos(a) * 6 * s), ay = Math.round(cy - Math.sin(a) * 6 * s); R.linea(cx, cy, ax, ay, hex('#4a5262')); R.anillo(ax, ay, 2 * s, hex('#c8282e')); if (s > 1) R.anillo(ax, ay, 2 * s - 1, hex('#e85a5a')); }
  R.pset(cx, cy, hex('#ffffff'));
}

// un rollo de película (cx, cy, radio r): la lata con sus agujeros y la tira que sale con perforaciones
function e_rollo(R, cx, cy, r, s) {
  R.disco(cx, cy, r, hex('#2a2a34')); R.disco(cx, cy, r - s, hex('#5a5a6a')); R.disco(cx, cy, Math.max(1, r - 2 * s), hex('#3a2a22')); R.disco(cx, cy, Math.round(r * 0.35), hex('#8a8a9a'));
  for (let k = 0; k < 3; k++) { const a = k * 2.09; R.disco(Math.round(cx + Math.cos(a) * r * 0.6), Math.round(cy + Math.sin(a) * r * 0.6), Math.max(1, Math.round(r * 0.14)), hex('#1a1a22')); }
  const y0 = cy + r - 3 * s; R.rect(cx, y0, cx + r * 2, y0 + 4 * s, hex('#3a2a22')); for (let x = cx + s; x < cx + r * 2; x += 3 * s) { R.pset(x, y0 + Math.round(s / 2), hex('#c8b890')); R.pset(x, y0 + 4 * s - Math.round(s / 2), hex('#c8b890')); }
  for (let x = cx + 4 * s; x < cx + r * 2 - s; x += 7 * s) R.rect(x, y0 + s + Math.round(s / 2), x + 4 * s, y0 + 3 * s - 1, hex('#8a6a4a'));
}

// una cara pequeña de la lista de reparto (círculo de color con pelo)
function e_carita(R, x, y, s, pelo, piel = hex('#f0c8a0')) { R.disco(x, y, 2 * s, piel); for (let i = -2 * s; i <= 2 * s; i++) R.pset(x + i, y - 2 * s + (Math.abs(i) > s ? 1 : 0), pelo); if (s > 1) for (let i = -3; i <= 3; i++) R.pset(x + i, y - 3, pelo); R.pset(x - s, y, hex('#1a1424')); R.pset(x + s, y, hex('#1a1424')); }

// una tarjeta de pista k (0–3) en (x, y, w, a) a escala s; luz 0–1 la enciende (marco dorado y destello)
function e_pista(R, k, x, y, w, a, s, t, luz) {
  const { rect, pset } = R, cs = [hex('#f6f2e6'), hex('#f2ead2'), hex('#f6f2e6'), hex('#fff4c8')][k];
  if (luz > 0) { for (let i = 1; i <= 3 * s; i++) { const f = luz * (1 - i / (3 * s + 1)); for (let xx = x - i; xx <= x + w + i; xx++) { if (e_b4(xx, y - i) < f) e_tine(R, xx, y - i, hex('#ffe08a'), 0.6); if (e_b4(xx, y + a + i) < f) e_tine(R, xx, y + a + i, hex('#ffe08a'), 0.6); } for (let yy = y - i; yy <= y + a + i; yy++) { if (e_b4(x - i, yy) < f) e_tine(R, x - i, yy, hex('#ffe08a'), 0.6); if (e_b4(x + w + i, yy) < f) e_tine(R, x + w + i, yy, hex('#ffe08a'), 0.6); } } }
  e_papelito(R, x, y, w, a, cs, s);
  const cx = x + (w >> 1);
  if (k === 0) { rect(x + 2 * s, y + 2 * s, x + w - 2 * s, y + a - 9 * s, hex('#a8c8e0')); for (let yy = y + 2 * s; yy < y + a - 9 * s; yy++) if (yy % 3 === 0) rect(x + 2 * s, yy, x + w - 2 * s, yy, hex('#b8d4e8')); e_gafas(R, cx, y + Math.round((a - 7 * s) / 2), s); R.linea(x + 4 * s, y + a - 5 * s, x + w - 6 * s, y + a - 5 * s, hex('#8a8aa0')); }
  if (k === 1) { const pel = e_hx(['#2a1a14', '#c8502a', '#7a4a2a', '#d8d8e0', '#1a1a1a']); for (let i = 0; i < 5; i++) { const yy = y + 5 * s + i * 7 * s; e_carita(R, x + 5 * s, yy, s, pel[i]); R.linea(x + 9 * s, yy, x + w - 4 * s - (i * 3 % 7) * s, yy, hex('#5a5a7a')); if (s > 1) R.linea(x + 9 * s, yy + 2, x + w - 12 * s, yy + 2, hex('#a8a8c0')); } for (let yy = y + 2 * s; yy < y + a; yy += 4 * s) pset(x + 2 * s, yy, hex('#e8a8a8')); }
  if (k === 2) { rect(x + 2 * s, y + 2 * s, x + w - 2 * s, y + a - 2 * s, hex('#3a3440')); e_rollo(R, x + 12 * s, y + Math.round(a / 2) - s, 8 * s, s); e_tijeras(R, x + w - 12 * s, y + 12 * s, s, 0.3 + 0.08 * Math.sin(t * 3)); }
  if (k === 3) { R.icono('?', x + 3 * s, y + 4 * s, hex('#c8282e'), hex('#5a1414'), 2 * s); e_moto(R, x + w - 16 * s, y + Math.round(a * 0.62) + Math.round(Math.sin(t * 2) * s), s, t); for (let i = 0; i < 4; i++) pset(x + w - 6 * s - i * 9 * s, y + 4 * s + (i % 2) * 2 * s, hex('#e8b830')); }
  if (luz > 0.8) { const g = (t * 1.3 + k * 0.4) % 2; if (g < 0.4) { const sx = x + w - 2 * s, sy = y + 2 * s, l = Math.round((1 - Math.abs(g - 0.2) * 5) * 3 * s); R.linea(sx - l, sy, sx + l, sy, hex('#ffffff')); R.linea(sx, sy - l, sx, sy + l, hex('#ffffff')); } }
  e_chincheta(R, cx, y + s, [hex('#d8282e'), hex('#2a6ad8'), hex('#e8b830'), hex('#3aa86a')][k], s);
  if (luz < 0) for (let yy = y; yy <= y + a; yy++) for (let xx = x; xx <= x + w; xx++) if ((xx + yy) & 1) e_tine(R, xx, yy, hex('#3a2410'), 0.35);
}

// el relleno del corcho (escala s; o: desplazamiento [ox, oy] de la cerca a esta cámara)
function e_rellenoCorcho(R, s, ox, oy, t) {
  const { rect, pset } = R, P = (q) => [Math.round(ox + q[0] * s / 2), Math.round(oy + q[1] * s / 2), Math.round(q[2] * s / 2), Math.round(q[3] * s / 2)], F = E_RELLENO;
  { const [x, y, w, a] = P(F.mapa); e_papelito(R, x, y, w, a, hex('#e8d8b0'), s); for (let i = 0; i < 9; i++) { const bx = x + 3 + Math.round(h(i, 1, 730) * (w - 8)), by = y + 3 + Math.round(h(i, 2, 730) * (a - 8)); R.disco(bx, by, s + 1, hex('#a8c890')); }
    for (let xx = x + 1; xx < x + w; xx++) pset(xx, Math.round(y + a * 0.6 + Math.sin(xx * 0.3) * 2 * s), hex('#5a8ac8'));
    for (let i = 0; i < 10; i++) { const u = i / 10, xx = Math.round(x + 4 * s + u * (w - 10 * s)), yy = Math.round(y + a * 0.3 + Math.sin(u * 5) * a * 0.18); if (i % 2 === 0) { pset(xx, yy, hex('#c8282e')); if (s > 1) pset(xx + 1, yy, hex('#c8282e')); } }
    R.linea(x + w - 8 * s, y + 4 * s, x + w - 4 * s, y + 8 * s, hex('#c8282e')); R.linea(x + w - 4 * s, y + 4 * s, x + w - 8 * s, y + 8 * s, hex('#c8282e')); e_chincheta(R, x + 3 * s, y + 2 * s, hex('#e8b830'), s); }
  { const [x, y, w] = P(F.nota1); e_papelito(R, x, y, w, w, hex('#f8e870'), s); for (let i = 0; i < 4; i++) R.linea(x + 2 * s, y + 4 * s + i * 3 * s, x + w - 2 * s - (i % 2) * 3 * s, y + 4 * s + i * 3 * s, hex('#7a6a2a')); }
  { const [x, y, w] = P(F.nota2); e_papelito(R, x, y, w, w, hex('#f8a8c8'), s); R.icono('rayo', x + Math.round(w / 2) - 3 * s, y + 3 * s, hex('#c8282e'), hex('#7a1a3a'), s); }
  { const [x, y, w, a] = P(F.cal); e_papelito(R, x, y, w, a, hex('#f6f2e6'), s); rect(x + 1, y + 1, x + w - 1, y + 7 * s, hex('#c8282e')); for (let xx = x + 3 * s; xx < x + w - s; xx += 4 * s) pset(xx, y + s, hex('#f0f0f0'));
    R.numero('12', x + Math.round(w / 2), y + 7 * s - s, { centro: true, rampa: [hex('#ffffff'), hex('#ffffff'), hex('#ffffff'), hex('#ffffff')] });
    R.numero('25', x + Math.round(w / 2), y + a - 3 * s, { centro: true, tam: s > 1 ? 16 : 8, rampa: [hex('#2a1a1a'), hex('#5a1a1a'), hex('#8a2020'), hex('#c8282e')] });
    e_chincheta(R, x + Math.round(w / 2), y + s, hex('#3aa86a'), s); }
  { const [x, y, w] = P(F.billete), a = 13 * s; e_papelito(R, x, y, w, a, hex('#f0b860'), s); rect(x + 1, y + 1, x + w - 1, y + 3 * s, hex('#c8502a')); for (let yy = y + 1; yy < y + a; yy += 2) pset(x + w - 9 * s, yy, hex('#a87030'));
    R.numero('9 3/4', x + 3 * s, y + a - 2 * s, { fina: s < 2, rampa: [hex('#3a1a10'), hex('#5a2a14'), hex('#7a3a1a'), hex('#8a4020')] }); e_chincheta(R, x + w - 4 * s, y + 2 * s, hex('#d8282e'), s); }
  { const [x, y, w, a] = P(F.foto); e_papelito(R, x, y, w, a, hex('#f6f2e6'), s); const fx0 = x + 2 * s, fy0 = y + 2 * s, fx1 = x + w - 2 * s, fy1 = y + a - 8 * s;
    for (let yy = fy0; yy <= fy1; yy++) rect(fx0, yy, fx1, yy, e_mezcla(hex('#1a2050'), hex('#5a4a7a'), (yy - fy0) / (fy1 - fy0)));
    const bx = (fx0 + fx1) >> 1; for (const [dx, al, wd] of [[-8, 8, 3], [-3, 14, 3], [2, 11, 3], [6, 6, 4]]) { rect(bx + dx * s / 2 * 1, fy1 - al * s / 2 * 1.2, bx + dx * s / 2 + wd * s / 2 + s, fy1, hex('#0a0c1a')); } pset(bx - 2, fy1 - 4 * s, hex('#ffd060')); pset(bx + 2 * s, fy1 - 3 * s, hex('#ffd060'));
    rect(fx0, fy1 - s, fx1, fy1, hex('#2a3a6a')); e_chincheta(R, x + Math.round(w / 2), y + s, hex('#e8b830'), s); }
}

// el hilo rojo con su comba entre dos puntos; luz (0–1) lo enciende y le corre un pulso de a hacia b
function e_hilo(R, a, b, s, t, luz = 0) {
  const L = Math.max(4, Math.hypot(b[0] - a[0], b[1] - a[1])), cae = L * 0.06; let ant = a;
  for (let i = 1; i <= L; i++) { const u = i / L, p = [Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * cae)];
    const pulso = luz > 0 && Math.abs(((t * 0.8) % 1) - u) < 0.04, c = pulso ? hex('#fff0c0') : luz > 0.5 ? hex('#ff4a4a') : hex('#b0181e');
    R.linea(ant[0], ant[1], p[0], p[1], c); if (s > 1) { R.pset(p[0], p[1] + 1, pulso ? hex('#ffd060') : luz > 0.5 ? hex('#c8282e') : hex('#6a0a10')); } ant = p; }
}

function e_corcho(R, t, o, cerca) {
  const { rect, pset, disco, linea } = R, pistas = o.pistas, s = cerca ? 2 : 1;
  // el corcho: x0–x1, y0–y1 (con el marco) y cómo se pasa de las coordenadas de la cerca a esta cámara
  const K = cerca ? [4, 14, 315, 152] : [38, 18, 256, 128], ox = cerca ? 0 : 42, oy = cerca ? 0 : 20, sc = cerca ? 1 : 0.5;
  const pos = (q) => [Math.round(ox + q[0] * sc), Math.round(oy + q[1] * sc), Math.round(q[2] * sc), Math.round(q[3] * sc)];
  e_fijo(R, cerca ? 'hp:corchoCerca' : 'hp:corcho', () => {
    const PARED = e_hx(['#141a2c', '#1c243a', '#252f4a', '#2e3a58', '#3e4a68']);
    const luzL = (x, y) => cerca ? Math.max(0, 1 - Math.hypot(x - 20, y - 150) / 260) * 1.2 : Math.max(0, 1 - Math.hypot(x - 52, y - 98) / 190) * 1.5;
    // la pared de yeso, con su grano y la luz del flexo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1 + luzL(x, y) * 2.2 + (h(x, y, 740) - 0.5) * 0.5 + (h(x >> 3, y >> 3, 741) - 0.5) * 0.4; if (x > 268 && y < 50) v = Math.min(v, 1.6); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, PARED[Math.max(0, Math.min(4, l))]); }
    // el corcho con su marco de roble
    const [x0, y0, x1, y1] = K, CO = e_hx(['#6a4220', '#8a5a2e', '#a8703c', '#c08a4e', '#d8a868', '#ecc488']);
    for (let y = y0 + 4; y <= y1 - 4; y++) for (let x = x0 + 4; x <= x1 - 4; x++) { let v = 2.3 + luzL(x, y) * 1.4 + (h(x, y, 742) - 0.5) * 1.3 + (h(x >> 1, y >> 1, 743) < 0.08 ? -1.4 : 0) + (h(x, y, 744) < 0.04 ? 1.4 : 0); if (x > 268 && y < 50) v = 2.4 + (h(x, y, 742) - 0.5) * 0.6; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CO[Math.max(0, Math.min(5, l))]); }
    rect(x0, y0, x1, y0 + 3, hex('#5a3620')); rect(x0, y0, x0 + 3, y1, hex('#74482a')); rect(x1 - 3, y0, x1, y1, hex('#3e2416')); rect(x0, y1 - 3, x1, y1, hex('#43281a'));
    rect(x0, y0, x1, y0, hex('#b47e4c')); rect(x0, y0, x0, y1, hex('#946038')); rect(x0 + 3, y0 + 3, x1 - 3, y0 + 3, hex('#24140c')); rect(x0 + 3, y0 + 3, x0 + 3, y1 - 3, hex('#24140c')); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, hex('#0e1220'));
    for (let x = x0 + 6; x < x1 - 4; x += 3) if (h(x, 1, 745) < 0.5) { pset(x, y0 + 1, hex('#74482a')); pset(x, y1 - 1, hex('#5a3620')); }
    // los agujeros de chinchetas viejas
    for (let k = 0; k < (cerca ? 40 : 22); k++) pset(Math.round(x0 + 8 + h(k, 1, 746) * (x1 - x0 - 16)), Math.round(y0 + 8 + h(k, 2, 746) * (y1 - y0 - 16)), hex('#4a2a14'));
    e_rellenoCorcho(R, s, ox, oy, 0);
    if (!cerca) {
      // el rodapié y el suelo de tablas con la alfombra
      rect(0, 142, 319, 147, hex('#1a1020')); rect(0, 142, 319, 142, hex('#4a4a5a'));
      e_tarima(R, 148, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 60, (y - 148) * 2) / 200) * 0.5 - 0.4, 7);
      e_alfombra(R, 170, 168, 80, 9, e_hx(['#1a2a3a', '#2a4a5a', '#3a6a7a', '#e8c890', '#8a2a30']));
      // el escritorio de la izquierda: el tablero, los cajones, el portátil, el bote de lápices y los libros
      rect(0, 128, 74, 133, hex('#24140c')); rect(0, 128, 74, 130, hex('#946038')); rect(0, 128, 74, 128, hex('#c8925a')); rect(2, 133, 70, 166, hex('#3e2416')); rect(3, 134, 69, 165, hex('#5a3620'));
      for (const y of [136, 147, 158]) { rect(40, y, 68, y + 8, hex('#24140c')); rect(41, y + 1, 67, y + 7, hex('#74482a')); rect(52, y + 3, 56, y + 4, hex('#e8b830')); } rect(4, 140, 6, 166, hex('#2a1810'));
      rect(10, 116, 34, 127, hex('#1a1a22')); rect(11, 117, 33, 126, hex('#2a3a5a')); rect(6, 127, 38, 128, hex('#8a8a9a'));
      rect(52, 116, 58, 127, hex('#2a2a3a')); rect(53, 117, 57, 127, hex('#4a6a9a')); for (const [x, c] of [[53, '#c8282e'], [55, '#e8b830'], [57, '#3aa86a']]) linea(x, 116, x + (x - 55), 108, hex(c));
      for (const [y, c] of [[124, '#8a2a2a'], [121, '#2a5a8a'], [118, '#c88a2a']]) { rect(62, y, 73, y + 2, hex(c)); rect(62, y + 2, 73, y + 2, e_mezcla(hex(c), hex('#000000'), 0.4)); }
      // el flexo: base, brazo articulado y la pantalla que mira al corcho
      rect(20, 125, 30, 127, hex('#1a1a22')); linea(25, 125, 29, 104, hex('#c83a3a')); linea(26, 125, 30, 104, hex('#8a2424')); linea(29, 104, 40, 96, hex('#c83a3a')); disco(29, 104, 1, hex('#1a1a22'));
      R.poligono([[38, 92], [46, 88], [48, 98], [42, 100]], hex('#c83a3a')); linea(46, 88, 48, 98, hex('#ff8a6a'));
      // la ventanita con su cortina, a la izquierda arriba
      rect(4, 26, 32, 80, hex('#e8e0d0')); rect(6, 28, 30, 78, hex('#14183a')); R.recorte([6, 28, 30, 78]); e_calleNevadaFija(R, 6, 28, 30, 78); R.recorte(null); rect(17, 28, 18, 78, hex('#e8e0d0')); rect(6, 52, 30, 53, hex('#e8e0d0')); rect(2, 80, 34, 82, hex('#c8c0b0'));
      // la librería de la derecha con libros sin letras, una planta y una caja
      rect(262, 54, 318, 160, hex('#24140c')); rect(264, 56, 316, 158, hex('#3e2416'));
      const LB = e_hx(['#8a2a2a', '#2a5a8a', '#2a6a3a', '#c88a2a', '#5a2a6a', '#8a5a2a', '#3a3a5a', '#a8a8b8']);
      for (const [y, k] of [[78, 0], [102, 1], [126, 2], [150, 3]]) { rect(264, y, 316, y + 2, hex('#74482a')); rect(264, y, 316, y, hex('#a8703f'));
        if (k === 1) continue; let x = 266; while (x < 314) { const w = 3 + Math.round(h(x, k, 747) * 3), a = 14 + Math.round(h(x, k, 748) * 8), c = LB[Math.floor(h(x, k, 749) * 8)]; if (x + w > 314) break; rect(x, y - a, x + w - 1, y - 1, c); rect(x, y - a, x, y - 1, e_mezcla(c, hex('#ffffff'), 0.25)); rect(x, y - a + 3, x + w - 1, y - a + 3, hex('#e8c860')); x += w + (h(x, k, 750) < 0.15 ? 4 : 0); } }
      rect(268, 92, 282, 101, hex('#8a6a4a')); rect(268, 92, 282, 92, hex('#b8946a')); disco(300, 92, 4, hex('#2a6a3a')); rect(296, 96, 304, 101, hex('#c86a3a'));
      rect(262, 52, 318, 54, hex('#74482a')); rect(262, 52, 318, 52, hex('#a8703f'));
      // las sombras del escritorio y de la librería en el suelo, y la papelera con bolas de papel
      e_sombra(R, 36, 168, 40, 2, 0.35); e_sombra(R, 290, 162, 32, 2, 0.35);
      for (let j = 0; j < 12; j++) { const w = 5 + Math.round(j * 0.15); for (let i = -w; i <= w; i++) pset(86 + i, 166 - j, (i + j) % 3 === 0 ? hex('#5a5a6a') : hex('#2a2a34')); }
      for (const [x, y] of [[83, 153], [89, 154], [86, 151]]) { R.disco(x, y, 2, hex('#e8e4d8')); pset(x - 1, y - 1, hex('#ffffff')); pset(x + 1, y + 1, hex('#a8a498')); }
      R.disco(100, 170, 2, hex('#e8e4d8')); pset(99, 169, hex('#ffffff'));
    } else {
      // el tablero de la mesa visto desde arriba, con sus vetas
      for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2.6 + Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2 + h(y, 1, 751) * 3) * 0.5 + (y === 154 ? 1.4 : 0) - (y - 154) * 0.03 + (h(x, y, 752) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, E_TAR[Math.max(0, Math.min(5, l))]); }
      rect(0, 153, 319, 153, hex('#1a0e08'));
      // el ovillo rojo con el hilo que sube al corcho, la caja de chinchetas, la lupa y las tijeras
      disco(30, 166, 8, hex('#6a0a10')); disco(30, 165, 7, hex('#b0181e')); for (let a = 0; a < 6; a++) linea(Math.round(30 + Math.cos(a) * 6), Math.round(165 + Math.sin(a) * 6), Math.round(30 - Math.cos(a + 2) * 6), Math.round(165 - Math.sin(a + 2) * 6), hex('#e83a3a'));
      rect(64, 160, 92, 172, hex('#1a1a22')); rect(65, 161, 91, 171, hex('#a8a8b8')); rect(66, 162, 90, 170, hex('#5a5a6a')); for (let k = 0; k < 16; k++) e_chincheta(R, 68 + Math.round(h(k, 1, 753) * 20), 163 + Math.round(h(k, 2, 753) * 6), [hex('#d8282e'), hex('#2a6ad8'), hex('#e8b830'), hex('#3aa86a')][k % 4], 1);
      disco(206, 166, 8, hex('#1a1a22')); disco(206, 166, 7, hex('#c89a3a')); disco(206, 166, 6, hex('#a8d0e8')); pset(203, 163, hex('#ffffff')); pset(204, 163, hex('#ffffff')); linea(212, 171, 226, 177, hex('#1a1010')); linea(212, 172, 226, 178, hex('#5a3a2a'));
      e_tijeras(R, 120, 168, 1, 0.25);
    }
  });
  // la vida: las tarjetas (encendidas o no), el hilo, el corcho que brilla con el flexo, el gato, el portátil
  const luzDe = (k) => pistas == null ? 0 : Math.max(-1, Math.min(1, (pistas - k) * 2)), PI = E_PISTAS.map(pos);
  const pin = (q) => [q[0] + (q[2] >> 1), q[1] + s];
  const ext = (q) => [Math.round(ox + q[0] * sc + q[2] * sc / 2), Math.round(oy + q[1] * sc + s)];
  const hilos = [[pin(PI[0]), pin(PI[1]), 1], [pin(PI[1]), pin(PI[2]), 2], [pin(PI[2]), pin(PI[3]), 3], [pin(PI[0]), [Math.round(ox + (E_RELLENO.mapa[0] + 3) * sc * (cerca ? 1 : 1)), Math.round(oy + (E_RELLENO.mapa[1] + 2) * sc)], 0], [pin(PI[2]), ext(E_RELLENO.foto), 0], [pin(PI[3]), ext(E_RELLENO.cal), 0]];
  for (const [a, b, k] of hilos) e_hilo(R, a, b, s, t + k * 0.3, k > 0 ? Math.max(0, luzDe(k)) : (pistas == null ? 0 : 0));
  PI.forEach((q, k) => e_pista(R, k, q[0], q[1], q[2], q[3], s, t, luzDe(k) > 0 ? luzDe(k) : pistas == null ? 0 : -1));
  for (const [a, b, k] of hilos) if (k > 0 && luzDe(k) > 0.5) { const u = (t * 0.8) % 1; R.disco(Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.06), s, hex('#fff0c0')); }
  if (!cerca) {
    // la luz del flexo sobre el corcho, que tiembla un poco, la nieve de la ventanita, el portátil y el gato con su cola
    const f = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 2.1); R.pset(43, 97, hex('#fff6d0')); R.pset(44, 98, hex('#fff6d0')); e_resplandor(R, 46, 96, 8, hex('#fff0c0'), 0.6 * f);
    for (let y = 60; y < 128; y++) for (let x = 46; x < 130; x++) { const g = 1 - Math.hypot(x - 46, (y - 96) * 1.3) / 90; if (g > 0 && ((x ^ y) & 1) && g > e_b4(x, y) * 0.8) e_tine(R, x, y, hex('#ffe8b0'), 0.14 * f); }
    R.recorte([6, 28, 30, 78]); e_nieve(R, t, 6, 28, 30, 78, 12, 3); R.recorte(null); rect(17, 28, 18, 78, hex('#e8e0d0')); rect(6, 52, 30, 53, hex('#e8e0d0'));
    { const fa = Math.floor(t / 2) % 3; rect(12, 118, 32, 125, hex('#2a3a5a')); for (let i = 0; i < 3; i++) rect(13, 119 + i * 2, 13 + ((fa + i) % 3 + 1) * 6, 119 + i * 2, i === fa ? hex('#e8b830') : hex('#8ab0e0')); }
    // el reloj de pared, que anda
    { const cx = 19, cy = 102; disco(cx, cy, 7, hex('#1a1010')); disco(cx, cy, 6, hex('#f0e8d0')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k / 6 * Math.PI) * 5), Math.round(cy + Math.sin(k / 6 * Math.PI) * 5), hex('#5a4a3a')); const a = t * 0.6, b = 1.2 + t * 0.05; linea(cx, cy, Math.round(cx + Math.sin(a) * 4), Math.round(cy - Math.cos(a) * 4), hex('#1a1010')); linea(cx, cy, Math.round(cx + Math.sin(b) * 3), Math.round(cy - Math.cos(b) * 3), hex('#c83a3a')); }
    // el gato negro en la balda vacía: cuerpo, cabeza con orejas, ojos que parpadean y la cola que cuelga y se mueve
    { const gx = 290, gy = 101, K = hex('#16121c'), KL = hex('#3a3046'); R.poligono([[gx - 9, gy], [gx - 7, gy - 7], [gx + 4, gy - 8], [gx + 7, gy], [gx - 9, gy]], K); disco(gx + 6, gy - 10, 4, K); R.poligono([[gx + 3, gy - 13], [gx + 4, gy - 17], [gx + 6, gy - 13]], K); R.poligono([[gx + 7, gy - 13], [gx + 9, gy - 17], [gx + 10, gy - 12]], K); linea(gx - 6, gy - 7, gx + 2, gy - 8, KL);
      if (Math.floor(t * 0.5) % 4 !== 0 || (t % 2) > 0.15) { pset(gx + 5, gy - 10, hex('#e8d84a')); pset(gx + 8, gy - 10, hex('#e8d84a')); }
      for (let i = 0; i < 14; i++) { const u = i / 13, sw = Math.sin(t * 1.6 - u * 3) * u * 4; pset(Math.round(gx - 8 + sw), gy + 1 + i, K); pset(Math.round(gx - 7 + sw), gy + 1 + i, i % 4 ? K : KL); } }
  } else {
    // el hilo que sube del ovillo al corcho y la taza que humea
    e_hilo(R, [32, 158], [Math.round(E_RELLENO.mapa[0] + 6), Math.round(E_RELLENO.mapa[1] + E_RELLENO.mapa[3] - 4)], 2, t, 0);
    rect(262, 152, 278, 170, hex('#1a1010')); rect(263, 153, 277, 169, hex('#2a5ab8')); rect(263, 153, 277, 154, hex('#1a1a30')); rect(264, 155, 265, 168, hex('#5a8ae8')); rect(278, 157, 282, 165, hex('#1a1010')); rect(279, 158, 280, 164, hex('#2a5ab8'));
    e_vapor(R, 270, 151, t, 0.2, hex('#e8e4f0'), 18);
  }
  return cerca ? { suelo: 172, pistas: PI, chinchetas: PI.map(pin), corcho: K, mesa: 154, libre: [100, 250] }
    : { suelo: 160, pistas: PI, chinchetas: PI.map(pin), corcho: K, escritorio: [0, 128, 74, 166], flexo: [44, 96], libreria: [262, 54, 318, 160], gato: [290, 101], libre: [84, 250] };
}

// lo que sale en un monitor del plató sin o.pantalla: el castillo de noche con su lago y las ventanas encendidas
function e_monitorCastillo(R, t, cl) {
  const [x0, y0, x1, y1] = cl, W = x1 - x0, H = y1 - y0;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H; e_rectC(R, cl, x0, y, x1, y, v < 0.62 ? e_mezcla(hex('#0e1440'), hex('#3a3a7a'), v / 0.62) : e_mezcla(hex('#14183a'), hex('#0a0c20'), (v - 0.62) / 0.38)); }
  for (let k = 0; k < 12; k++) if (Math.sin(t * 2 + k) > -0.3) R.pset(Math.round(x0 + h(k, 1, 760) * W), Math.round(y0 + h(k, 2, 760) * H * 0.4), hex('#e8e8ff'));
  R.disco(Math.round(x0 + W * 0.8), Math.round(y0 + H * 0.18), Math.max(2, Math.round(H * 0.08)), hex('#f0ecd8'));
  const hz = Math.round(y0 + H * 0.62), cx = Math.round(x0 + W * 0.45), u = H / 40;
  for (let x = x0; x <= x1; x++) { const m = Math.round(hz - 2 - Math.abs(Math.sin((x - x0) * 0.09)) * 4 * u); for (let y = m; y < hz; y++) R.pset(x, y, hex('#0a0c1e')); }
  for (const [dx, al, w] of [[-9, 12, 3], [-5, 18, 3], [-1, 24, 4], [4, 16, 3], [8, 20, 3], [12, 10, 4]]) { const a = Math.round(al * u), xa = Math.round(cx + dx * u), xb = xa + Math.round(w * u); for (let y = hz - a; y < hz; y++) for (let x = xa; x <= xb; x++) R.pset(x, y, hex('#0a0c1e')); R.poligono([[xa - 1, hz - a], [(xa + xb) >> 1, hz - a - Math.round(5 * u)], [xb + 1, hz - a]], hex('#0a0c1e'));
    for (let y = hz - a + 3; y < hz - 2; y += Math.max(2, Math.round(3 * u))) if (h(dx, y, 761) < 0.5) R.pset((xa + xb) >> 1, y, Math.sin(t * 3 + dx + y) > -0.6 ? hex('#ffd060') : hex('#a87a30')); }
  for (let y = hz; y <= y1; y += 2) { const x = Math.round(cx + Math.sin(t * 2 + y) * 2); R.linea(x - 3, y, x + 3, y, hex('#a87a30')); }
}

// el marco de grabación del monitor: las esquinas, el punto rojo que late y el código de tiempo que corre
function e_hud(R, t, cl) {
  const [x0, y0, x1, y1] = cl, c = hex('#f0f0f0'), L = 4;
  for (const [x, y, dx, dy] of [[x0 + 2, y0 + 2, 1, 1], [x1 - 2, y0 + 2, -1, 1], [x0 + 2, y1 - 2, 1, -1], [x1 - 2, y1 - 2, -1, -1]]) { R.linea(x, y, x + dx * L, y, c); R.linea(x, y, x, y + dy * L, c); }
  if (Math.floor(t * 1.5) % 2 === 0) R.disco(x0 + 6, y0 + 7, 1, hex('#ff3a3a'));
  if (x1 - x0 > 70) { const f = Math.floor(t * 24) % 24, sgs = Math.floor(t) % 60, m = 12 + Math.floor(t / 60); R.numero(`01:${m}:${String(sgs).padStart(2, '0')}:${String(f).padStart(2, '0')}`, (x0 + x1) >> 1, y1 - 3, { fina: true, centro: true, rampa: [c, c, c, c] }); }
}

// el foco de cine (fresnel) en lo alto o en su pie: la carcasa con aletas, las viseras abiertas y la lente encendida;
// dir: hacia dónde mira (−1 izquierda, 1 derecha, 0 abajo)
function e_fresnel(R, x, y, dir, gel = hex('#fff0b0')) {
  const { rect, pset } = R; rect(x - 5, y - 4, x + 5, y + 4, hex('#0a0a10')); rect(x - 4, y - 3, x + 4, y + 3, hex('#2a2a36')); for (let i = -3; i <= 3; i += 2) rect(x + i, y - 3, x + i, y - 2, hex('#4a4a58'));
  if (dir === 0) { rect(x - 4, y + 4, x + 4, y + 5, gel); R.linea(x - 5, y + 5, x - 8, y + 8, hex('#2a2a36')); R.linea(x + 5, y + 5, x + 8, y + 8, hex('#2a2a36')); pset(x, y + 5, hex('#ffffff')); }
  else { const lx = x + dir * 5; rect(Math.min(lx, lx + dir), y - 3, Math.max(lx, lx + dir), y + 3, gel); pset(lx + dir, y, hex('#ffffff')); R.linea(lx + dir, y - 4, lx + dir * 5, y - 7, hex('#2a2a36')); R.linea(lx + dir, y + 4, lx + dir * 5, y + 7, hex('#2a2a36')); }
}

// el haz de luz de un foco: un cono tramado que aclara lo que hay debajo, del punto (x, y) hacia (xb, yb) con ancho final w
function e_haz(R, x, y, xb, yb, w, a, c = hex('#fff0c0')) {
  const n = Math.max(Math.abs(xb - x), Math.abs(yb - y)), nx = -(yb - y) / n, ny = (xb - x) / n;
  for (let i = 0; i <= n; i++) { const u = i / n, cx = x + (xb - x) * u, cy = y + (yb - y) * u, ww = 2 + w * u;
    for (let j = -ww; j <= ww; j += 0.7) { const px = Math.round(cx + nx * j), py = Math.round(cy + ny * j), g = (1 - Math.abs(j) / ww) * (1 - u * 0.5); if (((px + py) & 1) && g > e_b4(px, py) * 0.9) e_tine(R, px, py, c, a * g); } }
}

// la claqueta sin letras (x, y: la esquina de abajo a la izquierda; ab 0–1: el palo abierto)
function e_claqueta(R, x, y, ab = 0) {
  const { rect, pset } = R; rect(x, y - 12, x + 18, y, hex('#0a0a10')); rect(x + 1, y - 11, x + 17, y - 1, hex('#1e1e26'));
  for (let k = 0; k < 3; k++) rect(x + 2, y - 9 + k * 3, x + 16, y - 9 + k * 3, hex('#d8d8e0')); rect(x + 9, y - 10, x + 9, y - 2, hex('#d8d8e0'));
  rect(x, y - 15, x + 18, y - 13, hex('#0a0a10')); for (let i = 0; i < 18; i += 4) { rect(x + i, y - 15, x + i + 1, y - 13, hex('#f0f0f0')); pset(x + i + 2, y - 14, hex('#f0f0f0')); }
  const a = -ab * 0.5; for (let i = 0; i <= 18; i++) { const px = Math.round(x + Math.cos(a) * i), py = Math.round(y - 17 + Math.sin(a) * i); rect(px, py - 1, px, py + 1, (Math.floor(i / 3) % 2) ? hex('#f0f0f0') : hex('#0a0a10')); }
  pset(x, y - 17, hex('#8a8a9a'));
}

// una figurita de fondo del equipo (6–12 px): x, y = sus pies; ropa, pelo; pose: 'anda', 'clava', 'pinta', 'quieto'
function e_currito(R, x, y, t, ropa, pelo, pose = 'quieto', dir = 1) {
  const { rect, pset } = R, piel = hex('#e8b890'), paso = pose === 'anda' ? Math.floor(t * 6) % 2 : 0;
  rect(x - 1, y - 3, x - 1, y - 1 + (paso ? -1 : 0), hex('#2a2a3a')); rect(x + 1, y - 3, x + 1, y - 1 + (paso ? 0 : -1), hex('#2a2a3a'));
  rect(x - 2, y - 8, x + 2, y - 4, ropa); rect(x - 1, y - 11, x + 1, y - 9, piel); rect(x - 1, y - 11, x + 1, y - 11, pelo); pset(x - dir, y - 10, pelo);
  if (pose === 'clava') { const g = Math.sin(t * 9) > 0; R.linea(x + dir * 2, y - 7, x + dir * 4, g ? y - 9 : y - 6, piel); rect(x + dir * 4, g ? y - 11 : y - 7, x + dir * 5, g ? y - 9 : y - 6, hex('#5a5a6a')); }
  else if (pose === 'pinta') { const g = Math.round(Math.sin(t * 3) * 3); R.linea(x + dir * 2, y - 7, x + dir * 4, y - 9 + g, piel); pset(x + dir * 5, y - 10 + g, hex('#a8a090')); }
  else rect(x + dir * 2, y - 7, x + dir * 2, y - 5, piel);
}

function e_plato(R, t, o, monitor) {
  const { rect, pset, disco, linea } = R;
  if (!monitor) {
    const PANT = [240, 106, 268, 122];
    e_fijo(R, 'hp:plato', () => {
      // el techo negro y las dos vigas de celosía con los focos
      rect(0, 0, 319, 179, hex('#0a0c14'));
      for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 2, 770) < 0.08) pset(x, y, hex('#12141e'));
      for (const [y, c] of [[6, hex('#2a2e3a')], [20, hex('#3a3e4c')]]) { const ap = x => x > 262 && y < 14; rect(0, y, 319, y, c); rect(0, y + 5, 319, y + 5, c); for (let x = 0; x < 320; x += 6) { if (ap(x)) continue; linea(x, y, x + 3, y + 5, c); linea(x + 3, y + 5, x + 6, y, c); } }
      for (const x of [34, 88, 150, 206, 250]) { rect(x, 26, x, 30, hex('#3a3e4c')); e_fresnel(R, x, 34, 0, x === 150 ? hex('#c8d8ff') : hex('#fff0b0')); }
      // las paredes acolchadas del estudio, con su costura en cuadros
      for (let y = 40; y < 134; y++) for (let x = 0; x < 320; x++) { const cx = x % 16, cy = (y - 40) % 12; let c = hex('#22262f'); if (cx === 0 || cy === 0) c = hex('#16181f'); else if (cx === 1 || cy === 1) c = hex('#2c313c'); else if ((cx === 8 && cy === 6)) c = hex('#16181f'); pset(x, y, c); }
      rect(0, 38, 319, 40, hex('#1a1c24')); rect(0, 38, 319, 38, hex('#3a3e4c'));
      // el decorado: la parte desnuda de la izquierda (trasera de contrachapado con riostras)
      const CON = e_hx(['#6a5034', '#8a6a46', '#a8845a', '#c8a474']);
      const contra = (a, b, ya, yb) => { for (let y = ya; y <= yb; y++) for (let x = a; x <= b; x++) { let v = 1.8 + Math.sin(x * 0.4 + h(y >> 3, 1, 771) * 6) * 0.4 + (h(x, y, 772) - 0.5) * 0.6 + ((x - a) % 24 === 0 ? -1.4 : 0); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CON[Math.max(0, Math.min(3, l))]); } };
      contra(30, 52, 50, 132); linea(30, 132, 52, 60, hex('#5a4026')); linea(31, 132, 53, 60, hex('#c8a474')); rect(30, 90, 52, 92, hex('#5a4026'));
      // el muro de piedra pintada del Gran Comedor con su ventanal gótico, los pilares, los estandartes y las antorchas
      const PI = e_hx(['#3a3632', '#5a544c', '#7a7268', '#948a7c', '#aaa090']);
      for (let y = 42; y <= 128; y++) for (let x = 52; x <= 206; x++) { const f = Math.floor((y - 42) / 7), off = f % 2 ? 6 : 0, bx = Math.floor((x - 52 + off) / 12), junta = (y - 42) % 7 === 6 || (x - 52 + off) % 12 === 11; let v = 2.3 + (h(bx, f, 773) - 0.5) * 1.1 + ((y - 42) % 7 === 0 ? 0.8 : 0) + (h(x, y, 774) - 0.5) * 0.5; if (junta) v = 0.6; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, PI[Math.max(0, Math.min(4, l))]); }
      for (let x = 52; x <= 206; x++) { const hh = Math.round(4 + h(x >> 2, 1, 775) * 3); for (let y = 42; y < 42 + hh; y++) if (x > 180) pset(x, y, CON[2]); }
      for (const x of [52, 196]) { rect(x, 42, x + 10, 128, PI[1]); rect(x + 1, 42, x + 3, 128, PI[4]); rect(x + 8, 42, x + 10, 128, PI[0]); rect(x - 1, 50, x + 11, 53, PI[3]); rect(x - 1, 53, x + 11, 54, PI[0]); }
      // el ventanal: el arco ojival, el emplomado en rombos, la luz azul de detrás
      const vx0 = 106, vx1 = 150, vy0 = 48, vy1 = 112, vm = (vx0 + vx1) >> 1;
      const dentro = (x, y) => { if (x < vx0 || x > vx1 || y > vy1) return false; if (y >= vy0 + 18) return true; const r = (vx1 - vx0) * 0.9, d1 = Math.hypot(x - (vx1 - r), y - (vy0 + 18)), d2 = Math.hypot(x - (vx0 + r), y - (vy0 + 18)); return d1 < r && d2 < r && y >= vy0 - 8; };
      for (let y = vy0 - 10; y <= vy1 + 2; y++) for (let x = vx0 - 3; x <= vx1 + 3; x++) { if (dentro(x, y)) { const rom = ((x - vm + y) % 8 + 8) % 8 === 0 || ((x - vm - y) % 8 + 8) % 8 === 0; pset(x, y, rom ? hex('#2a3048') : e_mezcla(hex('#6a8ad8'), hex('#c8d8ff'), Math.max(0, 1 - Math.hypot(x - vm, y - 80) / 40))); } else if (dentro(x - 2, y) || dentro(x + 2, y) || dentro(x, y + 2) || dentro(x, y - 2)) pset(x, y, PI[0]); }
      rect(vm, vy0 - 6, vm, vy1, hex('#3a3632')); rect(vx0, 80, vx1, 81, hex('#3a3632')); rect(vx0 - 4, vy1 + 1, vx1 + 4, vy1 + 3, PI[4]); rect(vx0 - 4, vy1 + 3, vx1 + 4, vy1 + 3, PI[0]);
      for (const [x, c, cs] of [[76, hex('#a8202a'), hex('#6a1018')], [174, hex('#1e6a3a'), hex('#0e4224')]]) { rect(x - 7, 58, x + 7, 60, hex('#c89a3a')); for (let y = 60; y < 96; y++) { const w = y > 88 ? 7 - (y - 88) : 7; rect(x - w, y, x + w, y, c); rect(x - w, y, x - w + 1, y, cs); rect(x + w - 1, y, x + w, y, cs); } rect(x - 5, 64, x + 5, 64, hex('#e8b830')); R.poligono([[x - 3, 70], [x + 3, 70], [x, 78]], e_mezcla(c, hex('#ffffff'), 0.25)); }
      for (const x of [94, 162]) { rect(x - 1, 86, x + 1, 96, hex('#2a2018')); rect(x - 3, 84, x + 3, 86, hex('#4a3a2a')); }
      // la mitad sin hacer: el contrachapado, sus riostras y el andamio con sus tablones
      contra(206, 262, 42, 132); for (const [a, b] of [[206, 230], [232, 262]]) { linea(a, 132, b, 60, hex('#5a4026')); linea(a + 1, 132, b + 1, 60, hex('#c8a474')); } rect(206, 96, 262, 98, hex('#5a4026')); rect(206, 96, 262, 96, hex('#c8a474'));
      for (const x of [210, 254]) { rect(x, 54, x + 1, 132, hex('#8a8e9a')); rect(x, 54, x, 132, hex('#c8ccd8')); } for (const y of [70, 104]) { rect(206, y, 258, y + 2, hex('#a8845a')); rect(206, y, 258, y, hex('#d8b484')); rect(206, y + 3, 258, y + 3, hex('#3a2a1a')); linea(210, y + 3, 254, y + 33, hex('#6a6e7a')); }
      for (let y = 72; y < 132; y += 5) rect(262, y, 268, y, hex('#a8845a')); rect(262, 68, 262, 132, hex('#8a6a46')); rect(268, 68, 268, 132, hex('#8a6a46'));
      // la tarima del decorado: el suelo de losas, la mesa larga y su banco
      for (let y = 126; y <= 136; y++) for (let x = 46; x <= 212; x++) { const f = Math.floor((y - 126) / 4), lo = (x + f * 9) % 18 === 0 || (y - 126) % 4 === 3; pset(x, y, lo ? PI[0] : h(Math.floor((x + f * 9) / 18), f, 776) < 0.4 ? PI[2] : PI[3]); }
      rect(46, 136, 212, 138, hex('#2a2620')); rect(46, 136, 212, 136, PI[4]);
      rect(98, 112, 176, 115, hex('#3e2416')); rect(98, 112, 176, 112, hex('#946038')); for (const x of [102, 170]) rect(x, 116, x + 2, 126, hex('#2a180e')); rect(104, 119, 170, 120, hex('#5a3620')); for (const x of [106, 168]) rect(x, 121, x + 1, 126, hex('#2a180e'));
      for (const x of [112, 130, 150, 164]) { rect(x - 2, 109, x + 2, 111, hex('#c89a3a')); pset(x, 108, hex('#e8b830')); }
      // el suelo de hormigón del estudio: manchas, cinta en cruz, cables y la vía del travelín
      const HO = e_hx(['#1e2026', '#2a2c34', '#363942', '#444852', '#555a66']);
      for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.9 + (h(x >> 3, y >> 2, 777) - 0.5) * 0.7 + (h(x, y, 778) - 0.5) * 0.5 + (y - 138) * 0.012 - (h(x >> 4, y >> 3, 779) < 0.12 ? 0.8 : 0); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, HO[Math.max(0, Math.min(4, l))]); }
      for (const [x, y, c] of [[100, 150, '#e8c040'], [160, 156, '#e8c040'], [214, 150, '#d8402a'], [132, 166, '#3aa8e8']]) { linea(x - 3, y - 2, x + 3, y + 2, hex(c)); linea(x - 3, y + 2, x + 3, y - 2, hex(c)); }
      for (const [y0, cae, x0, x1] of [[146, 4, 40, 230], [174, 3, 0, 120], [168, 2, 200, 319]]) for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + Math.sin((x - x0) / (x1 - x0) * Math.PI * 1.5) * cae); pset(x, y, hex('#0a0a0e')); pset(x, y - 1, hex('#2a2c34')); }
      for (let x = 50; x < 260; x += 6) rect(x, 165, x + 2, 168, hex('#4a3a2a')); for (const y of [164, 168]) { rect(46, y, 264, y, hex('#8a8e9a')); rect(46, y - 1, 264, y - 1, hex('#c8ccd8')); }
      // la mesa de vídeo: el carrito, el monitor y la silla de director (sin letras)
      rect(234, 124, 274, 127, hex('#1a1a22')); rect(234, 124, 274, 124, hex('#5a5a6a')); rect(236, 128, 272, 146, hex('#2a2a34')); rect(237, 129, 271, 135, hex('#1a1a22')); rect(238, 137, 270, 143, hex('#1a1a22'));
      for (let x = 240; x < 268; x += 4) pset(x, 132, Math.floor(x / 4) % 3 ? hex('#3aa84a') : hex('#e8b830'));
      for (const x of [238, 270]) { disco(x, 149, 2, hex('#0a0a10')); pset(x, 149, hex('#5a5a6a')); }
      rect(238, 104, 270, 124, hex('#0a0a10')); rect(236, 102, 272, 104, hex('#1a1a22')); rect(236, 102, 236, 116, hex('#1a1a22')); rect(272, 102, 272, 116, hex('#1a1a22'));
      rect(282, 126, 302, 128, hex('#c8a474')); rect(282, 112, 302, 120, hex('#1a1a20')); rect(282, 112, 302, 112, hex('#3a3a46')); rect(284, 129, 300, 131, hex('#1a1a20'));
      linea(282, 126, 300, 150, hex('#8a6a46')); linea(302, 126, 284, 150, hex('#8a6a46')); for (const x of [282, 302]) rect(x, 112, x + 1, 150, hex('#a8845a'));
      // las cajas de manzana con la claqueta encima (la claqueta se pinta en vida)
      for (const [x, y] of [[176, 152], [180, 144]]) { rect(x, y - 8, x + 18, y, hex('#3a2a1a')); rect(x + 1, y - 7, x + 17, y - 1, hex('#a8845a')); rect(x + 1, y - 7, x + 17, y - 7, hex('#d8b484')); rect(x + 6, y - 5, x + 12, y - 4, hex('#3a2a1a')); }
      // el foco de pie de la derecha: trípode, mástil y la cabeza que mira al decorado
      linea(300, 160, 292, 172, hex('#1a1a22')); linea(300, 160, 308, 172, hex('#1a1a22')); linea(300, 160, 300, 172, hex('#1a1a22')); rect(299, 92, 300, 160, hex('#3a3a46')); rect(299, 92, 299, 160, hex('#6a6a7a'));
      e_fresnel(R, 300, 86, -1);
      // los sacos de arena en los pies, el rollo de cable, el cubo de pintura y la caja de herramientas
      for (const [x, y] of [[296, 171], [36, 160]]) { R.disco(x, y, 3, hex('#4a3a24')); R.rect(x - 5, y - 2, x + 5, y + 1, hex('#6a5434')); R.rect(x - 5, y - 2, x + 5, y - 2, hex('#8a7048')); R.pset(x, y - 1, hex('#3a2a18')); }
      for (let r = 2; r <= 6; r++) for (let a = 0; a < 6.3; a += 0.25) pset(Math.round(150 + Math.cos(a) * r * 1.6), Math.round(174 + Math.sin(a) * r * 0.5), r % 2 ? hex('#0a0a0e') : hex('#2a2c34'));
      R.rect(218, 126, 226, 132, hex('#1a1a22')); R.rect(219, 127, 225, 132, hex('#c8c4b8')); R.rect(219, 127, 225, 128, hex('#7a7268')); R.linea(218, 126, 222, 122, hex('#3a3a46')); R.linea(226, 126, 222, 122, hex('#3a3a46'));
      R.rect(60, 146, 76, 152, hex('#8a1a1a')); R.rect(60, 146, 76, 146, hex('#c83a3a')); R.rect(66, 144, 70, 145, hex('#1a1a22')); R.rect(60, 149, 76, 149, hex('#5a1010'));
      for (const [x, y] of [[226, 160], [84, 172]]) { R.linea(x - 4, y, x + 4, y, hex('#e8e8e8')); R.linea(x, y - 1, x, y + 1, hex('#e8e8e8')); }
    });
    // la vida: los haces de luz con motas, las antorchas, la grúa con la cámara, la gente del equipo, el monitor, la claqueta
    e_haz(R, 150, 40, 128, 128, 26, 0.26, hex('#c8d8ff')); e_haz(R, 88, 40, 96, 120, 18, 0.2); e_haz(R, 206, 40, 186, 124, 16, 0.16); e_haz(R, 292, 86, 200, 120, 22, 0.22);
    for (let k = 0; k < 18; k++) { const u = (t * 0.05 + h(k, 1, 780)) % 1, x = Math.round(130 + (h(k, 2, 780) - 0.5) * 40 + Math.sin(t * 0.6 + k) * 4), y = Math.round(50 + u * 76); if (Math.sin(t * 2 + k) > 0) pset(x, y, hex('#e8eeff')); }
    for (const x of [94, 162]) { const fl = Math.sin(t * 10 + x) > 0; rect(x - 1, 80, x + 1, 83, hex('#ff8a2a')); pset(x, 79, fl ? hex('#fff6c0') : hex('#ffd060')); pset(x + (fl ? 1 : -1), 78, hex('#ffb040')); e_resplandor(R, x, 81, 12, hex('#ffb060'), 0.35); }
    e_resplandor(R, 128, 80, 26, hex('#a8c0ff'), 0.12);
    // el pintor en lo alto del andamio, el carpintero que clava abajo y el tramoyista que cruza con un tablón
    e_currito(R, 226, 70, t, hex('#e8e0d0'), hex('#5a3a2a'), 'pinta', -1); for (let y = 58; y < 66; y++) if (h(y, 1, 781) < 0.6) pset(206, y, hex('#948a7c'));
    e_currito(R, 244, 104, t, hex('#3a6ad8'), hex('#c8a060'), 'clava', 1);
    { const u = (t / 12) % 1, x = Math.round(214 - u * 170); if (x > 40 && x < 214) { e_currito(R, x, 140, t, hex('#c86a2a'), hex('#2a1a14'), 'anda', -1); rect(x - 10, 128, x + 8, 129, hex('#c8a474')); rect(x - 10, 129, x + 8, 129, hex('#8a6a46')); } }
    // la grúa: el carro con ruedas, la columna, el brazo que sube y baja, los contrapesos y la cámara con su piloto
    { const bx = 34, by = 156, px = 36, py = 114, a = -0.42 + Math.sin(t * 0.35) * 0.12, ca = Math.cos(a), sa = Math.sin(a), L = 78, B = 26;
      rect(bx - 16, by - 4, bx + 16, by, hex('#1a1a22')); rect(bx - 16, by - 4, bx + 16, by - 4, hex('#5a5a6a')); for (const dx of [-13, 13]) { disco(bx + dx, by + 2, 3, hex('#0a0a10')); disco(bx + dx, by + 2, 1, hex('#6a6a7a')); }
      rect(px - 2, py, px + 2, by - 4, hex('#2a2a34')); rect(px - 2, py, px - 2, by - 4, hex('#6a6a7a')); disco(px, py, 3, hex('#1a1a22')); pset(px - 1, py - 1, hex('#8a8a9a'));
      const ex = Math.round(px + ca * L), ey = Math.round(py + sa * L), cx = Math.round(px - ca * B), cy = Math.round(py - sa * B);
      for (let i = -1; i <= 1; i++) linea(cx, cy + i, ex, ey + i, i < 0 ? hex('#8a8e9a') : i > 0 ? hex('#2a2a34') : hex('#5a5e6a'));
      for (let k = 0; k < 3; k++) { const wx = Math.round(px - ca * (B - 2 - k * 3)), wy = Math.round(py - sa * (B - 2 - k * 3)); rect(wx - 1, wy - 4, wx + 1, wy + 4, hex('#0a0a10')); pset(wx - 1, wy - 4, hex('#5a5a6a')); }
      rect(ex - 6, ey - 2, ex + 6, ey + 6, hex('#0a0a10')); rect(ex - 5, ey - 1, ex + 5, ey + 5, hex('#2a2a34')); rect(ex - 5, ey - 1, ex + 5, ey - 1, hex('#5a5a6a')); rect(ex + 6, ey, ex + 11, ey + 4, hex('#0a0a10')); rect(ex + 11, ey - 1, ex + 13, ey + 5, hex('#1a1a22')); pset(ex + 12, ey + 2, hex('#4a6a9a'));
      disco(ex - 2, ey - 5, 3, hex('#1a1a22')); disco(ex + 3, ey - 5, 3, hex('#1a1a22')); pset(ex - 2, ey - 5, hex('#5a5a6a')); pset(ex + 3, ey - 5, hex('#5a5a6a'));
      pset(ex - 4, ey + 1, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#6a1a1a')); for (let i = 0; i < 12; i++) pset(Math.round(ex - 4 - i * ca * 2), Math.round(ey + 6 + i * 0.8), hex('#0a0a10')); }
    e_pantalla(R, t, PANT, o, e_monitorCastillo); if (o.hud !== false) e_hud(R, t, PANT);
    e_claqueta(R, 182, 136, o.claqueta ?? 0);
    pset(316, 66, Math.sin(t * 2) > 0 ? hex('#3ae86a') : hex('#1a6a3a'));
    return { suelo: 154, pantalla: PANT, monitor: [236, 102, 272, 146], silla: [282, 112, 302, 150], claqueta: [182, 119, 200, 136], cajas: [176, 136, 198, 152], grua: { base: [34, 156], camara: 'x 100–125, y 70–90, se mueve' }, ventanal: [106, 40, 150, 112], decorado: [46, 42, 262, 138], andamio: [206, 70, 258, 132], mesaDecorado: [98, 112, 176, 126], foco: [292, 86], libre: [70, 230] };
  }
  // la cámara del monitor: el plató desenfocado detrás, el monitor grande con su visera, el carrito y dos sillas
  const PANT = [118, 48, 244, 110];
  e_fijo(R, 'hp:platoMonitor', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y < 40 ? 0.2 : y < 128 ? 1 + Math.sin(x * 0.03) * 0.3 : 1.6) + (h(x >> 3, y >> 3, 790) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#0a0c14', '#1a1e2a', '#2a2e3a', '#3a3e4a'])[Math.max(0, Math.min(3, l))]); }
    // el decorado desenfocado: manchas del muro de piedra, el ventanal azul y los estandartes
    for (let y = 44; y < 128; y++) for (let x = 0; x < 320; x++) { const e = Math.min(1, (y - 44) / 8, (128 - y) / 8), v = (Math.sin(x * 0.08) + Math.sin(y * 0.11 + x * 0.02)) * 0.25 + 0.5; pset(x, y, e_mezcla(R.pget(x, y), e_mezcla(hex('#3e3a36'), hex('#5e5850'), v), e * 0.85)); }
    for (let y = 36; y < 116; y++) for (let x = 248; x < 300; x++) { const d = Math.hypot((x - 273) / 24, (y - 76) / 38); if (d < 1) pset(x, y, e_mezcla(R.pget(x, y), e_mezcla(hex('#a8c0f0'), hex('#4a5a8a'), d), (1 - d) * 0.9)); }
    for (const x of [62, 210]) for (let y = 40; y < 130; y++) for (let i = -7; i <= 7; i++) pset(x + i, y, e_mezcla(R.pget(x + i, y), hex('#6a645a'), (1 - Math.abs(i) / 7) * 0.6));
    for (let y = 106; y < 126; y++) for (let x = 0; x < 320; x++) { const g = Math.min(1, (y - 106) / 5, (126 - y) / 5); pset(x, y, e_mezcla(R.pget(x, y), hex('#3a2418'), g * 0.7)); }
    for (const [x, c] of [[30, hex('#7a1e28')], [92, hex('#1a5a32')]]) for (let y = 52; y < 102; y++) for (let i = -10; i <= 10; i++) { const g = Math.min(1, (1 - Math.abs(i) / 10) * 1.6, (y - 52) / 6, (102 - y) / 6); pset(x + i, y, e_mezcla(R.pget(x + i, y), c, g * 0.85)); }
    // el suelo de hormigón con la cinta
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.6 + (h(x >> 3, y >> 2, 791) - 0.5) * 0.8 + (h(x, y, 792) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#1e2026', '#2a2c34', '#363942', '#444852'])[Math.max(0, Math.min(3, l))]); }
    rect(0, 131, 319, 131, hex('#14161c'));
    for (const [x, y] of [[40, 172], [280, 168]]) { linea(x - 4, y - 2, x + 4, y + 2, hex('#e8c040')); linea(x - 4, y + 2, x + 4, y - 2, hex('#e8c040')); }
    // las dos sillas de director: el marco de madera en tijera, la lona negra del asiento y del respaldo
    for (const x of [20, 66]) { rect(x, 112, x + 30, 122, hex('#1a1a20')); rect(x, 112, x + 30, 113, hex('#3a3a46')); for (let i = 0; i < 30; i += 3) pset(x + i, 117, hex('#24242c'));
      rect(x + 2, 136, x + 28, 139, hex('#1a1a20')); rect(x + 2, 136, x + 28, 136, hex('#3a3a46'));
      for (const xx of [x, x + 29]) { rect(xx, 108, xx + 1, 166, hex('#a8845a')); rect(xx, 108, xx, 166, hex('#d8b484')); } rect(x - 2, 132, x + 3, 134, hex('#8a6a46')); rect(x + 27, 132, x + 32, 134, hex('#8a6a46'));
      linea(x + 1, 140, x + 29, 166, hex('#8a6a46')); linea(x + 29, 140, x + 1, 166, hex('#8a6a46')); linea(x + 2, 140, x + 30, 166, hex('#5a4026')); rect(x - 1, 166, x + 31, 167, hex('#5a4026')); e_sombra(R, x + 15, 168, 18, 2, 0.35); }
    // el carrito: el tablero con el guion, los cascos y el walkie (el café, en vida), el frente con cajones y las ruedas
    rect(104, 128, 262, 132, hex('#0e0e14')); rect(104, 128, 262, 128, hex('#4a4a58')); rect(108, 133, 258, 160, hex('#1e1e26')); for (const y of [136, 148]) { rect(112, y, 254, y + 9, hex('#14141a')); rect(112, y, 254, y, hex('#2e2e38')); rect(178, y + 4, 186, y + 5, hex('#8a8a9a')); }
    for (const x of [112, 254]) { rect(x - 1, 160, x + 1, 166, hex('#2a2a34')); disco(x, 168, 3, hex('#0a0a10')); pset(x, 168, hex('#5a5a6a')); }
    e_sombra(R, 183, 170, 82, 3, 0.35);
    rect(132, 121, 160, 127, hex('#e8e4d8')); rect(132, 121, 160, 121, hex('#ffffff')); for (let y = 123; y < 127; y += 2) linea(136, y, 154 - (y % 4) * 3, y, hex('#8a8aa0')); for (let x = 134; x < 160; x += 5) pset(x, 120, hex('#8a8a9a')); rect(130, 124, 132, 127, hex('#2a5ab8'));
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.08) pset(Math.round(214 + Math.cos(a) * 7), Math.round(126 + Math.sin(a) * 6), hex('#1a1a22')); disco(207, 126, 2, hex('#1a1a22')); disco(221, 126, 2, hex('#1a1a22')); pset(206, 125, hex('#5a5a6a'));
    rect(246, 116, 252, 127, hex('#1a1a22')); rect(247, 117, 251, 121, hex('#3a3a4a')); rect(248, 110, 248, 116, hex('#1a1a22'));
    // el monitor: el pie, el bastidor, la visera negra de lona y el piloto
    rect(176, 115, 186, 128, hex('#1a1a22')); rect(177, 115, 177, 128, hex('#4a4a58')); rect(162, 126, 200, 128, hex('#2a2a34')); rect(162, 126, 200, 126, hex('#5a5a6a'));
    rect(114, 44, 248, 115, hex('#0a0a10')); rect(115, 45, 247, 45, hex('#3a3a48')); rect(114, 113, 248, 115, hex('#1a1a24')); pset(242, 114, hex('#3aa84a')); for (let x = 200; x < 238; x += 3) pset(x, 114, hex('#2a2a38'));
    R.poligono([[108, 34], [254, 34], [248, 44], [114, 44]], hex('#16161c')); linea(108, 34, 254, 34, hex('#3a3a46')); for (let x = 112; x < 252; x += 10) linea(x, 35, x + 2, 43, hex('#22222a'));
    R.poligono([[108, 34], [114, 44], [114, 90], [104, 78]], hex('#1e1e26')); R.poligono([[254, 34], [248, 44], [248, 90], [258, 78]], hex('#121218')); linea(104, 78, 108, 34, hex('#3a3a46'));
    // el foco de pie a la derecha con su bandera negra
    rect(292, 70, 293, 166, hex('#3a3a46')); rect(292, 70, 292, 166, hex('#6a6a7a')); linea(292, 166, 282, 176, hex('#1a1a22')); linea(293, 166, 304, 176, hex('#1a1a22')); e_fresnel(R, 292, 64, -1);
    rect(270, 48, 284, 58, hex('#0a0a10')); linea(284, 53, 292, 53, hex('#3a3a46'));
  });
  // la vida: las manchas de luz desenfocadas que respiran, el monitor, el café, el walkie, el foco
  for (let k = 0; k < 9; k++) { const x = Math.round(14 + h(k, 1, 793) * 92), y = Math.round(20 + h(k, 2, 793) * 36), r = 3 + (k % 3), b = 0.5 + 0.5 * Math.sin(t * (0.7 + k * 0.13) + k); if (b > 0.2) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d <= 1 && (d < 0.7 || ((x + i + y + j) & 1))) e_tine(R, x + i, y + j, k % 3 ? hex('#ffd890') : hex('#a8c8ff'), 0.35 * b); } }
  for (const x of [176, 212]) e_resplandor(R, x, 30, 9, hex('#ffb060'), 0.25 + 0.1 * Math.sin(t * 7 + x));
  // las velas de la mesa del decorado, desenfocadas, y alguien del equipo que cruza por detrás, borroso
  for (let k = 0; k < 6; k++) { const x = 8 + k * 17, b = 0.6 + 0.4 * Math.sin(t * 5 + k * 2); e_resplandor(R, x, 108, 4, hex('#ffc070'), 0.7 * b); }
  { const u = (t / 9) % 1, x = Math.round(-20 + u * 130), y = 100 + Math.round(Math.abs(Math.sin(t * 5)) * 1); if (x < 112) { for (let j = -16; j <= 14; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i / 6, j / (j < -9 ? 5 : 14)); if (j < -9) { const dh = Math.hypot(i / 4, (j + 13) / 4); if (dh < 1) e_tine(R, x + i, y + j, hex('#14161c'), (1 - dh) * 0.9); } else if (d < 1) e_tine(R, x + i, y + j, hex('#1a1c26'), (1 - d) * 0.85); } } }
  e_haz(R, 286, 64, 210, 160, 20, 0.1);
  e_pantalla(R, t, PANT, o, e_monitorCastillo); if (o.hud !== false) e_hud(R, t, PANT);
  { const c = R.pget(181, 79); e_resplandor(R, 181, 128, 60, e_mezcla(c || hex('#3a4a8a'), hex('#a8c0ff'), 0.4), 0.18, 0.18); }
  { const cx = 236; rect(cx - 4, 118, cx + 4, 127, hex('#e8e4d8')); rect(cx - 4, 118, cx + 4, 119, hex('#5a3a2a')); rect(cx - 4, 122, cx + 4, 124, hex('#8a6a4a')); rect(cx + 5, 120, cx + 6, 124, hex('#e8e4d8')); e_vapor(R, cx, 116, t, 0.7, hex('#c8c8d8'), 18); }
  pset(249, 112, Math.floor(t * 1.4) % 3 === 0 ? hex('#ff3a3a') : hex('#4a1a1a'));
  e_claqueta(R, 108, 127, o.claqueta ?? 0);
  return { suelo: 164, pantalla: PANT, monitor: [104, 34, 258, 128], carrito: [104, 128, 262, 170], sillas: [{ x: 35, asiento: 136 }, { x: 81, asiento: 136 }], cafe: [236, 118], claqueta: [108, 110, 126, 127], libre: [10, 104] };
}

// lo que va delante en el plató general: los cables del suelo de delante y la base del trípode de un foco a la izquierda
function e_platoDelante(R, t) {
  for (let x = 0; x <= 150; x++) { const y = Math.round(176 + Math.sin(x * 0.05) * 2); R.pset(x, y, hex('#0a0a0e')); R.pset(x, y - 1, hex('#3a3c46')); }
  R.rect(0, 171, 12, 179, hex('#14141a')); R.rect(0, 171, 12, 171, hex('#3a3a46')); R.linea(4, 171, 16, 179, hex('#1a1a22'));
}

// un plato de la moviola (cx, cy; radios rx, ry) visto desde arriba: el disco de aluminio, la película enrollada con su
// brillo, el núcleo y las marcas que giran a la velocidad v
function e_plato_(R, cx, cy, rx, ry, t, v, lleno = 0.7) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d > 1) continue; const a = Math.atan2(j / ry, i / rx);
    let c; if (d > 0.94) c = hex('#3a3e44'); else if (d > lleno) c = (Math.floor((a + t * v) * 3 / Math.PI) & 1) ? hex('#9aa0a8') : hex('#b8bec8'); else if (d > 0.24) c = (i < -rx * 0.2 && j < 0) ? hex('#6a4a34') : (Math.floor(d * 40) % 3 === 0 ? hex('#2a1a12') : hex('#4a3020')); else if (d > 0.14) c = hex('#c8ccd4'); else c = hex('#2a2a30');
    R.pset(cx + i, cy + j, c); }
  const a = t * v; R.pset(Math.round(cx + Math.cos(a) * rx * 0.19), Math.round(cy + Math.sin(a) * ry * 0.19), hex('#ffffff'));
  for (let i = -rx; i <= rx; i++) R.pset(cx + i, cy + ry + 1, hex('#14161a'));
}

// una tira de película colgada (x desde y0 hasta y1), con sus perforaciones y fotogramas; se mece con el aire
function e_tira(R, x, y0, y1, t, k) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), xx = Math.round(x + Math.sin(t * 1.2 + k * 1.7) * u * 2.5 + Math.sin(y * 0.15 + k) * u);
    R.rect(xx - 1, y, xx + 2, y, hex('#3a2a20')); R.pset(xx - 1, y, (y % 3) ? hex('#2a1a12') : hex('#c8b890')); R.pset(xx + 2, y, (y % 3) ? hex('#2a1a12') : hex('#c8b890')); if (y % 7 < 5) R.rect(xx, y, xx + 1, y, (y + k * 7) % 21 < 7 ? hex('#8a6a4a') : hex('#6a5a5a')); }
}

// un recorte de película caído en el suelo (x, y): un rizo con su brillo
function e_recorte(R, x, y, k) { const L = 5 + (k % 4), a = h(k, 1, 800) * Math.PI; for (let i = 0; i < L; i++) { const px = Math.round(x + Math.cos(a) * i + Math.sin(i * 0.9) * 1.5), py = Math.round(y + Math.sin(a) * i * 0.4); R.pset(px, py, i % 3 ? hex('#4a3020') : hex('#c8b890')); R.pset(px, py + 1, hex('#2a1a12')); } R.pset(x, y, hex('#e8d8b0')); }

// la papelera de rejilla (x centro, y el suelo) rebosante de recortes de película
function e_papelera(R, t, x, y) {
  e_sombra(R, x + 2, y + 1, 14, 2, 0.4);
  for (let j = 0; j < 26; j++) { const w = 10 + Math.round(j * 0.15), yy = y - j; for (let i = -w; i <= w; i++) { const xx = x + i; R.pset(xx, yy, ((i + j) % 4 === 0 || (i - j + 100) % 4 === 0) ? hex('#8a8e9a') : (Math.abs(i) > w - 2 ? hex('#3a3e46') : hex('#1a1a22'))); } }
  R.rect(x - 14, y - 27, x + 14, y - 26, hex('#c8ccd8')); R.rect(x - 14, y - 25, x + 14, y - 25, hex('#4a4e5a')); R.rect(x - 10, y, x + 10, y, hex('#3a3e46'));
  for (let k = 0; k < 6; k++) { const bx = x - 10 + k * 4, sw = Math.sin(t * 1.3 + k) * 1.2; for (let i = 0; i < 9 + (k % 3) * 3; i++) { const px = Math.round(bx + Math.sin(i * 0.5 + k) * 3 + sw * i / 10), py = y - 27 - i + (i > 6 ? Math.round((i - 6) * 1.2) : 0); R.pset(px, py, i % 3 ? hex('#4a3020') : hex('#c8b890')); R.pset(px + 1, py, hex('#2a1a12')); } }
}

function e_montaje(R, t, o, moviola) {
  const { rect, pset, disco, linea } = R, gira = o.gira ?? 1;
  const ESP = e_hx(['#12141c', '#1a1e28', '#232836', '#2e3444']);
  // la espuma acústica en cuñas, en paneles con su marco
  const espuma = (x0, y0, x1, y1, luz) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const cx = (x - x0) % 8, cy = (y - y0) % 8, cel = ((Math.floor((x - x0) / 8) + Math.floor((y - y0) / 8)) & 1); let v = 1.5 + (cel ? (cx < 4 ? 0.6 : -0.4) : (cy < 4 ? 0.6 : -0.4)) + luz(x, y); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, ESP[Math.max(0, Math.min(3, l))]); } };
  if (!moviola) {
    const PANT = [130, 78, 156, 96];
    e_fijo(R, 'hp:montaje', () => {
      rect(0, 0, 319, 179, hex('#0e1016'));
      espuma(0, 10, 319, 122, (x, y) => (x > 262 && y < 50) ? -0.6 : Math.max(0, 1 - Math.hypot(x - 150, y - 90) / 120) * 0.8);
      for (let x = 0; x < 320; x += 64) rect(x, 10, x + 1, 122, hex('#0a0c12')); rect(0, 8, 319, 10, hex('#1a1c24')); rect(0, 0, 319, 7, hex('#0a0b10'));
      // la moqueta con los recortes y los cables
      for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.2 + (h(x, y, 803) - 0.5) * 0.9 + (h(x >> 2, y >> 1, 804) - 0.5) * 0.4 + Math.max(0, 1 - Math.hypot(x - 170, (y - 128) * 2.2) / 110) * 1.8; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#16121a', '#221c28', '#2e2636', '#3c3246'])[Math.max(0, Math.min(3, l))]); }
      rect(0, 122, 319, 123, hex('#0a0a0e')); rect(0, 121, 319, 121, hex('#3a3e4a'));
      // la estantería metálica con las latas de película
      rect(4, 24, 6, 124, hex('#6a6e7a')); rect(62, 24, 64, 124, hex('#4a4e5a')); rect(4, 24, 4, 124, hex('#a8acb8'));
      for (const y of [44, 68, 92, 116]) { rect(4, y, 64, y + 2, hex('#8a8e9a')); rect(4, y, 64, y, hex('#c8ccd8')); rect(4, y + 3, 64, y + 3, hex('#1a1c24'));
        for (let k = 0, x = 8; x < 58; k++) { const n = 2 + Math.floor(h(x, y, 801) * 4), c = h(x, y, 802) < 0.3 ? hex('#a87a4a') : hex('#9aa0aa'); for (let i = 0; i < n; i++) { const yy = y - 3 - i * 3; rect(x, yy, x + 12, yy + 2, hex('#2a2a30')); rect(x, yy, x + 12, yy + 1, c); rect(x, yy, x + 12, yy, e_mezcla(c, hex('#ffffff'), 0.4)); if (i === n - 1) rect(x + 3, yy + 1, x + 9, yy + 1, hex('#f0ece0')); } x += 15; } }
      R.numero('1', 14, 40, { fina: true }); R.numero('2', 28, 64, { fina: true });
      // el tablero con las fotos de las escenas en filas
      rect(80, 22, 197, 64, hex('#2a2a30')); rect(81, 23, 196, 63, hex('#d8d4c8')); rect(81, 23, 196, 23, hex('#f0ece0'));
      for (let f = 0; f < 3; f++) for (let i = 0; i < 8; i++) { const x = 86 + i * 13, y = 27 + f * 12, c = e_hx(['#3a4a8a', '#8a3a3a', '#3a6a4a', '#8a7a3a', '#5a3a6a'])[(i + f * 2) % 5]; rect(x, y, x + 10, y + 8, hex('#1a1a20')); rect(x + 1, y + 1, x + 9, y + 7, c); rect(x + 1, y + 5, x + 9, y + 7, e_mezcla(c, hex('#000000'), 0.4)); pset(x + 3 + (i % 3), y + 3, hex('#f0d8a8')); pset(x + 5, y, hex('#d8282e')); }
      // el monitor de tubo con su torre, en la mesita de la derecha
      rect(270, 102, 318, 106, hex('#3e2a1a')); rect(270, 102, 318, 102, hex('#7a5a3a')); rect(274, 106, 276, 140, hex('#2a1a10')); rect(312, 106, 314, 140, hex('#2a1a10'));
      rect(276, 72, 310, 101, hex('#c8c4b8')); rect(276, 72, 310, 72, hex('#e8e4d8')); rect(279, 75, 307, 95, hex('#1a1a22')); rect(286, 101, 300, 102, hex('#a8a498'));
      rect(300, 110, 314, 140, hex('#c8c4b8')); rect(300, 110, 300, 140, hex('#e8e4d8')); rect(303, 114, 311, 115, hex('#4a4a52'));
      // la moviola: el tablero gris verdoso, el frente con mandos y palancas, las patas; el visor con su capota
      rect(70, 104, 216, 108, hex('#2a3430')); rect(70, 104, 216, 104, hex('#a8b8a8'));
      for (let y = 105; y <= 116; y++) rect(72 + (116 - y) * 0, y, 214, y, e_mezcla(hex('#6a7a6a'), hex('#4a5a4a'), (y - 105) / 11));
      rect(70, 116, 216, 140, hex('#1a201e')); rect(72, 117, 214, 139, hex('#4a5a4e')); rect(72, 117, 214, 117, hex('#7a8a7a'));
      for (const x of [86, 110, 176, 200]) { disco(x, 126, 3, hex('#1a1a1a')); disco(x, 126, 2, hex('#8a8a8a')); pset(x - 1, 125, hex('#d8d8d8')); }
      for (const x of [136, 150]) { rect(x - 1, 122, x + 1, 134, hex('#1a1a1a')); rect(x - 2, 122, x + 2, 124, hex('#c83a3a')); }
      rect(120, 130, 166, 134, hex('#2a2a2a')); for (let x = 122; x < 166; x += 3) pset(x, 132, hex('#8a8a8a'));
      for (const x of [76, 206]) { rect(x, 140, x + 3, 156, hex('#2a3430')); rect(x, 140, x, 156, hex('#6a7a6a')); rect(x - 2, 156, x + 5, 157, hex('#1a1e1c')); }
      rect(124, 72, 162, 104, hex('#1a201e')); rect(125, 73, 161, 103, hex('#5a6a5a')); rect(125, 73, 161, 74, hex('#8a9a8a')); rect(128, 76, 158, 98, hex('#0a0a0e'));
      R.poligono([[122, 72], [164, 72], [160, 66], [126, 66]], hex('#3a4a3e'));
      // la lámpara de brazo encima del visor
      rect(206, 0, 206, 60, hex('#2a2a30')); R.poligono([[200, 60], [212, 60], [216, 68], [196, 68]], hex('#2a5a3a')); rect(200, 60, 212, 60, hex('#4a8a5a')); rect(196, 68, 216, 68, hex('#1a3a24'));
      // la silla de ruedas del montador, vuelta hacia la moviola
      rect(40, 128, 58, 131, hex('#1a1a22')); rect(41, 128, 57, 129, hex('#3a3a4a')); rect(54, 108, 58, 128, hex('#1a1a22')); rect(55, 109, 57, 127, hex('#2e2e3a')); rect(48, 132, 50, 142, hex('#4a4a58')); linea(49, 142, 41, 147, hex('#2a2a34')); linea(49, 142, 57, 147, hex('#2a2a34')); linea(49, 142, 49, 148, hex('#2a2a34')); for (const x of [41, 57, 49]) { disco(x, 148, 1, hex('#0a0a10')); }
      // el colgador de las tiras: la barra con ganchos y el saco de lona con ruedas
      rect(224, 50, 268, 52, hex('#8a8e9a')); rect(224, 50, 268, 50, hex('#c8ccd8')); for (const x of [226, 266]) rect(x, 52, x + 1, 112, hex('#6a6e7a')); for (let x = 228; x < 266; x += 4) pset(x, 53, hex('#c8ccd8'));
      for (let y = 106; y <= 140; y++) { const w = 22 - Math.round((y - 106) * 0.08); rect(246 - w, y, 246 + w, y, (y + (y >> 2)) % 6 === 0 ? hex('#8a7a5a') : hex('#a8946a')); pset(246 - w, y, hex('#5a4a34')); pset(246 + w, y, hex('#5a4a34')); }
      rect(222, 105, 270, 107, hex('#6a6e7a')); for (const x of [228, 264]) { disco(x, 143, 2, hex('#0a0a10')); pset(x, 143, hex('#5a5a6a')); }
      for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 805) * 300) + 6, y = 128 + Math.round(h(k, 2, 805) * 48); if (x > 60 && x < 226 && y < 160) continue; e_recorte(R, x, y, k); }
      for (let x = 216; x < 300; x++) pset(x, Math.round(150 + Math.sin(x * 0.07) * 3), hex('#0a0a0e'));
      // las latas apiladas en el suelo junto a la estantería, una abierta con su rollo
      for (let i = 0; i < 4; i++) { const yy = 150 - i * 4; rect(10, yy, 34, yy + 3, hex('#2a2a30')); rect(10, yy, 34, yy + 2, i === 2 ? hex('#a87a4a') : hex('#9aa0aa')); rect(10, yy, 34, yy, hex('#d8dce4')); rect(16, yy + 1, 28, yy + 1, hex('#f0ece0')); }
      for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i / 14, j / 4); if (d < 1) pset(54 + i, 168 + j, d > 0.9 ? hex('#3a3e44') : d > 0.4 ? hex('#4a3020') : d > 0.2 ? hex('#c8ccd4') : hex('#2a2a30')); }
      e_sombra(R, 143, 158, 78, 3, 0.3);
    });
    // la vida: los platos que giran, la película que corre, el visor, la lámpara, el monitor de tubo, las tiras
    e_resplandor(R, 206, 74, 30, hex('#ffe0a0'), 0.3, 0.9); rect(199, 69, 213, 69, hex('#fff6d0')); e_haz(R, 206, 70, 170, 112, 26, 0.12, hex('#ffe8b0'));
    for (const [x, v] of [[88, 2.2], [112, -1.6], [174, 1.6], [198, -2.2]]) e_plato_(R, x, 110, 11, 4, t, v * gira, x < 140 ? 0.62 : 0.78);
    { const corre = t * 9 * gira; for (let x = 98; x < 190; x++) { if (x > 122 && x < 164) continue; const c = ((Math.floor(x + corre) % 4) + 4) % 4 === 0 ? hex('#c8b890') : hex('#3a2a20'); pset(x, 106, c); } for (const x of [122, 164]) { disco(x, 106, 1, hex('#c8ccd4')); } }
    e_pantalla(R, t, PANT, o, (R, t, cl) => { const [x0, y0, x1, y1] = cl, fl = 0.85 + 0.15 * Math.sin(t * 40); for (let y = y0; y <= y1; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(hex('#3a3020'), hex('#c8b090'), fl * (0.4 + 0.5 * Math.sin((y - y0) / (y1 - y0) * Math.PI)))); R.disco((x0 + x1) >> 1, y1 - 6, 4, hex('#3a2a1a')); R.disco((x0 + x1) >> 1, y1 - 12, 3, hex('#3a2a1a')); const sx = x0 + Math.floor(h(Math.floor(t * 12), 1, 806) * (x1 - x0)); R.linea(sx, y0, sx, y1, hex('#f0e8d0')); R.numero(String(1000 + Math.floor(t * 24) % 9000), x0 + 2, y0 + 7, { fina: true, rampa: [hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0')] }); });
    e_resplandor(R, 143, 90, 20, hex('#f0d8a0'), 0.18);
    { const cl = [279, 75, 307, 95]; e_rectC(R, cl, 279, 75, 307, 95, hex('#0e1a2a')); for (let f = 0; f < 4; f++) for (let x = 281; x < 306; x += 5) if (h(x, f, 807) < 0.75) e_rectC(R, cl, x, 78 + f * 4, x + 3 + (f % 2), 80 + f * 4, e_hx(['#3a6ad8', '#3aa86a', '#e8b830', '#c83a3a'])[f]); const px = 281 + Math.floor((t * 4) % 25); e_rectC(R, cl, px, 76, px, 94, hex('#ff3a3a')); e_resplandor(R, 293, 86, 18, hex('#6a9ae8'), 0.1); }
    for (let k = 0; k < 9; k++) e_tira(R, 230 + k * 4, 54, 100 + Math.round(h(k, 1, 808) * 12), t, k);
    return { suelo: 158, pantalla: PANT, moviola: { mesa: [70, 104, 216, 140], platos: [[88, 110], [112, 110], [174, 110], [198, 110]], visor: [124, 66, 162, 104] }, colgador: [222, 50, 270, 143], papelera: [238, 148, 266, 176], estanteria: [4, 24, 64, 124], monitor: [276, 72, 310, 101], libre: [70, 236] };
  }
  // la cámara de la moviola: la mesa de cerca, los dos platos grandes, la película por la ventanilla, el visor grande
  const PANT = [96, 38, 152, 80];
  e_fijo(R, 'hp:moviola', () => {
    rect(0, 0, 319, 179, hex('#0e1016'));
    espuma(0, 0, 319, 92, (x, y) => (x > 262 && y < 50) ? -0.7 : Math.max(0, 1 - Math.hypot(x - 124, y - 70) / 140) * 0.7 - 0.2);
    // la balda de arriba a la izquierda con latas y el altavoz de la moviola
    rect(0, 40, 72, 42, hex('#8a8e9a')); rect(0, 40, 72, 40, hex('#c8ccd8')); rect(0, 43, 72, 43, hex('#0a0b10'));
    for (let k = 0, x = 4; x < 60; k++, x += 18) for (let i = 0; i < 2 + (k % 2); i++) { const yy = 37 - i * 4; rect(x, yy, x + 14, yy + 3, hex('#2a2a30')); rect(x, yy, x + 14, yy + 2, k === 1 ? hex('#a87a4a') : hex('#9aa0aa')); rect(x, yy, x + 14, yy, hex('#d8dce4')); rect(x + 4, yy + 1, x + 10, yy + 1, hex('#f0ece0')); }
    rect(30, 52, 56, 82, hex('#1a1a20')); rect(31, 53, 55, 81, hex('#2e2e38')); disco(43, 63, 8, hex('#14141a')); disco(43, 63, 6, hex('#3a3a46')); disco(43, 63, 2, hex('#14141a')); disco(43, 76, 3, hex('#14141a')); disco(43, 76, 2, hex('#3a3a46'));
    // el visor grande con su capota y su marco
    rect(86, 26, 162, 92, hex('#1a201e')); rect(87, 27, 161, 91, hex('#5a6a5a')); rect(87, 27, 161, 29, hex('#8a9a8a')); rect(92, 34, 156, 84, hex('#0a0a0e')); R.poligono([[82, 26], [166, 26], [160, 18], [88, 18]], hex('#3a4a3e')); linea(88, 18, 160, 18, hex('#6a7a6a'));
    for (const x of [100, 148]) { disco(x, 88, 2, hex('#1a1a1a')); pset(x, 88, hex('#a8a8a8')); }
    // la mesa vista desde arriba, el canto y el frente con mandos; las patas y la moqueta
    for (let y = 92; y <= 130; y++) { const u = (y - 92) / 38; rect(0, y, 244, y, e_mezcla(hex('#5a6a5a'), hex('#7a8a7a'), u)); }
    for (let y = 92; y <= 130; y++) for (let x = 0; x <= 244; x++) if (h(x, y, 810) < 0.05) pset(x, y, hex('#4a5a4a'));
    rect(0, 92, 244, 92, hex('#2a3430')); rect(244, 92, 246, 146, hex('#1a201e'));
    rect(0, 131, 244, 146, hex('#3e4e42')); rect(0, 131, 244, 132, hex('#a8b8a8')); for (const x of [30, 60, 200, 226]) { disco(x, 139, 3, hex('#1a1a1a')); disco(x, 139, 2, hex('#8a8a8a')); pset(x - 1, 138, hex('#d8d8d8')); }
    for (const x of [8, 232]) { rect(x, 146, x + 4, 170, hex('#2a3430')); rect(x, 146, x + 1, 170, hex('#6a7a6a')); }
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 170 && ((x >= 8 && x <= 12) || (x >= 232 && x <= 236))) continue; if (y < 147 && x < 247) continue; const v = 1.2 + (h(x, y, 811) - 0.5) * 0.9 + (h(x >> 2, y >> 1, 812) - 0.5) * 0.4; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#16121a', '#221c28', '#2e2636', '#3c3246'])[Math.max(0, Math.min(3, l))]); }
    rect(0, 146, 246, 147, hex('#0a0a0e'));
    for (let k = 0; k < 18; k++) e_recorte(R, Math.round(h(k, 1, 813) * 300) + 6, 152 + Math.round(h(k, 2, 813) * 24), k + 40);
    // la empalmadora en el canto de delante, el rodillo y el carrete de cinta
    rect(110, 120, 140, 128, hex('#1a1a1a')); rect(111, 121, 139, 127, hex('#a8acb4')); rect(111, 121, 139, 121, hex('#e8ecf0')); rect(112, 123, 138, 125, hex('#3a2a20')); for (let x = 113; x < 138; x += 3) { pset(x, 123, hex('#c8b890')); pset(x, 125, hex('#c8b890')); }
    disco(160, 124, 4, hex('#1a1a1a')); disco(160, 124, 3, hex('#c8c0a0')); disco(160, 124, 1, hex('#5a5a5a'));
    // el lápiz graso rojo, los guantes blancos de algodón y la tapa de una lata con trozos de película
    linea(18, 126, 34, 120, hex('#1a1010')); linea(18, 125, 33, 119, hex('#c8282e')); pset(17, 126, hex('#f0d8c8'));
    for (const [x, d] of [[62, 1], [78, -1]]) { R.rect(x - 4, 119, x + 4, 125, hex('#c8c4b8')); R.rect(x - 3, 118, x + 3, 124, hex('#f4f2ea')); for (let i = 0; i < 4; i++) R.rect(x - 3 + i * 2, 115 + (i === 1 || i === 2 ? 0 : 1), x - 3 + i * 2, 118, hex('#f4f2ea')); R.rect(x + d * 4, 118, x + d * 5, 120, hex('#f4f2ea')); }
    for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i / 14, j / 4); if (d < 1) pset(186 + i, 126 + j, d > 0.88 ? hex('#5a5e66') : hex('#9aa0aa')); }
    for (let k = 0; k < 3; k++) e_recorte(R, 180 + k * 4, 125 + (k % 2), k + 60);
    // el saco de las tiras a la derecha, con su barra
    rect(256, 46, 312, 48, hex('#8a8e9a')); rect(256, 46, 312, 46, hex('#c8ccd8')); for (const x of [258, 310]) rect(x, 48, x + 1, 120, hex('#6a6e7a'));
    for (let y = 110; y <= 158; y++) { const w = 28 - Math.round((y - 110) * 0.08); rect(284 - w, y, 284 + w, y, (y + (y >> 2)) % 6 === 0 ? hex('#8a7a5a') : hex('#a8946a')); pset(284 - w, y, hex('#5a4a34')); pset(284 + w, y, hex('#5a4a34')); }
    rect(254, 108, 314, 110, hex('#6a6e7a')); for (const x of [260, 308]) { disco(x, 162, 3, hex('#0a0a10')); pset(x, 162, hex('#5a5a6a')); }
  });
  // la vida: los dos platos grandes que giran, la película que corre por la ventanilla y los rodillos, el visor y las tiras
  e_plato_(R, 48, 108, 40, 12, t, 1.4 * gira, 0.6); e_plato_(R, 200, 108, 40, 12, t, -1.4 * gira, 0.82);
  { const corre = t * 14 * gira; for (let x = 82; x < 168; x++) { const pf = ((Math.floor(x + corre) % 5) + 5) % 5; rect(x, 103, x, 108, hex('#3a2a20')); if (pf === 0) { pset(x, 103, hex('#c8b890')); pset(x, 108, hex('#c8b890')); } if (pf !== 4 && x > 96 && x < 152) rect(x, 104, x, 107, (Math.floor((x + corre) / 15) % 2) ? hex('#8a6a4a') : hex('#6a5a5a')); }
    for (const x of [82, 96, 152, 168]) { disco(x, 105, 2, hex('#1a1a1a')); disco(x, 105, 1, hex('#c8ccd4')); pset(x + Math.round(Math.cos(corre * 0.3)), 105 + Math.round(Math.sin(corre * 0.3)), hex('#ffffff')); }
    rect(110, 100, 138, 111, hex('#1a1a1a')); rect(111, 101, 137, 102, hex('#3a3a3a')); rect(112, 103, 136, 108, hex('#fff0c8')); for (let x = 112; x <= 136; x++) if (((Math.floor(x + corre) % 5) + 5) % 5 === 0) { pset(x, 103, hex('#3a2a20')); pset(x, 108, hex('#3a2a20')); } e_resplandor(R, 124, 106, 14, hex('#fff0c8'), 0.25, 0.6); }
  e_pantalla(R, t, PANT, o, (R, t, cl) => { const [x0, y0, x1, y1] = cl, fl = 0.85 + 0.15 * Math.sin(t * 40); for (let y = y0; y <= y1; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(hex('#3a3020'), hex('#c8b090'), fl * (0.4 + 0.5 * Math.sin((y - y0) / (y1 - y0) * Math.PI)))); const cx = (x0 + x1) >> 1; R.disco(cx, y1 - 10, 8, hex('#3a2a1a')); R.disco(cx, y1 - 22, 6, hex('#3a2a1a')); const sx = x0 + Math.floor(h(Math.floor(t * 12), 1, 814) * (x1 - x0)); R.linea(sx, y0, sx, y1, hex('#f0e8d0')); R.numero(String(1000 + Math.floor(t * 24) % 9000), x0 + 3, y0 + 9, { fina: true, rampa: [hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0')] }); });
  e_resplandor(R, 124, 70, 46, hex('#f0d8a0'), 0.14, 0.7);
  for (let k = 0; k < 12; k++) e_tira(R, 262 + k * 4, 50, 104 + Math.round(h(k, 1, 815) * 14), t, k + 3);
  return { suelo: 174, pantalla: PANT, platos: [[48, 108], [200, 108]], ventanilla: [110, 100, 138, 111], empalmadora: [110, 120, 140, 128], cantoMesa: 131, mesa: [0, 92, 246, 146], saco: [254, 46, 314, 162], libre: [248, 318] };
}

// lo que va delante en la moviola: el canto de la mesa con la tira que cuelga hasta el suelo, enroscándose
function e_moviolaDelante(R, t) {
  R.rect(0, 131, 244, 132, hex('#a8b8a8'));
  for (let y = 131; y < 176; y++) { const u = (y - 131) / 45, x = Math.round(72 + Math.sin(t * 1.1) * u * 2 + Math.sin(y * 0.2) * u * 3); R.rect(x, y, x + 3, y, hex('#3a2a20')); if (y % 3 === 0) { R.pset(x, y, hex('#c8b890')); R.pset(x + 3, y, hex('#c8b890')); } }
  for (let i = 0; i < 16; i++) { const a = i * 0.5, x = Math.round(76 + Math.cos(a) * (6 - i * 0.2)), y = Math.round(174 + Math.sin(a) * 2); R.pset(x, y, i % 3 ? hex('#4a3020') : hex('#c8b890')); }
}

// los encuadres de exterior(), por nombre
const c_EXT = {
  castillo: (R, t, o, cam) => cam === 'cerca' ? c_puertas(R, t, o) : c_castillo(R, t, o),
  torre: (R, t, o, cam) => c_torre(R, t, o, cam === 'almenas'),
  bosque: (R, t, o, cam) => cam === 'claro' ? c_claro(R, t, o) : c_bosque(R, t, o),
  quidditch: (R, t, o, cam) => cam === 'gradas' ? c_gradas(R, t, o) : c_quidditch(R, t, o),
  cabana: (R, t, o, cam) => cam === 'puerta' ? c_cabanaPuerta(R, t, o) : c_cabana(R, t, o),
  pociones: (R, t, o, cam) => c_pociones(R, t, o, cam === 'mesa'),
};

// mezcla de dos colores (a: cuánto del segundo)
const c_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// el umbral de la trama de Bayer 4×4 en (x, y), entre 0 y 1
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_umb = (x, y) => (c_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// ruido suave (valor interpolado en una rejilla de paso p), entre 0 y 1
function c_ruido(x, y, p, k = 0) {
  const gx = Math.floor(x / p), gy = Math.floor(y / p), fx = x / p - gx, fy = y / p - gy, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(gx, gy, k), b = h(gx + 1, gy, k), c = h(gx, gy + 1, k), d = h(gx + 1, gy + 1, k);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

// las capas fijas de los exteriores: se dibujan una vez en un búfer de R.nuevo() (lo no pintado queda a 0, transparente)
const c_CACHE = new WeakMap();

function c_capa(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const meta = dibuja() || {}; R.usar(prev); m[clave] = { b, meta }; }
  return m[clave];
}

// pega una capa encima de lo que hay (solo sus píxeles pintados), en las filas y0–y1
function c_pegar(R, capa, y0 = 0, y1 = 179) { const B = R.buf, b = capa.b; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const v = b[i]; if (v) B[i] = v; } }

// degradado tramado (Bayer) entre los colores de cols, de la fila y0 a la y1, en las columnas x0–x1
function c_degradado(R, x0, y0, x1, y1, cols) {
  const B = R.buf, n = cols.length - 1;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i, f0 = y * 320;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[f0 + x] = f > c_umb(x, y) ? cols[i + 1] : cols[i]; }
}

// oscurece (a < 0, hacia cO) o aclara (a > 0, hacia cL) lo que ya hay en un rectángulo, con trama
function c_tinte(R, x0, y0, x1, y1, col, a, trama = true) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (!trama || ((x + y) & 1) === 0) R.pset(x, y, c_mez(R.pget(x, y), col, a));
}

// un brillo redondo tramado que tiñe lo que hay (luz de farol, de fuego): r radio, a fuerza en el centro
function c_resplandor(R, cx, cy, r, col, a = 0.5) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, y - cy) / r; if (d >= 1) continue; const g = (1 - d) * (1 - d) * a;
    if (g > c_umb(x, y) * 0.5) { const p = R.pget(x, y); if (p) R.pset(x, y, c_mez(p, col, Math.min(0.85, g * 1.4))); } }
}

// el cielo de noche tramado (cols de arriba abajo) hasta la fila y1, con estrellas fijas de tres brillos y polvo de estrellas
function c_cieloNoche(R, y1, k = 0, cols = c_NOCHE) {
  c_degradado(R, 0, 0, 319, y1, cols);
  for (let i = 0; i < 260; i++) { const x = Math.floor(h(i, 1, 600 + k) * 320), y = Math.floor(h(i, 2, 600 + k) ** 1.3 * (y1 - 6)), q = h(i, 3, 600 + k);
    if (x >= 276 && y <= 46) continue;   // la esquina de Atom, tranquila
    R.pset(x, y, q < 0.08 ? hex('#ffffff') : q < 0.35 ? hex('#aab8e8') : hex('#5a6aa8')); }
  for (let i = 0; i < 500; i++) { const x = Math.floor(h(i, 5, 610 + k) * 320), y = Math.floor(h(i, 6, 610 + k) * y1), v = c_ruido(x, y, 40, 611 + k); if (v > 0.6 && !(x >= 276 && y <= 46)) R.pset(x, y, c_mez(R.pget(x, y), hex('#8a8ac8'), 0.35)); }
}

const c_NOCHE = [hex('#060920'), hex('#0b1030'), hex('#111a44'), hex('#1a2656'), hex('#263468')];

// las estrellas que titilan (encima del cielo, antes de lo demás): unas pocas en cruz que se encienden y se apagan
function c_titilan(R, t, y1, k = 0, n = 14) {
  for (let i = 0; i < n; i++) { const x = Math.floor(h(i, 7, 620 + k) * 316) + 2, y = Math.floor(h(i, 8, 620 + k) * (y1 - 12)) + 4; if (x >= 272 && y <= 50) continue;
    const s = Math.sin(t * (1.5 + h(i, 9, 620 + k) * 2.5) + i * 1.7); if (s < 0.2) continue; const c = s > 0.75 ? hex('#ffffff') : hex('#c8d4ff');
    R.pset(x, y, c); if (s > 0.75) { R.pset(x - 1, y, hex('#6a7ab8')); R.pset(x + 1, y, hex('#6a7ab8')); R.pset(x, y - 1, hex('#6a7ab8')); R.pset(x, y + 1, hex('#6a7ab8')); } }
}

// la luna llena con su halo tramado, cráteres y el borde en sombra
function c_luna(R, x, y, r, halo = 2.4) {
  R.halo(x, y, r * halo, [hex('#18224e'), hex('#22305e'), hex('#2e3e70'), hex('#3e5084')], 1.1);
  R.disco(x, y, r, (px, py, d) => { const sh = (px - x) * 0.6 + (py - y) * 0.4; return d > 0.86 && sh > 0 ? hex('#c8c2a4') : sh > r * 0.45 ? hex('#e4dec0') : hex('#f6f2dc'); });
  for (const [dx, dy, rr] of [[-0.35, -0.2, 0.22], [0.25, 0.3, 0.16], [0.1, -0.45, 0.12], [-0.15, 0.4, 0.1], [0.45, -0.1, 0.09]]) R.disco(x + dx * r, y + dy * r, Math.max(1, rr * r), hex('#d4ceb0'));
  R.pset(Math.round(x - r * 0.5), Math.round(y - r * 0.55), hex('#ffffff'));
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba a la izquierda) de ancho w
function c_nube3(R, cx, cy, w, [cS, c, cL]) {
  const r = Math.max(2, w * 0.28), B = [[-w * 0.38, 1.2, r * 0.7], [-w * 0.14, -0.6, r * 0.95], [w * 0.14, -1, r], [w * 0.38, 1, r * 0.72]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.2, rr, cS);
  R.poligono([[cx - w * 0.5, cy + r * 0.4], [cx + w * 0.5, cy + r * 0.4], [cx + w * 0.46, cy + r * 0.95], [cx - w * 0.46, cy + r * 0.95]], cS);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.88, c);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - rr * 0.25, cy + dy - rr * 0.3, rr * 0.5, cL);
}

// las nubes de una lista [x0, y, ancho, velocidad] que cruzan y vuelven a entrar por el otro lado
function c_nubes(R, t, lista, tonos) {
  for (const [x0, y, w, v] of lista) { const span = 320 + 2 * w, cx = ((x0 + t * v) % span + span) % span - w; c_nube3(R, cx, y, w, tonos); }
}

const c_NUBE_NOCHE = [hex('#151c42'), hex('#26305c'), hex('#46548a')];

const c_NUBE_DIA = [hex('#b4c8e0'), hex('#e4eef8'), hex('#ffffff')];

// una lechuza en vuelo (x, y: el cuerpo; dir: hacia dónde va), aleteando; blanca o parda; s escala (1 o 2)
function c_lechuza(R, x, y, t, dir = 1, blanca = false, s = 1) {
  x = Math.round(x); y = Math.round(y);
  const c = blanca ? hex('#f2f2f6') : hex('#a07e5a'), cS = blanca ? hex('#b4b8c8') : hex('#5e4430'), cL = blanca ? hex('#ffffff') : hex('#c8a47a'), a = Math.sin(t * 11 + x * 0.1), ala = Math.round((a > 0.35 ? -3 : a < -0.35 ? 2 : 0) * s);
  for (const d of [-1, 1]) { R.linea(x + d * s, y, x + d * 5 * s, y + ala, cS); R.linea(x + d * s, y - 1, x + d * 4 * s, y - 1 + ala, c); if (s > 1) R.linea(x + d * 2, y - 2, x + d * 7, y - 1 + ala, cL); }
  R.rect(x - s, y - 1 - s, x + s, y + 1 + s, c); R.rect(x - s, y + 1 + s, x + s, y + 1 + s, cS);
  R.rect(x + dir * s - s, y - 2 - 2 * s, x + dir * s + s, y - 1 - s, cL); R.pset(x + dir * (2 * s), y - 1 - 2 * s, hex('#1a1a22')); R.pset(x + dir * (2 * s + 1), y - 1 - s, hex('#e8a830'));
  R.pset(x - dir * (2 * s), y + 1 + s, cS);
}

// un murciélago diminuto que revolotea
function c_murcielago(R, x, y, t) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 18 + x) > 0 ? -1 : 1, c = hex('#0a0a16'); R.pset(x, y, c); R.pset(x, y - 1, c); R.linea(x - 1, y, x - 3, y + a, c); R.linea(x + 1, y, x + 3, y + a, c); }

// una antorcha de pared: el soporte de hierro y la llama que baila (x, y: la boca del soporte); devuelve la altura de la llama
function c_antorcha(R, x, y, t, k = 0) {
  const { rect, pset, poligono } = R;
  rect(x - 2, y, x + 2, y + 2, hex('#2a2224')); rect(x - 1, y + 3, x + 1, y + 8, hex('#3a3034')); pset(x, y + 9, hex('#2a2224')); rect(x - 3, y + 6, x + 3, y + 7, hex('#2a2224')); pset(x - 2, y, hex('#5a4a44'));
  const f = Math.sin(t * 13 + k) * 1.2 + Math.sin(t * 7.3 + k * 2) * 0.8, hgt = 7 + Math.round(f);
  poligono([[x - 3, y], [x + 3, y], [x + 1 + f * 0.5, y - hgt], [x - 2, y - hgt * 0.5]], hex('#e8601c'));
  poligono([[x - 2, y], [x + 2, y], [x + f * 0.4, y - hgt + 2]], hex('#ffb030'));
  poligono([[x - 1, y], [x + 1, y], [x + f * 0.3, y - hgt + 4]], hex('#fff0a0'));
  if (Math.sin(t * 5 + k * 3) > 0.7) pset(x + Math.round(Math.sin(t * 9 + k) * 3), y - hgt - 2 - Math.round((t * 8 + k) % 4), hex('#ffd060'));   // una chispa
  return hgt;
}

// un pino oscuro de copa en pisos (x, suelo: pie; alto; cols [sombra, cuerpo, filo]); nieve: con nieve en los pisos
function c_pino(R, x, suelo, alto, cols, nieve = false, mece = 0) {
  const [cS, c, cL] = cols, pisos = Math.max(3, Math.round(alto / 7));
  R.rect(x - 1, suelo - 3, x + 1, suelo, hex('#2a1e18'));
  for (let p = 0; p < pisos; p++) { const yb = suelo - 2 - p * (alto - 4) / pisos, w = (pisos - p) * alto * 0.11 + 1, yt = yb - alto / pisos * 1.5, dx = mece * (p / pisos);
    R.poligono([[x - w, yb], [x + w, yb], [x + dx, yt]], cS); R.poligono([[x - w * 0.8, yb - 1], [x + w * 0.3, yb - 1], [x + dx, yt]], c);
    R.linea(x - w * 0.8, yb - 1, x + dx, yt, cL); if (nieve) { R.linea(x - w, yb, x - w * 0.3, yb - 1, hex('#e8eef8')); R.linea(x + dx - 1, yt + 1, x + dx + 1, yt + 1, hex('#f4f8ff')); } }
}

// los copos de nieve que caen a dos velocidades (n copos), con un vaivén
function c_nieva(R, t, n = 70, k = 0, y1 = 179) {
  for (let i = 0; i < n; i++) { const v = 8 + h(i, 1, 640 + k) * 14, gr = h(i, 3, 640 + k) > 0.7, y = (h(i, 2, 640 + k) * 200 + t * v) % 200 - 10, x = (h(i, 4, 640 + k) * 330 + Math.sin(t * 1.3 + i) * 3 - t * 4) % 330;
    const X = Math.round((x + 330) % 330) - 5, Y = Math.round(y); if (Y > y1 || (X >= 274 && Y <= 46)) continue;
    R.pset(X, Y, gr ? hex('#ffffff') : hex('#c8d4ea')); if (gr) { R.pset(X + 1, Y, hex('#dce6f6')); R.pset(X, Y + 1, hex('#dce6f6')); } }
}

// sillares: piedra de bloques de w × a con juntas, piedras más claras y más oscuras, grano y musgo (cols [junta, sombra, piedra, luz])
function c_sillares(R, x0, y0, x1, y1, w, a, cols, k = 0, musgo = 0) {
  const [cJ, cS, c, cL] = cols, B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor(y / a), dy = y - fila * a, off = (fila & 1) * (w >> 1);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const col = Math.floor((x + off) / w), dx = x + off - col * w, q = h(col, fila, 650 + k);
      let p = dy === a - 1 || dx === w - 1 ? cJ : dy === 0 || dx === 0 ? cL : q < 0.18 ? cS : q > 0.85 ? cL : c;
      if (p !== cJ) { const g = h(x, y, 651 + k); if (g < 0.07) p = cS; else if (g > 0.95) p = cL; if (dy === a - 2 && q < 0.5) p = cS; }
      if (musgo && p === cJ && c_ruido(x, y, 9, 652 + k) > 1 - musgo) p = hex('#3a5a2e');
      B[y * 320 + x] = p; } }
}

// el castillo lejano (de noche, o de día con dia), con origen (ox, oy) en el pie del peñasco y escala s; luz de luna desde la izquierda. Pinta
// en el búfer en uso y devuelve las ventanas encendidas [[x, y, alto], …] para que parpadeen
function c_castilloLejos(R, ox, oy, s = 1, dia = false) {
  const { rect, pset, poligono, linea } = R, X = (v) => Math.round(ox + v * s), Y = (v) => Math.round(oy + v * s), ven = [];
  const P = { j: hex('#1c1e36'), s: hex('#2a2c4a'), c: hex('#3a3e62'), l: hex('#5c628e'), t0: hex('#232a52'), t1: hex('#3c4878'), t2: hex('#56649a'), luz: hex('#ffcc66'), luzL: hex('#fff0a8'), osc: hex('#14162a') };
  if (dia) Object.assign(P, { j: hex('#6a7088'), s: hex('#7a8098'), c: hex('#98a0b4'), l: hex('#c8ccd8'), t0: hex('#4a5878'), t1: hex('#5a6a8e'), t2: hex('#7a8aac'), luz: hex('#3a4058'), luzL: hex('#4a5068'), osc: hex('#3a4058') });
  const muro = (x0, x1, top, k, almenas = false, ventanas = true) => {
    const a = X(x0), b = X(x1), tp = Y(top), pie = Y(6);
    for (let y = tp; y <= pie; y++) for (let x = a; x <= b; x++) { const q = h(x, y, 660 + k); let c = x === a ? P.l : x > b - Math.max(1, (b - a) * 0.35) ? P.s : P.c; if ((y - tp) % 3 === 2 && q < 0.5) c = P.j; else if (q < 0.06) c = P.s; pset(x, y, c); }
    if (almenas) for (let x = a; x <= b; x += 3) rect(x, tp - 2, x + 1, tp - 1, x === a ? P.l : P.c);
    if (ventanas) for (let y = tp + 3; y < Y(-3); y += Math.max(4, Math.round(6 * s))) for (let x = a + 2; x < b - 1; x += Math.max(3, Math.round(4 * s))) {
      const q = h(x, y, 661 + k), al = s > 0.7 ? 2 : 1; if (q < 0.5) { rect(x, y, x, y + al - 1, P.luz); if (q < 0.15) pset(x, y, P.luzL); ven.push([x, y, al]); } else if (q < 0.75) rect(x, y, x, y + al - 1, P.osc); }
  };
  const cono = (x0, x1, top, alto) => { const a = X(x0) - 1, b = X(x1) + 1, tp = Y(top), ax = (a + b) / 2, ay = tp - Math.round(alto * s);
    poligono([[a, tp + 1], [b + 1, tp + 1], [ax + 0.5, ay]], (x, y) => ((y - ay) % 3 === 0 ? P.t0 : x < ax - 0.5 ? (x === a ? P.t2 : P.t1) : P.t0));
    linea(a, tp + 1, ax, ay, P.t2); pset(Math.round(ax), ay - 1, P.l); pset(Math.round(ax), ay - 2, P.c); return [Math.round(ax), ay - 2]; };
  // el puente cubierto de la izquierda, con sus arcos
  { const a = X(-100), b = X(-66), y0 = Y(-12);
    poligono([[a, y0], [b, y0], [b - 2, y0 - Math.round(5 * s)], [a + 2, y0 - Math.round(5 * s)]], P.t0); linea(a + 2, y0 - Math.round(5 * s), b - 2, y0 - Math.round(5 * s), P.t2);
    rect(a, y0, b, y0 + Math.round(4 * s), P.c); for (let x = a + 2; x < b; x += 4) pset(x, y0 + 1, (x * 7) % 3 ? P.luz : P.osc);
    for (let x = a; x <= b; x += Math.max(3, Math.round(8 * s))) { rect(x, y0 + Math.round(4 * s), x + Math.max(1, Math.round(2 * s)), Y(6), P.s); pset(x, y0 + Math.round(4 * s), P.l); } }
  muro(-68, -20, -22, 1, true); muro(18, 72, -20, 2, true);
  muro(-66, -58, -38, 3); cono(-66, -58, -38, 12); muro(-50, -44, -30, 4); cono(-50, -44, -30, 9);
  muro(-27, -21, -34, 5, false, false); cono(-27, -21, -34, 7);
  // el Gran Comedor: muro, tejado a dos aguas y los ventanales altos encendidos
  { muro(-40, 0, -28, 6, false, false); const a = X(-41), b = X(1), tp = Y(-28), ap = Y(-38);
    poligono([[a, tp + 1], [b + 1, tp + 1], [b - 3, ap], [a + 3, ap]], (x, y) => ((y - ap) % 2 === 0 ? P.t0 : y < (tp + ap) / 2 ? P.t2 : P.t1)); linea(a + 3, ap, b - 3, ap, P.l);
    for (let x = a + 3; x < b - 2; x += Math.max(3, Math.round(6 * s))) { const al = Math.max(3, Math.round(12 * s)); rect(x, tp + 3, x + (s > 0.7 ? 1 : 0), tp + 2 + al, P.luz); pset(x, tp + 3, P.luzL); ven.push([x, tp + 3, al]); } }
  muro(2, 18, -46, 7, true); muro(10, 14, -54, 8, false, false); cono(10, 14, -54, 7);
  muro(40, 50, -44, 9); cono(40, 50, -44, 10); muro(62, 70, -34, 10); cono(62, 70, -34, 9);
  muro(26, 34, -66, 11); const punta = cono(26, 34, -66, 15);
  return { ven, punta };
}

// las ventanas que se encienden y se apagan, sobre una capa ya pegada (ven de c_castilloLejos)
function c_ventanasVivas(R, t, ven, k = 0) {
  for (let i = 0; i < ven.length; i++) { const q = h(i, 1, 670 + k); if (q > 0.22) continue; const [x, y, al] = ven[i], on = Math.sin(t * (0.4 + q * 2) + i * 3.1) > -0.2;
    R.rect(x, y, x, y + al - 1, on ? (Math.sin(t * 9 + i) > 0.6 ? hex('#fff0a8') : hex('#ffcc66')) : hex('#14162a')); }
}

// la línea de cumbres de una cordillera: picos [x, alto] sobre la base, con laderas de pendiente pend; devuelve la y
function c_cordillera(x, base, picos, pend) { let m = 0; for (const [px, a] of picos) m = Math.max(m, a - Math.abs(x - px) * pend * (1 + 0.3 * Math.sin(px))); return base - m; }

// el agua del lago: refleja la capa (espejo en la fila eje) con ondas, brillos que corren y el reflejo de la luna en trozos
function c_lago(R, t, capa, y0, y1, eje, cols, luna = null) {
  const B = R.buf, b = capa.b, n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0), wv = Math.sin(y * 0.8 + t * 2.2) * (0.6 + u * 2.2), ys = Math.round(2 * eje - y), ci = u * n, i0 = Math.min(n - 1, Math.floor(ci)), fr = ci - i0;
    const lw = luna ? 2 + u * 9 : 0;
    for (let x = 0; x < 320; x++) { const base = fr > c_umb(x, y) ? cols[i0 + 1] : cols[i0];
      const xs = Math.max(0, Math.min(319, Math.round(x + wv))), v = ys >= 0 && ys < 180 ? b[ys * 320 + xs] : 0;
      let c = v ? c_mez(v, base, 0.3 + u * 0.3) : base;
      const rip = Math.sin(x * 0.11 + y * 1.9 - t * 2.4 + Math.sin(y * 0.37 + x * 0.013) * 3);
      if (rip > 0.94) c = c_mez(c, hex('#8a9ad0'), 0.45); else if (rip < -0.96) c = c_mez(c, hex('#04061a'), 0.4);
      if (luna && Math.abs(x - luna - wv * 2) < lw && Math.sin(y * 2.3 + t * 3 + x * 0.9) > -0.1 + u * 0.5) c = Math.abs(x - luna - wv * 2) < lw * 0.4 ? hex('#f0ecd0') : hex('#9aa0c0');
      B[y * 320 + x] = c; } }
}

// una barca de remos con su farol (x: centro, y: línea del agua), que cabecea
function c_barca(R, x, y, t, k = 0, farol = true, s = 1) {
  const b = Math.round(Math.sin(t * 1.8 + k) * 1), w = 9 * s, cy = y + b;
  R.poligono([[x - w - 2, cy - 3 * s], [x + w + 2, cy - 3 * s], [x + w - 1, cy], [x - w + 1, cy]], hex('#4a3020')); R.linea(x - w - 2, cy - 3 * s, x + w + 2, cy - 3 * s, hex('#8a6038'));
  R.linea(x - w + 1, cy - 1, x + w - 1, cy - 1, hex('#2a1a12')); R.linea(x - w + 2, cy + 1, x + w - 2, cy + 1, hex('#3a4a7a'));
  if (farol) { const fx = x + w - 1, fy = cy - 3 * s - 5; R.linea(fx, cy - 3 * s, fx, fy, hex('#2a2020')); c_resplandor(R, fx, fy, 6, hex('#ffd070'), 0.5); R.rect(fx - 1, fy - 1, fx + 1, fy + 1, Math.sin(t * 10 + k) > -0.5 ? hex('#ffe08a') : hex('#ffb040')); R.pset(fx, fy - 2, hex('#2a2020'));
    R.linea(fx - 1, cy + 2, fx + 1, cy + 2, hex('#c89a40')); }
}

// el castillo de noche desde la orilla del lago
function c_castillo(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, LX = 64, LY = 36, LR = 11;
  const cielo = c_capa(R, 'ext_cas_cielo', () => { c_cieloNoche(R, 111, 0); });
  const lejos = c_capa(R, 'ext_cas_lejos', () => {
    // la cordillera del fondo, con nieve en las cumbres y la ladera que mira a la luna más clara
    const yF = (x) => c_cordillera(x, 92, [[20, 22], [70, 16], [118, 24], [170, 12], [214, 18], [262, 14], [306, 20]], 0.55) - 2 * c_ruido(x, 0, 5, 3);
    const yN = (x) => 99 - 6 * Math.sin(x * 0.031 + 4) - 4 * Math.sin(x * 0.09) - 2 * c_ruido(x, 1, 7, 4);
    for (let x = 0; x < 320; x++) { const a = Math.round(yF(x)), d = yF(x + 1) - yF(x - 1);
      for (let y = a; y < 112; y++) { const r = c_ruido(x, y, 4, 5); let c = d > 0 ? hex('#33407a') : hex('#212a5a'); if (y < 76 + r * 6) c = d > 0 ? (r > 0.4 ? hex('#9aa8d4') : hex('#7a88b8')) : hex('#4a5888'); else if (r > 0.7) c = d > 0 ? hex('#2a3670') : hex('#1a2250'); if (y === a) c = d > 0 ? hex('#b8c4e8') : hex('#5a6898'); pset(x, y, c); } }
    for (let x = 0; x < 320; x++) { const a = Math.round(yN(x)); for (let y = a; y < 112; y++) pset(x, y, y === a ? hex('#2a3460') : h(x, y, 6) < 0.2 ? hex('#121838') : hex('#18204a')); }
    // la línea de pinos de la otra orilla
    for (let x = 0; x < 320; x += 3) { const ht = 3 + Math.floor(h(x, 0, 7) * 5); if (x > 88 && x < 276) continue; poligono([[x - 2, 112], [x + 2, 112], [x, 112 - ht]], hex('#0c1230')); pset(x - 1, 111 - Math.floor(ht / 2), hex('#1e2a50')); }
    // el peñasco con sus grietas y pinos en las laderas
    poligono([[86, 112], [100, 104], [112, 100], [130, 97], [160, 99], [196, 96], [240, 98], [266, 97], [280, 104], [292, 112]], (x, y) => { const r = c_ruido(x, y, 5, 8); return y < 101 && x < 200 ? hex('#3a3c5a') : r > 0.66 ? hex('#34364e') : r < 0.3 ? hex('#16182c') : hex('#22243a'); });
    for (let i = 0; i < 9; i++) { const x = 100 + i * 21 + Math.floor(h(i, 1, 9) * 8); linea(x, 102 + (i % 3), x + 3, 110, hex('#121424')); }
    for (const [x, y, a] of [[92, 112, 9], [98, 111, 7], [276, 112, 8], [284, 112, 10], [270, 110, 6]]) c_pino(R, x, y, a, [hex('#0a1028'), hex('#142040'), hex('#2a3a60')]);
    const cas = c_castilloLejos(R, 196, 96, 1);
    return cas;
  });
  const orilla = c_capa(R, 'ext_cas_orilla', () => {
    // la orilla: guijarros, la hierba oscura con sus puntas de luna y el camino de piedras claras
    const borde = (x) => 149 + Math.round(Math.sin(x * 0.045) * 2 + Math.sin(x * 0.13) * 1);
    for (let x = 0; x < 320; x++) { const yb = borde(x); for (let y = yb; y < 180; y++) { const q = h(x, y, 680), r = c_ruido(x, y, 10, 681), playa = y < yb + 8 + r * 5;
      let c = playa ? (q < 0.25 ? hex('#4a4a62') : q < 0.5 ? hex('#33344a') : hex('#3e3e56')) : (r > 0.55 ? hex('#1e3230') : hex('#172624'));
      if (!playa && q < 0.12) c = hex('#2e4a3e'); if (!playa && q > 0.97) c = hex('#5a7a5a'); if (playa && q > 0.985) c = hex('#8a8aa8'); pset(x, y, c); } }
    for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 1, 682) * 320), y = 158 + Math.floor(h(i, 2, 682) * 20), r = 1 + Math.floor(h(i, 3, 682) * 2); disco(x, y, r, hex('#3a3a50')); pset(x - 1, y - r + 1, hex('#7a7a98')); }
    // las rocas grandes de la derecha (con el filo de luna)
    for (const [x, y, r] of [[296, 156, 14], [276, 162, 8], [314, 146, 9]]) { disco(x, y, r, hex('#1e2034')); disco(x - 2, y - 2, r - 2, hex('#2c2e46')); disco(x - r * 0.4, y - r * 0.5, r * 0.35, hex('#4a4c6a')); linea(x - r + 2, y - 2, x - 2, y - r + 1, hex('#6a6c90')); }
    // el embarcadero de tablones con sus postes y el poste del farol
    for (let x = 0; x <= 84; x++) { const c = x % 5 === 4 ? hex('#2a1a12') : h(x, 1, 683) < 0.2 ? hex('#5a3c26') : hex('#6e4a2e'); rect(x, 139, x, 143, c); pset(x, 139, x % 5 === 4 ? hex('#3a2618') : hex('#9a7048')); }
    rect(0, 144, 84, 144, hex('#1e120c'));
    for (const px of [6, 28, 50, 72]) { rect(px, 139, px + 2, 153, hex('#3a2618')); pset(px, 140, hex('#7a5638')); rect(px, 150, px + 2, 150, hex('#2a3a5a')); }
    rect(79, 116, 80, 139, hex('#2a1c14')); rect(77, 115, 82, 115, hex('#2a1c14')); pset(79, 117, hex('#6a4a30'));
    linea(84, 141, 92, 147, hex('#c8b890'));   // la amarra de la barca
    return { borde };
  });
  R.copiar(cielo.b);
  c_titilan(R, t, 104, 0, 16);
  c_luna(R, LX, LY, LR);
  c_nubes(R, t, [[20, 70, 70, 2.2], [210, 58, 54, 3.4], [120, 26, 38, 5.2], [300, 84, 44, 3]], c_NUBE_NOCHE);
  // la estrella fugaz de vez en cuando
  { const u = (t % 9) / 0.7; if (u < 1) { const x = 110 + u * 60, y = 20 + u * 22; linea(x - 8, y - 3, x, y, hex('#6a7ab8')); pset(Math.round(x), Math.round(y), hex('#ffffff')); } }
  c_pegar(R, lejos, 0, 111);
  c_ventanasVivas(R, t, lejos.meta.ven);
  // el banderín de la torre más alta
  { const [px, py] = lejos.meta.punta, on = Math.floor(t * 5) % 2; linea(px, py, px, py - 5, hex('#2a2c40')); for (let i = 1; i <= 5; i++) { pset(px + i, py - 5 + ((i + on) % 2), hex('#a8202a')); if (i < 4) pset(px + i, py - 4 + ((i + on) % 2), hex('#6a1018')); } }
  c_lago(R, t, lejos, 112, 150, 111.5, [hex('#24305e'), hex('#1a2550'), hex('#121a40'), hex('#0c1232')], LX);
  // las barquitas que cruzan hacia el castillo (o.barcas)
  const nb = o.barcas ?? 0; if (nb > 0) for (let k = 0; k < 4; k++) { const u = Math.max(0, Math.min(1, nb * 1.3 - k * 0.1)), x = Math.round(lerp(30 + k * 26, 150 + k * 12, u)), y = Math.round(lerp(146 - k * 2, 118, u)), s = u > 0.6 ? 0.6 : 1;
    if (u <= 0 || u >= 1) continue; if (s < 1) { rect(x - 4, y - 1, x + 4, y, hex('#2a1a12')); pset(x + 3, y - 3, hex('#ffe08a')); c_resplandor(R, x + 3, y - 3, 4, hex('#ffd070'), 0.4); } else c_barca(R, x, y, t, k, true, 0.7); }
  // las dos barcas amarradas junto al embarcadero
  c_barca(R, 106, 148, t, 1, false, 1.4); c_barca(R, 134, 146, t, 2, false, 1.2);
  c_pegar(R, orilla, 112, 179);
  // la espuma que lame la orilla
  for (let x = 0; x < 320; x += 2) { const y = orilla.meta.borde(x), s = Math.sin(x * 0.2 - t * 2.6); if (s > 0.3) pset(x + (s > 0.8 ? 1 : 0), y, hex('#8a9ac8')); if (s > 0.85) pset(x + 1, y - 1, hex('#c8d4f0')); }
  // el farol del embarcadero que tiembla
  { const fl = 0.5 + Math.sin(t * 11) * 0.06 + Math.sin(t * 4.3) * 0.05; c_resplandor(R, 80, 118, 16, hex('#ffc860'), fl); rect(77, 116, 82, 122, hex('#1e1612')); rect(78, 117, 81, 121, Math.sin(t * 13) > -0.6 ? hex('#ffe08a') : hex('#ffb040')); pset(79, 118, hex('#fff6c8')); rect(78, 123, 81, 123, hex('#2a1c14')); }
  // lechuzas: la blanca que cruza despacio y una parda más lejos; murciélagos junto a las torres
  c_lechuza(R, ((t * 14 + 40) % 400) - 40, 54 + Math.sin(t * 0.9) * 5, t, 1, true, 1);
  c_lechuza(R, 360 - ((t * 9 + 120) % 400), 80 + Math.sin(t * 1.3) * 3, t + 0.3, -1, false, 1);
  for (let k = 0; k < 3; k++) c_murcielago(R, 236 + Math.sin(t * 1.7 + k * 2) * 18, 40 + Math.cos(t * 2.3 + k) * 8 + k * 4, t);
  return { suelo: 168, horizonte: 112, luna: [LX, LY, LR], castillo: [100, 20, 270, 104], torreAlta: lejos.meta.punta, embarcadero: [0, 139, 84, 144], farol: [80, 118], agua: [112, 150], libre: [96, 270] };
}

// ¿(x, y) cae dentro del arco apuntado de centro cx, semiancho hw, arranque en la fila sp y descentrado ce de los arcos?
function c_enArco(x, y, cx, hw, sp, ce = 6) { const dx = x - cx; if (Math.abs(dx) > hw) return false; if (y >= sp) return true; const r = hw + ce; return (dx + ce) ** 2 + (y - sp) ** 2 <= r * r && (dx - ce) ** 2 + (y - sp) ** 2 <= r * r; }

// la estatua de piedra de un jabalí alado sobre su pedestal (x: centro, y: pie del pedestal)
function c_jabali(R, x, y, dir = 1) {
  const { rect, poligono, disco, pset, linea } = R, P = [hex('#1e2036'), hex('#34364e'), hex('#4c4e6a'), hex('#7a7c9c')];
  c_sillares(R, x - 14, y - 28, x + 14, y, 9, 5, P, 21); rect(x - 16, y - 30, x + 16, y - 28, P[2]); rect(x - 16, y - 30, x + 16, y - 30, P[3]); rect(x - 15, y - 1, x + 15, y, P[0]);
  const b = y - 31; disco(x, b - 7, 7, P[1]); disco(x - 1 * dir, b - 8, 6, P[2]); disco(x + 7 * dir, b - 6, 4, P[2]); pset(x + 10 * dir, b - 5, P[3]); pset(x + 9 * dir, b - 3, hex('#e8e4d0'));
  for (const lx of [-4, 4]) rect(x + lx, b - 2, x + lx + 1, b, P[1]);
  poligono([[x - 3 * dir, b - 10], [x - 12 * dir, b - 22], [x - 9 * dir, b - 13], [x - 14 * dir, b - 16], [x - 6 * dir, b - 9]], P[2]); linea(x - 3 * dir, b - 10, x - 12 * dir, b - 22, P[3]);
  linea(x - 5 * dir, b - 12, x - 2 * dir, b - 13, P[3]); pset(x + 8 * dir, b - 9, P[0]);
}

// las puertas del castillo y la escalinata, de noche
function c_puertas(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, CX = 160, HW = 28, SP = 84, SUELO = 176, RELLANO = 140, u = Math.max(0, Math.min(1, o.puertas ?? 0));
  const SIL = [hex('#1e1e34'), hex('#2c2c46'), hex('#38385a'), hex('#4c4c72')];
  const fondo = c_capa(R, 'ext_puertas', () => {
    // el cielo de la izquierda con la torre lejana
    c_cieloNoche(R, 70, 3);
    // el muro bajo de la izquierda con almenas, su ventana y la hiedra (los tallos; las hojas las mueve el viento)
    c_sillares(R, 0, 64, 95, 140, 12, 6, SIL, 1, 0.3);
    for (let x = 0; x < 96; x += 10) { c_sillares(R, x, 56, x + 5, 63, 6, 4, SIL, 2); rect(x, 56, x + 5, 56, SIL[3]); }
    rect(0, 63, 95, 64, SIL[3]);
    { const wx = 38; for (let y = 78; y <= 104; y++) for (let x = wx; x <= wx + 10; x++) if (c_enArco(x, y, wx + 5, 5, 86, 2)) pset(x, y, (y + x) % 5 === 0 ? hex('#ffe08a') : hex('#e8a040')); linea(wx + 5, 80, wx + 5, 104, hex('#3a2a2a')); linea(wx, 92, wx + 10, 92, hex('#3a2a2a')); rect(wx - 2, 105, wx + 12, 106, SIL[3]); }
    for (const [x0, y0] of [[62, 66], [74, 64], [86, 70], [92, 90]]) { let x = x0, y = y0; for (let k = 0; k < 40; k++) { pset(x, y, hex('#2a3a22')); y++; x += Math.round(Math.sin(k * 0.7 + x0) * 0.8); } }
    // la fachada: sillares grandes, más oscura arriba, las pilastras y la imposta
    c_sillares(R, 96, 0, 319, 140, 14, 7, SIL, 3, 0.15);
    for (let y = 0; y < 40; y++) for (let x = 96; x < 320; x++) if (c_umb(x, y) > y / 40) pset(x, y, c_mez(R.pget(x, y), hex('#0c0c1c'), 0.35));
    for (const px of [96, 262]) { c_sillares(R, px, 0, px + 9, 140, 10, 7, [SIL[1], SIL[2], SIL[3], hex('#5e5e86')], 4); rect(px + 10, 0, px + 11, 140, hex('#16162a')); rect(px, 0, px, 140, hex('#6a6a92')); }
    rect(106, 30, 261, 33, SIL[2]); rect(106, 30, 261, 30, hex('#6a6a92')); rect(106, 34, 261, 34, hex('#14142a'));
    for (let x = 116; x < 260; x += 16) { if (Math.abs(x + 4 - CX) < 30) continue; disco(x + 4, 22, 4, hex('#16162a')); for (const [a, b] of [[0, -2], [0, 2], [-2, 0], [2, 0]]) disco(x + 4 + a, 22 + b, 1.6, hex('#222238')); pset(x + 3, 19, SIL[3]); }
    // el arco: tres molduras, el intradós en sombra y el tímpano con su tracería
    for (const [off, c] of [[11, hex('#5a5a80')], [9, hex('#26263e')], [7, hex('#6e6e96')], [5, hex('#30304c')], [3, hex('#58587e')]])
      for (let y = 30; y <= RELLANO; y++) for (let x = CX - HW - off; x <= CX + HW + off; x++) if (c_enArco(x, y, CX, HW + off, SP, 6)) pset(x, y, x < CX - HW - off + 2 ? c_mez(c, hex('#ffffff'), 0.1) : c);
    for (let y = 30; y <= RELLANO; y++) for (let x = CX - HW - 2; x <= CX + HW + 2; x++) if (c_enArco(x, y, CX, HW + 2, SP, 6)) pset(x, y, hex('#141424'));
    // la escalinata: el rellano y cinco escalones que se ensanchan, con juntas y el canto gastado
    for (let k = -1; k < 5; k++) { const y0 = k < 0 ? RELLANO : 144 + 5 * k, y1 = k < 0 ? 143 : y0 + 4, w = k < 0 ? 64 : 70 + 10 * (k + 1);
      for (let y = y0; y <= y1; y++) for (let x = CX - w; x <= CX + w; x++) { const q = h(x, y, 690 + k); let c = y === y0 ? hex('#8a8aa8') : y === y0 + 1 ? hex('#5e5e7e') : ((x - CX + 400) % 13 === 0 ? hex('#1c1c30') : q < 0.1 ? hex('#2a2a40') : hex('#36364e'));
        if (y === y0 && q < 0.12) c = hex('#6a6a88'); if (y === y1) c = hex('#1a1a2c'); pset(x, y, c); } }
    // el patio enlosado con sus juntas en perspectiva
    for (let y = 169; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = y < 172 ? 0 : y < 176 ? 1 : 2, u2 = (x - CX) / (y - 120) * 4 + fila * 0.5, j = ((u2 % 1) + 1) % 1 < 0.08 || y === 172 || y === 176, q = h(Math.floor(u2), fila, 695);
      pset(x, y, j ? hex('#16162a') : q < 0.3 ? hex('#3a3a54') : q < 0.6 ? hex('#30304a') : hex('#44445e')); }
    for (let y = 140; y < 169; y++) for (let x = 0; x < 320; x++) if (Math.abs(x - CX) > (y < 144 ? 64 : 70 + 10 * (Math.floor((y - 144) / 5) + 1))) { const q = h(x >> 2, y >> 1, 696); pset(x, y, x < 96 || x > 262 ? (q < 0.3 ? hex('#2e2e48') : hex('#262640')) : (q < 0.4 ? hex('#22223a') : hex('#1c1c32'))); }
    rect(0, 140, 95, 140, hex('#4a4a6a'));
    // los charcos del patio (su brillo lo mueve el fotograma)
    for (const [x, y, w] of [[60, 175, 12], [250, 173, 9], [118, 178, 7]]) for (let i = -w; i <= w; i++) { const hh = Math.round(Math.sqrt(1 - (i / w) ** 2) * 2); rect(x + i, y - hh, x + i, y + hh, hex('#18203e')); }
    // las estatuas: el jabalí alado a la izquierda y otro a la derecha, mirándose
    c_jabali(R, 46, 168, 1); c_jabali(R, 286, 168, -1);
    // los ventanales de vidriera de la derecha
    for (const wx of [228]) { for (let y = 44; y <= 96; y++) for (let x = wx - 2; x <= wx + 16; x++) if (c_enArco(x, y, wx + 7, 9, 58, 3)) pset(x, y, hex('#5a5a80'));
      for (let y = 46; y <= 94; y++) for (let x = wx; x <= wx + 14; x++) if (c_enArco(x, y, wx + 7, 7, 58, 3)) { const q = h(x >> 1, y >> 1, 697), c = [hex('#c83a3a'), hex('#e8b040'), hex('#3a6ac8'), hex('#3a9a5a'), hex('#ffe08a')][Math.floor(q * 5)]; pset(x, y, (x - wx + y) % 4 === 0 || x === wx + 7 || y === 70 ? hex('#1a1424') : c); }
      rect(wx - 3, 97, wx + 17, 98, hex('#6a6a92')); }
    return {};
  });
  R.copiar(fondo.b);
  c_titilan(R, t, 60, 3, 6);
  R.recorte([0, 0, 95, 55]); c_nubes(R, t, [[10, 40, 36, 2.5], [60, 22, 26, 4]], c_NUBE_NOCHE); R.recorte(null);
  // la torre lejana, por delante de las nubes, con sus ventanas
    { const x0 = 62, x1 = 78; rect(x0, 26, x1, 70, hex('#1a1c34')); rect(x0, 26, x0, 70, hex('#3a3c5e')); poligono([[x0 - 2, 27], [x1 + 3, 27], [(x0 + x1) / 2 + 0.5, 17]], hex('#161a36')); linea(x0 - 2, 27, (x0 + x1) / 2, 17, hex('#3c4878'));
      rect(69, 36, 70, 40, Math.sin(t * 0.5) > -0.6 ? hex('#ffcc66') : hex('#14162a')); rect(69, 50, 70, 53, hex('#ffcc66')); rect(73, 44, 73, 46, hex('#ffb040')); }
  for (let k = 0; k < 3; k++) c_murcielago(R, 36 + Math.sin(t * 1.4 + k * 2.1) * 34, 24 + Math.cos(t * 2.1 + k) * 10 + k * 5, t);
  // dentro: el vestíbulo dorado (velas que flotan, la escalera, un fantasma que pasa) y las dos hojas de roble que se abren
  const wl = Math.round(HW * (1 - u) + (u > 0 ? 3 * u : 0));
  for (let y = 50; y <= RELLANO; y++) for (let x = CX - HW; x <= CX + HW; x++) { if (!c_enArco(x, y, CX, HW, SP, 6)) continue;
    let c; const izq = x < CX - HW + wl, der = x > CX + HW - wl;
    if (izq || der) { const xr = izq ? (x - (CX - HW)) / Math.max(1, wl) : (CX + HW - x) / Math.max(1, wl), tabla = Math.floor(xr * 6), borde = (xr * 6) % 1 < 0.16, q = h(tabla, y >> 2, 700 + (izq ? 0 : 1));
      c = borde ? hex('#2a160c') : q < 0.3 ? hex('#5a3418') : hex('#6a3e1e'); if (h(x, y, 701) < 0.08) c = hex('#7a4a26'); if (u > 0.5) c = c_mez(c, hex('#000000'), 0.25);
      if ((y === 74 || y === 75 || y === 104 || y === 105 || y === 128 || y === 129) && xr < 0.8) c = y % 2 ? hex('#1a1a22') : hex('#4a4a5a');
      if ((y === 74 || y === 104 || y === 128) && Math.round(xr * 12) % 3 === 0) c = hex('#8a8a9a'); }
    else { const fy = y > 112, d = Math.abs(x - CX);
      c = fy ? (((Math.floor((x - CX) / (y - 96) * 6) + Math.floor((y - 112) / 5)) & 1) ? hex('#b8803a') : hex('#a06a2a')) : (y > 92 && d < 14 && (y - 92) % 3 === 0 ? hex('#6a3e1a') : y > 92 && d < 14 ? hex('#c89048') : (h(x >> 2, y >> 1, 702) < 0.3 ? hex('#7a4a22') : hex('#8a5a2a')));
      if (y < 60) c = hex('#3a2010'); }
    pset(x, y, c); }
  if (u > 0.05) {
    R.recorte([CX - HW + wl + 1, 50, CX + HW - wl - 1, RELLANO]);
    for (let k = 0; k < 12; k++) { const x = CX - 24 + Math.floor(h(k, 1, 703) * 48), y = 60 + Math.floor(h(k, 2, 703) * 26) + Math.round(Math.sin(t * 1.6 + k) * 1.5); R.linea(x, y, x, y + 2, hex('#f4ecd8')); pset(x, y - 1, Math.sin(t * 9 + k) > 0 ? hex('#fff6c0') : hex('#ffc860')); }
    const g = (t * 0.12) % 1.6; if (g < 1) { const gx = Math.round(lerp(CX - 34, CX + 34, g)), gy = 96 + Math.round(Math.sin(t * 2) * 2); for (let j = 0; j < 12; j++) for (let i = -3; i <= 3; i++) if (Math.abs(i) <= 3 - (j < 3 ? 3 - j : 0) && ((i + j) & 1)) pset(gx + i, gy + j, hex('#d8e4f0')); pset(gx - 1, gy + 2, hex('#2a3a5a')); pset(gx + 1, gy + 2, hex('#2a3a5a')); }
    c_antorcha(R, CX - 22, 96, t, 5); c_antorcha(R, CX + 22, 96, t, 6);
    R.recorte(null);
    // la luz que se derrama por la escalinata y el patio
    for (let y = RELLANO; y < 180; y++) { const a = (y - RELLANO) / 40, x0 = CX - HW + wl - a * 30, x1 = CX + HW - wl + a * 30; for (let x = Math.round(x0); x <= x1; x++) if (c_umb(x, y) < u * 0.75 * (1 - a * 0.6)) pset(x, y, c_mez(R.pget(x, y), hex('#ffc060'), 0.35)); }
  }
  // las aldabas
  if (wl > 8) for (const ax of [CX - HW + wl - 5, CX + HW - wl + 5]) { R.anillo(ax + 0.5, 112.5, 2.5, hex('#c8a040')); pset(ax, 109, hex('#8a6a20')); }
  // las antorchas de la fachada y su luz que tiembla
  for (const [x, k] of [[112, 0], [208, 1]]) { c_resplandor(R, x, 82, 26, hex('#ff9a3a'), 0.42 + Math.sin(t * 9 + k) * 0.05); c_antorcha(R, x, 88, t, k); }
  // el brillo de los charcos (la luz de las antorchas que se mueve)
  for (const [x, y, w] of [[60, 175, 12], [250, 173, 9], [118, 178, 7]]) for (let i = -w + 2; i <= w - 2; i += 2) if (Math.sin(i * 0.9 + t * 3 + x) > 0.4) pset(x + i, y, hex('#e89a4a'));
  // la hiedra que se mece
  for (let i = 0; i < 70; i++) { const x0 = [62, 74, 86, 92][i % 4], y = 66 + Math.floor(h(i, 1, 704) * 60) + (i % 4 === 3 ? 18 : 0), x = x0 + Math.round(Math.sin(i * 0.7) * 3 + Math.sin(t * 1.8 + i * 0.4) * 0.8);
    pset(x, y, h(i, 2, 704) < 0.4 ? hex('#4a7a3a') : hex('#2e5a2a')); pset(x + 1, y, hex('#1e3a1e')); }
  // la lechuza parda en la almena: parpadea y gira la cabeza
  { const x = 72, y = 52, gira = Math.sin(t * 0.7) > 0.6 ? 1 : 0, ojo = (t % 3.4) < 0.15;
    rect(x - 2, y - 3, x + 2, y + 3, hex('#8a6a4a')); rect(x - 2, y + 1, x + 2, y + 3, hex('#c8b090')); rect(x - 2 + gira, y - 6, x + 2 + gira, y - 3, hex('#9a7a5a')); pset(x - 2 + gira, y - 7, hex('#6a4a30')); pset(x + 2 + gira, y - 7, hex('#6a4a30'));
    if (!ojo) { pset(x - 1 + gira, y - 5, hex('#ffd040')); pset(x + 1 + gira, y - 5, hex('#ffd040')); } else { pset(x - 1 + gira, y - 5, hex('#5a4030')); pset(x + 1 + gira, y - 5, hex('#5a4030')); } pset(x + gira, y - 4, hex('#e8a830')); }
  // polillas alrededor de las antorchas
  for (let k = 0; k < 4; k++) { const ax = k < 2 ? 112 : 208; pset(Math.round(ax + Math.cos(t * 3 + k * 2) * 9), Math.round(74 + Math.sin(t * 4.2 + k) * 6), hex('#e8dcc0')); }
  return { suelo: SUELO, rellano: RELLANO, puerta: [CX - HW, 50, CX + HW, RELLANO], antorchas: [[112, 80], [208, 80]], escalones: [144, 169], estatuas: [46, 286], libre: [70, 260] };
}

// un jinete en escoba a contraluz (x, y: el asiento; s escala; dir hacia dónde mira), con la capa que ondea y el filo de luna
function c_escoba(R, x, y, t, s = 1, dir = -1, k = 0) {
  x = Math.round(x); y = Math.round(y);
  const { linea, rect, pset, disco, poligono } = R, os = hex('#0e1024'), filo = hex('#5a6aa0'), pal = hex('#5a3a22');
  linea(x - 8 * s * dir, y + 1, x + 7 * s * dir, y - 1, pal); linea(x - 8 * s * dir, y, x + 4 * s * dir, y - 1, hex('#8a6038'));
  for (let i = 0; i < 4; i++) linea(x + 7 * s * dir, y - 1, x + (10 + i * 0.6) * s * dir, y - 3 + i * 1.6 * s, hex('#a8844a'));
  const cap = Math.round(Math.sin(t * 8 + k) * 1.5 * s);
  poligono([[x - 1 * s * dir, y - 7 * s], [x + 2 * s * dir, y - 1], [x + (6 + Math.abs(cap)) * s * dir, y - 2 + cap]], os);
  rect(Math.min(x, x - 2 * s * dir), y - 7 * s, Math.max(x, x - 2 * s * dir) + Math.round(s), y, os);
  disco(x - 1 * s * dir, y - 9 * s, 2 * s, os); pset(x - 2 * s * dir, y - 10 * s, filo); linea(x - 2 * s * dir, y - 6 * s, x - 2 * s * dir, y - 2, filo);
  linea(x, y, x - 2 * s * dir, y + 3 * s, os); linea(x - 1 * s * dir, y - 5 * s, x - 5 * s * dir, y - 2 * s, os);
}

// lo alto de la torre de Astronomía de noche (almenas: la cámara de cerca)
function c_torre(R, t, o, almenas) {
  const { rect, pset, poligono, linea, disco } = R, ne = Math.max(0, Math.min(1, o.escobas ?? 0));
  if (!almenas) {
    const LX = 64, LY = 48, LR = 13, MER = (x) => ((x + 4) % 24) < 14;   // las almenas: 14 de piedra y 10 de hueco
    const fondo = c_capa(R, 'ext_torre', () => {
      c_cieloNoche(R, 112, 7);
      // los montes y el lago lejos, abajo, que asoman entre las almenas
      for (let x = 0; x < 320; x++) { const a = Math.round(c_cordillera(x, 100, [[40, 14], [120, 20], [200, 12], [290, 16]], 0.4)); for (let y = a; y < 99; y++) pset(x, y, y === a ? hex('#4a5888') : c_ruido(x, y, 4, 9) > 0.6 ? hex('#26306a') : hex('#1e2858')); }
      c_degradado(R, 0, 99, 319, 107, [hex('#2a3a72'), hex('#141c46')]);
      for (let x = 0; x < 320; x += 2) if (h(x, 3, 707) < 0.5) pset(x, 99, hex('#0c1230'));
      // la garita del caracol: torre redonda (sombreado por columnas), sillares curvos y el tejado cónico de pizarra
      for (let x = 0; x <= 62; x++) { const cz = Math.cos((x - 31) / 33 * 1.45), lum = (x - 31) < 0 ? 0.25 + cz * 0.75 : cz * 0.55;
        for (let y = 46; y < 150; y++) { const fila = Math.floor(y / 6), col = Math.floor((x + (fila & 1) * 5) / (4 + cz * 8)), j = y % 6 === 5 || ((x + (fila & 1) * 5) % Math.round(4 + cz * 8) === 0), q = h(col, fila, 708);
          let c = lum > 0.75 ? hex('#5a5c84') : lum > 0.45 ? hex('#44466a') : lum > 0.2 ? hex('#33355a') : hex('#24263e'); if (j) c = hex('#18182c'); else if (q < 0.15) c = c_mez(c, hex('#000000'), 0.2); pset(x, y, c); } }
      poligono([[-4, 49], [67, 49], [31, 16]], (x, y) => { const sh = (x - 31) / Math.max(1, (y - 16) * 1.05); return (y - 16) % 4 === 0 ? hex('#141838') : sh < -0.4 ? hex('#4a5888') : sh < 0.2 ? hex('#323e6e') : hex('#1e2650'); });
      for (let i = -3; i <= 66; i += 2) pset(i, 49, hex('#5a6aa0')); linea(-4, 49, 31, 16, hex('#6a7ab0'));
      for (let y = 112; y <= 150; y++) for (let x = 18; x <= 42; x++) if (c_enArco(x, y, 30, 11, 122, 3)) pset(x, y, x < 22 ? hex('#4a2a14') : (y > 140 ? hex('#c8883a') : (x + y) % 7 === 0 ? hex('#e8a050') : hex('#d89448')));
      for (let y = 113; y <= 150; y++) { pset(17, y, hex('#6a6a90')); pset(43, y, hex('#1a1a2c')); }
      for (let y = 124; y <= 148; y++) for (let x = 19; x <= 23; x++) pset(x, y, x === 23 ? hex('#2a160c') : (y % 5 === 0 ? hex('#3a2010') : hex('#5a3418')));
      for (let y = 128; y < 148; y += 3) linea(26, y, 38, y - 2, hex('#8a5a2a'));   // los peldaños del caracol que se ven por la puerta
      // el pretil: las almenas, la albardilla con su filo de luna y la cara interior en sombra
      for (let x = 0; x < 320; x++) { const m = MER(x); for (let y = 96; y < 132; y++) { if (y < 108 && !m) continue; if (x < 62 && y < 150) continue;
        const fila = Math.floor(y / 6), j = y % 6 === 5 || (x + (fila & 1) * 6) % 12 === 0, q = h(Math.floor((x + (fila & 1) * 6) / 12), fila, 709);
        let c = j ? hex('#16162a') : q < 0.2 ? hex('#262844') : q > 0.85 ? hex('#3e4062') : hex('#30324e'); if (y === 96 || y === 108) c = hex('#6e70a0'); else if (y === 97 || y === 109) c = hex('#4a4c74');
        if (m && y < 108 && (x + 4) % 24 === 0) c = hex('#5a5c88'); if (m && y < 108 && (x + 4) % 24 === 13) c = hex('#1a1a30'); if (y > 108 && c_ruido(x, y, 8, 710) > 0.78 && j) c = hex('#2e4a2a'); pset(x, y, c); } }
      // el suelo de losas en perspectiva
      for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { if (x < 62 && y < 151) continue; const fy = [136, 141, 147, 154, 162, 171, 180].findIndex((v) => y < v), ux = (x - 170) / (y - 60) * 7 + fy * 0.5, j = [136, 141, 147, 154, 162, 171].includes(y) || ((ux % 1) + 1) % 1 < 0.07, q = h(Math.floor(ux), fy, 711);
        let c = j ? hex('#1a1a2e') : q < 0.25 ? hex('#3e3e5c') : q < 0.6 ? hex('#4a4a6a') : hex('#545476'); if (!j && h(x, y, 712) < 0.04) c = hex('#2e2e48'); pset(x, y, c); }
      for (let x = 62; x < 320; x++) { pset(x, 132, hex('#121222')); pset(x, 133, hex('#22223a')); }
      // la sombra de las almenas sobre las losas (la luna cae desde la izquierda), el banco de piedra, las cartas enrolladas y el cubo
      for (let y = 134; y < 142; y++) for (let x = 62; x < 320; x++) if (MER(x - (y - 132)) && ((x + y) & 1)) pset(x, y, c_mez(R.pget(x, y), hex('#0a0a18'), 0.35));
      c_sillares(R, 86, 124, 150, 131, 16, 4, [hex('#16162a'), hex('#2e2e48'), hex('#3c3c5c'), hex('#5a5a80')], 33); rect(84, 122, 152, 123, hex('#6a6a92')); rect(84, 124, 152, 124, hex('#2a2a44'));
      for (const lx of [92, 142]) rect(lx, 131, lx + 4, 135, hex('#24243c'));
      for (const [x, y, c] of [[178, 150, hex('#d8ccaa')], [186, 153, hex('#c8b890')], [182, 147, hex('#e8dcb8')]]) { rect(x, y, x + 9, y + 2, c); rect(x, y, x, y + 2, hex('#8a7a5a')); rect(x + 9, y, x + 9, y + 2, hex('#f8f0d8')); }
      rect(198, 146, 205, 154, hex('#4a3a2a')); rect(198, 146, 205, 146, hex('#7a6a5a')); rect(199, 147, 204, 147, hex('#2a3a6a')); linea(198, 146, 201, 142, hex('#5a5a68')); linea(201, 142, 205, 146, hex('#5a5a68'));
      // la mesita con la carta del cielo (puntos y trazos, sin letras) y el reloj de arena
      rect(212, 134, 244, 136, hex('#5a3418')); rect(212, 134, 244, 134, hex('#8a5a2a')); for (const lx of [214, 241]) rect(lx, 137, lx + 1, 152, hex('#3a2010'));
      poligono([[214, 133], [238, 133], [240, 130], [216, 130]], hex('#d8ccaa')); for (const [a, b] of [[218, 131], [224, 132], [230, 131], [235, 132]]) pset(a, b, hex('#2a3a7a')); linea(218, 131, 224, 132, hex('#6a7ab0')); linea(224, 132, 230, 131, hex('#6a7ab0'));
      rect(238, 126, 242, 126, hex('#c8a040')); rect(238, 133, 242, 133, hex('#c8a040')); linea(239, 127, 241, 132, hex('#e8dcc0')); linea(241, 127, 239, 132, hex('#e8dcc0')); pset(240, 131, hex('#e8c070'));
      // el telescopio de latón en su trípode, apuntando a la luna
      for (const [fx, fy] of [[252, 152], [272, 152], [262, 150]]) linea(262, 128, fx, fy, hex('#3a2a1a'));
      rect(260, 126, 264, 129, hex('#5a4a2a'));
      for (let i = 0; i <= 24; i++) { const x = Math.round(272 - i * 1.2), y = Math.round(122 - i * 0.45), r = i < 4 ? 2 : 1.5; disco(x, y, r, i % 6 === 0 ? hex('#8a6a20') : hex('#c8a040')); pset(x, y - 1, hex('#f0d880')); }
      disco(272, 122, 2.6, hex('#6a5020')); pset(243, 112, hex('#a8c8e8'));
      return {};
    });
    R.copiar(fondo.b);
    R.recorte([62, 0, 319, 95]);
    c_titilan(R, t, 84, 7, 16);
    c_luna(R, LX + 40, LY, LR, 2.2);
    c_nubes(R, t, [[60, 62, 60, 2], [230, 30, 40, 4.5], [150, 76, 46, 3.2]], c_NUBE_NOCHE);
    R.recorte(null);
    // vuelve a poner la garita y el pretil por delante de las nubes
    { const B = R.buf, b = fondo.b; for (let y = 14; y < 96; y++) for (let x = 0; x < 68; x++) { const i = y * 320 + x; if (x <= 66 && (y >= 49 || (y >= 16 && Math.abs(x - 31) <= (y - 16) * 35 / 33 + 1))) B[i] = b[i]; } }
    // el lago lejano: brillos que corren entre las almenas
    for (let i = 0; i < 24; i++) { const x = Math.floor((h(i, 1, 713) * 320 + t * (3 + i % 3)) % 320), y = 100 + Math.floor(h(i, 2, 713) * 7); if (!MER(x) && x > 62 && Math.sin(t * 3 + i) > 0) pset(x, y, hex('#8a9ad0')); }
    // la antorcha de la garita y su luz
    c_resplandor(R, 52, 106, 18, hex('#ff9a3a'), 0.4 + Math.sin(t * 9) * 0.05); c_antorcha(R, 52, 112, t, 2);
    // el banderín del tejado de la garita
    { const on = Math.floor(t * 5) % 2; linea(31, 16, 31, 10, hex('#2a2c40')); for (let i = 1; i <= 5; i++) pset(31 + i, 10 + ((i + on) % 2), hex('#e8b830')); }
    c_lechuza(R, ((t * 12 + 200) % 400) - 40, 70 + Math.sin(t) * 4, t, 1, true);
    // las cuatro escobas que llegan desde la derecha y se quedan flotando junto a las almenas
    const fin = [[176, 66], [204, 58], [232, 70], [258, 62]];
    if (ne > 0) for (let k = 0; k < 4; k++) { const u = Math.max(0, Math.min(1, ne * 1.4 - k * 0.12)), e = u * u * (3 - 2 * u), x = lerp(360 + k * 30, fin[k][0], e), y = lerp(30 + k * 8, fin[k][1], e) + Math.sin(t * 2.2 + k) * 1.5; if (u > 0) c_escoba(R, x, y, t, 1, -1, k); }
    return { suelo: 160, luna: [LX + 40, LY, LR], garita: [0, 16, 66, 150], puertaGarita: [18, 112, 42, 150], telescopio: [244, 110, 274, 152], mesa: [212, 130, 244, 152], pretil: [62, 96, 319, 132], escobas: fin, libre: [70, 205] };
  }
  // ── las almenas de cerca
  const LX = 214, LY = 56, LR = 12, MER = (x) => x >= 0 && ((x + 10) % 66) < 40;
  const fondo = c_capa(R, 'ext_almenas', () => {
    c_cieloNoche(R, 96, 8);
    for (let x = 0; x < 320; x++) { const a = Math.round(c_cordillera(x, 96, [[30, 16], [96, 24], [170, 14], [250, 22], [310, 12]], 0.5)); for (let y = a; y < 97; y++) { const r = c_ruido(x, y, 4, 11); pset(x, y, y < 80 + r * 4 ? hex('#8a98c8') : r > 0.6 ? hex('#26306a') : hex('#1e2858')); } }
    c_degradado(R, 0, 97, 319, 126, [hex('#2a3a72'), hex('#1a2656'), hex('#101840')]);
    // la orilla con el bosque, la cabaña lejana con su luz y el castillo diminuto a la izquierda
    for (let x = 0; x < 320; x++) { const a = 116 + Math.round(Math.sin(x * 0.05) * 3 + c_ruido(x, 0, 5, 12) * 3); for (let y = a; y < 127; y++) pset(x, y, hex('#0a1028')); if (h(x, 1, 714) < 0.5) pset(x, a - 1 - Math.floor(h(x, 2, 714) * 3), hex('#0e1634')); }
    rect(146, 118, 152, 122, hex('#2a2a3e')); poligono([[144, 119], [154, 119], [149, 114]], hex('#1a1c30')); pset(148, 120, hex('#ffcc66')); pset(150, 120, hex('#ffcc66'));
    c_castilloLejos(R, 40, 112, 0.32);
    // las almenas: sillares grandes con musgo, la albardilla con filo de luna, la cara del muro y el suelo
    for (let x = 0; x < 320; x++) for (let y = 86; y < 152; y++) { const m = MER(x); if (y < 126 && !m) continue;
      const fila = Math.floor(y / 8), xo = x + (fila & 1) * 8, j = y % 8 === 7 || xo % 16 === 0, q = h(Math.floor(xo / 16), fila, 715), r = c_ruido(x, y, 7, 716);
      let c = y >= 130 ? (j ? hex('#141426') : q < 0.3 ? hex('#22243c') : hex('#2a2c46')) : (j ? hex('#1a1a2e') : q < 0.2 ? hex('#2e3050') : q > 0.82 ? hex('#4a4c72') : hex('#3a3c5e'));
      if (!j && h(x, y, 717) < 0.05) c = hex('#24263e'); if (j && r > 0.62) c = hex('#3a5a2a'); if (!j && r > 0.85) c = hex('#2e4a2e');
      if (m && y < 126) { const mx = (x + 10) % 66; if (mx < 2) c = hex('#6e70a0'); else if (mx > 37) c = hex('#1e1e34'); if (y < 89) c = y === 86 ? hex('#8a8cb8') : hex('#5a5c88'); }
      if (y === 126 || y === 127) c = y === 126 ? hex('#7a7cac') : hex('#4a4c74'); if (y === 128 || y === 129) c = hex('#141426'); pset(x, y, c); }
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = [157, 163, 170, 180].findIndex((v) => y < v), ux = (x - 160) / (y - 90) * 5 + fy * 0.5, j = [157, 163, 170].includes(y) || ((ux % 1) + 1) % 1 < 0.06, q = h(Math.floor(ux), fy, 718);
      pset(x, y, j ? hex('#1a1a2e') : q < 0.3 ? hex('#3e3e5c') : q < 0.6 ? hex('#4a4a6a') : hex('#545476')); }
    rect(0, 152, 319, 152, hex('#101020'));
    // la gárgola de la almena derecha
    { const gx = 264, gy = 86; poligono([[gx, gy], [gx + 18, gy - 2], [gx + 22, gy - 7], [gx + 16, gy - 9], [gx + 6, gy - 6], [gx, gy - 5]], hex('#34365a')); linea(gx + 6, gy - 6, gx + 16, gy - 9, hex('#6e70a0')); pset(gx + 19, gy - 6, hex('#14142a'));
      poligono([[gx + 4, gy - 5], [gx + 2, gy - 14], [gx + 8, gy - 7]], hex('#2a2c48')); linea(gx + 4, gy - 5, gx + 2, gy - 14, hex('#5a5c88')); linea(gx + 20, gy - 3, gx + 23, gy - 1, hex('#e8e4d0')); }
    // el soporte del farol
    rect(54, 100, 55, 112, hex('#1a1a24')); linea(55, 100, 64, 100, hex('#1a1a24')); linea(64, 100, 64, 104, hex('#1a1a24'));
    return {};
  });
  R.copiar(fondo.b);
  // lo que se ve entre las almenas (cielo, luna, nubes, el lago que brilla) se recorta a los huecos
  const huecos = [[30, 0, 55, 125], [96, 0, 121, 125], [162, 0, 187, 125], [228, 0, 253, 125]];
  R.recorte([0, 0, 319, 85]); c_titilan(R, t, 80, 8, 14); c_luna(R, LX, LY, LR, 2.1); c_nubes(R, t, [[20, 40, 54, 2.4], [200, 22, 36, 4.8], [120, 70, 48, 3.4]], c_NUBE_NOCHE); R.recorte(null);
  for (const hq of huecos) { R.recorte(hq); c_luna(R, LX, LY, LR, 2.1); c_nubes(R, t, [[20, 40, 54, 2.4], [200, 22, 36, 4.8], [120, 70, 48, 3.4]], c_NUBE_NOCHE);
    for (let i = 0; i < 30; i++) { const x = hq[0] + Math.floor(h(i, 1, 719) * 26), y = 100 + Math.floor(h(i, 2, 719) * 16), s = Math.sin(t * 2.5 + i * 1.3 + x * 0.2); if (s > 0.5) pset(x, y, Math.abs(x - LX) < 5 ? hex('#e8e4c8') : hex('#5a6aa8')); }
    R.recorte(null); }
  // vuelve a pegar las cumbres y la orilla por delante de las nubes, solo en los huecos
  { const B = R.buf, b = fondo.b; for (const [x0, , x1] of huecos) for (let y = 70; y < 126; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, v = b[i]; if (y >= 97 || c_cordillera(x, 96, [[30, 16], [96, 24], [170, 14], [250, 22], [310, 12]], 0.5) <= y) if (y < 100 || y > 114) B[i] = v; } }
  // el farol colgado que se mece y su luz
  { const sw = Math.round(Math.sin(t * 1.6) * 1.5), fx = 64 + sw, fy = 108; c_resplandor(R, fx, fy, 22, hex('#ffb850'), 0.45 + Math.sin(t * 11) * 0.04); linea(64, 104, fx, fy - 4, hex('#1a1a24'));
    rect(fx - 3, fy - 3, fx + 3, fy + 5, hex('#1e1612')); rect(fx - 2, fy - 2, fx + 2, fy + 4, Math.sin(t * 13) > -0.6 ? hex('#ffe08a') : hex('#ffb040')); pset(fx, fy, hex('#fff6c8')); rect(fx - 4, fy - 4, fx + 4, fy - 4, hex('#2a1c14')); pset(fx, fy - 5, hex('#2a1c14')); }
  c_lechuza(R, 360 - ((t * 16 + 60) % 400), 34 + Math.sin(t * 1.2) * 4, t, -1, false, 1);
  const fin = [[150, 62], [184, 52], [218, 68], [250, 56]];
  if (ne > 0) for (let k = 0; k < 4; k++) { const u = Math.max(0, Math.min(1, ne * 1.4 - k * 0.12)), e = u * u * (3 - 2 * u), x = lerp(370 + k * 34, fin[k][0], e), y = lerp(20 + k * 10, fin[k][1], e) + Math.sin(t * 2.2 + k) * 2; if (u > 0) c_escoba(R, x, y, t, 2, -1, k); }
  return { suelo: 168, luna: [LX, LY, LR], almenas: [[-10, 30], [56, 96], [122, 162], [188, 228], [254, 294]], huecos: huecos.map(([a, , b]) => [a, b]), pretil: 126, farol: [64, 108], escobas: fin, libre: [20, 300] };
}

// un tronco con corteza (x0–x1, de y0 al pie y1): vetas verticales, nudos, el filo de luna a la izquierda y raíces que se
// abren al pie; cols [sombra, cuerpo, veta, filo]
function c_tronco(R, x0, x1, y0, y1, cols, k = 0, raices = true) {
  const [cS, c, cV, cL] = cols, w = x1 - x0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / Math.max(1, w), v = c_ruido(x * 3, y * 0.4, 6, 720 + k);
    let p = u > 0.62 ? cS : v > 0.62 ? cV : c; if (u < 0.12) p = cL; else if (u < 0.2 && v > 0.4) p = cL; if (h(x, Math.floor(y / 3), 721 + k) < 0.05) p = cS; R.pset(x, y, p); }
  for (let i = 0; i < 3; i++) { const ny = y0 + 10 + Math.floor(h(i, 1, 722 + k) * Math.max(1, y1 - y0 - 30)), nx = x0 + 2 + Math.floor(h(i, 2, 722 + k) * Math.max(1, w - 4)); R.disco(nx, ny, 1.6, cS); R.pset(nx - 1, ny - 1, cV); }
  if (raices) for (const d of [-1, 1]) for (let r = 0; r < 2; r++) { const bx = d < 0 ? x0 + 1 : x1 - 1, L = w * (0.6 + r * 0.4); R.poligono([[bx, y1 - 10 - r * 3], [bx + d * L, y1 + 2], [bx + d * L * 0.6, y1 + 3], [bx - d * 2, y1]], (x, y) => (y < y1 - 3 && d < 0 ? cL : x % 3 === 0 ? cS : c)); }
}

// un centauro a contraluz (x: centro, suelo; dir: hacia dónde mira), con el arco y el filo de luna; s escala
function c_centauro(R, x, suelo, t, dir = 1, s = 1) {
  x = Math.round(x); const { disco, rect, linea, pset, poligono } = R, os = hex('#06070f'), fi = hex('#9aaad8'), cola = Math.round(Math.sin(t * 3 + x) * 1.5), y = suelo - Math.round(14 * s);
  for (const [lx, ph] of [[-6, 0], [-4, 1], [5, 1], [7, 0]]) { const p = Math.round(Math.sin(t * 2 + ph * 3) * 0.6); linea(x + lx * s * dir, y + 3, x + (lx + p) * s * dir, suelo, os); }
  disco(x, y, 6 * s, os); disco(x + 4 * s * dir, y - 1, 5 * s, os); disco(x - 4 * s * dir, y, 5 * s, os);
  linea(x - 9 * s * dir, y - 2, x - (12 + cola) * s * dir, y + 6, os); linea(x - 10 * s * dir, y - 2, x - (11 + cola) * s * dir, y + 7, os);
  rect(Math.min(x + 5 * s * dir, x + 9 * s * dir), y - 15 * s, Math.max(x + 5 * s * dir, x + 9 * s * dir), y - 2, os); disco(x + 7 * s * dir, y - 17 * s, 2.4 * s, os);
  linea(x + 7 * s * dir, y - 20 * s, x + 5 * s * dir, y - 14 * s, os);   // el pelo largo
  for (let a = -1.1; a <= 1.1; a += 0.1) pset(Math.round(x + (12 + Math.cos(a) * 3) * s * dir), Math.round(y - 9 * s + Math.sin(a) * 7 * s), hex('#3a2a1a'));
  linea(x + 9 * s * dir, y - 11 * s, x + 12 * s * dir, y - 9 * s, os);
  linea(x - 4 * s * dir, y - 5 * s, x + 6 * s * dir, y - 6 * s, fi); linea(x + 5 * s * dir, y - 15 * s, x + 5 * s * dir, y - 5 * s, fi); pset(x + 6 * s * dir, y - 19 * s, fi);
  if (Math.sin(t * 0.8 + x) > 0.85) { pset(x + 8 * s * dir, y - 17 * s, hex('#c8d8ff')); }
}

// unos ojos que brillan en lo oscuro y parpadean (x, y: el izquierdo; c color)
function c_ojos(R, x, y, t, k, c = hex('#e8d040')) { const ab = (t + k * 1.3) % (3 + (k % 3)) > 0.18; if (!ab) return; R.pset(x, y, c); R.pset(x + 3, y, c); if (k % 2) { R.pset(x, y - 1, c_mez(c, hex('#000000'), 0.5)); R.pset(x + 3, y - 1, c_mez(c, hex('#000000'), 0.5)); } }

// la niebla que se arrastra: tiñe hacia col las filas y0–y1 con un ruido que corre a dos velocidades (a: fuerza máxima)
function c_niebla(R, t, y0, y1, col, a = 0.35, k = 0) {
  const B = R.buf; for (let y = y0; y <= y1; y++) { const fy = Math.sin((y - y0) / (y1 - y0) * Math.PI);
    for (let x = 0; x < 320; x++) { const n = c_ruido(x + t * 9, y * 2.2, 24, 730 + k) * 0.6 + c_ruido(x - t * 5, y * 3, 13, 731 + k) * 0.4, g = (n - 0.42) * 2.2 * fy * a;
      if (g > c_umb(x, y) * 0.6) { const i = y * 320 + x; B[i] = c_mez(B[i], col, Math.min(0.6, g + 0.12)); } } }
}

// las luciérnagas que vagan (n), con su brillo que sube y baja
function c_luciernagas(R, t, n, x0, y0, x1, y1, k = 0) {
  for (let i = 0; i < n; i++) { const x = x0 + (h(i, 1, 735 + k) * (x1 - x0) + Math.sin(t * 0.7 + i) * 14 + t * 2) % (x1 - x0), y = y0 + h(i, 2, 735 + k) * (y1 - y0) + Math.sin(t * 1.1 + i * 2) * 6, b = Math.sin(t * 2.4 + i * 1.7);
    if (b < -0.3) continue; R.pset(Math.round(x), Math.round(y), b > 0.5 ? hex('#f0ff9a') : hex('#a8c85a')); if (b > 0.6) { for (const [a, c] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.pset(Math.round(x) + a, Math.round(y) + c, hex('#5a7a3a')); } }
}

// el bosque prohibido de noche
function c_bosque(R, t, o) {
  const { rect, pset, poligono, linea } = R, nc = Math.max(0, Math.min(1, o.centauros ?? 0));
  const COLS = [hex('#100e1a'), hex('#1c1828'), hex('#262236'), hex('#4a4a72')], LEJ = [hex('#141c3a'), hex('#1a2448'), hex('#202c54'), hex('#34427a')];
  const fondo = c_capa(R, 'ext_bosque', () => {
    c_degradado(R, 0, 0, 319, 150, [hex('#0a1030'), hex('#0e1638'), hex('#16204a'), hex('#24305e'), hex('#2e3c6c')]);
    for (let i = 0; i < 60; i++) { const x = Math.floor(h(i, 1, 740) * 260), y = Math.floor(h(i, 2, 740) * 30); pset(x, y, i % 5 ? hex('#6a7ab8') : hex('#ffffff')); }
    // dos filas de troncos lejanos, cada vez más azulados por la bruma, y el sotobosque en silueta
    for (let i = 0; i < 26; i++) { const x = Math.floor(h(i, 1, 739) * 330) - 5, w = 2 + Math.floor(h(i, 2, 739) * 3); c_tronco(R, x, x + w, 20, 146, [hex('#26325e'), hex('#2a3866'), hex('#30406e'), hex('#3e4e80')], 80 + i, false); }
    for (let x = 0; x < 320; x++) { const a = 128 + Math.round(c_ruido(x, 0, 9, 738) * 14 - Math.abs(Math.sin(x * 0.21)) * 4); for (let y = a; y < 150; y++) pset(x, y, y === a ? hex('#2a3a5a') : c_ruido(x, y, 3, 737) > 0.6 ? hex('#1a2440') : hex('#141c36')); }
    for (let i = 0; i < 16; i++) { const x = Math.floor(h(i, 1, 741) * 330) - 5, w = 3 + Math.floor(h(i, 2, 741) * 5); c_tronco(R, x, x + w, 10, 146, LEJ, 40 + i, false); }
    // las copas: la masa de hojas que cierra el cielo (más cerrada arriba a la derecha) con los bordes que asoman
    for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) { const n = c_ruido(x, y, 14, 742) + c_ruido(x, y, 5, 743) * 0.35, lim = 0.45 + (y / 60) * 0.75 - (x > 240 ? 0.5 : 0) - (x < 40 ? 0.3 : 0);
      if (n > lim) continue; const q = c_ruido(x, y, 3, 744); pset(x, y, q > 0.7 ? hex('#1e3230') : q > 0.45 ? hex('#121e22') : hex('#080e14')); if (q > 0.82 && h(x, y, 736) < 0.3) pset(x, y, hex('#2e4a40')); }
    // el rayo de luna que baja hasta el sendero
    for (let y = 18; y < 156; y++) { const xa = 150 - (y - 18) * 0.32, xb = 186 - (y - 18) * 0.18; for (let x = Math.round(xa); x <= xb; x++) { const a = 0.22 * (1 - Math.abs((x - (xa + xb) / 2) / ((xb - xa) / 2))); if (c_umb(x, y) < a * 1.8) pset(x, y, c_mez(R.pget(x, y), hex('#a8b8e8'), 0.35)); } }
    // el suelo de hojarasca y el sendero claro que serpentea
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const cx = 160 + Math.sin(y * 0.12) * 18, w = 10 + (y - 146) * 1.4, sen = Math.abs(x - cx) < w, q = h(x, y, 745), r = c_ruido(x, y, 5, 746);
      let c = sen ? (r > 0.6 ? hex('#4a4a42') : hex('#3a3a36')) : (r > 0.6 ? hex('#22261e') : hex('#181c16')); if (q < 0.1) c = sen ? hex('#5a5848') : hex('#2e2a1e'); else if (q > 0.96) c = hex('#5a3a22'); if (!sen && q > 0.93 && q <= 0.96) c = hex('#3a4a2a');
      if (Math.abs(x - 140 + (y - 146) * 0.4) < 14 && y < 158 && c_umb(x, y) < 0.3) c = c_mez(c, hex('#a8b8e8'), 0.3); pset(x, y, c); }
    for (let i = 0; i < 18; i++) { const x = Math.floor(h(i, 1, 747) * 320), y = 150 + Math.floor(h(i, 2, 747) * 28); R.disco(x, y, 1 + (i % 2), hex('#2e2e34')); pset(x - 1, y - 1, hex('#6a6a7a')); }
    return {};
  });
  const troncos = c_capa(R, 'ext_bosque_tr', () => {
    for (const [x, w, k] of [[60, 14, 1], [112, 10, 2], [206, 16, 3], [250, 12, 4]]) c_tronco(R, x, x + w, 0, 150, COLS, k);
    c_tronco(R, -6, 30, 0, 172, [hex('#08070e'), hex('#120f1a'), hex('#1a1624'), hex('#3a3a5e')], 5);
    c_tronco(R, 290, 326, 0, 170, [hex('#08070e'), hex('#120f1a'), hex('#1a1624'), hex('#24243a')], 6);
    // ramas que cruzan arriba
    for (const [a, b, c, d] of [[30, 40, 66, 26], [74, 30, 112, 14], [220, 34, 186, 18], [262, 28, 292, 46]]) { linea(a, b, c, d, hex('#120f1a')); linea(a, b + 1, c, d + 1, hex('#1c1828')); linea(a, b - 1, c, d - 1, hex('#3a3a5e')); }
    // una raíz que cruza el sendero
    for (let x = 96; x < 200; x++) { const y = 160 + Math.round(Math.sin(x * 0.07) * 2 + (x - 96) * 0.05); pset(x, y, hex('#1c1828')); pset(x, y - 1, hex('#3a3448')); pset(x, y + 1, hex('#0e0c14')); }
    return {};
  });
  R.copiar(fondo.b);
  // ojos en lo oscuro entre los troncos
  for (const [x, y, k] of [[84, 118, 0], [180, 104, 1], [236, 126, 2], [44, 96, 3], [272, 110, 4]]) c_ojos(R, x, y, t, k, k === 2 ? hex('#e84a3a') : hex('#e8d040'));
  // los centauros que salen de entre los troncos (por detrás de los de en medio)
  if (nc > 0) for (const [x0, x1, k, d] of [[70, 92, 0, 1], [262, 236, 1, -1], [200, 184, 2, -1]]) { const u = Math.max(0, Math.min(1, nc * 1.5 - k * 0.2)); if (u > 0) c_centauro(R, lerp(x0, x1, u), 147, t, d, 1.25); }
  c_pegar(R, troncos, 0, 179);
  c_niebla(R, t, 118, 168, hex('#6a7aa8'), 0.42);
  c_luciernagas(R, t, 12, 40, 70, 290, 150);
  // motas de polvo en el rayo de luna
  for (let i = 0; i < 10; i++) { const y = 30 + ((h(i, 1, 748) * 120 + t * 4) % 120), x = 150 - (y - 18) * 0.25 + h(i, 2, 748) * 22 + Math.sin(t + i) * 2; pset(Math.round(x), Math.round(y), hex('#c8d4f8')); }
  c_lechuza(R, 360 - ((t * 11) % 400), 42 + Math.sin(t * 1.4) * 3, t, -1, false);
  return { suelo: 166, sendero: [140, 180], rayo: [120, 186], troncos: [[60, 74], [112, 122], [206, 222], [250, 262]], centauros: [[92, 146], [236, 146], [184, 146]], libre: [40, 286] };
}

// el claro del bosque con luz de luna
function c_claro(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, LX = 176, LY = 24;
  const fondo = c_capa(R, 'ext_claro', () => {
    c_degradado(R, 0, 0, 319, 140, [hex('#0a0e22'), hex('#121a3e'), hex('#1e2a58'), hex('#26345e')]);
    for (let i = 0; i < 24; i++) { const x = Math.floor(h(i, 1, 749) * 330) - 5, w = 2 + Math.floor(h(i, 2, 749) * 3); c_tronco(R, x, x + w, 30, 136, [hex('#26325e'), hex('#2a3866'), hex('#30406e'), hex('#3e4e80')], 90 + i, false); }
    for (let x = 0; x < 320; x++) { const a = 112 + Math.round(c_ruido(x, 0, 8, 758) * 16 - Math.abs(Math.sin(x * 0.17)) * 5); for (let y = a; y < 140; y++) pset(x, y, y === a ? hex('#2e4a4a') : c_ruido(x, y, 3, 759) > 0.6 ? hex('#18283a') : hex('#121e30')); }
    // el agujero de las copas: el cielo con estrellas
    for (let y = 0; y < 52; y++) for (let x = 80; x < 250; x++) { const d = ((x - 166) / 78) ** 2 + ((y + 4) / 50) ** 2 + (c_ruido(x, y, 7, 750) - 0.5) * 0.5; if (d < 1) pset(x, y, y < 18 ? hex('#121a46') : y < 34 ? hex('#18225a') : hex('#1e2a66')); }
    for (let i = 0; i < 70; i++) { const x = 90 + Math.floor(h(i, 1, 751) * 150), y = Math.floor(h(i, 2, 751) * 40); if (R.pget(x, y) !== hex('#0a0e22')) pset(x, y, i % 6 ? hex('#8a9ad0') : hex('#ffffff')); }
    for (let i = 0; i < 14; i++) { const x = Math.floor(h(i, 1, 752) * 320), w = 4 + Math.floor(h(i, 2, 752) * 5); c_tronco(R, x, x + w, 30, 140, [hex('#141c3a'), hex('#1a2448'), hex('#202c54'), hex('#34427a')], 60 + i, false); }
    // la pradera del claro: el charco de luz, la hierba más oscura alrededor
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const d = ((x - 160) / 104) ** 2 + ((y - 158) / 20) ** 2, q = h(x, y, 753), r = c_ruido(x, y, 4, 754);
      let c = d < 0.55 ? (r > 0.55 ? hex('#5a7a6a') : hex('#4a6a5a')) : d < 1 ? (r > 0.5 ? hex('#344a42') : hex('#2a3e36')) : (r > 0.6 ? hex('#1a2622') : hex('#121c18'));
      if (d < 1 && c_umb(x, y) < 1 - d && d > 0.55) c = hex('#4a6a5a'); if (q < 0.08) c = c_mez(c, hex('#000000'), 0.3); else if (q > 0.97) c = hex('#8aa898'); pset(x, y, c); }
    // la piedra con musgo y el tronco caído
    disco(122, 150, 7, hex('#2a2c3a')); disco(120, 148, 5, hex('#3e4252')); linea(116, 144, 124, 143, hex('#7a8098')); disco(125, 145, 3, hex('#3a6a3a'));
    for (let x = 30; x <= 108; x++) { const y = 146 + Math.round((x - 30) * 0.06); for (let j = -5; j <= 5; j++) { const q = c_ruido(x * 2, j, 3, 755); pset(x, y + j, j < -3 ? (q > 0.4 ? hex('#4a7a3a') : hex('#3a6a32')) : j < -1 ? hex('#5a4a3a') : j > 3 ? hex('#1a140e') : q > 0.6 ? hex('#4a3a2a') : hex('#3a2c20')); } }
    disco(30, 146, 5, hex('#5a4a36')); disco(30, 146, 3, hex('#7a6448')); R.anillo(30.5, 146.5, 2, hex('#4a3a28'));
    for (const [x, y] of [[50, 140], [76, 141], [96, 143]]) { linea(x, y, x - 2, y - 4, hex('#2a5a2a')); pset(x - 3, y - 5, hex('#5a9a4a')); }
    return {};
  });
  const troncos = c_capa(R, 'ext_claro_tr', () => {
    for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const d = ((x - 166) / 78) ** 2 + ((y + 4) / 50) ** 2 + (c_ruido(x, y, 7, 750) - 0.5) * 0.5; if (d < 1.08 || y > 30 + c_ruido(x, 0, 9, 756) * 40) continue;
      const q = c_ruido(x, y, 3, 757); pset(x, y, d < 1.25 ? (q > 0.5 ? hex('#2a3e3a') : hex('#1a2a2a')) : q > 0.7 ? hex('#16222a') : hex('#0a1016')); }
    c_tronco(R, 8, 44, 0, 150, [hex('#0c0a14'), hex('#16121e'), hex('#201a2a'), hex('#3a3a5e')], 7);
    c_tronco(R, 262, 296, 20, 152, [hex('#0c0a14'), hex('#16121e'), hex('#201a2a'), hex('#3a3a5e')], 8);
    c_tronco(R, 246, 258, 30, 140, [hex('#100e1a'), hex('#1c1828'), hex('#262236'), hex('#4a4a72')], 9);
    linea(44, 60, 92, 40, hex('#16121e')); linea(44, 61, 92, 41, hex('#201a2a')); linea(44, 59, 92, 39, hex('#3a3a5e'));
    return {};
  });
  R.copiar(fondo.b);
  c_titilan(R, t, 40, 9, 6);
  R.recorte([84, 0, 248, 50]); c_luna(R, LX, LY, 8, 2.4); c_nubes(R, t, [[40, 34, 40, 3], [200, 14, 30, 5]], c_NUBE_NOCHE); R.recorte(null);
  c_pegar(R, troncos, 0, 152);
  // el haz de luna que cae en el claro
  for (let y = 40; y < 162; y++) { const xa = 140 + (y - 40) * -0.1, xb = 196 + (y - 40) * 0.2; for (let x = Math.round(xa); x <= xb; x++) if (c_umb(x, y) < 0.16 && ((x + y) & 1)) pset(x, y, c_mez(R.pget(x, y), hex('#c8d4f8'), 0.3)); }
  // el corro de setas que brilla (late despacio)
  { const b = 0.5 + Math.sin(t * 1.6) * 0.5; for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(226 + Math.cos(a) * 16), y = Math.round(162 + Math.sin(a) * 4);
      if (b > 0.3) c_resplandor(R, x, y - 2, 4, hex('#8af0c8'), 0.3 * b); rect(x, y - 2, x, y, hex('#d8d0c0')); rect(x - 2, y - 4, x + 2, y - 3, k % 2 ? hex('#c83a3a') : hex('#e85a4a')); pset(x - 1, y - 4, hex('#ffffff')); pset(x + 1, y - 3, hex('#f8e8e0')); } }
  c_ojos(R, 56, 108, t, 1); c_ojos(R, 232, 112, t, 2, hex('#e84a3a')); c_ojos(R, 300, 168, t, 3);
  c_niebla(R, t, 136, 172, hex('#8a9ac8'), 0.38, 1);
  c_luciernagas(R, t, 14, 50, 90, 270, 160, 1);
  for (let k = 0; k < 3; k++) pset(Math.round(168 + Math.cos(t * 2.5 + k * 2) * 12), Math.round(96 + Math.sin(t * 3.1 + k) * 18), hex('#e8e0d0'));   // polillas en el haz
  // la lechuza en la rama: parpadea
  { const x = 70, y = 46, ojo = (t % 4.1) < 0.15; rect(x - 2, y - 4, x + 2, y + 2, hex('#8a6a4a')); rect(x - 2, y - 7, x + 2, y - 4, hex('#9a7a5a')); pset(x - 2, y - 8, hex('#6a4a30')); pset(x + 2, y - 8, hex('#6a4a30')); if (!ojo) { pset(x - 1, y - 6, hex('#ffd040')); pset(x + 1, y - 6, hex('#ffd040')); } pset(x, y - 5, hex('#e8a830')); }
  return { suelo: 164, luna: [LX, LY, 8], tronco: [30, 140, 108, 152], piedra: [122, 150], setas: [226, 162], luz: [56, 264], libre: [56, 264] };
}

// los colores de las cuatro casas para las lonas (tono, sombra, el color de las rayas)
const c_CASAS = [[hex('#b8282e'), hex('#7a1820'), hex('#e8b830')], [hex('#22784a'), hex('#144a2e'), hex('#c8ccd4')], [hex('#e8b830'), hex('#a87a18'), hex('#2a2a2a')], [hex('#2a4aa8'), hex('#1a2e6a'), hex('#b88a4a')]];

// el cielo de día tramado (cols de arriba abajo, hasta y1) con nubes de tres tonos a tres velocidades
function c_cieloDia(R, t, y1, nubes) {
  c_degradado(R, 0, 0, 319, y1, [hex('#3a78d0'), hex('#4a8ad8'), hex('#64a2e4'), hex('#8cc0ee'), hex('#b8daf4')]);
  c_nubes(R, t, nubes, c_NUBE_DIA);
}

// una bandada de pájaros que cruza (n, a la altura y, cada tantos segundos, a velocidad v)
function c_pajaros(R, t, n, y, v = 22, k = 0) {
  for (let i = 0; i < n; i++) { const x = ((t * v + h(i, 1, 760 + k) * 60 + k * 90) % 420) - 50 - i * 9, yy = Math.round(y + i * 3 * (i % 2 ? 1 : -0.5) + Math.sin(t * 2 + i) * 1.5), a = Math.sin(t * 10 + i * 2) > 0 ? -1 : 0;
    if (x >= 270 && yy <= 48) continue; R.pset(Math.round(x), yy, hex('#2a2a3a')); R.pset(Math.round(x) - 1, yy + a, hex('#2a2a3a')); R.pset(Math.round(x) + 1, yy + a, hex('#2a2a3a')); R.pset(Math.round(x) - 2, yy + a + (a ? 0 : -1), hex('#4a4a5a')); R.pset(Math.round(x) + 2, yy + a + (a ? 0 : -1), hex('#4a4a5a')); }
}

// un banderín triangular que ondea (x, y: la punta del mástil; L largo; dir hacia dónde)
function c_banderin(R, x, y, L, c, cS, t, k = 0, dir = 1) {
  for (let i = 0; i <= L; i++) { const o = Math.round(Math.sin(t * 6 - i * 0.6 + k) * (i / L) * 1.6), a = Math.round((1 - i / L) * 2); for (let j = -a; j <= a; j++) R.pset(x + i * dir, y + 2 + j + o, j === a ? cS : c); }
}

// una torre de gradas del campo (x: centro, top: el vértice del tejado; casa 0–3): el andamio, la tribuna con el público, la
// lona a rayas del tejado y su faldón, la colgadura y el banderín; el público (o la lona) se mueve con t
function c_torreGradas(R, x, top, casa, t, k) {
  const { rect, pset, poligono, linea } = R, [c, cS, cR] = c_CASAS[casa], w = 14, eave = top + 16, caja = eave + 2, base = 112;
  // el andamio
  for (const px of [x - w + 2, x + w - 3]) { rect(px, caja + 20, px + 1, base, hex('#6a4a2a')); pset(px, caja + 20, hex('#9a7048')); }
  for (let y = caja + 22; y < base - 4; y += 10) { linea(x - w + 3, y, x + w - 3, y + 9, hex('#5a3c22')); linea(x + w - 3, y, x - w + 3, y + 9, hex('#4a3018')); }
  // la tribuna: el fondo en sombra, dos filas de público y el antepecho con la colgadura a rayas
  rect(x - w, caja, x + w, caja + 20, hex('#3a2a20'));
  for (let f = 0; f < 2; f++) for (let i = 0; i < 6; i++) { const px = x - w + 3 + i * 5 + f * 2, py = caja + 5 + f * 6, sb = Math.sin(t * 5 + i * 1.7 + k + f) > 0.6 ? -1 : 0, piel = [hex('#f0c8a0'), hex('#c8906a'), hex('#8a5a3a'), hex('#f6d8b8')][(i + f + k) % 4];
    rect(px, py + 2 + sb, px + 2, py + 5, h(i, f, 761 + k) < 0.6 ? c : hex('#2a2a3a')); rect(px, py + sb, px + 2, py + 1 + sb, piel); pset(px + 1, py - 1 + sb, [hex('#3a2a1a'), hex('#c89a4a'), hex('#1a1a1a'), hex('#a83a1a')][(i + k) % 4]);
    if (sb && i % 2) pset(px + 3, py - 2, piel); }
  for (let xx = x - w; xx <= x + w; xx++) for (let y = caja + 14; y <= caja + 20; y++) pset(xx, y, Math.floor((xx - x + 40) / 3) % 2 ? c : cR);
  rect(x - w, caja + 13, x + w, caja + 13, hex('#2a1a12'));
  // el tejado de lona a rayas (gajos), el faldón festoneado y el banderín
  poligono([[x - w - 2, eave], [x + w + 3, eave], [x + 0.5, top]], (xx, yy) => { const g = Math.floor((xx - x) / Math.max(1, (yy - top)) * 4 + 8); return g % 2 ? (xx > x + 2 ? cS : c) : (xx > x + 2 ? c_mez(cR, hex('#000000'), 0.25) : cR); });
  for (let xx = x - w - 2; xx <= x + w + 2; xx++) { const fe = (xx - x + 40) % 4 < 2 ? 2 : 1; rect(xx, eave, xx, eave + fe, Math.floor((xx - x + 40) / 4) % 2 ? c : cR); }
  linea(x, top, x, top - 5, hex('#5a4a3a')); c_banderin(R, x, top - 6, 6, c, cS, t, k);
  // la colgadura larga que cuelga bajo la tribuna y se mece
  for (let j = 0; j < 14; j++) { const o = Math.round(Math.sin(t * 2 + j * 0.3 + k) * j * 0.08); rect(x - 3 + o, caja + 21 + j, x + 3 + o, caja + 21 + j, j % 4 === 3 ? cR : c); }
  pset(x + Math.round(Math.sin(t * 2 + 4.2 + k) * 1.1), caja + 35, cS);
}

// los tres aros dorados de una portería (xs, ys: centros de los aros; base: el pie de los postes)
function c_aros(R, xs, ys, base, r = 7) {
  for (let i = 0; i < xs.length; i++) { const x = xs[i], y = ys[i];
    R.rect(x, y + r, x + 1, base, hex('#a87a18')); R.pset(x, y + r + 1, hex('#f0d060')); R.rect(x - 1, base - 1, x + 2, base, hex('#6a4a12'));
    for (let a = 0; a < 64; a++) { const an = a / 64 * Math.PI * 2, px = Math.round(x + 0.5 + Math.cos(an) * r), py = Math.round(y + Math.sin(an) * r * 1.05); R.pset(px, py, Math.cos(an - 2.3) > 0.4 ? hex('#fff0a0') : Math.cos(an - 2.3) < -0.4 ? hex('#a87a18') : hex('#e8b830')); R.pset(px + (Math.cos(an) > 0 ? -1 : 1), py, hex('#c8961e')); } }
}

// un jugador lejano en escoba (x, y; c color de la túnica; dir)
function c_jugador(R, x, y, c, dir, t, k = 0) { x = Math.round(x); y = Math.round(y); R.linea(x - 4 * dir, y + 1, x + 4 * dir, y, hex('#6a4a2a')); R.pset(x - 5 * dir, y + 1, hex('#c8a060')); R.pset(x - 5 * dir, y + 2, hex('#c8a060')); R.rect(x - 1, y - 3, x + 1, y, c); R.pset(x - 2 * dir, y - 2 + (Math.sin(t * 9 + k) > 0 ? 1 : 0), c); R.pset(x, y - 4, hex('#f0c8a0')); R.pset(x, y - 5, hex('#3a2a1a')); }

// el campo de quidditch de día
function c_quidditch(R, t, o) {
  const { rect, pset, linea, poligono } = R, TOR = [[76, 40, 0], [110, 44, 2], [144, 38, 3], [178, 42, 1], [212, 40, 0], [246, 46, 3]];
  const fondo = c_capa(R, 'ext_quid', () => {
    // los montes con bruma, el bosque y el castillo lejos sobre su colina
    for (let x = 0; x < 320; x++) { const a = Math.round(c_cordillera(x, 92, [[20, 34], [90, 26], [160, 40], [236, 30], [300, 24]], 0.5)); for (let y = a; y < 100; y++) { const r = c_ruido(x, y, 5, 762); pset(x, y, y < a + 3 + r * 3 && a < 66 ? hex('#e8eef8') : r > 0.6 ? hex('#8aa0c0') : hex('#7a94b8')); } }
    for (let x = 0; x < 320; x++) { const a = 86 + Math.round(c_ruido(x, 0, 6, 763) * 6 - Math.abs(Math.sin(x * 0.3)) * 3); for (let y = a; y < 104; y++) pset(x, y, y === a ? hex('#6a9a6a') : c_ruido(x, y, 3, 764) > 0.55 ? hex('#3a6a4a') : hex('#2e5a3e')); }
    poligono([[0, 92], [20, 80], [44, 76], [70, 84], [90, 96], [0, 96]], hex('#5a8a5a')); c_castilloLejos(R, 40, 80, 0.36, true);
    // el césped a franjas de siega en perspectiva, con matas y la línea de cal del círculo central
    for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { const g = Math.floor((x - 160) / (y - 60) * 3) & 1, q = h(x, y, 765);
      let c = g ? hex('#5aa83a') : hex('#4c9632'); if (q < 0.05) c = hex('#3a7a28'); else if (q > 0.96) c = hex('#8ad05a'); if (y < 112) c = c_mez(c, hex('#8ab0a0'), 0.3);
      const e = ((x - 160) / 46) ** 2 + ((y - 132) / 9) ** 2; if (Math.abs(e - 1) < 0.07 || (y === 132 && Math.abs(x - 160) < 3)) c = hex('#d8ecc8'); pset(x, y, c); }
    for (let x = 0; x < 320; x++) { pset(x, 116, hex('#e0eed0')); }
    // la valla de tablas que rodea el campo, con paneles de los cuatro colores (sin letras) y su sombra en el césped
    for (let x = 0; x < 320; x++) { const pn = Math.floor(x / 20), [c, cS] = c_CASAS[pn % 4]; for (let y = 106; y <= 113; y++) pset(x, y, x % 20 === 0 ? hex('#4a3018') : y === 106 ? hex('#e8d8b0') : y === 113 ? cS : (y === 109 && x % 20 > 3 && x % 20 < 17) ? c_mez(c, hex('#ffffff'), 0.35) : c); pset(x, 114, hex('#2e6a22')); pset(x, 115, (x & 1) ? hex('#3a7a28') : hex('#4c9632')); }
    // el banco de los jugadores con las escobas apoyadas y el cubo de agua
    rect(250, 150, 300, 152, hex('#8a5a2a')); rect(250, 150, 300, 150, hex('#c8904a')); for (const lx of [252, 297]) rect(lx, 153, lx + 1, 160, hex('#5a3418'));
    for (const bx of [258, 266, 274, 284]) { linea(bx, 160, bx + 6, 136, hex('#6a4a2a')); linea(bx + 1, 160, bx + 7, 136, hex('#9a7048')); for (let i = 0; i < 4; i++) linea(bx + 6, 136, bx + 5 + i, 130, hex('#c8a060')); }
    rect(304, 154, 312, 162, hex('#6a6a7a')); rect(304, 154, 312, 154, hex('#a8a8b8')); rect(305, 155, 311, 156, hex('#5a8ac8'));
    // el baúl de las pelotas, con sus correas
    rect(54, 160, 76, 170, hex('#5a3418')); rect(54, 160, 76, 161, hex('#8a5a2a')); rect(54, 170, 76, 171, hex('#2a160c')); for (const sx of [58, 71]) rect(sx, 160, sx + 1, 170, hex('#2a1a12')); rect(63, 163, 67, 166, hex('#c8a040')); pset(65, 164, hex('#3a2a12'));
    for (let x = 52; x <= 78; x++) pset(x, 172, hex('#3a7a28'));
    return {};
  });
  R.copiar(fondo.b);
  c_cieloDia(R, t, 92, [[30, 40, 50, 2], [200, 34, 64, 3.2], [120, 52, 40, 5], [300, 18, 30, 6.4]]);
  c_pegar(R, fondo, 52, 104);
  c_pajaros(R, t, 5, 30, 18);
  for (const [x, top, casa] of TOR) c_torreGradas(R, x, top, casa, t, x);
  c_aros(R, [24, 40, 56], [66, 56, 70], 114); c_aros(R, [264, 280, 296], [70, 60, 74], 114);
  // la sombra de las nubes que pasa por el césped
  for (const [x0, w] of [[0, 70], [190, 50]]) { const cx = ((x0 + t * 3.2) % 460) - 70; for (let y = 120; y < 180; y += 1) for (let x = Math.round(cx - w); x <= cx + w; x++) if (((x - cx) / w) ** 2 + ((y - 150) / 22) ** 2 < 1 && ((x + y) & 1)) pset(x, y, c_mez(R.pget(x, y), hex('#1a3a1a'), 0.3)); }
  // los jugadores lejanos que cruzan en escoba y la bludger que persigue a uno
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = 20 + k * 6, x = d > 0 ? ((t * v + k * 70) % 380) - 30 : 350 - ((t * v + k * 50) % 380), y = 74 + k * 7 + Math.sin(t * 1.5 + k) * 5; c_jugador(R, x, y, k % 2 ? hex('#22784a') : hex('#b8282e'), d, t, k);
    if (k === 2) { R.disco(Math.round(x - 10 * d), Math.round(y - 2 + Math.sin(t * 4) * 2), 1.5, hex('#2a2a2a')); } }
  // la hierba que mueve el viento delante
  for (let x = 0; x < 320; x += 3) { const s = Math.round(Math.sin(t * 2.2 + x * 0.08)), y = 176 + (x % 2); pset(x + s, y - 3, hex('#8ad05a')); pset(x, y - 2, hex('#5aa83a')); }
  return { suelo: 166, horizonte: 112, aros: [[24, 66], [40, 56], [56, 70], [264, 70], [280, 60], [296, 74]], gradas: TOR.map(([x, top]) => [x, top]), baul: [54, 160, 76, 171], centro: [160, 132], libre: [84, 250] };
}

// una torre de gradas de cerca, con su público
function c_gradas(R, t, o) {
  const { rect, pset, linea, poligono } = R, [c, cS, cR] = c_CASAS[0], X0 = 34, X1 = 252;
  const fondo = c_capa(R, 'ext_gradas', () => {
    // la torre vecina (verde) detrás, a la derecha, y la grada lejana a la izquierda
    for (let y = 60; y < 152; y++) for (let x = 262; x < 320; x++) pset(x, y, y < 70 ? (Math.floor(x / 4) % 2 ? hex('#22784a') : hex('#c8ccd4')) : y < 100 ? hex('#2a3a30') : ((x - 262) % 14 < 2 ? hex('#5a3c22') : hex('#8ab0d8')));
    for (let x = 262; x < 320; x++) { const fe = x % 4 < 2 ? 2 : 1; rect(x, 70, x, 70 + fe, Math.floor(x / 4) % 2 ? hex('#22784a') : hex('#c8ccd4')); }
    for (let y = 74; y < 98; y += 6) for (let x = 264; x < 318; x += 4) { rect(x, y + 1, x + 2, y + 4, h(x, y, 770) < 0.6 ? hex('#22784a') : hex('#c8ccd4')); rect(x, y - 1, x + 2, y, [hex('#f0c8a0'), hex('#c8906a'), hex('#8a5a3a')][x % 3]); }
    for (let y = 100; y < 152; y += 12) { linea(264, y, 318, y + 11, hex('#5a3c22')); linea(318, y, 264, y + 11, hex('#4a3018')); }
    // el andamio de madera bajo la tribuna: postes, riostras en cruz y la escalera
    rect(X0, 120, X1, 152, hex('#9ac0e0'));
    for (let x = X0; x <= X1; x += 36) { rect(x, 116, x + 3, 152, hex('#6a4a2a')); rect(x, 116, x, 152, hex('#a87a48')); rect(x + 3, 116, x + 3, 152, hex('#3a2414')); }
    for (let x = X0; x < X1; x += 36) for (const [a, b] of [[0, 1], [1, 0]]) { linea(x + 3, a ? 120 : 150, x + 36, b ? 120 : 150, hex('#5a3c22')); linea(x + 3, (a ? 120 : 150) + 1, x + 36, (b ? 120 : 150) + 1, hex('#3a2414')); }
    for (let y = 118; y < 152; y += 4) rect(224, y, 236, y, hex('#8a5a2a')); rect(223, 116, 224, 152, hex('#6a4a2a')); rect(236, 116, 237, 152, hex('#6a4a2a'));
    // el césped
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 771), g = Math.floor((x + y * 0.4) / 18) & 1; pset(x, y, q < 0.06 ? hex('#3a7a28') : q > 0.96 ? hex('#8ad05a') : g ? hex('#5aa83a') : hex('#4c9632')); }
    for (let x = X0; x <= X1; x++) pset(x, 152, hex('#2e5e22'));
    return {};
  });
  R.copiar(fondo.b);
  // el cielo y las nubes solo donde no hay torre
  R.recorte([0, 0, 319, 59]); c_cieloDia(R, t, 59, [[20, 30, 46, 2.4], [160, 46, 56, 3.6], [240, 24, 30, 5.6]]); c_pajaros(R, t, 4, 40, 20, 3); R.recorte(null);
  c_degradado(R, 0, 60, 33, 151, [hex('#b8daf4'), hex('#c8e2f6')]);
  R.recorte([0, 0, 33, 151]); c_aros(R, [16], [84], 152, 6); R.recorte(null);
  // la tribuna: el fondo, tres gradas de bancos con el público que se mueve
  rect(X0, 46, X1, 116, hex('#3a2820'));
  for (let y = 50; y < 116; y += 4) rect(X0 + 1, y, X1 - 1, y, hex('#2e2018'));
  for (let f = 0; f < 3; f++) { const yb = 62 + f * 18;
    for (let i = 0; i < 21; i++) { const x = X0 + 6 + i * 10 + (f % 2) * 4, sb = Math.round(Math.max(0, Math.sin(t * 4 + i * 1.3 + f * 2)) * 1.5), piel = [hex('#f0c8a0'), hex('#c8906a'), hex('#8a5a3a'), hex('#f6d8b8'), hex('#e0b090')][(i * 3 + f) % 5], pelo = [hex('#3a2a1a'), hex('#c89a4a'), hex('#1a1a1a'), hex('#a83a1a'), hex('#6a4a2a')][(i + f * 2) % 5];
      if (x > X1 - 4) continue; const y = yb - 11 - sb, ropa = h(i, f, 772) < 0.5 ? c : h(i, f, 773) < 0.5 ? hex('#3a3a4a') : hex('#7a6a5a');
      rect(x - 2, y + 4, x + 2, yb - 1, ropa); rect(x - 2, y + 4, x + 2, y + 5, (i + f) % 2 ? cR : c);   // la bufanda
      rect(x - 2, y, x + 2, y + 3, piel); rect(x - 2, y - 1, x + 2, y, pelo); pset(x - 1, y + 1, hex('#1a1a1a')); pset(x + 1, y + 1, hex('#1a1a1a'));
      const brazo = Math.sin(t * 6 + i * 2.1 + f) > 0.55; if (brazo) { linea(x + 3, y + 5, x + 4, y - 2, ropa); pset(x + 4, y - 3, piel); if (i % 3 === 0) { rect(x + 5, y - 6, x + 9, y - 3, (i + f) % 2 ? c : cR); pset(x + 4, y - 6, hex('#5a4a3a')); } }
      else if (i % 4 === 1) { pset(x + Math.round(Math.sin(t * 14 + i)), y + 6, piel); } }
    rect(X0, yb, X1, yb + 2, hex('#a8743c')); rect(X0, yb, X1, yb, hex('#d8a868')); rect(X0, yb + 3, X1, yb + 3, hex('#4a2a14')); for (let x = X0 + 4; x < X1; x += 20) pset(x, yb + 1, hex('#5a3418')); }
  // el antepecho con la colgadura a rayas y los banderines que cuelgan
  for (let x = X0; x <= X1; x++) for (let y = 104; y <= 116; y++) { const o2 = Math.round(Math.sin(t * 1.5 + x * 0.05) * (y - 104) * 0.04); pset(x + o2, y, Math.floor((x - X0) / 6) % 2 ? c : cR); }
  rect(X0, 103, X1, 103, hex('#e8d0a0')); for (let x = X0; x <= X1; x++) { const fe = (x - X0) % 6 < 3 ? 2 : 1; pset(x, 116 + fe, Math.floor((x - X0) / 6) % 2 ? cS : cR); }
  // los postes, el tejado de lona a rayas con su faldón festoneado y los banderines del tejado
  for (const px of [X0 - 2, X1 - 1, 142]) { rect(px, 40, px + 2, 116, hex('#6a4a2a')); rect(px, 40, px, 116, hex('#a87a48')); }
  for (let y = 30; y <= 44; y++) { const a = X0 - 8 + (44 - y) * 0.6, b = X1 + 8 - (44 - y) * 0.6; for (let x = Math.round(a); x <= b; x++) { const g = Math.floor((x - 143) / (8 + (y - 30) * 0.4)); pset(x, y, y === 30 ? hex('#5a1018') : (g & 1) ? (x > 200 ? cS : c) : c_mez(cR, hex('#000000'), y < 36 ? 0.25 : 0)); } }
  for (let x = X0 - 8; x <= X1 + 8; x++) { const fe = Math.round(2 + Math.sin((x - X0) * 0.5) * 1.5 + Math.sin(t * 3 + x * 0.1) * 0.6); for (let j = 0; j <= fe; j++) pset(x, 45 + j, Math.floor((x - X0) / 8) % 2 ? c : cR); }
  for (const [bx, k] of [[190, 1], [236, 2]]) { linea(bx, 30, bx, 22, hex('#5a4a3a')); c_banderin(R, bx, 21, 8, k === 1 ? cR : c, cS, t, k); }
  return { suelo: 168, gradas: [62, 80, 98], tribuna: [X0, 46, X1, 116], escalera: [223, 116, 237, 152], barandilla: [0, 159, 319, 179], libre: [40, 260] };
}

// el humo de una chimenea (x, y: la boca) que sube y se va a la izquierda en bocanadas que crecen y se aclaran
function c_humo(R, x, y, t, n = 8, k = 0) {
  for (let i = 0; i < n; i++) { const u = ((t * 0.32 + i / n + k) % 1), px = x - u * 46 + Math.sin(t * 1.4 + i * 2) * 3 * u, py = y - u * 40, r = 2 + u * 6;
    R.disco(px, py + 1, r, c_mez(hex('#4a4a68'), hex('#2a2a48'), u)); R.disco(px - 0.5, py, r * 0.8, c_mez(hex('#9a9ab4'), hex('#4e4e70'), u)); if (u < 0.6) R.disco(px - r * 0.3, py - r * 0.3, r * 0.4, hex('#c0c0d4')); }
}

// una calabaza con nieve encima (x, y: el pie; r radio)
function c_calabaza(R, x, y, r) {
  const { disco, pset, linea, rect } = R; disco(x, y - r, r, hex('#a8501a')); disco(x - 0.5, y - r - 0.5, r * 0.9, hex('#e07a24'));
  for (const d of [-0.5, 0, 0.5]) linea(x + d * r, y - r * 1.8, x + d * r * 1.2, y - 1, hex('#b85a1a')); disco(x - r * 0.4, y - r * 1.3, r * 0.25, hex('#f8a850'));
  rect(x - 1, y - 2 * r - 2, x, y - 2 * r, hex('#4a5a22')); for (let i = -r + 1; i < r - 1; i++) pset(x + i, Math.round(y - 2 * r + Math.abs(i) * 0.4 + 1), hex('#eef4fa')); pset(x, y - 2 * r - 3, hex('#eef4fa'));
}

// el perrazo negro de Hagrid tumbado: respira y mueve el rabo (x: el centro, y: el suelo; dir hacia dónde mira)
function c_perro(R, x, y, t, dir = 1) {
  const { disco, rect, pset, linea } = R, n = hex('#1a1a20'), nL = hex('#3a3a4a'), res = Math.sin(t * 2.2) > 0 ? 1 : 0, rabo = Math.round(Math.sin(t * 7) * 2);
  disco(x, y - 4, 5 + res * 0.4, n); disco(x - 5 * dir, y - 3, 4, n); disco(x + 7 * dir, y - 6, 3.5, n); rect(Math.min(x + 8 * dir, x + 12 * dir), y - 6, Math.max(x + 8 * dir, x + 12 * dir), y - 3, n);
  linea(x + 3 * dir, y - 1, x + 13 * dir, y - 1, n); pset(x + 13 * dir, y - 5, hex('#6a4a4a')); pset(x + 8 * dir, y - 7, (t % 4) < 0.2 ? n : hex('#e8c040')); pset(x + 6 * dir, y - 9, nL); pset(x + 5 * dir, y - 8, n);
  linea(x - 9 * dir, y - 3, x - 13 * dir, y - 6 + rabo, n); linea(x - 2, y - 8, x + 3, y - 9, nL); pset(x + 12 * dir, y - 2, hex('#e8a0a0'));
  if (Math.sin(t * 2.2) > 0.9) pset(x + 14 * dir, y - 4, hex('#c8d4ea'));   // el vaho del aliento
}

// la cabaña de Hagrid nevando al anochecer
function c_cabana(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, CX = 170;
  const fondo = c_capa(R, 'ext_cabana', () => {
    c_degradado(R, 0, 0, 319, 110, [hex('#141a46'), hex('#242a5e'), hex('#3e3a78'), hex('#6a5a98'), hex('#a07aa8')]);
    for (let i = 0; i < 90; i++) { const x = Math.floor(h(i, 1, 780) * 320), y = Math.floor(h(i, 2, 780) * 50); if (x > 272 && y < 48) continue; pset(x, y, i % 6 ? hex('#8a90c8') : hex('#ffffff')); }
    return {};
  });
  const capa = c_capa(R, 'ext_cabana_c', () => {
    // la colina con el castillo encendido a lo lejos
    poligono([[-2, 100], [10, 74], [40, 64], [72, 62], [104, 72], [130, 92], [140, 100]], (x, y) => (y < 66 + Math.abs(x - 56) * 0.1 + 3 ? hex('#c8d0e8') : c_ruido(x, y, 4, 781) > 0.6 ? hex('#5a6290') : hex('#4a5280')));
    c_castilloLejos(R, 58, 64, 0.42);
    // el bosque de pinos nevados detrás y a la derecha
    for (let i = 0; i < 22; i++) { const x = 100 + i * 10 + Math.floor(h(i, 1, 782) * 8), a = 22 + Math.floor(h(i, 2, 782) * 18) + (x > 230 ? 16 : 0); c_pino(R, x, 112, Math.min(a, 112 - 50), [hex('#0e1a2a'), hex('#1a2a3a'), hex('#2e4458')], true); }
    // la nieve del suelo, con lomas, su sombra azul y el camino de huellas hasta la puerta
    for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) { const r = c_ruido(x, y * 2, 22, 783), q = h(x, y, 784); if (y < 108 + Math.round(Math.sin(x * 0.04) * 2)) continue;
      let c = r > 0.62 ? hex('#f4f8ff') : r > 0.38 ? hex('#dae4f4') : hex('#b4c4e0'); if (q < 0.04) c = hex('#9aaed4'); pset(x, y, c); }
    for (let k = 0; k < 14; k++) { const u = k / 13, x = Math.round(lerp(70, 156, u) + (k % 2) * 4), y = Math.round(lerp(176, 152, u)); rect(x, y, x + 2, y + 1, hex('#9aaed4')); pset(x, y, hex('#7a8ec0')); }
    // la cabaña: el muro redondo de piedras gordas, con el sombreado de la curva
    for (let y = 96; y <= 150; y++) for (let x = CX - 42; x <= CX + 42; x++) { const cz = Math.cos((x - CX) / 44 * 1.45), fila = Math.floor((y - 96) / 7), off = (fila & 1) * 6, col = Math.floor((x - CX + 60 + off) / (6 + cz * 7)), dx = (x - CX + 60 + off) % Math.round(6 + cz * 7), dy = (y - 96) % 7, q = h(col, fila, 785);
      let c = q < 0.3 ? hex('#7a7068') : q < 0.65 ? hex('#8a8078') : hex('#9a9088'); if (dy === 6 || dx === 0) c = hex('#3a3430'); else if (dy === 0) c = hex('#b0a89c'); const lum = x < CX ? 0 : (x - CX) / 42; if (lum > 0.4 && ((x + y) & 1)) c = c_mez(c, hex('#1a1a30'), lum * 0.5); pset(x, y, c); }
    // el tejado cónico cubierto de nieve, con el borde de paja y los carámbanos
    poligono([[CX - 52, 99], [CX + 52, 99], [CX + 2, 54], [CX - 2, 54]], (x, y) => { const r = c_ruido(x * 2, y, 6, 786); return x > CX + 10 && r < 0.5 ? hex('#b4c4e0') : r > 0.7 ? hex('#ffffff') : hex('#e4ecf8'); });
    for (let x = CX - 52; x <= CX + 52; x++) { const y = 98 + Math.round(Math.sin(x * 0.9) * 1); pset(x, y, hex('#8a6a3a')); pset(x, y + 1, (x & 1) ? hex('#6a4a22') : hex('#a8844a')); pset(x, y + 2, hex('#4a3418')); if (h(x, 1, 787) < 0.18) linea(x, y + 3, x, y + 4 + Math.floor(h(x, 2, 787) * 4), hex('#d8ecff')); }
    // la chimenea de piedra con nieve encima
    c_sillares(R, 194, 52, 204, 70, 5, 4, [hex('#3a3430'), hex('#6a6058'), hex('#7a7068'), hex('#9a9088')], 22); rect(192, 50, 206, 52, hex('#eef4fa')); rect(196, 49, 202, 49, hex('#2a2420'));
    // la puerta enorme de tablones con su arco y sus herrajes
    for (let y = 108; y <= 150; y++) for (let x = CX - 15; x <= CX + 11; x++) { if (!c_enArco(x, y, CX - 2, 13, 118, 2)) continue; const tab = Math.floor((x - CX + 15) / 4); let c = (x - CX + 15) % 4 === 0 ? hex('#2a160c') : h(tab, y >> 3, 788) < 0.4 ? hex('#5a3418') : hex('#6a4020'); if (y === 124 || y === 140) c = hex('#2a2a32'); pset(x, y, c); }
    for (let y = 106; y <= 150; y++) for (let x = CX - 17; x <= CX + 13; x++) if (c_enArco(x, y, CX - 2, 15, 118, 2) && !c_enArco(x, y, CX - 2, 13, 118, 2)) pset(x, y, hex('#4a4440'));
    R.anillo(CX + 6.5, 132.5, 2, hex('#8a8a9a')); for (const [a, b] of [[CX - 12, 124], [CX - 12, 140], [CX + 8, 124], [CX + 8, 140]]) pset(a, b, hex('#9a9aaa'));
    // la ventana de cuarterones (la luz la pone el fotograma), la leñera y el huerto de calabazas con su cerca
    rect(185, 110, 205, 128, hex('#3a2a1a')); rect(184, 128, 206, 129, hex('#eef4fa'));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3 - (i % 2); j++) { const x = 212 + j * 6 + (i % 2) * 3, y = 146 - i * 5; disco(x, y, 2.6, hex('#6a4a2a')); disco(x, y, 1.6, hex('#c8a070')); pset(x, y, hex('#8a6a40')); }
    rect(210, 130, 230, 131, hex('#eef4fa'));
    for (let x = 226; x <= 304; x += 7) { linea(x, 148, x, 140 + (x % 3), hex('#5a4028')); pset(x, 139 + (x % 3), hex('#f4f8ff')); } linea(226, 143, 304, 143, hex('#6a4a2a')); linea(226, 142, 304, 142, hex('#e8eef8'));
    for (const [x, y, r] of [[240, 160, 7], [262, 164, 9], [286, 158, 6], [302, 166, 8], [250, 172, 5]]) c_calabaza(R, x, y, r);
    // la ballesta y las botas junto a la puerta, y el cubo
    rect(120, 146, 126, 150, hex('#2a1a12')); rect(120, 146, 126, 146, hex('#4a3020')); rect(128, 146, 134, 150, hex('#2a1a12'));
    return {};
  });
  R.copiar(fondo.b);
  c_titilan(R, t, 50, 11, 8);
  c_nubes(R, t, [[40, 30, 56, 2], [220, 50, 44, 3.4], [140, 16, 30, 5]], [hex('#3a3870'), hex('#5a5490'), hex('#8a7aae')]);
  c_pegar(R, capa, 20, 179);
  // la ventana encendida (tiembla con el fuego de dentro) y su luz en la nieve
  { const fl = Math.sin(t * 7) * 0.5 + Math.sin(t * 3.1) * 0.5; for (let y = 111; y <= 127; y++) for (let x = 186; x <= 204; x++) pset(x, y, x === 195 || y === 119 ? hex('#3a2a1a') : (y > 122 && fl > 0.2 ? hex('#ffd070') : hex('#ffb848')));
    pset(189, 113, hex('#fff0b0')); for (let y = 152; y < 168; y++) for (let x = 180 - (y - 152); x < 212 + (y - 152); x++) if (c_umb(x, y) < 0.32 - (y - 152) * 0.015 + fl * 0.04) pset(x, y, c_mez(R.pget(x, y), hex('#ffc070'), 0.4)); }
  // el farol de la puerta
  c_resplandor(R, 152, 112, 14, hex('#ffc860'), 0.45 + Math.sin(t * 10) * 0.04); rect(150, 110, 154, 115, hex('#1e1612')); rect(151, 111, 153, 114, hex('#ffe08a'));
  c_humo(R, 199, 46, t, 9);
  c_perro(R, 118, 158, t, 1);
  // los brillos de la nieve y la lechuza que vuelve al castillo
  for (let i = 0; i < 16; i++) { const x = Math.floor(h(i, 1, 789) * 320), y = 116 + Math.floor(h(i, 2, 789) * 62); if (Math.sin(t * 3 + i * 2.3) > 0.85) pset(x, y, hex('#ffffff')); }
  c_lechuza(R, 330 - ((t * 15) % 360), 46 + Math.sin(t) * 3, t, -1, true);
  c_nieva(R, t, 80, 0);
  return { suelo: 164, puerta: [CX - 15, 106, CX + 11, 150], umbral: 150, ventana: [185, 110, 205, 128], chimenea: [199, 46], perro: [118, 158], calabazas: [232, 150, 306, 172], lena: [208, 132, 230, 150], libre: [60, 226] };
}

// la puerta de la cabaña de cerca (o.puerta 0–1 la abre)
function c_cabanaPuerta(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R, u = Math.max(0, Math.min(1, o.puerta ?? 0)), DX0 = 112, DX1 = 178, DY0 = 56, DY1 = 158, SP = 82;
  const fondo = c_capa(R, 'ext_cabanaP', () => {
    c_degradado(R, 0, 0, 319, 60, [hex('#141a46'), hex('#242a5e'), hex('#3e3a78')]);
    for (let i = 0; i < 40; i++) { const x = 180 + Math.floor(h(i, 1, 790) * 140), y = Math.floor(h(i, 2, 790) * 40); if (x > 272 && y < 48) continue; pset(x, y, i % 5 ? hex('#8a90c8') : hex('#ffffff')); }
    // el muro de piedras gordas redondeadas
    for (let y = 20; y < 162; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 12), off = (fila & 1) * 9, col = Math.floor((x + off) / 18), dx = (x + off) % 18, dy = y % 12, q = h(col, fila, 791), ex = ((dx - 8.5) / 9) ** 2 + ((dy - 5.5) / 6) ** 2;
      let c = ex > 0.9 ? hex('#2a2420') : q < 0.3 ? hex('#6a6058') : q < 0.65 ? hex('#7a7068') : hex('#8a8078'); if (ex < 0.9 && dy < 3 && ex > 0.4) c = hex('#a8a094'); else if (ex < 0.9 && dy > 8 && ex > 0.35) c = hex('#4a4440'); if (ex < 0.9 && h(x, y, 792) < 0.05) c = hex('#5a5048'); if (ex > 0.9 && c_ruido(x, y, 7, 793) > 0.7) c = hex('#3a4a2a'); pset(x, y, c); }
    // el alero de paja oscura con su borde de nieve y los carámbanos
    for (let x = 0; x < 320; x++) { const e = Math.round(32 - x * 0.09); if (x > 262) continue; for (let y = 0; y <= e; y++) pset(x, y, (x + Math.floor(y * 1.7)) % 4 === 0 ? hex('#2a1e10') : h(x, y, 794) < 0.3 ? hex('#4a3418') : hex('#3a2812'));
      pset(x, e + 1, hex('#e8eef8')); pset(x, e + 2, hex('#c8d4ea')); if (h(x, 3, 795) < 0.2) linea(x, e + 3, x, e + 4 + Math.floor(h(x, 4, 795) * 7), hex('#d8ecff')); }
    // el marco de piedra de la puerta
    for (let y = DY0 - 6; y <= DY1; y++) for (let x = DX0 - 6; x <= DX1 + 6; x++) if (c_enArco(x, y, (DX0 + DX1) / 2, (DX1 - DX0) / 2 + 6, SP, 4) && !c_enArco(x, y, (DX0 + DX1) / 2, (DX1 - DX0) / 2, SP, 4)) { const q = h(Math.floor(Math.atan2(y - SP, x - 145) * 5), Math.floor(y / 10), 796); pset(x, y, q < 0.3 ? hex('#5a5048') : hex('#8a8078')); }
    // la ventana: el marco, el alféizar con nieve y las cortinas (dentro lo pone el fotograma)
    rect(194, 70, 250, 112, hex('#3a2a1a')); rect(192, 112, 252, 115, hex('#6a5a4a')); rect(192, 111, 252, 112, hex('#eef4fa'));
    // la leña apilada con nieve
    for (let i = 0; i < 5; i++) for (let j = 0; j < 9 - (i % 2); j++) { const x = 16 + j * 9 + (i % 2) * 4, y = 154 - i * 8; disco(x, y, 4.4, hex('#5a3a22')); disco(x, y, 3.2, hex('#c8a070')); R.anillo(x + 0.5, y + 0.5, 1.6, hex('#9a7448')); pset(x - 1, y - 1, hex('#e0c090')); }
    for (let x = 12; x <= 94; x++) pset(x, 117 + Math.round(Math.sin(x * 0.4)), hex('#eef4fa')), pset(x, 118, hex('#c8d4ea'));
    // las botas enormes junto a la puerta
    for (const bx of [92, 101]) { rect(bx, 146, bx + 6, 158, hex('#3a2418')); rect(bx, 154, bx + 9, 158, hex('#3a2418')); rect(bx, 146, bx + 6, 147, hex('#5a3a28')); rect(bx, 158, bx + 9, 158, hex('#1a100a')); }
    // el suelo nevado con huellas grandes y pequeñas
    for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const r = c_ruido(x, y * 2, 18, 797); pset(x, y, r > 0.6 ? hex('#f4f8ff') : r > 0.35 ? hex('#dae4f4') : hex('#b4c4e0')); }
    for (let k = 0; k < 8; k++) { const x = 150 + k * 18, y = 166 + (k % 2) * 6; rect(x, y, x + 5, y + 2, hex('#9aaed4')); rect(x + 1, y + 1, x + 4, y + 1, hex('#7a8ec0')); }
    return {};
  });
  R.copiar(fondo.b);
  R.recorte([180, 0, 319, 60]); c_nubes(R, t, [[100, 20, 40, 2.5], [240, 44, 30, 4]], [hex('#3a3870'), hex('#5a5490'), hex('#8a7aae')]); R.recorte(null);
  // dentro de la puerta: la luz del fuego, la mesa y el perro que asoma; la hoja gira hacia dentro sobre su gozne izquierdo
  const ancho = DX1 - DX0, wl = Math.round(ancho * (1 - u * 0.85)), fl = Math.sin(t * 8) * 0.5 + Math.sin(t * 3.3) * 0.5;
  for (let y = DY0; y <= DY1; y++) for (let x = DX0; x <= DX1; x++) { if (!c_enArco(x, y, (DX0 + DX1) / 2, ancho / 2, SP, 4)) continue; let c;
    if (x < DX0 + wl) { const xr = (x - DX0) / Math.max(1, wl), tabla = Math.floor(xr * 7), q = h(tabla, y >> 3, 798); c = (xr * 7) % 1 < 0.14 ? hex('#2a160c') : q < 0.4 ? hex('#5a3418') : hex('#6a4020'); if (h(x, y, 799) < 0.07) c = hex('#7a4a28');
      if ((y >= 78 && y <= 80) || (y >= 132 && y <= 134)) c = y === 78 || y === 132 ? hex('#5a5a68') : hex('#2a2a32'); if ((y === 79 || y === 133) && (x - DX0) % 8 === 4) c = hex('#a8a8b8'); }
    else { const xi = x - DX0, luz = 1 - Math.min(1, Math.hypot(xi - 50, y - 120) / 70) + fl * 0.08;
      c = y > 142 ? ((Math.floor(xi / 7) + (y > 150 ? 1 : 0)) & 1 ? hex('#7a4a22') : hex('#6a3e1c')) : (xi % 7 === 0 ? hex('#5a3418') : luz > 0.55 ? hex('#e8a050') : luz > 0.3 ? hex('#c8803a') : hex('#9a5a2a'));
      if (y === 96 || y === 97) c = hex('#4a2a14'); if (y >= 88 && y < 96 && xi % 6 < 3) c = [hex('#3a7a5a'), hex('#a83a3a'), hex('#d8c070'), hex('#5a6aa8')][Math.floor(xi / 6) % 4];
      if (y >= 120 && y <= 123 && xi > 6) c = y === 120 ? hex('#a8743c') : hex('#4a2a14'); if (y > 123 && y < 142 && (xi === 10 || xi === 11 || xi === 56)) c = hex('#3a2010');
      if (y >= 114 && y < 120 && xi > 24 && xi < 32) c = y === 114 ? hex('#e8e0c8') : hex('#c8b890'); if (y >= 115 && y < 120 && xi > 40 && xi < 45) c = hex('#6a6a7a'); }
    pset(x, y, c); }
  if (u > 0.2) { const px = DX0 + wl + 8, py = DY1 - 2; c_perro(R, Math.min(px + 10, DX1 - 6), py, t, 1); }
  if (u > 0.05) for (let y = DY1; y < 180; y++) { const a = (y - DY1) / 22; for (let x = DX0 + wl - Math.round(a * 8); x <= DX1 + a * 20; x++) if (c_umb(x, y) < u * 0.6 * (1 - a * 0.5)) pset(x, y, c_mez(R.pget(x, y), hex('#ffc070'), 0.4)); }
  // la corona de acebo y la aldaba (en la hoja)
  if (wl > 30) { const cx = DX0 + Math.round(wl * 0.5), cy = 92; for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; disco(cx + Math.cos(an) * 8, cy + Math.sin(an) * 8, 2.2, a % 2 ? hex('#1e5a2a') : hex('#2e7a3a')); }
    for (let a = 0; a < 7; a++) { const an = a / 7 * Math.PI * 2 + 0.3; pset(Math.round(cx + Math.cos(an) * 8), Math.round(cy + Math.sin(an) * 8), hex('#e83a3a')); } rect(cx - 2, cy + 8, cx + 2, cy + 10, hex('#c83a3a'));
    R.anillo(DX0 + wl - 7.5, 120.5, 3, hex('#8a8a9a')); }
  // la ventana: el fuego, la tetera, el jamón colgado y las cortinas, todo recortado al hueco
  R.recorte([196, 72, 248, 110]);
  for (let y = 72; y <= 110; y++) for (let x = 196; x <= 248; x++) pset(x, y, y > 98 ? hex('#6a3a1a') : (fl > 0 && ((x + y) & 3) === 0) ? hex('#e8a050') : hex('#c8783a'));
  for (let y = 88; y <= 104; y++) for (let x = 210; x <= 236; x++) if (x < 214 || x > 232 || y < 92) pset(x, y, hex('#5a4a44'));
  { const fa = 2 + Math.round(fl * 1.5); poligono([[216, 104], [230, 104], [223 + fl, 104 - 6 - fa]], hex('#ff9030')); poligono([[219, 104], [227, 104], [223, 100 - fa]], hex('#ffe08a')); }
  disco(223, 95, 4, hex('#2a2a32')); rect(226, 93, 229, 94, hex('#2a2a32')); pset(222, 92, hex('#6a6a7a')); if (Math.sin(t * 2) > 0) pset(224 + Math.round(Math.sin(t * 3)), 88, hex('#e8e8f0'));
  linea(204, 72, 204, 80, hex('#3a2a1a')); disco(204, 83, 3, hex('#a85a4a')); pset(203, 82, hex('#d88a7a'));
  for (const [x0, d] of [[196, 1], [248, -1]]) for (let y = 72; y <= 108; y++) { const w = 6 + Math.round(Math.sin(y * 0.3 + t) * 0.6) + (y > 96 ? (y - 96) * 0.2 : 0); for (let i = 0; i < w; i++) pset(x0 + i * d, y, i === w - 1 ? hex('#6a2a2a') : (i % 3 === 0 ? hex('#8a3a3a') : hex('#a84a42'))); }
  R.recorte(null);
  rect(221, 70, 222, 112, hex('#3a2a1a')); rect(194, 90, 250, 91, hex('#3a2a1a'));
  for (let y = 116; y < 132; y++) for (let x = 190; x < 256; x++) if (c_umb(x, y) < 0.18 + fl * 0.03) pset(x, y, c_mez(R.pget(x, y), hex('#ffc070'), 0.3));
  // el farol en su brazo de hierro
  { const fx = 188, fy = 62; linea(DX1 + 4, 52, fx, 52, hex('#1a1a24')); linea(fx, 52, fx, 56, hex('#1a1a24')); c_resplandor(R, fx, fy, 20, hex('#ffc860'), 0.45 + Math.sin(t * 10) * 0.04); rect(fx - 3, fy - 4, fx + 3, fy + 4, hex('#1e1612')); rect(fx - 2, fy - 3, fx + 2, fy + 3, Math.sin(t * 13) > -0.6 ? hex('#ffe08a') : hex('#ffb040')); rect(fx - 4, fy - 5, fx + 4, fy - 5, hex('#2a1c14')); pset(fx - 1, fy - 1, hex('#fff6c8')); }
  // el paraguas rosa apoyado en la pared
  { linea(186, 132, 194, 158, hex('#3a2a1a')); poligono([[183, 128], [189, 126], [194, 150], [190, 152]], hex('#e870a8')); linea(184, 128, 191, 151, hex('#f8a0c8')); linea(189, 127, 193, 150, hex('#b84a80')); R.anillo(184.5, 126.5, 2, hex('#3a2a1a')); }
  c_nieva(R, t, 60, 1);
  return { suelo: 170, puerta: [DX0, DY0, DX1, DY1], umbral: DY1, ventana: [196, 72, 248, 110], farol: [188, 62], lena: [12, 118, 94, 158], botas: [92, 146, 110, 158], paraguas: [184, 126, 194, 158], libre: [100, 300] };
}

// unas llamas mágicas que llenan un hueco (x0–x1, de la base y hacia arriba alto); negra: el fuego negro de bordes morados,
// si no, el fuego morado; se recortan con R.recorte si hace falta
function c_fuegoMagico(R, x0, x1, y, alto, t, negra, k = 0) {
  const cols = negra ? [hex('#0a0610'), hex('#1a0e2a'), hex('#3a1a5a'), hex('#8a5ad8')] : [hex('#5a1a8a'), hex('#9a3ad8'), hex('#d87af8'), hex('#f8d8ff')];
  for (let x = x0; x <= x1; x++) { const n = c_ruido(x * 2, t * 14 + k, 9, 820 + k) * 0.7 + c_ruido(x * 5, t * 22, 7, 821 + k) * 0.3, a = alto * (0.45 + n * 0.75);
    for (let j = 0; j < a; j++) { const u = j / a; let c = u > 0.9 ? cols[3] : u > 0.7 ? cols[2] : u > 0.35 ? cols[1] : cols[0]; if (negra && u > 0.86) c = cols[3]; else if (negra && u > 0.7) c = cols[2]; if (!negra && u < 0.2 && ((x + j) & 1)) c = cols[3]; R.pset(x, y - j, c); } }
  for (let i = 0; i < 4; i++) { const u = (t * 0.8 + i * 0.27 + k) % 1; R.pset(Math.round(x0 + h(i, Math.floor(t * 0.8 + i * 0.27 + k), 822) * (x1 - x0)), Math.round(y - alto * (0.8 + u)), negra ? hex('#8a5ad8') : hex('#f8d8ff')); }
}

// una de las siete botellas del acertijo (x: centro, base; s escala; tipo 0–6), con su líquido, su corcho y el brillo del cristal
const c_BOTELLAS = [
  { w: 3, a: 18, cuello: 4, liq: hex('#4a8a3a') },   // alta y fina
  { w: 6, a: 11, cuello: 4, liq: hex('#a83a3a'), redonda: true },   // redonda
  { w: 2, a: 5, cuello: 2, liq: hex('#3ac8e8') },   // la más pequeña
  { w: 7, a: 8, cuello: 3, liq: hex('#c8a030') },   // ancha y baja
  { w: 4, a: 15, cuello: 3, liq: hex('#7a3aa8') },   // cuadrada
  { w: 4, a: 9, cuello: 9, liq: hex('#e86aa0'), redonda: true },   // de cuello largo
  { w: 5, a: 13, cuello: 3, liq: hex('#2a2a4a'), gota: true },   // en forma de lágrima
];

function c_botella(R, x, base, s, tipo, t, brilla = false) {
  const B = c_BOTELLAS[tipo], w = Math.round(B.w * s), a = Math.round(B.a * s), cu = Math.round(B.cuello * s), { pset, rect, disco } = R, cr = hex('#d8e8f0'), k = hex('#14101c');
  const anch = (j) => B.redonda ? Math.round(Math.sqrt(Math.max(0, 1 - ((j - a / 2) / (a / 2 + 0.5)) ** 2)) * w) : B.gota ? Math.round(w * Math.min(1, (j + 1) / (a * 0.7))) : w;
  if (brilla) c_resplandor(R, x, base - a / 2, Math.round(a * 0.9 + 6), hex('#f8f0a0'), 0.5);
  for (let j = 0; j < a; j++) { const y = base - j, ww = Math.max(1, anch(j)); pset(x - ww - 1, y, k); pset(x + ww + 1, y, k);
    for (let i = -ww; i <= ww; i++) { let c = j < a * 0.62 ? B.liq : hex('#3a4a5a'); if (j < a * 0.62 && i > ww * 0.4) c = c_mez(c, hex('#000000'), 0.35); if (j === Math.round(a * 0.62) - 1) c = c_mez(B.liq, hex('#ffffff'), 0.4); if (i === -ww + 1 && j > 1) c = cr; pset(x + i, y, c); } }
  rect(x - anch(0) - 1, base + 1, x + anch(0) + 1, base + 1, k); for (let j = a; j < a + cu; j++) { pset(x - Math.max(1, Math.round(s)) - 1, base - j, k); pset(x + Math.max(1, Math.round(s)) + 1, base - j, k); rect(x - Math.max(1, Math.round(s)), base - j, x + Math.max(1, Math.round(s)), base - j, hex('#3a4a5a')); }
  rect(x - Math.max(1, Math.round(s)), base - a - cu - Math.round(2 * s), x + Math.max(1, Math.round(s)), base - a - cu, hex('#a87a48')); pset(x - Math.max(1, Math.round(s)), base - a - cu - Math.round(2 * s), hex('#d8a868'));
  if (Math.sin(t * 1.3 + tipo * 1.7) > 0.8) pset(x - Math.max(1, anch(Math.round(a / 2))) + 1, base - Math.round(a * 0.7), hex('#ffffff'));
  if (c_burbuja(t, tipo)) pset(x + ((tipo * 3) % 3) - 1, base - Math.round(((t * 4 + tipo) % 1) * a * 0.55) - 1, c_mez(B.liq, hex('#ffffff'), 0.6));
  return [x, base - a - cu - Math.round(2 * s)];
}

// ¿sube una burbuja en la botella k en el instante t?
const c_burbuja = (t, k) => Math.sin(t * 0.9 + k * 2.1) > 0.2;

// la sala subterránea del acertijo de pociones (mesa: la cámara de cerca de la mesa)
function c_pociones(R, t, o, mesa) {
  const { rect, pset, linea, poligono, disco } = R, PIE = [hex('#120e18'), hex('#1e1a28'), hex('#282236'), hex('#3a3248')];
  if (!mesa) {
    const fondo = c_capa(R, 'ext_poc', () => {
      c_sillares(R, 0, 0, 319, 150, 16, 8, PIE, 30, 0.25);
      // la bóveda: más oscura arriba, con dos nervios de piedra
      for (let y = 0; y < 50; y++) for (let x = 0; x < 320; x++) if (c_umb(x, y) > y / 50) pset(x, y, c_mez(R.pget(x, y), hex('#06040a'), 0.5));
      for (const [cx, rr] of [[160, 150], [160, 120]]) for (let x = 0; x < 320; x++) { const y = Math.round(54 - Math.sqrt(Math.max(0, rr * rr - (x - cx) ** 2)) * 0.36); if (y < 0) continue; rect(x, y, x, y + 2, hex('#2e2838')); pset(x, y, hex('#4a4058')); pset(x, y + 3, hex('#0a080e')); }
      // las dos puertas: el marco de piedra y el hueco negro
      for (const cx of [50, 270]) { for (let y = 60; y <= 150; y++) for (let x = cx - 32; x <= cx + 32; x++) { if (c_enArco(x, y, cx, 30, 92, 6) && !c_enArco(x, y, cx, 24, 92, 5)) pset(x, y, ((Math.floor(Math.atan2(y - 92, x - cx) * 4) + Math.floor(y / 9)) & 1) ? hex('#3a3248') : hex('#4a4058')); else if (c_enArco(x, y, cx, 24, 92, 5)) pset(x, y, hex('#07050b')); } }
      // la grieta, las cadenas y las argollas en la pared
      { let x = 150, y = 60; for (let k = 0; k < 40; k++) { pset(x, y, hex('#0a080e')); y++; x += Math.round(Math.sin(k * 1.3) * 1); } }
      for (const ax of [120, 200]) { R.anillo(ax + 0.5, 100.5, 3, hex('#5a5a68')); for (let j = 0; j < 7; j++) R.anillo(ax + 0.5 + (j % 2), 106.5 + j * 4, 1.6, hex('#4a4a58')); }
      // el suelo de losas con la luz morada que se refleja, el charco y piedras sueltas
      for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fy = [155, 161, 168, 180].findIndex((v) => y < v), ux = (x - 160) / (y - 100) * 5 + fy * 0.5, j = [155, 161, 168].includes(y) || ((ux % 1) + 1) % 1 < 0.06, q = h(Math.floor(ux), fy, 823);
        pset(x, y, j ? hex('#0e0a14') : q < 0.3 ? hex('#241e2e') : q < 0.6 ? hex('#2c2638') : hex('#342c42')); }
      rect(0, 150, 319, 150, hex('#0a080e'));
      for (let i = -14; i <= 14; i++) { const hh = Math.round(Math.sqrt(1 - (i / 14) ** 2) * 2.5); rect(150 + i, 172 - hh, 150 + i, 172 + hh, hex('#1a1630')); }
      for (const [x, y] of [[96, 166], [104, 170], [222, 174], [236, 160]]) { disco(x, y, 2, hex('#2a2436')); pset(x - 1, y - 1, hex('#5a5068')); }
      return {};
    });
    R.copiar(fondo.b);
    // las luces de los fuegos tiñen paredes y suelo
    c_resplandor(R, 270, 120, 70, hex('#a050e0'), 0.42 + Math.sin(t * 6) * 0.04);
    c_resplandor(R, 50, 124, 46, hex('#4a2a7a'), 0.3 + Math.sin(t * 5 + 1) * 0.03);
    // el fuego negro (izquierda) y el morado (derecha), recortados al hueco de su puerta
    // el pasillo que sigue detrás de cada fuego, con su resplandor
    for (const [cx, col] of [[50, hex('#2a1640')], [270, hex('#6a2aa0')]]) for (let y = 70; y < 118; y++) for (let x = cx - 22; x <= cx + 22; x++) if (c_enArco(x, y, cx, 24, 92, 5) && c_umb(x, y) < (y - 70) / 60) pset(x, y, col);
    R.recorte([26, 66, 74, 150]); c_fuegoMagico(R, 26, 74, 150, 34, t, true, 0); R.recorte(null);
    R.recorte([246, 66, 294, 150]); c_fuegoMagico(R, 246, 294, 150, 40, t, false, 3); R.recorte(null);
    // las cadenas que se mecen un poco, las gotas que caen del techo al charco y sus ondas
    for (const ax of [120, 200]) pset(ax + Math.round(Math.sin(t * 1.2 + ax) * 0.8), 134, hex('#7a7a88'));
    { const u = (t % 1.7) / 0.8; if (u < 1) { const y = Math.round(lerp(40, 171, u * u)); pset(150, y, hex('#8ab8e8')); pset(150, y - 1, hex('#4a6a9a')); } else { const r = (u - 1) * 12; for (let a = 0; a < 24; a++) pset(Math.round(150 + Math.cos(a / 24 * Math.PI * 2) * r), Math.round(172 + Math.sin(a / 24 * Math.PI * 2) * r * 0.25), hex('#4a4a7a')); } }
    // el reflejo morado que tiembla en las losas
    for (let i = 0; i < 20; i++) { const x = 230 + Math.floor(h(i, 1, 824) * 80), y = 152 + Math.floor(h(i, 2, 824) * 26); if (Math.sin(t * 5 + i * 2) > 0.3) pset(x, y, hex('#c87af0')); }
    // motas de ceniza que suben de los fuegos
    for (let i = 0; i < 8; i++) { const u = (t * 0.25 + i / 8) % 1, x = (i < 4 ? 50 : 270) + Math.sin(t * 2 + i) * 14, y = 140 - u * 90; pset(Math.round(x), Math.round(y), i < 4 ? hex('#6a4a9a') : hex('#e8b8ff')); }
    return { suelo: 168, sueloMesa: 148, detrasMesa: [104, 144], mesa: [104, 140, 216, 166], botellas: c_POS_GEN.map(([x, tp]) => [x, 142, tp]), pergamino: [110, 142, 136, 152], fuegoNegro: [26, 66, 74, 150], fuegoMorado: [246, 66, 294, 150], libre: [80, 240] };
  }
  // ── la mesa de cerca
  const fondo = c_capa(R, 'ext_pocM', () => {
    c_sillares(R, 0, 0, 319, 140, 24, 12, PIE, 31, 0.3);
    for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) if (c_umb(x, y) > y / 60) pset(x, y, c_mez(R.pget(x, y), hex('#06040a'), 0.5));
    for (const cx of [-6, 326]) for (let y = 40; y <= 140; y++) for (let x = cx - 40; x <= cx + 40; x++) { if (c_enArco(x, y, cx, 38, 80, 8) && !c_enArco(x, y, cx, 30, 80, 6)) pset(x, y, ((Math.floor(y / 10)) & 1) ? hex('#3a3248') : hex('#4a4058')); else if (c_enArco(x, y, cx, 30, 80, 6)) pset(x, y, hex('#07050b')); }
    { let x = 190, y = 20; for (let k = 0; k < 50; k++) { pset(x, y, hex('#0a080e')); y++; x += Math.round(Math.sin(k * 1.1) * 1); } }
    return {};
  });
  R.copiar(fondo.b);
  c_resplandor(R, 316, 110, 80, hex('#a050e0'), 0.45 + Math.sin(t * 6) * 0.04);
  c_resplandor(R, 4, 110, 60, hex('#4a2a7a'), 0.32);
  R.recorte([0, 50, 24, 140]); c_fuegoMagico(R, 0, 24, 140, 46, t, true, 0); R.recorte(null);
  R.recorte([296, 50, 319, 140]); c_fuegoMagico(R, 296, 319, 140, 52, t, false, 3); R.recorte(null);
  for (let i = 0; i < 8; i++) { const u = (t * 0.25 + i / 8) % 1, x = (i < 4 ? 14 : 306) + Math.sin(t * 2 + i) * 10, y = 130 - u * 70; pset(Math.round(x), Math.round(y), i < 4 ? hex('#6a4a9a') : hex('#e8b8ff')); }
  return { suelo: 142, mesa: [0, 136, 319, 180], botellas: c_POS_MESA.map(([x, b]) => [x, b]), pergamino: [24, 136, 98, 156], fuegoNegro: [0, 50, 24, 140], fuegoMorado: [296, 50, 319, 140], libre: [40, 290] };
}

// dónde van las siete botellas: en la general [x, tipo] sobre la mesa (pie en y 142); de cerca [x, pie]
const c_POS_GEN = [[148, 0], [158, 1], [168, 2], [178, 3], [189, 4], [199, 5], [209, 6]];

const c_POS_MESA = [[128, 150], [152, 148], [172, 150], [194, 148], [220, 150], [244, 148], [270, 150]];

// la mesa del acertijo con sus siete botellas y el pergamino (general o de cerca); o.elegida (0–6) la que brilla
function c_mesaPociones(R, t, o, cerca) {
  const { rect, pset, linea, poligono } = R, el = o.elegida;
  if (!cerca) {
    rect(102, 140, 218, 146, hex('#5a3418')); for (let x = 102; x <= 218; x++) { pset(x, 140, hex('#8a5a2a')); if (h(x, 1, 830) < 0.25) pset(x, 142 + (x % 3), hex('#4a2a14')); }
    rect(102, 146, 218, 153, hex('#3a2010')); rect(102, 146, 218, 146, hex('#6a4020')); for (let x = 104; x < 218; x += 22) rect(x, 148, x + 16, 151, hex('#4a2a14'));
    for (const lx of [106, 210]) { rect(lx, 154, lx + 3, 166, hex('#2a160c')); rect(lx, 154, lx, 166, hex('#5a3418')); }
    c_resplandor(R, 160, 150, 30, hex('#a050e0'), 0.12);
    // el pergamino desenrollado que cuelga por el borde (sin letras: renglones de trazos)
    rect(110, 141, 136, 144, hex('#e8dcb8')); poligono([[118, 145], [134, 145], [132, 156], [120, 156]], hex('#e0d0a8')); rect(117, 144, 135, 145, hex('#c8b890')); rect(119, 156, 133, 157, hex('#a8946a'));
    for (let y = 147; y < 155; y += 2) for (let x = 121; x < 131; x++) if (h(x, y, 831) < 0.6) pset(x, y, hex('#5a4a3a'));
    for (let i = 0; i < 7; i++) { const [x, tp] = c_POS_GEN[i]; c_botella(R, x, 142, 0.8, tp, t, el === i); }
    return;
  }
  // de cerca: el tablero en perspectiva con vetas, el canto y el frente
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 158) { const tabla = Math.floor((x - 160) / (y - 60) * 4 + 20), v = c_ruido(x * 0.3, y * 4, 5, 832 + tabla); c = ((x - 160) / (y - 60) * 4 + 20) % 1 < 0.06 ? hex('#2a160c') : v > 0.62 ? hex('#7a4a22') : v < 0.3 ? hex('#4a2a14') : hex('#5e3a1a'); if (y === 136) c = hex('#9a6a38'); }
    else { c = y === 158 ? hex('#a8743c') : y === 159 ? hex('#6a4020') : (h(x >> 3, y >> 2, 833) < 0.3 ? hex('#3a2010') : hex('#341c0e')); if (y > 166 && y < 176 && x % 60 > 6 && x % 60 < 54 && (y === 167 || y === 175 || x % 60 === 7 || x % 60 === 53)) c = hex('#24120a'); }
    pset(x, y, c); }
  c_resplandor(R, 300, 140, 50, hex('#a050e0'), 0.2);
  // el pergamino grande con sus rollos y los renglones (y los siete puntos de las botellas)
  poligono([[28, 140], [96, 138], [100, 154], [24, 157]], hex('#e8dcb8')); for (const [x0, y0] of [[22, 140], [94, 137]]) { rect(x0, y0, x0 + 5, y0 + 18, hex('#c8b890')); rect(x0, y0, x0 + 1, y0 + 18, hex('#f0e8cc')); rect(x0 + 5, y0, x0 + 5, y0 + 18, hex('#8a7a5a')); }
  for (let r = 0; r < 6; r++) { const y = 142 + r * 2; for (let x = 32; x < 90; x++) if (c_ruido(x, r, 3, 834) > 0.38) pset(x, y + Math.round((x - 32) * -0.02), hex('#4a3a2a')); }
  for (let i = 0; i < 7; i++) pset(40 + i * 7, 155, i === 2 ? hex('#3ac8e8') : hex('#6a4a2a'));
  for (let i = 0; i < 7; i++) { const [x, b] = c_POS_MESA[i]; R.rect(x - 8, b + 1, x + 8, b + 2, hex('#2a160c')); c_botella(R, x, b, 1.8, i, t, el === i); }
}

// juncos y espadañas de la orilla entre x0 y x1, con el pie en y, que se mecen con el viento
function c_juncos(R, t, x0, x1, y, k = 0) {
  for (let x = x0; x <= x1; x += 2) { const a = 14 + Math.floor(h(x, 1, 840 + k) * 18), m = Math.sin(t * 1.6 + x * 0.15) * 3;
    R.linea(x, y, x + m, y - a, h(x, 2, 840 + k) < 0.5 ? hex('#1e3a2a') : hex('#2e4a32')); R.pset(Math.round(x + m), y - a, hex('#5a7a5a'));
    if (h(x, 3, 840 + k) < 0.2) { R.rect(Math.round(x + m * 0.9), y - a + 2, Math.round(x + m * 0.9) + 1, y - a + 6, hex('#5a3a22')); R.pset(Math.round(x + m * 0.9), y - a + 2, hex('#8a6a4a')); } }
}

// unos helechos en una esquina de abajo (x: el borde, y: el suelo; d: hacia dónde se abren)
function c_helechos(R, t, x, y, d) {
  for (let f = 0; f < 6; f++) { const an = (0.35 + f * 0.22) * Math.PI / 2, L = 26 + (f % 3) * 6, m = Math.sin(t * 1.2 + f) * 0.05;
    for (let i = 0; i <= L; i++) { const u = i / L, cx = x + d * Math.cos(an + m) * i - d * 2, cy = y - Math.sin(an + m) * i + u * u * 8, hj = Math.round((1 - u) * 4) + 1;
      R.pset(Math.round(cx), Math.round(cy), hex('#1a3a22')); if (i % 2 === 0) { R.linea(cx, cy, cx + d * hj * 0.6, cy - hj, f % 2 ? hex('#2a5a32') : hex('#24502c')); R.linea(cx, cy, cx - d * hj * 0.3, cy - hj, hex('#183a20')); } } }
}

// la barandilla de la grada: postes, dos travesaños y el paño a rayas que se mueve con el viento
function c_barandilla(R, t) {
  const { rect, pset } = R;
  for (let x = 0; x < 320; x++) { const o2 = Math.round(Math.sin(t * 2 + x * 0.06) * 0.8); for (let y = 166; y <= 171 + o2; y++) if (x % 48 > 6) pset(x, y, Math.floor(x / 8) % 2 ? hex('#b8282e') : hex('#e8b830')); }
  rect(0, 164, 319, 165, hex('#a8743c')); rect(0, 164, 319, 164, hex('#d8a868')); rect(0, 173, 319, 174, hex('#7a4a22')); rect(0, 175, 319, 175, hex('#3a2010'));
  for (let x = 2; x < 320; x += 48) { rect(x, 160, x + 4, 179, hex('#6a4020')); rect(x, 160, x, 179, hex('#a8743c')); rect(x + 4, 160, x + 4, 179, hex('#3a2010')); rect(x - 1, 159, x + 5, 160, hex('#8a5a2a')); }
}

// la paleta de lo real
const d_C = pal({
  k: '#16121c', blanco: '#f6f4ee', cieloA: '#78aede', cieloB: '#94c0e6', cieloC: '#b2d2ee', cieloD: '#cfe2f2', cieloE: '#e2ecf0',
  nubeL: '#ffffff', nubeM: '#e4ecf4', nubeS: '#b4c4d8', piel: '#f0c8a0', pielS: '#c89a74',
  moq: '#34467a', moqS: '#24305a', moqL: '#4a5e96', moqR: '#c8503a', moqO: '#e0a040', pano: '#eef0f2', panoS: '#c4c8d2',
  lam: '#d8cfb6', lamS: '#bdb398', lamL: '#e8e0ca', lamD: '#a69c82', techo: '#e6dec8', techoS: '#c8bea4',
  metal: '#a4aab4', metalS: '#6a707c', metalL: '#d4d8e0', goma: '#2a2a32', alfom: '#465068', alfomL: '#5a6684', alfomS: '#363e54',
  tabla: '#a8784a', tablaS: '#7a522e', tablaL: '#c8985e',
  hierba: '#6a9a3e', hierbaS: '#4e7a30', hierbaL: '#88b852', seto: '#3e6a34', setoS: '#2c4e26', lejos: '#8eaab8', lejosS: '#7a98aa',
});

// mezcla dos colores: a = 0 deja c, a = 1 da d
function d_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// la capa fija de un encuadre: se pinta una sola vez en un búfer y en cada fotograma se copia entera
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  R.copiar(b);
}

// ruido de valor suave (para colinas, manchas y vetas largas)
function d_vn(x, y, k = 0) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const d_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// rampa tramada: v en [0, 1] sobre una lista de colores, con la trama de Bayer 4 × 4 entre tono y tono
function d_rampa(cols, v, x, y) {
  const n = cols.length - 1, f = Math.max(0, Math.min(n, v * n)), i = Math.floor(f);
  return cols[Math.min(n, i + (f - i > (d_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16 ? 1 : 0))];
}

// oscurece (o aclara hacia col) un rectángulo: a es cuánto
function d_tinte(R, x0, y0, x1, y1, a, col = d_C.k) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) R.pset(x, y, d_mezcla(R.pget(x, y), col, a));
}

// sombra blanda en elipse (la de un mueble o una persona en el suelo)
function d_sombra(R, cx, cy, rx, ry, a = 0.3) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = Math.round(cx) - w; x <= Math.round(cx) + w; x++) { const y = Math.round(cy) + j; if (x >= 0 && x < 320 && y >= 0 && y < 180) R.pset(x, y, d_mezcla(R.pget(x, y), d_C.k, a)); } }
}

// la luz que entra por una ventana: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila)
function d_luz(R, x0, y0, x1, y1, inclin, a = 0.25, col = d_C.blanco) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0 && x >= 0 && x < 320) R.pset(x, y, d_mezcla(R.pget(x, y), col, a)); }
}

// un cielo tramado de arriba (cols[0]) al horizonte, con un velo de ruido para que no haga franjas; devuelve el
// conjunto de sus colores (las nubes y los pájaros solo se pintan donde aún se ve el cielo: así quedan detrás de todo)
function d_cielo(R, x0, y0, x1, y1, cols) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, d_rampa(cols, (y - y0) / Math.max(1, y1 - y0) + (d_vn(x * 0.05, y * 0.12, 7) - 0.5) * 0.18, x, y));
  return new Set(cols);
}

// una nube de tres tonos (luz arriba a la izquierda, cuerpo, sombra abajo; base plana); ok(x, y) dice dónde se puede pintar
function d_nube(R, cx, cy, w, cols, ok) {
  const r = w * 0.3, B = [[-w * 0.36, 1, r * 0.72], [-w * 0.1, -r * 0.35, r * 0.95], [w * 0.2, -r * 0.15, r * 0.82], [w * 0.42, 1.2, r * 0.6]], yb = Math.round(r * 0.5);
  const den = (x, y, s, ox, oy) => { for (const [bx, by, br] of B) if ((x - bx - ox) ** 2 + (y - by - oy) ** 2 < (br * s) ** 2) return true; return false; };
  for (let j = Math.floor(-r * 1.45); j <= yb; j++) for (let i = Math.floor(-w * 0.72); i <= Math.ceil(w * 0.72); i++) {
    if (!den(i, j, 1, 0, 0)) continue; const X = Math.round(cx + i), Y = Math.round(cy + j); if (!ok(X, Y)) continue;
    const c = j >= yb - 1 ? cols[2] : den(i, j, 0.6, -1.5, -2) ? cols[0] : den(i, j, 0.86, 0, -1.5) ? cols[1] : ((X + Y) & 1 && j < yb - 3 ? cols[1] : cols[2]);
    R.pset(X, Y, c);
  }
}

// las nubes de un cielo en tres capas (cerca, grandes y rápidas; medio; lejos, pequeñas y lentas), dentro de la caja
// [x0, y0, x1, y1] y solo sobre los colores del cielo; o.n nubes por capa, o.v velocidad, o.esc tamaño, o.k semilla
function d_nubes(R, t, caja, cielo, o = {}) {
  const [x0, y0, x1, y1] = caja, W = x1 - x0, ok = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1 && cielo.has(R.pget(x, y)), n = o.n ?? 2, esc = o.esc ?? 1, k = o.k ?? 0;
  const cols = o.cols ?? [d_C.nubeL, d_C.nubeM, d_C.nubeS];
  for (let L = 0; L < 3; L++) for (let i = 0; i < n + (L === 2 ? 1 : 0); i++) {
    const w = [30, 20, 11][L] * esc * (0.8 + h(i, L, 40 + k) * 0.4), v = [3.2, 1.8, 0.8][L] * (o.v ?? 1), per = W + w * 2;
    const x = x0 - w + (((h(i, L, 41 + k) * per + t * v) % per) + per) % per, y = y0 + (y1 - y0) * ([0.42, 0.3, 0.62][L] + (h(i, L, 42 + k) - 0.5) * 0.4);
    d_nube(R, x, y, w, L === 2 ? [cols[1], d_mezcla(cols[1], cols[2], 0.5), cols[2]] : cols, ok);
  }
  return ok;
}

// pájaros que cruzan a lo lejos batiendo las alas (solo sobre lo que ok deja)
function d_pajaros(R, t, caja, n, col, ok, k = 0) {
  const [x0, y0, x1, y1] = caja, W = x1 - x0;
  for (let i = 0; i < n; i++) {
    const x = Math.round(x0 + ((h(i, 1, 50 + k) * W + t * (9 + h(i, 2, 50 + k) * 6)) % W)), y = Math.round(y0 + h(i, 3, 50 + k) * (y1 - y0) + Math.sin(t * 0.9 + i) * 2), a = Math.sin(t * 9 + i * 2) > 0;
    for (const [dx, dy] of a ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [0, 1]]) if (ok(x + dx, y + dy)) R.pset(x + dx, y + dy, col);
  }
}

// una persona pequeña de fondo (unos 11 px): o.ropa, o.pelo, o.piel, o.anda (fase de los pasos), o.paraguas (color),
// o.dir; o.cesta, o.capucha (un hábito medieval). ok(x, y) recorta (por omisión, toda la pantalla)
function d_gente(R, x, suelo, t, o = {}, ok = null) {
  const ps = ok ? (X, Y, c) => { if (ok(X, Y)) R.pset(X, Y, c); } : R.pset, x0 = Math.round(x), dir = o.dir ?? 1;
  const ropa = o.ropa ?? hex('#5a6a8a'), ropaS = d_mezcla(ropa, d_C.k, 0.35), pelo = o.pelo ?? hex('#4a3020'), piel = o.piel ?? d_C.piel;
  const paso = o.anda != null ? Math.floor(o.anda * 6) % 2 : -1, y = suelo - 11;
  if (o.paraguas != null) { const c = o.paraguas, cS = d_mezcla(c, d_C.k, 0.35); for (let i = -4; i <= 4; i++) { ps(x0 + 1 + i, y - 3 + (Math.abs(i) > 3 ? 1 : 0), Math.abs(i) > 3 ? cS : i < 0 ? c : d_mezcla(c, d_C.blanco, 0.2)); if (Math.abs(i) < 4) ps(x0 + 1 + i, y - 4, i < 0 ? d_mezcla(c, d_C.blanco, 0.3) : c); } for (let j = -2; j < 3; j++) ps(x0 + 1 + dir, y + j, d_C.k); }
  // la cabeza (3 × 3) con el pelo, o la capucha del hábito
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) ps(x0 + i, y + j, o.capucha ? (j === 2 && i === 1 + dir ? piel : ropaS) : j === 0 || (i === 1 - dir && j === 1) ? pelo : piel);
  // el cuerpo
  for (let j = 3; j < 8; j++) for (let i = -1; i < 4; i++) { if ((i === -1 || i === 3) && (j === 3 || j > 6)) continue; ps(x0 + i, y + j, i === 3 || j === 7 ? ropaS : ropa); }
  if (o.cesta) { ps(x0 + 1 + dir * 3, y + 5, hex('#a8783a')); ps(x0 + 1 + dir * 3, y + 6, hex('#7a522a')); ps(x0 + 1 + dir * 4, y + 5, hex('#c8984a')); }
  // las piernas (se alternan al andar)
  const pl = o.capucha ? ropaS : o.piernas ?? hex('#3a3a4a');
  if (o.capucha) { for (let i = -1; i < 4; i++) { ps(x0 + i, y + 8, ropaS); ps(x0 + i, y + 9, i === -1 || i === 3 ? d_C.k : ropaS); } ps(x0 + (paso === 1 ? 0 : 2), y + 10, d_C.k); }
  else for (let j = 8; j < 11; j++) { ps(x0 + (paso === 1 && j > 8 ? -1 : 0), y + j, pl); ps(x0 + 2 + (paso === 0 && j > 8 ? 1 : 0), y + j, pl); }
}

// tablas de madera (verticales si vert): juntas, vetas claras y oscuras, algún nudo y canto de luz
function d_madera(R, x0, y0, x1, y1, [c, cS, cL, cD], k = 0, tabla = 10, vert = false) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = vert ? x - x0 : y - y0, b = vert ? y : x, f = Math.floor(a / tabla), e = a % tabla, n = d_vn(b * 0.08 + f * 7, e * 0.6, 300 + k);
    let col = e === tabla - 1 ? cD : e === 0 ? cL : n > 0.72 ? cS : n < 0.18 ? cL : c;
    if (h(f, Math.floor(b / 37), 301 + k) < 0.12 && Math.abs((b % 37) - 18) < 2 && Math.abs(e - tabla / 2) < 2) col = cD;   // el nudo
    if (h(f, 0, 302 + k) < 0.3 && col === c) col = d_mezcla(c, cS, 0.25);
    R.pset(x, y, col);
  }
}

// sillería: hiladas de bloques a matajunta (w × a), cada uno con su tono, su canto de luz arriba, su sombra abajo y a
// la derecha, junta de mortero y algún desconchón o mancha de humedad; cols = [cuerpo, sombra, luz, junta]
function d_sillar(R, x0, y0, x1, y1, [c, cS, cL, cJ], w, a, k = 0) {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / a), j = (y - y0) % a, dx = (f & 1) ? w >> 1 : 0;
    for (let x = x0; x <= x1; x++) { const g = Math.floor((x - x0 + dx) / w), i = (x - x0 + dx) % w, q = h(g, f, 320 + k);
      let col;
      if (j === a - 1 || i === w - 1) col = cJ; else if (j === 0) col = cL; else if (j === a - 2 || i === w - 2) col = cS;
      else { col = q < 0.25 ? d_mezcla(c, cS, 0.3) : q > 0.8 ? d_mezcla(c, cL, 0.3) : c; const n = h(x, y, 321 + k); if (n < 0.06) col = cS; else if (n > 0.965) col = cL; }
      if (h(g, f, 322 + k) < 0.07 && i > 1 && i < 5 && j > 1 && j < 4) col = d_mezcla(cS, cJ, 0.5);   // un desconchón
      R.pset(x, y, col); } }
}

// el vapor o el humo que sube en bocanadas (x, y: la boca); col claro; alto: cuánto sube
function d_vapor(R, x, y, t, k = 0, col = d_C.blanco, alto = 14, ok = null) {
  for (let p = 0; p < 4; p++) { const u = ((t * 0.55 + p / 4 + h(p, k, 60)) % 1), r = 0.8 + u * 2.4, cx = x + Math.sin(u * 5 + k + t * 0.6) * (1 + u * 2.5), cy = y - u * alto;
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { if (i * i + j * j > r * r) continue; const X = Math.round(cx + i), Y = Math.round(cy + j); if ((ok && !ok(X, Y)) || (u > 0.45 && ((X + Y + Math.floor(t * 8)) & 1))) continue; R.pset(X, Y, u > 0.7 ? d_mezcla(R.pget(X, Y), col, 0.5) : col); } }
}

// un rectángulo de esquinas redondeadas (radio r), relleno con c (o una función (x, y))
function d_redondo(R, x0, y0, x1, y1, r, c) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const dx = x < x0 + r ? x0 + r - x : x > x1 - r ? x - (x1 - r) : 0, dy = y < y0 + r ? y0 + r - y : y > y1 - r ? y - (y1 - r) : 0;
    if (dx * dx + dy * dy <= r * r + 0.5) R.pset(x, y, typeof c === 'function' ? c(x, y) : c);
  }
}

// ¿está (x, y) dentro del cristal de alguna de las ventanas [x0, y0, x1, y1] (con las esquinas redondeadas de radio r)?
function d_enVentana(V, x, y, r = 0) {
  for (const [x0, y0, x1, y1] of V) { if (x < x0 || x > x1 || y < y0 || y > y1) continue; const dx = x < x0 + r ? x0 + r - x : x > x1 - r ? x - (x1 - r) : 0, dy = y < y0 + r ? y0 + r - y : y > y1 - r ? y - (y1 - r) : 0; if (dx * dx + dy * dy <= r * r + 0.5) return true; }
  return false;
}

// el campo inglés que se ve por las ventanillas, en la caja [X0, Y0, X1, Y1]: cielo, colinas lejanas con arboledas,
// prados en mosaico con setos (algunos arados, otros de colza), una granja de piedra con tejado de pizarra, el talud de
// hierba con su valla y los postes del telégrafo con sus cables; o.hor: el horizonte; o.cerca: donde empieza el talud;
// o.esc: la escala (más grande de cerca); o.granja [x, y]; o.postes [x…]. Devuelve el conjunto de colores del cielo.
function d_campo(R, X0, Y0, X1, Y1, o) {
  const { hor, cerca } = o, esc = o.esc ?? 1;
  const cielo = d_cielo(R, X0, Y0, X1, hor + 2, [d_C.cieloA, d_C.cieloB, d_C.cieloC, d_C.cieloD, d_C.cieloE]);
  // las colinas lejanas, azuladas, con arboledas en la cresta
  const LJ = [hex('#9ab4c2'), hex('#8aa6b6'), hex('#7a98aa'), hex('#6e8ea0')];
  for (let x = X0; x <= X1; x++) { const top = Math.round(hor - (3 + 6 * d_vn(x * 0.02 / esc, 0, 11) + 3 * d_vn(x * 0.07 / esc, 1, 12)) * esc);
    for (let y = top; y <= hor + 3; y++) R.pset(x, y, y === top ? LJ[0] : d_rampa(LJ, (y - top) / (hor + 4 - top) * 0.7 + (d_vn(x * 0.1, y * 0.3, 13) - 0.5) * 0.3, x, y));
    if (d_vn(x * 0.09 / esc, 3, 14) > 0.62) for (let j = 1; j <= Math.round(2 * esc); j++) R.pset(x, top - j + 1, (x + j) & 1 ? LJ[2] : LJ[3]); }
  // los prados: franjas que se ensanchan hacia delante, cortadas en parcelas, con setos entre ellas
  const PR = [[hex('#86b450'), hex('#76a444'), hex('#98c460')], [hex('#a8b858'), hex('#98a84a'), hex('#bcc86a')], [hex('#d8c858'), hex('#c4b44a'), hex('#e8d870')], [hex('#9a7a4a'), hex('#86683e'), hex('#ae8c58')], [hex('#6e9e40'), hex('#5e8c36'), hex('#80b04c')]];
  const filas = [];
  for (let y = hor + 3; y < cerca; y++) {
    const u = (y - hor - 3) / Math.max(1, cerca - hor - 3), fila = Math.floor(Math.sqrt(u) * 4.2), u0 = (fila / 4.2) ** 2, borde = Math.abs(u - u0) * (cerca - hor) < 0.9 && fila > 0;
    filas[y] = fila;
    for (let x = X0; x <= X1; x++) {
      const anchoP = (34 + fila * 22) * esc, sesgo = (y - hor) * (fila & 1 ? 0.7 : -0.5), col = Math.floor((x + sesgo + h(fila, 0, 15) * 90) / anchoP), xin = (x + sesgo + h(fila, 0, 15) * 90) - col * anchoP;
      if (borde || xin < 1.2 + fila * 0.4) { R.pset(x, y, (x + y) & 1 ? d_C.seto : d_C.setoS); continue; }
      const p = PR[Math.floor(h(fila, col, 16) * PR.length)], q = d_vn(x * 0.15, y * 0.5, 17 + col);
      let c = q > 0.66 ? p[2] : q < 0.3 ? p[1] : p[0];
      if (p === PR[3] && ((x + Math.round(y * 0.4)) % 3 === 0)) c = p[1];   // los surcos del arado
      if (h(x, y, 18) < 0.05) c = p[1];
      R.pset(x, y, c);
    }
  }
  // los árboles de los setos (copas redondas de tres tonos con su sombra)
  for (let i = 0; i < 26; i++) { const x = X0 + h(i, 1, 19) * (X1 - X0), y = hor + 5 + h(i, 2, 19) ** 1.6 * (cerca - hor - 8), r = (1.6 + h(i, 3, 19) * 1.6) * esc * (0.7 + (y - hor) / (cerca - hor));
    R.disco(x + 0.6, y + 0.6, r, d_C.setoS); R.disco(x, y, r * 0.9, d_C.seto); R.disco(x - r * 0.3, y - r * 0.35, r * 0.45, hex('#5a8a40')); R.pset(Math.round(x), Math.round(y + r), hex('#3a2a1a')); }
  // la granja: casa de piedra encalada con tejado de pizarra, chimenea, y el granero de madera
  if (o.granja) { const [gx, gy] = o.granja, s = esc;
    R.rect(gx, gy - 6 * s, gx + 12 * s, gy, hex('#e8e2d4')); R.rect(gx + 9 * s, gy - 6 * s, gx + 12 * s, gy, hex('#c8c0b0'));
    R.poligono([[gx - 1, gy - 6 * s], [gx + 2 * s, gy - 10 * s], [gx + 10 * s, gy - 10 * s], [gx + 13 * s, gy - 6 * s]], hex('#4a5060')); R.linea(gx + 2 * s, gy - 10 * s, gx + 10 * s, gy - 10 * s, hex('#6a7080'));
    R.rect(gx + 9 * s, gy - 12 * s, gx + 10 * s, gy - 9 * s, hex('#8a6a5a'));
    for (const wx of [2, 6]) { R.rect(gx + wx * s, gy - 4 * s, gx + wx * s + Math.max(1, s), gy - 3 * s, hex('#3a3a4a')); }
    R.rect(gx + 15 * s, gy - 5 * s, gx + 22 * s, gy, hex('#8a3a2a')); R.poligono([[gx + 14 * s, gy - 5 * s], [gx + 18.5 * s, gy - 8 * s], [gx + 23 * s, gy - 5 * s]], hex('#5a4a40')); R.rect(gx + 17 * s, gy - 3 * s, gx + 19 * s, gy, hex('#4a1e18')); }
  // el talud de hierba, con matas que se mecerán encima
  const HB = [d_C.hierbaL, d_C.hierba, d_C.hierbaS];
  for (let y = cerca; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const u = (y - cerca) / Math.max(1, Y1 - cerca), q = d_vn(x * 0.2, y * 0.4, 20);
    let c = d_rampa(HB, u * 0.8 + (q - 0.5) * 0.6, x, y); if (y === cerca) c = d_C.hierbaS; if (h(x, y, 21) < 0.04) c = hex('#e8e0a0'); if (h(x, y, 22) < 0.02) c = hex('#f0f0f0');   // botones de oro y margaritas
    R.pset(x, y, c); }
  // la valla de alambre del talud
  const vy = cerca + Math.round((Y1 - cerca) * 0.35);
  for (let x = X0 + 4; x <= X1; x += Math.round(16 * esc)) { R.rect(x, vy - Math.round(5 * esc), x + Math.max(0, Math.round(esc) - 1), vy + 1, hex('#7a5a3a')); R.pset(x, vy - Math.round(5 * esc), hex('#a8845a')); }
  for (let x = X0; x <= X1; x++) { R.pset(x, vy - Math.round(4 * esc), hex('#8a8a90')); R.pset(x, vy - Math.round(1.5 * esc), hex('#7a7a80')); }
  // los postes del telégrafo con su cruceta, aisladores y los cables que se comban de poste a poste
  const P = o.postes ?? [];
  for (let i = 0; i < P.length; i++) { const px = P[i], top = Y0 + 2;
    R.rect(px, top, px + 1, vy + 2, hex('#5a4030')); R.rect(px + 1, top, px + 1, vy + 2, hex('#3e2c20'));
    R.rect(px - 6, top + 4, px + 7, top + 5, hex('#4a3426')); for (const ax of [-5, -2, 3, 6]) R.pset(px + ax, top + 3, hex('#e8e8f0'));
    if (i + 1 < P.length) for (const ax of [-5, 6]) { const qx = P[i + 1]; for (let x = px + ax; x <= qx + ax; x++) { const u = (x - px - ax) / (qx - px), y = Math.round(top + 3 + Math.sin(u * Math.PI) * 7 * esc); if (x >= X0 && x <= X1) R.pset(x, y, hex('#3a3a44')); } } }
  return { cielo, valla: vy };
}

// una vaca frisona de perfil (s: escala) que pasta: baja y sube la cabeza y mueve el rabo; ok recorta a la ventana
function d_vaca(R, x, y, t, i, s, ok, dir = 1) {
  const ps = (X, Y, c) => { const xx = Math.round(x + X * dir * s), yy = Math.round(y + Y * s); for (let b = 0; b < s; b++) for (let a = 0; a < s; a++) { const px = dir > 0 ? xx + a : xx - a; if (ok(px, yy + b)) R.pset(px, yy + b, c); } };
  const N = hex('#1e1a22'), B = hex('#f2f0ea'), Bs = hex('#c8c4bc'), come = Math.sin(t * 0.7 + i * 2.1) > -0.2, cola = Math.sin(t * 2.3 + i) > 0.4;
  for (let j = 0; j < 4; j++) for (let k = 0; k < 8; k++) { if ((j === 0 || j === 3) && (k === 0 || k === 7)) continue; const mancha = h(Math.floor((k + i) / 3), Math.floor(j / 2), 70 + i) < 0.45; ps(k, j, mancha ? N : j === 3 ? Bs : B); }
  for (const k of [1, 2, 5, 6]) ps(k, 4, k === 2 || k === 6 ? N : Bs);   // las patas
  ps(3, 4, hex('#f0a8a8'));   // la ubre
  const hy = come ? 2 : 0; ps(8, hy, N); ps(9, hy, N); ps(8, hy + 1, N); ps(9, hy + 1, B); ps(8, hy - 1, Bs);   // la cabeza
  ps(-1, cola ? 0 : 1, N); ps(-1, cola ? 1 : 2, N); ps(-2, cola ? 1 : 3, N);   // el rabo
}

// una oveja (bola de lana con cara negra) que mordisquea
function d_oveja(R, x, y, t, i, ok) {
  const W = hex('#f4f2ea'), Ws = hex('#cfcabe'), b = Math.sin(t * 1.3 + i * 3) > 0.3 ? 1 : 0;
  for (const [dx, dy, c] of [[0, 0, W], [1, 0, W], [2, 0, W], [0, 1, Ws], [1, 1, W], [2, 1, Ws], [0, 2, hex('#2a2a2a')], [2, 2, hex('#2a2a2a')], [3, b, hex('#2a2a2a')]]) if (ok(x + dx, y + dy)) R.pset(x + dx, y + dy, c);
}

// una ventanilla de tren: la goma negra de esquinas redondas, el marco de aluminio con su luz y su sombra, los reflejos
// en diagonal sobre el cristal y la cortinilla recogida a cada lado
function d_ventanilla(R, x0, y0, x1, y1, r, cortina = true) {
  for (let y = y0 - 4; y <= y1 + 4; y++) for (let x = x0 - 4; x <= x1 + 4; x++) {
    if (d_enVentana([[x0, y0, x1, y1]], x, y, r)) { const d = (x - x0) + (y - y0) * 0.8, s = ((d % 60) + 60) % 60; if (s < 5 || (s > 9 && s < 11)) R.pset(x, y, d_mezcla(R.pget(x, y), d_C.blanco, s < 5 ? 0.18 : 0.12)); continue; }
    if (d_enVentana([[x0 - 1, y0 - 1, x1 + 1, y1 + 1]], x, y, r + 1)) { R.pset(x, y, d_C.goma); continue; }
    if (d_enVentana([[x0 - 4, y0 - 4, x1 + 4, y1 + 4]], x, y, r + 4)) { const arriba = y < y0 || x < x0, ab = y > y1; R.pset(x, y, ab ? d_C.metalL : arriba ? d_C.metalS : d_C.metal); if (y === y1 + 4 || x === x1 + 4) R.pset(x, y, d_C.lamD); }
  }
  R.rect(x0 - 4, y1 + 5, x1 + 4, y1 + 6, d_C.lamD);   // el alféizar
  if (cortina) for (const [cx, dir] of [[x0 - 6, 1], [x1 + 1, -1]]) {   // la cortinilla recogida, con sus pliegues
    for (let y = y0 - 6; y <= y1 - 6; y++) { const w = 4 + Math.round(Math.sin((y - y0) / (y1 - y0) * Math.PI) * 2); for (let i = 0; i < w; i++) { const X = dir > 0 ? cx + i : cx + 5 - i; R.pset(X, y, (i + Math.floor(y / 3)) % 3 === 0 ? hex('#5a2a3a') : i === 0 ? hex('#4a2030') : hex('#7a3a4a')); } }
    R.rect(cx, Math.round((y0 + y1) / 2), cx + 5, Math.round((y0 + y1) / 2) + 1, hex('#c8a040'));
  }
}

// el respaldo de un asiento de moqueta visto de lado (x0–x1, de arriba y0 al suelo y1), con su paño blanco en lo alto;
// o.cojin [x0, x1, y]: el asiento que sale hacia delante, con su bastidor y su pata
function d_respaldo(R, x0, y0, x1, y1, dir = 1, o = {}) {
  d_redondo(R, x0, y0, x1, y1, 3, (x, y) => { const borde = x === x0 || x === x1 || y === y0, luz = dir > 0 ? x <= x0 + 1 : x >= x1 - 1, sombra = dir > 0 ? x >= x1 - 1 : x <= x0 + 1;
    if (borde) return d_C.moqS; const a = (x + y) & 3, b = (x - y + 400) & 3, pat = a === 0 && b === 0 ? ((x + y * 3) % 24 === 0 ? d_C.moqO : d_C.moqL) : a === 2 && b === 2 ? d_C.moqS : null;
    return luz ? d_C.moqL : sombra ? d_C.moqS : pat ?? d_C.moq; });
  if (o.cojin) { const [cx0, cx1, cy] = o.cojin; d_redondo(R, cx0, cy, cx1, cy + 6, 2, (x, y) => (y === cy ? d_C.moqL : y >= cy + 5 ? d_C.moqS : ((x + y) & 3) === 0 ? d_C.moqL : d_C.moq));
    R.rect(cx0 + 2, cy + 7, cx1 - 2, cy + 8, d_C.metalS); const lx = Math.round((cx0 + cx1) / 2); R.rect(lx - 1, cy + 9, lx + 1, y1 - 1, d_C.metalS); R.rect(lx - 1, cy + 9, lx - 1, y1 - 1, d_C.metalL); R.rect(lx - 6, y1, lx + 6, y1, d_C.metalS); }
  d_redondo(R, x0 - 1, y0 - 1, x1 + 1, y0 + 9, 3, (x, y) => (y >= y0 + 8 ? d_C.panoS : x === x0 - 1 || x === x1 + 1 ? d_C.panoS : (x + y) % 5 === 0 ? hex('#dfe2ea') : d_C.pano));
  R.rect(x0, y0 + 10, x1, y0 + 10, d_C.moqS);
}

// la moqueta del pasillo: azul grisácea con su dibujo de rombos y motas, más clara hacia la pared
function d_moqueta(R, y0, y1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const u = (y - y0) / (y1 - y0), dx = (x + y * 2) % 12, dy = (x - y * 2 + 600) % 12;
    let c = dx === 0 || dy === 0 ? d_C.alfomL : h(x, y, 30) < 0.08 ? hex('#7a3a3a') : d_C.alfom; if (u > 0.6 && (x + y) & 1) c = d_mezcla(c, d_C.alfomS, 0.6); R.pset(x, y, c); }
  R.rect(0, y0, 319, y0, d_C.alfomS);
}

// el techo del vagón: paneles crema curvos, con las juntas, los plafones alargados y la rejilla del aire
function d_techoTren(R, y1, plaf) {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) { const u = y / y1; let c = d_rampa([d_C.techo, d_C.techo, d_C.techoS, d_C.lamD], u + (d_vn(x * 0.05, y * 0.2, 31) - 0.5) * 0.1, x, y); if (x % 64 === 0 && y > 2) c = d_C.techoS; R.pset(x, y, c); }
  for (const [x0, x1] of plaf) { R.rect(x0 - 2, 5, x1 + 2, 12, d_C.lamD); R.rect(x0 - 1, 6, x1 + 1, 11, d_C.metalL); R.rect(x0, 7, x1, 10, hex('#fffef4')); R.rect(x0, 10, x1, 10, hex('#e8e2cc')); for (let x = x0 + 4; x < x1; x += 8) R.rect(x, 7, x, 10, hex('#efe8d0'));
    for (let y = 13; y < 17; y++) for (let x = x0 - 4; x <= x1 + 4; x++) if (((x + y) & 1) === 0 && (y < 15 || ((x >> 1) + y) & 1)) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#fffcea'), 0.45)); }
  // las rejillas del aire y el altavoz de los avisos, entre plafón y plafón
  for (let i = 0; i + 1 < plaf.length; i++) { const gx = Math.round((plaf[i][1] + plaf[i + 1][0]) / 2); if (gx > 266) continue; R.rect(gx - 8, 5, gx + 8, 10, d_C.techoS); for (let x = gx - 7; x <= gx + 7; x += 2) R.rect(x, 6, x, 9, d_C.lamD); }
  if (y1 > 20) { R.disco(plaf[0][0] - 12, 8, 3, d_C.lamD); R.disco(plaf[0][0] - 12, 8, 2, d_C.techoS); for (const [dx, dy] of [[-1, -1], [1, 0], [0, 1]]) R.pset(plaf[0][0] - 12 + dx, 8 + dy, d_C.lamD); }
}

// el portaequipajes de varillas con su carga (maletas, una mochila, una gabardina, una caja)
function d_portaequipajes(R, x0, x1, y) {
  R.rect(x0, y, x1, y + 1, d_C.metalL); R.rect(x0, y + 2, x1, y + 2, d_C.metalS); for (let x = x0; x <= x1; x += 3) R.pset(x, y + 3, d_C.metalS);
  for (let x = x0; x <= x1; x += 40) R.rect(x, y - 2, x + 1, y + 5, d_C.metalS);
  for (let i = 0, x = x0 + 6; x < x1 - 20; i++) { const w = 12 + Math.round(h(i, 1, 35) * 16), alto = 6 + Math.round(h(i, 2, 35) * 5), tipo = Math.floor(h(i, 3, 35) * 4), c = [hex('#7a3a2a'), hex('#2a3a5a'), hex('#4a5a3a'), hex('#8a7a5a')][tipo], cS = d_mezcla(c, d_C.k, 0.4);
    if (h(i, 4, 35) < 0.3) { x += 10; continue; }
    if (tipo === 3) { for (let j = 0; j < alto + 4; j++) for (let k = 0; k < w; k++) if (Math.abs(k - w / 2) < w / 2 - (j < 3 ? 2 - j : 0)) R.pset(x + k, y - alto - 4 + j + 4 - (k % 4 === 0 ? 1 : 0), k % 4 === 0 ? cS : c); }   // la gabardina doblada
    else { R.rect(x, y - alto, x + w, y - 1, c); R.rect(x, y - alto, x + w, y - alto, d_mezcla(c, d_C.blanco, 0.3)); R.rect(x + w - 1, y - alto, x + w, y - 1, cS); if (tipo === 0) { R.rect(x + w / 2 - 2, y - alto - 2, x + w / 2 + 2, y - alto - 2, d_C.k); R.rect(x + 2, y - alto + 2, x + w - 2, y - alto + 2, cS); } if (tipo === 1) for (let k = 2; k < w; k += 4) R.pset(x + k, y - 3, d_C.metalL); }
    x += w + 4; }
}

// la mesita pegada a la pared, de laminado imitación madera, con su canto, su pata de columna y lo que hay encima
function d_mesitaTren(R, x0, x1, y, suelo, cosas) {
  R.rect(x0, y, x1, y + 2, hex('#b08458')); R.rect(x0, y, x1, y, hex('#d0a878')); R.rect(x0, y + 3, x1, y + 3, hex('#6a4a2e')); for (let x = x0 + 3; x < x1; x += 7) R.pset(x, y + 1, hex('#9a7048'));
  const cx = Math.round((x0 + x1) / 2); R.rect(cx - 1, y + 4, cx + 1, suelo - 2, d_C.metalS); R.rect(cx - 1, y + 4, cx - 1, suelo - 2, d_C.metalL); R.rect(cx - 5, suelo - 1, cx + 5, suelo, d_C.metalS);
  for (const [tipo, x] of cosas) {
    if (tipo === 'te') { R.rect(x, y - 5, x + 3, y - 1, hex('#f4f2ec')); R.rect(x + 3, y - 5, x + 3, y - 1, hex('#c8c4b8')); R.rect(x, y - 5, x + 3, y - 5, hex('#8a5a3a')); R.pset(x + 4, y - 4, hex('#c8c4b8')); R.pset(x + 4, y - 3, hex('#c8c4b8')); }
    if (tipo === 'periodico') { R.rect(x, y - 2, x + 12, y - 1, hex('#e8e4d8')); R.rect(x + 1, y - 3, x + 11, y - 3, hex('#d8d4c8')); for (let k = 1; k < 12; k += 3) R.pset(x + k, y - 2, hex('#8a8a90')); }
    if (tipo === 'lata') { R.rect(x, y - 5, x + 2, y - 1, hex('#c83a3a')); R.rect(x, y - 5, x + 2, y - 5, d_C.metalL); R.pset(x + 1, y - 3, d_C.blanco); }
    if (tipo === 'patatas') { R.rect(x, y - 4, x + 5, y - 1, hex('#3a6ac8')); R.rect(x + 1, y - 3, x + 3, y - 2, hex('#e8c040')); R.pset(x, y - 4, hex('#2a4a98')); R.pset(x + 5, y - 4, hex('#2a4a98')); }
    if (tipo === 'libreta') { R.rect(x, y - 1, x + 9, y - 1, hex('#f8f4e4')); R.rect(x, y - 2, x + 9, y - 2, hex('#e8e0c8')); R.pset(x + 4, y - 2, hex('#b8b0a0')); R.linea(x + 7, y - 4, x + 11, y - 2, hex('#2a3a8a')); }
  }
}

// un pasajero de fondo sentado junto a su ventanilla, de cintura para arriba: lee el periódico (y pasa la hoja) o dormita
function d_pasajero(R, x, y, t, tipo) {
  if (tipo === 'lee') { const pasa = (t % 6) < 0.5;
    R.rect(x - 2, y + 4, x + 8, y + 12, hex('#5a5a6a')); R.rect(x, y, x + 5, y + 5, d_C.piel); R.rect(x, y - 1, x + 5, y, hex('#6a6a6a')); R.pset(x + 4, y + 2, d_C.k);
    const px = x + 4; R.rect(px, y + 2, px + 9, y + 11, hex('#ece8dc')); R.rect(px + 9, y + 2, px + 9, y + 11, hex('#c8c4b8')); for (let j = y + 4; j < y + 11; j += 2) R.rect(px + 2, j, px + 7, j, (j % 4) ? hex('#9a9aa2') : hex('#7a7a84')); R.rect(px + 2, y + 4, px + 4, y + 6, hex('#8a8a92'));
    if (pasa) R.poligono([[px, y + 2], [px - 4, y + 4], [px - 3, y + 11], [px, y + 11]], hex('#f4f0e6'));
    R.rect(px - 1, y + 7, px, y + 8, d_C.piel); }
  else { const cab = Math.sin(t * 0.8) > 0.5 ? 1 : 0;
    R.rect(x - 2, y + 4, x + 8, y + 12, hex('#8a4a6a')); R.rect(x - 1, y + 4, x + 7, y + 5, hex('#a85a7a')); R.rect(x, y + cab, x + 5, y + 5 + cab, d_C.piel); R.rect(x - 1, y - 1 + cab, x + 6, y + 1 + cab, hex('#d8d4dc')); R.pset(x + 6, y + 2 + cab, hex('#d8d4dc')); R.rect(x + 3, y + 3 + cab, x + 4, y + 3 + cab, d_C.pielS); }
}

function d_tren(R, t, o, cam) {
  if (cam === 'ventanilla') {
    const V = [[60, 30, 258, 124]], r = 9, suelo = 162;
    let info;
    d_capa(R, 'real-tren-v', () => {
      info = d_campo(R, 0, 22, 319, 132, { hor: 82, cerca: 104, esc: 1.7, granja: [150, 90], postes: [96, 300] });
      d_capas.set('real-tren-v-info', info);
      // la pared del vagón alrededor de la ventanilla (laminado con su moteado y sus juntas)
      for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (d_enVentana(V, x, y, r) && y > 18) continue; let c = h(x, y, 33) < 0.07 ? d_C.lamS : h(x, y, 34) < 0.04 ? d_C.lamL : d_C.lam; if (x === 30 || x === 288) c = d_C.lamS; R.pset(x, y, c); }
      d_techoTren(R, 16, [[20, 120], [180, 250]]); R.rect(0, 16, 319, 17, d_C.lamD);
      d_portaequipajes(R, 64, 268, 22);
      d_ventanilla(R, V[0][0], V[0][1], V[0][2], V[0][3], r);
      // bajo la ventanilla: el panel con la rejilla de la calefacción y la mesita con el té, la libreta y el bolígrafo
      R.rect(0, 144, 319, 145, d_C.lamD); for (let x = 40; x < 300; x += 3) R.rect(x, 147, x, 156, d_C.lamD); R.rect(38, 146, 300, 146, d_C.lamS); R.rect(38, 157, 300, 157, d_C.lamS);
      d_mesitaTren(R, 116, 252, 134, suelo, [['libreta', 150], ['te', 214], ['patatas', 236]]);
      d_moqueta(R, suelo - 2, 179);
      // los asientos: el de la escritora a la izquierda (con su paño blanco) y el de enfrente a la derecha
      d_respaldo(R, 6, 66, 30, suelo + 6, 1, { cojin: [24, 58, 140] }); d_respaldo(R, 290, 76, 314, suelo + 6, -1, { cojin: [262, 296, 140] });
      R.rect(272, 52, 274, 56, d_C.metalS); R.poligono([[268, 56], [280, 56], [284, 76], [264, 76]], hex('#7a6a4a')); R.linea(274, 56, 272, 76, hex('#5a4a34')); R.rect(265, 74, 283, 76, hex('#6a5a3e'));   // la gabardina colgada
      d_sombra(R, 184, suelo, 70, 2, 0.18);
    });
    info = d_capas.get('real-tren-v-info');
    const enV = (x, y) => d_enVentana(V, x, y, r);
    const ok = d_nubes(R, t, [V[0][0], V[0][1], V[0][2], 86], info.cielo, { n: 2, esc: 1.5, v: 0.6, k: 3 });
    d_pajaros(R, t, [V[0][0], 36, V[0][2], 60], 3, hex('#3a3a4a'), ok, 4);
    d_vapor(R, 157 + 18, 86, t, 2, hex('#e8eef4'), 12, enV);   // el humo de la chimenea de la granja
    for (let i = 0; i < 3; i++) d_vaca(R, [78, 196, 228][i], [96, 92, 100][i], t, i, 2, enV, i === 1 ? -1 : 1);
    for (let i = 0; i < 4; i++) d_oveja(R, 120 + i * 9 + (i & 1) * 3, 88 + (i % 3), t, i, enV);
    // la hierba del talud que se mece con el viento
    for (let x = V[0][0]; x <= V[0][2]; x += 2) { const b = Math.round(Math.sin(t * 2 + x * 0.15) * 1.3), a = 3 + Math.round(h(x, 1, 36) * 4); for (let j = 0; j < a; j++) { const X = x + Math.round(b * j / a), Y = 124 - j; if (enV(X, Y)) R.pset(X, Y, j > a - 2 ? d_C.hierbaL : d_C.hierba); } }
    d_vapor(R, 216, 128, t, 5, hex('#ffffff'), 10);   // el té humea
    if (Math.sin(t * 0.7) > 0.96) R.rect(180, 7, 250, 10, hex('#e8e4d4'));   // un plafón titila
    return { suelo, ventana: V[0], mesa: [116, 134, 252] };
  }
  // la cámara general: el vagón a lo largo
  const V = [[16, 62, 94, 130], [128, 62, 210, 130], [244, 62, 316, 130]], r = 6, suelo = 158;
  let info;
  d_capa(R, 'real-tren-g', () => {
    info = d_campo(R, 0, 56, 319, 136, { hor: 92, cerca: 112, esc: 1, granja: [176, 104], postes: [56, 186, 306] });
    d_capas.set('real-tren-g-info', info);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (d_enVentana(V, x, y, r)) continue; let c = h(x, y, 33) < 0.07 ? d_C.lamS : h(x, y, 34) < 0.04 ? d_C.lamL : d_C.lam; if ((x === 110 || x === 228) && y > 50) c = d_C.lamS; R.pset(x, y, c); }
    d_techoTren(R, 30, [[24, 92], [130, 206], [234, 262]]); R.rect(0, 30, 319, 31, d_C.lamD); R.rect(0, 32, 319, 32, d_C.lamS);
    d_portaequipajes(R, 0, 266, 42);
    for (const [x0, y0, x1, y1] of V) d_ventanilla(R, x0, y0, x1, y1, r);
    R.rect(0, 140, 319, 141, d_C.lamD); for (let x = 0; x < 320; x += 3) R.rect(x, 146, x, 152, d_C.lamD); R.rect(0, 145, 319, 145, d_C.lamS); R.rect(0, 153, 319, 153, d_C.lamS);
    d_moqueta(R, suelo - 2, 179);
    // los respaldos entre ventanilla y ventanilla (de lado, con su paño) y los asientos
    for (const [x0, x1, d] of [[0, 8, -1], [100, 109, -1], [112, 121, 1], [216, 225, -1], [229, 238, 1]]) d_respaldo(R, x0, 96, x1, suelo + 2, d);
    for (const [x0, x1] of [[9, 22], [86, 99], [122, 136], [202, 215], [239, 252], [306, 319]]) { d_redondo(R, x0, 142, x1, 148, 2, (x, y) => (y === 142 ? d_C.moqL : y >= 147 ? d_C.moqS : ((x + y) & 3) === 0 ? d_C.moqL : d_C.moq)); R.rect(x0 + 2, 149, x1 - 2, 150, d_C.metalS); }
    d_mesitaTren(R, 26, 84, 137, suelo, [['periodico', 30], ['lata', 70]]);
    d_mesitaTren(R, 138, 200, 137, suelo, [['te', 150], ['libreta', 174]]);
    d_mesitaTren(R, 256, 304, 137, suelo, [['te', 266], ['patatas', 288]]);
    // en el pasillo: una mochila en el suelo, un billete caído y el reflejo de las ventanillas en la moqueta
    R.rect(232, 162, 246, 172, hex('#6a7a3a')); R.rect(232, 162, 246, 163, hex('#8a9a4a')); R.rect(234, 166, 244, 170, hex('#5a6a30')); R.rect(237, 159, 241, 161, hex('#4a5a2a')); R.rect(245, 163, 246, 172, hex('#4a5a2a'));
    R.poligono([[96, 170], [104, 168], [106, 172], [98, 174]], hex('#e8d8a8')); R.linea(98, 171, 104, 170, hex('#c84a3a'));
    for (const [x0, , x1] of V) for (let y = 159; y < 176; y++) for (let x = x0 + 8 + (y - 159); x < x1 - 8 + (y - 159); x++) if (((x + y) & 1) === 0 && x < 320) R.pset(x, y, d_mezcla(R.pget(x, y), d_C.cieloD, 0.12));
    d_sombra(R, 160, suelo, 140, 2, 0.15);
  });
  info = d_capas.get('real-tren-g-info');
  const enV = (x, y) => d_enVentana(V, x, y, r);
  const ok = d_nubes(R, t, [0, 60, 319, 96], info.cielo, { n: 3, esc: 1, v: 0.6, k: 1 });
  d_pajaros(R, t, [0, 66, 319, 84], 4, hex('#3a3a4a'), ok, 1);
  d_vapor(R, 186, 92, t, 1, hex('#e8eef4'), 9, enV);
  [[30, 104], [72, 108], [150, 101], [262, 106], [290, 110]].forEach(([x, y], i) => d_vaca(R, x, y, t, i, 1, enV, i & 1 ? -1 : 1));
  for (let i = 0; i < 5; i++) d_oveja(R, 214 + i * 6, 100 + (i % 2), t, i, enV);
  for (let x = 0; x < 320; x += 2) { const b = Math.round(Math.sin(t * 2 + x * 0.2)), a = 2 + Math.round(h(x, 1, 37) * 2); for (let j = 0; j < a; j++) { const X = x + (j === a - 1 ? b : 0), Y = 130 - j; if (enV(X, Y)) R.pset(X, Y, j === a - 1 ? d_C.hierbaL : d_C.hierba); } }
  d_pasajero(R, 40, 112, t, 'lee'); d_pasajero(R, 278, 112, t, 'duerme');
  d_vapor(R, 152, 131, t, 3, hex('#ffffff'), 9); d_vapor(R, 268, 131, t, 7, hex('#ffffff'), 8);
  if (Math.sin(t * 0.8 + 1) > 0.95) R.rect(234, 7, 262, 10, hex('#e8e4d4'));   // el plafón del fondo titila
  return { suelo, ventana: V[1], ventanas: V, mesa: [138, 137, 200] };
}

// delante del vagón: los respaldos de la fila de este lado del pasillo, que enmarcan el plano por los bordes
function d_trenDelante(R, t, o, cam) {
  if (cam === 'ventanilla') return;
  for (const [x0, x1, d] of [[-6, 14, 1], [306, 326, -1]]) { d_redondo(R, x0, 120, x1, 186, 4, (x, y) => { const pat = ((x + y * 2) % 6 === 0) ? d_C.moqR : null; return y < 124 || x === x0 || x === x1 ? d_C.moqS : pat ?? ((d > 0 ? x > x1 - 3 : x < x0 + 3) ? d_C.moqS : d_C.moq); }); d_redondo(R, x0 - 1, 118, x1 + 1, 128, 3, (x, y) => (y > 126 ? d_C.panoS : d_C.pano)); }
}

const d_CF = pal({
  pared: '#3e5c4c', paredS: '#30483c', paredL: '#4e6e5c', friso: '#5a3422', frisoS: '#3e2216', frisoL: '#7a4a30', marco: '#ece6d6', marcoS: '#b8b0a0',
  techo: '#e8dcc4', techoS: '#c8bca4', suelo: '#7a4e2e', sueloS: '#5a361e', sueloL: '#9a6a40', sueloD: '#3e2412',
  arenisca: '#a89a84', areniscaS: '#857864', areniscaL: '#c4b8a2', junta: '#6e6454', calleA: '#5a5c66', calleB: '#4a4c56', calleL: '#8a8e9c',
  lluvia: '#c8d4e4', cieloG: '#b8c0cc', cieloG2: '#a4aebc', cieloG3: '#929cac', luzC: '#ffe0a0', granate: '#7a1e2a', granateL: '#a83a44',
});

// la calle de Edimburgo que se ve por la ventana, en la caja [x0, y0, x1, y1]: cielo gris, la fachada de arenisca de
// enfrente con sus ventanas de guillotina (alguna encendida), la tienda de abajo con su rótulo sin letras, la farola, la
// acera y los adoquines mojados con reflejos; e: escala. Devuelve el conjunto de colores del cielo y la altura de la acera.
function d_calleEdimburgo(R, x0, y0, x1, y1, e = 1) {
  const cielo = d_cielo(R, x0, y0, x1, y0 + Math.round(10 * e), [d_CF.cieloG3, d_CF.cieloG2, d_CF.cieloG]);
  const yF = y0 + Math.round(6 * e), yA = y1 - Math.round(16 * e), yT = yA - Math.round(18 * e);
  // la fachada: sillares de arenisca, cornisa y ventanas
  d_sillar(R, x0, yF, x1, yA, [d_CF.arenisca, d_CF.areniscaS, d_CF.areniscaL, d_CF.junta], Math.round(10 * e), Math.round(4 * e), 5);
  R.rect(x0, yF, x1, yF + Math.round(2 * e), d_CF.areniscaS); R.rect(x0, yF + Math.round(2 * e), x1, yF + Math.round(2 * e), d_CF.junta);
  const paso = Math.round(26 * e);
  for (let wx = x0 + Math.round(6 * e); wx < x1 - 8 * e; wx += paso) for (let f = 0; f < 2; f++) {
    const wy = yF + Math.round((6 + f * 15) * e), ww = Math.round(10 * e), wh = Math.round(11 * e), enc = h(wx, f, 81) < 0.35;
    if (wy + wh > yT - 2) continue;
    R.rect(wx - 1, wy - 1, wx + ww + 1, wy + wh + 1, d_CF.areniscaL); R.rect(wx, wy, wx + ww, wy + wh, enc ? d_CF.luzC : hex('#2e3440'));
    if (enc) R.rect(wx + 1, wy + wh - 3, wx + ww - 1, wy + wh - 1, hex('#e8b870')); else R.rect(wx + 1, wy + 1, wx + 3, wy + 3, hex('#4a5262'));
    R.rect(wx, wy + Math.round(wh / 2), wx + ww, wy + Math.round(wh / 2), d_CF.marco); R.rect(wx + Math.round(ww / 2), wy, wx + Math.round(ww / 2), wy + wh, d_CF.marco);
    R.rect(wx - 2, wy + wh + 2, wx + ww + 2, wy + wh + 2, d_CF.areniscaS);
  }
  // la tienda de abajo: escaparate con su toldo verde oscuro y el rótulo de barras doradas
  R.rect(x0, yT, x1, yA, hex('#1e3a2e')); R.rect(x0, yT, x1, yT + Math.round(4 * e), hex('#16281f'));
  for (let x = x0 + Math.round(8 * e); x < x1 - 10; x += Math.round(16 * e)) R.rect(x, yT + Math.round(e * 1.5), x + Math.round(8 * e), yT + Math.round(e * 2), hex('#c8a040'));
  for (let x = x0 + 4; x < x1 - 6; x += Math.round(30 * e)) { const a = yT + Math.round(6 * e), b = yA - 1, w = Math.round(20 * e);
    for (let y = a; y <= b; y++) for (let i = 0; i <= w; i++) R.pset(x + i, y, d_rampa([hex('#3a3a32'), hex('#6a5a3a'), hex('#c89a58')], (y - a) / (b - a) * 0.9 + (i === 0 || i === w ? -0.4 : 0), x + i, y));
    R.rect(x - 1, a - 1, x + w + 1, a - 1, hex('#16281f')); R.rect(x - 1, a, x - 1, b, hex('#16281f')); R.rect(x + w + 1, a, x + w + 1, b, hex('#16281f'));
    for (let k = 0; k < 3; k++) { const gx = x + 2 + k * Math.round(6 * e), gw = Math.round(3 * e), ga = Math.round((4 + (k % 2) * 3) * e); R.rect(gx, b - ga, gx + gw, b - 1, [hex('#a83a3a'), hex('#3a6aa8'), hex('#e8e0c0')][k]); R.rect(gx, b - ga, gx + gw, b - ga, d_C.blanco); }
    R.rect(x + 2, a + 2, x + Math.round(4 * e), a + Math.round(5 * e), d_mezcla(hex('#6a5a3a'), d_C.blanco, 0.25)); }
  // la acera y los adoquines mojados (con los reflejos de las ventanas encendidas)
  R.rect(x0, yA + 1, x1, yA + Math.round(4 * e), hex('#8a8c94')); R.rect(x0, yA + 1, x1, yA + 1, hex('#a8aab4')); R.rect(x0, yA + Math.round(4 * e) + 1, x1, yA + Math.round(4 * e) + 1, hex('#3a3c44'));
  for (let y = yA + Math.round(4 * e) + 2; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = Math.floor(y / 3), i = (x + (f & 1) * 2) % 5, j = y % 3;
    let c = i === 4 || j === 2 ? d_CF.calleB : h(Math.floor((x + (f & 1) * 2) / 5), f, 82) < 0.5 ? d_CF.calleA : hex('#62646e'); if (j === 0 && i < 3 && h(x, y, 83) < 0.4) c = d_CF.calleL;
    if (h(Math.floor(x / 5), 0, 84) < 0.3 && ((x + y) & 1) === 0) c = d_mezcla(c, d_CF.luzC, 0.35);   // reflejos
    R.pset(x, y, c); }
  // la farola de hierro con su farol
  const fx = x0 + Math.round((x1 - x0) * 0.72); R.rect(fx, yF + Math.round(10 * e), fx + 1, yA + 2, hex('#22262e')); R.rect(fx - 2, yA, fx + 3, yA + 2, hex('#22262e'));
  R.rect(fx - 2, yF + Math.round(5 * e), fx + 3, yF + Math.round(10 * e), hex('#22262e')); R.rect(fx - 1, yF + Math.round(6 * e), fx + 2, yF + Math.round(9 * e), d_CF.luzC);
  return { cielo, acera: yA + Math.round(3 * e) };
}

// la vida de la calle: la lluvia fina, la gente que pasa con paraguas y, de vez en cuando, un autobús granate; ok recorta
function d_vidaCalle(R, t, caja, acera, e, ok) {
  const [x0, y0, x1, y1] = caja, W = x1 - x0;
  const PAR = [hex('#2a2a36'), hex('#a83a3a'), hex('#3a5a9a'), hex('#e8c040')];
  for (let i = 0; i < 4; i++) { const v = (5 + h(i, 1, 85) * 5) * (i & 1 ? 1 : -1), per = W + 30, xx = x0 - 15 + ((((h(i, 2, 85) * per + t * v) % per) + per) % per);
    d_gente(R, xx, acera + (i & 1), t, { anda: t + i, dir: v > 0 ? 1 : -1, paraguas: PAR[i], ropa: [hex('#4a4a5a'), hex('#6a4a3a'), hex('#3a4a3a'), hex('#5a5a7a')][i] }, ok); }
  // el autobús: cruza cada 9 s
  const fase = (t % 9) / 9, bx = Math.round(x1 + 10 - fase * (W + 90) * 2.2);
  if (bx > x0 - 80 && bx < x1 + 10) { const by = acera + Math.round(4 * e), L = Math.round(64 * e), A = Math.round(22 * e);
    for (let y = by - A; y <= by; y++) for (let x = bx; x <= bx + L; x++) { if (!ok(x, y)) continue; const fy = y - (by - A); let c = fy < A * 0.45 ? d_CF.granate : fy < A * 0.55 ? hex('#f0ece0') : d_CF.granate;
      if (fy > 2 && fy < A * 0.4 && ((x - bx) % 9) > 1) c = hex('#3a4450'); if (fy > A * 0.6 && fy < A * 0.85 && ((x - bx) % 11) > 2 && x - bx > 8) c = hex('#3a4450'); if (fy === 0) c = d_CF.granateL; R.pset(x, y, c); }
    for (const wx of [bx + 10, bx + L - 12]) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 9 && ok(wx + i, by + j)) R.pset(wx + i, by + j, i * i + j * j <= 2 ? hex('#8a8a90') : hex('#16161c')); }
  // la lluvia fina, en diagonal
  for (let i = 0; i < 40; i++) { const x = x0 + Math.floor((h(i, 1, 86) * W + t * 22) % W), y = y0 + Math.floor((h(i, 2, 86) * (y1 - y0) + t * 140) % (y1 - y0));
    for (let k = 0; k < 3; k++) if (ok(x - k, y - k * 2)) R.pset(x - k, y - k * 2, d_mezcla(R.pget(x - k, y - k * 2), d_CF.lluvia, 0.6)); }
}

// una ventana de guillotina de madera pintada de crema, con cuarterones (cols × filas) y el alféizar; devuelve los
// huecos de cristal
function d_ventanaCafe(R, x0, y0, x1, y1, cols, filas) {
  const g = 2, huecos = [];
  for (let y = y0 - 3; y <= y1 + 3; y++) for (let x = x0 - 3; x <= x1 + 3; x++) if (x < x0 || x > x1 || y < y0 || y > y1) R.pset(x, y, x === x0 - 3 || y === y0 - 3 ? d_CF.marcoS : x === x1 + 3 || y === y1 + 3 ? hex('#8a8272') : d_CF.marco);
  const w = (x1 - x0 + 1 - (cols - 1) * g) / cols, hh = (y1 - y0 + 1 - (filas - 1) * g) / filas;
  for (let c = 1; c < cols; c++) { const x = Math.round(x0 + c * (w + g) - g); R.rect(x, y0, x + g - 1, y1, d_CF.marco); R.rect(x + g - 1, y0, x + g - 1, y1, d_CF.marcoS); }
  for (let f = 1; f < filas; f++) { const y = Math.round(y0 + f * (hh + g) - g); R.rect(x0, y, x1, y + g - 1, d_CF.marco); R.rect(x0, y + g - 1, x1, y + g - 1, d_CF.marcoS); }
  for (let c = 0; c < cols; c++) for (let f = 0; f < filas; f++) huecos.push([Math.round(x0 + c * (w + g)), Math.round(y0 + f * (hh + g)), Math.round(x0 + c * (w + g) + w - 1), Math.round(y0 + f * (hh + g) + hh - 1)]);
  R.rect(x0 - 6, y1 + 4, x1 + 6, y1 + 6, d_CF.marco); R.rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, d_CF.marcoS); R.rect(x0 - 5, y1 + 8, x1 + 5, y1 + 8, d_CF.paredS);
  return huecos;
}

// la pared del café: el yeso verde con su moteado, el friso de madera de cuarterones con sus molduras y el suelo de tablas
function d_salaCafe(R, yFriso, ySuelo) {
  // el papel pintado: rayas finas y una flor de lis menuda en rombo (sin letras), con manchas suaves de luz y de humo
  for (let y = 0; y < yFriso; y++) for (let x = 0; x < 320; x++) { const q = d_vn(x * 0.04, y * 0.05, 87), rx = x % 16, ry = (y + ((x >> 4) & 1) * 10) % 20;
    let c = rx === 0 || rx === 8 ? d_CF.paredS : d_CF.pared; if ((rx === 4 && (ry === 3 || ry === 6)) || (ry === 4 && (rx === 3 || rx === 5)) || (rx === 4 && ry === 5)) c = hex('#58786a');
    if (q > 0.72 && ((x + y) & 1)) c = d_mezcla(c, d_CF.paredL, 0.5); else if (q < 0.25 && ((x + y) & 1)) c = d_mezcla(c, d_CF.paredS, 0.6); if (h(x, y, 88) < 0.03) c = d_CF.paredS; R.pset(x, y, c); }
  d_madera(R, 0, yFriso, 319, ySuelo, [d_CF.friso, d_CF.frisoS, d_CF.frisoL, d_CF.frisoS], 3, 40, true);
  R.rect(0, yFriso, 319, yFriso + 2, d_CF.frisoL); R.rect(0, yFriso + 3, 319, yFriso + 3, d_CF.frisoS);
  for (let x = 4; x < 316; x += 40) { const a = x + 4, b = x + 34, c0 = yFriso + 8, c1 = ySuelo - 8; R.rect(a, c0, b, c0, d_CF.frisoS); R.rect(a, c0, a, c1, d_CF.frisoS); R.rect(a, c1, b, c1, d_CF.frisoL); R.rect(b, c0, b, c1, d_CF.frisoL); }
  R.rect(0, ySuelo - 3, 319, ySuelo, d_CF.frisoS);
  d_madera(R, 0, ySuelo + 1, 319, 179, [d_CF.suelo, d_CF.sueloS, d_CF.sueloL, d_CF.sueloD], 4, 7);
}

// una lámpara de globo colgada del techo que se mece un poco (x: el enganche; largo del cordón)
function d_lampara(R, x, y0, largo, t, k) {
  const dx = Math.round(Math.sin(t * 0.9 + k) * 1.2), lx = x + dx, ly = y0 + largo;
  R.linea(x, y0, lx, ly - 4, hex('#2a2420')); R.rect(lx - 2, ly - 5, lx + 2, ly - 4, hex('#b08a40'));
  for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) { const d = (i / 5.2) ** 2 + (j / 4.5) ** 2; if (d > 1) continue; R.pset(lx + i, ly + j, d > 0.75 ? hex('#e8c888') : i < -1 && j < 0 ? hex('#fffef0') : hex('#fff0c4')); }
  for (let j = 5; j < 14; j++) for (let i = -9; i <= 9; i++) if (((lx + i + j) & 1) === 0 && Math.abs(i) < 5 + j * 0.5 && h(i, j, 89) < 0.5) { const X = lx + i, Y = ly + j; R.pset(X, Y, d_mezcla(R.pget(X, Y), d_CF.luzC, 0.2)); }
}

// el cochecito de bebé de capota (x: el borde izquierdo de la cesta, suelo: donde apoyan las ruedas, e: escala), con el
// bebé dormido bajo la mantita; se mece un poco
function d_carrito(R, x, suelo, t, e = 1) {
  const m = Math.round(Math.sin(t * 1.4) * 0.8), L = Math.round(30 * e), A = Math.round(12 * e), yb = suelo - Math.round(11 * e) + m, AZ = hex('#22304e'), AZL = hex('#3a4c74'), AZS = hex('#141c30');
  // las ruedas de radios
  for (const wx of [x + Math.round(5 * e), x + L - Math.round(5 * e)]) { const r = Math.round(5 * e); R.disco(wx, suelo - r, r, hex('#1a1a20')); R.disco(wx, suelo - r, r - 1.2, hex('#c8ccd4')); R.disco(wx, suelo - r, r - 2, hex('#2a2a32'));
    for (let a = 0; a < 6; a++) { const an = a / 6 * Math.PI * 2 + t * 0.2; R.linea(wx, suelo - r, Math.round(wx + Math.cos(an) * (r - 2)), Math.round(suelo - r + Math.sin(an) * (r - 2)), hex('#a4a8b4')); } R.pset(wx, suelo - r, hex('#e8e8f0')); }
  R.linea(x + Math.round(5 * e), suelo - Math.round(5 * e), x + Math.round(10 * e), yb, hex('#8a8e9a')); R.linea(x + L - Math.round(5 * e), suelo - Math.round(5 * e), x + L - Math.round(10 * e), yb, hex('#8a8e9a'));
  // la cesta, con su ribete cromado
  d_redondo(R, x, yb - A, x + L, yb, Math.round(4 * e), (X, Y) => (Y === yb - A ? AZL : Y > yb - 2 ? AZS : X > x + L - 3 ? AZS : AZ));
  R.rect(x + 2, yb - A + 2, x + L - 2, yb - A + 2, hex('#c8ccd4'));
  // la capota plegable con sus varillas
  for (let j = 0; j <= Math.round(13 * e); j++) for (let i = 0; i <= Math.round(13 * e); i++) { const d = Math.hypot(i, j) / (13 * e); if (d > 1) continue; const X = x + L - i, Y = yb - A - j; R.pset(X, Y, d > 0.92 ? AZS : Math.round(Math.atan2(j, i) * 4) % 2 ? AZL : AZ); }
  // el bebé dormido: la cabecita, los ojos cerrados y la manta de cuadros
  const bx = x + L - Math.round(17 * e), by = yb - A - Math.round(2 * e);
  R.disco(bx, by, 3 * e, d_C.piel); R.pset(Math.round(bx - 1), Math.round(by), d_C.pielS); R.pset(Math.round(bx + 1), Math.round(by), d_C.pielS); R.rect(Math.round(bx - 3 * e), Math.round(by - 3 * e), Math.round(bx + 1), Math.round(by - 2 * e), hex('#f0e8d8'));
  for (let i = 0; i < Math.round(14 * e); i++) for (let j = 0; j < 3; j++) R.pset(x + Math.round(3 * e) + i, yb - A + j - 1, ((i >> 1) + j) & 1 ? hex('#e8a8b8') : hex('#f4f0ea'));
  // el asa cromada
  R.linea(x, yb - A + 2, x - Math.round(8 * e), yb - A - Math.round(10 * e), hex('#a4a8b4')); R.rect(x - Math.round(10 * e), yb - A - Math.round(11 * e), x - Math.round(6 * e), yb - A - Math.round(10 * e), hex('#2a2a32'));
  // la respiración del bebé: una burbujita que sube despacio
  const u = (t * 0.5) % 1; if (u < 0.6) { const yy = Math.round(by - 4 - u * 8); R.pset(Math.round(bx + 3 + u * 3), yy, hex('#e8eef8')); }
}

// una taza de café con su plato (x, y: el centro de la base)
function d_taza(R, x, y, t, vapor = true) {
  R.rect(x - 5, y, x + 5, y, hex('#e8e4dc')); R.rect(x - 6, y + 1, x + 6, y + 1, hex('#b8b4ac'));
  R.rect(x - 3, y - 5, x + 3, y - 1, hex('#f6f4ee')); R.rect(x + 2, y - 5, x + 3, y - 1, hex('#d0ccc4')); R.rect(x - 3, y - 5, x + 3, y - 5, hex('#5a3420')); R.pset(x + 4, y - 4, hex('#d0ccc4')); R.pset(x + 5, y - 3, hex('#d0ccc4')); R.pset(x + 4, y - 2, hex('#d0ccc4'));
  if (vapor) d_vapor(R, x, y - 7, t, x, hex('#ffffff'), 10);
}

// una silla de café de madera curvada (x: el centro, suelo, dir: hacia dónde mira el asiento)
function d_sillaCafe(R, x, suelo, dir = 1) {
  const c = hex('#3a2216'), cL = hex('#6a4028');
  R.rect(x - 5, suelo - 10, x + 5, suelo - 9, cL); R.rect(x - 5, suelo - 8, x + 5, suelo - 8, c);
  for (const lx of [x - 4, x + 4]) R.rect(lx, suelo - 7, lx, suelo, c);
  const bx = x - 5 * dir; R.rect(bx, suelo - 22, bx, suelo - 9, c); R.rect(bx + dir * 2, suelo - 21, bx + dir * 2, suelo - 13, cL);
  for (let i = 0; i <= 4; i++) R.pset(bx + dir * i, suelo - 22 - (i > 0 && i < 4 ? 1 : 0), c);
}

// una mesita redonda de café de mármol con pie de hierro (x: el centro, y: el tablero)
function d_mesaCafe(R, x, y, suelo, w = 12) {
  R.rect(x - w, y, x + w, y + 1, hex('#e8e4dc')); R.rect(x - w, y, x + w, y, hex('#fbfaf6')); R.rect(x - w + 1, y + 2, x + w - 1, y + 2, hex('#8a8680'));
  R.rect(x - 1, y + 3, x + 1, suelo - 2, hex('#22222a')); R.rect(x - 6, suelo - 1, x + 6, suelo, hex('#22222a')); R.pset(x - 1, y + 3, hex('#4a4a54'));
}

function d_cafe(R, t, o, cam) {
  if (cam === 'mesa') {
    const VC = [18, 14, 222, 112], suelo = 158;
    let info;
    d_capa(R, 'real-cafe-m', () => {
      d_salaCafe(R, 96, 148);
      const c = d_calleEdimburgo(R, VC[0], VC[1], VC[2], VC[3], 2);
      const huecos = d_ventanaCafe(R, VC[0], VC[1], VC[2], VC[3], 3, 2);
      d_capas.set('real-cafe-m-info', { ...c, huecos });
      // la percha con la gabardina y la bufanda de cuadros, y un cuadrito del castillo
      R.rect(244, 46, 262, 48, hex('#3a2216')); R.rect(250, 48, 252, 52, hex('#c8a040'));
      // la gabardina colgada (cuello, hombros, manga, botones y su sombra en la pared) y la bufanda de cuadros encima
      R.poligono([[243, 57], [259, 57], [263, 94], [239, 94]], hex('#3a3428')); R.poligono([[244, 55], [258, 55], [262, 92], [240, 92]], hex('#9a865e'));
      R.poligono([[247, 53], [255, 53], [257, 60], [251, 66], [245, 60]], hex('#7a6a48')); R.linea(251, 60, 251, 92, hex('#6a5a40')); for (const by of [66, 74, 82]) R.rect(252, by, 253, by, hex('#3a2a1a'));
      R.linea(244, 58, 241, 86, hex('#7a6a48')); R.linea(258, 58, 261, 86, hex('#b8a478')); R.rect(240, 90, 262, 92, hex('#7a6a48'));
      for (let y = 54; y < 82; y++) for (let i = 0; i < 4; i++) { const X = 253 + i + (y > 70 ? 1 : 0); R.pset(X, y, i === 3 ? hex('#6a1a1a') : (y % 6 === 2 || i === 1) ? hex('#1e3a26') : (y % 6 === 4 ? hex('#e8c040') : hex('#a82a2a'))); }
      for (let i = 0; i < 4; i++) R.pset(254 + i, 82 + (i & 1), hex('#a82a2a'));
      d_marcoCastillo(R, 272, 54, 304, 82);
      d_sombra(R, 120, suelo + 2, 100, 3, 0.2);
    });
    info = d_capas.get('real-cafe-m-info');
    const enV = (x, y) => info.huecos.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
    d_vidaCalle(R, t, VC, info.acera, 2, enV);
    // las gotas que resbalan por el cristal (se paran, siguen, dejan un rastro)
    for (let i = 0; i < 16; i++) { const x = VC[0] + 4 + Math.round(h(i, 1, 90) * (VC[2] - VC[0] - 8)), v = 4 + h(i, 2, 90) * 8, per = VC[3] - VC[1] + 20, y = VC[1] - 10 + Math.floor((h(i, 3, 90) * per + t * v * (Math.sin(t * 0.7 + i) > -0.3 ? 1 : 0.2)) % per);
      for (let k = 0; k < 6; k++) if (enV(x, y - k)) R.pset(x, y - k, d_mezcla(R.pget(x, y - k), hex('#e8f0f8'), k === 0 ? 0.8 : 0.25)); if (enV(x + 1, y)) R.pset(x + 1, y, hex('#9aa8b8')); }
    if (o.carrito !== false) d_carrito(R, 246, 172, t, 1.5);
    return { suelo: 160, ventana: VC, mesa: [40, 152, 214], carrito: o.carrito !== false ? [236, 172, 300] : null };
  }
  // la cámara general: la sala entera
  const VC = [16, 32, 118, 116], suelo = 160;
  let info;
  d_capa(R, 'real-cafe-g', () => {
    d_salaCafe(R, 106, 150);
    // el techo con su cornisa de escayola
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 16 ? (y % 2 ? d_CF.techoS : d_CF.techo) : d_rampa([d_CF.techo, d_CF.techo, d_CF.techoS], y / 16 + (h(x, y, 91) - 0.5) * 0.2, x, y));
    R.rect(0, 22, 319, 23, d_CF.paredS); for (let x = 0; x < 320; x += 4) R.pset(x, 20, d_CF.techoS);
    R.rect(0, 40, 319, 40, d_CF.frisoS); R.rect(0, 41, 319, 41, d_CF.paredL);   // el listón de los cuadros
    const c = d_calleEdimburgo(R, VC[0], VC[1], VC[2], VC[3], 1);
    const huecos = d_ventanaCafe(R, VC[0], VC[1], VC[2], VC[3], 2, 3);
    d_capas.set('real-cafe-g-info', { ...c, huecos });
    d_luz(R, 30, 124, 110, 150, 0.9, 0.1);
    // en el alféizar: un geranio y una vela en una botella
    R.rect(28, 114, 36, 119, hex('#a8583a')); R.rect(28, 114, 36, 114, hex('#c8784a')); for (const [dx, dy] of [[-2, -4], [1, -6], [4, -4], [2, -2], [-1, -1]]) R.disco(32 + dx, 113 + dy, 2, hex('#3e7a34')); for (const [dx, dy] of [[0, -6], [3, -5], [-2, -4]]) R.pset(32 + dx, 113 + dy, hex('#e83a4a'));
    R.rect(100, 110, 103, 119, hex('#2a5a3a')); R.rect(101, 107, 102, 109, hex('#2a5a3a')); R.rect(100, 104, 103, 106, hex('#f0e8d0'));
    // el cuadro del castillo y la pizarra con trazos de tiza (sin letras: dibujitos y rayas)
    d_marcoCastillo(R, 146, 50, 190, 80);
    R.rect(198, 46, 236, 92, hex('#5a3a22')); R.rect(200, 48, 234, 90, hex('#1e2420')); for (let y = 52; y < 88; y += 7) { R.rect(204, y + 2, 204 + 3, y + 4, hex('#d8dcd0')); for (let x = 210; x < 226 - (y % 3) * 3; x++) R.pset(x, y + 3 + (x % 3 === 0 ? -1 : 0), hex('#c8ccc0')); R.rect(228, y + 2, 230, y + 4, hex('#e8d890')); }
    // el mostrador de madera con la cafetera cromada, la tarta bajo campana, la caja registradora y las tazas
    d_estanteCafe(R, 246, 50, 319, 96);
    R.rect(238, 118, 319, 121, hex('#e8e4dc')); R.rect(238, 118, 319, 118, hex('#fbfaf6')); R.rect(238, 122, 319, 122, d_CF.frisoS);
    d_madera(R, 240, 123, 319, 156, [d_CF.friso, d_CF.frisoS, d_CF.frisoL, d_CF.frisoS], 6, 20, true);
    for (let x = 244; x < 316; x += 20) { R.rect(x, 128, x + 15, 128, d_CF.frisoL); R.rect(x, 128, x, 150, d_CF.frisoL); R.rect(x + 15, 128, x + 15, 150, d_CF.frisoS); R.rect(x, 150, x + 15, 150, d_CF.frisoS); }
    R.rect(238, 123, 239, 156, d_CF.frisoS);
    // la cafetera
    R.rect(266, 96, 296, 117, hex('#a4aab4')); R.rect(266, 96, 296, 97, hex('#e4e8f0')); R.rect(294, 98, 296, 117, hex('#6a707c')); R.rect(266, 102, 296, 102, hex('#7a808c'));
    R.disco(281, 108, 4, hex('#1e1e26')); R.disco(281, 108, 3, hex('#f4f0e4')); R.pset(281, 106, d_C.k); R.pset(282, 107, hex('#c83a3a'));
    for (const gx of [270, 290]) { R.rect(gx - 2, 112, gx + 2, 114, hex('#2a2a32')); R.rect(gx - 1, 115, gx + 1, 115, hex('#6a707c')); }
    for (let i = 0; i < 4; i++) { R.rect(268 + i * 7, 91, 272 + i * 7, 95, hex('#f6f4ee')); R.rect(272 + i * 7, 91, 272 + i * 7, 95, hex('#c8c4bc')); }
    // la tarta bajo la campana de cristal
    R.rect(246, 115, 260, 117, hex('#c8ccd4')); R.rect(248, 110, 258, 114, hex('#e8c890')); R.rect(248, 110, 258, 111, hex('#f8f0e0')); R.rect(253, 110, 254, 114, hex('#a8583a'));
    for (let j = 0; j <= 12; j++) { const w = Math.round(Math.sqrt(1 - (j / 12.5) ** 2) * 8); R.pset(253 - w, 114 - j, hex('#d8eaf4')); R.pset(253 + w, 114 - j, hex('#a8bccc')); } R.pset(251, 105, d_C.blanco);
    // la caja registradora (teclas y ventanilla de números)
    R.rect(300, 104, 316, 117, hex('#3a3a44')); R.rect(302, 99, 314, 104, hex('#2a2a32')); R.rect(303, 100, 313, 102, hex('#3ad86a')); for (let j = 107; j < 116; j += 3) for (let i = 302; i < 314; i += 3) R.pset(i, j, hex('#c8c8d0'));
    // las mesitas del fondo con sus sillas
    d_sillaCafe(R, 160, 150, 1); d_mesaCafe(R, 176, 136, 150, 10); d_sillaCafe(R, 194, 150, -1);
    d_taza(R, 172, 135, 0, false);
    d_sombra(R, 160, suelo + 2, 150, 3, 0.18);
  });
  info = d_capas.get('real-cafe-g-info');
  const enV = (x, y) => info.huecos.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
  d_vidaCalle(R, t, VC, info.acera, 1, enV);
  for (const [x, k] of [[60, 0], [150, 1], [226, 2]]) d_lampara(R, x, 23, 18, t, k);
  // la camarera tras el mostrador (solo asoma de cintura para arriba) y el cliente del fondo, que lee el periódico
  { const bx = 272 + Math.round(Math.sin(t * 0.5) * 14); d_gente(R, bx, 128, t, { ropa: hex('#e8e4dc'), pelo: hex('#8a4a2a'), dir: Math.cos(t * 0.5) > 0 ? 1 : -1 }, (x, y) => y < 118); }
  { const pasa = (t % 7) < 0.5; R.rect(184, 128, 196, 136, hex('#5a4a6a')); R.rect(186, 122, 190, 127, d_C.piel); R.rect(186, 121, 190, 122, hex('#d8d8dc')); R.rect(178, 124, 188, 133, hex('#ece8dc')); for (let j = 126; j < 132; j += 2) R.rect(180, j, 186, j, hex('#9a9aa2')); if (pasa) R.poligono([[188, 124], [193, 126], [192, 133], [188, 133]], hex('#f4f0e6')); d_sillaCafe(R, 194, 150, -1); }
  d_vapor(R, 172, 127, t, 3, hex('#ffffff'), 8);
  d_vapor(R, 270, 110, t, 6, hex('#ffffff'), 14);   // la cafetera echa vapor
  if (o.carrito !== false) d_carrito(R, 26, 160, t, 1);
  return { suelo, ventana: VC, mesa: [64, 146, 112], carrito: o.carrito !== false ? [16, 160, 58] : null, mostrador: [238, 118, 319] };
}

// el estante de detrás del mostrador: dos baldas con tarros de café, teteras y botellas
function d_estanteCafe(R, x0, y0, x1, y1) {
  for (const y of [y0 + 18, y1 - 4]) { R.rect(x0, y, x1, y + 2, hex('#6a4028')); R.rect(x0, y, x1, y, hex('#8a5a38')); R.rect(x0, y + 3, x1, y + 3, d_CF.paredS); }
  for (const [y, k] of [[y0 + 18, 0], [y1 - 4, 1]]) for (let i = 0, x = x0 + 3; x < x1 - 6; i++) { const tipo = Math.floor(h(i, k, 92) * 4), w = [7, 8, 4, 6][tipo], a = [10, 8, 13, 7][tipo];
    if (tipo === 0) { R.rect(x, y - a, x + w, y - 1, hex('#d8e4e8')); R.rect(x + 1, y - a + 3, x + w - 1, y - 1, hex('#5a3420')); R.rect(x, y - a - 1, x + w, y - a, hex('#b08a40')); R.pset(x + 1, y - a + 1, d_C.blanco); }
    if (tipo === 1) { R.disco(x + 4, y - 4, 4, hex('#e8e4dc')); R.rect(x + 2, y - 9, x + 6, y - 8, hex('#e8e4dc')); R.pset(x + 8, y - 5, hex('#e8e4dc')); R.pset(x + 2, y - 6, d_C.blanco); R.rect(x + 1, y - 3, x + 7, y - 3, hex('#3a6aa8')); }
    if (tipo === 2) { const c = [hex('#3a6a3a'), hex('#8a2a2a'), hex('#c89a3a')][i % 3]; R.rect(x, y - a + 4, x + w - 1, y - 1, c); R.rect(x + 1, y - a, x + 2, y - a + 3, c); R.rect(x + 1, y - a + 5, x + 1, y - 3, d_mezcla(c, d_C.blanco, 0.4)); R.rect(x, y - 7, x + w - 1, y - 5, hex('#e8e0c8')); }
    if (tipo === 3) { R.rect(x, y - a, x + w, y - 1, hex('#c8a06a')); R.rect(x, y - a, x + w, y - a, hex('#e8c88a')); R.rect(x + w, y - a, x + w, y - 1, hex('#8a6a3a')); }
    x += w + 3; }
}

// el cuadrito del castillo de Edimburgo sobre su roca (silueta, sin letras), con su marco dorado
function d_marcoCastillo(R, x0, y0, x1, y1) {
  R.rect(x0, y0, x1, y1, hex('#a87a28')); R.rect(x0, y0, x1, y0, hex('#e8c060')); R.rect(x0, y0, x0, y1, hex('#d8b050')); R.rect(x1, y0, x1, y1, hex('#7a5418')); R.rect(x0, y1, x1, y1, hex('#7a5418'));
  const a = x0 + 3, b = x1 - 3, c = y0 + 3, d = y1 - 3;
  for (let y = c; y <= d; y++) for (let x = a; x <= b; x++) R.pset(x, y, d_rampa([hex('#e8b088'), hex('#f0c8a0'), hex('#c8d0d8')], (y - c) / (d - c), x, y));
  const W = b - a, roca = (x) => d - Math.round((d - c) * (0.15 + 0.35 * Math.sin(Math.PI * Math.min(1, (x - a) / (W * 0.8)))));
  for (let x = a; x <= b; x++) { const r = roca(x); for (let y = r; y <= d; y++) R.pset(x, y, (x + y) & 1 ? hex('#4a4a58') : hex('#3e3e4c')); }
  const cx = a + Math.round(W * 0.45), top = roca(cx);
  R.rect(cx - Math.round(W * 0.22), top - 5, cx + Math.round(W * 0.18), top, hex('#5a5466')); for (let x = cx - Math.round(W * 0.22); x <= cx + Math.round(W * 0.18); x += 2) R.pset(x, top - 6, hex('#5a5466'));
  R.rect(cx - 2, top - 9, cx + 1, top - 5, hex('#5a5466')); R.pset(cx, top - 10, hex('#5a5466'));
}

// delante en el café: la mesa de mármol de la escritora (general) o el tablero de cerca con la libreta, el café, los
// folios y el bolígrafo ('mesa'; o.escrito 0–1: cuántas líneas lleva escritas)
function d_cafeDelante(R, t, o, cam) {
  if (cam === 'mesa') {
    const y = 152; d_madera(R, 30, y, 226, y + 5, [hex('#7a4a2a'), hex('#5a3420'), hex('#9a6a40'), hex('#3e2214')], 8, 6); R.rect(30, y, 226, y, hex('#b08058'));
    R.rect(32, y + 6, 224, y + 9, hex('#5a3420')); R.rect(32, y + 10, 224, y + 10, hex('#3e2214'));
    for (const lx of [40, 214]) { R.rect(lx, y + 11, lx + 5, 179, hex('#4a2a18')); R.rect(lx, y + 11, lx + 1, 179, hex('#6a4028')); }
    // la libreta abierta con las líneas que se van escribiendo
    const nx = 96; R.poligono([[nx, y - 1], [nx + 48, y - 1], [nx + 46, y - 4], [nx + 2, y - 4]], hex('#f8f4e4')); R.rect(nx, y, nx + 48, y, hex('#c8c0a8')); R.rect(nx + 23, y - 4, nx + 24, y - 1, hex('#d8d0b8'));
    const n = Math.round((o.escrito ?? 0.5) * 10);
    for (let k = 0; k < n; k++) { const lado = k < 5 ? 0 : 1, j = k % 5; if (j > 2) continue; const yy = y - 3 + j; for (let x = nx + 4 + lado * 24; x < nx + 20 + lado * 24 - (k % 2) * 4; x++) if (h(x, k, 93) < 0.7) R.pset(x, yy, hex('#2a3a8a')); }
    R.rect(nx + 14, y - 2, nx + 26, y - 1, hex('#e8e0c8'));
    // los folios ya escritos, el bolígrafo, el café y el azucarillo
    for (let i = 0; i < 4; i++) R.rect(52 + i, y - 2 - i, 82 + i, y - 2 - i, i === 3 ? hex('#fbf8ee') : hex('#e8e2d0')); for (let x = 58; x < 80; x += 3) R.pset(x, y - 5, hex('#5a6a9a'));
    R.linea(150, y - 2, 158, y - 4, hex('#2a3a8a')); R.pset(158, y - 4, hex('#c8c8d0'));
    d_taza(R, 180, y - 1, t, true); R.rect(194, y - 2, 197, y - 1, hex('#f8f8f0'));
    return;
  }
  // general: la mesita de la escritora junto a la ventana, con su taza y su libreta
  d_mesaCafe(R, 92, 148, 160, 18); d_taza(R, 102, 147, t, true); R.rect(78, 146, 92, 147, hex('#f8f4e4')); R.rect(84, 146, 85, 147, hex('#d8d0b8')); for (let x = 79; x < 90; x += 2) R.pset(x, 146, hex('#5a6a9a'));
  d_sillaCafe(R, 70, 160, 1);
}

const d_IM = pal({
  lad: '#9a4a34', ladS: '#7a3626', ladL: '#b8644a', junta: '#5e3a30', maq: '#4a7a6e', maqS: '#34584e', maqL: '#6a9a8c', maqD: '#22382f',
  acero: '#5a6474', aceroS: '#3e4654', aceroL: '#8a94a4', hormigon: '#8e8a84', hormigonS: '#74706a', hormigonL: '#a8a49c', amarillo: '#e8c030',
  carton: '#c49a62', cartonS: '#9a7444', cartonL: '#dcb47c', cinta: '#d8c890', papel: '#f2eee2', papelS: '#cfc8b4',
});

// los colores de las tapas duras de la primera tirada (insinuadas: tapa, lomo y una franja)
const d_TAPAS = [[hex('#b8302a'), hex('#e8b830')], [hex('#c8402e'), hex('#f0d060')], [hex('#a82a28'), hex('#d8a428')]];

// los lomos de la saga entera (siete colores, sin letras), para la montaña de libros de la subasta
const d_SAGA = [[hex('#b8302a'), hex('#f0d060')], [hex('#2a5a9a'), hex('#e8c040')], [hex('#2a7a4a'), hex('#e8d890')], [hex('#6a3a8a'), hex('#e8c040')], [hex('#d87a2a'), hex('#f8e8b0')], [hex('#1e2a4a'), hex('#c8c8d8')], [hex('#8a2a3a'), hex('#e8c040')]];

// un libro de tapa dura visto de canto (x, y: arriba a la izquierda; w × 3), con su lomo dorado
// (casi siempre se ve el lomo rojo con su franja dorada; uno de cada tres, el canto de las hojas, crema con sus rayas)
function d_libroCanto(R, x, y, w, i = 0, ok = null, tapas = d_TAPAS) {
  const [c, o] = tapas[i % tapas.length], cS = d_mezcla(c, d_C.k, 0.4), ps = ok ? (X, Y, k) => { if (ok(X, Y)) R.pset(X, Y, k); } : R.pset;
  if (tapas === d_TAPAS && i % 3 === 2) { for (let k = 0; k < w; k++) { ps(x + k, y, c); ps(x + k, y + 1, k === 0 ? c : (k & 1) ? d_IM.papel : d_IM.papelS); ps(x + k, y + 2, cS); } return; }
  for (let k = 0; k < w; k++) { const ed = k === 0 || k === w - 1; ps(x + k, y, ed ? cS : d_mezcla(c, d_C.blanco, 0.15)); ps(x + k, y + 1, ed ? cS : (k === 2 || k === w - 3) ? o : c); ps(x + k, y + 2, cS); }
  ps(x + Math.round(w / 2), y + 1, o); ps(x + Math.round(w / 2) - 1, y + 1, o);
}

// el suelo de hormigón de nave: manchas de aceite, grietas, juntas de dilatación y la línea amarilla de seguridad
function d_hormigon(R, y0, y1, linea) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const q = d_vn(x * 0.05, y * 0.15, 100); let c = q > 0.65 ? d_IM.hormigonL : q < 0.3 ? d_IM.hormigonS : d_IM.hormigon;
    if (h(x, y, 101) < 0.06) c = d_IM.hormigonS; if (d_vn(x * 0.03, y * 0.2, 102) > 0.78 && ((x + y) & 1)) c = hex('#5e5a56');   // manchas
    if (x % 80 === 0) c = hex('#6a665e'); if (Math.abs(y - linea) < 2) c = (x >> 2) % 7 === 6 ? d_IM.hormigon : d_IM.amarillo; R.pset(x, y, c); }
  for (let i = 0; i < 4; i++) { let x = 20 + h(i, 1, 103) * 280, y = y0 + 4 + h(i, 2, 103) * (y1 - y0 - 6); for (let k = 0; k < 14; k++) { R.pset(Math.round(x), Math.round(y), hex('#5a564e')); x += 1; y += (h(i, k, 104) - 0.5) * 1.5; } }
  R.rect(0, y0, 319, y0, hex('#5a564e'));
}

// la pared de ladrillo de la nave, con las hiladas a soga, el hollín de arriba y la esquina de Atom apagada
function d_paredLadrillo(R, y0, y1) {
  d_sillar(R, 0, y0, 319, y1, [d_IM.lad, d_IM.ladS, d_IM.ladL, d_IM.junta], 10, 4, 105);
  for (let y = y0; y < y0 + 30; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) && h(x, y, 106) < 0.5 * (1 - (y - y0) / 30)) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#3a2a28'), 0.4));
  d_tinte(R, 276, Math.max(0, y0), 319, 46, 0.45, d_IM.lad);
}

// una cercha de acero: el cordón de arriba, el de abajo y las diagonales, hasta xMax
function d_cercha(R, y0, y1, xMax) {
  R.rect(0, y0, xMax, y0 + 2, d_IM.acero); R.rect(0, y0, xMax, y0, d_IM.aceroL); R.rect(0, y1, xMax, y1 + 2, d_IM.acero); R.rect(0, y1 + 2, xMax, y1 + 2, d_IM.aceroS);
  for (let x = 0; x < xMax; x += 20) { R.linea(x, y0 + 3, x + 10, y1 - 1, d_IM.aceroS); R.linea(x + 10, y1 - 1, x + 20, y0 + 3, d_IM.acero); R.rect(x + 10, y1 - 1, x + 11, y1, d_IM.aceroL); }
}

// un ventanal de nave con perfiles de acero y muchos cristalitos (alguno abierto, alguno más oscuro), con el cielo gris
// de fuera y una chimenea lejana
function d_ventanal(R, x0, y0, x1, y1) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = d_rampa([hex('#c8d4e0'), hex('#dce4ec'), hex('#eef2f4')], (y - y0) / (y1 - y0), x, y);
    if (x > x0 + (x1 - x0) * 0.6 && y > y1 - 20 + Math.round(Math.sin(x * 0.4) * 2)) c = hex('#a8b0bc');   // los tejados de enfrente
    if (Math.abs(x - x0 - 12) < 2 && y > y0 + 10) c = hex('#9aa2ae'); R.pset(x, y, c); }
  for (let x = x0; x <= x1; x += 8) R.rect(x, y0, x, y1, d_C.k); for (let y = y0; y <= y1; y += 7) R.rect(x0, y, x1, y, d_C.k);
  R.rect(x0 - 1, y0 - 1, x1 + 1, y0, d_IM.aceroS); R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 3, d_IM.aceroL); R.rect(x0 - 2, y1 + 4, x1 + 2, y1 + 4, d_IM.junta);
  for (let k = 0; k < 4; k++) { const cx = x0 + 1 + 8 * Math.floor(h(k, 1, 107) * ((x1 - x0) / 8)), cy = y0 + 1 + 7 * Math.floor(h(k, 2, 107) * ((y1 - y0) / 7)); R.rect(cx, cy, cx + 6, cy + 5, k ? hex('#9aa8b4') : hex('#7a8494')); if (!k) R.linea(cx, cy, cx + 6, cy + 5, hex('#e8eef4')); }
}

// el reloj de pared redondo de taller, con las agujas que avanzan
function d_relojPared(R, x, y, r, t) {
  R.disco(x, y, r + 1, d_C.k); R.disco(x, y, r, hex('#f4f2ea')); R.disco(x + 1, y + 1, r - 2, hex('#e4e0d4')); R.disco(x, y, r - 2, hex('#f8f6ee'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * (r - 1.5)), Math.round(y + Math.sin(a) * (r - 1.5)), d_C.k); }
  const am = t * 0.5, ah = 1.2 + t * 0.04; R.linea(x, y, Math.round(x + Math.sin(am) * (r - 2)), Math.round(y - Math.cos(am) * (r - 2)), d_C.k); R.linea(x, y, Math.round(x + Math.sin(ah) * (r - 4)), Math.round(y - Math.cos(ah) * (r - 4)), d_C.k);
  const as = t * 6.28 / 6; R.linea(x, y, Math.round(x + Math.sin(as) * (r - 2)), Math.round(y - Math.cos(as) * (r - 2)), hex('#c83a3a'));
}

// una caja de cartón cerrada con su cinta (x0, y0)–(x1, y1)
function d_caja(R, x0, y0, x1, y1, k = 0) {
  R.rect(x0, y0, x1, y1, d_IM.carton); R.rect(x0, y0, x1, y0 + 1, d_IM.cartonL); R.rect(x1 - 1, y0, x1, y1, d_IM.cartonS); R.rect(x0, y1, x1, y1, d_IM.cartonS);
  const cx = Math.round((x0 + x1) / 2); R.rect(cx - 1, y0, cx + 1, y1, d_IM.cinta); R.rect(x0, y0 + 2, x1, y0 + 2, d_mezcla(d_IM.carton, d_IM.cartonS, 0.5));
  if (h(k, 1, 108) < 0.6) for (let i = 0; i < 3; i++) R.rect(x0 + 3, y1 - 6 + i * 2, x0 + 8 - i, y1 - 6 + i * 2, d_IM.cartonS);   // la etiqueta (rayas)
  if (h(k, 2, 108) < 0.5) { R.rect(x1 - 8, y0 + 5, x1 - 4, y0 + 8, d_C.k); R.pset(x1 - 6, y0 + 4, d_C.k); }   // la flecha de «hacia arriba»
}

// un palé de madera (x0–x1, con su tablero arriba en y)
function d_pale(R, x0, x1, y) {
  R.rect(x0, y, x1, y + 1, hex('#c8a46a')); R.rect(x0, y + 2, x1, y + 2, hex('#8a6a3a'));
  for (let x = x0; x <= x1 - 5; x += Math.round((x1 - x0 - 5) / 2)) { R.rect(x, y + 3, x + 5, y + 5, hex('#a8844a')); R.rect(x, y + 5, x + 5, y + 5, hex('#6a4a28')); }
  R.rect(x0, y + 6, x1, y + 6, hex('#b8945a'));
}

// la pila de libros sobre el palé: columnas de libros de canto que crecen con u (0–1) hasta n filas; devuelve el tope
function d_pilaLibros(R, x0, x1, base, u, nMax, t) {
  const cols = Math.floor((x1 - x0 + 2) / 12), filas = Math.round(u * nMax); let tope = base;
  for (let c = 0; c < cols; c++) { const n = Math.max(0, filas - Math.round(h(c, 1, 109) * 2)); for (let f = 0; f < n; f++) { const dx = Math.round((h(c, f, 110) - 0.5) * 1.6); d_libroCanto(R, x0 + c * 12 + dx, base - 3 - f * 3, 11, c + f); } tope = Math.min(tope, base - 3 * n); }
  return tope;
}

function d_imprenta(R, t, o, cam) {
  const u = Math.max(0, Math.min(1, o.libros ?? 0.5));
  if (cam === 'pila') {
    const suelo = 164;
    d_capa(R, 'real-imp-p', () => {
      d_paredLadrillo(R, 0, 132);
      R.rect(0, 128, 319, 132, hex('#6a6a6e')); R.rect(0, 128, 319, 128, hex('#8a8a90'));   // el zócalo pintado
      d_hormigon(R, 133, 179, 172);
      // el corcho con las pruebas de imprenta clavadas (hojas con rayas, una foto, un esquema de tapa)
      R.rect(26, 34, 86, 76, hex('#5a3a22')); R.rect(28, 36, 84, 74, hex('#b8865a')); for (let i = 0; i < 90; i++) R.pset(28 + Math.floor(h(i, 1, 111) * 56), 36 + Math.floor(h(i, 2, 111) * 38), hex('#a07048'));
      for (const [x, y, w, a, tipo] of [[32, 40, 14, 18, 0], [50, 38, 16, 12, 1], [70, 42, 11, 15, 0], [52, 54, 14, 17, 2], [34, 60, 13, 11, 0]]) { R.rect(x + 1, y + 1, x + w + 1, y + a + 1, hex('#8a6040')); R.rect(x, y, x + w, y + a, d_IM.papel);
        if (tipo === 0) for (let j = y + 3; j < y + a - 1; j += 2) R.rect(x + 2, j, x + w - 2 - (j % 3), j, hex('#9a9aa2'));
        if (tipo === 1) { R.rect(x + 2, y + 2, x + w - 2, y + a - 2, hex('#6a9ac8')); R.rect(x + 2, y + a - 5, x + w - 2, y + a - 2, hex('#5a8a3a')); R.disco(x + w - 5, y + 4, 1.5, hex('#f8e8a0')); }
        if (tipo === 2) { R.rect(x + 2, y + 2, x + w - 2, y + a - 2, d_TAPAS[0][0]); R.rect(x + 4, y + 4, x + w - 4, y + 9, d_TAPAS[0][1]); R.rect(x + 2, y + a - 4, x + w - 2, y + a - 4, d_C.k); }
        R.pset(x + Math.round(w / 2), y + 1, hex('#e83a3a')); }
      // la balda con los botes de tinta (cian, magenta, amarillo, negro) chorreados
      R.rect(196, 72, 266, 74, d_IM.aceroL); R.rect(196, 75, 266, 75, d_IM.aceroS); R.rect(200, 76, 201, 82, d_IM.aceroS); R.rect(260, 76, 261, 82, d_IM.aceroS);
      [hex('#2aa8d8'), hex('#d82a8a'), hex('#e8d02a'), hex('#22222a'), hex('#2aa8d8')].forEach((c, i) => { const x = 200 + i * 13; R.rect(x, 60, x + 9, 71, d_IM.aceroL); R.rect(x + 8, 60, x + 9, 71, d_IM.aceroS); R.rect(x, 60, x + 9, 61, c); R.rect(x + 1, 64, x + 7, 68, c); R.rect(x + 2 + (i % 3), 62, x + 3 + (i % 3), 65, c); });
      // el final de la cinta transportadora (rodillo, banda y patas), a la izquierda
      R.rect(0, 108, 92, 111, hex('#2a2a30')); R.rect(0, 108, 92, 108, hex('#4a4a52')); R.disco(92, 111, 4, d_IM.acero); R.disco(92, 111, 2, d_IM.aceroL);
      R.rect(0, 112, 90, 116, d_IM.maq); R.rect(0, 116, 90, 117, d_IM.maqS); for (let x = 4; x < 90; x += 10) R.pset(x, 114, d_IM.maqD);
      for (const lx of [16, 70]) { R.rect(lx, 118, lx + 3, suelo - 2, d_IM.aceroS); R.rect(lx, 118, lx, suelo - 2, d_IM.aceroL); R.rect(lx - 2, suelo - 1, lx + 5, suelo, d_IM.aceroS); }
      // el palé, las cajas abiertas (con libros dentro) y la pila de cartones planos
      d_pale(R, 98, 196, 157);
      for (const [x0, x1, k] of [[256, 286, 0], [290, 318, 1]]) { R.rect(x0, 128, x1, suelo, d_IM.carton); R.rect(x0, 128, x1, 129, d_IM.cartonL); R.rect(x1 - 2, 128, x1, suelo, d_IM.cartonS);
        R.poligono([[x0, 128], [x0 - 6, 118], [x0 + 6, 120], [x0 + 10, 128]], d_IM.cartonL); R.poligono([[x1, 128], [x1 + 5, 119], [x1 - 6, 121], [x1 - 10, 128]], d_IM.cartonS);
        for (let i = 0; i < Math.floor((x1 - x0 - 4) / 6); i++) { const [c, g] = d_TAPAS[(i + k) % 3]; R.rect(x0 + 3 + i * 6, 124, x0 + 7 + i * 6, 129, c); R.pset(x0 + 5 + i * 6, 125, g); R.rect(x0 + 7 + i * 6, 124, x0 + 7 + i * 6, 129, d_mezcla(c, d_C.k, 0.4)); }
        R.rect(x0 + 2, 130, x1 - 3, 130, d_IM.cartonS); }
      for (let i = 0; i < 6; i++) R.rect(196 + (i & 1), suelo - 2 - i * 2, 232, suelo - 1 - i * 2, i & 1 ? d_IM.cartonL : d_IM.carton);
      R.rect(206, 146, 218, 150, hex('#c83a3a')); R.disco(212, 144, 3, d_IM.cinta); R.disco(212, 144, 1.4, hex('#7a5a3a'));   // los cartones planos y la pistola del precinto
      // el calendario de 1997 (rejilla de días, sin letras), el tubo de la luz y la lámpara de nave sobre la pila
      R.rect(160, 58, 186, 92, d_IM.papel); R.rect(160, 58, 186, 64, hex('#c83a3a')); d_mini(R, '1997', 165, 66, hex('#2a2a36')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R.rect(162 + i * 4, 74 + j * 4, 164 + i * 4, 76 + j * 4, (i + j * 6) === 9 ? hex('#c83a3a') : d_IM.papelS); R.pset(173, 57, d_C.k);
      R.rect(0, 20, 319, 21, hex('#8a8e94')); R.rect(0, 22, 319, 22, hex('#5a5e64')); for (let x = 30; x < 320; x += 60) R.rect(x, 19, x + 2, 23, hex('#5a5e64'));
      R.linea(148, 22, 148, 34, hex('#3a3a40')); R.poligono([[136, 40], [160, 40], [154, 34], [142, 34]], hex('#3a5a4a')); R.rect(136, 40, 160, 40, hex('#2a3a30')); R.rect(142, 41, 154, 41, hex('#fff4c8'));
      d_sombra(R, 150, suelo + 1, 60, 3, 0.25);
    });
    d_relojPared(R, 106, 52, 11, t);
    d_cono(R, 148, 42, 150, 10, 46, 0.1);
    // en la cinta, los libros llegan, se paran en el borde y caen a la pila
    const cicl = (t * 0.8) % 1;
    for (let i = 0; i < 6; i++) { const x = Math.round(-14 + ((i + cicl) / 6) * 104); if (x < 84) d_libroCanto(R, x, 105, 11, i); }
    const tope = d_pilaLibros(R, 100, 194, 157, u, 26, t);
    { const f = Math.min(1, cicl * 1.4), x = Math.round(88 + f * 30), y = Math.round(105 + f * f * Math.max(0, tope - 108)); if (cicl < 0.72) d_libroCanto(R, x, y, 11, 7); }
    // el polvillo de papel que flota en la luz
    for (let i = 0; i < 12; i++) { const x = Math.round(100 + h(i, 1, 112) * 120 + Math.sin(t * 0.5 + i) * 6), y = Math.round(30 + ((h(i, 2, 112) * 90 + t * 3) % 90)); R.pset(x, y, d_mezcla(R.pget(x, y), d_C.blanco, 0.5)); }
    return { suelo, pila: [100, tope, 194], cinta: [0, 108, 92], cajas: [256, 128, 318], libre: [196, 250] };
  }
  // la cámara general: la nave con la máquina y la cinta
  const suelo = 162;
  d_capa(R, 'real-imp-g', () => {
    d_paredLadrillo(R, 0, 152);
    R.rect(0, 140, 319, 152, hex('#5a6a6a')); R.rect(0, 140, 319, 140, hex('#7a8a8a')); for (let x = 0; x < 320; x += 4) R.pset(x, 146, hex('#4a5858'));   // el zócalo pintado
    d_hormigon(R, 153, 179, 170);
    d_cercha(R, 16, 26, 266);
    d_ventanal(R, 18, 34, 66, 88); d_ventanal(R, 90, 34, 138, 88);
    // la puerta corredera abierta al almacén del fondo (estanterías con palés de libros)
    R.rect(226, 64, 274, 140, d_IM.aceroS); R.rect(228, 66, 272, 140, hex('#3a3e44'));
    for (let y = 66; y <= 140; y++) for (let x = 228; x <= 272; x++) R.pset(x, y, d_rampa([hex('#2a2e34'), hex('#3e434a'), hex('#575c62')], (y - 66) / 74, x, y));
    for (const sy of [84, 104, 124]) { R.rect(230, sy, 270, sy + 1, hex('#c86a2a')); for (let x = 232; x < 268; x += 9) { R.rect(x, sy - 8, x + 7, sy - 1, h(x, sy, 113) < 0.5 ? d_IM.cartonS : hex('#8a6a4a')); R.rect(x + 3, sy - 8, x + 4, sy - 1, hex('#b8a070')); } }
    for (const lx of [230, 269]) R.rect(lx, 70, lx + 1, 140, hex('#2a5aa8'));
    R.rect(222, 60, 278, 63, d_IM.acero); R.rect(222, 60, 278, 60, d_IM.aceroL); for (let y = 66; y < 140; y += 8) R.rect(274, y, 276, y + 5, hex('#8a6a3a'));   // el carril y la hoja de la puerta
    // la pared: el extintor, el cartel de seguridad (pictogramas), el cuadro eléctrico con su tubo y el reloj
    R.rect(150, 112, 155, 128, hex('#c82a2a')); R.rect(150, 112, 151, 128, hex('#e85a4a')); R.rect(151, 109, 154, 111, d_C.k); R.linea(155, 110, 158, 116, d_C.k);
    R.rect(160, 40, 186, 72, d_IM.papel); R.rect(160, 40, 186, 46, hex('#2a6ac8')); R.poligono([[166, 66], [173, 52], [180, 66]], d_IM.amarillo); R.rect(172, 56, 173, 61, d_C.k); R.pset(172, 63, d_C.k);
    R.rect(194, 90, 214, 118, hex('#a8acb0')); R.rect(194, 90, 214, 90, hex('#d0d4d8')); R.rect(213, 90, 214, 118, hex('#7a7e84')); R.rect(203, 0, 205, 90, hex('#8a8e94')); R.poligono([[201, 98], [207, 98], [204, 104]], d_IM.amarillo);
    // la máquina encuadernadora: torre de alimentación, cuerpo con paneles remachados, carenado de rodillos, motor
    d_maquina(R, 10, 86, 178, 156);
    // la cinta transportadora que sale de la máquina hacia el palé
    R.rect(176, 128, 266, 131, hex('#2a2a30')); R.rect(176, 128, 266, 128, hex('#4a4a52')); R.disco(266, 131, 3.5, d_IM.acero); R.disco(266, 131, 1.6, d_IM.aceroL);
    R.rect(176, 132, 264, 136, d_IM.maq); R.rect(176, 136, 264, 137, d_IM.maqS); for (let x = 180; x < 262; x += 10) R.pset(x, 134, d_IM.maqD);
    for (const lx of [196, 248]) { R.rect(lx, 138, lx + 2, suelo - 1, d_IM.aceroS); R.rect(lx, 138, lx, suelo - 1, d_IM.aceroL); R.rect(lx - 2, suelo - 1, lx + 4, suelo, d_IM.aceroS); }
    d_pale(R, 268, 316, 155);
    // las cajas apiladas junto al palé (detrás) y una transpaleta
    d_caja(R, 290, 108, 318, 128, 1); d_caja(R, 296, 88, 318, 107, 2);
    R.rect(232, 154, 262, 156, hex('#d83a2a')); R.rect(232, 154, 262, 154, hex('#f05a4a')); R.disco(236, 158, 2, d_C.k); R.disco(258, 158, 2, d_C.k); R.rect(226, 136, 228, 156, hex('#d83a2a')); R.rect(222, 134, 232, 136, d_C.k);
    // la luz que cae de los ventanales en diagonal sobre el suelo
    d_luz(R, 30, 92, 56, 152, 0.45, 0.12); d_luz(R, 102, 92, 128, 152, 0.45, 0.12);
    d_sombra(R, 150, suelo + 1, 160, 3, 0.2);
  });
  // la vida: los pilotos del panel, la aguja del manómetro, los rodillos que giran, la cuchilla, los fluorescentes, los
  // libros en la cinta, la pila que crece, el operario del almacén y las motas en la luz
  d_maquinaVida(R, t, 10, 86, 178, 156);
  for (const lx of [180, 236]) { R.linea(lx, 29, lx, 36, hex('#4a4a52')); R.linea(lx + 30, 29, lx + 30, 36, hex('#4a4a52')); R.rect(lx - 2, 37, lx + 32, 40, hex('#d8dce0')); const on = !(lx === 236 && Math.sin(t * 13) > 0.7 && Math.sin(t * 0.9) > 0.6); R.rect(lx, 40, lx + 30, 41, on ? hex('#fbfdf8') : hex('#a8acb0'));
    if (on) for (let y = 42; y < 50; y++) for (let x = lx - 4 + (y - 42); x <= lx + 34 - (y - 42); x++) if (((x + y) & 1) === 0) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#f8fff0'), 0.25)); }
  const cicl = (t * 0.7) % 1;
  for (let i = 0; i < 7; i++) { const x = Math.round(172 + ((i + cicl) / 7) * 96); if (x < 262) d_libroCanto(R, x, 125, 10, i); }
  const tope = d_pilaLibros(R, 270, 314, 155, u, 14, t);
  // el operario del almacén, que va y viene empujando una caja (visto por la puerta: recortado a su hueco)
  { const ph = (t * 0.12) % 1, xx = 232 + Math.round((ph < 0.5 ? ph * 2 : 2 - ph * 2) * 30); d_gente(R, xx, 132, t, { anda: t, dir: ph < 0.5 ? 1 : -1, ropa: hex('#2a5aa8'), pelo: hex('#3a2a20') }, (x, y) => x >= 228 && x <= 272 && y >= 66 && y <= 140); d_caja(R, xx + (ph < 0.5 ? 5 : -12), 124, xx + (ph < 0.5 ? 13 : -4), 131, 3); }
  for (let i = 0; i < 16; i++) { const k = i & 1, x0 = k ? 102 : 30, x = Math.round(x0 + h(i, 1, 114) * 26 + Math.sin(t * 0.4 + i) * 4), y = Math.round(92 + ((h(i, 2, 114) * 58 + t * 2.5) % 58)); const xx = x + Math.round((y - 92) * 0.45); R.pset(xx, y, d_mezcla(R.pget(xx, y), d_C.blanco, 0.6)); }
  return { suelo, pila: [270, tope, 314], cinta: [176, 128, 266], maquina: [10, 86, 178], puerta: [228, 66, 272, 140] };
}

// el cuerpo de la máquina encuadernadora (la parte fija): torre de alimentación con su pila de pliegos, cuerpo de chapa
// verde con paneles remachados, carenado redondo de los rodillos, panel de mandos, motor con rejilla y la franja de peligro
function d_maquina(R, x0, y0, x1, y1) {
  // la torre de alimentación con los pliegos esperando
  R.rect(x0, y0 - 24, x0 + 30, y1, d_IM.maqD); R.rect(x0 + 1, y0 - 23, x0 + 29, y1, d_IM.maq); R.rect(x0 + 1, y0 - 23, x0 + 3, y1, d_IM.maqL); R.rect(x0 + 26, y0 - 23, x0 + 29, y1, d_IM.maqS);
  for (let k = 0; k < 9; k++) { R.rect(x0 + 5, y0 - 34 + k * 1.2 | 0, x0 + 25, (y0 - 34 + k * 1.2 | 0), k % 2 ? d_IM.papel : d_IM.papelS); } R.rect(x0 + 4, y0 - 24, x0 + 26, y0 - 23, d_IM.aceroS);
  // el cuerpo
  R.rect(x0 + 30, y0, x1, y1, d_IM.maqD); R.rect(x0 + 31, y0 + 1, x1 - 1, y1, d_IM.maq); R.rect(x0 + 31, y0 + 1, x1 - 1, y0 + 2, d_IM.maqL); R.rect(x1 - 3, y0 + 1, x1 - 1, y1, d_IM.maqS);
  for (let x = x0 + 34; x < x1 - 8; x += 34) { R.rect(x, y0 + 30, x + 30, y1 - 10, d_IM.maqS); R.rect(x + 1, y0 + 31, x + 29, y1 - 11, d_IM.maq); R.rect(x + 1, y0 + 31, x + 29, y0 + 31, d_IM.maqL); for (const [rx, ry] of [[x + 2, y0 + 32], [x + 27, y0 + 32], [x + 2, y1 - 13], [x + 27, y1 - 13]]) R.pset(rx, ry, d_IM.maqL); }
  // el carenado de los rodillos, con la ranura por donde se ven girar
  R.rect(x0 + 40, y0 - 10, x1 - 30, y0 + 22, d_IM.maqD); for (let x = x0 + 41; x <= x1 - 31; x++) for (let y = y0 - 9; y <= y0 + 21; y++) R.pset(x, y, y < y0 - 6 ? d_IM.maqL : y > y0 + 18 ? d_IM.maqS : d_IM.maq);
  R.rect(x0 + 46, y0 + 2, x1 - 36, y0 + 12, hex('#1a1e22'));
  // el panel de mandos
  R.rect(x1 - 28, y0 - 6, x1 - 4, y0 + 22, d_IM.aceroS); R.rect(x1 - 27, y0 - 5, x1 - 5, y0 + 21, hex('#d8dcd8')); R.rect(x1 - 27, y0 - 5, x1 - 5, y0 - 5, d_C.blanco);
  R.disco(x1 - 11, y0 + 15, 3, hex('#c82a2a')); R.disco(x1 - 11, y0 + 15, 2, hex('#e84a3a')); R.rect(x1 - 26, y0 + 18, x1 - 18, y0 + 20, d_IM.amarillo);
  // el motor con su rejilla y la franja de peligro de la base
  R.rect(x0 + 34, y1 - 9, x0 + 74, y1, d_IM.aceroS); for (let x = x0 + 36; x < x0 + 72; x += 3) R.rect(x, y1 - 7, x, y1 - 2, d_C.k);
  for (let x = x0 + 76; x < x1; x++) for (let y = y1 - 4; y <= y1; y++) R.pset(x, y, ((x + y) >> 2) & 1 ? d_IM.amarillo : d_C.k);
  // la boca por donde sale el libro, con la cuchilla encima (la cuchilla se mueve en d_maquinaVida)
  R.rect(x1 - 2, y1 - 30, x1, y1 - 22, d_IM.maqD); R.rect(x1 - 14, y0 + 24, x1 - 2, y0 + 28, d_IM.aceroS);
}

// lo que se mueve en la máquina: los rodillos que giran (rayas que corren), los pilotos que parpadean, la aguja del
// manómetro que tiembla y la cuchilla que sube y baja
function d_maquinaVida(R, t, x0, y0, x1, y1) {
  for (let x = x0 + 46; x <= x1 - 36; x++) for (let y = y0 + 3; y <= y0 + 11; y++) { const ry = (y - y0 - 3) % 5, s = Math.floor(x * 0.5 + t * 14 + (y > y0 + 7 ? 3 : 0)) % 4; R.pset(x, y, ry === 0 ? hex('#1a1e22') : s === 0 ? d_IM.aceroL : ry === 1 ? d_IM.acero : d_IM.aceroS); }
  const pil = [[x1 - 24, y0 - 2, hex('#3ad86a')], [x1 - 19, y0 - 2, d_IM.amarillo], [x1 - 14, y0 - 2, hex('#e84a3a')], [x1 - 24, y0 + 3, hex('#3ad86a')]];
  pil.forEach(([x, y, c], i) => { const on = Math.sin(t * (2 + i * 1.3) + i) > -0.2; R.rect(x, y, x + 2, y + 2, on ? c : d_mezcla(c, d_C.k, 0.6)); if (on) R.pset(x, y, d_C.blanco); });
  const gx = x1 - 16, gy = y0 + 8; R.disco(gx, gy, 5, d_C.k); R.disco(gx, gy, 4, hex('#f4f2ea')); const a = -0.6 + Math.sin(t * 3) * 0.15 + Math.sin(t * 17) * 0.05; R.linea(gx, gy, Math.round(gx + Math.sin(a) * 3.5), Math.round(gy - Math.cos(a) * 3.5), hex('#c82a2a'));
  const c = Math.max(0, Math.sin(t * 0.7 * Math.PI * 2)) * 4; R.rect(x1 - 13, y0 + 29 + Math.round(c), x1 - 3, y0 + 31 + Math.round(c), d_IM.aceroL); R.rect(x1 - 13, y0 + 31 + Math.round(c), x1 - 3, y0 + 31 + Math.round(c), d_C.blanco);
}

const d_PA = pal({
  yeso: '#e0c890', yesoS: '#c4a870', yesoL: '#eedcaa', viga: '#4a2e1c', vigaS: '#2e1c12', vigaL: '#6a4428', teja: '#8a4a3a', tejaS: '#5e3026', tejaL: '#a8624a',
  piedra: '#c8b898', piedraS: '#a49478', piedraL: '#dccfb2', junta: '#8a7c64', adoq: '#7a7064', adoqS: '#5a524a', adoqL: '#9a9084', barro: '#6a5a44',
  plomo: '#3a3a44', vidrioV: '#7a9a9a', vidrioL: '#b8d0c8', lejos: '#9aa8c0', lejosS: '#8494b0', toldoR: '#a8302a', toldoC: '#efe2c4',
});

// una ventanita emplomada de rombos (x0, y0)–(x1, y1), con su marco de madera; luz: de dentro sale un brillo cálido
function d_emplomada(R, x0, y0, x1, y1, luz = false) {
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, d_PA.vigaS);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x - x0 + y - y0) % 4, b = (x - x0 - (y - y0) + 400) % 4; R.pset(x, y, a === 0 || b === 0 ? d_PA.plomo : luz ? (h(x, y, 120) < 0.5 ? hex('#f0c870') : hex('#d8a858')) : (y - y0 < 2 || h(x >> 1, y >> 1, 121) < 0.2 ? d_PA.vidrioL : d_PA.vidrioV)); }
  R.rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, d_PA.viga);
}

// una casa de entramado con piso volado (x0–x1; apex: la punta del hastial; base: la calle): planta baja de piedra, dos
// pisos de yeso con postes, cruces de San Andrés y ventanas emplomadas, la viga del vuelo con su sombra, el hastial con
// el alero de teja y la chimenea; col: el tono del yeso; o.bajo false: no pinta la planta baja (la pinta la escena)
function d_entramado(R, x0, x1, apex, base, k, col = d_PA.yeso, o = {}) {
  const yB = base - 36, y1 = yB - 30, y2 = y1 - 28, cx = (x0 + x1) / 2, colS = d_mezcla(col, d_PA.yesoS, 0.6), colL = d_mezcla(col, d_PA.yesoL, 0.6);
  if (o.bajo !== false) { d_sillar(R, x0, yB, x1, base, [d_PA.piedra, d_PA.piedraS, d_PA.piedraL, d_PA.junta], 9, 5, 120 + k); R.rect(x0 + 6, yB + 10, x0 + 18, base, d_PA.vigaS); R.rect(x0 + 7, yB + 11, x0 + 17, base, d_PA.viga); R.rect(x0 + 12, yB + 11, x0 + 12, base, d_PA.vigaS); R.pset(x0 + 15, yB + 22, hex('#c8a040')); }
  // los pisos de yeso con su textura, y el hastial
  for (let y = apex; y < yB; y++) { const w = y < y2 ? (y - apex) / (y2 - apex) * (x1 - x0) / 2 : (x1 - x0) / 2 + (y < y1 ? 2 : 1); for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const q = d_vn(x * 0.2, y * 0.2, 122 + k); R.pset(x, y, q > 0.7 ? colL : q < 0.25 || h(x, y, 123) < 0.05 ? colS : col); } }
  // el entramado: postes, travesaños y cruces
  const piso = (ya, yb, xa, xb) => { const n = Math.max(2, Math.round((xb - xa) / 13)), paso = (xb - xa) / n;
    R.rect(xa, ya, xb, ya + 1, d_PA.viga); R.rect(xa, yb - 2, xb, yb, d_PA.viga); R.rect(xa, yb, xb, yb + 1, d_PA.vigaS);
    for (let i = 0; i <= n; i++) { const px = Math.round(xa + i * paso); R.rect(px, ya, px + 1, yb, d_PA.viga); R.pset(px, ya + 2, d_PA.vigaL); }
    for (let i = 0; i < n; i++) { const a = Math.round(xa + i * paso) + 2, b = Math.round(xa + (i + 1) * paso) - 1; if (h(i, ya, 124 + k) < 0.4) { R.linea(a, ya + 2, b, yb - 3, d_PA.viga); R.linea(a, yb - 3, b, ya + 2, d_PA.viga); } else if (h(i, ya, 125 + k) < 0.6) { const wx = Math.round((a + b) / 2) - 3; d_emplomada(R, wx, ya + 7, wx + 6, ya + 16, h(i, ya, 126 + k) < 0.3); } else R.rect(a, Math.round((ya + yb) / 2), b, Math.round((ya + yb) / 2), d_PA.viga); } };
  piso(y1, yB, x0 - 1, x1 + 1); piso(y2, y1, x0 - 2, x1 + 2);
  R.rect(x0 - 2, yB + 1, x1 + 2, yB + 2, d_mezcla(d_PA.piedraS, d_C.k, 0.3));   // la sombra bajo el vuelo
  // el hastial: el entramado en triángulo, el ventanuco y el alero de teja con su canto
  R.linea(cx, apex + 2, cx, y2, d_PA.viga); R.rect(Math.round(cx - (x1 - x0) / 4), Math.round((apex + y2) / 2) + 2, Math.round(cx + (x1 - x0) / 4), Math.round((apex + y2) / 2) + 3, d_PA.viga);
  d_emplomada(R, Math.round(cx) - 3, y2 - 11, Math.round(cx) + 3, y2 - 5);
  for (let s = -1; s <= 1; s += 2) for (let i = 0; i <= 5; i++) R.linea(Math.round(cx), apex - 3 + i, Math.round(cx + s * ((x1 - x0) / 2 + 5)), y2 + 2 + i, i === 0 ? d_PA.tejaL : i === 5 ? d_PA.vigaS : (i & 1) ? d_PA.teja : d_PA.tejaS);
  // la chimenea
  if (o.chimenea !== false) { const chx = Math.round(cx + (x1 - x0) * 0.22), chy = Math.round(apex + (y2 - apex) * 0.45) - 10; R.rect(chx, chy, chx + 5, chy + 12, d_PA.piedraS); R.rect(chx, chy, chx + 5, chy + 1, d_PA.piedraL); R.rect(chx + 4, chy, chx + 5, chy + 12, d_PA.junta); R.rect(chx - 1, chy - 1, chx + 6, chy - 1, d_PA.junta); return [chx + 2, chy - 2]; }
  return null;
}

// una paloma que picotea (x, y: los pies), o una gallina si gallina
function d_paloma(R, x, y, t, i, gallina = false) {
  const pica = Math.sin(t * (gallina ? 3 : 5) + i * 2) > 0.4 ? 1 : 0, ps = R.pset;
  if (gallina) { R.rect(x - 3, y - 5, x + 2, y - 2, hex('#c87a3a')); R.rect(x - 3, y - 5, x + 2, y - 5, hex('#e09a5a')); R.rect(x - 4, y - 7, x - 3, y - 5, hex('#8a4a2a')); R.rect(x + 2, y - 7 + pica * 2, x + 3, y - 5 + pica * 2, hex('#c87a3a')); ps(x + 2, y - 8 + pica * 2, hex('#d82a2a')); ps(x + 4, y - 6 + pica * 2, hex('#e8b030')); ps(x + 3, y - 7 + pica * 2, d_C.k); ps(x - 1, y - 1, hex('#e8b030')); ps(x + 1, y - 1, hex('#e8b030')); return; }
  R.rect(x - 2, y - 3, x + 1, y - 2, hex('#8a8e9e')); R.rect(x - 3, y - 3, x - 3, y - 2, hex('#5a5e6e')); ps(x + 2, y - 4 + pica * 2, hex('#7a7e8e')); ps(x + 1, y - 4 + pica, hex('#6a8a7a')); ps(x + 3, y - 4 + pica * 2, hex('#e8a040')); ps(x, y - 1, hex('#d87a5a'));
}

// los adoquines de la calle medieval, redondeados y desiguales, con barro entre ellos, el arroyo del centro y paja
function d_adoquines(R, y0, y1, arroyo) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const s = 6 + Math.round((y - y0) / (y1 - y0) * 3), f = Math.floor((y - y0) / (s * 0.7)), dx = (f & 1) * (s >> 1), i = (x + dx) % s, j = (y - y0) % Math.round(s * 0.7);
    let c = (i === 0 || j === 0) ? d_PA.barro : (i === 1 || j === 1) ? d_PA.adoqL : (i === s - 1 || j === Math.round(s * 0.7) - 1) ? d_PA.adoqS : h(Math.floor((x + dx) / s), f, 127) < 0.3 ? hex('#857a6c') : d_PA.adoq;
    if (Math.abs(y - arroyo) < 2) c = y === arroyo ? hex('#5a6a7a') : hex('#4a4a4a');
    if (h(x, y, 128) < 0.012) c = hex('#d8c070');   // briznas de paja
    R.pset(x, y, c); }
  R.rect(0, y0, 319, y0, d_PA.adoqS);
}

function d_paris(R, t, o, cam) {
  if (cam === 'casa') {
    const suelo = 172;
    d_capa(R, 'real-paris-c', () => {
      const S = [d_PA.piedra, d_PA.piedraS, d_PA.piedraL, d_PA.junta];
      d_sillar(R, 0, 0, 319, 164, S, 24, 8, 130);
      d_tinte(R, 270, 0, 319, 48, 0.4, d_PA.piedra);   // la esquina de Atom, lisa y tranquila
      d_tinte(R, 0, 0, 319, 6, 0.3, d_PA.piedraS);
      // las pilastras talladas con figuritas en relieve (insinuadas: hornacina, cabeza, túnica, sombra)
      for (const px of [22, 120, 192, 290]) { R.rect(px, 30, px + 9, 164, d_PA.piedraL); R.rect(px + 8, 30, px + 9, 164, d_PA.piedraS); R.rect(px, 30, px + 9, 31, d_PA.piedraL);
        for (let fy = 40; fy < 150; fy += 34) { if (px === 290 && fy < 50) continue; R.rect(px + 2, fy, px + 7, fy + 22, d_PA.piedraS); R.disco(px + 4.5, fy + 4, 2, d_PA.piedraL); R.poligono([[px + 3, fy + 7], [px + 6, fy + 7], [px + 7, fy + 21], [px + 2, fy + 21]], d_mezcla(d_PA.piedraL, d_PA.piedra, 0.4)); R.rect(px + 2, fy, px + 7, fy, d_PA.junta); R.linea(px + 3, fy + 10, px + 5, fy + 20, d_PA.piedraS); } }
      // la franja tallada con su labra (trazos y rosetas, sin letras) y, en el centro, la cartela del año
      R.rect(0, 84, 319, 100, d_PA.piedraL); R.rect(0, 84, 319, 84, d_C.blanco); R.rect(0, 100, 319, 101, d_PA.junta);
      for (let x = 4; x < 316; x += 6) { if (x > 124 && x < 196) continue; const tipo = Math.floor(h(x, 1, 131) * 3); if (tipo === 0) { R.disco(x + 2, 92, 2, d_PA.piedraS); R.pset(x + 2, 92, d_PA.junta); } else { R.rect(x, 88, x + 1, 96, d_PA.piedraS); R.rect(x + 3, 89 + tipo, x + 4, 95, d_PA.piedraS); R.pset(x + 1, 88, d_PA.junta); } }
      R.rect(126, 82, 194, 102, d_PA.junta); R.rect(127, 83, 193, 101, d_PA.piedraS); R.rect(128, 84, 192, 100, d_mezcla(d_PA.piedraS, d_PA.piedra, 0.5)); R.rect(128, 84, 192, 84, d_PA.junta);
      // las ventanas del piso de arriba: cruceros de piedra con cristal emplomado
      for (const wx of [50, 222]) { R.rect(wx - 3, 34, wx + 47, 78, d_PA.piedraL); R.rect(wx + 45, 34, wx + 47, 78, d_PA.piedraS); R.rect(wx - 3, 76, wx + 47, 78, d_PA.junta);
        for (const [a, b, c, d] of [[wx, 37, wx + 20, 52], [wx + 24, 37, wx + 44, 52], [wx, 56, wx + 20, 73], [wx + 24, 56, wx + 44, 73]]) d_emplomada(R, a, b, c, d, false);
        R.rect(wx + 21, 37, wx + 23, 73, d_PA.piedraL); R.rect(wx, 53, wx + 44, 55, d_PA.piedraL); }
      // planta baja: los dos huecos de tienda con arco y la puerta claveteada del centro
      for (const [a, b] of [[40, 108], [212, 280]]) { for (let y = 108; y <= 152; y++) for (let x = a; x <= b; x++) { const r = (b - a) / 2, dy = y - 108 - r * 0.45; if (dy < 0 && (x - (a + b) / 2) ** 2 + (dy / 0.45) ** 2 > r * r) continue; R.pset(x, y, d_PA.junta); }
        d_emplomada(R, a + 4, 116, b - 4, 148, true); R.rect(a - 2, 152, b + 2, 155, d_PA.piedraL); R.rect(a - 2, 156, b + 2, 156, d_PA.junta); }
      for (let y = 106; y <= 164; y++) for (let x = 140; x <= 180; x++) { const dy = y - 120; if (dy < 0 && (x - 160) ** 2 + (dy * 1.4) ** 2 > 400) continue; const borde = (x - 160) ** 2 + ((dy < 0 ? dy * 1.4 : 0)) ** 2 > 18 * 18 || x < 142 || x > 178;
        R.pset(x, y, borde ? d_PA.vigaS : ((x - 142) % 7 === 0 ? d_PA.vigaS : (x - 142) % 7 === 1 ? d_PA.vigaL : d_PA.viga)); }
      for (const hy of [126, 150]) { R.rect(143, hy, 168, hy + 1, d_C.k); R.rect(143, hy - 1, 145, hy + 2, d_C.k); }
      for (let y = 118; y < 162; y += 8) for (let x = 146; x < 176; x += 8) { R.pset(x, y, hex('#2a2a30')); R.pset(x + 1, y, hex('#8a8a90')); }
      R.disco(171, 138, 2.6, hex('#3a3a40')); R.disco(171, 138, 1.6, hex('#6a5a3a')); R.rect(170, 133, 172, 135, d_C.k);
      // el escalón, la calle y el arranque de la hiedra
      R.rect(134, 162, 186, 165, d_PA.piedraL); R.rect(134, 165, 186, 166, d_PA.junta);
      d_adoquines(R, 166, 179, 176);
      d_sombra(R, 160, 168, 140, 2, 0.2);
    });
    // el año grabado, con las cifras doradas de la serie
    a_cifras(R, String(o.anio ?? '1407'), 160, 96);
    // el farol de hierro junto a la puerta, con la llama que titila, la hiedra que se mueve y las palomas del alféizar
    { const fx = 196, fy = 108; R.linea(184, fy - 6, fx, fy - 6, d_C.k); R.linea(186, fy - 6, 186, fy, d_C.k); R.rect(fx - 4, fy - 6, fx + 4, fy - 5, d_C.k); R.rect(fx - 3, fy - 4, fx + 3, fy + 6, d_C.k); R.rect(fx - 2, fy - 3, fx + 2, fy + 5, hex('#3a3020'));
      const fl = Math.sin(t * 11) > 0 ? 1 : 0; R.rect(fx - 1, fy, fx + 1, fy + 3, hex('#f8d070')); R.pset(fx, fy - 1 - fl, hex('#fff4c0')); R.rect(fx - 1, fy + 4, fx + 1, fy + 4, hex('#e8e0c8'));
      for (let y = fy - 12; y < fy + 14; y++) for (let x = fx - 12; x < fx + 12; x++) if (((x + y) & 1) === 0 && (x - fx) ** 2 + (y - fy) ** 2 < 120 + fl * 20 && (x < fx - 3 || x > fx + 3 || y < fy - 6 || y > fy + 6)) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#ffd890'), 0.2)); }
    for (let i = 0; i < 26; i++) { const y = 70 + i * 4, x = 304 + Math.round(Math.sin(i * 0.7) * 5 + Math.sin(t * 1.5 + i * 0.5) * 1); R.disco(x, y, 2.2, i & 1 ? hex('#3e6a2e') : hex('#2e5222')); R.pset(x - 1, y - 1, hex('#5a8a40')); if (i % 3 === 0) R.linea(x, y, 312, y + 4, hex('#4a3a24')); }
    d_paloma(R, 66, 34, t, 0); d_paloma(R, 76, 34, t, 1); d_paloma(R, 240, 34, t, 2);
    { const ph = (t * 0.06) % 1; d_gente(R, -12 + ph * 344, 170, t, { anda: t, dir: 1, capucha: true, ropa: hex('#6a4a30') }); }
    return { suelo, puerta: [140, 106, 180, 164], anio: [160, 96], ventanas: [[44, 116, 104, 148], [216, 116, 276, 148]] };
  }
  // la cámara general: la calle con el puesto del escribano
  const suelo = 168, puestoSuelo = 158;
  let info;
  d_capa(R, 'real-paris-g', () => {
    const cielo = d_cielo(R, 0, 0, 319, 70, [d_C.cieloA, d_C.cieloB, d_C.cieloC, d_C.cieloD]);
    // a lo lejos, las torres de Notre-Dame y otros tejados y agujas, en la bruma
    const L = d_PA.lejos, LS = d_PA.lejosS;
    for (let x = 0; x < 320; x++) { const top = 58 - Math.round(d_vn(x * 0.08, 0, 132) * 8); for (let y = top; y <= 70; y++) R.pset(x, y, (x + y) & 1 ? L : d_mezcla(L, d_C.cieloD, 0.3)); }
    for (const tx of [84, 112]) { R.rect(tx, 28, tx + 18, 70, L); R.rect(tx + 14, 28, tx + 18, 70, LS); R.rect(tx - 1, 27, tx + 19, 28, LS); for (let x = tx + 2; x < tx + 17; x += 4) R.rect(x, 32, x + 1, 44, LS); for (let x = tx; x < tx + 19; x += 3) R.pset(x, 26, L); }
    R.rect(102, 44, 112, 70, L); R.disco(107, 50, 4, LS); R.disco(107, 50, 2.5, L); R.linea(140, 16, 137, 46, LS); R.linea(140, 16, 143, 46, LS); R.rect(138, 44, 142, 70, L);
    for (const sx of [24, 250]) { R.linea(sx, 36, sx - 3, 58, LS); R.linea(sx, 36, sx + 3, 58, LS); }
    d_capas.set('real-paris-g-info', { cielo, ch: [] });
    // las casas: entramados y la casa de piedra baja de la derecha
    const ch = [];
    ch.push(d_entramado(R, 0, 52, 30, 158, 1, hex('#e0c890')));
    ch.push(d_entramado(R, 60, 118, 24, 158, 2, hex('#e8d8b0')));
    ch.push(d_entramado(R, 126, 206, 22, 158, 3, hex('#d8b47a'), { bajo: false }));
    ch.push(d_entramado(R, 214, 262, 36, 158, 4, hex('#e4cc9c')));
    // la casa de piedra baja de la derecha (sin nada en la esquina de Atom)
    d_sillar(R, 266, 56, 319, 158, [d_PA.piedra, d_PA.piedraS, d_PA.piedraL, d_PA.junta], 12, 6, 133); R.rect(264, 52, 319, 56, d_PA.piedraS); R.rect(264, 52, 319, 52, d_PA.piedraL);
    d_emplomada(R, 276, 70, 290, 90); d_emplomada(R, 300, 70, 314, 90); d_emplomada(R, 276, 106, 290, 126, true); R.rect(298, 112, 316, 158, d_PA.vigaS); R.rect(299, 113, 315, 158, d_PA.viga);
    // los callejones entre casa y casa, en sombra
    for (const [a, b] of [[53, 59], [119, 125], [207, 213], [263, 265]]) for (let y = 40; y <= 158; y++) for (let x = a; x <= b; x++) R.pset(x, y, (x + y) & 1 ? hex('#3a3440') : hex('#4a4250'));
    // el puesto del escribano: el hueco en sombra con estantes de libros, el atril del fondo y el toldo
    for (let y = 120; y <= 158; y++) for (let x = 128; x <= 204; x++) R.pset(x, y, d_rampa([hex('#2a1e1a'), hex('#3a2a22'), hex('#4a3628')], (y - 120) / 38, x, y));
    d_sillar(R, 126, 120, 130, 158, [d_PA.piedra, d_PA.piedraS, d_PA.piedraL, d_PA.junta], 5, 5, 134); d_sillar(R, 202, 120, 206, 158, [d_PA.piedra, d_PA.piedraS, d_PA.piedraL, d_PA.junta], 5, 5, 135);
    for (const sy of [130, 142]) { R.rect(134, sy, 198, sy + 1, hex('#6a4428')); for (let x = 136, i = 0; x < 196; i++) { const w = 2 + Math.floor(h(i, sy, 136) * 3), a = 6 + Math.floor(h(i, sy, 137) * 4), c = [hex('#7a2a20'), hex('#3a4a2a'), hex('#5a3a20'), hex('#2a3048'), hex('#8a6a3a')][i % 5]; R.rect(x, sy - a, x + w - 1, sy - 1, c); R.pset(x, sy - a + 1, hex('#c8a040')); x += w + (h(i, sy, 138) < 0.2 ? 3 : 0); } }
    ch.forEach((c) => c && d_capas.get('real-paris-g-info').ch.push(c));
    d_adoquines(R, 159, 179, 163);
    // los charcos que reflejan el cielo
    for (const [cx, cy, rx] of [[48, 174, 12], [250, 176, 10]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 < 1) R.pset(cx + i, cy + j, j < 0 ? d_C.cieloC : (i + j) & 1 ? d_C.cieloB : hex('#7a8ea8'));
    d_sombra(R, 160, 159, 160, 2, 0.25);
  });
  info = d_capas.get('real-paris-g-info');
  const ok = d_nubes(R, t, [0, 0, 319, 60], info.cielo, { n: 2, esc: 1.1, v: 0.7, k: 9 });
  d_pajaros(R, t, [0, 10, 319, 40], 4, hex('#4a4a5a'), ok, 9);
  info.ch.forEach(([x, y], i) => d_vapor(R, x, y, t * (0.8 + i * 0.1), i + 20, hex('#d8dce4'), 16));
  // los pergaminos colgados en la cuerda del puesto, que se mecen, y el toldo de rayas que ondea
  R.linea(130, 123, 202, 123, hex('#8a6a4a'));
  for (let i = 0; i < 6; i++) { const x = 136 + i * 11, sw = Math.round(Math.sin(t * 1.6 + i) * 1.2), a = 9 + (i % 3) * 2; for (let j = 0; j < a; j++) for (let k = 0; k < 6; k++) R.pset(x + k + Math.round(sw * j / a), 124 + j, j === a - 1 || k === 5 ? hex('#c8b488') : (j % 3 === 1 && k > 0 && k < 5 && i % 2 ? hex('#8a7a5a') : hex('#efe2c0'))); R.pset(x + 2, 123, hex('#5a4a3a')); }
  for (let x = 122; x <= 210; x++) { const yb = 120 + Math.round((x - 122) * 0) , ond = Math.round(Math.sin(t * 4 + x * 0.35) * 0.8); for (let y = 112; y <= 119 + ond; y++) R.pset(x, y, y === 112 ? hex('#6a2018') : ((x >> 3) & 1) ? d_PA.toldoR : d_PA.toldoC); if (((x - 122) % 8) === 4) R.pset(x, 120 + ond, ((x >> 3) & 1) ? d_PA.toldoR : d_PA.toldoC); R.pset(x, yb - 9, d_PA.vigaS); }
  // el letrero colgado con la pluma (pictograma) que se balancea
  { const sw = Math.round(Math.sin(t * 1.3) * 1.5); R.linea(206, 98, 220, 98, d_C.k); R.linea(212, 98, 212 + sw, 101, d_C.k); R.rect(206 + sw, 101, 218 + sw, 111, d_PA.vigaS); R.rect(207 + sw, 102, 217 + sw, 110, hex('#c8a060')); R.linea(209 + sw, 109, 215 + sw, 103, d_C.k); R.linea(214 + sw, 103, 216 + sw, 103, hex('#f0f0f0')); R.pset(209 + sw, 110, hex('#2a2a6a')); }
  // el gato del alféizar mueve el rabo; las palomas y la gallina picotean; el agua del arroyo corre con brillos
  { const gx = 28, gy = 92, r = Math.round(Math.sin(t * 2) * 2); R.rect(gx, gy - 4, gx + 6, gy, hex('#3a3a3a')); R.rect(gx + 5, gy - 6, gx + 8, gy - 3, hex('#3a3a3a')); R.pset(gx + 5, gy - 7, hex('#3a3a3a')); R.pset(gx + 8, gy - 7, hex('#3a3a3a')); R.pset(gx + 7, gy - 5, hex('#e8d040')); R.linea(gx, gy - 2, gx - 3, gy - 5 + r, hex('#3a3a3a')); }
  d_paloma(R, 96, 166, t, 0); d_paloma(R, 104, 167, t, 1); d_paloma(R, 232, 165, t, 2); d_paloma(R, 262, 170, t, 3, true);
  for (let i = 0; i < 8; i++) { const x = Math.floor((h(i, 1, 139) * 320 + t * 18) % 320); R.pset(x, 163, hex('#c8d8e8')); R.pset((x + 1) % 320, 163, hex('#a8bcd0')); }
  // los paseantes del otro lado de la calle: un fraile, una mujer con su cesta, un aprendiz que corre
  [[0.05, hex('#6a4a30'), true, false], [0.035, hex('#8a3a3a'), false, true], [0.08, hex('#3a5a3a'), false, false]].forEach(([v, ropa, capucha, cesta], i) => { const ph = (t * v + i * 0.37) % 1, dir = i === 1 ? -1 : 1, x = dir > 0 ? -12 + ph * 344 : 332 - ph * 344; d_gente(R, x, 161, t, { anda: t * (i === 2 ? 1.6 : 1), dir, ropa, capucha, cesta, pelo: hex('#4a3020') }); });
  return { suelo, puestoSuelo, puesto: [128, 145, 204], ventanas: [] };
}

// delante en la calle de París: el mostrador del puesto del escribano (tablero con el libro abierto, el tintero con la
// pluma y una vela, y el faldón de paño que cuelga)
function d_parisDelante(R, t, o) {
  const y = 145; R.rect(124, y, 208, y + 2, hex('#8a5a32')); R.rect(124, y, 208, y, hex('#b07a48')); R.rect(124, y + 3, 208, y + 3, d_PA.vigaS);
  d_madera(R, 128, y + 4, 204, 158, [d_PA.viga, d_PA.vigaS, d_PA.vigaL, d_PA.vigaS], 140, 9, true);
  for (let x = 132; x <= 200; x++) { const ond = Math.round(Math.sin(t * 2 + x * 0.3) * 0.6); for (let yy = y + 4; yy <= y + 10 + ((x - 132) % 10 < 5 ? 1 : 0) + ond; yy++) R.pset(x, yy, (x % 6 < 1) ? hex('#2a3a6a') : hex('#3a4a8a')); }
  R.rect(132, y + 4, 200, y + 4, hex('#c8a040'));
  R.poligono([[150, y], [166, y], [168, y - 2], [148, y - 2]], hex('#efe2c0')); R.rect(158, y - 2, 158, y, hex('#c8b488')); R.rect(170, y - 3, 173, y - 1, hex('#2a2a30')); R.linea(172, y - 3, 176, y - 9, hex('#f0eee8')); R.pset(176, y - 10, hex('#d8d4cc'));
  R.rect(186, y - 6, 187, y - 1, hex('#f0e8d0')); R.rect(184, y - 1, 189, y - 1, hex('#8a6a3a')); const fl = Math.sin(t * 9) > 0 ? 1 : 0; R.pset(186 + fl, y - 7, hex('#ffd860')); R.pset(186, y - 8, hex('#fff4c0'));
}

const d_MU = pal({
  pared: '#6e2a30', paredS: '#561e24', paredL: '#84363c', zocalo: '#3a2a2e', zocaloL: '#5a4246', moldura: '#c8a868', molduraS: '#8a7040',
  parq: '#a8723e', parqS: '#82542a', parqL: '#c48c52', lapida: '#b8b0a0', lapidaS: '#8a8274', lapidaL: '#d4ccbc', lapidaD: '#6a6458',
  laton: '#d8b048', latonS: '#9a7a28', terciopelo: '#a8202e', terciopeloS: '#701420', techo: '#e8e4dc', techoS: '#c8c4bc',
});

// el parqué en espiga, con su brillo y el reflejo de una luz en xLuz
function d_parque(R, y0, y1, xLuz = -1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const a = (x + y) % 16, b = (x - y + 640) % 16, col = Math.floor((x + y) / 16) + Math.floor((x - y + 640) / 16), sube = (Math.floor(x / 8) + Math.floor(y / 8)) & 1;
    let c = (sube ? a : b) === 0 ? d_MU.parqS : h(col, sube, 140) < 0.3 ? d_mezcla(d_MU.parq, d_MU.parqS, 0.4) : h(col, sube, 141) > 0.8 ? d_MU.parqL : d_MU.parq;
    if (((sube ? b : a) % 5) === 2 && h(x, y, 142) < 0.5) c = d_mezcla(c, d_MU.parqS, 0.3);
    if (xLuz >= 0 && Math.abs(x - xLuz) < 18 - (y - y0) * 0.3 && ((x + y) & 1)) c = d_mezcla(c, d_C.blanco, 0.25);
    R.pset(x, y, c); }
  R.rect(0, y0, 319, y0, d_MU.zocalo);
}

// la pared de museo de tela granate con su textura de trama y la sombra de arriba
function d_paredMuseo(R, y0, y1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { let c = ((x + (y >> 1)) % 3 === 0) ? d_MU.paredS : d_MU.pared; const q = d_vn(x * 0.03, y * 0.05, 143); if (q > 0.8 && ((x + y) & 3) === 0) c = d_MU.paredL; if (y < y0 + 8 && ((x + y) & 1)) c = d_mezcla(c, d_C.k, 0.3 * (1 - (y - y0) / 8)); R.pset(x, y, c); }
}

// un cuadro con marco dorado (paisaje sin figuras) y su cartela de rayas debajo
function d_cuadro(R, x0, y0, x1, y1, k) {
  R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, d_MU.molduraS); R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, d_MU.moldura); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#f0d890')); R.rect(x1 + 1, y0 - 1, x1 + 2, y1 + 2, d_MU.molduraS); for (let x = x0; x < x1; x += 3) { R.pset(x, y0 - 1, hex('#e8c878')); R.pset(x, y1 + 1, d_MU.molduraS); }
  const mid = Math.round(y0 + (y1 - y0) * 0.55);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y < mid ? d_rampa([hex('#8aa0b0'), hex('#c8c0a0'), hex('#e8c890')], (y - y0) / (mid - y0), x, y) : d_rampa([hex('#5a6a3a'), hex('#4a5a30'), hex('#3a4426')], (y - mid) / (y1 - mid) + (h(x >> 1, y >> 1, 144 + k) - 0.5) * 0.4, x, y));
  for (let x = x0; x <= x1; x++) { const top = mid - Math.round(4 + 5 * d_vn(x * 0.1, k, 145)); for (let y = top; y < mid; y++) R.pset(x, y, (x + y) & 1 ? hex('#6a7a8a') : hex('#7a8a98')); }
  R.disco(x0 + (x1 - x0) * 0.7, y0 + (y1 - y0) * 0.25, 2.5, hex('#f8e8b0'));
  R.rect(Math.round((x0 + x1) / 2) - 5, y1 + 7, Math.round((x0 + x1) / 2) + 5, y1 + 11, hex('#e8e0cc')); R.rect(Math.round((x0 + x1) / 2) - 3, y1 + 9, Math.round((x0 + x1) / 2) + 3, y1 + 9, hex('#8a8478'));
}

// la lápida de Flamel (x0–x1, y0–y1): losa de caliza con el arco de arriba, tres figuras en relieve entre el sol y la
// luna, las líneas de la inscripción (trazos tallados, sin letras), una cenefa abajo, desconchones y pátina; e: escala
function d_lapida(R, x0, y0, x1, y1, e = 1) {
  const W = x1 - x0, cx = (x0 + x1) / 2;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const q = d_vn(x * 0.15 / e, y * 0.15 / e, 146), borde = x === x0 || x === x1 || y === y1;
    let c = q > 0.75 ? d_mezcla(d_MU.lapida, d_MU.lapidaL, 0.5) : q < 0.25 ? d_mezcla(d_MU.lapida, d_MU.lapidaS, 0.3) : d_MU.lapida; if (h(x, y, 147) < 0.025) c = d_mezcla(d_MU.lapida, d_MU.lapidaS, 0.6); if (d_vn(x * 0.05, y * 0.05, 148) > 0.78 && ((x + y) & 3) === 0) c = hex('#a8a088');   // la pátina
    if (borde) c = d_MU.lapidaD; if (x === x0 + 1 || y === y0) c = d_MU.lapidaL; R.pset(x, y, c); }
  // el arco tallado de la escena de arriba, en hueco
  const ya = y0 + Math.round(4 * e), yb = y0 + Math.round(W * 0.42), r = W * 0.42;
  for (let y = ya; y <= yb; y++) for (let x = x0 + Math.round(4 * e); x <= x1 - Math.round(4 * e); x++) { const d = Math.hypot(x - cx, (y - yb) * 1.2); if (d > r) continue; R.pset(x, y, d > r - 1.5 ? d_MU.lapidaD : d > r - 2.5 * e ? d_MU.lapidaL : y > yb - 2 ? d_MU.lapidaD : d_mezcla(d_MU.lapidaS, d_MU.lapida, 0.25)); }
  // el sol y la luna
  const sy = ya + Math.round(r * 0.35); R.disco(cx - r * 0.62, sy, 2.4 * e, d_MU.lapidaL); R.disco(cx - r * 0.62 + 0.6, sy + 0.6, 1.6 * e, d_MU.lapidaS); for (let a = 0; a < 8; a++) R.pset(Math.round(cx - r * 0.62 + Math.cos(a * 0.785) * 3.6 * e), Math.round(sy + Math.sin(a * 0.785) * 3.6 * e), d_MU.lapidaS);
  R.disco(cx + r * 0.62, sy, 2.4 * e, d_MU.lapidaL); R.disco(cx + r * 0.62 + 1.2 * e, sy - 0.6 * e, 2 * e, d_mezcla(d_MU.lapida, d_MU.lapidaS, 0.35));
  // las tres figuras en relieve (cabeza, manto con su sombra)
  for (const k of [-1, 0, 1]) { const fx = cx + k * r * 0.42, fh = (k === 0 ? 17 : 14) * e, fb = yb - 1;
    // la sombra del relieve, el manto (luz a la izquierda, sombra a la derecha, dos pliegues), los brazos, la cabeza y su aureola
    R.poligono([[fx - 2 * e + 1, fb - fh + 4.5 * e + 1], [fx + 2 * e + 1, fb - fh + 4.5 * e + 1], [fx + 3.5 * e + 1, fb], [fx - 3.5 * e + 1, fb]], d_MU.lapidaD);
    R.poligono([[fx - 2 * e, fb - fh + 4.5 * e], [fx + 2 * e, fb - fh + 4.5 * e], [fx + 3.5 * e, fb], [fx - 3.5 * e, fb]], d_MU.lapida);
    R.poligono([[fx - 2 * e, fb - fh + 4.5 * e], [fx, fb - fh + 4.5 * e], [fx - 0.5 * e, fb], [fx - 3.5 * e, fb]], d_MU.lapidaL);
    R.linea(Math.round(fx + 1.2 * e), Math.round(fb - fh + 7 * e), Math.round(fx + 2 * e), Math.round(fb - 1), d_MU.lapidaS); R.linea(Math.round(fx - 1.5 * e), Math.round(fb - fh + 9 * e), Math.round(fx - 2.2 * e), Math.round(fb - 1), d_MU.lapidaS);
    R.rect(Math.round(fx - 2.5 * e), Math.round(fb - fh + 7 * e), Math.round(fx + 2.5 * e), Math.round(fb - fh + 7.8 * e), d_MU.lapidaS);
    R.disco(fx + 0.5, fb - fh + 2 * e + 0.5, 2 * e, d_MU.lapidaD); R.disco(fx, fb - fh + 2 * e, 2 * e, d_MU.lapidaL); R.disco(fx + 0.6 * e, fb - fh + 2.3 * e, 1.1 * e, d_MU.lapida);
    for (let a = 3.3; a < 6.2; a += 0.25) R.pset(Math.round(fx + Math.cos(a) * 3.2 * e), Math.round(fb - fh + 2 * e + Math.sin(a) * 3.2 * e), d_MU.lapidaS); }
  // las líneas de la inscripción: trazos tallados de largo variable (sin letras), con su sombra
  const li = Math.round(5 * e), n = Math.floor((y1 - yb - 18 * e) / li);
  for (let l = 0; l < n; l++) { const y = yb + Math.round(6 * e) + l * li; let x = x0 + Math.round(5 * e); while (x < x1 - 6 * e) { const w = Math.round((2 + h(x, l, 149) * 5) * e); for (let i = 0; i < w && x + i < x1 - 5 * e; i++) { R.pset(x + i, y, d_MU.lapidaD); if (e > 1.4) { R.pset(x + i, y + 1, d_MU.lapidaD); R.pset(x + i, y + 2, d_MU.lapidaL); } else R.pset(x + i, y + 1, d_MU.lapidaL); if (h(x + i, l, 150) < 0.3) R.pset(x + i, y - 1, d_MU.lapidaD); } x += w + Math.round((1 + h(x, l, 151) * 2) * e); } }
  // la cenefa de abajo: un tallo ondulado con hojas
  const yc = y1 - Math.round(7 * e); for (let x = x0 + Math.round(5 * e); x < x1 - 5 * e; x++) { const y = Math.round(yc + Math.sin((x - x0) / (3 * e)) * 2 * e); R.pset(x, y, d_MU.lapidaD); if (((x - x0) % Math.round(6 * e)) === 0) R.disco(x, y - 2 * e * Math.sign(Math.cos((x - x0) / (3 * e))), 1.2 * e, d_MU.lapidaS); }
  // los desconchones de las esquinas
  for (const [dx, dy] of [[x0, y0], [x1 - 3 * e, y0], [x0, y1 - 4 * e], [x1 - 4 * e, y1 - 3 * e]]) if (h(dx, dy, 152) < 0.7) R.poligono([[dx, dy], [dx + 3 * e, dy], [dx, dy + 3 * e]], d_mezcla(d_MU.lapidaS, d_MU.lapidaD, 0.4));
}

// el cordón de terciopelo entre dos postes de latón (xa, xb; suelo: la base; alto del poste)
function d_cordon(R, xa, xb, suelo, alto, t) {
  for (const px of [xa, xb]) { R.rect(px - 4, suelo - 1, px + 4, suelo, d_MU.latonS); R.rect(px - 3, suelo - 2, px + 3, suelo - 2, d_MU.laton); R.rect(px - 1, suelo - alto, px + 1, suelo - 2, d_MU.laton); R.rect(px + 1, suelo - alto, px + 1, suelo - 2, d_MU.latonS); R.disco(px, suelo - alto - 1, 2, d_MU.laton); R.pset(px - 1, suelo - alto - 2, hex('#fff4c0')); }
  const sway = Math.sin(t * 0.8) * 0.6;
  for (let x = xa + 2; x <= xb - 2; x++) { const u = (x - xa) / (xb - xa), y = Math.round(suelo - alto + 1 + Math.sin(u * Math.PI) * (alto * 0.35 + sway)); R.pset(x, y, d_MU.terciopelo); R.pset(x, y + 1, d_MU.terciopeloS); if (x % 5 === 0) R.pset(x, y, hex('#c83848')); }
}

// el foco de techo y su cono de luz tramado (x: el foco; de y0 a y1, con la boca de ancho w0 y la base de ancho w1)
function d_cono(R, x, y0, y1, w0, w1, a = 0.16) {
  for (let y = y0; y <= y1; y++) { const w = w0 + (w1 - w0) * (y - y0) / (y1 - y0); for (let i = -Math.round(w); i <= Math.round(w); i++) if (((x + i + y) & 1) === 0) R.pset(x + i, y, d_mezcla(R.pget(x + i, y), hex('#fff6dc'), a)); }
}

// las motas de polvo que flotan en la luz del cono
function d_motas(R, t, x, y0, y1, w, k) {
  for (let i = 0; i < 14; i++) { const y = Math.round(y0 + ((h(i, 1, 153 + k) * (y1 - y0) + t * (1.5 + h(i, 2, 153) * 2)) % (y1 - y0))), xx = Math.round(x + (h(i, 3, 153) - 0.5) * w * (0.3 + (y - y0) / (y1 - y0)) + Math.sin(t * 0.6 + i) * 2); R.pset(xx, y, d_mezcla(R.pget(xx, y), d_C.blanco, 0.7)); }
}

// una vitrina de museo sobre su pie (x0–x1, el cristal de y0 a yv, el pie hasta el suelo) con piezas medievales: un
// alambique, un manuscrito abierto, monedas, un frasco
function d_vitrina(R, x0, x1, y0, yv, suelo, k = 0) {
  R.rect(x0 + 2, yv + 1, x1 - 2, suelo, hex('#2a2226')); R.rect(x0 + 2, yv + 1, x1 - 2, yv + 2, hex('#4a4046')); R.rect(x1 - 4, yv + 1, x1 - 2, suelo, hex('#1a1418'));
  R.rect(x0, yv - 2, x1, yv, hex('#e8e4dc'));
  const mx = Math.round((x0 + x1) / 2);
  if (k === 0) { R.disco(mx - 6, yv - 6, 4, hex('#8a5a2a')); R.disco(mx - 7, yv - 7, 1.5, hex('#c8884a')); R.rect(mx - 6, yv - 13, mx - 5, yv - 10, hex('#8a5a2a')); R.linea(mx - 5, yv - 13, mx + 2, yv - 9, hex('#8a5a2a')); R.rect(mx + 4, yv - 7, mx + 8, yv - 3, hex('#6a8a9a')); R.rect(mx + 5, yv - 9, mx + 6, yv - 8, hex('#6a8a9a')); R.pset(mx + 5, yv - 6, hex('#c8e0e8')); }
  else { R.poligono([[mx - 10, yv - 3], [mx + 10, yv - 3], [mx + 8, yv - 8], [mx - 8, yv - 8]], hex('#e8dcb8')); R.rect(mx, yv - 8, mx, yv - 3, hex('#b8a888')); for (let j = yv - 7; j < yv - 3; j += 2) { R.rect(mx - 7, j, mx - 2, j, hex('#6a4a3a')); R.rect(mx + 2, j, mx + 7, j, hex('#6a4a3a')); } R.pset(mx - 6, yv - 7, hex('#c83a3a')); for (const dx of [-12, 12]) { R.disco(mx + dx, yv - 3, 1.5, d_MU.laton); R.pset(mx + dx, yv - 4, hex('#fff0b0')); } }
  // el cristal: los cantos claros, un reflejo en diagonal
  R.rect(x0, y0, x1, y0, hex('#d8e8f0')); R.rect(x0, y0, x0, yv - 3, hex('#b8d0dc')); R.rect(x1, y0, x1, yv - 3, hex('#8aa0b0'));
  for (let y = y0 + 1; y < yv - 2; y++) for (let x = x0 + 1; x < x1; x++) { const d = (x - x0) - (y - y0); if (d > 2 && d < 5) R.pset(x, y, d_mezcla(R.pget(x, y), d_C.blanco, 0.35)); else if (((x + y) & 3) === 0) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#c8e0f0'), 0.12)); }
}

function d_museo(R, t, o, cam) {
  if (cam === 'lapida') {
    const suelo = 174;
    d_capa(R, 'real-museo-l', () => {
      d_paredMuseo(R, 0, 150);
      // la sombra de los lados (viñeta) y la mancha de luz del foco en la pared, detrás de la lápida
      for (let y = 0; y <= 150; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 150, (y - 70) / 110); if (d > 0.75 && ((x + y) & 1)) R.pset(x, y, d_mezcla(R.pget(x, y), d_C.k, Math.min(0.5, (d - 0.75) * 1.2))); else if (d < 0.5 && ((x + y) & 1)) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#e8a8a0'), (0.5 - d) * 0.35)); }
      R.rect(0, 150, 319, 156, d_MU.zocalo); R.rect(0, 150, 319, 150, d_MU.zocaloL);
      d_parque(R, 157, 179, 160);
      // la peana de piedra oscura con la cartela de latón (rayas)
      R.rect(94, 138, 226, 160, hex('#3a3436')); R.rect(94, 138, 226, 139, hex('#5a5254')); R.rect(222, 140, 226, 160, hex('#2a2426'));
      R.rect(144, 146, 176, 154, d_MU.latonS); R.rect(145, 147, 175, 153, d_MU.laton); for (const yy of [149, 151]) R.rect(149, yy, 171 - (yy - 149) * 3, yy, d_MU.latonS);
      d_lapida(R, 112, 22, 208, 137, 2.1);
      R.rect(108, 137, 212, 138, d_MU.lapidaD);
      d_sombra(R, 160, 162, 80, 3, 0.3);
    });
    d_cono(R, 160, 0, 30, 30, 70, 0.08);
    d_motas(R, t, 160, 4, 150, 120, 1);
    d_cordon(R, 52, 268, 168, 22, t);
    return { suelo, lapida: [112, 22, 208, 137], cordon: [52, 268, 168] };
  }
  // la cámara general: la sala con la lápida en el centro
  const suelo = 166;
  d_capa(R, 'real-museo-g', () => {
    // el techo con la claraboya de cristales (luz de día) y su moldura
    for (let y = 0; y < 22; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 18 ? d_MU.molduraS : (h(x, y, 154) < 0.05 ? d_MU.techoS : d_MU.techo));
    for (let y = 3; y <= 15; y++) for (let x = 60; x <= 250; x++) { const bar = (x - 60) % 19 === 0 || y === 3 || y === 15 || y === 9; R.pset(x, y, bar ? hex('#8a8a90') : d_rampa([hex('#dceaf4'), hex('#c8dcea'), hex('#e8f0f6')], ((x - 60) % 19) / 19, x, y)); }
    R.rect(0, 19, 319, 19, d_MU.moldura); R.rect(0, 21, 319, 21, d_MU.moldura);
    d_paredMuseo(R, 22, 140);
    R.rect(0, 112, 319, 114, d_MU.moldura); R.rect(0, 114, 319, 114, d_MU.molduraS);   // la moldura de la mitad
    for (let y = 115; y < 140; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 40 === 0 || x % 40 === 39) ? d_MU.zocaloL : y === 115 ? d_MU.zocaloL : (h(x, y, 155) < 0.06 ? d_MU.paredS : hex('#4a2226')));
    R.rect(0, 136, 319, 140, d_MU.zocalo);
    d_parque(R, 141, 179, 160);
    // la puerta en arco a la sala de al lado (con su cuadro lejano)
    for (let y = 56; y <= 140; y++) for (let x = 82; x <= 118; x++) { const dy = y - 74; if (dy < 0 && (x - 100) ** 2 + (dy * 1.0) ** 2 > 18 * 18) continue; const borde = (x - 100) ** 2 + (dy < 0 ? dy * dy : 0) > 16 * 16 || x < 84 || x > 116;
      R.pset(x, y, borde ? d_MU.moldura : y > 128 ? d_mezcla(d_MU.parq, d_C.blanco, 0.2) : y > 110 ? hex('#8a7a70') : hex('#a89088')); }
    R.rect(94, 82, 106, 96, d_MU.molduraS); R.rect(95, 83, 105, 95, hex('#6a7a8a')); R.rect(95, 90, 105, 95, hex('#5a6a3a'));
    d_cuadro(R, 20, 44, 66, 82, 1); d_cuadro(R, 236, 50, 268, 80, 2);
    // los focos de carril sobre los cuadros
    for (const fx of [43, 252]) { R.rect(fx - 6, 22, fx + 6, 23, hex('#2a2a30')); R.rect(fx - 1, 24, fx + 2, 28, hex('#2a2a30')); R.pset(fx, 28, hex('#fff6dc')); d_cono(R, fx, 29, 40, 3, 22, 0.12); }
    // la lápida en su peana, en el centro, bajo su foco
    d_cono(R, 160, 22, 120, 6, 34, 0.12);
    d_lapida(R, 142, 66, 178, 122, 0.8);
    R.rect(136, 123, 184, 140, hex('#3a3436')); R.rect(136, 123, 184, 124, hex('#5a5254')); R.rect(181, 125, 184, 140, hex('#2a2426')); R.rect(153, 129, 167, 133, d_MU.laton); R.rect(156, 131, 164, 131, d_MU.latonS);
    d_vitrina(R, 34, 74, 100, 124, 140, 0); d_vitrina(R, 214, 256, 100, 124, 140, 1);
    // el vigilante, sentado en su silla junto a la pared del fondo
    R.rect(292, 128, 300, 130, hex('#4a3a2a')); R.rect(292, 131, 293, 140, hex('#3a2a1a')); R.rect(299, 131, 300, 140, hex('#3a2a1a')); R.rect(299, 116, 300, 128, hex('#3a2a1a'));
    d_sombra(R, 160, 142, 36, 2, 0.35); d_sombra(R, 160, suelo + 1, 150, 3, 0.15);
  });
  // la vida: la cámara de seguridad que parpadea, el vigilante que da cabezadas y los visitantes del fondo que pasean
  R.rect(262, 24, 270, 28, hex('#d8d8dc')); R.rect(268, 23, 271, 24, hex('#8a8a90')); R.pset(263, 26, Math.sin(t * 4) > 0.3 ? hex('#ff3a3a') : hex('#6a2a2a'));
  { const cab = Math.sin(t * 0.9) > 0.6 ? 1 : 0; d_gente(R, 294, 136, t, { ropa: hex('#2a3048'), pelo: hex('#8a8a90') }); R.rect(293, 124 + cab, 297, 125 + cab, hex('#1e2236')); if (cab) R.pset(296, 128, d_C.pielS); }
  d_cordon(R, 130, 190, 150, 14, t);
  [[0.035, hex('#5a7a9a'), 1], [0.025, hex('#9a6a3a'), -1]].forEach(([v, ropa, dir], i) => { const ph = (t * v + i * 0.5) % 1, x = dir > 0 ? -10 + ph * 330 : 330 - ph * 330; if (x > 120 && x < 196) return; d_gente(R, x, 145, t, { anda: t, dir, ropa, pelo: [hex('#3a2a1a'), hex('#c8a060')][i] }); });
  // alguien cruza por la sala de al lado (recortado al arco)
  { const ph = (t * 0.08) % 1, x = 78 + ph * 46; d_gente(R, x, 130, t, { anda: t, dir: 1, ropa: hex('#3a6a5a') }, (X, Y) => X >= 85 && X <= 115 && Y >= 60 && Y <= 129); }
  d_motas(R, t, 160, 30, 120, 50, 2);
  return { suelo, lapida: [142, 66, 178, 122], cordon: [130, 190, 150], vitrinas: [[34, 74], [214, 256]], puerta: [82, 56, 118, 140] };
}

const d_SU = pal({ tela: '#1e4a3a', telaS: '#163a2e', telaL: '#2a5e4a', oro: '#c8a050', oroS: '#8a6a2a', oroL: '#f0d080', moq: '#6a1e2a', moqS: '#4e141e', moqL: '#8a2a36', pantalla: '#0e1018', madera: '#5a3420', maderaS: '#3e2214', maderaL: '#7e4c2e' });

// cifras pequeñas de 3 × 5 para las filas de la pantalla (y los números de las paletas)
const d_MINI = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111', '.': '000000000000010', ',': '000000000010100' };

function d_mini(R, s, x, y, c) { for (const ch of String(s)) { const g = d_MINI[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } return x; }

// los símbolos de las divisas en 5 × 5 (dólar, libra, euro, yen), sin letras
const d_DIVISA = ['01110101000111000101011100', '00110010000111000100011110', '00111010001111001000001110', '10001010101111100100001000'];

function d_divisa(R, k, x, y, c) { const g = d_DIVISA[k]; for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) if (g[j * 5 + i] === '1') R.pset(x + i, y + j, c); }

// la pantalla de las pujas: la cifra grande dorada (a_cifras), y debajo tres filas con la conversión a otras divisas
function d_pantallaSubasta(R, t, x0, y0, x1, y1, cifra) {
  R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#2a2a30')); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, hex('#4a4a52'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, (y & 1) ? d_SU.pantalla : hex('#141822'));
  const cx = Math.round((x0 + x1) / 2), n = Number(String(cifra).replace(/\D/g, '')) || 0;
  d_divisa(R, 0, cx - Math.round(String(cifra).length * 3.5) - 9, y0 + 8, d_SU.oroL);
  a_cifras(R, String(cifra), cx + 3, y0 + 16);
  R.rect(x0 + 4, y0 + 21, x1 - 4, y0 + 21, hex('#2a3040'));
  const tasas = [0.73, 0.86, 152];
  for (let k = 0; k < 3; k++) { const y = y0 + 25 + k * 8; if (y + 5 > y1) break; d_divisa(R, k + 1, x0 + 6, y, hex('#8ab0d8')); const v = String(Math.round(n * tasas[k])); d_mini(R, v, x1 - 6 - v.length * 4, y, Math.sin(t * 3 + k) > 0.9 ? d_C.blanco : hex('#c8d8e8')); }
}

// una araña de cristal colgada del techo (x; y: el enganche), con las lágrimas que destellan
function d_arana(R, x, y, t) {
  R.linea(x, y, x, y + 8, hex('#8a7040')); R.rect(x - 1, y + 8, x + 1, y + 10, d_SU.oro);
  for (let i = -10; i <= 10; i++) { const yy = y + 14 - Math.round(Math.sqrt(100 - i * i) * 0.3); R.pset(x + i, yy, d_SU.oro); R.pset(x + i, yy + 1, d_SU.oroS); }
  for (const i of [-10, -5, 0, 5, 10]) { const yy = y + 14 - Math.round(Math.sqrt(100 - i * i) * 0.3); R.rect(x + i, yy - 3, x + i, yy - 1, hex('#f8f0e0')); R.pset(x + i, yy - 4, hex('#ffe8a0')); R.pset(x + i, yy + 3, Math.sin(t * 5 + i) > 0.6 ? d_C.blanco : hex('#c8e0f0')); }
  R.disco(x, y + 16, 2, d_SU.oro); R.pset(x, y + 19, hex('#c8e0f0'));
  for (let j = 0; j < 16; j++) for (let i = -16; i <= 16; i++) if (((x + i + j) & 1) === 0 && i * i + (j - 8) * (j - 8) * 3 < 260 && h(i, j, 160) < 0.4) R.pset(x + i, y + 4 + j, d_mezcla(R.pget(x + i, y + 4 + j), hex('#fff0c8'), 0.15));
}

// la pared de tela verde adamascada con sus paneles de moldura dorada
function d_paredSubasta(R, y0, y1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const a = (x + 1000) % 14, b = (y + ((x / 14 | 0) & 1) * 9) % 18, mot = (Math.abs(a - 7) + Math.abs(b - 9) * 0.7) < 4 && (Math.abs(a - 7) + Math.abs(b - 9) * 0.7) > 2.6;
    let c = mot ? d_SU.telaL : ((x + y) % 4 === 0 ? d_SU.telaS : d_SU.tela); if (y < y0 + 6 && ((x + y) & 1)) c = d_SU.telaS; R.pset(x, y, c); }
}

function d_subasta(R, t, o, cam) {
  const cifra = o.cifra ?? '471000';
  if (cam === 'atril') {
    const suelo = 162;
    d_capa(R, 'real-sub-a', () => {
      d_paredSubasta(R, 0, 138);
      d_tinte(R, 270, 0, 319, 48, 0.2, d_SU.tela);
      for (const [a, b, y0] of [[38, 150, 22], [290, 330, 54]]) { R.rect(a, y0, b, 120, d_SU.oroS); R.rect(a + 1, y0 + 1, b - 1, 119, d_SU.oro); R.rect(a + 2, y0 + 2, b - 2, 118, d_SU.telaS); R.rect(a + 3, y0 + 3, b - 3, 117, d_SU.tela); }
      // en el panel, el retrato de un caballo (un lote anterior) con su marco y su aplique de luz
      R.rect(62, 38, 126, 92, d_SU.oroS); R.rect(63, 39, 125, 91, d_SU.oroL); R.rect(65, 41, 123, 89, d_SU.oro); for (let y = 44; y <= 86; y++) for (let x = 68; x <= 120; x++) R.pset(x, y, y > 72 ? d_rampa([hex('#6a7a3a'), hex('#4a5a2a')], (y - 72) / 14, x, y) : d_rampa([hex('#c8b890'), hex('#e8d0a0'), hex('#d8c8a0')], (y - 44) / 28, x, y));
      R.rect(84, 62, 104, 70, hex('#6a3a20')); R.rect(84, 62, 104, 62, hex('#8a5a30')); R.rect(102, 54, 108, 64, hex('#6a3a20')); R.rect(106, 54, 109, 58, hex('#6a3a20')); for (const lx of [85, 89, 99, 103]) R.rect(lx, 71, lx + 1, 80, hex('#4a2a14')); R.linea(84, 63, 80, 72, hex('#3a2010')); R.rect(102, 53, 103, 60, hex('#3a2010'));
      R.rect(88, 30, 100, 32, d_SU.oro); R.rect(93, 33, 95, 34, d_SU.oroS); for (let y = 35; y < 46; y++) for (let x = 94 - (y - 35) * 2; x <= 94 + (y - 35) * 2; x++) if (((x + y) & 1) === 0) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#fff0c8'), 0.15));
      // el telón de terciopelo de la izquierda, con sus pliegues y el cordón dorado
      for (let y = 0; y < 170; y++) for (let x = 0; x < 34; x++) { const p = Math.sin((x + Math.max(0, y - 90) * 0.15) * 0.7); R.pset(x, y, p > 0.5 ? hex('#a8202e') : p > -0.3 ? hex('#861826') : hex('#5a0e18')); }
      R.rect(18, 96, 34, 99, d_SU.oro); R.disco(26, 102, 2.5, d_SU.oro);
      // la lámina en su caballete (un paisaje enmarcado, el lote siguiente)
      R.linea(282, 160, 292, 88, d_SU.maderaS); R.linea(306, 160, 296, 88, d_SU.maderaS); R.rect(276, 126, 312, 128, d_SU.madera);
      R.rect(278, 96, 310, 124, d_SU.oroS); R.rect(280, 98, 308, 122, hex('#d8c8a0')); R.rect(282, 100, 306, 120, hex('#a8b8c0')); R.rect(282, 112, 306, 120, hex('#6a7a4a')); R.disco(300, 104, 2, hex('#f8e8b0'));
      R.rect(0, 139, 319, 143, d_SU.maderaS); R.rect(0, 139, 319, 139, d_SU.oro);
      for (let y = 144; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x + y * 2) % 10 === 0 || (x - y * 2 + 400) % 10 === 0) ? d_SU.moqL : (h(x, y, 161) < 0.05 ? d_SU.moqS : d_SU.moq));
      d_sombra(R, 120, suelo, 80, 3, 0.25);
    });
    d_pantallaSubasta(R, t, 166, 30, 266, 92, cifra);
    for (let y = 94; y < 104; y++) for (let x = 168 - (y - 94) * 2; x <= 264 + (y - 94) * 2; x++) if (((x + y) & 1) === 0 && h(x, y, 162) < 0.4) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#ffe8a0'), 0.12));
    return { suelo, pantalla: [166, 30, 266, 92], atril: [60, 146, 170], taco: [146, 146] };
  }
  // la cámara general: la sala entera
  const suelo = 160, sueloTarima = 150;
  d_capa(R, 'real-sub-g', () => {
    for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y > 9 ? d_SU.oroS : (h(x, y, 163) < 0.06 ? hex('#d8d0c0') : hex('#e8e0d0')));
    R.rect(0, 10, 319, 10, d_SU.oro);
    d_paredSubasta(R, 12, 134);
    d_tinte(R, 274, 12, 319, 48, 0.25, d_SU.tela);
    for (const [a, b, y0] of [[8, 84, 26], [94, 186, 26], [284, 330, 54]]) { R.rect(a, y0, b, 118, d_SU.oroS); R.rect(a + 1, y0 + 1, b - 1, 117, d_SU.oro); R.rect(a + 2, y0 + 2, b - 2, 116, d_SU.telaS); R.rect(a + 3, y0 + 3, b - 3, 115, d_SU.tela); }
    // un cuadro grande (un bodegón con jarrón) en el panel de la izquierda
    R.rect(22, 40, 70, 84, d_SU.oroS); R.rect(23, 41, 69, 83, d_SU.oroL); R.rect(25, 43, 67, 81, hex('#3a2a20')); R.disco(46, 66, 9, hex('#6a8aa8')); R.rect(43, 52, 49, 58, hex('#6a8aa8')); for (const [dx, dy, c] of [[-6, -14, hex('#d84a4a')], [3, -16, hex('#e8c040')], [8, -11, hex('#f0e8e0')], [-2, -18, hex('#d86a8a')]]) R.disco(46 + dx, 66 + dy, 3, c); R.rect(30, 76, 62, 81, hex('#5a3a28'));
    // el zócalo y la moqueta granate con su dibujo de rombos
    R.rect(0, 120, 319, 134, d_SU.maderaS); R.rect(0, 120, 319, 120, d_SU.oro); for (let x = 0; x < 320; x += 24) R.rect(x, 122, x, 133, d_SU.madera);
    for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, ((x + y * 2) % 12 === 0 || (x - y * 2 + 480) % 12 === 0) ? d_SU.moqL : (h(x, y, 164) < 0.05 ? d_SU.moqS : d_SU.moq));
    R.rect(0, 135, 319, 135, d_SU.moqS);
    // la tarima del subastador, con su canto
    R.rect(10, 142, 112, 150, d_SU.madera); R.rect(10, 142, 112, 142, d_SU.maderaL); R.rect(10, 150, 112, 151, d_SU.maderaS); for (let x = 14; x < 110; x += 12) R.rect(x, 144, x, 149, d_SU.maderaS);
    // la mesa de los teléfonos al fondo, a la derecha
    R.rect(236, 118, 318, 120, d_SU.maderaL); R.rect(236, 121, 318, 134, d_SU.madera); R.rect(236, 121, 318, 121, d_SU.maderaS); for (let x = 240; x < 316; x += 26) R.rect(x, 123, x + 22, 132, d_SU.maderaS);
    // el pedestal de la vitrina del libro y el foco
    R.rect(136, 112, 166, 152, hex('#e8e4dc')); R.rect(136, 112, 166, 113, d_C.blanco); R.rect(163, 112, 166, 152, hex('#b8b4ac')); R.rect(134, 150, 168, 152, hex('#c8c4bc'));
    d_sombra(R, 150, 153, 22, 2, 0.35); d_sombra(R, 160, suelo + 1, 150, 3, 0.15);
  });
  // la montaña de libros que crece detrás (o.montana 0–1), hasta el techo
  const m = Math.max(0, Math.min(1, o.montana ?? 0));
  const detras = (X, Y) => !(X >= 134 && X <= 168 && Y >= 112);   // la montaña queda detrás del pedestal
  if (m > 0) { const top = Math.round(134 - m * 122);
    for (let y = 134, f = 0; y - 3 >= top; y -= 3, f++) { const u = (134 - y) / 122, w = Math.round(50 * Math.sqrt(1 - u * 0.85)), off = (f & 1) * 5; for (let x = 150 - w + off; x <= 150 + w - 11; x += 11) { const dx = Math.round((h(x, f, 165) - 0.5) * 2); if (y - 6 < top && h(x, f, 166) < 0.5) continue; d_libroCanto(R, x + dx, y - 3, 11, Math.floor(h(x, f, 167) * 7), detras, d_SAGA); } }
    if (m < 1) { const fy = top - 6 - Math.round(((t * 1.5) % 1) * 8); d_libroCanto(R, 146 + Math.round(Math.sin(t * 3) * 6), fy, 10, 3, detras, d_SAGA); } }
  // la vitrina del libro: el libro de tapa dura de 1997, apoyado y en diagonal, bajo el foco
  d_cono(R, 151, 12, 112, 4, 18, 0.14);
  R.rect(140, 90, 162, 111, hex('#e8e4dc')); for (let y = 91; y < 111; y++) for (let x = 141; x < 162; x++) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#c8e0f0'), 0.2));
  R.rect(140, 90, 162, 90, hex('#e8f4fa')); R.rect(140, 90, 140, 111, hex('#d8e8f0')); R.rect(162, 90, 162, 111, hex('#8aa0b0'));
  R.poligono([[146, 109], [156, 109], [158, 95], [148, 95]], d_TAPAS[0][0]); R.poligono([[148, 102], [155, 102], [156, 97], [149, 97]], d_TAPAS[0][1]); R.linea(146, 109, 148, 95, hex('#6a1a18')); R.rect(145, 109, 157, 110, hex('#8a8e9a'));
  for (let y = 92; y < 110; y++) { const x = 152 + (y - 92) * 0.4 | 0; R.pset(x, y, d_mezcla(R.pget(x, y), d_C.blanco, 0.4)); }
  // la pantalla, las arañas y los empleados de los teléfonos (escuchan, uno levanta la mano)
  d_pantallaSubasta(R, t, 196, 36, 270, 84, cifra);
  d_arana(R, 64, 10, t); d_arana(R, 230, 10, t + 1);
  for (let i = 0; i < 3; i++) { const x = 246 + i * 26; d_gente(R, x, 124, t, { ropa: [hex('#2a2a36'), hex('#5a3a5a'), hex('#2a3a5a')][i], pelo: [hex('#3a2a1a'), hex('#c8a060'), hex('#1a1a1a')][i] }, (X, Y) => Y < 118 || X < 236); R.rect(x + 3, 120, x + 7, 121, hex('#1a1a20')); R.linea(x + 3, 117, x + 4, 114, hex('#1a1a20')); R.pset(x + 4, 113, hex('#1a1a20'));
    if (i === 1 && Math.sin(t * 1.3) > 0.3) { R.rect(x - 2, 108, x - 1, 112, d_C.piel); } R.disco(x + 10, 115, 2, hex('#e8d890')); R.rect(x + 9, 117, x + 11, 117, d_SU.oroS); }
  return { suelo, sueloTarima, pantalla: [196, 36, 270, 84], atril: [27, 138, 85], taco: [38, 134], vitrina: [140, 90, 162, 111], telefonos: [236, 118, 318] };
}

// delante en la sala de subastas: el atril de madera con su emblema (un martillo, sin letras), la lámpara de pantalla
// verde y el taco con el martillo (o.martillo false lo quita; o.golpe 0–1, el polvo del golpe); en la general, además, la
// fila de pujadores de espaldas que levantan la paleta con su número
function d_subastaDelante(R, t, o, cam) {
  const golpe = o.golpe ?? 0, pinta = (x0, y0, x1, y1, e) => {
    R.poligono([[x0 - 3 * e, y0], [x1 + 3 * e, y0], [x1 + 3 * e, y0 + 3 * e], [x0 - 3 * e, y0 + 3 * e]], d_SU.maderaL); R.rect(x0 - 3 * e, y0, x1 + 3 * e, y0, hex('#a06a40'));
    d_madera(R, x0, y0 + 3 * e + 1, x1, y1, [d_SU.madera, d_SU.maderaS, d_SU.maderaL, d_SU.maderaS], 170, Math.round(8 * e), true);
    R.rect(x0, y0 + 3 * e + 1, x1, y0 + 3 * e + 2, d_SU.maderaS); R.rect(x1 - 2 * e, y0 + 3 * e, x1, y1, d_SU.maderaS);
    const cx = Math.round((x0 + x1) / 2), cy = Math.round(y0 + (y1 - y0) * 0.5); R.disco(cx, cy, 7 * e, d_SU.oroS); R.disco(cx, cy, 6 * e, d_SU.oro); R.disco(cx, cy, 5 * e, d_SU.maderaS);
    R.linea(cx - 3 * e, cy + 3 * e, cx + 2 * e, cy - 2 * e, d_SU.oroL); R.rect(cx + Math.round(e), cy - 4 * e, cx + 4 * e, cy - Math.round(e), d_SU.oroL);
  };
  if (cam === 'atril') {
    pinta(66, 150, 172, 182, 1.6);
    // la lámpara de latón con pantalla verde y su luz sobre el tablero
    R.rect(76, 140, 78, 150, d_SU.oroS); R.rect(72, 149, 82, 150, d_SU.oro); R.poligono([[68, 140], [86, 140], [84, 134], [70, 134]], hex('#1e6a3a')); R.rect(70, 134, 84, 134, hex('#3a8a5a')); R.rect(70, 141, 84, 141, hex('#fff0b0'));
    for (let y = 142; y < 152; y++) for (let x = 64 + (142 - y); x < 92 + (y - 142); x++) if (((x + y) & 1) === 0) R.pset(x, y, d_mezcla(R.pget(x, y), hex('#fff0b0'), 0.18));
    R.rect(140, 145, 156, 149, d_SU.maderaS); R.rect(140, 145, 156, 145, d_SU.maderaL); R.pset(148, 147, d_SU.oro);
    if (o.martillo !== false) { R.rect(158, 147, 172, 148, d_SU.maderaL); R.rect(158, 149, 172, 149, d_SU.maderaS); R.rect(150, 141, 157, 149, d_SU.madera); R.rect(150, 141, 157, 141, d_SU.maderaL); R.rect(150, 144, 157, 144, d_SU.oro); }
    if (golpe > 0 && golpe < 0.4) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI, r = 4 + golpe * 20; R.pset(Math.round(148 + Math.cos(a) * r * 1.4), Math.round(145 - Math.sin(a) * r * 0.5), hex('#f0e0b0')); }
    return;
  }
  pinta(30, 138, 82, 160, 1);
  R.rect(32, 134, 44, 137, d_SU.maderaS); R.rect(32, 134, 44, 134, d_SU.maderaL); R.pset(38, 135, d_SU.oro);
  if (o.martillo !== false) { R.rect(34, 130, 39, 133, d_SU.madera); R.rect(34, 130, 39, 130, d_SU.maderaL); R.rect(34, 132, 39, 132, d_SU.oro); R.rect(40, 132, 46, 132, d_SU.maderaL); }
  if (golpe > 0 && golpe < 0.4) for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI, r = 3 + golpe * 14; R.pset(Math.round(38 + Math.cos(a) * r * 1.4), Math.round(134 - Math.sin(a) * r * 0.5), hex('#f0e0b0')); }
  // la fila de pujadores de espaldas (cabeza, hombros y respaldo de la silla) y las paletas que suben
  for (let i = 0; i < 9; i++) { const x = 8 + i * 36 + (i & 1) * 4, y = 168 + (i & 1); if (x > 300) break;
    R.rect(x - 7, y + 4, x + 9, 180, hex('#3a2418')); R.rect(x - 7, y + 4, x + 9, y + 5, d_SU.oro);
    const ropa = [hex('#2a2a36'), hex('#4a3a5a'), hex('#3a4a3a'), hex('#5a3a2a')][i % 4]; R.rect(x - 5, y - 1, x + 7, y + 5, ropa); R.rect(x - 5, y - 1, x + 7, y - 1, d_mezcla(ropa, d_C.blanco, 0.2));
    R.disco(x + 1, y - 5, 4.5, [hex('#3a2a1a'), hex('#c8a060'), hex('#8a8a90'), hex('#1a1a1a'), hex('#8a4a2a')][i % 5]); R.pset(x - 2, y - 7, d_mezcla([hex('#3a2a1a'), hex('#c8a060'), hex('#8a8a90'), hex('#1a1a1a'), hex('#8a4a2a')][i % 5], d_C.blanco, 0.3));
    const sube = Math.sin(t * 1.1 + i * 2.3) > 0.7; if (sube && i % 3 !== 1) { const px = x + 9, py = y - 22; R.rect(px, py + 8, px + 1, y - 1, hex('#e8e4dc')); R.rect(px - 6, py - 1, px + 7, py + 8, hex('#2a2a36')); R.rect(px - 5, py, px + 6, py + 7, hex('#f4f2ec')); d_mini(R, String(100 + i * 37), px - 5, py + 1, hex('#2a2a36')); R.rect(px - 1, y - 4, px + 2, y - 1, d_C.piel); } }
}
