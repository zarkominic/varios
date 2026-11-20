// Fontanería y decorados del episodio 44 (Paul Atreides: por qué el héroe de Dune es el villano), con el canon del 43
// (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza A el planeta de arena NUESTRO del 33 (du-comun.js: planeta,
// planetaDelante) y F el estudio de las pausas del 43 (hm-comun.js: estudio, estudioDelante), y añade: B la ciudadela de
// Arrakeen (ciudadela), C Caladan (caladan), D la conspiración (conspiracion) y E el sietch Tabr (sietch).
// DERECHOS: NADA de las películas de Dune (ni actores, ni vestuario, ni naves, ni arquitectura, ni el diseño de sus
// gusanos, ni sus colores característicos): todo es NUESTRO, a partir de lo que dice el libro. Sin letras (solo números y
// símbolos). Personajes: ELENCO_PA (pixel-chibi.js), por sus atributos. LA VIOLENCIA NUNCA SE VE (la guerra santa, con
// mapas y luces; la quemapiedras, un destello de lejos; las muertes se cuentan; nada de armas en uso, cuerpos ni sangre).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. Desde el 43 la esquina de Atom ya no hace falta dejarla vacía; la barra del tiempo (x 20–170, y 0–14), sí.
//
//   import * as T from '/atomo/plato/escenas/pa-comun.js';
//   const { E, R, M } = await T.preparar('pa-gancho');
//   T.rodar(E, R, [[0, (t) => T.ciudadela(R, t, { encuadre: 'trono' })]], { año: 12 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 44 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores: lo aprendido en el 43)
export { ELENCO_PA as PA } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// A · el planeta de arena NUESTRO (del 33) y F · el estudio de las pausas (del 43): se usan tal cual
export { planeta, planetaDelante } from '/atomo/plato/escenas/du-comun.js';
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el desierto: arena, sombra de duna, roca
    arena: '#d8a868', arenaS: '#a8784a', roca: '#6a4a3a', rocaS: '#3e2a24',
    // la ciudadela: piedra de arenisca pulida, bronce, sombra fresca, los estandartes verde y negro
    piedra: '#c8b088', piedraS: '#8a7458', bronce: '#b88a3a', bronceL: '#e8c060', estandarte: '#2a4a3a', estandarteN: '#1a1620',
    // Caladan: el mar gris verdoso, la piedra húmeda, el verde de los Atreides
    mar: '#4a6a72', marL: '#8aaab0', piedraH: '#6a6e72', verdeAt: '#2e6a4a',
    // la especia: el azul de los ojos y el naranja del polvo
    especiaAzul: '#5a8ae8', especia: '#e88a3a',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep44');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en años desde la llegada a Arrakis (los libros cuentan el tiempo así: «doce años después»):
  // la duna (0–2, lo que ya se vio en las películas) y la corona (12–13, El Mesías)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '#######'],
    corona: ['#.#.#.#', '#######', '#.###.#', '#######', '.#####.', '.......', '.......'],
  });
  R.tramosTiempo([[0, 3, R.PALA.ORO, 'duna'], [11, 14, R.PALA.ROJO, 'corona']]);
  R.companero = () => {};   // canon del 43: Atom no vive en la esquina, actúa en la escena (T.AT)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── B · La ciudadela de Arrakeen ─────────────────────────────────────────────────────────────────────────────────────
