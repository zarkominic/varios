// Fontanería y decorados del episodio 35 (Jumanji: la palabra que no significa nada) en el estilo canónico pixel chibi,
// al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el taller y la casa del escultor (taller), A2 la editorial,
// el libro de 1979 y los premios (editorial), B la casa del juego, NUESTRA y a lápiz (casaJuego), C Keene y el rodaje
// (keene), D el cine, la taquilla y los salones con tele (cine), E la selva del juego y el espacio, NUESTROS (selva) y
// F hoy (hoy).
// CUIDADO (derechos): NADA de las películas (ni actores caracterizados, ni vestuario, ni su tablero, ni sus criaturas
// tal como salen) NI de las ilustraciones del libro: el tablero, la casa, los animales y la selva son NUESTROS (el
// tablero es PIEZAS_JM.tablero: madera oscura, camino en espiral y gema verde). Las películas se cuentan con
// marquesinas SIN LETRAS, taquillas, butacas y contadores. Robin Williams, sin caracterizar. Su muerte: solo velas y
// flores al pie de una pared. Sin letras (solo números, rayas e iconos). Nada morboso.
// LA CASA DEL JUEGO VA COMO DIBUJADA A LÁPIZ: en grises (C.lapiz, C.lapizM, C.lapizL sobre C.papel), con trama de
// grafito y sombras suaves, como una lámina; o.color 0–1 la lleva al color (por omisión 0).
// Los personajes son los de ELENCO_JM y las piezas, PIEZAS_JM (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14; las cifras del año
// bajan hasta y ≈ 20: nada en y 15–20 bajo x 20–45), también.
//
//   import * as T from '/atomo/plato/escenas/jm-comun.js';
//   const { E, R, M } = await T.preparar('jm-gancho');
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
// las piezas del episodio (PIEZAS_JM: el tablero, los dados, la caja del juego, el cartucho, la consola, el perro
// blanco, la medalla, la liana…), las crea el reparto
export const PIEZAS_JM = KIT.PIEZAS_JM || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el gris de lápiz de la casa del juego (tres tonos y el papel), el ladrillo de Nueva Inglaterra, el terciopelo del
    // cine, el verde de la selva del juego, la madera oscura del tablero y el ámbar del flexo
    lapiz: '#3a3a40', lapizM: '#7a7a82', lapizL: '#b8b8be', papel: '#ecebe4', papelS: '#cfcdc2', ladrillo: '#a8553e',
    ladrilloS: '#7c3a2a', ladrilloL: '#c87458', terciopelo: '#8a2434', terciopeloS: '#5e1622', selva: '#2e7a42',
    selvaS: '#1c5230', selvaL: '#5cb060', tablero: '#5a3a22', tableroS: '#3a2414', flexo: '#ffd890', nieve: '#f0f4fa',
    nieveS: '#b8c8e0', tinta: '#2a2a3a',
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
  const E = await escena(id, 'ep35');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1949–1981 (el escultor y el libro), 1981–1995 (la medalla y el cine), 1995–2017 (la caja
  // cerrada), 2017–2027 (el cartucho y lo nuevo)
  Object.assign(R.ICONOS, {
    lapiz: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    dado: ['.......', '.#####.', '.#.#.#.', '.#...#.', '.#.#.#.', '.#####.', '.......'],
    caja: ['.......', '#######', '#.....#', '#######', '#.....#', '#######', '.......'],
    cartucho: ['.#####.', '.#...#.', '.#...#.', '.#####.', '.#####.', '.#.#.#.', '.#.#.#.'],
  });
  R.tramosTiempo([[1949, 1981, R.PALA.ORO, 'lapiz'], [1981, 1995, R.PALA.ROJO, 'dado'], [1995, 2017, R.PALA.AZUL ?? R.PALA.ROJO, 'caja'], [2017, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'cartucho']]);
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


// ── A · Providence: el taller del escultor, la clase y la casa de noche (1949–1981) ───────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en tallerDelante (se llama después de los actores).

//   'taller': el taller de un escultor joven en un edificio de ladrillo de Providence, de día: un ventanal de fábrica
//     con tejados, chimeneas y una iglesia (recortado), esculturas de madera a medio hacer sobre peanas (formas
//     geométricas raras: un cono con ventanas, una casa que se inclina), banco de carpintero con gubias, serrín en el
//     suelo, tablones, un radiador de hierro bajo la ventana. o.frio 0–1: cae la tarde de invierno, la luz se vuelve
//     azul, el radiador se apaga (deja de temblar el aire sobre él), aparece escarcha en los cristales y vaho. Cámara
//     'banco': el banco de carpintero de cerca, en tres cuartos: una escultura a medias, el mazo, las gubias en su
//     rollo de tela, virutas que caen (o.virutas), una taza.
//   'clase': un aula de dibujo de una escuela de diseño, años setenta: caballetes en semicírculo con alumnos diminutos,
//     una tarima con un bodegón de formas (cubo, esfera, cono), ventanales altos, lámparas colgantes, tablones de
//     corcho con láminas (rayas, sin letras). Cámara 'caballete': un caballete de cerca con una lámina a medio dibujar
//     (o.trazo 0–1), el carboncillo en su repisa y, detrás, el aula desenfocada.
//   'casa': de NOCHE, un cuarto pequeño de una casa: la mesa de dibujo inclinada bajo un flexo (charco de luz ámbar),
//     la ventana con la noche, nieve fina y una farola (recortado), una estufa, una estantería, dibujos a lápiz
//     clavados en la pared (escenas quietas y raras en grises: un salón, un seto, una silla en el aire), un gato o
//     nada. La mesa va en tallerDelante. Cámara 'mesa': la mesa de dibujo DESDE ARRIBA: la hoja (x 92–228, y 40–140),
//     el lápiz negro, un montoncito de polvo de lápiz y un trapo, la goma, la luz del flexo; o.dibujo 0–1 va
//     trazando un dibujo en grises en la hoja (o.tema 'salon' por omisión: un salón tranquilo; 'rino': el mismo salón
//     con un rinoceronte; 'tablero': un tablero de juego); o.perro true: un perro blanco diminuto en la esquina de
//     la hoja. Devuelve hoja: [x0, y0, x1, y1] y libre: [...].
//   'mapa': un mapa de papel del nordeste de Estados Unidos sobre una mesa (acuarela, costa, Grandes Lagos, sin
//     letras): dos puntos marcados, uno junto a un lago (Michigan) y otro en la costa (Rhode Island), y una línea de
//     puntos que va de uno a otro (o.ruta 0–1); alrededor, un compás, un lápiz, una taza. Cámara 'costa': la costa de
//     cerca, con dos ciudades (Providence y, arriba, Boston: o.boston 0–1 traza la segunda línea), barquitos, faro.
//   'palabras': una hoja de cuaderno DESDE ARRIBA sobre la mesa de dibujo, de noche: renglones con intentos de
//     palabra hechos de RAYAS y garabatos tachados (nunca letras legibles), y al final uno rodeado con un círculo,
//     precedido de una J grande (la única letra permitida del episodio: es el gag, y una J suelta no es una palabra);
//     o.intentos 0–1 los va escribiendo y tachando; al lado, una hoja de selva dibujada. Cámara 'papelera': la
//     papelera llena de bolas de papel y una que entra (o.bola 0–1).
export function taller(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#c8b89a'), hex('#6a5038'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de taller(); se llama después de los actores, con las mismas opciones
export function tallerDelante(R, t, o = {}) {
  return {};
}

// ── A2 · Boston: las editoriales, el libro de 1979, la medalla y la carta (1979–1983) ─────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en editorialDelante (se llama después de los actores).

//   'pasillo': un pasillo largo de editoriales con puertas de cristal esmerilado a los lados (cada una con un
//     pictograma distinto: un libro, una pluma, un búho), moqueta, apliques, un paragüero, una planta; al fondo una
//     ventana. o.puertas: cuántas se han abierto y cerrado ya. Cámara 'puerta': una de las puertas de cerca, que se
//     entreabre (o.abre 0–1) y por la que sale una mano con un manuscrito ajeno (T.mano).
//   'despacho': el despacho de un editor de libros infantiles en Boston, 1979: estanterías hasta el techo con lomos de
//     colores, pilas de manuscritos, la ventana con casas de ladrillo y un tranvía (recortado), una lámpara de banquero
//     verde, una máquina de escribir, láminas de cuentos en la pared (pictogramas). La mesa va en editorialDelante.
//     Cámara 'mesa': la mesa DESDE ARRIBA con varios dibujos a lápiz en grises extendidos (o.dibujos 0–5), la carpeta
//     abierta, las gafas, una pluma estilográfica (o.pluma [x, y]), un café.
//   'libro1979': NUESTRA versión, a doble página y a pantalla completa, del primer libro: un jardín de setos
//     recortados dibujado a lápiz en grises (arcos, animales de seto: un pato, un elefante), un sendero que se pierde,
//     una verja y, al fondo, una casa alta; el papel con su grano y el pliegue central. Sobre él andan los actores
//     (suelo 140). o.perro [x, y]: dónde corre el perro blanco. Cámara 'verja': la verja del jardín de cerca, con un
//     cartel de rayas y el sendero que entra.
//   'esquinas': una mesa de madera DESDE ARRIBA con cuatro libros ilustrados abiertos (láminas en grises y alguna en
//     color: un tren en la nieve, un barco, dos hormigas, una escoba), y en una ESQUINA de cada lámina, un perro
//     blanco diminuto; o.lupa [x, y] pone una lupa que lo agranda; o.cuantos 0–4 los va encendiendo con un cerco.
//     Cámara 'esquina': una sola esquina de lámina, enorme, con el perro medio escondido tras un seto.
//   'premios': una sala de actos de 1982: escenario con cortina de terciopelo, un atril, una mesa con un paño y sobre
//     ella un libro en su atril pequeño; público diminuto en sillas plegables, lámparas de araña, una pancarta de
//     rayas. Cámara 'medalla': sobre terciopelo, de cerca, el libro fino en grises (PIEZAS_JM.libroFino) y una medalla
//     dorada que se posa en su tapa (o.medalla 0–1) con brillo; o.segunda 0–1: a su lado aparece otro libro, con un
//     tren de vapor en la nieve en la tapa, y otra medalla; un calendario de hojas pasa de 1982 a 1986 (R.numero).
//   'carta': la cocina de una casa de principios de los ochenta: mesa con mantel de cuadros, un teléfono de pared con
//     su cable rizado, la ventana con un jardín, una nevera con imanes; la carta abierta sobre la mesa (rayas). Cámara
//     'sobre': el sobre y la carta DESDE ARRIBA, con un signo de interrogación grande dibujado y un sonajero al lado.
export function editorial(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#d8c8a0'), hex('#7a5a3a'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de editorial(); se llama después de los actores, con las mismas opciones
export function editorialDelante(R, t, o = {}) {
  return {};
}

// ── B · La casa del juego (NUESTRA, dibujada a lápiz, en grises) ──────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en casaJuegoDelante (se llama después de los actores).

// TODO este decorado se ve como una lámina a lápiz: grises con trama de grafito, luz lateral suave, bordes limpios;
// o.color 0–1 lo va pasando a color (por omisión 0). Los animales son NUESTROS, también a lápiz, y los pinta el
// decorado cuando se le piden (son parte de la lámina): nada de copiar las ilustraciones del libro.
//   'parque': un parque de ciudad en otoño: un árbol grande, un banco, una farola, una verja, hojas que caen, casas
//     al fondo; al pie del árbol, una caja de juego larga y plana (o.caja true). Cámara 'arbol': el pie del árbol de
//     cerca con la caja apoyada en el tronco y una nota prendida (rayas), hojas, una ardilla.
//   'salon': un salón de casa acomodada, tranquilo: chimenea con repisa y reloj, un piano de pared, un sofá, una
//     lámpara de pie, alfombra, cuadros, la ventana con visillos. o.leon 0–1: un león tumbado SOBRE el piano (aparece);
//     o.lluvia 0–1: llueve dentro del salón (monzón: gotas, charcos, el agua sube); o.plantas 0–1: lianas y hojas
//     que crecen por las paredes; o.rino true: un rinoceronte parado en mitad de la alfombra, de perfil, tan
//     tranquilo. Cámara 'piano': el piano de cerca con el león encima, que baja una pata y toca UNA tecla (o.nota
//     0–1: la tecla se hunde y sale una nota musical), el metrónomo, las partituras (rayas).
//   'cocina': una cocina de los años cincuenta: fogones, nevera redondeada, alacenas, mesa; o.monos 0–1: una docena
//     de monos pequeños lo ponen todo patas arriba (uno en la lámpara, otro con una sartén, plátanos, platos en
//     equilibrio). Cámara 'alacena': la alacena de cerca, con dos monos que sacan latas.
//   'pasillo': un pasillo largo de la casa con puertas, un perchero, un espejo, una alfombra de pasillo; o.estampida
//     0–1: unos rinocerontes lo cruzan de izquierda a derecha levantando polvo, los cuadros se tuercen, un jarrón
//     gira. Cámara 'baja': a ras de suelo, las patas que pasan y la alfombra que se arruga.
//   'tablero': NUESTRO tablero (PIEZAS_JM.tablero) abierto sobre la alfombra del salón, DESDE ARRIBA y grande (centro
//     160, 96): el camino de casillas en espiral hasta la gema del centro, dos fichas, los dados (o.dados [a, b], o.tira
//     0–1 los hace rodar), o.avance 0–1 mueve una ficha por el camino; alrededor, el borde de la alfombra, un zapato,
//     la caja. Cámara 'gema': la gema del centro de cerca, que se nubla y deja ver dentro una hoja (o.dentro 0–1).
//   'ventana': DESDE DENTRO, una ventana de guillotina grande con sus cortinas: fuera, el parque del principio con el
//     árbol, y dos niños diminutos que se alejan corriendo con la caja (o.chicos 0–1: su recorrido); en el camino, un
//     folleto tirado. Cámara 'folleto': el folleto de instrucciones en la hierba, de cerca, con sus rayas y un
//     dibujo de dados, y unas zapatillas que pasan por encima sin mirarlo.
//   'cocina50': en COLOR cálido (no a lápiz: es un recuerdo): la mesa de una cocina de los años cincuenta con un juego
//     de mesa corriente (un tablero cuadrado de casillas de colores, fichas, billetes de juguete, un dado), un vaso
//     de leche, galletas, un reloj de pared que no avanza (o.tedio 0–1: el segundero se arrastra, una mosca). La mesa
//     va en casaJuegoDelante. Cámara 'billete': un billete de juguete de cerca en una mano de niño (T.mano), con un
//     número y una orla, y detrás el tablero desenfocado.
export function casaJuego(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#ecebe4'), hex('#7a7a82'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de casaJuego(); se llama después de los actores, con las mismas opciones
export function casaJuegoDelante(R, t, o = {}) {
  return {};
}

// ── C · Keene, New Hampshire, y el rodaje (1994–2014) ─────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en keeneDelante (se llama después de los actores).

//   'calle': la calle mayor de un pueblo de Nueva Inglaterra en otoño: edificios de ladrillo de tres plantas con
//     toldos, escaparates (pictogramas), una iglesia blanca con su aguja al fondo, arces rojos y naranjas, farolas,
//     una rotonda con un quiosco de música, coches de los noventa aparcados, gente diminuta. o.rodaje true: focos,
//     un camión de cine, vallas y cables. o.epoca 1994 | 2014 | 2025 (2025: banderines y gente disfrazada de animales
//     corriendo, diminuta). Cámara 'esquina': la esquina del edificio de ladrillo cuya pared lateral lleva el letrero,
//     vista en tres cuartos desde la acera de enfrente.
//   'pared': LA PARED lateral de ladrillo, de frente y grande (x 40–280, y 20–150): ladrillo con juntas, alguna
//     ventana cegada, una bajante, una escalera de incendios a un lado; en ella, el letrero pintado: un ZAPATO de
//     vestir enorme (PIEZAS_JM.zapatoLetrero ampliado) dentro de un marco con orlas y rayas donde irían las letras.
//     o.letrero 0–1: cuánto se ha pintado (de izquierda a derecha); o.lavable true: se ve aguado y pálido;
//     o.lavado 0–1: una franja ya borrada con esponja y agua que chorrea; o.buena 0–1: lo repasan con pintura
//     fuerte y brillante. El andamio colgante con sus cuerdas va en keeneDelante (o.andamio [y]). Cámara 'pie': el
//     PIE de esa pared, de noche, a la altura de la acera: los ladrillos de abajo y el borde inferior del letrero, la
//     acera, una farola; o.velas 0–12: velas encendidas que tiemblan; o.flores 0–1: ramos, notas dobladas (rayas) y
//     algún dibujo infantil apoyados (de día si o.dia true).
//   'plato': un plató de cine de 1994: el decorado de un salón grande de casa antigua a medio montar (bastidores por
//     detrás), una grúa con cámara, focos con sus viseras, cables, una silla de director sin letras, monitores, un
//     carrito de catering, técnicos diminutos. Cámara 'camara': junto a la cámara de cine, de cerca: el objetivo, la
//     claqueta con rayas y números (R.numero), el visor.
//   'guionistas': un despacho de guionistas: una pared de corcho llena de fichas clavadas con hilos (pictogramas: un
//     dado, un niño, un reloj, un león), una mesa con hojas arrugadas, tazas, una máquina de escribir eléctrica, una
//     papelera rebosante, la ventana con palmeras de Los Ángeles (recortado). o.fichas 0–1: se van añadiendo fichas;
//     o.epoca 1994 | 2016 (2016: portátiles y pizarra blanca). La mesa va en keeneDelante. Cámara 'relojes': en la
//     pared, dos relojes grandes lado a lado, uno que marca 10 minutos (con un libro fino debajo) y otro que marca 100
//     (con un rollo de película larguísimo que cae hasta el suelo): R.numero para las cifras.
//   'efectos': una sala de efectos por computadora de 1995: filas de estaciones de trabajo con monitores de tubo
//     enormes (ruido, barras, mallas de alambre), torres con luces, cintas, ventiladores, pósteres sin letras, cajas
//     de pizza, la sala a oscuras con la luz azul de las pantallas. Las mesas van en keeneDelante. Cámara 'pantalla':
//     UNA pantalla a cuadro completo: sobre una rejilla, un LEÓN de malla de alambre (nuestro), de perfil, sentado;
//     o.pelo 0–1: le crece la melena mechón a mechón desde la nuca, cada mechón se mueve con t; o.punta true: un
//     último mechón se queda de punta; o.monos 0–1: a un lado, tres monos de alambre esperan su turno, uno bosteza;
//     en el borde, una barra de progreso y números que bailan.
export function keene(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#a8c0d8'), hex('#a8553e'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de keene(); se llama después de los actores, con las mismas opciones
export function keeneDelante(R, t, o = {}) {
  return {};
}

// ── D · El cine, la taquilla y los salones con tele (1995–2026) ───────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en cineDelante (se llama después de los actores).

//   'fachada': un cine de calle con MARQUESINA SIN LETRAS (renglones de rayas, bombillas que corren en fila, un
//     pictograma: un dado), la taquilla acristalada, carteleras con siluetas (hojas, un dado), la acera, farolas.
//     o.epoca 1995 (nieve, coches de los noventa, abrigos) | 2005 (casi nadie: una bolsa que rueda, la taquillera
//     bosteza) | 2017 | 2019 | 2026 (nieve y adornos de Navidad); o.cola 0–1: una cola de gente diminuta que crece
//     hasta doblar la esquina; o.rival true: al lado, OTRO cine con una marquesina de ESTRELLAS y su propia cola
//     enorme. Cámara 'taquilla': la ventanilla de cerca: la taquillera, el rollo de entradas, la bandeja; las
//     entradas salen (o.entradas 0–1).
//   'sala': dentro del cine: las butacas de espaldas en primer término (van en cineDelante), la pantalla grande con
//     su cortina, el haz del proyector con motas; o.lleno 0–1: cuántas cabezas diminutas hay; o.pantalla 'selva'
//     (hojas y un tablero, nuestros) | 'espacio' (una casa entre planetas) | 'blanco'. Cámara 'publico': DESDE la
//     pantalla, las butacas de frente con el público iluminado por la película: palomitas, gafas, un niño que se
//     tapa los ojos (o.susto true), dos críticos con libreta y el pulgar a medias (o.criticos true).
//   'contador': sobre terciopelo oscuro, un CONTADOR mecánico de taquilla, grande, de rodillos (R.numero o cifras
//     propias, x 60–260): o.cifra el número que marca (en millones), o.gira 0–1 los rodillos girando; monedas y
//     billetes que caen alrededor, una calculadora de rollo de papel. o.signo true: un símbolo de dólar grabado.
//     Cámara 'suma': TRES contadores pequeños apilados (o.cifras [a, b, c]) y debajo de una raya, el total, más
//     grande (o.total 0–1 lo hace aparecer rodillo a rodillo).
//   'tele': un salón de familia de 1996: sofá, alfombra, una tele de tubo con dibujos animados (una selva de colores
//     planos, nuestra), la videoconsola no, un vídeo VHS, cortinas, juguetes por el suelo, la tarde por la ventana.
//     El sofá de espaldas va en cineDelante. Cámara 'tienda': la estantería de una juguetería: cajas de juegos de
//     mesa apiladas (pictogramas, rayas, colores), una con una hoja de selva en la tapa en el centro, etiquetas de
//     precio con R.numero, un carrito que pasa.
//   'prensa': una rueda de prensa de 1995: un fondo de tela con dados y hojas, una mesa con micrófonos, focos,
//     periodistas diminutos con cámaras y grabadoras; o.flash: destellos. La mesa va en cineDelante. Cámara
//     'periodico': un periódico DESDE ARRIBA sobre una mesa de bar, con un café: columnas de rayas, una foto con una
//     máscara y chispas (los «efectos»), y un recuadro con un signo de interrogación; o.isla 0–1: encima cae un
//     folleto de viajes con una isla, una palmera y un avión.
//   'salon': un salón de 1996 de noche: una tele con una consola vieja debajo (PIEZAS_JM.consola), un estante con el
//     tablero olvidado (polvo, telaraña), pósteres sin letras, una lámpara de lava, la luna por la ventana.
//     o.epoca 2017: el mismo estante, más polvo, un televisor plano y un chaval que pasa con el móvil. Cámara
//     'estante': el estante de cerca: el tablero cerrado que carraspea (tiembla), se pliega (o.cambio 0–1) y queda
//     convertido en un cartucho (PIEZAS_JM.cartucho) que brilla en verde.
//   'anuncio': una pantalla de computadora de 2015 a cuadro completo: una página de noticias (rayas, una imagen con
//     un dado y una hoja), y debajo comentarios como burbujas con pulgares hacia abajo y caras serias (pictogramas);
//     o.enfado 0–1: las burbujas se acumulan. Cámara 'vela': en una esquina de la pantalla, una foto en gris de una
//     pared de ladrillo con una vela, y un lazo.
//   'calendario': una pared con un calendario de hojas grande (R.numero): o.de y o.a: el año que muestra pasa de uno
//     a otro arrancando hojas que caen (o.u 0–1); telarañas que crecen en la esquina; una caja de juego cerrada en
//     una repisa, que coge polvo. o.navidad true: es diciembre de 2026, con una guirnalda y un día rodeado. Cámara
//     'caja': la caja cerrada de cerca en la repisa, con polvo, una araña que baja y su telaraña.
export function cine(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#2a2440'), hex('#8a2434'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de cine(); se llama después de los actores, con las mismas opciones
export function cineDelante(R, t, o = {}) {
  return {};
}

// ── E · La selva del juego y el espacio (NUESTROS) ────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en selvaDelante (se llama después de los actores).

// Una selva de VIDEOJUEGO, nuestra: colores vivos, plantas enormes, ruinas con glifos de dados y espirales; nada que
// recuerde a las películas (ni sus personajes, ni sus vehículos, ni sus escenarios concretos).
//   'claro': un claro en la selva: árboles altísimos con lianas, helechos, una cascada al fondo con su arcoíris,
//     ruinas de piedra con la espiral del tablero grabada, un sendero de losas como casillas, tucanes y mariposas,
//     niebla baja. o.vidas 0–3: tres corazones (PIEZAS_JM.corazonVida) flotando en una esquina de abajo, como en un
//     videojuego. Cámara 'ruina': la ruina de cerca: un dintel con la espiral, una estatua de mono de piedra con un
//     dado en la mano, musgo, una antorcha.
//   'caida': el cielo SOBRE la selva: nubes, el dosel de copas visto desde arriba, un río que serpentea, pájaros;
//     o.cae 0–1: una figura diminuta cae girando desde arriba dejando una estela verde (la escena pone al actor si
//     quiere). Cámara 'dosel': entre las copas, de cerca, con hojas enormes que se apartan.
//   'cabana': una cabaña en un árbol gigante: plataforma de troncos, techo de hojas, una escala de cuerda, un farol,
//     una hamaca, trastos (una lata, un catalejo), y junto a la puerta una TABLA con unas rayas grabadas a navaja
//     (un nombre: solo rayas). Suelo de la plataforma 118; el suelo de la selva, 164. Cámara 'tabla': la tabla de
//     cerca, la madera con su veta, las rayas grabadas (o.graba 0–1 las va marcando) y una navaja clavada al lado.
//   'espacio': el espacio, nuestro: estrellas de tres tamaños, un planeta con anillos, una luna, un cometa, una
//     nebulosa; en el centro, una CASA de dos plantas flotando con su trozo de jardín arrancado, la chimenea
//     humeando hacia arriba, una farola torcida; o.gira: la casa gira despacio; meteoritos pequeños. Cámara
//     'ventana': desde dentro de la casa, una ventana con sus cortinas flotando: fuera, el planeta de los anillos que
//     pasa; en el alféizar, un tablero distinto (redondo, con planetas) y dos dados que flotan.
//   'calle': una calle de ciudad de HOY, nevada y con luces de Navidad (diciembre de 2026): edificios, escaparates,
//     un árbol con bolas, coches, gente diminuta con abrigos; en un primer piso, una ventana abierta de la que SALEN
//     lianas y hojas enormes que bajan por la fachada (o.lianas 0–1), un tucán posado en un semáforo, huellas grandes
//     en la nieve (o.huellas 0–1). Cámara 'ventana': esa ventana de cerca, desde fuera: dentro se ve una consola
//     vieja (PIEZAS_JM.consola) de la que brotan las lianas, con su luz verde.
export function selva(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#2e7a42'), hex('#1c5230'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de selva(); se llama después de los actores, con las mismas opciones
export function selvaDelante(R, t, o = {}) {
  return {};
}

// ── F · Hoy: el estudio de Atom, la línea y las reglas ────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas). Lo de delante de los personajes va en hoyDelante (se llama después de los actores).

//   'estudio': el estudio de Atom, de día (el mismo cuarto del 33 y del 34): papel pintado con dados y hojas
//     pequeñas (tranquilo tras Atom y bajo el año), moldura, friso, tarima con la mancha de sol y la alfombra; la
//     ventana con cortinas (fuera, el parque); la estantería con libros y juegos de mesa; la mesa (va en hoyDelante)
//     con NUESTRO tablero abierto, dos dados y un lápiz. o.lianas 0–1: lianas y hojas van tomando el cuarto (primero
//     una desde el techo, al final todo); o.rollo 0–1: un rollo de instrucciones que se desenrolla mesa abajo y por
//     el suelo. Cámara 'mesa': la mesa DESDE ARRIBA: el tablero, los dados (o.dados [a, b], o.tira 0–1), el lápiz
//     (o.lapiz false: se lo han llevado), la taza, y la punta de una liana que entra por arriba (o.liana 0–1).
//   'linea': un papel de estraza largo clavado en la pared del estudio con una LÍNEA del tiempo que no es recta: sale
//     de una mesa de dibujo (un flexo), pasa por un tablero (1981), un cartucho (2017) y una consola (2026), y hace
//     un bucle para volver al principio; R.numero para los años; o.traza 0–1 la va dibujando; chinchetas, hilo rojo.
//     Cámara 'bucle': el final de la línea de cerca, donde la flecha vuelve a tocar el flexo del principio.
//   'reglas': una cartulina de reglas apoyada en el tablero, grande y de frente (x 70–250, y 24–150): tres
//     pictogramas, cada uno en su círculo: una puerta con flecha de salida, un dado con dos caras (trampa), un
//     teléfono; o.tacha 0–3: se van tachando con un aspa roja; debajo, un camino de casillas hasta una gema, con una
//     ficha que avanza (o.avance 0–1). Cámara 'meta': la última casilla y la gema de cerca, con la ficha que llega.
//   'ojos': un cartel de «cómo miramos», como lámina de laboratorio: a la izquierda un salón tranquilo en miniatura
//     (un sillón, una lámpara), a la derecha un rinoceronte en miniatura, cada uno en su recuadro; entre los dos, un
//     par de OJOS grandes (solo ojos, sin cara: círculos con pupila) cuya mirada va de uno a otro (o.mira −1..1);
//     o.juntos 0–1: los dos recuadros se deslizan hasta fundirse en uno, y los ojos ya no saben dónde posarse (las
//     pupilas tiemblan). Cámara 'juntos': el recuadro único, grande: el rinoceronte en el salón, a lápiz.
//   'hoyTaller': el cuarto de dibujo de un ilustrador mayor, hoy, de día: la misma mesa inclinada de 1979 pero
//     gastada, estanterías con sus libros (lomos, sin letras), dos medallas enmarcadas, una ventana con un jardín de
//     Nueva Inglaterra y el mar al fondo, un perro de escayola blanco en una repisa. La mesa va en hoyDelante.
//     Cámara 'esquina': la esquina de una lámina a medio hacer, de cerca, donde un lápiz termina de dibujar el perro
//     blanco tras una hoja (o.perro 0–1).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, hex('#d8c8a8'), hex('#3a6a5a'));
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
