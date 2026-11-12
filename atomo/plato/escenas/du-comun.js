// Fontanería y decorados del episodio 33 (Dune: el libro que nadie quería publicar) en el estilo canónico pixel chibi, al
// nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Florence, Oregón (las dunas de 1957 y las de hoy), B la casa de
// Herbert (cuarto de trabajo, entrada con buzón, cocina), C el planeta de arena (NUESTRO), D las editoriales (editoriales:
// pasillo de puertas y Chilton; libros: imprenta, librería, premios y quiosco), E el cine (cine: estudio de París y plató
// de 1984; salas: el cine, la subasta y el rodaje en el desierto) y F hoy (el estudio de Atom, un campus de 1970).
// DERECHOS: NADA de imágenes de las películas de Dune (ni actores, ni vestuario, ni naves, ni el diseño de sus gusanos) ni
// de las portadas del libro. El planeta es NUESTRO: dos lunas, dunas anaranjadas, rocas y, como mucho, una silueta enorme
// y lejana que mueve la arena (nunca una boca con dientes). Las películas se cuentan con marquesinas, taquillas y butacas;
// las pantallas, con formas abstractas. Sin letras (solo números y símbolos). Nada morboso.
// Los personajes son los de ELENCO_DU y las piezas, PIEZAS_DU (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14; las cifras del año
// bajan hasta y ≈ 20: nada en y 15–20 bajo x 20–45), también.
//
//   import * as T from '/atomo/plato/escenas/du-comun.js';
//   const { E, R, M } = await T.preparar('du-gancho');
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
// las piezas del episodio (PIEZAS_DU: el libro, el manuscrito, la avioneta, el reloj de arena, los manuales, los trofeos…), las crea el reparto
export const PIEZAS_DU = KIT.PIEZAS_DU || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la arena de Oregón (clara, fría) y la del planeta (anaranjada), la hierba de playa, el papel de los manuscritos, la
    // madera del cuarto de Herbert, el azul noche del libro, el rojo de las butacas y el dorado de los premios
    arena: '#e6d2a0', arenaS: '#c4a870', arenaL: '#f4e8c4', duna: '#e09848', dunaS: '#b06a2c', dunaL: '#f4c078',
    hierba: '#7a9a52', hierbaS: '#4e7238', papel: '#efe6d0', papelS: '#cfc4a8', tinta: '#2a2a3a', libro: '#1c2450',
    butaca: '#a02c34', butacaS: '#6e1c26', oro: '#e8b840', oroS: '#a87820', pino: '#2e5a3c', mar: '#3a6a8a',
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
  const E = await escena(id, 'ep33');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1957–1965 (del reportaje al libro), 1965–1974 (el éxito lento), 1974–1986 (las películas
  // imposibles), 1986–2027 (por fin, y las dunas de hoy)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '.......'],
    libro: ['.......', '######.', '#....#.', '#.##.#.', '#....#.', '######.', '.......'],
    claqueta: ['#.#.#.#', '#######', '#.....#', '#.....#', '#.....#', '#######', '.......'],
    hierba: ['.#...#.', '.#.#.#.', '..###..', '..###..', '...#...', '...#...', '.......'],
  });
  R.tramosTiempo([[1957, 1965, R.PALA.ORO, 'duna'], [1965, 1974, R.PALA.VERDE ?? R.PALA.ORO, 'libro'], [1974, 1986, R.PALA.ROJO, 'claqueta'], [1986, 2027, R.PALA.AZUL ?? R.PALA.ROJO, 'hierba']]);
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

