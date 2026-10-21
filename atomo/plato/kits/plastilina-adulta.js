// PLASTILINA ADULTA (versión B de la prueba A/B; prueba-identidad/ENCARGO-PLASTILINA-ADULTA.md).
// Copia de kits/plastilina-prueba.js (la versión A, que no se toca) para prueba-plastilina-adulta.html y
// cosmos-plastilina-adulta.html. Lo que cambia respecto a la A:
//  · paleta terrosa y apagada (ocres, arcillas, oliva, pizarra, crema) con un solo acento, el
//    terracota/ámbar de Atom y de la marca de la regla; negros profundos y blancos que no queman;
//  · luz de cine: principal cálida y lateral, contraluz frío que recorta, sombras densas, viñeta, grano
//    de película suave y fondo muy desenfocado (macro);
//  · arcilla más fina: huellas y marcas de herramienta más pequeñas, menos brillo plástico, polvo y
//    fibras, translucidez en la piel;
//  · la persona es un adulto sereno (párpados, cejas, boca neutra, jersey de punto gris, pantalón de
//    tela); Atom lleva núcleo de terracota y crema, órbitas de alambre oscuro y electrones ámbar que
//    brillan con la voz; la regla es de madera de boj con canto de latón y números grabados con una
//    tipografía sobria de Google Fonts (Jost), horneados en una textura de distancias (reglaA, etiqueta).
// (B ajustada, tras verla el dueño; las marcas «(B ajustada)» señalan cada cambio):
//  · más luz: telón más claro, charco cálido del foco más ancho y más relleno (LUZ_PLATO); el plano medio
//    pasa de ~0,19 a ~0,26–0,29 de luminancia media, con el contraluz, la viñeta y las sombras de antes;
//  · Atom se lee en el móvil en todos los planos: órbitas de latón claro, electrones como cuentas de ámbar
//    con luz propia y un brillo vivo, y un halo ámbar suave detrás del núcleo (con un velo oscuro sobre
//    fondos claros);
//  · la mano del primer salto es una mano de arcilla creíble (GLSL_MANO): proporciones reales (0,10 H),
//    nudillos, tendones, una vena, arrugas en las articulaciones, uñas con lúnula y variación de tono;
//  · el pelo como tronco lleva una cutícula de escamas que se solapan como tejas o como las de una piña;
//  · piezas con envolvente (pza_<tipo>): el rayo marcha primero con ella y solo cerca de la superficie
//    paga la forma entera; gG: relieve fino de una pieza aplicado a la normal, no a la forma.
// (cartela, episodio 3) la cartela de capítulo, con la misma API y maqueta en los tres kits adultos:
//
// CARTELA DE CAPÍTULO (la misma API en papel-adulta.js, isometrico-adulta.js y plastilina-adulta.js)
//   const P = await crearPlato({ ..., cartela: E.cartela });   // añade la placa como la última pieza
//   function dibujar(t) { const n = P.fotograma(t), ts = n / 12; P.limpiar(); ...; cartela(P, ts, E.cartela); P.render(n); }
//   cartela(destino, t, texto, opciones) → presencia (1: cartela entera · 0…1: saliendo · 0: ya no está)
//    · texto: el número del salto tal como viene en la escena (E.cartela de marcas-ep03.json): '−4', '+21',
//      '½', '0'… (solo cifras, −, + y ½). Sin texto (undefined, null, '') no pone la placa y devuelve 0.
//    · t: segundos desde el inicio de la escena (el del fotograma de 12 fps). De 0 a CARTELA.sale (0,75 s) la
//      cartela está quieta, grande y centrada (ya compuesta en el instante 0: se entra por corte); de 0,75 a
//      CARTELA.fin (1,2 s) sube y se va por arriba con peso (arranca despacio y acelera); desde 1,2 s no está.
//      La voz entra a 1,5 s.
//    · Maqueta común (CARTELA, en píxeles de diseño): placa de 760 × 440 centrada en (960, 470), por encima de
//      la franja de subtítulos; el número en Jost 600, con las cifras de 240 px de alto (si no cabe en 560 px de
//      ancho, se reduce), centrado por su tinta; marco de latón y número de ámbar sobre nogal.
//    · En arcilla: una losa de plastilina modelada como el nogal de la regla, con un filete de latón en relieve
//      y el número de ámbar en relieve (horneado con Jost en una textura de distancias, como los rótulos). Va de
//      cara a la cámara, delante de la escena (80 % de la distancia al punto de mira), con la luz del plató y
//      una sombra tenue en el ciclorama. Al salir, la mano la levanta, la ladea hacia atrás y la saca por arriba.
//    · destino: el plató creado con { cartela: texto } (o { cartela: true }: la textura se rehace si cambia el
//      texto). Va entre P.limpiar() y P.render(n), como las demás piezas.
//    · opciones: { x, y (centro, px), sale, fin (s), distancia (de la cámara, unidades del mundo) }.
//   cargarFuenteCartela(): carga Jost (crearPlato ya la carga). maquetaCartela(ctx, texto): la maqueta.
//
// (lote 0, episodio 3) REGLA DE −35 A +27, REGLA ENTERA Y PERSONA CON POSTURAS. Compatible con lo anterior: con lo
// que ya escribían las escenas, prueba-plastilina-adulta.html sale idéntica píxel a píxel y cosmos-plastilina-
// adulta.html también, salvo que ahora las filas 10²² y 10²³ llevan su rótulo (antes la textura acababa en 10²¹).
// Demo y comprobación: escenas/ep3-lote0-demo.html (?vista=guias&postura=…&aspecto=… para guias-humano.py).
//
// LA REGLA (pieza 'reglaA', y una pieza 'flecha' para el marcador)
//   Rótulos «10^e m» de 10⁻³⁵ a 10²⁷ (ROT.E_MIN…E_MAX; los de 10⁻⁴ a 10²¹ en su textura de siempre y los demás en un
//   atlas de dos columnas, 476 × 3.776 px). Por debajo de 10⁻³⁵ la cara de la regla es la NIEBLA DE PLANCK (un cojín
//   de arcilla gris con bocanadas) y por encima de 10²⁷, la RED DE GALAXIAS (placa azul noche con filamentos de luz
//   y cúmulos): son los remates; se ven al llegar a los extremos o en la regla entera.
//   const R = P.regla({ pieza, flecha, pos, escala: 1.42, rot: [0, −0.12, 0], e, ya: 0, actual: e, lupa: 0.5,
//                       entera: 0, lupaEntera: 1.3, rango: null, marca: actual, escalaFlecha: 0.8, toque: false })
//    · pieza / flecha: índices de las piezas 'reglaA' y 'flecha' (flecha opcional). pos, escala y rot: los de la
//      regla (las pruebas: pos = P.punto(1668, 528, 0.4), escala 1,42); la flecha se pone sola a su izquierda.
//    · e: el exponente que queda a la altura local ya (la losa va de y = −1,85 a 1,85 y cada potencia ocupa
//      REGLA.RS = 0,75): para que la escala corra, anima e (puede ser fraccionario).
//    · actual: la fila grande y en ámbar (por defecto e; fraccionario mientras se mueve); lupa: su aumento.
//    · entera (0…1, animable): la regla se comprime sin saltos hasta verse entera, de −35 (con la niebla debajo) a
//      +27 (con la red encima), −4 en el centro (y local 0) y una marca por potencia (63, «unas sesenta»). Entonces
//      solo llevan rótulo −35, −4, 0, +7 y +27 y la fila actual (grande y en ámbar, aumento lupaEntera); el rótulo
//      que choca con el actual se encoge. Las marcas del logaritmo se van al comprimirse.
//    · marca: el exponente al que apunta la flecha (por defecto actual). Ep3-centro: entera 1, la flecha baja de
//      +27 a 0 y cae cuatro saltos: marca y actual de 0 a −4.
//    · rango: { de, a, marcas: 0…1, madera: 0…1 } resalta de 10^de a 10^a: sus marcas y rótulos se encienden en
//      ámbar (marcas) y la madera se aclara (madera). «Las marcas se encienden una a una»: { de: −35, a: −35 + 62·u }.
//    Devuelve { s, ya, RS, y(e): y local del exponente e, punto(e, x, z): punto del mundo (por defecto en el canto
//    izquierdo, a la altura de e), flecha: el punto al que apunta }. Para poner algo junto a una marca (ep3-saltos:
//    las miniaturas en −4, +7 y +27): P.pieza(k, { pos: R.punto(27), … }).
//    Por dentro escribe P.U.uReglaA (s, ya, lupa, actual), uReglaB (RS, entera, —, lupaEntera) y uReglaC (de, a,
//    marcas, madera). Las escenas que escriben uReglaA a mano siguen igual (con uReglaB y uReglaC por defecto se usa
//    el código de antes). reglaEstado({ e, ya, entera }) da la escala sin plató; REGLA, las medidas.
//   Miniaturas de los remates (ep3-saltos): piezas 'red' (medallón de radio 0,5 con la red de galaxias y aro de
//   latón) y 'niebla' (nube gris de 0,6). El rótulo suelto 'etiqueta' vale para cualquier exponente de −35 a +27
//   (variante = −e: 4 → 10⁻⁴; −27 → 10²⁷).
//
// LA PERSONA CON POSTURAS (pieza 'humano'; la de siempre, 'persona', queda quieta para las pruebas)
//   La misma persona (cara, jersey, pantalón, zapatos y medidas de HUMANO.md: suela en y = −1, coronilla en 0,765,
//   mira a +z, su izquierda en +x; de pie sobre el suelo del plató con pos [x, escala, z]), articulada:
//   const h = P.pieza(i, { pos, escala, rot, sq, postura, aspecto, t, toque, huellaFija })
//    · postura: un nombre de POSTURAS, con o sin tildes: 'de pie', 'sostener' (las dos manos delante del pecho,
//      cerradas), 'señalar' (con la derecha), 'saludar' (con la derecha; el vaivén lo pone t), 'sentada' (se baja
//      sola hasta que los pies pisan: la silla va en h.punto('asiento')), 'brazos cruzados', 'mirarse las manos',
//      'perfil' (cara un poco arriba y ojos cerrados; de perfil girando la pieza: rot [0, ±π/2, 0]) y 'mirar
//      arriba'; o un objeto (lo que falte, de pie; los signos, en POSTURA_BASE):
//        { cabeza: [giro, inclina, ladea], torso: [inclina, giro, ladea], ojos: 0…1, mirada: [x, y],
//          brazoIzq / brazoDer: [flex, abd, rot, codo, prona, muneca], manoIzq / manoDer: 0 abierta · 1 índice ·
//          2 puño (y todo lo de en medio), piernaIzq / piernaDer: [flex, abd, rodilla, tobillo], apoyo: 1,
//          apuntarIzq / apuntarDer: [x, y, z] (punto local: el hombro gira para que el antebrazo lo señale),
//          fantasma: 0…1 (las manos se vuelven casi transparentes: pálidas, frías y con luz propia) }
//      Izq/Der son los de la persona (su izquierda queda a la derecha de la pantalla si mira a cámara). Los tramos
//      no cambian en ninguna postura: brazo 0,18 H, antebrazo 0,14 H, mano 0,10 H, pie 0,15 H.
//    · t: el instante (s) para lo que se mueve solo ('saludar').
//    · aspecto: 'adulto' (el de siempre, con barba y canas) · 'nino' (niño de unos 7 años: cabeza de 1/4,7 de la
//      altura y piernas de 0,45 H; mide 1,685 en vez de 1,765 a la misma escala: junto a un adulto de 1,75 m, escala
//      × 0,72) · 'melena' (pelo hasta la mandíbula, jersey oliva) · 'mono' (pelo recogido, jersey pizarra) · o
//      { cuerpo: 'adulto'|'nino', pelo: 'corto'|'melena'|'mono'|{ largo, mono, mechon }, jersey: 'gris'|'oliva'|
//      'ocre'|'pizarra'|'crema'|'arcilla'|[r, g, b], pantalon: 'caqui'|'gris'|'azul'|'marron'|[r, g, b], piel:
//      'media'|'clara'|'morena'|'oscura'|factor, colorPelo: [r, g, b], barba: 0…1, canas: 0…1 } (ASPECTOS, aspecto()).
//    · Devuelve h = { punto(nombre) → [x, y, z] del mundo, puntos, local, esqueleto, mundo(local) }. Nombres:
//      cabeza, ojos, coronilla, barbilla, cuello, pecho, pelvis, asiento, regazo y hombro, codo, muneca, mano (el
//      centro del agarre), dedos (la punta), cadera, rodilla, tobillo, pie (la punta), con Izq o Der. Lo que sostiene
//      la mano va en h.punto('manoDer'). P.humano(i) devuelve el último h de esa pieza.
//   Entre posturas: mezclarPosturas(a, b, u, t) interpola ángulo a ángulo; posturaEn(t, [[t0, a], [t1, b], …],
//   { trans: 0.5 }) va de clave en clave (en cada ti la postura ya está entera; el paso dura trans s y es suave).
//   postura(nombre, t) da el objeto completo para retocarlo; esqueletoHumano(postura, aspecto, t) da el esqueleto
//   sin plató (p. ej., dónde quedará el asiento antes de sentarse) y HUMANO, las medidas.
//   Coste (este servidor): más cara que 'persona' (≈ 1,7 veces en primer plano; ≈ 1,2–1,8 s por persona de 600 px
//   de alto). Persona + regla + Atom: 3–4 s por fotograma; tres personas: 4,5–6 s. Con varias personas, lo que no se
//   mueva va en foto (como los decorados de prueba-plastilina-adulta).
// ----- (lo que sigue es el comentario de la copia de prueba) -----
// COPIA de kits/plastilina.js para las pruebas de identidad (prueba-plastilina.html, prueba-mixta.html, cosmos-plastilina.html).
// kits/plastilina.js lo usan escenas terminadas del episodio 2 y no se toca. Añadidos de esta copia:
//  · tipos de pieza nuevos: persona, mano, piel, pelo, tronco, regla, flecha, pizarra, vecino, cota,
//    etiqueta (ver TIPOS_PRUEBA) y glifos 0, −, m, !;
//  · crearPlato({ alfa: true }) crea el lienzo con transparencia, y render(n, { fondo: false }) dibuja solo
//    las piezas sobre fondo transparente (sin ciclorama ni su sombra), para componer encima de otra cosa.
// -------------------------------------------------------------------------------------
// Kit de plastilina (stop-motion) para las escenas del vídeo largo.
//
//   import { crearPlato, PIEZA, ... } from '/atomo/plato/kits/plastilina.js';
//   const P = await crearPlato({
//     camara: { pos, mira, fov }, globo: true, tablero: true, polvo: 8,
//     piezas: ['luna', 'ficha', 'glifo:3', ...],          // tipo fijo de cada pieza suelta
//     sombras: { tablero: ['p0', 'polvo'] },             // quién proyecta sombra sobre quién (además de sí misma)
//   });
//   function dibujar(t) {
//     const n = P.fotograma(t), ts = n / 12;               // fotograma a 12 fps
//     P.limpiar();
//     P.atomo({ pos, escala, energia: E.energia(ts), ts });
//     P.tablero({ ... }); P.pieza(0, { pos, escala, rot }); ...
//     P.render(n);
//   }
//
// El plató es el del demo aprobado (estilos/10-arcilla-3d.html): ciclorama azul pizarra con
// estrellitas de arcilla, luz cálida de estudio, relleno frío y contraluz. Todo se modela con
// distancias con signo (uniones suaves = arcilla que se funde) y se ilumina con sombras suaves,
// oclusión, dispersión bajo la superficie, huellas dactilares y el «hervor» de cada fotograma.
//
// Coste. En este servidor (SwiftShader, sin GPU) un sombreador ejecuta todo su código en cada
// píxel, aunque esté dentro de un «if» que no se cumple. Por eso el kit no usa un sombreador único:
//   · el ciclorama (ruido, estrellitas, luz) se hornea una sola vez en dos texturas (luz directa y
//     luz ambiente); cada fotograma solo le añade la sombra y la oclusión de la arcilla, calculadas a
//     un tercio de resolución (son suaves) con versiones simplificadas de las piezas;
//   · cada pieza se dibuja con su propio programa (solo su forma y su material) y solo en el
//     rectángulo de pantalla que ocupa; las piezas se componen con profundidad y bordes suavizados;
//   · las sombras sobre una pieza usan su forma simplificada y las de las piezas que se indiquen.

import * as THREE from 'three';

export const W = 1920, H = 1080, FPS = 12;

