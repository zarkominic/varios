// Fontanería y decorados del episodio 21 (Harry Potter: lo que hay que saber antes de la serie de HBO) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el mundo muggle (Privet Drive y el zoo), B el
// callejón Diagon (la calle, la tienda de túnicas, el banco de los duendes), C Hogwarts por dentro (el Gran Comedor, el
// andén y el lago, el tren, un aula, la sala común, la sala del espejo), D Hogwarts por fuera (la torre más alta, el bosque
// prohibido, el campo de quidditch, la cabaña de Hagrid, la sala del acertijo de pociones, el castillo de noche), E lo real
// (el tren de 1990, un café de Edimburgo, la imprenta, el París de Flamel, el museo, la sala de subastas) y F hoy (el salón
// de la fan en Navidad, el corcho de las pistas, el plató de rodaje, la sala de montaje).
// Los personajes son los de ELENCO_HP y PIEZAS_HP (pixel-chibi.js): dibujados por nosotros, reconocibles por sus atributos,
// SIN logos, letras, escudos de las casas con letras ni nada copiado de las películas.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, barandillas, el
// sofá, la moviola) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/hp-comun.js';
//   const { E, R, M } = await T.preparar('hp-gancho');
//   T.rodar(E, R, [[0, (t) => T.hogwarts(R, t, { encuadre: 'comedor' })]], { año: 2026 });
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
// las piezas del episodio (PIEZAS_HP: la snitch, el sombrero, la lechuza…), las crea el reparto
export const PIEZAS_HP = KIT.PIEZAS_HP || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el mundo muggle: ladrillo de las casas iguales, césped, la nieve de Nochebuena
    ladrillo: '#a85a3a', ladrilloS: '#6a3424', cesped: '#5a9a3a', nieve: '#eef4fa', nieveS: '#b8c8dc',
    // Hogwarts: piedra, madera, el oro de las velas, el cielo encantado
    piedra: '#7a7680', piedraS: '#4a4652', madera: '#7a4a2a', maderaS: '#4a2a18', vela: '#ffe08a', cieloH: '#1a2050',
    // las casas, sin escudos ni letras: rojo, verde, amarillo, azul
    rojoG: '#a8202a', verdeS: '#1e6a3a', amarilloH: '#e8b830', azulR: '#2a4a9a',
    // la snitch
    oroS: '#f0c040', oroSS: '#a87a18', alaS: '#f4f0e0',
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
  const E = await escena(id, 'ep21');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1990 (el tren), 1997 (el libro), 2001 (la película) y 2026 (la serie)
  Object.assign(R.ICONOS, {
    rayo: ['....#..', '...##..', '..##...', '.#####.', '...##..', '..##...', '.##....'],
    libro: ['#######', '#.....#', '#.###.#', '#.....#', '#.###.#', '#.....#', '#######'],
    tele: ['.#...#.', '..#.#..', '#######', '#.....#', '#.....#', '#######', '.#...#.'],
  });
  R.tramosTiempo([[1990, 1997, R.PALA.ORO, 'libro'], [1997, 2011, R.PALA.ROJO, 'rayo'], [2011, 2026, R.PALA.AZUL ?? R.PALA.ROJO, 'tele']]);
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

// ── A · El mundo muggle ───────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'calle': Privet Drive, una calle de casas de ladrillo idénticas con jardincitos, setos recortados, buzones, farolas y coches
//     aparcados; o.luz 'noche' (por omisión, con las farolas encendidas y estrellas), 'nochebuena' (nevando, luces de Navidad
//     en las casas, nieve en los tejados) o 'dia'; o.farolas (0–1): cuántas farolas siguen encendidas (se apagan de una en
//     una hacia el aparato del anciano); o.cartas (0–1): de la chimenea del número 4 salen volando cientos de cartas; un gato
//     atigrado en la tapia. o.camara 'general' o 'ventana' (la fachada del número 4 de cerca, con la ventana encendida y sitio
//     para un niño asomado, y el jardín con nieve).
//   'zoo': la casa de los reptiles: penumbra verde, vitrinas iluminadas con lagartos y ranas, y en el centro un terrario
//     grande con una boa enorme enroscada (o.guiño 0–1: abre un ojo y guiña); visitantes. o.camara 'general' o 'cristal' (el
//     cristal de cerca con la boa grande y sitio para un niño que la mira).
// Delante: muggleDelante (la barandilla del terrario, el seto delantero). Devuelve { suelo, … }.
export function muggle(R, t, o = {}) {
  provisional(R, t, hex('#2a3050'), hex('#a85a3a'));
  return { suelo: 160 };
}
export function muggleDelante(R, t, o = {}) {}

// ── B · El callejón Diagon ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'calle': una calle empedrada y torcida de tiendas mágicas (escaparates con calderos, escobas, lechuzas en jaulas, libros
//     apilados, carteles sin letras), magos con túnicas de colores y sombreros puntiagudos; al fondo, un edificio blanco
//     enorme con columnas (el banco). o.camara 'general' o 'escaparate' (el escaparate de la tienda de túnicas desde la calle,
//     con sitio para un gigante con un helado mirando).
//   'tunicas': la tienda de túnicas por dentro: rollos de tela, maniquíes, taburetes de prueba, espejos, cintas métricas
//     que flotan solas. o.camara 'general' o 'probador' (dos taburetes de cerca con sitio para dos niños de pie encima).
//   'banco': el gran vestíbulo de mármol de los duendes: mostradores altos, balanzas, montones de monedas, lámparas; o.camara
//     'general' o 'camara' (abajo, en las cuevas: raíles, una vagoneta y la puerta redonda de una cámara acorazada con su
//     número, o.numero con a_cifras; o.abierta 0–1).
// Delante: diagonDelante (los mostradores del banco, la vagoneta). Devuelve { suelo, … }.
export function diagon(R, t, o = {}) {
  provisional(R, t, hex('#3a2a40'), hex('#c8a060'));
  return { suelo: 160 };
}
export function diagonDelante(R, t, o = {}) {}

// ── C · Hogwarts por dentro ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'comedor': el Gran Comedor: cuatro mesas largas, cientos de velas flotando, el techo encantado de estrellas, la mesa de
//     los profesores al fondo, estandartes de cuatro colores SIN escudos ni letras; o.lleno (0–1) alumnos sentados; o.vacio
//     de noche. o.camara 'general' o 'mesa' (la mesa de los profesores de cerca con sitio para tres o cuatro personajes de pie
//     o sentados detrás, y el taburete del sombrero delante).
//   'anden': el andén de una estación pequeña de noche con la locomotora roja que echa vapor (sin letras) y el lago negro
//     con el castillo iluminado al fondo; o.barcas (0–1) cruzan el lago. o.camara 'general' o 'lago' (las barcas de cerca con
//     el castillo grande).
//   'tren': un compartimento del tren: asientos de terciopelo, rejilla para el equipaje, ventana con el paisaje de colinas
//     que corre (recortado), un carrito de golosinas. o.camara 'general' o 'ventana'.
//   'aula': un aula de piedra con pupitres de madera, pizarra, una chimenea, telarañas y polvo en la luz. o.camara 'general'
//     o 'pizarra' (la pizarra y la mesa del profesor de cerca).
//   'sala': la sala común roja y dorada: chimenea encendida, butacas, alfombras, tapices sin letras, ventanas con nieve.
//     o.camara 'general' o 'chimenea'.
//   'espejo': una sala vacía con un espejo enorme de marco dorado (o.reflejo: función que pinta dentro) y pupitres apilados.
//     o.camara 'general' o 'cerca'.
// Delante: hogwartsDelante (la mesa de los profesores, los pupitres, el respaldo de la butaca). Devuelve { suelo, … }.
export function hogwarts(R, t, o = {}) {
  provisional(R, t, hex('#1a2050'), hex('#ffe08a'));
  return { suelo: 160 };
}
export function hogwartsDelante(R, t, o = {}) {}

// ── D · Hogwarts por fuera ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'castillo': el castillo de noche visto desde lejos, torres con ventanas encendidas, el lago y las montañas; o.camara
//     'general' o 'cerca' (las puertas y la escalinata).
//   'torre': lo alto de la torre más alta de noche: almenas, el cielo estrellado y la luna; o.escobas (0–1) llegan cuatro
//     siluetas en escoba. o.camara 'general' o 'almenas'.
//   'bosque': el bosque prohibido de noche: troncos enormes, raíces, niebla azul, ojos que brillan, un claro con luz de luna.
//     o.camara 'general' o 'claro'.
//   'quidditch': el campo de quidditch de día: torres de gradas de colores con banderas sin letras, los tres aros dorados a
//     cada lado, el césped. o.camara 'general' o 'gradas'.
//   'cabana': la cabaña de piedra de Hagrid nevada, con humo en la chimenea, calabazas y una puerta enorme. o.camara
//     'general' o 'puerta'.
//   'pociones': una sala subterránea con fuego negro en una puerta y morado en la otra, y una mesa con siete botellas; un
//     pergamino. o.camara 'general' o 'mesa'.
// Delante: exteriorDelante (la mesa del acertijo, la barandilla de la grada). Devuelve { suelo, … }.
export function exterior(R, t, o = {}) {
  provisional(R, t, hex('#0e1430'), hex('#5a7a9a'));
  return { suelo: 160 };
}
export function exteriorDelante(R, t, o = {}) {}

// ── E · Lo real detrás de la historia ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'tren': el interior de un tren británico de 1990 parado en el campo: asientos de tela, ventanilla con prados, vacas y
//     postes, nubes. o.camara 'general' o 'ventanilla'.
//   'cafe': un café de Edimburgo de los noventa: mesas de madera, ventana a una calle de piedra con lluvia fina, tazas, un
//     cochecito de bebé. o.camara 'general' o 'mesa'.
//   'imprenta': una imprenta pequeña: máquina, pilas de libros, cajas, papel. o.camara 'general' o 'pila'.
//   'paris': el París medieval: calle de casas de madera y piedra, un puesto de escribano con pergaminos, una casa de piedra
//     con su año grabado (o.anio con a_cifras). o.camara 'general' o 'casa'.
//   'museo': una sala de museo con una lápida antigua tras un cordón, vitrinas y visitantes. o.camara 'general' o 'lapida'.
//   'subasta': una sala de subastas: atril con martillo, sillas, pantalla con una cifra (o.cifra con a_cifras), un libro en
//     una vitrina. o.camara 'general' o 'atril'.
// Delante: realDelante (el atril, el mostrador del escribano). Devuelve { suelo, … }.
export function real(R, t, o = {}) {
  provisional(R, t, hex('#2a3a4a'), hex('#c8b8a0'));
  return { suelo: 160 };
}
export function realDelante(R, t, o = {}) {}

// ── F · Hoy ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// El presente (2026), de noche y en invierno. Cada encuadre pinta los 320 × 180 cada fotograma: lo fijo va en un búfer
// (e_fijo) y encima la vida animada. o.encuadre:
//   'salon': el salón de una fan en Navidad. Papel pintado verde de damasco con su moldura y el friso de cuarterones, la
//     tarima de tablas con la alfombra y unas zapatillas; la ventana con cortinas de terciopelo y su guirnalda de luces, y por ella la calle
//     nevada (tejados con nieve, ventanas que se encienden, la farola, el humo de las chimeneas, un coche que pasa, todo
//     recortado al hueco); el sofá de terciopelo azul con cojines y la manta de cuadros; la corona en la pared; la chimenea
//     de ladrillo con el cesto de la leña, el fuego vivo (llamas, chispas y el resplandor que tiembla en el suelo), la repisa con ramas, luces,
//     dos velas y un reloj que anda, cuatro calcetines que se mecen y el cuadro de un lago con su castillo; la cómoda de la
//     tele con la consola (piloto que late), la lámpara encendida, la balda con SIETE libros sin letras, los sujetalibros y
//     una lechucita; el árbol con bolas, espumillón, luces de colores que parpadean y la estrella; los regalos al pie, y un
//     gato que duerme junto al fuego y respira. La tele: o.pantalla(R, t, [x0, y0, x1, y1]) pinta dentro (con R.recorte
//     ya puesto; usa pset, linea, disco o poligono, no R.rect); sin ella, un menú de series insinuado sin logos ni letras.
//     o.camara 'general' (todo el salón) o 'sofa' (el sofá grande de frente bajo la ventana nevada, el árbol asomando por la
//     izquierda y la tele GRANDE a la derecha, con su luz azul que tiembla en el sofá; o.libro (true por omisión): sobre la
//     mesa baja, el libro boca abajo con la piedra roja en la tapa, que va en hoyDelante).
//   'corcho': el cuarto de estudio de la fan de noche: pared de yeso con su grano, el corcho grande con marco de roble y,
//     clavadas con chinchetas, las cuatro pistas (1 las gafas redondas, 2 la lista de reparto con caras y renglones, 3 unas
//     tijeras sobre un rollo de película, 4 el «?» con la moto voladora) y el relleno (un mapa con su camino, notas
//     adhesivas, la hoja del calendario con el 25, el billete con el 9 3/4, la foto del castillo, la ficha del rayo), todo
//     unido con hilo rojo; o.pistas (0–4, admite decimales para encender la siguiente poco a poco; sin la opción, todas
//     normales): las encendidas brillan con su marco dorado y el hilo que las une se enciende y le corre un pulso; las
//     apagadas se oscurecen. Escritorio con el flexo encendido (su luz baña el corcho), el portátil, el bote de lápices y
//     la ventanita con nieve, el reloj de pared que anda, la papelera con bolas de papel; a la derecha, la librería
//     con un gato negro que parpadea y mueve la cola. o.camara 'general' o 'cerca' (el
//     corcho a toda pantalla, las pistas al doble, y debajo el tablero de la mesa con el ovillo rojo, la caja de
//     chinchetas, la lupa, las tijeras y la taza que humea).
//   'plato': un plató de rodaje (las naves de Leavesden por dentro): la parrilla de focos colgados del techo, las paredes
//     acolchadas, el decorado del Gran Comedor a medio montar (muro de piedra pintada con su ventanal gótico iluminado por
//     detrás, pilares, antorchas que titilan, dos estandartes sin escudos, un tramo de mesa larga con su banco) y su otra
//     mitad en contrachapado desnudo con riostras, el andamio con un pintor que pinta y un carpintero que clava; el suelo
//     de hormigón con cinta, cables y la vía del travelín; la grúa con la cámara que sube y baja despacio (piloto rojo),
//     el foco de pie con viseras y su haz con motas, la mesa de vídeo con su monitor (o.pantalla, como la tele; sin ella,
//     el castillo de noche), la silla de director y la claqueta sin letras sobre unas cajas (o.claqueta 0–1: abierta;
//     0 cerrada). Un tramoyista cruza con un tablón; en el suelo, sacos de arena, el rollo de cable y la caja de herramientas. o.camara 'general' o 'monitor' (el monitor grande con su visera y el
//     marco de grabación con el código de tiempo que corre y el punto rojo, el carrito con los cascos, el guion, el
//     walkie y el café que humea; dos sillas de director a la izquierda y el plató desenfocado detrás, con sus manchas de
//     luz, las velas de la mesa y alguien del equipo que cruza borroso). o.hud (true): el marco de grabación encima de lo que pinte o.pantalla.
//   'montaje': la sala de montaje de 2001 de noche: paredes de espuma acústica, la estantería metálica con latas de
//     película, el tablero con las fotos de las escenas en filas, la moviola de mesa con sus cuatro platos que giran
//     (o.gira, 1 por omisión; 0 parada), la película que corre por los rodillos y el visor encendido (o.pantalla, como la
//     tele; sin ella, un fotograma que parpadea con su contador), la lámpara de brazo, el colgador de tiras de película
//     sobre su saco con ruedas (las tiras se mecen), el monitor de tubo con la línea de tiempo y la torre, la silla del montador, latas apiladas en el suelo; la moqueta con
//     recortes de película por el suelo. o.camara 'general' o 'moviola' (la mesa de cerca, los dos platos grandes, la
//     película que corre por la ventanilla con sus perforaciones, la empalmadora en el borde de delante, el lápiz graso, los guantes blancos, la balda
//     de latas con el altavoz, el visor grande
//     y, a la derecha, el saco de las tiras con su suelo libre).
// Delante (llama a hoyDelante con las mismas opciones después de los actores): en el salón general, la mesa baja con las
// palomitas, la taza que humea, el mando y un libro; en 'sofa', la mesa baja con el libro de la piedra roja (o.libro), las
// palomitas, la taza y la vela en su tarro; en el plató general, los cables del suelo de delante y el pie del foco; en
// montaje general, la papelera de rejilla rebosante de recortes; en 'moviola', el canto de delante de la mesa con la tira
// que cuelga. El corcho no lleva nada delante.
// Devuelve { suelo, pantalla, … } con la geometría de cada encuadre (ver los return).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'corcho') return e_corcho(R, t, o, cam === 'cerca');
  if (enc === 'plato') return e_plato(R, t, o, cam === 'monitor');
  if (enc === 'montaje') return e_montaje(R, t, o, cam === 'moviola');
  return e_salon(R, t, o, cam === 'sofa');
}
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'salon') return cam === 'sofa' ? e_mesaBaja(R, t, 66, 176, 154, o.libro ?? true) : e_mesaBaja(R, t, 116, 202, 160, false);
  if (enc === 'plato' && cam !== 'monitor') return e_platoDelante(R, t);
  if (enc === 'montaje') return cam === 'moviola' ? e_moviolaDelante(R, t) : e_papelera(R, t, 252, 176);
}
// ── Pieza del hilo de gags ───────────────────────────────────────────────────────────────────────────────────────────
// La snitch con ojos (PIEZAS_HP.snitch del reparto), animada: aletea, revolotea en un ocho alrededor de (x, y) con o.vuela
// (0–1), se esconde detrás de algo con o.esconde, o.expresion 'normal'|'susto'|'risa'; o.s escala. Devuelve { x, y }.
export function snitch(R, x, y, t, o = {}) {
  const v = o.vuela ?? 0, X = x + Math.sin(t * 2.3) * 10 * v, Y = y + Math.sin(t * 4.6) * 4 * v;
  if (PIEZAS_HP.snitch) PIEZAS_HP.snitch(R, X, Y, { ...o, t });
  else R.disco(X, Y - 3, 3, C.oroS);
  return { x: X, y: Y };
}

const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// el umbral de la trama 4 × 4 (Bayer) para degradados y brillos tramados
const e_b4 = (x, y) => e_B4[((y & 3) << 2) | (x & 3)];

// la mezcla de dos colores (a: cuánto del segundo)
const e_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// aclara (o tiñe) el píxel (x, y) hacia el color c en la proporción a
const e_tine = (R, x, y, c, a) => { const p = R.pget(x, y); if (p) R.pset(x, y, e_mezcla(p, c, a)); };

// un color de la paleta hecho a partir de una lista de hex
const e_hx = (l) => l.map(hex);

const e_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en su búfer (R.nuevo) y se copia en cada fotograma
function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un rectángulo que sí respeta un recorte cl = [x0, y0, x1, y1] (R.rect no lo respeta)
function e_rectC(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// un resplandor que tiñe lo que hay debajo (no lo tapa): radio r, color c, fuerza a, aplastado en vertical por ry
function e_resplandor(R, cx, cy, r, c, a, ry = 1) {
  for (let y = Math.floor(cy - r * ry); y <= cy + r * ry; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const g = 1 - Math.hypot(x - cx, (y - cy) / ry) / r; if (g > 0 && g * a > e_b4(x, y) * 0.5) e_tine(R, x, y, c, Math.min(0.85, g * a)); }
}

// vapor que sube de una taza (x, y: la boca) en bocanadas que crecen y se deshacen por el borde
function e_vapor(R, x, y, t, k = 0, col = hex('#e8e4f0'), alto = 14) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.32 + i / 3 + k * 0.29) % 1, r = 1.2 + u * 2.8, cx = x + Math.sin(u * 6 + k + t * 0.7) * 1.6, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (e_b4(xx, yy) < (1.05 - u) * (1.2 - d) * 0.8) e_tine(R, xx, yy, col, 0.55 * (1 - u * 0.6)); } }
}

// las luces de Navidad: rojo, oro, verde, azul y rosa, encendidas y apagadas
const E_LUZ = e_hx(['#ff5a4a', '#ffd84a', '#5ae07a', '#5ab4ff', '#ff86e0']), E_LUZA = e_hx(['#7a2a2a', '#7a6420', '#2a6a3a', '#2a4a7a', '#7a3a6a']);

// una bombilla de colores (x, y) que parpadea a su ritmo (k: su semilla); con su brillo alrededor cuando luce
function e_bombilla(R, x, y, t, k, fuerte = 1) {
  const c = k % 5, on = Math.sin(t * (1.3 + (k % 4) * 0.45) + k * 2.1) > -0.35;
  if (on) { for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) e_tine(R, x + dx, y + dy, E_LUZ[c], 0.45 * fuerte); R.pset(x, y, E_LUZ[c]); if (fuerte > 0.8) R.pset(x, y - 1, e_mezcla(E_LUZ[c], hex('#ffffff'), 0.5)); }
  else R.pset(x, y, E_LUZA[c]);
}

// una guirnalda de luces colgada entre dos puntos, con su comba (cae píxeles en el centro) y n bombillas
function e_guirnalda(R, x0, y0, x1, y1, cae, n, t, k = 0, cable = hex('#1e2a1e')) {
  const P = (u) => [Math.round(x0 + (x1 - x0) * u), Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * cae)];
  const L = Math.max(4, Math.abs(x1 - x0)); let ant = P(0);
  for (let i = 1; i <= L; i++) { const p = P(i / L); R.linea(ant[0], ant[1], p[0], p[1], cable); ant = p; }
  for (let i = 0; i < n; i++) { const [x, y] = P((i + 0.5) / n); e_bombilla(R, x, y + 1, t, i + k); }
}

// la nieve que cae (dentro del recorte que tenga puesto el llamador): copos de dos tamaños a tres velocidades
function e_nieve(R, t, x0, y0, x1, y1, n = 36, k = 0) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const v = 5 + (i % 3) * 4, x = x0 + ((Math.round(h(i, 1, 600 + k) * W + Math.sin(t * 0.9 + i) * 2.5 + t * 2) % W) + W) % W, y = y0 + Math.round(h(i, 2, 600 + k) * H + t * v) % H;
    R.pset(x, y, i % 3 === 2 ? hex('#ffffff') : hex('#c8d8f0')); if (i % 5 === 0) { R.pset(x + 1, y, hex('#e8f0ff')); R.pset(x, y + 1, hex('#e8f0ff')); R.pset(x + 1, y + 1, hex('#ffffff')); } }
}

// el papel pintado de damasco: rayas finas, un rombo con sus puntos, y la luz cálida que da luz(x, y) (0–1); en tranq(x, y)
// queda liso de motivo (la esquina de Atom)
const E_PAPEL = e_hx(['#16302a', '#1f3c33', '#2a4c3f', '#38604f', '#4c7660']);

function e_papel(R, x0, y0, x1, y1, luz, tranq = () => false) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let v = 1 + luz(x, y) * 2.4; const mx = ((x % 14) + 14) % 14, my = ((y % 18) + 18) % 18, q = tranq(x, y);
    if (mx < 2) v -= q ? 0.3 : 0.7;
    else if (!q) { const d = Math.abs(mx - 8) + Math.abs(my - 9); if (d === 3 || d === 0) v += 0.9; else if (d < 3) v += 0.35; if ((mx === 8 && (my === 2 || my === 16)) || ((mx === 4 || mx === 12) && my === 9)) v += 0.8; }
    let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; R.pset(x, y, E_PAPEL[Math.max(0, Math.min(4, l))]);
  }
}

