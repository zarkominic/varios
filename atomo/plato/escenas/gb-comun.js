// Fontanería y decorados del episodio 49 (Göbekli Tepe: el templo que unos cazadores levantaron antes de inventar la
// agricultura), con el canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris
// azulado), al nivel de episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43
// (hm-comun.js: estudio) y añade: A la colina de Göbekli Tepe en 1963, 1994 y hoy (colina), B el recinto de pilares hace
// 11.600 años (recinto), C la cantera y el paisaje del Neolítico (neolitico), D los arqueólogos: la tienda de 1963, la
// casa de la excavación y el laboratorio del carbono 14 (arqueologos), E lo que se cuenta hoy: el salón con la tele, la
// piedra del buitre, Karahan Tepe y el mapa de Taş Tepeler (hoy), y las piezas (d_* y pausa).
// LOS PILARES EN T: caliza crema con vetas y desconchones; brazos en relieve que bajan por los costados y manos de dedos
// largos que se juntan sobre el vientre, cinturón y taparrabos de piel de zorro; SIN CARA (salvo el de Karahan Tepe de
// 2025). Los relieves de animales: zorros, jabalíes, serpientes en fila, escorpiones, grullas, buitres y algún uro.
// SIN LETRAS en pantalla (solo números y símbolos). NADA MORBOSO: ni cráneos ni huesos humanos ni tumbas a la vista;
// los enterramientos de 2026 se ven como un cuadro de excavación tapado con una lona y unas etiquetas con números.
// Personas reales (Klaus Schmidt), con respeto y sin parecidos inventados. Sin marcas: la tele es una tele cualquiera.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) y la zona de Atom (x 278–318, y 4–44) se dejan tranquilas.
//
//   import * as T from '/atomo/plato/escenas/gb-comun.js';
//   const { E, R, M } = await T.preparar('gb-gancho');
//   T.rodar(E, R, [[0, (t) => T.recinto(R, t, { encuadre: 'construccion' })]], { año: -9500 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 49 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_GB as GB } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43): se usa tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la caliza de los pilares y de la cantera, su sombra y sus vetas; el relieve más claro que el fondo
    caliza: '#d8c8a4', calizaL: '#ece0c4', calizaS: '#a8946e', calizaD: '#7a6a4e', veta: '#bca880',
    // la tierra roja de Şanlıurfa, la estepa seca, el trigo silvestre, el basalto de Karacadağ
    tierra: '#a8643e', tierraS: '#7a4428', tierraL: '#c8845a', estepa: '#c8b070', estepaS: '#9a8450', trigo: '#e0c070',
    trigoS: '#b0904a', basalto: '#3a3638', basaltoL: '#5a5458',
    // las pieles, el cuero, el sílex, el fuego de las antorchas y las hogueras
    piel: '#9a6a3e', cuero: '#6a4428', silex: '#5a5a62', silexL: '#9a9aa4', fuego: '#ffb040', fuegoL: '#fff0a0',
    // la excavación de hoy: la cubierta blanca, las lonas, los andamios, las cuerdas de la cuadrícula, las etiquetas
    cubierta: '#f0f0ec', lona: '#5a8ac8', andamio: '#c8c8cc', cuerda: '#e8e0c8', etiqueta: '#f4f0e4',
    // la tele y el laboratorio
    pantalla: '#4a8ac8', bata: '#f2f2ee', metal: '#9aa0a8',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep49');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: el pilar (9600–8000 a. C., los constructores), la lupa (1963–1994, los que pasaron de largo) y
  // la pala (1995–hoy, la excavación)
  Object.assign(R.ICONOS, {
    pilar: ['#######', '#######', '..###..', '..###..', '..###..', '..###..', '.#####.'],
    lupa: ['.###...', '#...#..', '#...#..', '#...#..', '.###...', '....##.', '.....##'],
    pala: ['......#', '.....#.', '....#..', '...#...', '.##....', '###....', '.#.....'],
  });
  R.tramosTiempo([[-9600, -8000, R.PALA.ORO, 'pilar'], [1963, 1995, R.PALA.AZUL ?? R.PALA.ROJO, 'lupa'], [1995, 2027, R.PALA.ROJO, 'pala']]);
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