// La ciudadela del emperador Paul, doce años después: arenisca pulida, bronce, sombra fresca y estandartes (verde
// oscuro y negro, con un halcón y una corona como SÍMBOLOS, sin letras). NADA de la arquitectura de las películas:
// arcos apuntados y bóvedas de piedra del desierto, celosías, agua que se guarda como un tesoro.
// o.encuadre:
//   'trono': EL SALÓN DEL TRONO: un salón enorme de piedra en perspectiva, columnas talladas, celosías altas por las que
//     entra la luz en haces con polvo que flota, estandartes colgados que se mecen, una alfombra larga hasta la tarima
//     de tres escalones y el trono de piedra con bronce (centro de la tarima en x 160, y 118: el que se sienta, pies en
//     y 122); guardias Fremen de pie a los lados (siluetas de fondo, no estorban), dos cuencos de agua con brillo.
//     Suelo de los personajes de la sala: y 150, libre x 40–280. Cámara 'tarima': la tarima de cerca y de lado, el
//     trono a la derecha (asiento en x 220, y 128), el respaldo con el halcón de bronce, la escalinata, una columna a la
//     izquierda y el haz de luz; para un actor sentado y otro de pie delante (suelo 150, x 60–190).
//     o.vacio true: el trono vacío (el final). o.luz: 'dia' (por omisión) | 'noche' (antorchas y luna por la celosía).
//   'balcon': EL BALCÓN SOBRE LA MULTITUD: desde detrás de la balaustrada de piedra (suelo de los personajes del balcón,
//     y 132, x 90–230), abajo una plaza inmensa llena de peregrinos (cientos de cabecitas en tramos que se mecen, brazos
//     que se alzan en oleadas, estandartes y banderolas), la ciudad de arenisca y cúpulas hasta el horizonte y el
//     desierto detrás; cielo de tarde con dos lunas pálidas. o.aclaman 0–1: la multitud alza los brazos y salta
//     (para el gag de Atom). Cámara 'multitud': a ras de la plaza, entre la multitud (cabezas y espaldas de primer
//     término abajo, y 150–179), mirando arriba al balcón lejano (centro x 160, y 46, una figura diminuta).
//   'aposentos': LAS HABITACIONES DE PAUL Y CHANI, de noche: muros de piedra con tapices de colores del desierto,
//     cojines y alfombras, una ventana alta en arco con la luna y la ciudad lejana, una lámpara de aceite que tiembla,
//     un mapa estelar grande en la pared (o.mapa 0–1: los planetas que se apagan uno a uno, solo luces, para la guerra
//     santa; devuelve los puntos en .mapa), una cuna vacía en un rincón (o.cuna: 0 ninguna | 1 | 2); un pasillo con una
//     puerta entreabierta al otro lado (por ella se ve a Irulan sola, x 250–290). Suelo y 150, libre x 40–240.
//     Cámara 'cocina': la cocina de la ciudadela: hornillos de piedra, cántaros, cestas de dátiles y especia, un cuenco
//     en la mesa (x 150–210, y 128: donde Irulan echa las gotas), una ventanita con luz de la tarde.
// Devuelve { encuadre, camara, suelo, libre, trono?, balcon?, mapa?, cuna?, cuenco?, puerta? }.
// Llama a ciudadelaDelante después de los actores (columnas o celosías de primer término, la balaustrada del balcón, la
// mesa de la cocina).
export function ciudadela(R, t, o = {}) {
  provisional(R, t, C.piedra, C.piedraS);
  return { encuadre: o.encuadre ?? 'trono', camara: o.camara ?? 'general', suelo: 150, libre: [40, 280] };
}
// lo que va por delante de los personajes en la ciudadela (después de los actores, con las mismas opciones)
export function ciudadelaDelante(R, t, o = {}) { return {}; }

// ── C · Caladan ────────────────────────────────────────────────────────────────────────────────────────────────────
// El planeta de mares de los Atreides, el recuerdo (frase 5): gris verdoso, lluvia, piedra húmeda. NUESTRO.
// o.encuadre:
//   'castillo': EL CASTILLO SOBRE EL ACANTILADO, de tarde con lluvia: el mar gris verdoso con olas que rompen y
//     espuma, el acantilado de roca oscura con musgo, el castillo de piedra en lo alto (torres, almenas, ventanas
//     encendidas, el estandarte verde con un halcón que ondea), nubes bajas que pasan, gaviotas, la lluvia en diagonal
//     y los charcos con ondas. Suelo de los personajes: el paseo de piedra junto a la muralla, y 152, x 30–200.
//     Cámara 'ventana': desde dentro, una sala con chimenea encendida, tapices verdes, una mesa con un mapa del mar; la
//     ventana grande con la lluvia y el mar al fondo; para tres personajes (el duque, Jessica y el niño) en y 150,
//     x 60–240.
// Devuelve { encuadre, camara, suelo, libre, ventana? }. Llama a caladanDelante después de los actores (la lluvia de
// delante, la almena o la mesa de primer término).
export function caladan(R, t, o = {}) {
  provisional(R, t, C.mar, C.piedraH);
  return { encuadre: o.encuadre ?? 'castillo', camara: o.camara ?? 'general', suelo: 152, libre: [30, 200] };
}
export function caladanDelante(R, t, o = {}) { return {}; }