// una moldura de techo (cornisa) de madera pintada: filo oscuro, cuerpo, luz y los dentículos
function e_cornisa(R, y0, c = e_hx(['#2a1a12', '#5a3a26', '#7a5236', '#9a7050'])) {
  const { rect, pset } = R; rect(0, y0, 319, y0 + 1, c[1]); rect(0, y0 + 2, 319, y0 + 3, c[2]); rect(0, y0 + 4, 319, y0 + 4, c[3]); rect(0, y0 + 5, 319, y0 + 5, c[0]);
  for (let x = 0; x < 320; x += 4) { rect(x, y0 + 6, x + 1, y0 + 7, c[1]); pset(x, y0 + 6, c[2]); } rect(0, y0 + 8, 319, y0 + 8, c[0]);
}

// el friso de cuarterones de madera (y0–y1, con el junquillo arriba y el rodapié abajo); luz(x) aclara
const E_MAD = e_hx(['#24140c', '#3e2416', '#5a3620', '#74482a', '#946038', '#b47e4c']);

function e_friso(R, x0, x1, y0, y1, luz = () => 0) {
  const { rect, pset } = R, M = E_MAD;
  rect(x0, y0, x1, y1, M[2]);
  for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (h(x >> 1, y * 7, 640) < 0.18) pset(x, y, M[(x + y) % 3 ? 1 : 3]);
  rect(x0, y0, x1, y0 + 1, M[4]); rect(x0, y0 + 2, x1, y0 + 2, M[1]); rect(x0, y0, x1, y0, M[5]);
  for (let x = x0 + 4; x + 22 <= x1; x += 28) { const a = y0 + 6, b = y1 - 7;
    rect(x, a, x + 22, b, M[1]); rect(x + 1, a + 1, x + 22, b, M[3]); rect(x + 2, a + 2, x + 21, b - 1, M[2]); rect(x + 3, a + 3, x + 20, b - 2, M[3]);
    for (let g = 0; g < 3; g++) { const gx = x + 6 + g * 6; for (let y = a + 4; y < b - 2; y++) if (h(gx, y >> 2, 641 + g) < 0.6) pset(gx + (y % 9 < 4 ? 0 : 1), y, M[2]); }
    rect(x + 21, a + 2, x + 21, b - 1, M[1]); rect(x + 2, b - 1, x + 21, b - 1, M[1]); rect(x + 2, a + 2, x + 20, a + 2, M[4]); }
  rect(x0, y1 - 4, x1, y1, M[1]); rect(x0, y1 - 4, x1, y1 - 4, M[4]); rect(x0, y1 - 3, x1, y1 - 3, M[3]);
  for (let x = x0; x <= x1; x++) { const l = luz(x); if (l > 0) for (let y = y0; y <= y1; y++) if (l > e_b4(x, y) + 0.2) e_tine(R, x, y, hex('#ffd890'), 0.18); }
}

// la tarima de tablas vista de frente y un poco desde arriba: filas que crecen hacia nosotros, juntas a matajunta, vetas,
// nudos y el brillo de las luces; luz(x, y) (−1–1) aclara u oscurece
const E_TAR = e_hx(['#2a1810', '#43281a', '#5a3622', '#70442a', '#885636', '#a46c44']);

function e_tarima(R, y0, y1, luz = () => 0, k = 0) {
  const { pset } = R; let y = y0, f = 0;
  while (y <= y1) { const alto = Math.round(3 + (y - y0) * 0.16), yb = Math.min(y1, y + alto - 1);
    let x = -Math.round(h(f, 1, 650 + k) * 60); const cortes = [];
    while (x < 320) { cortes.push(x); x += 46 + Math.round(h(x, f, 651 + k) * 40); }
    for (let yy = y; yy <= yb; yy++) for (let xx = 0; xx < 320; xx++) {
      let tabla = 0; for (let i = 0; i < cortes.length; i++) if (xx >= cortes[i]) tabla = i;
      const tono = h(tabla, f, 652 + k), veta = Math.sin(xx * 0.06 + tono * 9 + (yy - y) * 1.7) > 0.86 ? -0.7 : 0;
      let v = 2.4 + tono * 0.9 + veta + luz(xx, yy) * 2 + (yy === y ? 0.8 : 0) + (yy === yb ? -0.9 : 0);
      if (xx === cortes[tabla] || xx === cortes[tabla] - 1) v -= 1.2;
      let l = Math.floor(v); if (v - l > e_b4(xx, yy)) l++; pset(xx, yy, E_TAR[Math.max(0, Math.min(5, l))]);
    }
    y = yb + 1; f++; }
}

// una alfombra ovalada de lana (centro, radios): el campo, la cenefa de dos colores, los flecos y su trama
function e_alfombra(R, cx, cy, rx, ry, c = e_hx(['#5a1a22', '#8a2a30', '#a8403a', '#e8c890', '#2a4a3a'])) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d > 1) continue;
    const x = cx + i, y = cy + j; let col = d > 0.9 ? c[0] : d > 0.82 ? (((i >> 1) + (j >> 0)) & 1 ? c[3] : c[4]) : d > 0.76 ? c[0] : d < 0.3 ? (((i >> 2) ^ (j >> 1)) & 1 ? c[2] : c[3]) : (Math.abs(((i >> 2) + (j >> 1)) % 4) === 0 ? c[2] : c[1]);
    if (e_b4(x, y) < 0.12) col = e_mezcla(col, hex('#000000'), 0.25); R.pset(x, y, col); }
  for (let i = -rx + 3; i <= rx - 3; i += 2) { const j = Math.round(ry * Math.sqrt(1 - (i / rx) ** 2)); R.pset(cx + i, cy + j + 1, c[3]); }
}

// la sombra blanda de un objeto: oscurece en una elipse
function e_sombra(R, cx, cy, rx, ry, a = 0.35) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) e_tine(R, x, cy + j, hex('#0a0608'), a); }
}

// el árbol de Navidad (cx, punta, pie, medio ancho abajo): pisos de ramas con su filo dentado, agujas en tres verdes con
// la luz por la izquierda, bolas con su brillo, espumillón dorado, el tronco y la cesta; las luces y la estrella van aparte
const E_ABE = e_hx(['#0e2a1a', '#17402a', '#22583a', '#2e6e44', '#4a8a52', '#7aa860']);

function e_abetoAncho(top, bot, half, y) { const u = (y - top) / (bot - top), piso = (u * 4) % 1; return half * (0.12 + u * 0.7 + piso * 0.24); }

function e_abeto(R, cx, top, bot, half) {
  const { rect, pset, disco } = R;
  rect(cx - 3, bot, cx + 3, bot + 5, hex('#3a2214')); rect(cx - 3, bot, cx - 2, bot + 5, hex('#5a3622'));
  for (let y = bot + 4; y <= bot + 12; y++) { const w = 12 - Math.round((y - bot - 4) * 0.4); for (let x = cx - w; x <= cx + w; x++) pset(x, y, ((x + (y >> 1)) & 3) === 0 ? hex('#6a4a24') : (y & 1) ? hex('#a87a3a') : hex('#c8964a')); pset(cx - w, y, hex('#4a3018')); pset(cx + w, y, hex('#4a3018')); }
  rect(cx - 13, bot + 4, cx + 13, bot + 5, hex('#d8aa5a'));
  for (let y = top + 2; y < bot + 1; y++) { const w = e_abetoAncho(top, bot, half, y);
    for (let x = Math.floor(cx - w - 1); x <= cx + w + 1; x++) { const dx = (x - cx) / Math.max(1, w), filo = Math.abs(dx) > 0.86;
      if (Math.abs(x - cx) > w + (h(x, y, 660) < 0.45 ? 1 : 0)) continue; if (filo && h(x, y, 661) < 0.35) continue;
      const borde = (y - top) / (bot - top) * 4 % 1 > 0.82; let v = 2.6 - dx * 1.1 + (h(x, y, 662) - 0.5) * 1.6 - (borde ? -0.4 : 0) + ((x + y * 2) % 5 === 0 ? 0.8 : 0);
      if (Math.abs(x - cx) < 2 && h(x, y, 663) < 0.3) v -= 1.2; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, E_ABE[Math.max(0, Math.min(5, l))]); } }
  // el espumillón: dos vueltas doradas en diagonal
  for (const [a, b] of [[0.28, 0.42], [0.55, 0.7], [0.8, 0.92]]) for (let x = -half; x <= half; x++) { const y = Math.round(top + (bot - top) * (a + (b - a) * (x + half) / (2 * half)) + Math.sin(x * 0.6) * 0.8), w = e_abetoAncho(top, bot, half, y); if (Math.abs(x) < w - 1) pset(cx + x, y, (x & 1) ? hex('#f0d070') : hex('#c89a3a')); }
  // las bolas: rojas, doradas y azules, con su brillo y su sombra
  const B = [hex('#c8282e'), hex('#e8b830'), hex('#3a6ad8'), hex('#c8c8d8'), hex('#a83aa8')];
  for (let k = 0; k < 22; k++) { const u = 0.12 + h(k, 1, 664) * 0.84, y = Math.round(top + (bot - top) * u), w = e_abetoAncho(top, bot, half, y) - 2, x = Math.round(cx + (h(k, 2, 664) * 2 - 1) * w), r = u > 0.6 && k % 3 === 0 ? 2 : 1, c = B[k % 5];
    disco(x, y, r, c); pset(x - (r > 1 ? 1 : 0), y - r, e_mezcla(c, hex('#ffffff'), 0.7)); if (r > 1) pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.4)); pset(x, y - r - 1, hex('#c8c8d0')); }
}

// las luces del árbol, en espiral (las de detrás no se ven) y la estrella de la punta que destella
function e_abetoLuces(R, cx, top, bot, half, t) {
  for (let i = 0; i < 46; i++) { const u = 0.06 + i / 46 * 0.92, a = u * 26, y = Math.round(top + (bot - top) * u), w = e_abetoAncho(top, bot, half, y) - 1; if (Math.cos(a) < -0.25) continue; e_bombilla(R, Math.round(cx + Math.sin(a) * w), y, t, i * 3); }
  const s = 0.6 + 0.4 * Math.sin(t * 2.4), sy = top - 1;
  e_resplandor(R, cx, sy, 7, hex('#fff0a0'), 0.5 * s);
  for (const [dx, dy] of [[0, -3], [0, 3], [-3, 0], [3, 0], [-2, -2], [2, -2], [-2, 2], [2, 2]]) R.linea(cx, sy, cx + dx, sy + dy, Math.abs(dx) + Math.abs(dy) > 3 ? hex('#e8b830') : hex('#ffd84a'));
  R.pset(cx, sy, hex('#ffffff')); if (s > 0.85) { R.pset(cx, sy - 4, hex('#fff6c8')); R.pset(cx + 4, sy, hex('#fff6c8')); }
}

// un regalo (x0–x1, y0–y1) con su papel, la cinta en cruz, el lazo y la luz por la izquierda
function e_regalo(R, x0, y0, x1, y1, c, cinta) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#140c10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, e_mezcla(c, hex('#ffffff'), 0.3)); rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, e_mezcla(c, hex('#000000'), 0.3));
  for (let y = y0 + 2; y < y1; y += 3) for (let x = x0 + 2 + (y % 2); x < x1 - 1; x += 4) pset(x, y, e_mezcla(c, hex('#ffffff'), 0.18));
  const mx = (x0 + x1) >> 1; rect(mx - 1, y0 + 1, mx, y1 - 1, cinta); rect(x0 + 1, y0 + 3, x1 - 1, y0 + 4, cinta);
  for (const d of [-1, 1]) { R.linea(mx, y0, mx + d * 4, y0 - 3, cinta); R.linea(mx + d * 4, y0 - 3, mx + d * 2, y0, cinta); } pset(mx, y0 - 1, e_mezcla(cinta, hex('#ffffff'), 0.5));
}

// el sofá de terciopelo azul (x0–x1; respaldo desde yr, asiento en ya, base en yb): respaldo con cojines y costuras,
// brazos enrollados, cojines del asiento con su canto, faldón y patas; el terciopelo con su brillo
const E_SOF = e_hx(['#121628', '#1e2440', '#2a3456', '#3a4874', '#4e5e92', '#6a7ab0']);

function e_sofa(R, x0, x1, yr, ya, yb) {
  const { rect, pset } = R, S = E_SOF, aw = Math.round((x1 - x0) * 0.1), yBr = Math.round(yr + (ya - yr) * 0.45);
  const tercio = (x, y, v) => { v += (h(x, y, 670) - 0.5) * 0.7; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, S[Math.max(0, Math.min(5, l))]); };
  // el respaldo, en n cojines
  const n = (x1 - x0) > 120 ? 3 : 2, cw = (x1 - x0 - 2 * aw) / n;
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + aw + i * cw), b = Math.round(x0 + aw + (i + 1) * cw) - 1;
    for (let y = yr; y < ya; y++) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), w = (y - yr) / (ya - yr); if ((y === yr && (x < a + 2 || x > b - 2)) || (y === yr + 1 && (x === a || x === b))) continue;
      tercio(x, y, 3 + (0.5 - Math.abs(u - 0.45)) * 1.6 - w * 0.9 - (x === a || x === b ? 1.3 : 0) - (y === yr ? -0.8 : 0)); }
    // el capitoné: botones en dos filas al tresbolillo, con las arrugas en diagonal y su brillo
    for (let f = 0; f < 2; f++) { const by = yr + Math.round((ya - yr) * (0.3 + f * 0.36)); for (let x = a + 5 + f * 4; x < b - 3; x += 9) { pset(x, by, S[0]); pset(x + 1, by, S[1]); pset(x, by - 1, S[4]);
      for (let i = 1; i <= 3; i++) { pset(x - i, by - i, S[1]); pset(x + i, by + i, S[1]); pset(x + i, by - i, S[2]); pset(x - i, by + i, S[2]); } } } }
  // los cojines del asiento: cara de arriba y canto
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + aw + i * cw), b = Math.round(x0 + aw + (i + 1) * cw) - 1;
    for (let y = ya; y < ya + 5; y++) for (let x = a; x <= b; x++) tercio(x, y, 3.6 - (y - ya) * 0.15 - (x === a ? 1.2 : 0));
    rect(a, ya, b, ya, S[5]); for (let y = ya + 5; y < yb - 4; y++) for (let x = a; x <= b; x++) tercio(x, y, 2.4 - (y - ya - 5) * 0.12 - (x === a || x === b ? 0.8 : 0)); rect(a + 1, ya + 5, b - 1, ya + 5, S[4]); }
  // el faldón y las patas
  for (let y = yb - 4; y <= yb; y++) for (let x = x0 + 1; x < x1; x++) tercio(x, y, 1.6 - (y - yb + 4) * 0.2);
  rect(x0 + 1, yb - 4, x1 - 1, yb - 4, S[1]);
  for (const x of [x0 + 3, x1 - 5]) { rect(x, yb + 1, x + 2, yb + 4, hex('#2a1810')); pset(x, yb + 1, hex('#6a4a2a')); }
  // los brazos enrollados
  for (const [a, b, lado] of [[x0, x0 + aw, -1], [x1 - aw, x1, 1]]) {
    for (let y = yBr; y <= yb - 1; y++) for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), rollo = y < yBr + 6; if (rollo && ((y === yBr && (u < 0.2 || u > 0.8)) || (y === yBr + 1 && (u < 0.08 || u > 0.92)))) continue;
      tercio(x, y, rollo ? 4.2 - Math.abs(u - 0.4) * 3 - (y - yBr) * 0.25 : 2.8 - (lado < 0 ? -u : u) * 1.2 + (lado < 0 ? -0.3 : 0) - (y > yb - 5 ? 0.8 : 0)); }
    rect(a, yBr + 6, b, yBr + 6, S[1]); for (let y = yBr + 9; y < yb - 6; y += 6) pset(lado < 0 ? b - 2 : a + 2, y, S[1]); }
  // el filo de abajo en sombra sobre el suelo
  for (let x = x0 - 2; x <= x1 + 2; x++) for (let y = yb + 1; y <= yb + 3; y++) if (e_b4(x, y) < 0.7 - (y - yb) * 0.2) e_tine(R, x, y, hex('#000000'), 0.4);
}

// la manta de cuadros (tartán rojo y verde) caída sobre el respaldo y el asiento: x0–x1, y0–y1, con el filo de abajo en
// ondas y los flecos; los pliegues verticales la oscurecen
function e_manta(R, x0, x1, y0, y1) {
  for (let x = x0; x <= x1; x++) { const fondo = y1 - Math.round(Math.abs(Math.sin(x * 0.35)) * 3); for (let y = y0 + Math.round(Math.abs(Math.sin(x * 0.2)) * 2); y <= fondo; y++) {
    const gx = (x - x0) % 12, gy = (y - y0) % 12; let c = hex('#a8282e'); if (gx < 4 || gy < 4) c = gx < 4 && gy < 4 ? hex('#1e3a2a') : hex('#3a4a32'); if (gx === 8 || gy === 8) c = hex('#e8c860'); if (gx === 6 && gy % 2) c = hex('#f0e8d8');
    const pl = Math.sin((x - x0) * 0.42); if (pl < -0.55) c = e_mezcla(c, hex('#000000'), 0.35); else if (pl > 0.75) c = e_mezcla(c, hex('#ffffff'), 0.12); R.pset(x, y, c); }
    if (x % 2 === 0) R.linea(x, fondo + 1, x, fondo + 2, hex('#e8d8b0')); }
}

// un cojín de ganchillo o de tela (cx, cy, medio ancho w, medio alto a) con su estampado
function e_cojin(R, cx, cy, w, a, c, cL, cS, copo = false) {
  for (let j = -a; j <= a; j++) for (let i = -w; i <= w; i++) { const d = (Math.abs(i) / w) ** 3 + (Math.abs(j) / a) ** 3; if (d > 1) continue; R.pset(cx + i, cy + j, d > 0.7 ? cS : (i < -w * 0.3 && j < 0) ? cL : c); }
  if (copo) { R.pset(cx, cy, cL); for (const [dx, dy] of [[0, -2], [0, 2], [-2, 0], [2, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]) R.pset(cx + dx, cy + dy, hex('#f0f0f8')); }
  else for (let j = -a + 2; j <= a - 2; j += 2) for (let i = -w + 2; i <= w - 2; i += 2) R.pset(cx + i + (j & 2 ? 1 : 0), cy + j, cS);
}

// la ventana nevada por fuera (hueco x0–x1, y0–y1): el cielo de noche tramado con su brillo de ciudad, estrellas, la luna
// tras las nubes, las casas de enfrente con nieve en los tejados y ventanas cálidas, la farola; lo fijo (va al búfer)
function e_calleNevadaFija(R, x0, y0, x1, y1) {
  const { rect, pset, disco } = R, cl = [x0, y0, x1, y1], CI = e_hx(['#0c1230', '#141c44', '#1e2a58', '#2e3a6a', '#4a4a78', '#6a5a80']);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = (y - y0) / (y1 - y0) * 4.2 + (h(x >> 2, y >> 2, 680) - 0.5) * 0.4; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CI[Math.min(5, l)]); }
  for (let k = 0; k < 14; k++) { const x = Math.round(x0 + h(k, 1, 681) * (x1 - x0)), y = Math.round(y0 + 2 + h(k, 2, 681) * (y1 - y0) * 0.35); pset(x, y, k % 3 ? hex('#8a90c8') : hex('#e8ecff')); }
  const mx = Math.round(x0 + (x1 - x0) * 0.72), my = y0 + 8; disco(mx, my, 4, hex('#e8e4d0')); disco(mx + 2, my - 1, 4, CI[0]); pset(mx - 3, my, hex('#fff8e0'));
  // las casas de enfrente: dos tejados a dos aguas con nieve, chimeneas y ventanas cálidas
  const base = y1, techo = (x) => { const a = ((x - x0) % 38 + 38) % 38; return Math.round(base - 22 + Math.abs(a - 19) * 0.6); };
  for (let x = x0; x <= x1; x++) { const yt = techo(x); for (let y = yt; y <= base; y++) pset(x, y, y < yt + 3 ? (h(x, y, 682) < 0.7 ? hex('#f0f4fc') : hex('#c8d4ea')) : y < yt + 4 ? hex('#8a98b8') : ((x + (y >> 2)) % 5 === 0 ? hex('#3a2a3a') : hex('#4a3040'))); }
  for (let x = x0 + 5; x < x1 - 4; x += 9) { const yt = techo(x + 2) + 7; if (yt + 6 > base) continue; e_rectC(R, cl, x, yt, x + 4, yt + 5, hex('#1a1220')); e_rectC(R, cl, x + 1, yt + 1, x + 3, yt + 4, h(x, 1, 683) < 0.6 ? hex('#ffcc70') : hex('#3a3a5a')); pset(x + 2, yt + 1, hex('#e89a40')); }
  for (const cx of [x0 + 12, x0 + 49]) { const yt = techo(cx) - 5; e_rectC(R, cl, cx, yt, cx + 3, yt + 6, hex('#5a3030')); e_rectC(R, cl, cx - 1, yt - 1, cx + 4, yt, hex('#f0f4fc')); }
  // la farola con su resplandor
  const fx = x0 + 6; e_rectC(R, cl, fx, y0 + 26, fx + 1, base, hex('#1a1a28')); e_rectC(R, cl, fx - 2, y0 + 23, fx + 3, y0 + 26, hex('#2a2a3a')); e_rectC(R, cl, fx - 1, y0 + 26, fx + 2, y0 + 27, hex('#fff0b0'));
  R.recorte(cl); e_resplandor(R, fx + 0.5, y0 + 30, 14, hex('#ffe0a0'), 0.5, 1.3); R.recorte(null);
}

// lo que se mueve fuera de la ventana: la nieve, el humo de las chimeneas, una ventana que se enciende y un coche que pasa
// con sus faros, recortado al hueco
function e_calleNevadaVida(R, t, x0, y0, x1, y1, k = 0) {
  R.recorte([x0, y0, x1, y1]);
  for (const cx of [x0 + 13, x0 + 50]) { const yt = Math.round(y1 - 22 + Math.abs(((cx - x0) % 38) - 19) * 0.6) - 6; for (let i = 0; i < 4; i++) { const u = (t * 0.25 + i / 4 + cx * 0.01) % 1; R.disco(Math.round(cx + u * 9 + Math.sin(u * 5 + t) * 1.5), Math.round(yt - u * 18), Math.round(1 + u * 2.4), u < 0.5 ? hex('#5a6280') : hex('#3a4268')); } }
  const u = ((t + k * 4) % 11) / 11, cx = Math.round(x1 + 16 - u * (x1 - x0 + 40)), cy = y1 - 2;
  if (cx > x0 - 20 && cx < x1 + 16) { R.poligono([[cx - 8, cy], [cx - 6, cy - 4], [cx + 3, cy - 4], [cx + 6, cy - 1], [cx + 8, cy - 1], [cx + 8, cy + 1], [cx - 8, cy + 1]], hex('#2a1a28')); R.linea(cx - 5, cy - 3, cx + 2, cy - 3, hex('#6a8ab0')); R.pset(cx - 8, cy - 1, hex('#fff6c8')); R.pset(cx + 8, cy - 1, hex('#ff3a3a'));
    for (let i = 1; i < 10; i++) if (e_b4(cx - 8 - i, cy) < 0.8 - i * 0.07) e_tine(R, cx - 8 - i, cy - 1 + (i > 5 ? 1 : 0), hex('#fff6c8'), 0.5); }
  e_nieve(R, t, x0, y0, x1, y1, 30, k);
  R.recorte(null);
}