// ── A · La colina de Göbekli Tepe (1963, 1994 y hoy) ─────────────────────────────────────────────────────────────────
// La meseta de Şanlıurfa: un cerro redondeado («el cerro de la barriga») de tierra rojiza en una llanura de campos
// arados y estepa, con la sierra lejana. Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo en un búfer, y
// encima la vida (nubes de tres tonos a tres velocidades, pájaros, polvo, viento en la hierba, gente pequeña).
// o.encuadre:
//   'cerro' (por omisión), o.camara 'general': EL CERRO DE LEJOS con el MORAL SOLITARIO en lo alto (copa x ~150–186,
//     tronco x 168, base y ~70); campos arados en franjas, muretes de piedra seca, un camino de tierra, un pastor pequeño
//     con su rebaño a lo lejos; o.epoca: 1963 (por omisión: el cerro pelado, losas de caliza rotas asomando entre la tierra
//     arada, un jeep de los sesenta aparcado en el camino x ~40–80, y 150), 1994 (lo mismo, el moral más grande, un
//     tractor rojo pequeño arando de ida y vuelta, más losas apartadas en montones al borde de los campos) o 'hoy' (la
//     GRAN CUBIERTA blanca de membrana sobre los recintos, pasarelas de madera, un aparcamiento con autobuses pequeños y
//     visitantes diminutos). o.estacion ('primavera' | 'verano' | 'otono'; por omisión verano) cambia los campos. Suelo
//     y 150, libre x 30–250 (los personajes, delante, al pie del cerro).
//     Cámara 'losas': EN LO ALTO DEL CERRO, DE CERCA: la tierra arada con terrones y piedrecitas, cardos, y tres LOSAS DE
//     CALIZA ROTAS que asoman (una grande en x ~150–190, y ~120–140, que es la cabeza de un pilar en T si se mira bien:
//     o.cabeza 0–1 la va destapando, con la tierra que se aparta, y deja ver el borde en T y un relieve); el moral cerca a
//     la izquierda con su sombra; o.epoca igual que arriba. Suelo y 150, libre x 30–140 y 200–260.
//   'excavacion': LOS RECINTOS EXCAVADOS, desde arriba en tres cuartos: los círculos de muros de piedra seca con sus
//     pilares en T (el recinto D en el centro, con los dos pilares centrales x ~150 y 176), los testigos de tierra entre
//     recintos, las pasarelas, la cuadrícula de cuerdas, carretillas, cubos, tamices y sacos, trabajadores pequeños que
//     cavan y llevan cubos; o.anos 0–1 hace crecer la excavación (de un cerro con dos catas en 1995 a los cuatro
//     recintos abiertos y la cubierta en 2017); o.cubierta (por omisión según o.anos) pone la membrana blanca arriba.
//     Suelo y 150 (los personajes en el borde de delante, sobre la pasarela). Devuelve .centrales [[x, y], [x, y]].
//     Cámara 'corte': EL PERFIL DE TIERRA de un recinto, de cerca: el muro de piedra a la izquierda, el pilar inclinado
//     apuntalado con vigas, y el corte del relleno con sus capas de colores (tierra rojiza, piedras, sílex, ceniza),
//     etiquetas numeradas clavadas en cada capa; o.lluvia 0–1 anima siglos de lluvia: gotas, barro que baja por la
//     ladera y capas que se van depositando (el tiempo corre: soles y lunas que pasan arriba); o.puntales true añade la
//     gente pequeña que apuntala. Suelo y 150, libre x 30–120.
//   'norte': LA ZONA NUEVA AL NORTE (2026): una ladera con la cuadrícula de excavación y EDIFICIOS RECTANGULARES de muros
//     bajos de piedra con banco corrido y algún pilar pequeño, cajas de hallazgos, una mesa de dibujo, sombrillas,
//     una lona azul sobre un cuadro (lo que está tapado no se ve), cubos y escaleras; trabajadores pequeños. Suelo y 150.
//     Cámara 'muro': EL MURO ENTRE DOS RECINTOS (2025), de cerca: piedra seca a hiladas con mortero de barro, un
//     andamio de restauración, y dentro del muro, a lo largo de su base, la ESTATUA DE PIEDRA de una persona a tamaño
//     natural, tumbada (o.estatua 0–1 la va destapando, con el polvo que cae). Suelo y 150, libre x 30–200.
// Llama a colinaDelante(R, t, o) con las mismas opciones después de los actores: cardos y piedras en las esquinas
// ('cerro'), la barandilla de la pasarela ('excavacion'), los puntales y la viga de delante ('corte').
export function colina(R, t, o = {}) {
  return provisional(R, t, C.estepa, C.tierra);
}
export function colinaDelante(R, t, o = {}) {}