// ── A · Florence, Oregón (1957 y hoy) ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'dunas': la costa de Oregón en 1957, a ras de suelo: dunas enormes de arena clara que avanzan desde el mar (al fondo,
//     el Pacífico gris con rompientes y niebla) sobre una carretera medio sepultada con su raya y sus postes, un bosque
//     de pinos con los troncos enterrados hasta media altura y una casa de madera con la arena hasta las ventanas; el
//     viento levanta velos de arena de las crestas (animados), nubes rápidas, gaviotas; hileras de matas de hierba de
//     playa recién plantada con sus estacas y cordeles (o.hierba 0–1: cuántas hileras), un camión del servicio forestal
//     pequeño y dos operarios lejanos. o.epoca: 1957 | 'hoy' (las mismas dunas, ahora cubiertas de hierba verde y
//     arbustos, con pinos jóvenes; la carretera limpia; una señal redonda con una planta tachada, PIEZAS_DU.senalHierba;
//     o.limpia 0–1: una franja donde se ha quitado la hierba y la arena vuelve a moverse). Lo de delante (matas, una
//     valla de listones medio enterrada) en oregonDelante. Cámara 'aire': lo mismo visto desde la avioneta, en picado:
//     el mar con sus olas a la izquierda, la franja ancha de dunas con sus crestas en media luna y sus sombras, lagos
//     entre dunas, el bosque oscuro, el río con su desembocadura, la carretera y el pueblo pequeño; nubes por debajo y
//     la sombra de la avioneta que corre por la arena (la avioneta la pone la escena con PIEZAS_DU.avioneta).
//   'pueblo': Florence en 1957, junto al río: el puente de arcos de hormigón, el muelle con barcas de pesca, casas y
//     tiendas de madera con toldos (sin letras), una camioneta de la época, postes de teléfono, gaviotas, y la arena
//     que asoma por el final de la calle y contra una valla. Cámara 'corte': una duna en CORTE, como una lámina de
//     libro de ciencias: el viento (flechas), la arena en capas, la hierba con sus raíces largas, el agua bajo la
//     arena, un escarabajo, un pájaro, un pino; cada pieza en su casilla clara, unidas por flechas (o.piezas 0–6:
//     cuántas se ven; o.falta: índice de la pieza que se quita y deja su hueco punteado, y entonces las demás se tiñen).
export function oregon(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.arena);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de oregon(); se llama después de los actores, con las mismas opciones
export function oregonDelante(R, t, o = {}) {
  return {};
}


// ── B · La casa de Herbert, 1957–1986 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'cuarto': el cuarto de trabajo de Frank Herbert: paredes de madera, estanterías llenas (lomos de colores, sin
//     letras), libros de desiertos y plantas abiertos, mapas clavados, un globo terráqueo, una lámpara de brazo, la
//     ventana con abetos y lluvia fina del noroeste (recortado), un sillón, un gato o un perro dormido, una alfombra;
//     la mesa con la máquina de escribir va en casaDelante. o.epoca: 1957 (pocos libros, facturas clavadas) | 1963
//     (montañas de notas: o.notas 0–1 para la altura de las pilas del suelo; la torre grande la pone la escena con
//     PIEZAS_DU.pilaNotas) | 1972 (más desahogado, premios en la balda) | 1986 (atardecer, todo teñido de ámbar, la
//     máquina tapada con su funda, seis libros en la balda de honor, la silla vacía: con respeto). Cámara 'mesa': la
//     mesa de cerca, vista desde arriba en tres cuartos: la máquina de escribir con su hoja, el flexo, la taza, un
//     cenicero no: un tintero y lápices, sobres, un mapa de la costa de Oregón desplegado, facturas con un clip
//     (o.facturas), una foto antigua enmarcada (hueco para lo que ponga la escena) y sitio libre en el centro.
//   'entrada': la entrada de la casa, de día: porche de madera con escalones, puerta con mosquitera, el BUZÓN de poste
//     junto a la acera (x y devueltos: buzon), el jardín con abetos, la calle de un barrio de los sesenta con un coche
//     aparcado y un cartero lejano; llovizna opcional (o.lluvia). Por el buzón sale y vuelve el manuscrito (lo pinta
//     la escena). Cámara 'cocina': la cocina-comedor: la mesa de Beverly con su máquina de escribir y bocetos de
//     anuncios (dibujos de productos: una lata, un coche, una sonrisa; sin letras), la ventana, la nevera redondeada de
//     los cincuenta, dibujos de niños pegados, una cafetera que humea; la mesa en casaDelante.
export function casa(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.madera, C.papel);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de casa(); se llama después de los actores, con las mismas opciones
export function casaDelante(R, t, o = {}) {
  return {};
}