// el marco de la ventana (por encima de lo de fuera): el bastidor blanco con su sombra, la cruz, la escarcha de las
// esquinas y el alféizar
function e_marcoVentana(R, x0, y0, x1, y1) {
  const { rect, pset } = R, B = hex('#e8e0d0'), S = hex('#a89880'), D = hex('#4a3a30'), mx = (x0 + x1) >> 1, my = Math.round(y0 + (y1 - y0) * 0.42);
  rect(x0 - 3, y0 - 3, x1 + 3, y0 - 1, B); rect(x0 - 3, y0 - 3, x0 - 1, y1 + 1, B); rect(x1 + 1, y0 - 3, x1 + 3, y1 + 1, S); rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, D); rect(x0 - 4, y0 - 4, x0 - 4, y1 + 2, D); rect(x1 + 4, y0 - 4, x1 + 4, y1 + 2, D);
  rect(x0, y0, x1, y0, S); rect(x0, y0, x0, y1, S);
  rect(mx - 1, y0, mx + 1, y1, B); rect(mx + 1, y0, mx + 1, y1, S); rect(x0, my - 1, x1, my + 1, B); rect(x0, my + 1, x1, my + 1, S);
  for (const [cx, cy, dx, dy] of [[x0, y1, 1, -1], [x1, y1, -1, -1], [mx - 1, my - 2, -1, -1], [mx + 2, my - 2, 1, -1], [mx - 1, y1, -1, -1], [mx + 2, y1, 1, -1]]) for (let i = 0; i < 7; i++) for (let j = 0; j < 7 - i; j++) if (h(i, j, cx) < 0.55 - (i + j) * 0.05) e_tine(R, cx + dx * i, cy + dy * j, hex('#e8f0ff'), 0.55);
  rect(x0 - 6, y1 + 2, x1 + 6, y1 + 4, B); rect(x0 - 6, y1 + 4, x1 + 6, y1 + 5, S); rect(x0 - 6, y1 + 6, x1 + 6, y1 + 6, D);
}

// una cortina de terciopelo rojo (x0–x1 desde y0 hasta y1) con pliegues y recogida por un alzapaño en ya
function e_cortina(R, x0, x1, y0, y1, ya, lado) {
  const C3 = e_hx(['#3a0a12', '#5a1420', '#7a1e2a', '#9a2a34', '#b84048']);
  for (let y = y0; y <= y1; y++) { const ap = y < ya ? 1 - (y - y0) / (ya - y0) * 0.45 : 0.55 + (y - ya) / (y1 - ya) * 0.45, w = (x1 - x0) * ap, a = lado < 0 ? x0 : x1 - w;
    for (let x = Math.round(a); x <= Math.round(a + w); x++) { const v = 2.2 + Math.sin((x - a) / Math.max(4, w) * 9) * 1.4 + (lado < 0 ? -0.3 : 0.2); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; R.pset(x, y, C3[Math.max(0, Math.min(4, l))]); }
    if (y === y1) for (let x = Math.round(a); x <= Math.round(a + w); x += 2) R.pset(x, y + 1, hex('#e8b830')); }
  const ax = lado < 0 ? x0 + Math.round((x1 - x0) * 0.27) : x1 - Math.round((x1 - x0) * 0.27); R.rect(ax - 3, ya - 1, ax + 3, ya + 1, hex('#e8b830')); R.pset(ax, ya + 2, hex('#c89a2a')); R.pset(ax, ya + 3, hex('#e8b830'));
}

// el fuego de la chimenea (hueco x0–x1, base yb): los troncos, las llamas que bailan en cuatro colores, las brasas y las
// chispas que suben; devuelve la fuerza del resplandor (para teñir el salón)
function e_fuego(R, x0, x1, yb, t) {
  const { rect, pset, disco } = R, w = x1 - x0;
  for (const [a, b, y] of [[x0 + 3, x1 - 6, yb - 3], [x0 + 8, x1 - 2, yb - 6]]) { rect(a, y, b, y + 3, hex('#3a2014')); rect(a, y, b, y, hex('#6a4024')); disco(a, y + 1, 2, hex('#c89a6a')); pset(a, y + 1, hex('#7a5a3a')); }
  const fuerza = 0.8 + 0.2 * Math.sin(t * 7.3) * Math.sin(t * 3.1 + 1);
  for (let x = x0 + 2; x <= x1 - 2; x++) { const u = (x - x0) / w, env = Math.sin(u * Math.PI), alto = (6 + 12 * env) * (0.75 + 0.25 * Math.sin(t * 9 + x * 0.9) * Math.sin(t * 5.3 + x * 0.37)) * fuerza;
    for (let j = 0; j < alto; j++) { const y = yb - 5 - j, f = j / alto; if (f > 0.7 && e_b4(x, y) > (1 - f) * 2.6) continue; pset(x, y, f < 0.18 ? hex('#fff6c0') : f < 0.42 ? hex('#ffd060') : f < 0.7 ? hex('#ff8a2a') : hex('#d8402a')); } }
  for (let x = x0 + 4; x < x1 - 3; x += 2) pset(x, yb - 1, Math.sin(t * 4 + x) > 0.2 ? hex('#ff7a2a') : hex('#a82a1a'));
  for (let i = 0; i < 5; i++) { const u = (t * 0.7 + i * 0.23) % 1, x = Math.round(x0 + w * (0.3 + h(i, 1, 690) * 0.4) + Math.sin(u * 9 + i) * 3), y = Math.round(yb - 8 - u * 26); if (u < 0.9) pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c84a2a')); }
  return fuerza;
}

// un calcetín de Navidad colgado (x arriba, y0 el gancho), de color c con su puño blanco, que se mece un poco
function e_calcetin(R, x, y0, c, t, k) {
  const d = Math.round(Math.sin(t * 0.9 + k * 1.7) * 0.8), L = 13;
  R.linea(x, y0, x + d, y0 + 2, hex('#e8b830'));
  for (let j = 0; j < L; j++) { const xx = x + d + Math.round(j * d * 0.15); R.rect(xx - 3, y0 + 3 + j, xx + 2, y0 + 3 + j, j < 3 ? (j === 0 ? hex('#ffffff') : hex('#e8e4dc')) : (j % 4 === 1 ? e_mezcla(c, hex('#ffffff'), 0.25) : c)); R.pset(xx + 2, y0 + 3 + j, e_mezcla(c, hex('#000000'), 0.35)); }
  const xx = x + d * 2; R.rect(xx - 3, y0 + 3 + L, xx + 5, y0 + 6 + L, c); R.rect(xx + 4, y0 + 4 + L, xx + 6, y0 + 6 + L, c); R.rect(xx - 3, y0 + 6 + L, xx + 5, y0 + 6 + L, e_mezcla(c, hex('#000000'), 0.4)); R.pset(xx + 5, y0 + 3 + L, e_mezcla(c, hex('#ffffff'), 0.3));
}

// la tele plana (bastidor x0–x1, y0–y1) con su pie: lo de dentro lo pinta o.pantalla; devuelve el hueco de la pantalla
function e_teleMarco(R, x0, y0, x1, y1) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#0a0a10')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#3a3a48')); rect(x0, y1, x1, y1, hex('#1a1a24'));
  const mx = (x0 + x1) >> 1; rect(mx - 3, y1 + 1, mx + 3, y1 + 3, hex('#1a1a24')); rect(mx - 10, y1 + 3, mx + 10, y1 + 4, hex('#2a2a34')); rect(mx - 10, y1 + 3, mx + 10, y1 + 3, hex('#5a5a6a')); pset(x1 - 4, y1, hex('#3aa84a'));
  return [x0 + 2, y0 + 2, x1 - 2, y1 - 2];
}

// lo que sale en la tele sin o.pantalla: un menú de series sin logos ni letras (un cartel grande con su paisaje de noche
// que cambia, filas de portadas que corren y el recuadro que salta de una a otra)
function e_teleMenu(R, t, cl) {
  const [x0, y0, x1, y1] = cl, W = x1 - x0, H = y1 - y0, hb = y0 + Math.round(H * 0.5);
  e_rectC(R, cl, x0, y0, x1, y1, hex('#0e1020'));
  const tema = Math.floor(t / 4) % 3, CI = [[hex('#1a2a5a'), hex('#3a4a8a'), hex('#e8b830')], [hex('#3a1a3a'), hex('#8a3a4a'), hex('#ffd890')], [hex('#0e3a3a'), hex('#2a6a5a'), hex('#c8e8f0')]][tema];
  for (let y = y0; y < hb; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(CI[0], CI[1], (y - y0) / (hb - y0)));
  for (let x = x0; x <= x1; x++) { const yy = Math.round(hb - 4 - Math.abs(Math.sin(x * 0.11 + tema)) * H * 0.18); e_rectC(R, cl, x, yy, x, hb - 1, hex('#0a0c18')); }
  if (tema === 0) { const cx = x0 + Math.round(W * 0.66), by = hb - 4; for (const [dx, a] of [[-6, 9], [-2, 14], [3, 11], [7, 7]]) { e_rectC(R, cl, cx + dx, by - a, cx + dx + 2, by, hex('#0a0c18')); R.pset(cx + dx + 1, by - a - 1, hex('#0a0c18')); } R.pset(cx - 1, by - 8, CI[2]); R.pset(cx + 4, by - 6, CI[2]); }
  else R.disco(x0 + Math.round(W * 0.7), y0 + Math.round(H * 0.18), 3, CI[2]);
  e_rectC(R, cl, x0 + 3, hb - 10, x0 + 3 + Math.round(W * 0.32), hb - 9, hex('#e8e8f0')); e_rectC(R, cl, x0 + 3, hb - 7, x0 + 3 + Math.round(W * 0.2), hb - 7, hex('#8a8aa0'));
  e_rectC(R, cl, x0 + 3, hb - 4, x0 + 12, hb - 2, hex('#e8e8f0'));
  const tw = Math.max(6, Math.round(W / 6)), sel = Math.floor(t / 1.1) % 5, PC = e_hx(['#c83a3a', '#3a6ad8', '#e8b830', '#3aa86a', '#a83aa8', '#e86a3a']);
  for (let f = 0; f < 2; f++) { const yy = hb + 3 + f * Math.round(H * 0.24), off = f === 1 ? Math.round((t * 3) % (tw + 2)) : 0;
    for (let i = -1; i < 7; i++) { const xx = x0 + 3 + i * (tw + 2) - off, c = PC[(i + f * 2 + 6) % 6]; e_rectC(R, cl, xx, yy, xx + tw - 1, yy + Math.round(H * 0.18), e_mezcla(c, hex('#0e1020'), 0.35)); e_rectC(R, cl, xx, yy + Math.round(H * 0.12), xx + tw - 1, yy + Math.round(H * 0.18), e_mezcla(c, hex('#000000'), 0.4));
      if (f === 0 && i === sel) { R.recorte(cl); for (let x = xx - 1; x <= xx + tw; x++) { R.pset(x, yy - 1, hex('#ffffff')); R.pset(x, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); } R.linea(xx - 1, yy - 1, xx - 1, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); R.linea(xx + tw, yy - 1, xx + tw, yy + Math.round(H * 0.18) + 1, hex('#ffffff')); R.recorte(null); } } }
}

// pinta la pantalla cl con o.pantalla (o con def) y encima el reflejo suave del cristal
function e_pantalla(R, t, cl, o, def) {
  R.recorte(cl); if (o.pantalla) o.pantalla(R, t, cl); else def(R, t, cl); R.recorte(cl);
  for (let y = cl[1]; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) { const d = (x - cl[0]) - (y - cl[1]) * 1.4 - (cl[2] - cl[0]) * 0.55; if (d > 0 && d < 5 && ((x + y) & 1)) e_tine(R, x, y, hex('#ffffff'), 0.08); }
  R.recorte(null);
}

// el gato que duerme hecho un ovillo (x, y: el suelo bajo su centro); respira y mueve la punta de la cola
function e_gatoDuerme(R, x, y, t) {
  const r = Math.sin(t * 1.6) > 0 ? 1 : 0, N = hex('#d8843a'), NL = hex('#f0a858'), NS = hex('#9a5424'), K = hex('#2a1810');
  for (let j = -4 - r; j <= 0; j++) for (let i = -8; i <= 8; i++) { const d = (i / 8) ** 2 + (j / (4.5 + r)) ** 2; if (d > 1) continue; R.pset(x + i, y + j, d > 0.82 ? K : j < -2 && i < 2 ? NL : (i + 20) % 4 === 0 ? NS : N); }
  R.disco(x + 6, y - 3, 3, K); R.disco(x + 6, y - 3, 2, N); R.pset(x + 5, y - 6, K); R.pset(x + 8, y - 6, K); R.pset(x + 5, y - 5, NS); R.pset(x + 8, y - 5, NS); R.rect(x + 5, y - 3, x + 6, y - 3, K); R.pset(x + 8, y - 2, hex('#e88a8a'));
  const c = Math.round(Math.sin(t * 0.8) * 1.5); R.linea(x - 8, y, x - 3, y + 1, NS); R.linea(x - 3, y + 1, x + 2, y + 1 + (c > 0 ? 0 : 0), N); R.pset(x + 3, y + c, NL);
  e_sombra(R, x, y + 2, 9, 1, 0.3);
}

