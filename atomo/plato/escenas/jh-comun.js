// Fontanería y decorados del episodio 20 (Los Juegos del Hambre: lo que hay que saber antes de Amanecer en la cosecha) en
// el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el Distrito 12 (exteriores),
// B los interiores del 12 (el tren, la casa del alcalde, el salón de la tele), C el Capitolio, D la arena vista desde
// fuera (la sala de control de los Vigilantes y sus maquetas), E lo real (el mundo de verdad detrás de Panem) y F hoy (el
// cine y el cuarto de la fan); más la pieza del hilo de gags: el pan con ojos.
// Los personajes son los de ELENCO_JH y PIEZAS_JH (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos, letras ni nada copiado de las películas. SIN DESTRIPES del libro nuevo. SIN MUERTES EN PANTALLA: los Juegos se
// ven desde fuera (maquetas, pantallas, el contador de tributos), nunca la violencia; nada morboso.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas,
// butacas, el sofá) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores»
// (en el 18 el orden de dibujo fue el fallo número uno). La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la
// barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/jh-comun.js';
//   const { E, R, M } = await T.preparar('jh-gancho');
//   T.rodar(E, R, [[0, (t) => T.distrito(R, t, { encuadre: 'plaza' })]], { año: 50 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el Distrito 12: carbón, madera gastada, tejados de chapa, el cielo gris del amanecer
    carbon: '#2a2a30', carbonL: '#4a4a52', tabla: '#7a6a5a', tablaS: '#4a3e34', chapa: '#8a8e96', polvo: '#b8aa98',
    // el Capitolio: colores chillones, cristal, mármol blanco, el dorado
    capRosa: '#e85aa8', capTurq: '#3ad0c8', capMorado: '#8a4ad8', marmol: '#eef0f4', marmolS: '#c8ccd8', oroCap: '#e8b830',
    // la arena: el verde del prado del 50, el azul de la cúpula y el brillo del campo de fuerza
    prado: '#5ab84a', pradoS: '#2e7a2e', cupula: '#8ad8ff', campoF: '#e8fbff',
    // lo real y hoy: el azul de las pantallas
    pantallaHoy: '#4a8ae8',
    // el pan con ojos: corteza dorada, miga
    corteza: '#c8843a', cortezaS: '#8a5220', miga: '#f6e2b0',
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
  const E = await escena(id, 'ep20');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en Juegos (los libros no dan años): la rosa de Snow (Juegos 10), el broche (Juegos 50) y la
  // llama de Katniss (Juegos 74–75)
  Object.assign(R.ICONOS, {
    rosa: ['..##...', '.####..', '######.', '.####..', '...#...', '..##...', '...#...'],
    broche: ['.#####.', '#..#..#', '#.###.#', '#######', '#.###.#', '#..#..#', '.#####.'],
    llama: ['...#...', '..##...', '..###..', '.####..', '.#####.', '#######', '.#####.'],
  });
  R.tramosTiempo([[1, 30, R.PALA.ROJO, 'rosa'], [30, 62, R.PALA.ORO, 'broche'], [62, 76, R.PALA.NARANJA ?? R.PALA.ROJO, 'llama']]);
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