// ── B · El recinto hace 11.600 años ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'construccion' (por omisión), o.camara 'general': UN RECINTO EN CONSTRUCCIÓN al amanecer: el círculo de muro de
//     piedra seca a medio levantar con sus pilares en T (unos 8 alrededor y los DOS CENTRALES grandes en x ~140 y 190,
//     base y 146, altura ~90 px), uno de ellos todavía inclinado sobre troncos y palancas (o.levantar 0–1 lo endereza:
//     devuelve .cuerdas, los puntos donde tiran las filas de gente); andamios de troncos atados, cuerdas de cuero,
//     cestas de piedras, hogueras con humo, la estepa y el cielo del alba detrás; gente pequeña de fondo que trabaja
//     (tallando con percutores, acarreando cestas). o.noche true: de noche con antorchas que tiemblan y la luz naranja en
//     la caliza. Suelo y 150, libre x 20–120 y 210–300 (las filas de los que tiran, en primer plano).
//     Cámara 'pilar': EL PILAR CENTRAL DE CERCA, ocupando el alto del cuadro (x ~110–210): la cabeza en T, los BRAZOS en
//     relieve que bajan por los costados, las MANOS de dedos largos que se juntan sobre el vientre, el cinturón con
//     hebilla y el taparrabos de piel de zorro con la cola, un ZORRO que salta por el costado; la luz rasante marca los
//     relieves; el muro de detrás. o.relieve (nombre) enciende con una luz suave un relieve: 'zorro', 'jabali',
//     'serpientes', 'escorpion', 'grulla', 'buitre', 'uro' (los demás relieves se ven en pilares vecinos a los lados);
//     o.recorrer 0–1 desliza la cámara de pilar en pilar a la derecha. Suelo y 150, libre x 20–100 y 220–300.
//   'banquete': EL BANQUETE junto al recinto, al atardecer: hogueras, piedras de moler con mujeres que muelen grano, grandes
//     cuencos de piedra con papilla, carne de gacela asándose, cestas de espigas silvestres, gente pequeña sentada que come
//     y ríe; detrás los pilares. Suelo y 150, libre x 40–260.
// Llama a recintoDelante(R, t, o) después de los actores: un tronco y una cesta en las esquinas ('construccion'), una
// piedra de moler en primer plano ('banquete').
export function recinto(R, t, o = {}) {
  return provisional(R, t, C.caliza, C.tierra);
}
export function recintoDelante(R, t, o = {}) {}

// ── C · La cantera y el paisaje del Neolítico ────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'estepa' (por omisión), o.camara 'general': LA ESTEPA HACE 11.600 AÑOS: lomas onduladas con hierba seca y TRIGO
//     SILVESTRE que se mece, almendros y pistacheros salvajes, un arroyo; manadas de GACELAS que pastan y corren, unos
//     UROS lejos, jabalíes en un matorral, grullas que cruzan; al fondo los MONTES KARACADAĞ (x ~200–320), volcánicos y
//     oscuros, y el cerro de los pilares a lo lejos a la izquierda (x ~40, una mancha clara); cazadores pequeños al acecho
//     con arcos. o.hora: 'dia' (por omisión) | 'atardecer'. Suelo y 150, libre x 20–260.
//     Cámara 'trigo': EL TRIGO SILVESTRE DE CERCA: espigas que se mecen en primer plano y en tres términos, recolectoras
//     con hoces de sílex y cestas, los montes Karacadağ detrás; o.camino true dibuja una línea punteada luminosa que une
//     las laderas con el cerro (devuelve .camino). Suelo y 150.
//   'cantera': LA CANTERA DE CALIZA en la ladera: la roca blanca escalonada con las marcas de los cortes, EL PILAR SIN
//     TERMINAR de siete metros tumbado (x ~60–260, y ~120–140) con su raja, cuñas y percutores de piedra, lascas de
//     sílex en el suelo, gente pequeña que talla con percutores (el golpe y el polvo); el cerro de los recintos cerca
//     abajo a la derecha. Suelo y 150, libre x 20–60 y 260–300.
//     Cámara 'troncos': EL TRANSPORTE de un pilar sobre troncos con palancas y filas de gente que tiran (o.avance 0–1 lo
//     mueve de izquierda a derecha y los troncos ruedan y se recolocan delante). Suelo y 150.
// Llama a neoliticoDelante(R, t, o) después de los actores: matas de hierba y espigas en las esquinas, una roca.
export function neolitico(R, t, o = {}) {
  return provisional(R, t, C.estepa, C.trigo);
}
export function neoliticoDelante(R, t, o = {}) {}