function e_salon(R, t, o, sofa) {
  const { rect, pset, disco, linea } = R;
  if (!sofa) {
    const VEN = [20, 26, 60, 76], PANT = [188, 64, 242, 96];
    e_fijo(R, 'hp:salon', () => {
      const luz = (x, y) => Math.max(0, 1 - Math.hypot(x - 131, (y - 104) * 1.2) / 120) * 0.9 + Math.max(0, 1 - Math.hypot(x - 180, y - 84) / 70) * 0.7 + Math.max(0, 1 - Math.hypot(x - 284, y - 90) / 70) * 0.35;
      e_papel(R, 0, 9, 319, 97, luz, (x, y) => x > 262 && y < 50);
      e_cornisa(R, 0);
      e_friso(R, 0, 319, 98, 123, (x) => Math.max(0, 1 - Math.abs(x - 131) / 50));
      e_tarima(R, 124, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 131, (y - 124) * 2.2) / 90) * 0.7 - (y > 168 ? 0.3 : 0));
      e_alfombra(R, 152, 156, 88, 14);
      // la ventana y lo de fuera, las cortinas con su barra y la guirnalda (la guirnalda se enciende en vida)
      e_calleNevadaFija(R, ...VEN); e_marcoVentana(R, ...VEN);
      rect(4, 15, 76, 16, hex('#2a1a12')); rect(4, 15, 76, 15, hex('#c89a3a')); disco(4, 15, 2, hex('#e8b830')); disco(76, 15, 2, hex('#e8b830'));
      e_cortina(R, 6, 22, 17, 94, 66, -1); e_cortina(R, 58, 74, 17, 94, 66, 1);
      // la corona de la pared, con su lazo
      for (let a = 0; a < Math.PI * 2; a += 0.12) for (let r = 5; r <= 8; r++) { const x = Math.round(88 + Math.cos(a) * r), y = Math.round(40 + Math.sin(a) * r); pset(x, y, h(x, y, 700) < 0.35 ? hex('#4a8a52') : h(x, y, 701) < 0.5 ? hex('#22583a') : hex('#17402a')); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + 0.3; disco(Math.round(88 + Math.cos(a) * 6.5), Math.round(40 + Math.sin(a) * 6.5), 1, hex('#d8282e')); }
      for (const d of [-1, 1]) { linea(88, 47, 88 + d * 4, 44, hex('#c8282e')); linea(88 + d * 4, 44, 88 + d * 4, 48, hex('#c8282e')); linea(88, 47, 88 + d * 2, 54, hex('#a81e24')); } pset(88, 47, hex('#ff6a6a'));
      // el sofá bajo la ventana, con los cojines y la manta
      e_sofa(R, 2, 96, 100, 122, 138);
      e_cojin(R, 22, 115, 7, 6, hex('#c8282e'), hex('#e85a5a'), hex('#8a1a20'), true); e_cojin(R, 40, 116, 7, 5, hex('#e8dcc0'), hex('#f8f0e0'), hex('#b8a888'));
      e_manta(R, 62, 90, 100, 136);
      // las zapatillas de borreguito junto al sofá y el cesto de la leña al lado de la chimenea
      for (const [x, y] of [[54, 146], [63, 148]]) { R.rect(x - 4, y - 2, x + 4, y, hex('#1a1010')); R.rect(x - 3, y - 2, x + 3, y - 1, hex('#8a2a3a')); R.rect(x - 4, y - 3, x - 1, y - 2, hex('#f0e8d8')); R.pset(x + 3, y - 2, hex('#c84a5a')); }
      for (let y = 112; y <= 126; y++) { const w = 8 - Math.round((y - 112) * 0.1); R.rect(172 - w - 6, y, 172 + w - 6, y, ((y >> 1) & 1) ? hex('#8a6a3a') : hex('#a8844a')); } for (const [x, y, c] of [[160, 110, '#6a4a2a'], [166, 108, '#7a5a34'], [172, 111, '#5a3a20']]) { R.rect(x - 2, y - 2, x + 3, y + 2, hex(c)); R.disco(x - 2, y, 2, hex('#c8a070')); R.pset(x - 2, y, hex('#8a6a40')); }
      // la chimenea: los pilares de ladrillo, el dintel, el hueco con su arco, el hogar y la repisa
      for (let y = 74; y <= 124; y++) for (let x = 102; x <= 160; x++) { const fila = Math.floor((y - 74) / 4), off = fila % 2 ? 4 : 0, junta = (y - 74) % 4 === 3 || ((x + off - 102) % 9 === 8);
        pset(x, y, junta ? hex('#5a4a44') : h(Math.floor((x + off) / 9), fila, 702) < 0.25 ? hex('#7a3a2a') : h(Math.floor((x + off) / 9), fila, 703) < 0.5 ? hex('#a85a3e') : hex('#94503a')); }
      rect(102, 74, 102, 124, hex('#c8784e')); rect(160, 74, 160, 124, hex('#5a2a1e'));
      for (let y = 88; y <= 122; y++) { const ar = y < 94 ? Math.round(Math.sqrt(Math.max(0, 36 - (94 - y) ** 2)) * 2.4) : 15; rect(131 - ar, y, 131 + ar, y, y < 100 ? hex('#140a0a') : hex('#1e100e')); }
      for (let y = 96; y < 122; y += 4) for (let x = 118 + (y % 8 ? 0 : 4); x < 145; x += 8) rect(x, y, x + 6, y + 2, hex('#2a1612'));
      rect(96, 122, 166, 124, hex('#8a8078')); rect(96, 122, 166, 122, hex('#c8bcb0')); rect(94, 125, 168, 128, hex('#6a625c')); rect(94, 125, 168, 125, hex('#a8a098'));
      rect(96, 66, 166, 73, hex('#24140c')); rect(96, 66, 166, 70, hex('#74482a')); rect(96, 66, 166, 66, hex('#b47e4c')); rect(96, 71, 166, 72, hex('#3e2416')); for (let x = 100; x < 164; x += 6) pset(x, 68, hex('#5a3620'));
      // el cuadro del lago con su castillo, encima de la repisa
      rect(110, 26, 152, 58, hex('#5a3a12')); rect(111, 27, 151, 57, hex('#c8962a')); rect(111, 27, 151, 27, hex('#f0cc6a')); rect(113, 29, 149, 55, hex('#3a2410'));
      for (let y = 30; y <= 54; y++) for (let x = 114; x <= 148; x++) { const v = y < 44 ? (y - 30) / 14 : 0; let c = y < 44 ? e_mezcla(hex('#2a2a5a'), hex('#c87a6a'), v) : e_mezcla(hex('#1a2a4a'), hex('#3a4a6a'), (Math.sin(x * 0.8 + y * 2) + 1) / 2 * 0.5); if (y >= 44 && y < 46) c = hex('#1a1a30'); pset(x, y, c); }
      for (let x = 114; x <= 148; x++) { const m = Math.round(44 - Math.max(0, 9 - Math.abs(x - 122) * 0.9) - Math.max(0, 6 - Math.abs(x - 142) * 0.8)); for (let y = m; y < 44; y++) pset(x, y, y < m + 2 && Math.abs(x - 122) < 4 ? hex('#e8e8f0') : hex('#2a2440')); }
      for (const [dx, a] of [[0, 8], [3, 12], [7, 9], [10, 6]]) rect(128 + dx, 44 - a, 129 + dx, 43, hex('#14101e')); pset(131, 37, hex('#ffd060')); pset(135, 39, hex('#ffd060')); pset(131, 47, hex('#a88a40'));
      // la cómoda de la tele: madera, puertas de cristal con la consola y las cajas, los tiradores y las patas
      rect(174, 100, 250, 126, hex('#1a0e08')); rect(175, 101, 249, 125, hex('#5a3620')); rect(175, 101, 249, 102, hex('#946038')); rect(175, 101, 249, 101, hex('#b47e4c'));
      for (let x = 176; x < 249; x++) for (let y = 104; y < 124; y++) if (h(x >> 1, y * 5, 704) < 0.14) pset(x, y, hex('#43281a'));
      for (const [a, b] of [[178, 210], [214, 246]]) { rect(a, 105, b, 122, hex('#24140c')); rect(a + 1, 106, b - 1, 121, hex('#1a1420')); rect(a + 1, 106, a + 3, 121, hex('#2a2430')); }
      rect(181, 115, 199, 120, hex('#0e0e14')); rect(181, 115, 199, 115, hex('#4a4a5a'));
      for (let x = 217, k = 0; x < 244; x += 3, k++) rect(x, 109 + (k % 3), x + 1, 121, [hex('#c83a3a'), hex('#3a6ad8'), hex('#e8b830'), hex('#3aa86a')][k % 4]);
      for (const x of [207, 217]) rect(x, 112, x + 1, 114, hex('#e8b830'));
      for (const x of [177, 246]) { rect(x, 126, x + 2, 130, hex('#24140c')); pset(x, 126, hex('#74482a')); }
      // la tele y la barra de sonido
      e_teleMarco(R, 186, 62, 244, 98); rect(196, 99, 234, 100, hex('#1a1a22')); for (let x = 198; x < 234; x += 2) pset(x, 99, hex('#3a3a48'));
      // la balda con los siete libros, los sujetalibros y la lechucita
      rect(184, 46, 248, 48, hex('#3e2416')); rect(184, 46, 248, 46, hex('#946038')); for (const x of [190, 240]) { rect(x, 49, x + 1, 53, hex('#2a2a30')); linea(x, 53, x + 4, 49, hex('#2a2a30')); }
      const LB = e_hx(['#8a2a2a', '#2a5a8a', '#2a6a3a', '#c88a2a', '#5a2a6a', '#8a5a2a', '#3a3a5a']), alt = [9, 10, 11, 12, 12, 13, 14];
      rect(190, 35, 192, 45, hex('#6a6a7a')); rect(190, 35, 190, 45, hex('#a8a8b8'));
      for (let i = 0; i < 7; i++) { const x = 194 + i * 5, a = alt[i]; rect(x, 46 - a, x + 3, 45, LB[i]); rect(x, 46 - a, x, 45, e_mezcla(LB[i], hex('#ffffff'), 0.3)); rect(x + 3, 46 - a, x + 3, 45, e_mezcla(LB[i], hex('#000000'), 0.35)); rect(x, 48 - a, x + 3, 48 - a, hex('#e8c860')); rect(x, 41, x + 3, 41, hex('#e8c860')); rect(x + 1, 44 - Math.round(a / 2), x + 2, 45 - Math.round(a / 2), hex('#f0e0b0')); }
      rect(230, 35, 232, 45, hex('#6a6a7a')); rect(232, 35, 232, 45, hex('#4a4a58'));
      disco(240, 41, 3, hex('#8a6a4a')); disco(240, 43, 3, hex('#8a6a4a')); pset(239, 40, hex('#f0e8d0')); pset(241, 40, hex('#f0e8d0')); pset(239, 40, hex('#1a1010')); pset(241, 40, hex('#1a1010')); pset(240, 42, hex('#e8a83a')); pset(238, 37, hex('#5a3a2a')); pset(242, 37, hex('#5a3a2a')); rect(238, 45, 242, 45, hex('#5a3a2a'));
      // la lámpara de la cómoda (la luz se pinta en vida)
      rect(179, 92, 181, 100, hex('#c89a3a')); rect(176, 99, 184, 100, hex('#8a6a2a')); for (let y = 80; y <= 91; y++) { const w = 3 + Math.round((y - 80) * 0.4); rect(180 - w, y, 180 + w, y, y === 91 ? hex('#c8a870') : hex('#f0dca0')); pset(180 - w, y, hex('#d8c080')); }
      // el árbol y los regalos
      e_abeto(R, 284, 52, 122, 30);
      e_regalo(R, 254, 128, 270, 140, hex('#c8282e'), hex('#e8c860')); e_regalo(R, 296, 126, 314, 140, hex('#2a5ab8'), hex('#f0f0f8')); e_regalo(R, 270, 132, 290, 142, hex('#2a7a4a'), hex('#d8282e')); e_regalo(R, 240, 134, 252, 143, hex('#e8b830'), hex('#c8282e'));
      // la repisa: la rama de pino con piñas, las velas y el reloj
      for (let x = 97; x <= 165; x++) for (let y = 62; y <= 66; y++) if (h(x, y, 705) < 0.6 - Math.abs(y - 64) * 0.12) pset(x, y, h(x, y, 706) < 0.3 ? hex('#4a8a52') : hex('#1e4a2e'));
      for (const x of [108, 150]) { disco(x, 64, 1, hex('#6a3a1a')); pset(x, 63, hex('#a8703a')); }
      for (const x of [100, 162]) { rect(x - 2, 64, x + 2, 65, hex('#c89a3a')); rect(x - 1, 56, x + 1, 63, hex('#f0e8d8')); rect(x + 1, 56, x + 1, 63, hex('#c8bca8')); }
      disco(131, 57, 5, hex('#3a2416')); disco(131, 57, 4, hex('#f0e8d0')); rect(126, 62, 136, 65, hex('#5a3620')); rect(126, 62, 136, 62, hex('#946038'));
      e_sombra(R, 152, 147, 54, 4, 0.18);
    });
    // la vida: la calle nevada, la guirnalda de la ventana, el fuego y su resplandor, los calcetines, las velas, el reloj,
    // la lámpara, la consola, la tele, el árbol y el gato
    e_calleNevadaVida(R, t, ...VEN); e_marcoVentana(R, ...VEN);
    e_guirnalda(R, 14, 19, 68, 19, 5, 11, t, 0);
    e_guirnalda(R, 96, 64, 166, 64, 3, 12, t, 20);
    const f = e_fuego(R, 117, 145, 122, t);
    e_resplandor(R, 131, 112, 30, hex('#ff9a40'), 0.32 * f, 1); e_resplandor(R, 131, 134, 50, hex('#ff9a40'), 0.22 * f, 0.3);
    [[108, hex('#c8282e')], [121, hex('#2a7a4a')], [141, hex('#c8282e')], [154, hex('#e8e4dc')]].forEach(([x, c], k) => e_calcetin(R, x, 72, c, t, k));
    for (const x of [100, 162]) { const fl = Math.sin(t * 11 + x) > 0.3; pset(x, 55, hex('#ffd060')); pset(x, 54, fl ? hex('#fff6c0') : hex('#ffd060')); if (fl) pset(x + (Math.sin(t * 7 + x) > 0 ? 1 : -1), 53, hex('#ff8a2a')); e_resplandor(R, x, 54, 6, hex('#ffd890'), 0.3); }
    { const a = t * 0.5, b = t * 0.04; linea(131, 57, Math.round(131 + Math.sin(a) * 3), Math.round(57 - Math.cos(a) * 3), hex('#1a1010')); linea(131, 57, Math.round(131 + Math.sin(b) * 2), Math.round(57 - Math.cos(b) * 2), hex('#1a1010')); }
    e_resplandor(R, 180, 88, 26, hex('#ffe0a0'), 0.35); rect(178, 92, 182, 92, hex('#fff6d0'));
    pset(197, 117, Math.sin(t * 2) > 0 ? hex('#3ad8ff') : hex('#1a5a7a'));
    e_pantalla(R, t, PANT, o, e_teleMenu);
    e_resplandor(R, 215, 104, 28, hex('#8ab0ff'), 0.12 + 0.05 * Math.sin(t * 3), 0.4);
    e_abetoLuces(R, 284, 52, 122, 30, t);
    e_gatoDuerme(R, 82, 146, t);
    return { suelo: 150, pantalla: PANT, ventana: VEN, sofa: { x0: 2, x1: 96, asiento: 122, respaldo: 100 }, chimenea: { hueco: [117, 88, 145, 122], repisa: 66 },
      arbol: { x: 284, punta: 51, pie: 132 }, libros: [194, 33, 228, 45], tele: [186, 62, 244, 98], mesa: [116, 160, 202, 166], gato: [82, 146], libre: [100, 250] };
  }
  // la cámara del sofá: el sofá grande bajo la ventana, el árbol que asoma a la izquierda y la tele grande a la derecha
  const VEN = [74, 22, 146, 74], PANT = [218, 58, 302, 102];
  e_fijo(R, 'hp:salonSofa', () => {
    const luz = (x, y) => Math.max(0, 1 - Math.hypot(x - 12, y - 90) / 80) * 0.5 + Math.max(0, 1 - Math.hypot(x - 260, y - 80) / 90) * 0.5;
    e_papel(R, 0, 9, 319, 103, luz, (x, y) => x > 262 && y < 52);
    e_cornisa(R, 0);
    e_friso(R, 0, 319, 104, 131);
    e_tarima(R, 132, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 260, (y - 132) * 2) / 90) * 0.4, 3);
    e_alfombra(R, 122, 162, 104, 12, e_hx(['#2a1a3a', '#4a2a5a', '#6a3a6a', '#e8c890', '#8a2a30']));
    e_calleNevadaFija(R, ...VEN); e_marcoVentana(R, ...VEN);
    rect(56, 13, 164, 14, hex('#2a1a12')); rect(56, 13, 164, 13, hex('#c89a3a')); disco(56, 13, 2, hex('#e8b830')); disco(164, 13, 2, hex('#e8b830'));
    e_cortina(R, 58, 78, 15, 98, 64, -1); e_cortina(R, 142, 162, 15, 98, 64, 1);
    // un cuadrito con una lechuza y otro con una foto, a los lados de la ventana
    for (const [x0, y0, x1, y1, k] of [[22, 30, 44, 52, 0], [178, 34, 196, 50, 1]]) { rect(x0, y0, x1, y1, hex('#2a1a10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#c8962a')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0cc6a')); rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, k ? hex('#d8c8a8') : hex('#2a3a5a'));
      if (k === 0) { const cx = (x0 + x1) >> 1, cy = (y0 + y1) >> 1; disco(cx, cy + 2, 5, hex('#e8e0d0')); disco(cx, cy - 3, 4, hex('#e8e0d0')); pset(cx - 2, cy - 3, hex('#1a1010')); pset(cx + 2, cy - 3, hex('#1a1010')); pset(cx, cy - 1, hex('#e8a83a')); for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y0 + 4 + ((x * 7) % 3 === 0 ? 1 : 0), hex('#e8e8f8')); }
      else { for (const [dx, c] of [[-4, hex('#c8282e')], [0, hex('#e8b830')], [4, hex('#3a6ad8')]]) { disco(((x0 + x1) >> 1) + dx, y0 + 8, 2, hex('#e8b890')); rect(((x0 + x1) >> 1) + dx - 2, y0 + 11, ((x0 + x1) >> 1) + dx + 2, y1 - 4, c); } } }
    e_sofa(R, 26, 198, 82, 116, 140);
    e_cojin(R, 52, 108, 9, 7, hex('#c8282e'), hex('#e85a5a'), hex('#8a1a20'), true); e_cojin(R, 172, 108, 9, 7, hex('#2a6a3a'), hex('#4a8a5a'), hex('#1a4a2a'), true); e_cojin(R, 74, 110, 7, 6, hex('#e8dcc0'), hex('#f8f0e0'), hex('#b8a888'));
    e_manta(R, 122, 166, 84, 136);
    // el árbol que asoma por la izquierda y sus regalos
    e_abeto(R, 4, 40, 128, 34);
    e_regalo(R, 0, 136, 18, 150, hex('#2a5ab8'), hex('#f0f0f8'));
    // la cómoda baja y la tele grande
    rect(208, 108, 316, 136, hex('#1a0e08')); rect(209, 109, 315, 135, hex('#5a3620')); rect(209, 109, 315, 110, hex('#946038')); rect(209, 109, 315, 109, hex('#b47e4c'));
    for (let x = 210; x < 315; x++) for (let y = 112; y < 134; y++) if (h(x >> 1, y * 5, 707) < 0.14) pset(x, y, hex('#43281a'));
    for (const [a, b] of [[212, 246], [250, 280], [284, 312]]) { rect(a, 113, b, 132, hex('#24140c')); rect(a + 1, 114, b - 1, 131, hex('#4a2c1a')); rect(a + 2, 115, b - 2, 130, hex('#5a3620')); rect(((a + b) >> 1) - 2, 121, ((a + b) >> 1) + 2, 122, hex('#e8b830')); }
    for (const x of [211, 312]) { rect(x, 136, x + 2, 141, hex('#24140c')); }
    e_teleMarco(R, 216, 56, 304, 104);
    rect(226, 105, 294, 107, hex('#1a1a22'));
    e_sombra(R, 112, 143, 90, 4, 0.25);
  });
  e_calleNevadaVida(R, t, ...VEN, 2); e_marcoVentana(R, ...VEN);
  e_guirnalda(R, 66, 17, 154, 17, 6, 16, t, 5);
  e_abetoLuces(R, 4, 40, 128, 34, t);
  e_pantalla(R, t, PANT, o, e_teleMenu);
  // la luz de la tele que tiembla sobre el sofá, la alfombra y la cómoda
  { const c = R.pget((PANT[0] + PANT[2]) >> 1, (PANT[1] + PANT[3]) >> 1), luzT = e_mezcla(c || hex('#6a8ad8'), hex('#a8c8ff'), 0.5), a = 0.12 + 0.05 * Math.sin(t * 5) * Math.sin(t * 1.3);
    for (let y = 82; y <= 150; y++) for (let x = 120; x <= 210; x++) { const g = 1 - Math.hypot(x - 215, (y - 100) * 1.2) / 110; if (g > 0 && ((x + y) & 1) && g * 1.4 > e_b4(x, y)) e_tine(R, x, y, luzT, a * g * 2); } }
  return { suelo: 148, pantalla: PANT, ventana: VEN, sofa: { x0: 26, x1: 198, asiento: 116, respaldo: 82, sitios: [64, 112, 160] }, mesa: [66, 154, 176, 160], tele: [216, 56, 304, 104], arbol: { x: 4, punta: 39 }, libre: [40, 200] };
}

// la mesa baja de madera (x0–x1, tablero en y) con sus patas, las palomitas, la taza que humea, el mando y un libro;
// libro = true: el libro boca abajo con la piedra roja en la tapa y una vela en su tarro (la cámara del sofá)
function e_mesaBaja(R, t, x0, x1, y, libro) {
  const { rect, pset, disco } = R;
  e_sombra(R, (x0 + x1) >> 1, y + 18, ((x1 - x0) >> 1) + 4, 2, 0.3);
  for (const x of [x0 + 4, x1 - 7]) { rect(x, y + 6, x + 3, y + 18, hex('#24140c')); rect(x, y + 6, x, y + 18, hex('#74482a')); }
  rect(x0, y, x1, y + 6, hex('#24140c')); rect(x0 + 1, y, x1 - 1, y + 3, hex('#946038')); rect(x0 + 1, y, x1 - 1, y, hex('#c8925a')); rect(x0 + 1, y + 4, x1 - 1, y + 5, hex('#5a3620'));
  for (let x = x0 + 2; x < x1 - 1; x++) if (h(x, 3, 720) < 0.3) pset(x, y + 1 + (x % 2), hex('#74482a'));
  const mx = (x0 + x1) >> 1;
  // las palomitas en su cubo de rayas
  { const bx = x0 + 14; for (let j = 0; j < 7; j++) { const w = 6 - Math.round(j * 0.25); for (let i = -w; i <= w; i++) pset(bx + i, y - 1 - j, ((i + 20) >> 1) % 2 ? hex('#c8282e') : hex('#f0f0f0')); } for (let k = 0; k < 14; k++) disco(bx - 5 + Math.round(h(k, 1, 721) * 10), y - 9 - Math.round(h(k, 2, 721) * 3), 1, k % 4 ? hex('#fff6d8') : hex('#e8c860')); }
  // la taza que humea
  { const tx = libro ? x1 - 22 : mx - 4; rect(tx - 3, y - 7, tx + 3, y - 1, hex('#1a1010')); rect(tx - 2, y - 6, tx + 2, y - 1, hex('#c8282e')); rect(tx - 2, y - 6, tx + 2, y - 6, hex('#5a2a1a')); rect(tx - 2, y - 5, tx - 2, y - 2, hex('#e85a5a')); rect(tx + 4, y - 5, tx + 5, y - 3, hex('#1a1010')); pset(tx + 4, y - 4, hex('#c8282e')); e_vapor(R, tx, y - 8, t, 0.4); }
  // el mando
  { const rx = libro ? mx + 2 : mx + 14; rect(rx, y - 2, rx + 9, y - 1, hex('#1a1a22')); pset(rx + 2, y - 2, hex('#c83a3a')); pset(rx + 5, y - 2, hex('#5a5a6a')); pset(rx + 7, y - 2, hex('#5a5a6a')); }
  if (!libro) { const bx = x1 - 22; rect(bx, y - 4, bx + 14, y - 1, hex('#1a1010')); rect(bx + 1, y - 4, bx + 13, y - 2, hex('#2a4a8a')); rect(bx + 1, y - 1, bx + 13, y - 1, hex('#f0e8d0')); rect(bx + 3, y - 3, bx + 11, y - 3, hex('#e8c860')); return; }
  // el libro boca abajo, abierto como una tienda: la tapa con la piedra roja que brilla, las hojas y el lomo
  { const bx = x0 + 34, w = 26; R.poligono([[bx, y], [bx + w / 2, y - 9], [bx + w, y]], hex('#1a1010')); R.poligono([[bx + 1, y - 1], [bx + w / 2, y - 8], [bx + w / 2, y - 1]], hex('#8a2a2a')); R.poligono([[bx + w / 2, y - 8], [bx + w - 1, y - 1], [bx + w / 2, y - 1]], hex('#6a1e1e'));
    rect(bx + 2, y - 1, bx + w - 2, y - 1, hex('#f0e8d0')); R.linea(bx + w / 2, y - 9, bx + w / 2, y - 1, hex('#c89a3a'));
    const gx = bx + 7, gy = y - 4, b = 0.5 + 0.5 * Math.sin(t * 2.2); R.poligono([[gx, gy - 2], [gx + 2, gy], [gx, gy + 2], [gx - 2, gy]], hex('#e8283a')); pset(gx - 1, gy - 1, hex('#ff8a8a')); if (b > 0.6) { e_resplandor(R, gx, gy, 5, hex('#ff5a5a'), 0.5 * b); pset(gx, gy - 3, hex('#ffd0d0')); } }
  // la vela en su tarro
  { const vx = x1 - 10; rect(vx - 3, y - 8, vx + 3, y - 1, hex('#8a8a9a')); rect(vx - 2, y - 7, vx + 2, y - 1, hex('#c8a8b8')); rect(vx - 2, y - 4, vx + 2, y - 1, hex('#e8e0d0')); const fl = Math.sin(t * 9) > 0; pset(vx, y - 5, hex('#ffd060')); pset(vx, y - 6, fl ? hex('#fff6c0') : hex('#ff9a3a')); e_resplandor(R, vx, y - 5, 7, hex('#ffd890'), 0.35); }
}

// las cuatro pistas y el relleno, en coordenadas de la cámara 'cerca' (s = 2); la general las pone a s = 1 dentro de su
// corcho. P: [x, y, ancho, alto] de cada tarjeta; la chincheta va arriba en el centro
const E_PISTAS = [[20, 26, 60, 58], [96, 22, 56, 72], [170, 28, 64, 56], [224, 88, 66, 54]];

const E_RELLENO = { mapa: [16, 96, 66, 46], nota1: [90, 102, 30, 30], nota2: [124, 112, 28, 28], cal: [158, 96, 40, 44], billete: [96, 140, 72, 0], foto: [244, 30, 32, 40], rayo: [202, 98, 0, 0] };

// una chincheta (x, y) de color c con su brillo y su sombra
function e_chincheta(R, x, y, c, s = 1) {
  if (s > 1) { e_tine(R, x + 2, y + 3, hex('#000000'), 0.35); e_tine(R, x + 3, y + 3, hex('#000000'), 0.3); R.disco(x, y, 2, hex('#140a0a')); R.disco(x, y, 2 - 0.5, c); R.pset(x - 1, y - 1, hex('#ffffff')); R.pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.4)); }
  else { e_tine(R, x + 1, y + 2, hex('#000000'), 0.35); R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, e_mezcla(c, hex('#000000'), 0.3)); R.pset(x + 1, y + 1, e_mezcla(c, hex('#000000'), 0.3)); R.pset(x, y, e_mezcla(c, hex('#ffffff'), 0.5)); }
}

// un papel (x0, y0, w, a) con su sombra en el corcho, el color c y un poco torcido por la esquina de abajo
function e_papelito(R, x0, y0, w, a, c, s) {
  const { rect, pset } = R; for (let y = y0 + s; y <= y0 + a + s; y++) for (let x = x0 + s; x <= x0 + w + s; x++) if (((x + y) & 1) || s > 1) e_tine(R, x, y, hex('#2a1408'), 0.4);
  rect(x0, y0, x0 + w, y0 + a, c); rect(x0, y0, x0 + w, y0, e_mezcla(c, hex('#ffffff'), 0.35)); rect(x0 + w, y0, x0 + w, y0 + a, e_mezcla(c, hex('#000000'), 0.18)); rect(x0, y0 + a, x0 + w, y0 + a, e_mezcla(c, hex('#000000'), 0.22));
  for (let i = 0; i < 3 * s; i++) for (let j = 0; j <= i; j++) pset(x0 + w - i, y0 + a - (3 * s - 1 - i) + j - 0, e_mezcla(c, hex('#000000'), 0.1));
}

// las gafas redondas (cx, cy, escala s): dos aros finos de alambre con su puente y el brillo en el cristal
function e_gafas(R, cx, cy, s, c = hex('#1a1424')) {
  const r = 5 * s; for (const d of [-1, 1]) { const x = cx + d * (r + s); for (let a = 0; a < Math.PI * 2; a += 0.5 / r) R.pset(Math.round(x + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), c); if (s > 1) for (let a = 0; a < Math.PI * 2; a += 0.5 / r) R.pset(Math.round(x + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), c);
    R.linea(x - Math.round(r * 0.4), cy - Math.round(r * 0.5), x - Math.round(r * 0.1), cy - Math.round(r * 0.7), hex('#ffffff')); R.linea(x + d * r, cy - 1, x + d * (r + 3 * s), cy - 2 * s, c); }
  R.linea(cx - s, cy - s, cx + s, cy - s, c); R.pset(cx, cy - 2 * s, c);
}

// la moto voladora: rueda, rueda, el depósito, el sidecar y el humo que sale; mira a la derecha
function e_moto(R, x, y, s, t) {
  const K = hex('#1a1424'), r = 3 * s; R.anillo(x - 6 * s, y, r, K); R.anillo(x + 6 * s, y, r, K); R.pset(x - 6 * s, y, K); R.pset(x + 6 * s, y, K);
  R.poligono([[x - 6 * s, y - s], [x - 2 * s, y - 5 * s], [x + 4 * s, y - 5 * s], [x + 6 * s, y - s]], hex('#3a3a4a')); R.linea(x + 3 * s, y - 6 * s, x + 7 * s, y - 8 * s, K); R.rect(x - 2 * s, y - 6 * s, x + 2 * s, y - 5 * s, hex('#c83a3a'));
  R.poligono([[x - 10 * s, y + 4 * s], [x - 14 * s, y - s], [x - 9 * s, y - 2 * s]], hex('#8a8a9a'));
  for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; R.disco(Math.round(x - 10 * s - u * 10 * s), Math.round(y + 2 * s + Math.sin(u * 6 + i) * s), Math.max(1, Math.round((1 + u * 2) * s * 0.7)), hex('#b8b8c8')); }
  for (let i = 0; i < 3; i++) R.linea(x - 12 * s, y - 4 * s + i * 3 * s, x - 16 * s - i * 2 * s, y - 4 * s + i * 3 * s, hex('#6a6a8a'));
}

// unas tijeras abiertas (cx, cy, escala s) en diagonal: dos hojas plateadas y dos aros rojos
function e_tijeras(R, cx, cy, s, ab = 0.35) {
  for (const d of [-1, 1]) { const a = -0.8 + d * ab, ex = Math.round(cx + Math.cos(a) * 11 * s), ey = Math.round(cy + Math.sin(a) * 11 * s);
    for (let i = 0; i < s; i++) R.linea(cx, cy + i, ex, ey + i, hex('#c8d0dc')); R.linea(cx, cy + s, ex, ey + s, hex('#6c7688'));
    const ax = Math.round(cx - Math.cos(a) * 6 * s), ay = Math.round(cy - Math.sin(a) * 6 * s); R.linea(cx, cy, ax, ay, hex('#4a5262')); R.anillo(ax, ay, 2 * s, hex('#c8282e')); if (s > 1) R.anillo(ax, ay, 2 * s - 1, hex('#e85a5a')); }
  R.pset(cx, cy, hex('#ffffff'));
}

// un rollo de película (cx, cy, radio r): la lata con sus agujeros y la tira que sale con perforaciones
function e_rollo(R, cx, cy, r, s) {
  R.disco(cx, cy, r, hex('#2a2a34')); R.disco(cx, cy, r - s, hex('#5a5a6a')); R.disco(cx, cy, Math.max(1, r - 2 * s), hex('#3a2a22')); R.disco(cx, cy, Math.round(r * 0.35), hex('#8a8a9a'));
  for (let k = 0; k < 3; k++) { const a = k * 2.09; R.disco(Math.round(cx + Math.cos(a) * r * 0.6), Math.round(cy + Math.sin(a) * r * 0.6), Math.max(1, Math.round(r * 0.14)), hex('#1a1a22')); }
  const y0 = cy + r - 3 * s; R.rect(cx, y0, cx + r * 2, y0 + 4 * s, hex('#3a2a22')); for (let x = cx + s; x < cx + r * 2; x += 3 * s) { R.pset(x, y0 + Math.round(s / 2), hex('#c8b890')); R.pset(x, y0 + 4 * s - Math.round(s / 2), hex('#c8b890')); }
  for (let x = cx + 4 * s; x < cx + r * 2 - s; x += 7 * s) R.rect(x, y0 + s + Math.round(s / 2), x + 4 * s, y0 + 3 * s - 1, hex('#8a6a4a'));
}