// ── A · El Distrito 12 (exteriores) ──────────────────────────────────────────────────────────────────────────────────
// Un pueblo minero pobre y gris en las montañas (nuestro, sin nada copiado de las películas): casas de tablas y chapa,
// polvo de carbón, la mina al fondo, la alambrada del bosque. o.luz 'amanecer' (por omisión: cielo gris rosado, primeras
// luces), 'dia', 'tarde' (naranja) o 'noche'. o.antigua (true): la versión de hace 64 años (Juegos 10), con madera más
// nueva, menos casas y un escenario de tablas viejo. o.encuadre:
//   'plaza': la plaza de la cosecha: el Edificio de Justicia de piedra al fondo con su balcón y dos pantallas grandes del
//     Capitolio a los lados (o.pantalla: lo que muestran, 'sello' (un sello redondo sin letras, por omisión), 'nada' o
//     una función (R, t, [x0,y0,x1,y1]) que pinta dentro); delante, el escenario de madera con dos urnas de cristal llenas
//     de papeletas (o.urna 0–1: cuánto se llenan; o.desborda: las papeletas rebosan y caen); cordones que separan a los
//     chicos por edades en filas; agentes de la paz de blanco en las esquinas; banderines grises que ondean; casas y
//     tejados alrededor; humo de la mina al fondo. o.camara 'general' o 'escenario' (de cerca: el escenario a la altura de
//     los ojos, las urnas grandes, un micrófono de pie y sitio para cuatro tributos de pie arriba).
//   'calle': la Veta, la calle de casas de mineros al amanecer: casas pequeñas de tablas con porche, ropa tendida, cubos,
//     charcos, una cabra, gallinas, faroles; una puerta abierta con luz cálida dentro (la casa de Haymitch). o.camara
//     'general' o 'puerta' (de cerca: el porche y la puerta, sitio para una despedida de 3–4 personas).
//   'quemador': el mercado negro en un almacén de carbón viejo: puestos de madera con telas, tarros, pieles, hierbas,
//     velas; faroles colgados; humo de una olla; vendedores. o.camara 'general' o 'puesto' (un puesto de cerca con sitio
//     para una vendedora detrás del mostrador y una chica delante; el mostrador va en distritoDelante).
//   'aldea': la Aldea de los Vencedores: casas grandes y bonitas de piedra, vacías, con césped descuidado, una fuente
//     seca; una casa con el porche lleno de botellas y gansos sueltos. o.camara 'general' o 'porche' (el porche de
//     cerca, con una mecedora y sitio para un hombre sentado o de pie).
//   'bosque': el bosque detrás de la alambrada al atardecer: un lago, un árbol viejo y grande junto al agua (el árbol del
//     ahorcado SIN nada colgado: solo un árbol viejo), pájaros que cantan (notas de música que flotan), juncos, luciérnagas.
//     o.camara 'general' o 'arbol' (el árbol de cerca con sitio para una chica sentada con una guitarra).
// Delante: distritoDelante(R, t, o) con el mostrador del puesto ('quemador' puesto), la barandilla del escenario
// ('plaza' escenario) y la cerca del porche ('aldea' porche): llama a distritoDelante después de los actores. Devuelve
// { suelo, … } con las posiciones (sitios libres para personajes, urnas, puertas).
export function distrito(R, t, o = {}) {
  provisional(R, t, C.carbon, C.polvo);
  return { suelo: 160 };
}
export function distritoDelante(R, t, o = {}) {}

// ── B · Los interiores del 12 y el tren ──────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'tren': el vagón de lujo del Capitolio: sofás de terciopelo, mesa con fruta y pasteles, lámparas doradas, moqueta,
//     ventanas largas con el paisaje que corre (montañas, bosques, postes; recortado a las ventanas). o.camara 'general'
//     o 'ventana' (una ventana grande de cerca con dos personajes delante y el paisaje que corre).
//   'alcalde': la casa del alcalde: un salón ordenado y algo elegante para el 12: piano, cortinas, una mesa con mantel,
//     fotos antiguas enmarcadas en la pared (una con una chica rubia con un broche dorado: un punto amarillo), reloj de
//     pared. o.camara 'general' o 'fotos' (la pared de las fotos de cerca, con sitio para dos chicas).
//   'tele': un salón de una casa de vencedores de noche, en penumbra: una tele vieja que ilumina la habitación con su
//     pantalla (o.pantalla: función (R, t, [x0,y0,x1,y1]) que pinta dentro, o 'nieve'), una butaca, una lámpara, cintas
//     apiladas. o.camara 'general' o 'pantalla' (la pantalla de cerca, grande, con el borde del mueble).
// Delante: interiorDelante(R, t, o) con la mesa del tren y el respaldo de la butaca: llama a interiorDelante después de
// los actores. Devuelve { suelo, pantalla: [x0,y0,x1,y1], … }.
export function interior(R, t, o = {}) {
  provisional(R, t, C.tablaS, C.tabla);
  return { suelo: 160 };
}
export function interiorDelante(R, t, o = {}) {}