// ── C · El planeta de arena (nuestro) ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'desierto': un planeta desierto INVENTADO por nosotros: un mar de dunas anaranjadas hasta el horizonte, con crestas
//     afiladas y sombras largas, bajo un cielo ocre que vira a violeta arriba, con DOS LUNAS (una grande y pálida, otra
//     pequeña) y estrellas; afloramientos de roca oscura, torbellinos de polvo, arena que resbala por las laderas,
//     destellos anaranjados que brillan y se apagan en la arena (o.brillo 0–1). o.hora: 'ocaso' (por omisión) | 'noche'
//     | 'dia'. o.silueta 0–1: lejos, la arena se abomba en una loma larguísima que avanza despacio y deja una estela
//     (algo enorme se mueve DEBAJO: nunca se le ve boca ni cuerpo). Cámara 'roca': desde lo alto de un afloramiento
//     de roca, en primer término las rocas con vetas y grietas (en planetaDelante), el desierto abajo y lejos, las dos
//     lunas más grandes; sitio en la roca para un personaje pequeño (devuelve su punto).
//   'orbita': el planeta visto desde el espacio: una esfera ocre con bandas de dunas, casquetes diminutos, tormentas de
//     polvo que giran, la línea de la noche, las dos lunas en órbita (animadas) y un campo de estrellas con una
//     nebulosa. o.verde 0–1: una mancha verde que crece en un punto (para el cierre). Cámara 'globo': un globo
//     terráqueo de escritorio, de cerca, sobre una mesa con libros: o.arena 0–1 funde el globo de la Tierra (azul y
//     verde) en un globo todo de arena.
export function planeta(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.duna);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de planeta(); se llama después de los actores, con las mismas opciones
export function planetaDelante(R, t, o = {}) {
  return {};
}