// una cara pequeña de la lista de reparto (círculo de color con pelo)
function e_carita(R, x, y, s, pelo, piel = hex('#f0c8a0')) { R.disco(x, y, 2 * s, piel); for (let i = -2 * s; i <= 2 * s; i++) R.pset(x + i, y - 2 * s + (Math.abs(i) > s ? 1 : 0), pelo); if (s > 1) for (let i = -3; i <= 3; i++) R.pset(x + i, y - 3, pelo); R.pset(x - s, y, hex('#1a1424')); R.pset(x + s, y, hex('#1a1424')); }

// una tarjeta de pista k (0–3) en (x, y, w, a) a escala s; luz 0–1 la enciende (marco dorado y destello)
function e_pista(R, k, x, y, w, a, s, t, luz) {
  const { rect, pset } = R, cs = [hex('#f6f2e6'), hex('#f2ead2'), hex('#f6f2e6'), hex('#fff4c8')][k];
  if (luz > 0) { for (let i = 1; i <= 3 * s; i++) { const f = luz * (1 - i / (3 * s + 1)); for (let xx = x - i; xx <= x + w + i; xx++) { if (e_b4(xx, y - i) < f) e_tine(R, xx, y - i, hex('#ffe08a'), 0.6); if (e_b4(xx, y + a + i) < f) e_tine(R, xx, y + a + i, hex('#ffe08a'), 0.6); } for (let yy = y - i; yy <= y + a + i; yy++) { if (e_b4(x - i, yy) < f) e_tine(R, x - i, yy, hex('#ffe08a'), 0.6); if (e_b4(x + w + i, yy) < f) e_tine(R, x + w + i, yy, hex('#ffe08a'), 0.6); } } }
  e_papelito(R, x, y, w, a, cs, s);
  const cx = x + (w >> 1);
  if (k === 0) { rect(x + 2 * s, y + 2 * s, x + w - 2 * s, y + a - 9 * s, hex('#a8c8e0')); for (let yy = y + 2 * s; yy < y + a - 9 * s; yy++) if (yy % 3 === 0) rect(x + 2 * s, yy, x + w - 2 * s, yy, hex('#b8d4e8')); e_gafas(R, cx, y + Math.round((a - 7 * s) / 2), s); R.linea(x + 4 * s, y + a - 5 * s, x + w - 6 * s, y + a - 5 * s, hex('#8a8aa0')); }
  if (k === 1) { const pel = e_hx(['#2a1a14', '#c8502a', '#7a4a2a', '#d8d8e0', '#1a1a1a']); for (let i = 0; i < 5; i++) { const yy = y + 5 * s + i * 7 * s; e_carita(R, x + 5 * s, yy, s, pel[i]); R.linea(x + 9 * s, yy, x + w - 4 * s - (i * 3 % 7) * s, yy, hex('#5a5a7a')); if (s > 1) R.linea(x + 9 * s, yy + 2, x + w - 12 * s, yy + 2, hex('#a8a8c0')); } for (let yy = y + 2 * s; yy < y + a; yy += 4 * s) pset(x + 2 * s, yy, hex('#e8a8a8')); }
  if (k === 2) { rect(x + 2 * s, y + 2 * s, x + w - 2 * s, y + a - 2 * s, hex('#3a3440')); e_rollo(R, x + 12 * s, y + Math.round(a / 2) - s, 8 * s, s); e_tijeras(R, x + w - 12 * s, y + 12 * s, s, 0.3 + 0.08 * Math.sin(t * 3)); }
  if (k === 3) { R.icono('?', x + 3 * s, y + 4 * s, hex('#c8282e'), hex('#5a1414'), 2 * s); e_moto(R, x + w - 16 * s, y + Math.round(a * 0.62) + Math.round(Math.sin(t * 2) * s), s, t); for (let i = 0; i < 4; i++) pset(x + w - 6 * s - i * 9 * s, y + 4 * s + (i % 2) * 2 * s, hex('#e8b830')); }
  if (luz > 0.8) { const g = (t * 1.3 + k * 0.4) % 2; if (g < 0.4) { const sx = x + w - 2 * s, sy = y + 2 * s, l = Math.round((1 - Math.abs(g - 0.2) * 5) * 3 * s); R.linea(sx - l, sy, sx + l, sy, hex('#ffffff')); R.linea(sx, sy - l, sx, sy + l, hex('#ffffff')); } }
  e_chincheta(R, cx, y + s, [hex('#d8282e'), hex('#2a6ad8'), hex('#e8b830'), hex('#3aa86a')][k], s);
  if (luz < 0) for (let yy = y; yy <= y + a; yy++) for (let xx = x; xx <= x + w; xx++) if ((xx + yy) & 1) e_tine(R, xx, yy, hex('#3a2410'), 0.35);
}

// el relleno del corcho (escala s; o: desplazamiento [ox, oy] de la cerca a esta cámara)
function e_rellenoCorcho(R, s, ox, oy, t) {
  const { rect, pset } = R, P = (q) => [Math.round(ox + q[0] * s / 2), Math.round(oy + q[1] * s / 2), Math.round(q[2] * s / 2), Math.round(q[3] * s / 2)], F = E_RELLENO;
  { const [x, y, w, a] = P(F.mapa); e_papelito(R, x, y, w, a, hex('#e8d8b0'), s); for (let i = 0; i < 9; i++) { const bx = x + 3 + Math.round(h(i, 1, 730) * (w - 8)), by = y + 3 + Math.round(h(i, 2, 730) * (a - 8)); R.disco(bx, by, s + 1, hex('#a8c890')); }
    for (let xx = x + 1; xx < x + w; xx++) pset(xx, Math.round(y + a * 0.6 + Math.sin(xx * 0.3) * 2 * s), hex('#5a8ac8'));
    for (let i = 0; i < 10; i++) { const u = i / 10, xx = Math.round(x + 4 * s + u * (w - 10 * s)), yy = Math.round(y + a * 0.3 + Math.sin(u * 5) * a * 0.18); if (i % 2 === 0) { pset(xx, yy, hex('#c8282e')); if (s > 1) pset(xx + 1, yy, hex('#c8282e')); } }
    R.linea(x + w - 8 * s, y + 4 * s, x + w - 4 * s, y + 8 * s, hex('#c8282e')); R.linea(x + w - 4 * s, y + 4 * s, x + w - 8 * s, y + 8 * s, hex('#c8282e')); e_chincheta(R, x + 3 * s, y + 2 * s, hex('#e8b830'), s); }
  { const [x, y, w] = P(F.nota1); e_papelito(R, x, y, w, w, hex('#f8e870'), s); for (let i = 0; i < 4; i++) R.linea(x + 2 * s, y + 4 * s + i * 3 * s, x + w - 2 * s - (i % 2) * 3 * s, y + 4 * s + i * 3 * s, hex('#7a6a2a')); }
  { const [x, y, w] = P(F.nota2); e_papelito(R, x, y, w, w, hex('#f8a8c8'), s); R.icono('rayo', x + Math.round(w / 2) - 3 * s, y + 3 * s, hex('#c8282e'), hex('#7a1a3a'), s); }
  { const [x, y, w, a] = P(F.cal); e_papelito(R, x, y, w, a, hex('#f6f2e6'), s); rect(x + 1, y + 1, x + w - 1, y + 7 * s, hex('#c8282e')); for (let xx = x + 3 * s; xx < x + w - s; xx += 4 * s) pset(xx, y + s, hex('#f0f0f0'));
    R.numero('12', x + Math.round(w / 2), y + 7 * s - s, { centro: true, rampa: [hex('#ffffff'), hex('#ffffff'), hex('#ffffff'), hex('#ffffff')] });
    R.numero('25', x + Math.round(w / 2), y + a - 3 * s, { centro: true, tam: s > 1 ? 16 : 8, rampa: [hex('#2a1a1a'), hex('#5a1a1a'), hex('#8a2020'), hex('#c8282e')] });
    e_chincheta(R, x + Math.round(w / 2), y + s, hex('#3aa86a'), s); }
  { const [x, y, w] = P(F.billete), a = 13 * s; e_papelito(R, x, y, w, a, hex('#f0b860'), s); rect(x + 1, y + 1, x + w - 1, y + 3 * s, hex('#c8502a')); for (let yy = y + 1; yy < y + a; yy += 2) pset(x + w - 9 * s, yy, hex('#a87030'));
    R.numero('9 3/4', x + 3 * s, y + a - 2 * s, { fina: s < 2, rampa: [hex('#3a1a10'), hex('#5a2a14'), hex('#7a3a1a'), hex('#8a4020')] }); e_chincheta(R, x + w - 4 * s, y + 2 * s, hex('#d8282e'), s); }
  { const [x, y, w, a] = P(F.foto); e_papelito(R, x, y, w, a, hex('#f6f2e6'), s); const fx0 = x + 2 * s, fy0 = y + 2 * s, fx1 = x + w - 2 * s, fy1 = y + a - 8 * s;
    for (let yy = fy0; yy <= fy1; yy++) rect(fx0, yy, fx1, yy, e_mezcla(hex('#1a2050'), hex('#5a4a7a'), (yy - fy0) / (fy1 - fy0)));
    const bx = (fx0 + fx1) >> 1; for (const [dx, al, wd] of [[-8, 8, 3], [-3, 14, 3], [2, 11, 3], [6, 6, 4]]) { rect(bx + dx * s / 2 * 1, fy1 - al * s / 2 * 1.2, bx + dx * s / 2 + wd * s / 2 + s, fy1, hex('#0a0c1a')); } pset(bx - 2, fy1 - 4 * s, hex('#ffd060')); pset(bx + 2 * s, fy1 - 3 * s, hex('#ffd060'));
    rect(fx0, fy1 - s, fx1, fy1, hex('#2a3a6a')); e_chincheta(R, x + Math.round(w / 2), y + s, hex('#e8b830'), s); }
}

// el hilo rojo con su comba entre dos puntos; luz (0–1) lo enciende y le corre un pulso de a hacia b
function e_hilo(R, a, b, s, t, luz = 0) {
  const L = Math.max(4, Math.hypot(b[0] - a[0], b[1] - a[1])), cae = L * 0.06; let ant = a;
  for (let i = 1; i <= L; i++) { const u = i / L, p = [Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * cae)];
    const pulso = luz > 0 && Math.abs(((t * 0.8) % 1) - u) < 0.04, c = pulso ? hex('#fff0c0') : luz > 0.5 ? hex('#ff4a4a') : hex('#b0181e');
    R.linea(ant[0], ant[1], p[0], p[1], c); if (s > 1) { R.pset(p[0], p[1] + 1, pulso ? hex('#ffd060') : luz > 0.5 ? hex('#c8282e') : hex('#6a0a10')); } ant = p; }
}

function e_corcho(R, t, o, cerca) {
  const { rect, pset, disco, linea } = R, pistas = o.pistas, s = cerca ? 2 : 1;
  // el corcho: x0–x1, y0–y1 (con el marco) y cómo se pasa de las coordenadas de la cerca a esta cámara
  const K = cerca ? [4, 14, 315, 152] : [38, 18, 256, 128], ox = cerca ? 0 : 42, oy = cerca ? 0 : 20, sc = cerca ? 1 : 0.5;
  const pos = (q) => [Math.round(ox + q[0] * sc), Math.round(oy + q[1] * sc), Math.round(q[2] * sc), Math.round(q[3] * sc)];
  e_fijo(R, cerca ? 'hp:corchoCerca' : 'hp:corcho', () => {
    const PARED = e_hx(['#141a2c', '#1c243a', '#252f4a', '#2e3a58', '#3e4a68']);
    const luzL = (x, y) => cerca ? Math.max(0, 1 - Math.hypot(x - 20, y - 150) / 260) * 1.2 : Math.max(0, 1 - Math.hypot(x - 52, y - 98) / 190) * 1.5;
    // la pared de yeso, con su grano y la luz del flexo
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1 + luzL(x, y) * 2.2 + (h(x, y, 740) - 0.5) * 0.5 + (h(x >> 3, y >> 3, 741) - 0.5) * 0.4; if (x > 268 && y < 50) v = Math.min(v, 1.6); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, PARED[Math.max(0, Math.min(4, l))]); }
    // el corcho con su marco de roble
    const [x0, y0, x1, y1] = K, CO = e_hx(['#6a4220', '#8a5a2e', '#a8703c', '#c08a4e', '#d8a868', '#ecc488']);
    for (let y = y0 + 4; y <= y1 - 4; y++) for (let x = x0 + 4; x <= x1 - 4; x++) { let v = 2.3 + luzL(x, y) * 1.4 + (h(x, y, 742) - 0.5) * 1.3 + (h(x >> 1, y >> 1, 743) < 0.08 ? -1.4 : 0) + (h(x, y, 744) < 0.04 ? 1.4 : 0); if (x > 268 && y < 50) v = 2.4 + (h(x, y, 742) - 0.5) * 0.6; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CO[Math.max(0, Math.min(5, l))]); }
    rect(x0, y0, x1, y0 + 3, hex('#5a3620')); rect(x0, y0, x0 + 3, y1, hex('#74482a')); rect(x1 - 3, y0, x1, y1, hex('#3e2416')); rect(x0, y1 - 3, x1, y1, hex('#43281a'));
    rect(x0, y0, x1, y0, hex('#b47e4c')); rect(x0, y0, x0, y1, hex('#946038')); rect(x0 + 3, y0 + 3, x1 - 3, y0 + 3, hex('#24140c')); rect(x0 + 3, y0 + 3, x0 + 3, y1 - 3, hex('#24140c')); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 2, hex('#0e1220'));
    for (let x = x0 + 6; x < x1 - 4; x += 3) if (h(x, 1, 745) < 0.5) { pset(x, y0 + 1, hex('#74482a')); pset(x, y1 - 1, hex('#5a3620')); }
    // los agujeros de chinchetas viejas
    for (let k = 0; k < (cerca ? 40 : 22); k++) pset(Math.round(x0 + 8 + h(k, 1, 746) * (x1 - x0 - 16)), Math.round(y0 + 8 + h(k, 2, 746) * (y1 - y0 - 16)), hex('#4a2a14'));
    e_rellenoCorcho(R, s, ox, oy, 0);
    if (!cerca) {
      // el rodapié y el suelo de tablas con la alfombra
      rect(0, 142, 319, 147, hex('#1a1020')); rect(0, 142, 319, 142, hex('#4a4a5a'));
      e_tarima(R, 148, 179, (x, y) => Math.max(0, 1 - Math.hypot(x - 60, (y - 148) * 2) / 200) * 0.5 - 0.4, 7);
      e_alfombra(R, 170, 168, 80, 9, e_hx(['#1a2a3a', '#2a4a5a', '#3a6a7a', '#e8c890', '#8a2a30']));
      // el escritorio de la izquierda: el tablero, los cajones, el portátil, el bote de lápices y los libros
      rect(0, 128, 74, 133, hex('#24140c')); rect(0, 128, 74, 130, hex('#946038')); rect(0, 128, 74, 128, hex('#c8925a')); rect(2, 133, 70, 166, hex('#3e2416')); rect(3, 134, 69, 165, hex('#5a3620'));
      for (const y of [136, 147, 158]) { rect(40, y, 68, y + 8, hex('#24140c')); rect(41, y + 1, 67, y + 7, hex('#74482a')); rect(52, y + 3, 56, y + 4, hex('#e8b830')); } rect(4, 140, 6, 166, hex('#2a1810'));
      rect(10, 116, 34, 127, hex('#1a1a22')); rect(11, 117, 33, 126, hex('#2a3a5a')); rect(6, 127, 38, 128, hex('#8a8a9a'));
      rect(52, 116, 58, 127, hex('#2a2a3a')); rect(53, 117, 57, 127, hex('#4a6a9a')); for (const [x, c] of [[53, '#c8282e'], [55, '#e8b830'], [57, '#3aa86a']]) linea(x, 116, x + (x - 55), 108, hex(c));
      for (const [y, c] of [[124, '#8a2a2a'], [121, '#2a5a8a'], [118, '#c88a2a']]) { rect(62, y, 73, y + 2, hex(c)); rect(62, y + 2, 73, y + 2, e_mezcla(hex(c), hex('#000000'), 0.4)); }
      // el flexo: base, brazo articulado y la pantalla que mira al corcho
      rect(20, 125, 30, 127, hex('#1a1a22')); linea(25, 125, 29, 104, hex('#c83a3a')); linea(26, 125, 30, 104, hex('#8a2424')); linea(29, 104, 40, 96, hex('#c83a3a')); disco(29, 104, 1, hex('#1a1a22'));
      R.poligono([[38, 92], [46, 88], [48, 98], [42, 100]], hex('#c83a3a')); linea(46, 88, 48, 98, hex('#ff8a6a'));
      // la ventanita con su cortina, a la izquierda arriba
      rect(4, 26, 32, 80, hex('#e8e0d0')); rect(6, 28, 30, 78, hex('#14183a')); R.recorte([6, 28, 30, 78]); e_calleNevadaFija(R, 6, 28, 30, 78); R.recorte(null); rect(17, 28, 18, 78, hex('#e8e0d0')); rect(6, 52, 30, 53, hex('#e8e0d0')); rect(2, 80, 34, 82, hex('#c8c0b0'));
      // la librería de la derecha con libros sin letras, una planta y una caja
      rect(262, 54, 318, 160, hex('#24140c')); rect(264, 56, 316, 158, hex('#3e2416'));
      const LB = e_hx(['#8a2a2a', '#2a5a8a', '#2a6a3a', '#c88a2a', '#5a2a6a', '#8a5a2a', '#3a3a5a', '#a8a8b8']);
      for (const [y, k] of [[78, 0], [102, 1], [126, 2], [150, 3]]) { rect(264, y, 316, y + 2, hex('#74482a')); rect(264, y, 316, y, hex('#a8703f'));
        if (k === 1) continue; let x = 266; while (x < 314) { const w = 3 + Math.round(h(x, k, 747) * 3), a = 14 + Math.round(h(x, k, 748) * 8), c = LB[Math.floor(h(x, k, 749) * 8)]; if (x + w > 314) break; rect(x, y - a, x + w - 1, y - 1, c); rect(x, y - a, x, y - 1, e_mezcla(c, hex('#ffffff'), 0.25)); rect(x, y - a + 3, x + w - 1, y - a + 3, hex('#e8c860')); x += w + (h(x, k, 750) < 0.15 ? 4 : 0); } }
      rect(268, 92, 282, 101, hex('#8a6a4a')); rect(268, 92, 282, 92, hex('#b8946a')); disco(300, 92, 4, hex('#2a6a3a')); rect(296, 96, 304, 101, hex('#c86a3a'));
      rect(262, 52, 318, 54, hex('#74482a')); rect(262, 52, 318, 52, hex('#a8703f'));
      // las sombras del escritorio y de la librería en el suelo, y la papelera con bolas de papel
      e_sombra(R, 36, 168, 40, 2, 0.35); e_sombra(R, 290, 162, 32, 2, 0.35);
      for (let j = 0; j < 12; j++) { const w = 5 + Math.round(j * 0.15); for (let i = -w; i <= w; i++) pset(86 + i, 166 - j, (i + j) % 3 === 0 ? hex('#5a5a6a') : hex('#2a2a34')); }
      for (const [x, y] of [[83, 153], [89, 154], [86, 151]]) { R.disco(x, y, 2, hex('#e8e4d8')); pset(x - 1, y - 1, hex('#ffffff')); pset(x + 1, y + 1, hex('#a8a498')); }
      R.disco(100, 170, 2, hex('#e8e4d8')); pset(99, 169, hex('#ffffff'));
    } else {
      // el tablero de la mesa visto desde arriba, con sus vetas
      for (let y = 154; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 2.6 + Math.sin(x * 0.05 + Math.sin(y * 0.3) * 2 + h(y, 1, 751) * 3) * 0.5 + (y === 154 ? 1.4 : 0) - (y - 154) * 0.03 + (h(x, y, 752) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, E_TAR[Math.max(0, Math.min(5, l))]); }
      rect(0, 153, 319, 153, hex('#1a0e08'));
      // el ovillo rojo con el hilo que sube al corcho, la caja de chinchetas, la lupa y las tijeras
      disco(30, 166, 8, hex('#6a0a10')); disco(30, 165, 7, hex('#b0181e')); for (let a = 0; a < 6; a++) linea(Math.round(30 + Math.cos(a) * 6), Math.round(165 + Math.sin(a) * 6), Math.round(30 - Math.cos(a + 2) * 6), Math.round(165 - Math.sin(a + 2) * 6), hex('#e83a3a'));
      rect(64, 160, 92, 172, hex('#1a1a22')); rect(65, 161, 91, 171, hex('#a8a8b8')); rect(66, 162, 90, 170, hex('#5a5a6a')); for (let k = 0; k < 16; k++) e_chincheta(R, 68 + Math.round(h(k, 1, 753) * 20), 163 + Math.round(h(k, 2, 753) * 6), [hex('#d8282e'), hex('#2a6ad8'), hex('#e8b830'), hex('#3aa86a')][k % 4], 1);
      disco(206, 166, 8, hex('#1a1a22')); disco(206, 166, 7, hex('#c89a3a')); disco(206, 166, 6, hex('#a8d0e8')); pset(203, 163, hex('#ffffff')); pset(204, 163, hex('#ffffff')); linea(212, 171, 226, 177, hex('#1a1010')); linea(212, 172, 226, 178, hex('#5a3a2a'));
      e_tijeras(R, 120, 168, 1, 0.25);
    }
  });
  // la vida: las tarjetas (encendidas o no), el hilo, el corcho que brilla con el flexo, el gato, el portátil
  const luzDe = (k) => pistas == null ? 0 : Math.max(-1, Math.min(1, (pistas - k) * 2)), PI = E_PISTAS.map(pos);
  const pin = (q) => [q[0] + (q[2] >> 1), q[1] + s];
  const ext = (q) => [Math.round(ox + q[0] * sc + q[2] * sc / 2), Math.round(oy + q[1] * sc + s)];
  const hilos = [[pin(PI[0]), pin(PI[1]), 1], [pin(PI[1]), pin(PI[2]), 2], [pin(PI[2]), pin(PI[3]), 3], [pin(PI[0]), [Math.round(ox + (E_RELLENO.mapa[0] + 3) * sc * (cerca ? 1 : 1)), Math.round(oy + (E_RELLENO.mapa[1] + 2) * sc)], 0], [pin(PI[2]), ext(E_RELLENO.foto), 0], [pin(PI[3]), ext(E_RELLENO.cal), 0]];
  for (const [a, b, k] of hilos) e_hilo(R, a, b, s, t + k * 0.3, k > 0 ? Math.max(0, luzDe(k)) : (pistas == null ? 0 : 0));
  PI.forEach((q, k) => e_pista(R, k, q[0], q[1], q[2], q[3], s, t, luzDe(k) > 0 ? luzDe(k) : pistas == null ? 0 : -1));
  for (const [a, b, k] of hilos) if (k > 0 && luzDe(k) > 0.5) { const u = (t * 0.8) % 1; R.disco(Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u + Math.sin(u * Math.PI) * Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.06), s, hex('#fff0c0')); }
  if (!cerca) {
    // la luz del flexo sobre el corcho, que tiembla un poco, la nieve de la ventanita, el portátil y el gato con su cola
    const f = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 2.1); R.pset(43, 97, hex('#fff6d0')); R.pset(44, 98, hex('#fff6d0')); e_resplandor(R, 46, 96, 8, hex('#fff0c0'), 0.6 * f);
    for (let y = 60; y < 128; y++) for (let x = 46; x < 130; x++) { const g = 1 - Math.hypot(x - 46, (y - 96) * 1.3) / 90; if (g > 0 && ((x ^ y) & 1) && g > e_b4(x, y) * 0.8) e_tine(R, x, y, hex('#ffe8b0'), 0.14 * f); }
    R.recorte([6, 28, 30, 78]); e_nieve(R, t, 6, 28, 30, 78, 12, 3); R.recorte(null); rect(17, 28, 18, 78, hex('#e8e0d0')); rect(6, 52, 30, 53, hex('#e8e0d0'));
    { const fa = Math.floor(t / 2) % 3; rect(12, 118, 32, 125, hex('#2a3a5a')); for (let i = 0; i < 3; i++) rect(13, 119 + i * 2, 13 + ((fa + i) % 3 + 1) * 6, 119 + i * 2, i === fa ? hex('#e8b830') : hex('#8ab0e0')); }
    // el reloj de pared, que anda
    { const cx = 19, cy = 102; disco(cx, cy, 7, hex('#1a1010')); disco(cx, cy, 6, hex('#f0e8d0')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k / 6 * Math.PI) * 5), Math.round(cy + Math.sin(k / 6 * Math.PI) * 5), hex('#5a4a3a')); const a = t * 0.6, b = 1.2 + t * 0.05; linea(cx, cy, Math.round(cx + Math.sin(a) * 4), Math.round(cy - Math.cos(a) * 4), hex('#1a1010')); linea(cx, cy, Math.round(cx + Math.sin(b) * 3), Math.round(cy - Math.cos(b) * 3), hex('#c83a3a')); }
    // el gato negro en la balda vacía: cuerpo, cabeza con orejas, ojos que parpadean y la cola que cuelga y se mueve
    { const gx = 290, gy = 101, K = hex('#16121c'), KL = hex('#3a3046'); R.poligono([[gx - 9, gy], [gx - 7, gy - 7], [gx + 4, gy - 8], [gx + 7, gy], [gx - 9, gy]], K); disco(gx + 6, gy - 10, 4, K); R.poligono([[gx + 3, gy - 13], [gx + 4, gy - 17], [gx + 6, gy - 13]], K); R.poligono([[gx + 7, gy - 13], [gx + 9, gy - 17], [gx + 10, gy - 12]], K); linea(gx - 6, gy - 7, gx + 2, gy - 8, KL);
      if (Math.floor(t * 0.5) % 4 !== 0 || (t % 2) > 0.15) { pset(gx + 5, gy - 10, hex('#e8d84a')); pset(gx + 8, gy - 10, hex('#e8d84a')); }
      for (let i = 0; i < 14; i++) { const u = i / 13, sw = Math.sin(t * 1.6 - u * 3) * u * 4; pset(Math.round(gx - 8 + sw), gy + 1 + i, K); pset(Math.round(gx - 7 + sw), gy + 1 + i, i % 4 ? K : KL); } }
  } else {
    // el hilo que sube del ovillo al corcho y la taza que humea
    e_hilo(R, [32, 158], [Math.round(E_RELLENO.mapa[0] + 6), Math.round(E_RELLENO.mapa[1] + E_RELLENO.mapa[3] - 4)], 2, t, 0);
    rect(262, 152, 278, 170, hex('#1a1010')); rect(263, 153, 277, 169, hex('#2a5ab8')); rect(263, 153, 277, 154, hex('#1a1a30')); rect(264, 155, 265, 168, hex('#5a8ae8')); rect(278, 157, 282, 165, hex('#1a1010')); rect(279, 158, 280, 164, hex('#2a5ab8'));
    e_vapor(R, 270, 151, t, 0.2, hex('#e8e4f0'), 18);
  }
  return cerca ? { suelo: 172, pistas: PI, chinchetas: PI.map(pin), corcho: K, mesa: 154, libre: [100, 250] }
    : { suelo: 160, pistas: PI, chinchetas: PI.map(pin), corcho: K, escritorio: [0, 128, 74, 166], flexo: [44, 96], libreria: [262, 54, 318, 160], gato: [290, 101], libre: [84, 250] };
}