// ---------- utilidades de animación ----------
export const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
export const mix = (a, b, x) => a + (b - a) * x;
export const prog = (x, a, b) => cl((x - a) / (b - a));
export const ss = (a, b, x) => { x = cl((x - a) / (b - a)); return x * x * (3 - 2 * x); };
export const eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eoc = (x) => 1 - Math.pow(1 - x, 3);
export const eic = (x) => x * x * x;
export const eob = (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// número fijo para cada fotograma y canal (el «hervor» del stop-motion)
export const azar = (n, k) => { const r = mulberry32((n + 1) * 7919 + k * 104729); r(); return r(); };
// oscilación amortiguada desde u = 0 (para asentarse tras un golpe): 0 antes, 1 en u = 0
export const muelle = (u, f = 3.2, k = 6) => (u < 0 ? 0 : Math.exp(-u * k) * Math.cos(u * f * 2 * Math.PI));
// brote: escala 0 → 1 que se completa en tFin (empieza `antes` segundos antes) y rebota un poco
export function brote(ts, tFin, antes = 0.25, sobre = 0.14) {
  if (ts < tFin - antes) return 0;
  const u = prog(ts, tFin - antes, tFin);
  if (ts < tFin) return eob(u, 2.2) * (1 + sobre * ss(0.5, 1, u));
  return 1 + sobre * muelle(ts - tFin, 2.6, 7);
}
// los últimos QUIETO segundos de cada escena son una imagen fija (P.fotograma(t, duracion) se
// detiene ahí), y `calma` frena los movimientos de reposo (balanceos, giros, electrones) durante
// los `t` segundos anteriores: la escena «se asienta y queda quieta»
export const QUIETO = 0.3;
export function calma(ts, fin, t = 0.8) {
  const a = fin - QUIETO - t;
  if (ts <= a) return ts;
  const u = Math.min(ts - a, t);
  return a + u - (u * u) / (2 * t);
}
// reacción del átomo al sello del marcador (la usan marcador y recuento, para empalmar):
// ✓ dos saltos de alegría y los electrones se aceleran; ✗ niega con la cabeza y se encoge
export const T_GOLPE = 0.5;
export function reaccionMarcador(ts, tz, si) {
  const tr = T_GOLPE + 0.08;
  let dy = 0, yaw = -0.45, roll = 0.04, sq = [1, 1, 1], tsE = tz;
  if (si) {
    const s1 = prog(ts, tr, tr + 0.42), s2 = prog(ts, tr + 0.5, tr + 0.8);
    const h = 0.55 * Math.sin(Math.PI * s1) + 0.22 * Math.sin(Math.PI * s2);
    const aire = (s1 > 0 && s1 < 1 ? Math.sin(Math.PI * s1) : 0) + (s2 > 0 && s2 < 1 ? 0.6 * Math.sin(Math.PI * s2) : 0);
    const prep = Math.sin(Math.PI * prog(ts, tr - 0.17, tr + 0.02));
    const cae = 0.22 * muelle(ts - (tr + 0.42), 2.6, 8) * (ts < tr + 0.5 ? 1 : 0) + 0.16 * muelle(ts - (tr + 0.8), 2.6, 7);
    dy = h - 0.05 * prep;
    const k = 0.18 * aire - 0.16 * prep - cae;   // + estira, − aplasta
    sq = [1 - 0.5 * k, 1 + k, 1 - 0.5 * k];
    roll += 0.22 * Math.sin(Math.PI * s1) * Math.sin(Math.PI * 2 * s1);
    tsE = tz + 1.6 * eio(prog(ts, tr, tr + 0.9));
  } else {
    const v = prog(ts, tr, tr + 1.0);
    yaw += 0.6 * Math.sin(v * Math.PI * 5) * Math.pow(1 - v, 1.3);
    const enc = ss(tr, tr + 0.3, ts) * (1 - 0.6 * ss(tr + 0.9, tr + 1.4, ts));
    dy = -0.12 * enc;
    sq = [1 + 0.05 * enc, 1 - 0.1 * enc, 1 + 0.05 * enc];
    roll += -0.12 * enc;
    tsE = tz - 0.5 * eio(prog(ts, tr, tr + 1.2));
  }
  return { dy, yaw, roll, sq, tsE };
}
export const veredictoATipo = (v) => (v === '✓' ? 1 : v === '✗' ? 2 : 0);
export const COLOR = { TINTA: 0, MANTEQUILLA: 1, MOSTAZA: 2, CREMA: 3, TERRACOTA: 4, VERDE: 5 };
// la luz principal del plató (la misma que en el sombreador)
export const LUZ = [-7.0, 9.5, 10.5];

// tablero (unidades locales): paso entre casillas, semiancho, semialto, semigrosor, fila de números, fila de huecos
export const TAB = { PASO: 1.0, HW: 3.3, HH: 1.1, GR: 0.3, YD: 0.57, YW: -0.29 };

const fl = (v) => { const s = Number(v).toFixed(5); return s; };
const rad = (g) => (g * Math.PI) / 180;

// ---------- glifos: trazos de churro (alto 1, centrados) ----------
// ['s', ax, ay, bx, by] segmento · ['a', cx, cy, r, centro°, semiapertura°] arco · ['c', cx, cy, r] círculo · ['p', x, y] bolita
const GLIFOS = {
  '1': [['s', 0.06, -0.5, 0.06, 0.5], ['s', 0.06, 0.5, -0.2, 0.27], ['s', -0.17, -0.5, 0.29, -0.5]],
  '2': [['a', 0, 0.21, 0.27, 60, 100], ['s', 0.207, 0.036, -0.27, -0.5], ['s', -0.27, -0.5, 0.3, -0.5]],
  '3': [['a', 0, 0.235, 0.235, 30, 120], ['a', 0, -0.245, 0.255, -30, 120]],
  '4': [['s', 0.14, -0.5, 0.14, 0.5], ['s', 0.14, 0.5, -0.3, -0.14], ['s', -0.3, -0.14, 0.31, -0.14]],
  '5': [['s', 0.27, 0.5, -0.18, 0.5], ['s', -0.18, 0.5, -0.185, 0.045], ['a', 0, -0.19, 0.29, -6, 134]],
  '6': [['c', 0, -0.21, 0.27], ['a', 0.45, -0.21, 0.72, 145, 35]],
  '?': [['a', 0, 0.24, 0.25, 50, 110], ['s', 0.125, 0.0235, 0, -0.09], ['s', 0, -0.09, 0, -0.17], ['p', 0, -0.43]],
  '✓': [['s', -0.33, 0.03, -0.1, -0.23], ['s', -0.1, -0.23, 0.35, 0.31]],
  '✗': [['s', -0.27, -0.27, 0.27, 0.27], ['s', -0.27, 0.27, 0.27, -0.27]],
  '·': [['p', 0, 0]],
  '0': [['a', 0, 0.2, 0.2, 90, 90], ['a', 0, -0.2, 0.2, -90, 90], ['s', -0.2, -0.2, -0.2, 0.2], ['s', 0.2, -0.2, 0.2, 0.2]],
  '−': [['s', -0.2, 0, 0.2, 0]],
  'm': [['s', -0.32, -0.5, -0.32, 0.14], ['a', -0.16, -0.02, 0.16, 90, 90], ['s', 0, -0.5, 0, -0.02], ['a', 0.16, -0.02, 0.16, 90, 90], ['s', 0.32, -0.5, 0.32, -0.02]],
  '!': [['s', 0, -0.14, 0, 0.5], ['p', 0, -0.42]],
  '7': [['s', -0.27, 0.5, 0.29, 0.5], ['s', 0.29, 0.5, -0.05, -0.5]],
  '8': [['c', 0, 0.255, 0.215], ['c', 0, -0.225, 0.265]],
  '9': [['c', 0, 0.21, 0.27], ['a', -0.45, 0.21, 0.72, -35, 35]],
};
const NOMBRE_GLIFO = { '1': 'g1', '2': 'g2', '3': 'g3', '4': 'g4', '5': 'g5', '6': 'g6', '?': 'gq', '✓': 'gsi', '✗': 'gno', '·': 'gpt', '0': 'g0', '−': 'gmenos', 'm': 'gm', '!': 'gexc', '7': 'g7', '8': 'g8', '9': 'g9' };
// (para otros módulos: el GLSL de unos glifos, con sdSeg y sdArco)
export const glslGlifos = (chars) => `float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }\nfloat sdArco(vec2 p, vec2 c, float r, vec2 cs, vec2 e) { p -= c; p = vec2(dot(p, cs), cs.x * p.y - cs.y * p.x); p.y = abs(p.y); return (p.y * e.x > p.x * e.y) ? length(p - e * r) : abs(length(p) - r); }\n` + [...chars].map((c) => glslGlifo(c)).join('');
export { NOMBRE_GLIFO };
function glslGlifo(c) {
  let s = `float ${NOMBRE_GLIFO[c]}(vec2 p, out float dp) {\n  dp = 1e5; float d = 1e5;\n`;
  for (const t of GLIFOS[c]) {
    if (t[0] === 's') s += `  d = min(d, sdSeg(p, vec2(${fl(t[1])}, ${fl(t[2])}), vec2(${fl(t[3])}, ${fl(t[4])})));\n`;
    if (t[0] === 'a') s += `  d = min(d, sdArco(p, vec2(${fl(t[1])}, ${fl(t[2])}), ${fl(t[3])}, vec2(${fl(Math.cos(rad(t[4])))}, ${fl(Math.sin(rad(t[4])))}), vec2(${fl(Math.cos(rad(t[5])))}, ${fl(Math.sin(rad(t[5])))})));\n`;
    if (t[0] === 'c') s += `  d = min(d, abs(length(p - vec2(${fl(t[1])}, ${fl(t[2])})) - ${fl(t[3])}));\n`;
    if (t[0] === 'p') s += `  dp = min(dp, length(p - vec2(${fl(t[1])}, ${fl(t[2])})));\n`;
  }
  return s + '  return d;\n}\n';
}

// ---------- tipos de pieza suelta ----------
// cada tipo: radio envolvente (unidades locales), forma con detalle pz_<t>(q, T, m),
// forma simplificada (siempre dentro de la detallada) pzc_<t>(q, T) y color pzcol_<t>(q, T, m).
// T = (tipo, variante, color o puntos, —)
const RADIO_TIPO = { luna: 0.62, remolino: 0.48, estrella: 0.62, pesa: 0.66, bascula: 0.72, ficha: 0.56, bocadillo: 1.32, glifo: 0.66 };
const GLSL_TIPOS = {
  luna: /* glsl */`
float pz_luna(vec3 q, vec4 T, out float m) {
  m = 0.0;
  vec3 k = q; k.x += 0.15; k.z /= 0.6;
  float d = length(k) - 0.5;
  d = smax(d, -(length(k.xy - vec2(-0.21, 0.0)) - 0.46), 0.1);
  d = smax(d, -(length(k - vec3(0.36, 0.06, 0.38)) - 0.06), 0.025);
  d = smax(d, -(length(k - vec3(0.22, -0.3, 0.36)) - 0.045), 0.02);
  return d * 0.6;
}
float pzc_luna(vec3 q, vec4 T) {
  vec3 k = q; k.x += 0.15; k.z /= 0.6;
  return max(length(k) - 0.48, -(length(k.xy - vec2(-0.21, 0.0)) - 0.48)) * 0.6;
}
vec3 pzcol_luna(vec3 q, vec4 T, float m) { return C_BUTTER * (0.95 + 0.1 * vnoise(q * 5.0)) + vec3(0.03, 0.01, -0.01) * vnoise(q * 18.0); }
`,
  remolino: /* glsl */`
float espiral(vec2 p) {
  float d = sdArco(p, vec2(0.0), 0.08, vec2(0.0, 1.0), vec2(0.0, 1.0));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.125, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.17, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.045, 0.0), 0.215, vec2(0.0, -1.0), vec2(0.0, 1.0)));
  d = min(d, sdArco(p, vec2(0.0), 0.26, vec2(0.0, 1.0), vec2(0.0, 1.0)));
  return min(d, sdArco(p, vec2(0.045, 0.0), 0.305, vec2(0.0, -1.0), vec2(0.62161, 0.78333)));
}
float pz_remolino(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float r = 0.042 + 0.03 * clamp(length(q.xy) / 0.32, 0.0, 1.0);
  return churro(espiral(q.xy), q.z, r);
}
float pzc_remolino(vec3 q, vec4 T) { return churro(espiral(q.xy), q.z, 0.035); }
vec3 pzcol_remolino(vec3 q, vec4 T, float m) { return C_WATER * (0.9 + 0.2 * vnoise(q * 6.0)); }
`,
  estrella: /* glsl */`
float pz_estrella(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.1;
  vec2 w = vec2(d2, abs(q.z) - 0.04);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.1;
}
float pzc_estrella(vec3 q, vec4 T) {
  float d2 = sdStar5(q.xy, 0.5, 0.48) + 0.11;
  return max(d2, abs(q.z) - 0.12);
}
vec3 pzcol_estrella(vec3 q, vec4 T, float m) { return vec3(0.33, 0.2, 0.038) * (0.94 + 0.12 * vnoise(q * 5.0)); }
`,
  pesa: /* glsl */`
float pz_pesa(vec3 q, vec4 T, out float m) {
  float body = length((q - vec3(0.0, -0.13, 0.0)) * vec3(1.0, 1.08, 1.0)) - 0.37;
  body = smax(body, -(q.y + 0.43), 0.06);
  vec3 h = q - vec3(0.0, 0.2, 0.0);
  float ha = length(vec2(length(h.xy) - 0.21, h.z)) - 0.065;
  ha = max(ha, -(h.y + 0.02));
  m = ha < body ? 1.0 : 0.0;
  return smin(body * 0.95, ha, 0.07);
}
float pzc_pesa(vec3 q, vec4 T) {
  float body = max(length(q - vec3(0.0, -0.13, 0.0)) - 0.33, -(q.y + 0.4));
  vec3 h = q - vec3(0.0, 0.2, 0.0);
  return min(body, max(length(vec2(length(h.xy) - 0.21, h.z)) - 0.055, -(h.y + 0.02)));
}
vec3 pzcol_pesa(vec3 q, vec4 T, float m) { return m > 0.5 ? C_STEEL * 1.3 : C_STEEL; }
`,
  bascula: /* glsl */`
// báscula de baño: losa redondeada con la esfera hundida (cara crema, aro y aguja) y dos huellas
float pz_bascula(vec3 q, vec4 T, out float m) {
  float d = sdRoundBox(q - vec3(0.0, 0.0, -0.03), vec3(0.44, 0.47, 0.09), 0.13);   // cara en z = 0.06
  vec3 dq = q - vec3(0.0, 0.19, 0.0);
  float rd = length(dq.xy);
  d = smax(d, -max(rd - 0.19, 0.015 - dq.z), 0.025);                             // ventana hundida
  float aro = length(vec2(rd - 0.205, dq.z - 0.055)) - 0.03;
  float aguja = min(sdCapsule(q, vec3(0.0, 0.19, 0.03), vec3(0.1, 0.32, 0.03), 0.022), length(q - vec3(0.0, 0.19, 0.035)) - 0.038);
  vec2 pa = vec2(abs(q.x) - 0.16, q.y + 0.2);
  float pies = sdRoundBox(vec3(pa, q.z - 0.065), vec3(0.085, 0.13, 0.02), 0.05);
  float marcas = 1e5;
  for (int i = 0; i < 5; i++) {
    float a = 0.6 + 0.48 * float(i);
    marcas = min(marcas, length(q - vec3(cos(a) * 0.15, 0.19 + sin(a) * 0.15, 0.02)) - 0.016);
  }
  m = 0.0;
  if (rd < 0.195 && q.z < 0.05) m = 1.0;          // cara de la esfera
  float extra = min(aro, pies);
  if (extra < d) m = 3.0;
  float dn = min(aguja, marcas);
  if (dn < min(d, extra)) m = 2.0;
  return smin(smin(d, extra, 0.02), dn, 0.01);
}
float pzc_bascula(vec3 q, vec4 T) { return sdRoundBox(q - vec3(0.0, 0.0, -0.04), vec3(0.42, 0.45, 0.07), 0.12); }
vec3 pzcol_bascula(vec3 q, vec4 T, float m) {
  if (m > 2.5) return C_LIGHT * 0.92;
  if (m > 1.5) return C_INK;
  if (m > 0.5) return C_LIGHT;
  return vec3(0.46, 0.12, 0.06) * (0.92 + 0.16 * vnoise(q * 3.0));
}
`,
  ficha: /* glsl */`
float pz_ficha(vec3 q, vec4 T, out float m) { return fichaD(q, T.y, m); }
float pzc_ficha(vec3 q, vec4 T) { return fichaC(q); }
vec3 pzcol_ficha(vec3 q, vec4 T, float m) { return m > 0.5 ? C_LIGHT : (T.y < 1.5 ? C_GREEN : C_RED) * (0.92 + 0.16 * vnoise(q * 3.0)); }
`,
  bocadillo: /* glsl */`
float pz_bocadillo(vec3 q, vec4 T, out float m) {
  vec3 k = vec3(0.95, 0.66, 0.3);
  float k0 = length(q / k), k1 = length(q / (k * k));
  float d = k0 * (k0 - 1.0) / k1;
  d = smin(d, sdCapsule(q, vec3(-0.42, -0.38, 0.0), vec3(-0.86, -0.8, 0.0), 0.09), 0.22);
  float dd = 1e5;
  for (int i = 0; i < 3; i++) {
    float s = clamp(T.z - float(i), 0.0, 1.0);
    float x = (float(i) - 1.0) * 0.32;
    dd = min(dd, length(q - vec3(x, 0.0, 0.27 - 0.03 * abs(float(i) - 1.0))) - 0.085 * s + (s < 0.01 ? 1.0 : 0.0));
  }
  m = dd < d ? 1.0 : 0.0;
  return smin(d, dd, 0.02);
}
float pzc_bocadillo(vec3 q, vec4 T) {
  vec3 k = vec3(0.92, 0.63, 0.27);
  float k0 = length(q / k), k1 = length(q / (k * k));
  return min(k0 * (k0 - 1.0) / k1, sdCapsule(q, vec3(-0.42, -0.38, 0.0), vec3(-0.86, -0.8, 0.0), 0.07));
}
vec3 pzcol_bocadillo(vec3 q, vec4 T, float m) { return m > 0.5 ? C_INK : C_LIGHT * (0.95 + 0.08 * vnoise(q * 3.0)); }
`,
};
function glslTipoGlifo(c) {
  const g = NOMBRE_GLIFO[c], t = `glifo_${g}`;
  return `
float pz_${t}(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float dp;
  float d2 = ${g}(q.xy, dp);
  return min(churro(d2, q.z, 0.085), (length(vec2(dp, q.z * 1.1)) - 0.11) * 0.9);
}
float pzc_${t}(vec3 q, vec4 T) {
  float dp;
  float d2 = ${g}(q.xy, dp);
  return min(churro(d2, q.z, 0.075), (length(vec2(dp, q.z * 1.1)) - 0.1) * 0.9);
}
vec3 pzcol_${t}(vec3 q, vec4 T, float m) { return colorGlifo(T.z); }
`;
}
// ---------- tipos de la prueba de identidad (copia de prueba) ----------
// Formas de plastilina para la prueba: persona, mano gigante, bloque de piel con vello, un pelo saliendo
// de su folículo, el pelo como tronco con su cutícula, regla de potencias de diez, flecha (marcador),
// pizarrita (?/!), átomo vecino con su varilla (molécula), cota y etiqueta «10^e m».
const GLSL_PRUEBA_COMUN = /* glsl */`
#ifndef PRUEBA_COMUN
#define PRUEBA_COMUN 1
float elipsoideP(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-5); }
// cápsula que se afina (radio r1 en a, r2 en b)
float capsulaC(vec3 p, vec3 a, vec3 b, float r1, float r2) {
  vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(r1, r2, h);
}
// (adulta) piel natural, jersey de punto gris jaspeado, pantalón de lana caqui oscuro, zapatos de cuero
const vec3 C_PIEL   = vec3(0.500, 0.305, 0.205);
const vec3 C_JERSEY = vec3(0.250, 0.240, 0.220);
const vec3 C_VAQUERO = vec3(0.120, 0.100, 0.068);
const vec3 C_PELO   = vec3(0.080, 0.052, 0.034);
const vec3 C_UNA    = vec3(0.600, 0.420, 0.330);
const vec3 C_DERMIS = vec3(0.380, 0.180, 0.135);
const vec3 C_GRASA  = vec3(0.440, 0.360, 0.200);
const vec3 C_MADERA = vec3(0.150, 0.080, 0.040);
const vec3 C_PIZARRA = vec3(0.018, 0.022, 0.020);
const vec3 C_CUERO  = vec3(0.095, 0.050, 0.026);
const vec3 C_LABIO  = vec3(0.400, 0.190, 0.150);
// punto del jersey: cadenetas en «V» (relieve muy fino)
float punto(vec3 q) {
  float u = (q.x + 0.6 * q.z) * 82.0;
  float f = fract(q.y * 76.0 + abs(fract(u) - 0.5) * 0.9);
  return 0.00055 * sin(6.2832 * f);
}
#endif
`;
const GLSL_ETIQUETA = /* glsl */`
#ifndef ETIQUETA_D
#define ETIQUETA_D 1
// «10^e m» en unidades de etiqueta: el «10» mide 1 de alto y el texto empieza en x = 0 (unos 2,2 de ancho)
float etiquetaD(vec2 p, float e) {
  float dp, d = g1(p - vec2(0.2, 0.0), dp);
  d = min(d, g0(p - vec2(0.66, 0.0), dp));
  vec2 pe = (p - vec2(1.02, 0.36)) / 0.58;
  float de;
  if (e < 0.5) de = g0(pe - vec2(0.28, 0.0), dp);
  else {
    de = gmenos(pe - vec2(0.24, 0.0), dp);
    float dd;
    if (e < 1.5) dd = g1(pe - vec2(0.8, 0.0), dp);
    else if (e < 2.5) dd = g2(pe - vec2(0.8, 0.0), dp);
    else if (e < 3.5) dd = g3(pe - vec2(0.8, 0.0), dp);
    else dd = g4(pe - vec2(0.8, 0.0), dp);
    de = min(de, dd);
  }
  d = min(d, de * 0.58);
  float xm = e < 0.5 ? 1.82 : 2.1;
  return min(d, gm((p - vec2(xm, -0.14)) / 0.72, dp) * 0.72);
}
#endif
`;
// (adulta) rótulos «10^e m» con una fuente de Google Fonts (Jost), horneados al cargar en una textura de
// distancias con signo: una fila por exponente, de ROT.E_MIN a ROT.E_MAX. Unidades de rótulo: los dígitos
// del «10» miden ROT_HD (≤ 1) y el rótulo empieza en x = 0; el más ancho mide como mucho ROT.LMAX.
export const FUENTE_ROTULOS = { familia: 'Jost', peso: 500, css: 'https://fonts.googleapis.com/css2?family=Jost:wght@500;600&display=block' };
// (lote 0) De 10⁻³⁵ a 10²⁷ m (63 filas). Los rótulos de 10⁻⁴ a 10²¹ (E_MIN0..E_MAX0, los de las pruebas) siguen
// en su textura de siempre (uEtiqA), con el mismo tamaño (ROT.HD) y la misma consulta, así que salen idénticos. Los
// demás van en un atlas (uEtiqB) de COLS columnas: 63 filas de 118 px (7.434 px) no caben en MAX_TEXTURE_SIZE = 4096;
// en dos columnas son 476 × 3.776 px. Los rótulos más anchos que LMAX (10⁻¹⁰ … 10⁻³⁵) se estrechan un poco en
// horizontal en vez de encoger: el «10» mide lo mismo en todos.
export const ROT = (() => {
  const r = { X0: -0.12, Y0: -0.72, Y1: 0.92, PXU: 72, KD: 0.22, E_MIN: -35, E_MAX: 27, LMAX: 3.05, E_MIN0: -4, E_MAX0: 21, COLS: 2 };
  r.CW = Math.round(3.3 * r.PXU); r.X1 = r.X0 + r.CW / r.PXU;
  r.CH = Math.round((r.Y1 - r.Y0) * r.PXU); r.Y1 = r.Y0 + r.CH / r.PXU;
  r.N = r.E_MAX - r.E_MIN + 1;
  r.N0 = r.E_MAX0 - r.E_MIN0 + 1;
  r.FILAS = Math.ceil(r.N / r.COLS);
  return r;
})();
const GLSL_ETIQA = /* glsl */`
#ifndef ETIQA_D
#define ETIQA_D 1
uniform sampler2D uEtiqA;   // rótulos de 10^${ROT.E_MIN0} a 10^${ROT.E_MAX0} (los de siempre, una columna)
uniform sampler2D uEtiqB;   // (lote 0) los demás, de 10^${ROT.E_MIN} a 10^${ROT.E_MAX}, en ${ROT.COLS} columnas de ${ROT.FILAS} filas
// distancia con signo (unidades de rótulo; negativa dentro del trazo) al rótulo «10^e m»
float etiqA(vec2 p, float e) {
  vec2 caja = vec2(${fl(ROT.X1 - ROT.X0)}, ${fl(ROT.Y1 - ROT.Y0)});
  vec2 uv = (p - vec2(${fl(ROT.X0)}, ${fl(ROT.Y0)})) / caja;
  vec2 cuv = clamp(uv, 0.0, 1.0);
  float fila = clamp(e - ${fl(ROT.E_MIN0)}, 0.0, ${fl(ROT.N0 - 1)});
  float d = texture(uEtiqA, vec2(cuv.x, (fila + 0.01 + cuv.y * 0.98) / ${fl(ROT.N0)})).r;
  if (e < ${fl(ROT.E_MIN0 - 0.5)} || e > ${fl(ROT.E_MAX0 + 0.5)}) {
    float g = clamp(e - ${fl(ROT.E_MIN)}, 0.0, ${fl(ROT.N - 1)});
    float col = floor(g / ${fl(ROT.FILAS)} + 0.0001), fb = g - col * ${fl(ROT.FILAS)};
    d = texture(uEtiqB, vec2((col * ${fl(ROT.CW)} + 0.5 + cuv.x * ${fl(ROT.CW - 1)}) / ${fl(ROT.COLS * ROT.CW)},
                             (fb + 0.01 + cuv.y * 0.98) / ${fl(ROT.FILAS)})).r;
  }
  d = (d - 0.5) * ${fl(2 * ROT.KD)};
  return d + length((uv - cuv) * caja);
}
#endif
`;
// (lote 0) la regla de potencias (reglaA): medidas de la escala en unidades locales de la pieza (ver P.regla)
//   RS: y local por potencia en la regla de siempre · RS_ENTERA: en la regla entera (de −35 a +27 en 2,8 de alto,
//   con −4, el centro, en y = 0) · ESC_ENTERA: tamaño de los rótulos en la regla entera · LUPA_ENTERA: aumento del
//   rótulo actual en la regla entera · XL: borde izquierdo de las marcas · MEDIO: semiancho y semialto de la losa
export const REGLA = { RS: 0.75, RS_ENTERA: 2.8 / 62, CENTRO_ENTERA: -4, ESC_ENTERA: 0.15, LUPA_ENTERA: 1.3, XL: -0.585,
  MEDIO: [0.66, 1.85], RECTA: [-35, -4, 0, 7, 27] };
/**
 * (lote 0) Estado de la escala de la regla: el exponente e queda a la altura local ya y, con entera (0…1), la regla
 * se comprime (RS geométrico de 0,75 a RS_ENTERA) hasta la regla entera (−4 en y = 0), sin saltos. Devuelve
 * { s, ya, RS, entera, y(x): y local del exponente x } (s, ya y RS van a uReglaA.x, uReglaA.y y uReglaB.x).
 */
export function reglaEstado({ e = 0, ya = 0, entera = 0 } = {}) {
  const k = Math.min(1, Math.max(0, entera));
  const RS = k > 0 ? REGLA.RS * Math.pow(REGLA.RS_ENTERA / REGLA.RS, k) : REGLA.RS;
  const yp = ya + ((e - REGLA.CENTRO_ENTERA) * REGLA.RS_ENTERA - ya) * k;
  return { s: e, ya: yp, RS, entera: k, y: (x) => yp + (x - e) * RS };
}
// los remates de la regla (y las miniaturas «red» y «niebla»): la red de galaxias y la niebla de Planck
const GLSL_REMATES = /* glsl */`
#ifndef REMATES_D
#define REMATES_D 1
vec2 hashR2(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
// celdas de Worley: x, distancia al borde entre celdas (0 en un filamento) · y, a un vértice (0 en un cúmulo)
vec2 worleyR(vec2 p) {
  vec2 n = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0, d3 = 8.0;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 g = vec2(float(i), float(j));
    float d = length(g + 0.12 + 0.76 * hashR2(n + g) - f);
    if (d < d1) { d3 = d2; d2 = d1; d1 = d; } else if (d < d2) { d3 = d2; d2 = d; } else d3 = min(d3, d);
  }
  return vec2(d2 - d1, d3 - d1);
}
// la red de galaxias en p: x, filamentos (0…1) · y, cúmulos (0…1)
vec2 redR(vec2 p) {
  // celdas deformadas (no un panal), filamentos que brillan más cerca de los cúmulos, un halo tenue y galaxias sueltas
  vec2 w = p + 0.2 * vec2(vnoise(vec3(p * 1.6, 0.3)), vnoise(vec3(p * 1.6 + 5.2, 0.7))) - 0.1;
  vec2 a = worleyR(w * 4.5), b = worleyR(w * 11.0 + 3.7);
  float cerca = 1.0 - smoothstep(0.0, 0.45, a.y);
  float fil = (1.0 - smoothstep(0.0, 0.035, a.x)) * (0.3 + 0.7 * cerca) + 0.14 * (1.0 - smoothstep(0.0, 0.14, a.x)) * cerca;
  fil += (1.0 - smoothstep(0.0, 0.03, b.x)) * 0.35 * (1.0 - smoothstep(0.0, 0.22, a.x));
  vec2 c = floor(w * 26.0), g = fract(w * 26.0) - 0.5;
  fil += 0.7 * (1.0 - smoothstep(0.06, 0.2, length(g))) * step(0.8, hashR2(c).x) * (1.0 - smoothstep(0.0, 0.12, a.x));
  return vec2(clamp(fil, 0.0, 1.0), 1.0 - smoothstep(0.0, 0.11, a.y));
}
// arcilla azul noche con los filamentos en relieve, de luz cálida, y los cúmulos claros (k: fuerza de la luz)
vec3 colorRed(vec2 p, float k) {
  const float EP = 0.004;
  vec2 r = redR(p), rx = redR(p + vec2(EP, 0.0)), ry = redR(p + vec2(0.0, EP));
  float h0 = r.x + 0.8 * r.y;
  gG = 0.0035 * vec3((rx.x + 0.8 * rx.y - h0) / EP, (ry.x + 0.8 * ry.y - h0) / EP, 0.0);
  vec3 c = vec3(0.016, 0.019, 0.034) * (0.8 + 0.4 * vnoise(vec3(p * 6.0, 0.0)));
  c = mix(c, vec3(0.36, 0.26, 0.15), r.x * 0.75);
  c = mix(c, vec3(0.58, 0.52, 0.42), r.y * 0.9);
  gEm = (vec3(0.55, 0.36, 0.16) * r.x * 0.2 + vec3(0.62, 0.52, 0.38) * r.y * 0.45) * k;
  gBri = 1.5;
  return c;
}
// arcilla gris de la niebla, con motas claras finísimas (la espuma)
vec3 colorNiebla(vec3 p) {
  float n = vnoise(p * 5.0), n2 = vnoise(p * 23.0);
  float esp = step(0.95, hash13(floor(p * 55.0)));
  gTr = 0.8; gBri = 0.5;
  return vec3(0.11, 0.115, 0.125) * (0.75 + 0.45 * n + 0.1 * n2) + vec3(0.06, 0.06, 0.065) * esp * (0.5 + 0.5 * n2);
}
#endif
`;
// ---------------------------------------------------------------- cartela de capítulo: maqueta común
// (adulta) Este bloque es idéntico en papel-adulta.js, isometrico-adulta.js y plastilina-adulta.js: la cartela
// tiene la misma maqueta y el mismo tiempo en los tres estilos; cada kit solo cambia el material.
export const CARTELA = {
  x: 960, y: 470, w: 760, h: 440,          // la placa, en px de diseño: centrada y por encima de los subtítulos
  borde: 30, filete: 9,                    // del canto de la placa al marco de latón, y el ancho del marco
  alto: 240, anchoMax: 560,                // alto de las cifras y ancho máximo del número (si no cabe, se reduce)
  sale: 0.75, fin: 1.2, sube: 900, curva: 2.2,   // quieta hasta `sale`; de `sale` a `fin` sube `sube`·u^curva px
  fuente: 'Jost', peso: 600, css: 'https://fonts.googleapis.com/css2?family=Jost:wght@500;600&display=block',
  caracteres: '0123456789−+½',
  // colores de la maqueta (sRGB): placa de nogal, marco de latón y número de ámbar (el acento)
  nogal: '#76523a', laton: '#c9a462', ambar: '#e09c4c',
};
/** carga Jost con las cifras, −, + y ½ (sin red, se queda la fuente de respaldo) */
export async function cargarFuenteCartela() {
  if (!document.querySelector('link[data-cartela]')) {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = CARTELA.css; l.dataset.cartela = '1';
    const ok = new Promise((r) => { l.onload = r; l.onerror = r; setTimeout(r, 6000); });
    document.head.appendChild(l);
    await ok;
  }
  try {
    await Promise.race([document.fonts.load(`${CARTELA.peso} 100px "${CARTELA.fuente}"`, CARTELA.caracteres), new Promise((r) => setTimeout(r, 8000))]);
  } catch (e) { /* fuente de respaldo */ }
}
/**
 * Maqueta del número en un contexto 2D (deja puesta su fuente): tamaño de letra para que las cifras midan
 * CARTELA.alto px (o menos, si el número no cabe en CARTELA.anchoMax) y el desplazamiento (dx, dy) desde el
 * centro de la placa hasta el origen de fillText (alineación izquierda, línea base alfabética) que centra la
 * tinta del texto. Devuelve { px, font, dx, dy, w, h } (w × h: la caja de tinta).
 */
export function maquetaCartela(ctx, texto) {
  const fuente = (px) => `${CARTELA.peso} ${px}px "${CARTELA.fuente}", sans-serif`;
  ctx.font = fuente(100);
  const cap = ctx.measureText('0').actualBoundingBoxAscent || 70;
  let px = CARTELA.alto * 100 / cap;
  ctx.font = fuente(px);
  let m = ctx.measureText(texto), w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  if (w > CARTELA.anchoMax) {
    px *= CARTELA.anchoMax / w; ctx.font = fuente(px);
    m = ctx.measureText(texto); w = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  }
  return { px, font: fuente(px), dx: (m.actualBoundingBoxLeft - m.actualBoundingBoxRight) / 2,
    dy: (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2, w, h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent };
}
/**
 * Tiempo de la cartela en el instante t: { ve (se dibuja), u (0 quieta → 1 fuera), k (presencia = 1 − u;
 * 0 si no se ve), dy (px que ha subido, negativo) }. o: { sale, fin }.
 */
export function tiempoCartela(t, o = {}) {
  const sale = o.sale ?? CARTELA.sale, fin = o.fin ?? CARTELA.fin;
  if (!(t >= 0 && t < fin)) return { ve: false, u: 1, k: 0, dy: 0 };
  const u = t <= sale ? 0 : (t - sale) / (fin - sale);
  return { ve: true, u, k: 1 - u, dy: -CARTELA.sube * Math.pow(u, CARTELA.curva) };
}

// (cartela) unidades de la placa de arcilla (las usa el tipo de pieza «cartela»)
const CARTELA_ARCILLA = { U: 380, PXU: 300, X0: -0.95, Y0: -0.53, AN: 1.9, AL: 1.06, KD: 0.06 };

// (B ajustada) la mano del primer salto: una mano de arcilla creíble, no un guante de goma. Unidades locales:
// el pliegue de la muñeca en y ≈ 0,40 y la yema del corazón en y ≈ −1,08, así que la mano mide 1,48 (= 0,10 H,
// lo que mide la cara de la barbilla al pelo; HUMANO.md). Proporciones de una mano real: nudillos a 0,46 del
// largo desde la muñeca, ancho en los nudillos 0,42 del largo, falanges al 46 · 29 · 25 % del dedo, corazón >
// anular > índice > meñique, pulgar hasta la mitad de la primera falange del índice. Dorso hacia +z (la
// cámara), dedos hacia −y, pulgar en −x; los dedos, relajados, se doblan un poco hacia la palma y se abren en
// abanico. Lleva nudillos, tendones que se insinúan bajo la piel, una vena, arrugas en el dorso de cada
// articulación, uñas con lúnula y borde libre (sin vello: a esta escala no se ve; aparece al saltar a la piel),
// y la piel con su variación de tono
// (rubor en nudillos y yemas, más pálida sobre los tendones, más oscura en las arrugas).
const GLSL_MANO = (() => {
  const f4v = (a) => `vec3(${a.map((x) => x.toFixed(4)).join(', ')})`;
  const DEDOS = [
    { k: [-0.243, -0.235, 0.012], a: -0.055, L: 0.71, r0: 0.081, r1: 0.064, f: [0.05, 0.13, 0.09] },   // índice
    { k: [-0.081, -0.272, 0.016], a: -0.012, L: 0.80, r0: 0.084, r1: 0.066, f: [0.04, 0.12, 0.08] },   // corazón
    { k: [0.079, -0.252, 0.012], a: 0.03, L: 0.75, r0: 0.079, r1: 0.062, f: [0.06, 0.15, 0.1] },       // anular
    { k: [0.226, -0.198, 0.004], a: 0.085, L: 0.57, r0: 0.069, r1: 0.054, f: [0.09, 0.19, 0.12] },     // meñique
  ];
  const P = [], RA = [], DO = [];
  for (const d of DEDOS) {
    const seg = [0.46, 0.29, 0.25].map((x) => x * d.L);
    let p = d.k.slice(), phi = 0;
    P.push(p.slice());
    for (let i = 0; i < 3; i++) {
      phi += d.f[i];
      const dir = [Math.sin(d.a) * Math.cos(phi), -Math.cos(d.a) * Math.cos(phi), -Math.sin(phi)];
      const len = i === 2 ? seg[i] - d.r1 : seg[i];
      p = p.map((v, k) => v + dir[k] * len);
      P.push(p.slice());
      // dorso del tramo: perpendicular al dedo, hacia +z
      DO.push([Math.sin(d.a) * Math.sin(phi), -Math.cos(d.a) * Math.sin(phi), Math.cos(phi)]);
    }
    RA.push(d.r0, d.r0 + (d.r1 - d.r0) * 0.5, d.r0 + (d.r1 - d.r0) * 0.82, d.r1);
  }
  // pulgar: base (trapecio, hacia la palma), MCF, IF y el final de la yema; su uña mira de lado (−x) y a la cámara
  const PU = [[-0.17, 0.25, -0.03], [-0.352, 0.0, -0.004], [-0.432, -0.218, 0.012], [-0.465, -0.405, 0.02]];
  const RPU = [0.098, 0.088, 0.079, 0.068];
  const n = Math.hypot(-0.72, -0.08, 0.69), DPU = [-0.72 / n, -0.08 / n, 0.69 / n];
  // articulaciones con arrugas en el dorso (PIP, DIP y nudillo de cada dedo y la del pulgar): centro, dirección
  // del dedo, dorso y (radio, n.º de surcos, paso, fuerza)
  const sub = (a, b) => a.map((v, k) => v - b[k]);
  const nrm = (a) => { const l = Math.hypot(...a); return a.map((v) => v / l); };
  const AJ = [], AD = [], AO = [], AP = [];
  for (let i = 0; i < 4; i++) {
    const b = i * 4;
    AJ.push(P[b + 1], P[b + 2], [P[b][0], P[b][1] - 0.01, P[b][2]]);
    AD.push(nrm(sub(P[b + 2], P[b])), nrm(sub(P[b + 3], P[b + 1])), nrm(sub(P[b + 1], P[b])));
    AO.push(DO[i * 3 + 1], DO[i * 3 + 2], DO[i * 3]);
    AP.push([RA[b + 1], 3.5, 0.0125, 1.0], [RA[b + 2], 3.0, 0.011, 0.75], [RA[b], 3.0, 0.014, 0.45]);
  }
  AJ.push(PU[2]); AD.push(nrm(sub(PU[3], PU[1]))); AO.push(DPU); AP.push([RPU[2], 3.0, 0.012, 0.8]);
  const v4l = (a) => `vec4(${a.map((x) => x.toFixed(4)).join(', ')})`;
  return /* glsl */`
const vec3 AJ[13] = vec3[13](${AJ.map(f4v).join(', ')});
const vec3 AD[13] = vec3[13](${AD.map(f4v).join(', ')});
const vec3 AO[13] = vec3[13](${AO.map(f4v).join(', ')});
const vec4 AP[13] = vec4[13](${AP.map(v4l).join(', ')});
const vec3 MJ[16] = vec3[16](${P.map(f4v).join(', ')});
const float MR[16] = float[16](${RA.map((x) => x.toFixed(4)).join(', ')});
const vec3 MD[12] = vec3[12](${DO.map(f4v).join(', ')});
const vec3 MPU[4] = vec3[4](${PU.map(f4v).join(', ')});
const float MRPU[4] = float[4](${RPU.map((x) => x.toFixed(4)).join(', ')});
const vec3 MDPU = ${f4v(DPU)};
// falange: cápsula que se afina, algo aplanada en la dirección del dorso (o)
float mnFalange(vec3 p, vec3 a, vec3 b, float r1, float r2, vec3 o) {
  vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  vec3 w = pa - ba * h; w += o * dot(w, o) * 0.14;
  return (length(w) - mix(r1, r2, h)) * 0.94;
}
// arrugas del dorso de una articulación: n surcos curvos (cóncavos hacia la yema), solo en el dorso
float mnArrugas(vec3 q, vec3 J, vec3 dir, vec3 o, float r, float n, float paso, float nz) {
  vec3 v = q - J;
  float s = dot(v, dir);
  vec3 lat = v - dir * s;
  float dz = dot(lat, o), ax = length(lat - o * dz);
  float s2 = s - 0.45 * ax * ax / r;
  float zz = s2 / (paso * n * 0.55);
  float ven = exp(-zz * zz) * smoothstep(0.25 * r, 0.75 * r, dz) * (1.0 - smoothstep(0.45 * r, 0.8 * r, ax));
  return ven * (0.5 + 0.5 * cos(s2 * 6.2832 / paso + 0.8 * sin(ax * 60.0) + nz));
}
// uña: lámina curva sobre el dorso de la última falange (de A, la articulación, a B, el final de la yema),
// del 40 % del tramo hasta un borde libre que asoma un poco; u: 0 en la lúnula, 1 en el borde libre
float mnUna(vec3 q, vec3 A, vec3 B, float rA, float rB, vec3 o, out float u) {
  vec3 ba = B - A; float L = length(ba); vec3 dir = ba / L;
  vec3 v = q - A; float t = dot(v, dir);
  float s = t / L;
  vec3 lat = v - dir * t; lat += o * dot(lat, o) * 0.14;
  float dz = dot(lat, o), ax = length(lat - o * dz);
  float r = mix(rA, rB, clamp(s, 0.0, 1.0));
  float ra = length(v - dir * clamp(t, 0.0, L) + o * dot(lat, o) * 0.14) - r;
  float lam = abs(ra - 0.0018) - 0.0042;
  float lado = ax - 0.72 * r * sqrt(clamp((s - 0.4) / 0.16, 0.0, 1.0));
  float largo = max(0.42 - s, s - 1.0 - 0.42 * rB / L) * L;
  u = clamp((s - 0.42) / (0.58 + 0.42 * rB / L), 0.0, 1.0);
  return smax(smax(lam, lado, 0.012), max(largo, 0.2 * r - dz), 0.012);
}
// tendón extensor: cordón que se insinúa bajo la piel, de la muñeca a cada nudillo
float mnTendon(vec3 q, int i) {
  vec3 k = MJ[i * 4];
  return capsulaC(q, vec3(k.x * 0.32, 0.33, 0.052), vec3(k.x * 0.98, k.y + 0.05, 0.066), 0.022, 0.019);
}
float pz_mano(vec3 q, vec4 T, out float m) {
  // antebrazo y muñeca (sección elíptica), con la apófisis del cúbito
  float yc = clamp(q.y, 0.37, 1.95);
  vec3 o0 = q - vec3(0.0, yc, 0.0); o0.z /= 0.72;
  float d = (length(o0) - (0.215 + 0.035 * smoothstep(0.55, 1.7, q.y))) * 0.72;
  d = smin(d, elipsoideP(q - vec3(0.155, 0.44, 0.08), vec3(0.034, 0.034, 0.03)), 0.04);
  // dorso: cuatro metacarpianos en abanico desde la muñeca hasta su nudillo, aplanados, y la palma debajo
  float dorso = 1e5;
  for (int i = 0; i < 4; i++) {
    vec3 k = MJ[i * 4];
    vec3 a = vec3(k.x * 0.42, 0.34, 0.0), b = vec3(k.x, k.y + 0.03, 0.0);
    vec3 pa = q - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    vec3 w = pa - ba * h; w.z *= 1.32;
    dorso = smin(dorso, (length(w) - mix(0.083, MR[i * 4] + 0.012, h)) * 0.75, 0.11);
  }
  dorso = smin(dorso, elipsoideP(q - vec3(0.0, 0.02, -0.042), vec3(0.265, 0.31, 0.085)), 0.08);
  // eminencias de la palma (bajo el pulgar y bajo el meñique) y el pliegue carnoso entre pulgar e índice
  dorso = smin(dorso, elipsoideP(q - vec3(-0.185, 0.1, -0.072), vec3(0.092, 0.17, 0.085)), 0.08);
  dorso = smin(dorso, elipsoideP(q - vec3(0.21, 0.04, -0.035), vec3(0.085, 0.25, 0.085)), 0.07);
  dorso = smin(dorso, elipsoideP(q - vec3(-0.28, 0.0, -0.012), vec3(0.06, 0.11, 0.058)), 0.07);
  d = smin(d, dorso, 0.12);
  // tendones, que se insinúan, y una vena que baja hacia el pulgar
  float ten = 1e5;
  for (int i = 0; i < 4; i++) ten = min(ten, mnTendon(q, i));
  d = smin(d, ten, 0.035);
  float vena = capsulaC(q, vec3(0.13, -0.12, 0.066), vec3(0.02, 0.06, 0.074), 0.011, 0.012);
  vena = smin(vena, capsulaC(q, vec3(0.02, 0.06, 0.074), vec3(-0.14, 0.2, 0.066), 0.012, 0.013), 0.02);
  d = smin(d, vena, 0.03);
  // nudillos
  float nud = 1e5;
  for (int i = 0; i < 4; i++) nud = min(nud, length((q - MJ[i * 4] - vec3(0.0, 0.012, -0.006)) * vec3(1.0, 0.85, 1.0)) - MR[i * 4] - (i < 2 ? 0.008 : 0.004));
  d = smin(d, nud, 0.06);
  // dedos: tres falanges que se afinan, con la articulación un poco más gruesa
  float dedos = 1e5, du = 1e5;
  int iu = 0;
  for (int i = 0; i < 4; i++) {
    int b = i * 4;
    dedos = smin(dedos, mnFalange(q, MJ[b], MJ[b + 1], MR[b], MR[b + 1], MD[i * 3]), 0.045);
    float f3 = mnFalange(q, MJ[b + 2], MJ[b + 3], MR[b + 2], MR[b + 3], MD[i * 3 + 2]);
    if (f3 < du) { du = f3; iu = i; }
    dedos = smin(dedos, smin(mnFalange(q, MJ[b + 1], MJ[b + 2], MR[b + 1], MR[b + 2], MD[i * 3 + 1]), f3, 0.012), 0.012);
  }
  // pulgar
  float pul = smin(capsulaC(q, MPU[0], MPU[1], MRPU[0], MRPU[1]), capsulaC(q, MPU[1], MPU[2], MRPU[1], MRPU[2]), 0.03);
  float pf3 = mnFalange(q, MPU[2], MPU[3], MRPU[2], MRPU[3], MDPU);
  pul = smin(pul, pf3, 0.025);
  pul = smin(pul, length(q - MPU[1] - vec3(-0.012, 0.0, 0.01)) - MRPU[1] - 0.006, 0.035);
  vec3 uA = MJ[iu * 4 + 2], uB = MJ[iu * 4 + 3], uO = MD[iu * 3 + 2];
  float uRa = MR[iu * 4 + 2], uRb = MR[iu * 4 + 3];
  if (pf3 < du) { uA = MPU[2]; uB = MPU[3]; uO = MDPU; uRa = MRPU[2]; uRb = MRPU[3]; }
  float uU;
  float una = mnUna(q, uA, uB, uRa, uRb, uO, uU);
  dedos = smin(dedos, pul, 0.03);
  d = smin(d, dedos, 0.045);
  // puño de canalé y manga del jersey
  float th = atan(q.z, q.x);
  float rr = length(vec2(q.x, q.z * 1.28));
  float puno = max(rr - 0.37 - 0.011 * sin(th * 26.0), abs(q.y - 0.94) - 0.15) * 0.8;
  float manga = max(rr - 0.35 + 0.004 * sin(6.2832 * fract(q.y * 9.0 + abs(fract(atan(q.z, q.x) * 7.0) - 0.5) * 0.9)), max(1.08 - q.y, q.y - 2.1)) * 0.85;
  m = 0.0;
  if (una < d) m = 1.0 + 0.49 * uU; d = smin(d, una, 0.004);
  if (puno < d) m = 2.0; d = smin(d, puno, 0.03);
  if (manga < d) m = 3.0; d = smin(d, manga, 0.02);
  return d * 0.88;
}
// arrugas del dorso de todas las articulaciones (0..1)
// (cada articulación arruga solo su entorno, así que basta con la más cercana)
int mnArtCercana(vec3 q) {
  int k = 0; float dm = 1e5;
  for (int i = 0; i < 13; i++) { vec3 e = q - AJ[i]; float dd = dot(e, e); if (dd < dm) { dm = dd; k = i; } }
  return k;
}
float mnArrugasK(vec3 q, int k, float nz) { vec4 a = AP[k]; return a.w * mnArrugas(q, AJ[k], AD[k], AO[k], a.x, a.y, a.z, nz); }
// envolvente barata y conservadora (nunca más lejos que la forma real): la primera fase del rayo la usa hasta
// quedar a unos píxeles de la piel, y solo entonces se calcula la mano entera (la foto de la mano tardaba 33 s)
float pza_mano(vec3 q, vec4 T) {
  float d = sdRoundBox(q - vec3(-0.015, 0.035, -0.015), vec3(0.36, 0.43, 0.165), 0.06) - 0.05;
  for (int i = 0; i < 4; i++) d = min(d, sdCapsule(q, MJ[i * 4], MJ[i * 4 + 3], MR[i * 4] + 0.065));
  d = min(d, sdCapsule(q, MPU[0], MPU[3], MRPU[0] + 0.07));
  d = min(d, sdCapsule(q, vec3(0.0, 0.3, 0.0), vec3(0.0, 2.0, 0.0), 0.29));
  d = min(d, max(length(q.xz) - 0.41, max(0.76 - q.y, q.y - 2.15)));
  return d;
}
// forma simplificada para las sombras (la evalúan todas las pasadas de sombra, esté o no la mano en el plano:
// pocas piezas, y por dentro de la piel)
float pzc_mano(vec3 q, vec4 T) {
  float d = sdRoundBox(q - vec3(-0.01, 0.02, -0.02), vec3(0.25, 0.27, 0.05), 0.045);
  d = min(d, sdCapsule(q, MJ[0], MJ[3], 0.042));
  d = min(d, sdCapsule(q, MJ[4], MJ[7], 0.044));
  d = min(d, sdCapsule(q, MJ[8], MJ[11], 0.041));
  d = min(d, sdCapsule(q, MJ[12], MJ[15], 0.034));
  d = min(d, sdCapsule(q, MPU[0], MPU[3], 0.05));
  d = min(d, max(length(vec2(q.x, q.z * 1.4)) - 0.19, max(0.3 - q.y, q.y - 1.0)));
  return min(d, max(length(vec2(q.x, q.z * 1.28)) - 0.34, max(1.02 - q.y, q.y - 2.1)));
}
vec3 pzcol_mano(vec3 q, vec4 T, float m) {
  float v = 0.95 + 0.1 * vnoise(q * 6.0);
  if (m < 0.5) {
    // piel: moteado suave, rubor en nudillos, articulaciones y yemas, más pálida sobre los tendones, un poco
    // azulada en la vena y más oscura dentro de las arrugas
    gTr = 1.0; gBri = 1.25;
    // arrugas como relieve de la normal: surcos de 0,0027 de hondo (gradiente por diferencias)
    int ka = mnArtCercana(q);
    float nz = 1.6 * vnoise(q * 30.0);
    float A = mnArrugasK(q, ka, nz);
    const float EP = 0.0015;
    gG = -0.0027 * vec3(mnArrugasK(q + vec3(EP, 0.0, 0.0), ka, nz) - A, mnArrugasK(q + vec3(0.0, EP, 0.0), ka, nz) - A, mnArrugasK(q + vec3(0.0, 0.0, EP), ka, nz) - A) / EP;
    // poros: relieve muy fino
    vec4 po = vnoised(q * 110.0);
    gG += po.yzw * 0.0005 * 110.0 * 0.5;
    vec3 c = C_PIEL * vec3(0.96, 0.9, 0.86) * (0.74 + 0.14 * vnoise(q * 3.2) + 0.07 * vnoise(q * 13.0));
    float rub = 0.0;
    for (int i = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        vec3 e = q - MJ[i * 4 + j];
        float s = j == 0 ? 0.06 : 0.04;
        rub = max(rub, exp(-dot(e, e) / (s * s)) * (j == 3 ? 0.6 : 0.55));
      }
    }
    for (int j = 1; j < 4; j++) { vec3 e = q - MPU[j]; rub = max(rub, exp(-dot(e, e) / 0.0036) * 0.8); }
    c = mix(c, c * vec3(1.0, 0.8, 0.76), rub * 0.5);
    float ten = 1e5;
    for (int i = 0; i < 4; i++) ten = min(ten, mnTendon(q, i));
    c = mix(c, c * vec3(1.06, 1.04, 0.95), (1.0 - smoothstep(-0.01, 0.02, ten)) * 0.5);
    float vena = min(capsulaC(q, vec3(0.13, -0.12, 0.066), vec3(0.02, 0.06, 0.074), 0.011, 0.012), capsulaC(q, vec3(0.02, 0.06, 0.074), vec3(-0.14, 0.2, 0.066), 0.012, 0.013));
    c = mix(c, c * vec3(0.84, 0.86, 0.98), (1.0 - smoothstep(0.0, 0.02, vena)) * 0.45);
    return c * (1.0 - 0.38 * A) * (0.97 + 0.06 * vnoise(q * 40.0));
  }
  if (m < 1.5) {
    // uña: rosada y translúcida, lúnula clara en la base, borde libre blanquecino, algo de brillo
    gTr = 0.7; gBri = 1.9;
    float u = (m - 1.0) / 0.49;
    vec3 c = mix(vec3(0.42, 0.31, 0.27), vec3(0.36, 0.22, 0.19), smoothstep(0.08, 0.3, u));
    c = mix(c, vec3(0.43, 0.37, 0.32), smoothstep(0.9, 0.98, u));
    return c * (0.95 + 0.1 * vnoise(vec3(q.x * 120.0, q.y * 8.0, q.z * 120.0)));
  }
  if (m < 2.5) return C_JERSEY * 0.74 * v;
  if (m < 3.5) return C_JERSEY * 0.88 * (0.86 + 0.28 * vnoise(q * vec3(40.0, 14.0, 40.0))) * v;
  return C_PIEL * 0.6;
}
`;
})();
// ---------- (lote 0) la persona con posturas: tipo de pieza «humano» ----------
// La misma persona que «persona» (mismas medidas de HUMANO.md: suela en y = −1, coronilla en y ≈ 0,765, mira
// hacia +z, su izquierda en +x), pero articulada: el esqueleto lo calcula esqueletoHumano() en JS y llega en uHum
// (HUMANO.NJ vec4 por persona; T.w dice cuál). Cada parte se modela en su marco: el torso, la cabeza y la pelvis
// con un marco afín (giro y escala: el niño tiene otra cabeza y otro tronco), los brazos y las piernas como
// cápsulas entre articulaciones, las manos en el marco de la mano (u, hacia los dedos · v, hacia el pulgar ·
// w, el dorso) y los zapatos en el del pie.
const GLSL_HUMANO = /* glsl */`
#ifndef HUMANO_D
#define HUMANO_D 1
uniform vec4 uHum[NHUM];
vec3 huAf(int k, vec3 q) { return vec3(dot(uHum[k].xyz, q) + uHum[k].w, dot(uHum[k + 1].xyz, q) + uHum[k + 1].w, dot(uHum[k + 2].xyz, q) + uHum[k + 2].w); }
// (coste) en SwiftShader todo el código corre en cada píxel, aunque esté en un «if»: por eso la mano y el pelo son
// una sola fórmula con parámetros, no una por forma
// dedos: losa de dos falanges en el plano (u, w), de ancho 2·hw en v, que se dobla hacia la palma: d = (cos, sin)
// de la primera falange y de la segunda (los da el JS según lo doblados que estén)
float huFalanges(vec3 h, vec3 K, vec4 d, float L1, float L2, float r, float hw) {
  vec2 k = K.xz, m1 = k + vec2(d.x, -d.y) * L1, m2 = m1 + vec2(d.z, -d.w) * L2;
  vec2 p = h.xz;
  vec2 pa = p - k, ba = m1 - k; float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float c1 = length(pa - ba * t) - r;
  pa = p - m1; ba = m2 - m1; t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float c2 = length(pa - ba * t) - r * 0.92;
  vec2 w = vec2(min(c1, c2) + 0.006, abs(h.y - K.y) - hw + 0.006);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.006;
}
// la mano en su marco (u, hacia los dedos · v, hacia el pulgar · w, el dorso; unidades de la persona adulta).
// DI y DF: las direcciones de las falanges del índice y de los otros tres dedos; kp: el pulgar recogido (0…1)
float huMano(vec3 h, vec4 DI, vec4 DF, float kp) {
  float d = elipsoideP(h - vec3(0.05, 0.0, 0.0), vec3(0.056, 0.043, 0.023));
  float dd = huFalanges(h, vec3(0.098, 0.026, 0.002), DI, 0.042, 0.034, 0.0118, 0.0118);
  dd = min(dd, huFalanges(h, vec3(0.1, -0.008, 0.002), DF, 0.044, 0.034, 0.0122, 0.027));
  d = smin(d, dd, 0.012);
  d = smax(d, -(sdCapsule(h, vec3(0.11, -0.004, 0.016), vec3(0.2, -0.004, 0.012), 0.0035) + 0.03 * DF.y), 0.005);
  vec3 t1 = mix(vec3(0.085, 0.052, -0.016), vec3(0.09, 0.012, -0.042), kp);
  return smin(d, capsulaC(h, vec3(0.03, 0.036, -0.006), t1, 0.016, 0.013), 0.015);
}
// pelo: P.x, largo (0 corto · 1 melena hasta la mandíbula con flequillo) · P.y, moño (0…1) · P.z, mechón (0…1)
float huPelo(vec3 qh, vec3 ah, vec3 P) {
  float L = P.x;
  float pelo = elipsoideP(qh - vec3(0.0, mix(0.618, 0.612, L), mix(-0.006, -0.014, L)), mix(vec3(0.133, 0.148, 0.14), vec3(0.143, 0.16, 0.151), L));
  float linea = 0.585 + 0.135 * smoothstep(-0.06, 0.07, qh.z) - 0.035 * smoothstep(0.07, 0.11, ah.x) * smoothstep(-0.02, 0.04, qh.z);
  float ventana = max(max(0.035 - qh.z, qh.y - 0.668 - 0.008 * sin(qh.x * 38.0 + 1.0)), ah.x - 0.096);
  float corteL = max(-ventana, 0.495 + 0.035 * smoothstep(-0.02, 0.09, qh.z) - qh.y);
  pelo = smax(pelo, mix((linea - qh.y) * 0.8, corteL, L), 0.018);
  float mechon = capsulaC(qh, vec3(0.07, 0.738, 0.0), vec3(-0.058, 0.7, 0.084), 0.032, 0.022);
  mechon = smin(mechon, capsulaC(qh, vec3(0.098, 0.715, 0.03), vec3(0.03, 0.712, 0.098), 0.024, 0.018), 0.02);
  mechon = smin(mechon, length(qh - vec3(0.022, 0.732, -0.04)) - 0.04, 0.03);
  mechon = smin(mechon, length(qh - vec3(-0.058, 0.712, -0.06)) - 0.036, 0.03) + 0.09 * (1.0 - P.z);
  float mono = length(qh - vec3(0.0, 0.705, -0.118)) - 0.06 + 0.09 * (1.0 - P.y);
  pelo = smin(pelo, min(mechon, mono), 0.03);
  return pelo + 0.0022 * sin((0.82 * qh.x + 0.57 * qh.z) * 95.0 + 3.0 * qh.y);
}
float huPartes(vec3 q, vec4 T, out float m) {
  int b = int(T.w + 0.5) * HU_NJ;
  vec3 qt = huAf(b, q), qh = huAf(b + 3, q), qp = huAf(b + 6, q);
  vec4 K = uHum[b + 33], PA = uHum[b + 29];
  vec3 at = vec3(abs(qt.x), qt.y, qt.z), ah = vec3(abs(qh.x), qh.y, qh.z);
  float kr = K.w, kh = K.y, cierre = 1.0 - PA.x;
  // ---- cabeza (en su marco; la misma que «persona», con los ojos, la mirada y el pelo de la postura) ----
  float cabeza, pelo, cejas, blanco, pupila, parpado, boca, labio;
  cabeza = elipsoideP(qh - vec3(0.0, 0.618, -0.006), vec3(0.116, 0.132, 0.126));
  cabeza = smin(cabeza, elipsoideP(qh - vec3(0.0, 0.548, 0.024), vec3(0.085, 0.07, 0.093)), 0.045);
  cabeza = smin(cabeza, elipsoideP(ah - vec3(0.113, 0.592, -0.012), vec3(0.02, 0.034, 0.026)), 0.014);
  cabeza = smin(cabeza, capsulaC(qh, vec3(0.0, 0.608, 0.117), vec3(0.0, 0.577, 0.133), 0.0075, 0.0125), 0.012);
  cabeza = smin(cabeza, elipsoideP(ah - vec3(0.011, 0.5715, 0.124), vec3(0.0105, 0.008, 0.0095)), 0.008);
  cabeza = smin(cabeza, capsulaC(qh, vec3(0.0, 0.44, -0.012), vec3(0.0, 0.5, -0.01), 0.042, 0.041), 0.025);
  pelo = huPelo(qh, ah, vec3(PA.w, uHum[b + 34].xy)) * kh;
  cejas = min(capsulaC(ah, vec3(0.019, 0.6495, 0.1135), vec3(0.046, 0.6545, 0.110), 0.0066, 0.0072), capsulaC(ah, vec3(0.046, 0.6545, 0.110), vec3(0.071, 0.6495, 0.099), 0.0072, 0.0048)) * kh;
  blanco = elipsoideP(ah - vec3(0.044, 0.611, 0.1025), vec3(0.021, 0.0165, 0.0145)) * kh;
  vec2 mir = PA.yz * vec2(0.0045, 0.0035);
  pupila = (length(qh - vec3((qh.x > 0.0 ? 0.044 : -0.044) + mir.x, 0.611 + mir.y, 0.1132 - 0.25 * length(mir))) - 0.0115 + 0.03 * cierre) * kh;
  // párpados: el de arriba baja hasta tapar el ojo (cierre = 1) y deja una línea de pestañas
  float yP = mix(0.6145, 0.5995, cierre);
  parpado = elipsoideP(ah - vec3(0.044, mix(0.6185, 0.6105, cierre), mix(0.1035, 0.1045, cierre)), vec3(0.0245, mix(0.013, 0.0195, cierre), mix(0.0168, 0.0174, cierre)));
  parpado = smax(parpado, yP - qh.y, 0.003);
  parpado = min(parpado, smax(elipsoideP(ah - vec3(0.044, 0.6035, 0.1015), vec3(0.0225, 0.0065, 0.0145)), qh.y - 0.6005, 0.003)) * kh;
  boca = capsulaC(vec3(abs(qh.x), qh.y + 0.06 * qh.x * qh.x / 0.024, qh.z), vec3(0.0, 0.5545, 0.1238), vec3(0.0265, 0.5548, 0.1192), 0.0033, 0.0025) * kh;
  labio = elipsoideP(qh - vec3(0.0, 0.5487, 0.1185), vec3(0.018, 0.0058, 0.0075)) * kh;
  cabeza *= kh;
  // ---- torso (en su marco) ----
  float ropa = elipsoideP(qt - vec3(0.0, 0.25, 0.0), vec3(0.158, 0.15, 0.098));
  ropa = smin(ropa, elipsoideP(qt - vec3(0.0, 0.05, 0.006), vec3(0.138, 0.15, 0.09)), 0.09);
  ropa = smin(ropa, capsulaC(at, vec3(0.045, 0.39, -0.012), vec3(0.158, 0.358, -0.008), 0.05, 0.049), 0.05);
  float delante = smoothstep(0.03, 0.08, qt.z);
  ropa += 0.0035 * delante * (1.0 - smoothstep(0.0, 0.007, abs(qt.y - 0.03 - 0.01 * sin(qt.x * 29.0))));
  ropa += 0.003 * delante * (1.0 - smoothstep(0.0, 0.006, abs(qt.y + 0.012 - 0.008 * sin(qt.x * 23.0 + 1.0))));
  ropa *= K.x;
  float cuello = capsulaC(qt, vec3(0.0, 0.39, -0.014), vec3(0.0, 0.47, -0.011), 0.043, 0.042) * K.x;
  float elastico = (elipsoideP(qt - vec3(0.0, -0.062, 0.004), vec3(0.15, 0.036, 0.1)) + 0.0025 * sin(atan(qt.x, qt.z) * 44.0)) * K.x;
  elastico = min(elastico, sdTorus(qt - vec3(0.0, 0.402 - 0.12 * qt.z, -0.01), vec2(0.052, 0.016)) * K.x);
  // ---- brazos (mangas del jersey, con su puño) y manos ----
  float brazos = 1e5, punos = 1e5, manos = 1e5;
  for (int i = 0; i < 2; i++) {
    int k = b + 9 + 6 * i;
    vec3 S = uHum[k].xyz, E = uHum[k + 1].xyz, Wr = uHum[k + 2].xyz;
    vec4 U4 = uHum[k + 3], V4 = uHum[k + 4], W4 = uHum[k + 5];
    vec3 dF = normalize(Wr - E), dA = normalize(E - S);
    // la manga empieza un poco por debajo del hombro (el hombro lo redondea el torso) y lleva una arruga en el codo
    float br = capsulaC(q, S + dA * 0.024 * kr, E, 0.047 * kr, 0.043 * kr);
    br = smin(br, capsulaC(q, E, Wr - dF * 0.03 * kr, 0.043 * kr, 0.039 * kr), 0.03 * kr);
    br += 0.004 * (1.0 - smoothstep(0.0, 0.008 * kr, abs(dot(q - E, dA) + 0.012 * kr)));
    brazos = min(brazos, br);
    // puño de canalé
    vec3 qw = q - Wr;
    float pu = capsulaC(q, Wr - dF * 0.042 * kr, Wr - dF * 0.008 * kr, 0.041 * kr, 0.04 * kr) + 0.002 * sin(atan(dot(qw, W4.xyz), dot(qw, V4.xyz)) * 30.0);
    punos = min(punos, pu);
    vec3 hd = q - Wr;
    manos = min(manos, huMano(vec3(dot(hd, U4.xyz), dot(hd, V4.xyz), dot(hd, W4.xyz)) / V4.w, uHum[b + 35 + 2 * i], uHum[b + 36 + 2 * i], W4.w) * V4.w);
  }
  // ---- pelvis y piernas (pantalón) y zapatos ----
  float pant = elipsoideP(qp - vec3(0.0, -0.088, 0.0), vec3(0.16, 0.1, 0.094)) * K.z;
  float piernas = 1e5, zap = 1e5, suela = 0.0;
  for (int i = 0; i < 2; i++) {
    int k = b + 21 + 4 * i;
    vec3 Hc = uHum[k].xyz, Kn = uHum[k + 1].xyz, An = uHum[k + 2].xyz;
    vec4 F4 = uHum[k + 3];
    float pi = capsulaC(q, Hc, Kn, 0.073 * kr, 0.057 * kr);
    pi = smin(pi, capsulaC(q, Kn, An, 0.057 * kr, 0.053 * kr), 0.03 * kr);
    // pliegue del pantalón sobre la rodilla
    pi += 0.0015 * (1.0 - smoothstep(0.0, 0.012 * kr, abs(dot(q - Kn, Hc - Kn) * 2.53 / kr - 0.015 * kr)));
    piernas = min(piernas, pi);
    vec3 fz = F4.xyz, fy = normalize(vec3(0.0, 1.0, 0.0) - fz * fz.y), fx = cross(fy, fz);
    vec3 fq = q - An; fq = vec3(dot(fq, fx), dot(fq, fy), dot(fq, fz)) / F4.w;
    float zp = sdRoundBox(fq - vec3(0.0, -0.036, 0.052), vec3(0.05, 0.03, 0.118), 0.03);
    zp = smin(zp, elipsoideP(fq - vec3(0.0, -0.022, 0.116), vec3(0.058, 0.046, 0.074)), 0.03) * F4.w;
    if (zp < zap) { zap = zp; suela = fq.y < -0.053 ? 1.0 : 0.0; }
  }
  pant = smin(pant, piernas, 0.045 * kr);
  ropa = smin(ropa, brazos, 0.014) + punto(q);
  float piel = smin(cabeza, cuello, 0.025);
  float d = ropa; m = 1.0;
  if (elastico < d) m = 2.0; d = smin(d, elastico, 0.012);
  if (punos < d) m = 2.0; d = smin(d, punos, 0.012);
  if (pant < d) m = 3.0; d = smin(d, pant, 0.015);
  if (zap < d) m = suela > 0.5 ? 9.0 : 4.0; d = smin(d, zap, 0.02);
  if (manos < d) m = 0.0; d = smin(d, manos, 0.012);
  if (piel < d) m = 0.0; d = smin(d, piel, 0.02);
  if (pelo < d) m = 5.0; d = smin(d, pelo, 0.012);
  if (labio < d) m = 10.0; d = smin(d, labio, 0.006);
  if (cejas < d) m = 5.0; d = smin(d, cejas, 0.006);
  if (blanco < d) m = 8.0; d = smin(d, blanco, 0.004);
  if (pupila < d) m = 6.0; d = min(d, pupila);
  if (parpado < d) m = 0.0; d = smin(d, parpado, 0.0025);
  if (boca < d) m = 7.0; d = smin(d, boca, 0.003);
  return d;
}
#endif
float pz_humano(vec3 q, vec4 T, out float m) { return huPartes(q, T, m) * 0.9; }
// envolvente (nunca más lejos que la forma): torso, cabeza, pelvis y cápsulas gruesas por los miembros (todo en
// coordenadas locales, precalculado en JS: aquí no hay cambios de marco)
float pza_humano(vec3 q, vec4 T) {
  int b = int(T.w + 0.5) * HU_NJ;
  vec4 tA = uHum[b + 39], hc = uHum[b + 41], pc = uHum[b + 42];
  float d = sdCapsule(q, tA.xyz, uHum[b + 40].xyz, tA.w);
  d = min(d, length(q - hc.xyz) - hc.w);
  d = min(d, length(q - pc.xyz) - pc.w);
  float kr = uHum[b + 33].w;
  for (int i = 0; i < 2; i++) {
    int k = b + 9 + 6 * i;
    vec3 Wr = uHum[k + 2].xyz;
    d = min(d, sdCapsule(q, uHum[k].xyz, uHum[k + 1].xyz, 0.062 * kr));
    d = min(d, sdCapsule(q, uHum[k + 1].xyz, Wr, 0.056 * kr));
    d = min(d, length(q - Wr - uHum[k + 3].xyz * 0.09 * uHum[k + 4].w) - 0.118 * uHum[k + 4].w);
    int j = b + 21 + 4 * i;
    d = min(d, sdCapsule(q, uHum[j].xyz, uHum[j + 1].xyz, 0.086 * kr));
    d = min(d, sdCapsule(q, uHum[j + 1].xyz, uHum[j + 2].xyz, 0.07 * kr));
    d = min(d, length(q - uHum[j + 2].xyz - uHum[j + 3].xyz * 0.06 * uHum[j + 3].w + vec3(0.0, 0.03, 0.0)) - 0.17 * uHum[j + 3].w);
  }
  return d - 0.01;
}
// forma simplificada para las sombras (por dentro de la de detalle; diez piezas sin cambios de marco ni bucles: la
// evalúan las pasadas de sombra en cada paso)
float pzc_humano(vec3 q, vec4 T) {
  int b = int(T.w + 0.5) * HU_NJ;
  vec4 sA = uHum[b + 43], sH = uHum[b + 45];
  float kr = uHum[b + 33].w;
  float d = sdCapsule(q, sA.xyz, uHum[b + 44].xyz, sA.w);
  d = min(d, length(q - sH.xyz) - sH.w);
  d = min(d, sdCapsule(q, uHum[b + 9].xyz, uHum[b + 10].xyz, 0.032 * kr));
  d = min(d, sdCapsule(q, uHum[b + 10].xyz, uHum[b + 11].xyz + uHum[b + 12].xyz * 0.1, 0.028 * kr));
  d = min(d, sdCapsule(q, uHum[b + 15].xyz, uHum[b + 16].xyz, 0.032 * kr));
  d = min(d, sdCapsule(q, uHum[b + 16].xyz, uHum[b + 17].xyz + uHum[b + 18].xyz * 0.1, 0.028 * kr));
  d = min(d, sdCapsule(q, uHum[b + 21].xyz, uHum[b + 22].xyz, 0.05 * kr));
  d = min(d, sdCapsule(q, uHum[b + 22].xyz, uHum[b + 23].xyz, 0.042 * kr));
  d = min(d, sdCapsule(q, uHum[b + 25].xyz, uHum[b + 26].xyz, 0.05 * kr));
  return min(d, sdCapsule(q, uHum[b + 26].xyz, uHum[b + 27].xyz, 0.042 * kr));
}
vec3 pzcol_humano(vec3 q, vec4 T, float m) {
  int b = int(T.w + 0.5) * HU_NJ;
  vec4 J = uHum[b + 30], PN = uHum[b + 31], PE = uHum[b + 32];
  vec3 qh = huAf(b + 3, q);
  float enCabeza = 1.0 - step(0.19, length(qh - vec3(0.0, 0.6, 0.0)));
  float v = 0.95 + 0.1 * vnoise(q * 9.0);
  vec3 cPiel = C_PIEL * PN.w;
  if (m < 0.5) {
    // piel: algo translúcida, la nariz y las orejas algo más rosadas, sombra de barba en la mandíbula (si la lleva)
    gTr = 1.0;
    vec3 c = cPiel * v;
    c = mix(c, c * vec3(1.06, 0.9, 0.86), (1.0 - smoothstep(0.0, 0.03, length(qh.xy - vec2(0.0, 0.575)))) * 0.6 * enCabeza * step(0.0, qh.z));
    float barba = smoothstep(0.585, 0.56, qh.y) * step(0.45, qh.y) * smoothstep(0.0, 0.06, qh.z) * (0.75 + 0.5 * hash13(floor(qh * 900.0))) * J.w * enCabeza;
    c = mix(c, c * vec3(0.78, 0.78, 0.82), barba * 0.5);
    // manos fantasma (postura.fantasma, 0…1): pálidas, frías, moteadas y con luz propia, como si se volvieran
    // transparentes (solo el color: la forma no cambia)
    float fan = uHum[b + 34].z;
    float dm = min(length(q - uHum[b + 11].xyz - uHum[b + 12].xyz * 0.08 * uHum[b + 13].w), length(q - uHum[b + 17].xyz - uHum[b + 18].xyz * 0.08 * uHum[b + 19].w));
    float kf = fan * (1.0 - smoothstep(0.1, 0.15, dm / uHum[b + 13].w));
    c = mix(c, vec3(0.28, 0.31, 0.36) * (0.65 + 0.7 * vnoise(q * 70.0)), kf * 0.85);
    gEm = vec3(0.09, 0.12, 0.16) * kf * (0.6 + 0.8 * vnoise(q * 25.0));
    // ojos cerrados: la línea de las pestañas en el borde del párpado
    float cierre = 1.0 - uHum[b + 29].x;
    float ax = abs(qh.x) - 0.044;
    float pest = (1.0 - smoothstep(0.0011, 0.0024, abs(qh.y - 0.5998 - 0.9 * ax * ax / 0.0225))) * (1.0 - smoothstep(0.016, 0.02, abs(ax))) * step(0.105, qh.z) * smoothstep(0.55, 0.9, cierre) * enCabeza;
    return mix(c, PE.rgb * 0.6, pest);
  }
  if (m < 1.5) return J.rgb * (0.86 + 0.28 * vnoise(q * vec3(160.0, 60.0, 160.0))) * v;
  if (m < 2.5) return J.rgb * 0.8 * v;
  if (m < 3.5) return PN.rgb * (0.92 + 0.12 * vnoise(q * vec3(90.0, 30.0, 90.0))) * v;
  if (m < 4.5) { gBri = 1.8; return C_CUERO * v; }
  if (m < 5.5) {
    // pelo (y cejas y pestañas), con canas en las sienes si las lleva
    gBri = 0.5;
    vec3 c = PE.rgb * (0.8 + 0.35 * vnoise(qh * vec3(40.0, 9.0, 40.0)));
    return mix(c, vec3(0.30, 0.28, 0.26), smoothstep(0.075, 0.115, abs(qh.x)) * smoothstep(0.66, 0.6, qh.y) * 0.7 * PE.w);
  }
  if (m < 6.5) return vec3(0.035, 0.022, 0.015);
  if (m < 7.5) return C_LABIO * 0.55;
  if (m < 8.5) return vec3(0.46, 0.43, 0.39);
  if (m < 9.5) return C_INK * 2.0;
  gTr = 1.0;
  return mix(cPiel, C_LABIO, 0.55) * v;
}
`;
const TIPOS_PRUEBA = {
  persona: { radio: 1.08, glifos: [], glsl: /* glsl */`
// Persona de plastilina con las proporciones de atomo/plato/HUMANO.md. Unidades locales: suela en
// y = −1, coronilla en y ≈ 0.765 (H ≈ 1.765). Líneas: barbilla 0.46 · hombros 0.39 · codos y cintura
// 0.056 · muñecas y entrepierna −0.173 · puntas de los dedos −0.349 · rodillas −0.525.
// Anchos: hombros 0.45 · caderas 0.33. Tramos del brazo: 0.30 · 0.22 · 0.18.
float personaPartes(vec3 q, out float m) {
  vec3 a = vec3(abs(q.x), q.y, q.z);
  // la cabeza se inclina un poco hacia Atom (arriba a la derecha): giro alrededor del cuello
  vec3 qh = q - vec3(0.0, 0.45, 0.0);
  qh.xy = mat2(0.9975, 0.0706, -0.0706, 0.9975) * qh.xy;
  qh.xz = mat2(0.9887, -0.1494, 0.1494, 0.9887) * qh.xz;
  qh.yz = mat2(0.9968, 0.0799, -0.0799, 0.9968) * qh.yz;
  qh += vec3(0.0, 0.45, 0.0);
  vec3 ah = vec3(abs(qh.x), qh.y, qh.z);
  // cabeza: un huevo (cráneo y mandíbula), orejas, nariz pequeña
  float cabeza = elipsoideP(qh - vec3(0.0, 0.618, -0.006), vec3(0.116, 0.132, 0.126));
  cabeza = smin(cabeza, elipsoideP(qh - vec3(0.0, 0.548, 0.024), vec3(0.085, 0.07, 0.093)), 0.045);
  cabeza = smin(cabeza, elipsoideP(ah - vec3(0.113, 0.592, -0.012), vec3(0.02, 0.034, 0.026)), 0.014);
  // nariz con puente (adulta)
  cabeza = smin(cabeza, capsulaC(qh, vec3(0.0, 0.608, 0.117), vec3(0.0, 0.577, 0.133), 0.0075, 0.0125), 0.012);
  cabeza = smin(cabeza, elipsoideP(ah - vec3(0.011, 0.5715, 0.124), vec3(0.0105, 0.008, 0.0095)), 0.008);
  float cuello = capsulaC(q, vec3(0.0, 0.39, -0.014), vec3(0.0, 0.5, -0.01), 0.043, 0.041);
  // pelo: una capa sobre el cráneo que deja la frente y las orejas a la vista, un mechón que cae
  // de lado sobre la frente y dos bultos en la coronilla (nada de casco)
  float pelo = elipsoideP(qh - vec3(0.0, 0.618, -0.006), vec3(0.133, 0.148, 0.14));
  float linea = 0.585 + 0.135 * smoothstep(-0.06, 0.07, qh.z) - 0.035 * smoothstep(0.07, 0.11, ah.x) * smoothstep(-0.02, 0.04, qh.z);
  pelo = smax(pelo, (linea - qh.y) * 0.8, 0.018);
  float mechon = capsulaC(qh, vec3(0.07, 0.738, 0.0), vec3(-0.058, 0.7, 0.084), 0.032, 0.022);
  mechon = smin(mechon, capsulaC(qh, vec3(0.098, 0.715, 0.03), vec3(0.03, 0.712, 0.098), 0.024, 0.018), 0.02);
  mechon = smin(mechon, length(qh - vec3(0.022, 0.732, -0.04)) - 0.04, 0.03);
  mechon = smin(mechon, length(qh - vec3(-0.058, 0.712, -0.06)) - 0.036, 0.03);
  pelo = smin(pelo, mechon, 0.03) + 0.0022 * sin((0.82 * qh.x + 0.57 * qh.z) * 95.0 + 3.0 * qh.y);
  // (adulta) cejas rectas y algo gruesas: expresión serena, atenta
  float cejas = min(capsulaC(ah, vec3(0.019, 0.6495, 0.1135), vec3(0.046, 0.6545, 0.110), 0.0066, 0.0072), capsulaC(ah, vec3(0.046, 0.6545, 0.110), vec3(0.071, 0.6495, 0.099), 0.0072, 0.0048));
  // ojos almendrados: blanco, iris oscuro (mira un poco hacia arriba y a la derecha, donde está Atom) y
  // párpados (el de arriba tapa el tercio superior); boca neutra: una línea de labios, sin sonrisa
  float blanco = elipsoideP(ah - vec3(0.044, 0.611, 0.1025), vec3(0.021, 0.0165, 0.0145));
  float pupila = length(vec3(qh.x - (qh.x > 0.0 ? 0.0445 : -0.0435) - 0.0012, qh.y - 0.6135, qh.z - 0.1132)) - 0.0115;
  float parpado = elipsoideP(ah - vec3(0.044, 0.6185, 0.1035), vec3(0.0245, 0.013, 0.0168));
  parpado = smax(parpado, 0.6145 - qh.y, 0.003);
  parpado = min(parpado, smax(elipsoideP(ah - vec3(0.044, 0.6035, 0.1015), vec3(0.0225, 0.0065, 0.0145)), qh.y - 0.6005, 0.003));
  float boca = capsulaC(vec3(abs(qh.x), qh.y + 0.06 * qh.x * qh.x / 0.024, qh.z), vec3(0.0, 0.5545, 0.1238), vec3(0.0265, 0.5548, 0.1192), 0.0033, 0.0025);
  float labio = elipsoideP(qh - vec3(0.0, 0.5487, 0.1185), vec3(0.018, 0.0058, 0.0075));
  // jersey: pecho y vientre (se estrecha en la cintura), hombros caídos, dos arrugas delante
  float ropa = elipsoideP(q - vec3(0.0, 0.25, 0.0), vec3(0.158, 0.15, 0.098));
  ropa = smin(ropa, elipsoideP(q - vec3(0.0, 0.05, 0.006), vec3(0.138, 0.15, 0.09)), 0.09);
  ropa = smin(ropa, capsulaC(a, vec3(0.045, 0.39, -0.012), vec3(0.164, 0.346, -0.006), 0.05, 0.05), 0.05);
  ropa = smin(ropa, length(a - vec3(0.168, 0.332, -0.006)) - 0.052, 0.04);
  float delante = smoothstep(0.03, 0.08, q.z);
  ropa += 0.0035 * delante * (1.0 - smoothstep(0.0, 0.007, abs(q.y - 0.03 - 0.01 * sin(q.x * 29.0))));
  ropa += 0.003 * delante * (1.0 - smoothstep(0.0, 0.006, abs(q.y + 0.012 - 0.008 * sin(q.x * 23.0 + 1.0))));
  // brazos colgando, el codo a la altura de la cintura, con una arruga en el codo
  float brazo = capsulaC(a, vec3(0.172, 0.346, -0.008), vec3(0.192, 0.058, -0.03), 0.049, 0.042);
  brazo = smin(brazo, capsulaC(a, vec3(0.192, 0.058, -0.03), vec3(0.2, -0.13, 0.0), 0.042, 0.037), 0.03);
  brazo += 0.004 * (1.0 - smoothstep(0.0, 0.008, abs(q.y - 0.07)));
  ropa = smin(ropa, brazo, 0.014) + punto(q);
  // elásticos: bajo del jersey, puños y cuello redondo
  float elastico = elipsoideP(q - vec3(0.0, -0.062, 0.004), vec3(0.15, 0.036, 0.1)) + 0.0025 * sin(atan(q.x, q.z) * 44.0);
  elastico = min(elastico, capsulaC(a, vec3(0.199, -0.128, 0.0), vec3(0.2, -0.163, 0.004), 0.041, 0.04) + 0.002 * sin(atan(a.x - 0.2, a.z) * 30.0));
  elastico = min(elastico, sdTorus(q - vec3(0.0, 0.402 - 0.12 * q.z, -0.01), vec2(0.052, 0.016)));
  // pantalón: cadera, muslos hasta la rodilla, piernas hasta el tobillo (la pierna mide 0.47 H)
  float pant = elipsoideP(q - vec3(0.0, -0.088, 0.0), vec3(0.157, 0.1, 0.094));
  float pierna = capsulaC(a, vec3(0.083, -0.13, 0.0), vec3(0.081, -0.525, 0.01), 0.073, 0.056);
  pierna = smin(pierna, capsulaC(a, vec3(0.081, -0.525, 0.01), vec3(0.083, -0.93, -0.004), 0.056, 0.053), 0.03);
  pant = smin(pant, pierna, 0.045);
  pant += 0.0015 * smoothstep(0.02, 0.06, q.z) * (1.0 - smoothstep(0.0, 0.012, abs(q.y + 0.51 + 0.01 * sin(a.x * 70.0))));
  // zapatos (0.15 H) con suela clara
  float zap = sdRoundBox(a - vec3(0.085, -0.966, 0.048), vec3(0.05, 0.03, 0.118), 0.03);
  zap = smin(zap, elipsoideP(a - vec3(0.085, -0.952, 0.112), vec3(0.058, 0.046, 0.074)), 0.03);
  // manos colgando junto al muslo, la palma hacia dentro; tres surcos entre los dedos
  float mano = elipsoideP(a - vec3(0.2, -0.226, 0.014), vec3(0.024, 0.058, 0.044));
  mano = smin(mano, elipsoideP(a - vec3(0.197, -0.298, 0.02), vec3(0.021, 0.05, 0.038)), 0.03);
  mano = smin(mano, capsulaC(a, vec3(0.191, -0.2, 0.05), vec3(0.182, -0.256, 0.063), 0.017, 0.014), 0.015);
  float surco = 1e5;
  for (int i = 0; i < 3; i++) {
    float zk = -0.006 + 0.024 * float(i);
    surco = min(surco, sdCapsule(a, vec3(0.219, -0.272, zk), vec3(0.215, -0.36, zk), 0.0035));
  }
  mano = smax(mano, -surco, 0.006);
  float piel = smin(cabeza, cuello, 0.025);
  float d = ropa; m = 1.0;
  if (elastico < d) m = 2.0; d = smin(d, elastico, 0.012);
  if (pant < d) m = 3.0; d = smin(d, pant, 0.015);
  if (zap < d) m = q.y < -0.983 ? 9.0 : 4.0; d = smin(d, zap, 0.02);
  if (mano < d) m = 0.0; d = smin(d, mano, 0.012);
  if (piel < d) m = 0.0; d = smin(d, piel, 0.02);
  if (pelo < d) m = 5.0; d = smin(d, pelo, 0.012);
  if (labio < d) m = 10.0; d = smin(d, labio, 0.006);
  if (cejas < d) m = 5.0; d = smin(d, cejas, 0.006);
  if (blanco < d) m = 8.0; d = smin(d, blanco, 0.004);
  if (pupila < d) m = 6.0; d = min(d, pupila);
  if (parpado < d) m = 0.0; d = smin(d, parpado, 0.0025);
  if (boca < d) m = 7.0; d = smin(d, boca, 0.003);
  return d;
}
float pz_persona(vec3 q, vec4 T, out float m) { return personaPartes(q, m) * 0.9; }
float pzc_persona(vec3 q, vec4 T) {
  vec3 a = vec3(abs(q.x), q.y, q.z);
  float d = elipsoideP(q - vec3(0.0, 0.25, 0.0), vec3(0.14, 0.13, 0.085));
  d = min(d, elipsoideP(q - vec3(0.0, 0.03, 0.004), vec3(0.12, 0.17, 0.08)));
  d = min(d, length(q - vec3(0.0, 0.6, 0.0)) - 0.1);
  d = min(d, sdCapsule(a, vec3(0.083, -0.15, 0.0), vec3(0.082, -0.92, 0.0), 0.045));
  return min(d, sdCapsule(a, vec3(0.175, 0.33, -0.01), vec3(0.198, -0.3, 0.012), 0.03));
}
vec3 pzcol_persona(vec3 q, vec4 T, float m) {
  float v = 0.95 + 0.1 * vnoise(q * 9.0);
  if (m < 0.5) {
    // piel: algo translúcida, un poco más rosada en la nariz y las orejas, sombra de barba en la mandíbula
    gTr = 1.0;
    vec3 c = C_PIEL * v;
    c = mix(c, c * vec3(1.06, 0.9, 0.86), (1.0 - smoothstep(0.0, 0.03, length(q.xy - vec2(0.0, 0.575)))) * 0.6);
    float barba = smoothstep(0.585, 0.56, q.y) * step(0.45, q.y) * smoothstep(0.0, 0.06, q.z) * (0.75 + 0.5 * hash13(floor(q * 900.0)));
    return mix(c, c * vec3(0.78, 0.78, 0.82), barba * 0.5);
  }
  if (m < 1.5) {
    // jersey de punto jaspeado (fibras claras y oscuras)
    float jas = vnoise(q * vec3(160.0, 60.0, 160.0));
    return C_JERSEY * (0.86 + 0.28 * jas) * v;
  }
  if (m < 2.5) return C_JERSEY * 0.8 * v;
  if (m < 3.5) return C_VAQUERO * (0.92 + 0.12 * vnoise(q * vec3(90.0, 30.0, 90.0))) * v;
  if (m < 4.5) { gBri = 1.8; return C_CUERO * v; }
  if (m < 5.5) {
    // pelo castaño oscuro, con canas en las sienes
    gBri = 0.5;
    vec3 c = C_PELO * (0.8 + 0.35 * vnoise(q * vec3(40.0, 9.0, 40.0)));
    return mix(c, vec3(0.30, 0.28, 0.26), smoothstep(0.075, 0.115, abs(q.x)) * smoothstep(0.66, 0.6, q.y) * 0.7);
  }
  if (m < 6.5) return vec3(0.035, 0.022, 0.015);
  if (m < 7.5) return C_LABIO * 0.55;
  if (m < 8.5) return vec3(0.46, 0.43, 0.39);
  if (m < 9.5) return C_INK * 2.0;
  gTr = 1.0;
  return mix(C_PIEL, C_LABIO, 0.55) * v;
}
` },
  mano: { radio: 2.25, glifos: [], glsl: GLSL_MANO, envolvente: true },
  piel: { radio: 2.4, glifos: [], glsl: /* glsl */`
// pelitos: base (x, z), inclinación (x, z) — el último es el del zoom (recto, en el centro)
const vec4 VB[12] = vec4[12](vec4(-1.0, -0.5, 0.3, 0.15), vec4(-0.62, 0.35, -0.35, 0.2), vec4(-0.25, -0.45, 0.25, -0.2), vec4(0.3, -0.55, -0.3, 0.1),
  vec4(0.7, -0.2, 0.35, 0.25), vec4(1.05, 0.4, -0.2, 0.3), vec4(-1.05, 0.55, 0.25, 0.3), vec4(0.45, 0.5, 0.3, 0.25), vec4(-0.45, 0.6, -0.15, 0.3),
  vec4(0.05, -0.62, 0.15, -0.25), vec4(0.95, -0.6, -0.35, 0.05), vec4(0.0, 0.12, 0.0, 0.0));
const float VL[12] = float[12](1.15, 1.3, 1.0, 1.25, 1.1, 0.95, 0.9, 1.2, 1.05, 0.9, 1.0, 1.9);
float pz_piel(vec3 q, vec4 T, out float m) {
  float losa = sdRoundBox(q - vec3(0.0, -0.24, 0.0), vec3(1.3, 0.24, 0.85), 0.07);
  vec3 qw = q + 0.22 * vec3(vnoise(q * 1.3) - 0.5, 0.0, vnoise(q * 1.3 + 5.0) - 0.5);
  float g1 = abs(fract((qw.x * 0.9 + qw.z * 0.55) * 2.0) - 0.5), g2 = abs(fract((qw.x * 0.45 - qw.z * 1.0) * 2.4) - 0.5);
  float surco = 1.0 - smoothstep(0.0, 0.05, min(g1, g2));
  float arriba = smoothstep(-0.14, -0.02, q.y);
  vec3 cpo = floor(q * 14.0);
  float poroF = (1.0 - smoothstep(0.08, 0.2, length(fract(q * 14.0) - 0.5 - 0.25 * (vec3(hash13(cpo), hash13(cpo + 3.1), hash13(cpo + 5.7)) - 0.5)))) * step(0.55, hash13(cpo + 9.0));
  losa += (0.012 * surco - 0.01 * vnoise(q * 7.0) - 0.004 * vnoise(q * 30.0) + 0.006 * poroF) * arriba;
  float pel = 1e5, poro = 1e5;
  for (int i = 0; i < 12; i++) {
    vec4 b = VB[i]; float L = VL[i];
    vec3 p0 = vec3(b.x, -0.02, b.y);
    vec3 p1 = p0 + vec3(b.z * 0.07, 0.32, b.w * 0.07) * L;
    vec3 p2 = p0 + vec3(b.z * 0.27, 0.63, b.w * 0.27) * L;
    vec3 p3 = p0 + vec3(b.z * 0.6, 0.93, b.w * 0.6) * L;
    float r = i == 11 ? 0.022 : 0.0135;
    pel = min(pel, min(min(sdCapsule(q, p0, p1, r), sdCapsule(q, p1, p2, r * 0.85)), sdCapsule(q, p2, p3, r * 0.65)));
    poro = min(poro, length((q - p0) * vec3(1.0, 1.6, 1.0)) - 0.055);
  }
  losa = smax(losa, -poro, 0.02);
  m = 0.0;
  if (surco > 0.6 && q.y > -0.05) m = 2.0;
  if (pel < losa) m = 1.0;
  return smin(losa, pel, 0.012) * 0.85;
}
float pzc_piel(vec3 q, vec4 T) {
  float d = sdRoundBox(q - vec3(0.0, -0.25, 0.0), vec3(1.28, 0.23, 0.83), 0.06);
  return min(d, sdCapsule(q, vec3(0.0, 0.0, 0.12), vec3(0.0, 1.7, 0.12), 0.02));
}
vec3 pzcol_piel(vec3 q, vec4 T, float m) {
  float v = 0.94 + 0.12 * vnoise(q * 5.0);
  if (m > 0.5 && m < 1.5) { gBri = 1.5; return C_PELO * (0.9 + 0.2 * vnoise(q * 40.0)); }
  gTr = 1.0;
  // (B ajustada) la piel con el mismo tono que la mano del salto anterior: moteada, algo rojiza alrededor de los
  // pelos y más oscura en los surcos (antes, una losa clara uniforme que quemaba la foto)
  vec3 sup = C_PIEL * vec3(0.95, 0.88, 0.84) * (0.62 + 0.14 * vnoise(q * 2.6) + 0.07 * vnoise(q * 9.0));
  float rojo = 0.0;
  for (int i = 0; i < 12; i++) { vec2 e = q.xz - VB[i].xy; rojo = max(rojo, exp(-dot(e, e) / 0.012)); }
  sup = mix(sup, sup * vec3(1.0, 0.8, 0.76), rojo * 0.45);
  vec3 c = q.y > -0.08 ? sup : (q.y > -0.36 ? C_DERMIS * 0.92 : C_GRASA * 0.88);
  if (m > 1.5) c *= 0.8;
  return c * v;
}
` },
  pelo: { radio: 3.9, glifos: [], glsl: /* glsl */`
vec4 hexCeldaP(vec2 p) {
  const vec2 s = vec2(1.0, 1.7320508);
  vec4 hC = floor(vec4(p, p - vec2(0.5, 1.0)) / s.xyxy) + 0.5;
  vec4 h = vec4(p - hC.xy * s, p - (hC.zw + 0.5) * s);
  return dot(h.xy, h.xy) < dot(h.zw, h.zw) ? vec4(h.xy, hC.xy) : vec4(h.zw, hC.zw + 0.5);
}
float hexBordeP(vec2 h) { h = abs(h); return 0.5 - max(dot(h, vec2(0.5, 0.8660254)), h.x); }
const vec3 FOL = vec3(0.0, 0.0, 0.8);
float pz_pelo(vec3 q, vec4 T, out float m) {
  float losa = sdRoundBox(q - vec3(0.0, -0.32, 0.0), vec3(1.7, 0.32, 1.12), 0.05);
  vec2 w = q.xz + 0.08 * vec2(vnoise(q * 2.3) - 0.5, vnoise(q * 2.3 + 7.1) - 0.5);
  vec4 hc = hexCeldaP(w / 0.34);
  float borde = hexBordeP(hc.xy);
  float alto = 0.045 * smoothstep(0.0, 0.1, borde) + 0.03 * hash12(hc.zw);
  float arriba = smoothstep(-0.12, -0.02, q.y);
  losa -= alto * arriba;
  // folículo: tubo hundido (cortado por la cara delantera), borde y bulbo con el pelo
  vec3 f = q - FOL;
  float tubo = max(length(f.xz) - 0.3, max(-0.5 - f.y, f.y - 0.2));
  losa = smax(losa, -tubo, 0.05);
  float aro = sdTorus(f - vec3(0.0, 0.03, 0.0), vec2(0.36, 0.065));
  losa = smin(losa, aro, 0.06);
  float bulbo = elipsoideP(f - vec3(0.0, -0.4, 0.0), vec3(0.26, 0.2, 0.26));
  float rp = 0.165 + 0.0035 * sin(q.y * 26.0 + 2.0 * sin(atan(q.z - FOL.z, q.x) * 2.0));
  float pelo = sdCapsule(q, FOL + vec3(0.0, -0.38, 0.0), FOL + vec3(0.0, 3.6, 0.0), rp);
  pelo = smin(pelo, bulbo, 0.08);
  m = 0.0;
  if (borde < 0.08 && q.y > -0.08) m = 1.0;
  if (q.z > 1.05) m = 2.0;
  if (tubo < 0.02 && q.y < -0.02) m = 5.0;
  if (pelo < losa) m = bulbo < pelo + 0.02 && q.y < -0.15 ? 4.0 : 3.0;
  return min(losa, pelo) * 0.8;
}
float pzc_pelo(vec3 q, vec4 T) {
  float losa = sdRoundBox(q - vec3(0.0, -0.33, 0.0), vec3(1.68, 0.3, 1.1), 0.05);
  return min(losa, sdCapsule(q, FOL + vec3(0.0, -0.3, 0.0), FOL + vec3(0.0, 3.6, 0.0), 0.15));
}
vec3 pzcol_pelo(vec3 q, vec4 T, float m) {
  float v = 0.94 + 0.12 * vnoise(q * 6.0);
  gTr = m < 2.5 ? 1.0 : 0.4;
  if (m > 2.5 && m < 3.5) gBri = 1.5;
  if (m < 0.5) { vec4 hc = hexCeldaP(q.xz / 0.34); return mix(C_PIEL * 1.08, vec3(0.68, 0.33, 0.24), hash12(hc.zw + 3.0) * 0.6) * v; }
  if (m < 1.5) return C_PIEL * 0.7 * v;
  if (m < 2.5) return (q.y > -0.1 ? C_PIEL * 1.05 : C_DERMIS) * v;
  if (m < 3.5) return C_PELO * (0.85 + 0.3 * vnoise(q * vec3(8.0, 30.0, 8.0)));
  if (m < 4.5) return C_PELO * 0.6;
  return vec3(0.45, 0.13, 0.11) * v;
}
` },
  tronco: { radio: 2.75, glifos: [], envolvente: true, glsl: /* glsl */`
// (B ajustada) el pelo de cerca: la cutícula son escamas que se solapan como las tejas de un tejado o las de una
// piña. Van en filas al tresbolillo que envuelven el cilindro (ESC_N por vuelta, con un leve giro en espiral);
// cada escama tiene el borde libre redondeado hacia la punta (arriba) y tapa la base de la fila de encima, así
// que lo que se ve de cada una es un escudo limitado arriba por su borde y abajo por los arcos de la fila de
// debajo. Cada escama es algo distinta (alto, arco, grosor, inclinación, tono) y el borde está un poco rasgado.
const float ESC_H = 0.235;   // alto de una fila (lo que asoma de cada escama)
const float ESC_N = 9.0;     // escamas por vuelta
const float ESC_W = 6.2831853 / ESC_N;
// borde libre de la escama de la fila j en el ángulo th: altura del borde e identidad (columna, fila)
float escBorde(float j, float th, float rasgado, out vec2 id, out float x) {
  float off = 0.5 * ESC_W * mod(j, 2.0) + 0.3 * ESC_W * (hash12(vec2(j, 3.7)) - 0.5);
  float u = (th - off) / ESC_W;
  float c = floor(u);
  x = fract(u) - 0.5;
  id = vec2(mod(c, ESC_N), j);
  float h1 = hash12(id + 0.37), h2 = hash12(id + 5.13), h3 = hash12(id + 9.71);
  float arco = (0.075 + 0.05 * h1) * (1.0 - 4.0 * x * x);
  return (j + 1.0) * ESC_H + 0.04 * (h2 - 0.5) + arco + 0.035 * (h3 - 0.5) * x * 2.0 + rasgado;
}
// la escama que se ve en (th, y): la de la fila más baja cuyo borde queda por encima. s: lo que queda hasta su
// borde; id: su identidad; x: posición a lo ancho (−0,5..0,5)
float escamaVis(float th, float y, out vec2 id, out float x) {
  float k = floor(y / ESC_H);
  // el borde, un poco rasgado (una sola vez por punto: la misma rasgadura vale para las filas vecinas)
  float rg = 0.0055 * sin(th * 27.0 + 1.7 * sin(th * 9.0 + y * 2.3)) + 0.003 * sin(th * 73.0 + y * 5.1) + 0.0015 * sin(th * 151.0 - y * 7.0);
  vec2 idA; float xA;
  float tA = escBorde(k - 1.0, th, rg, idA, xA);
  if (y < tA) { id = idA; x = xA; return tA - y; }
  float tB = escBorde(k, th, rg, id, x);
  if (y < tB) return tB - y;
  return escBorde(k + 1.0, th, rg, id, x) - y;
}
float troncoRelieve(vec3 q, out float m) {
  float th = atan(q.z, q.x) + 0.05 * q.y;
  vec2 id; float x;
  float s = escamaVis(th, q.y, id, x);
  float hs = hash12(id + 2.2);
  float grosor = 0.034 * (0.75 + 0.5 * hs) * (hs > 0.9 ? 1.5 : 1.0);
  // la escama se levanta hacia su borde libre (con el canto redondeado) y se hunde bajo la de debajo
  float e = grosor * smoothstep(0.0, 0.016, s) * (1.0 - smoothstep(0.02, 1.25 * ESC_H, s));
  // abombada a lo ancho, como una teja
  e += 0.01 * (1.0 - 4.0 * x * x);
  m = floor(hs * 8.0) + clamp(s / (1.4 * ESC_H), 0.0, 0.999);
  return e;
}
float pz_tronco(vec3 q, vec4 T, out float m) {
  // lejos de la superficie basta con el cilindro que lo envuelve (el relieve nunca pasa de r = 1,075)
  float rr0 = length(q.xz);
  m = 0.0;
  if (rr0 > 1.11) return max(rr0 - 1.075, max(q.y - 2.4, -1.4 - q.y));
  float e = troncoRelieve(q, m);
  float th = atan(q.z, q.x);
  float r = 0.985 + 0.02 * cos(2.0 * th + 0.4) + e + 0.002 * sin(th * 41.0 + q.y * 3.0);
  float d = (rr0 - r) * 0.45;
  return max(d, max(q.y - 2.4, -1.4 - q.y));
}
float pza_tronco(vec3 q, vec4 T) { return max(length(q.xz) - 1.08, max(q.y - 2.4, -1.4 - q.y)); }
float pzc_tronco(vec3 q, vec4 T) { return max(length(q.xz) - 0.97, max(q.y - 2.4, -1.4 - q.y)); }
vec3 pzcol_tronco(vec3 q, vec4 T, float m) {
  // queratina castaña: cada escama con su tono; el borde libre, fino y translúcido, más claro y cálido; la parte
  // que se mete bajo la escama de debajo, más oscura; vetas finas a lo largo del pelo
  float hs = floor(m) / 8.0, s = fract(m);
  float veta = vnoise(vec3(atan(q.z, q.x) * 9.0, q.y * 0.6, 0.0));
  vec3 base = vec3(0.105, 0.058, 0.033) * (0.8 + 0.3 * veta) * (0.86 + 0.28 * hs);
  base = mix(base, base * 0.55, smoothstep(0.45, 0.95, s));
  gTr = 0.75; gBri = 1.7;
  return mix(base, vec3(0.2, 0.125, 0.07), (1.0 - smoothstep(0.02, 0.09, s)) * 0.85);
}
` },
  reglaA: { radio: 2.05, glifos: [], glsl: /* glsl */`${GLSL_REMATES}
// regla de nogal con canto de latón y conteras: el exponente uReglaA.x queda a la altura uReglaA.y (local);
// la fila del exponente actual (uReglaA.w) se ve más grande (lupa uReglaA.z) y pintada de ámbar.
// Las marcas y los números van grabados y rellenos de marfil.
// (lote 0) uReglaB: x, RS (y local por potencia; 0,75 la de siempre) · y, regla entera (0…1: de −35 a +27 a la
// vez, rótulos solo en −35, −4, 0, +7 y +27 y el actual) · w, lupa de los rótulos en la regla entera.
// uReglaC: resalta los exponentes de x a y: z, fuerza en marcas y rótulos (se encienden en ámbar) · w, en la madera.
// Por debajo de 10⁻³⁵ la cara es la niebla de Planck y por encima de 10²⁷, la red de galaxias (los remates).
// Con los valores de siempre (RS 0,75, sin regla entera ni resaltado) se usa el código de antes, idéntico.
uniform vec4 uReglaA;
uniform vec4 uReglaB;
uniform vec4 uReglaC;
const float RS = 0.75, XL = -0.585, ESC0 = 0.2, ESC_E = ${fl(REGLA.ESC_ENTERA)};
bool reglaVieja() { return uReglaB.x == 0.75 && uReglaB.y <= 0.0 && uReglaC.z <= 0.0 && uReglaC.w <= 0.0; }
float reglaTintaA0(vec3 q, out float cur) {
  float s = uReglaA.x, ya = uReglaA.y, ec = uReglaA.w;
  float e = s + (q.y - ya) / RS;
  float er = floor(e + 0.5);
  float yr = ya + (er - s) * RS;
  float marcas = sdSeg(q.xy, vec2(XL, yr), vec2(XL + 0.21, yr));
  float e0 = floor(e);
  float y0 = ya + (e0 - s) * RS;
  for (int k = 2; k <= 9; k++) {
    float yk = y0 + log(float(k)) * 0.4342945 * RS;
    marcas = min(marcas, sdSeg(q.xy, vec2(XL, yk), vec2(XL + (k == 5 ? 0.13 : 0.08), yk)));
  }
  float dd = er - ec;
  float esc = ESC0 * (1.0 + uReglaA.z * exp(-dd * dd * 2.4));
  float txt = etiqA((q.xy - vec2(XL + 0.27, yr)) / esc, er) * esc;
  txt += (er < ${fl(ROT.E_MIN - 0.5)} || er > ${fl(ROT.E_MAX + 0.5)}) ? 1e3 : 0.0;
  cur = 1.0 - smoothstep(0.2, 0.55, abs(dd));
  float borde = 1.0 - smoothstep(1.64, 1.73, abs(q.y));
  return min(marcas - 0.0105 * borde, txt + 0.03 * (1.0 - borde));
}
// (lote 0) en la regla entera, −4 y 0 quedan a cuatro filas: el rótulo de −4 baja un poco y el de 0 sube; los de
// −35 y +27 se apartan de los remates
float offRotA(float e, float esc) { return e == -4.0 ? -0.07 : e == 0.0 ? 0.07 : e == -35.0 ? 0.45 * esc + 0.012 : e == 27.0 ? -0.75 * esc - 0.004 : 0.0; }
float reglaTintaA1(vec3 q, out float cur, out float luz) {
  float s = uReglaA.x, ya = uReglaA.y, ec = uReglaA.w, rs = uReglaB.x, k = uReglaB.y;
  float e = s + (q.y - ya) / rs;
  float er = floor(e + 0.5);
  float yr = ya + (er - s) * rs;
  bool dentro = er > ${fl(ROT.E_MIN - 0.5)} && er < ${fl(ROT.E_MAX + 0.5)};
  bool esp = er == -35.0 || er == -4.0 || er == 0.0 || er == 7.0 || er == 27.0;
  // una marca por potencia (en la regla entera, más corta salvo en las rotuladas) y las del logaritmo si caben
  float marcas = sdSeg(q.xy, vec2(XL, yr), vec2(XL + (esp ? 0.21 : mix(0.21, 0.13, k)), yr)) + (dentro ? 0.0 : 1e3);
  float kLog = smoothstep(0.2, 0.45, rs);
  if (kLog > 0.0) {
    float e0 = floor(e);
    float y0 = ya + (e0 - s) * rs;
    float fuera0 = (e0 > ${fl(ROT.E_MIN - 0.5)} && e0 < ${fl(ROT.E_MAX - 0.5)}) ? 0.0 : 1e3;
    for (int kk = 2; kk <= 9; kk++) {
      float yk = y0 + log(float(kk)) * 0.4342945 * rs;
      marcas = min(marcas, sdSeg(q.xy, vec2(XL, yk), vec2(XL + (kk == 5 ? 0.13 : 0.08) * kLog, yk)) + 0.03 * (1.0 - kLog) + fuera0);
    }
  }
  float curT = 1.0 - smoothstep(0.2, 0.55, abs(er - ec));
  // rótulos fila a fila (la regla de siempre): encogen y se van al comprimirse la regla
  float txt = 1e3, curL = 0.0, eL = er;
  float kN = 1.0 - smoothstep(0.0, 0.3, k);
  if (kN > 0.0 && dentro) {
    float dd = er - ec;
    float esc = ESC0 * (1.0 + uReglaA.z * exp(-dd * dd * 2.4)) * kN;
    if (esc > 0.002) { txt = etiqA((q.xy - vec2(XL + 0.27, yr)) / esc, er) * esc; curL = curT; }
  }
  // rótulos de la regla entera: −35, −4, 0, +7, +27 y el actual (grande y en ámbar); el que choca con el actual
  // se encoge
  float kE = smoothstep(0.2, 0.5, k);
  if (kE > 0.0) {
    float ecr = clamp(floor(ec + 0.5), ${fl(ROT.E_MIN)}, ${fl(ROT.E_MAX)});
    float escC = ESC_E * (1.0 + uReglaB.w) * kE;
    float yc = ya + (ecr - s) * rs + offRotA(ecr, escC) * k;
    float best = 1e5, eb = 0.0, yb = 0.0, sb = 0.0;
    for (int i = 0; i < 6; i++) {
      float ei = i == 0 ? -35.0 : i == 1 ? -4.0 : i == 2 ? 0.0 : i == 3 ? 7.0 : i == 4 ? 27.0 : ecr;
      float dd = ei - ec;
      float esc = ESC_E * (1.0 + uReglaB.w * exp(-dd * dd * 2.4)) * kE;
      float yi = ya + (ei - s) * rs + offRotA(ei, esc) * k;
      if (abs(ei - ecr) > 0.5) {
        float hueco = yi > yc ? (yi - 0.45 * esc) - (yc + 0.75 * escC) : (yc - 0.45 * escC) - (yi + 0.75 * esc);
        esc *= smoothstep(-0.03, 0.02, hueco);
      }
      float dy = abs(q.y - yi - 0.1 * esc);
      if (esc > 0.002 && dy < best) { best = dy; eb = ei; yb = yi; sb = esc; }
    }
    if (sb > 0.002) {
      float t2 = etiqA((q.xy - vec2(XL + 0.27, yb)) / sb, eb) * sb;
      if (t2 < txt) { txt = t2; curL = 1.0 - smoothstep(0.2, 0.55, abs(eb - ec)); eL = eb; }
    }
  }
  float borde = 1.0 - smoothstep(1.64, 1.73, abs(q.y));
  float dM = marcas - mix(0.0105, 0.0058, k) * borde, dT = txt + 0.03 * (1.0 - borde);
  cur = dT < dM ? curL : curT;
  float eF = dT < dM ? eL : er;
  luz = (eF > uReglaC.x - 0.5 && eF < uReglaC.y + 0.5) ? uReglaC.z : 0.0;
  return min(dM, dT);
}
float reglaTintaA(vec3 q, out float cur, out float luz) {
  luz = 0.0;
  if (reglaVieja()) return reglaTintaA0(q, cur);
  return reglaTintaA1(q, cur, luz);
}
// (lote 0) los remates: dónde acaba la escala (y local de 10^-35,5 y de 10^27,5)
vec2 reglaFinesA() {
  float rs = uReglaB.x;
  return vec2(uReglaA.y + (${fl(ROT.E_MIN - 0.5)} - uReglaA.x) * rs, uReglaA.y + (${fl(ROT.E_MAX + 0.5)} - uReglaA.x) * rs);
}
// la niebla: un cojín de arcilla gris que tapa la cara por debajo de 10⁻³⁵, más ancho que la regla, con bultos
// en el borde; la red: una placa oscura incrustada por encima de 10²⁷ (los filamentos, en el color)
float reglaRemates(vec3 q, out float mr) {
  vec2 yf = reglaFinesA();
  mr = 0.0;
  float d = 1e5;
  if (yf.x > -1.86) {
    // la nube no pasa del borde (10^-35,5): las bocanadas se quedan debajo y se salen un poco por los lados
    float y1 = min(yf.x, 1.86), hy = 0.5 * (y1 + 1.86);
    float n = sdRoundBox(q - vec3(0.0, 0.5 * (y1 - 1.86) - 0.1, 0.03), vec3(0.58, max(hy - 0.1, 0.0), 0.06), 0.08) - 0.03;
    for (int i = 0; i < 6; i++) {
      float fi = float(i), r = 0.1 + 0.07 * fract(sin(fi * 12.9898 + 1.3) * 43758.5453);
      n = smin(n, length(q - vec3(-0.56 + 0.224 * fi, y1 - r - 0.004, 0.06 + 0.05 * sin(fi * 3.1))) - r, 0.1);
    }
    // bultos de nube: dos octavas de ruido que empujan hacia fuera
    vec3 qn = vec3(q.x, q.y - yf.x, q.z);
    n += 0.05 * (vnoise(qn * 3.5) - 0.5) - 0.045 * vnoise(qn * 7.0 + 2.3) + 0.008 * (vnoise(q * 19.0) - 0.5);
    if (n < d) { d = n; mr = 5.0; }
  }
  if (yf.y < 1.86) {
    float y0 = max(yf.y, -1.86), hy = 0.5 * (1.86 - y0);
    float r = sdRoundBox(q - vec3(0.0, 0.5 * (y0 + 1.86), 0.05), vec3(0.6, hy, 0.022), 0.02);
    if (r < d) { d = r; mr = 7.0; }
  }
  return d;
}
float pz_reglaA(vec3 q, vec4 T, out float m) {
  float losa = sdRoundBox(q, vec3(0.66, 1.85, 0.06), 0.035);
  float canto = sdRoundBox(q - vec3(-0.64, 0.0, 0.004), vec3(0.04, 1.86, 0.066), 0.016);
  float cont = sdRoundBox(vec3(q.x, abs(q.y) - 1.8, q.z), vec3(0.685, 0.075, 0.072), 0.022);
  float cur, luz;
  float t2 = reglaTintaA(q, cur, luz);
  float surco = max(t2, 0.044 - q.z);
  float d = smax(losa, -surco, 0.004);
  m = (t2 < 0.0015 && q.z > 0.04) ? (cur > 0.5 ? 3.0 : (luz > 0.0 ? 6.0 : 1.0)) : 0.0;
  if (canto < d) m = 2.0;
  d = smin(d, canto, 0.006);
  if (cont < d) m = 4.0;
  d = smin(d, cont, 0.008);
  float mr;
  float rem = reglaRemates(q, mr);
  if (rem < d) m = mr;
  d = min(d, rem);
  return d * 0.95;
}
float pzc_reglaA(vec3 q, vec4 T) { return min(sdRoundBox(q, vec3(0.66, 1.83, 0.05), 0.03), sdRoundBox(vec3(q.x, abs(q.y) - 1.8, q.z), vec3(0.67, 0.065, 0.06), 0.02)); }
vec3 pzcol_reglaA(vec3 q, vec4 T, float m) {
  if (m > 4.5) {
    vec2 yf = reglaFinesA();
    if (m > 6.5) return colorRed(vec2(q.x, q.y - yf.y) * 1.25, 1.0);
    if (m > 5.5) { gEm = C_AMBAR * (0.10 + 0.3 * uReglaC.z); return C_AMBAR * 1.05; }
    return colorNiebla(vec3(q.x, q.y - yf.x, q.z));
  }
  if (m > 3.5 || (m > 1.5 && m < 2.5)) { gBri = 3.2; return C_BRASS * (0.88 + 0.2 * vnoise(q * vec3(30.0, 3.0, 30.0))); }
  if (m > 2.5) { gEm = C_AMBAR * 0.10; return C_AMBAR * 1.05; }
  if (m > 0.5) return C_MARFIL * (0.94 + 0.08 * vnoise(q * 60.0));
  // nogal: vetas largas a lo largo de la regla, poros oscuros
  float n = vnoise(vec3(q.x * 5.0, q.y * 0.5, q.z * 5.0));
  float n2 = vnoise(vec3(q.x * 22.0, q.y * 1.4, q.z * 22.0));
  float veta = sin((q.x + 0.18 * n + 0.03 * n2 + 0.05 * sin(q.y * 1.7)) * 90.0);
  float poro = smoothstep(0.78, 0.95, vnoise(vec3(q.x * 120.0, q.y * 8.0, q.z * 120.0)));
  gBri = 1.2;
  vec3 c = C_WOOD * (0.9 + 0.06 * veta + 0.22 * (n - 0.5) + 0.1 * (n2 - 0.5)) * (1.0 - 0.2 * poro);
  if (uReglaC.w > 0.0) {
    // (lote 0) el tramo resaltado: la madera más clara y cálida, con un poco de luz propia
    float e = uReglaA.x + (q.y - uReglaA.y) / uReglaB.x;
    float k = uReglaC.w * smoothstep(uReglaC.x - 0.62, uReglaC.x - 0.38, e) * (1.0 - smoothstep(uReglaC.y + 0.38, uReglaC.y + 0.62, e));
    c = mix(c, c * vec3(1.9, 1.55, 1.15), k);
    gEm = C_AMBAR * 0.045 * k;
  }
  return c;
}
` },
  flecha: { radio: 0.62, glifos: [], glsl: /* glsl */`
// (adulta) puntero: cuña fina y afilada de terracota, con un botón de latón detrás
float flechaD(vec3 q, float e) {
  // triángulo afilado: punta en (0.42, 0), base en x = −0.36 con semialto 0.16
  vec2 p = vec2(q.x, abs(q.y));
  float d2 = max(-0.36 - p.x, dot(p - vec2(0.42, 0.0), vec2(0.201, 0.980))) + e;
  vec2 w = vec2(d2 + 0.03, abs(q.z) - 0.045 * clamp((0.5 - q.x) / 0.8, 0.35, 1.0));
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.03;
}
float pz_flecha(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float d = flechaD(q, 0.0);
  // una muesca grabada a lo largo (como una aguja de instrumento)
  d = smax(d, -max(sdSeg(q.xy, vec2(-0.3, 0.0), vec2(0.2, 0.0)) - 0.012, 0.06 - abs(q.z)), 0.006);
  return d * 0.9;
}
float pzc_flecha(vec3 q, vec4 T) { return flechaD(q, 0.01); }
vec3 pzcol_flecha(vec3 q, vec4 T, float m) { return mix(C_TERRA, C_AMBAR, 0.3) * (0.95 + 0.1 * vnoise(q * 4.0)); }
` },
  pizarra: { radio: 0.82, glifos: ['?', '!'], glsl: /* glsl */`
// pizarrita de dos caras: «?» delante (+z) y «!» detrás (−z)
float pz_pizarra(vec3 q, vec4 T, out float m) {
  float marco = sdRoundBox(q, vec3(0.62, 0.46, 0.055), 0.05);
  float hueco = sdRoundBox(vec3(q.xy, abs(q.z) - 0.06), vec3(0.5, 0.34, 0.03), 0.02);
  float tabla = smax(marco, -hueco, 0.02);
  float dp;
  float dq = gq((q.xy - vec2(0.0, -0.02)) / 0.56, dp) * 0.56; float dpq = dp * 0.56;
  float de2 = gexc((vec2(-q.x, q.y) - vec2(0.0, -0.02)) / 0.56, dp) * 0.56; float dpe = dp * 0.56;
  float ru = 0.008 * (vnoise(q * 70.0) - 0.5);
  float cq = max(min(dq - 0.024, dpq - 0.036) + ru, abs(q.z - 0.03) - 0.004);
  float ce = max(min(de2 - 0.024, dpe - 0.036) + ru, abs(-q.z - 0.03) - 0.004);
  float tiza = min(cq, ce);
  m = 0.0;
  if (hueco < 0.0 || abs(q.z) < 0.035) m = 1.0;
  if (tiza < tabla) m = 2.0;
  return smin(tabla, tiza, 0.01) * 0.9;
}
float pzc_pizarra(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.6, 0.44, 0.04), 0.04); }
vec3 pzcol_pizarra(vec3 q, vec4 T, float m) {
  if (m > 1.5) return vec3(0.60, 0.58, 0.53) * (0.8 + 0.3 * vnoise(q * 90.0));
  if (m > 0.5) return C_PIZARRA * (0.8 + 0.4 * vnoise(q * 5.0)) + vec3(0.03, 0.03, 0.028) * smoothstep(0.6, 0.9, vnoise(q * 3.0 + 7.0));
  return C_MADERA * (0.85 + 0.3 * vnoise(q * vec3(14.0, 2.0, 2.0)));
}
` },
  vecino: { radio: 2.3, glifos: [], glsl: /* glsl */`
// átomo vecino de la molécula: bola, su órbita de churro y la varilla hacia −x (hasta el átomo)
float pz_vecino(vec3 q, vec4 T, out float m) {
  float bola = length(q) - 0.33 - 0.005 * sin(q.x * 9.0) * sin(q.y * 8.0);
  vec3 r = q;
  r.yz = mat2(0.8, -0.6, 0.6, 0.8) * r.yz;
  r.xy = mat2(0.9, 0.436, -0.436, 0.9) * r.xy;
  float orb = sdTorus(r, vec2(0.6, 0.016));
  float el = length(r - vec3(0.6 * cos(T.y), 0.0, 0.6 * sin(T.y))) - 0.055;
  float vara = sdCapsule(q, vec3(-0.3, 0.0, 0.0), vec3(-2.2, 0.0, 0.0), 0.035);
  m = 0.0;
  if (orb < bola) m = 1.0;
  if (el < min(bola, orb)) m = 2.0;
  if (vara < min(min(bola, orb), el)) m = 3.0;
  return smin(smin(min(bola, orb), el, 0.03), vara, 0.06);
}
float pzc_vecino(vec3 q, vec4 T) { return min(length(q) - 0.31, sdCapsule(q, vec3(-0.3, 0.0, 0.0), vec3(-2.1, 0.0, 0.0), 0.028)); }
vec3 pzcol_vecino(vec3 q, vec4 T, float m) {
  if (m > 2.5) { gBri = 3.0; return C_BRASS; }
  if (m > 1.5) { gEm = C_AMBAR * 0.18; return C_AMBAR; }
  if (m > 0.5) { gBri = 2.2; gEm = C_ORBITA * 0.05; return C_ORBITA; }
  return colorGlifo(T.z) * (0.93 + 0.14 * vnoise(q * 5.0));
}
` },
  cota: { radio: 1.3, glifos: [], glsl: /* glsl */`
// cota: línea que crece desde el centro (T.y = 0..1), puntas en sus extremos y topes en ±1
float pz_cota(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float k = max(T.y, 0.002);
  float d = sdCapsule(q, vec3(-k, 0.0, 0.0), vec3(k, 0.0, 0.0), 0.016);
  vec3 a = vec3(abs(q.x), abs(q.y), q.z);
  d = min(d, sdCapsule(a, vec3(k, 0.0, 0.0), vec3(k - 0.11, 0.06, 0.0), 0.015));
  d = min(d, sdCapsule(vec3(abs(q.x), q.y, q.z), vec3(1.0, -0.17, 0.0), vec3(1.0, 0.17, 0.0), 0.016));
  return d;
}
float pzc_cota(vec3 q, vec4 T) { float mm; return pz_cota(q, T, mm); }
vec3 pzcol_cota(vec3 q, vec4 T, float m) { gBri = 2.6; return vec3(0.66, 0.58, 0.42); }
` },
  etiqueta: { radio: 0.78, glifos: [], glsl: /* glsl */`
float pz_etiqueta(vec3 q, vec4 T, out float m) {
  float tab = sdRoundBox(q, vec3(0.7, 0.27, 0.03), 0.025);
  float txt = etiqA((q.xy - vec2(-0.6, -0.035)) / 0.4, -T.y) * 0.4;
  m = (txt < 0.0 && q.z > 0.0) ? 1.0 : 0.0;
  return tab;
}
float pzc_etiqueta(vec3 q, vec4 T) { return sdRoundBox(q, vec3(0.68, 0.25, 0.025), 0.02); }
vec3 pzcol_etiqueta(vec3 q, vec4 T, float m) { return m > 0.5 ? vec3(0.04, 0.03, 0.025) : vec3(0.60, 0.56, 0.47) * (0.95 + 0.08 * vnoise(q * 30.0)); }
` },
  // (lote 0) la persona con posturas (ver esqueletoHumano y P.pieza)
  humano: { radio: 1.3, glifos: [], glsl: GLSL_HUMANO, envolvente: true },
  // (lote 0) miniaturas de los remates de la regla: la red de galaxias en un medallón y la niebla de Planck en una nube
  red: { radio: 0.62, glifos: [], glsl: /* glsl */`${GLSL_REMATES}
float pz_red(vec3 q, vec4 T, out float m) {
  vec2 w = vec2(length(q.xy) - 0.44, abs(q.z) - 0.035);
  float d = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.045;
  float aro = sdTorus(vec3(q.x, q.z - 0.045, q.y), vec2(0.46, 0.022));
  m = aro < d ? 1.0 : 0.0;
  return smin(d, aro, 0.01);
}
float pzc_red(vec3 q, vec4 T) { return max(length(q.xy) - 0.46, abs(q.z) - 0.06); }
vec3 pzcol_red(vec3 q, vec4 T, float m) {
  if (m > 0.5) { gBri = 3.0; return C_BRASS * 0.85 * (0.9 + 0.2 * vnoise(q * 30.0)); }
  if (q.z > 0.0) return colorRed(q.xy * 1.6, 1.0);
  return vec3(0.03, 0.03, 0.045);
}
` },
  niebla: { radio: 0.72, glifos: [], glsl: /* glsl */`${GLSL_REMATES}
float pz_niebla(vec3 q, vec4 T, out float m) {
  m = 0.0;
  float d = length(q - vec3(0.0, -0.04, 0.0)) - 0.3;
  d = smin(d, length(q - vec3(-0.31, -0.12, 0.05)) - 0.21, 0.15);
  d = smin(d, length(q - vec3(0.33, -0.1, -0.02)) - 0.23, 0.15);
  d = smin(d, length(q - vec3(0.12, 0.2, 0.0)) - 0.21, 0.15);
  d = smin(d, length(q - vec3(-0.17, 0.15, 0.04)) - 0.18, 0.15);
  return (d + 0.03 * (vnoise(q * 6.0) - 0.5) + 0.006 * (vnoise(q * 23.0) - 0.5)) * 0.88;
}
float pzc_niebla(vec3 q, vec4 T) { return length(q - vec3(0.0, -0.02, 0.0)) - 0.3; }
vec3 pzcol_niebla(vec3 q, vec4 T, float m) { return colorNiebla(q); }
` },
  // (cartela) la placa de capítulo (ver CARTELA_ARCILLA y K.cartela)
  cartela: { radio: 1.2, glifos: [], glsl: /* glsl */`
uniform sampler2D uCartela;
uniform vec4 uCartelaK;   // caja del número horneado, en unidades locales: x0, y0, ancho, alto
// distancia con signo (unidades locales, negativa dentro) al número
float numCartela(vec2 p) {
  vec2 uv = (p - uCartelaK.xy) / uCartelaK.zw;
  vec2 cuv = clamp(uv, 0.0, 1.0);
  float d = (texture(uCartela, cuv).r - 0.5) * ${fl(2 * CARTELA_ARCILLA.KD)};
  return d + length((uv - cuv) * uCartelaK.zw);
}
const vec2 CAR_H = vec2(1.0, ${fl(220 / CARTELA_ARCILLA.U)});   // semiancho y semialto de la losa
const float CAR_Z = 0.06;                                          // semigrosor: la cara está en z = CAR_Z
const float CAR_B = ${fl(30 / CARTELA_ARCILLA.U)}, CAR_F = ${fl(9 / CARTELA_ARCILLA.U)};   // CARTELA.borde y .filete
float extruirC(float d2, float z, float h) { vec2 w = vec2(d2, abs(z) - h); return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)); }
float pz_cartela(vec3 q, vec4 T, out float m) {
  float losa = sdRoundBox(q, vec3(CAR_H, CAR_Z), 0.05);
  // filete de latón en relieve, a CAR_B del canto
  float fil = abs(sdRoundRect(q.xy, CAR_H - CAR_B - 0.5 * CAR_F, 0.03)) - 0.5 * CAR_F;
  float marco = extruirC(fil + 0.003, q.z - CAR_Z, 0.013) - 0.003;
  // el número, en relieve (de la cara a z = CAR_Z + 0,05), con los cantos redondeados
  float num = extruirC(numCartela(q.xy) + 0.008, q.z - CAR_Z - 0.02, 0.022) - 0.008;
  m = 0.0;
  if (marco < losa) m = 1.0;
  if (num < min(losa, marco)) m = 2.0;
  return smin(smin(losa, marco, 0.006), num, 0.01) * 0.85;
}
float pzc_cartela(vec3 q, vec4 T) { return sdRoundBox(q, vec3(CAR_H - 0.01, CAR_Z - 0.01), 0.04); }
vec3 pzcol_cartela(vec3 q, vec4 T, float m) {
  // el ámbar va oscuro y saturado (la luz del plató y el revelado lo aclaran): así se ve como el de papel e isométrico
  if (m > 1.5) { vec3 a = vec3(0.44, 0.16, 0.035); gEm = a * 0.03; return a * (0.95 + 0.08 * vnoise(q * 30.0)); }
  if (m > 0.5) { gBri = 3.2; return C_BRASS * 0.8 * (0.88 + 0.2 * vnoise(q * vec3(40.0, 4.0, 40.0))); }
  // nogal de la regla (vetas a lo largo de la losa), con la sombra que dejan el número y el filete
  float n = vnoise(vec3(q.x * 0.5, q.y * 5.0, q.z * 5.0));
  float n2 = vnoise(vec3(q.x * 1.4, q.y * 22.0, q.z * 22.0));
  float veta = sin((q.y + 0.18 * n + 0.03 * n2 + 0.05 * sin(q.x * 1.7)) * 90.0);
  float poro = smoothstep(0.78, 0.95, vnoise(vec3(q.x * 8.0, q.y * 120.0, q.z * 120.0)));
  float oc = 1.0 - 0.5 * (1.0 - smoothstep(-0.004, 0.05, numCartela(q.xy - vec2(0.024, -0.034))));
  float fil = abs(sdRoundRect(q.xy - vec2(0.012, -0.016), CAR_H - CAR_B - 0.5 * CAR_F, 0.03)) - 0.5 * CAR_F;
  oc *= 1.0 - 0.35 * (1.0 - smoothstep(-0.002, 0.025, fil));
  gBri = 1.2;
  return C_WOOD * 0.8 * (0.9 + 0.06 * veta + 0.22 * (n - 0.5) + 0.1 * (n2 - 0.5)) * (1.0 - 0.2 * poro) * oc;
}
` },
};

for (const [k, v] of Object.entries(TIPOS_PRUEBA)) {
  GLSL_TIPOS[k] = GLSL_PRUEBA_COMUN + (k === 'reglaA' || k === 'etiqueta' ? GLSL_ETIQA : '') + v.glsl;
  RADIO_TIPO[k] = v.radio;
}
const nombreTipo = (tipo) => (tipo.startsWith('glifo:') ? `glifo_${NOMBRE_GLIFO[tipo.slice(6)]}` : tipo);

// ---------- estrellitas del ciclorama y continentes del globo ----------
function estrellas(semilla, cuantas) {
  const r = mulberry32(semilla), out = [];
  let guard = 0;
  while (out.length < cuantas && guard++ < 4000) {
    const x = mix(-13, 13, r()), a = mix(-5.2, 2.1, r());
    if (out.some((s) => Math.hypot(s[0] - x, s[1] - a) < 1.3)) continue;
    const big = r();
    out.push([x, a, big > 0.85 ? mix(0.085, 0.11, r()) : mix(0.035, 0.065, r()), mix(0.55, 1, r())]);
  }
  while (out.length < cuantas) out.push([0, 99, 0.001, 0]);
  return out;
}
// manchas de tierra: [latitud, longitud, radio angular] en grados
const TIERRA = [
  [50, -102, 20], [62, -120, 12], [33, -95, 11], [18, -98, 6], [9, -82, 3.5], [72, -42, 9],
  [-4, -62, 15], [-20, -58, 12], [-36, -66, 8], [-48, -70, 4.5],
  [50, 14, 11], [62, 22, 8], [10, 18, 17], [-6, 26, 14], [-24, 26, 9], [-32, 22, 5], [19, 43, 7],
  [55, 80, 22], [60, 120, 16], [38, 100, 16], [23, 79, 9], [14, 103, 7], [36, 138, 4],
  [-25, 134, 12], [-90, 0, 17],
];

// ---------- GLSL común ----------
const GLSL_COMUN = /* glsl */`
precision highp float;
precision highp int;
// paleta adulta: tierras apagadas; el único acento es el terracota/ámbar (Atom, la marca de la regla)
const vec3 C_TERRA  = vec3(0.500, 0.150, 0.060);
const vec3 C_AMBAR  = vec3(0.760, 0.390, 0.085);
const vec3 C_CREAM  = vec3(0.560, 0.490, 0.370);
const vec3 C_SAGE   = vec3(0.120, 0.130, 0.070);   // oliva oscuro (antes, verde menta)
const vec3 C_MUST   = vec3(0.700, 0.360, 0.070);   // ámbar de los electrones
const vec3 C_BUTTER = vec3(0.400, 0.320, 0.190);
const vec3 C_SLATE  = vec3(0.016, 0.019, 0.027);   // carbón azul noche (antes, azul lila)
// (B ajustada) el telón del plató: pizarra cálida más clara que el carbón del espacio (la imagen media pasa
// de ~0,19 a ~0,27 de luminancia sin perder el contraste de cine)
const vec3 C_TELON  = vec3(TELON_R, TELON_G, TELON_B);
const vec3 C_STAR   = vec3(0.550, 0.500, 0.400);
const vec3 C_INK    = vec3(0.013, 0.011, 0.010);
const vec3 C_GREEN  = vec3(0.060, 0.090, 0.040);
const vec3 C_RED    = vec3(0.300, 0.060, 0.030);
const vec3 C_LIGHT  = vec3(0.520, 0.460, 0.350);
const vec3 C_SAND   = vec3(0.265, 0.212, 0.150);
const vec3 C_OCHRE  = vec3(0.210, 0.082, 0.009);
const vec3 C_OCEAN  = vec3(0.020, 0.040, 0.060);
const vec3 C_LAND   = vec3(0.070, 0.080, 0.035);
const vec3 C_GOLD   = vec3(0.270, 0.118, 0.010);
const vec3 C_WATER  = vec3(0.050, 0.085, 0.120);
const vec3 C_STEEL  = vec3(0.038, 0.041, 0.055);
const vec3 C_DUST   = vec3(0.170, 0.130, 0.090);
const vec3 C_WIRE   = vec3(0.030, 0.024, 0.019);   // alambre oscuro (ya no lo usa Atom)
// (B ajustada) las órbitas de Atom son de alambre de latón claro: se leen sobre el carbón y en el móvil; los
// electrones, cuentas de ámbar con luz propia (ámbar de verdad, no amarillo pálido: el revelado ACES aclara y
// desatura lo que pasa de ~0,6, así que su color va oscuro y saturado y la luz hace el resto)
const vec3 C_ORBITA = vec3(0.47, 0.30, 0.085);
const vec3 C_ELEC   = vec3(0.36, 0.095, 0.01);
const vec3 C_WOOD   = vec3(0.150, 0.088, 0.052);   // nogal de la regla
const vec3 C_MARFIL = vec3(0.600, 0.555, 0.450);   // marfil de los números incrustados
const vec3 C_BRASS  = vec3(0.470, 0.330, 0.120);

const float ZW = 4.2;   // pared del fondo en z = -ZW
const float RF = 2.6;   // radio de la curva del ciclorama

// luz de cine: principal cálida, lateral y alta (izquierda) · relleno frío y bajo · contraluz frío
const vec3 LPOS = vec3(-8.5, 11.0, 9.0);
const vec3 LCOL = vec3(1.0, 0.80, 0.60);
const vec3 SPOT_AT = vec3(-0.8, 1.9, -2.6);
const vec3 FILL_DIR = vec3(0.78, 0.22, 0.58);
const vec3 FILL_COL = vec3(0.24, 0.31, 0.48);
const vec3 RIM_DIR = vec3(0.62, 0.42, -0.66);
const vec3 RIM_COL = vec3(0.60, 0.74, 1.00);

uniform vec2 uRes;
uniform vec3 uCamPos;
uniform mat3 uCamRot;
uniform float uTanY, uAsp, uPix;
uniform float uPost;   // 1: viñeta y grano en el sombreador · 0: se ponen después, en 2D (la escena compone fotos)

float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
vec4 vnoised(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  vec3 u = f * f * (3.0 - 2.0 * f), du = 6.0 * f * (1.0 - f);
  float a = hash13(i), b = hash13(i + vec3(1,0,0)), c = hash13(i + vec3(0,1,0)), d = hash13(i + vec3(1,1,0));
  float e = hash13(i + vec3(0,0,1)), f1 = hash13(i + vec3(1,0,1)), g = hash13(i + vec3(0,1,1)), h = hash13(i + vec3(1,1,1));
  float k0 = a, k1 = b - a, k2 = c - a, k3 = e - a, k4 = a - b - c + d, k5 = a - c - e + g, k6 = a - b - e + f1, k7 = -a + b + c - d + e - f1 - g + h;
  float v = k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z;
  vec3 dv = du * vec3(k1 + k4*u.y + k6*u.z + k7*u.y*u.z, k2 + k5*u.z + k4*u.x + k7*u.z*u.x, k3 + k6*u.x + k5*u.y + k7*u.x*u.y);
  return vec4(v, dv);
}

vec3 rayoEn(vec2 fc) {
  vec2 uv = fc / uRes * 2.0 - 1.0;
  return normalize(uCamRot * vec3(uv.x * uTanY * uAsp, uv.y * uTanY, -1.0));
}

// ---------- ciclorama ----------
float bgSDF(vec3 p) {
  float u = p.z + ZW, v = p.y;
  if (u < RF && v < RF) return RF - length(vec2(RF - u, RF - v));
  return min(u, v);
}
float bgHit(vec3 ro, vec3 rd, out vec3 n, out float arc) {
  float zc = -ZW + RF;
  if (rd.y < 0.0) {
    float t = -ro.y / rd.y; vec3 p = ro + rd * t;
    if (p.z >= zc) { n = vec3(0, 1, 0); arc = RF * 1.5707963 + (p.z - zc); return t; }
  }
  if (rd.z < 0.0) {
    float t = (-ZW - ro.z) / rd.z; vec3 p = ro + rd * t;
    if (p.y >= RF) { n = vec3(0, 0, 1); arc = -(p.y - RF); return t; }
  }
  vec2 o = vec2(ro.y - RF, ro.z - zc), d = vec2(rd.y, rd.z);
  float a = dot(d, d), b = dot(o, d), c = dot(o, o) - RF * RF;
  float h = max(b * b - a * c, 0.0);
  float t = (-b + sqrt(h)) / a;
  vec3 p = ro + rd * t;
  n = normalize(vec3(0.0, RF - p.y, zc - p.z));
  float ang = atan(zc - p.z, RF - p.y);
  arc = RF * (1.5707963 - ang);
  return t;
}
// el foco: un charco de luz estrecho en el fondo (que cae a negro por los lados) y uno ancho para las piezas
float spotCone(vec3 p) {
  vec3 sd = normalize(SPOT_AT - LPOS);
  float c = dot(normalize(p - LPOS), sd);
  // (B ajustada) charco más ancho y con más luz alrededor
  return mix(SPOT_MIN, 1.0, smoothstep(SPOT_A, 0.985, c)) + SPOT_HALO * smoothstep(SPOT_A - 0.12, SPOT_A + 0.04, c);
}
float spotObj(vec3 p) {
  vec3 sd = normalize(SPOT_AT - LPOS);
  float c = dot(normalize(p - LPOS), sd);
  return mix(SPOTOBJ_MIN, 1.0, smoothstep(0.80, 0.95, c));
}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
`;

// ---------- horneado del ciclorama (una vez por cámara y tamaño) ----------
const GLSL_HORNO = /* glsl */`
out vec4 fragColor;
uniform vec4 uStars[NSTARS];
uniform int uSalida;   // 0: luz directa · 1: luz ambiente
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy);
  vec3 n; float arc;
  float tb = bgHit(ro, rd, n, arc);
  vec3 p = ro + rd * tb;
  // fondo pintado: carbón azul noche con manchas grandes (como un telón de plató) y un poco de calidez
  // donde da el foco; el suelo, algo más cálido (polvo de taller)
  float man = 0.55 * vnoise(p * 0.32 + 3.0) + 0.3 * vnoise(p * 0.9 + 7.0) + 0.15 * vnoise(p * 2.7);
  vec3 alb = C_TELON * (0.70 + 0.62 * man) * (0.95 + 0.1 * vnoise(p * 6.0));
  alb = mix(alb, alb * vec3(1.25, 1.08, 0.86), smoothstep(1.2, -0.4, p.y) * 0.6);
  // donde da el foco, el telón es algo más cálido (tierra tostada); fuera, carbón azul noche
  alb = mix(alb, alb * vec3(1.35, 1.12, 0.88), smoothstep(0.4, 1.0, spotCone(p)) * 0.7);
  vec4 nd = vnoised(p * 1.4);
  vec3 g = nd.yzw * 0.035;
  vec4 gr = vnoised(p * 22.0);
  g += gr.yzw * 0.006;
  n = normalize(n - (g - n * dot(g, n)));
  vec3 L = normalize(LPOS - p);
  float dist = length(LPOS - p);
  float fall = pow(15.0 / dist, 2.0);
  float ndl = max(dot(n, L), 0.0);
  float spot = spotCone(p);
  vec3 D = alb * LCOL * 1.5 * ndl * spot * fall;
  vec3 A = alb * FILL_COL * FILL_FONDO + alb * vec3(0.08, 0.10, 0.15) * 0.25;
  fragColor = vec4(uSalida == 0 ? sqrt(clamp(D / 4.0, 0.0, 1.0)) : sqrt(clamp(A / 0.5, 0.0, 1.0)), 1.0);
}
`;

// ---------- desenfoque del ciclorama horneado (profundidad de campo; una vez) ----------
const GLSL_DESENFOQUE = /* glsl */`
out vec4 fragColor;
uniform sampler2D uTex;
uniform vec2 uDir;
uniform float uFoco, uK;
void main() {
  vec2 fc = gl_FragCoord.xy;
  vec3 n; float arc;
  float t = bgHit(uCamPos, rayoEn(fc), n, arc);
  float r = uK * abs(1.0 - uFoco / t) * uRes.y / 1080.0;
  vec3 acc = vec3(0.0); float ws = 0.0;
  for (int i = -10; i <= 10; i++) {
    float x = float(i) / 10.0;
    float w = exp(-x * x * 2.5);
    acc += texture(uTex, (fc + uDir * x * r) / uRes).rgb * w; ws += w;
  }
  fragColor = vec4(acc / ws, 1.0);
}
`;

// ---------- números del tablero horneados (distancia 2D al trazo; una vez) ----------
const GLSL_HORNO_DIGITOS = (glifos) => /* glsl */`
precision highp float;
out vec4 fragColor;
uniform vec2 uTam;
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float sdArco(vec2 p, vec2 c, float r, vec2 cs, vec2 e) {
  p -= c;
  p = vec2(dot(p, cs), cs.x * p.y - cs.y * p.x);
  p.y = abs(p.y);
  return (p.y * e.x > p.x * e.y) ? length(p - e * r) : abs(length(p) - r);
}
${glifos}
void main() {
  vec2 uv = gl_FragCoord.xy / uTam;
  vec2 p = mix(vec2(-3.0, ${f4(TAB.YD - 0.32)}), vec2(3.0, ${f4(TAB.YD + 0.32)}), uv);
  float fi = clamp(floor(p.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  int i = int(fi);
  vec2 c = (vec2(p.x - (fi - 2.5) * ${f4(TAB.PASO)}, p.y - ${f4(TAB.YD)})) / 0.4;
  float dp, d = 1e5;
  if (i == 0) d = g1(c, dp);
  else if (i == 1) d = g2(c, dp);
  else if (i == 2) d = g3(c, dp);
  else if (i == 3) d = g4(c, dp);
  else if (i == 4) d = g5(c, dp);
  else d = g6(c, dp);
  fragColor = vec4(clamp(d * 0.4 / 0.5, 0.0, 1.0), 0.0, 0.0, 1.0);
}
`;

// ---------- biblioteca de formas ----------
const GLSL_FORMAS = /* glsl */`
out vec4 fragColor;
uniform float uFrame, uFlicker, uLump;
uniform vec3 uBoil;
uniform vec4 uB[NB];            // esferas envolventes: 0 átomo · 1 globo · 2 tablero · 3 polvo · 4.. piezas (radio 0 = no está)

float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdTorus(vec3 p, vec2 t) { vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdCapsule(vec3 p, vec3 a, vec3 b, float r) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float sdRoundBox(vec3 p, vec3 b, float r) { vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdRoundRect(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
// arco de centro c y radio r (cs = cos/sin del ángulo central, e = cos/sin de la semiapertura)
float sdArco(vec2 p, vec2 c, float r, vec2 cs, vec2 e) {
  p -= c;
  p = vec2(dot(p, cs), cs.x * p.y - cs.y * p.x);
  p.y = abs(p.y);
  return (p.y * e.x > p.x * e.y) ? length(p - e * r) : abs(length(p) - r);
}
float sdStar5(vec2 p, float r, float rf) {
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-0.809016994375, -0.587785252292);
  p.x = abs(p.x);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1;
  p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x);
  p.y -= r;
  vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
  float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}
// hervor barato: bultitos que cambian en cada fotograma (silueta del átomo y del globo)
float bultos(vec3 q) { return sin(q.x * 3.3 + uBoil.x) * sin(q.y * 2.9 + uBoil.y) * sin(q.z * 3.1 + uBoil.z); }
float lumps(vec3 q) {
  return sin(q.x * 3.3 + uBoil.x) * sin(q.y * 2.9 + uBoil.y) * sin(q.z * 3.1 + uBoil.z)
       + 0.5 * sin(q.x * 6.1 - uBoil.y) * sin(q.y * 5.7 + uBoil.z) * sin(q.z * 6.3 + uBoil.x);
}
// churro de arcilla tumbado en el plano z = 0 (algo aplastado)
float churro(float d2, float z, float r) { return (length(vec2(d2, z * 1.25)) - r * 1.25) * 0.8; }
// pieza ausente: muy lejos (selección, para que un NaN de sus uniformes no se propague)
float fuera(int i, float d) { return uB[i].w > 0.0 ? d : 1e5; }

vec3 colorGlifo(float c) {
  if (c < 0.5) return C_INK;
  if (c < 1.5) return C_BUTTER;
  if (c < 2.5) return vec3(0.44, 0.29, 0.10);
  if (c < 3.5) return vec3(0.54, 0.48, 0.38);
  if (c < 4.5) return C_TERRA;
  return vec3(0.19, 0.20, 0.11);
}

// (adulta) em: luz propia · tr: translucidez (piel, Sol) · bri: brillo especular (latón > arcilla)
struct Mat { vec3 alb; vec3 lp; float bs; float det; float esc; vec3 g; vec3 em; float tr; float bri; };
// los colores de las piezas (pzcol_*) pueden fijar estos tres; mat_<pieza> los copia a Mat
vec3 gEm = vec3(0.0); float gTr = 0.0; float gBri = 1.0;
// (B ajustada) gG: relieve fino de la pieza (gradiente de una altura, en unidades locales), que se aplica como
// relieve de la normal en vez de como forma: arrugas de la piel sin pagarlas en cada paso del rayo
vec3 gG = vec3(0.0);
`;
// (aquí van los glifos que use el plató: ✓ y ✗ siempre)
const GLSL_FICHA = /* glsl */`
// ficha de veredicto: losa de arcilla con el símbolo en churro claro encima (tipo 1 ✓ · 2 ✗)
float fichaD(vec3 q, float tipo, out float m) {
  float d = sdRoundBox(q, vec3(0.32, 0.32, 0.085), 0.075);
  float dp;
  vec2 g = q.xy / 0.6;
  float g2 = (tipo < 1.5 ? gsi(g, dp) : gno(g, dp)) * 0.6;
  float ds = churro(g2, q.z - 0.085, 0.058);
  m = ds < d ? 1.0 : 0.0;
  return smin(d, ds, 0.03);
}
float fichaC(vec3 q) { return sdRoundBox(q, vec3(0.3, 0.3, 0.075), 0.07); }
`;

// ---------- piezas fijas ----------
const GLSL_ATOMO = /* glsl */`
uniform vec3 uCen, uSq;
uniform float uAEsc;
uniform mat3 uYaw;
uniform vec4 uNuc[8];
uniform mat3 uRingM[3];
uniform vec2 uRing;
uniform vec4 uElec[3];
uniform vec3 uBrazo;      // grosor del brazo de churro que une cada electrón con el núcleo (0: sin brazo)
uniform vec3 uAPrint;
uniform float uAEn;       // (adulta) energía de la voz: el brillo de Atom
float brazo(vec3 q, int i, float k) {
  float r = uBrazo[i] * k;
  return sdCapsule(q, uElec[i].xyz * 0.25, uElec[i].xyz, r) + (r > 0.001 ? 0.0 : 1e5);
}
#ifdef ATOMO_MANO
// mano de plastilina en la punta de un brazo: palma aplastada y cinco dedos de churro
uniform vec4 uMano;       // centro (local del átomo) y tamaño (0: sin mano)
uniform vec3 uManoEje;    // dirección del brazo (local), hacia donde apuntan los dedos
vec3 manoLocal(vec3 q) {
  vec3 a = uManoEje;
  vec3 b = normalize(cross(vec3(0.0, 0.0, 1.0), a));
  vec3 c = cross(a, b);
  vec3 r = q - uMano.xyz;
  return vec3(dot(r, b), dot(r, a), dot(r, c)) / max(uMano.w, 1e-3);
}
float mano(vec3 q) {
  vec3 h = manoLocal(q);
  vec3 k = vec3(0.85, 0.75, 0.36);
  float k0 = length(h / k), k1 = length(h / (k * k));
  float d = k0 * (k0 - 1.0) / k1;                                           // palma
  d = smin(d, sdCapsule(h, vec3(-0.5, 0.42, 0.0), vec3(-0.72, 1.2, 0.02), 0.19), 0.14);
  d = smin(d, sdCapsule(h, vec3(-0.17, 0.55, 0.0), vec3(-0.24, 1.45, 0.02), 0.2), 0.14);
  d = smin(d, sdCapsule(h, vec3(0.17, 0.55, 0.0), vec3(0.22, 1.4, 0.02), 0.2), 0.14);
  d = smin(d, sdCapsule(h, vec3(0.5, 0.42, 0.0), vec3(0.66, 1.1, 0.02), 0.18), 0.14);
  d = smin(d, sdCapsule(h, vec3(0.62, -0.2, 0.0), vec3(1.2, 0.18, 0.04), 0.19), 0.14);   // pulgar
  return d * uMano.w + (uMano.w > 0.002 ? 0.0 : 1e5);
}
float manoC(vec3 q) {
  vec3 h = manoLocal(q);
  vec3 k = vec3(0.8, 0.7, 0.3);
  float k0 = length(h / k), k1 = length(h / (k * k));
  return k0 * (k0 - 1.0) / k1 * uMano.w + (uMano.w > 0.002 ? 0.0 : 1e5);
}
#endif
vec3 atomLocal(vec3 p) { return uYaw * ((p - uCen) / (uSq * uAEsc)); }
float atomEsc() { return min(uSq.x, uSq.y) * uAEsc * 0.9; }
float sdf_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = 1e5;
  for (int i = 0; i < 8; i++) d = smin(d, length(q - uNuc[i].xyz) - uNuc[i].w, 0.05);
  for (int i = 0; i < 3; i++) {
    vec3 r = uRingM[i] * q;
    float dt = sdTorus(r, uRing * vec2(1.0, 1.0 + 0.06 * sin(dot(r, vec3(4.1, 2.3, 3.7)) + float(i) * 2.1 + uBoil.x)));
    float de = length(q - uElec[i].xyz) - uElec[i].w;
    d = smin(d, smin(dt, de, 0.05), 0.02);
    d = smin(d, brazo(q, i, 1.0), 0.09);
  }
#ifdef ATOMO_MANO
  d = smin(d, mano(q), 0.07);
#endif
  return (d - 0.0035 * bultos(q * 1.6)) * atomEsc();
}
float sdfc_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = length(q) - 0.42;
  for (int i = 0; i < 3; i++) {
    d = min(d, sdTorus(uRingM[i] * q, uRing - vec2(0.0, 0.012)));
    d = min(d, length(q - uElec[i].xyz) - uElec[i].w + 0.012);
    d = min(d, brazo(q, i, 0.8));
  }
#ifdef ATOMO_MANO
  d = min(d, manoC(q));
#endif
  return fuera(0, d * atomEsc());
}
// envolvente barata y conservadora (nunca más lejos que la forma real): primera fase del rayo
float sdfa_atomo(vec3 p) {
  vec3 q = atomLocal(p);
  float d = length(q) - 0.72;
  for (int i = 0; i < 3; i++) {
    d = min(d, sdTorus(uRingM[i] * q, uRing * vec2(1.0, 1.12)));
    d = min(d, length(q - uElec[i].xyz) - uElec[i].w);
    d = min(d, brazo(q, i, 1.1));
  }
#ifdef ATOMO_MANO
  d = min(d, length(q - uMano.xyz) - 1.75 * uMano.w + (uMano.w > 0.002 ? 0.0 : 1e5));
#endif
  return d * atomEsc();
}
void mat_atomo(vec3 p, inout Mat M) {
  vec3 q = atomLocal(p);
  // (adulta) pesos de cada parte: núcleo de terracota y crema · alambre oscuro · electrones ámbar
  float wN = 0.0, wW = 0.0, wE = 0.0;
  vec3 cN = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    float di = length(q - uNuc[i].xyz) - uNuc[i].w;
    float w = exp(-max(di, 0.0) * 55.0);
    cN += w * ((i - (i / 2) * 2) == 0 ? C_TERRA * (0.92 + 0.16 * vnoise(q * 9.0)) : C_CREAM * (0.94 + 0.1 * vnoise(q * 11.0))); wN += w;
  }
  for (int i = 0; i < 3; i++) {
    float dt = sdTorus(uRingM[i] * q, uRing);
    wW += exp(-max(dt, 0.0) * 90.0);
    float de = length(q - uElec[i].xyz) - uElec[i].w;
    wE += exp(-max(de, 0.0) * 70.0) * 6.0;   // (B ajustada) el electrón manda sobre el alambre que lo cruza
    wW += exp(-max(brazo(q, i, 1.0), 0.0) * 90.0);
  }
  vec3 col = cN + wW * C_ORBITA + wE * C_ELEC;
  float ws = wN + wW + wE;
#ifdef ATOMO_MANO
  float wm = exp(-max(mano(q), 0.0) * 55.0) * 1.5;
  col += wm * C_LIGHT; ws += wm;
#endif
  ws = max(ws, 1e-4);
  M.alb = col / ws;
  float kN = wN / ws, kW = wW / ws, kE = wE / ws;
  // brillo leve que late con la voz: el núcleo se enciende por dentro y los electrones, más
  // (B ajustada) los electrones tienen luz propia (siempre se ven) y el alambre de latón algo de brillo
  M.em = C_AMBAR * kN * (0.08 + 0.30 * uAEn) * smoothstep(0.42, 0.0, length(q)) + C_ELEC * kE * (0.6 + 0.8 * uAEn) + C_ORBITA * kW * (0.03 + 0.04 * uAEn);
  M.tr = 0.55 * kN;
  // el alambre, algo metálico (brillos de color latón); los electrones, con un brillo vivo y estrecho de cuenta
  M.bri = mix(mix(1.0, 2.4, kW), 1.97, kE);
  M.lp = q * 0.7 + uAPrint; M.bs = 1.0; M.det = mix(0.8, 0.15, kW); M.esc = uAEsc; M.g = vec3(0.0);
}
`;

const GLSL_GLOBO = /* glsl */`
uniform vec4 uGC;        // centro, radio
uniform mat3 uGM;        // mundo → local (eje = y)
uniform vec4 uCaps[NCAPS];
uniform vec3 uGPrint;
float tierra(vec3 dir) {
  float w = 0.05 * (vnoise(dir * 7.0) - 0.5) + 0.025 * (vnoise(dir * 15.0) - 0.5);
  float m = 0.0;
  for (int i = 0; i < NCAPS; i++) {
    vec4 c = uCaps[i];
    m = max(m, smoothstep(c.w - 0.012, c.w + 0.012, dot(dir, c.xyz) + w));
  }
  return m;
}
float globoBanda(vec3 q, float R) {
  vec2 b = vec2(length(q.xz) - R * 1.005, q.y);
  return sdRoundRect(b, vec2(0.055 * R, 0.085 * R), 0.05 * R);
}
float sdf_globo(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  float d = smin(length(q) - R, globoBanda(q, R), 0.03 * R);
  return (d - 0.006 * R * bultos(q / R * 2.2)) * 0.95;
}
float sdfc_globo(vec3 p) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  return fuera(1, min(length(q) - R * 0.985, globoBanda(q, R * 0.985)));
}
void mat_globo(vec3 p, inout Mat M) {
  vec3 q = uGM * (p - uGC.xyz);
  float R = uGC.w;
  vec3 dir = normalize(q);
  // continentes: manchas aplastadas (relieve por normal)
  vec3 t1 = normalize(cross(dir, vec3(0.0001, 1.0, 0.0002)));
  vec3 t2 = cross(dir, t1);
  float e = 0.012;
  float l0 = tierra(dir), l1 = tierra(normalize(dir + t1 * e)), l2 = tierra(normalize(dir + t2 * e));
  M.g = transpose(uGM) * (((l1 - l0) * t1 + (l2 - l0) * t2) * (0.03 / e));
  vec3 oc = C_OCEAN * (0.88 + 0.24 * vnoise(q / R * 4.0));
  vec3 lc = C_LAND * (0.85 + 0.3 * vnoise(q / R * 6.0 + 3.0));
  vec3 alb = mix(oc, lc, smoothstep(0.3, 0.7, l0));
  float band = globoBanda(q, R);
  float wb = 1.0 - smoothstep(-0.004 * R, 0.012 * R, band - (length(q) - R));
  M.alb = mix(alb, C_GOLD * (0.92 + 0.16 * vnoise(q / R * 9.0)), wb);
  M.g *= 1.0 - wb;
  M.lp = q / R * 1.6 + uGPrint; M.bs = 2.0; M.det = 1.0; M.esc = R * 0.6;
}
`;

const f4 = (v) => v.toFixed(4);
const GLSL_TABLERO = /* glsl */`
uniform vec4 uTC;        // centro, factor de distancia
uniform mat3 uTM;        // mundo → local (rotación y escala)
uniform vec4 uTBox;      // caja local envolvente: semiancho, semialto, z mínima, z máxima
uniform vec4 uCelda[6];  // tipo (0 · 1 ✓ · 2 ✗), elevación, aplastamiento, giro
uniform vec4 uCelda2[6]; // escala, desplazamiento x, desplazamiento y, —
uniform vec3 uTPrint;
uniform sampler2D uDigitos;
// distancia 2D al trazo de los números 1–6 (horneada en una textura; fuera de la fila, aproximada)
const vec4 DIG_CAJA = vec4(-3.0, ${f4(TAB.YD - 0.32)}, 3.0, ${f4(TAB.YD + 0.32)});
float digitos(vec2 p) {
  vec2 uv = (p - DIG_CAJA.xy) / (DIG_CAJA.zw - DIG_CAJA.xy);
  vec2 cuv = clamp(uv, 0.0, 1.0);
  float d = texture(uDigitos, cuv).r * 0.5;
  return d + length((uv - cuv) * (DIG_CAJA.zw - DIG_CAJA.xy));
}
// la ficha de la casilla i: coordenadas locales de la ficha y su factor de distancia
vec3 fichaLocal(vec3 c, int i, out float k, out float off) {
  vec4 ce = uCelda[i];
  vec4 c2 = uCelda2[i];
  vec3 sq = vec3(1.0 + 0.55 * ce.z, 1.0 + 0.55 * ce.z, 1.0 - ce.z) * c2.x;
  vec3 tq = c - vec3(c2.y, ${f4(TAB.YW)} + c2.z, -0.1 + 0.16 * sq.z + ce.y);
  float cs = cos(ce.w), sn = sin(ce.w);
  tq.xy = vec2(cs * tq.x + sn * tq.y, -sn * tq.x + cs * tq.y);
  k = min(sq.x, sq.z);
  off = ce.x < 0.5 ? 1e5 : 0.0;   // casilla vacía: muy lejos
  return tq / sq;
}
// m: 0 cuerpo · 1 borde · 2 número · 3 ficha ✓ · 4 su símbolo · 5 ficha ✗ · 6 su símbolo
float tableroD(vec3 q, out float m, out vec3 lq) {
  m = 0.0; lq = q;
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f4(TAB.GR)}), vec3(${f4(TAB.HW)}, ${f4(TAB.HH)}, ${f4(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  int i = int(fi);
  vec3 c = q - vec3((fi - 2.5) * ${f4(TAB.PASO)}, 0.0, 0.0);
  // churro ocre alrededor del borde
  float br = churro(abs(sdRoundRect(q.xy, vec2(${f4(TAB.HW - 0.17)}, ${f4(TAB.HH - 0.17)}), 0.28)), q.z - 0.005, 0.05);
  if (br < d) m = 1.0;
  d = smin(d, br, 0.035);
  // hueco de la casilla
  float hw = sdRoundBox(c - vec3(0.0, ${f4(TAB.YW)}, 0.0), vec3(0.375, 0.375, 0.1), 0.12);
  d = smax(d, -hw, 0.05);
  // número de la casilla en churro azul tinta
  float dg = churro(digitos(q.xy), c.z - 0.006, 0.04);
  if (dg < d) m = 2.0;
  d = smin(d, dg, 0.022);
  float mf, kf, of;
  vec3 tq = fichaLocal(c, i, kf, of);
  float df = fichaD(tq, uCelda[i].x, mf) * kf + of;
  if (df < d) { m = 3.0 + mf + (uCelda[i].x > 1.5 ? 2.0 : 0.0); lq = tq + vec3(fi * 3.1, 0.0, 0.0); }
  return min(d, df);
}
float sdf_tablero(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float m; vec3 lq;
  return tableroD(q, m, lq) * uTC.w;
}
float sdfc_tablero(vec3 p) {
  vec3 q = uTM * (p - uTC.xyz);
  float d = sdRoundBox(q - vec3(0.0, 0.0, -${f4(TAB.GR)}), vec3(${f4(TAB.HW)}, ${f4(TAB.HH)}, ${f4(TAB.GR)}), 0.17);
  float fi = clamp(floor(q.x / ${f4(TAB.PASO)} + 3.0), 0.0, 5.0);
  vec3 c = q - vec3((fi - 2.5) * ${f4(TAB.PASO)}, 0.0, 0.0);
  float kf, of;
  vec3 tq = fichaLocal(c, int(fi), kf, of);
  d = max(d, -sdRoundBox(c - vec3(0.0, ${f4(TAB.YW)}, 0.0), vec3(0.385, 0.385, 0.11), 0.12));
  return fuera(2, min(d, fichaC(tq) * kf + of) * uTC.w);
}
void mat_tablero(vec3 p, inout Mat M) {
  vec3 q = uTM * (p - uTC.xyz);
  float m; vec3 lq;
  tableroD(q, m, lq);
  vec3 alb = C_SAND * (0.94 + 0.12 * vnoise(q * 1.7));
  if (m > 0.5) alb = C_OCHRE;
  if (m > 1.5) alb = C_INK;
  if (m > 2.5) alb = C_GREEN * (0.92 + 0.16 * vnoise(lq * 3.0));
  if (m > 3.5) alb = C_LIGHT;
  if (m > 4.5) alb = C_RED * (0.92 + 0.16 * vnoise(lq * 3.0));
  if (m > 5.5) alb = C_LIGHT;
  M.alb = alb; M.lp = lq * 0.75 + uTPrint; M.bs = 3.0; M.esc = uTC.w / 0.75; M.g = vec3(0.0);
  M.det = (m > 1.5 && m < 2.5) ? 0.6 : 1.0;
}
// el rayo cruza la caja orientada del tablero: tramo [ta, tb]
bool caja_tablero(vec3 ro, vec3 rd, out float ta, out float tb) {
  vec3 o = uTM * (ro - uTC.xyz), d = uTM * rd;
  vec3 inv = 1.0 / d;
  vec3 lo = vec3(-uTBox.x, -uTBox.y, uTBox.z), hi = vec3(uTBox.x, uTBox.y, uTBox.w);
  vec3 t0 = (lo - o) * inv, t1 = (hi - o) * inv;
  vec3 mn = min(t0, t1), mx = max(t0, t1);
  ta = max(max(mn.x, mn.y), mn.z); tb = min(min(mx.x, mx.y), mx.z);
  return tb > max(ta, 0.0);
}
`;

const GLSL_POLVO = /* glsl */`
uniform vec4 uPolvo[NPOLVO];
float sdf_polvo(vec3 p) {
  float d = 1e5;
  for (int i = 0; i < NPOLVO; i++) {
    vec4 s = uPolvo[i];
    d = smin(d, length(p - s.xyz) - s.w + (s.w > 0.001 ? 0.0 : 1e5), 0.05);
  }
  // grumos: bolitas irregulares
  return (d - 0.035 * (vnoise(p * 16.0 + uBoil) - 0.4)) * 0.75;
}
float sdfc_polvo(vec3 p) { return fuera(3, sdf_polvo(p) + 0.004); }
void mat_polvo(vec3 p, inout Mat M) { M.alb = C_DUST * (0.9 + 0.2 * vnoise(p * 9.0)); M.lp = p * 4.0; M.bs = 4.0; M.det = 0.7; M.esc = 0.25; M.g = vec3(0.0); }
`;

const GLSL_PIEZAS_COMUN = /* glsl */`
uniform vec4 uPC[NP];    // centro, factor de distancia (escala mínima)
uniform mat3 uPM[NP];    // mundo → local (incluye escala)
uniform vec4 uPT[NP];    // tipo, variante, color o puntos, —
uniform vec4 uPS[NP];    // huella xyz, —
`;
// funciones de una pieza concreta (índice fijo i o la variable uPieza)
function glslPieza(sufijo, idx, tipo, b) {
  const t = nombreTipo(tipo);
  return `
float sdf_${sufijo}(vec3 p) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz); float m;
  return pz_${t}(q, uPT[${idx}], m) * uPC[${idx}].w;
}
float sdfc_${sufijo}(vec3 p) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz);
  return fuera(${b}, pzc_${t}(q, uPT[${idx}]) * uPC[${idx}].w);
}
${TIPOS_PRUEBA[t]?.envolvente ? `float sdfa_${sufijo}(vec3 p) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz);
  return pza_${t}(q, uPT[${idx}]) * uPC[${idx}].w;
}` : ''}
void mat_${sufijo}(vec3 p, inout Mat M) {
  vec3 q = uPM[${idx}] * (p - uPC[${idx}].xyz); float m;
  pz_${t}(q, uPT[${idx}], m);
  gEm = vec3(0.0); gTr = 0.0; gBri = 1.0; gG = vec3(0.0);
  M.alb = pzcol_${t}(q, uPT[${idx}], m);
  // (copia de prueba) huellas a escala del mundo: una pieza grande no tiene huellas gigantes
  M.lp = q * uPC[${idx}].w * 0.8 + uPS[${idx}].xyz; M.bs = 5.0 + float(${idx}); M.det = 1.0; M.esc = 1.25;
  M.g = transpose(uPM[${idx}]) * gG * uPC[${idx}].w;
  M.em = gEm; M.tr = gTr; M.bri = gBri;
}
`;
}

