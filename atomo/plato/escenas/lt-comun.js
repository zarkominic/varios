// Fontanería y decorados del episodio 46 (Leto II: el hijo de Paul que eligió convertirse en monstruo), con el canon del
// 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza A el planeta de arena NUESTRO del 33 (du-comun.js: planeta),
// B la ciudadela de Arrakeen y el sietch del 44 (pa-comun.js: ciudadela, sietch) y F el estudio de las pausas del 43
// (hm-comun.js: estudio), y añade: C Jacurutu y el trance (jacurutu), D el imperio de Leto 3.500 años después (imperio),
// E el puente sobre el río (puente) y las piezas: Leto gusano en su carro (letoGusano), los tigres (tigres), las
// truchas de arena (truchas) y los objetos de las pausas (pausa).
// DERECHOS: NADA de las películas de Dune ni de ilustraciones de los libros (ni actores, ni vestuario, ni naves, ni
// arquitectura, ni el diseño de sus gusanos): todo es NUESTRO, a partir de lo que dice el libro. Leto gusano: diseño
// propio. Sin letras (solo números y símbolos). Personajes: ELENCO_LT y ELENCO_PA (pixel-chibi.js). LA VIOLENCIA NUNCA
// SE VE (los tigres acechan pero no atacan; la muerte del predicador, un destello entre la multitud; la de Alia, una luz
// que se apaga de lejos; el puente cae de lejos, con polvo; nada de armas en uso, cuerpos ni sangre).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/lt-comun.js';
//   const { E, R, M } = await T.preparar('lt-gancho');
//   T.rodar(E, R, [[0, (t) => T.puente(R, t, { encuadre: 'boda' })]], { año: 3521 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 46 (y el del 44, que reutiliza) por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_LT as LT, ELENCO_PA as PA } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// A · el planeta de arena NUESTRO (del 33), B · la ciudadela de Arrakeen y el sietch (del 44) y F · el estudio de las
// pausas (del 43): se usan tal cual
export { planeta, planetaDelante } from '/atomo/plato/escenas/du-comun.js';
export { ciudadela, ciudadelaDelante, sietch, sietchDelante } from '/atomo/plato/escenas/pa-comun.js';
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el desierto: arena, sombra de duna, roca
    arena: '#d8a868', arenaS: '#a8784a', roca: '#6a4a3a', rocaS: '#3e2a24',
    // la ciudadela: piedra de arenisca pulida, bronce, sombra fresca, los estandartes verde y negro
    piedra: '#c8b088', piedraS: '#8a7458', bronce: '#b88a3a', bronceL: '#e8c060', estandarte: '#2a4a3a', estandarteN: '#1a1620',
    // Jacurutu (el sietch abandonado) y el trance: roca oscura, el azul de la especia y el oro del Sendero
    rocaJ: '#4a3a34', rocaJS: '#2a2024', sendero: '#f0c848', senderoL: '#fff0a8',
    // el imperio de Leto: el Arrakis verde (bosque, río, lluvia), la Ciudadela del dios (piedra rosada) y el Sareer
    bosque: '#2e5a3a', bosqueS: '#1e4028', rio: '#3a6a8a', rioL: '#8ab8d0', lluvia: '#a8b8c8', ciudadelaD: '#b8908a',
    // el puente: la piedra del puente, el río del atardecer y el carro del dios
    piedraP: '#a89a88', piedraPS: '#6a5e52', ocaso: '#e88a5a', oroCarro: '#d8a840',
    // el gusano: la piel de anillos gris plata y la cara humana
    gusano: '#8a8478', gusanoS: '#5a564e', gusanoL: '#b8b2a4', verdeAt: '#2e6a4a',
    // la especia: el azul de los ojos y el naranja del polvo
    especiaAzul: '#5a8ae8', especia: '#e88a3a',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep46');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo, como en el 44, en años desde la llegada a Arrakis: la duna (los gemelos, 21–22: nueve años
  // después de El Mesías) y el gusano (el dios emperador, 3.500 años después)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '#######'],
    gusano: ['..###..', '.#####.', '##.#.##', '#######', '.#####.', '..###..', '...#...'],
  });
  R.tramosTiempo([[20, 23, R.PALA.ORO, 'duna'], [3500, 3530, R.PALA.ROJO, 'gusano']]);
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


