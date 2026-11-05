// Fontanería y decorados del episodio 22 (La Navidad estuvo prohibida: los mitos que todos creen) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el siglo XVII (Canterbury, el Parlamento, Boston y
// una calle escocesa de los años 50), B Roma (el scriptorium del calendario de 354, el templo del Sol, la calle en
// Saturnales, Mira de noche), C del siglo XVI al XIX (la imprenta de 1823, el estudio del dibujante, Windsor en 1848, el
// bosque de Alsacia, el robledal del druida y la cocina inglesa, el scriptorium del copista), D la vuelta al mundo
// (Filipinas, Gävle, Austria, Islandia, México, Cataluña, Japón, Australia, Italia) y E hoy y el cierre (el salón de Atom,
// la carrera de trineos de 1857, la cápsula Gemini 6A, la tierra de nadie de 1914).
// Los personajes son los de ELENCO_NV y PIEZAS_NV (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos ni letras (ni KFC ni Coca-Cola en pantalla: cubetas y botellas sin etiqueta).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, barras, mostradores, bancos)
// va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
// Tono: respeto a las religiones; nada de violencia (el motín sin heridos, la cabra sin nadie quemándola, la tregua sin armas).
//
//   import * as T from '/atomo/plato/escenas/nv-comun.js';
//   const { E, R, M } = await T.preparar('nv-gancho');
//   T.rodar(E, R, [[0, (t) => T.siglo17(R, t, { encuadre: 'canterbury' })]], { año: 1647 });
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
// las piezas del episodio (PIEZAS_NV: la galleta de jengibre, la multa, el tronco, la cabra…), las crea el reparto
export const PIEZAS_NV = KIT.PIEZAS_NV || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // invierno: nieve, hielo, cielo nocturno
    nieve: '#eef4fa', nieveS: '#b8c8dc', hielo: '#cfe4f2', noche: '#141a3a',
    // la Navidad: acebo, rojo, oro de las velas
    acebo: '#1e6a3a', aceboS: '#0f4024', rojoN: '#b8202a', rojoNS: '#701018', oroN: '#f0c040', oroNS: '#a87a18', vela: '#ffe08a',
    // el siglo XVII puritano: negro, blanco de cuello, madera de entramado, yeso
    negroP: '#22222a', cuello: '#f2efe6', entramado: '#4a2e1c', yeso: '#e4d8bc',
    // Roma: mármol, terracota, púrpura
    marmol: '#e8e2d4', marmolS: '#b0a894', terracota: '#b8603a', purpura: '#6a2a6a',
    // la galleta de jengibre
    jengibre: '#b8743a', jengibreS: '#7a4620', glaseado: '#f8f4ec',
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
  const E = await escena(id, 'ep22');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 354 (el calendario), 1647 (la prohibición), 1823 (el poema), 1914 (la tregua) y 2026 (hoy)
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '...#...', '#######', '.#####.', '..###..', '.##.##.', '##...##'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
    regalo: ['.##.##.', '...#...', '#######', '#..#..#', '#######', '#..#..#', '#######'],
  });
  R.tramosTiempo([[354, 1647, R.PALA.ORO, 'estrella'], [1647, 1914, R.PALA.ROJO, 'vela'], [1914, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'regalo']]);
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