// ---------- pasadas ----------
const GLSL_REVELAR = /* glsl */`
// (adulta) revelado de cine: algo menos de saturación, curva ACES (los blancos no queman), virado suave
// (sombras frías, luces cálidas); la viñeta y el grano van aparte (post), que en 2D repite crearPost()
float grano(vec2 fc, float f) { return vnoise(vec3(fc / 1.35, f * 3.7)) * 0.7 + hash13(vec3(fc, f + 0.5)) * 0.3 - 0.5; }
vec3 post(vec3 col, vec2 fc) {
  if (uPost < 0.5) return col;
  vec2 q = (fc * (1920.0 / uRes.x) - vec2(960.0, 540.0)) / 1080.0;
  col *= 1.0 - VIG_K * smoothstep(VIG_A, VIG_B, length(q));
  return col + grano(fc, uFrame) * GRANO_K * min(col, 1.0 - col);
}
vec3 revelar(vec3 col) {
  float l0 = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l0), col, 0.88);
  col = aces(col);
  col = pow(col, vec3(1.0 / 2.2));
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col *= mix(vec3(0.95, 0.985, 1.05), vec3(1.025, 1.0, 0.955), smoothstep(0.05, 0.7, lum));
  return post(col, gl_FragCoord.xy);
}
// tramo de un rayo de sombra que pasa por las esferas envolventes
bool rangoSombra(vec3 ro, vec3 rd, out float t0, out float t1) {
  t0 = 1e5; t1 = -1.0;
  for (int i = 0; i < NB; i++) {
    vec4 b = uB[i];
    vec3 oc = ro - b.xyz;
    float bb = dot(oc, rd), c = dot(oc, oc) - b.w * b.w;
    float h = bb * bb - c;
    bool ok = b.w > 0.0 && h > 0.0;
    h = sqrt(max(h, 0.0));
    float ta = -bb - h, tb = -bb + h;
#ifdef TABLERO
    if (i == 2) { float ca, cb; ok = b.w > 0.0 && caja_tablero(ro, rd, ca, cb); ta = ca; tb = cb; }
#endif
    ok = ok && tb > 0.0;
    t0 = ok ? min(t0, max(ta, 0.0)) : t0;
    t1 = ok ? max(t1, tb) : t1;
  }
  return t1 > 0.0;
}
float softShadow(vec3 p, vec3 L, float maxT, float k) {
  float t0, t1;
  rangoSombra(p, L, t0, t1);
  float t = max(t0, 0.04), res = 1.0, end = min(t1, maxT);
  for (int i = 0; i < SOMBRA_PASOS; i++) {
    if (t > end || res < 0.002) break;
    float h = mapC(p + L * t);
    res = min(res, k * h / t);
    t += clamp(h, 0.02, 0.45);
  }
  res = clamp(res, 0.0, 1.0);
  return res * res * (3.0 - 2.0 * res);
}
`;

