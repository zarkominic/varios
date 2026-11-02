// Fontanería y decorados del episodio 19 (Avengers: Doomsday: todo lo que hay que saber antes del estreno, 2019–2026) en el
// estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el lago y la batalla de 2019, B la
// oficina del tiempo, C el multiverso (santuario, Nueva York nevada, el consejo de la Tierra 838) y D el cosmos (las Tierras
// con número, los choques, el reino cuántico), E el escenario (el auditorio de la Comic-Con, el plató de las sillas, la rueda
// de prensa), F el Vacío y la mansión de los mutantes, G Washington y la torre, H la Tierra de los años sesenta e I Latveria
// y la casa de los 4, J hoy (el cine, el cuarto del fan) y K el mundo (Wakanda, Nueva York de hoy); más la pieza del hilo de
// gags: el cubo de palomitas con ojos.
// Los héroes son los de ELENCO_DO y PIEZAS_DO (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos, SIN
// logos, letras ni nada copiado de las películas. Sin destripes. Nada morboso: el chasquido y las desapariciones, con luz y
// polvo de colores.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas,
// butacas) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores» (en el 18,
// el orden de dibujo fue el fallo número uno). La esquina de Atom (x 278–318, y 4–44), siempre tranquila.
//
//   import * as T from '/atomo/plato/escenas/do-comun.js';
//   const { E, R, M } = await T.preparar('do-gancho');
//   T.rodar(E, R, [[0, (t) => T.lago(R, t, { encuadre: 'batalla' })]], { año: 2019 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, PIEZAS_DO, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, PIEZAS_DO };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la batalla y el lago: ruinas, humo, el atardecer naranja, el agua del lago
    ruina: '#6a6470', ruinaS: '#3e3a46', humo: '#8a8494', atardecer: '#e8904a', lagoA: '#3a6a9a', lagoL: '#7ab0d8',
    // la oficina del tiempo: marrones y naranjas de los setenta, el ámbar de las pantallas, el dorado de la línea sagrada
    tvaM: '#8a5a30', tvaN: '#d8783a', ambar: '#f0b040', lineaO: '#ffd860',
    // el multiverso y el cosmos: el naranja de los hechizos, el azul del espacio, los colores de las Tierras
    runa: '#ffb040', espacio: '#0e1430', espacioL: '#2a3a7a', nebulosa: '#8a3ab0', cuantico: '#e05ab0',
    // el escenario: butacas rojas, focos, la pantalla gigante
    butaca: '#a8283a', foco: '#fff0b0', pantallaG: '#1a1e2a',
    // el Vacío: arena rojiza y restos; los sesenta: pastel, cromo y turquesa; Latveria: piedra gris y verde
    vacio: '#c87a4a', vacioS: '#8a4a2a', pastel: '#f0c8a0', cromo: '#d0d8e0', turquesa: '#3ab0a8', latveria: '#6a7068', verdeDoom: '#2a6a3a',
    // Wakanda: oro y verde selva; hoy: el azul de las pantallas
    wakandaO: '#d8a830', selva: '#2a7a4a', pantallaHoy: '#4a8ae8',
    // las palomitas: cubo de rayas rojas y blancas, palomitas mantequilla
    rayaR: '#d82a2a', rayaB: '#f6f2ea', palomita: '#fff4c8', palomitaS: '#e8c870',
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
  const E = await escena(id, 'ep19');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la gema (2019–2023) y la máscara de Doom (2024–2026)
  Object.assign(R.ICONOS, {
    gema: ['...#...', '..###..', '.#####.', '#######', '.#####.', '..###..', '...#...'],
    mascara: ['.#####.', '#######', '##.#.##', '#######', '#.###.#', '#.#.#.#', '.#####.'],
  });
  R.tramosTiempo([[2019, 2023, R.PALA.ORO, 'gema'], [2024, 2026, R.PALA.VERDE ?? R.PALA.AZUL, 'mascara']]);
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