// ── A · El siglo XVII ───────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'canterbury': Canterbury en la Navidad de 1647: calle de casas de entramado con aleros volados, nieve sucia y charcos helados, tiendas con las contraventanas subidas (pan, paños, velas), un pozo, la catedral al fondo entre tejados, humo de chimeneas, cuervos; o.motin 0–1 (gente enfadada al fondo, coles y ramas de acebo que vuelan, sin heridos), o.ano 1660 (campanas, coronas de acebo en las puertas). Cámara 'tienda': el escaparate de una tienda abierta de cerca con su mostrador.
//   'parlamento': la sala de los Comunes: bancos de madera enfrentados en gradas, el sillón del presidente con dosel, la maza sobre la mesa, ventanales emplomados con luz de invierno, velas; cámara 'escribano': la mesa del escribano con el calendario de pared (casillas con símbolos sin letras) y la pluma.
//   'boston': Boston nevado de 1659: una casa de reunión de madera con campanario, casas de tablas, un poste de avisos, el puerto con un barco al fondo, gaviotas, nieve que cae; o.ano 1870 (la misma calle con luces y coronas, un tranvía de caballos). Cámara 'casa': la puerta de una casa con un vecino y un pastel en la ventana.
//   'escocia': una calle de Escocia en los años 50 en la mañana de Navidad: casas de piedra gris (tenements), farolas, un autobús de dos pisos, gente con abrigo que va a trabajar, escarcha; cámara 'parada': la parada del autobús de cerca con su marquesina.
// Delante: siglo17Delante (la mesa de la tienda, los bancos del Parlamento, el poste de avisos). Devuelve { suelo, … } con la geometría de cada encuadre.
export function siglo17(R, t, o = {}) {
  const enc = o.encuadre ?? 'canterbury';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en el siglo xvii (se llama después de los actores, con las mismas opciones)
export function siglo17Delante(R, t, o = {}) {}

// ── B · Roma ────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'scriptorium': un scriptorium romano del siglo IV: mesas inclinadas, rollos y códices en nichos, lámparas de aceite, un ventanal con Roma al fondo; cámara 'mesa': el calendario de doce columnas de cerca, con la casilla del 25 que puede brillar (o.brilla 0–1, estrella y sol).
//   'templo': el templo del Sol Invicto: columnas, un relieve de un sol con rayos (sin letras), escalinata, braseros, cielo de amanecer; cámara 'altar': el altar con la balanza de dos platillos (o.balanza -1–1).
//   'calle': una calle romana en Saturnales, de noche: puestos de regalitos de barro (sigillaria), velas, guirnaldas de hiedra, gente con píleo, una mesa de banquete en la calle; cámara 'banquete': la mesa de cerca con comida y figuritas.
//   'mira': Mira, en Licia, de noche (siglo IV): casas encaladas tardorromanas, una iglesia pequeña, el mar al fondo con la luna, una ventana con luz tenue en la casa pobre; cámara 'ventana': la ventana de cerca, con el alféizar.
// Delante: romaDelante (la mesa del calendario, la mesa del banquete, el alféizar). Devuelve { suelo, … } con la geometría de cada encuadre.
export function roma(R, t, o = {}) {
  const enc = o.encuadre ?? 'scriptorium';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en roma (se llama después de los actores, con las mismas opciones)
export function romaDelante(R, t, o = {}) {}

// ── C · Del siglo XVI al XIX ────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'imprenta': una imprenta de Nueva York de 1823: prensa de madera de tornillo, cajas de tipos, pliegos colgados secándose, ventana a una calle con coches de caballos y nieve; cámara 'prensa': la prensa de cerca con el pliego recién impreso (sin letras legibles).
//   'estudio': el estudio de un dibujante del siglo XIX: mesa inclinada, tinteros, láminas colgadas, una estufa de hierro, ventana nevada; cámara 'tablero': el tablero de cerca con el tendedero de postales de Santa de colores.
//   'windsor': el castillo de Windsor en la Navidad de 1848: un salón con chimenea de mármol, cortinajes, retratos, el árbol de Navidad sobre una mesa con velas, juguetes y dulces; cámara 'arbol': el árbol de cerca; o.grabado 0–1 lo convierte en una estampa de periódico en sepia.
//   'bosque': un bosque de abetos de Alsacia en 1521, de noche con nieve: abetos, una cabaña de guardas con fuego, el campanario de Sélestat al fondo; cámara 'guardas': los guardas con farol de cerca.
//   'robledal': un robledal antiguo con muérdago en las ramas, niebla y luz de luna, un altar de piedra; cámara 'cocina': una cocina inglesa del siglo XVIII con su fogón, ollas de cobre y una rama de muérdago colgada del techo.
//   'copista': un scriptorium medieval: atriles, un ventanal gótico, velas, manuscritos iluminados; cámara 'pagina': la página de cerca con la gran ji dorada (o.ji 0–1 la dibuja).
// Delante: epocaDelante (la mesa de la imprenta, la mesa del dibujante, el fogón de la cocina, el atril). Devuelve { suelo, … } con la geometría de cada encuadre.
export function epoca(R, t, o = {}) {
  const enc = o.encuadre ?? 'imprenta';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en del siglo xvi al xix (se llama después de los actores, con las mismas opciones)
export function epocaDelante(R, t, o = {}) {}

// ── D · La vuelta al mundo ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'filipinas': una calle de Filipinas en septiembre, al atardecer: casas con faroles parol de estrella de colores que se encienden, palmeras, un jeepney, un coro; cámara 'parol': un parol grande de cerca.
//   'gavle': la plaza de Gävle (Suecia) de noche con nieve: la cabra de paja gigante con lazos rojos, la valla, la caseta del vigilante, casas de madera de colores, aurora tenue; o.resplandor 0–1 (un brillo naranja detrás, sin nadie); cámara 'cabra': la cabra de cerca.
//   'austria': una calle nevada de un pueblo de Austria: casas alpinas con balcones de madera, el campanario de bulbo, montañas, farolillos; espacio para un desfile; cámara 'portal': un portal con un zapato en el escalón.
//   'islandia': una ladera de Islandia de noche con aurora boreal verde que se mueve, una granja de techo de césped, rocas de lava, un zapato en la ventana; cámara 'granja': la ventana de la granja de cerca.
//   'mexico': una calle de un pueblo de México de noche: casas de colores, faroles de papel, papel picado (sin letras), macetas de flor de Nochebuena, una piñata colgada; cámara 'puerta': la puerta de la posada de cerca.
//   'cataluna': una casa de Cataluña por dentro: chimenea de piedra, vigas, la mesa con mantel, el tronco Tió con su manta junto al fuego; cámara 'tio': el tronco de cerca.
//   'japon': una calle de Japón en Nochebuena: luces, tiendas con farolillos, una tienda de pollo frito con escaparate (sin letras ni logos), la cola de gente; cámara 'mostrador': el mostrador con cubetas rojas y blancas.
//   'australia': una playa de Australia en verano: arena, olas que rompen, sombrillas, socorristas, gaviotas, una parrilla; cámara 'parrilla': la parrilla de cerca.
//   'italia': los tejados de un pueblo de Italia de noche con luna: tejas, chimeneas, campanario; cámara 'chimenea': una chimenea por dentro con calcetines colgados.
// Delante: mundoDelante (barras y mostradores, la mesa catalana, la parrilla). Devuelve { suelo, … } con la geometría de cada encuadre.
export function mundo(R, t, o = {}) {
  const enc = o.encuadre ?? 'filipinas';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en la vuelta al mundo (se llama después de los actores, con las mismas opciones)
export function mundoDelante(R, t, o = {}) {}

// ── E · Hoy y el cierre ─────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'salon': el salón de Atom en Navidad: árbol con luces, chimenea con calcetines, sofá, mesa con el plato de galletas de jengibre, ventana nevada; cámara 'mesa': la mesa de cerca con las cuatro pistas o el álbum (o.album 0–1).
//   'trineos': una carrera de trineos de 1857 en la nieve de Nueva Inglaterra: camino nevado, cercas, casas al fondo, árboles; cámara 'meta': la meta de cerca con público.
//   'espacio': la cápsula Gemini 6A en órbita: la Tierra azul abajo, estrellas, el sol; cámara 'cabina': la cabina por dentro con los dos asientos y las ventanillas.
//   'tregua': tierra de nadie nevada en la Navidad de 1914 (sin armas, sin heridos): dos líneas de trincheras con sacos terreros, alambrada lejana, árboles pelados, velas y un arbolito en el parapeto; cámara 'cerca': el centro de tierra de nadie con el balón.
// Delante: hoyDelante (el sofá y la mesa, la cerca, el panel de la cabina, los sacos terreros). Devuelve { suelo, … } con la geometría de cada encuadre.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  provisional(R, t, C.noche, C.nieveS);
  return { suelo: 160 };
}
// lo que va delante de los personajes en hoy y el cierre (se llama después de los actores, con las mismas opciones)
export function hoyDelante(R, t, o = {}) {}

// la galleta de jengibre con ojos, el gag del episodio (PIEZAS_NV.galleta)
export function galleta(R, x, y, t, o = {}) { if (PIEZAS_NV.galleta) PIEZAS_NV.galleta(R, x, y, { t, ...o }); }