// ── C · El Capitolio ─────────────────────────────────────────────────────────────────────────────────────────────────
// Una capital rica, de colores chillones, cristal y mármol (nuestra). o.encuadre:
//   'avenida': una avenida ancha con edificios de cristal y curvas, pantallas, banderolas de colores sin letras, gente con
//     pelucas y ropa extravagante paseando, coches de líneas curvas; montañas al fondo. o.camara 'general' o 'balcon'
//     (desde un balcón, con la multitud abajo).
//   'plato': el plató de las entrevistas: escenario redondo con dos sillones, focos, una pantalla gigante al fondo
//     (o.pantalla: función que pinta dentro, o 'retratos' con 24 o o.n cuadritos de retratos), público con pelucas en
//     gradas que aplaude (o.aplausos 0–1), un medidor de audiencia que sube. o.camara 'general' o 'sillones' (los sillones
//     de cerca, sitio para el presentador y un invitado).
//   'despacho': el despacho de Snow: mesa de madera oscura, una ventana enorme con la ciudad, un cofre con tarjetas
//     (o.cofre 0–1: se abre), jarrón con rosas blancas, bandera sin escudo. o.camara 'general' o 'mesa' (la mesa de cerca:
//     el cofre y una tarjeta grande con un número, a_cifras).
//   'invernadero': un invernadero de cristal lleno de rosales blancos, regaderas, macetas, pétalos que caen, luz de
//     mañana. o.camara 'general' o 'rosas' (los rosales de cerca, sitio para dos personajes).
//   'museo': una galería con tres cuadros grandes en marcos dorados (o.cuadros: funciones que pintan dentro; por omisión,
//     una arena con un reloj, un pájaro en llamas y un palacio con las ventanas apagadas), bancos, columnas. o.camara
//     'general' o 'cuadro' (un cuadro de cerca).
//   'mapa': un mapa de Panem sobre una mesa de cristal: el Capitolio en las montañas y doce distritos alrededor con
//     iconos (carbón, trigo, peces…), trenes que suben a la capital (o.trenes 0–1); o.camara 'general' o 'doce' (el rincón
//     del Distrito 12 de cerca).
// Delante: capitolioDelante(R, t, o) (la barandilla del balcón, la mesa del despacho): llama a capitolioDelante después
// de los actores. Devuelve { suelo, pantalla, … }.
export function capitolio(R, t, o = {}) {
  provisional(R, t, C.marmolS, C.capRosa);
  return { suelo: 160 };
}
export function capitolioDelante(R, t, o = {}) {}

// ── D · La arena vista desde fuera ───────────────────────────────────────────────────────────────────────────────────
// Los Juegos SIEMPRE desde fuera: nunca violencia ni cuerpos. o.encuadre:
//   'control': la sala de control de los Vigilantes: penumbra azul, consolas con luces, pantallas en la pared, y en el
//     centro una maqueta holográfica de la arena (o.arena 'prado' (por omisión: el prado precioso de los Juegos 50, con
//     flores, un bosque y una montaña) o 'reloj' (la arena redonda de doce sectores de los Juegos 75)); o.luces (0–48): las
//     lucecitas de los tributos que flotan sobre la maqueta; o.contador: el número grande de una pantalla (a_cifras);
//     o.engranajes (0–1) una pantalla con engranajes que se paran. o.camara 'general' o 'consola' (una consola de cerca con
//     un Vigilante sentado y la maqueta detrás).
//   'cupula': la maqueta de la arena de cerca, con la cúpula de cristal del campo de fuerza: o.golpe (0–1) el borde
//     invisible brilla en ondas donde recibe un golpe y devuelve una piedra que rebota; o.grieta (0–1) el campo de fuerza
//     se resquebraja como un cristal desde un punto (o.punto [x, y]); o.flecha (0–1) una flecha con un cable vuela hacia
//     el punto. o.camara 'general' o 'borde' (el borde de cerca).
//   'reloj': la arena del 75 vista desde arriba: una isla redonda con doce sectores como un reloj y agua alrededor; o.hora
//     (0–12): la manecilla que avanza; o.camara 'general' o 'sector' (un sector de cerca, la playa y la selva).
// Delante: arenaDelante(R, t, o) (el borde de la consola): llama a arenaDelante después de los actores. Devuelve
// { suelo, maqueta: [x0,y0,x1,y1], … }.
export function arena(R, t, o = {}) {
  provisional(R, t, hex('#0e1430'), C.cupula);
  return { suelo: 160 };
}
export function arenaDelante(R, t, o = {}) {}