// ── C · Jacurutu y el trance ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cueva' (por omisión): JACURUTU, UN SIETCH ABANDONADO, de noche, por dentro: una caverna de roca oscura tallada a mano
//     y medio derrumbada (bóveda baja con grietas, nichos vacíos, una escalera tallada rota, cántaros de agua secos y
//     volcados, telas viejas rotas que se mecen en una corriente de aire, arena que entra por una grieta en un hilo fino);
//     al fondo, la boca de la cueva con el desierto y la luna; a la derecha, UN LECHO DE ROCA (x 150–230, y 132–140)
//     donde Leto se tumba; o.especia 0–1: una luz AZUL que crece desde el lecho y lo baña todo (motas azules que suben).
//     Unos fremen proscritos pequeños, embozados, en el borde de la luz (vida). Suelo y 150, libre x 40–260.
//     Cámara 'boca': la boca de Jacurutu desde fuera, al atardecer: un risco enorme de roca negra con la entrada
//     oscura, restos de una trampa de viento y de un muro caído, el desierto alrededor; suelo y 150, libre x 30–250.
//   'trance': LA VISIÓN: un espacio oscuro azul de especia sin suelo visible, con MILES DE CAMINOS DE LUZ que se abren
//     como raíces desde abajo en el centro (x 160, y 170) hacia el horizonte; o.apaga 0–1: se apagan uno a uno (de fuera
//     adentro), con un parpadeo, hasta que solo queda UNO DORADO, más ancho, que sube hacia una luz al fondo (o.dorado
//     0–1: lo que crece y brilla el dorado); diminutas siluetas de ciudades y planetas en las puntas de los caminos que
//     se apagan con ellos. Distinto del laberinto del 44 (pa-comun.js sietch 'laberinto'): aquí son raíces/ramas que
//     nacen de un punto y se apagan, no un laberinto sobre arena. Devuelve { origen: [x, y], dorado: [[x, y]…] }.
//     Cámara 'cerca': de cerca, el niño tumbado (x 120–200, y 140) con los ojos azules muy abiertos y los caminos
//     reflejados en el aire alrededor de su cabeza (sin primer plano de cara: el chibi a escala 1, la luz alrededor).
// Llama a jacurutuDelante después de los actores (rocas caídas y arena de primer término en 'cueva'; motas de luz en
// 'trance').
export function jacurutu(R, t, o = {}) { provisional(R, t, C.rocaJS, C.especiaAzul); return { suelo: 150, libre: [40, 260] }; }
export function jacurutuDelante(R, t, o = {}) { return {}; }