// lo que sale en un monitor del plató sin o.pantalla: el castillo de noche con su lago y las ventanas encendidas
function e_monitorCastillo(R, t, cl) {
  const [x0, y0, x1, y1] = cl, W = x1 - x0, H = y1 - y0;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H; e_rectC(R, cl, x0, y, x1, y, v < 0.62 ? e_mezcla(hex('#0e1440'), hex('#3a3a7a'), v / 0.62) : e_mezcla(hex('#14183a'), hex('#0a0c20'), (v - 0.62) / 0.38)); }
  for (let k = 0; k < 12; k++) if (Math.sin(t * 2 + k) > -0.3) R.pset(Math.round(x0 + h(k, 1, 760) * W), Math.round(y0 + h(k, 2, 760) * H * 0.4), hex('#e8e8ff'));
  R.disco(Math.round(x0 + W * 0.8), Math.round(y0 + H * 0.18), Math.max(2, Math.round(H * 0.08)), hex('#f0ecd8'));
  const hz = Math.round(y0 + H * 0.62), cx = Math.round(x0 + W * 0.45), u = H / 40;
  for (let x = x0; x <= x1; x++) { const m = Math.round(hz - 2 - Math.abs(Math.sin((x - x0) * 0.09)) * 4 * u); for (let y = m; y < hz; y++) R.pset(x, y, hex('#0a0c1e')); }
  for (const [dx, al, w] of [[-9, 12, 3], [-5, 18, 3], [-1, 24, 4], [4, 16, 3], [8, 20, 3], [12, 10, 4]]) { const a = Math.round(al * u), xa = Math.round(cx + dx * u), xb = xa + Math.round(w * u); for (let y = hz - a; y < hz; y++) for (let x = xa; x <= xb; x++) R.pset(x, y, hex('#0a0c1e')); R.poligono([[xa - 1, hz - a], [(xa + xb) >> 1, hz - a - Math.round(5 * u)], [xb + 1, hz - a]], hex('#0a0c1e'));
    for (let y = hz - a + 3; y < hz - 2; y += Math.max(2, Math.round(3 * u))) if (h(dx, y, 761) < 0.5) R.pset((xa + xb) >> 1, y, Math.sin(t * 3 + dx + y) > -0.6 ? hex('#ffd060') : hex('#a87a30')); }
  for (let y = hz; y <= y1; y += 2) { const x = Math.round(cx + Math.sin(t * 2 + y) * 2); R.linea(x - 3, y, x + 3, y, hex('#a87a30')); }
}

// el marco de grabación del monitor: las esquinas, el punto rojo que late y el código de tiempo que corre
function e_hud(R, t, cl) {
  const [x0, y0, x1, y1] = cl, c = hex('#f0f0f0'), L = 4;
  for (const [x, y, dx, dy] of [[x0 + 2, y0 + 2, 1, 1], [x1 - 2, y0 + 2, -1, 1], [x0 + 2, y1 - 2, 1, -1], [x1 - 2, y1 - 2, -1, -1]]) { R.linea(x, y, x + dx * L, y, c); R.linea(x, y, x, y + dy * L, c); }
  if (Math.floor(t * 1.5) % 2 === 0) R.disco(x0 + 6, y0 + 7, 1, hex('#ff3a3a'));
  if (x1 - x0 > 70) { const f = Math.floor(t * 24) % 24, sgs = Math.floor(t) % 60, m = 12 + Math.floor(t / 60); R.numero(`01:${m}:${String(sgs).padStart(2, '0')}:${String(f).padStart(2, '0')}`, (x0 + x1) >> 1, y1 - 3, { fina: true, centro: true, rampa: [c, c, c, c] }); }
}

// el foco de cine (fresnel) en lo alto o en su pie: la carcasa con aletas, las viseras abiertas y la lente encendida;
// dir: hacia dónde mira (−1 izquierda, 1 derecha, 0 abajo)
function e_fresnel(R, x, y, dir, gel = hex('#fff0b0')) {
  const { rect, pset } = R; rect(x - 5, y - 4, x + 5, y + 4, hex('#0a0a10')); rect(x - 4, y - 3, x + 4, y + 3, hex('#2a2a36')); for (let i = -3; i <= 3; i += 2) rect(x + i, y - 3, x + i, y - 2, hex('#4a4a58'));
  if (dir === 0) { rect(x - 4, y + 4, x + 4, y + 5, gel); R.linea(x - 5, y + 5, x - 8, y + 8, hex('#2a2a36')); R.linea(x + 5, y + 5, x + 8, y + 8, hex('#2a2a36')); pset(x, y + 5, hex('#ffffff')); }
  else { const lx = x + dir * 5; rect(Math.min(lx, lx + dir), y - 3, Math.max(lx, lx + dir), y + 3, gel); pset(lx + dir, y, hex('#ffffff')); R.linea(lx + dir, y - 4, lx + dir * 5, y - 7, hex('#2a2a36')); R.linea(lx + dir, y + 4, lx + dir * 5, y + 7, hex('#2a2a36')); }
}

// el haz de luz de un foco: un cono tramado que aclara lo que hay debajo, del punto (x, y) hacia (xb, yb) con ancho final w
function e_haz(R, x, y, xb, yb, w, a, c = hex('#fff0c0')) {
  const n = Math.max(Math.abs(xb - x), Math.abs(yb - y)), nx = -(yb - y) / n, ny = (xb - x) / n;
  for (let i = 0; i <= n; i++) { const u = i / n, cx = x + (xb - x) * u, cy = y + (yb - y) * u, ww = 2 + w * u;
    for (let j = -ww; j <= ww; j += 0.7) { const px = Math.round(cx + nx * j), py = Math.round(cy + ny * j), g = (1 - Math.abs(j) / ww) * (1 - u * 0.5); if (((px + py) & 1) && g > e_b4(px, py) * 0.9) e_tine(R, px, py, c, a * g); } }
}

// la claqueta sin letras (x, y: la esquina de abajo a la izquierda; ab 0–1: el palo abierto)
function e_claqueta(R, x, y, ab = 0) {
  const { rect, pset } = R; rect(x, y - 12, x + 18, y, hex('#0a0a10')); rect(x + 1, y - 11, x + 17, y - 1, hex('#1e1e26'));
  for (let k = 0; k < 3; k++) rect(x + 2, y - 9 + k * 3, x + 16, y - 9 + k * 3, hex('#d8d8e0')); rect(x + 9, y - 10, x + 9, y - 2, hex('#d8d8e0'));
  rect(x, y - 15, x + 18, y - 13, hex('#0a0a10')); for (let i = 0; i < 18; i += 4) { rect(x + i, y - 15, x + i + 1, y - 13, hex('#f0f0f0')); pset(x + i + 2, y - 14, hex('#f0f0f0')); }
  const a = -ab * 0.5; for (let i = 0; i <= 18; i++) { const px = Math.round(x + Math.cos(a) * i), py = Math.round(y - 17 + Math.sin(a) * i); rect(px, py - 1, px, py + 1, (Math.floor(i / 3) % 2) ? hex('#f0f0f0') : hex('#0a0a10')); }
  pset(x, y - 17, hex('#8a8a9a'));
}

// una figurita de fondo del equipo (6–12 px): x, y = sus pies; ropa, pelo; pose: 'anda', 'clava', 'pinta', 'quieto'
function e_currito(R, x, y, t, ropa, pelo, pose = 'quieto', dir = 1) {
  const { rect, pset } = R, piel = hex('#e8b890'), paso = pose === 'anda' ? Math.floor(t * 6) % 2 : 0;
  rect(x - 1, y - 3, x - 1, y - 1 + (paso ? -1 : 0), hex('#2a2a3a')); rect(x + 1, y - 3, x + 1, y - 1 + (paso ? 0 : -1), hex('#2a2a3a'));
  rect(x - 2, y - 8, x + 2, y - 4, ropa); rect(x - 1, y - 11, x + 1, y - 9, piel); rect(x - 1, y - 11, x + 1, y - 11, pelo); pset(x - dir, y - 10, pelo);
  if (pose === 'clava') { const g = Math.sin(t * 9) > 0; R.linea(x + dir * 2, y - 7, x + dir * 4, g ? y - 9 : y - 6, piel); rect(x + dir * 4, g ? y - 11 : y - 7, x + dir * 5, g ? y - 9 : y - 6, hex('#5a5a6a')); }
  else if (pose === 'pinta') { const g = Math.round(Math.sin(t * 3) * 3); R.linea(x + dir * 2, y - 7, x + dir * 4, y - 9 + g, piel); pset(x + dir * 5, y - 10 + g, hex('#a8a090')); }
  else rect(x + dir * 2, y - 7, x + dir * 2, y - 5, piel);
}

