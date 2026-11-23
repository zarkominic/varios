// Fontanería y decorados del episodio 47 (Mary Shelley: la chica de dieciocho años que inventó a Frankenstein), con el
// canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js: estudio) y
// añade: A Londres 1797–1814 (londres), B el lago de Ginebra en 1816 (lago), C el mundo del libro (libro), D Londres
// 1818–1823 (ciudad) y E Italia 1818–1822 (italia), y las piezas de las pausas (pausa).
// DERECHOS: NADA de las películas de Frankenstein (ni la cabeza plana, ni los tornillos, ni la piel verde, ni el
// laboratorio de rayos de 1931): la criatura va por lo que dice el LIBRO (ELENCO_MS.criaturaMS). Sin letras (solo números
// y símbolos). LA VIOLENCIA NUNCA SE VE y NADA MORBOSO: las muertes de los hijos y de Percy se cuentan con objetos (una
// cuna vacía, una vela en el mar, de lejos); en la buhardilla de Victor, instrumentos y frascos, nunca cuerpos.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/ms-comun.js';
//   const { E, R, M } = await T.preparar('ms-gancho');
//   T.rodar(E, R, [[0, (t) => T.lago(R, t, { encuadre: 'cuarto' })]], { año: 1816 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 46 (y el del 44, que reutiliza) por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_MS as MS } from '/atomo/plato/kits/pixel-chibi.js';
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
    // Londres de la Regencia: ladrillo hollín, piedra de Portland, la niebla, la tinta y el papel
    ladrillo: '#7a4a3a', ladrilloS: '#4e2e24', portland: '#c8c0ae', portlandS: '#8a8474', niebla: '#a8acb4', tinta: '#1c1a2a', papel: '#ece2c8',
    // el lago de Ginebra en el año sin verano: el agua gris acero, la tormenta, las velas
    lago: '#4a5a6a', lagoL: '#8a9aa8', tormenta: '#3a3e4a', rayo: '#e8ecff', vela: '#ffd890', velaS: '#e8a040',
    // el mundo del libro: la buhardilla, la cabaña del bosque, el hielo del Ártico
    madera: '#6a4a2a', maderaS: '#4a3220', bosque: '#2e4a32', hielo: '#d8e8f0', hieloS: '#9ab8c8',
    // Italia: el yeso blanco, el mar, el ocaso
    yeso: '#e8e0d0', yesoS: '#b8ae9c', mar: '#3a6a8a', marL: '#7aaac8', ocaso: '#e88a5a',
    // la criatura del libro: la piel amarillenta y los ojos acuosos
    criatura: '#d8c88a', criaturaS: '#b0a060',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep47');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo en los años de la vida de Mary: la pluma (1797–1815, la niña y la huida) y la vela (1816–1831,
  // el verano sin sol, el libro y lo que vino después)
  Object.assign(R.ICONOS, {
    pluma: ['......#', '.....##', '....##.', '...##..', '..##...', '.##....', '#......'],
    vela: ['...#...', '..###..', '...#...', '..###..', '..###..', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1797, 1816, R.PALA.ORO, 'pluma'], [1816, 1832, R.PALA.ROJO, 'vela']]);
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



// ── A · Londres, 1797–1814 ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'casa' (por omisión): LA CASA DE LOS GODWIN por dentro (Somers Town / Skinner Street): una biblioteca de techo alto
//     con estanterías hasta el techo llenas de libros de lomos de colores, una escalera de biblioteca, una chimenea con
//     su fuego y un reloj en la repisa, EL RETRATO DE LA MADRE en un marco dorado sobre la chimenea (una mujer de pelo
//     castaño con un pañuelo blanco al cuello, de medio cuerpo, pintura al óleo en pixel), un sillón, una mesa con
//     papeles y tintero, una ventana de guillotina con la calle de Londres y la niebla; visitas pequeñas que hablan junto
//     a la chimenea (figuritas de 8–10 px con levita) y humo de pipa. Un rincón con un taburete (x 250–290, suelo 150)
//     para la niña callada. o.cuna true: una cuna de madera junto a la chimenea (x 60–96, suelo 150). Suelo y 150, libre
//     x 40–240. Cámara 'cuarto': un cuarto pobre de alquiler (1815): paredes de yeso desconchado, una ventana con la
//     niebla, una chimenea pequeña con brasas, una cama, una mesita con una vela y un cuaderno abierto (el diario, x
//     180–230, y 120–130), una cuna pequeña (o.cunaVacia true: vacía, con la mantita doblada; sin nada morboso). Suelo y
//     150, libre x 40–260.
//   'cementerio': EL CEMENTERIO DE ST PANCRAS, de día nublado: la iglesia vieja de piedra al fondo con su torrecita,
//     árboles con hojas que caen, lápidas inclinadas con musgo, una verja, el camino de grava, y LA LÁPIDA DE LA MADRE
//     (x 140–180, y 100–150: una piedra alta y clara con un marco tallado; letras sugeridas con rayitas, nunca legibles) con
//     un banco o la hierba al lado para la niña sentada (x 186–220, suelo 150); pájaros, un gato que pasea. Suelo y 150,
//     libre x 40–280. Cámara 'lapida': de cerca, la piedra con las rayitas de las letras y una mano pequeña (T.mano) que
//     sigue una línea; hojas que caen.
//   'calle': UNA CALLE DE LONDRES DE MADRUGADA (1814): casas georgianas de ladrillo con puertas pintadas y abanicos de
//     cristal, farolas de aceite que tiemblan, adoquines mojados, la niebla, un carruaje de caballos esperando (x 200–290,
//     suelo 150) con su farol, el cielo que clarea. Suelo y 150, libre x 30–200.
// Llama a londresDelante después de los actores (una butaca en la esquina en 'casa'; la verja de delante en
// 'cementerio'; un charco y un poste en 'calle').
export function londres(R, t, o = {}) { provisional(R, t, C.ladrilloS, C.portland); return { suelo: 150, libre: [40, 260] }; }
export function londresDelante(R, t, o = {}) { return {}; }