// ── A · El lago y la batalla de 2019 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'batalla': un campo de batalla en ruinas tras la gran pelea: un edificio derrumbado, cráteres, humo que sube, restos
//     de naves, cielo naranja; o.destello (0–1): el destello blanco del chasquido llena el plano y el ejército del fondo se
//     deshace en polvo de colores (sin cuerpos, nada morboso); o.luz 'dia' o 'noche'; o.camara 'general' o 'pedestal' (de
//     noche, una armadura roja y dorada sobre un pedestal entre las ruinas, con una vela de homenaje).
//   'campo': un campo de flores y pájaros junto a una cabaña en un planeta verde; o.polvo (0–1): la mitad de las flores y
//     de los pájaros se deshace en polvo de luz; o.camara 'general' o 'cerca'.
//   'laboratorio': el garaje-laboratorio junto al lago: la plataforma circular del tiempo con sus luces, ordenadores,
//     trajes colgados, herramientas; o.viaje (0–1): destellos en la plataforma; tres relojes en una pizarra (2012, 2013,
//     2014, 1970 con R.numero); o.camara 'general' o 'estuche' (el estuche abierto con las seis gemas y el martillo).
//   'cocina': una cocina de los años cuarenta, de noche: radio de válvulas, nevera redonda, ventana con la calle; o.camara
//     'general' o 'radio' (sitio para que una pareja baile despacio).
//   'lago': un lago al atardecer con un muelle, juncos, árboles y un banco de madera de frente; o.camara 'general' o
//     'banco' (el banco de cerca para un anciano y otro personaje de pie); o.ramas (0–1): un árbol de luz en el cielo.
// Delante: lagoDelante(R, t, o) con el respaldo del banco y la barandilla del laboratorio: llama a lagoDelante después
// de los actores. Devuelve { suelo, … } según el encuadre.
export function lago(R, t, o = {}) {
  provisional(R, t, C.ruinaS, C.atardecer);
  return { suelo: 160 };
}
export function lagoDelante(R, t, o = {}) {}

// ── B · La oficina del tiempo ─────────────────────────────────────────────────────────────────────────────────────────
// Una burocracia retro de los años setenta que vigila el tiempo (nuestra, sin logos). o.encuadre:
//   'oficina': una nave enorme de oficinas: filas de mesas con máquinas de escribir, archivadores, tubos neumáticos con
//     cápsulas que pasan, relojes grandes en las paredes, lámparas naranjas, moqueta marrón, agentes al fondo; o.camara
//     'general' o 'pantalla' (un monitor ámbar grande con UNA línea del tiempo dorada recta; o.ramas 0–1 la ramifica).
//   'arbol': un vacío oscuro donde flota la línea del tiempo como una rama de luz; o.ramas (0–1) le brotan ramas de
//     colores, cada una con un mundito al final; o.camara 'general' o 'poda' (un tramo de rama de cerca con sitio para un
//     agente con tijeras de podar).
//   'fin': el fin del tiempo: un castillo flotante en el vacío con un despacho de madera y un gran ventanal; o.telar (0–1)
//     un telar gigante de luz que se rompe; o.camara 'general' o 'trono' (un trono en el centro de un árbol de ramas de luz
//     que suben, sitio para Loki sentado).
// Delante: tiempoDelante(R, t, o) con las mesas de la oficina: llama a tiempoDelante después de los actores.
export function tiempo(R, t, o = {}) {
  provisional(R, t, C.tvaM, C.tvaN);
  return { suelo: 160 };
}
export function tiempoDelante(R, t, o = {}) {}

// ── C · El multiverso ─────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'santuario': el santuario de un hechicero en Nueva York: escalera, vidriera redonda, libros, reliquias, velas; o.hechizo
//     (0–1): un círculo de runas doradas que se tuerce; o.portal (0–1): un portal de chispas naranjas; o.luz 'dia'/'noche';
//     o.camara 'general' o 'portal' (el portal de cerca).
//   'nieve': Nueva York de noche con nieve: calles, rascacielos, farolas, coches con nieve; o.grieta (0–1): una grieta de
//     luz se abre en el cielo; o.camara 'general' o 'calle' (una calle de cerca con escaparates).
//   'consejo': una sala blanca y solemne en otra Tierra: columnas, suelo pulido, sillas altas en semicírculo para un
//     consejo de héroes; o.camara 'general' o 'jueces' (las sillas altas de cerca).
// Delante: multiversoDelante(R, t, o) (la barandilla del santuario): llama a multiversoDelante después de los actores.
export function multiverso(R, t, o = {}) {
  provisional(R, t, C.espacio, C.runa);
  return { suelo: 160 };
}
export function multiversoDelante(R, t, o = {}) {}