// ── D · El imperio de Leto, 3.500 años después ───────────────────────────────────────────────────────────────────────
// Arrakis ya no es un desierto: el planeta verde de Leto, con un orden muy estricto. Piedra rosada, estandartes con el
// símbolo del gusano en anillo (sin letras), las Habladoras de Pez como guardia.
// o.encuadre:
//   'verde' (por omisión): ARRAKIS VERDE, de día con lluvia fina: colinas cubiertas de bosque (tres términos), un RÍO
//     ancho que serpentea con reflejos y barquitas, una aldea ordenada de casas iguales en filas, campos en terrazas, la
//     lluvia en diagonal (tres capas; o.lluvia 0–1), un arcoíris tenue, y al fondo, en el horizonte, una franja ocre:
//     EL SAREER, el último desierto, con su muro (x 200–300, y 70–80). Suelo y 150, libre x 30–280; devuelve .gota
//     [x, y]: un punto bajo un alero donde cae una gota grande cada ~2 s (para el gag de Atom).
//     Cámara 'sareer': EL SAREER por dentro, al atardecer: el último pedazo de desierto, dunas anaranjadas (más pequeñas
//     que las del 33), el muro alto que lo rodea con bosque detrás, una torre de vigía de las Habladoras, el cielo de
//     ocaso; suelo y 150, libre x 30–280.
//   'ciudadela': LA CIUDADELA DEL DIOS EMPERADOR por dentro: una nave enorme de piedra rosada en perspectiva (fuga en
//     x 160), columnas altísimas, ventanales con haces de luz y polvo, estandartes con el anillo del gusano, FILAS DE
//     HABLADORAS DE PEZ pequeñas (figuras de 8–10 px, uniforme gris azulado y capa morada) firmes a los dos lados que
//     respiran, un pasillo central de losas con una alfombra, y al fondo el estrado bajo y ancho donde va EL CARRO de
//     Leto (x 120–220, suelo 130; lo dibuja T.letoGusano). Suelo y 150, libre x 40–280; devuelve .carro [x, y].
//     Cámara 'audiencia': lateral, más cerca: el estrado con el carro a la derecha (x 190–300, suelo 140) y un hueco a la
//     izquierda para quien habla con él (x 40–150, suelo 150), una columna y una Habladora de guardia.
//   'diario': LA CÁMARA DEL DIARIO, de noche: una sala pequeña excavada en roca bajo la Ciudadela, con una sola luz
//     cálida, estantes enormes llenos de CRISTALES y rollos (el diario: o.diario 0–1, crece el montón), una máquina de
//     grabar con lucecitas que parpadean al ritmo del dictado, y el carro de Leto a la izquierda (x 40–150, suelo 145).
//     Un diario gordísimo en una mesa (x 200–260, y 120–142; devuelve .libro [x, y]) para el gag de Atom. Libre x
//     160–280. Cámara 'ventana': la misma sala desde la ventana, con el Arrakis verde de noche y la luna fuera.
//   'dispersion': EL FIN: desde lo alto, el bosque que se vuelve desierto (o.desierto 0–1: el verde se tiñe de arena
//     desde un punto, x 160, en ondas) con miles de puntitos de luz (las perlas de conciencia de las truchas) que se
//     dispersan por la arena; cielo de crepúsculo con estrellas. Cámara 'estrellas': el cielo nocturno sobre el planeta
//     (el limbo del planeta abajo, y 150) del que salen NAVES DIMINUTAS (o.naves 0–1) en todas direcciones dejando
//     estelas finas, cada vez más; constelaciones; suelo y 150 (el horizonte), libre x 30–280.
// Llama a imperioDelante después de los actores (la lluvia de primer término en 'verde'; columnas de delante y una fila
// de Habladoras en 'ciudadela'; la mesa del diario en 'diario').
export function imperio(R, t, o = {}) { provisional(R, t, C.bosqueS, C.ciudadelaD); return { suelo: 150, libre: [30, 280] }; }
export function imperioDelante(R, t, o = {}) { return {}; }

// ── E · El puente sobre el río ───────────────────────────────────────────────────────────────────────────────────────
// El puente de la boda (el día que cae Leto). Un puente altísimo de piedra sobre una garganta con un río, al atardecer.
// o.encuadre:
//   'boda' (por omisión): EL PUENTE DE LADO Y DE LEJOS, AL ATARDECER: arcos altísimos de piedra (cuatro ojos) de un lado a
//     otro de una garganta verde, el tablero del puente con barandillas a y 96, GENTE PEQUEÑA ASOMADA a las barandillas
//     (figuritas de 6–8 px, con banderolas y pétalos que caen), el río muy abajo (y 150–180) con reflejos del ocaso; el
//     sol bajo, nubes de tres tonos; LA PROCESIÓN en el tablero (o.avance 0–1: avanza de izquierda a derecha, con
//     Habladoras y estandartes) y el hueco donde va EL CARRO de Leto (devuelve .carro [x, 96] según o.avance; lo dibuja
//     T.letoGusano a escala 0.5). o.roto 0–1: en el centro (x 160) el tablero se rompe: un tramo que se hunde, polvo y
//     piedras que caen hacia el río (de lejos, sin personas cayendo); o.caida 0–1: el carro que cae al río (lo dibuja la
//     escena), una SALPICADURA grande y círculos en el agua. Suelo de la escena en el tablero: y 96 (los chibis a
//     escala 0.5 o figuritas); libre x 20–300.
//     Cámara 'tablero': SOBRE EL PUENTE, a ras del tablero: las losas, las dos barandillas con la gente asomada, la
//     procesión que llega de frente, guirnaldas y pétalos en el aire, el cielo del ocaso; suelo y 150, libre x 40–280
//     (para Hwi Noree, Atom y el carro de cerca: devuelve .carro [220, 150]).
//   'rio': EL RÍO DESDE LA ORILLA, después: el agua ancha que corre tranquila con reflejos del atardecer (o la mañana:
//     o.hora 'ocaso' | 'manana'), el puente roto arriba al fondo (x 80–240, y 30–70) con su hueco, juncos y piedras en
//     la orilla de delante, y o.manchas 0–1: manchas de arena oscura en el agua que se dispersan río abajo con puntitos
//     de luz (las truchas de arena que se van). Suelo y 152 (la orilla), libre x 30–280.
//     Cámara 'vacio': EL PUENTE ENTERO Y VACÍO al atardecer, desde la orilla (el cierre): sin gente, sin procesión, el
//     río tranquilo, pájaros; en la orilla de delante (suelo 152, x 100–220) un sitio para un niño pelirrojo.
// Llama a puenteDelante después de los actores (pétalos y guirnaldas de delante en 'tablero'; juncos de delante en 'rio').
export function puente(R, t, o = {}) { provisional(R, t, C.rio, C.ocaso); return { suelo: 150, libre: [30, 280], carro: [160, 96] }; }
export function puenteDelante(R, t, o = {}) { return {}; }