// ── E · Lo real detrás de Panem ──────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'salon': un salón de casa de hoy, de noche, con un sofá y una tele encendida que cambia de canal (o.canal 0–1:
//     alterna entre un concurso de focos y colores y un desierto lejano con humo y siluetas lejanas, SIN violencia; o.zap:
//     el parpadeo del cambio). o.camara 'general' o 'tele' (la tele de cerca con el mando).
//   'creta': un laberinto de piedra visto desde arriba junto al mar, con un barco de vela negra que llega a puerto; o.camara
//     'general' o 'puerto' (el muelle de cerca, sitio para chicos y chicas que bajan del barco).
//   'circo': un circo romano lleno: gradas, arena de tierra, el palco del emperador con toldo; o.panes (0–1): vuelan panes
//     desde el palco. o.camara 'general' o 'palco' (el palco de cerca).
//   'biblioteca': un estudio del siglo XVIII de noche: estanterías, escritorio, vela, pluma y tintero, papeles; una ventana
//     con una plaza donde una multitud de figuritas mira a tres figuras en un balcón. o.camara 'general' o 'ventana'.
//   'bosque': un bosque americano de día con un sinsonte gris en una rama (o.canto: el pájaro abre el pico y salen notas o
//     iconos de lo que imita: 'alarma', 'rana', 'atom'). o.camara 'general' o 'rama' (la rama de cerca).
//   'protesta': una plaza de ciudad asiática de hoy con pancartas sin letras (solo colores y símbolos), gente con el brazo
//     levantado y tres dedos; agentes con casco al fondo. Respetuosa, sin violencia. o.manos (0–1) cuántas manos suben.
//     o.camara 'general' o 'manos' (las manos de cerca contra el cielo).
//   'libreria': una librería con una torre de libros que crece (o.torre 0–1) y una cola de lectores por la ventana; una
//     pantalla de móvil con un contador (a_cifras) y un gráfico de barras. o.camara 'general' o 'grafico'.
// Delante: realDelante(R, t, o) (el respaldo del sofá, la barandilla del palco, el mostrador de la librería): llama a
// realDelante después de los actores. Devuelve { suelo, … }.
export function real(R, t, o = {}) {
  provisional(R, t, hex('#2a3a4a'), hex('#c8b8a0'));
  return { suelo: 160 };
}
export function realDelante(R, t, o = {}) {}

// ── F · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cine': una sala de cine de noche: filas de butacas rojas, la pantalla grande encendida (o.pantalla: función (R, t,
//     [x0,y0,x1,y1]) que pinta dentro, o 'nieve'), el haz del proyector con motas, luces de pasillo, gente de espaldas.
//     o.luz 'apagada' (por omisión) o 'encendida' (al acabar, de día). o.camara 'general' o 'butacas' (dos butacas de cerca,
//     de lado, para Atom y el pan; el respaldo de la fila de delante va en hoyDelante).
//   'cuarto': el cuarto de una fan: un tablero de corcho con chinchetas e hilo rojo (o.pistas 0–3: cuántas chinchetas se
//     encienden; o.hilo 0–1), una estantería con cinco libros sin letras y cajas de películas, pósteres sin letras (un
//     sinsajo, una llama), un sofá con manta, una tele, una lámpara, una ventana con la ciudad (o.luz 'tarde' o 'noche'),
//     un mapa de doce distritos en la pared con chinchetas (o.mapa 0–12). o.camara 'general' o 'corcho' (el corcho de
//     cerca).
// Delante: hoyDelante(R, t, o) (el respaldo de la fila de butacas, el brazo del sofá): llama a hoyDelante después de los
// actores. Devuelve { suelo, pantalla, … }.
export function hoy(R, t, o = {}) {
  provisional(R, t, hex('#1a1022'), hex('#a8283a'));
  return { suelo: 160 };
}
export function hoyDelante(R, t, o = {}) {}

// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// El pan con ojos (nuestro): un pan redondo de corteza dorada con dos cortes en la corteza, miga clara asomando, sombreado
// (luz a la izquierda), contorno negro, ~16 × 14 px a o.s 1 (pie en (x, y); a o.s 2, el doble, píxel a píxel); dos ojos
// grandes que parpadean, boquita, bracitos de palo con manoplas y piececitos. Respira y de vez en cuando suelta una miga.
// o.expresion: 'normal' | 'susto' (ojos enormes, tiembla, gota de sudor: lo que le pasa cada vez que oye «cosecha») |
// 'estornudo' (cierra los ojos y estornuda una nube de harina) | 'risa' | 'llora'. o.lleno (0–1, 1): cuánto pan le queda
// (se va comiendo a sí mismo). o.esconde (0–1): se agacha y se tapa con los bracitos; o.nada: nada entre papeletas
// (bracitos de braza); o.señala [x, y]; o.saluda; o.anda; o.dir. Devuelve { x, y, cabeza, mano, ojos }.
export function pan(R, x, y, t, o = {}) {
  const s = Math.max(1, Math.round(o.s ?? 1));
  R.disco(x, y - 7 * s, 8 * s, C.corteza);
  return { x, y, cabeza: [x, y - 10 * s], mano: [x + 8 * s, y - 6 * s], ojos: [x, y - 9 * s] };
}