const GLSL_PASO_SOMBRA = /* glsl */`
uniform float uSombraEsc, uTenue;
#ifdef TENUES
// sombra de las piezas pequeñas: se dibuja muy clara para que no parezca un agujero
float softShadowT(vec3 p, vec3 L, float maxT, float k) {
  float t0, t1;
  rangoSombra(p, L, t0, t1);
  float t = max(t0, 0.04), res = 1.0, end = min(t1, maxT);
  for (int i = 0; i < SOMBRA_PASOS; i++) {
    if (t > end || res < 0.002) break;
    float h = mapT(p + L * t);
    res = min(res, k * h / t);
    t += clamp(h, 0.02, 0.45);
  }
  res = clamp(res, 0.0, 1.0);
  return res * res * (3.0 - 2.0 * res);
}
#endif
float aoBg(vec3 p, vec3 n) {
  float o = 0.0;
  int nao = 0;
  for (int i = 0; i < NB; i++) nao = (uB[i].w > 0.0 && length(p - uB[i].xyz) < uB[i].w + 2.2) ? 4 : nao;
  for (int i = 1; i <= nao; i++) {
    float h = 0.35 * float(i) * float(i) * 0.5 + 0.1;
    float d = mapC(p + n * h);
    o += clamp((h - d) / h, 0.0, 1.0) * (1.0 / float(i));
  }
  return clamp(1.0 - 0.42 * o, 0.0, 1.0);
}
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy * uSombraEsc);
  vec3 nb; float arc;
  float tb = bgHit(ro, rd, nb, arc);
  vec3 p = ro + rd * tb;
  vec3 L = normalize(LPOS - p);
  float sh = softShadow(p + nb * 0.01, L, length(LPOS - p), 6.5);
#ifdef TENUES
  sh *= mix(1.0, softShadowT(p + nb * 0.01, L, length(LPOS - p), 8.0), uTenue);
#endif
  float ao = aoBg(p, nb);
  fragColor = vec4(sh, ao, 0.0, 1.0);
}
`;