// ── B · El lago de Ginebra, 1816 ─────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'lago' (por omisión): EL LAGO DE GINEBRA desde la orilla: el agua gris acero con olas pequeñas, las montañas con
//     nieve al fondo (los Alpes), viñedos en la ladera, VILLA DIODATI en la colina (una mansión clara de tres alturas con
//     balcón y columnas, x 180–260, y 40–90) y, abajo junto al agua, LA CASITA donde se quedan los Shelley (x 60–110, y
//     100–140) con su embarcadero y un bote; o.tormenta 0–1: el cielo se cierra en nubes negras de tres tonos, lluvia en
//     diagonal (tres capas), relámpagos que iluminan las montañas, olas con espuma, árboles que se doblan; con 0, un día
//     gris y frío de junio (nunca sol). Suelo y 152 (la orilla), libre x 30–280. Cámara 'ventana': desde dentro de la
//     casa, mirando por una ventana grande empañada con la lluvia que corre por el cristal y el lago en tormenta fuera; un
//     alféizar con un libro y una vela.
//   'salon': EL SALÓN DE VILLA DIODATI de noche, a la luz de las velas: paneles de madera, una chimenea grande con el
//     fuego, candelabros, cortinas pesadas, ventanas con los relámpagos, una mesa larga con hojas de papel, plumas y
//     tinteros, sillones; o.lectura true: un libro abierto grande en un atril. Suelo y 150, libre x 30–290.
//     Cámara 'mesa': la mesa del desayuno por la mañana, luz gris de lluvia, tazas, pan, las hojas de papel de cada uno
//     (las de los demás escritas con rayitas, la de Mary EN BLANCO, x 150–180, y 120–126).
//   'cuarto': EL CUARTO DE MARY de noche: una cama con dosel sencillo (x 160–260, almohada en x 236–256, y 110), los
//     postigos cerrados con UN HILO DE LUNA que se cuela entre las rendijas (la luna de verdad, no lluvia: la noche del
//     sueño), una vela en la mesilla que se consume, un parquet oscuro, un armario; o.sueno 0–1: sobre la cama aparece,
//     como en una nube de luz azulada y difusa, LA VISIÓN: una silueta de estudiante arrodillado junto a una mesa larga y
//     una forma alta que empieza a moverse, y luego DOS OJOS AMARILLOS Y ACUOSOS que miran (sin nada de terror gráfico:
//     silueta y luz); devuelve .vision [x, y] y .ojos [[x, y], [x, y]]. Suelo y 150, libre x 30–150.
// Llama a lagoDelante después de los actores (lluvia de primer término en 'lago' con tormenta; la mesa de delante en
// 'salon'/'mesa'; la mesilla con la vela en 'cuarto').
export function lago(R, t, o = {}) { provisional(R, t, C.tormenta, C.lago); return { suelo: 150, libre: [30, 280] }; }
export function lagoDelante(R, t, o = {}) { return {}; }

// ── C · El mundo del libro (por el texto de 1818, nada de las películas) ─────────────────────────────────────────────
// o.encuadre:
//   'buhardilla' (por omisión): EL TALLER DE VICTOR en una buhardilla de Ingolstadt, de noche: vigas inclinadas, una
//     claraboya con la lluvia y la luna, estanterías con frascos de cristal de colores, libros viejos, una mesa de
//     disección LARGA (x 120–240, y 128) tapada con una sábana (debajo, solo una forma alargada; nunca un cuerpo visible),
//     una vela casi consumida, instrumentos de latón, una pila de Volta con sus discos (sin rayos ni máquinas de película);
//     o.despierta 0–1: la sábana se mueve, y luego asoma un ojo amarillo (solo eso). Suelo y 150, libre x 30–110.
//     Cámara 'escalera': la puerta de la buhardilla y la escalera por la que huye Victor, en penumbra.
//   'cabana': LA CABAÑA DE LOS DE LACEY en el bosque, de día: una casita de piedra y madera con huerto, humo en la
//     chimenea, árboles, y PEGADO A ELLA un cobertizo (x 220–300) con una grieta en la pared por la que la criatura mira
//     (escondite; la criatura se pinta en la escena). Cámara 'dentro': dentro de la cabaña, la familia junto al fuego:
//     el anciano con su guitarra, una joven, un muchacho, libros; la grieta de la pared con un ojo que mira (o.ojo true).
//     Suelo y 150, libre x 30–280.
//   'artico': EL HIELO DEL ÁRTICO (el final del libro): una llanura de hielo con témpanos, el barco atrapado en el hielo
//     al fondo (x 220–300, y 60–110), la aurora, el viento con nieve, un trineo. Suelo y 152, libre x 30–200.
// Llama a libroDelante después de los actores (la mesa de delante en 'buhardilla'; ramas en 'cabana'; nieve en 'artico').
export function libro(R, t, o = {}) { provisional(R, t, C.maderaS, C.hielo); return { suelo: 150, libre: [30, 280] }; }
export function libroDelante(R, t, o = {}) { return {}; }

