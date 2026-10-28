// Fontanería y decorados del episodio 14 (Oak Island, el Pozo del Dinero) en el estilo canónico pixel chibi, al nivel de
// episodios/ESTANDAR.md. Ocho decorados (guion.md): A Oak Island en 1795, B el pozo (en corte, la boca y el fondo),
// C Smith's Cove y la orilla sur, D Roosevelt (Nueva York 1909, Campobello y el barco de 1939), E el gabinete de las
// teorías, F el laboratorio del agua (con el campo de 1878), G Michigan y Miami en 1965, H Oak Island hoy. El mapa de papel
// es el del 13 (fa-comun.js), que ya pinta Canadá: Nueva Escocia se encuadra con o.zoom y o.centro. Sin marcas: ni
// History ni Reader's Digest. Sin morbo ni «maldición». Reutiliza del 10 la paleta, rodar, la mano, el brazo y la silla.
//
//   import * as T from '/atomo/plato/escenas/oi-comun.js';
//   const { E, R, M } = await T.preparar('oi-gancho');
//   T.rodar(E, R, [[0, (t) => T.isla1795(R, t, { encuadre: 'claro' })]], { año: 1795 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el mar del norte, la arcilla del pozo, el roble y la madera de las torres
    marN: '#3a6a8a', marNS: '#284e6a', marNL: '#6a9aba', espuma: '#e8f0f0',
    arcilla: '#9a7a5a', arcillaS: '#7a5a40', arcillaL: '#b8987a', roble: '#6a4a2a', robleS: '#4a3018', robleL: '#8a6a44',
    hoja: '#4a7a3a', hojaS: '#36602c', hojaL: '#6a9a4a', arena: '#d8c8a0', arenaS: '#b8a47c', algas: '#5a6a3a',
    // la anhidrita (blanca grisácea), el agua del pozo y el tinte rojo de 1898
    anhidrita: '#d8d4cc', anhidritaS: '#aeaaa2', aguaPozo: '#2e4a5a', aguaPozoL: '#4a7a8a', tinteRojo: '#c8283a',
    // el oro de la leyenda y el acero de hoy
    oro: '#e8b830', oroS: '#a8801c', acero: '#8a96a2', aceroS: '#5e6a76', aceroL: '#c8d2dc', alta: '#e8783a',
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
  const E = await escena(id, 'ep14');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la pala (los colonos), la polea (las máquinas de vapor) y la grúa (la ciencia)
  Object.assign(R.ICONOS, {
    pala: ['...#...', '...#...', '...#...', '...#...', '..###..', '.#####.', '..###..'],
    polea: ['...#...', '..###..', '.#...#.', '.#.#.#.', '.#...#.', '..###..', '...#...'],
    grua: ['#######', '#.....#', '#......', '#......', '#....#.', '#...###', '###....'],
  });
  // la barra de tiempo: las palas (1795–1848), el vapor (1849–1964) y la ciencia (1965–2026)
  R.tramosTiempo([[1795, 1848, R.PALA.ORO, 'pala'], [1849, 1964, R.PALA.AZUL, 'polea'], [1965, 2026, R.PALA.ROJO, 'grua']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// sitios del mapa ([lon, lat]); para encuadrar Nueva Escocia: T.mapa(R, t, { zoom: 3.4, centro: [-66, 43.5] }); la costa de
// Nueva York a Nueva Escocia: { zoom: 2.4, centro: [-70, 42.5] }; de Miami o Michigan a Nueva Escocia: { zona: 'eeuu' }
export const LUGARES = {
  oakIsland: [-64.30, 44.51], halifax: [-63.57, 44.65], onslow: [-63.33, 45.40], nuevaYork: [-74.0, 40.71],
  campobello: [-66.95, 44.88], kingsford: [-88.07, 45.79], miami: [-80.19, 25.76],
};
// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── A · Oak Island en 1795 ──────────────────────────────────────────────────────────────────────────────────────────────
// La isla pequeña de robles en la bahía de Mahone (Nueva Escocia), a finales del verano de 1795. o.encuadre:
//   'bahia': desde el agua, la bahía con otras islitas boscosas, la costa al fondo, nubes del Atlántico a tres
//     velocidades y gaviotas; en primer término el agua con olas y reflejos; deja sitio en el agua para una barca de remos
//     (la pone la escena) y devuelve dónde está la playa de llegada;
//   'claro': dentro del bosque, el claro con el hoyo redondo hundido en la tierra (una hondonada con hierba distinta),
//     el gran roble a un lado con una rama gruesa que pasa por encima del hoyo y de la que cuelga la vieja polea de barco
//     (o.polea false la quita; cruje y se balancea con el viento), helechos, setas, troncos caídos, luz entre las hojas;
//     suelo para tres personajes y la cesta del almuerzo (o.cesta: pinta la cesta con el bocadillo; 0–1 lo que se ha
//     llevado la gaviota);
//   'orilla': la orilla rocosa de la isla con la marea (o.marea 0–1: baja–alta, el agua sube y baja sobre las rocas y la
//     arena), algas, conchas, troncos de deriva; con o.hoy, la misma orilla de hoy al atardecer (la calzada al fondo,
//     luces de casas en la costa); o.atardecer.
// Devuelve las posiciones útiles (suelo, hoyo, polea, playa).
export function isla1795(R, t, o = {}) { provisional(R, t, C.marN, C.hoja); return { suelo: 150 }; }
// la vieja polea de barco de la leyenda (bloque de madera con su roldana y un trozo de cabo), colgando en (x, y); o.giro
export function polea(R, x, y, t, o = {}) { R.disco(x, y, 3, C.robleS); }
// la gaviota del gag: vuela, se posa y se lleva el bocadillo (o.fase 0–1: llega, coge, se va)
export function gaviota(R, x, y, t, o = {}) { R.pset(x, y, C.blanco); }

// ── B · El pozo: en corte, la boca y el fondo ────────────────────────────────────────────────────────────────────────────
// o.epoca: '1795' (solo el hoyo con palas y sogas), '1803' (torre de madera con polea, cubos, sogas), '1849' (torre con
// taladro de mano gigante y un cabrestante), '1909' (perforadora de vapor con su caldera humeante). o.encuadre:
//   'corte': la isla vista en corte (cielo y bosque arriba, la tierra en capas de arcilla con piedras y raíces, el mar
//     a un lado con su nivel): el pozo baja de arriba abajo con las losas de piedra cerca de la boca y una plataforma de
//     troncos de roble cada diez pies (unas 9 plataformas visibles), capas de carbón vegetal, masilla y fibra de coco
//     hacia el fondo; o.nivel (0–1) el agua que llena el pozo (0 seco, 1 hasta treinta pies de la boca), con su brillo
//     y ondas; o.segundo (0–1) el segundo pozo al lado que se cava y se llena; o.marea (0–1) el nivel del mar que sube y
//     baja (el del pozo lo sigue si o.sigue); o.flechas: flechas de agua que entran por abajo (más gruesas cuanto más
//     hondo); o.tunel: la línea de puntos del túnel imaginario hasta el mar; devuelve la escala (pies → px) y dónde está
//     cada plataforma, para que las escenas pongan cavadores, cubos y farol dentro;
//   'boca': fuera, a ras de suelo: la boca del pozo con su brocal de troncos, la torre o la máquina de su época, montones
//     de tierra, carretillas, tablones, cubos, la tienda de los obreros, el bosque y la bahía detrás; vida: humo, pájaros,
//     ropa tendida; suelo para cuatro o cinco personajes;
//   'fondo': dentro del pozo, abajo, a la luz de un farol: las paredes de arcilla con marcas de pico, una plataforma de
//     troncos bajo los pies, la soga que sube a la luz; o.agua (0–1) el agua que empieza a brotar por las grietas.
export function pozo(R, t, o = {}) { provisional(R, t, C.arcillaS, C.arcilla); return { suelo: 150 }; }

// ── C · Smith's Cove y la orilla sur ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'playa': la ensenada de Smith's Cove con la marea baja: la arena mojada que «llora» agua en hilillos que bajan al mar
//     (animados), rocas con algas, la orilla de la isla con robles; o.cavado (0–1): la zanja de los buscadores de 1850
//     que deja ver la fibra de coco y los canales de piedra en abanico hacia el mar; o.dique (0–1) el dique de madera y
//     piedras que levantan, y o.ola (0–1) la marea alta que lo rompe y se lo lleva (tablones flotando); suelo para cuatro;
//   'canales': un inserto a ras de arena: los canales de piedra planas en abanico con la fibra de coco marrón entre las
//     piedras y el agua que corre por ellos; deja sitio para el cangrejo (lo pone la escena con T.cangrejo);
//   'sur': la orilla sur de la isla, rocosa, con el agua en calma; o.tinte (0–1) la mancha de tinte rojo que aparece en
//     el agua junto a las rocas y se extiende.
export function smithsCove(R, t, o = {}) { provisional(R, t, C.arena, C.marN); return { suelo: 150 }; }
// el cangrejo del gag (de lado, con sus pinzas y ojos de palo); o.dir, o.anda
export function cangrejo(R, x, y, t, o = {}) { R.pset(x, y, C.rojo ?? hex('#c84a3a')); }
// el pez del gag del tinte: asoma la cabeza del agua (o.rojo 0–1: teñido)
export function pez(R, x, y, t, o = {}) { R.pset(x, y, C.marNL); }

// ── D · Roosevelt: Nueva York 1909, Campobello y el barco de 1939 ──────────────────────────────────────────────────────
// o.encuadre:
//   'bufete': un despacho de abogados de Nueva York en 1909: paneles de madera oscura, estanterías de libros de leyes,
//     ventana alta con la calle (tranvía, coches de caballos, edificios), mesa con escribanía, lámpara de gas, un mapa
//     enrollado; sitio para dos personajes a la mesa (el joven Roosevelt firma);
//   'campobello': la casa de veraneo roja de tejado verde junto al mar en la isla de Campobello, con su porche, la hierba,
//     el mar y barcas de vela; sitio para un niño con un libro en el porche;
//   'cubierta': la cubierta de un barco en 1939 en una niebla espesa (o.niebla 0–1): barandilla, chimenea, cabos,
//     salvavidas, un faro que apenas se ve; el barco gira (o.giro 0–1); sitio para un marinero.
export function roosevelt(R, t, o = {}) { provisional(R, t, C.robleS, C.roble); return { suelo: 150 }; }

// ── E · El gabinete de las teorías ──────────────────────────────────────────────────────────────────────────────────
// Un desván de madera con vigas y un ventanuco redondo, lleno de cosas de las teorías del pozo: un mapa de piratas
// clavado, un cofre, un yelmo de templario, una pluma de escribir en su tintero, un retrato con joyas, una bandera
// pirata doblada, un catalejo, libros apilados, velas. o.encuadre:
//   'desvan': el desván entero con un agujero redondo en el suelo de tablas en el centro (de él salen las teorías, que
//     pinta la escena) y sitio para el topo del gag;
//   'retratos': una pared con una fila de retratos de buscadores de distintas épocas (1795, 1803, 1849, 1909, 1965, hoy)
//     en marcos distintos, cada uno con una burbuja vacía encima donde la escena pone el tesoro soñado.
export function gabinete(R, t, o = {}) { provisional(R, t, C.robleS, C.roble); return { suelo: 150 }; }
// el topo del gag: asoma del agujero, coge algo y lo devuelve dentro (o.fase 0–1)
export function topo(R, x, y, t, o = {}) { R.pset(x, y, C.k); }

// ── F · El laboratorio del agua (y el campo de 1878) ──────────────────────────────────────────────────────────────────
// o.encuadre:
//   'mesa': una mesa de laboratorio luminosa con un vaso de zumo con su pajita (el nivel de la pajita igual al del vaso)
//     y, al lado, un tanque de cristal grande con la isla en corte: el mar a los lados, la arcilla arriba, la anhidrita
//     blanca abajo con grietas, el pozo en el centro que se llena hasta el nivel del mar (o.nivel 0–1); al fondo,
//     estanterías con frascos, una pizarra con dibujos (sin letras), la ventana con el mar; sitio para Atom no hace falta
//     (va arriba): sitio para un personaje que señala;
//   'tanque': de cerca, el corte del tanque: la arcilla y, debajo, la anhidrita que se disuelve con gotas y deja cuevas
//     (o.disuelve 0–1), flechitas de agua por las grietas (o.flechas), una esponja en un plato al lado (o.esponja 0–1:
//     se empapa);
//   'campo1878': un campo arado de la isla en 1878, con surcos, piedras, el bosque y el mar al fondo, una granja de
//     madera; o.hundido (0–1): el agujero que se abre en el suelo delante (los bueyes y el arado los pone la escena).
export function labAgua(R, t, o = {}) { provisional(R, t, C.anhidrita, C.aguaPozo); return { suelo: 150 }; }

// ── G · 1965: la cocina de Michigan y el despacho de Miami ─────────────────────────────────────────────────────────────
// o.encuadre:
//   'cocina': la cocina de una casa del norte de Michigan en enero de 1965: la ventana con nieve que cae, el bosque de
//     pinos nevado, la nevera redonda de la época, la radio, el calendario (sin letras), la mesa con mantel de cuadros,
//     la taza humeante y la revista abierta (portada inventada, sin letras); sitio para el niño en una silla y para el
//     gato del gag sobre la mesa;
//   'miami': el despacho de un constructor en Miami en 1965: persiana con luz de sol a rayas, palmeras por la ventana,
//     planos en la mesa, un ventilador de techo que gira, un casco de obra en el perchero; sitio para un personaje que lee.
export function casa1965(R, t, o = {}) { provisional(R, t, C.blanco, C.roble); return { suelo: 150 }; }

// ── H · Oak Island hoy ──────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'excavacion': la zona del Pozo del Dinero hoy: una grúa sobre orugas enorme que clava un tubo de acero más ancho que
//     una persona (o.tubo 0–1: baja; o.sale 0–1: sale chorreando y vacío), plataformas, mangueras, generadores, vallas,
//     contenedores, conos, charcos, los robles y la bahía detrás; vida: humo, gaviotas, operarios pequeños al fondo;
//   'calzada': la calzada de tierra y piedra que une la isla con la costa (o.epoca '1965': se está construyendo, con una
//     excavadora; 'hoy': camiones que pasan); el agua a los dos lados con la marea;
//   'caseta': dentro de la caseta de la excavación: pantallas con escáneres del subsuelo (capas de colores y ecos), un
//     plano de la isla clavado, mesas con portátiles, cafés, cascos en ganchos; sitio para cuatro personajes;
//   'hallazgos': un inserto de la mesa de los hallazgos: monedas antiguas, clavos hechos a mano, trozos de madera con
//     etiquetas de laboratorio (sin letras: números), una lupa, guantes; al fondo, un cuadro con una granja de colonos.
export function oakHoy(R, t, o = {}) { provisional(R, t, C.acero, C.hoja); return { suelo: 150 }; }