// ── D · El cosmos ─────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'espacio': el espacio con nebulosas y estrellas en capas; varias Tierras, cada una con su número (o.numeros: lista de
//     cifras para R.numero, por ejemplo [616, 838, 828]; o.foco: índice de la Tierra grande); o.choque (0–1): dos planetas
//     se acercan y chocan con un destello (de cuento, sin destrucción gráfica); o.camara 'general' o 'choque' (los dos
//     planetas de cerca).
//   'cuantico': un reino microscópico de colores: burbujas, células gigantes, una ciudad de cristal al fondo, cielo rosa y
//     violeta; o.camara 'general' o 'ciudad'.
export function cosmos(R, t, o = {}) {
  provisional(R, t, C.espacio, C.nebulosa);
  return { suelo: 160 };
}

// ── E · El escenario ──────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'auditorio': un pabellón enorme lleno de fans (siluetas con pancartas sin letras, algunos disfrazados), un escenario con
//     focos y una pantalla gigante; o.pantalla: lo que se ve en ella ('mascara' de Doom, 'fechas' con dos números, 'casco'
//     de un villano azul, o nada); o.ovacion (0–1): el público se levanta; o.camara 'general' o 'pantalla' (el escenario y
//     la pantalla de cerca, sitio para dos o tres personas).
//   'plato': un plató oscuro con una fila de sillas de director que se pierde al fondo (respaldos de lona sin letras),
//     focos; o.contador: un número grande con R.numero; o.camara 'general' o 'silla' (la última silla de cerca, con una capa
//     verde colgada).
//   'prensa': una rueda de prensa: atril con micrófonos, fondo de paneles, flashes; o.camara 'general' o 'cerca'.
// Delante: escenarioDelante(R, t, o) con las cabezas del público de primera fila y el atril: llama a escenarioDelante
// después de los actores.
export function escenario(R, t, o = {}) {
  provisional(R, t, C.pantallaG, C.butaca);
  return { suelo: 160 };
}
export function escenarioDelante(R, t, o = {}) {}

// ── F · El Vacío y la mansión ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'vacio': un desierto rojizo bajo un cielo de tormenta, lleno de restos gigantes de otros universos (una cabeza de
//     estatua enorme medio enterrada, un coche volcado, un letrero sin letras, edificios hundidos); o.camara 'general' o
//     'fortaleza' (una fortaleza en ruinas hecha de restos, de cerca).
//   'mansion': una mansión de escuela de otra época: fachada de ladrillo, jardín, fuente, un avión negro en el hangar al
//     fondo; o.camara 'general' o 'cerca' (la escalinata, sitio para 6 personajes en fila).
export function vacio(R, t, o = {}) {
  provisional(R, t, C.vacioS, C.vacio);
  return { suelo: 160 };
}

// ── G · Washington y la torre ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'torre': la sala de control de una torre de cristal en Nueva York: pantallas grandes (o.pantalla: 'tierra' con R.numero
//     616, 'nave' con una nave con un 4, o nada), una mesa redonda con sillas, el skyline por el ventanal; o.polvo: la sala
//     vacía con polvo y sillas apartadas; o.camara 'general' o 'mesa'.
//   'despacho': un despacho presidencial ovalado (sin escudos ni sellos reales): ventanales, cortinas, banderas genéricas
//     sin estrellas, escritorio, sofás; o.camara 'general' o 'cerca'.
//   'celda': una celda de cristal en una prisión blanca y futurista, con una pantalla detrás; o.camara 'general' o 'cerca'.
// Delante: washingtonDelante(R, t, o) con el escritorio y la mesa redonda: llama a washingtonDelante después de los actores.
export function washington(R, t, o = {}) {
  provisional(R, t, C.cromo, C.espacioL);
  return { suelo: 160 };
}
export function washingtonDelante(R, t, o = {}) {}