// ── D · Las editoriales, 1963–1966 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'pasillo': un pasillo de oficinas de Nueva York a principios de los sesenta, en perspectiva: una fila de puertas de
//     editoriales con cristal esmerilado y un símbolo distinto en cada una (pluma, libro, estrella, ancla, búho…; sin
//     letras), ranuras de correo, apliques, un suelo de linóleo a cuadros, un ascensor al fondo, un carrito de correo,
//     una secretaria que pasa; o.cerradas 0–1: cuántas puertas tienen ya el cartelito de «no» (una X roja). Devuelve
//     las puertas. Cámara 'despacho': el despacho de un editor: mesa con torres de manuscritos, teléfono negro,
//     archivadores, una ventana con rascacielos y depósitos de agua (recortado), diplomas (rayas), un perchero; la
//     mesa en editorialesDelante.
//   'chilton': la editorial de Filadelfia: una sala con estanterías llenas de MANUALES de taller (PIEZAS_DU.manual: lomos
//     con una llave inglesa), láminas de coches en despiece en las paredes, una maqueta de motor, un calendario con un
//     coche, la mesa de Lanier (en editorialesDelante) con una lámpara verde; por la ventana, ladrillo y una torre con
//     reloj. Cámara 'estante': un estante de cerca: manuales con la llave inglesa en el lomo, uno tras otro, y un hueco
//     (devuelve hueco: [x, y]) donde entra el libro (lo pone la escena).
export function editoriales(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de editoriales(); se llama después de los actores, con las mismas opciones
export function editorialesDelante(R, t, o = {}) {
  return {};
}


// ── D2 · Los libros: imprenta, librería, premios y quiosco ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'imprenta': una imprenta de los sesenta: la rotativa con sus rodillos que giran, cintas con pliegos, pilas de libros
//     recién encuadernados, un operario, carretillas, lámparas colgantes; o.pila 0–1 (cuántos libros hay). Cámara
//     'libreria': una librería de 1965: mesas de novedades, estanterías, un escaparate con la calle, el mostrador con la
//     caja registradora (en librosDelante) y una mesa central con sitio para una pila pequeña de libros y un
//     cartelito de precio (lo pone la escena con R.numero).
//   'premios': una sala de banquetes de 1966: escenario con cortina, atril, una mesa con dos trofeos (los pone la
//     escena), mesas redondas con manteles y público de espaldas (en librosDelante), lámparas de araña, focos.
//     Cámara 'quiosco': un quiosco de prensa de 1963 en una esquina de ciudad: revistas colgadas con pinzas (portadas de
//     planetas, cohetes y robots; sin letras), periódicos apilados, el quiosquero, una parada de autobús con el autobús
//     que llega y gente leyendo.
export function libros(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.madera, C.papel);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de libros(); se llama después de los actores, con las mismas opciones
export function librosDelante(R, t, o = {}) {
  return {};
}


// ── E · El cine, 1974–2026 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'paris': un estudio de París en 1975: un piso alto con molduras y balcón (por él, tejados de zinc y chimeneas), las
//     paredes forradas de CIENTOS de dibujos colgados (NUESTROS: naves de colores imposibles, castillos raros, trajes;
//     manchas de color, nunca copias), mesas de dibujo con flexos, tarros de pinceles, una cafetera, rollos de papel;
//     las mesas de delante en cineDelante. Cámara 'salon': un salón recargado de hotel de lujo: cortinajes, espejos
//     dorados, alfombra, una tarima con sitio para un trono (PIEZAS_DU.trono, lo pone la escena) y una mesita.
//   'plato': un plató de cine de 1983: una nave enorme con focos en parrillas, grúas, andamios, y decorados de
//     cartón piedra a medio pintar (arcos dorados, columnas, una pared de roca falsa con sus listones por detrás), cables
//     por el suelo, sillas de director, técnicos pequeños que trabajan. Cámara 'oficina': la oficina de un productor:
//     mesa grande con contratos (en cineDelante), carteles de películas en la pared (sin letras: formas y colores),
//     latas de película apiladas, un ventilador, una ventana con palmeras o con lluvia y neones (o.lugar: 'hollywood' |
//     'lluvia').
export function cine(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.butaca);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de cine(); se llama después de los actores, con las mismas opciones
export function cineDelante(R, t, o = {}) {
  return {};
}


// ── E2 · El cine por fuera y por dentro, la subasta y el rodaje ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'sala': la fachada de un cine, de noche: la marquesina con bombillas que corren (sin letras: rayas y, con o.lunas
//     1–3, uno, dos o tres discos de luna), la taquilla acristalada, carteles en vitrinas (formas abstractas), la acera
//     mojada con reflejos, coches de la época que pasan; o.epoca: 1984 | 2021 | 2026 (cambia coches, ropa y luces);
//     o.cola 0–1: cuánta gente hace cola (de vacía a una cola que dobla la esquina; la cola de delante en
//     salasDelante). Cámara 'butacas': dentro, desde el fondo de la sala: la pantalla enorme (la escena pinta lo que
//     proyecta; por omisión, un resplandor de arena abstracto), el haz del proyector con polvo, filas de butacas rojas
//     de espaldas (en salasDelante), o.lleno 0–1: cuántas cabezas hay.
//   'subasta': una sala de subastas de París en 2021: paneles de madera, una pantalla con una cifra (o.cifra, con
//     R.numero), el atril del subastador, una mesa con teléfonos y empleados, un pedestal con vitrina para el libro
//     (lo pone la escena), público sentado de espaldas con paletas numeradas (en salasDelante). Cámara 'rodaje': un
//     rodaje en un desierto DE VERDAD de la Tierra (rocas rojas altísimas como las de Wadi Rum, arena rojiza, cielo
//     azul): sombrillas, cámaras de cine en trípode y sobre raíles, focos con reflectores, un camión, técnicos pequeños;
//     lo de delante (una cámara grande, cajas) en salasDelante.
export function salas(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.butaca);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de salas(); se llama después de los actores, con las mismas opciones
export function salasDelante(R, t, o = {}) {
  return {};
}


// ── F · Hoy ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'estudio': el estudio de Atom, de día: papel pintado, zócalo, tarima con mancha de sol, la ventana con cortinas (por
//     ella, un parque con árboles que se mecen), estantería con libros, un sillón con el gato que duerme, un mapa
//     enmarcado, el reloj de pared, y el escritorio (en hoyDelante) con el reloj de arena grande (PIEZAS_DU.relojArena;
//     o.reloj false lo quita para que lo mueva la escena), libros y un flexo; o.arena 0–1: la arena que se ha salido y
//     va tapando la mesa y el suelo; o.hierba 0–1: la hierba que crece en esa arena y se queda con la mesa. Cámara
//     'mesa': el escritorio de cerca: el tablero con sus vetas, el reloj de arena, el montón de arena (o.arena), la
//     plantita (o.hierba), una lupa, un libro abierto, lápices; al fondo, desenfocada en tramas, la ventana.
//   'campus': el césped de una universidad en 1970: edificios de ladrillo con hiedra y una torre con reloj, árboles
//     grandes, estudiantes sentados en corros (pequeños), una guitarra, bicis, pancartas con iconos (un planeta, una
//     hoja, un sol; sin letras), una mesa plegable con libros (en hoyDelante), un perro con un disco volador. Cámara
//     'catalogo': un catálogo enorme abierto sobre una manta en el césped: páginas con herramientas, tiendas de
//     campaña, semillas y libros dibujados en casillas (sin letras), una foto de la Tierra en la tapa; manos y cosas
//     las pone la escena.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}