// ── Piezas ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// LETO GUSANO EN SU CARRO (diseño NUESTRO, por el libro: «un gusano de arena de siete metros con cara y manos humanas»):
// un cuerpo largo y grueso de anillos gris plata (con brillo y sombra, cada anillo con su pliegue) tumbado sobre un
// carro bajo y ancho de ruedas doradas con cojines; en la parte delantera, una CARA HUMANA pequeña y serena (rasgos
// Atreides, ojos azul de especia, sin pelo, como encajada en el capuchón de piel gris) y DOS MANOS humanas pequeñas
// apoyadas en el borde; el cuerpo respira (los anillos se hinchan) y la cola se mueve un poco. x, y: el centro de las
// ruedas en el suelo; s: la escala (1 = el carro mide ~110 px de largo y la cara ~10 px; 0.5 de lejos). o.dir 1 | −1
// (mira a la derecha o a la izquierda); o.mira [x, y]: los ojos miran ahí; o.habla true: la boca se mueve; o.agua 0–1:
// la piel se le despega en motas oscuras (truchas) y deja ver debajo algo más pequeño y pálido (sin nada morboso: una
// silueta que se deshace en motas de luz). Devuelve { cara: [x, y], manos: [[x, y], [x, y]] }.
export function letoGusano(R, x, y, t, o = {}) { const s = o.s ?? 1; R.rect(Math.round(x - 55 * s), Math.round(y - 30 * s), Math.round(x + 55 * s), y, C.gusano); return { cara: [x + 45 * s, y - 24 * s], manos: [[x + 40 * s, y - 14 * s], [x + 48 * s, y - 14 * s]] }; }
// LOS DOS TIGRES DE LAZA (de noche, al acecho; NUNCA atacan): grandes (~40 px de largo a s 1), rayados, agazapados,
// con collares de mando que parpadean; o.anda 0–1: avanzan sigilosos; o.dir. Y UN GATITO (o.gatito true) de 8 px, para el
// gag de Atom (Atom salta del susto y luego ve que es un gatito). x, y: los pies.
export function tigres(R, x, y, t, o = {}) { R.rect(x - 20, y - 14, x + 20, y, C.especia); return {}; }
// LAS TRUCHAS DE ARENA: manchas oscuras planas y blandas (4–8 px) con un filo brillante que reptan; o.n cuántas, en la
// zona o.zona [x0, y0, x1, y1]; o.sube [x, y, alto]: suben por algo vertical (los brazos de Leto) formando un guante
// vivo; o.perlas true: cada una lleva una perla de luz (el final).
export function truchas(R, t, o = {}) { return {}; }
// LOS OBJETOS DE LAS PAUSAS (los saca Atom a color en el estudio congelado; a escala 2 de pixel art limpio, con su
// sombra), o.cual:
//   'mochila': un niño chibi pequeño que carga una mochila enorme con una casita encima (parentificación).
//   'balanza': una balanza de dos platos: una moneda brillante hoy contra un cofre lejano y pequeño; o.inclina −1..1.
//   'tranvia': unas vías que se bifurcan con una palanca, un tranvía de juguete y un puentecito encima (el dilema).
//   'mesa': una mesa larga con una silla sola en un extremo y un grupo de amigos chibi al otro, riendo.
//   'jaula': un cartel redondo de prohibido (sin letras) y una jaula abierta de la que sale un pájaro volando.
// x, y: el centro de la base; devuelve {}.
export function pausa(R, x, y, t, o = {}) { R.rect(x - 20, y - 30, x + 20, y, C.sendero); return {}; }