// ── H · La Tierra de los años sesenta ────────────────────────────────────────────────────────────────────────────────
// Una Nueva York retrofuturista de los sesenta: coches con aletas, monorraíl, robots, tonos pastel, cromo y turquesa.
// o.encuadre:
//   'ciudad': avenida con desfile, confeti, edificios con antenas y platillos; o.camara 'general' o 'desfile' (la carroza de
//     cerca, sitio para cuatro héroes).
//   'cielo': la ciudad vista desde una azotea con el cielo enorme: o.gigante (0–1) asoma Galactus (PIEZAS_DO.galactus, a
//     escala 2–3) tapando el sol; o.portal (0–1) un portal azul; o.camara 'general' o 'familia' (la azotea de cerca).
export function sesenta(R, t, o = {}) {
  provisional(R, t, C.pastel, C.turquesa);
  return { suelo: 160 };
}

// ── I · Latveria y la casa de los 4 ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'castillo': un castillo de piedra gris con banderas verdes (sin escudos) sobre un pueblo europeo de montaña;
//     o.vinetas (0–1): viñetas de cómic antiguo flotan con un 1962; o.camara 'general' o 'vinetas'.
//   'cuarto': un cuarto infantil de los sesenta retrofuturista: cuna, móvil de planetas, juguetes, ventana con el
//     monorraíl; o.camara 'general' o 'puerta' (la puerta entreabierta, vista desde dentro).
export function latveria(R, t, o = {}) {
  provisional(R, t, C.latveria, C.verdeDoom);
  return { suelo: 160 };
}

// ── J · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cine': una sala de cine de noche: butacas rojas en filas, pasillo con luces, la pantalla grande (o.pantalla:
//     'mascara', 'martillo', 'choque', 'reloj' con R.numero, 'doom', o nada), proyector con su haz; o.luces (0–1); o.camara
//     'general' o 'pantalla' (la pantalla de cerca, con dos filas de butacas delante).
//   'cuarto': el cuarto de un fan: pósteres sin letras (un escudo, unos cuernos, un guante), estantería con cajas de
//     película con iconos, figuras, un mapa en la pared con líneas, Tierras con números y una máscara (o.mapa 0–1 lo
//     completa); o.camara 'general' o 'estanteria'.
// Delante: hoyDelante(R, t, o) con las butacas de delante del cine y el escritorio del cuarto: llama a hoyDelante
// después de los actores.
export function hoy(R, t, o = {}) {
  provisional(R, t, C.pantallaG, C.pantallaHoy);
  return { suelo: 160 };
}
export function hoyDelante(R, t, o = {}) {}

// ── K · El mundo de hoy ──────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'wakanda': una ciudad de torres doradas y verdes entre selva y cascadas, con trenes flotantes; o.camara 'general' o
//     'agua' (la orilla de un río con sitio para que alguien salga del agua).
//   'nyhoy': Nueva York de hoy al atardecer desde lo alto: rascacielos, azoteas, depósitos de agua; o.camara 'general' o
//     'taquilla' (la entrada de un cine con cola, marquesina con luces sin letras).
export function mundo(R, t, o = {}) {
  provisional(R, t, C.selva, C.wakandaO);
  return { suelo: 160 };
}

// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// El cubo de palomitas con ojos (nuestro): un cubo de cartón de rayas rojas y blancas, de ~16 × 18 px a o.s 1 (pie en
// (x, y)), lleno de palomitas que asoman, con dos ojos grandes, boca y bracitos. o.expresion 'normal' | 'susto' | 'llora'
// | 'risa' | 'mareo'; o.salta (0–1) palomitas que saltan; o.saluda; o.tapa (se tapa los ojos); o.gafas; o.dir.
// Devuelve { x, y, cabeza, mano }.
export function palomitas(R, x, y, t, o = {}) {
  R.rect(x - 7, y - 16, x + 7, y, C.rayaR);
  return { x, y, cabeza: [x, y - 18], mano: [x + 8, y - 8] };
}