// ── D · Los arqueólogos ──────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'tienda' (por omisión): EL CAMPAMENTO DE LA PROSPECCIÓN DE 1963 al pie del cerro: una tienda de lona caqui con sus
//     vientos, mesa plegable con mapas (sin letras), una caja de hallazgos, un jeep de los sesenta, bidones, una
//     radio de válvulas, un hornillo con una cafetera humeante, el cerro con el moral detrás. Suelo y 150, libre x 30–200.
//   'casa': LA CASA DE LA EXCAVACIÓN (por dentro): estanterías con cajas numeradas, mesas largas con puntas de flecha de
//     sílex, piedras de moler y huesos de gacela en bandejas con etiquetas de números, tamices colgados, dibujos de pilares
//     clavados en la pared, un mapa de la colina con los recintos, un flexo, un ventilador, la ventana con el cerro y la
//     cubierta blanca fuera; o.anos 1995–2026 cambia el ordenador (un monitor de tubo o una pantalla plana). Suelo y 150,
//     libre x 40–220; la mesa de delante (y 128–150) la pinta arqueologosDelante.
//   'laboratorio': EL LABORATORIO DEL CARBONO 14: una sala blanca con un acelerador de partículas (tubos y cajas grises
//     con lucecitas), una campana de gases, viales con muestras de carbón numerados, un ordenador con una curva que
//     sube, una ventana; o.muestra 0–1 mete una muestra en la máquina y saca el número (devuelve .numero [x, y] para que la
//     escena escriba «9500»). Suelo y 150, libre x 30–200.
// Llama a arqueologosDelante(R, t, o) después de los actores (la mesa de delante de 'casa').
export function arqueologos(R, t, o = {}) {
  return provisional(R, t, C.cuerda, C.tierraS);
}
export function arqueologosDelante(R, t, o = {}) {}

// ── E · Lo que se cuenta hoy ─────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'salon' (por omisión): UN SALÓN DE NOCHE con una TELE grande (x ~170–290, y ~50–120) que emite un documental de
//     «civilización perdida» (sin marcas: imágenes que cambian con t: un barco antiguo en el hielo, una ciudad que se
//     hunde, un pilar en T, un cometa), el sofá (lo pinta hoyDelante para que el espectador se siente detrás), una
//     lámpara de pie, una estantería, una planta, la ventana con la ciudad de noche, la luz azul de la tele que baila en
//     las paredes; o.movil true: en primer plano, una mano con un móvil y vídeos verticales que se deslizan (iconos: un
//     ojo, una pirámide, un cometa). Suelo y 150.
//   'buitre': LA PIEDRA DEL BUITRE (pilar 43) de cerca, a la luz de la excavación: el buitre con las alas, el escorpión,
//     las aves, el disco, los relieves nítidos; o.constelaciones 0–1 dibuja encima líneas de estrellas que unen los
//     animales y un cometa que cae, y o.borrar 0–1 las borra. Suelo y 150, libre x 20–90 y 230–300.
//   'karahan': KARAHAN TEPE: LA SALA TALLADA EN LA ROCA VIVA con los pilares que brotan del suelo (una docena, de ~40–70
//     px), la CABEZA HUMANA esculpida en la pared que los vigila, el banco corrido, la luz que entra desde arriba; o.cara
//     true añade el PILAR EN T CON CARA de 2025 en primer plano a la derecha. Suelo y 150, libre x 20–120.
//     Cámara 'mapa': EL MAPA DE TAŞ TEPELER: la meseta de Şanlıurfa en relieve con sus lomas, las colinas que se encienden
//     una a una con un punto luminoso (o.encendidas 0–1; Göbekli Tepe, Karahan Tepe y una decena más), sin letras.
// Llama a hoyDelante(R, t, o) después de los actores (el sofá en 'salon').
export function hoy(R, t, o = {}) {
  return provisional(R, t, C.pantalla, C.basalto);
}
export function hoyDelante(R, t, o = {}) {}