const GLSL_PASO_FONDO = /* glsl */`
uniform sampler2D uBgD, uBgA, uSombra;
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec3 D = texelFetch(uBgD, px, 0).rgb; D = D * D * 4.0;
  vec3 A = texelFetch(uBgA, px, 0).rgb; A = A * A * 0.5;
  vec2 sa = texture(uSombra, gl_FragCoord.xy / uRes).rg;
  float key = 2.75 * uFlicker;
  vec3 col = (D * key * mix(0.05, 1.0, sa.x) + A * sa.y) * mix(0.45, 1.0, sa.y);
  fragColor = vec4(revelar(col), 1.0);
#ifdef DBG_SOMBRA
  fragColor = vec4(sa.x, sa.y, 0.0, 1.0);
#endif
}
`;

const GLSL_PASO_OBJETO = /* glsl */`
// huellas dactilares: remolinos de surcos en parches
vec4 fingerprint(vec3 x, float sc, float seed, float pixW) {
  vec3 y = x * sc + seed;
  vec3 c = floor(y);
  vec3 h = vec3(hash13(c), hash13(c + 17.1), hash13(c + 31.7));
  vec3 ctr = c + 0.32 + 0.36 * h;
  vec3 v = y - ctr;
  v.y *= 1.0 + 0.5 * h.x;
  float r = length(v);
  float m = (1.0 - smoothstep(0.1, 0.3, r)) * step(0.5, hash13(c + 5.3));
  float spacing = 0.042;
  float fade = 1.0 - smoothstep(0.35, 0.75, pixW * sc / spacing);
  float ph = r * 6.2832 / spacing + 2.5 * vnoise(y * 5.0);
  return vec4(m * fade * cos(ph) * (v / (r + 1e-4)) * 0.22, m * fade * (0.5 - 0.5 * sin(ph)));
}
vec3 normalObj(vec3 p) {
  vec3 n = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    vec3 e = 0.5773 * (2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0);
    n += e * SDF_OBJ(p + e * 0.0012);
  }
  return normalize(n);
}
float aoObj(vec3 p, vec3 n) {
  float o = 0.0, s = 1.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.02 + 0.11 * float(i);
    float d = min(mapC(p + n * h), bgSDF(p + n * h));
    o += (h - d) * s; s *= 0.7;
  }
  return clamp(1.0 - 2.0 * o, 0.0, 1.0);
}
vec3 shade(vec3 p, vec3 rd, float tObj, vec3 n, Mat M) {
  vec3 alb = M.alb, lp = M.lp;
  float bs = M.bs, det = M.det;
  float pixW = uPix * tObj / max(M.esc, 0.05);
  // (adulta) arcilla más fina: bultos suaves, huellas pequeñas y raras, marcas de espátula finas
  vec4 nd = vnoised(lp * 2.2 + bs * 11.0 + uBoil * 0.05);
  vec3 g = nd.yzw * 0.055;
  vec4 nm = vnoised(lp * 6.5 + bs * 5.0);
  g += nm.yzw * 0.03;
  vec4 f1 = fingerprint(lp, 1.5, bs * 3.7, pixW);
  vec4 f2 = fingerprint(lp + 0.31, 2.2, bs * 9.1 + 4.0, pixW);
  g += f1.xyz * 0.8 + f2.xyz * 0.5;
  vec3 cT = floor(lp * 1.3 + bs * 0.37);
  vec3 dT = normalize(vec3(hash13(cT + 1.1), hash13(cT + 4.4), hash13(cT + 8.8)) - 0.5);
  float mT = step(0.72, hash13(cT + 2.7)) * (1.0 - smoothstep(0.22, 0.48, length(fract(lp * 1.3 + bs * 0.37) - 0.5)));
  g += dT * cos(dot(lp, dT) * 140.0) * 0.05 * mT * (1.0 - smoothstep(0.008, 0.015, pixW));
  vec4 gr = vnoised(lp * 40.0 + bs);
  g += gr.yzw * 0.012 * (1.0 - smoothstep(0.012, 0.03, pixW));
  g = g * det + M.g;
  n = normalize(n - (g - n * dot(g, n)));
  alb *= 1.0 - (0.07 * f1.w + 0.05 * f2.w) * det - 0.035 * smoothstep(0.55, 0.85, gr.x);
  // polvo (motas claras) y fibras (hilillos oscuros) pegados a la arcilla
  float fdP = 1.0 - smoothstep(0.004, 0.012, pixW);
  vec3 cp = lp * 26.0 + bs;
  vec3 ip = floor(cp);
  float hp = hash13(ip + 3.3);
  float mota = (1.0 - smoothstep(0.1, 0.24, length(fract(cp) - 0.5))) * step(0.988, hp);
  alb = mix(alb, vec3(0.46, 0.43, 0.39), mota * 0.35 * fdP * det);
  vec3 cf = lp * 5.0 + bs * 0.7;
  vec3 iF = floor(cf), fF = fract(cf) - 0.5;
  vec3 dF = normalize(vec3(hash13(iF + 5.1), hash13(iF + 6.2), hash13(iF + 7.3)) - 0.5);
  float fib = length(cross(fF, dF)) + 0.06 * sin(dot(fF, dF) * 9.0);
  float mF = step(0.86, hash13(iF + 9.9)) * (1.0 - smoothstep(0.004, 0.012, fib)) * (1.0 - smoothstep(0.25, 0.4, abs(dot(fF, dF))));
  alb *= 1.0 - 0.45 * mF * fdP * det;

  vec3 L = normalize(LPOS - p);
  float sh = mix(0.03, 1.0, softShadow(p + n * 0.025, L, 30.0, 6.0));
  float ao = aoObj(p, n);
  float ndl = dot(n, L);
  float wrapD = max((ndl + 0.16) / 1.16, 0.0);
  // translucidez: la luz entra y sale rojiza junto al terminador (piel, núcleo de Atom, el Sol)
  vec3 sss = pow(alb, vec3(1.6)) * 1.5 * smoothstep(-0.45, 0.15, ndl) * (1.0 - smoothstep(0.15, 0.6, ndl)) * (0.3 + 0.9 * M.tr);
  vec3 V = -rd, Hh = normalize(L + V);
  float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);
  float nh = max(dot(n, Hh), 0.0);
  // arcilla mate (brillo ancho y débil, de cera); el latón y el alambre son metal: difuso oscuro y brillo
  // del color del metal
  float metal = smoothstep(2.0, 3.0, M.bri);
  float specD = (pow(nh, 12.0) * 0.03 + pow(nh, 56.0) * 0.035 * M.bri) * (0.7 + 0.8 * fres) * M.bri;
  float specM = pow(nh, 16.0) * 0.32 + pow(nh, 90.0) * 1.1;
  vec3 spec = mix(vec3(specD), (alb * 2.3 + 0.04) * specM, metal);
  float key = 2.75 * uFlicker * spotObj(p);
  vec3 col = (alb * wrapD * (1.0 - 0.55 * metal) + sss * 0.5) * LCOL * key * sh;
  col += spec * LCOL * key * sh * smoothstep(-0.1, 0.3, ndl);
  col += alb * metal * (0.12 + 0.35 * pow(max(reflect(rd, n).y, 0.0), 2.0)) * ao;
  col += alb * FILL_COL * pow(max(dot(n, normalize(FILL_DIR)) * 0.5 + 0.5, 0.0), 1.5) * FILL_OBJ * ao;
  float up = n.y * 0.5 + 0.5;
  col += alb * mix(vec3(0.03, 0.025, 0.025), vec3(0.06, 0.07, 0.10), up) * AMB_OBJ * ao;
  // contraluz frío que recorta la silueta (también a las piezas oscuras)
  float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0) * max(dot(n, normalize(RIM_DIR)) + 0.25, 0.0);
  col += RIM_COL * (alb * 0.85 + 0.05) * rim * 1.9 * ao;
  col *= mix(0.45, 1.0, ao);
  return col + M.em * 3.0;
}
bool esfera(vec3 ro, vec3 rd, vec4 b, out float ta, out float tb) {
  vec3 oc = ro - b.xyz;
  float bb = dot(oc, rd), c = dot(oc, oc) - b.w * b.w;
  float h = bb * bb - c;
  h = sqrt(max(h, 0.0));
  ta = -bb - h; tb = -bb + h;
  return bb * bb - c > 0.0 && tb > 0.0;
}
void main() {
  vec3 ro = uCamPos, rd = rayoEn(gl_FragCoord.xy);
  float t0, t1;
#ifdef OBJ_CAJA
  bool dentro = caja_tablero(ro, rd, t0, t1);
#else
  bool dentro = esfera(ro, rd, uB[OBJ_B], t0, t1);
#endif
  if (!dentro) discard;
  float t = max(t0, 0.0), tHit = -1.0, bestR = 1e5, bestT = t;
#ifdef SDFA_OBJ
  // fase 1: envolvente barata hasta quedar cerca de la arcilla
  for (int i = 0; i < RAYO_PASOS; i++) {
    float d = SDFA_OBJ(ro + rd * t);
    if (d < 4.0 * uPix * t || t > t1) break;
    t += d;
  }
  bestT = t;
#endif
  for (int i = 0; i < RAYO_PASOS2; i++) {
#ifdef SDFA_OBJ
    // (B ajustada) si la envolvente ya sacó el rayo de la esfera, no se paga ni un paso de la forma entera
    if (t > t1) break;
#endif
    vec3 p = ro + rd * t;
    float d = SDF_OBJ(p);
    if (d < 0.00022 * t) { tHit = t; break; }
    float r = d / (uPix * t);
    if (r < bestR) { bestR = r; bestT = t; }
    t += d * 0.92;
    if (t > t1) break;
  }
  float cov = tHit > 0.0 ? 1.0 : 1.0 - smoothstep(0.0, 0.75, bestR);
  if (cov < 0.004) discard;
  float ts = tHit > 0.0 ? tHit : bestT;
  vec3 p = ro + rd * ts;
  vec3 n = normalObj(p);
  Mat M;
  M.em = vec3(0.0); M.tr = 0.0; M.bri = 1.0;
  MAT_OBJ(p, M);
  fragColor = vec4(revelar(shade(p, rd, ts, n, M)), cov);
  gl_FragDepth = clamp(ts / 100.0, 0.0, 1.0);
}
`;