// ── D · Londres, 1818–1823 ───────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'imprenta' (por omisión): UNA IMPRENTA Y LIBRERÍA de 1818: la prensa de madera con su palanca, cajas de tipos, pliegos
//     colgados secándose, un aprendiz que entinta, y al fondo el escaparate de la librería con libros en tres tomos; o.tomos
//     true: TRES TOMITOS iguales sobre el mostrador (x 150–190, y 118–130; sin título legible). Suelo y 150, libre x 40–260.
//   'teatro': UN TEATRO DE LONDRES LLENO (1823): el escenario con telón rojo y candilejas, en él un decorado de laboratorio
//     pintado (de teatro, de cartón) y un actor alto con la cara empolvada muy pálida y una túnica (de teatro; sin parecido con
//     las películas), los palcos dorados con público pequeño que aplaude, la platea llena de cabecitas. Cámara 'palco': un
//     palco de cerca con su barandilla dorada, para Mary y un amigo (suelo 150, x 100–220), y en la mano EL PROGRAMA
//     (o.programa true: una hoja con rayitas de texto y UNA RAYA LARGA donde iría el nombre del monstruo).
// Llama a ciudadDelante después de los actores (las cabezas de la platea en 'teatro'; la barandilla en 'palco').
export function ciudad(R, t, o = {}) { provisional(R, t, C.tinta, C.papel); return { suelo: 150, libre: [40, 260] }; }
export function ciudadDelante(R, t, o = {}) { return {}; }

// ── E · Italia, 1818–1822 ────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'casa' (por omisión): LA CASA BLANCA JUNTO AL MAR (Casa Magni, en Lerici): una casa de yeso blanco con arcos en la
//     planta baja y una terraza sobre el agua, el golfo azul, barcas de pescadores, colinas con olivos y pinos, el pueblito
//     con su castillo; o.hora 'dia' | 'ocaso' | 'noche'. Suelo y 152 (la terraza), libre x 40–260. Cámara 'dentro': un
//     cuarto encalado con una ventana al mar, una mesa de escribir con papeles y libros, una cuna (o.cunaVacia: vacía, con
//     la mantita; nada morboso), flores en un jarro.
//   'mar': EL MAR EN TORMENTA, DE LEJOS: el horizonte con nubes negras, olas grandes, lluvia, y UN BARQUITO DE VELA
//     pequeño (o.barco 0–1: se aleja y se pierde en la bruma; nunca un naufragio visible); después, o.calma true: el mar
//     gris en calma y la playa vacía. Cámara 'playa': la playa de arena con la casa al fondo, para Mary y el niño de pie
//     mirando al horizonte (suelo 152, x 80–220).
// Llama a italiaDelante después de los actores (la barandilla de la terraza en 'casa'; espuma y arena en 'mar'/'playa').
export function italia(R, t, o = {}) { provisional(R, t, C.mar, C.yeso); return { suelo: 152, libre: [40, 260] }; }
export function italiaDelante(R, t, o = {}) { return {}; }

// ── Piezas: los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio, a escala 2, con
// su sombra), o.cual:
//   'sueno': una nube de sueño (bocadillo de puntitos) con dos figuritas que se abrazan dentro, y el «58»;
//   'volcan': un volcán que estalla con su columna de ceniza, y una nube gris que da la vuelta a un globo terráqueo;
//     o.nieve true: nieve sobre un campo de maíz verde;
//   'galvani': una mesa de laboratorio antiguo con una pila de discos, dos cables y una rana DE JUGUETE (de hojalata,
//     no una rana de verdad) que salta (o.salto 0–1);
//   'pelota': una pantalla antigua con tres figuritas que se pasan una pelota y dejan fuera a una cuarta; un corazón
//     agrietado (o.grieta 0–1);
//   'cuaderno': un cuaderno abierto que se escribe solo (rayitas que aparecen) y del que sale una luz cálida.
// x, y: el centro de la base; devuelve {}.
export function pausa(R, x, y, t, o = {}) { R.rect(x - 20, y - 30, x + 20, y, C.vela); return {}; }
