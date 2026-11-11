// Fontanería y decorados del episodio 31 (GTA: el juego de Escocia que casi se cancela) en el estilo canónico pixel chibi,
// al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Dundee 1987–1997 (la ciudad junto al Tay y la oficina de DMA),
// B Londres 1997 (la Cámara de los Lores, la redacción sensacionalista, el quiosco), C Nueva York 1998–2013 (el loft de
// Rockstar, la tienda a medianoche, los tribunales), D la ciudad de juguete (vista desde arriba en 1997 y en 3D en 2001) y
// E hoy (el estudio de Atom, la sala de récords, la tienda que espera).
// DERECHOS: NADA del juego real: ni logo, ni portadas, ni personajes, ni interfaz (ni mapa, ni marcador, ni radar en una
// esquina), ni capturas, ni el estilo de sus portadas. La ciudad de juguete es INVENTADA, a nuestra manera, con coches de
// juguete de colores. Los bichitos no copian el diseño de Lemmings. Sin letras. La violencia del juego no se enseña.
// Los personajes son los de ELENCO_GT y PIEZAS_GT (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bancos, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/gt-comun.js';
//   const { E, R, M } = await T.preparar('gt-gancho');
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
// las piezas del episodio (PIEZAS_GT: el coche de policía de juguete, los bichitos, el botón rojo, las cajas de juego sin marca…), las crea el reparto
export const PIEZAS_GT = KIT.PIEZAS_GT || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la piedra gris y la lluvia de Dundee, el beige de los ordenadores de los noventa, el rojo de los bancos de los Lores,
    // el ladrillo de Nueva York, el neón de los ochenta y la ciudad de juguete
    piedraDundee: '#8a8c90', piedraDundeeS: '#5e6064', lluvia: '#9ab0c8', beige: '#d8ccb0', beigeS: '#a89c80',
    rojoLores: '#a8302e', rojoLoresS: '#6e1e1c', ladrillo: '#a8543a', ladrilloS: '#6e3424', neonRosa: '#ff5ab0',
    neonCian: '#4af0f0', asfalto: '#4a4c54', asfaltoS: '#34363c', policiaAzul: '#3a6aff', policiaRojo: '#ff3a3a',
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
  const E = await escena(id, 'ep31');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1987–1997 (Dundee y el primer juego), 1997–2001 (el escándalo y Rockstar), 2001–2013 (el salto a
  // 3D y las polémicas), 2013–2026 (los récords y la espera)
  Object.assign(R.ICONOS, {
    bichito: ['..###..', '.#####.', '#.#.#.#', '#######', '.#####.', '.#...#.', '.......'],
    coche: ['.......', '..###..', '.#####.', '#######', '#######', '.#...#.', '.......'],
    edificio: ['.##.##.', '.##.##.', '.#####.', '.#.#.#.', '.#####.', '.#.#.#.', '#######'],
    trofeo: ['#######', '#.###.#', '.#####.', '..###..', '...#...', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1987, 1997, R.PALA.ORO, 'bichito'], [1997, 2001, R.PALA.ROJO, 'coche'], [2001, 2013, R.PALA.AZUL ?? R.PALA.ROJO, 'edificio'], [2013, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'trofeo']]);
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



// ── A · Dundee, 1987–1997 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'ciudad': Dundee junto al río Tay: casas de piedra gris y tejados de pizarra, el puente largo del ferrocarril sobre el
//     estuario, grúas del puerto, colinas al fondo, cielo nublado con lluvia (o.lluvia 0–1) y claros; gaviotas; un parque con
//     una columna de piedra en la que trepan estatuas de bronce de bichitos (o.estatuas, hoy). o.año: 1990 | 2026 (coches
//     de época). Cámara 'calle': una calle del centro con la fachada de una tienda de pescado frito (letrero de un pez, sin
//     letras) y, encima, la ventana de la primera oficina con luz.
//   'oficina': la oficina de DMA en los noventa: mesas con monitores de tubo beige (PIEZAS_GT.monitorTubo, o.pantalla
//     'ciudad'|'bichitos'), cables, disquetes, cajas de pizza, pizarras con ciudades vistas desde arriba, carteles de cine sin
//     letras, una ventana a un polígono con lluvia; noche (o.noche) con lámparas. Las mesas en dundeeDelante. Cámara
//     'reunion': una sala de reuniones con mesa larga, un proyector, un teléfono de los noventa y una papelera.
export function dundee(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de dundee(); se llama después de los actores, con las mismas opciones
export function dundeeDelante(R, t, o = {}) {
  return {};
}


// ── B · Londres, 1997 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'lores': una cámara parlamentaria con bancos tapizados de rojo (C.rojoLores), madera tallada oscura, vidrieras altas,
//     lámparas de bronce, el trono dorado al fondo (genérico), lores con toga; mesa central con la maza. Los bancos de delante
//     en londresDelante. Cámara 'banco': un lord de pie de cerca, con los bancos y las vidrieras detrás.
//   'redaccion': la redacción de un periódico sensacionalista: mesas con máquinas y ordenadores de 1997, teletipos, montones
//     de periódicos, una pared con primeras planas (titulares de rayas gruesas y un icono de coche, sin letras), humo de
//     café, ventana a Londres con un autobús rojo de dos pisos. Cámara 'quiosco': un quiosco de calle con periódicos
//     colgados que humean (o.humo 0–1; gag 5), lluvia, un taxi negro, gente con paraguas.
export function londres(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de londres(); se llama después de los actores, con las mismas opciones
export function londresDelante(R, t, o = {}) {
  return {};
}


// ── C · Nueva York, 1998–2013 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'loft': el loft de Rockstar a finales de los noventa: ladrillo visto (C.ladrillo), ventanales con el skyline de
//     Nueva York, guitarras y discos en la pared, carteles de cine sin letras, sofás, monitores, una estrella dorada en la
//     puerta (sin letras); de noche (o.noche) con las luces de la ciudad. Las mesas en nuevayorkDelante. Cámara 'despacho':
//     un despacho alto con mesa de reuniones y apretón de manos (la compra), Manhattan detrás.
//   'tienda': una tienda de videojuegos a medianoche: estanterías con cajas de juego genéricas (PIEZAS_GT.cajaJuego), un
//     mostrador con la caja registradora (PIEZAS_GT.cajaRegistradora, o.humo 0–1; gag 7), una cola larguísima en la calle
//     con abrigos y gorros, focos, confeti (o.fiesta). o.año: 2001 | 2008 | 2013. Cámara 'calle': la cola en la calle
//     nevada con taxis amarillos y vapor de las alcantarillas.
//   'tribunal': una sala de tribunal estadounidense: estrado de madera, bandera (sin escudo legible), bancos, un mazo,
//     abogados con carpetas; por la ventana, palmeras (Florida) con o.florida. El estrado en nuevayorkDelante. Cámara
//     'tele': un plató de tele de noticias de los 2000 con sillas, cámaras y una pantalla.
export function nuevayork(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de nuevayork(); se llama después de los actores, con las mismas opciones
export function nuevayorkDelante(R, t, o = {}) {
  return {};
}


// ── D · La ciudad de juguete ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   SIEMPRE INVENTADA, a nuestra manera, NUNCA como el juego real: sin mapa ni marcador ni radar ni interfaz.
//   'arriba': la ciudad de juguete vista desde arriba (1995–1997): manzanas de colores con tejados, calles con pasos de
//     cebra, parques, un río con puente, coches de juguete de colores (PIEZAS_GT.cocheJuguete) que circulan con t, gente
//     diminuta en las aceras; coches de policía de juguete (PIEZAS_GT.cochePolicia) con sus luces; o.persecucion 0–1: los
//     de policía se vuelven locos y persiguen a un coche, y hasta al camión de los helados (gag 4). Cámara 'boton': la
//     mesa de pruebas con el monitor de tubo y el botón rojo gigante (PIEZAS_GT.botonRojo, o.pulsado; gag 3).
//   'tresde': la ciudad de juguete en 3D a pie de calle (2001): calles con edificios altos, puentes, coches con la radio
//     (notas musicales que salen), gente que charla en la acera; o.levanta 0–1: la ciudad plana se levanta en 3D.
//     o.estilo: 'nueva' (gris, invierno, Nueva York inventada) | 'ochenta' (sol, palmeras, neón rosa y cian) | 'tres'
//     (tres ciudades en un horizonte: bahía, desierto y colinas). Cámara 'puente': un puente de noche con los coches.
export function ciudad(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de ciudad(); se llama después de los actores, con las mismas opciones
export function ciudadDelante(R, t, o = {}) {
  return {};
}


// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom: estantería con juegos y una consola sin marca, la ventana
//     con nubes, un póster sin letras, la mesa con el coche de policía de juguete (PIEZAS_GT.cochePolicia, o.coche: 'para' |
//     'persigue' | 'atom' para el gag 8), un bichito de juguete y un mando sin marca; en 'mesa', la mesa de cerca, con
//     sitio para la persecución por el tablero.
//   'records': una sala de récords: gráficas que suben, una montaña de cajas de juego (o.montana 0–1) que crece hasta el
//     techo, un trofeo (PIEZAS_GT.trofeo), un contador gigante de visitas que gira (o.contador: número), confeti. Cámara
//     'filtracion': un ordenador con una alarma roja y una carpeta que se escapa volando (2022), cables, una sala de
//     servidores al fondo.
//   'espera': una tienda de 2026 con las persianas medio bajadas y un calendario con el 19 marcado (solo números), gente
//     que espera fuera, un cartel con una silueta de palmera y neón (sin letras ni logo). Cámara 'disco': un disco brillante
//     en una mesa con una lupa y una caja cerrada con candado y «18+» (Hot Coffee, sin nada más).
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.noche, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}
