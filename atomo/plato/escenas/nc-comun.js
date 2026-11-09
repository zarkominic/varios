// Fontanería y decorados del episodio 28 (La New Coke: el día que Estados Unidos se rebeló por un refresco) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Atlanta 1886 (la farmacia con su fuente
// de soda, la cámara acorazada), B la guerra de las colas (el supermercado de 1975 con la cata a ciegas, la sede y el
// laboratorio de sabores), C el anuncio (la rueda de prensa del Lincoln Center en 1985, la oficina del rival), D la
// rebelión (la centralita, la calle de la protesta, el sótano) y E hoy (el estudio de Atom, el laboratorio del escáner).
// DERECHOS: ningún logotipo de Coca-Cola ni de Pepsi, ni su letra, ni la onda blanca, ni el disco rojo, ni el globo
// tricolor, ni la botella de contorno (con cintura y estrías), ni latas reales, ni Papá Noel ni osos polares, ni jingles:
// latas lisas rojas (C.rojoCola) y azules (C.azulCola) sin nada blanco encima, botellas rectas. Sin letras legibles.
// Los personajes son los de ELENCO_NC y PIEZAS_NC (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mostradores, mesas, atriles) va en
// su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/nc-comun.js';
//   const { E, R, M } = await T.preparar('nc-gancho');
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
// las piezas del episodio (PIEZAS_NC: latas y botellas genéricas, vasos de cata, la caja fuerte, los teléfonos…), las crea el reparto
export const PIEZAS_NC = KIT.PIEZAS_NC || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // las dos colas (rojo y azul planos, distintos de los de las marcas), el mármol y el latón de 1886, el cartón de las
  // cajas, el beige de los ochenta
  rojoCola: '#c8382e', rojoColaS: '#8a2018', azulCola: '#2e5aa8', azulColaS: '#1a3a78', jarabe: '#4a2414', espuma: '#f4ece0',
  marmol: '#e0d8cc', marmolS: '#b0a898', laton: '#c8a040', latonS: '#8a6a24', carton: '#c8a06a', cartonS: '#8a6a3a',
  beige: '#d8ccb0', beigeS: '#a89c80', bata: '#eef0f2',
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
  const E = await escena(id, 'ep28');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1886 (la farmacia), 1975 (el reto), 1985 (el cambio y la vuelta), 2004 (el escáner), 2026
  Object.assign(R.ICONOS, {
    botella: ['...#...', '...#...', '..###..', '..###..', '..###..', '..###..', '.......'],
    vaso: ['#.....#', '#.....#', '.#...#.', '.#...#.', '.#####.', '.......', '.......'],
    lata: ['.#####.', '#######', '#.....#', '#######', '#######', '.#####.', '.......'],
    cerebro: ['.##.##.', '#######', '#######', '.#####.', '..#.#..', '.......', '.......'],
  });
  R.tramosTiempo([[1886, 1975, R.PALA.ORO, 'botella'], [1975, 1985, R.PALA.AZUL ?? R.PALA.ROJO, 'vaso'], [1985, 2004, R.PALA.ROJO, 'lata'], [2004, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'cerebro']]);
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


// ── A · Atlanta 1886 ─────────────────────────────────────────────────────────────────────────────────
// Cuatro encuadres (o.encuadre + o.camara), cada uno con su capa fija en un búfer y su vida animada encima. Lo que va
// delante de los personajes (mostradores, mesas, cuerdas del museo) lo pinta atlantaDelante.
// o.encuadre:
//   'farmacia' (por omisión), cámara 'general': la farmacia de Atlanta en 1886 a lo ancho. Techo de chapa repujada,
//     papel pintado verde con damasco, zócalo de caoba y suelo de tablas en perspectiva con la mancha de sol de la
//     ventana. A la izquierda la puerta de cristal y el escaparate con dos globos de farmacia de colores colgados y
//     frascos en el alféizar: por ellos (recortada a su hueco) la calle de 1886 con cielo tramado y nubes a tres
//     velocidades, fachadas de ladrillo con toldos, farolas de gas, postes de telégrafo, pájaros, paseantes con sombrero
//     y un coche de caballos que pasa. En medio la gran estantería de botica: tarros de cristal de colores y de loza con
//     la etiqueta en blanco, cajoneras con tiradores de latón, la escalera de biblioteca en su barra y un gato que mueve
//     la cola en la cornisa. El reloj de péndulo, la lámpara de gas de pared y la araña de gas (llamas que tiemblan, con
//     su halo). A la derecha el aparador de la fuente de soda: espejo con reflejos que se mueven, columnas, pirámide de
//     vasos, tarros de jarabe y una pizarrita (o.vasos: la cifra que marca, p. ej. 9). Delante, un barril y la escupidera.
//     o.fuego (true): la llamita azul del hornillo de la mesa de Pemberton.
//   'farmacia', cámara 'fuente': la fuente de soda de cerca: vidriera de colores arriba, el espejo grande con el reflejo
//     de la sala (y de la gente que pasa), las urnas de jarabe, la registradora de latón que saca sus cifras, limones y
//     vasos, y debajo los armarios de caoba con vetas, la nevera de hielo de zinc con los sifones y un trapo; el frente
//     del mostrador de mármol (paneles verdes, pilastras, barra de latón) lo pintan esta función y, por delante de quien
//     esté detrás, atlantaDelante, que además pone la torre de latón de los grifos y el vaso que se llena con
//     burbujas. o.llena (0–1; si no se da, se llena y se vacía solo en bucle de 6 s): cuánto lleva el vaso; mientras sube,
//     la palanca está bajada y cae el chorro. o.vaso false: sin vaso (la escena pone el suyo).
//   'banco', cámara 'general': la cámara acorazada de un banco hacia 1890: sillares de granito, techo de casetones, la
//     gran placa de acero remachada con la puerta redonda pulida (anillos de torno, el volante de radios, el dial). o.abre
//     0–1: hasta 0,25 gira el volante y el dial; de 0,25 a 1 la puerta gira sobre su bisagra de la derecha hacia nosotros y
//     enseña su canto gordo con los cerrojos cromados; dentro, la cámara iluminada con baldas de cajas y un atril en el
//     centro; la luz sale y se derrama por el suelo. o.papelito (true): el papelito doblado en el atril, con un brillo.
//     o.vacia (false): la cámara por dentro vacía (la pared de chapa con sus juntas, una telaraña, solo el atril con el
//     papelito y la luz): para el gag de «solo hay un papelito». En la esquina de la placa, la cerradura de tiempo con su
//     aguja que avanza y la placa del fabricante. A los lados, paredes de cajas de seguridad de latón numeradas (de dos
//     cuelgan llaves con borla que se mece); lámparas verdes colgadas con su cono de luz y una polilla que da vueltas; el
//     paragüero a la izquierda, la escupidera de latón a la derecha y el suelo de losas de mármol con juntas y vetas; el
//     atril del guardia con el libro y su lámpara verde. o.guardia (true): un guardia (ELENCO_CHIBI.policia) que hace la
//     ronda junto al atril. o.museo: la misma puerta hoy, en un museo: paredes oscuras con paneles de exposición, focos
//     de carril, una vitrina con una botella recta, una pantalla que cambia, el cartel luminoso de salida (pictograma) y
//     la cámara de seguridad que barre la sala con su piloto; la puerta abierta por omisión, sin guardia;
//     las cuerdas de terciopelo van en atlantaDelante.
//   'banco', cámara 'despacho': el despacho de Candler en los 1890: papel pintado granate, zócalo de caoba, parqué con
//     alfombra persa, la ventana con cortinas de terciopelo a una calle de Atlanta con el tranvía de mulas, el mapa
//     enmarcado con las rutas de las botellas (o.rutas 0–1: cuánto han crecido; por omisión 1, con botellitas que viajan),
//     el teléfono de manivela, un paisaje con marco dorado, el perchero con bombines, la caja fuerte pequeña
//     (PIEZAS_NC.cajaFuerte; o.abre 0–1), la puerta del pasillo (o.puerta 0–1: se abre y deja ver el pasillo con su
//     lámpara) y el sillón de cuero detrás del escritorio. El escritorio va en atlantaDelante.
// Devuelve { suelo } (la línea de suelo de los de delante) y las posiciones útiles (ver la geometría de cada encuadre).
export function atlanta(R, t, o = {}) {
  const enc = o.encuadre ?? 'farmacia', cam = o.camara ?? 'general';
  if (enc === 'banco') return cam === 'despacho' ? a_despacho(R, t, o) : a_boveda(R, t, o);
  return cam === 'fuente' ? a_fuente(R, t, o) : a_farmacia(R, t, o);
}
// lo de delante de los personajes en cada encuadre de atlanta(); se llama con las mismas opciones, DESPUÉS de los actores
// que están detrás (el dependiente tras el mostrador, Pemberton tras su mesa, Candler tras el escritorio, los visitantes
// tras la cuerda) y ANTES de los que están delante (suelo ≥ 156). Pinta:
//   farmacia/general: la mesa de trabajo de Pemberton (tarros de hojas y de nueces, el hornillo de trípode con su llama,
//     el mortero, la garrafa de mimbre debajo) y el mostrador de mármol de la fuente con la torre de grifos de latón, la
//     barra de los pies y dos taburetes.
//   farmacia/fuente: el mostrador de mármol de cerca (el mismo que ya pinta atlanta, repintado por delante de los
//     actores), la torre de latón con sus dos caños y palancas y el vaso que se
//     llena (o.llena, o.vaso).
//   banco/general: con o.museo, los postes de latón con la cuerda de terciopelo que se mece; sin museo, nada.
//   banco/despacho: el escritorio de caoba con la lámpara verde, el tintero con la pluma, los papeles, el secante y el
//     puro que humea en el cenicero.
export function atlantaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'farmacia', cam = o.camara ?? 'general';
  if (enc === 'banco') return cam === 'despacho' ? a_despachoDelante(R, t, o) : a_bovedaDelante(R, t, o);
  return cam === 'fuente' ? a_fuenteDelante(R, t, o) : a_farmaciaDelante(R, t, o);
}
// ── B · La guerra de las colas ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'super': un supermercado de 1975 de frente: techo de placas con plafones fluorescentes (uno parpadea), la pared del
//     fondo con las franjas setenteras (naranja, mostaza, marrón), dos góndolas de chapa con estantes llenos de latas lisas
//     rojas y azules (dos alturas), botellas rectas, cartones de seis y cajas de cartón abajo; entre las dos góndolas, un
//     pasillo en perspectiva (x 73–133) con su cartel colgante (pictograma de lata y «5») que se mece, un cliente con
//     carrito que va y viene por el fondo y otro que cruza al final; a la izquierda la cámara de tele de 1975 en su trípode
//     con el piloto rojo que parpadea (o.graba, por omisión true) y su cable por el suelo; a la derecha el foco en su pie
//     con el cono de luz sobre la mesa, la pirámide de latas de oferta («99») y un carrito aparcado; suelo de linóleo a
//     cuadros en perspectiva con el brillo de los tubos. o.azul (0–1, por omisión 0.5): la parte de las latas de las
//     estanterías y de la pirámide que es azul (se vuelven azules una a una al subir: para «las latas azules ocupan cada
//     vez más sitio»). La mesa de la cata (con sus vasos) va en colasDelante: llámala después de los actores.
//     Cámara 'mesa': el inserto de la mesa de la cata de cerca: el mantel de cuadros en perspectiva con una torre de vasos
//     boca abajo, servilletas, la tablilla con el recuento a palotes (azul gana), el cubo de hielo con dos latas que
//     sudan; detrás, las estanterías desenfocadas a doble tamaño, un cliente que pasa y el resplandor del foco. o.vasos
//     (por omisión true): los dos vasos de cata a escala 3, sin letra, con un punto rojo y uno azul en la base (o.puntos false los quita; o.letras true, la «A» y la «B»), con burbujas; o.llenoA, o.llenoB (0–1, por omisión
//     0.8); o.trile (0–1): los vasos se cambian de sitio en arco (0 en su sitio, 1 cambiados). Las manos las pone la
//     escena (T.mano) encima. colasDelante no pinta nada en esta cámara.
//   'sede': el despacho alto de la sede en Atlanta: un ventanal (x 6–166) con persiana a medio bajar y la ciudad de los
//     ochenta (rascacielos con ventanas que se encienden, la torre redonda, árboles, una autopista con coches) bajo un
//     cielo tramado con nubes de tres tonos a tres velocidades y pájaros; a la derecha la pared con zócalo de nogal, la
//     gráfica en su marco (x 178–270, y 48–106): dos líneas, roja que baja y azul que sube, con cifras en los ejes y sin
//     palabras; o.grafica (0–1, por omisión 1) la va dibujando; el piloto de alarma en la pared y el teléfono del aparador;
//     o.alarma (true o 0–1): el piloto gira, la sala late en rojo y el teléfono tiembla. Sillones de cuero detrás de la mesa
//     de juntas, un ficus que se mece, moqueta con dibujo y la luz del ventanal en el suelo. La mesa de juntas (nogal, con
//     carpetas, jarra, vasos y dos latas) va en colasDelante.
//     Cámara 'laboratorio': el laboratorio de sabores: pared de azulejos, la campana de gases con un matraz que hierve y
//     vapor, estantes con frascos y botellas rectas, la pizarra con fórmulas en símbolos (hexágonos, flechas, cifras), el
//     corcho con el mapa de Kansas en pictograma y una estrella, la nevera del laboratorio, la encimera del fondo con
//     gradillas de tubos de jarabes, una bureta que gotea, un agitador que gira, la centrífuga con su luz. La isla de
//     trabajo de delante (gradilla, probetas, balanza, microscopio y la carpeta con candado; o.carpeta, por omisión true)
//     va en colasDelante.
// Devuelve { suelo, ... } con la geometría de cada encuadre (ver cada auxiliar).
export function colas(R, t, o = {}) {
  const enc = o.encuadre ?? 'super', cam = o.camara ?? 'general';
  if (enc === 'sede') return cam === 'laboratorio' ? b_laboratorio(R, t, o) : b_sede(R, t, o);
  return cam === 'mesa' ? b_mesaCata(R, t, o) : b_super(R, t, o);
}
// lo de delante de los personajes en cada encuadre de colas(); se llama después de los actores, con las mismas opciones:
// 'super' la mesa de la cata con su mantel, los dos vasos sin letra con su punto rojo y azul (o.vasos, o.llenoA, o.llenoB, o.trile, o.puntos, o.letras) y la tablilla del
// recuento; 'sede' la mesa de juntas; 'laboratorio' la isla de trabajo. En la cámara 'mesa' no pinta nada.
export function colasDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'super', cam = o.camara ?? 'general';
  if (enc === 'sede') return cam === 'laboratorio' ? b_labDelante(R, t, o) : b_sedeDelante(R, t, o);
  return cam === 'mesa' ? {} : b_superDelante(R, t, o);
}
// ── C · El anuncio ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'prensa': la rueda de prensa del Lincoln Center (23 de abril de 1985). Arriba, el techo de casetones con la parrilla
//     de focos (cuatro haces tramados que se mecen y dejan su charco en la tarima); al fondo, el gran ventanal de columnas
//     finas de travertino (x 40–280, y 20–98) que da a la plaza: cielo tramado con nubes de tres tonos a tres velocidades
//     y palomas, el perfil de Manhattan en la bruma, a la izquierda una sala de columnata fina, en medio la ópera con sus
//     cinco arcos altos encendidos y sus lámparas, a la derecha el teatro de pilares pareados, y en la plaza la fuente
//     con sus chorros que suben y bajan y paseantes de 7 px; a los lados, cortinas de terciopelo azul noche con sus
//     pliegues. La tarima de tablas (y 100–124) con el faldón plisado y la tira de luz; al fondo de la tarima, la mesa
//     larga con mantel (x 112–200, tablero en y 99), jarra, vasos y micrófonos de mesa, y en medio, sobre una peana, la
//     lata nueva tapada con el paño morado bajo su foco. Delante del escenario, el foso de prensa con una fila de
//     periodistas sentados de espaldas (unos alzan la cámara y disparan el flash, otro levanta la mano con la libreta), la
//     moqueta con su dibujo y los cables. El atril (x 238–262, tablero en y 110) y la primera fila de cabezas con cámaras y las dos cámaras
//     de tele van en anuncioDelante.
//     Cámara 'atril': el atril de cerca (en anuncioDelante, x 186–246, tablero en y 151) con su ramillete de micrófonos de
//     colores, y a la izquierda la peana con mantel (x 44–124, tablero en y 118) con la lata nueva a doble tamaño bajo un
//     haz con motas de polvo; detrás, el ventanal desenfocado (columnas gruesas, la ópera y la fuente en manchas de luz)
//     y la cortina, el foco grande colgado, la bandera que ondea en su mástil (x 270) y un centro de flores (x 292–308);
//     el suelo de tablas en perspectiva con los reflejos de los focos.
//   'rival': la oficina del rival (azul) el día de la fiesta: el techo de placas con pantallas fluorescentes (una
//     parpadea) y serpentinas azules y plateadas colgadas en guirnalda; la pared de paneles de tela con sus costuras; la
//     ventana con la persiana a medio subir (x 16–112, y 26–84) al jardín de la sede (césped, árboles que se mecen, una
//     escultura, un estanque con su chorro, un coche que pasa por la avenida, nubes y pájaros); el periódico clavado con
//     chinchetas (x 128–166, y 30–80): una cabecera de barra negra y una página entera de rayas, sin letras, con la
//     esquina que se levanta con el aire; la pizarra con barras azules que suben y la cifra 85; el reloj; las mesas del
//     fondo con ordenadores beige (pantallas de líneas verdes que se escriben), teléfono, taza humeante, planta y
//     papeles; globos azules atados a las mesas que se mecen; la fuente de agua con burbujas; la pared lateral derecha en
//     perspectiva con la puerta (abierta según o.puerta) a un pasillo iluminado con un cartel de salida en pictograma y
//     gente pequeña que pasa con globos; la moqueta con confeti y serpentinas por el suelo; y confeti que cae.
//     La mesa de delante (x 0–94, tablero en y 141; quien está detrás se planta en x 50) con su ordenador, la jamba derecha y el confeti de primer término van en anuncioDelante.
//     Cámara 'tele': un salón de 1985: papel pintado de rayas y zócalo de madera, la ventana con visillos y cortinas
//     naranjas a la calle (casas de enfrente, un árbol que se mece, un coche que pasa, nubes), un cuadro, la lámpara de
//     pie, el sofá de pana con cojines y una manta de ganchillo, la alfombra, y el televisor de mueble (pantalla x 202–252,
//     y 88–124) con su antena de cuernos: echa la telenovela (dos figuras en un salón rosa que discuten, con cambios de
//     plano) y, con o.urgente, la interrumpe una franja roja que barre la pantalla y da paso al aviso de urgencia (un
//     triángulo con «!» que late y una lata en pictograma, sin letras), que tiñe el cuarto de su luz. La mesita baja con
//     la lata roja, el cuenco de palomitas y el mando va en anuncioDelante.
// Opciones: o.paño 0–1 (el paño que tapa la lata; 0 tapada, sube y sale volando hacia la derecha; por omisión 0);
//   o.destapada (sin paño: la lata nueva al descubierto, con su brillo y destellos); o.mantel 0–1 (alguien tira del
//   mantel hacia la derecha: el mantel se va y los vasos dan un saltito; a 1 ya no está); o.banda (la lata lleva la
//   banda dorada: la vuelta de julio); o.julio (la rueda de prensa de julio: guirnaldas de banderines por la cortina);
//   o.flashes 0–1 (cuántos flashes, 0.6 por omisión; 0 ninguno); o.puerta 0–1 (la puerta de la oficina, abierta por
//   omisión 1); o.urgente 0–1 (0 telenovela; de 0 a 0.3 barre la franja roja; luego el aviso).
// Devuelve { suelo, ... } con las posiciones que necesitan las escenas (ver cada encuadre).
export function anuncio(R, t, o = {}) {
  const enc = o.encuadre ?? 'prensa', cam = o.camara ?? 'general';
  if (enc === 'rival') return cam === 'tele' ? c_tele(R, t, o) : c_rival(R, t, o);
  return cam === 'atril' ? c_atril(R, t, o) : c_prensa(R, t, o);
}
// lo de delante de los personajes en cada encuadre de anuncio(); se llama después de los actores, con las mismas opciones:
// 'prensa' general: el atril (x 238–262, tablero en y 110) con sus micrófonos, la primera fila del foso (cabezas de
// espaldas en y 168–180, cámaras alzadas con flash) y las dos cámaras de tele en sus trípodes (x 2–34 y x 286–318), y el
// destello de los flashes (solo sobre el foso y la mesa, nunca la pantalla entera); 'prensa' 'atril': el atril grande
// con el ramillete de micrófonos (x 186–246) y las
// cámaras de los fotógrafos que asoman por abajo; 'rival': la mesa de delante (x 0–94, tablero en y 141), la jamba y la
// pared lateral derecha (x ≥ 306) y el confeti de primer término; 'rival' 'tele': la mesita baja (x 120–178, tablero en
// y 150) con la lata roja, las palomitas y el mando.
export function anuncioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'prensa', cam = o.camara ?? 'general';
  if (enc === 'rival') { if (cam === 'tele') c_teleDelante(R, t, o); else c_rivalDelante(R, t, o); }
  else if (cam === 'atril') c_atrilDelante(R, t, o);
  else c_prensaDelante(R, t, o);
  return {};
}
// ── D · La rebelión ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Todos devuelven { suelo, … } con la geometría.
//   'centralita': la centralita de atención de la empresa en 1985: techo de placas acústicas con fluorescentes (uno
//     parpadea), la pared beis con el tablero negro del contador de llamadas en cifras ámbar (o.llamadas: el número; por
//     omisión sube de 400 a 1500 en los primeros 6 s), el reloj de pared, dos ventanas con persianas venecianas a los
//     rascacielos de Atlanta (nubes que pasan), el corcho con cartas, la puerta, los archivadores y la fuente de agua que
//     hace burbujas. Al fondo, una fila de cubículos con operadoras pequeñas con cascos que contestan y una fila media de
//     mesas con operadoras y teléfonos que parpadean; de vez en cuando sale un bocadillo con «!», un corazón roto o la foto
//     de un abuelo con su botella. A la derecha, la montaña de sacos de cartas (o.sacos, 0–8; 6 por omisión) con el carro
//     de correos, y alguna carta que resbala. o.corazones: la versión de «gracias» (los bocadillos y el corcho con
//     corazones enteros, el tablero con un corazón). La mesa de delante con sus teléfonos va en rebelionDelante.
//     Cámara 'cartas': la mesa de cartas de cerca: detrás, la pared con el corcho lleno de cartas con dibujos, la estantería
//     de archivadores, la ventana con persiana y los sacos en el suelo; la mesa entera (con las cartas abiertas: un dodo,
//     corazones rotos, una lata tachada, el abuelo con la botella; sobres con sellos, la taza que humea, el abrecartas y
//     un teléfono) va en rebelionDelante, que cada pocos segundos deja caer otra carta en el montón. o.corazones como arriba.
//   'calle': una calle de Seattle en 1985 con lluvia ligera: cielo encapotado tramado con nubes grises de tres tonos a tres
//     velocidades y gaviotas, la Space Needle y los rascacielos en la bruma, el edificio de ladrillo con la escalera de
//     incendios, la tienda de ultramarinos con el toldo y el escaparate de latas (o.estanteRojo 0–1: cuánto queda en la
//     balda roja; la azul sigue llena), la cafetería, la cabina de teléfono, la calle que cruza al fondo con una
//     manifestación pequeña de paraguas y cartelitos que pasa, dos pancartas apoyadas en la pared (PIEZAS_NC.pancarta),
//     la furgoneta de la tele local con su mástil y la cámara en el trípode con la luz roja, la alcantarilla del
//     bordillo, charcos con ondas y reflejos, un coche que pasa salpicando y el camión de reparto aparcado. o.lluvia 0–1.
//     rebelionDelante pinta las gotas de delante de los personajes y las salpicaduras de la acera.
//     Cámara 'sotano': un sótano de 1985: las vigas del techo con tuberías, paredes de bloques de hormigón con manchas de
//     humedad, el ventanuco a ras de calle con la lluvia y los pies que pasan, la escalera de madera que baja desde la
//     izquierda (con la lavadora y el calentador debajo), la bombilla que se mece con su cono de luz, el tablero de
//     herramientas, la estantería con botes de pintura, y torres de cajas de latas rojas (PIEZAS_NC.cajaLatas) hasta el
//     techo; la torre del centro se tambalea con o.tambalea (0–1) y o.cajas (5–9; 7 por omisión) dice cuántas tiene.
export function rebelion(R, t, o = {}) {
  const enc = o.encuadre ?? 'centralita', cam = o.camara ?? 'general';
  if (enc === 'calle') return cam === 'sotano' ? d_sotanoRb(R, t, o) : d_calleRb(R, t, o);
  return cam === 'cartas' ? d_cartasRb(R, t, o) : d_centralitaRb(R, t, o);
}
// lo de delante de los personajes en cada encuadre de rebelion(); se llama después de los actores, con las mismas
// opciones. 'centralita': la mesa larga de formica de delante (x 0–236, el tablero en y 146–153; quien está detrás, con los pies en y 150, enseña cabeza, hombros y pecho) con tres teléfonos
// (PIEZAS_NC.telefono; o.suenan: true por omisión; o.saltan 0–1: el gag de los teléfonos que saltan de la mesa, cada
// vez más alto y torcidos), los papeles, la taza y el fichero giratorio. 'cartas': la mesa de cartas entera (de y 96
// abajo). 'calle': las gotas que caen delante y las salpicaduras. 'sotano': nada. Devuelve { telefonos: [[x, y], …] }
// (centralita: el centro de la base de cada teléfono) o { pila: [x, y] } (cartas: dónde cae la carta nueva).
export function rebelionDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'centralita', cam = o.camara ?? 'general';
  if (enc === 'calle') { if (cam !== 'sotano') d_lluviaRb(R, t, o.lluvia ?? 1, 2); return {}; }
  return cam === 'cartas' ? d_mesaCartasRb(R, t, o) : d_mesaCentralitaRb(R, t, o);
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría del
// encuadre (ver «geometría» en cada auxiliar). LO DE DELANTE va en hoyDelante(R, t, o), que se llama DESPUÉS de los actores
// con las mismas opciones.
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom, de día. General: papel pintado de rayas con su friso de
//     madera, la ventana con cortinas a la ciudad (cielo tramado, nubes de tres tonos a tres velocidades, rascacielos con
//     ventanas, un árbol que se mece, pájaros y un coche que pasa), el gato en el alféizar, el radiador, el cuadro, el
//     reloj que anda, el corcho con notas y una gráfica, la lámpara de techo que se balancea, la estantería de libros con
//     la planta colgante, la radio, un tarro de azucarillos y una botella recta antigua, la puerta de la derecha, el
//     escritorio con el flexo, la taza que humea, el monitor con una gráfica que cambia y las dos latas (roja y azul);
//     suelo de tablas con la alfombra y la mancha de sol con motas. hoyDelante: la planta grande de la izquierda y la
//     caja de latas de la derecha. Cámara 'mesa': el escritorio de cerca (todo él en hoyDelante, para que quien esté
//     detrás asome cabeza y hombros): las latas grandes (s 2), el azucarero, la taza, la libreta, el flexo con su cono de
//     luz; detrás, la ventana con el árbol, el corcho y la estantería.
//     o.latas (true): pinta las dos latas del escritorio; o.espuma 0–1: la lata roja suelta espuma (en 'mesa', con el
//     charco que crece en la mesa); o.lataX: x de la lata roja grande en 'mesa' (168).
//   'escaner': el laboratorio de neurociencia de Houston (Texas) en 2004, sin ningún logotipo: la sala del escáner con
//     el techo de placas y sus luces, paredes de paneles acústicos perforados, la puerta blindada con su ventanuco y la
//     luz roja de «en uso», pictogramas de imán y de «sin metal», la máquina de resonancia grande (carcasa blanca con la
//     franja azul, el túnel iluminado, el ruido que la hace vibrar), la camilla con el voluntario tapado con una manta (la
//     cabeza dentro del túnel; solo asoman los calcetines, que se mueven), la bomba de jeringas en su pie con el tubito
//     que lleva a la boca (gotas de refresco que corren por él), los cascos colgados, el panel de oxígeno, el intercomunicador,
//     la ventana a la sala de control (dos monitores con cerebros y el técnico de fondo) y el suelo de vinilo con la
//     línea amarilla de seguridad. hoyDelante: el carrito de primer plano a la derecha.
//     o.zonas 0–1: se encienden las zonas del cerebro del monitor derecho (el izquierdo, o.zonasIzq); o.tumbado (true):
//     el voluntario en la camilla; o.bebe 0–1: el refresco corre por el tubito (por omisión, gotas lentas); o.ruido:
//     la máquina vibra (rayitas de sonido).
//     Cámara 'pantalla': la sala de control: la pantalla grande con dos cerebros (PIEZAS_NC.cerebro, s 3) y, debajo de
//     cada uno, lo que bebía (o.marcaIzq / o.marcaDer: 'vaso' | 'rojo' | 'azul'; por omisión 'vaso' y 'rojo'), con la
//     retícula y la señal que corre; o.zonas (cerebro derecho) y o.zonasIzq; la ventana a la sala del escáner, el rack
//     de equipos con sus luces, la mesa con el teclado beige, el monitor de tubo con su salvapantallas, la torre, la
//     taza que humea, los papeles, el teléfono y la silla.
//   'aula': un aula de una escuela de negocios de hoy: pared de bloques pintados, fluorescentes, el proyector, la
//     pizarra verde con los dibujos de tiza (la lata con su X, la flecha, el corazón con la regla, una gráfica que baja y
//     el 1985), el atril con el portátil, el reloj, la ventana al campus y las gradas a la derecha con estudiantes
//     pequeños de fondo que teclean, levantan la mano o bostezan (pantallas que brillan). hoyDelante: la mesa de la
//     primera fila (los estudiantes del elenco se sientan detrás y asoman cabeza y hombros).
//     o.x 0–1: la X de tiza que tacha la lata (por omisión, 1); o.regla 0–1: la regla que llega al corazón (1).
//     Cámara 'pizarra': la pizarra de cerca con los mismos dibujos grandes, la repisa con tizas y borrador, el polvo de
//     tiza en el rayo de sol; o.x y o.regla como arriba, o.corazon 0–1: el corazón se dibuja (1).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'escaner') return cam === 'pantalla' ? e_pantalla(R, t, o) : e_escaner(R, t, o);
  if (enc === 'aula') return cam === 'pizarra' ? e_pizarra(R, t, o) : e_aula(R, t, o);
  return cam === 'mesa' ? e_mesa(R, t, o) : e_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'escaner') return cam === 'pantalla' ? {} : e_escanerDelante(R, t, o);
  if (enc === 'aula') return cam === 'pizarra' ? {} : e_aulaDelante(R, t, o);
  return cam === 'mesa' ? e_mesaDelante(R, t, o) : e_estudioDelante(R, t, o);
}
// la paleta de Atlanta: chapa del techo, papel pintado, caoba, tablas, llamas de gas, cristal, espejo, frascos, la calle,
// el acero de la cámara, el granito, el terciopelo
const AP = pal({
  techo: '#a39478', techoL: '#b2a386', techoS: '#8f8066', cornisa: '#5a3222', cornisaL: '#7c4c30', cornisaS: '#3a1e14',
  papel: '#3c5240', papelL: '#486048', papelS: '#324638', papelD: '#283a2e',
  caoba: '#6e3a22', caobaL: '#8c5030', caobaS: '#4c2616', caobaD: '#2c140c', nogal: '#7a5232', nogalL: '#9a6c40', nogalS: '#563820', nogalD: '#3a2414',
  tabla1: '#8e6a44', tabla2: '#7c5c3a', tabla3: '#9a7650', junta: '#4a3220', tablaS: '#5e4428', sol: '#e8c890',
  llama: '#fff6c8', llamaM: '#ffc848', llamaS: '#e8782a', llamaA: '#5a8ae8', halo: '#ffe0a0',
  vidrio: '#9cbcc8', vidrioL: '#e0f0f4', vidrioS: '#6a8a96', espejo: '#76868e', espejoL: '#9cacb4', espejoS: '#56646c', espejoD: '#46525a',
  ambar: '#c87a2a', ambarS: '#8a4a18', ambarL: '#f0b060', verdeF: '#3e8a52', verdeFS: '#24603a', verdeFL: '#78c088', azulF: '#3a64b0', azulFS: '#22407a', azulFL: '#7aa0e0',
  rojoF: '#b83c34', rojoFS: '#7a2420', rojoFL: '#e87868', loza: '#ece6d8', lozaS: '#b8b0a0', etiqueta: '#f6f0e0', latonL: '#f0d878',
  marmolV: '#c8c0b2', marmolL: '#f2ece2', hoja: '#5a8a3a', hojaS: '#3a6024', nuez: '#8a5a30', nuezS: '#5a3a1e', gato: '#3a3238', gatoL: '#5a5058',
  cielo0: '#7ab4e4', cielo1: '#94c4ec', cielo2: '#b4d6f2', cielo3: '#d0e6f6', nube: '#ffffff', nubeM: '#e2ecf6', nubeS: '#b4c6da',
  lejos: '#9aa8ba', lejosS: '#8a98aa', ladrillo: '#a4563c', ladrilloS: '#7c3c2a', ladrilloL: '#bc6c4c', estuco: '#d8c8a4', estucoS: '#b4a482',
  tierra: '#a88a62', tierraS: '#8c6e4a', tierraL: '#bea27a', tablon: '#8a6a48', toldo1: '#c84a3a', toldo2: '#ece0c8', toldoV: '#4a7a4a',
  caballo: '#7a4a2a', caballoS: '#52301a', caballoL: '#9a6440', crin: '#2e1e14', coche: '#24242c', cocheL: '#46465a', rueda: '#b8902c',
  ropa1: '#2e3448', ropa2: '#5a3a4a', ropa3: '#3a4a3a', ropa4: '#7a6a4a', vestido1: '#7a3a5a', vestido2: '#3a5a7a', piel: '#f0c8a0',
  acero: '#8c95a2', aceroL: '#b6bfcc', aceroLL: '#e2e8f0', aceroS: '#68707e', aceroD: '#424854', aceroK: '#2a2e38',
  granito: '#6a6470', granitoL: '#7a7480', granitoS: '#58525e', granitoD: '#3e3946', interior: '#e8c888', interiorS: '#a8844c', interiorD: '#5a4428',
  verdeL: '#2e8a52', verdeLS: '#1c5e36', verdeLL: '#6cd08e', luzV: '#e8f0c0', terciopelo: '#8a1c2a', terciopeloS: '#5a1018', terciopeloL: '#b83444',
  granate: '#6a2626', granateL: '#7c3030', granateS: '#561e1e', pergamino: '#e8d8b0', pergaminoS: '#c8b48a', tinta: '#4a3a2a',
  oroM: '#d8a840', oroMS: '#9a7020', oroML: '#f8e090', mula: '#8a7a6a', mulaS: '#5a4e42', tranvia: '#c8a048', tranviaS: '#8a6a24', tranviaV: '#3a6a4a',
  museo: '#2a3040', museoL: '#3a4256', museoS: '#20242e', panel: '#d8d2c4', panelS: '#a8a294', foco: '#fff2c8',
});

// la capa fija de un encuadre: se pinta una sola vez por lienzo en un búfer de R.nuevo() y en cada fotograma se copia entera
const a_CAPAS = new WeakMap();

function a_capa(R, clave, dibuja) {
  let m = a_CAPAS.get(R); if (!m) a_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function a_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function a_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// la trama de Bayer 4×4 (0–1) para degradados y halos en escalones de píxel
const a_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_bayer = (x, y) => a_BAYER[(y & 3) * 4 + (x & 3)];

// un halo de luz tramado: tiñe hacia col lo que ya está pintado alrededor de (cx, cy), más fuerte en el centro
function a_halo(R, cx, cy, r, col, f, ry = r) {
  for (let j = -ry; j <= ry; j++) for (let i = -r; i <= r; i++) {
    const d = Math.hypot(i / r, j / ry); if (d >= 1) continue;
    const x = cx + i, y = cy + j, a = f * (1 - d) * (1 - d);
    if (a * 3 < a_bayer(x, y)) continue;
    R.pset(x, y, a_mezcla(R.pget(x, y), col, Math.min(0.6, 0.12 + a * 0.6)));
  }
}

// la llamita de una lámpara de gas (base azul, cuerpo amarillo, punta que tiembla); (x, y) es su base
function a_llama(R, x, y, t, k = 0, s = 1) {
  const f = Math.sin(t * 13 + k * 2.1) + Math.sin(t * 7.3 + k * 1.3), alto = 4 + (f > 0.7 ? 1 : 0) + (s > 1 ? 2 : 0), sw = Math.sin(t * 9 + k) > 0.4 ? 1 : 0;
  R.pset(x, y, AP.llamaA); R.pset(x - 1, y, AP.llamaS); R.pset(x + 1, y, AP.llamaS);
  for (let j = 1; j < alto; j++) { const w = j < alto - 2 ? 1 : 0, dx = j >= alto - 2 ? sw : 0; for (let i = -w; i <= w; i++) R.pset(x + i + dx, y - j, i === 0 && j < alto - 1 ? AP.llama : AP.llamaM); }
  R.pset(x + sw, y - alto, AP.llamaS);
}

// cifras diminutas de 3 × 5 (para las placas de las cajas de seguridad y la registradora)
const a_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function a_cifra(R, n, x, y, c) { String(n).split('').forEach((d, i) => { const m = a_DIG[+d]; if (m) for (let k = 0; k < 15; k++) if (m[k] === '1') R.pset(x + i * 4 + (k % 3), y + Math.floor(k / 3), c); }); }

// el cielo de 1886 dentro de un hueco cl (con R.recorte ya puesto): degradado tramado, nubes de tres tonos a tres
// velocidades y una bandada de pájaros; y0–y1, la altura que ocupa el cielo
function a_cielo(R, cl, t, y0, y1) {
  const ys = Math.max(cl[1], y0), ye = Math.min(cl[3], y1), CI = [AP.cielo0, AP.cielo1, AP.cielo2, AP.cielo3];
  for (let y = ys; y <= ye; y++) for (let x = cl[0]; x <= cl[2]; x++) { const f = (y - y0) / Math.max(1, y1 - y0) * 3 + a_bayer(x, y) - 0.5; R.pset(x, y, CI[Math.max(0, Math.min(3, Math.round(f)))]); }
  for (let k = 0; k < 7; k++) {
    const v = [1.1, 2.3, 3.6][k % 3], w = 10 + Math.floor(h(k, 3, 9) * 12), x = ((h(k, 1, 9) * 420 + t * v) % 420) - 60, y = y0 + 4 + Math.floor(h(k, 2, 9) * Math.max(4, (y1 - y0) * 0.55));
    for (let i = 0; i <= w; i += 4) { const r = 2 + Math.round(Math.sin((i / w) * Math.PI) * (2 + (k % 3))); R.disco(x + i, y + 1, r, AP.nubeS); }
    for (let i = 0; i <= w; i += 4) { const r = 2 + Math.round(Math.sin((i / w) * Math.PI) * (2 + (k % 3))); R.disco(x + i, y, r, AP.nubeM); R.disco(x + i - 1, y - 1, Math.max(1, r - 1), AP.nube); }
  }
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 11 + k * 23) % 260) - 30), y = Math.round(y0 + 6 + k * 3 + Math.sin(t * 1.5 + k) * 2), a = Math.floor(t * 6 + k) % 2;
    R.pset(x, y, AP.crin); R.pset(x - 1, y - a, AP.crin); R.pset(x + 1, y - a, AP.crin); R.pset(x - 2, y - 1 + a, AP.crin); R.pset(x + 2, y - 1 + a, AP.crin); }
}

// un paseante pequeño de 1886 (10–12 px) visto de lado: señor de chistera o bombín con levita, o señora con polisón,
// sombrerito y sombrilla; (x, yb) los pies
function a_paseante(R, x, yb, t, k, dir = 1) {
  const p = Math.floor(t * 5 + k) % 2, ropa = [AP.ropa1, AP.ropa2, AP.ropa3, AP.ropa4][k % 4];
  if (k % 2) {   // señora: falda larga en campana con polisón detrás, cintura, sombrero con pluma y sombrilla
    const col = k % 4 === 1 ? AP.vestido1 : AP.vestido2;
    for (let j = 0; j < 6; j++) R.rect(x - 2 - (j >> 1), yb - 6 + j, x + 2 + (j >> 1), yb - 6 + j, col);
    R.rect(x - 2 * dir - (dir < 0 ? 0 : 1), yb - 7, x - 2 * dir + (dir < 0 ? 1 : 0), yb - 4, col); R.rect(x - 1, yb - 9, x + 1, yb - 7, col); R.rect(x - 1, yb - 1, x + 3, yb - 1, a_mezcla(col, 0xff000000, 0.35));
    R.rect(x - 1, yb - 11, x + 1, yb - 10, AP.piel); R.rect(x - 2, yb - 12, x + 2, yb - 12, AP.crin); R.pset(x - dir, yb - 13, AP.toldo1);
    R.linea(x + 2 * dir, yb - 8, x + 3 * dir, yb - 14, AP.crin); R.rect(x + dir - 2, yb - 15, x + dir + 6, yb - 15, AP.etiqueta); R.rect(x + dir - 1, yb - 16, x + dir + 5, yb - 16, AP.etiqueta);
  } else {   // señor: levita, pantalón, chistera (o bombín) y bastón
    R.rect(x - 1, yb - 3, x - 1 + p, yb - 1, AP.crin); R.rect(x + 1 - p, yb - 3, x + 1, yb - 1, AP.crin);
    R.rect(x - 2, yb - 9, x + 2, yb - 4, ropa); R.pset(x - 2 * dir, yb - 4, ropa); R.rect(x - 1, yb - 11, x + 1, yb - 10, AP.piel);
    if (k % 4 === 0) { R.rect(x - 1, yb - 15, x + 1, yb - 12, AP.coche); R.rect(x - 2, yb - 12, x + 2, yb - 12, AP.coche); } else { R.rect(x - 1, yb - 13, x + 1, yb - 12, AP.coche); R.rect(x - 2, yb - 12, x + 2, yb - 12, AP.coche); }
    R.linea(x + 3 * dir, yb - 6, x + 3 * dir + p * dir, yb, AP.crin);
  }
}

// el coche de caballos de 1886 (un tílburi con capota): caballo al trote con crines y cola, varas, ruedas de radios que
// giran y el cochero de chistera; (x, yb): el morro del caballo y el suelo; dir 1 hacia la derecha
function a_coche(R, x, yb, t, dir = 1, k = 0) {
  const p = Math.floor(t * 8) % 4, X = (i) => x - i * dir, tro = [0, 1, 0, -1][p];
  // las patas del caballo (dos pares que alternan) y el cuerpo
  for (const [i, f] of [[4, 0], [6, 2], [13, 1], [15, 3]]) { const d = [0, 1, 0, -1][(p + f) % 4]; R.linea(X(i), yb - 7, X(i) + d * dir, yb - 1, AP.caballoS); R.pset(X(i) + d * dir, yb, AP.crin); }
  for (let j = 0; j < 5; j++) R.rect(Math.min(X(3), X(16)), yb - 12 + j - (tro > 0 ? 1 : 0), Math.max(X(3), X(16)), yb - 12 + j - (tro > 0 ? 1 : 0), j === 0 ? AP.caballoL : j === 4 ? AP.caballoS : AP.caballo);
  R.rect(Math.min(X(1), X(4)), yb - 18, Math.max(X(1), X(4)), yb - 12, AP.caballo); R.rect(Math.min(X(-2), X(2)), yb - 19, Math.max(X(-2), X(2)), yb - 16, AP.caballo); R.pset(X(-2), yb - 16, AP.caballoS);
  R.linea(X(3), yb - 19, X(5), yb - 12, AP.crin); R.pset(X(2), yb - 20, AP.crin); R.pset(X(0), yb - 18, AP.crin);
  R.linea(X(17), yb - 12, X(18), yb - 6 + tro, AP.crin); R.pset(X(18), yb - 11, AP.crin);
  // las varas, el pescante, la capota y el cochero
  R.linea(X(5), yb - 10, X(26), yb - 10, AP.coche);
  R.rect(Math.min(X(19), X(31)), yb - 15, Math.max(X(19), X(31)), yb - 9, AP.coche); R.rect(Math.min(X(19), X(31)), yb - 15, Math.max(X(19), X(31)), yb - 15, AP.cocheL);
  for (let j = 0; j < 7; j++) R.rect(Math.min(X(26 - j * 0.3), X(33)), yb - 22 + j, Math.max(X(26 - j * 0.3), X(33)), yb - 22 + j, j ? AP.coche : AP.cocheL);
  R.rect(Math.min(X(20), X(22)), yb - 21, Math.max(X(20), X(22)), yb - 16, [AP.ropa1, AP.ropa3][k % 2]); R.rect(Math.min(X(20), X(22)), yb - 23, Math.max(X(20), X(22)), yb - 22, AP.piel);
  R.rect(Math.min(X(20), X(22)), yb - 27, Math.max(X(20), X(22)), yb - 24, AP.coche); R.rect(Math.min(X(19), X(23)), yb - 24, Math.max(X(19), X(23)), yb - 24, AP.coche);
  R.linea(X(19), yb - 19, X(4), yb - 15, AP.crin);   // las riendas
  // la rueda grande de radios que gira
  const rx = X(27), ry = yb - 6, a0 = (t * 6) * dir;
  R.disco(rx, ry, 6, AP.coche); R.disco(rx, ry, 5, AP.tierraS);
  for (let s = 0; s < 4; s++) { const a = a0 + s * Math.PI / 4; R.linea(Math.round(rx - Math.cos(a) * 5), Math.round(ry - Math.sin(a) * 5), Math.round(rx + Math.cos(a) * 5), Math.round(ry + Math.sin(a) * 5), AP.rueda); }
  R.disco(rx, ry, 1, AP.coche);
}

// el tranvía de mulas de los 1890: la mula al paso tirando del coche verde y amarillo con ventanillas, viajeros dentro y
// la plataforma con el cochero; (x, yb): el morro de la mula y el carril
function a_tranvia(R, x, yb, t, dir = 1) {
  const p = Math.floor(t * 5) % 4, X = (i) => x - i * dir, L = (a, b) => [Math.min(X(a), X(b)), Math.max(X(a), X(b))];
  for (const [i, f] of [[3, 0], [5, 2], [11, 1], [13, 3]]) { const d = [0, 1, 0, -1][(p + f) % 4]; R.linea(X(i), yb - 6, X(i) + d * dir, yb - 1, AP.mulaS); }
  { const [a, b] = L(2, 14); R.rect(a, yb - 11, b, yb - 6, AP.mula); R.rect(a, yb - 11, b, yb - 11, a_mezcla(AP.mula, 0xffffffff, 0.2)); }
  { const [a, b] = L(-1, 2); R.rect(a, yb - 15, b, yb - 10, AP.mula); } R.pset(X(1), yb - 17, AP.mulaS); R.pset(X(0), yb - 17, AP.mulaS); R.pset(X(15), yb - 9, AP.mulaS);
  R.linea(X(14), yb - 8, X(18), yb - 8, AP.crin);
  { const [a, b] = L(18, 58); R.rect(a, yb - 21, b, yb - 4, AP.tranvia); R.rect(a, yb - 23, b, yb - 22, AP.tranviaV); R.rect(a + 2, yb - 25, b - 2, yb - 24, AP.tranviaS); R.rect(a, yb - 8, b, yb - 4, AP.tranviaV); R.rect(a, yb - 4, b, yb - 4, AP.tranviaS);
    for (let w = a + 4; w < b - 4; w += 7) { R.rect(w, yb - 19, w + 4, yb - 12, AP.vidrioS); R.rect(w, yb - 19, w + 4, yb - 19, AP.vidrioL); if (h(w, 7, Math.floor(t)) > 0.3) { R.rect(w + 1, yb - 15, w + 3, yb - 12, AP.ropa1); R.rect(w + 1, yb - 17, w + 3, yb - 16, AP.piel); } }
    for (const wx of [a + 6, b - 6]) { R.disco(wx, yb - 2, 2, AP.coche); R.pset(wx, yb - 2, AP.rueda); } }
}

// la calle de Atlanta en 1886 vista por un hueco cl (puerta, escaparate o ventana) con R.recorte ya puesto: cielo,
// tejados lejanos, la acera de enfrente con fachadas de ladrillo y estuco, cornisas, ventanas de arco, toldos a rayas,
// farolas de gas, postes de telégrafo con sus cables, la calle de tierra con rodadas, paseantes y un coche de caballos
// (o el tranvía de mulas con o.tranvia); base: la línea donde las fachadas tocan su acera
function a_calle(R, cl, t, base, o = {}) {
  const top = base - 46, rc = (x0, y0, x1, y1, c) => a_rc(R, cl, x0, y0, x1, y1, c), Rc = Object.create(R); Rc.rect = rc;
  a_cielo(R, cl, t, cl[1] - 4, top + 12);
  // los tejados lejanos, azulados, con la torre de una iglesia
  for (let x = cl[0]; x <= cl[2]; x++) { const hh = 6 + Math.floor(h(Math.floor((x + 400) / 9), 1, 7) * 8); for (let y = top + 10 - hh; y <= top + 12; y++) R.pset(x, y, (x + y) % 7 ? AP.lejos : AP.lejosS); }
  rc(118, top - 12, 121, top + 2, AP.lejosS); R.poligono([[116, top - 12], [123, top - 12], [119.5, top - 22]], AP.lejosS);
  // las fachadas de enfrente, por bloques
  let x = -60, i = 0;
  while (x < 330) {
    const w = 22 + Math.floor(h(i, 4, 7) * 12), alto = 30 + Math.floor(h(i, 5, 7) * 14), lad = h(i, 6, 7) < 0.6, yt = base - alto;
    if (x + w >= cl[0] && x <= cl[2]) {
      const c = lad ? AP.ladrillo : AP.estuco, cS = lad ? AP.ladrilloS : AP.estucoS;
      for (let y = Math.max(yt, cl[1]); y <= Math.min(base, cl[3]); y++) for (let xx = Math.max(x, cl[0]); xx <= Math.min(x + w - 1, cl[2]); xx++) {
        let col = c; if (lad && (y % 3 === 0 || (xx + (Math.floor(y / 3) % 2) * 3) % 6 === 0)) col = cS; else if (!lad && h(xx, y, 3) > 0.9) col = cS; if (xx === x + w - 1) col = cS; R.pset(xx, y, col);
      }
      rc(x - 1, yt - 2, x + w, yt, AP.cornisaS); rc(x - 1, yt - 3, x + w, yt - 3, AP.estuco); for (let d = x; d < x + w; d += 3) R.pset(d, yt + 1, AP.cornisaS);
      // dos pisos de ventanas de arco con su alféizar
      for (let f = 0; f < 2; f++) for (let v = x + 4; v < x + w - 5; v += 8) { const vy = yt + 6 + f * 11; if (vy + 8 > base - 12) continue; rc(v, vy + 1, v + 3, vy + 7, AP.coche); R.pset(v + 1, vy, AP.coche); R.pset(v + 2, vy, AP.coche); rc(v, vy + 1, v + 1, vy + 3, AP.vidrioS); rc(v - 1, vy + 8, v + 4, vy + 8, AP.estuco); }
      // la planta baja: escaparate y toldo a rayas
      const tc = [AP.toldo1, AP.toldoV, AP.ladrilloS][i % 3]; rc(x + 2, base - 11, x + w - 3, base, AP.coche); rc(x + 3, base - 10, x + w - 4, base - 3, AP.vidrioS); rc(x + 3, base - 10, x + 6, base - 7, AP.vidrio);
      for (let xx = x + 1; xx < x + w - 1; xx++) { const cc = Math.floor((xx - x) / 2) % 2 ? tc : AP.toldo2; R.pset(xx, base - 13, cc); R.pset(xx, base - 12, cc); if (xx % 2) R.pset(xx, base - 11, cc); }
      for (let k = 0; k < 2; k++) rc(x + 5 + k * 6, base - 7, x + 8 + k * 6, base - 4, [AP.ambar, AP.rojoF, AP.verdeF][(i + k) % 3]);   // la mercancía del escaparate
    }
    x += w; i++;
  }
  // la acera de tablones de enfrente
  rc(cl[0], base + 1, cl[2], base + 3, AP.tablon); for (let xx = cl[0]; xx <= cl[2]; xx += 5) R.pset(xx, base + 2, AP.junta); rc(cl[0], base + 4, cl[2], base + 4, AP.junta);
  // la calle de tierra con rodadas, charcos y piedras
  const yc0 = base + 5, yc1 = base + 24;
  for (let y = Math.max(yc0, cl[1]); y <= Math.min(yc1, cl[3]); y++) for (let xx = cl[0]; xx <= cl[2]; xx++) {
    const r = h(xx >> 1, y, 5); let col = (y - yc0) % 7 === 3 ? AP.tierraS : r > 0.85 ? AP.tierraL : r < 0.12 ? AP.tierraS : AP.tierra; if (y > yc0 + 14 && (xx + y * 3) % 23 === 0) col = AP.tierraS; R.pset(xx, y, col);
  }
  if (o.tranvia) { for (const yy of [yc0 + 9, yc0 + 11]) R.linea(cl[0], yy, cl[2], yy, AP.aceroS); for (let xx = cl[0] - cl[0] % 4; xx <= cl[2]; xx += 4) { R.pset(xx, yc0 + 10, AP.junta); } }
  // farolas de gas de la acera de enfrente
  for (const fx of [-6, 64, 134, 204, 274]) if (fx >= cl[0] - 4 && fx <= cl[2] + 4) {
    R.linea(fx, base + 3, fx, base - 16, AP.coche); R.pset(fx - 1, base + 3, AP.coche); R.pset(fx + 1, base + 3, AP.coche); R.linea(fx - 2, base - 17, fx + 2, base - 17, AP.coche);
    R.disco(fx, base - 20, 2, AP.vidrioL); R.pset(fx, base - 20, AP.llamaM); R.linea(fx - 2, base - 23, fx + 2, base - 23, AP.coche); R.pset(fx, base - 24, AP.coche);
  }
  // los postes de telégrafo con sus cables, que se mecen un poco
  const sw = Math.sin(t * 0.8) * 0.6;
  for (const px of [30, 170]) { R.linea(px, base + 3, px, top - 4, AP.caobaS); R.linea(px - 4, top - 2, px + 4, top - 2, AP.caobaS); R.linea(px - 3, top + 1, px + 3, top + 1, AP.caobaS); }
  for (const dy of [-2, 1]) for (let xx = cl[0]; xx <= cl[2]; xx++) { const u = ((xx - 30) % 140 + 140) % 140 / 140; R.pset(xx, Math.round(top + dy + Math.sin(u * Math.PI) * (5 + sw)), AP.caobaD); }
  // paseantes por la acera de enfrente y un coche de caballos (o el tranvía) por la calle
  for (let k = 0; k < 3; k++) { const v = 4 + k * 1.3, d = k % 2 ? -1 : 1, px = Math.round(d > 0 ? ((t * v + k * 70) % 260) - 30 : 230 - ((t * v + k * 70) % 260)); a_paseante(Rc, px, base + 2, t, k + (o.k ?? 0), d); }
  if (o.tranvia) { const u = (t % 22) / 22, d = 1; a_tranvia(Rc, Math.round(-70 + u * 380), yc0 + 11, t, d); }
  else { const n = Math.floor(t / 12), u = (t % 12) / 12, d = n % 2 ? -1 : 1, px = Math.round(d > 0 ? -50 + u * 260 : 210 - u * 260); a_coche(Rc, px, yc0 + 15, t, d, n); }
  { const u = ((t + 3) % 15) / 15, px = Math.round(220 - u * 280); a_paseante(Rc, px, yc1 - 1, t, 5, -1); }   // alguien cruza la calle
}

// el zócalo de caoba con sus cuarterones en relieve (luz arriba a la izquierda), la vena de la madera y el rodapié
function a_zocalo(R, x0, x1, y0, y1, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const u = (x - x0) % 26, dy = y - y0; let c;
    if (dy <= 2) c = dy === 0 ? AP.caobaL : dy === 1 ? AP.caoba : AP.caobaS;
    else if (y >= y1 - 5) c = y === y1 - 5 ? AP.caobaS : AP.caobaD;
    else if (dy === 5 || y === y1 - 9) c = dy === 5 ? AP.caobaS : AP.caobaL;
    else if (dy > 5 && y < y1 - 9 && (u === 4 || u === 22)) c = u === 4 ? AP.caobaS : AP.caobaL;
    else if (dy > 6 && y < y1 - 10 && u > 4 && u < 22) c = h(x >> 3, y, k) > 0.75 ? AP.caobaL : (h(x, y >> 1, k + 1) > 0.9 ? AP.caobaS : AP.caoba);
    else c = h(x >> 2, y, k + 2) > 0.85 ? AP.caobaS : AP.caoba;
    R.pset(x, y, c);
  }
}

// el suelo de tablas en perspectiva (fuga en vx, vy): cada tabla con su tono, sus vetas, las juntas de testa y los clavos
function a_tablas(R, y0, y1, vx = 160, vy = 30, cols = [AP.tabla1, AP.tabla2, AP.tabla3]) {
  for (let y = y0; y <= y1; y++) {
    const e = (y - vy) / (y0 - vy), z = 900 / (y - vy), z1 = 900 / (y - 1 - vy);
    let prev = null;
    for (let x = 0; x < 320; x++) {
      const X = vx + (x - vx) / e, n = Math.floor((X + 2000) / 12);
      let c = cols[Math.floor(h(n, 1, 31) * cols.length)];
      const L = 6 + h(n, 2, 31) * 5, o0 = h(n, 3, 31) * L;
      if (prev !== null && n !== prev) c = AP.junta;
      else if (Math.floor((z + o0) / L) !== Math.floor((z1 + o0) / L)) c = AP.junta;
      else if (h(n, Math.floor(z * 2.5), 32) > 0.82) c = AP.tablaS;
      else if (h(x >> 1, y, 33) > 0.94) c = a_mezcla(c, AP.junta, 0.3);
      R.pset(x, y, c); prev = n;
    }
  }
}

// un tarro de botica de cristal o de loza, de pie sobre yb: tapa con pomo, cuerpo con brillo y la etiqueta en blanco
function a_tarro(R, x, yb, w, alto, tipo, k = 0) {
  const COLS = [[AP.ambar, AP.ambarS, AP.ambarL], [AP.verdeF, AP.verdeFS, AP.verdeFL], [AP.azulF, AP.azulFS, AP.azulFL], [AP.rojoF, AP.rojoFS, AP.rojoFL], [AP.loza, AP.lozaS, AP.marmolL]];
  const [c, cS, cL] = COLS[tipo % COLS.length], y0 = yb - alto + 2;
  R.rect(x, y0, x + w - 1, yb, cS); R.rect(x + 1, y0, x + w - 2, yb - 1, c); R.rect(x + 1, y0 + 1, x + 1, yb - 2, cL);
  R.rect(x + 1, y0 - 1, x + w - 2, y0 - 1, cS); R.rect(x + 2, y0 - 2, x + w - 3, y0 - 2, tipo === 4 ? AP.lozaS : cS); if (w > 4) R.pset(x + (w >> 1), y0 - 3, cS);
  if (alto > 7 && w > 4) { const ly = y0 + Math.floor(alto * 0.35); R.rect(x + 1, ly, x + w - 2, ly + 2, AP.etiqueta); R.rect(x + 1, ly + 3, x + w - 2, ly + 3, tipo === 4 ? AP.rojoFS : AP.lozaS); }
}

function a_farmaciaFija(R) {
  const { rect, pset, disco, linea, poligono } = R;
  // el techo de chapa repujada (placas de 16 con su roseta), de poco contraste
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) { const u = x % 16, v = (y + 4) % 16, d = Math.abs(u - 8) + Math.abs(v - 8);
    pset(x, y, u === 0 || v === 0 ? AP.techoS : d === 5 ? (u + v < 16 ? AP.techoL : AP.techoS) : d < 2 ? AP.techoL : AP.techo); }
  // la cornisa con dentículos
  rect(0, 16, 319, 16, AP.cornisaL); rect(0, 17, 319, 18, AP.cornisa); for (let x = 0; x < 320; x++) pset(x, 19, x % 4 < 2 ? AP.cornisaS : AP.cornisa); rect(0, 20, 319, 20, AP.cornisa); rect(0, 21, 319, 21, AP.cornisaS); rect(0, 22, 319, 22, AP.caobaD);
  // el papel pintado verde con su damasco
  for (let y = 23; y < 96; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 23) / 14), u = (x + (fila % 2) * 6) % 12, v = (y - 23) % 14, m = Math.abs(u - 6) / 3 + Math.abs(v - 7) / 5.5, n = Math.abs(u - 6) / 1.4 + Math.abs(v - 7) / 2.6;
    pset(x, y, n < 1 ? AP.papel : m < 1 ? AP.papelL : u === 0 ? AP.papelS : (y < 26 ? AP.papelD : AP.papel));
  }
  a_zocalo(R, 0, 319, 96, 127, 1);
  a_tablas(R, 128, 179);
  // la sombra de la pared en el suelo y la mancha de sol del escaparate, con la sombra del parteluz
  for (let x = 0; x < 320; x++) { pset(x, 128, AP.junta); if (x % 2) pset(x, 129, a_mezcla(R.pget(x, 129), AP.junta, 0.5)); }
  for (let y = 130; y < 178; y++) { const d = y - 128, x0 = Math.round(48 + d * 0.9), x1 = Math.round(98 + d * 1.35), xm = Math.round(70 + d * 1.1);
    for (let x = x0; x <= x1; x++) if (Math.abs(x - xm) > 1 && a_bayer(x, y) < 0.62 - d * 0.006) pset(x, y, a_mezcla(R.pget(x, y), AP.sol, 0.42)); }

  // ── la puerta de la calle: marco, montante en abanico, el hueco del cristal, cuarterones, pomo y placa de latón ──
  rect(2, 36, 34, 127, AP.caobaS); rect(3, 37, 33, 127, AP.caoba); rect(3, 37, 33, 37, AP.caobaL);
  rect(6, 39, 30, 45, AP.vidrio); for (let k = 0; k < 5; k++) linea(18, 45, 6 + k * 6, 39, AP.caobaS); rect(6, 45, 30, 46, AP.caobaS);
  rect(5, 48, 31, 127, AP.nogal); rect(5, 48, 31, 48, AP.nogalL); rect(5, 48, 5, 127, AP.nogalL); rect(31, 48, 31, 127, AP.nogalS);
  rect(6, 49, 30, 49, AP.nogalS);   // (el hueco del cristal, 7–29 × 50–88, lo pinta cada fotograma)
  rect(6, 89, 30, 92, AP.nogal); rect(6, 92, 30, 92, AP.nogalS);
  for (const x of [7, 19]) { rect(x, 94, x + 10, 121, AP.nogalS); rect(x + 1, 95, x + 10, 121, AP.nogal); rect(x + 2, 96, x + 9, 120, AP.nogalL); rect(x + 3, 97, x + 9, 120, AP.nogal); for (let y = 98; y < 120; y += 3) pset(x + 4 + (y % 4), y, AP.nogalS); }
  rect(5, 122, 31, 127, AP.latonS); rect(5, 122, 31, 122, C.laton); for (let x = 7; x < 31; x += 4) pset(x, 125, AP.latonL);
  disco(28, 93, 1, C.laton); pset(27, 92, AP.latonL); rect(28, 96, 28, 99, AP.latonS);
  // ── el escaparate: marco, alféizar con su moldura (el cristal lo pinta cada fotograma) ──
  rect(38, 34, 96, 115, AP.caobaS); rect(39, 35, 95, 115, AP.caoba); rect(39, 35, 95, 35, AP.caobaL); rect(41, 37, 93, 37, AP.caobaS);
  rect(36, 109, 98, 110, AP.caobaL); rect(36, 111, 98, 112, AP.caoba); rect(36, 113, 98, 113, AP.caobaS); rect(38, 114, 96, 115, AP.caobaD);
  // ── el aplique de gas de la pared, con su brazo de latón y su tulipa ──
  rect(98, 56, 100, 60, AP.latonS); pset(99, 57, AP.latonL); linea(99, 55, 99, 50, C.laton); pset(98, 50, AP.latonS); pset(100, 50, AP.latonS);

  // ── la gran estantería de botica ──
  rect(100, 26, 210, 31, AP.caobaS); rect(100, 26, 210, 26, AP.caobaL); rect(100, 27, 210, 28, AP.caoba); for (let x = 100; x <= 210; x++) pset(x, 29, x % 3 ? AP.caoba : AP.caobaD); rect(100, 30, 210, 30, AP.caoba);
  // el frontón con su arco y una roseta
  for (let y = 19; y < 26; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((y - 26) / 7) ** 2)) * 12); rect(155 - w, y, 155 + w, y, y === 19 ? AP.caobaL : AP.caoba); pset(155 - w, y, AP.caobaL); pset(155 + w, y, AP.caobaS); }
  disco(155, 23, 2, AP.caobaS); pset(154, 22, AP.caobaL);
  rect(107, 32, 203, 81, AP.nogalD); for (let x = 111; x < 203; x += 8) rect(x, 32, x, 81, AP.caobaD);
  for (const xp of [102, 204]) { rect(xp, 31, xp + 4, 127, AP.nogal); rect(xp, 31, xp, 127, AP.nogalL); rect(xp + 4, 31, xp + 4, 127, AP.nogalS); pset(xp + 2, 33, AP.nogalL); for (let y = 36; y < 112; y++) if (y % 2) pset(xp + 2, y, AP.nogalS); rect(xp - 1, 32, xp + 5, 34, AP.caoba); rect(xp - 1, 32, xp + 5, 32, AP.caobaL); }
  // las cuatro baldas con sus tarros de colores y de loza (con la etiqueta en blanco)
  for (let r = 0; r < 4; r++) {
    const yb = 43 + r * 12; let x = 108;
    while (x < 200) { const s = r * 40 + x, w = 5 + Math.floor(h(s, 1, 41) * 4), al = 7 + Math.floor(h(s, 2, 41) * 4); if (x + w > 202) break;
      if (h(s, 3, 41) < 0.08) { x += 3; continue; } a_tarro(R, x, yb, w, al, Math.floor(h(s, 4, 41) * 5), s); x += w + 1; }
    rect(107, yb + 1, 203, yb + 1, AP.nogalL); rect(107, yb + 2, 203, yb + 2, AP.nogalS);
  }
  // las cajoneras con su portaetiquetas y su tirador de latón
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { const x = 107 + c * 12, y = 83 + r * 11;
    rect(x, y, x + 11, y + 10, AP.nogalS); rect(x, y, x + 10, y + 9, AP.nogal); rect(x, y, x + 10, y, AP.nogalL); rect(x, y, x, y + 9, AP.nogalL);
    if (h(c, r, 43) > 0.6) rect(x + 2, y + 3, x + 9, y + 3, a_mezcla(AP.nogal, AP.nogalL, 0.5));
    rect(x + 3, y + 2, x + 7, y + 4, AP.latonS); rect(x + 4, y + 3, x + 6, y + 3, AP.etiqueta); disco(x + 5, y + 7, 1, C.laton); pset(x + 4, y + 6, AP.latonL); pset(x + 5, y + 9, AP.nogalD); }
  rect(102, 116, 208, 117, AP.caobaL); rect(102, 118, 208, 127, AP.caoba); rect(102, 123, 208, 127, AP.caobaD);
  // la barra de latón y la escalera de biblioteca apoyada
  rect(106, 35, 202, 35, C.laton); rect(106, 36, 202, 36, AP.latonS); for (const x of [108, 200]) rect(x, 33, x, 36, AP.latonS);
  for (const dx of [0, 6]) { linea(184 + dx, 35, 191 + dx, 127, AP.nogalS); linea(185 + dx, 35, 192 + dx, 127, AP.nogalL); }
  for (let y = 41; y < 126; y += 7) { const x0 = Math.round(185 + (y - 35) * 7 / 92); rect(x0 + 1, y, x0 + 5, y, AP.nogalL); rect(x0 + 1, y + 1, x0 + 5, y + 1, AP.nogalS); }
  rect(183, 33, 186, 35, AP.latonS); rect(189, 33, 192, 35, AP.latonS);
  // ── el reloj de péndulo (la esfera y el péndulo los mueve cada fotograma) ──
  rect(211, 27, 227, 29, AP.caobaS); rect(212, 26, 226, 26, AP.caobaL); rect(212, 30, 226, 72, AP.nogalS); rect(213, 30, 225, 71, AP.nogal); rect(213, 30, 213, 71, AP.nogalL);
  disco(219, 37, 6, AP.latonS); rect(215, 46, 223, 69, AP.nogalD); rect(215, 46, 223, 46, AP.vidrioS); rect(215, 46, 215, 69, AP.vidrioS); rect(214, 72, 224, 73, AP.caobaS); rect(217, 74, 221, 75, AP.caobaS);
  // ── el aparador de la fuente de soda ──
  rect(230, 46, 319, 55, AP.caoba); rect(230, 46, 319, 46, AP.caobaL); rect(230, 54, 319, 54, AP.caobaS); rect(230, 55, 319, 55, AP.caobaD);
  for (let x = 230; x < 320; x++) pset(x, 51, x % 3 ? AP.caoba : AP.caobaD);
  for (let x = 240; x < 312; x += 12) { disco(x, 48, 1, AP.caobaS); pset(x - 1, 47, AP.caobaL); }
  // el espejo con su marco dorado (los reflejos se mueven cada fotograma)
  rect(237, 57, 312, 93, AP.latonS); rect(238, 58, 311, 92, C.laton); rect(238, 58, 311, 58, AP.latonL);
  for (let y = 60; y < 92; y++) for (let x = 240; x < 310; x++) { const f = (y - 60) / 32 * 2 + a_bayer(x, y) - 0.5 + (Math.abs(x - 275) > 30 ? 0.4 : 0); pset(x, y, f < 0.5 ? AP.espejoL : f < 1.5 ? AP.espejo : AP.espejoS); }
  for (const [x0, x1] of [[244, 258], [282, 300]]) for (let y = 66; y < 90; y++) for (let x = x0; x < x1; x++) if ((x + y) % 3 === 0) pset(x, y, AP.espejoD);   // el reflejo de los estantes de enfrente
  for (const xc of [230, 312]) { rect(xc, 56, xc + 6, 127, AP.caoba); rect(xc, 56, xc + 6, 59, AP.caobaL); rect(xc, 60, xc + 6, 60, AP.caobaS); for (let x = xc + 1; x < xc + 6; x += 2) rect(x, 62, x, 120, AP.caobaS); rect(xc, 121, xc + 6, 127, AP.caobaD); rect(xc, 121, xc + 6, 121, AP.caobaL); }
  // la balda de mármol
  rect(232, 93, 317, 93, AP.marmolL); rect(232, 94, 317, 96, C.marmol); rect(232, 97, 317, 97, C.marmolS);
  for (let x = 232; x < 318; x++) if (h(x >> 2, 5, 51) > 0.6) pset(x, 95 + (x % 2), AP.marmolV);
  // la pirámide de vasos
  for (const [n, yb, x0] of [[4, 92, 242], [3, 85, 245], [2, 78, 248]]) for (let k = 0; k < n; k++) { const x = x0 + k * 6; rect(x, yb - 6, x + 4, yb, AP.vidrioS); rect(x + 1, yb - 6, x + 3, yb - 1, AP.vidrio); rect(x + 1, yb - 5, x + 1, yb - 1, AP.vidrioL); }
  // los tarros de jarabe con su tapa de latón
  for (const [x, c, cS] of [[266, C.jarabe, AP.caobaD], [274, AP.rojoF, AP.rojoFS], [282, AP.ambar, AP.ambarS]]) { rect(x, 79, x + 6, 92, AP.vidrioS); rect(x + 1, 80, x + 5, 91, AP.vidrio); rect(x + 1, 83, x + 5, 91, c); rect(x + 5, 83, x + 5, 91, cS); rect(x + 1, 80, x + 1, 90, AP.vidrioL); rect(x, 77, x + 6, 78, C.laton); pset(x + 3, 76, AP.latonS); }
  // la pizarrita apoyada (la cifra la pone cada fotograma)
  rect(290, 75, 309, 92, AP.nogalS); rect(291, 76, 308, 91, AP.nogal); rect(292, 77, 307, 90, hex('#2e3436'));
  for (let k = 0; k < 14; k++) pset(293 + Math.floor(h(k, 1, 53) * 14), 78 + Math.floor(h(k, 2, 53) * 12), hex('#4a5254'));
  // los armarios bajos con sus puertas de cuarterón en arco
  rect(238, 98, 311, 127, AP.caoba); for (const x of [238, 263, 288]) { rect(x + 2, 101, x + 21, 124, AP.caobaS); rect(x + 3, 102, x + 21, 124, AP.caoba); rect(x + 4, 104, x + 19, 122, AP.caobaL); rect(x + 5, 105, x + 19, 122, AP.caoba); for (let i = 0; i < 6; i++) pset(x + 6 + i * 2, 104 - (i > 1 && i < 4 ? 1 : 0), AP.caobaL); disco(x + 19, 114, 1, C.laton); }
  rect(232, 126, 317, 127, AP.caobaD);
  // ── la araña de gas del techo (las llamas las pone cada fotograma) ──
  rect(174, 14, 178, 15, AP.latonS); linea(176, 15, 176, 19, AP.latonS); disco(176, 21, 2, C.laton); pset(175, 20, AP.latonL);
  for (const d of [-1, 1]) { linea(176, 22, 176 + d * 6, 25, C.laton); linea(176 + d * 6, 25, 176 + d * 12, 24, C.laton); rect(176 + d * 12 - 1, 23, 176 + d * 12 + 1, 23, AP.latonS); }
  // ── el barril junto al escaparate, con sus aros y su cazo; la escupidera de latón ──
  for (let y = 129; y < 147; y++) for (let x = 42; x <= 60; x++) { const u = (x - 51) / 9.5, bomb = Math.round((1 - ((y - 138) / 9) ** 2) * 1.5); if (Math.abs(x - 51) > 9 + bomb - 1) continue; const l = Math.cos(u * 1.5) - u * 0.3, aro = y === 131 || y === 137 || y === 143;
    pset(x, y, aro ? (l > 0.8 ? AP.aceroL : AP.aceroS) : (x % 4 === 0 ? AP.nogalD : l > 0.85 ? AP.nogalL : l > 0.4 ? AP.nogal : AP.nogalS)); }
  for (let i = -8; i <= 8; i++) for (let j = -2; j <= 2; j++) if ((i / 9) ** 2 + (j / 2.5) ** 2 < 1) pset(51 + i, 129 + j, j < 0 ? AP.nogalL : AP.nogal);
  rect(44, 128, 58, 128, AP.nogalS); linea(54, 128, 60, 122, AP.aceroS); disco(53, 128, 1, AP.aceroL);
  for (let i = -10; i <= 10; i++) if ((i + 146) % 2) pset(51 + i, 147, AP.junta);
  for (let j = 0; j < 9; j++) { const w = [5, 4, 3, 4, 5, 6, 6, 5, 4][j]; for (let i = -w; i <= w; i++) pset(186 + i, 163 + j, j === 0 ? (Math.abs(i) < 3 ? AP.caobaD : AP.latonL) : i < -w + 2 ? AP.latonL : i > w - 2 ? AP.latonS : C.laton); }
  pset(183, 168, hex('#fff4c0')); pset(184, 167, AP.latonL);
  for (let i = -6; i <= 6; i++) if (i % 2) pset(186 + i, 172, AP.junta);
}

// el escaparate y la puerta por dentro: la calle por el cristal, los reflejos, los globos de farmacia y el alféizar
function a_huecosFarmacia(R, t) {
  for (const cl of [[7, 50, 29, 88], [42, 38, 92, 108]]) { R.recorte(cl); a_calle(R, cl, t, 86); R.recorte(null); }
  // el parteluz y el travesaño del escaparate
  R.rect(66, 54, 67, 108, AP.caoba); R.rect(66, 54, 66, 108, AP.caobaL); R.rect(42, 52, 92, 53, AP.caoba); R.rect(42, 52, 92, 52, AP.caobaL);
  // los reflejos del cristal, en diagonal
  for (const [x0, y0, x1, y1] of [[7, 50, 29, 88], [42, 38, 92, 108]]) for (let k = 0; k < 2; k++) { const b = x0 + 4 + k * 9 + Math.round(Math.sin(t * 0.3) * 2); for (let y = y0; y <= y1; y++) { const x = b + Math.round((y1 - y) * 0.35); if (x >= x0 && x <= x1 && (y % 2 || k)) R.pset(x, y, a_mezcla(R.pget(x, y), AP.vidrioL, 0.5)); } }
  // los dos globos de farmacia colgados, con su líquido de color que ondula
  for (const [x, c, cS, cL] of [[54, AP.rojoF, AP.rojoFS, AP.rojoFL], [80, AP.verdeF, AP.verdeFS, AP.verdeFL]]) {
    R.linea(x, 38, x, 43, AP.latonS); for (let y = 39; y < 43; y += 2) R.pset(x, y, AP.latonL);
    R.rect(x - 1, 44, x + 1, 47, AP.vidrioS); R.rect(x - 2, 44, x + 2, 44, C.laton); R.disco(x, 55, 7, AP.vidrioS); R.disco(x, 55, 6, AP.vidrio);
    const ola = (i) => 52 + Math.round(Math.sin(t * 2.2 + i * 0.8 + x) * 0.7);
    for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) if (i * i + j * j <= 30 && 55 + j >= ola(i)) R.pset(x + i, 55 + j, j > 3 || i > 3 ? cS : c);
    R.pset(x - 3, 52, AP.vidrioL); R.pset(x - 4, 53, AP.vidrioL); R.pset(x - 3, 54, cL); R.rect(x - 2, 62, x + 2, 63, AP.latonS);
  }
  // en el alféizar: frascos rectos, un tarro y una balanza de latón
  for (const [x, w, al, tipo] of [[45, 4, 9, 0], [50, 5, 7, 2], [57, 6, 8, 4], [70, 4, 10, 1], [75, 4, 8, 3], [86, 5, 9, 0]]) a_tarro(R, x, 108, w, al, tipo);
  R.rect(80, 107, 84, 108, AP.latonS); R.linea(82, 107, 82, 101, AP.latonS); R.linea(78, 101, 86, 101, C.laton); R.rect(77, 102, 79, 102, AP.latonS); R.rect(85, 102, 87, 102, AP.latonS);
}

function a_farmacia(R, t, o = {}) {
  a_capa(R, 'farmacia', () => a_farmaciaFija(R));
  a_huecosFarmacia(R, t);
  // el reloj: la esfera, las agujas y el péndulo que va y viene
  R.disco(219, 37, 5, AP.etiqueta); for (let k = 0; k < 12; k += 3) { const a = k * Math.PI / 6; R.pset(Math.round(219 + Math.cos(a) * 4), Math.round(37 + Math.sin(a) * 4), AP.tinta); }
  { const m = t * 0.1 - Math.PI / 2, hh = -Math.PI / 2 + 1.1; R.linea(219, 37, 219 + Math.round(Math.cos(m) * 4), 37 + Math.round(Math.sin(m) * 4), AP.tinta); R.linea(219, 37, 219 + Math.round(Math.cos(hh) * 3), 37 + Math.round(Math.sin(hh) * 3), AP.tinta); }
  { const a = Math.sin(t * Math.PI) * 0.28, bx = Math.round(219 + Math.sin(a) * 17), by = Math.round(47 + Math.cos(a) * 17); R.linea(219, 47, bx, by, AP.latonS); R.disco(bx, by, 2, C.laton); R.pset(bx - 1, by - 1, AP.latonL); }
  // el espejo: un brillo que cruza despacio y el reflejo de alguien que pasa por la sala
  { const b = 220 + ((t * 9) % 140); for (let y = 60; y < 92; y++) for (let w = 0; w < 4; w++) { const x = Math.round(b + w - (y - 60) * 0.5); if (x >= 240 && x < 310 && (w < 2 || y % 2)) R.pset(x, y, a_mezcla(R.pget(x, y), AP.vidrioL, 0.45)); } }
  { const u = ((t + 2) % 16) / 16; if (u < 0.6) { const R2 = Object.create(R), cl = [240, 60, 309, 91]; R2.rect = (x0, y0, x1, y1, c) => a_rc(R, cl, x0, y0, x1, y1, a_mezcla(c, AP.espejo, 0.55)); R2.linea = (x0, y0, x1, y1, c) => { R.recorte(cl); R.linea(x0, y0, x1, y1, a_mezcla(c, AP.espejo, 0.55)); R.recorte(null); }; R2.pset = (x, y, c) => { if (x >= 240 && x <= 309 && y >= 60 && y <= 91) R.pset(x, y, a_mezcla(c, AP.espejo, 0.55)); }; a_paseante(R2, Math.round(320 - u / 0.6 * 100), 90, t, 1, -1); } }
  // la cifra de la pizarra
  if (o.vasos != null) R.numero(String(o.vasos), 300, 89, { color: hex('#ece8dc'), centro: true, sombra: false });
  // el gato en la cornisa de la estantería, que mueve la cola y a veces gira la cabeza
  { const x = 196, y = 25, c = Math.sin(t * 1.7), mira = Math.sin(t * 0.4) > 0.7 ? -1 : 1;
    R.rect(x - 2, y - 4, x + 2, y, AP.gato); R.rect(x - 3, y - 2, x + 3, y, AP.gato); R.rect(x - 2 + mira, y - 7, x + 1 + mira, y - 5, AP.gato); R.pset(x - 2 + mira, y - 8, AP.gato); R.pset(x + 1 + mira, y - 8, AP.gato); R.pset(x + mira * 1, y - 6, AP.llamaM); R.pset(x - 1, y - 3, AP.gatoL);
    R.linea(x + 3, y, x + 6, y - 1 + Math.round(c), AP.gato); R.pset(x + 7, y - 2 + Math.round(c * 2), AP.gato); }
  // las llamas de gas, con su halo
  for (const [x, y, r, k] of [[164, 22, 16, 1], [188, 22, 16, 2], [99, 49, 12, 3], [236, 39, 10, 4]]) a_halo(R, x, y - 2, r, AP.halo, 0.85 + Math.sin(t * 9 + k) * 0.08);
  for (const x of [164, 188]) { R.rect(x - 2, 23, x + 2, 23, C.laton); R.pset(x - 3, 19, AP.vidrioL); R.pset(x + 3, 19, AP.vidrioL); R.pset(x - 3, 20, AP.vidrio); R.pset(x + 3, 20, AP.vidrio); R.pset(x - 2, 22, AP.vidrio); R.pset(x + 2, 22, AP.vidrio); }
  a_llama(R, 164, 22, t, 1); a_llama(R, 188, 22, t, 2); a_llama(R, 99, 49, t, 3);
  R.pset(97, 45, AP.vidrioL); R.pset(101, 45, AP.vidrioL); R.pset(97, 46, AP.vidrio); R.pset(101, 46, AP.vidrio); R.pset(98, 49, AP.vidrio); R.pset(100, 49, AP.vidrio);
  R.rect(235, 44, 237, 45, AP.latonS); R.disco(236, 39, 4, a_mezcla(AP.etiqueta, AP.llamaM, 0.3 + Math.sin(t * 11) * 0.05)); R.disco(236, 39, 2, AP.llama); R.pset(234, 37, hex('#ffffff'));
  // las motas de polvo en el rayo de sol
  for (let k = 0; k < 10; k++) { const x = Math.round(60 + h(k, 7, 61) * 70 + Math.sin(t * 0.5 + k) * 5), y = Math.round(150 - ((h(k, 8, 61) * 40 + t * 2.5) % 40)); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(x, y, AP.vidrioL); }
  return { suelo: 164, sueloDetras: 138, mostrador: [176, 134], mesa: [100, 133], perol: [146, 127], pizarra: [300, 89], puerta: [5, 48, 31, 127], escaparate: [42, 38, 92, 108] };
}

// la mesa de trabajo de Pemberton y el mostrador de mármol de la fuente, con sus taburetes
function a_farmaciaDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  // la mesa de Pemberton: la garrafa de mimbre debajo, las patas, el travesaño, el cajón y el tablero
  for (let j = 0; j < 9; j++) { const w = [3, 5, 6, 7, 7, 7, 6, 5, 4][j]; for (let i = -w; i <= w; i++) pset(122 + i, 142 + j, (i + j) % 3 === 0 ? AP.nogalS : (i < -w + 2 ? AP.nogalS : C.paja)); }
  rect(121, 138, 123, 141, AP.verdeFS); pset(121, 139, AP.verdeFL);
  for (const x of [102, 164]) { rect(x, 140, x + 3, 151, AP.nogalS); rect(x, 140, x, 151, AP.nogal); rect(x - 1, 151, x + 4, 152, AP.nogalD); }
  rect(105, 146, 163, 147, AP.nogalS); rect(105, 146, 163, 146, AP.nogal);
  rect(100, 133, 168, 135, AP.nogalL); rect(100, 133, 168, 133, AP.tabla3); rect(99, 136, 169, 137, AP.nogal); rect(99, 137, 169, 137, AP.nogalS); rect(101, 138, 167, 140, AP.nogalS);
  for (let x = 101; x < 168; x += 9) pset(x + (x % 2), 134, AP.nogal);
  rect(126, 138, 142, 140, AP.nogal); disco(134, 139, 1, C.laton);
  // los tarros de hojas de coca y de nueces de cola
  { rect(103, 120, 111, 132, AP.vidrioS); rect(104, 121, 110, 131, AP.vidrio); for (let k = 0; k < 14; k++) { const x = 104 + Math.floor(h(k, 1, 71) * 7), y = 123 + Math.floor(h(k, 2, 71) * 9); pset(x, y, k % 3 ? AP.hoja : AP.hojaS); pset(x + 1, y, AP.hoja); } rect(104, 121, 104, 130, AP.vidrioL); rect(102, 118, 112, 119, AP.lozaS); rect(105, 117, 109, 117, AP.lozaS); }
  { rect(113, 123, 121, 132, AP.vidrioS); rect(114, 124, 120, 131, AP.vidrio); for (let k = 0; k < 9; k++) { const x = 114 + (k % 3) * 2, y = 126 + Math.floor(k / 3) * 2; disco(x + 1, y + 1, 1, AP.nuez); pset(x + 1, y, AP.nuezS); } rect(114, 124, 114, 130, AP.vidrioL); rect(112, 121, 122, 122, AP.latonS); }
  // el hornillo de trípode con su llamita azul (el perol lo pone la escena encima, en 146, 127)
  rect(138, 127, 154, 127, AP.aceroS); rect(139, 126, 153, 126, AP.aceroL); for (const x of [140, 146, 152]) linea(x, 127, x + (x - 146) / 6, 132, AP.aceroD);
  rect(144, 131, 148, 132, C.laton); if (o.fuego !== false) { a_halo(R, 146, 128, 7, AP.llamaA, 0.6); for (let i = -3; i <= 3; i++) { const al = 2 + Math.round(Math.abs(Math.sin(t * 12 + i * 1.7))) ; for (let j = 0; j < al; j++) pset(146 + i, 130 - j, j ? AP.llamaA : hex('#9ac0ff')); } }
  // el mortero de mármol con su mano
  rect(157, 128, 165, 132, C.marmolS); rect(158, 127, 164, 131, C.marmol); rect(158, 127, 164, 127, AP.marmolL); linea(160, 127, 166, 120, AP.lozaS); pset(166, 120, AP.loza); pset(165, 121, AP.loza);
  // el mostrador de mármol de la fuente: tablero con vetas, frente de mármol entre pilastras de caoba, barra de latón
  rect(176, 134, 319, 134, AP.marmolL); rect(176, 135, 319, 137, C.marmol); rect(176, 138, 319, 138, C.marmolS);
  for (let x = 176; x < 320; x++) if (h(x >> 3, 1, 73) > 0.5 && (x + Math.floor(h(x >> 3, 2, 73) * 3)) % 4 === 0) pset(x, 135 + (x >> 2) % 3, AP.marmolV);
  for (let y = 139; y < 151; y++) for (let x = 176; x < 320; x++) { const u = (x - 176) % 36; let c;
    if (u < 4) c = u === 0 ? AP.caobaL : u === 3 ? AP.caobaS : AP.caoba;
    else if (y === 139 || u === 4) c = C.marmolS; else if (y === 150 || u === 35) c = AP.marmolL;
    else { const v = Math.sin((x * 0.21 + y * 0.6) + Math.sin(y * 0.4 + x * 0.05) * 2.2); c = Math.abs(v) < 0.08 ? C.marmolS : Math.abs(v) < 0.2 ? AP.marmolV : C.marmol; }
    pset(x, y, c); }
  rect(176, 151, 319, 153, AP.caobaD); rect(176, 151, 319, 151, AP.caoba);
  rect(176, 148, 319, 148, C.laton); rect(176, 149, 319, 149, AP.latonS); for (let x = 190; x < 320; x += 36) { rect(x, 147, x + 1, 150, AP.latonS); pset(x, 147, AP.latonL); }
  for (let x = 176; x < 320; x += 5) pset(x, 148, AP.latonL);
  // la torre de los grifos: peana de mármol, columna de latón con anillos, el remate y los dos caños con su palanca
  rect(243, 124, 257, 133, C.marmolS); rect(244, 124, 256, 132, C.marmol); rect(243, 124, 257, 124, C.laton); rect(244, 126, 244, 131, AP.marmolL);
  rect(248, 108, 252, 123, C.laton); rect(248, 108, 248, 123, AP.latonL); rect(252, 108, 252, 123, AP.latonS); for (const y of [111, 117]) rect(247, y, 253, y, AP.latonS);
  disco(250, 104, 3, C.laton); pset(249, 102, AP.latonL); rect(249, 99, 251, 100, AP.latonS); pset(250, 98, C.laton);
  for (const d of [-1, 1]) { linea(250, 113, 250 + d * 9, 113, C.laton); linea(250, 114, 250 + d * 9, 114, AP.latonS); rect(250 + d * 9, 114, 250 + d * 9, 118, AP.latonS); pset(250 + d * 9, 119, AP.caobaD); linea(250 + d * 6, 112, 250 + d * 7, 106, AP.lozaS); disco(250 + d * 7, 105, 1, AP.loza); }
  if (Math.floor(t * 1.3) % 5 === 0) pset(241, 121 + Math.floor((t * 6) % 3), AP.caobaD);   // una gota que cae del caño
  // dos taburetes con asiento de cuero rojo y columna de latón, delante del mostrador
  for (const x of [204, 296]) { rect(x - 1, 156, x + 1, 164, AP.latonS); rect(x - 1, 156, x - 1, 164, AP.latonL); rect(x - 5, 165, x + 5, 166, AP.latonS); rect(x - 4, 165, x + 4, 165, C.laton);
    rect(x - 6, 152, x + 6, 155, AP.rojoFS); rect(x - 5, 152, x + 5, 153, AP.rojoF); rect(x - 4, 152, x - 1, 152, AP.rojoFL); for (let i = -5; i <= 5; i += 2) pset(x + i, 155, C.laton);
    for (let i = -6; i <= 6; i++) if (i % 2) pset(x + i, 167, AP.junta); }
  return { suelo: 164 };
}

function a_fuenteFija(R) {
  const { rect, pset, disco, linea } = R;
  // el dosel de caoba con tallas suaves (arriba, tranquilo para el año y para Atom)
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 13 ? AP.caobaD : h(x >> 3, y, 81) > 0.8 ? AP.caobaS : (x % 40 === 0 ? AP.caobaD : AP.caobaS));
  for (let x = 0; x < 320; x++) { pset(x, 11, x % 4 < 2 ? AP.caobaD : AP.caobaS); }
  // la vidriera emplomada de colores, con la luz de detrás (rombos ámbar, verdes y crema)
  rect(10, 14, 272, 41, AP.caobaD);
  for (let y = 16; y < 40; y++) for (let x = 12; x < 271; x++) {
    const u = (x - 12) % 24, v = (y - 16), d = Math.abs(u - 12) / 12 + Math.abs(v - 12) / 12, plomo = Math.abs(d - 0.55) < 0.06 || Math.abs(d - 1) < 0.06 || u === 0;
    let c = plomo ? AP.caobaD : d < 0.55 ? ((Math.floor((x - 12) / 24) % 2) ? AP.verdeFL : AP.ambarL) : AP.etiqueta;
    if (!plomo && d < 0.25) c = AP.rojoFL; if (!plomo && (x + y) % 5 === 0) c = a_mezcla(c, AP.caobaD, 0.18); pset(x, y, c);
  }
  for (let x = 272; x < 320; x++) for (let y = 14; y < 42; y++) pset(x, y, h(x >> 2, y, 83) > 0.85 ? AP.caoba : AP.caobaS);
  rect(0, 14, 9, 41, AP.caobaS);
  rect(0, 41, 319, 41, AP.caobaL); rect(0, 42, 319, 44, AP.caoba); for (let x = 0; x < 320; x++) pset(x, 45, x % 3 ? AP.caoba : AP.caobaD); rect(0, 46, 319, 47, AP.caobaS);
  // el espejo grande con marco dorado y el reflejo borroso de la sala (el ventanal y las estanterías)
  rect(20, 48, 299, 111, AP.latonS); rect(21, 49, 298, 110, C.laton); rect(21, 49, 298, 49, AP.latonL);
  for (let y = 51; y < 109; y++) for (let x = 23; x < 297; x++) {
    let f = (y - 51) / 58 * 2 + a_bayer(x, y) - 0.5; if (x > 40 && x < 82 && y > 56 && y < 92) f -= 1.1; if (x > 200 && x < 280 && y > 54 && y < 100 && (x % 9) < 6) f += 0.9;
    pset(x, y, f < 0.3 ? AP.espejoL : f < 1.4 ? AP.espejo : f < 2.3 ? AP.espejoS : AP.espejoD);
  }
  rect(61, 56, 61, 92, AP.espejo); rect(41, 74, 81, 74, AP.espejo);
  // el reflejo de la estantería de botica de enfrente: baldas y tarros de colores, apagados por el espejo
  for (let r = 0; r < 4; r++) { const yb = 60 + r * 11; for (let x = 168; x < 296; x++) { if (x % 40 < 2) continue; pset(x, yb + 1, a_mezcla(AP.nogalS, AP.espejo, 0.45)); }
    for (let x = 170; x < 294; x += 5) { if (x % 40 < 3 || h(x, r, 86) < 0.2) continue; const al = 4 + Math.floor(h(x, r, 87) * 4), c = [AP.ambar, AP.verdeF, AP.azulF, AP.rojoF, AP.loza][Math.floor(h(x, r, 88) * 5)]; rect(x, yb - al, x + 2, yb, a_mezcla(c, AP.espejo, 0.55)); pset(x, yb - al, a_mezcla(AP.vidrioL, AP.espejo, 0.4)); } }
  for (let y = 51; y < 109; y++) { pset(166, y, a_mezcla(AP.nogalS, AP.espejo, 0.4)); pset(297 - 1, y, a_mezcla(AP.nogalS, AP.espejo, 0.4)); }
  for (const xc of [6, 300]) { rect(xc, 48, xc + 13, 140, AP.caoba); rect(xc, 48, xc + 13, 52, AP.caobaL); rect(xc, 53, xc + 13, 53, AP.caobaS); for (let x = xc + 2; x < xc + 12; x += 3) rect(x, 55, x, 132, AP.caobaS); rect(xc, 133, xc + 13, 140, AP.caobaD); rect(xc, 133, xc + 13, 133, AP.caobaL); }
  rect(0, 48, 5, 145, AP.caobaS); rect(314, 48, 319, 145, AP.caobaS);
  // la balda de mármol
  rect(14, 111, 306, 111, AP.marmolL); rect(14, 112, 306, 115, C.marmol); rect(14, 116, 306, 116, C.marmolS);
  for (let x = 14; x < 307; x++) { const v = Math.sin(x * 0.17 + Math.sin(x * 0.05) * 3); if (Math.abs(v) < 0.15) pset(x, 113 + (x % 3 === 0 ? 1 : 0), AP.marmolV); }
  // las tres urnas de jarabe: cristal, jarabe con su nivel, tapa de latón en cúpula, grifito y la etiqueta en blanco
  for (const [x, c, cS] of [[30, C.jarabe, AP.caobaD], [52, AP.rojoF, AP.rojoFS], [74, AP.ambar, AP.ambarS]]) {
    rect(x, 86, x + 15, 110, AP.vidrioS); rect(x + 1, 87, x + 14, 109, AP.vidrio); rect(x + 1, 92, x + 14, 109, c); rect(x + 11, 92, x + 14, 109, cS); rect(x + 1, 92, x + 14, 92, a_mezcla(c, AP.vidrioL, 0.4));
    rect(x + 2, 88, x + 3, 107, AP.vidrioL); rect(x + 4, 97, x + 11, 102, AP.etiqueta); rect(x + 4, 103, x + 11, 103, AP.lozaS); rect(x + 5, 98, x + 10, 98, AP.rojoFS);
    for (let j = 0; j < 5; j++) rect(x + 1 + j, 84 - j, x + 14 - j, 84 - j, j ? C.laton : AP.latonS); rect(x, 85, x + 15, 85, AP.latonS); pset(x + 5, 81, AP.latonL); rect(x + 7, 78, x + 8, 79, C.laton);
    rect(x + 15, 104, x + 18, 105, C.laton); rect(x + 18, 105, x + 18, 107, AP.latonS);
  }
  // la pirámide de vasos y el tarro de pajitas
  for (const [n, yb, x0] of [[5, 110, 98], [4, 101, 102], [3, 92, 106]]) for (let k = 0; k < n; k++) { const x = x0 + k * 8; rect(x, yb - 8, x + 6, yb, AP.vidrioS); rect(x + 1, yb - 8, x + 5, yb - 1, AP.vidrio); rect(x + 1, yb - 7, x + 1, yb - 1, AP.vidrioL); rect(x + 2, yb - 1, x + 5, yb - 1, AP.vidrioS); }
  rect(146, 96, 156, 110, AP.vidrioS); rect(147, 97, 155, 109, AP.vidrio); for (let k = 0; k < 6; k++) linea(148 + k, 109, 147 + k + (k % 3), 86 + (k % 2) * 2, k % 2 ? AP.etiqueta : AP.pergaminoS); rect(147, 97, 147, 108, AP.vidrioL);
  // la registradora de latón, con sus teclas redondas (las cifras de la ventanilla las pone cada fotograma)
  rect(210, 98, 256, 110, AP.latonS); rect(211, 98, 255, 109, C.laton); rect(213, 101, 253, 107, AP.latonS); rect(214, 102, 252, 106, C.laton); disco(233, 104, 1, AP.caobaD);
  for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) { const x = 215 + k * 5 + r, y = 87 + r * 3; disco(x, y, 1, AP.caobaD); pset(x, y - 1, AP.etiqueta); pset(x - 1, y, AP.etiqueta); }
  rect(212, 84, 254, 97, AP.latonS); rect(213, 85, 253, 96, C.laton); for (let x = 214; x < 253; x += 3) pset(x, 85, AP.latonL);
  rect(218, 66, 248, 83, AP.latonS); rect(219, 67, 247, 83, C.laton); for (let y = 60; y < 67; y++) { const w = Math.round(Math.sqrt(1 - ((y - 67) / 7) ** 2) * 15); rect(233 - w, y, 233 + w, y, C.laton); pset(233 - w, y, AP.latonL); }
  for (const [x0, y0] of [[219, 68], [242, 68], [219, 78], [242, 78]]) { pset(x0 + 2, y0 + 1, AP.latonL); pset(x0 + 3, y0 + 2, AP.latonS); pset(x0 + 1, y0 + 3, AP.latonS); }
  rect(225, 69, 241, 79, AP.caobaD); rect(226, 70, 240, 78, hex('#f2ead2'));
  rect(256, 90, 258, 92, AP.latonS); linea(258, 91, 264, 86, AP.latonS); rect(263, 84, 265, 86, AP.caobaD);   // la manivela
  // el frutero de cristal con limones
  rect(270, 104, 292, 110, AP.vidrioS); rect(272, 109, 290, 110, AP.vidrio); rect(279, 110, 283, 110, AP.vidrioS);
  for (const [x, y] of [[274, 102], [280, 101], [286, 102], [277, 97], [283, 97]]) { R.disco(x, y, 3, hex('#d8b020')); R.disco(x - 1, y - 1, 2, hex('#f8e050')); pset(x - 2, y - 2, hex('#fff8c0')); }
  // los armarios de debajo (los tapa casi del todo el mostrador)
  //   (caoba con vetas, puertas de cuarterón con su bisel de luz y sombra, tiradores de latón, y entre ellas la nevera de
  //   hielo con su tapa de zinc, una fila de botellas de sifón y el trapo colgado)
  for (let y = 117; y < 146; y++) for (let x = 14; x < 307; x++) { const v = Math.sin(y * 0.9 + Math.sin(x * 0.045 + y * 0.12) * 3); pset(x, y, Math.abs(v) < 0.12 ? AP.caobaS : v > 0.8 && h(x >> 2, y, 107) > 0.5 ? AP.caobaL : AP.caoba); }
  rect(14, 117, 306, 117, AP.caobaD); rect(14, 118, 306, 118, AP.caobaL);
  for (let x = 20; x < 300; x += 46) { if (x === 20) continue;
    rect(x, 121, x + 40, 121, AP.caobaD); rect(x, 121, x, 145, AP.caobaD); rect(x + 1, 122, x + 40, 122, AP.caobaL); rect(x + 1, 122, x + 1, 145, AP.caobaL); rect(x + 40, 122, x + 40, 145, AP.caobaS);
    for (const px of [x + 4, x + 22]) { rect(px, 125, px + 14, 125, AP.caobaS); rect(px, 125, px, 145, AP.caobaS); rect(px + 14, 126, px + 14, 145, AP.caobaL); rect(px + 1, 126, px + 13, 126, AP.caobaL);
      for (let y = 128; y < 146; y += 3) pset(px + 3 + ((y * 7) % 9), y, AP.caobaL); }
    disco(x + 20, 132, 1, C.laton); pset(x + 19, 131, AP.latonL); pset(x + 21, 133, AP.latonS); }
  rect(20, 120, 66, 145, AP.aceroD); rect(21, 121, 65, 145, AP.acero); rect(21, 121, 65, 122, AP.aceroLL); rect(21, 123, 65, 123, AP.aceroS);
  for (let x = 24; x < 64; x += 6) rect(x, 126, x, 145, AP.aceroL); rect(58, 131, 62, 133, AP.aceroK); rect(59, 131, 61, 132, AP.aceroLL);
  for (let k = 0; k < 5; k++) { const x = 26 + k * 7; rect(x, 133, x + 4, 145, AP.vidrioS); rect(x + 1, 134, x + 3, 145, a_mezcla(AP.vidrio, AP.verdeFL, 0.3)); pset(x + 1, 135, AP.vidrioL); rect(x + 1, 129, x + 3, 132, AP.aceroL); rect(x + 3, 129, x + 4, 129, AP.aceroK); }
  rect(254, 118, 262, 133, AP.etiqueta); rect(254, 118, 262, 118, AP.lozaS); for (let y = 121; y < 133; y += 3) rect(255, y, 261, y, AP.rojoFL); rect(262, 119, 262, 133, AP.lozaS); rect(255, 132, 261, 133, AP.rojoFS);
}
function a_fuente(R, t, o = {}) {
  a_capa(R, 'fuente', () => a_fuenteFija(R));
  // la luz que entra por la vidriera, que respira con las nubes
  { const k = 0.5 + Math.sin(t * 0.4) * 0.5; for (let y = 16; y < 40; y += 1) for (let x = 12 + (y % 2); x < 271; x += 2) if (a_bayer(x, y) < k * 0.35) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#fffbe8'), 0.35)); }
  // en el espejo: un brillo que cruza, dos llamas de gas reflejadas y gente que pasa al fondo de la sala
  { const b = 0 + ((t * 14) % 360); for (let y = 51; y < 109; y++) for (let w = 0; w < 5; w++) { const x = Math.round(b + w - (y - 51) * 0.6); if (x >= 23 && x < 297 && (w < 3 || y % 2) && !(x >= 210 && x <= 258 && y >= 60) && !(y > 76 && ((x >= 28 && x <= 94) || (x >= 96 && x <= 158) || (x >= 268 && x <= 293)))) R.pset(x, y, a_mezcla(R.pget(x, y), AP.vidrioL, 0.4)); } }
  for (const [x, k] of [[128, 1], [176, 2]]) { a_halo(R, x, 58, 7, AP.halo, 0.6); a_llama(R, x, 60, t, k); }
  { const cl = [23, 51, 296, 75], R2 = Object.create(R); R2.rect = (x0, y0, x1, y1, c) => a_rc(R, cl, x0, y0, x1, y1, a_mezcla(c, AP.espejo, 0.5)); R2.pset = (x, y, c) => { if (x >= cl[0] && x <= cl[2] && y >= cl[1] && y <= cl[3]) R.pset(x, y, a_mezcla(c, AP.espejo, 0.5)); }; R2.linea = (x0, y0, x1, y1, c) => { R.recorte(cl); R.linea(x0, y0, x1, y1, a_mezcla(c, AP.espejo, 0.5)); R.recorte(null); };
    for (let k = 0; k < 2; k++) { const u = ((t * 0.07 + k * 0.5) % 1), d = k ? -1 : 1, x = Math.round(d > 0 ? 10 + u * 300 : 310 - u * 300); a_paseante(R2, x, 75, t, k + 2, d); } }
  // la registradora: cada poco salta la banderita con la cifra (5 centavos el vaso)
  { const c = Math.floor(t / 3), salta = (t % 3) < 1.6; R.rect(226, 70, 240, 78, hex('#f2ead2')); if (salta) { R.rect(228, 71, 238, 77, AP.etiqueta); a_cifra(R, c % 2 ? 10 : 5, c % 2 ? 229 : 231, 72, AP.rojoFS); } else R.rect(229, 76, 237, 77, AP.lozaS); }
  // un limón se mueve un poco, las burbujitas de las urnas
  for (let k = 0; k < 3; k++) { const x = 34 + k * 22 + Math.floor(h(k, Math.floor(t * 2), 85) * 8), y = 108 - Math.floor((t * 7 + k * 5) % 15); R.pset(x, y, a_mezcla(AP.vidrioL, [C.jarabe, AP.rojoF, AP.ambar][k], 0.3)); }
  // el mostrador también aquí, para que el plano quede entero aunque no se llame a atlantaDelante
  a_capaFranja(R, 'fuenteFrente', 146, 179, () => a_fuenteFrente(R));
  return { suelo: 180, sueloDetras: 152, mostrador: [0, 146], vaso: [146, 145], cano: [146, 121], registradora: [233, 66] };
}
function a_fuenteDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  // el mostrador de mármol (tablero, frente de paneles y barra de los pies): la misma franja que pinta a_fuente, por delante
  a_capaFranja(R, 'fuenteFrente', 146, 179, () => a_fuenteFrente(R));
  // la torre de los grifos: peana de mármol con su moldura de latón, columna con anillos, el remate en urna
  rect(160, 128, 184, 145, C.marmolS); rect(161, 129, 183, 145, C.marmol); rect(161, 129, 162, 145, AP.marmolL); rect(160, 127, 184, 128, C.laton); rect(160, 127, 184, 127, AP.latonL); rect(160, 144, 184, 145, AP.latonS);
  rect(166, 133, 178, 140, C.marmolS); rect(167, 134, 177, 139, AP.marmolL); disco(172, 136, 1, C.laton);
  rect(167, 96, 177, 126, C.laton); rect(167, 96, 169, 126, AP.latonL); rect(175, 96, 177, 126, AP.latonS); rect(171, 96, 171, 126, AP.latonL); for (const y of [100, 108, 118, 124]) { rect(165, y, 179, y + 1, AP.latonS); rect(165, y, 179, y, AP.latonL); }
  for (let j = 0; j < 16; j++) { const w = [2, 3, 5, 7, 8, 9, 9, 9, 8, 7, 5, 4, 3, 3, 4, 6][j]; rect(172 - w, 78 + j, 172 + w, 78 + j, j < 7 ? C.laton : AP.latonS); pset(172 - w, 78 + j, AP.latonL); pset(172 + w, 78 + j, AP.latonS); if (j > 1 && j < 9) pset(169 - (j >> 2), 78 + j, AP.latonL); }
  for (const d of [-1, 1]) { pset(172 + d * 10, 85, C.laton); pset(172 + d * 11, 84, C.laton); pset(172 + d * 11, 83, AP.latonS); }
  disco(172, 75, 3, C.laton); pset(171, 73, AP.latonL); pset(172, 71, AP.latonS); pset(172, 70, C.laton);
  // los dos caños y sus palancas; la de la izquierda baja mientras sale el chorro
  const ll = o.llena != null ? Math.max(0, Math.min(1, o.llena)) : Math.min(1, (t % 8) / 4), chorro = o.chorro ?? (ll > 0 && ll < 1);
  for (const d of [-1, 1]) {
    const xe = 172 + d * 26; for (let i = 0; i <= 26; i++) { const x = 172 + d * i, y = 111 + Math.round((i / 26) ** 2 * 2); pset(x, y, AP.latonL); pset(x, y + 1, C.laton); pset(x, y + 2, AP.latonS); if (i % 6 === 0) { pset(x, y - 1, C.laton); pset(x, y + 3, AP.latonS); } }
    rect(xe - 1, 115, xe + 1, 120, AP.latonS); rect(xe - 1, 115, xe - 1, 120, C.laton); rect(xe - 2, 121, xe + 2, 121, AP.latonS); pset(xe, 122, AP.caobaD);
    const baja = d < 0 && chorro, a = baja ? -0.45 : -1.25, px = 172 + d * 20, py = 111;
    disco(px, py, 2, AP.latonS); const hx = Math.round(px + Math.cos(a) * 12 * (d < 0 ? -1 : 1)), hy = Math.round(py + Math.sin(a) * 12);
    linea(px, py, hx, hy, AP.latonS); linea(px + 1, py, hx + 1, hy, C.laton); disco(hx, hy, 2, AP.loza); pset(hx - 1, hy - 1, hex('#ffffff'));
  }
  // el vaso recto que se llena: el jarabe con agua con gas, burbujas que suben y la espuma; el chorro mientras sirve
  if (o.vaso !== false) {
    const x0 = 140, x1 = 152, yb = 147, yt = 125, nivel = Math.round(yb - 2 - ll * 18);
    for (let y = yt; y <= yb; y++) { const ins = Math.round((yb - y) / 12); for (let x = x0 - ins; x <= x1 + ins; x++) { const borde = x === x0 - ins || x === x1 + ins || y === yb; let c = borde ? AP.vidrioS : y > nivel ? (x > x1 + ins - 3 ? AP.caobaD : C.jarabe) : AP.vidrio; if (y === yb - 1 && !borde) c = AP.vidrioS; pset(x, y, c); } }
    if (ll > 0.05) { for (let x = x0 - 1; x <= x1 + 1; x++) { pset(x, nivel, C.espuma); if ((x + Math.floor(t * 8)) % 3) pset(x, nivel - 1, C.espuma); } }
    for (let k = 0; k < 7; k++) { const bx = x0 + 2 + Math.floor(h(k, 1, 87) * 9), by = yb - 2 - ((t * (8 + k * 2) + k * 4) % 18); if (by > nivel + 1) pset(bx, Math.round(by), a_mezcla(C.jarabe, C.espuma, 0.6)); }
    rect(x0 + 1, yt + 1, x0 + 1, yb - 2, AP.vidrioL); pset(x0 + 2, yt + 2, hex('#ffffff'));
    if (chorro) { for (let y = 123; y < nivel; y++) { pset(146, y, (y + Math.floor(t * 20)) % 3 ? C.jarabe : C.espuma); if (y % 2) pset(147, y, a_mezcla(C.jarabe, AP.vidrioL, 0.3)); } for (let k = 0; k < 4; k++) pset(143 + Math.floor(h(k, Math.floor(t * 10), 89) * 7), nivel - 2 - (k % 2), C.espuma); }
  }
  // un posavasos de mármol y un platito con una cucharilla, a la derecha
  rect(214, 145, 232, 146, AP.lozaS); rect(216, 144, 230, 144, AP.loza); linea(218, 143, 228, 141, AP.aceroL);
  return { suelo: 180 };
}
function a_bovedaFija(R, museo, vacia = false) {
  const { rect, pset, disco, linea } = R;
  // el techo de casetones
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) { const u = x % 32, v = y; const viga = u < 3 || v > 15; let c = museo ? (viga ? AP.museoS : AP.museo) : viga ? AP.granitoD : (u < 5 || v < 2 ? AP.granitoS : (u > 29 || v > 13 ? AP.granitoD : AP.granitoS)); if (!museo && !viga && u >= 5 && u <= 29 && v >= 2 && v <= 13 && h(x, y, 91) > 0.92) c = AP.granito; pset(x, y, c); }
  // las paredes: sillares de granito con motas (o, en el museo, pared pintada oscura con un estuco fino)
  for (let y = 18; y < 140; y++) for (let x = 0; x < 320; x++) {
    if (museo) { pset(x, y, h(x >> 1, y >> 1, 92) > 0.9 ? AP.museoL : AP.museo); continue; }
    const fila = Math.floor((y - 18) / 12), v = (y - 18) % 12, u = (x + (fila % 2) * 12) % 24, blq = Math.floor((x + (fila % 2) * 12) / 24);
    const base = [AP.granito, AP.granitoL, AP.granitoS][Math.floor(h(blq, fila, 93) * 3)], r = h(x, y, 94);
    pset(x, y, v === 11 || u === 23 ? AP.granitoD : v === 0 || u === 0 ? AP.granitoL : r > 0.93 ? AP.granitoL : r < 0.07 ? AP.granitoD : base);
  }
  if (museo) { rect(0, 128, 319, 139, AP.museoS); rect(0, 128, 319, 128, AP.museoL); rect(96, 22, 224, 139, AP.granitoS); for (let y = 23; y < 139; y++) for (let x = 97; x < 224; x++) if (h(x, y, 95) > 0.9) pset(x, y, AP.granitoD); }
  // el suelo: mármol en damero en perspectiva, pulido (o el suelo oscuro y brillante del museo)
  //   (con juntas finas entre losas, vetas que cruzan cada losa y alguna losa con una esquina desconchada)
  for (let y = 140; y < 180; y++) { const e = (y - 40) / 100, z = 1000 / (y - 40); for (let x = 0; x < 320; x++) { const X = 160 + (x - 160) / e, fx = (X + 800) / 18, fz = z / 1.6, ix = Math.floor(fx), iz = Math.floor(fz), tile = (ix + iz) % 2;
    const gx = fx - ix, gz = fz - iz, junta = gx < 0.05 * e + 0.02 || gz < 0.07;
    const v = Math.sin(X * 0.21 + fz * 5.3 + Math.sin(fz * 2.1 + X * 0.05) * 2.2 + h(ix, iz, 104) * 6), vena = Math.abs(v) < 0.07, vena2 = Math.abs(v - 0.8) < 0.04;
    let c = museo ? (tile ? hex('#3a3a46') : hex('#2e2e38')) : (tile ? C.marmol : hex('#6e6874'));
    if (museo) { if (junta) c = hex('#24242c'); else if (vena && tile) c = hex('#44444f'); else if (h(x, y, 105) > 0.97) c = hex('#4a4a58'); }
    else if (junta) c = tile ? AP.marmolV : hex('#56505c');
    else if (vena) c = tile ? AP.marmolV : hex('#847e8a');
    else if (vena2) c = tile ? AP.marmolL : hex('#625c68');
    else if (tile && h(x >> 1, y, 96) > 0.93) c = AP.marmolV;
    else if (gx > 0.86 && gz > 0.8 && h(ix, iz, 106) > 0.8) c = tile ? hex('#cfc6b8') : hex('#5c5662');
    pset(x, y, c); } }
  for (let y = 140; y < 160; y++) for (let x = 102; x <= 218; x++) if (a_bayer(x, y) < 0.35 - (y - 140) * 0.016) pset(x, y, a_mezcla(R.pget(x, y), AP.aceroL, 0.35));   // el reflejo de la placa en el suelo pulido
  for (let x = 0; x < 320; x++) { pset(x, 140, AP.granitoD); if (x % 2) pset(x, 141, a_mezcla(R.pget(x, 141), AP.granitoD, 0.6)); }
  // los reflejos de las lámparas (o de los focos) en el suelo pulido, y las juntas finas del museo
  for (const lx of museo ? [52, 132, 212] : [50, 252]) for (let y = 146; y < 176; y++) for (let x = lx - 6; x <= lx + 6; x++) if (a_bayer(x, y) < 0.4 - Math.abs(x - lx) * 0.05 - (y - 146) * 0.008) pset(x, y, a_mezcla(R.pget(x, y), museo ? AP.foco : AP.luzV, 0.35));
  // la placa de acero remachada con su bisel, y el anillo pulido del marco
  rect(102, 26, 218, 139, AP.aceroD); rect(103, 27, 217, 139, AP.acero); rect(103, 27, 217, 28, AP.aceroL); rect(103, 27, 104, 139, AP.aceroL); rect(216, 29, 217, 139, AP.aceroS);
  for (let y = 30; y < 139; y++) for (let x = 106; x < 215; x++) if (h(x >> 2, y, 97) > 0.86) pset(x, y, a_mezcla(AP.acero, AP.aceroL, 0.4));
  for (let x = 108; x < 214; x += 9) for (const y of [31, 135]) { pset(x, y, AP.aceroLL); pset(x + 1, y + 1, AP.aceroK); pset(x + 1, y, AP.aceroL); }
  for (let y = 40; y < 132; y += 9) for (const x of [107, 212]) { pset(x, y, AP.aceroLL); pset(x + 1, y + 1, AP.aceroK); pset(x + 1, y, AP.aceroL); }
  for (let j = -47; j <= 47; j++) for (let i = -47; i <= 47; i++) { const d = Math.hypot(i, j); if (d > 46.5 || d < 40) continue; const l = (-i - j) / d;
    pset(160 + i, 84 + j, d > 45.5 ? AP.aceroK : d < 41 ? AP.aceroK : l > 0.5 ? AP.aceroLL : l > -0.2 ? AP.aceroL : l > -0.7 ? AP.acero : AP.aceroS); }
  // la cerradura de tiempo en la esquina de la placa (la esfera; la aguja la pone cada fotograma) y la placa del fabricante
  disco(117, 41, 7, AP.latonS); disco(117, 41, 6, C.laton); disco(117, 41, 5, AP.etiqueta); pset(113, 38, AP.latonL); pset(114, 37, AP.latonL);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(117 + Math.cos(a) * 4), Math.round(41 + Math.sin(a) * 4), k % 3 ? AP.lozaS : AP.tinta); }
  rect(111, 49, 123, 52, AP.aceroS); rect(112, 50, 122, 51, AP.aceroD); for (let x = 113; x < 122; x += 3) pset(x, 50, AP.rojoF);
  rect(184, 33, 206, 41, AP.latonS); rect(185, 34, 205, 40, C.laton); rect(185, 34, 205, 34, AP.latonL); rect(188, 36, 202, 36, AP.latonS); rect(190, 38, 200, 38, AP.latonS); pset(186, 35, AP.latonS); pset(204, 35, AP.latonS); pset(186, 39, AP.latonS); pset(204, 39, AP.latonS);
  // las bisagras de la derecha
  for (const y of [58, 106]) { rect(203, y - 6, 211, y + 6, AP.aceroK); rect(204, y - 5, 210, y + 5, AP.acero); rect(204, y - 5, 205, y + 5, AP.aceroL); rect(209, y - 5, 210, y + 5, AP.aceroS); rect(203, y, 211, y, AP.aceroK); }
  // dentro: el túnel del grosor del muro y la cámara iluminada, con baldas de cajas y el atril del centro
  for (let j = -40; j <= 40; j++) for (let i = -40; i <= 40; i++) { const d = Math.hypot(i, j); if (d >= 40) continue; const di = Math.hypot(i, (j - 4) * 1.05);
    if (di > 31) { const l = (i + j) / Math.max(1, d); pset(160 + i, 84 + j, l > 0.5 ? AP.aceroL : l > -0.3 ? AP.aceroS : AP.aceroD); }
    else { const yy = 84 + j; let c = yy > 104 ? (h(i, yy, 98) > 0.85 ? AP.interiorS : a_mezcla(AP.interiorD, AP.interiorS, 0.4)) : (di > 28 ? AP.interiorS : AP.interior); pset(160 + i, yy, c); } }
  if (vacia) {
    // vacía: solo la pared del fondo, de chapa con sus juntas y remaches, una telaraña en el rincón y el atril
    for (const sx of [138, 149, 171, 182]) for (let y = 54; y < 104; y++) if (Math.hypot(sx - 160, (y - 88) * 1.05) < 30) { pset(sx, y, AP.interiorS); if (Math.hypot(sx + 1 - 160, (y - 88) * 1.05) < 30) pset(sx + 1, y, a_mezcla(AP.interior, hex('#ffffff'), 0.25)); if (y % 7 === 3) { pset(sx - 2, y, AP.interiorS); pset(sx + 3, y, AP.interiorS); } }
    for (let x = 131; x <= 189; x++) if (Math.hypot(x - 160, (104 - 88) * 1.05) < 31) { pset(x, 104, AP.interiorD); }
    for (let k = 0; k < 4; k++) { linea(140, 64, 140 + 9 - k * 2, 64 + k * 3, a_mezcla(AP.interior, hex('#ffffff'), 0.45)); }
    linea(142, 64, 142, 70, a_mezcla(AP.interior, hex('#ffffff'), 0.45)); linea(140, 66, 146, 66, a_mezcla(AP.interior, hex('#ffffff'), 0.45));
  } else for (const yb of [70, 84, 98]) for (let x = 132; x <= 188; x++) { if (Math.hypot(x - 160, (yb - 88) * 1.05) > 30) continue; pset(x, yb, AP.interiorD); pset(x, yb + 1, AP.interiorS);
    if ((x - 132) % 6 < 4) for (let y = yb - 8; y < yb; y++) if (Math.hypot(x - 160, (y - 88) * 1.05) < 30 && Math.abs(x - 160) > 7) pset(x, y, (x - 132) % 6 === 0 ? AP.caobaS : [AP.caoba, AP.verdeLS, AP.nogal][Math.floor(h(x >> 2, yb, 99) * 3)]); }
  rect(154, 103, 166, 104, AP.caoba); rect(154, 103, 166, 103, AP.caobaL); rect(158, 105, 162, 114, AP.caobaS); rect(158, 105, 158, 114, AP.caoba); rect(155, 114, 165, 115, AP.caobaD);
  rect(156, 56, 164, 57, AP.interiorD); disco(160, 59, 2, hex('#fff8d8'));

  if (!museo) {
    // las dos paredes de cajas de seguridad de latón, numeradas, con sus dos cerraduras
    for (const [x0, y0, cols, rows, n0] of [[6, 32, 6, 9, 1], [224, 50, 6, 7, 101]]) {
      rect(x0 - 2, y0 - 2, x0 + cols * 15 + 1, y0 + rows * 11 + 1, AP.caobaD); rect(x0 - 2, y0 - 2, x0 + cols * 15 + 1, y0 - 2, AP.caobaS);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * 15, y = y0 + r * 11;
        rect(x, y, x + 13, y + 9, AP.latonS); rect(x, y, x + 12, y + 8, C.laton); rect(x, y, x + 12, y, AP.latonL); rect(x, y, x, y + 8, AP.latonL);
        a_cifra(R, n0 + r * cols + c, x + 2, y + 2, AP.caobaD); pset(x + 11, y + 3, AP.caobaD); pset(x + 11, y + 6, AP.caobaD); pset(x + 10, y + 3, AP.latonL); }
      rect(x0 - 2, y0 + rows * 11 + 2, x0 + cols * 15 + 1, 139, AP.caobaS); rect(x0 - 2, y0 + rows * 11 + 2, x0 + cols * 15 + 1, y0 + rows * 11 + 2, AP.caoba);
    }
    // el atril del guardia con el libro de registro abierto y su lámpara verde
    linea(240, 152, 242, 132, AP.caobaS); linea(256, 152, 254, 132, AP.caobaS); rect(238, 152, 244, 153, AP.caobaD); rect(252, 152, 258, 153, AP.caobaD);
    for (let j = 0; j < 4; j++) rect(234 - j, 128 + j, 262 - j, 128 + j, j ? AP.caoba : AP.caobaL); rect(231, 132, 262, 133, AP.caobaS);
    rect(236, 126, 247, 129, AP.etiqueta); rect(248, 126, 258, 129, AP.etiqueta); rect(247, 126, 248, 129, AP.lozaS); for (let k = 0; k < 3; k++) { rect(238, 127 + k, 245 - k, 127 + k, AP.lozaS); rect(250, 127 + k, 256 - k * 2, 127 + k, AP.lozaS); }
    for (let j = 0; j < 7; j++) { const w = [3, 4, 5, 5, 5, 4, 4][j]; rect(304 - w, 163 + j, 304 + w, 163 + j, j === 0 ? AP.latonS : j < 3 ? AP.latonL : j < 5 ? C.laton : AP.latonS); } rect(301, 162, 307, 162, AP.latonS); pset(301, 165, hex('#ffffff'));
    for (let i = -6; i <= 6; i++) if (i % 2) pset(304 + i, 170, AP.granitoD);
    rect(8, 148, 16, 162, AP.caobaD); rect(9, 149, 15, 161, AP.caoba); rect(9, 149, 9, 161, AP.caobaL); rect(8, 152, 16, 152, C.laton); rect(8, 158, 16, 158, C.laton);
    linea(11, 148, 9, 136, AP.verdeLS); linea(13, 148, 15, 134, AP.tinta); rect(14, 133, 16, 134, AP.tinta); linea(10, 148, 12, 138, AP.terciopeloS); for (let i = -5; i <= 5; i++) if (i % 2) pset(12 + i, 163, AP.granitoD);
    rect(257, 119, 258, 126, AP.latonS); rect(253, 115, 262, 118, AP.verdeLS); rect(254, 115, 261, 116, AP.verdeL); rect(253, 119, 262, 119, AP.verdeLS); rect(256, 126, 259, 127, C.laton);
  } else {
    // el museo: paneles de exposición enmarcados (barras de texto, pictogramas), una vitrina con una botella recta
    for (const [x0, y0, w, hh, pic] of [[14, 40, 66, 52, 0], [236, 52, 40, 30, 1]]) {
      rect(x0, y0, x0 + w, y0 + hh, AP.panelS); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, AP.panel); rect(x0 + 3, y0 + 3, x0 + w - 3, y0 + 6, AP.caobaS);
      for (let k = 0; k < 4; k++) rect(x0 + 3, y0 + 10 + k * 4, x0 + 3 + Math.floor((w - 8) * (0.5 + h(k, x0, 101) * 0.5)), y0 + 11 + k * 4, AP.panelS);
      if (pic === 0) { rect(x0 + 38, y0 + 10, x0 + 62, y0 + 34, AP.pergaminoS); rect(x0 + 41, y0 + 18, x0 + 59, y0 + 32, AP.caobaS); rect(x0 + 44, y0 + 22, x0 + 49, y0 + 32, AP.pergamino); rect(x0 + 52, y0 + 22, x0 + 57, y0 + 27, AP.vidrio); rect(x0 + 40, y0 + 15, x0 + 60, y0 + 17, AP.caobaD); }
    }
    rect(28, 108, 70, 139, AP.museoS); rect(29, 108, 69, 109, AP.museoL); rect(30, 84, 68, 107, a_mezcla(AP.museo, AP.vidrioL, 0.25)); rect(30, 84, 68, 84, AP.vidrioL); rect(30, 84, 30, 107, AP.vidrioL); rect(68, 84, 68, 107, AP.vidrioS);
    rect(46, 92, 50, 106, AP.verdeFS); rect(47, 92, 49, 105, AP.verdeF); rect(47, 88, 49, 91, AP.verdeFS); rect(47, 87, 49, 87, AP.caobaD); pset(47, 94, AP.verdeFL);
    rect(54, 100, 59, 106, AP.vidrioS); rect(55, 100, 58, 105, AP.vidrio); rect(36, 104, 42, 106, AP.pergamino);
    // la fila de fotos antiguas en sepia, la cartela grande con su número y los focos de carril del techo
    for (const [x0, y0] of [[14, 22], [36, 22], [58, 22], [236, 26], [258, 88]]) { rect(x0, y0, x0 + 18, y0 + 13, AP.caobaD); rect(x0 + 2, y0 + 2, x0 + 16, y0 + 11, hex('#c8a87a')); rect(x0 + 2, y0 + 8, x0 + 16, y0 + 11, hex('#9a7a52')); rect(x0 + 6 + (x0 % 5), y0 + 4, x0 + 9 + (x0 % 5), y0 + 9, hex('#6a4a2a')); rect(x0 + 6 + (x0 % 5), y0 + 3, x0 + 9 + (x0 % 5), y0 + 3, hex('#4a3420')); rect(x0 + 12, y0 + 5, x0 + 14, y0 + 9, hex('#7a5a38')); }
    rect(14, 98, 24, 126, AP.museoL); rect(15, 99, 23, 125, AP.panel); for (let k = 0; k < 6; k++) rect(16, 102 + k * 4, 22 - (k % 3), 102 + k * 4, AP.panelS);
    rect(232, 116, 276, 126, AP.museoS); rect(233, 117, 275, 125, AP.panelS); for (let x = 236; x < 272; x += 9) rect(x, 119, x + 6, 123, AP.panel);
    rect(20, 4, 260, 5, AP.museoL);
    // el cartel luminoso de salida (pictograma de la figura que corre y la flecha) y las juntas de los paneles de pared
    rect(84, 18, 100, 25, AP.museoS); rect(85, 19, 99, 24, hex('#2e9a56')); pset(88, 20, hex('#e8fff0')); rect(88, 21, 88, 22, hex('#e8fff0')); pset(87, 23, hex('#e8fff0')); pset(89, 23, hex('#e8fff0')); pset(87, 21, hex('#e8fff0')); pset(89, 21, hex('#e8fff0'));
    rect(92, 21, 97, 21, hex('#e8fff0')); pset(96, 20, hex('#e8fff0')); pset(96, 22, hex('#e8fff0'));
    for (const sx of [8, 88, 228, 308]) for (let y = 30; y < 128; y++) { pset(sx, y, AP.museoS); if (y % 2) pset(sx + 1, y, AP.museoL); }
  }
}
// la gran puerta redonda: o.abre 0–0,25 gira el volante y el dial; de 0,25 a 1 se abre sobre la bisagra de la derecha
function a_puertaBoveda(R, t, abre) {
  const R0 = 40, cy = 84, xh = 200, T = 22, gira = Math.min(1, abre / 0.25), u = Math.max(0, (abre - 0.25) / 0.75), th = u * 1.42, cs = Math.cos(th), sn = Math.sin(th);
  const tiemble = abre > 0.2 && abre < 0.3 ? Math.round(Math.sin(t * 60)) : 0;
  const fxS = (fx) => xh - (R0 - fx * R0) * cs + tiemble;
  for (let y = cy - R0; y <= cy + R0; y++) {
    const dy = y - cy, hw = Math.sqrt(Math.max(0, R0 * R0 - dy * dy)), xlF = xh - (R0 + hw) * cs, xrF = xh - (R0 - hw) * cs, xlB = xlF - T * sn;
    // el canto gordo de la puerta, con las ranuras del torno
    for (let x = Math.floor(xlB); x < Math.ceil(xlF); x++) { const q = (xlF - x) / Math.max(0.01, T * sn), ranura = Math.floor(q * 7) !== Math.floor(((xlF - x - 1) / Math.max(0.01, T * sn)) * 7);
      const l = -dy / R0; R.pset(x + tiemble, y, ranura ? AP.aceroS : l > 0.4 ? AP.aceroLL : l > -0.3 ? AP.aceroL : AP.acero); }
    // la cara pulida: anillos de torno con el brillo en pajarita
    if (cs > 0.06) for (let x = Math.floor(xlF); x <= Math.ceil(xrF); x++) {
      const fx = (x - (xh - R0 * cs)) / (R0 * cs), fy = dy / R0, d = Math.hypot(fx, fy); if (d > 1) continue;
      const ang = Math.atan2(fy, fx), br = Math.abs(Math.cos(2 * (ang + 0.75))) * (0.55 + 0.45 * cs) + (Math.floor(d * 34) % 3 === 0 ? -0.18 : 0);
      let c = br > 0.78 ? AP.aceroLL : br > 0.5 ? AP.aceroL : br > 0.25 ? AP.acero : AP.aceroS;
      if (d > 0.93) c = d > 0.98 ? AP.aceroK : AP.aceroS; else if (d > 0.74 && d < 0.77) c = AP.aceroD; else if (d > 0.77 && d < 0.79) c = AP.aceroLL;
      if (fy > -0.74 && fy < -0.6 && Math.abs(fx) < 0.3) c = Math.abs(fy + 0.67) < 0.02 || Math.abs(fx) > 0.27 ? AP.latonS : (Math.abs(fy + 0.67) < 0.05 && Math.abs(fx) < 0.2 ? AP.latonS : C.laton);
      R.pset(x + tiemble, y, c);
    }
    // los cerrojos cromados asoman del canto cuando la puerta está abierta
    if (sn > 0.25) for (const b of [-0.82, -0.55, -0.27, 0, 0.27, 0.55, 0.82]) if (Math.abs(dy / R0 - b) < 0.001 + 0.5 / R0) { const bx = Math.round(xlF - T * sn * 0.5), by = y; const w = Math.max(1, Math.round(3 * sn)); for (let i = -w; i <= w; i++) for (let j = -3; j <= 3; j++) if ((i / (w + 0.5)) ** 2 + (j / 3.5) ** 2 < 1) R.pset(bx + i + tiemble, by + j, j < -1 ? AP.aceroLL : j > 1 ? AP.aceroS : AP.aceroL); }
  }
  if (cs <= 0.06) return;
  // los remaches del borde
  for (let k = 0; k < 20; k++) { const a = k * Math.PI / 10, x = Math.round(fxS(Math.cos(a) * 0.955)), y = Math.round(cy + Math.sin(a) * R0 * 0.955); R.pset(x, y, AP.aceroLL); R.pset(x + 1, y + 1, AP.aceroK); }
  // el dial de la combinación, que gira, y el volante de tres radios con sus seis pomos
  const dcx = fxS(0), dcy = cy - 13, gd = gira * 9 + (abre === 0 ? 0 : 0), rw = 6 * cs;
  for (let j = -6; j <= 6; j++) for (let i = -7; i <= 7; i++) { const nx = i / Math.max(0.6, rw), d = Math.hypot(nx, j / 6); if (d > 1) continue; R.pset(Math.round(dcx + i), dcy + j, d > 0.82 ? C.laton : d > 0.7 ? AP.latonS : AP.aceroK); }
  for (let k = 0; k < 10; k++) { const a = gd + k * Math.PI / 5; R.pset(Math.round(dcx + Math.cos(a) * rw * 0.62), Math.round(dcy + Math.sin(a) * 3.7), k ? AP.etiqueta : AP.rojoF); }
  R.pset(Math.round(dcx), dcy - 6, AP.rojoF);
  const wcx = fxS(0), wcy = cy + 8, gw = gira * Math.PI * 1.5;
  for (let k = 0; k < 6; k++) { const a = gw + k * Math.PI / 3, ex = wcx + Math.cos(a) * 17 * cs, ey = wcy + Math.sin(a) * 17;
    R.linea(Math.round(wcx), wcy + 1, Math.round(ex), Math.round(ey) + 1, AP.aceroK); R.linea(Math.round(wcx), wcy, Math.round(ex), Math.round(ey), AP.aceroS); R.linea(Math.round(wcx), wcy - 1, Math.round(ex), Math.round(ey) - 1, AP.aceroLL);
    const kx = Math.round(wcx + Math.cos(a) * 20 * cs), ky = Math.round(wcy + Math.sin(a) * 20); R.disco(kx, ky + 1, 3, AP.aceroK); R.disco(kx, ky, 3, AP.aceroS); R.disco(kx - 1, ky - 1, 2, AP.aceroL); R.pset(kx - 1, ky - 2, AP.aceroLL); }
  for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i / Math.max(0.6, 4.5 * cs), j / 4.5); if (d <= 1) R.pset(Math.round(wcx + i), wcy + j, d > 0.75 ? AP.aceroS : (i + j < 0 ? AP.aceroLL : AP.aceroL)); }
}

function a_boveda(R, t, o = {}) {
  const museo = !!o.museo, vacia = !!o.vacia && !museo, abre = Math.max(0, Math.min(1, o.abre ?? (museo ? 1 : 0))), u = Math.max(0, (abre - 0.25) / 0.75);
  a_capa(R, museo ? 'museo' : vacia ? 'boveda-vacia' : 'boveda', () => a_bovedaFija(R, museo, vacia));
  // la aguja de la cerradura de tiempo, que avanza a saltitos, y la lucecita que late
  { const a = Math.floor(t * 2) * 0.12 - Math.PI / 2; R.linea(117, 41, 117 + Math.round(Math.cos(a) * 4), 41 + Math.round(Math.sin(a) * 4), AP.rojoFS); R.pset(117, 41, AP.tinta); R.pset(124, 36, (t % 1) < 0.5 ? AP.verdeLL : AP.verdeLS); }
  // las llaves que cuelgan de dos cajas, con su borla que se mece
  if (!museo) for (const [kx, ky, k] of [[47, 69, 0], [295, 76, 1]]) { const sw = Math.round(Math.sin(t * 1.6 + k * 2) * 1.4); R.pset(kx, ky, AP.aceroLL); R.pset(kx, ky + 1, AP.aceroL); R.pset(kx, ky + 2, AP.aceroL); R.pset(kx - 1, ky + 3, AP.aceroL); R.pset(kx + 1, ky + 3, AP.aceroL); R.pset(kx, ky + 4, AP.aceroS);
    R.pset(kx + Math.round(sw / 2), ky + 5, AP.terciopelo); R.rect(kx - 1 + sw, ky + 6, kx + 1 + sw, ky + 8, AP.terciopelo); R.pset(kx - 1 + sw, ky + 6, AP.terciopeloL); R.pset(kx + sw, ky + 9, AP.terciopeloS); }
  // las lámparas verdes colgadas (o los focos del museo), que se mecen un poco, con su cono de luz
  if (!museo) for (const [x, k] of [[50, 0], [252, 1]]) {
    const sw = Math.round(Math.sin(t * 0.9 + k * 2) * 1.2);
    for (let y = 30; y < 140; y++) { const w = (y - 28) * 0.42; for (let xx = Math.round(x + sw - w); xx <= x + sw + w; xx++) if (a_bayer(xx, y) < 0.22 - (y - 30) * 0.0012) R.pset(xx, y, a_mezcla(R.pget(xx, y), AP.luzV, 0.3)); }
    R.linea(x, 0, x + sw, 20, AP.granitoD); R.rect(x + sw - 2, 19, x + sw + 2, 21, C.laton);
    for (let j = 0; j < 7; j++) { const w = 2 + j; R.rect(x + sw - w, 22 + j, x + sw + w, 22 + j, j < 2 ? AP.verdeLL : j < 5 ? AP.verdeL : AP.verdeLS); }
    R.rect(x + sw - 8, 29, x + sw + 8, 29, AP.verdeLS); R.rect(x + sw - 3, 30, x + sw + 3, 30, AP.luzV); R.pset(x + sw - 3, 23, hex('#ffffff'));
  } else for (const [x, k] of [[40, 0], [120, 1], [200, 2], [256, 3]]) {
    for (let y = 8; y < 140; y++) { const w = (y - 6) * 0.3; for (let xx = Math.round(x + (y - 6) * 0.12 - w); xx <= x + (y - 6) * 0.12 + w; xx++) if (a_bayer(xx, y) < 0.3 - (y - 8) * 0.0015) R.pset(xx, y, a_mezcla(R.pget(xx, y), AP.foco, 0.25)); }
    R.rect(x - 2, 5, x + 2, 9, AP.museoS); R.rect(x - 1, 10, x + 2, 10, AP.foco);
  }
  // una polilla que da vueltas a la lámpara de la izquierda; en el museo, la cámara de seguridad que barre la sala
  if (!museo) { const a = t * 3.1, x = Math.round(50 + Math.sin(t * 0.9) * 1.2 + Math.cos(a) * 9), y = Math.round(27 + Math.sin(a * 1.3) * 4), ala = Math.sin(t * 30) > 0; R.pset(x, y, AP.lozaS); R.pset(x - 1, y - (ala ? 1 : 0), AP.loza); R.pset(x + 1, y - (ala ? 1 : 0), AP.loza); }
  else { const g = Math.sin(t * 0.5) * 0.5; R.rect(229, 14, 233, 16, AP.museoL); R.rect(231, 17, 231, 18, AP.aceroS);
    const dx = Math.round(Math.cos(g) * 5), x0 = 231 - Math.round(dx / 2); R.rect(Math.min(x0, x0 + dx) - 1, 19, Math.max(x0, x0 + dx) + 1, 22, AP.aceroL); R.rect(Math.min(x0, x0 + dx) - 1, 22, Math.max(x0, x0 + dx) + 1, 22, AP.aceroS); R.pset(x0 + dx + (dx > 0 ? 1 : -1), 20, AP.aceroK); if ((t % 1.6) < 0.4) R.pset(x0, 20, AP.rojoFL); }
  // la luz de dentro se derrama por el suelo al abrirse la puerta
  if (u > 0) { a_halo(R, 160, 88, 30, AP.interior, u * 0.6, 32); for (let y = 128; y < 180; y++) { const k = (y - 124) / 55, x0 = Math.round(126 - k * 46), x1 = Math.round(194 + k * 30 - (1 - u) * 60); for (let x = x0; x <= x1; x++) if (a_bayer(x, y) < u * 0.42 * (1 - k * 0.5)) R.pset(x, y, a_mezcla(R.pget(x, y), AP.interior, 0.4)); } }
  // el papelito doblado en el atril, con un destello
  if (o.papelito !== false && u > 0) { PIEZAS_NC.papelito?.(R, 160, 103, {}); if ((t % 2.4) < 0.5) { const s = Math.round((t % 2.4) * 6); R.pset(163, 95 - s % 3, hex('#ffffff')); R.pset(162 - s % 2, 95, hex('#ffffff')); R.pset(164, 95, hex('#ffffff')); R.pset(163, 94, hex('#ffffff')); R.pset(163, 96, hex('#ffffff')); } }
  a_puertaBoveda(R, t, abre);
  // las motas en la luz
  for (let k = 0; k < 8; k++) { const x = Math.round((museo ? 150 : 40) + h(k, 1, 103) * 30 + Math.sin(t * 0.6 + k) * 4) + (k > 3 ? 200 : 0), y = Math.round(130 - ((h(k, 2, 103) * 90 + t * 3) % 90)); if (Math.sin(t + k * 2) > -0.2 && !(x >= 278 && y <= 44)) R.pset(x, y, museo ? AP.foco : AP.luzV); }
  if (museo) { // la pantalla del museo, que cambia de pictograma
    const c = Math.floor(t / 2.5) % 3; R.rect(244, 92, 270, 110, AP.aceroK); R.rect(245, 93, 269, 109, hex('#1e3a5a'));
    if (c === 0) { R.rect(255, 96, 258, 107, AP.verdeF); R.rect(256, 94, 257, 95, AP.verdeF); } else if (c === 1) { R.disco(257, 101, 6, AP.aceroL); R.disco(257, 101, 3, AP.aceroS); } else { R.rect(250, 97, 263, 105, AP.etiqueta); R.linea(250, 97, 256, 102, AP.lozaS); R.linea(263, 97, 257, 102, AP.lozaS); }
    R.rect(245, 109, 245 + Math.floor((t % 2.5) / 2.5 * 24), 109, AP.foco);
  }
  if (!museo && o.guardia !== false) { const ciclo = t % 14, va = ciclo < 4 ? ciclo / 4 : ciclo < 7 ? 1 : ciclo < 11 ? 1 - (ciclo - 7) / 4 : 0, anda = (ciclo < 4) || (ciclo >= 7 && ciclo < 11);
    R.actor(ELENCO_CHIBI.policia, Math.round(272 + va * 26), 154, t, { dir: ciclo >= 7 && ciclo < 11 ? -1 : ciclo < 4 ? 1 : (ciclo < 7 ? -1 : 1), anda }); }
  return { suelo: 164, puerta: [160, 84, 40], atril: [160, 103], cuerda: museo ? 152 : null, guardia: !museo && o.guardia !== false ? [272, 298, 154] : null };
}
function a_bovedaDelante(R, t, o = {}) {
  if (!o.museo) return { suelo: 164 };
  // los postes de latón con la cuerda de terciopelo que se mece
  const P = [70, 130, 190, 250];
  for (let k = 0; k < P.length - 1; k++) { const a = P[k], b = P[k + 1], sw = Math.sin(t * 1.2 + k) * 1.2;
    for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(134 + Math.sin(u * Math.PI) * (7 + sw)); R.pset(x, y, AP.terciopelo); R.pset(x, y + 1, AP.terciopeloS); if (x % 5 === 0) R.pset(x, y, AP.terciopeloL); } }
  for (const x of P) { R.rect(x - 1, 134, x + 1, 155, AP.latonS); R.rect(x - 1, 134, x - 1, 155, AP.latonL); R.disco(x, 133, 2, C.laton); R.pset(x - 1, 132, AP.latonL); R.rect(x - 4, 156, x + 4, 157, AP.latonS); R.rect(x - 3, 156, x + 3, 156, C.laton); for (let i = -4; i <= 4; i++) if (i % 2) R.pset(x + i, 158, hex('#1e1e26')); }
  return { suelo: 164 };
}

function a_despachoFija(R) {
  const { rect, pset, disco, linea } = R;
  // el techo de yeso, la cornisa y el papel pintado granate con su damasco
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 13 ? AP.estucoS : h(x >> 2, y >> 1, 111) > 0.9 ? AP.estucoS : AP.estuco);
  rect(0, 14, 319, 14, AP.cornisaL); rect(0, 15, 319, 17, AP.cornisa); for (let x = 0; x < 320; x++) pset(x, 18, x % 4 < 2 ? AP.cornisaS : AP.cornisa); rect(0, 19, 319, 20, AP.cornisaS);
  for (let y = 21; y < 93; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 21) / 14), u = (x + (fila % 2) * 7) % 14, v = (y - 21) % 14, m = Math.abs(u - 7) / 3.5 + Math.abs(v - 7) / 6, n = Math.abs(u - 7) / 1.5 + Math.abs(v - 7) / 3;
    pset(x, y, n < 1 ? AP.granate : m < 1 ? AP.granateL : u === 0 ? AP.granateS : AP.granate); }
  rect(0, 27, 319, 27, AP.latonS);   // la moldura de colgar cuadros
  a_zocalo(R, 0, 319, 93, 127, 3);
  // el parqué oscuro y la alfombra persa en perspectiva, con su cenefa y sus flecos
  a_tablas(R, 128, 179, 160, 30, [AP.nogalS, AP.nogal, a_mezcla(AP.nogalS, AP.nogal, 0.5)]);
  for (let y = 140; y < 177; y++) { const k = (y - 140) / 36, xa = Math.round(64 - k * 30), xb = Math.round(256 + k * 30); for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), v = k, bu = Math.min(u, 1 - u) * 8, bv = Math.min(v, 1 - v) * 3.5, b = Math.min(bu, bv);
    let c; if (b < 0.18) c = hex('#2a1a3a'); else if (b < 0.55) c = (Math.floor(u * 60) + Math.floor(v * 10)) % 3 ? hex('#b8902c') : hex('#2a1a3a'); else if (b < 0.7) c = hex('#6a1a1e'); else { const mx = Math.abs(u - 0.5) * 4, my = Math.abs(v - 0.5) * 2.2, md = mx + my; c = md < 0.35 ? hex('#2a3a6a') : md < 0.42 ? hex('#d8c08a') : md < 0.75 ? hex('#8a2228') : ((Math.floor(u * 40) + Math.floor(v * 12)) % 4 === 0 ? hex('#5a1418') : hex('#7a1c22')); }
    pset(x, y, c); } }
  for (let x = 34; x < 287; x += 2) { pset(x, 177, AP.etiqueta); pset(x, 178, AP.pergaminoS); }
  // la ventana: marco, el hueco del cristal (lo pinta cada fotograma), las cortinas de terciopelo y la galería con flecos
  rect(20, 28, 86, 110, AP.caobaS); rect(21, 29, 85, 109, AP.caoba); rect(21, 29, 85, 29, AP.caobaL); rect(18, 108, 88, 111, AP.caobaL); rect(18, 112, 88, 113, AP.caobaS);
  for (const [x0, x1, d] of [[10, 30, 1], [76, 96, 1]]) for (let y = 24; y < 128; y++) { const tie = y > 70 && y < 90 ? Math.round(Math.sin((y - 70) / 20 * Math.PI) * 4) : 0, a = x0 === 10 ? x0 : x0 + tie, b = x0 === 10 ? x1 - tie : x1;
    for (let x = a; x <= b; x++) { const f = Math.sin((x - x0) * 0.9 + y * 0.02); pset(x, y, f > 0.6 ? AP.terciopeloL : f > -0.3 ? AP.terciopelo : AP.terciopeloS); } }
  for (const x of [26, 80]) { rect(x - 3, 79, x + 3, 81, C.laton); pset(x - 2, 79, AP.latonL); rect(x - 1, 82, x + 1, 88, AP.latonS); }
  rect(8, 20, 98, 31, AP.terciopelo); for (let x = 8; x <= 98; x++) { const s = Math.round(Math.abs(Math.sin((x - 8) / 90 * Math.PI * 3)) * 3); rect(x, 31, x, 31 + s, AP.terciopelo); pset(x, 32 + s, x % 2 ? C.laton : AP.latonS); } rect(8, 20, 98, 21, AP.terciopeloL); rect(8, 25, 98, 25, AP.terciopeloS);
  // el mapa enmarcado: pergamino con manchas, la costa, los ríos, las montañas y la rosa de los vientos
  rect(102, 30, 194, 84, AP.oroMS); rect(103, 31, 193, 83, AP.oroM); rect(103, 31, 193, 31, AP.oroML); rect(105, 33, 191, 81, AP.oroMS);
  for (let y = 34; y < 81; y++) for (let x = 106; x < 191; x++) { const mar = (x - 106) * 0.55 + (y - 34) * 0.9 > 70 + Math.sin(y * 0.35) * 4 + Math.sin(x * 0.2) * 3 || (y > 70 && x > 140 && x < 168 - (y - 70));
    const borde = !mar && ((x + 1 - 106) * 0.55 + (y - 34) * 0.9 > 70 + Math.sin(y * 0.35) * 4 + Math.sin((x + 1) * 0.2) * 3);
    pset(x, y, borde ? AP.tinta : mar ? (h(x >> 1, y >> 1, 113) > 0.8 ? hex('#9ab4b8') : hex('#aec4c4')) : (h(x >> 2, y >> 2, 114) > 0.85 ? AP.pergaminoS : AP.pergamino)); }
  for (const [ax, ay, bx, by] of [[112, 36, 130, 60], [150, 34, 158, 66], [170, 36, 176, 50]]) { let px = ax, py = ay; for (let s = 1; s <= 10; s++) { const nx = Math.round(ax + (bx - ax) * s / 10 + Math.sin(s * 1.7) * 2), ny = Math.round(ay + (by - ay) * s / 10); linea(px, py, nx, ny, hex('#5a8aaa')); px = nx; py = ny; } }
  for (const [mx, my] of [[124, 42], [130, 40], [136, 43], [118, 46]]) { pset(mx, my, AP.tinta); pset(mx - 1, my + 1, AP.tinta); pset(mx + 1, my + 1, AP.tinta); }
  { const rx = 182, ry = 72; linea(rx - 4, ry, rx + 4, ry, AP.tinta); linea(rx, ry - 4, rx, ry + 4, AP.tinta); pset(rx, ry - 5, AP.rojoFS); }
  // el teléfono de pared de manivela (caja de madera, dos timbres, la bocina y el auricular colgado)
  rect(198, 50, 210, 84, AP.nogalS); rect(199, 51, 209, 83, AP.nogal); rect(199, 51, 209, 51, AP.nogalL); disco(201, 55, 2, C.laton); disco(207, 55, 2, C.laton); pset(200, 54, AP.latonL); pset(206, 54, AP.latonL);
  rect(202, 64, 206, 66, AP.coche); rect(203, 67, 205, 70, AP.coche); rect(210, 62, 212, 63, AP.coche); rect(212, 60, 212, 66, AP.coche);
  rect(196, 60, 197, 70, AP.coche); rect(195, 70, 197, 73, AP.coche); linea(197, 74, 199, 80, AP.caobaD);
  // el paisaje con marco dorado
  rect(216, 34, 254, 64, AP.oroMS); rect(217, 35, 253, 63, AP.oroM); rect(217, 35, 253, 35, AP.oroML); rect(219, 37, 251, 61, AP.oroMS);
  for (let y = 38; y < 61; y++) for (let x = 220; x < 251; x++) { const cerro = 50 + Math.sin(x * 0.18) * 4, cerro2 = 54 + Math.sin(x * 0.11 + 2) * 3; pset(x, y, y > cerro2 ? (Math.abs(y - (57 + Math.sin(x * 0.3))) < 1 ? hex('#7ab0c8') : hex('#5a7a3a')) : y > cerro ? hex('#7a9a5a') : y > 46 ? hex('#e8d8a8') : hex('#a8c4d8')); }
  disco(244, 42, 2, hex('#f8e8b0'));
  // el perchero con dos bombines y un abrigo
  rect(226, 76, 227, 127, AP.caobaS); rect(225, 76, 225, 127, AP.caoba); rect(220, 126, 232, 127, AP.caobaD); for (const d of [-1, 1]) linea(226, 80, 226 + d * 6, 77, AP.caobaS);
  rect(217, 73, 223, 76, AP.coche); rect(216, 76, 224, 76, AP.coche); rect(229, 73, 235, 76, AP.coche); rect(228, 76, 236, 76, AP.coche); pset(218, 74, AP.cocheL);
  for (let y = 80; y < 108; y++) { const w = 3 + Math.floor((y - 80) / 7); rect(226 - w, y, 226 + w - 2, y, (y + 226) % 7 ? AP.ropa1 : a_mezcla(AP.ropa1, 0xff000000, 0.3)); }
  // el sillón de cuero detrás del escritorio, con sus tachuelas
  for (let y = 104; y < 134; y++) { const w = y < 108 ? 9 + (y - 104) : 13; rect(170 - w, y, 170 + w, y, AP.rojoFS); if (y > 107) { rect(170 - w + 2, y, 170 + w - 2, y, a_mezcla(AP.rojoFS, AP.caobaD, 0.3)); for (let x = 170 - w + 4; x < 170 + w - 3; x += 6) if ((y - 108) % 7 === 3) pset(x, y, AP.caobaD); } }
  for (let x = 158; x <= 182; x += 2) pset(x, 108, C.laton); rect(157, 104, 183, 104, a_mezcla(AP.rojoFS, AP.rojoF, 0.5));
  // la puerta del pasillo: el marco (la hoja y lo de detrás los pinta cada fotograma)
  rect(276, 47, 316, 127, AP.caobaS); rect(277, 48, 315, 127, AP.caoba); rect(277, 48, 315, 48, AP.caobaL);
}

function a_despacho(R, t, o = {}) {
  a_capa(R, 'despacho', () => a_despachoFija(R));
  // la calle por la ventana (un primer piso: se ve la acera de enfrente, el tranvía de mulas y la acera de abajo)
  { const cl = [25, 33, 81, 105]; R.recorte(cl); a_calle(R, cl, t, 66, { tranvia: true, k: 1 }); a_rc(R, cl, 25, 91, 81, 105, AP.tablon); for (let x = 25; x < 82; x += 6) a_rc(R, cl, x, 91, x, 105, AP.junta); a_rc(R, cl, 25, 91, 81, 91, AP.junta);
    a_rc(R, cl, 60, 84, 62, 98, AP.coche); a_rc(R, cl, 58, 84, 64, 84, AP.coche); R.recorte(null); }
  R.rect(52, 33, 53, 105, AP.caoba); R.rect(25, 67, 81, 69, AP.caoba); R.rect(25, 67, 81, 67, AP.caobaL);
  for (const [x0, x1] of [[31, 51], [54, 75]]) for (let k = 0; k < 2; k++) { const b = x0 + 3 + k * 8; for (let y = 34; y < 104; y++) { const x = b + Math.round((104 - y) * 0.25) % (x1 - x0); if (x <= x1 && y % 2) R.pset(x, y, a_mezcla(R.pget(x, y), AP.vidrioL, 0.45)); } }
  // las cortinas tapan los bordes del cristal (se repintan encima)
  for (const [x0, x1] of [[10, 30], [76, 96]]) for (let y = 33; y < 106; y++) { const tie = y > 70 && y < 90 ? Math.round(Math.sin((y - 70) / 20 * Math.PI) * 4) : 0, a = x0 === 10 ? x0 : x0 + tie, b = x0 === 10 ? x1 - tie : x1;
    for (let x = Math.max(a, x0 === 10 ? 25 : a); x <= Math.min(b, x0 === 10 ? b : 81); x++) { const f = Math.sin((x - x0) * 0.9 + y * 0.02); R.pset(x, y, f > 0.6 ? AP.terciopeloL : f > -0.3 ? AP.terciopelo : AP.terciopeloS); } }
  for (const x of [26, 80]) { R.rect(x - 3, 79, x + 3, 81, C.laton); R.pset(x - 2, 79, AP.latonL); R.rect(x - 1, 82, x + 1, 88, AP.latonS); }
  // el rayo de luz de la ventana en el suelo, con motas
  for (let y = 129; y < 178; y++) { const d = y - 128, x0 = Math.round(30 + d * 1.3), x1 = Math.round(76 + d * 1.9); for (let x = x0; x <= x1; x++) if (a_bayer(x, y) < 0.3) R.pset(x, y, a_mezcla(R.pget(x, y), AP.sol, 0.35)); }
  for (let k = 0; k < 8; k++) { const x = Math.round(70 + h(k, 7, 115) * 60 + Math.sin(t * 0.5 + k) * 4), y = Math.round(160 - ((h(k, 8, 115) * 50 + t * 2) % 50)); if (Math.sin(t * 1.3 + k * 2) > -0.3) R.pset(x, y, AP.vidrioL); }
  // las rutas de las botellas que salen de Atlanta por el mapa, con botellitas que viajan
  { const A = [138, 54], D = [[112, 38], [116, 74], [168, 38], [186, 56], [160, 78], [108, 56]], g = Math.max(0, Math.min(1, o.rutas ?? 1));
    D.forEach(([dx, dy], k) => { const f = Math.max(0, Math.min(1, g * D.length - k * 0.6)); if (f <= 0) return; const n = Math.round(Math.hypot(dx - A[0], dy - A[1]) * f);
      for (let s = 0; s <= n; s += 2) { const u = s / Math.hypot(dx - A[0], dy - A[1]), x = Math.round(A[0] + (dx - A[0]) * u), y = Math.round(A[1] + (dy - A[1]) * u + Math.sin(u * Math.PI) * 3); R.pset(x, y, AP.rojoFS); }
      if (f >= 1) { R.rect(dx - 1, dy - 1, dx + 1, dy + 1, AP.rojoFS); const u = ((t * 0.25 + k * 0.17) % 1), x = Math.round(A[0] + (dx - A[0]) * u), y = Math.round(A[1] + (dy - A[1]) * u + Math.sin(u * Math.PI) * 3); R.rect(x, y - 2, x + 1, y + 1, AP.caobaD); R.pset(x, y - 3, AP.caobaD); R.pset(x, y - 1, AP.ambarL); } });
    R.disco(A[0], A[1], 2, AP.rojoF); R.pset(A[0], A[1], AP.etiqueta); }
  // la caja fuerte pequeña junto a la pared
  PIEZAS_NC.cajaFuerte?.(R, 256, 127, { abre: o.abre ?? 0 });
  for (let i = -22; i <= 22; i++) if (i % 2) R.pset(256 + i, 128, AP.caobaD);
  // la puerta del pasillo: la hoja de cuarterones que gira y, detrás, el pasillo con su lámpara
  { const p = Math.max(0, Math.min(1, o.puerta ?? 0)), cl = [278, 49, 314, 127];
    if (p > 0) { R.rect(278, 49, 314, 127, hex('#3a2a28')); for (let y = 49; y < 110; y++) for (let x = 278; x <= 314; x++) if ((x + y) % 4 === 0) R.pset(x, y, hex('#4a3230')); R.rect(278, 110, 314, 127, AP.nogalS); R.rect(286, 112, 306, 127, AP.terciopeloS);
      a_halo(R, 300, 70, 14, AP.halo, 0.7); R.rect(299, 74, 301, 78, AP.latonS); a_llama(R, 300, 72, t, 7); }
    const w = Math.round(36 * Math.cos(p * 1.35));
    if (w > 1) { R.recorte(cl); for (let y = 49; y <= 127; y++) for (let x = 278; x <= 278 + w; x++) { const u = (x - 278) / w, v = y; let c = AP.nogal; if (u < 0.06 || u > 0.94 || (v > 84 && v < 88)) c = AP.nogalS; else if ((u > 0.15 && u < 0.45 || u > 0.55 && u < 0.85) && (v > 54 && v < 82 || v > 92 && v < 122)) c = (u < 0.18 || (u > 0.55 && u < 0.58) || v === 55 || v === 93) ? AP.nogalL : AP.nogal; else if (u > 0.45 && u < 0.55) c = AP.nogalS; R.pset(x, y, c); }
      R.disco(278 + Math.round(w * 0.88), 90, 1, C.laton); R.recorte(null); }
    if (p > 0 && w <= 1) R.linea(278, 49, 278, 127, AP.nogalS); }
  return { suelo: 164, sueloDetras: 136, escritorio: [116, 132, 232], puerta: [278, 49, 314, 127], sueloPuerta: 128, cajaFuerte: [256, 127], mapa: [102, 30, 194, 84], atlantaMapa: [138, 54], ventana: [25, 33, 81, 105] };
}

function a_despachoDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  // el escritorio de caoba: tablero con el cuero verde, canto con moldura, dos pedestales de cajones y el hueco del centro
  rect(114, 132, 232, 135, AP.caobaL); rect(118, 132, 228, 134, AP.verdeLS); rect(118, 132, 228, 132, AP.verdeL); rect(114, 136, 232, 137, AP.caoba); rect(114, 137, 232, 137, AP.caobaS);
  for (const [x0, x1] of [[116, 150], [196, 230]]) { rect(x0, 138, x1, 152, AP.caoba); rect(x0, 138, x0, 152, AP.caobaL); rect(x1, 138, x1, 152, AP.caobaS);
    for (let k = 0; k < 3; k++) { const y = 139 + k * 5; rect(x0 + 2, y, x1 - 2, y + 3, AP.caobaS); rect(x0 + 2, y, x1 - 3, y + 2, AP.caoba); rect(x0 + 2, y, x1 - 3, y, AP.caobaL); const cx = (x0 + x1) >> 1; rect(cx - 2, y + 1, cx + 2, y + 2, AP.latonS); rect(cx - 2, y + 1, cx + 2, y + 1, C.laton); }
    for (let y = 139; y < 152; y++) if (h(x0, y, 117) > 0.5) pset(x0 + 1 + Math.floor(h(x0, y, 118) * (x1 - x0 - 2)), y, AP.caobaL); }
  rect(151, 138, 195, 143, AP.caoba); rect(151, 138, 195, 138, AP.caobaL); rect(170, 140, 176, 141, C.laton); rect(151, 144, 195, 152, AP.caobaD); for (let x = 152; x < 195; x += 2) pset(x, 144, AP.caobaS);
  rect(114, 152, 120, 154, AP.caobaD); rect(226, 152, 232, 154, AP.caobaD); rect(146, 152, 150, 154, AP.caobaD); rect(196, 152, 200, 154, AP.caobaD);
  // encima: la lámpara verde con su luz, el tintero con la pluma, los papeles y el cenicero con el puro que humea
  a_halo(R, 220, 128, 16, AP.luzV, 0.8, 8);
  rect(216, 129, 224, 131, AP.latonS); rect(217, 129, 223, 129, C.laton); rect(219, 121, 220, 128, AP.latonS);
  for (let j = 0; j < 5; j++) rect(212 - (j >> 1), 116 + j, 227 + (j >> 1), 116 + j, j < 2 ? AP.verdeL : AP.verdeLS); pset(214, 116, AP.verdeLL); rect(214, 121, 225, 121, AP.luzV);
  rect(124, 128, 132, 131, AP.vidrioS); rect(125, 128, 131, 130, AP.caobaD); rect(126, 127, 130, 127, C.laton); linea(129, 127, 136, 115, AP.etiqueta); linea(130, 126, 137, 116, AP.lozaS); pset(137, 114, AP.etiqueta);
  for (let k = 0; k < 3; k++) { rect(140 + k, 129 - k, 158 + k, 130 - k, k === 2 ? AP.etiqueta : AP.lozaS); } for (let k = 0; k < 3; k++) rect(144, 127 - k * 0, 154 - k * 3, 127, AP.lozaS);
  rect(196, 130, 206, 131, AP.aceroS); rect(197, 129, 205, 129, AP.aceroL); rect(199, 128, 205, 128, AP.caobaS); pset(198, 128, Math.sin(t * 5) > 0 ? AP.llamaS : AP.rojoF);
  for (let k = 0; k < 9; k++) { const f = ((t * 0.5 + k / 9) % 1), y = Math.round(127 - f * 22), x = Math.round(198 + Math.sin(f * 7 + t * 1.5) * (1 + f * 3)); if (f < 0.9 && (k + Math.floor(t * 4)) % 3) pset(x, y, a_mezcla(AP.vidrioL, AP.granate, f * 0.6)); }
  return { suelo: 164 };
}

// la paleta propia de los decorados de B: el súper de 1975 (techo, franjas, chapa, linóleo), el despacho y el laboratorio
const b_P = pal({
  techo: '#ddd4ba', techoS: '#c6bb9e', techoL: '#eae2ca', marco: '#b4aa90', tubo: '#fbfbf0', tuboS: '#dfe8e2', tuboOff: '#8e8c84',
  pared: '#e6d6ae', paredS: '#d0bc90', paredL: '#f0e4c4', naranja: '#e07a2a', naranjaS: '#b0561a', mostaza: '#dcaa32', mostazaS: '#a8801c', marron: '#7a4a24',
  gond: '#c4beb0', gondL: '#e4e0d6', gondS: '#9a948a', gondD: '#625e58', aguj: '#aaa496', tira: '#f0ecdf', etiq: '#f0d040',
  suelo: '#e6ddc2', suelo2: '#c9be9a', junta: '#b4a684', brillo: '#f8f3e4', sombraS: '#a89a78',
  plata: '#d4d8e0', plataS: '#8a909c', rojoL: '#e86656', azulL: '#5a8ae0', vidrioB: '#4a2a14', vidrioBL: '#8a5a30',
  carton: '#c8a06a', cartonS: '#94703e', cartonL: '#e0bc86', cinta: '#d8c8a0',
  camara: '#3a3a42', camaraL: '#6a6a76', camaraS: '#222228', lente: '#1a2a3a', lenteL: '#6a9ac8', foco: '#fff6d0', focoS: '#f0dc90',
  mantel: '#f2eee2', mantelS: '#d8d0bc', mantelD: '#bcb29a', cuadro: '#9ac0e0', cuadroS: '#7aa0c4',
  // el despacho
  bronce: '#3e3630', bronceL: '#6a5e52', cieloA: '#5a96d8', cieloB: '#86b8e8', cieloC: '#bcd8ee', bruma: '#d8e4ea',
  nubeL: '#ffffff', nubeM: '#e2eaf2', nubeS: '#b4c4d8', torre0: '#a8b8cc', torre0S: '#94a4ba', torre1: '#7a8aa4', torre1S: '#5e6c86', torre2: '#4e5a70', torre2S: '#3a4456',
  ventL: '#f8e8a0', ventO: '#2a3446', arbol: '#4a7a3a', arbolS: '#2e5a28', arbolL: '#6a9a4a', yesoP: '#e8dcc2', yesoPS: '#d6c8aa',
  nogal: '#6a3e22', nogalS: '#4a2814', nogalL: '#8a5a32', nogalD: '#2e180c', moqueta: '#2e5a5a', moquetaS: '#224646', moquetaL: '#3e7070',
  cuero: '#6a2a22', cueroS: '#4a1a14', cueroL: '#8a3e30', pizarraB: '#f4f2ea', pizarraS: '#d8d4c8', alarma: '#ff3a2a',
  // el laboratorio
  azulejo: '#e8ece6', azulejoS: '#cdd2cc', azulejoL: '#f8faf6', encimera: '#2a2e34', encimeraL: '#4a525c', mueble: '#b8c0c4', muebleS: '#8e989e', muebleL: '#d4dadc',
  pizarra: '#2e4a3a', pizarraL: '#4a6a56', tiza: '#e8eee4', tizaS: '#a8b8aa', corcho: '#c89a5a', corchoS: '#a07840', jarabeA: '#7a3a14', jarabeB: '#b8641e', jarabeC: '#a02a1e',
  vidrio: '#cfe6ee', vidrioS: '#9ac0cc', suelo3: '#a8b0b4', suelo4: '#949ca2',
});

const b_CACHE = new WeakMap();

// un fondo fijo que se pinta una vez por lienzo en un búfer de R.nuevo() y se copia entero en cada fotograma
function b_fijo(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla dos colores (a = 0 el primero, 1 el segundo)
function b_mez(c1, c2, a) { let r = 0; for (let s = 0; s < 32; s += 8) r |= Math.round(((c1 >>> s) & 255) * (1 - a) + ((c2 >>> s) & 255) * a) << s; return r >>> 0; }

// cifras pequeñas de 3 × 5 para precios y ejes (solo números)
const b_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function b_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = b_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// una lata lisa de estantería (3 × 6): tapa de aluminio, cuerpo rojo o azul con su luz y su sombra; x la izquierda, yb la base
function b_lata(R, x, yb, azul) {
  const c = azul ? C.azulCola : C.rojoCola, l = azul ? b_P.azulL : b_P.rojoL, s = azul ? C.azulColaS : C.rojoColaS;
  R.rect(x, yb - 4, x, yb, l); R.rect(x + 1, yb - 4, x + 1, yb, c); R.rect(x + 2, yb - 4, x + 2, yb, s); R.rect(x, yb - 5, x + 1, yb - 5, b_P.plata); R.pset(x + 2, yb - 5, b_P.plataS);
}

// una lata grande de la pirámide (4 × 7), con el brillo vertical
function b_lataG(R, x, yb, azul) {
  const c = azul ? C.azulCola : C.rojoCola, l = azul ? b_P.azulL : b_P.rojoL, s = azul ? C.azulColaS : C.rojoColaS;
  R.rect(x, yb - 5, x + 3, yb, c); R.rect(x, yb - 5, x, yb, l); R.rect(x + 3, yb - 5, x + 3, yb, s); R.pset(x + 1, yb - 4, C.blanco);
  R.rect(x, yb - 6, x + 3, yb - 6, b_P.plata); R.pset(x + 3, yb - 6, b_P.plataS); R.rect(x, yb, x + 3, yb, s);
}

// gente pequeña de fondo (6–12 px): pelo, cara, cuerpo con su sombra y piernas que andan; x el centro, ys los pies
function b_figura(R, x, ys, t, o = {}) {
  const { rect, pset } = R, a = o.alto ?? 10, ropa = o.ropa ?? hex('#c86a3a'), ropaS = b_mez(ropa, C.k, 0.35), piel = o.piel ?? hex('#f0c8a0'), pelo = o.pelo ?? hex('#5a3a22');
  const cab = a >= 9 ? 3 : 2, pier = Math.max(2, Math.round(a * 0.3)), cuer = a - cab - pier, paso = o.anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, pc = o.pierna ?? hex('#3a3a5a');
  const yc = ys - pier - cuer + 1, yh = yc - cab;
  rect(x - 1 - paso, ys - pier + 1, x - 1 - paso, ys, pc); rect(x + 1 + paso, ys - pier + 1, x + 1 + paso, ys, pc);
  rect(x - 1, yc, x + 1, yc + cuer - 1, ropa); rect(x + 1, yc, x + 1, yc + cuer - 1, ropaS); if (a >= 10) { pset(x - 2, yc + 1, ropa); pset(x + 2, yc + 1, ropaS); }
  rect(x - 1, yh, x + 1, yh + cab - 1, piel); rect(x - 1, yh, x + 1, yh, pelo); pset(o.dir < 0 ? x + 1 : x - 1, yh + 1, pelo);
}

// un carrito de la compra de alambre (de lado): la cesta en rejilla cromada, el asa roja, las ruedas; esc 1 grande, 0.5 lejos
function b_carrito(R, x, ys, d, esc = 1, carga = true) {
  const { pset, linea, rect } = R, w = Math.round(24 * esc), hh = Math.round(13 * esc), X = (i) => (d > 0 ? x + i : x - i), y0 = ys - Math.round(5 * esc) - hh;
  if (carga && esc >= 0.7) { rect(Math.min(X(4), X(12)), y0 - 3, Math.max(X(4), X(12)), y0 + 4, b_P.carton); rect(Math.min(X(4), X(12)), y0 - 3, Math.max(X(4), X(12)), y0 - 3, b_P.cartonL); for (const i of [14, 17]) b_lata(R, Math.min(X(i), X(i + 2)), y0 + 3, i === 17); }
  for (let j = 0; j <= hh; j += Math.max(2, Math.round(3 * esc))) linea(X(0), y0 + j, X(w - Math.round(j * 0.25)), y0 + j, b_P.plataS);
  for (let i = 0; i <= w; i += Math.max(2, Math.round(3 * esc))) linea(X(i), y0, X(Math.min(i, w - Math.round(hh * 0.25))), y0 + hh, b_P.plataS);
  linea(X(0), y0, X(w), y0, b_P.plata); linea(X(0), y0, X(0), y0 + hh, b_P.plata); linea(X(w), y0, X(w - Math.round(hh * 0.25)), y0 + hh, b_P.plata);
  linea(X(0), y0 + hh, X(w), y0 + hh, b_P.plata); linea(X(1), y0 + hh + 1, X(w - 2), ys - 2, b_P.plataS); linea(X(0), y0, X(-Math.round(4 * esc)), y0 - Math.round(3 * esc), b_P.plata);
  rect(Math.min(X(-Math.round(5 * esc)), X(-Math.round(3 * esc))), y0 - Math.round(4 * esc), Math.max(X(-Math.round(5 * esc)), X(-Math.round(3 * esc))), y0 - Math.round(3 * esc), C.rojo);
  for (const i of [2, w - 3]) { const r = Math.max(1, Math.round(1.5 * esc)); R.disco(X(i), ys - r, r, C.k); pset(X(i), ys - r, b_P.plataS); }
}

// el supermercado de 1975 (encuadre 'super', cámara general). Suelo de los personajes: y 158 delante (x 0–320 libre salvo
// la cámara x 26–66 y el pie del foco x 252–276); detrás de la mesa, y 138 (x 150–222: asoman cabeza y hombros)
function b_super(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, azul = Math.max(0, Math.min(1, o.azul ?? 0.5)), VP = [103, 70], K = 0.35;
  const UNI = [[0, 72], [134, 319]], FILAS = [57, 71, 85, 99, 113];
  b_fijo(R, 'b_super', () => {
    // el techo de placas acústicas con sus agujeritos (de poco contraste: ahí va la barra del año)
    rect(0, 0, 319, 21, b_P.techo); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 21, b_P.techoS); for (const y of [7, 14, 21]) rect(0, y, 319, y, b_P.techoS);
    for (let k = 0; k < 260; k++) { const x = Math.floor(h(k, 1, 300) * 320), y = Math.floor(h(k, 2, 300) * 21); if (x % 20 && y % 7) pset(x, y, b_P.techoS); }
    for (let x = 0; x < 320; x++) if (x % 3 === 0) pset(x, 1, b_P.techoL);
    for (let k = 0; k < 5; k++) { const x = 10 + k * 62; rect(x - 1, 14, x + 49, 20, b_P.marco); rect(x, 15, x + 48, 19, b_P.tuboOff); rect(x - 1, 20, x + 49, 20, b_P.techoS); }
    // la pared del fondo con las franjas setenteras, que se acaban antes de la esquina de Atom
    rect(0, 22, 319, 46, b_P.pared); for (let k = 0; k < 160; k++) pset(Math.floor(h(k, 3, 300) * 320), 22 + Math.floor(h(k, 4, 300) * 24), b_P.paredS);
    for (const [y, c, cs] of [[25, b_P.naranja, b_P.naranjaS], [29, b_P.mostaza, b_P.mostazaS], [33, b_P.marron, C.k]]) { rect(0, y, 254 - (y - 25), y + 2, c); rect(0, y + 2, 254 - (y - 25), y + 2, cs); disco(254 - (y - 25), y + 1, 1.6, c); }
    for (let y = 22; y < 37; y++) for (let x = 0; x < 320; x++) if ((x * 7 + y * 3) % 31 === 0) pset(x, y, b_P.paredL);   // la luz de los plafones en la pared
    // ── el pasillo del centro en perspectiva (entre x 73 y 133) ──
    const P = (x, y) => [Math.round(VP[0] + (x - VP[0]) * K), Math.round(VP[1] + (y - VP[1]) * K)];
    const [fx0, fy0] = P(73, 40), [fx1, fy1] = P(133, 126);
    rect(73, 36, 133, 126, b_P.pared); rect(fx0, fy0 - 2, fx1, fy1, b_P.paredS);
    // al fondo, las puertas batientes del almacén con sus ojos de buey
    rect(fx0 + 3, fy1 - 18, fx1 - 3, fy1, C.k); for (const dx of [0, 8]) { rect(fx0 + 4 + dx, fy1 - 17, fx0 + 10 + dx, fy1, hex('#8a9aa0')); disco(fx0 + 7 + dx, fy1 - 12, 1.6, hex('#bcd8e8')); rect(fx0 + 4 + dx, fy1 - 3, fx0 + 10 + dx, fy1, hex('#6a7a80')); }
    // el suelo del pasillo, con sus losetas que se cierran hacia el fondo
    poligono([[73, 126], [fx0, fy1], [fx1, fy1], [133, 126]], (x, y) => { const u = (y - fy1) / (126 - fy1), fila = Math.floor(Math.pow(u, 0.6) * 8), col = Math.floor((x - VP[0]) / (2 + u * 16) + 20); return (fila + col) % 2 ? b_P.suelo : b_P.suelo2; });
    // las caras de las góndolas del pasillo, con sus baldas que convergen y sus latas
    for (const lado of [-1, 1]) {
      const xa = lado < 0 ? 73 : 133, xf = lado < 0 ? fx0 : fx1;
      poligono([[xa, 40], [xf, fy0], [xf, fy1], [xa, 126]], b_P.gondS);
      for (const yf of [...FILAS, 40]) { const [, yb] = P(xa, yf); linea(xa, yf, xf, yb, b_P.gondL); }
      for (let r = 0; r < FILAS.length; r++) {
        const y0 = r ? FILAS[r - 1] : 44, y1 = FILAS[r];
        for (let u = 0; u < 1; u += 0.045) {
          const x = Math.round(lerp(xa, xf, u)), s = lerp(1, K, u), ya = Math.round(VP[1] + (y0 + 2 - VP[1]) * s), yb = Math.round(VP[1] + (y1 - VP[1]) * s);
          const c = h(Math.floor(u * 22), r + lado * 9, 77) < 0.5 ? C.rojoCola : C.azulCola;
          for (let y = ya + 1; y < yb; y++) if ((y + Math.floor(u * 22)) % 3) pset(x, y, y === ya + 1 ? b_P.plata : c);
        }
      }
      linea(xa, 40, xa, 126, b_P.gondD);
    }
    // ── las dos góndolas de delante: cabecera, chapa perforada, baldas con su tira de precios, cajas de cartón abajo ──
    for (const [x0, x1] of UNI) {
      const xc = Math.min(x1, 268);
      rect(x0, 38, xc, 46, C.k); rect(x0 + 1, 39, xc - 1, 45, x0 ? b_P.mostaza : b_P.naranja); rect(x0 + 1, 39, xc - 1, 39, b_P.paredL); rect(x0 + 1, 45, xc - 1, 45, x0 ? b_P.mostazaS : b_P.naranjaS);
      if (x1 > 268) { rect(268, 44, x1, 46, b_P.gondS); }
      for (let px = x0 + 14; px < xc - 10; px += 40) { R.icono('lata', px, 40, C.blanco, x0 ? b_P.mostazaS : b_P.naranjaS); b_cifras(R, String(3 + (px >> 4) % 6), px + 10, 40, C.blanco); }
      rect(x0, 47, x1, 126, b_P.gond);
      for (let y = 49; y < 114; y += 3) for (let x = x0 + 2 + ((y / 3) & 1) * 2; x < x1 - 1; x += 4) pset(x, y, b_P.aguj);
      for (const yb of FILAS) { rect(x0, yb + 1, x1, yb + 1, b_P.gondL); rect(x0, yb + 2, x1, yb + 4, b_P.tira); rect(x0, yb + 5, x1, yb + 5, b_P.gondD); for (let x = x0 + 6; x < x1 - 4; x += 18) { rect(x, yb + 2, x + 3, yb + 4, b_P.etiq); pset(x + 1, yb + 3, C.rojo); pset(x + 2, yb + 3, C.rojo); } }
      for (let sx = x0; sx <= x1; sx += 64) { rect(sx, 47, sx + 1, 126, b_P.gondS); pset(sx, 47, b_P.gondL); }
      rect(x0, 114 + 5, x1, 126, b_P.gondD); rect(x0, 119, x1, 119, b_P.gondS);
      for (let x = x0 + 3; x < x1 - 14; x += 17) { const hh = 6 + Math.floor(h(x, 1, 88) * 3); rect(x, 125 - hh, x + 14, 125, b_P.carton); rect(x, 125 - hh, x + 14, 125 - hh, b_P.cartonL); rect(x + 13, 125 - hh, x + 14, 125, b_P.cartonS); rect(x + 6, 125 - hh, x + 7, 125 - hh + 3, b_P.cinta); rect(x + 2, 122 - Math.floor(hh / 2), x + 4, 123 - Math.floor(hh / 2), h(x, 2, 88) < 0.5 ? C.rojoCola : C.azulCola); }
      rect(x0, 126, x1, 126, C.k);
    }
    // ── el suelo de linóleo a cuadros en perspectiva, con el reflejo de los plafones y las marcas de ruedas ──
    for (let y = 127; y < 180; y++) {
      const f = (y - 127) / 52, e = 1 + 0.5 * f, fila = Math.floor(Math.pow(f, 0.75) * 6), lh = Math.floor(Math.pow((y - 126) / 52, 0.75) * 6) !== fila;
      let pc = Math.floor((160 + (0 - 160) / e) / 18);
      for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 18); pset(x, y, lh || col !== pc ? b_P.junta : (col + fila) % 2 ? b_P.suelo : b_P.suelo2); pc = col; }
    }
    for (let k = 0; k < 5; k++) { const xc = 35 + k * 62; for (let y = 129; y < 176; y++) { const e = 1 + 0.5 * (y - 127) / 52, xr = Math.round(160 + (xc - 160) * e), w = 7 - Math.floor((y - 129) / 7); for (let x = xr - w; x <= xr + w; x++) if ((x + y) % 2 === 0 && (y % 3 || Math.abs(x - xr) < 3)) pset(x, y, b_P.brillo); } }
    for (const [x0, x1] of [[0, 72], [134, 319]]) for (let y = 127; y < 131; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0 || y === 127) pset(x, y, b_P.sombraS);
    for (let k = 0; k < 7; k++) { const x = Math.floor(h(k, 5, 300) * 280) + 20, y = 140 + Math.floor(h(k, 6, 300) * 36); linea(x, y, x + 10 + (k % 3) * 4, y + (k % 2), b_P.junta); }
    // una lata tumbada que alguien se dejó en el suelo
    rect(110, 170, 116, 173, C.rojoCola); rect(110, 170, 116, 170, b_P.rojoL); rect(110, 173, 116, 173, C.rojoColaS); rect(117, 170, 117, 173, b_P.plata); rect(109, 174, 117, 174, b_P.sombraS);
    // el cable de la cámara por el suelo, con sus curvas
    for (let x = 0; x < 44; x++) { const y = Math.round(166 + Math.sin(x * 0.18) * 3); pset(x, y, C.k); pset(x, y - 1, b_P.camaraL); }
    // ── la cámara de tele de 1975 en su trípode ──
    for (const [dx, dy] of [[-12, 24], [0, 26], [12, 24]]) { linea(42, 143, 42 + dx, 143 + dy, C.k); linea(43, 143, 43 + dx, 143 + dy, b_P.camaraL); }
    rect(38, 140, 47, 143, b_P.camaraS); rect(28, 126, 54, 141, C.k); rect(29, 127, 53, 140, b_P.camara); rect(29, 127, 53, 127, b_P.camaraL); rect(29, 138, 53, 140, b_P.camaraS);
    for (let x = 31; x < 52; x += 3) rect(x, 130, x, 136, b_P.camaraS);   // las rejillas de ventilación
    rect(54, 129, 65, 139, C.k); rect(55, 130, 64, 138, b_P.camaraL); rect(57, 130, 64, 138, b_P.lente); disco(61, 134, 3, hex('#2a3e58')); pset(59, 132, b_P.lenteL); pset(60, 132, b_P.lenteL); rect(64, 129, 65, 139, b_P.camaraS);
    rect(30, 120, 40, 126, C.k); rect(31, 121, 39, 125, b_P.camaraS); rect(32, 122, 38, 124, hex('#4a6a5a'));   // el visor
    linea(28, 139, 16, 143, C.k); linea(28, 140, 16, 144, b_P.camaraL); rect(13, 142, 17, 145, C.k);   // la barra de mano
    // ── el foco en su pie, a la derecha ──
    rect(263, 84, 264, 158, C.k); pset(263, 90, b_P.camaraL); linea(263, 158, 252, 163, C.k); linea(264, 158, 276, 163, C.k); linea(263, 158, 263, 164, C.k);
    poligono([[254, 72], [272, 76], [270, 90], [252, 86]], C.k); poligono([[255, 74], [270, 77], [268, 88], [253, 85]], b_P.camara); linea(255, 74, 270, 77, b_P.camaraL);
    poligono([[250, 79], [254, 72], [252, 86]], b_P.camaraS); linea(251, 70, 255, 72, C.k); linea(249, 90, 252, 86, C.k);   // las viseras
  });

  // ── lo que se mueve ──
  // los tubos: el segundo parpadea de vez en cuando
  for (let k = 0; k < 5; k++) { const x = 10 + k * 62, off = k === 1 && (t % 6.1) < 0.8 && Math.sin(t * 37) > -0.2; rect(x + 1, 16, x + 47, 18, off ? b_P.tuboOff : b_P.tubo); if (!off) rect(x + 2, 17, x + 46, 17, b_P.tuboS); }
  // las latas de las góndolas de delante: cada frente de cuatro es rojo o azul según o.azul
  for (const [x0, x1] of UNI) for (let sx = x0; sx < x1 - 8; sx += 64) for (let f = 0; f < 3; f++) {
    const fx = sx + 4 + f * 19; if (fx + 16 > x1 - 1) continue;
    for (let r = 0; r < FILAS.length; r++) {
      const yb = FILAS[r], az = h(fx, r, 71) < azul;
      if (r === 1) { for (let i = 0; i < 5; i++) { const bx = fx + i * 3 + 1; rect(bx, yb - 7, bx + 1, yb, b_P.vidrioB); pset(bx, yb - 6, b_P.vidrioBL); pset(bx, yb - 5, b_P.vidrioBL); rect(bx, yb - 10, bx, yb - 8, b_P.vidrioB); pset(bx, yb - 11, az ? C.azulCola : C.rojoCola); rect(bx, yb - 4, bx + 1, yb - 3, az ? C.azulCola : C.rojoCola); } }
      else if (r === 3) { for (let i = 0; i < 2; i++) { const bx = fx + i * 8; rect(bx, yb - 5, bx + 6, yb, az ? C.azulCola : C.rojoCola); rect(bx, yb - 5, bx + 6, yb - 5, az ? b_P.azulL : b_P.rojoL); rect(bx + 6, yb - 4, bx + 6, yb, az ? C.azulColaS : C.rojoColaS); for (let j = 0; j < 3; j++) rect(bx + j * 2 + 1, yb - 7, bx + j * 2 + 1, yb - 6, b_P.plata); R.pset(bx + 3, yb - 2, b_P.etiq); } }
      else for (let i = 0; i < 4; i++) for (let cap = 0; cap < 2; cap++) b_lata(R, fx + i * 4, yb - cap * 6, az);
    }
  }
  // el cartel colgante del pasillo, que se mece
  { const sw = Math.round(Math.sin(t * 1.1) * 1.2); linea(94, 21, 94 + sw, 24, C.k); linea(112, 21, 112 + sw, 24, C.k); rect(90 + sw, 24, 116 + sw, 35, C.k); rect(91 + sw, 25, 115 + sw, 34, b_P.naranja); rect(91 + sw, 25, 115 + sw, 25, b_P.paredL); rect(91 + sw, 34, 115 + sw, 34, b_P.naranjaS);
    R.icono('lata', 94 + sw, 26, C.blanco, b_P.naranjaS); b_cifras(R, '5', 106 + sw, 27, C.blanco); }
  // en el pasillo: un cliente con su carrito que va hasta el fondo y vuelve, y otra que cruza por el fondo
  { const u = 0.5 - 0.5 * Math.cos(t * 0.35), y = Math.round(lerp(122, 92, u)), x = Math.round(lerp(96, 104, u)), s = lerp(1, 0.45, u), d = Math.sin(t * 0.35) > 0 ? 1 : -1;
    const cy = Math.round(lerp(96, 102, 1 - u)); // el cliente
    b_carrito(R, x + Math.round((d > 0 ? 4 : -4) * s), y, d, s * 0.6, false); b_figura(R, x - Math.round((d > 0 ? 6 : -6) * s) , y, t, { alto: Math.round(lerp(12, 6, u)), ropa: hex('#4a8a5a'), anda: true, dir: d }); void cy; }
  { const u = ((t * 0.09) % 1.6); if (u < 1) { const [fx0, fy1] = [Math.round(VP[0] + (73 - VP[0]) * K), Math.round(VP[1] + (126 - VP[1]) * K)]; b_figura(R, Math.round(lerp(fx0 + 2, fx0 + 20, u)), fy1, t, { alto: 6, ropa: hex('#c8483a'), anda: true }); } }
  // la pirámide de latas de oferta, con su cartel en un palito, y el carrito aparcado delante
  { rect(276, 136, 319, 144, C.k); rect(277, 137, 319, 143, b_P.naranja); rect(277, 137, 319, 137, b_P.paredL); for (let x = 280; x < 319; x += 6) rect(x, 139, x + 2, 141, b_P.naranjaS);
    for (let r = 0; r < 6; r++) for (let i = 0; i < 9 - r; i++) { const x = 280 + r * 2 + i * 5; if (x + 3 > 319) continue; b_lataG(R, x, 135 - r * 7, h(i, r, 72) < azul); }
    rect(296, 84, 296, 92, C.k); rect(288, 84, 312, 96, C.k); rect(289, 85, 311, 95, b_P.etiq); rect(289, 85, 311, 85, C.blanco); b_cifras(R, '99', 296, 88, C.rojo); for (const [dx, dy] of [[-1, -1], [25, -1], [-1, 13], [25, 13]]) pset(288 + dx, 84 + dy, b_P.etiq);
    b_carrito(R, 292, 170, -1, 1); }
  // el piloto rojo de la cámara (graba), y el foco: su cara encendida y el cono de luz sobre la mesa
  if (o.graba !== false && Math.floor(t * 1.6) % 2 === 0) { rect(50, 123, 52, 125, C.rojo); pset(50, 123, hex('#ff9a8a')); } else rect(50, 123, 52, 125, b_P.camaraS);
  poligono([[255, 77], [252, 85], [257, 86]], b_P.foco); pset(254, 79, C.blanco);
  for (let y = 84; y < 156; y++) { const u = (y - 84) / 72, xa = Math.round(lerp(250, 150, u)), xb = Math.round(lerp(256, 236, u)); for (let x = xa; x <= xb; x++) if ((x + y + Math.floor(t * 2)) % 4 === 0 && R.pget(x, y) !== C.k) pset(x, y, b_mez(R.pget(x, y), b_P.foco, 0.45)); }
  return { suelo: 158, detras: 138, mesa: [140, 126, 228, 152], camara: [28, 120, 66, 168], foco: [252, 72, 276, 164], pasillo: [73, 36, 133, 126], piramide: [276, 100, 319, 144] };
}

// la mesa de la cata del súper, por delante de los actores: mantel blanco con pliegues y bajo rojo y azul, el
// pictograma de los dos vasos en el faldón, los dos vasos sin letra con su punto rojo y azul (o.vasos, o.llenoA, o.llenoB, o.trile, o.puntos, o.letras) y la tablilla del
// recuento a palotes (el azul gana) en la esquina de la mesa
function b_superDelante(R, t, o) {
  const { rect, pset, linea } = R;
  for (let x = 140; x <= 228; x++) for (let y = 153; y < 157; y++) if ((x + y) % 2 === 0 || y === 153) pset(x, y, b_P.sombraS);
  rect(139, 125, 229, 152, C.k); rect(140, 126, 228, 129, b_P.mantel); rect(140, 126, 228, 126, C.blanco); rect(140, 129, 228, 129, b_P.mantelS);
  rect(140, 130, 228, 151, b_P.mantel);
  for (let x = 143; x < 227; x += 7) { rect(x, 131, x, 146, b_P.mantelS); pset(x + 1, 132, C.blanco); rect(x - 1, 146, x + 1, 146, b_P.mantelD); }
  rect(140, 147, 184, 151, C.azulCola); rect(185, 147, 228, 151, C.rojoCola); rect(140, 147, 228, 147, b_P.mantelD);
  for (let x = 141; x < 228; x += 4) pset(x, 149, x < 185 ? b_P.azulL : b_P.rojoL);
  R.disco(184, 138, 6, b_P.mantelD); R.disco(184, 138, 5, C.blanco); R.icono('vaso', 181, 135, b_P.cuadroS, C.blanco);
  // la tablilla del recuento: dos columnas de palotes, la azul más larga
  rect(213, 109, 227, 125, C.k); rect(214, 110, 226, 124, b_P.pizarraB); rect(214, 110, 226, 111, b_P.pizarraS); rect(219, 106, 221, 109, b_P.plataS);
  for (let k = 0; k < 4; k++) rect(215 + k, 115, 215 + k, 119, C.rojoCola); linea(214, 118, 219, 116, C.rojoCola);
  for (let k = 0; k < 3; k++) rect(221 + k + (k > 1 ? 1 : 0), 113, 221 + k + (k > 1 ? 1 : 0), 122, C.azulCola);
  const vasos = b_vasos(R, t, o, 168, 200, 127, 1);
  return { suelo: 158, detras: 138, vasos, mesa: [140, 126, 228, 152], tablilla: [213, 106, 227, 125] };
}
// los dos vasos de la cata (PIEZAS_NC.vaso, sin letra) en x a, b sobre y; para distinguirlos, un punto rojo (el primero)
// y uno azul (el segundo) pegados abajo, en la base del vaso (o.puntos false los quita); o.letras true vuelve a poner la
// pegatina con la «A» y la «B» (no se usa: son letras en pantalla); o.trile (0–1) los cambia de sitio en arco; s la
// escala. Devuelve [[xA, y], [xB, y]] donde están ahora
function b_vasos(R, t, o, a, b, y, s) {
  if (o.vasos === false) return [[a, y], [b, y]];
  const u = Math.max(0, Math.min(1, o.trile ?? 0)), e = u * u * (3 - 2 * u), alto = Math.round(Math.sin(e * Math.PI) * 8 * s);
  const xa = Math.round(lerp(a, b, e)), xb = Math.round(lerp(b, a, e));
  const V = PIEZAS_NC.vaso; if (!V) return [[xa, y], [xb, y]];
  const ya = y - alto, yb = y + Math.round(alto * 0.4) - (u > 0 && u < 1 ? 2 * s : 0), conLetra = o.letras === true;
  V(R, xa, ya, { letra: conLetra ? 'A' : undefined, lleno: o.llenoA ?? 0.8, s }); V(R, xb, yb, { letra: conLetra ? 'B' : undefined, lleno: o.llenoB ?? 0.8, s });
  if (!conLetra && o.puntos !== false) b_puntoVaso(R, xa, ya, s, C.rojoCola, b_P.rojoL), b_puntoVaso(R, xb, yb, s, C.azulCola, b_P.azulL);
  if (s >= 2) for (const [vx, la] of [[xa, o.llenoA ?? 0.8], [xb, o.llenoB ?? 0.8]]) for (let k = 0; k < 5; k++) {   // las burbujas que suben
    const fondo = y - 3 * s, sube = Math.round(((t * 9 + k * 7.3) % (la * 11 * s))); R.pset(vx - 3 * s + Math.round(h(k, vx, 5) * 6 * s), fondo - sube, b_P.espumaB ?? C.espuma);
  }
  return [[xa, y], [xb, y]];
}
// la mesa de la cata de cerca (encuadre 'super', cámara 'mesa'): inserto sin personajes de cuerpo entero; los dos vasos (punto rojo y azul)
// a escala 3 sobre y 152 (A en x 130, B en x 196), las manos de la escena encima
function b_mesaCata(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, D = (c) => b_mez(c, hex('#b8ae98'), 0.4);
  b_fijo(R, 'b_mesa', () => {
    // detrás, las estanterías a doble tamaño y desenfocadas (apagadas), con la columna de yeso y su cartel a la derecha
    rect(0, 0, 319, 104, D(b_P.gond)); for (let y = 2; y < 100; y += 5) for (let x = 2 + ((y / 5) & 1) * 4; x < 268; x += 8) pset(x, y, D(b_P.aguj));
    for (const yb of [24, 50, 76, 102]) {
      for (let x = 2; x < 266; x += 9) { const az = h(x, yb, 61) < 0.5, c = D(az ? C.azulCola : C.rojoCola), l = D(az ? b_P.azulL : b_P.rojoL), s = D(az ? C.azulColaS : C.rojoColaS);
        rect(x, yb - 17, x + 6, yb - 2, c); rect(x, yb - 17, x + 1, yb - 2, l); rect(x + 5, yb - 17, x + 6, yb - 2, s); rect(x, yb - 19, x + 6, yb - 18, D(b_P.plata)); }
      rect(0, yb - 1, 267, yb, D(b_P.gondL)); rect(0, yb + 1, 267, yb + 3, D(b_P.tira)); for (let x = 10; x < 260; x += 27) rect(x, yb + 1, x + 6, yb + 3, D(b_P.etiq));
    }
    for (const sx of [0, 128]) rect(sx + 126, 0, sx + 129, 104, D(b_P.gondS));
    // la barra del año (y 0–14) más apagada aún
    for (let y = 0; y < 16; y++) for (let x = 0; x < 268; x++) if ((x + y) % 2 === 0) pset(x, y, D(b_P.gond));
    rect(268, 0, 319, 104, b_P.paredL); for (let k = 0; k < 90; k++) pset(268 + Math.floor(h(k, 1, 62) * 52), Math.floor(h(k, 2, 62) * 104), b_P.pared); rect(268, 0, 269, 104, b_P.paredS);
    rect(274, 54, 314, 96, C.k); rect(275, 55, 313, 95, b_P.etiq); rect(275, 55, 313, 57, b_P.naranja); rect(275, 93, 313, 95, b_P.mostazaS);
    R.icono('lata', 279, 62, C.rojoCola, b_P.mostazaS, 2); R.numero('59', 302, 88, { color: C.rojo, centro: true, sombra: false });
    // la mesa: el mantel de cuadros celestes en perspectiva, del fondo (y 104) al borde de delante
    poligono([[18, 104], [302, 104], [319, 120], [319, 179], [0, 179], [0, 120]], (x, y) => {
      const u = (y - 104) / 75, e = 1 + u * 1.6, cx = Math.floor((x - 160) / (9 * e) + 100), cy = Math.floor(Math.pow(u, 0.8) * 9);
      const a = cx % 2, b = cy % 2; return a && b ? b_P.cuadroS : a || b ? b_P.cuadro : b_P.mantel;
    });
    rect(18, 103, 302, 104, b_P.mantelD); linea(18, 104, 0, 120, b_P.mantelD); linea(302, 104, 319, 120, b_P.mantelD);
    for (let x = 0; x < 320; x++) for (let y = 105; y < 112; y++) if ((x + y) % 2 === 0 && y - 105 < 7 - (x % 7 === 0 ? 3 : 0)) pset(x, y, b_mez(R.pget(x, y), b_P.mantelD, 0.35));   // la sombra del borde de las estanterías
    // la torre de vasos boca abajo, las servilletas y la tablilla del recuento
    for (let k = 0; k < 6; k++) { const y = 142 - k * 4; rect(30, y - 4, 50, y, C.k); rect(31, y - 3, 49, y - 1, b_P.vidrio); rect(31, y - 3, 33, y - 1, C.blanco); rect(48, y - 3, 49, y - 1, b_P.vidrioS); }
    rect(28, 142, 52, 145, b_P.mantelD);
    for (let k = 0; k < 4; k++) { rect(60 + k, 150 - k * 2, 86 + k, 158 - k * 2, C.k); rect(61 + k, 151 - k * 2, 85 + k, 157 - k * 2, C.blanco); rect(61 + k, 157 - k * 2, 85 + k, 157 - k * 2, b_P.mantelS); }
    poligono([[234, 128], [282, 126], [292, 168], [236, 172]], C.k); poligono([[236, 130], [280, 128], [289, 166], [238, 170]], b_P.pizarraB); rect(252, 124, 264, 131, b_P.plataS); rect(254, 125, 262, 128, b_P.plata);
    for (let k = 0; k < 4; k++) linea(244 + k * 4, 140, 245 + k * 4, 152, C.rojoCola); linea(242, 149, 260, 143, C.rojoCola);
    for (let k = 0; k < 7; k++) linea(266 + k * 3 - (k > 4 ? 0 : 0), 136 + k, 267 + k * 3, 162 - k, C.azulCola);
    // el cubo del hielo con dos latas lisas que sudan
    rect(196, 112, 230, 140, C.k); rect(197, 113, 229, 139, b_P.plataS); rect(197, 113, 229, 115, b_P.plata); for (let x = 200; x < 228; x += 4) rect(x, 117, x, 137, b_P.plata);
    for (const [x, az] of [[202, false], [214, true]]) { const c = az ? C.azulCola : C.rojoCola; rect(x, 100, x + 10, 116, C.k); rect(x + 1, 101, x + 9, 116, c); rect(x + 1, 101, x + 2, 116, az ? b_P.azulL : b_P.rojoL); rect(x + 8, 101, x + 9, 116, az ? C.azulColaS : C.rojoColaS); rect(x + 1, 99, x + 9, 100, b_P.plata); }
    for (let k = 0; k < 9; k++) { const x = 198 + Math.floor(h(k, 1, 63) * 28), y = 112 + Math.floor(h(k, 2, 63) * 3); rect(x, y, x + 2, y + 1, hex('#e8f4f8')); }
  });
  // el resplandor del foco por arriba a la izquierda, que respira, y un cliente que pasa por detrás (apagado)
  { const u = ((t * 0.07) % 1.4); if (u < 1) { const x = Math.round(lerp(-10, 280, u)); for (let k = 0; k < 2; k++) b_figura(R, x + k, 102, t, { alto: 12, ropa: b_mez(hex('#8a5ad8'), hex('#b8ae98'), 0.5), piel: b_mez(hex('#f0c8a0'), hex('#b8ae98'), 0.4), anda: true }); } }
  for (let y = 0; y < 100; y++) for (let x = 0; x < 120 - y; x++) if ((x * 3 + y * 5 + Math.floor(t * 3)) % 9 === 0 && y > 16) pset(x, y, b_mez(R.pget(x, y), b_P.foco, 0.4 + 0.1 * Math.sin(t * 2)));
  // las gotas que resbalan por las latas del cubo y el brillo de los cubitos
  for (const x of [205, 218]) { const g = (t * 6 + x) % 16; pset(x + 3, 101 + Math.floor(g), b_P.espumaB ?? hex('#f0f8fc')); }
  if (Math.floor(t * 3) % 5 === 0) pset(210, 113, C.blanco);
  const vasos = b_vasos(R, t, o, 130, 196, 152, 3);
  return { suelo: 179, mesa: [0, 104, 319, 179], vasos, tablilla: [234, 124, 292, 172], cubo: [196, 99, 230, 140] };
}
// el despacho de la sede en Atlanta (encuadre 'sede', cámara general). Suelo: y 166 delante (x 10–60 y 248–318 libres);
// detrás de la mesa de juntas, y 136 (x 76–236)
const b_SENT = 0xff010203 >>> 0;

function b_sede(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R, W0 = 6, W1 = 166, V0 = 16, V1 = 120;
  b_fijo(R, 'b_sede', () => {
    // el techo y la pared de yeso (lisa y tranquila arriba a la derecha) con su moldura
    rect(0, 0, 319, 10, b_P.yesoP); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 9, b_P.yesoPS); rect(0, 10, 319, 11, b_P.yesoPS);
    for (const x of [40, 130, 220]) { rect(x, 7, x + 16, 9, b_P.marco); rect(x + 1, 8, x + 15, 8, b_P.tubo); }
    rect(166, 12, 319, 96, b_P.yesoP); for (let k = 0; k < 220; k++) { const x = 168 + Math.floor(h(k, 1, 40) * 150), y = 12 + Math.floor(h(k, 2, 40) * 84); if (!(x > 274 && y < 48)) pset(x, y, b_P.yesoPS); }
    for (let y = 12; y < 96; y++) for (let x = 168; x < 230; x++) if ((x + y) % 3 === 0 && x - 168 < (96 - y) * 0.5) pset(x, y, b_P.paredL);   // la luz del ventanal en la pared
    rect(166, 12, 319, 13, b_P.yesoPS);
    // el zócalo de nogal con cuarterones y vetas
    rect(166, 96, 319, 133, b_P.nogal); rect(166, 96, 319, 97, b_P.nogalL); rect(166, 98, 319, 98, b_P.nogalD);
    for (let x = 170; x < 316; x += 30) { rect(x, 102, x + 25, 128, b_P.nogalS); rect(x + 1, 103, x + 24, 127, b_P.nogal); rect(x + 1, 103, x + 24, 103, b_P.nogalL); for (let k = 0; k < 6; k++) { const vy = 105 + Math.floor(h(x, k, 41) * 20); linea(x + 2, vy, x + 23, vy + (k % 2), b_P.nogalS); } }
    rect(166, 130, 319, 133, b_P.nogalD);
    // el ventanal: el hueco (centinela: ahí se pinta el cielo cada fotograma), la ciudad de los ochenta, el marco de bronce
    rect(W0, V0, W1, V1, b_SENT);
    const bruma = (y) => y > 88;
    // los rascacielos de lejos (azulados), los medios con sus rejillas, la torre redonda y la de la cúpula
    for (let k = 0; k < 16; k++) { const x = W0 + Math.floor(h(k, 1, 42) * 160), w = 6 + Math.floor(h(k, 2, 42) * 8), top = 66 + Math.floor(h(k, 3, 42) * 20); rect(x, top, x + w, 104, b_P.torre0); rect(x + w - 1, top, x + w, 104, b_P.torre0S); }
    const MED = [[14, 12, 50], [34, 9, 60], [60, 14, 38], [96, 10, 54], [118, 16, 44], [146, 12, 58]];
    for (const [x, w, top] of MED) { rect(x, top, x + w, 108, b_P.torre1); rect(x + w - 2, top, x + w, 108, b_P.torre1S); rect(x, top, x + w, top, b_P.torre0); for (let y = top + 3; y < 106; y += 3) for (let xx = x + 1; xx < x + w - 2; xx += 2) pset(xx, y, b_P.torre1S); }
    // la torre redonda de cristal y la de la cúpula con antena
    rect(78, 26, 92, 108, b_P.torre2); for (let y = 28; y < 108; y += 2) rect(79, y, 91, y, b_P.torre2S); rect(79, 26, 81, 108, b_P.torre1); rect(77, 24, 93, 26, b_P.torre2S); rect(84, 18, 85, 24, b_P.torre2S);
    rect(132, 46, 144, 108, b_P.torre2); poligono([[130, 47], [138, 36], [146, 47]], b_P.torre1); rect(138, 28, 138, 36, b_P.torre2S); for (let y = 50; y < 108; y += 4) for (let x = 134; x < 143; x += 3) pset(x, y, b_P.torre2S);
    // los árboles de Atlanta por delante, y la autopista
    for (let k = 0; k < 60; k++) { const x = W0 + Math.floor(h(k, 4, 42) * 162), y = 104 + Math.floor(h(k, 5, 42) * 8), r = 3 + Math.floor(h(k, 6, 42) * 3); disco(x, y, r, b_P.arbolS); disco(x - 1, y - 1, r - 1, b_P.arbol); pset(x - 2, y - r + 1, b_P.arbolL); }
    rect(W0, 113, W1, 117, b_P.torre1S); rect(W0, 113, W1, 113, b_P.torre0); for (let x = W0; x < W1; x += 8) pset(x, 115, b_P.etiq);
    rect(W0, 118, W1, V1, b_P.arbolS);
    // la persiana veneciana a medio bajar
    for (let y = V0; y < 30; y += 2) { rect(W0, y, W1, y, b_P.pizarraB); rect(W0, y + 1, W1, y + 1, b_P.pizarraS); }
    rect(W0, 30, W1, 31, b_P.bronceL); for (const x of [30, 140]) linea(x, V0, x, 30, b_P.pizarraS);
    // el marco de bronce y los montantes
    rect(W0 - 3, V0 - 3, W1 + 3, V0 - 1, b_P.bronce); rect(W0 - 3, V1 + 1, W1 + 3, V1 + 4, b_P.bronce); rect(W0 - 3, V0, W0 - 1, V1, b_P.bronce); rect(W1 + 1, V0, W1 + 3, V1, b_P.bronce);
    rect(W0 - 4, V1 + 4, W1 + 4, V1 + 7, b_P.bronceL); rect(W0 - 4, V1 + 8, W1 + 4, V1 + 8, C.k);
    rect(0, 12, 2, 132, b_P.yesoPS);
    // la moqueta con su dibujo de rombos y la luz del ventanal en el suelo
    for (let y = 133; y < 180; y++) { const e = 1 + (y - 133) / 47 * 0.6; for (let x = 0; x < 320; x++) { const u = Math.floor((x - 160) / (8 * e) + 50), v = Math.floor((y - 133) / (3 + (y - 133) * 0.12)); pset(x, y, (u + v) % 4 === 0 && (x + y) % 2 ? b_P.moquetaS : b_P.moqueta); } }
    for (let y = 133; y < 175; y++) { const xa = Math.round(10 + (y - 133) * 1.2), xb = Math.round(150 + (y - 133) * 1.7); for (let x = xa; x <= xb; x++) if ((x + y) % 2 === 0) pset(x, y, b_P.moquetaL); }
    rect(0, 133, 319, 133, b_P.nogalD);
    // el aparador de la derecha con el teléfono (que se pinta luego) y una lámpara
    rect(274, 110, 318, 140, C.k); rect(275, 111, 317, 139, b_P.nogal); rect(275, 111, 317, 112, b_P.nogalL); rect(296, 113, 296, 138, b_P.nogalS); for (const x of [284, 306]) rect(x, 124, x + 3, 125, C.laton);
    rect(306, 92, 314, 98, C.k); rect(307, 93, 313, 97, b_P.focoS); rect(309, 98, 311, 110, C.laton); rect(306, 109, 314, 110, C.latonS);
    // los sillones de cuero detrás de la mesa
    for (const x of [86, 122, 158, 194, 226]) { rect(x - 7, 112, x + 7, 136, C.k); rect(x - 6, 113, x + 6, 135, b_P.cuero); rect(x - 6, 113, x + 6, 114, b_P.cueroL); rect(x + 4, 115, x + 6, 135, b_P.cueroS); for (const [bx, by] of [[-3, 118], [0, 118], [3, 118], [-3, 124], [0, 124], [3, 124]]) pset(x + bx, by, b_P.cueroS); }
    // la gráfica en su marco: el papel con su cuadrícula, los ejes y las cifras (sin palabras)
    rect(176, 46, 272, 108, C.k); rect(177, 47, 271, 107, b_P.nogalD); rect(179, 49, 269, 105, b_P.pizarraB); rect(179, 49, 269, 50, C.blanco);
    for (let x = 194; x < 266; x += 9) for (let y = 53; y < 96; y += 2) pset(x, y, b_P.pizarraS);
    for (let y = 56; y < 96; y += 10) for (let x = 194; x < 266; x += 2) pset(x, y, b_P.pizarraS);
    rect(193, 52, 193, 96, C.k); rect(193, 96, 266, 96, C.k);
    b_cifras(R, '60', 183, 54, b_P.torre2); b_cifras(R, '40', 183, 74, b_P.torre2); b_cifras(R, '20', 183, 92, b_P.torre2);
    b_cifras(R, '75', 192, 99, b_P.torre2); b_cifras(R, '80', 225, 99, b_P.torre2); b_cifras(R, '85', 258, 99, b_P.torre2);
    rect(222, 42, 226, 47, C.laton); disco(224, 44, 1, C.latonS);   // el clavo dorado
    // el piloto de la alarma en la pared, apagado
    rect(282, 56, 292, 58, C.k); rect(283, 57, 291, 57, b_P.plataS); disco(287, 52, 4, C.k); disco(287, 52, 3, hex('#7a2a24'));
  });
  // ── el cielo del ventanal, solo donde queda centinela: nubes a tres velocidades, después el degradado tramado ──
  const cielo = (x, y, c) => { if (x >= W0 && x <= W1 && y >= V0 && y <= V1 && R.pget(x, y) === b_SENT) pset(x, y, c); };
  const NUB = [[0.6, 38, 20, 0], [1.4, 50, 26, 3], [2.6, 62, 16, 7]];
  for (const [vel, yc, w, s] of NUB) for (let k = 0; k < 3; k++) {
    const cx = Math.round(((h(k, s, 43) * 220 + t * vel) % 220) - 30 + W0), cy = yc + Math.floor(h(k, s + 1, 43) * 6);
    for (const [dx, dy, r] of [[0, 0, w * 0.3], [w * 0.28, 2, w * 0.24], [-w * 0.3, 2, w * 0.22], [w * 0.1, -3, w * 0.22]]) {
      const ccx = cx + dx, ccy = cy + dy;
      for (let y = Math.floor(ccy - r); y <= ccy + r; y++) for (let x = Math.floor(ccx - r); x <= ccx + r; x++) { const d = Math.hypot(x - ccx, (y - ccy) * 1.5); if (d > r) continue; cielo(x, y, y > ccy + r * 0.25 ? b_P.nubeS : y < ccy - r * 0.35 ? b_P.nubeL : b_P.nubeM); }
    }
  }
  for (let k = 0; k < 4; k++) { const x = Math.round(((h(k, 9, 44) * 200 + t * (8 + k * 2)) % 190) - 10 + W0), y = 34 + Math.floor(h(k, 8, 44) * 22) + Math.round(Math.sin(t * 2 + k) * 2), a = Math.floor(t * 4 + k) % 2;
    cielo(x - 1, y - a, b_P.torre2); cielo(x, y, b_P.torre2); cielo(x + 1, y - a, b_P.torre2); }
  for (let y = V0; y <= V1; y++) { const u = (y - V0) / (V1 - V0), c0 = u < 0.45 ? b_P.cieloA : u < 0.75 ? b_P.cieloB : b_P.cieloC, c1 = u < 0.45 ? b_P.cieloB : u < 0.75 ? b_P.cieloC : b_P.bruma, f = u < 0.45 ? u / 0.45 : u < 0.75 ? (u - 0.45) / 0.3 : (u - 0.75) / 0.25;
    for (let x = W0; x <= W1; x++) if (R.pget(x, y) === b_SENT) pset(x, y, ((x + y) % 4 === 0 ? f > 0.25 : (x + y) % 2 === 0 ? f > 0.5 : (x + 2 * y) % 4 === 1 ? f > 0.75 : f > 0.98) ? c1 : c0); }
  // las ventanas de los rascacielos que se encienden y apagan, y los coches de la autopista (dentro del hueco)
  for (let k = 0; k < 18; k++) { const [x, w, top] = [[14, 12, 50], [34, 9, 60], [60, 14, 38], [96, 10, 54], [118, 16, 44], [146, 12, 58]][k % 6], xx = x + 1 + 2 * Math.floor(h(k, 1, 45) * (w / 2 - 1)), yy = top + 3 + 3 * Math.floor(h(k, 2, 45) * ((106 - top) / 3 - 2));
    if (Math.sin(t * 0.7 + k * 2.3) > 0.2) pset(xx, yy, b_P.ventL); }
  for (let k = 0; k < 4; k++) { const d = k % 2 ? 1 : -1, x = Math.round(W0 + ((h(k, 3, 46) * 200 + t * (14 + k * 3) * d) % 170 + 170) % 170); if (x < W0 || x > W1 - 3) continue;
    const y = k % 2 ? 114 : 116, c = [C.rojo, b_P.plata, b_P.etiq, hex('#3a6ac8')][k]; rect(x, y - 1, Math.min(W1, x + 3), y, c); }
  for (const x of [46, 86, 126]) { rect(x, V0, x + 1, V1, b_P.bronce); pset(x, V0, b_P.bronceL); }
  rect(W0, 64, W1, 65, b_P.bronce);
  // la gráfica: la línea roja que baja y la azul que sube, hasta donde diga o.grafica; las puntas laten
  const g = Math.max(0, Math.min(1, o.grafica ?? 1)), ROJA = [62, 63, 66, 67, 70, 72, 74, 77, 79], AZUL = [88, 87, 85, 84, 82, 81, 80, 78, 77];
  const lin = (Y, c, cl) => { let px = 194, py = Y[0]; const n = (Y.length - 1) * g; for (let i = 1; i <= Math.ceil(n); i++) { const f = Math.min(1, n - (i - 1)), x = Math.round(lerp(194 + (i - 1) * 9, 194 + i * 9, f)), y = Math.round(lerp(Y[i - 1], Y[i], f)); linea(px, py, x, y, c); linea(px, py + 1, x, y + 1, c); linea(px, py - 1, x, y - 1, cl); px = x; py = y; }
    if (g > 0) { const r = Math.sin(t * 5) > 0 ? 2 : 1.4; disco(px, py, r, c); } return [px, py]; };
  const pR = lin(ROJA, C.rojoCola, b_P.rojoL), pA = lin(AZUL, C.azulCola, b_P.azulL);
  // el ficus junto al ventanal, que se mece con el aire
  { const m = Math.sin(t * 0.9); rect(168, 120, 180, 133, C.k); rect(169, 121, 179, 132, b_P.naranjaS); rect(169, 121, 179, 122, b_P.naranja); linea(174, 120, 174, 84, b_P.nogalS);
    for (let k = 0; k < 16; k++) { const a = h(k, 1, 47) * 6.28, r = 3 + h(k, 2, 47) * 10, x = Math.round(174 + Math.cos(a) * r * 0.7 + m * (r / 8)), y = Math.round(92 + Math.sin(a) * r); disco(x, y, 2.2, b_P.arbolS); pset(x - 1, y - 1, b_P.arbol); pset(x, y - 2, b_P.arbolL); } }
  // la alarma: el piloto gira, la sala late en rojo y el teléfono del aparador tiembla
  const al = o.alarma === true ? 1 : Math.max(0, Math.min(1, +o.alarma || 0)), on = al > 0 && Math.sin(t * 9) > -0.2;
  if (al > 0) { const a = t * 7; disco(287, 52, 3, on ? b_P.alarma : C.rojoS); pset(287 + Math.round(Math.cos(a) * 2), 52 + Math.round(Math.sin(a) * 2), C.blanco);
    for (let k = 0; k < 2; k++) { const aa = a + k * Math.PI; for (let r = 5; r < 18; r++) { const x = Math.round(287 + Math.cos(aa) * r), y = Math.round(52 + Math.sin(aa) * r * 0.6); if (y > 46 && (r % 2)) pset(x, y, b_P.alarma); } }
    if (on) for (let y = 12; y < 180; y++) for (let x = (y % 2) * 2; x < 320; x += 4) if (y % 2 === 0 || x % 8 === 0) pset(x, y, b_mez(R.pget(x, y), b_P.alarma, 0.38 * al)); }
  { const tr = al > 0 && Math.floor(t * 12) % 2 ? 1 : 0; rect(280 + tr, 104, 294 + tr, 110, C.k); rect(281 + tr, 105, 293 + tr, 109, hex('#3a3a3e')); rect(279 + tr, 102, 295 + tr, 104, C.k); rect(280 + tr, 102, 294 + tr, 103, hex('#5a5a62'));
    for (let k = 0; k < 3; k++) pset(284 + tr + k * 3, 107, b_P.plata); if (al > 0 && tr) { pset(278, 100, b_P.alarma); pset(297, 100, b_P.alarma); pset(277, 98, b_P.alarma); pset(298, 98, b_P.alarma); } }
  return { suelo: 166, detras: 136, ventana: [W0, V0, W1, V1], grafica: [176, 46, 272, 108], puntaRoja: pR, puntaAzul: pA, alarma: [287, 52], telefono: [280, 102, 295, 110], mesa: [64, 132, 244, 156] };
}

// la mesa de juntas de nogal (por delante de los actores): el tablero con el reflejo del ventanal, el faldón, el pie;
// encima carpetas planas, una jarra de agua y dos vasos (x 146–172) y dos latas lisas (x 214–226), fuera de las caras de
// quien está detrás en x 116 y x 182
function b_sedeDelante(R, t, o) {
  const { rect, pset, linea } = R;
  for (let y = 156; y < 162; y++) for (let x = 70 + (y - 156); x < 240 - (y - 156); x++) if ((x + y) % 2 === 0) pset(x, y, b_P.moquetaS);
  rect(64, 131, 244, 137, C.k); rect(65, 132, 243, 136, b_P.nogal); rect(65, 132, 243, 132, b_P.nogalL);
  for (let x = 70; x < 240; x += 13) { rect(x, 133, x + 5, 133, b_P.nogalL); pset(x + 8, 135, b_P.nogalS); }
  for (let x = 80; x < 160; x++) if ((x + 133) % 3 === 0) pset(x, 134, b_P.yesoP);   // el reflejo del ventanal en el barniz
  rect(68, 137, 240, 148, C.k); rect(69, 137, 239, 147, b_P.nogalS); for (let x = 72; x < 236; x += 28) { rect(x, 139, x + 24, 145, b_P.nogal); rect(x, 139, x + 24, 139, b_P.nogalL); }
  for (const x of [100, 206]) { rect(x - 4, 148, x + 4, 155, b_P.nogalD); rect(x - 8, 155, x + 8, 157, C.k); }
  // carpetas, jarra, vasos y latas
  for (const [x, c] of [[74, hex('#c8b070')], [112, hex('#8a9ab0')], [186, hex('#c8b070')]]) { rect(x, 128, x + 18, 131, C.k); rect(x + 1, 129, x + 17, 130, c); rect(x + 1, 129, x + 17, 129, C.blanco); }
  { const j = 22; rect(124 + j, 118, 132 + j, 131, C.k); rect(125 + j, 120, 131 + j, 130, b_P.vidrio); rect(125 + j, 124, 131 + j, 130, hex('#a8d0e8')); pset(126 + j, 121, C.blanco); rect(132 + j, 121, 134 + j, 125, C.k); rect(124 + j, 117, 129 + j, 118, C.k); }
  for (const x of [160, 168]) { rect(x, 125, x + 4, 131, C.k); rect(x + 1, 126, x + 3, 130, b_P.vidrio); rect(x + 1, 128, x + 3, 130, hex('#a8d0e8')); }
  b_lataG(R, 214, 131, false); b_lataG(R, 222, 131, true);
  return { suelo: 166, detras: 136, mesa: [64, 131, 244, 157] };
}

// el laboratorio de sabores (encuadre 'sede', cámara 'laboratorio'). Suelo: y 168 delante (x 6–64 y 254–318 libres);
// detrás de la isla, y 144 (x 140–194, entre las probetas y la carpeta)
function b_laboratorio(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R;
  b_fijo(R, 'b_lab', () => {
    // el techo con su tubo, la pared de azulejos con juntas, brillos y algún azulejo desconchado
    rect(0, 0, 319, 13, b_P.techo); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 12, b_P.techoS); rect(0, 13, 319, 13, b_P.techoS);
    rect(90, 9, 150, 12, b_P.marco); rect(91, 10, 149, 11, b_P.tubo);
    rect(0, 14, 319, 132, b_P.azulejo);
    for (let y = 14; y < 132; y += 7) rect(0, y, 319, y, b_P.azulejoS); for (let y = 14; y < 132; y++) for (let x = ((Math.floor((y - 14) / 7)) % 2) * 5; x < 320; x += 10) pset(x, y, b_P.azulejoS);
    for (let k = 0; k < 70; k++) { const x = Math.floor(h(k, 1, 50) * 32) * 10 + 2, y = Math.floor(h(k, 2, 50) * 16) * 7 + 16; if (!(x > 270 && y < 46)) { pset(x, y, b_P.azulejoL); pset(x + 1, y, b_P.azulejoL); } }
    // la campana de gases: el armazón, el cristal de guillotina, dentro un mechero con su matraz
    rect(4, 16, 66, 100, C.k); rect(5, 17, 65, 99, b_P.mueble); rect(5, 17, 65, 26, b_P.muebleL); for (let x = 9; x < 62; x += 4) rect(x, 20, x + 1, 23, b_P.muebleS);
    rect(9, 30, 61, 86, b_P.encimera); rect(9, 30, 61, 31, b_P.encimeraL); rect(10, 32, 60, 85, hex('#3a4450'));
    rect(9, 86, 61, 90, b_P.encimeraL); rect(5, 90, 65, 99, b_P.muebleS); rect(30, 93, 40, 94, b_P.plata);
    rect(32, 76, 38, 85, b_P.plataS); rect(30, 70, 40, 71, b_P.plata); linea(31, 70, 31, 60, b_P.plataS); linea(39, 70, 39, 60, b_P.plataS);
    // estantes con frascos de color, botellas rectas y el tarro de nueces de cola
    for (const y of [36, 56]) { rect(70, y, 100, y + 2, b_P.nogal); rect(70, y, 100, y, b_P.nogalL); rect(72, y + 3, 73, y + 6, b_P.nogalS); rect(97, y + 3, 98, y + 6, b_P.nogalS); }
    for (let k = 0; k < 5; k++) { const x = 72 + k * 6, c = [b_P.jarabeA, b_P.vidrioB, b_P.jarabeB, b_P.jarabeC, b_P.vidrioB][k]; rect(x, 25, x + 3, 35, C.k); rect(x + 1, 27, x + 2, 35, c); rect(x + 1, 23, x + 2, 26, C.k); pset(x + 1, 28, C.blanco); }
    rect(74, 44, 86, 55, C.k); rect(75, 46, 85, 55, b_P.vidrio); for (let k = 0; k < 8; k++) disco(77 + (k % 4) * 2.4, 50 + Math.floor(k / 4) * 3, 1.2, b_P.nogalL); rect(74, 43, 86, 45, C.laton);
    for (const x of [90, 95]) { rect(x, 46, x + 3, 55, C.k); rect(x + 1, 49, x + 2, 55, b_P.jarabeB); }
    // la pizarra verde con su marco de madera, las fórmulas en símbolos y el borrador
    rect(104, 20, 216, 82, b_P.nogalS); rect(106, 22, 214, 80, b_P.pizarra); for (let k = 0; k < 120; k++) pset(106 + Math.floor(h(k, 3, 51) * 108), 22 + Math.floor(h(k, 4, 51) * 58), b_P.pizarraL);
    const hexa = (cx, cy, r) => { for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, b = (i + 1) * Math.PI / 3; linea(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), Math.round(cx + Math.cos(b) * r), Math.round(cy + Math.sin(b) * r), b_P.tiza); } };
    hexa(122, 38, 7); hexa(134, 45, 7); linea(129, 38, 129, 45, b_P.tiza); linea(141, 45, 147, 41, b_P.tiza); disco(149, 40, 1.6, b_P.tiza);
    linea(156, 40, 168, 40, b_P.tiza); linea(165, 37, 168, 40, b_P.tiza); linea(165, 43, 168, 40, b_P.tiza);   // la flecha
    hexa(182, 40, 7); disco(182, 40, 2.4, b_P.tizaS); linea(189, 40, 196, 34, b_P.tiza); linea(189, 40, 196, 46, b_P.tiza); disco(198, 33, 1.4, b_P.tiza); disco(198, 47, 1.4, b_P.tiza);
    b_cifras(R, '3', 114, 58, b_P.tiza); R.icono('vaso', 120, 57, b_P.tiza, b_P.pizarra); linea(130, 60, 134, 60, b_P.tiza); linea(132, 58, 132, 62, b_P.tiza);   // 3 vasos + …
    b_cifras(R, '2', 138, 58, b_P.tiza); disco(149, 60, 2.4, b_P.tiza); disco(149, 60, 1.2, b_P.pizarra); linea(155, 59, 160, 59, b_P.tiza); linea(155, 61, 160, 61, b_P.tiza);
    R.icono('lata', 164, 57, b_P.tiza, b_P.pizarra); R.icono('?', 174, 57, b_P.tiza, b_P.pizarra);
    b_cifras(R, '200000', 114, 70, b_P.tizaS); linea(112, 76, 140, 76, b_P.tizaS);
    for (let k = 0; k < 9; k++) { const x = 190 + (k % 3) * 7, y = 56 + Math.floor(k / 3) * 7; rect(x, y, x + 4, y, b_P.tizaS); if (k % 4 === 0) linea(x, y + 2, x + 4, y - 2, b_P.tiza); }
    rect(104, 82, 216, 85, b_P.nogal); rect(104, 82, 216, 82, b_P.nogalL); rect(186, 79, 198, 82, hex('#8a6a4a')); rect(186, 79, 198, 79, b_P.tizaS); rect(120, 81, 126, 82, b_P.tiza); rect(130, 81, 133, 82, hex('#e8c040'));
    // el corcho con el mapa de Kansas en pictograma (un rectángulo con la esquina mordida) y una estrella, y notas sin letras
    rect(222, 46, 270, 82, b_P.nogalS); rect(223, 47, 269, 81, b_P.corcho); for (let k = 0; k < 60; k++) pset(224 + Math.floor(h(k, 5, 52) * 44), 48 + Math.floor(h(k, 6, 52) * 32), b_P.corchoS);
    rect(228, 52, 262, 74, b_P.pizarraB); poligono([[231, 56], [254, 56], [256, 58], [259, 60], [259, 71], [231, 71]], hex('#e8d8a0')); linea(231, 56, 254, 56, b_P.nogalS); linea(254, 56, 259, 60, b_P.nogalS); linea(259, 60, 259, 71, b_P.nogalS); linea(231, 71, 259, 71, b_P.nogalS); linea(231, 56, 231, 71, b_P.nogalS);
    for (let k = 0; k < 5; k++) pset(234 + Math.floor(h(k, 7, 52) * 22), 59 + Math.floor(h(k, 8, 52) * 10), C.rojo);
    disco(229, 52, 1.4, C.rojo); disco(261, 52, 1.4, hex('#3a6ac8'));
    rect(250, 76, 266, 80, hex('#f4e890')); rect(226, 75, 240, 80, hex('#a8d8f0')); for (const [x, y] of [[252, 78], [228, 77]]) rect(x, y, x + 8, y, b_P.nogalS);
    // los frascos de jarabes en el estante de encima del corcho
    rect(222, 36, 270, 38, b_P.nogal); rect(222, 36, 270, 36, b_P.nogalL);
    for (let k = 0; k < 6; k++) { const x = 225 + k * 7, c = [b_P.jarabeA, b_P.jarabeB, b_P.jarabeC, b_P.jarabeA, b_P.vidrioB, b_P.jarabeB][k], hh = 6 + (k % 3); rect(x, 35 - hh, x + 4, 35, C.k); rect(x + 1, 36 - hh, x + 3, 35, c); pset(x + 1, 36 - hh, C.blanco); }
    // la nevera del laboratorio, con su termómetro de esfera y el tirador
    rect(276, 52, 316, 132, C.k); rect(277, 53, 315, 131, b_P.muebleL); rect(313, 53, 315, 131, b_P.muebleS); rect(277, 88, 315, 88, b_P.muebleS);
    rect(280, 62, 284, 84, b_P.mueble); rect(280, 92, 284, 120, b_P.mueble); disco(300, 66, 5, C.k); disco(300, 66, 4, C.blanco); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(Math.round(300 + Math.cos(a) * 3), Math.round(66 + Math.sin(a) * 3), b_P.plataS); }
    rect(292, 98, 310, 112, b_P.pizarraB); for (let k = 0; k < 4; k++) rect(294, 100 + k * 3, 306 - k * 2, 100 + k * 3, b_P.plataS); R.icono('gota', 302, 102, hex('#3a8ae0'), b_P.pizarraB);
    // la encimera del fondo: muebles con puertas y tiradores, el tablero negro con su brillo
    rect(64, 100, 272, 132, b_P.mueble); for (let x = 66; x < 270; x += 26) { rect(x, 106, x + 23, 130, b_P.muebleS); rect(x + 1, 107, x + 22, 129, b_P.mueble); rect(x + 1, 107, x + 22, 107, b_P.muebleL); rect(x + 18, 116, x + 19, 120, b_P.plataS); }
    rect(62, 97, 274, 101, C.k); rect(63, 98, 273, 100, b_P.encimera); rect(63, 98, 273, 98, b_P.encimeraL);
    // gradillas de tubos con jarabes, la balanza, la centrífuga (la luz va luego), el soporte con la bureta
    for (const [x0, n] of [[72, 6], [196, 5]]) { rect(x0, 92, x0 + n * 5 + 2, 97, C.k); rect(x0 + 1, 93, x0 + n * 5 + 1, 96, b_P.plata);
      for (let k = 0; k < n; k++) { const x = x0 + 2 + k * 5, c = [b_P.jarabeA, b_P.jarabeB, b_P.jarabeC][k % 3], hh = 4 + ((k * 3) % 4); rect(x, 80, x + 2, 95, b_P.vidrioS); rect(x, 95 - hh, x + 2, 95, c); pset(x, 81, C.blanco); } }
    rect(110, 88, 130, 97, C.k); rect(111, 89, 129, 96, b_P.muebleL); rect(113, 86, 127, 88, b_P.plata); rect(122, 91, 128, 94, hex('#2a4a3a')); b_cifras(R, '12', 122, 90, hex('#8af07a'));
    rect(234, 82, 262, 97, C.k); rect(235, 83, 261, 96, b_P.muebleL); rect(235, 83, 261, 86, b_P.mueble); disco(248, 90, 4, b_P.muebleS);
    rect(150, 60, 151, 97, b_P.plataS); rect(144, 95, 158, 97, C.k); rect(151, 68, 160, 69, b_P.plataS); rect(158, 58, 160, 82, b_P.vidrioS); rect(158, 66, 160, 82, b_P.jarabeA); rect(158, 83, 159, 86, b_P.plataS);
    rect(154, 88, 166, 97, C.k); rect(155, 90, 165, 96, b_P.vidrio); rect(155, 93, 165, 96, b_P.jarabeB);   // el vaso de precipitados debajo
    rect(176, 92, 190, 97, C.k); rect(177, 93, 189, 96, b_P.mueble); rect(184, 94, 188, 95, hex('#2a4a3a'));   // el agitador (el vaso, luego)
    // el suelo de vinilo gris en perspectiva, con su brillo
    for (let y = 133; y < 180; y++) { const f = (y - 133) / 47, e = 1 + 0.5 * f, fila = Math.floor(Math.pow(f, 0.75) * 5), lh = Math.floor(Math.pow((y - 132) / 47, 0.75) * 5) !== fila; let pc = Math.floor((160 - 160 / e) / 22);
      for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 22); pset(x, y, lh || col !== pc ? b_P.suelo4 : (col + fila) % 2 ? b_P.suelo3 : b_mez(b_P.suelo3, b_P.suelo4, 0.4)); pc = col; } }
    for (let y = 135; y < 170; y++) for (let x = 110 + (y - 135); x < 140 + (y - 135) * 2; x++) if ((x + y) % 2 === 0 && y % 3) pset(x, y, b_P.azulejo);
    for (let x = 0; x < 320; x++) for (let y = 133; y < 136; y++) if ((x + y) % 2 === 0 || y === 133) pset(x, y, b_P.suelo4);
    for (let k = 0; k < 40; k++) pset(Math.floor(h(k, 1, 53) * 320), 137 + Math.floor(h(k, 2, 53) * 42), b_P.suelo4);
  });
  // el matraz que hierve dentro de la campana: burbujas, la llama y el vapor que sube y se va por arriba
  { rect(33, 74, 37, 76, Math.floor(t * 10) % 2 ? hex('#5ab0ff') : hex('#8ad0ff')); pset(35, 73, b_P.foco);
    disco(35, 64, 6, C.k); disco(35, 64, 5, b_P.vidrio); for (let y = 63; y < 70; y++) for (let x = 30; x < 41; x++) if (Math.hypot(x - 35, y - 64) < 5) pset(x, y, b_P.jarabeC); rect(33, 48, 37, 59, C.k); rect(34, 49, 36, 59, b_P.vidrio);
    for (let k = 0; k < 4; k++) { const u = (t * 1.2 + k * 0.25) % 1; pset(32 + k * 2, Math.round(68 - u * 5), C.blanco); }
    for (let k = 0; k < 6; k++) { const u = (t * 0.5 + k / 6) % 1, x = Math.round(35 + Math.sin(t * 2 + k) * 2 + u * 4), y = Math.round(46 - u * 14); if (y > 32) { pset(x, y, b_P.azulejo); pset(x + 1, y, b_P.azulejoS); } } }
  // la gota de la bureta, el agitador que gira (con su remolino), la luz de la centrífuga y la tapa que zumba
  { const u = (t * 0.8) % 1; if (u < 0.7) pset(158, Math.round(87 + u * 6), b_P.jarabeA); }
  { rect(178, 82, 188, 92, C.k); rect(179, 84, 187, 92, b_P.vidrio); rect(179, 87, 187, 92, b_P.jarabeC); const a = t * 9; pset(183 + Math.round(Math.cos(a) * 2), 90, C.blanco); pset(183 - Math.round(Math.cos(a) * 2), 90, b_P.jarabeA); pset(183, 87, b_P.foco); }
  { const on = Math.floor(t * 2) % 2; disco(254, 86, 1, on ? hex('#5af07a') : hex('#2a5a3a')); const a = t * 20; pset(248 + Math.round(Math.cos(a) * 3), 90 + Math.round(Math.sin(a) * 3), b_P.muebleL); }
  // en la báscula, la cifra que cambia
  rect(122, 90, 128, 95, hex('#2a4a3a')); b_cifras(R, String(10 + Math.floor(t * 1.3) % 9), 121, 90, hex('#8af07a'));
  return { suelo: 168, detras: 144, pizarra: [104, 20, 216, 85], corcho: [222, 46, 270, 82], kansas: [231, 56, 259, 71], campana: [4, 16, 66, 100], nevera: [276, 52, 316, 132], isla: [70, 136, 250, 162] };
}

// la isla de trabajo del laboratorio (por delante de los actores): tablero negro, frente con cajones; encima una
// gradilla con seis tubos de jarabes, probetas graduadas, un microscopio y, si o.carpeta (por omisión true), la carpeta
// con candado de latón que brilla
function b_labDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  for (let y = 162; y < 167; y++) for (let x = 72; x < 250; x++) if ((x + y) % 2 === 0) pset(x, y, b_P.suelo4);
  rect(68, 135, 252, 141, C.k); rect(69, 136, 251, 140, b_P.encimera); rect(69, 136, 251, 136, b_P.encimeraL); for (let x = 74; x < 250; x += 17) rect(x, 137, x + 6, 137, b_P.encimeraL);
  rect(72, 141, 248, 162, b_P.mueble); for (let x = 74; x < 246; x += 29) { rect(x, 143, x + 26, 152, b_P.muebleS); rect(x + 1, 144, x + 25, 151, b_P.mueble); rect(x + 1, 144, x + 25, 144, b_P.muebleL); rect(x + 10, 147, x + 16, 148, b_P.plataS); }
  rect(72, 153, 248, 162, b_P.muebleS); rect(72, 161, 248, 162, C.k); rect(72, 141, 73, 162, C.k); rect(247, 141, 248, 162, C.k);
  // la gradilla y los tubos
  rect(84, 129, 112, 135, C.k); rect(85, 130, 111, 134, b_P.plata);
  for (let k = 0; k < 6; k++) { const x = 86 + k * 4, c = [b_P.jarabeA, b_P.jarabeB, b_P.jarabeC][k % 3], hh = 4 + ((k * 5) % 5); rect(x, 118, x + 2, 133, b_P.vidrioS); rect(x, 133 - hh, x + 2, 133, c); pset(x, 119, C.blanco); }
  // las probetas graduadas
  for (const [x, hh, c] of [[124, 22, b_P.jarabeB], [132, 18, b_P.jarabeC]]) { rect(x, 135 - hh, x + 4, 135, C.k); rect(x + 1, 136 - hh, x + 3, 134, b_P.vidrio); rect(x + 1, 128, x + 3, 134, c); for (let y = 136 - hh + 2; y < 134; y += 3) pset(x + 3, y, b_P.vidrioS); rect(x - 1, 134, x + 5, 135, C.k); }
  // el microscopio
  { const m = 88; rect(150 + m, 132, 164 + m, 135, C.k); rect(151 + m, 132, 163 + m, 134, b_P.plata); rect(152 + m, 116, 155 + m, 132, C.k); linea(154 + m, 118, 160 + m, 112, C.k); linea(155 + m, 118, 161 + m, 112, b_P.plataS); rect(159 + m, 108, 163 + m, 112, C.k); rect(156 + m, 124, 162 + m, 126, b_P.plataS); }
  // la carpeta del proyecto secreto con su candado
  if (o.carpeta !== false) { rect(196, 126, 232, 136, C.k); rect(197, 127, 231, 135, hex('#a83a28')); rect(197, 127, 231, 127, hex('#d0583e')); rect(197, 134, 231, 135, hex('#7a2418')); rect(212, 127, 214, 135, hex('#7a2418'));
    R.icono('candado', 210, 122, C.laton, C.k); if (Math.floor(t * 1.5) % 3 === 0) pset(212, 124, C.blanco); }
  return { suelo: 168, detras: 144, isla: [68, 135, 252, 162], carpeta: [196, 122, 232, 136] };
}

// los búferes de los fondos fijos de este grupo (uno por encuadre): se pintan una vez y se copian en cada fotograma
const c_capas = new Map();

function c_capa(R, clave, pintar) {
  let b = c_capas.get(clave);
  if (!b || b.R !== R) { const buf = R.nuevo(), prev = R.usar(buf); pintar(); R.usar(prev); b = { R, buf }; c_capas.set(clave, b); }
  R.copiar(b.buf);
}

// la matriz de Bayer 4 × 4 para las tramas
const C_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (C_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 el primero, f = 1 el segundo)
const c_mez = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
const c_rc = (R, cl, x0, y0, x1, y1, c) => R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c);

// tiñe lo que ya hay en una elipse (cx, cy, rx, ry) hacia col con fuerza a, más fuerte en el centro y tramado en el borde
function c_charco(R, cx, cy, rx, ry, col, a) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e >= 1) continue; const x = Math.round(cx + i), y = Math.round(cy + j);
    if (e > 0.55 && c_b4(x, y) > (1 - e) * 2.2) continue; const p = R.pget(x, y); if (p) R.pset(x, y, c_mez(p, col, a * (e < 0.55 ? 1 : 0.7))); }
}

// un haz de luz tramado desde (x0, y0) hasta un charco centrado en (x1, y1) de semiancho w; a: fuerza
function c_haz(R, x0, y0, x1, y1, w, col, a) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0), cx = x0 + (x1 - x0) * f, ww = 1.5 + w * f;
    for (let x = Math.round(cx - ww); x <= Math.round(cx + ww); x++) { const borde = Math.abs(x - cx) / ww; if (c_b4(x, y) > 0.62 - borde * 0.35) continue; const p = R.pget(x, y); if (p) R.pset(x, y, c_mez(p, col, a * (1 - borde * 0.5))); } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba), respeta R.recorte
function c_nube(R, cx, cy, w, tonos) {
  const [c1, c2, c3] = tonos, r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.75], [0, -1, r], [w * 0.38, 0.5, r * 0.8], [w * 0.15, 1.5, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.55, c1);
}

// un pájaro lejano que aletea (respeta R.recorte)
function c_pajaro(R, x, y, t, k, col) { const a = Math.sin(t * 9 + k * 2) > 0; R.pset(x, y, col); R.pset(x - 1, y - (a ? 1 : 0), col); R.pset(x + 1, y - (a ? 1 : 0), col); if (a) { R.pset(x - 2, y - 1, col); R.pset(x + 2, y - 1, col); } }

// un paseante lejano de 7 px (respeta R.recorte): pies en (x, y), ropa, piel y el paso de las piernas
function c_paseante(R, x, y, ropa, piel, paso, dir = 1) {
  x = Math.round(x); y = Math.round(y); const { pset } = R, os = c_mez(ropa, hex('#000000'), 0.35);
  pset(x, y - 6, hex('#2a2028')); pset(x, y - 5, piel); pset(x + dir, y - 5, piel);
  for (let j = -4; j <= -2; j++) { pset(x, j + y, ropa); pset(x + 1, j + y, os); }
  const p = paso & 1; pset(x - (p ? 1 : 0), y - 1, hex('#2a2a34')); pset(x + 1 + (p ? 1 : 0), y - 1, hex('#2a2a34')); pset(x - (p ? 1 : 0), y, hex('#1a1a22')); pset(x + 1 + (p ? 1 : 0), y, hex('#1a1a22'));
}

// una cabeza vista de espaldas (centro x, y; radio 7 con contorno): tipo 0 pelo corto, 1 calvo con brillo, 2 moño,
// 3 melena ochentera, 4 rizos; pelo = [luz, sombra]; borde: el filo de luz de los focos en lo alto
function c_cabeza(R, x, y, tipo, pelo, piel, borde) {
  const { disco, pset, rect } = R, [pl, ps] = pelo, K = hex('#14101a');
  rect(x - 2, y + 5, x + 2, y + 8, c_mez(piel, K, 0.35));
  if (tipo === 4) { for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 5), y + Math.round(Math.sin(a * 0.785) * 5), 3, K); disco(x, y, 7, K);
    for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 5), y + Math.round(Math.sin(a * 0.785) * 5), 2, ps); disco(x, y, 6, ps); disco(x - 1, y - 2, 3, pl); for (let a = 0; a < 5; a++) pset(x - 4 + a * 2, y - 7 + (a % 2), borde); return; }
  if (tipo === 3) { disco(x, y + 1, 8, K); disco(x, y + 1, 7, ps); disco(x - 1, y - 1, 5, pl); for (let i = -6; i <= 6; i += 3) pset(x + i, y + 6, pl); for (let a = 0; a < 6; a++) pset(x - 5 + a * 2, y - 6, borde); return; }
  disco(x, y, 7, K);
  if (tipo === 1) { disco(x, y, 6, piel); disco(x - 1, y - 2, 3, c_mez(piel, hex('#ffffff'), 0.18)); pset(x - 2, y - 4, c_mez(piel, hex('#ffffff'), 0.6)); for (let i = -5; i <= 5; i++) { pset(x + i, y + Math.round(Math.sqrt(36 - i * i)) - 1, ps); pset(x + i, y + Math.round(Math.sqrt(36 - i * i)) - 2, pl); } return; }
  disco(x, y, 6, ps); disco(x - 1, y - 1, 4, pl); for (let i = -4; i <= 4; i += 2) pset(x + i, y + 5, ps);
  if (tipo === 2) { disco(x, y - 6, 3, K); disco(x, y - 6, 2, ps); pset(x - 1, y - 7, pl); }
  for (let a = 0; a < 5; a++) pset(x - 4 + a * 2, y - 6 + (a % 2), borde);
}

// el destello de un flash en (x, y): disco blanco y rayos amarillentos (f 0–1: lo que le queda de vida)
function c_flash(R, x, y, f) {
  const { disco, linea, pset } = R, L = Math.round(3 + f * 6), BL = hex('#ffffff'), AM = hex('#fff4c0');
  disco(x, y, 1 + Math.round(f * 2), BL);
  for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4, l = a % 2 ? L * 0.55 : L; linea(x, y, Math.round(x + Math.cos(an) * l), Math.round(y + Math.sin(an) * l), a % 2 ? AM : BL); }
  if (f > 0.6) for (let a = 0; a < 12; a++) { const an = a * Math.PI / 6; pset(Math.round(x + Math.cos(an) * (L + 2)), Math.round(y + Math.sin(an) * (L + 2)), AM); }
}

// ¿dispara el flash k en el instante t? devuelve la vida que le queda (0 si no)
const c_disparo = (t, k, dens) => { const v = 7, n = Math.floor(t * v + k * 0.37), f = 1 - (t * v + k * 0.37 - n); return h(k, n, 280) < dens * 0.16 ? f : 0; };

// LA RUEDA DE PRENSA: el plano general. Devuelve { suelo: 118 (la tarima: pies de los que hablan), sueloSala: 158 (el
// foso de prensa), mesa: [112, 200, 99] (x0, x1, y del tablero), lata: [156, 93] (centro y base de la lata), atril: [250, 118]
// (dónde se planta quien habla) }
function c_prensa(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  c_capa(R, 'nc_prensa' + (o.julio ? 'J' : ''), () => c_prensaFondo(R, o));
  const VIEW = [41, 21, 279, 95];
  // lo que se mueve al otro lado del ventanal, recortado a su hueco
  R.recorte(VIEW);
  const NUBE = [hex('#ffffff'), hex('#e4eef8'), hex('#bccde2')];
  for (let k = 0; k < 7; k++) { const v = [1.2, 2.1, 3.4][k % 3], w = 14 + (k % 3) * 6, x = ((h(k, 1, 281) * 300 + t * v) % 300) + 10, y = 25 + (k * 5) % 12; c_nube(R, x, y, w, NUBE); }
  for (let k = 0; k < 5; k++) { const x = ((h(k, 3, 282) * 260 + t * (9 + k * 2)) % 260) + 30, y = 30 + Math.round(Math.sin(t * 0.8 + k) * 3) + k * 2; c_pajaro(R, x, y, t, k, hex('#4a4a5a')); }
  // la fuente: el agua del vaso que tiembla y los chorros que suben y bajan
  for (let i = -20; i <= 20; i += 2) pset(160 + i + (Math.floor(t * 4) % 2), 89 + (i % 4 ? 0 : 1), hex('#c8e4f4'));
  for (let k = 0; k < 7; k++) { const dx = (k - 3) * 5, alto = 9 + Math.round((Math.sin(t * 2.2 + k * 0.9) * 0.5 + 0.5) * 7) - Math.abs(k - 3);
    for (let y = 0; y < alto; y++) pset(160 + dx + (y > alto - 3 ? Math.sign(dx) : 0), 87 - y, y > alto - 2 ? hex('#ffffff') : hex('#d8ecf8'));
    if (Math.floor(t * 6 + k) % 3 === 0) { pset(159 + dx, 87 - alto, hex('#ffffff')); pset(161 + dx, 88 - alto, hex('#b8d8f0')); } }
  // los paseantes de la plaza y las palomas que picotean
  const ROPAS = ['#a83a3a', '#3a5a9a', '#c8a050', '#4a7a4a', '#6a4a7a', '#d8d0c0'].map(hex), PIEL = [hex('#e8c09a'), hex('#a8704a'), hex('#f0d0b0')];
  for (let k = 0; k < 8; k++) { const d = k % 2 ? 1 : -1, v = 5 + (k % 3) * 2, x = d > 0 ? ((h(k, 5, 283) * 280 + t * v) % 280) + 20 : 300 - ((h(k, 5, 283) * 280 + t * v) % 280), y = 91 + (k % 3);
    c_paseante(R, x, y, ROPAS[k % 6], PIEL[k % 3], Math.floor(t * 5 + k), d); }
  for (let k = 0; k < 4; k++) { const x = 100 + k * 9 + Math.round(Math.sin(t * 0.7 + k) * 2), pica = Math.floor(t * 3 + k) % 4 === 0; pset(x, 94, hex('#6a6a7a')); pset(x + 1, 94, hex('#8a8a9a')); pset(x + (pica ? 2 : 1), pica ? 94 : 93, hex('#5a5a6a')); }
  // un brillo que corre despacio por los cristales
  { const g = ((t * 14) % 420) - 60; for (let y = 21; y <= 95; y++) { const x0 = Math.round(g + (95 - y) * 0.6); for (let x = x0; x < x0 + 6; x++) if (((x + y) & 1) === 0) { const p = R.pget(x, y); if (p) pset(x, y, c_mez(p, hex('#ffffff'), 0.22)); } } }
  R.recorte(null);
  c_prensaMarcos(R);
  // la mesa larga del fondo de la tarima con su mantel, los vasos, la jarra, los micrófonos de mesa y la lata en su peana
  c_mesaPrensa(R, t, o, 112, 200, 99, 110, 156);
  // los haces de los focos, que se mecen un poco, y sus charcos en la tarima
  const FOCOS = [[66, 0], [118, 1], [196, 2], [244, 3]];
  for (const [fx, k] of FOCOS) { const bx = fx + Math.round(Math.sin(t * 0.35 + k * 1.9) * 10) + (k === 1 ? 38 : k === 2 ? -40 : 0); c_haz(R, fx, 21, bx, 112, 15, hex('#fff2c8'), 0.18); c_charco(R, bx, 114, 22, 5, hex('#ffe8b0'), 0.32); }
  // el foco principal sobre la lata
  c_charco(R, 156, 84, 15, 15, hex('#fff6d8'), o.destapada || (o.paño ?? 0) >= 1 ? 0.26 : 0.14);
  // los focos colgados de la parrilla, por delante de su haz
  for (const [fx, k] of FOCOS) { rect(fx, 13, fx, 15, hex('#3a3e52')); rect(fx - 3, 15, fx + 3, 20, hex('#14101a')); rect(fx - 2, 16, fx + 2, 19, hex('#3a3e4e')); rect(fx - 2, 16, fx - 2, 19, hex('#5a5e70')); rect(fx - 2, 20, fx + 2, 20, k % 2 ? hex('#fff0c0') : hex('#ffe0a0')); pset(fx, 21, hex('#ffffff')); }
  // la fila de periodistas sentados del foso, de espaldas: unos alzan la cámara y disparan, otro levanta la libreta
  const dens = o.flashes ?? 0.6;
  const PELOS = [['#3a2a20', '#241810'], ['#6a4a2a', '#4a321a'], ['#1e1a24', '#100c14'], ['#c8a060', '#8a6a3a'], ['#8a5a2a', '#5a3a1a'], ['#9a9aa8', '#6a6a78']].map(([a, b]) => [hex(a), hex(b)]);
  const ROPA = ['#6a5a4a', '#3a4a6a', '#7a3a3a', '#4a5a4a', '#8a7a5a', '#4a4a5a', '#5a3a5a'].map(hex), PIELES = [hex('#e8c09a'), hex('#c8885a'), hex('#8a5a3a'), hex('#f0c8a0')];
  for (let k = 0; k < 14; k++) { const x = 14 + k * 22 + (k % 2) * 3, y = 136, ropa = ROPA[k % 7], pelo = PELOS[(k * 3) % 6];
    rect(x - 10, y + 5, x + 10, y + 13, hex('#14101a')); rect(x - 9, y + 6, x + 9, y + 13, ropa); rect(x - 9, y + 6, x + 9, y + 6, c_mez(ropa, hex('#ffffff'), 0.25)); rect(x, y + 7, x, y + 13, c_mez(ropa, hex('#000000'), 0.3));
    c_cabeza(R, x, y, (k * 5) % 5, pelo, PIELES[k % 4], hex('#f8dca8'));
    const f = c_disparo(t, k, dens), alza = f > 0 || Math.sin(t * 0.9 + k * 2.3) > 0.55;
    if (k % 3 === 1 && alza) { // la cámara de fotos alzada por encima de la cabeza, con su flash
      rect(x - 5, y - 13, x + 5, y - 7, hex('#14101a')); rect(x - 4, y - 12, x + 4, y - 8, hex('#2e2e38')); rect(x - 4, y - 12, x + 4, y - 12, hex('#5a5a68')); disco(x, y - 10, 2, hex('#4a6a9a')); pset(x - 1, y - 11, hex('#c8e0ff'));
      rect(x + 2, y - 17, x + 5, y - 13, hex('#14101a')); rect(x + 3, y - 16, x + 4, y - 14, f > 0 ? hex('#ffffff') : hex('#c8ccd8'));
      if (f > 0) c_flash(R, x + 4, y - 16, f);
    } else if (k % 5 === 3 && Math.sin(t * 1.3 + k) > 0.3) { rect(x + 6, y - 6, x + 11, y + 1, hex('#14101a')); rect(x + 7, y - 5, x + 10, y, hex('#f4f0e4')); for (let j = -4; j < 0; j += 2) rect(x + 7, y + j, x + 10, y + j, hex('#9a9aa8')); }
  }
  return { suelo: 118, sueloSala: 158, mesa: [112, 200, 99], lata: [156, 93], atril: [250, 118] };
}

// el fondo fijo de la rueda de prensa: techo, ventanal con la plaza, cortinas, tarima, faldón y moqueta del foso
function c_prensaFondo(R, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de casetones y la parrilla de focos, oscuros y tranquilos
  rect(0, 0, 319, 19, hex('#141626'));
  for (let x = 0; x < 320; x += 20) { rect(x, 0, x, 11, hex('#1a1d30')); rect(x + 1, 1, x + 18, 1, hex('#181b2c')); }
  rect(0, 11, 319, 11, hex('#1c1f32'));
  rect(0, 13, 319, 13, hex('#2a2e42')); rect(0, 17, 319, 17, hex('#24283a')); for (let x = 0; x < 320; x += 6) { linea(x, 13, x + 3, 17, hex('#262a3e')); linea(x + 3, 17, x + 6, 13, hex('#262a3e')); }
  // el ventanal: el cielo tramado, más claro hacia el horizonte
  const VIEW = [41, 21, 279, 95], CIELO = ['#5a8ad0', '#6a98d8', '#7aa6e0', '#8ab4e8', '#9cc2ee', '#b0d0f2', '#c4dcf4'].map(hex);
  for (let y = 21; y <= 62; y++) for (let x = 41; x <= 279; x++) { const u = (y - 21) / 41 * (CIELO.length - 1), i = Math.floor(u); pset(x, y, CIELO[Math.min(CIELO.length - 1, i + (u - i > c_b4(x, y) ? 1 : 0))]); }
  R.recorte(VIEW);
  // el perfil de Manhattan en la bruma, con depósitos de agua en las azoteas y ventanas
  for (let x = 41, k = 0; x < 280; k++) { const w = 6 + Math.floor(h(k, 1, 284) * 12), top = 34 + Math.floor(h(k, 2, 284) * 16), c = k % 2 ? hex('#a4b4cc') : hex('#98a8c4');
    c_rc(R, VIEW, x, top, x + w - 1, 62, c); c_rc(R, VIEW, x, top, x, 62, c_mez(c, hex('#ffffff'), 0.2));
    for (let wy = top + 2; wy < 62; wy += 3) for (let wx = x + 2; wx < x + w - 1; wx += 2) if (h(wx, wy, 285) < 0.4) pset(wx, wy, hex('#b8c4d8'));
    if (h(k, 3, 284) < 0.3) { rect(x + 2, top - 4, x + 4, top - 1, hex('#8a8a9a')); pset(x + 2, top - 5, hex('#8a8a9a')); pset(x + 3, top - 5, hex('#8a8a9a')); }
    x += w; }
  // un rascacielos de aguja al fondo
  c_rc(R, VIEW, 226, 26, 234, 62, hex('#8a9cba')); c_rc(R, VIEW, 228, 22, 232, 26, hex('#8a9cba')); linea(230, 15, 230, 22, hex('#8a9cba')); c_rc(R, VIEW, 226, 26, 226, 62, hex('#aab8d0'));
  const TRV = hex('#e4dccb'), TRVM = hex('#cfc5b0'), TRVS = hex('#a89e88'), VID = hex('#2e4a6a'), VIDL = hex('#4a6a8e'), CAL = hex('#f0c878'), CALL = hex('#f8e4a8');
  // la sala de la izquierda: caja de cristal oscuro tras una columnata de pilares finos de travertino
  c_rc(R, VIEW, 41, 44, 112, 47, TRV); c_rc(R, VIEW, 41, 47, 112, 48, TRVS);
  c_rc(R, VIEW, 41, 49, 112, 84, VID); for (let y = 52; y < 84; y += 6) c_rc(R, VIEW, 41, y, 112, y, VIDL);
  for (let y = 50; y < 84; y++) for (let x = 42; x < 112; x += 3) if (h(x, y >> 2, 286) < 0.12) pset(x, y, CAL);
  for (let x = 43; x <= 110; x += 5) { c_rc(R, VIEW, x, 48, x + 1, 84, TRV); c_rc(R, VIEW, x + 1, 48, x + 1, 84, TRVM); }
  c_rc(R, VIEW, 41, 84, 112, 85, TRVS);
  // la ópera en medio: el ático con su cornisa, los cinco arcos altos encendidos con sus lámparas y la marquesina
  c_rc(R, VIEW, 116, 38, 204, 85, TRVM); c_rc(R, VIEW, 116, 38, 204, 41, TRV); c_rc(R, VIEW, 116, 42, 204, 42, TRVS);
  for (let y = 44; y < 85; y += 4) for (let x = 117; x < 204; x += 7) pset(x + ((y >> 2) & 1) * 3, y, hex('#c4baa4'));
  for (let a = 0; a < 5; a++) { const x0 = 120 + a * 17, x1 = x0 + 12, cx = (x0 + x1) / 2;
    for (let y = 46; y <= 84; y++) for (let x = x0; x <= x1; x++) { const dy = y - 52, dx = x - cx; if (dy < 0 && dx * dx + dy * dy * 1.2 > 36) continue; pset(x, y, y < 70 ? (h(x, y, 287) < 0.08 ? CALL : CAL) : c_mez(CAL, hex('#c89a50'), 0.4)); }
    for (let y = 48; y <= 84; y += 5) c_rc(R, VIEW, x0, y, x1, y, hex('#b88a48')); c_rc(R, VIEW, Math.round(cx), 48, Math.round(cx), 84, hex('#b88a48'));
    // las lámparas de estrella de dentro
    for (const [ly, r] of [[56, 2], [64, 1]]) { pset(Math.round(cx), ly, hex('#ffffff')); for (let s = 0; s < 6; s++) pset(Math.round(cx + Math.cos(s * 1.05) * (r + 1)), Math.round(ly + Math.sin(s * 1.05) * (r + 1)), CALL); }
    c_rc(R, VIEW, x0 - 2, 44, x0 - 1, 85, TRV); }
  c_rc(R, VIEW, 202, 44, 203, 85, TRV);
  // el teatro de la derecha: pilares pareados y el balcón corrido
  c_rc(R, VIEW, 208, 46, 279, 49, TRV); c_rc(R, VIEW, 208, 50, 279, 84, hex('#3a5476')); c_rc(R, VIEW, 208, 64, 279, 66, TRVM); c_rc(R, VIEW, 208, 63, 279, 63, TRV);
  for (let y = 52; y < 84; y++) for (let x = 209; x < 280; x += 2) if (h(x, y >> 1, 288) < 0.1) pset(x, y, CAL);
  for (let x = 211; x <= 276; x += 9) { c_rc(R, VIEW, x, 49, x + 1, 84, TRV); c_rc(R, VIEW, x + 3, 49, x + 4, 84, TRV); c_rc(R, VIEW, x + 4, 49, x + 4, 84, TRVM); }
  // la plaza de travertino con su despiece en abanico y el vaso de la fuente
  c_rc(R, VIEW, 41, 85, 279, 95, hex('#d8cfbc'));
  for (let y = 86; y <= 95; y++) for (let x = 41; x <= 279; x++) { const a = Math.atan2(y - 88, (x - 160) * 0.35); if (Math.abs(((a * 12 / Math.PI) % 1 + 1) % 1 - 0.5) > 0.45) pset(x, y, hex('#c4baa6')); else if ((y & 1) && h(x, y, 289) < 0.05) pset(x, y, hex('#ece4d4')); }
  for (let y = 85; y <= 95; y += 3) for (let x = 41; x <= 279; x++) if (((x + y) & 3) === 0) pset(x, y, hex('#cbc1ac'));
  for (let i = -22; i <= 22; i++) { const yy = Math.round(Math.sqrt(Math.max(0, 1 - (i / 22) ** 2)) * 3); pset(160 + i, 88 + yy, hex('#6a6a74')); pset(160 + i, 88 - yy, hex('#9a9aa4')); for (let j = -yy + 1; j < yy; j++) pset(160 + i, 88 + j, hex('#7ab0d8')); }
  for (const x of [58, 262]) { c_rc(R, VIEW, x - 3, 88, x + 3, 93, hex('#9a9080')); for (let a = 0; a < 9; a++) disco(x + Math.round(Math.cos(a * 0.7) * 3), 84 + Math.round(Math.sin(a * 0.7) * 2), 2, a % 2 ? hex('#4a7a4a') : hex('#5a9a5a')); pset(x - 1, 82, hex('#8ac08a')); }
  R.recorte(null);
  // las cortinas de terciopelo azul noche a los lados, con sus pliegues y la luz en el filo
  for (const [x0, x1] of [[0, 39], [281, 319]]) for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 0.75), c = f > 0.6 ? hex('#2a3658') : f > -0.2 ? hex('#1e2846') : hex('#141c34');
    rect(x, 18, x, 100, c); if (f > 0.85) for (let y = 22; y < 100; y += 3) if (h(x, y, 290) < 0.5) pset(x, y, hex('#34426a')); }
  rect(0, 18, 319, 22, hex('#1a2440')); rect(0, 22, 319, 22, hex('#10162c')); for (let x = 0; x < 320; x += 8) { rect(x + 1, 23, x + 6, 24, hex('#1a2440')); rect(x + 2, 25, x + 5, 25, hex('#1a2440')); }
  for (let x = 0; x < 320; x += 4) pset(x, 19, hex('#2a3658'));
  if (o.julio) for (let x = 44; x < 278; x += 10) { const c = (x / 10 | 0) % 3; poligono([[x, 23], [x + 8, 23], [x + 4, 30]], c === 0 ? hex('#b83a3a') : c === 1 ? hex('#f0ece0') : hex('#2e4a8a')); linea(x, 23, x + 4, 30, hex('#14101a')); }
  // el alféizar bajo el ventanal
  rect(38, 96, 282, 99, hex('#3a3e52')); rect(38, 96, 282, 96, hex('#5a5e70'));
  // la tarima de tablas, con vetas y juntas, más oscura al fondo
  for (let y = 100; y <= 123; y++) { const f = (y - 100) / 23; rect(0, y, 319, y, c_mez(hex('#4a3224'), hex('#7a5438'), f)); }
  for (const y of [103, 107, 112, 118]) rect(0, y, 319, y, hex('#3a2418'));
  for (let k = 0; k < 60; k++) { const y = 101 + Math.floor(h(k, 1, 291) * 22), x = Math.floor(h(k, 2, 291) * 320); if ([103, 107, 112, 118].includes(y)) continue; rect(x, y, x + 6 + (k % 9), y, k % 3 ? hex('#5a3c28') : hex('#8a6444')); }
  for (let k = 0; k < 24; k++) { const y = [104, 108, 113, 119][k % 4], x = (k * 47 + 13) % 320; rect(x, y, x, y + 2, hex('#3a2418')); }
  // las marcas de cinta en la tarima
  for (const [x, y] of [[236, 117], [96, 116]]) { linea(x - 2, y - 1, x + 2, y + 1, hex('#c8a040')); linea(x - 2, y + 1, x + 2, y - 1, hex('#c8a040')); }
  // el filo de la tarima con su tira de luz y el faldón plisado
  rect(0, 124, 319, 125, hex('#c8b090')); rect(0, 126, 319, 132, hex('#2a1a24'));
  for (let x = 0; x < 320; x += 4) { rect(x, 126, x, 132, hex('#3a2430')); pset(x + 2, 128, hex('#1e1018')); }
  for (let x = 2; x < 320; x += 6) pset(x, 124, hex('#fff0c0'));
  // la moqueta del foso con su dibujo de rombos, y los cables
  rect(0, 133, 319, 179, hex('#3a2a32'));
  for (let y = 133; y < 180; y++) for (let x = 0; x < 320; x++) { const d = (Math.abs(((x + 4) % 8) - 4) + Math.abs(((y + 4) % 8) - 4)); if (d === 3) pset(x, y, hex('#4a3440')); else if (d === 0) pset(x, y, hex('#56404a')); }
  for (let y = 133; y < 140; y++) for (let x = 0; x < 320; x++) if (c_b4(x, y) < (140 - y) / 9) pset(x, y, hex('#241820'));
  for (const [x0, y0, x1, y1] of [[20, 178, 90, 150], [300, 179, 230, 152]]) for (let i = 0; i <= 60; i++) { const u = i / 60; pset(Math.round(x0 + (x1 - x0) * u), Math.round(y0 + (y1 - y0) * u + Math.sin(u * 7) * 3), hex('#141016')); }
}

// las columnas finas del ventanal y el travesaño, por delante de lo que pasa fuera
function c_prensaMarcos(R) {
  const { rect } = R;
  rect(38, 19, 282, 20, hex('#c8c0b0')); rect(38, 21, 40, 98, hex('#c8c0b0')); rect(280, 21, 282, 98, hex('#a89e88'));
  for (let x = 74; x < 280; x += 34) { rect(x, 21, x + 2, 95, hex('#e8e2d4')); rect(x + 2, 21, x + 2, 95, hex('#b0a690')); rect(x - 1, 21, x - 1, 95, hex('#3a4a5a')); }
  rect(41, 57, 279, 58, hex('#d8d0c0')); rect(41, 59, 279, 59, hex('#9a9282'));
}

// la mesa de la rueda de prensa: tablero (x0–x1, en y), patas hasta ySuelo, mantel (o.mantel), vasos que saltan,
// jarra, micrófonos de mesa y la lata nueva sobre su peana en lx (tapada con el paño, o al descubierto)
function c_mesaPrensa(R, t, o, x0, x1, y, ySuelo, lx) {
  const { rect, pset, linea, disco, poligono } = R, K = hex('#14101a'), u = Math.max(0, Math.min(1, o.mantel ?? 0));
  // las patas y el tablero de madera, que se ven cuando el mantel se va
  for (const x of [x0 + 3, x1 - 3]) { rect(x - 1, y + 2, x + 1, ySuelo, K); rect(x, y + 2, x, ySuelo, hex('#6a4a34')); }
  rect(x0, y - 1, x1, y + 2, K); rect(x0 + 1, y, x1 - 1, y + 1, hex('#8a5e3a')); rect(x0 + 1, y, x1 - 1, y, hex('#a87a50'));
  // la sombra de la mesa en la tarima
  for (let x = x0; x <= x1; x++) if ((x & 1) === 0) pset(x, ySuelo + 1, hex('#3a2418'));
  // el mantel: blanco con sus pliegues y el bajo; al tirar, se corre hacia la derecha y ondea
  if (u < 1) { const dx = Math.round(u * u * 120), ond = u > 0 ? Math.sin(t * 20) * 2 * u : 0;
    for (let x = x0 - 2; x <= x1 + 2; x++) { const X = x + dx; if (X > 319) continue; const caida = ySuelo - 1 - Math.round(u * 6 + Math.sin(x * 0.3 + t * 12) * u * 2), bajo = Math.round(caida + (x - x0) * 0 + ond * Math.sin(x * 0.5));
      rect(X, y - 1, X, bajo, (x - x0) % 7 === 3 ? hex('#d4d8e0') : (x - x0) % 7 === 4 ? hex('#c0c4ce') : hex('#eef0f4')); pset(X, bajo, hex('#a8acb8')); pset(X, y - 1, hex('#ffffff')); }
    rect(x0 - 2 + dx, y - 1, Math.min(319, x1 + 2 + dx), y - 1, hex('#ffffff')); rect(x0 - 2 + dx, y + 2, Math.min(319, x1 + 2 + dx), y + 2, hex('#c8ccd6')); }
  // los vasos y la jarra (dan un saltito mientras el mantel se escurre por debajo)
  const salto = (k) => u > 0 && u < 1 ? Math.round(Math.abs(Math.sin(u * Math.PI * 3 + k)) * 3) : 0;
  for (const [x, k] of [[x0 + 12, 0], [x1 - 14, 1], [x1 - 22, 2]]) { const yy = y - 1 - salto(k); rect(x - 2, yy - 6, x + 2, yy, K); rect(x - 1, yy - 5, x + 1, yy - 1, hex('#c8e4f4')); rect(x - 1, yy - 3, x + 1, yy - 1, hex('#8ac0e0')); pset(x - 1, yy - 5, hex('#ffffff')); }
  { const x = x0 + 22, yy = y - 1 - salto(3); rect(x - 3, yy - 10, x + 3, yy, K); rect(x - 2, yy - 9, x + 2, yy - 1, hex('#d8eef8')); rect(x - 2, yy - 5, x + 2, yy - 1, hex('#8ac0e0')); rect(x + 3, yy - 8, x + 5, yy - 4, K); pset(x + 4, yy - 7, hex('#d8eef8')); pset(x - 1, yy - 8, hex('#ffffff')); }
  // los micrófonos de mesa de cuello de cisne con su piloto
  for (const x of [x0 + 34, x1 - 32]) { rect(x - 3, y - 3, x + 3, y - 1, K); rect(x - 2, y - 2, x + 2, y - 2, hex('#4a4a56')); linea(x, y - 3, x + 2, y - 10, K); linea(x + 2, y - 10, x - 1, y - 14, K); rect(x - 2, y - 16, x, y - 14, K); pset(x + 2, y - 2, Math.floor(t * 1.5) % 2 ? hex('#ff4a4a') : hex('#6a2028')); }
  // la peana y la lata nueva, tapada o al descubierto
  const ly = y - 6; rect(lx - 9, ly, lx + 9, y - 1 - salto(4), K); rect(lx - 8, ly + 1, lx + 8, y - 2 - salto(4), hex('#2e2e3a')); rect(lx - 8, ly + 1, lx + 8, ly + 1, hex('#5a5a6a'));
  const pz = Math.max(0, Math.min(1, o.paño ?? 0));
  if (o.lata !== false) PIEZAS_NC.lata?.(R, lx, ly, { color: 'rojo', banda: !!o.banda, s: 1 });
  if (o.destapada || pz >= 1) {
    const g = Math.floor(t * 3) % 4; pset(lx - 4, ly - 15 + g, hex('#ffffff')); pset(lx - 4, ly - 14 + g, hex('#ffd8d0'));
    for (const [dx, dy, k] of [[-10, -16, 0], [9, -12, 1], [7, -20, 2]]) { const v = (Math.sin(t * 5 + k * 2.1) + 1) / 2; if (v > 0.4) { const L = v > 0.8 ? 2 : 1; for (let i = -L; i <= L; i++) { pset(lx + dx + i, ly + dy, hex('#fff4c0')); pset(lx + dx, ly + dy + i, hex('#fff4c0')); } } }
  }
  if (!o.destapada && pz < 1) PIEZAS_NC['paño']?.(R, lx, ly + 1, { tira: pz, w: 24, h: 27 });
}

// LA RUEDA DE PRENSA DE CERCA: el atril con los micrófonos y la lata nueva bajo su foco. Devuelve { suelo: 160 (la
// tarima), peana: [44, 124, 118] (x0, x1, y del tablero), lata: [84, 118] (centro y base de la lata, a doble tamaño),
// atril: [216, 160] (dónde se planta quien habla: le asoma la cabeza por encima del tablero, en y 151) }
function c_atril(R, t, o) {
  const { rect, pset, linea, disco } = R;
  c_capa(R, 'nc_atril' + (o.julio ? 'J' : ''), () => c_atrilFondo(R, o));
  // al otro lado del ventanal desenfocado: la gente que cruza la plaza como manchas y los chorros de la fuente
  R.recorte([34, 18, 319, 112]);
  for (let k = 0; k < 6; k++) { const d = k % 2 ? 1 : -1, x = d > 0 ? ((h(k, 7, 292) * 330 + t * (8 + k)) % 330) : 330 - ((h(k, 7, 292) * 330 + t * (8 + k)) % 330), c = [hex('#a85a5a'), hex('#5a6a9a'), hex('#c8a870')][k % 3];
    for (let j = 0; j < 9; j++) for (let i = -2; i <= 2; i++) if (c_b4(x + i, 96 + j) < 0.6 - Math.abs(i) * 0.12) pset(Math.round(x + i), 96 + j, c); }
  for (let k = 0; k < 5; k++) { const x = 240 + k * 8, alto = 10 + Math.round((Math.sin(t * 2.4 + k) * 0.5 + 0.5) * 9); for (let y = 0; y < alto; y++) if (c_b4(x, 104 - y) < 0.7) { pset(x, 104 - y, hex('#e8f4fc')); pset(x + 1, 104 - y, hex('#c8e0f0')); } }
  // las nubes que pasan, como manchas claras
  for (let k = 0; k < 3; k++) { const x = ((h(k, 8, 292) * 340 + t * (2 + k)) % 340) - 10, y = 26 + k * 6; c_charco(R, x, y, 14, 4, hex('#ffffff'), 0.35); }
  R.recorte(null);
  c_atrilMarcos(R);
  // el haz del foco sobre la lata, con las motas de polvo que flotan en él
  const pz = Math.max(0, Math.min(1, o.paño ?? 0)), fuera = o.destapada || pz >= 1;
  c_haz(R, 96, 28, 84, 114, 34, hex('#fff2c8'), fuera ? 0.3 : 0.22); c_charco(R, 84, 117, 40, 4, hex('#fff2c8'), 0.3);
  for (let k = 0; k < 16; k++) { const v = (h(k, 1, 293) * 100 + t * (2 + k % 3)) % 100, y = Math.round(16 + v), x = Math.round(84 + (h(k, 2, 293) - 0.5) * (8 + v * 0.6) + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 2 + k) > -0.4) pset(x, y, hex('#fff8e0')); }
  // el segundo haz que barre el fondo
  { const bx = 250 + Math.round(Math.sin(t * 0.4) * 30); c_haz(R, 236, 14, bx, 158, 22, hex('#e8f0ff'), 0.1); c_charco(R, bx, 160, 26, 5, hex('#e8f0ff'), 0.15); }
  // el foco grande colgado sobre la lata, por delante de su haz
  { const K = hex('#14101a'); rect(95, 12, 97, 16, hex('#3a3e52')); rect(86, 16, 106, 26, K); rect(87, 17, 105, 25, hex('#3a3e4e')); rect(87, 17, 105, 17, hex('#5e6274')); for (let x = 89; x < 104; x += 3) rect(x, 19, x, 23, hex('#2a2e3c'));
    linea(86, 26, 82, 30, K); linea(106, 26, 110, 30, K); rect(88, 26, 104, 28, hex('#fff0c0')); rect(92, 27, 100, 27, hex('#ffffff')); }
  // la bandera en su mástil al fondo, a la derecha, que ondea con el aire de los focos, y el centro de flores
  { const K = hex('#14101a'); rect(270, 52, 271, 131, hex('#c8a040')); rect(271, 52, 271, 131, hex('#8a6a24')); disco(270, 50, 2, hex('#e8c860')); rect(265, 129, 276, 132, K); rect(266, 130, 275, 131, hex('#8a6a24'));
    for (let i = 0; i < 30; i++) { const ond = Math.round(Math.sin(t * 3 - i * 0.35) * (i / 30) * 2.5), sombra = Math.sin(t * 3 - i * 0.35 + 1.2) > 0.3;
      for (let j = 0; j < 18; j++) { const y = 54 + j + ond, x = 268 - i; let c = (Math.floor(j / 2.6) % 2) ? hex('#f0ece0') : hex('#b83a3a'); if (i < 13 && j < 10) c = ((i + j) % 3 === 0 && i % 2 === 0) ? hex('#f0ece0') : hex('#2e3a7a'); R.pset(x, y, sombra ? c_mez(c, K, 0.18) : c); }
      R.pset(268 - i, 72 + ond, c_mez(hex('#b83a3a'), K, 0.4)); } }
  { const K = hex('#14101a'); rect(292, 112, 308, 131, K); rect(293, 113, 307, 131, hex('#c8c0b0')); rect(293, 113, 307, 114, hex('#e8e0d0')); rect(306, 113, 307, 131, hex('#9a9282'));
    for (let a = 0; a < 14; a++) { const ang = -Math.PI / 2 + (a - 6.5) * 0.22 + Math.sin(t * 0.8 + a) * 0.03, L = 10 + (a % 4) * 3, fx = Math.round(300 + Math.cos(ang) * L), fy = Math.round(112 + Math.sin(ang) * L);
      linea(300, 112, fx, fy, hex('#3a7a4a')); disco(fx, fy, 2, [hex('#e8604a'), hex('#f0d060'), hex('#f4f0e8'), hex('#c84a6a')][a % 4]); pset(fx - 1, fy - 1, hex('#ffffff')); } }
  // la peana con su mantel, la lata a doble tamaño y el paño
  const K = hex('#14101a'), x0 = 44, x1 = 124, y = 118, u = Math.max(0, Math.min(1, o.mantel ?? 0));
  rect(x0 + 6, y + 2, x0 + 10, 160, K); rect(x1 - 10, y + 2, x1 - 6, 160, K); rect(x0 + 7, y + 2, x0 + 9, 160, hex('#6a4a34')); rect(x1 - 9, y + 2, x1 - 7, 160, hex('#5a3c28'));
  rect(x0, y - 2, x1, y + 3, K); rect(x0 + 1, y - 1, x1 - 1, y + 2, hex('#8a5e3a')); rect(x0 + 1, y - 1, x1 - 1, y - 1, hex('#b0845a'));
  for (let x = x0 - 2; x <= x1 + 6; x++) if (((x + 160) & 1) === 0) { pset(x, 161, hex('#2e1e16')); pset(x + 1, 162, hex('#2e1e16')); }
  if (u < 1) { const dx = Math.round(u * u * 150);
    for (let x = x0 - 3; x <= x1 + 3; x++) { const X = x + dx; if (X > 319) continue; const bajo = 158 - Math.round(u * 10 + Math.sin(x * 0.25 + t * 14) * u * 4), m = (x - x0 + 40) % 12;
      rect(X, y - 2, X, bajo, m === 5 ? hex('#d0d4de') : m === 6 || m === 7 ? hex('#bcc0cc') : m === 4 ? hex('#ffffff') : hex('#eceef4'));
      if (m === 0) for (let yy = y + 30; yy < bajo; yy += 6) pset(X, yy, hex('#d8dce4')); pset(X, bajo, hex('#9a9eac')); pset(X, bajo - 1, hex('#c8ccd6')); }
    rect(x0 - 3 + dx, y - 3, Math.min(319, x1 + 3 + dx), y - 3, hex('#ffffff')); rect(x0 - 3 + dx, y + 3, Math.min(319, x1 + 3 + dx), y + 4, hex('#c4c8d2')); }
  // un vaso de agua en la esquina de la peana
  { const vx = x0 + 10, vy = y - 2 - (u > 0 && u < 1 ? Math.round(Math.abs(Math.sin(u * 9)) * 4) : 0); rect(vx - 3, vy - 10, vx + 3, vy, K); rect(vx - 2, vy - 9, vx + 2, vy - 1, hex('#c8e4f4')); rect(vx - 2, vy - 6, vx + 2, vy - 1, hex('#8ac0e0')); pset(vx - 2, vy - 9, hex('#ffffff')); pset(vx - 1, vy - 7, hex('#ffffff')); }
  // la base giratoria de la lata y la lata
  const lx = 84, ly = y - 4; rect(lx - 16, ly, lx + 16, y - 2, K); rect(lx - 15, ly + 1, lx + 15, y - 3, hex('#2e2e3a')); rect(lx - 15, ly + 1, lx + 15, ly + 1, hex('#6a6a7a'));
  for (let x = lx - 14; x <= lx + 14; x += 4) pset(x + (Math.floor(t * 4) % 4), ly + 2, hex('#c8a040'));
  if (o.lata !== false) PIEZAS_NC.lata?.(R, lx, ly, { color: 'rojo', banda: !!o.banda, s: 2 });
  if (fuera) { const g = Math.floor(t * 4) % 8; rect(lx - 8, ly - 32 + g * 3, lx - 7, ly - 30 + g * 3, hex('#ffffff'));
    for (const [dx, dy, k] of [[-20, -30, 0], [18, -24, 1], [14, -40, 2], [-16, -8, 3]]) { const v = (Math.sin(t * 4 + k * 1.7) + 1) / 2; if (v > 0.35) { const L = v > 0.75 ? 3 : 1; for (let i = -L; i <= L; i++) { pset(lx + dx + i, ly + dy, hex('#fff4c0')); pset(lx + dx, ly + dy + i, hex('#fff4c0')); } pset(lx + dx, ly + dy, hex('#ffffff')); } } }
  else PIEZAS_NC['paño']?.(R, lx, ly + 2, { tira: pz, w: 17, h: 22, s: 2 });
  return { suelo: 160, peana: [44, 124, 118], lata: [84, 118], atril: [216, 160] };
}

// el fondo fijo de la rueda de prensa de cerca: la parrilla con el foco grande, el ventanal desenfocado, la cortina y
// el suelo de tablas en perspectiva
function c_atrilFondo(R, o) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 0, 319, 17, hex('#141626')); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 10, hex('#1a1d30')); rect(0, 10, 319, 10, hex('#1c1f32'));
  rect(0, 12, 319, 12, hex('#2a2e42')); rect(0, 16, 319, 16, hex('#24283a')); for (let x = 0; x < 320; x += 8) { linea(x, 12, x + 4, 16, hex('#262a3e')); linea(x + 4, 16, x + 8, 12, hex('#262a3e')); }
  // el ventanal desenfocado: el cielo, la ópera en manchas cálidas y la plaza
  const CIELO = ['#6a98d8', '#7aa6e0', '#8ab4e8', '#9cc2ee', '#b0d0f2', '#c4dcf4'].map(hex);
  for (let y = 18; y <= 112; y++) for (let x = 34; x <= 319; x++) { const u = Math.min(1, (y - 18) / 50) * (CIELO.length - 1), i = Math.floor(u); pset(x, y, CIELO[Math.min(CIELO.length - 1, i + (u - i > c_b4(x, y) ? 1 : 0))]); }
  for (let y = 46; y <= 112; y++) for (let x = 34; x <= 319; x++) { const d = Math.min(y - 46, Math.abs(x - 180) < 120 ? 10 : 0) / 10; if (c_b4(x, y) < d) pset(x, y, x % 9 < 1 ? hex('#c4baa4') : hex('#d8cfbc')); }
  for (let a = 0; a < 6; a++) { const cx = 70 + a * 46; for (let y = 52; y <= 94; y++) for (let x = cx - 14; x <= cx + 14; x++) { const e = ((x - cx) / 14) ** 2 + ((y - 70) / 24) ** 2; if (e < 1 && c_b4(x, y) < 1.3 - e) pset(x, y, e < 0.4 ? hex('#f8e0a0') : hex('#f0c878')); } }
  for (let k = 0; k < 18; k++) { const x = Math.round(40 + h(k, 1, 294) * 270), y = Math.round(54 + h(k, 2, 294) * 36), r = 2 + Math.round(h(k, 3, 294) * 3); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) { const p = R.pget(x + i, y + j); pset(x + i, y + j, c_mez(p, hex('#fff4d0'), i * i + j * j >= (r - 1) ** 2 ? 0.7 : 0.4)); } }
  for (let y = 96; y <= 112; y++) for (let x = 34; x <= 319; x++) if (c_b4(x, y) < 0.5) pset(x, y, hex('#c8bea8'));
  // la cortina de terciopelo a la izquierda, con sus pliegues
  for (let x = 0; x <= 36; x++) { const f = Math.sin(x * 0.55 + 0.5), c = f > 0.6 ? hex('#2a3658') : f > -0.2 ? hex('#1e2846') : hex('#141c34'); rect(x, 17, x, 132, c); if (f > 0.85) for (let y = 20; y < 132; y += 3) if (h(x, y, 295) < 0.5) pset(x, y, hex('#34426a')); }
  for (let y = 17; y < 132; y += 30) { rect(30, y + 10, 36, y + 12, hex('#c8a040')); }
  if (o.julio) for (let x = 40; x < 270; x += 12) { const c = (x / 12 | 0) % 3; poligono([[x, 18], [x + 10, 18], [x + 5, 27]], c === 0 ? hex('#b83a3a') : c === 1 ? hex('#f0ece0') : hex('#2e4a8a')); }
  // el fondo de la tarima: un zócalo oscuro con su filo
  rect(0, 113, 319, 131, hex('#1e2234')); rect(0, 113, 319, 113, hex('#3a4058')); for (let x = 0; x < 320; x += 16) rect(x, 114, x, 131, hex('#262a3e'));
  for (let y = 116; y < 131; y += 3) for (let x = 0; x < 320; x++) if (h(x, y, 296) < 0.04) pset(x, y, hex('#2a3048'));
  // el suelo de tablas en perspectiva (fugan hacia el centro de arriba) con sus vetas y el brillo de los focos
  for (let y = 132; y <= 179; y++) { const f = (y - 132) / 47; rect(0, y, 319, y, c_mez(hex('#4a3224'), hex('#7a5438'), f)); }
  for (let k = -12; k <= 12; k++) for (let y = 132; y <= 179; y++) { const x = Math.round(160 + k * 14 * (1 + (y - 132) / 24)); pset(x, y, hex('#3a2418')); }
  for (let k = 0; k < 70; k++) { const y = 133 + Math.floor(h(k, 1, 297) * 46), x = Math.floor(h(k, 2, 297) * 320); rect(x, y, x + 3 + (k % 6), y, k % 3 ? hex('#5a3c28') : hex('#8a6444')); }
  for (let y = 134; y <= 179; y += 9) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 298) < 0.3 && ((x + y) & 1)) pset(x, y, hex('#3a2418'));
  rect(0, 132, 319, 132, hex('#2a1a14'));
}

// las columnas gruesas del ventanal de cerca, por delante de lo que pasa fuera
function c_atrilMarcos(R) {
  const { rect } = R;
  for (const x of [34, 150, 266]) { rect(x, 18, x + 6, 112, hex('#e8e2d4')); rect(x + 5, 18, x + 6, 112, hex('#b0a690')); rect(x - 1, 18, x - 1, 112, hex('#3a4a5a')); rect(x + 1, 18, x + 1, 112, hex('#f8f4ec')); }
  rect(34, 60, 319, 62, hex('#d8d0c0')); rect(34, 63, 319, 63, hex('#9a9282'));
}

// LA OFICINA DEL RIVAL. Devuelve { suelo: 150, puerta: [296, 152] (dónde se sale por la puerta lateral: quien pasa de
// x 306 queda tapado por la jamba de anuncioDelante), mesaDelante: [0, 94, 141], periodico: [147, 55], mesas: [[20, 96],
// [176, 252]] (las del fondo, tablero en y 100) }
function c_rival(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, K = hex('#14101a');
  c_capa(R, 'nc_rival', () => c_rivalFondo(R));
  // el jardín de la sede por la ventana: nubes, pájaros, los árboles que se mecen, el chorro del estanque y el coche
  const V = [18, 37, 110, 82]; R.recorte(V);
  const NUBE = [hex('#ffffff'), hex('#e4eef8'), hex('#bccde2')];
  for (let k = 0; k < 4; k++) { const v = [1.5, 2.6, 3.8][k % 3], x = ((h(k, 1, 300) * 130 + t * v) % 130) + 4, y = 41 + (k * 3) % 8; c_nube(R, x, y, 10 + (k % 2) * 5, NUBE); }
  for (let k = 0; k < 3; k++) c_pajaro(R, ((h(k, 2, 300) * 120 + t * (10 + k * 3)) % 120) + 4, 46 + k * 2 + Math.round(Math.sin(t + k) * 2), t, k, hex('#4a4a5a'));
  for (const [x, k] of [[30, 0], [62, 1], [98, 2]]) { const m = Math.round(Math.sin(t * 1.1 + k) * 1.2); rect(x - 1, 62, x + 1, 72, hex('#5a3a24'));
    for (let a = 0; a < 7; a++) disco(x + m + Math.round(Math.cos(a * 0.9) * 5), 58 + Math.round(Math.sin(a * 0.9) * 4), 4, hex('#2e6a3a'));
    for (let a = 0; a < 5; a++) disco(x + m - 1 + Math.round(Math.cos(a * 1.2) * 3), 56 + Math.round(Math.sin(a * 1.2) * 3), 3, hex('#4a8a4a')); pset(x + m - 3, 53, hex('#8ac07a')); pset(x + m + 1, 54, hex('#8ac07a')); }
  { const alto = 5 + Math.round((Math.sin(t * 2.5) * 0.5 + 0.5) * 4); for (let y = 0; y < alto; y++) pset(80, 74 - y, hex('#e8f4fc')); pset(79, 74 - alto, hex('#ffffff')); pset(81, 75 - alto, hex('#ffffff')); }
  { const x = ((t * 22) % 160) - 30; for (let i = 0; i < 12; i++) pset(Math.round(x + i), 78, hex('#2e3a5a')); for (let i = 2; i < 9; i++) pset(Math.round(x + i), 77, hex('#3e4e72')); pset(Math.round(x + 4), 77, hex('#a8c8e8')); pset(Math.round(x + 1), 79, K); pset(Math.round(x + 9), 79, K); }
  R.recorte(null);
  // la persiana, por delante del jardín
  for (let y = 26; y <= 36; y += 2) { rect(17, y, 111, y, hex('#e4e8ee')); rect(17, y + 1, 111, y + 1, hex('#b8bec8')); }
  rect(17, 36, 111, 37, hex('#9aa0aa')); for (const x of [40, 88]) rect(x, 37, x, 46, hex('#d8dce4')); pset(40, 47, hex('#9aa0aa')); pset(88, 47, hex('#9aa0aa'));
  // las pantallas fluorescentes: una parpadea
  for (const [x, k] of [[186, 0], [228, 1]]) { const on = k === 0 || Math.floor(t * 9) % 11 !== 0 && Math.floor(t * 9) % 13 !== 0; rect(x, 3, x + 24, 8, K); rect(x + 1, 4, x + 23, 7, on ? hex('#f4f8f8') : hex('#a8b0b8')); for (let i = x + 3; i < x + 23; i += 4) pset(i, 6, on ? hex('#d8e4e8') : hex('#8a929a')); }
  // el periódico de la pared: la esquina de abajo se levanta con el aire
  { const v = (Math.sin(t * 1.7) + 1) / 2, L = 3 + Math.round(v * 3); poligono([[166 - L, 80], [166, 80 - L], [166, 80]], hex('#5a6878')); poligono([[166 - L, 80], [166 - L, 80 - L], [166, 80 - L]], hex('#d4ccb8')); linea(166 - L, 80, 166, 80 - L, hex('#a8a090')); }
  // las pantallas verdes de los ordenadores del fondo, que se van escribiendo
  for (const [mx, my, k] of [[40, 80, 0], [214, 80, 1]]) { const n = Math.floor(t * 3 + k * 5) % 14;
    for (let l = 0; l < 4; l++) { const len = l < Math.floor(n / 3) ? 4 + ((l * 5 + k) % 6) : l === Math.floor(n / 3) ? (n % 3) * 3 : 0; if (len) rect(mx - 6, my - 7 + l * 2, mx - 6 + len, my - 7 + l * 2, hex('#7af08a')); }
    if (Math.floor(t * 2) % 2) pset(mx + 5, my + 1, hex('#7af08a')); }
  // la taza humeante de la mesa del fondo
  for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; pset(Math.round(238 + Math.sin(u * 6 + t) * 1.5), Math.round(94 - u * 10), u < 0.5 ? hex('#e8ecf0') : hex('#c8ccd4')); }
  // las burbujas de la fuente de agua
  { const u = (t * 0.8) % 1; if (u < 0.6) disco(271, 84 - Math.round(u * 14), 1, hex('#e8f4fc')); pset(268, 76 - Math.round(((t * 0.6) % 1) * 6), hex('#ffffff')); }
  // la pared lateral derecha con la puerta, el pasillo iluminado y la gente que pasa con globos
  const pu = Math.max(0, Math.min(1, o.puerta ?? 1));
  R.recorte([288, 64, 305, 152]);
  for (let k = 0; k < 3; k++) { const x = ((h(k, 3, 301) * 40 + t * (6 + k * 3)) % 40) + 280, s = 136 + k * 3; c_paseante(R, x, s, [hex('#3a5a9a'), hex('#c8a050'), hex('#6a6a7a')][k], hex('#e8c09a'), Math.floor(t * 5 + k), 1);
    linea(Math.round(x), s - 6, Math.round(x + 2), s - 14, hex('#c8ccd8')); disco(Math.round(x + 2), s - 17, 2, hex('#2e6ad8')); pset(Math.round(x + 1), s - 18, hex('#a8c8ff')); }
  R.recorte(null);
  { const xh = Math.round(288 + (1 - pu) * 17); poligono([[288, 64], [xh, 62 - Math.round((xh - 288) * 0.1)], [xh, 152 + Math.round((xh - 288) * 0.5)], [288, 128]], hex('#4a5a7a'));
    linea(288, 64, xh, 62 - Math.round((xh - 288) * 0.1), K); linea(xh, 62, xh, 152 + Math.round((xh - 288) * 0.5), K); pset(xh - 2, 104, hex('#c8a040')); }
  // el confeti que cae por la oficina, girando
  const COLS = ['#3a6ad8', '#ffffff', '#a8c8ff', '#c8ccd8', '#2e4aa8', '#f0d860'].map(hex);
  for (let k = 0; k < 70; k++) { const v = 10 + (k % 5) * 3, y = Math.round(((h(k, 1, 302) * 200 + t * v) % 200) - 10), x = Math.round(h(k, 2, 302) * 320 + Math.sin(t * 2 + k) * 4); if (x > 276 && y < 46) continue;
    const g = Math.floor(t * 8 + k) % 3; pset(x, y, COLS[k % 6]); if (g === 0) pset(x + 1, y, COLS[k % 6]); else if (g === 1) pset(x, y + 1, c_mez(COLS[k % 6], K, 0.3)); }
  // los globos azules atados a las mesas del fondo, que se mecen
  for (const [ax, ay, k] of [[28, 98, 0], [34, 98, 1], [92, 98, 2], [182, 98, 3], [250, 98, 4], [244, 98, 5]]) c_globo(R, ax, ay, t, k);
  return { suelo: 150, puerta: [296, 152], mesaDelante: [0, 94, 141], periodico: [147, 55], mesas: [[20, 96], [176, 252]] };
}

// un globo azul atado en (ax, ay) que se mece con su cordel; k cambia el tono, la altura y el vaivén
function c_globo(R, ax, ay, t, k) {
  const { disco, pset, linea } = R, TONO = [['#2e6ad8', '#1e4aa8', '#8ab0ff'], ['#4a8ae8', '#2e5ab8', '#b0d0ff'], ['#c8ccd8', '#8a90a0', '#ffffff'], ['#1e4aa8', '#14306e', '#6a90e0']][k % 4].map(hex);
  const alto = 34 + (k * 7) % 16, gx = Math.round(ax + Math.sin(t * 0.9 + k * 1.3) * 4), gy = Math.round(ay - alto + Math.sin(t * 1.4 + k) * 1.5);
  for (let i = 0; i <= 12; i++) { const u = i / 12; pset(Math.round(ax + (gx - ax) * u + Math.sin(u * 6 + t * 2 + k) * 1.2), Math.round(ay + (gy + 6 - ay) * u), hex('#d8dce4')); }
  disco(gx, gy, 5, hex('#14101a')); for (let j = -4; j <= 5; j++) for (let i = -4; i <= 4; i++) if ((i / 4.2) ** 2 + (j / 5.2) ** 2 < 1) pset(gx + i, gy + j, i > 1 || j > 2 ? TONO[1] : TONO[0]);
  pset(gx - 2, gy - 3, TONO[2]); pset(gx - 2, gy - 2, TONO[2]); pset(gx - 1, gy - 3, TONO[2]); pset(gx, gy + 6, TONO[1]); pset(gx - 1, gy + 7, TONO[1]); pset(gx + 1, gy + 7, TONO[1]);
}

// el fondo fijo de la oficina del rival
function c_rivalFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = hex('#14101a');
  // el techo de placas, claro y tranquilo, con sus perfiles
  rect(0, 0, 319, 15, hex('#d4d8e0')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 15, hex('#c0c6d0')); for (const y of [7, 15]) rect(0, y, 319, y, hex('#c0c6d0'));
  for (let y = 0; y < 15; y++) for (let x = 0; x < 320; x++) if (h(x, y, 303) < 0.05) pset(x, y, hex('#c8ccd6'));
  // la pared de paneles de tela con sus costuras y la trama del tejido
  rect(0, 16, 319, 107, hex('#b8c4d4'));
  for (let y = 16; y < 108; y++) for (let x = 0; x < 320; x++) { if (((x + y) & 3) === 0 && h(x, y, 304) < 0.5) pset(x, y, hex('#aebacb')); else if (h(x, y, 305) < 0.03) pset(x, y, hex('#c8d2e0')); }
  for (let x = 0; x < 320; x += 32) { rect(x, 16, x, 107, hex('#98a4b6')); rect(x + 1, 16, x + 1, 107, hex('#ccd6e4')); }
  rect(0, 16, 319, 17, hex('#8a96a8'));
  // las serpentinas en guirnalda colgadas del techo
  for (let s = 0; s < 6; s++) { const x0 = s * 54 - 6, c = s % 2 ? hex('#c8ccd8') : hex('#2e6ad8'), cs = s % 2 ? hex('#8a90a0') : hex('#1e4aa8');
    for (let i = 0; i <= 54; i++) { const y = 17 + Math.round(Math.sin(i / 54 * Math.PI) * 9); if (x0 + i > 276 && y < 46) continue; pset(x0 + i, y, c); pset(x0 + i, y + 1, (i >> 1) % 2 ? cs : c); } }
  // la ventana: marco de aluminio, el cielo y el jardín de la sede
  rect(15, 25, 113, 85, hex('#8a929e')); rect(16, 26, 112, 84, hex('#c8ccd4'));
  const CIELO = ['#7aa6e0', '#8ab4e8', '#9cc2ee', '#b0d0f2'].map(hex);
  for (let y = 37; y <= 64; y++) for (let x = 18; x <= 110; x++) { const u = (y - 37) / 27 * 3, i = Math.floor(u); pset(x, y, CIELO[Math.min(3, i + (u - i > c_b4(x, y) ? 1 : 0))]); }
  for (let x = 18; x <= 110; x++) { const top = 58 + Math.round(Math.sin(x * 0.07) * 3); for (let y = top; y <= 64; y++) pset(x, y, hex('#6a9a7a')); }
  rect(18, 65, 110, 82, hex('#5aa04a')); for (let y = 65; y <= 82; y++) for (let x = 18; x <= 110; x++) if (h(x, y, 306) < 0.25) pset(x, y, (y & 1) ? hex('#4a8a3e') : hex('#6ab05a'));
  for (let y = 76; y <= 80; y++) rect(18, y, 110, y, y === 76 || y === 80 ? hex('#8a8a8a') : hex('#6a6a70'));
  for (let x = 18; x <= 110; x += 6) pset(x, 78, hex('#e8e0a0'));
  for (let i = -8; i <= 8; i++) { const yy = Math.round(Math.sqrt(Math.max(0, 1 - (i / 8) ** 2)) * 2); for (let j = -yy; j <= yy; j++) pset(80 + i, 74 + j, j === -yy ? hex('#a8d0f0') : hex('#5a90c8')); }
  rect(52, 64, 54, 74, hex('#c84a2a')); rect(48, 64, 58, 66, hex('#c84a2a')); rect(48, 64, 50, 70, hex('#a83a1e'));
  rect(16, 59, 112, 60, hex('#d8dce4')); rect(63, 37, 65, 84, hex('#d8dce4')); rect(65, 37, 65, 84, hex('#9aa0aa'));
  rect(13, 85, 115, 88, hex('#e4e8ee')); rect(13, 88, 115, 88, hex('#9aa0aa'));
  // una planta grande en su maceta junto a la ventana
  rect(118, 92, 128, 106, K); rect(119, 93, 127, 106, hex('#c8a070')); rect(119, 93, 127, 94, hex('#e0bc88')); for (let y = 96; y < 106; y += 3) rect(119, y, 127, y, hex('#a88050'));
  for (let a = 0; a < 9; a++) { const g = -Math.PI / 2 + (a - 4) * 0.33, L = 14 + (a % 3) * 5; for (let i = 0; i < L; i++) { const x = Math.round(123 + Math.cos(g) * i), y = Math.round(92 + Math.sin(g) * i + (i * i) / 40); pset(x, y, a % 2 ? hex('#3a7a4a') : hex('#5aa86a')); pset(x + 1, y, hex('#2e5a3a')); } }
  // el periódico clavado: la cabecera es una barra negra y la página entera son rayas, sin letras
  rect(129, 31, 167, 81, hex('#7a8494')); rect(128, 30, 166, 80, K); rect(129, 31, 165, 79, hex('#ece6d6'));
  rect(131, 33, 163, 37, hex('#2a2a32')); rect(131, 38, 163, 38, hex('#8a8478')); rect(131, 40, 163, 40, hex('#8a8478'));
  rect(133, 43, 161, 46, hex('#3a3a44')); rect(137, 48, 157, 50, hex('#3a3a44'));
  for (let y = 53; y < 78; y += 2) { rect(132, y, 146, y, hex('#a8a294')); rect(150, y, 163, y, h(y, 1, 307) < 0.2 ? hex('#ece6d6') : hex('#a8a294')); }
  rect(148, 53, 148, 77, hex('#c8c0b0'));
  for (const [x, y, c] of [[130, 32, '#c83a3a'], [164, 32, '#2e6ad8'], [130, 78, '#2e6ad8']]) { disco(x, y, 1, hex(c)); pset(x - 1, y - 1, hex('#ffffff')); }
  // la pizarra con las barras azules que suben y la cifra 85
  rect(175, 27, 227, 67, K); rect(176, 28, 226, 66, hex('#f4f6f8')); rect(176, 66, 226, 67, hex('#9aa0aa'));
  for (let k = 0; k < 5; k++) { const bh = 6 + k * 6; rect(182 + k * 8, 62 - bh, 186 + k * 8, 62, hex('#2e5aa8')); rect(182 + k * 8, 62 - bh, 182 + k * 8, 62, hex('#5a82c8')); }
  linea(180, 62, 222, 62, hex('#3a3a44')); linea(180, 30, 180, 62, hex('#3a3a44')); linea(184, 52, 220, 32, hex('#c8382e')); poligono([[220, 30], [222, 34], [217, 33]], hex('#c8382e'));
  R.numero('85', 206, 46, { color: hex('#2e5aa8'), sombra: false });
  rect(190, 67, 214, 69, hex('#c8ccd4')); rect(196, 68, 200, 68, hex('#2e6ad8')); rect(204, 68, 207, 68, hex('#c83a3a'));
  // el reloj de pared
  disco(246, 34, 7, K); disco(246, 34, 6, hex('#f4f4f0')); disco(246, 34, 6, K); disco(246, 34, 5, hex('#f8f8f4')); for (let a = 0; a < 12; a++) pset(Math.round(246 + Math.cos(a * Math.PI / 6) * 4), Math.round(34 + Math.sin(a * Math.PI / 6) * 4), hex('#6a6a74'));
  linea(246, 34, 246, 30, K); linea(246, 34, 249, 35, K);
  // la fuente de agua en su rincón, con el bidón azulado
  rect(262, 86, 280, 107, K); rect(263, 87, 279, 107, hex('#e4e4e0')); rect(263, 87, 264, 107, hex('#ffffff')); rect(276, 87, 279, 107, hex('#c4c4c0')); rect(266, 92, 269, 95, hex('#3a3a44')); pset(267, 93, hex('#3a6ad8'));
  for (let y = 66; y <= 86; y++) { const w = y < 70 ? 4 : 8; rect(271 - w, y, 271 + w, y, hex('#9ac8e8')); pset(271 - w, y, hex('#d8eef8')); pset(271 + w, y, hex('#6aa0c8')); } rect(267, 68, 275, 68, hex('#6aa0c8'));
  // la pared lateral derecha en perspectiva, con el marco de la puerta y el pasillo iluminado
  poligono([[276, 16], [319, 0], [319, 179], [276, 108]], hex('#a8b4c6'));
  for (let y = 0; y < 180; y++) for (let x = 277; x < 320; x++) if (((x + y) & 3) === 0 && h(x, y, 308) < 0.4) pset(x, y, hex('#9aa6b8'));
  linea(276, 16, 276, 108, hex('#8a96a8')); linea(276, 16, 319, 0, hex('#8a96a8'));
  poligono([[288, 64], [305, 62], [305, 160], [288, 128]], hex('#f4ecd0'));
  for (let y = 62; y < 160; y++) for (let x = 288; x <= 305; x++) if (y > 118 + (x - 288) * 1.9 && ((x + y) & 1)) pset(x, y, hex('#c8c0a8'));
  rect(293, 70, 299, 73, hex('#2e8a4a')); pset(295, 71, hex('#ffffff')); pset(296, 72, hex('#ffffff')); pset(294, 72, hex('#ffffff')); pset(297, 71, hex('#ffffff'));
  linea(286, 63, 286, 129, K); linea(287, 63, 287, 129, hex('#e8ecf0')); linea(287, 63, 306, 60, hex('#e8ecf0')); linea(286, 62, 306, 59, K);
  // el zócalo y la moqueta azul gris con su trama, el pasillo más gastado, confeti y serpentinas por el suelo
  rect(0, 104, 276, 107, hex('#5a6478')); rect(0, 104, 276, 104, hex('#7a8498'));
  for (let y = 108; y < 180; y++) { const f = (y - 108) / 72; for (let x = 0; x < 320; x++) { if (x > 276 && y < 108 + (x - 276) * 1.67) continue; const b = c_b4(x, y), c = b < 0.25 ? hex('#4e5c78') : b > 0.85 ? hex('#6a7894') : hex('#5c6a86'); pset(x, y, f > 0.5 && Math.abs(x - 170) < 30 + f * 30 && ((x + y) & 1) ? hex('#66748e') : c); } }
  for (let x = 277; x < 320; x++) { const y = Math.round(108 + (x - 276) * 1.67); if (y < 180) pset(x, y, hex('#7a8498')); }
  const COLS = ['#3a6ad8', '#ffffff', '#a8c8ff', '#c8ccd8', '#2e4aa8', '#f0d860'].map(hex);
  for (let k = 0; k < 140; k++) { const x = Math.floor(h(k, 1, 309) * 300), y = 110 + Math.floor(h(k, 2, 309) * 70); pset(x, y, COLS[k % 6]); if (k % 4 === 0) pset(x + 1, y, COLS[k % 6]); }
  for (const [x0, y0, c] of [[120, 166, '#2e6ad8'], [210, 140, '#c8ccd8']]) for (let i = 0; i < 24; i++) pset(x0 + i, y0 + Math.round(Math.sin(i * 0.6) * 2), hex(c));
  // las mesas del fondo, con los ordenadores beige, el teclado, los papeles, el teléfono, la taza y el tarjetero
  for (const [x0, x1, mx] of [[20, 96, 40], [176, 252, 214]]) { rect(x0, 98, x1, 102, K); rect(x0 + 1, 99, x1 - 1, 100, hex('#a87a50')); rect(x0 + 1, 99, x1 - 1, 99, hex('#c8986a')); rect(x0 + 1, 101, x1 - 1, 101, hex('#6a4a34'));
    rect(x0 + 2, 102, x0 + 26, 118, K); rect(x0 + 3, 103, x0 + 25, 117, hex('#8a5e3a')); for (const y of [108, 113]) { rect(x0 + 3, y, x0 + 25, y, hex('#5a3c28')); rect(x0 + 12, y - 3, x0 + 16, y - 3, hex('#c8a040')); }
    rect(x1 - 3, 102, x1 - 1, 118, K);
    rect(mx - 10, 70, mx + 10, 89, K); rect(mx - 9, 71, mx + 9, 88, hex('#d8ccb0')); rect(mx - 9, 71, mx + 9, 71, hex('#ece4cc')); rect(mx - 8, 73, mx + 7, 84, hex('#1a2a1e')); rect(mx - 8, 73, mx + 7, 73, hex('#2a3a2e')); rect(mx + 5, 86, mx + 7, 86, hex('#a89c80'));
    rect(mx - 6, 89, mx + 6, 93, K); rect(mx - 5, 90, mx + 5, 93, hex('#c4b89a')); rect(mx - 12, 94, mx + 12, 97, K); rect(mx - 11, 95, mx + 11, 96, hex('#d8ccb0')); for (let x = mx - 10; x <= mx + 10; x += 2) pset(x, 95, hex('#a89c80'));
    rect(mx + 16, 91, mx + 26, 97, hex('#f4f0e4')); rect(mx + 17, 89, mx + 27, 95, hex('#ffffff')); for (let y = 90; y < 95; y += 2) rect(mx + 18, y, mx + 25, y, hex('#a8a8b8')); }
  rect(90, 92, 94, 97, K); rect(91, 93, 93, 97, hex('#c83a3a')); rect(86, 93, 89, 97, hex('#2a2a32')); for (let i = 0; i < 5; i++) pset(84 + i, 91 + (i % 2), hex('#2a2a32'));
  rect(68, 92, 74, 97, K); rect(69, 93, 73, 96, hex('#d8d4c8')); pset(71, 92, hex('#8a8a8a'));
  rect(236, 93, 240, 97, K); rect(237, 94, 239, 97, hex('#f4f4f0')); pset(241, 95, K);
  rect(180, 93, 190, 97, K); rect(181, 94, 189, 96, hex('#d8ccb0')); disco(185, 93, 2, hex('#3a3a44'));
  for (let x = 20; x < 260; x++) if ((x & 1) && (x < 97 || x > 175)) pset(x, 119, hex('#3e4a62'));
}

// LA TELE DE 1985 en el salón. Devuelve { suelo: 156, tele: [202, 88, 252, 124] (la pantalla), sofa: [20, 118],
// mesita: [120, 178, 150] (va en anuncioDelante), libre: [180, 300] (el hueco para plantarse delante de la tele) }
function c_tele(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, K = hex('#14101a');
  c_capa(R, 'nc_tele', () => c_teleFondo(R));
  // la calle por la ventana: nubes, el árbol que se mece y un coche que pasa
  R.recorte([20, 30, 68, 86]);
  const NUBE = [hex('#ffffff'), hex('#e4eef8'), hex('#bccde2')];
  for (let k = 0; k < 3; k++) c_nube(R, ((h(k, 1, 310) * 80 + t * (1.5 + k)) % 80) + 4, 36 + k * 5, 10 + k * 3, NUBE);
  { const m = Math.round(Math.sin(t * 1.2) * 1.5); for (let a = 0; a < 8; a++) disco(56 + m + Math.round(Math.cos(a * 0.8) * 7), 52 + Math.round(Math.sin(a * 0.8) * 6), 5, hex('#2e6a3a')); for (let a = 0; a < 5; a++) disco(54 + m + Math.round(Math.cos(a * 1.2) * 4), 49 + Math.round(Math.sin(a * 1.2) * 3), 3, hex('#4a8a4a')); rect(55, 58, 57, 76, hex('#5a3a24')); pset(52 + m, 45, hex('#8ac07a')); }
  { const x = ((t * 18) % 110) - 30; rect(Math.round(x), 74, Math.round(x + 15), 78, hex('#b8a060')); rect(Math.round(x + 3), 71, Math.round(x + 11), 74, hex('#9a8448')); rect(Math.round(x + 4), 72, Math.round(x + 10), 73, hex('#a8c8e8')); disco(Math.round(x + 3), 79, 1, K); disco(Math.round(x + 12), 79, 1, K); }
  R.recorte(null);
  // la pantalla: telenovela o aviso de urgencia
  const S = [202, 88, 252, 124], u = Math.max(0, Math.min(1, o.urgente ?? 0));
  R.recorte(S);
  const barre = u > 0 ? Math.min(1, u / 0.3) : 0, xb = Math.round(S[0] + (S[2] - S[0] + 8) * barre);
  if (barre < 1) c_telenovela(R, t, S);
  if (u > 0) { // la franja roja que barre y el aviso: fondo azul oscuro con rayas que corren, el triángulo con «!» que late y la lata
    for (let y = S[1]; y <= S[3]; y++) for (let x = S[0]; x <= Math.min(S[2], xb); x++) pset(x, y, barre < 1 && x > xb - 6 ? hex('#e83a2e') : ((x + y + Math.floor(t * 12)) % 10 < 1 ? hex('#1e2e6a') : hex('#14205a')));
    if (barre >= 1) { const late = Math.floor(t * 3) % 2;
      for (let y = 117; y <= 124; y++) for (let x = 202; x <= 252; x++) pset(x, y, ((x - Math.floor(t * 20)) & 7) < 4 ? hex('#e83a2e') : hex('#a81e1a'));
      poligono([[213, 113], [227, 113], [220, 98]], late ? hex('#ffd83a') : hex('#e8a82a')); poligono([[215, 112], [225, 112], [220, 102]], hex('#e83a2e'));
      R.icono('!', 218, 104, hex('#ffffff'), hex('#7a1410'));
      PIEZAS_NC.lata?.(R, 239, 114, { color: 'rojo' });
      if (late) { for (const [x, y] of [[210, 100], [231, 99], [248, 112]]) { pset(x, y, hex('#fff4c0')); pset(x + 1, y, hex('#fff4c0')); } } }
  }
  // las líneas de barrido y el brillo curvo del cristal
  for (let y = S[1]; y <= S[3]; y += 2) for (let x = S[0]; x <= S[2]; x++) { const p = R.pget(x, y); pset(x, y, c_mez(p, K, 0.18)); }
  for (let j = 0; j < 8; j++) pset(206 + j, 92 + Math.round(j * 0.2), hex('#ffffff')); pset(205, 93, hex('#d8e4f0')); pset(205, 94, hex('#d8e4f0'));
  R.recorte(null);
  // la luz de la tele en el cuarto (azulada; roja cuando avisa)
  const luz = u > 0.3 ? (Math.floor(t * 3) % 2 ? hex('#ff6a5a') : hex('#8aa0ff')) : hex('#a8c0ff');
  c_charco(R, 228, 162, 60, 10, luz, 0.18 + Math.sin(t * 7) * 0.04);
  // el piloto rojo del aparato y la aguja del dial
  pset(262, 120, Math.floor(t * 1.2) % 2 ? hex('#ff4a3a') : hex('#8a2018'));
  return { suelo: 156, tele: [202, 88, 252, 124], sofa: [20, 118], mesita: [120, 178, 150], libre: [180, 300] };
}

// la telenovela dentro de la pantalla S: un salón rosa con cortina y una lámpara; él y ella discuten (ella se da la
// vuelta, él levanta los brazos) y cada 2,5 s cambia el plano (los dos, más cerca de ella, más cerca de él)
function c_telenovela(R, t, S) {
  const { pset, disco } = R, [x0, y0, x1, y1] = S, pl = Math.floor(t / 2.5) % 3, z = pl === 0 ? 1 : 1.6, cx = pl === 1 ? 214 : pl === 2 ? 240 : 227;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y > y1 - 8 ? hex('#8a5a4a') : ((x >> 2) & 1) ? hex('#d8a0a8') : hex('#c8909a'));
  for (let y = y0; y <= y1 - 9; y++) for (let x = x0 + 2; x <= x0 + 8; x++) pset(x, y, (x & 1) ? hex('#a83a4a') : hex('#8a2a3a'));
  disco(x1 - 6, y0 + 8, 3, hex('#fff0b0')); pset(x1 - 6, y0 + 12, hex('#6a4a2a'));
  const fig = (fx, ropa, pelo, gesto, giro) => { const X = (dx) => Math.round(cx + (fx - cx) * z + dx * z), Y = (dy) => Math.round(y1 - 6 + dy * z);
    for (let j = -14; j <= 0; j++) for (let i = -2; i <= 2; i++) { const yy = j; let c = null; if (yy <= -10) c = yy <= -13 || (giro && i > -2) ? pelo : hex('#e8c09a'); else if (yy <= -3) c = ropa; else if (Math.abs(i) >= 1) c = hex('#2a2a34');
      if (c) for (let a = 0; a < z; a++) for (let b = 0; b < z; b++) pset(X(i) + a, Y(yy) + b, c); }
    if (gesto) for (let k = 0; k < 4; k++) pset(X(3 + k * 0.5), Y(-9 - k), hex('#e8c09a')); };
  const discute = Math.floor(t * 2) % 2;
  fig(220, hex('#a83a6a'), hex('#4a2a1a'), false, Math.floor(t / 1.6) % 2 === 1);
  fig(236, hex('#2a3a5a'), hex('#1a1414'), discute === 1, false);
}

// el fondo fijo del salón de 1985
function c_teleFondo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = hex('#14101a');
  // el papel pintado de rayas con un ramito tenue (más liso arriba a la derecha, en la esquina de Atom)
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const r = (x % 12) < 6; let c = r ? hex('#e8d8b0') : hex('#dccaa0'); if (x % 12 === 6) c = hex('#c8b488'); if (!(x > 270 && y < 50) && r && (y % 16) === (x % 24 < 12 ? 4 : 12) && (x % 6) === 2) c = hex('#b8846a'); pset(x, y, c); }
  rect(0, 0, 319, 2, hex('#c8b488')); rect(0, 3, 319, 3, hex('#f0e4c8'));
  // el zócalo de madera con sus tablas, la moldura y las vetas
  rect(0, 100, 319, 131, hex('#7a5232')); rect(0, 100, 319, 102, hex('#a87a50')); rect(0, 103, 319, 103, hex('#4a2e1a'));
  for (let x = 0; x < 320; x += 10) { rect(x, 104, x, 131, hex('#5a3a22')); rect(x + 1, 104, x + 1, 131, hex('#8a6040')); }
  for (let k = 0; k < 80; k++) { const x = Math.floor(h(k, 1, 311) * 320), y = 105 + Math.floor(h(k, 2, 311) * 25); rect(x, y, x, y + 3 + (k % 4), k % 2 ? hex('#6a4428') : hex('#8a6040')); }
  // la ventana con visillos y cortinas naranjas, y la calle de enfrente
  rect(17, 27, 71, 89, K); rect(18, 28, 70, 88, hex('#f0ece0'));
  const CIELO = ['#8ab4e8', '#9cc2ee', '#b0d0f2', '#c4dcf4'].map(hex);
  for (let y = 30; y <= 60; y++) for (let x = 20; x <= 68; x++) { const u = (y - 30) / 30 * 3, i = Math.floor(u); pset(x, y, CIELO[Math.min(3, i + (u - i > c_b4(x, y) ? 1 : 0))]); }
  for (const [hx, hw, c, tj] of [[22, 16, '#e8e0d0', '#7a3a2a'], [40, 14, '#c8d8e0', '#4a4a5a']]) { rect(hx, 54, hx + hw, 70, hex(c)); poligono([[hx - 2, 54], [hx + hw + 2, 54], [hx + hw / 2, 46]], hex(tj)); rect(hx + 3, 58, hx + 6, 62, hex('#6a8ab0')); rect(hx + hw - 6, 58, hx + hw - 3, 62, hex('#6a8ab0')); rect(hx + 7, 63, hx + 9, 70, hex('#5a3a2a')); }
  rect(20, 70, 68, 72, hex('#5aa04a')); rect(20, 73, 68, 80, hex('#6a6a70')); for (let x = 20; x <= 68; x += 5) pset(x, 76, hex('#e8e0a0')); rect(20, 81, 68, 86, hex('#9a9a9a'));
  rect(43, 29, 45, 87, hex('#f0ece0')); rect(19, 57, 69, 58, hex('#f0ece0'));
  for (let y = 30; y < 88; y++) for (let x = 20; x < 69; x++) if (((x + (y >> 1)) % 5) === 0 && y < 46) pset(x, y, hex('#f4f0e8'));
  for (const [x0, x1] of [[8, 24], [64, 80]]) { for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0) * 0.9), c = f > 0.5 ? hex('#e8904a') : f > -0.3 ? hex('#c8702e') : hex('#9a5020'); rect(x, 24, x, 94, c); } rect(x0, 94, x1, 95, hex('#9a5020')); }
  rect(4, 22, 84, 24, hex('#6a4428')); disco(4, 23, 2, hex('#a87a50')); disco(84, 23, 2, hex('#a87a50'));
  rect(14, 90, 74, 92, hex('#e8e0d0')); rect(14, 93, 74, 93, hex('#a89c80'));
  // el cuadro del paisaje
  rect(96, 26, 132, 52, K); rect(97, 27, 131, 51, hex('#c8a040')); rect(99, 29, 129, 49, hex('#9cc2ee')); rect(99, 40, 129, 49, hex('#6a9a5a')); poligono([[99, 42], [112, 32], [124, 42]], hex('#7a8aa8')); poligono([[108, 35], [112, 32], [116, 35]], hex('#ffffff')); disco(124, 33, 2, hex('#fff0a0'));
  rect(97, 51, 131, 51, hex('#8a6a24'));
  // la lámpara de pie con su pantalla plisada
  rect(147, 54, 149, 128, K); rect(148, 54, 148, 128, hex('#c8a040')); rect(142, 127, 154, 130, K); rect(143, 128, 153, 129, hex('#c8a040'));
  poligono([[138, 52], [158, 52], [154, 36], [142, 36]], hex('#f0d8a0')); for (let x = 140; x < 158; x += 3) linea(x, 52, Math.round(142 + (x - 138) * 0.6), 36, hex('#d8b878')); linea(138, 52, 158, 52, hex('#c89a50'));
  for (let y = 53; y < 70; y++) for (let x = 134; x < 162; x++) if (c_b4(x, y) < 0.25 - (y - 53) / 80) { const p = R.pget(x, y); pset(x, y, c_mez(p, hex('#fff4d0'), 0.4)); }
  // el suelo: moqueta de pelo largo y la alfombra con su cenefa
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const b = c_b4(x, y), r = h(x >> 1, y, 312); pset(x, y, r < 0.2 ? hex('#8a6a4a') : b < 0.5 ? hex('#7a5a3c') : hex('#6e5034')); }
  for (let y = 146; y < 176; y++) for (let x = 40; x < 280; x++) { const bd = y < 149 || y > 172 || x < 44 || x > 275; const d = Math.abs(((x - 40) % 16) - 8) + Math.abs(((y - 146) % 10) - 5);
    pset(x, y, bd ? ((x + y) & 1 ? hex('#3a4a6a') : hex('#2e3a58')) : d < 3 ? hex('#a8503a') : ((x + y) & 3) === 0 ? hex('#7a3a2a') : hex('#8a4432')); }
  // el sofá de pana con cojines, la costura y la manta de ganchillo
  rect(18, 104, 122, 130, K); rect(19, 105, 121, 120, hex('#8a6a3a')); for (let x = 20; x < 121; x += 3) rect(x, 106, x, 119, hex('#7a5a2e'));
  for (const x of [22, 56, 90]) { rect(x, 107, x + 30, 119, hex('#9a7a44')); rect(x, 107, x + 30, 108, hex('#b8945a')); pset(x + 15, 113, hex('#5a4422')); }
  rect(12, 112, 24, 140, K); rect(13, 113, 23, 139, hex('#7a5a2e')); rect(13, 113, 23, 115, hex('#a8844e')); rect(116, 112, 128, 140, K); rect(117, 113, 127, 139, hex('#7a5a2e')); rect(117, 113, 127, 115, hex('#a8844e'));
  rect(24, 120, 116, 128, hex('#a8844e')); rect(24, 120, 116, 120, hex('#c8a46a')); rect(70, 121, 70, 128, hex('#7a5a2e'));
  rect(24, 129, 116, 140, hex('#7a5a2e')); for (let x = 26; x < 116; x += 3) rect(x, 130, x, 139, hex('#6a4a24'));
  for (const x of [16, 120]) rect(x, 141, x + 4, 144, K);
  for (let y = 106; y < 132; y++) for (let x = 90; x < 112; x++) if (((x + y) & 3) === 0 || ((x - y) & 3) === 0) pset(x, y, (x >> 2) % 3 === 0 ? hex('#e8c848') : (x >> 2) % 3 === 1 ? hex('#d86a3a') : hex('#4a8a6a'));
  for (let x = 90; x < 112; x += 3) pset(x, 132, hex('#e8c848'));
  rect(26, 108, 40, 118, K); rect(27, 109, 39, 117, hex('#c8503a')); rect(27, 109, 39, 110, hex('#e0704a')); pset(33, 113, hex('#8a2e1e'));
  // el mueble de la tele: madera con vetas, la pantalla abombada, la rejilla del altavoz, los mandos y las patas
  rect(190, 80, 276, 138, K); rect(191, 81, 275, 137, hex('#6a4428')); rect(191, 81, 275, 82, hex('#9a6a40')); rect(191, 134, 275, 137, hex('#4a2e1a'));
  for (let k = 0; k < 30; k++) { const x = 192 + Math.floor(h(k, 1, 313) * 82), y = 84 + Math.floor(h(k, 2, 313) * 50); rect(x, y, x + 4 + (k % 5), y, hex('#5a3820')); }
  rect(198, 85, 256, 127, K); rect(199, 86, 255, 126, hex('#3a3a44')); rect(200, 87, 254, 125, hex('#2a2a32'));
  rect(259, 88, 272, 112, K); rect(260, 89, 271, 111, hex('#8a7a5a')); for (let y = 90; y < 111; y += 2) rect(260, y, 271, y, hex('#5a4a34'));
  for (const [y, c] of [[116, '#c8c0b0'], [124, '#c8c0b0']]) { disco(266, y, 3, K); disco(266, y, 2, hex(c)); pset(265, y - 1, hex('#ffffff')); }
  for (const x of [196, 270]) { rect(x - 2, 138, x + 2, 148, K); rect(x - 1, 138, x + 1, 147, hex('#4a2e1a')); }
  for (let x = 190; x <= 276; x++) if ((x & 1) === 0) pset(x, 149, hex('#4a3420'));
  // la antena de cuernos con sus bolitas y un tapete de ganchillo con un jarrón
  rect(222, 76, 236, 80, K); rect(223, 77, 235, 79, hex('#3a3a44')); linea(226, 76, 214, 56, hex('#c8ccd8')); linea(232, 76, 246, 54, hex('#c8ccd8')); disco(214, 56, 1, hex('#c8ccd8')); disco(246, 54, 1, hex('#c8ccd8'));
  for (let x = 244; x < 272; x++) pset(x, 79 + ((x & 1) ? 1 : 0), hex('#f4f0e4')); rect(254, 66, 262, 79, K); rect(255, 67, 261, 78, hex('#4a8ab0')); rect(255, 67, 256, 78, hex('#8ac0e0'));
  for (const [x, y] of [[255, 62], [259, 60], [262, 63]]) { disco(x, y, 2, hex('#e8604a')); pset(x, y, hex('#ffd860')); } linea(258, 66, 256, 63, hex('#3a7a4a')); linea(259, 66, 259, 61, hex('#3a7a4a'));
}

// lo de delante en la rueda de prensa general: el atril con micrófonos, la primera fila del foso, las cámaras de tele y
// el destello de los flashes sobre el foso y la mesa
function c_prensaDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = hex('#14101a'), dens = o.flashes ?? 0.6;
  // el atril: madera con su moldura, una placa dorada lisa y el ramillete de micrófonos a los lados de la cara
  rect(237, 111, 263, 124, K); rect(238, 112, 262, 124, hex('#5a3a28')); rect(238, 112, 239, 124, hex('#8a6040')); rect(238, 121, 262, 124, hex('#3a2418'));
  rect(235, 109, 265, 112, K); rect(236, 110, 264, 111, hex('#8a6040')); rect(236, 110, 264, 110, hex('#b08458'));
  rect(245, 114, 255, 119, hex('#8a6a24')); rect(246, 115, 254, 118, hex('#c8a040')); rect(246, 115, 254, 115, hex('#f0d070'));
  for (const [x, dx, c] of [[238, -1, '#3a3a46'], [241, -2, '#4a5a8a'], [259, 2, '#8a3a3a'], [262, 1, '#3a3a46']]) { linea(x, 109, x + dx, 103, K); disco(x + dx, 102, 1, hex(c)); pset(x + dx, 101, hex('#8a8a9a')); rect(x + dx - 1, 104, x + dx + 1, 105, hex(c === '#3a3a46' ? '#e8e4dc' : '#2e6ad8')); }
  // las dos cámaras de tele en sus trípodes, con el piloto rojo
  for (const [x, d] of [[18, 1], [302, -1]]) { linea(x, 150, x - 10, 179, K); linea(x, 150, x + 10, 179, K); linea(x, 150, x, 179, K);
    rect(x - 12, 132, x + 12, 150, K); rect(x - 11, 133, x + 11, 149, hex('#3a3e48')); rect(x - 11, 133, x + 11, 133, hex('#5e626e')); for (let y = 137; y < 147; y += 2) rect(x - 8 * d - (d < 0 ? 0 : 0), y, x - 2 * d, y, hex('#2a2e36'));
    rect(x + (d > 0 ? 11 : -19), 136, x + (d > 0 ? 19 : -11), 146, K); rect(x + (d > 0 ? 12 : -18), 137, x + (d > 0 ? 18 : -12), 145, hex('#22242c')); disco(x + 18 * d, 141, 3, hex('#2a3a5a')); pset(x + 17 * d, 140, hex('#8ab0e0'));
    rect(x - 4, 128, x + 4, 132, K); pset(x, 130, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#6a1a1a')); linea(x - 12 * d, 140, x - 22 * d, 146, K); }
  // la primera fila del foso, de espaldas, con cámaras alzadas y libretas
  const PELOS = [['#3a2a20', '#241810'], ['#c8a060', '#8a6a3a'], ['#1e1a24', '#100c14'], ['#6a4a2a', '#4a321a'], ['#9a9aa8', '#6a6a78']].map(([a, b]) => [hex(a), hex(b)]);
  const ROPA = ['#4a4a5a', '#7a5a3a', '#3a5a7a', '#6a3a3a', '#5a6a4a'].map(hex), PIELES = [hex('#e8c09a'), hex('#8a5a3a'), hex('#f0c8a0'), hex('#c8885a')];
  for (let k = 0; k < 9; k++) { const x = 48 + k * 28, y = 177, ropa = ROPA[k % 5];
    rect(x - 12, y + 5, x + 12, 179, K); rect(x - 11, y + 6, x + 11, 179, ropa); rect(x - 11, y + 6, x + 11, y + 6, c_mez(ropa, hex('#ffffff'), 0.25)); rect(x, y + 7, x, 179, c_mez(ropa, K, 0.3));
    c_cabeza(R, x, y, (k * 3 + 1) % 5, PELOS[k % 5], PIELES[k % 4], hex('#f8dca8'));
    const f = c_disparo(t, k + 20, dens);
    if (k % 2 === 0 && (f > 0 || Math.sin(t * 0.7 + k * 1.9) > 0.2)) { const cy = y - 12; rect(x - 7, cy - 4, x + 7, cy + 4, K); rect(x - 6, cy - 3, x + 6, cy + 3, hex('#2e2e38')); rect(x - 6, cy - 3, x + 6, cy - 3, hex('#6a6a78')); disco(x, cy, 3, K); disco(x, cy, 2, hex('#3a5a8a')); pset(x - 1, cy - 1, hex('#c8e0ff'));
      rect(x + 3, cy - 10, x + 7, cy - 4, K); rect(x + 4, cy - 9, x + 6, cy - 6, f > 0 ? hex('#ffffff') : hex('#d8dce4')); if (f > 0) c_flash(R, x + 5, cy - 9, f); }
  }
  // el destello de un flash grande: solo aclara a los periodistas del foso y la mesa de la tarima (no tiñe la pantalla
  // entera, para no romper el fundido de entrada de cada plano)
  const g = c_disparo(t, 99, dens * 1.4);
  if (g > 0.55) c_destelloLocal(R, g, [[156, 104, 62, 9], [160, 168, 140, 14]]);
}
// lo de delante en la rueda de prensa de cerca: el atril grande con el ramillete de micrófonos y las cámaras de los
// fotógrafos que asoman por abajo
function c_atrilDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = hex('#14101a'), dens = o.flashes ?? 0.6;
  // el ramillete de micrófonos: pies que salen del tablero a los lados de la cara, cabezas de colores y su cubo liso
  const MIC = [[192, 138, '#3a3a46', '#2e6ad8'], [199, 143, '#8a3a3a', '#e8c040'], [202, 134, '#3a3a46', '#3aa860'], [231, 135, '#4a4a56', '#c83a3a'], [234, 143, '#3a3a46', '#ffffff'], [241, 138, '#5a4a7a', '#2e8ab0']];
  for (const [mx, my, c, cubo] of MIC) { const bx = mx < 216 ? 206 : 226; linea(bx, 151, mx, my + 3, K); linea(bx + 1, 151, mx + 1, my + 3, hex('#5a5a68'));
    disco(mx, my, 3, K); disco(mx, my, 2, hex(c)); pset(mx - 1, my - 1, hex('#8a8a9a')); pset(mx + 1, my, hex('#6a6a78'));
    const cx = mx + (mx < 216 ? -1 : 1) * 0, cy = my + 5; rect(cx - 3, cy, cx + 3, cy + 4, K); rect(cx - 2, cy + 1, cx + 2, cy + 3, hex(cubo)); }
  // el atril: el tablero inclinado, la caja de madera con la moldura, la placa lisa y la lamparita de lectura
  rect(184, 150, 248, 155, K); rect(185, 151, 247, 154, hex('#8a6040')); rect(185, 151, 247, 151, hex('#b08458'));
  rect(188, 155, 244, 179, K); rect(189, 156, 243, 179, hex('#5a3a28')); rect(189, 156, 191, 179, hex('#8a6040')); rect(241, 156, 243, 179, hex('#3a2418'));
  for (let k = 0; k < 18; k++) { const x = 192 + Math.floor(h(k, 1, 314) * 48), y = 154 + Math.floor(h(k, 2, 314) * 24); rect(x, y, x, y + 3 + (k % 4), hex('#4a2e1e')); }
  rect(198, 160, 234, 174, hex('#3a2418')); rect(199, 161, 233, 173, hex('#6a4a34')); rect(207, 164, 225, 170, hex('#8a6a24')); rect(208, 165, 224, 169, hex('#c8a040')); rect(208, 165, 224, 165, hex('#f0d070'));
  linea(246, 150, 252, 144, K); rect(250, 141, 256, 144, K); rect(251, 142, 255, 143, hex('#3a6a4a')); c_charco(R, 242, 150, 8, 2, hex('#fff4c0'), 0.3);
  // las cámaras de los fotógrafos que asoman por abajo, con su flash
  const PEL = [[hex('#3a2a20'), hex('#241810')], [hex('#c8a060'), hex('#8a6a3a')], [hex('#1e1a24'), hex('#100c14')]];
  for (const [x, k] of [[26, 0], [292, 1], [118, 2]]) { const sube = Math.round((Math.sin(t * 0.8 + k * 2) * 0.5 + 0.5) * 6), y = 166 - sube, f = c_disparo(t, 40 + k, dens);
    rect(x - 13, 178, x + 13, 179, K); c_cabeza(R, x - 1, 180, k, PEL[k], hex('#e8c09a'), hex('#f8dca8'));
    rect(x - 12, y - 6, x + 12, y + 8, K); rect(x - 11, y - 5, x + 11, y + 8, hex('#2e2e38')); rect(x - 11, y - 5, x + 11, y - 5, hex('#6a6a78')); disco(x, y + 2, 5, K); disco(x, y + 2, 4, hex('#3a3a46')); disco(x, y + 2, 2, hex('#3a5a8a')); pset(x - 1, y + 1, hex('#c8e0ff'));
    rect(x + 5, y - 14, x + 11, y - 6, K); rect(x + 6, y - 13, x + 10, y - 9, f > 0 ? hex('#ffffff') : hex('#d8dce4')); if (f > 0) c_flash(R, x + 8, y - 12, f * 1.3); }
  // el destello de un flash grande: solo aclara el atril, la peana y a los fotógrafos de abajo
  const g = c_disparo(t, 98, dens * 1.4);
  if (g > 0.55) c_destelloLocal(R, g, [[216, 162, 40, 18], [84, 120, 44, 8], [160, 172, 150, 9]]);
}
// lo de delante en la oficina del rival: la mesa de delante con su ordenador, la jamba y la pared lateral, y el confeti
// de primer término
function c_rivalDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = hex('#14101a');
  // la mesa de delante: tablero, faldón con cajones, el ordenador beige de espaldas, el teléfono y un montón de papeles
  rect(0, 140, 94, 145, K); rect(0, 141, 93, 143, hex('#a87a50')); rect(0, 141, 93, 141, hex('#c8986a')); rect(0, 144, 93, 144, hex('#6a4a34'));
  rect(0, 145, 90, 179, K); rect(0, 146, 89, 179, hex('#8a5e3a')); for (const y of [152, 164]) { rect(0, y, 89, y, hex('#5a3c28')); rect(40, y + 4, 50, y + 5, hex('#c8a040')); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 315) * 86), y = 143 + Math.floor(h(k, 2, 315) * 34); rect(x, y, x + 4 + (k % 5), y, hex('#7a5232')); }
  rect(0, 116, 26, 140, K); rect(0, 117, 25, 139, hex('#d8ccb0')); rect(0, 117, 25, 118, hex('#ece4cc')); for (let y = 122; y < 136; y += 3) rect(2, y, 22, y, hex('#c4b89a')); rect(23, 117, 25, 139, hex('#b0a488'));
  rect(68, 133, 80, 140, K); rect(69, 134, 79, 139, hex('#c83a3a')); rect(67, 131, 81, 133, K); rect(68, 132, 80, 132, hex('#e05a4a')); for (let i = 0; i < 6; i++) pset(82 + i, 137 + (i % 2), hex('#2a2a32'));
  rect(30, 136, 44, 140, hex('#f4f0e4')); rect(32, 134, 46, 139, hex('#ffffff')); for (let y = 135; y < 139; y++) rect(34, y, 44, y, (y & 1) ? hex('#a8a8b8') : hex('#ffffff'));
  // la jamba y la pared lateral por delante de quien sale
  rect(306, 46, 319, 179, hex('#a8b4c6')); for (let y = 46; y < 180; y++) for (let x = 307; x < 320; x++) if (((x + y) & 3) === 0 && h(x, y, 316) < 0.4) pset(x, y, hex('#9aa6b8'));
  rect(305, 58, 307, 179, hex('#e8ecf0')); rect(304, 58, 304, 179, K); rect(308, 58, 308, 179, hex('#9aa6b8'));
  // el confeti de primer término, más grande y más deprisa
  const COLS = ['#3a6ad8', '#ffffff', '#a8c8ff', '#2e4aa8', '#f0d860'].map(hex);
  for (let k = 0; k < 18; k++) { const y = Math.round(((h(k, 1, 317) * 220 + t * (24 + (k % 4) * 6)) % 220) - 20), x = Math.round(h(k, 2, 317) * 300 + Math.sin(t * 2.5 + k) * 6); if (x > 270 && y < 48) continue;
    const g = Math.floor(t * 10 + k) % 3; rect(x, y, x + (g === 0 ? 2 : 1), y + (g === 1 ? 2 : 1), COLS[k % 5]); }
}

// lo de delante en el salón: la mesita baja de madera con la lata roja, el cuenco de palomitas y el mando
function c_teleDelante(R, t, o) {
  const { rect, pset, disco } = R, K = hex('#14101a');
  rect(120, 149, 178, 154, K); rect(121, 150, 177, 152, hex('#8a5e3a')); rect(121, 150, 177, 150, hex('#b08458')); rect(121, 153, 177, 153, hex('#5a3c28'));
  for (const x of [124, 174]) { rect(x - 2, 154, x + 2, 168, K); rect(x - 1, 154, x + 1, 167, hex('#6a4428')); }
  rect(126, 160, 172, 161, hex('#5a3c28'));
  for (let x = 118; x <= 180; x++) if ((x & 1) === 0) pset(x, 169, hex('#4a3420'));
  PIEZAS_NC.lata?.(R, 135, 150, { color: 'rojo' });
  rect(148, 143, 166, 149, K); rect(149, 144, 165, 148, hex('#e8e4dc')); rect(149, 147, 165, 148, hex('#c8c0b0'));
  for (let k = 0; k < 14; k++) { const x = 150 + Math.floor(h(k, 1, 318) * 15), y = 141 + Math.floor(h(k, 2, 318) * 4); disco(x, y, 1, k % 3 ? hex('#fff4d0') : hex('#e8c860')); }
  rect(168, 147, 176, 149, K); rect(169, 148, 175, 148, hex('#3a3a44')); pset(170, 148, hex('#c83a3a')); pset(173, 148, hex('#8a8a9a'));
}

// la capa fija de un encuadre: se pinta una vez en un búfer de R.nuevo() y luego se copia entera en cada fotograma
const d_CAPAS_RB = new WeakMap();

function d_capaRb(R, clave, dibuja) {
  let m = d_CAPAS_RB.get(R); if (!m) d_CAPAS_RB.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// umbral del tramado ordenado 4 × 4 (0–1) y mezcla de dos colores del lienzo (0xAABBGGRR) en la proporción a
const d_BAYER_RB = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umRb = (x, y) => d_BAYER_RB[((y & 3) << 2) | (x & 3)];

function d_mezRb(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// cifras de 3 × 5 (s: escala): solo dígitos
const d_DIG_RB = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function d_cifrasRb(R, txt, x, y, c, s = 1) { for (const ch of String(txt)) { const g = d_DIG_RB[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); x += 4 * s; } }

// un pictograma de filas ('#' color c, 'o' color c2) a escala s; respeta R.recorte si s = 1
function d_pictoRb(R, filas, x, y, c, c2 = c, s = 1) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const l = f[i]; if (l === '.') continue; const col = l === 'o' ? c2 : c; if (s === 1) R.pset(x + i, y + j, col); else R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, col); } }); }

// los dibujos de las cartas (10 × 8): el dodo, el corazón roto, la lata tachada, el abuelo con su botella, el corazón entero
const d_DIBUJOS_RB = {
  dodo: ['...##.....', '..#o##....', '.###.#....', '..#####...', '.#######..', '..######.#', '...####.#.', '...#..#...'],
  roto: ['.##...##..', '####.####.', '####.####.', '.##.#.##..', '..##.##...', '...#.#....', '....#.....', '..........'],
  lata: ['#.oooo..#.', '.#oooo.#..', '..#oo.#...', '..o##oo...', '..o##oo...', '..#oo.#...', '.#oooo.#..', '#.oooo..#.'],
  abuelo: ['.ooo......', 'o###o.....', '.###...#..', '..#...###.', '#####.###.', '..#...###.', '.#.#..###.', '#...#.###.'],
  corazon: ['.##...##..', '####.####.', '#########.', '.#######..', '..#####...', '...###....', '....#.....', '..........'],
};

const DR = pal({
  techo: '#dcd8cc', techoS: '#b8b4a6', techoJ: '#c8c4b8', tubo: '#fbfbf2', tuboS: '#d8dcd0', tuboM: '#9a9c94',
  pared: '#d6c8a8', paredS: '#c4b494', paredL: '#e2d6ba', zocalo: '#6a4a30',
  moq: '#56667a', moqS: '#46546a', moqL: '#687a8e', moqD: '#3a4658',
  panel: '#7a8aa0', panelS: '#5e6c84', panelL: '#94a2b6', marco: '#b8bcc4',
  formica: '#e0d4b8', formicaS: '#c4b494', formicaL: '#f0e8d4', canto: '#8a6440', cantoS: '#5e4028', frente: '#b09a74', frenteS: '#8a7656',
  archivo: '#9aa2ac', archivoS: '#747c88', archivoL: '#bcc4cc',
  tablero: '#1a1a22', ambar: '#ffa838', ambarS: '#7a4a18', led: '#ff4a3a', verde: '#5ad07a',
  corcho: '#b88a52', corchoS: '#946a3a', corchoL: '#cca06a', papel: '#f6f2e6', papelS: '#d0c8b4', tinta: '#3a3a5a', azulCarta: '#c8dcf0',
  cieloA: '#9ec8e8', cieloAS: '#7eaed8', torre: '#8a96aa', torreS: '#6a7488', torreL: '#b0bac8', persiana: '#ece6d4', persianaS: '#bcb49e',
  piel1: '#f0c098', piel2: '#c88a5a', piel3: '#8a5a3a', pelo1: '#3a2418', pelo2: '#8a5a2a', pelo3: '#c8a050', pelo4: '#1a1418',
  ropa1: '#c86a7a', ropa2: '#5a7ab8', ropa3: '#d8b85a', ropa4: '#6a9a7a', ropa5: '#e8e0d0', ropa6: '#8a5aa0',
  // la calle de Seattle
  cielo0: '#7a8698', cielo1: '#8c97a8', cielo2: '#9da7b6', cielo3: '#afb7c3', cielo4: '#c0c6ce',
  nube0: '#6e7888', nube1: '#8a94a4', nube2: '#a8b0bc', bruma: '#a4adbb', brumaS: '#8a94a4', brumaL: '#b4bcc8',
  ladrillo: '#9a4e3c', ladrilloS: '#7a3a2c', ladrilloL: '#b06650', mortero: '#a89888',
  acera: '#9a9a98', aceraS: '#7e7e7e', aceraL: '#b4b4b0', asfalto: '#383c46', asfaltoS: '#2c3038', asfaltoL: '#4a505c', reflejo: '#6a7488',
  toldo: '#3a7a5a', toldoL: '#e8e0c8', gota: '#c8d4e4', gotaS: '#9aa8bc', gaviota: '#f0f0ec',
  // el sótano
  bloque: '#8e8c86', bloqueS: '#76746e', bloqueL: '#a4a29a', juntaB: '#62605a', humedad: '#6e7064', viga: '#7a5a3a', vigaS: '#5a4028', vigaL: '#9a7650',
  hormigon: '#7a7a76', hormigonS: '#62625e', hormigonL: '#8e8e88', luzB: '#ffe6a0', almendra: '#e8dcc0', almendraS: '#c4b494',
});

// una figurita de fondo (a = 10–16 px de alto): el contorno, la cabeza con el pelo y el ojo, el cuerpo con su sombra y las
// piernas; dir 1 mira a la derecha. o.casco: los cascos con el micro de varilla; o.auricular: el auricular en la oreja;
// o.paraguas: el color del paraguas abierto encima; o.cartel: el cartelito con su pictograma ('lata' | 'roto'); o.paso:
// 0/1 para el paso al andar; o.brazo: el brazo levantado
function d_figuraRb(R, x, suelo, a, ropa, pelo, piel, dir = 1, o = {}) {
  const { pset } = R, rect = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, c); }, k = C.k, hw = a >= 14 ? 5 : 4, y0 = suelo - a, bw = hw + 1, xb = x - (bw >> 1), xh = x - (hw >> 1);
  const yb = y0 + hw, yl = suelo - Math.max(2, Math.round(a * 0.22));
  if (o.paraguas != null) { const ux = x, uy = y0 - 3; rect(ux, uy, ux, y0, k); for (let i = -6; i <= 6; i++) { const yy = uy - 3 + Math.round(Math.abs(i) * 0.45); rect(ux + i, yy, ux + i, uy - 1 + (Math.abs(i) > 4 ? 1 : 0), Math.abs(i) === 6 ? k : i % 3 === 0 ? d_mezRb(o.paraguas, k, 0.3) : o.paraguas); pset(ux + i, yy - 1, k); } }
  rect(xb - 1, yb - 1, xb + bw, yl, k); rect(xh - 1, y0 - 1, xh + hw, yb, k);
  rect(xb, yb, xb + bw - 1, yl, ropa); rect(dir > 0 ? xb : xb + bw - 1, yb, dir > 0 ? xb : xb + bw - 1, yl, d_mezRb(ropa, k, 0.3));
  const p = o.paso ?? -1; rect(xb, yl + 1, xb + 1, suelo - (p === 1 ? 1 : 0), DR.tinta); rect(xb + bw - 2, yl + 1, xb + bw - 1, suelo - (p === 0 ? 1 : 0), d_mezRb(DR.tinta, k, 0.3));
  rect(xh, y0, xh + hw - 1, yb - 1, piel); rect(xh, y0, xh + hw - 1, y0, pelo); pset(dir > 0 ? xh : xh + hw - 1, y0 + 1, pelo); pset(dir > 0 ? xh : xh + hw - 1, y0 + 2, pelo);
  pset(dir > 0 ? xh + hw - 2 : xh + 1, y0 + 2, k);
  if (o.casco) { rect(xh - 1, y0 - 1, xh + hw, y0 - 1, DR.tinta); const ox = dir > 0 ? xh - 1 : xh + hw; pset(ox, y0 + 2, DR.tinta); pset(ox, y0 + 3, DR.tinta); for (let i = 1; i <= 3; i++) pset(ox + dir * i, y0 + 3 + (i >> 1), DR.tuboM); }
  if (o.auricular) { const ox = dir > 0 ? xh - 2 : xh + hw + 1; rect(ox, y0 + 1, ox + (dir > 0 ? 1 : -1) * 0 , y0 + 4, DR.formica); pset(ox, y0, k); pset(ox, y0 + 5, k); rect(xb + (dir > 0 ? 0 : bw - 1), yb + 1, xb + (dir > 0 ? 0 : bw - 1), yb + 2, piel); }
  if (o.brazo) { const bx = dir > 0 ? xb + bw : xb - 1; rect(bx, y0 - 2, bx, yb + 1, ropa); pset(bx, y0 - 3, piel); }
  if (o.cartel) { const cx = x + dir * 2, cy = y0 - 9; rect(cx, cy + 6, cx, yb + 2, DR.canto); rect(cx - 5, cy - 1, cx + 5, cy + 6, k); rect(cx - 4, cy, cx + 4, cy + 5, DR.papel);
    if (o.cartel === 'roto') { d_pictoRb(R, ['##.##', '#####', '.#.#.', '..#..'], cx - 2, cy + 1, C.rojoCola); pset(cx, cy + 1, DR.papel); }
    else { rect(cx - 1, cy + 1, cx + 1, cy + 4, C.rojoCola); for (let i = 0; i < 5; i++) { pset(cx - 2 + i, cy + 1 + i * 0.8, k); pset(cx + 2 - i, cy + 1 + i * 0.8, k); } } }
}

// un bocadillo pequeño (11 × 9 con el pico) con un dibujo dentro: 'ex' (la exclamación), 'roto', 'corazon' o 'abuelo'
function d_bocadilloRb(R, x, y, que) {
  const { rect, pset } = R; rect(x - 1, y - 1, x + 11, y + 8, C.k); rect(x, y, x + 10, y + 7, DR.papel); rect(x, y + 7, x + 10, y + 7, DR.papelS); pset(x + 2, y + 9, C.k); pset(x + 3, y + 9, C.k); pset(x + 2, y + 8, DR.papel); pset(x + 3, y + 8, DR.papel); pset(x + 2, y + 10, C.k);
  if (que === 'ex') { rect(x + 5, y + 1, x + 5, y + 4, C.rojoCola); pset(x + 5, y + 6, C.rojoCola); }
  else d_pictoRb(R, d_DIBUJOS_RB[que].slice(0, 7).map((f) => f.slice(0, 9)), x + 1, y, que === 'abuelo' ? DR.tinta : C.rojoCola, que === 'abuelo' ? C.rojoCola : DR.papel);
}

// una carta abierta vista desde arriba (w × hh) con su dibujo a escala s, los renglones de tinta sin letras y la doblez; c:
// el color del papel; dib: la clave del dibujo (o null)
function d_cartaRb(R, x, y, w, hh, dib, s, c = DR.papel) {
  const { rect, pset } = R; rect(x + 1, y + 1, x + w + 1, y + hh + 1, d_mezRb(DR.formicaS, C.k, 0.35)); rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, c);
  rect(x + 1, y + Math.round(hh * 0.5), x + w - 1, y + Math.round(hh * 0.5), d_mezRb(c, DR.papelS, 0.8));
  const dh = dib ? 8 * s + 2 : 0;
  if (dib) d_pictoRb(R, d_DIBUJOS_RB[dib], x + Math.round((w - 10 * s) / 2) + 1, y + 3, dib === 'abuelo' || dib === 'dodo' ? (dib === 'dodo' ? hex('#6a5a8a') : DR.tinta) : C.rojoCola, dib === 'lata' ? C.rojoCola : dib === 'abuelo' ? C.rojoCola : dib === 'dodo' ? hex('#e8a040') : c, s);
  for (let j = y + 4 + dh; j < y + hh - 2; j += 3) { const fin = x + w - 3 - ((j * 7) % 5); for (let i = x + 3; i <= fin; i++) if ((i * 3 + j) % 7) pset(i, j, d_mezRb(c, DR.tinta, 0.55)); }
}

// un sobre cerrado (w × hh) con su sello de colores y el matasellos; vuelta: se ve la solapa
function d_sobreRb(R, x, y, w, hh, c = DR.papel, vuelta = false) {
  const { rect, pset, linea } = R; rect(x + 1, y + 1, x + w + 1, y + hh + 1, d_mezRb(DR.formicaS, C.k, 0.35)); rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, c);
  if (vuelta) { linea(x + 1, y + 1, x + (w >> 1), y + (hh >> 1) + 1, d_mezRb(c, C.k, 0.25)); linea(x + w - 1, y + 1, x + (w >> 1), y + (hh >> 1) + 1, d_mezRb(c, C.k, 0.25)); return; }
  rect(x + w - 6, y + 2, x + w - 2, y + 6, C.rojoCola); rect(x + w - 5, y + 3, x + w - 3, y + 5, hex('#e8a040')); for (let i = 0; i < 6; i++) pset(x + w - 12 + i, y + 3 + (i % 2), DR.tinta);
  for (const [j, l] of [[hh - 6, 0.5], [hh - 4, 0.45], [hh - 2, 0.35]]) if (j > 7) for (let i = 0; i < Math.round(w * l); i++) if (i % 5 !== 4) pset(x + 4 + i, y + j, d_mezRb(c, DR.tinta, 0.5));
}

const d_ZOCALO_CENT = 89;

function d_centralitaFijaRb(R) {
  const { rect, pset, linea, disco } = R, B = R.buf, k = C.k;
  // el techo de placas acústicas (las filas más bajas, más lejos y más estrechas) con el moteado y su perfil metálico
  const filas = [0, 6, 11, 15, 18, 21];
  for (let y = 0; y < 22; y++) { let f = 0; while (f + 1 < filas.length && y >= filas[f + 1]) f++; const wf = 26 - f * 3, borde = y === filas[f + 1] - 1 || y === 21;
    for (let x = 0; x < 320; x++) { const xi = x - 160, col = Math.round(xi / (wf * (1 + y * 0.012))), junta = Math.abs(xi - col * wf * (1 + y * 0.012)) < 0.6;
      B[y * 320 + x] = borde || junta ? DR.techoS : h(x, y, 801) < 0.12 ? DR.techoJ : h(x, y, 802) < 0.04 ? DR.techoS : DR.techo; } }
  rect(0, 22, 319, 22, DR.paredS); rect(0, 23, 319, 23, d_mezRb(DR.pared, k, 0.25));
  // la pared beis con su papel de rayas finas y una mancha de luz
  for (let y = 24; y < d_ZOCALO_CENT; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 803); B[y * 320 + x] = x % 6 === 0 ? DR.paredS : q < 0.08 ? DR.paredS : q > 0.94 ? DR.paredL : (y < 30 && d_umRb(x, y) < (30 - y) / 10) ? d_mezRb(DR.pared, k, 0.08) : DR.pared; }
  rect(0, d_ZOCALO_CENT, 319, d_ZOCALO_CENT + 1, DR.zocalo); rect(0, d_ZOCALO_CENT, 319, d_ZOCALO_CENT, d_mezRb(DR.zocalo, DR.pared, 0.4));
  // la moqueta gris azulada de los ochenta: el dibujo de rombos en perspectiva, el desgaste del pasillo y las manchas
  for (let y = d_ZOCALO_CENT + 2; y < 180; y++) { const p = (y - 90) / 90, esc = 0.5 + p * 1.6;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / esc, v = (y - 90) / (0.4 + p * 0.8), rombo = ((Math.abs(((u + v * 2) % 16 + 16) % 16 - 8) + Math.abs(((u - v * 2) % 16 + 16) % 16 - 8)) | 0) === 6;
      const q = h(x, y, 804); let c = rombo ? DR.moqS : q < 0.18 ? DR.moqL : q > 0.9 ? DR.moqD : DR.moq; if (Math.abs(x - 248 + (y - 100) * 0.2) < 14 && q < 0.35) c = DR.moqL; B[y * 320 + x] = c; } }
  for (const [mx, my, r] of [[60, 132, 5], [180, 160, 4], [272, 170, 6]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / 2) ** 2 + j * j < r * r && d_umRb(mx + i, my + j) < 0.5) pset(mx + i, my + j, DR.moqD);
  // la puerta de madera con su ventanuco de cristal armado, la placa y el pictograma verde de salida
  rect(5, 34, 31, d_ZOCALO_CENT, k); rect(6, 35, 30, d_ZOCALO_CENT, DR.canto); for (let x = 8; x < 30; x += 3) rect(x, 36, x, d_ZOCALO_CENT, DR.cantoS); rect(6, 35, 7, d_ZOCALO_CENT, d_mezRb(DR.canto, DR.formicaL, 0.3));
  rect(12, 40, 24, 54, k); rect(13, 41, 23, 53, hex('#a8c0cc')); for (let j = 42; j < 53; j += 3) for (let i = 13; i < 24; i += 3) pset(i, j, hex('#7a92a0')); linea(14, 52, 22, 42, hex('#d8e8f0'));
  rect(26, 62, 29, 63, C.metalL); rect(26, 64, 29, 64, C.metalS); rect(11, 27, 25, 32, k); rect(12, 28, 24, 31, hex('#2a8a4a')); d_pictoRb(R, ['.#...', '###..', '.#.#.', '#..##'], 13, 28, hex('#d8f8d8')); rect(19, 29, 23, 29, hex('#d8f8d8')); pset(22, 28, hex('#d8f8d8')); pset(22, 30, hex('#d8f8d8'));
  // los archivadores grises de cuatro cajones con sus tiradores y etiquetas, una planta y una pila de carpetas encima
  for (const ax of [36, 52]) { rect(ax, 54, ax + 14, d_ZOCALO_CENT, k); rect(ax + 1, 55, ax + 13, d_ZOCALO_CENT, DR.archivo); rect(ax + 12, 55, ax + 13, d_ZOCALO_CENT, DR.archivoS); rect(ax + 1, 55, ax + 13, 55, DR.archivoL);
    for (let d = 0; d < 4; d++) { const dy = 57 + d * 8; rect(ax + 1, dy + 6, ax + 13, dy + 6, DR.archivoS); rect(ax + 5, dy + 2, ax + 9, dy + 2, C.metalD); rect(ax + 5, dy, ax + 8, dy, DR.papel); } }
  rect(54, 48, 64, 53, k); rect(55, 49, 63, 53, hex('#c84a3a')); rect(55, 50, 63, 50, hex('#e86a4a')); rect(56, 46, 62, 48, hex('#3a6ab8')); rect(56, 46, 62, 46, hex('#5a8ad8'));
  rect(38, 48, 46, 53, k); rect(39, 49, 45, 53, hex('#b86a3a')); for (const [dx, dy, r] of [[0, -4, 4], [-4, -2, 3], [4, -3, 3], [-2, -8, 3], [3, -8, 2]]) { disco(42 + dx, 48 + dy, r, hex('#2e6a3a')); disco(42 + dx - 1, 47 + dy, r - 1, hex('#4a9a4a')); }
  // la fuente de agua (el garrafón va aparte, con sus burbujas) y el portavasos
  rect(68, 60, 80, d_ZOCALO_CENT, k); rect(69, 61, 79, d_ZOCALO_CENT, DR.almendra); rect(77, 61, 79, d_ZOCALO_CENT, DR.almendraS); rect(70, 66, 74, 69, C.metalD); pset(71, 66, C.rojo); pset(73, 66, hex('#3a6ab8')); rect(70, 72, 78, 73, C.metalS);
  rect(81, 62, 84, 74, k); rect(82, 63, 83, 73, DR.papel); for (let j = 64; j < 73; j += 2) pset(82, j, DR.papelS);
  // el tablero del contador: marco de aluminio, la placa negra y los tornillos (las cifras, aparte)
  rect(90, 25, 166, 57, k); rect(91, 26, 165, 56, DR.marco); rect(91, 56, 165, 56, C.metalS); rect(93, 28, 163, 54, DR.tablero); for (const [i, j] of [[92, 27], [164, 27], [92, 55], [164, 55]]) pset(i, j, C.metalD);
  for (let x = 94; x < 163; x++) for (let y = 29; y < 54; y++) if ((x + y) % 2 === 0 && h(x, y, 805) < 0.15) pset(x, y, hex('#24242e'));
  rect(126, 57, 128, 60, C.metalS); linea(127, 60, 120, 66, C.metalD);
  // el reloj de pared redondo: el aro, la esfera con las marcas de las horas (las agujas, aparte)
  disco(182, 40, 10, k); disco(182, 40, 9, C.metalS); disco(182, 40, 8, DR.papel); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; pset(Math.round(182 + Math.cos(a) * 6.6), Math.round(40 + Math.sin(a) * 6.6), i % 3 ? DR.papelS : k); } disco(180, 38, 2, hex('#fffef8'));
  // las dos ventanas: el marco (el paisaje y las lamas van aparte, porque se mueven)
  for (const wx of [198, 240]) { rect(wx - 2, 27, wx + 37, 72, k); rect(wx - 1, 28, wx + 36, 71, DR.marco); rect(wx - 3, 72, wx + 38, 74, DR.formicaL); rect(wx - 3, 75, wx + 38, 75, DR.paredS); }
  // el corcho a la derecha (bajo la esquina de Atom) con un calendario de cuadrícula y unas notas
  rect(284, 50, 316, 82, k); rect(285, 51, 315, 81, DR.canto); rect(287, 53, 313, 79, DR.corcho);
  for (let y = 53; y < 80; y++) for (let x = 287; x < 314; x++) { const q = h(x, y, 806); if (q < 0.2) pset(x, y, DR.corchoS); else if (q > 0.88) pset(x, y, DR.corchoL); }
  // la fila del fondo: los cubículos de tela con su marco y lo que asoma por encima (las cabezas van aparte)
  rect(0, 92, 244, 110, d_mezRb(DR.moq, k, 0.25));
}

// las ventanas con persiana: el cielo de Atlanta con nubes que pasan y los rascacielos de 1985, recortados a su hueco, y
// encima las lamas (entreabiertas) con su cordón
function d_ventanasCentRb(R, t) {
  const { rect, pset, disco } = R;
  for (const wx of [198, 240]) {
    R.recorte([wx, 29, wx + 35, 70]);
    for (let y = 29; y <= 70; y++) for (let x = wx; x <= wx + 35; x++) pset(x, y, d_umRb(x, y) < (y - 29) / 50 ? DR.cieloA : DR.cieloAS);
    for (let k = 0; k < 3; k++) { const cx = ((h(k, 3, 807) * 140 + t * (1.5 + k * 1.1)) % 140) + 180, cy = 34 + k * 6, w = 6 + k * 3; disco(Math.round(cx), cy + 1, w >> 1, hex('#d8e8f4')); disco(Math.round(cx - w * 0.4), cy + 1, w >> 2, hex('#d8e8f4')); disco(Math.round(cx), cy, (w >> 1) - 1, C.blanco); }
    for (const [bx, bw, top, c] of [[188, 10, 44, DR.torreS], [202, 7, 38, DR.torre], [211, 12, 50, DR.torreS], [226, 8, 34, DR.torre], [236, 14, 46, DR.torreS], [252, 9, 40, DR.torre], [262, 12, 52, DR.torreS], [274, 6, 46, DR.torre]]) {
      for (let y = top; y <= 70; y++) for (let x = bx; x < bx + bw; x++) pset(x, y, x === bx ? DR.torreL : (y - top) % 3 === 1 && (x - bx) % 2 === 1 ? (h(x, y, 808) < 0.2 + 0.1 * Math.sin(t * 0.3 + x) ? hex('#f8e8a8') : hex('#5a6478')) : c);
      if (bw > 10) { for (let x = bx + 3; x < bx + bw - 3; x++) pset(x, top - 1, c); pset(bx + (bw >> 1), top - 4, C.metalD); pset(bx + (bw >> 1), top - 3, C.metalD); pset(bx + (bw >> 1), top - 2, c); if (Math.floor(t * 1.5 + bx) % 3 === 0) pset(bx + (bw >> 1), top - 5, C.rojo); } }
    R.recorte(null);
    // las lamas de la persiana, entreabiertas: cada lama tiene su luz y su sombra; abajo, la barra y el cordón que se mece
    for (let y = 29; y <= 60; y += 4) { rect(wx, y, wx + 35, y, DR.persiana); rect(wx, y + 1, wx + 35, y + 1, DR.persianaS); }
    rect(wx, 61, wx + 35, 62, DR.persianaS); rect(wx, 61, wx + 35, 61, DR.persiana);
    const m = Math.round(Math.sin(t * 1.3 + wx) * 1); R.linea(wx + 32, 62, wx + 32 + m, 70, DR.persianaS); pset(wx + 32 + m, 71, DR.canto);
  }
}

// las cifras ámbar del contador con un teléfono (o un corazón), la flecha que sube y la tira de luces que corre
function d_contadorRb(R, t, n, corazones) {
  const { rect, pset } = R, txt = String(Math.max(0, Math.round(n))), w = txt.length * 8 - 2, x0 = 140 - (w >> 1) + 6;
  if (corazones) d_pictoRb(R, d_DIBUJOS_RB.corazon, 97, 33, C.rojoCola, C.rojoCola, 2);
  else { d_pictoRb(R, ['.########.', '##########', '###....###', '##..##..##', '...####...', '..######..', '..##..##..', '..######..'], 97, 33, DR.ambar, DR.ambar, 2); }
  rect(x0 - 2, 32, x0 + w + 1, 45, hex('#120e10')); d_cifrasRb(R, txt, x0, 33, DR.ambarS, 2); d_cifrasRb(R, txt, x0, 33, DR.ambar, 2);
  for (let i = 0; i < w; i += 2) pset(x0 + i, 46, hex('#3a2a18'));
  const sube = (t * 2) % 1; for (let j = 0; j < 3; j++) { const yy = Math.round(42 - sube * 6) + j * 3; if (yy > 31 && yy < 46) { pset(157, yy, C.verdeL ?? DR.verde); pset(156, yy + 1, DR.verde); pset(158, yy + 1, DR.verde); } }
  for (let i = 0; i < 22; i++) { const on = Math.floor(t * 8 - i) % 6 === 0; rect(96 + i * 3, 50, 97 + i * 3, 51, on ? DR.led : hex('#3a1614')); }
}

// las agujas del reloj, que avanzan (el minutero da una vuelta cada 40 s, para que se vea)
function d_relojRb(R, t, cx, cy, l) { const am = t * 0.157 - 1.2, ah = am / 12 + 0.4; R.linea(cx, cy, Math.round(cx + Math.cos(am) * l), Math.round(cy + Math.sin(am) * l), C.k); R.linea(cx, cy, Math.round(cx + Math.cos(ah) * l * 0.6), Math.round(cy + Math.sin(ah) * l * 0.6), C.k); R.pset(cx, cy, C.rojo); }

function d_centralitaRb(R, t, o) {
  const { rect, pset, disco, linea } = R, k = C.k, corazones = !!o.corazones, suenan = o.suenan ?? true;
  d_capaRb(R, 'centralita', () => d_centralitaFijaRb(R));
  // los fluorescentes: la fila cercana (fuera de la barra del año) y la lejana, uno que parpadea
  for (const [x0, x1, y0, y1] of [[180, 262, 3, 7], [0, 14, 3, 7]]) { rect(x0, y0, x1, y1, DR.tuboM); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, DR.tubo); for (let x = x0 + 3; x < x1; x += 4) rect(x, y0 + 1, x, y1 - 1, DR.tuboS); }
  for (let i = 0; i < 6; i++) { const x0 = 22 + i * 42, mal = i === 2, on = !mal || Math.sin(t * 23) + Math.sin(t * 7.3) > -0.4; rect(x0, 16, x0 + 24, 18, DR.tuboM); rect(x0 + 1, 17, x0 + 23, 17, on ? DR.tubo : hex('#8a8c84')); }
  d_ventanasCentRb(R, t);
  d_relojRb(R, t, 182, 40, 6);
  d_contadorRb(R, t, o.llamadas ?? 400 + 1100 * Math.min(1, Math.max(0, t / 6)), corazones);
  // el garrafón de la fuente con el agua que se mece y la burbuja que sube cada pocos segundos
  { rect(70, 46, 78, 59, k); rect(71, 47, 77, 58, hex('#8ac4e8')); rect(71, 47, 77, 49, hex('#c8e4f4')); rect(76, 50, 77, 58, hex('#6aa4d0')); rect(73, 44, 75, 46, k);
    const nivel = 49 + Math.round(Math.sin(t * 1.2)); rect(71, 47, 77, nivel - 1, hex('#d8eef8'));
    for (let b = 0; b < 3; b++) { const u = (t * 0.6 + b * 0.33) % 1; if (u < 0.7) { const by = Math.round(58 - u * 12), bx = 73 + Math.round(Math.sin(t * 5 + b) * 1); if (by > nivel) { pset(bx, by, C.blanco); if (b === 0) pset(bx + 1, by, hex('#d8eef8')); } } } }
  // el corcho: las cartas clavadas con chinchetas, con dibujos (o corazones), que el aire de la ventana mueve un poco
  const dibs = corazones ? ['corazon', 'corazon', 'abuelo'] : ['roto', 'lata', 'abuelo'];
  dibs.forEach((d, i) => { const cx = 289 + (i % 2) * 12 + (i === 2 ? 4 : 0), cy = 55 + i * 8, m = i === 1 && Math.sin(t * 2) > 0.6 ? 1 : 0; rect(cx, cy + m, cx + 11, cy + 9, k); rect(cx + 1, cy + 1 + m, cx + 10, cy + 8, i === 1 ? DR.azulCarta : DR.papel); d_pictoRb(R, d_DIBUJOS_RB[d].slice(0, 7).map((f) => f.slice(0, 9)), cx + 1, cy + 1 + m, d === 'abuelo' ? DR.tinta : C.rojoCola, C.rojoCola); pset(cx + 5, cy, C.rojo); });
  // la fila del fondo: las operadoras pequeñas detrás de los cubículos, cada una a lo suyo (contesta, apunta, se gira)
  const piel = [DR.piel1, DR.piel2, DR.piel3], pelo = [DR.pelo1, DR.pelo2, DR.pelo3, DR.pelo4], ropa = [DR.ropa1, DR.ropa2, DR.ropa3, DR.ropa4, DR.ropa5, DR.ropa6];
  for (let i = 0; i < 11; i++) { const x = 10 + i * 22 + (i % 2) * 3, f = (t * 0.5 + h(i, 1, 809) * 9) % 6, habla = f < 3.5, bob = habla && Math.sin(t * 6 + i) > 0.5 ? 1 : 0, dir = i % 3 === 0 ? -1 : 1;
    d_figuraRb(R, x, 101 + bob, 12, ropa[i % 6], pelo[(i * 3) % 4], piel[(i * 7) % 3], dir, { casco: true, brazo: !habla && f > 5.2 }); }
  // los paneles de los cubículos (tela gris azulada con su trama, el marco de aluminio) y lo que hay encima de ellos
  for (let x = 0; x < 245; x++) for (let y = 97; y <= 110; y++) pset(x, y, y === 97 ? DR.marco : y === 98 ? C.metalS : x % 49 === 0 ? DR.marco : (x + y) % 3 === 0 ? DR.panelS : h(x, y, 810) < 0.1 ? DR.panelL : DR.panel);
  for (let i = 0; i < 11; i++) { const x = 18 + i * 22; if (i % 3 === 1) { rect(x, 93, x + 5, 96, k); rect(x + 1, 94, x + 4, 96, DR.papel); } else if (i % 3 === 2) { rect(x, 94, x + 4, 96, k); rect(x + 1, 95, x + 3, 96, DR.formica); if (suenan && Math.floor(t * 4 + i) % 2) pset(x + 2, 93, DR.led); } }
  // la fila media: las mesas con sus operadoras (más grandes), los teléfonos que parpadean y los bocadillos que salen
  for (let i = 0; i < 7; i++) { const x = 18 + i * 32, f = (t * 0.45 + h(i, 2, 811) * 7) % 7, habla = f < 4.5, dir = i % 2 ? -1 : 1, bob = habla && Math.sin(t * 5 + i * 2) > 0.4 ? 1 : 0;
    d_figuraRb(R, x, 120 + bob, 15, ropa[(i + 2) % 6], pelo[(i * 5 + 1) % 4], piel[(i * 2 + 1) % 3], dir, { casco: i % 2 === 0, auricular: i % 2 === 1 && habla, brazo: !habla && f > 6.2 });
    if (f > 1 && f < 2.6) d_bocadilloRb(R, x + (dir > 0 ? 3 : -13), 88 - (i % 2) * 2, corazones ? 'corazon' : ['ex', 'roto', 'abuelo', 'ex'][(i + Math.floor(t / 7)) % 4]); }
  for (let x = 4; x < 240; x++) { pset(x, 116, DR.formicaL); pset(x, 117, DR.formica); for (let y = 118; y <= 128; y++) pset(x, y, y === 118 ? DR.canto : (x * 5 + y) % 37 === 0 ? DR.frenteS : y > 126 ? DR.frenteS : DR.frente); }
  for (let i = 0; i < 7; i++) { const x = 26 + i * 32 + (i % 2 ? -14 : 0), suena = suenan && Math.sin(t * 3 + i * 1.7) > 0.2, s = suena ? Math.round(Math.abs(Math.sin(t * 20 + i))) : 0;
    rect(x, 112 - s, x + 7, 116 - s, k); rect(x + 1, 113 - s, x + 6, 115 - s, DR.formica); rect(x, 111 - s * 2, x + 7, 112 - s * 2, i % 3 === 1 ? hex('#c84a3a') : DR.formicaS); if (suena) { pset(x + 6, 113 - s, DR.led); pset(x - 2, 113, k); pset(x + 9, 113, k); }
    rect(x + 10, 113, x + 15, 116, DR.papel); rect(x + 10, 116, x + 15, 116, DR.papelS); }
  // a la derecha, la montaña de sacos de cartas, el carro de correos lleno y las cartas sueltas que resbalan
  const ns = Math.max(0, Math.min(8, o.sacos ?? 6)), SACOS = [[262, 150], [290, 152], [312, 150], [276, 132], [302, 134], [288, 116], [252, 128], [314, 130]];
  for (let i = 0; i < 9; i++) { const lx = 246 + ((i * 29) % 70), ly = 140 + ((i * 13) % 34); rect(lx, ly, lx + 6, ly + 4, k); rect(lx + 1, ly + 1, lx + 5, ly + 3, i % 3 ? DR.papel : DR.azulCarta); pset(lx + 5, ly + 1, C.rojoCola); }
  for (let i = ns - 1; i >= 0; i--) PIEZAS_NC.sacoCartas?.(R, SACOS[i][0], SACOS[i][1], { cartas: i >= 3 || ns <= 3 });
  if (ns > 3) { const u = (t * 0.3) % 1, top = SACOS[Math.min(ns, 6) - 1]; if (u < 0.6) { const lx = Math.round(top[0] + 6 + u * 20), ly = Math.round(top[1] - 22 + u * u * 60); rect(lx, ly, lx + 5, ly + 3, k); rect(lx + 1, ly + 1, lx + 4, ly + 2, DR.papel); } }
  { const cx = 236, cy = 150; rect(cx - 13, cy - 22, cx + 13, cy - 6, k); rect(cx - 12, cy - 21, cx + 12, cy - 7, hex('#c8b890')); for (let x = cx - 11; x < cx + 12; x += 4) rect(x, cy - 20, x, cy - 8, hex('#a89870')); rect(cx - 12, cy - 21, cx + 12, cy - 20, hex('#8a7a58'));
    for (let i = 0; i < 6; i++) { const lx = cx - 11 + i * 4, ly = cy - 26 + (i % 2) * 2; rect(lx, ly, lx + 5, ly + 5, k); rect(lx + 1, ly + 1, lx + 4, ly + 4, i % 2 ? DR.azulCarta : DR.papel); }
    rect(cx - 13, cy - 5, cx + 13, cy - 5, C.metalD); for (const dx of [-10, 10]) { disco(cx + dx, cy - 2, 2, k); pset(cx + dx, cy - 2, C.metalL); } }
  return { suelo: 150, mesa: { x0: 0, x1: 236, y: 146 }, contador: [128, 41], reloj: [182, 40], puerta: [5, 31, 89], sacos: SACOS.slice(0, ns), carro: [236, 150], libre: [[0, 236, 150], [240, 318, 162]] };
}

// la mesa larga de formica de delante, con su canto de madera, los cajones y lo que hay encima: tres teléfonos que suenan
// (y saltan con o.saltan), los papeles de quejas, la taza que humea, el fichero giratorio y el bote de lápices
function d_mesaCentralitaRb(R, t, o) {
  const { rect, pset, linea, disco } = R, k = C.k, suenan = o.suenan ?? true, salta = Math.max(0, Math.min(1, o.saltan ?? 0));
  rect(0, 145, 237, 179, k);
  for (let y = 146; y <= 153; y++) for (let x = 0; x <= 236; x++) pset(x, y, y === 146 ? DR.formicaL : h(x >> 1, y, 812) < 0.1 ? DR.formicaS : (x + y * 3) % 23 === 0 ? DR.formicaL : DR.formica);
  rect(0, 154, 236, 156, DR.canto); rect(0, 154, 236, 154, d_mezRb(DR.canto, DR.formicaL, 0.4)); rect(0, 156, 236, 156, DR.cantoS);
  for (let y = 157; y < 180; y++) for (let x = 0; x <= 236; x++) pset(x, y, (x * 3 + y * 7) % 41 === 0 ? DR.frenteS : (y - 157) % 10 === 9 ? DR.frenteS : DR.frente);
  for (const dx of [8, 82, 168]) { rect(dx, 160, dx + 60, 184, DR.frenteS); rect(dx + 1, 161, dx + 59, 183, DR.frente); rect(dx + 1, 172, dx + 59, 172, DR.frenteS); for (const yy of [165, 177]) { rect(dx + 26, yy, dx + 34, yy + 1, C.metalS); rect(dx + 26, yy, dx + 34, yy, C.metalL); } }
  // la sombra de las cosas sobre el tablero y las cosas
  rect(196, 140, 210, 150, k); rect(197, 141, 209, 149, hex('#5a5a66')); for (let i = 0; i < 6; i++) { rect(198 + i * 2, 136 + (i % 2), 199 + i * 2, 142, i % 2 ? DR.papel : DR.azulCarta); } disco(203, 149, 2, C.metalD);
  rect(214, 141, 220, 150, k); rect(215, 142, 219, 149, hex('#3a6ab8')); for (const [dx, c] of [[0, C.amarillo ?? hex('#f0c040')], [2, C.rojo], [3, hex('#3a3a3a')]]) rect(215 + dx, 136 + dx % 2, 215 + dx, 141, c);
  for (let i = 0; i < 5; i++) { const px = 64 + i * 3, py = 148 - i; rect(px, py, px + 16, py + 4, k); rect(px + 1, py + 1, px + 15, py + 3, i === 4 ? DR.azulCarta : DR.papel); }
  rect(158, 147, 173, 152, k); rect(159, 148, 172, 151, DR.papel); for (let i = 160; i < 171; i += 2) pset(i, 149, DR.tinta); linea(166, 145, 174, 149, hex('#e8c040')); pset(174, 149, k);
  { const mx = 140, my = 144; rect(mx, my, mx + 7, my + 8, k); rect(mx + 1, my + 1, mx + 6, my + 7, C.blanco); rect(mx + 5, my + 1, mx + 6, my + 7, hex('#d0d0d8')); rect(mx + 1, my + 1, mx + 6, my + 1, hex('#5a3420')); rect(mx + 8, my + 2, mx + 9, my + 5, k); rect(mx + 2, my + 3, mx + 5, my + 5, C.rojoCola);
    for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, sx = Math.round(mx + 3 + Math.sin(t * 2 + i * 2) * 2 * u), sy = Math.round(my - 2 - u * 12); if (u < 0.85) pset(sx, sy, u < 0.5 ? hex('#f0f0f0') : hex('#c8c8d0')); } }
  // los tres teléfonos: suenan, botan; con o.saltan saltan cada vez más alto, se tuercen y se les cae el auricular
  const tels = [[40, 153], [110, 153], [186, 153]];
  tels.forEach(([x, y], i) => { const fase = t * 3 + i * 2.1, alto = salta > 0 ? Math.round(Math.max(0, Math.sin(fase)) * (4 + 18 * salta)) : 0, dx = salta > 0.5 ? Math.round(Math.sin(fase * 0.5) * 3 * salta) : 0;
    if (alto > 2) { rect(x - 9, y, x + 9, y, d_mezRb(DR.formica, k, 0.35)); }
    PIEZAS_NC.telefono?.(R, x + dx, y - alto, { suena: suenan, t: t + i * 0.37 });
    if (alto > 6) { pset(x - 13, y - alto - 6, k); pset(x - 14, y - alto - 4, k); pset(x + 13, y - alto - 6, k); pset(x + 14, y - alto - 4, k); } });
  return { telefonos: tels };
}

function d_cartasFijaRb(R) {
  const { rect, pset, disco, linea } = R, B = R.buf, k = C.k;
  // la pared con el papel de rayas y el zócalo
  for (let y = 0; y < 72; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 813); B[y * 320 + x] = x % 8 === 0 ? DR.paredS : q < 0.08 ? DR.paredS : q > 0.94 ? DR.paredL : DR.pared; }
  rect(0, 72, 319, 74, DR.zocalo); rect(0, 72, 319, 72, d_mezRb(DR.zocalo, DR.pared, 0.4));
  for (let y = 75; y < 100; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 814); B[y * 320 + x] = q < 0.18 ? DR.moqL : q > 0.9 ? DR.moqD : (x + y * 2) % 11 === 0 ? DR.moqS : DR.moq; }
  // el corcho grande con su marco de madera
  rect(24, 18, 196, 66, k); rect(25, 19, 195, 65, DR.canto); rect(25, 19, 195, 19, d_mezRb(DR.canto, DR.formicaL, 0.4)); rect(28, 22, 192, 62, DR.corcho);
  for (let y = 22; y < 63; y++) for (let x = 28; x < 193; x++) { const q = h(x, y, 815); if (q < 0.2) pset(x, y, DR.corchoS); else if (q > 0.88) pset(x, y, DR.corchoL); }
  // la estantería de archivadores de anillas de colores con su lomo y su etiqueta
  rect(206, 26, 268, 70, k); rect(207, 27, 267, 69, DR.canto); for (const sy of [46, 69]) { rect(207, sy - 1, 267, sy, DR.cantoS); }
  for (let fila = 0; fila < 2; fila++) for (let i = 0; i < 10; i++) { const bx = 209 + i * 6, by = 29 + fila * 20, c = [hex('#c84a3a'), hex('#3a6ab8'), hex('#4a8a5a'), hex('#d8b040'), hex('#6a4a8a')][(i + fila * 2) % 5];
    if (fila === 1 && i > 7) { rect(bx, by + 10, bx + 10, by + 15, k); rect(bx + 1, by + 11, bx + 9, by + 14, c); continue; }
    rect(bx, by, bx + 5, by + 15, k); rect(bx + 1, by + 1, bx + 4, by + 15, c); rect(bx + 4, by + 1, bx + 4, by + 15, d_mezRb(c, k, 0.3)); rect(bx + 2, by + 4, bx + 3, by + 6, DR.papel); disco(bx + 2, by + 11, 1, k); }
  // los sacos de cartas en el suelo, a los dos lados
  for (const [sx, sy] of [[14, 98], [34, 100], [292, 98], [306, 100]]) PIEZAS_NC.sacoCartas?.(R, sx, sy, { cartas: true });
  // a la derecha, bajo la esquina de Atom, la pared queda tranquila: solo el enchufe y el cable del teléfono
  rect(286, 60, 292, 66, k); rect(287, 61, 291, 65, DR.formicaL); pset(288, 63, k); pset(290, 63, k); linea(289, 66, 280, 98, DR.tinta);
}

function d_cartasRb(R, t, o) {
  const { rect, pset } = R, k = C.k, corazones = !!o.corazones;
  d_capaRb(R, 'cartas', () => d_cartasFijaRb(R));
  // las cartas clavadas en el corcho, cada una con su chincheta de color; el aire mueve la esquina de alguna
  const CARTAS = corazones ? ['corazon', 'abuelo', 'corazon', 'dodo', 'corazon', 'corazon', 'abuelo'] : ['roto', 'lata', 'dodo', 'abuelo', 'roto', 'lata', 'roto'];
  CARTAS.forEach((d, i) => { const cx = 32 + i * 23 + (i % 2) * 2, cy = 25 + (i % 3) * 5, azul = i % 3 === 1; d_cartaRb(R, cx, cy, 20, 28, d, 1, azul ? DR.azulCarta : DR.papel);
    if (Math.sin(t * 2.2 + i * 1.7) > 0.7) { rect(cx + 17, cy + 25, cx + 20, cy + 28, DR.corchoS); pset(cx + 17, cy + 25, azul ? DR.azulCarta : DR.papel); }
    R.disco(cx + 10, cy + 1, 1, [C.rojo, hex('#3a6ab8'), hex('#e8c040'), hex('#4a9a5a')][i % 4]); });
  return { suelo: 100, mesa: { y: 96 }, corcho: [28, 22, 192, 62], libre: [[60, 260, 100]] };
}

// la mesa de cartas de cerca (de y 96 abajo): la formica con su canto, el montón de cartas abiertas con sus dibujos, sobres
// con sellos, la taza que humea, el abrecartas, el teléfono que suena y la carta nueva que cae cada pocos segundos
function d_mesaCartasRb(R, t, o) {
  const { rect, pset, linea, disco } = R, k = C.k, corazones = !!o.corazones;
  rect(0, 95, 319, 95, k);
  for (let y = 96; y < 180; y++) { const p = (y - 96) / 84; for (let x = 0; x < 320; x++) pset(x, y, y < 99 ? DR.canto : y === 99 ? DR.cantoS : h(x >> 2, y >> 1, 816) < 0.08 ? DR.formicaS : (x * 2 + y) % 53 === 0 ? DR.formicaL : d_umRb(x, y) < p * 0.25 ? DR.formicaS : DR.formica); }
  rect(0, 96, 319, 96, d_mezRb(DR.canto, DR.formicaL, 0.4));
  // sobres abiertos y cerrados repartidos por la mesa
  for (const [x, y, w, hh, c, v] of [[6, 104, 30, 18, DR.papel, false], [282, 106, 30, 18, DR.azulCarta, false], [292, 132, 24, 16, DR.papel, true], [4, 150, 28, 18, DR.azulCarta, true], [250, 160, 30, 18, DR.papel, false]]) d_sobreRb(R, x, y, w, hh, c, v);
  // las cartas abiertas grandes, con su dibujo a doble tamaño (lo que se tiene que leer del plano)
  const G = corazones ? [['corazon', DR.papel], ['abuelo', DR.azulCarta], ['corazon', DR.papel], ['dodo', DR.papel]] : [['dodo', DR.papel], ['roto', DR.azulCarta], ['lata', DR.papel], ['abuelo', DR.papel]];
  G.forEach(([d, c], i) => d_cartaRb(R, 40 + i * 54 + (i % 2) * 4, 104 + (i % 2) * 10 + (i === 3 ? -4 : 0), 34, 40, d, 2, c));
  // un montón de cartas apiladas en el centro abajo
  for (let i = 0; i < 6; i++) { const x = 116 + (i % 3) * 2 - i, y = 156 - i * 2; rect(x, y, x + 32, y + 18, k); rect(x + 1, y + 1, x + 31, y + 17, i % 2 ? DR.azulCarta : DR.papel); rect(x + 1, y + 17, x + 31, y + 17, DR.papelS); }
  d_cartaRb(R, 104, 144, 30, 30, corazones ? 'corazon' : 'roto', 1, DR.papel);
  // la carta nueva que cae al montón (cada 4 s): baja girando un poco y se queda encima
  { const u = (t % 4) / 0.8, x = 120, y = 140; if (u < 1) { const xx = Math.round(lerp(-30, x, u)), yy = Math.round(lerp(150, y, u) - Math.sin(u * Math.PI) * 26); rect(xx, yy, xx + 26, yy + 16, k); rect(xx + 1, yy + 1, xx + 25, yy + 15, DR.papel); rect(xx + 20, yy + 2, xx + 24, yy + 6, C.rojoCola); for (let i = 1; i < 4; i++) R.pset(xx - i * 4, yy + 8 + i, DR.papelS); }
    else d_sobreRb(R, x, y, 26, 16, DR.papel, false); }
  // la taza de café que humea y el abrecartas de latón
  { const mx = 236, my = 150; disco(mx + 6, my + 12, 9, d_mezRb(DR.formica, k, 0.25)); rect(mx, my, mx + 12, my + 12, k); rect(mx + 1, my + 1, mx + 11, my + 11, C.blanco); rect(mx + 9, my + 1, mx + 11, my + 11, hex('#d0d0d8')); rect(mx + 1, my + 1, mx + 11, my + 2, hex('#4a2a1a')); rect(mx + 13, my + 3, mx + 15, my + 8, k); rect(mx + 13, my + 4, mx + 14, my + 7, C.blanco); rect(mx + 3, my + 5, mx + 8, my + 8, C.rojoCola);
    for (let i = 0; i < 4; i++) { const u = (t * 0.45 + i / 4) % 1, sx = Math.round(mx + 6 + Math.sin(t * 2.4 + i * 2) * 3 * u), sy = Math.round(my - 2 - u * 26); if (u < 0.85) { pset(sx, sy, u < 0.5 ? hex('#f4f4f4') : hex('#c8c8d0')); if (u < 0.4) pset(sx + 1, sy, hex('#e0e0e8')); } } }
  linea(196, 172, 226, 160, k); linea(196, 171, 226, 159, DR.ambar ?? hex('#c8a040')); linea(197, 172, 226, 161, hex('#8a6a24')); rect(193, 171, 199, 174, k); rect(194, 172, 198, 173, hex('#5a3420'));
  // el teléfono que suena en la esquina, con su cable rizado
  PIEZAS_NC.telefono?.(R, 300, 178, { suena: true, t, s: 1 });
  for (let i = 0; i < 14; i++) pset(282 - i, 174 + Math.round(Math.sin(i * 1.4) * 1.5), DR.tinta);
  return { pila: [133, 140] };
}

const d_CIELO_RB = () => [[0, DR.cielo0], [14, DR.cielo1], [28, DR.cielo2], [42, DR.cielo3], [56, DR.cielo4]];

function d_calleFijaRb(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, k = C.k;
  // el cielo gris en bandas tramadas
  const P = d_CIELO_RB();
  for (let y = 0; y < 72; y++) { let i = 0; while (i + 1 < P.length && y >= P[i + 1][0]) i++; const a = P[i][1], b = i + 1 < P.length ? P[i + 1][1] : a, p = i + 1 < P.length ? (y - P[i][0]) / (P[i + 1][0] - P[i][0]) : 0;
    for (let x = 0; x < 320; x++) B[y * 320 + x] = d_umRb(x, y) < p * p ? b : a; }
  // los rascacielos lejanos en la bruma y la Space Needle (lejos de la esquina de Atom)
  for (let i = 0; i < 16; i++) { const x0 = 120 + i * 9 + Math.round(h(i, 1, 820) * 4), w = 6 + Math.round(h(i, 2, 820) * 6), top = 40 + Math.round(h(i, 3, 820) * 18);
    for (let y = top; y < 72; y++) for (let x = x0; x < x0 + w; x++) { const v = (y - top) % 3 === 1 && (x - x0) % 2 === 1; B[y * 320 + x] = v ? (h(x, y, 821) < 0.15 ? hex('#d8d0a8') : DR.brumaS) : x === x0 ? DR.brumaL : DR.bruma; } }
  { const nx = 140; rect(nx - 1, 34, nx + 1, 72, DR.brumaS); rect(nx, 34, nx, 72, DR.bruma); linea(nx - 6, 72, nx - 1, 46, DR.brumaS); linea(nx + 6, 72, nx + 1, 46, DR.brumaS);
    rect(nx - 9, 30, nx + 9, 32, DR.brumaS); rect(nx - 7, 29, nx + 7, 29, DR.bruma); rect(nx - 8, 33, nx + 8, 33, d_mezRb(DR.brumaS, k, 0.15)); poligono([[nx - 5, 29], [nx, 25], [nx + 5, 29]], DR.brumaS); rect(nx, 18, nx, 25, DR.brumaS); rect(nx - 4, 52, nx + 4, 53, DR.brumaS); }
  // el edificio de ladrillo de la izquierda (con la tienda abajo): la fachada con sus hiladas, las ventanas de guillotina,
  // la cornisa y la escalera de incendios
  const ladrillo = (x0, x1, y0, y1, sem) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = ((y - y0) / 3) | 0, m = (x + (f % 2) * 4) % 8; B[y * 320 + x] = (y - y0) % 3 === 2 || m === 0 ? DR.mortero : h(x >> 1, f, sem) < 0.15 ? DR.ladrilloS : h(x, y, sem + 1) < 0.06 ? DR.ladrilloL : DR.ladrillo; } };
  ladrillo(0, 118, 18, 116, 822);
  rect(0, 15, 120, 17, hex('#c8b8a0')); rect(0, 18, 120, 19, hex('#8a7a68')); for (let x = 2; x < 120; x += 6) rect(x, 17, x + 2, 18, hex('#a89880'));
  for (const fy of [22, 50]) for (const fx of [10, 40, 70, 96]) { rect(fx, fy, fx + 16, fy + 22, hex('#d8d0c0')); rect(fx + 1, fy + 1, fx + 15, fy + 21, k); rect(fx + 2, fy + 2, fx + 14, fy + 10, hex('#5a6478')); rect(fx + 2, fy + 12, fx + 14, fy + 20, hex('#4a5468')); rect(fx + 1, fy + 11, fx + 15, fy + 11, hex('#d8d0c0'));
    linea(fx + 3, fy + 9, fx + 9, fy + 3, hex('#8a94a8')); rect(fx - 1, fy + 23, fx + 17, fy + 24, hex('#c8b8a0')); if ((fx + fy) % 3 === 0) { rect(fx + 2, fy + 2, fx + 5, fy + 10, hex('#e8c8a0')); rect(fx + 11, fy + 2, fx + 14, fy + 10, hex('#e8c8a0')); } }
  // la escalera de incendios de hierro negro con sus barandillas en zigzag
  for (const py of [46, 74]) { rect(36, py, 92, py + 1, k); for (let x = 36; x <= 92; x += 3) rect(x, py - 6, x, py, k); rect(36, py - 7, 92, py - 7, k); }
  linea(40, 46, 86, 74 - 1, k); linea(41, 46, 87, 74 - 1, d_mezRb(k, C.metalD, 0.5)); for (let i = 0; i < 9; i++) { const x = 42 + i * 5, y = 47 + i * 3; rect(x, y, x + 3, y, C.metalD); }
  // la tienda de ultramarinos: el escaparate grande (el interior va aparte), la puerta, el letrero de pictograma
  rect(4, 78, 112, 116, hex('#2a3a2a')); rect(6, 80, 110, 82, hex('#3a5a3a'));
  rect(10, 84, 70, 112, k); rect(78, 84, 98, 116, k); rect(79, 85, 97, 116, hex('#3a5a3a')); rect(81, 87, 95, 104, hex('#6a7a88')); linea(82, 102, 94, 88, hex('#9aa8b8')); rect(94, 106, 95, 108, C.metalL);
  rect(100, 84, 110, 112, hex('#3a5a3a')); rect(102, 88, 108, 108, k); rect(103, 89, 107, 107, hex('#e8d8a0')); d_pictoRb(R, ['.###.', '#...#', '#...#', '.###.', '..#..', '.###.'], 103, 92, hex('#c84a3a'));
  // la cafetería del medio, más baja: el escaparate con su luz cálida, las mesitas y el rótulo con una taza
  ladrillo(150, 214, 46, 116, 823); rect(148, 42, 216, 46, hex('#d8d0c0')); rect(148, 46, 216, 47, hex('#8a7a68'));
  for (const fx of [156, 188]) { rect(fx, 54, fx + 18, 72, hex('#e8e0d0')); rect(fx + 1, 55, fx + 17, 71, k); rect(fx + 2, 56, fx + 16, 70, hex('#5a6478')); rect(fx + 9, 56, fx + 9, 70, hex('#e8e0d0')); rect(fx + 2, 63, fx + 16, 63, hex('#e8e0d0')); }
  rect(152, 82, 212, 116, hex('#5a2a2a')); rect(155, 86, 209, 112, k); rect(156, 87, 208, 111, hex('#e8b870'));
  for (let y = 87; y <= 111; y++) for (let x = 156; x <= 208; x++) if (d_umRb(x, y) < (y - 87) / 40) pset(x, y, hex('#d89850'));
  for (const tx of [166, 196]) { rect(tx - 5, 101, tx + 5, 102, hex('#5a3a2a')); rect(tx, 103, tx, 111, hex('#5a3a2a')); rect(tx - 3, 111, tx + 3, 111, hex('#5a3a2a')); rect(tx - 2, 98, tx, 100, C.blanco); }
  rect(170, 75, 194, 81, k); rect(171, 76, 193, 80, hex('#2a2a3a')); d_pictoRb(R, ['..#.#..', '.#.#...', '#######', '#####.#', '######.', '.####..'], 179, 75, hex('#f0d8a0'));
  // el hueco de la calle que cruza al fondo (la manifestación pequeña va aparte) y el edificio de la derecha
  for (let y = 72; y <= 116; y++) for (let x = 119; x < 150; x++) B[y * 320 + x] = y > 106 ? (h(x, y, 824) < 0.1 ? DR.aceraS : DR.acera) : y > 103 ? DR.aceraL : DR.bruma;
  for (let i = 0; i < 4; i++) { const x0 = 122 + i * 7, top = 70 + i * 4; for (let y = top; y < 104; y++) for (let x = x0; x < x0 + 6; x++) B[y * 320 + x] = (y - top) % 3 === 1 && x % 2 ? hex('#7a8494') : DR.brumaS; }
  ladrillo(216, 319, 50, 116, 825); rect(216, 46, 319, 49, hex('#c8b8a0')); rect(216, 50, 319, 50, hex('#8a7a68'));
  for (const fy of [56]) for (const fx of [224, 250, 280, 302]) { rect(fx, fy, fx + 14, fy + 20, hex('#d8d0c0')); rect(fx + 1, fy + 1, fx + 13, fy + 19, k); rect(fx + 2, fy + 2, fx + 12, fy + 18, hex('#5a6478')); rect(fx + 1, fy + 10, fx + 13, fy + 10, hex('#d8d0c0')); }
  rect(222, 84, 262, 116, hex('#4a3a5a')); rect(226, 88, 258, 112, k); rect(227, 89, 257, 111, hex('#6a7488')); for (let x = 228; x < 257; x += 4) rect(x, 89, x, 111, hex('#5a6478'));
  // la acera mojada (losas con sus juntas, manchas y el reflejo de los escaparates) y el bordillo
  for (let y = 117; y < 141; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 826), refl = (x > 10 && x < 70 && y < 130) || (x > 156 && x < 208 && y < 132); B[y * 320 + x] = (x + (y >> 2)) % 24 === 0 || y === 117 ? DR.aceraS : refl && d_umRb(x, y) < 0.3 ? hex('#b8aa8a') : q < 0.07 ? DR.aceraS : q > 0.95 ? DR.aceraL : DR.acera; }
  for (let y = 120; y < 140; y += 7) rect(0, y, 319, y, d_mezRb(DR.acera, k, 0.12));
  rect(0, 141, 319, 141, DR.aceraL); rect(0, 142, 319, 143, DR.aceraS); rect(0, 144, 319, 144, hex('#2a2e36'));
  // la alcantarilla del bordillo (la boca con sus barrotes) y la tapa redonda en el asfalto
  rect(184, 141, 210, 144, k); for (let x = 186; x < 210; x += 3) rect(x, 142, x, 144, hex('#4a4e58'));
  // el asfalto mojado con su textura, los parches, la línea central y los reflejos
  for (let y = 145; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 827); B[y * 320 + x] = q < 0.07 ? DR.asfaltoS : q > 0.96 ? DR.asfaltoL : DR.asfalto; }
  for (let x = 0; x < 320; x += 34) rect(x, 166, x + 18, 167, hex('#c8b860'));
  for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) { const e = (i / 9.5) ** 2 + (j / 3.4) ** 2; if (e < 1) pset(60 + i, 172 + j, e > 0.7 ? k : (i + j) % 3 ? hex('#5a5e68') : hex('#46484e')); }
  // la farola de hierro y la cabina de teléfono (sin letras: el pictograma del auricular)
  rect(116, 60, 118, 140, k); rect(117, 60, 117, 140, C.metalD); rect(113, 138, 121, 140, k); rect(112, 54, 122, 60, k); rect(113, 55, 121, 59, hex('#f0e8c0'));
  rect(262, 84, 280, 140, k); rect(263, 85, 279, 139, hex('#7a8a9a')); rect(264, 92, 278, 132, hex('#9ab0c0')); rect(271, 92, 271, 132, k); rect(263, 85, 279, 90, hex('#3a5a8a')); d_pictoRb(R, ['#.....#', '##...##', '.#####.'], 268, 86, C.blanco);
  rect(265, 104, 269, 112, k); rect(266, 105, 268, 111, hex('#5a5a62'));
}

// las nubes grises de tres tonos, a tres velocidades (las lejanas, lentas y pequeñas)
function d_nubesGrisesRb(R, t) {
  const c = [DR.nube0, DR.nube1, DR.nube2];
  for (let k = 5; k >= 0; k--) { const lejos = k > 2, w = lejos ? 20 + k * 3 : 34 + k * 12, v = lejos ? 0.8 + k * 0.2 : 2.6 + k * 1.3, y = lejos ? 30 + (k - 3) * 6 : 10 + k * 9, x = ((h(k, 9, 828) * 480 + t * v) % 520) - 100;
    const n = 5 + Math.round(w / 14); for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = Math.round(w * (0.12 + 0.14 * Math.cos(u * Math.PI))), cx = Math.round(x + u * w), cy = Math.round(y - r * 0.3);
      if (cx + r < 0 || cx - r > 319) continue; R.disco(cx, cy + 2, r, c[0]); R.disco(cx, cy, r, c[1]); R.disco(cx - 1, cy - 2, Math.round(r * 0.6), c[2]); }
    R.rect(Math.round(x - w * 0.45), y + 2, Math.round(x + w * 0.45), y + 3, c[0]); }
}

// la lluvia ligera: rayitas inclinadas que caen (capa 1 detrás, 2 delante, más largas y menos), con su cantidad f 0–1
function d_lluviaRb(R, t, f, capa) {
  const n = Math.round((capa === 1 ? 140 : 26) * f), v = capa === 1 ? 170 : 230, l = capa === 1 ? 4 : 7;
  for (let i = 0; i < n; i++) { const x0 = h(i, capa, 829) * 360, y = ((h(i, capa, 830) * 200 + t * v) % 200) - 10, x = Math.round(x0 - y * 0.25) % 330;
    if (x > 274 && y < 46) continue;
    for (let j = 0; j < l; j++) { const yy = Math.round(y + j), xx = Math.round(x - j * 0.25); if (yy >= 0 && yy < 180) R.pset(xx, yy, j < l / 2 ? DR.gotaS : DR.gota); } }
  if (capa === 2) for (let i = 0; i < 6 * f; i++) { const u = (t * 2 + i * 0.37) % 1, x = Math.round(h(i, 7, 831) * 300 + 10), y = 120 + Math.round(h(i, 8, 831) * 20); if (u < 0.3) { R.pset(x - 1, y - 1, DR.gota); R.pset(x + 1, y - 1, DR.gota); R.pset(x, y - 2, DR.gota); } }
}

function d_calleRb(R, t, o) {
  const { rect, pset, disco, linea } = R, k = C.k, lluvia = o.lluvia ?? 1;
  d_capaRb(R, 'calle', () => d_calleFijaRb(R));
  // las nubes que pasan (por detrás de los edificios: se pintan solo sobre el cielo) y las gaviotas
  { R.recorte([120, 0, 319, 41]); d_nubesGrisesRb(R, t); R.recorte([216, 41, 319, 45]); d_nubesGrisesRb(R, t); R.recorte(null); }
  for (let g = 0; g < 3; g++) { const u = ((t * 0.05 + g * 0.31) % 1), x = Math.round(140 + u * 140 - g * 10), y = Math.round(16 + g * 6 + Math.sin(t * 1.5 + g) * 2), a = Math.sin(t * 7 + g * 2) > 0; if (x > 272) continue;
    pset(x, y, DR.gaviota); pset(x - 1, y - (a ? 1 : 0), DR.gaviota); pset(x + 1, y - (a ? 1 : 0), DR.gaviota); pset(x - 2, y - (a ? 2 : 0), DR.nube0); pset(x + 2, y - (a ? 2 : 0), DR.nube0); }
  // el escaparate de la tienda: las baldas con latas rojas (o.estanteRojo) y azules, una señora que pasa por dentro, el reflejo
  { R.recorte([11, 85, 69, 111]); for (let y = 85; y <= 111; y++) for (let x = 11; x <= 69; x++) pset(x, y, y % 9 === 0 ? hex('#8a6a4a') : hex('#e8dcc0'));
    const rojo = Math.max(0, Math.min(1, o.estanteRojo ?? 1)), nR = Math.round(rojo * 7);
    for (let fila = 0; fila < 3; fila++) { const by = 89 + fila * 9; rect(11, by + 6, 69, by + 7, hex('#8a6a4a'));
      for (let i = 0; i < 7; i++) { const lx = 13 + i * 4; if (fila === 2 ? i < Math.round(rojo * 7) : i < nR) { rect(lx, by, lx + 2, by + 5, C.rojoCola); pset(lx + 2, by + 1, C.rojoColaS); pset(lx, by, hex('#c8ccd4')); } }
      for (let i = 0; i < 6; i++) { const lx = 44 + i * 4; rect(lx, by, lx + 2, by + 5, C.azulCola); pset(lx + 2, by + 1, C.azulColaS); pset(lx, by, hex('#c8ccd4')); } }
    const s = (t * 0.12) % 1, sx = Math.round(4 + s * 70); d_figuraRb(R, sx, 112, 15, DR.ropa6, DR.pelo3, DR.piel1, 1, { paso: Math.floor(t * 4) % 2 });
    for (let i = 0; i < 40; i++) pset(14 + i, 108 - i * 0.6, hex('#f4f0e4')); for (let i = 0; i < 20; i++) pset(40 + i, 108 - i * 0.6, hex('#f4f0e4'));
    R.recorte(null); rect(39, 84, 40, 112, k); }
  // el toldo a rayas verde y crema con su volante, que el viento mueve un poco y que gotea
  for (let x = 2; x <= 74; x++) { const m = Math.round(Math.sin(t * 2 + x * 0.2) * 0.6); for (let y = 74; y <= 82 + m; y++) pset(x, y, ((x >> 2) % 2 ? DR.toldo : DR.toldoL)); pset(x, 74, k); if (x % 4 === 0) pset(x, 83 + m, (x >> 2) % 2 ? DR.toldo : DR.toldoL); }
  for (let x = 2; x <= 74; x++) pset(x, 83 + Math.round(Math.sin(t * 2 + x * 0.2) * 0.6), x % 4 < 2 ? d_mezRb(DR.toldo, k, 0.3) : d_mezRb(DR.toldoL, k, 0.2));
  for (let i = 0; i < 5; i++) { const u = (t * 1.1 + i * 0.29) % 1, gx = 6 + i * 16, gy = Math.round(85 + u * u * 32); if (gy < 117) pset(gx, gy, DR.gota); else if (u > 0.95) { pset(gx - 1, 117, DR.gota); pset(gx + 1, 117, DR.gota); } }
  // la calle que cruza al fondo: la manifestación pequeña de paraguas y cartelitos que pasa de derecha a izquierda
  { R.recorte([119, 70, 149, 116]);
    for (let i = 0; i < 9; i++) { const x = Math.round(112 + ((i * 5.3 - t * 5) % 46 + 46) % 46), suelo = 105 + (i % 3), dir = -1;
      d_figuraRb(R, x, suelo, 10, [DR.ropa1, DR.ropa2, DR.ropa3, DR.ropa4][i % 4], [DR.pelo1, DR.pelo2, DR.pelo3][i % 3], [DR.piel1, DR.piel2, DR.piel3][i % 3], dir, { paso: Math.floor(t * 4 + i) % 2, paraguas: i % 3 === 0 ? [hex('#2a2a3a'), hex('#c84a3a'), hex('#3a6ab8')][i % 3 === 0 ? (i / 3) % 3 : 0] : null, cartel: i % 3 === 1 ? 'lata' : i % 3 === 2 ? 'roto' : null }); }
    R.recorte(null); }
  // los de dentro de la cafetería: el camarero que va y viene detrás de la barra
  { R.recorte([156, 87, 208, 111]); const u = (Math.sin(t * 0.6) + 1) / 2, x = Math.round(176 + u * 24); d_figuraRb(R, x, 104, 14, DR.ropa5, DR.pelo1, DR.piel2, u > 0.5 ? 1 : -1, {}); rect(156, 104, 208, 111, hex('#8a5a3a')); rect(156, 104, 208, 104, hex('#a8744a')); R.recorte(null); }
  // las dos pancartas apoyadas en la pared, junto a la puerta de la tienda
  PIEZAS_NC.pancarta?.(R, 86, 140, { dibujo: 'lata' }); PIEZAS_NC.pancarta?.(R, 110, 141, { dibujo: 'corazon' });
  // la furgoneta de la tele local (sin letras: el ojo de la cámara pintado) con su mástil y la antena parabólica
  { const vx = 222; rect(vx, 104, vx + 40, 141, k); rect(vx + 1, 105, vx + 39, 136, hex('#e8e8ec')); rect(vx + 1, 128, vx + 39, 136, hex('#3a6ab8')); rect(vx + 30, 108, vx + 38, 120, hex('#5a6478')); linea(vx + 31, 118, vx + 37, 110, hex('#9aa8b8'));
    disco(vx + 14, 116, 6, k); disco(vx + 14, 116, 5, hex('#3a6ab8')); disco(vx + 14, 116, 2, k); pset(vx + 13, 115, C.blanco);
    for (const dx of [8, 32]) { disco(vx + dx, 139, 4, k); disco(vx + dx, 139, 2, C.metal); }
    rect(vx + 6, 70, vx + 7, 104, C.metalS); rect(vx + 6, 70, vx + 6, 104, C.metalL); for (let i = -5; i <= 5; i++) pset(vx + 7 + i, 66 + Math.round(i * i * 0.12), C.metalL); rect(vx + 7, 66, vx + 7, 70, C.metalD);
    if (Math.floor(t * 2) % 2) pset(vx + 7, 65, C.rojo); }
  // la cámara de la tele en su trípode, con la luz roja que se enciende
  { const cx = 206, cy = 112; linea(cx, cy + 6, cx - 7, 140, k); linea(cx, cy + 6, cx + 7, 140, k); linea(cx, cy + 6, cx, 140, k); rect(cx - 9, cy - 2, cx + 7, cy + 6, k); rect(cx - 8, cy - 1, cx + 6, cy + 5, hex('#3a3a46')); rect(cx - 8, cy - 1, cx + 6, cy, hex('#5a5a6a')); rect(cx - 13, cy, cx - 9, cy + 4, k); disco(cx - 13, cy + 2, 2, hex('#6a8ab0')); if (Math.floor(t * 1.5) % 2) pset(cx + 4, cy + 1, C.rojo); }
  // el camión de reparto aparcado a la derecha (furgón de caja lisa, sin marcas), con el conductor dentro
  { const tx = 266; rect(tx, 96, tx + 56, 150, k); rect(tx + 1, 97, tx + 40, 146, hex('#e0dcd0')); for (let x = tx + 4; x < tx + 40; x += 6) rect(x, 98, x, 144, hex('#c8c4b8')); rect(tx + 1, 140, tx + 40, 146, hex('#c84a3a'));
    rect(tx + 41, 112, tx + 55, 146, hex('#c84a3a')); rect(tx + 43, 114, tx + 54, 126, hex('#5a6478')); R.recorte([tx + 43, 114, tx + 54, 126]); d_figuraRb(R, tx + 49, 130, 14, DR.ropa3, DR.pelo4, DR.piel3, -1, {}); R.recorte(null); linea(tx + 44, 124, tx + 52, 116, hex('#9aa8b8'));
    for (const dx of [12, 46]) { disco(tx + dx, 148, 6, k); disco(tx + dx, 148, 3, C.metal); pset(tx + dx - 1, 147, C.metalL); } rect(tx, 150, tx + 56, 152, d_mezRb(DR.asfalto, k, 0.4)); }
  // los charcos con el reflejo del cielo y las ondas de las gotas
  for (const [cx, cy, rx] of [[30, 158, 16], [140, 172, 22], [222, 156, 12], [96, 132, 10]]) { for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 3.5) ** 2 < 1) pset(cx + i, cy + j, d_umRb(cx + i, cy + j) < 0.5 + j * 0.1 ? DR.reflejo : (cy > 141 ? hex('#5a6478') : DR.aceraS));
    for (let r = 0; r < 2; r++) { const u = (t * 1.6 + r * 0.5 + cx * 0.01) % 1, rr = Math.round(1 + u * 5), ox = cx + Math.round((h(Math.floor(t * 1.6 + r * 0.5), cx, 832) - 0.5) * rx); if (u < 0.8) for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(ox + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr * 0.35), DR.gota); } }
  // un coche que pasa por la calle cada 11 s salpicando (por debajo de los pies de la gente de la acera)
  { const u = (t % 11) / 3.2; if (u < 1) { const x = Math.round(-50 + u * 420), y = 164; rect(x - 24, y - 10, x + 24, y - 2, k); rect(x - 23, y - 9, x + 23, y - 3, hex('#7a5a3a')); rect(x - 23, y - 9, x + 23, y - 8, hex('#9a7a5a')); rect(x - 13, y - 17, x + 11, y - 10, k); rect(x - 12, y - 16, x + 10, y - 11, hex('#6a7a8a')); rect(x - 1, y - 16, x, y - 11, k); pset(x + 23, y - 7, hex('#f8f0b0'));
      for (const dx of [-14, 14]) { disco(x + dx, y - 1, 4, k); disco(x + dx, y - 1, 2, C.metal); } for (let i = 0; i < 8; i++) pset(x - 26 - i * 2, y - 2 - Math.round(Math.sin(i * 0.6 + t * 20) * 2) - (i % 3), DR.gota); } }
  d_lluviaRb(R, t, lluvia, 1);
  return { suelo: 138, acera: [117, 140], bordillo: 141, alcantarilla: [197, 141], tienda: { escaparate: [10, 84, 70, 112], puerta: [79, 85, 97, 116] }, cabina: [262, 84, 280, 140], furgoneta: [222, 104, 262, 141], camaraTele: [206, 112], camion: [266, 96, 322, 150], pancartas: [[86, 140], [110, 141]], libre: [[0, 80, 138], [122, 220, 138]] };
}

const d_SUELO_SOT = 156;

function d_sotanoFijoRb(R) {
  const { rect, pset, linea, disco } = R, B = R.buf, k = C.k;
  // la pared de bloques de hormigón: hiladas de 8 × 16 con su junta, el moteado, las manchas de humedad y la eflorescencia
  for (let y = 18; y < 140; y++) for (let x = 0; x < 320; x++) { const f = ((y - 18) / 8) | 0, m = (x + (f % 2) * 8) % 16, junta = (y - 18) % 8 === 7 || m === 15, q = h(x, y, 840), hum = h(x >> 4, y >> 3, 841) * 0.6 + Math.sin(x * 0.05) * 0.2 + (y - 18) / 240;
    B[y * 320 + x] = junta ? DR.juntaB : hum > 0.78 && d_umRb(x, y) < 0.6 ? DR.humedad : q < 0.1 ? DR.bloqueS : q > 0.93 ? DR.bloqueL : m < 1 || (y - 18) % 8 === 0 ? DR.bloqueL : DR.bloque; }
  for (let i = 0; i < 4; i++) { const x0 = 60 + i * 70; for (let y = 18; y < 60 + i * 9; y++) if (h(i, y, 842) < 0.7) pset(x0 + Math.round(Math.sin(y * 0.2 + i) * 2), y, DR.humedad); }
  // el techo: el entarimado de arriba visto por debajo y las vigas con su veta, más oscuro hacia la esquina de Atom
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x % 5 === 0) ? DR.vigaS : h(x >> 1, y, 843) < 0.12 ? DR.vigaS : d_mezRb(DR.viga, k, 0.25 + (x > 260 ? 0.15 : 0));
  for (let i = 0; i < 9; i++) { const vx = 8 + i * 38; rect(vx, 0, vx + 8, 22, k); rect(vx + 1, 0, vx + 7, 21, DR.viga); rect(vx + 1, 0, vx + 2, 21, DR.vigaL); rect(vx + 6, 0, vx + 7, 21, DR.vigaS); for (let y = 2; y < 21; y += 5) pset(vx + 4, y, DR.vigaS); }
  // las tuberías de cobre y la de desagüe, con sus abrazaderas
  rect(0, 12, 319, 13, hex('#b8743a')); rect(0, 12, 319, 12, hex('#e0a060')); for (let x = 20; x < 320; x += 38) rect(x, 11, x + 1, 14, C.metalD);
  rect(0, 24, 140, 27, hex('#5a5a62')); rect(0, 24, 140, 24, hex('#7a7a84')); rect(140, 24, 143, 60, hex('#5a5a62'));
  // el ventanuco a ras de calle (la lluvia y los pies van aparte)
  rect(198, 22, 244, 42, k); rect(199, 23, 243, 41, hex('#d8d0c0')); rect(201, 25, 241, 39, k);
  // el suelo de hormigón con grietas, manchas, el sumidero y la alfombrilla delante de la lavadora
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 844); B[y * 320 + x] = y === 140 ? DR.hormigonS : q < 0.08 ? DR.hormigonS : q > 0.94 ? DR.hormigonL : d_umRb(x, y) < (y - 140) / 80 ? DR.hormigonL : DR.hormigon; }
  for (const [x0, y0, l] of [[110, 150, 18], [210, 168, 22], [20, 172, 12]]) for (let i = 0; i < l; i++) pset(x0 + i, y0 + Math.round(Math.sin(i * 0.8 + x0) * 1.5) + (i >> 2), DR.hormigonS);
  disco(138, 168, 4, k); disco(138, 168, 3, C.metalD); for (let i = -2; i <= 2; i += 2) rect(136, 168 + i, 140, 168 + i, k);
  for (let y = 158; y < 172; y++) for (let x = 22; x < 62; x++) pset(x, y, (x + y) % 4 < 2 ? hex('#8a5a6a') : hex('#6a4a5a'));
  // la lavadora y la secadora color almendra de los ochenta, bajo la escalera, con su panel de botones
  for (const [lx, ojo] of [[24, true], [46, false]]) { rect(lx, 110, lx + 20, 156, k); rect(lx + 1, 111, lx + 19, 155, DR.almendra); rect(lx + 17, 111, lx + 19, 155, DR.almendraS); rect(lx + 1, 111, lx + 19, 118, hex('#8a6a4a')); rect(lx + 1, 117, lx + 19, 118, DR.almendraS);
    for (const bx of [4, 9, 14]) disco(lx + bx, 114, 1, DR.almendra); rect(lx + 3, 152, lx + 17, 155, DR.almendraS);
    if (ojo) { disco(lx + 10, 133, 7, k); disco(lx + 10, 133, 6, C.metalS); disco(lx + 10, 133, 5, hex('#5a6a7a')); } else { rect(lx + 3, 122, lx + 17, 140, DR.almendraS); rect(lx + 4, 123, lx + 16, 139, DR.almendra); rect(lx + 7, 141, lx + 13, 142, C.metalD); } }
  // el calentador de agua con su tubo
  rect(4, 104, 20, 156, k); rect(5, 105, 19, 155, hex('#c8c4b8')); rect(16, 105, 19, 155, hex('#a8a498')); disco(12, 104, 7, k); rect(5, 101, 19, 105, hex('#c8c4b8')); rect(10, 92, 13, 101, C.metalS); rect(10, 138, 14, 142, hex('#c8a040'));
  // el tablero de herramientas perforado con el martillo, la sierra, las llaves y el rollo de cinta
  rect(112, 52, 166, 92, k); rect(113, 53, 165, 91, hex('#c8a070')); for (let y = 55; y < 91; y += 4) for (let x = 115; x < 165; x += 4) pset(x, y, hex('#8a6a48'));
  rect(118, 58, 120, 76, hex('#7a4a2a')); rect(115, 56, 123, 59, C.metalD); rect(128, 58, 146, 64, C.metalL); rect(128, 64, 146, 65, C.metalS); for (let x = 129; x < 146; x += 2) pset(x, 66, C.metalS); rect(146, 57, 152, 66, hex('#8a3a2a'));
  for (let i = 0; i < 4; i++) rect(130 + i * 6, 72, 131 + i * 6, 84 + i, C.metalS); disco(158, 80, 4, k); disco(158, 80, 3, hex('#d8c060')); disco(158, 80, 1, k);
  // la estantería metálica con botes de pintura, una lámpara vieja y una caja de adornos
  rect(284, 60, 318, 62, C.metalD); rect(284, 100, 318, 102, C.metalD); rect(284, 60, 285, 140, C.metalD);
  for (let i = 0; i < 3; i++) { const bx = 288 + i * 10; rect(bx, 89, bx + 8, 99, k); rect(bx + 1, 90, bx + 7, 98, C.metalL); rect(bx + 1, 93, bx + 7, 96, [hex('#c84a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#4a8a5a'), hex('#e8e0d0')][i]); pset(bx + 3, 90, C.metalS); }
  // en la estantería: la caja de los adornos de Navidad con su espumillón, la lámpara vieja y, abajo, botes y un termo
  rect(288, 48, 304, 59, k); rect(289, 49, 303, 59, DR.carton ?? hex('#c8a06a')); for (let x = 289; x < 304; x++) pset(x, 49 + (x % 3 === 0 ? 0 : 1), x % 2 ? hex('#d84a4a') : hex('#e8c040')); disco(294, 47, 2, hex('#4a9a5a')); disco(299, 47, 2, hex('#c84a3a'));
  rect(308, 44, 316, 46, k); rect(309, 45, 315, 45, hex('#e8d8a0')); rect(312, 47, 312, 58, C.metalD); rect(309, 58, 315, 59, k);
  rect(284, 128, 318, 130, C.metalD); for (let i = 0; i < 3; i++) { const bx = 288 + i * 10; rect(bx, 118, bx + 8, 127, k); rect(bx + 1, 119, bx + 7, 127, [hex('#d8d0c0'), hex('#5a8ab8'), hex('#c8c4b8')][i]); rect(bx + 1, 119, bx + 7, 120, C.metalS); }
  rect(288, 106, 312, 112, k); rect(289, 107, 311, 111, hex('#4a6a3a')); rect(289, 107, 311, 107, hex('#6a8a5a'));
  // la escalera de madera que baja desde la izquierda: zancas, peldaños con su canto y su sombra, la barandilla
  for (let i = 0; i < 10; i++) { const sx = 6 + i * 11, sy = 34 + i * 13; rect(sx, sy, sx + 17, sy + 3, k); rect(sx + 1, sy, sx + 16, sy + 1, DR.vigaL); rect(sx + 1, sy + 2, sx + 16, sy + 2, DR.viga); rect(sx, sy + 4, sx + 17, sy + 4, d_mezRb(DR.bloque, k, 0.45)); }
  linea(4, 36, 104, 154, k); linea(5, 36, 105, 154, DR.vigaS); linea(6, 36, 106, 154, k);
  for (let i = 0; i < 10; i++) { const px = 12 + i * 11, py = 20 + i * 13; rect(px, py, px + 1, py + 14, DR.vigaS); pset(px, py, DR.vigaL); } linea(10, 20, 112, 138, k); linea(10, 19, 112, 137, DR.vigaL);
  // todo el sótano en penumbra fría: la luz la pone la bombilla en cada fotograma
  { const fr = hex('#1a1626'); for (let n = 0; n < 320 * 180; n++) B[n] = d_mezRb(B[n], fr, 0.34); }
}

function d_sotanoRb(R, t, o) {
  const { rect, pset, disco, linea } = R, rc = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, c); }, k = C.k, nc = Math.max(5, Math.min(9, o.cajas ?? 7)), tamb = Math.max(0, Math.min(1, o.tambalea ?? 0));
  d_capaRb(R, 'sotano', () => d_sotanoFijoRb(R));
  // por el ventanuco: la lluvia en la acera y los pies que pasan (recortados a su hueco)
  { R.recorte([202, 26, 240, 38]); for (let y = 26; y <= 38; y++) for (let x = 202; x <= 240; x++) pset(x, y, y > 33 ? DR.acera : DR.bruma);
    for (let i = 0; i < 2; i++) { const u = ((t * 0.16 + i * 0.5) % 1), x = Math.round(198 + u * 52), p = Math.floor(t * 5 + i) % 2; rc(x, 28, x + 2, 35, DR.tinta); rc(x + 4, 28 + p, x + 6, 35, d_mezRb(DR.tinta, k, 0.3)); rc(x, 35, x + 4, 36, k); rc(x + 4, 35, x + 8, 36, k); }
    for (let i = 0; i < 12; i++) { const x = 202 + ((i * 7) % 38), y = 26 + Math.round(((h(i, 3, 845) * 12 + t * 40) % 12)); pset(x, y, DR.gota); }
    R.recorte(null); for (let x = 202; x < 241; x += 10) rect(x, 26, x, 38, hex('#d8d0c0')); rect(202, 32, 240, 32, hex('#d8d0c0')); }
  // las torres de cajas de latas rojas a la derecha, hasta el techo (bajo la esquina de Atom, más bajas y en sombra)
  const caja = (x, y, ab) => PIEZAS_NC.cajaLatas?.(R, x, y, { color: 'rojo', abierta: ab });
  for (const [cx, n, base] of [[208, 6, d_SUELO_SOT], [262, 6, d_SUELO_SOT + 2], [236, 5, d_SUELO_SOT - 4]]) for (let i = 0; i < n; i++) { const y = base - i * 15; if (y - 16 < 18) break; if (cx > 276 && y - 16 < 48) break; caja(cx + ((i * 3) % 4) - 2, y, i === n - 1 && cx === 244); }
  // la torre del centro, la que se tambalea: cuanto más alta la caja, más se mueve
  const tx = 168, top = [];
  for (let i = 0; i < nc; i++) { const y = d_SUELO_SOT - i * 15, sw = tamb * Math.sin(t * 9) * (i * i) * 0.18 + (i > 0 ? Math.sin(i * 2.1) * 1.5 : 0), x = Math.round(tx + sw); caja(x, y, false); top[0] = x; top[1] = y - 16; }
  // la bombilla que se mece colgada de su cable, con la cadenita, y su luz cálida que se mueve por la pared
  const ang = Math.sin(t * 1.4) * 0.22 + tamb * Math.sin(t * 9) * 0.08, bx = Math.round(120 + Math.sin(ang) * 40), by = Math.round(18 + Math.cos(ang) * 40);
  R.linea(120, 18, bx, by - 3, k);
  for (let y = 22; y < 180; y += 1) { const w = (y - by) * 0.9; if (y < by) continue; const x0 = Math.round(bx - 40 - w), x1 = Math.round(bx + 40 + w);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x += 1) { const d = Math.hypot(x - bx, (y - by) * 1.2) / (110 + (y - by) * 0.3); if (d < 1) { const q = (1 - d) * 1.6 + (d_umRb(x, y) - 0.5) * 0.3, a = q > 1.1 ? 0.42 : q > 0.75 ? 0.3 : q > 0.4 ? 0.18 : q > 0.12 ? 0.08 : 0; if (a) R.pset(x, y, d_mezRb(R.pget(x, y), DR.luzB, a)); } } }
  rect(bx - 2, by - 3, bx + 2, by - 1, C.metalS); disco(bx, by + 2, 3, hex('#fff4c8')); pset(bx - 1, by + 1, C.blanco); linea(bx + 1, by - 1, bx + 6, by + 12, C.metalL); pset(bx + 6, by + 13, C.metalD);
  for (let i = 0; i < 4; i++) { const a = t * 4 + i * 1.57; pset(Math.round(bx + Math.cos(a) * 6), Math.round(by + 2 + Math.sin(a) * 6), hex('#fff0b0')); }
  return { suelo: d_SUELO_SOT, escalera: { arriba: [10, 34], abajo: [104, 151], peldaño: [11, 13] }, torre: { x: tx, base: d_SUELO_SOT, tope: top }, bombilla: [bx, by], ventanuco: [201, 25, 241, 39], lavadora: [24, 110, 66, 156], libre: [[100, 150, d_SUELO_SOT]] };
}

// la paleta propia de los decorados de hoy
const e_P = Object.fromEntries(Object.entries({
  k: '#1c1222', blanco: '#f6f8fa',
  papel: '#e4d2a8', papelS: '#cfb98c', papelL: '#f0e0bc', papelR: '#d6a87c', moldura: '#f2e8d4', molduraS: '#c8b898',
  friso: '#8a5634', frisoS: '#5e3820', frisoL: '#a86e44', frisoV: '#744628',
  tabla: '#a8703e', tablaS: '#7e4e28', tablaL: '#c08650', tablaJ: '#5a3418', sol: '#e0aa6a',
  alf: '#8a3a48', alfS: '#5e2432', alfL: '#c8a070', alfB: '#2e4a6a',
  marco: '#f2ece0', marcoS: '#b8ae9c',
  cielo0: '#5a98d8', cielo1: '#78b0e4', cielo2: '#a0cbee', nubeS: '#b8c8de', nube: '#e2ecf6', nubeL: '#ffffff',
  edif0: '#9aaec4', edif1: '#7c92ac', edif2: '#62788f', edifV: '#cfe0ee', edifO: '#4e6276',
  hoja: '#4a8a3a', hojaS: '#2e6224', hojaL: '#7ab85a', tronco: '#6a4a2a', troncoS: '#4a3018',
  cortina: '#b84a3a', cortinaS: '#8a3226', cortinaL: '#d86a52',
  libro: ['#c8382e', '#2e5aa8', '#4a8a4a', '#d8a838', '#7a4a8a', '#3a7a8a', '#c86a2a', '#e4d8bc', '#5a3a2a'],
  corcho: '#c8945a', corchoS: '#a0703a', corchoL: '#dcae74',
  monitor: '#2a2e36', pantA: '#18324a', pantL: '#4ab0e8',
  panel: '#d4dce4', panelS: '#b2bdc8', panelL: '#eaf0f5', perf: '#bcc6d0', zocalo: '#6a7684',
  vinilo: '#bcc8d0', viniloS: '#9eacb6', viniloL: '#d6e0e6', viniloJ: '#a4b2bc',
  techo: '#e6ebef', techoS: '#c4ccd4', luz: '#fbfdff',
  gris: '#c8ced6', grisS: '#8e98a4', grisD: '#5a6470', grisK: '#3a424e',
  carc: '#f2f4f6', carcS: '#c6ccd4', carcD: '#9aa2ae', azul: '#3a6ad8', azulS: '#2a4aa0', azulL: '#7aa0f0',
  tunel: '#1a2232', tunelL: '#6a8ad8', manta: '#a8c8e8', mantaS: '#7aa0c8', mantaL: '#d0e4f6',
  amarillo: '#f0c838', amarilloS: '#a8862a', rojo: '#d83a3a', rojoS: '#8a2020', verde: '#56d07a', verdeS: '#2a7a44',
  ctrl: '#3a4250', ctrlS: '#2a303c', ctrlL: '#4e5868', pantN: '#0c1424', pantR: '#1a3048',
  beige: '#d8ccb0', beigeS: '#a89c80', beigeL: '#ece2cc',
  moqueta: '#5a6478', moquetaS: '#4a5266', moquetaL: '#6a7488',
  bloque: '#e8e0cc', bloqueS: '#d0c6ae', bloqueL: '#f4eedc', junta: '#bcb298',
  piz: '#2e5440', pizS: '#24463a', pizL: '#3c6450', pizM: '#47705a', alu: '#c8ccd4', aluS: '#8a909c',
  tiza: '#eceee6', tizaS: '#b8c4b8', tizaR: '#ec8a86', tizaA: '#f2d870', tizaP: '#f4a8c8',
  grada: '#8a6a4a', gradaS: '#6a4e34', gradaL: '#a8865e', asiento: '#3a4a6a', asientoS: '#2a3650',
  escenario: '#b07a48', escenarioS: '#86562e', escenarioL: '#c8925c',
  piel: ['#f0c8a0', '#c89070', '#8a5a3a', '#e8b890', '#a87050'], ropa: ['#c84a4a', '#3a6aa8', '#5a9a5a', '#d8a838', '#7a5a9a', '#3a8a8a', '#e8e4dc'],
  pelo: ['#3a2418', '#1c1410', '#8a5a2a', '#d8b060', '#5a3a28'],
}).map(([k, v]) => [k, Array.isArray(v) ? v.map((c) => hex(c)) : hex(v)]));

// la capa fija de cada encuadre: se pinta una sola vez en un búfer y en cada fotograma se copia entera
const e_CAPAS = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = e_CAPAS.get(R); if (!m) e_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); la recorta R.recorte
function e_nube(R, x, y, w) {
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.14, 0.25], [0.14, -0.1, 0.2]];
  for (const [dx, dy, r] of B) R.disco(x + dx * w, y + dy * w + 1, r * w, e_P.nubeS);
  for (const [dx, dy, r] of B) R.disco(x + dx * w, y + dy * w, r * w, e_P.nube);
  for (const [dx, dy, r] of B) R.disco(x + dx * w - 1, y + dy * w - 1, r * w * 0.62, e_P.nubeL);
}

// el cielo de una ventana [x0, y0, x1, y1]: degradado tramado en tres tonos, nubes a tres velocidades y pájaros; deja
// puesto el recorte de la ventana (quien llama lo quita con R.recorte(null))
function e_cieloVentana(R, x0, y0, x1, y1, t, k = 0) {
  const alto = y1 - y0 + 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / alto; for (let x = x0; x <= x1; x++) { const v = u * 2 + (((x + y * 3) % 4) / 4 - 0.4) * 0.5; R.pset(x, y, v < 0.7 ? e_P.cielo0 : v < 1.4 ? e_P.cielo1 : e_P.cielo2); } }
  R.recorte([x0, y0, x1, y1]);
  const w = x1 - x0 + 40;
  for (const [v, yy, ww, f] of [[1.2, 0.18, 22, 0], [2.4, 0.34, 16, 0.5], [4.2, 0.5, 11, 0.25]]) e_nube(R, x0 - 20 + ((t * v + f * w + k * 37) % w), y0 + alto * yy, ww);
  const ciclo = 9, u = ((t + k * 2) % ciclo) / ciclo;
  if (Math.floor((t + k * 2) / ciclo) % 2 === 0) for (let p = 0; p < 3; p++) { const bx = Math.round(x0 - 8 + u * (x1 - x0 + 16) - p * 5), by = Math.round(y0 + 8 + p * 2 + Math.sin(t * 2 + p) * 1.5), al = Math.sin(t * 14 + p) > 0;
    R.pset(bx, by, e_P.k); R.pset(bx - 1, by - (al ? 1 : 0), e_P.k); R.pset(bx + 1, by - (al ? 1 : 0), e_P.k); }
}

// un árbol de copa redonda que se mece (x: el pie del tronco, suelo, alto); la copa en tres tonos con hojas sueltas
function e_arbol(R, x, suelo, alto, t, k = 0) {
  const m = Math.sin(t * 1.2 + k) * 1.4, cx = x + m, cy = suelo - alto;
  R.rect(x - 1, cy + 6, x + 1, suelo, e_P.tronco); R.rect(x + 1, cy + 6, x + 1, suelo, e_P.troncoS);
  const B = [[0, 0, 9], [-7, 4, 7], [7, 4, 7], [-3, -5, 7], [4, -4, 6]];
  for (const [dx, dy, r] of B) R.disco(cx + dx, cy + dy + 1, r, e_P.hojaS);
  for (const [dx, dy, r] of B) R.disco(cx + dx - 1, cy + dy, r - 1, e_P.hoja);
  for (const [dx, dy, r] of B) R.disco(cx + dx - 2, cy + dy - 2, Math.max(1, r - 4), e_P.hojaL);
  for (let i = 0; i < 10; i++) { const a = h(i, k, 5) * 6.28, d = 4 + h(i, k, 6) * 6; R.pset(Math.round(cx + Math.cos(a) * d + Math.sin(t * 3 + i) * 0.6), Math.round(cy + Math.sin(a) * d * 0.8), i % 2 ? e_P.hojaS : e_P.hojaL); }
}

// tablas de madera: franjas horizontales de alto variable con juntas al tresbolillo, vetas y nudos
function e_tablas(R, x0, y0, x1, y1, cols, k = 0) {
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

// la lata lisa de la serie (PIEZAS_NC.lata) o, si el reparto no la trae, un cilindro del mismo color
function e_lata(R, x, y, o) {
  if (PIEZAS_NC.lata) { PIEZAS_NC.lata(R, x, y, o); return; }
  const s = o.s ?? 1, c = o.color === 'azul' ? C.azulCola : C.rojoCola; R.rect(x - 5 * s, y - 17 * s, x + 5 * s, y - 1, c);
}

// geometría: suelo (pies) 150–168 (por omisión 158); pared/suelo en y 138; ventana x 18–92 y 22–96 (alféizar y 97, el
// gato en x 34); escritorio x 100–200 con el tablero en y 112 (latas: roja x 134, azul x 148, de pie en y 112; flexo
// x 108; monitor x 160–194); estantería x 206–266 y 34–138 (baldas en y 56, 78, 100, 122); puerta x 276–312 y 58–138
// (pomo en x 280, y 100); lámpara de techo en x 198; libres para los personajes: x 30–280 en el suelo (delante del
// escritorio, en x 100–200, quien esté queda por delante de él).
function e_estudio(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P;
  e_capa(R, 'nc-estudio', () => {
    // el papel pintado: rayas anchas y finas con un dibujo de rombos tenue; la moldura de arriba
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const m = x % 16; let c = m < 2 ? P.papelS : m === 8 ? P.papelL : P.papel;
      if (m > 3 && m < 13 && ((Math.abs(m - 8) + Math.abs((y % 12) - 6)) === 4)) c = P.papelR; if (h(x, y, 3) > 0.985) c = P.papelS; pset(x, y, c); }
    rect(0, 0, 319, 4, P.moldura); rect(0, 5, 319, 5, P.molduraS); rect(0, 6, 319, 6, P.papelS);
    // el friso de madera con sus cuarterones (marco, plafón con vetas, brillo arriba y sombra abajo) y el zócalo
    rect(0, 97, 319, 101, P.frisoL); rect(0, 97, 319, 97, P.moldura); rect(0, 101, 319, 101, P.frisoS);
    rect(0, 102, 319, 137, P.friso);
    for (let x = 0; x < 320; x += 40) { rect(x + 4, 106, x + 35, 130, P.frisoS); rect(x + 5, 107, x + 35, 130, P.frisoV); rect(x + 5, 107, x + 34, 107, P.frisoS); rect(x + 5, 130, x + 35, 130, P.frisoL); rect(x + 35, 107, x + 35, 130, P.frisoL);
      for (let i = 0; i < 7; i++) { const vy = 110 + Math.floor(h(x, i, 7) * 18); rect(x + 7 + Math.floor(h(x, i, 8) * 10), vy, x + 14 + Math.floor(h(x, i, 9) * 18), vy, i % 2 ? P.frisoS : P.friso); } }
    rect(0, 132, 319, 137, P.frisoS); rect(0, 132, 319, 132, P.frisoL);
    // el suelo de tablas, la alfombra de dibujo geométrico con su fleco y la mancha de sol de la ventana
    e_tablas(R, 0, 138, 319, 179, [P.tabla, P.tablaS, P.tablaL, P.tablaJ]);
    for (let y = 140; y < 180; y++) { const a = 26 + (y - 140) * 0.9, b = 104 + (y - 140) * 0.9; for (let x = Math.round(a); x < b; x++) if ((x + y) % 2 === 0) pset(x, y, P.sol); }
    for (let y = 150; y <= 172; y++) { const dy = (y - 161) / 11.5; const w = Math.round(84 * Math.sqrt(Math.max(0, 1 - dy * dy))); for (let x = 166 - w; x <= 166 + w; x++) { const dx = (x - 166) / 84, r = dx * dx + dy * dy;
      pset(x, y, r > 0.86 ? P.alfS : r > 0.72 ? P.alfL : r > 0.6 ? P.alf : ((Math.abs(x - 166) >> 2) + (y >> 1)) % 4 === 0 ? P.alfB : r < 0.12 ? P.alfL : P.alf); } }
    for (let x = 86; x < 248; x += 3) pset(x, 173, P.alfL);
    // la ventana: marco blanco, alféizar y radiador debajo con sus aletas y la llave
    rect(16, 20, 94, 98, P.k); rect(17, 21, 93, 97, P.marco); rect(17, 95, 93, 97, P.marcoS);
    rect(12, 96, 98, 100, P.k); rect(13, 97, 97, 99, P.marco); rect(13, 99, 97, 99, P.marcoS);
    rect(26, 106, 84, 128, P.k); rect(27, 107, 83, 127, P.marco); for (let x = 29; x < 82; x += 4) { rect(x, 108, x + 1, 126, P.marcoS); pset(x, 108, P.blanco); }
    rect(27, 107, 83, 108, P.blanco); rect(84, 120, 88, 122, P.grisD); disco(89, 121, 2, P.rojoS); rect(28, 129, 30, 133, P.grisD); rect(80, 129, 82, 133, P.grisD);
    // el cuadro con un paisaje (colinas, sol, un lago)
    rect(112, 28, 150, 56, P.k); rect(113, 29, 149, 55, P.frisoL); rect(115, 31, 147, 53, P.k);
    rect(116, 32, 146, 41, P.cielo1); rect(116, 32, 146, 34, P.cielo0); disco(138, 37, 3, P.amarillo);
    poligono([[116, 46], [126, 39], [134, 44], [142, 40], [147, 45], [147, 53], [116, 53]], P.hoja); poligono([[116, 49], [124, 45], [132, 49], [116, 53]], P.hojaS);
    rect(124, 49, 140, 52, P.cielo0); rect(126, 50, 132, 50, P.cielo2); rect(113, 29, 149, 29, P.moldura);
    // el corcho con notas (rayas, sin letras), una foto y la gráfica de barras
    rect(104, 62, 160, 92, P.k); rect(105, 63, 159, 91, P.frisoL); rect(107, 65, 157, 89, P.corcho);
    for (let i = 0; i < 90; i++) pset(107 + Math.floor(h(i, 1, 11) * 51), 65 + Math.floor(h(i, 2, 11) * 25), i % 2 ? P.corchoS : P.corchoL);
    for (const [x, y, c] of [[110, 68, P.amarillo], [128, 66, P.blanco], [146, 70, P.tizaP]]) { rect(x, y, x + 10, y + 10, c); for (let j = y + 3; j < y + 9; j += 2) rect(x + 2, j, x + 7 + (j % 3), j, P.grisD); pset(x + 5, y, P.rojo); }
    rect(112, 80, 124, 89, P.blanco); rect(113, 81, 123, 87, P.cielo1); rect(113, 85, 123, 87, P.hoja); disco(118, 84, 1, P.rojo); pset(118, 79, P.azul);
    rect(130, 78, 152, 89, P.blanco); for (const [i, v] of [[0, 3], [1, 5], [2, 7], [3, 4], [4, 9]]) rect(133 + i * 4, 87 - v, 135 + i * 4, 87, i === 4 ? P.rojo : P.azul); pset(141, 77, P.verde);
    // la estantería: costados, baldas con sombra, el fondo de madera, y lo de cada balda
    rect(204, 32, 268, 138, P.k); rect(205, 33, 267, 137, P.frisoS); rect(208, 35, 264, 136, P.frisoV);
    for (let y = 37; y < 136; y += 3) rect(208 + Math.floor(h(y, 1, 13) * 30), y, 216 + Math.floor(h(y, 2, 13) * 40), y, P.frisoS);
    rect(205, 33, 207, 137, P.frisoL); rect(265, 33, 267, 137, P.friso);
    for (const y of [56, 78, 100, 122]) { rect(205, y, 267, y + 2, P.frisoL); rect(205, y + 3, 267, y + 3, P.k); rect(208, y + 4, 264, y + 5, P.frisoS); }
    rect(203, 30, 269, 33, P.frisoL); rect(203, 30, 269, 30, P.moldura);
    const libros = (x0, base, n, k) => { let x = x0; for (let i = 0; i < n; i++) { const w = 3 + Math.floor(h(i, k, 14) * 3), hh = 12 + Math.floor(h(i, k, 15) * 7), c = P.libro[Math.floor(h(i, k, 16) * P.libro.length)];
      rect(x, base - hh, x + w - 1, base - 1, P.k); rect(x, base - hh + 1, x + w - 2, base - 1, c); rect(x, base - hh + 3, x + w - 2, base - hh + 3, P.k); if (w > 3) rect(x + 1, base - 5, x + w - 3, base - 5, P.amarillo); x += w; } return x; };
    libros(209, 56, 7, 1); poligono([[238, 55], [242, 41], [245, 42], [241, 55]], P.libro[3]); linea(238, 55, 242, 41, P.k);
    // la radio de los ochenta y una planta en su maceta en la balda de arriba
    rect(248, 44, 263, 55, P.k); rect(249, 45, 262, 54, P.beige); for (let y = 47; y < 53; y += 2) rect(250, y, 255, y, P.beigeS); disco(259, 49, 2, P.grisD); pset(258, 48, P.gris); rect(250, 41, 250, 44, P.grisD);
    libros(209, 78, 5, 2); rect(232, 70, 246, 77, P.k); rect(233, 71, 245, 76, P.blanco); rect(233, 71, 245, 72, P.amarillo); for (let x = 234; x < 245; x += 3) rect(x, 73, x + 1, 74, P.amarilloS);
    rect(252, 64, 260, 77, P.k); rect(253, 66, 259, 77, hex('#6a3a1a')); rect(254, 61, 258, 66, hex('#6a3a1a')); rect(255, 59, 257, 61, P.grisD); rect(254, 67, 254, 76, hex('#9a6a3a'));
    libros(240, 100, 6, 3); rect(210, 90, 226, 99, P.k); rect(211, 91, 225, 98, P.cielo2); for (const x of [213, 217, 221]) rect(x, 92, x + 2, 94, P.blanco); rect(211, 96, 225, 98, P.tabla);
    disco(232, 95, 4, P.amarillo); rect(231, 92, 233, 99, P.amarilloS); rect(229, 99, 235, 99, P.amarilloS); rect(230, 89, 234, 90, P.amarillo);
    libros(209, 122, 9, 4); rect(246, 108, 262, 121, P.k); rect(247, 109, 261, 121, C.carton); rect(247, 109, 261, 110, C.cartonS); rect(253, 109, 255, 121, P.amarilloS);
    for (let x = 210; x < 262; x += 13) { rect(x, 127, x + 10, 135, P.k); rect(x + 1, 128, x + 9, 135, P.libro[(x >> 2) % 9]); rect(x + 1, 128, x + 9, 128, P.blanco); }
    // la puerta de la derecha: marco, cuarterones, pomo de latón y su sombra
    rect(272, 54, 316, 138, P.k); rect(273, 55, 315, 137, P.moldura); rect(276, 58, 312, 137, P.frisoL);
    for (const [y0, y1] of [[62, 92], [98, 132]]) { rect(280, y0, 308, y1, P.frisoS); rect(281, y0 + 1, 308, y1, P.friso); rect(281, y0 + 1, 307, y0 + 1, P.frisoS); rect(308, y0 + 1, 308, y1, P.frisoL); }
    rect(276, 58, 277, 137, P.friso); disco(281, 101, 2, P.k); disco(281, 100, 1, P.amarillo); pset(280, 99, P.blanco);
    // el escritorio: tablero con canto, cajonera con tiradores, patas y la sombra en el suelo
    for (let x = 98; x <= 202; x++) for (let y = 138; y <= 141; y++) if ((x + y) % 2) pset(x, y, P.tablaJ);
    rect(98, 110, 202, 116, P.k); rect(99, 111, 201, 113, P.frisoL); rect(99, 114, 201, 115, P.friso); for (let i = 0; i < 12; i++) { const vx = 100 + Math.floor(h(i, 3, 17) * 90); rect(vx, 112, vx + 6, 112, P.friso); }
    rect(102, 117, 106, 138, P.k); rect(103, 117, 105, 137, P.frisoV);
    rect(160, 117, 199, 138, P.k); rect(161, 117, 198, 137, P.friso); for (const y of [117, 124, 131]) { rect(162, y + 1, 197, y + 5, P.frisoV); rect(162, y + 1, 197, y + 1, P.frisoL); rect(176, y + 3, 183, y + 3, P.amarilloS); rect(177, y + 3, 182, y + 3, P.amarillo); }
    // el monitor: marco, pie y la pantalla (lo que cambia va encima, en cada fotograma)
    rect(174, 104, 180, 110, P.grisK); rect(168, 109, 186, 110, P.grisD);
    rect(158, 84, 196, 106, P.k); rect(159, 85, 195, 105, P.monitor); rect(161, 87, 193, 103, P.pantA);
    // el flexo: pie, brazo de dos tramos, la pantalla y su cono de luz sobre la mesa
    rect(104, 108, 114, 110, P.k); rect(105, 108, 113, 109, P.rojo); linea(109, 108, 112, 94, P.grisK); linea(112, 94, 122, 88, P.grisK); disco(112, 94, 1, P.grisD);
    poligono([[119, 86], [128, 88], [126, 94], [119, 91]], P.k); poligono([[120, 87], [127, 89], [125, 93], [120, 91]], P.rojo); pset(121, 88, P.cortinaL);
    for (let y = 95; y < 111; y++) for (let x = 117 - (y - 95) * 0.3; x < 131 + (y - 95) * 0.9; x++) if ((Math.round(x) + y) % 3 === 0 && y > 108) pset(Math.round(x), y + 3, P.amarillo);
    // el tarro de azucarillos sobre la mesa
    rect(152, 102, 157, 110, P.k); rect(153, 103, 156, 110, P.edifV); for (const [x, y] of [[153, 105], [155, 107], [153, 108], [155, 104]]) pset(x, y, P.blanco); rect(152, 101, 157, 102, P.grisD);
  });
  // el cielo de la ventana con la ciudad: rascacielos con ventanas que se encienden, el árbol, un coche que pasa
  const W0 = 19, W1 = 91, V0 = 23, V1 = 94;
  e_cieloVentana(R, W0, V0, W1, V1, t, 1);
  for (const [x0, x1, y0, c] of [[20, 32, 56, P.edif1], [30, 44, 40, P.edif0], [44, 54, 62, P.edif1], [54, 70, 46, P.edif0], [68, 78, 34, P.edif2], [78, 92, 58, P.edif1]]) {
    rect(x0, y0, x1, V1, c); rect(x1 - 2, y0, x1, V1, P.edifO); rect(x0, y0, x1, y0, P.edifV);
    for (let y = y0 + 3; y < V1 - 4; y += 4) for (let x = x0 + 2; x < x1 - 3; x += 3) pset(x, y, h(x, y, Math.floor(t / 3)) > 0.82 ? P.amarillo : P.edifO);
  }
  rect(76, 28, 76, 34, P.edif2); if (Math.sin(t * 3) > 0) pset(76, 27, P.rojo);
  rect(W0, 86, W1, V1, P.grisD); rect(W0, 86, W1, 86, P.gris);
  { const u = (t / 6) % 1, cx = Math.round(W0 - 14 + u * 90); rect(cx, 88, cx + 11, 91, P.rojoS); rect(cx + 2, 86, cx + 8, 88, P.rojoS); rect(cx + 3, 87, cx + 7, 87, P.edifV); pset(cx + 2, 92, P.k); pset(cx + 9, 92, P.k); }
  e_arbol(R, 30, 92, 22, t, 1); e_arbol(R, 84, 92, 18, t, 2);
  R.recorte(null);
  // el travesaño y el parteluz de la ventana, con los reflejos del cristal
  rect(54, 21, 56, 95, P.marco); rect(17, 57, 93, 59, P.marco); rect(54, 58, 56, 59, P.marcoS); rect(17, 59, 93, 59, P.marcoS);
  for (const d of [24, 62]) for (let i = 0; i < 10; i++) pset(d + i, 50 - i, P.cielo2);
  // las cortinas que ondean un poco con la corriente
  for (const [x0, dir] of [[8, 1], [88, -1]]) for (let y = 16; y < 104; y++) { const w = 12 + Math.round(Math.sin(y * 0.09 + t * 1.3 + x0) * 1.2) + (y > 84 ? Math.round((y - 84) * 0.15) : 0);
    for (let i = 0; i < w; i++) { const x = dir > 0 ? x0 + i : x0 + 12 - i; pset(x, y, i % 4 === 1 ? P.cortinaS : i % 4 === 3 ? P.cortinaL : P.cortina); } }
  rect(4, 14, 106, 16, P.k); rect(5, 15, 105, 15, P.amarilloS); disco(4, 15, 2, P.amarillo); disco(106, 15, 2, P.amarillo);
  // el gato del alféizar (mueve la cola y parpadea) y un cactus en su maceta
  gato(R, 36, 96, t, { dir: 1 });
  rect(76, 90, 82, 96, P.k); rect(77, 91, 81, 96, P.cortinaS); rect(78, 84, 80, 90, P.hoja); pset(77, 86, P.hoja); pset(81, 87, P.hoja); pset(79, 83, P.tizaP);
  // el reloj de pared (las agujas andan) y la lámpara de techo que se balancea con su halo
  { const cx = 172, cy = 40; disco(cx, cy, 9, P.k); disco(cx, cy, 8, P.frisoL); disco(cx, cy, 7, P.blanco);
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 6), Math.round(cy + Math.sin(k * Math.PI / 6) * 6), k % 3 ? P.gris : P.k);
    const am = t * 0.1 - 1.2, as = t * 1.05 - 1.57; linea(cx, cy, Math.round(cx + Math.cos(am) * 4), Math.round(cy + Math.sin(am) * 4), P.k); linea(cx, cy, Math.round(cx + Math.cos(as) * 6), Math.round(cy + Math.sin(as) * 6), P.rojo); pset(cx, cy, P.k); }
  { const a = Math.sin(t * 0.9) * 0.06, lx = Math.round(198 + Math.sin(a) * 22), ly = 22;
    linea(198, 0, lx, ly - 4, P.k); poligono([[lx - 7, ly + 2], [lx - 3, ly - 4], [lx + 3, ly - 4], [lx + 7, ly + 2]], P.k); poligono([[lx - 6, ly + 1], [lx - 3, ly - 3], [lx + 3, ly - 3], [lx + 6, ly + 1]], P.amarilloS); rect(lx - 2, ly - 3, lx + 1, ly - 2, P.amarillo);
    disco(lx, ly + 3, 2, P.luz); for (let y = ly + 4; y < ly + 14; y++) for (let x = lx - 4 - (y - ly) * 0.6; x < lx + 4 + (y - ly) * 0.6; x++) if ((Math.round(x) + y * 3) % 6 === 0) pset(Math.round(x), y, P.papelL); }
  // el monitor: una gráfica que se va dibujando y vuelve a empezar, con el cursor
  { const u = (t % 5) / 5; for (let i = 0; i < Math.floor(u * 30); i++) { const y = 100 - Math.round(4 + i * 0.35 + Math.sin(i * 0.8) * 2); pset(162 + i, y, P.pantL); pset(162 + i, y + 1, P.pantA); }
    for (let x = 162; x < 193; x += 6) pset(x, 101, P.grisD); rect(163, 89, 170, 90, P.grisD); if (Math.floor(t * 2) % 2) rect(188, 89, 191, 90, P.verde); }
  // la planta colgante de la estantería, que se mece; la taza que humea; las motas en la luz de la ventana
  for (let k = 0; k < 4; k++) { const x0 = 214 + k * 12, l = 10 + (k % 3) * 6; for (let j = 0; j < l; j++) { const x = Math.round(x0 + Math.sin(t * 1.1 + j * 0.3 + k) * (j / l) * 2); pset(x, 57 + j, j % 3 ? P.hoja : P.hojaS); if (j % 4 === 2) { pset(x + 1, 57 + j, P.hojaL); pset(x - 1, 58 + j, P.hoja); } } }
  rect(122, 104, 128, 110, P.k); rect(123, 105, 127, 110, P.blanco); rect(128, 106, 129, 108, P.k); rect(123, 105, 127, 105, C.jarabe);
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(125 + Math.sin(f * 7 + k) * 1.5), Math.round(102 - f * 10), f < 0.6 ? P.blanco : P.papelL); }
  for (let k = 0; k < 9; k++) { const f = (t * 0.05 + h(k, 1, 19)) % 1, y = 100 + Math.round(f * 50), x = Math.round(40 + h(k, 2, 19) * 60 + (y - 100) * 0.8 + Math.sin(t + k) * 2); pset(x, y, P.papelL); }
  // las latas del escritorio (la roja puede soltar espuma)
  if (o.latas !== false) { e_lata(R, 148, 112, { color: 'azul' }); e_lata(R, 134, 112, { color: 'rojo', espuma: o.espuma ?? 0, t }); }
  return { suelo: 158, sueloMin: 150, sueloMax: 168, mesa: { x0: 100, x1: 200, y: 112 }, lataRoja: [134, 112], lataAzul: [148, 112], puerta: { x0: 276, x1: 312, y0: 58, y1: 138 }, ventana: [18, 22, 92, 96], estanteria: [206, 34, 266, 138] };
}

// lo de delante del estudio general: la planta grande en su maceta (las hojas se mecen) y la caja de latas en el suelo
function e_estudioDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P;
  rect(2, 158, 26, 179, P.k); rect(3, 159, 25, 179, hex('#b8643a')); rect(3, 159, 25, 161, hex('#d88050')); rect(20, 162, 25, 179, hex('#8a4428'));
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.42 + Math.sin(t * 1.1 + k) * 0.05, l = 18 + (k % 3) * 6, x1 = Math.round(14 + Math.cos(a) * l), y1 = Math.round(158 + Math.sin(a) * l);
    linea(14, 158, x1, y1, P.hojaS); disco(x1, y1, 5, P.hojaS); disco(x1 - 1, y1 - 1, 4, P.hoja); linea(x1 - 3, y1 + 2, x1 + 2, y1 - 3, P.hojaL); }
  if (PIEZAS_NC.cajaLatas) { PIEZAS_NC.cajaLatas(R, 300, 179, { color: 'rojo', abierta: true }); PIEZAS_NC.cajaLatas(R, 296, 160, { color: 'azul' }); }
  return { planta: [0, 120, 30, 180], caja: [284, 140, 316, 180] };
}

// geometría: el tablero (en hoyDelante) va de y 128 a 146 y el frente de 146 a 180; quien esté detrás del escritorio se
// planta con los pies en y 132 (quedan tapados) y asoma cabeza y hombros (libre en x 70–130); la lata roja grande en
// x o.lataX (168), de pie en y 140 (su tapa en y 104; la espuma sube hasta y 56); la azul en x 206; el azucarero x 118,
// la taza x 238; ventana x 12–80 y 14–100; corcho x 196–264 y 34–96.
function e_mesa(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_capa(R, 'nc-mesa', () => {
    for (let y = 0; y < 130; y++) for (let x = 0; x < 320; x++) { const m = (x + 4) % 22; let c = m < 3 ? P.papelS : m === 11 ? P.papelL : P.papel;
      if (m > 4 && m < 18 && ((Math.abs(m - 11) + Math.abs((y % 16) - 8)) === 5)) c = P.papelR; if (h(x, y, 4) > 0.985) c = P.papelS; pset(x, y, c); }
    rect(0, 112, 319, 116, P.frisoL); rect(0, 112, 319, 112, P.moldura); rect(0, 117, 319, 129, P.friso); rect(0, 117, 319, 117, P.frisoS);
    for (let x = 6; x < 320; x += 52) { rect(x, 120, x + 44, 129, P.frisoS); rect(x + 1, 121, x + 44, 129, P.frisoV); }
    // la ventana grande con su marco y el alféizar
    rect(10, 12, 82, 102, P.k); rect(11, 13, 81, 101, P.marco); rect(6, 100, 86, 105, P.k); rect(7, 101, 85, 104, P.marco); rect(7, 104, 85, 104, P.marcoS);
    // el corcho grande con notas, la foto de una feria y la gráfica
    rect(194, 32, 266, 98, P.k); rect(195, 33, 265, 97, P.frisoL); rect(198, 36, 262, 94, P.corcho);
    for (let i = 0; i < 160; i++) pset(198 + Math.floor(h(i, 1, 21) * 65), 36 + Math.floor(h(i, 2, 21) * 59), i % 2 ? P.corchoS : P.corchoL);
    for (const [x, y, c] of [[202, 40, P.amarillo], [224, 38, P.blanco], [246, 42, P.tizaP], [204, 70, P.cielo2]]) { rect(x, y, x + 14, y + 14, c); rect(x + 14, y + 1, x + 14, y + 14, P.corchoS); for (let j = y + 4; j < y + 13; j += 3) rect(x + 2, j, x + 8 + (j % 5), j, P.grisD); disco(x + 7, y + 1, 1, P.rojo); }
    rect(226, 60, 258, 90, P.blanco); rect(228, 62, 256, 80, P.cielo1); rect(228, 74, 256, 80, P.hoja); for (const [x, hh] of [[234, 8], [242, 12], [250, 6]]) { rect(x, 74 - hh, x + 5, 74, P.libro[(x >> 3) % 9]); } disco(244, 60, 1, P.azul);
    // la estantería que asoma a la derecha con libros
    rect(276, 50, 319, 130, P.k); rect(277, 51, 319, 129, P.frisoV);
    for (const y of [76, 104]) { rect(277, y, 319, y + 2, P.frisoL); rect(277, y + 3, 319, y + 3, P.k); }
    for (const [y0, k] of [[76, 5], [104, 6], [129, 7]]) { let x = 280; for (let i = 0; i < 9 && x < 316; i++) { const w = 4 + Math.floor(h(i, k, 22) * 3), hh = 14 + Math.floor(h(i, k, 23) * 8); rect(x, y0 - hh, x + w - 1, y0 - 1, P.k); rect(x, y0 - hh + 1, x + w - 2, y0 - 1, P.libro[Math.floor(h(i, k, 24) * 9)]); rect(x, y0 - hh + 4, x + w - 2, y0 - hh + 4, P.k); x += w; } }
    rect(277, 51, 279, 129, P.frisoL);
    // la balda de pared del centro: una botella recta antigua, un trofeo pequeño, un cactus y una foto enmarcada
    rect(100, 66, 176, 68, P.k); rect(101, 66, 175, 67, P.frisoL); for (const x of [108, 168]) { linea(x, 69, x - 4, 74, P.k); rect(x - 1, 69, x, 70, P.frisoS); }
    for (let x = 101; x < 176; x++) pset(x, 69, P.papelS);
    rect(106, 48, 112, 65, P.k); rect(107, 52, 111, 65, hex('#6a3a1a')); rect(108, 45, 110, 52, hex('#6a3a1a')); rect(108, 44, 110, 45, P.grisD); rect(107, 53, 107, 64, hex('#9a6a3a')); rect(107, 57, 111, 60, P.beige);
    disco(126, 54, 5, P.amarilloS); disco(125, 53, 4, P.amarillo); rect(124, 58, 127, 62, P.amarilloS); rect(121, 62, 130, 65, P.k); rect(122, 63, 129, 64, P.frisoS); pset(123, 51, P.blanco);
    rect(138, 58, 146, 65, P.k); rect(139, 59, 145, 65, hex('#b8643a')); rect(140, 50, 144, 58, P.hoja); rect(140, 50, 140, 58, P.hojaL); pset(139, 53, P.hoja); pset(145, 54, P.hoja); pset(142, 49, P.tizaP);
    rect(152, 46, 172, 65, P.k); rect(153, 47, 171, 64, P.frisoL); rect(155, 49, 169, 62, P.cielo2); rect(155, 57, 169, 62, P.hoja); disco(162, 55, 3, P.piel[0]); rect(159, 58, 165, 62, P.rojo); rect(160, 51, 164, 52, P.pelo[2]);
  });
  e_cieloVentana(R, 13, 15, 79, 99, t, 2);
  for (const [x0, x1, y0, c] of [[13, 30, 52, P.edif0], [28, 42, 66, P.edif1], [44, 60, 44, P.edif0], [60, 80, 60, P.edif1]]) { rect(x0, y0, x1, 99, c); rect(x1 - 2, y0, x1, 99, P.edifO); rect(x0, y0, x1, y0, P.edifV); for (let y = y0 + 3; y < 95; y += 5) for (let x = x0 + 2; x < x1 - 3; x += 4) { pset(x, y, h(x, y, Math.floor(t / 4)) > 0.8 ? P.amarillo : P.edifO); pset(x + 1, y, P.edifO); } }
  e_arbol(R, 58, 99, 36, t, 3);
  R.recorte(null);
  rect(45, 13, 47, 101, P.marco); rect(11, 55, 81, 57, P.marco); rect(11, 57, 81, 57, P.marcoS); for (let i = 0; i < 14; i++) { pset(18 + i, 48 - i, P.cielo2); pset(54 + i, 92 - i, P.cielo2); }
  gato(R, 26, 100, t, { dir: 1 });
  // la luz de la lámpara de techo, que se balancea fuera de cuadro: un halo que va y viene por la pared
  { const lx = Math.round(150 + Math.sin(t * 0.9) * 8); for (let y = 0; y < 40; y++) for (let x = lx - 30 + y; x < lx + 30 - y; x++) if ((x + y * 2) % 5 === 0) pset(x, y, P.papelL); }
  return { suelo: 132, detras: [70, 130], lataRoja: [o.lataX ?? 168, 140], lataAzul: [206, 140], mesa: { y: 128, frente: 146 } };
}

// lo de delante de la mesa de cerca: el escritorio entero con lo que hay encima (flexo, latas grandes, azucarero, taza,
// libreta) y, si la lata suelta espuma, el charco que crece
function e_mesaDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P, e = Math.max(0, Math.min(1, o.espuma ?? 0)), lx = o.lataX ?? 168;
  // el tablero visto un poco desde arriba, con vetas y el canto; el frente con dos cajones y sus tiradores
  rect(0, 127, 319, 127, P.k); rect(0, 128, 319, 143, P.frisoL);
  for (let i = 0; i < 70; i++) { const vx = Math.floor(h(i, 1, 25) * 320), vy = 129 + Math.floor(h(i, 2, 25) * 14); rect(vx, vy, vx + 6 + Math.floor(h(i, 3, 25) * 16), vy, i % 3 ? P.friso : P.tablaL); }
  rect(0, 144, 319, 147, P.friso); rect(0, 144, 319, 144, P.tablaL); rect(0, 148, 319, 148, P.k);
  rect(0, 149, 319, 179, P.frisoV); for (const x0 of [20, 170]) { rect(x0, 153, x0 + 130, 175, P.frisoS); rect(x0 + 1, 154, x0 + 130, 175, P.friso); rect(x0 + 1, 154, x0 + 129, 154, P.frisoS); rect(x0 + 130, 154, x0 + 130, 175, P.frisoL); rect(x0 + 55, 162, x0 + 75, 164, P.k); rect(x0 + 56, 162, x0 + 74, 163, P.amarillo); pset(x0 + 57, 162, P.blanco); }
  // el flexo con su cono de luz
  for (let y = 120; y < 144; y++) for (let x = 20 + (y - 120) * 0.2; x < 64 + (y - 120) * 1.6; x++) if ((Math.round(x) + y) % 2 === 0 && y > 128) pset(Math.round(x), y, P.tablaL);
  rect(14, 136, 34, 140, P.k); rect(15, 136, 33, 139, P.rojo); rect(15, 136, 33, 136, P.cortinaL); linea(24, 136, 30, 108, P.grisK); linea(25, 136, 31, 108, P.grisD); linea(30, 108, 48, 96, P.grisK); disco(30, 108, 2, P.grisD);
  poligono([[44, 92], [60, 96], [56, 106], [44, 100]], P.k); poligono([[45, 93], [59, 97], [55, 105], [45, 99]], P.rojo); linea(46, 94, 58, 97, P.cortinaL); disco(52, 104, 2, P.luz);
  // el azucarero con sus azucarillos y un azucarillo suelto que brilla
  rect(110, 128, 128, 140, P.k); rect(111, 129, 127, 140, P.blanco); rect(124, 129, 127, 140, P.gris); rect(108, 126, 130, 128, P.k); rect(109, 126, 129, 127, P.gris);
  for (const [x, y] of [[113, 122], [118, 121], [122, 123]]) { rect(x, y, x + 3, y + 3, P.k); rect(x, y, x + 2, y + 2, P.blanco); }
  rect(134, 136, 137, 139, P.k); rect(134, 136, 136, 138, P.blanco); if (Math.sin(t * 3) > 0.6) { pset(138, 134, P.amarillo); pset(139, 133, P.blanco); }
  // la taza que humea y la libreta con el lápiz
  rect(226, 122, 244, 140, P.k); rect(227, 123, 243, 140, P.azul); rect(239, 123, 243, 140, P.azulS); rect(227, 123, 243, 124, hex('#4a2414')); rect(244, 127, 248, 135, P.k); rect(245, 128, 247, 134, P.azul);
  for (let k = 0; k < 4; k++) { const f = (t * 0.5 + k / 4) % 1; for (let j = 0; j < 3; j++) pset(Math.round(235 + Math.sin(f * 6 + k + j) * 2), Math.round(120 - f * 18 - j), f < 0.6 ? P.blanco : P.papelL); }
  poligono([[256, 132], [306, 130], [310, 142], [258, 144]], P.k); poligono([[257, 133], [305, 131], [308, 141], [259, 143]], P.blanco); for (let y = 134; y < 142; y += 2) linea(262, y, 300, y - 1, P.cielo2); linea(292, 138, 312, 128, P.amarilloS); pset(312, 128, P.k);
  // las dos latas grandes; la roja suelta espuma y deja un charco en la mesa
  if (e > 0.2) { const w = Math.round(6 + e * 22); for (let y = 138; y <= 143; y++) for (let x = lx - w; x <= lx + w; x++) { const r = ((x - lx) / w) ** 2 + ((y - 141) / 3) ** 2; if (r < 1 + h(x, y, 26) * 0.2) pset(x, y, r > 0.75 ? P.papelS : C.espuma); } }
  if (o.latas !== false) { e_lata(R, 206, 140, { color: 'azul', s: 2 }); e_lata(R, lx, 140, { color: 'rojo', s: 2, espuma: e, t }); }
  if (e > 0.5) for (let k = 0; k < 6; k++) { const f = (t * 1.3 + k / 6) % 1, gx = Math.round(lx + Math.cos(k * 1.1) * (8 + f * 30)), gy = Math.round(60 + f * f * 80 - Math.sin(k) * 6); if (gy < 138) { pset(gx, gy, C.espuma); pset(gx + 1, gy, P.papelS); } }
  return { mesa: { y: 128, frente: 146 } };
}

// geometría: suelo (pies) 150–170 (por omisión 158); pared/suelo en y 136; la máquina: carcasa x 120–180 y 72–142, la
// boca del túnel en (116, 115); la camilla x 52–113 con el colchón en y 114 (el voluntario tapado, cabeza dentro del
// túnel; sus calcetines en x 58–64, y 108–113); la bomba de jeringas en su pie x 44–62 y 84–98 (pie en x 52, ruedas en
// y 150) con el tubito hasta (113, 105); la puerta x 6–36 y 56–136; la ventana a la sala de control x 196–270 y 46–104
// (monitores con cerebros en x 202–232 y 236–266, y 60–84); libres: x 66–270 delante de la camilla y bajo la ventana;
// hoyDelante pinta el carrito x 272–316 (y 146–180).
function e_escaner(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P;
  e_capa(R, 'nc-escaner', () => {
    // el techo de placas con dos luces empotradas
    rect(0, 0, 319, 11, P.techo); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 11, P.techoS); rect(0, 5, 319, 5, P.techoS); rect(0, 11, 319, 11, P.grisS);
    for (const x0 of [60, 180, 236]) { rect(x0, 1, x0 + 40, 9, P.grisS); rect(x0 + 1, 2, x0 + 39, 8, P.luz); for (let x = x0 + 4; x < x0 + 40; x += 4) rect(x, 2, x, 8, P.techo); }
    // las paredes de paneles: la parte de arriba perforada (paneles acústicos), el pasamanos y la de abajo lisa con motas
    for (let y = 12; y < 136; y++) for (let x = 0; x < 320; x++) { const m = x % 32; let c = y < 96 ? ((x % 3 === 1 && y % 3 === 1) ? P.perf : P.panel) : (h(x, y, 27) > 0.97 ? P.panelS : P.panel);
      if (m === 0) c = P.panelS; else if (m === 1) c = P.panelL; pset(x, y, c); }
    rect(0, 95, 319, 99, P.grisS); rect(0, 95, 319, 96, P.gris); rect(0, 99, 319, 99, P.grisD);
    rect(0, 130, 319, 135, P.zocalo); rect(0, 130, 319, 130, P.grisS);
    // el suelo de vinilo: losetas, motas, el reflejo de la máquina y la línea amarilla de seguridad alrededor del imán
    for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 28) > 0.93 ? P.viniloS : P.vinilo; if (((x + (y - 136) * (x - 160) / 90) | 0) % 40 === 0 || (y - 136) % 14 === 0) c = P.viniloJ; pset(x, y, c); }
    for (let y = 143; y < 158; y++) for (let x = 124; x < 178; x++) if ((x + y) % 2 === 0) pset(x, y, P.viniloL);
    for (let a = 0; a < Math.PI; a += 0.01) { const x = Math.round(140 + Math.cos(a) * 112), y = Math.round(150 + Math.sin(a) * 14); if (Math.floor(a * 40) % 3 !== 2) { pset(x, y, P.amarillo); pset(x + 1, y, P.amarillo); pset(x, y + 1, P.amarilloS); } }
    // la puerta blindada (con el canto de cobre), el ventanuco con la malla, la palanca y la bisagra
    rect(4, 54, 38, 136, P.k); rect(5, 55, 37, 136, hex('#c8784a')); rect(7, 57, 35, 136, P.gris); rect(7, 57, 35, 58, P.panelL); rect(33, 57, 35, 136, P.grisS);
    rect(13, 64, 29, 82, P.k); rect(14, 65, 28, 81, P.pantR); for (let y = 66; y < 81; y += 3) rect(14, y, 28, y, P.grisS); for (let x = 16; x < 28; x += 3) rect(x, 65, x, 81, P.grisS);
    rect(29, 98, 34, 100, P.k); rect(29, 98, 33, 99, P.gris); rect(30, 101, 32, 104, P.grisD); rect(8, 70, 9, 76, P.grisD); rect(8, 112, 9, 118, P.grisD);
    // los pictogramas: el imán (círculo rojo) sobre la puerta y el de «sin metal» (una llave tachada)
    disco(21, 44, 7, P.k); disco(21, 44, 6, P.amarillo); rect(17, 41, 18, 47, P.k); rect(24, 41, 25, 47, P.k); rect(17, 47, 25, 48, P.k); rect(17, 41, 18, 42, P.rojo); rect(24, 41, 25, 42, P.azul);
    disco(48, 44, 7, P.k); disco(48, 44, 6, P.blanco); rect(44, 43, 50, 44, P.grisD); disco(51, 44, 2, P.grisD); linea(43, 39, 53, 49, P.rojo); linea(44, 39, 54, 49, P.rojo);
    // la vitrina de las bobinas (cascos blancos de antena en sus baldas, tras el cristal con reflejos)
    rect(66, 18, 108, 58, P.k); rect(67, 19, 107, 57, P.gris); rect(69, 21, 105, 55, P.panelL);
    for (const y of [37, 55]) { rect(69, y, 105, y + 1, P.grisS); for (const x of [76, 92]) { disco(x, y - 6, 6, P.grisS); disco(x, y - 6, 5, P.carc); rect(x - 6, y - 6, x + 6, y - 1, P.carc); rect(x - 6, y - 2, x + 6, y - 1, P.carcS); for (let i = -4; i <= 4; i += 2) pset(x + i, y - 8, P.azul); } }
    for (let i = 0; i < 16; i++) { pset(72 + i, 52 - i * 2, P.blanco); pset(90 + i, 52 - i * 2, P.blanco); } rect(86, 19, 87, 57, P.gris); rect(84, 36, 85, 40, P.grisD); rect(88, 36, 89, 40, P.grisD);
    // el póster de anatomía: un corte de cerebro de perfil con zonas de colores (sin letras)
    rect(130, 24, 162, 60, P.k); rect(131, 25, 161, 59, P.blanco); disco(146, 41, 11, P.tizaP); disco(141, 39, 7, hex('#e890a8')); disco(152, 44, 5, hex('#d87890')); rect(146, 50, 149, 56, hex('#c87088'));
    for (const [x, y, c] of [[140, 36, P.amarillo], [150, 38, P.azulL], [146, 46, P.verde]]) disco(x, y, 2, c); rect(133, 27, 140, 28, P.gris); rect(152, 56, 159, 57, P.gris); pset(146, 24, P.rojo);
    // los cascos colgados en su gancho y el intercomunicador con su rejilla
    rect(183, 102, 186, 104, P.grisD); linea(180, 106, 184, 104, P.k); linea(188, 106, 185, 104, P.k); disco(180, 110, 3, P.k); disco(188, 110, 3, P.k); disco(180, 110, 2, P.amarillo); disco(188, 110, 2, P.amarillo);
    rect(180, 56, 190, 72, P.k); rect(181, 57, 189, 71, P.gris); for (let y = 59; y < 66; y += 2) rect(183, y, 187, y, P.grisD); rect(183, 68, 187, 69, P.grisK);
    // el panel de oxígeno: la llave verde, el manómetro y la manguera enrollada
    rect(282, 64, 312, 96, P.k); rect(283, 65, 311, 95, P.panelL); disco(292, 74, 5, P.k); disco(292, 74, 4, P.blanco); linea(292, 74, 294, 71, P.rojo); disco(304, 74, 3, P.verdeS); disco(304, 74, 2, P.verde);
    for (let k = 0; k < 3; k++) { disco(297, 88, 6 - k * 2, k % 2 ? P.panelL : P.verdeS); } rect(296, 86, 298, 90, P.panelL);
    // la máquina: la carcasa blanca redondeada con su sombra, la franja azul, el frontal con la boca del túnel y el panel
    rect(122, 140, 182, 144, P.grisK);
    rect(120, 76, 180, 141, P.k); rect(124, 72, 176, 76, P.k);
    rect(121, 77, 179, 140, P.carc); rect(125, 73, 175, 76, P.carc); rect(170, 77, 179, 140, P.carcS); rect(175, 77, 179, 140, P.carcD); rect(125, 73, 175, 73, P.blanco);
    rect(121, 96, 179, 101, P.azul); rect(121, 96, 179, 96, P.azulL); rect(170, 96, 179, 101, P.azulS);
    rect(112, 80, 121, 140, P.k); rect(113, 81, 120, 139, P.carc); rect(113, 81, 113, 139, P.blanco);
    for (let j = -14; j <= 14; j++) for (let i = -4; i <= 4; i++) { const d = (i / 4.2) ** 2 + (j / 14) ** 2; if (d <= 1) pset(117 + i, 115 + j, d > 0.7 ? P.carcD : d > 0.45 ? P.tunelL : P.tunel); }
    rect(156, 82, 168, 90, P.k); rect(157, 83, 167, 89, P.ctrl); rect(158, 84, 162, 85, P.verde); rect(158, 87, 166, 87, P.ctrlL);
    for (let y = 106; y < 136; y += 6) rect(124, y, 168, y, P.carcS);
    rect(121, 138, 179, 140, P.carcD);
    // la camilla: el colchón azul claro, el soporte, la columna y la base
    rect(50, 113, 114, 118, P.k); rect(51, 114, 113, 116, P.panelL); rect(51, 117, 113, 117, P.grisS);
    rect(54, 119, 110, 122, P.k); rect(55, 119, 109, 121, P.gris); rect(55, 121, 109, 121, P.grisS);
    rect(74, 123, 96, 140, P.k); rect(75, 123, 95, 139, P.carc); rect(90, 123, 95, 139, P.carcS); for (let y = 126; y < 139; y += 4) rect(76, y, 89, y, P.carcS);
    rect(66, 140, 104, 144, P.k); rect(67, 140, 103, 143, P.grisS); rect(67, 140, 103, 140, P.gris);
    // el pie de la bomba de jeringas: la barra, las patas con ruedas
    rect(51, 66, 53, 148, P.grisD); rect(51, 66, 51, 148, P.gris); linea(52, 148, 42, 152, P.grisK); linea(52, 148, 62, 152, P.grisK); linea(52, 148, 52, 153, P.grisK);
    for (const x of [42, 62, 52]) { disco(x, 153, 1, P.k); }
    rect(46, 64, 58, 66, P.grisK);
    // la bomba: la caja, la pantallita con cifras, los botones y las dos jeringas de refresco
    rect(42, 84, 64, 100, P.k); rect(43, 85, 63, 99, P.beige); rect(43, 85, 63, 85, P.beigeL); rect(60, 85, 63, 99, P.beigeS);
    rect(45, 88, 56, 93, P.k); rect(46, 89, 55, 92, P.pantN); for (const x of [47, 51]) rect(x, 90, x + 2, 91, P.verde);
    for (const x of [46, 50, 54]) rect(x, 95, x + 2, 96, x === 46 ? P.rojo : P.grisD);
    for (const [y, c] of [[78, hex('#4a2414')], [81, hex('#5a2c18')]]) { rect(42, y, 62, y + 2, P.k); rect(43, y + 1, 56, y + 1, c); rect(57, y + 1, 61, y + 1, P.blanco); rect(62, y, 64, y + 2, P.grisD); }
  });
  // el voluntario tapado con la manta: la cabeza en el túnel; los pies (calcetines) se mueven un poco
  if (o.tumbado !== false) {
    poligono([[62, 113], [64, 107], [74, 105], [80, 108], [100, 108], [113, 107], [113, 113]], P.k);
    poligono([[63, 112], [65, 108], [74, 106], [80, 109], [100, 109], [113, 108], [113, 112]], P.manta);
    for (const x of [70, 84, 96, 106]) linea(x, 109, x + 2, 112, P.mantaS); rect(64, 108, 112, 108, P.mantaL);
    const p = Math.sin(t * 2.2) > 0.6 ? 1 : 0; rect(57, 106 - p, 62, 112, P.k); rect(58, 107 - p, 61, 111, P.blanco); rect(58, 107 - p, 58, 111, P.gris);
    rect(57, 105 - p, 59, 107 - p, P.k); rect(58, 106 - p, 58, 106 - p, P.blanco);
  }
  // el tubito: de la bomba a la boca del túnel (cuelga un poco); el refresco corre por él a gotas
  const tubo = (u) => [Math.round(64 + u * 49), Math.round(92 + u * 13 + Math.sin(u * Math.PI) * 7)];
  for (let i = 0; i <= 60; i++) { const [x, y] = tubo(i / 60); pset(x, y + 1, P.grisS); pset(x, y, P.edifV); }
  rect(111, 103, 114, 106, P.k); rect(112, 104, 113, 105, P.grisD);
  { const b = o.bebe; const n = b == null ? 2 : 6; for (let k = 0; k < n; k++) { const f = b == null ? (t * 0.35 + k / n) % 1 : Math.min(1, b * 1.2) * ((t * 0.8 + k / n) % 1); if (b != null && b <= 0) break; const [x, y] = tubo(f); pset(x, y, hex('#5a2c18')); } }
  // la luz roja de «en uso» que parpadea sobre la puerta; la lucecita verde de la máquina; las luces del túnel
  disco(21, 32, 3, P.k); disco(21, 32, 2, Math.sin(t * 3) > -0.3 ? P.rojo : P.rojoS); pset(20, 31, Math.sin(t * 3) > -0.3 ? P.tizaR : P.rojoS);
  if (Math.sin(t * 4) > 0) pset(166, 84, P.verde); else pset(166, 84, P.verdeS);
  for (let j = -8; j <= 8; j += 4) pset(118, 115 + j, Math.sin(t * 2 + j) > 0 ? P.azulL : P.tunelL);
  // el ruido de la máquina: la carcasa tiembla un pixel y salen rayitas de sonido
  if (o.ruido) { const v = Math.floor(t * 18) % 2; rect(125, 72 + v, 175, 72 + v, P.blanco); for (let k = 0; k < 3; k++) { const f = (t * 2 + k / 3) % 1, r = 8 + f * 14; for (let a = -0.6; a < 0.6; a += 0.12) pset(Math.round(150 + Math.cos(a - Math.PI / 2) * r * 1.8), Math.round(74 - Math.sin(-a + Math.PI / 2) * r * 0.5), f < 0.5 ? P.grisS : P.gris); } }
  // la ventana a la sala de control: dentro, la pared oscura, la mesa, dos monitores con cerebros y el técnico
  rect(194, 44, 272, 106, P.k); rect(195, 45, 271, 105, P.grisS);
  const X0 = 198, Y0 = 48, X1 = 268, Y1 = 102;
  rect(X0, Y0, X1, Y1, P.ctrl); for (let y = Y0; y < Y1; y += 2) for (let x = X0 + (y % 4 ? 0 : 3); x < X1; x += 6) pset(x, y, P.ctrlS);
  rect(X0, 88, X1, 90, P.beigeS); rect(X0, 91, X1, Y1, P.ctrlS);
  for (const [mx, z] of [[200, o.zonasIzq ?? 0], [234, o.zonas ?? 0]]) { rect(mx, 58, mx + 32, 84, P.k); rect(mx + 1, 59, mx + 31, 83, P.grisK); rect(mx + 2, 60, mx + 30, 82, P.pantN);
    for (let x = mx + 4; x < mx + 30; x += 5) pset(x, 81, P.pantR); if (PIEZAS_NC.cerebro) PIEZAS_NC.cerebro(R, mx + 16, 80, { zonas: z, t }); rect(mx + 14, 84, mx + 18, 88, P.grisK); }
  { const ty = Math.round(Math.sin(t * 1.4) * 0.6); rect(226, 92 + ty, 232, 102, C.bata); disco(229, 89 + ty, 3, P.piel[1]); rect(226, 86 + ty, 232, 87 + ty, P.pelo[1]); if (Math.sin(t * 5) > 0.3) pset(234, 91, P.piel[1]); }
  { const u = (t / 13) % 1; if (u < 0.5) { const px = Math.round(X0 + 1 + u * 2 * 64); rect(px, 70, px + 4, 90, P.azulS); disco(px + 2, 67, 3, P.piel[3]); rect(px, 64, px + 4, 65, P.pelo[2]); } }
  // los reflejos del cristal y el marco
  for (const d of [206, 240]) for (let i = 0; i < 26; i++) { pset(d + i, Y1 - i * 2, P.gris); pset(d + i + 1, Y1 - i * 2, P.ctrlL); }
  rect(194, 104, 272, 107, P.gris); rect(194, 104, 272, 104, P.panelL);
  return { suelo: 158, sueloMin: 150, sueloMax: 170, boca: [116, 115], camilla: { x0: 52, x1: 113, y: 114 }, bomba: [52, 84], ventana: [196, 46, 270, 104], puerta: [6, 56, 36, 136] };
}

// lo de delante del laboratorio: el carrito de acero en primer plano con mantas dobladas y la caja de tapones
function e_escanerDelante(R, t, o) {
  const { rect, pset, disco } = R, P = e_P;
  rect(274, 150, 316, 153, P.k); rect(275, 151, 315, 152, P.gris); rect(275, 151, 315, 151, P.panelL);
  rect(274, 168, 316, 171, P.k); rect(275, 169, 315, 170, P.gris); rect(276, 153, 277, 176, P.grisD); rect(313, 153, 314, 176, P.grisD);
  disco(277, 177, 2, P.k); disco(313, 177, 2, P.k);
  for (let k = 0; k < 3; k++) { rect(280, 146 - k * 4, 298, 150 - k * 4, P.k); rect(281, 147 - k * 4, 297, 149 - k * 4, k % 2 ? P.mantaL : P.manta); }
  rect(300, 142, 312, 150, P.k); rect(301, 143, 311, 150, P.amarillo); for (let x = 302; x < 311; x += 3) pset(x, 145, P.rojo);
  rect(282, 160, 310, 168, P.k); rect(283, 161, 309, 168, P.blanco); rect(283, 161, 309, 162, P.panelL);
  return { carrito: [274, 138, 316, 180] };
}

// geometría: suelo (pies) 162–176 (por omisión 170), delante de la mesa (tablero en y 122–128, frente hasta 150);
// la pantalla grande x 96–262 y 22–112 con los cerebros centrados en x 140 (izquierdo) y 220 (derecho), de y 32 a 92;
// los iconos de lo que bebía en (140, 103) y (220, 103); la ventana a la sala del escáner x 8–86 y 30–110; el rack
// x 272–316 y 52–130; la silla en x 236; libres: x 20–230 delante de la mesa (las cabezas quedan bajo la pantalla).
function e_pantalla(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_capa(R, 'nc-pantalla', () => {
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const m = x % 40; let c = (x % 3 === 0 && y % 3 === 0) ? P.ctrlS : P.ctrl; if (m === 0) c = P.ctrlS; else if (m === 1) c = P.ctrlL; if (y < 10) c = y === 9 ? P.ctrlS : P.ctrlL; pset(x, y, c); }
    // la ventana a la sala del escáner: la pared clara, la máquina pequeña, la camilla
    rect(6, 28, 88, 112, P.k); rect(7, 29, 87, 111, P.grisS);
    rect(10, 32, 84, 108, P.panel); for (let x = 10; x < 85; x += 16) rect(x, 32, x, 92, P.panelS); rect(10, 92, 84, 108, P.vinilo); rect(10, 92, 84, 92, P.viniloJ);
    if (PIEZAS_NC.escaner) PIEZAS_NC.escaner(R, 50, 104, {}); rect(18, 86, 44, 88, P.manta);
    for (let i = 0; i < 30; i++) { pset(14 + i, 106 - i * 2, P.panelL); pset(46 + i, 106 - i * 2, P.panelL); }
    rect(6, 110, 88, 113, P.gris); rect(6, 110, 88, 110, P.panelL);
    // el rack de equipos de la derecha
    rect(272, 52, 316, 132, P.k); rect(273, 53, 315, 131, P.grisK);
    for (let y = 56; y < 128; y += 12) { rect(275, y, 313, y + 9, P.ctrlL); rect(275, y, 313, y, P.grisS); rect(277, y + 3, 290, y + 6, P.ctrlS); for (let x = 296; x < 310; x += 4) pset(x, y + 4, P.k); }
    // la pantalla grande: marco, pie y el fondo con la retícula
    rect(170, 112, 188, 122, P.grisK); rect(160, 120, 198, 122, P.grisD);
    rect(94, 20, 264, 114, P.k); rect(95, 21, 263, 113, P.grisK); rect(96, 22, 262, 112, P.k); rect(98, 24, 260, 110, P.pantN);
    for (let x = 98; x < 261; x += 10) for (let y = 30; y < 110; y += 2) pset(x, y, P.pantR); for (let y = 30; y < 110; y += 10) for (let x = 98; x < 261; x += 2) pset(x, y, P.pantR);
    rect(98, 24, 260, 28, P.ctrl); for (const [x, c] of [[100, P.rojo], [105, P.amarillo], [110, P.verde]]) rect(x, 25, x + 2, 27, c); rect(120, 25, 150, 27, P.ctrlL); rect(232, 25, 256, 27, P.ctrlL);
    rect(180, 30, 180, 108, P.ctrlL);
    // la mesa: el tablero, el frente con cajones, la torre beige y el monitor de tubo
    rect(0, 121, 319, 122, P.k); rect(0, 123, 319, 127, P.beigeL); rect(0, 127, 319, 128, P.beigeS); rect(0, 129, 319, 150, P.beigeS);
    for (const x0 of [20, 120]) { rect(x0, 132, x0 + 60, 146, P.beige); rect(x0, 132, x0 + 60, 132, P.beigeL); rect(x0 + 26, 138, x0 + 34, 139, P.grisD); }
    rect(244, 130, 266, 150, P.k); rect(245, 131, 265, 150, P.beige); rect(245, 131, 265, 131, P.beigeL); rect(248, 134, 262, 136, P.beigeS); rect(248, 139, 262, 140, P.grisS);
    rect(18, 96, 52, 122, P.k); rect(19, 97, 51, 121, P.beige); rect(46, 97, 51, 121, P.beigeS); rect(22, 100, 46, 116, P.k); rect(23, 101, 45, 115, P.pantR); rect(28, 118, 40, 121, P.beigeS);
    // el teclado beige, el ratón con su alfombrilla, los papeles impresos y el teléfono
    rect(138, 117, 188, 122, P.k); rect(139, 117, 187, 121, P.beigeL); for (let y = 118; y < 121; y++) for (let x = 140 + (y % 2); x < 186; x += 3) pset(x, y, P.beigeS);
    rect(194, 119, 210, 122, P.azulS); rect(200, 116, 204, 120, P.k); rect(201, 117, 203, 119, P.beigeL);
    rect(102, 114, 128, 122, P.k); rect(103, 115, 127, 122, P.blanco); rect(105, 113, 126, 119, P.blanco); for (let y = 115; y < 120; y += 2) rect(107, y, 122, y, P.gris);
    rect(56, 112, 74, 122, P.k); rect(57, 113, 73, 122, P.grisK); rect(55, 110, 75, 113, P.k); rect(56, 111, 74, 112, P.grisD); for (const x of [60, 64, 68]) pset(x, 117, P.gris);
    // el suelo de moqueta en losetas
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let c = ((x >> 4) + (y >> 3)) % 2 ? P.moqueta : P.moquetaS; if (h(x, y, 29) > 0.9) c = P.moquetaL; pset(x, y, c); }
    for (let x = 0; x < 320; x++) pset(x, 150, P.k);
    // los cables que cuelgan bajo la mesa, la papelera con papeles y la mochila apoyada
    for (let y = 150; y < 160; y++) { pset(90 + Math.round(Math.sin(y * 0.5) * 1), y, P.k); pset(262 + Math.round(Math.sin(y * 0.4) * 1), y, P.grisK); }
    rect(98, 156, 114, 174, P.k); rect(99, 157, 113, 174, P.grisD); for (let x = 101; x < 113; x += 3) rect(x, 158, x, 173, P.grisK); rect(100, 153, 106, 157, P.blanco); rect(105, 154, 111, 156, P.beigeL);
    rect(290, 150, 312, 172, P.k); rect(291, 151, 311, 172, P.azulS); rect(291, 151, 311, 155, P.azul); rect(296, 160, 306, 168, P.azul); rect(296, 160, 306, 160, P.azulL); rect(299, 146, 303, 151, P.grisK);
    // la silla de oficina, vacía, al lado
    rect(232, 128, 254, 146, P.k); rect(233, 129, 253, 145, P.asiento); rect(233, 129, 253, 130, P.alfB); rect(236, 146, 250, 150, P.k); rect(240, 150, 244, 168, P.grisK);
    rect(230, 168, 254, 170, P.grisK); for (const x of [230, 242, 254]) disco(x, 172, 2, P.k);
  });
  // los dos cerebros, cada uno con lo que bebía debajo, y la cruz de la retícula sobre cada uno
  const icono = (cx, cy, m) => {
    if (m === 'vaso') { rect(cx - 4, cy - 5, cx + 4, cy + 5, P.k); rect(cx - 3, cy - 4, cx + 3, cy + 4, P.blanco); rect(cx - 3, cy - 1, cx + 3, cy + 4, hex('#5a2c18')); rect(cx - 3, cy - 4, cx - 2, cy + 4, P.gris); return; }
    e_lata(R, cx, cy + 9, { color: m === 'azul' ? 'azul' : 'rojo' });
  };
  [[140, o.zonasIzq ?? 0, o.marcaIzq ?? 'vaso'], [220, o.zonas ?? 0, o.marcaDer ?? 'rojo']].forEach(([cx, z, m], i) => {
    if (PIEZAS_NC.cerebro) PIEZAS_NC.cerebro(R, cx, 92, { s: 3, zonas: z, t: t + i });
    linea(cx - 40, 62, cx - 34, 62, P.verde); linea(cx + 34, 62, cx + 40, 62, P.verde);
    icono(cx, 101, m);
  });
  // la señal que corre arriba y el cursor que barre la pantalla
  for (let x = 152; x < 230; x++) { const y = 26 + Math.round(Math.sin(x * 0.5 - t * 6) * 1 + ((o.zonas ?? 0) > 0.3 ? Math.sin(x * 0.2 - t * 3) * 0.8 : 0)); pset(x, y, P.verde); }
  { const sx = 98 + Math.floor((t * 24) % 162); for (let y = 30; y < 110; y += 2) pset(sx, y, P.pantR); }
  // el salvapantallas del monitor de tubo, el piloto de la torre, las luces del rack y la taza que humea
  { const f = t * 1.5; for (let k = 0; k < 6; k++) pset(Math.round(34 + Math.cos(f + k) * (4 + k)), Math.round(108 + Math.sin(f * 1.3 + k) * 5), [P.verde, P.azulL, P.amarillo][k % 3]); }
  pset(250, 146, Math.sin(t * 6) > 0 ? P.verde : P.verdeS);
  for (let y = 56; y < 128; y += 12) for (let k = 0; k < 4; k++) pset(296 + k * 4, y + 6, h(k, y, Math.floor(t * 4)) > 0.5 ? (k === 3 ? P.amarillo : P.verde) : P.ctrlS);
  rect(214, 112, 222, 122, P.k); rect(215, 113, 221, 122, P.rojoS); rect(215, 113, 221, 113, hex('#4a2414')); rect(222, 115, 224, 119, P.k);
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(218 + Math.sin(f * 7 + k) * 1.5), Math.round(110 - f * 10), P.gris); }
  return { suelo: 170, sueloMin: 162, sueloMax: 176, pantalla: [98, 24, 260, 110], cerebros: [[140, 92], [220, 92]], iconos: [[140, 103], [220, 103]], mesa: { y: 122 } };
}

// geometría: el estrado (pies del profesor) 140–160 (por omisión 152) en x 20–176; la pizarra x 14–176 y 26–104 (la lata
// tachada en x 44–64 y 58–90, el corazón en (126, 72), la regla en x 144–149); el atril x 152–174 con el portátil (tablero en y
// 118); la primera fila de mesas (hoyDelante) x 186–320 con el tablero en y 147–152: los estudiantes del elenco se
// sientan detrás con los pies en y 158 (asientos en x 204, 236, 268, 300) y asoman cabeza y hombros; las gradas de
// fondo suben a la derecha; la ventana x 196–270 y 22–56; el reloj (188, 40).
function e_aula(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P;
  e_capa(R, 'nc-aula', () => {
    // la pared de bloques pintados con sus juntas, el techo con fluorescentes
    for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 8), xo = (x + (f % 2) * 12) % 24; let c = (y % 8 === 7 || xo === 23) ? P.junta : (y % 8 === 0 || xo === 0) ? P.bloqueL : h(x, y, 30) > 0.94 ? P.bloqueS : P.bloque; pset(x, y, c); }
    rect(0, 0, 319, 8, P.techo); rect(0, 8, 319, 9, P.techoS); for (let x = 0; x < 320; x += 30) rect(x, 0, x, 8, P.techoS);
    for (const x0 of [180, 240]) { rect(x0, 2, x0 + 34, 7, P.grisS); rect(x0 + 1, 3, x0 + 33, 6, P.luz); }
    // la pizarra: marco de aluminio, la tiza borrada a manchas, la repisa con tizas y borrador; el estuche de la pantalla
    rect(12, 16, 178, 20, P.k); rect(13, 17, 177, 19, P.alu); rect(13, 19, 177, 19, P.aluS); rect(94, 20, 96, 23, P.grisK);
    rect(12, 24, 178, 106, P.k); rect(13, 25, 177, 105, P.alu); rect(16, 28, 174, 102, P.piz);
    for (let y = 28; y <= 102; y++) for (let x = 16; x <= 174; x++) { const v = h(x >> 3, y >> 2, 31); if (v > 0.8 && (x + y) % 2 === 0) pset(x, y, P.pizL); else if (v < 0.12 && (x + y) % 3 === 0) pset(x, y, P.pizS); }
    rect(10, 104, 180, 108, P.k); rect(11, 105, 179, 107, P.alu); rect(11, 107, 179, 107, P.aluS); rect(30, 103, 38, 104, P.tiza); rect(44, 103, 48, 104, P.tizaA); rect(150, 101, 162, 104, P.k); rect(151, 102, 161, 103, P.frisoL);
    e_dibujosPizarra(R, 0, { x0: 30, y0: 32, s: 1 }, { x: 1, regla: 1, corazon: 1 }, true);
    // el estrado de madera y el suelo de moqueta de las gradas
    e_tablas(R, 0, 140, 186, 179, [P.escenario, P.escenarioS, P.escenarioL, P.tablaJ], 3);
    rect(0, 138, 186, 140, P.escenarioS); rect(0, 138, 186, 138, P.escenarioL);
    // las gradas: cada fila con su pared de frente, el banco azul y la mesa larga (la primera la pinta hoyDelante)
    for (let k = 3; k >= 1; k--) { const y = 140 - k * 18, x0 = 186 + k * 4;
      rect(x0, y + 4, 319, y + 22, P.gradaS); rect(x0, y + 4, 319, y + 4, P.gradaL); for (let x = x0 + 6; x < 320; x += 14) rect(x, y + 6, x, y + 21, P.grada);
      rect(x0 - 2, y - 2, 319, y + 3, P.k); rect(x0 - 1, y - 1, 319, y + 1, P.gradaL); rect(x0 - 1, y + 2, 319, y + 2, P.grada);
    }
    rect(186, 140, 319, 179, P.moqueta); for (let y = 140; y < 180; y++) for (let x = 186 + (y % 2); x < 320; x += 2) if (h(x, y, 32) > 0.7) pset(x, y, P.moquetaS);
    rect(184, 30, 186, 140, P.grisS);
    // la ventana al campus (cielo, árboles, el edificio de ladrillo)
    rect(194, 20, 272, 58, P.k); rect(195, 21, 271, 57, P.marco);
    // el atril de madera con el portátil y el vaso de agua
    rect(150, 116, 176, 150, P.k); rect(151, 117, 175, 149, P.escenario); rect(151, 117, 175, 119, P.escenarioL); rect(170, 120, 175, 149, P.escenarioS); rect(155, 124, 168, 144, P.escenarioS); rect(156, 125, 168, 144, P.escenarioL);
    rect(148, 150, 178, 152, P.k);
    rect(154, 108, 168, 116, P.k); rect(155, 109, 167, 115, P.grisS); rect(152, 115, 170, 116, P.gris); rect(171, 110, 174, 116, P.edifV);
    // el reloj (con números de las horas en marcas) y el interruptor
    disco(188, 70, 8, P.k); disco(188, 70, 7, P.blanco); for (let k = 0; k < 12; k++) pset(Math.round(188 + Math.cos(k * Math.PI / 6) * 5.5), Math.round(70 + Math.sin(k * Math.PI / 6) * 5.5), k % 3 ? P.gris : P.k);
    rect(4, 112, 8, 120, P.k); rect(5, 113, 7, 119, P.blanco); rect(6, 115, 6, 117, P.gris);
  });
  // la ventana: el cielo, el edificio de ladrillo del campus y dos árboles que se mecen
  e_cieloVentana(R, 196, 22, 270, 56, t, 3);
  rect(222, 34, 262, 56, hex('#a85a3a')); for (let y = 36; y < 56; y += 2) for (let x = 222 + (y % 4); x < 262; x += 4) pset(x, y, hex('#8a4428')); for (let x = 226; x < 260; x += 8) { rect(x, 38, x + 3, 42, P.edifV); rect(x, 46, x + 3, 50, P.edifV); } rect(220, 32, 264, 34, P.blanco);
  e_arbol(R, 206, 56, 18, t, 4); e_arbol(R, 266, 56, 14, t, 5);
  R.recorte(null);
  rect(232, 21, 234, 57, P.marco); rect(195, 38, 271, 39, P.marco);
  // las agujas del reloj
  { const am = t * 0.1 + 2, as = t * 1.05; linea(188, 70, Math.round(188 + Math.cos(am) * 4), Math.round(70 + Math.sin(am) * 4), P.k); linea(188, 70, Math.round(188 + Math.cos(as) * 6), Math.round(70 + Math.sin(as) * 6), P.rojo); }
  // el proyector del techo con su piloto y el haz tenue hacia la pantalla enrollada
  rect(212, 9, 214, 14, P.grisD); rect(204, 14, 224, 20, P.k); rect(205, 15, 223, 19, P.gris); disco(206, 17, 2, P.k); pset(221, 16, Math.sin(t * 2) > 0 ? P.verde : P.verdeS);
  // los dibujos de tiza que cambian (la X y la regla) por encima de la capa fija
  e_dibujosPizarra(R, t, { x0: 30, y0: 32, s: 1 }, { x: o.x ?? 1, regla: o.regla ?? 1, corazon: 1 }, false);
  // la luz del portátil del atril y el fluorescente que parpadea a ratos
  for (let x = 156; x < 167; x++) if ((x + Math.floor(t * 3)) % 4 === 0) pset(x, 111, P.pantL);
  if ((t % 8.3) < 0.2 && Math.sin(t * 60) > 0) rect(241, 3, 273, 6, P.techoS);
  // los estudiantes pequeños de fondo en las gradas: teclean, levantan la mano, bostezan; brillan las pantallas
  for (let k = 3; k >= 1; k--) { const y = 140 - k * 18, x0 = 186 + k * 4;
    for (let i = 0; i < 5; i++) { const sx = x0 + 10 + i * 24 + (k % 2) * 10; if (sx > 314) continue; const sem = k * 7 + i, bob = Math.sin(t * 2 + sem) > 0.85 ? 1 : 0;
      const pi = P.piel[sem % 5], ro = P.ropa[sem % 7], pe = P.pelo[(sem * 3) % 5];
      rect(sx - 3, y - 7, sx + 3, y - 2, ro); rect(sx - 3, y - 7, sx + 3, y - 7, P.k);
      disco(sx, y - 10 + bob, 3, pi); rect(sx - 3, y - 14 + bob, sx + 3, y - 12 + bob, pe); pset(sx - 3, y - 11 + bob, pe); pset(sx + 3, y - 11 + bob, pe);
      pset(sx - 1, y - 10 + bob, P.k); pset(sx + 1, y - 10 + bob, P.k);
      if ((sem % 5) === 2 && Math.sin(t * 0.7 + sem) > 0.6) { rect(sx + 4, y - 18, sx + 5, y - 7, ro); rect(sx + 4, y - 20, sx + 5, y - 18, pi); }
      if ((sem % 5) === 4 && Math.sin(t * 0.5 + sem) > 0.8) { pset(sx, y - 8 + bob, P.k); pset(sx, y - 9 + bob, P.rojoS); }
      rect(sx + 2, y - 5, sx + 8, y - 2, P.k); rect(sx + 3, y - 5, sx + 7, y - 3, P.gris); if ((Math.floor(t * 4) + sem) % 3) pset(sx + 5, y - 4, P.pantL);
      const tq = Math.floor(t * 6 + sem) % 2; pset(sx - 1 + tq, y - 1, pi); pset(sx + 2 - tq, y - 1, pi); }
    rect(x0 - 1, y - 1, 319, y + 1, P.gradaL); rect(x0 - 1, y + 2, 319, y + 2, P.grada); rect(x0 - 2, y + 3, 319, y + 3, P.k);
  }
  // el polvo de tiza en el aire delante de la pizarra
  for (let k = 0; k < 8; k++) { const f = (t * 0.08 + h(k, 3, 33)) % 1; pset(Math.round(20 + h(k, 4, 33) * 150 + Math.sin(t + k) * 3), Math.round(104 - f * 70), P.tizaS); }
  return { suelo: 152, sueloMin: 140, sueloMax: 160, pizarra: [16, 28, 174, 102], lata: [54, 74], corazon: [126, 72], atril: [152, 116, 174, 150], asientos: [204, 236, 268, 300], sueloFila: 158, ventana: [196, 22, 270, 56] };
}

// lo de delante del aula: la primera fila de mesas de las gradas (tablero, frente con paneles y los portátiles al lado
// de cada asiento, bajos, para no tapar caras)
function e_aulaDelante(R, t, o) {
  const { rect, pset } = R, P = e_P;
  rect(184, 146, 319, 153, P.k); rect(185, 147, 319, 149, P.gradaL); rect(185, 150, 319, 152, P.grada);
  rect(186, 154, 319, 179, P.gradaS); for (let x = 192; x < 320; x += 32) { rect(x, 157, x + 26, 176, P.k); rect(x + 1, 158, x + 26, 176, P.grada); rect(x + 1, 158, x + 25, 158, P.gradaS); for (let i = 0; i < 3; i++) { const vy = 162 + Math.floor(h(x, i, 42) * 12); rect(x + 4, vy, x + 12 + Math.floor(h(x, i, 43) * 10), vy, P.gradaL); } }
  rect(184, 154, 185, 179, P.k);
  for (const sx of [204, 236, 268, 300]) { const lx = sx + 11; if (lx > 316) continue; rect(lx - 4, 142, lx + 4, 147, P.k); rect(lx - 3, 143, lx + 3, 146, P.gris); rect(lx - 3, 146, lx + 3, 146, P.grisS); if ((Math.floor(t * 3) + sx) % 4) pset(lx, 144, P.pantL); }
  return { fila: [184, 146, 319, 180], tablero: 147 };
}

// geometría: suelo (pies del profesor) 168–178 (por omisión 174) en x 16–280; la pizarra x 10–270 y 18–146 (la lata
// tachada en x 42–82, y 72–136; la flecha en y 104; el corazón en (206, 100); la regla en x 242–252); la repisa en y 146–150;
// a la derecha, el reloj (296, 66) y el interruptor; libres: x 20–260 delante de la pizarra.
function e_pizarra(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P;
  e_capa(R, 'nc-pizarra', () => {
    for (let y = 0; y < 160; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 10), xo = (x + (f % 2) * 15) % 30; let c = (y % 10 === 9 || xo === 29) ? P.junta : (y % 10 === 0 || xo === 0) ? P.bloqueL : h(x, y, 34) > 0.94 ? P.bloqueS : P.bloque; pset(x, y, c); }
    rect(8, 16, 272, 150, P.k); rect(9, 17, 271, 149, P.alu); rect(9, 148, 271, 149, P.aluS); rect(12, 20, 268, 144, P.piz);
    for (let y = 20; y <= 144; y++) for (let x = 12; x <= 268; x++) { const v = h(x >> 3, y >> 3, 35); if (v > 0.78 && (x + y) % 2 === 0) pset(x, y, P.pizL); else if (v < 0.1 && (x + y) % 3 === 0) pset(x, y, P.pizS); }
    for (let k = 0; k < 4; k++) { const x0 = 20 + Math.floor(h(k, 1, 36) * 200), y0 = 30 + Math.floor(h(k, 2, 36) * 90); for (let j = 0; j < 8; j++) for (let i = 0; i < 30; i++) if ((i + j * 2) % 3 === 0) pset(x0 + i + j, y0 + j, P.pizM); }
    rect(6, 146, 274, 152, P.k); rect(7, 147, 273, 150, P.alu); rect(7, 150, 273, 150, P.aluS);
    rect(40, 144, 52, 146, P.tiza); rect(58, 145, 63, 146, P.tizaA); rect(68, 145, 72, 146, P.tizaP); rect(200, 141, 222, 146, P.k); rect(201, 142, 221, 143, P.frisoL); rect(201, 144, 221, 145, P.grisK);
    e_tablas(R, 0, 158, 319, 179, [P.escenario, P.escenarioS, P.escenarioL, P.tablaJ], 4); rect(0, 156, 319, 158, P.escenarioS);
    // a la derecha, el reloj, el interruptor y el cartel de evacuación (solo pictograma)
    disco(296, 66, 10, P.k); disco(296, 66, 9, P.blanco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(296 + Math.cos(a) * 7), Math.round(66 + Math.sin(a) * 7), k % 3 ? P.gris : P.k); }
    rect(290, 100, 302, 110, P.k); rect(291, 101, 301, 109, P.verdeS); rect(293, 103, 295, 104, P.blanco); rect(294, 105, 296, 108, P.blanco); rect(297, 104, 299, 105, P.blanco);
    rect(286, 120, 291, 130, P.k); rect(287, 121, 290, 129, P.blanco); rect(288, 123, 289, 126, P.gris);
    e_dibujosPizarra(R, 0, { x0: 14, y0: 20, s: 2 }, { x: 1, regla: 1, corazon: 1 }, true);
  });
  { const am = t * 0.1 + 2, as = t * 1.05; linea(296, 66, Math.round(296 + Math.cos(am) * 5), Math.round(66 + Math.sin(am) * 5), P.k); linea(296, 66, Math.round(296 + Math.cos(as) * 8), Math.round(66 + Math.sin(as) * 8), P.rojo); }
  e_dibujosPizarra(R, t, { x0: 14, y0: 20, s: 2 }, { x: o.x ?? 1, regla: o.regla ?? 1, corazon: o.corazon ?? 1 }, false);
  // el rayo de sol que entra en diagonal por una ventana de fuera de cuadro, con el polvo de tiza que flota
  for (let y = 20; y < 158; y++) { const a = 150 + (y - 20) * 0.8; for (let x = Math.round(a); x < a + 26; x++) if ((x + y) % 4 === 0) { pset(x, y, y < 145 && x < 269 && x > 11 ? P.pizM : P.bloqueL); } }
  for (let k = 0; k < 14; k++) { const f = (t * 0.06 + h(k, 5, 37)) % 1, y = Math.round(150 - f * 120), x = Math.round(150 + (y - 20) * 0.8 + h(k, 6, 37) * 26 + Math.sin(t * 0.8 + k) * 2); pset(x, y, P.tiza); }
  return { suelo: 174, sueloMin: 168, sueloMax: 178, pizarra: [12, 20, 268, 144], lata: [62, 104], corazon: [206, 100], regla: [247, 102] };
}

// los dibujos de tiza de la pizarra en el origen o.x0, o.y0 a escala s (1 en el aula, 2 de cerca); fijo = true pinta lo
// que no cambia (la gráfica que baja, el 1985, la lata, la flecha, los garabatos); fijo = false, lo que se anima: la X que
// tacha la lata (u.x 0–1), el corazón que se dibuja (u.corazon 0–1) y la regla que llega a su lado (u.regla 0–1) con su «?»
function e_dibujosPizarra(R, t, g, u, fijo) {
  const P = e_P, s = g.s, X = (x) => Math.round(g.x0 + x * s), Y = (y) => Math.round(g.y0 + y * s);
  // un trazo de tiza: una línea a puntos irregulares (se ve el grano de la tiza), de grosor s
  const trazo = (x0, y0, x1, y1, c, f = 1) => { const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) * s * f)); for (let i = 0; i <= n; i++) { const a = i / Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) * s)); if (a > f) break; const x = X(x0 + (x1 - x0) * a), y = Y(y0 + (y1 - y0) * a); if (h(x, y, 38) > 0.12) R.pset(x, y, c); if (s > 1 && h(x, y, 39) > 0.3) R.pset(x + 1, y, c); } };
  if (fijo) {
    // la gráfica de ventas que baja, con su flecha (arriba a la izquierda)
    trazo(4, 3, 4, 20, P.tiza); trazo(4, 20, 30, 20, P.tiza);
    [[8, 7], [14, 10], [20, 13], [26, 16]].forEach(([x, y]) => { for (let xx = x; xx < x + 4; xx++) trazo(xx, y, xx, 19, P.tizaS); });
    trazo(8, 4, 28, 14, P.tizaR); trazo(28, 14, 24, 14, P.tizaR); trazo(28, 14, 27, 10, P.tizaR);
    // el 1985 junto a la gráfica
    R.numero('1985', X(48), Y(16), s > 1 ? { centro: true, color: P.tiza, tam: 16, contorno: false, sombra: false } : { centro: true, color: P.tiza, fina: true, sombra: false });
    // la lata dibujada (contorno con su tapa, las dos bandas y el brillo)
    trazo(14, 30, 14, 58, P.tizaR); trazo(34, 30, 34, 58, P.tizaR); trazo(15, 27, 33, 27, P.tizaR); trazo(15, 31, 33, 31, P.tizaR); trazo(14, 28, 15, 27, P.tizaR); trazo(33, 27, 34, 28, P.tizaR);
    trazo(15, 59, 33, 59, P.tizaR); trazo(15, 40, 33, 40, P.tizaR); trazo(15, 46, 33, 46, P.tizaR); trazo(17, 33, 17, 56, P.tiza);
    // la flecha de la lata al corazón y los garabatos de apuntes (rayas onduladas, sin letras)
    trazo(46, 42, 74, 42, P.tiza); trazo(74, 42, 70, 39, P.tiza); trazo(74, 42, 70, 45, P.tiza);
    for (let k = 0; k < 2; k++) for (let x = 44; x < 72; x++) { const y = 50 + k * 5 + Math.round(Math.sin(x * 0.9 + k) * 0.8); if (h(x, k, 40) > 0.25) R.pset(X(x), Y(y), P.tizaS); }
    for (let k = 0; k < 2; k++) for (let x = 66; x < 110; x++) { const y = 6 + k * 5 + Math.round(Math.sin(x * 0.8 + k) * 0.8); if (h(x, k, 41) > 0.25) R.pset(X(x), Y(y), P.tizaS); }
    return;
  }
  // el corazón que se dibuja (rosa, relleno a rayas)
  const fc = Math.max(0, Math.min(1, u.corazon ?? 1));
  if (fc > 0) { const cx = 96, cy = 40, n = 80; let pv = null;
    for (let i = 0; i <= Math.round(n * fc); i++) { const a = i / n * Math.PI * 2, x = cx + 16 * Math.sin(a) ** 3 * 0.75, y = cy - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 0.75; if (pv) trazo(pv[0], pv[1], x, y, P.tizaP); pv = [x, y]; }
    if (fc >= 1) for (let k = -8; k <= 8; k += 3) trazo(cx + k - 3, cy - 6 + Math.abs(k) * 0.3, cx + k + 3, cy + 6 - Math.abs(k) * 0.4, P.tizaP, 0.8); }
  // la regla amarilla que llega al lado del corazón, con sus marcas, y el «?» porque no lo puede medir
  const fr = Math.max(0, Math.min(1, u.regla ?? 1));
  if (fr > 0) { const rx = 114 + (1 - fr) * 10;
    trazo(rx, 24, rx, 58, P.tizaA); trazo(rx + 5, 24, rx + 5, 58, P.tizaA); trazo(rx, 24, rx + 5, 24, P.tizaA); trazo(rx, 58, rx + 5, 58, P.tizaA);
    for (let y = 27; y < 58; y += 3) trazo(rx, y, rx + (y % 9 === 0 ? 3 : 2), y, P.tizaA);
    if (fr >= 1) R.icono('?', X(104), Y(17) + Math.round(Math.sin(t * 2) * 1), P.tiza, e_P.pizS, s); }
  // la X que tacha la lata: dos trazos blancos que se dibujan uno tras otro
  const fx = Math.max(0, Math.min(1, u.x ?? 1));
  if (fx > 0) { trazo(8, 24, 40, 62, P.tiza, Math.min(1, fx * 2)); if (fx > 0.5) trazo(40, 24, 8, 62, P.tiza, (fx - 0.5) * 2); }
}

// una franja fija (filas y0–y1) que se pinta una sola vez en su búfer y en cada fotograma se copia solo esa franja
function a_capaFranja(R, clave, y0, y1, dibuja) {
  let m = a_CAPAS.get(R); if (!m) a_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.buf.set(b.subarray(y0 * R.W, (y1 + 1) * R.W), y0 * R.W);
}

// el mostrador de mármol grueso de la fuente, de y 146 a 179 (lo pintan a_fuente y, por delante de los actores, a_fuenteDelante)
function a_fuenteFrente(R) {
  const { rect, pset, disco, linea } = R;
  // el mostrador de mármol grueso: tablero con canto y vetas, el frente en paneles con pilastras y la barra de los pies
  rect(0, 146, 319, 146, AP.marmolL); rect(0, 147, 319, 149, C.marmol); rect(0, 150, 319, 150, C.marmolS); rect(0, 151, 319, 152, AP.caobaD);
  for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.13 + Math.sin(x * 0.031) * 4); if (Math.abs(v) < 0.12) pset(x, 147 + (x % 3), AP.marmolV); if (x % 7 === 0) pset(x, 146, hex('#ffffff')); }
  rect(0, 153, 319, 154, C.laton); rect(0, 153, 319, 153, AP.latonL);
  for (let y = 155; y < 180; y++) for (let x = 0; x < 320; x++) { const u = (x + 8) % 64; let c;
    if (u < 6) c = u === 0 ? AP.caobaL : u === 5 ? AP.caobaS : (u === 2 ? AP.caobaS : AP.caoba);
    else if (y === 155) c = C.marmolS;
    else if (u >= 11 && u <= 58 && y >= 159 && y <= 169) { const bev = u === 11 || y === 159 ? AP.verdeFS : u === 58 || y === 169 ? AP.verdeFL : null;
      const v = Math.sin(x * 0.09 + y * 0.5 + Math.sin(y * 0.3 + x * 0.07) * 2.4); c = bev ?? (Math.abs(v) < 0.1 ? AP.verdeFL : Math.abs(v) < 0.3 ? AP.verdeF : (h(x >> 1, y, 88) > 0.85 ? AP.verdeF : hex('#2e6a40'))); }
    else if (u === 10 || u === 59 || y === 158 || y === 170) c = (u === 10 || y === 158) ? C.marmolS : AP.marmolL;
    else if (u === 6) c = C.marmolS; else if (u === 63) c = AP.marmolL;
    else { const v = Math.sin(x * 0.12 + y * 0.45 + Math.sin(y * 0.2 + x * 0.04) * 2.6); c = Math.abs(v) < 0.09 ? C.marmolS : Math.abs(v) < 0.22 ? AP.marmolV : (y > 172 ? a_mezcla(C.marmol, C.marmolS, 0.4) : C.marmol); }
    pset(x, y, c); }
  for (let x = 26; x < 320; x += 64) { disco(x, 164, 2, C.laton); pset(x - 1, 163, AP.latonL); pset(x + 1, 165, AP.latonS); }
  rect(0, 172, 319, 173, C.laton); rect(0, 174, 319, 174, AP.latonS); for (let x = 30; x < 320; x += 64) { rect(x, 171, x + 2, 176, AP.latonS); pset(x, 171, AP.latonL); }
}

// el punto de color pegado en la base de un vaso de cata (x centro, y la base, s la escala): borde oscuro, color y brillo
function b_puntoVaso(R, x, y, s, c, l) {
  const cy = y - 3 * s - 1;
  if (s >= 2) { R.disco(x, cy, s + 1, C.k); R.disco(x, cy, s, c); R.pset(x - 1, cy - 1, l); R.pset(x - 1, cy - 2 + (s > 2 ? 0 : 1), C.blanco); }
  else { R.rect(x - 1, cy, x + 1, cy + 1, C.k); R.rect(x, cy, x, cy, c); R.pset(x + 1, cy, c); }
}

// el destello local de un flash: aclara en trama unas elipses [cx, cy, rx, ry] (más en el centro, nada fuera); g 0–1
function c_destelloLocal(R, g, zonas) {
  const BL = hex('#ffffff');
  for (const [cx, cy, rx, ry] of zonas) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) {
    const e = (i / rx) ** 2 + (j / ry) ** 2, x = cx + i, y = cy + j; if (e >= 1 || x < 0 || x > 319 || y < 0 || y > 179 || ((x + y) & 1)) continue;
    const p = R.pget(x, y); if (p) R.pset(x, y, c_mez(p, BL, 0.26 * g * (1 - e)));
  }
}