function e_plato(R, t, o, monitor) {
  const { rect, pset, disco, linea } = R;
  if (!monitor) {
    const PANT = [240, 106, 268, 122];
    e_fijo(R, 'hp:plato', () => {
      // el techo negro y las dos vigas de celosía con los focos
      rect(0, 0, 319, 179, hex('#0a0c14'));
      for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if (h(x >> 2, y >> 2, 770) < 0.08) pset(x, y, hex('#12141e'));
      for (const [y, c] of [[6, hex('#2a2e3a')], [20, hex('#3a3e4c')]]) { const ap = x => x > 262 && y < 14; rect(0, y, 319, y, c); rect(0, y + 5, 319, y + 5, c); for (let x = 0; x < 320; x += 6) { if (ap(x)) continue; linea(x, y, x + 3, y + 5, c); linea(x + 3, y + 5, x + 6, y, c); } }
      for (const x of [34, 88, 150, 206, 250]) { rect(x, 26, x, 30, hex('#3a3e4c')); e_fresnel(R, x, 34, 0, x === 150 ? hex('#c8d8ff') : hex('#fff0b0')); }
      // las paredes acolchadas del estudio, con su costura en cuadros
      for (let y = 40; y < 134; y++) for (let x = 0; x < 320; x++) { const cx = x % 16, cy = (y - 40) % 12; let c = hex('#22262f'); if (cx === 0 || cy === 0) c = hex('#16181f'); else if (cx === 1 || cy === 1) c = hex('#2c313c'); else if ((cx === 8 && cy === 6)) c = hex('#16181f'); pset(x, y, c); }
      rect(0, 38, 319, 40, hex('#1a1c24')); rect(0, 38, 319, 38, hex('#3a3e4c'));
      // el decorado: la parte desnuda de la izquierda (trasera de contrachapado con riostras)
      const CON = e_hx(['#6a5034', '#8a6a46', '#a8845a', '#c8a474']);
      const contra = (a, b, ya, yb) => { for (let y = ya; y <= yb; y++) for (let x = a; x <= b; x++) { let v = 1.8 + Math.sin(x * 0.4 + h(y >> 3, 1, 771) * 6) * 0.4 + (h(x, y, 772) - 0.5) * 0.6 + ((x - a) % 24 === 0 ? -1.4 : 0); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, CON[Math.max(0, Math.min(3, l))]); } };
      contra(30, 52, 50, 132); linea(30, 132, 52, 60, hex('#5a4026')); linea(31, 132, 53, 60, hex('#c8a474')); rect(30, 90, 52, 92, hex('#5a4026'));
      // el muro de piedra pintada del Gran Comedor con su ventanal gótico, los pilares, los estandartes y las antorchas
      const PI = e_hx(['#3a3632', '#5a544c', '#7a7268', '#948a7c', '#aaa090']);
      for (let y = 42; y <= 128; y++) for (let x = 52; x <= 206; x++) { const f = Math.floor((y - 42) / 7), off = f % 2 ? 6 : 0, bx = Math.floor((x - 52 + off) / 12), junta = (y - 42) % 7 === 6 || (x - 52 + off) % 12 === 11; let v = 2.3 + (h(bx, f, 773) - 0.5) * 1.1 + ((y - 42) % 7 === 0 ? 0.8 : 0) + (h(x, y, 774) - 0.5) * 0.5; if (junta) v = 0.6; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, PI[Math.max(0, Math.min(4, l))]); }
      for (let x = 52; x <= 206; x++) { const hh = Math.round(4 + h(x >> 2, 1, 775) * 3); for (let y = 42; y < 42 + hh; y++) if (x > 180) pset(x, y, CON[2]); }
      for (const x of [52, 196]) { rect(x, 42, x + 10, 128, PI[1]); rect(x + 1, 42, x + 3, 128, PI[4]); rect(x + 8, 42, x + 10, 128, PI[0]); rect(x - 1, 50, x + 11, 53, PI[3]); rect(x - 1, 53, x + 11, 54, PI[0]); }
      // el ventanal: el arco ojival, el emplomado en rombos, la luz azul de detrás
      const vx0 = 106, vx1 = 150, vy0 = 48, vy1 = 112, vm = (vx0 + vx1) >> 1;
      const dentro = (x, y) => { if (x < vx0 || x > vx1 || y > vy1) return false; if (y >= vy0 + 18) return true; const r = (vx1 - vx0) * 0.9, d1 = Math.hypot(x - (vx1 - r), y - (vy0 + 18)), d2 = Math.hypot(x - (vx0 + r), y - (vy0 + 18)); return d1 < r && d2 < r && y >= vy0 - 8; };
      for (let y = vy0 - 10; y <= vy1 + 2; y++) for (let x = vx0 - 3; x <= vx1 + 3; x++) { if (dentro(x, y)) { const rom = ((x - vm + y) % 8 + 8) % 8 === 0 || ((x - vm - y) % 8 + 8) % 8 === 0; pset(x, y, rom ? hex('#2a3048') : e_mezcla(hex('#6a8ad8'), hex('#c8d8ff'), Math.max(0, 1 - Math.hypot(x - vm, y - 80) / 40))); } else if (dentro(x - 2, y) || dentro(x + 2, y) || dentro(x, y + 2) || dentro(x, y - 2)) pset(x, y, PI[0]); }
      rect(vm, vy0 - 6, vm, vy1, hex('#3a3632')); rect(vx0, 80, vx1, 81, hex('#3a3632')); rect(vx0 - 4, vy1 + 1, vx1 + 4, vy1 + 3, PI[4]); rect(vx0 - 4, vy1 + 3, vx1 + 4, vy1 + 3, PI[0]);
      for (const [x, c, cs] of [[76, hex('#a8202a'), hex('#6a1018')], [174, hex('#1e6a3a'), hex('#0e4224')]]) { rect(x - 7, 58, x + 7, 60, hex('#c89a3a')); for (let y = 60; y < 96; y++) { const w = y > 88 ? 7 - (y - 88) : 7; rect(x - w, y, x + w, y, c); rect(x - w, y, x - w + 1, y, cs); rect(x + w - 1, y, x + w, y, cs); } rect(x - 5, 64, x + 5, 64, hex('#e8b830')); R.poligono([[x - 3, 70], [x + 3, 70], [x, 78]], e_mezcla(c, hex('#ffffff'), 0.25)); }
      for (const x of [94, 162]) { rect(x - 1, 86, x + 1, 96, hex('#2a2018')); rect(x - 3, 84, x + 3, 86, hex('#4a3a2a')); }
      // la mitad sin hacer: el contrachapado, sus riostras y el andamio con sus tablones
      contra(206, 262, 42, 132); for (const [a, b] of [[206, 230], [232, 262]]) { linea(a, 132, b, 60, hex('#5a4026')); linea(a + 1, 132, b + 1, 60, hex('#c8a474')); } rect(206, 96, 262, 98, hex('#5a4026')); rect(206, 96, 262, 96, hex('#c8a474'));
      for (const x of [210, 254]) { rect(x, 54, x + 1, 132, hex('#8a8e9a')); rect(x, 54, x, 132, hex('#c8ccd8')); } for (const y of [70, 104]) { rect(206, y, 258, y + 2, hex('#a8845a')); rect(206, y, 258, y, hex('#d8b484')); rect(206, y + 3, 258, y + 3, hex('#3a2a1a')); linea(210, y + 3, 254, y + 33, hex('#6a6e7a')); }
      for (let y = 72; y < 132; y += 5) rect(262, y, 268, y, hex('#a8845a')); rect(262, 68, 262, 132, hex('#8a6a46')); rect(268, 68, 268, 132, hex('#8a6a46'));
      // la tarima del decorado: el suelo de losas, la mesa larga y su banco
      for (let y = 126; y <= 136; y++) for (let x = 46; x <= 212; x++) { const f = Math.floor((y - 126) / 4), lo = (x + f * 9) % 18 === 0 || (y - 126) % 4 === 3; pset(x, y, lo ? PI[0] : h(Math.floor((x + f * 9) / 18), f, 776) < 0.4 ? PI[2] : PI[3]); }
      rect(46, 136, 212, 138, hex('#2a2620')); rect(46, 136, 212, 136, PI[4]);
      rect(98, 112, 176, 115, hex('#3e2416')); rect(98, 112, 176, 112, hex('#946038')); for (const x of [102, 170]) rect(x, 116, x + 2, 126, hex('#2a180e')); rect(104, 119, 170, 120, hex('#5a3620')); for (const x of [106, 168]) rect(x, 121, x + 1, 126, hex('#2a180e'));
      for (const x of [112, 130, 150, 164]) { rect(x - 2, 109, x + 2, 111, hex('#c89a3a')); pset(x, 108, hex('#e8b830')); }
      // el suelo de hormigón del estudio: manchas, cinta en cruz, cables y la vía del travelín
      const HO = e_hx(['#1e2026', '#2a2c34', '#363942', '#444852', '#555a66']);
      for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.9 + (h(x >> 3, y >> 2, 777) - 0.5) * 0.7 + (h(x, y, 778) - 0.5) * 0.5 + (y - 138) * 0.012 - (h(x >> 4, y >> 3, 779) < 0.12 ? 0.8 : 0); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, HO[Math.max(0, Math.min(4, l))]); }
      for (const [x, y, c] of [[100, 150, '#e8c040'], [160, 156, '#e8c040'], [214, 150, '#d8402a'], [132, 166, '#3aa8e8']]) { linea(x - 3, y - 2, x + 3, y + 2, hex(c)); linea(x - 3, y + 2, x + 3, y - 2, hex(c)); }
      for (const [y0, cae, x0, x1] of [[146, 4, 40, 230], [174, 3, 0, 120], [168, 2, 200, 319]]) for (let x = x0; x <= x1; x++) { const y = Math.round(y0 + Math.sin((x - x0) / (x1 - x0) * Math.PI * 1.5) * cae); pset(x, y, hex('#0a0a0e')); pset(x, y - 1, hex('#2a2c34')); }
      for (let x = 50; x < 260; x += 6) rect(x, 165, x + 2, 168, hex('#4a3a2a')); for (const y of [164, 168]) { rect(46, y, 264, y, hex('#8a8e9a')); rect(46, y - 1, 264, y - 1, hex('#c8ccd8')); }
      // la mesa de vídeo: el carrito, el monitor y la silla de director (sin letras)
      rect(234, 124, 274, 127, hex('#1a1a22')); rect(234, 124, 274, 124, hex('#5a5a6a')); rect(236, 128, 272, 146, hex('#2a2a34')); rect(237, 129, 271, 135, hex('#1a1a22')); rect(238, 137, 270, 143, hex('#1a1a22'));
      for (let x = 240; x < 268; x += 4) pset(x, 132, Math.floor(x / 4) % 3 ? hex('#3aa84a') : hex('#e8b830'));
      for (const x of [238, 270]) { disco(x, 149, 2, hex('#0a0a10')); pset(x, 149, hex('#5a5a6a')); }
      rect(238, 104, 270, 124, hex('#0a0a10')); rect(236, 102, 272, 104, hex('#1a1a22')); rect(236, 102, 236, 116, hex('#1a1a22')); rect(272, 102, 272, 116, hex('#1a1a22'));
      rect(282, 126, 302, 128, hex('#c8a474')); rect(282, 112, 302, 120, hex('#1a1a20')); rect(282, 112, 302, 112, hex('#3a3a46')); rect(284, 129, 300, 131, hex('#1a1a20'));
      linea(282, 126, 300, 150, hex('#8a6a46')); linea(302, 126, 284, 150, hex('#8a6a46')); for (const x of [282, 302]) rect(x, 112, x + 1, 150, hex('#a8845a'));
      // las cajas de manzana con la claqueta encima (la claqueta se pinta en vida)
      for (const [x, y] of [[176, 152], [180, 144]]) { rect(x, y - 8, x + 18, y, hex('#3a2a1a')); rect(x + 1, y - 7, x + 17, y - 1, hex('#a8845a')); rect(x + 1, y - 7, x + 17, y - 7, hex('#d8b484')); rect(x + 6, y - 5, x + 12, y - 4, hex('#3a2a1a')); }
      // el foco de pie de la derecha: trípode, mástil y la cabeza que mira al decorado
      linea(300, 160, 292, 172, hex('#1a1a22')); linea(300, 160, 308, 172, hex('#1a1a22')); linea(300, 160, 300, 172, hex('#1a1a22')); rect(299, 92, 300, 160, hex('#3a3a46')); rect(299, 92, 299, 160, hex('#6a6a7a'));
      e_fresnel(R, 300, 86, -1);
      // los sacos de arena en los pies, el rollo de cable, el cubo de pintura y la caja de herramientas
      for (const [x, y] of [[296, 171], [36, 160]]) { R.disco(x, y, 3, hex('#4a3a24')); R.rect(x - 5, y - 2, x + 5, y + 1, hex('#6a5434')); R.rect(x - 5, y - 2, x + 5, y - 2, hex('#8a7048')); R.pset(x, y - 1, hex('#3a2a18')); }
      for (let r = 2; r <= 6; r++) for (let a = 0; a < 6.3; a += 0.25) pset(Math.round(150 + Math.cos(a) * r * 1.6), Math.round(174 + Math.sin(a) * r * 0.5), r % 2 ? hex('#0a0a0e') : hex('#2a2c34'));
      R.rect(218, 126, 226, 132, hex('#1a1a22')); R.rect(219, 127, 225, 132, hex('#c8c4b8')); R.rect(219, 127, 225, 128, hex('#7a7268')); R.linea(218, 126, 222, 122, hex('#3a3a46')); R.linea(226, 126, 222, 122, hex('#3a3a46'));
      R.rect(60, 146, 76, 152, hex('#8a1a1a')); R.rect(60, 146, 76, 146, hex('#c83a3a')); R.rect(66, 144, 70, 145, hex('#1a1a22')); R.rect(60, 149, 76, 149, hex('#5a1010'));
      for (const [x, y] of [[226, 160], [84, 172]]) { R.linea(x - 4, y, x + 4, y, hex('#e8e8e8')); R.linea(x, y - 1, x, y + 1, hex('#e8e8e8')); }
    });
    // la vida: los haces de luz con motas, las antorchas, la grúa con la cámara, la gente del equipo, el monitor, la claqueta
    e_haz(R, 150, 40, 128, 128, 26, 0.26, hex('#c8d8ff')); e_haz(R, 88, 40, 96, 120, 18, 0.2); e_haz(R, 206, 40, 186, 124, 16, 0.16); e_haz(R, 292, 86, 200, 120, 22, 0.22);
    for (let k = 0; k < 18; k++) { const u = (t * 0.05 + h(k, 1, 780)) % 1, x = Math.round(130 + (h(k, 2, 780) - 0.5) * 40 + Math.sin(t * 0.6 + k) * 4), y = Math.round(50 + u * 76); if (Math.sin(t * 2 + k) > 0) pset(x, y, hex('#e8eeff')); }
    for (const x of [94, 162]) { const fl = Math.sin(t * 10 + x) > 0; rect(x - 1, 80, x + 1, 83, hex('#ff8a2a')); pset(x, 79, fl ? hex('#fff6c0') : hex('#ffd060')); pset(x + (fl ? 1 : -1), 78, hex('#ffb040')); e_resplandor(R, x, 81, 12, hex('#ffb060'), 0.35); }
    e_resplandor(R, 128, 80, 26, hex('#a8c0ff'), 0.12);
    // el pintor en lo alto del andamio, el carpintero que clava abajo y el tramoyista que cruza con un tablón
    e_currito(R, 226, 70, t, hex('#e8e0d0'), hex('#5a3a2a'), 'pinta', -1); for (let y = 58; y < 66; y++) if (h(y, 1, 781) < 0.6) pset(206, y, hex('#948a7c'));
    e_currito(R, 244, 104, t, hex('#3a6ad8'), hex('#c8a060'), 'clava', 1);
    { const u = (t / 12) % 1, x = Math.round(214 - u * 170); if (x > 40 && x < 214) { e_currito(R, x, 140, t, hex('#c86a2a'), hex('#2a1a14'), 'anda', -1); rect(x - 10, 128, x + 8, 129, hex('#c8a474')); rect(x - 10, 129, x + 8, 129, hex('#8a6a46')); } }
    // la grúa: el carro con ruedas, la columna, el brazo que sube y baja, los contrapesos y la cámara con su piloto
    { const bx = 34, by = 156, px = 36, py = 114, a = -0.42 + Math.sin(t * 0.35) * 0.12, ca = Math.cos(a), sa = Math.sin(a), L = 78, B = 26;
      rect(bx - 16, by - 4, bx + 16, by, hex('#1a1a22')); rect(bx - 16, by - 4, bx + 16, by - 4, hex('#5a5a6a')); for (const dx of [-13, 13]) { disco(bx + dx, by + 2, 3, hex('#0a0a10')); disco(bx + dx, by + 2, 1, hex('#6a6a7a')); }
      rect(px - 2, py, px + 2, by - 4, hex('#2a2a34')); rect(px - 2, py, px - 2, by - 4, hex('#6a6a7a')); disco(px, py, 3, hex('#1a1a22')); pset(px - 1, py - 1, hex('#8a8a9a'));
      const ex = Math.round(px + ca * L), ey = Math.round(py + sa * L), cx = Math.round(px - ca * B), cy = Math.round(py - sa * B);
      for (let i = -1; i <= 1; i++) linea(cx, cy + i, ex, ey + i, i < 0 ? hex('#8a8e9a') : i > 0 ? hex('#2a2a34') : hex('#5a5e6a'));
      for (let k = 0; k < 3; k++) { const wx = Math.round(px - ca * (B - 2 - k * 3)), wy = Math.round(py - sa * (B - 2 - k * 3)); rect(wx - 1, wy - 4, wx + 1, wy + 4, hex('#0a0a10')); pset(wx - 1, wy - 4, hex('#5a5a6a')); }
      rect(ex - 6, ey - 2, ex + 6, ey + 6, hex('#0a0a10')); rect(ex - 5, ey - 1, ex + 5, ey + 5, hex('#2a2a34')); rect(ex - 5, ey - 1, ex + 5, ey - 1, hex('#5a5a6a')); rect(ex + 6, ey, ex + 11, ey + 4, hex('#0a0a10')); rect(ex + 11, ey - 1, ex + 13, ey + 5, hex('#1a1a22')); pset(ex + 12, ey + 2, hex('#4a6a9a'));
      disco(ex - 2, ey - 5, 3, hex('#1a1a22')); disco(ex + 3, ey - 5, 3, hex('#1a1a22')); pset(ex - 2, ey - 5, hex('#5a5a6a')); pset(ex + 3, ey - 5, hex('#5a5a6a'));
      pset(ex - 4, ey + 1, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#6a1a1a')); for (let i = 0; i < 12; i++) pset(Math.round(ex - 4 - i * ca * 2), Math.round(ey + 6 + i * 0.8), hex('#0a0a10')); }
    e_pantalla(R, t, PANT, o, e_monitorCastillo); if (o.hud !== false) e_hud(R, t, PANT);
    e_claqueta(R, 182, 136, o.claqueta ?? 0);
    pset(316, 66, Math.sin(t * 2) > 0 ? hex('#3ae86a') : hex('#1a6a3a'));
    return { suelo: 154, pantalla: PANT, monitor: [236, 102, 272, 146], silla: [282, 112, 302, 150], claqueta: [182, 119, 200, 136], cajas: [176, 136, 198, 152], grua: { base: [34, 156], camara: 'x 100–125, y 70–90, se mueve' }, ventanal: [106, 40, 150, 112], decorado: [46, 42, 262, 138], andamio: [206, 70, 258, 132], mesaDecorado: [98, 112, 176, 126], foco: [292, 86], libre: [70, 230] };
  }
  // la cámara del monitor: el plató desenfocado detrás, el monitor grande con su visera, el carrito y dos sillas
  const PANT = [118, 48, 244, 110];
  e_fijo(R, 'hp:platoMonitor', () => {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y < 40 ? 0.2 : y < 128 ? 1 + Math.sin(x * 0.03) * 0.3 : 1.6) + (h(x >> 3, y >> 3, 790) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#0a0c14', '#1a1e2a', '#2a2e3a', '#3a3e4a'])[Math.max(0, Math.min(3, l))]); }
    // el decorado desenfocado: manchas del muro de piedra, el ventanal azul y los estandartes
    for (let y = 44; y < 128; y++) for (let x = 0; x < 320; x++) { const e = Math.min(1, (y - 44) / 8, (128 - y) / 8), v = (Math.sin(x * 0.08) + Math.sin(y * 0.11 + x * 0.02)) * 0.25 + 0.5; pset(x, y, e_mezcla(R.pget(x, y), e_mezcla(hex('#3e3a36'), hex('#5e5850'), v), e * 0.85)); }
    for (let y = 36; y < 116; y++) for (let x = 248; x < 300; x++) { const d = Math.hypot((x - 273) / 24, (y - 76) / 38); if (d < 1) pset(x, y, e_mezcla(R.pget(x, y), e_mezcla(hex('#a8c0f0'), hex('#4a5a8a'), d), (1 - d) * 0.9)); }
    for (const x of [62, 210]) for (let y = 40; y < 130; y++) for (let i = -7; i <= 7; i++) pset(x + i, y, e_mezcla(R.pget(x + i, y), hex('#6a645a'), (1 - Math.abs(i) / 7) * 0.6));
    for (let y = 106; y < 126; y++) for (let x = 0; x < 320; x++) { const g = Math.min(1, (y - 106) / 5, (126 - y) / 5); pset(x, y, e_mezcla(R.pget(x, y), hex('#3a2418'), g * 0.7)); }
    for (const [x, c] of [[30, hex('#7a1e28')], [92, hex('#1a5a32')]]) for (let y = 52; y < 102; y++) for (let i = -10; i <= 10; i++) { const g = Math.min(1, (1 - Math.abs(i) / 10) * 1.6, (y - 52) / 6, (102 - y) / 6); pset(x + i, y, e_mezcla(R.pget(x + i, y), c, g * 0.85)); }
    // el suelo de hormigón con la cinta
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.6 + (h(x >> 3, y >> 2, 791) - 0.5) * 0.8 + (h(x, y, 792) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#1e2026', '#2a2c34', '#363942', '#444852'])[Math.max(0, Math.min(3, l))]); }
    rect(0, 131, 319, 131, hex('#14161c'));
    for (const [x, y] of [[40, 172], [280, 168]]) { linea(x - 4, y - 2, x + 4, y + 2, hex('#e8c040')); linea(x - 4, y + 2, x + 4, y - 2, hex('#e8c040')); }
    // las dos sillas de director: el marco de madera en tijera, la lona negra del asiento y del respaldo
    for (const x of [20, 66]) { rect(x, 112, x + 30, 122, hex('#1a1a20')); rect(x, 112, x + 30, 113, hex('#3a3a46')); for (let i = 0; i < 30; i += 3) pset(x + i, 117, hex('#24242c'));
      rect(x + 2, 136, x + 28, 139, hex('#1a1a20')); rect(x + 2, 136, x + 28, 136, hex('#3a3a46'));
      for (const xx of [x, x + 29]) { rect(xx, 108, xx + 1, 166, hex('#a8845a')); rect(xx, 108, xx, 166, hex('#d8b484')); } rect(x - 2, 132, x + 3, 134, hex('#8a6a46')); rect(x + 27, 132, x + 32, 134, hex('#8a6a46'));
      linea(x + 1, 140, x + 29, 166, hex('#8a6a46')); linea(x + 29, 140, x + 1, 166, hex('#8a6a46')); linea(x + 2, 140, x + 30, 166, hex('#5a4026')); rect(x - 1, 166, x + 31, 167, hex('#5a4026')); e_sombra(R, x + 15, 168, 18, 2, 0.35); }
    // el carrito: el tablero con el guion, los cascos y el walkie (el café, en vida), el frente con cajones y las ruedas
    rect(104, 128, 262, 132, hex('#0e0e14')); rect(104, 128, 262, 128, hex('#4a4a58')); rect(108, 133, 258, 160, hex('#1e1e26')); for (const y of [136, 148]) { rect(112, y, 254, y + 9, hex('#14141a')); rect(112, y, 254, y, hex('#2e2e38')); rect(178, y + 4, 186, y + 5, hex('#8a8a9a')); }
    for (const x of [112, 254]) { rect(x - 1, 160, x + 1, 166, hex('#2a2a34')); disco(x, 168, 3, hex('#0a0a10')); pset(x, 168, hex('#5a5a6a')); }
    e_sombra(R, 183, 170, 82, 3, 0.35);
    rect(132, 121, 160, 127, hex('#e8e4d8')); rect(132, 121, 160, 121, hex('#ffffff')); for (let y = 123; y < 127; y += 2) linea(136, y, 154 - (y % 4) * 3, y, hex('#8a8aa0')); for (let x = 134; x < 160; x += 5) pset(x, 120, hex('#8a8a9a')); rect(130, 124, 132, 127, hex('#2a5ab8'));
    for (let a = Math.PI; a <= Math.PI * 2; a += 0.08) pset(Math.round(214 + Math.cos(a) * 7), Math.round(126 + Math.sin(a) * 6), hex('#1a1a22')); disco(207, 126, 2, hex('#1a1a22')); disco(221, 126, 2, hex('#1a1a22')); pset(206, 125, hex('#5a5a6a'));
    rect(246, 116, 252, 127, hex('#1a1a22')); rect(247, 117, 251, 121, hex('#3a3a4a')); rect(248, 110, 248, 116, hex('#1a1a22'));
    // el monitor: el pie, el bastidor, la visera negra de lona y el piloto
    rect(176, 115, 186, 128, hex('#1a1a22')); rect(177, 115, 177, 128, hex('#4a4a58')); rect(162, 126, 200, 128, hex('#2a2a34')); rect(162, 126, 200, 126, hex('#5a5a6a'));
    rect(114, 44, 248, 115, hex('#0a0a10')); rect(115, 45, 247, 45, hex('#3a3a48')); rect(114, 113, 248, 115, hex('#1a1a24')); pset(242, 114, hex('#3aa84a')); for (let x = 200; x < 238; x += 3) pset(x, 114, hex('#2a2a38'));
    R.poligono([[108, 34], [254, 34], [248, 44], [114, 44]], hex('#16161c')); linea(108, 34, 254, 34, hex('#3a3a46')); for (let x = 112; x < 252; x += 10) linea(x, 35, x + 2, 43, hex('#22222a'));
    R.poligono([[108, 34], [114, 44], [114, 90], [104, 78]], hex('#1e1e26')); R.poligono([[254, 34], [248, 44], [248, 90], [258, 78]], hex('#121218')); linea(104, 78, 108, 34, hex('#3a3a46'));
    // el foco de pie a la derecha con su bandera negra
    rect(292, 70, 293, 166, hex('#3a3a46')); rect(292, 70, 292, 166, hex('#6a6a7a')); linea(292, 166, 282, 176, hex('#1a1a22')); linea(293, 166, 304, 176, hex('#1a1a22')); e_fresnel(R, 292, 64, -1);
    rect(270, 48, 284, 58, hex('#0a0a10')); linea(284, 53, 292, 53, hex('#3a3a46'));
  });
  // la vida: las manchas de luz desenfocadas que respiran, el monitor, el café, el walkie, el foco
  for (let k = 0; k < 9; k++) { const x = Math.round(14 + h(k, 1, 793) * 92), y = Math.round(20 + h(k, 2, 793) * 36), r = 3 + (k % 3), b = 0.5 + 0.5 * Math.sin(t * (0.7 + k * 0.13) + k); if (b > 0.2) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d <= 1 && (d < 0.7 || ((x + i + y + j) & 1))) e_tine(R, x + i, y + j, k % 3 ? hex('#ffd890') : hex('#a8c8ff'), 0.35 * b); } }
  for (const x of [176, 212]) e_resplandor(R, x, 30, 9, hex('#ffb060'), 0.25 + 0.1 * Math.sin(t * 7 + x));
  // las velas de la mesa del decorado, desenfocadas, y alguien del equipo que cruza por detrás, borroso
  for (let k = 0; k < 6; k++) { const x = 8 + k * 17, b = 0.6 + 0.4 * Math.sin(t * 5 + k * 2); e_resplandor(R, x, 108, 4, hex('#ffc070'), 0.7 * b); }
  { const u = (t / 9) % 1, x = Math.round(-20 + u * 130), y = 100 + Math.round(Math.abs(Math.sin(t * 5)) * 1); if (x < 112) { for (let j = -16; j <= 14; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i / 6, j / (j < -9 ? 5 : 14)); if (j < -9) { const dh = Math.hypot(i / 4, (j + 13) / 4); if (dh < 1) e_tine(R, x + i, y + j, hex('#14161c'), (1 - dh) * 0.9); } else if (d < 1) e_tine(R, x + i, y + j, hex('#1a1c26'), (1 - d) * 0.85); } } }
  e_haz(R, 286, 64, 210, 160, 20, 0.1);
  e_pantalla(R, t, PANT, o, e_monitorCastillo); if (o.hud !== false) e_hud(R, t, PANT);
  { const c = R.pget(181, 79); e_resplandor(R, 181, 128, 60, e_mezcla(c || hex('#3a4a8a'), hex('#a8c0ff'), 0.4), 0.18, 0.18); }
  { const cx = 236; rect(cx - 4, 118, cx + 4, 127, hex('#e8e4d8')); rect(cx - 4, 118, cx + 4, 119, hex('#5a3a2a')); rect(cx - 4, 122, cx + 4, 124, hex('#8a6a4a')); rect(cx + 5, 120, cx + 6, 124, hex('#e8e4d8')); e_vapor(R, cx, 116, t, 0.7, hex('#c8c8d8'), 18); }
  pset(249, 112, Math.floor(t * 1.4) % 3 === 0 ? hex('#ff3a3a') : hex('#4a1a1a'));
  e_claqueta(R, 108, 127, o.claqueta ?? 0);
  return { suelo: 164, pantalla: PANT, monitor: [104, 34, 258, 128], carrito: [104, 128, 262, 170], sillas: [{ x: 35, asiento: 136 }, { x: 81, asiento: 136 }], cafe: [236, 118], claqueta: [108, 110, 126, 127], libre: [10, 104] };
}

// lo que va delante en el plató general: los cables del suelo de delante y la base del trípode de un foco a la izquierda
function e_platoDelante(R, t) {
  for (let x = 0; x <= 150; x++) { const y = Math.round(176 + Math.sin(x * 0.05) * 2); R.pset(x, y, hex('#0a0a0e')); R.pset(x, y - 1, hex('#3a3c46')); }
  R.rect(0, 171, 12, 179, hex('#14141a')); R.rect(0, 171, 12, 171, hex('#3a3a46')); R.linea(4, 171, 16, 179, hex('#1a1a22'));
}

// un plato de la moviola (cx, cy; radios rx, ry) visto desde arriba: el disco de aluminio, la película enrollada con su
// brillo, el núcleo y las marcas que giran a la velocidad v
function e_plato_(R, cx, cy, rx, ry, t, v, lleno = 0.7) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d > 1) continue; const a = Math.atan2(j / ry, i / rx);
    let c; if (d > 0.94) c = hex('#3a3e44'); else if (d > lleno) c = (Math.floor((a + t * v) * 3 / Math.PI) & 1) ? hex('#9aa0a8') : hex('#b8bec8'); else if (d > 0.24) c = (i < -rx * 0.2 && j < 0) ? hex('#6a4a34') : (Math.floor(d * 40) % 3 === 0 ? hex('#2a1a12') : hex('#4a3020')); else if (d > 0.14) c = hex('#c8ccd4'); else c = hex('#2a2a30');
    R.pset(cx + i, cy + j, c); }
  const a = t * v; R.pset(Math.round(cx + Math.cos(a) * rx * 0.19), Math.round(cy + Math.sin(a) * ry * 0.19), hex('#ffffff'));
  for (let i = -rx; i <= rx; i++) R.pset(cx + i, cy + ry + 1, hex('#14161a'));
}

// una tira de película colgada (x desde y0 hasta y1), con sus perforaciones y fotogramas; se mece con el aire
function e_tira(R, x, y0, y1, t, k) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / (y1 - y0), xx = Math.round(x + Math.sin(t * 1.2 + k * 1.7) * u * 2.5 + Math.sin(y * 0.15 + k) * u);
    R.rect(xx - 1, y, xx + 2, y, hex('#3a2a20')); R.pset(xx - 1, y, (y % 3) ? hex('#2a1a12') : hex('#c8b890')); R.pset(xx + 2, y, (y % 3) ? hex('#2a1a12') : hex('#c8b890')); if (y % 7 < 5) R.rect(xx, y, xx + 1, y, (y + k * 7) % 21 < 7 ? hex('#8a6a4a') : hex('#6a5a5a')); }
}

// un recorte de película caído en el suelo (x, y): un rizo con su brillo
function e_recorte(R, x, y, k) { const L = 5 + (k % 4), a = h(k, 1, 800) * Math.PI; for (let i = 0; i < L; i++) { const px = Math.round(x + Math.cos(a) * i + Math.sin(i * 0.9) * 1.5), py = Math.round(y + Math.sin(a) * i * 0.4); R.pset(px, py, i % 3 ? hex('#4a3020') : hex('#c8b890')); R.pset(px, py + 1, hex('#2a1a12')); } R.pset(x, y, hex('#e8d8b0')); }

// la papelera de rejilla (x centro, y el suelo) rebosante de recortes de película
function e_papelera(R, t, x, y) {
  e_sombra(R, x + 2, y + 1, 14, 2, 0.4);
  for (let j = 0; j < 26; j++) { const w = 10 + Math.round(j * 0.15), yy = y - j; for (let i = -w; i <= w; i++) { const xx = x + i; R.pset(xx, yy, ((i + j) % 4 === 0 || (i - j + 100) % 4 === 0) ? hex('#8a8e9a') : (Math.abs(i) > w - 2 ? hex('#3a3e46') : hex('#1a1a22'))); } }
  R.rect(x - 14, y - 27, x + 14, y - 26, hex('#c8ccd8')); R.rect(x - 14, y - 25, x + 14, y - 25, hex('#4a4e5a')); R.rect(x - 10, y, x + 10, y, hex('#3a3e46'));
  for (let k = 0; k < 6; k++) { const bx = x - 10 + k * 4, sw = Math.sin(t * 1.3 + k) * 1.2; for (let i = 0; i < 9 + (k % 3) * 3; i++) { const px = Math.round(bx + Math.sin(i * 0.5 + k) * 3 + sw * i / 10), py = y - 27 - i + (i > 6 ? Math.round((i - 6) * 1.2) : 0); R.pset(px, py, i % 3 ? hex('#4a3020') : hex('#c8b890')); R.pset(px + 1, py, hex('#2a1a12')); } }
}

