// Fontanería y decorados del episodio 29 (El mapa de Piri Reis: la Antártida que no era y el Colón que sí) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Estambul 1929 (la biblioteca de
// Topkapı, el palacio y su sala de museo de hoy, la prensa de 1929), B el mar 1500–1511 (la galera otomana, la costa de
// España, la costa de Brasil), C Galípoli y El Cairo 1513–1517 (el taller de Piri Reis, el puerto, el salón del sultán),
// D Estados Unidos 1956–1968 (el aula de Keene, la base aérea, la librería y la imprenta), E hoy (el estudio de Atom, la
// Antártida, el despacho del historiador) y F el pergamino de 1513 (el mapa mismo, a pantalla completa).
// EL MAPA se dibuja a nuestra manera, en pixel: pergamino de piel de gacela, costas a tinta, rosas de los vientos,
// barquitos, loros, el pez de san Brandán; NUNCA calcado, y sin letras legibles (las notas son garabatos de tinta).
// Personas reales por sus atributos. En 1929 nadie lleva fez (prohibido en Turquía desde 1925).
// Los personajes son los de ELENCO_PR y PIEZAS_PR (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bordas, pupitres) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/pr-comun.js';
//   const { E, R, M } = await T.preparar('pr-gancho');
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
// las piezas del episodio (PIEZAS_PR: el rollo, el pergamino, cartas de navegación, lupa, compás, tintero, catalejo,
// libro, astrolabio, cofre, rosa de los vientos, testigo de hielo), las crea el reparto
export const PIEZAS_PR = KIT.PIEZAS_PR || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el pergamino de piel de gacela y sus tintas, el mar, el turquesa y el oro otomanos, el hielo
    pergamino: '#e8d4a4', pergaminoS: '#b89a64', tinta: '#2a2018', tintaRoja: '#a83224', tintaVerde: '#3a6a3a',
    tintaAzul: '#2a4a7a', mar: '#2a5a7a', marS: '#173a52', espuma: '#e8f0f0', turquesa: '#3a9a9a', oroOt: '#d8a838',
    hielo: '#e8f2f8', hieloS: '#a8c4d8', tweed: '#7a6a4a',
    // madera y piedra
    madera: '#7a4a2a', maderaS: '#4a2a18', piedra: '#7a7680', piedraS: '#4a4652', yeso: '#e4d8bc',
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
  const E = await escena(id, 'ep29');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1501 (la captura), 1513 (el mapa), 1929 (el hallazgo), 1966 (el libro de Hapgood), 2026
  Object.assign(R.ICONOS, {
    barco: ['...#...', '...##..', '...###.', '...#...', '#######', '.#####.', '.......'],
    rollo: ['.#####.', '#.....#', '.#####.', '.#...#.', '.#####.', '.......', '.......'],
    lupa: ['.###...', '#...#..', '#...#..', '.###...', '....#..', '.....#.', '.......'],
    copo: ['...#...', '#.#.#.#', '.#####.', '###.###', '.#####.', '#.#.#.#', '...#...'],
  });
  R.tramosTiempo([[1501, 1513, R.PALA.AZUL ?? R.PALA.ORO, 'barco'], [1513, 1929, R.PALA.ORO, 'rollo'], [1929, 1966, R.PALA.ROJO, 'lupa'], [1966, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'copo']]);
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



// ── A · Estambul, 1929 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'biblioteca': la biblioteca del palacio de Topkapı en 1929: estanterías de madera con libros y legajos atados, cofres
//     de madera con herrajes, alfombras, ventanas con celosía y luz polvorienta, azulejos de İznik (motivos vegetales
//     azules y turquesa) en el zócalo, una escalera de mano; montones de papeles olvidados con polvo. Una mesa en
//     estambulDelante. Cámara 'mesa': la mesa larga de cerca con el pergamino que se despliega (PIEZAS_PR.pergamino,
//     o.abre 0–1, y o.sigue 0–1 para el gag de que se sigue desplegando hasta el suelo), una lupa, una lámpara de 1929.
//   'palacio': el exterior del palacio de Topkapı: los muros, cúpulas de plomo y las chimeneas altas de las cocinas, el
//     patio con cipreses, y detrás el Bósforo con barcos de vapor de 1929 y la otra orilla; otoño. Cámara 'museo': la sala
//     del museo de HOY: penumbra, una vitrina con el pergamino iluminado, cordones, cartelas sin letras, azulejos,
//     visitantes.
//   'prensa': una imprenta de periódicos de 1929: rotativa que escupe pliegos, linotipias, operarios, periódicos colgados
//     a secar (columnas de rayas, un dibujito de un mapa, sin letras). Cámara 'quiosco': una calle de ciudad de 1929 con un
//     quiosco de periódicos, gente con sombrero que compra y lee, un tranvía.
export function estambul(R, t, o = {}) {
  const enc = o.encuadre ?? 'biblioteca', cam = o.camara ?? 'general';
  if (enc === 'palacio') return cam === 'museo' ? a_museo(R, t, o) : a_palacio(R, t, o);
  if (enc === 'prensa') return cam === 'quiosco' ? a_quiosco(R, t, o) : a_prensa(R, t, o);
  return cam === 'mesa' ? a_mesaFondo(R, t, o) : a_biblioteca(R, t, o);
}
// lo de delante de los personajes en cada encuadre de estambul(); se llama después de los actores, con las mismas opciones
//   biblioteca: la mesa baja de la derecha (x 196–319, tablero y 146–158) con los montones de papeles, el pergamino doblado
//     (o.pergamino !== false) y el tintero; a la izquierda, la pila de libros y el cofre abierto (x 0–56, y 150–180).
//   mesa: la mesa larga entera (tablero de y 110 a y 150, faldón hasta y 162) con la lámpara de 1929, la lupa (o.lupa !==
//     false), el tintero y el pergamino que se despliega (o.abre 0–1) y que con o.sigue (0–1) cae por el borde hasta el suelo.
//   palacio: las hojas de otoño que vuelan por delante y el brocal de la fuente (x 0–44, y 150–180).
//   museo: la vitrina de mesa (base y 138–162, cristal y 108–138) con el pergamino (o.pergamino !== false) y la campana de
//     cristal que sube con o.tapa (0–1); los dos postes de latón con el cordón rojo (x 96 y 224).
//   prensa: la carretilla con los paquetes de periódicos atados (x 258–319, y 140–180).
//   quiosco: la farola de hierro (x 296–306) y el pliego suelto que el viento arrastra por la acera.
export function estambulDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'biblioteca', cam = o.camara ?? 'general';
  if (enc === 'palacio') return cam === 'museo' ? a_museoDelante(R, t, o) : a_palacioDelante(R, t, o);
  if (enc === 'prensa') return cam === 'quiosco' ? a_quioscoDelante(R, t, o) : a_prensaDelante(R, t, o);
  return cam === 'mesa' ? a_mesaDelante(R, t, o) : a_bibliotecaDelante(R, t, o);
}
// ── B · El mar, 1500–1511 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Todo vive: agua con tres trenes de olas a
// distinta velocidad, crestas, espuma y el reguero de brillos del sol o la luna; cielo tramado con nubes de tres tonos en
// tres alturas a tres velocidades; gaviotas; banderas y gallardetes al viento; barcos que cabecean. Banderas rojas y
// cruces de las velas sin símbolos legibles.
//   'galera': la cubierta de la galera otomana mirando a babor. Al fondo el mar (el horizonte sube y baja con el
//     balanceo), una costa con un pueblo y una torre, otra galera y una fusta de la flota en el horizonte. En medio, la
//     borda con la postiza y los escálamos, doce remos que bogan a una (la palada entra en el agua y salpica) y los
//     remeros en sus bancos, que tiran del remo (turbantes, gorros, fajas). La vela latina hinchada sobre la entena (o
//     recogida), el palo con su cabillero, la jarcia, el gallardete rojo del tope; a la izquierda el cañón de crujía en
//     su cureña, una tinaja y una aduja; a la derecha la popa: pared roja con paneles turquesa y oro, la puerta en arco,
//     la escala, la balaustrada dorada, el toldo a rayas, el gran farol dorado (encendido de noche) y la bandera roja.
//     Opciones: o.hora 'dia' (por omisión) | 'atardecer' | 'noche' (estrellas que titilan y luna, para «el tío le enseña
//     las estrellas»); o.vela 'abierta' (por omisión) | 'recogida'; o.balanceo (0 sin balanceo, 1 por omisión).
//     marDelante: la regala de estribor abajo (y 163–179), con cabillas y un cabo colgado.
//   Cámara 'bodega': la bodega en penumbra: forro curvo y cuadernas, baos, la escotilla a la derecha (x 186–261, fuera
//     de la barra del año y de la esquina de Atom) con su enjaretado por donde entra un haz de luz con polvo que se mueve
//     con el balanceo, la escala que baja de ella, barriles tumbados en pirámide y de pie, un cofre
//     con herrajes, sacos atados, remos de respeto, ánforas, una red con cebollas que se mece, una gota que cae del bao,
//     una rata que cruza al fondo y se para a husmear, y la lámpara de aceite que se mece y alumbra a su alrededor.
//     marDelante: el barril (x 160, tapa en y 141) sobre el que el prisionero pone el rollo de cartas.
//   'costa': frente a la costa de España en 1501. Al fondo la sierra azulada, las lomas de matorral, la torre vigía con
//     su humo de alarma y un pueblo blanco con su campanario; en el mar, tres naos españolas que huyen a la derecha
//     (cascos altos, velas cuadradas con cruces genéricas, cañonazos con humo), cada vez más lejos (avanzan con t). En
//     primer plano, a la izquierda, la proa de nuestra galera: cubierta, la regala de babor, el cañón de crujía (dispara
//     cada 5,6 s), el trinquete con la vela recogida, la roda, el espolón dorado, la banda roja, los remos de estribor que
//     bogan y salpican, la ola de proa y la bandera roja. o.hora 'dia' | 'atardecer'. marDelante: los rociones de proa.
//   Cámara 'tormenta': de noche, el temporal de 1511: nubarrones de tres tonos (base oscura, cuerpo y bordes que encienden
//     los relámpagos) en tres capas a tres velocidades, cortinas de lluvia a lo lejos, relámpagos (cada o.rayo s, 4,3 por
//     omisión) que encienden las nubes, el casco y todo el plano, olas enormes por columnas con espuma en las crestas y
//     regueros que arrastra el viento, la galera (más grande) que sube, baja y escora con la ola: el farol encendido, los
//     remos recogidos y trincados sobre la borda, los estays tensos que vibran, las entenas bajadas y en el trinquete un
//     pico de vela arrizada que bate; la ola que rompe contra la borda y su espuma que pasa por encima y escurre por el
//     costado; la ola de delante que le tapa la quilla, y la lluvia en diagonal. galera.cubierta(dx) da el punto de la
//     cubierta a dx px del centro. Sin hundimientos: solo el temporal. marDelante: lluvia
//     gorda y rociones.
//   'brasil': la costa de Brasil en 1500: el monte redondo (Monte Pascoal), la selva en filas de copas, la playa con
//     grano, ondulaciones, franja mojada, conchas, algas y un tronco; tres palmeras que se mecen; guacamayos que vuelan y
//     dos posados; dos naos portuguesas fondeadas (velas recogidas) y otra que llega con todo el trapo (cruces rojas
//     genéricas); el bote que rema de la nao a la playa (o.bote 0–1 fija su sitio; por omisión llega en 16 s); las olas
//     que suben y bajan por la orilla con su espuma; dos cangrejos que corren de lado. marDelante: matas de hierba de
//     playa en las esquinas de abajo.
//   Cámara 'cubierta': la cubierta de una nao portuguesa mirando a babor, con la costa verde de Brasil al fondo (el mar
//     sube y baja con el balanceo) y otra nao fondeada; la borda con sus batayolas y el falconete, los obenques con los
//     flechastes, el palo mayor con el cabillero, la vela mayor hinchada con su cruz roja, el cabrestante, el enjaretado,
//     una aduja y un barrilete. marDelante: el barril (x 140, tapa en y 140) sobre el que el piloto dibuja la carta y
//     pone el astrolabio (las piezas las pinta la escena después de marDelante).
// Devuelve la geometría del encuadre (suelo, horizonte, libre, y lo de cada uno: barril, farol, bote, cubierta…).
export function mar(R, t, o = {}) {
  const enc = o.encuadre ?? 'galera', cam = o.camara ?? 'general';
  if (enc === 'costa') return cam === 'tormenta' ? b_tormenta(R, t, o) : b_costaEspana(R, t, o);
  if (enc === 'brasil') return cam === 'cubierta' ? b_cubiertaNao(R, t, o) : b_playaBrasil(R, t, o);
  return cam === 'bodega' ? b_bodega(R, t, o) : b_galeraCubierta(R, t, o);
}
// lo de delante de los personajes en cada encuadre de mar(); se llama después de los actores, con las mismas opciones:
// galera, la regala de estribor; bodega, el barril (x 160, tapa y 141, 22 px de ancho); costa, los rociones de proa;
// tormenta, la lluvia gorda y los rociones; brasil, las matas de las esquinas; cubierta, el barril (x 140, tapa y 140).
// Devuelve { barril: { x, y } } cuando hay barril (para poner encima la carta, el rollo o el astrolabio).
export function marDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'galera', cam = o.camara ?? 'general', tn = b_tinte(o.hora ?? (enc === 'brasil' ? 'tropico' : 'dia'));
  if (enc === 'costa') { if (cam === 'tormenta') b_tormentaDelante(R, t); else b_costaDelante(R, t, o); return {}; }
  if (enc === 'brasil') { if (cam === 'cubierta') { b_barrilDelante(R, 140, 140, 22, tn); return { barril: { x: 140, y: 140 } }; } return b_playaDelante(R, t, o); }
  if (cam === 'bodega') { b_barrilDelante(R, 160, 141, 22, (c) => c); return { barril: { x: 160, y: 141 } }; }
  return b_galeraDelante(R, t, o);
}
// ── C · Galípoli y El Cairo, 1513–1517 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno); o.luz 'tarde' (taller y puerto): cielo de
// atardecer, sol bajo y la luz de la lámpara más cálida; o.banderas: barcos de otras banderas (verde, blanca) en el agua.
//   'taller' con o.luz 'tarde' es el CONTRAPLANO (otra composición, la misma mesa y el mismo suelo): la pared de la
//     puerta vista desde la ventana, con la puerta de arco abierta al patio al atardecer (ciprés, higuera, la fuente que
//     mana, un vecino que pasa, golondrinas), el perchero con el caftán, el kilim colgado, el casillero de rollos de
//     cartas, la hornacina con la vela, el farol calado que se mece y salpica la pared de estrellitas, la luz dorada de la
//     ventana en la pared con la sombra de la reja y de las hojas que tiembla, el brasero con sus brasas, la alfombra azul
//     bajo la mesa y el gato que duerme en el arcón. Devuelve además puerta: [22, 30, 70, 131].
//   'taller': el taller de Piri Reis en Galípoli: techo de tablas con cabezas de vigas, pared encalada con desconchones
//     y grietas, zócalo de azulejos de İznik, suelo de tablas con un kilim; a la izquierda la ventana de arco apuntado
//     (dovelas, celosías abiertas, reja) con el puerto vivo detrás (nubes, la orilla de enfrente, el agua que brilla, una
//     galera amarrada, otra que pasa a vela, una barca, gaviotas), la albahaca y un gato dormido en el alféizar, y el
//     diván con cojines debajo; en medio, la carta colgada de su vara, el astrolabio en su clavo, una repisa con el
//     aguamanil y la lámpara de aceite de latón con tres llamas que tiemblan y tiñen la pared; a la derecha la alacena
//     (rollos, reloj de arena, esfera armilar, libros tumbados, botes de pigmento), los cestos de rollos y el arcón. Haz
//     de sol con motas. La mesa de dibujo (cartas, tinteros con plumas, rollos, compás, divit, escuadra) y un cojín en el
//     suelo van en galipoliDelante. Cámara 'mesa': la mesa vista desde arriba: la piel de gacela con el mapa a medio
//     dibujar (Caribe, Sudamérica, España y África, rosas y rumbos, naos), cartas pequeñas de cuatro estilos alrededor
//     (c_carta, exportada), pesas, regla, compás, astrolabio, tinteros, estuche y la lámpara con su luz; la brisa levanta
//     una esquina y la sombra de una gaviota cruza. o.trazo 0–1: la costa sur se va dibujando hasta el borde y se tuerce
//     al este (por omisión, 1: entera); con o.trazo, galipoliDelante pone la mano de Piri con la pluma en la punta
//     (o.mano: false la quita).
//   'puerto': el puerto de Galípoli: cielo tramado con sol y nubes en tres capas, la orilla asiática con pueblos y
//     cipreses, el estrecho con oleaje, una galera grande amarrada (popa a la derecha), otra detrás, una que pasa a vela,
//     una barca; el pueblo en la loma con la mezquita y su alminar, la torre vieja y los almacenes con mozos que cargan
//     sacos; el muelle de losas con bitas, fardos, barriles, una red, cabos y gaviotas. galipoliDelante: la pasarela a la
//     popa y, en las esquinas, una bita con cabo y cajas de pescado con una gaviota. Cámara 'muelle': el muelle de cerca
//     con la galera enorme (remos alzados, marineros en cubierta, uno que sube por los obenques), fardos, sacos,
//     barriles, una caja de pescado, un ancla; galipoliDelante: la pasarela a la borda y un rollo de cabo.
//   'cairo': el salón del sultán en El Cairo: techo de casetones, muros a rayas (ablaq), dos ventanas con celosía y el
//     jardín (palmeras que se mecen, un guardia con lanza que pasea), columnas de mármol, el iwán con azulejos, el nicho
//     rojo y oro y el estrado con cojines, lámparas de vidrio, candeleros, pebetero con humo, suelo de mármol y alfombra.
//     galipoliDelante: el frente del cojín del sultán (le tapa las piernas: parece sentado) y dos tinajas con plantas.
//     Cámara 'trono': el estrado de cerca (nicho dorado, cojines de brocado, celosías con luz que titila, mesita con
//     aguamanil y dátiles, pebetero, abanico de pavo real) con el cofre (o.cofre 0–1 abre la tapa; false: sin cofre);
//     galipoliDelante: el frente del cojín del asiento.
// Devuelve la geometría del encuadre (suelo, sueloMesa, pluma, pasarela, asiento…).
export function galipoli(R, t, o = {}) {
  const enc = o.encuadre ?? 'taller', cam = o.camara ?? 'general', tarde = o.luz === 'tarde';
  if (enc === 'puerto') return cam === 'muelle' ? c_muelle(R, t, o, tarde) : c_puerto(R, t, o, tarde);
  if (enc === 'cairo') return cam === 'trono' ? c_trono(R, t, o) : c_cairo(R, t, o);
  return cam === 'mesa' ? c_mesa(R, t, o, tarde) : c_taller(R, t, o, tarde);
}
// lo de delante de los personajes en cada encuadre de galipoli(); se llama después de los actores, con las mismas opciones
export function galipoliDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'taller', cam = o.camara ?? 'general';
  if (enc === 'puerto') { if (cam === 'muelle') c_muelleDelante(R, t, o); else c_puertoDelante(R, t, o); return {}; }
  if (enc === 'cairo') { if (cam === 'trono') c_tronoDelante(R, t, o); else c_cairoDelante(R, t, o); return {}; }
  if (cam === 'mesa') c_mesaDelante(R, t, o); else c_tallerDelante(R, t, o);
  return {};
}
// ── D · Estados Unidos, 1956–1968 ─────────────────────────────────────────────────────────────────────────────────
// Otoño de New Hampshire. Cada encuadre pinta los 320 × 180 px; lo fijo va en un búfer (d_capa) y encima la vida.
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'aula' (Keene, 1956–1966): el aula del college: techo con dos lámparas de globo de leche que se mecen, pared de yeso
//     con su moteado, zócalo de friso de madera, suelo de tablas de roble en perspectiva con el sol de las ventanas (y la
//     sombra de las hojas que tiembla); a la izquierda dos ventanas de guillotina (una con la persiana a medias y su cordón
//     que se balancea) que dan a un campus de ladrillo con su cúpula blanca, arces rojos y amarillos que se mecen, hojas que
//     caen, nubes de tres tonos a tres velocidades, pájaros y una ardilla que corre por la rama; debajo, el radiador de
//     hierro con su vaho; el sacapuntas de manivela; la pizarra verde con marco de roble, borrones de tiza, la costa de
//     Sudamérica que se tuerce al este (de trazos), una flecha, una Antártida, «1513» y «?», y la repisa con tizas y el
//     borrador; encima, la caja del mapa enrollable con su anilla; a la derecha, el reloj de pared (el segundero corre), un
//     mapamundi colgado, la librería baja con el globo, la mesa del profesor (papeles, libros, la manzana, el flexo) y dos
//     pupitres de la fila de en medio a los lados. Motas de polvo en los rayos de sol.
//     Devuelve { suelo: 132 (el profesor, delante de la pizarra), sueloPupitres: 155 (los alumnos, tras los pupitres de
//     americaDelante), pizarra: [113, 31, 235, 86], mesa: [184, 106, 240, 126] }.
//     Cámara 'pupitre': el pupitre de cerca, desde el asiento: detrás, el aula desenfocada (la pizarra, una ventana con un
//     arce que se mece y hojas que caen, la pared y el suelo); el tablero (en americaDelante) con el mapa de 1513 en
//     copia fotostática, el papel de calco encima (o.calco 0–1: se desliza de la derecha y se posa sobre la costa de
//     abajo; o.dibujo: 'costa' por omisión, 'antartida' o 'tetera': lo que lleva calcado a lápiz, y con cualquiera
//     «encaja»), un atlas moderno abierto (Sudamérica y la Antártida en color), la regla, dos lápices (uno rueda un poco),
//     la goma, virutas de lápiz, el agujero del tintero, y la sombra de las hojas que tiembla sobre la madera.
//     Devuelve { suelo: 106 (quien está al otro lado del pupitre: asoma de la cintura arriba), mapa: [64, 114, 186, 170],
//     calco: [x0, y0, x1, y1] (donde está el calco ahora), costa: [x, y] (la costa que se tuerce, en el mapa) }.
//   'base' (1960): el despacho de una base aérea: techo de placas con el fluorescente que parpadea, pared de bloques de
//     hormigón pintados en dos verdes, suelo de linóleo en damero con el reflejo de la ventana; un mapa polar enmarcado (la
//     Antártida blanca, meridianos y paralelos, chinchetas rojas), una foto de un avión, el reloj; los archivadores
//     metálicos con el ventilador que oscila encima; el ventanal con la persiana subida y, detrás, la pista: hangares,
//     torre de control con la baliza que gira, la manga de viento, dos aviones de reconocimiento plateados sin insignias
//     (uno rueda despacio), otro que despega cada 9 s, un camión cisterna, mecánicos, árboles de otoño, nubes y pájaros; el
//     tablón con papeles, la fuente de agua con sus burbujas y el sillón detrás de la mesa. La mesa metálica con la máquina
//     de escribir va en americaDelante (o.hoja 0–1: cuánto lleva escrito la hoja que asoma del rodillo).
//     Devuelve { suelo: 147 (el oficial, detrás de la mesa: asoma de los hombros arriba), sueloLibre: 168 (por delante de la mesa), maquina: [104, 124],
//     ventana: [150, 24, 268, 96], mapaPolar: [40, 22, 110, 80] }.
//     Cámara 'buzon': el porche de la casa del profesor en New Hampshire: casa de tablas blancas con contraventanas verdes,
//     la puerta con la mosquitera, el farol, el porche con sus columnas y la barandilla, calabazas y un rastrillo; el jardín
//     con hojas en la hierba que el viento arrastra, el camino de grava, un muro de piedra seca por el que corre una ardilla,
//     un gran arce que se mece, colinas con el bosque de otoño, la iglesia blanca a lo lejos, humo de una chimenea, nubes y
//     pájaros; el buzón rural en su poste (o.bandera 0–1: la banderita roja se levanta; o.puerta 0–1: la tapa se abre).
//     Devuelve { suelo: 156 (el jardín y el buzón), sueloPorche: 131, puerta: [18, 70, 44, 128], buzon: [226, 124, 252, 136] }.
//   'libreria' (1966–1968): la librería: techo de chapa repujada con dos lámparas, estanterías altas de madera llenas de
//     lomos de colores (sin letras) con la escalera de rueda, un gato que duerme arriba y menea la cola, un cliente pequeño
//     que sube y baja la escalera; el escaparate y la puerta a la calle (fachadas de ladrillo, un arce, coches de los
//     sesenta y paseantes que pasan, todo recortado al cristal; la campanilla de la puerta) con libros expuestos; la vitrina
//     (o.vitrina, true por omisión) con un libro antiguo abierto y el retrato de un científico de pelo blanco despeinado, de
//     espaldas; el suelo de tablas con la alfombra. En americaDelante: la mesa de novedades con pilas de libros (portadas
//     con carabelas, naves, mapas, el libro del mapa) y el mostrador con la caja registradora (cifras que cambian);
//     o.firma: la mesa se vuelve de firmas (un atril con el pictograma de la nave, la pluma, el hueco del escritor).
//     Devuelve { suelo: 152 (los clientes y quien está tras la mesa), sueloMostrador: 146 (el librero, tras el
//     mostrador), sueloDelante: 176 (por delante de la mesa, se pintan después de americaDelante), mesa: [102, 144, 200, 172]
//     (hueco libre x 120–184 para quien está detrás), mostrador: [234, 134, 319, 179], vitrina: [194, 82, 228, 126] }.
//     Cámara 'imprenta': la imprenta de libros de los sesenta: cerchas de acero y lucernarios, ventanales de fábrica con la
//     chimenea que humea, la rotativa offset (los cilindros giran, los pliegos salen y se apilan, el contador avanza, el
//     piloto parpadea), la cinta de la encuadernadora que saca libros con la portada de las carabelas y el mapa, palés de
//     libros y cajas, resmas de papel, una carretilla, un operario pequeño que pasa al fondo, suelo de hormigón con manchas
//     y la raya amarilla. En americaDelante: la pila de libros recién hechos en su carro, en primer término a la derecha.
//     Devuelve { suelo: 156, prensa: [96, 56, 236, 146], salida: [238, 128] (donde salen los libros), mesaLibros: [262, 150] }.
export function america(R, t, o = {}) {
  const enc = o.encuadre ?? 'aula', cam = o.camara ?? 'general';
  if (enc === 'aula') return cam === 'pupitre' ? d_pupitre(R, t, o) : d_aula(R, t, o);
  if (enc === 'base') return cam === 'buzon' ? d_buzon(R, t, o) : d_base(R, t, o);
  return cam === 'imprenta' ? d_imprenta(R, t, o) : d_libreria(R, t, o);
}
// Lo de delante de los personajes en cada encuadre de america(); se llama después de los actores, con las mismas
// opciones: 'aula' los tres pupitres de la primera fila (tablero en y 150–157, con copias del mapa, calco, lápices, una
// manzana y un libro); 'pupitre' el tablero de cerca con el mapa, el calco (o.calco, o.dibujo), el atlas, la regla y los
// lápices; 'base' la mesa metálica con la máquina de escribir (o.hoja), el teléfono, las bandejas, la taza que humea y el
// flexo; 'libreria' la mesa de novedades (o.firma) y el mostrador con la caja registradora; 'imprenta' el carro con la
// pila de libros; 'buzon' nada. Devuelve lo mismo que america().
export function americaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'aula', cam = o.camara ?? 'general';
  if (enc === 'aula') return cam === 'pupitre' ? d_pupitreDelante(R, t, o) : d_aulaDelante(R, t, o);
  if (enc === 'base') return cam === 'buzon' ? {} : d_baseDelante(R, t, o);
  return cam === 'imprenta' ? d_imprentaDelante(R, t, o) : d_libreriaDelante(R, t, o);
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría del
// encuadre (ver «geometría» encima de cada auxiliar e_hoy*). LO DE DELANTE va en hoyDelante(R, t, o), que se llama
// DESPUÉS de los actores con las mismas opciones.
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom, de día, en el lenguaje del estudio del 28. General: papel
//     pintado de rayas verde mar con anclas tenues, el friso de madera con cuarterones, la ventana grande con cortinas
//     (cielo tramado, nubes de tres tonos a tres velocidades que cambian de forma, pájaros, el mar al fondo con un velero
//     y el faro que destella, tejados con chimeneas que humean y dos árboles que se mecen), el gato y un catalejo en el
//     alféizar, el radiador, el enchufe de pared (dos caritas: el de la pareidolia), la carta náutica enmarcada, el reloj
//     de barco que anda, la lámpara de techo que se balancea, la estantería con libros, un barco en botella, un sextante y
//     un astrolabio, la puerta; el escritorio con el flexo verde, el globo terráqueo que gira, el mapa enrollado
//     (PIEZAS_PR.rollo) y la taza que humea; suelo de tablas con alfombra y la mancha de sol con motas.
//     hoyDelante: el cesto de cartas enrolladas (izquierda) y el baúl de marinero (derecha).
//     o.rollo (true): el mapa enrollado en la mesa; o.abre 0–1: se desenrolla (el gag lo vuelve a 0); o.formas: dos nubes
//     con forma de barco y de pez (pr-cerebro); o.platillo: el platillo volante de juguete colgado de un hilo en la
//     estantería (pr-gancho); o.enchufe 0–1: el enchufe se ilumina un poco (para señalarlo); o.gira: grados/s del globo (8).
//     Cámara 'mesa': el escritorio de cerca, todo él en hoyDelante (quien esté detrás asoma cabeza y hombros): el mapa de
//     1513 desplegado (pergamino a nuestra manera: rosas, rumbos, la costa que se tuerce, barquitos y garabatos), el
//     flexo con su luz, el tintero con la pluma, la lupa, el compás de puntas, dos cartas lacradas y un lápiz, el globo
//     pequeño que gira y la taza que humea (hoy() solo ya pinta el escritorio vacío, para que la pantalla quede llena); detrás, la ventana
//     con nubes, el enchufe, la balda con el barco en botella y el reloj de arena, el corcho con postales y la librería.
//     o.mapa 0–1 (1): cuánto está abierto el mapa (por debajo de 1 se enrolla hacia la derecha: el gag); o.mancha 0–1: la
//     taza deja una mancha de café en el mapa con forma de continente, que crece (pr-pareidolia); o.formas, como arriba.
//   'antartida' (cámaras 'general' y 'radar'): la Antártida en el verano austral. General: cielo polar tramado con nubes de
//     tres tonos y petreles, la cordillera nevada con su sombra azul y peñascos, el frente de hielo de la costa blanca en
//     varios azules, el mar oscuro con olas y brillos, témpanos (uno tabular y uno de agujas) que derivan con su parte
//     sumergida, un velero de 1820 (bergantín de dos palos) que cabecea entre los hielos, pingüinos en un témpano (uno se
//     zambulle), el soplo de una ballena, copos; delante, la placa de hielo donde se plantan los personajes.
//     hoyDelante: un bloque de hielo que flota en primer plano (abajo a la derecha). o.barco (true); o.barcoX: x del barco
//     (por omisión navega despacio hacia la izquierda desde x 214); o.nieva (true).
//     Cámara 'radar': el corte del hielo: arriba el cielo con el sol bajo y un avión de esquís con radar que cruza y manda
//     pulsos; la superficie con el campamento (tienda, torre de sondeo con su cable, banderitas que ondean) y la mesa con el
//     monitor y el testigo de hielo (PIEZAS_PR.testigoHielo); debajo, kilómetros de hielo en capas que se doblan sobre la
//     roca, la roca con estratos, un lago bajo el hielo, el pozo del sondeo y la regla de profundidad (1, 2, 3 km).
//     o.perfil 0–1: hasta dónde ha dibujado el radar el perfil de la roca (por omisión, lo que lleva recorrido el avión);
//     o.avionX: x del avión (por omisión cruza en 14 s y vuelve a empezar); o.testigo (true).
//   'despacho' (cámaras 'general' y 'globo'): el despacho de un historiador de hoy. General: pared de estuco con
//     zócalo de madera, la librería alta con su escalera, la ventana con la persiana a medio subir (cielo, nubes, el
//     campus de ladrillo con su torre, árboles, estudiantes pequeños que pasan), la copia grande del mapa de 1513
//     enmarcada con su lámpara de cuadro, el reloj de péndulo, la segunda librería, el escritorio con el flexo verde de
//     banquero, el portátil (el mapa en la pantalla, que cambia), papeles, la regla, libros y la taza; el globo de pie que
//     gira junto al escritorio; moqueta con alfombra persa. hoyDelante: el sillón de cuero (izquierda) y la mesita con
//     libros y una planta (derecha). o.gira: grados/s del globo (6); o.desliza 0–1: la «corteza» del globo resbala hacia
//     el sur como la piel de una naranja (Hapgood, pr-hielo).
//     Cámara 'globo': el globo de cerca, grande, con Sudamérica, la Antártida blanca y el paso de Drake (un mar ancho con
//     olas blancas que se mueven); el meridiano de latón y el pie; detrás, la librería, y a la derecha la copia del mapa de
//     1513 clavada en un corcho (donde la costa sigue sin mar en medio). o.regla 0–1: una regla de madera se tiende sobre
//     el paso de Drake, de Sudamérica a la Antártida; o.gira (0: quieto, para leerlo); o.desliza como arriba; o.lat0 y
//     o.lon0: el punto del globo que queda en el centro (por omisión −38 y −62, el paso de Drake), para centrar otras zonas.
//     En la pared, el damasco tenue, un grabado de una carabela y el aplique de latón con su luz que tiembla.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'antartida') return cam === 'radar' ? e_hoyRadar(R, t, o) : e_hoyAntartida(R, t, o);
  if (enc === 'despacho') return cam === 'globo' ? e_hoyGloboCerca(R, t, o) : e_hoyDespacho(R, t, o);
  return cam === 'mesa' ? e_hoyMesa(R, t, o) : e_hoyEstudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'antartida') return cam === 'radar' ? {} : e_hoyAntartidaDelante(R, t, o);
  if (enc === 'despacho') return cam === 'globo' ? e_hoyGloboCercaDelante(R, t, o) : e_hoyDespachoDelante(R, t, o);
  return cam === 'mesa' ? e_hoyMesaDelante(R, t, o) : e_hoyEstudioDelante(R, t, o);
}
// ── F · El pergamino de 1513 ─────────────────────────────────────────────────────────────────────────────────
// El mapa de Piri Reis a nuestra manera, en pixel (nunca calcado y sin letras): la piel de gacela con su borde irregular
// de pellejo, el corte en diagonal abajo a la derecha, manchas de edad, aureolas de agua, poros (de cerca), dos agujeros de
// polilla, el oscurecido del borde y los tres pliegues (dos de arriba abajo y uno de lado a lado) con su sombra y su luz;
// el mar es el propio pergamino con un tramado azulado y una aguada verdeazul que sigue cada costa; las tierras van a
// tinta (contorno negro y un borde oscuro por dentro) con aguadas de ocre, verde, almagre y azul por manchas y con un
// rayado de pincel: Sudamérica a la izquierda (abajo se tuerce hacia el este y sigue hasta el borde roto), el Caribe
// arriba a la izquierda (La Española de pie, de norte a sur, Cuba alargada y una docena de islas de colores), la tierra del
// noroeste en la esquina, España y África a la derecha (con el estrecho), Canarias, Madeira, Azores y Cabo Verde; cinco
// rosas de los vientos de 16 puntas (las cardinales rojas, las diagonales verdes, las cortas de oro, con su flor de lis
// al norte) con sus líneas de rumbo (negras, verdes y rojas, gastadas) que cruzan el mar y no pisan la tierra; los Andes
// en hilera, ríos azules, palmeras y árboles, ciudades amuralladas con banderolas (sin escudos), un ciervo, un buey, una
// serpiente, un león y un elefante; las notas son garabatos de tinta roja y negra (renglones de trazo con astas y
// puntos, de derecha a izquierda, que no forman letras); barquitos (carabelas con velas cuadradas y latina y su
// banderola), loros, olas «~» y el pez de san Brandán con dos monjes y su fuego. Cada vista se pinta una vez en un búfer
// (R.nuevo) y se copia; lo que se mueve va encima en cada fotograma.
// o.vista: 'entero' (lo que se conserva, sobre la mesa de nogal a la luz de una vela: la palmatoria con su halo y una
//   polilla, un astrolabio, dos libros, el tintero con la pluma, un compás de puntas; dos pesas de plomo sujetan las
//   esquinas; motas de polvo en la luz), 'caribe' (de cerca: las islas, La Española de pie, una carabela, una rosa),
//   'brasil' (la costa que sobresale, palmeras con loros, ríos, una carabela, una rosa), 'sur' (la costa que se tuerce
//   hacia el este; o.borde true: se ve el borde del pergamino y la mesa debajo, con una pesa y el compás), 'brandan' (el
//   pez gigante de cerca con los dos monjes y su hoguera; o.pez 0–1: se despierta (abre el ojo, 0–0,15), se sumerge
//   (0,15–0,75) entre salpicaduras y burbujas, y los monjes se quedan flotando y chapoteando, con el fuego apagado en un
//   humo blanco).
// o.trazo 0–1 (cualquier vista): la costa de Sudamérica se va dibujando de norte a sur y luego hacia el este, con la
//   tinta fresca brillante en la punta; la aguada, los ríos, árboles, montes y notas de esa tierra salen detrás de la
//   pluma. Devuelve r.punta [x, y] (donde la escena pone la mano con la pluma). Sin o.trazo (o ≥ 1) se ve entera.
// o.borrado 0–1 (solo con vista 'entero'): el mapa del mundo de 1513 entero, apaisado sobre la mesa (el tercio que se
//   conserva a la izquierda y, a la derecha, el Mediterráneo, África entera, Arabia, la India y Asia con sus islas), y los
//   dos tercios del este se desvanecen de este a oeste, con un borde quemado, hasta que queda el oeste.
// o.vivo (por omisión 0,35: las olas, los barcos que cabecean y la cola del pez; true = 1: además los barcos navegan, la
//   mitad de los loros vuela en corros y el pez coletea; false = 0: el dibujo quieto, y solo la luz y el polvo).
// o.ilumina: 'caribe' | 'costa' | 'sur': ese trazo de costa brilla en oro, latiendo (el Caribe de Colón, la costa de
//   Sudamérica, la costa torcida del sur): la costa en oro claro, un filo de oro casi opaco con su perfil de oro viejo y
//   su halo, y un destello que corre por ella.
// o.camara 'detalle': el pergamino muy de cerca (o.zoom, 2,1 por omisión), en el centro de la vista elegida (o.centro
//   [u, v] en unidades del mapa, 0–1000 × 0–760), con la textura, los poros y los pliegues, y una lupa de latón que lo
//   recorre aumentándolo ×2 (o.lupa {x, y, r} en pantalla; por omisión da vueltas despacio). En cualquier otra vista,
//   o.lupa {x, y, r} pone la misma lupa; con o.lupaDelante true la pinta pergaminoDelante (encima de los actores).
//   De cerca (zoom 1,6 o más) el mar se llena de olas pintadas, garabatos de notas, peces de tinta, bajos, estrellas de
//   rumbo y anclas, con barquitos que van y vienen y delfines que saltan, para que cualquier centro tenga detalle.
// Devuelve { suelo, P(u, v) → [x, y], mapa: [x0, y0, x1, y1] (la caja del pergamino), punta, pez: {x, y, L, hoguera},
//   hoguera: [x, y] (la base del fuego de los monjes, tal como se pinta; en 'brandan', [149, 56]), lupa:
//   {x, y, r, mango: [x, y]}, caribe/espanola/giro/brasil: [x, y] de esos sitios en pantalla }.
export function pergamino(R, t, o = {}) {
  const V = f_vista(R, o), E = V.E, viv = o.vivo === true ? 1 : o.vivo === false ? 0 : (o.vivo ?? 0.35);
  R.recorte(null);
  R.buf.set(V.base);
  const ret = { suelo: E.suelo, P: V.P, mapa: V.caja, caribe: V.P(200, 150), espanola: V.P(196, 138), giro: V.P(222, 690), brasil: V.P(318, 420) };
  // el borrado de los dos tercios del este (solo en el mapa del mundo)
  // la costa de Sudamérica que se va dibujando
  if (V.sa) ret.punta = f_trazar(R, V, t, Math.max(0, o.trazo));
  if (o.ilumina) f_ilumina(R, V, t, o.ilumina);
  // lo que se mueve: las olas, los barcos, los loros, el pez de san Brandán
  f_vivos(R, V, t, viv, o, ret);
  if (E.mundo && o.borrado > 0) f_borrar(R, V, Math.min(1, o.borrado));
  // la mesa: la llama de la vela, su halo y la polilla
  if (E.vela) f_vela(R, V, t);
  // el polvo que flota en la luz
  for (let k = 0; k < 14; k++) { const u = ((t * (0.012 + h(k, 1, 900) * 0.02) + h(k, 2, 900)) % 1), x = Math.round(h(k, 3, 900) * 300 + 10 + Math.sin(t * 0.5 + k) * 6), y = Math.round(178 - u * 170);
    if (x > 274 && y < 48) continue; if (h(k, 4, 900) < 0.5 || Math.sin(t * 1.3 + k * 2) > -0.2) R.pset(x, y, f_mez(R.pget(x, y), hex('#fff4d8'), 0.55)); }
  // la lupa
  const lu = o.lupa ?? (E.detalle ? { x: Math.round(160 + Math.sin(t * 0.37) * 70), y: Math.round(92 + Math.sin(t * 0.61 + 1) * 34) } : null);
  if (lu) { ret.lupa = { x: lu.x, y: lu.y, r: lu.r ?? (E.detalle ? 28 : 22) }; if (!o.lupaDelante) ret.lupa.mango = f_lupa(R, lu.x, lu.y, ret.lupa.r, t); else ret.lupa.mango = f_mangoLupa(lu.x, lu.y, ret.lupa.r); }
  return ret;
}
// lo de delante de los personajes en cada encuadre de pergamino(); se llama después de los actores, con las mismas
// opciones: con o.lupa y o.lupaDelante pinta ahí la lupa (para que vaya encima de una figura que pasa por el mapa) y
// devuelve { mango: [x, y] }, donde la escena pone T.mano. Sin eso no pinta nada.
export function pergaminoDelante(R, t, o = {}) {
  if (o.lupa && o.lupaDelante) { const r = o.lupa.r ?? 22; return { mango: f_lupa(R, o.lupa.x, o.lupa.y, r, t) }; }
  return {};
}
// la paleta de Estambul: el cielo de otoño, la piedra, el plomo de las cúpulas, los azulejos de İznik, la madera, la tela
const AP = pal({
  k: '#1a1418', cie0: '#5a8cc4', cie1: '#78a4d2', cie2: '#9cbedc', cie3: '#c4d2d8', cie4: '#e6d6b4', sol: '#fff2c8', solH: '#f6dca0',
  nubL: '#fbf6ec', nubM: '#e0d8d0', nubS: '#ada6b4', nubSS: '#8e88a0',
  orilla0: '#9a9cb8', orilla1: '#8488a8', orillaL: '#b4b4c8', casaO: '#c8bcc0', tejaO: '#b08080', cipresO: '#5a6a78',
  mar0: '#3a6c9c', mar1: '#2e5a88', marL: '#7aa8d0', brillo: '#fff4d0',
  piedra: '#c8b898', piedraS: '#9a8a6c', piedraL: '#e2d4b4', piedraJ: '#8a7a60', ladr: '#a4583c', ladrS: '#7a3e2a',
  plomo: '#8e98a8', plomoS: '#646e80', plomoL: '#bcc4d0', plomoJ: '#525a6a', oro: '#e0b040', oroS: '#a87a24',
  cipres: '#2e4a32', cipresS: '#1e3424', cipresL: '#4a6a3e', hoja0: '#d87a2a', hoja1: '#e8a838', hoja2: '#b8502a', hoja3: '#8a3a22', tronco: '#6a5848', troncoS: '#4a3c32', troncoL: '#9a8a74',
  cesped: '#7a8a3a', cespedS: '#5a6a2e', cespedL: '#9aa64a', losa: '#bcae94', losaS: '#9a8c74', losaL: '#d4c8ae',
  az: '#f2efe6', azS: '#d4d0c4', azJ: '#a8a49a', cobalto: '#22489a', cobaltoL: '#4a74c4', turq: '#2a9a9a', turqL: '#5ac0b8', tomate: '#c8382a', verdeAz: '#3a8a4a',
  mad: '#7a4a2a', madS: '#4e2c18', madL: '#a06a3a', madD: '#36200f', madV: '#8a5832', nogal: '#5a3420', nogalL: '#7a4a2c',
  yeso: '#e4d8bc', yesoS: '#c8b896', yesoL: '#f0e6cc', luz: '#fff0c4', luzS: '#f0d8a0', polvo: '#f4e4b8',
  alf0: '#9a2a24', alf1: '#c8a248', alf2: '#22305a', alf3: '#e8dcc0', alfS: '#6a1a18',
  papel: '#eee4cc', papelS: '#c8b894', papelV: '#d8c8a0', cuerda: '#b89a5a', hierro: '#3a3a44', hierroL: '#6a6a78',
  perg: '#e8d4a4', pergS: '#c4a46c', pergL: '#f4e6c0', pergD: '#9a7a48', tinta: '#2a2018', tRoja: '#a83224', tVerde: '#4a7a3a', tAzul: '#2a4a7a', tOcre: '#c08a3a', tMarron: '#8a5a32',
  cobre: '#c87a3a', laton: '#d8b048', latonS: '#9a7a2a', latonL: '#f4dc88', verdeLamp: '#2a7a4a', verdeLampL: '#6ac08a',
  noche: '#16141e', museo0: '#24222e', museo1: '#2e2c3a', museoL: '#4a4658', sueloM: '#1e1c26', sueloML: '#3a3648', cordon: '#a8202a', cordonL: '#e04848',
  hierroP: '#2a2c30', hierroPL: '#4a4e56', hierroPS: '#16171a', verdeMaq: '#2e4a3e', verdeMaqL: '#4a6e5a', cal: '#d8ccb4', calS: '#b4a68c', vigas: '#5a3e28', vigasS: '#3a2818',
  ladrP: '#9a5a44', ladrPS: '#74402e', tablas: '#8a6440', tablasS: '#6a4a2e', tablasL: '#a87e52', tintaM: '#1a1a22',
  fachada0: '#d8c4a4', fachada1: '#c89a7a', fachada2: '#a8b0a0', fachada3: '#e0d0b8', persiana: '#4a6a5a', persianaL: '#6a8a74', toldo0: '#b8382a', toldo1: '#e8dcc8',
  adoq: '#6a6460', adoqS: '#4e4846', adoqL: '#8a8480', rail: '#a8acb4', acera: '#a8a094', aceraS: '#867e72', aceraL: '#c4bcae',
  tranvia: '#b8302a', tranviaS: '#842018', tranviaC: '#e8dcb8', cristal: '#3a5068', cristalL: '#8ab0c8',
  piel: '#e8b48a', pielS: '#c08a64', traje0: '#3a3a4a', traje1: '#5a4a3a', traje2: '#4a5a6a', traje3: '#6a5a4a', sombrero: '#2a2a30', sombreroL: '#4a4a52',
});

const a_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de Bayer 4×4 (0–1) para las tramas
const a_b4 = (x, y) => (a_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores (a = 0 deja c, a = 1 da d)
function a_mez(c, d, a) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a) << s; return (r | 0xff000000) >>> 0; }

// tiñe un rectángulo hacia el color c (a: fuerza 0–1; trama: con trama de Bayer en lugar de mezcla lisa)
function a_velo(R, x0, y0, x1, y1, c, a, trama = false) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) {
    if (trama) { if (a > a_b4(x, y)) R.pset(x, y, c); } else R.pset(x, y, a_mez(R.pget(x, y), c, a)); }
}

// capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma; dibuja() puede
// devolver datos (máscaras, perfiles) que se guardan con la capa
const a_capas = new WeakMap();

function a_fijo(R, clave, dibuja) {
  let m = a_capas.get(R); if (!m) a_capas.set(R, m = {});
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const datos = dibuja(b) || {}; R.usar(prev); m[clave] = { b, datos }; }
  R.copiar(m[clave].b); return m[clave].datos;
}

// una nube de tres tonos (luz arriba, medio, panza en sombra) hecha de lóbulos; libre(x, y) dice dónde se puede pintar
function a_nube(R, cx, cy, w, libre, k = 0) {
  const hh = Math.max(3, w * 0.22), lob = [[-0.3, 0.75], [-0.05, 1.15], [0.22, 0.95], [0.38, 0.6]];
  const x0 = Math.floor(cx - w / 2 - 2), x1 = Math.ceil(cx + w / 2 + 2), y0 = Math.floor(cy - hh * 1.4), y1 = Math.ceil(cy + hh * 0.55);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (x < 0 || x > 319 || y < 0 || !libre(x, y)) continue;
    let dentro = ((x - cx) / (w / 2)) ** 2 + ((y - cy) / (hh * 0.55)) ** 2 < 1, alto = 0;
    for (const [lx, lr] of lob) { const r = hh * lr * (0.9 + 0.2 * h(k, lx * 10, 77)), dx = x - (cx + lx * w), dy = y - (cy - hh * 0.25); if (dx * dx + dy * dy < r * r) { dentro = true; alto = Math.max(alto, -dy / r - dx / r * 0.4); } }
    if (!dentro || y > cy + hh * 0.5) continue;
    const v = (y - cy) / hh, s = v + (h(x, y, 78 + k) - 0.5) * 0.25;
    R.pset(x, y, s > 0.22 ? (s > 0.42 ? AP.nubSS : AP.nubS) : (alto > 0.35 + a_b4(x, y) * 0.3 ? AP.nubL : AP.nubM));
  }
}

// una gaviota que aletea (5 px), recortada por libre(x, y) si se da
function a_gaviota(R, x, y, t, k = 0, libre = null) {
  x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 5 + k * 1.7) % 3, ps = (xx, yy, c) => { if (!libre || libre(xx, yy)) R.pset(xx, yy, c); };
  ps(x, y, AP.nubL); ps(x + 1, y, AP.nubM);
  const ala = a === 0 ? -1 : a === 1 ? 0 : 1;
  ps(x - 1, y + ala, AP.k); ps(x - 2, y + ala * 2, AP.k); ps(x + 2, y + ala, AP.k); ps(x + 3, y + ala * 2, AP.k);
}

// una figurita de fondo (6–12 px): traje, sombrero de ala, brazos que se balancean al andar; o.dir, o.anda, o.alto, o.ropa,
// o.gorra (gorra plana de obrero), o.carga ('libros' | 'cesta' | 'papel'), o.clip(x, y) para recortarla a un hueco
function a_figurita(R, x, s, t, o = {}) {
  x = Math.round(x); s = Math.round(s);
  const ps = o.clip ? (xx, yy, c) => { if (o.clip(xx, yy)) R.pset(xx, yy, c); } : R.pset, d = o.dir ?? 1, k = o.k ?? 0, al = o.alto ?? 11;
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, ropa = o.ropa ?? AP.traje0, ropaS = a_mez(ropa, AP.k, 0.4), piel = o.piel ?? AP.piel;
  const yP = s - Math.round(al * 0.32), yC = s - al + 3;
  for (let y = yP; y <= s; y++) { ps(x - 1 + (y > s - 2 ? paso : 0), y, AP.k); ps(x + 1 - (y > s - 2 ? paso : 0), y, AP.k); }
  for (let y = yC + 1; y < yP; y++) for (let i = -1; i <= 1; i++) ps(x + i, y, i === d ? ropaS : ropa);
  const br = o.anda ? (Math.floor(t * 6 + k) % 2 ? 1 : -1) : 0;
  ps(x - 2 * d + (br > 0 ? -d : 0), yC + 2, ropaS); ps(x - 2 * d, yC + 3, piel);
  if (o.carga === 'libros') { for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) ps(x + 2 * d + i * d, yC + 1 + j, [AP.alf0, AP.verdeLamp, AP.mad, AP.cobalto][j]); ps(x + 2 * d, yC + 3, piel); }
  else if (o.carga === 'papel') { for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) ps(x + 2 * d + i * d, yC - 1 + j, j === 0 ? AP.papelS : AP.papel); }
  else if (o.carga === 'cesta') { for (let i = -2; i <= 2; i++) ps(x + i, yC - 4, AP.madL); ps(x - 1, yC - 5, AP.hoja1); ps(x + 1, yC - 5, AP.hoja1); }
  else ps(x + 2 * d - (br > 0 ? d : 0), yC + 3, piel);
  ps(x, yC, piel); ps(x + d, yC, piel); ps(x, yC - 1, piel); ps(x + d, yC - 1, piel); ps(x + d, yC, AP.pielS);
  if (o.gorra) { ps(x - 1, yC - 2, o.gorra); ps(x, yC - 2, o.gorra); ps(x + 1, yC - 2, o.gorra); ps(x + 2 * d, yC - 2, o.gorra); }
  else if (o.sinSombrero) { ps(x, yC - 2, AP.troncoS); ps(x + d, yC - 2, AP.troncoS); }
  else { const sm = o.sombrero ?? AP.sombrero; ps(x - 1, yC - 2, sm); ps(x, yC - 2, sm); ps(x + 1, yC - 2, sm); ps(x + 2, yC - 2, sm); ps(x, yC - 3, sm); ps(x + 1, yC - 3, sm); }
}

// panel de azulejos de İznik: fondo blanco cuarteado, rosetas de cobalto y turquesa con el corazón rojo tomate, cuartos de
// roseta en las esquinas (el dibujo continúa de un azulejo a otro), hojas en diagonal y juntas; o.s lado del azulejo, o.osc
// sombra 0–1, o.k semilla
function a_azulejos(R, x0, y0, x1, y1, o = {}) {
  const s = o.s ?? 10, osc = o.osc ?? 0, k = o.k ?? 0, m = s / 2;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = (x - x0) % s, j = (y - y0) % s; let c;
    if (i === 0 || j === 0) c = AP.azJ;
    else { const dx = i - m, dy = j - m, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx), rc = Math.min(Math.hypot(i, j), Math.hypot(s - i, j), Math.hypot(i, s - j), Math.hypot(s - i, s - j));
      if (r < 1.3) c = AP.tomate;
      else if (r < m * 0.72 && Math.cos(a * 6) > -0.2) c = r < m * 0.45 ? AP.turq : AP.cobalto;
      else if (rc < m * 0.55) c = rc < m * 0.3 ? AP.tomate : AP.cobaltoL;
      else if (Math.abs(Math.abs(dx) - Math.abs(dy)) < 0.8 && r > m * 0.8) c = AP.verdeAz;
      else c = h(x, y, 600 + k) < 0.06 ? AP.azS : AP.az; }
    if (osc > 0 && osc > a_b4(x, y) * 1.4) c = a_mez(c, AP.k, 0.35);
    R.pset(x, y, c);
  }
}

// celosía de madera (rejilla de rombos) en el hueco [x0, y0, x1, y1] con arco apuntado arriba; detrás(x, y) pinta lo que se
// ve por los huecos (luz, cielo); devuelve la función que dice si un punto está en el hueco de la ventana
function a_celosia(R, x0, y0, x1, y1, detras, paso = 5) {
  const cx = (x0 + x1) / 2, w = (x1 - x0) / 2, arco = y0 + w * 1.1;
  const dentro = (x, y) => x >= x0 && x <= x1 && y <= y1 && (y >= arco || Math.hypot((x - cx) * 1.0, (y - arco) * 0.95) <= w + Math.abs(x - cx) * 0.25 && y >= y0);
  for (let y = y0 - 3; y <= y1 + 3; y++) for (let x = x0 - 3; x <= x1 + 3; x++) {
    if (dentro(x, y)) { const u = ((x + y) % paso + paso) % paso, v = ((x - y) % paso + paso) % paso; const barra = u === 0 || v === 0;
      R.pset(x, y, barra ? (u === 0 && v === 0 ? AP.madD : ((x + y) & 1 ? AP.madS : AP.mad)) : detras(x, y)); }
    else if (dentro(x + 2, y) || dentro(x - 2, y) || dentro(x, y + 2) || dentro(x, y - 2)) R.pset(x, y, AP.madS);
    else if (dentro(x + 3, y) || dentro(x - 3, y) || dentro(x, y + 3) || dentro(x, y - 3)) R.pset(x, y, AP.madL);
  }
  return dentro;
}

// una balda llena: lomos de libros de piel de distintos anchos y alturas (con nervios dorados), legajos atados con cuerda y
// rollos en sus casillas; k semilla, polvo 0–1 (una capa gris en los cantos)
function a_balda(R, x0, x1, yb, alto, k = 0, polvo = 0.4) {
  const lomos = [AP.alf0, AP.mad, AP.verdeLamp, AP.alf2, AP.nogalL, AP.tMarron, AP.tRoja, AP.pergD];
  let x = x0;
  while (x < x1 - 1) {
    const q = h(x, k, 610), w = 2 + Math.floor(q * 3);
    if (x + w > x1) break;
    if (q < 0.12 && x + 9 < x1) {   // un legajo: papeles apilados de canto, atados
      const hh = Math.round(alto * 0.45); for (let j = 0; j < hh; j++) R.rect(x, yb - j, x + 7, yb - j, j % 2 ? AP.papel : AP.papelV); R.rect(x + 3, yb - hh, x + 3, yb, AP.cuerda); R.rect(x, yb - Math.round(hh / 2), x + 7, yb - Math.round(hh / 2), AP.cuerda);
      R.rect(x, yb - hh, x + 7, yb - hh, a_mez(AP.papel, AP.azS, polvo)); x += 9; continue; }
    if (q > 0.93 && x + 8 < x1) {   // dos rollos tumbados
      for (const yy of [yb - 2, yb - 6]) { R.rect(x, yy - 1, x + 7, yy + 1, AP.papelV); R.rect(x, yy - 1, x + 7, yy - 1, AP.papel); R.pset(x, yy, AP.pergD); R.pset(x + 7, yy, AP.pergD); } x += 9; continue; }
    const hb = alto - Math.floor(h(x, k, 611) * alto * 0.35), c = lomos[Math.floor(h(x, k, 612) * lomos.length)], cS = a_mez(c, AP.k, 0.4), cL = a_mez(c, AP.yesoL, 0.3);
    const incl = h(x, k, 613) < 0.08 ? 1 : 0;
    for (let j = 0; j < hb; j++) { const xx = x + (incl && j > hb / 2 ? 1 : 0); R.rect(xx, yb - j, xx + w - 1, yb - j, c); R.pset(xx, yb - j, cL); R.pset(xx + w - 1, yb - j, cS); }
    if (hb > 6) { R.rect(x, yb - hb + 2, x + w - 1, yb - hb + 2, AP.oro); R.rect(x, yb - 3, x + w - 1, yb - 3, AP.oroS); }
    R.rect(x, yb - hb + 1, x + w - 1, yb - hb + 1, a_mez(c, AP.azS, polvo));
    x += w + (h(x, k, 614) < 0.1 ? 1 : 0);
  }
}

// cofre de madera con flejes de hierro, clavos, la cerradura y el brillo de la tapa; abierto: la tapa levantada con papeles
function a_cofre(R, x, s, w, al, abierto = false) {
  const { rect, pset } = R;
  rect(x, s - al, x + w, s, AP.k); rect(x + 1, s - al + 1, x + w - 1, s - 1, AP.mad);
  for (let y = s - al + 2; y < s - 1; y += 2) for (let i = x + 1; i < x + w; i++) if (h(i >> 2, y, 620) < 0.3) pset(i, y, AP.madV);
  rect(x + 1, s - 2, x + w - 1, s - 1, AP.madS); rect(x + 1, s - al + 1, x + w - 1, s - al + 1, AP.madL);
  for (const fx of [x + 3, x + w - 4]) { rect(fx, s - al, fx + 1, s, AP.hierro); for (let y = s - al + 2; y < s; y += 3) pset(fx, y, AP.hierroL); }
  rect(x + (w >> 1) - 2, s - al + 3, x + (w >> 1) + 2, s - al + 7, AP.hierro); pset(x + (w >> 1), s - al + 5, AP.k); pset(x + (w >> 1) - 1, s - al + 4, AP.latonL);
  if (abierto) { rect(x - 1, s - al - 9, x + w + 1, s - al - 1, AP.k); rect(x, s - al - 8, x + w, s - al - 2, AP.madS); rect(x, s - al - 8, x + w, s - al - 7, AP.madL);
    for (let i = 0; i < 5; i++) { const px = x + 3 + i * Math.floor((w - 6) / 5); rect(px, s - al - 1 - (i % 2) * 2, px + 4, s - al + 1, i % 2 ? AP.papel : AP.papelV); } }
  else { rect(x, s - al - 3, x + w, s - al, AP.k); rect(x + 1, s - al - 2, x + w - 1, s - al - 1, AP.madL); rect(x + 1, s - al - 2, x + w - 1, s - al - 2, a_mez(AP.madL, AP.azS, 0.5)); }
}

// el pergamino de 1513 a nuestra manera, en el rectángulo [x0, y0, x0 + w, y0 + al]: piel de gacela con manchas y bordes
// oscuros, el mar sin pintar, las tierras en colores (ocre, verde, rojo), la costa a tinta, las líneas de rumbo de las rosas
// de los vientos, islas, barquitos y garabatos de tinta (notas sin letras); luz 0–1 aclara; clip(x, y) recorta
function a_pergamino(R, x0, y0, w, al, t, o = {}) {
  const luz = o.luz ?? 0, clip = o.clip, ps = (x, y, c) => { if (!clip || clip(x, y)) R.pset(x, y, c); };
  const tierra = (u, v) => {
    const este = u - (0.74 + 0.07 * Math.sin(v * 7) + 0.04 * Math.sin(v * 19 + 1) - (v > 0.55 ? (v - 0.55) * 0.25 : 0));   // Europa y África
    const oeste = (0.3 + 0.08 * Math.sin(v * 5 + 2) + 0.03 * Math.sin(v * 17)) - u + (v < 0.42 ? -0.4 : 0);              // las tierras nuevas
    const sur = v - (0.86 + 0.04 * Math.sin(u * 9) - (u < 0.5 ? (0.5 - u) * 0.2 : 0)) + (u > 0.65 ? -0.3 : 0);           // la costa del sur
    let isla = -1; for (const [iu, iv, ir] of [[0.36, 0.3, 0.035], [0.43, 0.27, 0.02], [0.4, 0.36, 0.025], [0.55, 0.42, 0.018], [0.62, 0.22, 0.015]]) isla = Math.max(isla, ir - Math.hypot((u - iu) * 1.6, v - iv));
    return Math.max(este, oeste, sur, isla * 3);
  };
  const rosas = [[0.5, 0.48], [0.58, 0.8]], cR = [AP.tRoja, AP.tVerde, AP.tinta, AP.tAzul];
  for (let y = y0; y <= y0 + al; y++) for (let x = x0; x <= x0 + w; x++) {
    const u = (x - x0) / w, v = (y - y0) / al, borde = Math.min(u, 1 - u, v, 1 - v) * Math.min(w, al);
    if (borde < 0.5) { ps(x, y, AP.pergD); continue; }
    const f = tierra(u, v), q = h(x, y, 630);
    let c = q < 0.06 ? AP.pergS : (h(x >> 2, y >> 2, 631) < 0.15 ? AP.pergS : AP.perg);
    if (borde < 2.5) c = a_mez(c, AP.pergD, 0.5);
    if (f > 0.012) { const z = h(Math.floor(x / 5), Math.floor(y / 4), 632); c = z < 0.35 ? AP.tOcre : z < 0.6 ? AP.tVerde : z < 0.78 ? AP.tMarron : AP.tRoja; if (q < 0.15) c = a_mez(c, AP.perg, 0.35); }
    else if (f > -0.012) c = AP.tinta;
    else if (f > -0.03 && ((x + y) & 1)) c = AP.tAzul;
    else for (let r = 0; r < rosas.length; r++) { const dx = u * w - rosas[r][0] * w, dy = v * al - rosas[r][1] * al, d = Math.hypot(dx, dy); if (d < 1.6) { c = AP.tRoja; break; }
      if (d < 3.2) { c = AP.oro; break; }
      const a = Math.atan2(dy, dx), sec = Math.round(a / (Math.PI / 8)), dist = Math.abs(d * Math.sin(a - sec * Math.PI / 8)); if (dist < 0.5 && d < w * 0.6 && (x + y + r) % 3) { c = cR[(sec + 16 + r) % 4]; break; } }
    if (luz > 0) c = a_mez(c, AP.pergL, luz * 0.25);
    ps(x, y, c);
  }
  // los barquitos (casco, palo y vela), el loro de las tierras nuevas, el pez y los garabatos de las notas
  const P = (u, v) => [Math.round(x0 + u * w), Math.round(y0 + v * al)];
  for (const [u, v, c] of [[0.45, 0.58, AP.tRoja], [0.6, 0.32, AP.tinta], [0.52, 0.7, AP.tAzul]]) { const [bx, by] = P(u, v); ps(bx - 2, by, AP.tMarron); ps(bx - 1, by + 1, AP.tMarron); ps(bx, by + 1, AP.tMarron); ps(bx + 1, by + 1, AP.tMarron); ps(bx + 2, by, AP.tMarron); ps(bx, by - 1, AP.tinta); ps(bx, by - 2, AP.tinta); ps(bx + 1, by - 2, c); ps(bx + 1, by - 1, c); }
  { const [px, py] = P(0.18, 0.6); ps(px, py, AP.tRoja); ps(px + 1, py, AP.tVerde); ps(px, py + 1, AP.tRoja); ps(px + 1, py - 1, AP.oro); }
  { const [px, py] = P(0.66, 0.6); ps(px, py, AP.tAzul); ps(px + 1, py - 1, AP.tAzul); ps(px + 1, py + 1, AP.tAzul); ps(px + 2, py, AP.tAzul); }
  for (const [u, v] of [[0.12, 0.2], [0.85, 0.15], [0.3, 0.9], [0.8, 0.5]]) { const [gx, gy] = P(u, v); for (let i = 0; i < Math.min(9, w * 0.1); i++) ps(gx + i, gy + ((i % 3) === 1 ? -1 : 0), AP.tinta); for (let i = 0; i < Math.min(6, w * 0.07); i++) ps(gx + i, gy + 2 + ((i % 2) ? -1 : 0), AP.tinta); }
}

// el pergamino doblado (un paquete de piel con los pliegues y un asomo de color en el canto), centrado en (cx, cy)
function a_pergaminoDoblado(R, cx, cy, w = 22, al = 13) {
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - al / 2);
  R.rect(x0 + 1, y0 + 2, x0 + w + 1, y0 + al + 1, a_mez(AP.k, AP.mad, 0.4));
  R.rect(x0, y0, x0 + w, y0 + al, AP.pergD); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + al - 1, AP.perg);
  for (let x = x0 + 1; x < x0 + w; x++) for (let y = y0 + 1; y < y0 + al; y++) if (h(x, y, 640) < 0.08) R.pset(x, y, AP.pergS);
  R.rect(x0 + Math.round(w / 3), y0 + 1, x0 + Math.round(w / 3), y0 + al - 1, AP.pergS); R.rect(x0 + 1, y0 + Math.round(al / 2), x0 + w - 1, y0 + Math.round(al / 2), AP.pergS);
  R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, AP.pergL); R.rect(x0 + w - 3, y0 + al - 3, x0 + w - 1, y0 + al - 1, AP.tVerde); R.pset(x0 + w - 4, y0 + al - 1, AP.tRoja); R.pset(x0 + 2, y0 + al - 1, AP.tOcre);
}

// el pergamino que se abre sobre un tablero: o.abre 0 (doblado) → 1 (abierto en [x0, y0, x0 + w, y0 + al]), con los
// pliegues que se van alisando y una sombra debajo
function a_pergaminoAbre(R, x0, y0, w, al, t, abre, o = {}) {
  const cx = x0 + w / 2, cy = y0 + al / 2;
  if (abre <= 0.02) { a_pergaminoDoblado(R, cx, cy); return; }
  const u = Math.min(1, abre), ww = Math.round(22 + (w - 22) * u), aa = Math.round(13 + (al - 13) * Math.min(1, u * 1.6));
  const xa = Math.round(cx - ww / 2), ya = Math.round(cy - aa / 2);
  R.rect(xa + 2, ya + 2, xa + ww + 2, ya + aa + 2, a_mez(AP.k, AP.mad, 0.45));
  a_pergamino(R, x0, y0, w, al, t, { clip: (x, y) => x >= xa && x <= xa + ww && y >= ya && y <= ya + aa, luz: o.luz });
  R.rect(xa, ya, xa + ww, ya, AP.pergD); R.rect(xa, ya + aa, xa + ww, ya + aa, AP.pergD); R.rect(xa, ya, xa, ya + aa, AP.pergD); R.rect(xa + ww, ya, xa + ww, ya + aa, AP.pergD);
  const pl = 1 - u; if (pl > 0.05) for (let k = 1; k < 4; k++) { const fx = xa + Math.round(ww * k / 4); for (let y = ya + 1; y < ya + aa; y++) if (pl > a_b4(fx, y) * 0.9) { R.pset(fx, y, AP.pergS); R.pset(fx + 1, y, AP.pergL); } }
  if (u < 0.98) { const fy = ya + Math.round(aa / 2); for (let x = xa + 1; x < xa + ww; x++) if (pl > a_b4(x, fy) * 0.7) R.pset(x, fy, AP.pergS); }
}

// el fondo fijo de la biblioteca: el friso pintado (kalem işi), la ventana de celosía con su luz, las tres estanterías con
// libros, legajos y rollos, la puerta del pasillo, el zócalo de azulejos, el suelo de tablas y la alfombra
function a_bibliotecaFijo(R) {
  const { rect, pset, linea } = R;
  // la pared de yeso con su textura y el friso pintado de arriba (tranquilo en la esquina de Atom)
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 650); pset(x, y, q < 0.08 ? AP.yesoS : y < 6 ? a_mez(AP.yeso, AP.yesoS, 0.4) : AP.yeso); }
  for (let x = 0; x < 276; x++) { rect(x, 16, x, 16, AP.madS); rect(x, 26, x, 26, AP.madS); const m = (x % 12); for (let y = 17; y < 26; y++) { const dy = y - 21.5, c = Math.abs(dy) < 1 + Math.abs(Math.sin(m / 12 * Math.PI)) * 3 ? (m < 6 ? AP.tRoja : AP.turq) : (Math.abs(dy - Math.sin(x * 0.5) * 2) < 0.7 ? AP.tVerde : AP.yesoL); pset(x, y, c); } }
  // ventana de celosía de la izquierda: por los rombos, la luz blanca del patio y el verde de un ciprés
  const detrasV = (x, y) => (Math.abs(x - 52 - Math.sin(y * 0.3) * 1.5) < 3 + (y - 40) * 0.05 && y > 44 ? (h(x, y, 651) < 0.4 ? AP.cipresL : AP.cipres) : y > 86 ? AP.piedraL : (a_b4(x, y) < (y - 30) / 70 ? AP.luzS : AP.luz));
  a_celosia(R, 32, 34, 74, 102, detrasV);
  rect(28, 102, 78, 105, AP.k); rect(29, 102, 77, 103, AP.madL); rect(29, 104, 77, 104, AP.madS);
  // ventana pequeña de la derecha (más alta que la zona de Atom no llega: empieza en y 50)
  a_celosia(R, 238, 52, 270, 100, (x, y) => (a_b4(x, y) < 0.5 ? AP.luz : AP.luzS));
  rect(235, 100, 273, 103, AP.k); rect(236, 100, 272, 101, AP.madL);
  // el zócalo de azulejos de İznik bajo las ventanas
  a_azulejos(R, 0, 106, 80, 119, { s: 7, k: 1 }); a_azulejos(R, 232, 106, 284, 119, { s: 7, k: 2 });
  rect(0, 105, 80, 105, AP.madS); rect(232, 105, 284, 105, AP.madS);
  // las tres estanterías: madera con vetas, cornisa tallada, baldas con libros, legajos y rollos, y la sombra de dentro
  for (const [x0, x1] of [[84, 132], [134, 182], [184, 230]]) {
    rect(x0, 30, x1, 120, AP.k); rect(x0 + 1, 31, x1 - 1, 119, AP.madS);
    for (let y = 31; y < 120; y++) for (let x = x0 + 1; x <= x1 - 1; x++) if (x < x0 + 4 || x > x1 - 4) pset(x, y, h(x, y >> 2, 652) < 0.3 ? AP.madV : AP.mad);
    rect(x0 - 1, 28, x1 + 1, 31, AP.madL); rect(x0 - 1, 27, x1 + 1, 27, AP.k); for (let x = x0; x < x1; x += 4) pset(x + 2, 30, AP.madD);
    rect(x0 + 4, 32, x1 - 4, 33, AP.madD);
    for (let s = 0; s < 5; s++) { const yb = 48 + s * 16; rect(x0 + 4, yb + 1, x1 - 4, yb + 2, AP.madL); rect(x0 + 4, yb + 3, x1 - 4, yb + 3, AP.madD);
      for (let y = yb - 14; y <= yb; y++) rect(x0 + 4, y, x1 - 4, y, a_mez(AP.madD, AP.mad, (y - yb + 14) / 30));
      a_balda(R, x0 + 5, x1 - 5, yb, 13 - (s === 4 ? 2 : 0), x0 + s * 7, 0.5); }
    rect(x0 + 4, 116, x1 - 4, 119, AP.madS);
  }
  // la puerta del pasillo (a la derecha): marco tallado y el pasillo de azulejos en penumbra
  rect(284, 56, 318, 120, AP.k); rect(286, 58, 316, 120, AP.madL); rect(288, 60, 314, 120, AP.k);
  a_azulejos(R, 289, 61, 313, 119, { s: 6, osc: 0.75, k: 3 });
  for (let y = 61; y < 120; y++) for (let x = 289; x < 314; x++) if (y > 100) pset(x, y, ((x + y) & 1) ? AP.madS : AP.madD);
  rect(284, 52, 318, 56, AP.mad); rect(284, 52, 318, 52, AP.madL); for (let x = 286; x < 318; x += 4) pset(x, 54, AP.oroS);
  // el suelo de tablas anchas con vetas y la alfombra turca en perspectiva (borde, cenefa y medallón)
  for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor((x + (y - 120) * (x - 160) / 140) / 22), junta = ((x + (y - 120) * (x - 160) / 140) % 22 + 22) % 22 < 1;
    let c = junta ? AP.madD : (h(tab, y >> 1, 653) < 0.25 ? AP.madS : AP.mad); if (!junta && h(x, y, 654) < 0.05) c = AP.madV; pset(x, y, c); }
  const al0 = 130, al1 = 176;
  for (let y = al0; y <= al1; y++) { const v = (y - al0) / (al1 - al0), xl = Math.round(70 - v * 30), xr = Math.round(250 + v * 30);
    for (let x = xl; x <= xr; x++) { const u = (x - xl) / (xr - xl), bu = Math.min(u, 1 - u) * (xr - xl), bv = Math.min(y - al0, al1 - y);
      let c;
      if (bu < 1 || bv < 1) c = AP.alfS;
      else if (bu < 6 || bv < 4) c = ((x + y) % 4 < 2) ? AP.alf1 : AP.alf2;
      else if (bu < 7 || bv < 5) c = AP.alf3;
      else { const du = (u - 0.5) * 2, dv = (v - 0.5) * 2, dm = Math.abs(du) * 1.1 + Math.abs(dv) * 1.6; c = dm < 0.35 ? (dm < 0.18 ? AP.alf1 : AP.alf2) : dm < 0.4 ? AP.alf3 : (h(x >> 1, y, 655) < 0.08 ? AP.alfS : AP.alf0);
        if (dm > 0.5 && ((x >> 2) + (y >> 1)) % 7 === 0) c = AP.alf1; }
      pset(x, y, c); }
    for (let x = xl - 2; x < xl; x++) if (y % 2) pset(x, y, AP.alf3); for (let x = xr + 1; x <= xr + 2; x++) if (y % 2) pset(x, y, AP.alf3); }
  // las manchas de luz de la celosía en el suelo
  for (let y = 122; y < 168; y++) for (let x = 0; x < 140; x++) { const sx = x - (y - 105) * 0.9, sy = y; if (sx >= 26 && sx <= 72 && ((Math.round(sx + sy) % 5 + 5) % 5) && ((Math.round(sx - sy) % 5 + 5) % 5)) { if (a_b4(x, y) < 0.5) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.4)); } }
  // los rayos de luz polvorientos que bajan en diagonal desde la celosía
  for (let y = 40; y < 150; y++) for (let x = 30; x < 180; x++) { const sx = x - (y - 40) * 0.9; if (sx > 34 && sx < 72 && a_b4(x, y) < 0.18) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.5)); }
  // la escalera de mano apoyada en la estantería del centro
  linea(166, 34, 176, 150, AP.k); linea(167, 34, 177, 150, AP.madL); linea(178, 34, 188, 150, AP.k); linea(179, 34, 189, 150, AP.madL);
  for (let k = 0; k < 11; k++) { const y = 42 + k * 10, xa = 167 + (y - 34) * 10 / 116; rect(Math.round(xa), y, Math.round(xa) + 12, y + 1, AP.madS); rect(Math.round(xa), y, Math.round(xa) + 12, y, AP.madL); }
  // el cofre cerrado y el atril (rahle) del fondo, montones de papeles con polvo junto a la estantería
  a_cofre(R, 240, 132, 34, 13);
  for (let k = 0; k < 3; k++) { const px = 8 + k * 22, pb = 136 - k; for (let j = 0; j < 12 - k * 3; j++) { const dx = Math.round(Math.sin(j * 1.7 + k) * 1.5); rect(px + dx, pb - j, px + 16 + dx, pb - j, j % 3 === 0 ? AP.papelS : j % 2 ? AP.papel : AP.papelV); }
    rect(px, pb - 12 + k * 3, px + 16, pb - 12 + k * 3, a_mez(AP.papel, AP.azJ, 0.6)); rect(px + 8, pb - 12 + k * 3, px + 8, pb, AP.cuerda); }
  { const ax = 212, ay = 138; linea(ax, ay, ax + 12, ay - 12, AP.k); linea(ax + 12, ay, ax, ay - 12, AP.k); linea(ax + 1, ay, ax + 13, ay - 12, AP.madL); linea(ax + 11, ay, ax - 1, ay - 12, AP.mad);
    rect(ax - 2, ay - 15, ax + 14, ay - 12, AP.alf2); rect(ax - 2, ay - 15, ax + 6, ay - 14, AP.papel); rect(ax + 7, ay - 15, ax + 14, ay - 14, AP.papelV); }
  // el polvo sobre la cornisa y las telarañas de la esquina de la ventana
  for (let x = 84; x < 231; x++) if (h(x, 1, 656) < 0.4) pset(x, 27, AP.azS);
  for (let k = 0; k < 6; k++) linea(80, 28, 80 + k * 2, 28 + (6 - k) * 2, a_mez(AP.yeso, AP.azJ, 0.6));
}

function a_biblioteca(R, t, o) {
  const { pset, rect } = R;
  a_fijo(R, 'biblioteca', () => a_bibliotecaFijo(R));
  // por los rombos de la celosía: una paloma que se posa y se va, y las ramas del ciprés que se mecen
  { const u = (t % 14) / 14, px = u < 0.4 ? 40 : u < 0.5 ? Math.round(40 - (u - 0.4) * 300) : -10, py = 92 - (u > 0.4 && u < 0.5 ? Math.round((u - 0.4) * 160) : 0);
    if (px > 32) { for (const [dx, dy, c] of [[0, 0, AP.piedraS], [1, 0, AP.piedraS], [2, -1, AP.plomoS], [-1, 0, AP.plomo], [2, 0, AP.plomoL], [1, 1, AP.tOcre]]) if (((px + dx + py + dy) % 5) && ((px + dx - py - dy) % 5)) pset(px + dx, py + dy, c); } }
  // las motas de polvo en los rayos de luz, que suben y bajan
  for (let k = 0; k < 26; k++) { const v = (t * (0.02 + h(k, 2, 657) * 0.03) + h(k, 1, 657)) % 1, y = Math.round(44 + v * 100), sx = 36 + h(k, 3, 657) * 34 + Math.sin(t * 0.7 + k) * 3, x = Math.round(sx + (y - 40) * 0.9);
    if (Math.sin(t * 1.5 + k * 2) > -0.4) pset(x, y, Math.sin(t * 3 + k) > 0.3 ? AP.luz : AP.polvo); }
  // la araña que baja y sube por su hilo junto a la cornisa
  { const ay = 34 + Math.round(6 + Math.sin(t * 0.6) * 6); for (let y = 28; y < ay; y++) if (y % 2) pset(81, y, a_mez(AP.yeso, AP.azJ, 0.5)); pset(81, ay, AP.k); pset(80, ay + 1, AP.k); pset(82, ay + 1, AP.k); }
  // por la puerta del pasillo pasa un mozo con una pila de libros (recortado al hueco)
  { const u = (t % 11) / 11, x = Math.round(282 + u * 40), clip = (xx, yy) => xx >= 289 && xx <= 313 && yy >= 61 && yy <= 119;
    a_figurita(R, x, 112, t, { dir: 1, anda: true, alto: 12, ropa: AP.traje1, gorra: AP.sombreroL, carga: 'libros', clip }); }
  // el gato dormido sobre el cofre: la cola que se mueve y una oreja que tiembla
  { const gx = 250, gy = 115; rect(gx, gy - 3, gx + 9, gy, AP.k); rect(gx + 1, gy - 2, gx + 8, gy - 1, AP.tOcre); rect(gx + 1, gy - 2, gx + 8, gy - 2, AP.hoja1); rect(gx + 7, gy - 5, gx + 10, gy - 2, AP.k); rect(gx + 8, gy - 4, gx + 9, gy - 3, AP.tOcre);
    pset(gx + 8, gy - 6 + (Math.sin(t * 5) > 0.9 ? 1 : 0), AP.k); pset(gx + 10, gy - 6, AP.k); const c = Math.round(Math.sin(t * 1.4) * 2); pset(gx - 1, gy - 1, AP.k); pset(gx - 2, gy - 1 + c, AP.k); pset(gx - 3, gy - 1 + c, AP.tOcre); }
  // la luz que tiembla (una nube pasa por el patio): la ventana se aviva y se apaga un poco
  { const f = 0.5 + 0.5 * Math.sin(t * 0.5); if (f > 0.7) for (let y = 70; y < 100; y += 2) for (let x = 36; x < 72; x += 3) { const c = R.pget(x, y); if (c === AP.luzS) pset(x, y, AP.luz); } }
  return { suelo: 150, sueloMesa: 142, mesa: [196, 146, 319, 158], ventana: [32, 34, 74, 102], puerta: [289, 61, 313, 119], escalera: [166, 34, 189, 150], cofre: [240, 119, 274, 132], pergamino: [262, 150] };
}

function a_bibliotecaDelante(R, t, o) {
  const { rect, pset, linea } = R;
  // la mesa baja de nogal de la derecha: tablero con vetas y canto claro, faldón tallado y patas torneadas
  rect(196, 146, 319, 158, AP.k); rect(197, 147, 319, 156, AP.nogalL);
  for (let y = 147; y < 157; y++) for (let x = 197; x < 320; x++) if (h(x >> 3, y, 660) < 0.3) pset(x, y, AP.nogal);
  rect(197, 147, 319, 147, a_mez(AP.nogalL, AP.yesoL, 0.4)); rect(196, 157, 319, 158, AP.madL);
  rect(198, 159, 319, 165, AP.k); rect(199, 159, 319, 164, AP.nogal); for (let x = 202; x < 320; x += 8) { pset(x, 161, AP.oroS); pset(x + 1, 162, AP.madD); }
  for (const lx of [202, 300]) { rect(lx, 165, lx + 5, 180, AP.k); rect(lx + 1, 165, lx + 4, 180, AP.nogal); rect(lx + 1, 165, lx + 1, 180, AP.nogalL); rect(lx, 170, lx + 5, 171, AP.madL); }
  // sobre la mesa: montones de papeles atados con polvo, libros, el tintero con la pluma y el pergamino doblado
  for (let k = 0; k < 3; k++) { const px = 206 + k * 18, pb = 150; for (let j = 0; j < 9 - k * 2; j++) rect(px + (j % 2), pb - j, px + 13 + (j % 2), pb - j, j % 3 ? AP.papel : AP.papelS); rect(px + 6, pb - 9 + k * 2, px + 6, pb, AP.cuerda); }
  for (let j = 0; j < 4; j++) { rect(288 - j, 150 - j * 3, 312 - j, 152 - j * 3, AP.k); rect(289 - j, 150 - j * 3, 311 - j, 151 - j * 3, [AP.alf0, AP.verdeLamp, AP.alf2, AP.mad][j]); rect(289 - j, 150 - j * 3, 291 - j, 151 - j * 3, AP.papel); }
  rect(246, 144, 252, 150, AP.k); rect(247, 145, 251, 149, AP.alf2); pset(248, 145, AP.cobaltoL); linea(250, 144, 256, 137, AP.papel); pset(256, 137, AP.papelS);
  if (o.pergamino !== false) a_pergaminoDoblado(R, 268, 150, 20, 7);
  // a la izquierda, por delante: la pila de libros caídos y el cofre abierto con papeles
  a_cofre(R, 4, 180, 40, 16, true);
  for (let j = 0; j < 5; j++) { const w = 22 - j * 2, x0 = 44 + j % 2 * 2; rect(x0, 178 - j * 4, x0 + w, 180 - j * 4, AP.k); rect(x0 + 1, 178 - j * 4, x0 + w - 1, 179 - j * 4, [AP.mad, AP.alf2, AP.tVerde, AP.alf0, AP.tMarron][j]); rect(x0 + 1, 178 - j * 4, x0 + 3, 179 - j * 4, AP.papel); }
  // el polvo que flota delante de la mesa
  for (let k = 0; k < 6; k++) { const x = Math.round(200 + h(k, 1, 661) * 110 + Math.sin(t * 0.5 + k) * 4), y = Math.round(140 - ((t * 2 + k * 9) % 30)); if ((k + Math.floor(t)) % 3) pset(x, y, AP.polvo); }
  return { mesa: [196, 146, 319, 158] };
}

function a_mesaFijo(R) {
  const { rect, pset, linea } = R;
  // la pared de yeso, la cenefa pintada, la gran ventana de celosía con su luz y las estanterías de libros grandes
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 670) < 0.08 ? AP.yesoS : AP.yeso);
  for (let x = 0; x < 276; x++) for (let y = 10; y < 16; y++) { const m = x % 10; pset(x, y, y === 10 || y === 15 ? AP.madS : (Math.abs(y - 12.5) < 1 + Math.sin(m / 10 * Math.PI) * 1.5 ? (m < 5 ? AP.tRoja : AP.turq) : AP.yesoL)); }
  a_celosia(R, 10, 22, 82, 112, (x, y) => (Math.abs(x - 46 + Math.sin(y * 0.2) * 3) < 4 + (y - 30) * 0.08 && y > 34 ? (h(x, y, 671) < 0.4 ? AP.cipresL : AP.cipres) : a_b4(x, y) < (y - 22) / 110 ? AP.luzS : AP.luz), 7);
  // dos estanterías anchas: libros grandes (lomos con nervios y tejuelos), rollos y legajos
  for (const [x0, x1] of [[94, 176], [182, 262]]) { rect(x0, 18, x1, 112, AP.k); rect(x0 + 1, 19, x1 - 1, 112, AP.madS);
    for (let y = 19; y < 112; y++) for (let x = x0 + 1; x < x1; x++) if (x < x0 + 5 || x > x1 - 5) pset(x, y, h(x, y >> 2, 672) < 0.3 ? AP.madV : AP.mad);
    rect(x0 - 2, 15, x1 + 2, 19, AP.madL); rect(x0 - 2, 15, x1 + 2, 15, AP.k);
    for (let s = 0; s < 4; s++) { const yb = 42 + s * 23; for (let y = yb - 21; y <= yb; y++) rect(x0 + 5, y, x1 - 5, y, a_mez(AP.madD, AP.mad, (y - yb + 21) / 40)); rect(x0 + 5, yb + 1, x1 - 5, yb + 2, AP.madL);
      // libros grandes: dos píxeles por cada uno de la balda pequeña
      let x = x0 + 6; while (x < x1 - 8) { const w = 4 + Math.floor(h(x, s, 673) * 4), hb = 14 + Math.floor(h(x, s, 674) * 6), c = [AP.alf0, AP.mad, AP.verdeLamp, AP.alf2, AP.nogalL, AP.tMarron][Math.floor(h(x, s, 675) * 6)];
        if (x + w > x1 - 6) break;
        rect(x, yb - hb, x + w - 1, yb, AP.k); rect(x + 1, yb - hb + 1, x + w - 2, yb, c); rect(x + 1, yb - hb + 1, x + 1, yb, a_mez(c, AP.yesoL, 0.3));
        for (const by of [yb - hb + 3, yb - 4]) rect(x + 1, by, x + w - 2, by, AP.oro); rect(x + 1, yb - hb + 6, x + w - 2, yb - hb + 8, a_mez(c, AP.k, 0.45)); rect(x + 1, yb - hb + 1, x + w - 2, yb - hb + 1, a_mez(c, AP.azS, 0.5));
        x += w + (h(x, s, 676) < 0.15 ? 3 : 0); } }
  }
  // a la derecha, el armario de las cajas de rollos (puertas con celosía) y, arriba, la pared tranquila
  rect(268, 52, 318, 112, AP.k); rect(269, 53, 317, 112, AP.mad); for (const dx of [270, 294]) { rect(dx, 56, dx + 22, 108, AP.madS); a_celosia(R, dx + 3, 60, dx + 19, 104, (x, y) => ((x + y) % 3 ? AP.madD : AP.papelV), 4); }
  rect(266, 49, 318, 52, AP.madL); for (const dx of [292, 294]) pset(dx, 82, AP.laton);
  // la luz de la ventana que cae en diagonal
  for (let y = 24; y < 112; y++) for (let x = 10; x < 160; x++) { const sx = x - (y - 22) * 0.75; if (sx > 12 && sx < 80 && a_b4(x, y) < 0.16) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.5)); }
  // el suelo bajo la mesa: tablas y el borde de la alfombra
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y > 168 ? ((x + y) % 6 < 3 ? AP.alf1 : AP.alf0) : (x % 26 === 0 ? AP.madD : h(x >> 4, y, 677) < 0.3 ? AP.madS : AP.mad));
}

function a_mesaFondo(R, t, o) {
  const { pset } = R;
  a_fijo(R, 'mesa', () => a_mesaFijo(R));
  for (let k = 0; k < 22; k++) { const v = (t * (0.02 + h(k, 2, 678) * 0.03) + h(k, 1, 678)) % 1, y = Math.round(26 + v * 84), x = Math.round(14 + h(k, 3, 678) * 64 + (y - 22) * 0.75 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.3 + k * 2) > -0.3) pset(x, y, Math.sin(t * 3 + k) > 0.3 ? AP.luz : AP.polvo); }
  // un gorrión que se posa en la celosía, picotea y se va
  { const u = (t % 9) / 9; if (u < 0.6) { const x = 60, y = 70, p = Math.floor(t * 4) % 3 === 0 ? 1 : 0; for (const [dx, dy, c] of [[0, 0, AP.tMarron], [1, 0, AP.tMarron], [2, -1 + p, AP.troncoS], [-1, 0, AP.troncoL], [1, 1, AP.polvo]]) if ((x + dx + y + dy) % 7 && (x + dx - y - dy) % 7) pset(x + dx, y + dy, c); } }
  return { suelo: 112, sueloDelante: 176, mesa: [0, 110, 319, 150], pergamino: [100, 116, 220, 146], lampara: [44, 104], lupa: [252, 138], tintero: [210, 124] };
}

function a_mesaDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, abre = o.abre ?? 0, sigue = o.sigue ?? 0;
  // el tablero en perspectiva (canto de atrás y = 110, de delante y = 150) con vetas, el canto claro y el faldón tallado
  for (let y = 110; y <= 150; y++) { const v = (y - 110) / 40, xl = Math.round(14 - v * 14), xr = Math.round(306 + v * 13);
    for (let x = xl; x <= xr; x++) { const tab = Math.floor((y - 110) / (5 + v * 4)), vet = Math.sin(x * 0.07 + tab * 2.3 + Math.sin(x * 0.021 + tab) * 3), junta = (y - 110) % Math.round(5 + v * 4) === 0;
      pset(x, y, x === xl || x === xr ? AP.k : junta ? AP.nogal : vet > 0.9 ? AP.nogal : vet < -0.92 ? AP.madV : h(x >> 2, tab, 679) < 0.15 ? a_mez(AP.nogalL, AP.nogal, 0.5) : AP.nogalL); } }
  rect(0, 110, 306, 110, AP.k); rect(14, 111, 306, 111, a_mez(AP.nogalL, AP.k, 0.35));
  rect(0, 151, 319, 153, AP.madL); rect(0, 154, 319, 162, AP.nogal); rect(0, 163, 319, 163, AP.k); for (let x = 4; x < 320; x += 10) { pset(x, 157, AP.oroS); pset(x + 1, 158, AP.madD); pset(x + 5, 159, AP.madD); }
  for (const lx of [10, 300]) { rect(lx, 164, lx + 8, 180, AP.k); rect(lx + 1, 164, lx + 7, 180, AP.nogal); rect(lx + 2, 164, lx + 2, 180, AP.nogalL); rect(lx, 170, lx + 8, 172, AP.madL); }
  // la luz cálida de la lámpara sobre el tablero
  for (let y = 112; y < 150; y++) for (let x = 10; x < 110; x++) { const d = Math.hypot(x - 44, (y - 118) * 1.6); if (d < 46 && a_b4(x, y) < (1 - d / 46) * 0.7) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.35)); }
  // la lámpara de 1929: pie de latón, la pantalla de cristal verde y su cadenita, que tiembla un poco
  { const lx = 44; rect(lx - 7, 122, lx + 7, 125, AP.k); rect(lx - 6, 122, lx + 6, 124, AP.latonS); rect(lx - 6, 122, lx + 6, 122, AP.latonL); rect(lx - 1, 106, lx + 1, 122, AP.laton); pset(lx - 1, 108, AP.latonL);
    rect(lx - 9, 100, lx + 9, 106, AP.k); rect(lx - 8, 100, lx + 8, 105, AP.verdeLamp); rect(lx - 8, 100, lx + 8, 101, AP.verdeLampL); rect(lx - 7, 106, lx + 7, 106, Math.sin(t * 9) > -0.8 ? AP.luz : AP.luzS);
    const c = Math.round(Math.sin(t * 2) * 0.6); linea(lx + 6, 106, lx + 6 + c, 111, AP.latonS); pset(lx + 6 + c, 112, AP.laton); }
  // el tintero, la pluma, los libros apilados y un compás
  rect(204, 120, 214, 128, AP.k); rect(205, 121, 213, 127, AP.alf2); rect(206, 121, 207, 126, AP.cobaltoL); linea(212, 120, 220, 110, AP.papel); linea(213, 120, 221, 110, AP.papelS);
  for (let j = 0; j < 4; j++) { rect(262 - j, 122 - j * 4, 296 - j, 125 - j * 4, AP.k); rect(263 - j, 122 - j * 4, 295 - j, 124 - j * 4, [AP.alf0, AP.tVerde, AP.mad, AP.alf2][j]); rect(263 - j, 122 - j * 4, 266 - j, 124 - j * 4, AP.papel); }
  linea(78, 140, 86, 128, AP.hierroL); linea(86, 128, 92, 140, AP.hierroL); pset(86, 127, AP.laton);
  // el pergamino: doblado o desplegándose en el centro del tablero
  const px0 = 100, py0 = 116, pw = 120, pa = 30;
  a_pergaminoAbre(R, px0, py0, pw, pa, t, abre, { luz: 0.6 });
  // el gag: el pergamino sigue desplegándose, pasa por el canto, cae por el faldón y rueda por el suelo
  if (sigue > 0 && abre >= 0.98) {
    const L = Math.round(sigue * 52), x0 = 112, x1 = 208;
    const clipCae = (x, y) => y <= Math.min(176, 147 + L);
    a_pergamino(R, x0, 147, x1 - x0, 30, t, { clip: clipCae, luz: 0.2 });
    const yF = Math.min(176, 147 + L); rect(x0, Math.min(yF, 151), x1, Math.min(yF, 153), a_mez(AP.perg, AP.pergL, 0.5));
    if (L > 30) { for (let y = 174; y <= 179; y++) for (let x = x0; x <= x1; x++) pset(x, y, ((x + y) & 3) === 0 ? AP.pergS : AP.perg); for (let x = x0; x <= x1; x++) pset(x, 179, AP.pergD); }
    // el rollo que queda al final, que va rodando y rebota
    const ry = L > 30 ? 177 : yF + 2, rr = 3;
    for (let x = x0 - 1; x <= x1 + 1; x++) for (let j = -rr; j <= rr; j++) pset(x, ry + j, Math.abs(j) === rr ? AP.pergD : j < 0 ? AP.pergL : AP.pergS);
    for (const ex of [x0 - 2, x1 + 2]) { disco(ex, ry, rr, AP.pergD); pset(ex, ry, AP.perg); R.anillo(ex, ry, 2, AP.pergS); }
    for (let x = x0; x < x1; x += 7) pset(x + Math.floor(t * 20) % 7, ry, AP.pergD);
  }
  // la lupa sobre la mesa (si la escena no la tiene en la mano)
  if (o.lupa !== false) { const lx = 252, ly = 138; linea(lx + 6, ly + 5, lx + 14, ly + 10, AP.k); linea(lx + 6, ly + 6, lx + 14, ly + 11, AP.mad); disco(lx, ly, 7, AP.k); disco(lx, ly, 6, AP.latonS); disco(lx, ly, 5, hex('#c8e0e8')); pset(lx - 2, ly - 3, AP.luz); pset(lx - 3, ly - 2, AP.luz); }
  return { mesa: [0, 110, 319, 150], pergamino: [px0, py0, px0 + pw, py0 + pa], lupa: [252, 138] };
}

// el fondo fijo del palacio: el cielo tramado con el sol bajo de otoño, la otra orilla del Bósforo, el agua, las cocinas con
// sus cúpulas de plomo y sus chimeneas altas, el pórtico, la torre de la Justicia, la puerta de la Felicidad y el patio
function a_palacioFijo(R, b) {
  const { rect, pset, linea, poligono, disco } = R, HOR = 84;
  const cielo = [AP.cie0, AP.cie1, AP.cie2, AP.cie3, AP.cie4];
  for (let y = 0; y < HOR; y++) { const f = Math.pow(y / HOR, 1.3) * (cielo.length - 1); for (let x = 0; x < 320; x++) { const i = Math.floor(f), r = f - i; pset(x, y, cielo[Math.min(cielo.length - 1, i + (r > a_b4(x, y) ? 1 : 0))]); } }
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 6) pset(58 + i, 36 + j, d < 4.5 ? AP.sol : AP.solH); else if (d < 14 && (14 - d) / 10 > a_b4(58 + i, 36 + j) + 0.2) pset(58 + i, 36 + j, a_mez(R.pget(58 + i, 36 + j), AP.sol, 0.45)); }
  // el agua del Bósforo (la parte fija: el degradado; las ondas se mueven aparte)
  for (let y = HOR; y < 112; y++) for (let x = 0; x < 320; x++) pset(x, y, (y - HOR) / 28 > a_b4(x, y) ? AP.mar1 : AP.mar0);
  // la otra orilla: colinas en bruma con casas, cipreses y dos mezquitas con sus minaretes
  const perfil = (x) => Math.round(70 + 4 * Math.sin(x * 0.021) + 3 * Math.sin(x * 0.07 + 1) + 1.5 * Math.sin(x * 0.19));
  for (let x = 0; x < 320; x++) for (let y = perfil(x); y < HOR; y++) pset(x, y, y < perfil(x) + 2 ? AP.orillaL : (y - perfil(x)) / 14 > a_b4(x, y) + 0.3 ? AP.orilla1 : AP.orilla0);
  for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 680) * 316), y = perfil(x) + 3 + Math.floor(h(k, 2, 680) * (HOR - perfil(x) - 5)); if (h(k, 3, 680) < 0.25) { pset(x, y, AP.cipresO); pset(x, y - 1, AP.cipresO); pset(x, y - 2, AP.cipresO); } else { pset(x, y, AP.casaO); pset(x + 1, y, AP.casaO); pset(x, y - 1, AP.tejaO); pset(x + 1, y - 1, AP.tejaO); } }
  for (const [mx, r] of [[112, 5], [190, 4]]) { const my = perfil(mx) + 1; for (let j = 0; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j)); rect(mx - w, my - j, mx + w, my - j, AP.orillaL); } rect(mx - r - 2, my, mx + r + 2, my + 4, AP.orillaL);
    for (const dx of [-r - 4, r + 4]) { rect(mx + dx, my - r - 12, mx + dx, my + 3, AP.orillaL); pset(mx + dx, my - r - 13, AP.orilla1); pset(mx + dx - 1, my - r - 6, AP.orillaL); pset(mx + dx + 1, my - r - 6, AP.orillaL); } }
  const antes = Uint32Array.from(b);
  // el muro del mar y, sobre él, las cocinas: muro de piedra con hiladas de ladrillo, las cúpulas de plomo con sus juntas
  // y las chimeneas altas con su remate
  const Y0 = 100, YB = 136;
  for (let y = Y0; y < YB; y++) for (let x = 0; x < 124; x++) { const fila = Math.floor((y - Y0) / 3); const ladr = fila % 3 === 2, junta = (y - Y0) % 3 === 0 || (x + fila * 5) % (ladr ? 6 : 13) === 0;
    pset(x, y, ladr ? (junta ? AP.ladrS : AP.ladr) : junta ? AP.piedraJ : (h(x >> 1, fila, 681) < 0.15 ? AP.piedraS : AP.piedra)); }
  for (const vx of [14, 44, 74, 104]) { rect(vx, 112, vx + 6, 124, AP.k); rect(vx + 1, 113, vx + 5, 124, AP.madD); for (let y = 113; y < 124; y += 2) rect(vx + 1, y, vx + 5, y, AP.madS); poligono([[vx, 113], [vx + 3, 109], [vx + 6, 113]], AP.piedraS); }
  rect(0, Y0 - 1, 124, Y0, AP.piedraL);
  for (let k = 0; k < 6; k++) { const cx = 10 + k * 21, r = 9;
    for (let j = 0; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j) * 1.05); for (let x = cx - w; x <= cx + w; x++) { const lado = (x - cx) / (w + 0.01), costilla = Math.round((x - cx) * 6 / (w + 1)) !== Math.round((x - cx + 1) * 6 / (w + 1)); pset(x, Y0 - 1 - j, x === cx - w || x === cx + w ? AP.plomoJ : costilla ? AP.plomoS : lado < -0.3 ? AP.plomoL : lado > 0.45 ? AP.plomoS : AP.plomo); } }
    // la chimenea: un fuste alto con su remate de cupulita
    const ch = 22 + (k % 2) * 4, x0 = cx - 3, yT = Y0 - r - ch;
    rect(x0 - 1, yT, x0 + 6, Y0 - r + 2, AP.k); for (let y = yT + 1; y < Y0 - r + 2; y++) for (let x = x0; x <= x0 + 5; x++) pset(x, y, x === x0 ? AP.piedraL : x > x0 + 3 ? AP.piedraS : ((y - yT) % 4 === 0 ? AP.piedraJ : AP.piedra));
    rect(x0 - 2, yT - 1, x0 + 7, yT, AP.piedraL); rect(x0 - 1, yT - 4, x0 + 6, yT - 2, AP.plomo); rect(x0, yT - 5, x0 + 5, yT - 5, AP.plomoL); pset(x0 + 2, yT - 6, AP.oro); pset(x0 + 2, yT - 7, AP.oroS);
    for (const ax of [x0 + 1, x0 + 4]) rect(ax, yT + 2, ax, yT + 4, AP.k); }
  // el pórtico de columnas con el gran alero de madera, sus azulejos y el interior en sombra
  rect(124, 98, 204, 102, AP.k); rect(124, 97, 204, 99, AP.plomo); rect(124, 96, 204, 96, AP.plomoL); rect(124, 100, 204, 102, AP.madS); for (let x = 125; x < 204; x += 3) pset(x, 102, AP.madD);
  for (let y = 103; y < YB; y++) for (let x = 124; x < 205; x++) pset(x, y, y < 108 ? AP.madD : a_mez(AP.madD, AP.museo1, 0.4));
  a_azulejos(R, 128, 108, 200, 124, { s: 6, osc: 0.45, k: 4 });
  for (let x = 128; x < 202; x += 14) { rect(x, 103, x + 3, YB - 1, AP.k); rect(x + 1, 103, x + 2, YB - 1, AP.piedraL); rect(x - 1, 103, x + 4, 104, AP.piedra); rect(x - 1, YB - 3, x + 4, YB - 1, AP.piedra); }
  // la torre de la Justicia: fuste de piedra, el mirador con arcos, el chapitel de plomo y el remate dorado
  { const x0 = 204, x1 = 222, mx = 213;
    rect(x0, 40, x1, YB, AP.k); for (let y = 41; y < YB; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, x > x1 - 5 ? AP.piedraS : (y - 41) % 5 === 0 ? AP.piedraJ : AP.piedra);
    for (const wy of [60, 78]) { rect(mx - 2, wy, mx + 2, wy + 8, AP.k); pset(mx, wy - 1, AP.k); rect(mx - 1, wy + 1, mx + 1, wy + 7, AP.madD); }
    rect(x0 - 2, 28, x1 + 2, 40, AP.k); rect(x0 - 1, 29, x1 + 1, 39, AP.piedraL); for (const ax of [x0 + 1, mx - 1, x1 - 3]) { rect(ax, 31, ax + 2, 38, AP.k); pset(ax + 1, 30, AP.k); }
    rect(x0 - 3, 26, x1 + 3, 28, AP.plomoS); poligono([[x0 - 2, 27], [mx, 12], [x1 + 3, 27]], AP.k); poligono([[x0, 26], [mx, 14], [x1 + 1, 26]], AP.plomo); linea(mx, 14, x1 + 1, 26, AP.plomoS); linea(mx - 1, 15, x0 + 1, 25, AP.plomoL);
    rect(mx, 7, mx, 13, AP.oro); pset(mx, 9, AP.oroS); pset(mx - 1, 8, AP.oro); pset(mx + 1, 8, AP.oro); }
  // la puerta de la Felicidad: el pabellón con el alero ancho, columnas, azulejos dorados y la puerta de madera
  { const x0 = 224, x1 = 319;
    rect(x0, 86, x1, 92, AP.k); rect(x0, 86, x1, 88, AP.plomo); rect(x0, 86, x1, 86, AP.plomoL); rect(x0, 89, x1, 92, AP.mad); for (let x = x0; x <= x1; x += 4) { pset(x, 91, AP.oro); pset(x + 2, 90, AP.tRoja); }
    for (let j = 0; j <= 12; j++) { const w = Math.round(Math.sqrt(144 - j * j) * 1.1); for (let x = 276 - w; x <= 276 + w; x++) pset(x, 85 - j, x === 276 - w || x === 276 + w ? AP.plomoJ : x < 272 ? AP.plomoL : x > 282 ? AP.plomoS : AP.plomo); }
    rect(276, 66, 276, 73, AP.oro); pset(275, 68, AP.oro); pset(277, 68, AP.oro);
    for (let y = 93; y < YB; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y < 97) ? AP.madS : a_mez(AP.piedraL, AP.yeso, 0.5));
    a_azulejos(R, x0 + 4, 98, 258, 126, { s: 6, k: 5 }); a_azulejos(R, 294, 98, 316, 126, { s: 6, k: 6 });
    for (const cx of [228, 262, 290, 318]) { rect(cx - 2, 93, cx + 1, YB, AP.k); rect(cx - 1, 93, cx, YB, AP.piedraL); }
    rect(264, 100, 288, YB, AP.k); rect(265, 101, 287, YB, AP.mad); rect(276, 101, 276, YB, AP.madD); for (let y = 104; y < YB; y += 7) for (let x = 266; x < 287; x += 5) { pset(x + 1, y, AP.oro); pset(x + 2, y + 1, AP.oroS); }
    poligono([[264, 101], [276, 93], [288, 101]], AP.oroS); poligono([[266, 100], [276, 95], [286, 100]], AP.oro); }
  // los cipreses del fondo, junto al pórtico (se mecen aparte: aquí solo la sombra en el suelo)
  // el patio: la hierba del parterre, los bordillos y el camino de losas en perspectiva, con hojas secas caídas
  for (let y = YB; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 146) c = h(x, y, 682) < 0.25 ? AP.cespedS : h(x, y, 683) < 0.12 ? AP.cespedL : AP.cesped;
    else if (y === 146) c = AP.losaS;
    else { const fila = Math.floor(Math.pow((y - 146) / 34, 0.8) * 7), off = fila % 2 ? 0.5 : 0, w = 18 + fila * 4, xx = (x - 160) / w + off + 50, junta = (xx % 1) < 1 / w * 1.5 || [149, 153, 158, 164, 171, 179].includes(y);
      c = junta ? AP.losaS : h(Math.floor(xx), fila, 684) < 0.2 ? AP.losaL : AP.losa; if (!junta && h(x, y, 685) < 0.04) c = AP.losaS; }
    if (y < YB + 2) c = a_mez(c, AP.k, 0.3);
    pset(x, y, c); }
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 686) * 318), y = 138 + Math.floor(h(k, 2, 686) * 40); const c = [AP.hoja0, AP.hoja1, AP.hoja2, AP.hoja3][k % 4]; pset(x, y, c); pset(x + 1, y, c); if (k % 3 === 0) pset(x, y - 1, c); }
  // la máscara de lo que se ve del cielo (1) y del mar (2): ahí van las nubes, las gaviotas y los vapores
  const mask = new Uint8Array(320 * 180);
  for (let i = 0; i < 320 * 112; i++) if (b[i] === antes[i]) mask[i] = (i / 320 | 0) < HOR ? (b[i] === AP.orilla0 || b[i] === AP.orilla1 || b[i] === AP.orillaL || b[i] === AP.casaO || b[i] === AP.tejaO || b[i] === AP.cipresO ? 3 : 1) : 2;
  return { mask, HOR };
}

function a_palacio(R, t, o) {
  const { pset, rect, linea } = R;
  const { mask, HOR } = a_fijo(R, 'palacio', (b) => a_palacioFijo(R, b));
  const cielo = (x, y) => mask[y * 320 + x] === 1, agua = (x, y) => mask[y * 320 + x] === 2;
  // las nubes de tres tonos a tres velocidades (las lejanas, despacio); ninguna se para en la esquina de Atom
  for (let k = 0; k < 6; k++) { const v = [1.2, 2.2, 3.4][k % 3], w = [26, 38, 52][k % 3], x = ((h(k, 1, 690) * 420 + t * v) % 420) - 50, y = 18 + k * 7 + (k % 3) * 3;
    a_nube(R, x, y, w, (xx, yy) => cielo(xx, yy) && !(xx > 270 && yy < 48), k); }
  // el agua: ondas que corren, el reflejo del sol que brilla, y los vapores de 1929 con su humo
  for (let y = HOR; y < 112; y++) for (let x = 0; x < 320; x++) { if (!agua(x, y)) continue; const f = Math.sin(x * 0.35 + y * 1.7 - t * 2.2) + Math.sin(x * 0.11 - t * 0.9 + y);
    if (f > 1.5) pset(x, y, AP.marL); else if (f < -1.6) pset(x, y, AP.mar1); if (Math.abs(x - 58 - Math.sin(y * 3 + t * 4) * 4) < 6 - (y - HOR) * 0.15 && Math.sin(x * 2.1 + t * 7 + y) > 0.6) pset(x, y, AP.brillo); }
  const vapor = (x, y, d, c, k) => { x = Math.round(x); const ps = (xx, yy, cc) => { if (mask[yy * 320 + xx] >= 1 && xx >= 0 && xx < 320) pset(xx, yy, cc); };
    for (let i = -14; i <= 14; i++) { const al = Math.abs(i) > 11 ? 2 : 3; for (let j = 0; j < al; j++) ps(x + i, y - j, j === 0 ? AP.k : c); }
    for (let i = -8; i <= 6; i++) for (let j = 3; j < 6; j++) ps(x + i * d, y - j, j === 3 ? AP.nubM : AP.nubL);
    for (let i = -4; i <= 2; i++) ps(x + i * d, y - 6, AP.nubL);
    for (let j = 6; j < 12; j++) { ps(x - 2 * d, y - j, AP.k); ps(x - 1 * d, y - j, AP.tRoja); } ps(x - 1 * d, y - 12, AP.k);
    for (let i = -10; i <= 10; i += 3) ps(x + i * d, y - 4, AP.cristal);
    for (let s = 0; s < 8; s++) { const sx = Math.round(x - 1 * d - s * 2.4 * d + Math.sin(t * 2 + s + k) * 0.8), sy = y - 13 - s * 1.2; ps(sx, Math.round(sy), s < 3 ? AP.nubS : AP.nubM); ps(sx - d, Math.round(sy), AP.nubM); if (s > 2) ps(sx, Math.round(sy) - 1, AP.nubL); }
    for (let i = -16; i <= 16; i += 2) if (Math.sin(t * 6 + i) > 0.3) ps(x + i, y + 1, AP.marL); };
  vapor(((t * 4 + 40) % 420) - 50, 94, 1, AP.nubSS, 0); vapor(370 - ((t * 2.6 + 150) % 420), 89, -1, AP.k, 1);
  { const kx = ((t * 3) % 360) - 20, ky = 104; for (let i = -4; i <= 4; i++) if (agua(Math.round(kx + i), ky)) pset(Math.round(kx + i), ky, AP.madS); if (agua(Math.round(kx), ky - 2)) { pset(Math.round(kx), ky - 1, AP.piel); pset(Math.round(kx), ky - 2, AP.sombrero); } const r = Math.floor(t * 3) % 2; if (agua(Math.round(kx + 3), ky + 1)) pset(Math.round(kx + 3 + r), ky + 1, AP.madL); }
  // las gaviotas (fuera de la esquina de Atom y de la barra del año)
  for (let k = 0; k < 4; k++) { const x = ((t * (9 + k * 3) + k * 90) % 300) - 10, y = 52 + k * 8 + Math.sin(t * 0.8 + k) * 3; if (x < 270) a_gaviota(R, x, y, t, k, (xx, yy) => cielo(xx, yy) || agua(xx, yy)); }
  // humo de una chimenea de las cocinas (las demás están frías), que sube y se deshilacha con el viento
  for (let s = 0; s < 14; s++) { const u = ((t * 0.5 + s / 14) % 1), x = Math.round(54 + u * 26 + Math.sin(t + s) * 1.5), y = Math.round(58 - u * 30); const c = u < 0.4 ? AP.nubM : AP.nubL; if (u < 0.9 && (s + Math.floor(t * 2)) % 4) { pset(x, y, c); pset(x + 1, y, c); if (u > 0.3) pset(x, y - 1, AP.nubM); } }
  // los cipreses del pórtico, que se mecen
  for (const [cx, base, al, k] of [[132, 137, 54, 0], [196, 137, 60, 1], [116, 140, 44, 2]]) { for (let j = 0; j < al; j++) { const v = j / al, w = Math.round(Math.sin(Math.min(1, v * 1.25) * Math.PI) * 4.5 + (v < 0.85 ? 1 : 0)), sw = Math.round(Math.sin(t * 1.2 + k) * v * v * 2), y = base - j;
      for (let i = -w; i <= w; i++) { const q = h(cx + i, y, 691); pset(cx + i + sw, y, i <= -w + 1 ? AP.cipresL : i >= w - 1 ? AP.cipresS : q < 0.2 ? AP.cipresS : q > 0.85 ? AP.cipresL : AP.cipres); } } rect(cx, base - 2, cx + 1, base, AP.troncoS); }
  // el jardinero que barre las hojas, la guardia junto a la puerta y dos visitantes que cruzan el pórtico
  { const bx = 240 + Math.round(Math.sin(t * 0.3) * 8), d = Math.sin(t * 0.3 + 1.5) > 0 ? 1 : -1; a_figurita(R, bx, 143, t, { dir: d, alto: 11, ropa: AP.verdeMaq, gorra: AP.sombreroL, sinSombrero: false });
    const sw = Math.sin(t * 5) * 3; linea(bx + d * 2, 136, Math.round(bx + d * 4 + sw), 144, AP.madS); for (let i = -2; i <= 2; i++) pset(Math.round(bx + d * 4 + sw + i), 144, AP.cuerda);
    for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k * 0.4) % 1); if (u < 0.6) pset(Math.round(bx + d * 6 + sw + u * 8 * d), 144 - Math.round(Math.sin(u * Math.PI) * 4), [AP.hoja0, AP.hoja1, AP.hoja2][k]); } }
  a_figurita(R, 300, 140, t, { dir: -1, alto: 12, ropa: AP.traje2, gorra: AP.k });
  for (let k = 0; k < 2; k++) { const u = (t * 0.06 + k * 0.5) % 1, x = Math.round(124 + u * 80); a_figurita(R, x, 133, t, { dir: 1, anda: true, alto: 9, k, ropa: k ? AP.traje3 : AP.traje1, clip: (xx, yy) => xx > 124 && xx < 204 && yy > 103 && !((xx - 128) % 14 < 4 && xx >= 128) }); }
  // las palomas del patio que picotean
  for (let k = 0; k < 3; k++) { const px = 262 + k * 9 + Math.round(Math.sin(t * 0.4 + k) * 3), py = 150 + k % 2 * 3, p = Math.sin(t * 6 + k * 2) > 0.5 ? 1 : 0; pset(px, py, AP.plomoS); pset(px + 1, py, AP.plomo); pset(px + 2, py - 1 + p, AP.plomoS); pset(px - 1, py - 1, AP.plomoS); pset(px + 1, py + 1, AP.tRoja); }
  // el plátano de otoño de la izquierda: tronco moteado y la copa naranja que se mece
  { const tx = 26; for (let y = 72; y < 152; y++) { const w = y > 140 ? 5 + (y - 140) * 0.3 : 4; for (let x = Math.round(tx - w); x <= tx + w; x++) pset(x, y, x === Math.round(tx - w) ? AP.troncoS : h(x >> 1, y >> 2, 692) < 0.3 ? AP.troncoL : h(x, y, 693) < 0.2 ? AP.troncoS : AP.tronco); }
    linea(tx + 2, 96, tx + 26, 74, AP.troncoS); linea(tx + 2, 97, tx + 26, 75, AP.tronco); linea(tx - 2, 90, tx - 18, 70, AP.troncoS);
    for (let y = 40; y < 104; y++) { const sw = Math.round(Math.sin(t * 0.9 + y * 0.08) * (104 - y) / 40); for (let x = -8; x < 82; x++) { const dx = (x - 30) / 42, dy = (y - 70) / 30, d = dx * dx + dy * dy + (h(x >> 2, y >> 2, 694) - 0.5) * 0.5; if (d > 1) continue;
      const lz = (-dx - dy) * 0.5 + (h(x >> 1, y >> 1, 695) - 0.5) * 0.6; const c = d > 0.85 && h(x, y, 696) < 0.5 ? null : lz > 0.35 ? AP.hoja1 : lz > -0.1 ? AP.hoja0 : lz > -0.45 ? AP.hoja2 : AP.hoja3; if (c != null) pset(x + sw, y, c); } } }
  return { suelo: 160, horizonte: HOR, sol: [58, 36], puerta: [264, 100, 288, 136], portico: [124, 103, 204, 136], torre: [204, 12, 222, 136], chimeneas: [0, 64, 124, 100] };
}

function a_palacioDelante(R, t, o) {
  const { rect, pset } = R;
  // el brocal de la fuente de abluciones de la esquina: piedra tallada, el grifo de latón y el agua que gotea
  rect(0, 154, 40, 180, AP.k); rect(0, 155, 39, 180, AP.piedra); rect(0, 155, 39, 157, AP.piedraL); for (let y = 160; y < 180; y += 6) rect(0, y, 39, y, AP.piedraJ); for (let x = 6; x < 40; x += 11) rect(x, 158, x, 180, AP.piedraJ);
  a_azulejos(R, 4, 162, 34, 174, { s: 6, k: 7 }); rect(16, 150, 20, 154, AP.latonS); rect(16, 150, 20, 150, AP.latonL);
  { const u = (t * 1.5) % 1; pset(18, 156 + Math.round(u * 5), AP.marL); if (u > 0.85) { pset(17, 161, AP.brillo); pset(19, 161, AP.brillo); } }
  // las hojas de otoño que el viento arrastra por delante, girando
  for (let k = 0; k < 12; k++) { const v = 22 + h(k, 1, 697) * 18, x = Math.round(((t * v + h(k, 2, 697) * 400) % 400) - 40), y = Math.round(60 + h(k, 3, 697) * 110 + Math.sin(t * 2 + k) * 8 + ((t * 6 + k * 13) % 40)), f = Math.floor(t * 6 + k) % 3, c = [AP.hoja0, AP.hoja1, AP.hoja2, AP.hoja3][k % 4];
    if (y > 178 || (x > 270 && y < 48)) continue; pset(x, y, c); if (f !== 1) pset(x + 1, y, c); if (f === 2) pset(x, y + 1, a_mez(c, AP.k, 0.3)); }
  return {};
}

function a_museoFijo(R) {
  const { rect, pset, linea } = R;
  // la pared en penumbra con textura de estuco, el techo con el carril de focos y el suelo de piedra pulida
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 12 ? (y === 11 ? AP.museoL : AP.noche) : h(x >> 1, y >> 1, 700) < 0.1 ? AP.museo0 : AP.museo1);
  rect(0, 6, 319, 7, AP.hierroP); for (const fx of [40, 100, 160, 220]) { rect(fx - 2, 8, fx + 2, 12, AP.hierroPL); rect(fx - 1, 13, fx + 1, 14, AP.luz); }
  // el gran panel de azulejos de İznik enmarcado en la pared del fondo, bañado por un foco
  rect(98, 20, 222, 76, AP.k); rect(99, 21, 221, 75, AP.oroS); a_azulejos(R, 101, 23, 219, 73, { s: 8, k: 8 });
  for (let y = 23; y < 74; y++) for (let x = 101; x < 220; x++) { const d = Math.hypot(x - 160, (y - 40) * 1.4); if (d > 50 && a_b4(x, y) < (d - 50) / 40) pset(x, y, a_mez(R.pget(x, y), AP.museo0, 0.6)); }
  // la cartela (sin letras: barras) bajo el panel
  rect(140, 80, 180, 92, AP.k); rect(141, 81, 179, 91, AP.museoL); for (let y = 83; y < 90; y += 2) rect(144, y, 144 + Math.floor(h(y, 1, 701) * 30), y, AP.calS);
  // la vitrina de pared de la izquierda: estantes iluminados con un astrolabio, una brújula, un barquito y un libro abierto
  rect(6, 34, 88, 112, AP.k); rect(7, 35, 87, 111, AP.hierroP); rect(9, 37, 85, 109, hex('#3e3a30'));
  for (let y = 37; y < 110; y++) for (let x = 9; x < 86; x++) if (a_b4(x, y) < 0.5 - (y - 37) / 200) pset(x, y, hex('#5a5240'));
  for (const sy of [62, 88]) { rect(9, sy, 85, sy + 1, AP.cristalL); rect(9, sy + 2, 85, sy + 2, AP.hierroP); }
  { R.disco(28, 52, 8, AP.latonS); R.disco(28, 52, 7, AP.laton); R.anillo(28, 52, 5, AP.latonS); linea(22, 52, 34, 52, AP.latonS); linea(28, 46, 28, 58, AP.latonS); pset(26, 49, AP.latonL); rect(27, 59, 29, 61, AP.latonS); }
  { rect(52, 54, 66, 61, AP.madS); rect(53, 54, 65, 55, AP.madL); R.disco(59, 50, 5, AP.k); R.disco(59, 50, 4, AP.az); linea(59, 47, 59, 53, AP.tRoja); }
  { for (let i = -10; i <= 10; i++) { const y = 86 - (Math.abs(i) > 7 ? 1 : 0); rect(28 + i, y - 2, 28 + i, y, AP.mad); } rect(28, 70, 28, 84, AP.madS); R.poligono([[29, 71], [38, 82], [29, 82]], AP.papel); R.poligono([[27, 73], [20, 82], [27, 82]], AP.papelV); }
  { rect(52, 78, 78, 86, AP.k); rect(53, 79, 64, 85, AP.papel); rect(66, 79, 77, 85, AP.papelV); for (let y = 80; y < 85; y += 2) { rect(55, y, 62, y, AP.calS); rect(68, y, 75, y, AP.calS); } }
  for (let y = 37; y < 110; y++) { const x = 20 + Math.round((y - 37) * 0.4); pset(x, y, a_mez(R.pget(x, y), AP.az, 0.25)); pset(x + 4, y, a_mez(R.pget(x + 4, y), AP.az, 0.15)); }
  // las cartelas pequeñas junto a la vitrina y el banco de madera para los visitantes, con su sombra
  for (const [cx, cy] of [[90, 60], [90, 76]]) { rect(cx, cy, cx + 6, cy + 8, AP.k); rect(cx + 1, cy + 1, cx + 5, cy + 7, AP.museoL); for (let y = cy + 2; y < cy + 7; y += 2) rect(cx + 2, y, cx + 4, y, AP.calS); }
  // la arcada de la sala de al lado (más clara, cálida), con un manuscrito enmarcado al fondo
  rect(228, 44, 272, 112, AP.k); for (let y = 46; y < 112; y++) for (let x = 230; x < 271; x++) { const dy = y - 62, inArc = y >= 62 || Math.hypot(x - 250, dy) <= 20; if (inArc) pset(x, y, y > 100 ? (((x + y) & 1) ? AP.calS : AP.cal) : a_mez(AP.cal, AP.yeso, h(x >> 1, y >> 1, 702) * 0.4)); }
  rect(242, 66, 258, 84, AP.k); rect(243, 67, 257, 83, AP.oroS); a_pergamino(R, 244, 68, 12, 14, 0, {});
  for (let y = 46; y < 112; y++) for (let x = 226; x < 274; x++) { const dy = y - 62; const borde = (y >= 62 && (x === 228 || x === 229 || x === 271 || x === 272)) || (y < 62 && Math.abs(Math.hypot(x - 250, dy) - 21) < 1.2); if (borde) pset(x, y, AP.museoL); }
  // a la derecha: el panel de clima (cifras) y la cámara de seguridad, debajo de la esquina de Atom
  rect(284, 70, 312, 88, AP.k); rect(285, 71, 311, 87, hex('#101418'));
  rect(296, 52, 304, 56, AP.hierroPL); rect(298, 56, 300, 58, AP.hierroP); rect(304, 53, 307, 55, AP.hierroP);
  // el suelo de piedra pulida con juntas en perspectiva y el reflejo de los focos
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = (y - 112) / 68, xx = (x - 160) / (1 + v * 1.5), junta = ((Math.round(xx) % 30) + 30) % 30 === 0 || [116, 122, 131, 143, 159, 179].includes(y);
    let c = junta ? AP.noche : h(x >> 2, y >> 1, 703) < 0.2 ? AP.sueloML : AP.sueloM; const r = Math.abs(x - 160) < 30 - v * 10 && a_b4(x, y) < 0.35 - v * 0.3 ? 1 : 0; if (r) c = AP.museoL; pset(x, y, c); }
  for (let x = 0; x < 320; x++) pset(x, 112, AP.museoL);
  // el cono del foco que cae sobre la vitrina (luz tramada)
  for (let y = 14; y < 112; y++) for (let x = 100; x < 222; x++) { const w = 3 + (y - 14) * 0.5; if (Math.abs(x - 160) < w && a_b4(x, y) < 0.12 * (1 - Math.abs(x - 160) / w) + 0.03) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.3)); }
  // el banco de madera de los visitantes, con su sombra
  rect(232, 116, 278, 120, AP.k); rect(233, 116, 277, 118, AP.nogalL); rect(233, 119, 277, 119, AP.nogal); for (const lx of [236, 272]) rect(lx, 121, lx + 2, 128, AP.nogal); rect(234, 129, 278, 130, AP.noche);
}

function a_museo(R, t, o) {
  const { pset, rect } = R;
  a_fijo(R, 'museo', () => a_museoFijo(R));
  // motas en el haz del foco
  for (let k = 0; k < 18; k++) { const v = (t * 0.03 * (1 + k % 3) + h(k, 1, 704)) % 1, y = Math.round(16 + v * 96), w = 3 + (y - 14) * 0.5, x = Math.round(160 + (h(k, 2, 704) - 0.5) * 1.6 * w + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 1.7 + k) > -0.2) pset(x, y, AP.polvo); }
  // los visitantes que pasan por la sala de al lado (recortados al arco)
  const arco = (x, y) => x >= 230 && x <= 270 && y >= 46 && y < 112 && (y >= 62 || Math.hypot(x - 250, y - 62) <= 20);
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, u = (t * (0.05 + k * 0.012) + k * 0.37) % 1, x = d > 0 ? 220 + u * 64 : 284 - u * 64; a_figurita(R, x, 106, t, { dir: d, anda: true, alto: 12 - k, k, ropa: [AP.alf2, AP.tVerde, AP.tRoja][k], sinSombrero: true, clip: arco }); }
  // el vigilante de la sala de al lado, que se balancea sobre los pies
  a_figurita(R, 262 + Math.round(Math.sin(t * 0.4)), 108, t, { dir: -1, alto: 13, ropa: AP.traje0, gorra: AP.k, clip: arco });
  // el panel de clima: temperatura y humedad (cifras que cambian de vez en cuando) y su luz verde
  { const tmp = 19 + (Math.floor(t / 4) % 2), hum = 45 + (Math.floor(t / 3) % 3); a_digitos(R, String(tmp), 287, 73, AP.verdeLampL); a_digitos(R, String(hum), 287, 80, AP.turqL); pset(309, 73, Math.floor(t * 2) % 2 ? AP.verdeLampL : AP.verdeLamp); rect(301, 74, 302, 75, AP.verdeLampL); rect(301, 81, 302, 82, AP.turqL); }
  // la luz roja de la cámara que parpadea y la cámara que barre la sala despacio
  { const a = Math.round(Math.sin(t * 0.5) * 2); rect(294 + a, 53, 296 + a, 55, AP.hierroPL); pset(295 + a, 54, AP.k); if (Math.floor(t * 1.5) % 2) pset(303, 53, AP.tRoja); }
  return { suelo: 126, sueloDelante: 168, vitrina: [106, 108, 214, 162], pergamino: [114, 127, 206, 137], arco: [230, 46, 270, 112], panelAzulejos: [98, 20, 222, 76], vitrinaPared: [6, 34, 88, 112] };
}

function a_museoDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, tapa = Math.max(0, Math.min(1, o.tapa ?? 0)), sub = Math.round(tapa * 22);
  // el lecho de la vitrina: la tela oscura inclinada (de y 124 atrás a y 138 delante) con el pergamino iluminado
  for (let y = 124; y <= 138; y++) { const v = (y - 124) / 14, xl = Math.round(112 - v * 6), xr = Math.round(208 + v * 6); for (let x = xl; x <= xr; x++) pset(x, y, x === xl || x === xr ? AP.k : h(x >> 1, y, 705) < 0.2 ? hex('#1e2a3a') : hex('#24324a')); }
  if (o.pergamino !== false) { a_pergamino(R, 120, 127, 80, 10, t, { luz: 0.8, clip: (x, y) => { const v = (y - 124) / 14; return x > 112 - v * 6 + 6 && x < 208 + v * 6 - 6; } }); }
  // la base de madera oscura con su placa de latón y la rejilla del control de humedad
  rect(104, 139, 216, 162, AP.k); rect(105, 139, 215, 161, AP.nogal); rect(105, 139, 215, 140, AP.nogalL); for (let y = 143; y < 161; y += 5) rect(106, y, 214, y, a_mez(AP.nogal, AP.k, 0.3));
  rect(150, 146, 170, 152, AP.latonS); rect(151, 147, 169, 151, AP.laton); rect(153, 149, 166, 149, AP.latonS);
  for (let x = 112; x < 136; x += 2) rect(x, 154, x, 158, AP.k); rect(104, 162, 216, 163, a_mez(AP.k, AP.sueloM, 0.5));
  // la campana de cristal: aristas claras, el brillo que se desliza despacio y el velo azulado; con o.tapa sube
  const yT = 108 - sub, yF = 122 - sub;
  for (let y = yT; y <= 138 - (tapa > 0 ? sub : 0); y++) for (let x = 104; x <= 216; x++) {
    const frente = y >= yF, dentroTop = y < yF && x >= 112 - (y - yT) * 0.43 && x <= 208 + (y - yT) * 0.43;
    if (!frente && !dentroTop) continue; if (tapa > 0 && y > 138 - sub) continue;
    if (a_b4(x, y) < 0.18) pset(x, y, a_mez(R.pget(x, y), AP.cristalL, 0.35));
  }
  linea(112, yT, 208, yT, AP.cristalL); linea(104, yF, 216, yF, AP.az); linea(112, yT, 104, yF, AP.cristalL); linea(208, yT, 216, yF, AP.cristalL);
  for (const x of [104, 216]) linea(x, yF, x, 138 - sub + (tapa > 0 ? 0 : 0), AP.cristalL);
  { const g = ((t * 12) % 200) - 40; for (let k = 0; k < 3; k++) for (let y = yF; y < 138 - sub; y++) { const x = Math.round(104 + g + k + (136 - sub - y) * 10 / (136 - sub - yF)); if (x > 104 && x < 216) pset(x, y, a_mez(R.pget(x, y), AP.az, 0.5)); } }
  // los dos postes de latón y el cordón rojo que cuelga entre ellos
  for (const px of [96, 224]) { rect(px - 3, 164, px + 3, 167, AP.k); rect(px - 2, 164, px + 2, 166, AP.latonS); rect(px - 1, 140, px + 1, 164, AP.laton); rect(px - 1, 140, px - 1, 164, AP.latonL); disco(px, 139, 2.5, AP.laton); pset(px - 1, 138, AP.latonL); }
  for (let x = 97; x < 224; x++) { const u = (x - 96) / 128, y = Math.round(142 + Math.sin(u * Math.PI) * 10 + Math.sin(t * 1.1) * Math.sin(u * Math.PI) * 0.6); pset(x, y, AP.cordon); pset(x, y + 1, AP.alfS); if (x % 3 === 0) pset(x, y, AP.cordonL); }
  return { vitrina: [104, yT, 216, 162], tapaArriba: yT };
}

function a_prensaFijo(R) {
  const { rect, pset, linea, disco } = R;
  // el techo de tablas con las vigas, la pared de cal con ladrillo visto, los ventanales altos con su luz
  for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 40 < 6 ? (x % 40 === 0 ? AP.vigasS : AP.vigas) : (y % 6 === 0 ? AP.vigasS : h(x >> 3, y, 710) < 0.3 ? AP.tablasS : AP.tablas));
  rect(0, 22, 319, 25, AP.vigas); rect(0, 25, 319, 25, AP.vigasS);
  for (let y = 26; y < 146; y++) for (let x = 0; x < 320; x++) { const desc = h(x >> 4, y >> 3, 711) < 0.3 && y > 90; let c;
    if (desc) { const f = Math.floor((y - 26) / 4), jun = (y - 26) % 4 === 0 || (x + (f % 2) * 6) % 12 === 0; c = jun ? AP.calS : h(x >> 2, f, 712) < 0.3 ? AP.ladrPS : AP.ladrP; }
    else c = h(x >> 1, y >> 1, 713) < 0.1 ? AP.calS : AP.cal;
    if (y > 120) c = a_mez(c, AP.tintaM, 0.15);
    pset(x, y, c); }
  for (const [x0, x1] of [[184, 220], [232, 268]]) { rect(x0 - 2, 32, x1 + 2, 74, AP.k); rect(x0 - 1, 33, x1 + 1, 73, AP.madS); for (let y = 34; y < 73; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x - x0) % 9 === 0 || (y - 34) % 10 === 0 ? AP.madS : y < 50 ? (a_b4(x, y) < 0.5 ? AP.cie2 : AP.cie1) : (a_b4(x, y) < 0.6 ? AP.fachada0 : AP.cie3)); rect(x0 - 3, 74, x1 + 3, 76, AP.calS); }
  for (let y = 34; y < 146; y++) for (let x = 150; x < 320; x++) { const sx = x + (y - 34) * 0.55; if (((sx > 184 && sx < 220) || (sx > 232 && sx < 268)) && y > 76 && a_b4(x, y) < 0.14) pset(x, y, a_mez(R.pget(x, y), AP.luz, 0.5)); }
  // el árbol de transmisión que cruza bajo el techo (sus soportes)
  for (const sx of [20, 100, 180, 260]) { rect(sx - 1, 25, sx + 1, 30, AP.hierroP); rect(sx - 3, 29, sx + 3, 33, AP.hierroP); }
  rect(0, 30, 276, 32, AP.hierroPL); rect(0, 30, 276, 30, AP.hierroL);
  // las cajas de tipos de la derecha: el chibalete de cajones con tiradores y los tipos en la bandeja de arriba
  rect(278, 72, 319, 146, AP.k); rect(279, 73, 319, 146, AP.mad); for (let y = 82; y < 146; y += 8) { rect(280, y, 318, y + 6, AP.madS); rect(281, y + 1, 317, y + 5, AP.madL); rect(296, y + 3, 302, y + 3, AP.laton); rect(296, y + 2, 302, y + 2, AP.k); }
  rect(276, 70, 319, 73, AP.madD); for (let x = 280; x < 318; x += 2) for (let y = 74; y < 80; y += 2) pset(x, y, h(x, y, 714) < 0.5 ? AP.hierroL : AP.hierroP);
  // las dos linotipias del fondo: la base, el teclado, el almacén de matrices en trapecio, el brazo y el crisol
  for (const lx of [194, 238]) { rect(lx, 104, lx + 32, 146, AP.k); rect(lx + 1, 105, lx + 31, 145, AP.hierroP); rect(lx + 1, 105, lx + 31, 106, AP.hierroPL);
    R.poligono([[lx + 4, 104], [lx + 10, 72], [lx + 30, 72], [lx + 30, 104]], AP.k); R.poligono([[lx + 6, 103], [lx + 11, 74], [lx + 29, 74], [lx + 29, 103]], AP.verdeMaq); for (let y = 76; y < 102; y += 3) linea(lx + 11 - Math.round((y - 74) * 0.18), y, lx + 28, y, AP.verdeMaqL);
    rect(lx - 6, 112, lx + 8, 118, AP.k); rect(lx - 5, 113, lx + 7, 117, AP.hierroPL); for (let x = lx - 4; x < lx + 7; x += 2) { pset(x, 114, AP.az); pset(x + 1, 116, AP.tintaM); }
    rect(lx + 24, 112, lx + 34, 122, AP.k); rect(lx + 25, 113, lx + 33, 121, AP.hierroPS); disco(lx + 29, 124, 3, AP.hierroPS);
    for (let y = 130; y < 146; y += 4) rect(lx + 2, y, lx + 30, y, AP.hierroPS); rect(lx + 14, 106, lx + 18, 110, AP.latonS); }
  // la prensa rotativa: el bastidor de hierro con filetes dorados y tornillos (los rodillos y el volante, aparte)
  rect(12, 60, 152, 146, AP.k); rect(13, 61, 151, 145, AP.hierroP); rect(18, 66, 146, 140, AP.hierroPS);
  for (const x of [13, 145]) { rect(x, 61, x + 6, 145, AP.verdeMaq); rect(x, 61, x, 145, AP.verdeMaqL); for (let y = 66; y < 144; y += 9) pset(x + 3, y, AP.oro); }
  rect(13, 61, 151, 64, AP.verdeMaq); rect(13, 61, 151, 61, AP.verdeMaqL); rect(13, 64, 151, 64, AP.oroS); rect(13, 141, 151, 145, AP.verdeMaq); for (let x = 20; x < 150; x += 8) pset(x, 143, AP.oro);
  // dentro del bastidor: engranajes grandes en penumbra, ejes con sus cojinetes y la chapa con remaches
  for (const [gx, gy, gr] of [[30, 84, 12], [138, 120, 9], [70, 128, 8]]) { for (let j = -gr - 2; j <= gr + 2; j++) for (let i = -gr - 2; i <= gr + 2; i++) { const d = Math.hypot(i, j), a = Math.atan2(j, i), dien = Math.cos(a * gr * 0.9) > 0 ? gr + 2 : gr; if (d <= dien && d > gr * 0.35) pset(gx + i, gy + j, d > gr - 1 ? AP.hierroP : (Math.abs(Math.sin(a * 3)) < 0.3 ? AP.hierroPL : AP.hierroP)); } R.disco(gx, gy, 2, AP.hierroPL); }
  for (let x = 20; x < 146; x += 9) for (const y of [68, 138]) pset(x, y, AP.hierroPL);
  for (const [ax, ay] of [[52, 88], [84, 86], [120, 90], [96, 106]]) { rect(ax - 2, 66, ax + 2, 69, AP.hierroPL); linea(ax, 69, ax, ay, AP.hierroP); }
  // la mesa de salida de los pliegos, a la derecha de la prensa
  rect(150, 118, 182, 122, AP.k); rect(151, 118, 181, 120, AP.madL); for (const lx of [152, 178]) rect(lx, 122, lx + 2, 146, AP.madS);
  // el suelo de tablas con manchas de tinta y recortes de papel
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const off = Math.round((x - 160) * (y - 146) / 60), jun = ((x + off) % 18 + 18) % 18 === 0 || y % 7 === 0; pset(x, y, jun ? AP.tablasS : h((x + off) >> 4, y >> 2, 715) < 0.2 ? AP.tablasL : AP.tablas); }
  for (const [x, y, r] of [[60, 160, 7], [120, 172, 5], [230, 166, 6], [20, 174, 4]]) for (let j = -r; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j) * 1.8); rect(x - w, y + Math.round(j * 0.4), x + w, y + Math.round(j * 0.4), a_mez(AP.tablasS, AP.tintaM, 0.6)); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 716) * 300) + 6, y = 150 + Math.floor(h(k, 2, 716) * 28); rect(x, y, x + 3, y, AP.papel); pset(x + 1, y - 1, AP.papelS); }
  rect(0, 146, 319, 146, AP.tablasS);
}

// cifras pequeñas de 3×5 píxeles (para relojes, contadores y paneles)
const a_CIF = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];

function a_digitos(R, s, x, y, c) { for (const ch of s) { const d = a_CIF[+ch]; if (d) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (d[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// un periódico de 1929 colgado o suelto, sin letras: la cabecera en barra gruesa, columnas de rayas y un dibujito de mapa
function a_periodico(R, x, y, w, al, k = 0, clip = null) {
  const ps = clip ? (xx, yy, c) => { if (clip(xx, yy)) R.pset(xx, yy, c); } : R.pset;
  for (let j = 0; j <= al; j++) for (let i = 0; i <= w; i++) { const b = i === 0 || j === 0 || i === w || j === al; ps(x + i, y + j, b ? AP.papelS : AP.papel); }
  for (let i = 2; i < w - 1; i++) { ps(x + i, y + 2, AP.tintaM); ps(x + i, y + 3, AP.tintaM); }
  for (let i = 1; i < w; i++) ps(x + i, y + 5, AP.papelS);
  const col = Math.max(2, Math.floor((w - 2) / 4));
  for (let j = 7; j < al - 1; j += 2) for (let c = 0; c < 3; c++) { const x0 = x + 2 + c * (col + 1); for (let i = 0; i < col - (h(j, c, 720 + k) < 0.2 ? 2 : 0); i++) if (!(c === 1 && j < 7 + Math.min(8, al - 10))) ps(x0 + i, y + j, AP.papelV); }
  { const mx = x + 2 + col + 1, my = y + 7, mh = Math.min(8, al - 10); for (let j = 0; j < mh; j++) for (let i = 0; i < col; i++) ps(mx + i, my + j, (i + j * 0.7) % 4 < 1.6 ? AP.tMarron : AP.pergS); ps(mx + 1, my + 2, AP.tRoja); }
}

function a_prensa(R, t, o) {
  const { pset, rect, linea, disco } = R;
  a_fijo(R, 'prensa', () => a_prensaFijo(R));
  const rot = t * 3;
  // las poleas del árbol de transmisión que giran y las correas que bajan a las máquinas (con su costura que corre)
  for (const [px, mx, my] of [[40, 110, 104], [210, 210, 110], [254, 254, 110]]) { disco(px, 31, 5, AP.k); disco(px, 31, 4, AP.hierroPL); for (let k = 0; k < 3; k++) { const a = rot * 2 + k * 2.09; linea(px, 31, Math.round(px + Math.cos(a) * 4), Math.round(31 + Math.sin(a) * 4), AP.hierroP); }
    for (const dx of [-4, 4]) { const x0 = px + dx, x1 = mx + dx * 0.6; linea(x0, 31, x1, my, AP.madD); for (let s = 0; s < 1; s += 0.08) { const u = (s + t * (dx > 0 ? 0.4 : -0.4) % 1 + 1) % 1; pset(Math.round(x0 + (x1 - x0) * u), Math.round(31 + (my - 31) * u), AP.madL); } } }
  // los periódicos colgados a secar en dos cuerdas, que se mecen con el aire de las máquinas (debajo de la zona de Atom)
  for (const [cy, n, k0] of [[46, 9, 0], [54, 8, 9]]) { linea(4, cy, 272, cy + 2, AP.cuerda); for (let i = 0; i < n; i++) { const x = 10 + i * (k0 ? 32 : 29) + (k0 ? 14 : 0); if (x > 262) continue; const sw = Math.round(Math.sin(t * 1.6 + i + k0) * 1.2); a_periodico(R, x + sw, cy + 1, 13, 16, i + k0); pset(x + 3 + sw, cy, AP.madL); pset(x + 10 + sw, cy, AP.madL); } }
  // la rotativa: la bobina que gira, la banda de papel que corre por los cilindros, los rodillos entintadores y el volante
  { disco(34, 122, 15, AP.k); disco(34, 122, 14, AP.papel); R.anillo(34, 122, 11, AP.papelS); R.anillo(34, 122, 7, AP.papelS); disco(34, 122, 4, AP.hierroPL); for (let k = 0; k < 3; k++) { const a = -rot + k * 2.09; linea(34, 122, Math.round(34 + Math.cos(a) * 4), Math.round(122 + Math.sin(a) * 4), AP.hierroP); }
    const WEB = [[34, 107], [52, 80], [84, 78], [96, 98], [120, 82], [148, 96]];
    for (let i = 0; i + 1 < WEB.length; i++) { const [ax, ay] = WEB[i], [bx, by] = WEB[i + 1], L = Math.hypot(bx - ax, by - ay); linea(ax, ay, bx, by, AP.papel); linea(ax, ay + 1, bx, by + 1, AP.papelS); for (let s = (t * 36) % 6; s < L; s += 6) pset(Math.round(ax + (bx - ax) * s / L), Math.round(ay + (by - ay) * s / L), AP.tintaM); }
    for (const [x, y, r, d] of [[52, 88, 8, 1], [84, 86, 8, -1], [120, 90, 8, 1], [96, 106, 7, -1]]) { disco(x, y, r + 1, AP.k); disco(x, y, r, AP.hierroPL); disco(x - 2, y - 2, r - 4, AP.hierroL); R.anillo(x, y, r - 0.5, AP.tintaM); for (let k = 0; k < 4; k++) { const a = rot * 2 * d + k * Math.PI / 2; linea(x, y, Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), AP.hierroP); } disco(x, y, 2, AP.k); }
    for (const [x, y] of [[60, 72], [68, 70], [76, 72]]) { disco(x, y, 3, AP.k); disco(x, y, 2, AP.tintaM); pset(x - 1, y - 1, AP.hierroL); pset(Math.round(x + Math.cos(rot * 4) * 2), Math.round(y + Math.sin(rot * 4) * 2), AP.hierroPL); }
    disco(120, 124, 13, AP.k); R.anillo(120, 124, 11.5, AP.hierroPL); R.anillo(120, 124, 10.5, AP.hierroP); for (let k = 0; k < 6; k++) { const a = rot + k * Math.PI / 3; linea(120, 124, Math.round(120 + Math.cos(a) * 11), Math.round(124 + Math.sin(a) * 11), AP.hierroPL); } disco(120, 124, 3, AP.verdeMaq); pset(120, 124, AP.oro);
    // la biela que sube y baja
    { const a = rot, bx = Math.round(120 + Math.cos(a) * 8), by = Math.round(124 + Math.sin(a) * 8); linea(bx, by, 96, 106, AP.hierroL); disco(bx, by, 1.5, AP.oro); } }
  // los pliegos que salen volando por la boca de salida y caen en la pila (que crece y la recogen de vez en cuando)
  { const per = 0.9, u = (t % per) / per, px = Math.round(146 + u * 18), py = Math.round(96 + u * u * 20); rect(px, py - 1, px + 12, py, AP.papel); rect(px, py, px + 12, py, AP.papelS); rect(px + 2, py - 1, px + 8, py - 1, AP.tintaM);
    const n = Math.floor((t % 24) / per) % 14; for (let k = 0; k < n; k++) { rect(154, 117 - k, 176, 117 - k, k % 2 ? AP.papel : AP.papelV); pset(154 + (k % 3), 117 - k, AP.papelS); } }
  // los linotipistas (figuritas sentadas) que teclean, el crisol que brilla y las matrices que caen
  for (const [lx, k] of [[194, 0], [238, 1]]) { const tec = Math.floor(t * 8 + k * 3) % 2;
    a_figurita(R, lx - 8, 128, t, { dir: 1, alto: 11, k, ropa: k ? AP.traje2 : AP.traje3, gorra: AP.sombreroL });
    rect(lx - 9, 128, lx - 4, 129, AP.madS); rect(lx - 8, 130, lx - 8, 135, AP.madS); pset(lx - 5 + tec, 120 + tec, AP.piel);
    const br = 0.5 + 0.5 * Math.sin(t * 7 + k * 2); rect(lx + 26, 118, lx + 32, 120, br > 0.5 ? AP.hoja1 : AP.hoja0); pset(lx + 29, 117, AP.luz);
    const m = (t * 3 + k * 0.5) % 1; pset(lx + 20, Math.round(76 + m * 26), AP.laton); pset(lx + 20, Math.round(76 + ((m + 0.5) % 1) * 26), AP.laton);
    for (let s = 0; s < 4; s++) { const v = (t * 0.5 + s / 4 + k * 0.3) % 1; pset(Math.round(lx + 29 + Math.sin(t + s) * 1.5), Math.round(110 - v * 14), v < 0.5 ? AP.calS : AP.cal); } }
  // el gato que duerme sobre los fardos de papel junto a las cajas de tipos
  { const gx = 284, gy = 69; rect(gx, gy - 3, gx + 9, gy, AP.k); rect(gx + 1, gy - 2, gx + 8, gy - 1, AP.hierroL); rect(gx + 7, gy - 5, gx + 10, gy - 2, AP.k); rect(gx + 8, gy - 4, gx + 9, gy - 3, AP.hierroL); const c = Math.round(Math.sin(t * 1.2) * 2); pset(gx - 1, gy - 1 + c, AP.k); pset(gx - 2, gy - 1 + c, AP.hierroL); }
  // las motas en la luz de los ventanales
  for (let k = 0; k < 16; k++) { const v = (t * 0.03 * (1 + k % 3) + h(k, 1, 717)) % 1, y = Math.round(78 + v * 66), x = Math.round(184 - (y - 34) * 0.55 + h(k, 2, 717) * 84); if (Math.sin(t * 1.5 + k) > 0) pset(x, y, AP.polvo); }
  return { suelo: 152, prensa: [12, 60, 152, 146], salida: [154, 104, 182, 122], linotipias: [188, 72, 276, 146], ventanas: [[184, 32, 220, 74], [232, 32, 268, 74]], cajasTipos: [278, 72, 319, 146] };
}

function a_prensaDelante(R, t, o) {
  const { rect, pset, disco } = R;
  // la carretilla de madera con los paquetes de periódicos atados en cruz
  rect(258, 166, 319, 170, AP.k); rect(259, 166, 319, 168, AP.madL); linea2(R, 258, 168, 246, 150, AP.madS); linea2(R, 259, 168, 247, 150, AP.mad);
  disco(300, 172, 7, AP.k); disco(300, 172, 6, AP.madS); R.anillo(300, 172, 4, AP.mad); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; pset(Math.round(300 + Math.cos(a) * 3), Math.round(172 + Math.sin(a) * 3), AP.madL); } disco(300, 172, 1.5, AP.hierro);
  for (const [bx, by] of [[262, 165], [284, 165], [272, 154]]) { rect(bx, by - 11, bx + 20, by, AP.k); for (let y = by - 10; y < by; y++) rect(bx + 1, y, bx + 19, y, y % 2 ? AP.papel : AP.papelV); rect(bx + 10, by - 11, bx + 10, by, AP.cuerda); rect(bx, by - 6, bx + 20, by - 6, AP.cuerda); rect(bx + 2, by - 10, bx + 7, by - 9, AP.tintaM); }
  if (Math.sin(t * 2) > 0.6) pset(282, 142, AP.papelS);
  return { carretilla: [246, 140, 319, 180] };
}

// una línea simple (atajo para piezas de delante)
function linea2(R, x0, y0, x1, y1, c) { R.linea(x0, y0, x1, y1, c); }

function a_quioscoFijo(R, b) {
  const { rect, pset, linea, poligono } = R;
  const cielo = [AP.cie1, AP.cie2, AP.cie3, AP.cie4];
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const f = y / 60 * (cielo.length - 1), i = Math.floor(f); pset(x, y, cielo[Math.min(3, i + (f - i > a_b4(x, y) ? 1 : 0))]); }
  const antes = Uint32Array.from(b);
  // al fondo, la torre de Gálata (cuerpo de piedra, mirador y chapitel cónico) entre los tejados
  { const tx = 186; rect(tx - 9, 26, tx + 9, 70, AP.k); for (let y = 27; y < 70; y++) for (let x = tx - 8; x <= tx + 8; x++) pset(x, y, x > tx + 4 ? AP.orilla1 : (y - 27) % 6 === 0 ? AP.orilla1 : AP.orillaL); for (const wy of [36, 50]) for (const wx of [tx - 4, tx + 2]) rect(wx, wy, wx + 1, wy + 4, AP.orilla1);
    rect(tx - 11, 22, tx + 11, 26, AP.orilla1); for (let x = tx - 10; x < tx + 11; x += 3) rect(x, 23, x, 25, AP.cie3); poligono([[tx - 11, 22], [tx, 6], [tx + 12, 22]], AP.orilla1); linea(tx, 6, tx - 10, 21, AP.orillaL); rect(tx, 2, tx, 6, AP.orilla1); }
  // las fachadas: casas de cuatro plantas con miradores de madera (cumbas), balcones de hierro, persianas, cornisas y tejados
  const casas = [[0, 52, 30, AP.fachada0], [52, 112, 22, AP.fachada1], [112, 168, 34, AP.fachada2], [204, 262, 26, AP.fachada3], [262, 320, 46, AP.fachada1]];
  for (const [x0, x1, yt, c] of casas) { const cS = a_mez(c, AP.k, 0.25), cL = a_mez(c, AP.yesoL, 0.3);
    for (let y = yt; y < 118; y++) for (let x = x0; x < x1; x++) pset(x, y, x === x0 ? AP.k : h(x >> 1, y >> 1, 730 + x0) < 0.08 ? cS : (x > x1 - 3 ? cS : c));
    rect(x0, yt - 3, x1 - 1, yt, AP.k); rect(x0 + 1, yt - 2, x1 - 2, yt - 1, AP.tejaO); rect(x0 - 1, yt + 1, x1, yt + 2, cL); rect(x0, yt + 3, x1 - 1, yt + 3, cS);
    for (let x = x0 + 6; x < x1 - 4; x += 14) if (h(x, yt, 731) < 0.5) { rect(x, yt - 8, x + 3, yt - 3, AP.ladrS); rect(x - 1, yt - 9, x + 4, yt - 8, AP.k); }
    const pl = Math.floor((114 - yt) / 18);
    for (let p = 0; p < pl; p++) { const wy = yt + 7 + p * 18; for (let wx = x0 + 5; wx < x1 - 8; wx += 12) {
      if (p === 1 && wx === x0 + 5 && x1 - x0 > 50) { rect(wx - 2, wy - 2, wx + 22, wy + 13, AP.k); rect(wx - 1, wy - 1, wx + 21, wy + 12, AP.mad); for (let i = 0; i < 3; i++) { rect(wx + 1 + i * 7, wy + 1, wx + 5 + i * 7, wy + 8, AP.cristal); rect(wx + 1 + i * 7, wy + 1, wx + 5 + i * 7, wy + 2, AP.cristalL); } rect(wx - 2, wy + 13, wx + 22, wy + 14, AP.madS); for (let i = wx; i < wx + 22; i += 3) pset(i, wy + 15, AP.madS); wx += 12; continue; }
      rect(wx - 1, wy - 1, wx + 6, wy + 10, AP.k); rect(wx, wy, wx + 5, wy + 9, AP.cristal); rect(wx, wy, wx + 5, wy + 1, AP.cristalL); rect(wx + 2, wy, wx + 3, wy + 9, AP.madS);
      if (h(wx, wy, 732) < 0.45) { rect(wx - 3, wy, wx - 1, wy + 9, AP.persiana); rect(wx + 6, wy, wx + 8, wy + 9, AP.persiana); for (let j = wy; j < wy + 9; j += 2) { pset(wx - 2, j, AP.persianaL); pset(wx + 7, j, AP.persianaL); } }
      rect(wx - 2, wy + 10, wx + 7, wy + 10, cL);
      if (p === 0 && h(wx, wy, 733) < 0.4) { rect(wx - 2, wy + 11, wx + 7, wy + 11, AP.k); for (let i = wx - 2; i <= wx + 7; i += 2) rect(i, wy + 7, i, wy + 11, AP.k); rect(wx - 2, wy + 7, wx + 7, wy + 7, AP.k); } } }
    // la planta baja: tiendas con escaparate y un toldo a rayas
    rect(x0 + 2, 100, x1 - 3, 118, AP.k); rect(x0 + 3, 102, x1 - 4, 117, a_mez(AP.cristal, AP.madS, 0.3)); for (let x = x0 + 3; x < x1 - 4; x += 3) for (let y = 105; y < 117; y += 4) if (h(x, y, 734 + x0) < 0.4) pset(x, y, [AP.hoja1, AP.tRoja, AP.papel, AP.turq][Math.floor(h(x, y, 735) * 4)]);
    rect(x0 + 6, 104, x0 + 12, 117, AP.mad); rect(x0 + 2, 96, x1 - 3, 99, AP.k); for (let x = x0 + 3; x < x1 - 3; x += 6) rect(x + 1, 97, x + 4, 98, AP.papelS); }
  // el callejón entre las casas, al pie de la torre: fachadas lejanas en bruma, escalinata, un farol y ropa tendida
  for (let y = 60; y < 118; y++) for (let x = 168; x < 204; x++) { const lej = x < 176 || x > 196; let c = lej ? (h(x >> 1, y >> 2, 738) < 0.2 ? AP.orilla1 : AP.casaO) : (y > 96 ? ((y - 96) % 3 === 0 ? AP.piedraJ : AP.piedra) : (a_b4(x, y) < 0.5 ? AP.orillaL : AP.cie3));
    if (lej && (y % 9 === 3) && (x % 5 === 1)) c = AP.orilla1; if (y > 96 && !lej) c = a_mez(c, AP.yesoL, (118 - y) / 60); pset(x, y, c); }
  for (let y = 96; y < 118; y += 3) rect(176, y, 196, y, AP.piedraS);
  rect(172, 84, 172, 98, AP.k); rect(171, 80, 173, 84, AP.k); pset(172, 82, AP.luz);
  // la calle empedrada con los raíles del tranvía, la acera de enfrente y la nuestra (losas y bordillo)
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 122) c = (x + (y % 2) * 4) % 8 === 0 ? AP.aceraS : AP.acera;
    else if (y < 148) { const fila = (y - 122) >> 1, xx = x + (fila % 2) * 2; c = (xx % 4 === 0 || (y - 122) % 2 === 0) ? AP.adoqS : h(xx >> 2, fila, 736) < 0.2 ? AP.adoqL : AP.adoq; if (y === 134 || y === 142) c = AP.rail; if (y === 135 || y === 143) c = AP.adoqS; }
    else if (y < 151) c = y === 148 ? AP.aceraL : AP.aceraS;
    else { const fila = Math.floor((y - 151) / 7), jun = (y - 151) % 7 === 0 || ((x + fila * 9) % 26) === 0; c = jun ? AP.aceraS : h(x >> 3, fila, 737) < 0.2 ? AP.aceraL : AP.acera; }
    pset(x, y, c); }
  // los cables del tranvía, de fachada a fachada
  linea(0, 76, 319, 74, AP.k); linea(0, 80, 319, 78, AP.hierroL);
  const mask = new Uint8Array(320 * 180); for (let i = 0; i < 320 * 60; i++) if (b[i] === antes[i]) mask[i] = 1;
  return { mask };
}

// el quiosco de madera de la acera: tejadillo con su cupulita, periódicos colgados con pinzas en el frente y en los lados,
// el vendedor dentro (figurita) y la ventanilla con revistas
function a_quiosco_pieza(R, t) {
  const { rect, pset, poligono } = R, x0 = 16, x1 = 82;
  rect(x0, 84, x1, 154, AP.k); rect(x0 + 1, 85, x1 - 1, 153, AP.tVerde); for (let y = 86; y < 153; y += 4) rect(x0 + 1, y, x1 - 1, y, a_mez(AP.tVerde, AP.k, 0.25)); rect(x1 - 4, 85, x1 - 1, 153, a_mez(AP.tVerde, AP.k, 0.4));
  poligono([[x0 - 6, 84], [x0 + 6, 70], [x1 - 6, 70], [x1 + 6, 84]], AP.k); poligono([[x0 - 4, 83], [x0 + 7, 71], [x1 - 7, 71], [x1 + 4, 83]], AP.tRoja); for (let x = x0 - 2; x < x1 + 3; x += 4) R.linea(x, 83, Math.round(49 + (x - 49) * 0.7), 71, AP.tranviaS);
  for (let j = 0; j <= 8; j++) { const w = Math.round(Math.sqrt(64 - j * j)); rect(49 - w, 70 - j, 49 + w, 70 - j, j > 5 ? AP.plomoL : AP.plomo); } rect(49, 58, 49, 62, AP.oro);
  rect(x0 - 5, 84, x1 + 5, 86, AP.madD); for (let x = x0 - 4; x < x1 + 5; x += 3) pset(x, 87, AP.tRoja);
  rect(x0 + 8, 100, x1 - 8, 124, AP.k); rect(x0 + 9, 101, x1 - 9, 123, hex('#3a2a20'));
  a_figurita(R, 49 + Math.round(Math.sin(t * 0.7) * 6), 122, t, { dir: Math.sin(t * 0.7 + 1.5) > 0 ? 1 : -1, alto: 13, ropa: AP.traje1, gorra: AP.sombreroL });
  rect(x0 + 6, 124, x1 - 6, 127, AP.madL); rect(x0 + 6, 127, x1 - 6, 128, AP.madS);
  for (let k = 0; k < 4; k++) { const px = x0 + 9 + k * 12; rect(px, 120, px + 9, 124, [AP.tRoja, AP.papel, AP.turq, AP.hoja1][k]); rect(px, 120, px + 9, 120, AP.papel); }
  for (let k = 0; k < 4; k++) { const px = x0 + 3 + k * 16, sw = Math.round(Math.sin(t * 2.2 + k) * 0.8); a_periodico(R, px + sw, 132, 13, 17, k + 20); pset(px + 6 + sw, 131, AP.hierroL); }
  for (const px of [x0 + 2, x1 - 9]) { a_periodico(R, px, 89, 7, 10, px); }
}

function a_quiosco(R, t, o) {
  const { pset, rect, linea } = R;
  const { mask } = a_fijo(R, 'quiosco', (b) => a_quioscoFijo(R, b));
  const cielo = (x, y) => mask[y * 320 + x] === 1;
  for (let k = 0; k < 4; k++) { const v = [1.5, 2.6, 3.8, 2][k], w = [30, 42, 24, 36][k], x = ((h(k, 1, 740) * 420 + t * v) % 420) - 50, y = 10 + k * 9; a_nube(R, x, y, w, (xx, yy) => cielo(xx, yy) && !(xx > 270 && yy < 48), k + 10); }
  for (let k = 0; k < 3; k++) { const x = ((t * (12 + k * 4) + k * 110) % 320) - 10, y = 30 + k * 6 + Math.sin(t + k) * 2; if (x < 268) a_gaviota(R, x, y, t, k, cielo); }
  // el humo de las chimeneas, la ropa tendida entre dos casas que se mece y el toldo que ondea
  for (const [cx, cy] of [[60, 14], [270, 30]]) for (let s = 0; s < 8; s++) { const u = (t * 0.4 + s / 8) % 1, x = Math.round(cx + u * 16 + Math.sin(t + s) * 1.2), y = Math.round(cy - u * 14); if (x > 268 && y < 46) continue; if (u < 0.85) pset(x, y, u < 0.4 ? AP.nubS : AP.nubM); }
  linea(168, 58, 204, 62, AP.k); for (let i = 0; i < 5; i++) { const x = 172 + i * 7, y = 59 + Math.round(i * 0.6), sw = Math.round(Math.sin(t * 2 + i) * 1); rect(x + sw, y + 1, x + 4 + sw, y + 6, [AP.papel, AP.tRoja, AP.cobaltoL, AP.papel, AP.hoja1][i]); }
  // la gente de la acera de enfrente: paseantes con sombrero, un vendedor de simit con la bandeja en la cabeza y un mozo
  for (let k = 0; k < 6; k++) { const d = k % 2 ? -1 : 1, v = 4 + k * 0.9, x = d > 0 ? ((t * v + k * 61) % 360) - 20 : 340 - ((t * v + k * 47) % 360); a_figurita(R, x, 121, t, { dir: d, anda: true, alto: 10 + (k % 3), k, ropa: [AP.traje0, AP.traje1, AP.traje2, AP.traje3, AP.tRoja, AP.alf2][k], carga: k === 2 ? 'cesta' : k === 4 ? 'papel' : null, sinSombrero: k === 5 }); }
  // el tranvía rojo y crema que pasa con su pértiga sobre el cable, las ventanas con pasajeros y la campana
  { const per = 16, u = (t % per) / per, x = Math.round(-90 + u * 520), y = 141;
    if (x > -80 && x < 330) { const L = 76; rect(x, y - 30, x + L, y - 2, AP.k); rect(x + 1, y - 29, x + L - 1, y - 16, AP.tranviaC); rect(x + 1, y - 15, x + L - 1, y - 3, AP.tranvia); rect(x + 1, y - 4, x + L - 1, y - 3, AP.tranviaS); rect(x - 1, y - 32, x + L + 1, y - 30, AP.tranviaS); rect(x + 4, y - 34, x + L - 4, y - 33, AP.k);
      for (let i = 0; i < 6; i++) { const wx = x + 6 + i * 11; rect(wx, y - 27, wx + 7, y - 18, AP.k); rect(wx + 1, y - 26, wx + 6, y - 19, AP.cristal); rect(wx + 1, y - 26, wx + 6, y - 25, AP.cristalL); if (h(i, 1, 741) < 0.6) { pset(wx + 3, y - 21, AP.piel); pset(wx + 4, y - 21, AP.piel); pset(wx + 3, y - 22, AP.sombrero); pset(wx + 4, y - 22, AP.sombrero); } }
      rect(x + 2, y - 12, x + L - 2, y - 11, AP.oro); for (const wx of [x + 12, x + L - 12]) { R.disco(wx, y - 1, 3, AP.k); pset(wx, y - 1, AP.hierroL); }
      linea(x + L - 20, y - 34, x + L - 44, 77, AP.k); pset(x + L - 44, 77, Math.floor(t * 10) % 5 === 0 ? AP.luz : AP.hierroL); } }
  // el quiosco (por delante del tranvía: está en nuestra acera)
  a_quiosco_pieza(R, t);
  // las palomas de la acera
  for (let k = 0; k < 3; k++) { const px = 140 + k * 10 + Math.round(Math.sin(t * 0.5 + k) * 4), py = 168 + (k % 2) * 4, p = Math.sin(t * 6 + k * 2) > 0.5 ? 1 : 0; pset(px, py, AP.plomoS); pset(px + 1, py, AP.plomo); pset(px + 2, py - 1 + p, AP.plomoS); pset(px - 1, py - 1, AP.plomoS); }
  return { suelo: 158, quiosco: [16, 70, 82, 154], ventanilla: [24, 100, 74, 128], tranvia: [0, 107, 319, 142], aceraEnfrente: 121, torre: [175, 2, 198, 70] };
}

function a_quioscoDelante(R, t, o) {
  const { rect, pset } = R;
  // la farola de hierro de nuestra acera: base, fuste con anillos, el brazo y el farol de cristal
  rect(294, 168, 308, 180, AP.k); rect(295, 169, 307, 180, AP.hierroP); rect(295, 169, 307, 169, AP.hierroPL);
  rect(299, 70, 303, 168, AP.k); rect(300, 70, 301, 168, AP.hierroPL); for (const y of [110, 140, 160]) rect(298, y, 304, y + 2, AP.hierroP);
  rect(294, 56, 308, 70, AP.k); rect(296, 58, 306, 68, a_mez(AP.luz, AP.cie3, 0.4)); rect(297, 58, 297, 68, AP.k); rect(305, 58, 305, 68, AP.k); rect(293, 54, 309, 56, AP.hierroP); pset(301, 52, AP.hierroP); pset(301, 53, AP.hierroP);
  // el pliego suelto que el viento arrastra y hace volar por la acera
  { const per = 10, u = (t % per) / per, x = Math.round(330 - u * 380), y = Math.round(170 - Math.abs(Math.sin(u * 14)) * 10), f = Math.floor(t * 8) % 2; if (x > -12) { rect(x, y, x + 8, y + 1 + f, AP.papel); rect(x, y, x + 8, y, AP.papelS); rect(x + 2, y + 1, x + 6, y + 1, AP.tintaM); } }
  return { farola: [293, 52, 309, 180] };
}

// el color vacío de una capa de delante (lo que no se pinta deja ver lo de detrás) y el del agua que se pinta cada fotograma
const B_VACIO = 0x01020304, B_AGUA = 0x01020305;

// la paleta del mar: maderas de barco, velas, cáñamo, latón, el turquesa otomano, la arena y la selva de Brasil
const B_P = pal({
  casco: '#6a4026', cascoS: '#4a2a18', cascoL: '#8a5a36', cascoD: '#2e1a10', cascoR: '#9a2e24', cascoRS: '#6e1e18', dorado: '#d8a838', doradoS: '#9a7020', doradoL: '#f4d878',
  cubierta: '#b08a5a', cubiertaS: '#8a6a42', cubiertaL: '#c8a472', cubiertaD: '#6a4e30', junta: '#4a3420', clavo: '#3a3036',
  vela: '#ece2c8', velaS: '#c8baa0', velaD: '#a4967e', velaL: '#fffaec', costura: '#d4c6a8', cruz: '#b8302a', cruzS: '#86201c',
  cuerda: '#b89a68', cuerdaS: '#86683e', cuerdaL: '#d8bc88', jarcia: '#3a2e26', hierro: '#3a3a44', hierroL: '#6a6a78', laton: '#c8963a', latonL: '#f0c868',
  bandera: '#c8282a', banderaS: '#8e1a1e', banderaL: '#e84a3c', toldo: '#b8302a', toldoB: '#efe4cc', turquesa: '#2a9a96', turquesaS: '#1a6a6a',
  piedra: '#c8b896', piedraS: '#a08e6e', piedraL: '#e2d4b4', cal: '#f2ece0', calS: '#c8c0b0', teja: '#b0583a', monteL: '#a8b8c8', monte: '#8a9cb4', monteS: '#6e809c',
  matorral: '#7a8a52', matorralS: '#5a6a3c', ocre: '#c8a068', ocreS: '#a07e4e', humo: '#e4e0d8', humoS: '#b8b4ac', humoD: '#8c8884', fogon: '#ffb040',
  arena: '#ecd49a', arenaS: '#d4b47a', arenaL: '#f8e6b8', arenaM: '#b8986a', arenaMS: '#9a7c52', concha: '#f4e4dc',
  selva0: '#1e4a2a', selva1: '#2a6234', selva2: '#3a7a3a', selva3: '#5a9a44', selva4: '#86b85a', pascoal: '#5a8a6a', pascoalS: '#3e6a52', pascoalL: '#7aa684',
  piel: '#e0aa7a', pielS: '#b07a50', turbante: '#f0ead8', camisa: '#d8d0bc', chaleco: '#3a5a8a', faja: '#c8302a',
  luz: '#ffd890', luzL: '#fff4c8', luzS: '#e8a050', sombra: '#120c0a', fondoB: '#1e140e', rata: '#6a6064', rataS: '#4a4248',
  loroR: '#d82a2a', loroA: '#2a5ad8', loroY: '#f0c020', loroV: '#2aa84a', cangrejo: '#d8603a', cangrejoS: '#a8402a',
});

// umbral del tramado ordenado 4 × 4
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_umbral = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla de dos colores (a = 0 el primero, 1 el segundo)
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// el color de un objeto según la hora: de día tal cual, al atardecer dorado, de noche azulado y oscuro, en la tormenta
// gris y oscuro
function b_tono(c, hora) {
  if (hora === 'dia' || hora === 'tropico' || !hora) return c;
  const r = c & 255, g = (c >>> 8) & 255, b = (c >>> 16) & 255;
  if (hora === 'atardecer') return (0xff000000 | (Math.min(255, Math.round(b * 0.72 + 18)) << 16) | (Math.min(255, Math.round(g * 0.78 + 14)) << 8) | Math.min(255, Math.round(r * 0.9 + 26))) >>> 0;
  if (hora === 'tormenta') return (0xff000000 | (Math.min(255, Math.round(b * 0.42 + 26)) << 16) | (Math.min(255, Math.round(g * 0.36 + 18)) << 8) | Math.min(255, Math.round(r * 0.32 + 14))) >>> 0;
  return (0xff000000 | (Math.min(255, Math.round(b * 0.45 + 30)) << 16) | (Math.min(255, Math.round(g * 0.32 + 16)) << 8) | Math.min(255, Math.round(r * 0.28 + 12))) >>> 0;
}

// tn(c): el tono de la hora con caché (para lo que se pinta en cada fotograma)
const b_tns = new Map();

function b_tinte(hora) { let f = b_tns.get(hora); if (!f) { const m = new Map(); f = (c) => { let v = m.get(c); if (v === undefined) { v = b_tono(c, hora); m.set(c, v); } return v; }; b_tns.set(hora, f); } return f; }

// tiñe un búfer ya pintado con la hora (salvo el vacío, el agua y los colores de deja, que son luces)
function b_teñir(b, hora, deja = new Set(), desde = 0, hasta = 57600) { if (hora === 'dia' || hora === 'tropico') return; const tn = b_tinte(hora); for (let i = desde; i < hasta; i++) { const c = b[i]; if (c === B_VACIO || c === B_AGUA || deja.has(c)) continue; b[i] = tn(c); } }

// las capas fijas: dibuja(b) pinta una vez en un búfer de R.nuevo() (vacía = B_VACIO, para las capas de delante) y se
// guarda; devuelve { b, y0, y1 (las filas con algo), …lo que devuelva dibuja }
const b_capas = new Map();

function b_capa(R, clave, dibuja, vacia = false) {
  let c = b_capas.get(clave);
  if (!c) {
    const b = R.nuevo(); if (vacia) b.fill(B_VACIO);
    const prev = R.usar(b), info = dibuja(b) || {}; R.usar(prev);
    let y0 = 0, y1 = 179; if (vacia) { y0 = 180; y1 = -1; for (let i = 0; i < 57600; i++) if (b[i] !== B_VACIO) { const y = (i / 320) | 0; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    c = { b, y0, y1, ...info }; b_capas.set(clave, c);
  }
  return c;
}

// copia una capa de delante sobre la pantalla (solo sus filas con algo)
function b_encima(R, c) { const B = R.buf, b = c.b; for (let i = c.y0 * 320, n = (c.y1 + 1) * 320; i < n; i++) { const v = b[i]; if (v !== B_VACIO) B[i] = v; } }

// copia el fondo bajado off filas (el balanceo del barco: el horizonte sube y baja)
function b_fondo(R, b, off = 0) { const B = R.buf; if (!off) { B.set(b); return; } if (off > 0) { B.set(b.subarray(0, (180 - off) * 320), off * 320); for (let y = 0; y < off; y++) B.copyWithin(y * 320, off * 320, off * 320 + 320); } else { const o = -off; B.set(b.subarray(o * 320), 0); for (let y = 180 - o; y < 180; y++) B.copyWithin(y * 320, (179 - o) * 320, (180 - o) * 320); } }

// la máscara de un fondo: 1 el cielo limpio (lo que no tapó nada), 2 el agua (para pintarla en cada fotograma)
function b_mascara(b, foto, hor) { const m = new Uint8Array(57600); for (let i = 0; i < 57600; i++) m[i] = b[i] === B_AGUA ? 2 : i < hor * 320 && b[i] === foto[i] ? 1 : 0; return m; }

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, '#color'], …]
function b_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, tr = 3, Pc = P.map(([f, c]) => [f, hex(c)]), lim = Pc.map(([f]) => y0 + Math.round(f * alto));
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < Pc.length && y >= lim[i + 1]) i++;
    let a = Pc[i][1], b = -1, p = 0;
    if (i + 1 < Pc.length && y >= lim[i + 1] - tr) { b = Pc[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = Pc[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = b_umbral(x, y) < p ? b : a;
  }
}

// los cielos (de arriba al horizonte) y los mares (lejos → cerca, luz, sombra, espuma, brillo) de cada hora
const B_CIELOS = {
  dia: [[0, '#3a7cc8'], [0.24, '#4c90d6'], [0.48, '#68a8e2'], [0.7, '#8ec0ec'], [0.87, '#b6d8f0'], [0.97, '#d8eaee']],
  tropico: [[0, '#2a84d6'], [0.24, '#3a9ce4'], [0.48, '#58b2ec'], [0.7, '#82c8f0'], [0.87, '#aedcf2'], [0.97, '#dcf0ea']],
  atardecer: [[0, '#2c3270'], [0.24, '#4e3e84'], [0.46, '#8e4c7e'], [0.66, '#cc6e62'], [0.84, '#ec9c5c'], [0.96, '#f6cc88']],
  noche: [[0, '#04071a'], [0.3, '#0a1028'], [0.6, '#10193a'], [0.84, '#1a2548'], [0.97, '#263458']],
  tormenta: [[0, '#0a0d16'], [0.3, '#10151f'], [0.6, '#171e2a'], [0.84, '#1f2734'], [0.97, '#283140']],
};

const B_MARES = Object.fromEntries(Object.entries({
  dia: ['#6aa4cc', '#4a88bc', '#3470a8', '#265a92', '#9ccae8', '#1a4474', '#f2f8fa', '#ffffff'],
  tropico: ['#62bcd0', '#3ea2c4', '#2a86ae', '#1e6a98', '#94dcea', '#154e7a', '#f6fcfc', '#ffffff'],
  atardecer: ['#d0907a', '#9a6480', '#64507a', '#403a66', '#f4b880', '#2a2852', '#f8dcb4', '#fff2c8'],
  noche: ['#2a3a62', '#1e2c4e', '#162240', '#101a34', '#46598a', '#0a1026', '#9aa8cc', '#e8eeff'],
  tormenta: ['#2c3644', '#232c3a', '#1b2230', '#141a26', '#56667a', '#0a0e16', '#c4ced8', '#e8eef4'],
}).map(([k, v]) => [k, v.map(hex)]));

const B_NUBES = Object.fromEntries(Object.entries({
  dia: ['#a6c2e0', '#d8e8f6', '#ffffff'], tropico: ['#a8cce6', '#e0f0fa', '#ffffff'], atardecer: ['#6e467a', '#d4806c', '#f8c48a'],
  noche: ['#121a36', '#1e284a', '#38446c'], tormenta: ['#1a202c', '#262e3c', '#3a4454'],
}).map(([k, v]) => [k, v.map(hex)]));

// disco y punto que solo pintan en el cielo limpio (m: la máscara del fondo; off: el balanceo)
function b_discoM(B, m, cx, cy, r, c, off = 0) {
  const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(179, Math.ceil(cy + r)), x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(319, Math.ceil(cx + r)), r2 = r * r;
  for (let y = y0; y <= y1; y++) { const dy = y + 0.5 - cy, f = y * 320, fm = Math.min(179, Math.max(0, y - off)) * 320; for (let x = x0; x <= x1; x++) { const dx = x + 0.5 - cx; if (dx * dx + dy * dy <= r2 && m[fm + x] === 1) B[f + x] = c; } }
}

const b_psM = (B, m, x, y, c, off = 0) => { x |= 0; y |= 0; const ym = y - off; if (x >= 0 && x < 320 && y >= 0 && y < 180 && ym >= 0 && ym < 180 && m[ym * 320 + x] === 1) B[y * 320 + x] = c; };

// cúmulo de tres tonos (sombra, cuerpo, luz) con la base plana; ap < 1 lo aplasta
function b_nubeM(B, m, cx, cy, w, sem, c, ap = 1, off = 0) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 611)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 612) - 0.5) * w * 0.06 * ap, r]); }
  for (const [x, y, r] of bolas) b_discoM(B, m, x, y + 1, r, c[0], off);
  for (const [x, y, r] of bolas) b_discoM(B, m, x, y, r, c[1], off);
  for (const [x, y, r] of bolas) b_discoM(B, m, x - 1, y - 2, r * 0.66, c[2], off);
  const y0 = Math.round(cy + w * 0.08 * ap); for (let x = Math.round(cx - w * 0.47); x <= Math.round(cx + w * 0.47); x++) { b_psM(B, m, x, y0, c[0], off); b_psM(B, m, x, y0 + 1, c[0], off); if (Math.abs(x - cx) < w * 0.4) b_psM(B, m, x, y0 - 1, c[1], off); }
}

// las nubes en tres alturas a tres velocidades (junto al horizonte, pequeñas y lentas; arriba, grandes y más deprisa);
// de noche, estrellas que titilan; v: el viento
function b_nubes(R, t, m, hor, hora, v = 1, off = 0, dens = 1) {
  const B = R.buf, c = B_NUBES[hora] ?? B_NUBES.dia;
  if (hora === 'noche') for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 620) * 319), y = Math.round(h(k, 2, 620) ** 1.4 * (hor - 6)) + off; if (x > 270 && y < 48) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 620) * 2) + k * 1.7); if (tw > -0.5) b_psM(B, m, x, y, tw > 0.55 ? hex('#ffffff') : hex('#8a94c0'), off); if (k % 11 === 0 && tw > 0.7) for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) b_psM(B, m, x + i, y + j, hex('#6a74a0'), off); }
  // lejos: bancos bajos y aplastados junto al horizonte
  for (let k = 0; k < 7 * dens; k++) { const w = 16 + Math.round(h(k, 4, 625) * 16), x = ((h(k, 5, 625) * 440 + t * 0.7 * v) % 460) - 70, y = hor - 5 - Math.round(h(k, 6, 625) * 8) + off; b_nubeM(B, m, x, y, w, k + 21, c, 0.5, off); }
  // en medio
  for (let k = 0; k < 4 * dens; k++) { const w = 26 + Math.round(h(k, 7, 626) * 14), x = ((h(k, 8, 626) * 470 + t * 1.8 * v) % 520) - 100, y = Math.round(hor * 0.5 + h(k, 9, 626) * hor * 0.2) + off; b_nubeM(B, m, x, y, w, k + 31, c, 0.8, off); }
  // arriba: los grandes, más deprisa (nunca en la esquina de Atom)
  for (let k = 0; k < 3 * dens; k++) { const w = 40 + Math.round(h(k, 10, 627) * 22), x = ((h(k, 11, 627) * 520 + t * 3.2 * v) % 600) - 140, y = Math.round(hor * 0.26 + h(k, 12, 627) * 8) + off; if (x > 240 && y < 52) continue; b_nubeM(B, m, x, Math.max(y, 22), w, k + 41, c, 1, off); }
}

// el agua que vive: tres trenes de olas a distinta velocidad (las filas se ensanchan hacia delante), crestas de luz,
// senos de sombra, espuma (fuerza de la mar, 0–1) y el reguero de brillos del sol o la luna en sol (x); pinta solo los
// píxeles de agua de la máscara (m = 2), de y0 (el horizonte) a y1 (lo más cerca)
function b_agua(R, t, m, y0, y1, hora, o = {}) {
  const B = R.buf, P = B_MARES[hora] ?? B_MARES.dia, mar = o.mar ?? 0.2, sol = o.sol, off = o.off ?? 0, sp = o.velocidad ?? 1;
  for (let y = Math.max(0, y0 + off); y < Math.min(180, y1 + off + 1); y++) {
    const ym = y - off; if (ym < 0 || ym > 179) continue;
    const f = y * 320, fm = ym * 320, d = Math.max(0, ym - y0), u = Math.min(1, d / Math.max(1, y1 - y0)), k = Math.floor(Math.sqrt(d) * 2.4), top = k !== Math.floor(Math.sqrt(Math.max(0, d - 1)) * 2.4);
    const fx = 1 / (2.6 + u * 20), ph = h(k, 0, 700) * 6.283, vel = (0.5 + (k % 3) * 0.45) * (k % 2 ? 1 : -0.7) * sp, ph2 = h(k, 1, 700) * 6.283;
    const ci = u * 3, i0 = Math.min(3, Math.floor(ci)), i1 = Math.min(3, i0 + 1), p = ci - i0;
    const ancho = 3 + u * 34;
    for (let x = 0; x < 320; x++) {
      if (m[fm + x] !== 2) continue;
      let c = b_umbral(x, y) < p ? P[i1] : P[i0];
      const w = Math.sin(x * fx + ph + t * vel) + 0.55 * Math.sin(x * fx * 2.3 + ph2 - t * vel * 1.6) + 0.3 * Math.sin(x * 0.05 - t * 0.4 * sp + k);
      if (w > 1.15 - mar * 0.25) c = top && mar > 0.35 && w > 1.45 - mar * 0.2 ? P[6] : P[4];
      else if (w < -1.15) c = P[5];
      else if (top && w > 0.85 && (x + k) % 3 === 0) c = P[4];
      if (sol != null && Math.abs(x - sol) < ancho && w > 0.2 && h(x >> 1, y, Math.floor(t * 5 + x * 0.01)) > 0.78 - (1 - Math.abs(x - sol) / ancho) * 0.18) c = (h(x, y, 702) > 0.5) ? P[7] : P[4];
      B[f + x] = c;
    }
  }
}

// las gaviotas: n aves que planean y aletean entre y0 e y1, a varias velocidades (nunca en la esquina de Atom ni en la
// barra del año)
function b_gaviotas(R, t, n, y0, y1, tn = (c) => c, sem = 0) {
  const bl = tn(hex('#f4f4f0')), gr = tn(hex('#9aa0a8')), ng = tn(hex('#2a2a30'));
  for (let k = 0; k < n; k++) {
    const dir = h(k, 1, 710 + sem) > 0.5 ? 1 : -1, sp = 6 + h(k, 2, 710 + sem) * 10, x = Math.round(((h(k, 3, 710 + sem) * 420 + dir * t * sp) % 420 + 420) % 420 - 50), y = Math.round(y0 + h(k, 4, 710 + sem) * (y1 - y0) + Math.sin(t * 0.7 + k * 2.1) * 4);
    if ((x > 270 && y < 50) || (x > 14 && x < 176 && y < 18)) continue;
    const fl = Math.sin(t * (5 + k % 3) + k * 1.9), g = (fl > 0.4 && h(k, 5, 710) > 0.3) ? -1 : fl < -0.4 ? 1 : 0, big = k % 4 === 0 ? 1 : 0;
    R.pset(x, y, bl); R.pset(x + dir, y, bl); R.pset(x + 2 * dir, y - 1, ng);
    for (let i = 1; i <= 3 + big; i++) { const yy = y + (i <= 2 ? g * (i === 2 ? 1 : 0) : g * 2) - (g === 0 && i > 2 ? 0 : 0) - (i === 1 ? 0 : g === 0 ? 0 : 0); R.pset(x - i, yy - (g === -1 ? i >> 1 : 0), i > 2 + big ? ng : i > 2 ? gr : bl); R.pset(x + 1 + i, yy - (g === -1 ? i >> 1 : 0), i > 2 + big ? ng : i > 2 ? gr : bl); }
  }
}

// una bocanada de humo de cañón que nace en (x, y) en t0, crece, sube y se deshace con el viento (dx)
function b_humo(R, x, y, t0, t, tn = (c) => c, dx = -6) {
  const u = t - t0; if (u < 0 || u > 3.2) return;
  if (u < 0.12) { R.disco(x, y, 3, tn(B_P.luzL)); R.disco(x, y, 2, tn(hex('#ffffff'))); return; }
  const cs = [tn(B_P.humoD), tn(B_P.humoS), tn(B_P.humo)];
  for (let i = 0; i < 6; i++) { const r = (2 + u * 3.2) * (0.6 + h(i, 1, 720) * 0.6), px = x + dx * u + (h(i, 2, 720) - 0.5) * 6 * (0.4 + u), py = y - u * 4 + (h(i, 3, 720) - 0.5) * 4 * (0.4 + u);
    const fuera = u > 1.8 ? (u - 1.8) / 1.4 : 0;
    R.disco(px, py + 1, r, (xx, yy) => (b_umbral(xx, yy) < fuera ? R.pget(xx, yy) : cs[0])); R.disco(px - 0.5, py - 0.5, r * 0.8, (xx, yy) => (b_umbral(xx, yy) < fuera ? R.pget(xx, yy) : cs[1])); R.disco(px - 1, py - 1, r * 0.45, (xx, yy) => (b_umbral(xx, yy) < fuera * 1.2 ? R.pget(xx, yy) : cs[2])); }
}

// tablazón: tablas horizontales de alto px (o con perspectiva: alto crece hacia abajo) con su canto de luz, la junta de
// sombra, las cabezas de tabla con clavos y la veta (cols: luz, cuerpo, sombra, junta)
function b_tablas(R, x0, y0, x1, y1, cols, alto, sem, persp = 0) {
  const B = R.buf; let fila = 0, ya = y0;
  while (ya <= y1) {
    const ha = Math.max(2, Math.round(alto + persp * (ya - y0))), yb = Math.min(y1, ya + ha - 1), lag = Math.round(h(fila, sem, 730) * 60), largo = 46 + Math.round(h(fila, sem, 731) * 30) + persp * 40;
    for (let y = Math.max(0, ya); y <= Math.min(179, yb); y++) { const f = y * 320, r = y - ya;
      for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
        const xl = (x + lag) % largo; let c = cols[1];
        if (r === 0) c = cols[0]; else if (y === yb) c = cols[3]; else if (r === ha - 2) c = cols[2];
        else { const v = h(x >> 3, y, sem + fila) + Math.sin((x + fila * 13) * 0.21 + y * 0.9) * 0.2; if (v > 0.9) c = cols[2]; else if (v < 0.06) c = cols[0]; }
        if (xl === 0) c = cols[3]; else if (xl === 1 && r > 0 && y < yb) c = cols[2];
        if ((xl === 3 || xl === largo - 2) && (r === 1 || r === ha - 3) && ha > 3) c = B_P.clavo;
        B[f + x] = c;
      } }
    ya = yb + 1; fila++;
  }
}

// un barril de pie: duelas con luz y sombra, aros de hierro y la tapa (cx, el centro; yt, el canto de arriba)
function b_barril(R, cx, yt, w, alto, tn = (c) => c, tapa = true) {
  const r = w / 2;
  for (let y = 0; y <= alto; y++) { const b = 1 + 0.08 * Math.sin(y / alto * Math.PI), rr = r * b;
    for (let x = Math.round(-rr); x <= Math.round(rr); x++) { const u = (x + rr) / (2 * rr); let c = u < 0.18 ? B_P.cascoL : u > 0.78 ? B_P.cascoS : u > 0.9 ? B_P.cascoD : B_P.casco; if ((x + 40) % 4 === 0) c = u > 0.6 ? B_P.cascoD : B_P.cascoS; if (u > 0.92) c = B_P.cascoD;
      const aro = y === 2 || y === 3 || y === alto - 3 || y === alto - 2 || Math.abs(y - alto * 0.38) < 1 || Math.abs(y - alto * 0.62) < 1; if (aro) c = u < 0.25 ? B_P.hierroL : u > 0.75 ? hex('#1e1e26') : B_P.hierro;
      R.pset(cx + x, yt + y, tn(c)); } }
  if (tapa) for (let j = -2; j <= 2; j++) for (let x = Math.round(-r); x <= Math.round(r); x++) { if ((x * x) / (r * r) + (j * j) / 6.5 > 1) continue; R.pset(cx + x, yt + j, tn(j === -2 || Math.abs(x) >= r - 1 ? B_P.cascoS : (x + 40) % 5 === 0 ? B_P.cascoS : j < 0 ? B_P.cubiertaL : B_P.cubierta)); }
}

// un rollo de cuerda en el suelo (aduja): vueltas en elipse con luz y sombra
function b_aduja(R, cx, cy, r, tn = (c) => c) {
  for (let k = Math.round(r); k >= 1; k--) for (let a = 0; a < 6.283; a += 0.6 / k) { const x = Math.round(cx + Math.cos(a) * k), y = Math.round(cy + Math.sin(a) * k * 0.42); R.pset(x, y, tn(k % 2 ? (Math.sin(a) < -0.2 ? B_P.cuerdaL : B_P.cuerda) : B_P.cuerdaS)); }
  R.pset(cx, cy, tn(B_P.cascoD));
}

// una cuerda tendida de (x0, y0) a (x1, y1) que cuelga (comba) y se mece un poco
function b_cabo(R, x0, y0, x1, y1, comba, c, n = 0) {
  const L = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0; let px = x0, py = y0;
  for (let i = 1; i <= L; i++) { const u = i / L, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * comba; R.linea(Math.round(px), Math.round(py), Math.round(x), Math.round(y), c); px = x; py = y; }
}

// una bandera que ondea: el asta en (x, y), largo l y alto a, hacia dir (-1 a la izquierda), sin símbolos; cola: gallardete
function b_bandera(R, x, y, l, a, t, dir, c, cS, cL, cola = false, fuerza = 1) {
  for (let i = 0; i <= l; i++) { const u = i / l, onda = Math.sin(t * 7 * fuerza - i * 0.45) * (0.5 + u * 1.6), alto = cola ? Math.max(1, Math.round(a * (1 - u * 0.85))) : a;
    for (let j = 0; j < alto; j++) { const yy = Math.round(y + j + onda + (cola ? u * a * 0.3 : 0)), lum = Math.cos(t * 7 * fuerza - i * 0.45); R.pset(x + dir * i, yy, j === 0 && lum > 0.3 ? cL : lum < -0.5 ? cS : c); } }
}

// una nao (española o portuguesa) de casco alto, de costado: x el centro, yw la línea de flotación, s la escala (1 = 60
// px de eslora), o.dir (1 la proa a la derecha), o.cruz (el color de la cruz de las velas, genérica), o.velas ('llenas'
// | 'recogidas', fondeada), o.k (semilla del vaivén), o.giro (escora en radianes), o.tn (tono de la hora), o.disparo
// (instante de un cañonazo por su costado). Devuelve { x, y } de la cubierta.
function b_nao(R, x, yw, s, t, o = {}) {
  const dir = o.dir ?? 1, k = o.k ?? 0, tn = o.tn ?? ((c) => c), giro = (o.giro ?? 0) + Math.sin(t * 0.9 + k) * 0.025, yb = yw + Math.sin(t * 1.1 + k * 2) * 0.9 * Math.max(0.6, s);
  const cg = Math.cos(giro), sg = Math.sin(giro);
  const P = (dx, dy) => [x + dir * (dx * cg - dy * sg) * s, yb + (dy * cg + dx * sg) * s];
  const pol = (pts, c) => R.poligono(pts.map(([a, b]) => P(a, b)), c);
  const lin = (a, b, c2, d, col) => { const p = P(a, b), q = P(c2, d); R.linea(p[0], p[1], q[0], q[1], col); };
  const llenas = (o.velas ?? 'llenas') === 'llenas', viento = Math.sin(t * 1.7 + k) * 0.6;
  // el reflejo en el agua, que tiembla
  for (let j = 1; j < 6 * s; j++) for (let dx = -26; dx <= 24; dx += 1 / s) { const p = P(dx, 0); if ((Math.round(p[0]) + j) % 2 === 0 && h(Math.round(p[0]) >> 1, j, Math.floor(t * 4)) > 0.35) R.pset(p[0] + Math.sin(t * 3 + j) * 1, yb + j, tn(j < 3 * s ? B_P.cascoD : B_P.cascoS)); }
  // los palos y la jarcia (detrás de las velas)
  const palos = [[2, -10, -58], [19, -12, -45], [-20, -14, -42]];
  const jc = tn(B_P.jarcia);
  lin(2, -58, 33, -13, jc); lin(2, -58, -30, -17, jc); lin(19, -45, 41, -22, jc); lin(-20, -42, -31, -17, jc);
  for (const [px, y0, y1] of palos) { lin(px, y0, px, y1, tn(B_P.cascoS)); if (s > 0.7) lin(px + 0.7 / s, y0, px + 0.7 / s, y1, tn(B_P.casco)); lin(px - 7, y0 + 1, px, y1 + 6, jc); lin(px + 7, y0 + 1, px, y1 + 6, jc); }
  lin(27, -13, 42, -24, tn(B_P.cascoS));
  // las velas: cuadradas en el trinquete y el mayor (con el vientre de luz y la cruz), latina en la mesana
  const vC = tn(B_P.vela), vS = tn(B_P.velaS), vL = tn(B_P.velaL), vD = tn(B_P.velaD), cz = tn(o.cruz ?? B_P.cruz);
  const cuadra = (cx, ya, yb2, w, cruz) => {
    if (!llenas) { lin(cx - w, ya, cx + w, ya, tn(B_P.cascoS)); for (let i = -w; i <= w; i += 1 / s) { const p = P(i, ya + 1); R.pset(p[0], p[1], (i * 3 | 0) % 2 ? vS : vC); R.pset(p[0], p[1] - 1, vD); } return; }
    const b = 2.5 + viento * 0.5;
    pol([[cx - w, ya], [cx + w, ya], [cx + w + b * 0.4, (ya + yb2) / 2], [cx + w - 1, yb2], [cx - w + 1, yb2], [cx - w + b * 0.4, (ya + yb2) / 2]], (px, py) => { const q = (px - P(cx, 0)[0]) / (w * s) * dir, v = (py - P(0, ya)[1]) / ((yb2 - ya) * s); return q > 0.55 ? vS : q < -0.7 ? vS : v < 0.12 ? vD : (q > -0.1 && q < 0.35 && v > 0.3 && v < 0.8) ? vL : vC; });
    lin(cx - w - 1, ya, cx + w + 1, ya, tn(B_P.cascoS));
    if (s > 0.6) for (let i = -w + 3; i < w; i += 4) lin(i + cx, ya + 1, i + cx + 0.4, yb2 - 1, tn(B_P.costura));
    if (cruz) { const my = (ya + yb2) / 2, ww = Math.max(1, Math.round(s * 1.6)); for (let j = -ww; j < ww; j++) { lin(cx + j / s * 0.7, ya + 2, cx + j / s * 0.7, yb2 - 2, cz); lin(cx - w * 0.6, my + j / s * 0.7, cx + w * 0.6, my + j / s * 0.7, cz); } }
  };
  cuadra(2, -46, -22, 13, true); cuadra(2, -55, -47, 8, false); cuadra(19, -38, -22, 9, true);
  // mesana latina
  if (llenas) pol([[-32, -16], [-12, -44], [-14, -15]], (px, py) => (h(px, py, 740) > 0.92 ? vS : (px - P(-20, 0)[0]) * dir > 2 * s ? vS : vC)); lin(-33, -15, -11, -45, tn(B_P.cascoS));
  // el casco: castillo de popa alto, combés bajo y castillo de proa, tracas, la cinta pintada y la regala
  const casco = [[-31, -18], [-17, -18], [-17, -12], [14, -10], [16, -15], [27, -15], [33, -13], [27, -4], [21, 0], [-25, 0], [-31, -7]];
  pol(casco, (px, py) => { const dy = (py - yb) / s; const r = Math.round(-dy) % 3; return dy > -3 ? tn(B_P.cascoD) : r === 0 ? tn(B_P.cascoS) : dy < -11 ? tn(B_P.cascoL) : tn(B_P.casco); });
  lin(-31, -18, -17, -18, tn(B_P.dorado)); lin(16, -15, 27, -15, tn(B_P.dorado)); lin(-25, -6, 25, -6, tn(o.cinta ?? B_P.cascoR)); lin(-17, -12, 14, -10, tn(B_P.cascoL));
  if (s > 0.6) { for (let i = -29; i < -18; i += 3) { const p = P(i, -16); R.pset(p[0], p[1], tn(B_P.doradoL)); } for (const gx of [-10, -2, 6]) { const p = P(gx, -8); R.rect(Math.round(p[0]), Math.round(p[1]), Math.round(p[0] + s), Math.round(p[1] + s), tn(B_P.sombra)); } }
  // los gallardetes en lo alto de los palos y el farol de popa
  for (const [px, , y1] of palos) { const p = P(px, y1); b_bandera(R, Math.round(p[0]), Math.round(p[1]), Math.round(8 * s), Math.max(1, Math.round(2 * s)), t + k, -1, tn(o.gallardete ?? B_P.toldoB), tn(B_P.velaS), tn(B_P.velaL), true); }
  { const p = P(-32, -21); R.rect(Math.round(p[0]), Math.round(p[1]), Math.round(p[0] + s), Math.round(p[1] + 2 * s), tn(B_P.laton)); }
  // un cañonazo por el costado
  if (o.disparo != null) { const p = P(-4, -8); b_humo(R, Math.round(p[0]), Math.round(p[1]), o.disparo, t, tn, -5); }
  return { x: P(0, -11)[0], y: P(0, -11)[1] };
}

// una galera otomana de costado: x el centro, yw la flotación, s la escala (1 = 116 px de eslora más el espolón), o.dir
// (1 la proa a la derecha), o.vela ('abierta' | 'recogida'), o.remos (true: bogan, con la palada que entra y sale del agua; false: remos metidos dentro, solo se ven los remeros)
// o.giro (escora, radianes), o.k, o.tn, o.farol (encendido), o.arriada (con vela recogida: las entenas bajadas sobre la cubierta, como en un temporal). Casco oscuro con la banda roja, toldo de
// popa a rayas, el farol dorado, la bandera roja sin símbolos, los remeros (cabezas) en fila y dos velas latinas.
function b_galera(R, x, yw, s, t, o = {}) {
  const dir = o.dir ?? 1, k = o.k ?? 0, tn = o.tn ?? ((c) => c), giro = o.giro ?? Math.sin(t * 0.8 + k) * 0.018, yb = yw + (o.giro != null ? 0 : Math.sin(t * 1.2 + k * 2) * 0.8 * Math.max(0.6, s));
  const cg = Math.cos(giro), sg = Math.sin(giro);
  const P = (dx, dy) => [x + dir * (dx * cg - dy * sg) * s, yb + (dy * cg + dx * sg) * s];
  const pol = (pts, c) => R.poligono(pts.map(([a, b]) => P(a, b)), c);
  const lin = (a, b, c2, d, col) => { const p = P(a, b), q = P(c2, d); R.linea(p[0], p[1], q[0], q[1], col); };
  const abierta = (o.vela ?? 'abierta') === 'abierta', bogan = o.remos ?? true, ritmo = t * 2.2 + k;
  // el reflejo
  for (let j = 1; j < 4 * s; j++) for (let dx = -50; dx <= 52; dx += 1 / s) { const p = P(dx, 0); if ((Math.round(p[0]) + j) % 2 === 0 && h(Math.round(p[0]) >> 1, j, Math.floor(t * 4)) > 0.4) R.pset(p[0] + Math.sin(t * 3 + j), yb + j, tn(B_P.cascoD)); }
  // los remos (detrás del casco no: por fuera de la postiza), la palada y las salpicaduras
  const n = 17; for (let i = 0; i < n && bogan; i++) { const dx = -40 + i * 5, ph = Math.sin(ritmo), dip = Math.cos(ritmo), bx = dx - 2 + ph * 3.5, by = bogan ? (dip > 0 ? 6 : 3.5) : 5;
    lin(dx, -7, bx, by, tn(B_P.cuerdaL)); if (s > 0.6) lin(dx + 0.6 / s, -7, bx + 0.6 / s, by, tn(B_P.cuerdaS));
    if (bogan && dip > 0.85) { const p = P(bx, 3); R.pset(p[0] - 1, p[1] - 1, tn(hex('#f2f8fa'))); R.pset(p[0] + 1, p[1] - 1, tn(hex('#f2f8fa'))); } }
  // los palos, la jarcia y las velas latinas (o recogidas sobre la entena)
  const vC = tn(B_P.vela), vS = tn(B_P.velaS), vL = tn(B_P.velaL), vD = tn(B_P.velaD), jc = tn(B_P.jarcia), flame = Math.sin(t * 2.1 + k) * 1.2;
  lin(6, -8, 6, -42, tn(B_P.cascoS)); lin(36, -8, 36, -32, tn(B_P.cascoS)); lin(6, -42, -30, -9, jc); lin(6, -42, 40, -9, jc); lin(36, -32, 56, -8, jc);
  const latina = (a, b, c3, mx, ver) => { if (abierta) pol([a, b, c3], (px, py) => { const q = (px - P(mx, 0)[0]) * dir / s; return h(px, py, 741) > 0.94 ? vS : q < -14 ? vL : q > 10 ? vS : py > P(0, c3[1] - 6)[1] ? vD : vC; });
    lin(a[0], a[1], b[0], b[1], tn(B_P.cascoD)); if (!abierta) for (let u = 0.08; u < 0.95; u += 0.02 / s) { const px = a[0] + (b[0] - a[0]) * u, py = a[1] + (b[1] - a[1]) * u, p = P(px, py + 1.2); R.pset(p[0], p[1], h(u * 40 | 0, 1, 742) > 0.5 ? vC : vS); R.pset(p[0], p[1] + 1, vS); } };
  if (o.arriada) { latina([46, -12], [-40, -16], [0, 0], 0, 1); latina([62, -10], [18, -12], [0, 0], 36, 1); }   // con temporal, las entenas bajadas sobre la cubierta
  else { latina([42, -14], [-36, -60 + flame * 0.3], [-18, -10], 0, 1); latina([60, -10], [16, -38], [26, -9], 36, 1); }
  if (abierta && s > 0.6) for (let i = 0; i < 6; i++) lin(30 - i * 11, -18 - i * 6.5, -14 + i * 4, -11, tn(B_P.costura));
  // la bandera roja en el tope y el gallardete de la entena
  { const p = P(6, -44), q = o.arriada ? P(-40, -16) : P(-36, -60 + flame * 0.3); b_bandera(R, Math.round(p[0]), Math.round(p[1]) - Math.round(4 * s), Math.round(9 * s), Math.max(2, Math.round(4 * s)), t + k, -dir, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL)); b_bandera(R, Math.round(q[0]), Math.round(q[1]), Math.round(10 * s), Math.max(1, Math.round(2 * s)), t + k + 1, -dir, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL), true); }
  // el casco: bajo y largo, la popa que se alza, el espolón, la banda roja y la postiza
  pol([[-58, -14], [-52, -9], [-44, -7], [50, -7], [58, -8], [72, -3], [70, -2], [56, -1], [50, 0], [-46, 0], [-55, -5]], (px, py) => { const dy = (py - yb) / s; return dy > -2 ? tn(B_P.cascoD) : dy > -4.2 ? tn(B_P.cascoR) : dy > -5.4 ? tn(B_P.dorado) : tn(B_P.casco); });
  lin(-44, -8, 50, -8, tn(B_P.cascoL)); lin(-40, -6, 46, -6, tn(B_P.cascoS));
  // los remeros: una fila de cabezas (turbantes y gorros) que se mecen con la boga
  if (s > 0.45) for (let i = 0; i < n; i += 1) { const dx = -40 + i * 5 + 1.5, sw = bogan ? Math.round(Math.sin(ritmo + 0.4) * 1.2) : 0, p = P(dx + sw / s, -9.5); R.pset(p[0], p[1], tn(i % 3 ? B_P.turbante : B_P.faja)); if (s > 0.9) { R.pset(p[0] + 1, p[1], tn(i % 3 ? B_P.turbante : B_P.faja)); R.pset(p[0], p[1] + 1, tn(B_P.piel)); R.pset(p[0] + 1, p[1] + 1, tn(B_P.pielS)); } }
  // el toldo de popa a rayas, el farol dorado en su asta y la bandera grande de popa
  pol([[-55, -10], [-54, -17], [-38, -17], [-37, -9]], (px) => (Math.floor((px - x) / Math.max(1, 2 * s)) % 2 ? tn(B_P.toldo) : tn(B_P.toldoB)));
  lin(-55, -18, -37, -18, tn(B_P.cascoS));
  lin(-59, -14, -61, -26, tn(B_P.cascoS));
  { const p = P(-61, -27), r = Math.max(1, 2 * s); R.disco(p[0], p[1], r + 0.5, tn(B_P.doradoS)); R.disco(p[0], p[1], r, o.farol ? B_P.luzL : tn(B_P.dorado)); if (o.farol) for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j) / (6 * s); if (d < 1 && d > 0.3 && b_umbral(Math.round(p[0] + i * s), Math.round(p[1] + j * s)) < (1 - d) * 0.8) R.pset(p[0] + i * s, p[1] + j * s, B_P.luzS); } }
  { const p = P(-60, -24); b_bandera(R, Math.round(p[0]), Math.round(p[1]), Math.round(10 * s), Math.max(2, Math.round(6 * s)), t + k + 2, -dir, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL)); }
  return { x: P(0, -9)[0], y: P(0, -9)[1], cubierta: (dx) => P(dx, -9), P };
}

// una palmera que se mece con el viento (de ep12, d_palmera): tronco anillado con luz y sombra, cocos, hojas secas y
// dos capas de pencas
function b_palmera(R, x, base, alto, t, viento, tn, sem = 0) {
  const { pset } = R, m = Math.sin(t * (1.1 + viento * 2.2) + x * 0.7) * (1.2 + viento * 2), top = base - alto, dob = viento * 9;
  const lean = (u) => Math.round(u * (1.5 + m * 0.6) - dob * u * u + (sem % 2 ? u * u * 6 : -u * u * 4));
  const tr = tn(C.corteza), trS = tn(C.cortezaS), trL = tn(hex('#b0a08c')), trD = tn(b_mezcla(C.corteza, C.k, 0.25)), k = tn(C.k);
  for (let y = base; y >= top; y--) { const u = (base - y) / alto, xx = x + lean(u), r = (y + (xx & 1) + sem) % 4;
    for (let i = -2; i <= 2; i++) pset(xx + i, y, i === -2 ? trL : i === 2 ? trS : r === 0 ? trD : tr); pset(xx - 3, y, k); pset(xx + 3, y, k); if (r === 2) { pset(xx - 1, y, trS); pset(xx + 1, y, trS); } }
  const cx = x + lean(1), cy = top, seca = tn(hex('#9a7a44')), secaS = tn(hex('#7a5a30'));
  for (let j = 0; j < 9; j++) { const a = Math.PI / 2 + (j - 4) * 0.22, l = 5 + (j % 3); for (let d = 1; d < l; d++) pset(Math.round(cx + Math.cos(a) * d * 0.9 - viento * d * 0.4), cy + 2 + d, d > l - 2 ? secaS : seca); }
  const palma = (a, l, c, cS, cL) => { for (let d = 1; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d - viento * f * f * l * 0.55), yy = Math.round(cy + Math.sin(a) * d * 0.62 + f * f * l * (0.55 - viento * 0.3));
      pset(xx, yy, f > 0.82 ? cL : c); pset(xx, yy + 1, c); if (d > 2) { const fl = Math.max(1, Math.round((1 - f) * 4 + 0.5)); for (let j = 1; j <= fl; j++) pset(xx - Math.round(viento * j * 0.6), yy + j, j === fl ? cS : c); if (d % 2 === 0) pset(xx, yy - 1, cS); } } };
  const sw = (j) => Math.sin(t * (1.6 + viento * 3) + j * 0.9 + x) * (0.05 + viento * 0.08) + m * 0.02;
  const P0 = tn(hex('#2e6a2a')), P0S = tn(hex('#245a24')), P0L = tn(C.hierbaS), P1 = tn(C.hierba), P1L = tn(C.verdeL), P1S = tn(C.hierbaS), P1H = tn(C.hierbaL);
  for (let j = 0; j < 11; j++) palma(-Math.PI - 0.15 + j * ((Math.PI + 0.3) / 10) + sw(j), 15 + (j % 3) * 3, P0, P0S, P0L);
  R.disco(cx, cy + 1, 3, tn(hex('#6a5a3a'))); for (let j = 0; j < 5; j++) pset(cx - 2 + j, cy + 3 + (j % 2), tn(hex('#8a6a2a')));
  for (let j = 0; j < 12; j++) palma(-Math.PI - 0.35 + j * ((Math.PI + 0.7) / 11) + sw(j + 9), 12 + ((j * 5) % 4) * 2, j % 2 ? P1 : P1L, P1S, P1H);
  return [cx, cy];
}

// un loro (guacamayo) que vuela: cuerpo y cola larga del color c, alas que baten (o posado, si vuela = false)
function b_loro(R, x, y, t, c, cS, ala, dir = 1, vuela = true) {
  x = Math.round(x); y = Math.round(y);
  const f = vuela ? Math.sin(t * 9 + x) : -1;
  for (let i = 0; i < 4; i++) R.pset(x - dir * (2 + i), y + (vuela ? (i >> 1) : 2 + i), i > 2 ? cS : c);
  R.pset(x, y, c); R.pset(x - dir, y, c); R.pset(x + dir, y, c); R.pset(x + dir * 2, y, hex('#f4f0e0')); R.pset(x + dir * 2, y + 1, hex('#2a2a2a')); R.pset(x - dir, y + 1, cS);
  if (vuela) { const yy = f > 0 ? -2 : 1; R.pset(x, y + Math.sign(yy), ala); R.pset(x - dir, y + yy, ala); R.pset(x, y + yy, ala); R.pset(x + dir, y + yy - Math.sign(yy), ala); } else { R.pset(x, y + 1, ala); R.pset(x - dir, y + 2, ala); }
}

// el sol (o la luna, de noche) con su halo tramado, solo en el cielo limpio
function b_astro(R, m, x, y, hora, off = 0) {
  const B = R.buf; y += off;
  if (hora === 'noche') { b_discoM(B, m, x, y, 9, hex('#1e2a50'), off); b_discoM(B, m, x, y, 6, hex('#e8ecf4'), off); b_discoM(B, m, x + 2, y - 1, 5, hex('#ffffff'), off); b_psM(B, m, x - 2, y + 1, hex('#c4ccdc'), off); b_psM(B, m, x - 1, y + 2, hex('#c4ccdc'), off); b_psM(B, m, x + 1, y - 3, hex('#d4dae6'), off); return; }
  const halo = hora === 'atardecer' ? hex('#f8b878') : hex('#f4f0d0');
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 14 && d > 8 && b_umbral(x + i, y + j) < (14 - d) / 10) b_psM(B, m, x + i, y + j, halo, off); }
  b_discoM(B, m, x, y, 8, hora === 'atardecer' ? hex('#ffd890') : hex('#fff4c8'), off); b_discoM(B, m, x - 1, y - 1, 6, hora === 'atardecer' ? hex('#fff0c0') : hex('#ffffff'), off);
}

// GALERA · la cubierta de la galera otomana mirando a babor ----------------------------------------------------------
function b_galeraCubierta(R, t, o) {
  const hora = o.hora ?? 'dia', tn = b_tinte(hora), hor = 70, off = Math.round(Math.sin(t * 0.7) * 1.6 * (o.balanceo ?? 1)), noche = hora === 'noche';
  const XS = Array.from({ length: 12 }, (_, i) => 14 + i * 21);   // los escálamos de la borda lejana
  const F = b_capa(R, 'galera|' + hora, (b) => {
    b_degradado(R, 0, hor, B_CIELOS[hora]); const foto = b.slice();
    b.fill(B_AGUA, hor * 320, 114 * 320); R.rect(0, 114, 319, 179, tn(B_P.cascoD));
    // la costa lejana: montes azulados con un pueblo blanco y una torre
    for (let x = 0; x < 168; x++) { const yt = Math.round(hor - 3 - 7 * Math.exp(-(((x - 52) / 34) ** 2)) - 4 * Math.exp(-(((x - 116) / 22) ** 2)) - h(x >> 2, 1, 750) * 1.5 + (x > 150 ? (x - 150) * 0.3 : 0));
      for (let y = yt; y < hor; y++) R.pset(x, y, tn(y === yt ? B_P.monteL : (h(x, y, 751) > 0.8 ? B_P.monteS : B_P.monte))); }
    for (let i = 0; i < 9; i++) { const x = 92 + i * 4 + (i % 3); R.rect(x, hor - 3, x + 2, hor - 1, tn(B_P.cal)); R.pset(x, hor - 4, tn(B_P.teja)); R.pset(x + 1, hor - 4, tn(B_P.teja)); }
    R.rect(40, hor - 16, 42, hor - 9, tn(B_P.piedraL)); R.pset(40, hor - 17, tn(B_P.piedraL)); R.pset(42, hor - 17, tn(B_P.piedraL));
    return { m: b_mascara(b, foto, hor) };
  });
  // la borda lejana (con la postiza y los escálamos) y el pozo de los bancos de boga
  const M = b_capa(R, 'galeraM|' + hora, () => {
    for (let y = 108; y < 128; y++) for (let x = 0; x < 264; x++) R.pset(x, y, tn(h(x >> 1, y, 752) > 0.85 ? B_P.cascoS : y > 120 ? B_P.sombra : B_P.cascoD));
    b_tablas(R, 0, 100, 263, 108, [tn(B_P.cascoL), tn(B_P.casco), tn(B_P.cascoS), tn(B_P.cascoD)], 3, 3);
    R.rect(0, 97, 263, 98, tn(B_P.cubiertaL)); R.rect(0, 99, 263, 99, tn(B_P.cascoS));
    for (const x of XS) { R.rect(x, 93, x + 1, 96, tn(B_P.cascoS)); R.pset(x, 93, tn(B_P.cascoL)); }
    // los bancos en diagonal
    for (const x of XS) for (let j = 0; j < 12; j++) { R.rect(x - 4 + j, 112 + j, x + 3 + j, 112 + j, tn(j === 0 ? B_P.cubiertaL : j % 3 === 0 ? B_P.cubiertaS : B_P.cubierta)); R.pset(x + 4 + j, 112 + j, tn(B_P.cascoD)); }
  }, true);
  // la crujía (donde se pisa), el palo, el cañón de proa, la popa con su balaustrada, el toldo y el gran farol
  const Fr = b_capa(R, 'galeraF|' + hora, () => {
    const tc = [tn(B_P.cubiertaL), tn(B_P.cubierta), tn(B_P.cubiertaS), tn(B_P.junta)];
    R.rect(0, 122, 262, 127, tn(B_P.cascoS)); R.rect(0, 122, 262, 122, tn(B_P.cubiertaL)); for (let x = 6; x < 262; x += 21) R.rect(x, 123, x + 1, 127, tn(B_P.cascoD));
    b_tablas(R, 0, 128, 262, 179, tc, 3, 7, 0.13);
    // el palo con su cabillero (cabillas y adujas colgadas)
    for (let y = 18; y < 134; y++) for (let x = 196; x <= 203; x++) R.pset(x, y, tn(x === 196 ? B_P.cascoL : x >= 202 ? B_P.cascoD : (y + x) % 9 === 0 ? B_P.cascoS : B_P.casco));
    for (let y = 40; y < 130; y += 22) { R.rect(195, y, 204, y + 1, tn(B_P.hierro)); R.pset(196, y, tn(B_P.hierroL)); }
    R.rect(186, 128, 214, 131, tn(B_P.cascoS)); R.rect(186, 128, 214, 128, tn(B_P.cubiertaL)); for (const x of [188, 192, 207, 211]) { R.rect(x, 124, x, 128, tn(B_P.cuerdaL)); R.pset(x, 123, tn(B_P.cascoL)); }
    R.rect(184, 132, 186, 138, tn(B_P.cascoS)); R.rect(212, 132, 214, 138, tn(B_P.cascoS));
    for (let i = 0; i < 8; i++) { R.pset(189 + (i & 1), 129 + i, tn(B_P.cuerda)); R.pset(209 - (i & 1), 129 + i, tn(B_P.cuerda)); }
    // el cañón de proa en su cureña, a la izquierda
    R.rect(0, 130, 22, 136, tn(B_P.cascoS)); R.rect(0, 130, 22, 130, tn(B_P.cascoL));
    for (let x = 0; x < 30; x++) { const r = 3 - x / 15; for (let y = -Math.round(r); y <= Math.round(r); y++) R.pset(x, 126 + y, tn(y < 0 ? B_P.latonL : y > 0 ? B_P.doradoS : B_P.laton)); }
    R.rect(28, 124, 31, 128, tn(B_P.doradoS)); R.disco(10, 137, 3, tn(B_P.cascoD)); R.disco(10, 137, 1, tn(B_P.hierroL));
    // las adujas, la tinaja de agua, el cubo
    b_aduja(R, 40, 142, 8, tn); b_aduja(R, 232, 168, 10, tn);
    for (let y = 0; y < 14; y++) { const w = Math.round(4 + Math.sin(y / 14 * Math.PI) * 3); for (let x = -w; x <= w; x++) R.pset(76 + x, 116 + y, tn(x < -w + 2 ? hex('#d88a5a') : x > w - 2 ? hex('#8a4a2a') : hex('#b86a40'))); } R.rect(73, 114, 79, 115, tn(hex('#8a4a2a')));
    for (let y = 162; y < 176; y++) for (let x = 120; x < 168; x++) { const gx = (x - 120) % 6, gy = (y - 162) % 5; R.pset(x, y, tn(x < 122 || x > 165 || y < 164 || y > 173 ? (y === 162 ? B_P.cubiertaL : B_P.cascoS) : gx < 2 || gy < 2 ? (gy === 0 ? B_P.cubiertaL : B_P.cubiertaS) : B_P.sombra)); }
    for (const [x, y] of [[96, 158], [180, 166], [60, 170]]) { R.pset(x, y, tn(B_P.cuerdaS)); R.pset(x + 1, y, tn(B_P.cuerda)); }
    b_barril(R, 236, 132, 10, 10, tn); R.linea(231, 132, 236, 127, tn(B_P.cuerdaS)); R.linea(236, 127, 241, 132, tn(B_P.cuerdaS));
    // la popa: pared de tablas pintadas con paneles turquesa y oro, la puerta en arco, la escala y la balaustrada
    for (let y = 92; y < 180; y++) for (let x = 262; x < 320; x++) { const px = (x - 262) % 19, py = (y - 100) % 22; let c = B_P.cascoR; if (px < 2 || py < 2) c = B_P.dorado; else if (px > 3 && px < 16 && py > 3 && py < 19) c = (Math.abs(px - 9.5) + Math.abs(py - 11) < 6) ? (px + py) % 4 < 2 ? B_P.turquesa : B_P.turquesaS : B_P.cascoRS; if (x === 262 || x === 263) c = B_P.cascoD; R.pset(x, y, tn(c)); }
    for (let y = 130; y < 166; y++) for (let x = 280; x < 300; x++) { const d = y < 140 ? Math.hypot(x - 289.5, y - 140) : Math.abs(x - 289.5); if (d < 10) R.pset(x, y, tn(d > 8.5 ? B_P.dorado : x > 289 ? B_P.cascoD : B_P.sombra)); }
    R.rect(262, 90, 319, 93, tn(B_P.cascoS)); R.rect(262, 90, 319, 90, tn(B_P.doradoL));
    for (let x = 264; x < 320; x += 5) { R.rect(x, 80, x + 1, 89, tn(B_P.dorado)); R.pset(x, 84, tn(B_P.doradoL)); R.pset(x + 1, 86, tn(B_P.doradoS)); } R.rect(262, 78, 319, 79, tn(B_P.cascoL));
    for (let i = 0; i < 9; i++) { const y = 96 + i * 6, x = 258 - i * 1; R.rect(x - 6, y, x, y + 1, tn(B_P.cubiertaL)); } R.linea(258, 94, 249, 150, tn(B_P.cascoS)); R.linea(252, 94, 243, 150, tn(B_P.cascoS));
    // el toldo a rayas sobre la popa, en sus candeleros
    for (let x = 264; x < 320; x++) { const yt = 58 + Math.round(((x - 264) / 56) * 3); for (let y = yt; y < yt + 8; y++) R.pset(x, y, tn(y === yt + 7 ? B_P.cascoD : Math.floor((x - 264) / 5) % 2 ? B_P.toldo : B_P.toldoB)); }
    for (const x of [265, 318]) R.rect(x, 66, x + 1, 78, tn(B_P.cascoS));
    // el asta del gran farol de popa
    R.rect(266, 46, 267, 58, tn(B_P.doradoS));
  }, true);
  b_fondo(R, F.b, off);
  b_agua(R, t, F.m, hor, 114, hora, { sol: noche ? 52 : hora === 'atardecer' ? 52 : 56, off, mar: 0.25 });
  b_astro(R, F.m, hora === 'dia' ? 56 : 52, hora === 'atardecer' ? 52 : 36, hora, off);
  b_nubes(R, t, F.m, hor, hora, 1, off);
  // otras velas de la flota en el horizonte (una galera y una fusta)
  b_galera(R, ((t * 2.2 + 180) % 420) - 60, hor + 6 + off, 0.3, t, { dir: 1, tn, k: 3, remos: true, farol: noche });
  b_galera(R, 150 - ((t * 1.4) % 300), hor + 4 + off, 0.2, t, { dir: -1, tn, k: 5, vela: 'abierta' });
  b_gaviotas(R, t, noche ? 0 : 5, 26 + off, 66 + off, tn);
  // los remos de babor: la palada entra en el agua, sale y salpica
  const ritmo = t * 2.4;
  for (let i = 0; i < XS.length; i++) { const x = XS[i], ph = Math.sin(ritmo - i * 0.05), dip = Math.cos(ritmo - i * 0.05), bx = Math.round(x - 14 + ph * 7), by = dip > 0 ? 88 + off : 83 + off;
    R.linea(x, 96, bx, by, tn(B_P.cuerdaL)); R.linea(x + 1, 96, bx + 1, by, tn(B_P.cuerdaS)); R.rect(bx - 1, by - 1, bx + 1, by + 2, tn(B_P.cuerda)); R.pset(bx - 1, by - 1, tn(B_P.cuerdaL));
    if (dip > 0 && dip < 0.5) { R.pset(bx - 2, by - 2, tn(B_P.velaL)); R.pset(bx + 2, by - 2, tn(B_P.velaL)); R.pset(bx, by - 3, tn(hex('#ffffff'))); } else if (dip > 0) { R.pset(bx - 3, by + 2, tn(B_P.velaS)); R.pset(bx + 3, by + 2, tn(B_P.velaS)); } }
  b_encima(R, M);
  // los remeros en sus bancos: tiran del remo todos a una (turbantes, gorros y fajas de colores)
  for (let i = 0; i < XS.length; i++) { const x = XS[i], ph = Math.sin(ritmo - i * 0.05), lean = Math.round(ph * 3), hx = x + 7 + lean, hy = 105, col = [B_P.camisa, B_P.chaleco, B_P.faja, B_P.camisa][i % 4], cS = b_mezcla(col, C.k, 0.3), cL = b_mezcla(col, hex('#ffffff'), 0.25);
    const mx = x + 12 + Math.round(ph * 4), my = 113;   // las manos en el guion del remo
    R.linea(x + 1, 97, mx + 2, my + 1, tn(B_P.cuerdaS)); R.linea(x + 1, 96, mx + 2, my, tn(B_P.cuerdaL));
    for (let y = 0; y < 9; y++) { const sx = Math.round(lean * (1 - y / 9)); for (let xx = -2; xx <= 3; xx++) R.pset(hx + xx + sx, hy + 5 + y, tn(y === 6 ? B_P.faja : xx === -2 ? cL : xx === 3 ? cS : col)); }
    R.rect(hx - 3, hy + 14, hx + 5, hy + 16, tn(i % 2 ? hex('#3a3a5a') : hex('#5a4a3a')));
    R.linea(hx + 2, hy + 7, mx, my, tn(cS)); R.linea(hx + 1, hy + 6, mx, my - 1, tn(col)); R.rect(mx, my - 1, mx + 1, my, tn(B_P.piel));
    R.rect(hx - 1, hy, hx + 2, hy + 4, tn(B_P.piel)); R.pset(hx + 2, hy + 3, tn(B_P.pielS)); R.pset(hx - 1, hy + 4, tn(B_P.pielS)); R.pset(hx + 2, hy + 1, tn(C.k));
    if (i % 3 === 1) { R.rect(hx - 2, hy - 2, hx + 3, hy, tn(B_P.turbante)); R.pset(hx + 3, hy - 1, tn(B_P.camisa)); R.rect(hx - 1, hy - 3, hx + 2, hy - 3, tn(B_P.turbante)); R.pset(hx - 2, hy, tn(B_P.camisa)); } else if (i % 3 === 0) { R.rect(hx - 1, hy - 2, hx + 2, hy - 1, tn(B_P.faja)); R.pset(hx, hy - 3, tn(B_P.faja)); R.pset(hx + 2, hy - 2, tn(B_P.banderaS)); } else { R.rect(hx - 1, hy - 1, hx + 2, hy - 1, tn(C.k)); R.pset(hx - 1, hy, tn(C.k)); R.pset(hx - 1, hy + 1, tn(C.k)); } }
  // la vela latina hinchada (o recogida sobre la entena), con sus costuras y el temblor de la baluma
  const abierta = (o.vela ?? 'abierta') === 'abierta', fl = Math.sin(t * 2.3), A = [110, 64], Bp = [262, 10], Cc = [238, 98];
  if (abierta) { R.poligono([A, Bp, [Cc[0] + Math.round(fl), Cc[1]], [176 + Math.round(fl * 1.5), 92]], (x, y) => { const s = ((x - 110) * 54 + (y - 64) * 152) / 161; const lado = (x - A[0]) * (Cc[1] - A[1]) - (y - A[1]) * (Cc[0] - A[0]); const q = (x - 150) / 110; const seam = Math.round((x + y * 0.36 + fl * 0.6)) % 15 === 0;
      return tn(seam ? B_P.costura : q > 0.72 ? B_P.velaS : (q < 0.15 && y > 64) ? B_P.velaL : lado > -900 && y > 80 ? B_P.velaS : h(x >> 2, y >> 2, 760) > 0.93 ? B_P.velaS : B_P.vela); });
    for (let x = A[0]; x <= Cc[0]; x++) { const u = (x - A[0]) / (Cc[0] - A[0]), y = Math.round(A[1] + (Cc[1] - A[1]) * u + Math.sin(u * Math.PI) * 6 + Math.sin(t * 4 + x * 0.3) * 0.6 * u); R.pset(x, y, tn(B_P.velaD)); R.pset(x, y - 1, tn(B_P.velaS)); }
    for (let y = Bp[1]; y <= Cc[1]; y++) { const u = (y - Bp[1]) / (Cc[1] - Bp[1]), x = Math.round(Bp[0] + (Cc[0] - Bp[0]) * u + Math.sin(t * 6 + y * 0.4) * u * 1.2); R.pset(x, y, tn(B_P.velaD)); } }
  for (let x = A[0] - 4; x <= Bp[0] + 2; x++) { const y = Math.round(A[1] + (Bp[1] - A[1]) * (x - A[0]) / (Bp[0] - A[0])); R.pset(x, y, tn(B_P.cascoD)); R.pset(x, y + 1, tn(B_P.casco)); if (!abierta) { R.pset(x, y + 2, tn(h(x >> 1, 1, 761) > 0.5 ? B_P.vela : B_P.velaS)); R.pset(x, y + 3, tn(B_P.velaS)); } }
  if (abierta) { R.linea(Cc[0] + Math.round(fl), Cc[1], 250, 128, tn(B_P.cuerdaS)); }
  b_encima(R, Fr);
  // la sombra de la vela sobre la crujía (tramada, tiembla con la vela)
  if (abierta && !noche) { const sh = Math.round(fl * 2); for (let y = 130; y < 168; y++) { const u = (y - 130) / 38, xa = Math.round(70 + u * 40 + sh), xb = Math.round(150 + u * 70 + sh); for (let x = Math.max(0, xa); x < Math.min(262, xb); x++) { const e = Math.min(x - xa, xb - x); if (b_umbral(x, y) < Math.min(1, e / 6) * 0.5) R.pset(x, y, b_mezcla(R.pget(x, y), B_P.cascoD, 0.22)); } } }
  // la jarcia del palo, el gallardete rojo del tope y la bandera grande de popa
  R.linea(200, 22, 120, 97, tn(B_P.jarcia)); R.linea(200, 22, 160, 97, tn(B_P.jarcia));
  b_bandera(R, 196, 14, 22, 3, t, -1, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL), true);
  b_bandera(R, 318, 46, 26, 10, t + 1, -1, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL)); R.rect(318, 40, 319, 78, tn(B_P.cascoS));
  // el gran farol de popa (encendido de noche)
  const fx = 266 + Math.round(Math.sin(t * 1.3) * 0.6);
  b_farolOtomano(R, fx, 46, t, noche || hora === 'atardecer', tn);
  return { suelo: 150, horizonte: hor, palo: 200, popa: { x: 262, y: 92, puerta: [280, 130, 299, 165], escala: [243, 94, 258, 150] }, farol: [fx, 52], libre: [30, 250], remeros: [0, 100, 262, 124], cubierta: [128, 179], cañon: [0, 122, 31, 138], escotilla: [120, 162, 167, 175] };
}

// el gran farol dorado de popa de una galera otomana (x el asta; y su tope): jaula de latón con cristales y la llama
function b_farolOtomano(R, x, y, t, luz, tn) {
  const fl = luz ? 0.75 + 0.25 * Math.sin(t * 11) * Math.sin(t * 7.3) : 0;
  if (luz) for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 14 && b_umbral(x + i, y + 8 + j) < (1 - d / 14) * 0.7 * fl) R.pset(x + i, y + 8 + j, b_mezcla(R.pget(x + i, y + 8 + j), B_P.luz, 0.5)); }
  R.rect(x - 1, y - 3, x + 1, y - 1, tn(B_P.dorado)); R.pset(x, y - 4, tn(B_P.doradoL));
  for (let j = 0; j < 14; j++) { const w = j < 3 ? 2 + j : j > 10 ? 15 - j : 5; for (let i = -w; i <= w; i++) { const borde = Math.abs(i) === w || j === 0 || j === 3 || j === 10 || j === 13 || i === 0; R.pset(x + i, y + j, borde ? tn(i < 0 ? B_P.doradoL : B_P.dorado) : luz ? (Math.abs(i) < 2 && j > 4 && j < 9 ? B_P.luzL : B_P.luz) : tn(i < 0 ? hex('#9ab4c0') : hex('#5a7480'))); } }
  R.pset(x, y + 14, tn(B_P.doradoS)); R.pset(x, y + 15, tn(B_P.dorado));
}

// GALERA · BODEGA: la bodega oscura de la galera, con la lámpara que se mece ----------------------------------------
function b_bodega(R, t, o) {
  const F = b_capa(R, 'bodega', () => {
    // el forro del casco por dentro: tablas que se curvan, y las cuadernas
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const v = y + ((x - 160) / 160) ** 2 * 46, r = Math.floor(v) % 6, f = Math.floor(v / 6); let c = r === 0 ? B_P.cascoD : r === 1 ? B_P.cascoL : h(x >> 3, f, 770) > 0.7 ? B_P.cascoS : B_P.casco; if ((x + f * 23) % 57 === 0) c = B_P.cascoD;
      const os = Math.min(1, Math.abs(x - 160) / 170 * 0.7 + (y < 40 ? (40 - y) / 60 : 0)); R.pset(x, y, b_mezcla(c, B_P.fondoB, 0.35 + os * 0.45)); }
    for (const X of [-6, 46, 98, 222, 274, 326]) for (let y = 34; y < 150; y++) { const xc = Math.round(160 + (X - 160) * (0.78 + 0.22 * (y - 34) / 116)); for (let i = -3; i <= 3; i++) R.pset(xc + i, y, b_mezcla(i === -3 ? B_P.cascoL : i >= 2 ? B_P.cascoD : B_P.casco, B_P.fondoB, 0.4)); }
    // los baos, la escotilla con su enjaretado (por donde entra la luz) y las curvas
    R.rect(0, 0, 319, 6, B_P.cascoD); for (let x = 0; x < 320; x++) R.pset(x, 6, B_P.cascoS);
    for (let y = 26; y < 34; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 26 ? B_P.cascoL : y > 31 ? B_P.cascoD : h(x >> 2, y, 771) > 0.8 ? B_P.cascoS : B_P.casco);
    // la escotilla, a la derecha (fuera de la barra del año y de la esquina de Atom): el enjaretado con la luz del día
    for (let y = 0; y < 22; y++) for (let x = 186; x < 262; x++) { const gx = (x - 186) % 9, gy = y % 7; R.pset(x, y, gx < 2 || gy < 2 ? (gx === 0 || gy === 0 ? B_P.cascoS : B_P.casco) : y < 12 ? B_P.luzL : B_P.luz); }
    R.rect(182, 0, 185, 25, B_P.cascoS); R.rect(262, 0, 265, 25, B_P.cascoS); R.rect(182, 22, 265, 25, B_P.casco); R.rect(182, 22, 265, 22, B_P.cascoL);
    // el resto del techo, la tablazón de la cubierta vista por debajo, en penumbra (tranquila)
    for (let x = 0; x < 320; x++) if (x < 182 || x > 265) for (let y = 7; y < 26; y++) if (x % 23 === 0 || y === 16) R.pset(x, y, b_mezcla(B_P.cascoD, B_P.fondoB, 0.3));
    for (const x of [20, 300]) for (let j = 0; j < 12; j++) R.rect(x - 6 + (x < 160 ? 0 : j), 34 + j, x + 6 - (x < 160 ? j : 0), 34 + j, j === 0 ? B_P.cascoL : B_P.cascoS);
    // el suelo de tablas
    b_tablas(R, 0, 146, 319, 179, [B_P.cascoL, B_P.casco, B_P.cascoS, B_P.cascoD], 3, 11, 0.16);
    for (let x = 0; x < 320; x++) { R.pset(x, 146, B_P.sombra); R.pset(x, 147, B_P.cascoD); }
    // a la izquierda, barriles tumbados en pirámide y uno de pie; un cofre con herrajes
    const tumbado = (cx, cy, r) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; R.pset(cx + i, cy + j, d > r - 1.2 ? B_P.cascoD : d > r - 2.6 ? B_P.hierro : d < 2 ? B_P.cascoS : (Math.atan2(j, i) * 7 / Math.PI | 0) % 2 ? B_P.cubierta : B_P.cubiertaS); } R.pset(cx - r + 3, cy - r + 4, B_P.hierroL); R.disco(cx + 2, cy - 1, 1, B_P.cascoD); };
    tumbado(22, 134, 11); tumbado(46, 134, 11); tumbado(34, 114, 11); tumbado(70, 136, 9);
    b_barril(R, 88, 116, 16, 28, (c) => c);
    for (let y = 134; y < 148; y++) for (let x = 96; x < 128; x++) R.pset(x, y, y === 134 ? B_P.cascoL : y < 137 ? B_P.cascoR : (x - 96) % 10 < 2 ? B_P.hierro : y > 145 ? B_P.cascoD : B_P.cascoRS); R.rect(110, 138, 113, 141, B_P.laton); R.pset(111, 139, B_P.latonL);
    // la escala que baja de la escotilla
    for (let y = 24; y < 148; y++) { const u = (y - 24) / 124, x = Math.round(214 - u * 20); R.pset(x, y, B_P.cubiertaS); R.pset(x + 1, y, B_P.cubiertaD); R.pset(x + 16, y, B_P.cubiertaS); R.pset(x + 17, y, B_P.cubiertaD); if ((y - 24) % 11 === 0) { R.rect(x + 2, y, x + 15, y + 1, B_P.cubierta); R.rect(x + 2, y, x + 15, y, B_P.cubiertaL); } }
    // a la derecha, sacos atados, remos de respeto apoyados, el ánfora en su soporte y una aduja
    R.linea(134, 58, 140, 146, B_P.cuerdaS); R.linea(135, 58, 141, 146, B_P.cuerda); R.linea(140, 60, 148, 146, B_P.cuerdaS); R.linea(141, 60, 149, 146, B_P.cuerdaL); R.rect(133, 54, 137, 60, B_P.cuerda); R.rect(139, 56, 143, 62, B_P.cuerdaS);
    const saco = (cx, cy, w, hh) => { for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + (j / hh) ** 2 + (h(i, j, 772) - 0.5) * 0.15; if (e > 1) continue; R.pset(cx + i, cy + j, e > 0.85 ? B_P.ocreS : i < -w * 0.3 && j < 0 ? hex('#d8b880') : (i + j * 2) % 7 === 0 ? B_P.ocreS : B_P.ocre); } R.rect(cx - 1, cy - hh - 2, cx + 1, cy - hh, B_P.cuerdaS); };
    saco(236, 138, 10, 9); saco(256, 140, 9, 8); saco(246, 124, 9, 8); saco(272, 141, 8, 7);
    for (let y = 92; y < 146; y++) { R.pset(286, y, B_P.cascoS); R.pset(312, y, B_P.cascoS); } R.rect(284, 104, 314, 105, B_P.casco); R.rect(284, 128, 314, 129, B_P.casco);
    for (const ax of [292, 305]) for (let j = 0; j < 30; j++) { const w = Math.round(j < 4 ? 1 : j < 20 ? 2 + Math.sin((j - 4) / 16 * Math.PI) * 3 : 4 - (j - 20) * 0.35); for (let i = -w; i <= w; i++) R.pset(ax + i, 98 + j, i === -w ? hex('#d88a5a') : i >= w - 1 ? hex('#7a3e22') : hex('#b06a40')); }
    b_aduja(R, 286, 162, 11);
    // agua de sentina entre las juntas del suelo
    for (let x = 160; x < 300; x++) if (h(x >> 3, 2, 773) > 0.55) R.pset(x, 170 + ((x >> 3) & 1), hex('#3a4a52'));
    return {};
  });
  R.copiar(F.b);
  // el haz de luz polvorienta de la escotilla, que se mueve con el balanceo
  const sh = Math.sin(t * 0.7) * 6;
  for (let y = 22; y < 160; y++) { const u = (y - 22) / 138, x0 = Math.round(188 - u * 30 + sh * u), x1 = Math.round(260 - u * 22 + sh * u), a = 0.22 * (1 - u * 0.6);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const e = Math.min(x - x0, x1 - x) / 8; if (b_umbral(x, y) < a * Math.min(1, e) * 2.2) R.pset(x, y, b_mezcla(R.pget(x, y), B_P.luzL, 0.28)); } }
  for (let k = 0; k < 26; k++) { const u = (h(k, 1, 774) + t * 0.02 * (1 + h(k, 2, 774))) % 1, y = 26 + u * 120, x = 192 - u * 28 + sh * u + h(k, 3, 774) * 62 + Math.sin(t * 0.8 + k) * 3; if ((t * 2 + k) % 3 > 0.6) R.pset(x, y, B_P.luzL); }
  // la red con cebollas que se mece colgada del bao
  const sw = Math.sin(t * 1.4) * 0.2;
  { const px = 60, py = 33, L = 18, ex = px + Math.sin(sw) * L, ey = py + Math.cos(sw) * L; R.linea(px, py, ex, ey, B_P.cuerdaS); for (let j = 0; j < 9; j++) for (let i = -4; i <= 4; i++) { if (i * i / 16 + (j - 4) ** 2 / 20 > 1) continue; R.pset(ex + i + Math.round(sw * j), ey + j, (i + j) % 2 ? B_P.cuerdaS : (i * 3 + j) % 5 === 0 ? hex('#c89a6a') : hex('#e0c08a')); } }
  // el goteo del bao y su salpicadura en el suelo
  { const u = (t % 2.3) / 2.3, y = 34 + u * u * 130; if (y < 164) R.pset(252, Math.round(y), hex('#8aa8b8')); else { R.pset(250, 165, hex('#8aa8b8')); R.pset(254, 165, hex('#8aa8b8')); } R.pset(252, 34, hex('#6a8898')); }
  // la rata que cruza al fondo de vez en cuando (y se para a husmear)
  { const c = (t + 3) % 11; if (c < 7) { const u = c / 7, x = Math.round(330 - u * 160 - (u > 0.5 ? 0 : 0)), para = u > 0.42 && u < 0.58, xx = para ? Math.round(330 - 0.42 * 160 * 1 - 0) : x, yy = 146;
      const X = para ? 263 : xx; R.rect(X, yy - 3, X + 5, yy - 1, B_P.rata); R.rect(X + 1, yy - 4, X + 4, yy - 4, B_P.rata); R.pset(X - 1, yy - 2, B_P.rata); R.pset(X - 2, yy - 2, B_P.rataS); R.pset(X - 1, yy - 3, hex('#e8a0a0')); R.pset(X, yy - 3, C.k); R.pset(X + 1, yy - 5, hex('#c88080'));
      for (let i = 0; i < 6; i++) R.pset(X + 6 + i, yy - 2 + Math.round(Math.sin(t * 8 + i) * (i / 6)), B_P.rataS); if (!para && Math.floor(t * 10) % 2) { R.pset(X + 1, yy, B_P.rataS); R.pset(X + 4, yy, B_P.rataS); } else { R.pset(X + 2, yy, B_P.rataS); R.pset(X + 3, yy, B_P.rataS); } } }
  // la lámpara de aceite que se mece y su luz que tiembla
  const a = Math.sin(t * 1.4 + 0.3) * 0.22, Lx = 176 + Math.sin(a) * 24, Ly = 33 + Math.cos(a) * 24, fl = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 5.7);
  for (let j = -60; j <= 60; j++) for (let i = -64; i <= 64; i++) { const d = Math.hypot(i, j * 1.1) / 64; if (d >= 1) continue; const x = Math.round(Lx + i), y = Math.round(Ly + 6 + j); if (x < 0 || x > 319 || y < 0 || y > 179) continue; const al = (1 - d) ** 1.6 * 0.5 * fl; if (al > 0.04) R.pset(x, y, b_mezcla(R.pget(x, y), B_P.luzS, al)); }
  for (let i = 0; i <= 24; i += 2) R.pset(176 + Math.sin(a) * i, 33 + Math.cos(a) * i, B_P.hierroL);
  { const x = Math.round(Lx), y = Math.round(Ly); R.rect(x - 4, y, x + 4, y + 1, B_P.laton); R.rect(x - 3, y + 2, x + 3, y + 9, B_P.luz); R.rect(x - 1, y + 4, x + 1, y + 8, B_P.luzL); R.pset(x, y + 3 + Math.round(Math.sin(t * 17)), hex('#ffffff')); for (const i of [-4, 0, 4]) R.rect(x + i, y + 2, x + i, y + 9, B_P.latonL); R.rect(x - 4, y + 10, x + 4, y + 11, B_P.laton); R.pset(x, y + 12, B_P.latonL); }
  return { suelo: 156, barril: { x: 160, y: 141, ancho: 22 }, lampara: [Math.round(Lx), Math.round(Ly) + 6], escala: [194, 24, 231, 148], cofre: [96, 134, 127, 147], escotilla: [186, 0, 261, 21], libre: [100, 280] };
}

// COSTA · frente a la costa de España, 1501: la galera da caza a las naos ---------------------------------------------
function b_costaEspana(R, t, o) {
  const hora = o.hora ?? 'dia', tn = b_tinte(hora), hor = 86;
  const yMonte = (x) => Math.round(hor - 8 - 26 * Math.exp(-(((x - 76) / 46) ** 2)) - 16 * Math.exp(-(((x - 170) / 30) ** 2)) - 3 * Math.sin(x * 0.19) - h(x >> 2, 0, 780) * 2 + (x > 200 ? (x - 200) * 0.5 : 0));
  const F = b_capa(R, 'costa|' + hora, (b) => {
    b_degradado(R, 0, hor, B_CIELOS[hora]); const foto = b.slice();
    b.fill(B_AGUA, hor * 320);
    // la sierra lejana con sus barrancos
    for (let x = 0; x < 250; x++) { const yt = yMonte(x); for (let y = yt; y < hor; y++) { const u = (y - yt) / Math.max(1, hor - yt), rid = Math.sin(x * 0.31 + y * 0.12) + h(x >> 1, y >> 2, 781) * 0.8; R.pset(x, y, tn(y === yt ? B_P.monteL : rid > 1.3 ? B_P.monteS : u < 0.2 && rid > 0.4 ? B_P.monteL : B_P.monte)); } }
    // las lomas de la costa (matorral y tierra ocre), el cabo con la torre vigía y el pueblo blanco
    const yL = (x) => Math.round(hor - 2 - 14 * Math.exp(-(((x - 30) / 34) ** 2)) - 5 * Math.exp(-(((x - 120) / 30) ** 2)) - h(x >> 2, 3, 782) * 1.5);
    for (let x = 0; x < 168; x++) { const yt = yL(x); for (let y = yt; y < hor; y++) { const v = h(x >> 1, y, 783); R.pset(x, y, tn(y === yt ? B_P.matorral : v > 0.72 ? B_P.matorralS : v < 0.2 ? B_P.ocre : (y - yt) > 6 ? B_P.ocreS : B_P.matorral)); } }
    for (let x = 0; x < 168; x++) { R.pset(x, hor - 1, tn(B_P.arena)); if (h(x, 4, 784) > 0.5) R.pset(x, hor - 2, tn(B_P.arenaS)); }
    // la torre vigía, redonda, de piedra, con su almenado
    const tx = 30, ty = yL(30);
    for (let y = ty - 20; y < ty + 1; y++) for (let x = tx - 4; x <= tx + 4; x++) R.pset(x, y, tn(x === tx - 4 ? B_P.piedraL : x >= tx + 3 ? B_P.piedraS : (y + (x >> 1)) % 4 === 0 ? B_P.piedraS : B_P.piedra));
    for (let x = tx - 5; x <= tx + 5; x++) R.pset(x, ty - 21, tn(B_P.piedraL)); for (const x of [tx - 5, tx - 2, tx + 1, tx + 4]) { R.pset(x, ty - 22, tn(B_P.piedraL)); R.pset(x + 1, ty - 22, tn(B_P.piedra)); }
    R.pset(tx, ty - 12, tn(B_P.sombra)); R.pset(tx, ty - 11, tn(B_P.sombra));
    for (let i = 0; i < 12; i++) { const x = 104 + i * 5 + (i % 2) * 2, y = yL(x) + 1 + (i % 3); R.rect(x, y, x + 3, y + 2, tn(i % 4 === 1 ? B_P.calS : B_P.cal)); R.rect(x, y - 1, x + 3, y - 1, tn(B_P.teja)); R.pset(x + 1, y + 1, tn(B_P.sombra)); }
    { const x = 128, y = yL(128); R.rect(x, y - 8, x + 3, y + 1, tn(B_P.cal)); R.rect(x + 3, y - 8, x + 3, y + 1, tn(B_P.calS)); R.rect(x - 1, y - 10, x + 4, y - 9, tn(B_P.teja)); R.pset(x + 1, y - 6, tn(B_P.sombra)); }
    return { m: b_mascara(b, foto, hor), torre: [tx, ty - 22] };
  });
  // la proa de nuestra galera en primer plano, a la izquierda: cubierta, borda, casco con la banda roja y el espolón
  const Fr = b_capa(R, 'costaF|' + hora, () => {
    const tc = [tn(B_P.cubiertaL), tn(B_P.cubierta), tn(B_P.cubiertaS), tn(B_P.junta)];
    // la cubierta (vista un poco desde arriba) que se estrecha hacia la proa
    const dEnd = (y) => Math.round(166 - (y - 132) * 1.1);
    for (let y = 132; y <= 150; y++) { const x1 = Math.min(150 + (y - 132) * 0, dEnd(y) - 6); b_tablas(R, 0, y, x1, y, tc, 1, 3 + (y % 3)); }
    for (let y = 132; y <= 150; y += 3) R.linea(0, y, 140 - (150 - y), y, tn(B_P.cubiertaS));
    for (let y = 132; y <= 150; y++) for (let x = 0; x < 150; x += 31) R.pset(x + ((y * 3) >> 2) % 3, y, tn(B_P.junta));
    // la regala de la banda de babor (detrás de los personajes)
    for (let x = 0; x < 152; x++) { const y = 128 + Math.round(x * 0.04); R.rect(x, y, x, y + 3, tn(x % 18 < 2 ? B_P.cascoD : B_P.casco)); R.pset(x, y - 1, tn(B_P.cubiertaL)); R.pset(x, y, tn(B_P.cascoL)); }
    // el costado de estribor, de cerca: tracas, cinta dorada, banda roja, las portas de los remos y la flotación
    for (let y = 151; y < 176; y++) { const xe = Math.round(150 + (y - 151) * 1.4); for (let x = 0; x <= Math.min(xe, 319); x++) { const r = (y - 151) % 4; let c = y < 153 ? B_P.dorado : y < 158 ? (r === 0 ? B_P.cascoRS : B_P.cascoR) : r === 0 ? B_P.cascoS : y > 171 ? B_P.cascoD : B_P.casco; if (y === 153) c = B_P.doradoS; if (y >= 158 && h(x >> 3, (y - 151) >> 2, 785) > 0.85 && r !== 0) c = B_P.cascoL; R.pset(x, y, tn(c)); } }
    for (let x = 0; x < 150; x++) { R.pset(x, 151, tn(B_P.doradoL)); if (x % 6 === 0) R.pset(x, 152, tn(B_P.doradoS)); }
    for (let i = 0; i < 10; i++) { const x = 8 + i * 14; R.rect(x, 160, x + 4, 163, tn(B_P.sombra)); R.rect(x, 160, x + 4, 160, tn(B_P.cascoD)); }
    // el espolón dorado
    R.poligono([[150, 150], [222, 166], [222, 168], [190, 174], [150, 176]], (x, y) => tn(y < 160 + (x - 150) * 0.1 ? B_P.cascoL : y > 170 ? B_P.cascoD : B_P.casco));
    R.linea(150, 151, 222, 166, tn(B_P.doradoL)); R.linea(150, 152, 222, 167, tn(B_P.dorado)); R.rect(216, 163, 224, 168, tn(B_P.dorado)); R.pset(225, 166, tn(B_P.doradoL)); R.rect(216, 168, 224, 168, tn(B_P.doradoS));
    // la roda que se alza en la proa con su remate
    for (let y = 118; y < 152; y++) { const x = 150 + Math.round((152 - y) * 0.18); R.rect(x, y, x + 3, y, tn(y < 122 ? B_P.dorado : x % 2 ? B_P.cascoS : B_P.casco)); R.pset(x, y, tn(B_P.cascoL)); } R.disco(157, 116, 2, tn(B_P.dorado)); R.pset(156, 115, tn(B_P.doradoL));
    // el cañón de crujía en la proa, apuntando a las naos
    for (let x = 102; x < 146; x++) { const r = 3.4 - (x - 102) / 22; for (let y = -Math.round(r); y <= Math.round(r); y++) R.pset(x, 138 + y, tn(y < 0 ? B_P.latonL : y > 1 ? B_P.doradoS : B_P.laton)); } for (const x of [108, 124, 140]) R.rect(x, 135, x + 1, 141, tn(B_P.doradoS)); R.rect(144, 136, 147, 140, tn(B_P.doradoS));
    R.rect(98, 140, 122, 146, tn(B_P.cascoS)); R.rect(98, 140, 122, 140, tn(B_P.cascoL)); R.disco(104, 147, 3, tn(B_P.cascoD)); R.disco(118, 147, 3, tn(B_P.cascoD)); R.pset(104, 147, tn(B_P.hierroL)); R.pset(118, 147, tn(B_P.hierroL));
    // la aduja y unas balas de piedra
    b_aduja(R, 18, 144, 8, tn); for (const [x, y] of [[80, 146], [86, 146], [83, 143]]) { R.disco(x, y, 2.4, tn(B_P.piedraS)); R.pset(x - 1, y - 1, tn(B_P.piedraL)); }
    // el trinquete con la entena y la vela recogida
    for (let y = 30; y < 134; y++) for (let x = 46; x <= 50; x++) R.pset(x, y, tn(x === 46 ? B_P.cascoL : x === 50 ? B_P.cascoD : B_P.casco));
    for (let x = 0; x < 120; x++) { const y = Math.round(78 - x * 0.46); R.pset(x, y, tn(B_P.cascoD)); R.pset(x, y + 1, tn(B_P.casco)); for (let j = 2; j < 5 + Math.round(Math.sin(x * 0.4) * 1.5); j++) R.pset(x, y + j, tn(j === 2 ? B_P.velaL : (x + j) % 7 === 0 ? B_P.velaD : j > 3 ? B_P.velaS : B_P.vela)); }
    R.linea(48, 34, 0, 126, tn(B_P.jarcia)); R.linea(48, 34, 104, 132, tn(B_P.jarcia));
  }, true);
  b_fondo(R, F.b);
  const solX = hora === 'atardecer' ? 236 : 236;
  b_agua(R, t, F.m, hor, 179, hora, { sol: solX, mar: 0.35 });
  b_astro(R, F.m, solX, hora === 'atardecer' ? 66 : 34, hora);
  b_nubes(R, t, F.m, hor, hora, 1.2);
  // el humo de alarma que sale de la torre vigía
  { const [tx, ty] = F.torre; for (let k = 0; k < 8; k++) { const u = ((t * 0.18 + k / 8) % 1), x = tx - u * 26 + Math.sin(t + k) * 1.5, y = ty - 2 - u * 30, r = 1 + u * 3; R.disco(x, y, r, tn(u > 0.6 ? B_P.humoS : B_P.humo)); if (u < 0.5) R.disco(x - 1, y - 1, r * 0.5, tn(hex('#ffffff'))); } R.pset(tx, ty - 1, B_P.fogon); }
  b_gaviotas(R, t, 6, 24, 70, tn, 2);
  // las naos españolas que huyen hacia la derecha (cruces genéricas), de lejos a cerca, con sus cañonazos
  const av = Math.min(t, 30) * 0.6;
  b_nao(R, 168 + av * 0.5, 96, 0.42, t, { dir: 1, k: 1, tn });
  b_nao(R, 286 + av * 0.6, 106, 0.72, t, { dir: 1, k: 2, tn, disparo: 4.2 * Math.floor(t / 4.2) + 2.1 });
  const n1 = b_nao(R, 232 + av, 124, 1.05, t, { dir: 1, k: 0, tn, disparo: 5.1 * Math.floor(t / 5.1) + 0.8 });
  b_encima(R, Fr);
  // los remos de estribor que bogan, entran en el agua y salpican; la ola de proa
  const ritmo = t * 2.4;
  for (let i = 0; i < 10; i++) { const x0 = 10 + i * 14, ph = Math.sin(ritmo - i * 0.08), dip = Math.cos(ritmo - i * 0.08), bx = Math.round(x0 - 10 + ph * 8), by = dip > 0 ? 184 : 177;
    R.linea(x0 + 2, 162, bx, by, tn(B_P.cuerdaL)); R.linea(x0 + 3, 162, bx + 1, by, tn(B_P.cuerdaS)); R.linea(x0 + 4, 162, bx + 2, by, tn(B_P.cuerdaS));
    if (dip > 0 && dip < 0.6) for (let s = 0; s < 4; s++) R.pset(bx - 3 + s * 2, 176 - (s % 2) - Math.round((0.6 - dip) * 4), tn(hex('#f4f8fa'))); }
  for (let x = 150; x < 240; x++) { const y = Math.round(176 - (x - 150) * 0.12 + Math.sin(t * 5 + x * 0.4) * 0.8); if (x > 168 && x < 236) { R.pset(x, Math.max(y, 168 + Math.round((236 - x) * 0.1)), tn(hex('#f4f8fa'))); if (h(x, Math.floor(t * 6), 786) > 0.6) R.pset(x, y + 1, tn(B_P.velaS)); } }
  // la bandera de proa y el cañonazo de nuestra galera
  R.rect(157, 100, 157, 118, tn(B_P.cascoS)); b_bandera(R, 157, 100, 16, 6, t, -1, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL));
  b_bandera(R, 48, 26, 18, 2, t + 2, -1, tn(B_P.bandera), tn(B_P.banderaS), tn(B_P.banderaL), true);
  b_humo(R, 150, 137, 5.6 * Math.floor((t + 3) / 5.6) - 3 + 2.4, t, tn, -4);
  return { suelo: 148, horizonte: hor, libre: [6, 96], cañon: { boca: [148, 138], base: [98, 146] }, proa: [150, 118], naos: [[Math.round(n1.x), Math.round(n1.y)]], torre: F.torre, cubierta: [132, 150] };
}

// COSTA · TORMENTA: el temporal de noche de 1511, la galera lucha contra el viento --------------------------------------
function b_tormenta(R, t, o) {
  const hor = 98, tn = b_tinte('tormenta');
  const F = b_capa(R, 'tormenta', () => { b_degradado(R, 0, 180, [[0, '#0a0d16'], [0.18, '#10151f'], [0.34, '#171e2a'], [0.48, '#1f2734'], [0.56, '#283140'], [0.7, '#1a2230']]);
    // a lo lejos, sobre el horizonte, una claridad de luna tramada entre dos bancos de nubes
    for (let y = 74; y < 96; y++) for (let x = 0; x < 320; x++) { const a = Math.exp(-(((x - 214) / 70) ** 2)) * Math.sin((y - 74) / 22 * Math.PI) * 0.55; if (b_umbral(x, y) < a) R.pset(x, y, hex('#3a4660')); } });
  R.copiar(F.b);
  const cada = o.rayo ?? 4.3, kr = Math.floor(t / cada), ur = t - kr * cada - 0.5, luz = ur >= 0 && ur < 0.36 ? (ur < 0.07 || (ur > 0.15 && ur < 0.21) ? 1 : 0.45) : 0, xr = 40 + h(kr, 1, 790) * 200;
  // las cortinas de lluvia que cuelgan de los nubarrones lejanos (trazos verticales que se mueven con el viento)
  for (let k = 0; k < 7; k++) { const cx = ((h(k, 1, 780) * 420 - t * 5) % 420 + 420) % 420 - 50, w = 14 + h(k, 2, 780) * 22;
    for (let x = Math.max(0, Math.round(cx - w)); x <= Math.min(319, Math.round(cx + w)); x++) if (((x + Math.floor(t * 9)) % 3) === 0) for (let y = 66 + Math.round(h(x >> 2, k, 781) * 6); y < hor + 4; y += 2) if (b_umbral(x, y) < 0.55 * (1 - Math.abs(x - cx) / w)) R.pset(x - Math.round((y - 66) * 0.25), y, hex('#2a3242')); }
  // los nubarrones: tres capas (lejos, pequeños y lentos; cerca, enormes y rápidos), cada uno en tres tonos (la base en
  // sombra, el cuerpo y los bordes de arriba, que se encienden con el relámpago cuanto más cerca de él); la esquina de
  // Atom queda en el tono de sombra, tranquila
  const capa = (n, y0, y1, w0, vel, sem, cs) => { for (let k = 0; k < n; k++) { const W = 460 + w0 * 2, cx = ((h(k, 1, sem) * W - t * vel) % W + W) % W - w0, cy = y0 + h(k, 2, sem) * (y1 - y0), w = w0 * (0.75 + h(k, 3, sem) * 0.5);
      const lit = luz > 0 ? Math.max(0, 1 - Math.abs(cx - xr) / 150) * luz : 0, atom = (x, y) => x > 274 && y < 46;
      const tono = (i) => (x, y) => (atom(x, y) ? cs[0] : i === 2 && lit > 0.25 && b_umbral(x, y) < lit ? hex('#9aa4cc') : cs[i]);
      const L = [[0, 0, 0.3], [-0.3, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.1, -0.16, 0.24], [0.16, -0.12, 0.2], [0.47, 0.12, 0.14], [-0.47, 0.13, 0.13], [0.05, 0.14, 0.26]];
      for (const [dx, dy, f] of L) R.disco(cx + dx * w, cy + dy * w + 2.5, f * w, tono(0));
      for (const [dx, dy, f] of L) R.disco(cx + dx * w, cy + dy * w, f * w * 0.92, tono(1));
      for (const [dx, dy, f] of L) if (dy < 0.08) R.disco(cx + dx * w - f * w * 0.3, cy + dy * w - f * w * 0.42, f * w * 0.5, tono(2));
      for (const [dx, dy, f] of L) if (dy >= 0.1) R.disco(cx + dx * w + 1, cy + dy * w + f * w * 0.5, f * w * 0.55, tono(0)); } };
  capa(9, 70, 86, 26, 4, 791, [hex('#161b26'), hex('#222a3a'), hex('#38425a')]);
  capa(6, 38, 62, 46, 10, 792, [hex('#121620'), hex('#1e2534'), hex('#333d54')]);
  capa(5, 20, 44, 62, 21, 793, [hex('#0e121a'), hex('#1a2030'), hex('#2e3850')]);
  // el rayo
  if (luz > 0) { let x = xr, y = 18; while (y < hor - 4) { const nx = x + (h(kr, y, 794) - 0.5) * 12, ny = y + 3 + h(kr, y, 795) * 5; R.linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), hex('#f4f0ff')); R.pset(Math.round(nx) + 1, Math.round(ny), hex('#a8b4f0')); if (h(kr, y, 796) < 0.2) { let bx = nx, by = ny; for (let i = 0; i < 4; i++) { const ax = bx + (h(kr, y + i, 797) - 0.3) * 8, ay = by + 3; R.linea(Math.round(bx), Math.round(by), Math.round(ax), Math.round(ay), hex('#a8b4f0')); bx = ax; by = ay; } } x = nx; y = ny; } }
  // el mar lejano: la superficie se hincha en olas enormes (por columnas): la cara que mira a la luz más clara, los senos
  // oscuros, la espuma de las crestas que se deshace en regueros cortos y el rocío que arranca el viento
  const P = B_MARES.tormenta, yS = (x) => hor + 13 * Math.sin(x * 0.021 - t * 0.8) + 6 * Math.sin(x * 0.049 + t * 1.2 + 1) + 2.5 * Math.sin(x * 0.11 - t * 2);
  const yN = (x) => 156 + 12 * Math.sin(x * 0.015 - t * 1.05 + 2) + 5 * Math.sin(x * 0.041 + t * 1.5) + 2 * Math.sin(x * 0.1 - t * 2.3);
  const B = R.buf, ilum = luz * 0.35, des = Math.floor(t * 18);
  const ola = (x, ys, sl, y0, y1, cerca) => { for (let y = Math.max(0, y0); y < y1; y++) { const d = y - ys, cresta = sl < -0.12;
      let c = d < 1.5 ? (cresta ? P[6] : P[4]) : d < 5 ? (cresta ? (b_umbral(x, y) < 0.5 ? P[6] : P[4]) : sl > 0.25 ? P[2] : P[1]) : d < (cerca ? 12 : 18) ? (sl < 0 ? P[1] : b_umbral(x, y) < 0.5 ? P[1] : P[2]) : d < (cerca ? 26 : 40) ? P[2] : P[3];
      // los regueros de espuma que arrastra el viento (trazos largos y desiguales, no puntos) y los senos más oscuros
      const r = h((x + des + (y * 7 & 15)) >> 3, y, cerca ? 788 : 787), r2 = h((x + des) >> 1, y >> 2, cerca ? 786 : 785); if (d > 3 && r > 0.972 && r2 > 0.3) c = sl < 0 ? P[6] : P[4]; else if (d > 8 && r < 0.02) c = P[5];
      if (ilum > 0) c = b_mezcla(c, hex('#c8d0f0'), ilum * (d < 6 ? 1 : 0.5)); B[y * 320 + x] = c; } };
  for (let x = 0; x < 320; x++) { const ys = yS(x), sl = yS(x + 1) - ys; ola(x, ys, sl, Math.round(ys), 180, false);
    if (sl < -0.35 && h(x, Math.floor(t * 8), 798) > 0.45) { const y0 = Math.round(ys); R.pset(x - 2, y0 - 1, P[6]); R.pset(x - 4, y0 - 2, P[4]); if (h(x, 1, Math.floor(t * 8)) > 0.6) R.pset(x - 7, y0 - 4, P[4]); } }
  // la galera capea el temporal: sube y baja con la ola, escora, el farol de popa encendido, la vela recogida
  const sx = 160 + Math.sin(t * 0.3) * 6, ws = yS(sx), giro = Math.max(-0.16, Math.min(0.16, Math.atan2(yS(sx + 34) - yS(sx - 34), 68)));
  // el barco, algo más claro que el mar para que se lea; el relámpago lo enciende de golpe
  const tnB = (c) => b_mezcla(b_mezcla(c, hex('#5a6884'), 0.3), hex('#d8e0ff'), luz * 0.42), S = 1.6;
  const g = b_galera(R, sx, ws + 7, S, t, { dir: 1, k: 1, tn: tnB, giro, vela: 'recogida', arriada: true, remos: false, farol: true }), Q = g.P;
  const lQ = (a, b, c2, d, col) => { const p = Q(a, b), q = Q(c2, d); R.linea(Math.round(p[0]), Math.round(p[1]), Math.round(q[0]), Math.round(q[1]), col); };
  // los estays y las burdas, tensos, que vibran con el viento (dos trazos que tiemblan)
  const vib = Math.sin(t * 31) * 0.35;
  for (const [a, b, c2, d] of [[36, -32, 70, -4], [6, -42, -57, -14], [6, -42, 66, -6], [36, -32, -10, -9], [6, -40, 22, -9]]) { lQ(a, b, c2, d, tnB(B_P.jarcia)); lQ(a + vib, b + 0.5, (a + c2) / 2 + vib, (b + d) / 2 + 0.5, tnB(B_P.cuerdaS)); }
  // los remos recogidos: metidos y trincados en haz sobre la borda, con las palas asomando por la proa
  for (let i = 0; i < 4; i++) { lQ(-46, -9.6 - i * 0.7, 52, -9.4 - i * 0.7, tnB(i % 2 ? B_P.cuerdaS : B_P.cuerdaL)); const p = Q(52 + i * 1.5, -9.4 - i * 0.7); R.rect(Math.round(p[0]), Math.round(p[1]) - 1, Math.round(p[0]) + 3, Math.round(p[1]), tnB(B_P.cuerdaL)); }
  for (const dx of [-30, -6, 18, 40]) lQ(dx, -8, dx + 1, -12.5, tnB(B_P.cascoD));
  // el pico de vela arrizada en el trinquete, que bate: el puño suelto da latigazos y la tela hace pliegues
  { const ux = 56 + Math.sin(t * 9.3) * 2.2 + Math.sin(t * 23) * 0.8, uy = -13 + Math.cos(t * 11.1) * 2.4, A = [36, -30], B = [30, -12], pa = Q(...A), pb = Q(...B), pc = Q(ux, uy);
    R.poligono([pa, pc, pb], (px, py) => { const f = Math.sin(((px - pa[0]) * 0.55 - (py - pa[1]) * 0.35) * 0.9 - t * 19) + Math.sin(t * 9.3) * 0.3; return tnB(f > 0.8 ? B_P.velaL : f < -0.75 ? B_P.velaD : f < -0.1 ? B_P.velaS : B_P.vela); });
    lQ(A[0], A[1], ux, uy, tnB(B_P.velaD)); lQ(ux, uy, B[0], B[1], tnB(B_P.velaS)); lQ(ux, uy, ux + 6, uy + 4 + Math.sin(t * 13) * 2, tnB(B_P.cuerda));
    for (let r = 0; r < 3; r++) { const f = 0.35 + r * 0.18; lQ(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[0] + (B[0] - A[0]) * f + 3, A[1] + (B[1] - A[1]) * f + 1, tnB(B_P.cuerdaS)); } }
  // la ola que rompe contra la borda de barlovento: la espuma salta, pasa por encima y escurre por el costado
  { const k = Math.floor((t + 0.6) / 1.9), u = (t + 0.6 - k * 1.9) / 1.1, x0 = -20 + h(k, 1, 783) * 40;
    if (u < 1) for (let i = 0; i < 46; i++) { const a = h(i, k, 784), vx = (a - 0.5) * 30, alto = 8 + h(i, k + 3, 784) * 16, xx = x0 + vx + u * 10, yy = -6 - Math.sin(Math.min(1, u * 1.15) * Math.PI) * alto + u * 4; const p = Q(xx, yy); R.pset(Math.round(p[0]), Math.round(p[1]), u < 0.55 ? P[7] : b_umbral(Math.round(p[0]), Math.round(p[1])) < 1 - u ? P[6] : P[4]); if (i % 3 === 0) R.pset(Math.round(p[0]) - 1, Math.round(p[1]) + 1, P[4]); }
    if (u > 0.4 && u < 1.6) for (let i = 0; i < 18; i++) { const xx = x0 - 18 + i * 2.2, f = Math.min(1, (u - 0.4) * 1.5), p = Q(xx, -8 + f * 6 * h(i, k, 782)); R.pset(Math.round(p[0]), Math.round(p[1]), h(i, 2, 782) > 0.4 ? P[6] : P[4]); } }
  // la espuma que rompe contra la proa y la popa
  for (const dx of [70, -56]) { const [px, py] = g.cubierta(dx); for (let i = 0; i < 14; i++) { const u = ((t * 1.6 + i * 0.13) % 1); R.pset(px + (h(i, 1, 789) - 0.5) * 18, py + 9 - u * 12 * h(i, 2, 789), u < 0.6 ? P[6] : P[4]); } }
  // el mar de cerca: la ola grande de delante, que tapa la quilla, con su cresta de espuma que vuela
  for (let x = 0; x < 320; x++) { const yn = yN(x), sl = yN(x + 1) - yn; ola(x, yn, sl, Math.round(yn), 180, true);
    if (h(x, Math.floor(t * 9), 799) > 0.62) { const k = Math.floor(t * 9); R.pset(x - (k % 5), Math.round(yn) - 2 - (k % 3), P[6]); if (sl < -0.2) R.pset(x - 3 - (k % 4), Math.round(yn) - 5, P[4]); } }
  // la lluvia en diagonal
  b_lluvia(R, t, 150, 1.1, hex('#7a889c'), hex('#4a5668'));
  if (luz > 0) { const c = hex('#c8d0f0'); for (let i = 0; i < 57600; i++) B[i] = b_mezcla(B[i], c, 0.22 * luz); }
  const [cx, cy] = g.cubierta(0);
  return { suelo: Math.round(cy), horizonte: hor, galera: { x: Math.round(g.x), cubierta: (dx) => g.cubierta(dx / S).map(Math.round), giro }, rayo: luz, libre: [110, 210] };
}

// la lluvia: trazos en diagonal que caen con el viento (de ep12, d_lluvia)
function b_lluvia(R, t, n, viento, c, c2, y0 = 0, y1 = 180) {
  const dx = 0.35 + viento * 0.9;
  for (let k = 0; k < n; k++) { const v = 150 + h(k, 1, 640) * 90, L = 4 + Math.round(h(k, 2, 640) * 5), xa = h(k, 3, 640) * 420, ya = ((h(k, 4, 640) * 400 + t * v) % (y1 - y0 + 30)) + y0 - 15, xb = xa - (ya - y0) * dx * 0.2 + ((t * v * dx) % 420);
    const x = ((xb % 420) + 420) % 420 - 50; for (let i = 0; i < L; i++) R.pset(Math.round(x - i * dx), Math.round(ya - i), i < 2 ? c : c2); }
}

// BRASIL · la costa de Brasil en 1500: playa, palmeras, selva, el monte y las naos portuguesas fondeadas -----------------
function b_playaBrasil(R, t, o) {
  const hora = o.hora ?? 'tropico', tn = b_tinte(hora), hor = 80, yB = (x) => Math.round(122 + x * 0.09), xSelva = (y) => Math.round(150 + (y - hor) * 1.1);
  const F = b_capa(R, 'brasil|' + hora, (b) => {
    b_degradado(R, 0, hor, B_CIELOS[hora === 'tropico' ? 'tropico' : hora]); const foto = b.slice();
    b.fill(B_AGUA, hor * 320);
    // el monte (Monte Pascoal): redondo, de bosque azulado, con la luz por la izquierda
    for (let x = 0; x < 200; x++) { const yt = Math.round(hor - 4 - 40 * Math.exp(-(((x - 74) / 34) ** 2)) - 16 * Math.exp(-(((x - 132) / 26) ** 2)) - h(x >> 1, 5, 800) * 2); for (let y = yt; y < hor + 6; y++) { const lado = (x - 74) / 40 + (y - yt) * 0.02, v = h(x >> 1, y >> 1, 801); R.pset(x, y, tn(y <= yt + 1 ? B_P.pascoalL : lado > 0.4 && v > 0.3 ? B_P.pascoalS : v > 0.82 ? B_P.pascoalL : B_P.pascoal)); } }
    // la selva: copas en filas, de lejos (pequeñas, azuladas) a cerca (grandes y verdes), con luz arriba a la izquierda
    for (let fila = 0; fila < 6; fila++) for (let k = 0; k < 30; k++) { const yb2 = hor + 2 + fila * 7, x = Math.round(h(k, fila, 802) * 230 - 10), r = 4 + fila * 1.6 + h(k, fila, 803) * 3; if (x > xSelva(yb2) - r * 0.4) continue;
      const cs = fila < 2 ? [B_P.pascoalS, B_P.pascoal, B_P.pascoalL] : fila < 4 ? [B_P.selva0, B_P.selva1, B_P.selva3] : [B_P.selva1, B_P.selva2, B_P.selva4];
      R.disco(x, yb2, r, tn(cs[0])); R.disco(x - 1, yb2 - 1, r - 1, tn(cs[1])); R.disco(x - Math.round(r * 0.35), yb2 - Math.round(r * 0.4), r * 0.45, tn(cs[2])); for (let i = 0; i < r; i++) R.pset(x - r + i * 2, yb2 - 1 + (i % 2), tn(cs[0])); }
    for (let y = hor + 2; y < 138; y++) for (let x = 0; x < 320; x++) { if (x >= xSelva(y) || y >= yB(x) - 2) continue; if (y > hor + 40) { const v = h(x >> 1, y >> 1, 804); R.pset(x, y, tn(v > 0.6 ? B_P.selva0 : v > 0.3 ? B_P.selva1 : B_P.selva2)); } }
    for (let fila = 0; fila < 4; fila++) for (let k = 0; k < 18; k++) { const yb2 = hor + 40 + fila * 6, x = Math.round(h(k, fila, 805) * 200), r = 7 + h(k, fila, 806) * 4; if (x > xSelva(yb2) - 4 || yb2 > yB(x) - 4) continue; R.disco(x, yb2, r, tn(B_P.selva1)); R.disco(x - 1, yb2 - 1, r - 1, tn(B_P.selva2)); R.disco(x - 3, yb2 - 3, r * 0.45, tn(B_P.selva4)); R.disco(x + 2, yb2 + 2, r * 0.4, tn(B_P.selva0)); }
    // la arena: grano, ondulaciones, la franja mojada, conchas, un tronco que trajo el mar y algas
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const yb2 = yB(x); if (y < yb2) continue; const d = y - yb2, v = h(x, y, 807), rz = Math.sin(x * 0.12 + y * 0.9 + Math.sin(x * 0.03) * 3); let c = d < 6 ? (v > 0.7 ? B_P.arenaMS : B_P.arenaM) : d < 8 ? B_P.arenaS : rz > 0.85 ? B_P.arenaL : rz < -0.9 ? B_P.arenaS : v > 0.93 ? B_P.arenaS : v < 0.04 ? B_P.arenaL : B_P.arena;
      if (x < xSelva(Math.min(y, 140)) && d < 4 && x < 150) c = B_P.arenaS; R.pset(x, y, tn(c)); }
    for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 808) * 310), y = yB(x) + 10 + Math.round(h(k, 2, 808) * 36); R.pset(x, y, tn(B_P.concha)); R.pset(x + 1, y, tn(hex('#d8b4a8'))); }
    for (let i = 0; i < 34; i++) { const x = 246 + i, y = 170 - Math.round(i * 0.12); R.rect(x, y, x, y + 3, tn(i < 2 || i > 32 ? B_P.cascoS : (i + 1) % 6 === 0 ? hex('#8a7a66') : hex('#a8967e'))); R.pset(x, y, tn(hex('#c8b8a0'))); R.pset(x, y + 4, tn(B_P.arenaS)); }
    for (let k = 0; k < 10; k++) { const x = 140 + k * 17 + Math.round(h(k, 3, 808) * 8), y = yB(x) + 7; R.pset(x, y, tn(hex('#5a6a3a'))); R.pset(x + 1, y, tn(hex('#4a5a2a'))); R.pset(x - 1, y + 1, tn(hex('#5a6a3a'))); }
    return { m: b_mascara(b, foto, hor) };
  });
  b_fondo(R, F.b);
  b_agua(R, t, F.m, hor, 150, hora, { sol: 242, mar: 0.2 });
  b_astro(R, F.m, 242, 28, hora === 'tropico' ? 'dia' : hora);
  b_nubes(R, t, F.m, hor, hora === 'tropico' ? 'tropico' : hora, 0.8);
  // las naos portuguesas: dos fondeadas (velas recogidas) y una que llega con todo el trapo
  b_nao(R, 186 + Math.min(t, 30) * 0.8, 88, 0.42, t, { dir: -1, k: 4, tn });
  const nA = b_nao(R, 232, 104, 0.82, t, { dir: -1, k: 0, tn, velas: 'recogidas' });
  b_nao(R, 296, 96, 0.6, t, { dir: -1, k: 2, tn, velas: 'recogidas' });
  // el bote que rema de la nao a la playa
  const ub = o.bote ?? Math.min(1, t / 16), bx = Math.round(224 - ub * 58), by = Math.round(111 + ub * 12), br = t * 3.2;
  for (let i = 0; i < 16; i++) if (h(i, Math.floor(t * 4), 809) > 0.35) R.pset(bx + 15 + i * 1.8, by + 1 + (i % 2) + Math.round(i * 0.1), tn(hex('#e8f8f8')));
  for (let i = -14; i <= 14; i++) { const top = by - 4 - (Math.abs(i) > 10 ? Math.abs(i) - 10 : 0) * 0.6, bot = by + (Math.abs(i) > 11 ? -1 : 0); for (let y = Math.round(top); y <= bot; y++) R.pset(bx + i, y, tn(y === Math.round(top) ? B_P.cubiertaL : y === Math.round(top) + 1 ? B_P.cascoR : y >= bot ? B_P.cascoD : B_P.casco)); }
  for (let i = 0; i < 5; i++) { const x = bx - 8 + i * 4, l = i === 4 ? 0 : Math.round(Math.sin(br) * 1.2), c = [B_P.camisa, B_P.chaleco, B_P.camisa, B_P.faja, B_P.chaleco][i];
    R.pset(x + l, by - 8, tn(B_P.piel)); R.pset(x + l + 1, by - 8, tn(B_P.piel)); R.pset(x + l, by - 9, tn(i === 4 ? C.k : B_P.cascoS)); R.rect(x + l, by - 7, x + l + 1, by - 5, tn(c));
    if (i < 4) { const ox = Math.round(Math.sin(br) * 4), oy = Math.cos(br) > 0 ? 4 : 1; R.linea(x + l + 1, by - 6, x + ox - 5, by + oy, tn(B_P.cuerdaL)); R.pset(x + ox - 5, by + oy, tn(B_P.cuerda)); if (Math.cos(br) > 0.8) R.pset(x + ox - 6, by + oy - 1, tn(hex('#f4fcfc'))); } }
  R.rect(bx + 13, by - 9, bx + 13, by - 4, tn(B_P.cascoS)); b_bandera(R, bx + 13, by - 10, 5, 3, t, 1, tn(B_P.velaL), tn(B_P.velaS), tn(hex('#ffffff')));
  // las olas que rompen en la orilla: la lámina que sube y baja, la espuma y la arena mojada que brilla
  for (let x = Math.max(0, xSelva(140) - 40); x < 320; x++) { const yb2 = yB(x), w = 2.5 + 2.5 * Math.sin(t * 0.9 + x * 0.018) + Math.sin(t * 2.1 + x * 0.07) * 0.8, yf = Math.round(yb2 + w);
    for (let y = yb2; y < yf; y++) R.pset(x, y, tn(y === yf - 1 ? hex('#f6fcfc') : hex('#7ad0dc'))); if (h(x, Math.floor(t * 3), 810) > 0.5) R.pset(x, yf, tn(hex('#d8f0f0'))); if ((x + Math.floor(t * 4)) % 9 === 0) R.pset(x, yb2 - 2, tn(hex('#f6fcfc'))); }
  // las sombras de las palmeras en la arena (se mecen con ellas) y unos cocos caídos
  for (const [px, pb, al] of [[20, 176, 72], [302, 172, 60]]) { const sw = Math.sin(t * 1.35 + px * 0.7) * 2; for (let j = 0; j < 9; j++) for (let i = -18; i <= 18; i++) { const x = px + 14 + i + Math.round(sw), y = pb - 4 + j - Math.round(i * 0.12); if (Math.abs(i) / 18 + Math.abs(j - 4) / 5 > 1 || h(i >> 1, j, 812) > 0.8) continue; if (b_umbral(x, y) < 0.6) R.pset(x, y, b_mezcla(R.pget(x, y), B_P.arenaMS, 0.45)); } }
  for (const [x, y] of [[44, 168], [50, 170], [270, 160]]) { R.disco(x, y, 2.2, tn(hex('#6a4a2a'))); R.pset(x - 1, y - 1, tn(hex('#8a6a3a'))); }
  // las palmeras (dos a la izquierda, una a la derecha) y los guacamayos
  const p1 = b_palmera(R, 20, 176, 72, t, 0.25, tn, 1), p2 = b_palmera(R, 58, 134, 46, t, 0.25, tn, 2), p3 = b_palmera(R, 302, 172, 60, t, 0.25, tn, 3);
  const loros = [[B_P.loroR, hex('#a01a1a'), B_P.loroA], [B_P.loroA, hex('#1a3a9a'), B_P.loroY], [B_P.loroR, hex('#a01a1a'), B_P.loroY]];
  for (let k = 0; k < 3; k++) { const x = ((h(k, 1, 811) * 300 + t * (12 + k * 3)) % 360) - 20, y = 56 + k * 9 + Math.sin(t * 1.3 + k * 2) * 5; if (x > 266 && y < 50) continue; const [c, cS, a] = loros[k]; b_loro(R, x, y, t, tn(c), tn(cS), tn(a), 1, true); }
  b_loro(R, p1[0] + 6, p1[1] + 4, t, tn(B_P.loroR), tn(hex('#a01a1a')), tn(B_P.loroA), -1, false);
  b_loro(R, p2[0] - 5, p2[1] + 3, t, tn(B_P.loroA), tn(hex('#1a3a9a')), tn(B_P.loroY), 1, false);
  b_gaviotas(R, t, 3, 30, 64, tn, 4);
  // los cangrejos que corren de lado por la arena mojada (y se esconden)
  for (let k = 0; k < 2; k++) { const c = (t * 0.6 + k * 2.3) % 6; if (c > 4.4) continue; const x = Math.round(150 + k * 90 + Math.sin(c * 1.7 + k) * 18), y = yB(x) + 9 + k * 3, p = Math.floor(t * 10) % 2;
    R.rect(x - 2, y, x + 2, y + 1, tn(B_P.cangrejo)); R.pset(x - 1, y - 1, tn(C.k)); R.pset(x + 1, y - 1, tn(C.k)); R.pset(x - 3, y - 1 + p, tn(B_P.cangrejoS)); R.pset(x + 3, y - p, tn(B_P.cangrejoS)); R.pset(x - 3, y + 2, tn(B_P.cangrejoS)); R.pset(x + 3, y + 2, tn(B_P.cangrejoS)); }
  return { suelo: 158, horizonte: hor, orilla: yB, libre: [76, 280], pies: [150, 172], bote: [bx, by], nao: [Math.round(nA.x), Math.round(nA.y)], monte: [74, 36], palmeras: [[20, 176], [58, 134], [302, 172]] };
}

// BRASIL · CUBIERTA: la cubierta de una nao portuguesa frente a la costa, con el piloto que dibuja la carta -------------
function b_cubiertaNao(R, t, o) {
  const hora = o.hora ?? 'tropico', tn = b_tinte(hora), hor = 90, off = Math.round(Math.sin(t * 0.6) * 2 * (o.balanceo ?? 1));
  const F = b_capa(R, 'cubierta|' + hora, (b) => {
    b_degradado(R, 0, hor, B_CIELOS[hora === 'tropico' ? 'tropico' : hora]); const foto = b.slice();
    b.fill(B_AGUA, hor * 320, 118 * 320); R.rect(0, 118, 319, 179, tn(B_P.cascoD));
    // la costa verde de Brasil a lo lejos: el monte, la selva y la raya de la playa
    for (let x = 0; x < 196; x++) { const yt = Math.round(hor - 3 - 15 * Math.exp(-(((x - 70) / 22) ** 2)) - 5 * Math.exp(-(((x - 130) / 30) ** 2)) - h(x >> 1, 6, 820) * 1.6 + (x > 170 ? (x - 170) * 0.15 : 0)); for (let y = yt; y < hor; y++) { const v = h(x, y, 821); R.pset(x, y, tn(y === yt ? B_P.pascoalL : y > hor - 3 ? (v > 0.5 ? B_P.selva1 : B_P.selva2) : v > 0.75 ? B_P.pascoalS : B_P.pascoal)); } R.pset(x, hor - 1, tn(B_P.arenaL)); }
    return { m: b_mascara(b, foto, hor) };
  });
  const Fr = b_capa(R, 'cubiertaF|' + hora, () => {
    // la borda: regala, batayolas y el forro por dentro, con los imbornales
    b_tablas(R, 0, 112, 319, 131, [tn(B_P.cascoL), tn(B_P.casco), tn(B_P.cascoS), tn(B_P.cascoD)], 4, 21);
    for (let x = 4; x < 320; x += 28) { R.rect(x, 110, x + 3, 131, tn(B_P.cascoS)); R.rect(x, 110, x, 131, tn(B_P.cascoL)); }
    R.rect(0, 107, 319, 110, tn(B_P.cubierta)); R.rect(0, 107, 319, 107, tn(B_P.cubiertaL)); R.rect(0, 111, 319, 111, tn(B_P.cascoD));
    for (let x = 18; x < 320; x += 56) { R.rect(x, 128, x + 4, 130, tn(B_P.sombra)); }
    // la cubierta de tablas
    b_tablas(R, 0, 132, 319, 179, [tn(B_P.cubiertaL), tn(B_P.cubierta), tn(B_P.cubiertaS), tn(B_P.junta)], 3, 23, 0.14);
    for (let x = 0; x < 320; x++) R.pset(x, 132, tn(B_P.cascoD));
    // los obenques con sus flechastes (la escala de cuerda) que suben al palo mayor
    const pie = [156, 168, 180, 192, 204], tope = [236, 48];
    for (let i = 0; i < pie.length; i++) { R.linea(pie[i], 108, tope[0] - 2 + i, tope[1], tn(B_P.jarcia)); R.rect(pie[i] - 1, 109, pie[i] + 1, 116, tn(B_P.hierro)); R.pset(pie[i] - 1, 110, tn(B_P.hierroL)); }
    for (let y = 56; y < 106; y += 5) { const u = (y - tope[1]) / (108 - tope[1]); R.linea(Math.round(tope[0] - 2 + (pie[0] - tope[0] + 2) * u), y, Math.round(tope[0] + 2 + (pie[4] - tope[0] - 2) * u), y, tn(B_P.cuerdaS)); }
    // el palo mayor con su fogonadura y el cabillero
    for (let y = 0; y < 150; y++) for (let x = 232; x <= 241; x++) R.pset(x, y, tn(x === 232 ? B_P.cascoL : x >= 240 ? B_P.cascoD : (y + x) % 11 === 0 ? B_P.cascoS : B_P.casco));
    for (let y = 70; y < 150; y += 24) { R.rect(231, y, 242, y + 1, tn(B_P.hierro)); R.pset(232, y, tn(B_P.hierroL)); }
    R.rect(222, 140, 252, 143, tn(B_P.cascoS)); R.rect(222, 140, 252, 140, tn(B_P.cubiertaL)); R.rect(223, 144, 225, 152, tn(B_P.cascoS)); R.rect(249, 144, 251, 152, tn(B_P.cascoS));
    for (const x of [226, 229, 245, 248]) { R.rect(x, 135, x, 140, tn(B_P.cuerdaL)); R.pset(x, 134, tn(B_P.cascoL)); }
    for (let i = 0; i < 9; i++) { R.pset(227 + (i & 1), 141 + i, tn(B_P.cuerda)); R.pset(247 - (i & 1), 141 + i, tn(B_P.cuerda)); }
    // el cabrestante, el enjaretado de la escotilla, la aduja, el cubo con el lampazo y el falconete en la borda
    for (let y = 128; y < 152; y++) { const w = y < 132 || y > 147 ? 10 : 7; for (let x = -w; x <= w; x++) { const u = (x + w) / (2 * w); R.pset(282 + x, y, tn(y === 128 || y === 148 ? B_P.cubiertaL : u < 0.2 ? B_P.cascoL : u > 0.8 ? B_P.cascoD : (x + 40) % 4 === 0 ? B_P.cascoS : B_P.casco)); } }
    for (let x = 271; x <= 293; x++) R.pset(x, 127, tn(B_P.cubiertaL)); R.disco(282, 126, 3, tn(B_P.hierro)); R.pset(281, 125, tn(B_P.hierroL));
    for (const [a, b] of [[[254, 124], [310, 132]], [[268, 136], [296, 120]]]) { R.linea(a[0], a[1], b[0], b[1], tn(B_P.cubiertaS)); R.linea(a[0], a[1] - 1, b[0], b[1] - 1, tn(B_P.cubiertaL)); }
    // el gallinero de listones, con su comedero
    for (let y = 128; y < 152; y++) for (let x = 2; x < 54; x++) { const lis = (x - 2) % 6 < 2, borde = y < 131 || y > 148 || x < 4 || x > 51; R.pset(x, y, tn(borde ? (y < 129 ? B_P.cubiertaL : B_P.cascoS) : lis ? (x % 6 === 2 ? B_P.cubiertaL : B_P.cubierta) : B_P.sombra)); }
    R.rect(4, 150, 52, 152, tn(B_P.cascoD)); R.rect(10, 152, 22, 155, tn(B_P.cascoS)); R.rect(11, 152, 21, 152, tn(B_P.ocre));
    for (let y = 158; y < 176; y++) for (let x = 262; x < 312; x++) { const gx = (x - 262) % 6, gy = (y - 158) % 5; R.pset(x, y, tn(x < 264 || x > 309 || y < 160 || y > 173 ? B_P.cascoS : gx < 2 || gy < 2 ? (gy === 0 ? B_P.cubiertaL : B_P.cubiertaS) : B_P.sombra)); }
    b_aduja(R, 28, 160, 11, tn); b_barril(R, 192, 140, 12, 12, tn); R.linea(196, 132, 204, 126, tn(B_P.cuerdaS)); R.rect(202, 124, 205, 128, tn(B_P.cuerdaL));
    for (let x = 290; x < 314; x++) { const r = 2 - (x - 290) / 16; for (let y = -Math.round(r); y <= Math.round(r); y++) R.pset(x, 101 + y, tn(y < 0 ? B_P.hierroL : B_P.hierro)); } R.rect(296, 103, 297, 107, tn(B_P.hierro)); R.rect(286, 100, 290, 102, tn(B_P.hierro));
  }, true);
  b_fondo(R, F.b, off);
  b_agua(R, t, F.m, hor, 118, hora, { sol: 120, off, mar: 0.2 });
  b_astro(R, F.m, 120, 26, hora === 'tropico' ? 'dia' : hora, off);
  b_nubes(R, t, F.m, hor, hora === 'tropico' ? 'tropico' : hora, 0.9, off);
  // otra nao de la flota, fondeada, entre la costa y nosotros; las gaviotas y los rabihorcados
  b_nao(R, 92, 104 + off, 0.5, t, { dir: 1, k: 5, tn, velas: 'recogidas' });
  b_gaviotas(R, t, 4, 24 + off, 70 + off, tn, 6);
  b_encima(R, Fr);
  // las gallinas del gallinero, que picotean y asoman la cabeza entre los listones
  for (let k = 0; k < 4; k++) { const x = 8 + k * 12 + Math.round(Math.sin(t * 0.7 + k * 2) * 2), pica = Math.sin(t * 3.1 + k * 1.7) > 0.55, y = 142 + (k % 2) * 2, bl = k === 2 ? hex('#a8642a') : hex('#f0ece0'), sb = k === 2 ? hex('#7a4418') : hex('#c8c0b0');
    for (let j = 0; j < 5; j++) for (let i = -3; i <= 3; i++) if (i * i / 10 + (j - 2.5) ** 2 / 6 <= 1 && (x + i - 2) % 6 >= 2) R.pset(x + i, y + j, tn(j > 3 ? sb : bl));
    const hx = x + 3, hy = pica ? y + 3 : y - 1; if ((hx - 2) % 6 >= 2) { R.pset(hx, hy, tn(bl)); R.pset(hx, hy - 1, tn(B_P.loroR)); R.pset(hx + 1, hy, tn(B_P.loroY)); } }
  // la vela mayor, hinchada, con la cruz roja genérica (por delante de los obenques) y el palo por delante de ella
  const fl = Math.sin(t * 2.2) * 1.2, x0 = 178, x1 = 300, ya = 50, yb2 = 104;
  R.poligono([[x0, ya], [x1, ya], [x1 + 4 + fl, (ya + yb2) / 2], [x1 - 2, yb2], [x0 + 2, yb2], [x0 + 4 + fl * 0.5, (ya + yb2) / 2]], (x, y) => { const q = (x - 239) / 61, v = (y - ya) / (yb2 - ya); const seam = (x - x0) % 10 === 0; let c = q > 0.6 ? B_P.velaS : q < -0.75 ? B_P.velaS : v < 0.06 ? B_P.velaD : (q > -0.35 && q < 0.25 && v > 0.25 && v < 0.85) ? B_P.velaL : B_P.vela; if (seam) c = B_P.costura;
    if ((Math.abs(x - 239) < 4 && v > 0.08 && v < 0.94) || (Math.abs(y - 76) < 4 && Math.abs(q) < 0.7)) c = Math.abs(x - 239) === 3 || Math.abs(y - 76) === 3 ? B_P.cruzS : B_P.cruz; return tn(c); });
  for (let x = x0 - 2; x <= x1 + 2; x++) { R.pset(x, ya - 1, tn(B_P.cascoD)); R.pset(x, ya - 2, tn(B_P.casco)); } for (let x = x0 + 2; x <= x1 - 2; x++) R.pset(x, yb2 + Math.round(Math.sin(t * 3 + x * 0.2) * 0.6), tn(B_P.velaD));
  for (let y = 0; y < ya - 2; y++) R.rect(232, y, 241, y, tn(y % 11 === 0 ? B_P.cascoS : B_P.casco));
  R.linea(x0 + 2, yb2, 160, 120, tn(B_P.cuerdaS)); R.linea(x1 - 2, yb2, 312, 122, tn(B_P.cuerdaS));
  b_bandera(R, x0 - 2, ya - 2, 14, 2, t, -1, tn(B_P.toldoB), tn(B_P.velaS), tn(hex('#ffffff')), true);
  return { suelo: 154, horizonte: hor, barril: { x: 140, y: 140, ancho: 22 }, libre: [50, 210], palo: 236, cabrestante: [282, 126], escotilla: [262, 158, 311, 175], gallinero: [2, 128, 53, 152], costa: [0, 196] };
}

// lo de delante de los personajes en el mar ------------------------------------------------------------------------
// galera: la regala de estribor abajo, de cerca (con cabillas y una aduja colgada)
function b_galeraDelante(R, t, o) {
  const tn = b_tinte(o.hora ?? 'dia');
  b_tablas(R, 0, 172, 262, 179, [tn(B_P.cascoL), tn(B_P.casco), tn(B_P.cascoS), tn(B_P.cascoD)], 4, 41);
  R.rect(0, 169, 262, 171, tn(B_P.cubierta)); R.rect(0, 169, 262, 169, tn(B_P.cubiertaL)); R.rect(0, 171, 262, 171, tn(B_P.cubiertaS));
  for (let x = 30; x < 262; x += 60) { R.rect(x, 164, x + 1, 169, tn(B_P.cascoL)); R.pset(x, 163, tn(B_P.cubiertaL)); R.rect(x + 20, 165, x + 21, 169, tn(B_P.cascoS)); }
  for (let i = 0; i < 9; i++) R.pset(92 + Math.round(Math.sin(i * 0.8) * 2), 170 + i, tn(i % 2 ? B_P.cuerdaS : B_P.cuerda));
  return {};
}

// el barril (con su tapa) que va delante del personaje en la bodega y en la cubierta de la nao
function b_barrilDelante(R, x, yt, ancho, tn) {
  b_barril(R, x, yt, ancho, 19, tn);
  for (let i = -ancho / 2; i <= ancho / 2; i++) R.pset(x + i, yt + 20, tn(B_P.sombra));
}

// el temporal por delante: la lluvia gorda y los rociones de espuma que pasan por encima de la borda
function b_tormentaDelante(R, t) {
  b_lluvia(R, t + 3.7, 40, 1.3, hex('#a8b4c8'), hex('#6a7890'));
  const k = Math.floor(t / 2.7), u = (t - k * 2.7) / 0.8; if (u < 1) for (let i = 0; i < 40; i++) { const a = h(i, k, 830), x = 60 + a * 200 + u * 40 * (h(i, k, 831) + 0.5), y = 150 - Math.sin(u * Math.PI) * 30 * h(i, k, 832) - u * 10; R.pset(x, y, b_umbral(x | 0, y | 0) < 1 - u ? hex('#e8eef4') : hex('#8a96a8')); }
}

// la costa: los rociones de la ola de proa que saltan por encima del espolón
function b_costaDelante(R, t, o) {
  const tn = b_tinte(o.hora ?? 'dia'), k = Math.floor(t / 1.9), u = (t - k * 1.9) / 0.9; if (u >= 1) return;
  for (let i = 0; i < 18; i++) { const x = 176 + h(i, k, 833) * 40 + u * 18 * h(i, k, 834), y = 168 - Math.sin(u * Math.PI) * (6 + 14 * h(i, k, 835)); R.pset(x, y, tn(i % 3 ? hex('#f4f8fa') : B_P.velaS)); }
}

// la playa: unas matas de hierba de playa y una hoja de palma caída en las esquinas de abajo, que se mecen
function b_playaDelante(R, t, o) {
  const tn = b_tinte(o.hora ?? 'tropico');
  for (const [bx, n, sem] of [[4, 9, 1], [306, 8, 2]]) for (let i = 0; i < n; i++) { const x0 = bx + i * 1.6, l = 8 + h(i, sem, 836) * 10, sw = Math.sin(t * 1.8 + i * 0.7 + sem) * 1.5; for (let j = 0; j < l; j++) { const u = j / l; R.pset(Math.round(x0 + (i - n / 2) * u * 1.2 + sw * u * u), 180 - j, tn(u > 0.75 ? C.hierbaL : i % 2 ? C.hierba : C.hierbaS)); } }
  return {};
}

// la paleta del taller, el puerto y el salón del sultán
const c_P = pal({
  k: '#1a1210',
  madL: '#b07a44', mad: '#8a5a30', madS: '#643e20', madD: '#3e2412', veta: '#74482a',
  vigaL: '#5a3e2c', viga: '#46301f', vigaS: '#2e1e14',
  yesoL: '#eedcb4', yeso: '#e0c99c', yesoM: '#d2b88a', yesoS: '#b89a6e', yesoD: '#8e7252',
  piedraL: '#e6d8bc', piedra: '#cdbb98', piedraM: '#b29e7c', piedraS: '#8c7a5a', piedraD: '#5e4e3a',
  ladr: '#b4684a', ladrS: '#86462e',
  azB: '#f2f0e6', azBS: '#d6d2c2', az: '#2a5aa8', azL: '#5a8ad0', azS: '#1a3a76', tur: '#36a8a0', turL: '#7ad2c4', junta: '#a89c88',
  rojo: '#b0302a', rojoL: '#d8523c', rojoS: '#782018', indigo: '#2c3c72', indigoL: '#4a5e9a', indigoS: '#1c2850',
  marfil: '#ecdfc0', marfilS: '#c8b892', ocre: '#d4a040', ocreS: '#a07428', verde: '#3e7a4c', verdeL: '#5e9c62', verdeS: '#285236',
  oro: '#d8a838', oroL: '#f6dc80', oroS: '#9a7020', laton: '#c8963a', latonL: '#ecc870', latonS: '#8a6024',
  perg: '#ead6a6', pergL: '#f4e6c0', pergS: '#c8aa72', pergD: '#a08050', tinta: '#2a2018', tRoja: '#a83224', tVerde: '#3a6a3a', tAzul: '#2a4a7a',
  mar0: '#6aa6cc', mar1: '#4a8cbc', mar2: '#3474a4', mar3: '#245a86', mar4: '#1a4468', marL: '#b4e0f0', espuma: '#f0f8f8',
  lejos0: '#b4c2d0', lejos1: '#98a8bc', lejos2: '#7e90a6', lejos3: '#687a92',
  hoja: '#3e6a3a', hojaL: '#6a9a4a', hojaS: '#284a2a', cipres: '#2a4a32', cipresS: '#1a3424',
  piel: '#e8b088', pielS: '#b87a58', tejaL: '#d8724a', teja: '#b45a3a', tejaS: '#843e28', plomo: '#8a96a4', plomoL: '#b8c2cc', plomoS: '#5e6876',
  llama: '#ffd060', llamaL: '#fff4c0', llamaS: '#f08a28', vela: '#f4f0e0', velaS: '#c8c0a8', cuerda: '#a88a5a',
  palma: '#4a8a3a', palmaL: '#7ab04a', palmaS: '#2e5e2a', tronco: '#8a6a44', troncoS: '#5e4428',
});

const c_CIELO = { dia: ['#5c9ad6', '#76b0e2', '#94c4ea', '#b8daf0', '#dcecf0'].map(hex), tarde: ['#55609c', '#8e6a9e', '#d0868a', '#f0aa76', '#f8d498'].map(hex) };

const c_NUBE = { dia: ['#a6b6ce', '#dce8f2', '#ffffff'].map(hex), tarde: ['#966a86', '#e6a092', '#ffe2bc'].map(hex) };

const c_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma (devuelve el búfer)
function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]); return m[clave];
}

// mezcla dos colores (k = 0: a; k = 1: b)
const c_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

// tiñe el píxel (x, y) hacia el color c con fuerza a (respeta R.recorte)
function c_tinte(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c_mez(R.pget(x, y), c, a)); }

// un rectángulo que respeta R.recorte (R.rect no lo respeta)
const c_r = (R, x0, y0, x1, y1, c) => R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], c);

// el umbral de la trama 4 × 4 (Bayer), para los degradados tramados
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_tr = (x, y) => c_BAYER[(y & 3) * 4 + (x & 3)];

// un degradado vertical tramado entre los colores de cols (de arriba abajo) en la caja dada
function c_degradado(R, x0, y0, x1, y1, cols) {
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > c_tr(x, y) ? cols[i + 1] : cols[i]); }
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba a la izquierda), de ancho w
function c_nube3(R, cx, cy, w, tn) {
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.2], [0.3, 0.07, 0.22], [-0.1, -0.15, 0.23], [0.14, -0.1, 0.19], [0.46, 0.12, 0.12], [-0.46, 0.13, 0.11]], r = (f) => Math.max(1, f * w);
  for (const [dx, dy, f] of B) R.disco(cx + dx * w, cy + dy * w + 1.6, r(f), tn[0]);
  for (const [dx, dy, f] of B) R.disco(cx + dx * w, cy + dy * w, r(f), tn[1]);
  for (const [dx, dy, f] of B) if (dy < 0.1) R.disco(cx + dx * w - 1, cy + dy * w - 1.4, r(f * 0.6), tn[2]);
}

// las nubes en tres capas (lejos, pequeñas y lentas; cerca, grandes y más rápidas) que cruzan la caja
function c_nubes(R, t, x0, y0, x1, y1, tn, n = 6, sem = 0) {
  const W = x1 - x0 + 80;
  for (let capa = 0; capa < 3; capa++) for (let k = 0; k < n; k++) { if ((k + capa) % 3 === 2 && capa === 2) continue;
    const w = [10, 16, 24][capa] * (0.8 + h(k, capa, sem) * 0.5), v = [0.6, 1.3, 2.4][capa];
    const x = x0 - 40 + (((h(k, capa + 7, sem) * W + t * v) % W) + W) % W, y = y0 + (0.15 + h(k, capa + 3, sem) * 0.55) * (y1 - y0) * [0.6, 0.85, 1][capa];
    c_nube3(R, Math.round(x), Math.round(y), w, tn); }
}

// una gaviota que bate las alas (grande: s = 2)
function c_gaviota(R, x, y, t, k = 0, s = 1) {
  const { pset } = R, B = hex('#f4f6f8'), G = hex('#8a929c'), arriba = Math.sin(t * 9 + k * 2.1) > 0; x = Math.round(x); y = Math.round(y);
  const ala = arriba ? [[1, -1], [2, -2], [3, -2]] : [[1, 0], [2, 1], [3, 1]];
  for (const d of [-1, 1]) ala.forEach(([i, j], n) => { for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(x + d * i * s + a * d, y + j * s + b, n === 2 ? G : B); });
  pset(x, y, B); pset(x, y + 1, G); if (s > 1) { pset(x + 1, y, B); pset(x, y - 1, B); pset(x + 1, y + 1, hex('#e8a838')); }
}

// una figurita de fondo (8–10 px): o.ropa, o.tocado ('turbante' | 'gorro' | 'nada'), o.anda, o.dir, o.carga (un saco
// al hombro), o.lanza (guardia); respeta R.recorte
function c_figurita(R, x, yS, t, o = {}) {
  const { pset } = R, P = c_P, dir = o.dir ?? 1, k = o.k ?? 0, ropa = o.ropa ?? P.rojo, ropaS = o.ropaS ?? c_mez(ropa, P.k, 0.35), calza = o.calzas ?? P.marfilS;
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, y = Math.round(yS - (o.anda && paso ? 1 : 0) - (!o.anda && Math.sin(t * 2 + k) > 0.8 ? 1 : 0) * 0); x = Math.round(x);
  const sp = (i, j, c) => pset(x + i * dir, y + j, c);
  if (o.anda) { sp(paso ? -2 : -1, -1, calza); sp(paso ? 1 : 2, -1, calza); sp(-1, -2, calza); sp(1, -2, calza); } else { sp(-1, -1, calza); sp(1, -1, calza); sp(-1, -2, calza); sp(1, -2, calza); }
  for (let j = -7; j <= -3; j++) for (let i = -1; i <= 1; i++) sp(i, j, i === 1 || j === -3 ? ropaS : ropa);
  if (o.faja) for (let i = -1; i <= 1; i++) sp(i, -4, o.faja);
  const brazo = o.anda ? (paso ? 1 : 0) : 0; sp(-2, -6 + brazo, ropaS); sp(-2, -5 + brazo, P.piel); sp(2, -6 - brazo, ropaS); sp(2, -5 - brazo, P.piel);
  for (let j = -10; j <= -8; j++) for (let i = -1; i <= 1; i++) sp(i, j, i === -1 && j === -8 ? P.pielS : P.piel);
  sp(1, -9, P.k);
  if (o.tocado === 'turbante') { for (let i = -2; i <= 2; i++) sp(i, -11, P.marfil); for (let i = -1; i <= 1; i++) sp(i, -12, P.azB); sp(2, -10, P.marfilS); sp(-2, -10, P.marfilS); if (o.copa) sp(0, -13, o.copa); }
  else if (o.tocado === 'gorro') { for (let i = -1; i <= 1; i++) { sp(i, -11, P.rojo); } sp(0, -12, P.rojoS); }
  else for (let i = -1; i <= 1; i++) sp(i, -11, hex('#2a1c14'));
  if (o.carga) { for (let j = -13; j <= -10; j++) for (let i = 1; i <= 4; i++) if (Math.hypot(i - 2.5, j + 11.5) < 2.2) sp(i, j, (i + j) % 3 ? P.ocre : P.ocreS); }
  if (o.lanza) { for (let j = -16; j <= -1; j++) sp(3, j, P.madS); sp(3, -17, P.plomoL); sp(3, -18, P.plomoL); sp(2, -16, P.plomo); sp(4, -16, P.plomo); }
}

// LA GALERA otomana de perfil, a escala s (1: unos 150 px de eslora), con la proa hacia dir; yw: la línea de flotación.
// o.vela 'recogida' (por omisión, la vela latina aferrada a la entena) | 'izada'; o.remos 'alzados' (amarrada) | 'boga';
// o.gente (cabezas de marineros en cubierta que se mueven); o.franja (el color de la cinta pintada); o.viento (−1 / 1:
// hacia dónde ondean las banderas); o.sem (desfase). Todo con poligono, linea, pset y disco: respeta R.recorte.
// Devuelve la función P(u, v) del casco (u 0 popa → 120 proa; v hacia arriba desde la flotación)
function c_galera(R, x, yw, s, dir, t, o = {}) {
  const { poligono, linea, pset, disco } = R, P = c_P, K = P.k, sem = o.sem ?? 0, viento = o.viento ?? -1;
  const bob = Math.sin(t * 1.3 + sem) * 0.5 * Math.min(1.6, s + 0.3), cab = Math.sin(t * 0.9 + sem) * 0.006;
  const Pt = (u, v) => [x + dir * (u - 60) * s, yw + bob - v * s - (u - 60) * cab * s];
  const poli = (pts, c) => poligono(pts.map(([u, v]) => Pt(u, v)), c);
  const lin = (u0, v0, u1, v1, c, g = 0) => { const [a, b] = Pt(u0, v0), [cc, d] = Pt(u1, v1); linea(Math.round(a), Math.round(b), Math.round(cc), Math.round(d), c); if (g) linea(Math.round(a) + 1, Math.round(b), Math.round(cc) + 1, Math.round(d), c); };
  const pt = (u, v, c) => { const [a, b] = Pt(u, v); pset(Math.round(a), Math.round(b), c); };
  const g = s >= 1.1 ? 1 : 0, franja = o.franja ?? P.rojo;
  // el palo, la jarcia, la entena con la vela y las banderas (detrás del casco)
  const mast = o.palo ?? 64, alto = o.altoPalo ?? 72;
  lin(mast, 8, 6, 14, P.cuerda); lin(mast, alto - 2, 118, 10, P.cuerda); lin(mast, alto - 6, mast - 10, 8, P.cuerda); lin(mast, alto - 6, mast + 10, 8, P.cuerda);
  if (s > 1.4) for (let k = 1; k < 8 && 8 + k * 7 < alto - 8; k++) { const v = 8 + k * 7; lin(mast - 10 + k * 1.2, v, mast + 10 - k * 1.2, v, c_mez(P.cuerda, P.k, 0.2)); }
  lin(mast, 6, mast, alto, P.madS, g); lin(mast, 6, mast, alto, P.mad); if (g) { const [a, b] = Pt(mast, alto); disco(a, b, 1.6 * s, P.madS); }
  // la cofa (o.cofa): la canasta de tablas en lo alto del palo, con su borde claro
  if (o.cofa) { poli([[mast - 4, alto - 7], [mast + 4, alto - 7], [mast + 3, alto - 11], [mast - 3, alto - 11]], (px, py) => ((Math.round(px) & 1) ? P.madS : P.mad)); lin(mast - 4, alto - 7, mast + 4, alto - 7, P.madL); lin(mast - 3, alto - 11, mast + 3, alto - 11, P.madD); }
  const [yL, yH] = o.entena ?? [[110, 22], [18, 88]];
  if (o.vela === 'izada') {
    const b = Math.sin(t * 1.7 + sem) * 1.5;
    poli([yL, yH, [46 + b, 12]], (px, py) => { const q = (px * 3 + py * 5) % Math.max(3, Math.round(6 * s)); return q === 0 ? P.velaS : P.vela; });
    lin(yL[0], yL[1], 46 + b, 12, P.velaS); lin(yH[0], yH[1], 46 + b, 12, P.velaS);
    if (o.cruz) { const [a, c] = Pt(64, 40); disco(a, c, 3 * s, o.cruz); }
  }
  lin(yL[0], yL[1], yH[0], yH[1], P.madD, g);
  if (o.vela !== 'izada') { const n = Math.max(12, Math.round(Math.hypot(yH[0] - yL[0], yH[1] - yL[1]) * s / 1.2));
    for (const capa of [0, 1]) for (let k = 0; k <= n; k++) { const u = yL[0] + (yH[0] - yL[0]) * k / n, v = yL[1] + (yH[1] - yL[1]) * k / n - 1.2, gr = (1.1 + Math.sin(k * 0.35) * 0.35) * Math.max(0.7, s * 0.85);
      const [a, b] = Pt(u, v); if (capa === 0) disco(a, b + 0.8, gr, P.velaS); else disco(a - 0.4, b - 0.4, gr * 0.75, P.vela); }
    for (let k = 1; k < 9; k++) { const u = yL[0] + (yH[0] - yL[0]) * k / 9, v = yL[1] + (yH[1] - yL[1]) * k / 9 - 1.2, [a, b] = Pt(u, v), r = Math.max(1, Math.round(s)); linea(Math.round(a) - r, Math.round(b) - r, Math.round(a) + r, Math.round(b) + r, P.cuerda); } }
  // la grímpola en el tope del palo y la bandera de popa, que ondean
  const ondea = (u0, v0, largo, ancho, c, cS) => { const [a, b] = Pt(u0, v0); for (let i = 0; i <= largo * s; i++) { const w = Math.max(0.5, ancho * s * (1 - i / (largo * s + 1) * 0.7)), yy = b + Math.sin(t * 7 - i * 0.45 + sem) * Math.min(2, 0.6 + i * 0.08) * Math.min(1.5, s);
    for (let j = -w; j <= w; j += 0.7) pset(Math.round(a + viento * i), Math.round(yy + j), j > w * 0.4 ? cS : c); } };
  ondea(mast, alto + 1, 26, 1.4, o.bandera ?? P.rojo, P.rojoS);
  lin(4, 14, 2, 34, P.madS); ondea(2, 33, 14, 3, o.bandera ?? P.rojo, P.rojoS);
  // los remos de la banda de allá asoman por encima de la borda
  // el casco: obra muerta, la cinta pintada, la obra viva mojada; la regala con sus candeleros
  poli([[2, 12], [14, 8.5], [100, 7.5], [112, 9.5], [115, 6], [106, 0], [94, -3], [20, -3], [6, 1]], (px, py) => {
    const v = (yw + bob - py) / s; if (v > 7) return P.madL; if (v > 4.2) return ((px + py) % 5 === 0 && s > 1) ? P.oro : franja; if (v > 3.4) return P.madD;
    if (v < -1) return c_mez(P.madS, P.mar3, 0.4); return (s > 1.2 && Math.round(py) % 3 === 0) ? P.madS : P.mad; });
  lin(2, 12, 14, 8.5, K); lin(14, 8.5, 100, 7.5, K); lin(100, 7.5, 112, 9.5, K); lin(112, 9.5, 115, 6, K); lin(115, 6, 106, 0, K); lin(6, 1, 2, 12, K);
  for (let u = 18; u < 100; u += 6) lin(u, 8.2, u, 10, P.madS);
  lin(16, 10, 100, 9, P.madS);
  // la carroza de popa: el toldo rojo con el filete de oro, la barandilla y el fanal
  poli([[0, 12], [16, 10], [16, 13], [0, 15]], P.madS); for (let u = 1; u < 16; u += 3) lin(u, 13, u, 18, P.madD);
  poli([[-1, 18], [17, 17], [14, 23], [2, 24]], (px, py) => ((px + py) % 4 === 0 ? P.rojoS : P.rojo)); lin(-1, 18, 17, 17, P.oro); lin(2, 24, 14, 23, P.oroS);
  lin(0, 15, -1, 30, P.madD); { const [a, b] = Pt(-1, 31); disco(a, b, Math.max(1, 1.6 * s), P.oroS); disco(a, b, Math.max(0.6, 1 * s), Math.sin(t * 9 + sem) > -0.3 ? P.llama : P.llamaS); }
  // el espolón de proa y el bauprés
  lin(112, 7, 128, 5, K, g); lin(112, 7.5, 127, 5.5, P.madS); lin(113, 9, 124, 15, P.madD);
  // los remos: alzados como un peine (amarrada) o bogando, con su salpicadura
  for (let u = 22; u <= 96; u += s > 1.5 ? 5 : 7) {
    if (o.remos === 'boga') { const f = t * 2.4 + sem, a = Math.sin(f), up = Math.cos(f); const tip = [u - 6 + a * 5, -3 + up * 2]; lin(u, 5, tip[0], tip[1], P.madL);
      if (up < -0.6) { const [ax, ay] = Pt(tip[0], -1); pset(Math.round(ax), Math.round(ay), P.espuma); pset(Math.round(ax) + 1, Math.round(ay), P.espuma); } }
    else { lin(u, 5, u - 7, 17, P.madL, s > 1.6 ? 1 : 0); lin(u - 7, 17, u - 8.5, 19.5, P.madS, s > 1.6 ? 1 : 0); }
  }
  // los marineros en cubierta: cabezas con el gorro rojo o el turbante que van y vienen
  if (o.gente !== false && s >= 0.4) for (let k = 0; k < 6; k++) { const u = 26 + k * 13 + Math.sin(t * 0.5 + k * 1.7 + sem) * 4, [a, b] = Pt(u, 11.5);
    const r = Math.max(0.8, 1.1 * s); disco(a, b, r, P.piel); disco(a, b - r * 0.9, r * 0.9, k % 2 ? P.rojo : P.marfil); if (s > 1.4) { pset(Math.round(a + dir), Math.round(b), P.k); } }
  // el reflejo del casco en el agua
  for (let u = 8; u < 112; u += 2) { const [a, b] = Pt(u, -2.5); if (Math.sin(u * 0.7 + t * 3) > -0.2) pset(Math.round(a), Math.round(b + 1 + (u % 4 ? 0 : 1)), P.mar4); }
  return Pt;
}

// un barquito de pescadores con dos que reman y la red por la borda
function c_barca(R, x, yw, t, s = 1, dir = 1) {
  const { poligono, pset, linea } = R, P = c_P, b = Math.sin(t * 2 + x) * 0.6;
  poligono([[x - 9 * s, yw - 3 * s + b], [x + 9 * s, yw - 3 * s + b], [x + 7 * s, yw + b], [x - 7 * s, yw + b]], P.mad); linea(Math.round(x - 9 * s), Math.round(yw - 3 * s + b), Math.round(x + 9 * s), Math.round(yw - 3 * s + b), P.madL);
  for (const [i, c] of [[-3, P.rojo], [3, P.marfil]]) { const px = Math.round(x + i * s), py = Math.round(yw - 4 * s + b); pset(px, py, P.indigo); pset(px, py - 1, P.piel); pset(px, py - 2, c);
    const a = Math.sin(t * 2.5 + i); linea(px, py, Math.round(px - dir * (4 + a * 2) * s), Math.round(yw + 1 + b), P.madL); }
  for (let i = 0; i < 4; i++) pset(Math.round(x + dir * (8 + i) * s), Math.round(yw + b + (i % 2)), P.marfilS);
}

// el agua tramada en la caja (lejos más clara), sin vida: para los fondos fijos
function c_aguaFija(R, x0, y0, x1, y1) {
  const P = c_P; c_degradado(R, x0, y0, x1, y1, [P.mar0, P.mar1, P.mar2, P.mar3]);
}

// la vida del agua: rayas de oleaje que se mueven (más largas cerca), brillos que titilan y, si hay sol, su reguero
function c_olas(R, t, x0, y0, x1, y1, n = 40, sol = null, sem = 0) {
  const P = c_P, W = x1 - x0;
  for (let k = 0; k < n; k++) { const f = h(k, 1, sem), y = Math.round(y0 + f * f * (y1 - y0)), cerca = (y - y0) / Math.max(1, y1 - y0), L = 2 + Math.round(cerca * 9 * h(k, 2, sem)) + 1;
    const x = x0 + (((h(k, 3, sem) * W + t * (2 + cerca * 4) * (k % 2 ? 1 : -0.6)) % W) + W) % W, on = Math.sin(t * 2 + k) > -0.6;
    if (!on) continue; R.linea(Math.round(x), y, Math.round(x + L), y, cerca > 0.5 ? P.mar0 : P.marL); if (cerca > 0.4) R.linea(Math.round(x + 1), y + 1, Math.round(x + L - 1), y + 1, P.mar4); }
  if (sol) for (let y = y0; y <= y1; y++) { const w = 2 + (y - y0) * 0.18; for (let i = 0; i < 3; i++) { const x = Math.round(sol[0] + (h(y, i, Math.floor(t * 5)) - 0.5) * w * 2); if (h(x, y, Math.floor(t * 6)) > 0.45) R.pset(x, y, sol[1]); } }
}

// la orilla de enfrente (la costa asiática de los Dardanelos): lomas en dos tonos, pueblecitos blancos, cipreses y un
// castillo, entre x0 y x1 con la base en yb
function c_orilla(R, x0, x1, yb, alto, tarde) {
  const P = c_P, L1 = tarde ? hex('#b494a4') : P.lejos1, L2 = tarde ? hex('#9a7a94') : P.lejos2, L0 = tarde ? hex('#d0aab0') : P.lejos0;
  for (let x = x0; x <= x1; x++) { const a = yb - alto * (0.55 + 0.45 * Math.sin(x * 0.045 + 1) * Math.sin(x * 0.017)) - 2; for (let y = Math.round(a) - 6; y <= yb; y++) if (y < a) { if (y > a - 5 && h(x, y, 31) > 0.6) R.pset(x, y, L0); } else R.pset(x, y, y < a + 2 ? L0 : L1); }
  for (let x = x0; x <= x1; x++) { const a = yb - alto * 0.38 * (0.6 + 0.4 * Math.sin(x * 0.09 + 2)); for (let y = Math.round(a); y <= yb; y++) R.pset(x, y, (x + y) % 7 === 0 ? L1 : L2); }
  for (let k = 0; k < (x1 - x0) / 9; k++) { const x = Math.round(x0 + 4 + k * 9 + h(k, 1, 33) * 5), y = Math.round(yb - 2 - h(k, 2, 33) * alto * 0.25); if (x > x1 - 2) break;
    if (h(k, 3, 33) > 0.45) { R.pset(x, y, hex('#f4f0e6')); R.pset(x + 1, y, hex('#e8e0d0')); R.pset(x, y - 1, P.teja); } else { R.pset(x, y, P.cipres); R.pset(x, y - 1, P.cipres); } }
}

// la ventana de arco apuntado: el hueco (xa–xb, arranque del arco en ys, vértice arriba) y el alféizar
const c_VENT = { xa: 22, xb: 96, ys: 70, sill: 106, top: 24, xv: 90 };

// ¿está (x, y) dentro del hueco del arco apuntado? (dos círculos que se cortan)
function c_enArco(x, y, xa, xb, ys, f = 0.62) {
  if (x < xa || x > xb) return false; if (y >= ys) return true;
  const r = (xb - xa) * f; return Math.hypot(x + 0.5 - (xa + r), y + 0.5 - ys) <= r && Math.hypot(x + 0.5 - (xb + 1 - r), y + 0.5 - ys) <= r;
}

// el taller por dentro (fondo fijo): techo de tablas con las cabezas de las vigas, la pared encalada con su textura,
// desconchones de ladrillo y grietas, el zócalo de azulejos de İznik, el suelo de tablas en perspectiva con el kilim,
// la ventana de arco con su marco de dovelas, celosías abiertas y alféizar con la albahaca, el diván con cojines, la carta
// colgada, el astrolabio en su clavo, la alacena con rollos, libros y botes de pigmento, cestos de rollos, el arcón y la
// mancha de sol en el suelo
function c_tallerFijo(R, tarde) {
  const { rect, pset, linea, poligono, disco } = R, P = c_P, K = P.k, V = c_VENT;
  // el techo: tablas con vetas y las cabezas de las vigas que vienen hacia nosotros
  for (let y = 0; y <= 17; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 2, 1); pset(x, y, x % 9 === 0 ? P.vigaS : n > 0.82 ? P.vigaL : n < 0.12 ? P.vigaS : P.viga); }
  for (let bx = 14; bx < 320; bx += 42) { rect(bx - 6, 11, bx + 6, 18, P.vigaS); rect(bx - 5, 11, bx + 5, 16, P.vigaL); rect(bx - 5, 11, bx + 5, 11, c_mez(P.vigaL, P.yesoL, 0.25)); for (let k = 0; k < 3; k++) linea(bx - 3 + k * 3, 12, bx - 2 + k * 3, 15, P.viga); rect(bx - 5, 17, bx + 5, 18, K); }
  rect(0, 18, 319, 18, K); rect(0, 19, 319, 20, P.vigaS);
  // la pared encalada: grano de la llana, sombra arriba y en las esquinas, manchas de humedad
  for (let y = 21; y <= 110; y++) for (let x = 0; x < 320; x++) {
    const n = h(x >> 1, y >> 1, 2) * 0.45 + h(x, y, 3) * 0.25 + h(x >> 3, y >> 3, 4) * 0.3, sombra = Math.max(0, 1 - (y - 21) / 26) * 0.42 + Math.max(0, 1 - x / 34) * 0.3 + Math.max(0, (x - 286) / 34) * 0.25;
    const v = n - sombra; pset(x, y, v > 0.74 ? P.yesoL : v > 0.4 ? P.yeso : v > 0.14 ? P.yesoM : P.yesoS); }
  // los desconchones con el ladrillo debajo
  for (const [cx, cy, rx, ry] of [[112, 96, 8, 5], [196, 104, 10, 4], [10, 48, 5, 8]]) for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x, y, 5) - 0.5) * 0.5; if (d > 1.25) continue;
    if (d > 0.95) pset(x, y, y < cy ? P.yesoD : P.yesoL); else pset(x, y, y % 3 === 0 || (x + (Math.floor(y / 3) % 2) * 4) % 8 === 0 ? P.yesoS : h(x >> 2, y, 6) > 0.5 ? P.ladr : P.ladrS); }
  // grietas finas
  for (const [x0, y0, n, k] of [[188, 22, 16, 1], [6, 70, 12, 2], [262, 21, 9, 3]]) { let x = x0; for (let y = y0; y < y0 + n; y++) { x += h(y, k, 7) > 0.66 ? 1 : h(y, k, 7) < 0.33 ? -1 : 0; pset(x, y, P.yesoD); if (h(y, k, 8) > 0.7) pset(x + 1, y, P.yesoS); } }
  // el zócalo de azulejos: dos hileras con la roseta turquesa, el rombo azul y los cuartos de flor en las esquinas
  rect(0, 109, 319, 109, P.madL); rect(0, 110, 319, 110, P.mad); rect(0, 111, 319, 112, P.madD);
  for (let y = 113; y <= 130; y++) for (let x = 0; x < 320; x++) { const i = x % 9, j = (y - 113) % 9;
    let c; if (i === 0 || j === 0) c = P.junta; else { const a = Math.abs(i - 4.5), b = Math.abs(j - 4.5), d = a + b;
      c = d <= 1 ? P.tur : d <= 2 ? P.azB : d <= 3 ? P.az : (a >= 3 && b >= 3) ? P.azL : d >= 6.5 ? P.az : P.azB;
      if (c === P.azB && (h(x >> 3, y >> 3, 9) > 0.8 || j === 8)) c = P.azBS; if (i === 2 && j === 1) c = hex('#ffffff'); }
    pset(x, y, c); }
  rect(0, 131, 319, 131, P.madD);
  // el suelo de tablas, que fugan hacia el centro, con juntas, vetas y la sombra junto a la pared
  for (let y = 132; y < 180; y++) { const d = y - 56; for (let x = 0; x < 320; x++) {
    const u = (x - 160) / d * 7.5, b = Math.floor(u), f = u - b, jy = (y + Math.floor(h(b, 1, 10) * 30)) % 26;
    let c = [P.mad, P.madL, P.mad, P.veta][Math.floor(h(b, 2, 10) * 4)]; if (f < 0.07 || jy === 0) c = P.madD; else if (h(Math.floor(u * 5), y >> 1, 11) > 0.86) c = P.veta; else if (f > 0.9) c = P.madS;
    if (y < 136) c = c_mez(c, P.k, 0.35); pset(x, y, c); } }
  // el kilim: cenefa índigo con zigzag, filete ocre, campo rojo con tres rombos ganchudos y estrellitas; flecos y desgaste
  for (let y = 146; y <= 177; y++) { const v = (y - 146) / 31, l = Math.round(48 - v * 22), r = Math.round(272 + v * 22);
    for (let x = l - 3; x <= r + 3; x++) { const u = (x - l) / (r - l);
      if (x < l || x > r) { if ((y & 1) === 0) pset(x, y, P.marfilS); continue; }
      let c = P.rojo; const bu = Math.min(u, 1 - u) * 224, bv = Math.min(v, 1 - v) * 31;
      if (bu < 9 || bv < 4) c = (x + y * 2) % 6 === 0 || (x - y * 2) % 6 === 0 ? P.marfil : P.indigo; else if (bu < 10.5 || bv < 5) c = P.ocre;
      else { for (const cu of [0.25, 0.5, 0.75]) { const cx = l + cu * (r - l), dd = Math.abs(x - cx) * 0.9 + Math.abs(y - 161.5) * 2.1;
          if (dd < 4) c = P.ocre; else if (dd < 8) c = P.indigo; else if (dd < 10) c = P.marfil; else if (dd < 13 && (Math.round(x - cx) + y) % 4 === 0) c = P.marfil; }
        if ((Math.abs(u - 0.375) < 0.012 || Math.abs(u - 0.625) < 0.012) && Math.abs(y - 161) < 4) c = P.verde; }
      if (c === P.rojo && h(x, y, 12) > 0.93) c = P.rojoL; if (c === P.rojo && h(x >> 1, y, 13) > 0.95) c = P.rojoS; pset(x, y, c); } }
  // la mancha de sol que entra por la ventana, con la sombra de la reja
  for (let y = 136; y < 172; y++) { const sk = (y - 136) * (tarde ? 1.6 : 0.9), xa = Math.round(104 + sk), xb = Math.round(150 + sk * 1.2);
    for (let x = xa; x <= xb; x++) { if (Math.abs(x - (xa + xb) / 2) < 1.2 || Math.abs(y - 154) < 1) continue; if (c_tr(x, y) < 0.55 + (x - xa > 2 && xb - x > 2 ? 0.3 : 0)) c_tinte(R, x, y, tarde ? hex('#ffc070') : hex('#fff2c8'), 0.32); } }
  // la ventana: el marco de dovelas que alternan, el intradós (el grueso del muro) y las jambas
  for (let y = V.top - 6; y <= V.sill; y++) for (let x = V.xa - 6; x <= V.xb + 6; x++) {
    if (c_enArco(x, y, V.xa, V.xb, V.ys)) { if (x > V.xv) pset(x, y, x === V.xv + 1 ? P.piedraD : h(x, y, 14) > 0.7 ? P.piedraM : P.piedraS); continue; }
    if (!c_enArco(x, y, V.xa - 6, V.xb + 6, V.ys, 0.6)) continue;
    let c; if (y < V.ys) { const ang = Math.atan2(y - V.ys, x - (V.xa + V.xb) / 2), seg = Math.floor((ang + Math.PI) / 0.21); c = seg % 2 ? P.piedraL : P.piedra; if (Math.abs(((ang + Math.PI) / 0.21) % 1) < 0.12) c = P.piedraS; }
    else { const b = Math.floor((y - V.ys) / 6); c = (b % 2 ? P.piedraL : P.piedra); if ((y - V.ys) % 6 === 0) c = P.piedraS; }
    if (h(x, y, 15) > 0.85) c = P.piedraM; pset(x, y, c); }
  for (let y = V.top - 6; y <= V.sill; y++) for (let x = V.xa - 7; x <= V.xb + 7; x++) if (c_enArco(x, y, V.xa - 7, V.xb + 7, V.ys, 0.6) && !c_enArco(x, y, V.xa - 6, V.xb + 6, V.ys, 0.6)) pset(x, y, P.piedraD);
  // la clave del arco
  rect(57, V.top - 9, 61, V.top - 3, P.piedraD); rect(58, V.top - 8, 60, V.top - 3, P.piedraL); pset(59, V.top - 6, P.piedraM);
  // las celosías abiertas a los lados, de madera con rombos
  for (const [x0, x1, alto] of [[4, 14, 1], [104, 114, -1]]) for (let y = 48; y <= 104; y++) { const pers = alto > 0 ? (x1 - 0) : 0;
    for (let x = x0; x <= x1; x++) { const top = 48 + (alto > 0 ? (x1 - x) : (x - x0)) * 0.5, bot = 104 - (alto > 0 ? (x1 - x) : (x - x0)) * 0.4; if (y < top || y > bot) continue;
      const e = x === x0 || x === x1 || y < top + 2 || y > bot - 2, red = ((x + y) % 4 === 0) || ((x - y + 400) % 4 === 0);
      pset(x, y, e ? P.madD : red ? P.madL : c_mez(P.yesoS, P.madD, 0.5)); } void pers; }
  // el alféizar de piedra con su sombra; la maceta de albahaca
  rect(V.xa - 8, V.sill, V.xb + 8, V.sill + 3, P.piedraL); rect(V.xa - 8, V.sill + 3, V.xb + 8, V.sill + 4, P.piedraS); rect(V.xa - 8, V.sill + 5, V.xb + 8, V.sill + 5, P.yesoD);
  rect(V.xa - 8, V.sill, V.xb + 8, V.sill, hex('#f4ead8'));
  { const px = 32, py = V.sill; poligono([[px - 5, py - 8], [px + 6, py - 8], [px + 4, py], [px - 3, py]], P.teja); rect(px - 6, py - 9, px + 6, py - 8, P.tejaL); linea(px + 4, py - 7, px + 3, py - 1, P.tejaS);
    for (let k = 0; k < 16; k++) { const a = h(k, 1, 16) * Math.PI - Math.PI, r = 3 + h(k, 2, 16) * 5; disco(px + Math.cos(a) * r * 0.9, py - 11 + Math.sin(a) * r * 0.6, 1.6, k % 3 ? P.hojaL : P.hoja); } }
  // el diván bajo la ventana: cojines de respaldo (rojo, índigo, verde) con brocado y borlas, el colchón a rayas y la base
  [[10, 40, P.rojo, P.rojoL, P.rojoS], [42, 72, P.indigo, P.indigoL, P.indigoS], [74, 104, P.verde, P.verdeL, P.verdeS]].forEach(([a, b, c, cL, cS], k) => {
    poligono([[a + 1, 111], [b - 1, 111], [b, 122], [a, 122]], K); poligono([[a + 2, 112], [b - 2, 112], [b - 1, 121], [a + 1, 121]], (x, y) => (y < 114 ? cL : x > b - 5 ? cS : (x + y) % 5 === 0 ? P.oro : (x - y + 300) % 5 === 0 ? cL : c));
    for (const xx of [a + 1, b - 1]) { pset(xx, 112, P.oro); pset(xx, 113, P.oroS); pset(xx, 122, P.oro); } void k; });
  rect(6, 121, 108, 126, K); rect(7, 122, 107, 125, P.marfil); for (let x = 7; x <= 107; x++) if (x % 6 < 2) { pset(x, 122, P.ocre); pset(x, 123, P.ocre); pset(x, 124, P.ocreS); } rect(7, 125, 107, 125, P.marfilS);
  rect(6, 126, 108, 137, K); rect(7, 127, 107, 136, P.madS); for (let k = 0; k < 6; k++) { const x = 10 + k * 17; rect(x, 128, x + 12, 135, P.madD); rect(x + 1, 129, x + 11, 135, P.mad); disco(x + 6.5, 130, 5, P.mad); rect(x + 1, 129, x + 11, 129, P.madL); }
  rect(6, 138, 110, 140, c_mez(P.madD, P.k, 0.3));
  // el astrolabio colgado de su clavo, entre la ventana y la carta
  pset(108, 40, K); linea(108, 41, 108, 44, P.cuerda); if (PIEZAS_PR.astrolabio) PIEZAS_PR.astrolabio(R, 108, 63); else disco(108, 54, 7, P.laton);
  rect(104, 64, 112, 65, c_mez(P.yesoS, P.yesoD, 0.5));
  // la carta grande colgada de su vara, con la sombra en la pared
  poligono([[122, 34], [180, 34], [181, 80], [170, 82], [150, 79], [130, 81], [123, 80]], P.yesoS);
  linea(146, 22, 120, 31, P.cuerda); linea(146, 22, 176, 31, P.cuerda); pset(146, 21, K); pset(146, 22, P.laton);
  poligono([[120, 33], [177, 33], [178, 78], [168, 80], [148, 77], [128, 79], [121, 78]], (x, y) => { const n = h(x >> 1, y >> 1, 17); return y > 74 || x < 122 || x > 175 ? P.pergS : n > 0.85 ? P.pergL : n < 0.1 ? P.pergS : P.perg; });
  c_cartaDibujo(R, 121, 34, 176, 76, 18);
  rect(117, 30, 180, 32, K); rect(118, 31, 179, 31, P.madL); disco(117, 31, 2, P.madD); disco(180, 31, 2, P.madD);
  // la alacena empotrada: cornisa tallada y tres baldas con rollos, libros apilados, botes de pigmento, un reloj de
  // arena y una esfera armilar
  rect(222, 46, 318, 110, K); rect(223, 47, 317, 108, P.madS); rect(220, 45, 319, 48, P.madD); rect(221, 46, 319, 46, P.madL); for (let x = 222; x < 320; x += 4) pset(x, 48, P.madL);
  for (const [y0, y1] of [[50, 69], [72, 89], [92, 106]]) { rect(226, y0, 314, y1, c_mez(P.madD, P.k, 0.45)); for (let y = y0; y <= y1; y++) for (let x = 226; x <= 314; x++) if (h(x, y, 19) > 0.9) pset(x, y, P.madD); rect(224, y1 + 1, 316, y1 + 2, P.madL); rect(224, y1 + 3, 316, y1 + 3, P.madD); }
  // balda 1: pirámide de rollos (cabos con la vuelta oscura) y el reloj de arena
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 6 - fila; k++) { const cx = 232 + k * 7 + fila * 3.5, cy = 66 - fila * 6; disco(cx, cy, 3.3, K); disco(cx, cy, 2.6, (k + fila) % 3 ? P.perg : P.pergS); pset(Math.round(cx), Math.round(cy), P.pergD); if ((k + fila) % 4 === 1) rect(Math.round(cx) - 1, Math.round(cy) - 3, Math.round(cx), Math.round(cy) + 3, P.rojo); }
  { const x = 284, y = 69; rect(x - 5, y - 15, x + 5, y - 14, P.madD); rect(x - 5, y - 1, x + 5, y, P.madD); for (const dx of [-4, 4]) rect(x + dx, y - 14, x + dx, y - 1, P.mad);
    poligono([[x - 3, y - 13], [x + 4, y - 13], [x + 1, y - 8], [x, y - 8]], hex('#d8eef0')); poligono([[x, y - 7], [x + 1, y - 7], [x + 4, y - 2], [x - 3, y - 2]], hex('#d8eef0')); rect(x - 1, y - 5, x + 2, y - 2, P.ocre); rect(x - 2, y - 13, x + 3, y - 11, P.ocre); }
  { const x = 302, y = 62; R.anillo(x, y, 6, P.laton); R.anillo(x, y, 4, P.latonS); linea(x - 6, y + 2, x + 6, y - 2, P.latonL); disco(x, y, 1.2, P.oroL); rect(x - 1, y + 6, x + 1, y + 7, P.latonS); rect(x - 3, y + 7, x + 3, y + 7, P.madD); }
  // balda 2: libros tumbados en pilas (piel roja, verde, parda, con la solapa) y botes de pigmento
  for (const [x0, n] of [[228, 5], [252, 3]]) for (let k = 0; k < n; k++) { const y = 89 - k * 3, w = 18 - (k % 2) * 3 - (k > 2 ? 2 : 0), c = [P.rojoS, P.verdeS, P.madD, P.indigoS, P.ocreS][(k + x0) % 5];
    rect(x0 + (k % 2), y - 2, x0 + (k % 2) + w, y, c); rect(x0 + (k % 2) + 1, y - 2, x0 + (k % 2) + w - 1, y - 2, c_mez(c, P.marfil, 0.3)); rect(x0 + (k % 2) + w - 1, y - 1, x0 + (k % 2) + w, y - 1, P.marfilS); }
  [[280, P.az], [288, P.rojo], [296, P.verde], [304, P.ocre]].forEach(([x, c]) => { rect(x - 3, 81, x + 3, 89, K); rect(x - 2, 82, x + 2, 89, P.marfil); rect(x - 2, 84, x + 2, 87, c); pset(x - 2, 82, hex('#ffffff')); rect(x - 2, 79, x + 2, 80, P.madL); });
  rect(266, 87, 274, 89, P.latonS); rect(265, 86, 275, 86, P.laton); pset(268, 86, P.latonL);
  // balda 3: rollos grandes de pie, una caja de compases y una jarra
  for (let k = 0; k < 7; k++) { const x = 230 + k * 5, y0 = 94 + (k % 3) * 2; rect(x - 2, y0, x + 2, 106, K); rect(x - 1, y0 + 1, x + 1, 106, k % 2 ? P.perg : P.pergS); rect(x - 1, y0, x + 1, y0, P.pergD); if (k % 3 === 0) rect(x - 1, 100, x + 1, 101, P.rojo); }
  rect(268, 98, 290, 106, K); rect(269, 99, 289, 106, P.mad); rect(269, 99, 289, 100, P.madL); rect(277, 102, 280, 104, P.laton);
  { const x = 302; poligono([[x - 5, 106], [x + 5, 106], [x + 6, 99], [x + 3, 94], [x - 3, 94], [x - 6, 99]], P.tur); rect(x - 2, 92, x + 2, 94, P.turL); linea(x - 4, 98, x + 4, 98, P.az); linea(x - 4, 102, x + 4, 102, P.az); pset(x - 3, 96, hex('#ffffff')); }
  // los cestos de mimbre con cartas enrolladas, junto a la pared
  { const x0 = 112, x1 = 136; for (let k = 0; k < 6; k++) { const xx = x0 + 3 + k * 4, top = 106 + (k % 3) * 4 - (k === 2 ? 4 : 0); linea(xx, top, xx + (k % 2 ? 1 : -1), 130, K); rect(xx - 1, top + 1, xx + 1, 130, k % 2 ? P.perg : P.pergL); disco(xx, top, 1.6, P.pergS); pset(xx, top, P.pergD); if (k === 1 || k === 4) rect(xx - 1, top + 6, xx + 1, top + 7, P.rojo); }
    poligono([[x0, 126], [x1, 126], [x1 - 2, 148], [x0 + 2, 148]], (x, y) => (((x >> 1) + (y >> 1)) % 2 ? P.ocre : P.ocreS)); rect(x0 - 1, 125, x1 + 1, 128, P.madS); rect(x0 - 1, 125, x1 + 1, 125, P.ocre); rect(x0 + 2, 147, x1 - 2, 149, c_mez(P.madD, P.k, 0.4)); }
  // el arcón (sandık) con flejes de latón, con dos libros y un paño encima
  rect(268, 128, 316, 154, K); rect(269, 129, 315, 153, P.mad); rect(269, 129, 315, 131, P.madL); rect(269, 136, 315, 136, P.madD);
  for (let y = 132; y < 153; y++) for (let x = 270; x < 315; x++) if (h(x >> 2, y, 20) > 0.84) pset(x, y, P.veta);
  for (const x of [274, 309]) rect(x, 129, x + 2, 153, P.latonS); for (const x of [274, 309]) rect(x, 129, x, 153, P.laton); rect(289, 138, 294, 143, P.latonS); rect(290, 139, 293, 142, P.laton); pset(291, 141, K);
  rect(272, 122, 296, 127, K); rect(273, 123, 295, 124, P.verdeS); rect(273, 125, 295, 126, P.rojoS); rect(274, 122, 294, 122, P.marfilS);
  poligono([[298, 128], [314, 128], [312, 124], [302, 123]], P.indigo); for (let x = 300; x < 313; x += 3) pset(x, 127, P.oro);
  rect(266, 155, 318, 157, c_mez(P.madD, P.k, 0.35));
  // una repisa de madera en la pared con un aguamanil de latón, un cuenco de tinta roja y un rollo atado
  rect(176, 84, 216, 87, K); rect(177, 84, 215, 85, P.madL); rect(177, 86, 215, 86, P.madS); for (const x of [180, 212]) { poligono([[x - 2, 88], [x + 2, 88], [x, 94]], P.madS); }
  rect(178, 88, 216, 89, c_mez(P.yesoS, P.yesoD, 0.4));
  { const x = 186, y = 84; poligono([[x - 4, y], [x + 4, y], [x + 5, y - 5], [x + 2, y - 10], [x - 2, y - 10], [x - 5, y - 5]], P.latonS); poligono([[x - 3, y - 1], [x + 3, y - 1], [x + 4, y - 5], [x + 1, y - 9], [x - 2, y - 9], [x - 4, y - 5]], P.laton); linea(x + 4, y - 6, x + 9, y - 11, P.latonS); pset(x - 2, y - 6, P.latonL); rect(x - 1, y - 12, x + 1, y - 10, P.latonS); }
  { const x = 200, y = 84; rect(x - 4, y - 3, x + 4, y - 1, K); rect(x - 3, y - 3, x + 3, y - 2, P.azB); rect(x - 2, y - 3, x + 2, y - 3, P.tRoja); }
  { const x = 210, y = 84; rect(x - 4, y - 4, x + 4, y - 1, K); rect(x - 3, y - 3, x + 3, y - 1, P.perg); rect(x - 1, y - 4, x, y - 1, P.rojo); disco(x - 4, y - 2, 1.5, P.pergS); }
  // la cadena de la lámpara, que baja del techo
  for (let y = 19; y < 40; y++) pset(200 + (y % 2), y, y % 3 ? P.latonS : P.laton);
}

// el dibujo de una carta (costas, rumbos, una rosa, islas, un barquito y garabatos) dentro de la caja; sem la varía
function c_cartaDibujo(R, x0, y0, x1, y1, sem) {
  const P = c_P, w = x1 - x0, hh = y1 - y0, dentro = (x, y) => x > x0 && x < x1 && y > y0 && y < y1, ps = (x, y, c) => { if (dentro(x, y)) R.pset(Math.round(x), Math.round(y), c); };
  const rx = x0 + w * (0.45 + h(1, 1, sem) * 0.1), ry = y0 + hh * 0.5;
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, c = k % 4 === 0 ? P.tinta : k % 2 ? P.tVerde : P.tRoja; for (let r = 4; r < w; r += k % 2 ? 3 : 2) ps(rx + Math.cos(a) * r, ry + Math.sin(a) * r, c); }
  // la costa de la izquierda (tierra con aguada verde) y la de la derecha (ocre)
  for (let y = y0 + 1; y < y1; y++) { const cx = x0 + w * 0.18 + Math.sin(y * 0.3 + sem) * 2 + Math.sin(y * 0.11) * 3; for (let x = x0 + 1; x < cx; x++) if ((x + y) % 2 === 0) ps(x, y, c_mez(P.perg, P.verdeL, 0.35)); ps(cx, y, P.tinta); ps(cx + 1, y, P.tAzul);
    const dx = x1 - w * 0.2 + Math.sin(y * 0.25 + sem * 2) * 2 + Math.cos(y * 0.09) * 4; for (let x = Math.ceil(dx); x < x1; x++) if ((x + y) % 2 === 0) ps(x, y, c_mez(P.perg, P.ocre, 0.35)); ps(dx, y, P.tinta); }
  // islas rojas y verdes
  for (let k = 0; k < 5; k++) { const ix = x0 + w * (0.3 + h(k, 2, sem) * 0.4), iy = y0 + hh * (0.15 + h(k, 3, sem) * 0.7); for (let j = -1; j <= 1; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) + Math.abs(j) < 3) ps(ix + i, iy + j, k % 2 ? P.tRoja : P.tVerde); }
  // la rosa de los vientos
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, L = k % 2 ? 3 : 5; for (let r = 0; r <= L; r++) ps(rx + Math.cos(a) * r, ry + Math.sin(a) * r, k % 2 ? P.tAzul : P.tRoja); } ps(rx, ry, P.oro);
  // un barquito y garabatos de tinta (las notas, sin letras)
  { const bx = x0 + w * 0.62, by = y0 + hh * 0.78; for (let i = -3; i <= 3; i++) ps(bx + i, by, P.tinta); for (let i = -2; i <= 2; i++) ps(bx + i, by + 1, P.tinta); for (let j = 1; j < 5; j++) ps(bx, by - j, P.tinta); for (let j = 1; j < 4; j++) for (let i = 1; i <= 4 - j; i++) ps(bx + i, by - j - 1, P.tRoja); }
  for (let k = 0; k < 4; k++) { const gx = x0 + w * (0.25 + h(k, 5, sem) * 0.5), gy = y0 + hh * (0.1 + h(k, 6, sem) * 0.8); for (let i = 0; i < 7; i++) ps(gx + i, gy + Math.round(Math.sin(i * 1.7 + k) * 0.8), P.pergD); }
}

// la vista del puerto por la ventana (dinámica): cielo, nubes, la orilla de enfrente, el agua que brilla, una galera
// amarrada, otra que pasa a vela, una barca de pescadores, gaviotas; todo recortado al hueco del arco y con la reja
function c_vistaVentana(R, t, tarde, fijo, o) {
  const P = c_P, V = c_VENT, cl = [V.xa, V.top, V.xv, V.sill - 1];
  R.recorte(cl);
  c_degradado(R, V.xa, V.top, V.xv, 62, c_CIELO[tarde ? 'tarde' : 'dia']);
  if (tarde) { R.disco(36, 54, 6, hex('#f8c070')); R.disco(36, 54, 4.5, hex('#fff0b0')); }
  c_nubes(R, t, V.xa - 20, V.top, V.xv + 20, 52, c_NUBE[tarde ? 'tarde' : 'dia'], 3, 41);
  c_orilla(R, V.xa, V.xv, 66, 9, tarde);
  for (let y = 66; y <= 102; y++) for (let x = V.xa; x <= V.xv; x++) { const u = (y - 66) / 36; R.pset(x, y, u + (c_tr(x, y) - 0.5) * 0.3 < 0.25 ? (tarde ? hex('#c09aa8') : P.mar0) : u < 0.55 ? (tarde ? hex('#8a7a9c') : P.mar1) : u < 0.8 ? P.mar2 : P.mar3); }
  c_olas(R, t, V.xa, 67, V.xv, 100, 22, tarde ? [36, hex('#ffe0a0')] : null, 3);
  c_galera(R, ((t * 3 + 40) % 110) + 6, 76, 0.24, -1, t, { vela: 'izada', remos: 'boga', gente: false, sem: 2, bandera: o.banderas ? P.verde : P.rojo });
  c_barca(R, 30 + ((t * 2.2) % 70), 88, t, 0.8, 1);
  c_galera(R, 54, 99, 0.5, -1, t, { sem: 5 });
  c_r(R, V.xa, 100, V.xv, 105, P.piedraM); R.linea(V.xa, 100, V.xv, 100, P.piedraL); for (let x = V.xa + 4; x < V.xv; x += 9) R.linea(x, 101, x, 105, P.piedraS);
  c_r(R, 76, 96, 78, 100, P.piedraD); c_r(R, 76, 95, 78, 95, P.piedra);
  for (let k = 0; k < 3; k++) { const gx = V.xa - 10 + ((t * (9 + k * 3) + k * 40) % 96), gy = 34 + k * 9 + Math.sin(t * 1.3 + k) * 4; c_gaviota(R, gx, gy, t, k); }
  R.recorte(null);
  // lo de fuera del arco vuelve a ser pared
  const B = R.buf; for (let y = V.top - 10; y < V.ys; y++) for (let x = V.xa; x <= V.xv; x++) if (!c_enArco(x, y, V.xa, V.xb, V.ys)) B[y * 320 + x] = fijo[y * 320 + x];
  // la reja de hierro
  for (const bx of [44, 68]) for (let y = V.top; y < V.sill; y++) if (c_enArco(bx, y, V.xa, V.xb, V.ys)) { R.pset(bx, y, P.k); R.pset(bx + 1, y, hex('#4a4040')); }
  for (let x = V.xa; x <= V.xv; x++) { R.pset(x, 70, P.k); R.pset(x, 71, hex('#4a4040')); }
}

// un gato atigrado que duerme en el alféizar: respira, mueve una oreja y la cola que cuelga se balancea
function c_gato(R, x, y, t) {
  const { pset, disco, linea } = R, P = c_P, N = hex('#d8883a'), NS = hex('#a8602a'), NL = hex('#f0b060'), r = Math.sin(t * 2.2) > 0 ? 1 : 0;
  const cola = Math.sin(t * 1.4) * 3; for (let k = 0; k <= 10; k++) { const cx = x + 13 + Math.sin(k * 0.3) * 1 + cola * (k / 10), cy = y + k; pset(Math.round(cx), Math.round(cy), k % 3 ? N : NS); pset(Math.round(cx) + 1, Math.round(cy), NS); }
  disco(x + 6, y - 3 - r * 0.3, 6 + r * 0.3, P.k); disco(x + 6, y - 3 - r * 0.3, 5.2 + r * 0.3, N);
  for (let k = 0; k < 4; k++) linea(x + 3 + k * 3, y - 7 - r, x + 2 + k * 3, y - 2, NS); disco(x + 5, y - 6, 1.5, NL);
  disco(x - 1, y - 3, 3.2, P.k); disco(x - 1, y - 3, 2.6, N); const oreja = Math.sin(t * 0.7) > 0.93 ? 1 : 0;
  pset(x - 3, y - 6 - oreja, N); pset(x - 3, y - 7 - oreja, P.k); pset(x + 1, y - 6, N); pset(x + 1, y - 7, P.k); linea(x - 3, y - 3, x - 2, y - 3, P.k); linea(x, y - 3, x + 1, y - 3, P.k); pset(x - 1, y - 2, hex('#e87a8a'));
  linea(x - 3, y, x + 11, y, P.k);
}

// la lámpara de aceite de latón que cuelga: tres cadenillas, el cuenco con su gallón y la llama que tiembla; devuelve
// la fuerza de la llama (para la luz)
function c_lamparaAceite(R, x, y, t) {
  const { pset, linea, poligono, disco } = R, P = c_P, f = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
  for (const dx of [-7, 0, 7]) linea(x, y - 10, x + dx, y - 3, P.latonS);
  disco(x, y - 10, 1.2, P.laton);
  poligono([[x - 9, y - 3], [x + 9, y - 3], [x + 7, y + 2], [x + 3, y + 5], [x - 3, y + 5], [x - 7, y + 2]], (px, py) => (py === y - 3 ? P.latonL : px > x + 3 ? P.latonS : (px + py) % 3 === 0 ? P.laton : px < x - 4 ? P.latonL : P.laton));
  linea(x - 9, y - 3, x + 9, y - 3, P.k); for (let k = -6; k <= 6; k += 3) pset(x + k, y, P.latonS);
  poligono([[x - 2, y + 5], [x + 2, y + 5], [x, y + 10]], P.latonS); pset(x, y + 10, P.oro);
  // las tres mechas con su llama
  for (const dx of [-6, 0, 6]) { const a = Math.round(Math.sin(t * 11 + dx) * 0.8), alto = Math.round(3 + f * 2 + (dx === 0 ? 1 : 0)); pset(x + dx, y - 4, P.k);
    for (let j = 1; j <= alto; j++) pset(x + dx + (j > 2 ? a : 0), y - 4 - j, j < 2 ? P.llamaS : j < alto ? P.llama : P.llamaL); pset(x + dx + 1, y - 5, P.llamaS); }
  return f;
}

// una luz cálida redonda (lámpara, vela) que tiñe lo que hay debajo
function c_luzCalida(R, cx, cy, r, f, col = hex('#ffcf7a'), a = 0.3) {
  for (let y = Math.max(0, cy - r); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) { const d = Math.hypot(x - cx, (y - cy) * 1.15) / r; if (d >= 1) continue; const k = (1 - d) * (1 - d) * a * f; if (k > 0.015) c_tinte(R, x, y, col, k); }
}

// EL TALLER, CONTRAPLANO (luz de tarde): la pared de la puerta, vista desde el lado de la ventana (que queda a nuestra
// espalda y echa su luz dorada en la pared). Mismo sitio de la mesa de Piri y del suelo que el plano general.
const c_PUERTA = { xa: 22, xb: 70, ys: 60, sill: 131 };

// el contraplano por dentro (fondo fijo): techo de tablas con las vigas, la pared encalada, la puerta de arco apuntado
// con dovelas y sus dos hojas de tablas claveteadas abiertas, el patio al atardecer por el hueco (cielo, el alminar a
// lo lejos, la tapia encalada encendida, el empedrado y la fuente), el perchero con el caftán y el zurrón, el kilim
// colgado de su vara, el casillero de rollos de cartas, la hornacina con el aguamanil, el zócalo de azulejos de estrella,
// el suelo de tablas con el felpudo de la puerta y la alfombra azul bajo la mesa, el brasero de latón y el arcón
function c_tallerPuertaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = c_P, K = P.k, D = c_PUERTA;
  // el techo: tablas con vetas y las cabezas de las vigas
  for (let y = 0; y <= 17; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 2, 81); pset(x, y, x % 11 === 0 ? P.vigaS : n > 0.82 ? P.vigaL : n < 0.12 ? P.vigaS : P.viga); }
  for (let bx = 30; bx < 320; bx += 48) { rect(bx - 6, 11, bx + 6, 18, P.vigaS); rect(bx - 5, 11, bx + 5, 16, P.vigaL); for (let k = 0; k < 3; k++) linea(bx - 3 + k * 3, 12, bx - 2 + k * 3, 15, P.viga); rect(bx - 5, 17, bx + 5, 18, K); }
  rect(0, 18, 319, 18, K); rect(0, 19, 319, 20, P.vigaS);
  // la pared encalada, más cálida (es la hora de la tarde), con su grano, sombra arriba y en las esquinas
  for (let y = 21; y <= 110; y++) for (let x = 0; x < 320; x++) {
    const n = h(x >> 1, y >> 1, 82) * 0.45 + h(x, y, 83) * 0.25 + h(x >> 3, y >> 3, 84) * 0.3, sombra = Math.max(0, 1 - (y - 21) / 26) * 0.42 + Math.max(0, (x - 290) / 30) * 0.25;
    const v = n - sombra; pset(x, y, v > 0.74 ? P.yesoL : v > 0.4 ? P.yeso : v > 0.14 ? P.yesoM : P.yesoS); }
  for (const [cx, cy, rx, ry] of [[160, 102, 9, 4], [96, 30, 5, 3]]) for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x, y, 85) - 0.5) * 0.5; if (d > 1.25) continue; if (d > 0.95) pset(x, y, y < cy ? P.yesoD : P.yesoL); else pset(x, y, y % 3 === 0 ? P.yesoS : h(x >> 2, y, 86) > 0.5 ? P.ladr : P.ladrS); }
  { let x = 204; for (let y = 22; y < 36; y++) { x += h(y, 4, 87) > 0.66 ? 1 : h(y, 4, 87) < 0.33 ? -1 : 0; pset(x, y, P.yesoD); } }
  // el zócalo de azulejos de estrella de ocho puntas (turquesa y verde sobre blanco)
  rect(0, 109, 319, 109, P.madL); rect(0, 110, 319, 110, P.mad); rect(0, 111, 319, 112, P.madD);
  for (let y = 113; y <= 130; y++) for (let x = 0; x < 320; x++) { const i = x % 9, j = (y - 113) % 9, a = Math.abs(i - 4.5), b = Math.abs(j - 4.5);
    let c = i === 0 || j === 0 ? P.junta : Math.max(a, b) < 1.6 || a + b < 2.6 ? P.tur : (a < 1 || b < 1) && a + b < 4.2 ? P.verde : a + b > 6.6 ? P.indigo : P.azB; if (c === P.azB && h(x >> 3, y >> 3, 88) > 0.8) c = P.azBS; if (i === 2 && j === 1) c = hex('#ffffff'); pset(x, y, c); }
  rect(0, 131, 319, 131, P.madD);
  // el suelo de tablas en perspectiva
  for (let y = 132; y < 180; y++) { const d = y - 56; for (let x = 0; x < 320; x++) {
    const u = (x - 150) / d * 7.5, b = Math.floor(u), f = u - b, jy = (y + Math.floor(h(b, 1, 89) * 30)) % 26;
    let c = [P.mad, P.madL, P.mad, P.veta][Math.floor(h(b, 2, 89) * 4)]; if (f < 0.07 || jy === 0) c = P.madD; else if (h(Math.floor(u * 5), y >> 1, 90) > 0.86) c = P.veta; else if (f > 0.9) c = P.madS;
    if (y < 136) c = c_mez(c, P.k, 0.35); pset(x, y, c); } }
  // el felpudo de esparto delante de la puerta y la alfombra azul (campo índigo, cenefa roja, medallón) bajo la mesa
  for (let y = 134; y <= 146; y++) { const l = Math.round(16 - (y - 134) * 0.6), r = Math.round(80 + (y - 134) * 0.6); for (let x = l; x <= r; x++) pset(x, y, (x + y) % 3 === 0 ? P.ocreS : (x - y + 300) % 4 === 0 ? hex('#e0c080') : P.ocre); pset(l - 1, y, P.ocreS); pset(r + 1, y, P.ocreS); }
  for (let y = 150; y <= 179; y++) { const v = (y - 150) / 29, l = Math.round(118 - v * 16), r = Math.round(298 + v * 16);
    for (let x = l; x <= r; x++) { const u = (x - l) / (r - l), bu = Math.min(u, 1 - u) * 196, bv = Math.min(v, 1) * 29;
      let c = P.indigo; if (bu < 7 || bv < 3) c = (x + y * 2) % 5 === 0 ? P.ocre : P.rojo; else if (bu < 8.5 || bv < 4) c = P.marfil;
      else { const dd = Math.abs(x - (l + r) / 2) * 0.5 + Math.abs(y - 166) * 1.6; if (dd < 6) c = P.rojo; else if (dd < 9) c = P.ocre; else if (dd < 11) c = P.marfil; else if ((x + y) % 7 === 0) c = P.indigoL; }
      if (c === P.indigo && h(x, y, 91) > 0.92) c = P.indigoS; pset(x, y, c); } }
  // la puerta: el marco de dovelas que alternan, la clave, las jambas y el umbral de piedra
  for (let y = 22; y <= D.sill; y++) for (let x = D.xa - 7; x <= D.xb + 7; x++) {
    if (c_enArco(x, y, D.xa, D.xb, D.ys)) continue;
    if (!c_enArco(x, y, D.xa - 6, D.xb + 6, D.ys, 0.6)) { if (c_enArco(x, y, D.xa - 7, D.xb + 7, D.ys, 0.6)) pset(x, y, P.piedraD); continue; }
    let c; if (y < D.ys) { const ang = Math.atan2(y - D.ys, x - (D.xa + D.xb) / 2), seg = Math.floor((ang + Math.PI) / 0.21); c = seg % 2 ? P.piedraL : hex('#c87a5a'); if (Math.abs(((ang + Math.PI) / 0.21) % 1) < 0.12) c = P.piedraS; }
    else { const b = Math.floor((y - D.ys) / 7); c = b % 2 ? P.piedraL : P.piedra; if ((y - D.ys) % 7 === 0) c = P.piedraS; }
    if (h(x, y, 92) > 0.86) c = P.piedraM; pset(x, y, c); }
  rect(44, 26, 48, 33, P.piedraD); rect(45, 27, 47, 33, P.piedraL);
  // el patio por el hueco, al atardecer: el cielo, el alminar y las cúpulas a lo lejos, la tapia encendida, el empedrado
  for (let y = 22; y <= D.sill; y++) for (let x = D.xa; x <= D.xb; x++) { if (!c_enArco(x, y, D.xa, D.xb, D.ys)) continue;
    let c; if (y < 92) { const u = (y - 30) / 62, cols = c_CIELO.tarde, q = Math.max(0, Math.min(3.999, u * 4)), i = Math.floor(q); c = q - i > c_tr(x, y) ? cols[Math.min(4, i + 1)] : cols[i]; }
    else if (y < 112) { c = (y === 92 ? hex('#fff0d0') : (x + (Math.floor(y / 3) % 2) * 3) % 7 === 0 ? hex('#e8b080') : hex('#f8d0a0')); if (x > 58) c = c_mez(c, hex('#a87a8a'), 0.45); }
    else { const bx = Math.floor((x + (Math.floor(y / 3) % 2) * 2) / 4); c = (y % 3 === 0 || (x + (Math.floor(y / 3) % 2) * 2) % 4 === 0) ? hex('#8a6a5a') : h(bx, y >> 1, 93) > 0.5 ? hex('#c89a7a') : hex('#b0826a'); }
    pset(x, y, c); }
  { const fx = 34; rect(fx - 1, 56, fx + 1, 92, hex('#9a7a9a')); rect(fx - 3, 70, fx + 3, 71, hex('#9a7a9a')); poligono([[fx - 2, 56], [fx + 2, 56], [fx, 48]], hex('#8a6a8a')); disco(54, 92, 9, hex('#a88aa0')); rect(44, 92, 64, 93, hex('#a88aa0')); pset(54, 82, hex('#b898a8')); }
  // la fuente de piedra del patio con su pilón
  rect(48, 116, 66, 124, K); rect(49, 117, 65, 123, P.piedraL); rect(49, 117, 65, 117, hex('#fff0d8')); rect(50, 119, 64, 120, hex('#6a8aa0')); rect(56, 106, 58, 116, P.piedra); rect(54, 104, 60, 106, P.piedraL);
  // las dos hojas de la puerta, abiertas hacia dentro: tablas con clavos de hierro y la aldaba
  for (const [x0, x1, lado] of [[2, 15, -1], [77, 92, 1]]) for (let y = 40; y <= 131; y++) { const persp = lado < 0 ? (x) => (x - x0) * 0.5 : (x) => (x1 - x) * 0.5;
    for (let x = x0; x <= x1; x++) { const top = 44 - persp(x), bot = 131 + persp(x) * 0.3; if (y < top || y > bot) continue; const e = x === x0 || x === x1 || y < top + 1;
      let c = e ? P.madD : (x - x0) % 4 === 0 ? P.madS : h(x, y >> 2, 94) > 0.8 ? P.madL : P.mad; if (!e && (y - 50) % 18 < 2) c = P.madS; if (!e && (y - 50) % 18 === 0 && (x - x0) % 4 === 2) c = hex('#4a4444'); pset(x, y, c); } }
  R.anillo(84, 86, 2.5, P.latonS); pset(84, 83, P.laton);
  // el perchero de madera con el caftán rojo colgado (con sus pliegues) y un zurrón de cuero
  rect(96, 46, 124, 48, K); rect(97, 46, 123, 47, P.madL); for (const px of [102, 116]) { rect(px, 48, px + 1, 51, P.madD); }
  poligono([[98, 50], [106, 50], [109, 92], [95, 92]], (x, y) => ((Math.round(x) % 4 === 0) ? P.rojoS : y < 56 ? P.rojoL : P.rojo)); linea(102, 52, 102, 90, P.rojoS); rect(95, 88, 109, 92, P.oroS); rect(96, 89, 108, 89, P.oro);
  poligono([[112, 52], [122, 52], [124, 70], [110, 70]], (x, y) => (y < 56 ? P.madL : (Math.round(x) + Math.round(y)) % 5 === 0 ? P.madS : P.mad)); linea(116, 50, 112, 52, P.cuerda); linea(116, 50, 122, 52, P.cuerda); rect(110, 60, 124, 61, P.madD); pset(117, 61, P.laton);
  // el kilim colgado de su vara: cenefa de zigzag, campo de rombos ganchudos, flecos abajo
  rect(132, 30, 190, 32, K); rect(133, 31, 189, 31, P.madL); disco(131, 31, 2, P.madD); disco(191, 31, 2, P.madD);
  for (let y = 33; y <= 98; y++) for (let x = 134; x <= 188; x++) { const bu = Math.min(x - 134, 188 - x), bv = Math.min(y - 33, 98 - y); let c;
    if (bu < 4 || bv < 4) c = ((x + y * 2) % 6 < 3) ? P.marfil : P.verdeS; else if (bu < 5 || bv < 5) c = P.ocre;
    else { const cy = (y - 38) % 20, dd = Math.abs(x - 161) * 0.8 + Math.abs(cy - 10) * 1.1; c = dd < 3 ? P.ocre : dd < 6 ? P.indigo : dd < 8 ? P.marfil : dd < 10 && (x + y) % 3 === 0 ? P.marfil : P.rojo; if (c === P.rojo && h(x, y, 95) > 0.92) c = P.rojoS; }
    pset(x, y, c); }
  for (let x = 134; x <= 188; x += 2) linea(x, 99, x, 102, P.marfilS); for (let y = 34; y < 98; y++) pset(189, y, c_mez(P.yesoS, P.k, 0.25));
  // el casillero de los rollos de cartas: seis filas de casillas con los cabos de los rollos (y alguno con cinta roja)
  rect(206, 44, 272, 108, K); rect(207, 45, 271, 107, P.madS); rect(204, 42, 274, 45, P.madD); rect(205, 42, 273, 42, P.madL);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const x0 = 209 + c * 10.5, y0 = 47 + r * 10, xi = Math.round(x0), yi = Math.round(y0); rect(xi, yi, xi + 8, yi + 8, c_mez(P.madD, K, 0.5));
    const n = 1 + Math.floor(h(r, c, 96) * 3); for (let k = 0; k < n; k++) { const cx = xi + 2 + k * 2.6 + (k % 2), cy = yi + 5 - (k % 2) * 2; disco(cx, cy, 2.1, K); disco(cx, cy, 1.6, h(r + k, c, 97) > 0.4 ? P.perg : P.pergS); pset(Math.round(cx), Math.round(cy), P.pergD); if (h(r, c + k, 98) > 0.8) pset(Math.round(cx) + 1, Math.round(cy) - 1, P.rojo); } }
  for (let r = 0; r <= 6; r++) rect(207, 46 + r * 10, 271, 46 + r * 10, P.mad); for (let c = 0; c <= 6; c++) rect(208 + Math.round(c * 10.5), 45, 208 + Math.round(c * 10.5), 107, P.mad);
  rect(206, 108, 272, 109, c_mez(P.madD, P.k, 0.3));
  // la hornacina de arco en la pared de la derecha, con el aguamanil de latón y un cuenco (la vela va en vivo)
  for (let y = 56; y <= 98; y++) for (let x = 282; x <= 312; x++) { const d = y >= 70 ? Math.abs(x - 297) : Math.hypot(x - 297, y - 70); if (d > 15) continue; pset(x, y, d > 13.5 ? P.yesoD : c_mez(P.yesoS, P.k, 0.15 + (98 - y) / 200)); }
  rect(282, 98, 312, 100, P.piedraL); rect(282, 101, 312, 101, P.piedraS);
  { const x = 290, y = 98; poligono([[x - 4, y], [x + 4, y], [x + 5, y - 5], [x + 2, y - 10], [x - 2, y - 10], [x - 5, y - 5]], P.latonS); poligono([[x - 3, y - 1], [x + 3, y - 1], [x + 4, y - 5], [x + 1, y - 9], [x - 2, y - 9], [x - 4, y - 5]], P.laton); linea(x + 4, y - 6, x + 8, y - 11, P.latonS); pset(x - 2, y - 6, P.latonL); }
  rect(300, 94, 310, 98, K); rect(301, 94, 309, 97, P.tur); rect(301, 94, 309, 94, P.turL);
  // el brasero de latón (mangal) en su bandeja, con las patas (las brasas, en vivo)
  { const x = 108, y = 148; poligono([[x - 12, y - 2], [x + 12, y - 2], [x + 9, y + 4], [x - 9, y + 4]], K); poligono([[x - 11, y - 1], [x + 11, y - 1], [x + 8, y + 3], [x - 8, y + 3]], (px) => (px < x - 4 ? P.latonL : px > x + 5 ? P.latonS : P.laton)); for (const dx of [-7, 7]) rect(x + dx, y + 4, x + dx + 1, y + 8, P.latonS);
    rect(x - 13, y - 3, x + 13, y - 2, P.latonS); rect(x - 12, y - 3, x + 12, y - 3, P.latonL); rect(x - 15, y + 8, x + 15, y + 9, c_mez(P.madD, P.k, 0.4)); }
  // el arcón (sandık) con flejes de latón y dos libros (el gato duerme en la otra punta)
  rect(268, 128, 316, 154, K); rect(269, 129, 315, 153, P.mad); rect(269, 129, 315, 131, P.madL); rect(269, 136, 315, 136, P.madD);
  for (let y = 132; y < 153; y++) for (let x = 270; x < 315; x++) if (h(x >> 2, y, 99) > 0.84) pset(x, y, P.veta);
  for (const x of [274, 309]) { rect(x, 129, x + 2, 153, P.latonS); rect(x, 129, x, 153, P.laton); } rect(289, 138, 294, 143, P.latonS); rect(290, 139, 293, 142, P.laton); pset(291, 141, K);
  rect(272, 122, 290, 127, K); rect(273, 123, 289, 124, P.verdeS); rect(273, 125, 289, 126, P.rojoS); rect(274, 122, 288, 122, P.marfilS);
  rect(266, 155, 318, 157, c_mez(P.madD, P.k, 0.35));
  // la cadena del farol, que baja del techo
  for (let y = 19; y < 34; y++) pset(198 + (y % 2), y, y % 3 ? P.latonS : P.laton);
}

// el contraplano en vivo: el patio por la puerta (la higuera y el ciprés que se mecen, la fuente que mana, las
// golondrinas, un vecino que pasa), la luz dorada de la ventana que entra por detrás y pinta en la pared el arco con la
// sombra de la reja y de las hojas, que tiembla, con motas de polvo; el farol calado que se mece y salpica la pared de
// estrellitas de luz; la vela de la hornacina; las brasas del brasero que respiran con su calima; el gato en el arcón
function c_tallerPuerta(R, t, o) {
  const P = c_P, D = c_PUERTA; c_fijo(R, 'tallerP', () => c_tallerPuertaFijo(R));
  R.recorte([D.xa, 30, D.xb, D.sill]);
  { const fl = Math.sin(t * 1.2) * 1.2; for (let j = 0; j < 30; j++) { const w = Math.round(Math.sin(j / 30 * Math.PI) * 3 + 1), x = 30 + Math.round(fl * j / 30); R.linea(x - w, 112 - j, x + w, 112 - j, j % 3 ? P.cipres : P.cipresS); } }
  for (let k = 0; k < 18; k++) { const a = h(k, 1, 100) * Math.PI * 2, r = 3 + h(k, 2, 100) * 7, sw = Math.sin(t * 1.6 + k) * 1.2; R.disco(64 + Math.cos(a) * r + sw, 86 + Math.sin(a) * r * 0.7, 2.2, k % 3 ? hex('#5a7a3a') : hex('#7a9a4a')); }
  R.linea(66, 112, 64, 92, P.tronco);
  for (let k = 0; k < 6; k++) { const f = (t * 1.4 + k / 6) % 1; R.pset(57 + Math.round((k - 2.5) * f * 1.6), Math.round(104 - Math.sin(f * Math.PI) * 4 + f * 12), hex('#d8eef8')); }
  { const c = (t * 7 + 20) % 90, x = D.xb + 12 - c; c_figurita(R, x, 126, t, { anda: true, dir: -1, ropa: P.verde, tocado: 'turbante', k: 2 }); }
  for (let k = 0; k < 2; k++) { const gx = D.xa - 8 + ((t * (14 + k * 5) + k * 30) % 70), gy = 44 + k * 8 + Math.sin(t * 2 + k) * 3; R.pset(Math.round(gx), Math.round(gy), P.k); R.pset(Math.round(gx) - 1, Math.round(gy) - (Math.sin(t * 12 + k) > 0 ? 1 : 0), P.k); R.pset(Math.round(gx) + 1, Math.round(gy) - (Math.sin(t * 12 + k) > 0 ? 1 : 0), P.k); }
  R.recorte(null);
  // la luz de la ventana de detrás: dos arcos dorados en la pared y el suelo, con la reja y las hojas que tiemblan
  for (const [x0, x1, y0, y1] of [[194, 262, 26, 108], [102, 130, 40, 108]]) { const cx = (x0 + x1) / 2, r = (x1 - x0) / 2;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dentro = y > y0 + r ? true : Math.hypot((x - cx) / r, (y - (y0 + r)) / (r * 1.2)) < 1; if (!dentro) continue;
      if (Math.abs(x - cx) < 1.2 || Math.abs(y - (y0 + y1) / 2) < 1) continue; const hoja = Math.sin(x * 0.4 + t * 2.1) * Math.sin(y * 0.33 - t * 1.7) > 0.55; if (hoja) continue;
      const e = Math.min(x - x0, x1 - x, y1 - y) / 5; if (c_tr(x, y) < 0.42 + Math.min(0.35, e * 0.35)) c_tinte(R, x, y, hex('#ffc070'), 0.3); } }
  for (let y = 134; y < 150; y++) for (let x = 150 + (y - 134); x < 196 + (y - 134) * 1.3; x++) if (c_tr(x, y) < 0.5) c_tinte(R, x, y, hex('#ffc070'), 0.22);
  for (let k = 0; k < 16; k++) { const fy = (h(k, 3, 101) * 70 + t * (1.4 + h(k, 4, 101) * 2.2)) % 70, x = Math.round(198 + h(k, 5, 101) * 60 + Math.sin(t * 0.7 + k) * 2 - fy * 0.3), y = Math.round(34 + fy); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(x, y, hex('#fff2d0')); }
  // el farol calado de latón, que se mece, y las estrellitas de luz que echa en la pared y el techo
  const a = Math.sin(t * 1.1) * 0.12, lx = Math.round(198 + Math.sin(a) * 14), ly = Math.round(30 + Math.cos(a) * 14), f = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
  c_luzCalida(R, lx, ly + 8, 60, f, hex('#ffcf7a'), 0.32);
  for (let k = 0; k < 22; k++) { const an = k * 2.4 + a * 3, rr = 18 + (k % 5) * 9; const x = Math.round(lx + Math.cos(an) * rr * 1.3), y = Math.round(ly + 8 + Math.sin(an) * rr * 0.8); if (y > 20 && y < 108 && !(x > 274 && y < 46)) { c_tinte(R, x, y, hex('#fff0b0'), 0.55 * f); c_tinte(R, x + 1, y, hex('#ffd890'), 0.3 * f); } }
  R.linea(198, 33, lx, ly, P.latonS);
  R.poligono([[lx - 5, ly], [lx + 5, ly], [lx + 6, ly + 11], [lx, ly + 15], [lx - 6, ly + 11]], P.k); R.poligono([[lx - 4, ly + 1], [lx + 4, ly + 1], [lx + 5, ly + 10], [lx, ly + 13], [lx - 5, ly + 10]], (px, py) => ((Math.round(px) + Math.round(py) * 2) % 4 === 0 ? P.llamaL : px > lx + 2 ? P.latonS : P.laton));
  R.poligono([[lx - 3, ly], [lx + 3, ly], [lx, ly - 4]], P.latonS); R.pset(lx, ly + 15, P.oro);
  // la vela de la hornacina
  { const x = 304, y = 93; R.rect(x - 1, y - 6, x + 1, y, P.marfil); R.pset(x, y - 7, P.k); for (let j = 1; j <= 3 + Math.round(f); j++) R.pset(x + (j > 2 ? Math.round(Math.sin(t * 11)) : 0), y - 7 - j, j < 2 ? P.llamaS : j < 3 ? P.llama : P.llamaL); c_luzCalida(R, x, y - 9, 16, f, hex('#ffcf7a'), 0.35); }
  // las brasas del brasero que respiran y la calima que sube
  for (let i = -9; i <= 9; i++) { const v = Math.sin(t * 2.3 + i * 1.3) * 0.5 + Math.sin(t * 5.1 + i * 0.7) * 0.5; R.pset(108 + i, 146, v > 0.4 ? P.llamaL : v > -0.2 ? P.llamaS : hex('#7a2a1a')); if (i % 2 === 0) R.pset(108 + i, 145, v > 0.6 ? P.llama : hex('#4a2a20')); }
  for (let k = 0; k < 8; k++) { const fy = (t * 0.6 + k / 8) % 1, x = Math.round(104 + k + Math.sin(fy * 9 + t * 2) * 2), y = Math.round(143 - fy * 26); c_tinte(R, x, y, hex('#e8e0d8'), 0.35 - fy * 0.3); }
  c_gato(R, 298, 128, t);
  return { suelo: 168, sueloMesa: 145, ventana: [D.xa, 30, D.xb, D.sill], puerta: [D.xa, 30, D.xb, D.sill], mesa: [142, 138, 264, 172], lampara: [lx, ly], divan: [6, 120, 108, 137], alacena: [206, 42, 274, 109], arcon: [268, 128, 316, 154] };
}

function c_taller(R, t, o, tarde) {
  if (tarde) return c_tallerPuerta(R, t, o);
  const fijo = c_fijo(R, 'taller' + (tarde ? 'T' : 'D'), () => c_tallerFijo(R, tarde));
  c_vistaVentana(R, t, tarde, fijo, o);
  c_gato(R, 80, c_VENT.sill, t);
  const f = c_lamparaAceite(R, 200, 47, t);
  c_luzCalida(R, 200, 52, 54, f, hex('#ffcf7a'), tarde ? 0.42 : 0.3);
  // el haz de luz en el aire, con las motas de polvo que flotan
  for (let k = 0; k < 16; k++) { const fy = (h(k, 3, 44) * 60 + t * (1.5 + h(k, 4, 44) * 2.5)) % 60, x = Math.round(84 + fy * 0.95 + h(k, 5, 44) * 32 + Math.sin(t * 0.7 + k) * 2), y = Math.round(78 + fy); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(x, y, hex('#fff6dc')); }
  // una golondrina pasa por delante de la ventana, de vez en cuando (recortada al hueco)
  return { suelo: 168, sueloMesa: 145, ventana: [22, 24, 90, 105], mesa: [142, 138, 264, 172], lampara: [200, 47], divan: [6, 120, 108, 137], alacena: [222, 46, 318, 110], arcon: [268, 128, 316, 154] };
}

// la mesa de dibujo del taller (por delante de los personajes): tablero con vetas, la carta grande desplegada que cae
// por el canto y se mueve con la brisa, los tinteros con sus plumas, rollos, el compás abierto, el estuche de plumas
// (divit), libros, la escuadra; el faldón tallado con taracea de nácar y las patas torneadas; y un cojín en el suelo
function c_tallerDelante(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, P = c_P, K = P.k;
  // la sombra de la mesa en el suelo
  for (let y = 168; y < 176; y++) for (let x = 140; x < 268; x++) if ((x + y) % 2 === 0 || y < 172) c_tinte(R, x, y, P.k, 0.35);
  // las patas torneadas y el travesaño
  for (const lx of [146, 256]) { rect(lx, 154, lx + 6, 172, K); rect(lx + 1, 155, lx + 5, 171, P.mad); rect(lx + 1, 155, lx + 2, 171, P.madL); rect(lx + 5, 155, lx + 5, 171, P.madS);
    for (const yy of [158, 163, 168]) { rect(lx - 1, yy, lx + 7, yy + 1, K); rect(lx, yy, lx + 6, yy, P.madL); } rect(lx - 1, 172, lx + 7, 173, K); }
  rect(152, 164, 256, 166, K); rect(152, 165, 256, 165, P.madS);
  // el tablero: la cara de arriba (con perspectiva), el canto y el faldón tallado
  poligono([[146, 137], [260, 137], [264, 145], [142, 145]], (x, y) => { const n = Math.sin(x * 0.11 + y * 1.3 + Math.sin(x * 0.03) * 2); return n > 0.85 ? P.veta : y < 139 ? P.mad : P.madL; });
  rect(142, 145, 264, 148, K); rect(143, 146, 263, 146, P.madL); rect(143, 147, 263, 147, P.mad);
  rect(144, 148, 262, 155, K); rect(145, 149, 261, 154, P.madS);
  for (let k = 0; k < 9; k++) { const x = 148 + k * 13; rect(x, 150, x + 9, 153, P.madD); pset(x + 4, 151, P.marfil); pset(x + 5, 152, P.marfil); pset(x + 1, 151, P.oroS); pset(x + 8, 151, P.oroS); }
  // la carta grande desplegada en el centro, que cae por el canto y ondea con la brisa
  const b = Math.sin(t * 1.6) * 1.2, b2 = Math.sin(t * 1.6 + 0.8);
  poligono([[172, 138], [236, 138], [238, 145], [170, 145]], (x, y) => ((x + y) % 7 === 0 ? P.pergS : P.perg));
  poligono([[170, 145], [238, 145], [237 + b, 158 + b2], [204, 160 + b], [171 - b * 0.5, 157]], (x, y) => { const n = h(x >> 1, y >> 1, 21); return y > 155 ? P.pergS : n > 0.85 ? P.pergL : P.perg; });
  linea(170, 145, 238, 145, P.pergD);
  for (let k = 0; k < 5; k++) linea(176 + k * 13, 147 + (k % 2), 186 + k * 13, 153 - (k % 2), k % 2 ? P.tVerde : P.tinta);
  for (let x = 174; x < 236; x += 3) pset(x, 151 + Math.round(Math.sin(x * 0.3) * 1.5), P.tAzul);
  disco(204, 150, 3, P.tRoja); pset(204, 150, P.oro); linea(171, 157, 204, 160 + Math.round(b), P.pergD);
  // a la izquierda: dos tinteros con sus plumas, tres rollos tumbados
  if (PIEZAS_PR.tintero) { PIEZAS_PR.tintero(R, 152, 145); PIEZAS_PR.tintero(R, 163, 145); } else { disco(152, 141, 3, K); disco(163, 141, 3, K); }
  for (let k = 0; k < 3; k++) { const y = 143 - k * 3, x0 = 140 + 30 + 0, xx = 148 + k * 2; void x0; rect(xx - 7, y - 2, xx + 12 - 7, y, K); rect(xx - 6, y - 1, xx + 11 - 7, y, k % 2 ? P.pergS : P.perg); disco(xx - 6, y - 1, 1.6, P.pergD); }
  // a la derecha: el compás abierto, el estuche de plumas, un libro y la escuadra
  if (PIEZAS_PR.compas) PIEZAS_PR.compas(R, 247, 145); else { linea(244, 145, 248, 131, K); linea(252, 145, 248, 131, K); }
  rect(212, 140, 232, 143, K); rect(213, 141, 231, 142, P.laton); rect(213, 141, 231, 141, P.latonL); disco(232, 141, 2.4, P.latonS); disco(232, 141, 1.4, K);
  rect(252, 134, 262, 140, K); rect(253, 135, 261, 139, P.rojoS); rect(253, 135, 261, 135, P.rojo); rect(261, 136, 261, 139, P.marfilS);
  linea(240, 144, 258, 140, K); linea(240, 143, 257, 139, P.madL);
  // un cojín en el suelo, a la derecha (en primer término), con borlas
  poligono([[280, 168], [318, 166], [320, 179], [276, 179]], K); poligono([[281, 169], [317, 167], [319, 179], [278, 179]], (x, y) => (y < 171 ? P.rojoL : (x + y) % 6 === 0 ? P.oro : (x - y + 400) % 6 === 0 ? P.rojoL : P.rojo));
  pset(280, 168, P.oro); pset(279, 169, P.oroS);
}

// el contorno de la piel de gacela (con el cuello a la izquierda) y la costa que se traza con o.trazo: baja por
// Sudamérica, llega al borde del pergamino y se tuerce hacia el este
const c_PERG = [[44, 20], [120, 15], [200, 17], [258, 22], [263, 60], [259, 110], [263, 150], [252, 166], [160, 162], [80, 166], [44, 161], [38, 124], [31, 104], [37, 84], [40, 60], [42, 38]];

const c_TRAZO = [[106, 114], [109, 124], [112, 133], [117, 142], [124, 149], [136, 153], [152, 154], [170, 153], [188, 155], [206, 154], [224, 152], [240, 150]];

let c_MASCARA = null;

// la máscara del pergamino (1 dentro, 0 fuera), calculada una vez
function c_mascaraPerg() {
  if (c_MASCARA) return c_MASCARA; const m = new Uint8Array(320 * 180), N = c_PERG.length;
  for (let y = 0; y < 180; y++) { const xs = []; for (let i = 0; i < N; i++) { const [ax, ay] = c_PERG[i], [bx, by] = c_PERG[(i + 1) % N]; if ((ay <= y + 0.5 && by > y + 0.5) || (by <= y + 0.5 && ay > y + 0.5)) xs.push(ax + (y + 0.5 - ay) / (by - ay) * (bx - ax)); }
    xs.sort((a, b) => a - b); for (let k = 0; k + 1 < xs.length; k += 2) for (let x = Math.max(0, Math.round(xs[k])); x < Math.min(320, Math.round(xs[k + 1])); x++) m[y * 320 + x] = 1; }
  return (c_MASCARA = m);
}

// el punto de la costa trazada a la fracción u (0–1) de su largo, y el índice del tramo
function c_trazoPunta(u) {
  const L = []; let tot = 0; for (let i = 1; i < c_TRAZO.length; i++) { const d = Math.hypot(c_TRAZO[i][0] - c_TRAZO[i - 1][0], c_TRAZO[i][1] - c_TRAZO[i - 1][1]); L.push(d); tot += d; }
  let r = Math.max(0, Math.min(1, u)) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const f = r / L[i]; return [c_TRAZO[i][0] + (c_TRAZO[i + 1][0] - c_TRAZO[i][0]) * f, c_TRAZO[i][1] + (c_TRAZO[i + 1][1] - c_TRAZO[i][1]) * f, i]; } r -= L[i]; }
  const z = c_TRAZO[c_TRAZO.length - 1]; return [z[0], z[1], c_TRAZO.length - 2];
}

// una polilínea de tinta con un leve temblor de pluma, y el rayado de la tierra hacia el lado lado (1 izquierda/abajo)
function c_costa(R, pts, c, tierra, lado = 1, sem = 0) {
  for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay)));
    for (let s = 0; s <= n; s++) { const f = s / n, x = ax + (bx - ax) * f + (h(i, s, sem) - 0.5) * 0.9, y = ay + (by - ay) * f; R.pset(Math.round(x), Math.round(y), c);
      if (tierra && s % 2 === 0) { const nx = -(by - ay) / n, ny = (bx - ax) / n; for (let d = 2; d < 6; d++) if ((s + d) % 3 === 0) R.pset(Math.round(x - nx * d * lado), Math.round(y - ny * d * lado), tierra); } } }
}

// una carta pequeña de la mesa (30 × 22, centrada en cx, cy), de uno de los estilos que juntó Piri: 'ptolomeo' (el
// mundo redondo amarillento), 'arabe' (el océano Índico redondeado, con borde dorado), 'portugues' (la costa de África
// con banderitas de cruz roja), 'colon' (las islas del Caribe) y 'vieja' (parda, manchada); o.levanta 0–1 alza la
// esquina de arriba a la izquierda (la brisa). Se exporta para que las escenas la hagan volar y encajar
export function c_carta(R, cx, cy, estilo = 'vieja', o = {}) {
  const { poligono, pset, linea, disco } = R, P = c_P, K = P.k, w = 15, hh = 11, x0 = Math.round(cx - w), y0 = Math.round(cy - hh), x1 = x0 + 2 * w, y1 = y0 + 2 * hh;
  const fondo = { ptolomeo: hex('#e2c88c'), arabe: hex('#f0e4c4'), portugues: P.perg, colon: P.pergL, vieja: hex('#c8a46c') }[estilo] ?? P.perg;
  poligono([[x0 + 2, y0 + 2], [x1 + 2, y0 + 2], [x1 + 2, y1 + 2], [x0 + 2, y1 + 2]], c_mez(P.madD, K, 0.4));
  poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], (x, y) => (h(x, y, 23) > 0.9 ? c_mez(fondo, K, 0.12) : fondo));
  linea(x0, y0, x1, y0, c_mez(fondo, K, 0.3)); linea(x0, y1, x1, y1, c_mez(fondo, K, 0.35)); linea(x0, y0, x0, y1, c_mez(fondo, K, 0.3)); linea(x1, y0, x1, y1, c_mez(fondo, K, 0.35));
  const ps = (x, y, c) => { if (x > x0 && x < x1 && y > y0 && y < y1) pset(Math.round(x), Math.round(y), c); };
  if (estilo === 'ptolomeo') { R.anillo(cx, cy, 9.5, P.tinta); for (let y = cy - 9; y <= cy + 9; y++) for (let x = cx - 9; x <= cx + 9; x++) { if (Math.hypot(x - cx, y - cy) > 8.6) continue; const tierra = Math.sin(x * 0.5) + Math.cos(y * 0.6 + x * 0.2) > 0.5 && y < cy + 4; ps(x, y, tierra ? hex('#b08848') : (x + y) % 2 ? hex('#a8c0b0') : fondo); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; ps(cx + Math.cos(a) * 12, cy + Math.sin(a) * 9.5, P.tRoja); } }
  else if (estilo === 'arabe') { for (let y = y0 + 3; y < y1 - 2; y++) for (let x = x0 + 3; x < x1 - 2; x++) { const d = Math.hypot((x - cx) / 10, (y - cy) / 7); ps(x, y, d < 1 ? (d > 0.86 ? P.tinta : hex('#5a9a8a')) : (x + y) % 3 === 0 ? hex('#d8b878') : fondo); }
    for (const [ix, iy] of [[cx - 3, cy + 2], [cx + 4, cy - 1]]) disco(ix, iy, 1.6, hex('#d8b878')); for (let x = x0 + 1; x < x1; x += 2) { ps(x, y0 + 1, P.oro); ps(x, y1 - 1, P.oro); } for (let k = 0; k < 4; k++) ps(x0 + 6 + k * 6, cy + 8, P.tRoja); }
  else if (estilo === 'portugues') { for (let y = y0 + 1; y < y1; y++) { const xc = cx + 2 + Math.sin(y * 0.4) * 2 - (y - y0) * 0.25; for (let x = Math.ceil(xc); x < x1; x++) ps(x, y, (x + y) % 2 ? c_mez(fondo, P.ocre, 0.4) : fondo); ps(xc, y, P.tinta); }
    for (const [fx, fy] of [[cx + 6, cy - 6], [cx + 9, cy + 4]]) { linea(fx, fy, fx, fy + 4, P.tinta); poligono([[fx + 1, fy], [fx + 5, fy], [fx + 5, fy + 3], [fx + 1, fy + 3]], P.azB); pset(fx + 3, fy + 1, P.tRoja); pset(fx + 3, fy + 2, P.tRoja); pset(fx + 2, fy + 1, P.tRoja); pset(fx + 4, fy + 1, P.tRoja); }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; for (let r = 2; r < 14; r += 2) ps(cx - 6 + Math.cos(a) * r, cy + Math.sin(a) * r, k % 2 ? P.tVerde : P.tRoja); } }
  else if (estilo === 'colon') { for (const [ix, iy, a, b] of [[cx - 7, cy - 4, 6, 1.5], [cx + 2, cy - 2, 2, 4], [cx + 8, cy + 2, 2.5, 1.5], [cx - 3, cy + 5, 1.5, 1.2], [cx + 5, cy + 7, 1.2, 1]]) for (let y = -b; y <= b; y++) for (let x = -a; x <= a; x++) if ((x / a) ** 2 + (y / b) ** 2 <= 1) ps(ix + x, iy + y, (x + y) % 2 ? P.tVerde : hex('#7aa86a'));
    for (let x = x0 + 2; x < x1; x += 3) ps(x, y1 - 3, P.tRoja); ps(cx + 10, cy - 7, P.tinta); ps(cx + 11, cy - 7, P.tinta); ps(cx + 10, cy - 8, P.tRoja); }
  else { for (let y = y0 + 1; y < y1; y++) ps(cx - 4 + Math.sin(y * 0.5) * 3, y, P.tinta); for (let k = 0; k < 5; k++) disco(cx + (h(k, 1, 24) - 0.5) * 20, cy + (h(k, 2, 24) - 0.5) * 14, 1.8 + h(k, 3, 24) * 2, c_mez(fondo, P.madS, 0.35)); for (let k = 0; k < 3; k++) for (let i = 0; i < 6; i++) ps(cx + 2 + i, cy - 5 + k * 4 + Math.round(Math.sin(i * 1.9 + k)), P.pergD); }
  // la esquina que levanta la brisa: un pico doblado con su cara de atrás
  const l = o.levanta ?? 0; if (l > 0.05) { const s = Math.round(3 + l * 6); poligono([[x0, y0], [x0 + s, y0], [x0, y0 + s]], c_mez(P.madS, K, 0.2)); poligono([[x0 + s, y0], [x0 + s - 1, y0 + s - 1], [x0, y0 + s]], c_mez(fondo, K, 0.2)); linea(x0 + s, y0, x0, y0 + s, c_mez(fondo, P.blanco ?? hex('#ffffff'), 0.4)); }
}

// la mesa vista desde arriba (fondo fijo): tablones con vetas, nudos y juntas, la piel de gacela con su grano, los bordes
// oscurecidos y dos pliegues; la parte ya dibujada del mapa (islas del Caribe, la costa norte de Sudamérica con selva y
// un loro, España y África con torres y tiendas, islas del Atlántico, dos rosas de los vientos con sus rumbos, dos naos,
// la escala y garabatos); las cartas pequeñas alrededor; pesas de latón en las esquinas, la regla, el compás tumbado,
// el astrolabio, dos tinteros con plumas, el estuche de plumas y la lámpara de aceite
function c_mesaFijo(R, o) {
  const { rect, pset, linea, poligono, disco } = R, P = c_P, K = P.k, m = c_mascaraPerg();
  // la mesa: tablones horizontales de 30 px con vetas onduladas, nudos y juntas; las esquinas en penumbra
  for (let y = 0; y < 180; y++) { const tab = Math.floor((y + 6) / 30), jy = (y + 6) % 30; for (let x = 0; x < 320; x++) {
    const v = Math.sin(x * 0.06 + y * 0.8 + tab * 3 + Math.sin(x * 0.021 + tab) * 4), n = h(x >> 2, y, 25 + tab);
    let c = [P.mad, P.madL, P.mad][tab % 3]; if (v > 0.9) c = P.veta; else if (v < -0.95) c = P.madS; else if (n > 0.93) c = P.madL;
    if (jy === 0) c = P.madD; else if (jy === 1) c = P.madS; else if (jy === 29) c = c_mez(c, P.madL, 0.4);
    const vi = Math.max(0, Math.hypot((x - 160) / 190, (y - 90) / 120) - 0.75); if (vi > 0) c = c_mez(c, K, Math.min(0.5, vi * 1.8)); pset(x, y, c); } }
  for (const [nx, ny] of [[24, 70], [290, 100], [150, 172], [90, 8]]) { disco(nx, ny, 3, P.madS); disco(nx, ny, 1.5, P.madD); R.anillo(nx, ny, 4.5, P.veta); }
  // las cartas que quedan debajo del pergamino
  c_carta(R, 22, 36, 'ptolomeo'); c_carta(R, 290, 162, 'vieja'); c_carta(R, 64, 170, 'vieja');
  // la sombra del pergamino y la piel de gacela con su grano, los bordes tostados y los dos pliegues
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (!m[y * 320 + x] && m[Math.max(0, y - 3) * 320 + Math.max(0, x - 2)]) c_tinte(R, x, y, K, 0.45);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (!m[y * 320 + x]) continue;
    const borde = !m[y * 320 + x - 2] || !m[y * 320 + x + 2] || !m[(y - 2) * 320 + x] || !m[(y + 2) * 320 + x], lejos = !m[y * 320 + x - 5] || !m[y * 320 + x + 5] || !m[(y - 4) * 320 + x] || !m[(y + 4) * 320 + x];
    const n = h(x >> 1, y >> 1, 26) * 0.6 + h(x, y, 27) * 0.4; let c = n > 0.8 ? P.pergL : n < 0.18 ? P.pergS : P.perg;
    if (borde) c = h(x, y, 28) > 0.4 ? P.pergD : P.pergS; else if (lejos && n < 0.6) c = P.pergS;
    if ((Math.abs(x - 150) < 1 || Math.abs(y - 90) < 1) && (x + y) % 2 === 0) c = c_mez(c, P.pergD, 0.4); if (Math.abs(x - 151) < 1 && !borde) c = c_mez(c, P.pergL, 0.5);
    pset(x, y, c); }
  const ps = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) pset(x, y, c); };
  // los rumbos: dieciséis desde cada rosa (negro, verde y rojo), punteados, por todo el pergamino
  for (const [rx, ry, rr] of [[166, 92, 12], [96, 44, 6]]) { for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, c = k % 4 === 0 ? P.tinta : k % 2 ? P.tVerde : P.tRoja; for (let r = rr + 1; r < 260; r += k % 2 ? 3 : 2) ps(rx + Math.cos(a) * r, ry + Math.sin(a) * r, c); }
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 - Math.PI / 2, L = k % 4 === 0 ? rr : k % 2 ? rr * 0.45 : rr * 0.7, c = k % 4 === 0 ? P.tRoja : k % 2 ? P.tAzul : P.tVerde;
      poligono([[rx + Math.cos(a) * L, ry + Math.sin(a) * L], [rx + Math.cos(a + 0.2) * L * 0.3, ry + Math.sin(a + 0.2) * L * 0.3], [rx, ry], [rx + Math.cos(a - 0.2) * L * 0.3, ry + Math.sin(a - 0.2) * L * 0.3]], c); }
    R.anillo(rx, ry, rr * 0.4, P.oroS); disco(rx, ry, 1.5, P.oro); if (rr > 8) { poligono([[rx, ry - rr - 5], [rx - 2, ry - rr - 1], [rx + 2, ry - rr - 1]], P.oro); } }
  // las islas del Caribe (La Española de pie) y las del Atlántico
  for (const [ix, iy, a, b, c] of [[60, 30, 12, 2.5, P.tVerde], [80, 36, 3, 7, P.tRoja], [94, 30, 3, 2, P.tVerde], [104, 36, 2, 1.5, P.tRoja], [50, 42, 2, 1.5, P.tRoja], [180, 34, 2, 1.4, P.tRoja], [186, 38, 1.4, 1.2, P.tVerde], [214, 72, 2, 1.4, P.tRoja], [220, 76, 1.5, 1.2, P.tVerde], [206, 96, 2, 1.5, P.tVerde]])
    for (let y = -b - 1; y <= b + 1; y++) for (let x = -a - 1; x <= a + 1; x++) { const d = (x / a) ** 2 + (y / b) ** 2; if (d <= 1) ps(ix + x, iy + y, (x + y) % 2 ? c : c_mez(c, P.perg, 0.4)); else if (d <= 1.6) ps(ix + x, iy + y, P.tinta); }
  // la costa norte de Sudamérica, con la selva, montes y un loro
  const SAN = [[40, 60], [52, 61], [64, 64], [78, 67], [92, 73], [100, 84], [104, 98], [106, 114]];
  for (let y = 58; y < 160; y++) for (let x = 36; x < 108; x++) { let dentro = false; for (let i = 1; i < SAN.length; i++) { const [ax, ay] = SAN[i - 1], [bx, by] = SAN[i]; if (y >= Math.min(ay, by) && y <= Math.max(ay, by) && by !== ay) { const cx = ax + (y - ay) / (by - ay) * (bx - ax); if (x < cx - 1) dentro = true; } }
    if (y > 114) dentro = x < 104 - (y - 114) * 0.1; if (y < 66) dentro = x < 46 + (y - 58) * 3 && y > 61; if (dentro && (x + y) % 2 === 0) ps(x, y, c_mez(P.perg, P.verdeL, 0.45)); }
  c_costa(R, SAN, P.tinta, P.tVerde, 1, 3);
  for (let k = 0; k < 12; k++) { const tx = 46 + h(k, 1, 29) * 46, ty = 76 + h(k, 2, 29) * 60; if (tx > 98 - (ty - 70) * 0.05) continue; ps(tx, ty, P.tVerde); ps(tx - 1, ty + 1, P.tVerde); ps(tx + 1, ty + 1, P.tVerde); ps(tx, ty + 2, P.madS); }
  for (let k = 0; k < 3; k++) { const mx = 58 + k * 10, my = 100 + k * 6; for (let j = 0; j < 4; j++) { ps(mx - j, my + j, P.madS); ps(mx + j, my + j, P.madS); } }
  { const lx = 74, ly = 88; ps(lx, ly, P.tRoja); ps(lx + 1, ly, P.tRoja); ps(lx, ly + 1, P.tRoja); ps(lx + 1, ly + 1, P.tVerde); ps(lx, ly + 2, P.tAzul); ps(lx + 2, ly, P.oro); ps(lx - 1, ly + 3, P.tRoja); }
  // España y África a la derecha, con torres, tiendas y un camello de tinta
  const AF = [[238, 18], [231, 28], [236, 40], [228, 52], [222, 62], [226, 76], [236, 90], [246, 104], [254, 120], [258, 140]];
  for (let y = 18; y < 150; y++) { let cx = 260; for (let i = 1; i < AF.length; i++) { const [ax, ay] = AF[i - 1], [bx, by] = AF[i]; if (y >= ay && y <= by) cx = ax + (y - ay) / (by - ay) * (bx - ax); } for (let x = Math.ceil(cx) + 1; x < 264; x++) if ((x + y) % 2 === 0) ps(x, y, c_mez(P.perg, P.ocre, 0.45)); }
  c_costa(R, AF, P.tinta, P.tRoja, -1, 4);
  // torres de tinta roja (pictogramas, no letras): el cuerpo macizo con su aguada, tres almenas, la puerta oscura, el
  // suelo y una banderita de oro en su asta
  for (const [tx, ty] of [[244, 30], [240, 60], [248, 92]]) { for (let j = 0; j < 6; j++) for (let i = -2; i <= 2; i++) ps(tx + i, ty - j, i === 2 || j === 5 ? P.tRoja : (i + j) % 2 ? c_mez(P.tRoja, P.perg, 0.35) : c_mez(P.tRoja, P.perg, 0.55));
    for (const i of [-2, 0, 2]) ps(tx + i, ty - 6, P.tRoja); ps(tx, ty, P.tinta); ps(tx, ty - 1, P.tinta); for (let i = -3; i <= 3; i++) ps(tx + i, ty + 1, P.tinta);
    ps(tx, ty - 7, P.tinta); ps(tx, ty - 8, P.tinta); ps(tx + 1, ty - 8, P.oro); ps(tx + 2, ty - 8, P.oro); ps(tx + 1, ty - 7, P.oro); }
  for (const [tx, ty] of [[250, 76], [254, 110]]) for (let j = 0; j < 3; j++) for (let i = -j; i <= j; i++) ps(tx + i, ty + j, j === 2 ? P.tinta : P.tRoja);
  { const cx = 246, cy = 128; ps(cx, cy, P.madS); ps(cx + 1, cy - 1, P.madS); ps(cx + 2, cy, P.madS); ps(cx + 3, cy, P.madS); ps(cx + 4, cy - 1, P.madS); ps(cx + 1, cy + 1, P.madS); ps(cx + 3, cy + 1, P.madS); }
  // olitas de tinta azul en el mar abierto
  for (let k = 0; k < 26; k++) { const wx = 112 + h(k, 1, 30) * 110, wy = 30 + h(k, 2, 30) * 120; if (Math.hypot(wx - 166, wy - 92) < 16) continue; for (let i = 0; i < 4; i++) ps(wx + i, wy - (i === 1 || i === 2 ? 1 : 0), c_mez(P.tAzul, P.perg, 0.35)); }
  // dos naos y una escala de leguas; garabatos de tinta en vez de notas
  for (const [bx, by, d] of [[140, 64, 1], [196, 122, -1]]) { for (let i = -4; i <= 4; i++) ps(bx + i, by, P.tinta); for (let i = -3; i <= 3; i++) ps(bx + i, by + 1, P.madS); for (let j = 1; j < 8; j++) ps(bx, by - j, P.tinta);
    for (let j = 2; j < 7; j++) for (let i = 1; i < 4; i++) ps(bx + i * d, by - j, (i + j) % 3 ? P.azB : P.pergS); ps(bx + 2 * d, by - 4, P.tRoja); ps(bx - d, by - 8, P.tRoja); ps(bx - 2 * d, by - 8, P.tRoja); }
  for (let k = 0; k < 8; k++) for (let i = 0; i < 4; i++) { ps(196 + k * 4 + i, 136, k % 2 ? P.tinta : P.tRoja); ps(196 + k * 4 + i, 137, P.pergD); }
  for (const [gx, gy, c] of [[60, 52, P.tinta], [150, 108, P.tRoja], [118, 76, P.tinta], [206, 48, P.tinta], [128, 128, P.tRoja], [70, 130, P.tinta]]) for (let i = 0; i < 9; i++) ps(gx + i, gy + Math.round(Math.sin(i * 1.6 + gx) * 1), i % 4 === 3 ? P.pergS : c);
  // las cartas que quedan encima
  c_carta(R, 18, 128, 'vieja'); c_carta(R, 292, 70, 'portugues'); c_carta(R, 294, 116, 'colon');
  // las pesas de latón en las esquinas
  for (const [wx, wy] of [[48, 24], [254, 26], [250, 160], [48, 156]]) { disco(wx + 1, wy + 2, 4, c_mez(P.madD, K, 0.4)); disco(wx, wy, 4, K); disco(wx, wy, 3.2, P.laton); disco(wx - 1, wy - 1, 1.5, P.latonL); R.anillo(wx, wy, 2.6, P.latonS); }
  // la regla y el compás tumbado arriba; el astrolabio abajo a la izquierda
  poligono([[130, 22], [222, 18], [223, 22], [131, 26]], K); poligono([[131, 22], [221, 19], [222, 21], [131, 25]], (x, y) => ((x % 8) === 0 ? P.madS : y < 22 ? P.madL : P.mad));
  for (let x = 134; x < 220; x += 4) pset(x, Math.round(24 - (x - 131) * 0.044), P.madD);
  { const hx = 206, hy = 40; linea(hx, hy, hx - 14, hy + 10, K); linea(hx + 1, hy, hx - 13, hy + 10, hex('#7a8090')); linea(hx, hy, hx + 4, hy + 16, K); linea(hx + 1, hy, hx + 5, hy + 16, hex('#9aa0ae')); disco(hx, hy, 2.2, P.laton); pset(hx, hy, P.latonL); }
  { const ax = 12, ay = 170; disco(ax + 1, ay + 2, 13, c_mez(P.madD, K, 0.4)); disco(ax, ay, 13, K); disco(ax, ay, 12, P.laton); R.anillo(ax, ay, 10, P.latonS); R.anillo(ax, ay, 6, P.latonS); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(ax + Math.cos(a) * 11), Math.round(ay + Math.sin(a) * 11), P.latonL); }
    linea(ax - 10, ay + 6, ax + 10, ay - 6, K); disco(ax, ay, 1.5, P.latonL); disco(ax - 3, ay - 3, 2, P.latonL); }
  // dos tinteros (de tinta negra con la pluma y de tinta roja) y el estuche de plumas de latón
  for (const [ix, iy, tinta] of [[274, 146, P.k], [36, 98, P.tRoja]]) { disco(ix + 1, iy + 2, 6, c_mez(P.madD, K, 0.4)); disco(ix, iy, 6, K); disco(ix, iy, 5, hex('#2a3038')); disco(ix, iy, 3, K); disco(ix, iy, 2.2, tinta); pset(ix - 3, iy - 3, hex('#8a98a8')); pset(ix - 2, iy - 4, hex('#c8d4e0')); }
  { const ix = 274, iy = 146; linea(ix, iy, ix + 14, iy - 18, P.marfilS); for (let k = 4; k < 18; k++) { const x = ix + k * 0.78, y = iy - k; pset(Math.round(x - 1), Math.round(y), P.azB); pset(Math.round(x + 1), Math.round(y + 1), P.marfil); } }
  poligono([[6, 64], [12, 60], [34, 84], [28, 88]], K); poligono([[8, 64], [12, 61], [32, 84], [28, 86]], (x, y) => ((x + y) % 4 === 0 ? P.latonL : P.laton)); disco(8, 63, 3, P.latonS); disco(8, 63, 1.5, P.k);
  // la lámpara de aceite de latón (vista desde arriba), abajo a la derecha
  { const lx = 300, ly = 160; disco(lx + 2, ly + 3, 9, c_mez(P.madD, K, 0.45)); disco(lx, ly, 9, K); disco(lx, ly, 8, P.laton); disco(lx - 2, ly - 2, 4, P.latonL); R.anillo(lx, ly, 6, P.latonS); disco(lx, ly, 2.5, hex('#3a2a14'));
    poligono([[lx - 6, ly - 4], [lx - 18, ly - 10], [lx - 16, ly - 6], [lx - 5, ly]], K); poligono([[lx - 6, ly - 3], [lx - 17, ly - 9], [lx - 16, ly - 7], [lx - 6, ly - 1]], P.laton); }
}

function c_mesa(R, t, o, tarde) {
  const P = c_P; c_fijo(R, 'mesa', () => c_mesaFijo(R, o));
  // la costa que se va dibujando (tinta fresca que brilla en la punta) y su rayado de tierra
  const u = o.trazo ?? 1, [px, py, i] = c_trazoPunta(u), pts = c_TRAZO.slice(0, i + 1).concat([[px, py]]);
  if (pts.length > 1) c_costa(R, pts, P.tinta, P.tVerde, 1, 7);
  if (u < 1) { R.pset(Math.round(px), Math.round(py), hex('#4a3a5a')); R.pset(Math.round(px) - 1, Math.round(py), hex('#6a5a7a')); }
  // la brisa levanta la esquina de la carta árabe; la carta de Colón asoma por encima
  c_carta(R, 20, 82, 'arabe', { levanta: Math.max(0, Math.sin(t * 1.1)) ** 3 });
  // el plumín del tintero se mece
  // la luz de la lámpara que tiembla sobre la mesa, y la sombra de una gaviota que cruza (por la ventana)
  const f = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
  c_luzCalida(R, 284, 152, 78, f, hex('#ffcf7a'), tarde ? 0.45 : 0.32);
  { const lx = 283, ly = 150; R.pset(lx, ly, P.k); for (let j = 1; j <= 3 + Math.round(f * 2); j++) R.pset(lx + Math.round(Math.sin(t * 11) * 0.6 * (j > 2)), ly - j, j < 2 ? P.llamaS : j < 4 ? P.llama : P.llamaL); R.pset(lx - 1, ly - 1, P.llamaS); }
  const g = (t % 9) / 9; if (g < 0.45) { const gx = 340 - g / 0.45 * 380, gy = 70 + Math.sin(g * 9) * 6, ala = Math.sin(t * 9) > 0 ? 1 : 0;
    for (let i = -7; i <= 7; i++) for (let j = -1; j <= 1; j++) { const yy = gy + j + Math.abs(i) * (ala ? -0.35 : 0.25); if (Math.abs(i) < 2 || j === 0) c_tinte(R, Math.round(gx + i), Math.round(yy), P.k, 0.22); } }
  return { pluma: [Math.round(px), Math.round(py)], pergamino: [31, 15, 263, 166], rosa: [166, 92] };
}

// la mano de Piri con la pluma (la canónica, con el brazo del caftán azul que entra desde abajo); o.mano: false la quita.
// Va donde está la punta de la costa (o.trazo)
function c_mesaDelante(R, t, o) {
  if (o.mano === false || (o.mano == null && o.trazo == null)) return;
  const P = c_P, [px0, py0] = c_trazoPunta(o.trazo ?? 1), tiembla = (o.trazo ?? 1) < 1 ? Math.sin(t * 17) * 0.4 : 0, px = Math.round(px0 + tiembla), py = Math.round(py0);
  // la pluma de ave: el cañón y las barbas, que se mece un poco con el trazo
  const fx = px + 18, fy = py - 20;
  R.linea(px, py, fx, fy, P.marfilS); R.linea(px + 1, py, fx + 1, fy, P.k);
  for (let k = 6; k <= 20; k++) { const x = px + k * 0.9, y = py - k; R.pset(Math.round(x - 1), Math.round(y), k % 3 ? P.azB : P.marfilS); R.pset(Math.round(x - 2), Math.round(y + 1), P.azB); R.pset(Math.round(x + 1), Math.round(y - 1), P.marfil); }
  brazo(R, px + 14 + Math.round((184 - py) * 0.5), 186, px + 14, py + 1, '#2e5a9a', -1, { puno: '#f6f2e8' });
}

// las losas de un muelle en perspectiva (juntas que fugan, hiladas, musgo, charcos y manchas) entre y0 e y1
function c_losas(R, y0, y1, sem = 0) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) { const d = y - (y0 - 40), fila = Math.floor(Math.log(d) * 9), fy = Math.log(d) * 9 - fila; for (let x = 0; x < 320; x++) {
    const u = (x - 160) / d * 4 + (fila % 2) * 0.5, b = Math.floor(u), f = u - b, n = h(b, fila, 50 + sem);
    let c = n > 0.66 ? P.piedraL : n > 0.33 ? P.piedra : P.piedraM; if (f < 0.05 || fy < 0.09) c = P.piedraS; else if (h(x, y, 51) > 0.9) c = P.piedraM; else if (h(x >> 2, y >> 1, 52) > 0.95) c = c_mez(c, P.verdeS, 0.3);
    if (f > 0.93 || fy > 0.93) c = c_mez(c, P.piedraL, 0.4); R.pset(x, y, c); } }
  for (const [cx, cy, rx] of [[70, y1 - 12, 14], [230, y0 + 14, 9]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / 2.5) ** 2 < 1) R.pset(x, y, (x + y) % 3 ? hex('#8ab0c8') : hex('#c4dcea'));
}

// el canto del muelle: sillares grandes con su arista iluminada y la sombra (de y0 a y0 + 5)
function c_canto(R, y0, sem = 0) {
  const P = c_P;
  for (let y = y0; y <= y0 + 5; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((x + (sem * 7)) / 22); let c = h(b, 1, 53 + sem) > 0.5 ? P.piedraL : P.piedra; if ((x + sem * 7) % 22 === 0) c = P.piedraS; if (y === y0) c = hex('#f4ead4'); if (y === y0 + 5) c = P.piedraS; if (h(x, y, 54) > 0.88) c = P.piedraM; R.pset(x, y, c); }
}

// un bolardo de piedra (bita) con su argolla
function c_bita(R, x, y) { const P = c_P; R.rect(x - 3, y - 8, x + 3, y, P.k); R.rect(x - 2, y - 7, x + 2, y, P.piedraM); R.rect(x - 2, y - 7, x - 1, y, P.piedraL); R.rect(x - 4, y - 9, x + 4, y - 8, P.k); R.rect(x - 3, y - 9, x + 3, y - 9, P.piedraL); R.anillo(x + 3, y - 4, 1.6, hex('#4a4040')); }

// un fardo de tela atado con cuerda
function c_fardo(R, x, y, w, hh, c, cS) { const P = c_P; R.rect(x, y - hh, x + w, y, P.k); R.rect(x + 1, y - hh + 1, x + w - 1, y - 1, c); R.rect(x + 1, y - hh + 1, x + w - 1, y - hh + 2, c_mez(c, P.marfil, 0.3)); R.rect(x + w - 3, y - hh + 2, x + w - 1, y - 1, cS);
  for (let k = 1; k < 3; k++) { const xx = x + Math.round(w * k / 3); R.rect(xx, y - hh + 1, xx, y - 1, P.cuerda); } R.rect(x + 1, y - Math.round(hh / 2), x + w - 1, y - Math.round(hh / 2), P.cuerda); for (let i = x + 2; i < x + w - 2; i += 3) R.pset(i, y - hh + 4, cS); }

// un barril de duelas con sus aros
function c_barril(R, x, y, s = 1) { const P = c_P, w = 6 * s, hh = 14 * s; R.poligono([[x - w, y - hh], [x + w, y - hh], [x + w + 1.5 * s, y - hh / 2], [x + w, y], [x - w, y], [x - w - 1.5 * s, y - hh / 2]], P.k);
  R.poligono([[x - w + 1, y - hh + 1], [x + w - 1, y - hh + 1], [x + w + 0.5 * s, y - hh / 2], [x + w - 1, y - 1], [x - w + 1, y - 1], [x - w - 0.5 * s, y - hh / 2]], (px) => (px > x + w * 0.4 ? P.madS : px < x - w * 0.4 ? P.madL : (px - x + 40) % 3 === 0 ? P.madS : P.mad));
  for (const f of [0.2, 0.8]) R.rect(x - w - 1, Math.round(y - hh * f), x + w + 1, Math.round(y - hh * f), hex('#4a4040')); R.rect(x - w + 1, y - hh, x + w - 1, y - hh, P.madL); }

// un rollo de cabo en el suelo
function c_cabo(R, x, y, r) { const P = c_P; for (let k = r; k > 1; k -= 1.5) { R.anillo(x, y, k, P.k); R.anillo(x, y - 0.5, k - 0.6, P.cuerda); } R.disco(x, y, 1.2, P.madD); }

// el puerto por fuera (fondo fijo): cielo tramado con el sol, la orilla de enfrente, el agua del estrecho, el pueblo en la
// loma (casas encaladas con tejados de teja, cipreses, la torre vieja), los almacenes de piedra con portones de arco, el
// canto del muelle y las losas, con bitas, fardos, barriles, cabos y una red
function c_puertoFijo(R, tarde) {
  const { rect, pset, poligono, linea, disco } = R, P = c_P, K = P.k;
  c_degradado(R, 0, 0, 319, 74, c_CIELO[tarde ? 'tarde' : 'dia']);
  const sol = tarde ? [236, 60, 8] : [232, 26, 6]; R.halo(sol[0], sol[1], sol[2] * 3.2, tarde ? [hex('#f8c890'), hex('#fce0a8')] : [hex('#e8f2f0'), hex('#f8fae8')], 0.9); disco(sol[0], sol[1], sol[2] + 1, tarde ? hex('#f8b060') : hex('#fff4c0')); disco(sol[0], sol[1], sol[2], tarde ? hex('#ffe0a0') : hex('#ffffff'));
  c_orilla(R, 0, 320, 76, 14, tarde);
  c_aguaFija(R, 0, 77, 319, 131);
  for (let y = 77; y < 131; y++) for (let x = 0; x < 320; x++) if (Math.abs(x - sol[0]) < 3 + (y - 77) * 0.3 && h(x, y, 55) > 0.7) pset(x, y, tarde ? hex('#f8c890') : P.marL);
  // la loma del pueblo y sus casas
  poligono([[196, 132], [204, 112], [220, 96], [240, 84], [262, 74], [290, 66], [320, 62], [320, 132]], (x, y) => { const n = h(x >> 1, y >> 1, 56); return n > 0.7 ? P.hojaL : n > 0.35 ? hex('#a89a62') : hex('#8a7e4e'); });
  const casas = []; for (let fila = 0; fila < 6; fila++) for (let k = 0; k < 9; k++) { const x = 208 + k * 13 + (fila % 2) * 6 + Math.round(h(k, fila, 57) * 4), base = 128 - fila * 9; const top = 132 - (x - 196) * 0.62; if (base - 8 < top + 4 || x > 316) continue; casas.push([x, base, fila, k]); }
  casas.reverse().forEach(([x, base, fila, k]) => { const w = 8 + Math.round(h(k, fila, 58) * 4), alto = 6 + Math.round(h(k, fila, 59) * 3), col = h(k, fila, 60) > 0.3 ? hex('#f4efe2') : hex('#ecd8b0');
    rect(x, base - alto, x + w, base, col); rect(x + w - 1, base - alto, x + w, base, c_mez(col, P.k, 0.18)); poligono([[x - 1, base - alto], [x + w + 1, base - alto], [x + w - 2, base - alto - 3], [x + 2, base - alto - 3]], P.teja); linea(x - 1, base - alto, x + w + 1, base - alto, P.tejaS); for (let i = x + 1; i < x + w; i += 2) pset(i, base - alto - 2, P.tejaL);
    pset(x + 2, base - 3, P.k); pset(x + 2, base - 4, P.k); if (w > 9) { pset(x + 6, base - 4, P.k); pset(x + 6, base - 5, P.k); } });
  for (const [x, b, a] of [[214, 112, 14], [246, 92, 16], [282, 76, 15], [300, 96, 12], [236, 116, 10]]) for (let j = 0; j < a; j++) { const w = Math.round(Math.sin(j / a * Math.PI) * 2.2); rect(x - w, b - j, x + w, b - j, j % 3 ? P.cipres : P.cipresS); }
  // la torre vieja, en lo alto
  rect(296, 52, 312, 74, K); rect(297, 53, 311, 74, P.piedra); for (let y = 55; y < 74; y += 4) rect(297, y, 311, y, P.piedraS); rect(309, 53, 311, 74, P.piedraM); for (let x = 297; x < 312; x += 4) rect(x, 50, x + 1, 52, P.piedra); rect(303, 60, 304, 64, K);
  // los almacenes de piedra de la orilla, con portones de arco y tejados
  for (const [x0, x1, top] of [[206, 262, 110], [262, 320, 106]]) { rect(x0, top, x1, 131, P.piedra); for (let y = top + 3; y < 131; y += 4) for (let x = x0; x <= x1; x++) if ((x + (Math.floor(y / 4) % 2) * 5) % 10 === 0) pset(x, y, P.piedraS); else if (y % 4 === 3) pset(x, y, c_mez(P.piedra, P.piedraS, 0.3));
    poligono([[x0 - 2, top], [x1 + 2, top], [x1 - 4, top - 6], [x0 + 4, top - 6]], P.teja); for (let x = x0; x < x1; x += 3) linea(x, top - 1, x + 2, top - 5, P.tejaS); linea(x0 - 2, top, x1 + 2, top, P.tejaS);
    for (let x = x0 + 8; x < x1 - 8; x += 18) { rect(x, top + 9, x + 9, 131, K); disco(x + 4.5, top + 9, 4.5, K); rect(x + 1, top + 10, x + 8, 131, hex('#3a2a20')); disco(x + 4.5, top + 9, 3.5, hex('#3a2a20')); rect(x - 1, top + 6, x + 10, top + 6, P.piedraL); } }
  // el canto del muelle y las losas
  c_canto(R, 132, 0); c_losas(R, 138, 179, 0);
  // bitas, fardos, barriles, una red tendida, cabos y una ánfora
  c_bita(R, 150, 140); c_bita(R, 272, 140);
  c_fardo(R, 222, 146, 18, 10, hex('#c8b890'), hex('#a8986e')); c_fardo(R, 226, 136, 14, 9, hex('#a85a3a'), hex('#7a3e28')); c_fardo(R, 244, 147, 15, 9, hex('#6a8aa8'), hex('#4a6a88'));
  c_barril(R, 292, 150); c_barril(R, 306, 152); c_barril(R, 299, 138, 0.9);
  for (let y = 140; y < 150; y++) for (let x = 20; x < 66; x++) { const lx = x - 20, ly = y - 140; if (ly > 9 - Math.abs(lx - 23) * 0.15 + Math.sin(lx * 0.4)) continue; if ((lx + ly) % 3 === 0 || (lx - ly + 30) % 3 === 0) pset(x, y, hex('#6a5a44')); }
  for (let x = 24; x < 64; x += 6) disco(x, 141, 1.2, hex('#c8a040'));
  c_cabo(R, 196, 148, 5); c_cabo(R, 84, 145, 4);
  { const x = 112, y = 146; poligono([[x - 3, y - 12], [x + 3, y - 12], [x + 5, y - 6], [x + 2, y], [x - 2, y], [x - 5, y - 6]], P.teja); rect(x - 2, y - 14, x + 2, y - 12, P.tejaS); pset(x - 3, y - 9, P.tejaL); pset(x - 4, y - 7, P.tejaL); }
}

// el alminar y la cúpula de la mezquita (por delante de las nubes): cúpula de plomo, el fuste con su balcón y el capirote
function c_mezquita(R, x, b) {
  const { rect, pset, poligono, disco, linea } = R, P = c_P, K = P.k;
  rect(x - 22, b - 14, x + 4, b, P.k); rect(x - 21, b - 13, x + 3, b, hex('#f2ecdc')); rect(x - 21, b - 13, x + 3, b - 12, P.piedraL); for (let k = 0; k < 4; k++) { rect(x - 19 + k * 6, b - 9, x - 17 + k * 6, b - 3, K); disco(x - 18 + k * 6, b - 9, 1, K); }
  disco(x - 9, b - 14, 9, K); disco(x - 9, b - 14, 8, (px, py) => (px < x - 11 ? P.plomoL : px > x - 5 ? P.plomoS : P.plomo)); rect(x - 19, b - 14, x + 1, b - 13, P.piedraL); linea(x - 9, b - 23, x - 9, b - 26, P.oro); pset(x - 9, b - 27, P.oroL);
  const fx = x + 10; rect(fx - 2, b - 56, fx + 2, b, K); rect(fx - 1, b - 55, fx + 1, b, hex('#f2ecdc')); rect(fx + 1, b - 55, fx + 1, b, P.piedraM); for (let y = b - 50; y < b; y += 6) pset(fx, y, P.piedraS);
  rect(fx - 4, b - 42, fx + 4, b - 40, K); rect(fx - 3, b - 41, fx + 3, b - 41, P.piedraL); for (let k = -3; k <= 3; k += 2) pset(fx + k, b - 43, P.piedraM);
  poligono([[fx - 3, b - 56], [fx + 4, b - 56], [fx + 0.5, b - 68]], K); poligono([[fx - 2, b - 57], [fx + 3, b - 57], [fx + 0.5, b - 66]], (px) => (px < fx ? P.plomoL : P.plomo)); linea(fx, b - 68, fx, b - 72, P.oro); pset(fx, b - 73, P.oroL);
}

function c_puerto(R, t, o, tarde) {
  const P = c_P; c_fijo(R, 'puerto' + (tarde ? 'T' : 'D'), () => c_puertoFijo(R, tarde));
  R.recorte([0, 0, 319, 72]); c_nubes(R, t, 0, 2, 319, 52, c_NUBE[tarde ? 'tarde' : 'dia'], 6, 61); R.recorte(null);
  c_mezquita(R, 244, 112);
  for (let k = 0; k < 3; k++) { const y = 60 - ((t * 5 + k * 6) % 18), x = 262 + Math.sin(t + k) * 1.5 + (60 - y) * 0.3; R.pset(Math.round(x), Math.round(y), hex('#d8d8d8')); R.pset(Math.round(x) + 1, Math.round(y), hex('#c0c4c8')); }
  R.recorte([0, 77, 210, 131]); c_olas(R, t, 0, 78, 210, 130, 50, [tarde ? 236 : 232, tarde ? hex('#ffe0a0') : P.espuma], 5);
  c_galera(R, ((t * 4 + 120) % 260) - 30, 86, 0.28, 1, t, { vela: 'izada', remos: 'boga', gente: false, sem: 3, bandera: o.banderas ? P.verde : P.rojo, viento: -1 });
  c_barca(R, 150 - ((t * 3) % 120), 98, t, 0.9, -1);
  c_galera(R, 172, 112, 0.6, -1, t, { sem: 7, bandera: o.banderas ? hex('#e8e8e8') : P.rojo, franja: P.verde });
  R.recorte([0, 0, 319, 131]);
  const Pt = c_galera(R, 70, 130, 1.25, -1, t, { sem: 1, franja: P.rojo });
  R.recorte(null);
  // la amarra de popa, que se tensa y afloja, de la bita a la galera
  const [ax, ay] = Pt(3, 10); for (let k = 0; k <= 20; k++) { const f = k / 20, x = 150 + (ax - 150) * f, y = 133 + (ay - 133) * f + Math.sin(f * Math.PI) * (3 + Math.sin(t * 1.3)); R.pset(Math.round(x), Math.round(y), P.cuerda); }
  // los mozos de los almacenes que cargan sacos y una gaviota posada que da saltitos
  for (let k = 0; k < 3; k++) { const ciclo = ((t * 7 + k * 40) % 120), ida = ciclo < 60, x = ida ? 214 + ciclo : 214 + (120 - ciclo); c_figurita(R, x, 132, t, { anda: true, dir: ida ? 1 : -1, ropa: [P.marfil, hex('#6a8aa8'), P.ocre][k], carga: ida, tocado: k === 1 ? 'gorro' : 'turbante', k }); }
  { const s = Math.sin(t * 3) > 0.85 ? 1 : 0; c_gaviota(R, 272, 129 - s, 0.1, 0); }
  for (let k = 0; k < 5; k++) { const gx = ((t * (10 + k * 4) + k * 70) % 380) - 30, gy = 22 + k * 8 + Math.sin(t * 1.4 + k) * 5; c_gaviota(R, gx, gy, t, k, k === 4 ? 2 : 1); }
  return { suelo: 160, pasarela: [[176, 156], [Math.round(Pt(14, 9)[0]), Math.round(Pt(14, 9)[1])]], horizonte: 76, sol: tarde ? [236, 60] : [232, 26], muelle: [0, 138, 319, 179] };
}

// lo de delante en el puerto: la pasarela a la popa de la galera (tablas con travesaños y la cuerda de pasamanos), y
// en primer término un rollo de cabo con su bita a la izquierda y cajas de pescado con una gaviota que picotea a la derecha
function c_puertoDelante(R, t, o) {
  const P = c_P, Pt = (u, v) => [70 - (u - 60) * 1.25, 130 + Math.sin(t * 1.3 + 1) * 0.5 * 1.55 - v * 1.25 - (u - 60) * Math.sin(t * 0.9 + 1) * 0.006 * 1.25];
  const [tx, ty] = Pt(14, 9); c_pasarela(R, 176, 157, tx, ty, t);
  c_bita(R, 14, 179); c_cabo(R, 32, 174, 7);
  for (const [x, y] of [[286, 179], [300, 170]]) { R.rect(x - 1, y - 12, x + 22, y, P.k); R.rect(x, y - 11, x + 21, y - 1, P.mad); R.rect(x, y - 11, x + 21, y - 10, P.madL); for (let i = x + 3; i < x + 20; i += 4) R.rect(i, y - 9, i, y - 2, P.madS);
    for (let k = 0; k < 5; k++) { R.pset(x + 3 + k * 4, y - 12, hex('#b8c8d4')); R.pset(x + 4 + k * 4, y - 12, hex('#e8f0f4')); R.pset(x + 5 + k * 4, y - 13, hex('#8a9aa8')); } }
  { const pica = Math.sin(t * 5) > 0.3 ? 1 : 0; c_gaviota(R, 308, 155 + pica, 0.1, 0, 2); }
}

// una pasarela de tablas de (x0, y0) en el muelle a (x1, y1) en la borda, con travesaños y el pasamanos de cuerda
function c_pasarela(R, x0, y0, x1, y1, t) {
  const P = c_P, n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)), ux = (x1 - x0) / n, uy = (y1 - y0) / n;
  for (let i = 0; i <= n; i++) { const x = x0 + ux * i, y = y0 + uy * i; R.rect(Math.round(x) - 6, Math.round(y), Math.round(x) + 6, Math.round(y) + 3, P.k); }
  for (let i = 0; i <= n; i++) { const x = x0 + ux * i, y = y0 + uy * i; R.rect(Math.round(x) - 5, Math.round(y), Math.round(x) + 5, Math.round(y) + 1, i % 6 < 1 ? P.madS : P.madL); R.rect(Math.round(x) - 5, Math.round(y) + 2, Math.round(x) + 5, Math.round(y) + 2, P.mad); if (i % 6 === 3) R.rect(Math.round(x) - 5, Math.round(y) - 1, Math.round(x) + 5, Math.round(y) - 1, P.madD); }
  for (const [px, py] of [[x0 + 6, y0 - 1], [x1 + 6, y1 - 1]]) { R.rect(Math.round(px), Math.round(py) - 9, Math.round(px) + 1, Math.round(py), P.madD); }
  for (let i = 0; i <= n; i++) { const f = i / n, x = x0 + 6 + (x1 - x0) * f, y = y0 - 9 + (y1 - y0) * f + Math.sin(f * Math.PI) * 3; R.pset(Math.round(x), Math.round(y), P.cuerda); }
}

// el muelle del arsenal de cerca (fondo fijo; otro sitio del puerto, no el del plano general): cielo tramado, la loma
// con la muralla vieja, su torre, casas y cipreses; las gradas cubiertas del arsenal (tersane) de frente, naves de piedra
// con bóveda y tejado a dos aguas: en una asoma la popa dorada de una galera varada, en otra el esqueleto de un casco
// con sus cuadernas, en otra remos y tablones; el andén de piedra del otro lado, el agua de la dársena con los reflejos
// de los arcos; el canto del muelle, las losas, la pila de tablones, la caldera de brea en su trébede, sacos y una
// ánfora, la bita y el ancla. La cabria, los fardos que iza y el fuego van en c_muelle (por delante de la galera)
function c_muelleFijo(R, tarde) {
  const { rect, pset, poligono, disco, linea } = R, P = c_P, K = P.k;
  c_degradado(R, 0, 0, 319, 100, c_CIELO[tarde ? 'tarde' : 'dia']);
  const sol = tarde ? [246, 48, 7] : [226, 22, 6]; R.halo(sol[0], sol[1], sol[2] * 3, tarde ? [hex('#f8c890'), hex('#fce0a8')] : [hex('#e8f2f0'), hex('#f8fae8')], 0.9); disco(sol[0], sol[1], sol[2], tarde ? hex('#ffe0a0') : hex('#ffffff'));
  // la loma de detrás, con hierba y matorral tramados, casas encaladas y cipreses
  const cima = (x) => Math.round(48 + 7 * Math.sin(x * 0.018 + 0.6) + 3 * Math.sin(x * 0.061));
  for (let x = 0; x < 320; x++) for (let y = cima(x); y <= 100; y++) { const n = h(x >> 1, y >> 1, 66); pset(x, y, y === cima(x) ? hex('#c8bc84') : n > 0.74 ? P.hojaL : n > 0.32 ? hex('#a89a62') : hex('#8a7e4e')); }
  for (let k = 0; k < 24; k++) { const x = 4 + k * 13 + Math.round(h(k, 1, 67) * 6), base = cima(x) + 9 + Math.round(h(k, 2, 67) * 5), w = 7 + Math.round(h(k, 3, 67) * 3), al = 5 + Math.round(h(k, 4, 67) * 2);
    if (h(k, 5, 67) < 0.3) { for (let j = 0; j < 11; j++) { const ww = Math.round(Math.sin(j / 11 * Math.PI) * 2); rect(x - ww, base - j, x + ww, base - j, j % 3 ? P.cipres : P.cipresS); } continue; }
    const col = h(k, 6, 67) > 0.35 ? hex('#f4efe2') : hex('#ecd8b0'); rect(x, base - al, x + w, base, col); rect(x + w - 1, base - al, x + w, base, c_mez(col, K, 0.18));
    poligono([[x - 1, base - al], [x + w + 1, base - al], [x + w - 2, base - al - 3], [x + 2, base - al - 3]], P.teja); linea(x - 1, base - al, x + w + 1, base - al, P.tejaS); pset(x + 2, base - 3, K); pset(x + 2, base - 4, K); }
  // la muralla vieja por la cresta, con almenas, y su torre cuadrada
  for (let x = 140; x < 320; x++) { const yt = cima(x) - 4; for (let y = yt; y < yt + 7; y++) pset(x, y, y === yt ? P.piedraL : (x + (y >> 2) * 3) % 8 === 0 || y % 3 === 0 ? P.piedraS : P.piedra); if (x % 6 < 3) { pset(x, yt - 1, P.piedra); pset(x, yt - 2, P.piedraL); } }
  { const x0 = 226, x1 = 244, y0 = 26, yb = cima(235) + 2; rect(x0, y0, x1, yb, K); rect(x0 + 1, y0 + 1, x1 - 1, yb, P.piedra); rect(x1 - 4, y0 + 1, x1 - 1, yb, P.piedraM); for (let y = y0 + 4; y < yb; y += 4) for (let x = x0 + 1; x < x1; x++) if ((x + (y >> 2) * 4) % 7 === 0) pset(x, y, P.piedraS); else pset(x, y, c_mez(P.piedra, P.piedraS, 0.25));
    for (let x = x0; x <= x1; x += 4) rect(x, y0 - 3, x + 1, y0, P.piedra); rect(234, 36, 235, 41, K); rect(234, 48, 235, 52, K); }
  // las gradas del arsenal: naves de piedra con bóveda de cañón, de frente
  for (let k = 0; k < 8; k++) { const x0 = -14 + k * 44, x1 = x0 + 40, cx = x0 + 20, r = 14, ay = 82;
    for (let y = 70; y <= 99; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let c = (x + (Math.floor(y / 4) % 2) * 5) % 10 === 0 || y % 4 === 3 ? P.piedraS : h(x, y, 68) > 0.8 ? P.piedraL : P.piedra; if (x > x1 - 3) c = c_mez(c, P.piedraD, 0.35); if (h(x >> 2, y >> 2, 69) > 0.9) c = c_mez(c, P.verdeS, 0.25); pset(x, y, c); }
    poligono([[x0 - 3, 71], [cx, 59], [x1 + 3, 71]], (px, py) => ((Math.round(px) + Math.round(py) * 2) % 5 === 0 ? P.tejaS : Math.round(py) % 3 === 0 ? P.tejaL : P.teja)); linea(x0 - 3, 71, cx, 59, P.tejaS); linea(cx, 59, x1 + 3, 71, P.tejaS); rect(x0 - 3, 71, x1 + 3, 71, c_mez(P.tejaS, K, 0.4));
    for (let y = 68; y <= 99; y++) for (let x = cx - r - 2; x <= cx + r + 2; x++) { if (x < 0 || x > 319) continue; const d = y >= ay ? Math.abs(x - cx) : Math.hypot(x - cx, y - ay);
      if (d <= r) { const f = Math.min(1, (y - 68) / 34); pset(x, y, c_tr(x, y) < 0.3 * (1 - f) ? hex('#3a2c22') : c_mez(hex('#2a201a'), K, f * 0.6)); }
      else if (d <= r + 2 && y < ay) pset(x, y, Math.floor(Math.atan2(y - ay, x - cx) * 5) % 2 ? P.piedraL : P.piedraM); }
    const tipo = k % 3;
    if (tipo === 0) { // la popa de una galera varada, dorada y roja, con su farol
      poligono([[cx - 9, 99], [cx + 9, 99], [cx + 7, 84], [cx + 2, 78], [cx - 6, 80]], (px, py) => (py < 84 ? P.oroS : Math.round(py) % 3 === 0 ? c_mez(P.rojoS, K, 0.3) : P.rojoS)); linea(cx - 6, 80, cx + 2, 78, P.oro); disco(cx + 1, 75, 1.5, P.oroS); pset(cx + 1, 75, P.llama); linea(cx + 1, 77, cx + 1, 78, P.oroS); }
    else if (tipo === 1) { // el esqueleto de un casco en la grada: quilla y cuadernas
      linea(cx - 13, 97, cx + 13, 95, P.madL); for (let i = 0; i < 6; i++) { const xx = cx - 11 + i * 4.5; for (let j = 0; j < 14; j++) { const yy = 96 - j, w = Math.round(Math.sqrt(j) * 1.6); pset(Math.round(xx) - w, yy, P.madL); pset(Math.round(xx) + w, yy, i % 2 ? P.mad : P.madL); } } linea(cx - 13, 83, cx + 13, 82, P.mad); }
    else { // remos y tablones apoyados contra el fondo
      for (let i = 0; i < 7; i++) linea(cx - 10 + i * 3, 99, cx - 6 + i * 3, 73, i % 2 ? P.madL : P.mad); rect(cx - 12, 92, cx + 12, 95, P.madS); rect(cx - 12, 92, cx + 12, 92, P.madL); }
    if (x1 + 1 < 320 && x1 + 3 >= 0) { rect(Math.max(0, x1 + 1), 70, Math.min(319, x1 + 3), 99, P.piedraM); rect(Math.max(0, x1 + 1), 70, Math.min(319, x1 + 1), 99, P.piedraL); } }
  // el andén de piedra de enfrente, con sus bitas
  rect(0, 99, 319, 101, P.piedraL); rect(0, 101, 319, 101, P.piedraS); for (let x = 10; x < 320; x += 38) { rect(x, 96, x + 2, 99, P.piedraM); pset(x, 96, P.piedraL); }
  // el agua de la dársena, con los reflejos oscuros de los arcos y los claros del tejado
  c_aguaFija(R, 0, 102, 319, 136);
  for (let k = 0; k < 8; k++) { const cx = 6 + k * 44; for (let y = 102; y < 118; y++) for (let x = cx - 12; x <= cx + 12; x++) if (x >= 0 && x < 320 && c_tr(x, y) < 0.5 - (y - 102) / 34 && (y & 1)) c_tinte(R, x, y, K, 0.3); }
  // el canto del muelle y las losas
  c_canto(R, 137, 3); c_losas(R, 143, 179, 3);
  // la pila de tablones a la izquierda, con dos troncos cruzados encima
  for (let i = 0; i < 5; i++) { const y = 162 - i * 4, x0 = 2 + (i % 2) * 3, x1 = 50 - (i % 2) * 3; rect(x0, y - 3, x1, y, K); rect(x0 + 1, y - 2, x1 - 1, y - 1, i % 2 ? P.madL : P.mad); for (let x = x0 + 4; x < x1; x += 7) pset(x, y - 2, P.veta); rect(x0 + 1, y - 2, x0 + 2, y - 1, P.madS); pset(x0 + 1, y - 2, P.madD); }
  for (const [a, b] of [[[4, 140], [46, 132]], [[8, 134], [52, 141]]]) { linea(a[0], a[1], b[0], b[1], K); linea(a[0], a[1] - 1, b[0], b[1] - 1, P.madL); linea(a[0], a[1] - 2, b[0], b[1] - 2, P.mad); disco(a[0], a[1] - 1, 1.6, P.madS); }
  // la caldera de brea en su trébede (el fuego y el humo, en c_muelle)
  { const cx = 78, cy = 150; for (const [dx, by] of [[-9, 160], [9, 160], [0, 156]]) linea(cx + dx, by, cx, cy - 12, hex('#3a3434'));
    disco(cx, cy - 2, 8, K); disco(cx, cy - 2, 7, hex('#2e2a2a')); disco(cx - 3, cy - 4, 2.5, hex('#4a4444')); rect(cx - 9, cy - 9, cx + 9, cy - 7, K); rect(cx - 8, cy - 8, cx + 8, cy - 8, hex('#5a5454')); rect(cx - 7, cy - 9, cx + 7, cy - 9, hex('#16100c'));
    for (let i = 0; i < 5; i++) linea(cx - 6 + i * 3, 160, cx - 4 + i * 2, 156, i % 2 ? P.madS : P.mad); }
  // sacos y una ánfora junto a la caldera
  for (const [x, y] of [[100, 150], [110, 151], [104, 143]]) { disco(x, y - 4, 5, K); disco(x, y - 4, 4.2, P.ocre); rect(x - 1, y - 10, x + 1, y - 8, P.ocreS); pset(x - 2, y - 6, hex('#e8c878')); for (let k = -3; k <= 3; k += 2) pset(x + k, y - 1, P.ocreS); }
  { const x = 122, y = 152; poligono([[x - 3, y - 12], [x + 3, y - 12], [x + 5, y - 6], [x + 2, y], [x - 2, y], [x - 5, y - 6]], P.teja); rect(x - 2, y - 14, x + 2, y - 12, P.tejaS); pset(x - 3, y - 9, P.tejaL); pset(x - 4, y - 7, P.tejaL); }
  c_bita(R, 252, 146); c_cabo(R, 236, 172, 6);
  // el ancla de hierro tumbada, con su argolla
  { const x = 124, y = 176; linea(x, y, x + 26, y - 6, K); linea(x, y - 1, x + 26, y - 7, hex('#5a5050')); linea(x - 2, y - 6, x + 3, y + 1, K); linea(x - 3, y - 6, x + 2, y + 1, hex('#5a5050')); R.anillo(x + 28, y - 7, 2.5, K); linea(x + 22, y - 10, x + 24, y - 1, K); }
}

// un fardo de los que iza la cabria (respeta R.recorte)
function c_fardoR(R, x, y) { const P = c_P; c_r(R, x - 7, y - 9, x + 7, y, P.k); c_r(R, x - 6, y - 8, x + 6, y - 1, hex('#c8b890')); c_r(R, x - 6, y - 8, x + 6, y - 7, hex('#e0d4b0')); c_r(R, x + 4, y - 7, x + 6, y - 1, hex('#a8986e')); c_r(R, x - 1, y - 8, x, y - 1, P.cuerda); c_r(R, x - 6, y - 5, x + 6, y - 5, P.cuerda); }

function c_muelle(R, t, o, tarde) {
  const P = c_P; c_fijo(R, 'muelle' + (tarde ? 'T' : 'D'), () => c_muelleFijo(R, tarde));
  R.recorte([0, 0, 319, 58]); c_nubes(R, t, 0, 4, 319, 44, c_NUBE[tarde ? 'tarde' : 'dia'], 5, 71); R.recorte(null);
  // el humo de la fragua del arsenal, que sube de detrás de las naves
  for (let k = 0; k < 10; k++) { const f = (t * 0.25 + k / 10) % 1, x = 128 + Math.sin(f * 6 + t) * 2 + f * 14, y = 66 - f * 26; c_tinte(R, Math.round(x), Math.round(y), hex('#e0dcd4'), 0.6 - f * 0.45); c_tinte(R, Math.round(x) + 1, Math.round(y), hex('#c8c4bc'), 0.45 - f * 0.35); c_tinte(R, Math.round(x), Math.round(y) - 1, hex('#e8e4dc'), 0.4 - f * 0.3); }
  // los carpinteros de ribera en la grada del casco a medio hacer: dos que martillean (saltan las virutas) y un mozo
  // que lleva un tablón por el andén
  for (const [x, k] of [[60, 0], [72, 1]]) { const golpe = Math.sin(t * 7 + k * 2) > 0.6; c_figurita(R, x, 99, t, { ropa: k ? P.marfil : P.indigo, tocado: k ? 'gorro' : 'turbante', k }); R.pset(x + 2, 89 - (golpe ? 0 : 2), P.madS); R.pset(x + 3, 89 - (golpe ? 0 : 2), hex('#5a5a62')); if (golpe) R.pset(x + 4, 87, P.pergL); }
  { const c = (t * 9) % 380, x = 340 - c; c_figurita(R, x, 100, t, { anda: true, dir: -1, ropa: P.ocre, tocado: 'turbante', k: 5 }); R.linea(Math.round(x) - 8, 89, Math.round(x) + 6, 88, P.madL); }
  R.recorte([0, 102, 319, 136]); c_olas(R, t, 0, 103, 319, 135, 40, null, 9); c_barca(R, 330 - ((t * 4) % 380), 114, t, 1, -1); R.recorte(null);
  R.recorte([0, 0, 319, 128]);
  // la galera, de costado: el palo adelantado (x ≈ 180, fuera de la barra del año) con su cofa y la entena atravesada en
  // horizontal con la vela aferrada; la grímpola ondea hacia la derecha
  const Pt = c_galera(R, 120, 128, 2.3, 1, t, { sem: 4, franja: P.rojo, palo: 86, altoPalo: 52, cofa: true, entena: [[124, 30], [14, 30]], viento: 1 });
  // un marinero sube por los obenques y baja
  { const f = (Math.sin(t * 0.6) + 1) / 2, [a, b] = Pt(78 + f * 5, 10 + f * 26); c_figurita(R, a - 1, b + 10, t, { ropa: P.marfil, tocado: 'gorro', k: 3 }); }
  R.recorte(null);
  // el agua entre el casco y el muelle, oscura, con reflejos que tiemblan
  for (let y = 129; y <= 136; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.3 + t * 3 + y) + Math.sin(x * 0.11 - t * 2); R.pset(x, y, v > 1.3 ? P.mar1 : v < -1.2 ? P.mar4 : P.mar3); }
  // la amarra de la bita a la galera
  const [ax, ay] = Pt(100, 8); for (let k = 0; k <= 24; k++) { const f = k / 24, x = 252 + (ax - 252) * f, y = 139 + (ay - 139) * f + Math.sin(f * Math.PI) * (4 + Math.sin(t * 1.3)); R.pset(Math.round(x), Math.round(y), P.cuerda); R.pset(Math.round(x), Math.round(y) + 1, P.madS); }
  // el fuego de la caldera de brea y su humo negro, que se lo lleva el viento
  for (let i = -5; i <= 5; i++) { const a = Math.max(0, 4 - Math.abs(i) * 0.6 + Math.sin(t * 13 + i * 1.7) * 1.4); for (let j = 0; j < a; j++) R.pset(78 + i, 157 - j, j > a - 1.5 ? P.llamaL : j > 1 ? P.llama : P.llamaS); }
  for (let k = 0; k < 14; k++) { const f = (t * 0.45 + k / 14) % 1, x = 76 + f * 22 + Math.sin(f * 8 + t * 1.3) * 2, y = 140 - f * 34; const c = f < 0.5 ? hex('#3a3434') : hex('#6a6460'); c_tinte(R, Math.round(x), Math.round(y), c, 0.75 - f * 0.6); c_tinte(R, Math.round(x) + 1, Math.round(y), c, 0.6 - f * 0.5); if (f < 0.6) c_tinte(R, Math.round(x), Math.round(y) - 1, c, 0.5 - f * 0.4); }
  // la cabria del muelle (por delante de la galera): dos pies de madera, el tirante de atrás, la polea y el fardo que
  // se iza, se mete por encima de la proa y baja a la cubierta; el gancho vuelve a por el siguiente de la pila
  const T = 10, cyc = Math.floor((t + 2) / T), u = ((t + 2) % T + T) % T, sv = (a, b) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
  const lean = u < 4 ? 0 : u < 6 ? sv(4, 6) : u < 8 ? 1 : 1 - sv(8, 10), apx = Math.round(270 - lean * 18), apy = 58 + Math.round(lean * 3);
  const quedan = 3 - (cyc % 3), pila = (n) => 150 - n * 9;
  let by, lleva = true; if (u < 1) by = pila(quedan - 1); else if (u < 4) by = Math.round(pila(quedan - 1) + (92 - pila(quedan - 1)) * sv(1, 4)); else if (u < 6) by = 92; else if (u < 8) by = Math.round(92 + 22 * sv(6, 8)); else { lleva = false; by = Math.round(92 + (pila(quedan - 2) - 9 - 92) * sv(8, 10)); }
  for (let n = 0; n < quedan - 1; n++) c_fardoR(R, 270, pila(n));
  for (const [bx, b2] of [[284, 162], [306, 164]]) { R.linea(bx, b2, apx, apy, P.k); R.linea(bx + 1, b2, apx + 1, apy, P.madS); R.linea(bx + 2, b2, apx + 2, apy, P.mad); R.rect(bx - 2, b2, bx + 4, b2 + 1, P.madD); }
  for (let k = 0; k <= 30; k++) { const f = k / 30; R.pset(Math.round(apx + (318 - apx) * f), Math.round(apy + (150 - apy) * f + Math.sin(f * Math.PI) * 3), P.cuerda); } R.rect(316, 148, 319, 152, P.piedraM);
  const sw = Math.round(Math.sin(t * 2.1) * (u > 3.5 && u < 6.5 ? 1.5 : 0.4)), hx = apx + sw;
  R.disco(apx, apy, 2.6, P.k); R.disco(apx, apy, 1.8, P.madL); R.pset(apx, apy, P.madD);
  R.linea(apx, apy, hx, by - (lleva ? 10 : 0), P.cuerda); for (let k = 0; k <= 20; k++) { const f = k / 20; R.pset(Math.round(apx - 2 + (236 - apx) * f), Math.round(apy + (102 - apy) * f + f * f * 4), P.cuerda); }
  R.pset(hx, by - (lleva ? 10 : -1), hex('#4a4040')); R.pset(hx + 1, by - (lleva ? 9 : 0), hex('#4a4040'));
  if (lleva) { if (u >= 6 && u < 8) { R.recorte([0, 0, 319, 103]); c_fardoR(R, hx, by); R.recorte(null); } else c_fardoR(R, hx, by); }
  for (let k = 0; k < 4; k++) { const gx = ((t * (11 + k * 4) + k * 90) % 380) - 30, gy = 14 + k * 9 + Math.sin(t * 1.4 + k) * 4; if (gx > 18 && gx < 172 && gy < 18) continue; c_gaviota(R, gx, gy, t, k, k % 2 ? 2 : 1); }
  { const s = Math.sin(t * 2.3) > 0.8 ? 1 : 0; c_gaviota(R, 96, 141 - s, 0.1, 0, 2); }
  const top = Pt(88, 8.5);
  return { suelo: 162, pasarela: [[236, 160], [Math.round(top[0]), Math.round(top[1])]], borda: 109, horizonte: 100, muelle: [0, 143, 319, 179], libre: [100, 230] };
}

// lo de delante en el muelle: la pasarela de tablas a la borda (con su pasamanos), un rollo de cabo en primer término a
// la derecha y, en la esquina de abajo a la izquierda, una caja de pescado con una gaviota que picotea
function c_muelleDelante(R, t, o) {
  const P = c_P, s = 2.3, Pt = (u, v) => [120 + (u - 60) * s, 128 + Math.sin(t * 1.3 + 4) * 0.5 * 1.6 - v * s - (u - 60) * Math.sin(t * 0.9 + 4) * 0.006 * s];
  const [tx, ty] = Pt(88, 8.5); c_pasarela(R, 236, 161, tx, ty, t);
  c_cabo(R, 306, 176, 9);
  { const x = -2, y = 179; R.rect(x, y - 12, x + 24, y, P.k); R.rect(x + 1, y - 11, x + 23, y - 1, P.mad); R.rect(x + 1, y - 11, x + 23, y - 10, P.madL); for (let i = x + 4; i < x + 22; i += 4) R.rect(i, y - 9, i, y - 2, P.madS);
    for (let k = 0; k < 5; k++) { R.pset(x + 4 + k * 4, y - 12, hex('#b8c8d4')); R.pset(x + 5 + k * 4, y - 12, hex('#e8f0f4')); R.pset(x + 6 + k * 4, y - 13, hex('#8a9aa8')); } }
  { const pica = Math.sin(t * 5 + 1) > 0.3 ? 1 : 0; c_gaviota(R, 18, 164 + pica, 0.1, 0, 2); }
}

const c_PIEDRA_C = pal({ crema: '#ecdcc0', cremaS: '#cdb894', rosa: '#c47a5a', rosaS: '#9a5a40', negra: '#3a3440', marmol: '#eeeae2', marmolS: '#c8c2b8', marmolV: '#a8a098', porfido: '#8a3a3a', serp: '#3a6a5a', techo: '#1e2a4a', techoS: '#141c34' });

// la sillería a rayas (ablaq: hiladas crema y rojizas) con juntas y grano, en la caja
function c_ablaq(R, x0, y0, x1, y1, alto = 6, sem = 0) {
  const Q = c_PIEDRA_C;
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / alto), j = (y - y0) % alto; for (let x = x0; x <= x1; x++) {
    let c = fila % 2 ? Q.rosa : Q.crema; if (h(x >> 1, y >> 1, 60 + sem) > 0.82) c = fila % 2 ? Q.rosaS : Q.cremaS; if (j === alto - 1 || (x + fila * 9) % 18 === 0) c = fila % 2 ? Q.rosaS : Q.cremaS; R.pset(x, y, c); } }
}

// la celosía de madera (mashrabiya) en un arco: torneados en rejilla con la luz que pasa por los huecos
function c_celosia(R, x0, y0, x1, y1, dentro, t, sem = 0) {
  const P = c_P;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (!dentro(x, y)) continue; const i = (x - x0) % 4, j = (y - y0) % 4;
    let c = (i === 0 || j === 0) ? P.madS : (i === 2 && j === 2) ? P.madL : (Math.sin(t * 0.8 + x * 0.2 + sem) > 0.6 && i === 2 && j === 1) ? hex('#fff8e0') : hex('#f2e2b0'); if (i === 0 && j === 0) c = P.madD; R.pset(x, y, c); }
}

// una palmera datilera (tronco escamado y penachos que se mecen), respeta R.recorte
function c_palmera(R, x, base, alto, t, k = 0) {
  const P = c_P, v = Math.sin(t * 0.9 + k) * 1.5;
  for (let j = 0; j < alto; j++) { const cx = x + Math.sin(j / alto * 1.4) * 4 + v * j / alto; R.pset(Math.round(cx), base - j, j % 3 ? P.tronco : P.troncoS); R.pset(Math.round(cx) + 1, base - j, P.troncoS); }
  const tx = x + Math.sin(1.4) * 4 + v, ty = base - alto;
  for (let f = 0; f < 8; f++) { const a = -Math.PI + f * Math.PI / 7 + Math.sin(t * 1.2 + f + k) * 0.08, L = 12 + (f % 3) * 2;
    for (let s = 0; s <= L; s++) { const x2 = tx + Math.cos(a) * s, y2 = ty + Math.sin(a) * s * 0.6 + (s / L) ** 2 * 7; R.pset(Math.round(x2), Math.round(y2), s > L * 0.6 ? P.palmaS : f % 2 ? P.palma : P.palmaL); if (s % 2 === 0) R.pset(Math.round(x2), Math.round(y2) + 1, P.palmaS); } }
  R.disco(tx, ty + 2, 1.6, hex('#c86a2a')); R.disco(tx + 2, ty + 3, 1.3, hex('#a8501e'));
}

// una lámpara de mezquita de vidrio esmaltado colgada de tres cadenas, con la llama que tiembla; devuelve la fuerza
function c_lamparaVidrio(R, x, y, ytecho, t, k = 0) {
  const { pset, linea, poligono, disco } = R, P = c_P, f = 0.85 + 0.15 * Math.sin(t * 12 + k) * Math.sin(t * 6.7 + k * 2);
  for (let yy = ytecho; yy < y - 12; yy++) pset(x, yy, yy % 2 ? P.latonS : P.laton); for (const dx of [-5, 0, 5]) linea(x, y - 12, x + dx, y - 6, P.latonS);
  poligono([[x - 6, y - 6], [x + 6, y - 6], [x + 4, y - 2], [x + 7, y + 3], [x + 4, y + 7], [x - 4, y + 7], [x - 7, y + 3], [x - 4, y - 2]], P.k);
  poligono([[x - 5, y - 5], [x + 5, y - 5], [x + 3, y - 2], [x + 6, y + 3], [x + 3, y + 6], [x - 3, y + 6], [x - 6, y + 3], [x - 3, y - 2]], (px, py) => (py === y + 1 ? P.az : py === y + 3 && (px & 1) ? P.rojo : py < y - 2 ? hex('#cfe4d8') : hex('#e8f4e8')));
  disco(x, y + 2, 2.4 * f, P.llama); pset(x, y + 1, P.llamaL); pset(x - 3, y - 3, hex('#ffffff'));
  for (const dx of [-3, 0, 3]) pset(x + dx, y + 7, P.oro);
  return f;
}

// el salón por dentro (fondo fijo): techo de casetones azules con estrellas de oro, friso de arquillos, muros a rayas,
// dos ventanas de arco con celosía arriba y el jardín abajo (cielo, tapia, adelfas), el gran iwán central con el panel
// de azulejos, el estrado con sus cojines y el frente de mármol taraceado, columnas de mármol con capiteles, dos
// candeleros altos y el suelo de mármol geométrico con la alfombra que llega hasta el estrado
function c_cairoFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, P = c_P, Q = c_PIEDRA_C, K = P.k;
  for (let y = 0; y <= 12; y++) for (let x = 0; x < 320; x++) { const i = x % 20, j = y % 13; let c = (i < 2 || j < 1) ? P.madD : Q.techo; if (i > 3 && i < 18 && j > 2 && j < 11 && h(x, y, 61) > 0.97) c = P.oroS; if (i === 10 && j === 6) c = P.oroS; if (i === 2 || j === 1) c = c_mez(P.rojoS, Q.techoS, 0.5); pset(x, y, c); }
  rect(0, 13, 319, 13, K); for (let x = 0; x < 320; x++) for (let y = 14; y <= 19; y++) { const i = x % 8, j = y - 14; pset(x, y, j === 5 ? Q.cremaS : (Math.abs(i - 4) < 3 - j * 0.4 && j < 4) ? Q.cremaS : j < 2 ? Q.crema : c_mez(Q.crema, P.k, 0.08)); }
  c_ablaq(R, 0, 20, 319, 126, 6, 0);
  for (let y = 20; y < 40; y++) for (let x = 0; x < 320; x++) if (h(x, y, 62) < (40 - y) / 40 * 0.5) c_tinte(R, x, y, K, 0.12);
  // las dos ventanas laterales: el marco de dovelas, la celosía y el jardín (el jardín lo repinta la parte viva)
  for (const [xa, xb] of [[46, 94], [226, 274]]) { const ys = 68, d = (x, y) => c_enArco(x, y, xa, xb, ys);
    for (let y = 30; y <= 114; y++) for (let x = xa - 6; x <= xb + 6; x++) { if (d(x, y) || !c_enArco(x, y, xa - 6, xb + 6, ys, 0.6)) continue; const ang = Math.atan2(y - ys, x - (xa + xb) / 2), seg = Math.floor((ang + Math.PI) / 0.26); pset(x, y, y < ys ? (seg % 2 ? Q.rosa : Q.crema) : (Math.floor((y - ys) / 5) % 2 ? Q.crema : Q.rosa)); }
    c_celosia(R, xa, 30, xb, 76, (x, y) => d(x, y) && y < 77, 0, xa);
    rect(xa, 77, xb, 78, P.madD); rect(xa - 2, 112, xb + 2, 114, Q.marmol); rect(xa - 2, 115, xb + 2, 115, Q.marmolS);
    rect(xa - 3, 116, xb + 3, 126, Q.marmolS); for (let x = xa; x < xb; x += 8) { rect(x, 118, x + 5, 124, Q.porfido); rect(x + 1, 119, x + 4, 123, Q.serp); pset(x + 2, 120, Q.marmol); } }
  // las columnas de mármol con capitel y basa, entre ventanas e iwán
  for (const cx of [24, 104, 216, 296]) { rect(cx - 4, 48, cx + 4, 126, K); rect(cx - 3, 50, cx + 3, 124, Q.marmol); rect(cx + 1, 50, cx + 3, 124, Q.marmolS); for (let y = 54; y < 124; y += 9) pset(cx - 1, y, Q.marmolV); pset(cx, 60, Q.marmolV); pset(cx - 2, 90, Q.marmolV);
    rect(cx - 6, 46, cx + 6, 50, K); rect(cx - 5, 47, cx + 5, 49, P.oro); rect(cx - 5, 47, cx + 5, 47, P.oroL); rect(cx - 6, 122, cx + 6, 126, K); rect(cx - 5, 123, cx + 5, 125, Q.marmolS); }
  // el iwán central: el gran arco de dovelas, el panel de azulejos del fondo con su arco ciego, los cojines y el estrado
  const xa = 114, xb = 206, ys = 52, dI = (x, y) => c_enArco(x, y, xa, xb, ys, 0.6);
  for (let y = 14; y <= 126; y++) for (let x = xa - 8; x <= xb + 8; x++) { if (dI(x, y)) continue; if (!c_enArco(x, y, xa - 8, xb + 8, ys, 0.6)) continue; const ang = Math.atan2(y - ys, x - 160), seg = Math.floor((ang + Math.PI) / 0.17); pset(x, y, y < ys ? (seg % 2 ? Q.rosa : Q.crema) : (Math.floor((y - ys) / 6) % 2 ? Q.crema : Q.rosa)); if (y < ys && Math.abs(((ang + Math.PI) / 0.17) % 1) < 0.1) pset(x, y, Q.rosaS); }
  for (let y = 14; y <= 112; y++) for (let x = xa; x <= xb; x++) { if (!dI(x, y)) continue; const i = x % 10, j = (y + 3) % 10, a = Math.abs(i - 4.5), b = Math.abs(j - 4.5);
    let c = (i === 0 || j === 0) ? P.junta : a + b < 2 ? P.tur : a + b < 3.2 ? P.azB : (a > 3 && b > 3) ? P.azL : a + b > 6 ? P.az : P.azB; if (x < xa + 4 || x > xb - 4) c = c_mez(c, K, 0.35); else if (y < 40) c = c_mez(c, K, 0.2); pset(x, y, c); }
  for (let y = 30; y <= 96; y++) for (let x = 132; x <= 188; x++) { const e = c_enArco(x, y, 132, 188, 56, 0.6), e2 = c_enArco(x, y, 136, 184, 58, 0.6); if (e && !e2) pset(x, y, P.oro); else if (e2) pset(x, y, ((x + y) % 6 === 0) ? P.oroS : ((x - y + 600) % 6 === 0) ? hex('#a8302a') : hex('#c8402e')); }
  // los cojines de respaldo, de brocado dorado y rojo, y el estrado con su alfombra
  for (let k = 0; k < 4; k++) { const x0 = 120 + k * 21, c = k % 2 ? P.rojo : P.oro, cS = k % 2 ? P.rojoS : P.oroS, cL = k % 2 ? P.rojoL : P.oroL;
    poligono([[x0, 98], [x0 + 20, 98], [x0 + 21, 112], [x0 - 1, 112]], K); poligono([[x0 + 1, 99], [x0 + 19, 99], [x0 + 20, 111], [x0, 111]], (x, y) => (y < 101 ? cL : x > x0 + 16 ? cS : (x + y) % 4 === 0 ? cL : c)); pset(x0, 98, P.oroL); pset(x0 + 20, 98, P.oroL); }
  rect(110, 111, 210, 118, K); for (let y = 112; y <= 117; y++) for (let x = 111; x <= 209; x++) pset(x, y, y === 112 ? P.rojoL : (x + y * 3) % 7 === 0 ? P.oro : (x % 12 < 2) ? P.indigo : P.rojo);
  rect(108, 118, 212, 127, K); rect(109, 119, 211, 126, Q.marmol); for (let k = 0; k < 6; k++) { const x = 112 + k * 17; rect(x, 120, x + 13, 125, Q.porfido); rect(x + 2, 121, x + 11, 124, Q.serp); poligono([[x + 6.5, 120], [x + 13, 122.5], [x + 6.5, 125], [x, 122.5]], Q.marmol); pset(x + 6, 122, P.oro); }
  rect(109, 119, 211, 119, hex('#ffffff'));
  // el suelo de mármol: losas en perspectiva (blancas con vetas, pórfido y serpentina en las juntas) y la alfombra
  for (let y = 127; y < 180; y++) { const d = y - 70; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 5, v = 380 / d, bu = Math.floor(u), bv = Math.floor(v), fu = u - bu, fv = v - bv;
    let c = (bu + bv) % 2 ? Q.marmol : Q.marmolS; if (fu < 0.08 || fv < 0.1) c = (bu + bv) % 3 === 0 ? Q.porfido : Q.serp; else if (Math.abs(fu - fv) < 0.04 || Math.abs(fu + fv - 1) < 0.04) c = Q.marmolV; else if (h(x, y, 63) > 0.93) c = Q.marmolV; pset(x, y, c); } }
  for (let y = 127; y < 180; y++) { const v = (y - 127) / 52, l = Math.round(132 - v * 34), r = Math.round(188 + v * 34); for (let x = l; x <= r; x++) { const u = (x - l) / (r - l); let c = P.rojo;
    if (u < 0.08 || u > 0.92) c = (y + x) % 4 === 0 ? P.oro : P.indigo; else if (u < 0.11 || u > 0.89) c = P.oroS; else { const dd = Math.abs(x - 160) * 1.2 + Math.abs((y - 152) * 1.6); if (dd < 5) c = P.oro; else if (dd < 10) c = P.indigo; else if (dd < 12) c = P.marfil; else if ((x + y) % 9 === 0) c = P.rojoL; }
    pset(x, y, c); } pset(l - 1, y, P.k); pset(r + 1, y, P.k); }
  // los dos candeleros de latón altos, a los lados del estrado
  for (const cx of [100, 220]) { rect(cx - 5, 140, cx + 5, 144, K); rect(cx - 4, 141, cx + 4, 143, P.laton); rect(cx - 1, 104, cx + 1, 141, P.latonS); rect(cx - 1, 104, cx - 1, 141, P.latonL); for (const y of [112, 124]) { rect(cx - 3, y, cx + 3, y + 2, K); rect(cx - 2, y + 1, cx + 2, y + 1, P.laton); } rect(cx - 4, 101, cx + 4, 104, K); rect(cx - 3, 102, cx + 3, 103, P.laton); rect(cx - 1, 92, cx + 1, 101, P.vela); rect(cx + 1, 92, cx + 1, 101, P.velaS); }
  // la sombra del friso en la pared
}

function c_cairo(R, t, o) {
  const P = c_P; c_fijo(R, 'cairo', () => c_cairoFijo(R));
  // el jardín por las ventanas: cielo, la tapia del jardín, palmeras que se mecen y un guardia que pasea
  for (const [xa, xb, k] of [[46, 94, 0], [226, 274, 1]]) { R.recorte([xa, 79, xb, 111]);
    c_degradado(R, xa, 79, xb, 100, c_CIELO.dia.slice(1)); c_nubes(R, t, xa - 20, 80, xb + 20, 92, c_NUBE.dia, 2, 70 + k);
    c_r(R, xa, 100, xb, 111, hex('#d8c4a0')); for (let x = xa; x <= xb; x += 6) c_r(R, x, 100, x, 111, hex('#c0aa84')); c_r(R, xa, 99, xb, 99, hex('#ecdcc0'));
    for (let j = 0; j < 3; j++) R.disco(xa + 8 + j * 16, 103, 5, j % 2 ? P.hoja : P.hojaL);
    c_palmera(R, xa + 14 + k * 20, 111, 24, t, k); c_palmera(R, xa + 36 - k * 10, 111, 18, t, k + 3);
    const gx = xa + 6 + ((t * 4 + k * 20) % 40), ida = Math.floor((t * 4 + k * 20) / 40) % 2; c_figurita(R, ida ? xb - (gx - xa) + xa : gx, 110, t, { anda: true, dir: ida ? -1 : 1, ropa: hex('#c8402e'), tocado: 'turbante', lanza: true, k: k * 3 });
    R.recorte(null); }
  // las lámparas de vidrio y la luz que echan, los candeleros con su llama y el humo del pebetero
  let f = 0; for (const [x, y, k] of [[160, 46, 0], [70, 40, 1], [250, 40, 2]]) { f = c_lamparaVidrio(R, x, y, 14, t, k); c_luzCalida(R, x, y + 4, 30, f, hex('#ffd890'), 0.22); }
  for (const cx of [100, 220]) { const a = Math.round(Math.sin(t * 9 + cx) * 0.6); R.pset(cx, 91, P.k); R.pset(cx + a, 90, P.llama); R.pset(cx + a, 89, P.llamaL); R.pset(cx, 88, P.llama); c_luzCalida(R, cx, 90, 14, f, hex('#ffd890'), 0.2); }
  c_humo(R, 236, 138, t);
  { const x = 236, y = 144; R.rect(x - 4, y - 6, x + 4, y, P.k); R.rect(x - 3, y - 5, x + 3, y - 1, P.laton); R.rect(x - 3, y - 5, x - 2, y - 1, P.latonL); R.rect(x - 1, y - 8, x + 1, y - 6, P.latonS); R.rect(x - 5, y, x + 5, y + 1, P.latonS); }
  return { suelo: 160, estrado: [110, 111, 210, 127], asiento: [146, 118], ventanas: [[46, 30, 94, 111], [226, 30, 274, 111]], alfombra: [98, 127, 222, 179] };
}

// el humo del pebetero, que sube en volutas y se deshace
function c_humo(R, x, y, t) { for (let k = 0; k < 14; k++) { const f = ((t * 0.35 + k / 14) % 1), yy = y - f * 40, xx = x + Math.sin(f * 7 + t * 0.8) * (2 + f * 6); if (h(k, Math.floor(t * 3), 64) > f * 0.9) c_tinte(R, Math.round(xx), Math.round(yy), hex('#e8e4ec'), 0.55 - f * 0.4); c_tinte(R, Math.round(xx) + 1, Math.round(yy), hex('#d0ccd8'), 0.35 - f * 0.25); } }

// lo de delante en el salón: el frente del cojín del sultán (le tapa las piernas: parece sentado) y, en primer término,
// dos tinajas con plantas a los lados
function c_cairoDelante(R, t, o) {
  const P = c_P, K = P.k;
  R.poligono([[142, 113], [178, 113], [180, 121], [140, 121]], K); R.poligono([[143, 114], [177, 114], [178, 120], [142, 120]], (x, y) => (y < 116 ? P.oroL : (x + y) % 4 === 0 ? P.oroS : P.oro));
  for (const x of [142, 178]) { R.pset(x, 113, P.rojo); R.pset(x, 121, P.rojo); }
  for (const [x, s] of [[14, 1], [306, -1]]) { R.poligono([[x - 10, 179], [x + 10, 179], [x + 12, 166], [x + 8, 158], [x - 8, 158], [x - 12, 166]], K); R.poligono([[x - 9, 179], [x + 9, 179], [x + 11, 166], [x + 7, 159], [x - 7, 159], [x - 11, 166]], (px) => (px * s > x * s + 5 ? P.azS : px * s < x * s - 4 ? P.azL : P.az)); R.rect(x - 7, 166, x + 7, 167, P.azB);
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.3 + Math.sin(t * 1.1 + k) * 0.05, L = 14 + (k % 3) * 4; for (let j = 0; j < L; j++) R.pset(Math.round(x + Math.cos(a) * j), Math.round(158 + Math.sin(a) * j), j > L - 4 ? P.palmaL : P.palma); } }
}

// el estrado de cerca (fondo fijo): la sillería a rayas arriba con el friso de lacería, el panel de azulejos con el nicho
// dorado, las ventanas de celosía, los cojines de brocado, la alfombra del estrado, el frente de madera taraceada con
// nácar, el escalón y el suelo de mármol; la mesita baja con la bandeja, el aguamanil y los dátiles
function c_tronoFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, P = c_P, Q = c_PIEDRA_C, K = P.k;
  c_ablaq(R, 0, 0, 319, 40, 7, 4);
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if (h(x, y, 65) < (30 - y) / 30 * 0.45) c_tinte(R, x, y, K, 0.14);
  for (let y = 40; y <= 47; y++) for (let x = 0; x < 320; x++) { const i = x % 12, j = y - 40, l = Math.abs(i - 6) === j || Math.abs(i - 6) === 7 - j; pset(x, y, j === 0 || j === 7 ? P.oroS : l ? P.oro : P.indigo); }
  for (let y = 48; y <= 104; y++) for (let x = 0; x < 320; x++) { const r = Math.floor((y - 48) / 8), i = (x + (r % 2) * 7) % 14, j = (y - 48) % 8, a = Math.abs(i - 7), b = Math.abs(j - 4);
    let c = (j === 0 || i === 0) ? P.junta : a + b * 1.6 < 3 ? P.tur : a + b * 1.6 < 5 ? P.azB : a + b * 1.6 < 6.5 ? P.az : P.azB; if (c === P.azB && h(x >> 2, y >> 2, 66) > 0.85) c = P.azBS; pset(x, y, c); }
  // el zócalo de mármol a los lados del estrado
  for (let y = 105; y <= 151; y++) for (let x = 0; x < 320; x++) { const i = x % 20, j = (y - 105) % 12; pset(x, y, (i === 0 || j === 0) ? Q.marmolS : (Math.abs(i - 10) + Math.abs(j - 6) * 1.6 < 6) ? Q.porfido : (Math.abs(i - 10) + Math.abs(j - 6) * 1.6 < 7.5) ? Q.marmolS : h(x, y, 68) > 0.92 ? Q.marmolV : Q.marmol); }
  rect(0, 104, 319, 104, P.oroS);
  // las ventanas de celosía a los lados, con su marco
  for (const [xa, xb] of [[16, 68], [252, 304]]) { const dV = (x, y) => c_enArco(x, y, xa, xb, 70, 0.6); for (let y = 44; y <= 100; y++) for (let x = xa - 4; x <= xb + 4; x++) if (!dV(x, y) && c_enArco(x, y, xa - 4, xb + 4, 70, 0.6)) pset(x, y, (Math.floor(Math.atan2(y - 70, x - (xa + xb) / 2) / 0.3) % 2) ? Q.rosa : Q.crema); c_celosia(R, xa, 44, xb, 100, dV, 0, xa); }
  // el nicho dorado detrás del sultán, con el arco de dovelas
  for (let y = 30; y <= 104; y++) for (let x = 112; x <= 208; x++) { const e = c_enArco(x, y, 112, 208, 64, 0.6), e2 = c_enArco(x, y, 120, 200, 66, 0.6); if (e && !e2) pset(x, y, (Math.floor(Math.atan2(y - 66, x - 160) / 0.2) % 2) ? Q.rosa : Q.crema); else if (e2) pset(x, y, (x + y) % 8 === 0 ? P.oroL : (x - y + 800) % 8 === 0 ? P.oroS : P.oro); }
  for (let k = 0; k < 5; k++) { const cx = 136 + k * 12, cy = 82 + (k % 2) * 8; disco(cx, cy, 3, P.oroS); disco(cx, cy, 1.4, P.rojo); }
  // los cojines de respaldo (brocado) y el estrado con su alfombra en perspectiva
  for (let k = 0; k < 7; k++) { const x0 = 66 + k * 27, c = [P.rojo, P.oro, P.verde, P.oro, P.rojo, P.oro, P.verde][k], cS = c_mez(c, K, 0.3), cL = c_mez(c, P.marfil, 0.3);
    poligono([[x0, 84], [x0 + 26, 84], [x0 + 28, 108], [x0 - 2, 108]], K); poligono([[x0 + 1, 85], [x0 + 25, 85], [x0 + 27, 107], [x0 - 1, 107]], (x, y) => (y < 88 ? cL : x > x0 + 21 ? cS : ((x + y) % 5 === 0 || (x - y + 500) % 5 === 0) ? cL : c)); for (const xx of [x0, x0 + 26]) { pset(xx, 84, P.oroL); pset(xx, 85, P.oroS); } }
  for (let y = 106; y <= 128; y++) { const v = (y - 106) / 22, l = Math.round(56 - v * 20), r = Math.round(264 + v * 20); for (let x = l; x <= r; x++) { const u = (x - l) / (r - l); let c = P.rojo;
    if (u < 0.05 || u > 0.95 || y < 108 || y > 126) c = (x + y) % 4 === 0 ? P.oro : P.indigo; else { for (const cu of [0.2, 0.8]) { const dd = Math.abs(u - cu) * 280 + Math.abs(y - 117) * 1.4; if (dd < 4) c = P.oro; else if (dd < 9) c = P.indigo; else if (dd < 11) c = P.marfil; } if (c === P.rojo && (x * 3 + y * 5) % 23 === 0) c = P.rojoL; }
    pset(x, y, c); } pset(l - 1, y, K); pset(r + 1, y, K); }
  rect(34, 129, 286, 146, K); rect(35, 130, 285, 145, P.madS); rect(35, 130, 285, 131, P.madL);
  for (let k = 0; k < 10; k++) { const x = 39 + k * 25; rect(x, 133, x + 20, 143, P.madD); rect(x + 1, 134, x + 19, 142, P.mad); poligono([[x + 10, 134], [x + 18, 138], [x + 10, 142], [x + 2, 138]], P.madS); disco(x + 10, 138, 1.6, P.marfil); for (const [dx, dy] of [[4, 135], [16, 135], [4, 141], [16, 141]]) pset(x + dx, dy, hex('#f0eadc')); }
  rect(24, 146, 296, 151, K); rect(25, 147, 295, 150, Q.marmol); rect(25, 147, 295, 147, hex('#ffffff')); rect(25, 150, 295, 150, Q.marmolS);
  for (let y = 152; y < 180; y++) { const d = y - 110; for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 4, v = 300 / d, bu = Math.floor(u), bv = Math.floor(v), fu = u - bu, fv = v - bv; let c = (bu + bv) % 2 ? Q.marmol : Q.marmolS; if (fu < 0.07 || fv < 0.1) c = Q.porfido; else if (h(x, y, 67) > 0.94) c = Q.marmolV; pset(x, y, c); } }
  // la mesita baja de taracea con la bandeja de latón, el aguamanil y los dátiles
  { const x = 96, y = 120; rect(x - 16, y - 10, x + 16, y - 7, K); rect(x - 15, y - 9, x + 15, y - 8, P.mad); rect(x - 15, y - 9, x + 15, y - 9, P.madL); for (const lx of [x - 13, x + 11]) { rect(lx, y - 7, lx + 2, y + 2, K); rect(lx, y - 6, lx + 1, y + 2, P.madS); } rect(x - 12, y - 4, x + 12, y - 3, P.madS);
    poligono([[x - 15, y - 12], [x + 15, y - 12], [x + 13, y - 10], [x - 13, y - 10]], P.laton); linea(x - 15, y - 12, x + 15, y - 12, P.latonL);
    poligono([[x - 7, y - 12], [x - 1, y - 12], [x, y - 17], [x - 2, y - 22], [x - 6, y - 22], [x - 8, y - 17]], P.latonS); poligono([[x - 6, y - 13], [x - 2, y - 13], [x - 1, y - 17], [x - 3, y - 21], [x - 5, y - 21], [x - 7, y - 17]], P.laton); linea(x - 1, y - 18, x + 4, y - 22, P.latonS); pset(x - 6, y - 18, P.latonL); rect(x - 5, y - 24, x - 3, y - 22, P.latonS);
    for (let k = 0; k < 6; k++) disco(x + 4 + (k % 3) * 3, y - 13 - Math.floor(k / 3) * 2, 1.3, k % 2 ? hex('#7a3a1e') : hex('#5a2a14')); }
}

function c_trono(R, t, o) {
  const P = c_P; c_fijo(R, 'trono', () => c_tronoFijo(R));
  // la luz que entra por las celosías y titila en la alfombra
  for (const [x0, k] of [[30, 0], [262, 1]]) for (let j = 0; j < 7; j++) for (let i = 0; i < 6; i++) { const x = x0 + i * 6 + j * 3 + (k ? -j * 6 : 0), y = 109 + j * 3; if (Math.sin(t * 0.9 + i + j * 2 + k) > -0.4) c_tinte(R, x, y, hex('#fff2c0'), 0.35); }
  const f = c_lamparaVidrio(R, 160, 46, 0, t, 0); c_luzCalida(R, 160, 56, 40, f, hex('#ffd890'), 0.22);
  // el cofre (o.cofre 0–1: abre la tapa; false: sin cofre) y el pebetero con su humo
  if (o.cofre !== false) { if (PIEZAS_PR.cofre) PIEZAS_PR.cofre(R, 222, 124, { abre: typeof o.cofre === 'number' ? o.cofre : 0 }); else { R.rect(212, 110, 232, 124, P.k); R.rect(213, 111, 231, 123, P.mad); } }
  { const x = 248, y = 124; R.rect(x - 5, y - 8, x + 5, y, P.k); R.rect(x - 4, y - 7, x + 4, y - 1, P.laton); R.rect(x - 4, y - 7, x - 3, y - 1, P.latonL); for (let i = -3; i <= 3; i += 2) R.pset(x + i, y - 5, P.latonS); R.rect(x - 2, y - 10, x + 2, y - 8, P.latonS); R.pset(x, y - 11, P.oro); }
  c_humo(R, 248, 112, t);
  // el abanico de plumas de pavo real en su pie, que se mueve despacio
  { const x = 280, y = 128, a = Math.sin(t * 0.8) * 0.06; R.linea(x, y, x, y - 30, P.madD); for (let k = 0; k < 7; k++) { const ang = -Math.PI / 2 + (k - 3) * 0.16 + a; const ex = x + Math.cos(ang) * 26, ey = y - 28 + Math.sin(ang) * 26 + 26; R.linea(x, y - 28, Math.round(ex), Math.round(ey - 22), hex('#3a6a4a')); R.disco(ex, ey - 22, 2.4, hex('#2a8a7a')); R.disco(ex, ey - 22, 1.3, hex('#2a3a8a')); R.pset(Math.round(ex), Math.round(ey - 22), P.oro); } }
  return { suelo: 168, sueloEstrado: 120, asiento: [150, 120], cofre: [222, 124], estrado: [34, 106, 286, 146] };
}

// lo de delante en el trono: el frente del gran cojín del asiento (tapa las piernas del sultán: queda sentado), con
// borlas de oro
function c_tronoDelante(R, t, o) {
  const P = c_P, K = P.k;
  R.poligono([[138, 116], [184, 116], [187, 127], [135, 127]], K); R.poligono([[139, 117], [183, 117], [186, 126], [136, 126]], (x, y) => (y < 119 ? P.oroL : (x + y) % 4 === 0 ? P.rojo : (x - y + 400) % 4 === 0 ? P.oroS : P.oro));
  for (const x of [136, 186]) { R.pset(x, 127, P.rojo); R.pset(x, 128, P.rojoS); R.pset(x, 129, P.rojo); }
}

// los colores del decorado D: yeso, roble, pizarra y tiza; el otoño de New Hampshire; el despacho militar; la librería
const d_P = pal({
  yeso: '#e6dabe', yesoS: '#d4c6a2', yesoL: '#f2e9d2', yesoD: '#b8a884', techo: '#dcd0b2', techoS: '#c8bb9a',
  roble: '#a8743e', robleS: '#7e5228', robleL: '#c8945a', robleD: '#56361a', friso: '#8a5a30', frisoS: '#6a4222', frisoL: '#a8723e',
  pizarra: '#2e5a46', pizarraS: '#244a3a', pizarraL: '#3c6c56', tiza: '#e8eee4', tizaS: '#9cb4a4', tizaM: '#c4d4c8',
  hierro: '#a8a294', hierroS: '#76705f', hierroL: '#cac4b4', hierroD: '#4e4a40', marco: '#efe9da', marcoS: '#c4bca8',
  cielo0: '#5e98d0', cielo1: '#7cb0dc', cielo2: '#a4c8e4', cielo3: '#cfe0ec', nubeL: '#ffffff', nubeM: '#e4ecf4', nubeS: '#b4c6da',
  arce0: '#8a2418', arce1: '#c43a22', arce2: '#e46a2a', arce3: '#f0a038', oro0: '#b07a18', oro1: '#e0a828', oro2: '#f4d060',
  pino0: '#1e3a2a', pino1: '#2e5238', pino2: '#44704a', hierba: '#6a8a3a', hierbaS: '#4e6a2a', hierbaL: '#8aa84a', tronco: '#4a3426', troncoL: '#6a4e38',
  ladr: '#9a4a36', ladrS: '#743426', ladrL: '#b8624a', papel: '#f2ecdc', papelS: '#d8ccb0', sepia: '#d8c08a', sepiaS: '#a88a5a', sepiaD: '#5a3e22',
  // el despacho de la base
  bloque: '#b4c4aa', bloqueS: '#9aac90', bloqueL: '#c8d6be', bloqueD: '#7e9076', verdeB: '#6e8a68', verdeBS: '#566e52', verdeBL: '#86a07e',
  lino: '#b8b098', linoS: '#8e8670', linoL: '#d0c8b0', linoV: '#6e7a62', acero: '#8e9a94', aceroS: '#66706c', aceroL: '#b8c4be', aceroD: '#3e4644',
  plata: '#c8ccd4', plataS: '#8a909c', plataL: '#eef0f4', pista: '#7a7a7e', pistaS: '#5e5e64', pistaL: '#9a9a9c',
  // la casa y el porche
  tabla: '#f0ece2', tablaS: '#c8c2b2', tablaL: '#ffffff', contra: '#2e5440', contraS: '#1e3a2c', porche: '#8a7a68', porcheS: '#665a4c', porcheL: '#a8988a',
  piedra: '#8a867e', piedraS: '#625e58', piedraL: '#aaa69c', grava: '#b0a28a', gravaS: '#8a7e6a', buzon: '#2a3a34', buzonL: '#4a5e56',
  // la librería y la imprenta
  estante: '#7a4a28', estanteS: '#56321a', estanteL: '#9a6436', estanteD: '#3a2010', chapa: '#d8ccaa', chapaS: '#bcae8a', chapaL: '#ece2c6',
  tablon: '#9a6a3c', tablonS: '#76502a', tablonL: '#b8844e', alfombra: '#7a2a2a', alfombraS: '#5a1e1e', alfombraL: '#a84a3a',
  maquina: '#5a7a6a', maquinaS: '#3e5a4c', maquinaL: '#7a9a88', maquinaD: '#26382e', hormigon: '#9a968c', hormigonS: '#7a766c', hormigonL: '#b4b0a6',
  laton: '#c8a040', latonS: '#8a6a20', latonL: '#ecd078',
});

// los lomos de los libros (cuerpo, sombra, luz)
const d_LOMOS = [['#7a2a2a', '#561c1c', '#a04040'], ['#2a4a7a', '#1c3456', '#4068a0'], ['#3a6a3a', '#284c28', '#548a54'], ['#c8a040', '#8a6a20', '#e8c868'],
  ['#5a3a6a', '#3e284a', '#7a568a'], ['#d8d0b8', '#a8a088', '#f0ead8'], ['#a85a2a', '#7a3e1c', '#c87a44'], ['#2a5a5a', '#1c4040', '#447a7a'], ['#3a3a44', '#26262e', '#5a5a66']]
  .map((l) => l.map(hex));

const d_capas = new Map();

// pinta una vez lo fijo de un encuadre en un búfer (R.nuevo) y lo devuelve para copiarlo en cada fotograma
function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  return b;
}

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function d_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe un rectángulo hacia col (sombra con C.k, luz con blanco); trama: solo en damero
function d_tinte(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (!trama || ((x + y) & 1) === 0) R.pset(x, y, d_mez(R.pget(x, y), col, a));
}

// rectángulo que respeta R.recorte (R.rect no lo hace): con linea, fila a fila
function d_rc(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(x0, y, x1, y, c); }

// el cielo de otoño tramado dentro de cl = [x0, y0, x1, y1] (lo recorta ahí): cuatro tonos que se funden con trama
// desde arriba (o.y0) hasta el horizonte (o.hor); nubes de tres tonos en tres capas a tres velocidades y pájaros
function d_cielo(R, cl, t, o = {}) {
  const P = d_P, ya = o.y0 ?? cl[1], hor = o.hor ?? cl[3], cols = [P.cielo0, P.cielo1, P.cielo2, P.cielo3];
  R.recorte(cl);
  for (let y = cl[1]; y <= cl[3]; y++) { const u = Math.max(0, Math.min(0.999, (y - ya) / Math.max(1, hor - ya))) * 3, i = Math.floor(u), f = u - i;
    for (let x = cl[0]; x <= cl[2]; x++) R.pset(x, y, f > 0.25 + 0.5 * h(x & 3, y & 3, 9) && i < 3 ? cols[i + 1] : cols[i]); }
  const ancho = (o.ancho ?? 360), base = cl[0] - 40;
  [[0.8, 0.6, 3], [1.7, 0.85, 3], [3.2, 1.1, 2]].forEach(([v, s, n], capa) => {
    for (let k = 0; k < n; k++) { const x = base + (((h(k, capa, 51 + (o.k ?? 0)) * ancho - t * v) % ancho) + ancho) % ancho,
      y = ya + 6 + capa * 7 + h(k, capa, 52 + (o.k ?? 0)) * Math.max(4, (hor - ya) * 0.35);
      d_nube(R, x, y, (12 + h(k, capa, 53) * 14) * s); } });
  if (o.pajaros !== false) for (let k = 0; k < 3; k++) { const x = cl[0] + ((h(k, 4, 54) * 400 + t * (9 + k * 3)) % 400) - 40, y = ya + 8 + k * 5 + Math.sin(t * 0.7 + k) * 3, a = Math.sin(t * 9 + k * 2) > 0 ? 1 : 0;
    R.pset(x, y, C.k); R.pset(x - 1, y - a, C.k); R.pset(x + 1, y - a, C.k); R.pset(x - 2, y - 1 + a, C.k); R.pset(x + 2, y - 1 + a, C.k); }
  R.recorte(null);
}

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba); respeta R.recorte
function d_nube(R, cx, cy, w) {
  const P = d_P, r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.75], [-w * 0.12, -1, r * 0.95], [w * 0.18, -0.5, r], [w * 0.42, 1, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.5, rr, P.nubeS);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, P.nubeM);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.55, P.nubeL);
}

// un arce de otoño que se mece (x, suelo: pie del tronco; r: tamaño; tono: 'rojo' o 'oro'); respeta R.recorte
function d_arce(R, x, suelo, t, r, tono = 'rojo') {
  const P = d_P, [c0, c1, c2, c3] = tono === 'oro' ? [P.oro0, P.oro1, P.oro2, hex('#fae6a0')] : [P.arce0, P.arce1, P.arce2, P.arce3];
  const m = Math.sin(t * 1.1 + x * 0.3) * 1.2;
  d_rc(R, x - 1, suelo - r * 1.2, x + 1, suelo, P.tronco); R.linea(x - 1, suelo - r * 1.2, x - 1, suelo, P.troncoL);
  R.linea(x, suelo - r * 1.1, x - r * 0.5 + m, suelo - r * 1.6, P.tronco); R.linea(x, suelo - r * 1.0, x + r * 0.55 + m, suelo - r * 1.5, P.tronco);
  const B = [[0, -r * 1.55, r * 0.7], [-r * 0.6, -r * 1.25, r * 0.55], [r * 0.62, -r * 1.3, r * 0.55], [-r * 0.25, -r * 2.0, r * 0.5], [r * 0.35, -r * 1.9, r * 0.48]];
  for (const [dx, dy, rr] of B) R.disco(x + dx + m, suelo + dy + 1, rr, c0);
  for (const [dx, dy, rr] of B) R.disco(x + dx + m - 0.5, suelo + dy, rr * 0.86, c1);
  for (const [dx, dy, rr] of B) R.disco(x + dx + m - 1.4, suelo + dy - 1.4, rr * 0.5, c2);
  for (let k = 0; k < r * 2; k++) { const a = h(k, 1, 61 + x) * 6.28, d = h(k, 2, 61 + x) * r * 1.1, px = x + m + Math.cos(a) * d * 1.1, py = suelo - r * 1.6 + Math.sin(a) * d * 0.8;
    R.pset(px, py, Math.sin(t * 3 + k * 1.7) > 0.3 ? c3 : c0); }
}

// hojas que caen dentro de cl, llevadas por el viento (n hojas; k: semilla)
function d_hojas(R, t, cl, n, k = 0, viento = 1) {
  const P = d_P, cols = [P.arce1, P.arce2, P.oro1, P.arce3, P.arce0], wv = cl[2] - cl[0] + 20, hv = cl[3] - cl[1] + 10;
  R.recorte(cl);
  for (let i = 0; i < n; i++) { const vy = 6 + h(i, 1, 70 + k) * 7, vx = (3 + h(i, 2, 70 + k) * 6) * viento;
    const y = cl[1] - 5 + ((h(i, 3, 70 + k) * hv + t * vy) % hv), x = cl[0] - 10 + ((((h(i, 4, 70 + k) * wv + t * vx + Math.sin(t * 2 + i) * 3) % wv) + wv) % wv), c = cols[i % 5];
    R.pset(x, y, c); if (Math.sin(t * 5 + i) > 0) R.pset(x + 1, y, c); else R.pset(x, y + 1, c); }
  R.recorte(null);
}

// tablas de madera en perspectiva (de y0 a y1, horizonte yh): juntas que salen del punto de fuga, cortes al tresbolillo,
// tres tonos por tabla y vetas
function d_tablas(R, y0, y1, yh, ancho, [c, cS, cL, cD], k = 0) {
  for (let y = y0; y <= y1; y++) { const d = y - yh, z = 600 / d;
    let prev = null;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / d * ancho, b = Math.floor(u), seg = Math.floor(z / 6 + h(b, 0, 80 + k) * 9);
      let col = h(b, seg, 81 + k) < 0.3 ? cS : h(b, seg, 81 + k) > 0.85 ? cL : c;
      if (prev !== null && prev !== b) col = cD;
      else if (Math.abs((z / 6 + h(b, 0, 80 + k) * 9) - seg) < 0.08 * (60 / d)) col = cD;
      else if (h(Math.floor(u * 7), Math.floor(z * 1.5), 82 + k) < 0.12) col = cS;
      R.pset(x, y, col); prev = b; } }
}

// las dos ventanas del aula (marco exterior) y el hueco del cristal
const d_VENT = [[6, 48], [56, 98]];

// el aula general (ver la cabecera de america): el fondo fijo del búfer y, encima, lo que se mueve
function d_aula(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  R.copiar(d_capa(R, 'aula', () => d_aulaFijo(R)));
  // lo que se ve por las ventanas, recortado a cada cristal: el campus y sus arces, las hojas, la ardilla
  for (const [x0, x1] of d_VENT) for (const [y0, y1] of [[27, 56], [60, 91]]) {
    const cl = [x0 + 3, y0, x1 - 3, y1];
    d_cielo(R, cl, t, { y0: 27, hor: 70, ancho: 150 });
    d_campus(R, t, cl);
  }
  for (const [x0, x1] of d_VENT) d_hojas(R, t, [x0 + 3, 27, x1 - 3, 91], 7, x0, 1.2);
  // los travesaños y la persiana (por delante de lo de fuera)
  for (const [x0, x1] of d_VENT) { const xm = (x0 + x1) >> 1;
    rect(x0 + 2, 56, x1 - 2, 60, P.marco); rect(x0 + 2, 60, x1 - 2, 60, P.marcoS); rect(x0 + 2, 56, x1 - 2, 56, P.tablaL);
    rect(xm, 27, xm + 1, 91, P.marco); rect(xm + 1, 27, xm + 1, 91, P.marcoS); rect(x0 + 3, 41, x1 - 3, 41, P.marco); rect(x0 + 3, 76, x1 - 3, 76, P.marco); }
  // la persiana de la primera ventana, a medio bajar, con su cordón que se balancea
  for (let y = 27; y < 44; y += 2) { rect(9, y, 45, y, P.yesoL); rect(9, y + 1, 45, y + 1, P.yesoD); }
  rect(8, 44, 46, 45, P.hierroS); rect(8, 44, 46, 44, P.hierroL);
  { const s = Math.sin(t * 1.3) * 2.2; linea(44, 45, 44 + s, 66, P.yesoD); disco(44 + s, 67, 1.2, P.robleL); }
  // el vaho del radiador, que sube junto a la llave
  for (let k = 0; k < 6; k++) { const f = ((t * 0.5 + k / 6) % 1), y = 98 - f * 16, x = 14 + Math.sin(t * 2 + k * 1.3) * 2 + f * 3;
    if (f < 0.85) pset(x, y, d_mez(P.yeso, C.blanco, 0.7 - f * 0.5)); }
  // el reloj de pared: el segundero da la vuelta y el minutero avanza
  d_reloj(R, 258, 34, 6, t);
  // las lámparas de globo, que se mecen apenas, con su halo
  for (const [lx, fase] of [[190, 0], [252, 1.7]]) { const s = Math.sin(t * 0.9 + fase) * 0.8;
    linea(lx, 0, lx + s, 15, P.hierroD); rect(lx - 2 + s, 15, lx + 2 + s, 16, P.hierroS);
    disco(lx + s, 21, 5, P.yesoD); disco(lx + s, 20.5, 4.6, hex('#fbf6e6')); disco(lx - 1.5 + s, 19, 1.6, C.blanco); }
  // la sombra de las hojas que tiembla en los cuadros de sol del suelo, y las motas de polvo en los rayos
  for (let k = 0; k < 14; k++) { const bx = 26 + (k % 7) * 13 + Math.sin(t * 1.4 + k) * 2 + Math.floor(k / 7) * 8, by = 128 + Math.floor(k / 7) * 10 + Math.cos(t * 1.1 + k) * 1.5;
    for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const x = Math.round(bx + i + (by - 124) * 0.55), y = Math.round(by + j); if (((x + y) & 1) === 0) pset(x, y, d_mez(R.pget(x, y), K, 0.18)); } }
  for (let k = 0; k < 16; k++) { const f = (h(k, 3, 90) * 60 + t * (1.5 + h(k, 4, 90) * 2)) % 60, x = Math.round(20 + h(k, 5, 90) * 70 + f * 0.6 + Math.sin(t * 0.7 + k) * 2), y = Math.round(64 + f);
    if (Math.sin(t * 1.6 + k * 2.3) > -0.1) pset(x, y, hex('#fff6dc')); }
  return { suelo: 132, sueloPupitres: 155, pizarra: [113, 31, 235, 86], mesa: [184, 106, 240, 126], ventanas: [[6, 24, 48, 94], [56, 24, 98, 94]] };
}

// lo de fuera de las ventanas del aula (coordenadas de pantalla, recortado a cl): las colinas, el edificio de ladrillo
// del college con su cúpula blanca, el césped, dos arces que se mecen y una ardilla que corre por la rama
function d_campus(R, t, cl) {
  const P = d_P, K = C.k;
  R.recorte(cl);
  for (let x = cl[0]; x <= cl[2]; x++) { const y = Math.round(64 + Math.sin(x * 0.09) * 2 + Math.sin(x * 0.23) * 1); R.linea(x, y, x, 72, h(x, 1, 91) < 0.5 ? P.pino1 : P.arce0); R.pset(x, y, P.pino2); }
  // el edificio de ladrillo: muro, ventanas blancas, cornisa y la cúpula con su veleta
  d_rc(R, 30, 58, 112, 80, P.ladr);
  for (let y = 60; y < 80; y += 3) for (let x = 30 + ((y / 3) & 1) * 3; x < 112; x += 6) R.pset(x, y, P.ladrS);
  d_rc(R, 28, 56, 114, 57, P.tablaL); d_rc(R, 28, 58, 114, 58, P.marcoS);
  for (let x = 36; x < 110; x += 10) { d_rc(R, x, 62, x + 4, 68, P.tablaL); d_rc(R, x + 1, 63, x + 3, 67, hex('#3a4a5a')); R.pset(x + 1, 63, P.cielo2); d_rc(R, x, 72, x + 4, 78, P.tablaL); d_rc(R, x + 1, 73, x + 3, 77, hex('#3a4a5a')); }
  d_rc(R, 64, 46, 78, 55, P.tablaL); d_rc(R, 76, 46, 78, 55, P.marcoS); for (let x = 66; x < 76; x += 3) d_rc(R, x, 48, x, 53, hex('#5a6a7a'));
  R.poligono([[62, 47], [80, 47], [71, 38]], P.tablaS); R.poligono([[63, 46], [71, 39], [71, 46]], P.tablaL); R.linea(71, 38, 71, 33, K); R.linea(69, 34 + Math.round(Math.sin(t * 0.6)), 73, 34 - Math.round(Math.sin(t * 0.6)), K);
  // el césped con sus manchas de hojas caídas
  d_rc(R, cl[0], 80, cl[2], cl[3], P.hierba);
  for (let y = 80; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) { const v = h(x, y, 92); if (v < 0.18) R.pset(x, y, P.hierbaS); else if (v > 0.9) R.pset(x, y, v > 0.96 ? P.arce2 : P.oro1); }
  d_rc(R, cl[0], 80, cl[2], 80, P.hierbaL);
  // los dos arces y la ardilla que corre por la rama del de la izquierda (va, se para y vuelve)
  d_arce(R, 22, 92, t, 16, 'rojo'); d_arce(R, 88, 94, t + 1.3, 17, 'oro');
  { const f = (t % 8) / 8, u = f < 0.4 ? f / 0.4 : f < 0.55 ? 1 : f < 0.95 ? 1 - (f - 0.55) / 0.4 : 0, x = Math.round(16 + u * 20), y = Math.round(70 - u * 4), d = f < 0.55 ? 1 : -1;
    R.pset(x, y, hex('#8a5a3a')); R.pset(x + d, y, hex('#8a5a3a')); R.pset(x + 2 * d, y - 1, hex('#8a5a3a')); R.pset(x - d, y - 1, hex('#a87a54')); R.pset(x - 2 * d, y - 2, hex('#a87a54')); R.pset(x - 2 * d, y - 3, hex('#a87a54')); R.pset(x + 2 * d, y - 2, K); }
  R.recorte(null);
}

// un reloj de pared redondo (cx, cy, radio r) con el segundero que corre y la manecilla de los minutos
function d_reloj(R, cx, cy, r, t) {
  const K = C.k; R.disco(cx, cy, r + 1.5, K); R.disco(cx, cy, r + 0.8, d_P.robleS); R.disco(cx, cy, r, d_P.papel); R.disco(cx + 1, cy + 1, r * 0.6, d_P.papelS);
  R.disco(cx, cy, r * 0.85, d_P.papel);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), k % 3 ? d_P.papelS : K); }
  const am = -Math.PI / 2 + (t / 60) * Math.PI * 2 + 1.1, as = -Math.PI / 2 + t * Math.PI * 2 / 60 * 6;
  R.linea(cx, cy, cx + Math.cos(am) * (r - 2), cy + Math.sin(am) * (r - 2), K); R.linea(cx, cy, cx + Math.cos(-0.9) * (r - 3), cy + Math.sin(-0.9) * (r - 3), K);
  R.linea(cx, cy, cx + Math.cos(as) * (r - 1), cy + Math.sin(as) * (r - 1), C.rojo); R.pset(cx, cy, K);
}

// las costas de tiza o de lápiz: Sudamérica con la costa de abajo que se tuerce al este, la Antártida y la tetera
const d_SUDAM = [[0, 0], [8, -3], [16, -1], [22, 3], [29, 7], [31, 11], [27, 17], [22, 23], [17, 30], [13, 37], [9, 43], [6, 47], [10, 50], [18, 51], [26, 53], [34, 52], [40, 54]];

const d_SUDAM_O = [[0, 0], [-4, 4], [-5, 10], [-2, 18], [0, 28], [2, 38], [4, 44], [6, 47]];

const d_ANTAR = [[0, 10], [4, 4], [10, 2], [16, 0], [22, 1], [28, 0], [34, 3], [38, 8], [36, 13], [30, 16], [24, 15], [18, 17], [12, 16], [6, 15], [2, 13], [0, 10], [-3, 7], [-6, 4], [-8, 2]];

const d_TETERA = [[4, 14], [2, 10], [3, 6], [7, 3], [14, 2], [21, 3], [25, 6], [26, 10], [24, 14], [20, 16], [8, 16], [4, 14]];

// una línea quebrada (pts relativos a x, y, escala s) en color c; punteado: hueco cada n
function d_traza(R, pts, x, y, s, c, punteado = 0) {
  for (let i = 0; i + 1 < pts.length; i++) R.linea(x + pts[i][0] * s, y + pts[i][1] * s, x + pts[i + 1][0] * s, y + pts[i + 1][1] * s, c, punteado);
}

// lo fijo del aula, en su búfer: techo, pared con moteado, friso, suelo con el sol, ventanas, radiador, pizarra con sus
// dibujos de tiza, mapa enrollable, mapamundi, librería con el globo, mesa del profesor y los pupitres de la fila de en medio
function d_aulaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // el techo y la moldura
  rect(0, 0, 319, 8, P.techo); for (let x = 0; x < 320; x += 40) rect(x, 0, x, 8, P.techoS); rect(0, 8, 319, 8, P.techoS);
  rect(0, 9, 319, 10, P.yesoL); rect(0, 11, 319, 11, P.yesoD);
  // la pared de yeso con su moteado y la sombra hacia el techo
  rect(0, 12, 319, 88, P.yeso);
  for (let y = 12; y < 89; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 93); if (v < 0.1) pset(x, y, P.yesoS); else if (v > 0.95) pset(x, y, P.yesoL); else if (y < 16 && ((x + y) & 1)) pset(x, y, P.yesoS); }
  // el friso de madera machihembrada, la moldura de silla y el rodapié
  rect(0, 89, 319, 91, P.roble); rect(0, 89, 319, 89, P.robleL); rect(0, 91, 319, 91, P.robleD);
  rect(0, 92, 319, 121, P.friso);
  for (let x = 0; x < 320; x += 6) { rect(x, 92, x, 117, P.frisoS); rect(x + 1, 92, x + 1, 117, P.frisoL); for (let y = 93; y < 117; y++) if (h(x + 3, y >> 2, 94) < 0.3) pset(x + 3 + ((y >> 3) & 1), y, P.frisoS); }
  rect(0, 117, 319, 121, P.robleD); rect(0, 117, 319, 117, P.roble);
  // el suelo de tablas de roble en perspectiva y los cuadros de sol de las ventanas, con la sombra de los travesaños
  d_tablas(R, 122, 179, 70, 3.4, [hex('#a26e3c'), hex('#946232'), hex('#b07c46'), hex('#6e4624')], 1);
  // la papelera de rejilla junto a la mesa, con un papel arrugado, y unas hojas que han entrado por la ventana
  rect(243, 121, 251, 133, K); rect(244, 122, 250, 132, P.hierroS); for (let x = 245; x < 250; x += 2) rect(x, 123, x, 131, P.hierroL); disco(247, 120, 2.2, P.papel); pset(246, 119, P.papelS);
  for (const [lx, ly, c] of [[112, 140, P.arce1], [118, 146, P.oro1], [70, 128, P.arce2], [214, 160, P.arce1]]) { pset(lx, ly, c); pset(lx + 1, ly, c); pset(lx, ly + 1, d_mez(c, K, 0.3)); }
  for (const [x0, x1] of d_VENT) for (let y = 123; y < 158; y++) { const d = (y - 123) * 0.62, a = Math.round(x0 + 6 + d), b = Math.round(x1 + 2 + d), m = (a + b) >> 1;
    for (let x = a; x <= b; x++) { if (Math.abs(x - m) < 1 || Math.abs(y - 140) < 1) continue; if (((x + y) & 1) === 0 || (y > 125 && y < 155 && x > a + 1 && x < b - 1)) pset(x, y, d_mez(R.pget(x, y), hex('#ffe8b0'), 0.28)); } }
  // las ventanas: marco blanco con su sombra, el alféizar y el hueco
  for (const [x0, x1] of d_VENT) { rect(x0 - 1, 23, x1 + 1, 95, P.marcoS); rect(x0, 24, x1, 94, P.marco); rect(x0, 24, x1, 24, P.tablaL); rect(x1, 25, x1, 94, P.marcoS);
    rect(x0 + 3, 27, x1 - 3, 91, P.cielo2); rect(x0 - 3, 92, x1 + 3, 95, P.marco); rect(x0 - 3, 92, x1 + 3, 92, P.tablaL); rect(x0 - 3, 95, x1 + 3, 96, P.marcoS);
    // una maceta con un geranio en el alféizar de la segunda
    if (x0 > 50) { rect(x0 + 26, 86, x0 + 33, 91, hex('#b8643a')); rect(x0 + 26, 86, x0 + 33, 86, hex('#d8844e')); for (let k = 0; k < 7; k++) disco(x0 + 27 + h(k, 1, 95) * 6, 82 + h(k, 2, 95) * 4, 1.6, k % 3 ? P.pino2 : C.rojo); } }
  // el radiador de hierro bajo las ventanas: columnas con su luz, tubo y llave
  rect(10, 100, 94, 117, P.hierroD);
  for (let x = 11; x < 94; x += 4) { rect(x, 100, x + 2, 116, P.hierro); rect(x, 100, x, 116, P.hierroL); rect(x + 2, 100, x + 2, 116, P.hierroS); rect(x, 101, x + 2, 101, P.hierroL); rect(x, 108, x + 2, 108, P.hierroS); }
  rect(8, 113, 11, 115, P.hierroS); rect(4, 113, 8, 114, P.hierroD); rect(12, 97, 14, 100, P.hierroS); rect(10, 96, 16, 97, C.rojoS);
  // el sacapuntas de manivela en la pared, entre la ventana y la pizarra
  rect(102, 66, 107, 72, K); rect(103, 67, 106, 71, P.hierroL); rect(103, 71, 106, 71, P.hierroS); linea(107, 69, 109, 66, K); pset(109, 65, P.robleS); disco(104.5, 73.5, 1.3, P.papelS);
  // la caja del mapa enrollable encima de la pizarra, con su anilla
  rect(116, 19, 232, 25, K); rect(117, 20, 231, 24, P.robleS); rect(117, 20, 231, 20, P.robleL); for (let x = 120; x < 230; x += 9) pset(x, 22, P.robleD);
  rect(118, 25, 230, 27, P.sepia); rect(118, 27, 230, 27, P.sepiaS); linea(174, 27, 174, 29, K); R.anillo(174, 31, 1.6, K);
  // la pizarra verde: marco de roble, pizarra con su trama, borrones de tiza
  rect(110, 28, 238, 90, K); rect(111, 29, 237, 89, P.roble); rect(111, 29, 237, 29, P.robleL); rect(237, 30, 237, 89, P.robleS);
  rect(113, 31, 235, 86, P.pizarra);
  for (let y = 31; y < 87; y++) for (let x = 113; x < 236; x++) { const v = h(x, y, 96); if (v < 0.07) pset(x, y, P.pizarraS); else if (v > 0.97) pset(x, y, P.pizarraL); }
  for (const [bx, by, w] of [[120, 36, 28], [196, 70, 34], [150, 76, 22]]) for (let j = 0; j < 7; j++) for (let i = 0; i < w; i++) if (h(bx + i, by + j, 97) < 0.35 - Math.abs(j - 3) * 0.06) pset(bx + i + Math.round(j * 0.6), by + j, P.pizarraL);
  // los dibujos de tiza: la costa de Sudamérica (de trazos la parte del mapa de 1513), la flecha, la Antártida, «1513» y «?»
  d_traza(R, d_SUDAM, 128, 38, 0.82, P.tiza); d_traza(R, d_SUDAM_O, 128, 38, 0.82, P.tiza);
  d_traza(R, d_SUDAM.slice(11), 128, 38, 0.82, P.tizaS, 0); d_traza(R, d_SUDAM.slice(11), 129, 40, 0.82, P.tizaM, 3);
  linea(166, 64, 186, 64, P.tiza); linea(186, 64, 182, 61, P.tiza); linea(186, 64, 182, 67, P.tiza);
  d_traza(R, d_ANTAR, 194, 56, 0.85, P.tiza); for (let k = 0; k < 9; k++) pset(198 + h(k, 1, 98) * 26, 59 + h(k, 2, 98) * 8, P.tizaS);
  R.numero('1513', 140, 46, { rampa: [P.tizaS, P.tiza, P.tiza], tam: 8, fina: true });
  R.icono('?', 222, 38, P.tiza, P.pizarraS, 1);
  // la repisa con las tizas y el borrador de fieltro
  rect(108, 87, 240, 91, K); rect(109, 88, 239, 89, P.robleL); rect(109, 90, 239, 90, P.robleS);
  rect(124, 86, 131, 86, P.tiza); rect(136, 86, 139, 86, hex('#e8c8c8')); rect(212, 84, 225, 86, K); rect(213, 84, 224, 84, hex('#c8a46a')); rect(213, 85, 224, 86, hex('#4a4a52'));
  for (let i = 0; i < 12; i++) pset(140 + h(i, 1, 99) * 70, 88, P.tizaM);
  // el mapamundi colgado a la derecha, con sus varillas
  rect(244, 47, 316, 49, K); rect(245, 48, 315, 48, P.robleL); rect(244, 83, 316, 85, K); rect(245, 84, 315, 84, P.robleS);
  rect(246, 50, 314, 82, hex('#9ac4dc')); for (let y = 50; y < 83; y++) for (let x = 246; x < 315; x++) if (((x + y) & 3) === 0) pset(x, y, hex('#86b4d0'));
  const tierra = [hex('#e8d090'), hex('#a8c880'), hex('#e8b08a'), hex('#d8c070')];
  for (const [cx, cy, rx, ry, c] of [[262, 58, 7, 5, 0], [266, 72, 4, 7, 1], [283, 58, 6, 4, 2], [285, 70, 4, 6, 3], [302, 58, 10, 5, 1], [307, 74, 4, 3, 2], [282, 80, 14, 1.4, 0]])
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 < 1 - h(cx + i, cy + j, 100) * 0.25) pset(cx + i, cy + j, tierra[c]);
  for (let x = 246; x < 315; x += 11) for (let y = 50; y < 83; y += 2) pset(x, y, hex('#c8dcea'));
  linea(280, 47, 280, 44, K); linea(280, 44, 270, 47, K); linea(280, 44, 290, 47, K);
  // la librería baja con libros, el globo terráqueo encima
  rect(246, 94, 316, 122, K); rect(247, 95, 315, 121, P.robleS); rect(247, 95, 315, 96, P.robleL); rect(247, 108, 315, 109, P.roble);
  d_libros(R, 249, 314, 107, 10, 3); d_libros(R, 249, 314, 120, 10, 4);
  rect(294, 92, 306, 94, K); rect(299, 84, 301, 92, P.laton); R.anillo(300, 82, 9.5, P.latonS);
  disco(300, 82, 8, (x, y, d) => (h(x >> 1, y >> 1, 101) < 0.45 ? (d > 0.8 ? hex('#7a9a5a') : hex('#9ab86a')) : (d > 0.8 ? hex('#3a6a9a') : hex('#5a8ac0'))));
  disco(297, 79, 1.8, hex('#a8d0f0'));
  // la mesa del profesor: tablero, cajones con tiradores, y encima papeles, libros, la manzana y el flexo
  rect(184, 106, 240, 109, K); rect(185, 107, 239, 108, P.robleL); rect(186, 110, 238, 128, K); rect(187, 110, 237, 128, P.roble);
  for (const [a, b] of [[188, 208], [216, 236]]) { rect(a, 112, b, 118, P.robleS); rect(a + 1, 113, b - 1, 117, P.roble); rect(a + 1, 113, b - 1, 113, P.robleL); rect(((a + b) >> 1) - 2, 115, ((a + b) >> 1) + 2, 115, P.laton);
    rect(a, 120, b, 126, P.robleS); rect(a + 1, 121, b - 1, 125, P.roble); rect(a + 1, 121, b - 1, 121, P.robleL); rect(((a + b) >> 1) - 2, 123, ((a + b) >> 1) + 2, 123, P.laton); }
  for (let k = 0; k < 4; k++) { rect(188 + k, 102 - k * 1, 204 + k, 103 - k * 1, k % 2 ? P.papelS : P.papel); } rect(188, 98, 204, 98, P.sepia);
  rect(208, 100, 222, 106, K); rect(209, 101, 221, 102, hex('#2a4a7a')); rect(209, 103, 221, 105, hex('#7a2a2a')); rect(209, 101, 209, 105, P.papelS);
  disco(229, 103, 2.6, C.rojoS); disco(228.6, 102.6, 2.2, C.rojo); pset(228, 101, hex('#f88a7a')); pset(229, 100, P.tronco); pset(230, 99, P.pino2);
  linea(236, 105, 236, 92, K); linea(236, 92, 230, 88, K); poligono([[226, 89], [233, 85], [235, 89], [229, 92]], K); poligono([[227, 89], [233, 86], [234, 89], [229, 91]], P.contra);
  // los dos pupitres de la fila de en medio, a los lados, vacíos: con un libro y una cartera
  d_pupitreChico(R, 26, 140, 0); d_pupitreChico(R, 262, 140, 1);
}

// los lomos de una balda (x0..x1, base yb, alto máximo a; k: semilla): altos distintos, alguno inclinado, con luz y sombra
function d_libros(R, x0, x1, yb, a, k = 0) {
  let x = x0;
  while (x < x1) { const i = Math.floor(h(x, k, 102) * 9), w = 2 + Math.floor(h(x, k, 103) * 3), al = Math.round(a * (0.6 + h(x, k, 104) * 0.4)), [c, cS, cL] = d_LOMOS[i];
    if (h(x, k, 105) < 0.06 && x + 6 < x1) { for (let j = 0; j < al - 1; j++) R.rect(x + Math.round(j * 0.4), yb - j, x + Math.round(j * 0.4) + w, yb - j, j === al - 2 ? cL : c); x += w + 5; continue; }
    if (x + w > x1) break;
    R.rect(x, yb - al + 1, x + w - 1, yb, c); R.rect(x, yb - al + 1, x, yb, cL); R.rect(x + w - 1, yb - al + 1, x + w - 1, yb, cS);
    if (al > 6) { R.rect(x, yb - al + 3, x + w - 1, yb - al + 3, cS); R.rect(x, yb - 2, x + w - 1, yb - 2, cS); }
    x += w + (h(x, k, 106) < 0.08 ? 3 : 0);
  }
}

// un pupitre de la fila de en medio (x: borde izquierdo; y: tablero), con su asiento y el hierro; v: lo que hay encima
function d_pupitreChico(R, x, y, v) {
  const { rect, pset } = R, P = d_P, K = C.k;
  rect(x + 3, y + 3, x + 4, y + 14, P.hierroD); rect(x + 28, y + 3, x + 29, y + 14, P.hierroD); rect(x + 3, y + 13, x + 29, y + 14, P.hierroD);
  rect(x + 6, y + 4, x + 26, y + 9, K); rect(x + 7, y + 5, x + 25, y + 8, P.robleS);
  rect(x, y - 2, x + 32, y + 2, K); rect(x + 1, y - 1, x + 31, y, P.robleL); rect(x + 1, y + 1, x + 31, y + 1, P.robleS);
  if (v === 0) { rect(x + 5, y - 5, x + 17, y - 2, K); rect(x + 6, y - 4, x + 16, y - 3, hex('#3a6a3a')); rect(x + 6, y - 4, x + 16, y - 4, hex('#548a54')); }
  else { rect(x + 14, y - 7, x + 26, y - 2, K); rect(x + 15, y - 6, x + 25, y - 3, hex('#7a4a2a')); rect(x + 15, y - 6, x + 25, y - 6, hex('#9a6a3a')); pset(x + 20, y - 4, P.laton); }
  for (let i = 0; i < 4; i++) pset(x + 8 + i * 5, y + 16, d_P.robleD);
}

// los pupitres de la primera fila, por delante de los alumnos: tablero inclinado de roble con el canal del lápiz, el
// faldón y las patas de hierro; encima, la copia del mapa, el calco, un lápiz y, en uno, una manzana y un libro
function d_aulaDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  [[34, 0], [144, 1], [252, 2]].forEach(([x, k]) => {
    const w = 64;
    rect(x + 4, 158, x + 6, 179, P.hierroD); rect(x + w - 6, 158, x + w - 4, 179, P.hierroD); rect(x + 5, 158, x + 5, 179, P.hierroS);
    rect(x + 8, 158, x + w - 8, 170, K); rect(x + 9, 159, x + w - 9, 169, P.robleS); rect(x + 9, 164, x + w - 9, 164, P.robleD); rect(x + 10, 160, x + w - 10, 163, hex('#3a2a20'));
    rect(x - 1, 149, x + w + 1, 158, K); rect(x, 150, x + w, 156, P.roble); rect(x, 150, x + w, 150, P.robleL); rect(x, 157, x + w, 157, P.robleS);
    for (let j = 0; j < 6; j++) for (let i = 0; i < w; i += 1) if (h(x + i, j, 107) < 0.12) pset(x + i, 151 + j, P.robleS);
    rect(x + 2, 151, x + w - 2, 151, P.robleS); rect(x + 2, 152, x + w - 2, 152, P.robleL); disco(x + w - 6, 154, 1.6, K); pset(x + w - 6, 154, hex('#2a3a6a'));
    // la copia del mapa y el calco encima, un poco torcido
    rect(x + 8, 152, x + 30, 156, P.sepiaS); rect(x + 9, 152, x + 29, 155, P.sepia); linea(x + 11, 153, x + 18, 154, P.sepiaD); linea(x + 22, 153, x + 27, 155, P.sepiaD);
    for (let i = 0; i < 18; i++) pset(x + 18 + i, 153 + (i % 3 === 0 ? 1 : 0), d_mez(R.pget(x + 18 + i, 153), C.blanco, 0.55));
    rect(x + 18, 154, x + 35, 155, d_mez(P.roble, C.blanco, 0.5)); linea(x + 20, 154, x + 32, 155, P.hierroS);
    // el lápiz amarillo con su goma, que rueda un poco
    const lx = x + 40 + Math.round(Math.sin(t * 0.8 + k * 2) * 1.5); rect(lx, 153, lx + 9, 153, hex('#e8b830')); rect(lx, 154, lx + 9, 154, hex('#b88a18')); rect(lx + 10, 153, lx + 11, 154, hex('#e88a9a')); pset(lx - 1, 153, P.robleL); pset(lx - 2, 154, K);
    if (k === 1) { rect(x + 50, 145, x + 60, 151, K); rect(x + 51, 146, x + 59, 150, hex('#2a4a7a')); rect(x + 51, 146, x + 59, 146, hex('#4068a0')); rect(x + 51, 150, x + 59, 150, P.papel); }
    if (k === 2) { disco(x + 54, 147, 2.8, C.rojoS); disco(x + 53.6, 146.6, 2.3, C.rojo); pset(x + 53, 145, hex('#f88a7a')); pset(x + 54, 144, P.tronco); }
  });
  return { suelo: 132, sueloPupitres: 155, pizarra: [113, 31, 235, 86], mesa: [184, 106, 240, 126] };
}

// el aula desenfocada detrás del pupitre (ver la cabecera de america): lo fijo en su búfer; por la ventana, el arce que se
// mece, el cielo con nubes y hojas que caen
function d_pupitre(R, t, o) {
  const P = d_P;
  R.copiar(d_capa(R, 'pupitre', () => d_pupitreFijo(R)));
  const cl = [196, 14, 258, 70];
  d_cielo(R, cl, t, { y0: 14, hor: 70, ancho: 160, k: 3 });
  R.recorte(cl);
  for (let x = cl[0]; x <= cl[2]; x++) { const y = Math.round(58 + Math.sin(x * 0.07) * 3); R.linea(x, y, x, 70, h(x >> 2, 1, 110) < 0.5 ? P.pino1 : P.arce0); }
  R.recorte(null);
  R.recorte(cl); d_arce(R, 238, 96, t, 26, 'rojo'); R.recorte(null);
  d_hojas(R, t, cl, 9, 5, 1.4);
  // el travesaño de la ventana, por delante
  R.rect(196, 41, 258, 43, P.marco); R.rect(196, 43, 258, 43, P.marcoS); R.rect(226, 14, 228, 70, P.marco); R.rect(228, 14, 228, 70, P.marcoS);
  // motas de polvo en la luz de la ventana
  for (let k = 0; k < 10; k++) { const f = (h(k, 3, 111) * 40 + t * 2) % 40, x = Math.round(150 + h(k, 5, 111) * 90 + Math.sin(t * 0.6 + k) * 3), y = Math.round(60 + f);
    if (Math.sin(t * 1.3 + k * 2.1) > 0) R.pset(x, y, hex('#fff4d8')); }
  return d_pupitreGeo(o);
}

// dónde está cada cosa en el pupitre (y el calco según o.calco)
function d_pupitreGeo(o) {
  const u = Math.max(0, Math.min(1, o.calco ?? 0)), e = u * u * (3 - 2 * u), x0 = Math.round(226 + (78 - 226) * e);
  return { suelo: 106, mapa: [64, 114, 186, 170], calco: [x0, 118, x0 + 96, 166], costa: [106, 160], atlas: [200, 112, 304, 166] };
}

// lo fijo detrás del pupitre: la pared, la pizarra grande y borrosa, la ventana, el friso, el suelo y un pupitre vacío
function d_pupitreFijo(R) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  rect(0, 0, 319, 82, P.yeso);
  for (let y = 0; y < 83; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 112); if (v < 0.08) pset(x, y, P.yesoS); else if (v > 0.95) pset(x, y, P.yesoL); }
  // la pizarra, grande y un poco borrosa (sin filo negro), con sus borrones y la costa de tiza a lo grande
  rect(0, 6, 160, 66, P.robleS); rect(0, 6, 160, 7, P.roble); rect(0, 9, 156, 62, P.pizarra);
  for (let y = 9; y < 63; y++) for (let x = 0; x < 157; x++) { const v = h(x >> 1, y >> 1, 113); if (v < 0.1) pset(x, y, P.pizarraS); else if (v > 0.9) pset(x, y, P.pizarraL); }
  for (let j = 0; j < 12; j++) for (let i = 0; i < 60; i++) if (h(i, j, 114) < 0.4 - Math.abs(j - 6) * 0.05) pset(20 + i + j, 18 + j, P.pizarraL);
  R.recorte([0, 9, 156, 61]); d_traza(R, d_SUDAM, 96, 16, 0.8, P.tizaS); d_traza(R, d_SUDAM_O, 96, 16, 0.8, P.tizaS); d_traza(R, d_SUDAM, 97, 16, 0.8, P.tizaM);
  linea(130, 40, 146, 40, P.tizaM); linea(146, 40, 143, 38, P.tizaM); linea(146, 40, 143, 42, P.tizaM); R.recorte(null);
  R.numero('1513', 34, 30, { rampa: [P.tizaS, P.tizaM, P.tizaM], tam: 8, fina: true });
  rect(0, 62, 162, 67, P.robleS); rect(0, 62, 162, 63, P.roble); rect(30, 60, 42, 61, P.tizaM); rect(120, 59, 136, 61, hex('#7a7468'));
  // la ventana, con su marco blanco y el alféizar
  rect(192, 10, 262, 74, P.marcoS); rect(193, 11, 261, 73, P.marco); rect(196, 14, 258, 70, P.cielo2); rect(188, 72, 266, 76, P.marco); rect(188, 76, 266, 77, P.marcoS);
  // el friso y el suelo
  rect(0, 82, 319, 84, P.roble); rect(0, 82, 319, 82, P.robleL); rect(0, 85, 319, 98, P.friso);
  for (let x = 0; x < 320; x += 9) { rect(x, 85, x, 98, P.frisoS); rect(x + 1, 85, x + 1, 98, P.frisoL); }
  rect(0, 96, 319, 99, P.robleD); rect(0, 100, 319, 110, hex('#a26e3c')); for (let x = 0; x < 320; x += 14) linea(x, 100, x - 8 + (x - 160) * 0.1, 110, hex('#6e4624'));
  // un pupitre vacío al fondo, desenfocado, y la sombra de la mesa de delante
  rect(10, 86, 70, 89, P.robleS); rect(10, 86, 70, 86, P.robleL); rect(14, 90, 16, 100, P.hierroD); rect(64, 90, 66, 100, P.hierroD); rect(22, 82, 40, 86, hex('#3a5a3a'));
  rect(274, 84, 319, 88, P.robleS); rect(274, 84, 319, 84, P.robleL); rect(280, 89, 282, 100, P.hierroD);
  d_tinte(R, 0, 100, 319, 110, K, 0.2);
}

// el pupitre de cerca, por delante de quien está al otro lado: el tablero de roble con vetas en perspectiva, el canto y
// el canal del lápiz, el tintero; la copia del mapa de 1513, el atlas abierto, la regla, lápices y goma, y el calco
function d_pupitreDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k, g = d_pupitreGeo(o);
  // el tablero fijo, de la fila 101 abajo (opaco a todo lo ancho): se copia ese trozo del búfer
  { const b = d_capa(R, 'pupitreMesa', () => d_pupitreMesaFija(R)); R.buf.set(b.subarray(101 * 320), 101 * 320); }
  // la sombra de las hojas del arce que tiembla sobre la madera (por la ventana de la derecha)
  for (let k = 0; k < 18; k++) { const bx = 150 + h(k, 1, 115) * 160 + Math.sin(t * 1.3 + k) * 3, by = 106 + h(k, 2, 115) * 70 + Math.cos(t * 1.1 + k * 0.7) * 2, r = 3 + h(k, 3, 115) * 3;
    for (let j = -r; j <= r; j++) for (let i = -r * 1.6; i <= r * 1.6; i++) if ((i / 1.6) ** 2 + j * j < r * r && ((Math.round(bx + i) + Math.round(by + j)) & 1) === 0) { const x = Math.round(bx + i), y = Math.round(by + j); if (y > 103) pset(x, y, d_mez(R.pget(x, y), K, 0.14)); } }
  // el lápiz que rueda un poco sobre el tablero (va y vuelve)
  { const r = Math.sin(t * 0.9) * 4, x = Math.round(196 + r), y = 172, fase = Math.floor((t * 0.9 * 4) % 3);
    rect(x, y, x + 34, y + 3, K); rect(x + 1, y + 1, x + 31, y + 2, hex('#e8b830')); rect(x + 1, y + 1 + (fase === 1 ? 1 : 0), x + 31, y + 1 + (fase === 1 ? 1 : 0), hex('#f4d060'));
    rect(x + 28, y + 1, x + 30, y + 2, P.laton); rect(x + 31, y + 1, x + 33, y + 2, hex('#e88a9a')); linea(x - 4, y + 2, x, y + 1, hex('#e8c89a')); pset(x - 4, y + 2, K); }
  // el calco: papel translúcido que se desliza con el dibujo a lápiz; aclara lo de debajo y deja ver la costa
  { const [x0, y0, x1, y1] = g.calco, ond = (x) => Math.round(Math.sin(t * 2 + x * 0.2) * (o.calco >= 1 ? 0 : 0.6));
    for (let y = y0; y <= y1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (y === y0 && ond(x) > 0) continue; pset(x, y, d_mez(R.pget(x, y), hex('#f4f6f8'), 0.52)); }
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { pset(x, y0 + ond(x), hex('#ffffff')); pset(x, y1 + 1, d_mez(R.pget(x, y1 + 1), K, 0.3)); }
    linea(x1, y0, x1, y1, hex('#d8dce4')); linea(x1 + 1, y0 + 1, x1 + 1, y1 + 1, d_mez(P.roble, K, 0.4)); linea(x0, y0, x0, y1, hex('#ffffff'));
    const gris = hex('#4a4e5c'), dib = o.dibujo ?? 'costa';
    R.recorte([x0 + 1, y0 + 1, x1 - 1, y1 - 1]);
    if (dib === 'tetera') { const tx = x0 + 18, ty = y0 + 16; d_traza(R, d_TETERA, tx, ty, 1.7, gris); linea(tx + 7, ty + 6, tx - 6, ty - 2, gris); linea(tx - 6, ty - 2, tx - 9, ty - 4, gris); linea(tx + 4, ty + 22, tx - 3, ty + 12, gris);
      R.anillo(tx + 46, ty + 14, 6, gris); linea(tx + 18, ty + 4, tx + 30, ty + 4, gris); disco(tx + 24, ty + 1, 2, gris); disco(tx + 24, ty + 1, 1, hex('#e8ecf0')); }
    else if (dib === 'antartida') { d_traza(R, d_ANTAR, x0 + 22, y0 + 14, 1.7, gris); for (let k = 0; k < 7; k++) linea(x0 + 30 + k * 7, y0 + 24, x0 + 26 + k * 7, y0 + 32, gris, 2); }
    else { const cx = x0 + 28, cy = y0 + 42; d_traza(R, d_COSTA, cx, cy, 1, gris); d_traza(R, d_COSTA, cx, cy + 1, 1, hex('#7a7e8a'), 3); }
    R.recorte(null);
    // los trozos de cinta adhesiva cuando se posa
    if ((o.calco ?? 0) >= 1) for (const [cx, cy] of [[x0 + 2, y0 + 1], [x1 - 6, y0 + 1]]) { rect(cx, cy - 1, cx + 5, cy + 2, hex('#e8e0b8')); rect(cx, cy - 1, cx + 5, cy - 1, hex('#f6f0d0')); }
  }
  return g;
}

// la costa de abajo del mapa de 1513, la que se tuerce de golpe al este (relativa a su comienzo)
const d_COSTA = [[0, -24], [-2, -16], [-1, -8], [2, -3], [6, 0], [14, 2], [22, 1], [30, 3], [40, 2], [50, 4], [58, 3], [64, 5]];

// lo fijo del tablero del pupitre (en su búfer; solo cuentan las filas 101–179): madera, canto, canal del lápiz,
// tintero, la copia del mapa de 1513, el atlas abierto, la regla, la goma y las virutas
function d_pupitreMesaFija(R) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // el canto de atrás del tablero y el tablero con vetas largas que se abren hacia delante
  rect(0, 101, 319, 104, K); rect(0, 102, 319, 103, P.robleD);
  rect(0, 104, 319, 179, P.roble);
  for (let y = 104; y < 180; y++) { const d = (y - 96); for (let x = 0; x < 320; x++) { const u = (x - 160) / d * 30, v = h(Math.floor(u / 3), 0, 116);
    const veta = Math.sin(u * 0.9 + Math.sin(y * 0.15 + v * 6) * 1.5); if (veta > 0.93) pset(x, y, P.robleS); else if (veta < -0.97) pset(x, y, P.robleL); else if (h(x, y, 117) < 0.03) pset(x, y, P.robleS); } }
  rect(0, 104, 319, 104, P.robleL);
  // el canal del lápiz y el agujero del tintero con su aro de latón
  rect(24, 107, 150, 109, P.robleD); rect(24, 107, 150, 107, P.robleS); rect(40, 107, 70, 108, hex('#4a6a9a')); rect(70, 107, 73, 108, P.laton); rect(36, 108, 40, 108, hex('#e8c89a'));
  disco(292, 110, 6, K); disco(292, 110, 5, P.latonS); disco(292, 110, 4, P.laton); disco(292, 110, 3, K); pset(290, 108, P.latonL); pset(291, 108, P.latonL);
  // la regla de madera, en diagonal a la izquierda, con sus marcas
  poligono([[10, 168], [58, 116], [65, 121], [17, 173]], K); poligono([[11, 167], [58, 117], [63, 121], [17, 171]], hex('#e0c080'));
  for (let k = 0; k < 24; k++) { const x = 13 + k * 2, y = 165 - k * 2.12; linea(x, y, x + (k % 5 ? 1 : 3), y + (k % 5 ? 1 : 3), P.sepiaD); }
  linea(11, 168, 58, 117, hex('#f0d8a0'));
  // la goma rosa y las virutas de lápiz
  rect(44, 156, 54, 161, K); rect(45, 157, 53, 160, hex('#e88a9a')); rect(45, 157, 53, 157, hex('#f4b0b8')); rect(45, 160, 53, 160, hex('#c86a7a'));
  for (let k = 0; k < 9; k++) { const x = 36 + h(k, 1, 118) * 14, y = 128 + h(k, 2, 118) * 8; pset(x, y, hex('#e8c89a')); pset(x + 1, y, k % 2 ? hex('#e8b830') : hex('#c8a07a')); }
  // la copia del mapa de 1513: papel sepia con su sombra y el dibujo
  rect(66, 116, 188, 172, d_mez(P.roble, K, 0.45)); rect(64, 114, 186, 170, P.sepiaS); rect(65, 115, 185, 169, P.sepia);
  d_mapa1513(R, 65, 115, 185, 169);
  // el atlas moderno abierto: dos páginas con el lomo en sombra; Sudamérica a la izquierda, la Antártida a la derecha
  rect(200, 112, 304, 166, K); rect(201, 113, 251, 165, P.papel); rect(253, 113, 303, 165, P.papel); rect(251, 113, 253, 165, P.papelS);
  rect(203, 164, 302, 168, K); rect(202, 165, 303, 166, hex('#2a4a7a'));
  for (const [a, b] of [[204, 248], [256, 300]]) { rect(a, 117, b, 160, hex('#7ab0d8')); for (let y = 117; y < 161; y++) for (let x = a; x <= b; x++) if (((x + y) & 3) === 0) pset(x, y, hex('#6aa0cc')); }
  poligono([[216, 119], [222, 117], [228, 119], [233, 123], [240, 127], [243, 131], [240, 137], [235, 141], [232, 147], [228, 151], [225, 156], [222, 160], [220, 158], [221, 152], [220, 145], [218, 138], [214, 132], [211, 126], [212, 121]], hex('#8ab86a'));
  for (let k = 0; k < 30; k++) { const x = 214 + h(k, 1, 119) * 22, y = 122 + h(k, 2, 119) * 30; if (R.pget(x, y) === hex('#8ab86a')) pset(x, y, k % 3 ? hex('#6a9a4a') : hex('#c8b070')); }
  disco(278, 140, 15, hex('#f0f4f8')); for (let k = 0; k < 6; k++) disco(266 + h(k, 1, 120) * 24, 128 + h(k, 2, 120) * 24, 4, hex('#f0f4f8'));
  poligono([[262, 128], [256, 122], [258, 120]], hex('#f0f4f8'));
  for (let y = 126; y < 156; y++) for (let x = 262; x < 296; x++) if (R.pget(x, y) === hex('#f0f4f8') && h(x, y, 121) < 0.15) pset(x, y, hex('#c8d8e8'));
  R.anillo(278, 140, 20, hex('#a8c8e0'), 2); linea(278, 117, 278, 160, hex('#a8c8e0'), 2); linea(256, 140, 300, 140, hex('#a8c8e0'), 2);
  rect(200, 112, 304, 112, K); rect(201, 113, 251, 113, P.papelS);
}

// el mapa de 1513 en pequeño (x0, y0)–(x1, y1), a tinta sobre pergamino: los rumbos que salen de las rosas, la costa de
// África a la derecha, la de Sudamérica a la izquierda con la de abajo que se tuerce al este, islas, barquitos y notas
// de garabatos (sin letras)
function d_mapa1513(R, x0, y0, x1, y1) {
  const { pset, linea, disco } = R, P = d_P, tinta = P.sepiaD;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = h(x >> 1, y >> 1, 122); if (v < 0.12) pset(x, y, P.sepiaS); else if (v > 0.94) pset(x, y, hex('#e8d4a4')); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (x - x0 < 2 || x1 - x < 2 || y - y0 < 2 || y1 - y < 2) pset(x, y, P.sepiaS);
  R.recorte([x0 + 1, y0 + 1, x1 - 1, y1 - 1]);
  for (const [rx, ry] of [[x0 + 70, y0 + 22], [x0 + 52, y0 + 40]]) { for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; linea(rx, ry, rx + Math.cos(a) * 90, ry + Math.sin(a) * 90, k % 4 ? hex('#c0a070') : hex('#b04a3a'), 2); }
    disco(rx, ry, 3, P.sepiaS); disco(rx, ry, 2, hex('#b04a3a')); pset(rx, ry, P.papel); }
  // África: la costa de la derecha, con su relleno de pergamino oscuro
  for (let y = y0; y <= y1; y++) { const xc = Math.round(x1 - 16 + Math.sin((y - y0) * 0.12) * 6 - Math.max(0, 22 - (y - y0)) * 0.3);
    for (let x = xc; x <= x1; x++) pset(x, y, x === xc ? tinta : h(x, y, 123) < 0.2 ? P.sepiaS : hex('#ccb27a')); }
  // Sudamérica a la izquierda y la costa de abajo que se tuerce
  for (let y = y0; y <= y0 + 42; y++) { const xc = Math.round(x0 + 30 + Math.sin((y - y0) * 0.16) * 5 - (y - y0) * 0.15);
    for (let x = x0; x <= xc; x++) pset(x, y, x === xc ? tinta : h(x, y, 124) < 0.2 ? P.sepiaS : hex('#ccb27a')); }
  d_traza(R, d_COSTA, x0 + 23, y0 + 45, 1, tinta);
  for (let x = x0; x < x0 + 88; x++) { const yy = Math.round(y0 + 46 + (x - x0 - 23) * 0.05 + 2); for (let y = yy; y <= y1; y++) if (x >= x0 + 23 || y > y0 + 46) pset(x, y, h(x, y, 125) < 0.2 ? P.sepiaS : hex('#ccb27a')); }
  d_traza(R, d_COSTA, x0 + 23, y0 + 45, 1, tinta);
  // islas, barquitos, un loro rojo y notas de garabatos
  for (const [ix, iy] of [[x0 + 44, y0 + 10], [x0 + 48, y0 + 14], [x0 + 86, y0 + 34], [x0 + 40, y0 + 30]]) { disco(ix, iy, 1.6, hex('#b04a3a')); pset(ix, iy, tinta); }
  for (const [bx, by] of [[x0 + 60, y0 + 34], [x0 + 92, y0 + 14]]) { linea(bx - 3, by, bx + 3, by, tinta); pset(bx - 2, by + 1, tinta); pset(bx + 2, by + 1, tinta); linea(bx, by - 1, bx, by - 5, tinta); pset(bx + 1, by - 4, P.papel); pset(bx + 1, by - 3, P.papel); }
  pset(x0 + 12, y0 + 18, hex('#c83a2a')); pset(x0 + 13, y0 + 17, hex('#c83a2a')); pset(x0 + 13, y0 + 19, hex('#3a8a3a'));
  for (const [nx, ny, w] of [[x0 + 6, y0 + 28, 14], [x0 + 74, y0 + 46, 20], [x0 + 70, y0 + 50, 14]]) for (let i = 0; i < w; i++) pset(nx + i, ny + (i % 3 === 1 ? -1 : 0), tinta);
  R.recorte(null);
}

// el despacho de la base (ver la cabecera de america): lo fijo en su búfer; encima, la pista por el ventanal, el
// fluorescente, el ventilador, el reloj y la fuente de agua
function d_base(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  R.copiar(d_capa(R, 'base', () => d_baseFijo(R)));
  // la pista por el ventanal: cielo, árboles, hangares, la torre, la manga de viento, los aviones y los mecánicos
  const cl = [153, 33, 265, 93];
  d_cielo(R, cl, t, { y0: 33, hor: 64, ancho: 200, k: 7 });
  R.recorte(cl);
  for (let x = cl[0]; x <= cl[2]; x++) { const y = Math.round(58 + Math.sin(x * 0.3) * 1.5 + h(x >> 1, 0, 130) * 2); R.linea(x, y, x, 64, [P.arce1, P.oro1, P.pino1, P.arce2][Math.floor(h(x >> 2, 1, 130) * 4)]); R.pset(x, y, P.arce3); }
  d_rc(R, cl[0], 64, cl[2], 93, P.hierba); for (let y = 64; y < 94; y++) for (let x = cl[0]; x <= cl[2]; x++) if (h(x, y, 131) < 0.15) pset(x, y, P.hierbaS);
  // los hangares de arco con sus portones y la torre de control con la baliza que gira
  for (const [hx, w] of [[160, 34], [198, 26]]) { for (let i = 0; i <= w; i++) { const yy = Math.round(66 - Math.sqrt(Math.max(0, 1 - ((i - w / 2) / (w / 2)) ** 2)) * 12); R.linea(hx + i, yy, hx + i, 66, i < w / 2 ? P.plataS : P.plata); R.pset(hx + i, yy, P.plataL); }
    for (let i = 3; i < w - 2; i += 3) R.linea(hx + i, 60, hx + i, 66, P.aceroS); d_rc(R, hx + w / 2 - 5, 58, hx + w / 2 + 5, 66, P.aceroD); }
  d_rc(R, 244, 44, 249, 66, P.tabla); d_rc(R, 248, 44, 249, 66, P.tablaS); d_rc(R, 241, 38, 252, 44, K); d_rc(R, 242, 39, 251, 42, hex('#5a8ab0')); d_rc(R, 240, 36, 253, 37, P.aceroS);
  { const b = Math.sin(t * 4) > 0; pset(246, 35, b ? C.rojo : C.rojoS); pset(247, 35, b ? C.rojoS : C.rojo); if (b) { pset(245, 34, hex('#ff9a8a')); pset(248, 34, hex('#ff9a8a')); } }
  // la pista con sus marcas y la calle de rodaje
  d_rc(R, cl[0], 70, cl[2], 79, P.pista); d_rc(R, cl[0], 70, cl[2], 70, P.pistaL); for (let x = cl[0]; x <= cl[2]; x++) if (h(x, 74, 132) < 0.2) pset(x, 72 + Math.floor(h(x, 1, 132) * 6), P.pistaS);
  for (let x = cl[0] + 2; x <= cl[2]; x += 10) R.linea(x, 75, x + 5, 75, P.tablaL);
  // la manga de viento, que se hincha y aletea
  linea(234, 66, 234, 54, P.aceroD); { const a = Math.sin(t * 2.3) * 1.2; for (let i = 0; i < 9; i++) pset(235 + i, 55 + Math.round(i * 0.15 + Math.sin(t * 6 + i) * 0.5 * (i / 9) + a * i / 9), i % 4 < 2 ? hex('#e8702a') : P.tablaL); pset(235, 56, hex('#e8702a')); }
  // un avión aparcado y otro que rueda despacio por la pista; el camión cisterna y un mecánico
  d_avion(R, 214, 69, 1, P.plata);
  { const x = 120 + ((t * 7) % 190); d_avion(R, x, 78, 1, hex('#d8dce4')); }
  { const x = 190, y = 68; d_rc(R, x, y - 4, x + 9, y - 1, hex('#c8a040')); d_rc(R, x + 10, y - 5, x + 13, y - 1, hex('#3a4a5a')); pset(x + 2, y, K); pset(x + 11, y, K); }
  { const mx = 205 + Math.round(Math.sin(t * 0.8) * 4); d_rc(R, mx, 62, mx + 1, 66, hex('#3a4a62')); pset(mx, 61, hex('#e8b890')); pset(mx + (Math.sin(t * 5) > 0 ? 2 : -1), 63, hex('#e8b890')); }
  // el que despega cada 9 s y sube por el cielo
  { const f = (t % 9) / 9; if (f < 0.6) { const u = f / 0.6, x = 150 + u * 140, y = 77 - Math.max(0, u - 0.25) * 70; d_avion(R, x, y, 1, P.plataL, Math.max(0, u - 0.25) * 0.5); } }
  R.recorte(null);
  // los parteluces del ventanal y la persiana recogida, por delante
  for (const x of [189, 229]) { rect(x, 33, x + 2, 93, P.aceroL); rect(x + 2, 33, x + 2, 93, P.aceroS); }
  // el fluorescente del techo, que parpadea de vez en cuando
  { const apaga = (t % 7.3) > 6.9 && Math.sin(t * 60) > 0; rect(188, 3, 244, 6, apaga ? P.aceroL : C.blanco); rect(188, 6, 244, 6, apaga ? P.aceroS : hex('#e8f0f0'));
    if (!apaga) for (let y = 10; y < 22; y++) for (let x = 188 - (y - 10); x <= 244 + (y - 10); x++) if (((x + y) & 1) === 0 && (x + y) % 4 === 0) pset(x, y, d_mez(R.pget(x, y), C.blanco, 0.18)); }
  // el ventilador de encima de los archivadores, que oscila
  { const cx = 20, cy = 58, ang = Math.sin(t * 0.6) * 0.8, rr = 8 * Math.cos(ang) + 1, giro = t * 25;
    rect(16, 68, 24, 70, P.aceroD); rect(19, 63, 21, 68, P.aceroS);
    for (let k = 0; k < 3; k++) { const a = giro + k * 2.094; for (let r = 1; r < 7; r++) pset(cx + Math.cos(a) * r * rr / 8, cy + Math.sin(a) * r, P.aceroL); }
    R.anillo(cx, cy, 7.5, P.aceroD); disco(cx, cy, 1.4, P.aceroS); for (let r = -7; r <= 7; r += 3) linea(cx + r * rr / 8, cy - 7, cx + r * rr / 8, cy + 7, d_mez(P.aceroD, P.bloque, 0.5)); }
  d_reloj(R, 132, 62, 5, t);
  // las burbujas que suben en la garrafa de la fuente
  for (let k = 0; k < 4; k++) { const f = (t * 0.7 + k / 4) % 1; pset(298 + Math.round(Math.sin(t * 3 + k) * 2), Math.round(104 - f * 10), hex('#e8f4ff')); }
  return { suelo: 147, sueloLibre: 168, maquina: [111, 128], ventana: [150, 24, 268, 96], mapaPolar: [40, 22, 110, 80] };
}

// un avión de reconocimiento a reacción visto de lado, plateado y sin insignias (x, y: centro del fuselaje; dir: hacia
// dónde mira; sube: inclinación al despegar); respeta R.recorte
function d_avion(R, x, y, dir, c, sube = 0) {
  const P = d_P, K = C.k, p = (i, j) => [x + i * dir, y + j - i * sube];
  R.poligono([p(-13, -1), p(10, -1), p(14, 0), p(10, 1), p(-13, 1)].map(([a, b]) => [a, b]), c);
  R.linea(...p(-12, -1), ...p(10, -1), P.plataL); R.linea(...p(-12, 1), ...p(10, 1), P.plataS);
  R.poligono([p(-13, -1), p(-10, -1), p(-12, -6), p(-14, -6)], c); R.linea(...p(-14, -6), ...p(-11, -1), P.plataS);
  R.poligono([p(-3, 0), p(3, 0), p(-4, 2), p(-8, 2)], P.plataS); R.pset(...p(-5, 3), P.aceroD); R.pset(...p(-1, 3), P.aceroD);
  R.pset(...p(9, -1), hex('#3a5a7a')); R.pset(...p(10, -1), hex('#3a5a7a'));
}

// lo fijo del despacho: techo de placas, pared de bloques, zócalo verde, linóleo, mapa polar, foto, archivadores,
// ventanal (marco y persiana), tablón, fuente de agua y el sillón
function d_baseFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // el techo de placas perforadas
  rect(0, 0, 319, 9, P.techo); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 9, P.techoS); for (let y = 1; y < 9; y += 3) for (let x = (y & 1) * 2; x < 320; x += 4) pset(x, y, P.techoS);
  rect(0, 9, 319, 10, P.aceroS);
  // la pared de bloques pintados (arriba claro, abajo verde) con sus juntas y la luz
  rect(0, 11, 319, 100, P.bloque);
  for (let y = 11; y < 101; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 11) / 8), xb = (x + (f & 1) * 10) % 20;
    if ((y - 11) % 8 === 7 || xb === 0) pset(x, y, P.bloqueD); else if ((y - 11) % 8 === 0 || xb === 1) pset(x, y, P.bloqueL); else if (h(x, y, 133) < 0.06) pset(x, y, P.bloqueS); }
  rect(0, 101, 319, 122, P.verdeB);
  for (let y = 101; y < 123; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 101) / 8), xb = (x + (f & 1) * 10) % 20;
    if ((y - 101) % 8 === 7 || xb === 0) pset(x, y, P.verdeBS); else if ((y - 101) % 8 === 0) pset(x, y, P.verdeBL); }
  rect(0, 100, 319, 100, P.verdeBS); rect(0, 120, 319, 124, hex('#3a3a36')); rect(0, 120, 319, 120, hex('#5a5a52'));
  // el linóleo en damero en perspectiva, con su brillo y el reflejo del ventanal
  for (let y = 125; y < 180; y++) { const d = y - 90, z = Math.floor(900 / d / 4);
    for (let x = 0; x < 320; x++) { const u = Math.floor((x - 160) / d * 3.2), c = ((u + z) & 1) ? P.lino : P.linoL;
      pset(x, y, h(x, y, 134) < 0.05 ? P.linoS : c); } }
  for (let y = 126; y < 172; y++) { const d = (y - 126) * 0.35, a = Math.round(152 + d), b = Math.round(266 + d); for (let x = a; x <= b; x++) if (((x + y) & 1) === 0 && Math.abs(x - 190 - d) > 1 && Math.abs(x - 230 - d) > 1) pset(x, y, d_mez(R.pget(x, y), C.blanco, 0.22 - (y - 126) * 0.004)); }
  // el mapa polar enmarcado: el océano, la Antártida blanca con sus plataformas, meridianos y paralelos, chinchetas
  rect(38, 20, 112, 82, K); rect(39, 21, 111, 81, P.robleS); rect(39, 21, 111, 21, P.robleL); rect(42, 24, 108, 78, P.papel);
  disco(75, 51, 25, hex('#6a9ac4')); for (let y = 26; y < 77; y++) for (let x = 50; x < 101; x++) if (((x + y) & 3) === 0 && R.pget(x, y) === hex('#6a9ac4')) pset(x, y, hex('#5a8ab8'));
  poligono([[64, 42], [72, 37], [82, 38], [89, 44], [90, 52], [86, 60], [78, 64], [69, 62], [62, 56], [60, 49], [54, 44], [50, 41], [56, 42]], hex('#f2f6fa'));
  poligono([[62, 56], [69, 62], [64, 63], [59, 58]], hex('#cfe0ee')); poligono([[82, 38], [86, 36], [89, 44]], hex('#cfe0ee'));
  for (let k = 0; k < 40; k++) { const x = 60 + h(k, 1, 135) * 30, y = 40 + h(k, 2, 135) * 22; if (R.pget(x, y) === hex('#f2f6fa')) pset(x, y, hex('#c8d8e8')); }
  for (const r of [10, 18, 24]) R.anillo(75, 51, r, hex('#3a5a7a'), 2);
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; linea(75, 51, 75 + Math.cos(a) * 25, 51 + Math.sin(a) * 25, hex('#3a5a7a'), 3); }
  for (const [px, py] of [[66, 58], [84, 44], [72, 40]]) { pset(px, py, C.rojo); pset(px, py - 1, C.rojoS); }
  rect(44, 74, 60, 76, P.papelS); rect(90, 74, 106, 76, P.papelS);
  // la foto enmarcada de un avión y el reloj
  rect(118, 28, 146, 46, K); rect(119, 29, 145, 45, P.aceroS); rect(121, 31, 143, 43, hex('#a8c0d4')); rect(121, 40, 143, 43, hex('#8a9a7a'));
  d_avion(R, 132, 37, 1, P.plataS);
  // los archivadores de cuatro cajones, con tiradores y tarjeteros, y carpetas encima
  for (const x0 of [4, 21]) { rect(x0, 70, x0 + 16, 124, K); rect(x0 + 1, 71, x0 + 15, 123, P.acero); rect(x0 + 1, 71, x0 + 1, 123, P.aceroL);
    for (let k = 0; k < 4; k++) { const y = 72 + k * 13; rect(x0 + 2, y, x0 + 14, y + 11, P.aceroS); rect(x0 + 3, y + 1, x0 + 13, y + 10, P.acero); rect(x0 + 3, y + 1, x0 + 13, y + 1, P.aceroL);
      rect(x0 + 6, y + 3, x0 + 10, y + 4, P.papel); rect(x0 + 6, y + 6, x0 + 10, y + 6, P.aceroD); rect(x0 + 6, y + 7, x0 + 10, y + 7, P.aceroL); } }
  rect(23, 66, 36, 69, hex('#c8a060')); rect(24, 64, 35, 65, hex('#d8b878')); rect(23, 66, 36, 66, hex('#e8c890'));
  // el ventanal: marco de aluminio, la persiana recogida arriba con su cordón y el alféizar
  rect(149, 23, 269, 97, P.aceroS); rect(150, 24, 268, 96, P.aceroL); rect(153, 33, 265, 93, P.cielo2);
  for (let y = 25; y < 33; y += 2) { rect(152, y, 266, y, P.tablaL); rect(152, y + 1, 266, y + 1, P.tablaS); }
  linea(262, 33, 262, 60, P.tablaS); disco(262, 61, 1.2, P.tablaS);
  rect(146, 96, 272, 100, P.acero); rect(146, 96, 272, 96, P.aceroL); rect(146, 100, 272, 101, P.aceroD);
  // el tablón de corcho con papeles clavados (rayas, sin letras), por debajo de la esquina de Atom
  rect(274, 52, 316, 90, K); rect(275, 53, 315, 89, P.robleS); rect(277, 55, 313, 87, hex('#c89a62'));
  for (let y = 55; y < 88; y++) for (let x = 277; x < 314; x++) if (h(x, y, 136) < 0.18) pset(x, y, hex('#a87a46'));
  for (const [px, py, w, hh] of [[280, 58, 12, 15], [296, 57, 14, 11], [284, 75, 10, 10], [299, 71, 12, 14]]) { rect(px + 1, py + 1, px + w + 1, py + hh + 1, hex('#8a6a3a')); rect(px, py, px + w, py + hh, P.papel);
    for (let j = py + 3; j < py + hh - 1; j += 2) rect(px + 2, j, px + w - 2 - ((j * 3) % 4), j, P.aceroS); pset(px + (w >> 1), py + 1, C.rojo); }
  // la fuente de agua: la garrafa azul, el cuerpo blanco con el grifo
  rect(288, 104, 310, 124, K); rect(289, 105, 309, 123, P.tabla); rect(289, 105, 291, 123, P.tablaL); rect(306, 105, 309, 123, P.tablaS); rect(296, 110, 301, 112, P.aceroD); pset(300, 113, C.azul ?? hex('#4a78d0'));
  disco(299, 98, 7, hex('#7ab8e0')); disco(299, 98, 6, hex('#9ad0f0')); rect(296, 103, 302, 105, hex('#7ab8e0')); pset(296, 94, C.blanco); pset(297, 93, C.blanco);
  // la papelera metálica con papeles arrugados, una bola de papel en el suelo y las rozaduras del linóleo
  rect(222, 134, 232, 150, K); rect(223, 135, 231, 149, P.aceroS); rect(223, 135, 224, 149, P.aceroL); disco(226, 133, 2.4, P.papel); disco(229, 132, 1.8, P.papelS); disco(244, 158, 2, P.papel); pset(243, 157, P.papelS);
  for (let k = 0; k < 12; k++) { const x = 20 + h(k, 1, 137) * 280, y = 132 + h(k, 2, 137) * 44; linea(x, y, x + 3 + h(k, 3, 137) * 5, y + (k & 1), P.linoS); }
  // el sillón de oficina detrás de la mesa (el respaldo de escay verde)
  rect(166, 110, 188, 140, K); rect(167, 111, 187, 139, hex('#3a5a4a')); rect(167, 111, 187, 112, hex('#5a7a6a')); for (const x of [172, 177, 182]) pset(x, 120, hex('#26402e'));
}

// la mesa metálica del despacho, por delante del oficial: tablero con su canto, faldón y cajonera; la máquina de
// escribir con la hoja (o.hoja: cuánto lleva escrito) y el carro que avanza, el teléfono, la bandeja, la taza que humea
// y el flexo
function d_baseDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k, hoja = Math.max(0, Math.min(1, o.hoja ?? 0.3));
  rect(82, 140, 210, 145, K); rect(83, 141, 209, 142, P.aceroL); rect(83, 143, 209, 144, P.acero);
  rect(86, 145, 206, 179, K); rect(87, 145, 205, 179, P.aceroS); rect(87, 145, 205, 146, P.aceroD);
  for (let k = 0; k < 3; k++) { const y = 148 + k * 10; rect(160, y, 204, y + 8, P.acero); rect(160, y, 204, y, P.aceroL); rect(178, y + 4, 186, y + 5, P.aceroD); rect(178, y + 4, 186, y + 4, P.aceroL); }
  rect(90, 150, 156, 176, P.acero); rect(90, 150, 156, 150, P.aceroL); for (let x = 94; x < 154; x += 6) rect(x, 152, x, 174, P.aceroS);
  // la máquina de escribir: cuerpo, teclas, rodillo y la hoja que asoma (las líneas aparecen con o.hoja)
  const carro = Math.round(-hoja * 8 + (o.hoja != null && hoja < 1 ? (Math.floor(t * 8) % 3) * 0.3 : 0));
  rect(96, 128, 128, 140, K); rect(97, 129, 127, 139, hex('#3a3e46')); rect(97, 129, 127, 129, hex('#5a606a'));
  for (let j = 0; j < 3; j++) for (let i = 0; i < 8; i++) { const kx = 99 + i * 3 + j, ky = 133 + j * 2; pset(kx, ky, (o.hoja != null && hoja < 1 && (i * 3 + j + Math.floor(t * 10)) % 11 === 0) ? P.aceroS : P.papel); }
  rect(92 + carro, 124, 132 + carro, 128, K); rect(93 + carro, 125, 131 + carro, 127, hex('#2a2a30')); rect(90 + carro, 125, 92 + carro, 127, P.aceroL); rect(132 + carro, 125, 134 + carro, 126, P.aceroL);
  rect(100 + carro, 108, 122 + carro, 125, K); rect(101 + carro, 109, 121 + carro, 125, C.blanco);
  const nl = Math.floor(hoja * 7); for (let j = 0; j < nl; j++) { const y = 123 - nl * 2 + j * 2 + 2; rect(103 + carro, y, 103 + carro + 14 - ((j * 5) % 6), y, hex('#5a5e6a')); }
  // el teléfono negro de disco, la bandeja con papeles y la taza que humea
  rect(186, 134, 202, 140, K); rect(187, 135, 201, 139, hex('#26262c')); disco(194, 137, 2.4, hex('#5a5a62')); rect(185, 131, 203, 134, K); rect(186, 132, 202, 133, hex('#3a3a42'));
  rect(146, 136, 164, 140, P.aceroD); rect(147, 134, 163, 138, P.papel); rect(147, 134, 163, 134, P.papelS);
  rect(170, 132, 176, 140, K); rect(171, 133, 175, 139, P.tablaL); rect(171, 133, 175, 133, hex('#6a4a2a')); rect(177, 134, 178, 137, K);
  for (let k = 0; k < 5; k++) { const f = (t * 0.6 + k / 5) % 1; pset(173 + Math.round(Math.sin(t * 2.5 + k * 1.5) * 1.5 + f), Math.round(131 - f * 12), d_mez(P.bloque, C.blanco, 0.75 - f * 0.6)); }
  // el flexo de brazo articulado con su luz
  rect(198, 138, 206, 140, K); linea(203, 138, 207, 124, P.aceroD); linea(207, 124, 199, 116, P.aceroD); poligono([[194, 116], [202, 112], [204, 117], [197, 121]], K); poligono([[195, 116], [202, 113], [203, 117], [197, 120]], hex('#3a5a4a'));
  return { suelo: 147, sueloLibre: 168, maquina: [111, 128], ventana: [150, 24, 268, 96], mapaPolar: [40, 22, 110, 80] };
}

// el porche y el jardín (ver la cabecera de america): el cielo y lo que se mueve se pintan cada vez; la casa, el jardín
// y las colinas salen de un búfer con el cielo vacío (se pega por encima del cielo)
function d_buzon(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  d_cielo(R, [0, 0, 319, 92], t, { y0: 0, hor: 80, ancho: 420, k: 11 });
  { const b = d_capa(R, 'buzon', () => d_buzonFijo(R)), B = R.buf;
    for (let i = 0; i < 100 * 320; i++) if (b[i]) B[i] = b[i];
    B.set(b.subarray(100 * 320), 100 * 320); }
  // el humo de una chimenea lejana, entre las colinas
  for (let k = 0; k < 8; k++) { const f = (t * 0.25 + k / 8) % 1, x = Math.round(100 + f * 14 + Math.sin(t + k) * 1.5), y = Math.round(70 - f * 22); disco(x, y, 1 + f * 2, d_mez(P.nubeM, P.cielo2, f)); }
  // el gran arce del jardín, que se mece, y las hojas que caen de él
  d_arce(R, 176, 122, t, 21, 'rojo');
  d_hojas(R, t, [130, 60, 319, 170], 22, 9, 1.6);
  // la ardilla que corre por el muro de piedra (va, se sienta, vuelve)
  { const f = (t % 10) / 10, u = f < 0.35 ? f / 0.35 : f < 0.5 ? 1 : f < 0.85 ? 1 - (f - 0.5) / 0.35 : 0, x = Math.round(270 - u * 50), y = 119, d = f < 0.5 ? -1 : 1, salta = Math.abs(Math.sin(t * 12)) > 0.6 && (f < 0.35 || (f > 0.5 && f < 0.85)) ? 1 : 0;
    const c = hex('#8a5a3a'), cl = hex('#a87a54'); rect(x - 1, y - 2 - salta, x + 1, y - salta, c); pset(x + 2 * d, y - 2 - salta, c); pset(x + 2 * d, y - 3 - salta, K); pset(x - 2 * d, y - 2 - salta, cl); pset(x - 3 * d, y - 3 - salta, cl); pset(x - 3 * d, y - 4 - salta, cl); pset(x - 2 * d, y - 5 - salta, cl); }
  // las hojas del suelo que arrastra el viento a ras de la hierba
  for (let k = 0; k < 10; k++) { const x = ((h(k, 1, 140) * 400 + t * (14 + k * 2)) % 400) - 40, y = 150 + h(k, 2, 140) * 26 - Math.abs(Math.sin(t * 3 + k)) * 3; pset(x, y, [P.arce1, P.oro1, P.arce2][k % 3]); pset(x + 1, y, [P.arce0, P.oro0, P.arce1][k % 3]); }
  // el buzón rural en su poste: la tapa (o.puerta) y la banderita roja (o.bandera)
  { const pu = Math.max(0, Math.min(1, o.puerta ?? 0)), ba = Math.max(0, Math.min(1, o.bandera ?? 0));
    rect(237, 134, 241, 162, K); rect(238, 135, 240, 162, P.porche); rect(238, 135, 238, 162, P.porcheL); rect(232, 134, 246, 136, K); rect(233, 134, 245, 135, P.porcheL);
    rect(226, 126, 252, 134, K); rect(227, 127, 251, 133, P.buzon); rect(228, 124, 250, 126, K); rect(229, 125, 249, 126, P.buzonL); rect(227, 127, 251, 127, P.buzonL);
    for (let x = 231; x < 250; x += 4) pset(x, 130, d_mez(P.buzon, K, 0.4));
    if (pu < 0.5) { rect(225, 125, 227, 134, K); rect(226, 126, 226, 133, P.buzonL); pset(225, 129, P.laton); }
    else { rect(226, 126, 251, 133, hex('#121a16')); const l = Math.round(pu * 8); poligono([[227, 134], [227 - l, 134 + Math.round(l * 0.2)], [227 - l, 136 + Math.round(l * 0.2)], [227, 136]], P.buzonL); rect(228, 131, 236, 133, P.papel); }
    const a = ba * Math.PI / 2, fx = 253, fy = 131, ex = Math.round(fx - Math.cos(a) * 9), ey = Math.round(fy - Math.sin(a) * 9);
    linea(fx, fy, ex, ey, C.rojoS); linea(fx, fy - 1, ex, ey - 1, C.rojo); rect(ex - 1, ey - 2, ex + 1, ey + 1, C.rojo); pset(ex - 1, ey - 2, hex('#f06a5a')); pset(fx, fy, K); }
  return { suelo: 156, sueloPorche: 131, puerta: [18, 70, 44, 128], buzon: [226, 124, 252, 136] };
}

// lo fijo del porche (en su búfer, con el cielo vacío): colinas con el bosque de otoño y la iglesia blanca, el muro de
// piedra, la hierba con hojas, el camino de grava, la carretera, la casa de tablas con la ventana, las contraventanas, la
// puerta con la mosquitera, el farol, el porche con columnas, barandilla, celosía y escalones, calabazas y el rastrillo
function d_buzonFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // las colinas lejanas (azuladas) y las de en medio con el bosque moteado de rojos, naranjas, amarillos y pinos
  for (let x = 0; x < 320; x++) { const y1 = Math.round(66 + Math.sin(x * 0.02) * 6 + Math.sin(x * 0.07) * 2), y2 = Math.round(82 + Math.sin(x * 0.035 + 1) * 5);
    for (let y = y1; y < y2; y++) pset(x, y, h(x >> 1, y >> 1, 141) < 0.5 ? hex('#8a8aa8') : hex('#9a96b0'));
    for (let y = y2; y < 122; y++) { const v = h(x >> 1, y >> 1, 142); pset(x, y, v < 0.25 ? P.arce1 : v < 0.45 ? P.oro1 : v < 0.6 ? P.arce2 : v < 0.8 ? P.pino1 : v < 0.9 ? P.arce0 : P.pino0); }
    pset(x, y2, P.arce3); }
  // la iglesia blanca con su campanario, entre los árboles
  rect(186, 74, 200, 86, P.tabla); rect(198, 74, 200, 86, P.tablaS); poligono([[184, 75], [202, 75], [193, 69]], P.tablaS); rect(190, 58, 195, 74, P.tabla); rect(194, 58, 195, 74, P.tablaS);
  poligono([[189, 59], [196, 59], [192.5, 48]], P.tablaL); rect(192, 63, 193, 66, hex('#4a4a5a')); rect(190, 78, 192, 82, hex('#4a4a5a')); rect(195, 78, 197, 82, hex('#4a4a5a')); linea(192, 48, 192, 45, K);
  // una casita lejana con su chimenea (el humo es vida)
  rect(92, 78, 104, 86, P.tabla); poligono([[90, 79], [106, 79], [98, 73]], P.ladrS); rect(100, 70, 102, 76, P.ladr);
  // el muro de piedra seca, con piedras de tres tonos y su sombra
  rect(124, 118, 319, 132, P.piedraS);
  for (let k = 0; k < 90; k++) { const x = 124 + (k % 30) * 6.6 + (Math.floor(k / 30) & 1) * 3, y = 120 + Math.floor(k / 30) * 4 + h(k, 1, 143) * 1.5, w = 3 + h(k, 2, 143) * 3;
    rect(x, y, x + w, y + 3, P.piedra); rect(x, y, x + w, y, P.piedraL); rect(x + w, y + 1, x + w, y + 3, P.piedraS); }
  // la hierba con sus matas y hojas caídas, el camino de grava y la carretera de abajo
  rect(0, 132, 319, 179, P.hierba);
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 144); if (v < 0.16) pset(x, y, P.hierbaS); else if (v > 0.93) pset(x, y, [P.arce1, P.oro1, P.arce2, P.arce0][Math.floor(h(x, y, 145) * 4)]); else if (v > 0.88) pset(x, y, P.hierbaL); }
  for (let y = 134; y < 162; y++) { const u = (y - 134) / 28, xa = Math.round(124 + u * 100 - 4 + Math.sin(u * 3) * 6), w = 10 + u * 6;
    for (let x = xa; x < xa + w; x++) pset(x, y, h(x, y, 146) < 0.3 ? P.gravaS : h(x, y, 146) > 0.9 ? P.tablaL : P.grava); }
  rect(0, 163, 319, 179, hex('#6a6460')); rect(0, 163, 319, 164, hex('#8a8478')); for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 147); if (v < 0.12) pset(x, y, hex('#56504c')); else if (v > 0.95) pset(x, y, [P.arce1, P.oro1][x & 1]); }
  for (let x = 0; x < 320; x++) if (h(x, 0, 148) < 0.5) pset(x, 162, P.hierbaS);
  // la casa: el alero de tejas, las tablas blancas con su sombra y la ventana con contraventanas verdes y cortinas
  rect(0, 28, 124, 128, P.tabla);
  for (let y = 30; y < 128; y += 4) { rect(0, y, 124, y, P.tablaS); rect(0, y + 1, 124, y + 1, P.tablaL); }
  poligono([[0, 16], [128, 22], [128, 28], [0, 28]], hex('#4a4450')); for (let y = 18; y < 28; y += 2) for (let x = (y & 2) * 2; x < 128; x += 8) rect(x, y, x + 6, y, hex('#3a3440')); rect(0, 27, 128, 29, K);
  rect(0, 29, 124, 34, P.tablaL); rect(0, 34, 124, 35, P.tablaS);
  rect(56, 46, 90, 94, K); rect(57, 47, 89, 93, P.marco); rect(60, 50, 86, 90, hex('#5a7a9a'));
  for (let y = 50; y < 91; y++) for (let x = 60; x < 87; x++) if (((x - y) % 14 + 14) % 14 < 3) pset(x, y, hex('#8ab0cc'));
  rect(60, 50, 64, 90, hex('#e8d8b8')); rect(82, 50, 86, 90, hex('#e8d8b8')); rect(57, 69, 89, 71, P.marco); rect(72, 47, 74, 93, P.marco); rect(54, 93, 92, 96, P.marco); rect(54, 96, 92, 96, P.marcoS);
  for (const sx of [46, 92]) { rect(sx, 46, sx + 8, 94, K); rect(sx + 1, 47, sx + 7, 93, P.contra); for (let y = 49; y < 92; y += 2) rect(sx + 2, y, sx + 6, y, P.contraS); }
  // la puerta roja con la mosquitera, el felpudo y el farol
  rect(14, 64, 46, 128, P.marco); rect(16, 68, 44, 128, K); rect(17, 69, 43, 127, hex('#8a2a24'));
  for (const [a, b] of [[72, 94], [100, 124]]) { rect(20, a, 40, b, hex('#a83a2e')); rect(20, a, 40, a, hex('#c84a3a')); rect(40, a, 40, b, hex('#6a1e1a')); }
  rect(18, 69, 43, 69, P.tablaL); for (let y = 70; y < 98; y++) for (let x = 18; x < 43; x++) if (((x + y) & 1) === 0) pset(x, y, d_mez(R.pget(x, y), hex('#8a8a90'), 0.45));
  rect(17, 98, 43, 99, P.marco); rect(38, 104, 40, 106, P.laton); rect(18, 126, 42, 128, hex('#6a5a3a'));
  rect(48, 70, 52, 78, K); rect(49, 71, 51, 76, hex('#f8e8a0')); rect(48, 68, 52, 69, K);
  // el porche: el techo, las columnas, la barandilla con balaustres, el suelo, la celosía y los escalones
  rect(0, 28, 128, 33, P.tablaL); rect(0, 33, 128, 34, P.tablaS);
  for (const cx of [4, 112]) { rect(cx, 34, cx + 7, 128, K); rect(cx + 1, 34, cx + 6, 128, P.tabla); rect(cx + 1, 34, cx + 2, 128, P.tablaL); rect(cx + 5, 34, cx + 6, 128, P.tablaS); rect(cx - 1, 34, cx + 8, 37, P.tablaL); rect(cx - 1, 124, cx + 8, 128, P.tablaS); }
  rect(52, 110, 112, 112, K); rect(52, 110, 112, 110, P.tablaL); rect(52, 124, 112, 125, P.tablaS);
  for (let x = 54; x < 112; x += 4) { rect(x, 112, x + 1, 124, P.tabla); rect(x + 1, 112, x + 1, 124, P.tablaS); }
  rect(0, 128, 128, 133, P.porche); rect(0, 128, 128, 128, P.porcheL); for (let x = 0; x < 128; x += 7) pset(x, 130, P.porcheS); rect(0, 133, 128, 134, P.porcheS);
  rect(0, 135, 120, 160, P.porcheS); for (let y = 135; y < 160; y++) for (let x = 0; x < 120; x++) if (((x + y) % 6) === 0 || ((x - y + 60) % 6) === 0) pset(x, y, P.tablaS);
  for (let k = 0; k < 3; k++) { const y = 134 + k * 8, x0 = 120 + k * 3; rect(x0, y, 142 + k * 2, y + 2, P.porcheL); rect(x0, y + 3, 142 + k * 2, y + 7, P.porcheS); rect(x0, y, x0, y + 7, K); }
  // las calabazas en los escalones y junto a la puerta, y el rastrillo apoyado en la columna
  for (const [cx, cy, r] of [[130, 132, 4], [136, 140, 3], [56, 125, 4]]) { disco(cx, cy, r, hex('#c8641e')); disco(cx - 1, cy - 1, r * 0.7, hex('#e8842e')); for (let i = -r + 1; i < r; i += 2) linea(cx + i, cy - r + 1, cx + i, cy + r - 1, hex('#a8501a')); rect(cx, cy - r - 2, cx, cy - r, P.pino1); }
  linea(104, 126, 96, 60, P.robleS); linea(105, 126, 97, 60, P.robleL); for (let i = -4; i <= 4; i++) linea(96 + i, 60, 96 + i * 1.5, 54, P.aceroS);
  // el montón de hojas rastrilladas junto al porche
  for (let k = 0; k < 60; k++) { const a = h(k, 1, 149) * Math.PI, r = h(k, 2, 149) * 14; pset(160 + Math.cos(a) * r * 1.4, 160 - Math.sin(a) * r * 0.6, [P.arce1, P.oro1, P.arce2, P.arce0, P.oro0][k % 5]); }
}

// una portada de libro sin letras (x, y: esquina; w × a): 'mapa' (el libro del mapa: carabela sobre un mapa de
// costas), 'nave' (el platillo con sus rayos de luz), 'carabela' (sobre el mar al atardecer) o 'globo'
function d_portada(R, x, y, w, a, tipo) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k, cx = x + (w >> 1);
  rect(x - 1, y - 1, x + w, y + a, K);
  if (tipo === 'nave') { rect(x, y, x + w - 1, y + a - 1, hex('#1e2450')); for (let k = 0; k < 6; k++) pset(x + h(k, 1, 150) * w, y + h(k, 2, 150) * a * 0.6, C.blanco);
    poligono([[cx - 2, y + a * 0.45], [cx + 2, y + a * 0.45], [cx + 4, y + a - 2], [cx - 4, y + a - 2]], hex('#e8d870')); rect(cx - 4, y + a * 0.35, cx + 4, y + a * 0.35 + 1, P.plata); rect(cx - 2, y + a * 0.35 - 1, cx + 2, y + a * 0.35 - 1, hex('#8ae0e8')); pset(cx - 3, y + a * 0.35 + 1, C.rojo); pset(cx + 2, y + a * 0.35 + 1, C.rojo); }
  else if (tipo === 'carabela') { rect(x, y, x + w - 1, y + a - 1, hex('#e8904a')); rect(x, y + (a >> 1), x + w - 1, y + a - 1, hex('#2a4a7a')); disco(cx + 2, y + (a >> 1), 2, hex('#f8d870'));
    poligono([[cx - 4, y + a - 5], [cx + 4, y + a - 5], [cx + 3, y + a - 3], [cx - 3, y + a - 3]], P.robleD); linea(cx, y + a - 5, cx, y + 3, P.robleD); rect(cx - 3, y + 4, cx + 2, y + a - 7, P.papel); pset(cx, y + 2, C.rojo); }
  else if (tipo === 'globo') { rect(x, y, x + w - 1, y + a - 1, hex('#3a6a3a')); disco(cx, y + (a >> 1), Math.min(w, a) * 0.32, hex('#5a8ac0')); disco(cx - 1, y + (a >> 1) - 1, Math.min(w, a) * 0.14, hex('#8ab86a')); rect(x + 1, y + a - 3, x + w - 2, y + a - 3, P.laton); }
  else { rect(x, y, x + w - 1, y + a - 1, P.sepia); for (let j = 0; j < a; j++) for (let i = 0; i < w; i++) if (h(x + i, y + j, 151) < 0.12) pset(x + i, y + j, P.sepiaS);
    linea(x + 1, y + a - 4, x + 3, y + a - 7, P.sepiaD); linea(x + 3, y + a - 7, x + 2, y + 3, P.sepiaD); linea(x + w - 2, y + 2, x + w - 4, y + a - 2, P.sepiaD);
    for (let k = 0; k < 6; k++) linea(cx, y + (a >> 1), cx + Math.cos(k) * 6, y + (a >> 1) + Math.sin(k) * 6, hex('#c08a5a'));
    poligono([[cx - 3, y + a - 6], [cx + 3, y + a - 6], [cx + 2, y + a - 4], [cx - 2, y + a - 4]], P.robleD); linea(cx, y + a - 6, cx, y + a - 12, P.robleD); rect(cx - 2, y + a - 11, cx + 1, y + a - 8, P.papel); pset(cx, y + a - 13, C.rojo);
    rect(x, y + 1, x + w - 1, y + 2, hex('#a83a2a')); }
  rect(x, y, x, y + a - 1, d_mez(R.pget(x, y), C.blanco, 0.3));
}

// la librería general (ver la cabecera de america): lo fijo en su búfer; encima la calle por el escaparate, la
// campanilla, el gato, el cliente de la escalera, las lámparas y las motas de polvo
function d_libreria(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  R.copiar(d_capa(R, 'libreria' + (o.vitrina === false ? '0' : '1'), () => d_libreriaFijo(R, o.vitrina !== false)));
  // la calle por el cristal de la puerta y el del escaparate
  for (const cl of [[8, 38, 26, 92], [38, 38, 86, 106]]) d_calle(R, t, cl);
  // los parteluces del escaparate y el filete dorado, por delante de la calle
  rect(61, 38, 62, 106, P.estante); rect(38, 70, 86, 71, P.estante); rect(8, 64, 26, 65, P.estante);
  for (let x = 40; x < 85; x++) { const y = Math.round(46 - Math.sin((x - 40) / 45 * Math.PI) * 5); pset(x, y, P.latonL); pset(x, y + 1, P.latonS); }
  // la campanilla de la puerta, que se mueve cada tanto
  { const f = t % 6.5, a = f < 1.2 ? Math.sin(f * 14) * (1.2 - f) * 2.5 : 0; linea(17, 33, 17 + a * 0.5, 36, K); disco(17 + a, 38, 2.4, P.latonS); disco(16.5 + a, 37.5, 1.8, P.laton); pset(16 + Math.round(a), 37, P.latonL); }
  // el gato que duerme encima de la estantería: respira y menea la cola
  { const x = 128, y = 30, r = Math.sin(t * 1.8) > 0 ? 1 : 0; rect(x, y - 3 - r, x + 9, y, hex('#d8823a')); rect(x + 1, y - 4 - r, x + 8, y - 3 - r, hex('#e8a25a')); for (let i = 1; i < 9; i += 3) pset(x + i, y - 2, hex('#a85a22'));
    rect(x + 9, y - 4, x + 12, y, hex('#d8823a')); pset(x + 10, y - 5, hex('#d8823a')); pset(x + 12, y - 5, hex('#d8823a')); pset(x + 11, y - 2, K);
    const c = Math.sin(t * 2.4); linea(x, y - 1, x - 4, y - 1 + Math.round(c * 2), hex('#d8823a')); pset(x - 5, y - 1 + Math.round(c * 3), hex('#a85a22')); }
  // el cliente de la escalera (figura pequeña de fondo): sube, saca un libro y baja
  { const f = (t % 11) / 11, u = f < 0.3 ? f / 0.3 : f < 0.6 ? 1 : f < 0.9 ? 1 - (f - 0.6) / 0.3 : 0, x = 104, y = Math.round(128 - u * 46), paso = Math.floor(t * 4) % 2 && u > 0 && u < 1;
    rect(x - 2, y - 11, x + 2, y - 5, hex('#3a5a7a')); rect(x - 2, y - 4, x - 1, y - (paso ? 1 : 0), hex('#2a2a34')); rect(x + 1, y - 4, x + 2, y, hex('#2a2a34')); disco(x, y - 13, 2.3, hex('#e8b890')); rect(x - 2, y - 15, x + 2, y - 14, hex('#5a3a22'));
    if (f > 0.3 && f < 0.9) { rect(x + 3, y - 10, x + 5, y - 7, d_LOMOS[1][0]); pset(x + 3, y - 10, d_LOMOS[1][2]); } }
  // la escalera de rueda delante del cliente (los peldaños le tapan)
  for (let y = 40; y < 129; y += 7) rect(100, y, 110, y, P.estanteL); linea(99, 36, 99, 128, P.estanteS); linea(111, 36, 111, 128, P.estanteS); disco(99, 128, 1.5, K); disco(111, 128, 1.5, K);
  // las lámparas que cuelgan, con su luz cálida
  for (const [lx, fase] of [[180, 0], [250, 2]]) { const s = Math.sin(t * 0.7 + fase) * 0.6; linea(lx, 0, lx + s, 14, K);
    R.poligono([[lx - 6 + s, 21], [lx + 6 + s, 21], [lx + 3 + s, 14], [lx - 3 + s, 14]], hex('#2a5a3a')); rect(lx - 6 + s, 21, lx + 6 + s, 21, hex('#3a7a4a')); disco(lx + s, 22, 2, hex('#fff2b8')); }
  // motas de polvo en la luz del escaparate
  for (let k = 0; k < 12; k++) { const f = (h(k, 3, 152) * 60 + t * 2) % 60, x = Math.round(70 + h(k, 5, 152) * 70 + f * 0.8 + Math.sin(t * 0.6 + k) * 2), y = Math.round(72 + f); if (Math.sin(t * 1.4 + k * 2) > 0) pset(x, y, hex('#fff2d0')); }
  return d_libreriaGeo();
}

// dónde está cada cosa en la librería
function d_libreriaGeo() { return { suelo: 152, sueloDelante: 176, sueloMostrador: 146, mesa: [102, 144, 200, 172], hueco: [120, 184], mostrador: [234, 140, 319, 179], vitrina: [194, 82, 228, 126], escaparate: [38, 38, 86, 106], puerta: [8, 34, 26, 132] }; }

// la calle de 1966 vista desde dentro (coordenadas de pantalla, recortada a cl): fachadas de ladrillo con ventanas,
// el cielo, un arce, la acera, coches de los sesenta que pasan en los dos sentidos y paseantes
function d_calle(R, t, cl) {
  const P = d_P, K = C.k;
  d_cielo(R, cl, t, { y0: 34, hor: 60, ancho: 140, k: 13, pajaros: false });
  R.recorte(cl);
  d_rc(R, cl[0], 44, cl[2], 92, P.ladr); for (let y = 46; y < 92; y += 3) for (let x = cl[0] + ((y / 3) & 1) * 3; x <= cl[2]; x += 6) R.pset(x, y, P.ladrS);
  for (let x = 2; x < 100; x += 14) for (const y of [50, 66]) { d_rc(R, x, y, x + 7, y + 9, P.tablaL); d_rc(R, x + 1, y + 1, x + 6, y + 8, hex('#3a4a5a')); R.pset(x + 1, y + 1, P.cielo2); d_rc(R, x, y + 10, x + 7, y + 10, P.piedraL); }
  d_rc(R, 20, 80, 46, 92, hex('#2a5a4a')); for (let x = 22; x < 46; x += 3) d_rc(R, x, 82, x + 1, 92, hex('#3a7a5a'));
  d_arce(R, 64, 98, t, 12, 'oro');
  d_rc(R, cl[0], 92, cl[2], 97, P.piedraL); d_rc(R, cl[0], 97, cl[2], cl[3], hex('#4a4a50')); d_rc(R, cl[0], 97, cl[2], 97, P.piedraS);
  for (let x = cl[0]; x <= cl[2]; x += 8) R.linea(x, 101, x + 4, 101, hex('#d8c060'));
  // los coches: uno que va a la derecha y otro a la izquierda, a ratos
  for (const [v, y, c, k] of [[34, 99, hex('#4a8ab8'), 0], [-26, 103, hex('#c8a040'), 1]]) { const ciclo = 200, x = v > 0 ? -40 + ((t * v + k * 70) % ciclo) : 140 - ((t * -v + k * 70) % ciclo);
    d_rc(R, x - 12, y - 4, x + 12, y, c); d_rc(R, x - 12, y - 4, x + 12, y - 4, d_mez(c, C.blanco, 0.4)); d_rc(R, x - 6, y - 8, x + 6, y - 5, c); d_rc(R, x - 5, y - 7, x + 5, y - 5, hex('#9ac8e0')); R.linea(x, y - 7, x, y - 5, c);
    d_rc(R, x - 13, y - 1, x + 13, y - 1, P.plataL); R.disco(x - 7, y + 1, 2, K); R.disco(x + 7, y + 1, 2, K); R.pset(x + (v > 0 ? 12 : -12), y - 3, hex('#f8f0b0')); }
  // dos paseantes por la acera de enfrente
  for (const [v, k, c] of [[6, 0, hex('#7a3a3a')], [-5, 1, hex('#3a4a6a')]]) { const x = v > 0 ? -10 + ((t * v + k * 50) % 120) : 110 - ((t * -v + k * 50) % 120), y = 95, p = Math.floor(t * 4 + k) % 2;
    d_rc(R, x - 1, y - 7, x + 1, y - 3, c); R.pset(x - 1, y - 2 + p, K); R.pset(x + 1, y - 2 + (1 - p), K); R.pset(x, y - 9, hex('#e8b890')); R.pset(x, y - 8, hex('#e8b890')); R.pset(x, y - 10, k ? K : hex('#6a4a2a')); }
  R.recorte(null);
}

// lo fijo de la librería: techo de chapa repujada, pared, estanterías llenas, la puerta y el escaparate (marcos y los
// libros expuestos de espaldas), el mostrador del fondo con su estantería, la vitrina (con), el suelo y la alfombra
function d_libreriaFijo(R, conVitrina) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // el techo de chapa repujada y la moldura
  rect(0, 0, 319, 9, P.chapa); for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) { const i = x % 8, j = y % 8; if (i === 0 || j === 0) pset(x, y, P.chapaS); else if (i === 4 && j === 4) pset(x, y, P.chapaL); }
  rect(0, 10, 319, 11, P.estanteL); rect(0, 12, 319, 12, P.estanteS);
  // la pared de yeso cálido
  rect(0, 13, 319, 130, hex('#e0cca4')); for (let y = 13; y < 131; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 153); if (v < 0.08) pset(x, y, hex('#ccb48a')); else if (v > 0.96) pset(x, y, hex('#ecdcb8')); }
  // las estanterías del fondo (cuatro cuerpos) con su cornisa, baldas llenas y la barra de la escalera
  rect(94, 30, 234, 130, P.estanteD); rect(92, 28, 236, 33, P.estante); rect(92, 28, 236, 28, P.estanteL); rect(92, 33, 236, 34, P.estanteS);
  for (let c = 0; c < 4; c++) { const x0 = 96 + c * 34, x1 = x0 + 31;
    rect(x0 - 2, 34, x0 - 1, 130, P.estante); rect(x0 - 2, 34, x0 - 2, 130, P.estanteL);
    for (let k = 0; k < 6; k++) { const yb = 48 + k * 15; d_libros(R, x0, x1, yb - 1, 12, c * 10 + k); rect(x0, yb, x1, yb + 1, P.estante); rect(x0, yb, x1, yb, P.estanteL); }
    if (c === 2) d_portada(R, x0 + 10, 64, 10, 13, 'globo'); }
  rect(232, 34, 234, 130, P.estante); rect(92, 36, 236, 36, P.latonS);
  // el escaparate y la puerta: marcos de madera oscura, los huecos, el zócalo y los libros expuestos de espaldas
  rect(0, 30, 92, 132, P.estanteS); rect(2, 32, 90, 32, P.estanteL);
  rect(4, 34, 30, 132, K); rect(5, 35, 29, 131, P.estante); rect(8, 38, 26, 92, P.cielo2); rect(8, 96, 26, 128, P.estanteL); rect(9, 97, 25, 127, P.estante); rect(24, 108, 25, 112, P.laton);
  rect(34, 34, 90, 110, K); rect(35, 35, 89, 109, P.estante); rect(38, 38, 86, 106, P.cielo2);
  rect(34, 110, 90, 132, P.estanteS); for (let x = 36; x < 90; x += 18) { rect(x, 113, x + 15, 129, P.estante); rect(x, 113, x + 15, 113, P.estanteL); }
  for (const [bx, by, w, a] of [[42, 92, 10, 13], [56, 95, 9, 10], [70, 91, 10, 14]]) { rect(bx, by, bx + w, by + a, P.papelS); rect(bx, by, bx + w, by, P.papel); rect(bx + 2, by + a - 1, bx + w - 2, by + a + 1, P.robleD); }
  rect(36, 106, 88, 108, P.estanteL);
  disco(80, 101, 3, P.pino2); rect(79, 104, 81, 106, hex('#b8643a'));
  // la estantería de detrás del mostrador (empieza por debajo de la esquina de Atom)
  rect(238, 48, 318, 130, P.estanteD); rect(236, 46, 319, 49, P.estante); rect(236, 46, 319, 46, P.estanteL);
  for (let k = 0; k < 5; k++) { const yb = 62 + k * 15; d_libros(R, 240, 316, yb - 1, 12, 50 + k); rect(240, yb, 318, yb + 1, P.estante); rect(240, yb, 318, yb, P.estanteL); }
  rect(238, 48, 239, 130, P.estante);
  // el suelo de tablas y la alfombra larga con su cenefa
  d_tablas(R, 131, 179, 80, 3.0, [P.tablon, P.tablonS, P.tablonL, P.estanteS], 5);
  rect(0, 130, 319, 131, P.estanteD);
  for (let y = 140; y < 180; y++) { const d = (y - 140) * 0.9, a = Math.round(96 - d), b = Math.round(212 + d);
    for (let x = a; x <= b; x++) { const e = Math.min(x - a, b - x); pset(x, y, e < 2 ? P.alfombraS : e < 5 ? (((x + y) & 3) === 0 ? P.oro1 : P.alfombraL) : (((x >> 2) + (y >> 2)) & 1) && h(x >> 2, y >> 2, 154) < 0.4 ? P.alfombraL : P.alfombra); } }
  // la vitrina: patas, caja de cristal con el libro antiguo abierto y el retrato del científico de pelo blanco de espaldas
  if (conVitrina) {
    rect(196, 112, 198, 130, P.estanteD); rect(224, 112, 226, 130, P.estanteD);
    rect(193, 108, 229, 113, K); rect(194, 109, 228, 112, P.estante); rect(194, 109, 228, 109, P.estanteL);
    rect(194, 82, 228, 108, K); rect(195, 83, 227, 107, hex('#7a1e2a'));
    rect(198, 98, 224, 106, K); rect(199, 99, 210, 105, hex('#e0c890')); rect(212, 99, 223, 105, hex('#e0c890')); rect(211, 99, 211, 105, hex('#a8885a'));
    for (let j = 100; j < 105; j += 2) { rect(200, j, 209, j, hex('#8a6a4a')); rect(213, j, 222, j, hex('#8a6a4a')); }
    rect(203, 85, 219, 97, K); rect(204, 86, 218, 96, P.latonS); rect(205, 87, 217, 95, hex('#c8b898'));
    rect(207, 92, 215, 95, hex('#3a3a44')); for (let k = 0; k < 18; k++) disco(208 + h(k, 1, 155) * 6, 88 + h(k, 2, 155) * 4, 1, k % 3 ? hex('#f4f4f8') : hex('#c8c8d0'));
    for (let y = 83; y < 108; y++) for (let x = 195; x < 228; x++) if (((x + y) & 1) === 0) pset(x, y, d_mez(R.pget(x, y), hex('#c8e0f0'), 0.18));
    linea(197, 106, 207, 84, hex('#e8f4ff')); linea(199, 106, 209, 84, hex('#b8d4e8'));
  }
}

// la mesa de novedades y el mostrador, por delante de los personajes: la mesa con pilas de libros y portadas en
// atriles a los lados (el hueco del medio, x 134–168, queda libre para quien está detrás); con o.firma, el libro
// abierto, la pluma y el cartel con la nave en su caballete junto a la mesa (x 202–220); el mostrador con su frente de cuarterones y la caja registradora
function d_libreriaDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // la mesa: tablero con su canto, faldón, patas torneadas
  rect(102, 144, 200, 148, K); rect(103, 145, 199, 146, P.tablonL); rect(103, 147, 199, 147, P.tablon);
  rect(106, 148, 196, 154, K); rect(107, 148, 195, 153, P.tablonS); for (let x = 112; x < 194; x += 16) rect(x, 150, x + 10, 151, P.estanteS);
  for (const x of [108, 192]) { rect(x - 1, 154, x + 3, 172, K); rect(x, 154, x + 2, 172, P.tablon); rect(x, 154, x, 172, P.tablonL); rect(x - 1, 160, x + 3, 161, P.tablonL); }
  // las pilas de libros tumbados (cantos de colores) y las portadas en sus atriles
  for (const [x, n, k] of [[118, 3, 0], [136, 2, 3], [158, 2, 6], [172, 3, 2]]) for (let i = 0; i < n; i++) { const [c, cS, cL] = d_LOMOS[(k + i * 2) % 9], y = 143 - i * 3, dx = (i % 2) * 1;
    rect(x + dx - 1, y - 2, x + dx + 11, y + 1, K); rect(x + dx, y - 1, x + dx + 10, y, c); rect(x + dx, y - 1, x + dx + 10, y - 1, cL); rect(x + dx + 10, y - 1, x + dx + 10, y, P.papel); }
  const firma = !!o.firma;
  for (const [x, tipo] of [[104, firma ? 'nave' : 'mapa'], [187, firma ? 'nave' : 'carabela']]) { rect(x + 1, 141, x + 9, 143, P.estanteD); d_portada(R, x, 129, 10, 13, tipo); }
  if (firma) { // el libro abierto para firmar, la pluma y el cartel en su caballete con la nave y una flecha
    rect(140, 140, 162, 144, K); rect(141, 141, 150, 143, P.papel); rect(152, 141, 161, 143, P.papel); rect(151, 141, 151, 143, P.papelS);
    for (let x = 153; x < 160; x += 2) pset(x, 142, hex('#2a2a3a')); linea(156, 140, 162, 136, K); pset(162, 136, P.laton);
    linea(205, 172, 209, 118, P.estanteD); linea(217, 172, 213, 118, P.estanteD); d_portada(R, 202, 116, 18, 24, 'nave');
  }
  // el mostrador: tablero, frente de cuarterones y la caja registradora de latón con sus cifras
  rect(232, 138, 319, 142, K); rect(233, 139, 319, 140, P.tablonL); rect(233, 141, 319, 141, P.tablon);
  rect(234, 142, 319, 179, P.estante); rect(234, 142, 319, 143, P.estanteS);
  for (let x = 238; x < 316; x += 20) { rect(x, 148, x + 15, 174, P.estanteS); rect(x + 1, 149, x + 14, 173, P.estante); rect(x + 1, 149, x + 14, 149, P.estanteL); rect(x + 14, 150, x + 14, 173, P.estanteD); }
  rect(284, 118, 314, 138, K); rect(285, 119, 313, 137, P.laton); rect(285, 119, 313, 119, P.latonL); rect(312, 120, 313, 137, P.latonS);
  for (let y = 122; y < 136; y += 3) for (let x = 287; x < 311; x += 3) pset(x + ((y / 3) & 1), y, P.latonS);
  rect(288, 110, 310, 118, K); rect(289, 111, 309, 117, hex('#1e1a14'));
  { const n = 1 + (Math.floor(t / 2.3) * 7) % 9; R.numero('$' + String(n) + '.' + String(10 + (Math.floor(t / 2.3) * 13) % 89), 290, 117, { rampa: [P.latonL, P.latonL, P.latonL], tam: 8, fina: true }); }
  for (let k = 0; k < 4; k++) { disco(289 + k * 7, 128, 2, K); disco(289 + k * 7, 128, 1.4, P.papel); }
  rect(282, 136, 316, 138, P.latonS); const caj = (t % 9) < 0.8 ? 3 : 0; rect(284, 136, 314, 137 + caj, K); rect(285, 136, 313, 136 + caj, P.estanteL);
  return d_libreriaGeo();
}

// la imprenta de libros (ver la cabecera de america): lo fijo en su búfer; encima el cielo y el humo por los
// ventanales, los cilindros que giran, los pliegos, el contador, el piloto, la cinta con los libros y el operario de fondo
function d_imprenta(R, t, o) {
  const { rect, pset, linea, disco } = R, P = d_P, K = C.k;
  R.copiar(d_capa(R, 'imprenta', () => d_imprentaFijo(R)));
  // por los ventanales: el cielo y la chimenea de enfrente que humea
  const cl = [10, 28, 86, 78];
  d_cielo(R, cl, t, { y0: 28, hor: 78, ancho: 140, k: 17 });
  R.recorte(cl); d_rc(R, 60, 40, 68, 78, P.ladrS); d_rc(R, 60, 40, 61, 78, P.ladr); d_rc(R, 10, 66, 86, 78, hex('#7a6a64')); for (let x = 12; x < 86; x += 9) d_rc(R, x, 69, x + 4, 72, hex('#c8c0a0'));
  for (let k = 0; k < 10; k++) { const f = (t * 0.2 + k / 10) % 1; R.disco(64 + f * 18 + Math.sin(t + k) * 2, 38 - f * 16, 2 + f * 3, d_mez(hex('#c8c4c0'), P.cielo2, f * 0.8)); }
  R.recorte(null);
  for (let x = 10; x < 87; x += 13) rect(x, 28, x, 78, P.aceroD); for (let y = 28; y < 79; y += 10) rect(10, y, 86, y, P.aceroD);
  // los cilindros de las cuatro torres, que giran (las marcas corren por el borde)
  for (let k = 0; k < 4; k++) { const cx = 118 + k * 30, cy = 96;
    for (let i = 0; i < 4; i++) { const a = t * 6 + i * Math.PI / 2 + k; pset(Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), P.aceroL); pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), P.aceroD); }
    for (let i = 0; i < 3; i++) { const a = -t * 9 + i * 2.1; pset(Math.round(cx + 10 + Math.cos(a) * 3), Math.round(cy - 9 + Math.sin(a) * 3), P.aceroL); } }
  // lo impreso que corre por la banda de papel
  for (let x = 98; x < 237; x++) if (((x - Math.floor(t * 30)) % 9 + 9) % 9 < 3) pset(x, 106, hex('#4a5a7a'));
  // los pliegos: entran por la izquierda desde la pila y salen impresos a la derecha, sobre la pila que crece
  { const f = (t * 1.6) % 1, xs = Math.round(100 + f * 136); if (f < 0.12 || f > 0.88) { rect(xs - 6, 112 + (f > 0.88 ? Math.round((f - 0.88) * 40) : 0), xs + 6, 113 + (f > 0.88 ? Math.round((f - 0.88) * 40) : 0), P.papel); }
    const alto = 3 + Math.floor((t * 1.6) % 12 / 2); for (let j = 0; j < alto; j++) { rect(234, 126 - j, 252, 126 - j, j % 2 ? P.papelS : P.papel); if (j % 3 === 0) rect(238, 126 - j, 246, 126 - j, hex('#7a9ac0')); } }
  // el contador de pliegos, el manómetro y el piloto que parpadea
  rect(206, 70, 228, 78, K); R.numero(String((4100 + Math.floor(t * 1.6)) % 10000).padStart(4, '0'), 208, 77, { rampa: [hex('#f0a040'), hex('#f0c060'), hex('#f0c060')], tam: 8, fina: true });
  { const a = -2.4 + Math.sin(t * 1.3) * 0.4 + 1.6; linea(196, 74, 196 + Math.cos(a) * 3, 74 + Math.sin(a) * 3, C.rojo); }
  pset(232, 70, Math.floor(t * 3) % 2 ? hex('#5af06a') : hex('#2a6a3a')); pset(232, 71, Math.floor(t * 3) % 2 ? hex('#5af06a') : hex('#2a6a3a'));
  // la cinta de la encuadernadora: los rodillos corren y los libros salen de pie con su portada
  for (let x = 240; x < 320; x += 6) { const r = Math.floor(t * 10) % 2; pset(x + r * 3, 134, P.aceroL); }
  for (let k = 0; k < 4; k++) { const x = Math.round(238 + ((t * 14 + k * 24) % 96)); if (x < 316) { R.recorte([240, 100, 319, 140]); d_rcPortada(R, x, 116); R.recorte(null); } }
  // el operario de fondo que pasa con una carretilla bajo los ventanales (va y vuelve)
  { const f = (t % 14) / 14, u = f < 0.5 ? f * 2 : 2 - f * 2, x = Math.round(14 + u * 66), d = f < 0.5 ? 1 : -1, p = Math.floor(t * 4) % 2;
    const y = 12; rect(x - 1, 108 + y, x + 1, 113 + y, hex('#4a5a7a')); pset(x - 1, 114 + y - p, K); pset(x + 1, 114 + y - 1 + p, K); pset(x - 1, 115 + y, K); pset(x + 1, 115 + y, K); disco(x, 106 + y, 1.6, hex('#e8b890')); rect(x - 1, 104 + y, x + 1, 104 + y, P.papel);
    rect(x + d * 3, 109 + y, x + d * 9, 112 + y, P.papel); rect(x + d * 3, 113 + y, x + d * 9, 113 + y, P.aceroD); pset(x + d * 4, 114 + y, K); pset(x + d * 8, 114 + y, K); }
  return { suelo: 156, prensa: [96, 56, 236, 146], salida: [238, 128], mesaLibros: [262, 150] };
}

// un libro de pie con la portada del mapa (carabela y costas), para la cinta; respeta R.recorte
function d_rcPortada(R, x, y) {
  const P = d_P, K = C.k; d_rc(R, x - 1, y - 1, x + 10, y + 16, K); d_rc(R, x, y, x + 9, y + 15, P.sepia); d_rc(R, x, y, x + 9, y + 1, hex('#a83a2a'));
  R.linea(x + 1, y + 13, x + 3, y + 4, P.sepiaD); R.linea(x + 8, y + 3, x + 7, y + 14, P.sepiaD); R.linea(x + 3, y + 11, x + 7, y + 11, P.robleD); R.linea(x + 5, y + 11, x + 5, y + 5, P.robleD); d_rc(R, x + 3, y + 6, x + 5, y + 9, P.papel); R.pset(x + 5, y + 4, C.rojo);
}

// lo fijo de la imprenta: cerchas y lucernarios, pared de ladrillo pintado, ventanales, la rotativa con sus cuatro
// torres, la pila de entrada, palés de libros y cajas, la cinta, resmas, la carretilla y el suelo de hormigón
function d_imprentaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = d_P, K = C.k;
  // el techo: cubierta oscura, lucernarios y las cerchas de acero en celosía
  rect(0, 0, 319, 20, hex('#3a3c40')); rect(180, 2, 268, 15, hex('#a8c0d0')); for (let x = 180; x < 269; x += 11) rect(x, 2, x, 15, hex('#5a6470')); rect(180, 8, 268, 8, hex('#7a8a98'));
  rect(0, 16, 319, 18, hex('#5a5c62')); for (let x = 0; x < 320; x += 12) { linea(x, 18, x + 6, 2, hex('#4e5056')); linea(x + 6, 2, x + 12, 18, hex('#4e5056')); }
  rect(0, 2, 319, 3, hex('#4e5056')); rect(0, 19, 319, 20, hex('#26282c'));
  // la pared de ladrillo pintado (claro arriba, verde gris abajo) con sus juntas suaves
  rect(0, 21, 319, 124, hex('#c8bca4'));
  for (let y = 21; y < 125; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 21) / 4), xb = (x + (f & 1) * 6) % 12, abajo = y > 92;
    const c = abajo ? hex('#7a8a7e') : hex('#c8bca4'); let col = c; if ((y - 21) % 4 === 3 || xb === 0) col = d_mez(c, K, x > 270 && y < 48 ? 0.04 : 0.1); else if (h(x, y, 156) < 0.05) col = d_mez(c, C.blanco, 0.1); pset(x, y, col); }
  rect(0, 92, 319, 93, hex('#5a6a5e'));
  // los ventanales de fábrica: marco, hueco (el cielo es vida) y alféizar
  rect(7, 25, 89, 81, hex('#2a2e34')); rect(10, 28, 86, 78, P.cielo2); rect(5, 81, 91, 83, hex('#8a8478'));
  // la rotativa: bancada, cuatro torres con sus cilindros, el tintero de arriba, pasarela con barandilla y escalones
  rect(94, 132, 240, 146, K); rect(95, 133, 239, 145, P.maquinaD); rect(95, 133, 239, 133, P.maquinaS);
  for (let k = 0; k < 4; k++) { const x0 = 104 + k * 30;
    rect(x0, 60, x0 + 28, 132, K); rect(x0 + 1, 61, x0 + 27, 131, P.maquina); rect(x0 + 1, 61, x0 + 2, 131, P.maquinaL); rect(x0 + 25, 61, x0 + 27, 131, P.maquinaS);
    rect(x0 + 3, 62, x0 + 25, 70, P.maquinaS); rect(x0 + 4, 63, x0 + 24, 66, hex('#2a2a34')); rect(x0 + 4, 63, x0 + 24, 63, [hex('#3a6ac8'), C.rojo, hex('#e8c830'), K][k]);
    disco(x0 + 14, 96, 9, K); disco(x0 + 14, 96, 8, P.aceroS); disco(x0 + 14, 96, 6, P.acero); disco(x0 + 13, 95, 3, P.aceroL); disco(x0 + 14, 96, 1.5, K);
    disco(x0 + 24, 87, 4, K); disco(x0 + 24, 87, 3, P.aceroS);
    rect(x0 + 4, 112, x0 + 24, 128, P.maquinaS); rect(x0 + 5, 113, x0 + 23, 127, P.maquina); rect(x0 + 5, 113, x0 + 23, 113, P.maquinaL); rect(x0 + 12, 119, x0 + 16, 120, P.aceroL);
    for (const [bx, by] of [[x0 + 6, 76], [x0 + 22, 76]]) { disco(bx, by, 1.5, K); pset(bx, by, P.aceroL); } }
  rect(98, 56, 236, 60, K); rect(99, 57, 235, 59, P.maquinaS); rect(99, 57, 235, 57, P.maquinaL);
  // la banda de papel que corre por debajo de los cilindros, de torre a torre, y la barandilla amarilla de la pasarela
  rect(98, 105, 236, 107, K); rect(98, 106, 236, 106, P.papel); for (let k = 0; k < 4; k++) { rect(104 + k * 30, 104, 106 + k * 30, 108, P.aceroD); }
  rect(100, 44, 236, 45, hex('#e0b830')); for (let x = 100; x < 237; x += 17) rect(x, 44, x + 1, 56, hex('#c89a20')); rect(100, 50, 236, 50, hex('#c89a20'));
  disco(196, 74, 4, K); disco(196, 74, 3, P.papel); rect(204, 68, 230, 80, K); rect(205, 69, 229, 79, P.maquinaD); rect(230, 68, 234, 73, K);
  // la pila de papel de entrada a la izquierda y la mesa de salida a la derecha
  rect(90, 116, 104, 132, P.aceroD); for (let j = 0; j < 12; j++) rect(91, 115 - j, 103, 115 - j, j % 2 ? P.papelS : P.papel);
  rect(232, 127, 254, 132, P.aceroD); rect(232, 127, 254, 127, P.aceroL);
  // la cinta de la encuadernadora con sus patas
  rect(238, 132, 319, 136, K); rect(239, 133, 319, 134, P.aceroS); rect(239, 135, 319, 135, P.aceroD); for (const x of [246, 286, 314]) rect(x, 137, x + 2, 150, P.aceroD);
  // palés con libros envueltos y cajas de cartón, por debajo de la esquina de Atom
  for (const [x0, n] of [[256, 4], [288, 5]]) { rect(x0, 110, x0 + 28, 114, P.robleS); for (let j = 0; j < n; j++) { const y = 109 - j * 6; rect(x0 + 1, y - 5, x0 + 27, y, hex('#c8a46a')); rect(x0 + 1, y - 5, x0 + 27, y - 5, hex('#e0c088')); rect(x0 + 13, y - 5, x0 + 14, y, hex('#a88448')); rect(x0 + 1, y - 2, x0 + 27, y - 2, hex('#a88448')); } }
  for (const [bx, by, w] of [[246, 98, 10], [252, 104, 8]]) { rect(bx, by, bx + w, by + 9, hex('#b8925a')); rect(bx, by, bx + w, by + 1, hex('#d8b27a')); rect(bx + 1, by + 4, bx + w - 1, by + 4, hex('#8a6a3a')); }
  // las resmas de papel en su palé a la izquierda y la carretilla
  rect(8, 140, 62, 144, P.robleS); rect(8, 140, 62, 140, P.robleL); for (const x of [10, 33, 56]) rect(x, 144, x + 4, 147, P.robleD);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 2; i++) { const x = 10 + i * 26, y = 139 - j * 5; rect(x, y - 4, x + 24, y, P.papel); rect(x, y - 4, x + 24, y - 4, C.blanco); rect(x + 24, y - 3, x + 24, y, P.papelS); rect(x + 8, y - 4, x + 14, y, hex('#8ab0d0')); }
  linea(70, 150, 76, 112, K); linea(71, 150, 77, 112, P.aceroS); rect(66, 148, 80, 150, K); disco(72, 152, 3, K); disco(72, 152, 1.5, P.aceroS);
  // el suelo de hormigón con manchas de tinta y aceite, juntas y la raya amarilla de seguridad
  rect(0, 125, 319, 179, P.hormigon);
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 157); if (v < 0.08) pset(x, y, P.hormigonS); else if (v > 0.95) pset(x, y, P.hormigonL); }
  for (const [mx, my, r] of [[150, 160, 6], [210, 170, 4], [40, 166, 5]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / 2) ** 2 + j * j < r * r * (0.6 + h(mx + i, my + j, 158) * 0.5)) pset(mx + i, my + j, d_mez(P.hormigon, hex('#2a2a3a'), 0.35));
  for (let y = 125; y < 180; y++) pset(Math.round(160 + (y - 125) * 1.8), y, P.hormigonS);
  rect(0, 148, 319, 149, hex('#e0b830')); for (let x = 0; x < 320; x += 10) rect(x, 148, x + 4, 149, hex('#3a3a3a'));
  // redibuja la bancada y lo de encima del suelo (el suelo se pintó después)
  rect(94, 132, 240, 146, K); rect(95, 133, 239, 145, P.maquinaD); rect(95, 133, 239, 133, P.maquinaS); for (let x = 100; x < 236; x += 14) rect(x, 136, x + 6, 142, P.maquinaS);
  rect(8, 140, 62, 144, P.robleS); rect(8, 140, 62, 140, P.robleL); for (const x of [10, 33, 56]) rect(x, 144, x + 4, 147, P.robleD);
  linea(70, 150, 76, 112, K); linea(71, 150, 77, 112, P.aceroS); rect(66, 148, 80, 150, K); disco(72, 152, 3, K); disco(72, 152, 1.5, P.aceroS);
  for (const x of [246, 286, 314]) rect(x, 137, x + 2, 150, P.aceroD);
}

// el carro con la pila de libros recién hechos, en primer término a la derecha: la estructura de tubo, las ruedas y
// los libros apilados con el libro de arriba enseñando la portada del mapa
function d_imprentaDelante(R, t, o) {
  const { rect, pset, disco } = R, P = d_P, K = C.k;
  rect(266, 158, 319, 162, K); rect(267, 159, 319, 160, P.aceroL); rect(268, 162, 270, 172, P.aceroD); rect(312, 162, 314, 172, P.aceroD);
  for (const x of [269, 313]) { disco(x, 174, 3.5, K); disco(x, 174, 1.8, P.aceroS); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { const x = 270 + i * 16, y = 157 - j * 4; rect(x - 1, y - 4, x + 14, y, K); rect(x, y - 3, x + 13, y - 1, P.sepia); rect(x, y - 3, x + 13, y - 3, hex('#a83a2a')); rect(x + 13, y - 3, x + 13, y - 1, P.papel); }
  d_portada(R, 292, 128, 14, 13, 'mapa');
  return { suelo: 156, prensa: [96, 56, 236, 146], salida: [238, 128], mesaLibros: [262, 150] };
}

// la paleta de los decorados de hoy (estudio, Antártida, despacho)
const e_hoyP = Object.fromEntries(Object.entries({
  k: '#1c1222', blanco: '#f6f8fa',
  pared: '#a6c2b6', paredS: '#8eaea2', paredL: '#bcd4ca', paredR: '#98b6aa', moldura: '#f2e8d4', molduraS: '#c8b898',
  friso: '#8a5634', frisoS: '#5e3820', frisoL: '#a86e44', frisoV: '#744628',
  tabla: '#a8703e', tablaS: '#7e4e28', tablaL: '#c08650', tablaJ: '#5a3418', sol: '#e0aa6a',
  alf: '#2e4a6a', alfS: '#1e3048', alfL: '#c8a070', alfB: '#8a3a48',
  marco: '#f2ece0', marcoS: '#b8ae9c',
  cielo0: '#5a98d8', cielo1: '#78b0e4', cielo2: '#a0cbee', nubeS: '#b8c8de', nube: '#e2ecf6', nubeL: '#ffffff',
  marV: '#3a78a8', marVL: '#6aa4cc', teja: '#b8583a', tejaS: '#8a3a26', tejaL: '#d8784e', muro: '#e8d8b8', muroS: '#c4b08c',
  hoja: '#4a8a3a', hojaS: '#2e6224', hojaL: '#7ab85a', tronco: '#6a4a2a', troncoS: '#4a3018',
  cortina: '#c8a050', cortinaS: '#9a7430', cortinaL: '#e8c470',
  libro: ['#c8382e', '#2e5aa8', '#4a8a4a', '#d8a838', '#7a4a8a', '#3a7a8a', '#c86a2a', '#e4d8bc', '#5a3a2a'],
  corcho: '#c8945a', corchoS: '#a0703a', corchoL: '#dcae74',
  perg: '#e8d4a4', pergS: '#c8ae78', pergL: '#f4e6c0', pergR: '#d6bc86', tinta: '#5a3a22', tintaR: '#b84a32', tintaV: '#6a8a48', tintaA: '#3a6aa8',
  gris: '#c8ced6', grisS: '#8e98a4', grisD: '#5a6470', grisK: '#3a424e',
  laton: '#d8a838', latonS: '#9a7020', latonL: '#f4d878', verdeB: '#2e7a4a', verdeBS: '#1e5232', verdeBL: '#5aae6a',
  amarillo: '#f0c838', amarilloS: '#a8862a', rojo: '#d83a3a', rojoS: '#8a2020', luz: '#fff6d0',
  cafe: '#6a3a1e', cafeL: '#a8784a', cafeS: '#4a2410',
  // la Antártida
  pc0: '#3e78bc', pc1: '#5e98d0', pc2: '#8cbce0', pc3: '#c4dcee', pc4: '#e6eef4',
  h0: '#ffffff', h1: '#e4f2fa', h2: '#bcdcee', h3: '#8cbcdc', h4: '#5a92c0', h5: '#3a6a9a', h6: '#28507a',
  m0: '#10283e', m1: '#173654', m2: '#22486a', m3: '#2e5e84', mL: '#5a8eb4', espuma: '#dceef6',
  roca: '#4a4652', rocaL: '#6a6470', rocaS: '#2e2a36',
  r0: '#6e5a4c', r1: '#584638', r2: '#43362c', r3: '#84705c', lago: '#1e4a7a', lagoL: '#3a72a8',
  casco: '#4a2e1c', cascoL: '#6e4a2c', vela: '#efe6d0', velaS: '#c4b898',
  avion: '#d4d8e0', avionS: '#8a929e', avionR: '#d8542a', tienda: '#d8642a', tiendaS: '#a04218', tiendaL: '#f0884a',
  pant: '#0e1a14', pantL: '#5af08a', pantS: '#2a8a4a',
  // el despacho
  estuco: '#e8dcc2', estucoS: '#d6c8aa', estucoL: '#f2e8d2', nogal: '#5a3420', nogalS: '#3a2010', nogalL: '#7a4a2c', nogalV: '#4a2a18',
  moq: '#3a4a5a', moqS: '#2c3a48', moqL: '#4a5c6e', per0: '#8a2a2a', per1: '#c8a050', per2: '#2a3a6a', per3: '#e8d8b0',
  ladrillo: '#a85a3e', ladrilloS: '#7e3e2a', ladrilloL: '#c87a58', cuero: '#6a2a1a', cueroS: '#4a1a10', cueroL: '#8e4430',
  // el globo
  gMar: '#3a7aa8', gMarS: '#245a84', gMarL: '#6aa4c8', gMarD: '#173e60', gT: '#d8c08a', gTS: '#a88a56', gTL: '#ecd8a8',
  gH: '#f4f8fa', gHS: '#bcd0e0', grat: '#8ab8d8', manto: '#e07a3a', mantoS: '#b0502a',
}).map(([k, v]) => [k, Array.isArray(v) ? v.map((c) => hex(c)) : hex(v)]));

// la capa fija de cada encuadre: se pinta una sola vez en un búfer (R.nuevo) y en cada fotograma se copia entera
const e_hoyCAPAS = new WeakMap();

function e_hoyCapa(R, clave, dibuja) {
  let m = e_hoyCAPAS.get(R); if (!m) e_hoyCAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) que cambia de forma despacio con t; la recorta R.recorte
function e_hoyNube(R, x, y, w, t = 0, k = 0, P3 = null) {
  const [cS, c, cL] = P3 ?? [e_hoyP.nubeS, e_hoyP.nube, e_hoyP.nubeL];
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.14, 0.25], [0.14, -0.1, 0.2]];
  const m = (i) => 1 + 0.16 * Math.sin(t * 0.4 + i * 1.7 + k);
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w, y + dy * w + 1, r * w * m(i), cS));
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w, y + dy * w, r * w * m(i), c));
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w - 1, y + dy * w - 1, r * w * 0.6 * m(i), cL));
}

// una nube con forma (pr-cerebro, pr-gancho): 'barco' (el casco, dos velas hinchadas, el palo y el gallardete) o 'pez'
// (el cuerpo, la cola en V, la aleta, el ojo y una burbuja). Se pinta píxel a píxel con la silueta nítida y el filo
// algodonoso (el borde ondula despacio con t), en tres tonos: luz en el lomo, cuerpo y sombra en la panza, con un filo
// gris azulado que la despega del cielo y de las otras nubes. (x, y): el centro; s: escala (1: ~34 × 24 px)
function e_hoyNubeForma(R, x, y, s, forma, t) {
  const P = e_hoyP, barco = forma === 'barco';
  // ¿está (u, v) (en unidades de la forma) dentro? d > 0 dentro; el borde algodonoso suma una onda lenta
  const dentro = (u, v) => {
    const borr = 0.9 * Math.sin(u * 0.9 + v * 0.7 + t * 0.8) + 0.6 * Math.sin(u * 1.7 - v * 1.3 - t * 0.6);
    if (barco) {
      const casco = v >= 3 && v <= 10 && Math.abs(u) <= 17 - (v - 3) * 0.8;
      const vela1 = v >= -15 && v <= 1.5 && u <= -1 && u >= -1 - (v + 15) * 0.78 - Math.sin((v + 15) / 16.5 * Math.PI) * 3;
      const vela2 = v >= -11 && v <= 1.5 && u >= 2 && u <= 2 + (v + 11) * 0.95 + Math.sin((v + 11) / 12.5 * Math.PI) * 3;
      const palo = Math.abs(u - 0.5) <= 0.9 && v >= -18 && v <= 3;
      const gall = v >= -19 && v <= -16.5 && u >= 1 && u <= 6 + Math.sin(t * 3 + u) * 0.8;
      if (casco || vela1 || vela2 || palo || gall) return 1;
      // el filo algodonoso (solo alrededor del casco y de las velas)
      const near = (v >= 1.5 && v <= 12 && Math.abs(u) <= 18.5 - (v - 3) * 0.8) || (v >= -16 && v <= 2 && u >= -16 && u <= 18 && !(u > -1 && u < 2 && v < -1));
      return near && borr > 0.7 ? 0.5 : 0;
    }
    const cu = ((u - 2) / 12) ** 2 + (v / 7) ** 2;
    const cola = u <= -8 && u >= -19 && Math.abs(v) <= (-8 - u) * 0.75 && !(u < -15 && Math.abs(v) < (u + 19) * 1.2);
    const aleta = v <= -5 && v >= -10 && u >= -2 && u <= 6 && v >= -5 - (u + 2) * 0.9 && v >= -10 + (u - 4) * 2;
    const vientre = v >= 4 && v <= 9 && u >= 0 && u <= 4 && v <= 4 + (u) * 1.4;
    if (cu < 1 || cola || aleta || vientre) return 1;
    return cu < 1.18 && borr > 0.5 ? 0.5 : 0;
  };
  const W = 21, Hh = 21, ix0 = Math.floor(-W * s), ix1 = Math.ceil(W * s), iy0 = Math.floor(-Hh * s), iy1 = Math.ceil(13 * s);
  const ojo = barco ? null : [x + 8 * s, y - 1.5 * s];
  for (let j = iy0; j <= iy1; j++) for (let i = ix0; i <= ix1; i++) {
    const u = i / s, v = j / s, d = dentro(u, v);
    if (!d) { // la sombra que cae debajo y a la derecha, y el filo que la despega del cielo
      if (dentro(u - 1.2 / s, v - 2 / s)) R.pset(x + i, y + j, P.nubeS);
      else if (dentro(u, v + 1 / s) || dentro(u - 1 / s, v) || dentro(u + 1 / s, v)) R.pset(x + i, y + j, P.cielo2);
      continue; }
    const arriba = !dentro(u, v - 2 / s), abajo = !dentro(u, v + 2.2 / s), lado = !dentro(u + 1.6 / s, v);
    let c = arriba ? P.nubeL : abajo || lado ? P.nubeS : ((i * 2 + j * 3) % 9 === 0 ? P.nubeL : P.nube);
    if (d < 1) c = arriba ? P.nubeL : P.nube;
    R.pset(x + i, y + j, c);
  }
  if (barco) { // la línea de la cubierta y las costuras de las velas, en sombra
    for (let i = -15; i <= 15; i += 1) R.pset(x + Math.round(i * s), y + Math.round(5 * s), P.nubeS);
    for (let k = -12; k <= 0; k += 4) { R.pset(x + Math.round(-5 * s), y + Math.round(k * s), P.nubeS); R.pset(x + Math.round(6 * s), y + Math.round((k + 2) * s), P.nubeS); }
  } else { // el ojo, la boca, las escamas tenues, la raya de la cola y la burbuja que sube
    R.disco(ojo[0], ojo[1], 1.6 * s, P.cielo2); R.pset(Math.round(ojo[0]), Math.round(ojo[1]), P.cielo0); R.pset(Math.round(ojo[0]) - 1, Math.round(ojo[1]) - 1, P.blanco);
    R.linea(x + 13 * s, y + 1.5 * s, x + 11 * s, y + 2.5 * s, P.nubeS);
    for (let k = 0; k < 3; k++) { const ex = x + (-3 + k * 4) * s; R.pset(Math.round(ex), Math.round(y + 2 * s), P.nubeS); R.pset(Math.round(ex + s), Math.round(y + 3 * s), P.nubeS); }
    R.linea(x - 6 * s, y - 4 * s, x - 6 * s, y + 4 * s, P.nubeS);
    const f = (t * 0.35) % 1; R.disco(x + 16 * s, y - 4 * s - f * 10 * s, (1.2 + f) * s, P.nube); R.pset(Math.round(x + 15.5 * s), Math.round(y - 4.5 * s - f * 10 * s), P.nubeL);
  }
}
// el cielo de una ventana [x0, y0, x1, y1]: degradado tramado en tres tonos, nubes a tres velocidades (y las dos con
// forma si o.formas) y pájaros; deja puesto el recorte de la ventana (quien llama lo quita con R.recorte(null))
function e_hoyCieloVentana(R, x0, y0, x1, y1, t, k = 0, o = {}) {
  const P = e_hoyP, alto = y1 - y0 + 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / alto; for (let x = x0; x <= x1; x++) { const v = u * 2 + (((x + y * 3) % 4) / 4 - 0.4) * 0.5; R.pset(x, y, v < 0.7 ? P.cielo0 : v < 1.4 ? P.cielo1 : P.cielo2); } }
  R.recorte([x0, y0, x1, y1]);
  const w = x1 - x0 + 40;
  for (const [v, yy, ww, f] of [[1.1, 0.16, 20, 0], [2.2, 0.32, 14, 0.5], [3.8, 0.46, 10, 0.25]]) e_hoyNube(R, x0 - 20 + ((t * v + f * w + k * 37) % w), y0 + alto * yy, ww, t, k + f * 9);
  // las dos nubes con forma: grandes, arriba (en el cielo libre, por encima del paisaje) y por delante de las otras; derivan
  // despacio de un lado a otro sin salirse de la ventana
  if (o.formas) { const W = x1 - x0, s = Math.max(0.75, Math.min(1.05, W / 86)), dx = Math.sin(t * 0.25) * W * 0.05;
    e_hoyNubeForma(R, Math.round(x0 + W * 0.27 + dx), Math.round(y0 + 6 + 19 * s), s, 'barco', t);
    e_hoyNubeForma(R, Math.round(x0 + W * 0.73 - dx), Math.round(y0 + 6 + 11 * s + Math.sin(t * 0.7) * 1.5), s * 0.95, 'pez', t + 2); }
  const ciclo = 9, u = ((t + k * 2) % ciclo) / ciclo;
  if (Math.floor((t + k * 2) / ciclo) % 2 === 0) for (let p = 0; p < 3; p++) { const bx = Math.round(x0 - 8 + u * (x1 - x0 + 16) - p * 5), by = Math.round(y0 + 8 + p * 2 + Math.sin(t * 2 + p) * 1.5), al = Math.sin(t * 14 + p) > 0;
    R.pset(bx, by, P.k); R.pset(bx - 1, by - (al ? 1 : 0), P.k); R.pset(bx + 1, by - (al ? 1 : 0), P.k); }
}
// un árbol de copa redonda que se mece (x: el pie del tronco, suelo, alto); la copa en tres tonos con hojas sueltas
function e_hoyArbol(R, x, suelo, alto, t, k = 0) {
  const P = e_hoyP, m = Math.sin(t * 1.2 + k) * 1.4, cx = x + m, cy = suelo - alto;
  R.linea(x, suelo, x, cy + 6, P.tronco); R.linea(x + 1, suelo, x + 1, cy + 6, P.troncoS);
  const B = [[0, 0, 8], [-6, 4, 6], [6, 4, 6], [-3, -5, 6], [4, -4, 5]];
  for (const [dx, dy, r] of B) R.disco(cx + dx, cy + dy + 1, r, P.hojaS);
  for (const [dx, dy, r] of B) R.disco(cx + dx - 1, cy + dy, r - 1, P.hoja);
  for (const [dx, dy, r] of B) R.disco(cx + dx - 2, cy + dy - 2, Math.max(1, r - 4), P.hojaL);
  for (let i = 0; i < 8; i++) { const a = h(i, k, 5) * 6.28, d = 4 + h(i, k, 6) * 5; R.pset(Math.round(cx + Math.cos(a) * d + Math.sin(t * 3 + i) * 0.6), Math.round(cy + Math.sin(a) * d * 0.8), i % 2 ? P.hojaS : P.hojaL); }
}

// tablas de madera: franjas horizontales de alto variable con juntas al tresbolillo, vetas y nudos
function e_hoyTablas(R, x0, y0, x1, y1, cols, k = 0) {
  const [c, s, l, j] = cols;
  let y = y0, fila = 0;
  while (y <= y1) {
    const hh = Math.min(y1 - y + 1, 5 + Math.floor((y - y0) / 9));
    R.rect(x0, y, x1, y + hh - 1, c); R.rect(x0, y, x1, y, l); R.rect(x0, y + hh - 1, x1, y + hh - 1, s);
    for (let i = 0; i < (x1 - x0) / 5; i++) { const vx = x0 + Math.floor(h(i, fila, 40 + k) * (x1 - x0)), vy = y + 1 + Math.floor(h(i, fila, 41 + k) * Math.max(1, hh - 2)), ln = 3 + Math.floor(h(i, fila, 42) * 9); R.rect(vx, vy, Math.min(x1, vx + ln), vy, i % 3 ? s : l); }
    let x = x0 - Math.floor(h(fila, 3, 43 + k) * 60);
    while (x < x1) { x += 50 + Math.floor(h(x, fila, 44) * 30); if (x > x0 && x < x1) R.rect(x, y, x, y + hh - 1, j); }
    if (h(fila, 7, 45) > 0.5) { const nx = x0 + Math.floor(h(fila, 8, 46) * (x1 - x0)); R.pset(nx, y + (hh >> 1), j); R.pset(nx + 1, y + (hh >> 1), s); }
    y += hh; fila++;
  }
}

// una fila de libros de lomo (x0, la balda base, cuántos, semilla): alto, ancho y color variados, con la banda y el
// título como una raya dorada; devuelve la x donde acaba
function e_hoyLibros(R, x0, base, n, k, xmax = 999) {
  const P = e_hoyP; let x = x0;
  for (let i = 0; i < n && x < xmax - 3; i++) { const w = 3 + Math.floor(h(i, k, 14) * 3), hh = 11 + Math.floor(h(i, k, 15) * 7), c = P.libro[Math.floor(h(i, k, 16) * P.libro.length)];
    R.rect(x, base - hh, x + w - 1, base - 1, P.k); R.rect(x, base - hh + 1, x + w - 2, base - 1, c); R.rect(x, base - hh + 3, x + w - 2, base - hh + 3, P.k); R.rect(x, base - hh + 1, x, base - 1, P.blanco === c ? P.gris : c);
    if (w > 3) R.rect(x + 1, base - 5, x + w - 3, base - 5, P.amarillo); x += w; }
  return x;
}

// EL GLOBO TERRÁQUEO en proyección ortográfica (centro cx, cy y radio r): mares con su retícula, las tierras (América,
// África, Europa, Groenlandia), la Antártida blanca, luz arriba a la izquierda y sombra en el borde. o.lat0/o.lon0 (el
// punto que mira a la cámara), o.gira (grados/s), o.desliza 0–1 (las tierras resbalan hacia el sur), o.drake: olas
// blancas que se mueven en el paso de Drake. Devuelve proy(lon, lat) → [x, y] | null (cara oculta)
const e_hoyTIERRAS = [
  // Sudamérica
  [[-77, 8], [-72, 12], [-62, 11], [-52, 5], [-35, -5], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-65, -41], [-67, -47], [-68, -52], [-67, -55], [-71, -56], [-74, -52], [-75, -46], [-73, -38], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 1]],
  // Norteamérica y Centroamérica
  [[-77, 8], [-83, 9], [-87, 13], [-92, 15], [-97, 16], [-105, 20], [-110, 24], [-117, 32], [-124, 40], [-125, 48], [-135, 58], [-160, 60], [-165, 68], [-140, 70], [-100, 72], [-80, 70], [-65, 60], [-55, 50], [-67, 45], [-76, 35], [-80, 26], [-82, 30], [-90, 30], [-97, 26], [-97, 20], [-90, 21], [-87, 18], [-84, 15], [-80, 9]],
  // África
  [[-17, 21], [-16, 13], [-12, 8], [-5, 5], [8, 4], [9, 0], [13, -10], [12, -17], [15, -27], [18, -34], [25, -34], [32, -28], [35, -20], [40, -15], [40, -5], [51, 11], [43, 12], [33, 28], [30, 31], [10, 37], [-5, 36], [-10, 30]],
  // Europa
  [[-9, 37], [-9, 43], [-2, 44], [-1, 46], [-5, 48], [2, 51], [8, 54], [10, 57], [5, 61], [15, 69], [30, 70], [40, 66], [40, 45], [28, 41], [26, 38], [22, 37], [15, 40], [16, 38], [12, 44], [8, 44], [3, 43], [-1, 37], [-6, 36]],
  // Groenlandia
  [[-45, 60], [-20, 70], [-20, 80], [-60, 82], [-70, 77], [-55, 65]],
  // Asia
  [[40, 66], [60, 70], [80, 73], [100, 77], [140, 72], [180, 68], [170, 60], [160, 58], [142, 50], [135, 43], [128, 35], [122, 30], [120, 22], [108, 20], [105, 10], [100, 13], [98, 8], [92, 22], [80, 16], [77, 8], [72, 20], [66, 25], [57, 25], [52, 30], [48, 30], [42, 15], [44, 12], [36, 30], [40, 45]],
  // Australia
  [[114, -22], [122, -18], [131, -12], [137, -12], [142, -11], [146, -19], [153, -25], [151, -34], [146, -39], [138, -35], [131, -31], [115, -34]],
  // Cuba y La Española
  [[-85, 22], [-78, 23], [-74, 20], [-78, 20], [-84, 21]], [[-74, 19], [-69, 19], [-68, 18], [-72, 18]],
];

// la península antártica (hacia Sudamérica) y su punta
const e_hoyPENINSULA = [[-75, -73], [-68, -70], [-62, -67], [-57, -66], [-59, -68], [-63, -72], [-66, -75]];

function e_hoyEnPoligono(lon, lat, pol) {
  let dentro = false;
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) { const [xi, yi] = pol[i], [xj, yj] = pol[j]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) dentro = !dentro; }
  return dentro;
}

function e_hoyGlobo(R, cx, cy, r, t, o = {}) {
  const P = e_hoyP, D = Math.PI / 180, f0 = (o.lat0 ?? 15) * D, l0 = (o.lon0 ?? -50) + (o.gira ?? 0) * t, sl = (o.desliza ?? 0) * 22;
  const s0 = Math.sin(f0), c0 = Math.cos(f0), paso = 60 / r, rr = r * r;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    const d2 = i * i + j * j; if (d2 > rr) continue;
    const nx = i / r, ny = -j / r, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
    const lat = Math.asin(Math.max(-1, Math.min(1, nz * s0 + ny * c0))) / D;
    let lon = l0 + Math.atan2(nx, nz * c0 - ny * s0) / D; lon = ((lon + 540) % 360) - 180;
    const luz = nx * -0.5 + ny * 0.55 + nz * 0.67, borde = d2 > (r - 1.2) ** 2;
    const tl = lat + sl, tn = ((lon + sl * 0.6 + 540) % 360) - 180;
    let c;
    const hielo = tl < -71 + 3 * Math.sin(tn * D * 3) || e_hoyEnPoligono(tn, tl, e_hoyPENINSULA);
    let tierra = false; if (!hielo) for (const pol of e_hoyTIERRAS) if (e_hoyEnPoligono(tn, tl, pol)) { tierra = true; break; }
    const tr = h(i + cx, j + cy, 3) * 0.12;
    if (hielo) c = luz + tr > 0.55 ? P.gH : luz + tr > 0.2 ? P.gHS : P.h4;
    else if (tierra) c = luz + tr > 0.75 ? P.gTL : luz + tr > 0.3 ? P.gT : P.gTS;
    else {
      const gl = Math.abs(lat - Math.round(lat / 30) * 30) < paso * 0.5 || Math.abs(lon - Math.round(lon / 30) * 30) < paso * 0.5 / Math.max(0.2, Math.cos(lat * D));
      c = luz + tr > 0.8 ? P.gMarL : luz + tr > 0.3 ? (gl ? P.grat : P.gMar) : luz + tr > 0.05 ? P.gMarS : P.gMarD;
      if (o.drake && lat < -55 && lat > -67 && lon > -80 && lon < -48) { const ola = Math.sin(lon * 1.1 + lat * 2.3 + t * 5) + Math.sin(lon * 2.1 - lat * 0.7 - t * 3.3); c = ola > 1.15 ? P.espuma : ola > 0.4 ? P.gMarL : ola > -0.6 ? P.gMarS : P.gMarD; }
    }
    // con o.desliza, arriba queda al aire lo de debajo de la «corteza» (naranja tramado) con el filo de la piel
    if (sl > 0) { const cap = 90 - sl * 2.6; if (lat > cap) c = (i + j) % 3 === 0 ? P.mantoS : P.manto; else if (lat > cap - paso * 1.2) c = P.gTS; }
    if (borde) c = P.k;
    R.pset(cx + i, cy + j, c);
  }
  // el brillo del barniz arriba a la izquierda
  for (let k = 0; k < r * 0.5; k++) { const a = -2.4 + k * 0.035; R.pset(Math.round(cx + Math.cos(a) * r * 0.72), Math.round(cy + Math.sin(a) * r * 0.72), P.blanco); }
  return (lon, lat) => {
    const f = (lat - sl) * D, dl = ((lon - sl * 0.6) - l0) * D, cosc = s0 * Math.sin(f) + c0 * Math.cos(f) * Math.cos(dl);
    if (cosc < 0) return null;
    return [cx + r * Math.cos(f) * Math.sin(dl), cy - r * (c0 * Math.sin(f) - s0 * Math.cos(f) * Math.cos(dl))];
  };
}

// el enchufe de pared americano (x0, y0, ancho 10, alto 16): la placa con sus dos tomas, que parecen dos caritas
// sorprendidas (las ranuras son los ojos y la toma de tierra la boca); o.luz 0–1 lo ilumina; s: escala
function e_hoyEnchufe(R, x0, y0, s = 1, luz = 0) {
  const P = e_hoyP, w = 10 * s, hh = 16 * s;
  R.rect(x0 - 1, y0 - 1, x0 + w, y0 + hh, P.k); R.rect(x0, y0, x0 + w - 1, y0 + hh - 1, luz > 0.5 ? P.luz : P.marco);
  R.rect(x0 + w - s, y0, x0 + w - 1, y0 + hh - 1, P.marcoS); R.rect(x0, y0 + hh - s, x0 + w - 1, y0 + hh - 1, P.marcoS);
  for (const ty of [2, 9]) { const yy = y0 + ty * s; R.rect(x0 + 2 * s, yy, x0 + 7 * s, yy + 5 * s - 1, P.gris); R.rect(x0 + 2 * s, yy, x0 + 7 * s, yy, P.grisS);
    R.rect(x0 + 3 * s, yy + 1 * s, x0 + 3 * s + s - 1, yy + 3 * s - 1, P.k); R.rect(x0 + 6 * s, yy + 1 * s, x0 + 6 * s + s - 1, yy + 3 * s - 1, P.k);
    R.disco(x0 + 4.5 * s, yy + 3.6 * s, 0.6 * s + 0.3, P.k); }
  R.pset(x0 + 4 * s, y0 + 8 * s, P.grisS); R.pset(x0 + 5 * s, y0 + 8 * s, P.grisD);
  if (luz > 0) for (let k = 0; k < 10; k++) { const a = k * 0.63 + luz * 2; R.pset(Math.round(x0 + w / 2 + Math.cos(a) * (w * 0.9 + 2)), Math.round(y0 + hh / 2 + Math.sin(a) * (hh * 0.7 + 2)), P.amarillo); }
}

// la carta náutica de pared (marco x0..x1, y0..y1): pergamino con la costa, una rosa de rumbos y un barquito; sin letras
function e_hoyCartaPared(R, x0, y0, x1, y1) {
  const P = e_hoyP;
  R.rect(x0, y0, x1, y1, P.k); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.frisoL); R.rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, P.frisoS); R.rect(x1 - 2, y0 + 1, x1 - 1, y1 - 1, P.frisoS); R.rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P.laton);
  const a0 = x0 + 4, b0 = y0 + 4, a1 = x1 - 4, b1 = y1 - 4;
  for (let y = b0; y <= b1; y++) for (let x = a0; x <= a1; x++) R.pset(x, y, h(x, y, 9) > 0.86 ? P.pergR : (x + y) % 7 === 0 ? P.pergS : P.perg);
  R.recorte([a0, b0, a1, b1]);
  const rx = Math.round((a0 + a1) / 2) + 2, ry = Math.round((b0 + b1) / 2) + 2;
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; R.linea(rx, ry, rx + Math.cos(a) * 60, ry + Math.sin(a) * 60, k % 2 ? P.pergS : P.pergR); }
  for (let y = b0; y <= b1; y++) { const c = Math.round(a0 + 7 + 3 * Math.sin(y * 0.4)); for (let x = a0; x < c; x++) R.pset(x, y, P.tintaV); R.pset(c, y, P.tinta); }
  for (let x = a0; x <= a1; x++) { const c = Math.round(b0 + 5 + 2 * Math.sin(x * 0.3)); for (let y = b0; y < c; y++) if (x > a0 + 18) R.pset(x, y, P.pergR); if (x > a0 + 18) R.pset(x, c, P.tintaR); }
  R.recorte(null);
  for (let r = 1; r <= 4; r++) { R.pset(rx, ry - r, P.tintaR); R.pset(rx, ry + r, P.tintaA); R.pset(rx - r, ry, P.tintaA); R.pset(rx + r, ry, P.tintaR); }
  R.disco(rx, ry, 1.2, P.laton);
  R.linea(a1 - 10, b1 - 4, a1 - 4, b1 - 4, P.tinta); R.pset(a1 - 7, b1 - 7, P.tinta); R.linea(a1 - 7, b1 - 8, a1 - 7, b1 - 5, P.tinta); R.pset(a1 - 6, b1 - 6, P.tintaR);
}

// geometría: suelo (pies) 150–168 (por omisión 158); pared/suelo en y 138; ventana x 12–102 y 16–100 (el alféizar en y 97,
// el gato en x 30, el catalejo en x 84); el enchufe x 106–115 y 76–92; la carta enmarcada x 120–176 y 22–64; el reloj de
// barco en (202, 72); la lámpara de techo en x 196; el escritorio x 112–208 con el tablero en y 112 (el flexo en x 120, el
// globo en (142, 97) r 10, el rollo en x 176 de pie en y 112 —abierto llega a y 85—, la taza en x 200); la estantería
// x 214–270 y 50–138 (baldas en y 72, 94, 116; el platillo colgado en (236, 62)); la puerta x 274–316 y 58–138 (pomo
// x 279, y 100); libres: x 30–270 en el suelo (en x 112–208, quien esté queda delante del escritorio).
function e_hoyEstudio(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  e_hoyCapa(R, 'pr-estudio', () => {
    // el papel pintado verde mar: rayas anchas y finas y, en la parte baja, anclitas tenues; arriba a la derecha, liso
    for (let y = 0; y < 97; y++) for (let x = 0; x < 320; x++) { const m = x % 14; let c = m < 2 ? P.paredS : m === 7 ? P.paredL : P.pared;
      if (x < 262 && y > 20 && m > 3 && m < 11) { const ay = (y + ((x / 14) | 0) * 9) % 18, ax = m - 7; if ((ay === 5 && Math.abs(ax) <= 2) || (ax === 0 && ay > 3 && ay < 10) || (ay === 9 && Math.abs(ax) === 2) || (ay === 10 && Math.abs(ax) === 1)) c = P.paredR; }
      if (x > 262 && y < 50) c = (m < 2 && (x + y) % 2) ? P.paredS : P.pared;
      if (h(x, y, 3) > 0.985) c = P.paredS; pset(x, y, c); }
    rect(0, 0, 319, 4, P.moldura); rect(0, 5, 319, 5, P.molduraS); rect(0, 6, 319, 6, P.paredS);
    // el friso de madera con sus cuarterones y el zócalo
    rect(0, 97, 319, 101, P.frisoL); rect(0, 97, 319, 97, P.moldura); rect(0, 101, 319, 101, P.frisoS); rect(0, 102, 319, 137, P.friso);
    for (let x = 0; x < 320; x += 40) { rect(x + 4, 106, x + 35, 130, P.frisoS); rect(x + 5, 107, x + 35, 130, P.frisoV); rect(x + 5, 107, x + 34, 107, P.frisoS); rect(x + 5, 130, x + 35, 130, P.frisoL); rect(x + 35, 107, x + 35, 130, P.frisoL);
      for (let i = 0; i < 7; i++) { const vy = 110 + Math.floor(h(x, i, 7) * 18); rect(x + 7 + Math.floor(h(x, i, 8) * 10), vy, x + 14 + Math.floor(h(x, i, 9) * 18), vy, i % 2 ? P.frisoS : P.friso); } }
    rect(0, 132, 319, 137, P.frisoS); rect(0, 132, 319, 132, P.frisoL);
    // el suelo de tablas, la alfombra azul de dibujo de rosa de los vientos con su fleco y la mancha de sol
    e_hoyTablas(R, 0, 138, 319, 179, [P.tabla, P.tablaS, P.tablaL, P.tablaJ]);
    for (let y = 140; y < 180; y++) { const a = 22 + (y - 140) * 0.9, b = 108 + (y - 140) * 0.9; for (let x = Math.round(a); x < b; x++) if ((x + y) % 2 === 0) pset(x, y, P.sol); }
    for (let y = 150; y <= 172; y++) { const dy = (y - 161) / 11.5; const w = Math.round(84 * Math.sqrt(Math.max(0, 1 - dy * dy))); for (let x = 170 - w; x <= 170 + w; x++) { const dx = (x - 170) / 84, r = dx * dx + dy * dy;
      const rosa = Math.abs(x - 170) * 0.14 + Math.abs(y - 161) < 3 || Math.abs(x - 170) < 2 && Math.abs(y - 161) < 9;
      pset(x, y, r > 0.86 ? P.alfS : r > 0.74 ? P.alfL : r > 0.64 ? P.alf : rosa ? P.alfL : ((Math.abs(x - 170) >> 2) + (y >> 1)) % 5 === 0 ? P.alfB : P.alf); } }
    for (let x = 90; x < 252; x += 3) pset(x, 173, P.alfL);
    // la ventana: marco blanco, alféizar y el radiador con sus aletas y la llave
    rect(12, 16, 102, 98, P.k); rect(13, 17, 101, 97, P.marco); rect(13, 95, 101, 97, P.marcoS);
    rect(8, 96, 106, 100, P.k); rect(9, 97, 105, 99, P.marco); rect(9, 99, 105, 99, P.marcoS);
    rect(26, 106, 88, 128, P.k); rect(27, 107, 87, 127, P.marco); for (let x = 29; x < 86; x += 4) { rect(x, 108, x + 1, 126, P.marcoS); pset(x, 108, P.blanco); }
    rect(27, 107, 87, 108, P.blanco); rect(88, 120, 92, 122, P.grisD); disco(93, 121, 2, P.rojoS); rect(28, 129, 30, 133, P.grisD); rect(84, 129, 86, 133, P.grisD);
    // la carta náutica enmarcada y el enchufe
    e_hoyCartaPared(R, 120, 22, 176, 64);
    // la estantería: costados, baldas con sombra, el fondo de madera y lo de cada balda
    rect(212, 48, 272, 138, P.k); rect(213, 49, 271, 137, P.frisoS); rect(216, 51, 268, 136, P.frisoV);
    for (let y = 53; y < 136; y += 3) rect(216 + Math.floor(h(y, 1, 13) * 26), y, 224 + Math.floor(h(y, 2, 13) * 40), y, P.frisoS);
    rect(213, 49, 215, 137, P.frisoL); rect(269, 49, 271, 137, P.friso);
    for (const y of [72, 94, 116]) { rect(213, y, 271, y + 2, P.frisoL); rect(213, y + 3, 271, y + 3, P.k); rect(216, y + 4, 268, y + 5, P.frisoS); }
    rect(211, 46, 273, 49, P.frisoL); rect(211, 46, 273, 46, P.moldura);
    // balda 1: libros y el barco en la botella (cristal verde con brillo, el barquito dentro, el corcho y el soporte)
    e_hoyLibros(R, 217, 72, 5, 1);
    rect(240, 62, 264, 71, P.k); rect(241, 63, 263, 70, hex('#4a7a6a')); rect(241, 63, 263, 63, hex('#8ac0a8')); rect(264, 65, 266, 68, P.cafeL); rect(237, 71, 267, 71, P.frisoS);
    linea(246, 69, 258, 69, P.casco); linea(247, 70, 257, 70, P.casco); rect(251, 64, 251, 68, P.casco); rect(248, 65, 250, 67, P.vela); rect(252, 65, 254, 67, P.vela); pset(244, 64, P.blanco); pset(245, 64, P.blanco);
    // balda 2: libros tumbados, el sextante de latón y un caracol de mar
    e_hoyLibros(R, 217, 94, 4, 2);
    for (let i = 0; i < 3; i++) { rect(236, 90 - i * 3, 252 - i * 2, 92 - i * 3, P.k); rect(237, 90 - i * 3, 251 - i * 2, 91 - i * 3, P.libro[i + 3]); }
    poligono([[254, 92], [264, 92], [259, 78]], P.k); poligono([[256, 91], [262, 91], [259, 81]], P.frisoV); linea(255, 92, 263, 92, P.laton); linea(259, 80, 255, 92, P.laton); linea(259, 80, 263, 92, P.laton); disco(259, 80, 1.5, P.latonL);
    disco(266, 91, 2.5, P.marco); pset(265, 90, P.cortinaL); pset(267, 92, P.marcoS);
    // balda 3: el astrolabio sobre su peana y libros
    disco(226, 108, 6, P.k); disco(226, 108, 5, P.laton); disco(226, 108, 3, P.latonS); linea(221, 108, 231, 108, P.latonL); linea(226, 103, 226, 113, P.latonL); pset(224, 106, P.blanco); rect(222, 114, 230, 115, P.frisoS);
    e_hoyLibros(R, 236, 116, 8, 3, 268);
    // balda de abajo: cajas de archivo con sus asas
    for (let x = 217; x < 266; x += 16) { rect(x, 124, x + 14, 135, P.k); rect(x + 1, 125, x + 13, 135, hex('#c8a878')); rect(x + 1, 125, x + 13, 126, hex('#e0c898')); rect(x + 5, 129, x + 9, 130, P.cafeS); }
    // la puerta de la derecha: marco, cuarterones, pomo de latón y su sombra
    rect(274, 56, 318, 138, P.k); rect(275, 57, 317, 137, P.moldura); rect(278, 60, 314, 137, P.frisoL);
    for (const [y0, y1] of [[64, 94], [100, 132]]) { rect(282, y0, 310, y1, P.frisoS); rect(283, y0 + 1, 310, y1, P.friso); rect(283, y0 + 1, 309, y0 + 1, P.frisoS); rect(310, y0 + 1, 310, y1, P.frisoL); }
    rect(278, 60, 279, 137, P.friso); disco(283, 101, 2, P.k); disco(283, 100, 1, P.amarillo); pset(282, 99, P.blanco);
    // el escritorio: tablero con canto y vetas, la pata, la cajonera con tiradores y la sombra en el suelo
    for (let x = 110; x <= 210; x++) for (let y = 138; y <= 141; y++) if ((x + y) % 2) pset(x, y, P.tablaJ);
    rect(110, 110, 210, 116, P.k); rect(111, 111, 209, 113, P.frisoL); rect(111, 114, 209, 115, P.friso); for (let i = 0; i < 12; i++) { const vx = 112 + Math.floor(h(i, 3, 17) * 90); rect(vx, 112, vx + 6, 112, P.friso); }
    rect(114, 117, 118, 138, P.k); rect(115, 117, 117, 137, P.frisoV);
    rect(168, 117, 207, 138, P.k); rect(169, 117, 206, 137, P.friso); for (const y of [117, 124, 131]) { rect(170, y + 1, 205, y + 5, P.frisoV); rect(170, y + 1, 205, y + 1, P.frisoL); rect(184, y + 3, 191, y + 3, P.amarilloS); rect(185, y + 3, 190, y + 3, P.amarillo); }
    // el flexo verde de banquero
    rect(116, 108, 128, 110, P.k); rect(117, 108, 127, 109, P.laton); rect(121, 98, 122, 108, P.latonS);
    poligono([[113, 99], [117, 93], [127, 93], [131, 99]], P.k); poligono([[114, 98], [118, 94], [126, 94], [130, 98]], P.verdeB); linea(118, 94, 126, 94, P.verdeBL); rect(114, 98, 130, 98, P.verdeBS);
    for (let y = 100; y < 110; y++) for (let x = 114 - (y - 100) * 0.4; x < 130 + (y - 100) * 0.4; x++) if ((Math.round(x) + y * 3) % 8 === 0) pset(Math.round(x), y, P.luz);
    for (let x = 112; x < 134; x++) if (x % 2) pset(x, 111, P.luz);
    // el pie del globo: la peana de madera, el meridiano de latón (el globo gira encima, en cada fotograma)
    rect(134, 108, 150, 111, P.k); rect(135, 108, 149, 110, P.frisoL); rect(141, 104, 143, 108, P.latonS);
    // libros apilados junto a la taza
    for (let i = 0; i < 3; i++) { rect(196 - i, 106 - i * 3, 209 - i, 108 - i * 3 + 1, P.k); rect(197 - i, 106 - i * 3, 208 - i, 108 - i * 3, P.libro[i * 2]); }
  });
  // la ventana: el cielo, el mar con un velero y el faro, los tejados con chimeneas que humean y los árboles
  const W0 = 16, W1 = 98, V0 = 20, V1 = 94;
  e_hoyCieloVentana(R, W0, V0, W1, V1, t, 1, o);
  for (let y = 66; y <= 76; y++) for (let x = W0; x <= W1; x++) pset(x, y, y === 66 ? P.marVL : (x * 3 + y * 7 + Math.floor(t * 2)) % 11 === 0 ? P.marVL : P.marV);
  { const bx = Math.round(W0 + ((t * 2.5 + 30) % 100) - 10), by = 70 + Math.round(Math.sin(t * 2) * 0.6); rect(bx - 3, by, bx + 3, by + 1, P.blanco); poligono([[bx, by - 1], [bx, by - 7], [bx + 4, by - 1]], P.blanco); linea(bx, by - 8, bx, by - 1, P.casco); pset(bx - 4, by + 2, P.marVL); }
  // el faro en su cabo, con la luz que destella
  poligono([[78, 76], [86, 66], [98, 66], [98, 76]], P.hojaS); rect(88, 52, 92, 66, P.blanco); rect(88, 56, 92, 58, P.rojo); rect(88, 62, 92, 64, P.rojo); rect(87, 49, 93, 52, P.k); rect(88, 50, 92, 51, P.amarillo);
  if (Math.sin(t * 2.4) > 0.3) { for (let k = 1; k < 7; k++) { pset(88 - k * 2, 50 + (k >> 2), P.luz); pset(92 + k * 2, 50 + (k >> 2), P.luz); } disco(90, 50, 2, P.luz); }
  // los tejados de la ciudad del puerto
  for (const [x0, x1, y0, c, cs] of [[W0, 42, 80, P.teja, P.tejaS], [38, 62, 76, P.tejaL, P.teja], [60, 84, 82, P.teja, P.tejaS], [80, W1, 78, P.tejaS, P.teja]]) {
    poligono([[x0 - 2, y0 + 6], [x0 + 6, y0], [x1 - 6, y0], [x1 + 2, y0 + 6]], c); for (let x = x0; x < x1; x += 3) linea(x, y0 + 1, x - 1, y0 + 5, cs);
    rect(x0, y0 + 6, x1, V1, P.muro); rect(x1 - 2, y0 + 6, x1, V1, P.muroS); for (let x = x0 + 3; x < x1 - 4; x += 7) { rect(x, y0 + 9, x + 2, y0 + 12, P.tejaS); if (h(x, y0, Math.floor(t / 4)) > 0.6) pset(x + 1, y0 + 10, P.amarillo); } }
  rect(46, 70, 49, 76, P.tejaS); rect(46, 70, 49, 70, P.k);
  for (let k = 0; k < 6; k++) { const f = (t * 0.35 + k / 6) % 1; disco(48 + f * 8 + Math.sin(f * 6 + k) * 1.2, 68 - f * 16, 1 + f * 2, f < 0.5 ? P.nube : P.nubeS); }
  e_hoyArbol(R, 28, 94, 18, t, 1); e_hoyArbol(R, 74, 94, 14, t, 2);
  R.recorte(null);
  // el travesaño y el parteluz de la ventana, con los reflejos del cristal
  rect(56, 17, 58, 96, P.marco); rect(13, 54, 101, 56, P.marco); rect(56, 55, 58, 56, P.marcoS); rect(13, 56, 101, 56, P.marcoS);
  for (const d of [22, 64]) for (let i = 0; i < 10; i++) pset(d + i, 48 - i, P.cielo2);
  // las cortinas de lino que ondean un poco con la corriente
  for (const [x0, dir] of [[4, 1], [96, -1]]) for (let y = 12; y < 104; y++) { const w = 11 + Math.round(Math.sin(y * 0.09 + t * 1.3 + x0) * 1.2) + (y > 84 ? Math.round((y - 84) * 0.15) : 0);
    for (let i = 0; i < w; i++) { const x = dir > 0 ? x0 + i : x0 + 12 - i; pset(x, y, i % 4 === 1 ? P.cortinaS : i % 4 === 3 ? P.cortinaL : P.cortina); } }
  rect(0, 10, 112, 12, P.k); rect(1, 11, 111, 11, P.latonS); disco(1, 11, 2, P.laton); disco(111, 11, 2, P.laton);
  // el gato del alféizar y el catalejo de latón
  gato(R, 32, 96, t, { dir: 1 });
  linea(72, 95, 90, 91, P.k); linea(72, 94, 90, 90, P.laton); linea(74, 93, 84, 91, P.latonL); rect(89, 89, 91, 92, P.latonS); pset(71, 95, P.k); linea(78, 95, 76, 96, P.frisoS); linea(84, 94, 86, 96, P.frisoS);
  // el enchufe (las dos caritas)
  e_hoyEnchufe(R, 106, 76, 1, o.enchufe ?? 0);
  // el reloj de barco (latón, las agujas andan) y la lámpara de techo que se balancea con su halo
  { const cx = 202, cy = 72; disco(cx, cy, 9, P.k); disco(cx, cy, 8, P.laton); disco(cx, cy, 7, P.latonS); disco(cx, cy, 6, P.blanco);
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5), Math.round(cy + Math.sin(k * Math.PI / 6) * 5), k % 3 ? P.gris : P.k);
    const am = t * 0.1 - 1.2, as = t * 1.05 - 1.57; linea(cx, cy, Math.round(cx + Math.cos(am) * 3), Math.round(cy + Math.sin(am) * 3), P.k); linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), P.rojo); pset(cx, cy, P.k); pset(cx - 6, cy - 4, P.latonL); }
  { const a = Math.sin(t * 0.9) * 0.06, lx = Math.round(196 + Math.sin(a) * 18), ly = 18;
    linea(196, 0, lx, ly - 4, P.k); poligono([[lx - 7, ly + 2], [lx - 3, ly - 4], [lx + 3, ly - 4], [lx + 7, ly + 2]], P.k); poligono([[lx - 6, ly + 1], [lx - 3, ly - 3], [lx + 3, ly - 3], [lx + 6, ly + 1]], P.verdeB); rect(lx - 2, ly - 3, lx + 1, ly - 2, P.verdeBL);
    disco(lx, ly + 3, 2, P.luz); for (let y = ly + 4; y < ly + 14; y++) for (let x = lx - 4 - (y - ly) * 0.6; x < lx + 4 + (y - ly) * 0.6; x++) if ((Math.round(x) + y * 3) % 6 === 0) pset(Math.round(x), y, P.paredL); }
  // el globo que gira sobre su peana, con el meridiano de latón
  e_hoyGlobo(R, 142, 96, 10, t, { lat0: 10, lon0: -40, gira: o.gira ?? 8 });
  for (let k = 0; k <= 12; k++) { const a = Math.PI * (0.5 + k / 12); pset(Math.round(142 + Math.cos(a + Math.PI / 2) * 12), Math.round(96 - Math.sin(a + Math.PI / 2) * 12), P.laton); }
  pset(142, 84, P.latonL); pset(142, 108, P.latonS);
  // el platillo volante de juguete colgado de un hilo (pr-gancho)
  if (o.platillo) { const a = Math.sin(t * 1.6) * 0.18, px = Math.round(240 + Math.sin(a) * 9), py = Math.round(52 + Math.cos(a) * 9);
    linea(240, 52, px, py - 2, P.gris); disco(px, py - 1, 2.5, P.cielo2); pset(px - 1, py - 2, P.blanco); rect(px - 6, py, px + 6, py + 1, P.k); rect(px - 5, py, px + 5, py, P.gris); rect(px - 5, py + 1, px + 5, py + 1, P.grisS);
    if (Math.floor(t * 4) % 2) { pset(px - 3, py + 1, P.amarillo); pset(px + 3, py + 1, P.rojo); } else { pset(px, py + 1, P.verdeBL); } }
  // el mapa enrollado sobre la mesa (se puede desenrollar)
  if (o.rollo !== false && PIEZAS_PR.rollo) PIEZAS_PR.rollo(R, 176, 112, { abre: o.abre ?? 0 });
  else if (o.rollo !== false) { rect(160, 106, 192, 111, P.k); rect(161, 107, 191, 110, P.perg); rect(161, 107, 191, 107, P.pergL); }
  // la taza que humea y las motas en la luz de la ventana
  rect(198, 98, 204, 104, P.k); rect(199, 99, 203, 104, P.blanco); rect(204, 100, 205, 102, P.k); rect(199, 99, 203, 99, P.cafe);
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(201 + Math.sin(f * 7 + k) * 1.5), Math.round(96 - f * 10), f < 0.6 ? P.blanco : P.paredL); }
  for (let k = 0; k < 10; k++) { const f = (t * 0.05 + h(k, 1, 19)) % 1, y = 100 + Math.round(f * 50), x = Math.round(36 + h(k, 2, 19) * 60 + (y - 100) * 0.8 + Math.sin(t + k) * 2); pset(x, y, P.luz); }
  return { suelo: 158, sueloMin: 150, sueloMax: 168, mesa: { x0: 112, x1: 208, y: 112 }, rollo: [176, 112], globo: [142, 96, 10], enchufe: [106, 76, 116, 92], ventana: [12, 16, 102, 100], puerta: { x0: 278, x1: 314, y0: 60, y1: 138 }, estanteria: [212, 48, 272, 138], platillo: [240, 61] };
}

// lo de delante del estudio general: el cesto de mimbre con cartas enrolladas (izquierda) y el baúl de marinero con sus
// herrajes y una cuerda (derecha)
function e_hoyEstudioDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_hoyP;
  // las cartas enrolladas que asoman del cesto (una se mece)
  for (const [x, l, c, a, cinta] of [[5, 30, P.pergR, -4, P.rojo], [12, 40, P.perg, -1, P.tintaA], [19, 34, P.pergL, 3, P.verdeB], [24, 26, P.perg, 6, P.rojo]]) {
    const top = 156 - l, xt = x + a; for (let y = top; y <= 156; y++) { const xx = Math.round(x + (xt - x) * (156 - y) / l); rect(xx - 2, y, xx + 2, y, P.k); rect(xx - 1, y, xx, y, c); pset(xx + 1, y, P.pergS); pset(xx - 1, y, P.pergL); if (y === top + 8) rect(xx - 1, y, xx + 1, y + 1, cinta); }
    disco(xt, top, 2, P.k); disco(xt, top, 1.4, P.pergS); pset(xt, top, P.tablaS); }
  rect(0, 152, 28, 179, P.k); for (let y = 153; y < 180; y++) for (let x = 1; x < 28; x++) pset(x, y, (x + (y >> 1)) % 4 === 0 ? P.cafeL : ((x >> 1) + y) % 4 === 0 ? P.cafeS : hex('#b08850'));
  rect(0, 152, 28, 154, hex('#c8a060')); rect(24, 155, 27, 179, P.cafeS);
  // el baúl de marinero: madera con flejes de latón, la cerradura, la cuerda enrollada encima
  rect(280, 150, 319, 179, P.k); rect(281, 151, 319, 179, P.friso); rect(281, 151, 319, 156, P.frisoL); rect(281, 157, 319, 157, P.frisoS);
  for (let i = 0; i < 10; i++) { const vy = 160 + Math.floor(h(i, 2, 61) * 18), vx = 283 + Math.floor(h(i, 3, 61) * 30); rect(vx, vy, vx + 5, vy, P.frisoV); }
  for (const x of [286, 312]) { rect(x, 151, x + 2, 179, P.latonS); rect(x, 151, x, 179, P.laton); }
  rect(297, 158, 302, 164, P.k); rect(298, 159, 301, 163, P.laton); pset(299, 161, P.k); pset(298, 159, P.latonL);
  for (let k = 0; k < 3; k++) { disco(304, 147 - k, 7 - k * 2, P.k); disco(304, 147 - k, 6 - k * 2, P.corcho); disco(304, 147 - k, Math.max(1, 4 - k * 2), P.corchoS); }
  pset(301, 144, P.corchoL); pset(306, 146, P.corchoL);
  return { cesto: [0, 120, 28, 180], baul: [280, 140, 320, 180] };
}

// EL MAPA DE 1513 a nuestra manera, extendido en el trapecio (arriba x a0..a1 en y0, abajo b0..b1 en y1): pergamino con
// manchas, el marco, las líneas de rumbo de dos rosas, Sudamérica a la izquierda que abajo se tuerce hacia el este,
// España y África a la derecha, las islas del Caribe, dos barquitos y garabatos de tinta; abierto hasta la fracción ab
// (el resto enrollado en un cilindro que se mueve); la mancha de café (m 0–1) con forma de continente. Devuelve geometría
function e_hoyMapaMesa(R, a0, a1, b0, b1, y0, y1, t, ab = 1, m = 0) {
  const P = e_hoyP, H = y1 - y0;
  const xa = (v) => a0 + (b0 - a0) * v, xb = (v) => a1 + (b1 - a1) * v;
  const umax = Math.max(0.06, Math.min(1, ab));
  const mx = 0.5, my = 0.74;
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H, L = xa(v), Rr = xb(v), W = Rr - L;
    for (let x = Math.round(L); x <= Math.round(L + W * umax); x++) {
      const u = (x - L) / W;
      let c = h(x, y, 31) > 0.9 ? P.pergR : (x * 3 + y * 5) % 13 === 0 ? P.pergS : P.perg;
      // líneas de rumbo desde las dos rosas
      for (const [ru, rv] of [[0.42, 0.34], [0.66, 0.66]]) { const du = (u - ru) * W, dv = (v - rv) * H * 1.6, a = Math.atan2(dv, du), k = a / (Math.PI / 8); if (Math.abs(k - Math.round(k)) < 0.32 / Math.max(2, Math.hypot(du, dv)) * 8) c = Math.round(k) % 2 ? P.pergS : P.pergR; }
      // Sudamérica: la costa de la izquierda que abajo gira hacia el este
      const cs = 0.13 + 0.035 * Math.sin(v * 9 + 1), fondo = 0.8 - 0.2 * Math.max(0, u - 0.05);
      const sa = (v > 0.3 && u < cs) || (v > fondo && u < 0.66);
      const saCosta = !sa && ((v > 0.3 && u < cs + 0.012) || (v > fondo - 0.05 && u < 0.67));
      const af = u > 0.82 + 0.04 * Math.sin(v * 7) || (v < 0.3 && u > 0.76 - v * 0.1);
      const afCosta = !af && (u > 0.81 + 0.04 * Math.sin(v * 7) || (v < 0.3 && u > 0.75 - v * 0.1));
      const isla = [[0.22, 0.12, 0.05, 0.05], [0.33, 0.16, 0.035, 0.07], [0.28, 0.24, 0.02, 0.04], [0.4, 0.1, 0.02, 0.03]].some(([iu, iv, ru, rv]) => ((u - iu) / ru) ** 2 + ((v - iv) / rv) ** 2 < 1);
      if (sa) c = (x + y) % 5 === 0 ? P.tintaV : hex('#a8c07a'); else if (saCosta) c = P.tintaA;
      if (af) c = (x + y) % 5 === 0 ? P.tintaR : (x * 2 + y) % 7 === 0 ? hex('#c88a50') : hex('#e0a878'); else if (afCosta) c = P.tintaR;
      if (isla) c = P.tintaV;
      // garabatos de tinta (sin letras)
      if (((y - y0) % 4 === 1) && h(Math.floor(u * 18), Math.floor(v * 9), 33) > 0.82 && (x % 3) && !sa && !af) c = P.tinta;
      // la mancha de café con forma de continente
      if (m > 0) { const du = (u - mx) * W, dv = (v - my) * H * 1.7, r = Math.hypot(du, dv), an = Math.atan2(dv, du);
        const R0 = m * (13 + 4 * Math.sin(an * 3 + 1) + 2.5 * Math.sin(an * 5) + (an > 2.2 && an < 2.9 ? 6 : 0));
        if (r < R0) c = r > R0 - 1.4 ? P.cafeS : r > R0 - 3 ? P.cafe : (x + y) % 3 === 0 ? P.cafe : P.cafeL; }
      // el borde gastado del pergamino
      if (u < 0.012 || v < 0.04 || v > 0.96 || (umax >= 1 && u > 0.988)) c = P.pergS;
      R.pset(x, y, c);
    } }
  // las rosas de los vientos y los barquitos
  for (const [ru, rv] of [[0.42, 0.34], [0.66, 0.66]]) { const x = Math.round(xa(rv) + (xb(rv) - xa(rv)) * ru), y = Math.round(y0 + rv * H); if (ru > umax) continue;
    for (let r = 1; r <= 3; r++) { R.pset(x, y - r, P.tintaR); R.pset(x, y + r, P.tintaA); R.pset(x - r * 2, y, P.tintaA); R.pset(x + r * 2, y, P.tintaR); } R.disco(x, y, 1.3, P.laton); }
  for (const [bu, bv] of [[0.3, 0.5], [0.58, 0.22]]) { if (bu > umax) continue; const x = Math.round(xa(bv) + (xb(bv) - xa(bv)) * bu), y = Math.round(y0 + bv * H) + Math.round(Math.sin(t * 2 + bu * 9) * 0.6);
    R.linea(x - 3, y, x + 3, y, P.tinta); R.linea(x - 2, y + 1, x + 2, y + 1, P.tinta); R.linea(x, y - 5, x, y, P.tinta); R.rect(x + 1, y - 4, x + 2, y - 2, P.tintaR); }
  // el rollo que queda por abrir
  if (umax < 1) { for (let y = y0 - 2; y <= y1 + 2; y++) { const v = Math.max(0, Math.min(1, (y - y0) / H)), x = Math.round(xa(v) + (xb(v) - xa(v)) * umax);
    R.rect(x - 1, y, x + 5, y, P.k); R.rect(x, y, x + 1, y, P.pergL); R.rect(x + 2, y, x + 3, y, P.perg); R.pset(x + 4, y, P.pergS); }
    const xs = Math.round(xa(1) + (xb(1) - xa(1)) * umax); R.rect(xs - 1, y1 + 3, xs + 6, y1 + 4, P.tablaS); }
  const pm = [Math.round(xa(my) + (xb(my) - xa(my)) * mx), Math.round(y0 + my * H)];
  return { mancha: pm, costaTorcida: [Math.round(xa(0.82) + (xb(0.82) - xa(0.82)) * 0.3), Math.round(y0 + 0.82 * H)] };
}

// geometría: quien esté detrás del escritorio se planta con los pies en y 130 (quedan tapados por el tablero, que
// empieza en y 118) y asoma cabeza y hombros (libre en x 40–300); ventana x 12–84 y 18–96; el enchufe x 92–104 y 64–88
// (a escala 1,5); la balda x 118–200 en y 58; el corcho x 212–258 y 24–76; la librería x 268–319 desde y 52. En
// hoyDelante: el mapa x 62–244 entre y 122 y 156 (la mancha en el centro de abajo, ~(153, 147)), la taza en (266, 136),
// el globo pequeño en (292, 128) r 13, la lupa en (40, 156), el tintero en x 22.
function e_hoyMesa(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  e_hoyCapa(R, 'pr-mesa', () => {
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const m = (x + 4) % 20; let c = m < 3 ? P.paredS : m === 10 ? P.paredL : P.pared;
      if (x < 260 && y > 16 && m > 4 && m < 16) { const ay = (y + (((x + 4) / 20) | 0) * 11) % 24, ax = m - 10; if ((ay === 7 && Math.abs(ax) <= 3) || (ax === 0 && ay > 4 && ay < 14) || (ay === 13 && Math.abs(ax) === 3) || (ay === 14 && Math.abs(ax) <= 2 && ax !== 0)) c = P.paredR; }
      if (x > 262 && y < 50) c = (m < 3 && (x + y) % 2) ? P.paredS : P.pared;
      if (h(x, y, 4) > 0.985) c = P.paredS; pset(x, y, c); }
    rect(0, 0, 319, 3, P.moldura); rect(0, 4, 319, 4, P.molduraS);
    rect(0, 96, 319, 100, P.frisoL); rect(0, 96, 319, 96, P.moldura); rect(0, 101, 319, 119, P.friso); rect(0, 101, 319, 101, P.frisoS);
    for (let x = 6; x < 320; x += 52) { rect(x, 104, x + 44, 119, P.frisoS); rect(x + 1, 105, x + 44, 119, P.frisoV); rect(x + 1, 105, x + 43, 105, P.frisoS); for (let i = 0; i < 4; i++) { const vy = 108 + Math.floor(h(x, i, 27) * 10); rect(x + 4 + Math.floor(h(x, i, 28) * 10), vy, x + 14 + Math.floor(h(x, i, 29) * 24), vy, P.frisoS); } }
    // la ventana grande con su marco y el alféizar
    rect(10, 18, 86, 96, P.k); rect(11, 19, 85, 95, P.marco); rect(6, 94, 90, 99, P.k); rect(7, 95, 89, 98, P.marco); rect(7, 98, 89, 98, P.marcoS);
    // el corcho con postales de barcos, una rosa de los vientos y una foto de témpanos
    rect(210, 22, 260, 78, P.k); rect(211, 23, 259, 77, P.frisoL); rect(214, 26, 256, 74, P.corcho);
    for (let i = 0; i < 120; i++) pset(214 + Math.floor(h(i, 1, 21) * 43), 26 + Math.floor(h(i, 2, 21) * 49), i % 2 ? P.corchoS : P.corchoL);
    rect(217, 29, 233, 42, P.blanco); rect(218, 30, 232, 37, P.cielo1); rect(218, 37, 232, 41, P.marV); poligono([[222, 37], [225, 31], [225, 37]], P.blanco); rect(221, 37, 229, 38, P.casco); disco(225, 29, 1, P.rojo);
    rect(238, 30, 254, 46, P.perg); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(246, 38, 246 + Math.cos(a) * 6, 38 + Math.sin(a) * 6, k % 2 ? P.tintaA : P.tintaR); } disco(246, 38, 1, P.laton); disco(246, 30, 1, P.azul ?? P.tintaA);
    rect(218, 50, 236, 68, P.blanco); rect(219, 51, 235, 60, P.pc2); rect(219, 60, 235, 67, P.m2); poligono([[221, 60], [224, 55], [229, 55], [233, 60]], P.h1); rect(221, 60, 233, 61, P.h3); disco(227, 50, 1, P.verdeBL);
    rect(240, 54, 254, 70, P.amarillo); for (let y = 58; y < 68; y += 3) rect(242, y, 250 + (y % 4), y, P.grisD); disco(247, 54, 1, P.rojo);
    // la balda de pared: el barco en botella, el reloj de arena, un caracol y un tarro de lápices
    rect(116, 58, 202, 60, P.k); rect(117, 58, 201, 59, P.frisoL); for (const x of [124, 194]) { linea(x, 61, x - 4, 66, P.k); rect(x - 1, 61, x, 62, P.frisoS); }
    for (let x = 117; x < 202; x++) pset(x, 61, P.paredS);
    rect(122, 44, 158, 57, P.k); rect(123, 45, 157, 56, hex('#4a7a6a')); rect(123, 45, 157, 45, hex('#8ac0a8')); rect(158, 48, 162, 53, P.cafeL); rect(119, 57, 161, 57, P.frisoS);
    linea(128, 54, 150, 54, P.casco); linea(130, 55, 148, 55, P.casco); rect(139, 46, 139, 53, P.casco); rect(133, 47, 138, 52, P.vela); rect(140, 47, 145, 52, P.vela); rect(133, 52, 145, 52, P.velaS); pset(126, 46, P.blanco); pset(127, 46, P.blanco);
    rect(170, 40, 182, 41, P.frisoS); rect(170, 56, 182, 57, P.frisoS); rect(171, 42, 171, 55, P.frisoV); rect(181, 42, 181, 55, P.frisoV);
    disco(186 + 6, 54, 3, P.marco); pset(191, 53, P.cortinaL);
    rect(194, 48, 200, 57, P.k); rect(195, 49, 199, 57, P.alf); linea(196, 48, 195, 42, P.amarillo); linea(198, 48, 199, 43, P.rojo); linea(197, 48, 197, 41, P.verdeB);
    // la librería que asoma a la derecha
    rect(266, 52, 319, 120, P.k); rect(267, 53, 319, 119, P.frisoV);
    for (const y of [76, 100]) { rect(267, y, 319, y + 2, P.frisoL); rect(267, y + 3, 319, y + 3, P.k); }
    e_hoyLibros(R, 270, 76, 12, 5, 318); e_hoyLibros(R, 270, 100, 12, 6, 318); e_hoyLibros(R, 270, 119, 12, 7, 318);
    rect(267, 53, 269, 119, P.frisoL);
    // el escritorio vacío: si la escena no llama a hoyDelante, la pantalla queda llena igual
    e_hoyMesaTablero(R);
  });
  e_hoyCieloVentana(R, 13, 21, 83, 93, t, 2, o);
  for (let y = 70; y <= 80; y++) for (let x = 13; x <= 83; x++) pset(x, y, y === 70 ? P.marVL : (x * 3 + y * 7 + Math.floor(t * 2)) % 11 === 0 ? P.marVL : P.marV);
  for (const [x0, x1, y0, c, cs] of [[13, 40, 82, P.teja, P.tejaS], [36, 62, 78, P.tejaL, P.teja], [60, 83, 84, P.teja, P.tejaS]]) {
    poligono([[x0 - 2, y0 + 6], [x0 + 6, y0], [x1 - 6, y0], [x1 + 2, y0 + 6]], c); for (let x = x0; x < x1; x += 3) linea(x, y0 + 1, x - 1, y0 + 5, cs); rect(x0, y0 + 6, x1, 93, P.muro); rect(x1 - 2, y0 + 6, x1, 93, P.muroS); }
  e_hoyArbol(R, 70, 93, 20, t, 3);
  R.recorte(null);
  rect(46, 19, 48, 95, P.marco); rect(11, 56, 85, 58, P.marco); rect(11, 58, 85, 58, P.marcoS); for (let i = 0; i < 14; i++) { pset(18 + i, 50 - i, P.cielo2); pset(54 + i, 90 - i, P.cielo2); }
  gato(R, 26, 94, t, { dir: 1 });
  e_hoyEnchufe(R, 92, 64, 1.5, o.enchufe ?? 0);
  // el reloj de arena de la balda, que cae
  { const f = (t / 12) % 1; poligono([[172, 42], [180, 42], [176, 49]], P.cielo2); poligono([[176, 49], [172, 55], [180, 55]], P.cielo2);
    poligono([[173 + f * 3, 43 + f * 5], [179 - f * 3, 43 + f * 5], [176, 48]], P.amarillo); poligono([[176, 55 - f * 4], [173, 55], [179, 55]], P.amarillo); pset(176, 49 + (Math.floor(t * 8) % 5), P.amarilloS); }
  // la luz de la lámpara de techo, que se balancea fuera de cuadro: un halo que va y viene por la pared
  { const lx = Math.round(150 + Math.sin(t * 0.9) * 8); for (let y = 5; y < 36; y++) for (let x = lx - 30 + y; x < lx + 30 - y; x++) if ((x + y * 2) % 5 === 0) pset(x, y, P.paredL); }
  return { suelo: 130, detras: [40, 300], mapa: [62, 122, 244, 156], taza: [266, 136], globo: [292, 128, 13], enchufe: [92, 64, 107, 88], ventana: [10, 18, 86, 96] };
}
// lo de delante de la mesa de cerca: el tablero con vetas, el frente con cajones, el mapa desplegado (o.mapa, o.mancha),
// el flexo verde con su cono, el tintero y la pluma, la lupa, el globo pequeño que gira y la taza que humea
function e_hoyMesaDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP, mm = Math.max(0, Math.min(1, o.mancha ?? 0));
  e_hoyMesaTablero(R);
  // el cono de luz del flexo sobre la mesa
  for (let y = 118; y < 158; y++) for (let x = 6 + (y - 118) * 0.2; x < 70 + (y - 118) * 1.3; x++) if ((Math.round(x) + y) % 2 === 0) pset(Math.round(x), y, P.tablaL);
  // el mapa desplegado
  const sombra = (x0, x1, y) => { for (let x = x0; x <= x1; x++) pset(x, y, P.frisoS); };
  const ab = o.mapa ?? 1; sombra(64, Math.round(62 + 184 * Math.max(0.06, Math.min(1, ab))), 157);
  const g = e_hoyMapaMesa(R, 70, 236, 60, 246, 122, 156, t, ab, mm);
  // el flexo verde de banquero
  rect(8, 146, 34, 150, P.k); rect(9, 146, 33, 149, P.laton); rect(9, 146, 33, 146, P.latonL); rect(20, 124, 22, 146, P.latonS); rect(20, 124, 20, 146, P.latonL);
  poligono([[4, 126], [12, 114], [32, 114], [40, 126]], P.k); poligono([[5, 125], [13, 115], [31, 115], [39, 125]], P.verdeB); linea(13, 116, 31, 116, P.verdeBL); rect(5, 124, 39, 125, P.verdeBS); rect(14, 126, 30, 127, P.luz);
  // el tintero con la pluma y la lupa
  rect(16, 132, 30, 142, P.k); rect(17, 133, 29, 142, hex('#2a3a5a')); rect(17, 133, 29, 134, hex('#4a5a7a')); rect(20, 130, 26, 132, P.k); pset(19, 135, P.blanco);
  for (let k = 0; k < 12; k++) { const x = 24 + k, y = 130 - k * 2; pset(x, y, k > 4 ? P.blanco : P.k); pset(x + 1, y, k > 4 ? P.gris : P.k); if (k > 5) pset(x - 1, y + 1, P.gris); }
  if (PIEZAS_PR.lupa) PIEZAS_PR.lupa(R, 44, 158, { s: 1 });
  // la taza que humea (y la gota que cae si hay mancha)
  rect(256, 126, 274, 144, P.k); rect(257, 127, 273, 144, P.blanco); rect(269, 127, 273, 144, P.gris); rect(257, 127, 273, 128, P.cafe); rect(274, 131, 278, 139, P.k); rect(275, 132, 277, 138, P.blanco);
  rect(256, 144, 274, 145, P.frisoS);
  for (let k = 0; k < 4; k++) { const f = (t * 0.5 + k / 4) % 1; for (let j = 0; j < 3; j++) pset(Math.round(265 + Math.sin(f * 6 + k + j) * 2), Math.round(124 - f * 18 - j), f < 0.6 ? P.blanco : P.paredL); }
  if (mm > 0 && mm < 0.95) { const f = (t * 1.2) % 1; disco(258 - f * 30, 140 + f * 6, 1, P.cafe); }
  // el compás de puntas de latón, tumbado junto al mapa, y dos cartas lacradas con un lápiz abajo a la derecha
  linea(247, 155, 262, 147, P.k); linea(247, 154, 261, 147, P.latonL); linea(250, 156, 262, 148, P.k); linea(250, 155, 261, 148, P.laton); disco(262, 147, 1.6, P.latonS); pset(262, 146, P.blanco);
  pset(246, 155, P.grisD); pset(249, 156, P.grisD);
  rect(266, 151, 292, 157, P.k); rect(267, 151, 291, 156, P.perg); linea(267, 151, 279, 154, P.pergS); linea(291, 151, 279, 154, P.pergS); disco(279, 154, 1.4, P.rojo); pset(278, 153, P.cortinaL);
  rect(270, 152, 294, 153, P.k); rect(271, 152, 293, 152, P.blanco);
  linea(298, 157, 317, 153, P.k); linea(298, 156, 316, 152, P.amarillo); pset(317, 152, P.grisD); pset(297, 156, P.rojo);
  // el globo pequeño que gira, con su meridiano y la peana
  e_hoyGlobo(R, 296, 128, 13, t, { lat0: -20, lon0: -60, gira: o.gira ?? 8 });
  for (let k = 0; k <= 16; k++) { const a = Math.PI * (0.5 + k / 16); pset(Math.round(296 + Math.cos(a + Math.PI / 2) * 15), Math.round(128 - Math.sin(a + Math.PI / 2) * 15), P.laton); }
  rect(294, 141, 298, 146, P.latonS); rect(286, 146, 306, 150, P.k); rect(287, 146, 305, 149, P.frisoL); rect(287, 146, 305, 146, P.tablaL);
  return { mesa: { y: 118, frente: 158 }, mancha: g.mancha, costaTorcida: g.costaTorcida, mapa: [62, 122, 244, 156] };
}
// UN BERGANTÍN DE 1820 (x: el centro, y: la línea de flotación, s: escala): casco de madera con su franja, dos palos con
// velas cuadradas hinchadas, el foque, la jarcia, el gallardete que ondea y dos marineros diminutos; cabecea con t
function e_hoyVelero(R, x, y, t, s = 1) {
  const P = e_hoyP, cb = Math.sin(t * 1.3) * 0.9, by = y + Math.round(Math.sin(t * 1.1) * 0.8);
  const X = (dx) => Math.round(x + dx * s), Y = (dy) => Math.round(by + dy * s);
  // el casco
  R.poligono([[X(-17), Y(-5)], [X(15), Y(-5)], [X(20), Y(-8)], [X(16), Y(1)], [X(-14), Y(1)], [X(-18), Y(-7)]], P.k);
  R.poligono([[X(-16), Y(-4)], [X(15), Y(-4)], [X(18), Y(-7)], [X(15), Y(0)], [X(-13), Y(0)], [X(-17), Y(-6)]], P.casco);
  R.linea(X(-16), Y(-4), X(16), Y(-4), P.cascoL); R.linea(X(-14), Y(-2), X(15), Y(-2), P.vela); for (let i = -10; i <= 10; i += 4) R.pset(X(i), Y(-2), P.k);
  R.linea(X(18), Y(-7), X(28), Y(-11), P.casco);
  // los palos y las velas (tres por palo), hinchadas por el viento
  for (const [mx, alto] of [[-6, 34], [7, 38]]) {
    const top = Y(-4 - alto), px = X(mx) + Math.round(cb * (alto / 38));
    R.linea(X(mx), Y(-4), px, top, P.k);
    for (const [y0, y1, w] of [[0.22, 0.48, 9], [0.5, 0.72, 8], [0.74, 0.92, 6]]) {
      const ya = Math.round(Y(-4) - alto * s * (1 - y0)), yb = Math.round(Y(-4) - alto * s * (1 - y1)), ww = w * s, cx = Math.round(X(mx) + cb * (1 - y0));
      R.rect(cx - ww, ya, cx + ww, ya, P.casco);
      for (let yy = ya + 1; yy <= yb; yy++) { const u = (yy - ya) / Math.max(1, yb - ya), panza = Math.round(Math.sin(u * Math.PI) * 2 + Math.sin(t * 2 + mx) * 0.6);
        for (let xx = cx - ww + panza; xx <= cx + ww + panza; xx++) R.pset(xx, yy, xx > cx + ww * 0.4 + panza ? P.velaS : P.vela); R.pset(cx - ww + panza - 1, yy, P.k); R.pset(cx + ww + panza + 1, yy, P.k); }
    }
    // el gallardete
    for (let k = 0; k < 6; k++) R.pset(px - k, top + Math.round(Math.sin(t * 6 - k * 0.9) * 1), k < 3 ? P.rojo : P.blanco);
  }
  // el foque y la jarcia
  R.poligono([[X(9), Y(-38)], [X(26), Y(-11)], [X(11), Y(-10)]], P.velaS); R.linea(X(9), Y(-38), X(26), Y(-11), P.k);
  R.linea(X(-6), Y(-38), X(-17), Y(-6), P.grisK); R.linea(X(7), Y(-42), X(-6), Y(-38), P.grisK); R.linea(X(7), Y(-42), X(16), Y(-6), P.grisK);
  // dos marineros diminutos en cubierta
  for (const mx of [-11, 1]) { R.rect(X(mx), Y(-8), X(mx) + 1, Y(-5), P.tintaA); R.pset(X(mx), Y(-9), hex('#e8b890')); }
  // la espuma del casco
  for (let k = -18; k <= 18; k += 2) if (Math.sin(t * 4 + k) > 0) R.pset(X(k), Y(1) + 1, P.espuma);
  return [X(0), Y(0)];
}

// un témpano (x: centro, y: flotación, w, alto, tipo 'tabla' | 'agujas'): la parte de arriba en blancos y azules con su
// sombra, el borde mordido, la parte sumergida en cian bajo el agua y la espuma que lo rodea
function e_hoyTempano(R, x, y, w, alto, tipo, t, k = 0) {
  const P = e_hoyP;
  // la parte sumergida (más ancha y verdosa) y su reflejo
  for (let j = 1; j < alto * 0.8; j++) { const ww = w * (1.15 - j / (alto * 1.2)); for (let i = -ww; i <= ww; i++) if ((Math.round(i) + j) % 2 === 0) R.pset(Math.round(x + i), y + j, j < alto * 0.3 ? P.h4 : P.m3); }
  const perfil = (i) => tipo === 'tabla' ? alto * (1 - 0.18 * Math.abs(i / w) ** 6) - (h(Math.round(i / 3), k, 51) > 0.8 ? 2 : 0) : alto * (0.35 + 0.65 * Math.max(0, Math.cos(i / w * 2.4) * Math.abs(Math.cos(i / w * 5.2 + k)))) ;
  for (let i = -w; i <= w; i++) { const top = Math.round(y - perfil(i)), luz = i < w * 0.25;
    for (let yy = top; yy <= y; yy++) { const d = yy - top; let c;
      if (d < 2) c = P.h0; else if (tipo === 'tabla' && d < 4) c = P.h1; else c = luz ? ((i + yy) % 7 === 0 ? P.h2 : P.h1) : (i % 3 === 0 ? P.h3 : P.h2);
      if (tipo === 'tabla' && d > 4 && (i * 7 + d * 3) % 17 === 0) c = P.h3;
      if (yy > y - 2) c = P.h3; R.pset(x + i, yy, c); }
    R.pset(x + i, top - 1, P.k); }
  R.linea(x - w - 1, y, x - w - 1, Math.round(y - perfil(-w)), P.k); R.linea(x + w + 1, y, x + w + 1, Math.round(y - perfil(w)), P.k);
  for (let i = -w - 3; i <= w + 3; i++) if (Math.sin(t * 3 + i * 0.7 + k) > 0.2) R.pset(x + i, y + 1, P.espuma);
}

// un pingüino diminuto (x, y: los pies), de 3 × 5, que se balancea al andar; quieto si a es 0
function e_hoyPinguino(R, x, y, t, a = 1, k = 0) {
  const P = e_hoyP, b = a ? Math.round(Math.sin(t * 8 + k)) : 0;
  R.rect(x + b, y - 5, x + 2 + b, y - 1, P.k); R.rect(x + 1 + b, y - 4, x + 2 + b, y - 1, P.blanco); R.pset(x + 3 + b, y - 4, P.amarillo); R.pset(x + b, y, P.amarillo); R.pset(x + 2 + b, y, P.amarillo);
}

// geometría: la placa de hielo de primer plano donde se plantan los pies: x 0–186, suelo 160 (de 154 a 170); el horizonte
// del mar en y 96 (el frente de hielo de la costa entre y 74 y 96); el témpano tabular en x 42–98 (flotación y 116), el de
// agujas en x 238–270 (flotación y 124); el barco en o.barcoX (por omisión 214 − 1,2·t), con la flotación en y 132;
// los pingüinos en el témpano pequeño x 130–160 (y 128); la ballena sopla en x 292, y 112; libres: x 10–180 en la placa.
function e_hoyAntartida(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  e_hoyCapa(R, 'pr-antartida', () => {
    // el cielo polar tramado en cinco tonos
    for (let y = 0; y < 100; y++) { const u = y / 96; for (let x = 0; x < 320; x++) { const v = u * 4 + (((x + y * 3) % 4) / 4 - 0.4) * 0.6; pset(x, y, v < 0.9 ? P.pc0 : v < 1.8 ? P.pc1 : v < 2.7 ? P.pc2 : v < 3.5 ? P.pc3 : P.pc4); } }
    // la cordillera nevada con la sombra azul de las laderas y peñascos de roca
    const cumbre = (x) => 58 + 9 * Math.sin(x * 0.031) + 6 * Math.sin(x * 0.083 + 2) + 3 * Math.sin(x * 0.21) + (x > 240 ? (x - 240) * 0.22 : 0);
    for (let x = 0; x < 320; x++) { const c = cumbre(x), dc = cumbre(x + 1) - c;
      for (let y = Math.round(c); y < 86; y++) { const d = y - c; let col = dc > 0 ? (d < 2 ? P.h2 : P.h3) : (d < 2 ? P.h0 : P.h1);
        // canales de roca en las laderas de sombra, en diagonal, y algún peñasco bajo las cumbres
        if (dc > 0.25 && d > 3 && d < 16 && (x * 2 + y) % 9 < 2 && h(x >> 3, 1, 52) > 0.35) col = (y % 2) ? P.roca : P.h4;
        if (dc < -0.5 && d > 5 && d < 10 && h(x >> 2, 2, 52) > 0.7) col = (x + y) % 2 ? P.rocaL : P.roca;
        if (y > 78) col = (x + y) % 3 === 0 ? P.h3 : P.h2; pset(x, y, col); }
      pset(x, Math.round(c) - 1, P.h3); }
    // el frente de hielo de la costa: arriba la nieve, la pared con estrías en varios azules, cuevas y la base
    const borde = (x) => 76 + 2 * Math.sin(x * 0.07) + (h(x >> 3, 1, 53) > 0.75 ? 2 : 0);
    for (let x = 0; x < 320; x++) { const b = Math.round(borde(x));
      for (let y = b; y <= 96; y++) { const d = y - b; let c = d < 2 ? P.h0 : (x % 5 === 0 || (x * 3 + 1) % 11 === 0) ? P.h3 : (x % 2 ? P.h1 : P.h2);
        if (d > 10) c = (x % 4 === 0) ? P.h4 : P.h3; if (h(x >> 2, 9, 54) > 0.88 && d > 8) c = P.h5; pset(x, y, c); }
      pset(x, b - 1, P.h2); }
    // el mar oscuro: más claro hacia el horizonte, con rayas de oleaje
    for (let y = 97; y < 180; y++) { const u = (y - 97) / 83; for (let x = 0; x < 320; x++) { const v = u * 3 + (((x + y * 2) % 4) / 4 - 0.4) * 0.5;
      let c = v < 0.7 ? P.m3 : v < 1.6 ? P.m2 : v < 2.4 ? P.m1 : P.m0; if (((x * 7 + y * 13) % 23 === 0) && h(x >> 3, y, 55) > 0.5) c = P.mL; pset(x, y, c); } }
    for (let x = 0; x < 320; x++) pset(x, 97, P.h4);
    // la placa de hielo de primer plano: la superficie con sombras azules y la nieve, y su canto
    const placa = (x) => 154 + 2 * Math.sin(x * 0.05) - (x > 150 ? (x - 150) * 0.05 : 0);
    for (let x = 0; x < 192; x++) { const top = Math.round(placa(x)), fin = x < 178 ? 180 : 180 - (x - 178) * 3;
      for (let y = top; y < Math.min(180, fin); y++) { const d = y - top; let c = d < 1 ? P.h0 : (h(x >> 1, y >> 1, 56) > 0.8 ? P.h2 : (x + y * 3) % 9 === 0 ? P.h2 : P.h1);
        if (x > 170 && d > 3) c = (x + y) % 3 ? P.h3 : P.h4; pset(x, y, c); }
      pset(x, top - 1, P.h3); }
    for (let i = 0; i < 14; i++) { const x = Math.floor(h(i, 2, 57) * 170), y = 160 + Math.floor(h(i, 3, 57) * 18); linea(x, y, x + 5 + Math.floor(h(i, 4, 57) * 8), y, P.h2); pset(x, y - 1, P.h0); }
    // huellas en la nieve y un trineo de madera con su caja
    for (let k = 0; k < 8; k++) { pset(20 + k * 9, 172 - k, P.h3); pset(23 + k * 9, 174 - k, P.h3); }
    rect(140, 160, 162, 161, P.casco); rect(142, 155, 160, 159, P.k); rect(143, 156, 159, 158, P.cascoL); linea(138, 158, 140, 161, P.casco); linea(162, 161, 166, 157, P.casco);
  });
  // las nubes de tres tonos a tres velocidades y los petreles que planean
  for (const [v, y, w, f] of [[1.2, 18, 24, 0], [2.4, 32, 16, 0.4], [3.6, 44, 12, 0.7]]) for (let n = 0; n < 2; n++) e_hoyNube(R, ((t * v + f * 360 + n * 180) % 360) - 20, y + n * 4, w, t, f * 7 + n, [P.pc3, P.pc4, P.blanco]);
  for (let p = 0; p < 4; p++) { const bx = Math.round(((t * 6 + p * 70) % 360) - 20), by = Math.round(48 + p * 5 + Math.sin(t * 0.8 + p) * 3), al = Math.sin(t * 3 + p) > 0.3;
    if (bx > 270 && by < 46) continue; pset(bx, by, P.k); pset(bx - 1, by - (al ? 1 : 0), P.k); pset(bx + 1, by - (al ? 1 : 0), P.k); pset(bx - 2, by - (al ? 1 : 0), P.grisD); pset(bx + 2, by - (al ? 1 : 0), P.grisD); }
  // el oleaje que brilla
  for (let k = 0; k < 70; k++) { const x = Math.round((h(k, 1, 58) * 340 + t * (4 + (k % 3) * 2)) % 340) - 10, y = 100 + Math.floor(h(k, 2, 58) * 78); if (x < 186 && y > 150) continue;
    if (Math.sin(t * 2.5 + k) > -0.2) linea(x, y, x + 2 + (k % 3), y, y < 120 ? P.mL : P.m3); }
  // los témpanos que derivan
  e_hoyTempano(R, Math.round(70 + t * 0.4), 116, 28, 16, 'tabla', t, 1);
  e_hoyTempano(R, Math.round(254 - t * 0.3), 124, 16, 26, 'agujas', t, 2);
  e_hoyTempano(R, Math.round(196 + t * 0.6), 108, 7, 5, 'tabla', t, 3);
  // el témpano pequeño con los pingüinos (uno se zambulle y vuelve a salir)
  e_hoyTempano(R, 145, 130, 15, 5, 'tabla', t, 4);
  for (let p = 0; p < 4; p++) e_hoyPinguino(R, 134 + p * 6 + Math.round(Math.sin(t * 0.7 + p) * 1.5), 125 + (p % 2), t, p % 2, p);
  { const f = (t % 6) / 6; if (f < 0.4) { const u = f / 0.4, px = Math.round(158 + u * 14), py = Math.round(124 - Math.sin(u * Math.PI) * 8 + u * 10); if (py < 133) e_hoyPinguino(R, px, py, t, 0); else for (let k = 0; k < 4; k++) pset(px - 2 + k, 133 - (k % 2), P.espuma); } }
  // el soplo de la ballena
  { const f = (t % 7) / 7; if (f < 0.25) { const u = f / 0.25; for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * 0.18; pset(Math.round(292 + Math.cos(a) * u * 10), Math.round(112 + Math.sin(a) * u * 12), u < 0.7 ? P.blanco : P.pc3); } rect(286, 113, 298, 114, P.m0); pset(287, 113, P.mL); } }
  // el bergantín de 1820
  let barco = null; if (o.barco !== false) barco = e_hoyVelero(R, o.barcoX ?? Math.round(214 - t * 1.2), 132, t, 1);
  // copos que caen despacio
  if (o.nieva !== false) for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 1, 59) * 330 + Math.sin(t * 0.7 + k) * 6 - t * 3) % 330 + 330) % 330 - 5, y = Math.round((h(k, 2, 59) * 190 + t * (8 + (k % 4) * 3)) % 190) - 5;
    if (x > 274 && y < 48) continue; if (x < 172 && y < 20) continue; pset(x, y, k % 3 ? P.blanco : P.h1); }
  return { suelo: 160, sueloMin: 154, sueloMax: 170, placa: [0, 186], horizonte: 96, barco, tempanos: [[42, 98, 116], [238, 270, 124]], pinguinos: [130, 160, 128], ballena: [292, 112] };
}

// lo de delante de la Antártida: un bloque de hielo que flota en primer plano, abajo a la derecha, y su espuma
function e_hoyAntartidaDelante(R, t, o) {
  const P = e_hoyP, by = 172 + Math.round(Math.sin(t * 1.4) * 1.2), bx = 296 + Math.round(Math.sin(t * 0.6) * 2);
  R.poligono([[bx - 26, by + 2], [bx - 20, by - 9], [bx - 6, by - 13], [bx + 10, by - 10], [bx + 26, by - 4], [bx + 30, by + 2]], P.k);
  R.poligono([[bx - 24, by + 1], [bx - 19, by - 8], [bx - 6, by - 12], [bx + 9, by - 9], [bx + 25, by - 3], [bx + 28, by + 1]], P.h1);
  R.poligono([[bx - 6, by - 12], [bx + 9, by - 9], [bx + 25, by - 3], [bx + 28, by + 1], [bx + 2, by + 1]], P.h3);
  R.linea(bx - 18, by - 8, bx - 6, by - 11, P.h0); R.linea(bx - 4, by - 6, bx + 6, by - 4, P.h2);
  for (let y = by + 2; y < 180; y++) for (let x = bx - 26; x < 320; x++) if ((x + y) % 2 === 0) R.pset(x, y, P.h5);
  for (let k = -28; k < 32; k += 2) if (Math.sin(t * 3 + k * 0.5) > 0) R.pset(bx + k, by + 2, P.espuma);
  return { bloque: [bx - 26, by - 13, 320, 180] };
}

// UN AVIÓN DE ESQUÍS con radar (x: el centro, y: el fuselaje), de lado: fuselaje gris con la franja naranja, ala alta con
// dos motores y las hélices que giran, la cola alta, los esquís y la antena del radar debajo
function e_hoyAvion(R, x, y, t) {
  const P = e_hoyP, { rect, pset, linea, poligono, disco } = R;
  poligono([[x - 18, y - 2], [x + 12, y - 3], [x + 18, y], [x + 12, y + 3], [x - 16, y + 3], [x - 22, y - 1]], P.k);
  poligono([[x - 17, y - 1], [x + 12, y - 2], [x + 16, y], [x + 12, y + 2], [x - 15, y + 2], [x - 20, y - 1]], P.avion);
  linea(x - 17, y + 2, x + 12, y + 2, P.avionS); linea(x - 14, y, x + 10, y, P.avionR);
  for (let i = -10; i <= 6; i += 3) pset(x + i, y - 1, P.grisK); rect(x + 12, y - 2, x + 14, y - 1, P.cielo2);
  poligono([[x - 22, y - 1], [x - 24, y - 10], [x - 19, y - 10], [x - 16, y - 2]], P.k); poligono([[x - 21, y - 2], [x - 23, y - 9], [x - 20, y - 9], [x - 17, y - 2]], P.avionR);
  rect(x - 8, y - 4, x + 8, y - 3, P.k); rect(x - 7, y - 4, x + 7, y - 4, P.avionS);
  for (const ex of [-3, 4]) { rect(x + ex, y - 3, x + ex + 3, y - 1, P.grisK); const g = Math.floor(t * 20) % 2; linea(x + ex + 4, y - 4 - g, x + ex + 4, y + g, P.grisS); }
  linea(x - 8, y + 4, x - 6, y + 5, P.grisK); linea(x + 6, y + 4, x + 4, y + 5, P.grisK); linea(x - 10, y + 6, x + 8, y + 6, P.k); pset(x + 9, y + 5, P.k); pset(x - 11, y + 5, P.k);
  rect(x - 2, y + 3, x + 2, y + 4, P.grisD);
  if (Math.floor(t * 3) % 2) pset(x - 23, y - 10, P.rojo);
}

// geometría: la superficie del hielo en y 96–100 (los pies, en y 98); el campamento: la mesa x 138–200 (tablero en y 84,
// el monitor del radar en x 142–162, el testigo de hielo encima en x 182), la torre de sondeo x 206–226 (el pozo baja por
// x 216 hasta y 140), la tienda x 236–262; el avión cruza en y 50 (o.avionX); el corte del hielo de y 101 a la roca
// (rocaY(x) en la geometría: ~150, con la montaña bajo el hielo en x 210 hasta y 128 y el lago en x 70–110); la regla de
// profundidad en x 2–12; libres: x 20–136 en la superficie.
function e_hoyRadar(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  const rocaY = (x) => 154 + 8 * Math.sin(x * 0.035 + 0.5) + 5 * Math.sin(x * 0.09) - 26 * Math.exp(-(((x - 210) / 28) ** 2)) + 8 * Math.exp(-(((x - 90) / 22) ** 2));
  e_hoyCapa(R, 'pr-radar', () => {
    // el cielo de sol bajo: azul arriba, pálido y rosado junto al horizonte
    for (let y = 0; y < 97; y++) { const u = y / 94; for (let x = 0; x < 320; x++) { const v = u * 4 + (((x + y * 3) % 4) / 4 - 0.4) * 0.6; pset(x, y, v < 1 ? P.pc0 : v < 2 ? P.pc1 : v < 3 ? P.pc2 : v < 3.6 ? P.pc3 : hex('#f0dcd4')); } }
    disco(236, 30, 9, P.pc3); disco(236, 30, 6, P.luz); disco(235, 29, 4, P.blanco);
    // montañas lejanas que asoman del hielo
    for (let x = 0; x < 320; x++) { const c = 84 + 5 * Math.sin(x * 0.05 + 1) + 3 * Math.sin(x * 0.13); for (let y = Math.round(c); y < 95; y++) pset(x, y, (Math.sin(x * 0.05 + 1) + 0.3 * Math.cos(x * 0.13)) > 0 ? ((x + y) % 3 ? P.h3 : P.h2) : P.h2); pset(x, Math.round(c), P.h1); }
    // la superficie de nieve con sastrugis
    for (let y = 95; y < 101; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 95 ? P.h0 : (x * 3 + y * 7) % 13 === 0 ? P.h2 : P.h1);
    for (let i = 0; i < 30; i++) { const x = Math.floor(h(i, 1, 61) * 316); linea(x, 97 + (i % 3), x + 4, 97 + (i % 3), P.h2); pset(x + 1, 96 + (i % 3), P.h0); }
    // el corte: capas de hielo que se doblan sobre la roca, de claras a azul profundo, con burbujas
    for (let x = 0; x < 320; x++) { const ry = rocaY(x);
      for (let y = 101; y < 180; y++) { if (y < ry) { const d = (y - 101) / (ry - 101), prof = (y - 101) / 79;
          const fase = (y - 101) - (ry - 150) * d * 0.7 + 1.6 * Math.sin(x * 0.03 + d * 3);
          let c = prof < 0.15 ? P.h1 : prof < 0.35 ? P.h2 : prof < 0.6 ? P.h3 : prof < 0.8 ? P.h4 : P.h5;
          const fr = ((fase / (4 + d * 3)) % 1 + 1) % 1; if (fr < 0.16) c = prof < 0.35 ? P.h3 : prof < 0.6 ? P.h4 : P.h5;
          if (h(x, y, 62) > 0.992) c = P.h0; pset(x, y, c); }
        else { const d = y - ry; let c = d < 1.5 ? P.k : ((y + Math.round(Math.sin(x * 0.08) * 3)) % 6 < 2 ? P.r1 : P.r0);
          if (h(x >> 1, y >> 1, 63) > 0.85) c = P.r3; if (d > 16) c = c === P.r0 ? P.r1 : P.r2; pset(x, y, c); } } }
    // el lago bajo el hielo, en el valle
    for (let x = 66; x < 116; x++) { const ry = rocaY(x), top = Math.max(ry - 6 * Math.sqrt(Math.max(0, 1 - ((x - 91) / 25) ** 2)), ry - 6); for (let y = Math.round(top); y < Math.round(ry); y++) pset(x, y, y === Math.round(top) ? P.lagoL : P.lago); }
    // la regla de profundidad: la barra con marcas cada medio kilómetro y los números 1, 2 y 3
    rect(2, 101, 8, 179, P.k); rect(3, 101, 7, 179, P.blanco); for (let y = 101; y < 180; y += 26) rect(3, y, 7, Math.min(179, y + 12), P.rojo);
    for (let y = 101; y < 180; y += 6) rect(8, y, 10, y, P.k);
    // la mesa del campamento con sus patas, la caja de testigos y la torre de sondeo (trípode, polea y torno)
    rect(138, 84, 200, 86, P.k); rect(139, 84, 199, 85, P.gris); rect(140, 87, 141, 98, P.grisK); rect(196, 87, 197, 98, P.grisK); linea(141, 92, 196, 92, P.grisD);
    rect(170, 89, 194, 97, P.k); rect(171, 90, 193, 96, hex('#3a5a8a')); rect(171, 90, 193, 90, hex('#5a7aaa')); rect(180, 92, 184, 93, P.gris);
    linea(206, 98, 216, 60, P.k); linea(226, 98, 216, 60, P.k); linea(216, 98, 216, 62, P.grisK); linea(207, 98, 216, 61, P.avionR); linea(225, 98, 216, 61, P.avionR);
    disco(216, 61, 2.5, P.k); disco(216, 61, 1.5, P.gris); linea(210, 84, 222, 84, P.grisK); rect(218, 90, 226, 97, P.k); rect(219, 91, 225, 96, P.amarillo); disco(222, 93, 2, P.grisK);
    // el pozo del sondeo que baja por el hielo
    for (let y = 101; y < 140; y++) { pset(216, y, P.h6); pset(215, y, P.h5); pset(217, y, P.h2); }
    // la tienda piramidal con sus vientos
    poligono([[234, 98], [249, 72], [264, 98]], P.k); poligono([[236, 97], [249, 74], [262, 97]], P.tienda); poligono([[249, 74], [262, 97], [252, 97]], P.tiendaS); linea(249, 74, 241, 97, P.tiendaL);
    poligono([[245, 97], [249, 86], [253, 97]], P.tiendaS); linea(249, 72, 249, 69, P.k); linea(236, 97, 230, 98, P.grisD); linea(262, 97, 268, 98, P.grisD);
    // las cajas de víveres
    rect(270, 90, 284, 98, P.k); rect(271, 91, 283, 97, P.cascoL); rect(271, 91, 283, 91, P.cascoL); rect(276, 91, 277, 97, P.casco); rect(286, 93, 296, 98, P.k); rect(287, 94, 295, 97, P.cascoL);
  });
  R.numero('1', 13, 131, { fina: true }); R.numero('2', 13, 157, { fina: true });
  // nubes de tres tonos a tres velocidades
  for (const [v, y, w, f] of [[1.0, 22, 22, 0], [2.0, 36, 15, 0.45], [3.2, 70, 11, 0.8]]) e_hoyNube(R, ((t * v + f * 340) % 340) - 20, y, w, t, f * 5, [P.pc2, P.pc3, P.blanco]);
  // las banderitas de la ruta que ondean
  for (const fx of [24, 64, 104, 300]) { linea(fx, 98, fx, 86, P.grisK); for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) pset(fx + 1 + k, 86 + j + Math.round(Math.sin(t * 6 - k) * 0.7), P.avionR); }
  // el avión y su radar: pulsos que bajan y el perfil de la roca que se va dibujando detrás
  const ax = o.avionX ?? Math.round(((t * 22) % 420) - 50), ay = 52;
  const hasta = o.perfil != null ? 14 + o.perfil * 306 : Math.max(14, Math.min(320, ax));
  for (let x = 14; x < hasta; x++) { const ry = Math.round(rocaY(x)); pset(x, ry - 1, P.amarillo); if (x % 2) pset(x, ry - 2, P.luz);
    for (const cap of [0.35, 0.6]) { const y = Math.round(101 + (ry - 101) * cap + 1.6 * Math.sin(x * 0.03 + cap * 3)); if (x % 3 === 0) pset(x, y, P.pantL); } }
  if (ax > -30 && ax < 350) {
    for (let k = 0; k < 4; k++) { const f = ((t * 1.4 + k / 4) % 1), y = Math.round(ay + 8 + f * (rocaY(ax) - ay - 8)), w = Math.round(2 + f * 10);
      for (let i = -w; i <= w; i += 2) pset(ax + i, y, y < 100 ? P.blanco : P.amarillo); }
    for (let y = ay + 6; y < 96; y += 3) pset(ax, y, P.pc4);
    e_hoyAvion(R, ax, ay, t);
  }
  // el monitor del radar en la mesa: el perfil verde que corre
  rect(142, 70, 164, 84, P.k); rect(143, 71, 163, 82, P.pant); rect(150, 83, 156, 84, P.grisK);
  for (let i = 0; i < 20; i++) { const x = 143 + i, xx = Math.round(14 + ((i / 20) * (hasta - 14))), y = Math.round(72 + (rocaY(xx) - 120) * 0.25); if (i < (t * 6) % 26) { pset(x, Math.min(81, y), P.pantL); pset(x, Math.min(81, y + 1), P.pantS); } }
  if (Math.floor(t * 2) % 2) pset(161, 72, P.rojo);
  // el testigo de hielo con sus capas sobre la mesa
  if (o.testigo !== false && PIEZAS_PR.testigoHielo) PIEZAS_PR.testigoHielo(R, 182, 84, { s: 1 });
  // el cable del torno que sube y baja
  { const yc = Math.round(118 + Math.sin(t * 0.8) * 12); for (let y = 62; y < yc; y += 2) pset(216, y, y < 100 ? P.k : P.grisD); rect(215, yc, 217, yc + 4, P.grisK); }
  // la nieve que levanta el viento en la superficie
  for (let k = 0; k < 16; k++) { const x = Math.round((h(k, 1, 64) * 340 + t * 30) % 340) - 10, y = 90 + Math.floor(h(k, 2, 64) * 9); pset(x, y, P.blanco); pset(x - 1, y, P.h1); }
  return { suelo: 98, sueloMin: 97, sueloMax: 100, superficie: 96, rocaY, avion: [ax, ay], mesa: { x0: 138, x1: 200, y: 84 }, monitor: [142, 70, 164, 84], testigo: [182, 84], pozo: [216, 101, 140], tienda: [234, 72, 264, 98], libre: [20, 136] };
}

// geometría: suelo (pies) 150–168 (por omisión 158); pared/suelo en y 138; la librería izquierda x 4–66 (baldas en y 46, 68,
// 90, 112) con la escalera x 54–78; la ventana x 78–138 y 24–98; la copia del mapa enmarcada x 150–236 y 28–86 con la
// lámpara de cuadro; el reloj de péndulo x 240–254 y 30–82; la librería derecha x 258–318 desde y 58; el escritorio
// x 92–212 con el tablero en y 116 (flexo en x 100, portátil x 126–156, la regla en x 162–194, libros x 198–210); el
// globo de pie en (240, 108) r 16 (su trípode llega al suelo en y 152); libres: x 24–290 en el suelo (delante del
// escritorio y junto al globo).
function e_hoyDespacho(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  e_hoyCapa(R, 'pr-despacho', () => {
    // la pared de estuco con su textura de llana y la moldura
    for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 71); let c = n > 0.8 ? P.estucoL : n < 0.15 ? P.estucoS : P.estuco; if (x > 262 && y < 52) c = n > 0.85 ? P.estucoL : P.estuco; pset(x, y, c); }
    rect(0, 0, 319, 4, P.nogalL); rect(0, 5, 319, 6, P.nogal); rect(0, 7, 319, 7, P.estucoS); rect(0, 16, 319, 16, P.nogalL); rect(0, 17, 319, 17, P.estucoS);
    // el zócalo de nogal con cuarterones
    rect(0, 102, 319, 104, P.nogalL); rect(0, 105, 319, 137, P.nogal);
    for (let x = 0; x < 320; x += 32) { rect(x + 3, 108, x + 29, 132, P.nogalS); rect(x + 4, 109, x + 29, 132, P.nogalV); rect(x + 4, 132, x + 29, 132, P.nogalL); rect(x + 29, 109, x + 29, 132, P.nogalL);
      for (let i = 0; i < 5; i++) { const vy = 112 + Math.floor(h(x, i, 72) * 18); rect(x + 6 + Math.floor(h(x, i, 73) * 8), vy, x + 12 + Math.floor(h(x, i, 74) * 14), vy, P.nogalS); } }
    rect(0, 134, 319, 137, P.nogalS); rect(0, 134, 319, 134, P.nogalL);
    // la moqueta con su trama y la alfombra persa con cenefa
    for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y * 2) % 5 === 0 ? P.moqL : (x * 3 + y) % 7 === 0 ? P.moqS : P.moq);
    for (let y = 148; y < 178; y++) { const u = (y - 148) / 30, a = 70 - u * 18, b = 250 + u * 18; for (let x = Math.round(a); x < b; x++) { const dx = Math.min(x - a, b - x), dy = Math.min(y - 148, 177 - y), e = Math.min(dx, dy * 2);
      let c = e < 2 ? P.per3 : e < 5 ? ((x + y) % 4 < 2 ? P.per2 : P.per1) : e < 6 ? P.per3 : P.per0;
      if (e >= 6) { const cx = (a + b) / 2, m = Math.abs(x - cx) * 0.4 + Math.abs(y - 163); if (m < 4) c = P.per1; else if (m < 6) c = P.per2; else if (((x >> 2) + (y >> 1)) % 6 === 0) c = P.per1; }
      pset(x, y, c); } }
    // la librería alta de la izquierda con libros, un busto y cajas
    rect(2, 20, 68, 138, P.k); rect(3, 21, 67, 137, P.nogalS); rect(6, 23, 64, 136, P.nogalV);
    for (const y of [46, 68, 90, 112]) { rect(3, y, 67, y + 2, P.nogalL); rect(3, y + 3, 67, y + 3, P.k); }
    rect(3, 21, 5, 137, P.nogalL); rect(65, 21, 67, 137, P.nogal); rect(0, 18, 70, 21, P.nogalL);
    e_hoyLibros(R, 7, 46, 12, 11, 64); e_hoyLibros(R, 7, 68, 7, 12); e_hoyLibros(R, 7, 90, 12, 13, 64); e_hoyLibros(R, 7, 112, 6, 14); e_hoyLibros(R, 7, 136, 13, 15, 64);
    disco(48, 58, 4, P.gris); rect(45, 62, 51, 67, P.gris); rect(44, 66, 52, 67, P.grisS); pset(47, 57, P.blanco); pset(50, 59, P.grisS);
    for (let x = 36; x < 64; x += 14) { rect(x, 101, x + 12, 111, P.k); rect(x + 1, 102, x + 11, 111, hex('#b89868')); rect(x + 4, 105, x + 8, 106, P.cafeS); }
    // la escalera de biblioteca apoyada en la librería
    linea(56, 138, 70, 24, P.k); linea(57, 138, 71, 24, P.nogalL); linea(64, 138, 78, 24, P.k); linea(65, 138, 79, 24, P.nogalL);
    for (let k = 1; k < 9; k++) { const y = 138 - k * 13; linea(Math.round(57 + k * 1.33 * 1.05), y, Math.round(65 + k * 1.33 * 1.05), y, P.nogal); }
    // el marco de la ventana y el alféizar
    rect(80, 22, 140, 100, P.k); rect(81, 23, 139, 99, P.marco); rect(76, 98, 144, 102, P.k); rect(77, 99, 143, 101, P.marco); rect(77, 101, 143, 101, P.marcoS);
    // el marco dorado del mapa (el mapa va encima, en cada fotograma, por la luz)
    rect(150, 26, 238, 88, P.k); rect(151, 27, 237, 87, P.laton); rect(151, 85, 237, 87, P.latonS); rect(235, 27, 237, 87, P.latonS); rect(151, 27, 237, 28, P.latonL);
    rect(155, 31, 233, 83, P.k); rect(156, 32, 232, 82, hex('#2a3a2a'));
    // la librería de la derecha, más baja
    rect(258, 56, 319, 138, P.k); rect(259, 57, 319, 137, P.nogalS); rect(262, 59, 319, 136, P.nogalV); rect(256, 54, 319, 57, P.nogalL);
    for (const y of [78, 100, 120]) { rect(259, y, 319, y + 2, P.nogalL); rect(259, y + 3, 319, y + 3, P.k); }
    rect(259, 57, 261, 137, P.nogalL);
    e_hoyLibros(R, 263, 78, 14, 16, 318); e_hoyLibros(R, 263, 100, 8, 17); e_hoyLibros(R, 263, 120, 14, 18, 318); e_hoyLibros(R, 263, 136, 14, 19, 318);
    for (let i = 0; i < 3; i++) { rect(296, 96 - i * 3, 316, 98 - i * 3, P.k); rect(297, 96 - i * 3, 315, 97 - i * 3, P.libro[i + 4]); }
    // la silla del escritorio (asoma el respaldo) y el escritorio: tablero, cajoneras con tiradores, sombra
    rect(140, 98, 162, 116, P.k); rect(141, 99, 161, 116, P.cuero); rect(141, 99, 161, 100, P.cueroL); for (const [bx, by] of [[146, 104], [151, 104], [156, 104], [148, 109], [154, 109]]) pset(bx, by, P.cueroS);
    for (let x = 90; x <= 214; x++) for (let y = 138; y <= 141; y++) if ((x + y) % 2) pset(x, y, P.moqS);
    rect(90, 114, 214, 120, P.k); rect(91, 115, 213, 117, P.nogalL); rect(91, 118, 213, 119, P.nogal); for (let i = 0; i < 14; i++) { const vx = 92 + Math.floor(h(i, 3, 75) * 112); rect(vx, 116, vx + 7, 116, P.nogal); }
    for (const x0 of [94, 176]) { rect(x0, 121, x0 + 34, 138, P.k); rect(x0 + 1, 121, x0 + 33, 137, P.nogal); for (const y of [121, 127, 133]) { rect(x0 + 2, y + 1, x0 + 32, y + 4, P.nogalV); rect(x0 + 2, y + 1, x0 + 32, y + 1, P.nogalL); rect(x0 + 14, y + 2, x0 + 20, y + 2, P.laton); } }
    rect(129, 121, 175, 124, P.nogalV); rect(129, 124, 175, 124, P.k);
    // en el escritorio: el flexo verde de banquero, papeles, la regla, libros y la taza
    rect(96, 111, 110, 114, P.k); rect(97, 111, 109, 113, P.laton); rect(102, 102, 103, 111, P.latonS);
    poligono([[93, 103], [97, 97], [109, 97], [113, 103]], P.k); poligono([[94, 102], [98, 98], [108, 98], [112, 102]], P.verdeB); linea(98, 98, 108, 98, P.verdeBL); rect(94, 102, 112, 102, P.verdeBS);
    for (let y = 104; y < 114; y++) for (let x = 94 - (y - 104) * 0.5; x < 112 + (y - 104) * 0.5; x++) if ((Math.round(x) + y * 3) % 8 === 0) pset(Math.round(x), y, P.luz);
    for (let x = 90; x < 118; x++) if (x % 2) pset(x, 115, P.luz);
    poligono([[160, 113], [178, 111], [182, 114], [162, 115]], P.blanco); linea(164, 113, 176, 112, P.grisS);
    rect(162, 113, 196, 114, P.k); rect(163, 113, 195, 113, P.tablaL); for (let x = 164; x < 195; x += 3) pset(x, 114, P.tablaS);
    for (let i = 0; i < 4; i++) { rect(198 - (i % 2), 110 - i * 3, 211 - (i % 2), 112 - i * 3, P.k); rect(199 - (i % 2), 110 - i * 3, 210 - (i % 2), 111 - i * 3, P.libro[(i * 3) % 9]); }
  });
  // la ventana: cielo y nubes, el campus de ladrillo con su torre, los árboles y estudiantes que pasan; la persiana
  const W0 = 82, W1 = 138, V0 = 24, V1 = 98;
  e_hoyCieloVentana(R, W0, V0, W1, V1, t, 4);
  rect(84, 58, 120, V1, P.ladrillo); for (let y = 58; y < V1; y += 3) for (let x = 84 + ((y / 3) % 2) * 2; x < 120; x += 5) pset(x, y, P.ladrilloS);
  rect(84, 56, 120, 57, P.ladrilloL); rect(100, 36, 108, 57, P.ladrillo); poligono([[99, 36], [104, 28], [109, 36]], P.k); poligono([[100, 36], [104, 29], [108, 36]], P.marVL ?? P.cielo0);
  disco(104, 42, 2.5, P.blanco); pset(104, 41, P.k); pset(105, 42, P.k);
  for (let x = 86; x < 120; x += 6) for (const y of [62, 72]) { rect(x, y, x + 2, y + 5, P.k); if (h(x, y, Math.floor(t / 3)) > 0.7) rect(x, y + 1, x + 2, y + 5, P.amarillo); else rect(x, y + 1, x + 2, y + 1, P.cielo2); }
  rect(W0, 88, W1, V1, P.hoja); rect(W0, 92, W1, 94, P.muro);
  for (let k = 0; k < 3; k++) { const f = ((t * 0.08 + k * 0.37) % 1), px = Math.round(W0 - 4 + f * 66), dir = k % 2 ? -1 : 1, x = dir > 0 ? px : W1 + W0 - px; rect(x, 87, x + 1, 91, P.libro[k + 1]); pset(x, 86, hex('#e8b890')); pset(x + (Math.floor(t * 6) % 2), 92, P.k); }
  e_hoyArbol(R, 128, 96, 26, t, 5); e_hoyArbol(R, 88, 96, 16, t, 6);
  R.recorte(null);
  // la persiana de lamas a medio subir: arriba las lamas inclinadas que dejan ver rayas de cielo, abajo el cordón
  for (let y = 24; y < 58; y += 3) { rect(81, y, 139, y + 1, P.marco); rect(81, y + 1, 139, y + 1, P.marcoS); }
  rect(81, 58, 139, 60, P.marcoS); rect(81, 58, 139, 58, P.marco); { const c = Math.round(Math.sin(t * 0.8) * 1); linea(132, 60, 132 + c, 76, P.grisS); disco(132 + c, 77, 1.5, P.marcoS); }
  rect(110, 23, 111, 99, P.marco);
  // la copia del mapa de 1513 enmarcada, con la luz de la lámpara de cuadro
  e_hoyMapaMesa(R, 157, 231, 157, 231, 33, 81, t, 1, 0);
  for (let y = 32; y < 60; y++) for (let x = 170 - (y - 32) * 0.6; x < 218 + (y - 32) * 0.6; x++) if ((Math.round(x) + y * 3) % 7 === 0) pset(Math.round(x), y, P.luz);
  rect(178, 20, 210, 23, P.k); rect(179, 21, 209, 22, P.laton); rect(179, 21, 209, 21, P.latonL); rect(192, 23, 196, 26, P.latonS);
  // el reloj de péndulo
  { rect(240, 30, 254, 82, P.k); rect(241, 31, 253, 81, P.nogalL); rect(243, 33, 251, 41, P.k); disco(247, 37, 3.5, P.blanco); const am = t * 0.08, as = t * 1.04;
    linea(247, 37, Math.round(247 + Math.sin(am) * 2), Math.round(37 - Math.cos(am) * 2), P.k); linea(247, 37, Math.round(247 + Math.sin(as) * 3), Math.round(37 - Math.cos(as) * 3), P.rojo);
    rect(243, 45, 251, 78, P.nogalV); const pa = Math.sin(t * Math.PI) * 0.25, px = Math.round(247 + Math.sin(pa) * 26), py = Math.round(46 + Math.cos(pa) * 26); linea(247, 46, px, py, P.latonS); disco(px, py, 2.5, P.laton); pset(px - 1, py - 1, P.latonL);
    rect(244, 46, 250, 46, P.cielo2); rect(239, 82, 255, 84, P.nogal); }
  // el portátil abierto: la pantalla con el mapa que va cambiando (pergamino, globo, gráfica)
  { rect(126, 99, 156, 114, P.k); rect(128, 101, 154, 112, P.pant); const d = Math.floor(t / 2.5) % 3;
    if (d === 0) { rect(129, 102, 153, 111, P.perg); for (let y = 102; y < 112; y++) { pset(131 + Math.round(Math.sin(y * 0.6)), y, P.tintaV); pset(149 + Math.round(Math.sin(y * 0.5)), y, P.tintaR); } linea(131, 110, 142, 111, P.tintaV); }
    else if (d === 1) { disco(141, 107, 5, P.gMar); disco(140, 108, 2, P.gT); rect(137, 111, 145, 112, P.gH); }
    else { for (let i = 0; i < 6; i++) rect(131 + i * 4, 111 - (i * 3 + 2) % 8, 133 + i * 4, 111, i === 5 ? P.rojo : P.pantL); }
    poligono([[122, 114], [160, 114], [158, 117], [124, 117]], P.k); poligono([[124, 115], [158, 115], [157, 116], [125, 116]], P.gris); }
  // la taza que humea
  rect(118, 107, 124, 113, P.k); rect(119, 108, 123, 113, P.verdeBL); rect(124, 109, 125, 111, P.k); rect(119, 108, 123, 108, P.cafe);
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(121 + Math.sin(f * 7 + k) * 1.5), Math.round(105 - f * 10), f < 0.6 ? P.blanco : P.estucoL); }
  // el globo de pie que gira: el trípode de madera, el meridiano de latón y el globo
  linea(240, 126, 228, 152, P.k); linea(241, 126, 229, 152, P.nogalL); linea(240, 126, 252, 152, P.k); linea(241, 126, 253, 152, P.nogal); rect(239, 124, 242, 140, P.nogalS); rect(226, 152, 256, 153, P.moqS);
  rect(222, 124, 258, 126, P.k); rect(223, 124, 257, 125, P.nogalL);
  e_hoyGlobo(R, 240, 108, 16, t, { lat0: 5, lon0: -45, gira: o.gira ?? 6, desliza: o.desliza ?? 0 });
  for (let k = 0; k <= 20; k++) { const a = Math.PI * (k / 20) - Math.PI / 2; pset(Math.round(240 - Math.cos(a) * 18), Math.round(108 + Math.sin(a) * 18), k % 5 ? P.laton : P.latonL); }
  if ((o.desliza ?? 0) > 0) for (let k = 0; k < 6; k++) pset(Math.round(226 + k * 5), Math.round(126 + Math.sin(t * 8 + k) * 1), P.gT);
  // las motas en el rayo de luz de la ventana
  for (let k = 0; k < 10; k++) { const f = (t * 0.05 + h(k, 1, 76)) % 1, y = 100 + Math.round(f * 50), x = Math.round(92 + h(k, 2, 76) * 40 + (y - 100) * 0.7 + Math.sin(t + k) * 2); pset(x, y, P.luz); }
  for (let y = 102; y < 150; y++) for (let x = 84 + (y - 102) * 0.7; x < 140 + (y - 102) * 0.7; x++) if ((Math.round(x) + y) % 4 === 0 && y > 138) pset(Math.round(x), y, P.moqL);
  return { suelo: 158, sueloMin: 150, sueloMax: 168, mesa: { x0: 92, x1: 212, y: 116 }, portatil: [126, 99, 156, 114], regla: [162, 113, 196, 114], mapa: [157, 33, 231, 81], globo: [240, 108, 16], ventana: [80, 22, 140, 100], reloj: [240, 30, 254, 82] };
}

// lo de delante del despacho: el sillón de cuero capitoné a la izquierda y la mesita con libros y una planta a la derecha
function e_hoyDespachoDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_hoyP;
  rect(0, 140, 30, 179, P.k); rect(0, 141, 29, 179, P.cuero); rect(0, 141, 29, 143, P.cueroL); rect(24, 144, 29, 179, P.cueroS);
  for (let y = 148; y < 180; y += 7) for (let x = 3 + ((y / 7) % 2) * 4; x < 24; x += 8) { pset(x, y, P.cueroS); pset(x + 1, y + 1, P.cueroL); }
  disco(28, 152, 6, P.k); disco(28, 152, 5, P.cuero); disco(27, 151, 3, P.cueroL); rect(28, 156, 34, 179, P.k); rect(29, 156, 33, 179, P.cuero);
  rect(290, 150, 319, 153, P.k); rect(291, 150, 319, 152, P.nogalL); rect(294, 154, 296, 179, P.nogal); rect(314, 154, 316, 179, P.nogal);
  for (let i = 0; i < 2; i++) { rect(292, 146 - i * 3, 306, 148 - i * 3 + 1, P.k); rect(293, 146 - i * 3, 305, 148 - i * 3, P.libro[i + 1]); }
  rect(308, 138, 318, 149, P.k); rect(309, 139, 317, 149, hex('#b8643a')); rect(309, 139, 317, 140, hex('#d88050'));
  for (let k = 0; k < 6; k++) { const a = -2.7 + k * 0.45 + Math.sin(t * 1.1 + k) * 0.06, x1 = Math.round(313 + Math.cos(a) * 12), y1 = Math.round(138 + Math.sin(a) * 12); linea(313, 138, x1, y1, P.hojaS); disco(x1, y1, 2.5, P.hoja); pset(x1 - 1, y1 - 1, P.hojaL); }
  return { sillon: [0, 140, 34, 180], mesita: [290, 130, 320, 180] };
}

// geometría: el globo en (118, 90) r 54 (y 36–144), su pie llega al suelo en y 168; el paso de Drake en la cara de abajo
// a la izquierda (proy de (-65, -60) en la geometría: ~(118, 120)); el corcho con la copia del mapa x 196–306 y 58–134
// (la costa que se tuerce abajo a la izquierda del mapa, ~(214, 126)); la librería x 0–44; suelo (pies) 160–176 (por
// omisión 170); libres: x 180–312 en el suelo (delante del corcho) y x 10–60 delante de la librería.
function e_hoyGloboCerca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_hoyP;
  e_hoyCapa(R, 'pr-globo', () => {
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 2, y >> 1, 77); let c = n > 0.8 ? P.estucoL : n < 0.15 ? P.estucoS : P.estuco; if (x > 262 && y < 52) c = n > 0.85 ? P.estucoL : P.estuco; pset(x, y, c); }
    rect(0, 0, 319, 4, P.nogalL); rect(0, 5, 319, 6, P.nogal); rect(0, 7, 319, 7, P.estucoS);
    rect(0, 110, 319, 112, P.nogalL); rect(0, 113, 319, 151, P.nogal);
    for (let x = 0; x < 320; x += 40) { rect(x + 3, 116, x + 37, 146, P.nogalS); rect(x + 4, 117, x + 37, 146, P.nogalV); rect(x + 4, 146, x + 37, 146, P.nogalL); rect(x + 37, 117, x + 37, 146, P.nogalL);
      for (let i = 0; i < 6; i++) { const vy = 120 + Math.floor(h(x, i, 78) * 24); rect(x + 6 + Math.floor(h(x, i, 79) * 10), vy, x + 14 + Math.floor(h(x, i, 80) * 18), vy, P.nogalS); } }
    rect(0, 148, 319, 151, P.nogalS); rect(0, 148, 319, 148, P.nogalL);
    for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + y * 2) % 5 === 0 ? P.moqL : (x * 3 + y) % 7 === 0 ? P.moqS : P.moq);
    for (let y = 162; y < 180; y++) for (let x = 150; x < 320; x++) { const e = Math.min(y - 162, x - 150); pset(x, y, e < 2 ? P.per3 : e < 5 ? ((x + y) % 4 < 2 ? P.per2 : P.per1) : e < 6 ? P.per3 : (((x >> 2) + (y >> 1)) % 6 === 0 ? P.per1 : P.per0)); }
    // la librería de la izquierda
    rect(0, 28, 46, 152, P.k); rect(0, 29, 45, 151, P.nogalS); rect(0, 31, 42, 150, P.nogalV); rect(0, 26, 48, 29, P.nogalL);
    for (const y of [54, 80, 106, 130]) { rect(0, y, 45, y + 2, P.nogalL); rect(0, y + 3, 45, y + 3, P.k); }
    e_hoyLibros(R, 2, 54, 12, 21, 42); e_hoyLibros(R, 2, 80, 12, 22, 42); e_hoyLibros(R, 2, 106, 8, 23, 42); e_hoyLibros(R, 2, 130, 12, 24, 42); e_hoyLibros(R, 2, 150, 12, 25, 42);
    rect(43, 29, 45, 151, P.nogal);
    // el papel de la pared: un damasco tenue de rombos con una flor de lis en cada uno (fuera de la esquina de Atom)
    for (let y = 10; y < 108; y++) for (let x = 48; x < 320; x++) { if (x > 262 && y < 52) continue; const u = (x + (((y / 12) | 0) % 2) * 8) % 16, v = y % 12;
      if (Math.abs(u - 8) + Math.abs(v - 6) * 1.33 === 7 && (x + y) % 2 === 0) pset(x, y, P.estucoS); else if (u === 8 && (v === 5 || v === 6)) pset(x, y, P.estucoS); }
    // el grabado enmarcado de una carabela sobre la rosa de los vientos (x 198–248, y 14–50) con su cordón y su clavo
    linea(223, 8, 202, 15, P.latonS); linea(223, 8, 244, 15, P.latonS); disco(223, 8, 1.2, P.laton);
    rect(198, 14, 248, 50, P.k); rect(199, 15, 247, 49, P.laton); rect(199, 15, 247, 15, P.latonL); rect(199, 49, 247, 49, P.latonS); rect(247, 15, 247, 49, P.latonS);
    rect(202, 18, 244, 46, P.k); rect(203, 19, 243, 45, P.perg);
    for (let i = 0; i < 90; i++) pset(203 + Math.floor(h(i, 1, 84) * 41), 19 + Math.floor(h(i, 2, 84) * 27), i % 3 ? P.pergR : P.pergS);
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; linea(223, 33, 223 + Math.cos(a) * 18, 33 + Math.sin(a) * 11, k % 2 ? P.pergS : P.tintaR); }
    rect(203, 39, 243, 45, P.gMarL); for (let x = 204; x < 243; x += 4) pset(x, 41 + (x % 8 ? 0 : 1), P.pergL);
    poligono([[211, 39], [235, 39], [231, 43], [215, 43]], P.casco); linea(212, 39, 234, 39, P.cascoL);
    linea(219, 23, 219, 39, P.tinta); linea(227, 25, 227, 39, P.tinta);
    poligono([[215, 25], [223, 25], [222, 31], [216, 31]], P.vela); poligono([[216, 31], [222, 31], [223, 37], [215, 37]], P.vela); rect(224, 27, 230, 36, P.vela); rect(224, 32, 230, 32, P.velaS);
    disco(219, 34, 1.5, P.tintaR); disco(227, 31, 1.4, P.tintaR); linea(219, 22, 222, 21, P.tintaR); linea(212, 39, 207, 33, P.tinta);
    // el aplique de latón de la pared, con su pantalla de cristal verde (x 180, y 26)
    rect(178, 34, 182, 42, P.k); rect(179, 35, 181, 41, P.laton); pset(179, 35, P.latonL); linea(180, 34, 186, 28, P.latonS); linea(180, 33, 186, 27, P.laton);
    poligono([[182, 26], [184, 18], [190, 18], [192, 26]], P.k); poligono([[183, 25], [185, 19], [189, 19], [191, 25]], P.verdeB); linea(185, 19, 189, 19, P.verdeBL); rect(183, 25, 191, 25, P.verdeBS);
    // el corcho con la copia del mapa clavada
    rect(194, 56, 308, 136, P.k); rect(195, 57, 307, 135, P.nogalL); rect(198, 60, 304, 132, P.corcho);
    for (let i = 0; i < 300; i++) pset(198 + Math.floor(h(i, 1, 81) * 107), 60 + Math.floor(h(i, 2, 81) * 73), i % 2 ? P.corchoS : P.corchoL);
    rect(195, 133, 307, 135, P.nogal);
    // la sombra del globo en la pared y en el suelo
    for (let y = 40; y < 150; y++) for (let x = 140; x < 190; x++) { const d = ((x - 136) / 50) ** 2 + ((y - 96) / 56) ** 2; if (d < 1 && (x + y) % 2 === 0) pset(x, y, y < 112 ? P.estucoS : P.nogalS); }
    for (let y = 164; y < 172; y++) for (let x = 90; x < 160; x++) if (((x - 124) / 36) ** 2 + ((y - 168) / 4) ** 2 < 1 && (x + y) % 2) pset(x, y, P.moqS);
  });
  { const fl = 0.5 + 0.5 * Math.sin(t * 7.3) * Math.sin(t * 2.9 + 1); rect(184, 26, 190, 27, fl > 0.4 ? P.luz : P.amarillo); pset(187, 28, P.luz);
    for (let y = 16; y < 46; y++) for (let x = 172; x < 197; x++) { const d = ((x - 187) / (11 + fl * 2)) ** 2 + ((y - 30) / 15) ** 2; if (d < 1 && d > 0.25 && (x * 3 + y * 5) % 7 === 0 && !(x > 177 && x < 193 && y > 17 && y < 43)) pset(x, y, P.estucoL); } }
  e_hoyMapaMesa(R, 201, 301, 201, 301, 64, 129, t, 1, 0);
  for (const [x, y] of [[203, 66], [299, 66], [203, 126], [299, 126]]) { disco(x, y, 2, P.k); disco(x, y, 1.2, P.rojo); pset(x - 1, y - 1, P.blanco); }
  // el pie del globo: la columna torneada y la base de tres patas
  rect(114, 146, 122, 156, P.k); rect(115, 146, 121, 156, P.nogalL); rect(119, 146, 121, 156, P.nogal); rect(110, 156, 126, 159, P.k); rect(111, 156, 125, 158, P.nogal);
  linea(118, 159, 96, 168, P.k); linea(118, 160, 96, 169, P.nogalL); linea(118, 159, 140, 168, P.k); linea(118, 160, 140, 169, P.nogal); linea(118, 159, 118, 170, P.nogalS);
  for (const x of [96, 140, 118]) disco(x, 169, 1.5, P.laton);
  // el globo (quieto por omisión, para que se lea) con el paso de Drake bravo
  const gira = o.gira ?? 0, proy = e_hoyGlobo(R, 118, 90, 54, t, { lat0: o.lat0 ?? -38, lon0: o.lon0 ?? -62, gira, desliza: o.desliza ?? 0, drake: true });
  // el meridiano de latón con sus marcas y los ejes
  for (let k = 0; k <= 60; k++) { const a = Math.PI * (k / 60) - Math.PI / 2; const x = 118 - Math.cos(a) * 58, y = 90 + Math.sin(a) * 58; disco(x, y, 1.6, P.k); }
  for (let k = 0; k <= 60; k++) { const a = Math.PI * (k / 60) - Math.PI / 2; const x = 118 - Math.cos(a) * 58, y = 90 + Math.sin(a) * 58; pset(x, y, k % 5 ? P.laton : P.latonS); pset(x - 1, y, P.latonL); }
  disco(118, 31, 2.5, P.laton); disco(118, 149, 2.5, P.latonS); rect(117, 144, 119, 146, P.latonS);
  // un barquito que lucha con las olas en el paso de Drake
  const pd = proy(-66, -59);
  if (pd) { const bx = Math.round(pd[0]), by = Math.round(pd[1] + Math.sin(t * 3) * 1), inc = Math.sin(t * 2.6) > 0 ? 1 : 0; linea(bx - 3, by, bx + 3, by + inc, P.k); linea(bx - 2, by + 1, bx + 2, by + 1 + inc, P.casco); linea(bx, by - 5, bx, by, P.k); rect(bx + 1, by - 4, bx + 2, by - 2, P.vela); }
  // la regla que mide el paso, de Sudamérica a la Antártida
  const pa = proy(-68, -55), pb = proy(-62, -66);
  const rg = Math.max(0, Math.min(1, o.regla ?? 0));
  if (rg > 0 && pa && pb) { const x1 = pa[0] - 10, y1 = pa[1] - 6, x2 = x1 + (pb[0] + 8 - x1) * rg, y2 = y1 + (pb[1] + 8 - y1) * rg;
    for (let k = -2; k <= 2; k++) linea(x1 + k, y1 - k * 0.3, x2 + k, y2 - k * 0.3, k === -2 || k === 2 ? P.k : k === -1 ? P.tablaL : P.tabla);
    const n = Math.hypot(x2 - x1, y2 - y1); for (let d = 3; d < n; d += 3) pset(Math.round(x1 + (x2 - x1) * d / n), Math.round(y1 + (y2 - y1) * d / n), P.k); }
  // las motas que flotan en la luz
  for (let k = 0; k < 10; k++) { const f = (t * 0.04 + h(k, 1, 82)) % 1, y = 30 + Math.round(f * 110), x = Math.round(60 + h(k, 2, 82) * 200 + Math.sin(t * 0.7 + k) * 3); pset(x, y, P.luz); }
  return { suelo: 170, sueloMin: 160, sueloMax: 176, globo: [118, 90, 54], proy, drake: pd ? pd.map(Math.round) : [104, 128], sudamerica: pa ? pa.map(Math.round) : null, antartida: pb ? pb.map(Math.round) : null, mapa: [201, 64, 301, 129], costaTorcida: [231, 118], libre: [180, 312] };
}
// lo de delante del globo de cerca: nada tapa al globo; solo una esquina del escritorio con un libro abierto y el lápiz
// abajo a la izquierda, por delante de quien esté en x 10–60
function e_hoyGloboCercaDelante(R, t, o) {
  const { rect, pset, linea } = R, P = e_hoyP;
  rect(0, 166, 64, 179, P.k); rect(0, 167, 63, 170, P.nogalL); rect(0, 171, 63, 179, P.nogal); for (let i = 0; i < 6; i++) rect(Math.floor(h(i, 1, 83) * 50), 168 + (i % 2), Math.floor(h(i, 1, 83) * 50) + 9, 168 + (i % 2), P.nogal);
  rect(8, 162, 46, 167, P.k); rect(9, 162, 27, 166, P.blanco); rect(28, 162, 45, 166, P.marco); for (let y = 163; y < 166; y += 1) { linea(11, y, 25, y, P.gris); linea(30, y, 43, y, P.gris); } rect(27, 162, 28, 166, P.grisS);
  linea(48, 165, 60, 160, P.amarillo); pset(61, 160, P.k);
  return { esquina: [0, 160, 64, 180] };
}

// las rampas del pergamino (de oscuro a claro): la piel, el mar, las aguadas de las tierras, la madera de la mesa
const f_r = (a) => a.map(hex);

const F_PERG = f_r(['#6e4e2c', '#9a7646', '#bc9a62', '#d2b47e', '#e2c896', '#eed9ae']);

const F_MAR = f_r(['#4e6460', '#6e8682', '#8ea69c', '#a8bcae', '#bccabb', '#ccd6c4']);

const F_OCRE = f_r(['#5e3c1c', '#8a5a28', '#b07c36', '#c8984a', '#dab468', '#e8ca88']);

const F_VERDE = f_r(['#33441f', '#4e622b', '#6a7e38', '#869a4c', '#a2b464', '#bccb82']);

const F_ROJO = f_r(['#56261a', '#7e3a28', '#a4553a', '#bc7250', '#d0906c', '#e0ae8a']);

const F_AZUL = f_r(['#1e2e4c', '#2e466c', '#4a6694', '#6c88b0', '#92aac6', '#b6c6d6']);

const F_MAD = f_r(['#1e0f08', '#301a0e', '#452714', '#5a361c', '#704626', '#8a5a32']);

const F_PEZ = f_r(['#25332f', '#3a4f49', '#55716a', '#729088', '#97b1a3', '#c1d2c0']);

const F_LATON = f_r(['#4a3410', '#7a5a1e', '#a8822e', '#cfa646', '#e8c86a', '#fbe8a8']);

const F_TINTA = hex('#2a1e16'), F_TINTAR = hex('#9a2e20'), F_TINTAV = hex('#3c6438'), F_TINTAA = hex('#2c4a76'), F_FRESCA = hex('#0c1426');

// el orden de Bayer 4×4 para el tramado de las rampas
const F_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const f_tono = (rampa, v, x, y) => rampa[Math.max(0, Math.min(rampa.length - 1, Math.floor(v + F_BAYER[(y & 3) * 4 + (x & 3)] - 0.5)))];

// mezcla de dos colores (a = 0: c1, a = 1: c2)
const f_mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };

// ruido suave (interpolado) para manchas y aguadas
const f_vn = (x, y, k) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; };

const f_cl = (v, a, b) => Math.max(a, Math.min(b, v));

// LA GEOGRAFÍA del pergamino, en unidades del mapa (0–1000 × 0–760; el mapa del mundo sigue hacia el este hasta 2900).
// El pellejo: un contorno con el corte en diagonal abajo a la derecha; cada lado se mete hacia dentro con ruido
function f_contorno(anclas, k, hondo = 18) {
  const pts = [], n = anclas.length; let cxm = 0, cym = 0; for (const [u, v] of anclas) { cxm += u / n; cym += v / n; }
  let s = 0;
  for (let i = 0; i < n; i++) { const [au, av] = anclas[i], [bu, bv] = anclas[(i + 1) % n], L = Math.hypot(bu - au, bv - av), m = Math.max(1, Math.round(L / 14));
    let nu = -(bv - av) / L, nv = (bu - au) / L; if (nu * (cxm - au) + nv * (cym - av) < 0) { nu = -nu; nv = -nv; }
    for (let j = 0; j < m; j++) { const f = j / m, u = au + (bu - au) * f, v = av + (bv - av) * f, esq = Math.min(f, 1 - f) * L, d = 3 + hondo * f_vn(s / 70, 0.5, k) + 6 * h(s, 1, k) + Math.max(0, 14 - esq) * 0.9;
      pts.push([u + nu * d, v + nv * d]); s += L / m; } }
  return pts;
}

const F_PIEL = f_contorno([[0, 0], [1000, 0], [1000, 560], [830, 690], [650, 760], [0, 760]], 801);

const F_PIEL_ESTE = f_contorno([[940, 4], [2900, 0], [2900, 760], [640, 760], [820, 690], [990, 560]], 802, 12);

const F_AGUJEROS = [[612, 668, 7], [118, 248, 5], [884, 26, 6]];

// la costa de Sudamérica, de norte a sur y luego hacia el este (la tierra queda a la izquierda y abajo)
const F_COSTA_SA = [[-20, 300], [30, 292], [70, 286], [110, 296], [150, 300], [185, 318], [215, 334], [250, 350], [285, 372], [318, 392], [336, 412], [332, 440], [318, 470], [300, 505], [282, 540], [262, 574], [244, 610], [228, 642], [218, 672], [226, 694], [262, 700], [300, 694], [350, 704], [400, 698], [452, 710], [500, 704], [560, 716], [620, 710], [680, 722], [740, 716], [800, 728], [850, 724]];

const F_SA = 1, F_AFR = 2, F_ESP = 3, F_NO = 4;

const f_isla = (u, v, ru, rv, k) => Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2, f = 0.72 + 0.5 * h(i, 3, k); return [u + Math.cos(a) * ru * f, v + Math.sin(a) * rv * f]; });

const F_TIERRAS = [
  [F_SA, [...F_COSTA_SA, [880, 820], [-20, 820]]],
  [F_ESP, [[760, -20], [752, 20], [738, 50], [726, 80], [734, 104], [752, 116], [800, 112], [860, 118], [920, 110], [1030, 104], [1030, -20]]],
  [F_AFR, [[1030, 136], [930, 132], [860, 136], [800, 134], [770, 142], [752, 160], [738, 190], [716, 224], [694, 256], [672, 290], [652, 322], [640, 352], [646, 380], [664, 402], [690, 424], [724, 444], [764, 458], [806, 468], [846, 486], [884, 512], [920, 538], [960, 556], [1030, 572]]],
  [F_NO, [[-20, -20], [96, -20], [104, 12], [86, 34], [52, 46], [18, 40], [-20, 56]]],
  // el Caribe: Cuba alargada, La Española de pie (de norte a sur), Jamaica, Puerto Rico y las islitas
  [10, [[34, 72], [70, 60], [112, 64], [150, 74], [172, 88], [160, 98], [124, 90], [92, 96], [60, 92], [36, 86]]],
  [11, [[188, 84], [204, 88], [212, 108], [216, 134], [222, 160], [214, 186], [200, 194], [186, 180], [182, 152], [178, 120], [180, 96]]],
  [12, f_isla(112, 132, 18, 9, 11)], [13, f_isla(256, 112, 15, 8, 12)], [14, f_isla(292, 160, 6, 5, 13)], [15, f_isla(318, 148, 5, 6, 14)],
  [16, f_isla(268, 216, 6, 5, 15)], [17, f_isla(150, 196, 9, 6, 16)], [18, f_isla(240, 58, 8, 6, 17)], [19, f_isla(60, 160, 10, 7, 18)],
  [20, f_isla(298, 98, 5, 4, 19)], [21, f_isla(330, 260, 4, 4, 20)],
  // Canarias, Madeira, Azores, Cabo Verde
  [22, f_isla(676, 212, 7, 5, 21)], [23, f_isla(694, 224, 5, 4, 22)], [24, f_isla(658, 228, 5, 4, 23)], [25, f_isla(704, 204, 4, 3, 24)],
  [26, f_isla(640, 150, 7, 5, 25)], [27, f_isla(540, 58, 7, 5, 26)], [28, f_isla(562, 48, 4, 4, 27)], [29, f_isla(584, 70, 6, 4, 28)],
  [30, f_isla(590, 362, 5, 5, 29)], [31, f_isla(606, 378, 4, 4, 30)], [32, f_isla(578, 384, 4, 4, 31)],
];

// el mundo perdido del este (solo con o.borrado): Europa y Asia arriba, África entera, Arabia, la India y las islas
const F_ESTE = [
  [50, [[1020, -20], [2920, -20], [2920, 180], [2840, 240], [2800, 200], [2720, 260], [2660, 330], [2600, 300], [2560, 360], [2500, 330], [2450, 262], [2380, 296], [2340, 240], [2280, 250], [2230, 210], [2160, 220], [2100, 170], [2030, 200], [1980, 160], [1900, 170], [1860, 140], [1780, 160], [1720, 130], [1660, 160], [1600, 140], [1520, 160], [1460, 130], [1400, 150], [1330, 110], [1290, 140], [1240, 100], [1180, 120], [1100, 96], [1020, 104]]],
  [51, [[1020, 136], [1100, 150], [1200, 140], [1300, 170], [1400, 160], [1500, 180], [1600, 170], [1700, 200], [1790, 196], [1860, 240], [1910, 330], [1980, 420], [2050, 450], [1980, 520], [1900, 600], [1850, 700], [1810, 820], [1020, 820]]],
  [52, [[1960, 236], [2200, 256], [2264, 330], [2150, 420], [2040, 404], [1984, 300]]],
  [53, [[2360, 292], [2520, 304], [2442, 540]]],
  [54, f_isla(2600, 520, 44, 26, 41)], [55, f_isla(2700, 604, 52, 20, 42)], [56, f_isla(2800, 470, 30, 44, 43)], [57, f_isla(2862, 626, 26, 15, 44)],
  [58, f_isla(2464, 566, 14, 20, 45)], [59, f_isla(2126, 626, 22, 62, 46)], [60, f_isla(1400, 128, 30, 8, 47)],
];

// las rosas de los vientos [u, v, radio]
const F_ROSAS = [[520, 330, 82], [330, 222, 44], [420, 540, 46], [470, 636, 48], [540, 205, 30], [880, 640, 40]];

const F_ROSAS_ESTE = [[1500, 420, 80], [2300, 600, 70], [1200, 340, 60]];

// los barquitos [u, v, sentido, velas con cruz]
const F_BARCOS = [[252, 262, 1], [646, 254, -1], [440, 432, 1], [372, 488, -1, 1], [610, 610, 1], [352, 600, -1], [470, 236, 1]];
const F_BARCOS_ESTE = [[1640, 470, 1], [2250, 520, -1], [2560, 430, 1], [1300, 250, -1]];

// árboles y loros de Sudamérica [u, v, con loro]
const F_ARBOLES = [[126, 352, 1], [168, 396, 0], [214, 424, 1], [92, 432, 0], [146, 470, 1], [204, 512, 1], [108, 540, 0], [176, 582, 0], [62, 606, 0], [148, 640, 1], [256, 470, 0], [40, 360, 0], [196, 220, 0], [62, 80, 0], [272, 432, 1], [232, 474, 0], [184, 452, 0], [118, 412, 0], [242, 552, 0], [204, 604, 1], [98, 580, 0], [64, 524, 1], [292, 414, 0], [226, 380, 0]];

const F_ARBOLES_ESTE = [[880, 600, 0], [960, 300, 0]];

// los Andes y otros montes [u, v]
const F_MONTES = [...Array.from({ length: 12 }, (_, i) => [28 + (i % 2) * 22, 330 + i * 30]), [830, 176], [862, 186], [900, 172], [940, 190], [800, 38], [850, 30], [470, 742], [520, 748], [990, 400]];

// ríos [puntos], en Sudamérica y África
const F_RIOS = [[[322, 404], [280, 396], [236, 404], [196, 392], [150, 406], [104, 396], [64, 410]], [[232, 652], [190, 640], [150, 652], [110, 636]], [[700, 292], [748, 286], [800, 300], [850, 290]], [[690, 424], [740, 400], [800, 404], [860, 380]]];

// ciudades amuralladas [u, v]
const F_CIUDADES = [[830, 60], [828, 160], [930, 420], [756, 330]];

const F_CIUDADES_ESTE = [[1250, 60], [1900, 90], [1700, 260], [2400, 200]];

// bichos [u, v, tipo]
const F_BICHOS = [[84, 500, 'ciervo'], [400, 734, 'buey'], [560, 742, 'serpiente'], [300, 742, 'ciervo'], [890, 250, 'leon'], [880, 340, 'elefante']];

// notas (garabatos) [u, v, ancho, renglones]
const F_NOTAS = [[40, 470, 120, 4], [104, 676, 110, 3], [620, 736, 130, 2], [370, 300, 110, 4], [560, 470, 96, 3], [740, 520, 110, 3], [820, 230, 120, 5], [880, 70, 90, 3], [10, 4, 70, 2], [140, 22, 70, 2], [250, 160, 60, 3]];

const F_NOTAS_ESTE = [[1300, 330, 200, 4], [2100, 330, 200, 4], [2600, 120, 220, 3], [1700, 600, 200, 3]];

// el pez de san Brandán
const F_PEZ_UV = [430, 170, 150];

// los encuadres: centro [cx, cy] y escala s (px por unidad), y dónde cae en pantalla (ox, oy)
const F_CENTROS = { entero: [250, 420], caribe: [196, 150], brasil: [300, 418], sur: [240, 688], brandan: [440, 172] };

function f_encuadre(o) {
  const v = o.vista ?? 'entero', det = o.camara === 'detalle';
  let E;
  if (det) { const [cx, cy] = o.centro ?? F_CENTROS[v] ?? F_CENTROS.entero; E = { cx, cy, s: o.zoom ?? 2.1, ox: 160, oy: 90, detalle: true }; }
  else if (v === 'entero' && o.borrado != null) E = { cx: 1450, cy: 380, s: 0.105, ox: 161, oy: 101, mundo: true, mesa: 'mundo' };
  else if (v === 'entero') E = { cx: 500, cy: 380, s: 0.212, ox: 152, oy: 97, mesa: 'entero' };
  else if (v === 'caribe') E = { cx: 215, cy: 150, s: 0.8, ox: 160, oy: 90 };
  else if (v === 'brasil') E = { cx: 232, cy: 455, s: 0.8, ox: 160, oy: 90 };
  else if (v === 'sur') E = o.borde ? { cx: 380, cy: 690, s: 0.75, ox: 160, oy: 90, mesa: 'sur' } : { cx: 380, cy: 615, s: 0.75, ox: 160, oy: 90 };
  else if (v === 'brandan') E = { cx: 440, cy: 172, s: 1.15, ox: 160, oy: 90 };
  else E = { cx: 500, cy: 380, s: 0.212, ox: 152, oy: 97, mesa: 'entero' };
  if (o.zoom && !det) E.s = o.zoom;
  if (o.centro && !det) [E.cx, E.cy] = o.centro;
  E.vela = E.mesa === 'entero' || E.mesa === 'mundo';
  E.suelo = 176;
  E.key = [v, det ? 'd' : '', E.cx, E.cy, E.s, E.mundo ? 'm' : '', o.borde ? 'b' : ''].join(',');
  return E;
}

const f_cache = new Map();

function f_vista(R, o) {
  const E = f_encuadre(o), sa = o.trazo != null && o.trazo < 1, key = E.key + (sa ? '|t' : '');
  let V = f_cache.get(key); if (!V) { V = f_construir(R, E, sa); f_cache.set(key, V); }
  return V;
}

// distancia (punto, segmento) y el parámetro a lo largo de la costa de Sudamérica (0 al norte, 1 al final del sur)
const F_COSTA_L = (() => { const a = [0]; for (let i = 1; i < F_COSTA_SA.length; i++) a.push(a[i - 1] + Math.hypot(F_COSTA_SA[i][0] - F_COSTA_SA[i - 1][0], F_COSTA_SA[i][1] - F_COSTA_SA[i - 1][1])); return a; })();

const F_COSTA_FIN = 780;   // la costa «se acaba» en el borde roto: el trazo 1 llega ahí

const F_COSTA_TOT = (() => { let l = 0; for (let i = 1; i < F_COSTA_SA.length; i++) { const [au] = F_COSTA_SA[i - 1], [bu] = F_COSTA_SA[i]; if (au >= F_COSTA_FIN) break; l = F_COSTA_L[i - 1] + (F_COSTA_L[i] - F_COSTA_L[i - 1]) * Math.min(1, (F_COSTA_FIN - au) / (bu - au || 1)); if (bu < F_COSTA_FIN) l = F_COSTA_L[i]; } return l; })();

function f_paramCosta(u, v) {
  let mejor = 1e9, p = 0;
  for (let i = 1; i < F_COSTA_SA.length; i++) { const [au, av] = F_COSTA_SA[i - 1], [bu, bv] = F_COSTA_SA[i], dx = bu - au, dy = bv - av, L2 = dx * dx + dy * dy, f = f_cl(((u - au) * dx + (v - av) * dy) / L2, 0, 1), ex = au + dx * f - u, ey = av + dy * f - v, d = ex * ex + ey * ey;
    if (d < mejor) { mejor = d; p = F_COSTA_L[i - 1] + Math.sqrt(L2) * f; } }
  return p / F_COSTA_TOT;
}

function f_puntoCosta(q) {
  const l = q * F_COSTA_TOT;
  for (let i = 1; i < F_COSTA_SA.length; i++) if (F_COSTA_L[i] >= l) { const f = (l - F_COSTA_L[i - 1]) / (F_COSTA_L[i] - F_COSTA_L[i - 1]); return [F_COSTA_SA[i - 1][0] + (F_COSTA_SA[i][0] - F_COSTA_SA[i - 1][0]) * f, F_COSTA_SA[i - 1][1] + (F_COSTA_SA[i][1] - F_COSTA_SA[i - 1][1]) * f]; }
  return F_COSTA_SA[F_COSTA_SA.length - 1];
}

// la rampa de aguada de cada tierra, por manchas
function f_rampa(id, u, v) {
  if (id === F_SA || id >= 50) { const q = f_vn(u / 70, v / 70, 21) * 0.75 + f_vn(u / 22, v / 22, 23) * 0.25; return q < 0.42 ? F_VERDE : q < 0.68 ? F_OCRE : F_ROJO; }
  if (id === F_AFR) return f_vn(u / 80, v / 80, 22) * 0.75 + f_vn(u / 22, v / 22, 24) * 0.25 < 0.56 ? F_OCRE : F_ROJO;
  if (id === F_ESP) return F_ROJO;
  if (id === F_NO) return F_VERDE;
  return [F_ROJO, F_VERDE, F_AZUL, F_OCRE][id % 4];
}

// construye una vista: las máscaras (el pellejo y cada tierra), el sombreado del pergamino y el búfer de fondo con todo lo
// que no se mueve
function f_construir(R, E, sa) {
  const { cx, cy, s, ox, oy } = E, W = 320, N = W * 180;
  const P = (u, v) => [ox + (u - cx) * s, oy + (v - cy) * s];
  const Ux = (x) => cx + (x + 0.5 - ox) / s, Vy = (y) => cy + (y + 0.5 - oy) / s;
  const tierras = E.mundo ? [...F_TIERRAS, ...F_ESTE] : F_TIERRAS;
  const tmp = R.nuevo(), prev = R.usar(tmp);
  R.recorte(null);
  if (E.mundo) R.poligono(F_PIEL_ESTE.map(([u, v]) => P(u, v)), 2);
  R.poligono(F_PIEL.map(([u, v]) => P(u, v)), 1);
  const M = Uint8Array.from(tmp);
  for (const [u, v, r] of F_AGUJEROS) { const [x, y] = P(u, v), rr = r * s + 0.3; for (let j = Math.floor(y - rr); j <= y + rr; j++) for (let i = Math.floor(x - rr); i <= x + rr; i++) if (i >= 0 && i < W && j >= 0 && j < 180 && Math.hypot(i + 0.5 - x, j + 0.5 - y) <= rr) M[j * W + i] = 0; }
  tmp.fill(0); for (const [id, pts] of tierras) R.poligono(pts.map(([u, v]) => P(u, v)), id);
  const L = Uint8Array.from(tmp);
  R.usar(prev);
  const dentro = (x, y) => x >= 0 && x < W && y >= 0 && y < 180;
  const Lg = (x, y) => (dentro(x, y) ? L[y * W + x] : L[f_cl(y, 0, 179) * W + f_cl(x, 0, 319)]);
  // distancia al borde del pellejo, en px
  const D = new Uint8Array(N), RAD = [1, 2, 3, 5, 8, 12, 18];
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!M[i]) continue; let d = 30;
    for (const r of RAD) { let fuera = false; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]]) { const xx = Math.round(x + a * r), yy = Math.round(y + b * r); if (!dentro(xx, yy) || !M[yy * W + xx]) { fuera = true; break; } } if (fuera) { d = r; break; } }
    D[i] = d; }
  // la luz de la vela (en la mesa y sobre el pergamino)
  const VELA = E.mesa === 'mundo' ? [22, 30] : [22, 40];
  const luz = (x, y) => (E.vela ? Math.exp(-Math.hypot(x - VELA[0], y - VELA[1]) / 150) : 0.4 + 0.25 * (1 - x / 320) - 0.15 * (y / 180));
  // las manchas de edad y las aureolas de agua
  const MANCHAS = Array.from({ length: 16 }, (_, k) => [h(k, 1, 810) * (E.mundo ? 2900 : 1000), h(k, 2, 810) * 760, 10 + h(k, 3, 810) * 28]);
  const AUREOLAS = [[150, 560, 46], [700, 90, 38], [450, 620, 30]];
  const PLIEGUES_U = E.mundo ? [333, 666, 1300, 1950, 2600] : [333, 666], PLIEGUE_V = 380;
  const S = new Float32Array(N);
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!M[i]) continue;
    const u = Ux(x), v = Vy(y); let sh = (f_vn(u / 90, v / 90, 3) - 0.5) * 1.5 + (f_vn(u / 26, v / 26, 4) - 0.5) * 0.6;
    for (const [mu, mv, mr] of MANCHAS) { const d = Math.hypot(u - mu, (v - mv) * 1.3) / mr; if (d < 1) sh -= 0.75 * (1 - d * d); }
    for (const [au, av, ar] of AUREOLAS) { const d = Math.abs(Math.hypot(u - au, v - av) - ar) * s; if (d < 1.2) sh -= 0.9; else if (Math.hypot(u - au, v - av) < ar) sh -= 0.25; }
    const du = D[i] / s; sh -= du < 9 ? 2.1 : du < 20 ? 1.2 : du < 42 ? 0.5 : 0;
    for (const fu of PLIEGUES_U) { const d = u - fu; if (d > 0 && d < 40) sh -= 0.55 * (1 - d / 40); else if (d < 0 && d > -26) sh += 0.3 * (1 + d / 26); }
    { const d = v - PLIEGUE_V; if (d > 0 && d < 34) sh -= 0.45 * (1 - d / 34); else if (d < 0 && d > -22) sh += 0.25 * (1 + d / 22); }
    sh += (luz(x, y) - 0.35) * 1.1;
    S[i] = sh; }
  // la mesa de nogal: tablas con veta, juntas, la luz de la vela y la sombra del pergamino
  const T = new Uint32Array(N), PH = Math.round(20 + 16 * Math.min(1, s));
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const i = y * W + x, tb = Math.floor((y + 7) / PH), yy = (y + 7) % PH;
    let tn = 2.1 + (f_vn(x / 46 + tb * 9, yy / 3.2, 60 + tb) - 0.5) * 1.5 + Math.sin(x * 0.09 + f_vn(x / 30, tb, 61) * 7 + yy * 0.7) * 0.35 + luz(x, y) * 2.1;
    if (yy === 0) tn = 0.2; else if (yy === 1) tn -= 0.8; else if (yy === PH - 1) tn += 0.5;
    const xs = x - 3, ys = y - 4; if (xs >= 0 && ys >= 0 && M[ys * W + xs]) tn -= 1.4;
    const nudo = f_vn(x / 9 + tb * 3, yy / 4, 62); if (nudo > 0.86) tn -= 1.2 * (nudo - 0.86) * 8;
    T[i] = f_tono(F_MAD, tn, x, y); }
  // el fondo: el pergamino (el mar con su tramado, la aguada de las costas, las tierras a tinta) y la mesa
  const base = new Uint32Array(N), poros = s >= 0.7, ancho = s < 0.3 ? 2 : s < 1 ? 4 : 6;
  const listaSA = sa ? [] : null;
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const i = y * W + x;
    if (!M[i]) { base[i] = T[i]; continue; }
    const u = Ux(x), v = Vy(y), sh = S[i], id = L[i];
    let poro = 0; if (poros) { const ci = Math.floor(u / 7), cj = Math.floor(v / 7); if (h(ci, cj, 811) < 0.4) { const pu = (ci + 0.3 + h(ci, cj, 812) * 0.4) * 7, pv = (cj + 0.3 + h(ci, cj, 813) * 0.4) * 7; if (Math.hypot(u - pu, v - pv) < Math.max(0.55 / s, 0.9)) poro = 0.9; } }
    // el mar
    let mar; { let cerca = 0, quien = 0; for (let d = 1; d <= ancho && !cerca; d++) for (const [a, b] of [[d, 0], [-d, 0], [0, d], [0, -d]]) { const q = Lg(x + a, y + b); if (q) { cerca = d; quien = q; break; } }
      if (cerca) mar = f_tono(F_MAR, 3.1 + sh * 0.8 + (cerca - 1) / ancho * 1.6 - poro, x, y);
      else { mar = f_tono(F_PERG, 3.75 + sh - poro + (h(x, y, 814) - 0.5) * 0.35, x, y); if ((x + 2 * y) % 7 === 0 && h(x >> 1, y >> 1, 815) < 0.75) mar = f_tono(F_MAR, 3.2 + sh * 0.8, x, y); }
      if (!id) { base[i] = mar; continue; } }
    // la tierra: contorno de tinta, borde oscuro por dentro, aguada con rayado de pincel
    let borde = 0; for (let d = 1; d <= 3 && !borde; d++) for (const [a, b] of [[d, 0], [-d, 0], [0, d], [0, -d]]) if (Lg(x + a, y + b) !== id) { borde = d; break; }
    const rampa = f_rampa(id, u, v);
    let c; if (borde === 1 || (borde === 2 && s >= 0.7)) c = borde === 1 ? F_TINTA : f_mez(F_TINTA, rampa[1], 0.45);
    else { let tn = 3.2 + sh * 0.85 - poro * 0.6 + (h(x, y, 816) - 0.5) * 0.3; if (borde) tn -= 1.1; else if (borde === 0 && (x - y) % 5 === 0 && f_vn(u / 20, v / 20, 817) < 0.55) tn -= 0.8; c = f_tono(rampa, tn, x, y); }
    if (sa && id === F_SA) { listaSA.push(i, c, f_paramCosta(u, v), borde === 1 ? 1 : 0); base[i] = f_tono(F_PERG, 3.75 + sh - poro + (h(x, y, 814) - 0.5) * 0.35, x, y); continue; }
    base[i] = c; }
  // la aguada de la costa de Sudamérica también sale con el trazo
  if (sa) for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!M[i] || L[i]) continue; let cerca = 0;
    for (let d = 1; d <= ancho && !cerca; d++) for (const [a, b] of [[d, 0], [-d, 0], [0, d], [0, -d]]) if (Lg(x + a, y + b) === F_SA) { cerca = d; break; }
    if (cerca) { listaSA.push(i, base[i], f_paramCosta(Ux(x), Vy(y)), 2); base[i] = f_tono(F_PERG, 3.75 + S[i], x, y); } }
  const V = { E, P, M, L, S, T, base, s, sa: listaSA, caja: [0, 0, 0, 0], tierras };
  { let x0 = 320, y0 = 180, x1 = 0, y1 = 0; for (let i = 0; i < N; i++) if (M[i]) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } V.caja = [x0, y0, x1, y1]; }
  // ahora, a tinta y sobre el fondo: rumbos, rosas, ríos, montes, árboles, ciudades, bichos, notas y pliegues
  const prev2 = R.usar(base);
  const enMar = (x, y) => { if (!dentro(x, y)) return false; const i = y * W + x; return M[i] && (!L[i] || (sa && L[i] === F_SA)); };
  const rosas = E.mundo ? [...F_ROSAS, ...F_ROSAS_ESTE] : F_ROSAS;
  for (const [ru, rv, rr] of rosas) { const [x, y] = P(ru, rv); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 - Math.PI / 2, col = k % 4 === 0 ? F_TINTA : k % 2 === 0 ? F_TINTAV : F_TINTAR, r0 = rr * s * 1.05;
      R.linea(x + Math.cos(a) * r0, y + Math.sin(a) * r0, x + Math.cos(a) * 700, y + Math.sin(a) * 700, (px, py, n) => (enMar(px, py) && h(px, py, 820 + k) > 0.18 && (s >= 0.5 || n % 3 !== 2) ? f_mez(R.pget(px, py), col, s >= 0.5 ? 0.62 : 0.5) : null)); } }
  for (const [ru, rv, rr] of rosas) { const [x, y] = P(ru, rv); f_rosa(R, x, y, Math.max(6, rr * s), V); }
  const deSA = (u, v) => sa && Lg(Math.round(P(u, v)[0]), Math.round(P(u, v)[1])) === F_SA;
  V.adornosSA = [];
  const adorno = (u, v, f) => { if (deSA(u, v)) V.adornosSA.push([f_paramCosta(u, v), f]); else f(); };
  for (const r of F_RIOS) adorno(r[0][0], r[0][1], () => f_rio(R, V, r));
  for (const [u, v] of F_MONTES) adorno(u, v, () => { const [x, y] = P(u, v); f_monte(R, x, y, f_cl(24 * s, 5, 17)); });
  for (const [u, v, l] of [...F_ARBOLES, ...(E.mundo ? F_ARBOLES_ESTE : [])]) adorno(u, v, () => { const [x, y] = P(u, v); f_arbol(R, x, y, f_cl(40 * s, 6, 30), l, u); });
  for (const [u, v] of [...F_CIUDADES, ...(E.mundo ? F_CIUDADES_ESTE : [])]) adorno(u, v, () => { const [x, y] = P(u, v); f_ciudad(R, x, y, s); });
  for (const [u, v, tipo] of F_BICHOS) adorno(u, v, () => { const [x, y] = P(u, v); f_bicho(R, x, y, tipo, s); });
  for (const [u, v, w, n] of [...F_NOTAS, ...(E.mundo ? F_NOTAS_ESTE : [])]) adorno(u, v, () => { const [x, y] = P(u, v); f_nota(R, x, y, w * s, n, s, u * 7 + v); });
  // de muy cerca (o.camara 'detalle' o un zoom de 1,6 o más) el mar se llena: olas pintadas, garabatos, peces de tinta,
  // bajos de puntos rojos, estrellas de rumbo y anclas; y se apartan los sitios de los barquitos y los delfines que se mueven
  if (s >= 1.6) f_marDetalle(R, V, enMar);
  // los pliegues: la arista clara y la sombra del doblez, con arruguitas
  V.pliegues = () => { for (const fu of PLIEGUES_U) { const x = Math.round(P(fu, 0)[0]); for (let y = 0; y < 180; y++) { const xx = x + Math.round(Math.sin(y * 0.07 + fu) * 0.8); if (dentro(xx, y) && M[y * W + xx]) { R.pset(xx, y, f_mez(R.pget(xx, y), F_TINTA, 0.42)); if (M[y * W + xx - 1]) R.pset(xx - 1, y, f_mez(R.pget(xx - 1, y), hex('#fff6dc'), 0.4)); } } }
    { const y = Math.round(P(0, PLIEGUE_V)[1]); for (let x = 0; x < W; x++) { const yy = y + Math.round(Math.sin(x * 0.05) * 0.8); if (dentro(x, yy) && M[yy * W + x]) { R.pset(x, yy, f_mez(R.pget(x, yy), F_TINTA, 0.38)); if (dentro(x, yy - 1) && M[(yy - 1) * W + x]) R.pset(x, yy - 1, f_mez(R.pget(x, yy - 1), hex('#fff6dc'), 0.35)); } } }
    for (let k = 0; k < 30; k++) { const fu = PLIEGUES_U[k % PLIEGUES_U.length], u0 = k < 20 ? fu + (h(k, 1, 830) - 0.5) * 24 : h(k, 1, 830) * 1000, v0 = k < 20 ? h(k, 2, 830) * 760 : PLIEGUE_V + (h(k, 2, 830) - 0.5) * 20; const [x, y] = P(u0, v0), l = 2 + h(k, 3, 830) * 5 * Math.max(1, s), a = h(k, 4, 830) * 6;
      R.linea(x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, (px, py) => (dentro(px, py) && M[py * W + px] ? f_mez(R.pget(px, py), F_TINTA, 0.25) : null)); } };
  V.pliegues();
  // lo que se ha salido del pellejo vuelve a ser mesa
  for (let i = 0; i < N; i++) if (!M[i]) base[i] = T[i];
  // el borde del pellejo, con un filo claro arriba a la izquierda y la sombra abajo a la derecha
  for (let y = 1; y < 179; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!M[i]) continue; if (!M[i - 1] || !M[i - W]) base[i] = f_mez(base[i], hex('#f4e2b8'), 0.35); else if (!M[i + 1] || !M[i + W]) base[i] = f_mez(base[i], hex('#3a2412'), 0.45); }
  // la mesa: pesas de plomo, el astrolabio, los libros, el tintero con la pluma, el compás de puntas
  f_mesa(R, V);
  R.usar(prev2);
  return V;
}
// la rosa de los vientos de 16 puntas: cardinales rojas, diagonales verdes, cortas de oro, cada una con su cara de luz y
// su cara de sombra; el círculo de tinta, el botón de oro y una flor de lis al norte
function f_rosa(R, x, y, r, V) {
  const pt = (a, l, w, c1, c2) => { const tx = x + Math.cos(a) * l, ty = y + Math.sin(a) * l, lx = x + Math.cos(a - Math.PI / 2) * w, ly = y + Math.sin(a - Math.PI / 2) * w, rx = x + Math.cos(a + Math.PI / 2) * w, ry = y + Math.sin(a + Math.PI / 2) * w;
    R.poligono([[x, y], [lx, ly], [tx, ty]], c1); R.poligono([[x, y], [tx, ty], [rx, ry]], c2); R.linea(lx, ly, tx, ty, F_TINTA); R.linea(rx, ry, tx, ty, F_TINTA); };
  if (r >= 10) { R.anillo?.(x + 0.5, y + 0.5, r * 0.82, F_TINTA); if (r >= 16) R.anillo?.(x + 0.5, y + 0.5, r * 0.88, F_TINTAR, 2); }
  for (let k = 0; k < 8; k++) pt(k / 8 * Math.PI * 2 + Math.PI / 8 - Math.PI / 2, r * 0.48, r * 0.09, F_LATON[4], F_LATON[2]);
  for (let k = 0; k < 4; k++) pt(k / 4 * Math.PI * 2 + Math.PI / 4 - Math.PI / 2, r * 0.72, r * 0.12, hex('#7ea05a'), hex('#3e6234'));
  for (let k = 0; k < 4; k++) pt(k / 4 * Math.PI * 2 - Math.PI / 2, r, r * 0.15, hex('#d4604a'), hex('#8a2a1e'));
  R.disco(x + 0.5, y + 0.5, Math.max(1.2, r * 0.12), F_TINTA); R.disco(x + 0.5, y + 0.5, Math.max(0.8, r * 0.08), F_LATON[4]);
  if (r >= 9) { const ny = Math.round(y - r - 1), nx = Math.round(x), w = Math.max(1, Math.round(r * 0.08)); R.linea(nx, ny, nx, ny - 2 * w - 1, F_TINTAR); R.linea(nx - w - 1, ny - w, nx, ny - 2 * w - 1, F_TINTAR); R.linea(nx + w + 1, ny - w, nx, ny - 2 * w - 1, F_TINTAR); R.pset(nx, ny - 2 * w - 2, F_LATON[4]); }
}

// un río azul que serpentea tierra adentro, más ancho de cerca
function f_rio(R, V, pts) { const s = V.s;
  for (let i = 1; i < pts.length; i++) { const [ax, ay] = V.P(...pts[i - 1]), [bx, by] = V.P(...pts[i]), n = Math.max(2, Math.round(Math.hypot(bx - ax, by - ay)));
    for (let k = 0; k <= n; k++) { const f = k / n, x = ax + (bx - ax) * f, y = ay + (by - ay) * f + Math.sin((i + f) * 3) * 1.5 * Math.min(2, s * 2); R.pset(Math.round(x), Math.round(y), F_TINTAA); if (s >= 0.7) { R.pset(Math.round(x), Math.round(y) + 1, F_AZUL[3]); if (i < 2) R.pset(Math.round(x), Math.round(y) - 1, F_AZUL[2]); } } }
}

// un grupo de tres montes a la manera de las cartas viejas: lomas puntiagudas de aguada parda, la cara de luz a la
// izquierda, rayas de sombra a pluma a la derecha y contorno de tinta; el de atrás más pequeño y más verdoso
function f_monte(R, x, y, w) { x = Math.round(x); y = Math.round(y);
  const loma = (cx, by, ww, rampa) => { const m = ww / 2, hh = ww * 0.75, alto = (px) => { const d = (px - cx) / m; return Math.abs(d) >= 1 ? 0 : hh * Math.pow(1 - d * d, 0.6); };
    for (let px = Math.round(cx - m); px <= Math.round(cx + m); px++) { const a = Math.round(alto(px)); if (a < 1) continue; const d = (px - cx) / m;
      for (let j = 0; j <= a; j++) { const py = by - j; let c; if (j === a) c = F_TINTA; else { let tn = d < 0 ? 4.3 - j / a * 0.6 : 2.4 - d * 0.8; if (d > 0.1 && (px + py) % 3 === 0) tn -= 1.2; c = f_tono(rampa, tn, px, py); } R.pset(px, py, c); } }
    R.linea(cx - m, by, cx + m, by, f_mez(rampa[1], F_TINTA, 0.4)); };
  loma(x + w * 0.35, y - Math.max(1, Math.round(w * 0.2)), w * 0.8, F_VERDE);
  loma(x - w * 0.3, y, w * 0.9, F_OCRE); loma(x + w * 0.2, y + 1, w, F_OCRE);
}

// un árbol (palmera en el trópico, árbol redondo al norte) y, si toca, la marca de dónde se posa su loro
function f_arbol(R, x, y, hh, loro, u) { x = Math.round(x); y = Math.round(y);
  const tron = hex('#6a4426'), tronL = hex('#a07040');
  for (let k = 0; k <= hh; k++) { const px = x + Math.round(Math.sin(k / hh * 1.6) * hh * 0.18), py = y - k; R.pset(px, py, k % 3 ? tron : tronL); if (hh >= 14) R.pset(px + 1, py, k % 3 ? hex('#4a2c18') : tron); }
  const tx = x + Math.round(Math.sin(1.6) * hh * 0.18), ty = y - hh, f = Math.max(3, Math.round(hh * 0.45));
  for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * 0.62, ex = tx + Math.cos(a) * f * 1.2, ey = ty + Math.sin(a) * f * 0.5 + f * 0.45;
    R.linea(tx, ty, ex, ey, F_VERDE[1]); R.linea(tx, ty - 1, ex, ey - 1, F_VERDE[k % 2 ? 4 : 3]); if (hh >= 14) R.linea(tx, ty + 1, ex, ey + 1, F_VERDE[2]); }
  if (hh >= 12) { R.pset(tx - 1, ty + 1, hex('#6a4426')); R.pset(tx + 1, ty + 1, hex('#5a3a1e')); }
}

// una ciudad amurallada (torres almenadas, una cúpula, la puerta y banderolas lisas, sin escudos)
function f_ciudad(R, x, y, s) { x = Math.round(x); y = Math.round(y); const k = s < 0.4 ? 1 : s < 1.2 ? 2 : 3;
  const tpl = ['..r......r..', '..rr.....rr.', '..p...d..p..', '.WWW.ddd.WWW', '.WsW.WWW.WsW', 'WWWWWWWWWWWW', 'WsWWWddWWWsW', 'WWWWWddWWWWW'];
  f_spr(R, tpl, x - 6 * k, y - tpl.length * k, k, { W: hex('#e4d2a8'), s: F_TINTA, d: hex('#7a4a2a'), r: F_TINTAR, p: F_TINTA }, 1, true);
  for (let i = 0; i < 12; i++) R.pset(x - 6 * k + i * k, y - 3 * k, hex('#b89a6a'));
}

// los bichos del mapa: ciervo, buey, león y elefante a tinta con su aguada; la serpiente ondulada
const F_BICHOS_TPL = {
  ciervo: ['.......a.a', '........a.', '.......DDD', '......DDDk', 'DDDDDDDD..', 'dDDDDDDD..', '.D.D..D.D.', '.D.D..D.D.'],
  buey: ['h.......h.', '.hBBBBBBh.', '.BBkBBBBBB', '..BBBBBBBB', '..BBBBBBBt', '..B.B..B.B', '..B.B..B.B'],
  leon: ['........MM.', 't......MMMM', '.t.YYYYMMkM', '..YYYYYYMMM', '..YYYYYYYM.', '..Y.Y..Y.Y.', '..Y.Y..Y.Y.'],
  elefante: ['....GGGGG....', '..GGGGGGGGG..', '.GGkGGGGGGGG.', 'GwGGGGGGGGGGG', 'G.gGGGGGGGGGG', 'G..GGGGGGGGG.', 'G...GG.GG.GG.', '....GG.GG.GG.'],
};

function f_bicho(R, x, y, tipo, s) { x = Math.round(x); y = Math.round(y); const k = s < 0.4 ? 1 : s < 1.2 ? 2 : 3;
  if (tipo === 'serpiente') { const n = 8 * k + 6; for (let i = 0; i < n; i++) { const yy = y + Math.round(Math.sin(i * 0.7) * k); R.pset(x + i, yy, F_TINTA); R.pset(x + i, yy - 1, F_VERDE[3]); if (k > 1) R.pset(x + i, yy - 2, F_VERDE[4]); } R.pset(x + n, y + Math.round(Math.sin(n * 0.7) * k) - 1, F_TINTAR); return; }
  const tpl = F_BICHOS_TPL[tipo]; f_spr(R, tpl, x - Math.round(tpl[0].length * k / 2), y - tpl.length * k, k, { D: hex('#a8743c'), d: hex('#e8d0a0'), a: hex('#6a4426'), k: F_TINTA, B: hex('#8a6a4a'), h: hex('#e8dcc0'), t: hex('#5a4030'), Y: hex('#d8a848'), M: hex('#9a5a24'), G: hex('#8a8a8e'), g: hex('#5a5a62'), w: hex('#f4f0e0') }, 1, true);
}

// un dibujo en plantilla a escala entera k, con su contorno de tinta alrededor (como dibujado a pluma)
function f_spr(R, tpl, x, y, k, pal, dir = 1, contorno = true) {
  const H = tpl.length, W = tpl[0].length, lleno = (i, j) => i >= 0 && j >= 0 && j < H && i < W && tpl[j][dir > 0 ? i : W - 1 - i] !== '.';
  if (contorno) for (let j = -1; j <= H; j++) for (let i = -1; i <= W; i++) { if (lleno(i, j)) continue; if (lleno(i - 1, j) || lleno(i + 1, j) || lleno(i, j - 1) || lleno(i, j + 1)) f_cuadro(R, x + i * k, y + j * k, k, F_TINTA, true); }
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const ch = tpl[j][dir > 0 ? i : W - 1 - i]; if (ch === '.') continue; const c = pal[ch] ?? F_TINTA; f_cuadro(R, x + i * k, y + j * k, k, c, false);
    if (k > 1 && ch !== 'k' && ch !== 's' && pal[ch]) f_cuadro(R, x + i * k, y + j * k + k - 1, 1, f_mez(c, F_TINTA, 0.25), false, k); }
}

// un cuadrado de k×k (o una fila de ancho w) con pset, para que respete el recorte
function f_cuadro(R, x, y, k, c, fino, w) { if (w) { for (let i = 0; i < w; i++) R.pset(x + i, y, c); return; } const kk = fino ? Math.max(1, k - (k > 2 ? 1 : 0)) : k; for (let j = 0; j < kk; j++) for (let i = 0; i < kk; i++) R.pset(x + i, y + j, c); }

// una nota: renglones de garabato de tinta (el primero rojo), de derecha a izquierda, con astas, colas y puntos, sin letras
function f_nota(R, x, y, w, n, s, k) {
  x = Math.round(x); y = Math.round(y); w = Math.round(w); const lh = f_cl(Math.round(9 * s), 3, 7), a = lh >= 5 ? 2 : 1;
  for (let r = 0; r < n; r++) { const yb = y + r * lh + lh, col = r === 0 ? F_TINTAR : F_TINTA, w2 = r === n - 1 ? Math.round(w * (0.45 + h(r, k, 840) * 0.4)) : w - Math.round(h(r, k, 841) * 4);
    let px = x + w; while (px > x + w - w2) { const pal = 3 + Math.round(h(px, r + k, 842) * 9); for (let i = 0; i < pal && px > x + w - w2; i++, px--) { const q = h(px, yb + k, 843); let yy = yb - (q < 0.25 ? 1 : 0); R.pset(px, yy, col);
          if (q > 0.9) for (let j = 1; j <= a + 1; j++) R.pset(px, yb - j, col); else if (q > 0.84 && a > 1) { R.pset(px, yb + 1, col); R.pset(px - 1, yb + 2, col); } else if (q < 0.05) R.pset(px, yb - a - 1, col); else if (q > 0.8 && q < 0.82) R.pset(px, yb + a, col); }
      px -= 2 + Math.round(h(px, r, 844) * 2); } }
}

// la mesa: pesas de plomo en dos esquinas, y alrededor la palmatoria, el astrolabio, dos libros, el tintero y su pluma,
// el compás de puntas (sólo en el mapa entero, en el mundo y en el borde del sur)
function f_mesa(R, V) {
  const E = V.E, P = V.P;
  const pesa = (x, y) => { x = Math.round(x); y = Math.round(y); for (let j = -4; j <= 4; j++) for (let i = -5; i <= 6; i++) if (Math.hypot(i - 1.5, (j - 1.5) * 1.2) <= 4.6) R.pset(x + i, y + j + 1, f_mez(R.pget(x + i, y + j + 1), hex('#1a0e06'), 0.5));
    R.disco(x + 0.5, y + 0.5, 4.6, F_TINTA); R.disco(x + 0.5, y + 0.5, 3.8, (px, py) => f_tono(f_r(['#2a2c34', '#3e424c', '#565c68', '#727a86', '#9aa2ac', '#c8ced4']), 3.4 - (px - x) * 0.35 - (py - y) * 0.45, px, py)); R.pset(x - 1, y - 2, hex('#e8eef4')); };
  const tintero = (x, y) => { R.disco(x + 2, y + 3, 9, (px, py) => f_mez(R.pget(px, py), hex('#120804'), 0.45)); R.disco(x, y, 9, F_TINTA); R.disco(x, y, 8, (px, py) => f_tono(f_r(['#0e1626', '#1a2a46', '#2a446a', '#40608e', '#6a8ab4', '#b0c4dc']), 3.2 - (px - x) * 0.28 - (py - y) * 0.3, px, py));
    R.disco(x, y, 4, F_TINTA); R.disco(x, y, 3, hex('#06080e')); R.pset(x - 4, y - 5, hex('#e8f0ff')); R.pset(x - 5, y - 4, hex('#b0c4dc'));
    // la pluma: el cañón y las barbas, metida en el tintero
    for (let k = 0; k < 28; k++) { const px = Math.round(x - 1 - k * 0.55), py = Math.round(y - 1 - k * 0.9), w = k < 6 ? 0 : Math.round(Math.sin((k - 6) / 22 * Math.PI) * 3.2);
      for (let j = -w; j <= w; j++) R.pset(px + j, py + Math.round(j * 0.3), j === 0 ? hex('#d8cdb8') : Math.abs(j) === w ? hex('#8a7e6e') : (k + j) % 3 ? hex('#f2ece0') : hex('#c8beb0')); } };
  const compas = (x, y, a) => { const l = 26, b = 0.17, p1 = [x + Math.cos(a - b) * l, y + Math.sin(a - b) * l], p2 = [x + Math.cos(a + b) * l, y + Math.sin(a + b) * l];
    for (const [px, py] of [p1, p2]) { R.linea(x + 2, y + 3, px + 2, py + 3, hex('#1a0e06')); R.linea(x, y, px, py, F_LATON[1]); R.linea(x + 1, y, px + 1, py, F_LATON[4]); R.pset(Math.round(px), Math.round(py), hex('#d8dce4')); }
    R.disco(x + 0.5, y + 0.5, 2.4, F_TINTA); R.disco(x + 0.5, y + 0.5, 1.6, F_LATON[4]); };
  const libros = (x, y) => { for (const [dx, dy, w, c1, c2] of [[0, 12, 38, '#6a2a22', '#8e3e30'], [3, 3, 32, '#2a4a3a', '#3e6a52']]) { const x0 = x + dx, y0 = y + dy; R.rect(x0 + 2, y0 + 3, x0 + w + 2, y0 + 12, hex('#1a0e06')); R.rect(x0, y0, x0 + w, y0 + 9, F_TINTA); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 8, hex(c2)); R.rect(x0 + 1, y0 + 6, x0 + w - 1, y0 + 8, hex(c1)); R.rect(x0 + w - 4, y0 + 1, x0 + w - 1, y0 + 8, hex('#e8d8b0')); for (let yy = y0 + 2; yy < y0 + 8; yy += 2) R.rect(x0 + w - 4, yy, x0 + w - 1, yy, hex('#c8b488')); for (let xx = x0 + 4; xx < x0 + w - 6; xx += 9) R.rect(xx, y0 + 1, xx + 1, y0 + 8, F_LATON[3]); } };
  const astrolabio = (x, y) => { R.disco(x + 2, y + 3, 12, (px, py) => f_mez(R.pget(px, py), hex('#120804'), 0.45)); R.disco(x, y, 12, F_TINTA); R.disco(x, y, 11, (px, py) => f_tono(F_LATON, 3.3 - (px - x) * 0.12 - (py - y) * 0.14, px, py)); R.disco(x, y, 8, F_LATON[1]); R.disco(x, y, 7, (px, py) => f_tono(F_LATON, 2.6 - (px - x) * 0.1 - (py - y) * 0.12, px, py));
    for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * 9.5), Math.round(y + Math.sin(a) * 9.5), F_LATON[k % 2 ? 1 : 5]); }
    R.linea(x - 6, y + 4, x + 6, y - 4, F_LATON[0]); R.linea(x - 5, y - 3, x + 4, y + 5, F_LATON[5]); R.disco(x + 0.5, y + 0.5, 1.3, F_TINTA); R.rect(x - 2, y - 15, x + 2, y - 12, F_LATON[2]); R.pset(x, y - 14, F_TINTA); };
  const palmatoria = (x, y) => { R.disco(x + 2, y + 18, 8, (px, py) => f_mez(R.pget(px, py), hex('#120804'), 0.4)); R.disco(x, y + 16, 8, F_TINTA); R.disco(x, y + 16, 7, (px, py) => f_tono(F_LATON, 3.6 - (px - x) * 0.2 - (py - y - 16) * 0.25, px, py)); R.disco(x, y + 16, 3, F_LATON[2]);
    R.rect(x - 3, y, x + 3, y + 14, F_TINTA); R.rect(x - 2, y + 1, x + 2, y + 14, hex('#f0e6cc')); R.rect(x + 1, y + 1, x + 2, y + 14, hex('#c8b890')); R.rect(x - 2, y + 1, x - 2, y + 14, hex('#fff8e8')); R.pset(x - 1, y + 3, hex('#e8dcc0')); R.pset(x - 1, y + 4, hex('#e8dcc0'));
    R.rect(x + 7, y + 13, x + 10, y + 16, F_LATON[3]); R.pset(x + 10, y + 14, F_TINTA); };
  if (E.mesa === 'entero') { pesa(...P(40, 44)); pesa(...P(966, 40)); pesa(...P(70, 716)); palmatoria(22, 40); astrolabio(24, 100); libros(4, 146); tintero(290, 104); compas(272, 136, 0.55); }
  else if (E.mesa === 'mundo') { pesa(...P(40, 40)); pesa(...P(2860, 40)); pesa(...P(70, 716)); pesa(...P(2860, 720)); palmatoria(22, 30); libros(196, 150); tintero(292, 160); compas(40, 154, -0.2); astrolabio(130, 34); }
  else if (E.mesa === 'sur') { pesa(...P(520, 736)); tintero(292, 168); compas(60, 160, 0.15); }
}

// la costa de Sudamérica que se dibuja: la aguada detrás de la pluma, el contorno de tinta hasta la punta (fresca y
// brillante en el último tramo), y los adornos de esa tierra que van saliendo
function f_trazar(R, V, t, q) {
  const B = R.buf, a = V.sa;
  for (let k = 0; k < a.length; k += 4) { const p = a[k + 2], tipo = a[k + 3], i = a[k];
    if (tipo === 1) { if (p <= q) B[i] = p > q - 0.012 ? F_FRESCA : a[k + 1]; }
    else { const f = (q - 0.02 - p) / 0.06; if (f > 0 && (f >= 1 || h(i % 320, (i / 320) | 0, 850) < f)) B[i] = a[k + 1]; } }
  for (const [p, f] of V.adornosSA) if (p < q - 0.06) f();
  V.pliegues();
  const [u, v] = f_puntoCosta(Math.min(1, q)), [x, y] = V.P(u, v);
  R.disco(x + 0.5, y + 0.5, 1.2, F_FRESCA); if (Math.sin(t * 9) > 0) R.pset(Math.round(x) - 1, Math.round(y) - 1, hex('#8aa0c8'));
  return [Math.round(x), Math.round(y)];
}

// un trazo de costa que brilla en oro, latiendo: la costa en oro claro casi opaco, un filo de oro por fuera, un perfil
// de oro viejo que lo separa del pergamino, un halo tramado, un punto de oro viejo por dentro y un destello blanco que corre
function f_ilumina(R, V, t, cual) {
  const { L } = V, W = 320, B = R.buf, a = 0.82 + 0.18 * Math.sin(t * 4), oro = hex('#ffcc3a'), orol = hex('#fff2b0'), oroS = hex('#8a5a10'), blanco = hex('#ffffff');
  const sirve = (id, x, y) => { if (cual === 'caribe') return id >= 10 && id <= 21; if (id !== F_SA) return false; if (cual === 'sur') { const u = V.E.cx + (x + 0.5 - V.E.ox) / V.s, v = V.E.cy + (y + 0.5 - V.E.oy) / V.s; return v > 640 && u > 205; } return true; };
  // la costa y sus tres anillos por fuera no cambian: se buscan una vez por vista
  const clave = 'il_' + cual;
  if (!V[clave]) { const costa = [], fuera = (j) => !L[j] && V.M[j], marca = new Uint8Array(W * 180), an = [costa, [], [], []];
    for (let y = 2; y < 178; y++) for (let x = 2; x < W - 2; x++) { const i = y * W + x, id = L[i]; if (!id || !V.M[i]) continue; if (L[i - 1] && L[i + 1] && L[i - W] && L[i + W]) continue; if (sirve(id, x, y)) { costa.push(i); marca[i] = 1; } }
    for (let r = 1; r <= 3; r++) for (const i of an[r - 1]) for (const d of [-W, W, -1, 1]) { const j = i + d; if (j >= 0 && j < W * 180 && fuera(j) && !marca[j]) { marca[j] = r + 1; an[r].push(j); } }
    const dentro = []; for (const i of costa) for (const d of [-W, W, -1, 1]) { const j = i + d; if (L[j] && V.M[j] && !marca[j]) { marca[j] = 9; dentro.push(j); } }
    V[clave] = { an, dentro }; }
  const { an, dentro } = V[clave];
  // el filo de oro, el perfil de oro viejo y el halo tramado
  for (const i of an[1]) B[i] = f_mez(B[i], oro, 0.92 * a);
  for (const i of an[2]) B[i] = f_mez(B[i], oroS, 0.5 * a);
  for (const i of an[3]) { const x = i % W, y = (i / W) | 0; if (F_BAYER[(y & 3) * 4 + (x & 3)] < 0.5 * a) B[i] = f_mez(B[i], oro, 0.5); }
  // la costa en oro claro, con el destello blanco que corre
  for (const i of an[0]) { const x = i % W, y = (i / W) | 0, f = ((x * 3 + y * 5) * 0.5 - t * 40) % 60, g = f < 0 ? f + 60 : f; B[i] = g < 2.5 ? blanco : f_mez(B[i], orol, 0.94); }
  // un punto de oro viejo por dentro, para que el filo se lea también sobre la aguada clara
  for (const i of dentro) B[i] = f_mez(B[i], oroS, 0.45);
}
// el borrado de los dos tercios del este: se deshacen de este a oeste con un filo quemado, y queda la mesa
function f_borrar(R, V, q) {
  if (!V.este) { V.este = []; const Fr = new Uint8Array(320 * 180), tmp = R.nuevo(), prev = R.usar(tmp); R.poligono(F_PIEL.map(([u, v]) => V.P(u, v)), 1); R.usar(prev);
    for (let i = 0; i < 320 * 180; i++) { Fr[i] = tmp[i]; if (V.M[i] && !tmp[i]) { const x = i % 320, u = V.E.cx + (x + 0.5 - V.E.ox) / V.s; V.este.push(i, (2900 - u) / 1960 * 0.82 + h(x >> 1, (i / 640) | 0, 860) * 0.18); } } }
  const B = R.buf, a = V.este, quema = hex('#4a2c14'), quemaL = hex('#8a5a2a');
  for (let k = 0; k < a.length; k += 2) { const i = a[k], e = a[k + 1]; if (e < q) B[i] = V.T[i]; else if (e < q + 0.02) B[i] = quema; else if (e < q + 0.04) B[i] = f_mez(B[i], quemaL, 0.5); }
}

// lo que se mueve sobre el mapa: olas «~», barcos, loros y el pez de san Brandán
function f_vivos(R, V, t, viv, o, ret) {
  const { P, s, E } = V, W = 320, enMar = (x, y) => x >= 0 && x < W && y >= 0 && y < 180 && V.M[y * W + x] && !V.L[y * W + x];
  // las olas
  const paso = E.mundo ? 110 : s >= 1.6 ? 30 : 60, u0 = E.cx - (E.ox + 10) / s, u1 = E.cx + (330 - E.ox) / s, v0 = E.cy - (E.oy + 10) / s, v1 = E.cy + (190 - E.oy) / s, lw = f_cl(Math.round(10 * s), 3, 9), ola = hex('#4e6a7a'), olaL = hex('#eef4ec');
  for (let gu = Math.floor(u0 / paso); gu <= u1 / paso; gu++) for (let gv = Math.floor(v0 / paso); gv <= v1 / paso; gv++) for (let m = 0; m < 2; m++) {
    const u = (gu + 0.15 + h(gu, gv + m * 77, 870) * 0.7) * paso, v = (gv + 0.15 + h(gu + m * 31, gv, 871) * 0.7) * paso; let [x, y] = P(u, v); x = Math.round(x + Math.sin(t * 0.9 + gu + gv) * 1.2 * viv); y = Math.round(y);
    if (!enMar(x, y) || !enMar(x + lw, y)) continue; const ph = t * 2.2 * (0.3 + viv) + gu * 1.7 + gv;
    for (let i = 0; i <= lw; i++) { const yy = y + Math.round(Math.sin(i / lw * Math.PI * 2 + ph) * (lw > 5 ? 1.2 : 0.6)); R.pset(x + i, yy, ola); if (lw > 5 && i % 3 === 1 && Math.sin(ph + i) > 0.3) R.pset(x + i, yy - 1, olaL); } }
  // los barcos
  const barcos = E.mundo ? [...F_BARCOS, ...F_BARCOS_ESTE] : F_BARCOS;
  barcos.forEach(([u, v, dir, cruz], k) => { const L = f_cl(70 * s, 12, 38), du = viv >= 1 ? Math.sin(t * 0.25 + k) * 14 : 0; const [x, y] = P(u + du * dir, v); if (x < -40 || x > 360 || y < -30 || y > 210) return; f_barco(R, x, y, L, t + k * 1.3, dir * (viv >= 1 && Math.cos(t * 0.25 + k) < 0 ? -1 : 1), viv, cruz); });
  // los loros en sus palmeras (con o.vivo true la mitad vuela en corros)
  F_ARBOLES.forEach(([u, v, l], k) => { if (!l) return; if (V.sa && f_paramCosta(u, v) > (o.trazo ?? 1) - 0.06) return; const hh = f_cl(40 * s, 6, 30), [x0, y0] = P(u, v), x = Math.round(x0 + Math.sin(1.6) * hh * 0.18), y = Math.round(y0 - hh);
    const vuela = viv >= 1 && k % 2 === 0; f_loro(R, vuela ? x + Math.cos(t * 1.4 + k) * hh * 1.2 : x + 1, vuela ? y - hh * 0.5 + Math.sin(t * 2.8 + k) * hh * 0.4 : y - 1, s, t + k, vuela, k, vuela ? (Math.sin(t * 1.4 + k) > 0 ? -1 : 1) : (k % 3 ? 1 : -1)); });
  // el pez de san Brandán, con los dos monjes y su fuego
  { const [u, v, l] = F_PEZ_UV, [x, y] = P(u, v), L = f_cl(l * s, 26, 190); if (x > -L && x < 320 + L) { ret.pez = f_pez(R, x, y, L, t, o.pez ?? 0, viv); ret.hoguera = ret.pez.hoguera; } }
  // de cerca: barquitos que cabecean y van y vienen, y delfines de tinta que saltan y vuelven a entrar
  if (V.barquitos) for (const [u, v, dir, k] of V.barquitos) { const [x, y] = P(u, v); f_barco(R, x + Math.sin(t * 0.35 + k) * 4 * (0.5 + viv), y, 20, t + k, dir, viv, k % 2); }
  if (V.delfines) for (const [u, v, dir, k] of V.delfines) { const [x0, y0] = P(u, v), per = 4.2, q = ((t + k * 1.37) % per) / 1.5;
    const pt = (f) => [x0 + (f - 0.5) * 16 * dir, y0 - Math.sin(Math.PI * f) * 8];
    if (q < 1) { for (let i = -3; i <= 3; i++) { const f = q + i * 0.035; if (f < 0 || f > 1) continue; const [px, py] = pt(f); R.pset(Math.round(px), Math.round(py), i === 3 ? F_TINTA : hex('#4e6a82')); R.pset(Math.round(px), Math.round(py) + 1, i > -3 && i < 3 ? hex('#c8d6dc') : F_TINTA); }
      { const [px, py] = pt(Math.max(0, q - 0.02)); R.pset(Math.round(px) - dir, Math.round(py) - 1, F_TINTA); }
      for (const f of [0, 1]) { const g = Math.abs(q - f); if (g < 0.25) { const [px] = pt(f); for (let k2 = 0; k2 < 4; k2++) R.pset(Math.round(px + (k2 - 1.5) * 2), Math.round(y0 - 1 - (0.25 - g) * 10 * (k2 % 2 ? 1 : 0.5)), hex('#f4f8f4')); } } }
    else { const g = (q - 1) / ((per / 1.5) - 1), [px] = pt(1), w = Math.round(2 + g * 6); for (let i = -w; i <= w; i += 2) R.pset(Math.round(px + i), Math.round(y0 + (Math.abs(i) === w ? 0 : 1)), f_mez(R.pget(Math.round(px + i), Math.round(y0)), hex('#4e6a7a'), 0.7 * (1 - g))); } }
}
// una carabela de tinta: casco con tracas, castillo de popa, dos palos con velas cuadradas hinchadas, la latina de
// mesana, la banderola que ondea y la estela; cabecea con el mar
function f_barco(R, x, y, L, t, dir, viv, cruz) {
  const b = Math.sin(t * 1.7) * (0.4 + viv) * 0.9, inc = Math.sin(t * 1.3) * 0.05 * (0.3 + viv); y = y + b;
  const X = (dx) => x + dx * dir, Y = (dx, dy) => y + dy + dx * inc;
  const casco = [[X(-L * 0.5), Y(-L * 0.5, -L * 0.2)], [X(-L * 0.36), Y(-L * 0.36, -L * 0.1)], [X(L * 0.4), Y(L * 0.4, -L * 0.1)], [X(L * 0.52), Y(L * 0.52, -L * 0.17)], [X(L * 0.36), Y(L * 0.36, L * 0.1)], [X(-L * 0.38), Y(-L * 0.38, L * 0.1)]];
  // la estela y las olitas a los lados
  const ola = hex('#eef4ec'), olaS = hex('#4e6a7a'); for (let k = 0; k < 3; k++) { const ex = X(-L * (0.55 + k * 0.16)), ey = Y(-L * 0.5, L * 0.12) + (k % 2); R.linea(ex, ey, X(-L * (0.62 + k * 0.16)), ey, k % 2 ? olaS : ola); }
  R.linea(X(-L * 0.4), Y(-L * 0.4, L * 0.14), X(L * 0.42), Y(L * 0.42, L * 0.14), (px, py, n) => ((n + Math.round(t * 4)) % 4 < 2 ? olaS : null));
  R.poligono(casco, (px, py) => f_tono(F_OCRE, 1.4 + ((py - y + L * 0.2) / (L * 0.3)) * -1 + ((py - Math.round(y)) % 2 === 0 ? 0.6 : 0), px, py));
  for (let i = 0; i < casco.length; i++) R.linea(casco[i][0], casco[i][1], casco[(i + 1) % casco.length][0], casco[(i + 1) % casco.length][1], F_TINTA);
  R.linea(X(-L * 0.36), Y(-L * 0.36, -L * 0.04), X(L * 0.4), Y(L * 0.4, -L * 0.04), hex('#e8b870'));
  if (L >= 18) for (let k = 0; k < 4; k++) R.pset(Math.round(X(-L * 0.2 + k * L * 0.16)), Math.round(Y(-L * 0.2 + k * L * 0.16, L * 0.02)), F_TINTA);
  // los palos y las velas
  const palo = (dx, hh, w, roja) => { const px = X(dx), top = Y(dx, -L * 0.1 - hh); R.linea(px, Y(dx, -L * 0.1), px, top, F_TINTA);
    const viento = Math.sin(t * 2.2 + dx) * 0.4 * (0.3 + viv), y0 = top + hh * 0.12, y1 = top + hh * 0.66, bomb = L * 0.07 * (1 + viento * 0.3);
    R.poligono([[px - w / 2, y0], [px + w / 2, y0], [px + w / 2 + dir * bomb, (y0 + y1) / 2], [px + w / 2, y1], [px - w / 2, y1], [px - w / 2 + dir * bomb, (y0 + y1) / 2]], (qx, qy) => f_tono(f_r(['#8a7a5a', '#b8a882', '#d8ccaa', '#ece2c4', '#f8f0dc', '#fffaf0']), 4.2 - (dir * (qx - px)) / w * -1.2 - (qy - y0) / (y1 - y0) * 0.8, qx, qy));
    R.linea(px - w / 2, y0, px + w / 2, y0, F_TINTA); R.linea(px - w / 2, y1, px + w / 2, y1, F_TINTA); R.linea(px + w / 2, y0, px + w / 2 + dir * bomb, (y0 + y1) / 2, F_TINTA); R.linea(px + w / 2 + dir * bomb, (y0 + y1) / 2, px + w / 2, y1, F_TINTA); R.linea(px - w / 2, y0, px - w / 2 + dir * bomb, (y0 + y1) / 2, F_TINTA); R.linea(px - w / 2 + dir * bomb, (y0 + y1) / 2, px - w / 2, y1, F_TINTA);
    if (roja && L >= 14) { const cx = px + dir * bomb * 0.6, cy = (y0 + y1) / 2, r = Math.max(1, Math.round(w * 0.22)); R.linea(cx - r, cy, cx + r, cy, F_TINTAR); R.linea(cx, cy - r, cx, cy + r, F_TINTAR); }
    // la banderola
    const fl = Math.max(3, Math.round(L * 0.16)); for (let i = 0; i <= fl; i++) R.pset(Math.round(px - dir * i), Math.round(top + Math.sin(t * 6 + i * 0.9) * Math.min(1.5, i * 0.3)), i < fl * 0.6 ? F_TINTAR : hex('#c84a34')); };
  palo(L * 0.12, L * 0.62, L * 0.36, cruz); palo(-L * 0.14, L * 0.5, L * 0.28, cruz);
  // la latina de mesana
  { const px = X(-L * 0.36), top = Y(-L * 0.36, -L * 0.48); R.linea(px, Y(-L * 0.36, -L * 0.16), px, top, F_TINTA); R.poligono([[px, top], [px, Y(-L * 0.36, -L * 0.2)], [X(-L * 0.5), Y(-L * 0.5, -L * 0.22)]], hex('#e8dcbe')); R.linea(px, top, X(-L * 0.5), Y(-L * 0.5, -L * 0.22), F_TINTA); }
}

// un loro de colores (guacamayo): posado, mueve la cabeza; volando, bate las alas
function f_loro(R, x, y, s, t, vuela, k, dir) {
  x = Math.round(x); y = Math.round(y);
  const pal = [{ R: hex('#d83a2a'), Y: hex('#f0c040'), G: hex('#3a8a4a'), B: hex('#2a5aa8') }, { R: hex('#2a6ad0'), Y: hex('#f0c040'), G: hex('#2a9a8a'), B: hex('#1a3a8a') }, { R: hex('#3aa040'), Y: hex('#e8e050'), G: hex('#d83a2a'), B: hex('#2a5aa8') }][k % 3];
  if (s < 0.4) { R.pset(x, y, pal.R); R.pset(x, y - 1, pal.R); R.pset(x + dir, y - 1, pal.Y); R.pset(x, y + 1, pal.B); if (vuela && Math.sin(t * 14) > 0) { R.pset(x - 1, y - 1, pal.G); R.pset(x + 1, y - 1, pal.G); } return; }
  const z = s < 1.2 ? 1 : 2, pal2 = { ...pal, W: hex('#f4f0e8'), k: F_TINTA, b: hex('#3a3a3a') };
  const posado = [Math.sin(t * 1.5) > 0.6 ? '.RR..' : '..RR.', Math.sin(t * 1.5) > 0.6 ? 'RRWk.' : '.RRWk', '.RRRb', '.RYY.', '.RGG.', '.RGG.', '..GB.', '..BB.', '...B.'];
  const arriba = ['.G.......', '..GG.....', '...GGRR..', 'BBRRRRRWk', '..BB..RRb'], abajo = ['.........', '.........', '...RRRR..', 'BBRRRRRWk', '..BGGRRRb', '...GG....', '....G....'];
  const tpl = vuela ? (Math.sin(t * 14) > 0 ? arriba : abajo) : posado;
  f_spr(R, tpl, x - Math.round(tpl[0].length * z / 2), y - tpl.length * z + (vuela ? 3 * z : 0), z, pal2, dir, true);
}

// el pez de san Brandán: un pez enorme de lomo verdoso con escamas, aletas y cola, dormido como una isla; encima, dos
// monjes de hábito pardo junto a su hoguera, con chispas y humo. o.pez 0–1: abre el ojo y se sumerge; los monjes se
// quedan flotando y el fuego se apaga en un humo blanco
function f_pez(R, x, y, L, t, q, viv) {
  x = Math.round(x); y = Math.round(y);
  const ojo = q > 0.05, baja = f_cl((q - 0.15) / 0.6, 0, 1), dy = Math.round(baja * baja * L * 0.36), agua = y + Math.round(L * 0.1), cola = Math.sin(t * (q > 0.05 ? 7 : 2.2)) * L * 0.05 * (0.4 + viv + (q > 0.05 ? 1 : 0));
  const perfil = (f) => (f < 0.13 ? 0 : L * 0.035 + Math.pow(Math.sin(Math.PI * (f - 0.13) / 0.9), 0.62) * L * 0.15);
  const lomo = (f) => y + dy - perfil(f) * 1.1 + L * 0.02, vientre = (f) => y + dy + perfil(f) * 0.8;
  // el cuerpo, columna a columna (la cabeza a la derecha): luz arriba, sombra abajo, vientre claro, escamas en arco
  for (let i = 0; i <= L; i++) { const f = i / L, px = x - Math.round(L / 2) + i, a = Math.round(lomo(f)), b = Math.round(vientre(f)); if (b <= a) continue;
    for (let py = a; py <= b; py++) { if (py > agua + 1) continue; const g = (py - a) / (b - a); let c;
      if (py === a || py === b) c = F_TINTA; else if (g > 0.72) c = f_tono(f_r(['#8a7a5a', '#b4a47c', '#d4c49c', '#e6d8b4', '#f2e8cc', '#fbf4e2']), 3.6 - (g - 0.72) * 3, px, py);
      else { c = f_tono(F_PEZ, 4.1 - g * 3.2 + (f > 0.85 ? 0.4 : 0), px, py); const ex = (i % 6), ey = ((py - a + (Math.floor(i / 6) % 2) * 3) % 6); if (f > 0.2 && f < 0.82 && L >= 50 && ((ey === 0 && ex > 0 && ex < 5) || (ey === 1 && (ex === 0 || ex === 5)))) c = f_tono(F_PEZ, 1.6 - g, px, py); }
      R.pset(px, py, c); } }
  // la cola y las aletas
  const xc = x - Math.round(L / 2), yc = Math.round(y + dy - L * 0.01);
  if (yc - L * 0.2 < agua) { const tt = [[xc + L * 0.16, yc - L * 0.04], [xc + L * 0.02, yc - L * 0.16 + cola], [xc - L * 0.01, yc - L * 0.15 + cola], [xc + L * 0.07, yc], [xc - L * 0.01, yc + L * 0.12 + cola], [xc + L * 0.16, yc + L * 0.03]];
    R.recorte([0, 0, 319, agua + 1]); R.poligono(tt, (px, py) => f_tono(F_PEZ, 2.6 + (py < yc ? 0.8 : -0.4), px, py)); for (let k = 0; k < tt.length; k++) R.linea(tt[k][0], tt[k][1], tt[(k + 1) % tt.length][0], tt[(k + 1) % tt.length][1], F_TINTA);
    const ad = [[x - L * 0.12, lomo(0.38) + 1], [x - L * 0.02, lomo(0.38) - L * 0.1 - cola * 0.3], [x + L * 0.06, lomo(0.56) + 1]]; R.poligono(ad, F_PEZ[2]); R.linea(ad[0][0], ad[0][1], ad[1][0], ad[1][1], F_TINTA); R.linea(ad[1][0], ad[1][1], ad[2][0], ad[2][1], F_TINTA);
    const ap = [[x + L * 0.14, vientre(0.62) - L * 0.06], [x + L * 0.04, vientre(0.62) + L * 0.03 + cola * 0.3], [x + L * 0.1, vientre(0.6) - L * 0.02]]; R.poligono(ap, F_PEZ[1]); R.linea(ap[0][0], ap[0][1], ap[1][0], ap[1][1], F_TINTA);
    R.recorte(null); }
  // la boca, la agalla y el ojo (dormido: una raya; despierto: redondo, que mira a los monjes)
  { const fx = x + Math.round(L * 0.44), fy = Math.round(y + dy + L * 0.02); if (fy < agua) { R.linea(fx - L * 0.06, fy + 1, fx + L * 0.04, fy - 1, F_TINTA); R.linea(x + L * 0.26, lomo(0.76) + 2, x + L * 0.24, vientre(0.76) - 2, f_mez(F_PEZ[1], F_TINTA, 0.3));
      const ex = x + Math.round(L * 0.36), ey = Math.round(lomo(0.86) + L * 0.06), r = Math.max(1, Math.round(L * 0.025));
      if (ojo) { R.disco(ex + 0.5, ey + 0.5, r + 1, F_TINTA); R.disco(ex + 0.5, ey + 0.5, r + 0.4, hex('#f8f4e8')); R.pset(ex - (q > 0.12 ? 1 : 0), ey - 1, F_TINTA); if (r > 1) R.disco(ex - 0.5, ey - 0.5, r * 0.6, F_TINTA); } else R.linea(ex - r - 1, ey, ex + r + 1, ey, F_TINTA); } }
  // el agua: la línea de flotación con olitas y, al sumergirse, salpicaduras, anillos y burbujas
  const ola = hex('#eef4ec'), olaS = hex('#4e6a7a'), an = Math.round(L * 0.62);
  for (let i = -an; i <= an; i++) { const px = x + i, py = agua + Math.round(Math.sin(i * 0.35 + t * 3) * 0.8); R.pset(px, py, i % 4 === 0 ? ola : olaS); if (L >= 60 && (i + Math.round(t * 6)) % 7 === 0) R.pset(px, py - 1, ola); }
  if (baja > 0 && baja < 1) for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI, r = baja * L * 0.4 + 2, sx = x + Math.cos(a) * r * 1.2, sy = agua - Math.sin(a) * r * 0.5 * (1 - baja); R.pset(Math.round(sx), Math.round(sy), k % 2 ? ola : hex('#a8c8d8')); R.pset(Math.round(2 * x - sx), Math.round(sy), ola); }
  if (q > 0.6) for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1; R.pset(Math.round(x + (h(k, 1, 880) - 0.5) * L * 0.5), Math.round(agua - 2 - u * L * 0.12), hex('#c8e0e8')); }
  // los dos monjes y la hoguera sobre el lomo (o flotando, si el pez se ha ido)
  const fu = 0.5, hx = x - Math.round(L / 2) + Math.round(L * fu), hy = Math.round(lomo(fu)) - 1, flota = baja > 0.55;
  const mx = [x - Math.round(L / 2) + Math.round(L * 0.36), x - Math.round(L / 2) + Math.round(L * 0.64)];
  const fuego = !flota && q < 0.5;
  if (fuego) { const z = L >= 90 ? 2 : 1; R.linea(hx - 2 * z, hy, hx + 2 * z, hy - z, hex('#6a4426')); R.linea(hx - 2 * z, hy - z, hx + 2 * z, hy, hex('#4a2c18'));
    for (let i = -z; i <= z; i++) { const hh = Math.round((2 + h(i, Math.floor(t * 10), 881) * 3) * z); for (let j = 1; j <= hh; j++) R.pset(hx + i, hy - j, j > hh - 1 ? hex('#fff0a0') : j > hh * 0.5 ? hex('#ffb030') : hex('#e04a1a')); }
    for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; R.pset(Math.round(hx + Math.sin(t * 2 + k) * 2 + u * 4), Math.round(hy - 4 * z - u * L * 0.18), u < 0.3 ? hex('#ffb030') : f_mez(hex('#d8d0c4'), hex('#a8a090'), u)); } }
  else if (q < 0.9) for (let k = 0; k < 6; k++) { const u = ((t * 0.7 + k / 6) % 1); R.disco(hx + Math.sin(t + k) * 3 + 0.5, hy - u * L * 0.25 + 0.5, 1 + u * 2, f_mez(hex('#f4f4f0'), hex('#c8c8c4'), u)); }
  mx.forEach((m, k) => { const sobre = Math.round(lomo((m - x + L / 2) / L)) - 1, my = flota ? agua + Math.round(Math.sin(t * 3 + k * 2) * 1.2) + 2 : sobre - (q > 0.2 && q < 0.6 ? Math.round(Math.abs(Math.sin(t * 9 + k)) * 3) : 0);
    f_monje(R, m, my, L, t, k, q > 0.15, flota); });
  return { x, y: agua, L, hoguera: [hx, hy] };
}
// un monje diminuto de hábito pardo y tonsura (de pie, calentándose; asustado, con los brazos arriba; flotando, chapotea)
function f_monje(R, x, y, L, t, k, susto, flota) {
  const z = L >= 120 ? 2 : 1, pal = { h: hex('#5a3a22'), s: hex('#f0bc90'), b: hex('#a8743e'), c: hex('#f0dca0'), d: hex('#6e4826'), k: F_TINTA };
  if (L < 60) { R.pset(x, y - 3, pal.s); R.pset(x, y - 2, pal.b); R.pset(x, y - 1, pal.b); R.pset(x + 1, y - 1, pal.d); if (susto && Math.sin(t * 10 + k) > 0) R.pset(x + 1, y - 3, pal.s); return; }
  const quieto = ['.hhh.', 'hsssh', '.sss.', 'bbbbs', 'bbbb.', 'ccccc', 'bbbd.', 'bbbdd', 'd.d..'];
  const arriba = ['s...s', 'bhhhb', 'bsssb', '.sss.', '.bbb.', 'ccccc', 'bbbd.', 'bbbdd', 'd.d..'];
  const tpl = flota ? (Math.sin(t * 6 + k) > 0 ? arriba : quieto).slice(0, 5) : susto ? arriba : quieto;
  f_spr(R, tpl, x - Math.round(2.5 * z), y - tpl.length * z + 1, z, pal, k ? -1 : 1, true);
  if (flota) for (let i = -3; i <= 3; i++) if ((i + Math.round(t * 8)) % 3 === 0) R.pset(x + i * z, y + 1, hex('#eef4ec'));
}

// la llama de la vela, su halo sobre la mesa y el pergamino, y la polilla que le da vueltas
function f_vela(R, V, t) {
  const [x, y] = V.E.mesa === 'mundo' ? [22, 30] : [22, 40], fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5;
  for (let j = -26; j <= 26; j++) for (let i = -26; i <= 26; i++) { const d = Math.hypot(i, j * 1.1), px = x + i, py = y - 3 + j; if (d > 26 || px < 0 || py < 0) continue; const a = (1 - d / 26) * (0.16 + fl * 0.03); if (F_BAYER[(py & 3) * 4 + (px & 3)] < a * 3) R.pset(px, py, f_mez(R.pget(px, py), hex('#ffd890'), 0.35)); }
  const hh = 6 + Math.round(fl * 1.4), sw = Math.round(Math.sin(t * 3.1) * 0.8);
  for (let j = 0; j < hh; j++) { const w = j < 2 ? 1 : j < hh - 2 ? 1 : 0; for (let i = -w; i <= w; i++) R.pset(x + i + (j > hh / 2 ? sw : 0), y - 1 - j, j < 2 ? hex('#ff8a2a') : i === 0 ? hex('#fff8d0') : hex('#ffc040')); }
  R.pset(x, y - 1, hex('#3a2a20'));
  const mx = Math.round(x + Math.cos(t * 2.3) * 12 + Math.sin(t * 5.1) * 2), my = Math.round(y - 8 + Math.sin(t * 2.3) * 6), ala = Math.sin(t * 30) > 0;
  R.pset(mx, my, hex('#5a4a3a')); R.pset(mx - 1, my - (ala ? 1 : 0), hex('#c8b89a')); R.pset(mx + 1, my - (ala ? 1 : 0), hex('#c8b89a'));
}

// la lupa de latón con mango de madera: aumenta ×2 lo que tiene debajo, con su sombra, el reflejo del cristal y el aro
// con luz y sombra; devuelve dónde acaba el mango (para la mano)
const f_mangoLupa = (x, y, r) => [Math.round(x + (r + 3) * 0.7 + r * 1.25), Math.round(y + (r + 3) * 0.7 + r * 1.25)];

function f_lupa(R, x, y, r, t) {
  x = Math.round(x); y = Math.round(y); const W = 320, src = new Uint32Array((2 * r + 1) * (2 * r + 1));
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) src[(j + r) * (2 * r + 1) + i + r] = R.pget(x + i, y + j);
  // la sombra de la lupa y del mango
  const [mx, my] = f_mangoLupa(x, y, r), sx = 5, sy = 7;
  for (let j = -r - 4; j <= r + 4; j++) for (let i = -r - 4; i <= r + 4; i++) { const d = Math.hypot(i, j); if (d <= r + 3.5 && d > r - 1) R.pset(x + i + sx, y + j + sy, f_mez(R.pget(x + i + sx, y + j + sy), hex('#1a0e06'), 0.35)); }
  R.linea(x + (r + 3) * 0.7 + sx, y + (r + 3) * 0.7 + sy, mx + sx, my + sy, (px, py) => f_mez(R.pget(px, py), hex('#1a0e06'), 0.35));
  // el cristal: ×2, un poco más claro y cálido, con el reflejo
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const si = Math.round(i / 2), sj = Math.round(j / 2); let c = src[(sj + r) * (2 * r + 1) + si + r];
    c = f_mez(c, hex('#fff6e0'), 0.08 + (d / r) * 0.06); if (d > r - 1.5) c = f_mez(c, hex('#5a6a6a'), 0.3); R.pset(x + i, y + j, c); }
  for (let k = 0; k < 10; k++) { const a = Math.PI * (1.08 + k * 0.035); R.pset(Math.round(x + Math.cos(a) * (r - 4)), Math.round(y + Math.sin(a) * (r - 4)), f_mez(R.pget(Math.round(x + Math.cos(a) * (r - 4)), Math.round(y + Math.sin(a) * (r - 4))), hex('#ffffff'), 0.75)); }
  R.pset(x - Math.round(r * 0.35), y - Math.round(r * 0.55), hex('#ffffff'));
  // el aro de latón
  for (let j = -r - 4; j <= r + 4; j++) for (let i = -r - 4; i <= r + 4; i++) { const d = Math.hypot(i, j); if (d <= r || d > r + 3.4) continue; const l = (-i - j) / (Math.abs(i) + Math.abs(j) + 0.01);
    R.pset(x + i, y + j, d > r + 2.6 ? F_TINTA : f_tono(F_LATON, 3 + l * 1.4 + (d < r + 1 ? -0.8 : 0), x + i, y + j)); }
  // el mango: casquillo de latón y madera torneada con su brillo
  const a0x = x + (r + 3) * 0.7, a0y = y + (r + 3) * 0.7, n = Math.round(Math.hypot(mx - a0x, my - a0y));
  for (let k = 0; k <= n; k++) { const px = a0x + (mx - a0x) * k / n, py = a0y + (my - a0y) * k / n, lat = k < 5, w = lat ? 2.6 : 2.2 + Math.sin(k / n * Math.PI) * 0.8;
    for (let q = -w - 1; q <= w + 1; q += 0.5) { const qx = Math.round(px + q * 0.707), qy = Math.round(py - q * 0.707), borde = Math.abs(q) > w;
      R.pset(qx, qy, borde ? F_TINTA : lat ? f_tono(F_LATON, 3.4 + q * 0.5, qx, qy) : f_tono(F_MAD, 3.6 + q * 0.7 + (k % 7 === 0 ? -1 : 0), qx, qy)); } }
  return [mx, my];
}

// el escritorio de cerca sin nada encima (y 117–179): el tablero de nogal claro con vetas, nudos y el canto con su
// brillo; el frente con dos cajones de cuarterón (tirador de latón, bocallave y la sombra del canto) y el faldón tallado.
// Lo pinta e_hoyMesa en su capa (así hoy() solo ya llena la pantalla) y e_hoyMesaDelante encima de los personajes
function e_hoyMesaTablero(R) {
  const { rect, pset } = R, P = e_hoyP;
  rect(0, 117, 319, 117, P.k); rect(0, 118, 319, 157, P.frisoL);
  for (let i = 0; i < 110; i++) { const vx = Math.floor(h(i, 1, 25) * 320), vy = 119 + Math.floor(h(i, 2, 25) * 38); rect(vx, vy, vx + 6 + Math.floor(h(i, 3, 25) * 18), vy, i % 3 ? P.friso : P.tablaL); }
  // dos nudos de la madera con sus anillos y las juntas de las tablas del tablero
  for (const [nx, ny] of [[52, 152], [252, 121]]) for (let a = 0; a < 3; a++) for (let k = -6 - a * 3; k <= 6 + a * 3; k++) pset(nx + k, ny + (Math.abs(k) < 2 + a * 2 ? (a % 2 ? -a - 1 : a + 1) : 0), a === 0 ? P.frisoS : P.friso);
  for (const jy of [131, 144]) for (let x = 0; x < 320; x++) if ((x + jy) % 37 > 1) pset(x, jy, P.friso);
  rect(0, 158, 319, 161, P.friso); rect(0, 158, 319, 158, P.tablaL); for (let x = 3; x < 320; x += 9) pset(x, 159, P.tablaL); rect(0, 161, 319, 161, P.frisoS); rect(0, 162, 319, 162, P.k);
  rect(0, 163, 319, 179, P.frisoV); for (let x = 0; x < 320; x += 4) pset(x, 164, P.frisoS);
  for (const x0 of [16, 172]) {
    rect(x0, 166, x0 + 130, 179, P.k); rect(x0 + 1, 167, x0 + 130, 179, P.friso); rect(x0 + 1, 167, x0 + 129, 167, P.tablaL); rect(x0 + 1, 167, x0 + 1, 179, P.tablaL);
    rect(x0 + 5, 170, x0 + 125, 179, P.frisoS); rect(x0 + 6, 171, x0 + 124, 179, P.friso); rect(x0 + 6, 171, x0 + 124, 171, P.frisoV);
    for (let i = 0; i < 5; i++) { const vy = 174 + Math.floor(h(x0, i, 26) * 5), vx = x0 + 10 + Math.floor(h(x0, i, 27) * 90); rect(vx, vy, vx + 8 + Math.floor(h(x0, i, 28) * 14), vy, P.frisoS); }
    rect(x0 + 55, 172, x0 + 75, 174, P.k); rect(x0 + 56, 172, x0 + 74, 173, P.laton); pset(x0 + 57, 172, P.blanco); rect(x0 + 56, 175, x0 + 74, 175, P.frisoS);
    rect(x0 + 64, 176, x0 + 66, 178, P.latonS); pset(x0 + 65, 177, P.k);
  }
  // la columna tallada entre los cajones
  rect(152, 165, 166, 179, P.frisoS); for (let y = 166; y < 180; y += 3) rect(154, y, 164, y, P.friso); rect(158, 165, 160, 179, P.tablaL);
}

// el mar de cerca (s ≥ 1,6): en una rejilla en unidades del mapa (la misma en cualquier centro), olas pintadas en hileras,
// garabatos de notas, peces de tinta, bajos de puntos rojos con cruces de roca, estrellas de rumbo con su línea de puntos
// y anclas; todo entero en el mar, lejos de las notas, las rosas, los barcos y el pez. Guarda en V.barquitos y
// V.delfines los sitios de lo que se mueve (lo pinta f_vivos)
function f_marDetalle(R, V, enMar) {
  const { E, P, s } = V, u0 = E.cx - (E.ox + 30) / s, u1 = E.cx + (350 - E.ox) / s, v0 = E.cy - (E.oy + 30) / s, v1 = E.cy + (210 - E.oy) / s;
  const enCaja = (x0, y0, x1, y1) => { if ((x1 > 274 && y0 < 48) || (x0 < 174 && x1 > 16 && y0 < 17)) return false; for (let y = Math.floor(y0); y <= y1; y += 2) for (let x = Math.floor(x0); x <= x1; x += 2) if (!enMar(x, y)) return false; return enMar(Math.floor(x1), Math.floor(y1)); };
  const lejos = (u, v, m) => !F_NOTAS.some(([nu, nv, w, n]) => u > nu - m && u < nu + w + m && v > nv - m - 4 && v < nv + n * 9 + 6 + m)
    && !F_ROSAS.some(([ru, rv, rr]) => Math.hypot(u - ru, v - rv) < rr * 1.05 + m) && !F_BARCOS.some(([bu, bv]) => Math.hypot(u - bu, v - bv) < 34 + m)
    && !(Math.abs(u - F_PEZ_UV[0]) < 100 + m && Math.abs(v - F_PEZ_UV[1]) < 46 + m);
  const tinta = (x, y, c, al = 0.82) => { x = Math.round(x); y = Math.round(y); if (enMar(x, y)) R.pset(x, y, f_mez(R.pget(x, y), c, al)); };
  const azul = hex('#3e5a6e'), claro = hex('#f6ead0'), roca = F_TINTA;
  // primero lo que se mueve: los barquitos (rejilla de 48) y los delfines (rejilla de 36)
  V.barquitos = []; V.delfines = [];
  for (let gu = Math.floor(u0 / 48); gu <= u1 / 48; gu++) for (let gv = Math.floor(v0 / 48); gv <= v1 / 48; gv++) { if (h(gu, gv, 905) > 0.65) continue;
    const u = (gu + 0.25 + h(gu, gv, 906) * 0.5) * 48, v = (gv + 0.3 + h(gu, gv, 907) * 0.4) * 48, [x, y] = P(u, v);
    if (lejos(u, v, 4) && !V.barquitos.some(([bu, bv]) => Math.hypot(u - bu, v - bv) < 40) && enCaja(x - 27, y - 17, x + 27, y + 5)) V.barquitos.push([u, v, h(gu, gv, 908) < 0.5 ? 1 : -1, gu * 7 + gv]); }
  for (let gu = Math.floor(u0 / 36); gu <= u1 / 36; gu++) for (let gv = Math.floor(v0 / 36); gv <= v1 / 36; gv++) { if (h(gu, gv, 909) > 0.45) continue;
    const u = (gu + 0.2 + h(gu, gv, 910) * 0.6) * 36, v = (gv + 0.25 + h(gu, gv, 911) * 0.5) * 36, [x, y] = P(u, v);
    if (lejos(u, v, 4) && !V.barquitos.some(([bu, bv]) => Math.hypot(u - bu, v - bv) < 30) && enCaja(x - 12, y - 10, x + 12, y + 3)) V.delfines.push([u, v, h(gu, gv, 912) < 0.5 ? 1 : -1, gu * 5 + gv * 3]); }
  const libre = (u, v, m) => lejos(u, v, m) && !V.barquitos.some(([bu, bv]) => Math.hypot(u - bu, v - bv) < 22 + m) && !V.delfines.some(([du, dv]) => Math.hypot(u - du, v - dv) < 10 + m);
  // luego los adornos quietos, en una rejilla de 18
  for (let gu = Math.floor(u0 / 18); gu <= u1 / 18; gu++) for (let gv = Math.floor(v0 / 18); gv <= v1 / 18; gv++) {
    const r = h(gu, gv, 900), u = (gu + 0.2 + h(gu, gv, 901) * 0.6) * 18, v = (gv + 0.2 + h(gu, gv, 902) * 0.6) * 18, [fx, fy] = P(u, v), x = Math.round(fx), y = Math.round(fy), q = h(gu, gv, 903);
    if (r < 0.36) {   // olas pintadas: dos o tres hileras de arcos, con su brillo debajo de la cresta
      const nf = q < 0.5 ? 2 : 3, na = 3 + (q * 10 | 0) % 2, w = na * 7 + 3; if (!libre(u, v, 2) || !enCaja(x - 1, y - 1, x + w, y + nf * 5 + 2)) continue;
      for (let f = 0; f < nf; f++) for (let k = 0; k < na - (f === nf - 1 ? 1 : 0); k++) { const bx = x + k * 7 + (f % 2) * 3, by = y + f * 5;
        for (const [i, j] of [[0, 2], [1, 1], [2, 0], [3, 0], [4, 1], [5, 2]]) tinta(bx + i, by + j, azul); tinta(bx + 2, by + 1, claro, 0.6); tinta(bx + 3, by + 1, claro, 0.6); tinta(bx + 6, by + 2, azul, 0.4); } }
    else if (r < 0.48) {   // un garabato de nota, de dos o tres renglones
      const w = 26 + Math.round(q * 18), n = q < 0.5 ? 2 : 3; if (!libre(u, v, 4) || !enCaja(x - 2, y - 2, x + w + 2, y + n * 5 + 3)) continue;
      f_nota(R, x, y, w, n, 0.6, gu * 13 + gv * 7); }
    else if (r < 0.57) {   // un pez de tinta, con su ojo y su raspa
      if (!libre(u, v, 2) || !enCaja(x - 6, y - 4, x + 6, y + 4)) continue; const d = q < 0.5 ? 1 : -1;
      ['....kkk....', '.k.k...k...', '.kk..e..k..', '.k.k...kk..', '....kkk....'].forEach((fila, j) => { for (let i = 0; i < fila.length; i++) { const c = fila[i]; if (c === '.') continue; tinta(x + (i - 5) * d, y - 2 + j, c === 'e' ? F_TINTAR : F_TINTA); } });
      for (let i = -1; i <= 2; i++) tinta(x + i * d, y, azul, 0.5); }
    else if (r < 0.68) {   // un bajo: puntos rojos y cruces de roca
      if (!libre(u, v, 2) || !enCaja(x - 8, y - 6, x + 8, y + 6)) continue;
      for (let k = 0; k < 9; k++) { const a = h(k, gu + gv, 904) * 6.28, rr = 1 + h(k, gu - gv, 913) * 6, px = x + Math.cos(a) * rr * 1.2, py = y + Math.sin(a) * rr * 0.8;
        if (k % 3 === 0) { tinta(px, py, roca); tinta(px - 1, py, roca); tinta(px + 1, py, roca); tinta(px, py - 1, roca); tinta(px, py + 1, roca); } else { tinta(px, py, F_TINTAR); tinta(px + 1, py, F_TINTAR, 0.5); } } }
    else if (r < 0.75) {   // una estrella de rumbo de ocho puntas, con su línea de puntos
      if (!libre(u, v, 2) || !enCaja(x - 6, y - 6, x + 6, y + 6)) continue;
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, l = k % 2 ? 3 : 5, c = k % 2 ? F_TINTAV : F_TINTAR; for (let i = 1; i <= l; i++) tinta(x + Math.cos(a) * i, y + Math.sin(a) * i, c); }
      tinta(x, y, F_LATON[4], 1); const a2 = q * 6.28; for (let i = 8; i < 60; i += 3) tinta(x + Math.cos(a2) * i, y + Math.sin(a2) * i, F_TINTAR, 0.55); }
    else if (r < 0.8) {   // un ancla
      if (!libre(u, v, 2) || !enCaja(x - 4, y - 5, x + 4, y + 5)) continue;
      ['..k..', '.k.k.', '..k..', 'kkkkk', '..k..', '..k..', 'k.k.k', '.kkk.'].forEach((fila, j) => { for (let i = 0; i < 5; i++) if (fila[i] === 'k') tinta(x - 2 + i, y - 4 + j, F_TINTA); }); }
    else if (r < 0.87) {   // un remolino de tinta azul, con su sombra de aguada
      if (!libre(u, v, 2) || !enCaja(x - 7, y - 6, x + 7, y + 6)) continue;
      for (let k = 0; k < 40; k++) { const a = k * 0.42 + q * 6, rr = 0.6 + k * 0.15; tinta(x + Math.cos(a) * rr * 1.3, y + Math.sin(a) * rr * 0.9, k > 30 ? F_TINTAA : azul, k > 30 ? 0.9 : 0.75); }
      for (let i = -6; i <= 6; i += 2) tinta(x + i, y + 6, azul, 0.35); }
  }
}