const VERT_PANTALLA = /* glsl */`
in vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
// (B ajustada) halo de Atom: resplandor ámbar suave detrás del núcleo y un velo oscuro muy leve, más ancho,
// que lo despega de los fondos claros. Sale premultiplicado (rgb ≤ alfa) para componer igual sobre el plató y
// sobre transparente (render(n, { fondo: false })).
const GLSL_HALO = /* glsl */`
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform vec4 uHalo;    // centro (px de diseño, y hacia abajo) · radio de las órbitas en pantalla (px) · energía
uniform vec4 uHaloK;   // fuerza del resplandor · fuerza del velo · —
void main() {
  vec2 P = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) * (1920.0 / uRes.x);
  float d = length(P - uHalo.xy) / max(uHalo.z, 1.0);
  float g = uHaloK.x * (0.8 + 0.45 * uHalo.w) * (0.40 * exp(-d * d / 0.28) + 0.15 * exp(-d * d / 1.5));
  float v = uHaloK.y * exp(-d * d / 2.4);
  g = min(g, 0.95);
  fragColor = vec4(vec3(1.0, 0.64, 0.31) * g, max(g, v));
}
`;
const VERT_RECT = /* glsl */`
in vec3 position;
uniform vec4 uRect;   // rectángulo en coordenadas de recorte: x0, y0, x1, y1
void main() { gl_Position = vec4(mix(uRect.xy, uRect.zw, position.xy * 0.5 + 0.5), 0.0, 1.0); }
`;

// núcleo: bolitas en racimo (posiciones fijas, sembradas) — las del demo
const NUC = (() => {
  const r = mulberry32(77), out = [];
  const N = 8;
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, rr = Math.sqrt(1 - y * y), ph = i * 2.39996 + 0.4;
    const k = 0.33 + 0.03 * r();
    out.push([Math.cos(ph) * rr * k, y * k * 0.92, Math.sin(ph) * rr * k]);
  }
  return out;
})();
const ORB = [0, 1, 2].map((i) => new THREE.Matrix4().makeRotationZ(i * Math.PI / 3 + 0.26).multiply(new THREE.Matrix4().makeRotationX(0.44)));
const VEL = [3, -3, 3], FASE = [0.3, 2.4, 4.4];

const rotXYZ = (rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ'));
const rotTab = ({ inclinacion = 0.6, giro = 0, roll = 0 }) => new THREE.Matrix4().makeRotationY(giro).multiply(new THREE.Matrix4().makeRotationX(-inclinacion)).multiply(new THREE.Matrix4().makeRotationZ(roll));

// ---------- (adulta) rótulos horneados con la fuente ----------
// distancia euclídea al cuadrado (Felzenszwalb y Huttenlocher), en una cuadrícula w x h (0 = rasgo)
function dt1(f, n, d, v, z) {
  let k = 0; v[0] = 0; z[0] = -1e20; z[1] = 1e20;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = 1e20;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
function edt(g, w, h) {
  const n = Math.max(w, h), f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = g[y * w + x]; dt1(f, h, d, v, z); for (let y = 0; y < h; y++) g[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = g[y * w + x]; dt1(f, w, d, v, z); for (let x = 0; x < w; x++) g[y * w + x] = d[x]; }
  return g;
}
let rotulosCache = null, atlasCache = null;
export async function cargarFuenteRotulos() {
  if (!document.querySelector('link[data-rotulos]')) {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FUENTE_ROTULOS.css; l.dataset.rotulos = '1';
    document.head.appendChild(l);
  }
  try {
    await Promise.race([document.fonts.load(`${FUENTE_ROTULOS.peso} 100px "${FUENTE_ROTULOS.familia}"`, '0123456789−m'), new Promise((r) => setTimeout(r, 8000))]);
  } catch (e) { /* fuente de reserva */ }
}
// la textura de distancias de los rótulos «10^e m» de siempre (una fila por exponente, de ROT.E_MIN0 a ROT.E_MAX0);
// (lote 0) los demás exponentes (de ROT.E_MIN a ROT.E_MAX) van en el atlas de hornearAtlasRotulos()
export async function hornearRotulos() {
  if (rotulosCache) return rotulosCache;
  await cargarFuenteRotulos();
  const { CW, CH, PXU, X0, Y1, KD, LMAX } = ROT;
  const E_MIN = ROT.E_MIN0, E_MAX = ROT.E_MAX0, N = ROT.N0;
  const c = document.createElement('canvas'); c.width = CW; c.height = CH;
  const g = c.getContext('2d', { willReadFrequently: true });
  const fuente = (px) => `${FUENTE_ROTULOS.peso} ${px}px "${FUENTE_ROTULOS.familia}", sans-serif`;
  g.font = fuente(100);
  const asc = g.measureText('10').actualBoundingBoxAscent;
  const ancho = (t, S) => { g.font = fuente(100); return g.measureText(t).width / 100 * S; };
  const txtE = (e) => (e < 0 ? '−' + (-e) : String(e));
  const maqueta = (e, HD) => {
    const S = HD * 100 / asc;
    const w10 = ancho('10', S);
    const xe = w10 + 0.035 * HD, we = ancho(txtE(e), 0.6 * S);
    const xm = xe + we + 0.13 * HD, wm = ancho('m', 0.8 * S);
    return { S, xe, xm, w: xm + wm };
  };
  let HD = 1;
  for (let e = E_MIN; e <= E_MAX; e++) HD = Math.min(HD, LMAX / maqueta(e, 1).w);
  ROT.HD = HD;
  const dentro = new Float64Array(CW * CH), fuera = new Float64Array(CW * CH);
  // una fila: dibuja el rótulo (estrechado en horizontal si pasa de LMAX) y guarda su distancia en datos
  const fila = (e, datos, ox, oy, anchoTex) => {
    const M = maqueta(e, HD);
    const k = M.w > LMAX ? LMAX / M.w : 1;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = '#000'; g.fillRect(0, 0, CW, CH);
    g.fillStyle = '#fff'; g.textBaseline = 'alphabetic';
    const X = (x) => (x * k - X0) * PXU, Y = (y) => (Y1 - y) * PXU;
    if (k < 1) g.setTransform(k, 0, 0, 1, 0, 0);
    const Xk = (x) => X(x) / k;
    g.font = fuente(M.S * PXU); g.fillText('10', Xk(0), Y(-0.5 * HD));
    g.font = fuente(0.6 * M.S * PXU); g.fillText(txtE(e), Xk(M.xe), Y(-0.04 * HD));
    g.font = fuente(0.8 * M.S * PXU); g.fillText('m', Xk(M.xm), Y(-0.5 * HD));
    g.setTransform(1, 0, 0, 1, 0, 0);
    const px = g.getImageData(0, 0, CW, CH).data;
    for (let i = 0; i < CW * CH; i++) { const a = px[i * 4] / 255; dentro[i] = a >= 0.5 ? 0 : 1e20; fuera[i] = a < 0.5 ? 0 : 1e20; }
    edt(dentro, CW, CH); edt(fuera, CW, CH);
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const i = y * CW + x, a = px[i * 4] / 255;
      let d = a >= 0.5 ? -(Math.sqrt(fuera[i]) - 0.5) : Math.sqrt(dentro[i]) - 0.5;
      if (a > 0.02 && a < 0.98) d = 0.5 - a;
      const v = Math.max(0, Math.min(255, Math.round((0.5 + d / PXU / (2 * KD)) * 255)));
      const o = ((oy + (CH - 1 - y)) * anchoTex + ox + x) * 4;
      datos[o] = datos[o + 1] = datos[o + 2] = v; datos[o + 3] = 255;
    }
  };
  const datos = new Uint8Array(CW * CH * N * 4);
  for (let e = E_MIN; e <= E_MAX; e++) fila(e, datos, 0, (e - E_MIN) * CH, CW);
  const tex = new THREE.DataTexture(datos, CW, CH * N, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.needsUpdate = true;
  rotulosCache = tex;
  // (lote 0) el atlas: ROT.COLS columnas de ROT.FILAS filas; la fila g = e − ROT.E_MIN va en la columna
  // floor(g / FILAS), fila g % FILAS (las de la textura de siempre se dejan en blanco: no se consultan aquí)
  const AW = CW * ROT.COLS, AH = CH * ROT.FILAS;
  const datosB = new Uint8Array(AW * AH * 4).fill(255);
  for (let e = ROT.E_MIN; e <= ROT.E_MAX; e++) {
    if (e >= E_MIN && e <= E_MAX) continue;
    const gi = e - ROT.E_MIN, col = Math.floor(gi / ROT.FILAS), fb = gi - col * ROT.FILAS;
    fila(e, datosB, col * CW, fb * CH, AW);
  }
  const texB = new THREE.DataTexture(datosB, AW, AH, THREE.RGBAFormat, THREE.UnsignedByteType);
  texB.minFilter = THREE.LinearFilter; texB.magFilter = THREE.LinearFilter; texB.generateMipmaps = false; texB.needsUpdate = true;
  atlasCache = texB;
  return tex;
}
/** (lote 0) el atlas con los rótulos de ROT.E_MIN a ROT.E_MAX que no están en la textura de siempre */
export async function hornearAtlasRotulos() { if (!atlasCache) await hornearRotulos(); return atlasCache; }

// ---------- (cartela) la placa de capítulo en arcilla ----------
// Una losa de plastilina modelada como el nogal de la regla, con un filete de latón en relieve y el número de
// ámbar en relieve encima (horneado con Jost en una textura de distancias, como los rótulos). Unidades locales:
// 1 unidad = CARTELA_ARCILLA.U px de diseño a la distancia de la placa, así que la losa mide 2 × 1,158 (los
// 760 × 440 px de la maqueta); su cara mira a +z (a la cámara).
// la textura de distancias del número (se rehace si cambia el texto; la fuente tiene que estar cargada)
function hornearCartela(texto, tex = null) {
  const { U, PXU, X0, Y0, AN, AL, KD } = CARTELA_ARCILLA;
  const CW = Math.round(AN * PXU), CH = Math.round(AL * PXU);
  const c = document.createElement('canvas'); c.width = CW; c.height = CH;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.fillStyle = '#000'; g.fillRect(0, 0, CW, CH);
  const L = maquetaCartela(g, texto);
  // px de diseño (centro de la placa en 0, y hacia abajo) → texel (fila 0 arriba = y local Y0 + AL)
  const s = PXU / U;
  g.setTransform(s, 0, 0, s, -X0 * PXU, (Y0 + AL) * PXU);
  g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillText(texto, L.dx, L.dy);
  const px = g.getImageData(0, 0, CW, CH).data;
  const dentro = new Float64Array(CW * CH), fuera = new Float64Array(CW * CH);
  for (let i = 0; i < CW * CH; i++) { const a = px[i * 4] / 255; dentro[i] = a >= 0.5 ? 0 : 1e20; fuera[i] = a < 0.5 ? 0 : 1e20; }
  edt(dentro, CW, CH); edt(fuera, CW, CH);
  const datos = tex ? tex.image.data : new Uint8Array(CW * CH * 4);
  for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
    const i = y * CW + x, a = px[i * 4] / 255;
    let d = a >= 0.5 ? -(Math.sqrt(fuera[i]) - 0.5) : Math.sqrt(dentro[i]) - 0.5;
    if (a > 0.02 && a < 0.98) d = 0.5 - a;
    const v = Math.max(0, Math.min(255, Math.round((0.5 + d / PXU / (2 * KD)) * 255)));
    const o = ((CH - 1 - y) * CW + x) * 4;
    datos[o] = datos[o + 1] = datos[o + 2] = v; datos[o + 3] = 255;
  }
  if (!tex) {
    tex = new THREE.DataTexture(datos, CW, CH, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false;
  }
  tex.needsUpdate = true;
  tex.userData.texto = texto;
  return tex;
}

// ---------- (adulta) viñeta y grano en 2D, idénticos a post() del sombreador ----------
// Para las escenas que componen fotos en un lienzo 2D (los decorados cacheados de prueba-plastilina-adulta):
// el plató se crea con { post: false } y, al final de cada fotograma, aplicar(g, n) oscurece los bordes y
// pone el grano del fotograma n (overlay: más grano en los medios tonos, casi nada en negros y blancos).
export const POST = { VIG_K: 0.42, VIG_A: 0.42, VIG_B: 1.12, GRANO_K: 0.17 };
// (B ajustada) luz del plató: telón más claro, charco del foco más ancho y más relleno (ver C_TELON)
export const LUZ_PLATO = { TELON_R: 0.029, TELON_G: 0.032, TELON_B: 0.042, SPOT_MIN: 0.05, SPOT_A: 0.86, SPOT_HALO: 0.07,
  SPOTOBJ_MIN: 0.72, FILL_FONDO: 0.30, FILL_OBJ: 0.68, AMB_OBJ: 0.8 };
export function crearPost() {
  const ssj = (a, b, x) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
  const vig = document.createElement('canvas'); vig.width = W; vig.height = H;
  {
    const gv = vig.getContext('2d'), im = gv.createImageData(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const k = POST.VIG_K * ssj(POST.VIG_A, POST.VIG_B, Math.hypot((x + 0.5 - 960) / 1080, (y + 0.5 - 540) / 1080));
      im.data[(y * W + x) * 4 + 3] = Math.round(k * 255);
    }
    gv.putImageData(im, 0, 0);
  }
  // cuatro losetas de grano (ruido de valor a 1,35 px + un poco de ruido blanco), con semilla
  const T = 512, losetas = [];
  for (let k = 0; k < 4; k++) {
    const r = mulberry32(9001 + k * 77), L = Math.ceil(T / 1.35) + 2, red = new Float32Array(L * L);
    for (let i = 0; i < L * L; i++) red[i] = r();
    const c = document.createElement('canvas'); c.width = c.height = T;
    const gc = c.getContext('2d'), im = gc.createImageData(T, T);
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const fx = x / 1.35, fy = y / 1.35, ix = Math.floor(fx), iy = Math.floor(fy);
      let u = fx - ix, v = fy - iy; u = u * u * (3 - 2 * u); v = v * v * (3 - 2 * v);
      const a = red[iy * L + ix], b = red[iy * L + ix + 1], cc = red[(iy + 1) * L + ix], d = red[(iy + 1) * L + ix + 1];
      const vn = a + (b - a) * u + (cc - a) * v + (a - b - cc + d) * u * v;
      const gr = vn * 0.7 + r() * 0.3 - 0.5;
      const val = Math.round((0.5 + gr * POST.GRANO_K / 2) * 255);
      const o = (y * T + x) * 4; im.data[o] = im.data[o + 1] = im.data[o + 2] = val; im.data[o + 3] = 255;
    }
    gc.putImageData(im, 0, 0);
    losetas.push(c);
  }
  return {
    aplicar(g, n) {
      g.save();
      g.globalCompositeOperation = 'source-over';
      g.drawImage(vig, 0, 0, W, H);
      g.globalCompositeOperation = 'overlay';
      const t = losetas[((n % 4) + 4) % 4];
      const ox = -Math.floor(azar(n, 91) * T), oy = -Math.floor(azar(n, 92) * T);
      for (let y = oy; y < H; y += T) for (let x = ox; x < W; x += T) g.drawImage(t, x, y);
      g.restore();
    },
  };
}

// ---------- (lote 0) la persona con posturas: el esqueleto (JS) ----------
// Unidades locales de la pieza (las de «persona»): suela en y = −1, coronilla en y = 0,765, H = 1,765. Los tramos
// son los de HUMANO.md y no cambian en ninguna postura: brazo 0,18 H, antebrazo 0,14 H, mano 0,10 H, pie 0,15 H.
export const HUMANO = {
  H: 1.765, CORONILLA: 0.765, SUELO: -1, NJ: 46,
  PELVIS: [0, -0.09, 0], TORSO: [0, -0.06, 0], CUELLO: [0, 0.45, -0.01],
  HOMBRO: [0.175, 0.375, -0.01], CADERA: [0.083, -0.13, 0],
  BRAZO: 0.18 * 1.765, ANTEBRAZO: 0.14 * 1.765, MANO: 0.10 * 1.765, MUSLO: 0.395, PIERNA: 0.405, TOBILLO: 0.07, PIE: 0.15 * 1.765,
};
// formas de la mano
export const MANO = { abierta: 0, indice: 1, puno: 2, agarre: 2 };
// la postura de pie (todas las demás parten de ella). Ángulos en radianes:
//   cabeza [giro (+ hacia su izquierda, +x), inclina (+ mira abajo), ladea] · torso [inclina (+ adelante), giro, ladea]
//   ojos (1 abiertos · 0 cerrados) · mirada [x, y] (−1…1: pupilas a su izquierda/derecha, arriba/abajo)
//   brazoIzq / brazoDer [flex (+ adelante y arriba), abd (+ hacia fuera), rot (+ hacia dentro: el antebrazo doblado
//     va hacia el pecho), codo (0 recto, + doblado), prona (+ la palma hacia abajo con el antebrazo adelante),
//     muneca (+ hacia la palma)] · manoIzq / manoDer: 0 abierta · 1 señala con el índice · 2 puño o agarre
//   piernaIzq / piernaDer [flex (+ el muslo adelante), abd, rodilla (+ doblada), tobillo (+ la punta arriba)]
//   apoyo: 1 → la pelvis sube o baja para que el pie más bajo pise el suelo (sentada, se baja sola)
//   apuntarIzq / apuntarDer: [x, y, z] punto (unidades locales de la persona) al que señala ese brazo: se calculan
//     flex y abd para que el antebrazo apunte allí (con el codo y la rotación de la postura)
//   fantasma (0…1): las manos se vuelven pálidas y frías, con motas y luz propia (casi transparentes: ep3-vacio)
const POSTURA_BASE = {
  cabeza: [0, 0, 0], torso: [0, 0, 0], ojos: 1, mirada: [0, 0],
  brazoIzq: [0.03, 0.06, 0, 0.12, 0, 0.05], manoIzq: 0, brazoDer: [0.03, 0.06, 0, 0.12, 0, 0.05], manoDer: 0,
  piernaIzq: [0, 0, 0, 0], piernaDer: [0, 0, 0, 0], apoyo: 1, fantasma: 0,
};
export const POSTURAS = {
  depie: {},
  // sostener un objeto delante, con las dos manos a la altura del pecho (las manos, en P.pieza(...).punto('manoIzq'))
  sostener: { cabeza: [0, 0.14, 0], mirada: [0, -0.5], brazoIzq: [0.36, 0.1, 0.32, 1.42, 0.25, 0.05], manoIzq: 2,
    brazoDer: [0.36, 0.1, 0.32, 1.42, 0.25, 0.05], manoDer: 2 },
  // señalar con la derecha (adelante, arriba y a su derecha); el codo, doblado y por encima de la cintura
  senalar: { cabeza: [-0.22, -0.1, 0], torso: [0, -0.08, 0], mirada: [-0.5, 0.3], brazoDer: [0.8, 0.5, 0.1, 0.85, 1.2, -0.1], manoDer: 1 },
  // saludar con la derecha: el codo a la altura del hombro, el antebrazo hacia arriba y la palma a cámara; el
  // vaivén lo pone postura('saludar', t)
  saludar: { cabeza: [-0.06, -0.04, 0.05], brazoDer: [0.18, 1.3, -1.45, 1.75, 0.0, 0.0], manoDer: 0 },
  // sentada en una silla (asiento a la altura de las rodillas: P.pieza(...).punto('asiento')), manos en los muslos
  sentada: { torso: [0.04, 0, 0], piernaIzq: [1.5, 0.08, 1.5, 0], piernaDer: [1.5, 0.08, 1.5, 0],
    brazoIzq: [0.2, 0.05, 0.3, 1.05, 1.2, 0.25], brazoDer: [0.2, 0.05, 0.3, 1.05, 1.2, 0.25] },
  // brazos cruzados (el izquierdo por encima)
  cruzados: { cabeza: [0, 0.03, 0], brazoIzq: [0.42, 0.06, 1.38, 1.95, 0.0, 0.1], manoIzq: 2, brazoDer: [0.5, 0.06, 1.3, 1.95, 0.0, 0.1], manoDer: 2 },
  // mirarse las manos: las dos delante del pecho, las palmas hacia la cara, la cabeza baja
  manos: { cabeza: [0, 0.5, 0], mirada: [0, -1], brazoIzq: [0.62, 0.14, 0.38, 1.6, -1.25, -0.25], brazoDer: [0.62, 0.14, 0.38, 1.6, -1.25, -0.25] },
  // de perfil con los ojos cerrados (la cara un poco hacia arriba, al sol): gira la pieza (rot [0, ±π/2, 0])
  perfil: { cabeza: [0, -0.28, 0], ojos: 0 },
  // mirar arriba
  arriba: { cabeza: [0, -0.55, 0], mirada: [0, 1] },
};
const SIN_TILDES = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
const ALIAS_POSTURA = { depie: 'depie', pie: 'depie', sostener: 'sostener', sostiene: 'sostener', senalar: 'senalar', senala: 'senalar',
  saludar: 'saludar', saluda: 'saludar', sentada: 'sentada', sentado: 'sentada', sentarse: 'sentada', cruzados: 'cruzados',
  brazoscruzados: 'cruzados', manos: 'manos', mirarselasmanos: 'manos', miralasmanos: 'manos', perfil: 'perfil',
  perfilojoscerrados: 'perfil', arriba: 'arriba', mirararriba: 'arriba' };
const copiaP = (p) => JSON.parse(JSON.stringify(p));
/**
 * La postura completa (todas las claves de POSTURA_BASE) de un nombre de POSTURAS (con o sin tildes: 'señalar',
 * 'de pie', 'brazos cruzados', 'sentada'…) o de un objeto parcial (lo que falte, de pie). Con t (segundos), la que
 * se mueve sola: 'saludar' hace el vaivén de la mano (1,6 por segundo).
 */
export function postura(p = 'depie', t = null) {
  let o = p;
  if (typeof p === 'string') {
    const k = ALIAS_POSTURA[SIN_TILDES(p)];
    if (!k) throw new Error(`postura: no conozco «${p}» (hay ${Object.keys(POSTURAS).join(', ')})`);
    o = { ...POSTURAS[k], _nombre: k };
  }
  const r = { ...copiaP(POSTURA_BASE), ...copiaP(o) };
  if (typeof p === 'string' && r._nombre === 'saludar' && t !== null) {
    const f = Math.sin(2 * Math.PI * 1.6 * t);
    r.brazoDer[2] += 0.34 * f; r.brazoDer[3] += 0.08 * Math.sin(2 * Math.PI * 1.6 * t + 1.2);
  }
  return r;
}
const mezN = (a, b, u) => a + (b - a) * u;
const mezA = (a, b, u) => a.map((v, i) => mezN(v, b[i], u));
/** mezcla dos posturas (nombres u objetos): u = 0 → a, 1 → b. Los ángulos se interpolan uno a uno. */
export function mezclarPosturas(a, b, u, t = null) {
  const A = postura(a, t), B = postura(b, t);
  const r = {};
  for (const k of Object.keys(POSTURA_BASE)) r[k] = Array.isArray(A[k]) ? mezA(A[k], B[k], u) : mezN(A[k], B[k], u);
  for (const k of ['apuntarIzq', 'apuntarDer']) {
    if (A[k] && B[k]) r[k] = mezA(A[k], B[k], u);
    else if (A[k] || B[k]) { r[k] = A[k] ?? B[k]; r[k + 'Peso'] = A[k] ? 1 - u : u; }
  }
  return r;
}
/**
 * Postura en el instante t a partir de claves [[t0, postura0], [t1, postura1], …] (nombres u objetos): en cada
 * clave ti la postura ya está completa; el paso desde la anterior dura `trans` s (termina en ti) y es suave.
 */
export function posturaEn(t, claves, { trans = 0.5 } = {}) {
  if (!claves.length) return postura('depie', t);
  let i = 0;
  while (i + 1 < claves.length && t >= claves[i + 1][0] - trans) i++;
  const [ti, pi] = claves[i];
  if (i > 0 && t < ti) return mezclarPosturas(claves[i - 1][1], pi, eio(cl((t - (ti - trans)) / trans)), t);
  return postura(pi, t);
}
// aspectos (variantes): cuerpo 'adulto' | 'nino' · pelo 'corto' | 'melena' | 'mono' · jersey, pantalon (nombre o
// [r, g, b] lineal) · piel ('media' | 'clara' | 'oscura' o un factor) · colorPelo [r, g, b] · barba, canas (0…1)
export const COLORES_ROPA = {
  jersey: { gris: [0.250, 0.240, 0.220], oliva: [0.150, 0.160, 0.080], ocre: [0.330, 0.215, 0.080], pizarra: [0.105, 0.130, 0.160],
    crema: [0.440, 0.395, 0.300], arcilla: [0.300, 0.150, 0.095] },
  pantalon: { caqui: [0.120, 0.100, 0.068], gris: [0.110, 0.110, 0.110], azul: [0.050, 0.065, 0.100], marron: [0.110, 0.070, 0.045] },
  piel: { media: 1.0, clara: 1.12, morena: 0.82, oscura: 0.58 },
};
export const ASPECTOS = {
  adulto: { cuerpo: 'adulto', pelo: 'corto', jersey: 'gris', pantalon: 'caqui', piel: 'media', colorPelo: [0.080, 0.052, 0.034], barba: 1, canas: 1 },
  nino: { cuerpo: 'nino', pelo: 'corto', jersey: 'ocre', pantalon: 'azul', colorPelo: [0.105, 0.068, 0.040], barba: 0, canas: 0 },
  melena: { pelo: 'melena', jersey: 'oliva', pantalon: 'gris', colorPelo: [0.125, 0.075, 0.042], barba: 0, canas: 0 },
  mono: { pelo: 'mono', jersey: 'pizarra', pantalon: 'marron', piel: 'morena', colorPelo: [0.045, 0.032, 0.024], barba: 0, canas: 0 },
};
// proporciones del cuerpo: escala del torso, la cabeza y la pelvis, largo de piernas y brazos, grosor, pie y mano
const CUERPOS = {
  adulto: { kt: [1, 1, 1], kh: 1, kp: [1, 1, 1], kl: 1, ka: 1, kr: 1, kf: 1, km: 1 },
  // niño de unos 7 años: cabeza de 1/4,7 de la altura y piernas de 0,45 H; mide 1,685 (el adulto, 1,765): con la
  // misma escala de pieza, un 95 %; para un niño de 1,2 m junto a un adulto de 1,75 m, escala × 0,72
  nino: { kt: [0.88, 0.86, 0.9], kh: 1.2, kp: [0.88, 0.86, 0.9], kl: 0.93, ka: 0.9, kr: 0.88, kf: 0.85, km: 0.88 },
};
export function aspecto(a = 'adulto') {
  const o = typeof a === 'string' ? { ...(ASPECTOS[SIN_TILDES(a)] ?? (() => { throw new Error(`aspecto: no conozco «${a}»`); })()) } : { ...a };
  const r = { ...ASPECTOS.adulto, ...o };
  const col = (v, tabla) => (Array.isArray(v) ? v : tabla[SIN_TILDES(v)] ?? tabla[Object.keys(tabla)[0]]);
  return {
    cuerpo: CUERPOS[SIN_TILDES(r.cuerpo)] ?? CUERPOS.adulto,
    // pelo: { largo, mono, mechon } (0…1 cada uno; se pueden mezclar)
    pelo: typeof r.pelo === 'object' ? { largo: 0, mono: 0, mechon: 0, ...r.pelo }
      : ({ corto: { largo: 0, mono: 0, mechon: 1 }, melena: { largo: 1, mono: 0, mechon: 0 }, mono: { largo: 0, mono: 1, mechon: 0 } }[SIN_TILDES(r.pelo)] ?? { largo: 0, mono: 0, mechon: 1 }),
    jersey: col(r.jersey, COLORES_ROPA.jersey), pantalon: col(r.pantalon, COLORES_ROPA.pantalon),
    piel: typeof r.piel === 'number' ? r.piel : COLORES_ROPA.piel[SIN_TILDES(r.piel)] ?? 1,
    colorPelo: r.colorPelo, barba: r.barba ?? 0, canas: r.canas ?? 0,
  };
}
const _M = () => new THREE.Matrix4();
const RX = (a) => _M().makeRotationX(a), RY = (a) => _M().makeRotationY(a), RZ = (a) => _M().makeRotationZ(a);
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const ROTv = (v, M) => v.clone().transformDirection(M).multiplyScalar(v.length());
// el brazo del lado s (+1 izquierda, −1 derecha) con la rotación del torso Rt y el hombro en S
function brazoFK(s, br, Rt, S, C) {
  const [flex, abd, rot, codo, prona, mun] = br;
  const Ra = Rt.clone().multiply(RZ(s * abd)).multiply(RX(-flex)).multiply(RY(-s * rot));
  const E = S.clone().add(ROTv(V3(0, -HUMANO.BRAZO * C.ka, 0), Ra));
  const Rf = Ra.clone().multiply(RX(-codo));
  const W = E.clone().add(ROTv(V3(0, -HUMANO.ANTEBRAZO * C.ka, 0), Rf));
  const Rh = Rf.clone().multiply(RY(-s * prona)).multiply(RZ(-s * mun));
  const u = V3(0, -1, 0).transformDirection(Rh), v = V3(0, 0, 1).transformDirection(Rh), w = V3(s, 0, 0).transformDirection(Rh);
  return { S, E, W, u, v, w, dedos: W.clone().addScaledVector(u, HUMANO.MANO * C.km) };
}
// apuntar: flex y abd para que el antebrazo (con el codo y la rotación dados) apunte al punto P (local)
function apuntarBrazo(s, br, Rt, S, C, P) {
  const b = br.slice();
  const [, , rot, codo] = b;
  const w = V3(0, -1, 0).applyMatrix4(RX(-codo)).applyMatrix4(RY(-rot));   // el antebrazo en el marco del brazo (lado +1)
  const RtI = Rt.clone().invert();
  for (let it = 0; it < 4; it++) {
    const E = brazoFK(s, b, Rt, S, C).E;
    const d = P.clone().sub(E).normalize().transformDirection(RtI);
    d.x *= s;
    const R = Math.hypot(d.x, d.y), al = Math.atan2(d.y, d.x), ac = Math.acos(cl(w.x / Math.max(R, 1e-6), -1, 1));
    let mejor = null;
    for (const a of [al + ac, al - ac]) {
      const ca = Math.cos(-a), sa = Math.sin(-a);
      const u = V3(d.x * ca - d.y * sa, d.x * sa + d.y * ca, d.z);
      const f = -(Math.atan2(u.z, u.y) - Math.atan2(w.z, w.y));
      const an = Math.atan2(Math.sin(a), Math.cos(a)), fn = Math.atan2(Math.sin(f), Math.cos(f));
      const c = { abd: an, flex: fn };
      const e = brazoFK(s, [fn, an, rot, codo, b[4], b[5]], Rt, S, C).E;
      c.coste = (an < -0.4 || an > 2.4 ? 10 : 0) + (fn < -0.8 ? 10 : 0) - e.y;
      if (!mejor || c.coste < mejor.coste) mejor = c;
    }
    b[0] = mejor.flex; b[1] = mejor.abd;
  }
  return b;
}
function piernaFK(s, pi, Hc, C) {
  const [flex, abd, rod, tob] = pi;
  const Rl = RZ(s * abd).multiply(RX(-flex));
  const K = Hc.clone().add(ROTv(V3(0, -HUMANO.MUSLO * C.kl, 0), Rl));
  const A = K.clone().add(ROTv(V3(0, -HUMANO.PIERNA * C.kl, 0), Rl.clone().multiply(RX(rod))));
  return { H: Hc, K, A, fz: V3(0, Math.sin(tob), Math.cos(tob)) };
}
/**
 * El esqueleto de una postura y un aspecto, en unidades locales de la pieza: { datos (Float32Array de HUMANO.NJ
 * vec4 para uHum), puntos: { cabeza, ojos, cuello, hombroIzq, codoIzq, munecaIzq, manoIzq (centro de la palma),
 * dedosIzq (punta), …Der, caderaIzq, rodillaIzq, tobilloIzq, pieIzq (punta), …Der, pelvis, asiento (bajo las
 * nalgas), regazo (sobre los muslos) }, coronilla (y), esfera: [x, y, z, r] envolvente }
 */
export function esqueletoHumano(p = 'depie', a = 'adulto', t = null) {
  const P = postura(p, t);
  const A = a && typeof a.cuerpo === 'object' && Array.isArray(a.jersey) ? a : aspecto(a);
  const C = A.cuerpo;
  const P0 = V3(...HUMANO.PELVIS), T0 = V3(...HUMANO.TORSO), N0 = V3(...HUMANO.CUELLO);
  const kp = V3(...C.kp), kt = V3(...C.kt);
  const Mp0 = _M().makeTranslation(P0.x, P0.y, P0.z).multiply(_M().makeScale(kp.x, kp.y, kp.z)).multiply(_M().makeTranslation(-P0.x, -P0.y, -P0.z));
  // piernas sin desplazar la raíz, para saber cuánto baja o sube la pelvis
  const pies = [1, -1].map((s) => piernaFK(s, s > 0 ? P.piernaIzq : P.piernaDer, V3(s * HUMANO.CADERA[0], HUMANO.CADERA[1], HUMANO.CADERA[2]).applyMatrix4(Mp0), C));
  const raiz = V3(0, 0, 0);
  if (P.apoyo > 0) raiz.y = P.apoyo * ((HUMANO.SUELO + HUMANO.TOBILLO * C.kf) - Math.min(pies[0].A.y, pies[1].A.y));
  for (const q of pies) for (const k of ['H', 'K', 'A']) q[k].add(raiz);
  const Mp = _M().makeTranslation(raiz.x, raiz.y, raiz.z).multiply(Mp0);
  const Rt = RY(P.torso[1]).multiply(RX(P.torso[0])).multiply(RZ(P.torso[2]));
  const Mt = _M().makeTranslation(raiz.x + T0.x, raiz.y + T0.y, raiz.z + T0.z).multiply(Rt).multiply(_M().makeScale(kt.x, kt.y, kt.z)).multiply(_M().makeTranslation(-T0.x, -T0.y, -T0.z));
  const cuello = N0.clone().applyMatrix4(Mt);
  const Rh = Rt.clone().multiply(RY(P.cabeza[0])).multiply(RX(P.cabeza[1])).multiply(RZ(P.cabeza[2]));
  const Mh = _M().makeTranslation(cuello.x, cuello.y, cuello.z).multiply(Rh).multiply(_M().makeScale(C.kh, C.kh, C.kh)).multiply(_M().makeTranslation(-N0.x, -N0.y, -N0.z));
  const brazos = [1, -1].map((s) => {
    const S = V3(s * HUMANO.HOMBRO[0], HUMANO.HOMBRO[1], HUMANO.HOMBRO[2]).applyMatrix4(Mt);
    let br = s > 0 ? P.brazoIzq : P.brazoDer;
    const ap = s > 0 ? P.apuntarIzq : P.apuntarDer;
    if (ap) {
      const b2 = apuntarBrazo(s, br, Rt, S, C, V3(...ap));
      const pe = P[(s > 0 ? 'apuntarIzq' : 'apuntarDer') + 'Peso'] ?? 1;
      br = br.map((v, i) => mezN(v, b2[i], pe));
    }
    return brazoFK(s, br, Rt, S, C);
  });
  const manos = [P.manoIzq, P.manoDer];
  // datos para el sombreador
  const D = new Float32Array(HUMANO.NJ * 4);
  const fila = (k, M) => { const I = M.clone().invert().elements; for (let r = 0; r < 3; r++) D.set([I[r], I[r + 4], I[r + 8], I[r + 12]], (k + r) * 4); };
  fila(0, Mt); fila(3, Mh); fila(6, Mp);
  brazos.forEach((B, i) => {
    const k = 9 + 6 * i;
    D.set([B.S.x, B.S.y, B.S.z, 0], k * 4); D.set([B.E.x, B.E.y, B.E.z, 0], (k + 1) * 4); D.set([B.W.x, B.W.y, B.W.z, 0], (k + 2) * 4);
    // la forma de la mano (0 abierta · 1 índice · 2 puño): lo doblados que están el índice y los otros tres dedos
    const f = cl(manos[i], 0, 2), ci = 0.06 + 0.94 * cl(f - 1), cf = 0.12 + 0.88 * cl(f);
    const dir = (c) => [Math.cos(c * Math.PI / 2), Math.sin(c * Math.PI / 2), Math.cos(c * Math.PI), Math.sin(c * Math.PI)];
    D.set([B.u.x, B.u.y, B.u.z, f], (k + 3) * 4); D.set([B.v.x, B.v.y, B.v.z, C.km], (k + 4) * 4); D.set([B.w.x, B.w.y, B.w.z, cl(f)], (k + 5) * 4);
    D.set(dir(ci), (35 + 2 * i) * 4); D.set(dir(cf), (36 + 2 * i) * 4);
  });
  pies.forEach((L, i) => {
    const k = 21 + 4 * i;
    D.set([L.H.x, L.H.y, L.H.z, 0], k * 4); D.set([L.K.x, L.K.y, L.K.z, 0], (k + 1) * 4); D.set([L.A.x, L.A.y, L.A.z, 0], (k + 2) * 4);
    D.set([L.fz.x, L.fz.y, L.fz.z, C.kf], (k + 3) * 4);
  });
  D.set([P.ojos, P.mirada[0], P.mirada[1], A.pelo.largo], 29 * 4);
  D.set([A.pelo.mono, A.pelo.mechon, cl(P.fantasma ?? 0), 0], 34 * 4);
  D.set([...A.jersey, A.barba], 30 * 4);
  D.set([...A.pantalon, A.piel], 31 * 4);
  D.set([...A.colorPelo, A.canas], 32 * 4);
  D.set([Math.min(kt.x, kt.y, kt.z), C.kh, Math.min(kp.x, kp.y, kp.z), C.kr], 33 * 4);
  // envolvente y forma de sombra, ya en coordenadas locales (el sombreador no cambia de marco en ellas)
  const ktm = Math.min(kt.x, kt.y, kt.z), kpm = Math.min(kp.x, kp.y, kp.z);
  const enL = (v, M) => V3(...v).applyMatrix4(M);
  const put = (k, v, w) => D.set([v.x, v.y, v.z, w], k * 4);
  put(39, enL([0, -0.04, 0], Mt), 0.215 * Math.max(kt.x, kt.y, kt.z)); put(40, enL([0, 0.4, -0.01], Mt), 0);
  put(41, enL([0, 0.615, -0.01], Mh), 0.21 * C.kh); put(42, enL([0, -0.09, 0], Mp), 0.19 * Math.max(kp.x, kp.y, kp.z));
  put(43, enL([0, 0.02, 0.004], Mt), 0.085 * ktm); put(44, enL([0, 0.3, 0.0], Mt), 0); put(45, enL([0, 0.6, 0], Mh), 0.1 * C.kh);
  void kpm;
  // puntos con nombre (locales)
  const pt = (v) => [v.x, v.y, v.z];
  const ptos = {
    cabeza: pt(V3(0, 0.61, 0.0).applyMatrix4(Mh)), ojos: pt(V3(0, 0.611, 0.11).applyMatrix4(Mh)), coronilla: pt(V3(0, 0.765, -0.01).applyMatrix4(Mh)),
    barbilla: pt(V3(0, 0.468, 0.07).applyMatrix4(Mh)), cuello: pt(cuello), pelvis: pt(V3(0, -0.09, 0).applyMatrix4(Mp)), pecho: pt(V3(0, 0.25, 0.1).applyMatrix4(Mt)),
  };
  ['Izq', 'Der'].forEach((L, i) => {
    const B = brazos[i];
    ptos['hombro' + L] = pt(B.S); ptos['codo' + L] = pt(B.E); ptos['muneca' + L] = pt(B.W); ptos['dedos' + L] = pt(B.dedos);
    ptos['mano' + L] = pt(B.W.clone().addScaledVector(B.u, 0.06 * C.km).addScaledVector(B.w, -0.03 * C.km));
    const G = pies[i];
    ptos['cadera' + L] = pt(G.H); ptos['rodilla' + L] = pt(G.K); ptos['tobillo' + L] = pt(G.A);
    ptos['pie' + L] = pt(G.A.clone().addScaledVector(G.fz, 0.19 * C.kf).add(V3(0, -0.03 * C.kf, 0)));
  });
  const yc = Math.min(pies[0].H.y, pies[1].H.y);
  ptos.asiento = [0, yc - 0.075 * C.kp[1], (pies[0].H.z + pies[1].H.z) / 2 - 0.02];
  ptos.regazo = [0, Math.max(pies[0].K.y, pies[0].H.y) + 0.07 * C.kr, (pies[0].H.z + pies[0].K.z) / 2 + 0.05];
  // caja envolvente (la de los puntos más el grosor de cada parte) y su esfera
  const todos = Object.values(ptos);
  const mn = [0, 1, 2].map((k) => Math.min(...todos.map((v) => v[k]))), mx = [0, 1, 2].map((k) => Math.max(...todos.map((v) => v[k])));
  const mg = 0.17 * Math.max(1, C.kh);
  const caja = [mn.map((v) => v - mg), mx.map((v) => v + mg)];
  const c = mn.map((v, k) => (v + mx[k]) / 2);
  let r = 0;
  for (const v of todos) r = Math.max(r, Math.hypot(v[0] - c[0], v[1] - c[1], v[2] - c[2]));
  r += 0.2 * Math.max(1, C.kh);
  return { datos: D, puntos: ptos, coronilla: ptos.coronilla[1], esfera: [...c, r], caja, postura: P, aspecto: A };
}

// ---------- el plató ----------
export async function crearPlato({
  camara = {}, atomo = true, globo = false, tablero = false, polvo = 0, piezas = [], sombras = {},
  sombraFondo = null, sombraTenue = 0.3, mano = false,
  semilla = 20261019, pasosRayo = 90, pasosSombra = 28, sombraEsc = 3, alfa = false,
  // tiposExtra: { nombre: { radio, glifos, glsl } } tipos de pieza de otra escena (como los de TIPOS_PRUEBA)
  // uniformes: { uNombre: { value } } uniformes que usa su GLSL (se comparten con todos los programas)
  tiposExtra = {}, uniformes = {},
  // (adulta) post: viñeta y grano en el sombreador (true) o después, en 2D, con crearPost() (false)
  post = true,
  // (cartela) cartela: el número de la cartela de capítulo (E.cartela), o true si se elige después. Añade la
  // placa como la última pieza (los índices de las demás no cambian) y carga la fuente; ver cartela()
  cartela = null,
} = {}) {
  const iCartela = cartela ? piezas.length : -1;
  if (cartela) piezas = [...piezas, 'cartela'];
  let texCartela = null;
  if (cartela) { await cargarFuenteCartela(); texCartela = hornearCartela(typeof cartela === 'string' ? cartela : '0'); }
  for (const [k, v] of Object.entries(tiposExtra)) {
    TIPOS_PRUEBA[k] = v; RADIO_TIPO[k] = v.radio;
    GLSL_TIPOS[k] = GLSL_PRUEBA_COMUN + (v.etiqueta ? GLSL_ETIQA : '') + v.glsl;
  }
  const texRotulos = piezas.some((t) => t === 'reglaA' || t === 'etiqueta' || TIPOS_PRUEBA[t]?.etiqueta) ? await hornearRotulos() : null;
  const texAtlas = texRotulos ? await hornearAtlasRotulos() : null;
  const busqueda = new URLSearchParams(location.search);
  const captura = busqueda.has('captura');
  const NP = piezas.length;
  // (lote 0) cada persona con posturas («humano») tiene su hueco de HUMANO.NJ vec4 en uHum
  const slotHum = {};
  piezas.forEach((t, i) => { if (t === 'humano') slotHum[i] = Object.keys(slotHum).length; });
  const NHUM = Object.keys(slotHum).length;

  // lienzo 16:9 con bandas si la ventana tiene otra proporción
  const estilo = document.createElement('style');
  estilo.textContent = `html,body{margin:0;height:100%;background:#0c0f1d;overflow:hidden}
#escena{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#151a30;overflow:hidden}
#escena canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}`;
  document.head.appendChild(estilo);
  const cont = document.createElement('div'); cont.id = 'escena';
  const lienzo = document.createElement('canvas');
  cont.appendChild(lienzo); document.body.appendChild(cont);

  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: false, preserveDrawingBuffer: true, alpha: alfa, depth: true });
  renderer.setClearColor(0x151a30, 1);
  renderer.autoClear = false;
  const gl = renderer.getContext();

  // cámara
  const cam = {
    pos: new THREE.Vector3(...(camara.pos ?? [0, 3.6, 15])),
    mira: new THREE.Vector3(...(camara.mira ?? [0, 2.0, 0])),
    tanY: Math.tan(((camara.fov ?? 28) / 2) * Math.PI / 180),
  };
  const f = cam.mira.clone().sub(cam.pos).normalize();
  const r = new THREE.Vector3().crossVectors(f, new THREE.Vector3(0, 1, 0)).normalize();
  const u = new THREE.Vector3().crossVectors(r, f);
  const b = f.clone().negate();
  const camRot = new THREE.Matrix3().set(r.x, u.x, b.x, r.y, u.y, b.y, r.z, u.z, b.z);
  const ASP = W / H;
  // píxel (1920x1080) de un punto del mundo; null si queda detrás de la cámara
  const proyectar = ([x, y, z]) => {
    const v = new THREE.Vector3(x, y, z).sub(cam.pos);
    const zc = v.dot(f);
    if (zc < 0.2) return null;
    return [(v.dot(r) / zc / (cam.tanY * ASP) + 1) / 2 * W, (1 - v.dot(u) / zc / cam.tanY) / 2 * H];
  };
  // punto del mundo en el píxel (sx, sy) a la profundidad del plano z = z0
  const punto = (sx, sy, z0 = 0) => {
    const nx = (sx / W) * 2 - 1, ny = 1 - (sy / H) * 2;
    const d = new THREE.Vector3().addScaledVector(r, nx * cam.tanY * ASP).addScaledVector(u, ny * cam.tanY).add(f).normalize();
    const t = (z0 - cam.pos.z) / d.z;
    return [cam.pos.x + d.x * t, cam.pos.y + d.y * t, z0];
  };

  const NSTARS = 28;
  const ESTR = estrellas(semilla, NSTARS);
  const caps = TIERRA.map(([la, lo, a]) => {
    const LA = la * Math.PI / 180, LO = lo * Math.PI / 180;
    return new THREE.Vector4(Math.cos(LA) * Math.sin(LO), Math.sin(LA), Math.cos(LA) * Math.cos(LO), Math.cos(a * Math.PI / 180));
  });
  const NB = 4 + NP;

  // ---------- objetos y sus programas ----------
  // id → { b: índice de esfera envolvente, sdf, sdfc, mat }
  const objetos = [];
  if (atomo) objetos.push({ id: 'atomo', b: 0 });
  if (globo) objetos.push({ id: 'globo', b: 1 });
  if (tablero) objetos.push({ id: 'tablero', b: 2, caja: true });
  if (polvo) objetos.push({ id: 'polvo', b: 3 });
  piezas.forEach((tipo, i) => objetos.push({ id: `p${i}`, b: 4 + i, tipo }));
  const tiposUsados = [...new Set(piezas)];
  const glifos = new Set(['✓', '✗']);
  for (const t of tiposUsados) if (t.startsWith('glifo:')) glifos.add(t.slice(6));
  for (const t of tiposUsados) for (const c of (TIPOS_PRUEBA[t]?.glifos ?? [])) glifos.add(c);
  let decl = GLSL_FORMAS + [...glifos].map(glslGlifo).join('') + GLSL_FICHA;
  if (atomo) decl += (mano ? '#define ATOMO_MANO 1\n' : '') + GLSL_ATOMO;
  if (globo) decl += GLSL_GLOBO;
  if (tablero) decl += GLSL_TABLERO;
  if (polvo) decl += GLSL_POLVO;
  if (NP) {
    decl += GLSL_PIEZAS_COMUN;
    for (const t of tiposUsados) decl += t.startsWith('glifo:') ? glslTipoGlifo(t.slice(6)) : GLSL_TIPOS[t];
    piezas.forEach((t, i) => { decl += glslPieza(`p${i}`, i, t, 4 + i); });
  }
  const mapC = (ids) => `float mapC(vec3 p) {\n  float d = 1e5;\n${ids.map((id) => `  d = min(d, sdfc_${id}(p));\n`).join('')}  return d;\n}\n`;
  const todos = objetos.map((o) => o.id);
  const defines = { NB, NP: Math.max(NP, 1), NPOLVO: Math.max(polvo, 1), NSTARS, NCAPS: caps.length, RAYO_PASOS: pasosRayo, SOMBRA_PASOS: pasosSombra };
  if (NHUM) { defines.NHUM = NHUM * HUMANO.NJ; defines.HU_NJ = HUMANO.NJ; }
  for (const [k, v] of Object.entries(POST)) defines[k] = v.toFixed(4);
  for (const [k, v] of Object.entries(LUZ_PLATO)) defines[k] = v.toFixed(4);
  // depuración: ?dbg=NOMBRE,OTRO añade esos #define
  for (const k of (busqueda.get('dbg') ?? '').split(',').filter(Boolean)) defines[k] = 1;

  const comunes = {
    uRes: { value: new THREE.Vector2(W, H) },
    uCamPos: { value: cam.pos.clone() }, uCamRot: { value: camRot },
    uTanY: { value: cam.tanY }, uAsp: { value: ASP }, uPix: { value: 2 * cam.tanY / H },
    uPost: { value: post ? 1 : 0 },
  };
  const tipoRT = renderer.extensions.has('EXT_color_buffer_float') ? THREE.HalfFloatType : THREE.UnsignedByteType;
  const rtOpts = { type: tipoRT, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
  const rtD = new THREE.WebGLRenderTarget(W, H, rtOpts), rtA = new THREE.WebGLRenderTarget(W, H, rtOpts), rtT = new THREE.WebGLRenderTarget(W, H, rtOpts);
  const rtSOpts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
  const rtS = new THREE.WebGLRenderTarget(Math.ceil(W / sombraEsc), Math.ceil(H / sombraEsc), rtSOpts);
  const rtS2 = new THREE.WebGLRenderTarget(Math.ceil(W / sombraEsc), Math.ceil(H / sombraEsc), rtSOpts);

  const v4 = (n) => Array.from({ length: n }, () => new THREE.Vector4());
  const m3 = (n) => Array.from({ length: n }, () => new THREE.Matrix3());
  const U = {
    ...comunes,
    uFrame: { value: 0 }, uFlicker: { value: 1 }, uLump: { value: 0.008 }, uBoil: { value: new THREE.Vector3() },
    uB: { value: v4(NB) }, uBgD: { value: rtD.texture }, uBgA: { value: rtA.texture }, uSombra: { value: rtS.texture },
    uSombraEsc: { value: sombraEsc }, uTenue: { value: sombraTenue },
    uCen: { value: new THREE.Vector3() }, uSq: { value: new THREE.Vector3(1, 1, 1) }, uAEsc: { value: 1 },
    uYaw: { value: new THREE.Matrix3() }, uNuc: { value: v4(8) },
    uRingM: { value: m3(3) }, uRing: { value: new THREE.Vector2(1.68, 0.092) }, uElec: { value: v4(3) }, uBrazo: { value: new THREE.Vector3() }, uAPrint: { value: new THREE.Vector3() },
    uMano: { value: new THREE.Vector4() }, uManoEje: { value: new THREE.Vector3(0, 1, 0) },
    uGC: { value: new THREE.Vector4() }, uGM: { value: new THREE.Matrix3() }, uCaps: { value: caps }, uGPrint: { value: new THREE.Vector3() },
    uTC: { value: new THREE.Vector4() }, uTM: { value: new THREE.Matrix3() }, uTBox: { value: new THREE.Vector4() },
    uCelda: { value: v4(6) }, uCelda2: { value: Array.from({ length: 6 }, () => new THREE.Vector4(1, 0, 0, 0)) }, uTPrint: { value: new THREE.Vector3() }, uDigitos: { value: null },
    uPolvo: { value: v4(Math.max(polvo, 1)) },
    uEtiqA: { value: texRotulos }, uReglaA: { value: new THREE.Vector4(0, 1.5, 0.3, 0) }, uAEn: { value: 0 },
    // (lote 0) atlas de rótulos, regla entera y resaltado (ver reglaA y P.regla)
    uEtiqB: { value: texAtlas }, uReglaB: { value: new THREE.Vector4(0.75, 0, 0, REGLA.LUPA_ENTERA) }, uReglaC: { value: new THREE.Vector4(0, 0, 0, 0) },
    uPC: { value: v4(Math.max(NP, 1)) }, uPM: { value: m3(Math.max(NP, 1)) }, uPT: { value: v4(Math.max(NP, 1)) }, uPS: { value: v4(Math.max(NP, 1)) },
    uHum: { value: v4(Math.max(NHUM, 1) * HUMANO.NJ) },
    uCartela: { value: texCartela }, uCartelaK: { value: new THREE.Vector4(CARTELA_ARCILLA.X0, CARTELA_ARCILLA.Y0, CARTELA_ARCILLA.AN, CARTELA_ARCILLA.AL) },
    ...uniformes,
  };
  const quad = new THREE.PlaneGeometry(2, 2);
  const camOrto = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const crearPaso = (frag, { vert = VERT_PANTALLA, uniforms = U, extraDefs = {}, mezcla = false } = {}) => {
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3, defines: { ...defines, ...extraDefs }, uniforms, vertexShader: vert, fragmentShader: frag,
      depthTest: mezcla, depthWrite: mezcla, transparent: mezcla,
      blending: mezcla ? THREE.CustomBlending : THREE.NoBlending,
      blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    const s = new THREE.Scene(); const me = new THREE.Mesh(quad, mat); me.frustumCulled = false; s.add(me);
    return { mat, escena: s };
  };

  const hornoU = { ...comunes, uStars: { value: ESTR.map((s) => new THREE.Vector4(...s)) }, uSalida: { value: 0 } };
  const pasoHorno = crearPaso(GLSL_COMUN + GLSL_HORNO, { uniforms: hornoU });
  const desU = { ...comunes, uTex: { value: null }, uDir: { value: new THREE.Vector2(1, 0) },
    uFoco: { value: camara.foco ?? cam.pos.distanceTo(cam.mira) }, uK: { value: camara.desenfoque ?? 40 } };
  const pasoDes = crearPaso(GLSL_COMUN + GLSL_DESENFOQUE, { uniforms: desU });
  // sombra sobre el ciclorama: las piezas de sombraFondo, enteras; las demás, muy claras (sombraTenue)
  // (cartela) la placa de la cartela solo deja una sombra tenue en el ciclorama (salvo que sombraFondo la nombre)
  const fuertes = (sombraFondo ?? todos.filter((id) => id !== `p${iCartela}`)).filter((id) => todos.includes(id) && id !== 'polvo');
  const tenues = todos.filter((id) => !fuertes.includes(id) && id !== 'polvo');
  const mapT = tenues.length ? mapC(tenues).replace('float mapC(', 'float mapT(') : '';
  const pasoSombra = crearPaso(GLSL_COMUN + decl + mapC(fuertes) + mapT + GLSL_REVELAR + GLSL_PASO_SOMBRA,
    { extraDefs: tenues.length ? { TENUES: 1 } : {} });
  // suavizado de la sombra a baja resolución (3 tomas por eje)
  const suaU = { uTex: { value: null }, uDir: { value: new THREE.Vector2() }, uTam: { value: new THREE.Vector2() } };
  const pasoSuave = crearPaso(`precision highp float;\nout vec4 fragColor;\nuniform sampler2D uTex;\nuniform vec2 uDir, uTam;
void main() { vec2 uv = gl_FragCoord.xy / uTam, d = uDir / uTam;
  fragColor = 0.25 * texture(uTex, uv - d) + 0.5 * texture(uTex, uv) + 0.25 * texture(uTex, uv + d); }`, { uniforms: suaU });
  const pasoFondo = crearPaso(GLSL_COMUN + decl + mapC(todos) + GLSL_REVELAR + GLSL_PASO_FONDO);
  for (const o of objetos) {
    const lanzan = [o.id, ...(sombras[o.id] ?? [])].filter((id) => todos.includes(id));
    o.uRect = { value: new THREE.Vector4(-1, -1, 1, 1) };
    o.paso = crearPaso(GLSL_COMUN + decl + mapC(lanzan) + GLSL_REVELAR + GLSL_PASO_OBJETO, {
      vert: VERT_RECT, uniforms: { ...U, uRect: o.uRect }, mezcla: true,
      extraDefs: {
        SDF_OBJ: `sdf_${o.id}`, MAT_OBJ: `mat_${o.id}`, OBJ_B: o.b, ...(o.caja ? { OBJ_CAJA: 1 } : {}),
        ...(o.id === 'atomo' ? { SDFA_OBJ: 'sdfa_atomo', RAYO_PASOS2: 48 } : { RAYO_PASOS2: pasosRayo }),
        // (B ajustada) las piezas cuyo tipo trae envolvente (pza_<tipo>) marchan primero con ella
        ...(o.tipo && TIPOS_PRUEBA[nombreTipo(o.tipo)]?.envolvente ? { SDFA_OBJ: `sdfa_${o.id}` } : {}),
      },
    });
  }

  const px = new Uint8Array(4);
  const sincronizar = () => gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);

  if (tablero) {
    const rtDig = new THREE.WebGLRenderTarget(2048, 224, { type: tipoRT, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false });
    const pd = crearPaso(GLSL_HORNO_DIGITOS('123456'.split('').map(glslGlifo).join('')), { uniforms: { uTam: { value: new THREE.Vector2(2048, 224) } } });
    renderer.setRenderTarget(rtDig);
    renderer.render(pd.escena, camOrto);
    renderer.setRenderTarget(null);
    U.uDigitos.value = rtDig.texture;
  }

  function hornear() {
    for (const [rt, s] of [[rtD, 0], [rtA, 1]]) {
      hornoU.uSalida.value = s;
      renderer.setRenderTarget(rt);
      renderer.render(pasoHorno.escena, camOrto);
      // profundidad de campo: desenfoque separable con radio según la distancia al foco
      for (const [de, a, dir] of [[rt, rtT, [1, 0]], [rtT, rt, [0, 1]]]) {
        desU.uTex.value = de.texture; desU.uDir.value.set(...dir);
        renderer.setRenderTarget(a);
        renderer.render(pasoDes.escena, camOrto);
      }
    }
    renderer.setRenderTarget(null);
    sincronizar();
  }

  // tamaño: en captura, 1920x1080 exactos; en la vista previa, a menos resolución
  const grueso = matchMedia('(pointer: coarse)').matches;
  function ajustar() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    const cw = Math.max(1, Math.round(W * s)), ch = Math.max(1, Math.round(H * s));
    cont.style.width = cw + 'px'; cont.style.height = ch + 'px';
    const maxAncho = captura ? W : grueso ? 640 : 960;
    renderer.setPixelRatio(captura ? W / cw : Math.min(window.devicePixelRatio || 1, maxAncho / cw));
    renderer.setSize(cw, ch, false);
    const bsz = new THREE.Vector2(); renderer.getDrawingBufferSize(bsz);
    comunes.uRes.value.copy(bsz);
    comunes.uPix.value = 2 * cam.tanY / bsz.y;
    rtD.setSize(bsz.x, bsz.y); rtA.setSize(bsz.x, bsz.y); rtT.setSize(bsz.x, bsz.y);
    rtS.setSize(Math.ceil(bsz.x / sombraEsc), Math.ceil(bsz.y / sombraEsc));
    rtS2.setSize(Math.ceil(bsz.x / sombraEsc), Math.ceil(bsz.y / sombraEsc));
    hornear();
  }
  ajustar();

  // ---------- estado de cada fotograma ----------
  const B = U.uB.value;
  let haloOn = false;
  const cajas = {};   // id → esquinas (mundo) del volumen envolvente, para su rectángulo de pantalla
  const cubo = (c, rr) => { const out = []; for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) out.push([c[0] + sx * rr, c[1] + sy * rr, c[2] + sz * rr]); return out; };
  function limpiar() {
    haloOn = false;
    for (const v of B) v.set(0, 0, 0, 0);
    for (const k in cajas) delete cajas[k];
  }
  limpiar();
  let nActual = 0;
  // (B ajustada) halo de Atom (ver GLSL_HALO)
  const haloU = { uRes: comunes.uRes, uHalo: { value: new THREE.Vector4() }, uHaloK: { value: new THREE.Vector4(1, 0.1, 0, 0) }, uRect: { value: new THREE.Vector4() } };
  const pasoHalo = (() => {
    const mat = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3, uniforms: haloU, vertexShader: VERT_RECT, fragmentShader: GLSL_HALO,
      depthTest: false, depthWrite: false, transparent: true, blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    const s = new THREE.Scene(); const me = new THREE.Mesh(quad, mat); me.frustumCulled = false; s.add(me);
    return { mat, escena: s };
  })();
  const huella = (on, k) => (on ? [(azar(nActual, k) - 0.5) * 0.3, (azar(nActual, k + 1) - 0.5) * 0.3, (azar(nActual, k + 2) - 0.5) * 0.3] : [0, 0, 0]);

  // El átomo narrador: núcleo de bolitas, tres órbitas de churro inclinadas y tres electrones.
  //   pos, escala, yaw/pitch/roll (giro del cuerpo), sq [x,y,z] (aplastar en ejes del mundo),
  //   energia (0..1: late al hablar), ts (segundos: avanzan los electrones), electrones: [[x,y,z] |
  //   { pos: [x,y,z], mezcla: 0..1 } | { mundo: [dx,dy,dz], mezcla } | null] (posición local, o
  //   desplazamiento en el mundo desde el centro, de un electrón que sale de su órbita; brazo: 0..1,
  //   un churro de grosor `grosor` lo une al núcleo; mano: 0..1, el electrón se convierte en una mano
  //   de tamaño `tamMano`, si el plató se creó con { mano: true }), toque.
  //   (B ajustada) halo: fuerza del resplandor ámbar detrás del núcleo (0: sin halo) · velo: fuerza del velo
  //   oscuro que lo despega de fondos claros.
  function ponerAtomo({ pos = [0, 2, 0], escala = 1, yaw = -0.1, pitch = 0.05, roll = 0, sq = [1, 1, 1], energia = 0, ts = 0, electrones = [], toque = false, orbita = 1, halo = 1, velo = 0.1 } = {}) {
    if (!atomo) return;
    U.uCen.value.set(...pos); U.uAEsc.value = escala; U.uSq.value.set(...sq);
    const R = rotXYZ(pitch, yaw, roll);
    U.uYaw.value.setFromMatrix4(R.clone().transpose());
    const e = cl(energia);
    const ns = 1 + 0.15 * e, nr = 0.29 * (1 + 0.15 * e);
    NUC.forEach((p, i) => {
      const j = 0.006;
      U.uNuc.value[i].set(p[0] * ns + (azar(nActual, 10 + i) - 0.5) * j, p[1] * ns + (azar(nActual, 20 + i) - 0.5) * j, p[2] * ns + (azar(nActual, 30 + i) - 0.5) * j, nr);
    });
    // (adulta) órbitas de alambre fino (sin bajar de ~1,3 px de grosor cuando Atom se ve pequeño)
    // (B ajustada) alambre algo más grueso y nunca por debajo de ~2,4 px de radio: Atom se lee en el móvil
    const Rr = 1.68 * orbita * (1 + 0.025 * e), tube = Math.max(0.05, 0.016 / Math.max(escala, 1e-3));
    U.uAEn.value = e;
    U.uRing.value.set(Rr, tube);
    const ms = Math.max(...sq) * escala;
    // volumen envolvente: el cuerpo y cada electrón (que puede salir lejos, con brazo o mano)
    let bc = new THREE.Vector3(...pos), br = (Rr + tube * 1.15 + 0.03) * ms;
    const envolver = (c2, r2) => {
      const dd = c2.distanceTo(bc);
      if (dd + r2 <= br) return;
      if (dd + br <= r2) { bc = c2.clone(); br = r2; return; }
      const nr = (dd + br + r2) / 2;
      bc.add(c2.clone().sub(bc).multiplyScalar((nr - br) / dd)); br = nr;
    };
    U.uMano.value.set(0, 0, 0, 0);
    ORB.forEach((M, i) => {
      U.uRingM.value[i].setFromMatrix4(M.clone().transpose());
      const th = 2 * Math.PI * VEL[i] * ts / 10 + FASE[i];
      let v = new THREE.Vector3(Rr * Math.cos(th), 0, Rr * Math.sin(th)).applyMatrix4(M);
      const el = electrones[i];
      U.uBrazo.value.setComponent(i, el && !Array.isArray(el) ? (el.grosor ?? 0.06) * cl(el.brazo ?? 0) : 0);
      if (Array.isArray(el)) v = new THREE.Vector3(...el);
      else if (el && el.pos) v.lerp(new THREE.Vector3(...el.pos), cl(el.mezcla ?? 1));
      else if (el && el.mundo) {
        // desplazamiento en el mundo desde el centro del átomo → coordenadas locales
        const w = new THREE.Vector3(el.mundo[0] / (sq[0] * escala), el.mundo[1] / (sq[1] * escala), el.mundo[2] / (sq[2] * escala)).applyMatrix4(R.clone().transpose());
        v.lerp(w, cl(el.mezcla ?? 1));
      }
      // un electrón con «mano» se convierte en una mano de plastilina
      const km = el && !Array.isArray(el) ? cl(el.mano ?? 0) : 0;
      let re = 0.21 + U.uBrazo.value.getComponent(i);
      if (km > 0.001 && mano) {
        const tam = (el.tamMano ?? 0.3) * km;
        U.uMano.value.set(v.x, v.y, v.z, tam);
        U.uManoEje.value.copy(v.clone().normalize());
        re = Math.max(re, 1.8 * tam);
      }
      U.uElec.value[i].set(v.x, v.y, v.z, 0.145 * (1 - km) + 0.002);
      const vw = v.clone().applyMatrix4(R).multiply(new THREE.Vector3(...sq)).multiplyScalar(escala).add(new THREE.Vector3(...pos));
      envolver(vw, re * ms);
    });
    U.uAPrint.value.set(...huella(toque, 40));
    // halo: centro y radio de las órbitas en pantalla
    const pc = proyectar(pos);
    haloOn = !!pc && (halo > 0.001 || velo > 0.001);
    if (haloOn) {
      const Rw = Rr * escala * Math.max(...sq);
      const pr = proyectar([pos[0] + r.x * Rw, pos[1] + r.y * Rw, pos[2] + r.z * Rw]);
      const Rpx = pr ? Math.hypot(pr[0] - pc[0], pr[1] - pc[1]) : 50;
      haloU.uHalo.value.set(pc[0], pc[1], Rpx, e);
      haloU.uHaloK.value.set(halo, velo, 0, 0);
      const k = 1.9 * Rpx;
      const x0 = Math.max(0, pc[0] - k), x1 = Math.min(W, pc[0] + k), y0 = Math.max(0, pc[1] - k), y1 = Math.min(H, pc[1] + k);
      if (x1 <= x0 || y1 <= y0) haloOn = false;
      else haloU.uRect.value.set(x0 / W * 2 - 1, 1 - y1 / H * 2, x1 / W * 2 - 1, 1 - y0 / H * 2);
    }
    const rr = br + 0.03;
    B[0].set(bc.x, bc.y, bc.z, rr);
    cajas.atomo = cubo([bc.x, bc.y, bc.z], rr);
  }

  // El globo de plastilina: océano, continentes pegados y el ecuador como tira dorada.
  function ponerGlobo({ pos = [0, 2, 0], radio = 1.4, inclinacion = 0.41, giro = 0, toque = false } = {}) {
    if (!globo) return;
    const R = new THREE.Matrix4().makeRotationZ(-inclinacion).multiply(new THREE.Matrix4().makeRotationY(giro));
    U.uGM.value.setFromMatrix4(R.clone().transpose());
    U.uGC.value.set(pos[0], pos[1], pos[2], radio);
    U.uGPrint.value.set(...huella(toque, 50));
    const rr = radio * 1.075 + 0.03;
    B[1].set(pos[0], pos[1], pos[2], rr);
    cajas.globo = cubo(pos, rr);
  }

  // El marcador: losa de arena con borde de churro ocre, seis números (1–6) y seis huecos.
  //   celdas[i] = { tipo: 0|1|2|'✓'|'✗', alto (elevación sobre el hueco), aplastar (+ aplasta,
  //   − estira), giro, escala, dx, dy }. inclinacion: hacia atrás (radianes); sq: aplastar el tablero.
  function ponerTablero({ pos = [0, 1.5, 0], escala = 0.8, inclinacion = 0.6, giro = 0, roll = 0, celdas = [], toque = false, sq = [1, 1, 1] } = {}) {
    if (!tablero) return;
    const Rm = rotTab({ inclinacion, giro, roll });
    const M = Rm.clone().transpose();
    M.premultiply(new THREE.Matrix4().makeScale(1 / (sq[0] * escala), 1 / (sq[1] * escala), 1 / (sq[2] * escala)));
    U.uTM.value.setFromMatrix4(M);
    U.uTC.value.set(pos[0], pos[1], pos[2], escala * Math.min(...sq));
    let alto = 0, dy = 0;
    for (let i = 0; i < 6; i++) {
      const c = celdas[i] ?? {};
      const tipo = typeof c.tipo === 'string' ? veredictoATipo(c.tipo) : (c.tipo ?? 0);
      U.uCelda.value[i].set((c.escala ?? 1) > 0.01 ? tipo : 0, c.alto ?? 0, c.aplastar ?? 0, c.giro ?? 0);
      U.uCelda2.value[i].set(c.escala ?? 1, c.dx ?? 0, c.dy ?? 0, 0);
      if (tipo) { alto = Math.max(alto, (c.alto ?? 0) + 0.12 * Math.abs(c.aplastar ?? 0)); dy = Math.max(dy, Math.abs(c.dy ?? 0) + 0.2 * Math.max(0, -(c.aplastar ?? 0))); }
    }
    const bx = TAB.HW + 0.06, by = TAB.HH + 0.06 + dy, z0 = -2 * TAB.GR - 0.06, z1 = 0.3 + alto;
    U.uTBox.value.set(bx, by, z0, z1);
    U.uTPrint.value.set(...huella(toque, 60));
    const esq = [];
    const Ms = Rm.clone().multiply(new THREE.Matrix4().makeScale(sq[0] * escala, sq[1] * escala, sq[2] * escala));
    for (const x of [-bx, bx]) for (const y of [-by, by]) for (const z of [z0, z1]) {
      const v = new THREE.Vector3(x, y, z).applyMatrix4(Ms);
      esq.push([pos[0] + v.x, pos[1] + v.y, pos[2] + v.z]);
    }
    cajas.tablero = esq;
    const cz = (z0 + z1) / 2, cv = new THREE.Vector3(0, 0, cz).applyMatrix4(Ms);
    B[2].set(pos[0] + cv.x, pos[1] + cv.y, pos[2] + cv.z, escala * Math.max(...sq) * Math.hypot(bx, by, (z1 - z0) / 2) + 0.03);
  }

  // Polvo del golpe: bolitas [x, y, z, radio].
  function ponerPolvo(lista = []) {
    if (!polvo) return;
    const v = U.uPolvo.value;
    const box = new THREE.Box3();
    let rmax = 0, hay = false;
    for (let i = 0; i < polvo; i++) {
      const s = lista[i];
      if (s && s[3] > 0.002) { v[i].set(...s); box.expandByPoint(new THREE.Vector3(s[0], s[1], s[2])); rmax = Math.max(rmax, s[3]); hay = true; }
      else v[i].set(0, 0, 0, 0);
    }
    if (!hay) { B[3].set(0, 0, 0, 0); return; }
    const c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3());
    const rr = s.length() / 2 + rmax + 0.05;
    B[3].set(c.x, c.y, c.z, rr);
    cajas.polvo = cubo([c.x, c.y, c.z], rr);
  }

  // Piezas sueltas (su tipo se fija al crear el plató).
  //   { pos, escala, sq [x,y,z] (en ejes de la pieza), rot [x,y,z] (euler YXZ),
  //     variante (ficha: '✓'|'✗'|1|2), color (glifo: COLOR.*), puntos (bocadillo: 0..3), toque,
  //     huellaFija [x,y,z] (desplaza las huellas dactilares de la pieza, para elegir dónde caen) }
  //   (lote 0) «humano»: { postura (nombre de POSTURAS u objeto; ver postura, mezclarPosturas, posturaEn), aspecto
  //     (nombre de ASPECTOS u objeto), t (segundos: el vaivén de 'saludar') }; devuelve { puntos (mundo), local,
  //     punto(nombre) } con las articulaciones, las manos, el asiento… (ver esqueletoHumano)
  const rigs = {};
  function ponerPieza(i, { pos = [0, 0, 0], escala = 1, sq = [1, 1, 1], rot = [0, 0, 0], variante = 0, color = 0, puntos = 0, toque = false, huellaFija = null,
    postura: pose = 'depie', aspecto: asp = 'adulto', t = null } = {}) {
    if (i >= NP) throw new Error(`pieza ${i}: el plató solo tiene ${NP}`);
    if (escala <= 0.005) { B[4 + i].set(0, 0, 0, 0); return; }
    const tipo = piezas[i];
    if (tipo === 'humano') return ponerHumano(i, { pos, escala, sq, rot, toque, huellaFija, pose, asp, t });
    const R = rotXYZ(...rot);
    const S = sq.map((v) => v * escala);
    const M = R.clone().transpose().premultiply(new THREE.Matrix4().makeScale(1 / S[0], 1 / S[1], 1 / S[2]));
    U.uPM.value[i].setFromMatrix4(M);
    U.uPC.value[i].set(pos[0], pos[1], pos[2], Math.min(...S));
    const v = typeof variante === 'string' ? veredictoATipo(variante) : variante;
    U.uPT.value[i].set(0, v, tipo === 'bocadillo' ? puntos : color, 0);
    const hu = huella(toque, 70 + i * 3);
    if (huellaFija) for (let k = 0; k < 3; k++) hu[k] += huellaFija[k];
    U.uPS.value[i].set(...hu, 0);
    const rr = RADIO_TIPO[tipo.startsWith('glifo') ? 'glifo' : tipo] * Math.max(...S) + 0.03;
    B[4 + i].set(pos[0], pos[1], pos[2], rr);
    cajas[`p${i}`] = cubo(pos, rr);
  }

  // (lote 0) la persona con posturas: su esqueleto va a uHum y su esfera envolvente se ajusta a la postura
  function ponerHumano(i, { pos, escala, sq, rot, toque, huellaFija, pose, asp, t }) {
    const k = slotHum[i];
    const R = esqueletoHumano(pose, asp, t);
    const uh = U.uHum.value;
    for (let j = 0; j < HUMANO.NJ; j++) uh[k * HUMANO.NJ + j].fromArray(R.datos, j * 4);
    const Rm = rotXYZ(...rot);
    const S = sq.map((v) => v * escala);
    const M = Rm.clone().transpose().premultiply(new THREE.Matrix4().makeScale(1 / S[0], 1 / S[1], 1 / S[2]));
    U.uPM.value[i].setFromMatrix4(M);
    U.uPC.value[i].set(pos[0], pos[1], pos[2], Math.min(...S));
    U.uPT.value[i].set(0, 0, 0, k);
    const hu = huella(toque, 70 + i * 3);
    if (huellaFija) for (let j = 0; j < 3; j++) hu[j] += huellaFija[j];
    U.uPS.value[i].set(...hu, 0);
    const mundoDe = (l) => { const v = new THREE.Vector3(l[0] * S[0], l[1] * S[1], l[2] * S[2]).applyMatrix4(Rm); return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z]; };
    const c = mundoDe(R.esfera), rr = R.esfera[3] * Math.max(...S) + 0.03;
    B[4 + i].set(c[0], c[1], c[2], rr);
    // (coste) el rectángulo de pantalla sale de la caja de la postura, no de la esfera (una persona de pie es estrecha)
    const esq = [];
    for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) esq.push(mundoDe([R.caja[x][0], R.caja[y][1], R.caja[z][2]]));
    cajas[`p${i}`] = esq;
    const puntosM = {};
    for (const [n, v] of Object.entries(R.puntos)) puntosM[n] = mundoDe(v);
    const info = { puntos: puntosM, local: R.puntos, esqueleto: R, punto: (n) => puntosM[n] ?? null, mundo: mundoDe };
    rigs[i] = info;
    return info;
  }

  // (lote 0) La regla de potencias (pieza reglaA) y, si se da, su flecha (pieza flecha):
  //   { pieza, flecha, pos, escala (1,42), rot ([0, −0,12, 0]), e (exponente que queda a la altura ya), ya (y local,
  //     −1,85…1,85), actual (fila ámbar y grande; por defecto e), lupa (0,5), entera (0…1: la regla entera, de −35 a
  //     +27, con −4 en el centro; se anima), lupaEntera, rango: { de, a, marcas (0…1), madera (0…1) } (resalta de 10^de
  //     a 10^a: marcas y rótulos en ámbar y la madera más clara), marca (exponente al que apunta la flecha; por
  //     defecto actual), escalaFlecha (0,8), separacion (de la flecha al canto, 0,36), toque }
  //   Devuelve { s, ya, RS, y(e) (y local de un exponente), punto(e, x, z) (mundo; x local, por defecto el canto
  //   izquierdo), flecha (punto del mundo al que apunta la flecha) }.
  function ponerRegla({ pieza, flecha = null, pos = [0, 0, 0], escala = 1.42, rot = [0, -0.12, 0], e = 0, ya = 0, actual = null, lupa = 0.5,
    entera = 0, lupaEntera = REGLA.LUPA_ENTERA, rango = null, marca = null, escalaFlecha = 0.8, separacion = 0.36, toque = false } = {}) {
    const st = reglaEstado({ e, ya, entera });
    const ac = actual ?? e;
    U.uReglaA.value.set(st.s, st.ya, lupa, ac);
    U.uReglaB.value.set(st.RS, cl(entera), 0, lupaEntera);
    if (rango) U.uReglaC.value.set(rango.de ?? rango[0], rango.a ?? rango[1], rango.marcas ?? 1, rango.madera ?? 0.5);
    else U.uReglaC.value.set(0, 0, 0, 0);
    if (pieza != null) ponerPieza(pieza, { pos, escala, rot, toque });
    const Rm = rotXYZ(...rot);
    const punto = (ex, x = -REGLA.MEDIO[0], z = 0.06) => {
      const v = new THREE.Vector3(x, st.y(ex), z).multiplyScalar(escala).applyMatrix4(Rm);
      return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
    };
    let pf = null;
    if (flecha != null) {
      pf = punto(marca ?? ac, -REGLA.MEDIO[0] - 0.02);
      ponerPieza(flecha, { pos: [pf[0] - separacion, pf[1], pos[2] + 0.1], escala: escalaFlecha, rot: [0, -0.15, 0], toque });
    }
    return { ...st, punto, flecha: pf };
  }

  // (cartela) La cartela de capítulo: la placa queda centrada en (CARTELA.x, CARTELA.y) y mide CARTELA.w ×
  // CARTELA.h px de diseño, de cara a la cámara (sin deformar), a `distancia` de ella (por defecto, el 80 % de la
  // distancia al punto de mira: delante de la escena). Al salir, la mano la sube, la ladea hacia atrás y la saca
  // por arriba. Devuelve la presencia (1 entera · 0 ya no está). o: { x, y, sale, fin, distancia }
  function ponerCartela(t, texto, o = {}) {
    if (iCartela < 0) throw new Error('cartela: crea el plató con crearPlato({ cartela: E.cartela }) (o cartela: true)');
    const T = tiempoCartela(t, o);
    if (!texto || !T.ve) { ponerPieza(iCartela, { escala: 0 }); return 0; }
    if (U.uCartela.value.userData.texto !== String(texto)) hornearCartela(String(texto), U.uCartela.value);
    const sx = o.x ?? CARTELA.x, sy = (o.y ?? CARTELA.y) + T.dy;
    const D = o.distancia ?? 0.8 * cam.pos.distanceTo(cam.mira);
    // el rayo por el píxel (sx, sy), con dir·f = 1: el punto a la profundidad D
    const nx = (sx / W) * 2 - 1, ny = 1 - (sy / H) * 2;
    const dir = new THREE.Vector3().addScaledVector(r, nx * cam.tanY * ASP).addScaledVector(u, ny * cam.tanY).add(f);
    const pos = cam.pos.clone().addScaledVector(dir, D);
    const escala = CARTELA_ARCILLA.U * 2 * D * cam.tanY / H;
    const lev = Math.pow(T.u, 0.6);
    const Rm = new THREE.Matrix4().makeBasis(r, u, b).multiply(new THREE.Matrix4().makeRotationX(-0.3 * lev)).multiply(new THREE.Matrix4().makeRotationZ(0.06 * lev));
    const e = new THREE.Euler().setFromRotationMatrix(Rm, 'YXZ');
    ponerPieza(iCartela, { pos: [pos.x, pos.y, pos.z], escala, rot: [e.x, e.y, e.z], toque: T.u > 0, huellaFija: [0.31, 0.17, 0.0] });
    return T.k;
  }

  // rectángulo de pantalla (coordenadas de recorte) que cubre unas esquinas; null si no se ve
  function rectangulo(esq) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const e of esq) {
      const s = proyectar(e);
      if (!s) return new THREE.Vector4(-1, -1, 1, 1);
      x0 = Math.min(x0, s[0]); x1 = Math.max(x1, s[0]); y0 = Math.min(y0, s[1]); y1 = Math.max(y1, s[1]);
    }
    x0 = Math.max(0, x0 - 3); y0 = Math.max(0, y0 - 3); x1 = Math.min(W, x1 + 3); y1 = Math.min(H, y1 + 3);
    if (x1 <= x0 || y1 <= y0) return null;
    return new THREE.Vector4(x0 / W * 2 - 1, 1 - y1 / H * 2, x1 / W * 2 - 1, 1 - y0 / H * 2);
  }

  let ultimo = null;
  // ?perfil: mide cada pasada (window.__perfil)
  const perfil = busqueda.has('perfil');
  let tPaso = 0;
  const medir = (k) => { if (!perfil) return; sincronizar(); const a = performance.now(); window.__perfil[k] = Math.round(a - tPaso); tPaso = a; };
  function render(n, opc = {}) {
    U.uFrame.value = n;
    U.uFlicker.value = 1 + (azar(n, 3) - 0.5) * 0.03;
    U.uBoil.value.set(1.3 + (azar(n, 4) - 0.5) * 0.5, 0.7 + (azar(n, 5) - 0.5) * 0.5, 2.1 + (azar(n, 6) - 0.5) * 0.5);
    if (perfil) { window.__perfil = {}; sincronizar(); tPaso = performance.now(); }
    if (opc.fondo === false) {
      // solo las piezas, sobre transparente (para componer encima de otra imagen)
      renderer.setRenderTarget(null);
      renderer.setClearColor(0x000000, 0);
      renderer.clear(true, true, false);
      renderer.setClearColor(0x151a30, 1);
    } else {
    renderer.setRenderTarget(rtS);
    renderer.render(pasoSombra.escena, camOrto);
    suaU.uTam.value.set(rtS.width, rtS.height);
    for (const [de, a, dir] of [[rtS, rtS2, [1, 0]], [rtS2, rtS, [0, 1]]]) {
      suaU.uTex.value = de.texture; suaU.uDir.value.set(...dir);
      renderer.setRenderTarget(a);
      renderer.render(pasoSuave.escena, camOrto);
    }
    medir('sombra');
    renderer.setRenderTarget(null);
    renderer.clear(true, true, false);
    renderer.render(pasoFondo.escena, camOrto);
    medir('fondo');
    }
    // de lejos a cerca
    const visibles = objetos.filter((o) => B[o.b].w > 0 && cajas[o.id]);
    visibles.sort((a, c) => cam.pos.distanceTo(new THREE.Vector3(B[c.b].x, B[c.b].y, B[c.b].z)) - cam.pos.distanceTo(new THREE.Vector3(B[a.b].x, B[a.b].y, B[a.b].z)));
    for (const o of visibles) {
      const rc = rectangulo(cajas[o.id]);
      if (!rc) continue;
      o.uRect.value.copy(rc);
      if (o.id === 'atomo' && haloOn) renderer.render(pasoHalo.escena, camOrto);
      renderer.render(o.paso.escena, camOrto);
      medir(o.id);
    }
    sincronizar();
    ultimo = n;
  }
  addEventListener('resize', () => { ajustar(); if (ultimo !== null) render(ultimo); });

  // compila los programas antes de empezar (para que el primer fotograma no pague la compilación)
  renderer.compile(pasoSombra.escena, camOrto);
  renderer.compile(pasoFondo.escena, camOrto);
  for (const o of objetos) renderer.compile(o.paso.escena, camOrto);
  render(0);

  return {
    W, H, FPS, captura, renderer, U, proyectar, punto,
    // fotograma a 12 fps; con la duración, los últimos QUIETO segundos repiten la misma imagen
    fotograma: (t, duracion) => {
      if (duracion) t = Math.min(t, duracion - QUIETO);
      nActual = Math.max(0, Math.floor(t * FPS + 1e-6));
      return nActual;
    },
    limpiar, atomo: ponerAtomo, globo: ponerGlobo, tablero: ponerTablero, polvo: ponerPolvo, pieza: ponerPieza, render,
    // (lote 0) la regla de potencias con su flecha (ver ponerRegla) y el último esqueleto de cada persona («humano»)
    regla: ponerRegla, humano: (i) => rigs[i] ?? null,
    // (cartela) la cartela de capítulo (mejor con la función cartela(P, t, texto) del kit) y el índice de su pieza
    cartela: ponerCartela, iCartela,
    // punto (mundo) del centro del hueco i del tablero, a una distancia d sobre su superficie
    casilla(tab, i, d = 0) { return this.enTablero(tab, (i - 2.5) * TAB.PASO, TAB.YW, d); },
    // punto (mundo) de coordenadas locales (x, y, z) del tablero
    enTablero(tab, x, y, z = 0) {
      const v = new THREE.Vector3(x, y, z).applyMatrix4(rotTab(tab)).multiplyScalar(tab.escala ?? 0.8);
      const pos = tab.pos ?? [0, 1.5, 0];
      return [pos[0] + v.x, pos[1] + v.y, pos[2] + v.z];
    },
    normalTablero(tab) {
      const v = new THREE.Vector3(0, 0, 1).applyMatrix4(rotTab(tab));
      return [v.x, v.y, v.z];
    },
    // giro euler (YXZ) que alinea una pieza con el tablero (su cara +z con la normal del tablero)
    rotTablero(tab) { return [-(tab.inclinacion ?? 0.6), tab.giro ?? 0, tab.roll ?? 0]; },
  };
}

// ---------- (cartela) la cartela de capítulo, con la misma API que en papel-adulta.js e isometrico-adulta.js ----------
/**
 * Cartela de capítulo en arcilla: destino es el plató (crearPlato({ ..., cartela: E.cartela })). Se llama en cada
 * fotograma entre P.limpiar() y P.render(n), con el tiempo del fotograma (ts = n / 12). Devuelve la presencia
 * (1 entera · 0…1 saliendo · 0 ya no está). o: { x, y (centro, px), sale, fin (s), distancia (de la cámara) }
 */
export function cartela(destino, t, texto, o = {}) {
  if (!destino || typeof destino.cartela !== 'function') throw new Error('cartela: el destino tiene que ser el plató de crearPlato()');
  return destino.cartela(t, texto, o);
}