function e_montaje(R, t, o, moviola) {
  const { rect, pset, disco, linea } = R, gira = o.gira ?? 1;
  const ESP = e_hx(['#12141c', '#1a1e28', '#232836', '#2e3444']);
  // la espuma acústica en cuñas, en paneles con su marco
  const espuma = (x0, y0, x1, y1, luz) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const cx = (x - x0) % 8, cy = (y - y0) % 8, cel = ((Math.floor((x - x0) / 8) + Math.floor((y - y0) / 8)) & 1); let v = 1.5 + (cel ? (cx < 4 ? 0.6 : -0.4) : (cy < 4 ? 0.6 : -0.4)) + luz(x, y); let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, ESP[Math.max(0, Math.min(3, l))]); } };
  if (!moviola) {
    const PANT = [130, 78, 156, 96];
    e_fijo(R, 'hp:montaje', () => {
      rect(0, 0, 319, 179, hex('#0e1016'));
      espuma(0, 10, 319, 122, (x, y) => (x > 262 && y < 50) ? -0.6 : Math.max(0, 1 - Math.hypot(x - 150, y - 90) / 120) * 0.8);
      for (let x = 0; x < 320; x += 64) rect(x, 10, x + 1, 122, hex('#0a0c12')); rect(0, 8, 319, 10, hex('#1a1c24')); rect(0, 0, 319, 7, hex('#0a0b10'));
      // la moqueta con los recortes y los cables
      for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 1.2 + (h(x, y, 803) - 0.5) * 0.9 + (h(x >> 2, y >> 1, 804) - 0.5) * 0.4 + Math.max(0, 1 - Math.hypot(x - 170, (y - 128) * 2.2) / 110) * 1.8; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#16121a', '#221c28', '#2e2636', '#3c3246'])[Math.max(0, Math.min(3, l))]); }
      rect(0, 122, 319, 123, hex('#0a0a0e')); rect(0, 121, 319, 121, hex('#3a3e4a'));
      // la estantería metálica con las latas de película
      rect(4, 24, 6, 124, hex('#6a6e7a')); rect(62, 24, 64, 124, hex('#4a4e5a')); rect(4, 24, 4, 124, hex('#a8acb8'));
      for (const y of [44, 68, 92, 116]) { rect(4, y, 64, y + 2, hex('#8a8e9a')); rect(4, y, 64, y, hex('#c8ccd8')); rect(4, y + 3, 64, y + 3, hex('#1a1c24'));
        for (let k = 0, x = 8; x < 58; k++) { const n = 2 + Math.floor(h(x, y, 801) * 4), c = h(x, y, 802) < 0.3 ? hex('#a87a4a') : hex('#9aa0aa'); for (let i = 0; i < n; i++) { const yy = y - 3 - i * 3; rect(x, yy, x + 12, yy + 2, hex('#2a2a30')); rect(x, yy, x + 12, yy + 1, c); rect(x, yy, x + 12, yy, e_mezcla(c, hex('#ffffff'), 0.4)); if (i === n - 1) rect(x + 3, yy + 1, x + 9, yy + 1, hex('#f0ece0')); } x += 15; } }
      R.numero('1', 14, 40, { fina: true }); R.numero('2', 28, 64, { fina: true });
      // el tablero con las fotos de las escenas en filas
      rect(80, 22, 197, 64, hex('#2a2a30')); rect(81, 23, 196, 63, hex('#d8d4c8')); rect(81, 23, 196, 23, hex('#f0ece0'));
      for (let f = 0; f < 3; f++) for (let i = 0; i < 8; i++) { const x = 86 + i * 13, y = 27 + f * 12, c = e_hx(['#3a4a8a', '#8a3a3a', '#3a6a4a', '#8a7a3a', '#5a3a6a'])[(i + f * 2) % 5]; rect(x, y, x + 10, y + 8, hex('#1a1a20')); rect(x + 1, y + 1, x + 9, y + 7, c); rect(x + 1, y + 5, x + 9, y + 7, e_mezcla(c, hex('#000000'), 0.4)); pset(x + 3 + (i % 3), y + 3, hex('#f0d8a8')); pset(x + 5, y, hex('#d8282e')); }
      // el monitor de tubo con su torre, en la mesita de la derecha
      rect(270, 102, 318, 106, hex('#3e2a1a')); rect(270, 102, 318, 102, hex('#7a5a3a')); rect(274, 106, 276, 140, hex('#2a1a10')); rect(312, 106, 314, 140, hex('#2a1a10'));
      rect(276, 72, 310, 101, hex('#c8c4b8')); rect(276, 72, 310, 72, hex('#e8e4d8')); rect(279, 75, 307, 95, hex('#1a1a22')); rect(286, 101, 300, 102, hex('#a8a498'));
      rect(300, 110, 314, 140, hex('#c8c4b8')); rect(300, 110, 300, 140, hex('#e8e4d8')); rect(303, 114, 311, 115, hex('#4a4a52'));
      // la moviola: el tablero gris verdoso, el frente con mandos y palancas, las patas; el visor con su capota
      rect(70, 104, 216, 108, hex('#2a3430')); rect(70, 104, 216, 104, hex('#a8b8a8'));
      for (let y = 105; y <= 116; y++) rect(72 + (116 - y) * 0, y, 214, y, e_mezcla(hex('#6a7a6a'), hex('#4a5a4a'), (y - 105) / 11));
      rect(70, 116, 216, 140, hex('#1a201e')); rect(72, 117, 214, 139, hex('#4a5a4e')); rect(72, 117, 214, 117, hex('#7a8a7a'));
      for (const x of [86, 110, 176, 200]) { disco(x, 126, 3, hex('#1a1a1a')); disco(x, 126, 2, hex('#8a8a8a')); pset(x - 1, 125, hex('#d8d8d8')); }
      for (const x of [136, 150]) { rect(x - 1, 122, x + 1, 134, hex('#1a1a1a')); rect(x - 2, 122, x + 2, 124, hex('#c83a3a')); }
      rect(120, 130, 166, 134, hex('#2a2a2a')); for (let x = 122; x < 166; x += 3) pset(x, 132, hex('#8a8a8a'));
      for (const x of [76, 206]) { rect(x, 140, x + 3, 156, hex('#2a3430')); rect(x, 140, x, 156, hex('#6a7a6a')); rect(x - 2, 156, x + 5, 157, hex('#1a1e1c')); }
      rect(124, 72, 162, 104, hex('#1a201e')); rect(125, 73, 161, 103, hex('#5a6a5a')); rect(125, 73, 161, 74, hex('#8a9a8a')); rect(128, 76, 158, 98, hex('#0a0a0e'));
      R.poligono([[122, 72], [164, 72], [160, 66], [126, 66]], hex('#3a4a3e'));
      // la lámpara de brazo encima del visor
      rect(206, 0, 206, 60, hex('#2a2a30')); R.poligono([[200, 60], [212, 60], [216, 68], [196, 68]], hex('#2a5a3a')); rect(200, 60, 212, 60, hex('#4a8a5a')); rect(196, 68, 216, 68, hex('#1a3a24'));
      // la silla de ruedas del montador, vuelta hacia la moviola
      rect(40, 128, 58, 131, hex('#1a1a22')); rect(41, 128, 57, 129, hex('#3a3a4a')); rect(54, 108, 58, 128, hex('#1a1a22')); rect(55, 109, 57, 127, hex('#2e2e3a')); rect(48, 132, 50, 142, hex('#4a4a58')); linea(49, 142, 41, 147, hex('#2a2a34')); linea(49, 142, 57, 147, hex('#2a2a34')); linea(49, 142, 49, 148, hex('#2a2a34')); for (const x of [41, 57, 49]) { disco(x, 148, 1, hex('#0a0a10')); }
      // el colgador de las tiras: la barra con ganchos y el saco de lona con ruedas
      rect(224, 50, 268, 52, hex('#8a8e9a')); rect(224, 50, 268, 50, hex('#c8ccd8')); for (const x of [226, 266]) rect(x, 52, x + 1, 112, hex('#6a6e7a')); for (let x = 228; x < 266; x += 4) pset(x, 53, hex('#c8ccd8'));
      for (let y = 106; y <= 140; y++) { const w = 22 - Math.round((y - 106) * 0.08); rect(246 - w, y, 246 + w, y, (y + (y >> 2)) % 6 === 0 ? hex('#8a7a5a') : hex('#a8946a')); pset(246 - w, y, hex('#5a4a34')); pset(246 + w, y, hex('#5a4a34')); }
      rect(222, 105, 270, 107, hex('#6a6e7a')); for (const x of [228, 264]) { disco(x, 143, 2, hex('#0a0a10')); pset(x, 143, hex('#5a5a6a')); }
      for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 805) * 300) + 6, y = 128 + Math.round(h(k, 2, 805) * 48); if (x > 60 && x < 226 && y < 160) continue; e_recorte(R, x, y, k); }
      for (let x = 216; x < 300; x++) pset(x, Math.round(150 + Math.sin(x * 0.07) * 3), hex('#0a0a0e'));
      // las latas apiladas en el suelo junto a la estantería, una abierta con su rollo
      for (let i = 0; i < 4; i++) { const yy = 150 - i * 4; rect(10, yy, 34, yy + 3, hex('#2a2a30')); rect(10, yy, 34, yy + 2, i === 2 ? hex('#a87a4a') : hex('#9aa0aa')); rect(10, yy, 34, yy, hex('#d8dce4')); rect(16, yy + 1, 28, yy + 1, hex('#f0ece0')); }
      for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i / 14, j / 4); if (d < 1) pset(54 + i, 168 + j, d > 0.9 ? hex('#3a3e44') : d > 0.4 ? hex('#4a3020') : d > 0.2 ? hex('#c8ccd4') : hex('#2a2a30')); }
      e_sombra(R, 143, 158, 78, 3, 0.3);
    });
    // la vida: los platos que giran, la película que corre, el visor, la lámpara, el monitor de tubo, las tiras
    e_resplandor(R, 206, 74, 30, hex('#ffe0a0'), 0.3, 0.9); rect(199, 69, 213, 69, hex('#fff6d0')); e_haz(R, 206, 70, 170, 112, 26, 0.12, hex('#ffe8b0'));
    for (const [x, v] of [[88, 2.2], [112, -1.6], [174, 1.6], [198, -2.2]]) e_plato_(R, x, 110, 11, 4, t, v * gira, x < 140 ? 0.62 : 0.78);
    { const corre = t * 9 * gira; for (let x = 98; x < 190; x++) { if (x > 122 && x < 164) continue; const c = ((Math.floor(x + corre) % 4) + 4) % 4 === 0 ? hex('#c8b890') : hex('#3a2a20'); pset(x, 106, c); } for (const x of [122, 164]) { disco(x, 106, 1, hex('#c8ccd4')); } }
    e_pantalla(R, t, PANT, o, (R, t, cl) => { const [x0, y0, x1, y1] = cl, fl = 0.85 + 0.15 * Math.sin(t * 40); for (let y = y0; y <= y1; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(hex('#3a3020'), hex('#c8b090'), fl * (0.4 + 0.5 * Math.sin((y - y0) / (y1 - y0) * Math.PI)))); R.disco((x0 + x1) >> 1, y1 - 6, 4, hex('#3a2a1a')); R.disco((x0 + x1) >> 1, y1 - 12, 3, hex('#3a2a1a')); const sx = x0 + Math.floor(h(Math.floor(t * 12), 1, 806) * (x1 - x0)); R.linea(sx, y0, sx, y1, hex('#f0e8d0')); R.numero(String(1000 + Math.floor(t * 24) % 9000), x0 + 2, y0 + 7, { fina: true, rampa: [hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0')] }); });
    e_resplandor(R, 143, 90, 20, hex('#f0d8a0'), 0.18);
    { const cl = [279, 75, 307, 95]; e_rectC(R, cl, 279, 75, 307, 95, hex('#0e1a2a')); for (let f = 0; f < 4; f++) for (let x = 281; x < 306; x += 5) if (h(x, f, 807) < 0.75) e_rectC(R, cl, x, 78 + f * 4, x + 3 + (f % 2), 80 + f * 4, e_hx(['#3a6ad8', '#3aa86a', '#e8b830', '#c83a3a'])[f]); const px = 281 + Math.floor((t * 4) % 25); e_rectC(R, cl, px, 76, px, 94, hex('#ff3a3a')); e_resplandor(R, 293, 86, 18, hex('#6a9ae8'), 0.1); }
    for (let k = 0; k < 9; k++) e_tira(R, 230 + k * 4, 54, 100 + Math.round(h(k, 1, 808) * 12), t, k);
    return { suelo: 158, pantalla: PANT, moviola: { mesa: [70, 104, 216, 140], platos: [[88, 110], [112, 110], [174, 110], [198, 110]], visor: [124, 66, 162, 104] }, colgador: [222, 50, 270, 143], papelera: [238, 148, 266, 176], estanteria: [4, 24, 64, 124], monitor: [276, 72, 310, 101], libre: [70, 236] };
  }
  // la cámara de la moviola: la mesa de cerca, los dos platos grandes, la película por la ventanilla, el visor grande
  const PANT = [96, 38, 152, 80];
  e_fijo(R, 'hp:moviola', () => {
    rect(0, 0, 319, 179, hex('#0e1016'));
    espuma(0, 0, 319, 92, (x, y) => (x > 262 && y < 50) ? -0.7 : Math.max(0, 1 - Math.hypot(x - 124, y - 70) / 140) * 0.7 - 0.2);
    // la balda de arriba a la izquierda con latas y el altavoz de la moviola
    rect(0, 40, 72, 42, hex('#8a8e9a')); rect(0, 40, 72, 40, hex('#c8ccd8')); rect(0, 43, 72, 43, hex('#0a0b10'));
    for (let k = 0, x = 4; x < 60; k++, x += 18) for (let i = 0; i < 2 + (k % 2); i++) { const yy = 37 - i * 4; rect(x, yy, x + 14, yy + 3, hex('#2a2a30')); rect(x, yy, x + 14, yy + 2, k === 1 ? hex('#a87a4a') : hex('#9aa0aa')); rect(x, yy, x + 14, yy, hex('#d8dce4')); rect(x + 4, yy + 1, x + 10, yy + 1, hex('#f0ece0')); }
    rect(30, 52, 56, 82, hex('#1a1a20')); rect(31, 53, 55, 81, hex('#2e2e38')); disco(43, 63, 8, hex('#14141a')); disco(43, 63, 6, hex('#3a3a46')); disco(43, 63, 2, hex('#14141a')); disco(43, 76, 3, hex('#14141a')); disco(43, 76, 2, hex('#3a3a46'));
    // el visor grande con su capota y su marco
    rect(86, 26, 162, 92, hex('#1a201e')); rect(87, 27, 161, 91, hex('#5a6a5a')); rect(87, 27, 161, 29, hex('#8a9a8a')); rect(92, 34, 156, 84, hex('#0a0a0e')); R.poligono([[82, 26], [166, 26], [160, 18], [88, 18]], hex('#3a4a3e')); linea(88, 18, 160, 18, hex('#6a7a6a'));
    for (const x of [100, 148]) { disco(x, 88, 2, hex('#1a1a1a')); pset(x, 88, hex('#a8a8a8')); }
    // la mesa vista desde arriba, el canto y el frente con mandos; las patas y la moqueta
    for (let y = 92; y <= 130; y++) { const u = (y - 92) / 38; rect(0, y, 244, y, e_mezcla(hex('#5a6a5a'), hex('#7a8a7a'), u)); }
    for (let y = 92; y <= 130; y++) for (let x = 0; x <= 244; x++) if (h(x, y, 810) < 0.05) pset(x, y, hex('#4a5a4a'));
    rect(0, 92, 244, 92, hex('#2a3430')); rect(244, 92, 246, 146, hex('#1a201e'));
    rect(0, 131, 244, 146, hex('#3e4e42')); rect(0, 131, 244, 132, hex('#a8b8a8')); for (const x of [30, 60, 200, 226]) { disco(x, 139, 3, hex('#1a1a1a')); disco(x, 139, 2, hex('#8a8a8a')); pset(x - 1, 138, hex('#d8d8d8')); }
    for (const x of [8, 232]) { rect(x, 146, x + 4, 170, hex('#2a3430')); rect(x, 146, x + 1, 170, hex('#6a7a6a')); }
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 170 && ((x >= 8 && x <= 12) || (x >= 232 && x <= 236))) continue; if (y < 147 && x < 247) continue; const v = 1.2 + (h(x, y, 811) - 0.5) * 0.9 + (h(x >> 2, y >> 1, 812) - 0.5) * 0.4; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; pset(x, y, e_hx(['#16121a', '#221c28', '#2e2636', '#3c3246'])[Math.max(0, Math.min(3, l))]); }
    rect(0, 146, 246, 147, hex('#0a0a0e'));
    for (let k = 0; k < 18; k++) e_recorte(R, Math.round(h(k, 1, 813) * 300) + 6, 152 + Math.round(h(k, 2, 813) * 24), k + 40);
    // la empalmadora en el canto de delante, el rodillo y el carrete de cinta
    rect(110, 120, 140, 128, hex('#1a1a1a')); rect(111, 121, 139, 127, hex('#a8acb4')); rect(111, 121, 139, 121, hex('#e8ecf0')); rect(112, 123, 138, 125, hex('#3a2a20')); for (let x = 113; x < 138; x += 3) { pset(x, 123, hex('#c8b890')); pset(x, 125, hex('#c8b890')); }
    disco(160, 124, 4, hex('#1a1a1a')); disco(160, 124, 3, hex('#c8c0a0')); disco(160, 124, 1, hex('#5a5a5a'));
    // el lápiz graso rojo, los guantes blancos de algodón y la tapa de una lata con trozos de película
    linea(18, 126, 34, 120, hex('#1a1010')); linea(18, 125, 33, 119, hex('#c8282e')); pset(17, 126, hex('#f0d8c8'));
    for (const [x, d] of [[62, 1], [78, -1]]) { R.rect(x - 4, 119, x + 4, 125, hex('#c8c4b8')); R.rect(x - 3, 118, x + 3, 124, hex('#f4f2ea')); for (let i = 0; i < 4; i++) R.rect(x - 3 + i * 2, 115 + (i === 1 || i === 2 ? 0 : 1), x - 3 + i * 2, 118, hex('#f4f2ea')); R.rect(x + d * 4, 118, x + d * 5, 120, hex('#f4f2ea')); }
    for (let j = -4; j <= 4; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i / 14, j / 4); if (d < 1) pset(186 + i, 126 + j, d > 0.88 ? hex('#5a5e66') : hex('#9aa0aa')); }
    for (let k = 0; k < 3; k++) e_recorte(R, 180 + k * 4, 125 + (k % 2), k + 60);
    // el saco de las tiras a la derecha, con su barra
    rect(256, 46, 312, 48, hex('#8a8e9a')); rect(256, 46, 312, 46, hex('#c8ccd8')); for (const x of [258, 310]) rect(x, 48, x + 1, 120, hex('#6a6e7a'));
    for (let y = 110; y <= 158; y++) { const w = 28 - Math.round((y - 110) * 0.08); rect(284 - w, y, 284 + w, y, (y + (y >> 2)) % 6 === 0 ? hex('#8a7a5a') : hex('#a8946a')); pset(284 - w, y, hex('#5a4a34')); pset(284 + w, y, hex('#5a4a34')); }
    rect(254, 108, 314, 110, hex('#6a6e7a')); for (const x of [260, 308]) { disco(x, 162, 3, hex('#0a0a10')); pset(x, 162, hex('#5a5a6a')); }
  });
  // la vida: los dos platos grandes que giran, la película que corre por la ventanilla y los rodillos, el visor y las tiras
  e_plato_(R, 48, 108, 40, 12, t, 1.4 * gira, 0.6); e_plato_(R, 200, 108, 40, 12, t, -1.4 * gira, 0.82);
  { const corre = t * 14 * gira; for (let x = 82; x < 168; x++) { const pf = ((Math.floor(x + corre) % 5) + 5) % 5; rect(x, 103, x, 108, hex('#3a2a20')); if (pf === 0) { pset(x, 103, hex('#c8b890')); pset(x, 108, hex('#c8b890')); } if (pf !== 4 && x > 96 && x < 152) rect(x, 104, x, 107, (Math.floor((x + corre) / 15) % 2) ? hex('#8a6a4a') : hex('#6a5a5a')); }
    for (const x of [82, 96, 152, 168]) { disco(x, 105, 2, hex('#1a1a1a')); disco(x, 105, 1, hex('#c8ccd4')); pset(x + Math.round(Math.cos(corre * 0.3)), 105 + Math.round(Math.sin(corre * 0.3)), hex('#ffffff')); }
    rect(110, 100, 138, 111, hex('#1a1a1a')); rect(111, 101, 137, 102, hex('#3a3a3a')); rect(112, 103, 136, 108, hex('#fff0c8')); for (let x = 112; x <= 136; x++) if (((Math.floor(x + corre) % 5) + 5) % 5 === 0) { pset(x, 103, hex('#3a2a20')); pset(x, 108, hex('#3a2a20')); } e_resplandor(R, 124, 106, 14, hex('#fff0c8'), 0.25, 0.6); }
  e_pantalla(R, t, PANT, o, (R, t, cl) => { const [x0, y0, x1, y1] = cl, fl = 0.85 + 0.15 * Math.sin(t * 40); for (let y = y0; y <= y1; y++) e_rectC(R, cl, x0, y, x1, y, e_mezcla(hex('#3a3020'), hex('#c8b090'), fl * (0.4 + 0.5 * Math.sin((y - y0) / (y1 - y0) * Math.PI)))); const cx = (x0 + x1) >> 1; R.disco(cx, y1 - 10, 8, hex('#3a2a1a')); R.disco(cx, y1 - 22, 6, hex('#3a2a1a')); const sx = x0 + Math.floor(h(Math.floor(t * 12), 1, 814) * (x1 - x0)); R.linea(sx, y0, sx, y1, hex('#f0e8d0')); R.numero(String(1000 + Math.floor(t * 24) % 9000), x0 + 3, y0 + 9, { fina: true, rampa: [hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0'), hex('#f0e8d0')] }); });
  e_resplandor(R, 124, 70, 46, hex('#f0d8a0'), 0.14, 0.7);
  for (let k = 0; k < 12; k++) e_tira(R, 262 + k * 4, 50, 104 + Math.round(h(k, 1, 815) * 14), t, k + 3);
  return { suelo: 174, pantalla: PANT, platos: [[48, 108], [200, 108]], ventanilla: [110, 100, 138, 111], empalmadora: [110, 120, 140, 128], cantoMesa: 131, mesa: [0, 92, 246, 146], saco: [254, 46, 314, 162], libre: [248, 318] };
}

// lo que va delante en la moviola: el canto de la mesa con la tira que cuelga hasta el suelo, enroscándose
function e_moviolaDelante(R, t) {
  R.rect(0, 131, 244, 132, hex('#a8b8a8'));
  for (let y = 131; y < 176; y++) { const u = (y - 131) / 45, x = Math.round(72 + Math.sin(t * 1.1) * u * 2 + Math.sin(y * 0.2) * u * 3); R.rect(x, y, x + 3, y, hex('#3a2a20')); if (y % 3 === 0) { R.pset(x, y, hex('#c8b890')); R.pset(x + 3, y, hex('#c8b890')); } }
  for (let i = 0; i < 16; i++) { const a = i * 0.5, x = Math.round(76 + Math.cos(a) * (6 - i * 0.2)), y = Math.round(174 + Math.sin(a) * 2); R.pset(x, y, i % 3 ? hex('#4a3020') : hex('#c8b890')); }
}