// ── Piezas ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// d_pilar(R, x, y, o): UN PILAR EN T (x, y: el CENTRO DE LA BASE): caliza con vetas, la cabeza en T, brazos y manos en
//   relieve, cinturón y taparrabos de zorro; o.escala 1–3 (a escala 1, unos 22 × 60 px); o.relieves: lista de animales
//   tallados en el fuste ('zorro', 'jabali', 'serpientes', 'escorpion', 'grulla', 'buitre', 'uro'); o.cara true (el de
//   Karahan Tepe); o.inclinado (grados); o.luz 0–1 (luz rasante cálida). Devuelve { cabeza: [x, y], manos: [x, y] }.
// d_moler(R, x, y, o): UNA PIEDRA DE MOLER con su mano de piedra y grano. d_cuenco(R, x, y, o): UN GRAN CUENCO DE PIEDRA
//   con papilla (o.lleno 0–1, vapor). d_figuritas(R, x, y, o): EL CUENCO DE CLORITA con las tres figuritas (zorro,
//   jabalí y buitre). d_estatua(R, x, y, o): LA ESTATUA HUMANA de piedra tumbada (o.destapada 0–1). d_leopardo(R, x, y, o):
//   LA FIGURA SENTADA SOBRE UN LEOPARDO. d_relieve(R, x, y, o): EL RELIEVE DE SAYBURÇ (un hombre entre dos leopardos y otro
//   frente a un toro, en piedra).
// pausa(R, x, y, t, o): los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio a escala
//   2 —o.s—, con contorno, luz y sombra, y su sombra en el suelo). x, y: el CENTRO DE LA BASE. o.cual:
//   'troncos' (~120 × 80): un pilar tumbado sobre troncos con dos palancas y una fila de seis figuritas que tiran de la
//     cuerda; «10 t» encima (o.numero); o.avance 0–1 lo hace rodar; con o.carretilla una carretilla a la que se le cae la
//     rueda (devuelve .rueda);
//   'reloj' (~100 × 90): un reloj de arena y una tarta que se parte por la mitad una y otra vez (o.mitades 0–5) con
//     «5730» encima;
//   'banquete' (~120 × 80): piedras de moler, un cuenco de piedra con papilla humeante y unas espigas que se convierten en
//     un campo sembrado (o.campo 0–1);
//   'nube' (~120 × 90): un enchufe con cara y una nube que cambia de forma (o.forma 0–3: animal, buitre, cometa, Atom);
//   'balanza' (~110 × 90): una balanza con un libro de portada de película (una mano que entierra algo) y otro con una
//     nube de lluvia; o.peso 0–1 la inclina hacia la película.
//   o.numero: sin poner, el número sale en su momento; true, siempre; false, nunca. Todas devuelven { arriba: [x, y] }.
export function d_pilar(R, x, y, o = {}) {
  const s = o.escala ?? 1, x0 = Math.round(x - 11 * s), y0 = Math.round(y - 60 * s);
  R.rect(x0, y0, x0 + 22 * s, y0 + 10 * s, C.caliza); R.rect(x0 + 5 * s, y0 + 10 * s, x0 + 17 * s, y, C.caliza);
  return { cabeza: [x, y0], manos: [x, y - 25 * s] };
}
export function d_moler(R, x, y, o = {}) { R.rect(x - 8, y - 4, x + 8, y, C.basalto); }
export function d_cuenco(R, x, y, o = {}) { R.rect(x - 10, y - 8, x + 10, y, C.caliza); }
export function d_figuritas(R, x, y, o = {}) { R.rect(x - 8, y - 6, x + 8, y, C.basaltoL); }
export function d_estatua(R, x, y, o = {}) { R.rect(x - 30, y - 6, x + 30, y, C.calizaS); }
export function d_leopardo(R, x, y, o = {}) { R.rect(x - 12, y - 20, x + 12, y, C.caliza); }
export function d_relieve(R, x, y, o = {}) { R.rect(x - 30, y - 20, x + 30, y, C.calizaS); }
export function pausa(R, x, y, t, o = {}) { R.rect(x - 40, y - 60, x + 40, y, C.caliza); return { arriba: [x, y - 60] }; }