// ── D · La conspiración ──────────────────────────────────────────────────────────────────────────────────────────────
// Donde conspiran la Bene Gesserit, la Cofradía y los Tleilaxu. NUESTRO (nada de las películas).
// o.encuadre:
//   'sala': LA SALA SECRETA: una cámara redonda y oscura con muros de metal oscuro y piedra, una mesa baja de luz en el
//     centro con un mapa de estrellas que gira (solo puntos), y a la derecha el TANQUE DEL NAVEGANTE: un cilindro de
//     cristal alto (x 230–290, y 40–150) lleno de gas naranja de especia que remolina, con una silueta difusa dentro
//     (formas suaves, nunca un monstruo), tuberías y válvulas que sueltan vapor. o.vaho [x, y] y o.caraVaho 0–1: el
//     cristal empañado con una carita dibujada en el vaho (el gag de Atom). Suelo de los personajes y 150, x 40–220.
//     Cámara 'tanque': el tanque de cerca, el cristal ocupando el centro, el gas que remolina y las burbujas, el reflejo
//     de quien está delante; para el gag del vaho (o.vaho igual).
//   'laboratorio': EL LABORATORIO DE LOS TLEILAXU: una nave larga con hileras de tanques de cultivo verdosos que se
//     pierden al fondo (dentro, siluetas dormidas, sin detalle de cuerpos), cables, luces que parpadean, bancos de
//     trabajo con frascos. o.hayt true: en el tanque del centro (x 150–190), un hombre de pelo rizado con los ojos de
//     metal que brillan. Suelo y 150, libre x 30–280. Cámara 'tanques': de cerca, tres tanques en fila con su luz.
// Devuelve { encuadre, camara, suelo, libre, tanque?, mesa?, vaho? }. Llama a conspiracionDelante después de los
// actores (la mesa de luz, los bancos de primer término).
export function conspiracion(R, t, o = {}) {
  provisional(R, t, hex('#1a1c26'), hex('#3a2a20'));
  return { encuadre: o.encuadre ?? 'sala', camara: o.camara ?? 'general', suelo: 150, libre: [40, 220] };
}
export function conspiracionDelante(R, t, o = {}) { return {}; }

// ── E · El sietch Tabr ───────────────────────────────────────────────────────────────────────────────────────────────
// La cueva Fremen por dentro: roca tallada, luz cálida de lámparas, telas y alfombras, el agua guardada. NUESTRO.
// o.encuadre:
//   'sala': LA SALA COMÚN: una caverna amplia tallada en la roca, galerías y escaleras en varios niveles con gente
//     diminuta, telares, alfombras, lámparas de aceite colgadas, el aire con polvo dorado; al fondo, los DEPÓSITOS DE
//     AGUA (una alberca de piedra con un brillo azul que ondula, el tesoro del sietch). Suelo y 152, libre x 30–260.
//     Cámara 'entrada': la boca del sietch desde fuera al atardecer, en la pared de roca de una meseta, con la arena
//     delante y las dos lunas; una figura vigila arriba en la roca (x 220, y 70). Suelo de la arena y 152, x 20–200.
//   'cuarto': EL CUARTO DE LAS CUNAS, de noche: un cuarto pequeño de roca con cortinas de tela, una lámpara de aceite,
//     cojines, y dos cunas tejidas (o.cunas: 1 | 2; la segunda aparece para el gag) con una luz cálida; nada del parto
//     (se cuenta: aquí solo la calma de después). Suelo y 150, libre x 40–220. Cámara 'puerta': desde el pasillo, la
//     cortina entreabierta y la luz cálida que sale; para alguien que se para en la puerta (x 120–200).
//   'laberinto': UN LABERINTO DE CAMINOS DE LUZ sobre la arena de noche (la visión de Paul): decenas de caminos que se
//     bifurcan desde el centro (x 160, y 150) hacia el horizonte; o.apagados 0–1: los caminos se oscurecen uno a uno
//     hasta que solo queda uno encendido (o todos apagados con 1). Cámara 'alto': el mismo laberinto visto desde
//     arriba, como un árbol de luz.
// Devuelve { encuadre, camara, suelo, libre, cunas?, alberca?, centro? }. Llama a sietchDelante después de los actores
// (cortinas, columnas de roca o la lámpara de primer término).
export function sietch(R, t, o = {}) {
  provisional(R, t, hex('#4a2e22'), hex('#a8784a'));
  return { encuadre: o.encuadre ?? 'sala', camara: o.camara ?? 'general', suelo: 152, libre: [30, 260] };
}
export function sietchDelante(R, t, o = {}) { return {}; }
