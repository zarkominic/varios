// Fontanería y decorados del episodio 18 (Sierra: los juegos de aventura de Ken y Roberta Williams, 1979–2023) en el
// estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Ocho decorados (guion.md): A la casa de 1979 (y los
// salones de los jugadores), B el reino de cuento (castillo, bosque, lago, peligros) y su corte (el trono, la alcoba, el
// pueblo de las canciones), C la oficina en la montaña, D la pantalla de la muerte, E el espacio, F la ciudad (neón,
// comisaría, bar, Nueva Orleans) y el pueblo de fantasía, G el estudio de sonido y color, H hoy (y la cueva, de verdad y
// en 3D); más las piezas de los gags (el disquete con ojos, el cuadro de la muerte con la calavera que guiña, la tarjeta
// de sonido, las gafas de realidad virtual, el coche patrulla).
// HOMENAJE DIBUJADO POR NOSOTROS: nada copiado de los juegos (ni sprites, ni pantallas, ni logos, ni la interfaz).
// Sin letras: pantallas con trazos, iconos y pictogramas. Las muertes son de cuento y con chiste (un «chof», humo, la
// calavera que guiña): nada morboso.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite.
//
//   import * as T from '/atomo/plato/escenas/si-comun.js';
//   const { E, R, M } = await T.preparar('si-gancho');
//   T.rodar(E, R, [[0, (t) => T.reino(R, t, { encuadre: 'castillo' })]], { año: 1984 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI };


const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la California de 1979–1981: madera de pino, formica, naranja y mostaza de los setenta, la pantalla de fósforo verde
    pinoM: '#b8844a', pinoMS: '#8a5e30', formica: '#e8d8a8', mostaza: '#d8a830', naranja70: '#d8783a', fosforo: '#5ae86a', fosforoS: '#1a4a24',
    // el reino de cuento: piedra clara del castillo, tejados azules, hierba de cuento, el foso
    piedraC: '#c8c0b0', piedraCS: '#8a8478', tejado: '#3a5ab0', hierba: '#5ab04a', hierbaS: '#3a8a3a', foso: '#3a7ab0', fosoS: '#2a5a8a',
    // la oficina en la montaña: pinos de Sierra Nevada, nieve, granito
    pinoV: '#2a5a3a', pinoVL: '#4a8a5a', nieve: '#eef4f8', nieveS: '#b8c8d8', granito: '#8a8a94', granitoL: '#b0b0b8',
    // el espacio: metal de nave, luces de aviso, el desierto de un planeta
    metal: '#7a8494', metalS: '#4e5664', metalL: '#a8b2c0', aviso: '#e84a3a', planeta: '#d8a060', planetaS: '#a8703a',
    // la ciudad de noche: neones (rosa, cian), asfalto mojado; el oro y el morado de la fantasía
    neonR: '#ff5aa8', neonC: '#5ae8f0', asfalto: '#2a2a34', asfaltoL: '#44445a', oroF: '#e8b830', moradoF: '#6a3a9a',
    // el estudio de 1990: moqueta gris, monitores beis, espuma de la cabina
    beis: '#d8d0b8', beisS: '#a8a088', espuma: '#3a3a4a', moqueta: '#6a6a78',
    // la calavera del cuadro de la muerte y el disquete con ojos
    hueso: '#f2eee2', huesoS: '#a8a090', disco: '#2a2e3a', discoL: '#4a5060', etiqueta: '#e8e4d8', metalDisco: '#c0c4cc',
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
  const E = await escena(id, 'ep18');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: el disquete (1979–1982), el castillo (1983–1993) y las gafas de RV (1994–2026)
  Object.assign(R.ICONOS, {
    disquete: ['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#..#..#', '#######'],
    castillo: ['#.#.#.#', '#######', '.#####.', '.##.##.', '.##.##.', '.#####.', '#######'],
    gafasrv: ['.......', '#######', '##.#.##', '##.#.##', '#######', '#.....#', '.......'],
  });
  R.tramosTiempo([[1979, 1982, R.PALA.ORO, 'disquete'], [1983, 1993, R.PALA.AZUL, 'castillo'], [1994, 2026, R.PALA.ROJO, 'gafasrv']]);
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

// ── A · La casa de 1979 y los salones de los jugadores ────────────────────────────────────────────────────────────────
// La casa de una pareja joven en la California de 1979–1981 (madera de pino, formica, naranja y mostaza de los setenta) y
// los salones de los jugadores. o.encuadre:
//   'cocina': la cocina de noche: mesa de formica con tazas y una lámpara de techo, armarios de pino, nevera con imanes,
//     ventana con la noche y un limonero; en la mesa, el terminal de texto (teclado y pantalla verde, con su cable a la
//     pared y el teléfono con módem de cazoletas); o.camara 'general' o 'pantalla' (la pantalla verde de cerca: renglones
//     de trazos que se escriben solos, el cursor que parpadea, o.icono 'lampara' | 'cueva' | null al lado).
//   'mesa': la mesa de la cocina de día convertida en taller: papel cuadriculado, lápices, una goma, el Apple II con la
//     tapa abierta y cables, el monitor pequeño en blanco y negro con o.dibujo (0–1) que traza una casa vieja con una
//     ventana encendida; o.camara 'general' o 'monitor' (el monitor y el papel de cerca).
//   'salon': el salón de 1980–1981: sofá de pana, alfombra de pelo, estantería con discos, la mesa baja cubierta de bolsas
//     con cierre, disquetes y hojas; o.cajas (0–1): cajas de envíos que se apilan hasta el techo y un mapa de EE. UU. con
//     chinchetas en la pared; o.camara 'general' o 'mesa' (las bolsas, los disquetes y las manos que las llenan).
//   'super': un supermercado de 1980: pasillo con estantes llenos (latas, cajas de colores sin letras), el suelo de
//     baldosas, fluorescentes, la caja registradora con su cinta; o.camara 'general' (el pasillo) o 'caja' (la caja de
//     cerca, sitio para la cajera y un carro lleno).
//   'porche': el porche de madera de una casa de California al atardecer: barandilla, macetas, una mecedora, palmeras y
//     colinas doradas; o.camara 'general' o 'cerca' (la mesa del porche con un ordenador antiguo y dos tazas).
//   'jugadores': el salón de una familia con su ordenador: o.epoca 1985 (moqueta, sofá de flores, monitor beis con el
//     caballero en pantalla, cajas de juegos apiladas) o 1995 (sofá, pósteres sin letras, torre y monitor más grandes,
//     latas de refresco); o.camara 'general' o 'sofa' (los jugadores en el sofá de frente, con la luz de la pantalla).
// Devuelve { suelo, mesa: [x0, y, x1], pantalla: [x, y, w, h], … } según el encuadre.
export function casa(R, t, o = {}) {
  provisional(R, t, C.pinoMS, C.formica);
  return { suelo: 160 };
}

// ── B · El reino de cuento ────────────────────────────────────────────────────────────────────────────────────────────
// Un reino de cuento de hadas pintado como las aventuras de 1984–1990, pero nuestro: castillo de piedra clara con
// tejados azules y banderolas (sin escudos reales), hierba de cuento, flores, caminos. o.luz 'dia' (por omisión),
// 'tarde', 'noche'. o.encuadre:
//   'castillo': el castillo con su foso y su puente levadizo de tablas con cadenas; el agua del foso con ondas y
//     reflejos, nenúfares y dos cocodrilos de cuento que asoman los ojos; o.salpicon (0–1): el «chof» y el chorro de agua
//     donde algo cae (o.salpiconX); o.camara 'general' o 'puente' (el puente y el foso de cerca, sitio para un caballero).
//   'bosque': el bosque del reino con árboles grandes en varias capas (troncos con corteza, copas con luz), setas,
//     helechos, un camino; los árboles de delante tapan a quien pasa por detrás (reinoDelante los pinta encima); o.camara
//     'general' o 'arbol' (un árbol grande de cerca con nido y un pájaro).
//   'lago': un lago con juncos, un sauce, piedras, una barca, el castillo a lo lejos; o.camara 'general' o 'orilla' (la
//     orilla de cerca con un tocón del que sale un gnomo).
//   'peligros': un camino de cuento con peligros: un barranco con un tronco, un río con corriente, una escalera de piedra
//     sin barandilla que sube a las nubes, la entrada de la cueva de un ogro; o.camara 'general' o 'barranco' (el tronco
//     sobre el barranco de cerca).
// Devuelve { suelo, puente: [x0, y, x1], foso: [x0, y, x1], … } según el encuadre.
export function reino(R, t, o = {}) {
  provisional(R, t, C.hierbaS, C.hierba);
  return { suelo: 160 };
}
// lo que va delante de los personajes en el bosque (troncos y copas de delante) y en el puente (las cadenas)
export function reinoDelante(R, t, o = {}) {}

// ── B2 · La corte del cuento ──────────────────────────────────────────────────────────────────────────────────────────
// Dentro del castillo y el pueblo de las canciones infantiles. o.encuadre:
//   'trono': el salón del trono: alfombra roja, columnas, vidrieras de colores (sin figuras ni letras), antorchas, el
//     trono con dosel; o.luz 'dia' o 'noche'; o.camara 'general' o 'tesoros' (tres cojines en pedestales con un espejo
//     mágico que brilla, un escudo mágico y un cofre que rebosa monedas sin parar).
//   'alcoba': la alcoba del rey de noche: cama con dosel, velas, ventana con la luna, una mesilla con frascos; o.camara
//     'general' o 'puerta' (la puerta grande de roble con un candado, la del final del juego).
//   'canciones': un pueblo de canciones infantiles: casitas con tejado de paja, un pozo, ovejas, una vaca, la luna de día,
//     un zapato gigante que es casa, un huerto; o.camara 'general' o 'corro' (la plaza de cerca para un corro de 4–6).
export function cuento(R, t, o = {}) {
  provisional(R, t, C.piedraCS, C.piedraC);
  return { suelo: 160 };
}

// ── C · La oficina en la montaña ──────────────────────────────────────────────────────────────────────────────────────
// Un pueblo de montaña cerca de Yosemite (pinos de Sierra Nevada, granito, nieve en las cumbres) y la oficina de la
// compañía. o.epoca 1981 (pequeña, encima de una tienda), 1986 (más mesas y dibujantes) o 1999 (grande, estanterías con
// cajas). o.encuadre:
//   'pueblo': la carretera entre pinos que llega al pueblo: tiendas de madera, una gasolinera, las cumbres nevadas;
//     o.camioneta (0–1): una camioneta cargada que sube por la carretera; o.camara 'general' o 'tienda' (la tienda con la
//     oficina en el piso de arriba, de cerca, con la ventana encendida).
//   'oficina': la oficina por dentro: mesas con ordenadores, flexos, tableros de dibujo, pósteres sin letras, café, un
//     corcho con bocetos, la ventana con pinos y nieve; o.celebra (0–1): globos y cajas con corona; o.camara 'general' o
//     'mesa' (una mesa de cerca con su ordenador y sitio para dos personas).
export function oficina(R, t, o = {}) {
  provisional(R, t, C.pinoV, C.nieveS);
  return { suelo: 160 };
}

// ── D · La pantalla de la muerte ──────────────────────────────────────────────────────────────────────────────────────
// Tres encuadres con dos cámaras cada uno. o.encuadre:
//   'pantalla': el escritorio de 1985 de noche: pared empapelada con la luz cálida del flexo, ventana con cortinas de
//     los ochenta (cielo de noche con luna, estrellas que titilan, nubes y pinos lejanos), reloj de pared, estante con
//     cajas de juegos sin letras, un cuadro con un cohete, la disquetera con su luz, el altavoz, el teclado, el joystick,
//     la taza humeante, el mapa a lápiz; el monitor beis grande en el centro con la imagen del juego (el castillo y el
//     foso con la salpicadura) que se congela y se apaga a gris (o.congela 0–1; por omisión 1) y, encima, el cuadro de
//     la muerte (pieza cuadroMuerte; o.cuadro false para que lo pinte la escena; o.abre, o.guino, o.gafas, o.rie,
//     o.cursor pasan al cuadro). o.reloj: [h, m] de la hora (por omisión 23:40, el segundero corre); o.atras (0–1): las
//     agujas giran media hora hacia atrás con estela. o.risa (0–1): el altavoz bota y echa ondas. o.lee (0–1): la luz
//     de la disquetera parpadea (se está guardando). Es un plano de sobremesa: el «suelo» es la franja delantera del
//     escritorio (y 133), para el disquete a o.s 1–2. o.camara 'general' o 'cerca' (el monitor llena el plano y el
//     cuadro es grande, w 170; el canto del escritorio con el teclado abajo).
//   'partidas': la sala de las partidas guardadas: pared de madera con una retícula de 6 × 4 buzones de latón, cada uno
//     con su puertecita de cristal, su disquete dentro y una placa con un dibujo (un puente, una puerta, un monstruo, un
//     árbol, un castillo, una llave…); lámparas colgantes que se mecen, ventana con nubes y palomas, suelo de baldosas
//     con la luz de la ventana, la escalera de biblioteca, un ratoncito que corre por el zócalo. o.pila (0–1): una pila
//     de disquetes que crece en el suelo (a la derecha). o.llenas (0–24, por omisión 24): cuántos buzones tienen
//     disquete; o.luz (índice 0–23): ese buzón se enciende en verde y destella (acaba de guardar). o.camara 'general' o
//     'pila' (de cerca: la pila grande en el centro, buzones grandes detrás, suelo de tarima).
//   'dividido': la pantalla partida por una costura dorada en x 160. A la izquierda, el mundo soleado del «aquí no te
//     mueres»: cielo tramado con nubes de tres tonos, un sol con rayos que giran, colinas, prado con flores al viento,
//     una cerca, mariposas y el cartel con la calavera tachada. A la derecha, el mundo de Sierra al anochecer: estrellas,
//     luna, el castillo con ventanas que se encienden, el foso con su puente, cuervos, el poste con el cuadro de la
//     muerte en pequeño (la calavera guiña) y el pedestal de guardar con la ranura que brilla. o.camara 'general' o
//     'cerca' (el cartel grande a la izquierda; el cuadro de la muerte grande sobre un atril de madera y el pedestal a la
//     derecha). o.brillo (0–1): la ranura del pedestal destella (el disquete guarda).
// Devuelve { suelo, … } con las posiciones de cada encuadre (ver la geometría al final de cada auxiliar).
export function muerte(R, t, o = {}) {
  const enc = o.encuadre ?? 'pantalla', cam = o.camara ?? 'general';
  if (enc === 'partidas') return e_partidas(R, t, o, cam);
  if (enc === 'dividido') return e_dividido(R, t, o, cam);
  return e_pantalla(R, t, o, cam);
}
// ── E · El espacio ───────────────────────────────────────────────────────────────────────────────────────────────────
export function espacio(R, t, o = {}) {
  const enc = o.encuadre ?? 'nave', cam = o.camara ?? 'general';
  let g;
  if (enc === 'nave') g = cam === 'armario' ? f_armario(R, t, o) : f_nave(R, t, o);
  else if (enc === 'puente') g = cam === 'radio' ? f_radio(R, t, o) : f_puente(R, t, o);
  else if (enc === 'desierto') g = f_desierto(R, t, o, cam === 'cerca');
  else if (enc === 'asteroide') g = cam === 'jaula' ? f_jaula(R, t, o) : f_asteroide(R, t, o);
  else g = cam === 'pixeles' ? f_pixeles(R, t, o) : f_portal(R, t, o);
  if (o.alarma > 0 && (enc === 'nave' || enc === 'puente')) f_alarma(R, t, o.alarma);
  return g;
}
// ── F · La ciudad ────────────────────────────────────────────────────────────────────────────────────────────────────
// Una ciudad de 1987–1993 (nada de letras: los rótulos son neones de formas, pictogramas y trazos). o.luz 'noche' (por
// omisión) o 'dia'. o.encuadre:
//   'calle' (o.camara 'general'): de noche, la calle de neón: cielo morado tramado con estrellas, luna y nubes de tres
//     tonos, la ciudad lejana con ventanas y un depósito de agua; de izquierda a derecha, el edificio de ladrillo con su
//     escalera de incendios, la cafetería (taza de neón) y el letrero vertical de estrellas; el bar (copa de cóctel de neón
//     en el tejado, ventanal con clientes en sombra, puerta con toldo); el callejón con un farol, vapor y gente que pasa al
//     fondo; el bloque de pisos con el corazón de neón, ventanas con vecinos y la VENTANA BAJA con macetero (o.ventana
//     0–1: la persiana cae de golpe y la luz se apaga, el gag del ligón), su portal con el número; la tienda de discos con
//     la nota y la flecha de neón. Acera de losas mojadas con boca de riego, papelera, buzones, un farol; asfalto mojado
//     con los reflejos temblorosos de cada neón, una alcantarilla con vapor y el barrido de faros de los coches.
//     De día ('calle' con o.luz 'dia'): la comisaría de ladrillo de dos plantas con cornisa de piedra, ventanas con
//     persianas, reloj sobre la entrada, faroles azules, la escalinata con barandillas, la bandera que ondea, setos; la
//     ciudad lejana, cielo con nubes a tres velocidades, pájaros y sol; a la derecha, el aparcamiento con su valla de
//     malla, las plazas pintadas y el hueco del coche patrulla.
//   'calle' con o.camara 'coche': el aparcamiento de la comisaría de cerca (de día, o de noche con o.luz 'noche' y la
//     farola encendida): el muro lateral de ladrillo grande con el portón metálico del garaje (número 2), la puerta de
//     servicio con su lámpara, ventanas con persianas (alguien pasa detrás), bajante, manguera, cuadro eléctrico; a la
//     derecha la calle de fondo tras la valla (árboles, una casa, coches que pasan); el suelo de asfalto con plazas
//     pintadas, topes, manchas de aceite, un charco que refleja el cielo, un cono, una rejilla y un neumático viejo.
//   'bar' (o.camara 'general'): el bar de noche: papel pintado de damasco, zócalo de madera con paneles, la barra con su
//     baranda de latón, taburetes rojos, el espejo con tres estantes de botellas iluminadas, la caja registradora, el
//     ventanal con la lluvia y la calle (recortada), el ventilador de techo que gira, lámparas colgantes con su cono de
//     luz, el piano de cola negro con la tapa abierta (sus teclas se mueven solas si o.piano, por omisión sí), el
//     escenario con su cortina roja que se mece y el foco, la mesa alta con velas y servilletas (la del humorista), el
//     suelo de tablas con reflejos.
//   'bar' con o.camara 'puerta': la puerta trasera del bar en un callejón de noche: muro de ladrillo con carteles rotos
//     sin letras, la puerta de roble con tachuelas y la MIRILLA (o.mirilla 0–1: se abre la trampilla y asoman dos ojos que
//     parpadean), la lámpara de jaula con polillas, la flecha de neón que apunta a la puerta, el cartel enmarcado con un
//     «?» grande y, si o.icono es 'tocadiscos' | 'coche', el pictograma de la pregunta debajo; bajante que gotea en un
//     charco, cubo de basura con un gato, respiradero con vapor.
//   'orleans' (o.camara 'general'): una calle antigua de Nueva Orleans de noche: casas criollas de estuco de colores con
//     ladrillo asomando, contraventanas verdes, galerías de hierro forjado en dos pisos con helechos colgantes que se
//     mecen, farolas de gas que titilan con polillas, la torre de una iglesia al fondo, luna y nubes; la LIBRERÍA en el
//     centro (escaparate con libros, lámpara, un gato negro en el escaparate que mueve la cola) con su letrero colgante de
//     un libro que se balancea; acera de ladrillo en espiga, bordillo de granito, adoquines mojados y niebla que pasa.
//   'orleans' con o.camara 'libreria': el escaparate de la librería de cerca: dentro (recortado) estanterías llenas, la
//     lámpara verde, el gato negro que levanta la cabeza; pilas de libros y un libro abierto en un atril en el escaparate,
//     la puerta con cristal y la campanilla (o.campana 0–1: suena y se mueve), el farol de gas de pared, el letrero del
//     libro, la galería de hierro de arriba con macetas que gotean, acera de ladrillo y adoquines.
// Devuelve { suelo, … } con la geometría del encuadre (puertas, ventanas, mesas, plazas): ver cada encuadre.
export function ciudad(R, t, o = {}) {
  const enc = o.encuadre ?? 'calle', cam = o.camara ?? 'general', noche = (o.luz ?? 'noche') !== 'dia';
  if (enc === 'bar') return cam === 'puerta' ? g_barPuerta(R, t, o) : g_bar(R, t, o);
  if (enc === 'orleans') return cam === 'libreria' ? g_libreria(R, t, o) : g_orleans(R, t, o);
  if (cam === 'coche') return g_aparcamiento(R, t, o, noche);
  return noche ? g_calleNoche(R, t, o) : g_comisaria(R, t, o);
}
// ── F2 · El pueblo de fantasía ───────────────────────────────────────────────────────────────────────────────────────
// Un pueblo de fantasía de 1989 con su gremio de aventureros: un pueblo de mercado, cálido y colorido (tejas de barro,
// revoque ocre y salmón, entramado de madera, toldos magenta, azafrán y turquesa), distinto del reino de cuento de B.
// Mediodía de verano, sol arriba a la derecha (las sombras caen a la izquierda). Lo fijo de cada encuadre va en un búfer
// (se pinta una vez); encima, cada fotograma, el cielo y la vida. Devuelve { suelo, ... } con la geometría del encuadre.
// o.encuadre:
//   'gremio' (por omisión): la plaza del mercado.
//     o.camara 'general': a la izquierda la casa del gremio (planta baja de sillares con la gran puerta en arco, x 56–84,
//       y 98–140, y su escalón; piso de entramado con tres ventanas con postigos y jardineras; dos estandartes que ondean,
//       con una estrella y una espada; tejado de teja con buhardilla y veleta que gira; el escudo con la espada que se
//       mece colgado de su brazo de hierro; un farol) y delante, a la derecha de la puerta, el tablón de anuncios con sus
//       papelitos (x 94–132, y 108–134, sobre dos postes hasta y 152). Al fondo tres casas de entramado con chimeneas que
//       humean, la taberna con su letrero de la jarra que se mece, una vecina que riega las macetas, un gato en un
//       alféizar y un molino que gira en la colina de viñas; tres puestos con toldos de rayas (fruta, cántaros y telas,
//       melones) con sus tenderos que van y vienen; la fuente de dos tazas (x 214–266) con el agua que cae; paseantes
//       pequeños (uno con una cesta en la cabeza), palomas y gallinas que picotean, toneles, cajas, un saco y un gato que
//       duerme en primer término; el cielo tramado con nubes de tres tonos a tres velocidades y pájaros.
//     o.camara 'tablon': el tablón de cerca contra la pared de entramado del gremio: tejadillo de teja, marco con
//       remaches, fondo de tablas con seis papeles clavados con chinchetas (el monstruo con su recompensa de 50, el mapa
//       con la cruz, la poción, el trasgo buscado con tres estrellas, la espada y el escudo, la llave con un 3) cuyas
//       esquinas tiemblan con el aire, y abajo en el centro el hueco libre para el dibujo nuevo (agujeros viejos y un
//       jirón de papel); encima, el emblema del gremio tallado y dos guirnaldas de banderines que se mecen; la ventana
//       con postigos y jardinera (dentro, una vela que titila y alguien que pasa), el farol, la hiedra, el banco con un
//       tiesto y un saco, la escoba y el cubo, el tonel con el gato que se lava, las cajas, un gorrión que salta por el
//       tejadillo, una mariposa y una paloma. o.clavado (0–1): el dibujo del héroe ya clavado en el hueco (su estrella de
//       nivel brilla y destella más cuanto más alto; 0 o sin dar: el hueco vacío); o.nivel (1): el número de la estrella.
//       El dibujo suelto, para llevarlo en la mano, es h_dibujoHeroe (exportada).
//   'camino': el camino que sale del pueblo.
//     o.camara 'general': un camino de tierra que cruza la pantalla de izquierda a derecha (y 144–164); a la izquierda el
//       mapa verde (el pueblo amurallado con sus banderolas en su colina, campos de labor en mosaico con setos y árboles,
//       viñas, el molino que gira, ovejas que pastan, mariposas, hierba alta al viento) y a la derecha, pasada la costura
//       del mapa en x 192, el mapa siguiente: un desierto con dunas en bandas de luz y sombra, una meseta de estratos, una
//       pirámide lejana, ruinas de columnas medio enterradas, un oasis con palmeras que se mecen, un cactus, matas secas,
//       la calima que tiembla en el horizonte, un halcón que planea en círculos, un rodamatojos que rueda y bota y una
//       lagartija que corre; el poste con dos flechas (x 176: castillo hacia la izquierda, sol hacia la derecha).
//       o.frontera (true por omisión): la costura se marca con una línea de puntos dorados que avanzan hacia abajo y un
//       mojón con una flecha que late; false: solo el fundido tramado del verde a la arena.
//     o.camara 'puerta': la muralla del pueblo de frente: sillares con almenas, dos torres con imposta, saeteras,
//       almenas y banderas al viento, dos estandartes, antorchas que crepitan con su resplandor, el arco de dovelas (hueco
//       x 134–186, de y 70 a 152) con el rastrillo de hierro arriba y la puerta de dos hojas (tablas, tres bandas de
//       hierro con clavos, dos aldabas y una cerradura dorada grande y baja, a mano de un personaje); detrás de la muralla
//       los tejados y el campanario con su campana que se mece; un centinela que pasea por el adarve, dos cuervos en las
//       almenas, hiedra, matas con flores, una carreta de heno; el camino de tierra que llega a la puerta y hierba al
//       viento. o.abierta (0–1): las hojas giran hacia dentro, se estrechan y se oscurecen, y por el arco se ve la calle
//       del pueblo (casas de entramado, un puesto con toldo, el empedrado y dos paseantes, todo recortado al arco);
//       o.tumbada: la puerta caída hacia dentro, plana en el suelo (y 130–151) con sus herrajes y su cerradura, las
//       bisagras rotas en las jambas y la calle detrás.
export function fantasia(R, t, o = {}) {
  const enc = o.encuadre ?? 'gremio', cam = o.camara ?? 'general';
  if (enc === 'camino') return cam === 'puerta' ? h_fPuerta(R, t, o) : h_fCamino(R, t, o);
  return cam === 'tablon' ? h_fTablon(R, t, o) : h_fGremio(R, t, o);
}
// ── G · El estudio de sonido y color, 1990 ───────────────────────────────────────────────────────────────────────────
// El estudio de una compañía de juegos en 1990 (moqueta gris, monitores beis, flexos, cables), en el pueblo de la
// montaña (por las ventanas, pinos y granito). o.encuadre:
//   'estudio' (por omisión): techo de placas con su plafón (parpadea a ratos), pared con el corcho de bocetos
//     (castillo, caballero, mapa, muestras de color; los papeles se mecen con el ventilador), la ventana con la sierra
//     (nubes de tres tonos a tres velocidades, pinos que se mecen, un pájaro, un paseante), el reloj que anda, un cuadro
//     del castillo, el cubículo del fondo (un compañero teclea con la cara azul de su pantalla) y la estantería con cajas
//     de juegos; delante, el archivador con el ventilador que gira, el caballete con el lienzo pintado a mano (el mismo
//     bosque de los monitores, a pinceladas), el bote de pinceles, la mesa del ordenador (monitor beis con el bosque, el
//     caballero que anda hacia el cursor, el ratón que se mueve en su alfombrilla, teclado, flexo, taza que humea) y la
//     mesita del escáner (la barra de luz va y viene). o.camara 'general' o 'monitores': dos monitores grandes lado a
//     lado con el MISMO bosque, a la izquierda en 16 colores (bloques gruesos, la trama de puntos, colores chillones;
//     debajo «16» y la tira de sus 16 colores) y a la derecha en 256 (degradados suaves, sol con halo, brumas; «256» y
//     una tira de arcoíris); delante el teclado, disquetes, la taza; a la derecha el caballete con el lienzo original.
//     o.raton [u, v] (0–1): dónde está el cursor en la pantalla (por omisión da vueltas solo); o.dormido (0–1): el
//     teclado se apaga y le salen una luna y burbujas («se va a dormir»); o.escaner (0–1 o false): la barra del escáner;
//     o.color (0–1, 'monitores'): la pantalla de 256 colores «se enciende» desde la de 16 (un barrido de arriba abajo).
//   'cabina': la cabina de grabación: espuma de cuñas en las paredes, el piloto rojo de grabación que se enciende
//     (o.grabando, por omisión true), el foco que cae sobre el micro (motas de polvo en la luz), el micrófono de estudio
//     con su araña y el filtro antipop, el atril con el guion (renglones de trazos), los cascos colgados, la botella de
//     agua; el cristal doble a la sala de control (la mesa de faders con sus vúmetros, el magnetófono de bobinas que
//     gira, el rack de luces) y la puerta acolchada con su ojo de buey y la estrella dorada (o.estrella 0–1: aparece con
//     un destello; 1 = puesta). o.camara 'general' o 'micro' (el contraplano: desde la sala de control, la consola enorme
//     delante, el magnetófono grande, y tras el cristal la cabina con el micro bajo el foco y la puerta con su estrella).
//   'musica': el departamento de música: paredes de listones con el difusor de madera, un disco de oro enmarcado
//     (sin letras), el rack de sintetizadores con luces y cables de conexión que se mecen, dos teclados en su soporte
//     de tijera, el atril con la partitura (notas que son símbolos), los altavoces que botan (o.bota 0–1, por omisión
//     0,6) y sueltan notas, el ordenador secuenciador con las barras que corren, las cintas en su estante. o.camara
//     'general' o 'teclados' (el teclado grande de cerca, sus teclas que bajan con una melodía, el panel con luces y
//     la pantallita de onda, el secuenciador encima y los dos altavoces que botan).
//   'mesa' (inserto): una mesa de pino con la tarjeta de sonido en el centro (la pinta la escena con tarjetaSonido en
//     .tarjeta), el ordenador abierto con sus ranuras, la caja del juego (un castillo dibujado), un disquete, el altavoz
//     que bota (o.bota), la lámpara que hace un círculo de luz y, en la pared, la ventana de noche con la luna.
// Devuelve { suelo, … } según el encuadre (ver las coordenadas en cada auxiliar).
export function estudio(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'cabina') return cam === 'micro' ? i_control(R, t, o) : i_cabina(R, t, o);
  if (enc === 'musica') return cam === 'teclados' ? i_teclados(R, t, o) : i_musica(R, t, o);
  if (enc === 'mesa') return i_mesaTarjeta(R, t, o);
  return cam === 'monitores' ? i_monitores(R, t, o) : i_estudioGeneral(R, t, o);
}
// ── H · Hoy (y la cueva) ─────────────────────────────────────────────────────────────────────────────────────────────
// Tres encuadres, cada uno con dos cámaras del mismo detalle. Lo que va por delante de los personajes (la mesa del salón,
// el escritorio del cuarto, la roca del mapa, las rocas de primer plano de la cueva) lo pinta j_hoyDelante(R, t, o) con
// las mismas opciones, DESPUÉS de los actores. hoy() devuelve la geometría del encuadre; j_hoyDelante, la de lo que
// cambia en primer plano (el lápiz, la carta, la pantalla).
// o.encuadre:
//   'salon': el salón de hoy de una pareja mayor (California, 2020–2023), de día. o.camara 'general': pared de estuco con
//     la luz del ventanal (x 14–116, y 18–94: el jardín con nubes de tres tonos a tres velocidades, la casa del vecino,
//     un vecino que pasea al perro detrás de la valla, el roble que se mece, el aspersor, el comedero con su pájaro y
//     mariposas; visillos que ondean), arrimadero de cuarterones, la foto antigua de los dos en 1979 (x 132–170,
//     y 22–56; sepia: la cocina con el terminal verde), un dibujo de un castillo de un nieto, el reloj de pared que anda,
//     la lámpara de pie, el aparador (x 124–208) con flores, juegos de mesa y un tocadiscos que gira, la librería
//     (x 226–312, y 52–111) con libros, ocho cajas con corona y un poto, tarima de roble con la luz del ventanal,
//     alfombra, el gato que se lava y motas en el haz; las sillas detrás de cada puesto (o.sillas, [148, 192]); la mesa
//     de nogal con dos portátiles, el puzle a medias, tazas que humean y una planta la pone j_hoyDelante.
//     o.camara 'mesa': la mesa de cerca: el ventanal (x 0–45) con la rama y el comedero, la foto de 1979 grande
//     (x 132–188, y 18–66), un paisaje de la sierra y el castillo del nieto, la librería con las ocho cajas (x 254–319);
//     delante (j_hoyDelante): el puzle a medias con su caja, la tableta en la que Roberta dibuja la cueva (o.dibujo 0–1),
//     las tazas, las galletas, las gafas de leer, el teclado de Ken y su monitor (x 224–274, y 88–124) con código que
//     corre y la cueva en 3D que gira (o.render 0–1: de alambre a sombreada), el móvil que se enciende.
//   'cuarto': el cuarto de un chico de hoy (2026), al anochecer. o.camara 'general': pared azul con la luz del monitor y
//     de la ventana (x 197–261, y 21–79: el atardecer sobre los tejados, nubes, un avión, ventanas que se encienden, la
//     persiana a medias con su cordón), dos baldas con figuras (caballero, dragón, castillo con banderas al viento, mago,
//     gnomo, cofre, cabezón que cabecea) y su tira de luces que cambia de color, el mapa dibujado a mano (x 88–172,
//     y 18–74: salas, pasillos, el lago, calaveras donde se muere, el camino rojo, la X y números) con notas adhesivas
//     (una se levanta), el póster de un caballero bajo la luna, la cama (x 222–319) con la colcha de estrellas y el perro
//     que respira, moqueta con alfombra, zapatillas, balón y mando; la silla gamer detrás del puesto (o.silla, 116); el
//     escritorio blanco con el monitor (x 24–92, y 88–124) en el que corre una aventura antigua (o.juego 0–1: el
//     caballero cruza el camino), la torre con ventiladores de colores, el teclado con su ola de luz, el ratón, el álbum
//     cerrado y el bote de lápices lo pone j_hoyDelante.
//     o.camara 'album': el escritorio de cerca: las figuras grandes en su balda, el mapa (x 100–212), la esquina de la
//     ventana; delante, el álbum de cromos abierto (x 70–250, y 118–166) con once cromos de muertes de broma (la calavera
//     que guiña, el caballero mojado que gotea, el conserje chamuscado que humea, el caballero aplastado con estrellas, el
//     platillo que abduce, la rana con corona; los brillantes con su destello) y un hueco con «?» para el último; o.pega
//     (0–1): el último cromo (la calavera dorada con gafas de broma) va del montón (x 272, y 150) a su hueco; el teclado,
//     el ratón, sobres abiertos, la lupa, una lata y el móvil.
//   'cueva': una cueva de piedra caliza con estalactitas, un río subterráneo, cristales y la lámpara de latón. o.estilo
//     'real' (1970: oscura, iluminada por la lámpara con llama que tiembla y la luz del día que entra por la boca de la
//     derecha, x 250–302, y 56–116; murciélagos, gotas que caen al río y hacen ondas) o '3d' (2023: de polígonos planos y
//     colores limpios, haces de luz con polvo, cristales que laten, luciérnagas, el río turquesa); o.camara 'general' o
//     'mapa' (real: la roca plana con el cuaderno en el que el explorador dibuja el mapa, o.dibujo 0–1, la lámpara de
//     carburo, la brújula y la cuerda; 3d: la vista a través de unas gafas de RV, con las dos lentes, su viñeta, el borde
//     de colores y la espuma del visor). o.cable (0–1, real general): un cable que sale de junto al explorador y corre por
//     el suelo hasta la boca de la cueva, con un pulso de luz. o.linterna [x, y, dir] (real general): el haz de la
//     linterna del casco del explorador.
// Devuelve { suelo, sueloPie?, mesa?: [x0, y, x1], puestos?: [x…], pantalla?: [x0, y0, x1, y1], … } (ver geometría).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon';
  if (enc === 'cuarto') return j_cuarto(R, t, o);
  if (enc === 'cueva') return (o.estilo ?? 'real') === '3d' ? j_cueva3d(R, t, o) : j_cuevaReal(R, t, o);
  return j_salon(R, t, o);
}
// ── Piezas de los gags (se pintan encima del decorado) ───────────────────────────────────────────────────────────────
// El disquete con ojos (nuestro hilo de gags): un disquete de 5¼ pulgadas negro con su etiqueta (franja roja y
// renglones), la muesca de protección, el anillo del centro (donde tiene la boca) y la ventana de lectura; dos ojos
// grandes que parpadean y miran hacia o.dir, bracitos con guantes blancos y patitas con zapatillas rojas. Mide 16 × 16 px
// de cuerpo más 3 de patas a o.s 1 (pie en (x, y)); a o.s 2–4 crece con el mismo trazo fino (no se pixela).
// o.corre (0–1): anda (0,3) o corre (1), se inclina hacia delante, bracea y levanta polvo; o.dir 1 | −1;
// o.expresion 'normal' | 'susto' | 'feliz' | 'triste'; o.guarda (0–1): se ilumina, un destello de rayos y una «✓»
// verde encima; o.gafas (0–1): unas gafas de RV le bajan a los ojos (puestas, el visor brilla); o.saluda: true | 'mano'
// (agita la mano) | 'militar' (la mano a la frente); o.tapa (0–1): se tapa los ojos con las dos manos; o.salto (px);
// o.cara false: sin ojos, boca, brazos ni patas (el disquete gigante «escudo»); o.icono 'reloj': un reloj de arena en
// la etiqueta (desde o.s 2). Devuelve { x, y, cabeza: [x, y], mano: [x, y], ancho, alto }.
export function disquete(R, x, y, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  const s = o.s ?? 1, dir = (o.dir ?? 1) >= 0 ? 1 : -1, corre = o.corre ?? 0, ex = o.expresion ?? 'normal', guarda = o.guarda ?? 0, gafas = o.gafas ?? 0, tapa = o.tapa ?? 0, cara = o.cara !== false;
  const fase = t * (6 + corre * 8) + x * 0.05;
  const bote = cara ? (corre > 0 ? Math.abs(Math.sin(fase)) * (0.6 + corre * 1.6) * s : (Math.sin(t * 2.4 + x) > 0.85 ? 0.5 * s : 0)) : 0;
  const pata = cara ? Math.max(3, Math.round(3 * s)) : 0, L = Math.round(16 * s);
  const yb = Math.round(y - pata - bote - (o.salto ?? 0)), yt = yb - L + 1, x0 = Math.round(x - L / 2), x1 = x0 + L - 1;
  const incl = cara ? corre * 2 * s * dir : 0, off = (yy) => Math.round(incl * (yb - yy) / L);   // se inclina hacia delante al correr
  const X = (px, py) => px + off(py), U = (f) => Math.round(f * s);
  // la sombra en el suelo (más pequeña si salta)
  if (cara) e_sombra(R, x, y, Math.max(3, Math.round(7 * s - bote)), Math.max(1, Math.round(1.2 * s)), 0.3);
  // las patitas: dos rayas con zapatillas, alternas al correr
  if (cara) for (const lado of [-1, 1]) {
    const p = corre > 0 ? Math.sin(fase + (lado > 0 ? Math.PI : 0)) : 0, hx = x + lado * U(3), fx = Math.round(hx + p * 2.5 * s * dir), fy = Math.round(y - Math.max(0, -p) * 2 * s);
    const gr = Math.max(1, U(0.7)); for (let d = 0; d < gr; d++) linea(hx + d, yb + 1, fx + d, fy - 1, C.k);
    const zw = Math.max(3, U(3)), zh = Math.max(2, U(1.6)), za = dir > 0 ? fx - 1 : fx - zw + 2; rect(za - 1, fy - zh, za + zw, fy, C.k); rect(za, fy - zh + 1, za + zw - 1, fy - 1, hex('#e84a3a')); rect(za, fy - 1, za + zw - 1, fy - 1, C.blanco); }
  // el cuerpo, fila a fila (por la inclinación): contorno, funda negra con su brillo, esquinas romas
  const flash = Math.sin(Math.PI * Math.min(1, guarda * 1.4)), CU = flash > 0 ? e_mezcla(C.disco, hex('#6ae8ff'), flash * 0.55) : C.disco, CUL = e_mezcla(CU, C.blanco, 0.22), CUS = e_mezcla(CU, C.k, 0.4);
  for (let yy = yt; yy <= yb; yy++) { const a = X(x0, yy), b = X(x1, yy), esq = yy === yt || yy === yb;
    rect(a + (esq ? 1 : 0), yy, b - (esq ? 1 : 0), yy, C.k); if (esq) continue; rect(a + 1, yy, b - 1, yy, CU); pset(a + 1, yy, CUL); if (s > 1) pset(a + 2, yy, e_mezcla(CU, CUL, 0.5)); pset(b - 1, yy, CUS); }
  rect(X(x0, yt + 1) + 2, yt + 1, X(x1, yt + 1) - 2, yt + 1, CUL);
  for (let i = 0; i < L - 4; i++) { const yy = yb - 1 - Math.floor(i * 0.5); if (yy > yt + U(4.5) && i > L * 0.55) pset(X(x0, yy) + 2 + i, yy, e_mezcla(CU, CUL, 0.6)); }   // el reflejo diagonal de la funda
  // la muesca de protección en el canto derecho
  rect(X(x1, yt + U(3)) - Math.max(1, U(1)), yt + U(3), X(x1, yt + U(3)), yt + U(3) + Math.max(1, U(1.5)), C.k);
  // la etiqueta: franja roja, renglones azules (y el reloj de arena, si hay sitio)
  { const ya = yt + Math.max(1, U(1.2)), yb2 = yt + Math.max(3, U(4)), a = X(x0, ya) + Math.max(2, U(2)), b = X(x1, ya) - Math.max(2, U(2.5));
    rect(a, ya, b, yb2, hex('#f2eee2')); rect(a, ya, b, ya + Math.max(0, U(0.6) - 1), hex('#d84a3a')); if (s >= 2) { for (let r = ya + U(1.6); r < yb2; r += Math.max(2, U(0.9))) rect(a + 1, r, b - 1, r, hex('#9ab0d8')); }
    rect(b, ya, b, yb2, hex('#c8c0b0')); if (o.icono === 'reloj' && s >= 2) e_relojArena(R, Math.round((a + b) / 2), Math.round((ya + yb2) / 2) + 1, Math.max(7, yb2 - ya - 1), t, 4); }
  // la ventana de lectura (el disco marrón asoma) abajo
  { const yy = yb - Math.max(1, U(1.6)), cx = X(x, yy); rect(cx - Math.max(1, U(0.7)), yy - Math.max(0, U(1.2)), cx + Math.max(0, U(0.7)), yy, hex('#6a4a3a')); pset(cx - Math.max(1, U(0.7)), yy - Math.max(0, U(1.2)), hex('#9a7058')); }
  const ojoY = yt + U(7), bocaY = yt + U(11.2), oL = X(x - (s < 2 ? 3 : U(3.5)), ojoY), oR = X(x + (s < 2 ? 3 : U(3.2)), ojoY);
  // el anillo del centro, metálico, y la boca dentro
  if (cara || true) { const cx = X(x, bocaY), rr = Math.max(2, 2.4 * s); for (let j = -Math.ceil(rr); j <= Math.ceil(rr); j++) for (let i = -Math.ceil(rr); i <= Math.ceil(rr); i++) { const d = Math.hypot(i, j); if (d <= rr && d > rr - Math.max(1, 0.7 * s)) pset(cx + i, bocaY + j, i + j < 0 ? C.metalDisco : hex('#7a7e88')); } }
  if (cara) {
    const cx = X(x, bocaY), m = Math.max(1, U(1));
    if (ex === 'feliz' || guarda > 0.3) { rect(cx - m - 1, bocaY - 1, cx + m + 1, bocaY - 1, C.k); rect(cx - m, bocaY, cx + m, bocaY + Math.max(1, U(0.8)), hex('#a82a3a')); pset(cx, bocaY + Math.max(1, U(0.8)), hex('#f08a9a')); }
    else if (ex === 'susto') { disco(cx, bocaY, Math.max(1, U(0.9)), C.k); if (s > 1) pset(cx, bocaY, hex('#a82a3a')); }
    else if (ex === 'triste') { rect(cx - m, bocaY, cx + m, bocaY, C.k); pset(cx - m - 1, bocaY + 1, C.k); pset(cx + m + 1, bocaY + 1, C.k); }
    else { rect(cx - m, bocaY + 1, cx + m, bocaY + 1, C.k); pset(cx - m - 1, bocaY, C.k); pset(cx + m + 1, bocaY, C.k); }
    // los ojos: blancos grandes con pupila que mira hacia dir; parpadean; con susto, pupilas pequeñas; feliz, arcos
    const parpadea = ((t + x * 0.013) % 3.4) < 0.13, rx = 1.6 * s + 0.4, ry = 2.1 * s + 0.4;
    for (const ox of [oL, oR]) {
      if (parpadea || ex === 'feliz') { for (let i = -Math.round(rx); i <= Math.round(rx); i++) pset(ox + i, ojoY + (ex === 'feliz' ? (Math.abs(i) > rx * 0.5 ? 0 : -1) : 0), C.k); continue; }
      if (s < 2) {   // a escala 1, el ojo a mano: 3 × 4 blanco con su contorno y la pupila de 1 × 2
        rect(ox - 2, ojoY - 2, ox + 2, ojoY + 2, C.k); rect(ox - 1, ojoY - 3, ox + 1, ojoY + 3, C.k); rect(ox - 1, ojoY - 2, ox + 1, ojoY + 2, C.blanco);
        const px = ex === 'susto' ? ox : ox + dir, py = ex === 'triste' ? ojoY + 1 : ojoY - (ex === 'susto' ? 0 : 1);
        rect(px, py, px, py + (ex === 'susto' ? 0 : 1), C.k);
        if (ex === 'triste') { pset(ox - 1, ojoY - 2, C.k); pset(ox + 1, ojoY - 2, C.k); }
        continue;
      }
      const big = ex === 'susto' ? 1.2 : 1;
      for (let j = -Math.ceil(ry * big) - 1; j <= Math.ceil(ry * big) + 1; j++) for (let i = -Math.ceil(rx * big) - 1; i <= Math.ceil(rx * big) + 1; i++) { const d = (i / (rx * big)) ** 2 + (j / (ry * big)) ** 2; if (d <= 1) pset(ox + i, ojoY + j, C.blanco); else if (d <= 1.55 && d > 1) pset(ox + i, ojoY + j, C.k); }
      const mira = ex === 'triste' ? [0, Math.round(ry * 0.4)] : [Math.round(dir * rx * 0.35), ex === 'susto' ? 0 : Math.round(ry * 0.15)], pr = ex === 'susto' || s < 2 ? 0 : U(0.6);
      rect(ox + mira[0] - pr, ojoY + mira[1] - pr, ox + mira[0] + pr, ojoY + mira[1] + pr + (ex === 'susto' ? 0 : 1), C.k);
      if (s >= 2) pset(ox + mira[0] - pr, ojoY + mira[1] - pr, C.blanco);
      if (ex === 'triste') linea(ox - Math.round(rx), ojoY - Math.round(ry) - 1 + (ox === oL ? 0 : -1), ox + Math.round(rx), ojoY - Math.round(ry) - 1 + (ox === oL ? -1 : 0), C.k);
    }
    // las gafas de RV: bajan desde arriba hasta los ojos; puestas, el visor brilla en cian y magenta
    if (gafas > 0) { const g = Math.min(1, gafas), gy = Math.round(ojoY - (1 - g) * 14 * s), a = X(x0, gy) - Math.max(1, U(0.6)), b = X(x1, gy) + Math.max(1, U(0.6)), gh = Math.max(4, U(4.6));
      rect(a, gy - (gh >> 1), b, gy + (gh >> 1), C.k); rect(a + 1, gy - (gh >> 1) + 1, b - 1, gy + (gh >> 1) - 1, hex('#f2eee6')); rect(a + 1, gy - (gh >> 1) + 1, b - 1, gy - (gh >> 1) + 1, C.blanco); rect(a + 1, gy + (gh >> 1) - 1, b - 1, gy + (gh >> 1) - 1, hex('#b8b4a8'));
      const vis = g >= 1 ? (Math.sin(t * 3) > 0 ? hex('#5ae8f0') : hex('#c86af0')) : hex('#2a2e3a'); rect(a + 2, gy - Math.max(0, (gh >> 1) - 2), b - 2, gy + Math.max(0, (gh >> 1) - 2), hex('#1a1e2a')); rect(a + 3, gy - Math.max(0, (gh >> 1) - 3), b - 3, gy, vis); pset(a + 3, gy - Math.max(0, (gh >> 1) - 3), C.blanco);
      rect(a - Math.max(1, U(1)), gy - 1, a - 1, gy, hex('#5a5a68')); rect(b + 1, gy - 1, b + Math.max(1, U(1)), gy, hex('#5a5a68')); }
  }
  // los bracitos con guantes blancos
  const guante = (gx, gy) => { const r = Math.max(1, 1.1 * s); disco(Math.round(gx), Math.round(gy), Math.ceil(r) + 1, C.k); disco(Math.round(gx), Math.round(gy), Math.ceil(r), C.blanco); if (s >= 2) pset(Math.round(gx) - 1, Math.round(gy) - 1, hex('#ffffff')); else pset(Math.round(gx), Math.round(gy), C.blanco); };
  let mano = [x1 + U(3), yt + U(9)];
  if (cara) {
    const hY = yt + U(9), iz = [X(x0, hY), hY], de = [X(x1, hY), hY];
    const brazo = (a, b) => { linea(a[0], a[1], b[0], b[1], C.k); if (s >= 2) linea(a[0], a[1] + 1, b[0], b[1] + 1, C.k); guante(b[0], b[1]); };
    const sal = o.saluda === true ? 'mano' : o.saluda;
    const sw = corre > 0 ? Math.sin(fase) * 2.6 * s : Math.sin(t * 2) * 0.6 * s;
    let pi = [iz[0] - U(2.5), hY + U(2.6) + sw], pd = [de[0] + U(2.5), hY + U(2.6) - sw];
    if (tapa > 0) { pi = [lerp(pi[0], oL, tapa), lerp(pi[1], ojoY, tapa)]; pd = [lerp(pd[0], oR, tapa), lerp(pd[1], ojoY, tapa)]; }
    else if (sal === 'mano') { const a = Math.sin(t * 11) * 0.5; pd = [de[0] + U(3.5) + Math.round(Math.sin(a) * 2 * s), yt - U(0.5) + Math.round((1 - Math.cos(a)) * s)]; }
    else if (sal === 'militar') { pd = [oR + U(2.2), ojoY - U(3.2)]; }
    const tapaDelante = tapa > 0.5;
    if (!tapaDelante) { brazo(iz, pi); brazo(de, pd); }
    else { brazo(iz, pi); brazo(de, pd); }
    mano = [Math.round(pd[0]), Math.round(pd[1])];
    // polvo al correr
    if (corre > 0.5) for (let k = 0; k < 3; k++) { const u = ((t * 2.2 + k / 3) % 1), px = Math.round(x - dir * (L * 0.5 + u * 8 * s)), py = Math.round(y - 1 - u * 3 * s); if (u < 0.8) disco(px, py, Math.max(1, Math.round((1 - u) * 1.6 * s)), u < 0.4 ? hex('#d8d0c0') : hex('#b8b0a0')); }
  }
  // al guardar: el destello de rayos alrededor y la «✓» verde que salta encima
  if (guarda > 0 && guarda < 1.0001) {
    const u = guarda, cx = X(x, (yt + yb) >> 1), cy = (yt + yb) >> 1;
    if (u < 0.7) for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4 + 0.39, r0 = L * 0.6 + u * 10 * s, r1 = r0 + 3 * s + (a & 1) * 2 * s; linea(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0, cx + Math.cos(an) * r1, cy + Math.sin(an) * r1, a & 1 ? hex('#fff6b0') : C.blanco); }
    if (u > 0.25) { const v = Math.min(1, (u - 0.25) / 0.25), sc = Math.max(1, Math.round(s * (v < 1 ? 0.6 + v * 0.6 : 1))), bx = X(x, yt) - 2 * sc, by = yt - 5 * sc - Math.round(Math.sin(v * Math.PI) * 2 * s);
      const P = [[0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]];
      for (const [i, j] of P) rect(bx + i * sc - 1, by + j * sc - 1, bx + i * sc + sc, by + j * sc + sc, C.k);
      for (const [i, j] of P) rect(bx + i * sc, by + j * sc, bx + i * sc + sc - 1, by + j * sc + sc - 1, hex('#5ae86a')); }
  }
  return { x, y, cabeza: [X(x, yt), yt - 1], mano, ancho: L, alto: L + pata };
}
// El cuadro de la muerte (sin letras): un cuadro de diálogo con sombra, marco doble rojo sobre papel crema; a la izquierda
// la calavera simpática (e_calavera), que guiña sola cada pocos segundos (o.guino 0–1 la manda la escena); a la derecha
// tres renglones de trazos grises; abajo un reloj de arena cuya arena cae y un botón azul con una flecha de «otra vez».
// o.w ancho (por omisión 120; el alto es 0,55·w); o.abre (0–1): aparece desde el centro con un rebote (fuera de 0–1 no
// pinta nada si es 0); o.gafas (0–1) le bajan a la calavera unas gafas de broma con nariz y bigote; o.rie (0–1) la
// mandíbula bota y el cuadro tiembla un poco; o.cursor: la manita del cursor pulsa el botón, que se hunde.
// (x, y) es su esquina superior izquierda. Devuelve { x, y, w, a, calavera: [x, y, r], boton: [x, y] }.
export function cuadroMuerte(R, x, y, t, o = {}) {
  const { rect, pset, linea } = R;
  const w0 = o.w ?? 120, abre = o.abre ?? 1;
  if (abre <= 0) return null;
  const sc = abre >= 1 ? 1 : abre < 0.6 ? (abre / 0.6) * 1.12 : 1.12 - 0.12 * Math.sin(((abre - 0.6) / 0.4) * Math.PI / 2);
  const tiembla = (o.rie ?? 0) > 0 ? Math.round(Math.sin(t * 30) * (o.rie ?? 0)) : 0;
  const w = Math.max(6, Math.round(w0 * sc)), a = Math.max(4, Math.round(w * 0.55)), cx = x + w0 / 2, cy = y + Math.round(w0 * 0.55) / 2;
  const X0 = Math.round(cx - w / 2) + tiembla, Y0 = Math.round(cy - a / 2), X1 = X0 + w - 1, Y1 = Y0 + a - 1;
  // la sombra del cuadro (tramada sobre lo que haya debajo)
  const so = Math.max(2, Math.round(w / 40)); for (let yy = Y0 + so; yy <= Y1 + so; yy++) for (let xx = X0 + so; xx <= X1 + so; xx++) if (xx > X1 || yy > Y1) pset(xx, yy, e_mezcla(R.pget(xx, yy), C.k, 0.5));
  // el marco doble: contorno, banda roja, filete crema, filete rojo; el papel con su grano
  const ROJ = hex('#b83a3a'), ROJL = hex('#e86a5a'), ROJS = hex('#7a2424'), b = Math.max(2, Math.round(w / 45));
  rect(X0, Y0, X1, Y1, C.k); rect(X0 + 1, Y0 + 1, X1 - 1, Y1 - 1, ROJ); rect(X0 + 1, Y0 + 1, X1 - 1, Y0 + 1, ROJL); rect(X0 + 1, Y1 - 1, X1 - 1, Y1 - 1, ROJS);
  rect(X0 + b + 1, Y0 + b + 1, X1 - b - 1, Y1 - b - 1, C.hueso); rect(X0 + b + 2, Y0 + b + 2, X1 - b - 2, Y1 - b - 2, ROJ);
  const ix0 = X0 + b + 3, iy0 = Y0 + b + 3, ix1 = X1 - b - 3, iy1 = Y1 - b - 3;
  if (ix1 - ix0 < 6 || iy1 - iy0 < 4) return { x: X0, y: Y0, w, a };
  rect(ix0, iy0, ix1, iy1, hex('#f6f0e0'));
  for (let yy = iy0; yy <= iy1; yy++) for (let xx = ix0; xx <= ix1; xx++) { const n = h(xx, yy, 730); if (n < 0.06) pset(xx, yy, hex('#e8e0cc')); else if (yy > iy1 - 2 || xx > ix1 - 1) pset(xx, yy, hex('#e8e0cc')); }
  rect(ix0, iy0, ix1, iy0, C.blanco);
  if (sc < 0.55) return { x: X0, y: Y0, w, a };
  const iw = ix1 - ix0, ia = iy1 - iy0;
  // la calavera a la izquierda; guiña sola cada 3,2 s si la escena no manda
  const r = Math.max(4, Math.round(Math.min(iw * 0.17, ia * 0.36))), kx = ix0 + Math.round(iw * 0.2), ky = iy0 + Math.round(ia * 0.4);
  const auto = ((t % 3.2) > 2.75) ? Math.min(1, ((t % 3.2) - 2.75) / 0.12) : 0;
  e_calavera(R, kx, ky, r, t, { guino: o.guino ?? auto, rie: o.rie, gafas: o.gafas });
  // los renglones de trazos (palabras sin letras)
  const lx0 = ix0 + Math.round(iw * 0.42), lx1 = ix1 - Math.max(2, Math.round(iw * 0.05)), lh = Math.max(1, Math.round(w / 90)), paso = Math.max(4, Math.round(ia * 0.15));
  for (let f = 0; f < 3; f++) { const ly = iy0 + Math.round(ia * 0.12) + f * paso; let xx = lx0; const fin = f === 2 ? lx0 + (lx1 - lx0) * 0.6 : lx1;
    while (xx < fin) { const pw = Math.max(2, Math.round((3 + h(xx, f, 731) * 9) * w / 120)); rect(xx, ly, Math.min(fin, xx + pw), ly + lh - 1, f === 0 ? hex('#5a5068') : hex('#8a8098')); xx += pw + Math.max(2, Math.round(w / 50)); } }
  // el reloj de arena y el botón de «otra vez» (con la flecha en círculo)
  const fy = iy1 - Math.max(3, Math.round(ia * 0.24)), ra = Math.max(6, Math.round(ia * 0.3));
  if (w >= 60) e_relojArena(R, lx0 + Math.round(ra * 0.4), fy, ra, t, 5);
  const bw = Math.max(10, Math.round(iw * 0.3)), bh = Math.max(5, Math.round(ia * 0.24)), bx0 = ix1 - bw - Math.max(2, Math.round(iw * 0.04)), by0 = fy - Math.round(bh / 2);
  const pulsa = o.cursor ? (Math.floor(t * 2) % 2 === 0) : false, hund = pulsa ? 1 : 0;
  rect(bx0, by0 + 1, bx0 + bw, by0 + bh + 1, C.k); rect(bx0, by0 + hund, bx0 + bw, by0 + bh + hund, C.k);
  rect(bx0 + 1, by0 + 1 + hund, bx0 + bw - 1, by0 + bh - 1 + hund, hex('#3a6ac8')); rect(bx0 + 1, by0 + 1 + hund, bx0 + bw - 1, by0 + 1 + hund, hex('#7aa8f0')); rect(bx0 + 1, by0 + bh - 1 + hund, bx0 + bw - 1, by0 + bh - 1 + hund, hex('#2a4a98'));
  { const ccx = bx0 + Math.round(bw / 2), ccy = by0 + Math.round(bh / 2) + hund, rr = Math.max(1.5, bh * 0.28); for (let an = 0.5; an < 5.6; an += 0.25) pset(Math.round(ccx + Math.cos(an) * rr), Math.round(ccy + Math.sin(an) * rr), C.blanco);
    const ax = Math.round(ccx + Math.cos(0.5) * rr), ay = Math.round(ccy + Math.sin(0.5) * rr); pset(ax + 1, ay, C.blanco); pset(ax, ay - 1, C.blanco); pset(ax - 1, ay, C.blanco); }
  // la manita del cursor (blanca con contorno) que pulsa el botón
  if (o.cursor) { const mx = bx0 + Math.round(bw * 0.7), my = by0 + Math.round(bh * 0.6) + (pulsa ? 1 : -2), M = ['.##.....', '.#w#....', '.#w#....', '.#w###..', '##wwww#.', '#wwwwww#', '#wwwww#.', '.#####..'];
    M.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.') pset(mx + i, my + j, f[i] === '#' ? C.k : C.blanco); }); }
  return { x: X0, y: Y0, w, a, calavera: [kx, ky, r], boton: [bx0 + (bw >> 1), by0 + (bh >> 1)] };
}
// Una tarjeta de sonido de 1988 de ~66 × 30 px, de pie sobre su peine de contactos dorados (pie en (x, y), en el centro
// del peine): la placa verde con pistas y puntos de soldadura, el chip grande de la música (con su punto y las patas),
// otros chips, el cristal de cuarzo, condensadores azules, resistencias con rayas, el piloto, y a la derecha la chapa
// metálica con los conectores redondos y la rueda del volumen. o.musicos (0–1): salen de los chips, con un saltito,
// tres músicos diminutos (~10 px: violín con su arco, trompa dorada y timbal con dos mazas) que tocan sobre el canto de
// la placa, con notas de colores que suben; el piloto parpadea. o.dir 1 (chapa a la derecha) o −1. Devuelve { x, y,
// arriba (y del canto donde tocan), musicos: [[x, y], …] (los pies) }.
export function tarjetaSonido(R, x, y, t, o = {}) {
  const { rect, pset, disco, linea } = R, d = o.dir ?? 1, X = (i) => x + d * i, xs = (a, b) => [Math.min(X(a), X(b)), Math.max(X(a), X(b))];
  const top = y - 30, mu = Math.max(0, Math.min(1, o.musicos ?? 0));
  const caja = (a, y0, b, y1, c) => { const [p, q] = xs(a, b); rect(p, y0, q, y1, c); };
  // la sombra sobre la mesa
  i_sombraT(R, x, y + 1, 38, 2);
  // el peine de contactos dorados
  caja(-30, y - 4, 22, y, C.k); for (let i = -29; i <= 21; i += 2) { caja(i, y - 3, i, y, IC.oroT); pset(X(i), y - 3, hex('#f8e080')); }
  caja(-6, y - 4, -5, y, C.k);
  // la placa: el verde, el canto de luz arriba, el borde en sombra, las pistas y los puntos de soldadura
  caja(-33, top, 28, y - 5, C.k); caja(-32, top + 1, 27, y - 5, IC.pcb); caja(-32, top + 1, 27, top + 1, IC.pcbL); caja(-32, y - 6, 27, y - 6, IC.pcbS);
  for (let k = 0; k < 9; k++) { const yy = top + 4 + k * 3; let i = -30 + Math.floor(h(k, 1, 997) * 8); while (i < 24) { const L = 4 + Math.floor(h(i, k, 998) * 10); caja(i, yy, Math.min(25, i + L), yy, IC.pista); if (h(i, k, 999) < 0.5) caja(i + L, yy, i + L, yy + 2, IC.pista); i += L + 3; } }
  for (let k = 0; k < 40; k++) pset(X(-31 + Math.floor(h(k, 2, 997) * 57)), top + 2 + Math.floor(h(k, 3, 997) * 22), h(k, 4, 997) < 0.5 ? hex('#c8d0c0') : IC.pcbL);
  for (const [a, b] of [[-30, top + 3], [25, top + 3]]) { disco(X(a), b, 1, C.k); pset(X(a), b, C.metalL); }
  // el chip grande de la música (cuadrado, con su punto de esquina y patas por los cuatro lados)
  caja(-12, top + 6, 2, top + 19, C.k); caja(-11, top + 7, 1, top + 18, hex('#2a2a32')); caja(-11, top + 7, 1, top + 7, hex('#4a4a56')); pset(X(-9), top + 9, hex('#6a6a76'));
  for (let i = -11; i <= 1; i += 2) { pset(X(i), top + 5, C.metalL); pset(X(i), top + 20, C.metalL); } for (let j = top + 8; j <= top + 17; j += 2) { pset(X(-13), j, C.metalL); pset(X(3), j, C.metalL); }
  caja(-9, top + 11, -1, top + 11, hex('#5a5a66')); caja(-9, top + 14, -4, top + 14, hex('#5a5a66'));
  // dos chips alargados con sus patas, el cristal de cuarzo plateado y el piloto
  for (const [a, b, yy] of [[-29, -16, top + 5], [-29, -18, top + 15], [6, 18, top + 5]]) { caja(a, yy, b, yy + 5, C.k); caja(a + 1, yy + 1, b - 1, yy + 4, hex('#2a2a32')); caja(a + 1, yy + 1, b - 1, yy + 1, hex('#4a4a56')); for (let i = a + 1; i < b; i += 2) { pset(X(i), yy - 1, C.metalL); pset(X(i), yy + 6, C.metalL); } pset(X(a + 2), yy + 2, hex('#6a6a76')); }
  caja(8, top + 14, 15, top + 18, C.k); caja(9, top + 15, 14, top + 17, C.metalL); caja(9, top + 15, 14, top + 15, C.blanco);
  // los condensadores (cilindros azules con tapa plateada) y las resistencias con sus rayas
  for (const [a, yy] of [[18, top + 14], [21, top + 18], [-15, top + 21]]) { caja(a, yy, a + 2, yy + 4, C.k); caja(a, yy + 1, a + 2, yy + 4, hex('#3a6ac8')); caja(a, yy, a + 2, yy, C.metalL); pset(X(a), yy + 2, hex('#6a9ae8')); }
  for (const [a, yy] of [[-28, top + 23], [-22, top + 23], [6, top + 22]]) { caja(a, yy, a + 4, yy + 1, hex('#d8c898')); pset(X(a + 1), yy, C.rojo); pset(X(a + 2), yy, C.k); pset(X(a + 3), yy, hex('#8a5a2a')); caja(a - 1, yy, a - 1, yy, C.metalD); caja(a + 5, yy, a + 5, yy, C.metalD); }
  const on = mu > 0 ? Math.sin(t * 10) > 0 : Math.floor(t * 1.5) % 2 === 0; disco(X(22), top + 4, 1, on ? hex('#ff5a4a') : hex('#6a2a2a')); if (on && mu > 0) pset(X(22), top + 2, hex('#ffb0a0'));
  // la chapa metálica con los conectores redondos (dorados por dentro) y la rueda del volumen
  caja(28, top - 3, 32, y + 3, C.k); caja(29, top - 2, 31, y + 2, C.metalL); caja(31, top - 2, 31, y + 2, C.metalS); caja(27, top - 3, 33, top - 2, C.k); caja(28, top - 2, 32, top - 2, C.metal);
  for (const [yy, c] of [[top + 4, hex('#3ab05a')], [top + 10, hex('#e88ab0')], [top + 16, hex('#5aa0e8')]]) { disco(X(30), yy, 2, C.k); pset(X(30), yy, IC.oroT); pset(X(30) - d, yy - 2, c); }
  { caja(29, top + 21, 31, top + 25, C.k); const k = Math.floor(t * 3) % 3; for (let j = 0; j < 3; j++) pset(X(30), top + 22 + j, j === k && mu > 0 ? C.metalL : C.metalD); }
  // los músicos diminutos que salen de los chips con un saltito y tocan sobre el canto de la placa
  const pies = [];
  if (mu > 0) {
    const M = [[-22, 0, 'violin', hex('#c84a3a')], [-4, 0.18, 'trompa', hex('#3a5ab0')], [16, 0.36, 'timbal', hex('#3a8a4a')]];
    for (const [a, d0, ins, ropa] of M) {
      const u = Math.max(0, Math.min(1, (mu - d0) / 0.3)); if (u <= 0) continue;
      const px = X(a), salto = u < 1 ? Math.sin(u * Math.PI) * 10 : Math.abs(Math.sin(t * 4 + a)) * 1, py = Math.round((u < 1 ? (top + 10) - (top + 10 - top) * u : top) - salto);
      pies.push([px, top]); i_musico(R, px, py, t + a, ins, ropa, u);
      if (u < 1 && u > 0.1) for (let k = 0; k < 4; k++) pset(px + Math.round(Math.cos(k * 1.6 + u * 4) * (3 + u * 5)), top + 6 - Math.round(Math.sin(k * 1.6) * u * 4), C.oroL);
    }
    // las notas de colores que suben y se mecen
    for (let k = 0; k < 5; k++) { const v = ((t * 0.4 + k / 5) % 1); if (v > mu * 1.1) continue; const nx = x + (k - 2) * 12 + Math.sin(t * 2 + k) * 4, ny = top - 14 - v * 30;
      i_nota(R, nx, ny, [C.oroL, hex('#f07aa0'), hex('#7ad0f0'), hex('#a0f07a'), C.blanco][k], k % 2 === 1); }
  }
  return { x, y, arriba: top, musicos: pies };
}
// Unas gafas de realidad virtual blancas, de frente, de 18 × 9 px a o.s 1 (pie en (x, y), el centro de su borde de
// abajo): el visor blanco con su luz y su sombra, el cristal oscuro con su reflejo y las dos cámaras, la correa gris.
// o.s escala entera (1 por omisión; 3–4 para verlas «de cerca» sobre una mesa); o.puestas: la correa ciñe hacia los
// lados y por arriba, como en una cabeza (para el disquete con ojos, centrarlas en su cabeza); sin puestas, la correa
// descansa en un lazo por detrás; o.brillo (0–1): un destello que cruza el cristal de izquierda a derecha; o.encendidas:
// la lucecita de arriba se enciende y el cristal refleja la cueva de colores (morado y turquesa, una estalactita).
// Devuelve { x, y, ancho, alto, cristal: [x0, y0, x1, y1] }.
export function gafasRV(R, x, y, t, o = {}) {
  const s = Math.max(1, Math.round(o.s ?? 1)), x0 = Math.round(x - 9 * s), y0 = Math.round(y - 9 * s + 1), { rect, pset, disco } = R;
  const P = { k: hex('#1c1222'), W: j_C.gafa, w: j_C.gafaS, d: j_C.gafaD, g: j_C.vidrioRV, G: j_C.vidrioRVL, c: hex('#3a3e4e'), s: j_C.correa, S: j_C.correaS };
  // la correa: ceñida (puestas) o en un lazo por detrás
  if (o.puestas) { rect(x0 - 3 * s, y0 + 3 * s, x0, y0 + 5 * s - 1, P.S); rect(x0 - 3 * s, y0 + 3 * s, x0, y0 + 3 * s + s - 1, P.s); rect(x0 + 18 * s, y0 + 3 * s, x0 + 21 * s - 1, y0 + 5 * s - 1, P.S); rect(x0 + 18 * s, y0 + 3 * s, x0 + 21 * s - 1, y0 + 3 * s + s - 1, P.s); rect(x0 + 8 * s, y0 - 3 * s, x0 + 10 * s - 1, y0, P.S); rect(x0 + 8 * s, y0 - 3 * s, x0 + 8 * s + s - 1, y0, P.s); }
  else { const cx = x0 + 9 * s, cy = y0 + 2 * s; for (let a = Math.PI; a <= 2 * Math.PI + 0.01; a += 0.06 / s) { const px = Math.round(cx + Math.cos(a) * 12 * s), py = Math.round(cy + Math.sin(a) * 2.5 * s); rect(px, py, px + s - 1, py + 2 * s - 1, P.S); rect(px, py, px + s - 1, py + s - 1, P.s); } }
  const G = [
    '...kkkkkkkkkkkk...',
    '..kWWWWWWWWWWWWk..',
    '.kWWWWWWWWWWWWWwk.',
    'skWggggggggggggwks',
    'skWgGcgggggggcgwks',
    'skWgGggggggggggwks',
    'skwWWWWWkkWWWWWwks',
    '.kwwwwwk..kwwwwwk.',
    '..kkkkk....kkkkk..',
  ];
  j_spr(R, G, x0, y0, P, s);
  const cr = [x0 + 3 * s, y0 + 3 * s, x0 + 15 * s - 1, y0 + 6 * s - 1];
  // la luz de la cueva reflejada en el cristal
  if (o.encendidas) { for (let yy = cr[1]; yy <= cr[3]; yy++) for (let xx = cr[0]; xx <= cr[2]; xx++) { const u = (xx - cr[0]) / (cr[2] - cr[0]); if (j_u(xx, yy) < 0.45) pset(xx, yy, u < 0.5 ? hex('#4a3592') : hex('#2f7c9c')); } const ex = Math.round(cr[0] + (cr[2] - cr[0]) * 0.6); for (let k = 0; k < 2 * s; k++) rect(ex - Math.max(0, s - 1 - k), cr[1] + k, ex + Math.max(0, s - 1 - k), cr[1] + k, hex('#8a7ae0')); }
  // el destello que cruza el cristal
  if (o.brillo != null && o.brillo > 0 && o.brillo < 1) { const bx = Math.round(cr[0] - 3 * s + o.brillo * (cr[2] - cr[0] + 6 * s)); for (let yy = cr[1]; yy <= cr[3]; yy++) for (let i = 0; i < 2 * s; i++) { const xx = bx + i - (yy - cr[1]); if (xx >= cr[0] && xx <= cr[2]) pset(xx, yy, i < s ? hex('#ffffff') : hex('#c8d8f0')); } }
  // la lucecita de arriba
  const on = o.encendidas ? (Math.sin(t * 4) > -0.3) : Math.floor(t * 0.8) % 3 === 0; rect(x0 + 13 * s, y0 + 2 * s, x0 + 14 * s - 1, y0 + 2 * s + Math.max(0, s - 2), on ? hex('#5ae8f0') : j_C.gafaD);
  if (s >= 3) { rect(x0 + 3 * s, y0 + s, x0 + 9 * s, y0 + s, hex('#ffffff')); pset(x0 + 2 * s, y0 + 2 * s, hex('#ffffff')); }
  return { x, y, ancho: 18 * s, alto: 9 * s, cristal: cr };
}
// El coche patrulla de 1987: una berlina cuadrada blanca y negra (capó, maletero y aletas negros; puertas y techo
// blancos) de 64 × 30 px, con la barra de luces roja y azul, el foco junto al parabrisas, la antena, cromados, faros y
// pilotos, tapacubos con radios y su sombra en el suelo; sin letras ni escudos (en las puertas, una franja). (x, y) es
// el centro del coche a ras de suelo (y = donde apoyan las ruedas). Opciones:
//   o.dir (1 mira a la derecha); o.luces (true: la barra destella roja y azul y tiñe el suelo); o.anda (0–1): rapidez
//     con la que giran las ruedas, el traqueteo de la carrocería y el humo del tubo de escape (la escena mueve x);
//   o.rueda (0–1): el gag del reventón: hasta 0,12 la rueda delantera se hincha y tiembla; a 0,12 revienta con el
//     «¡pum!» (una estrella de estallido con un «!» y trozos de goma que saltan), el coche cae de morro y se queda
//     torcido con la rueda aplastada, sale humo que sube y se deshace, y el tapacubos se escapa rodando y cae plano;
//   o.puerta (0–1): la puerta del conductor se abre (se ve el asiento); o.conductor: un personaje del reparto
//     (ELENCO_CHIBI.x) sentado al volante, recortado a la ventanilla, con o.conductorOpc para sus opciones.
// Devuelve { x, y, rueda: [x, y] (la delantera), trasera: [x, y], puerta: [x, y] (el pie junto a la puerta del
// conductor), techo: y, inclina (px que ha caído el morro) }.
export function cochePatrulla(R, x, y, t, o = {}) {
  const { pset } = R, dir = o.dir ?? 1, P = g_P, u = Math.max(0, Math.min(1, o.rueda ?? 0)), anda = Math.max(0, Math.min(1, o.anda ?? 0));
  x = Math.round(x); y = Math.round(y);
  const revienta = 0.12, inclina = u < revienta ? 0 : Math.min(1, (u - revienta) / 0.06) * (1 + 0.25 * Math.max(0, Math.sin((u - revienta) * 60)) * Math.max(0, 1 - (u - revienta) * 8));
  const tiembla = u > 0.03 && u < revienta ? (Math.floor(t * 30) % 2) : 0, bote = anda > 0 ? Math.round(Math.sin(t * 18) * 0.6 * anda) : 0;
  const X = (i) => x + i * dir, cae = (i) => Math.round(inclina * 4 * Math.max(0, (i + 30) / 62)) + bote + (i > 0 ? tiembla : 0);
  const p = (i, j, c) => pset(X(i), y + j + cae(i), c);
  const r = (i0, j0, i1, j1, c) => { for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) p(i, j, c); };
  const NEG = hex('#22222c'), NEGL = hex('#3a3a4a'), NEGB = hex('#5a5a70'), BLA = hex('#f2f0ea'), BLAS = hex('#c8c8cc'), CRO = hex('#d8dce4'), CROS = hex('#8a8e98');
  // la sombra en el suelo (tramada)
  for (let i = -34; i <= 34; i++) for (let j = -1; j <= 1; j++) if (Math.abs(i) / 34 + Math.abs(j) / 1.6 < 1 && g_b4(X(i), y + j) < 0.6) pset(X(i), y + j, g_mezcla(R.pget(X(i), y + j), 0, 0.45));
  // las luces del techo tiñen el suelo
  if (o.luces) { const f = Math.floor(t * 6) % 2, c = f ? hex('#ff4a4a') : hex('#4a7aff'); for (let i = -40; i <= 40; i++) for (let j = -2; j <= 3; j++) if (g_b4(X(i), y + j + 2) < 0.18 * (1 - Math.abs(i) / 40)) pset(X(i), y + j + 2, c); }
  // la carrocería baja: aletas y puertas, con la línea de luz arriba y la sombra abajo
  r(-31, -15, 31, -6, NEG); r(-30, -16, 30, -16, NEG); r(-31, -15, 31, -15, NEGB); r(-31, -7, 31, -6, hex('#14141c'));
  r(-14, -15, 13, -7, BLA); r(-14, -15, 13, -15, hex('#ffffff')); r(-14, -8, 13, -7, BLAS); for (let i = -14; i <= 13; i++) if ((i & 1) === 0) p(i, -9, BLAS);
  r(-14, -12, 13, -11, hex('#2a4a9a'));   // la franja de las puertas
  r(-1, -15, -1, -7, NEGL); r(-14, -15, -14, -7, NEGL); r(13, -15, 13, -7, NEGL);
  r(9, -13, 11, -13, CROS); r(-5, -13, -3, -13, CROS);   // tiradores
  // capó y maletero con un brillo, parabrisas y luna trasera
  r(14, -17, 30, -16, NEG); r(15, -17, 29, -17, NEGB); r(-30, -17, -15, -16, NEG); r(-29, -17, -16, -17, NEGB);
  // la cabina: pilares, techo blanco y ventanillas
  for (let j = -27; j <= -17; j++) { const a = Math.round(-15 - (j + 17) * 0.3), b = Math.round(13 - (-17 - j) * 0.55); r(a, j, b, j, BLA); }
  r(-12, -28, 8, -28, BLA); r(-12, -28, 8, -28, hex('#ffffff')); r(-12, -27, 8, -27, BLAS);
  const vent = [[-12, -2], [0, 9]];   // ventanilla trasera y delantera (en i)
  for (const [i0, i1] of vent) for (let j = -25; j <= -18; j++) { const b = i1 === 9 ? Math.round(9 - (-18 - j) * 0.5) : i1, a = i0 === -12 ? Math.round(-12 + (-18 - j) * 0.3 * -1) : i0; r(a, j, b, j, hex('#3a4a6a')); }
  // el conductor (recortado a la ventanilla delantera)
  if (o.conductor) { R.recorte([Math.min(X(0), X(8)), y - 26 + cae(4), Math.max(X(0), X(8)), y - 17 + cae(4)]); R.actor(o.conductor, X(2), y - 3 + cae(2), t, { dir, quieto: true, ...(o.conductorOpc || {}) }); R.recorte(null); }
  for (const [i0, i1] of vent) { for (let k = 0; k < 3; k++) p(i0 + 2 + k, -24 + k * 2, hex('#8aa8d0')); for (let k = 0; k < 3; k++) p(i0 + 3 + k, -24 + k * 2, hex('#6a88b0')); }
  r(-1, -26, 0, -17, BLA);   // el pilar del medio
  // la barra de luces, el foco y la antena
  const f = Math.floor(t * 6) % 2, rojo = o.luces && f ? hex('#ff6a5a') : hex('#a82a2a'), azul = o.luces && !f ? hex('#7aa8ff') : hex('#2a4a9a');
  r(-8, -30, 4, -29, NEG); r(-7, -31, -2, -30, rojo); r(-1, -31, 3, -30, azul); p(-6, -31, o.luces && f ? hex('#ffffff') : hex('#e86a5a')); p(0, -31, o.luces && !f ? hex('#ffffff') : hex('#5a7ad8'));
  if (o.luces) { R.halo(X(o.luces && f ? -5 : 1), y - 30 + cae(-2), 8, f ? [hex('#7a2a3a'), hex('#c84a4a')] : [hex('#2a3a7a'), hex('#4a6ad8')], 0.7); r(-7, -31, -2, -30, rojo); r(-1, -31, 3, -30, azul); }
  r(10, -20, 12, -19, CRO); p(12, -21, CROS);
  for (let k = 0; k < 9; k++) p(-26 - Math.round(k * 0.3), -17 - k, CROS);
  // parachoques cromados, faros y pilotos, matrícula sin letras
  r(28, -9, 33, -7, CRO); r(28, -7, 33, -7, CROS); r(-33, -9, -28, -7, CRO); r(-33, -7, -28, -7, CROS);
  r(30, -14, 31, -12, hex('#fff4c0')); p(31, -14, hex('#ffffff')); r(-31, -14, -30, -12, hex('#e83a3a')); r(-31, -11, -30, -11, hex('#f0a040'));
  // los pasos de rueda y las ruedas (la delantera, en i = +20)
  const rueda = (i, del) => { const cx = X(i), cy = y - 5 + cae(i); for (let a = -7; a <= 7; a++) for (let b = -7; b <= 0; b++) if (a * a + b * b <= 49) pset(cx + a, cy + b, hex('#0e0e14'));
    if (del && u >= revienta) {   // aplastada: un óvalo bajo con la goma arrugada
      const cyF = y - 3 + cae(i); for (let a = -8; a <= 8; a++) for (let b = -3; b <= 3; b++) if ((a / 8) ** 2 + (b / 3.2) ** 2 <= 1) pset(cx + a, cyF + b, b < -1 ? hex('#4a4a56') : (a + b * 2 + 40) % 4 === 0 ? hex('#3a3a46') : hex('#22222c'));
      for (const a of [-7, -3, 2, 6]) pset(cx + a, cyF - 2, hex('#6a6a78')); R.disco(cx, cyF - 1, 2.2, CROS); pset(cx - 1, cyF - 2, CRO); return; }
    const rr = del && u > 0.02 ? 5 + (Math.floor(t * 12) % 2) : 5, gi = t * (2 + anda * 22) * dir;
    R.disco(cx, cy, rr, hex('#1a1a22')); R.anillo(cx, cy, rr - 0.5, hex('#3a3a46')); R.disco(cx, cy, 3, CROS); R.disco(cx, cy, 2.4, CRO);
    for (let k = 0; k < 4; k++) { const a = gi + k * Math.PI / 2; pset(Math.round(cx + Math.cos(a) * 2), Math.round(cy + Math.sin(a) * 2), CROS); } pset(cx, cy, NEG); pset(cx - 1, cy - 1, hex('#ffffff')); };
  rueda(-20, false); rueda(20, true);
  // el humo del tubo de escape cuando anda
  if (anda > 0) for (let q = 0; q < 4; q++) { const a = (t * 1.5 + q / 4) % 1, ex = X(-33 - a * 10), ey = y - 6 - a * 6; if (g_b4(Math.round(ex), Math.round(ey)) < 0.6 * (1 - a)) R.disco(ex, ey, 1 + a * 2, hex('#b8b8c0')); }
  // la puerta del conductor abierta: el hueco oscuro con el asiento y la puerta que se abre hacia nosotros
  const pu = Math.max(0, Math.min(1, o.puerta ?? 0));
  if (pu > 0) { r(0, -15, 12, -7, hex('#2a1e24')); r(2, -14, 7, -8, hex('#6a2a2a')); r(2, -14, 7, -14, hex('#8a3a3a')); r(8, -11, 11, -9, NEG);
    const w = Math.round(13 * (1 - pu * 0.6)), sx = 13 + Math.round(pu * 3); for (let i = 0; i <= w; i++) for (let j = -25; j <= -6; j++) { const jj = j + Math.round(i * pu * 0.15); if (j < -16 && i > w - 2) continue; p(sx + i - w + 0, jj + 1, j < -16 ? (i === 0 || j === -25 ? BLA : hex('#3a4a6a')) : i === 0 || i === w ? NEGL : j === -12 || j === -11 ? hex('#2a4a9a') : BLA); } }
  // el reventón: «¡pum!», trozos de goma, humo y el tapacubos que se escapa rodando
  const rx = X(20), ry = y - 3 + cae(20);
  if (u >= revienta && u < revienta + 0.12) { const k = (u - revienta) / 0.12, s = 6 + k * 10, pts = [];
    for (let q = 0; q < 16; q++) { const a = q / 16 * Math.PI * 2 + 0.2, rr = (q % 2 ? 0.45 : 1) * s; pts.push([rx + dir * 4 + Math.cos(a) * rr, ry - 8 + Math.sin(a) * rr * 0.8]); }
    R.poligono(pts, hex('#e85a2a')); R.poligono(pts.map(([a, b]) => [rx + dir * 4 + (a - rx - dir * 4) * 0.75, ry - 8 + (b - ry + 8) * 0.75]), hex('#ffd84a')); R.poligono(pts.map(([a, b]) => [rx + dir * 4 + (a - rx - dir * 4) * 0.4, ry - 8 + (b - ry + 8) * 0.4]), hex('#fff8d8'));
    if (s > 9) R.icono('!', rx + dir * 4 - 2, ry - 13, hex('#c83a2a'), hex('#5a1a1a'), 1);
    for (let q = 0; q < 6; q++) { const a = -0.3 - q * 0.5, d = 4 + k * 22; R.rect(Math.round(rx + Math.cos(a) * d * dir), Math.round(ry - 2 - Math.sin(-a) * d * 0.7 + k * k * 10), Math.round(rx + Math.cos(a) * d * dir) + 1, Math.round(ry - 2 - Math.sin(-a) * d * 0.7 + k * k * 10), hex('#1a1a22')); } }
  // el humo: bollos grises de dos tonos que suben, crecen y luego se encogen hasta deshacerse
  if (u >= revienta) for (let q = 0; q < 7; q++) { const a = ((u - revienta) * 2.2 + q / 7) % 1, edad = u - revienta - q * 0.025; if (edad < 0) continue;
    const sx = rx + Math.sin(a * 5 + q) * 3 + (4 + a * 10) * dir, sy = ry - 4 - a * 30, rr = (1.5 + a * 6) * Math.min(1, (1 - a) * 2.2);
    if (rr < 0.8) continue; R.disco(sx, sy, rr, a < 0.5 ? hex('#b8b8c4') : hex('#9a9aa8')); R.disco(sx - rr * 0.3, sy - rr * 0.3, rr * 0.6, a < 0.5 ? hex('#e4e4ea') : hex('#c0c0cc')); }
  if (u >= revienta + 0.04) { const k = Math.min(1, (u - revienta - 0.04) / 0.6), hx = rx + dir * Math.round(k * 46), hy = y - 3 - Math.round(Math.abs(Math.sin(k * 9)) * (1 - k) * 6);
    if (k < 1) { const ancho = Math.max(1, 3 * Math.abs(Math.cos(t * 9))); for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { const d = (i / (ancho + 0.4)) ** 2 + (j / 3.4) ** 2; if (d <= 1) pset(hx + i, hy + j, d > 0.6 ? CROS : i < 0 && j < 0 ? hex('#ffffff') : CRO); } }
    else { R.rect(hx - 4, y - 1, hx + 4, y - 1, CRO); R.rect(hx - 3, y - 2, hx + 3, y - 2, CROS); pset(hx - 2, y - 2, hex('#ffffff')); } }
  return { x, y, rueda: [rx, y], trasera: [X(-20), y], puerta: [X(6), y], techo: y - 31 + cae(0), inclina: Math.round(inclina * 4) };
}
// la trama ordenada 4 × 4: el umbral (0–1) en (x, y)
const E_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_b4 = (x, y) => (E_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0: a; k = 1: b)
function e_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// un color de la rampa cols en v (0–1), tramado entre los dos tonos vecinos
const e_rampa = (cols, v, x, y) => { const f = Math.max(0, Math.min(cols.length - 1.001, v * (cols.length - 1))), i = Math.floor(f); return f - i > e_b4(x, y) ? cols[i + 1] : cols[i]; };

// un fondo fijo que se pinta una sola vez por lienzo en un búfer y se copia entero en cada fotograma
const e_CACHE = new WeakMap();

function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// oscurece (o aclara, con col) lo ya pintado en una elipse: sombras en el suelo
function e_sombra(R, cx, cy, rx, ry, k = 0.35, col = C.k) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, e_mezcla(c, col, k)); } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) hecha de bolas; respeta R.recorte
function e_nube(R, cx, cy, w, [c1, c2, c3]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), c3);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), c2);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.62), c1);
}

// tablero de madera visto de frente (tablas horizontales de alto «tabla»): juntas, vetas claras y oscuras, nudos
function e_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 610 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 611 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 612 + k) * 34); if (h(x, g, 613 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 614 + k) * 12); } }
    if (h(f, 9, 615 + k) < 0.5 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 616 + k) * Math.max(1, x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; rect(nx - 3, ny, nx + 3, ny, cS); rect(nx - 1, ny - 1, nx + 1, ny + 1, cS); R.pset(nx, ny, cD); }
  }
}

// tablas verticales (un friso o una puerta): juntas, vetas y el canto de luz de cada tabla
function e_friso(R, x0, y0, x1, y1, c, cS, cL, cD, w = 9, k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, c);
  for (let x = x0; x <= x1; x += w) { rect(x, y0, x, y1, cD); rect(x + 1, y0, x + 1, y1, cL);
    for (let g = 0; g < 3; g++) { const gx = x + 2 + Math.round(h(x, g, 620 + k) * (w - 4)); let y = y0 + Math.round(h(x, g, 621 + k) * 10); while (y < y1) { const L = 5 + Math.round(h(gx, y, 622 + k) * 16); for (let yy = y; yy < Math.min(y1, y + L); yy++) if (gx < x1) pset(gx, yy, g ? cS : cL); y += L + 4; } } }
}

// un reloj de arena de alto a (px) con su arena que cae (ciclo de «vuelta» segundos)
function e_relojArena(R, cx, cy, a, t, vuelta = 6) {
  const { rect, pset, linea } = R; cx = Math.round(cx); cy = Math.round(cy);
  const m = Math.max(3, Math.round(a * 0.32)), med = Math.floor(a / 2) - 2, u = (t / vuelta) % 1;
  const MAD = hex('#8a5a2a'), MADL = hex('#c8904a'), CRI = hex('#d8eef8'), ARE = hex('#e8b850'), AREs = hex('#b8862a');
  // el cristal: dos conos unidos por el cuello
  for (let j = -med; j <= med; j++) { const w = Math.max(1, Math.round(m * Math.abs(j) / med)); pset(cx - w - 1, cy + j, C.k); pset(cx + w + 1, cy + j, C.k); for (let i = -w; i <= w; i++) pset(cx + i, cy + j, CRI); }
  // la arena de arriba baja y la de abajo crece
  const arriba = Math.round(med * (1 - u) * 0.85), abajo = Math.round(med * u * 0.85 + 1);
  for (let j = 1; j <= arriba; j++) { const w = Math.max(0, Math.round(m * j / med) - 1); for (let i = -w; i <= w; i++) pset(cx + i, cy - j, i > w - 2 ? AREs : ARE); }
  for (let j = med - abajo + 1; j <= med; j++) { const w = Math.max(0, Math.round(m * j / med) - 1); for (let i = -w; i <= w; i++) pset(cx + i, cy + j, (j - (med - abajo)) < 2 ? ARE : AREs); }
  for (let j = -1; j <= med - abajo; j++) if (((j + Math.floor(t * 12)) & 1) === 0) pset(cx, cy + j, ARE);
  pset(cx - 1, cy - med + 2, C.blanco); pset(cx - 2, cy + med - 3, C.blanco);
  // las tapas de madera y las dos columnas
  for (const yy of [cy - med - 2, cy + med + 1]) { rect(cx - m - 3, yy, cx + m + 3, yy + 1, C.k); rect(cx - m - 2, yy, cx + m + 2, yy, MADL); rect(cx - m - 2, yy + 1, cx + m + 2, yy + 1, MAD); }
  for (const xx of [cx - m - 2, cx + m + 2]) { linea(xx, cy - med, xx, cy + med, MAD); pset(xx, cy - med, MADL); }
}

// la imagen del juego en el monitor: el castillo de cuento, el foso con el puente levadizo y la salpicadura del caballero
// (que sigue en el agua con su pluma); gris (0–1) la apaga a gris azulado con trama, como congelada; con líneas de
// barrido y el reflejo del cristal. (x0, y0, w, a): el hueco del cristal.
function e_juego(R, x0, y0, w, a, t, gris) {
  const { pset, rect, disco, poligono } = R, x1 = x0 + w - 1, y1 = y0 + a - 1, S = w / 100;
  R.recorte([x0, y0, x1, y1]);
  const hor = y0 + Math.round(a * 0.46), agua = y0 + Math.round(a * 0.7);
  for (let y = y0; y < hor; y++) { const c = e_rampa([hex('#3a6ad0'), hex('#5a8ae8'), hex('#8ab8f0')], (y - y0) / (hor - y0), 0, y); for (let x = x0; x <= x1; x++) pset(x, y, (y & 1) && h(x >> 3, y >> 2, 640) < 0.04 ? hex('#a8c8f8') : c); }
  for (const [fx, fy, fw] of [[0.15, 0.12, 0.16], [0.7, 0.08, 0.2]]) { const cx = x0 + fx * w + (t * 0) , cy = y0 + fy * a; R.disco(cx, cy + 1, 3 * S, hex('#c8d8f0')); R.disco(cx - 4 * S, cy + 2, 2.4 * S, hex('#c8d8f0')); R.disco(cx + 4 * S, cy + 2, 2.6 * S, hex('#e8f0f8')); R.disco(cx, cy, 2.6 * S, C.blanco); }
  // colinas, la hierba
  for (let x = x0; x <= x1; x++) { const hh = Math.round((3 + 2 * Math.sin((x - x0) * 0.09 / S) + 1.5 * Math.sin((x - x0) * 0.21 / S)) * S); rect(x, hor - hh, x, hor, hex('#3a8a3a')); }
  rect(x0, hor, x1, agua, hex('#5ab04a')); for (let i = 0; i < w * 0.5; i++) pset(x0 + Math.round(h(i, 1, 641) * w), hor + 1 + Math.round(h(i, 2, 641) * (agua - hor - 2)), i & 1 ? hex('#3a8a3a') : hex('#8ad05a'));
  // el castillo: dos torres con tejado azul, el muro almenado, la puerta y el puente
  const cx = x0 + Math.round(w * 0.62), base = hor + Math.round(3 * S), PIE = hex('#c8c0b0'), PIES = hex('#8a8478'), TEJ = hex('#3a5ab0');
  rect(cx - 20 * S, base - 16 * S, cx + 20 * S, base, PIE); for (let i = -20; i <= 18; i += 4) rect(cx + i * S, base - 18 * S, cx + (i + 2) * S, base - 16 * S, PIE);
  for (let yy = base - 14 * S; yy < base; yy += 3 * S) rect(cx - 20 * S, yy, cx + 20 * S, yy, PIES);
  for (const tx of [-22, 18]) { rect(cx + tx * S, base - 26 * S, cx + (tx + 6) * S, base, PIE); rect(cx + (tx + 5) * S, base - 26 * S, cx + (tx + 6) * S, base, PIES); poligono([[cx + (tx - 1) * S, base - 26 * S], [cx + (tx + 7) * S, base - 26 * S], [cx + (tx + 3) * S, base - 34 * S]], TEJ); rect(cx + (tx + 2) * S, base - 21 * S, cx + (tx + 3) * S, base - 19 * S, hex('#2a2a3a')); }
  rect(cx - 4 * S, base - 10 * S, cx + 4 * S, base, hex('#3a2a20'));
  // el foso y el puente levadizo
  rect(x0, agua, x1, y1, hex('#3a7ab0')); for (let y = agua + 1; y <= y1; y += 2) for (let x = x0 + ((y >> 1) & 3) * 2; x <= x1; x += 9) rect(x, y, x + 3, y, hex('#5a9ad0'));
  rect(cx - 5 * S, agua - 2 * S, cx + 5 * S, agua + 1, hex('#8a5a2a')); for (let i = -5; i <= 5; i += 2) rect(cx + i * S, agua - 2 * S, cx + i * S, agua + 1, hex('#5a3a1a'));
  rect(x0, agua - 1, x1, agua, hex('#2a5a8a'));
  // la salpicadura: el caballero en el agua, con su pluma roja, y las gotas
  const sx = x0 + Math.round(w * 0.36), sy = agua + Math.round(a * 0.12);
  for (let k = 0; k < 7; k++) { const an = -Math.PI * (0.15 + k * 0.7 / 6); disco(sx + Math.cos(an) * 7 * S, sy + Math.sin(an) * 6 * S, Math.max(1, S * 1.1), hex('#d8eef8')); }
  disco(sx, sy, 3 * S, hex('#e8f4fa')); rect(sx - 2 * S, sy - 4 * S, sx + 2 * S, sy - 1, hex('#8a8a9a')); rect(sx - 1, sy - 6 * S, sx + 1, sy - 4 * S, hex('#c83a3a'));
  // apagar a gris (congelada) y las líneas de barrido
  if (gris > 0) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, l = r * 0.3 + g * 0.55 + b * 0.15;
    if (gris > e_b4(x, y) * 0.999) { const v = l * 0.62 + 20; pset(x, y, (0xff000000 | (Math.min(255, v * 1.12) << 16) | (Math.min(255, v * 1.02) << 8) | Math.min(255, v * 0.92)) >>> 0); } }
  const barre = y0 + Math.floor((t * 22) % (a + 20)) - 10;
  for (let y = y0 + 1; y <= y1; y += 2) for (let x = x0; x <= x1; x++) { const c = R.pget(x, y); pset(x, y, e_mezcla(c, C.k, 0.16)); }
  for (let y = Math.max(y0, barre); y < Math.min(y1, barre + 4); y++) for (let x = x0; x <= x1; x++) pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.07));
  // el reflejo del cristal (una diagonal clara) y las esquinas curvas del tubo
  for (let y = y0; y <= y1; y++) { const d = Math.round(x0 + w * 0.62 + (y - y0) * 0.55); for (let x = d; x < d + Math.round(6 * S); x++) if (((x + y) & 1) === 0) pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.22)); }
  R.recorte(null);
  for (const [ex, ey, sx2, sy2] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) for (let j = 0; j < 4; j++) for (let i = 0; i < 4 - j; i++) if (i + j < 3) pset(ex + i * sx2, ey + j * sy2, hex('#14141c'));
}

// el monitor beis de 1985 (caja con relieve, rejilla, botones y luz de encendido); (x0, y0)–(x1, y1) la caja, el cristal
// queda en g = [x, y, w, a]
function e_monitor(R, x0, y0, x1, y1, g) {
  const { rect, pset, linea } = R, BE = hex('#d8d0b8'), BEL = hex('#ece6d2'), BES = hex('#a8a088'), BED = hex('#7a7462');
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BE);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, BEL); rect(x0 + 1, y0 + 1, x0 + 2, y1 - 1, BEL); rect(x1 - 3, y0 + 2, x1 - 1, y1 - 1, BES); rect(x0 + 2, y1 - 2, x1 - 1, y1 - 1, BES);
  for (let i = 0; i < (x1 - x0) * (y1 - y0) / 14; i++) { const x = x0 + 3 + Math.round(h(i, 1, 650) * (x1 - x0 - 6)), y = y0 + 3 + Math.round(h(i, 2, 650) * (y1 - y0 - 6)); pset(x, y, h(i, 3, 650) < 0.5 ? hex('#cec6ae') : hex('#e0d8c2')); }
  const [gx, gy, gw, ga] = g;   // el marco hundido alrededor del cristal
  rect(gx - 5, gy - 5, gx + gw + 4, gy + ga + 4, BES); rect(gx - 5, gy - 5, gx + gw + 4, gy - 5, BED); rect(gx - 5, gy - 5, gx - 5, gy + ga + 4, BED); rect(gx - 4, gy + ga + 4, gx + gw + 4, gy + ga + 4, BEL); rect(gx + gw + 4, gy - 4, gx + gw + 4, gy + ga + 4, BEL);
  rect(gx - 3, gy - 3, gx + gw + 2, gy + ga + 2, hex('#2a2a32')); rect(gx - 2, gy - 2, gx + gw + 1, gy + ga + 1, hex('#14141c'));
  // la franja de abajo: la rejilla del altavoz, las ruedas de brillo y contraste, el botón
  const by = gy + ga + 7;
  if (y1 - by > 6) { for (let x = x0 + 8; x < x0 + 8 + Math.min(40, (x1 - x0) * 0.3); x += 3) rect(x, by + 1, x + 1, by + 3, BED);
    for (const k of [0, 1]) { const kx = x1 - 30 + k * 8; rect(kx, by, kx + 4, by + 4, C.k); rect(kx + 1, by + 1, kx + 3, by + 3, BES); rect(kx + 1, by + 1, kx + 3, by + 1, BEL); }
    rect(x1 - 12, by, x1 - 7, by + 4, C.k); rect(x1 - 11, by + 1, x1 - 8, by + 3, BEL); rect(x1 - 11, by + 3, x1 - 8, by + 3, BES);
    rect(x0 + (x1 - x0) / 2 - 10, by + 1, x0 + (x1 - x0) / 2 + 10, by + 2, BED); rect(x0 + (x1 - x0) / 2 - 10, by + 3, x0 + (x1 - x0) / 2 + 10, by + 3, BEL); }
  linea(x0 + 4, y1, x1 - 4, y1, C.k);
}

function e_pantalla(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R;
  const congela = o.congela ?? 1, risa = o.risa ?? 0, lee = o.lee ?? 0;
  const PAP = [hex('#3a2826'), hex('#5a3e30'), hex('#7a5638'), hex('#9a7044'), hex('#b88c54'), hex('#d0a868'), hex('#e2c080')];
  // la pared empapelada de los ochenta: rayas verticales y un rombo pequeño, con la luz del flexo y el resplandor del monitor
  const pared = (y0, y1, lx, ly, lr, mx, my) => {
    for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
      const dl = Math.max(0, 1 - Math.hypot((x - lx) * 0.8, y - ly) / lr), dm = Math.max(0, 1 - Math.hypot((x - mx) * 0.6, y - my) / 120);
      let v = 0.36 + dl * 0.5 + dm * 0.18 - (y < 20 ? (20 - y) * 0.008 : 0);
      const xm = x % 12; if (xm === 0 || xm === 4) v -= 0.12; else if (xm === 2) v += 0.06;
      const rx = (x + 6) % 12 - 6, ry = (y % 14) - 7; if (Math.abs(rx) + Math.abs(ry) === 2 && xm > 4) v += 0.1;
      pset(x, y, e_rampa(PAP, v, x, y));
    }
  };
  // el escritorio: el tablero visto desde arriba (vetas), el canto y el frente con cajones y el hueco de las piernas
  const MAD = hex('#8a5a32'), MADS = hex('#6a4224'), MADL = hex('#b07a44'), MADD = hex('#3e2614');
  const tablero = (ya, yb, yf) => {
    rect(0, ya, 319, yb, MAD); for (let y = ya + 1; y < yb; y++) { let x = -Math.round(h(y, 1, 660) * 30); while (x < 320) { const L = 10 + Math.round(h(x, y, 661) * 40); if (h(x, y, 662) < 0.55) rect(Math.max(0, x), y, Math.min(319, x + L), y, (y + x) % 3 ? MADS : MADL); x += L + 6 + Math.round(h(y, x, 663) * 20); } }
    rect(0, ya, 319, ya, MADD); rect(0, yb + 1, 319, yb + 1, MADL); rect(0, yb + 2, 319, yb + 3, MADS); rect(0, yb + 4, 319, yb + 4, MADD);
    if (yf > yb + 5) { e_friso(R, 0, yb + 5, 319, yf, MAD, MADS, MADL, MADD, 40, 3); }
  };
  if (cam === 'cerca') {
    e_fijo(R, 'si-pantalla-cerca', () => {
      pared(0, 179, 300, 140, 120, 140, 90);
      // el lado del monitor (la caja se hunde hacia atrás) y su sombra en la pared
      poligono([[268, 20], [290, 34], [290, 150], [268, 164]], hex('#a8a088')); linea(268, 20, 290, 34, C.k); linea(290, 34, 290, 150, C.k); linea(290, 150, 268, 164, C.k);
      for (let y = 36; y < 148; y += 3) linea(273, y, 286, y + 1, hex('#8a8470'));
      for (let y = 40; y < 156; y++) for (let x = 291; x < 300; x++) if (((x + y) & 1) === 0) pset(x, y, PAP[1]);
      // una nota pegada con un dibujo (sin letras) y una planta en la repisa
      rect(296, 70, 314, 86, C.k); rect(297, 71, 313, 85, hex('#f0e070')); rect(297, 71, 313, 72, hex('#f8f0a0')); linea(299, 76, 309, 75, hex('#3a4aa8')); linea(299, 80, 306, 80, hex('#3a4aa8')); R.icono('calavera', 306, 77, hex('#c83a3a'), hex('#f0e070'));
      e_monitor(R, 12, 14, 268, 166, [30, 26, 220, 116]);
      tablero(166, 172, 179);
      // el teclado (el borde de arriba, con la fila de teclas) y un disquete en su funda
      rect(70, 168, 240, 179, C.k); rect(71, 169, 239, 179, hex('#d8d0b8')); rect(71, 169, 239, 169, hex('#ece6d2'));
      for (let x = 74; x < 236; x += 7) { rect(x, 171, x + 5, 176, hex('#a8a088')); rect(x, 171, x + 5, 175, hex('#ece6d2')); rect(x + 1, 172, x + 4, 174, hex('#e0d8c2')); }
      rect(252, 168, 300, 179, C.k); rect(253, 169, 299, 179, hex('#2a2e3a')); rect(258, 169, 294, 173, hex('#e8e4d8')); rect(258, 171, 294, 171, hex('#c83a3a'));
    });
    // la planta (se mueve un poco con el aire del ventilador del monitor)
    for (let k = 0; k < 5; k++) { const a = -1.9 + k * 0.42 + Math.sin(t * 1.3 + k) * 0.06; linea(306, 108, 306 + Math.cos(a) * 12, 108 + Math.sin(a) * 14, k & 1 ? C.hierbaS : C.hierba); disco(306 + Math.cos(a) * 12, 108 + Math.sin(a) * 14, 1, C.hierbaL); }
    rect(299, 106, 313, 118, C.k); rect(300, 107, 312, 117, hex('#c8603a')); rect(300, 107, 312, 108, hex('#e8805a')); rect(310, 109, 312, 117, hex('#9a4a2a'));
    rect(292, 118, 319, 121, C.k); rect(292, 118, 319, 119, MADL);
    e_juego(R, 30, 26, 220, 116, t, congela);
    // la luz de encendido
    const led = Math.sin(t * 1.5) > -0.9; rect(224, 156, 227, 158, led ? hex('#5ae86a') : hex('#2a6a3a')); pset(224, 156, hex('#c8ffc8'));
    if (o.cuadro !== false) cuadroMuerte(R, 55, 36, t, { w: 170, abre: o.abre, guino: o.guino, gafas: o.gafas, rie: o.rie, cursor: o.cursor });
    return { suelo: 179, pantalla: [30, 26, 220, 116], cuadro: [55, 36, 170], teclado: [70, 168, 240] };
  }
  // la cámara general: el escritorio entero
  e_fijo(R, 'si-pantalla-general', () => {
    pared(0, 116, 58, 84, 90, 170, 60);
    // la ventana: marco de madera, alféizar; el cielo de fuera va en cada fotograma
    rect(8, 18, 58, 74, C.k); rect(9, 19, 57, 73, MADL); rect(10, 20, 56, 72, MAD); rect(12, 22, 54, 70, MADD);
    rect(5, 74, 61, 77, C.k); rect(6, 74, 60, 75, MADL); rect(6, 76, 60, 76, MADS);
    // las cortinas naranjas con pliegues y la galería
    for (const [xa, xb] of [[2, 15], [50, 64]]) for (let x = xa; x <= xb; x++) { const p = Math.sin((x - xa) * 1.1), c = p > 0.5 ? hex('#e8904a') : p > -0.3 ? hex('#c8703a') : hex('#8a4a2a'); rect(x, 16, x, 80 + Math.round(Math.sin(x * 0.7) * 1.5), c); if ((x & 1) === 0) for (let y = 20; y < 80; y += 8) pset(x, y + (x % 4), hex('#f0b070')); }
    rect(0, 13, 67, 17, C.k); rect(1, 14, 66, 16, hex('#a85a2a')); rect(1, 14, 66, 14, hex('#e8904a'));
    // el estante con cajas de juegos (sin letras: colores y un dibujo) y un cuadro de un cohete
    rect(244, 70, 316, 72, C.k); rect(244, 70, 316, 70, MADL); rect(245, 71, 315, 71, MAD); for (const sx of [250, 308]) { rect(sx, 72, sx + 2, 76, C.k); }
    const cajas = [[246, 16, hex('#3a5ab0'), 'castillo'], [256, 14, hex('#c83a3a'), 'disquete'], [266, 18, hex('#2a8a5a'), 'castillo'], [276, 13, hex('#e8b830'), 'gafasrv'], [285, 17, hex('#6a3a9a'), 'castillo'], [294, 15, hex('#d8783a'), 'disquete']];
    for (const [x, a, c, ic] of cajas) { rect(x, 70 - a, x + 8, 69, C.k); rect(x + 1, 71 - a, x + 7, 69, c); rect(x + 1, 71 - a, x + 1, 69, e_mezcla(c, C.blanco, 0.35)); rect(x + 7, 71 - a, x + 7, 69, e_mezcla(c, C.k, 0.35)); rect(x + 2, 72 - a, x + 6, 73 - a, C.blanco); rect(x + 2, 69 - 4, x + 6, 69 - 3, e_mezcla(c, C.k, 0.3)); }
    rect(303, 58, 314, 69, C.k); rect(304, 59, 313, 69, hex('#c8a040')); rect(305, 60, 312, 68, hex('#2a2440')); pset(308, 61, C.blanco); rect(307, 63, 309, 66, hex('#d8d8e0')); pset(306, 66, hex('#e8803a')); pset(310, 66, hex('#e8803a')); pset(308, 67, hex('#ffd060'));
    rect(250, 80, 296, 100, C.k); rect(251, 81, 295, 99, hex('#c8a040')); rect(253, 83, 293, 97, hex('#1a1a3a'));
    for (let i = 0; i < 18; i++) pset(254 + Math.round(h(i, 1, 670) * 38), 84 + Math.round(h(i, 2, 670) * 12), h(i, 3, 670) < 0.5 ? C.blanco : hex('#8a8ac8'));
    disco(284, 92, 5, hex('#d8a060')); disco(283, 91, 4, hex('#e8b878')); rect(264, 86, 268, 94, hex('#d8d8e0')); poligono([[264, 86], [268, 86], [266, 82]], C.rojo); rect(263, 93, 264, 95, C.rojo); rect(268, 93, 269, 95, C.rojo); pset(266, 96, hex('#ffd060')); pset(266, 97, hex('#e8803a'));
    // la sombra del monitor en la pared
    for (let y = 26; y < 116; y++) for (let x = 233; x < 244; x++) if (((x + y) & 1) === 0 && x - 233 < (y - 26) * 0.4 + 6) pset(x, y, e_mezcla(R.pget(x, y), C.k, 0.3));
    // el escritorio
    tablero(116, 134, 179);
    // el hueco de las piernas (oscuro), los cajones de los lados con tiradores de latón, una papelera con bolas de papel
    rect(104, 139, 220, 179, hex('#1e140e')); for (let y = 140; y < 180; y++) for (let x = 105; x < 220; x++) if (((x + y) & 3) === 0 && y > 160) pset(x, y, hex('#2a1c12'));
    rect(104, 139, 104, 179, MADD); rect(220, 139, 220, 179, MADD);
    rect(150, 150, 176, 179, C.k); rect(151, 151, 175, 179, hex('#5a5a68')); for (let x = 153; x < 175; x += 4) rect(x, 152, x, 179, hex('#3e3e4a')); rect(151, 151, 175, 152, hex('#8a8a9a'));
    for (const [bx, by] of [[156, 148], [164, 147], [170, 149]]) { disco(bx, by, 3, C.k); disco(bx, by, 2, hex('#f2eee2')); pset(bx - 1, by - 1, C.blanco); pset(bx + 1, by, hex('#c8c4b8')); }
    for (const [xa, xb] of [[6, 98], [226, 314]]) for (const [ya, yb] of [[140, 156], [160, 178]]) { rect(xa, ya, xb, yb, MADD); rect(xa + 1, ya + 1, xb - 1, yb - 1, MAD); rect(xa + 1, ya + 1, xb - 1, ya + 1, MADL); rect(xa + 1, yb - 1, xb - 1, yb - 1, MADS);
      const cx = (xa + xb) >> 1, cy = (ya + yb) >> 1; rect(cx - 7, cy - 1, cx + 7, cy + 1, C.k); rect(cx - 6, cy - 1, cx + 6, cy, hex('#e8c860')); rect(cx - 6, cy + 1, cx + 6, cy + 1, hex('#a87a18')); }
    // una pegatina de una estrella en un cajón y el cable que cuelga
    disco(30, 146, 3, hex('#e8b830')); pset(30, 146, hex('#fff0a0'));
    for (let y = 134; y < 179; y++) pset(230 + Math.round(Math.sin(y * 0.2) * 1.5), y, hex('#2a2a2a'));
    // el monitor
    e_monitor(R, 108, 22, 232, 117, [121, 33, 99, 66]);
    poligono([[232, 26], [242, 32], [242, 112], [232, 117]], hex('#a8a088')); linea(232, 26, 242, 32, C.k); linea(242, 32, 242, 112, C.k); linea(242, 112, 232, 117, C.k); for (let y = 36; y < 110; y += 3) linea(234, y, 240, y + 1, hex('#8a8470'));
    // la disquetera con su ranura, la palanca y la luz; encima, disquetes en sus fundas
    rect(246, 101, 300, 118, C.k); rect(247, 102, 299, 117, hex('#d8d0b8')); rect(247, 102, 299, 102, hex('#ece6d2')); rect(297, 103, 299, 117, hex('#a8a088'));
    rect(252, 107, 288, 110, C.k); rect(253, 108, 287, 109, hex('#3a3a42')); rect(266, 106, 274, 112, C.k); rect(267, 107, 273, 111, hex('#8a8470')); rect(267, 107, 273, 107, hex('#c8c0a8'));
    for (let x = 252; x < 294; x += 3) pset(x, 114, hex('#a8a088'));
    for (const [dx, c] of [[0, hex('#2a2e3a')], [3, hex('#3a3040')], [1, hex('#2a2e3a')]]) { const yy = 99 - (dx === 3 ? 2 : dx === 1 ? 4 : 0); rect(250 + dx, yy - 1, 290 + dx, yy, C.k); rect(251 + dx, yy - 1, 289 + dx, yy - 1, c); rect(262 + dx, yy - 1, 276 + dx, yy - 1, hex('#e8e4d8')); }
    // el altavoz (rejilla de tela y el cono que se ve debajo)
    rect(80, 90, 102, 117, C.k); rect(81, 91, 101, 116, hex('#5a4a3a')); rect(81, 91, 101, 91, hex('#8a7058')); for (let y = 93; y < 115; y += 2) for (let x = 82 + (y & 2) / 2; x < 101; x += 2) pset(x, y, hex('#3e3228'));
    // el flexo: la base, los dos brazos con su muelle y la pantalla que alumbra hacia el teclado
    rect(30, 121, 50, 125, C.k); rect(31, 122, 49, 124, hex('#3a6a5a')); rect(31, 122, 49, 122, hex('#6aa08a'));
    linea(40, 121, 34, 96, C.k); linea(41, 121, 35, 96, hex('#4a8a72')); linea(34, 96, 56, 78, C.k); linea(35, 97, 57, 79, hex('#4a8a72')); for (let i = 0; i < 6; i++) pset(37 + i * 2, 92 - i * 2, hex('#c8c8d0'));
    disco(34, 96, 2, C.k); pset(34, 96, hex('#c8c8d0'));
    poligono([[52, 74], [64, 78], [66, 90], [52, 86]], C.k); poligono([[53, 75], [63, 79], [64, 88], [53, 85]], hex('#3a6a5a')); linea(53, 75, 63, 79, hex('#6aa08a'));
    linea(54, 86, 65, 90, hex('#fff6c8')); linea(55, 87, 64, 90, hex('#ffe8a0'));
    // la luz del flexo sobre el tablero
    for (let y = 117; y < 134; y++) for (let x = 40; x < 130; x++) { const d = Math.hypot((x - 76) / 46, (y - 126) / 9); if (d < 1 && d < 0.4 + e_b4(x, y) * 0.75) pset(x, y, e_mezcla(R.pget(x, y), hex('#ffe0a0'), 0.28)); }
    // el mapa a lápiz bajo la base del flexo y un lápiz
    poligono([[2, 118], [28, 117], [30, 132], [4, 133]], hex('#e8dcc0')); linea(2, 118, 28, 117, hex('#c8b890')); for (const [a, b, c, d] of [[6, 122, 14, 121], [14, 121, 14, 128], [14, 128, 24, 127], [9, 127, 14, 128]]) linea(a, b, c, d, hex('#5a5a6a')); disco(24, 127, 1, hex('#c83a3a'));
    linea(18, 131, 30, 129, hex('#e8b830')); pset(31, 129, hex('#3a2a20'));
    // el teclado: teclas en cuatro filas
    rect(122, 118, 218, 130, C.k); rect(123, 119, 217, 129, hex('#d8d0b8')); rect(123, 119, 217, 119, hex('#ece6d2')); rect(123, 129, 217, 129, hex('#a8a088'));
    for (let f = 0; f < 4; f++) for (let x = 126 + f * 2; x < 210 - (f === 3 ? 20 : 0); x += 6) { const y = 120 + f * 2; rect(x, y, x + 4, y + 1, f === 3 && x > 150 && x < 186 ? hex('#e0d8c2') : hex('#f0ead8')); pset(x + 4, y + 1, hex('#b8b098')); }
    rect(150, 127, 186, 128, hex('#f0ead8'));
    // el joystick, la taza, una pila de disquetes
    rect(226, 124, 240, 130, C.k); rect(227, 125, 239, 129, hex('#2a2a32')); rect(227, 125, 239, 125, hex('#5a5a68')); rect(236, 126, 238, 127, C.rojo);
    linea(232, 124, 230, 113, C.k); linea(233, 124, 231, 113, hex('#3a3a42')); disco(230, 112, 2, C.k); disco(230, 112, 1, C.rojo); pset(229, 111, hex('#ff8a8a'));
    rect(64, 120, 72, 129, C.k); rect(65, 121, 71, 128, hex('#e8e4d8')); rect(65, 121, 71, 121, C.blanco); rect(70, 122, 71, 128, hex('#c8c4b8')); rect(65, 122, 71, 123, hex('#c83a3a')); rect(72, 122, 74, 126, C.k); pset(73, 123, hex('#e8e4d8')); pset(73, 124, hex('#e8e4d8')); rect(66, 121, 70, 121, hex('#4a2a1a'));
    for (let k = 0; k < 3; k++) { const yy = 128 - k * 2, xx = 264 + k; rect(xx, yy, xx + 22, yy + 1, C.k); rect(xx + 1, yy, xx + 21, yy, k === 1 ? hex('#3a3040') : hex('#2a2e3a')); rect(xx + 7, yy, xx + 14, yy, hex('#e8e4d8')); }
  });
  // por la ventana: la noche de la sierra (estrellas que titilan, la luna, nubes que pasan, los pinos y una luz lejana)
  R.recorte([12, 22, 54, 70]);
  for (let y = 22; y <= 70; y++) { const c = e_rampa([hex('#0e1430'), hex('#1a2250'), hex('#2a3468'), hex('#3e4680')], (y - 22) / 48, 0, y); for (let x = 12; x <= 54; x++) pset(x, y, c); }
  for (let k = 0; k < 16; k++) { const x = 13 + Math.round(h(k, 1, 680) * 40), y = 23 + Math.round(h(k, 2, 680) * 32), b = Math.sin(t * (1.5 + k % 3) + k * 1.7); if (b > -0.3) pset(x, y, b > 0.6 ? C.blanco : hex('#8a90c8')); }
  disco(44, 32, 5, hex('#f4ecc8')); disco(46, 31, 4, hex('#1a2250')); pset(41, 33, hex('#fffbe8'));
  for (const [x0, y, w, v] of [[0, 40, 22, 1.2], [30, 50, 16, 0.7]]) { const cx = 4 + ((x0 + t * v) % 70); e_nube(R, cx, y, w, [hex('#6a70a8'), hex('#4a5088'), hex('#323a6a')]); }
  for (let x = 12; x <= 54; x++) { const hh = Math.round(7 + 3 * Math.sin(x * 0.3) + 2 * Math.sin(x * 0.9)); for (let y = 70 - hh; y <= 70; y++) pset(x, y, y === 70 - hh ? hex('#2a3a4a') : hex('#121a24')); if (x % 6 === 0) poligono([[x - 3, 70 - hh + 1], [x + 3, 70 - hh + 1], [x, 70 - hh - 7]], hex('#121a24')); }
  if (Math.sin(t * 0.9) > -0.7) pset(30, 66, hex('#ffd070'));
  { const u = (t / 14) % 1, ax = Math.round(12 + u * 50), ay = 28 + Math.round(u * 3); pset(ax, ay, hex('#8a8ab0')); if (Math.floor(t * 2) % 2) pset(ax + 1, ay, C.rojo); }
  R.recorte(null);
  rect(32, 22, 33, 70, MAD); pset(32, 22, MADL); rect(12, 45, 54, 46, MAD);   // el parteluz
  // el reloj de pared: corre el segundero; con o.atras las agujas giran media hora hacia atrás, con estela
  { const cx = 88, cy = 36, r = 11, [hh, mm] = o.reloj ?? [23, 40], atras = o.atras ?? 0, min = hh * 60 + mm - 30 * atras + (atras > 0 ? 0 : t / 60);
    disco(cx, cy, r + 2, C.k); disco(cx, cy, r + 1, hex('#8a5a2a')); disco(cx, cy, r, hex('#f2eadc')); disco(cx + 1, cy + 1, r - 1, hex('#e2d8c4')); disco(cx, cy, r - 2, hex('#f6f0e2'));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(cx + Math.round(Math.sin(a) * (r - 1)), cy - Math.round(Math.cos(a) * (r - 1)), k % 3 ? hex('#8a8070') : C.k); }
    const aguja = (a, l, c) => linea(cx, cy, cx + Math.sin(a) * l, cy - Math.cos(a) * l, c);
    if (atras > 0 && atras < 1) for (let k = 1; k <= 4; k++) aguja((min + k * 2.2) / 60 * Math.PI * 2, r - 3, hex('#b8b0a0'));
    aguja((min / 60) * Math.PI * 2, r - 3, C.k); aguja((min / 720) * Math.PI * 2, r - 6, C.k);
    if (atras === 0) aguja(t * Math.PI / 30, r - 2, C.rojo);
    pset(cx, cy, C.rojo); pset(cx - 4, cy - 6, C.blanco); pset(cx - 5, cy - 5, C.blanco);
    linea(cx, cy - r - 3, cx, cy - r - 2, C.k); }
  // el monitor: la imagen del juego (congelada) y, encima, el cuadro de la muerte
  e_juego(R, 121, 33, 99, 66, t, congela);
  { const led = Math.sin(t * 1.5) > -0.9; rect(222, 107, 223, 108, led ? hex('#5ae86a') : hex('#2a6a3a')); }
  if (o.cuadro !== false) cuadroMuerte(R, 130, 44, t, { w: 80, abre: o.abre, guino: o.guino, gafas: o.gafas, rie: o.rie, cursor: o.cursor });
  // la luz de la disquetera: parpadea roja si se está guardando
  { const on = lee > 0 && Math.floor(t * 8) % 2 === 0; rect(292, 112, 294, 113, on ? hex('#ff4a3a') : hex('#6a2a2a')); if (on) { pset(291, 112, hex('#ff9a8a')); pset(295, 113, hex('#ff9a8a')); } }
  // el altavoz que se ríe: el cono bota y salen ondas
  { const b = risa > 0 ? Math.round(Math.abs(Math.sin(t * 14)) * 2 * risa) : 0; disco(91, 103, 5 + b, hex('#3a2e24')); disco(91, 103, 2, hex('#2a201a'));
    if (risa > 0) for (let k = 0; k < 3; k++) { const u = ((t * 1.6 + k / 3) % 1), rr = 8 + u * 18; for (let a = -0.9; a <= 0.9; a += 0.08) { const x = Math.round(91 - Math.cos(a) * rr), y = Math.round(103 + Math.sin(a) * rr); if (u < 0.85 * risa + 0.1) pset(x, y, u < 0.5 ? hex('#fff0a0') : hex('#e8b830')); } } }
  // el vapor de la taza
  for (let k = 0; k < 6; k++) { const u = ((t * 0.5 + k / 6) % 1), x = Math.round(68 + Math.sin(u * 7 + k) * 2 + u * 2), y = Math.round(119 - u * 16); if (u < 0.85 && ((k + Math.floor(t * 4)) % 3)) pset(x, y, u < 0.4 ? hex('#f2eadc') : hex('#c8b8a0')); }
  return { suelo: 133, mesa: [2, 133, 318], pantalla: [121, 33, 99, 66], cuadro: [130, 44, 80], reloj: [88, 36], disquetera: [270, 108], altavoz: [91, 103], teclado: [122, 118, 218, 130], taza: [68, 125], joystick: [230, 112] };
}

// los dibujos de las placas de los buzones (7 × 5): lo que había justo después de cada partida guardada
const E_PICTOS = {
  puente: ['.......', '#######', '.#...#.', '#.....#', '#.....#'],
  puerta: ['..###..', '.#...#.', '.#...#.', '.#..##.', '.#...#.'],
  monstruo: ['.#...#.', '#######', '#.#.#.#', '#######', '.#.#.#.'],
  arbol: ['..###..', '.#####.', '..###..', '...#...', '..###..'],
  castillo: ['#.#.#.#', '#######', '##...##', '##.#.##', '#######'],
  llave: ['.##....', '#..####', '.##.#.#', '.......', '.......'],
  pocion: ['...#...', '...#...', '..###..', '.#####.', '..###..'],
  montana: ['...#...', '..###..', '.##.##.', '#######', '.......'],
  barco: ['...#...', '..##...', '.###...', '#######', '.#####.'],
  calavera: ['.#####.', '#.#.#.#', '#######', '.#.#.#.', '.......'],
  ola: ['.......', '.##..##', '#..##..', '.......', '#######'],
  estrella: ['...#...', '.#####.', '..###..', '.#...#.', '.......'],
};

const E_ORDEN = ['puente', 'puerta', 'monstruo', 'arbol', 'castillo', 'llave', 'pocion', 'montana', 'barco', 'calavera', 'ola', 'estrella'];

function e_picto(R, nombre, x, y, c, s = 1) { const f = E_PICTOS[nombre]; f.forEach((fila, j) => { for (let i = 0; i < fila.length; i++) if (fila[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); }); }

// un disquete pequeño sin cara (de canto o de frente) dentro de un buzón: cuerpo, etiqueta y agujero
function e_disquito(R, x, y, l, col = hex('#2a2e3a')) {
  const { rect, pset } = R; rect(x, y, x + l - 1, y + l - 1, C.k); rect(x + 1, y + 1, x + l - 2, y + l - 2, col); rect(x + 1, y + 1, x + 1, y + l - 2, e_mezcla(col, C.blanco, 0.25));
  rect(x + 2, y + 2, x + l - 3, y + Math.max(3, Math.round(l * 0.28)), hex('#e8e4d8')); pset(x + 2, y + 2, hex('#c83a3a'));
  const c = x + (l >> 1); rect(c - 1, y + Math.round(l * 0.55), c + 1, y + Math.round(l * 0.55) + 1, hex('#c0c4cc')); rect(c, y + l - 4, c, y + l - 2, hex('#6a4a3a'));
}

// un buzón de latón con su puertecita de cristal (abierta o cerrada), el disquete dentro y la placa con su dibujo
function e_buzon(R, x, y, w, a, picto, lleno, abierta, luz, t) {
  const { rect, pset, linea } = R, LAT = hex('#c8963a'), LATL = hex('#f0cc70'), LATS = hex('#8a5e1e'), HUE = hex('#1a120c');
  rect(x, y, x + w, y + a, C.k); rect(x + 1, y + 1, x + w - 1, y + a - 1, LAT); rect(x + 1, y + 1, x + w - 1, y + 1, LATL); rect(x + 1, y + 1, x + 1, y + a - 1, LATL); rect(x + w - 1, y + 2, x + w - 1, y + a - 1, LATS); rect(x + 2, y + a - 1, x + w - 1, y + a - 1, LATS);
  const pa = Math.max(8, Math.round(a * 0.3)), hx0 = x + 3, hy0 = y + 3, hx1 = x + w - 3, hy1 = y + a - pa - 2;
  rect(hx0, hy0, hx1, hy1, HUE); rect(hx0, hy0, hx1, hy0, hex('#0c0806'));
  if (lleno) { const l = Math.min(hx1 - hx0 - 4, hy1 - hy0 - 2); e_disquito(R, hx0 + 3, hy1 - l, l, (picto.length & 1) ? hex('#2a2e3a') : hex('#3a3040')); }
  if (luz > 0) for (let yy = hy0; yy <= hy1; yy++) for (let xx = hx0; xx <= hx1; xx++) if (luz > e_b4(xx, yy)) pset(xx, yy, e_mezcla(R.pget(xx, yy), hex('#7aff8a'), 0.45));
  if (!abierta) {   // el cristal con su reflejo y el pomo
    for (let yy = hy0; yy <= hy1; yy++) for (let xx = hx0; xx <= hx1; xx++) { const d = (xx - hx0) + (yy - hy0) * 0.6; if (((xx + yy) & 1) === 0 && (d % 14 < 2 || d % 14 > 12.5)) pset(xx, yy, hex('#8aa0a8')); }
    rect(hx1 - 1, (hy0 + hy1) >> 1, hx1, ((hy0 + hy1) >> 1) + 1, LATL); pset(hx0, hy0, LATL);
  } else {   // la puerta abierta hacia la izquierda, vista de canto
    for (let yy = hy0 - 1; yy <= hy1 + 1; yy++) { const d = Math.round((yy - hy0) * 0.12); rect(hx0 - 4 - d, yy, hx0 - 1, yy, yy === hy0 - 1 || yy === hy1 + 1 ? C.k : hex('#6a8a98')); pset(hx0 - 4 - d, yy, C.k); }
  }
  const px = x + Math.round(w / 2) - 5, py = y + a - pa;   // la placa
  rect(px - 1, py - 1, px + 10, py + pa - 2, C.k); rect(px, py, px + 9, py + pa - 3, hex('#3a2a1a')); rect(px, py, px + 9, py, LATL); e_picto(R, picto, px + 2, py + 1 + Math.max(0, Math.round((pa - 8) / 2)), hex('#f2e2b0'));
}

function e_partidas(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R;
  const pila = o.pila ?? 0, llenas = o.llenas ?? 24, luz = o.luz ?? -1;
  const NOG = hex('#6a3e22'), NOGS = hex('#4e2c16'), NOGL = hex('#8a5630'), NOGD = hex('#2e1a0c');
  // un disquete visto de canto en la pila (w de ancho, a de grueso), con el canto de luz y una franja de etiqueta
  const canto = (x, y, w, a, k) => { const col = k % 3 === 0 ? hex('#2a2e3a') : k % 3 === 1 ? hex('#3a3040') : hex('#24303a');
    rect(x, y, x + w, y + a - 1, C.k); rect(x + 1, y, x + w - 1, y + a - 2, col); rect(x + 1, y, x + w - 1, y, e_mezcla(col, C.blanco, 0.3));
    if (h(k, 1, 700) < 0.6) rect(x + Math.round(w * 0.3), y + 1, x + Math.round(w * 0.3) + Math.round(w * 0.25), y + Math.max(1, a - 3), h(k, 2, 700) < 0.5 ? hex('#e8e4d8') : hex('#e8c860')); };
  if (cam === 'pila') {
    e_fijo(R, 'si-partidas-pila', () => {
      rect(0, 0, 319, 8, hex('#e8dcc0')); for (let x = 0; x < 320; x += 2) pset(x, 7, hex('#c8b890')); rect(0, 9, 319, 12, NOGD); rect(0, 9, 319, 9, NOGL);
      e_friso(R, 0, 13, 319, 108, NOG, NOGS, NOGL, NOGD, 14, 5);
      // la luz de la ventana (fuera de plano, a la derecha) en la pared: un rectángulo tramado más claro
      for (let y = 14; y < 106; y++) for (let x = 200; x < 320; x++) { const d = x - 200 - (y - 14) * 0.5; if (d > 0 && d < 70 && ((x + y) & 1) === 0) pset(x, y, e_mezcla(R.pget(x, y), hex('#ffe0a8'), 0.22)); }
      rect(0, 104, 319, 112, NOGD); rect(0, 104, 319, 105, NOGL); rect(0, 110, 319, 112, hex('#1e120a'));
      // la tarima en perspectiva hacia un punto de fuga alto
      for (let y = 113; y < 180; y++) { const f = (y - 113) / 67; for (let x = 0; x < 320; x++) { const u = (x - 160) / (0.4 + f * 0.9), tab = Math.floor((u + 1000) / 26), j = (u + 1000) % 26 < 1.2;
        const c = j ? hex('#5a3418') : h(tab, Math.floor((y + tab * 7) / 22), 701) < 0.3 ? hex('#a86a38') : h(tab, 3, 702) < 0.5 ? hex('#b87a44') : hex('#c48a50');
        pset(x, y, ((y + tab * 7) % 22 === 0) ? hex('#6a3e1e') : c); } }
      for (let y = 120; y < 180; y++) for (let x = 210; x < 320; x++) { const d = x - 210 - (180 - y) * 0.9; if (d > 0 && d < 80 && ((x + y) & 1) === 0) pset(x, y, e_mezcla(R.pget(x, y), hex('#fff0c0'), 0.25)); }
      // disquetes sueltos por el suelo y una pelusa
      e_disquito(R, 24, 160, 14); e_disquito(R, 262, 168, 12, hex('#3a3040')); disco(110, 172, 3, hex('#8a7a6a')); disco(112, 171, 2, hex('#a8988a'));
      // un aplique de latón en la pared con su luz
      rect(292, 62, 296, 74, C.k); rect(293, 63, 295, 73, hex('#c8963a')); poligono([[287, 56], [301, 56], [298, 64], [290, 64]], hex('#e8d8a0')); linea(287, 56, 301, 56, C.k);
    });
    // los buzones grandes de detrás (dos filas de cinco), con sus dibujos; uno abre y cierra la puerta de vez en cuando
    for (let f = 0; f < 2; f++) for (let c = 0; c < 5; c++) { const k = f * 5 + c, x = 10 + c * 52, y = 20 + f * 42, pic = E_ORDEN[(k * 5) % 12], abre = k === 7 && (t % 6) < 2.4;
      e_buzon(R, x, y, 46, 36, pic, k < llenas, abre || k === 3, luz === k ? 0.5 + 0.5 * Math.sin(t * 9) : 0, t); }
    rect(0, 99, 319, 101, NOGD); rect(0, 99, 319, 99, NOGL);
    // la luz del aplique parpadea un poco
    if (Math.sin(t * 13) > -0.95) R.halo(294, 58, 8, [hex('#f8e0a0'), hex('#fff4d0')], 1.1);
    // la pila: crece con o.pila; el de arriba se tambalea
    const n = Math.round(3 + pila * 16), base = 166, W = 64;
    e_sombra(R, 160, base + 1, 40, 3, 0.4);
    for (let k = 0; k < n; k++) { const tamb = k === n - 1 ? Math.round(Math.sin(t * 5) * 1.4) : 0, dx = Math.round((h(k, 4, 703) - 0.5) * 8) + tamb; canto(160 - W / 2 + dx, base - (k + 1) * 6, W, 6, k); }
    return { suelo: 170, pila: [160, base, base - n * 6, W], buzones: [[10, 20, 46, 36], [62, 20, 46, 36], [114, 20, 46, 36], [166, 20, 46, 36], [218, 20, 46, 36], [10, 62, 46, 36], [62, 62, 46, 36], [114, 62, 46, 36], [166, 62, 46, 36], [218, 62, 46, 36]] };
  }
  // la cámara general: la pared entera de buzones
  const BX = (c) => 22 + c * 33, BY = (f) => 34 + f * 25;
  e_fijo(R, 'si-partidas-general', () => {
    // el techo de yeso, la moldura con dentículos
    for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, e_rampa([hex('#c8b898'), hex('#dccca8'), hex('#e8dcc0')], y / 14 + 0.1, x, y));
    rect(0, 14, 319, 20, NOGD); rect(0, 15, 319, 16, NOGL); for (let x = 2; x < 320; x += 5) rect(x, 18, x + 2, 20, NOG);
    e_friso(R, 0, 21, 319, 140, NOG, NOGS, NOGL, NOGD, 11, 7);
    // el marco grande de la retícula de buzones
    rect(17, 29, 222, 136, C.k); rect(18, 30, 221, 135, NOGD); rect(18, 30, 221, 30, NOGL); rect(18, 30, 18, 135, NOGL);
    // la ventana de la derecha (marco blanco y alféizar); el cielo va en cada fotograma
    rect(234, 30, 274, 100, C.k); rect(235, 31, 273, 99, hex('#e8e0d0')); rect(238, 34, 270, 96, hex('#3a3a42'));
    rect(231, 100, 277, 104, C.k); rect(232, 100, 276, 101, hex('#f0ead8')); rect(232, 102, 276, 103, hex('#b8b0a0'));
    // el friso de abajo, el zócalo y el suelo de baldosas en perspectiva
    rect(0, 140, 319, 143, NOGD); rect(0, 140, 319, 140, NOGL); e_friso(R, 0, 144, 319, 151, NOGS, NOGD, NOG, NOGD, 22, 8); rect(0, 152, 319, 154, hex('#1e120a'));
    for (let y = 155; y < 180; y++) { const f = (y - 155) / 25, fila = Math.floor(Math.pow(f, 0.7) * 6); for (let x = 0; x < 320; x++) { const u = (x - 160) / (0.5 + f * 0.8), col = Math.floor((u + 1000) / 20), ju = (u + 1000) % 20 < 1.1;
      const lim = [155, 158, 162, 167, 173, 180][fila + 1] ?? 180, jy = y === lim - 1;
      pset(x, y, ju || jy ? hex('#7a6a5a') : ((col + fila) & 1) ? hex('#b84a3a') : hex('#e8dcc4')); } }
    for (let y = 155; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); if (h(x, y, 704) < 0.05) pset(x, y, e_mezcla(c, C.k, 0.12)); }
    // la luz de la ventana en el suelo
    for (let y = 155; y < 180; y++) for (let x = 180; x < 320; x++) { const d = x - 214 + (y - 155) * 1.1; if (d > 0 && d < 52 && ((x + y) & 1) === 0) pset(x, y, e_mezcla(R.pget(x, y), hex('#fff4d0'), 0.3)); }
    // la escalera de biblioteca apoyada en la retícula
    for (const [xa, xb] of [[202, 196], [214, 212]]) { linea(xa, 26, xb, 156, C.k); linea(xa + 1, 26, xb + 1, 156, hex('#a8743c')); linea(xa + 2, 26, xb + 2, 156, hex('#5e3a1e')); }
    for (let y = 36; y < 154; y += 12) { const xa = 202 - Math.round((y - 26) * 6 / 130), xb = 214 - Math.round((y - 26) * 2 / 130); rect(xa + 2, y, xb, y + 1, hex('#8a5a2a')); rect(xa + 2, y, xb, y, hex('#c8904a')); }
    rect(200, 22, 218, 26, C.k); rect(201, 23, 217, 25, hex('#c8963a')); disco(197, 157, 2, C.k); disco(213, 157, 2, C.k);
    // un perchero con un sombrero de aventurero y una bufanda, a la derecha de la ventana (por debajo de Atom)
    rect(290, 60, 293, 150, C.k); rect(291, 61, 292, 150, hex('#8a5a2a')); rect(284, 150, 299, 152, C.k);
    poligono([[282, 58], [302, 58], [298, 52], [286, 52]], hex('#3a6a3a')); rect(281, 58, 303, 59, hex('#2a4a2a')); poligono([[296, 52], [300, 44], [298, 52]], hex('#c83a3a'));
    for (let y = 62; y < 92; y++) { pset(294 + Math.round(Math.sin(y * 0.2)), y, (y >> 2) & 1 ? hex('#c83a3a') : hex('#e8e4d8')); pset(295 + Math.round(Math.sin(y * 0.2)), y, (y >> 2) & 1 ? hex('#8e2424') : hex('#b8b4a8')); }
  });
  // por la ventana: el cielo de día, nubes de tres tonos a dos velocidades, la rama de un árbol y palomas
  R.recorte([238, 34, 270, 96]);
  for (let y = 34; y <= 96; y++) { const c = e_rampa([C.cielo1, C.cielo2, C.cielo3], (y - 34) / 62, 0, y); for (let x = 238; x <= 270; x++) pset(x, y, c); }
  for (const [x0, y, w, v] of [[0, 48, 20, 2.2], [24, 66, 14, 1.1], [12, 84, 24, 0.6]]) e_nube(R, 230 + ((x0 + t * v) % 70), y, w, [C.blanco, hex('#e2ecf6'), hex('#b8cce2')]);
  for (let x = 238; x <= 270; x++) { const hh = Math.round(5 + 2 * Math.sin(x * 0.4)); for (let y = 96 - hh; y <= 96; y++) pset(x, y, y < 96 - hh + 2 ? hex('#5a8a5a') : hex('#3a6a4a')); }
  { const sw = Math.round(Math.sin(t * 1.4) * 2); linea(238, 40, 258, 50 + sw, hex('#5a3a2a')); for (let k = 0; k < 6; k++) { const lx = 241 + k * 3, ly = 41 + Math.round(k * 0.5) + (k > 3 ? sw : 0); disco(lx, ly + (k & 1 ? 2 : -1), 2, k & 1 ? C.hierbaS : C.hierba); pset(lx - 1, ly - 2, C.hierbaL); } }
  { const u = (t / 9) % 1, bx = Math.round(274 - u * 50), by = 60 + Math.round(Math.sin(u * 9) * 3), a = Math.sin(t * 12) > 0; pset(bx, by, hex('#3a3a4a')); pset(bx - 1, by - (a ? 1 : -1), hex('#3a3a4a')); pset(bx + 1, by - (a ? 1 : -1), hex('#3a3a4a')); }
  R.recorte(null);
  rect(253, 34, 254, 96, hex('#e8e0d0')); rect(238, 64, 270, 65, hex('#e8e0d0'));
  // la paloma del alféizar, que picotea
  { const pk = Math.sin(t * 3) > 0.6 ? 1 : 0; rect(258, 95, 264, 99, hex('#8a8a9a')); rect(258, 95, 264, 95, hex('#b8b8c8')); rect(255, 94 + pk, 257, 96 + pk, hex('#8a8a9a')); pset(254, 95 + pk, hex('#e8a040')); pset(256, 94 + pk, C.k); rect(265, 96, 267, 97, hex('#6a6a7a')); pset(259, 100, hex('#e86a5a')); pset(262, 100, hex('#e86a5a')); }
  // la lámpara colgante de banquero que se mece y su luz sobre los buzones
  const sw = Math.sin(t * 0.9) * 2.2, lx = Math.round(120 + sw);
  linea(120, 20, lx, 24, C.k);
  // los 24 buzones
  for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) { const k = f * 6 + c, abre = (k === 9 && (t % 7) < 3) || k === 20, l = luz === k ? Math.max(0, 0.55 + 0.45 * Math.sin(t * 10)) : 0;
    e_buzon(R, BX(c), BY(f), 30, 22, E_ORDEN[k % 12], k < llenas, abre, l, t); }
  if (luz >= 0 && luz < 24) { const bx = BX(luz % 6) + 15, by = BY(Math.floor(luz / 6)) + 9, u = (t * 1.6) % 1; for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4 + 0.2, r0 = 9 + u * 6, r1 = r0 + 4; linea(bx + Math.cos(an) * r0, by + Math.sin(an) * r0 * 0.8, bx + Math.cos(an) * r1, by + Math.sin(an) * r1 * 0.8, u < 0.5 ? hex('#ffffff') : hex('#aaffb0')); } }
  // la pantalla verde de la lámpara (por delante de la retícula) y su cono de luz tramado
  poligono([[lx - 9, 31], [lx + 9, 31], [lx + 5, 24], [lx - 5, 24]], C.k); poligono([[lx - 8, 30], [lx + 8, 30], [lx + 4, 25], [lx - 4, 25]], hex('#2a7a4a')); linea(lx - 4, 25, lx + 4, 25, hex('#6ac08a')); rect(lx - 7, 31, lx + 7, 31, hex('#fff4c0'));
  for (let y = 32; y < 132; y++) { const w = (y - 32) * 0.55 + 7; for (let x = Math.round(lx - w); x <= lx + w; x++) if (x > 18 && x < 222 && e_b4(x, y) < 0.13 - (y - 32) * 0.0008) pset(x, y, e_mezcla(R.pget(x, y), hex('#fff0b0'), 0.22)); }
  // el ratoncito que corre por el zócalo de vez en cuando
  { const u = (t % 11) / 4; if (u < 1) { const mx = Math.round(-10 + u * 340), py = 151, p = Math.floor(t * 12) & 1; rect(mx, py - 3, mx + 5, py - 1, hex('#8a8a96')); rect(mx + 5, py - 3, mx + 6, py - 2, hex('#8a8a96')); pset(mx + 6, py - 4, hex('#e8a0a0')); pset(mx + 6, py - 3, C.k); linea(mx - 4, py - 2 - p, mx - 1, py - 2, hex('#e8a0a0')); pset(mx + 1, py, p ? hex('#5a5a66') : hex('#8a8a96')); pset(mx + 4, py, p ? hex('#8a8a96') : hex('#5a5a66')); } }
  // la pila de disquetes en el suelo: crece con o.pila; el de arriba se tambalea
  const n = Math.round(2 + pila * 30), base = 168, W = 34, px = 268;
  e_sombra(R, px + W / 2, base + 1, 22, 2, 0.4);
  for (let k = 0; k < n; k++) { const tamb = k === n - 1 && n > 4 ? Math.round(Math.sin(t * 5) * 1.2) : 0, dx = Math.round((h(k, 4, 705) - 0.5) * 6) + tamb; canto(px + dx, base - (k + 1) * 3, W, 3, k); }
  const buzones = []; for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) buzones.push([BX(c), BY(f), 30, 22, E_ORDEN[(f * 6 + c) % 12]]);
  return { suelo: 164, buzones, pila: [px + W / 2, base, base - n * 3, W], ventana: [234, 30, 274, 100], escalera: [196, 26, 216, 156] };
}

// el cartel de madera con la calavera tachada (un círculo rojo con la raya), de w × a con el pie del poste en suelo
function e_cartelTachado(R, x0, y0, w, a, suelo, postes, t) {
  const { rect, pset, disco, linea } = R, MAD = hex('#a8743c'), MADS = hex('#7a4e24'), MADL = hex('#d8a060');
  for (const px of postes) { rect(px - 2, y0 + a - 2, px + 2, suelo, C.k); rect(px - 1, y0 + a - 2, px + 1, suelo, MADS); rect(px - 1, y0 + a - 2, px - 1, suelo, MAD); }
  rect(x0, y0, x0 + w, y0 + a, C.k); e_madera(R, x0 + 1, y0 + 1, x0 + w - 1, y0 + a - 1, MAD, MADS, MADL, hex('#5a3418'), 9, Math.max(6, Math.round(a / 3)));
  rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + 1, MADL); for (const [cx, cy] of [[x0 + 3, y0 + 3], [x0 + w - 3, y0 + 3], [x0 + 3, y0 + a - 3], [x0 + w - 3, y0 + a - 3]]) { pset(cx, cy, hex('#c8c8d0')); }
  const cx = x0 + Math.round(w / 2), cy = y0 + Math.round(a / 2), r = Math.round(Math.min(w, a) * 0.38), sk = Math.round(r * 0.55);
  disco(cx, cy, r + 1, C.k); disco(cx, cy, r, hex('#e83a3a')); disco(cx, cy, r - Math.max(2, Math.round(r * 0.2)), hex('#f6f0e2'));
  e_calavera(R, cx, cy - Math.round(sk * 0.1), sk, t, { guino: 0 });
  const g = Math.max(1, Math.round(r * 0.07)); for (let d = -g; d <= g; d++) linea(cx - r * 0.68 + d, cy - r * 0.68 - d, cx + r * 0.68 + d, cy + r * 0.68 - d, hex('#e83a3a'));
  linea(cx - r * 0.68 - g - 1, cy - r * 0.68 + g - 1, cx + r * 0.68 - g - 1, cy + r * 0.68 + g - 1, hex('#a82424'));
}

// el pedestal de piedra donde se guarda la partida: la ranura de arriba brilla (y destella con b)
function e_pedestal(R, cx, suelo, alto, t, b = 0) {
  const { rect, pset } = R, PI = hex('#8a8494'), PIL = hex('#b8b2c0'), PIS = hex('#5e5868');
  rect(cx - 10, suelo - 4, cx + 10, suelo, C.k); rect(cx - 9, suelo - 3, cx + 9, suelo, PIS); rect(cx - 9, suelo - 3, cx + 9, suelo - 3, PIL);
  rect(cx - 7, suelo - alto, cx + 7, suelo - 4, C.k); rect(cx - 6, suelo - alto + 1, cx + 6, suelo - 5, PI); rect(cx - 6, suelo - alto + 1, cx - 5, suelo - 5, PIL); rect(cx + 5, suelo - alto + 1, cx + 6, suelo - 5, PIS);
  for (let y = suelo - alto + 4; y < suelo - 5; y += 5) rect(cx - 6, y, cx + 6, y, PIS);
  for (let i = 0; i < 6; i++) pset(cx - 5 + Math.round(h(i, 1, 710) * 10), suelo - alto + 3 + Math.round(h(i, 2, 710) * (alto - 9)), hex('#5a8a4a'));
  rect(cx - 10, suelo - alto - 3, cx + 10, suelo - alto, C.k); rect(cx - 9, suelo - alto - 2, cx + 9, suelo - alto - 1, PIL);
  const p = 0.5 + 0.5 * Math.sin(t * 3), on = Math.max(p, b);
  rect(cx - 6, suelo - alto - 2, cx + 6, suelo - alto - 2, C.k); rect(cx - 5, suelo - alto - 2, cx + 5, suelo - alto - 2, on > 0.5 ? hex('#aaffb0') : hex('#4ac85a'));
  R.halo(cx, suelo - alto - 3, 7 + on * 4 + b * 6, [hex('#3aa84a'), hex('#7aff8a'), hex('#d8ffe0')], 0.7 + on * 0.5);
  e_relojArena(R, cx, suelo - Math.round(alto / 2) - 2, Math.min(12, alto - 10), t, 5);
}

function e_dividido(R, t, o, cam) {
  const { rect, pset, disco, linea, poligono } = R, cerca = cam === 'cerca', brillo = o.brillo ?? 0;
  const suelo = cerca ? 162 : 158;
  e_fijo(R, cerca ? 'si-dividido-cerca' : 'si-dividido-general', () => {
    // izquierda: el cielo azul tramado, las colinas y el prado
    const horI = cerca ? 118 : 104;
    for (let y = 0; y < horI; y++) for (let x = 0; x < 158; x++) pset(x, y, e_rampa([hex('#3a8ae0'), C.cielo1, C.cielo2, C.cielo3, hex('#d8eef8')], y / horI, x, y));
    for (let x = 0; x < 158; x++) { const h1 = Math.round(16 + 6 * Math.sin(x * 0.03 + 1) + 3 * Math.sin(x * 0.11)), h2 = Math.round(8 + 4 * Math.sin(x * 0.05 + 3));
      for (let y = horI - h1; y < horI; y++) pset(x, y, y === horI - h1 ? hex('#a8d8a0') : e_rampa([hex('#8ac08a'), hex('#6aa86a')], (y - horI + h1) / h1, x, y));
      for (let y = horI - h2; y < horI + 6; y++) pset(x, y, y === horI - h2 ? hex('#a8e070') : e_rampa([hex('#7ac04a'), hex('#5aa83a')], (y - horI + h2) / (h2 + 6), x, y)); }
    for (let y = horI + 6; y < 180; y++) for (let x = 0; x < 158; x++) { const n = h(x >> 1, y, 720); pset(x, y, n < 0.12 ? hex('#3a8a2a') : n > 0.9 ? hex('#8ad05a') : e_rampa([hex('#6ab840'), hex('#5aa83a'), hex('#4a9830')], (y - horI) / (180 - horI), x, y)); }
    // el camino de tierra que sube a las colinas
    for (let y = horI + 6; y < 180; y++) { const f = (y - horI) / (180 - horI), cx = 110 - f * 40, w = 2 + f * 16; for (let x = Math.round(cx - w); x <= cx + w; x++) pset(x, y, h(x, y, 721) < 0.15 ? hex('#b8946a') : x < cx - w + 2 ? hex('#c8a87a') : hex('#dcc092')); }
    // la cerca blanca
    if (!cerca) { for (let x = 4; x < 100; x += 9) { rect(x, 128, x + 2, 140, C.k); rect(x + 1, 129, x + 1, 140, C.blanco); } for (const y of [131, 136]) { rect(2, y, 100, y + 1, C.k); rect(2, y, 100, y, C.blanco); } }
    // derecha: el cielo del anochecer tramado, las colinas oscuras, el castillo, el foso
    const horD = cerca ? 116 : 102;
    for (let y = 0; y < horD; y++) for (let x = 162; x < 320; x++) pset(x, y, e_rampa([hex('#141838'), hex('#1e2450'), hex('#3a2e6a'), hex('#7a3e7a'), hex('#d0607a'), hex('#f0a070')], Math.pow(y / horD, 1.3), x, y));
    for (let x = 162; x < 320; x++) { const h1 = Math.round(12 + 5 * Math.sin(x * 0.04) + 3 * Math.sin(x * 0.13 + 2)); for (let y = horD - h1; y < horD + 2; y++) pset(x, y, y === horD - h1 ? hex('#5a4a7a') : hex('#2e2848')); }
    // el castillo en su colina, a contraluz, con los tejados picudos
    { const cx = cerca ? 186 : 238, b = horD - 4, s = cerca ? 0.7 : 1, CA = hex('#3a3058'), CAL = hex('#5a4a7a');
      rect(cx - 18 * s, b - 16 * s, cx + 18 * s, b, CA); for (let i = -18; i <= 16; i += 4) rect(cx + i * s, b - 18 * s, cx + (i + 2) * s, b - 16 * s, CA);
      for (const tx of [-24, 18]) { rect(cx + tx * s, b - 30 * s, cx + (tx + 6) * s, b, CA); rect(cx + tx * s, b - 30 * s, cx + tx * s, b, CAL); poligono([[cx + (tx - 2) * s, b - 30 * s], [cx + (tx + 8) * s, b - 30 * s], [cx + (tx + 3) * s, b - 42 * s]], hex('#2a2448')); }
      rect(cx - 4 * s, b - 28 * s, cx + 4 * s, b - 16 * s, CA); poligono([[cx - 6 * s, b - 28 * s], [cx + 6 * s, b - 28 * s], [cx, b - 38 * s]], hex('#2a2448'));
      rect(cx - 3 * s, b - 8 * s, cx + 3 * s, b, hex('#1a1430')); }
    // el foso con el puente (solo en la general) y la hierba oscura del anochecer
    const fy = cerca ? horD + 2 : 112;
    for (let y = horD + 2; y < 180; y++) for (let x = 162; x < 320; x++) { const n = h(x >> 1, y, 722); pset(x, y, n < 0.12 ? hex('#1e3a2a') : n > 0.92 ? hex('#4a7a4a') : e_rampa([hex('#2a4a38'), hex('#365a40'), hex('#3e6a46')], (y - horD) / (180 - horD), x, y)); }
    if (!cerca) { rect(162, fy, 319, fy + 10, hex('#1e3a6a')); rect(162, fy, 319, fy, hex('#2a2448')); rect(162, fy + 10, 319, fy + 11, hex('#1e3a2a'));
      rect(228, fy - 1, 248, fy + 11, C.k); rect(229, fy, 247, fy + 10, hex('#7a5030')); for (let x = 231; x < 247; x += 4) rect(x, fy, x, fy + 10, hex('#4e3018')); rect(229, fy, 247, fy, hex('#a8743c'));
      linea(228, fy - 1, 232, 86, C.k); linea(248, fy - 1, 244, 86, C.k); }
    // la costura dorada que parte la pantalla
    rect(158, 0, 161, 179, C.k); rect(159, 0, 160, 179, C.oro); rect(159, 0, 159, 179, C.oroL);
    for (let y = 8; y < 180; y += 22) { rect(157, y - 1, 162, y + 1, C.k); rect(158, y, 161, y, C.oroL); pset(159, y - 1, C.oro); pset(160, y + 1, C.oroS); }
  });
  // izquierda: nubes de tres tonos a tres velocidades, el sol con rayos que giran, pájaros
  R.recorte([0, 0, 157, 179]);
  const [sx, sy, sr] = cerca ? [36, 42, 13] : [118, 36, 9];
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + t * 0.4, r0 = sr + 3, r1 = sr + 7 + (k & 1) * 3 + Math.round(Math.sin(t * 3 + k)); linea(sx + Math.cos(a) * r0, sy + Math.sin(a) * r0, sx + Math.cos(a) * r1, sy + Math.sin(a) * r1, k & 1 ? hex('#ffe28a') : hex('#fff4c8')); }
  disco(sx, sy, sr + 1, hex('#f8c040')); disco(sx, sy, sr, hex('#ffe070')); disco(sx - 1, sy - 1, sr - 2, hex('#fff4b0')); pset(sx - Math.round(sr * 0.4), sy - Math.round(sr * 0.5), C.blanco);
  for (const [x0, y, w, v] of (cerca ? [[0, 78, 26, 3], [60, 26, 20, 1.6], [110, 94, 30, 0.8]] : [[0, 46, 22, 3], [70, 24, 16, 1.6], [30, 72, 28, 0.8]])) e_nube(R, ((x0 + t * v) % 200) - 20, y, w, [C.blanco, hex('#e2ecf6'), hex('#b8cce2')]);
  for (let k = 0; k < 3; k++) { const u = ((t / 10 + k * 0.3) % 1), bx = Math.round(-10 + u * 180), by = (cerca ? 62 : 56) + k * 5 + Math.round(Math.sin(u * 20 + k) * 2), a = Math.sin(t * 9 + k) > 0; pset(bx, by, hex('#3a3a4a')); pset(bx - 1, by - (a ? 1 : -1), hex('#3a3a4a')); pset(bx + 1, by - (a ? 1 : -1), hex('#3a3a4a')); }
  // el cartel con la calavera tachada
  if (cerca) e_cartelTachado(R, 44, 52, 80, 60, suelo, [62, 106], t); else e_cartelTachado(R, 28, 84, 44, 32, suelo - 2, [50], t);
  // flores al viento y mariposas
  for (let k = 0; k < (cerca ? 18 : 22); k++) { const x = Math.round(h(k, 1, 723) * 150 + 4), y = cerca ? 150 + Math.round(h(k, 2, 723) * 28) : 120 + Math.round(h(k, 2, 723) * 56), v = Math.round(Math.sin(t * 2.2 + k) * (cerca ? 1.5 : 1)), c = [hex('#f06a8a'), hex('#f0e050'), C.blanco, hex('#a87ae8')][k % 4], tl = cerca ? 7 : 4;
    linea(x, y, x + v, y - tl, C.hierbaS); disco(x + v, y - tl, cerca ? 2 : 1, c); pset(x + v, y - tl, hex('#f8c040')); if (cerca) { pset(x + 1, y - 3, C.hierbaL); pset(x - 1, y - 4, C.hierbaL); } }
  for (let k = 0; k < 2; k++) { const bx = Math.round(40 + k * 60 + Math.sin(t * 0.7 + k * 3) * 30), by = Math.round((cerca ? 128 : 112) + Math.sin(t * 1.3 + k) * 10), a = Math.sin(t * 16 + k) > 0, c = k ? hex('#f0a040') : hex('#e8e8ff');
    pset(bx, by, C.k); pset(bx, by + 1, C.k); if (a) { pset(bx - 1, by - 1, c); pset(bx - 2, by - 1, c); pset(bx + 1, by - 1, c); pset(bx + 2, by - 1, c); pset(bx - 1, by + 1, c); pset(bx + 1, by + 1, c); } else { pset(bx - 1, by, c); pset(bx + 1, by, c); } }
  R.recorte(null);
  // derecha: estrellas que titilan (pocas y apagadas junto a Atom), la luna, ventanas del castillo, cuervos, el foso
  R.recorte([162, 0, 319, 179]);
  for (let k = 0; k < 30; k++) { const x = 164 + Math.round(h(k, 1, 724) * 154), y = 3 + Math.round(h(k, 2, 724) * 70), b = Math.sin(t * (1.3 + k % 4 * 0.5) + k * 2.1); if (x > 274 && y < 48) continue; if (b > -0.2) pset(x, y, b > 0.6 ? C.blanco : hex('#8a90c8')); }
  { const [mx, my] = cerca ? [214, 24] : [196, 26]; disco(mx, my, 7, hex('#3a3a6a')); disco(mx, my, 6, hex('#f4ecc8')); disco(mx + 2, my - 1, 5, hex('#1e2450')); pset(mx - 4, my, hex('#fffbe8')); }
  { const cx = cerca ? 186 : 238, b = (cerca ? 116 : 102) - 4, s = cerca ? 0.7 : 1;
    for (const [dx, dy, k] of [[-21, -24, 0], [21, -24, 1], [0, -22, 2], [-10, -10, 3], [10, -10, 4]]) { const on = h(k, Math.floor(t / 2.5 + k * 0.7), 725) < 0.7; rect(cx + dx * s, b + dy * s, cx + dx * s + 1, b + dy * s + 1, on ? hex('#ffd070') : hex('#4a3a5a')); } }
  for (let k = 0; k < 2; k++) { const u = ((t / 12 + k * 0.5) % 1), bx = Math.round(330 - u * 180), by = (cerca ? 70 : 58) + k * 8 + Math.round(Math.sin(u * 14) * 3), a = Math.sin(t * 7 + k) > 0;
    rect(bx - 1, by, bx + 1, by, C.k); pset(bx - 2, by - (a ? 1 : -1), C.k); pset(bx + 2, by - (a ? 1 : -1), C.k); pset(bx - 3, by - (a ? 2 : -1), C.k); pset(bx + 3, by - (a ? 2 : -1), C.k); }
  if (!cerca) for (let y = 113; y < 122; y += 2) for (let x = 162 + ((y + Math.floor(t * 3)) % 7); x < 320; x += 11) if (x < 228 || x > 248) rect(x, y, Math.min(319, x + 3), y, (y & 2) ? hex('#3a5a9a') : hex('#2a4a8a'));
  // la hierba alta del primer término que se mece
  for (let k = 0; k < 26; k++) { const x = 164 + Math.round(h(k, 3, 726) * 154), y = 172 + Math.round(h(k, 4, 726) * 8), v = Math.round(Math.sin(t * 1.8 + k * 0.7) * 1.4); linea(x, y, x + v, y - 5, hex('#4a7a4a')); linea(x + 1, y, x + 1 + v, y - 3, hex('#2a4a38')); }
  R.recorte(null);
  if (cerca) {
    // el atril de madera con el cuadro de la muerte grande y el pedestal de guardar
    for (const [xa, xb] of [[178, 172], [262, 268]]) { linea(xa, 92, xb, suelo, C.k); linea(xa + 1, 92, xb + 1, suelo, hex('#a8743c')); linea(xa + 2, 92, xb + 2, suelo, hex('#5e3a1e')); }
    rect(176, 124, 266, 126, C.k); rect(177, 124, 265, 125, hex('#8a5a2a'));
    cuadroMuerte(R, 170, 36, t, { w: 100, abre: o.abre, guino: o.guino, gafas: o.gafas, rie: o.rie, cursor: o.cursor });
    e_pedestal(R, 296, suelo, 30, t, brillo);
    return { suelo, izquierda: [8, 150], derecha: [182, 260], cartel: [44, 52, 124, 112], cuadro: [170, 36, 100], pedestal: [296, suelo - 33], sol: [sx, sy], costura: 160 };
  }
  // el poste con el cuadro de la muerte pequeño (la calavera guiña) y el pedestal de guardar
  rect(292, 92, 295, suelo - 2, C.k); rect(293, 92, 294, suelo - 2, hex('#7a4e24'));
  cuadroMuerte(R, 270, 62, t, { w: 46, abre: o.abre, guino: o.guino, gafas: o.gafas, rie: o.rie });
  e_pedestal(R, 196, suelo, 24, t, brillo);
  return { suelo, izquierda: [80, 150], derecha: [210, 280], cartel: [28, 84, 72, 116], cuadro: [270, 62, 46], pedestal: [196, suelo - 27], sol: [sx, sy], foso: [162, 112, 319, 122], puente: [228, 248], costura: 160 };
}

// la calavera simpática (de cuento) de radio r centrada en (cx, cy): cráneo redondo con luz y sombra, cuencas grandes
// con un brillo, nariz de corazón, sonrisa con dientes y mofletes. o.guino (0–1) cierra la cuenca derecha en un arco;
// o.rie (0–1) la mandíbula bota; o.gafas (0–1) le bajan unas gafas de broma con nariz y bigote.
function e_calavera(R, cx, cy, r, t, o = {}) {
  const { rect, pset, disco, linea } = R; cx = Math.round(cx); cy = Math.round(cy);
  const rie = o.rie ?? 0, mand = Math.round(Math.max(0, Math.sin(t * 16)) * rie * Math.max(1, r * 0.12));
  const rx = r, ry = r * 0.9, jw = r * 0.62, jy0 = cy + r * 0.45, jy1 = cy + r * 1.02 + mand;
  const dentro = (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 || (Math.abs(x - cx) <= jw - (y > jy1 - 2 ? 1 : 0) && y >= jy0 && y <= jy1);
  const X0 = Math.floor(cx - rx - 2), X1 = Math.ceil(cx + rx + 2), Y0 = Math.floor(cy - ry - 2), Y1 = Math.ceil(jy1 + 2);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    if (dentro(x, y)) { const v = ((x - cx) * 0.55 + (y - cy) * 0.8) / r; pset(x, y, v > 0.8 - e_b4(x, y) * 0.2 ? C.huesoS : v < -0.55 + e_b4(x, y) * 0.2 ? C.blanco : C.hueso); }
    else if (dentro(x + 1, y) || dentro(x - 1, y) || dentro(x, y + 1) || dentro(x, y - 1)) pset(x, y, C.k);
  }
  // la sombra bajo los pómulos (separa el cráneo de la mandíbula)
  for (let x = Math.round(cx - jw); x <= cx + jw; x++) if (Math.abs(x - cx) > jw * 0.55) pset(x, Math.round(jy0), C.huesoS);
  // las cuencas
  const ex = Math.max(2, Math.round(r * 0.36)), ey = Math.round(cy + r * 0.02), er = Math.max(1.5, r * 0.28), CU = hex('#2a2030');
  const guino = o.guino ?? 0;
  for (const [lado, cierra] of [[-1, 0], [1, guino]]) { const ox = cx + lado * ex;
    if (cierra > 0.5) { for (let i = -Math.round(er); i <= Math.round(er); i++) { const yy = ey - Math.round((1 - (i / er) ** 2) * er * 0.55); pset(ox + i, yy, CU); if (r >= 10) pset(ox + i, yy + 1, CU); } continue; }
    const k = 1 - cierra * 1.6;
    for (let j = -Math.ceil(er); j <= Math.ceil(er); j++) for (let i = -Math.ceil(er); i <= Math.ceil(er); i++) if ((i / er) ** 2 + (j / (er * 1.1 * Math.max(0.2, k))) ** 2 <= 1) pset(ox + i, ey + j, CU);
    if (r >= 6) { pset(ox - Math.round(er * 0.35), ey - Math.round(er * 0.4), C.blanco); if (r >= 12) { pset(ox - Math.round(er * 0.35) + 1, ey - Math.round(er * 0.4), C.blanco); pset(ox + Math.round(er * 0.3), ey + Math.round(er * 0.3), hex('#8a7a9a')); } } }
  // la nariz (un corazón al revés) y los mofletes
  const ny = Math.round(cy + r * 0.42), nw = Math.max(1, Math.round(r * 0.1));
  for (let j = 0; j <= nw + 1; j++) for (let i = -nw - 1 + j; i <= nw + 1 - j; i++) pset(cx + i, ny + j - 1, CU);
  if (r >= 8) for (const lado of [-1, 1]) { const mx = cx + lado * Math.round(r * 0.66), my = Math.round(cy + r * 0.4); pset(mx, my, hex('#f0a0a0')); pset(mx + lado, my, hex('#f0a0a0')); if (r >= 14) { pset(mx, my + 1, hex('#f0b8b0')); pset(mx + lado, my + 1, hex('#f0b8b0')); } }
  // la sonrisa con dientes
  const sy = Math.round(jy0 + (jy1 - jy0) * 0.42), sw = Math.round(jw * 0.85), nd = r >= 10 ? 5 : 3;
  for (let x = cx - sw; x <= cx + sw; x++) { const yy = sy + Math.round((1 - ((x - cx) / sw) ** 2) * Math.max(1, r * 0.1)); pset(x, yy, CU); if (mand > 0 && Math.abs(x - cx) < sw - 1) for (let d = 1; d <= mand; d++) pset(x, yy + d, hex('#5a2a3a')); }
  for (let k = 1; k < nd; k++) { const x = Math.round(cx - sw + k * 2 * sw / nd); linea(x, sy - Math.max(1, Math.round(r * 0.14)), x, sy + Math.max(1, Math.round(r * 0.18)) + mand, CU); }
  // las gafas de broma: dos aros negros, la nariz rosa grande y el bigote; bajan desde arriba
  const g = o.gafas ?? 0;
  if (g > 0) { const dy = Math.round((1 - Math.min(1, g)) * -r * 1.6), gy = ey + dy, ar = Math.max(2, Math.round(er + 1));
    for (const lado of [-1, 1]) { const ox = cx + lado * ex; for (let a = 0; a < 6.3; a += 0.12) { pset(Math.round(ox + Math.cos(a) * ar), Math.round(gy + Math.sin(a) * ar), C.k); if (r >= 10) pset(Math.round(ox + Math.cos(a) * (ar + 1)), Math.round(gy + Math.sin(a) * (ar + 1)), C.k); } pset(ox - Math.round(ar * 0.5), gy - Math.round(ar * 0.5), hex('#c8e8f8')); }
    rect(cx - ex + ar, gy - 1, cx + ex - ar, gy - 1, C.k); linea(cx - ex - ar, gy, cx - rx + 1, gy - 2, C.k); linea(cx + ex + ar, gy, cx + rx - 1, gy - 2, C.k);
    const nr = Math.max(1, Math.round(r * 0.18)); disco(cx, gy + Math.round(r * 0.36), nr + 1, C.k); disco(cx, gy + Math.round(r * 0.36), nr, hex('#f0a0a8')); pset(cx - Math.round(nr * 0.4), gy + Math.round(r * 0.36) - Math.round(nr * 0.4), C.blanco);
    const by = gy + Math.round(r * 0.36) + nr + 1, bw = Math.max(2, Math.round(r * 0.45)); for (let i = -bw; i <= bw; i++) { const yy = by + Math.round(Math.abs(i) / bw * 1.5); pset(cx + i, yy, hex('#3a2418')); if (r >= 8) pset(cx + i, yy + 1, Math.abs(i) < bw - 1 ? hex('#3a2418') : C.k); } }
}

// La ciencia ficción de broma de las aventuras espaciales de 1986–1991, nuestra (nada copiado). Cinco encuadres, cada uno
// con dos cámaras; todos pintan los 320×180 en cada fotograma, con lo fijo en un búfer (R.nuevo) y la vida encima.
// o.encuadre:
//   'nave' (suelo 150): el pasillo de la nave: techo con tuberías y tubos de luz (uno parpadea), paredes de chapa con
//     remaches y costillas, dos ojos de buey con estrellas que pasan deprisa y un planeta anillado que cruza, la consola de
//     pared con su pantalla de ondas y botones, la rejilla con vapor, el extintor, la válvula, un cable suelto que chisporrotea,
//     la baliza sobre la puerta, la puerta corredera (con ventanillas; al otro lado, un tripulante diminuto pasa) y el robot
//     de limpieza que patrulla. o.puerta (0–1) abre la puerta; o.robot: x del robot (false: sin robot; por omisión patrulla
//     solo; la escena puede pintarlo ella con f_robotLimpieza); o.velocidad (px/s de las estrellas, 26); o.alarma (0–1): la
//     baliza gira en rojo, sus haces barren la pared y todo se tiñe de rojo a latidos.
//     o.camara 'armario' (suelo 150): el armario de las escobas abierto: estantes con rollos, cubos, pulverizadores, una caja
//     de jabón, esponjas, garrafa, trapos y caja de herramientas; fregona y escoba apoyadas, el cubo con escurridor, la
//     bombilla que se mece y alumbra, el reloj de pared «3:00» con los dos puntos que parpadean, la gotera que cae en un cubo
//     del pasillo, un robotito que cruza el suelo y la ventanilla redonda del fondo; o.acople (0–1): por la ventanilla llega
//     una nave alienígena, se acopla con su tubo y por él pasan alienígenas diminutos con casco; o.almohada: x del cubo
//     boca abajo con un trapo encima (la almohada; 120; false: sin él); o.alarma también vale aquí.
//   'puente' (suelo 160): el puente de mando: el ventanal de tres paños con el planeta anillado que gira, una luna, un
//     cometa de vez en cuando y un astronauta diminuto atado con su cable que saluda; el radar que barre, la pantalla de
//     ondas, el mapa táctico con la ruta, las filas de botones, la taza de café que humea, la tarima con luces que corren y
//     dos sillones vistos de espaldas; o.alarma (0–1).
//     o.camara 'radio' (inserto de cerca, sin suelo de personajes: va con T.mano / T.brazo): la consola de radio grande:
//     altavoz de rejilla con su cono que late, el dial con números y la aguja, dos vúmetros, cinco mandos, deslizadores e
//     interruptores, el botón rojo de hablar y el micro de cuello de cisne con su piloto «en el aire»; o.habla (0–1) mueve
//     las agujas, el cono y enciende el piloto (por omisión, una señal suave); arriba la pared queda tranquila para los
//     bocadillos de la escena.
//   'desierto' (suelo 150; 'cerca' 158): un planeta desértico: cielo violeta y melocotón tramado, dos soles, un planeta
//     anillado pálido, nubes de tres tonos a tres velocidades, bichos voladores, mesetas con un arco, dunas con ondas, rocas
//     con forma de seta, plantas alienígenas que se mecen, arena que vuela, un lagarto que cruza, huellas (en 'general') y la
//     nave aterrizada; o.explosion (0–1): la nave tiembla, estalla en un destello y en fuegos artificiales de colores, saltan
//     piezas de cuento (una tuerca, un engranaje, una aleta, una taza) y queda un humo con la pata y la antena dobladas (sin
//     nadie dentro); el destello tiñe la escena. o.camara 'general' o 'cerca' (horizonte más bajo, la seta grande a la
//     derecha, la nave pequeña al fondo a la izquierda).
//   'asteroide' (suelo 152; 'jaula' 154): la sede de la empresa malvada de videojuegos sobre un asteroide: la cúpula de
//     cristal con ejecutivos diminutos dentro, la fábrica de ventanas verdes con dos chimeneas que echan humo, el cartel con
//     luces que corren y el pictograma del mando con cuernos, la torre de antena, la parabólica que gira, la pista con un
//     platillo, un todoterreno lunar que va y viene, cráteres y rocas flotando; la jaula en primer término a la derecha.
//     o.camara 'jaula': la pared de la sede de cerca (chapa morada, el emblema grande, la cámara de seguridad que vigila, una
//     tubería de cristal con líquido verde que corre, la tira de ventanas al espacio) y la jaula grande en el centro.
//     o.abierta (0–1) abre la puerta de la jaula y el candado cae al suelo. La jaula se pinta entera; para que los barrotes
//     de delante tapen a quien está dentro, la escena llama a f_jaulaDelante(R, t, o) después de los personajes.
//   'portal' (suelo 150): un portal del tiempo en espiral en medio del espacio, con chispas que se lo tragan, relojes y
//     disquetes que giran hacia el centro, rocas flotando, un planeta en creciente abajo y la cornisa de roca con la pista
//     rayada, el poste con baliza y la señal de la espiral, desde donde se salta. o.giro (velocidad, 1).
//     o.camara 'pixeles' (suelo 150): el mundo del primer juego: todo en píxeles gordos de 2×2 y con los 16 colores de
//     entonces (cielo tramado, dos soles, planeta, mesetas, dunas, cactus, la nave simplificada), con la animación a
//     saltos (8 imágenes por segundo): estrellas que parpadean, un bicho volador de dos fotogramas, un gusano que asoma y
//     la luz de la nave. f_pixelar(R, x0, y0, x1, y1) vuelve cuadrado y de 16 colores lo que ya hay en ese rectángulo (para
//     el personaje que aterriza ahí).
// Devuelve la geometría del encuadre: { suelo, … } (puertas, pantallas, la nave, la jaula, el portal…).
const SE = pal({
  ink: '#141824', blanco: '#f4f6fa', tubo: '#e8f4ff', tuboOff: '#5a6474', calida: '#f8e0a0', calidaL: '#fff4d0',
  techo: '#252b38', techoL: '#343c4e', techoD: '#191d27',
  chapa: '#8a94a6', chapaL: '#b4bed0', chapaS: '#646e80', chapaD: '#444c5a', remache: '#dce4f0',
  teal: '#2aa8a8', tealL: '#7ae8e0', tealD: '#1a6a70',
  amarillo: '#e8c040', amarilloS: '#a88420', naranja: '#f08a3a', naranjaD: '#8a4a24', rojo: '#e84a3a', rojoL: '#ff9a7a', rojoD: '#8a2420',
  verde: '#5ae86a', verdeD: '#1e5a2e', fosforo: '#9af0a0', azulL: '#7ab8f0', azul: '#3a6ac8', azulD: '#22407a', rosa: '#f07ab8',
  suelo: '#4e5666', sueloL: '#68728a', sueloS: '#383e4c', sueloD: '#262a34',
  esp0: '#04050e', esp1: '#0a0d20', esp2: '#141a38', esp3: '#221f4a', neb1: '#36245e', neb2: '#562e78', neb3: '#24427e', neb4: '#7a3a8a', neb5: '#3a6aa8',
  estrella: '#f4f4ff', estrellaA: '#a8c0ff', estrellaR: '#ffd8a0', estrellaD: '#5a6090',
  plan1: '#f0c080', plan2: '#d88a50', plan3: '#a85a3a', plan4: '#6a3428', plan0: '#ffe8b8',
  cieloD0: '#3e3a7e', cieloD1: '#6a4a8e', cieloD2: '#a8608e', cieloD3: '#de8a80', cieloD4: '#f4b886', cieloD5: '#fad6a0',
  arena: '#e0aa66', arenaL: '#f2c888', arenaS: '#b47a42', arenaD: '#8a5432', arenaB: '#fae0b0',
  mesa: '#c27e66', mesaS: '#94584a', mesaL: '#dc9c80', mesaF: '#c09aa8', mesaFS: '#a07e92',
  nubeD1: '#fde6d8', nubeD2: '#eab0b0', nubeD3: '#b87898',
  roca: '#6a6274', rocaL: '#8e86a0', rocaS: '#4a4456', rocaD: '#2e2a38',
  malva: '#5a2a7a', malvaL: '#8a4ab0', malvaD: '#341848', acido: '#8ae84a', acidoD: '#3a8a2a', acidoL: '#d0ff9a',
  vidrioC: '#4a9ac8', vidrioCL: '#a8e0f4', vidrioCD: '#24507a',
  carton: '#c89a5a', cartonS: '#9a6e3a', piel: '#f6c290', pielS: '#d48a5a',
});

const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_b4 = (x, y) => (f_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// un tono de una rampa con trama de Bayer 4×4 (v fraccionario mezcla dos escalones)
const f_tono = (P, v, x, y) => { let l = Math.floor(v); if (v - l > f_b4(x, y)) l++; return P[l < 0 ? 0 : l >= P.length ? P.length - 1 : l]; };

// ·· piezas comunes del espacio ··
const f_capas = new Map();

// una capa fija: se pinta una sola vez en su búfer de R.nuevo() y luego se copia en cada fotograma
function f_capa(R, clave, dibuja) {
  let b = f_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); dibuja(); R.recorte(null); R.usar(prev); f_capas.set(clave, b); }
  return b;
}

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function f_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe un rectángulo hacia un color (la alarma, el destello, la luz de una bombilla)
function f_tinte(R, x0, y0, x1, y1, c, k, trama = 0) {
  if (k <= 0) return;
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (!trama || f_b4(x, y) < trama) R.pset(x, y, f_mezcla(R.pget(x, y), c, k));
}

// ruido suave: valor interpolado en una rejilla de lado s
function f_ruido(x, y, s, k = 0) {
  const gx = Math.floor(x / s), gy = Math.floor(y / s), fx = x / s - gx, fy = y / s - gy, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = h(gx, gy, k), b = h(gx + 1, gy, k), c = h(gx, gy + 1, k), d = h(gx + 1, gy + 1, k);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// el fondo del espacio en un rectángulo (para un búfer): negro azulado tramado, una nebulosa de tres tonos en diagonal,
// otra azul más tenue y estrellas fijas de tres tamaños (las grandes con su cruz); k cambia el dibujo
function f_cosmos(R, x0, y0, x1, y1, k = 0) {
  const P = [SE.esp0, SE.esp1, SE.esp2, SE.esp3, SE.neb1, SE.neb2, SE.neb4], A = [SE.esp1, SE.esp2, SE.neb3, SE.neb5];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const n = f_ruido(x, y, 44, k) * 0.55 + f_ruido(x, y, 14, k + 1) * 0.3 + f_ruido(x, y, 4, k + 2) * 0.15;
    const banda = Math.max(0, 1 - Math.abs(y - (18 + x * 0.34 + (k % 3) * 16)) / 64), banda2 = Math.max(0, 1 - Math.abs(y - (150 - x * 0.3 - (k % 2) * 30)) / 46);
    const v = 0.5 + (y - y0) / (y1 - y0 + 1) * 0.8 + Math.max(0, n - 0.4) * 9 * banda, w = Math.max(0, n - 0.48) * 8 * banda2;
    R.pset(x, y, w > v - 0.4 && w > 0.6 ? f_tono(A, w, x, y) : f_tono(P, v, x, y));
  }
  const n = Math.round((x1 - x0) * (y1 - y0) / 90);
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.round(h(i, 1, 30 + k) * (x1 - x0)), y = y0 + Math.round(h(i, 2, 30 + k) * (y1 - y0)), r = h(i, 3, 30 + k);
    if (r > 0.97) { R.pset(x, y, SE.blanco); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + dx, y + dy, SE.estrellaA); for (const [dx, dy] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) R.pset(x + dx, y + dy, SE.estrellaD); }
    else R.pset(x, y, r > 0.8 ? SE.estrella : r > 0.5 ? (i % 5 ? SE.estrellaA : SE.estrellaR) : SE.estrellaD);
  }
}

// estrellas que titilan encima de un fondo fijo (dentro del rectángulo, y si se da, solo donde dentro(x, y))
function f_titilan(R, t, x0, y0, x1, y1, n, k = 0, dentro = null) {
  for (let i = 0; i < n; i++) {
    const x = x0 + Math.round(h(i, 4, 50 + k) * (x1 - x0)), y = y0 + Math.round(h(i, 5, 50 + k) * (y1 - y0)), s = Math.sin(t * (1.5 + h(i, 6, k) * 3) + i * 2.1);
    if (s < 0.35 || (dentro && !dentro(x, y))) continue;
    R.pset(x, y, s > 0.85 ? SE.blanco : SE.estrellaA);
    if (s > 0.92) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!dentro || dentro(x + dx, y + dy)) R.pset(x + dx, y + dy, SE.estrellaD);
  }
}

// una chapa de la nave: ruido suave, más clara arriba, bisel de luz y sombra, remaches en las esquinas y a lo largo, algún
// arañazo y churretes de grasa bajo los remaches; P = rampa de 4 tonos (oscuro → claro)
function f_chapa(R, x0, y0, x1, y1, k = 0, P = [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL]) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let v = 2.05 + (f_ruido(x, y, 9, k) - 0.5) * 0.8 - (y - y0) / (y1 - y0 + 1) * 0.55;
    if (h(x, y, k) > 0.988) v -= 0.9;
    R.pset(x, y, f_tono(P, v, x, y));
  }
  for (let i = 0; i < 2; i++) { const sx = x0 + 4 + Math.round(h(k, i, 7) * (x1 - x0 - 12)), sy = y0 + 4 + Math.round(h(k, i + 3, 7) * (y1 - y0 - 10)); R.linea(sx, sy, sx + 4, sy + 2, P[3]); }
  R.rect(x0, y0, x1, y0, P[3]); R.rect(x0, y0, x0, y1, P[3]); R.rect(x0, y1, x1, y1, P[0]); R.rect(x1, y0, x1, y1, P[0]);
  const rem = (x, y) => { R.pset(x, y, SE.remache); R.pset(x + 1, y + 1, P[0]); if (h(x, y, k + 9) > 0.6) for (let d = 2; d < 5; d++) if ((x + d) % 2) R.pset(x, y + d, P[1]); };
  for (const [rx, ry] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 3], [x1 - 2, y1 - 3]]) rem(rx, ry);
  if (x1 - x0 > 34) for (let x = x0 + 10; x < x1 - 6; x += 10) { rem(x, y0 + 2); rem(x, y1 - 3); }
  if (y1 - y0 > 34) for (let y = y0 + 10; y < y1 - 6; y += 10) { rem(x0 + 2, y); rem(x1 - 2, y); }
}

// franjas de aviso amarillas y negras en diagonal, gastadas
function f_rayas(R, x0, y0, x1, y1) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = ((x + y) >> 2) & 1, g = h(x, y, 11) > 0.9; R.pset(x, y, a ? (g ? SE.amarilloS : SE.amarillo) : (g ? SE.chapaD : SE.ink)); }
}

// un suelo de chapas en perspectiva (de y0 a y1): juntas que se van hacia el punto de fuga, dibujo de lágrimas, chapas
// de tonos distintos, manchas y el reflejo de las luces (luces: lista de x en la línea del fondo)
function f_cubierta(R, y0, y1, o = {}) {
  const vy = o.fuga ?? 40, cx = 160, paso = o.paso ?? 32, luces = o.luces ?? [], P = o.P ?? [SE.sueloD, SE.sueloS, SE.suelo, SE.sueloL];
  let filaAnt = null;
  for (let y = y0; y <= y1; y++) {
    const s = (y - vy) / (y0 - vy), z = 620 / (y - vy), fila = Math.floor(z / 9), junta = filaAnt !== null && fila !== filaAnt; filaAnt = fila;
    for (let x = 0; x < 320; x++) {
      const u = cx + (x - cx) / s, col = Math.floor(u / paso), fu = ((u % paso) + paso) % paso;
      let v = 2 - (1 - (y - y0) / (y1 - y0 + 1)) * 0.5 + (h(col, fila, 3) - 0.5) * 0.45;
      if (((Math.floor(u / 3) + Math.floor(z * 1.4)) & 3) === 0 && (x + y) % 2 === 0) v += 0.6;
      for (const lx of luces) { const d = Math.abs(u - lx); if (d < 9) v += (1 - d / 9) * 1.1; }
      if (f_ruido(u, z * 8, 20, 5) > 0.72) v -= 0.6;
      let c = f_tono(P, v, x, y);
      if (fu * s < 1) c = P[0]; else if (fu * s < 2) c = P[3];
      if (junta) c = P[0];
      R.pset(x, y, c);
    }
  }
}

// una figura diminuta de fondo (6–11 px): cabeza, cuerpo de color c y piernas que andan; respeta R.recorte
function f_figura(R, x, suelo, t, c, o = {}) {
  const a = o.quieto ? 0 : Math.round(Math.sin(t * 9 + x) * 1), s = o.alto ?? 10, cab = o.casco ? SE.vidrioCL : SE.piel;
  for (let j = 0; j < 3; j++) { R.pset(x + a, suelo - j, SE.ink); R.pset(x + 2 - a, suelo - j, SE.ink); }
  for (let j = 3; j < s - 3; j++) for (let i = -1; i <= 3; i++) R.pset(x + i, suelo - j, i === 3 ? f_mezcla(c, SE.ink, 0.35) : c);
  R.disco(x + 1.5, suelo - s + 1.5, 1.8, cab); R.pset(x + 2, suelo - s + 1, o.casco ? SE.blanco : SE.pielS);
  if (o.antenas) { R.pset(x, suelo - s - 1, SE.ink); R.pset(x + 3, suelo - s - 1, SE.ink); R.pset(x - 1, suelo - s - 2, SE.acido); R.pset(x + 4, suelo - s - 2, SE.acido); }
}

// el ojo de buey de la nave por dentro: el espacio con estrellas que pasan a vx px/s y el planeta anillado que cruza
// despacio (con las mismas coordenadas de pantalla en todos los ojos, así pasa de uno a otro), y el reflejo del cristal
function f_ojoBuey(R, t, cx, cy, r, vx, o = {}) {
  const px = o.planeta === false ? -999 : 400 - ((t * 5 + 150) % 560), py = 64, pr = 20, PL = [SE.plan4, SE.plan3, SE.plan2, SE.plan1, SE.plan0], E = [SE.esp0, SE.esp1, SE.esp2, SE.esp3];
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) {
    if (i * i + j * j > r * r) continue;
    const x = cx + i, y = cy + j, dx = x - px, dy = y - py;
    if (dx * dx + dy * dy < pr * pr) { const band = Math.sin(dy * 0.55 + Math.sin(dx * 0.15 + t * 0.4) * 0.6), luz = 1.6 - (dx + dy) / pr; R.pset(x, y, f_tono(PL, 1 + band * 0.6 + luz, x, y)); }
    else { const ry = Math.abs(dy * 4 - dx * 0.6); R.pset(x, y, ry < 5 && Math.abs(dx) < pr * 1.9 && dy * 4 - dx * 0.6 > -5 ? (ry < 2 ? SE.plan1 : SE.plan3) : f_tono(E, 0.4 + (j + r) / (2 * r) * 1.6 + f_ruido(x, y, 7, 4) * 0.8, x, y)); }
  }
  for (let k = 0; k < 90; k++) {
    const l = k % 3, sp = vx * (0.3 + l * 0.35), sx = ((h(k, 1, 9) * 360 - t * sp) % 360 + 360) % 360 - 20, sy = h(k, 2, 9) * 150 + 5, len = Math.min(7, Math.round(sp / 10));
    for (let q = 0; q <= len; q++) {
      const x = Math.round(sx + q), y = Math.round(sy), dx = x - cx, dy = y - cy, ex = x - px, ey = y - py;
      if (dx * dx + dy * dy > (r - 1) * (r - 1) || ex * ex + ey * ey < pr * pr) continue;
      R.pset(x, y, q === 0 ? (l === 2 ? SE.estrella : SE.estrellaA) : q < 3 ? SE.estrellaD : SE.esp3);
    }
  }
  for (let q = 0; q < Math.round(r * 0.7); q++) for (const off of [0, 3]) { const x = cx - Math.round(r * 0.55) + q, y = cy - Math.round(r * 0.1) - q + off; if ((x - cx) ** 2 + (y - cy) ** 2 < (r - 2) ** 2 && (q + off) % 2 === 0) R.pset(x, y, f_mezcla(R.pget(x, y), SE.blanco, off ? 0.25 : 0.45)); }
}

// el aro de un ojo de buey (para el búfer): metal con luz arriba a la izquierda, ocho tornillos y la sombra del borde
function f_aro(R, cx, cy, r) {
  const P = [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL];
  for (let j = -r - 6; j <= r + 6; j++) for (let i = -r - 6; i <= r + 6; i++) {
    const d = Math.hypot(i, j); if (d <= r || d > r + 5.5) continue;
    const luz = -(i + j) / d * 0.9; R.pset(cx + i, cy + j, d > r + 4.6 ? SE.ink : d < r + 1 ? SE.ink : f_tono(P, 1.8 + luz + (d < r + 2.5 ? 0.4 : 0), cx + i, cy + j));
  }
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.39, x = Math.round(cx + Math.cos(a) * (r + 3)), y = Math.round(cy + Math.sin(a) * (r + 3)); R.pset(x, y, SE.remache); R.pset(x + 1, y + 1, SE.ink); }
}

// la alarma: todo se tiñe de rojo a latidos
function f_alarma(R, t, k) { f_tinte(R, 0, 0, 319, 179, SE.rojo, k * (0.14 + 0.12 * (0.5 + 0.5 * Math.sin(t * 6.3)))); }

// la baliza de techo: ámbar que parpadea despacio; con alarma, roja, girando y con dos haces que barren la pared
function f_baliza(R, t, x, y, alarma = 0) {
  if (alarma > 0) {
    const a = t * 4.5;
    for (const s of [0, Math.PI]) for (let d = -0.13; d <= 0.13; d += 0.026) R.linea(x, y, x + Math.cos(a + s + d) * 120, y + Math.abs(Math.sin(a + s + d)) * 90, (X, Y, k) => k > 4 && (X + Y) % 2 === 0 && f_b4(X, Y) < alarma * 0.7 ? f_mezcla(R.pget(X, Y), SE.rojoL, 0.4) : null);
  }
  R.rect(x - 5, y + 3, x + 5, y + 5, SE.chapaD); R.rect(x - 4, y + 3, x + 4, y + 3, SE.chapaL);
  const c = alarma > 0 ? (Math.sin(t * 13) > 0 ? SE.rojoL : SE.rojo) : Math.sin(t * 2.2) > 0.55 ? SE.naranja : SE.naranjaD;
  R.disco(x, y + 1, 3.4, SE.ink); R.disco(x, y + 1, 2.6, c); R.pset(x - 1, y, SE.blanco);
  if (alarma > 0 || Math.sin(t * 2.2) > 0.55) R.halo(x, y + 1, 9, [f_mezcla(c, SE.techo, 0.6), c], 0.8);
}

// ·· la nave: el pasillo ··
function f_nave(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(f_capa(R, 'si-nave', () => f_naveFijo(R)));
  const vx = o.velocidad ?? 26;
  f_ojoBuey(R, t, 45, 66, 15, vx); f_ojoBuey(R, t, 197, 56, 12, vx);
  // los tubos de luz (el del centro tiembla de vez en cuando)
  for (const [x0, x1, i] of [[30, 58, 0], [110, 138, 1], [186, 214, 2]]) {
    const on = i !== 1 || !(Math.sin(t * 0.9) > 0.7 && h(Math.floor(t * 14), 3, 4) < 0.5);
    rect(x0 + 2, 25, x1 - 2, 26, on ? SE.tubo : SE.tuboOff); if (on) for (let x = x0 + 3; x < x1 - 2; x += 5) pset(x, 25, SE.blanco);
  }
  // la consola de pared: la onda que corre, los botones que se encienden, el piloto
  for (let x = 105; x <= 141; x++) { const y = Math.round(69 + Math.sin(x * 0.32 - t * 5) * 5 * Math.sin(t * 0.8 + x * 0.04)); pset(x, y, SE.fosforo); pset(x, y + 1, SE.verdeD); }
  pset(105 + Math.floor((t * 20) % 36), 62, SE.fosforo);
  R.numero(String(40 + Math.floor(t * 3) % 60), 106, 77, { color: SE.verde, sombra: false });
  for (let k = 0; k < 14; k++) { const x = 104 + (k % 7) * 6, y = 86 + Math.floor(k / 7) * 6, on = h(k, Math.floor(t * 2.5 + k * 0.37), 6) > 0.45; rect(x, y, x + 3, y + 2, on ? [SE.rojo, SE.verde, SE.amarillo, SE.azulL][k % 4] : SE.chapaD); if (on) pset(x, y, SE.blanco); }
  // el vapor que sale de la rejilla
  for (let i = 0; i < 16; i++) { const p = (t * 0.45 + i / 16) % 1, x = Math.round(186 + h(i, 1, 2) * 22 + Math.sin(p * 7 + i) * 3), y = Math.round(94 - p * 36); if (f_b4(x, y) < 0.9 - p) { R.disco(x, y, 1 + p * 2.2, f_mezcla(R.pget(x, y), SE.blanco, 0.45 - p * 0.3)); } }
  // el cable suelto que cuelga del techo, se mece y suelta una chispa
  { const sw = Math.sin(t * 1.4) * 3; let px = 146, py = 27; for (let s = 1; s <= 22; s++) { const x = Math.round(146 + sw * (s / 22) ** 2), y = 27 + s; linea(px, py, x, y, SE.ink); pset(x + 1, y, SE.chapaD); px = x; py = y; }
    if (h(Math.floor(t * 4), 2, 8) > 0.72) for (let k = 0; k < 5; k++) pset(px + Math.round((h(k, Math.floor(t * 20), 1) - 0.5) * 6), py + 1 + Math.round(h(k, Math.floor(t * 20), 2) * 4), k % 2 ? SE.amarillo : SE.blanco); }
  // la puerta corredera, la baliza y el robot de limpieza
  f_puertaNave(R, t, o.puerta ?? 0);
  f_baliza(R, t, 262, 36, o.alarma ?? 0);
  // motas de polvo en la luz
  for (let k = 0; k < 10; k++) { const x = Math.round(40 + h(k, 1, 12) * 170 + Math.sin(t * 0.6 + k) * 6), y = Math.round(30 + ((h(k, 2, 12) * 80 + t * 3) % 80)); pset(x, y, f_mezcla(R.pget(x, y), SE.blanco, 0.5)); }
  let rx = null;
  if (o.robot !== false) { rx = typeof o.robot === 'number' ? o.robot : Math.round(150 + Math.sin(t * 0.35) * 110); f_robotLimpieza(R, rx, 152, t, { dir: typeof o.robot === 'number' ? (o.robotDir ?? 1) : (Math.cos(t * 0.35) >= 0 ? 1 : -1), anda: typeof o.robot !== 'number' || !!o.robotAnda }); }
  return { suelo: 150, puerta: [250, 50, 300, 123], ojos: [[45, 66, 15], [197, 56, 12]], consola: [98, 56, 148, 104], baliza: [262, 36], robot: rx, libre: [10, 245] };
}

// lo fijo del pasillo (al búfer): techo, chapas, costillas, aros, consola, rejilla, extintor, válvula, marco y suelo
function f_naveFijo(R) {
  const { rect, pset, disco, linea } = R;
  // el techo: paneles oscuros, la bandeja de cables, dos tuberías con bridas y las carcasas de las luces
  for (let y = 0; y <= 27; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.techoD, SE.techo, SE.techoL], 1 + (f_ruido(x, y, 8, 1) - 0.5) * 0.7 - (x % 40 === 0 ? 1 : 0), x, y));
  rect(0, 6, 319, 6, SE.techoD); for (let x = 0; x < 320; x += 3) pset(x, 8, [SE.rojoD, SE.azulD, SE.verdeD, SE.techoL][(x / 3) % 4]);
  rect(0, 10, 319, 14, SE.chapaD); rect(0, 10, 319, 10, SE.chapaS); rect(0, 14, 319, 14, SE.techoD); for (let x = 12; x < 320; x += 48) { rect(x, 9, x + 3, 15, SE.chapaS); pset(x + 1, 10, SE.chapa); }
  rect(0, 17, 319, 19, SE.tealD); rect(0, 17, 319, 17, SE.teal); for (let x = 30; x < 320; x += 64) { rect(x, 16, x + 2, 20, SE.chapaD); }
  for (const [x0, x1] of [[30, 58], [110, 138], [186, 214]]) { rect(x0, 22, x1, 27, SE.ink); rect(x0 + 1, 23, x1 - 1, 23, SE.chapaD); linea(x0 + 4, 20, x0 + 4, 22, SE.ink); linea(x1 - 4, 20, x1 - 4, 22, SE.ink); }
  // la pared: costillas de la estructura y chapas con remaches
  const chapas = [[7, 29, 83, 73], [7, 75, 83, 115], [91, 29, 155, 50], [91, 52, 155, 115], [163, 29, 231, 73], [163, 75, 231, 115], [239, 29, 313, 42], [239, 44, 245, 115], [305, 44, 313, 115]];
  chapas.forEach(([a, b, c, d], i) => f_chapa(R, a, b, c, d, i + 1));
  for (const [x0, x1] of [[0, 6], [84, 90], [156, 162], [232, 238], [314, 319]]) for (let y = 28; y <= 116; y++) for (let x = x0; x <= x1; x++) pset(x, y, x === x0 ? SE.chapaL : x === x1 ? SE.ink : f_tono([SE.chapaD, SE.chapaS, SE.chapa], 1.4 + (x1 - x) / (x1 - x0) * 0.6 + (y % 12 === 0 ? -0.8 : 0), x, y));
  // la luz de los tubos sobre la pared (conos tramados)
  for (const lx of [44, 124, 200]) for (let y = 28; y < 70; y++) { const w = 10 + (y - 28) * 0.7; for (let x = Math.round(lx - w); x <= lx + w; x++) if (f_b4(x, y) < 0.35 * (1 - (y - 28) / 42) * (1 - Math.abs(x - lx) / w)) pset(x, y, f_mezcla(R.pget(x, y), SE.blanco, 0.35)); }
  // el número de la cubierta pintado con plantilla y una flecha hacia el armario
  R.numero('07', 118, 45, { color: SE.amarillo, sombra: false }); for (let k = 0; k < 6; k++) { rect(171 + k, 38 - (k < 3 ? k : 5 - k), 171 + k, 40 + (k < 3 ? k : 5 - k), SE.amarillo); } rect(164, 39, 170, 39, SE.amarillo);
  // los aros de los ojos de buey
  f_aro(R, 45, 66, 15); f_aro(R, 197, 56, 12);
  // la consola de pared: carcasa, pantalla con rejilla, filas de botones y una palanca
  rect(97, 55, 149, 105, SE.ink); f_chapa(R, 98, 56, 148, 104, 31, [SE.tealD, SE.chapaD, SE.chapaS, SE.chapa]);
  rect(102, 59, 144, 80, SE.ink); for (let y = 60; y <= 79; y++) for (let x = 103; x <= 143; x++) pset(x, y, (x % 6 === 0 || y % 5 === 0) && (x + y) % 2 ? SE.verdeD : hex('#0c2014'));
  rect(102, 83, 145, 98, SE.chapaD); rect(140, 99, 146, 101, SE.ink);
  linea(142, 84, 146, 76, SE.chapaL); disco(146, 75, 2, SE.rojo);
  // la tubería vertical sobre la costilla, con su válvula roja
  rect(85, 28, 89, 116, SE.tealD); rect(86, 28, 86, 116, SE.tealL); rect(88, 28, 88, 116, SE.teal); for (let y = 36; y < 116; y += 22) rect(84, y, 90, y + 2, SE.chapaS);
  R.anillo(87, 92, 5, SE.rojo); R.anillo(87, 92, 4, SE.rojoD); linea(82, 92, 92, 92, SE.rojo); linea(87, 87, 87, 97, SE.rojo); disco(87, 92, 1.5, SE.chapaL);
  // la rejilla del vapor y el extintor
  rect(181, 91, 213, 111, SE.ink); for (let y = 92; y <= 110; y++) for (let x = 182; x <= 212; x++) pset(x, y, y % 3 === 0 ? SE.chapaS : x % 6 === 0 ? SE.chapaD : SE.techoD);
  rect(166, 82, 173, 110, SE.ink); rect(167, 84, 172, 109, SE.rojo); rect(167, 84, 168, 109, SE.rojoL); rect(171, 84, 172, 109, SE.rojoD); rect(167, 90, 172, 93, SE.blanco); rect(168, 79, 171, 83, SE.ink); linea(171, 80, 175, 86, SE.ink); rect(165, 100, 174, 101, SE.chapaD);
  // el marco de la puerta: grueso, con franjas de aviso a los lados y la luz verde encima
  rect(244, 44, 306, 123, SE.ink); f_chapa(R, 245, 45, 305, 122, 40, [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL]); rect(249, 49, 301, 123, SE.ink);
  f_rayas(R, 245, 52, 248, 122); f_rayas(R, 302, 52, 305, 122);
  // el zócalo de aviso y el suelo
  f_rayas(R, 0, 116, 249, 121); f_rayas(R, 301, 116, 319, 121); rect(0, 122, 319, 123, SE.ink);
  f_cubierta(R, 124, 179, { fuga: 40, luces: [44, 124, 200] });
  // la canaleta de cables junto al zócalo y una trampilla de registro
  rect(0, 126, 249, 129, SE.ink); rect(0, 126, 249, 126, SE.chapaS); for (let x = 4; x < 250; x += 16) rect(x, 127, x + 1, 128, SE.chapaD);
  rect(60, 160, 96, 172, SE.ink); rect(61, 161, 95, 171, SE.sueloS); rect(61, 161, 95, 161, SE.sueloL); for (const [x, y] of [[63, 163], [93, 163], [63, 169], [93, 169]]) pset(x, y, SE.remache); rect(74, 165, 82, 166, SE.ink);
  // las cajas de carga apiladas en primer término, con sus flejes y pictogramas
  const caja = (x0, y0, x1, y1, c, cs, k) => { rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, SE.ink); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, f_tono([cs, c, f_mezcla(c, SE.blanco, 0.3)], 1.4 - (x - x0) / (x1 - x0) * 0.6 + (y === y0 ? 1 : 0) + (h(x, y, k) > 0.95 ? -0.8 : 0), x, y)); rect(x0, y0 + 3, x1, y0 + 4, cs); rect(x0, y1 - 4, x1, y1 - 3, cs); rect(x0 + 3, y0, x0 + 4, y1, cs); };
  caja(2, 150, 36, 178, SE.tealD, SE.ink, 1); caja(6, 132, 30, 149, SE.naranja, SE.naranjaD, 2); caja(38, 160, 56, 178, SE.chapa, SE.chapaD, 3);
  R.anillo(20, 165, 4, SE.blanco); linea(18, 165, 22, 165, SE.blanco); for (let k = 0; k < 3; k++) rect(12 + k * 4, 138, 13 + k * 4, 143, SE.ink); linea(42, 168, 52, 168, SE.amarillo); linea(47, 164, 47, 172, SE.amarillo);
  // el carrito de herramientas a la derecha
  rect(286, 150, 316, 152, SE.ink); rect(287, 150, 315, 150, SE.rojoL); rect(288, 153, 314, 166, SE.ink); rect(289, 154, 313, 165, SE.rojo); for (const y of [157, 161]) rect(289, y, 313, y, SE.rojoD); for (const y of [155, 159, 163]) rect(298, y, 304, y, SE.chapaL);
  for (const x of [291, 311]) { disco(x, 169, 2, SE.ink); pset(x, 168, SE.chapaL); } rect(292, 145, 300, 149, SE.ink); rect(293, 146, 299, 148, SE.amarillo); linea(304, 149, 312, 142, SE.chapaL); linea(305, 149, 313, 142, SE.ink);
  // una rejilla de desagüe y unas flechas pintadas en el suelo
  for (let x = 128; x <= 176; x += 3) linea(x, 136, x - 1, 141, SE.sueloD);
  for (let k = 0; k < 3; k++) { const x = 214 + k * 12; for (let j = 0; j < 4; j++) { pset(x + j, 164 + j, SE.amarilloS); pset(x + j, 171 - j, SE.amarilloS); pset(x + j + 1, 164 + j, SE.amarilloS); pset(x + j + 1, 171 - j, SE.amarilloS); } }
}

// la puerta corredera: al otro lado, otro pasillo que se aleja con su luz al fondo y un tripulante diminuto que cruza;
// las dos hojas (con ventanilla y franja de aviso en el canto) se abren con ab (0–1)
function f_puertaNave(R, t, ab) {
  const X0 = 250, X1 = 300, Y0 = 50, Y1 = 123, cxm = 275, off = Math.round(ab * 24);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const fondo = x >= 266 && x <= 284 && y >= 80 && y <= 104, dx = Math.abs(x - 275) / 9, dy = (y < 92 ? 92 - y : y - 92) / 12;
    let c;
    if (fondo) c = f_tono([SE.chapaS, SE.chapa, SE.chapaL, SE.tubo], 2.6 - Math.abs(y - 90) / 14, x, y);
    else if (dx > dy) c = f_tono([SE.techoD, SE.chapaD, SE.chapaS], 1.6 - dx * 0.25 + ((x - 250) % 6 === 0 ? -0.8 : 0), x, y);
    else if (y < 92) c = f_tono([SE.techoD, SE.techo, SE.tubo], (x % 7 === 0 && y % 4 === 0 ? 2 : 0.9), x, y);
    else c = f_tono([SE.sueloD, SE.sueloS, SE.suelo], 1.3 - dy * 0.2 + ((y % 5) === 0 ? -0.7 : 0), x, y);
    R.pset(x, y, c);
  }
  R.recorte([266, 72, 284, 104]); const fx = 258 + Math.round((t * 6) % 40); f_figura(R, fx, 104, t, SE.teal, { alto: 11 }); R.recorte(null);
  const hoja = (x0, x1, borde, wx0) => {
    for (let y = Y0; y <= Y1; y++) for (let x = Math.max(X0, x0); x <= Math.min(X1, x1); x++) {
      const ven = x >= wx0 && x <= wx0 + 6 && y >= 62 && y <= 80;
      if (ven) { if (f_b4(x, y) < 0.3) R.pset(x, y, f_mezcla(R.pget(x, y), SE.azulL, 0.4)); continue; }
      let c = f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL], 2 + (f_ruido(x, y, 7, 6) - 0.5) * 0.6 - (y - Y0) / 160 + ((x - x0) % 8 === 0 ? -0.9 : 0), x, y);
      if (Math.abs(x - borde) <= 2) c = (((x + y) >> 2) & 1) ? SE.amarillo : SE.ink;
      if ((x === wx0 - 1 || x === wx0 + 7) && y >= 61 && y <= 81 || (y === 61 || y === 81) && x >= wx0 - 1 && x <= wx0 + 7) c = SE.ink;
      if (y === 100 && Math.abs(x - (borde < cxm + 1 ? borde - 6 : borde + 6)) < 3) c = SE.chapaL;
      R.pset(x, y, c);
    }
  };
  hoja(X0 - off, cxm - off, cxm - off, cxm - off - 13); hoja(cxm + 1 + off, X1 + off, cxm + 1 + off, cxm + 1 + off + 6);
  R.rect(249, 49, 301, 49, SE.ink); R.rect(262, 46, 288, 47, ab > 0.5 ? SE.verde : SE.verdeD);
}

// el robot de limpieza: una cúpula con su visor, la antena con luz, dos cepillos que giran y el polvo que levanta.
// x es el centro y suelo la línea de las ruedas; o.dir (1 mira a la derecha), o.anda (gira los cepillos y levanta polvo)
export function f_robotLimpieza(R, x, suelo, t, o = {}) {
  const dir = o.dir ?? 1, anda = o.anda ?? true, b = anda ? (Math.sin(t * 16) > 0 ? 1 : 0) : 0, y = suelo - b;
  for (let i = -10; i <= 10; i++) if ((i + suelo) % 2 === 0) R.pset(x + i, suelo + 1, SE.ink);
  for (let i = -9; i <= 9; i++) R.pset(x + i, suelo, SE.sueloD);
  for (const s of [-6, 6]) { R.disco(x + s, suelo - 1, 2.5, SE.ink); for (let k = 0; k < 6; k++) { const a = (anda ? t * 14 : 0) + k * 1.05; R.pset(Math.round(x + s + Math.cos(a) * 3), Math.round(suelo - 1 + Math.sin(a) * 1.2), SE.amarillo); } }
  R.rect(x - 9, y - 6, x + 9, y - 2, SE.ink); R.rect(x - 8, y - 5, x + 8, y - 3, SE.tealD); R.rect(x - 8, y - 5, x + 8, y - 5, SE.teal);
  R.disco(x, y - 6, 7.6, SE.ink); R.disco(x, y - 6, 6.8, (X, Y, d) => Y > y - 6 ? SE.ink : f_tono([SE.chapaS, SE.chapa, SE.chapaL, SE.blanco], 2.4 - (X - x + 3) * 0.14 - d * 0.9, X, Y));
  R.rect(x - 8, y - 6, x + 8, y - 6, SE.tealL);
  const parp = (t % 3.1) < 0.12, vx = x + (dir > 0 ? 2 : -6);
  R.rect(vx, y - 11, vx + 4, y - 8, SE.ink); if (!parp) { R.pset(vx + (dir > 0 ? 3 : 1), y - 10, SE.tealL); R.pset(vx + (dir > 0 ? 2 : 2), y - 10, SE.tealL); }
  const ax = x - 3 * dir, sw = Math.round(Math.sin(t * 7) * (anda ? 1.5 : 0.5)); R.linea(ax, y - 13, ax + sw - dir, y - 18, SE.ink); R.pset(ax + sw - dir, y - 19, Math.sin(t * 5) > 0 ? SE.rojo : SE.rojoD);
  if (anda) for (let k = 0; k < 4; k++) { const p = (t * 1.6 + k / 4) % 1, px = Math.round(x - dir * (11 + p * 10)), py = Math.round(suelo - 1 - p * 4); if (f_b4(px, py) < 1 - p) R.pset(px, py, SE.chapaL); }
  return { x, y: y - 19 };
}

// ·· la nave: el armario de las escobas ··
function f_armario(R, t, o) {
  const { rect, pset, linea, disco } = R, capa = f_capa(R, 'si-armario', () => f_armarioFijo(R)), ac = Math.max(0, Math.min(1, o.acople ?? 0));
  R.copiar(capa);
  // la ventanilla: el espacio y, con o.acople, la nave alienígena que llega, se acopla y suelta a sus pasajeros
  const PX = 212, PY = 76, PR = 13;
  f_ojoBuey(R, t, PX, PY, PR, 7 * (1 - ac), { planeta: false });
  if (ac > 0) {
    const u = Math.min(1, ac / 0.6), sx = Math.round(lerp(250, 222, u)), sy = Math.round(lerp(70, 77, u) + (ac < 0.6 ? Math.sin(t * 3) : 0)), s = lerp(0.5, 1, u);
    if (ac > 0.55) { const L = Math.round((ac - 0.55) / 0.2 * 20), x1 = sx - Math.round(10 * s); for (let x = Math.max(PX - 14, x1 - Math.min(L, 22)); x <= x1; x++) for (let y = sy - 2; y <= sy + 2; y++) pset(x, y, (x % 3 === 0) ? SE.malvaD : y === sy - 2 ? SE.malvaL : SE.malva); }
    disco(sx, sy - 3 * s, 4 * s, (X, Y) => Y < sy - 3 * s - 1 ? SE.acidoL : SE.acido);
    for (let i = -Math.round(13 * s); i <= Math.round(13 * s); i++) { const hh = Math.round((1 - (i / (13 * s)) ** 2) * 3 * s) + 1; for (let j = -hh; j <= hh; j++) pset(sx + i, sy + j, j < -hh / 2 ? SE.malvaL : j > hh / 2 ? SE.malvaD : SE.malva); }
    for (let k = 0; k < 5; k++) { const i = Math.round((k - 2) * 5 * s); pset(sx + i, sy, (Math.floor(t * 6) + k) % 3 === 0 ? SE.acidoL : SE.amarillo); }
    if (ac > 0.75) for (let k = 0; k < 3; k++) { const x = sx - 12 - Math.round(((t * 5 + k * 7) % 22)); if (x > PX - 13) { pset(x, sy, SE.acido); pset(x, sy - 1, SE.malvaL); pset(x, sy + 1, SE.malvaD); pset(x - 1, sy + 1, SE.malvaD); } }
    for (let j = -PR - 7; j <= PR + 7; j++) for (let i = -PR - 7; i <= PR + 7; i++) if (i * i + j * j > PR * PR) { const x = PX + i, y = PY + j; if (x >= 0 && x < 320 && y >= 0 && y < 180) pset(x, y, capa[y * 320 + x]); }
  }
  // la bombilla que se mece y su luz cálida sobre el fondo del armario y el suelo
  const bx = Math.round(150 + Math.sin(t * 1.2) * 3), by = 46;
  linea(150, 36, bx, by - 3, SE.ink);
  for (let y = by + 2; y <= 150; y++) { const w = 5 + (y - by) * 0.55; for (let x = Math.round(bx - w); x <= bx + w; x++) if (x > 68 && x < 232 && f_b4(x, y) < 0.42 * (1 - Math.abs(x - bx) / w)) pset(x, y, f_mezcla(R.pget(x, y), SE.calida, 0.22)); }
  R.halo(bx, by, 10, [f_mezcla(SE.calida, SE.techoD, 0.6), SE.calida], 0.9); rect(bx - 1, by - 3, bx + 1, by - 2, SE.chapaS); disco(bx, by, 2.6, SE.calidaL); pset(bx - 1, by - 1, SE.blanco);
  // el cubo boca abajo con el trapo doblado: la almohada
  if (o.almohada !== false) { const x = o.almohada ?? 120; for (let j = 0; j < 10; j++) { const w = 6 + Math.round(j * 0.25); for (let i = -w; i <= w; i++) pset(x + i, 141 + j, i === -w || i === w ? SE.ink : f_tono([SE.azulD, SE.azul, SE.azulL], 1.6 - i / w * 0.8, x + i, 141 + j)); } rect(x - 9, 149, x + 9, 150, SE.ink); rect(x - 8, 149, x + 8, 149, SE.azulD);
    for (let i = -6; i <= 6; i++) for (let j = 0; j < 3; j++) pset(x + i, 138 + j, j === 0 ? SE.blanco : (i + j) % 3 ? SE.rosa : f_mezcla(SE.rosa, SE.ink, 0.3)); }
  // la gotera: cae del tubo del techo a un cubo del pasillo
  { const p = (t / 1.5) % 1, y = Math.round(14 + p * p * 150); if (y < 158) { pset(276, y, SE.azulL); pset(276, y - 1, SE.vidrioCL); } else for (let k = 0; k < 4; k++) pset(276 + (k - 1.5) * 2, 157 - (k % 2), SE.azulL); }
  // el reloj de la pared: las tres en punto, con los dos puntos que parpadean
  R.numero(Math.floor(t * 2) % 2 ? '3:00' : '3 00', 260, 69, { color: SE.rojo, sombra: false });
  // el robotito que cruza el suelo del pasillo
  { const x = Math.round((t * 55) % 400) - 40, y = 172; rect(x, y - 3, x + 5, y - 1, SE.chapaD); rect(x, y - 3, x + 5, y - 3, SE.chapaL); pset(x + 5, y - 2, SE.rojo); pset(x + 1, y, SE.ink); pset(x + 4, y, SE.ink); pset(x + 2, y - 5 + (Math.floor(t * 8) % 2), SE.ink); }
  return { suelo: 150, armario: [66, 34, 234, 150], dormir: [104, 196], almohada: o.almohada ?? 120, ventanilla: [PX, PY, PR], bombilla: [bx, by], reloj: [254, 58, 300, 72] };
}

// lo fijo del armario (al búfer)
function f_armarioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y <= 12; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.techoD, SE.techo, SE.techoL], 1 + (f_ruido(x, y, 8, 3) - 0.5) * 0.7, x, y));
  rect(0, 9, 319, 12, SE.tealD); rect(0, 9, 319, 9, SE.teal); rect(272, 8, 280, 13, SE.chapaS); pset(276, 13, SE.azulL);
  // la pared del pasillo alrededor del armario
  [[0, 13, 57, 52], [0, 54, 57, 149], [243, 13, 319, 48], [243, 50, 319, 149], [58, 13, 242, 25]].forEach(([a, b, c, d], i) => f_chapa(R, a, b, c, d, 60 + i));
  // el cartelito con los pictogramas de la escoba y el cubo
  rect(132, 15, 168, 24, SE.ink); rect(133, 16, 167, 23, SE.teal); linea(140, 22, 146, 16, SE.blanco); for (let k = 0; k < 4; k++) linea(138 + k, 22, 137 + k, 23, SE.amarillo); poligono([[154, 17], [164, 17], [162, 23], [156, 23]], SE.blanco); R.anillo(159, 17, 3, SE.blanco);
  // la taquilla de emergencia con la manguera
  rect(8, 60, 44, 112, SE.ink); rect(9, 61, 43, 111, SE.rojoD); rect(12, 64, 40, 100, SE.ink); for (let y = 65; y <= 99; y++) for (let x = 13; x <= 39; x++) pset(x, y, f_tono([SE.esp2, SE.azulD], 0.6 + (x + y) % 9 / 9, x, y));
  for (let k = 0; k < 4; k++) R.anillo(26, 82, 6 + k * 2, k % 2 ? SE.rojo : SE.rojoL); disco(26, 82, 4, SE.chapaS); linea(14, 66, 22, 74, SE.blanco); rect(30, 104, 38, 107, SE.chapaL);
  // el reloj de pared (la carcasa; los números van vivos)
  rect(253, 57, 301, 73, SE.ink); rect(254, 58, 300, 72, hex('#200c0c')); rect(253, 74, 301, 75, SE.chapaD);
  // el marco del armario, la hoja de la puerta metida en la pared
  rect(48, 26, 252, 150, SE.ink); f_chapa(R, 50, 27, 59, 149, 70, [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL]); f_rayas(R, 56, 30, 59, 149);
  for (let y = 27; y <= 150; y++) for (let x = 60; x <= 240; x++) if (y < 34 || x < 66 || x > 234) pset(x, y, f_tono([SE.tealD, SE.teal, SE.tealL], x < 62 || y < 29 ? 2 : x > 238 ? 0 : 1, x, y));
  for (let y = 40; y < 150; y += 14) { pset(63, y, SE.remache); pset(237, y, SE.remache); }
  // dentro: el fondo de tablero perforado, en penumbra por los lados
  for (let y = 34; y <= 140; y++) for (let x = 66; x <= 234; x++) {
    const sombra = Math.min(1, Math.min(x - 66, 234 - x) / 26) * 0.8 + Math.min(1, (y - 34) / 20) * 0.3;
    let c = f_tono([SE.ink, SE.techoD, SE.techo, SE.techoL], 0.6 + sombra * 1.7 + (f_ruido(x, y, 10, 8) - 0.5) * 0.4, x, y);
    if (x % 5 === 0 && y % 5 === 0) c = SE.ink; R.pset(x, y, c);
  }
  // las paredes de los lados en perspectiva y el suelo del armario
  poligono([[66, 34], [74, 42], [74, 140], [66, 150]], SE.techoD); poligono([[234, 34], [226, 42], [226, 140], [234, 150]], SE.ink);
  for (let y = 140; y <= 150; y++) for (let x = 66; x <= 234; x++) if (x >= 66 + (150 - y) * 0.8 && x <= 234 - (150 - y) * 0.8) pset(x, y, f_tono([SE.sueloD, SE.sueloS, SE.suelo], 0.8 + (y - 140) / 10 + ((x >> 3) + (y >> 2)) % 2 * 0.3, x, y));
  // los estantes con sus escuadras
  for (const y of [62, 90]) { rect(76, y, 192, y + 3, SE.ink); rect(76, y, 192, y, SE.carton); rect(76, y + 1, 192, y + 2, SE.cartonS); for (const x of [82, 186]) { poligono([[x, y + 3], [x + 4, y + 3], [x, y + 9]], SE.chapaS); } }
  // estante de arriba: rollos de papel, cubos apilados, pulverizadores y la caja de jabón con burbujas
  for (let k = 0; k < 4; k++) { const x = 79 + k * 7; rect(x, 54, x + 5, 61, SE.ink); rect(x + 1, 55, x + 4, 61, SE.blanco); rect(x + 4, 55, x + 4, 61, SE.chapaL); rect(x + 2, 54, x + 3, 54, SE.chapaS); }
  for (let k = 0; k < 3; k++) { const y = 61 - k * 3; poligono([[110, y - 7], [126, y - 7], [124, y], [112, y]], k === 2 ? SE.azulL : SE.azul); linea(110, y - 7, 126, y - 7, SE.ink); } R.anillo(118, 46, 6, SE.chapaS);
  for (const [x, c] of [[132, SE.teal], [142, SE.rosa]]) { rect(x, 48, x + 6, 61, SE.ink); rect(x + 1, 50, x + 5, 61, c); rect(x + 1, 50, x + 2, 61, f_mezcla(c, SE.blanco, 0.4)); rect(x + 2, 44, x + 6, 47, SE.blanco); rect(x + 6, 46, x + 8, 47, SE.blanco); rect(x + 2, 54, x + 4, 57, SE.blanco); }
  rect(154, 44, 186, 61, SE.ink); rect(155, 45, 185, 61, SE.carton); rect(155, 45, 185, 46, SE.arenaL); rect(182, 45, 185, 61, SE.cartonS); for (const [x, y, r] of [[164, 53, 4], [173, 51, 3], [170, 57, 2], [178, 56, 2]]) { R.anillo(x, y, r, SE.blanco); pset(x - 1, y - 1, SE.blanco); }
  // estante de abajo: esponjas, garrafa, trapos doblados, caja de herramientas y cinta
  for (let k = 0; k < 3; k++) { const x = 79 + k * 8; rect(x, 84, x + 6, 89, SE.ink); rect(x + 1, 86, x + 5, 89, SE.amarillo); rect(x + 1, 85, x + 5, 85, SE.verde); }
  rect(105, 74, 117, 89, SE.ink); rect(106, 76, 116, 89, SE.rojo); rect(106, 76, 107, 89, SE.rojoL); rect(109, 72, 113, 75, SE.ink); R.anillo(117, 80, 3, SE.rojoD);
  for (let k = 0; k < 4; k++) { const y = 86 - k * 3; rect(122, y, 142, y + 2, SE.ink); rect(123, y, 141, y + 1, [SE.azulL, SE.amarillo, SE.rosa, SE.verde][k]); }
  rect(148, 78, 178, 89, SE.ink); rect(149, 79, 177, 89, SE.rojoD); rect(149, 79, 177, 81, SE.rojo); rect(159, 74, 167, 75, SE.ink); rect(158, 75, 159, 78, SE.ink); rect(167, 75, 168, 78, SE.ink); rect(162, 83, 164, 85, SE.chapaL);
  R.anillo(185, 85, 3, SE.ink); R.anillo(185, 85, 2, SE.chapaL);
  // la escoba y la fregona apoyadas a la izquierda
  linea(80, 146, 98, 66, SE.ink); linea(81, 146, 99, 66, SE.carton); linea(82, 146, 100, 66, SE.cartonS);
  for (let k = 0; k < 10; k++) linea(76 + k, 150, 79 + k * 0.4, 140, k % 3 ? SE.chapa : SE.chapaL);
  linea(90, 146, 104, 70, SE.ink); linea(91, 146, 105, 70, SE.amarillo); rect(85, 140, 99, 144, SE.ink); rect(86, 141, 98, 143, SE.naranja); for (let k = 0; k < 14; k++) linea(86 + k, 144, 85 + k + (k % 3 - 1), 149, SE.amarilloS);
  // el cubo de fregar con su escurridor y ruedas
  poligono([[194, 126], [226, 126], [223, 146], [197, 146]], SE.ink); poligono([[195, 127], [225, 127], [222, 145], [198, 145]], (x, y) => f_tono([SE.amarilloS, SE.amarillo, SE.calidaL], 1.6 - (x - 195) / 30, x, y));
  rect(196, 127, 224, 128, SE.azulD); rect(204, 116, 216, 127, SE.ink); rect(205, 117, 215, 126, SE.chapaS); for (let y = 118; y < 126; y += 2) rect(205, y, 215, y, SE.chapa); linea(215, 118, 228, 106, SE.ink);
  for (const x of [199, 221]) { disco(x, 148, 2, SE.ink); pset(x, 147, SE.chapaL); }
  f_aro(R, 212, 76, 13);
  // el umbral de aviso y el suelo del pasillo delante
  f_rayas(R, 48, 150, 252, 152);
  f_cubierta(R, 153, 179, { fuga: 60, luces: [150] });
  for (let x = 0; x < 320; x++) if (x < 48 || x > 252) { pset(x, 150, SE.ink); pset(x, 151, SE.sueloS); pset(x, 152, SE.sueloD); }
  // el felpudo delante del armario, el cono de suelo mojado con su pictograma y la caja de fusibles
  for (let y = 156; y <= 166; y++) for (let x = 96 + (166 - y); x <= 204 - (166 - y); x++) pset(x, y, y === 156 || y === 166 ? SE.ink : ((x + y) % 3 === 0 ? SE.verdeD : f_mezcla(SE.verdeD, SE.verde, 0.35)));
  poligono([[22, 176], [34, 176], [30, 156], [26, 156]], SE.ink); poligono([[23, 175], [33, 175], [29, 157], [27, 157]], (x, y) => f_tono([SE.amarilloS, SE.amarillo, SE.calidaL], 1.8 - (x - 23) / 8, x, y)); rect(20, 176, 36, 178, SE.ink); rect(21, 176, 35, 177, SE.amarilloS);
  pset(28, 164, SE.ink); pset(27, 166, SE.ink); pset(28, 165, SE.ink); pset(29, 167, SE.ink); pset(27, 169, SE.ink); pset(30, 169, SE.ink); rect(26, 170, 30, 170, SE.ink);
  rect(10, 116, 44, 142, SE.ink); f_chapa(R, 11, 117, 43, 141, 90, [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL]); for (let k = 0; k < 5; k++) { rect(15 + k * 6, 123, 18 + k * 6, 131, SE.ink); rect(16 + k * 6, k % 2 ? 124 : 128, 17 + k * 6, k % 2 ? 126 : 130, SE.blanco); } for (let k = 0; k < 3; k++) linea(14 + k * 8, 116, 14 + k * 8, 112 - k, SE.ink);
  // el cartelito del robot de limpieza a la derecha, y una tubería con su válvula
  rect(258, 86, 296, 118, SE.ink); rect(259, 87, 295, 117, SE.blanco); rect(259, 87, 295, 90, SE.teal); disco(277, 108, 8, SE.ink); disco(277, 108, 7, (x, y) => y > 108 ? SE.ink : SE.tealL); rect(270, 108, 284, 110, SE.ink); pset(280, 104, SE.ink); linea(274, 101, 272, 96, SE.ink); pset(272, 95, SE.rojo); for (let k = 0; k < 4; k++) pset(264 + k * 2, 113 - k, SE.chapaS);
  rect(306, 13, 310, 149, SE.ink); rect(307, 13, 309, 149, SE.chapaS); rect(307, 13, 307, 149, SE.chapaL); R.anillo(308, 126, 5, SE.rojo); linea(303, 126, 313, 126, SE.rojo);
  // el cubo de la gotera en el pasillo
  poligono([[268, 157], [284, 157], [282, 168], [270, 168]], SE.ink); poligono([[269, 158], [283, 158], [281, 167], [271, 167]], (x, y) => f_tono([SE.azulD, SE.azul, SE.azulL], 1.8 - (x - 269) / 10, x, y)); rect(270, 158, 282, 158, SE.vidrioCL);
}

// ·· el puente de mando ··
const f_PANOS = [[12, 21, 102, 87], [112, 21, 208, 87], [218, 21, 308, 87]];

function f_puente(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(f_capa(R, 'si-puente', () => f_puenteFijo(R)));
  // por el ventanal: estrellas que titilan, el planeta que gira con su anillo, la luna, un cometa y el astronauta
  for (const p of f_PANOS) {
    R.recorte(p);
    f_titilan(R, t, p[0], p[1], p[2], p[3], 14, p[0]);
    // el planeta (solo cae en el paño de la izquierda; el anillo se mete por detrás del montante)
    if (p[0] === 12) {
      const cx = 58, cy = 58, r = 26, PL = [SE.plan4, SE.plan3, SE.plan2, SE.plan1, SE.plan0];
      const anillo = (delante) => { for (let a = 0; a < Math.PI * 2; a += 0.01) { const s = Math.sin(a); if ((s > 0) !== delante) continue; for (let w = 0; w < 4; w++) { const x = Math.round(cx + Math.cos(a) * (44 - w * 2)), y = Math.round(cy + s * (9 - w * 0.5) - Math.cos(a) * 6); pset(x, y, w === 1 ? SE.plan0 : w === 3 ? SE.plan3 : SE.plan1); } } };
      anillo(false);
      disco(cx, cy, r, (x, y) => { const dx = x - cx, dy = y - cy, band = Math.sin(dy * 0.42 + Math.sin(dx * 0.12 + t * 0.5 + dy * 0.05) * 0.9) + (f_ruido(x + t * 2, y, 6, 2) - 0.5); return f_tono(PL, 1.2 + band * 0.7 + (1.5 - (dx + dy * 0.6) / r * 1.2), x, y); });
      for (let k = 0; k < 3; k++) { const a = t * 0.3 + k * 2.1, x = Math.round(cx + Math.cos(a) * 14), y = cy + 6 + k * 4; if (Math.cos(a) > -0.3) { pset(x, y, SE.plan4); pset(x + 1, y, SE.plan3); } }
      anillo(true);
    }
    if (p[0] === 112) { disco(160, 36, 7, (x, y) => f_tono([SE.chapaS, SE.chapa, SE.chapaL, SE.blanco], 3 - (x - 156 + y - 32) * 0.18, x, y)); pset(158, 38, SE.chapaS); pset(162, 34, SE.chapa); }
    { const u = ((t + 2) % 8) / 2.2; if (u < 1) { const x = Math.round(300 - u * 190), y = Math.round(26 + u * 34); for (let k = 0; k < 16; k++) if ((k + x) % 2 === 0 || k < 4) pset(x + k, y - Math.round(k * 0.18), k < 2 ? SE.blanco : k < 6 ? SE.tealL : SE.neb5); } }
    if (p[0] === 218) { const ax = Math.round(250 + Math.sin(t * 0.5) * 3), ay = Math.round(66 + Math.sin(t * 0.8) * 3); for (let s = 0; s <= 20; s++) { const u = s / 20; pset(Math.round(lerp(236, ax, u)), Math.round(lerp(22, ay - 4, u) + Math.sin(u * Math.PI) * 6), s % 2 ? SE.chapaS : SE.chapaL); }
      rect(ax - 2, ay - 3, ax + 2, ay + 2, SE.blanco); rect(ax + 2, ay - 3, ax + 2, ay + 2, SE.chapaL); disco(ax, ay - 5, 2.5, SE.blanco); pset(ax + 1, ay - 5, SE.amarillo); pset(ax, ay - 5, SE.amarilloS); pset(ax - 1, ay + 3, SE.blanco); pset(ax + 1, ay + 3, SE.blanco);
      const w = Math.round(Math.sin(t * 6) * 1.5); pset(ax + 3, ay - 3, SE.blanco); pset(ax + 4, ay - 5 + w, SE.blanco); pset(ax - 3, ay - 1, SE.blanco); }
    R.recorte(null);
    // el reflejo del cristal
    for (let k = 0; k < 2; k++) { const x0 = p[0] + 14 + k * 9; for (let q = 0; q < 40; q++) { const x = x0 + q, y = p[3] - q * 1.4; if (x <= p[2] && y >= p[1] && (q + k) % 2 === 0) pset(x, Math.round(y), f_mezcla(R.pget(x, Math.round(y)), SE.blanco, 0.18)); } }
  }
  // los monitores van por delante de lo que se ve por el ventanal
  { const capa = f_capa(R, 'si-puente', () => {}); for (const [x0, y0, x1, y1] of [[30, 68, 76, 99], [138, 70, 182, 96], [244, 68, 290, 98]]) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, capa[y * 320 + x]); }
  // el radar que barre, con su estela y los puntos que se encienden al pasar
  { const cx = 53, cy = 84, r = 11, a = t * 2.2; for (let k = 0; k < 14; k++) { const b = a - k * 0.08; linea(cx, cy, cx + Math.cos(b) * r, cy + Math.sin(b) * r, (x, y) => (k === 0 ? SE.fosforo : (x + y + k) % 2 ? null : k < 6 ? SE.verde : SE.verdeD)); }
    for (let i = 0; i < 4; i++) { const ba = h(i, 1, 13) * Math.PI * 2, d = 4 + h(i, 2, 13) * 6, dif = ((a - ba) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); if (dif < 2.5) { const x = Math.round(cx + Math.cos(ba) * d), y = Math.round(cy + Math.sin(ba) * d); pset(x, y, dif < 0.8 ? SE.blanco : SE.fosforo); } } }
  // las ondas: dos señales que se cruzan
  for (let x = 143; x <= 177; x++) { const y1 = Math.round(83 + Math.sin(x * 0.4 - t * 4) * 5), y2 = Math.round(83 + Math.sin(x * 0.23 + t * 3) * 3); pset(x, y1, SE.tealL); pset(x, y2, SE.amarillo); }
  // el mapa táctico: la ruta de puntos y la nave que avanza, y una cifra que cuenta
  { const u = (t * 0.12) % 1, x = Math.round(250 + u * 32), y = Math.round(90 - Math.sin(u * 3) * 12); for (let k = 0; k < 32; k += 3) pset(250 + k, Math.round(90 - Math.sin(k / 32 * 3) * 12), SE.amarilloS); rect(x - 1, y - 1, x + 1, y + 1, SE.amarillo); if (Math.floor(t * 3) % 2) pset(x, y, SE.blanco); disco(282, 78, 2, SE.rojo); }
  R.numero(String(1200 + Math.floor(t * 7) % 800), 146, 78, { color: SE.verde, sombra: false, fina: true });
  // los botones de la consola que se encienden a ratos
  for (let k = 0; k < 44; k++) { const x = 8 + (k % 22) * 14 + (k >= 22 ? 5 : 0), y = k >= 22 ? 101 : 98; if (x > 28 && x < 80 || x > 134 && x < 186 || x > 240 && x < 292) continue; const on = h(k, Math.floor(t * 1.8 + k * 0.29), 7) > 0.4; rect(x, y, x + 3, y + 1, on ? [SE.rojo, SE.verde, SE.amarillo, SE.azulL, SE.tealL][k % 5] : SE.chapaD); if (on) pset(x + 1, y, SE.blanco); }
  // la taza de café que humea
  for (let i = 0; i < 6; i++) { const p = (t * 0.5 + i / 6) % 1, x = Math.round(103 + Math.sin(p * 8 + i) * 2), y = Math.round(92 - p * 16); if (f_b4(x, y) < 0.8 - p) pset(x, y, f_mezcla(R.pget(x, y), SE.blanco, 0.5)); }
  // las luces de la tarima que corren en círculo
  for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2, x = Math.round(160 + Math.cos(a) * 76), y = Math.round(150 + Math.sin(a) * 11); if (y < 141) continue; pset(x, y, (k + Math.floor(t * 8)) % 7 === 0 ? SE.tealL : SE.tealD); }
  f_baliza(R, t, 240, 4, o.alarma ?? 0);
  return { suelo: 160, sillones: [[112, 152], [208, 152]], radar: [53, 84, 11], ondas: [142, 74, 178, 92], mapa: [248, 72, 286, 94], ventanal: [8, 16, 312, 93], planeta: [58, 58, 26], consola: [0, 94, 319, 124], libre: [130, 190] };
}

// lo fijo del puente (al búfer): techo, ventanal con el espacio, montantes, monitores, consola, tarima, sillones y suelo
function f_puenteFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y <= 15; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.techoD, SE.techo, SE.techoL], 0.8 + (f_ruido(x, y, 9, 21) - 0.5) * 0.6 + (x % 32 === 0 ? -0.8 : 0), x, y));
  rect(0, 12, 319, 13, SE.techoL); for (let x = 4; x < 320; x += 8) pset(x, 12, SE.tuboOff);
  f_cosmos(R, 8, 16, 312, 92, 2);
  // el marco del ventanal, los montantes con remaches y el alféizar
  for (let y = 14; y <= 93; y++) for (let x = 0; x < 320; x++) {
    const enPano = f_PANOS.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d); if (enPano) continue;
    const borde = f_PANOS.some(([a, b, c, d]) => x >= a - 1 && x <= c + 1 && y >= b - 1 && y <= d + 1);
    pset(x, y, borde ? SE.ink : f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL], 1.9 + (f_ruido(x, y, 6, 22) - 0.5) * 0.6 - (y < 21 ? 0 : ((x % 106) - 4) * 0.03), x, y));
  }
  for (const xm of [107, 213]) for (let y = 24; y < 88; y += 9) { pset(xm, y, SE.remache); pset(xm + 1, y + 1, SE.ink); }
  rect(0, 88, 319, 93, SE.chapaS); rect(0, 88, 319, 88, SE.chapaL); rect(0, 93, 319, 93, SE.ink);
  // los monitores sobre la consola: el radar, las ondas, el mapa táctico
  const monitor = (x0, y0, x1, y1) => { rect(x0, y0, x1, y1, SE.ink); f_chapa(R, x0 + 1, y0 + 1, x1 - 1, y1 - 1, x0, [SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL]); rect(x0 + (x1 - x0) / 2 - 3, y1, x0 + (x1 - x0) / 2 + 3, 96, SE.chapaD); };
  monitor(30, 68, 76, 99); disco(53, 84, 13, SE.ink); disco(53, 84, 12, (x, y) => hex('#0c2014')); for (const r of [4, 8, 12]) R.anillo(53, 84, r, SE.verdeD); linea(41, 84, 65, 84, SE.verdeD); linea(53, 72, 53, 96, SE.verdeD);
  monitor(138, 70, 182, 96); rect(142, 73, 178, 92, hex('#081a1e')); for (let x = 142; x <= 178; x += 6) for (let y = 73; y <= 92; y += 2) pset(x, y, SE.tealD); for (let y = 73; y <= 92; y += 5) for (let x = 142; x <= 178; x += 2) pset(x, y, SE.tealD);
  monitor(244, 68, 290, 98); rect(248, 72, 286, 94, hex('#10142a')); for (let y = 72; y <= 94; y++) for (let x = 248; x <= 286; x++) { if (x % 8 === 0 || y % 8 === 0) pset(x, y, SE.azulD); if (f_ruido(x, y, 8, 23) > 0.62) pset(x, y, (x + y) % 2 ? SE.neb3 : SE.azulD); }
  // la consola: la tapa inclinada con filas de botones y el frontal con rejillas, en todo el ancho
  for (let y = 94; y <= 124; y++) for (let x = 0; x < 320; x++) {
    let c = y < 104 ? f_tono([SE.chapaS, SE.chapa, SE.chapaL], 1.8 - (y - 94) * 0.08 + (f_ruido(x, y, 7, 24) - 0.5) * 0.5, x, y) : f_tono([SE.ink, SE.chapaD, SE.chapaS], 1.6 - (y - 104) * 0.05 + (f_ruido(x, y, 9, 25) - 0.5) * 0.5, x, y);
    if (y === 104) c = SE.chapaL; if (y === 105) c = SE.ink; if (y >= 108 && y <= 118 && (x % 40) > 10 && (x % 40) < 30 && y % 2 === 0) c = SE.ink; if (y === 124) c = SE.ink; if (x % 80 === 0 && y > 104) c = SE.ink;
    if (y > 94 && y < 104 && (x < 30 || x > 290) && (x + y) % 5 === 0) c = SE.chapaS;
    pset(x, y, c);
  }
  // la taza de café en la consola
  rect(99, 92, 106, 99, SE.ink); rect(100, 93, 105, 99, SE.blanco); rect(104, 93, 105, 99, SE.chapaL); R.anillo(107, 95, 2, SE.ink); rect(100, 93, 105, 93, SE.cartonS);
  // el suelo con la tarima redonda
  f_cubierta(R, 125, 179, { fuga: 60, luces: [53, 160, 267], paso: 36 });
  for (let y = 139; y <= 162; y++) for (let x = 84; x <= 236; x++) { const e = ((x - 160) / 76) ** 2 + ((y - 150) / 11) ** 2; if (e <= 1) pset(x, y, e > 0.86 ? SE.chapaL : f_tono([SE.sueloD, SE.sueloS, SE.suelo], 1.2 + (1 - e) * 0.6 + ((x + y) % 7 === 0 ? 0.5 : 0), x, y)); }
  // los dos sillones vistos de espaldas
  for (const cx of [112, 208]) {
    for (let i = -9; i <= 9; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2 === 0) pset(cx + i, 154 + j, SE.ink);
    rect(cx - 2, 140, cx + 2, 153, SE.ink); rect(cx - 1, 140, cx, 153, SE.chapaL); rect(cx - 7, 151, cx + 7, 154, SE.ink); rect(cx - 6, 152, cx + 6, 152, SE.chapa);
    rect(cx - 11, 133, cx + 11, 141, SE.ink); rect(cx - 10, 134, cx + 10, 140, SE.rojoD);
    for (const s of [-1, 1]) { rect(cx + s * 12 - 1, 128, cx + s * 12 + 1, 136, SE.ink); rect(cx + s * 12 - 1, 128, cx + s * 12 + 1, 128, SE.chapaL); pset(cx + s * 12, 130, SE.amarillo); }
    poligono([[cx - 9, 112], [cx + 9, 112], [cx + 10, 137], [cx - 10, 137]], SE.ink);
    poligono([[cx - 8, 113], [cx + 8, 113], [cx + 9, 136], [cx - 9, 136]], (x, y) => f_tono([SE.rojoD, f_mezcla(SE.rojo, SE.rojoD, 0.5), SE.rojo, SE.rojoL], 2.2 - (x - cx + 4) * 0.12 - (y - 113) * 0.02, x, y));
    for (let y = 118; y < 136; y += 6) for (let i = -6; i <= 6; i += 2) pset(cx + i, y, SE.rojoD); linea(cx, 114, cx, 135, SE.rojoD);
    rect(cx - 5, 106, cx + 5, 112, SE.ink); rect(cx - 4, 107, cx + 4, 111, SE.rojo); rect(cx - 4, 107, cx + 4, 107, SE.rojoL);
  }
}

// ·· la consola de radio de cerca ··
function f_radio(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(f_capa(R, 'si-radio', () => f_radioFijo(R)));
  f_ojoBuey(R, t, 44, 40, 13, 5, { planeta: false });
  const hb = o.habla ?? (0.35 + 0.25 * Math.sin(t * 1.3)), ruido = (k) => h(Math.floor(t * 12), k, 17);
  // el cono del altavoz que late con la voz
  const pul = Math.round(hb * ruido(1) * 2); R.anillo(44, 134, 15 + pul, SE.chapaD); R.anillo(44, 134, 9 + pul, SE.chapaS); disco(44, 134, 4 + pul * 0.5, SE.chapaD);
  for (let y = 108; y <= 162; y += 3) for (let x = 18; x <= 70; x += 3) { const d = Math.hypot(x - 44, y - 134); if (d < 25) pset(x, y, SE.ink); }
  // el dial: la aguja que busca la emisora
  const ax = Math.round(156 + Math.sin(t * 0.4) * 50 + Math.sin(t * 3.1) * 1.5); rect(ax, 107, ax, 123, SE.rojo); pset(ax, 106, SE.rojoL);
  // los vúmetros
  for (const [cx, k] of [[250, 2], [292, 3]]) { const a = -2.5 + Math.min(1, hb * (0.5 + ruido(k)) * 1.2) * 1.9; linea(cx, 125, Math.round(cx + Math.cos(a) * 14), Math.round(125 + Math.sin(a) * 14), SE.ink); disco(cx, 125, 2, SE.ink); }
  // los deslizadores de la tapa, las lucecitas y los interruptores de abajo
  for (let k = 0; k < 6; k++) { const x = 34 + k * 14, y = Math.round(80 + Math.sin(t * 0.7 + k * 1.3) * 3 + (k === 2 ? hb * 4 : 0)); rect(x - 3, y - 1, x + 3, y + 2, SE.ink); rect(x - 2, y, x + 2, y + 1, k % 2 ? SE.chapaL : SE.amarillo); }
  for (let k = 0; k < 10; k++) { const on = h(k, Math.floor(t * 2 + k * 0.4), 18) > 0.5; disco(238 + k * 7, 80, 1.6, on ? [SE.verde, SE.amarillo, SE.rojo][k % 3] : SE.chapaD); }
  // el piloto rojo del micro cuando se habla
  const enAire = hb > 0.5; disco(210, 89, 2, enAire ? SE.rojoL : SE.rojoD); if (enAire) R.halo(210, 89, 7, [SE.rojoD, SE.rojo], 0.9);
  rect(179, 40, 179, 52, enAire ? SE.rojo : SE.rojoD);
  return { micro: [186, 46], boton: [262, 152], dial: [92, 106, 222, 124], altavoz: [44, 134], bocadillos: [70, 16, 270, 62] };
}

// lo fijo de la consola de radio (al búfer)
function f_radioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // arriba: la pared de chapa tranquila, el haz de cables, el aro de la ventanilla y la tablilla con la lista
  for (let y = 0; y <= 8; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.techoD, SE.techo], 0.6 + f_ruido(x, y, 7, 31) * 0.6, x, y));
  for (let k = 0; k < 4; k++) rect(0, 4 + k, 319, 4 + k, [SE.rojoD, SE.azulD, SE.verdeD, SE.ink][k]); for (let x = 20; x < 320; x += 40) rect(x, 3, x + 2, 8, SE.chapaS);
  [[0, 9, 79, 66], [80, 9, 199, 66], [200, 9, 319, 66]].forEach(([a, b, c, d], i) => f_chapa(R, a, b, c, d, 80 + i, [SE.chapaD, SE.chapaS, SE.chapa, f_mezcla(SE.chapa, SE.chapaL, 0.5)]));
  f_aro(R, 44, 40, 13);
  rect(246, 48, 270, 66, SE.ink); rect(247, 49, 269, 66, SE.carton); rect(250, 50, 266, 66, SE.blanco); rect(254, 47, 262, 50, SE.chapaS); for (let y = 54; y < 66; y += 3) { rect(252, y, 263 - (y % 2) * 3, y, SE.chapaS); pset(264, y, SE.verde); }
  // la tapa inclinada de la consola
  for (let y = 67; y <= 96; y++) for (let x = 0; x < 320; x++) { let c = f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL], 1.4 + (y - 67) * 0.04 + (f_ruido(x, y, 8, 32) - 0.5) * 0.5, x, y); if (y === 67) c = SE.ink; if (y === 96) c = SE.chapaL; if (x % 106 === 0) c = SE.chapaD; pset(x, y, c); }
  for (let k = 0; k < 6; k++) { const x = 34 + k * 14; rect(x, 72, x, 90, SE.ink); pset(x + 1, 72, SE.chapaL); }
  for (let k = 0; k < 10; k++) disco(238 + k * 7, 80, 2.4, SE.ink);
  // el micro de cuello de cisne: la base pesada, el cuello anillado y la cápsula de rejilla
  disco(210, 91, 9, SE.ink); poligono([[201, 91], [219, 91], [217, 95], [203, 95]], SE.ink); for (let i = -8; i <= 8; i++) for (let j = -3; j <= 2; j++) if (i * i / 64 + j * j / 9 < 1) pset(210 + i, 91 + j, f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL], 2.4 - (i + j * 2) * 0.12, 210 + i, 91 + j));
  { let px = 210, py = 88; for (let s = 1; s <= 30; s++) { const u = s / 30, x = Math.round(210 - Math.sin(u * 1.9) * 26), y = Math.round(88 - u * 34 + Math.sin(u * 3) * 2); linea(px, py, x, y, SE.ink); pset(x + 1, y, s % 2 ? SE.chapaL : SE.chapaS); pset(x - 1, y, SE.ink); px = x; py = y; } }
  disco(186, 46, 8, SE.ink); disco(186, 46, 7, (x, y) => f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL], 2.6 - (x - 182 + y - 42) * 0.12 + ((x + y) % 2 ? -0.6 : 0), x, y)); rect(179, 40, 179, 52, SE.rojoD); pset(183, 42, SE.blanco); pset(184, 41, SE.blanco);
  // el frontal: chapa oscura con tornillos
  for (let y = 97; y <= 179; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.ink, SE.techoD, SE.techo, SE.techoL], 2 + (f_ruido(x, y, 10, 33) - 0.5) * 0.6 - (y - 97) / 140, x, y));
  rect(0, 97, 319, 97, SE.chapaS); for (const [x, y] of [[5, 102], [314, 102], [5, 174], [314, 174], [160, 174]]) { pset(x, y, SE.chapaL); pset(x + 1, y + 1, SE.ink); }
  // el altavoz con su rejilla
  rect(14, 104, 74, 164, SE.ink); for (let y = 105; y <= 163; y++) for (let x = 15; x <= 73; x++) pset(x, y, f_tono([SE.techoD, SE.chapaD, SE.chapaS], 1 + Math.max(0, 1 - Math.hypot(x - 44, y - 134) / 26) * 1.2, x, y)); rect(15, 105, 73, 105, SE.chapaS);
  // el dial: el cristal ámbar con la escala y los números
  rect(90, 104, 224, 126, SE.ink); for (let y = 105; y <= 125; y++) for (let x = 91; x <= 223; x++) pset(x, y, f_tono([hex('#3a2208'), hex('#6a4210'), hex('#a8701c'), hex('#d8a040')], 2.6 - Math.abs(y - 115) * 0.14 - Math.abs(x - 157) * 0.006, x, y));
  for (let x = 96; x <= 218; x += 4) rect(x, 106, x, x % 12 === 0 ? 111 : 108, SE.ink); for (let k = 1; k <= 9; k++) R.numero(String(k), 92 + k * 13, 123, { color: SE.ink, sombra: false, fina: true });
  linea(92, 105, 120, 105, f_mezcla(SE.calida, SE.blanco, 0.5));
  // los dos vúmetros: la esfera crema con la zona roja
  for (const cx of [250, 292]) { rect(cx - 18, 104, cx + 18, 128, SE.ink); for (let y = 105; y <= 127; y++) for (let x = cx - 17; x <= cx + 17; x++) pset(x, y, f_tono([SE.carton, SE.arenaL, SE.arenaB], 2.2 - (y - 105) * 0.04, x, y));
    for (let a = -2.5; a <= -0.6; a += 0.08) { const x = Math.round(cx + Math.cos(a) * 15), y = Math.round(125 + Math.sin(a) * 15); pset(x, y, a > -1.0 ? SE.rojo : SE.ink); if (Math.round(a * 25) % 5 === 0) pset(Math.round(cx + Math.cos(a) * 13), Math.round(125 + Math.sin(a) * 13), SE.ink); } }
  // los cinco mandos con sus estrías y el piloto de cada uno
  for (let k = 0; k < 5; k++) { const x = 100 + k * 28, y = 142; for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) if (i * i + j * j < 110 && (i * i + j * j > 90) && (i + j) % 2 === 0) pset(x + i, y + j, SE.chapaD);
    disco(x, y, 8.5, SE.ink); disco(x, y, 7.5, (X, Y) => f_tono([SE.ink, SE.techo, SE.chapaD, SE.chapaS, SE.chapaL], 2.6 - (X - x + Y - y) * 0.18 + ((Math.round(Math.atan2(Y - y, X - x) * 4) % 2) ? -0.4 : 0), X, Y));
    const a = -2.2 + h(k, 3, 19) * 2.6; linea(x, y, x + Math.cos(a) * 6, y + Math.sin(a) * 6, SE.blanco); disco(x, y + 13, 1.2, SE.verdeD); }
  // los interruptores de palanca y el botón rojo de hablar con su guarda
  for (let k = 0; k < 9; k++) { const x = 98 + k * 14; rect(x - 3, 160, x + 3, 170, SE.ink); rect(x - 2, 161, x + 2, 169, SE.chapaD); const arriba = h(k, 4, 19) > 0.4; linea(x, 165, x, arriba ? 160 : 170, SE.chapaL); pset(x, arriba ? 159 : 171, SE.blanco); pset(x, 174, [SE.rojo, SE.verde, SE.amarillo][k % 3]); }
  disco(262, 152, 15, SE.ink); disco(262, 152, 14, SE.chapaS); R.anillo(262, 152, 13, SE.amarillo); R.anillo(262, 152, 12, SE.ink);
  disco(262, 152, 10, (x, y) => f_tono([SE.rojoD, SE.rojo, SE.rojoL, SE.blanco], 2.4 - (x - 258 + y - 148) * 0.13, x, y)); pset(258, 147, SE.blanco);
  for (const [x, y] of [[232, 136], [232, 168], [300, 136], [300, 168]]) { disco(x, y, 2, SE.chapaS); pset(x, y, SE.ink); }
}

// ·· el planeta desértico ··
function f_desierto(R, t, o, cerca) {
  const { pset, disco } = R, hor = cerca ? 112 : 92, clave = 'si-desierto' + (cerca ? 'C' : 'G');
  R.copiar(f_capa(R, clave, () => f_desiertoFijo(R, cerca)));
  // los dos soles (el grande late un poco) y su resplandor
  const [s1, s2] = cerca ? [[150, 34], [178, 52]] : [[196, 30], [228, 48]];
  R.halo(s1[0], s1[1], 20 + Math.sin(t * 1.3), [SE.cieloD3, SE.cieloD4, SE.cieloD5], 1.1); disco(s1[0], s1[1], 9, SE.cieloD5); disco(s1[0], s1[1], 7.5, SE.arenaB); disco(s1[0] - 2, s1[1] - 2, 3, SE.blanco);
  R.halo(s2[0], s2[1], 11, [SE.cieloD3, SE.naranja], 1); disco(s2[0], s2[1], 5, SE.naranja); disco(s2[0] - 1, s2[1] - 1, 3, SE.amarillo);
  // nubes de tres tonos a tres velocidades
  for (let k = 0; k < 7; k++) { const capa = k % 3, v = [1.2, 2.6, 4.4][capa], w = [10, 16, 24][capa], y = [20, 36, 52][capa] + Math.round(h(k, 2, 40) * 8) - (cerca ? 0 : 0), x = ((h(k, 1, 40) * 420 + t * v) % 420) - 50; f_nubeD(R, x, y, w, capa); }
  // bichos voladores de alas largas
  for (let k = 0; k < 3; k++) { const x = Math.round(((h(k, 3, 41) * 360 - t * (8 + k * 3)) % 360 + 360) % 360 - 20), y = Math.round(44 + k * 9 + Math.sin(t * 1.5 + k) * 3), f = Math.sin(t * 8 + k * 2) > 0; if (x > 268 && y < 48) continue;
    pset(x, y, SE.mesaS); pset(x + 1, y, SE.mesaS); pset(x - 1, y + (f ? -1 : 1), SE.mesaS); pset(x - 2, y + (f ? -2 : 1), SE.mesaS); pset(x + 2, y + (f ? -1 : 1), SE.mesaS); pset(x + 3, y + (f ? -2 : 1), SE.mesaS); pset(x + 2, y, SE.naranja); }
  // la nave aterrizada y, con o.explosion, su final de cuento
  const nx = cerca ? 84 : 226, ny = cerca ? 106 : 110, ns = cerca ? 0.55 : 1, ex = o.explosion ?? 0;
  f_naveTierra(R, t, nx, ny, ns, ex);
  if (ex > 0) f_explosion(R, t, nx, ny - 12 * ns, ns, ex, cerca ? 132 : 150);
  // las plantas alienígenas que se mecen y la arena que vuela
  const plantas = cerca ? [[20, 150], [118, 128], [214, 140], [300, 168]] : [[30, 134], [146, 128], [184, 158], [282, 146], [306, 170]];
  for (const [x, y] of plantas) { const m = Math.sin(t * 1.8 + x) * 1.5; for (let k = -2; k <= 2; k++) R.linea(x, y, Math.round(x + k * 3 + m), y - 7 - (2 - Math.abs(k)) * 2, SE.verdeD); disco(Math.round(x + m), y - 9, 2.5, SE.rosa); pset(Math.round(x + m) - 1, y - 10, SE.blanco); }
  for (let k = 0; k < 18; k++) { const y = hor + 30 + Math.round(h(k, 5, 42) * (150 - hor)), x = Math.round(((h(k, 4, 42) * 400 + t * (30 + k * 2)) % 400) - 40); if (y > 179) continue; for (let q = 0; q < 6; q++) if ((q + k) % 2 === 0) pset(x + q, y, f_mezcla(R.pget(x + q, y), SE.arenaB, 0.55)); }
  // un lagarto que cruza deprisa
  { const u = (t * 0.22 + 0.3) % 1, x = Math.round(340 - u * 380), y = cerca ? 170 : 168, p = Math.floor(t * 12) % 2; R.rect(x, y - 1, x + 6, y, SE.verdeD); pset(x - 1, y - 1, SE.verdeD); pset(x + 7, y, SE.verdeD); pset(x + 8, y + (p ? 0 : -1), SE.verdeD); pset(x + 1, y + 1, SE.ink); pset(x + 5, y + (p ? 1 : 0), SE.ink); pset(x, y - 2, SE.amarillo); }
  return { suelo: cerca ? 158 : 150, horizonte: hor, soles: [s1, s2], nave: [nx, ny, ns], explosion: [nx, ny - 12 * ns], roca: cerca ? [272, 100] : [66, 100], libre: cerca ? [110, 230] : [30, 180] };
}

// una nube del cielo del desierto (capa 0 lejana y pequeña, 2 cercana): sombra abajo, cuerpo y luz arriba
function f_nubeD(R, x, y, w, capa) {
  const P = capa === 0 ? [SE.cieloD3, SE.nubeD3, SE.nubeD2] : [SE.nubeD3, SE.nubeD2, SE.nubeD1];
  for (let k = 0; k < 4; k++) { const cx = x + (k - 1.5) * w * 0.42, r = w * (k === 1 || k === 2 ? 0.36 : 0.26); R.disco(cx, y + 1, r, P[0]); }
  for (let k = 0; k < 4; k++) { const cx = x + (k - 1.5) * w * 0.42, r = w * (k === 1 || k === 2 ? 0.34 : 0.24); R.disco(cx, y, r, (X, Y) => f_tono(P, 2.3 - (Y - (y - r)) / r * 1.3, X, Y)); }
}

// lo fijo del desierto (al búfer): cielo tramado, el planeta pálido, las mesetas con su arco, las dunas, las setas de roca
// y el primer término de arena con ondas, guijarros y (en general) las huellas
function f_desiertoFijo(R, cerca) {
  const { pset, rect, poligono, disco } = R, hor = cerca ? 112 : 92, P = [SE.cieloD0, SE.cieloD1, SE.cieloD2, SE.cieloD3, SE.cieloD4, SE.cieloD5];
  for (let y = 0; y <= hor; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono(P, Math.pow(y / hor, 0.85) * 5 + (f_ruido(x, y, 30, 43) - 0.5) * 0.6, x, y));
  // el planeta pálido con su anillo
  { const cx = cerca ? 40 : 66, cy = cerca ? 40 : 34, r = 12; disco(cx, cy, r, (x, y) => f_tono([SE.cieloD1, SE.neb4, SE.cieloD2, SE.nubeD2], 2.1 - (x - cx + y - cy) * 0.1 + Math.sin((y - cy) * 0.8) * 0.4, x, y)); for (let a = 0; a < 6.28; a += 0.02) { if (Math.sin(a) < 0 && Math.hypot(Math.cos(a) * 21, Math.sin(a) * 4) < 30) { const X = Math.round(cx + Math.cos(a) * 21), Y = Math.round(cy + Math.sin(a) * 4 - Math.cos(a) * 3); if (Math.hypot(X - cx, Y - cy) < r) continue; } pset(Math.round(cx + Math.cos(a) * 21), Math.round(cy + Math.sin(a) * 4 - Math.cos(a) * 3), SE.nubeD2); } }
  // las mesetas lejanas en dos términos, con estratos y un arco natural
  const meseta = (x0, x1, top, base, c, cs, cl) => { poligono([[x0, base], [x0 + 6, top + 4], [x0 + 10, top], [x1 - 10, top], [x1 - 6, top + 4], [x1, base]], c); poligono([[x1 - 14, top], [x1 - 6, top + 4], [x1, base], [x1 - 24, base]], cs); rect(x0 + 10, top, x1 - 12, top, cl); for (let y = top + 4; y < base; y += 4) for (let x = x0 + 8; x < x1 - 8; x++) if ((x * 3 + y) % 11 < 6) pset(x, y, cs); };
  meseta(-20, 70, hor - 22, hor, SE.mesaF, SE.mesaFS, SE.nubeD2); meseta(150, 230, hor - 18, hor, SE.mesaF, SE.mesaFS, SE.nubeD2); meseta(240, 340, hor - 26, hor, SE.mesaF, SE.mesaFS, SE.nubeD2);
  meseta(50, 150, hor - 14, hor + 2, SE.mesa, SE.mesaS, SE.mesaL); meseta(200, 290, hor - 10, hor + 2, SE.mesa, SE.mesaS, SE.mesaL);
  { const ax = cerca ? 120 : 98, ay = hor - 10; disco(ax, ay + 6, 8, (x, y) => (x + y) % 3 ? f_tono(P, Math.pow(y / hor, 0.85) * 5, x, y) : SE.mesaS); }
  // las dunas con su lado al sol y su lado en sombra, y las ondas del viento
  const A = [SE.arenaD, SE.arenaS, SE.arena, SE.arenaL, SE.arenaB];
  for (let y = hor + 1; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d1 = hor + 10 + Math.sin(x * 0.025 + 1) * 8, d2 = hor + 28 + Math.sin(x * 0.018 + 3) * 10, d3 = hor + 52 + Math.sin(x * 0.012) * 8;
    const capa = y > d3 ? 3 : y > d2 ? 2 : y > d1 ? 1 : 0, base = [d1 - 12, d1, d2, d3][capa], pend = Math.cos(x * [0.03, 0.025, 0.018, 0.012][capa] + [0, 1, 3, 0][capa]);
    let v = 1.7 + capa * 0.25 + pend * 0.7 - Math.min(1, (y - base) / 30) * 0.4;
    if (y - base < 2 && capa > 0) v += 0.9;
    const ond = Math.sin(x * 0.12 + y * 0.9 + Math.sin(x * 0.04) * 2); if (ond > 0.86) v -= 0.8; else if (ond < -0.9) v += 0.5;
    if (h(x, y, 44) > 0.985) v -= 1;
    pset(x, y, f_tono(A, v, x, y));
  }
  // guijarros y piedras con sombra
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 45) * 320), y = hor + 16 + Math.round(h(k, 2, 45) ** 0.7 * (178 - hor - 16)), s = 1 + Math.round((y - hor) / 40); R.rect(x, y, x + s + 1, y + 1, SE.arenaD); R.rect(x, y - s, x + s, y, SE.mesaS); pset(x, y - s, SE.mesaL); }
  // las rocas con forma de seta: el pie estrecho y el sombrero ancho con estratos y sombra
  const seta = (cx, top, base, w, pw) => {
    for (let i = -w - 3; i <= w + 3; i++) for (let j = 0; j < 3; j++) if ((i + j) % 2 === 0) pset(cx + i + 6, base + j, SE.arenaD);
    poligono([[cx - pw, top + 10], [cx + pw, top + 10], [cx + pw * 0.8 + 3, base], [cx - pw * 0.8 - 3, base]], (x, y) => f_tono([SE.mesaS, SE.mesa, SE.mesaL], 1.9 - (x - cx) / pw * 0.9 + ((y * 2 + x) % 9 < 2 ? -0.7 : 0), x, y));
    for (let i = -w; i <= w; i++) { const hh = Math.round(Math.sqrt(1 - (i / w) ** 2) * 9); for (let j = -hh; j <= 4; j++) pset(cx + i, top + 6 + j, j > 2 ? SE.mesaS : f_tono([SE.mesaS, SE.mesa, SE.mesaL, SE.nubeD1], 2.2 - i / w * 0.9 - (j + hh) * 0.08 + ((j * 3 + i) % 11 === 0 ? -0.8 : 0), cx + i, top + 6 + j)); }
    for (let i = -w + 2; i <= w - 2; i++) pset(cx + i, top + 11, SE.mesaS);
  };
  if (cerca) { seta(272, 70, 152, 40, 16); seta(26, 104, 136, 18, 6); }
  else { seta(66, 86, 132, 26, 9); seta(292, 104, 130, 16, 6); }
  // el primer término: piedras grandes en las esquinas
  poligono(cerca ? [[0, 180], [0, 160], [14, 154], [30, 158], [40, 180]] : [[0, 180], [0, 166], [18, 160], [36, 164], [48, 180]], (x, y) => f_tono([SE.mesaS, SE.mesa, SE.mesaL], 2 - (x / 40) - (y - 160) * 0.04 + ((x + y * 2) % 7 === 0 ? -0.6 : 0), x, y));
  poligono([[280, 180], [292, 166], [310, 162], [320, 166], [320, 180]], (x, y) => f_tono([SE.mesaS, SE.mesa, SE.mesaL], 2.2 - (x - 280) / 30 + ((x + y * 2) % 7 === 0 ? -0.6 : 0), x, y));
  // las huellas de las botas que llegan hasta donde barre el conserje
  if (!cerca) for (let k = 0; k < 9; k++) { const x = 6 + k * 11, y = 160 - Math.round(k * 0.6) + (k % 2 ? 3 : 0); R.rect(x, y, x + 3, y + 1, SE.arenaD); pset(x, y - 1, SE.arenaS); pset(x + 4, y, SE.arenaS); }
}

// la nave aterrizada (s = escala): casco redondo con su cúpula, ojos de buey encendidos, aletas, patas, rampa y antena;
// con la explosión tiembla al principio y, pasado el destello, solo quedan la pata y la antena dobladas humeando
function f_naveTierra(R, t, cx, base, s, ex) {
  const { pset, linea, disco, poligono } = R, S = (v) => Math.round(v * s);
  for (let i = -S(34); i <= S(34); i++) for (let j = 0; j < S(4) + 1; j++) if ((i + j) % 2 === 0 && (i / S(34)) ** 2 + (j / (S(4) + 1)) ** 2 < 1) pset(cx + i, base + j, ex > 0.15 ? SE.ink : SE.arenaD);
  if (ex > 0.16) { linea(cx - S(16), base, cx - S(12), base - S(8), SE.ink); linea(cx - S(12), base - S(8), cx - S(4), base - S(10), SE.chapaS); linea(cx + S(10), base, cx + S(14), base - S(12), SE.chapaD); pset(cx + S(14), base - S(13), SE.rojo); return; }
  const tb = ex > 0 ? Math.round(Math.sin(t * 60) * 2 * ex / 0.15) : 0, x = cx + tb, y = base - S(12);
  for (const sx of [-1, 1]) { linea(x + sx * S(14), y + S(4), x + sx * S(22), base, SE.ink); linea(x + sx * S(14) + 1, y + S(4), x + sx * S(22) + 1, base, SE.chapaS); R.rect(x + sx * S(22) - S(3), base - 1, x + sx * S(22) + S(3), base, SE.chapaD); }
  poligono([[x - S(24), y + S(2)], [x - S(16), base - 1], [x - S(8), base - 1], [x - S(12), y + S(4)]], SE.chapaD);
  for (let i = -S(30); i <= S(30); i++) { const hh = Math.round(Math.sqrt(1 - (i / S(30)) ** 2) * S(9)); for (let j = -hh; j <= Math.round(hh * 0.6); j++) pset(x + i, y + j, j === -hh || j === Math.round(hh * 0.6) ? SE.ink : f_tono([SE.chapaD, SE.chapaS, SE.chapa, SE.chapaL, SE.blanco], 2.6 - (j + hh) * 0.14 - (i / S(30)) * 0.7, x + i, y + j)); }
  for (let i = -S(28); i <= S(28); i++) pset(x + i, y + S(1), SE.rojo);
  poligono([[x + S(20), y - S(4)], [x + S(34), y - S(14)], [x + S(32), y + S(2)]], SE.rojoD); poligono([[x + S(21), y - S(4)], [x + S(32), y - S(12)], [x + S(31), y - S(2)]], SE.rojo);
  disco(x - S(6), y - S(7), S(8), (X, Y) => Y > y - S(5) ? SE.chapaD : f_tono([SE.vidrioCD, SE.vidrioC, SE.vidrioCL], 2.2 - (X - x + S(10) + Y - y) * 0.12 / s, X, Y)); pset(x - S(9), y - S(11), SE.blanco);
  for (let k = 0; k < 4; k++) { const px = x - S(16) + k * S(10); disco(px, y - S(2), Math.max(1, S(2)), (Math.floor(t * 2) + k) % 5 ? SE.amarillo : SE.calidaL); }
  linea(x + S(8), y - S(8), x + S(12), y - S(18), SE.ink); disco(x + S(12), y - S(19), Math.max(1, S(1.5)), Math.sin(t * 4) > 0 ? SE.rojoL : SE.rojoD);
  if (Math.sin(t * 3) > 0) for (let k = 0; k < 3; k++) pset(x - S(31) - k, y + (k % 2), SE.naranja);
}

// la explosión de cuento (u 0–1): destello que crece y se apaga, cinco fuegos artificiales de colores que caen, piezas
// que saltan en arco (una tuerca, un engranaje, una aleta, una taza) y un humo gordo que sube y se va; tiñe la escena
function f_explosion(R, t, cx, cy, s, u, suelo) {
  const { pset, disco, linea } = R, S = (v) => v * s, COL = [hex('#ff3a8a'), hex('#3ae0ff'), hex('#ffe83a'), hex('#4aff5a'), hex('#ff6a1a')];
  if (u < 0.16) { for (let k = 0; k < 6; k++) if (h(k, Math.floor(t * 20), 46) > 0.5) pset(Math.round(cx + (h(k, 1, Math.floor(t * 20)) - 0.5) * S(50)), Math.round(cy + (h(k, 2, Math.floor(t * 20)) - 0.5) * S(14)), k % 2 ? SE.amarillo : SE.blanco); return; }
  const fl = Math.min(1, (u - 0.14) / 0.05) * Math.max(0, 1 - (u - 0.19) / 0.22);
  if (fl > 0) { f_tinte(R, 0, 0, 319, 179, SE.calidaL, fl * 0.42); const r = S(10 + fl * 26);
    for (let j = -Math.ceil(r * 1.6); j <= r * 1.6; j++) for (let i = -Math.ceil(r * 1.6); i <= r * 1.6; i++) { const x = Math.round(cx + i), y = Math.round(cy + j), a = Math.atan2(j, i), rr = r * (1 + 0.45 * Math.max(0, Math.sin(a * 8 + t * 3))), d = Math.hypot(i, j) / rr; if (d > 1 || y < 16 || (x > 276 && y < 46)) continue;
      if (d > 0.82 && f_b4(x, y) > 0.5) continue; pset(x, y, d > 0.82 ? SE.naranja : d > 0.6 ? SE.amarillo : d > 0.35 ? SE.calidaL : SE.blanco); } }
  // el humo gordo
  for (let k = 0; k < 9; k++) { const p = Math.max(0, Math.min(1, (u - 0.2) / 0.8)), x = cx + S((h(k, 1, 47) - 0.5) * 40 - p * 30 * h(k, 3, 47)), y = cy - S(p * (50 + k * 6)) + S(6), r = S(5 + p * 9 + k % 3 * 2); if (p <= 0 || y < 18) continue;
    disco(x, y + 1, r, SE.nubeD3); disco(x - r * 0.2, y - r * 0.2, r * 0.8, (X, Y) => f_tono([SE.nubeD3, SE.chapa, SE.nubeD2], 1.8 - (Y - y + r) / r, X, Y)); }
  // los fuegos artificiales
  for (let b = 0; b < 5; b++) { const ub = 0.18 + b * 0.11, p = (u - ub) / 0.32; if (p < 0 || p > 1) continue;
    const bx = cx + S((h(b, 1, 48) - 0.5) * 100), by = Math.max(54, cy - S(28 + h(b, 2, 48) * 36)), r = S(8 + Math.sqrt(p) * 30), c = COL[b % 5], cl = f_mezcla(c, SE.blanco, 0.5);
    if (p < 0.12) R.disco(bx, by, S(4) * (1 - p * 6), SE.blanco);
    for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI * 2 + b, cae = p * p * S(18);
      for (let q = 0; q < 4; q++) { const rq = r * (1 - q * 0.09), x = Math.round(bx + Math.cos(a) * rq), y = Math.round(by + Math.sin(a) * rq * 0.9 + cae * (1 - q * 0.15)); if (y < 16 || (x > 272 && y < 48)) continue; if (q === 0 ? p < 0.9 || (k + Math.floor(t * 12)) % 2 : f_b4(x, y) < 1 - p - q * 0.12) { if (q === 0) { pset(x, y, p < 0.2 ? SE.blanco : cl); pset(x + 1, y, c); pset(x, y + 1, c); } else pset(x, y, c); } } } }
  // las piezas que saltan
  const piezas = [[-1.2, 1.1, 'tuerca'], [0.8, 1.3, 'engranaje'], [1.6, 0.9, 'aleta'], [-0.5, 1.6, 'taza'], [0.2, 1.4, 'tuerca']];
  piezas.forEach(([vx, vy, tipo], i) => { const p = Math.max(0, Math.min(1, (u - 0.16) / 0.5)); if (p <= 0) return; const x = Math.round(cx + S(vx * 70 * p)), y = Math.round(Math.min(suelo - 2, cy - S(vy * 90 * p) + S(160 * p * p))), a = t * 8 + i;
    if (tipo === 'tuerca') { R.rect(x - 1, y - 1, x + 1, y + 1, SE.chapaL); pset(x, y, SE.ink); }
    else if (tipo === 'engranaje') { disco(x, y, 2.5, SE.chapa); for (let k = 0; k < 6; k++) pset(Math.round(x + Math.cos(a + k) * 3.5), Math.round(y + Math.sin(a + k) * 3.5), SE.chapaS); pset(x, y, SE.ink); }
    else if (tipo === 'aleta') { linea(x - 3, y + 2, x + 3, y - 2, SE.rojo); linea(x - 2, y + 2, x + 3, y - 1, SE.rojoD); }
    else { R.rect(x - 2, y - 2, x + 1, y + 1, SE.blanco); pset(x + 2, y - 1, SE.blanco); pset(x - 2, y - 2, SE.azulL); } });
}

// ·· el asteroide: la sede de la empresa malvada ··
// el pictograma del mando con cuernos (s = tamaño del píxel): base redonda, palanca, bola con dos cuernos y un botón
function f_mandoCuernos(R, x, y, s, c, cs) {
  const P = ['...#.....#...', '...##...##...', '....##.##....', '.....###.....', '....#####....', '....#####....', '.....###.....', '......#......', '......#......', '......#......', '..#########..', '.###########.', '.###########.', '..#########..'];
  P.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, j < 3 ? cs : c); });
  R.rect(x + 3 * s, y + 11 * s, x + 4 * s - 1, y + 12 * s - 1, SE.rojo);
}

function f_asteroide(R, t, o) {
  const { pset, rect, disco, linea } = R;
  R.copiar(f_capa(R, 'si-asteroide', () => f_asteroideFijo(R)));
  f_titilan(R, t, 0, 16, 270, 70, 30, 7, (x, y) => y < 98 - Math.abs(x - 160) * 0.05 && !(x > 136 && x < 220 && y > 44) && !(x > 222 && x < 274 && y > 36));
  // rocas que flotan despacio por encima
  for (let k = 0; k < 4; k++) { const x = Math.round(((h(k, 1, 60) * 280 + t * (2 + k)) % 280)), y = 20 + k * 6; disco(x, y, 2 + k % 2, SE.rocaS); pset(x - 1, y - 1, SE.rocaL); }
  // la cúpula: dentro, ejecutivos diminutos que van y vienen entre las mesas y las pantallas verdes
  const dentro = (x, y) => ((x - 84) / 30) ** 2 + ((y - 114) / 26) ** 2 < 0.86 && y < 113;
  R.recorte([62, 94, 106, 112]);
  for (let k = 0; k < 3; k++) { const fx = Math.round(82 + Math.sin(t * (0.5 + k * 0.2) + k * 2) * (10 + k * 3)); f_figura(R, fx, 111, t, [SE.ink, SE.malvaD, SE.chapaD][k], { alto: 9 }); }
  R.recorte(null);
  for (let k = 0; k < 4; k++) { const x = 66 + k * 11; if (dentro(x, 100)) { const on = Math.floor(t * 3 + k) % 4; R.rect(x, 101, x + 4, 103, on ? SE.acido : SE.acidoD); } }
  // las chimeneas echan humo morado
  for (const cx of [155, 181]) for (let i = 0; i < 9; i++) { const p = (t * 0.35 + i / 9 + cx * 0.01) % 1, x = Math.round(cx - p * 26 + Math.sin(p * 6 + i) * 2), y = Math.round(46 - p * 28), r = 1.5 + p * 4; if (y < 16 && x < 172) continue; disco(x, y, r, (X, Y) => f_b4(X, Y) < 1 - p * 0.7 ? f_tono([SE.malva, SE.rocaS, SE.rocaL, SE.malvaL], 2.2 - (Y - y + r) / r * 1.2, X, Y) : null); }
  // las ventanas de la fábrica que parpadean
  for (let k = 0; k < 18; k++) { const x = 146 + (k % 6) * 11, y = 80 + Math.floor(k / 6) * 10; rect(x, y, x + 5, y + 4, h(k, Math.floor(t * 0.8 + k * 0.17), 61) > 0.25 ? SE.acido : SE.acidoD); pset(x, y, SE.acidoL); }
  // el cartel: luces que corren alrededor del mando con cuernos
  for (let k = 0; k < 30; k++) { const per = 2 * (46 + 34), d = (k / 30) * per; let x, y; if (d < 46) { x = 226 + d; y = 38; } else if (d < 80) { x = 272; y = 38 + (d - 46); } else if (d < 126) { x = 272 - (d - 80); y = 72; } else { x = 226; y = 72 - (d - 126); } pset(Math.round(x), Math.round(y), (k + Math.floor(t * 10)) % 5 === 0 ? SE.amarillo : (k + Math.floor(t * 10)) % 5 === 1 ? SE.rojo : SE.malvaD); }
  // la antena con su luz, la parabólica que gira, las luces de la pista y el platillo
  disco(30, 44, 2, Math.sin(t * 3) > 0.3 ? SE.rojoL : SE.rojoD); if (Math.sin(t * 3) > 0.3) R.halo(30, 44, 6, [SE.rojoD, SE.rojo], 0.7);
  { const a = Math.sin(t * 0.6) * 0.9; linea(124, 106, 124, 98, SE.chapaS); for (let k = -6; k <= 6; k++) pset(Math.round(124 + Math.cos(a) * k), Math.round(96 + Math.abs(k) * 0.3 + Math.sin(a) * k * 0.3), SE.chapaL); linea(124, 96, Math.round(124 + Math.cos(a + 1.57) * 4), 92, SE.chapaD); }
  for (let k = 0; k < 6; k++) pset(276 + k * 8, 120, (k + Math.floor(t * 6)) % 6 === 0 ? SE.verde : SE.verdeD);
  for (let k = 0; k < 5; k++) pset(286 + k * 5, 110, (k + Math.floor(t * 4)) % 2 ? SE.acido : SE.amarillo);
  // el todoterreno lunar que va y viene por la pista de abajo
  { const u = (Math.sin(t * 0.3) + 1) / 2, x = Math.round(118 + u * 80), d = Math.cos(t * 0.3) > 0 ? 1 : -1, y = 126; rect(x - 7, y - 6, x + 7, y - 3, SE.ink); rect(x - 6, y - 5, x + 6, y - 4, SE.amarillo); rect(x - 2 * d - 2, y - 9, x - 2 * d + 2, y - 6, SE.vidrioC); for (const w of [-5, 0, 5]) { disco(x + w, y - 1, 1.8, SE.ink); pset(x + w + Math.round(Math.cos(t * 9 * d)), y - 1, SE.chapaL); } if (Math.sin(t * 5) > 0) pset(x + 7 * d, y - 5, SE.blanco); }
  // una estrella fugaz de vez en cuando
  { const u = (t % 6) / 0.6; if (u < 1) { const x = Math.round(20 + u * 90), y = Math.round(24 + u * 20); for (let k = 0; k < 8; k++) if (y - k * 0.2 > 16) pset(x - k, Math.round(y - k * 0.22), k < 2 ? SE.blanco : SE.estrellaD); } }
  const ab = o.abierta ?? 0; f_jaulaPartes(R, t, 214, 266, 116, 152, ab, 'fondo'); f_jaulaPartes(R, t, 214, 266, 116, 152, ab, 'delante');
  return { suelo: 152, jaula: [214, 116, 266, 152], puertaJaula: [248, 266], dentro: [218, 246], fuera: [270, 300], cupula: [84, 114], cartel: [226, 38, 272, 72], libre: [20, 205] };
}

// lo fijo del asteroide (al búfer): el espacio, el planeta lejano, el borde curvo del asteroide con cráteres y rocas, la
// cúpula (su armazón), la fábrica, las chimeneas, el cartel, la torre de antena, la pista con el platillo, las tuberías,
// el camino de rejilla del primer término
function f_asteroideFijo(R) {
  const { pset, rect, disco, linea, poligono } = R;
  f_cosmos(R, 0, 0, 319, 179, 5);
  disco(36, 58, 20, (x, y) => f_tono([SE.neb3, SE.neb5, SE.vidrioC, SE.vidrioCL], 2.4 - (x - 26 + y - 48) * 0.08 + Math.sin((y - 58) * 0.5 + x * 0.05) * 0.4, x, y));
  for (let a = 0; a < 6.28; a += 0.01) { const x = Math.round(36 + Math.cos(a) * 30), y = Math.round(58 + Math.sin(a) * 5 - Math.cos(a) * 4); if (Math.sin(a) > 0 || Math.hypot(x - 36, y - 58) > 20) pset(x, y, SE.estrellaA); }
  // el asteroide: un borde curvo con bultos y la superficie con cráteres, rocas y polvo
  const borde = (x) => 100 + ((x - 160) / 200) ** 2 * 26 + Math.round(f_ruido(x, 0, 14, 62) * 6);
  const ROC = [SE.rocaD, SE.rocaS, SE.roca, SE.rocaL];
  for (let x = 0; x < 320; x++) for (let y = borde(x); y < 180; y++) { let v = 2.2 - (y - borde(x)) * 0.012 + (f_ruido(x, y, 8, 63) - 0.5) * 0.9 + (f_ruido(x, y, 3, 64) - 0.5) * 0.4; if (y - borde(x) < 2) v += 0.8; pset(x, y, f_tono(ROC, v, x, y)); }
  const crater = (cx, cy, rx, ry) => { for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -rx - 1; i <= rx + 1; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1.25) continue; pset(cx + i, cy + j, e > 1 ? (j > 0 ? SE.rocaL : SE.rocaS) : f_tono(ROC, 1 + (j / ry) * 0.9 + (i / rx) * 0.3, cx + i, cy + j)); } };
  for (const [x, y, rx, ry] of [[40, 134, 12, 3], [178, 118, 7, 2], [250, 166, 26, 6], [130, 172, 16, 4], [300, 140, 10, 3], [20, 160, 8, 2], [96, 152, 6, 2]]) crater(x, y, rx, ry);
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 65) * 320), y = Math.round(borde(x) + 4 + h(k, 2, 65) * (176 - borde(x))), s = 1 + Math.round(h(k, 3, 65) * 3); disco(x, y, s, (X, Y) => f_tono(ROC, 2.6 - (X - x + Y - y) * 0.5, X, Y)); pset(x + s, y + 1, SE.rocaD); }
  // el camino de rejilla del primer término (donde se pisa)
  for (let y = 146; y <= 158; y++) for (let x = 0; x < 320; x++) { let c = y === 146 ? SE.chapaL : y === 158 ? SE.ink : ((x + (y >> 1)) % 4 === 0 || y % 4 === 0) ? SE.chapaD : SE.chapaS; pset(x, y, c); }
  for (let x = 6; x < 320; x += 24) { rect(x, 158, x + 2, 164, SE.ink); rect(x, 158, x, 164, SE.chapaS); }
  // las tuberías que unen la cúpula y la fábrica
  rect(100, 114, 150, 116, SE.ink); rect(100, 114, 150, 114, SE.chapaL); rect(100, 115, 150, 115, SE.chapaS); for (let x = 106; x < 150; x += 10) rect(x, 113, x + 1, 117, SE.chapaD);
  // la torre de antena con su celosía y la parabólica
  for (const [a, b] of [[24, 36], [36, 24]]) linea(a, 112, 30, 46, SE.chapaS); for (let y = 52; y < 112; y += 8) { const w = (y - 46) * 0.09; linea(Math.round(30 - w), y, Math.round(30 + w), y + 8, SE.chapaD); linea(Math.round(30 + w), y, Math.round(30 - w), y + 8, SE.chapaD); }
  rect(28, 44, 32, 47, SE.ink);
  // la cúpula de cristal con su armazón
  for (let j = -26; j <= 0; j++) for (let i = -30; i <= 30; i++) { const e = (i / 30) ** 2 + (j / 26) ** 2; if (e > 1) continue; const x = 84 + i, y = 114 + j; pset(x, y, e > 0.86 ? SE.chapaS : f_tono([SE.malvaD, SE.vidrioCD, SE.vidrioC], 0.6 + (1 - e) * 0.8 + (j < -14 && i < -4 ? 1 : 0), x, y)); }
  for (let y = 104; y <= 113; y++) for (let x = 60; x <= 108; x++) if (((x - 84) / 30) ** 2 + ((y - 114) / 26) ** 2 < 0.86) pset(x, y, y === 104 ? SE.malvaL : f_tono([SE.malvaD, SE.neb1], 0.5 + (y - 104) / 9, x, y));
  for (let k = 0; k < 4; k++) rect(64 + k * 11, 104, 68 + k * 11, 106, SE.ink);
  for (const a of [-0.9, -0.45, 0, 0.45, 0.9]) for (let s = 0; s <= 26; s++) { const x = Math.round(84 + Math.sin(a * 1.3) * 30 * Math.sin(s / 26 * Math.PI / 2)), y = Math.round(114 - 26 * Math.cos(s / 26 * Math.PI / 2)); pset(x, y, SE.chapaS); }
  for (const r of [0.45, 0.78]) for (let i = -30; i <= 30; i++) { const y = Math.round(114 - 26 * r * Math.sqrt(Math.max(0, 1 - (i / 30) ** 2))); if (Math.abs(i) < 30 * Math.sqrt(1 - r * r) + 1) pset(84 + i, y, SE.chapaS); }
  rect(52, 114, 116, 117, SE.ink); rect(53, 114, 115, 115, SE.chapa);
  // la fábrica: chapa morada con remaches, la puerta y las dos chimeneas a rayas
  rect(139, 71, 215, 117, SE.ink); f_chapa(R, 140, 72, 214, 116, 66, [SE.malvaD, SE.malva, SE.malvaL, f_mezcla(SE.malvaL, SE.blanco, 0.3)]);
  for (let k = 0; k < 18; k++) { const x = 146 + (k % 6) * 11, y = 80 + Math.floor(k / 6) * 10; rect(x - 1, y - 1, x + 6, y + 5, SE.ink); }
  rect(168, 104, 186, 116, SE.ink); rect(169, 105, 185, 116, SE.malvaD); rect(176, 105, 177, 116, SE.ink);
  for (const cx of [155, 181]) { rect(cx - 5, 46, cx + 5, 72, SE.ink); for (let y = 47; y < 72; y++) rect(cx - 4, y, cx + 4, y, ((y >> 2) & 1) ? SE.malvaL : SE.chapaS); rect(cx - 4, 47, cx - 3, 71, f_mezcla(SE.chapaL, SE.malvaL, 0.5)); rect(cx - 6, 45, cx + 6, 47, SE.ink); }
  poligono([[136, 72], [218, 72], [214, 66], [140, 66]], SE.malvaD); linea(140, 66, 214, 66, SE.malvaL);
  // el cartel sobre dos postes, con el mando con cuernos
  for (const px of [234, 264]) { rect(px - 1, 72, px + 1, 110, SE.ink); rect(px, 72, px, 110, SE.chapaS); for (let y = 76; y < 110; y += 6) linea(px - 1, y, px + 1, y + 3, SE.chapaD); }
  rect(224, 36, 274, 74, SE.ink); rect(227, 39, 271, 71, hex('#0e0618')); for (let y = 39; y <= 71; y++) for (let x = 227; x <= 271; x++) if ((x + y) % 4 === 0) pset(x, y, SE.malvaD);
  f_mandoCuernos(R, 236, 41, 2, SE.acido, SE.rojo);
  // la pista de aterrizaje con su platillo aparcado
  poligono([[270, 122], [318, 122], [314, 117], [274, 117]], SE.chapaD); linea(274, 117, 314, 117, SE.chapaL); for (let x = 280; x < 312; x += 8) rect(x, 119, x + 3, 120, SE.amarillo);
  for (let i = -16; i <= 16; i++) { const hh = Math.round(Math.sqrt(1 - (i / 16) ** 2) * 4) + 1; for (let j = -hh; j <= hh; j++) pset(300 + i, 110 + j, j < 0 ? SE.chapaL : j === 0 ? SE.chapa : SE.chapaS); }
  disco(300, 106, 5, (x, y) => y > 106 ? SE.chapaD : f_tono([SE.vidrioCD, SE.vidrioC, SE.vidrioCL], 2 - (x - 298 + y - 103) * 0.2, x, y)); linea(292, 114, 289, 117, SE.ink); linea(308, 114, 311, 117, SE.ink);
}

// la jaula: el suelo y los barrotes de atrás ('fondo') o los de delante, el techo, la puerta y el candado ('delante').
// x0–x1 de ancho, y0 el techo, suelo la línea de los pies; ab (0–1) abre la puerta (bisagra a la derecha) y suelta el candado
function f_jaulaPartes(R, t, x0, x1, y0, suelo, ab, parte) {
  const { pset, rect, linea, disco } = R, prof = 6, xd0 = x1 - Math.round((x1 - x0) * 0.36);
  if (parte === 'fondo') {
    for (let x = x0 - 2; x <= x1 + 2; x++) for (let j = 0; j < 4; j++) pset(x, suelo + j, j === 0 ? SE.chapaL : j === 3 ? SE.ink : SE.chapaS);
    for (let x = x0 - 3; x <= x1 + 6; x++) if ((x + suelo) % 2 === 0) pset(x, suelo + 4, SE.ink);
    for (let x = x0 + prof; x <= x1 - prof; x += 5) { linea(x, y0 - prof, x, suelo - 2, SE.chapaD); pset(x, y0 - prof, SE.chapaS); }
    rect(x0 + prof, y0 - prof, x1 - prof, y0 - prof, SE.chapaS);
    rect(x0 + 6, suelo - 2, x0 + 16, suelo - 1, SE.amarilloS); rect(x0 + 8, suelo - 4, x0 + 12, suelo - 2, SE.azul);   // un cuenco y un trapo dentro
    return;
  }
  // los barrotes de delante (no en el hueco de la puerta)
  for (let x = x0; x < xd0; x += 5) { linea(x, y0, x, suelo, SE.ink); linea(x + 1, y0, x + 1, suelo, SE.chapaL); }
  linea(x0, y0, x0 + prof, y0 - prof, SE.chapaS); linea(x1, y0, x1 - prof, y0 - prof, SE.chapaS); linea(x0, y0, x0, suelo, SE.ink);
  rect(x0 - 1, y0 - 1, x1 + 1, y0 + 1, SE.ink); rect(x0, y0, x1, y0, SE.chapaL); rect(x0 - 1, suelo - 3, xd0, suelo - 2, SE.ink); rect(x0, suelo - 3, xd0, suelo - 3, SE.chapaS);
  rect(x1 - 1, y0, x1 + 1, suelo, SE.ink); rect(x1, y0, x1, suelo, SE.chapa);
  // la argolla del techo y la luz roja de aviso
  linea(Math.round((x0 + x1) / 2), y0 - 1, Math.round((x0 + x1) / 2), y0 - 7, SE.ink); R.anillo((x0 + x1) / 2, y0 - 9, 2.4, SE.chapaS);
  disco(x0 + 4, y0 - 3, 2, Math.sin(t * 4) > 0 ? SE.rojoL : SE.rojoD);
  // la puerta: gira sobre la bisagra de la derecha y se abre hacia el que mira
  const a = ab * Math.PI * 0.62, w = x1 - xd0, xs = (k) => Math.round(x1 - (w - k) * Math.cos(a)), ys = (k) => Math.round(Math.sin(a) * (w - k) * 0.22);
  for (let k = 0; k < w; k += 5) { const x = xs(k); linea(x, y0 + 2 + ys(k), x, suelo - 2 + ys(k), SE.ink); linea(x + 1, y0 + 2 + ys(k), x + 1, suelo - 2 + ys(k), SE.chapaL); }
  const xe = xs(0);
  for (const yy of [y0 + 2, Math.round((y0 + suelo) / 2), suelo - 3]) { linea(xe, yy + ys(0), x1, yy, SE.ink); linea(xe, yy - 1 + ys(0), x1, yy - 1, SE.chapaS); }
  linea(xe, y0 + 2 + ys(0), xe, suelo - 2 + ys(0), SE.ink);
  // el candado: colgado del cierre, y cuando se abre, caído en el suelo
  if (ab < 0.05) { const cx = xd0, cy = Math.round((y0 + suelo) / 2) + 3; R.anillo(cx, cy - 3, 2.2, SE.chapaL); rect(cx - 3, cy - 1, cx + 3, cy + 4, SE.ink); rect(cx - 2, cy, cx + 2, cy + 3, SE.amarillo); pset(cx, cy + 1, SE.ink); pset(cx - 2, cy, SE.calidaL); }
  else { const p = Math.min(1, ab / 0.3), cx = xd0 - 4, cy = Math.round(lerp((y0 + suelo) / 2 + 3, suelo + 1, p * p)); rect(cx - 3, cy - 3, cx + 3, cy + 1, SE.ink); rect(cx - 2, cy - 2, cx + 2, cy, SE.amarillo); R.anillo(cx + 3, cy - 4, 2.2, SE.chapaL); }
}

// los barrotes de delante de la jaula, para pintarlos DESPUÉS de los personajes que están dentro (los de la jaula
// tapan a los presos); usa las mismas opciones que espacio(): o.camara ('jaula' o 'general') y o.abierta (0–1)
export function f_jaulaDelante(R, t, o = {}) {
  const ab = o.abierta ?? 0;
  if (o.camara === 'jaula') f_jaulaPartes(R, t, 118, 222, 92, 154, ab, 'delante'); else f_jaulaPartes(R, t, 214, 266, 116, 152, ab, 'delante');
}

function f_jaula(R, t, o) {
  const { pset, rect, linea, disco } = R;
  R.copiar(f_capa(R, 'si-jaula', () => f_jaulaFijo(R)));
  f_titilan(R, t, 6, 20, 270, 38, 14, 9, (x, y) => y >= 21 && y <= 37);
  // por la tira de ventanas pasa una nave pequeña de vez en cuando
  { const x = Math.round(((t * 22) % 380) - 40); R.recorte([4, 20, 272, 38]); for (let i = -6; i <= 6; i++) for (let j = -1; j <= 1; j++) pset(x + i, 30 + j, j < 0 ? SE.chapaL : SE.chapaS); pset(x + 6, 30, SE.rojo); pset(x - 7 - Math.floor(t * 10) % 2, 30, SE.naranja); R.recorte(null); }
  // el líquido verde que corre por la tubería de cristal
  for (let x = 0; x < 320; x++) if (x < 108 || x > 232) for (let y = 70; y <= 74; y++) { const b = Math.sin(x * 0.5 - t * 9 + y) > 0.6; pset(x, y, y === 70 ? SE.acidoL : b ? SE.acidoL : (y > 72 ? SE.acidoD : SE.acido)); }
  for (let k = 0; k < 5; k++) { const x = Math.round(((t * 40 + k * 70) % 320)); if (x < 108 || x > 232) pset(x, 71 + k % 3, SE.blanco); }
  // la cámara de seguridad que vigila de un lado a otro
  { const a = Math.sin(t * 0.8) * 0.5, cx = 254, cy = 58; linea(cx, 46, cx, 54, SE.ink); rect(cx - 6, cy - 4, cx + 6, cy + 2, SE.ink); rect(cx - 5, cy - 3, cx + 5, cy + 1, SE.chapa); rect(cx - 5, cy - 3, cx + 5, cy - 3, SE.chapaL); const lx = Math.round(cx + Math.sin(a) * 8) - 2; rect(lx, cy - 2, lx + 3, cy + 2, SE.ink); pset(lx + 1, cy, Math.sin(t * 6) > 0 ? SE.rojoL : SE.rojo); }
  // las luces de la pared y del emblema
  for (let k = 0; k < 8; k++) pset(126 + k * 10, 46, (k + Math.floor(t * 6)) % 4 === 0 ? SE.acidoL : SE.acidoD);
  const ab = o.abierta ?? 0; f_jaulaPartes(R, t, 118, 222, 92, 154, ab, 'fondo'); f_jaulaPartes(R, t, 118, 222, 92, 154, ab, 'delante');
  return { suelo: 154, jaula: [118, 92, 222, 154], puertaJaula: [185, 222], dentro: [124, 182], fuera: [228, 300], emblema: [128, 40, 212, 66], camara: [254, 58], libre: [228, 300] };
}

// lo fijo de la pared de la sede (al búfer)
function f_jaulaFijo(R) {
  const { pset, rect, linea, disco } = R, M = [SE.malvaD, SE.malva, SE.malvaL, f_mezcla(SE.malvaL, SE.blanco, 0.3)];
  for (let y = 0; y <= 17; y++) for (let x = 0; x < 320; x++) pset(x, y, f_tono([SE.ink, SE.malvaD, SE.techo], 1 + (f_ruido(x, y, 9, 70) - 0.5) * 0.6, x, y));
  rect(0, 14, 319, 15, SE.malvaD);
  // la tira de ventanas al espacio
  rect(0, 18, 319, 40, SE.ink); f_cosmos(R, 4, 20, 272, 38, 9); for (let y = 20; y <= 38; y++) for (let x = 273; x <= 315; x++) pset(x, y, f_tono([SE.malvaD, SE.malva], 0.5 + (x + y) % 5 * 0.2, x, y));
  for (let x = 2; x < 320; x += 46) { rect(x, 18, x + 3, 40, SE.ink); rect(x + 1, 18, x + 2, 40, SE.chapaS); }
  // la pared de chapa morada
  [[0, 41, 106, 96], [107, 41, 233, 96], [234, 41, 319, 96], [0, 97, 106, 150], [107, 97, 233, 150], [234, 97, 319, 150]].forEach(([a, b, c, d], i) => f_chapa(R, a, b, c, d, 71 + i, M));
  // el emblema grande: el mando con cuernos en un escudo, con su marco de luces
  rect(124, 42, 216, 68, SE.ink); rect(126, 44, 214, 66, hex('#0e0618')); f_mandoCuernos(R, 158, 45, 2, SE.acido, SE.rojo);
  for (const sx of [134, 196]) { for (let k = 0; k < 3; k++) rect(sx, 50 + k * 5, sx + 10, 51 + k * 5, SE.acidoD); }
  // la tubería de cristal (el líquido va vivo)
  rect(0, 68, 319, 76, SE.ink); rect(0, 69, 319, 69, SE.vidrioCL); for (let x = 30; x < 320; x += 60) rect(x, 66, x + 4, 78, SE.chapaS);
  // tuberías gruesas que bajan, una válvula y un panel de control
  for (const px of [20, 294]) { rect(px - 3, 76, px + 3, 150, SE.ink); rect(px - 2, 76, px + 2, 150, SE.chapaS); rect(px - 2, 76, px - 1, 150, SE.chapaL); for (let y = 86; y < 150; y += 20) rect(px - 4, y, px + 4, y + 2, SE.chapaD); }
  disco(20, 116, 5, SE.ink); R.anillo(20, 116, 4, SE.rojo); linea(16, 116, 24, 116, SE.rojo);
  rect(40, 100, 86, 132, SE.ink); rect(41, 101, 85, 131, SE.chapaD); rect(44, 104, 82, 116, hex('#081a10')); for (let x = 44; x <= 82; x++) pset(x, Math.round(110 + Math.sin(x * 0.4) * 4), SE.acido); for (let k = 0; k < 6; k++) disco(48 + k * 6, 124, 1.6, [SE.rojo, SE.acido, SE.amarillo][k % 3]);
  // el suelo del asteroide: rejilla metálica con polvo de roca y tornillos
  for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.8 - (y - 151) * 0.01 + (f_ruido(x, y, 6, 72) - 0.5) * 0.6; const g = (x + (y >> 1)) % 6 === 0 || (y - 151) % 7 === 0; if (g) v -= 0.9; if (f_ruido(x, y, 14, 73) > 0.68) v = 1.2 + h(x, y, 74); pset(x, y, f_tono(f_ruido(x, y, 14, 73) > 0.68 ? [SE.rocaD, SE.rocaS, SE.roca, SE.rocaL] : [SE.ink, SE.chapaD, SE.chapaS, SE.chapa], v, x, y)); }
  rect(0, 150, 319, 150, SE.ink); rect(0, 151, 319, 151, SE.chapaL);
  // la cámara de seguridad: el soporte
  rect(250, 42, 258, 46, SE.ink);
}

// ·· el portal del tiempo ··
function f_portal(R, t, o) {
  const { pset, disco, linea, rect } = R, cx = 198, cy = 86, r = 58, g = o.giro ?? 1;
  R.copiar(f_capa(R, 'si-portal', () => f_portalFijo(R)));
  f_titilan(R, t, 0, 16, 320, 140, 40, 11, (x, y) => Math.hypot(x - cx, y - cy) > r + 4 && R.pget(x, y) !== 0 && !(x < 150 && y > 138));
  // el resplandor exterior y la espiral: cinco brazos que giran hacia dentro
  const P = [SE.malvaD, SE.malva, SE.neb4, SE.rosa, f_mezcla(SE.rosa, SE.blanco, 0.5), SE.tealL, SE.blanco];
  for (let j = -r - 8; j <= r + 8; j++) for (let i = -r - 8; i <= r + 8; i++) {
    const d = Math.hypot(i, j * 1.08); if (d > r + 8) continue;
    const x = cx + i, y = cy + j;
    if (d > r) { if (f_b4(x, y) < (1 - (d - r) / 8) * 0.5) pset(x, y, f_mezcla(R.pget(x, y), SE.neb4, 0.5)); continue; }
    const a = Math.atan2(j, i), v = Math.sin(a * 5 + Math.log(d + 1) * 7 - t * 3.2 * g), base = (1 - d / r) * 4.6 + v * 1.3 + 0.6;
    if (d > r * 0.82 && f_b4(x, y) < (d - r * 0.82) / (r * 0.18) * 0.8) continue;
    pset(x, y, f_tono(P, base, x, y));
  }
  disco(cx, cy, 6 + Math.sin(t * 5) * 1.5, SE.blanco);
  // las chispas que la espiral se traga
  for (let k = 0; k < 46; k++) { const p = (t * 0.22 * g + h(k, 1, 80)) % 1, rr = r * 1.25 * (1 - p), an = h(k, 2, 80) * Math.PI * 2 + p * 7 * g, x = Math.round(cx + Math.cos(an) * rr), y = Math.round(cy + Math.sin(an) * rr * 0.92); if (y < 18 || x > 274 && y < 46) continue; pset(x, y, p > 0.7 ? SE.blanco : k % 3 ? SE.tealL : SE.amarillo); }
  // relojes, disquetes y una tuerca que dan vueltas hacia el centro
  for (let k = 0; k < 5; k++) { const p = (t * 0.07 * g + k / 5) % 1, rr = r * (1.05 - p * 0.85), an = k * 1.3 + p * 9 * g, x = Math.round(cx + Math.cos(an) * rr), y = Math.round(cy + Math.sin(an) * rr * 0.92); if (y < 20 || (x > 270 && y < 48)) continue;
    if (k % 2 === 0) { disco(x, y, 4, SE.ink); disco(x, y, 3, SE.arenaB); const ha = t * 3 + k; linea(x, y, x + Math.round(Math.cos(ha) * 2), y + Math.round(Math.sin(ha) * 2), SE.ink); linea(x, y, x, y - 2, SE.ink); }
    else if (k === 1) { rect(x - 3, y - 3, x + 3, y + 3, SE.ink); rect(x - 2, y - 2, x + 2, y + 2, SE.azul); rect(x - 1, y - 2, x + 1, y - 1, SE.chapaL); rect(x - 1, y + 1, x + 1, y + 2, SE.blanco); }
    else { rect(x - 1, y - 1, x + 1, y + 1, SE.chapaL); pset(x, y, SE.ink); } }
  // rocas que flotan
  for (let k = 0; k < 5; k++) { const x = Math.round(((h(k, 1, 81) * 360 + t * (3 + k)) % 360) - 20), y = Math.round(30 + h(k, 2, 81) * 100 + Math.sin(t + k) * 2); if (Math.hypot(x - cx, y - cy) < r + 6 || (x > 270 && y < 48) || (x < 150 && y > 136)) continue; disco(x, y, 2 + (k % 3), (X, Y) => f_tono([SE.rocaD, SE.rocaS, SE.roca, SE.rocaL], 2.4 - (X - x + Y - y) * 0.4, X, Y)); }
  // la baliza del poste
  disco(124, 128, 2, Math.sin(t * 4) > 0 ? SE.amarillo : SE.amarilloS); if (Math.sin(t * 4) > 0) R.halo(124, 128, 7, [SE.amarilloS, SE.amarillo], 0.7);
  return { suelo: 150, portal: [cx, cy, r], cornisa: [0, 140], borde: 136, libre: [20, 130] };
}

// lo fijo del portal (al búfer): el espacio, una galaxia lejana, el planeta en creciente abajo a la derecha y la cornisa
// de roca con la pista rayada, el poste con baliza y la señal de la espiral
function f_portalFijo(R) {
  const { pset, rect, linea, disco, poligono } = R;
  f_cosmos(R, 0, 0, 319, 179, 13);
  for (let k = 0; k < 160; k++) { const a = k * 0.18, d = k * 0.12, x = Math.round(58 + Math.cos(a) * d * 1.6), y = Math.round(44 + Math.sin(a) * d * 0.7); pset(x, y, k < 30 ? SE.estrellaR : k % 2 ? SE.estrellaA : SE.neb4); pset(Math.round(58 - Math.cos(a) * d * 1.6), Math.round(44 - Math.sin(a) * d * 0.7), k % 2 ? SE.neb2 : SE.estrellaD); }
  disco(58, 44, 2, SE.estrellaR);
  disco(300, 196, 54, (x, y) => { const l = Math.hypot(x - 270, y - 170); return l < 48 ? f_tono([SE.esp1, SE.esp2], 0.5 + (x + y) % 3 * 0.2, x, y) : f_tono([SE.neb3, SE.neb5, SE.vidrioC, SE.vidrioCL], 1.4 + (l - 48) * 0.35 + Math.sin(y * 0.4) * 0.4, x, y); });
  // la cornisa: roca con estratos y grietas, el borde de la pista rayada y la sombra del precipicio
  const top = (x) => 140 + Math.round(f_ruido(x, 0, 12, 82) * 4) + (x > 130 ? Math.round((x - 130) * 0.5) : 0);
  for (let y = 138; y < 180; y++) { const xe = Math.round(146 - Math.max(0, y - 150) * 1.3 + f_ruido(0, y, 5, 84) * 6); for (let x = 0; x <= xe; x++) { if (y < top(x)) continue; let v = 2.2 - (y - top(x)) * 0.03 + (f_ruido(x, y, 7, 83) - 0.5) * 0.9 - (x > 110 ? (x - 110) * 0.03 : 0); if ((y * 3 + x) % 17 < 2) v -= 0.6; if (y - top(x) < 2) v += 0.9; if (x > xe - 2) v -= 1; pset(x, y, f_tono([SE.rocaD, SE.rocaS, SE.roca, SE.rocaL], v, x, y)); } }
  for (let x = 0; x <= 112; x++) for (let y = 146; y <= 152; y++) pset(x, y, y === 146 ? SE.chapaL : y === 152 ? SE.ink : y < 149 ? SE.chapa : ((x + y) >> 2) & 1 ? SE.amarillo : SE.ink);
  for (let x = 2; x < 112; x += 18) { pset(x, 147, SE.remache); }
  // el poste con su baliza y la señal de la espiral
  rect(122, 128, 126, 146, SE.ink); rect(123, 130, 124, 146, SE.chapaL); rect(120, 130, 128, 131, SE.chapaD);
  rect(14, 112, 16, 146, SE.ink); rect(15, 112, 15, 146, SE.chapaS); disco(15, 110, 9, SE.ink); disco(15, 110, 8, SE.amarillo); for (let k = 0; k < 40; k++) { const a = k * 0.32, d = k * 0.16; pset(Math.round(15 + Math.cos(a) * d), Math.round(110 + Math.sin(a) * d), SE.ink); }
}

// ·· el mundo del primer juego: píxeles gordos y dieciséis colores ··
const f_EGA = ['#000000', '#0000aa', '#00aa00', '#00aaaa', '#aa0000', '#aa00aa', '#aa5500', '#aaaaaa', '#555555', '#5555ff', '#55ff55', '#55ffff', '#ff5555', '#ff55ff', '#ffff55', '#ffffff'];

let f_EGAc = null;

function f_ega() { if (!f_EGAc) f_EGAc = f_EGA.map((c) => [hex(c), parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]); return f_EGAc; }

function f_pixeles(R, t, o) {
  const E = f_ega().map((e) => e[0]), P = (x, y, c) => R.rect(x * 2, y * 2, x * 2 + 1, y * 2 + 1, c), tq = Math.floor(t * 8) / 8;
  R.copiar(f_capa(R, 'si-pixeles', () => f_pixelesFijo(R)));
  // las estrellas que parpadean a saltos
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 90) * 130), y = Math.floor(h(k, 2, 90) * 18) + 1; if (x > 8 && x < 88 && y < 8) continue; if ((Math.floor(tq * 2) + k) % 4 === 0) { P(x, y, E[15]); } }
  // nubes gordas que avanzan a saltos de un píxel
  for (let k = 0; k < 3; k++) { const x = Math.floor(((k * 61 + tq * (2 + k)) % 200)) - 30, y = 27 + k * 4, w = 10 + k * 4; for (let i = 0; i < w; i++) { P(x + i, y, E[7]); if (i > 1 && i < w - 2) P(x + i, y - 1, E[15]); if (i > 3 && i < w - 4) P(x + i, y - 2, E[15]); if (i % 2 === 0) P(x + i, y + 1, E[8]); } }
  // el bicho volador de dos fotogramas
  { const u = (tq * 0.1) % 1, x = Math.floor(170 - u * 190), y = 30 + (Math.floor(tq * 4) % 2), f = Math.floor(tq * 4) % 2; if (x > -4 && x < 162) { P(x, y, E[13]); P(x + 1, y, E[13]); P(x + 2, y, E[5]); if (f) { P(x - 1, y - 1, E[13]); P(x + 3, y - 1, E[13]); } else { P(x - 1, y + 1, E[13]); P(x + 3, y + 1, E[13]); } P(x + 2, y - 1, E[14]); } }
  // la luz de la nave y los ojos de buey
  P(131, 51, Math.floor(tq * 2) % 2 ? E[12] : E[4]);
  // el gusano que asoma de la arena y se esconde
  { const c = (tq % 4), alto = c < 1 ? Math.floor(c * 4) : c < 2.5 ? 4 : c < 3.5 ? Math.max(0, 4 - Math.floor((c - 2.5) * 4)) : 0; for (let k = 0; k < alto; k++) { P(24, 82 - k, k === alto - 1 ? E[13] : E[5]); P(25, 82 - k, E[5]); } if (alto > 2) { P(24, 82 - alto + 1, E[15]); } }
  // destellos en la arena
  for (let k = 0; k < 4; k++) { const x = Math.floor(h(k, Math.floor(tq * 2), 91) * 150) + 4, y = 58 + Math.floor(h(k, 3, Math.floor(tq * 2)) * 28); P(x, y, E[15]); }
  return { suelo: 150, nave: [244, 112], soles: [[200, 32], [228, 48]], libre: [40, 200] };
}

// lo fijo del mundo de píxeles gordos (al búfer), dibujado en una rejilla de 160×90 y con los 16 colores de entonces
function f_pixelesFijo(R) {
  const E = f_ega().map((e) => e[0]), P = (x, y, c) => R.rect(x * 2, y * 2, x * 2 + 1, y * 2 + 1, c), chk = (x, y) => (x + y) % 2 === 0;
  // el cielo tramado: negro arriba, azul tramado y una franja cian junto al horizonte
  for (let y = 0; y < 50; y++) for (let x = 0; x < 160; x++) P(x, y, y < 12 ? E[0] : y < 24 ? (chk(x, y) && y > 17 ? E[1] : E[0]) : y < 31 ? ((x + y * 2) % 4 === 0 ? E[0] : E[1]) : y < 38 ? ((x + y * 2) % 6 === 0 ? E[9] : E[1]) : y < 44 ? (chk(x, y) ? E[9] : E[1]) : (chk(x, y) ? E[11] : E[9]));
  for (let k = 0; k < 30; k++) { const x = Math.floor(h(k, 1, 92) * 160), y = Math.floor(h(k, 2, 92) * 34); if (x > 8 && x < 88 && y < 8) continue; P(x, y, k % 3 ? E[7] : E[15]); }
  // dos soles
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) if (i * i + j * j <= 25) P(100 + i, 16 + j, i * i + j * j < 6 ? E[15] : E[14]);
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 9) P(114 + i, 24 + j, E[12]);
  // el planeta magenta con su anillo
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36) P(36 + i, 22 + j, i + j > 3 ? (chk(i, j) ? E[5] : E[0]) : i + j < -4 ? E[13] : E[5]);
  for (let i = -11; i <= 11; i++) if (Math.abs(i) > 5) P(36 + i, 22 + Math.round(-i * 0.15), E[7]);
  // las mesetas pardas con su sombra tramada
  const mes = (x0, x1, top) => { for (let x = x0; x <= x1; x++) for (let y = top; y < 51; y++) P(x, y, x > x1 - 4 ? (chk(x, y) ? E[6] : E[0]) : y === top ? E[12] : E[6]); };
  mes(0, 30, 40); mes(54, 84, 43); mes(120, 159, 38);
  // la arena: amarilla con dunas tramadas en pardo, ondas y piedras grises
  for (let y = 50; y < 90; y++) for (let x = 0; x < 160; x++) { const d = Math.sin(x * 0.07 + Math.floor(y / 10)) * 3, banda = (y + Math.round(d)) % 10; P(x, y, banda < 2 ? (chk(x, y) ? E[6] : E[14]) : banda === 5 && x % 6 < 3 ? E[6] : E[14]); }
  for (const [x, y] of [[14, 70], [60, 80], [96, 66], [150, 84], [40, 58]]) { P(x, y, E[7]); P(x + 1, y, E[8]); P(x, y - 1, E[15]); P(x + 2, y, E[8]); }
  // los cactus del planeta, verdes, y una roca en forma de seta
  for (const x of [8, 76, 104]) { for (let y = 66; y < 75; y++) P(x, y, E[2]); P(x - 1, 69, E[2]); P(x - 1, 68, E[2]); P(x + 1, 70, E[2]); P(x + 1, 69, E[2]); P(x, 65, E[10]); }
  for (let y = 58; y < 72; y++) { P(50, y, E[6]); P(51, y, E[6]); P(52, y, chk(52, y) ? E[6] : E[0]); } for (let x = 44; x <= 58; x++) { P(x, 56, E[12]); P(x, 57, E[6]); P(x, 58, x > 54 ? E[0] : E[6]); }
  // la nave simplificada: casco gris, ventanas cian, aleta roja, patas
  for (let x = 110; x <= 134; x++) for (let y = 54; y <= 58; y++) P(x, y, y === 54 ? E[15] : y === 58 ? E[8] : E[7]);
  for (let x = 113; x <= 131; x++) P(x, 53, E[7]); for (let x = 116; x <= 128; x++) P(x, 52, E[8]);
  for (let x = 118; x <= 124; x++) for (let y = 49; y <= 51; y++) P(x, y, y === 49 ? E[11] : E[3]);
  for (const x of [114, 120, 126]) P(x, 56, E[11]);
  for (let k = 0; k < 4; k++) { P(134 + k, 54 - k, E[4]); P(134 + k, 55 - k, E[12]); }
  for (const x of [112, 132]) { P(x, 59, E[8]); P(x + (x > 120 ? 1 : -1), 60, E[8]); P(x + (x > 120 ? 2 : -2), 61, E[8]); }
  P(131, 52, E[8]); P(131, 51, E[4]);
  for (let x = 108; x <= 138; x++) if (chk(x, 62)) P(x, 62, E[6]);
}

// vuelve de 16 colores y de píxeles de 2×2 lo que ya hay pintado en el rectángulo (para el personaje que llega al mundo
// del primer juego): cada bloque toma el color de su píxel de arriba a la izquierda, llevado al más cercano de los 16
export function f_pixelar(R, x0, y0, x1, y1) {
  const E = f_ega(), cache = new Map();
  x0 = Math.max(0, x0 & ~1); y0 = Math.max(0, y0 & ~1);
  for (let y = y0; y <= Math.min(179, y1); y += 2) for (let x = x0; x <= Math.min(319, x1); x += 2) {
    const c = R.pget(x, y); let m = cache.get(c);
    if (m === undefined) { const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255; let best = 1e9;
      // los tonos cálidos (piel, pelo rubio o castaño) van a los de entonces: rojo claro, amarillo o marrón
      if (r > 150 && r > g && g > b && r - b > 60) { m = (b >= 120 ? E[12] : g > 160 ? E[14] : E[6])[0]; cache.set(c, m); R.rect(x, y, x + 1, y + 1, m); continue; } for (const e of E) { const cr = Math.max(r, g, b) - Math.min(r, g, b), ce = Math.max(e[1], e[2], e[3]) - Math.min(e[1], e[2], e[3]), d = (r - e[1]) ** 2 * 3 + (g - e[2]) ** 2 * 4 + (b - e[3]) ** 2 * 2 + (cr - ce) ** 2 * 2; if (d < best) { best = d; m = e[0]; } } cache.set(c, m); }
    R.rect(x, y, x + 1, y + 1, m);
  }
}

// paleta del decorado F
const g_P = Object.fromEntries(Object.entries({
  k: '#1c1222', blanco: '#f6f2ea',
  ladA: '#6a2e2c', ladAS: '#4e2020', ladAL: '#84403a', junta: '#3a1a1e',
  verdeBar: '#1e4a3a', verdeBarL: '#2e6a52', verdeBarS: '#123228',
  estuco: '#4e6a74', estucoS: '#3a4e58', estucoL: '#62828c',
  luzC: '#f2c878', luzCL: '#fae0a0', luzCS: '#c89a58', tele: '#6a8ad8',
  cristalN: '#232a50', cristalNL: '#34406a',
  acera: '#4a4858', aceraL: '#5a5868', aceraS: '#3a3846', bordillo: '#7a7888',
  asf: '#24222e', asfL: '#302e3c', asfS: '#1a1822',
  rosa: '#ff5aa8', rosaD: '#7a2a5a', cian: '#5ae8f0', cianD: '#1e5a6a', ambar: '#ffb84a', ambarD: '#7a4a24',
  verdeN: '#7af07a', verdeND: '#2a6a3a', rojoN: '#ff4a4a', rojoND: '#6a2028', azulN: '#6aa0ff', azulND: '#283a7a',
  hierro: '#22202a', hierroL: '#3a3846',
}).map(([k, v]) => [k, hex(v)]));

const g_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de la trama de Bayer 4×4 (0–1)
const g_b4 = (x, y) => (g_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (a + (b − a)·k)
function g_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// el fondo fijo de cada encuadre se pinta una vez en un búfer propio y se copia en cada fotograma; dibuja() puede devolver
// datos (la máscara del cielo, por ejemplo), que vuelven con el búfer
const g_cache = new WeakMap();

function g_fondo(R, clave, dibuja) {
  let m = g_cache.get(R); if (!m) g_cache.set(R, m = new Map());
  let e = m.get(clave);
  if (!e) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja() || {}; R.usar(prev); e = { b, ...extra }; m.set(clave, e); }
  R.copiar(e.b); return e;
}

// degradado vertical tramado entre varios colores
function g_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, g_b4(x, y) < f ? cols[i + 1] : cols[i]); }
}

// la máscara del cielo: 1 donde el búfer final conserva el cielo de la instantánea (ahí se pintan nubes y estrellas)
function g_mascara(R, cielo, y1) { const B = R.buf, m = new Uint8Array(320 * 180); for (let i = 0; i < 320 * y1; i++) m[i] = B[i] === cielo[i] ? 1 : 0; return m; }

// una nube de tres tonos (sombra, cuerpo, luz) hecha de bollos; solo pinta donde la máscara dice cielo
function g_nube(R, m, cx, cy, w, cols, sem = 0) {
  const n = 3 + Math.round(w / 9), P = [];
  for (let k = 0; k < n; k++) { const u = k / (n - 1) - 0.5, c = 1 - Math.abs(u) * 1.5; P.push([cx + u * w * 0.9, cy - c * w * 0.14 * (0.7 + h(k, sem, 7) * 0.7), Math.max(2, w * 0.13 * (0.7 + c * 0.7))]); }
  const pinta = (dx, dy, kr, col, corte) => { for (const [px, py, r0] of P) { const r = r0 * kr, X = px + dx, Y = py + dy;
    for (let y = Math.floor(Y - r); y <= Math.ceil(Y + r); y++) { if (y > corte || y < 0 || y >= 180) continue; for (let x = Math.floor(X - r); x <= Math.ceil(X + r); x++) { if (x < 0 || x > 319 || !m[y * 320 + x]) continue; const d = Math.hypot(x + 0.5 - X, y + 0.5 - Y); if (d <= r) R.pset(x, y, col); } } } };
  pinta(1, 2, 1, cols[2], cy + 3); pinta(0, 0, 0.95, cols[1], cy + 1); pinta(-1, -1, 0.6, cols[0], cy);
}

// ladrillo: hiladas de 2 px con junta, cada pieza con su tono (luz, base, sombra) y alguna mancha
function g_ladrillo(R, x0, y0, x1, y1, base, luz, sombra, junta, k = 0, lw = 6, lh = 3) {
  for (let y = y0; y <= y1; y++) { const fila = Math.floor((y - y0) / lh), jy = (y - y0) % lh === lh - 1;
    for (let x = x0; x <= x1; x++) { if (jy) { R.pset(x, y, junta); continue; } const xx = x - x0 + (fila & 1) * (lw >> 1), pieza = Math.floor(xx / lw);
      if (xx % lw === lw - 1) { R.pset(x, y, junta); continue; } const v = h(pieza, fila, k); R.pset(x, y, v < 0.18 ? sombra : v > 0.86 ? luz : (y - y0) % lh === 0 && v > 0.5 ? luz : base); } }
}

// estuco con manchas tramadas y algún desconchón con el ladrillo debajo
function g_estuco(R, x0, y0, x1, y1, base, luz, sombra, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x >> 2, y >> 2, k) * 0.6 + h(x >> 3, y >> 3, k + 1) * 0.4; R.pset(x, y, n > 0.72 && g_b4(x, y) < 0.5 ? luz : n < 0.28 && g_b4(x, y) < 0.5 ? sombra : base); }
  for (let d = 0; d < Math.round((x1 - x0) * (y1 - y0) / 900); d++) { const cx = x0 + 4 + Math.floor(h(d, 3, k) * (x1 - x0 - 12)), cy = y0 + 4 + Math.floor(h(d, 4, k) * (y1 - y0 - 10));
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7 - j; i++) R.pset(cx + i + (j & 1), cy + j, (i + (j & 1) * 2) % 4 === 3 || j === 1 ? hex('#5a3028') : hex('#8a4a3a')); R.linea(cx - 1, cy - 1, cx + 6, cy - 1, sombra); }
}

// un letrero de neón con forma (sin letras): 'copa', 'estrella', 'corazon', 'nota', 'flecha', 'taza', 'luna'. on (0–1)
// enciende; el resplandor tramado va primero y el tubo encima
function g_neon(R, forma, cx, cy, col, dim, on = 1, s = 1) {
  const L = (a, b, c, d) => { const x0 = Math.round(cx + a * s), y0 = Math.round(cy + b * s), x1 = Math.round(cx + c * s), y1 = Math.round(cy + d * s); R.linea(x0 + 1, y0 + 1, x1 + 1, y1 + 1, on > 0.5 ? dim : hex('#1a1424')); R.linea(x0, y0, x1, y1, on > 0.5 ? col : dim); };
  if (on > 0.5) R.halo(cx, cy, 13 * s, [dim, g_mezcla(dim, col, 0.35)], 0.9);
  if (forma === 'copa') { L(-8, -6, 8, -6); L(-8, -6, 0, 3); L(8, -6, 0, 3); L(0, 3, 0, 9); L(-4, 9, 4, 9); L(3, -9, -1, -2); if (on > 0.5) { R.disco(cx + 3 * s, cy - 3 * s, 1.6 * s, hex('#9af05a')); } }
  else if (forma === 'estrella') { const p = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 3.6 : 8.5; p.push([Math.cos(a) * r, Math.sin(a) * r]); } for (let k = 0; k < 10; k++) L(p[k][0], p[k][1], p[(k + 1) % 10][0], p[(k + 1) % 10][1]); }
  else if (forma === 'corazon') { let a0 = null; for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI * 2, x = 16 * Math.sin(a) ** 3 / 2, y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 2; if (a0) L(a0[0], a0[1], x, y); a0 = [x, y]; } }
  else if (forma === 'nota') { L(-4, -8, 6, -10); L(-4, -8, -4, 5); L(6, -10, 6, 3); L(-4, -5, 6, -7); for (const [x, y] of [[-6, 5], [4, 3]]) { L(x - 2, y, x + 2, y); L(x - 2, y + 1, x + 2, y + 1); L(x - 1, y - 1, x + 1, y - 1); } }
  else if (forma === 'flecha') { L(-10, -2, 4, -2); L(-10, 2, 4, 2); L(-10, -2, -10, 2); L(4, -2, 4, -6); L(4, 2, 4, 6); L(4, -6, 10, 0); L(4, 6, 10, 0); }
  else if (forma === 'taza') { L(-6, -3, 6, -3); L(-6, -3, -5, 6); L(6, -3, 5, 6); L(-5, 6, 5, 6); L(6, -1, 9, 0); L(9, 0, 9, 3); L(9, 3, 6, 4); L(-8, 8, 8, 8); }
  else if (forma === 'luna') { let a0 = null; for (let k = 0; k <= 24; k++) { const a = -Math.PI * 0.75 + k / 24 * Math.PI * 1.5, x = -Math.cos(a) * 8, y = Math.sin(a) * 8; if (a0) L(a0[0], a0[1], x, y); a0 = [x, y]; } L(5.6, -5.6, 1, 0); L(5.6, 5.6, 1, 0); }
}

// el reflejo tembloroso de una luz en el asfalto mojado: rayas horizontales cortas, apiladas, que tiemblan y se apagan
// hacia abajo (sin trama dentro, para que no se lean como letras)
function g_reflejo(R, t, x, y0, y1, col, ancho = 3, k = 0) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0);
    if ((y + Math.floor(t * 4 + k)) % 3 === 2 || h(y, Math.floor(t * 3 + k), 3) < f * 0.45) continue;
    const w = Math.max(1, Math.round(ancho * (1 - f * 0.5) + Math.sin(t * 5 + y * 1.7 + k) * 1.2)), dx = Math.round(Math.sin(y * 0.8 + t * 3 + k) * (0.5 + f * 1.5));
    R.rect(x - w + dx, y, x + w + dx, y, col); }
}

// gente pequeña de fondo (8–11 px): anda de lado; c = [abrigo, pantalón, piel]
function g_paseante(R, x, suelo, t, c, alto = 10, dir = 1) {
  const p = Math.floor(t * 6 + x) % 2, X = Math.round(x), cab = suelo - alto;
  R.rect(X - 1, cab, X + 1, cab + 2, c[2]); R.pset(X + dir, cab + 1, c[2]); R.rect(X - 1, cab - 1, X + 1, cab - 1, c[3] ?? hex('#3a2418'));
  R.rect(X - 2, cab + 3, X + 2, suelo - 4, c[0]); R.pset(X + (p ? 2 : -2) * dir, cab + 5, c[0]);
  R.linea(X - 1, suelo - 3, X - 1 - (p ? 1 : 0), suelo, c[1]); R.linea(X + 1, suelo - 3, X + 1 + (p ? 0 : 1), suelo, c[1]);
}

// una farola de calle de hierro (la cabeza en (x, y), el pie en suelo); luz enciende el halo
function g_farola(R, x, y, suelo, luz, tipo = 'calle') {
  const { rect, pset, linea } = R;
  rect(x - 1, y + 4, x + 1, suelo, g_P.hierro); rect(x - 3, suelo - 4, x + 3, suelo, g_P.hierro); rect(x - 2, suelo - 6, x + 2, suelo - 5, g_P.hierroL); pset(x - 1, y + 6, g_P.hierroL);
  for (let yy = y + 10; yy < suelo - 8; yy += 9) rect(x - 2, yy, x + 2, yy, g_P.hierroL);
  if (tipo === 'gas') { rect(x - 4, y - 7, x + 4, y + 3, g_P.k); rect(x - 3, y - 6, x + 3, y + 2, luz > 0 ? hex('#f8d888') : hex('#5a5048')); rect(x - 5, y - 9, x + 5, y - 8, g_P.k); pset(x, y - 10, g_P.k); rect(x - 3, y + 4, x + 3, y + 4, g_P.k); R.linea(x, y - 6, x, y + 2, g_P.k); }
  else { linea(x, y + 4, x + 6, y, g_P.hierro); rect(x + 4, y - 2, x + 12, y, g_P.hierro); rect(x + 5, y + 1, x + 11, y + 1, luz > 0 ? hex('#fff0c0') : hex('#5a5a5a')); }
}

// un coche pequeño del fondo (~18 px), de lado; luces de noche
function g_cochito(R, x, suelo, col, dir, noche) {
  const X = Math.round(x);
  R.rect(X - 9, suelo - 5, X + 9, suelo - 2, col); R.rect(X - 5, suelo - 8, X + 4, suelo - 6, col); R.rect(X - 4, suelo - 7, X + 3, suelo - 6, noche ? hex('#3a4a6a') : hex('#9ac8e8'));
  R.rect(X - 9, suelo - 2, X + 9, suelo - 2, g_mezcla(col, 0, 0.4)); for (const dx of [-5, 5]) { R.rect(X + dx - 1, suelo - 2, X + dx + 1, suelo, g_P.k); }
  R.pset(X + 9 * dir, suelo - 4, noche ? hex('#fff8d0') : hex('#e8e0c0')); R.pset(X - 9 * dir, suelo - 4, hex('#e83a3a'));
}

function g_calleNoche(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 152;
  const e = g_fondo(R, 'calleNoche', () => {
    g_degradado(R, 0, 0, 319, 112, ['#0c0e2a', '#12143a', '#1a1a48', '#262054', '#3a2660', '#5a3066'].map(hex));
    const cielo = R.buf.slice();
    // la ciudad lejana en dos capas (la de atrás con el resplandor naranja de las calles)
    for (let x = -4, k = 0; x < 320; k++) { const w = 9 + Math.floor(h(k, 1, 181) * 15); let top = 34 + Math.floor(h(k, 2, 181) * 20); if (x + w > 266) top = Math.max(top, 52);
      rect(x, top, x + w - 1, 112, hex('#2a2250')); rect(x, top, x + w - 1, top, hex('#3a3064'));
      for (let wy = top + 3; wy < 110; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (h(wx, wy, 182) < 0.16) pset(wx, wy, hex('#8a6a7a'));
      if (h(k, 3, 181) < 0.3) { rect(x + 2, top - 6, x + 2, top, hex('#2a2250')); } x += w; }
    for (let x = -6, k = 0; x < 320; k++) { const w = 14 + Math.floor(h(k, 4, 181) * 18); let top = 44 + Math.floor(h(k, 5, 181) * 14); if (x + w > 266) top = Math.max(top, 56);
      rect(x, top, x + w - 1, 112, hex('#1e1a3a')); rect(x, top, x + w - 1, top, hex('#2e2852'));
      for (let wy = top + 3; wy < 110; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) if (h(wx, wy, 183) < 0.2) pset(wx, wy, h(wx, wy, 184) < 0.6 ? hex('#e8b870') : hex('#9ab8d8'));
      x += w; }
    // el depósito de agua sobre un tejado del fondo
    { const x = 248, y = 22; rect(x, y, x + 14, y + 12, hex('#2a2244')); for (let i = 0; i < 15; i += 3) rect(x + i, y, x + i, y + 12, hex('#221c3a')); poligono([[x - 1, y], [x + 15, y], [x + 7, y - 6]], hex('#2a2244')); linea(x - 1, y, x + 7, y - 6, hex('#3e3460'));
      for (const dx of [1, 6, 12]) rect(x + dx, y + 13, x + dx, y + 26, hex('#1e1a36')); linea(x + 1, y + 16, x + 12, y + 24, hex('#1e1a36')); linea(x + 12, y + 16, x + 1, y + 24, hex('#1e1a36')); }
    // la antena de radio con su luz (la luz se pinta en cada fotograma)
    rect(36, 30, 36, 50, hex('#221c3a')); for (let y = 33; y < 50; y += 4) { pset(35, y, hex('#221c3a')); pset(37, y, hex('#221c3a')); }

    // A · el edificio de ladrillo de la izquierda (x 0–66) con su escalera de incendios y la cafetería abajo
    g_ladrillo(R, 0, 36, 66, 104, P.ladA, P.ladAL, P.ladAS, P.junta, 11);
    rect(0, 33, 66, 36, hex('#8a6a5a')); rect(0, 33, 66, 33, hex('#b0907a')); rect(0, 37, 66, 37, P.k); for (let x = 2; x < 66; x += 6) rect(x, 38, x + 2, 39, hex('#7a5a4a'));
    for (const [wx, wy] of [[6, 44], [26, 44], [46, 44], [6, 68], [26, 68], [46, 68]]) { rect(wx - 1, wy - 1, wx + 11, wy + 13, P.k); rect(wx, wy, wx + 10, wy + 12, P.cristalN); rect(wx - 2, wy + 14, wx + 12, wy + 15, hex('#9a8a7a')); rect(wx - 1, wy - 3, wx + 11, wy - 2, hex('#8a6a5a')); rect(wx, wy + 6, wx + 10, wy + 6, P.k); rect(wx + 5, wy, wx + 5, wy + 12, P.k); linea(wx + 1, wy + 1, wx + 4, wy + 4, P.cristalNL); }
    // la escalera de incendios: plataformas, barandillas y escalerillas en zigzag (por delante de las ventanas)
    for (const py of [58, 82]) { rect(2, py, 60, py + 1, P.hierro); for (let x = 2; x <= 60; x += 3) rect(x, py - 6, x, py - 1, P.hierro); rect(2, py - 7, 60, py - 7, P.hierroL); }
    for (let i = 0; i < 20; i++) { pset(40 + i, 58 + Math.round(i * 1.2), P.hierroL); pset(40 + i, 59 + Math.round(i * 1.2), P.hierro); if (i % 3 === 0) linea(40 + i, 58 + Math.round(i * 1.2), 40 + i, 61 + Math.round(i * 1.2), P.hierro); }
    for (let i = 0; i < 16; i++) { pset(10 + i, 82 + Math.round(i * 0.9) + 0, P.hierroL); }
    rect(6, 84, 7, 100, P.hierro); rect(14, 84, 15, 100, P.hierro); for (let y = 86; y < 100; y += 3) rect(6, y, 15, y, P.hierro);
    // la cafetería: escaparate cálido, barra, taburetes, cafetera y toldo
    rect(0, 104, 66, 107, hex('#3a2a2a')); for (let x = 0; x < 67; x++) { rect(x, 106, x, 112, ((x >> 2) & 1) ? hex('#e8e0c8') : hex('#2a6a5a')); if ((x & 3) === 1) pset(x, 113, ((x >> 2) & 1) ? hex('#e8e0c8') : hex('#2a6a5a')); } rect(0, 105, 66, 105, P.k);
    rect(0, 114, 66, 142, P.k); rect(2, 116, 60, 136, P.luzC); g_degradado(R, 2, 116, 60, 122, [P.luzCL, P.luzC]);
    rect(4, 128, 60, 130, hex('#8a4a2a')); rect(4, 128, 60, 128, hex('#c8784a')); for (const x of [10, 22, 34, 46]) { rect(x, 130, x, 136, hex('#4a2a2a')); rect(x - 2, 130, x + 2, 131, hex('#c83a3a')); }
    rect(6, 119, 12, 127, hex('#8a8a9a')); rect(7, 120, 11, 122, hex('#b8b8c8')); pset(9, 126, hex('#3a2a2a'));
    for (let k = 0; k < 6; k++) rect(16 + k * 7, 124, 18 + k * 7, 127, [hex('#e8e0d0'), hex('#c83a3a'), hex('#e8c040')][k % 3]);
    linea(3, 116, 14, 136, P.luzCL); linea(4, 116, 15, 136, P.luzCL); rect(61, 116, 64, 142, hex('#5a3a2a')); rect(62, 118, 63, 140, hex('#7a5a3a'));
    rect(0, 137, 60, 142, hex('#4a2a2a'));

    // B · el bar (x 66–150): planta baja de madera verde, piso de ladrillo ocre y la armadura del letrero de la copa
    g_ladrillo(R, 66, 56, 150, 102, hex('#8a6a4a'), hex('#a8845a'), hex('#6a4e36'), hex('#4a3626'), 12);
    rect(66, 52, 150, 56, hex('#5a4a3a')); rect(66, 52, 150, 52, hex('#8a7a6a')); for (let x = 68; x < 150; x += 5) pset(x, 55, hex('#3a2e24'));
    for (const wx of [74, 104, 132]) { rect(wx - 1, 63, wx + 11, 89, P.k); rect(wx, 64, wx + 10, 88, wx === 104 ? P.luzC : P.cristalN); if (wx === 104) { rect(wx, 64, wx + 3, 88, hex('#a83a3a')); rect(wx + 7, 64, wx + 10, 88, hex('#a83a3a')); } else linea(wx + 1, 65, wx + 5, 70, P.cristalNL);
      rect(wx + 5, 64, wx + 5, 88, P.k); rect(wx - 2, 89, wx + 12, 90, hex('#b8a888')); rect(wx - 1, 61, wx + 11, 62, hex('#b8a888')); }
    // la armadura del letrero de la copa sobre el tejado
    for (const x of [94, 124]) { rect(x, 30, x, 52, P.hierro); linea(x, 52, x + (x < 100 ? 8 : -8), 40, P.hierro); }
    rect(90, 24, 128, 25, P.hierro); rect(90, 48, 128, 48, P.hierro);
    // la planta baja: madera verde con paneles, el ventanal (los clientes se pintan en cada fotograma) y la puerta
    rect(66, 102, 150, 142, P.verdeBar); rect(66, 102, 150, 104, P.verdeBarL); rect(66, 105, 150, 105, P.k);
    for (let x = 68; x < 150; x += 8) { rect(x, 136, x + 6, 140, P.verdeBarS); rect(x, 136, x + 6, 136, P.verdeBarL); }
    rect(70, 108, 114, 134, P.k); rect(71, 109, 113, 133, hex('#c87a3a')); g_degradado(R, 71, 109, 113, 133, ['#e8a858', '#c87a3a', '#8a4a2a'].map(hex)); rect(71, 130, 113, 133, hex('#5a2a1a'));
    rect(92, 109, 92, 133, P.k); rect(71, 116, 113, 116, P.k);
    rect(118, 106, 140, 142, P.k); rect(119, 107, 139, 142, hex('#4a2a1e')); rect(119, 107, 128, 141, hex('#5a3424')); rect(130, 107, 139, 141, hex('#5a3424')); rect(129, 107, 129, 142, P.k);
    for (const x0 of [120, 131]) { rect(x0 + 1, 110, x0 + 6, 120, hex('#d89a50')); rect(x0 + 1, 124, x0 + 6, 138, hex('#4a2a1e')); rect(x0 + 1, 124, x0 + 6, 124, hex('#6a4430')); }
    pset(127, 126, hex('#e8c040')); pset(131, 126, hex('#e8c040'));
    // el toldo de la puerta y su farolillo
    poligono([[114, 98], [144, 98], [148, 106], [110, 106]], hex('#7a1a2a')); for (let x = 112; x < 148; x += 4) linea(x + 2, 99, x, 106, hex('#a02a3a')); rect(110, 106, 148, 107, hex('#5a1220'));
    for (let x = 111; x < 148; x += 4) { pset(x, 108, hex('#7a1a2a')); pset(x + 1, 108, hex('#7a1a2a')); }
    rect(144, 112, 146, 117, P.k); rect(145, 113, 145, 116, P.luzCL);

    // el callejón (x 150–166): fondo oscuro, una farolita lejana, la escalera de incendios y cubos
    rect(150, 40, 166, 142, hex('#141226')); for (let y = 40; y < 140; y += 3) for (let x = 150; x < 167; x += 6) pset(x + ((y / 3) & 1) * 3, y, hex('#1c1a32'));
    rect(150, 118, 166, 142, hex('#1a1830')); for (let y = 124; y < 142; y += 4) rect(150, y, 166, y, hex('#22203a'));
    for (let y = 60; y < 110; y += 14) { rect(152, y, 164, y, P.hierroL); linea(152, y, 164, y + 13, P.hierro); }
    rect(154, 112, 160, 120, hex('#2a3a2a')); rect(154, 112, 160, 112, hex('#3a4e3a')); rect(160, 115, 164, 120, hex('#3a3a46'));

    // C · el bloque de pisos (x 166–236): estuco azul verdoso con ladrillo a la vista, cornisa y ventanas
    g_estuco(R, 166, 40, 236, 142, P.estuco, P.estucoL, P.estucoS, 13);
    rect(164, 36, 238, 40, hex('#7a8a90')); rect(164, 36, 238, 36, hex('#a8b8c0')); rect(164, 41, 238, 41, P.k); for (let x = 166; x < 238; x += 4) rect(x, 42, x + 1, 43, hex('#5a6a70'));
    for (const [wx, wy] of [[172, 48], [196, 48], [220, 48], [172, 72], [220, 72]]) { rect(wx - 1, wy - 1, wx + 11, wy + 15, P.k); rect(wx, wy, wx + 10, wy + 14, P.cristalN); rect(wx - 2, wy + 16, wx + 12, wy + 17, hex('#a8b8c0')); rect(wx - 1, wy - 3, wx + 11, wy - 2, hex('#7a8a90')); rect(wx + 5, wy, wx + 5, wy + 14, P.k); rect(wx, wy + 7, wx + 10, wy + 7, P.k); }
    // el portal con escalones y su lámpara
    rect(208, 100, 232, 142, hex('#7a8a90')); rect(210, 102, 230, 141, P.k); rect(211, 103, 229, 109, hex('#e8c878')); for (let x = 213; x < 229; x += 4) linea(220, 109, x, 103, hex('#b89850')); rect(216, 96, 224, 99, hex('#c8a040')); rect(217, 97, 223, 98, hex('#8a6a20'));
    rect(211, 110, 229, 141, hex('#3a2a3a')); rect(212, 112, 219, 139, hex('#4a3448')); rect(221, 112, 228, 139, hex('#4a3448')); rect(213, 114, 218, 124, hex('#6a5a8a')); rect(222, 114, 227, 124, hex('#6a5a8a')); pset(219, 128, hex('#e8c040')); pset(221, 128, hex('#e8c040'));
    rect(206, 141, 234, 143, hex('#8a8a96')); rect(206, 141, 234, 141, hex('#b0b0bc'));
    // la ventana baja con macetero (se pinta su interior en cada fotograma: luz, cortinas y la persiana del gag)
    rect(175, 103, 203, 129, P.k); rect(174, 129, 204, 131, hex('#b0b8c0')); rect(174, 132, 204, 132, P.k); rect(175, 101, 203, 102, hex('#a8b8c0'));
    rect(176, 133, 202, 137, hex('#7a4a2a')); rect(176, 133, 202, 133, hex('#a86a3a')); for (let x = 177; x < 202; x += 3) pset(x, 135, hex('#5a3420'));

    // D · la tienda de discos (x 236–320), con piso alto y depósito
    g_ladrillo(R, 236, 50, 320, 102, hex('#3a3a56'), hex('#4a4a6a'), hex('#2e2e46'), hex('#24243a'), 14, 8, 3);
    rect(236, 46, 320, 50, hex('#5a5a72')); rect(236, 46, 320, 46, hex('#7a7a92')); rect(236, 51, 320, 51, P.k);
    for (const wx of [242, 262, 300]) { rect(wx - 1, 57, wx + 11, 79, P.k); rect(wx, 58, wx + 10, 78, P.cristalN); rect(wx + 5, 58, wx + 5, 78, P.k); rect(wx - 2, 80, wx + 12, 81, hex('#7a7a92')); }
    rect(281, 57, 293, 79, P.k); rect(282, 58, 292, 78, hex('#3a2a4a'));
    rect(236, 102, 320, 142, hex('#2a2a3a')); rect(236, 102, 320, 103, hex('#4a4a5a'));
    for (let x = 240; x < 320; x++) { rect(x, 104, x, 110, ((x >> 2) & 1) ? hex('#e8e0d8') : hex('#a83038')); if ((x & 3) === 1) pset(x, 111, ((x >> 2) & 1) ? hex('#e8e0d8') : hex('#a83038')); } rect(240, 103, 319, 103, P.k);
    rect(242, 114, 318, 140, P.k); rect(244, 116, 316, 136, hex('#d89a58')); g_degradado(R, 244, 116, 316, 121, ['#f0c070', '#d89a58'].map(hex));
    for (let j = 0; j < 2; j++) { rect(244, 125 + j * 9, 316, 125 + j * 9, hex('#6a4a2a')); for (let i = 0; i < 17; i++) rect(246 + i * 4, 118 + j * 9, 248 + i * 4, 124 + j * 9, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#2a2a36'), hex('#5aa86a'), hex('#e87a3a'), hex('#8a4ab0')][(i * 3 + j * 2) % 7]); }
    for (const cx of [262, 298]) { disco(cx, 131, 4, P.k); disco(cx, 131, 3, hex('#2a2a32')); pset(cx, 131, hex('#c83a3a')); }
    linea(246, 116, 256, 136, hex('#f8d8a0')); rect(236, 136, 320, 142, hex('#1e1e2a'));

    // la acera de losas mojadas, el bordillo y el asfalto
    for (let y = 142; y < 158; y++) for (let x = 0; x < 320; x++) { const jx = (x + (y > 149 ? 10 : 0)) % 20 === 0, jy = y === 149; const n = h(x >> 1, y, 185);
      pset(x, y, jx || jy ? P.aceraS : n > 0.9 ? P.aceraL : n < 0.12 ? P.aceraS : P.acera); }
    rect(0, 157, 319, 158, P.bordillo); rect(0, 157, 319, 157, hex('#9a98a8')); rect(0, 159, 319, 159, P.k);
    for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 186); pset(x, y, n > 0.93 ? P.asfL : n < 0.1 ? P.asfS : P.asf); }
    for (let x = 6; x < 320; x += 30) { rect(x, 172, x + 14, 173, hex('#6a5e34')); for (let i = 0; i < 15; i += 4) pset(x + i + 1, 172, hex('#8a7a44')); }
    // grietas, parches de alquitrán y las rodadas brillantes del agua
    for (let k = 0; k < 9; k++) { let x = 10 + h(k, 1, 187) * 300, y = 162 + h(k, 2, 187) * 16; for (let i = 0; i < 9; i++) { const nx = x + 1 + Math.round(h(k, i, 188) * 2), ny = y + Math.round(h(k, i, 189) * 2 - 1); linea(x, y, nx, ny, P.asfS); x = nx; y = Math.max(161, Math.min(179, ny)); } }
    for (const [x0, w] of [[40, 30], [210, 22]]) for (let y = 163; y < 168; y++) for (let x = x0; x < x0 + w; x++) if (h(x, y, 190) < 0.8) pset(x, y, hex('#1e1c28'));
    for (const y of [165, 177]) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 194) < 0.55 && g_b4(x, y) < 0.5) pset(x, y, P.asfL);
    // el gran charco del bordillo, con el morado del cielo
    for (let j = -2; j <= 2; j++) for (let i = -26; i <= 26; i++) if (Math.abs(i) / 26 + Math.abs(j) / 2.8 < 1) pset(120 + i, 163 + j, (i + j * 3) % 7 === 0 ? hex('#5a4a7a') : hex('#3a3058'));
    // charcos en la acera (reflejan el cielo morado)
    for (const [cx, cy, w] of [[86, 154, 14], [232, 148, 10], [30, 151, 8]]) for (let j = -1; j <= 1; j++) for (let i = -w; i <= w; i++) if (Math.abs(i) / w + Math.abs(j) / 1.6 < 1) pset(cx + i, cy + j, g_b4(cx + i, cy + j) < 0.5 ? hex('#4a3a6a') : hex('#3a3058'));
    // la tapa de alcantarilla
    for (let i = -8; i <= 8; i++) { pset(196 + i, 166, hex('#3a3a46')); pset(196 + i, 169, hex('#3a3a46')); } rect(188, 167, 204, 168, hex('#2a2a36')); for (let i = -6; i <= 6; i += 3) pset(196 + i, 167, hex('#4a4a56'));
    // mobiliario: boca de riego, papelera de rejilla, los buzones de periódicos (sin letras)
    rect(242, 144, 248, 154, hex('#c83a2a')); rect(241, 143, 249, 144, hex('#e85a3a')); rect(243, 141, 247, 142, hex('#c83a2a')); rect(240, 147, 250, 148, hex('#a82a20')); rect(243, 145, 244, 153, hex('#e86a4a')); rect(241, 154, 249, 155, hex('#6a2018'));
    rect(54, 138, 64, 154, hex('#3a4a3a')); for (let x = 55; x < 64; x += 2) rect(x, 139, x, 153, hex('#2a3a2a')); rect(53, 137, 65, 138, hex('#5a6a5a')); rect(56, 135, 62, 136, hex('#d8d0c0')); pset(58, 134, hex('#c83a3a'));
    for (const [x, c, cs] of [[140, '#2a5ab0', '#1a3a80'], [148, '#c83a3a', '#8a2424']]) { rect(x, 134, x + 7, 154, hex(c)); rect(x + 1, 136, x + 6, 142, hex('#c8d8e8')); for (let y = 137; y < 142; y += 2) rect(x + 2, y, x + 5, y, hex('#8a98a8')); rect(x, 146, x + 7, 146, hex(cs)); rect(x + 1, 154, x + 1, 156, P.k); rect(x + 6, 154, x + 6, 156, P.k); }
    const m = g_mascara(R, cielo, 112);
    return { mask: m };
  });
  const m = e.mask;
  // estrellas que titilan, luna menguante y una estrella fugaz de vez en cuando
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 191) * 319), y = Math.round(h(k, 2, 191) ** 1.3 * 60); if ((x > 272 && y < 48) || (x < 174 && y < 16) || !m[y * 320 + x]) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 191) * 2) + k); if (tw > -0.4) pset(x, y, tw > 0.5 ? P.blanco : hex('#8a8ab8')); }
  { const lx = 214, ly = 22; R.halo(lx, ly, 14, [hex('#24245a'), hex('#2e2e6a')], 1.0); disco(lx, ly, 6, hex('#f4ecd0')); disco(lx + 3, ly - 1, 5, R.pget(lx + 9, ly - 6)); pset(lx - 3, ly + 2, hex('#d8ccb0')); pset(lx - 4, ly - 1, hex('#d8ccb0')); }
  { const u = (t % 9) / 0.6; if (u < 1) { const x0 = 40 + h(Math.floor(t / 9), 1, 192) * 120, y0 = 20; for (let i = 0; i < 8; i++) { const x = Math.round(x0 + u * 40 - i * 1.6), y = Math.round(y0 + u * 12 - i * 0.5); if (m[y * 320 + x]) pset(x, y, i < 2 ? P.blanco : hex('#8a8ab8')); } } }
  // nubes de noche a tres velocidades
  const NN = [hex('#5a4a7a'), hex('#3a3060'), hex('#2a2450')];
  for (const [x0, y, w, v, s] of [[30, 30, 40, 1.2, 1], [160, 22, 34, 2.1, 2], [250, 40, 28, 0.7, 3], [100, 46, 24, 3, 4]]) g_nube(R, m, ((x0 + t * v) % 380) - 30, y, w, NN, s);
  // la luz roja de la antena y las ventanas lejanas que se encienden y se apagan
  if (Math.floor(t * 1.2) % 2) { pset(36, 29, hex('#ff4a4a')); pset(35, 29, hex('#8a2a3a')); pset(37, 29, hex('#8a2a3a')); }
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 7, 193) * 260), y = 56 + Math.round(h(k, 8, 193) * 30); if (m[y * 320 + x] === 0 && R.pget(x, y) !== P.k && x > 236 && x < 260) pset(x, y, Math.sin(t * 0.5 + k * 2) > 0 ? hex('#f0c870') : hex('#2a2250')); }
  // ventanas de los pisos: unas encendidas con vecinos que pasan, una tele azul, una que se apaga
  const ven = (wx, wy, w, hh, tipo, k) => { const x0 = wx, y0 = wy, x1 = wx + w, y1 = wy + hh; R.recorte([x0, y0, x1, y1]);
    if (tipo === 'luz') { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y < y0 + 3 ? P.luzCL : P.luzC); const p = ((t * 0.12 + k * 0.37) % 1.6) - 0.3, px = Math.round(x0 + p * w); disco(px, y0 + 5, 2, hex('#6a3a2a')); for (let y = y0 + 7; y <= y1; y++) for (let x = px - 2; x <= px + 2; x++) pset(x, y, hex('#7a4a3a')); for (let y = y0; y <= y1; y++) { pset(x0, y, hex('#c84a4a')); pset(x0 + 1, y, hex('#c84a4a')); pset(x1, y, hex('#c84a4a')); pset(x1 - 1, y, hex('#c84a4a')); } }
    else if (tipo === 'tele') { const c = Math.sin(t * 7 + k) > 0.2 ? P.tele : hex('#4a5ab0'); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y > y1 - 4) ? hex('#2a2a4a') : c); }
    R.recorte(null); rect(Math.round((x0 + x1) / 2), y0, Math.round((x0 + x1) / 2), y1, P.k); };
  ven(26, 44, 10, 12, 'luz', 0); ven(6, 68, 10, 12, 'tele', 1); ven(196, 48, 10, 14, 'luz', 2); ven(172, 72, 10, 14, Math.sin(t * 0.3) > -0.6 ? 'luz' : 'oscura', 3); ven(262, 58, 10, 20, 'tele', 4);
  // el letrero vertical de estrellas del edificio A, que se encienden en cadena
  rect(66, 60, 68, 62, P.hierro); rect(67, 64, 79, 100, P.k); rect(68, 65, 78, 99, hex('#2a1430'));
  for (let k = 0; k < 4; k++) { const on = (Math.floor(t * 3) % 6) >= k; g_neon(R, 'estrella', 73, 70 + k * 8, P.ambar, P.ambarD, on ? 1 : 0, 0.42); }
  for (let y = 65; y < 100; y += 2) { pset(67, y, ((y >> 1) + Math.floor(t * 8)) % 3 ? hex('#7a5a3a') : P.ambar); pset(79, y, ((y >> 1) + Math.floor(t * 8) + 1) % 3 ? hex('#7a5a3a') : P.ambar); }
  // la taza de neón de la cafetería (vapor intermitente) y la copa de cóctel del bar sobre el tejado
  const parpa = (p, k) => !((t + k) % p < 0.14 || ((t + k) % p > 0.24 && (t + k) % p < 0.3));
  g_neon(R, 'taza', 32, 92, P.cian, P.cianD, parpa(7.3, 0) ? 1 : 0, 0.9); for (let q = 0; q < 3; q++) { const yy = 82 - ((t * 4 + q * 3) % 6); pset(28 + q * 4 + Math.round(Math.sin(t * 3 + q)), Math.round(yy), P.cian); }
  { const on = parpa(5.1, 1.3); g_neon(R, 'copa', 109, 36, P.rosa, P.rosaD, on ? 1 : 0, 1.2); }
  // el corazón de neón del bloque C, que late
  { const lat = (t * 1.2) % 1 < 0.12 ? 1.08 : 1; g_neon(R, 'corazon', 210, 92, P.rojoN, P.rojoND, 1, 0.72 * lat); }
  // la nota y la flecha de la tienda de discos (la flecha corre en tres tiempos)
  g_neon(R, 'nota', 252, 92, P.verdeN, P.verdeND, parpa(6.1, 2.2) ? 1 : 0, 0.8);
  { const f = Math.floor(t * 3) % 3; for (let i = 0; i < 3; i++) g_neon(R, 'flecha', 272 + i * 14, 93, P.azulN, P.azulND, i <= f ? 1 : 0, 0.55); }
  // los clientes del bar en sombra tras el ventanal, uno que brinda, y el humo del local que pasa
  R.recorte([71, 117, 113, 129]);
  for (const [x, k] of [[78, 0], [88, 1], [100, 2], [108, 3]]) { const by = Math.round(Math.sin(t * 2 + k) * (k === 1 ? 1 : 0.4)); disco(x, 121 + by, 3, hex('#4a2a1e')); for (let y = 124; y <= 129; y++) for (let i = -4; i <= 4; i++) pset(x + i, y + by, hex('#5a321e')); if (k === 2 && (t % 4) < 1.2) { rect(x + 4, 117, x + 5, 121, hex('#f8e0a0')); } }
  R.recorte(null);
  // el callejón: la farolita lejana, un paseante y un coche que cruzan al fondo, vapor
  R.recorte([150, 40, 166, 141]);
  R.halo(158, 100, 10, [hex('#2a2a3a'), hex('#3a3a4a')], 1.0); pset(158, 100, hex('#f8e0a0')); pset(157, 100, hex('#c8a870'));
  { const u = (t % 11) / 11; g_paseante(R, 146 + u * 26, 124, t, [hex('#5a3a4a'), hex('#2a2a3a'), hex('#c8906a')], 8, 1); }
  { const u = ((t + 5) % 13) / 13; g_cochito(R, 190 - u * 70, 128, hex('#e8c040'), -1, true); }
  for (let q = 0; q < 6; q++) { const a = (t * 0.4 + q / 6) % 1, x = 160 + Math.sin(a * 6 + q) * 3, y = 140 - a * 34; if (g_b4(Math.round(x), Math.round(y)) < 0.6 - a * 0.5) disco(x, y, 1 + a * 2.5, hex('#3a3850')); }
  R.recorte(null);
  // la ventana baja: luz con cortinas, una maceta en el alféizar de dentro y la persiana que cae de golpe (o.ventana)
  const cierra = Math.max(0, Math.min(1, o.ventana ?? 0)), baja = Math.round(Math.min(1, cierra * 1.6) * 25);
  rect(176, 104, 202, 128, cierra >= 1 ? hex('#1a1a30') : P.luzC); rect(176, 104, 202, 106, cierra >= 1 ? hex('#1a1a30') : P.luzCL);
  if (cierra < 1) { for (let y = 104; y <= 128; y++) { const ond = Math.round(Math.sin(y * 0.6 + t * 1.5) * 0.6); rect(176, y, 180 + ond, y, hex('#e86a8a')); rect(198 + ond, y, 202, y, hex('#e86a8a')); pset(178, y, hex('#c84a6a')); pset(200, y, hex('#c84a6a')); }
    rect(185, 122, 193, 128, hex('#c8603a')); for (const [dx, dy] of [[0, 0], [-3, -2], [3, -3], [-1, -5], [2, -6]]) disco(189 + dx, 119 + dy, 2, hex('#4a9a4a')); pset(189, 114, hex('#e85a8a')); pset(186, 117, hex('#f0e040')); }
  if (baja > 0) { rect(176, 104, 202, 103 + baja, hex('#c8b890')); for (let y = 105; y < 103 + baja; y += 2) rect(176, y, 202, y, hex('#a89870')); rect(176, 103 + baja, 202, 103 + baja, hex('#6a5a40')); rect(187, 103 + baja, 191, 104 + baja, hex('#6a5a40'));
    if (cierra < 0.9 && cierra > 0.55) for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI, r = 4 + (cierra - 0.55) * 30; pset(Math.round(189 + Math.cos(a) * r * 1.4), Math.round(129 + Math.sin(a) * -r * 0.4), P.blanco); } }
  rect(189, 104, 189, 128, P.k); rect(176, 116, 202, 116, cierra >= 1 ? P.k : hex('#8a6a4a'));
  // las flores del macetero, que se mecen
  for (let k = 0; k < 8; k++) { const x = 178 + k * 3, sw = Math.round(Math.sin(t * 1.8 + k) * 0.8); linea(x, 133, x + sw, 129, hex('#3a7a3a')); pset(x + sw, 128, [hex('#e85a8a'), hex('#f0d040'), hex('#f6f2ea'), hex('#e8803a')][k % 4]); }
  // el farol de la calle con su halo
  g_farola(R, 142, 84, 156, 1); R.halo(150, 88, 22, [hex('#3a3050'), hex('#4a4060')], 0.8); rect(147, 85, 153, 85, hex('#fff0c0'));
  for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.1; pset(Math.round(150 + Math.cos(a) * 5), Math.round(90 + Math.sin(a * 1.3) * 3), hex('#e8e0c0')); }
  // los reflejos de los neones y de las luces en el asfalto mojado, y el barrido de faros
  for (const [x, c, w, k] of [[109, P.rosa, 4, 0], [73, P.ambar, 2, 1], [32, P.cian, 3, 2], [210, P.rojoN, 3, 3], [252, P.verdeN, 2, 4], [286, P.azulN, 4, 5], [150, hex('#fff0c0'), 2, 6], [92, hex('#e8a858'), 5, 7], [280, hex('#d89a58'), 6, 8]]) g_reflejo(R, t, x, 161, 179, g_mezcla(c, P.asf, 0.45), w, k);
  { const u = (t % 8) / 2.2; if (u < 1) { const x = Math.round(-40 + u * 400); for (let y = 160; y < 180; y++) for (let i = -10; i <= 10; i++) if (g_b4(x + i, y) < 0.3 * (1 - Math.abs(i) / 10)) pset(x + i, y, hex('#6a6478')); } }
  // el vapor de la alcantarilla
  for (let q = 0; q < 9; q++) { const a = (t * 0.35 + q / 9) % 1, x = 196 + Math.sin(a * 5 + q) * 4 + a * 8, y = 166 - a * 40; if (y < 120) continue; const r = 1.5 + a * 4; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && g_b4(Math.round(x + i), Math.round(y + j)) < 0.35 * (1 - a)) pset(Math.round(x + i), Math.round(y + j), hex('#8a8498')); }
  // gotas que caen de la cornisa al charco, con su onda
  { const u = (t % 2.3) / 2.3; if (u < 0.6) pset(88, Math.round(112 + u / 0.6 * 42), hex('#9ab0d8')); else { const r = (u - 0.6) * 20; for (let i = -r; i <= r; i++) pset(Math.round(86 + i), 154, Math.abs(Math.abs(i) - r) < 1 ? hex('#7a6a9a') : R.pget(86 + i, 154)); } }
  return { suelo: S, acera: [0, 142, 319, 157], ventana: [175, 103, 203, 129], ventanaPie: [189, S], barPuerta: [118, 106, 140, 142], portal: [210, 102, 230, 141], portalPie: [220, S], callejon: [150, 166], farola: [142, 156], bocaRiego: [245, 155], papelera: [59, 154], buzones: [140, 155], libres: [[18, 50], [164, 240], [252, 316]], neones: { copa: [109, 36], estrellas: [73, 82], taza: [32, 92], corazon: [210, 92], nota: [252, 92], flecha: [286, 93] }, asfalto: [160, 179], luna: [214, 22] };
}

// pájaros pequeños (dos píxeles que aletean) que cruzan el cielo; solo donde la máscara dice cielo
function g_pajaros(R, t, m, n = 4, y0 = 40, v = 22, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 300 + sem) * 360 + t * v * (0.8 + k * 0.1)) % 380) - 30), y = Math.round(y0 + h(k, 2, 300 + sem) * 18 + Math.sin(t * 2 + k) * 2), a = Math.sin(t * 10 + k * 1.7) > 0;
    for (const [dx, dy] of [[0, 0], [-1, a ? -1 : 0], [1, a ? -1 : 0], [-2, a ? -1 : 1], [2, a ? -1 : 1]]) { const X = x + dx, Y = y + dy; if (X >= 0 && X < 320 && Y >= 0 && Y < 180 && m[Y * 320 + X] && !(X > 272 && Y < 48)) R.pset(X, Y, hex('#3a3a4a')); } }
}

// cielo de día tramado con el sol y su halo (lo fijo, en el búfer)
function g_cieloDia(R, y1, sol) {
  g_degradado(R, 0, 0, 319, y1, ['#4a8ad8', '#6aa6e6', '#8ac0f0', '#b0d6f4', '#d0e6f4'].map(hex));
  if (sol) { const [sx, sy, sr] = sol; for (let y = sy - sr - 12; y <= sy + sr + 12; y++) for (let x = sx - sr - 12; x <= sx + sr + 12; x++) { const d = Math.hypot(x - sx, y - sy); if (d > sr && d < sr + 12 && g_b4(x, y) < (1 - (d - sr) / 12) * 0.6) R.pset(x, y, hex('#e8f0d8')); }
    R.disco(sx, sy, sr + 1, hex('#fff4c0')); R.disco(sx, sy, sr, hex('#ffe680')); R.disco(sx - 2, sy - 2, sr * 0.45, hex('#fffad8')); }
}

const g_NUBED = () => [hex('#ffffff'), hex('#e4ecf6'), hex('#b8c8de')];

// un árbol de copa redonda de calle, con luz arriba a la izquierda; m: balanceo
function g_arbol(R, x, suelo, r, t, k = 0) {
  const m = Math.round(Math.sin(t * 0.9 + k) * 1);
  R.rect(x - 1, suelo - r - 6, x + 1, suelo, hex('#5a3a24')); R.pset(x - 1, suelo - r, hex('#7a5a3a'));
  for (const [dx, dy, rr, c] of [[0, -r - 6, r, '#2e6a34'], [-r * 0.6, -r - 2, r * 0.7, '#2e6a34'], [r * 0.6, -r - 3, r * 0.7, '#2e6a34'], [-1, -r - 8, r * 0.8, '#3e8a40'], [-r * 0.35, -r - 10, r * 0.5, '#5aa850']]) R.disco(x + dx + m, suelo + dy, rr, hex(c));
  for (let q = 0; q < r * 3; q++) { const a = h(q, k, 310) * 6.28, d = h(q, k, 311) * r; R.pset(Math.round(x + m + Math.cos(a) * d), Math.round(suelo - r - 6 + Math.sin(a) * d * 0.9), h(q, k, 312) < 0.5 ? hex('#7ac060') : hex('#24542a')); }
}

function g_comisaria(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 152;
  const LAD = [hex('#a8503c'), hex('#c46a50'), hex('#86392c'), hex('#d8c8b0')], PIEDRA = hex('#d8d0bc'), PIEDRAS = hex('#a8a090'), PIEDRAL = hex('#f0ead8');
  const e = g_fondo(R, 'comisaria', () => {
    g_cieloDia(R, 112, [234, 24, 8]); const cielo = R.buf.slice();
    // la ciudad lejana, azulada por la distancia, y una fila de árboles
    for (let x = -4, k = 0; x < 320; k++) { const w = 10 + Math.floor(h(k, 1, 320) * 16); let top = 46 + Math.floor(h(k, 2, 320) * 26); if (x + w > 270) top = Math.max(top, 56);
      rect(x, top, x + w - 1, 112, hex('#a4b8cc')); rect(x, top, x, 112, hex('#b8cadc')); for (let wy = top + 3; wy < 108; wy += 4) for (let wx = x + 2; wx < x + w - 1; wx += 3) pset(wx, wy, h(wx, wy, 321) < 0.5 ? hex('#8aa0b8') : hex('#c8d8e6')); x += w; }
    for (let x = 0; x < 320; x += 7) { const r = 5 + h(x, 1, 322) * 4; disco(x, 108 - r * 0.4, r, hex('#5a8a5a')); disco(x - 1, 106 - r * 0.6, r * 0.6, hex('#7aa870')); }
    // el aparcamiento de la derecha: la valla de malla con sus postes, árboles detrás y la farola del aparcamiento
    g_arbol(R, 236, 118, 9, 0, 1); g_arbol(R, 298, 116, 11, 0, 2);
    rect(214, 104, 320, 132, hex('#8a9a88')); for (let y = 104; y < 132; y++) for (let x = 214; x < 320; x++) if (((x + y) % 4 === 0 || (x - y + 400) % 4 === 0)) pset(x, y, hex('#b8c0c0'));
    for (const x of [214, 240, 266, 292, 318]) { rect(x, 102, x + 1, 132, hex('#7a7a84')); rect(x, 102, x + 1, 102, hex('#c8c8d0')); } rect(214, 104, 320, 104, hex('#9a9aa4'));
    rect(214, 132, 320, 180, hex('#5a5a66')); for (let y = 132; y < 180; y++) for (let x = 214; x < 320; x++) { const n = h(x, y, 323); if (n > 0.9) pset(x, y, hex('#6a6a76')); else if (n < 0.1) pset(x, y, hex('#4a4a56')); }
    // las plazas pintadas en diagonal, los topes y las manchas de aceite
    for (const x0 of [222, 308]) for (let y = 134; y < 180; y++) { const x = Math.round(x0 + (y - 134) * 0.35); rect(x, y, x + 1, y, hex('#e8e4d8')); }
    for (const [cx, cy, r] of [[262, 160, 7], [292, 140, 4], [240, 174, 5]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / 2) ** 2 + j * j < r * r * (0.6 + h(i, j, 324) * 0.5)) pset(cx + i, cy + Math.round(j * 0.5), hex('#3e3e4a'));
    rect(250, 136, 274, 139, hex('#b8b4a8')); rect(250, 136, 274, 136, hex('#d8d4c8')); rect(250, 140, 274, 140, hex('#3a3a46'));
    rect(316, 60, 317, 132, hex('#6a6a74')); rect(306, 58, 317, 60, hex('#6a6a74')); rect(305, 61, 311, 62, hex('#e8e4d0'));
    // la moto de policía aparcada junto a la valla (sin letras)
    { const x = 300, y = 140; disco(x - 6, y - 3, 3, P.k); disco(x + 6, y - 3, 3, P.k); disco(x - 6, y - 3, 1, hex('#b8b8c0')); disco(x + 6, y - 3, 1, hex('#b8b8c0')); rect(x - 5, y - 8, x + 5, y - 5, hex('#f0ece0')); rect(x - 2, y - 9, x + 2, y - 8, hex('#2a2a36')); linea(x + 5, y - 7, x + 7, y - 11, hex('#5a5a66')); rect(x + 6, y - 12, x + 8, y - 11, hex('#e83a3a')); rect(x - 8, y - 9, x - 5, y - 6, hex('#2a3a6a')); }

    g_arbol(R, 2, 140, 10, 0, 7); rect(0, 132, 17, 140, hex('#8a8680')); rect(0, 132, 17, 132, hex('#b0aca4'));
    // la comisaría: ladrillo, cornisa de piedra y pretil
    g_ladrillo(R, 18, 46, 214, 132, LAD[0], LAD[1], LAD[2], LAD[3], 21, 6, 3);
    rect(14, 38, 218, 46, PIEDRA); rect(14, 38, 218, 38, PIEDRAL); rect(14, 45, 218, 46, PIEDRAS); for (let x = 16; x < 218; x += 6) { rect(x, 47, x + 2, 49, PIEDRA); pset(x, 49, PIEDRAS); } rect(14, 47, 218, 47, P.k);
    for (let x = 16; x < 218; x += 10) rect(x, 34, x + 5, 37, PIEDRAS);
    rect(14, 84, 218, 88, PIEDRA); rect(14, 84, 218, 84, PIEDRAL); rect(14, 88, 218, 88, PIEDRAS);
    rect(18, 122, 214, 134, hex('#8a8a92')); for (let x = 18; x < 214; x += 14) rect(x, 122, x, 134, hex('#6a6a74')); rect(18, 122, 214, 122, hex('#b0b0b8'));
    // las ventanas con dintel de piedra y persianas de lamas (la de la oficina, con alguien detrás, se pinta luego)
    const ventana = (x, y) => { rect(x - 2, y - 3, x + 13, y - 1, PIEDRA); rect(x - 2, y - 3, x + 13, y - 3, PIEDRAL); rect(x - 1, y, x + 12, y + 18, P.k); rect(x, y + 1, x + 11, y + 17, hex('#7aa0c0'));
      for (let yy = y + 1; yy < y + 12; yy += 2) { rect(x, yy, x + 11, yy, hex('#e8e4d8')); rect(x, yy + 1, x + 11, yy + 1, hex('#c8c4b8')); } linea(x + 2, y + 13, x + 5, y + 16, hex('#b8d8f0')); rect(x + 6, y + 1, x + 6, y + 17, P.k);
      rect(x - 2, y + 19, x + 13, y + 20, PIEDRA); rect(x - 2, y + 21, x + 13, y + 21, PIEDRAS); };
    for (const x of [26, 48, 70, 150, 172, 194]) { ventana(x, 58); ventana(x, 98); }
    // el aparato de aire acondicionado de una ventana
    rect(170, 115, 185, 121, hex('#c8c4b8')); rect(170, 115, 185, 115, hex('#e8e4d8')); for (let x = 172; x < 184; x += 2) rect(x, 117, x, 120, hex('#8a8680'));
    // el cuerpo de la entrada: piedra, pilastras, el reloj y la puerta doble de cristal
    rect(90, 44, 142, 134, PIEDRA); for (let y = 46; y < 134; y += 6) rect(90, y, 142, y, PIEDRAS); for (const x of [90, 136]) { rect(x, 44, x + 6, 134, PIEDRAL); rect(x + 6, 44, x + 6, 134, PIEDRAS); for (let y = 48; y < 134; y += 8) rect(x, y, x + 6, y, PIEDRAS); }
    rect(86, 40, 146, 46, PIEDRA); rect(86, 40, 146, 40, PIEDRAL); poligono([[96, 40], [136, 40], [116, 30]], PIEDRA); linea(96, 40, 116, 30, PIEDRAL); linea(116, 30, 136, 40, PIEDRAS); disco(116, 36, 2, PIEDRAS);
    disco(116, 66, 9, P.k); disco(116, 66, 8, hex('#c8a040')); disco(116, 66, 7, hex('#f6f2e2')); for (let k = 0; k < 12; k++) pset(Math.round(116 + Math.cos(k * Math.PI / 6) * 6), Math.round(66 + Math.sin(k * Math.PI / 6) * 6), hex('#5a5a5a'));
    rect(100, 94, 132, 98, PIEDRAS); rect(98, 98, 134, 134, P.k); rect(100, 100, 132, 105, hex('#5a7a9a')); for (let x = 104; x < 132; x += 5) rect(x, 100, x, 105, P.k);
    for (const x0 of [100, 117]) { rect(x0, 107, x0 + 15, 134, hex('#4a5a6a')); rect(x0 + 1, 108, x0 + 14, 132, hex('#6a8aa8')); g_degradado(R, x0 + 1, 108, x0 + 14, 132, ['#9ab8d0', '#6a8aa8', '#4a6a88'].map(hex)); linea(x0 + 2, 110, x0 + 9, 128, hex('#c8e0f0')); linea(x0 + 3, 110, x0 + 10, 128, hex('#b0d0e8')); rect(x0 + (x0 < 110 ? 13 : 1), 118, x0 + (x0 < 110 ? 13 : 1), 124, hex('#d8c070')); }
    rect(116, 107, 116, 134, P.k);
    // la escalinata de cuatro peldaños que se ensanchan y sus barandillas
    for (let s = 0; s < 4; s++) { const y = 134 + s * 4, x0 = 94 - s * 5, x1 = 138 + s * 5; rect(x0, y, x1, y + 3, hex('#c8c4b8')); rect(x0, y, x1, y, hex('#e8e4d8')); rect(x0, y + 3, x1, y + 3, hex('#8a8680')); for (let x = x0 + 3; x < x1; x += 9) pset(x, y + 2, hex('#a8a498')); }
    for (const [xa, xb] of [[92, 76], [140, 156]]) { linea(xa, 124, xb, 140, hex('#c8a040')); linea(xa, 125, xb, 141, hex('#8a6a20')); rect(xa, 124, xa, 134, hex('#8a6a20')); rect(xb, 140, xb, 150, hex('#8a6a20')); }
    // los faroles azules a los lados de la puerta
    for (const x of [84, 148]) { rect(x, 112, x + 1, 150, hex('#2a2a36')); rect(x - 2, 148, x + 3, 150, hex('#2a2a36')); disco(x + 0.5, 108, 4, P.k); disco(x + 0.5, 108, 3, hex('#4a7ad8')); pset(x - 1, 106, hex('#a8c8f8')); rect(x - 2, 112, x + 3, 113, hex('#2a2a36')); }
    // los setos en sus jardineras, con hojas de dos tonos
    for (const [x0, x1] of [[20, 74], [158, 212]]) { rect(x0, 130, x1, 138, hex('#8a8680')); rect(x0, 130, x1, 130, hex('#b0aca4')); for (let x = x0 + 2; x < x1 - 1; x += 5) { disco(x, 126, 4, hex('#2e6a34')); disco(x - 1, 125, 3, hex('#3e8a40')); } for (let q = 0; q < (x1 - x0) * 1.5; q++) pset(x0 + 1 + Math.floor(h(q, x0, 325) * (x1 - x0 - 2)), 122 + Math.floor(h(q, 1, 325) * 7), h(q, 2, 325) < 0.5 ? hex('#6ab060') : hex('#24542a')); }
    // la acera, el bordillo y el asfalto de la calle
    for (let y = 140; y < 158; y++) for (let x = 0; x < 214; x++) { const jx = (x + (y > 149 ? 9 : 0)) % 18 === 0, jy = y === 149, n = h(x >> 1, y, 326); pset(x, y, jx || jy ? hex('#9a968e') : n > 0.92 ? hex('#d8d4ca') : n < 0.08 ? hex('#a8a49a') : hex('#c4c0b6')); }
    rect(0, 157, 214, 158, hex('#d8d4ca')); rect(0, 159, 214, 159, hex('#6a6a72'));
    for (let y = 160; y < 180; y++) for (let x = 0; x < 214; x++) { const n = h(x, y, 327); pset(x, y, n > 0.92 ? hex('#6a6a76') : n < 0.1 ? hex('#4a4a56') : hex('#5a5a66')); }
    for (let x = 8; x < 214; x += 32) rect(x, 171, x + 16, 172, hex('#e8c840'));
    // grietas, un parche de alquitrán, la tapa de registro y la rejilla del bordillo
    for (let k = 0; k < 7; k++) { let x = 10 + h(k, 1, 328) * 190, y = 162 + h(k, 2, 328) * 15; for (let i = 0; i < 8; i++) { const nx = x + 1 + Math.round(h(k, i, 329) * 2), ny = Math.max(161, Math.min(179, y + Math.round(h(k, i, 330) * 2 - 1))); linea(x, y, nx, ny, hex('#4a4a56')); x = nx; y = ny; } }
    for (let y = 163; y < 168; y++) for (let x = 120; x < 150; x++) if (h(x, y, 331) < 0.8) pset(x, y, hex('#4e4e5a'));
    for (let j = -2; j <= 2; j++) for (let i = -7; i <= 7; i++) if ((i / 7) ** 2 + (j / 2.4) ** 2 <= 1) pset(60 + i, 175 + j, Math.abs(j) === 2 || (i + 40) % 3 === 0 ? hex('#3a3a46') : hex('#6a6a76'));
    rect(186, 158, 198, 160, hex('#2a2a36')); for (let x = 187; x < 198; x += 2) pset(x, 159, hex('#5a5a66'));
    // la entrada al aparcamiento: el bordillo rebajado
    rect(214, 157, 222, 159, hex('#a8a49a'));
    // el buzón azul y el teléfono de la esquina (sin letras)
    { const x = 168; rect(x, 136, x + 10, 152, hex('#2a4a9a')); disco(x + 5, 136, 5, hex('#2a4a9a')); rect(x, 136, x + 10, 136, hex('#3a5ab0')); rect(x + 2, 138, x + 8, 139, P.k); rect(x + 1, 152, x + 2, 155, P.k); rect(x + 8, 152, x + 9, 155, P.k); rect(x + 3, 144, x + 7, 147, hex('#e8e4d8')); }
    { const x = 202; rect(x, 118, x + 1, 155, hex('#5a5a66')); rect(x - 4, 122, x + 5, 136, hex('#4a6a8a')); rect(x - 3, 123, x + 4, 135, hex('#c8c8d0')); rect(x - 2, 125, x + 3, 129, hex('#2a2a36')); rect(x - 4, 120, x + 5, 121, hex('#3a3a46')); }
    // el mástil de la bandera (la bandera ondea en cada fotograma)
    rect(10, 24, 11, 150, hex('#c8c8d0')); rect(12, 24, 12, 150, hex('#8a8a94')); disco(10.5, 23, 1.5, hex('#e8c840')); rect(7, 148, 14, 150, hex('#8a8a94'));
    return { mask: g_mascara(R, cielo, 112) };
  });
  const m = e.mask;
  for (const [x0, y, w, v, s] of [[20, 26, 38, 1.5, 1], [150, 18, 46, 0.8, 2], [90, 44, 26, 2.6, 3], [260, 60, 30, 1.1, 4]]) g_nube(R, m, ((x0 + t * v) % 400) - 40, y, w, g_NUBED(), s);
  g_pajaros(R, t, m, 4, 30, 18, 1);
  // la bandera que ondea (franjas y el cuadro azul con puntos blancos)
  for (let i = 0; i < 22; i++) { const ond = Math.round(Math.sin(t * 5 - i * 0.45) * (i / 22) * 2.2); for (let j = 0; j < 13; j++) { const y = 25 + j + ond, x = 13 + i; let c = Math.floor(j / 2) % 2 ? hex('#f6f2ea') : hex('#c83a3a'); if (i < 9 && j < 7) c = (i + j) % 3 === 0 && i > 0 && j > 0 ? hex('#f6f2ea') : hex('#2a3a7a'); if (Math.sin(t * 5 - i * 0.45) > 0.6 && c !== hex('#2a3a7a')) c = g_mezcla(c, 0, 0.15); pset(x, y, c); } }
  // las agujas del reloj (marcan una hora que avanza deprisa) y alguien que pasa tras las persianas
  { const a = t * 0.5 - Math.PI / 2, b = t * 0.04 - Math.PI / 2; linea(116, 66, Math.round(116 + Math.cos(a) * 5), Math.round(66 + Math.sin(a) * 5), P.k); linea(116, 66, Math.round(116 + Math.cos(b) * 3), Math.round(66 + Math.sin(b) * 3), P.k); pset(116, 66, hex('#c83a3a')); }
  R.recorte([150, 99, 161, 115]); { const x = Math.round(146 + ((t * 4) % 24)); disco(x, 104, 2, hex('#3a2a2a')); for (let y = 106; y < 116; y++) for (let i = -2; i <= 2; i++) pset(x + i, y, hex('#2a3a6a')); } R.recorte(null);
  for (let yy = 99; yy < 110; yy += 2) rect(150, yy, 161, yy, hex('#e8e4d8'));
  // la gota del aire acondicionado y su mancha en la acera
  { const u = (t % 1.7) / 1.7; pset(177, Math.round(122 + u * 28), hex('#9ac8f0')); }
  // las palomas que picotean en la escalinata y una que echa a volar
  for (const [x, y, k] of [[104, 146, 0], [124, 142, 1]]) { const pic = Math.sin(t * 4 + k * 2) > 0.5; rect(x, y - 2, x + 3, y - 1, hex('#7a7a8a')); pset(x + 4, y - (pic ? 1 : 3), hex('#5a5a6a')); pset(x + 4, y - 2, hex('#5a5a6a')); pset(x + 5, y - (pic ? 0 : 3), hex('#e8a040')); pset(x + 1, y, hex('#c86a4a')); pset(x + 3, y, hex('#c86a4a')); pset(x + 1, y - 3, hex('#9a9aa8')); }
  { const u = (t % 12) / 3; if (u < 1) { const x = Math.round(70 + u * 120), y = Math.round(140 - u * 90 + Math.sin(u * 20) * 2), a = Math.sin(t * 14) > 0; rect(x, y, x + 2, y, hex('#7a7a8a')); pset(x - 1, y + (a ? -1 : 1), hex('#9a9aa8')); pset(x + 3, y + (a ? -1 : 1), hex('#9a9aa8')); } }
  // un coche que pasa por la calle de detrás de la valla y las hojas de los árboles que se mueven
  R.recorte([214, 104, 319, 131]); { const u = (t % 9) / 9; g_cochito(R, 200 + u * 140, 128, hex('#3a6ab0'), 1, false); } R.recorte(null);
  for (const [x, y] of [[236, 104], [298, 100]]) for (let q = 0; q < 6; q++) pset(Math.round(x - 6 + q * 2 + Math.sin(t * 2 + q) * 1), Math.round(y - 8 + (q % 3)), q % 2 ? hex('#7ac060') : hex('#24542a'));
  return { suelo: S, acera: [0, 140, 213, 157], puerta: [100, 107, 132, 134], escalinata: { arriba: [96, 134, 136], abajo: [79, 150, 153] }, faroles: [84, 148], reloj: [116, 66], bandera: [10, 24], buzon: [173, 152], telefono: [202, 155], aparcamiento: [214, 132, 319, 179], plaza: { x: 266, suelo: 172, x0: 226, x1: 312 }, detrasCoche: 160, delanteCoche: 178, sol: [234, 24], libres: [[20, 76], [150, 166], [226, 312]] };
}

function g_aparcamiento(R, t, o, noche) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 166;
  const e = g_fondo(R, noche ? 'aparcaN' : 'aparcaD', () => {
    if (noche) g_degradado(R, 0, 0, 319, 60, ['#0e1232', '#161a42', '#22245a', '#30306a'].map(hex)); else g_cieloDia(R, 60, null);
    const cielo = R.buf.slice();
    // la calle de fondo por la derecha (tras la valla): una casa de madera, árboles y la acera de enfrente
    rect(236, 62, 320, 120, hex('#c8b890')); for (let y = 64; y < 120; y += 3) rect(236, y, 320, y, hex('#b0a078')); poligono([[230, 63], [326, 63], [304, 48], [252, 48]], hex('#7a4a3a')); for (let y = 50; y < 63; y += 3) linea(252 - (y - 48) * 1.5, y, 304 + (y - 48) * 1.5, y, hex('#6a3a2e')); rect(286, 46, 292, 52, hex('#8a5a4a'));
    for (const x of [248, 290]) { rect(x - 1, 68, x + 13, 88, hex('#f0ead8')); rect(x, 69, x + 12, 87, hex('#5a7a98')); rect(x + 6, 69, x + 6, 87, hex('#f0ead8')); rect(x, 78, x + 12, 78, hex('#f0ead8')); }
    rect(268, 92, 280, 120, hex('#6a3a2a')); rect(270, 94, 278, 104, hex('#8a5a3a'));
    g_arbol(R, 250, 120, 13, 0, 5); g_arbol(R, 312, 118, 10, 0, 6);
    rect(236, 120, 320, 124, hex('#b8b4aa')); rect(236, 125, 320, 132, hex('#5a5a66'));
    // la valla de malla
    for (let y = 92; y < 133; y++) for (let x = 238; x < 320; x++) if ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) pset(x, y, hex('#a8b0b0'));
    for (const x of [238, 266, 294]) { rect(x, 90, x + 1, 134, hex('#7a7a84')); pset(x, 90, hex('#d8d8e0')); } rect(238, 92, 320, 92, hex('#8a8a94'));
    // el muro lateral de la comisaría: ladrillo grande, cornisa de piedra
    g_ladrillo(R, 0, 36, 236, 132, hex('#a8503c'), hex('#c46a50'), hex('#86392c'), hex('#d8c8b0'), 41, 10, 5);
    rect(0, 30, 238, 36, hex('#d8d0bc')); rect(0, 30, 238, 30, hex('#f0ead8')); rect(0, 36, 238, 37, hex('#a8a090')); for (let x = 2; x < 238; x += 8) rect(x, 38, x + 3, 40, hex('#d8d0bc'));
    rect(232, 36, 237, 132, hex('#86392c')); rect(237, 30, 237, 132, P.k);
    rect(0, 120, 236, 132, hex('#8a8a92')); rect(0, 120, 236, 120, hex('#b0b0b8')); for (let x = 0; x < 236; x += 16) rect(x, 121, x, 132, hex('#6a6a74'));
    // el portón del garaje: lamas metálicas con luz y sombra, el número encima y su lámpara
    rect(14, 58, 92, 132, hex('#d8d0bc')); rect(18, 62, 88, 132, P.k); for (let y = 63; y < 132; y += 4) { rect(19, y, 87, y + 2, hex('#a8acb4')); rect(19, y, 87, y, hex('#d0d4dc')); rect(19, y + 3, 87, y + 3, hex('#6a6e78')); }
    for (let y = 63; y < 132; y++) for (let x = 19; x < 88; x++) if (h(x >> 1, y, 401) < 0.06) pset(x, y, hex('#8a7a6a'));
    rect(50, 124, 56, 126, hex('#4a4e58')); rect(19, 128, 87, 131, hex('#5a5e68'));
    // la puerta de servicio de acero con su ventanuco, la luz verde de salida y la lámpara de pared
    rect(116, 84, 142, 132, hex('#d8d0bc')); rect(119, 87, 139, 132, P.k); rect(120, 88, 138, 132, hex('#5a7a8a')); rect(120, 88, 138, 88, hex('#7a9aaa')); rect(124, 92, 134, 102, P.k); rect(125, 93, 133, 101, hex('#2a3a4a')); for (let k = 0; k < 4; k++) linea(125 + k * 3, 93, 125 + k * 3 + 4, 101, hex('#3a4a5a'));
    rect(134, 110, 137, 112, hex('#c8c8d0')); rect(120, 118, 138, 118, hex('#4a6a7a'));
    rect(124, 78, 134, 82, P.k); rect(125, 79, 133, 81, hex('#3ac86a'));
    // las ventanas de las oficinas con persianas (alguien pasa por detrás: se pinta luego)
    for (const x of [160, 196]) { rect(x - 2, 50, x + 27, 52, hex('#d8d0bc')); rect(x - 1, 53, x + 26, 84, P.k); rect(x, 54, x + 25, 83, hex('#8ab0d0')); rect(x - 2, 85, x + 27, 87, hex('#d8d0bc')); rect(x - 2, 88, x + 27, 88, hex('#a8a090')); }
    // la bajante, la manguera enrollada y el cuadro eléctrico
    rect(150, 36, 152, 132, hex('#7a7a84')); rect(150, 36, 150, 132, hex('#a8a8b0')); for (let y = 44; y < 132; y += 18) rect(149, y, 153, y + 1, hex('#5a5a66')); rect(148, 128, 156, 132, hex('#7a7a84'));
    rect(102, 94, 106, 98, hex('#5a5a66')); disco(104, 104, 7, hex('#2a6a3a')); for (let k = 0; k < 4; k++) R.anillo(104, 104, 2.5 + k * 1.3, k % 2 ? hex('#3a8a4a') : hex('#1e4e2a')); disco(104, 104, 2, hex('#5a5a66')); for (let i = 0; i <= 20; i++) { const a = i / 20; pset(Math.round(110 + Math.sin(a * 3) * 4), Math.round(106 + a * 24), hex('#2a6a3a')); pset(Math.round(111 + Math.sin(a * 3) * 4), Math.round(106 + a * 24), hex('#3a8a4a')); } rect(112, 128, 118, 129, hex('#c8a040'));
    rect(176, 98, 190, 116, hex('#9a9aa4')); rect(177, 99, 189, 115, hex('#b8b8c0')); rect(182, 104, 184, 108, hex('#e8c840')); linea(183, 116, 183, 132, hex('#5a5a66'));
    // el suelo: asfalto con textura, las plazas pintadas, topes, rejilla, charco y manchas de aceite
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 402), g = h(x >> 3, y >> 2, 403); pset(x, y, n > 0.93 ? hex('#7a7a86') : n < 0.08 ? hex('#4a4a56') : g < 0.2 ? hex('#5e5e6a') : hex('#64646f')); }
    for (let x = 0; x < 320; x++) pset(x, 132, hex('#4a4a56'));
    for (const x0 of [40, 116, 194, 270]) { const pts = [[x0, 136], [x0 + 2, 136], [x0 + 22, 180], [x0 + 18, 180]]; poligono(pts, hex('#e8e4d8')); for (let y = 140; y < 180; y += 5) pset(Math.round(x0 + (y - 136) * 0.43 + 1), y, hex('#b8b4a8')); }
    for (const x of [68, 146, 224]) { rect(x, 136, x + 24, 140, hex('#b8b4a8')); rect(x, 136, x + 24, 136, hex('#d8d4c8')); rect(x, 141, x + 24, 141, hex('#3a3a46')); }
    for (const [cx, cy, r] of [[90, 162, 7], [154, 168, 9], [250, 150, 5], [24, 174, 6]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / 2) ** 2 + j * j < r * r * (0.5 + h(i, j, 404) * 0.6)) pset(cx + i, cy + Math.round(j * 0.5), (i + j) % 5 === 0 ? hex('#4a3e5a') : hex('#3e3e4a'));
    rect(286, 160, 306, 166, hex('#3a3a46')); for (let x = 287; x < 306; x += 2) rect(x, 161, x, 165, hex('#22222c'));
    // el charco, que refleja el cielo (se ondula en cada fotograma)
    for (let j = -3; j <= 3; j++) for (let i = -22; i <= 22; i++) if (Math.abs(i) / 22 + Math.abs(j) / 3.6 < 1) pset(212 + i, 172 + j, noche ? hex('#2a2e5a') : hex('#8ab8e0'));
    // el neumático viejo apoyado en el muro y el bidón
    disco(20, 140, 9, hex('#22222a')); disco(20, 140, 5, hex('#5a5a66')); disco(20, 140, 4, hex('#3a3a46')); for (let k = 0; k < 10; k++) pset(Math.round(20 + Math.cos(k * 0.63) * 7), Math.round(140 + Math.sin(k * 0.63) * 7), hex('#3a3a46'));
    rect(224, 112, 234, 132, hex('#2a5a9a')); for (const y of [116, 124]) rect(224, y, 234, y, hex('#1e4478')); rect(224, 112, 234, 112, hex('#4a7ab8')); rect(226, 113, 227, 131, hex('#4a7ab8'));
    if (noche) { const B = R.buf; for (let i = 0; i < 320 * 180; i++) if (!(i < 320 * 60 && B[i] === cielo[i])) B[i] = g_mezcla(B[i], hex('#141a3a'), 0.55); }
    return { mask: g_mascara(R, cielo, 60) };
  });
  const m = e.mask;
  if (noche) { for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 405) * 319), y = Math.round(h(k, 2, 405) * 28); if (m[y * 320 + x] && !(x > 272 && y < 48) && !(x < 174 && y < 16) && Math.sin(t * 2 + k) > -0.3) pset(x, y, k % 3 ? hex('#8a8ab8') : P.blanco); }
    for (const [x0, y, w, v, s] of [[40, 18, 36, 1.2, 1], [190, 24, 30, 2, 2]]) g_nube(R, m, ((x0 + t * v) % 380) - 30, y, w, [hex('#4a4a7a'), hex('#34345e'), hex('#262850')], s); }
  else { for (const [x0, y, w, v, s] of [[20, 16, 40, 1.4, 1], [170, 10, 50, 0.8, 2], [110, 26, 24, 2.5, 3]]) g_nube(R, m, ((x0 + t * v) % 400) - 40, y, w, g_NUBED(), s); g_pajaros(R, t, m, 3, 8, 20, 2); }
  // alguien que pasa tras las persianas de las oficinas (recortado al cristal), y las lamas
  R.recorte([160, 54, 185, 83]); { const x = Math.round(150 + ((t * 5) % 80)); disco(x, 62, 3, hex('#3a2a2a')); for (let y = 65; y < 84; y++) for (let i = -3; i <= 3; i++) pset(x + i, y, hex('#2a3a6a')); } R.recorte(null);
  R.recorte([196, 54, 221, 83]); { const x = Math.round(186 + ((t * 5) % 80)); disco(x, 62, 3, hex('#3a2a2a')); for (let y = 65; y < 84; y++) for (let i = -3; i <= 3; i++) pset(x + i, y, hex('#2a3a6a')); } R.recorte(null);
  for (const x of [160, 196]) { for (let y = 54; y < 76; y += 2) { rect(x, y, x + 25, y, noche ? hex('#8a8466') : hex('#e8e4d8')); rect(x, y + 1, x + 25, y + 1, noche ? hex('#5a5a5a') : hex('#c8c4b8')); } rect(x + 12, 54, x + 13, 83, P.k); }
  // la luz de la lámpara de pared (de noche, con su halo y polillas) y la luz verde de salida que zumba
  if (noche) { R.halo(129, 72, 40, [hex('#3e3440'), hex('#5e4a44'), hex('#86684a')], 0.75); for (let k = 0; k < 4; k++) { const a = t * 4 + k * 1.6; pset(Math.round(129 + Math.cos(a) * 6), Math.round(68 + Math.sin(a * 1.4) * 4), hex('#e8e0c0')); } R.halo(306, 62, 30, [hex('#2a2a40'), hex('#3a3a50')], 0.8); }
  rect(124, 66, 134, 70, P.k); rect(125, 67, 133, 69, noche ? hex('#fff0c0') : hex('#e8e0c0')); rect(128, 70, 130, 72, P.k); rect(125, 79, 133, 81, Math.sin(t * 30) > -0.9 ? hex('#3ac86a') : hex('#2a8a4a'));
  // el reflejo del charco que tiembla, y coches que pasan por la calle de fondo
  for (let i = -18; i <= 18; i += 3) { const y = 172 + Math.round(Math.sin(t * 2 + i * 0.4)); if (g_b4(212 + i, y) < 0.5) pset(212 + i, y, noche ? hex('#4a4e8a') : hex('#c8e0f8')); }
  R.recorte([238, 92, 319, 131]); { const u = (t % 7) / 7; g_cochito(R, 230 + u * 110, 130, hex('#c83a3a'), 1, noche); const v = ((t + 3.5) % 10) / 10; g_cochito(R, 340 - v * 120, 131, hex('#e8e0c8'), -1, noche); } R.recorte(null);
  // las hojas que caen del árbol de fondo
  for (let k = 0; k < 3; k++) { const u = ((t * 0.2 + k / 3) % 1), x = Math.round(250 + Math.sin(t + k * 2) * 8 + u * 20), y = Math.round(110 + u * 60); pset(x, y, k % 2 ? hex('#c8a040') : hex('#7ab050')); }
  return { suelo: S, plaza: { x: 155, suelo: S, x0: 118, x1: 210 }, detrasCoche: 152, delanteCoche: 176, porton: [18, 62, 88, 132], puerta: [119, 87, 139, 132], puertaPie: [129, S], lampara: [129, 68], ventanas: [[160, 54, 185, 83], [196, 54, 221, 83]], charco: [212, 172], rejilla: [296, 163], valla: [238, 92, 319, 132], libres: [[30, 110], [118, 210], [240, 316]] };
}

// tablas de madera horizontales con vetas, juntas escalonadas y brillos
function g_tablas(R, x0, y0, x1, y1, c, cS, cL, k = 0, alto = 4) {
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / alto), jy = (y - y0) % alto === alto - 1;
    for (let x = x0; x <= x1; x++) { if (jy) { R.pset(x, y, cS); continue; } const off = Math.floor(h(f, 0, k) * 40), jx = (x + off) % 44 === 0; const v = Math.sin((x + off) * 0.25 + f * 3 + h(f, 1, k) * 6) + h(x >> 2, y, k + 1) * 0.6; R.pset(x, y, jx ? cS : v > 1.2 ? cL : v < -0.9 ? cS : c); } }
}

// un libro de lomo (w × alto) con su banda y su brillo
function g_lomo(R, x, yb, w, alto, c) { R.rect(x, yb - alto, x + w - 1, yb, c); R.rect(x, yb - alto, x, yb, g_mezcla(c, 0xffffffff, 0.3)); R.rect(x, yb - alto + 2, x + w - 1, yb - alto + 2, g_mezcla(c, 0xff40d0e8, 0.5)); if (alto > 7) R.rect(x, yb - 3, x + w - 1, yb - 3, g_mezcla(c, 0, 0.35)); }

const g_LIBROS = ['#a83a3a', '#3a5a9a', '#4a8a4a', '#d8a840', '#6a3a7a', '#2a2a36', '#c86a3a', '#e8e0c8', '#3a7a7a'];

// un gato negro sentado de frente (ojos amarillos que parpadean, cola que se mueve); levanta (0–1): la cabeza arriba
function g_gatoNegro(R, x, suelo, t, levanta = 1) {
  const N = hex('#16141e'), NL = hex('#2e2a3a'), cy = suelo - 9 - Math.round(levanta * 2);
  R.disco(x, suelo - 4, 4.5, N); R.rect(x - 4, suelo - 2, x + 4, suelo, N); R.pset(x - 2, suelo - 6, NL); R.pset(x - 3, suelo - 4, NL);
  R.disco(x, cy, 3.5, N); R.pset(x - 3, cy - 4, N); R.pset(x - 2, cy - 4, N); R.pset(x + 3, cy - 4, N); R.pset(x + 2, cy - 4, N); R.pset(x - 3, cy - 3, NL);
  const parp = (t % 4.1) < 0.15; if (levanta > 0.4) { R.pset(x - 1, cy, parp ? N : hex('#f0d040')); R.pset(x + 1, cy, parp ? N : hex('#f0d040')); } else { R.pset(x - 1, cy + 1, NL); R.pset(x + 1, cy + 1, NL); }
  R.pset(x, cy + 2, hex('#c86a7a'));
  for (let i = 1; i <= 7; i++) R.pset(x + 4 + Math.round(i * 0.7), Math.round(suelo - 1 - i * 0.9 + Math.sin(t * 2.4 - i * 0.5) * (i / 7) * 2.2), N);
}

// un farol de gas de pared con su brazo de hierro, la llama que titila y su halo (lo pinta en cada fotograma)
function g_farolGas(R, x, y, t, k = 0, brazo = -1) {
  const fl = Math.sin(t * 13 + k) * 0.5 + Math.sin(t * 7.3 + k * 2) * 0.5;
  R.halo(x, y, 26 + fl * 2, [hex('#3a2e3a'), hex('#5a4038'), hex('#8a6440')], 0.85);
  if (brazo) { R.linea(x, y - 9, x - 9 * brazo, y - 9, g_P.hierro); R.linea(x - 9 * brazo, y - 9, x - 9 * brazo, y - 2, g_P.hierro); R.linea(x - 4 * brazo, y - 9, x - 9 * brazo, y - 4, g_P.hierro); }
  R.rect(x - 4, y - 8, x + 4, y - 7, g_P.k); R.pset(x, y - 10, g_P.k); R.pset(x, y - 9, g_P.k);
  R.rect(x - 3, y - 6, x + 3, y + 3, hex('#f8d888')); R.rect(x - 2, y - 5, x + 2, y + 2, hex('#fff2c0')); R.rect(x, y - 6, x, y + 3, g_P.k); R.rect(x - 4, y + 4, x + 4, y + 4, g_P.k); R.rect(x - 3, y - 6, x - 3, y + 3, g_P.k); R.rect(x + 3, y - 6, x + 3, y + 3, g_P.k);
  R.pset(x - 1, y - 1 - Math.round(fl), hex('#ffffff')); R.pset(x + 1, y, hex('#ffb84a'));
  for (let q = 0; q < 3; q++) { const a = t * (3 + q) + q * 2 + k; R.pset(Math.round(x + Math.cos(a) * (6 + q * 2)), Math.round(y - 2 + Math.sin(a * 1.3) * 4), hex('#e8e0c0')); }
}

// barandilla de hierro forjado (hierro de Nueva Orleans): barrotes, volutas y pasamanos, de x0 a x1 con la base en yb
function g_barandilla(R, x0, x1, yb, alto, c, cL) {
  R.rect(x0, yb - alto, x1, yb - alto + 1, c); R.rect(x0, yb - alto, x1, yb - alto, cL); R.rect(x0, yb - 1, x1, yb, c);
  for (let x = x0; x <= x1; x += 2) R.rect(x, yb - alto + 2, x, yb - 2, c);
  for (let x = x0 + 4; x < x1 - 2; x += 8) { R.anillo(x, yb - alto + 5, 2.2, c); R.anillo(x + 4, yb - 4, 1.8, c); R.pset(x, yb - alto + 4, cL); }
}

// helecho colgante en su maceta que se mece
function g_helecho(R, x, y, t, k = 0) {
  const m = Math.sin(t * 1.3 + k) * 1.5;
  R.linea(x, y - 6, x, y, g_P.k); R.rect(x - 3, y, x + 3, y + 3, hex('#a85a3a')); R.rect(x - 3, y, x + 3, y, hex('#c87a4a'));
  for (let q = 0; q < 9; q++) { const a = Math.PI * (0.15 + q / 8 * 0.7), L = 5 + (q % 3) * 2; for (let s = 1; s <= L; s++) { const px = x + Math.cos(a) * s * (q < 4 ? -1 : 1) * (q === 4 ? 0 : 1) + m * s / L, py = y + 2 + Math.sin(a) * s * 0.9; R.pset(Math.round(px), Math.round(py), s > L - 2 ? hex('#7ac060') : q % 2 ? hex('#3a8a3a') : hex('#2a6a2a')); } }
}

function g_bar(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 166;
  const e = g_fondo(R, 'bar', () => {
    // el techo de chapa prensada (oscuro, tranquilo bajo la barra del año) y las vigas
    rect(0, 0, 319, 10, hex('#241618')); for (let x = 0; x < 320; x += 8) for (let y = 1; y < 10; y += 4) { pset(x + 3, y + 1, hex('#2e1e20')); pset(x + 4, y + 2, hex('#1c1012')); } rect(0, 10, 319, 12, hex('#3a2418')); rect(0, 10, 319, 10, hex('#5a3a24'));
    // el papel pintado de damasco
    for (let y = 13; y < 96; y++) for (let x = 0; x < 320; x++) { const lx = x % 12, ly = (y + (Math.floor(x / 12) & 1) * 7) % 14, d = Math.abs(lx - 6) / 6 + Math.abs(ly - 7) / 7, borde = d > 0.62 && d < 0.8, flor = d < 0.3 && (lx + ly) % 2 === 0; pset(x, y, borde || flor ? hex('#5a2232') : (h(x >> 3, y >> 3, 501) < 0.2 && g_b4(x, y) < 0.4) ? hex('#3e1622') : hex('#4a1a28')); }
    // el zócalo de madera con paneles y el pasamanos
    rect(0, 96, 319, 99, hex('#6a4024')); rect(0, 96, 319, 96, hex('#9a6a3a')); rect(0, 99, 319, 99, hex('#3a2010'));
    g_tablas(R, 0, 100, 319, 132, hex('#5a3420'), hex('#3a2010'), hex('#7a4a2a'), 502, 33);
    for (let x = 4; x < 320; x += 26) { rect(x, 104, x + 20, 128, hex('#3a2010')); rect(x + 1, 105, x + 19, 127, hex('#5a3420')); rect(x + 1, 105, x + 19, 105, hex('#7a4a2a')); rect(x + 3, 107, x + 17, 125, hex('#4e2c1a')); }
    // el suelo de tablas, con el brillo del barniz
    for (let y = 133; y < 180; y++) for (let x = 0; x < 320; x++) { const alto = 3 + Math.floor((y - 133) / 12), f = Math.floor((y - 133) / alto); const jy = (y - 133) % alto === alto - 1, off = Math.floor(h(f, 2, 503) * 60), jx = (x + off) % 50 === 0; const v = Math.sin((x + off) * 0.2 + f) + h(x >> 2, y, 504) * 0.5;
      pset(x, y, jy || jx ? hex('#2e1a10') : v > 1.15 ? hex('#8a5a32') : v < -0.8 ? hex('#4a2a18') : hex('#6a4026')); }
    rect(0, 133, 319, 133, hex('#2a160c'));
    // el espejo de detrás de la barra con tres estantes de botellas iluminadas
    rect(4, 22, 108, 104, hex('#3a2010')); rect(6, 24, 106, 102, hex('#c8a040')); rect(8, 26, 104, 100, hex('#2a3a44')); g_degradado(R, 8, 26, 104, 100, ['#3a4a54', '#2a3a44', '#22303a'].map(hex));
    for (let k = 0; k < 5; k++) { linea(14 + k * 22, 26, 30 + k * 22, 98, hex('#3e505a')); }
    for (const sy of [46, 70, 94]) { rect(8, sy, 104, sy + 2, hex('#7a4a2a')); rect(8, sy, 104, sy, hex('#a8743c')); for (let y = sy - 4; y < sy; y++) for (let x = 8; x < 105; x++) if (g_b4(x, y) < (y - sy + 4) / 6) pset(x, y, hex('#6a5a3a'));
      let x = 10; for (let b = 0; x < 100; b++) { const ancho = 3 + Math.floor(h(b, sy, 505) * 3), alto = 10 + Math.floor(h(b, sy, 506) * 9), c = hex(['#3a7a3a', '#a85a2a', '#e8c86a', '#7a2a2a', '#c8d8d8', '#5a3a1a', '#3a5a8a'][Math.floor(h(b, sy, 507) * 7)]);
        rect(x, sy - alto + 4, x + ancho, sy - 1, c); rect(x + 1, sy - alto, x + ancho - 1, sy - alto + 4, c); pset(x + 1, sy - alto - 1, hex('#c8a040')); pset(x + 1, sy - alto + 6, hex('#ffffff')); rect(x, sy - 6, x + ancho, sy - 4, hex('#e8e0c8')); x += ancho + 2; } }
    // la ventana de la calle (lo de fuera se pinta en cada fotograma)
    rect(120, 24, 164, 84, hex('#3a2010')); rect(122, 26, 162, 82, P.k); rect(118, 84, 166, 87, hex('#7a4a2a')); rect(118, 84, 166, 84, hex('#a8743c'));
    // el escenario: embocadura, tarima y fondo de terciopelo con lucecitas
    rect(244, 44, 320, 140, hex('#1a0e14')); for (let y = 46; y < 140; y += 2) for (let x = 250; x < 320; x += 6) pset(x + (y & 2), y, hex('#24121a'));
    rect(242, 40, 320, 48, hex('#c8a040')); rect(242, 40, 320, 40, hex('#f0d070')); rect(242, 48, 320, 48, hex('#8a6a20')); for (let x = 246; x < 320; x += 6) pset(x, 44, hex('#8a6a20'));
    rect(240, 138, 320, 152, hex('#4a2a18')); rect(240, 138, 320, 139, hex('#8a5a32')); for (let x = 240; x < 320; x += 14) rect(x, 140, x, 152, hex('#2e1a10')); rect(240, 152, 320, 153, hex('#2a160c'));
    // el piano de cola (fijo: cuerpo, tapa abierta, patas, teclado; las teclas que bajan se pintan luego)
    { const x0 = 172, x1 = 236, yt = 132; poligono([[x0, yt], [x1 - 14, yt], [x1, yt + 4], [x1, yt + 10], [x0, yt + 10]], hex('#121018')); rect(x0, yt, x1 - 14, yt, hex('#3a3846')); linea(x1 - 14, yt, x1, yt + 4, hex('#3a3846'));
      rect(x0, yt + 9, x1, yt + 10, hex('#08060c')); for (let x = x0 + 4; x < x1 - 4; x += 9) pset(x, yt + 5, hex('#2a2834'));
      poligono([[x0 + 4, yt], [x1 - 6, yt + 1], [x1 - 22, yt - 26]], hex('#16141e')); linea(x0 + 4, yt, x1 - 22, yt - 26, hex('#4a4858')); linea(x1 - 22, yt - 26, x1 - 6, yt + 1, hex('#2a2834')); linea(x0 + 26, yt, x1 - 24, yt - 22, hex('#8a8a96'));
      for (let i = 0; i < 20; i++) pset(x0 + 8 + i * 2, yt - 1 - Math.round(i * 0.4), hex('#c8a040'));
      for (const lx of [x0 + 3, x1 - 6, x1 - 18]) { rect(lx, yt + 11, lx + 2, 158, hex('#121018')); rect(lx, yt + 11, lx, 158, hex('#3a3846')); rect(lx - 1, 158, lx + 3, 159, hex('#c8a040')); }
      rect(x0 - 8, yt - 2, x0, yt + 4, hex('#121018')); rect(x0 - 8, yt - 2, x0 - 1, yt - 1, P.blanco); for (let i = x0 - 8; i < x0; i += 2) pset(i, yt - 2, hex('#2a2834'));
      rect(x0 - 2, yt - 10, x0 + 8, yt - 3, hex('#16141e')); rect(x0, yt - 9, x0 + 6, yt - 4, hex('#e8e0c8')); for (let y = yt - 8; y < yt - 4; y += 2) rect(x0 + 1, y, x0 + 5, y, hex('#8a8478'));
      rect(x0 - 26, 146, x0 - 12, 149, hex('#121018')); rect(x0 - 26, 146, x0 - 12, 146, hex('#6a2a2a')); for (const lx of [x0 - 25, x0 - 13]) rect(lx, 150, lx, 160, hex('#121018')); }
    // la barra: tablero brillante, frente de paneles y la baranda de latón para los pies
    rect(0, 128, 114, 133, hex('#6a3a1e')); rect(0, 128, 114, 128, hex('#c88a4a')); rect(0, 129, 114, 129, hex('#a86a34')); rect(0, 134, 114, 134, hex('#2a1408'));
    g_tablas(R, 0, 135, 112, 158, hex('#5a3018'), hex('#3a1c0c'), hex('#7a4422'), 508, 24);
    for (let x = 4; x < 110; x += 22) { rect(x, 138, x + 18, 154, hex('#3a1c0c')); rect(x + 1, 139, x + 17, 153, hex('#6a3a1e')); rect(x + 1, 139, x + 17, 139, hex('#8a5228')); }
    rect(0, 155, 112, 156, hex('#c8a040')); rect(0, 155, 112, 155, hex('#f0d070')); for (const x of [10, 50, 90]) rect(x, 156, x + 1, 160, hex('#8a6a20'));
    rect(113, 128, 114, 158, hex('#2a1408'));
    // la caja registradora (números sí) y el surtidor de cerveza sobre la barra
    rect(78, 112, 100, 127, hex('#8a8a96')); rect(78, 112, 100, 113, hex('#c8c8d0')); rect(80, 106, 98, 112, hex('#5a5a66')); rect(82, 107, 96, 110, hex('#1a2a1a')); for (let i = 0; i < 4; i++) rect(80 + i * 5, 116, 83 + i * 5, 118, hex('#e8e0c8')); for (let i = 0; i < 4; i++) rect(80 + i * 5, 120, 83 + i * 5, 122, hex('#d8d0b8')); rect(84, 124, 94, 127, hex('#6a6a76'));
    for (const x of [30, 36, 42]) { rect(x, 114, x + 1, 127, hex('#c8a040')); rect(x - 1, 112, x + 2, 114, [hex('#c83a3a'), hex('#2a5a9a'), hex('#e8c040')][(x - 30) / 6]); }
    rect(52, 120, 56, 127, hex('#c8d8e0')); rect(53, 122, 55, 127, hex('#e8a838')); rect(53, 121, 55, 121, P.blanco);
    // los taburetes rojos delante de la barra
    for (const x of [16, 44, 72, 100]) { rect(x - 1, 152, x + 1, 166, hex('#8a8a96')); rect(x, 152, x, 166, hex('#c8c8d0')); rect(x - 5, 165, x + 5, 166, hex('#6a6a76')); rect(x - 4, 160, x + 4, 160, hex('#a8a8b4')); rect(x - 6, 148, x + 6, 152, hex('#a82a2a')); rect(x - 6, 148, x + 6, 148, hex('#e85a4a')); rect(x - 6, 152, x + 6, 152, hex('#5a1a1a')); }
    // la mesa alta del humorista (las servilletas y la vela se pintan luego)
    rect(130, 148, 154, 151, hex('#3a2010')); rect(130, 148, 154, 148, hex('#8a5a32')); rect(141, 152, 143, 164, hex('#2a1810')); rect(142, 152, 142, 164, hex('#5a3a24')); rect(135, 164, 149, 166, hex('#2a1810'));
    return {};
  });
  // la calle bajo la lluvia por la ventana (recortada al cristal): fachada de enfrente, un neón rosa, paraguas que pasan
  R.recorte([122, 26, 162, 82]);
  for (let y = 26; y <= 82; y++) for (let x = 122; x <= 162; x++) pset(x, y, y < 50 ? (g_b4(x, y) < (y - 26) / 24 ? hex('#262a52') : hex('#161a3a')) : y < 70 ? hex('#3a2a3a') : hex('#2a2430'));
  for (let x = 124; x < 162; x += 8) { rect(x, 52, x + 4, 60, Math.sin(t * 0.7 + x) > -0.5 ? hex('#c89a58') : hex('#4a3040')); }
  { const on = Math.sin(t * 3) > -0.7; g_neon(R, 'corazon', 152, 40, on ? P.rosa : P.rosaD, P.rosaD, on ? 1 : 0, 0.45); }
  { const u = (t % 7) / 7; const x = Math.round(110 + u * 70); g_paseante(R, x, 82, t, [hex('#5a4a3a'), hex('#2a2a3a'), hex('#c8906a')], 10, 1); poligono([[x - 6, 72], [x + 6, 72], [x, 68]], hex('#c83a3a')); linea(x, 68, x, 73, P.k); }
  for (let k = 0; k < 26; k++) { const x = 122 + ((k * 13 + Math.floor(t * 30) * 3) % 42), y = 26 + ((k * 23 + t * 90) % 58); linea(x, y, x - 1, y + 3, hex('#7a8ab8')); }
  R.recorte(null);
  rect(142, 26, 142, 82, hex('#3a2010')); rect(122, 54, 162, 54, hex('#3a2010'));
  for (let k = 0; k < 5; k++) { const x = 126 + k * 8, y = 30 + ((t * 6 + k * 13) % 50); pset(x, Math.round(y), hex('#a8b8e0')); pset(x, Math.round(y) + 1, hex('#7a8ab8')); }
  // el ventilador de techo que gira
  rect(196, 0, 197, 9, hex('#3a2418')); rect(193, 9, 200, 11, hex('#c8a040'));
  for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.09, dx = Math.cos(a) * 16; rect(Math.round(196 + Math.min(0, dx)), 11, Math.round(196 + Math.max(0, dx)), 12, hex('#5a3420')); }
  // las lámparas colgantes con su cono de luz tramado (se mecen un poco)
  for (const [lx, k] of [[56, 0], [140, 1], [270, 2]]) { const m = Math.sin(t * 0.8 + k) * 1.2, x = Math.round(lx + m), y = k === 2 ? 50 : 30; linea(lx, 12, x, y - 4, hex('#1a1012'));
    poligono([[x - 6, y + 2], [x + 6, y + 2], [x + 2, y - 4], [x - 2, y - 4]], k === 2 ? hex('#2a2a36') : hex('#2a5a3a')); rect(x - 2, y + 2, x + 2, y + 3, hex('#fff4c0'));
    if (k === 2) { for (let yy = y + 4; yy < 140; yy++) { const w = (yy - y) * 0.36; for (let i = -w; i <= w; i++) if (g_b4(x + Math.round(i), yy) < 0.16 - Math.abs(i) / w * 0.1) pset(x + Math.round(i), yy, hex('#8a6a5a')); } for (let i = -18; i <= 18; i++) for (let j = -2; j <= 2; j++) if ((i / 18) ** 2 + (j / 2.4) ** 2 < 1 && g_b4(x + i, 140 + j) < 0.5) pset(x + i, 140 + j, hex('#b08050')); }
    else R.halo(x, y + 6, 18, [hex('#5a3a2a'), hex('#7a5a3a')], 0.7); }
  // las cortinas rojas del escenario, que se mecen, y el pie de micro
  for (const [x0, x1, lado] of [[244, 262, -1], [302, 320, 1]]) for (let x = x0; x <= x1; x++) { const pl = Math.sin((x - x0) * 0.9 + t * 0.7) ; for (let y = 49; y < 138; y++) { const sw = Math.round(Math.sin(t * 0.9 + y * 0.05) * (y - 49) / 89 * 1.5); const c = pl > 0.4 ? hex('#c83a3a') : pl < -0.4 ? hex('#6a1218') : hex('#9a2228'); pset(x + sw, y, c); } }
  for (let x = 244; x < 320; x++) { const yb = 56 + Math.round(Math.abs(Math.sin((x - 244) * Math.PI / 19)) * 5); for (let y = 49; y <= yb; y++) pset(x, y, y === yb ? hex('#e8c040') : (x + y) % 5 === 0 ? hex('#6a1218') : hex('#a82a30')); }
  for (let k = 0; k < 14; k++) { const x = 266 + (k * 7) % 34, y = 64 + (k * 11) % 66; if (Math.sin(t * 2 + k * 1.3) > 0.2) pset(x, y, hex('#8a7a9a')); }
  rect(280, 108, 280, 138, hex('#8a8a96')); rect(276, 137, 284, 138, hex('#5a5a66')); disco(280, 106, 2, hex('#2a2a36')); pset(279, 105, hex('#8a8a96'));
  // las teclas del piano que bajan solas (o.piano) y las notas que suben
  if (o.piano !== false) { for (let i = 0; i < 8; i++) if (Math.sin(t * 9 + i * 2.3) > 0.6) pset(164 + i, 130, hex('#a8a090'));
    for (let q = 0; q < 3; q++) { const u = (t * 0.5 + q / 3) % 1, x = Math.round(170 + q * 10 + Math.sin(u * 6 + q) * 3), y = Math.round(118 - u * 40); if (u < 0.85) { rect(x, y - 4, x, y, hex('#e8c040')); rect(x - 2, y, x, y + 1, hex('#e8c040')); pset(x + 1, y - 4, hex('#e8c040')); } } }
  // la mesa alta: servilletas con renglones (chistes en trazos), la vela en su vaso rojo y una copa
  rect(132, 145, 139, 147, P.blanco); for (let k = 0; k < 3; k++) rect(132 + k, 144 - k, 138 + k, 144 - k, k % 2 ? hex('#e8e4d8') : P.blanco); linea(133, 146, 137, 146, hex('#5a5a6a'));
  rect(146, 142, 149, 147, hex('#a82a2a')); pset(147, 140 - (Math.floor(t * 8) % 2), hex('#ffd84a')); pset(147, 141, hex('#fff4c0')); R.halo(147, 141, 9, [hex('#7a4a2a'), hex('#a86a3a')], 0.5); rect(146, 142, 149, 147, hex('#a82a2a')); pset(147, 143, hex('#e86a4a'));
  rect(151, 142, 153, 144, hex('#e8a838')); pset(152, 145, hex('#c8d8e0')); pset(152, 146, hex('#c8d8e0')); rect(151, 147, 153, 147, hex('#c8d8e0'));
  // el humo que se enrosca bajo las lámparas
  for (let q = 0; q < 10; q++) { const u = (t * 0.05 + q / 10) % 1, x = Math.round(20 + q * 30 + Math.sin(t * 0.5 + q) * 6), y = Math.round(40 + Math.sin(u * 6.28 + q) * 6); for (let i = 0; i < 8; i++) if (g_b4(x + i, y) < 0.25) pset(x + i, y + Math.round(Math.sin(i * 0.8 + t) * 1), hex('#6a4a52')); }
  // los brillos que pasan por las botellas
  for (const sy of [46, 70, 94]) { const x = Math.round(10 + ((t * 20 + sy) % 120)); if (x < 104) { pset(x, sy - 8, P.blanco); pset(x, sy - 7, hex('#e8e0c8')); } }
  return { suelo: S, barra: [0, 128, 114], taburetes: [16, 44, 72, 100], mesaAlta: [142, 148], piano: { teclado: [164, 130], x0: 172, x1: 236, banqueta: [153, 146] }, escenario: { x0: 240, x1: 320, suelo: 139, micro: [280, 138] }, ventana: [122, 26, 162, 82], libres: [[20, 120], [150, 168], [244, 310]] };
}

function g_barPuerta(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 162;
  const e = g_fondo(R, 'barPuerta', () => {
    g_degradado(R, 0, 0, 319, 22, ['#0e0e28', '#16163a', '#20204a'].map(hex));
    const cielo = R.buf.slice();
    rect(0, 18, 319, 22, hex('#3a2a2a')); rect(0, 18, 319, 18, hex('#5a4040'));
    g_ladrillo(R, 0, 23, 319, 150, hex('#5a2a2a'), hex('#6e3632'), hex('#45201e'), hex('#2e1618'), 601, 8, 4);
    for (let y = 23; y < 150; y++) for (let x = 0; x < 320; x++) if (h(x >> 3, y >> 3, 602) < 0.12 && g_b4(x, y) < 0.5) pset(x, y, hex('#3a1c1c'));
    // los carteles pegados y rotos (formas, sin letras)
    for (const [x0, y0, c, f] of [[16, 52, '#e8c040', 'disco'], [34, 60, '#5a8ab0', 'estrella'], [10, 78, '#e8e0c8', 'rayas']]) { const w = 22, hh = 26; rect(x0, y0, x0 + w, y0 + hh, hex(c)); rect(x0, y0, x0 + w, y0, g_mezcla(hex(c), 0xffffffff, 0.3));
      if (f === 'disco') { disco(x0 + 11, y0 + 11, 6, hex('#c83a3a')); disco(x0 + 11, y0 + 11, 2, hex(c)); } else if (f === 'estrella') { g_neon(R, 'estrella', x0 + 11, y0 + 12, hex('#f6f2ea'), hex('#3a6a90'), 0, 0.8); } else for (let y = y0 + 4; y < y0 + hh - 4; y += 4) rect(x0 + 3, y, x0 + w - 3 - (y % 8), y + 1, hex('#5a5a6a'));
      poligono([[x0 + w - 6, y0 + hh], [x0 + w, y0 + hh], [x0 + w, y0 + hh - 8]], hex('#5a2a2a')); linea(x0 + w - 6, y0 + hh, x0 + w, y0 + hh - 8, g_mezcla(hex(c), 0, 0.4)); }
    // el marco de piedra, la puerta de roble con tablas, tachuelas y bisagras, y el escalón
    rect(90, 70, 146, 152, hex('#7a7068')); rect(90, 70, 146, 72, hex('#a89a8a')); for (let y = 76; y < 150; y += 8) { rect(90, y, 95, y, hex('#5a5048')); rect(141, y, 146, y, hex('#5a5048')); }
    rect(96, 76, 140, 150, P.k);
    for (let x = 97; x < 140; x++) for (let y = 77; y < 150; y++) { const tabla = Math.floor((x - 97) / 7), jx = (x - 97) % 7 === 6, v = Math.sin(y * 0.3 + tabla * 2 + Math.sin(x * 0.5) * 2); pset(x, y, jx ? hex('#2a160c') : v > 0.8 ? hex('#7a4a28') : v < -0.7 ? hex('#4a2a14') : hex('#5e3820')); }
    for (const y of [86, 112, 138]) { rect(97, y, 126, y + 2, hex('#2a2a32')); rect(97, y, 126, y, hex('#5a5a66')); disco(126, y + 1, 2, hex('#2a2a32')); }
    for (let x = 101; x < 138; x += 8) for (const y of [80, 100, 124, 146]) { pset(x, y, hex('#9a9aa4')); pset(x + 1, y + 1, hex('#2a2a32')); }
    disco(134, 116, 2.5, hex('#c8a040')); pset(133, 115, hex('#f0d070')); rect(133, 119, 135, 121, hex('#8a6a20'));
    rect(106, 90, 128, 100, hex('#2a2a32')); rect(107, 91, 127, 99, hex('#4a4a56'));
    rect(86, 150, 150, 156, hex('#8a8278')); rect(86, 150, 150, 150, hex('#b0a89a')); rect(86, 156, 150, 156, hex('#4a4440'));
    // el marco del cartel (el «?» y el pictograma se pintan luego)
    rect(166, 64, 214, 120, hex('#5a3a1e')); rect(166, 64, 214, 64, hex('#8a5a32')); rect(170, 68, 210, 116, hex('#1e3a2a')); for (let y = 69; y < 116; y++) for (let x = 171; x < 210; x++) if (h(x, y, 603) < 0.08) pset(x, y, hex('#2a4a36'));
    rect(188, 120, 190, 150, hex('#3a2a1e'));
    // la bajante que gotea, el cubo de basura con su tapa, las cajas y el respiradero
    rect(232, 23, 235, 150, hex('#6a6a74')); rect(232, 23, 232, 150, hex('#9a9aa4')); for (let y = 30; y < 150; y += 20) rect(231, y, 236, y + 1, hex('#4a4a56')); rect(232, 148, 240, 151, hex('#6a6a74'));
    rect(252, 130, 280, 160, hex('#5a6a6a')); for (let x = 254; x < 280; x += 4) rect(x, 132, x + 1, 158, hex('#4a5858')); rect(250, 126, 282, 130, hex('#6a7a7a')); rect(250, 126, 282, 126, hex('#8a9a9a')); rect(262, 124, 270, 125, hex('#4a5858'));
    rect(0, 120, 30, 160, hex('#8a6a3a')); for (const y of [120, 140]) { rect(0, y, 30, y + 1, hex('#a8844a')); rect(0, y + 19, 30, y + 19, hex('#5a4020')); } for (const x of [0, 14, 29]) rect(x, 120, x + 1, 160, hex('#5a4020')); for (let k = 0; k < 4; k++) { rect(4 + k * 6, 112, 6 + k * 6, 119, [hex('#3a7a3a'), hex('#5a3a1a'), hex('#3a7a3a'), hex('#a85a2a')][k]); pset(5 + k * 6, 110, hex('#c8a040')); }
    rect(286, 104, 314, 124, hex('#7a7a84')); for (let y = 106; y < 123; y += 3) rect(288, y, 312, y, hex('#4a4a56')); rect(286, 104, 314, 104, hex('#a8a8b0'));
    // el suelo: adoquines mojados
    for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 151) / 5), lx = (x + (fila & 1) * 4) % 8, ly = (y - 151) % 5; const n = h(Math.floor((x + (fila & 1) * 4) / 8), fila, 604);
      pset(x, y, lx === 7 || ly === 4 ? hex('#1a1a24') : ly === 0 && lx < 6 ? hex('#4a4a5a') : n < 0.3 ? hex('#2e2e3a') : hex('#38384a')); }
    for (let j = -2; j <= 2; j++) for (let i = -20; i <= 20; i++) if (Math.abs(i) / 20 + Math.abs(j) / 2.6 < 1) pset(236 + i, 166 + j, hex('#2a2a4a'));
    return { mask: g_mascara(R, cielo, 22) };
  });
  for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 605) * 319), y = Math.round(h(k, 2, 605) * 16); if (e.mask[y * 320 + x] && !(x > 272) && !(x < 174) && Math.sin(t * 2 + k) > 0) pset(x, y, hex('#8a8ab8')); }
  // la lámpara de jaula sobre la puerta, con su halo y las polillas
  R.halo(118, 64, 40, [hex('#4a2a28'), hex('#6a3a30'), hex('#8a5a3a')], 0.8); rect(112, 56, 124, 58, P.k); rect(113, 59, 123, 66, hex('#fff0c0')); for (let x = 113; x < 124; x += 3) rect(x, 59, x, 66, P.k); rect(112, 67, 124, 68, P.k); rect(117, 52, 119, 55, P.k);
  for (let k = 0; k < 4; k++) { const a = t * (5 + k) + k * 1.7; pset(Math.round(118 + Math.cos(a) * (8 + k * 2)), Math.round(62 + Math.sin(a * 1.3) * 5), hex('#e8e0c0')); }
  // la flecha de neón que señala la puerta, corriendo en tres tiempos
  { const f = Math.floor(t * 2.5) % 4; for (let i = 0; i < 3; i++) g_neon(R, 'flecha', 50 + i * 13, 108, P.rosa, P.rosaD, i < f ? 1 : 0, 0.55); }
  // la mirilla: la trampilla se abre y asoman dos ojos que miran a un lado y a otro y parpadean
  const mi = Math.max(0, Math.min(1, o.mirilla ?? 0));
  if (mi > 0) { const ab = Math.round(mi * 9); rect(107, 91, 127, 100, hex('#2a2a32')); g_degradado(R, 108, 92, 126, 99, ['#f0c070', '#c87a3a'].map(hex));
    if (mi > 0.6) { const mira = Math.round(Math.sin(t * 1.5) * 2), parp = (t % 2.7) < 0.15; for (const ex of [113, 121]) { rect(ex - 2, 94, ex + 2, 97, parp ? hex('#c87a3a') : P.blanco); if (!parp) rect(ex + mira - 1, 95, ex + mira, 96, P.k); rect(ex - 2, 93, ex + 2, 93, hex('#3a2418')); } }
    rect(107, 91 - ab, 127, 99 - ab, hex('#4a4a56')); rect(107, 91 - ab, 127, 91 - ab, hex('#6a6a76')); rect(115, 94 - ab, 119, 96 - ab, hex('#2a2a32')); }
  else { rect(107, 91, 127, 99, hex('#4a4a56')); rect(107, 91, 127, 91, hex('#6a6a76')); rect(115, 94, 119, 96, hex('#2a2a32')); }
  // el cartel del examen: un «?» grande que late, el pictograma de la pregunta y las bombillas que corren por el marco
  { const lat = Math.sin(t * 3) > 0.8 ? 1 : 0; R.icono('?', 182 - lat, 70, hex('#f0d040'), hex('#6a4a10'), 3); }
  const ic = o.icono ?? null;
  if (ic === 'tocadiscos') { rect(176, 100, 204, 112, hex('#8a5a32')); rect(176, 100, 204, 100, hex('#c88a4a')); R.disco(188, 100, 9, hex('#16141e')); const a = t * 6; pset(Math.round(188 + Math.cos(a) * 6), Math.round(100 + Math.sin(a) * 2), hex('#5a5a6a')); R.disco(188, 100, 2, hex('#c83a3a')); rect(186, 98, 190, 99, hex('#16141e')); linea(201, 96, 194, 101, hex('#c8c8d0')); pset(201, 95, hex('#c8c8d0')); for (let x = 177; x < 204; x += 3) pset(x, 108, hex('#5a3a1e')); }
  else if (ic === 'coche') { const b = Math.round(Math.abs(Math.sin(t * 6)) * 1); rect(176, 102 - b, 204, 108 - b, hex('#3a5a9a')); rect(182, 96 - b, 198, 102 - b, hex('#3a5a9a')); rect(184, 97 - b, 189, 101 - b, hex('#a8c8e8')); rect(191, 97 - b, 196, 101 - b, hex('#a8c8e8')); rect(204, 103 - b, 206, 106 - b, hex('#c8c8d0')); rect(174, 103 - b, 176, 106 - b, hex('#c8c8d0')); pset(204, 104 - b, hex('#fff0c0'));
    for (const x of [182, 198]) { R.disco(x, 109, 3, P.k); R.disco(x, 109, 1, hex('#c8c8d0')); } for (let q = 0; q < 3; q++) { const u = (t * 1.2 + q / 3) % 1; pset(Math.round(172 - u * 6), Math.round(106 - u * 4), hex('#a8a8b0')); } }
  for (let k = 0; k < 26; k++) { const per = 2 * (48 + 56), s = (k * per / 26 + t * 20) % per, on = k % 3 === Math.floor(t * 4) % 3; let x, y; if (s < 48) { x = 166 + s; y = 64; } else if (s < 104) { x = 214; y = 64 + s - 48; } else if (s < 152) { x = 214 - (s - 104); y = 120; } else { x = 166; y = 120 - (s - 152); } disco(Math.round(x), Math.round(y), 1, on ? hex('#fff0a0') : hex('#a8843a')); }
  // la gota de la bajante al charco, con su onda, y el vapor del respiradero
  { const u = (t % 1.4) / 1.4; if (u < 0.5) pset(236, Math.round(152 + u * 28), hex('#9ab0d8')); else { const r = (u - 0.5) * 30; for (let i = -r; i <= r; i++) if (Math.abs(Math.abs(i) - r) < 1.2) pset(Math.round(236 + i), 166, hex('#5a5a8a')); } }
  for (let q = 0; q < 8; q++) { const a = (t * 0.3 + q / 8) % 1, x = 300 + Math.sin(a * 5 + q) * 4 - a * 14, y = 104 - a * 50, r = 1.5 + a * 5; if (y < 50) continue; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && g_b4(Math.round(x + i), Math.round(y + j)) < 0.4 * (1 - a)) pset(Math.round(x + i), Math.round(y + j), hex('#8a8094')); }
  // el gato sobre la tapa del cubo
  gato(R, 266, 125, t, { dir: -1 });
  return { suelo: S, puerta: [96, 76, 140, 150], mirilla: [107, 91, 127, 100], cartel: [166, 64, 214, 120], interrogacion: [190, 78], pictograma: [190, 104], pie: [152, S], escalon: [86, 150, 150], cubo: [252, 126, 282, 160], libres: [[36, 84], [140, 230], [286, 316]] };
}

// acera de ladrillo en espiga entre y0 e y1
function g_espiga(R, x0, y0, x1, y1, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = (x + y) & 7, b = (x - y + 800) & 7, bloque = ((Math.floor((x + y) / 8) + Math.floor((x - y + 800) / 8)) & 1);
    const junta = bloque ? a === 0 : b === 0, n = h(Math.floor((x + y) / 8), Math.floor((x - y + 800) / 8), k);
    R.pset(x, y, junta ? hex('#3a2018') : n < 0.25 ? hex('#6a3428') : n > 0.8 ? hex('#9a5240') : hex('#7e4232')); }
}

// adoquines de granito mojados entre y0 e y1
function g_adoquines(R, x0, y0, x1, y1, k = 0) {
  for (let y = y0; y <= y1; y++) { const alto = 4 + Math.floor((y - y0) / 8), fila = Math.floor((y - y0) / alto), ly = (y - y0) % alto;
    for (let x = x0; x <= x1; x++) { const w = 7 + (fila & 1), lx = (x + fila * 3) % w, n = h(Math.floor((x + fila * 3) / w), fila, k);
      R.pset(x, y, lx === w - 1 || ly === alto - 1 ? hex('#141420') : ly === 0 && lx < w - 2 ? hex('#5a5a6e') : n < 0.3 ? hex('#30303e') : n > 0.8 ? hex('#444458') : hex('#3a3a4a')); } }
}

// contraventanas de lamas verdes (abiertas a los lados de un hueco) y el hueco con luz o sin ella
function g_balconera(R, x, y, w, hh, luz, k = 0) {
  R.rect(x - 1, y - 1, x + w + 1, y + hh, g_P.k); R.rect(x, y, x + w, y + hh, luz ? hex('#e8b060') : hex('#1e2234'));
  if (luz) { g_degradado(R, x, y, x + w, y + hh, ['#f8d080', '#e8a050', '#a86a3a'].map(hex)); R.rect(x + 1, y + 3, x + 2, y + hh, hex('#c87a7a')); R.rect(x + w - 2, y + 3, x + w - 1, y + hh, hex('#c87a7a')); }
  else { R.linea(x + 1, y + 2, x + 4, y + 8, hex('#2e344a')); }
  R.rect(x + Math.floor(w / 2), y, x + Math.floor(w / 2), y + hh, g_P.k); for (let yy = y + 6; yy < y + hh; yy += 8) R.rect(x, yy, x + w, yy, g_P.k);
  for (const sx of [x - 7, x + w + 2]) { R.rect(sx, y, sx + 5, y + hh, hex('#2a5a3a')); for (let yy = y + 1; yy < y + hh; yy += 2) R.rect(sx + 1, yy, sx + 4, yy, hex('#3e7a4e')); R.rect(sx, y, sx, y + hh, hex('#1e4428')); R.rect(sx + 5, y, sx + 5, y + hh, hex('#1e4428')); R.rect(sx, y + Math.floor(hh / 2), sx + 5, y + Math.floor(hh / 2), hex('#1e4428')); }
  R.rect(x - 2, y - 4, x + w + 2, y - 2, hex('#e8dcc8')); R.rect(x - 2, y - 4, x + w + 2, y - 4, hex('#fff4e0'));
}

// la librería: el letrero colgante con un libro abierto, que se balancea
function g_letreroLibro(R, x, y, t, s = 1) {
  const a = Math.sin(t * 1.2) * 0.12, cx = (i, j) => Math.round(x + i * Math.cos(a) - j * Math.sin(a)), cy = (i, j) => Math.round(y + i * Math.sin(a) + j * Math.cos(a));
  R.linea(x - 14 * s, y - 4, x + 4 * s, y - 4, g_P.hierro); R.linea(x - 14 * s, y - 4, x - 14 * s + 6, y - 10, g_P.hierro); R.linea(x - 14 * s, y - 10, x - 14 * s, y + 2, g_P.hierro);
  R.linea(x - 6 * s, y - 4, cx(-6 * s, 0), cy(-6 * s, 0), g_P.hierro); R.linea(x + 2 * s, y - 4, cx(2 * s, 0), cy(2 * s, 0), g_P.hierro);
  for (let j = 0; j <= 14 * s; j++) for (let i = -10 * s; i <= 6 * s; i++) { const bor = j === 0 || j === Math.round(14 * s) || i === -10 * s || i === 6 * s; R.pset(cx(i, j), cy(i, j), bor ? hex('#c8a040') : hex('#2a3a5a')); }
  for (let j = 3; j <= 11 * s; j++) for (let i = -8 * s; i <= 4 * s; i++) { const lado = i < -2 * s, cur = Math.abs(i + 2 * s) < 1; const top = 3 + Math.round(Math.abs(i + 2 * s) * 0.25); if (j < top) continue; R.pset(cx(i, j), cy(i, j), cur ? hex('#a89870') : lado ? hex('#f0e8d0') : hex('#e0d4b4')); }
  for (let j = 6; j < 11 * s; j += 2) { R.pset(cx(-6 * s, j), cy(-6 * s, j), hex('#8a8070')); R.pset(cx(-5 * s, j), cy(-5 * s, j), hex('#8a8070')); R.pset(cx(1 * s, j), cy(1 * s, j), hex('#8a8070')); R.pset(cx(2 * s, j), cy(2 * s, j), hex('#8a8070')); }
}

function g_orleans(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 154;
  const e = g_fondo(R, 'orleans', () => {
    g_degradado(R, 0, 0, 319, 70, ['#0a0e2a', '#10163a', '#18204a', '#24285a', '#34306a'].map(hex));
    const cielo = R.buf.slice();
    // la torre de la iglesia y los tejados del fondo
    rect(194, 30, 212, 70, hex('#1c1a38')); poligono([[192, 31], [214, 31], [203, 16]], hex('#1c1a38')); rect(202, 10, 203, 17, hex('#1c1a38')); rect(200, 12, 205, 12, hex('#1c1a38'));
    disco(203, 40, 4, hex('#3a3456')); disco(203, 40, 3, hex('#e8d8a0')); pset(203, 40, P.k); linea(203, 40, 203, 38, P.k); for (const x of [197, 207]) rect(x, 50, x + 2, 58, hex('#3a3050'));
    for (let x = -4, k = 0; x < 320; k++) { const w = 14 + Math.floor(h(k, 1, 701) * 20), top = 50 + Math.floor(h(k, 2, 701) * 10); poligono([[x, top + 6], [x + w / 2, top], [x + w, top + 6], [x + w, 72], [x, 72]], hex('#161430')); if (h(k, 3, 701) < 0.5) { rect(x + 3, top - 2, x + 5, top + 4, hex('#161430')); } x += w; }
    // A · la casa rosa (x 0–106), B · la casa ocre con la librería (x 106–212), C · la casa verde agua (x 212–320)
    const casas = [[0, 106, 34, '#b86a6e', '#d08488', '#8e4e54'], [106, 212, 40, '#c8964a', '#dcac62', '#9a7034'], [212, 320, 48, '#4e8a86', '#62a29c', '#386a66']];
    for (const [x0, x1, top, c, cL, cS] of casas) { g_estuco(R, x0, top, x1, 146, hex(c), hex(cL), hex(cS), 702 + x0); rect(x0, top - 4, x1, top - 1, hex('#e8dcc8')); rect(x0, top - 4, x1, top - 4, hex('#fff4e0')); rect(x0, top, x1, top, hex('#8a7a6a')); for (let x = x0 + 2; x < x1; x += 5) rect(x, top + 1, x + 2, top + 2, hex('#d8ccb8')); rect(x1 - 1, top, x1, 146, hex('#2a2030')); }
    // las balconeras de los dos pisos (unas encendidas)
    for (const [x, y, w, hh, luz] of [[14, 46, 14, 22, 1], [52, 46, 14, 22, 0], [84, 46, 12, 22, 0], [14, 80, 14, 22, 0], [52, 80, 14, 22, 1], [84, 80, 12, 22, 1],
      [124, 52, 14, 20, 0], [156, 52, 14, 20, 1], [188, 52, 12, 20, 0], [124, 82, 14, 20, 1], [156, 82, 14, 20, 0], [188, 82, 12, 20, 1],
      [228, 58, 14, 18, 1], [262, 58, 14, 18, 0], [296, 58, 12, 18, 0], [228, 84, 14, 18, 0], [262, 84, 14, 18, 1], [296, 84, 12, 18, 0]]) g_balconera(R, x, y, w, hh, luz, x + y);
    // las galerías de hierro: el suelo del balcón, la barandilla de encaje y los postes hasta la acera (casa A)
    for (const [x0, x1, yb] of [[0, 104, 70], [0, 104, 104], [108, 210, 74], [108, 210, 104], [214, 318, 78], [214, 318, 104]]) { rect(x0, yb + 1, x1, yb + 3, hex('#3a3040')); rect(x0, yb + 1, x1, yb + 1, hex('#6a5a6a')); for (let x = x0 + 3; x < x1; x += 12) { linea(x, yb + 4, x + 4, yb + 8, P.hierro); pset(x + 4, yb + 8, P.hierro); } g_barandilla(R, x0, x1, yb, 10, P.hierro, P.hierroL); }
    for (const x of [2, 36, 70, 102]) { rect(x, 106, x + 1, 150, P.hierro); rect(x, 106, x, 150, P.hierroL); for (let y = 112; y < 146; y += 10) { R.anillo(x + 0.5, y, 2, P.hierro); } rect(x - 1, 148, x + 2, 150, P.hierro); }
    // la planta baja de A (puertas con montante) y de C (una puerta y un portalón)
    for (const x of [14, 52, 84]) { rect(x - 1, 112, x + 13, 146, P.k); rect(x, 113, x + 12, 146, hex('#3a2a3a')); rect(x, 113, x + 12, 119, hex('#5a4a6a')); for (let i = 0; i < 12; i += 3) linea(x + 6, 119, x + i, 113, hex('#3a2a3a')); rect(x + 1, 121, x + 5, 145, hex('#4a3448')); rect(x + 7, 121, x + 11, 145, hex('#4a3448')); }
    for (const x of [230, 264]) { rect(x - 1, 108, x + 15, 146, P.k); rect(x, 109, x + 14, 146, hex('#2a4a3a')); for (let y = 111; y < 146; y += 2) rect(x + 1, y, x + 13, y, hex('#3a6a4e')); rect(x + 7, 109, x + 7, 146, P.k); }
    rect(296, 108, 316, 146, P.k); rect(297, 109, 315, 146, hex('#5a3a2a')); for (let x = 299; x < 315; x += 4) rect(x, 110, x + 2, 145, hex('#6a4a32'));
    // la librería: el frente de madera verde, la cornisa con la línea dorada, el escaparate (fijo: estantes) y la puerta
    rect(112, 106, 208, 146, hex('#1e3a2e')); rect(112, 106, 208, 109, hex('#2e5a44')); rect(112, 110, 208, 110, hex('#c8a040')); for (const x of [112, 172, 204]) { rect(x, 111, x + 4, 146, hex('#2a4e3c')); rect(x, 111, x, 146, hex('#3e6e56')); }
    rect(118, 114, 170, 140, P.k); rect(119, 115, 169, 139, hex('#d89a50')); g_degradado(R, 119, 115, 169, 139, ['#f0c070', '#d89a50', '#9a6030'].map(hex));
    for (const sy of [124, 133]) { rect(119, sy, 169, sy, hex('#5a3a1e')); let x = 120; for (let b = 0; x < 168; b++) { const w = 2 + Math.floor(h(b, sy, 703) * 2), a = 5 + Math.floor(h(b, sy, 704) * 4); g_lomo(R, x, sy - 1, w, a, hex(g_LIBROS[Math.floor(h(b, sy, 705) * 9)])); x += w + (h(b, sy, 706) < 0.15 ? 3 : 0); } }
    rect(119, 136, 169, 139, hex('#6a2a2a')); rect(178, 112, 200, 146, P.k); rect(179, 113, 199, 146, hex('#2a4e3c')); rect(181, 115, 197, 128, hex('#e8a858')); rect(181, 132, 197, 144, hex('#1e3a2e')); rect(182, 133, 196, 143, hex('#2a4e3c')); disco(195, 130, 1.5, hex('#e8c040'));
    rect(116, 140, 172, 146, hex('#2a4e3c')); rect(116, 140, 172, 140, hex('#3e6e56'));
    // la acera de ladrillo en espiga, el bordillo de granito y los adoquines
    g_espiga(R, 0, 146, 319, 159, 707); rect(0, 159, 319, 161, hex('#8a8a96')); rect(0, 159, 319, 159, hex('#b0b0bc')); rect(0, 162, 319, 162, P.k);
    g_adoquines(R, 0, 163, 319, 179, 708);
    for (let j = -1; j <= 1; j++) for (let i = -18; i <= 18; i++) if (Math.abs(i) / 18 + Math.abs(j) / 1.8 < 1) pset(160 + i, 156 + j, hex('#3a2a4a'));
    return { mask: g_mascara(R, cielo, 70) };
  });
  const m = e.mask;
  // estrellas, la luna llena con su halo, nubes de noche y un murciélago que cruza
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 711) * 319), y = Math.round(h(k, 2, 711) * 50); if (!m[y * 320 + x] || (x > 272 && y < 48) || (x < 174 && y < 16)) continue; const tw = Math.sin(t * (1.5 + h(k, 3, 711) * 2) + k); if (tw > -0.3) pset(x, y, tw > 0.6 ? P.blanco : hex('#7a7ab0')); }
  { const lx = 246, ly = 24; R.halo(lx, ly, 16, [hex('#1e2452'), hex('#2a3064')], 1.0); disco(lx, ly, 7, hex('#f4ecd0')); disco(lx - 2, ly + 1, 2, hex('#d8ccb0')); disco(lx + 3, ly - 2, 1.5, hex('#d8ccb0')); pset(lx + 1, ly + 3, hex('#d8ccb0')); }
  for (const [x0, y, w, v, s] of [[30, 24, 40, 1.1, 1], [180, 32, 34, 1.9, 2], [100, 44, 26, 2.8, 3]]) g_nube(R, m, ((x0 + t * v) % 380) - 30, y, w, [hex('#4e4e80'), hex('#363864'), hex('#262a52')], s);
  { const u = (t % 10) / 10, x = Math.round(330 - u * 360), y = Math.round(30 + Math.sin(u * 30) * 4), a = Math.sin(t * 16) > 0; if (m[y * 320 + x] && !(x > 272 && y < 48)) { pset(x, y, P.k); pset(x - 1, y + (a ? -1 : 1), P.k); pset(x + 1, y + (a ? -1 : 1), P.k); pset(x - 2, y + (a ? -2 : 0), P.k); pset(x + 2, y + (a ? -2 : 0), P.k); } }
  // los helechos colgantes de las galerías y las macetas de flores, que se mecen
  for (const [x, y, k] of [[22, 74, 0], [60, 74, 1], [96, 74, 2], [44, 108, 3], [132, 78, 4], [184, 78, 5], [240, 82, 6], [288, 82, 7]]) g_helecho(R, x, y, t, k);
  for (const [x0, yb] of [[150, 104], [256, 104], [8, 104]]) for (let k = 0; k < 6; k++) { const x = x0 + k * 3, sw = Math.round(Math.sin(t * 1.6 + k) * 0.7); pset(x + sw, yb - 11, [hex('#e85a8a'), hex('#f0d040'), hex('#f6f2ea')][k % 3]); pset(x, yb - 10, hex('#3a7a3a')); }
  // vecinos que pasan tras las balconeras encendidas
  for (const [x, y, w, hh, k] of [[52, 80, 14, 22, 0], [124, 82, 14, 20, 1], [262, 84, 14, 18, 2]]) { R.recorte([x + 2, y + 1, x + w - 2, y + hh]); const px = Math.round(x - 6 + ((t * 3 + k * 9) % (w + 14))); disco(px, y + 6, 2, hex('#6a3a2a')); for (let yy = y + 8; yy <= y + hh; yy++) for (let i = -2; i <= 2; i++) pset(px + i, yy, hex('#7a4a3a')); R.recorte(null); }
  // un trompetista pequeño en la galería de arriba de la casa C (toca a ratos) y sus notas
  { const x = 250, yb = 78, toca = (t % 6) < 3.6; rect(x - 2, yb - 9, x + 2, yb - 3, hex('#3a3a5a')); disco(x, yb - 11, 2, hex('#8a5a3a')); rect(x - 2, yb - 13, x + 2, yb - 13, hex('#2a2a3a')); rect(x - 1, yb - 2, x - 1, yb, hex('#2a2a3a')); rect(x + 1, yb - 2, x + 1, yb, hex('#2a2a3a'));
    if (toca) { rect(x + 2, yb - 11, x + 7, yb - 11, hex('#e8c040')); rect(x + 7, yb - 12, x + 8, yb - 10, hex('#e8c040')); for (let q = 0; q < 2; q++) { const u = (t * 0.8 + q / 2) % 1; const nx = Math.round(x + 10 + u * 12), ny = Math.round(yb - 14 - u * 14); if (!(nx > 272 && ny < 48)) { rect(nx, ny - 3, nx, ny, hex('#e8c040')); pset(nx - 1, ny, hex('#e8c040')); } } } else { rect(x + 2, yb - 7, x + 5, yb - 7, hex('#e8c040')); } }
  // la librería: la lámpara del escaparate, el libro abierto en su atril y el gato negro que mueve la cola
  R.halo(130, 120, 14, [hex('#e8a858'), hex('#f0c070')], 0.6); rect(128, 118, 132, 120, hex('#2a6a3a')); rect(130, 121, 130, 131, hex('#c8a040')); rect(127, 132, 133, 132, hex('#c8a040'));
  rect(146, 128, 160, 131, hex('#f0e8d0')); rect(153, 128, 153, 131, hex('#a89870')); linea(150, 132, 156, 132, hex('#5a3a1e')); { const pg = Math.floor(t / 2.5) % 2; if ((t % 2.5) < 0.3) linea(153, 128, 153 + (pg ? 3 : -3), 126, hex('#f6f2ea')); }
  g_gatoNegro(R, 140, 135, t, 1);
  // el letrero del libro y los faroles de gas (uno de poste en la acera, dos de pared)
  g_letreroLibro(R, 160, 112, t, 0.8);
  g_farola(R, 106, 120, 158, 1, 'gas'); g_farolGas(R, 106, 120, t, 0, 0);
  g_farolGas(R, 222, 98, t, 2, 1); g_farolGas(R, 318, 98, t, 4, -1);
  // los reflejos de los faroles en los adoquines mojados y la niebla que pasa a ras de suelo
  for (const [x, k] of [[106, 0], [222, 1], [144, 2]]) g_reflejo(R, t, x, 165, 179, k === 2 ? hex('#5a4a44') : hex('#6a5a4a'), 2, k);
  for (let y = 136; y < 180; y += 1) { const d = 0.12 * Math.max(0, Math.sin((y - 136) / 44 * Math.PI)); for (let x = 0; x < 320; x += 1) { const n = Math.sin(x * 0.03 + t * 0.4 + y * 0.1) * 0.5 + 0.5; if (g_b4(x, y) < d * n) pset(x, y, hex('#7a7a98')); } }
  return { suelo: S, acera: [0, 146, 319, 159], libreria: { escaparate: [118, 114, 170, 140], puerta: [178, 112, 200, 146], gato: [140, 135] }, puertaPie: [189, S], farola: [106, 158], postesGaleria: [2, 36, 70, 102], torre: [203, 16], luna: [246, 24], trompetista: [250, 78], libres: [[10, 100], [112, 200], [206, 316]] };
}

function g_libreria(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = g_P, S = 164;
  const e = g_fondo(R, 'libreria', () => {
    // arriba, el estuco ocre del piso y el vuelo de la galería visto desde abajo (oscuro y tranquilo)
    g_estuco(R, 0, 0, 319, 40, hex('#7a5a34'), hex('#8a6a40'), hex('#6a4a2a'), 721);
    rect(0, 22, 319, 30, hex('#2a2230')); rect(0, 22, 319, 22, hex('#4a3e4a')); for (let x = 6; x < 320; x += 20) { linea(x, 30, x + 6, 38, P.hierro); linea(x + 1, 30, x + 7, 38, P.hierroL); }
    for (let x = 0; x < 320; x += 3) rect(x, 14, x, 21, hex('#5a4a3a')); rect(0, 13, 319, 13, hex('#5e4c3a'));
    // el frente de la librería: madera verde, la cornisa con la línea dorada y las pilastras
    rect(0, 40, 319, 158, hex('#1e3a2e')); rect(0, 40, 319, 50, hex('#2a4e3c')); rect(0, 40, 319, 40, hex('#3e6e56')); rect(0, 51, 319, 51, hex('#c8a040')); rect(0, 52, 319, 52, hex('#8a6a20'));
    for (let x = 6; x < 320; x += 10) { rect(x, 43, x + 5, 47, hex('#1e3a2e')); pset(x, 43, hex('#3e6e56')); }
    for (const x of [0, 200, 262]) { rect(x, 53, x + 10, 158, hex('#2a4e3c')); rect(x, 53, x, 158, hex('#3e6e56')); rect(x + 10, 53, x + 10, 158, hex('#142a20')); for (let y = 60; y < 156; y += 24) { rect(x + 2, y, x + 8, y + 18, hex('#1e3a2e')); rect(x + 2, y, x + 8, y, hex('#3e6e56')); } }
    // el escaparate: marco y, dentro, el fondo cálido con las estanterías llenas de libros
    rect(14, 58, 196, 140, P.k); g_degradado(R, 15, 59, 195, 139, ['#c88a48', '#a86a34', '#7a4a24'].map(hex));
    for (const sy of [78, 98, 118]) { rect(15, sy, 195, sy + 1, hex('#5a3418')); rect(15, sy, 195, sy, hex('#8a5a2a')); let x = 16; for (let b = 0; x < 194; b++) { const w = 3 + Math.floor(h(b, sy, 722) * 3), a = 10 + Math.floor(h(b, sy, 723) * 7); if (h(b, sy, 724) < 0.1) { linea(x, sy - 1, x + 5, sy - a + 2, hex(g_LIBROS[b % 9])); linea(x + 1, sy - 1, x + 6, sy - a + 2, hex(g_LIBROS[b % 9])); x += 7; continue; } g_lomo(R, x, sy - 1, w, a, hex(g_LIBROS[Math.floor(h(b, sy, 725) * 9)])); x += w + 1; } }
    for (let y = 59; y < 140; y++) for (let x = 15; x < 196; x++) if (g_b4(x, y) < 0.18) pset(x, y, g_mezcla(R.pget(x, y), hex('#3a2010'), 0.5));
    // el fondo del escaparate: la tarima con un paño rojo, pilas de libros y el atril con el libro abierto
    rect(15, 126, 195, 139, hex('#7a2a2a')); rect(15, 126, 195, 126, hex('#a83a3a')); for (let x = 16; x < 195; x += 6) pset(x, 132, hex('#5a1a1a'));
    for (const [x0, n] of [[24, 6], [58, 4], [150, 7], [178, 3]]) for (let k = 0; k < n; k++) { const w = 18 - (k % 3) * 2, y = 125 - k * 3, c = hex(g_LIBROS[(x0 + k) % 9]); rect(x0 + (k % 2), y - 2, x0 + (k % 2) + w, y, c); rect(x0 + (k % 2) + 1, y - 1, x0 + (k % 2) + w - 1, y - 1, hex('#f0e8d0')); rect(x0 + (k % 2), y - 2, x0 + (k % 2) + w, y - 2, g_mezcla(c, 0xffffffff, 0.3)); }
    linea(100, 125, 108, 110, hex('#5a3418')); linea(116, 125, 108, 110, hex('#5a3418'));
    // la puerta con su cristal (dentro, la tienda) y el tirador de latón
    rect(212, 56, 256, 158, P.k); rect(214, 58, 254, 158, hex('#2a4e3c')); rect(218, 62, 250, 104, hex('#d89a50')); g_degradado(R, 218, 62, 250, 104, ['#f0c070', '#d89a50', '#a86a34'].map(hex));
    for (const sy of [76, 92]) { rect(218, sy, 250, sy, hex('#5a3418')); let x = 219; for (let b = 0; x < 249; b++) { const w = 2 + Math.floor(h(b, sy, 726) * 2); g_lomo(R, x, sy - 1, w, 7 + Math.floor(h(b, sy, 727) * 4), hex(g_LIBROS[Math.floor(h(b, sy, 728) * 9)])); x += w + 1; } }
    rect(234, 62, 234, 104, P.k); rect(218, 83, 250, 83, P.k); linea(220, 64, 230, 80, hex('#fff0c8')); linea(221, 64, 231, 80, hex('#f8e0a8'));
    for (const y0 of [110, 134]) { rect(218, y0, 250, y0 + 20, hex('#1e3a2e')); rect(220, y0 + 2, 248, y0 + 18, hex('#2a4e3c')); rect(220, y0 + 2, 248, y0 + 2, hex('#3e6e56')); }
    rect(246, 104, 250, 112, hex('#c8a040')); pset(247, 105, hex('#f0d070'));
    // a la derecha, la pared de estuco de la casa de al lado con un buzón de latón
    g_estuco(R, 273, 53, 319, 158, hex('#4e8a86'), hex('#62a29c'), hex('#386a66'), 729); rect(290, 104, 306, 112, hex('#c8a040')); rect(292, 106, 304, 107, hex('#5a3a1e'));
    // la acera de ladrillo, el bordillo y los adoquines
    g_espiga(R, 0, 158, 319, 172, 730); rect(0, 172, 319, 174, hex('#8a8a96')); rect(0, 172, 319, 172, hex('#b0b0bc')); g_adoquines(R, 0, 175, 319, 179, 731);
    // el carrito de libros de saldo de la izquierda
    rect(0, 136, 10, 162, hex('#5a3418')); rect(0, 136, 10, 137, hex('#8a5a2a')); { let x = 0; for (let b = 0; x < 10; b++) { const w = 2; g_lomo(R, x, 135, w, 6 + (b % 3), hex(g_LIBROS[b % 9])); x += w + 1; } } disco(5, 164, 3, P.k); disco(5, 164, 1, hex('#8a8a96'));
    return {};
  });
  // el gato negro que duerme en un cojín del escaparate: levanta la cabeza de vez en cuando
  { const u = (t % 8) / 8, lev = u < 0.45 ? 0 : u < 0.55 ? (u - 0.45) * 10 : u < 0.9 ? 1 : (1 - u) * 10; rect(80, 124, 98, 126, hex('#5a3a6a')); rect(80, 124, 98, 124, hex('#7a5a8a')); g_gatoNegro(R, 89, 124, t, lev); if (lev < 0.3) for (let k = 0; k < 2; k++) { const v = (t * 0.6 + k / 2) % 1; pset(Math.round(94 + v * 6), Math.round(114 - v * 10), hex('#f0e8d0')); } }
  // el libro abierto en el atril, al que de vez en cuando se le pasa una hoja
  rect(98, 106, 118, 112, hex('#f0e8d0')); rect(108, 106, 108, 112, hex('#a89870')); for (let y = 107; y < 112; y++) { rect(100, y, 106, y, (y & 1) ? hex('#f0e8d0') : hex('#b0a890')); rect(110, y, 116, y, (y & 1) ? hex('#f0e8d0') : hex('#b0a890')); }
  { const u = (t % 5) / 0.5; if (u < 1) { const x = Math.round(108 + Math.cos(u * Math.PI) * 8); linea(108, 106, x, 104 + Math.round(Math.abs(Math.sin(u * Math.PI)) * -4), P.blanco); linea(108, 112, x, 110 + Math.round(Math.abs(Math.sin(u * Math.PI)) * -4), hex('#d8d0b8')); } }
  // la lámpara verde del escaparate, con su luz
  R.halo(170, 96, 24, [hex('#c88a48'), hex('#e8b060')], 0.6); poligono([[162, 96], [178, 96], [175, 90], [165, 90]], hex('#2a7a4a')); rect(165, 90, 175, 90, hex('#4aa86a')); rect(163, 97, 177, 97, hex('#fff0c0')); rect(169, 98, 170, 118, hex('#c8a040')); rect(164, 118, 175, 120, hex('#c8a040'));
  // los reflejos del cristal del escaparate (dos franjas que pasan muy despacio)
  for (const [k, w] of [[0, 3], [1, 2]]) { const x0 = Math.round(20 + ((t * 4 + k * 90) % 200)); for (let y = 60; y < 139; y++) { const x = x0 + Math.round((139 - y) * 0.5); for (let i = 0; i < w; i++) if (x + i > 15 && x + i < 195 && (y + i) % 2 === 0) pset(x + i, y, g_mezcla(R.pget(x + i, y), 0xffffffff, 0.35)); } }
  // la campanilla de la puerta en su muelle (o.campana: suena, se mueve y suelta sus ondas)
  { const c = Math.max(0, Math.min(1, o.campana ?? 0)), sw = c > 0 && c < 1 ? Math.sin(c * 30) * (1 - c) * 4 : 0, bx = Math.round(234 + sw);
    linea(234, 54, 234, 58, P.hierro); linea(234, 58, bx, 62, P.hierro); poligono([[bx - 3, 67], [bx + 3, 67], [bx + 2, 62], [bx - 2, 62]], hex('#c8a040')); rect(bx - 2, 62, bx + 2, 62, hex('#f0d070')); pset(bx, 68, hex('#8a6a20'));
    if (c > 0 && c < 0.85) for (const s of [-1, 1]) for (let q = 0; q < 2; q++) { const r = 6 + q * 4 + (c * 20) % 4; for (let a = -0.6; a <= 0.6; a += 0.2) pset(Math.round(bx + s * Math.cos(a) * r), Math.round(64 + Math.sin(a) * r), hex('#f0e8b0')); } }
  // el farol de gas de pared y el letrero del libro
  g_farolGas(R, 286, 76, t, 5, 1); g_letreroLibro(R, 172, 32, t, 1);
  // las macetas de la galería, que gotean en la acera
  for (const [x, k] of [[52, 0], [140, 1], [300, 2]]) { rect(x - 4, 31, x + 4, 36, hex('#a85a3a')); rect(x - 4, 31, x + 4, 31, hex('#c87a4a')); for (let q = 0; q < 6; q++) { const sw = Math.round(Math.sin(t * 1.4 + q + k) * 1); linea(x - 3 + q, 31, x - 4 + q + sw, 26 - (q % 3), hex('#3a8a3a')); }
    const u = ((t + k * 0.7) % 2.2) / 2.2; if (u < 0.75) pset(x, Math.round(37 + u / 0.75 * 124), hex('#9ab8d8')); else { const r = (u - 0.75) * 16; for (let i = -r; i <= r; i++) if (Math.abs(Math.abs(i) - r) < 1) pset(Math.round(x + i), 162, hex('#a8b8d0')); } }
  // las polillas y la niebla baja
  for (let y = 150; y < 180; y++) { const d = 0.1 * Math.sin((y - 150) / 30 * Math.PI); for (let x = 0; x < 320; x++) if (g_b4(x, y) < d * (Math.sin(x * 0.04 + t * 0.5) * 0.5 + 0.5)) pset(x, y, hex('#8a8aa0')); }
  return { suelo: S, escaparate: [14, 58, 196, 140], gato: [89, 124], atril: [108, 109], lampara: [170, 96], puerta: [214, 58, 254, 158], campana: [234, 64], tirador: [248, 108], pie: [200, S], farol: [286, 76], letrero: [172, 32], libres: [[20, 200], [258, 316]] };
}

// la paleta cálida de mercado del pueblo de fantasía
const h_F = pal({
  teja: '#c8643a', tejaS: '#94402a', tejaL: '#ec9462', tejaO: '#5e2416', musgo: '#9a9a52',
  rev: '#ecd2a0', revS: '#c8a26c', revL: '#faeacc', revM: '#dcbc88', sal: '#e8b49a', salS: '#c08670', salL: '#f6d0b8', ocre: '#e8bc6c', ocreS: '#c09048', ocreL: '#f6d690',
  mad: '#7a4626', madS: '#4a2810', madL: '#a46c40', madO: '#2e1808',
  pie: '#bca48a', pieS: '#8c7460', pieL: '#dcc6aa', pieJ: '#6a5444', pieT: '#cbb294',
  ado: '#c4986e', adoS: '#966c4a', adoL: '#e0bc92', adoJ: '#6a4a32', adoT: '#b4865e',
  magenta: '#d4426e', magentaS: '#962848', azafran: '#f0b030', azafranS: '#bc7e14', turq: '#36a090', turqS: '#226a60', crema: '#f8ecd0', cremaS: '#d8c4a0', violeta: '#7a4ab0', violetaS: '#523080',
  hie: '#8cbc4a', hieS: '#5c8c30', hieL: '#b8dc6a', hieO: '#3e6a24',
  are: '#ecc47a', areS: '#c8964e', areL: '#fadca2', areO: '#a87438',
  vid: '#2a2838', vidS: '#1a1824', vidL: '#6a6888', vidC: '#f0b860',
  agua: '#5ab8e0', aguaS: '#2e80b0', aguaL: '#d0f2ff', aguaO: '#1e5a88',
  piel: '#eab48a', pielO: '#a8704a', hierro: '#3a3640', hierroL: '#7a7480', oro: '#f2c440', oroS: '#b48420', oroL: '#fff0a0', plata: '#d8dce4', plataS: '#9098a8',
  papel: '#f4e6c4', papelS: '#d0b88c', papelL: '#fff8e4', tinta: '#4a3438', rojoT: '#c83a2e', verdeT: '#4a8a3a',
  corcho: '#b08050', corchoS: '#86582e', corchoL: '#c89a66',
  fuego: '#ffb040', fuegoL: '#fff0a0', fuegoR: '#e05a20',
  humo: '#e4dcd4', humoS: '#bcb2ac', lej: '#a8b0c4', lejS: '#8c98b0', bruma: '#ecdcc4', vina: '#7aa058', vinaS: '#5a8040', vinaL: '#9cc070',
  oveja: '#f6f2ea', ovejaS: '#c8c0b4', ave: '#2e2632', fruta: '#f08a24', manzana: '#d83a2a', melon: '#7ab040', melonS: '#4e7a2a', barro: '#b8603a', barroS: '#8a4226', barroL: '#d88a5a',
});

const h_VACIO = 0x01020304;

const h_capas = new Map();

// lo fijo de un encuadre se pinta una sola vez en un búfer (lo que queda sin pintar es VACIO) y se guarda por su clave
function h_capa(R, clave, dibuja) {
  let b = h_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(h_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); h_capas.set(clave, b); }
  return b;
}

// copia la capa fija sobre el lienzo salvo sus huecos VACIO (por donde se ve el cielo animado): un recorrido
function h_pegar(R, b) { const B = R.buf; for (let i = 0; i < B.length; i++) { const c = b[i]; if (c !== h_VACIO) B[i] = c; } }

// umbral del tramado ordenado 4 × 4 (0–1) y mezcla de dos colores del lienzo (0xAABBGGRR) en la proporción a
const h_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const h_um = (x, y) => h_BAYER[((y & 3) << 2) | (x & 3)];

function h_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// oscurece (a > 0) un píxel ya pintado, tramado: sombras arrojadas sobre lo que haya
function h_sombra(R, x, y, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; const B = R.buf, i = y * 320 + x; if (B[i] !== h_VACIO) B[i] = h_mezcla(B[i], h_F.madO, a); }

// cifras diminutas de 3 × 5 (solo dígitos)
const h_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function h_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = h_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// una estrella de cinco puntas pequeña (r 2–4) rellena, centrada en (x, y)
function h_estrella(R, x, y, r, c, cS) {
  const pts = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; pts.push([Math.round(x + Math.cos(a) * rr), Math.round(y + Math.sin(a) * rr)]); }
  if (cS != null) R.poligono(pts.map(([a, b]) => [a, b + 1]), cS); R.poligono(pts, c);
}

// el cielo cálido de mediodía: bandas con transición tramada y calima abajo; el sol con su halo; cirros casi quietos y
// cúmulos de tres tonos (lejanos lentos, cercanos rápidos). o.hor, o.sol [x, y, r], o.cumulos (5)
const h_CIELO = [[0, '#3a7ad4'], [0.2, '#4c92e0'], [0.42, '#6eacec'], [0.64, '#96c6f0'], [0.82, '#c4dcea'], [0.94, '#f2dcb4']].map(([f, c]) => [f, hex(c)]);

const h_NUBES = ['#c6b2c6', '#f2e6da', '#ffffff'].map(hex);

function h_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

function h_cielo(R, t, o = {}) {
  const { pset } = R, hor = o.hor ?? 96, B = R.buf, P = h_CIELO, tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = h_um(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;
  const [sx, sy, sr] = o.sol ?? [214, 24, 8], R2 = sr + 11;
  for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
    const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (h_um(x, y) < q * q) B[y * 320 + x] = h_mezcla(B[y * 320 + x], hex('#fff4d0'), 0.45); }
  const cn = h_NUBES;
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 402) * 46), x0 = ((h(k, 6, 402) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 403) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(30, hor * 0.3) + k * hor * 0.14 : Math.max(26, hor * (0.45 + (k - 2) * 0.1))), x = ((h(k, 7, 402) * 470 + t * v) % 500) - 90;
    h_nube(R, Math.round(x), y, w, k + 40, cn); }
  R.disco(sx, sy, sr + 1, hex('#fff0b0')); R.disco(sx, sy, sr, hex('#ffd860')); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec'));
}

// pájaros lejanos en uve que cruzan (no entran en la barra del año ni en la esquina de Atom)
function h_pajaros(R, t, n, y0, v = 9, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(((t * (v + k * 1.3) + h(k, sem, 410) * 400) % 420) - 50), y = Math.round(y0 + h(k, sem, 411) * 22 + Math.sin(t * 0.8 + k) * 2), ala = Math.floor(t * 6 + k * 1.7) % 2;
    if ((x > 266 && y < 50) || (x > 14 && x < 176 && y < 18)) continue;
    R.pset(x, y, h_F.ave); R.pset(x - 1, y - ala, h_F.ave); R.pset(x + 1, y - ala, h_F.ave); R.pset(x - 2, y - 1 + ala * 0, h_F.ave); R.pset(x + 2, y - 1, h_F.ave); }
}

// una cordillera: la cresta (suma de senos, semilla sem) entre y0 − amp e y0, rellena hasta yb con c, fundida abajo con la
// bruma; o.filo: color del borde. Devuelve la cresta (y de cada columna)
function h_colinas(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.13 + sem * 4.1))); cresta[x] = yc;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 7) / 8; B[y * 320 + x] = p > 0 && h_um(x, y) < p ? bruma : c; }
    if (o.filo != null && yc >= 0 && (x * 7 + sem * 3) % 5) B[yc * 320 + x] = o.filo;
  }
  return cresta;
}

// tejas árabes en hiladas (6 × 4 px: la canal en sombra, el lomo con su brillo, la sombra de la hilada de encima, alguna
// gastada y algo de musgo) en los píxeles de la caja que cumplen dentro(x, y)
function h_tejas(R, x0, y0, x1, y1, dentro, sem = 0) {
  const P = h_F, B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (!dentro(x, y)) continue;
    const fila = Math.floor((y - y0) / 4), m = (x + (fila & 1) * 3 + 600) % 6, r = (y - y0) % 4;
    let c = r === 3 ? P.tejaS : m === 0 ? P.tejaS : m === 2 ? (r === 0 ? P.tejaL : P.teja) : m === 3 ? (r < 2 ? P.tejaL : P.teja) : m === 5 && r === 2 ? P.tejaS : P.teja;
    const q = h(x >> 1, y >> 1, sem); if (q < 0.05) c = P.tejaS; else if (q > 0.985 && r < 3) c = P.musgo; else if (q > 0.95 && m > 1 && m < 4) c = P.tejaL;
    B[y * 320 + x] = c; }
}

// revoque con su grano (motas, desconchones donde asoma el ladrillo) y la sombra del alero arriba; base c0, luz cL, sombra cS
function h_revoque(R, x0, y0, x1, y1, sem, c0 = h_F.rev, cS = h_F.revS, cL = h_F.revL, cM = h_F.revM) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const q = h(x, y, sem), g = h(x >> 3, y >> 2, sem + 1);
    let c = q < 0.08 ? cM : q > 0.965 ? cL : c0;
    if (g < 0.035) c = ((x + ((y >> 1) & 1) * 2) % 4 === 0 || (y & 1)) ? h_F.barroS : h_F.barro;   // un desconchón: asoma el ladrillo
    else if (y - y0 < 3 && h_um(x, y) < (3 - (y - y0)) / 3) c = cS;
    B[y * 320 + x] = c; }
}

// una viga de madera (caja) con su veta, la arista de luz arriba y la sombra abajo
function h_viga(R, x0, y0, x1, y1, sem = 0) {
  const P = h_F, { rect, pset } = R; rect(x0, y0, x1, y1, P.madS);
  if (x1 - x0 < 2 || y1 - y0 < 2) return; rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.mad);
  const hor = x1 - x0 > y1 - y0;
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const q = h(hor ? x >> 2 : x, hor ? y : y >> 2, sem); if (q < 0.16) pset(x, y, P.madS); else if (q > 0.9) pset(x, y, P.madL); }
  if (hor) rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, P.madL); else rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, P.madL);
}

// una tornapunta en diagonal de 3 px de grueso, de (x0, y0) a (x1, y1)
function h_diagonal(R, x0, y0, x1, y1) { R.linea(x0, y0, x1, y1, h_F.madS); R.linea(x0 + 1, y0, x1 + 1, y1, h_F.mad); R.linea(x0 + 2, y0, x1 + 2, y1, h_F.madS); }

// sillares de piedra en hiladas a matajunta, cada uno con su tono, su arista de luz arriba y a la izquierda, su sombra
// abajo y motas; alto y ancho del sillar
function h_sillares(R, x0, y0, x1, y1, alto = 7, ancho = 14, sem = 0, dentro = null) {
  const P = h_F, B = R.buf, tonos = [P.pie, P.pieT, P.pieL, P.pie, hex('#b09478')];
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / alto), yy = (y - y0) % alto, off = (fila & 1) * (ancho >> 1) + Math.round(h(fila, 1, sem) * 4);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (dentro && !dentro(x, y)) continue;
      const xr = x - x0 + off + 400, col = Math.floor(xr / ancho), xx = xr % ancho;
      let c; if (yy === alto - 1 || xx === ancho - 1) c = P.pieJ;
      else { c = tonos[Math.floor(h(col, fila, sem) * tonos.length)]; if (yy === 0 || xx === 0) c = h_mezcla(c, P.pieL, 0.55); else if (yy === alto - 2 || xx === ancho - 2) c = h_mezcla(c, P.pieS, 0.6); else if (h(x, y, sem + 3) < 0.07) c = P.pieS; }
      B[y * 320 + x] = c; } }
}

// adoquines en perspectiva: hiladas cada vez más altas hacia abajo, a matajunta, con su tono, brillo arriba, sombra
// abajo, esquinas redondeadas y alguna brizna en las juntas; de y0 a y1 (las hiladas crecen de a0 a a1 px)
function h_adoquines(R, y0, y1, sem = 0, a0 = 3, a1 = 9, x0 = 0, x1 = 319) {
  const P = h_F, B = R.buf, tonos = [P.ado, P.adoT, P.adoL, P.ado, hex('#ba8a62'), hex('#d0a678')];
  let y = y0, fila = 0;
  while (y <= y1) { const alto = Math.round(a0 + (a1 - a0) * (y - y0) / Math.max(1, y1 - y0)), ancho = Math.round(alto * 1.9 + 2), off = Math.round(h(fila, 2, sem) * ancho);
    for (let yy = 0; yy < alto && y + yy <= y1; yy++) { const py = y + yy; if (py < 0 || py > 179) continue;
      for (let x = x0; x <= x1; x++) { const xr = x + off + 800, col = Math.floor(xr / ancho), xx = xr % ancho;
        let c; const esq = (xx === 0 || xx === ancho - 1) && (yy === 0 || yy === alto - 1);
        if (yy === alto - 1 || xx === ancho - 1 || esq) c = h(x, py, sem + 5) < 0.06 ? P.hieS : P.adoJ;
        else { c = tonos[Math.floor(h(col, fila, sem) * tonos.length)]; if (yy === 0) c = h_mezcla(c, P.adoL, 0.5); else if (yy === alto - 2) c = h_mezcla(c, P.adoS, 0.55); else if (h(x, py, sem + 6) < 0.05) c = P.adoS; }
        B[py * 320 + x] = c; } }
    y += alto; fila++; }
}

// una ventana con marco de madera, cristal oscuro con reflejo en diagonal y cruceta, postigos de color con sus lamas,
// alféizar de piedra y jardinera con flores (o.flores false: sin ella); o.luz: un brillo cálido dentro
function h_ventana(R, x, y, w, alto, col = h_F.turq, colS = h_F.turqS, sem = 0, o = {}) {
  const { rect, pset } = R, P = h_F;
  if (o.postigos !== false) for (const sx of [x - 6, x + w + 1]) { rect(sx, y, sx + 5, y + alto, C.k); rect(sx + 1, y + 1, sx + 4, y + alto - 1, col); for (let j = y + 3; j < y + alto - 1; j += 3) rect(sx + 1, j, sx + 4, j, colS); rect(sx + 1, y + 1, sx + 1, y + alto - 1, h_mezcla(col, P.revL, 0.3)); pset(sx + (sx < x ? 4 : 1), y + (alto >> 1), P.hierro); }
  rect(x, y, x + w, y + alto, P.madS); rect(x + 1, y + 1, x + w - 1, y + alto - 1, P.vid);
  const pw = Math.max(2, w >> 1), pa = Math.max(2, alto >> 1);
  for (let j = y + 1; j < y + alto; j++) for (let i = x + 1; i < x + w; i++) { const q = ((i - x) % pw) + ((j - y) % pa); if (j - y < pa * 2 - 1 && (q === 3 || q === 4 || q === 7)) pset(i, j, q === 7 ? h_mezcla(P.vid, P.vidL, 0.5) : P.vidL); else if (j > y + alto - 4) pset(i, j, h_mezcla(P.vid, P.vidL, 0.25)); else if (o.luz && (j - y) > alto * 0.45 && h_um(i, j) < ((j - y) / alto - 0.45) * 1.4) pset(i, j, h_mezcla(P.vid, P.vidC, 0.45)); }
  const mx = x + (w >> 1), my = y + (alto >> 1); rect(mx, y + 1, mx, y + alto - 1, P.mad); rect(x + 1, my, x + w - 1, my, P.mad);
  rect(x - 2, y + alto + 1, x + w + 2, y + alto + 2, P.pieL); rect(x - 2, y + alto + 2, x + w + 2, y + alto + 2, P.pieS);
  if (o.flores !== false) { rect(x - 1, y + alto + 3, x + w + 1, y + alto + 6, P.madS); rect(x, y + alto + 4, x + w, y + alto + 5, P.mad);
    for (let i = x - 1; i <= x + w + 1; i++) { const q = h(i, sem, 420); pset(i, y + alto + 2 - (q > 0.5 ? 1 : 0), q > 0.3 ? P.hieS : P.hie); if (q > 0.55) pset(i, y + alto + 1 - (q > 0.8 ? 1 : 0), [P.magenta, hex('#f070a0'), P.azafran, C.blanco, P.rojoT][Math.floor(h(i, sem, 421) * 5)]); }
    for (let i = x; i <= x + w; i += 3) pset(i, y + alto + 7, P.hieS); }
}

// una figura pequeña de fondo (unos 10 px): x el centro, y los pies; k elige ropa y pelo; o.dir 1 / −1; o.anda; o.ps
// (pset propio, para recortar); o.cesta: lleva una cesta en la cabeza
function h_gente(R, x, y, t, k, o = {}) {
  const ps = o.ps ?? R.pset, P = h_F, d = o.dir ?? 1, paso = o.anda === false ? 0 : Math.floor(t * 5 + k) % 2;
  const ropa = [P.magenta, P.turq, P.azafran, P.violeta, hex('#4a6a9a'), P.barro][k % 6], ropaS = h_mezcla(ropa, C.k, 0.3), piel = k % 3 === 1 ? P.pielO : P.piel, pelo = [hex('#3a2a1a'), hex('#c89a4a'), hex('#6a3a1a'), hex('#1a1a24')][k % 4], pant = hex('#4a3a3a');
  ps(x - 1 + paso, y, pant); ps(x - 1 + paso, y - 1, pant); ps(x + 1 - paso, y, pant); ps(x + 1 - paso, y - 1, pant);
  for (let j = 2; j <= 6; j++) for (let i = -1; i <= 1; i++) ps(x + i, y - j, i === -d ? ropaS : ropa);
  if (k % 2) { ps(x - 2, y - 2, ropaS); ps(x + 2, y - 2, ropa); }
  ps(x - d * 2, y - 4 - paso, ropaS); ps(x + d * 2, y - 4 + paso - 1, ropa); ps(x + d * 2, y - 3 + paso - 1, piel);
  for (let i = -1; i <= 1; i++) { ps(x + i, y - 7, piel); ps(x + i, y - 8, i === -d ? pelo : piel); ps(x + i, y - 9, pelo); }
  ps(x + d, y - 8, piel); if (k % 4 === 1) ps(x - d * 2, y - 7, pelo);
  if (o.cesta) { for (let i = -2; i <= 2; i++) ps(x + i, y - 10, P.azafranS); ps(x - 1, y - 11, P.fruta); ps(x + 1, y - 11, P.manzana); ps(x, y - 11, P.melon); }
}

// una gallina (x el centro, y las patas) que picotea y da pasitos; d la dirección
function h_gallina(R, x, y, t, k, d = 1) {
  const { pset, rect } = R, P = h_F, pic = Math.sin(t * 3 + k * 2.1) > 0.4, bl = C.blanco, bS = hex('#d8d0c4');
  pset(x - 1, y, P.azafranS); pset(x + 1, y, P.azafranS); pset(x - 1, y - 1, P.azafranS); pset(x + 1, y - 1, P.azafranS);
  rect(x - 3, y - 4, x + 2, y - 2, bl); rect(x - 3, y - 3, x - 1, y - 2, bS); pset(x - 3 * d - (d > 0 ? 1 : 0), y - 5, bl); pset(x - 3 * d - (d > 0 ? 1 : 0), y - 6, bS);
  const hx = x + 3 * d, hy = pic ? y - 2 : y - 6; pset(hx, hy, bl); pset(hx, hy - 1, P.rojoT); pset(hx + d, hy, P.azafran); pset(hx, hy + 1, P.rojoT); pset(x + 2 * d, pic ? y - 3 : y - 5, bl);
}

// una paloma pequeña que picotea (x el centro, y las patas); k desfasa y elige hacia dónde mira
function h_paloma(R, x, y, t, k) {
  const { pset } = R, g = hex('#8a8a9a'), gS = hex('#5a5a6a'), pic = Math.sin(t * 4 + k * 3) > 0.5, d = k % 2 ? 1 : -1;
  pset(x - 1, y - 1, g); pset(x, y - 1, g); pset(x + 1, y - 1, g); pset(x - 2 * d, y - 1, gS); pset(x, y - 2, g); pset(x - d, y - 2, g);
  pset(x + d * 2, pic ? y - 1 : y - 3, gS); pset(x + d * 2, pic ? y : y - 2, hex('#6a7a8a')); pset(x, y, h_PATA);
}

// el rosa de las patas de las palomas
const h_PATA = hex('#d87a6a');

// un toldo de rayas inclinado (de ya arriba a yb abajo, entre x0 y x1) con su faldón festoneado; c1 y c2 las rayas
function h_toldo(R, x0, x1, ya, yb, c1, c2) {
  const { pset, rect } = R, P = h_F;
  for (let y = ya; y <= yb; y++) { const u = (y - ya) / Math.max(1, yb - ya), sx = Math.round(u * 3);
    for (let x = x0 - sx; x <= x1 + sx; x++) { const raya = Math.floor((x - x0 + 400) / 4) & 1; let c = raya ? c2 : c1; if (u > 0.6) c = h_mezcla(c, P.madO, 0.12); if (y === ya) c = h_mezcla(c, C.blanco, 0.3); pset(x, y, c); } }
  rect(x0 - 4, yb + 1, x1 + 4, yb + 1, C.k);
  for (let x = x0 - 3; x <= x1 + 3; x++) { const m = (x - x0 + 400) % 6, raya = Math.floor((x - x0 + 400) / 4) & 1; for (let j = 2; j <= 4; j++) { if (j === 4 && (m === 0 || m === 5)) continue; if (j === 3 && m === 0) continue; pset(x, yb + j - 1, j === 4 ? h_mezcla(raya ? c2 : c1, P.madO, 0.35) : raya ? c2 : c1); } }
  rect(x0 - 4, ya - 1, x1 + 4, ya - 1, C.k);
}

// un mostrador de tablas (de y0 a y1) con su veta, el canto de luz arriba y la sombra en el suelo
function h_mostrador(R, x0, x1, y0, y1, sem = 0) {
  const { rect, pset } = R, P = h_F; rect(x0, y0, x1, y1, P.madS);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const tabla = (y - y0) % 4 === 0; pset(x, y, tabla ? P.madS : h(x >> 2, y, sem) < 0.18 ? P.madS : h(x, y >> 1, sem + 1) > 0.88 ? P.madL : P.mad); }
  rect(x0, y0, x1, y0 + 1, P.madL); rect(x0, y0 + 2, x1, y0 + 2, P.madS);
  for (let x = x0 - 2; x <= x1 + 3; x++) if (h_um(x, y1 + 1) < 0.6) pset(x, y1 + 1, h_mezcla(R.pget(x, y1 + 1), P.madO, 0.4));
}

// un tonel de pie (x el centro, y la base) con duelas, aros de hierro, la tapa en elipse y su brillo
function h_tonel(R, x, y, w = 8, alto = 20) {
  const { rect, pset, disco } = R, P = h_F;
  for (let j = 0; j < alto; j++) { const u = j / alto, ww = Math.round(w * (0.86 + 0.14 * Math.sin(u * Math.PI))), yy = y - j;
    rect(x - ww - 1, yy, x + ww + 1, yy, C.k); for (let i = -ww; i <= ww; i++) { const d = (i + ww) % 4 === 0; pset(x + i, yy, d ? P.madS : i < -ww * 0.4 ? P.madL : i > ww * 0.5 ? P.madS : P.mad); } }
  for (const f of [0.2, 0.78]) { const yy = y - Math.round(alto * f); rect(x - w - 1, yy, x + w + 1, yy + 1, P.hierro); pset(x - w + 2, yy, P.hierroL); }
  const yt = y - alto; for (let i = -w; i <= w; i++) for (let j = -2; j <= 2; j++) if ((i / (w + 0.5)) ** 2 + (j / 2.5) ** 2 < 1) pset(x + i, yt + j, Math.abs(j) === 2 || Math.abs(i) >= w - 1 ? P.madS : (i + 40) % 4 === 0 ? P.mad : P.madL);
}

// una caja de madera de listones (x0, y0 arriba a la izquierda) con su contenido asomando (c: color de la fruta o nada)
function h_caja(R, x0, y0, w, alto, c = null) {
  const { rect, pset, disco } = R, P = h_F;
  if (c != null) for (let i = 2; i < w - 1; i += 3) { disco(x0 + i, y0, 2, h_mezcla(c, C.k, 0.25)); pset(x0 + i - 1, y0 - 1, h_mezcla(c, C.blanco, 0.4)); }
  rect(x0, y0, x0 + w, y0 + alto, P.madS); for (let y = y0 + 1; y < y0 + alto; y++) rect(x0 + 1, y, x0 + w - 1, y, (y - y0) % 4 === 0 ? P.madS : (y - y0) % 4 === 1 ? P.madL : P.mad);
  rect(x0 + 1, y0 + 1, x0 + 2, y0 + alto - 1, P.madS); rect(x0 + w - 2, y0 + 1, x0 + w - 1, y0 + alto - 1, P.madS); R.linea(x0 + 2, y0 + alto - 1, x0 + w - 2, y0 + 1, P.madS);
}

// humo de chimenea: bocanadas que suben, crecen, se van a la izquierda con el viento y se deshacen tramadas
function h_humo(R, x, y, t, k = 0, alto = 30) {
  const P = h_F;
  for (let i = 0; i < 6; i++) { const u = ((t * 0.32 + i / 6 + k * 0.37) % 1), cx = x - u * 14 + Math.sin(t * 1.3 + i * 2 + k) * 1.5, cy = y - u * alto, r = 1.5 + u * 3.5, dens = 1 - u;
    for (let j = -Math.ceil(r); j <= Math.ceil(r); j++) for (let ii = -Math.ceil(r); ii <= Math.ceil(r); ii++) { const d = Math.hypot(ii, j); if (d > r) continue; const px = Math.round(cx + ii), py = Math.round(cy + j); if (px > 272 && py < 48) continue; if (h_um(px, py) < dens * 0.95) R.pset(px, py, j < -r * 0.3 ? C.blanco : d > r - 1 ? P.humoS : P.humo); } }
}

// un estandarte colgado de su barra que ondea (x0 su borde izquierdo, y0 la barra; w ancho, alto) con borde dorado,
// cola de golondrina y un emblema: 'estrella' o 'espada'
function h_estandarte(R, x0, y0, w, alto, t, c, cS, emblema, k = 0) {
  const { pset, rect } = R, P = h_F;
  rect(x0 - 2, y0, x0 + w + 2, y0, P.madS); pset(x0 - 2, y0 - 1, P.oro); pset(x0 + w + 2, y0 - 1, P.oro);
  for (let j = 1; j <= alto; j++) { const dx = Math.round(Math.sin(t * 2.6 + j * 0.22 + k) * (j / alto) * 1.6), cola = j > alto - 4 ? Math.abs((w >> 1) - 0) - (alto - j) : -1;
    for (let i = 0; i <= w; i++) { if (j > alto - 4 && Math.abs(i - w / 2) < (j - (alto - 4)) * 1.2) continue;
      const borde = i === 0 || i === w, oro = i === 1 || i === w - 1 || j === 2, sh = Math.sin(t * 2.6 + j * 0.22 + k + i * 0.3) > 0.55;
      pset(x0 + i + dx, y0 + j, borde ? C.k : oro ? P.oro : sh ? cS : c); } }
  const cx = x0 + (w >> 1) + Math.round(Math.sin(t * 2.6 + (alto * 0.45) * 0.22 + k) * 0.8), cy = y0 + Math.round(alto * 0.42);
  if (emblema === 'estrella') h_estrella(R, cx, cy, 3, P.oro, P.oroS);
  else { R.rect(cx, cy - 5, cx, cy + 3, P.plata); R.pset(cx + 1, cy - 4, P.plataS); R.rect(cx - 2, cy + 2, cx + 2, cy + 2, P.oro); R.pset(cx, cy + 4, P.oroS); R.pset(cx, cy + 5, P.oro); }
}

// un letrero colgante (de dos cadenas) que se mece bajo su brazo de hierro: forma 'escudo' (con la espada) o 'jarra'
function h_letrero(R, bx, by, t, forma, k = 0) {
  const { pset, rect, linea, disco } = R, P = h_F, a = Math.sin(t * 1.4 + k) * 0.08, dx = Math.round(a * 14);
  const x = bx + dx, y = by + 3;
  linea(bx - 5, by, x - 5, y, P.hierro); linea(bx + 5, by, x + 5, y, P.hierro);
  if (forma === 'escudo') {
    for (let j = 0; j < 14; j++) { const w = j < 8 ? 6 : Math.round(6 - (j - 8) * 1.0); rect(x - w - 1, y + j, x + w + 1, y + j, C.k); if (w > 0) { rect(x - w, y + j, x - 1, y + j, P.magenta); rect(x, y + j, x + w, y + j, P.azafran); } pset(x - w, y + j, h_mezcla(P.magenta, C.blanco, 0.3)); }
    rect(x - 7, y, x + 7, y, P.oroS); rect(x, y + 1, x, y + 10, P.plata); pset(x + 1, y + 2, P.plataS); rect(x - 2, y + 9, x + 2, y + 9, P.oro); pset(x, y + 11, P.madS); pset(x, y + 12, P.oro);
  } else {
    rect(x - 7, y, x + 7, y + 10, C.k); rect(x - 6, y + 1, x + 6, y + 9, P.madL); rect(x - 6, y + 9, x + 6, y + 9, P.mad);
    rect(x - 3, y + 3, x + 1, y + 8, P.oro); rect(x - 3, y + 2, x + 1, y + 2, C.blanco); pset(x - 2, y + 1, C.blanco); pset(x, y + 1, C.blanco); rect(x + 2, y + 4, x + 3, y + 4, P.oro); rect(x + 3, y + 5, x + 3, y + 6, P.oro); rect(x - 3, y + 8, x + 1, y + 8, P.oroS);
  }
}

// el molino de la colina (x el eje del cuerpo, y la base): cuerpo encalado, caperuza de teja y cuatro aspas que giran
function h_molino(R, x, y, t) {
  const { rect, pset, linea, poligono } = R, P = h_F;
  poligono([[x - 6, y], [x - 4, y - 18], [x + 4, y - 18], [x + 6, y]], hex('#e8e0d0')); for (let j = 0; j < 18; j++) { const w = Math.round(4 + j / 9); pset(x + w, y - 18 + j, hex('#b8ac9c')); pset(x + w - 1, y - 18 + j, hex('#cac0b0')); }
  rect(x - 1, y - 6, x + 1, y, P.madS); pset(x - 2, y - 12, P.vid);
  poligono([[x - 5, y - 18], [x, y - 24], [x + 5, y - 18]], P.teja); linea(x, y - 24, x + 5, y - 18, P.tejaS);
  const hx = x, hy = y - 20, a0 = t * 1.1;
  for (let k = 0; k < 4; k++) { const a = a0 + k * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
    for (let d = 2; d <= 12; d++) { const px = Math.round(hx + ca * d), py = Math.round(hy + sa * d); pset(px, py, P.madS);
      if (d > 3) for (let w = 1; w <= 2; w++) { const qx = Math.round(hx + ca * d - sa * w), qy = Math.round(hy + sa * d + ca * w); pset(qx, qy, (d + w) % 2 ? hex('#f0e8dc') : hex('#cfc4b4')); } } }
  pset(hx, hy, C.k);
}

// la fuente de la plaza (x el centro, y el pie del pilón): pilón de piedra con el agua que ondea, la columna, la taza de
// arriba con su remate, el chorro que sube y cae en arcos y el agua que rebosa de la taza al pilón, con salpicaduras
function h_fuente(R, x, y, t) {
  const { rect, pset, disco, poligono } = R, P = h_F, rx = 26, ry = 7, cy = y - 8;
  for (let j = -ry; j <= 0; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) pset(x + i, cy + j, P.pieL);
  for (let j = 0; j <= 8; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (Math.min(j, ry) / ry) ** 2 * 0))) ; for (let i = -rx; i <= rx; i++) { const ee = (i / rx) ** 2 + ((Math.min(j, 0)) / ry) ** 2; if (ee > 1) continue; const bloque = (Math.floor((i + 40) / 7) + (j > 4 ? 1 : 0)) % 2, jun = (i + 40) % 7 === 0 || j === 4; pset(x + i, cy + j, j === 8 ? P.pieJ : jun ? P.pieJ : i > rx * 0.55 ? P.pieS : bloque ? P.pie : P.pieT); } }
  for (let j = -ry + 2; j <= -1; j++) for (let i = -rx + 3; i <= rx - 3; i++) { const e = (i / (rx - 3)) ** 2 + ((j + 1) / (ry - 2)) ** 2; if (e > 1) continue; const ola = Math.sin(i * 0.5 + t * 3 + j * 1.3) + Math.sin(i * 0.23 - t * 2.1); pset(x + i, cy + j, ola > 1.2 ? P.aguaL : ola > 0.2 ? P.agua : P.aguaS); }
  for (let i = -rx; i <= rx; i++) { const e = Math.sqrt(Math.max(0, 1 - (i / rx) ** 2)); pset(x + i, Math.round(cy - e * ry), P.pieS); pset(x + i, Math.round(cy - e * ry) + 1, P.pieL); }
  for (let i = -rx; i <= rx; i++) pset(x + i, cy, C.k), pset(x + i, cy + 1, P.pieL);
  for (let i = -rx - 1; i <= rx + 1; i++) if (h_um(x + i, y + 1) < 0.5) pset(x + i - 2, y + 1, h_mezcla(R.pget(x + i - 2, y + 1), P.madO, 0.35));
  // la columna y la taza de arriba
  rect(x - 3, cy - 30, x + 3, cy - 3, C.k); rect(x - 2, cy - 30, x + 2, cy - 3, P.pie); rect(x - 2, cy - 30, x - 1, cy - 3, P.pieL); rect(x + 2, cy - 30, x + 2, cy - 3, P.pieS);
  rect(x - 4, cy - 8, x + 4, cy - 6, P.pieT); rect(x - 4, cy - 5, x + 4, cy - 5, P.pieJ);
  const ty = cy - 30;
  for (let j = 0; j <= 5; j++) { const w = 11 - j * 1.4; R.rect(Math.round(x - w), ty + j, Math.round(x + w), ty + j, j === 0 ? P.pieL : j > 3 ? P.pieS : P.pie); pset(Math.round(x - w) - 1, ty + j, C.k); pset(Math.round(x + w) + 1, ty + j, C.k); }
  rect(x - 10, ty - 1, x + 10, ty - 1, P.agua); for (let i = -9; i <= 9; i += 3) pset(x + i + (Math.floor(t * 4) % 3), ty - 1, P.aguaL);
  rect(x - 1, ty - 7, x + 1, ty - 2, P.pieT); disco(x, ty - 8, 2, P.pieL); pset(x, ty - 10, P.pieS);
  // el chorro: sube, se abre en arcos y cae en la taza; la taza rebosa en dos cortinas hasta el pilón
  const fase = t * 6;
  for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 16; i++) { const u = i / 15, px = Math.round(x + s * u * 9), py = Math.round(ty - 11 - Math.sin(u * Math.PI) * 4 + u * 10); if ((i + Math.floor(fase)) % 3 !== 0) pset(px, py, (i + Math.floor(fase)) % 3 === 1 ? P.aguaL : P.agua); }
  for (let j = 0; j < 4; j++) pset(x, ty - 11 - j, (j + Math.floor(fase)) % 2 ? P.aguaL : P.agua);
  for (const s of [-1, 1]) { const sx = x + s * 11; for (let yy = ty + 1; yy < cy - 4; yy++) { const ph = (yy + Math.floor(fase * 1.5)) % 4; if (ph !== 3) pset(sx + (yy > cy - 9 ? s : 0), yy, ph === 0 ? P.aguaL : P.agua); }
    const sp = Math.floor(fase) % 3; pset(sx - 1 + s, cy - 4 - sp, P.aguaL); pset(sx + 1 + s, cy - 5 + sp % 2, P.aguaL); pset(sx + s * 2, cy - 3, C.blanco); }
}

// una casa de entramado de frente con el hastial (de xa a xb, el alero en ye, el pico en yp, la base en yb): revoque,
// postes, carrera y tornapuntas, el tejado a dos aguas de teja con su tabla de borde; cR, cRS, cRL: el revoque
function h_casaHastial(R, xa, xb, ye, yp, yb, sem, cR = h_F.rev, cRS = h_F.revS, cRL = h_F.revL, cRM = h_F.revM) {
  const { rect, linea, pset } = R, P = h_F, cx = (xa + xb) / 2, half = (xb - xa) / 2 + 4;
  h_revoque(R, xa, ye - Math.round((ye - yp) * 0.9), xb, yb, sem, cR, cRS, cRL, cRM);
  h_viga(R, xa, ye, xa + 2, yb, sem); h_viga(R, xb - 2, ye, xb, yb, sem + 1); h_viga(R, xa, ye, xb, ye + 2, sem + 2); h_viga(R, xa, ye + Math.round((yb - ye) * 0.5), xb, ye + Math.round((yb - ye) * 0.5) + 2, sem + 3);
  const dentro = (x, y) => y >= yp + Math.abs(x - cx) * (ye - yp) / half && y <= ye;
  h_tejas(R, Math.floor(cx - half), yp, Math.ceil(cx + half), ye, dentro, sem + 4);
  for (const s of [-1, 1]) { linea(Math.round(cx), yp - 1, Math.round(cx + s * half), ye - 1, C.k); linea(Math.round(cx), yp, Math.round(cx + s * half), ye, P.madS); linea(Math.round(cx), yp + 1, Math.round(cx + s * (half - 2)), ye, P.madL); }
  rect(Math.round(cx - half), ye + 1, Math.round(cx + half), ye + 2, P.madO);
  for (let x = xa; x <= xb; x++) for (let y = ye + 3; y <= ye + 5; y++) h_sombra(R, x, y, 0.25 * (ye + 6 - y) / 3);
}

// lo fijo de la plaza del mercado (cámara general)
function h_fGremioFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = h_F;
  // las colinas lejanas y la de las viñas, que asoman entre los tejados
  h_colinas(R, 82, 16, 106, P.lej, P.bruma, 2.1, { filo: hex('#c8ccd8') });
  const cr = h_colinas(R, 94, 9, 106, P.vina, P.bruma, 4.3, { filo: P.vinaL });
  for (let x = 0; x < 320; x++) for (let y = cr[x] + 2; y < 102; y += 3) if ((x + (y >> 1)) % 4 === 0) pset(x, y, P.vinaS);
  // la plaza empedrada
  h_adoquines(R, 104, 179, 7, 3, 10);
  // la casa baja del fondo, en el hueco: tejado, revoque salmón, un portal y un ventanuco
  h_tejas(R, 126, 88, 170, 95, () => true, 31); rect(126, 87, 170, 87, P.tejaO);
  h_revoque(R, 128, 96, 168, 112, 32, P.sal, P.salS, P.salL, h_mezcla(P.sal, P.salS, 0.5));
  rect(138, 100, 146, 112, P.madS); rect(139, 101, 145, 112, P.mad); pset(144, 106, P.oro); h_ventana(R, 152, 99, 8, 6, P.turq, P.turqS, 33, { flores: false });
  // la casa 1 (hastial, revoque crema) con su chimenea
  rect(194, 46, 200, 62, C.k); for (let y = 47; y < 62; y++) for (let x = 195; x < 200; x++) pset(x, y, (y % 3 === 0 || (x + (y / 3 | 0) * 2) % 4 === 0) ? P.barroS : x > 197 ? P.barro : P.barroL); rect(193, 45, 201, 46, P.pieS);
  h_casaHastial(R, 160, 204, 70, 46, 112, 40);
  h_ventana(R, 176, 74, 12, 12, P.turq, P.turqS, 41);
  h_diagonal(R, 163, 93, 172, 110); h_diagonal(R, 199, 93, 190, 110);
  rect(176, 96, 188, 112, P.madS); rect(177, 97, 187, 112, P.mad); for (let x = 179; x < 187; x += 3) rect(x, 97, x, 112, P.madS); pset(185, 104, P.oro);
  // la casa 2 (alero de frente, revoque salmón) con su chimenea y su balcón
  rect(232, 44, 238, 58, C.k); for (let y = 45; y < 58; y++) for (let x = 233; x < 238; x++) pset(x, y, (y % 3 === 0 || (x + (y / 3 | 0) * 2) % 4 === 0) ? P.barroS : x > 235 ? P.barro : P.barroL); rect(231, 43, 239, 44, P.pieS);
  h_revoque(R, 208, 70, 262, 112, 50, P.sal, P.salS, P.salL, h_mezcla(P.sal, P.salS, 0.5));
  h_tejas(R, 204, 54, 266, 69, (x, y) => x >= 214 - (y - 54) * 10 / 15 && x <= 256 + (y - 54) * 10 / 15, 51);
  linea(214, 53, 256, 53, P.tejaO); rect(202, 70, 266, 71, P.madO);
  for (let x = 208; x <= 262; x++) for (let y = 72; y <= 74; y++) h_sombra(R, x, y, 0.25 * (75 - y) / 3);
  for (const [xa, xb] of [[208, 211], [259, 262]]) for (let y = 72; y < 112; y++) for (let x = xa; x <= xb; x++) pset(x, y, ((y >> 2) + (x > 230 ? 1 : 0)) % 2 ? P.pieL : P.pie);
  h_ventana(R, 220, 76, 10, 12, P.magenta, P.magentaS, 52); h_ventana(R, 242, 76, 10, 12, P.azafran, P.azafranS, 53, { luz: true });
  rect(214, 98, 256, 112, P.salS); rect(216, 99, 254, 112, h_mezcla(P.vid, P.mad, 0.4));   // el soportal de la tienda (se ve tras el puesto)
  // la casa 3 (hastial, ocre) con su ojo de buey y su puerta
  h_casaHastial(R, 264, 320, 76, 52, 112, 60, P.ocre, P.ocreS, P.ocreL, h_mezcla(P.ocre, P.ocreS, 0.5));
  disco(292, 65, 4, C.k); disco(292, 65, 3, P.madS); disco(292, 65, 2, P.vid); pset(291, 64, P.vidL);
  h_ventana(R, 284, 82, 14, 11, P.violeta, P.violetaS, 61);
  h_diagonal(R, 267, 95, 276, 110); rect(302, 96, 314, 112, P.madS); rect(303, 97, 313, 112, P.mad); disco(308, 97, 5, P.madS); disco(308, 98, 4, P.mad); pset(311, 104, P.oro);
  // los puestos del mercado: toldos de rayas, postes, mostradores y género
  // puesto 1: la fruta
  for (const px of [167, 211]) { rect(px, 116, px + 1, 146, P.madS); pset(px, 116, P.madL); }
  h_toldo(R, 167, 212, 106, 116, P.magenta, P.crema);
  rect(170, 120, 208, 128, h_mezcla(P.vid, P.mad, 0.5));
  h_mostrador(R, 164, 214, 128, 146, 70);
  for (let i = 0; i < 9; i++) { const gx = 168 + i * 5, c = [P.fruta, P.manzana, P.melon, P.fruta, hex('#e8d040'), P.manzana, P.fruta, hex('#8a3a8a'), P.melon][i]; disco(gx, 126, 2, h_mezcla(c, C.k, 0.3)); disco(gx, 125, 2, c); pset(gx - 1, 124, h_mezcla(c, C.blanco, 0.5)); if (i % 2) { disco(gx + 2, 123, 2, c); pset(gx + 1, 122, h_mezcla(c, C.blanco, 0.5)); } }
  for (let i = 0; i < 3; i++) h_caja(R, 168 + i * 15, 133, 12, 8, [P.fruta, P.manzana, P.melon][i]);
  // puesto 2: cántaros y telas
  for (const px of [223, 269]) { rect(px, 116, px + 1, 146, P.madS); pset(px, 116, P.madL); }
  h_toldo(R, 223, 270, 106, 116, P.turq, P.crema);
  for (let i = 0; i < 6; i++) { const cx = 229 + i * 7, cc = [P.magenta, P.azafran, P.violeta, P.turq, P.rojoT, P.crema][i]; rect(cx - 1, 120, cx + 1, 129, cc); rect(cx - 1, 120, cx - 1, 129, h_mezcla(cc, C.blanco, 0.3)); rect(cx + 1, 121, cx + 1, 129, h_mezcla(cc, C.k, 0.25)); }
  h_mostrador(R, 222, 272, 130, 146, 71);
  for (let i = 0; i < 6; i++) { const vx = 227 + i * 8, alto = 5 + (i % 3); for (let j = 0; j < alto; j++) { const w = Math.round(2.6 * Math.sin((j + 1) / (alto + 1) * Math.PI)) + 1; rect(vx - w, 129 - j, vx + w, 129 - j, j > alto - 2 ? P.barroS : P.barro); pset(vx - w + 1, 129 - j, P.barroL); } rect(vx - 1, 129 - alto, vx + 1, 129 - alto, P.barroS); pset(vx, 127, i % 2 ? P.crema : P.azafran); }
  for (let y = 134; y < 145; y += 4) for (let x = 226; x < 270; x += 6) { rect(x, y, x + 4, y + 2, [P.violeta, P.azafran, P.magenta, P.turq][((x + y) >> 2) % 4]); pset(x, y, P.crema); }
  // puesto 3 (cortado por el borde): melones y calabazas en cajas
  for (const px of [286]) { rect(px, 118, px + 1, 146, P.madS); pset(px, 118, P.madL); }
  h_toldo(R, 286, 330, 108, 118, P.violeta, P.azafran);
  rect(289, 122, 319, 132, h_mezcla(P.vid, P.mad, 0.5)); h_mostrador(R, 284, 322, 132, 146, 72);
  for (let i = 0; i < 5; i++) { const mx = 290 + i * 7; disco(mx, 129, 3, i % 2 ? P.melonS : P.fruta); disco(mx - 1, 128, 2, i % 2 ? P.melon : P.azafran); for (let j = -2; j <= 2; j += 2) pset(mx + j, 129, i % 2 ? P.melonS : P.azafranS); }
  // la esquina de la casa vecina, a la izquierda del gremio
  h_revoque(R, 0, 40, 7, 140, 79, P.sal, P.salS, P.salL, h_mezcla(P.sal, P.salS, 0.5)); h_viga(R, 4, 40, 7, 140, 78); h_tejas(R, 0, 34, 9, 40, () => true, 77); rect(0, 41, 9, 41, P.madO);
  // ── la casa del gremio
  // el tejado grande con su buhardilla
  h_tejas(R, 2, 22, 140, 46, (x, y) => x >= 16 - (y - 22) * 12 / 24 && x <= 126 + (y - 22) * 12 / 24, 80);
  rect(15, 20, 127, 21, P.tejaO); for (let x = 16; x < 127; x += 4) { pset(x, 19, P.tejaS); pset(x + 1, 19, P.teja); pset(x + 2, 19, P.tejaS); }
  linea(15, 21, 3, 46, C.k); linea(127, 21, 139, 46, C.k);
  h_revoque(R, 61, 30, 81, 45, 81); h_viga(R, 59, 30, 61, 45, 82); h_viga(R, 81, 30, 83, 45, 83);
  rect(65, 34, 77, 45, P.madS); rect(66, 35, 76, 44, P.vid); disco(71, 35, 5, P.madS); disco(71, 35, 4, P.vid); rect(71, 31, 71, 44, P.mad); rect(66, 39, 76, 39, P.mad); for (let j = 0; j < 5; j++) pset(68 + j, 41 - j, P.vidL);
  h_tejas(R, 54, 22, 88, 31, (x, y) => y >= 22 + Math.abs(x - 71) * 9 / 17, 84);
  linea(71, 21, 54, 31, C.k); linea(71, 21, 88, 31, C.k); linea(71, 22, 56, 31, P.madL); linea(71, 22, 86, 31, P.madS);
  rect(2, 46, 140, 47, P.madO);
  // el piso de entramado con tres ventanas
  h_revoque(R, 8, 48, 134, 84, 85);
  for (let x = 8; x <= 134; x++) for (let y = 48; y <= 51; y++) h_sombra(R, x, y, 0.3 * (52 - y) / 4);
  for (const px of [8, 42, 86, 131]) h_viga(R, px, 48, px + 3, 84, 86 + px);
  h_viga(R, 8, 74, 134, 76, 87);
  h_diagonal(R, 11, 77, 20, 84); h_diagonal(R, 38, 77, 29, 84); h_diagonal(R, 89, 77, 98, 84); h_diagonal(R, 128, 77, 119, 84);
  h_ventana(R, 18, 54, 16, 13, P.turq, P.turqS, 88); h_ventana(R, 62, 54, 18, 13, P.magenta, P.magentaS, 89, { luz: true }); h_ventana(R, 106, 54, 16, 13, P.turq, P.turqS, 90);
  // la carrera saliente con las cabezas de las vigas
  rect(4, 84, 138, 88, C.k); rect(5, 85, 137, 87, P.mad); rect(5, 85, 137, 85, P.madL);
  for (let x = 8; x < 136; x += 10) { rect(x, 86, x + 4, 91, P.madS); rect(x + 1, 87, x + 3, 90, P.madL); pset(x + 2, 88, P.madS); }
  // la planta baja de sillares, con las esquinas de piedra clara
  h_sillares(R, 8, 89, 134, 139, 7, 14, 91);
  for (const [xa, xb] of [[8, 14], [128, 134]]) for (let y = 89; y < 139; y++) { const f = Math.floor((y - 89) / 7), yy = (y - 89) % 7; for (let x = xa; x <= xb; x++) { const ancho = f % 2 ? 4 : 7, dentro = xa === 8 ? x - xa < ancho : xb - x < ancho; if (!dentro) continue; pset(x, y, yy === 6 ? P.pieJ : yy === 0 ? C.blanco : P.pieL); } }
  for (let x = 8; x <= 134; x++) for (let y = 89; y <= 92; y++) h_sombra(R, x, y, 0.3 * (93 - y) / 4);
  rect(6, 136, 136, 140, P.pieS); rect(6, 136, 136, 136, P.pieL); for (let x = 6; x < 136; x += 9) pset(x, 138, P.pieJ);
  // la gran puerta en arco con sus dovelas, hojas de tablas, herrajes, aldabas y la mirilla
  const px = 70;
  for (let j = -19; j <= 0; j++) for (let i = -19; i <= 19; i++) { const d = Math.hypot(i, j); if (d > 18.5 || d < 13.5) continue; const a = Math.atan2(-j, i); pset(px + i, 112 + j, ((a / 0.26) % 1 + 1) % 1 < 0.18 ? P.pieJ : d > 17.5 ? P.pieS : d < 14.5 ? P.pieL : P.pieT); }
  for (let y = 112; y <= 136; y++) { rect(px - 18, y, px - 15, y, (y - 112) % 6 === 5 ? P.pieJ : P.pieL); rect(px + 15, y, px + 18, y, (y - 112) % 6 === 5 ? P.pieJ : P.pieT); }
  for (let y = 98; y <= 136; y++) for (let x = px - 14; x <= px + 14; x++) { const dx = x - px, dy = y - 112; if (dy < 0 && dx * dx + dy * dy > 13.5 * 13.5) continue;
    const tabla = (x - px + 14) % 5 === 0 || x === px; pset(x, y, x === px ? C.k : tabla ? P.madS : h(x, y >> 2, 92) < 0.15 ? P.madS : h(x, y, 93) > 0.92 ? P.madL : (x < px ? P.mad : h_mezcla(P.mad, P.madS, 0.3))); }
  for (const by of [104, 118, 130]) { rect(px - 13, by, px - 2, by + 1, P.hierro); rect(px + 2, by, px + 13, by + 1, P.hierro); for (let x = px - 12; x < px + 13; x += 4) if (x !== px) pset(x, by, P.hierroL); }
  for (const s of [-1, 1]) { R.anillo ? R.anillo(px + s * 5, 123, 2, P.hierroL) : null; pset(px + s * 5, 121, P.hierro); pset(px + s * 5 - 1, 123, P.hierroL); pset(px + s * 5 + 1, 123, P.hierroL); pset(px + s * 5, 125, P.hierroL); }
  rect(px - 3, 108, px + 3, 112, P.hierro); rect(px - 2, 109, px + 2, 111, P.vid); pset(px - 1, 109, P.vidL);
  rect(px - 20, 140, px + 20, 143, P.pieS); rect(px - 20, 140, px + 20, 140, P.pieL); rect(px - 22, 143, px + 22, 145, P.pie); rect(px - 22, 143, px + 22, 143, P.pieL); rect(px - 22, 146, px + 22, 146, P.adoJ);
  // la ventana baja con su reja y un tiesto, y el brazo del letrero
  h_ventana(R, 18, 100, 14, 14, P.turq, P.turqS, 94, { postigos: false, flores: false });
  for (let x = 20; x <= 30; x += 3) rect(x, 99, x, 115, P.hierro); rect(17, 106, 33, 106, P.hierro);
  rect(36, 112, 42, 116, P.barroS); rect(37, 112, 41, 115, P.barro); disco(39, 109, 3, P.hieS); pset(38, 107, P.magenta); pset(40, 108, P.rojoT); pset(39, 106, P.hie);
  rect(38, 93, 53, 94, P.hierro); linea(52, 95, 45, 94, P.hierro); pset(38, 92, P.hierro); pset(53, 92, P.hierroL);
  // el farol junto a la puerta (su brazo)
  rect(92, 104, 96, 104, P.hierro); pset(92, 105, P.hierro);
  // el tablón de anuncios, delante a la derecha de la puerta
  h_tejas(R, 90, 101, 136, 106, (x, y) => x >= 92 - (y - 101) && x <= 134 + (y - 101), 95); rect(89, 100, 137, 100, P.tejaO); rect(89, 107, 137, 107, P.madS);
  for (const ppx of [96, 128]) { rect(ppx, 108, ppx + 3, 152, P.madS); rect(ppx + 1, 108, ppx + 2, 152, P.mad); pset(ppx + 1, 110, P.madL); for (let x = ppx - 1; x <= ppx + 6; x++) if (h_um(x, 153) < 0.6) h_sombra(R, x - 2, 153, 0.4); }
  rect(93, 108, 133, 135, C.k); rect(94, 109, 132, 134, P.madL); rect(96, 111, 130, 132, P.corcho);
  for (let y = 111; y <= 132; y++) for (let x = 96; x <= 130; x++) if ((y - 111) % 5 === 4) pset(x, y, P.corchoS); else if (h(x, y, 96) < 0.1) pset(x, y, P.corchoL);
  const notas = [[98, 112, 8, 9, 0], [108, 113, 7, 7, 1], [117, 112, 11, 8, 2], [99, 123, 9, 8, 3], [121, 122, 8, 9, 4]];
  for (const [nx, ny, nw, nh, k] of notas) { rect(nx, ny, nx + nw, ny + nh, P.papelS); rect(nx, ny, nx + nw - 1, ny + nh - 1, P.papel); pset(nx + (nw >> 1), ny, [P.rojoT, P.azafran, P.turq][k % 3]);
    if (k === 0) { disco(nx + 4, ny + 5, 2, P.verdeT); pset(nx + 3, ny + 4, P.oro); } else if (k === 1) { linea(nx + 1, ny + 5, nx + 5, ny + 2, P.tinta); pset(nx + 5, ny + 5, P.rojoT); pset(nx + 4, ny + 4, P.rojoT); } else if (k === 2) { h_estrella(R, nx + 3, ny + 4, 2, P.oro); h_estrella(R, nx + 8, ny + 4, 2, P.oro); } else if (k === 3) { rect(nx + 4, ny + 1, nx + 4, ny + 6, P.plataS); rect(nx + 2, ny + 5, nx + 6, ny + 5, P.oroS); } else { rect(nx + 2, ny + 3, nx + 5, ny + 3, P.oroS); disco(nx + 2, ny + 3, 1, P.oroS); rect(nx + 5, ny + 4, nx + 5, ny + 5, P.oroS); } }
  // la sombra de los aleros y del gremio sobre la plaza (el sol viene de la derecha)
  for (let y = 140; y < 150; y++) for (let x = 0; x < 150 - (y - 140) * 2; x++) if (h_um(x, y) < 0.35 * (150 - y) / 10) h_sombra(R, x, y, 0.3);
  // primer término: toneles, cajas y un saco
  h_tonel(R, 9, 168, 8, 20); h_tonel(R, 22, 178, 8, 18); h_caja(R, 30, 162, 16, 12, P.manzana);
  for (let j = 0; j < 12; j++) { const w = Math.round(6 * Math.sin((j + 2) / 14 * Math.PI)); rect(50 - w, 178 - j, 50 + w, 178 - j, j > 9 ? P.cremaS : (j % 3 === 0 ? P.cremaS : P.crema)); } rect(48, 165, 52, 166, P.madS);
}

// la plaza del mercado con el gremio (cámara general)
function h_fGremio(R, t, o) {
  const { rect, pset, disco, linea } = R, P = h_F;
  h_cielo(R, t, { hor: 106, sol: [222, 24, 8], cumulos: 5 });
  R.recorte([134, 30, 157, 96]); h_molino(R, 146, 92, t); R.recorte(null);
  h_pegar(R, h_capa(R, 'f-gremio', () => h_fGremioFijo(R)));
  h_pajaros(R, t, 4, 24, 8, 1);
  h_humo(R, 197, 44, t, 0, 30); h_humo(R, 235, 42, t, 1, 28);
  // la veleta que gira un poco con el viento
  { const a = Math.sin(t * 0.7) * 0.8, l = Math.round(Math.cos(a) * 5); rect(71, 15, 71, 20, P.hierro); linea(71 - l, 15, 71 + l, 15, P.hierro); pset(71 + l, 14, P.hierro); pset(71 + l + Math.sign(l || 1), 15, P.hierro); pset(71 - l, 14, P.hierro); pset(71 - l, 16, P.hierro); }
  h_estandarte(R, 44, 50, 9, 24, t, P.magenta, P.magentaS, 'estrella', 0);
  h_estandarte(R, 89, 50, 9, 24, t, P.turq, P.turqS, 'espada', 1.7);
  h_letrero(R, 44, 94, t, 'escudo', 0);
  // el farol del gremio: de día, la llama apenas se ve
  { const fl = Math.sin(t * 9) + Math.sin(t * 13.7) > 0.4; rect(91, 105, 95, 113, C.k); rect(92, 106, 94, 112, P.vidC); pset(93, fl ? 108 : 109, P.fuegoL); pset(93, 110, P.fuego); rect(90, 105, 96, 105, P.hierro); rect(91, 113, 95, 113, P.hierro); }
  // la taberna: su brazo y el letrero de la jarra
  rect(262, 87, 274, 87, P.hierro); linea(262, 92, 268, 87, P.hierro); h_letrero(R, 270, 87, t, 'jarra', 1.1);
  // la vecina que riega las macetas de la casa 3 (dentro de su ventana) y el agua que cae en la jardinera
  { const ciclo = (t % 8) / 8, riega = ciclo > 0.15 && ciclo < 0.75; R.recorte([285, 83, 297, 93]); const vx = 291 + (riega ? 2 : 0);
    for (let j = 0; j < 6; j++) for (let i = -2; i <= 2; i++) pset(vx + i, 93 - j, P.violeta); for (let i = -1; i <= 1; i++) { pset(vx + i, 87, P.piel); pset(vx + i, 86, P.piel); pset(vx + i, 85, hex('#6a3a1a')); } pset(vx - 2, 86, hex('#6a3a1a')); R.recorte(null);
    if (riega) { rect(293, 92, 297, 94, P.plataS); rect(294, 92, 296, 93, P.plata); linea(297, 92, 300, 90, P.plataS); for (let k = 0; k < 3; k++) pset(300 + (k & 1), 91 + ((Math.floor(t * 8) + k * 2) % 5), P.aguaL); } }
  // el gato del alféizar de la casa 2: mueve la cola
  { const gx = 222, gy = 89, c = hex('#e08a3a'), cS = hex('#a85a20'); rect(gx, gy - 3, gx + 5, gy, c); rect(gx, gy - 1, gx + 5, gy, cS); rect(gx + 5, gy - 5, gx + 7, gy - 2, c); pset(gx + 5, gy - 6, c); pset(gx + 7, gy - 6, c); pset(gx + 6, gy - 4, C.k);
    const cola = Math.round(Math.sin(t * 2.2) * 2); pset(gx - 1, gy - 1, c); pset(gx - 2, gy - 2 + cola, c); pset(gx - 2, gy - 3 + cola, cS); for (let k = 0; k < 4; k += 2) pset(gx + 1 + k, gy - 3, cS); }
  // los tenderos, detrás de sus mostradores (solo asoman por encima del género)
  { const ps = (x, y, c) => { if (y < 122) pset(x, y, c); };
    h_gente(R, 190 + Math.round(Math.sin(t * 0.8) * 12), 130, t, 2, { ps, dir: Math.cos(t * 0.8) > 0 ? 1 : -1, anda: Math.abs(Math.cos(t * 0.8)) > 0.3 });
    const ps2 = (x, y, c) => { if (y < 124) pset(x, y, c); };
    h_gente(R, 248 + Math.round(Math.sin(t * 0.6 + 2) * 14), 132, t, 5, { ps: ps2, dir: Math.cos(t * 0.6 + 2) > 0 ? 1 : -1, anda: Math.abs(Math.cos(t * 0.6 + 2)) > 0.3 }); }
  // las telas colgadas del puesto 2 se mecen
  for (let i = 0; i < 6; i++) { const cx = 229 + i * 7, s = Math.round(Math.sin(t * 2 + i) * 0.8); if (s) pset(cx + s * 2, 128, [P.magenta, P.azafran, P.violeta, P.turq, P.rojoT, P.crema][i]); }
  // los paseantes de la plaza (por detrás de la fuente)
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, v = 7 + k * 2.3, x = Math.round(d > 0 ? 150 + ((t * v + k * 70) % 200) : 340 - ((t * v + k * 53) % 200)), y = 152 + k;
    if (x < 146) continue; h_gente(R, x, y, t, k + 1, { dir: d, cesta: k === 0 }); }
  h_fuente(R, 240, 168, t);
  h_paloma(R, 222, 153, t, 3);
  // palomas que picotean en la plaza y gallinas en primer término
  for (let k = 0; k < 3; k++) h_paloma(R, 152 + k * 9 + Math.round(Math.sin(t * 0.5 + k) * 3), 166 + (k % 2) * 3, t, k);
  h_gallina(R, 282 + Math.round(Math.sin(t * 0.45) * 10), 174, t, 0, Math.cos(t * 0.45) > 0 ? 1 : -1);
  h_gallina(R, 304 + Math.round(Math.sin(t * 0.37 + 2) * 6), 170, t, 1, Math.cos(t * 0.37 + 2) > 0 ? 1 : -1);
  // el gato de los toneles: duerme y mueve la cola
  { const c = hex('#5a5a66'), cS = hex('#3a3a46'), gx = 4, gy = 146; rect(gx, gy - 3, gx + 8, gy, c); rect(gx, gy - 1, gx + 8, gy, cS); rect(gx + 8, gy - 4, gx + 11, gy, c); pset(gx + 8, gy - 5, c); pset(gx + 11, gy - 5, c); pset(gx + 10, gy - 2, cS);
    const cola = Math.round(Math.sin(t * 1.6) * 1.5); pset(gx - 1, gy - 1, c); pset(gx - 2, gy - 2 + cola, c); pset(gx - 3, gy - 2 + cola, cS); }
  return { suelo: 156, tablon: [94, 108, 132, 134], puerta: [56, 98, 84, 140], fuente: [214, 128, 266, 168] };
}

// el dibujo del héroe que se clava en el tablón (exportado: la escena también lo puede llevar en la mano): un pergamino
// de 26 × 30 px centrado en (x, y), con su chincheta arriba, un héroe dibujado a tinta y pintado a lápiz (casco, espada,
// escudo) y arriba a la derecha su estrella de nivel dorada con el número; o.brillo (0–1): la estrella brilla y
// destella; o.nivel (1): el número; o.chincheta (true)
export function h_dibujoHeroe(R, x, y, t, o = {}) {
  const { rect, pset, linea, disco } = R, P = h_F, br = o.brillo ?? 0, x0 = x - 13, y0 = y - 15;
  rect(x0 + 1, y0 + 1, x0 + 27, y0 + 31, h_mezcla(P.corchoS, C.k, 0.3));
  rect(x0, y0, x0 + 26, y0 + 30, P.papelS); rect(x0, y0, x0 + 25, y0 + 29, P.papel);
  for (let j = y0 + 1; j < y0 + 29; j++) for (let i = x0 + 1; i < x0 + 25; i++) if (h(i, j, 500) < 0.06) pset(i, j, P.papelS); else if (h(i, j, 501) < 0.04) pset(i, j, P.papelL);
  pset(x0, y0 + 29, P.corcho); pset(x0 + 25, y0, P.corcho); pset(x0 + 24, y0 + 29, P.papelS);
  // el héroe a tinta: casco con penacho, cara, túnica azul, escudo rojo y la espada en alto
  const hx = x - 3, hy = y + 2;
  disco(hx, hy - 6, 4, P.tinta); disco(hx, hy - 6, 3, P.piel); rect(hx - 4, hy - 10, hx + 4, hy - 8, P.plataS); rect(hx - 3, hy - 10, hx + 3, hy - 9, P.plata); pset(hx, hy - 12, P.rojoT); pset(hx + 1, hy - 13, P.rojoT); pset(hx - 1, hy - 6, P.tinta); pset(hx + 2, hy - 6, P.tinta); pset(hx, hy - 4, P.rojoT);
  rect(hx - 3, hy - 2, hx + 3, hy + 5, P.tinta); rect(hx - 2, hy - 1, hx + 2, hy + 4, hex('#3a6ac8')); rect(hx - 2, hy + 2, hx + 2, hy + 2, P.oroS);
  rect(hx - 2, hy + 6, hx - 1, hy + 8, P.tinta); rect(hx + 1, hy + 6, hx + 2, hy + 8, P.tinta);
  disco(hx - 5, hy + 1, 3, P.tinta); disco(hx - 5, hy + 1, 2, P.rojoT); pset(hx - 5, hy + 1, P.oro);
  linea(hx + 4, hy, hx + 8, hy - 8, P.tinta); linea(hx + 5, hy - 1, hx + 9, hy - 9, P.plata); rect(hx + 3, hy - 1, hx + 6, hy - 1, P.oroS);
  linea(x0 + 3, y0 + 27, x0 + 22, y0 + 27, h_mezcla(P.verdeT, P.papel, 0.4)); for (let i = x0 + 4; i < x0 + 22; i += 3) pset(i, y0 + 26, P.verdeT);
  // la estrella de nivel y su número
  const sx = x + 7, sy = y - 9, pul = 0.5 + 0.5 * Math.sin(t * 5);
  if (br > 0) for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 3 + 4 * br * (0.7 + 0.3 * pul) && h_um(sx + i, sy + j) < 0.5) pset(sx + i, sy + j, h_mezcla(R.pget(sx + i, sy + j), P.oroL, 0.6)); }
  h_estrella(R, sx, sy, 4, P.oro, P.oroS); pset(sx - 1, sy - 1, P.oroL);
  if (br > 0.3 && pul > 0.7) { pset(sx + 5, sy - 5, C.blanco); pset(sx + 6, sy - 6, P.oroL); pset(sx + 4, sy - 6, P.oroL); pset(sx + 6, sy - 4, P.oroL); }
  h_cifras(R, o.nivel ?? 1, x + 3, y + 2 - 5, P.tinta);
  if (o.chincheta !== false) { disco(x, y0 + 1, 2, P.rojoT); pset(x - 1, y0, hex('#f08070')); pset(x + 1, y0 + 3, h_mezcla(P.rojoT, C.k, 0.4)); }
}

// un papel clavado del tablón (x0, y0, ancho, alto) con su chincheta de color k; la esquina de abajo a la derecha se
// levanta con el aire (pinta solo esa esquina: va cada fotograma sobre la capa fija)
function h_esquina(R, x1, y1, t, k) {
  const { pset } = R, P = h_F, s = Math.max(0, Math.round(1.5 + Math.sin(t * (2.2 + k * 0.4) + k * 1.7) * 1.8 + (Math.sin(t * 0.7 + k) > 0.6 ? 1.5 : 0)));
  for (let j = 0; j <= s; j++) for (let i = 0; i <= s - j; i++) { pset(x1 - i, y1 - j, i + j === s ? P.papelS : (i + j) > s - 1 ? P.papel : P.corchoS); }
  for (let j = 0; j < s; j++) pset(x1 - s + j, y1 - j, P.papelS);
  if (s > 0) for (let j = 0; j <= s; j++) pset(x1 - s + j - 1 + 1, y1 - j + 1 > y1 ? y1 : y1 - j + 1, h_mezcla(P.papelS, P.tinta, 0.2));
}

// lo fijo del tablón de cerca: la pared de entramado del gremio, la ventana, el zócalo, el empedrado y el tablón
function h_fTablonFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = h_F;
  h_revoque(R, 0, 0, 319, 130, 120);
  h_viga(R, 0, 20, 319, 24, 121);
  for (const [xa, xb] of [[0, 4], [72, 77], [248, 253], [315, 319]]) h_viga(R, xa, 25, xb, 130, 122 + xa);
  h_viga(R, 0, 98, 319, 101, 123);
  h_diagonal(R, 6, 102, 22, 128); h_diagonal(R, 66, 102, 50, 128); h_diagonal(R, 256, 102, 272, 128); h_diagonal(R, 310, 102, 294, 128);
  h_diagonal(R, 6, 26, 16, 38); h_diagonal(R, 254, 26, 264, 38);
  for (let x = 0; x < 320; x++) for (let y = 25; y < 33; y++) if (h_um(x, y) < (33 - y) / 8) h_sombra(R, x, y, 0.22);
  // la ventana del gremio: grande, con postigos turquesa y jardinera
  h_ventana(R, 20, 36, 36, 42, P.turq, P.turqS, 124, { luz: true });
  // el zócalo de sillares y el empedrado
  h_sillares(R, 0, 130, 319, 153, 8, 18, 125);
  for (let x = 0; x < 320; x++) for (let y = 130; y < 133; y++) h_sombra(R, x, y, 0.3 * (133 - y) / 3);
  rect(0, 153, 319, 154, P.pieS);
  h_adoquines(R, 155, 179, 126, 5, 11);
  // la sombra del tablón y su tejadillo sobre la pared (el sol viene de la derecha)
  for (let y = 68; y < 154; y++) for (let x = 78; x < 92; x++) if (h_um(x, y) < 0.55) h_sombra(R, x, y, 0.32);
  // el banco de la izquierda, la escoba y el cubo
  rect(4, 134, 64, 138, C.k); rect(5, 135, 63, 137, P.madL); rect(5, 137, 63, 137, P.mad); for (const lx of [8, 58]) { rect(lx, 139, lx + 2, 156, P.madS); pset(lx, 139, P.mad); }
  for (let x = 2; x < 68; x++) if (h_um(x, 157) < 0.5) h_sombra(R, x - 3, 157, 0.35);
  rect(14, 127, 22, 133, C.k); rect(15, 128, 21, 133, P.barro); rect(15, 128, 21, 128, P.barroL); disco(18, 123, 4, P.hieS); disco(17, 122, 3, P.hie); for (const [fx, fy, fc] of [[15, 121, P.magenta], [19, 120, P.azafran], [20, 124, C.blanco], [17, 119, P.rojoT]]) pset(fx, fy, fc);
  for (let j = 0; j < 9; j++) { const w = Math.round(5 * Math.sin((j + 2) / 11 * Math.PI)); rect(40 - w, 133 - j, 40 + w, 133 - j, j % 3 === 0 ? P.cremaS : P.crema); } rect(38, 124, 42, 125, P.madS);
  linea(80, 108, 74, 156, P.madS); linea(81, 108, 75, 156, P.madL); for (let i = -3; i <= 3; i++) linea(74 + i * 0.3, 148, 72 + i, 158, P.azafranS); rect(71, 147, 77, 148, P.mad);
  rect(52, 146, 62, 157, C.k); rect(53, 147, 61, 156, P.plataS); rect(53, 147, 54, 156, P.plata); rect(52, 149, 62, 149, P.hierro); rect(52, 154, 62, 154, P.hierro);
  // el tonel y las cajas de la derecha
  h_tonel(R, 274, 162, 11, 28);
  h_caja(R, 290, 136, 30, 26, null); h_caja(R, 296, 116, 24, 20, P.fruta);
  // ── el tablón: se pinta en un búfer aparte y se pega 8 px más abajo (al alcance de los personajes)
  const tmp = R.nuevo(); tmp.fill(h_VACIO); const prevT = R.usar(tmp);
  h_tejas(R, 82, 52, 248, 66, (x, y) => x >= 90 - (y - 52) * 8 / 14 && x <= 240 + (y - 52) * 8 / 14, 127);
  rect(89, 51, 241, 52, P.tejaO); for (let x = 90; x < 241; x += 5) { pset(x, 50, P.tejaS); pset(x + 1, 50, P.teja); pset(x + 2, 50, P.tejaL); pset(x + 3, 50, P.tejaS); }
  rect(81, 67, 249, 69, P.madO); rect(82, 67, 248, 67, P.madS);
  for (const ppx of [93, 231]) { rect(ppx, 70, ppx + 6, 154, C.k); rect(ppx + 1, 70, ppx + 5, 154, P.mad); rect(ppx + 1, 70, ppx + 2, 154, P.madL); rect(ppx + 5, 70, ppx + 5, 154, P.madS); }
  rect(88, 70, 242, 151, C.k); rect(89, 71, 241, 150, P.madL); rect(92, 74, 238, 147, P.madS);
  for (let y = 72; y < 150; y++) for (let x = 90; x < 241; x++) if (x < 93 || x > 237 || y < 75 || y > 146) { if (h(x >> 2, y, 128) < 0.15) pset(x, y, P.mad); }
  for (const [cx, cy] of [[91, 73], [239, 73], [91, 148], [239, 148]]) { disco(cx, cy, 3, P.madS); disco(cx, cy, 2, P.oroS); pset(cx - 1, cy - 1, P.oro); }
  for (let y = 75; y <= 146; y++) for (let x = 93; x <= 237; x++) { const tb = (x - 93) % 12, q = h(x, y >> 3, 129); let c = tb === 11 ? P.corchoS : tb === 0 ? P.corchoL : q < 0.14 ? P.corchoS : q > 0.93 ? P.corchoL : P.corcho; if (h(x, y, 130) < 0.03) c = P.corchoS; pset(x, y, c); }
  for (let y = 75; y <= 77; y++) for (let x = 93; x <= 237; x++) h_sombra(R, x, y, 0.3 * (78 - y) / 3);
  // los papeles clavados
  const papel = (x0, y0, w, alto, k) => { rect(x0 + 1, y0 + 1, x0 + w + 1, y0 + alto + 1, h_mezcla(P.corchoS, C.k, 0.35)); rect(x0, y0, x0 + w, y0 + alto, P.papelS); rect(x0, y0, x0 + w - 1, y0 + alto - 1, P.papel);
    for (let j = y0 + 1; j < y0 + alto - 1; j++) for (let i = x0 + 1; i < x0 + w - 1; i++) if (h(i, j, 131 + k) < 0.05) pset(i, j, P.papelS);
    const cx = x0 + (w >> 1), cc = [P.rojoT, P.azafran, P.turq, P.violeta, P.magenta, P.verdeT][k]; disco(cx, y0 + 1, 2, cc); pset(cx - 1, y0, C.blanco); pset(cx + 1, y0 + 2, h_mezcla(cc, C.k, 0.4)); };
  // 1: el monstruo con su recompensa
  papel(100, 80, 28, 30, 0);
  { const x = 112, y = 92; disco(x, y, 6, P.tinta); disco(x, y, 5, P.verdeT); rect(x + 3, y + 1, x + 9, y + 4, P.tinta); rect(x + 4, y + 2, x + 8, y + 3, P.verdeT); pset(x + 6, y + 2, C.blanco); pset(x + 8, y + 2, C.blanco); poligono([[x - 4, y - 4], [x - 6, y - 10], [x - 1, y - 5]], P.tinta); poligono([[x + 1, y - 5], [x + 2, y - 10], [x + 4, y - 4]], P.tinta); pset(x + 1, y - 2, P.azafran); pset(x + 2, y - 2, C.k); for (let i = -4; i <= 2; i += 2) pset(x + i, y + 4, h_mezcla(P.verdeT, C.k, 0.4));
    disco(108, 104, 3, P.oroS); disco(108, 104, 2, P.oro); pset(107, 103, P.oroL); h_cifras(R, '50', 113, 102, P.tinta); }
  // 2: el mapa con el camino de puntos y la cruz
  papel(136, 79, 30, 24, 1);
  { for (let j = 82; j < 100; j++) for (let i = 138; i < 164; i++) if (h(i >> 2, j >> 2, 140) < 0.45) pset(i, j, h_mezcla(P.papel, P.hie, 0.35)); linea(140, 98, 152, 82, h_mezcla(P.agua, P.papel, 0.2)); linea(141, 98, 153, 82, h_mezcla(P.agua, P.papel, 0.4));
    for (const [mx, my] of [[156, 88], [160, 90]]) poligono([[mx - 3, my + 2], [mx, my - 3], [mx + 3, my + 2]], P.tinta); for (let k = 0; k < 7; k++) pset(141 + k * 3, 95 - (k % 3), P.tinta); linea(159, 95, 163, 99, P.rojoT); linea(163, 95, 159, 99, P.rojoT); }
  // 3: la poción
  papel(172, 81, 20, 20, 2);
  { rect(180, 84, 183, 87, P.tinta); rect(181, 84, 182, 86, P.madL); disco(181, 93, 5, P.tinta); disco(181, 93, 4, P.magenta); rect(178, 93, 185, 96, P.magentaS); pset(179, 91, C.blanco); pset(183, 90, P.oroL); pset(184, 88, P.oroL); }
  // 4: el trasgo buscado, con tres estrellas
  papel(200, 79, 30, 32, 3);
  { const x = 215, y = 92; disco(x, y, 6, P.tinta); disco(x, y, 5, hex('#8ab05a')); poligono([[x - 5, y - 2], [x - 10, y - 5], [x - 5, y + 1]], hex('#8ab05a')); poligono([[x + 5, y - 2], [x + 10, y - 5], [x + 5, y + 1]], hex('#8ab05a')); pset(x - 2, y - 1, C.k); pset(x + 2, y - 1, C.k); rect(x - 2, y + 3, x + 2, y + 3, C.k); pset(x - 1, y + 4, C.blanco); pset(x + 1, y + 4, C.blanco);
    for (const ex of [207, 215, 223]) h_estrella(R, ex, 105, 3, P.oro, P.oroS); }
  // 5: la espada y el escudo
  papel(100, 116, 26, 26, 4);
  { const x = 113, y = 129; for (let j = -7; j <= 7; j++) { const w = j < 2 ? 6 : 6 - (j - 2); if (w > 0) rect(x - w, y + j, x + w, y + j, j === -7 ? P.tinta : P.turq); pset(x - w, y + j, P.tinta); pset(x + w, y + j, P.tinta); } rect(x - 1, y - 6, x + 1, y + 5, P.oro); rect(x - 5, y - 1, x + 5, y + 1, P.oro); linea(x - 9, y + 9, x + 9, y - 9, P.tinta); linea(x - 8, y + 9, x + 9, y - 8, P.plata); }
  // 6: la llave y el 3
  papel(202, 117, 28, 26, 5);
  { disco(210, 129, 4, P.oroS); disco(210, 129, 2, P.papel); rect(214, 128, 224, 130, P.oroS); rect(214, 128, 224, 128, P.oro); rect(220, 131, 221, 133, P.oroS); rect(223, 131, 224, 134, P.oroS); h_cifras(R, '3', 214, 135, P.tinta); }
  // el hueco para el dibujo nuevo: agujeros de chinchetas viejas y un jirón de papel que quedó clavado
  for (const [hx, hy] of [[150, 112], [176, 110], [162, 140], [184, 132], [146, 128]]) { pset(hx, hy, P.madO); pset(hx + 1, hy, P.corchoS); }
  poligono([[178, 109], [190, 109], [189, 114], [184, 112], [180, 115]], P.papelS); poligono([[178, 108], [189, 108], [188, 112], [183, 111], [179, 113]], P.papel); disco(183, 109, 1, P.azafran);
  R.usar(prevT);
  { const B = R.buf; for (let y = 179; y >= 8; y--) for (let x = 0; x < 320; x++) { const c = tmp[(y - 8) * 320 + x]; if (c !== h_VACIO) B[y * 320 + x] = c; } }
  for (const ppx of [93, 231]) for (let x = ppx - 3; x < ppx + 10; x++) for (let y = 163; y <= 164; y++) if (h_um(x, y) < 0.6) h_sombra(R, x - 3, y, 0.4);
  // un emblema del gremio tallado en la pared, sobre el tablón: el escudo con dos espadas cruzadas
  { const x = 165, y = 40; linea(x - 12, y - 8, x + 12, y + 10, P.plataS); linea(x - 11, y - 8, x + 13, y + 10, P.plata); linea(x + 12, y - 8, x - 12, y + 10, P.plataS); linea(x + 11, y - 8, x - 13, y + 10, P.plata);
    rect(x - 10, y + 5, x - 6, y + 5, P.oroS); rect(x + 6, y + 5, x + 10, y + 5, P.oroS);
    for (let j = 0; j < 18; j++) { const w = j < 10 ? 8 : Math.round(8 - (j - 10) * 1.1); rect(x - w - 1, y - 8 + j, x + w + 1, y - 8 + j, C.k); if (w > 0) { rect(x - w, y - 8 + j, x + w, y - 8 + j, j < 9 ? P.magenta : P.azafran); rect(x + w - 1, y - 8 + j, x + w, y - 8 + j, j < 9 ? P.magentaS : P.azafranS); pset(x - w, y - 8 + j, h_mezcla(j < 9 ? P.magenta : P.azafran, C.blanco, 0.35)); } }
    h_estrella(R, x, y - 2, 4, P.oro, P.oroS); rect(x - 9, y - 9, x + 9, y - 9, P.oroS); rect(x - 9, y - 10, x + 9, y - 10, P.oro);
    for (let i = x - 8; i <= x + 10; i++) if (h_um(i, y + 11) < 0.5) h_sombra(R, i - 2, y + 11, 0.3); }
  // la hiedra que sube por el poste de la derecha
  for (let k = 0; k < 46; k++) { const y = 152 - k * 1.8, x = 251 + Math.round(Math.sin(k * 0.7) * 3), s = h(k, 1, 132); pset(x, Math.round(y), P.hieO); if (s < 0.7) { const lx = x + (k % 2 ? 2 : -2), ly = Math.round(y); pset(lx, ly, P.hieS); pset(lx + (k % 2 ? 1 : -1), ly, P.hie); pset(lx, ly - 1, s < 0.3 ? P.hieL : P.hie); } }
}

// el tablón de cerca (cámara 'tablon')
function h_fTablon(R, t, o) {
  const { rect, pset, disco, linea } = R, P = h_F;
  h_pegar(R, h_capa(R, 'f-tablon', () => h_fTablonFijo(R)));
  // dentro de la ventana: la vela que titila y alguien que pasa de vez en cuando (solo sobre el cristal oscuro)
  { const vid = P.vid, ps = (x, y, c) => { if (x > 21 && x < 55 && y > 37 && y < 77 && R.pget(x, y) === vid) pset(x, y, c); };
    const fl = 0.5 + 0.5 * Math.sin(t * 11) * Math.sin(t * 7.3);
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d < 6 && h_um(48 + i, 70 + j) < (1 - d / 6) * (0.6 + 0.3 * fl)) ps(48 + i, 70 + j, h_mezcla(vid, P.vidC, 0.55)); }
    const u = (t % 9) / 9; if (u < 0.55) { const fx = Math.round(14 + u / 0.55 * 46); for (let j = 0; j < 22; j++) for (let i = -3; i <= 3; i++) if (j < 6 ? Math.hypot(i, j - 3) < 3 : Math.abs(i) < 4) ps(fx + i, 52 + j, h_mezcla(vid, P.mad, 0.55)); } }
  { const vx = 48, vy = 72; rect(vx, vy, vx + 1, vy + 4, P.crema); pset(vx, vy - 1 - (Math.sin(t * 9) > 0 ? 1 : 0), P.fuegoL); pset(vx, vy - 1, P.fuego); }
  // dos guirnaldas de banderines del mercado, de los postes al emblema, que se mecen con el aire
  for (const [xa, xb, k0] of [[79, 146, 0], [184, 248, 3]]) { const L = xb - xa, cuelga = (x) => { const u = (x - xa) / L; return Math.round(26 + Math.sin(u * Math.PI) * 6 + Math.sin(t * 1.5 + k0) * Math.sin(u * Math.PI) * 0.8); };
    for (let x = xa; x <= xb; x++) pset(x, cuelga(x), P.madO);
    for (let k = 0; k < Math.floor(L / 8); k++) { const x0 = xa + 4 + k * 8, y0 = cuelga(x0 + 2) + 1, sw = Math.round(Math.sin(t * 2.4 + k * 0.7 + k0) * 1.2), c = [P.magenta, P.azafran, P.turq, P.violeta, P.crema][(k + k0) % 5];
      for (let j = 0; j < 6; j++) { const w = Math.round((5 - j) / 2); for (let i = -w; i <= w; i++) pset(x0 + 2 + i + Math.round(sw * j / 5), y0 + j, i === w ? h_mezcla(c, C.k, 0.3) : c); } } }
  // las esquinas de los papeles que tiemblan con el aire
  h_esquina(R, 127, 117, t, 0); h_esquina(R, 165, 110, t, 1); h_esquina(R, 229, 118, t, 2); h_esquina(R, 125, 149, t, 3); h_esquina(R, 229, 150, t, 4);
  // el dibujo del héroe, ya clavado en el hueco
  if ((o.clavado ?? 0) > 0) h_dibujoHeroe(R, 165, 135, t, { brillo: o.clavado, nivel: o.nivel ?? 1 });
  // el farol de la pared, que titila
  { const fl = Math.sin(t * 9) + Math.sin(t * 13.7); rect(253, 60, 262, 60, P.hierro); linea(253, 66, 259, 60, P.hierro);
    rect(258, 61, 266, 62, P.hierro); rect(257, 63, 267, 76, C.k); rect(258, 64, 266, 75, h_mezcla(P.vidC, C.blanco, 0.25)); rect(262, 64, 262, 75, P.hierro); rect(258, 69, 266, 69, P.hierro);
    disco(262, 72, 2, P.fuego); pset(262, fl > 0.5 ? 69 : 70, P.fuegoL); pset(262, 71, P.fuegoL); rect(256, 77, 268, 78, P.hierro); pset(262, 79, P.hierro);
    for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 7 && d < 10 + fl && h_um(262 + i, 70 + j) < 0.18) { const c = R.pget(262 + i, 70 + j); pset(262 + i, 70 + j, h_mezcla(c, P.oroL, 0.35)); } } }
  // la hiedra: algunas hojas se mecen
  for (let k = 0; k < 46; k += 5) { const y = Math.round(152 - k * 1.8), x = 251 + Math.round(Math.sin(k * 0.7) * 3) + (k % 2 ? 3 : -3) + Math.round(Math.sin(t * 2.4 + k) * 0.8); pset(x, y, P.hieL); pset(x, y + 1, P.hie); }
  // el gato del tonel: se lava y mueve la cola
  { const c = hex('#e08a3a'), cS = hex('#a85a20'), gx = 268, gy = 132; rect(gx, gy - 4, gx + 9, gy, c); rect(gx, gy - 1, gx + 9, gy, cS); for (let k = 1; k < 9; k += 3) pset(gx + k, gy - 3, cS);
    const lav = Math.sin(t * 1.3) > 0.4; rect(gx + 8, gy - 8, gx + 12, gy - 4, c); pset(gx + 8, gy - 9, c); pset(gx + 12, gy - 9, c); pset(gx + 9, gy - 6, lav ? cS : C.k); pset(gx + 11, gy - 6, lav ? cS : C.k); pset(gx + 10, gy - 5, hex('#f0a0a0'));
    if (lav) { pset(gx + 12, gy - 4, c); pset(gx + 13, gy - 5, c); }
    const cola = Math.round(Math.sin(t * 2) * 2); pset(gx - 1, gy - 1, c); pset(gx - 2, gy - 2, c); pset(gx - 3, gy - 3 + cola, c); pset(gx - 3, gy - 4 + cola, cS); }
  // el gorrión que salta por el tejadillo del tablón
  { const u = (t % 6) / 6, gx = Math.round(110 + u * 110), salto = Math.abs(Math.sin(u * Math.PI * 8)) * 3, gy = Math.round(57 - salto), d = 1;
    pset(gx, gy, hex('#8a5a3a')); pset(gx - 1, gy, hex('#8a5a3a')); pset(gx + 1, gy - 1, hex('#6a4a2a')); pset(gx - 2, gy - 1, hex('#5a3a2a')); pset(gx, gy - 1, hex('#c8a880')); pset(gx + 2, gy - 1, P.azafranS); pset(gx, gy + 1, P.madO); }
  // una mariposa sobre las flores de la ventana
  { const mx = Math.round(40 + Math.sin(t * 0.9) * 22), my = Math.round(92 + Math.sin(t * 1.7) * 6), a = Math.floor(t * 10) % 2; pset(mx, my, C.k); pset(mx - 1, my - a, P.azafran); pset(mx + 1, my - a, P.azafran); if (a) { pset(mx - 1, my + 1, P.azafranS); pset(mx + 1, my + 1, P.azafranS); } }
  // una paloma que pasea por el empedrado
  h_paloma(R, Math.round(30 + ((t * 6) % 40)), 172, t, 1);
  return { suelo: 166, tablon: [88, 78, 242, 159], hueco: [136, 116, 194, 154], dibujo: [165, 135], ventana: [20, 36, 56, 78] };
}

// la costura entre los dos mapas del camino (x): a la izquierda el verde, a la derecha el desierto
const h_COSTURA = 192;

// lo fijo del camino: colinas y meseta, el pueblo amurallado en su colina, la pirámide, los campos y las dunas, el camino,
// el poste y el primer término
function h_fCaminoFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = h_F, B = R.buf, X = h_COSTURA;
  const lado = (x, y) => { const d = x - X; return d < -5 ? 0 : d > 5 ? 1 : (h_um(x, y) < (d + 5) / 10 ? 1 : 0); };   // 0 verde, 1 desierto (fundido tramado)
  // las colinas lejanas (azuladas en el verde, rosadas en el desierto) y la meseta de estratos
  for (let x = 0; x < 320; x++) { const yc = Math.round(84 - 14 * (0.55 + 0.3 * Math.sin(x * 0.019 + 2.1) + 0.14 * Math.sin(x * 0.051 + 4.8) + 0.06 * Math.sin(x * 0.13 + 8.6)));
    for (let y = yc; y <= 104; y++) { const ds = lado(x, y), p = (y - 97) / 8; B[y * 320 + x] = p > 0 && h_um(x, y) < p ? P.bruma : ds ? (y === yc ? hex('#f0c8a8') : hex('#d8a88a')) : (y === yc ? hex('#c8ccd8') : P.lej); } }
  for (let y = 64; y <= 100; y++) { const ancho = y < 68 ? 0 : Math.min(8, (y - 68) * 0.5); for (let x = Math.round(238 - ancho); x <= Math.round(292 + ancho); x++) { if (x > 272 && y < 50) continue; const capa = Math.floor((y - 64 + Math.sin(x * 0.2) * 0.8) / 4);
      let c = [hex('#c8704a'), hex('#d88a5a'), hex('#b8603e'), hex('#e09a68'), hex('#c87850'), hex('#b05a3a'), hex('#d89060'), hex('#c06a44'), hex('#d8946a')][capa % 9];
      if (x > 282 + ancho * 0.6) c = h_mezcla(c, hex('#7a3a2a'), 0.35); else if (x < 246 - ancho * 0.6) c = h_mezcla(c, hex('#f8c890'), 0.3); if (y === 64 || (y < 68 && (x === 238 || x === 292))) c = hex('#f0b080');
      const p = (y - 93) / 8; B[y * 320 + x] = p > 0 && h_um(x, y) < p ? hex('#f2d8b8') : c; } }
  // la pirámide lejana: cara de sol a la derecha y de sombra a la izquierda, con hiladas
  for (let y = 80; y <= 100; y++) { const w = (y - 80) * 0.95; for (let x = Math.round(214 - w); x <= Math.round(214 + w); x++) { let c = x < 214 ? hex('#c89058') : hex('#f0c888'); if ((y - 80) % 3 === 2) c = h_mezcla(c, hex('#8a5a30'), 0.3); const p = (y - 94) / 7; B[y * 320 + x] = p > 0 && h_um(x, y) < p ? hex('#f2d8b8') : c; } }
  // la colina del pueblo, verde con su ladera en sombra y caminitos
  for (let x = 0; x < 150; x++) { const yc = Math.round(80 - 8 * Math.cos((x - 60) / 90 * Math.PI / 2) ** 2 + (x > 110 ? (x - 110) * 0.45 : 0)); for (let y = yc; y <= 104; y++) { let c = x > 80 && h_um(x, y) < (x - 80) / 70 ? hex('#7aa050') : hex('#94b860'); if (y === yc) c = hex('#b4d070'); else if (h(x, y, 605) < 0.07) c = hex('#6a9048'); if ((x + y * 2) % 23 === 0 && y > yc + 2) c = hex('#c8b890'); const p = (y - 97) / 8; B[y * 320 + x] = p > 0 && h_um(x, y) < p ? P.bruma : c; } }
  // el pueblo amurallado en su colina, a la izquierda: murallas, torres, tejados y el gremio con su tejado grande
  { for (let x = 18; x <= 104; x++) { const yb = 82 + Math.round(Math.abs(x - 60) * 0.12); for (let y = 72; y <= yb; y++) B[y * 320 + x] = y === 72 || (y === 71 && x % 4 < 2) ? hex('#d8ccbc') : ((x >> 2) + (y >> 1)) % 5 === 0 ? hex('#a89c8c') : hex('#c4b8a8'); if (x % 4 < 2) B[71 * 320 + x] = hex('#c4b8a8'); }
    for (const [tx, th] of [[20, 14], [58, 18], [102, 13]]) { rect(tx - 3, 72 - th, tx + 3, 80, hex('#b8ac9c')); rect(tx + 1, 72 - th, tx + 3, 80, hex('#9a8e80')); poligono([[tx - 4, 72 - th], [tx, 66 - th], [tx + 4, 72 - th]], P.teja); linea(tx, 66 - th, tx + 4, 72 - th, P.tejaS); pset(tx, 76 - th, P.vid); }
    for (let k = 0; k < 9; k++) { const rx = 26 + k * 9, ry = 66 + Math.round(h(k, 1, 600) * 4), w = 4 + Math.round(h(k, 2, 600) * 2); poligono([[rx - w, ry + 4], [rx, ry - 1], [rx + w, ry + 4]], k % 3 ? P.teja : P.tejaS); rect(rx - w + 1, ry + 4, rx + w - 1, 71, k % 2 ? P.rev : P.sal); pset(rx, ry + 6, P.vid); }
    poligono([[66, 66], [70, 61], [86, 61], [90, 66]], P.tejaL); rect(67, 66, 89, 71, P.rev); rect(76, 67, 79, 71, P.madS); }
  // los campos (verde) y las dunas (desierto) de y 98 a 143
  const cr = new Int16Array(320); for (let x = 0; x < 320; x++) cr[x] = Math.round(100 - 6 * (0.5 + 0.5 * Math.sin(x * 0.03 + 1.3)) - 3 * Math.sin(x * 0.08 + 0.4));
  const campos = [P.hie, P.vina, hex('#e0c060'), P.hieL, hex('#a8c050'), P.vina, hex('#d8a848'), P.hie];
  for (let x = 0; x < 320; x++) for (let y = cr[x]; y < 144; y++) { let c;
    if (lado(x, y) === 0) {
      const fx = Math.floor((x + y * 1.1) / 38), fy = Math.floor((y - 96) / (6 + (y - 96) * 0.25)), base = campos[(fx * 3 + fy * 5 + 800) % campos.length], borde = (x + y * 1.1) % 38 < 1.3;
      c = base; if (borde) c = P.hieO; else if (base === P.vina && (x + y) % 3 === 0) c = P.vinaS; else if (base === hex('#e0c060') && (x * 2 - y) % 4 === 0) c = hex('#c8a040'); else if (base === hex('#d8a848') && (y % 2)) c = hex('#c08a38'); else if (h(x, y, 610) < 0.06) c = P.hieS;
      if (y === cr[x]) c = P.hieL;
    } else {
      const pf = Math.pow(Math.max(0, y - 94), 0.75) * 0.32 + 1.6 * Math.sin(x * 0.035 + 1.2) + 0.8 * Math.sin(x * 0.09 + 0.3), fr = pf - Math.floor(pf);
      c = fr < 0.08 ? P.areL : fr < 0.5 ? (h_um(x, y) < (0.5 - fr) * 1.4 ? P.areL : P.are) : fr < 0.62 ? P.are : (h_um(x, y) < (fr - 0.62) * 2.4 ? P.areO : P.areS);
      if (fr > 0.2 && fr < 0.5 && ((x + Math.round(y * 2.2)) % 6 === 0)) c = h_mezcla(c, P.areS, 0.4); if (y === cr[x]) c = P.areL; if (h(x, y, 611) < 0.02) c = P.areO;
    }
    B[y * 320 + x] = c; }
  // los setos con sus árboles redondos en el verde y el oasis con palmeras en el desierto
  for (let k = 0; k < 12; k++) { const x = Math.round(8 + k * 15 + h(k, 3, 612) * 6), y = cr[x] + 4 + Math.round(h(k, 4, 612) * 26); if (x > X - 14) continue; disco(x, y - 3, 3 + (k % 2), P.hieO); disco(x - 1, y - 4, 2 + (k % 2), P.hieS); pset(x - 2, y - 5, P.hie); rect(x, y, x, y + 1, P.madS); for (let i = -3; i <= 3; i++) if (h_um(x + i - 2, y + 2) < 0.5) h_sombra(R, x + i - 2, y + 2, 0.3); }
  disco(300, 112, 7, P.hieS); for (let i = -9; i <= 9; i++) for (let j = -2; j <= 2; j++) if ((i / 9) ** 2 + (j / 2.5) ** 2 < 1) pset(298 + i, 118 + j, j < 0 ? P.aguaL : P.agua);
  // el camino: tierra con roderas y piedras en el verde, arena clara con huellas en el desierto; bordes con hierba
  const yt = (x) => 144 + Math.round(Math.sin(x * 0.05) * 1.5), yb = (x) => 164 + Math.round(Math.sin(x * 0.04 + 1) * 1.5);
  for (let x = 0; x < 320; x++) for (let y = 144 - 2; y < 180; y++) { let c; const a = yt(x), b = yb(x), ds = lado(x, y);
    if (y < a) continue;
    if (y <= b) { const rod = Math.abs(y - (a + 5 + Math.round(Math.sin(x * 0.07) * 0.6))) < 1 || Math.abs(y - (b - 5 + Math.round(Math.sin(x * 0.06 + 2) * 0.6))) < 1;
      if (ds === 0) { c = h(x >> 1, y, 613) < 0.5 ? hex('#b8885a') : hex('#c4966a'); if (rod) c = hex('#8a6440'); else if (h(x, y, 614) < 0.05) c = hex('#e0c098'); else if (y === a || y === a + 1) c = P.hieS; else if (y === b) c = hex('#8a6440'); }
      else { c = h(x >> 1, y, 615) < 0.5 ? hex('#e8c890') : hex('#eccf98'); if ((x + y * 3) % 9 === 0) c = hex('#dcb87c'); if (rod) c = hex('#d0a870'); else if (y === a) c = P.areS; else if (y === b) c = P.areS; } }
    else { if (ds === 0) { const col = h(x, 0, 616), br = h(x, (y + Math.round(col * 3)) >> 2, 617); c = br < 0.28 ? P.hieS : br > 0.85 ? P.hieL : P.hie; if (br < 0.08) c = P.hieO; if (h(x >> 3, y >> 2, 618) < 0.12) c = h_mezcla(c, P.hieO, 0.3); }
      else { const rz = ((x * 0.6 + y * 2.5 + Math.sin(x * 0.12) * 4) % 8 + 8) % 8; c = rz < 1 ? P.areO : rz < 2.2 ? P.areS : rz > 6.5 ? P.areL : P.are; if (h(x, y, 617) < 0.03) c = P.areO; } }
    B[y * 320 + x] = c; }
  // piedras del camino y huellas en la arena
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 618) * (X - 10)), y = yt(x) + 3 + Math.round(h(k, 2, 618) * 15); pset(x, y, hex('#e8d8c0')); pset(x + 1, y, hex('#9a8a78')); }
  for (let k = 0; k < 9; k++) { const x = X + 14 + k * 13, y = 152 + (k % 2) * 4; rect(x, y, x + 1, y + 2, hex('#d0ac74')); pset(x, y, hex('#c09a64')); }
  // hierba alta y flores en el primer término verde; piedras y una mata en el desierto
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 5, 619) * (X - 14)), y = 168 + Math.round(h(k, 6, 619) * 12); const c = [P.magenta, C.blanco, P.azafran, hex('#8a6ad8')][k % 4]; if (k % 3 === 0) { pset(x, y, c); pset(x, y + 1, P.hieO); } }
  for (const [rx, ry, rr] of [[216, 172, 5], [246, 176, 4], [292, 171, 6]]) { for (let j = -rr; j <= 0; j++) for (let i = -rr - 2; i <= rr + 2; i++) if ((i / (rr + 2)) ** 2 + (j / rr) ** 2 < 1) pset(rx + i, ry + j, i > 1 ? hex('#8a7060') : j < -rr + 2 ? hex('#d8c4b0') : hex('#b09a88')); for (let i = -rr; i <= rr + 4; i++) if (h_um(rx + i, ry + 1) < 0.6) h_sombra(R, rx + i - 2, ry + 1, 0.35); }
  // unas ruinas medio enterradas en las dunas: dos columnas rotas y un capitel caído; matas secas y un cactus
  for (const [cxx, alto] of [[232, 22], [248, 14]]) { rect(cxx - 3, 136 - alto, cxx + 3, 136, C.k); rect(cxx - 2, 136 - alto + 1, cxx + 2, 136, hex('#f0dcc0')); rect(cxx + 1, 136 - alto + 1, cxx + 2, 136, hex('#c8a888')); for (let y = 136 - alto + 3; y < 136; y += 4) rect(cxx - 2, y, cxx + 2, y, hex('#d8bc9c')); pset(cxx - 2, 136 - alto, hex('#c8a888')); pset(cxx + 1, 136 - alto - 1, hex('#f0dcc0')); for (let i = -6; i <= 6; i++) if (h_um(cxx + i, 137) < 0.6) h_sombra(R, cxx + i - 3, 137, 0.35); }
  rect(256, 132, 266, 136, C.k); rect(257, 133, 265, 135, hex('#f0dcc0')); rect(257, 135, 265, 135, hex('#c8a888')); rect(254, 136, 268, 137, P.areS);
  for (const [mx, my] of [[212, 128], [276, 140], [226, 176], [270, 172], [312, 178]]) for (let k = 0; k < 7; k++) { const a = -Math.PI + k * Math.PI / 6; R.linea(mx, my, mx + Math.round(Math.cos(a) * 4), my + Math.round(Math.sin(a) * 3), k % 2 ? hex('#a8844a') : hex('#8a6a3a')); }
  { const kx = 300, ky = 140; rect(kx - 1, ky - 14, kx + 1, ky, hex('#4a8a3a')); rect(kx - 1, ky - 14, kx - 1, ky, hex('#6aaa4a')); rect(kx - 5, ky - 9, kx - 2, ky - 8, hex('#4a8a3a')); rect(kx - 5, ky - 12, kx - 4, ky - 8, hex('#4a8a3a')); rect(kx + 2, ky - 6, kx + 5, ky - 5, hex('#4a8a3a')); rect(kx + 4, ky - 10, kx + 5, ky - 5, hex('#3a6a2a')); pset(kx, ky - 15, P.magenta); for (let i = -4; i <= 6; i++) if (h_um(kx + i, ky + 1) < 0.6) h_sombra(R, kx + i - 3, ky + 1, 0.35); }
  // el poste con las dos flechas (castillo hacia atrás, sol hacia delante)
  { const px = 176; rect(px - 1, 112, px + 1, 146, C.k); rect(px, 112, px, 146, P.madL); for (let i = -3; i <= 3; i++) if (h_um(px + i, 147) < 0.6) h_sombra(R, px + i - 3, 147, 0.4);
    poligono([[156, 119], [160, 115], [175, 115], [175, 123], [160, 123]], C.k); poligono([[158, 119], [161, 116], [174, 116], [174, 122], [161, 122]], P.madL); rect(161, 122, 174, 122, P.mad);
    rect(163, 118, 169, 120, P.plataS); pset(163, 117, P.plataS); pset(165, 117, P.plataS); pset(167, 117, P.plataS); pset(169, 117, P.plataS); rect(166, 119, 166, 120, P.madS);
    poligono([[177, 125], [192, 125], [196, 129], [192, 133], [177, 133]], C.k); poligono([[177, 126], [191, 126], [194, 129], [191, 132], [177, 132]], P.madL); rect(177, 132, 191, 132, P.mad);
    disco(184, 129, 2, P.azafran); for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) pset(184 + dx, 129 + dy, P.azafranS); }
}

// el camino de un mapa a otro (cámara general del 'camino')
function h_fCamino(R, t, o) {
  const { rect, pset, disco, linea } = R, P = h_F, X = h_COSTURA;
  h_cielo(R, t, { hor: 104, sol: [244, 24, 8], cumulos: 5 });
  h_pegar(R, h_capa(R, 'f-camino', () => h_fCaminoFijo(R)));
  // la calima que tiembla sobre el horizonte del desierto
  { const B = R.buf; for (let y = 88; y < 104; y++) { const s = Math.round(Math.sin(t * 5 + y * 0.9) * 1.2); if (!s) continue; const f = y * 320, fila = B.slice(f + X + 6, f + 320); for (let x = X + 6; x < 320; x++) { const xx = x - X - 6 - s; if (xx >= 0 && xx < fila.length) B[f + x] = fila[xx]; } } }
  h_pajaros(R, t, 3, 30, 8, 2);
  // las banderolas del pueblo
  for (const [tx, th] of [[20, 14], [58, 18], [102, 13]]) { const top = 66 - th; rect(tx, top - 5, tx, top, P.hierro); const w = Math.floor(t * 4 + tx) % 2; pset(tx + 1, top - 5, P.magenta); pset(tx + 2, top - 5 + w, P.magenta); pset(tx + 1, top - 4, P.magentaS); pset(tx + 3, top - 4 + w, P.magenta); }
  // el molino en su loma
  h_molino(R, 132, 108, t);
  // las ovejas que pastan (cabeceando y avanzando despacio)
  for (let k = 0; k < 5; k++) { const x = Math.round(30 + k * 19 + Math.sin(t * 0.2 + k * 2) * 4), y = 116 + (k % 3) * 6, pic = Math.sin(t * 2 + k * 1.3) > 0.3;
    rect(x - 3, y - 3, x + 2, y - 1, P.oveja); rect(x - 3, y - 1, x + 2, y - 1, P.ovejaS); pset(x - 2, y, C.k); pset(x + 1, y, C.k); pset(x + 3, pic ? y - 1 : y - 3, C.k); pset(x + 4, pic ? y : y - 3, C.k); pset(x - 2, y - 4, P.oveja); pset(x, y - 4, C.blanco); }
  // el halcón que planea en círculos sobre el desierto
  { const a = t * 0.5, hx = Math.round(236 + Math.cos(a) * 22), hy = Math.round(56 + Math.sin(a) * 6), b = Math.round(Math.sin(t * 2)); for (let i = -4; i <= 4; i++) pset(hx + i, hy - (Math.abs(i) > 2 ? b : 0), P.ave); pset(hx, hy + 1, P.ave); pset(hx, hy - 1, hex('#8a6a4a')); }
  // las palmeras del oasis, que se mecen
  for (const [px, alto, k] of [[292, 16, 0], [306, 12, 1]]) { const m = Math.sin(t * 1.3 + k) * 1.2; for (let j = 0; j <= alto; j++) { const u = j / alto; pset(Math.round(px + u * 2 + m * u * u), 112 - j, j % 3 ? hex('#8a6a3a') : hex('#6a4a2a')); }
    const tx = Math.round(px + 2 + m), ty = 112 - alto; for (let f = 0; f < 6; f++) { const a = -Math.PI + f * Math.PI / 5 + Math.sin(t * 2 + f + k) * 0.12; for (let d = 1; d < 8; d++) pset(Math.round(tx + Math.cos(a) * d), Math.round(ty + Math.sin(a) * d * 0.6 + d * d / 20), d > 5 ? P.hieS : P.hie); } }
  // la costura del mapa: una línea de puntos dorados que avanzan hacia abajo, y el mojón con la flecha
  if (o.frontera !== false) { const f = Math.floor(t * 6) % 4; for (let y = 100 + f; y < 180; y += 4) { pset(X, y, P.oroL); pset(X, y + 1, P.oro); }
    rect(X - 4, 134, X + 4, 145, C.k); rect(X - 3, 135, X + 3, 145, P.pieL); rect(X + 1, 135, X + 3, 145, P.pieS); rect(X - 3, 134, X + 3, 134, P.pieL);
    const b = Math.round(Math.sin(t * 3) * 1); for (let i = 0; i < 4; i++) { pset(X - 2 + i + b, 139, P.oroS); } pset(X + 1 + b, 138, P.oroS); pset(X + 1 + b, 140, P.oroS); for (let i = -6; i <= 6; i++) if (h_um(X + i, 146) < 0.5) h_sombra(R, X + i - 3, 146, 0.4); }
  // la hierba alta del primer término, que se mece con el viento
  for (let k = 0; k < 44; k++) { const x = Math.round(h(k, 8, 620) * (X - 10)), y = 168 + Math.round(h(k, 9, 620) * 12), al = 3 + (k % 4), sw = Math.sin(t * 2.2 + x * 0.12) * 1.4;
    for (let j = 0; j < al; j++) pset(Math.round(x + sw * j / al), y - j, j > al - 2 ? P.hieL : k % 2 ? P.hieS : P.hie); pset(Math.round(x + 1 + sw * 0.5), y - 1, P.hieO); }
  // dos mariposas en el verde
  for (let k = 0; k < 2; k++) { const mx = Math.round(60 + k * 60 + Math.sin(t * 0.8 + k * 3) * 20), my = Math.round(140 + Math.sin(t * 1.9 + k) * 6), a = Math.floor(t * 9 + k) % 2, c = k ? C.blanco : P.azafran; pset(mx, my, C.k); pset(mx - 1, my - a, c); pset(mx + 1, my - a, c); }
  // el rodamatojos que cruza el desierto rodando y botando
  { const u = (t % 9) / 9, x = Math.round(X + 8 + u * 150), y = 174 - Math.round(Math.abs(Math.sin(u * Math.PI * 6)) * 5), a = t * 6;
    for (let k = 0; k < 14; k++) { const an = a + k * 0.9, r = 2 + (k % 3); pset(Math.round(x + Math.cos(an) * r), Math.round(y - 4 + Math.sin(an) * r), k % 2 ? hex('#a87a48') : hex('#c89a62')); } if (x < 330) for (let i = -3; i <= 3; i++) if (h_um(x + i, 175) < 0.4) h_sombra(R, x + i, 176, 0.3); }
  // la lagartija de la piedra: se asoma y corre
  { const u = (t % 5) / 5, lx = u < 0.6 ? 292 : Math.round(292 + (u - 0.6) * 60), ly = 164; pset(lx, ly, hex('#6a9a3a')); pset(lx + 1, ly, hex('#6a9a3a')); pset(lx + 2, ly - (u < 0.6 && Math.sin(t * 6) > 0 ? 1 : 0), hex('#4a7a2a')); pset(lx - 1, ly + 1, hex('#4a7a2a')); pset(lx - 2, ly + 1, hex('#4a7a2a')); }
  return { suelo: 156, camino: [144, 164], frontera: o.frontera === false ? null : X, poste: [176, 112], horizonte: 100, molino: [132, 108] };
}

// las almenas de la muralla: ¿hay merlón en la columna x? (14 px: 8 de merlón y 6 de hueco)
const h_merlon = (x) => ((x + 3) % 14) < 8;

// ¿está (x, y) dentro del hueco del arco de la puerta? (jambas en x 134–186, medio punto de radio 26 con centro en 160, 96)
const h_enArco = (x, y) => { const dx = x - 160, dy = y - 96; return x >= 134 && x <= 186 && y <= 152 && (dy >= 0 ? y >= 70 : dx * dx + dy * dy <= 26 * 26); };

// lo fijo de la calle del pueblo que se ve por el arco cuando la puerta se abre: dos casas de entramado con ventanas,
// postigos y jardineras, la del fondo con su toldo y su letrero, el empedrado que sube y un trozo de cielo
function h_calleFija(R) {
  const { rect, pset, poligono, disco, linea } = R, P = h_F;
  for (let y = 70; y < 104; y++) for (let x = 134; x <= 186; x++) pset(x, y, h_CIELO[2 + Math.min(3, (y - 70) >> 3)][1]);
  h_nube(R, 146, 80, 14, 7, h_NUBES);
  // la casa del fondo (ocre) con su hastial, ventana y toldo
  h_casaHastial(R, 150, 172, 98, 84, 134, 643, P.ocre, P.ocreS, P.ocreL, h_mezcla(P.ocre, P.ocreS, 0.5));
  h_ventana(R, 157, 102, 8, 7, P.turq, P.turqS, 644);
  h_toldo(R, 153, 169, 118, 122, P.azafran, P.crema); rect(154, 124, 168, 134, h_mezcla(P.vid, P.mad, 0.4)); for (let i = 0; i < 4; i++) { disco(156 + i * 4, 132, 1, [P.fruta, P.manzana, P.melon, P.fruta][i]); }
  // la casa de la izquierda (salmón, de lado) y la de la derecha (crema), en perspectiva
  for (let y = 76; y <= 140; y++) { const xr = Math.round(150 - (y - 76) * 0.02); for (let x = 134; x <= xr; x++) { const q = h(x, y, 645); pset(x, y, x >= xr - 1 ? P.madS : (y - 76) % 22 < 2 ? P.mad : q < 0.08 ? h_mezcla(P.sal, P.salS, 0.5) : P.sal); } }
  for (const vy of [84, 106]) { rect(138, vy, 145, vy + 10, P.madS); rect(139, vy + 1, 144, vy + 9, P.vid); pset(140, vy + 2, P.vidL); rect(136, vy, 137, vy + 10, P.magenta); rect(138, vy + 11, 145, vy + 12, P.hieS); pset(140, vy + 10, P.rojoT); pset(143, vy + 10, P.azafran); }
  for (let y = 80; y <= 140; y++) for (let x = 172; x <= 186; x++) { const q = h(x, y, 646); pset(x, y, x <= 173 ? P.madS : (y - 80) % 20 < 2 ? P.mad : q < 0.08 ? P.revM : P.rev); }
  rect(176, 88, 183, 98, P.madS); rect(177, 89, 182, 97, P.vid); pset(178, 90, P.vidL); rect(184, 88, 186, 98, P.turq); rect(176, 99, 183, 100, P.hieS); pset(178, 98, P.magenta); pset(181, 98, C.blanco);
  rect(176, 112, 184, 134, P.madS); rect(177, 113, 183, 134, P.mad); pset(182, 123, P.oro);
  linea(172, 106, 178, 106, P.hierro); rect(176, 107, 180, 112, P.madL); pset(178, 109, P.oro);
  // el empedrado que sube hacia la plaza
  for (let y = 134; y <= 152; y++) { const alto = 2 + Math.round((y - 134) / 6); for (let x = 134; x <= 186; x++) { const fila = Math.floor((y - 134) / alto), junta = (y - 134) % alto === alto - 1 || (x + fila * 3) % (alto * 2 + 2) === 0; pset(x, y, junta ? P.adoJ : h(x >> 2, fila, 647) < 0.4 ? P.adoL : P.ado); } }
}

// lo fijo de la puerta de la muralla: tejados del pueblo detrás, la muralla de sillares con almenas, las torres, el arco
// de dovelas con el rastrillo, la hiedra, el camino y la hierba
function h_fPuertaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = h_F, B = R.buf;
  // los tejados y el campanario del pueblo por detrás de la muralla
  for (const [x0, x1, ye, yp, sal] of [[0, 30, 50, 38, 0], [26, 64, 52, 36, 1], [64, 92, 50, 40, 0], [230, 262, 52, 42, 1], [258, 296, 54, 48, 0], [292, 320, 54, 49, 1]]) {
    const cx = (x0 + x1) / 2, half = (x1 - x0) / 2; h_revoque(R, x0 + 2, ye, x1 - 2, 60, 650 + x0, sal ? P.sal : P.ocre, sal ? P.salS : P.ocreS, sal ? P.salL : P.ocreL, sal ? P.salS : P.ocreS);
    h_tejas(R, x0 - 2, yp, x1 + 2, ye, (x, y) => y >= yp + Math.abs(x - cx) * (ye - yp) / (half + 2), 651 + x0); linea(Math.round(cx), yp - 1, x0 - 2, ye, C.k); linea(Math.round(cx), yp - 1, x1 + 2, ye, C.k); }
  rect(36, 37, 48, 60, C.k); h_revoque(R, 37, 38, 47, 60, 652, P.rev, P.revS, P.revL, P.revM); rect(39, 41, 45, 47, P.madO); disco(42, 41, 3, P.madO); rect(36, 48, 48, 49, P.pieS);
  h_tejas(R, 34, 28, 50, 38, (x, y) => y >= 28 + Math.abs(x - 42) * 10 / 8, 653); linea(42, 27, 34, 38, C.k); linea(42, 27, 50, 38, C.k); rect(42, 24, 42, 27, P.hierro); rect(41, 25, 43, 25, P.hierro);
  // la muralla: sillares, con las almenas arriba
  h_sillares(R, 0, 56, 319, 152, 7, 14, 654);
  for (let x = 0; x < 320; x++) if (h_merlon(x)) { for (let y = 48; y < 56; y++) B[y * 320 + x] = y === 48 ? P.pieL : ((x + 3) % 14 === 0 || (x + 3) % 14 === 7) ? ((x + 3) % 14 === 0 ? P.pieL : P.pieS) : h(x, y, 655) < 0.08 ? P.pieS : P.pie; }
  rect(0, 56, 319, 57, P.pieS); for (let x = 0; x < 320; x++) for (let y = 58; y < 62; y++) h_sombra(R, x, y, 0.22 * (62 - y) / 4);
  // las dos torres: más claras, con su imposta, saeteras y almenas
  for (const tx of [88, 192]) {
    h_sillares(R, tx, 36, tx + 40, 152, 7, 12, 656 + tx);
    for (let y = 36; y <= 152; y++) for (let x = tx + 33; x <= tx + 40; x++) h_sombra(R, x, y, tx < 160 ? 0.12 : 0.04);
    for (let y = 36; y <= 152; y++) for (let x = tx; x <= tx + 6; x++) h_sombra(R, x, y, tx < 160 ? -0 : 0.12);
    rect(tx - 2, 34, tx + 42, 37, P.pieS); rect(tx - 2, 34, tx + 42, 34, P.pieL);
    for (let x = tx - 2; x <= tx + 42; x++) if (((x - tx + 2) % 11) < 7) { rect(x, 26, x, 33, ((x - tx + 2) % 11) === 0 ? P.pieL : ((x - tx + 2) % 11) === 6 ? P.pieS : P.pie); pset(x, 26, P.pieL); }
    rect(tx - 2, 33, tx + 42, 33, P.pieJ);
    for (const sy of [58, 96]) { rect(tx + 18, sy, tx + 21, sy + 14, C.k); rect(tx + 19, sy + 1, tx + 20, sy + 13, P.vidS); rect(tx + 16, sy + 6, tx + 23, sy + 7, C.k); rect(tx + 17, sy - 1, tx + 22, sy - 1, P.pieL); rect(tx + 17, sy + 15, tx + 22, sy + 15, P.pieL); }
    rect(tx + 19, 16, tx + 19, 26, P.hierro); }
  // el arco de la puerta: las dovelas, las jambas y el hueco con el rastrillo arriba
  const cx = 160, cy = 96;
  for (let y = 62; y <= 152; y++) for (let x = 126; x <= 194; x++) { const dx = x - cx, dy = y - cy, d = Math.hypot(dx, Math.min(0, dy));
    if (dy < 0 && d > 26 && d <= 33) { const a = Math.atan2(-dy, dx); pset(x, y, ((a / 0.2) % 1 + 1) % 1 < 0.13 ? P.pieJ : d > 32 ? P.pieS : d < 27.5 ? P.pieL : P.pieT); }
    else if (dy >= 0 && Math.abs(dx) > 26 && Math.abs(dx) <= 32) pset(x, y, (y - 96) % 8 === 7 || Math.abs(dx) === 32 ? P.pieJ : Math.abs(dx) < 28 ? (dx < 0 ? P.pieL : P.pieS) : P.pieT); }
  for (let x = 155; x <= 165; x++) for (let y = 61; y <= 66; y++) pset(x, y, y === 61 || x === 155 || x === 165 ? P.pieJ : P.pieL);
  disco(160, 64, 2, P.oroS); pset(160, 64, P.oro);
  // el camino que llega a la puerta y la hierba de los lados
  for (let y = 152; y < 180; y++) { const u = (y - 152) / 28, xl = 134 - u * 44, xr = 186 + u * 44;
    for (let x = 0; x < 320; x++) { let c;
      if (x >= xl && x <= xr) { const rod = Math.abs(x - (148 - u * 18)) < 1.2 || Math.abs(x - (172 + u * 18)) < 1.2; c = rod ? hex('#8a6440') : h(x >> 1, y, 660) < 0.5 ? hex('#b8885a') : hex('#c4966a'); if (h(x, y, 661) < 0.05) c = hex('#e0c098'); if (x < xl + 2 || x > xr - 2) c = P.hieS; }
      else { const q = h(x, y >> 1, 662); c = q < 0.3 ? P.hieS : q > 0.88 ? P.hieL : P.hie; if ((x * 5 + y * 3) % 13 === 0) c = P.hieO; if (y < 155) c = h_mezcla(c, P.madO, 0.25); }
      B[y * 320 + x] = c; } }
  for (let x = 0; x < 320; x++) { if (x > 128 && x < 192) continue; B[152 * 320 + x] = P.hieO; }
  // la hiedra que trepa por la muralla a la izquierda y por la torre derecha, y las matas al pie
  for (const [bx, n, sem] of [[18, 60, 663], [56, 40, 664], [226, 50, 665], [300, 44, 666]]) for (let k = 0; k < n; k++) { const y = 152 - k * 1.3, x = bx + Math.round(Math.sin(k * 0.35 + sem) * 6 + h(k, 1, sem) * 4 - 2), s = h(k, 2, sem);
    pset(x, Math.round(y), P.hieO); if (s < 0.75) { const lx = x + (k % 2 ? 2 : -2), ly = Math.round(y); pset(lx, ly, P.hieS); pset(lx + (k % 2 ? 1 : -1), ly, P.hie); pset(lx, ly - 1, s < 0.3 ? P.hieL : P.hie); } }
  for (const [mx, my, r] of [[8, 158, 9], [40, 166, 7], [296, 160, 10], [270, 170, 6]]) { disco(mx, my, r, P.hieO); disco(mx - 1, my - 1, r - 1, P.hieS); for (let k = 0; k < r * 2; k++) pset(mx - r + Math.round(h(k, mx, 667) * r * 2), my - r + Math.round(h(k, my, 668) * r), k % 3 ? P.hie : P.hieL); for (let k = 0; k < 3; k++) pset(mx - 3 + k * 3, my - r + 2, [P.magenta, C.blanco, P.azafran][k]); }
  // una carreta de heno arrimada a la muralla, a la derecha
  { const x = 244, y = 152; rect(x, y - 16, x + 30, y - 6, P.madS); for (let i = x + 1; i < x + 30; i++) for (let j = y - 15; j < y - 6; j++) pset(i, j, (j - y) % 3 === 0 ? P.madS : P.mad);
    for (let j = 0; j < 12; j++) { const w = 15 - Math.abs(j - 4); for (let i = -w; i <= w; i++) pset(x + 15 + i, y - 17 - j + (j > 8 ? 0 : 0), h(i + 40, j, 669) < 0.3 ? hex('#c8a040') : h(i + 40, j, 670) < 0.2 ? hex('#f8e090') : hex('#e8c860')); }
    for (const wx of [x + 6, x + 24]) { disco(wx, y - 4, 5, C.k); disco(wx, y - 4, 4, P.mad); disco(wx, y - 4, 1, P.madS); for (let a = 0; a < 6; a++) R.linea(wx, y - 4, wx + Math.round(Math.cos(a) * 4), y - 4 + Math.round(Math.sin(a) * 4), P.madS); }
    R.linea(x - 10, y - 2, x, y - 10, P.madS); for (let i = -2; i < 34; i++) if (h_um(x + i, y + 1) < 0.6) h_sombra(R, x + i - 3, y + 1, 0.4); }
}

// las hojas de la puerta (una por lado) con tablas, herrajes, clavos, aldaba y media cerradura; a: 0 cerrada, 1 abierta
// (la hoja gira hacia dentro y se estrecha hacia su jamba, cada vez más en sombra)
function h_hojas(R, a) {
  const { rect, pset } = R, P = h_F, cx = 160, cy = 96, r = 26;
  for (const s of [-1, 1]) { const ancho = Math.max(2, Math.round(26 * (1 - a * 0.88))), x0 = s < 0 ? 134 : 186 - ancho + 1, x1 = s < 0 ? 134 + ancho - 1 : 186, osc = a * 0.55;
    for (let y = 70; y <= 152; y++) for (let x = x0; x <= x1; x++) { const dx = x - cx, dy = y - cy; if (dy < 0 && dx * dx + dy * dy > r * r) continue;
      const u = s < 0 ? (x - x0) / ancho : (x1 - x) / ancho, tabla = Math.floor(u * 5), borde = Math.abs(u * 5 - tabla) < 0.18 || (s < 0 ? x === x1 : x === x0);
      let c = borde ? P.madS : h(tabla + s * 10, y >> 2, 680) < 0.18 ? P.madS : h(x, y, 681) > 0.93 ? P.madL : P.mad;
      for (const by of [92, 118, 142]) if (y >= by && y <= by + 2) c = y === by ? P.hierroL : P.hierro;
      if ((y === 93 || y === 119 || y === 143) && (Math.round(u * 26) % 5 === 2)) c = P.plata;
      if (s > 0 && a === 0 && x === x0) c = C.k;
      pset(x, y, osc > 0 ? h_mezcla(c, P.madO, osc) : c); }
    if (a < 0.15) { const kx = s < 0 ? 150 : 170; pset(kx, 110, P.hierro); for (let j = -2; j <= 2; j++) { pset(kx - 2, 112 + j, P.hierroL); pset(kx + 2, 112 + j, P.hierroL); } pset(kx - 1, 115, P.hierroL); pset(kx + 1, 115, P.hierroL); pset(kx, 115, P.hierroL); pset(kx, 109, P.hierro); pset(kx - 1, 110, P.hierroL); pset(kx + 1, 110, P.hierroL); } }
  if (a < 0.15) { rect(154, 128, 166, 146, C.k); rect(155, 129, 165, 145, P.oroS); rect(155, 129, 165, 129, P.oro); rect(155, 129, 155, 145, P.oro); for (const [px, py] of [[156, 130], [164, 130], [156, 144], [164, 144]]) pset(px, py, P.oroL);
    rect(159, 134, 161, 136, C.k); rect(160, 137, 160, 141, C.k); rect(159, 139, 161, 141, C.k); }
}

// la puerta de la muralla (cámara 'puerta' del 'camino')
function h_fPuerta(R, t, o) {
  const { rect, pset, disco, linea } = R, P = h_F, ab = Math.max(0, Math.min(1, o.abierta ?? 0)), tumbada = !!o.tumbada;
  h_cielo(R, t, { hor: 70, sol: [250, 22, 7], cumulos: 4 });
  h_pajaros(R, t, 3, 22, 7, 3);
  h_pegar(R, h_capa(R, 'f-puerta', () => h_fPuertaFijo(R)));
  // el hueco del arco: cerrado se ve la sombra del zaguán; abierto o tumbado, la calle del pueblo
  R.recorte([134, 70, 186, 152]);
  const dentroArco = (x, y) => { const dx = x - 160, dy = y - 96; return dy >= 0 || dx * dx + dy * dy <= 26 * 26; };
  if (ab > 0 || tumbada) { const b = h_capa(R, 'f-calle', () => h_calleFija(R)), B = R.buf; for (let y = 70; y <= 152; y++) for (let x = 134; x <= 186; x++) { const i = y * 320 + x; if (b[i] !== h_VACIO && h_enArco(x, y)) B[i] = b[i]; }
    const u = (t % 7) / 7, gx = Math.round(130 + u * 64); h_gente(R, gx, 140, t, 3, { dir: 1, cesta: true, ps: (x, y, c) => { if (h_enArco(x, y) && x < 172) pset(x, y, c); } });
    { const v = (t % 11) / 11, gx2 = Math.round(190 - v * 60); h_gente(R, gx2, 146, t, 0, { dir: -1, ps: (x, y, c) => { if (h_enArco(x, y)) pset(x, y, c); } }); } }
  // el zaguán en sombra y el rastrillo de hierro arriba
  { const B = R.buf; for (let y = 70; y <= 152; y++) for (let x = 134; x <= 186; x++) { const dx = x - 160, dy = y - 96; if (dy < 0 && dx * dx + dy * dy > 26 * 26) continue; if (y < 86 || (ab === 0 && !tumbada)) { const i = y * 320 + x; B[i] = h_mezcla(B[i] === h_VACIO ? P.vidS : B[i], P.madO, y < 86 ? 0.55 : 0.2); } else if (x < 138 || x > 182) { const i = y * 320 + x; B[i] = h_mezcla(B[i], P.madO, 0.4); } }
    for (let x = 136; x <= 184; x += 5) for (let y = 70; y <= 84; y++) if (dentroArco(x, y)) pset(x, y, y === 84 ? P.hierroL : P.hierro);
    for (let y = 72; y <= 82; y += 5) for (let x = 134; x <= 186; x++) if (dentroArco(x, y)) pset(x, y, P.hierro);
    for (let x = 136; x <= 184; x += 5) { pset(x, 85, P.hierro); pset(x, 86, P.hierroL); } }
  if (tumbada) {   // la puerta caída hacia dentro: plana en el suelo, en perspectiva, con los herrajes; las bisagras rotas
    for (let y = 130; y <= 151; y++) { const u = (y - 130) / 21, xl = Math.round(147 - u * 12), xr = Math.round(173 + u * 12), w = xr - xl;
      for (let x = xl; x <= xr; x++) { const f = (x - xl) / w * 6, tb = Math.floor(f); let c = f - tb < 0.12 || x === xr ? P.madS : y === 130 ? P.madL : h(tb, y >> 2, 682) < 0.2 ? h_mezcla(P.mad, P.madS, 0.4) : (tb % 2 ? P.mad : h_mezcla(P.mad, P.madL, 0.35));
        if (y === 134 || y === 135 || y === 142 || y === 143 || y === 149 || y === 150) c = (y & 1) ? P.hierro : P.hierroL; if (x === xl || x === xr) c = C.k; pset(x, y, c); }
      pset(xl - 1, y, h_mezcla(R.pget(xl - 1, y), P.madO, 0.5)); }
    rect(156, 144, 164, 147, P.oroS); rect(157, 144, 163, 144, P.oro); rect(159, 145, 161, 146, C.k);
    for (let x = 134; x <= 186; x++) pset(x, 152, P.madO);
    for (const [hx, hy] of [[135, 96], [135, 132], [185, 96], [185, 132]]) { pset(hx, hy, P.hierroL); pset(hx, hy + 1, P.hierro); pset(hx + (hx < 160 ? 1 : -1), hy + 2, P.hierro); }
  } else if (ab < 1) h_hojas(R, ab);
  else h_hojas(R, 1);
  R.recorte(null);
  // las banderas de las torres y los estandartes de la muralla
  for (const [px, k] of [[107, 0], [211, 1]]) { for (let j = 0; j < 6; j++) for (let i = 1; i <= 11; i++) { const dy = Math.round(Math.sin(t * 5 - i * 0.6 + k) * (i / 11) * 1.4); pset(px + i, 17 + j + dy, j === 0 || j === 5 || i === 11 ? (k ? P.turqS : P.magentaS) : (j === 2 || j === 3) && i > 3 && i < 8 ? P.oro : k ? P.turq : P.magenta); } }
  h_estandarte(R, 30, 62, 12, 36, t, P.magenta, P.magentaS, 'estrella', 0.4);
  h_estandarte(R, 268, 62, 12, 36, t, P.turq, P.turqS, 'espada', 2.1);
  // las antorchas a los lados del arco, que crepitan con su resplandor
  for (const [ax, k] of [[123, 0], [197, 1]]) { rect(ax - 1, 104, ax + 1, 114, C.k); rect(ax, 104, ax, 114, P.madL); rect(ax - 2, 112, ax + 2, 113, P.hierro); rect(ax + (k ? -4 : 2), 110, ax + (k ? -2 : 4), 111, P.hierro);
    const f = Math.sin(t * 13 + k * 2) + Math.sin(t * 7.7 + k), al = 4 + Math.round(f);
    for (let j = 0; j < al + 2; j++) { const w = j < 2 ? 2 : j < al - 1 ? 1 : 0, sw = Math.round(Math.sin(t * 9 + j + k) * (j / 5)); for (let i = -w; i <= w; i++) pset(ax + i + sw, 103 - j, j < 2 ? P.fuegoR : Math.abs(i) === w && w > 0 ? P.fuego : P.fuegoL); }
    for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 4 && d < 9 + f && h_um(ax + i, 100 + j) < 0.2) pset(ax + i, 100 + j, h_mezcla(R.pget(ax + i, 100 + j), P.fuegoL, 0.3)); }
    if (Math.floor(t * 3 + k) % 4 === 0) pset(ax + Math.round(Math.sin(t * 5) * 2), 94 - Math.floor((t * 8) % 6), P.fuego); }
  // el centinela que pasea por el adarve (se ve por encima de las almenas y por los huecos)
  { const u = (t % 14) / 14, x = Math.round(u < 0.5 ? 4 + u * 2 * 76 : 80 - (u - 0.5) * 2 * 76), d = u < 0.5 ? 1 : -1, ps = (xx, yy, c) => { if (yy < 48 || (yy < 56 && !h_merlon(xx))) pset(xx, yy, c); };
    for (let j = 0; j < 10; j++) for (let i = -2; i <= 2; i++) ps(x + i, 60 - j, i === -d * 2 ? hex('#5a2a3a') : P.magentaS);
    for (let i = -1; i <= 1; i++) { ps(x + i, 50, P.piel); ps(x + i, 49, P.piel); ps(x + i, 48, P.plataS); ps(x + i, 47, P.plata); } ps(x, 46, P.plata); ps(x + d, 49, C.k);
    for (let j = 0; j < 16; j++) ps(x + d * 3, 58 - j, P.madS); ps(x + d * 3, 41, P.plata); ps(x + d * 3, 40, P.plataS); }
  // los cuervos de las almenas de la derecha: saltan y graznan
  for (const [cx, k] of [[234, 0], [262, 1]]) { const salta = Math.max(0, Math.sin(t * 2.3 + k * 2)) > 0.85 ? 2 : 0, gra = Math.sin(t * 1.7 + k * 3) > 0.8, d = k ? -1 : 1, y = 47 - salta, x = cx + Math.round(Math.sin(t * 0.4 + k) * 1.5);
    if (!h_merlon(x)) continue; rect(x - 2, y - 2, x + 1, y, P.ave); pset(x - 3 * d, y - 1, P.ave); pset(x + 2 * d, y - 3, P.ave); pset(x + 2 * d, y - 2, P.ave); pset(x + 3 * d, y - 2, P.azafranS); if (gra) pset(x + 3 * d, y - 3, P.azafranS); pset(x + d, y - 3, C.blanco); }
  // la campana del campanario, que se mece
  { const a = Math.round(Math.sin(t * 2) * 1.5); rect(41 + a, 42, 43 + a, 45, P.oroS); rect(40 + a, 45, 44 + a, 46, P.oro); pset(42 + a, 47, P.hierro); }
  // la hierba del primer término, al viento
  for (let k = 0; k < 40; k++) { const s = k % 2, x = s ? 230 + Math.round(h(k, 1, 690) * 88) : Math.round(h(k, 1, 690) * 88), y = 166 + Math.round(h(k, 2, 690) * 14), al = 3 + (k % 4), sw = Math.sin(t * 2.1 + x * 0.1) * 1.3;
    for (let j = 0; j < al; j++) pset(Math.round(x + sw * j / al), y - j, j > al - 2 ? P.hieL : k % 3 ? P.hieS : P.hie); }
  return { suelo: 160, puerta: [134, 70, 186, 152], cerradura: [160, 137], aldabas: [[150, 112], [170, 112]], antorchas: [[123, 100], [197, 100]] };
}

// lo que va por DELANTE de los personajes en el estudio (se pinta después de R.actor, con las mismas opciones que
// estudio): en 'cabina' general, la mesa de faders y el alféizar del cristal que tapan al técnico de cintura para abajo;
// en 'cabina' 'micro', el alféizar del cristal (tapa los pies del actor de dentro) y la consola. En lo demás, nada.
export function i_estudioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'cabina' && cam !== 'micro') i_consolaVentana(R, t);
  if (enc === 'cabina' && cam === 'micro') i_consolaGrande(R, t);
}

const IC = {
  techo: hex('#d6d2c4'), techoS: hex('#bcb8aa'), techoL: hex('#e6e2d6'), luz: hex('#fbfaf2'), luzS: hex('#e0e4e8'),
  pared: hex('#c8c2ae'), paredS: hex('#b0aa96'), paredL: hex('#d8d2c0'), zocalo: hex('#5c5864'), zocaloL: hex('#7a7682'),
  moq: hex('#6a6a78'), moqS: hex('#5a5a68'), moqL: hex('#7c7c8a'), moqD: hex('#4c4c5a'),
  corcho: hex('#b8864e'), corchoS: hex('#96683a'), corchoL: hex('#d2a068'),
  beis: hex('#d8d0b8'), beisS: hex('#aaa288'), beisL: hex('#eee8d4'), beisD: hex('#7a7462'),
  mesa: hex('#b08a5e'), mesaS: hex('#8a6640'), mesaL: hex('#c8a474'), mesaD: hex('#6a4a2e'),
  tela: hex('#5e6c86'), telaS: hex('#4a566e'), telaL: hex('#74829c'),
  esp: hex('#3c3c4c'), espS: hex('#262632'), espL: hex('#52526a'), espD: hex('#1c1c26'),
  panel: hex('#7a5232'), panelS: hex('#5a3a22'), panelL: hex('#9a6e44'),
  pantalla: hex('#0c1418'), cristal: hex('#9ab8c8'), reflejo: hex('#d8e8f0'),
  pcb: hex('#1e7a3a'), pcbS: hex('#125426'), pcbL: hex('#3aa85a'), pista: hex('#2e9a4a'), oroT: hex('#e8c040'), oroTS: hex('#a8842a'),
};

// un fondo fijo que se pinta una sola vez por lienzo y luego se copia entero en cada fotograma (como th-comun.js)
const i_CACHE = new WeakMap();

function i_fijo(R, clave, dibuja) {
  let m = i_CACHE.get(R); if (!m) i_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla de dos colores del lienzo (k = 0 el primero, 1 el segundo)
function i_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// un color a partir de sus tres componentes (0–255)
const i_rgb = (r, g, b) => (0xff000000 | (Math.max(0, Math.min(255, Math.round(b))) << 16) | (Math.max(0, Math.min(255, Math.round(g))) << 8) | Math.max(0, Math.min(255, Math.round(r)))) >>> 0;

// una sombra elíptica que oscurece lo que hay debajo
function i_sombra(R, cx, cy, rx, ry, f = 0.78) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, i_mezcla(c, C.k, 1 - f)); } }
}

// la luz que entra por una ventana o cae de un foco: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila)
function i_luz(R, x0, y0, x1, y1, inclin, a = 0.3, col = C.blanco, abre = 0) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin), e = Math.round((y - y0) * abre); for (let x = x0 + d - e; x <= x1 + d + e; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, i_mezcla(c, col, a)); } }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); la recorta R.recorte
function i_nube(R, cx, cy, w, cols = [hex('#c4d6e8'), hex('#e6f0f8'), C.blanco]) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), cols[0]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), cols[1]);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.62), cols[2]);
}

// el techo de placas del estudio (y 0–13) con la cornisa; focos: [[x0, x1]] plafones
function i_techo(R, focos, y1 = 13) {
  const { rect, pset } = R;
  rect(0, 0, 319, y1, IC.techo);
  for (let k = 0; k < 120; k++) pset(Math.floor(h(k, 1, 900) * 320), Math.floor(h(k, 2, 900) * y1), IC.techoS);
  for (let x = 6; x < 320; x += 28) rect(x, 0, x, y1, IC.techoS);
  rect(0, 6, 319, 6, IC.techoS); rect(0, 7, 319, 7, IC.techoL);
  for (const [x0, x1] of focos) { rect(x0, 1, x1, 5, C.k); rect(x0 + 1, 2, x1 - 1, 4, IC.luz); for (let x = x0 + 4; x < x1; x += 4) pset(x, 3, IC.luzS); }
  rect(0, y1 + 1, 319, y1 + 2, IC.paredS); rect(0, y1 + 1, 319, y1 + 1, IC.techoL);
}

// moqueta de bucle (y0–y1): moteado de tres tonos, las pasadas del aspirador y más oscura al fondo
function i_moqueta(R, y0, y1, c = IC.moq, cS = IC.moqS, cL = IC.moqL, k = 0) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0);
    for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 910 + k), pas = ((x + Math.round(y * 0.4)) >> 4) & 1;
      let col = n < 0.22 ? cS : n > 0.86 ? cL : c; if (pas && n > 0.6 && n < 0.72) col = cL; if (f < 0.25 && n < 0.45) col = cS;
      R.pset(x, y, col); } }
  R.rect(0, y0, 319, y0, IC.moqD);
}

// una nota musical (símbolo): o.doble = corchea doble
function i_nota(R, x, y, c, doble = false) {
  x = Math.round(x); y = Math.round(y);
  R.rect(x, y + 4, x + 2, y + 5, c); R.pset(x + 1, y + 6, c); R.rect(x + 2, y - 1, x + 2, y + 4, c);
  if (doble) { R.rect(x + 6, y + 3, x + 8, y + 4, c); R.pset(x + 7, y + 5, c); R.rect(x + 8, y - 1, x + 8, y + 3, c); R.rect(x + 2, y - 1, x + 8, y, c); }
  else { R.pset(x + 3, y, c); R.pset(x + 4, y + 1, c); }
}

// una figurita de fondo de ~10 px (cabeza, pelo, cuerpo, piernas que andan): cols [piel, pelo, ropa, pantalón]
function i_figurita(R, x, suelo, t, cols, anda = 0, dir = 1) {
  x = Math.round(x); const p = anda ? Math.floor(t * 8) % 2 : 0, [pi, pe, ro, pa] = cols;
  R.pset(x - 1 + p, suelo, pa); R.pset(x + 1 - p, suelo, pa); R.rect(x - 1, suelo - 3, x + 1, suelo - 1, pa);
  R.rect(x - 2, suelo - 7, x + 2, suelo - 4, ro); R.pset(x + 2 * dir, suelo - 5, pi);
  R.rect(x - 1, suelo - 10, x + 1, suelo - 8, pi); R.rect(x - 1, suelo - 11, x + 1, suelo - 11, pe); R.pset(x - dir, suelo - 10, pe);
}

// el bosque de las pantallas: el mismo cuadro (cielo con sol y nubes, la sierra con nieve, el castillo de cuento en su
// colina, el camino, dos árboles, flores, la hierba del primer plano) en color continuo; (u, v) 0–1
function i_bosqueRGB(u, v, t, asp) {
  let r, g, b;
  // el cielo: degradado azul → naranja, el sol y su halo
  { const k = v / 0.55; r = 70 + 180 * k * k; g = 110 + 90 * k; b = 210 - 70 * k;
    const ds = Math.hypot((u - 0.7) * asp, v - 0.24); if (ds < 0.075) { r = 255; g = 246; b = 196; } else { const gl = Math.max(0, 0.4 - ds) * 2.2; r += 110 * gl; g += 80 * gl; b += 20 * gl; } }
  // las nubes, en dos bandas que van a distinta velocidad
  for (const [vc, sp, f] of [[0.12, 0.012, 9], [0.3, 0.025, 13]]) { const uu = u - t * sp, n = Math.sin(uu * f) * 0.55 + Math.sin(uu * f * 2.3 + 1.7) * 0.3 + Math.sin(uu * f * 5.1 + 0.4) * 0.15, band = 1 - Math.abs(v - vc) / 0.06;
    if (band > 0 && n * band > 0.2) { const sh = Math.max(0, Math.min(1, (v - vc + 0.03) / 0.08)); r = 255 - 50 * sh; g = 232 - 60 * sh; b = 226 - 30 * sh; } }
  // la sierra lejana (con nieve en las crestas) y la bruma al pie
  const m = 0.37 + 0.07 * Math.sin(u * 6.5 + 0.5) + 0.03 * Math.sin(u * 19 + 1.3);
  if (v > m) { const k2 = Math.min(1, (v - m) * 7); r = 128 - 30 * k2 + 50 * (1 - k2) * (v < 0.5 ? 1 : 0); g = 120 - 16 * k2; b = 182 - 20 * k2; if (v < m + 0.035 && Math.sin(u * 47) > -0.2) { r = 236; g = 238; b = 250; } }
  // el castillo de cuento en su colina, con el tejado azul y la banderita
  { const cu = Math.abs(u - 0.31); if (cu < 0.05 && v > 0.36 && v < 0.5) { r = 196; g = 190; b = 206; if (cu < 0.012 && v > 0.42 && v < 0.46) { r = 50; g = 50; b = 80; } if (Math.abs(u - 0.31 + 0.03) < 0.008 && v > 0.38 && v < 0.41) { r = 50; g = 50; b = 80; } }
    for (const tu of [0.27, 0.35]) if (Math.abs(u - tu) < 0.016 && v > 0.3 && v < 0.5) { r = 206; g = 200; b = 214; }
    for (const tu of [0.27, 0.35]) if (v > 0.24 && v <= 0.3 && Math.abs(u - tu) < (v - 0.24) * 0.38) { r = 60; g = 92; b = 190; }
    if (v > 0.22 && v < 0.24 && u > 0.35 && u < 0.35 + 0.03 + 0.008 * Math.sin(t * 6 + u * 90)) { r = 220; g = 60; b = 60; } }
  // las colinas verdes del medio y el camino que serpentea hasta el castillo
  const hc = 0.52 + 0.04 * Math.sin(u * 5 + 2) + 0.015 * Math.sin(u * 23);
  if (v > hc) { const k3 = Math.min(1, (v - hc) * 3); r = 96 - 30 * k3; g = 168 - 34 * k3; b = 78 - 30 * k3; if (Math.sin(u * 60 + v * 30) > 0.85) { r += 20; g += 24; }
    const pc = 0.5 + 0.13 * Math.sin(v * 9 + 0.6), pw = Math.max(0, (v - 0.52) * 0.32); if (Math.abs(u - pc) < pw) { const e = Math.abs(u - pc) / pw; r = 222 - 40 * e; g = 190 - 40 * e; b = 128 - 30 * e; } }
  // flores
  if (v > 0.68 && h(Math.floor(u * 70), Math.floor(v * 46), 930) > 0.93) { const q = h(Math.floor(u * 70), 1, 931); r = q > 0.5 ? 250 : 250; g = q > 0.5 ? 110 : 226; b = q > 0.5 ? 150 : 90; }
  // los dos árboles: tronco y copa con luz desde el sol (arriba a la derecha) y hojas que se mecen
  for (const [cx, cy, rx, ry, tx] of [[0.11, 0.32, 0.15, 0.27, 0.1], [0.91, 0.36, 0.13, 0.25, 0.92]]) {
    if (Math.abs(u - tx) < 0.022 && v > cy && v < 0.97) { r = 98; g = 64; b = 40; if (u > tx) { r = 70; g = 44; b = 30; } }
    const sw = Math.sin(t * 1.6 + cx * 9) * 0.006, du = (u - cx - sw * (1 - (v - cy + ry) / (2 * ry))) / rx, dv = (v - cy) / ry;
    const d = du * du + dv * dv + 0.12 * Math.sin(u * 64 + v * 40) + 0.08 * Math.sin(u * 120 - v * 70);
    if (d < 1) { const s = du * 0.45 - dv * 0.55 + 0.1 * Math.sin(u * 150 + v * 110); r = 52 + 60 * s; g = 128 + 66 * s; b = 56 + 30 * s; }
  }
  // la hierba del primer plano, que se mueve con el viento
  if (v > 0.92 + 0.035 * Math.sin(u * 80 + t * 2.4) * Math.sin(u * 13)) { r = 44; g = 98; b = 46; }
  return [r, g, b];
}

// los 16 colores de la tarjeta de 1985
const i_EGA = [[0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170], [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170], [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255], [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255]];

// el bosque pintado en una pantalla (x0, y0)–(x1, y1): modo 16 (bloques de 2 px, trama de puntos y la paleta de 16
// colores), 256 (continuo) u 'oleo' (el lienzo: pinceladas y la trama de la tela). o.caballero: el caballero diminuto
// que anda por el camino hacia o.hacia (u 0–1); o.barrido (0–1): solo se pinta hasta esa fila (el resto, en 16)
function i_bosque(R, x0, y0, x1, y1, t, modo = 256, o = {}) {
  const w = x1 - x0 + 1, hh = y1 - y0 + 1, asp = w / hh, paso = modo === 16 ? 2 : 1, B4 = [0, 2, 3, 1];
  for (let y = y0; y <= y1; y += paso) for (let x = x0; x <= x1; x += paso) {
    let u = (x - x0 + paso / 2) / w, v = (y - y0 + paso / 2) / hh, mm = modo;
    if (modo === 256 && o.barrido != null && v > o.barrido) mm = 16;
    if (mm === 'oleo') { u += (h(x >> 2, y >> 1, 940) - 0.5) * 0.035; v += (h(x >> 1, y >> 2, 941) - 0.5) * 0.03; }
    let [r, g, b] = i_bosqueRGB(u, v, t, asp);
    if (mm === 16) { const cx = (x - x0) >> 1, cy = (y - y0) >> 1, th = (B4[(cx & 1) + ((cy & 1) << 1)] / 4 - 0.375) * 60;
      const lu = (r + g + b) / 3; r = lu + (r - lu) * 2.4 + th; g = lu + (g - lu) * 2.4 + th; b = lu + (b - lu) * 2.4 + th; let best = 0, bd = 1e9; for (let i = 0; i < 16; i++) { const e = i_EGA[i], d = (r - e[0]) ** 2 + (g - e[1]) ** 2 * 1.2 + (b - e[2]) ** 2; if (d < bd) { bd = d; best = i; } }
      const c = i_rgb(...i_EGA[best]); if (paso === 2 && modo === 16) { R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 1, c); } else R.pset(x, y, c); continue; }
    if (mm === 'oleo') { const q = 14; r = Math.round(r / q) * q; g = Math.round(g / q) * q; b = Math.round(b / q) * q; if (((x + y) & 1) && h(x, y, 942) < 0.5) { r *= 0.9; g *= 0.9; b *= 0.9; } }
    R.pset(x, y, i_rgb(r, g, b));
  }
  // el caballero diminuto que anda por el camino (sombrero con pluma, túnica azul)
  if (o.caballero) { const v = 0.8, pc = 0.5 + 0.13 * Math.sin(v * 9 + 0.6), uu = Math.max(0.2, Math.min(0.8, o.caballero === true ? pc + Math.sin(t * 0.5) * 0.12 : o.caballero)),
      cx = Math.round(x0 + uu * w), cy = Math.round(y0 + v * hh), p = Math.floor(t * 6) % 2, e = Math.max(1, Math.round(hh / 34));
    R.rect(cx - e, cy - 4 * e, cx + e - 1, cy - 2 * e, hex('#2a5aa8')); R.rect(cx - e, cy - 6 * e + 1, cx + e - 1, cy - 4 * e, hex('#f0c8a0')); R.rect(cx - e, cy - 6 * e, cx + e - 1, cy - 6 * e + 1, hex('#c83a3a'));
    R.pset(cx + e, cy - 7 * e, hex('#e8e0d0')); R.rect(cx - e + p, cy - 2 * e + 1, cx - e + p, cy, hex('#5a3a2a')); R.rect(cx + e - 1 - p, cy - 2 * e + 1, cx + e - 1 - p, cy, hex('#5a3a2a')); }
}

// un monitor beis de 1990 (bisel con luz y sombra, la pantalla hundida, el piloto y la peana); devuelve la pantalla
function i_crt(R, x0, y0, x1, y1, t, o = {}) {
  const { rect, pset } = R, m = o.margen ?? 4;
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, IC.beis); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, IC.beisL); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, IC.beisL);
  rect(x1 - 2, y0 + 2, x1 - 1, y1 - 1, IC.beisS); rect(x0 + 2, y1 - 2, x1 - 1, y1 - 1, IC.beisS);
  const s = [x0 + m, y0 + m, x1 - m, y1 - m - (o.barbilla ?? 4)];
  rect(s[0] - 1, s[1] - 1, s[2] + 1, s[3] + 1, IC.beisD); rect(s[0], s[1], s[2], s[3], IC.pantalla);
  pset(x1 - m - 1, y1 - m + 1, o.piloto ?? C.verdeL); rect(x1 - m - 8, y1 - m + 1, x1 - m - 4, y1 - m + 1, IC.beisS);
  const pc = (x0 + x1) >> 1; rect(pc - 8, y1 + 1, pc + 8, y1 + 2, C.k); rect(pc - 7, y1 + 1, pc + 7, y1 + 1, IC.beisS);
  return s;
}

// el brillo del cristal de una pantalla (dos diagonales claras y la curva del borde)
function i_brilloPantalla(R, [x0, y0, x1, y1]) {
  for (let i = 0; i < Math.min(10, y1 - y0); i++) { const c = R.pget(x1 - 4 - i, y0 + 2 + i); if (c) R.pset(x1 - 4 - i, y0 + 2 + i, i_mezcla(c, C.blanco, 0.45)); const d = R.pget(x1 - 7 - i, y0 + 2 + i); if (d) R.pset(x1 - 7 - i, y0 + 2 + i, i_mezcla(d, C.blanco, 0.25)); }
  for (let x = x0 + 1; x < x1; x++) { const c = R.pget(x, y0); if (c) R.pset(x, y0, i_mezcla(c, C.k, 0.4)); }
}

// la flecha del ratón (blanca con borde negro)
function i_flecha(R, x, y) {
  const F = ['#....', '##...', '#w#..', '#ww#.', '#www#', '#w##.', '##.#.'];
  F.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] !== '.') R.pset(x + i, y + j, f[i] === '#' ? C.k : C.blanco); });
}

// un pino de la sierra (copa en pisos con luz a la derecha) que se mece un poco
function i_pino(R, x, suelo, alto, t, c = C.pinoV, cL = C.pinoVL) {
  const sw = Math.sin(t * 1.3 + x * 0.7) * 0.6;
  R.rect(x, suelo - 3, x, suelo, C.maderaS);
  for (let j = 0; j < alto; j++) { const w = Math.round((j / alto) * alto * 0.32) + 1, xc = Math.round(x + sw * (1 - j / alto)), y = suelo - 2 - alto + j;
    if (j % 4 === 3) continue; R.rect(xc - w, y, xc + w, y, c); R.pset(xc + w, y, cL); if (w > 2) R.pset(xc + w - 1, y, cL); }
}

// el ventilador de sobremesa que gira (aspas) y oscila
function i_ventilador(R, x, y, t) {
  const { rect, disco, linea } = R, osc = Math.sin(t * 0.7) * 2;
  rect(x - 5, y + 9, x + 5, y + 11, C.k); rect(x - 4, y + 9, x + 4, y + 10, IC.beisS); rect(x - 1, y + 4, x + 1, y + 9, IC.beisD);
  disco(Math.round(x + osc), y, 7, C.k); disco(Math.round(x + osc), y, 6, IC.beisL);
  for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.09; linea(Math.round(x + osc), y, Math.round(x + osc + Math.cos(a) * 5), Math.round(y + Math.sin(a) * 5), IC.beisD); }
  for (let a = 0; a < 6.28; a += 0.5) R.pset(Math.round(x + osc + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 6), C.metalS); disco(Math.round(x + osc), y, 1, C.k);
}

// G 'estudio' general: suelo 158 (los pies); la mesa del ordenador x 124–224 (tablero y 126–134, canto 135–137); el
// ratón en (≈134, 128); el monitor de la mesa con su pantalla en .pantalla; el caballete x 36–88 (lienzo .lienzo); el
// escáner en .escaner; la ventana .ventana. Sitio: el técnico de pie en x ≈ 112 (dir 1, junto al ratón), el pintor en
// x ≈ 98 (dir −1, frente al lienzo); libre también x 226–276 delante de la mesita del escáner.
function i_estudioGeneral(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  i_fijo(R, 'si-estudio-general', () => {
    i_techo(R, [[186, 240]]);
    // la pared con su gotelé fino y la sombra bajo la cornisa
    rect(0, 16, 319, 123, IC.pared);
    for (let y = 16; y < 124; y++) for (let x = (y * 3) % 4; x < 320; x += 4) { const n = h(x, y, 950); if (n < 0.3) pset(x, y, IC.paredS); else if (n > 0.9) pset(x, y, IC.paredL); }
    for (let y = 16; y < 21; y++) for (let x = (y & 1); x < 320; x += 2) pset(x, y, IC.paredS);
    rect(0, 124, 319, 127, IC.zocalo); rect(0, 124, 319, 124, IC.zocaloL);
    i_moqueta(R, 128, 179);
    // el corcho con los bocetos: el castillo, el caballero, un mapa con su camino de puntos y las muestras de color
    rect(6, 24, 66, 62, C.maderaS); rect(7, 25, 65, 61, IC.corcho);
    for (let k = 0; k < 160; k++) pset(8 + Math.floor(h(k, 3, 951) * 57), 26 + Math.floor(h(k, 4, 951) * 35), h(k, 5, 951) < 0.5 ? IC.corchoS : IC.corchoL);
    rect(6, 24, 66, 24, C.maderaL);
    // el boceto del castillo
    rect(10, 28, 30, 44, C.papel); rect(11, 29, 29, 43, C.blanco); rect(13, 36, 27, 42, C.grisL); rect(15, 32, 17, 36, C.grisL); rect(23, 32, 25, 36, C.grisL);
    poligono([[14, 32], [16, 29], [18, 32]], hex('#3a5ab0')); poligono([[22, 32], [24, 29], [26, 32]], hex('#3a5ab0')); rect(19, 39, 21, 42, C.gris); pset(20, 30, C.rojo);
    // el caballero de perfil, a lápiz
    rect(33, 27, 47, 45, C.papel); rect(34, 28, 46, 44, C.blanco); disco(40, 32, 2, C.gris); rect(38, 35, 42, 40, hex('#7a8ab0')); rect(38, 41, 39, 43, C.gris); rect(41, 41, 42, 43, C.gris); linea(42, 30, 45, 28, C.rojo);
    // el mapa con el camino de puntos y la X del tesoro (cruz de símbolos)
    rect(49, 28, 63, 44, hex('#e8d8a8')); for (let i = 0; i < 9; i++) pset(51 + i, 41 - Math.round(Math.sin(i * 0.8) * 3) - i, C.maderaS); rect(60, 30, 60, 32, C.rojo); rect(59, 31, 61, 31, C.rojo); linea(50, 34, 54, 30, hex('#5a8ab0'));
    // las muestras de color y una foto
    for (let k = 0; k < 6; k++) rect(11 + k * 5, 48, 14 + k * 5, 52, [hex('#3a7a3a'), hex('#5ab04a'), hex('#d8a830'), hex('#c84a3a'), hex('#3a5ab0'), hex('#8a5ab0')][k]);
    rect(44, 47, 62, 59, C.blanco); rect(45, 48, 61, 55, hex('#6aa0d0')); poligono([[45, 55], [52, 50], [57, 53], [61, 50], [61, 55]], C.pinoV);
    rect(10, 54, 24, 59, hex('#f0e890')); rect(11, 56, 22, 56, C.grisL); rect(11, 58, 18, 58, C.grisL);
    for (const [x, y, c] of [[20, 28, C.rojo], [40, 27, hex('#3a7ab0')], [56, 28, C.amarillo], [53, 47, C.rojo], [17, 54, hex('#3a9a4a')]]) { pset(x, y, c); pset(x + 1, y + 1, C.k); }
    // el calendario de pared: la foto de arriba, la cuadrícula de días con uno marcado en rojo, y el interruptor de la luz
    rect(88, 72, 108, 100, C.k); rect(89, 73, 107, 99, C.blanco); rect(89, 73, 107, 82, hex('#5a8ac8')); poligono([[89, 82], [96, 76], [101, 79], [107, 75], [107, 82]], hex('#3a6a3a')); rect(97, 71, 99, 72, C.metalD);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rect(90 + i * 3, 85 + j * 3, 91 + i * 3, 86 + j * 3, (i + j * 6) === 15 ? C.rojo : C.grisL);
    rect(112, 88, 116, 95, C.k); rect(113, 89, 115, 94, IC.beisL); rect(114, 90, 114, 92, IC.beisD);
    // el cuadro del castillo (arte de la compañía, sin letras)
    rect(226, 22, 262, 58, C.maderaD); rect(227, 23, 261, 57, C.oroS); rect(228, 24, 260, 56, C.maderaD);
    for (let y = 25; y < 56; y++) rect(229, y, 259, y, i_mezcla(hex('#3a4a9a'), hex('#e89a6a'), (y - 25) / 31));
    poligono([[229, 48], [240, 40], [252, 45], [259, 42], [259, 55], [229, 55]], hex('#3a6a3a')); rect(239, 34, 249, 45, C.piedraC); rect(237, 30, 240, 45, C.piedraC); rect(248, 30, 251, 45, C.piedraC);
    poligono([[236, 30], [238, 25], [241, 30]], hex('#3a5ab0')); poligono([[247, 30], [249, 25], [252, 30]], hex('#3a5ab0')); rect(243, 40, 245, 45, C.k); pset(238, 33, C.oroL); pset(250, 33, C.oroL);
    disco(234, 30, 2, hex('#fff0c0')); rect(226, 59, 262, 60, IC.paredS);
    // la estantería con las cajas de juegos (lomos de colores con un pictograma, sin letras), carpetas y un trofeo
    rect(278, 48, 319, 127, C.maderaD); rect(280, 50, 319, 126, C.madera);
    for (const y of [72, 98, 124]) { rect(279, y, 319, y + 2, C.maderaS); rect(279, y, 319, y, C.maderaL); }
    const LOM = [hex('#c84a3a'), hex('#3a5ab0'), hex('#d8a830'), hex('#3a8a4a'), hex('#8a3a9a'), hex('#e87a3a'), hex('#2a8a9a'), hex('#e8e0d0')];
    for (const [y0, y1, k0] of [[52, 71, 0], [76, 97, 3], [102, 123, 5]]) { let x = 281; for (let k = 0; x < 316; k++) { const w = 3 + Math.floor(h(k, y0, 952) * 3), top = y0 + Math.floor(h(k, 1, 952 + y0) * 5), c = LOM[(k + k0) % 8];
        rect(x, top, x + w - 1, y1, c); rect(x, top, x, y1, i_mezcla(c, C.blanco, 0.25)); rect(x + w - 1, top, x + w - 1, y1, i_mezcla(c, C.k, 0.3)); if (w > 3) { pset(x + 1, top + 3, C.blanco); pset(x + 2, top + 3, C.blanco); } rect(x, y1 - 3, x + w - 1, y1 - 3, i_mezcla(c, C.k, 0.35)); x += w + (h(k, 4, 952) < 0.15 ? 2 : 0); } }
    // el cubículo del fondo: el biombo de tela (con su moteado) y el borde de aluminio
    rect(196, 80, 274, 123, IC.tela); for (let k = 0; k < 220; k++) pset(197 + Math.floor(h(k, 6, 953) * 77), 81 + Math.floor(h(k, 7, 953) * 42), h(k, 8, 953) < 0.5 ? IC.telaS : IC.telaL);
    rect(196, 78, 274, 80, C.metalL); rect(196, 80, 274, 80, C.metalS); rect(196, 78, 197, 123, C.metalL); rect(273, 78, 274, 123, C.metalS);
    rect(200, 84, 214, 96, C.blanco); rect(201, 86, 211, 86, C.grisL); rect(201, 88, 213, 88, C.grisL); rect(201, 90, 208, 90, C.grisL); pset(207, 84, C.rojo);
    rect(254, 86, 266, 98, hex('#f0e890')); rect(255, 88, 264, 88, C.grisL); rect(255, 91, 262, 91, C.grisL);
    // la planta sobre el biombo
    rect(266, 70, 272, 78, C.calabazaS); rect(266, 70, 272, 70, C.calabaza);
    // el archivador metálico con sus tres cajones
    rect(2, 82, 30, 127, C.k); rect(3, 83, 29, 126, C.metalS); rect(3, 83, 29, 84, C.metalL);
    for (const y of [86, 100, 114]) { rect(4, y, 28, y + 12, C.metal); rect(4, y, 28, y, C.metalL); rect(12, y + 4, 20, y + 5, C.metalD); rect(13, y + 4, 19, y + 4, C.metalL); rect(14, y + 8, 18, y + 10, C.blanco); }
    // el caballete de madera (patas, travesaño, repisa) con el lienzo: el bosque pintado a mano
    linea(44, 64, 34, 158, C.maderaD); linea(45, 64, 35, 158, C.madera); linea(80, 64, 90, 158, C.maderaD); linea(79, 64, 89, 158, C.madera); linea(62, 60, 70, 152, C.maderaD);
    rect(42, 60, 82, 61, C.maderaD); rect(38, 104, 86, 106, C.maderaD); rect(38, 104, 86, 104, C.maderaL); rect(40, 120, 84, 121, C.maderaS);
    rect(43, 65, 81, 103, C.k); i_bosque(R, 44, 66, 80, 102, 0.3, 'oleo');
    rect(43, 65, 81, 65, C.blanco); rect(81, 66, 81, 103, hex('#d8d0c0'));
    // la paleta de pintor en la repisa y el bote de pinceles en el taburete
    disco(50, 102, 3, hex('#c89a5a')); for (const [dx, c] of [[-2, C.rojo], [0, C.amarillo], [2, hex('#3a7ab0')]]) pset(50 + dx, 101, c);
    rect(70, 97, 75, 103, C.k); rect(71, 98, 74, 103, hex('#7aa0b8')); rect(71, 98, 71, 103, hex('#a8c8d8'));
    for (const [dx, c] of [[0, C.rojo], [2, C.amarillo], [3, hex('#3a7ab0')]]) { linea(71 + dx, 97, 70 + dx, 91, C.madera); pset(70 + dx, 90, c); }
    // la mesita del escáner (tablero, patas y el escáner plano con la tapa abierta)
    rect(226, 128, 274, 131, C.k); rect(227, 128, 273, 130, IC.mesaL); rect(227, 131, 273, 131, IC.mesaS);
    for (const x of [229, 270]) { rect(x, 132, x + 2, 158, IC.mesaD); rect(x, 132, x, 158, IC.mesaS); }
    rect(230, 118, 270, 127, C.k); rect(231, 119, 269, 126, IC.beis); rect(231, 119, 269, 119, IC.beisL); rect(233, 121, 267, 124, hex('#2a3038'));
    poligono([[231, 118], [269, 118], [266, 100], [234, 100]], C.k); poligono([[232, 117], [268, 117], [265, 101], [235, 101]], IC.beisS); rect(236, 103, 264, 115, C.blanco);
    i_bosque(R, 238, 105, 262, 113, 0.3, 'oleo'); pset(266, 125, C.verdeL);
    // la mesa del ordenador: tablero de pino (vetas), canto, el faldón con los cajones y sus tiradores
    rect(124, 126, 224, 134, IC.mesa); for (let k = 0; k < 40; k++) { const y = 127 + Math.floor(h(k, 9, 954) * 7), x = 125 + Math.floor(h(k, 10, 954) * 90); rect(x, y, x + 4 + Math.floor(h(k, 11, 954) * 8), y, IC.mesaS); }
    rect(124, 126, 224, 126, IC.mesaL); rect(122, 135, 226, 137, C.k); rect(123, 135, 225, 136, IC.mesaS); rect(123, 135, 225, 135, IC.mesaL);
    rect(126, 138, 222, 158, IC.mesaD); rect(127, 138, 221, 157, IC.mesa);
    for (let k = 0; k < 30; k++) { const y = 139 + Math.floor(h(k, 12, 955) * 18), x = 128 + Math.floor(h(k, 13, 955) * 60); rect(x, y, x + 6, y, IC.mesaS); }
    for (const y of [140, 149]) { rect(190, y, 220, y + 7, IC.mesaS); rect(191, y + 1, 219, y + 6, IC.mesaL); rect(201, y + 3, 209, y + 4, C.metalD); rect(201, y + 3, 209, y + 3, C.metalL); }
    rect(127, 138, 127, 157, IC.mesaL); rect(126, 158, 222, 158, C.k);
    // el ordenador de sobremesa: la caja con las dos disqueteras, el piloto y la rejilla
    rect(168, 112, 220, 126, C.k); rect(169, 113, 219, 125, IC.beis); rect(169, 113, 219, 113, IC.beisL); rect(169, 123, 219, 125, IC.beisS);
    for (const x of [174, 192]) { rect(x, 117, x + 14, 120, IC.beisD); rect(x + 1, 118, x + 13, 119, C.k); rect(x + 12, 121, x + 13, 121, IC.beisD); }
    for (let x = 210; x < 218; x += 2) rect(x, 116, x, 121, IC.beisS); pset(172, 123, C.verdeL);
    // el teclado (teclas en filas con luz) y la alfombrilla con el ratón (el ratón lo pinta el fotograma)
    rect(144, 125, 166, 131, C.k); rect(145, 126, 165, 130, IC.beis);
    for (let j = 0; j < 3; j++) for (let x = 146 + (j & 1); x < 164; x += 2) pset(x, 127 + j, IC.beisL);
    rect(145, 130, 165, 130, IC.beisS); rect(160, 127, 164, 128, IC.beisS);
    rect(128, 128, 142, 132, C.k); rect(129, 128, 141, 131, hex('#3a5a9a')); rect(129, 128, 141, 128, hex('#5a7aba')); for (let x = 130; x < 141; x += 3) pset(x, 130, hex('#2a4a8a'));
    // el flexo (base, brazos y la tulipa, con su luz sobre la mesa)
    rect(212, 123, 220, 125, C.k); rect(213, 123, 219, 124, C.rojoS); linea(216, 123, 222, 106, C.k); linea(222, 106, 214, 96, C.k); linea(217, 123, 223, 106, C.rojoS);
    poligono([[208, 94], [216, 92], [218, 100], [210, 102]], C.k); poligono([[209, 95], [215, 93], [217, 99], [211, 101]], C.rojo);
    i_luz(R, 196, 103, 214, 125, -0.3, 0.22, hex('#fff0b0'), 0.35);
    // la taza
    rect(156, 118, 162, 125, C.k); rect(157, 119, 161, 124, C.blanco); rect(157, 119, 157, 124, hex('#f8f8f8')); rect(160, 119, 161, 124, C.grisL); rect(163, 120, 164, 123, C.k); rect(157, 119, 161, 119, hex('#5a3a2a'));
    // el cable del ratón y el del teclado, que bajan por detrás de la mesa
    linea(135, 128, 140, 124, C.k); linea(140, 124, 168, 124, C.k);
    // las sombras: bajo la mesa, el caballete, el archivador, la mesita y el taburete; y la luz de la ventana en el suelo
    i_sombra(R, 174, 160, 54, 3, 0.7); i_sombra(R, 62, 159, 30, 2, 0.75); i_sombra(R, 16, 128, 16, 2, 0.75); i_sombra(R, 250, 159, 26, 2, 0.75);
    i_luz(R, 100, 132, 168, 176, 0.9, 0.16, hex('#fff4d0'), 0.3);
  });
  // el plafón: parpadea a ratos
  if ((t % 6.7) < 0.2 && Math.sin(t * 60) > 0) rect(187, 2, 239, 4, IC.techoS);
  // la ventana: el cielo tramado, nubes de tres tonos a tres velocidades, la sierra con nieve, los pinos que se mecen,
  // el camino con un paseante, un pájaro; las lamas de la persiana arriba, el parteluz y el marco
  const V = [114, 24, 194, 70];
  rect(V[0] - 2, V[1] - 2, V[2] + 2, V[3] + 2, C.k); rect(V[0] - 1, V[1] - 1, V[2] + 1, V[3] + 1, C.blanco);
  for (let y = V[1]; y <= 50; y++) { const c = y < 34 ? C.cielo1 : y < 44 ? C.cielo2 : C.cielo3; rect(V[0], y, V[2], y, c); if (y === 33 || y === 43) for (let x = V[0] + (y & 1); x <= V[2]; x += 2) pset(x, y, y === 33 ? C.cielo2 : C.cielo3); }
  R.recorte(V);
  i_nube(R, V[0] - 20 + ((t * 1.2) % 120), 33, 16); i_nube(R, V[0] - 20 + ((t * 2.6 + 70) % 120), 40, 10); i_nube(R, V[0] - 20 + ((t * 4.1 + 30) % 120), 30, 7);
  poligono([[V[0], 50], [124, 40], [134, 45], [148, 34], [160, 42], [172, 37], [186, 46], [V[2] + 1, 41], [V[2] + 1, 56], [V[0], 56]], C.granito);
  poligono([[142, 39], [148, 34], [154, 38], [150, 38], [147, 36]], C.nieve); poligono([[168, 39], [172, 37], [177, 40]], C.nieve);
  for (let x = V[0]; x <= V[2]; x++) for (let y = 44; y < 56; y++) if (((x + y) & 3) === 0 && R.pget(x, y) === C.granito) pset(x, y, C.granitoL);
  rect(V[0], 56, V[2], V[3], C.pinoV); for (let x = V[0]; x <= V[2]; x += 2) pset(x, 56 + (x % 3), C.pinoVL);
  rect(V[0], 63, V[2], 65, C.camino); rect(V[0], 63, V[2], 63, C.caminoL);
  { const u = (t / 14) % 1; i_figurita(R, V[0] - 6 + u * 92, 64, t, [hex('#e8b890'), hex('#5a3a2a'), hex('#c84a3a'), hex('#3a3a5a')], 1); }
  for (const [x, a] of [[118, 16], [129, 12], [182, 18], [191, 13], [140, 9], [170, 10]]) i_pino(R, x, V[3] + 1, a, t);
  { const u = ((t + 2) / 9) % 1, bx = Math.round(V[0] - 6 + u * 96), by = Math.round(36 + Math.sin(t * 2) * 2), al = Math.sin(t * 14) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); }
  R.recorte(null);
  for (let y = V[1]; y < 32; y++) rect(V[0] - 1, y, V[2] + 1, y, y % 2 ? C.blanco : C.grisL);
  rect(V[0] - 1, 32, V[2] + 1, 33, C.gris); { const sw = Math.round(Math.sin(t * 1.1) * 1.2); linea(188, 34, 188 + sw, 46, C.gris); rect(187 + sw, 46, 189 + sw, 48, C.grisL); }
  rect(154, V[1], 155, V[3], C.blanco); rect(V[0], 47, V[2], 48, C.blanco); rect(V[0] - 3, V[3] + 2, V[2] + 3, V[3] + 4, C.k); rect(V[0] - 2, V[3] + 2, V[2] + 2, V[3] + 3, C.blanco);
  // el reloj de pared que anda
  { const cx = 210, cy = 32; disco(cx, cy, 7, C.k); disco(cx, cy, 6, C.blanco); for (let k = 0; k < 12; k += 3) pset(Math.round(cx + Math.cos(k * 0.5236) * 5), Math.round(cy + Math.sin(k * 0.5236) * 5), C.k);
    const am = t * 0.6, ah = 1.2 + t * 0.05; linea(cx, cy, Math.round(cx + Math.cos(am) * 5), Math.round(cy + Math.sin(am) * 5), C.k); linea(cx, cy, Math.round(cx + Math.cos(ah) * 3), Math.round(cy + Math.sin(ah) * 3), C.k); pset(cx, cy, C.rojo); }
  // los bocetos del corcho que se mecen con el aire del ventilador
  { const a = Math.max(0, Math.sin(t * 0.7)); for (const [x, y] of [[10, 44], [33, 45], [44, 59]]) if (a > 0.4) { pset(x + 1, y + 1, C.blanco); pset(x + 2, y + 1, C.grisL); } }
  i_ventilador(R, 16, 70, t);
  // el compañero del cubículo: la cabeza que teclea con la cara azul de su pantalla, el monitor de lado y su luz
  { const bob = Math.floor(t * 3) % 4 === 0 ? 1 : 0, sc = Math.sin(t * 2.3) > 0; rect(220, 64, 238, 79, C.k); rect(221, 65, 237, 78, IC.beisS); rect(221, 65, 224, 78, IC.beisL); rect(238, 68, 240, 76, sc ? hex('#5a8ad8') : hex('#3a6ab8'));
    rect(244, 70 + bob, 249, 77, hex('#e8b890')); rect(244, 69 + bob, 249, 71 + bob, hex('#2a1e18')); rect(243, 70 + bob, 243, 74 + bob, hex('#2a1e18')); pset(244, 74 + bob, sc ? hex('#8ab0e8') : hex('#c0a090')); rect(242, 77, 251, 79, hex('#3a7a5a')); }
  for (let k = 0; k < 4; k++) { const sw = Math.sin(t * 1.4 + k) * 1; linea(269, 70, Math.round(265 + k * 3 + sw), 62 + (k & 1) * 2, C.hierbaS); pset(Math.round(265 + k * 3 + sw), 62 + (k & 1) * 2, C.hierba); }
  // el escáner: la barra de luz va y viene (o.escaner)
  if (o.escaner !== false) { const u = typeof o.escaner === 'number' ? o.escaner : (Math.sin(t * 1.2) + 1) / 2, x = Math.round(234 + u * 32); rect(x, 121, x + 1, 124, hex('#d8f8ff')); for (let y = 118; y > 112; y--) pset(x + (y & 1), y, hex('#c8f0ff')); }
  // el monitor de la mesa: el bosque en 256 colores con el caballero que anda hacia el cursor; el ratón se mueve
  const [ru, rv] = o.raton ?? [0.5 + Math.sin(t * 0.9) * 0.3, 0.72 + Math.cos(t * 1.3) * 0.12];
  const S = i_crt(R, 172, 84, 212, 112, t, { margen: 4, barbilla: 3 });
  i_bosque(R, S[0], S[1], S[2], S[3], t, 256, { caballero: Math.max(0.25, Math.min(0.75, ru - 0.04 * Math.sin(t))) });
  i_flecha(R, Math.round(S[0] + ru * (S[2] - S[0])), Math.round(S[1] + rv * (S[3] - S[1])));
  i_brilloPantalla(R, S);
  { const mx = Math.round(133 + (ru - 0.5) * 12), my = Math.round(129 + (rv - 0.72) * 6); rect(mx - 2, my - 1, mx + 2, my + 2, C.k); rect(mx - 1, my - 1, mx + 1, my + 1, IC.beisL); pset(mx, my - 1, IC.beisS); linea(mx, my - 2, 140, 124, C.k); }
  // el teclado que «se va a dormir» (o.dormido): se oscurece y suben una luna y burbujas
  const dz = Math.max(0, Math.min(1, o.dormido ?? 0));
  if (dz > 0) { for (let y = 126; y <= 130; y++) for (let x = 145; x <= 165; x++) { const c = R.pget(x, y); pset(x, y, i_mezcla(c, hex('#3a3a5a'), 0.55 * dz)); }
    for (let k = 0; k < 3; k++) { const u = ((t * 0.5 + k / 3) % 1); if (u > dz) continue; disco(Math.round(158 + k * 3 + Math.sin(t * 2 + k) * 2), Math.round(122 - u * 16), 1 + (k === 2 ? 1 : 0), hex('#c8d8f0')); }
    R.icono('luna', 164, Math.round(110 - dz * 4), C.oroL, C.k); }
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); pset(Math.round(159 + Math.sin(t * 2 + k * 2 + u * 5) * 1.5), Math.round(117 - u * 9), u < 0.5 ? C.blanco : C.grisL); }
  return { suelo: 158, mesa: [124, 126, 224], raton: [134, 128], pantalla: [S[0], S[1], S[2] - S[0] + 1, S[3] - S[1] + 1], lienzo: [44, 66, 80, 102], caballete: [36, 88],
    escaner: [230, 118, 270, 128], ventana: V, sitio: { tecnico: 112, pintor: 98, libre: [226, 276] } };
}

// G 'estudio' 'monitores': suelo 168 (delante de la mesa); los dos monitores (bisel x 14–124 y 132–242, y 26–106) con
// sus pantallas en .p16 y .p256; la mesa (tablero y 112–123, faldón hasta 150); el caballete con el lienzo original en
// x 258–312 (lienzo .lienzo). Sitio: el caballero de pie en x 100–170 (entre los dos monitores, delante de la mesa), el
// pintor en x ≈ 286 (dir −1) delante del caballete.
function i_monitores(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  i_fijo(R, 'si-estudio-monitores', () => {
    i_techo(R, [[186, 246]], 7);
    // la pared de tela azul grisácea del rincón de arte, con su moteado y la luz del flexo
    rect(0, 10, 319, 111, hex('#8a92a4')); for (let y = 10; y < 112; y++) for (let x = (y & 1); x < 320; x += 2) { const n = h(x, y, 960); if (n < 0.25) pset(x, y, hex('#7a8296')); else if (n > 0.92) pset(x, y, hex('#9aa2b4')); }
    for (let y = 10; y < 14; y++) for (let x = (y & 1); x < 320; x += 2) pset(x, y, hex('#6a7284'));
    // la canaleta de los cables que corre por la pared y dos enchufes con sus clavijas
    rect(0, 20, 319, 22, IC.beisS); rect(0, 20, 319, 20, IC.beisL); for (let x = 40; x < 320; x += 60) rect(x, 21, x + 1, 21, IC.beisD);
    for (const ex of [126, 250]) { rect(ex, 64, ex + 4, 72, C.k); rect(ex + 1, 65, ex + 3, 71, IC.beisL); pset(ex + 2, 67, C.k); pset(ex + 2, 69, C.k); }
    // los bocetos clavados entre el caballete y el monitor (un mapa y una hoja de colores)
    rect(246, 28, 258, 44, hex('#e8d8a8')); for (let i = 0; i < 7; i++) pset(248 + i, 41 - i - (i & 1), C.maderaS); pset(256, 31, C.rojo); pset(252, 28, C.rojo);
    // la mesa: tablero de formica beis con su moteado (vista un poco desde arriba), el canto y el faldón con su veta
    rect(0, 112, 319, 123, C.formica); for (let k = 0; k < 420; k++) pset(Math.floor(h(k, 3, 962) * 320), 113 + Math.floor(h(k, 4, 962) * 10), h(k, 5, 962) < 0.5 ? hex('#d8c898') : hex('#f2e6c0'));
    rect(0, 112, 319, 112, hex('#f8f0d8')); rect(0, 124, 319, 127, C.k); rect(0, 124, 319, 125, IC.mesaS); rect(0, 124, 319, 124, IC.mesaL);
    rect(0, 128, 319, 150, IC.mesaD); for (let y = 129; y < 150; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 3, y, 963); pset(x, y, n < 0.3 ? IC.mesaS : n > 0.85 ? IC.mesaL : IC.mesa); }
    for (const x0 of [6, 248]) { rect(x0, 131, x0 + 60, 147, IC.mesaS); rect(x0 + 1, 132, x0 + 59, 146, IC.mesaL); rect(x0 + 1, 132, x0 + 59, 132, C.blanco); rect(x0 + 24, 138, x0 + 36, 140, C.metalD); rect(x0 + 24, 138, x0 + 36, 138, C.metalL); }
    rect(0, 150, 319, 151, C.k);
    i_moqueta(R, 152, 179, IC.moq, IC.moqS, IC.moqL, 1);
    i_sombra(R, 160, 153, 150, 2, 0.6);
    // en la mesa: el teclado de cada ordenador, disquetes, papel cuadriculado con lápices y la taza
    for (const kx of [40, 160]) { rect(kx, 114, kx + 50, 121, C.k); rect(kx + 1, 115, kx + 49, 120, IC.beis); for (let j = 0; j < 4; j++) for (let i = kx + 2 + (j & 1); i < kx + 48; i += 3) { rect(i, 115 + j + (j > 1 ? 1 : 0), i + 1, 115 + j + (j > 1 ? 1 : 0), IC.beisL); } rect(kx + 1, 120, kx + 49, 120, IC.beisS); }
    rect(98, 114, 104, 119, C.k); rect(99, 114, 103, 118, IC.beisL); linea(101, 113, 104, 108, C.k);
    for (const [dx, c] of [[0, hex('#2a2e3a')], [4, hex('#3a2a4a')]]) { rect(226 + dx, 113 + dx / 2, 240 + dx, 121 + dx / 2, C.k); rect(227 + dx, 114 + dx / 2, 239 + dx, 120 + dx / 2, c); rect(229 + dx, 114 + dx / 2, 237 + dx, 116 + dx / 2, C.etiqueta); }
    rect(2, 114, 30, 122, C.blanco); for (let y = 115; y < 122; y += 2) rect(3, y, 29, y, hex('#c8d8e8')); for (let x = 5; x < 30; x += 3) rect(x, 115, x, 121, hex('#d8e4f0')); linea(6, 121, 18, 115, C.amarillo); pset(18, 115, C.k);
  });
  // los dos monitores lado a lado: el mismo bosque en 16 colores y en 256
  const S16 = i_crt(R, 14, 26, 124, 106, t, { margen: 7, barbilla: 10 }), S256 = i_crt(R, 132, 26, 242, 106, t, { margen: 7, barbilla: 10 });
  i_bosque(R, S16[0], S16[1], S16[2], S16[3], t, 16, { caballero: true });
  const col = o.color == null ? 1 : Math.max(0, Math.min(1, o.color));
  i_bosque(R, S256[0], S256[1], S256[2], S256[3], t, 256, { caballero: true, barrido: col < 1 ? col : undefined });
  if (col < 1 && col > 0) { const y = Math.round(S256[1] + col * (S256[3] - S256[1])); rect(S256[0], y, S256[2], y, C.blanco); }
  i_brilloPantalla(R, S16); i_brilloPantalla(R, S256);
  // debajo de cada pantalla, en el bisel: el número y la tira de sus colores (16 cuadros; el arcoíris continuo)
  R.numero('16', 34, 101, { color: hex('#3a3426') }); for (let i = 0; i < 16; i++) rect(54 + i * 4, 96, 56 + i * 4, 99, i_rgb(...i_EGA[i]));
  R.numero('256', 152, 101, { color: hex('#3a3426') }); for (let i = 0; i < 64; i++) { const a = i / 64 * 6.28; rect(178 + i, 96, 178 + i, 99, i_rgb(128 + 127 * Math.cos(a), 128 + 127 * Math.cos(a - 2.09), 128 + 127 * Math.cos(a + 2.09))); }
  rect(54, 95, 117, 95, IC.beisD); rect(178, 95, 241, 95, IC.beisD);
  // los cables que bajan a la mesa
  linea(69, 109, 66, 113, C.k); linea(187, 109, 190, 113, C.k);
  // el caballete con el lienzo original (el bosque a pinceladas), la paleta y el trapo
  linea(266, 50, 256, 168, C.maderaD); linea(267, 50, 257, 168, C.madera); linea(304, 50, 314, 168, C.maderaD); linea(303, 50, 313, 168, C.madera); linea(285, 48, 288, 160, C.maderaD);
  rect(262, 47, 308, 48, C.maderaD); rect(260, 98, 310, 100, C.maderaD); rect(260, 98, 310, 98, C.maderaL);
  rect(264, 54, 306, 97, C.k); i_bosque(R, 265, 55, 305, 96, 0.3, 'oleo'); rect(264, 54, 306, 54, C.blanco);
  disco(272, 96, 3, hex('#c89a5a')); pset(270, 95, C.rojo); pset(272, 94, C.amarillo); pset(274, 95, hex('#3a7ab0'));
  rect(296, 100, 302, 106, hex('#c8c0e0')); rect(297, 101, 301, 106, hex('#e0d8f0'));
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); pset(Math.round(101 + Math.sin(t * 2 + k * 2 + u * 5) * 1.5), Math.round(112 - u * 9), u < 0.5 ? C.blanco : C.grisL); }
  return { suelo: 168, p16: S16, p256: S256, mesa: [0, 112, 319], lienzo: [265, 55, 305, 96], sitio: { caballero: [100, 170], pintor: 286 } };
}

// la espuma acústica de cuñas (x0, y0)–(x1, y1): piezas de 12 × 12 con las cuñas alternas (vertical/horizontal), luz
// arriba a la izquierda y sombra en los valles
function i_espuma(R, x0, y0, x1, y1, c = IC.esp, cS = IC.espS, cL = IC.espL) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const bx = Math.floor(x / 12), by = Math.floor(y / 12), lx = x % 12, ly = y % 12, vert = ((bx + by) & 1) === 0, q = (vert ? lx : ly) % 4;
    let col = q === 0 ? cS : q === 1 ? cL : c; if (lx === 0 || ly === 0) col = IC.espD; if (h(x, y, 970) < 0.06) col = cS;
    R.pset(x, y, col);
  }
}

// una bobina de cinta que gira (cinta marrón, plato metálico con tres agujeros)
function i_bobina(R, cx, cy, r, t, sentido = 1, lleno = 0.7) {
  const { disco, pset } = R;
  disco(cx, cy, r, C.k); disco(cx, cy, r - 1, C.metalL); disco(cx, cy, Math.round(r * (0.35 + 0.55 * lleno)), hex('#5a3a2a')); disco(cx, cy, Math.round(r * 0.3), C.metal);
  for (let k = 0; k < 3; k++) { const a = t * 3 * sentido + k * 2.094; disco(Math.round(cx + Math.cos(a) * r * 0.62), Math.round(cy + Math.sin(a) * r * 0.62), Math.max(1, Math.round(r * 0.16)), C.metalD); }
  disco(cx, cy, 1, C.k); pset(cx - Math.round(r * 0.5), cy - Math.round(r * 0.5), C.blanco);
}

// un vúmetro con su aguja que baila (x0, y0)–(x0 + w, y0 + hh)
function i_vu(R, x0, y0, w, hh, t, k = 0) {
  R.rect(x0, y0, x0 + w, y0 + hh, C.k); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#f0dc98'));
  for (let i = 0; i < 5; i++) R.pset(x0 + 2 + Math.round(i * (w - 4) / 4), y0 + 2 + (i === 2 ? 0 : 1), i > 3 ? C.rojo : C.k);
  const a = -2.4 + (0.4 + 0.35 * Math.abs(Math.sin(t * 5 + k)) + 0.15 * Math.sin(t * 13 + k * 2)) * 1.6, cx = x0 + w / 2, cy = y0 + hh - 1;
  R.linea(Math.round(cx), cy, Math.round(cx + Math.cos(a) * (hh - 2)), Math.round(cy + Math.sin(a) * (hh - 2)), C.k);
}

// el micrófono de estudio en su pie: base de tres patas, barra, la araña con el micro plateado (rejilla) y el filtro
// antipop delante (dir: hacia dónde mira la boca del micro); s = 1 normal
function i_micro(R, x, suelo, alto, t, dir = -1) {
  const { rect, pset, disco, linea } = R, y = suelo - alto;
  linea(x - 7, suelo, x, suelo - 4, C.k); linea(x + 7, suelo, x, suelo - 4, C.k); linea(x, suelo, x, suelo - 4, C.k);
  rect(x, y + 6, x + 1, suelo - 4, C.metalD); rect(x, y + 6, x, suelo - 4, C.metalL); rect(x - 1, Math.round((y + suelo) / 2), x + 2, Math.round((y + suelo) / 2) + 1, C.k);
  // la araña y el micro
  R.anillo(x, y, 5, C.metalD); rect(x - 2, y - 6, x + 3, y + 4, C.k); rect(x - 1, y - 5, x + 2, y + 3, C.metalL);
  for (let j = y - 5; j < y; j++) for (let i = x - 1 + (j & 1); i <= x + 2; i += 2) pset(i, j, C.metal); rect(x - 1, y + 1, x + 2, y + 1, C.oroS); pset(x - 1, y - 5, C.blanco);
  // el filtro antipop (aro y malla tramada), con su cuello de cisne
  const fx = x + dir * 8; linea(x + dir * 2, y + 5, fx, y + 2, C.k);
  for (let j = -5; j <= 5; j++) for (let i = -2; i <= 2; i++) { const d = (i / 2.5) ** 2 + (j / 5.5) ** 2; if (d > 1) continue; pset(fx + i, y - 1 + j, d > 0.7 ? C.k : ((i + j) & 1) ? hex('#3a3a44') : hex('#5a5a66')); }
  return [x, y];
}

// la estrella dorada de la puerta (5 puntas, con su brillo); a 0–1 aparece con un destello
function i_estrella(R, cx, cy, r, t, a = 1) {
  if (a <= 0) return; const rr = r * Math.min(1, a * 1.6) * (a < 0.6 ? 1 + Math.sin(a * 9) * 0.15 : 1), P = [], Q = [];
  for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5, d = k & 1 ? rr * 0.45 : rr; P.push([cx + Math.cos(an) * d, cy + Math.sin(an) * d]); Q.push([cx + Math.cos(an) * (d + 1.2), cy + Math.sin(an) * (d + 1.2)]); }
  R.poligono(Q.map(([x, y]) => [Math.round(x), Math.round(y)]), C.k); R.poligono(P.map(([x, y]) => [Math.round(x), Math.round(y)]), C.oro);
  R.poligono([[cx, cy], ...P.slice(0, 3).map(([x, y]) => [Math.round(x), Math.round(y)])], C.oroL); R.pset(Math.round(cx - 1), Math.round(cy - rr * 0.5), C.blanco);
  const g = Math.sin(t * 3) > 0.6 || (a > 0.3 && a < 0.9);
  if (g) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let i = 2; i < 4; i++) R.pset(Math.round(cx + r * 0.9 + 3 + dx * i), Math.round(cy - r * 0.9 + dy * i), C.oroL);
}

// el piloto de «grabando» (caja roja con un micro pintado, sin letras) encendido o apagado
function i_piloto(R, x, y, on, t) {
  R.rect(x - 10, y - 4, x + 10, y + 4, C.k); R.rect(x - 9, y - 3, x + 9, y + 3, on ? (Math.sin(t * 4) > -0.6 ? hex('#ff4a3a') : hex('#d83a2a')) : hex('#5a2a2a'));
  const c = on ? hex('#fff0e0') : hex('#7a4a4a'); R.rect(x - 1, y - 2, x + 1, y + 1, c); R.pset(x - 2, y, c); R.pset(x + 2, y, c); R.pset(x, y + 2, c);
  if (on) for (let i = -12; i <= 12; i += 2) { R.pset(x + i, y + 6, hex('#a85a50')); }
}

// G 'cabina' general: suelo 158 (cabina); el micro en .micro (boca a la altura de la cabeza de un chibi en x ≈ 104–
// 112); la ventana a la sala de control x 160–268, y 46–104 (.ventana): el técnico va DENTRO, de pie en x 196–232 con
// los pies en y 110 (pintar después i_estudioDelante, que pone la mesa de faders y el alféizar por delante); la puerta
// x 276–314, y 56–158, con la estrella en .estrella. Sitio en la cabina: dos actores en x ≈ 92 (dir 1) y x ≈ 130
// (dir −1) a los lados del micro; libre x 136–270 delante de la pared.
function i_cabina(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  i_fijo(R, 'si-estudio-cabina', () => {
    // el techo de la cabina: placas oscuras con los rieles del foco
    rect(0, 0, 319, 15, hex('#2a2a36')); for (let x = 4; x < 320; x += 20) rect(x, 0, x, 15, hex('#22222c')); rect(0, 7, 319, 7, hex('#22222c')); rect(0, 15, 319, 16, IC.espD);
    rect(60, 13, 160, 14, C.metalD);
    // las paredes de espuma (y un rodapié de madera) y el suelo de moqueta oscura con la alfombra bajo el micro
    i_espuma(R, 0, 17, 319, 147);
    rect(0, 148, 319, 151, IC.panelS); rect(0, 148, 319, 148, IC.panelL);
    i_moqueta(R, 152, 179, hex('#4a4250'), hex('#3a3442'), hex('#5a5262'), 2);
    for (let y = 156; y < 172; y++) { const w = Math.round(58 * Math.sqrt(1 - ((y - 164) / 8.5) ** 2)); for (let x = 111 - w; x <= 111 + w; x++) pset(x, y, ((x >> 1) + y) % 5 === 0 ? hex('#8a3a3a') : (Math.abs(y - 164) > 5 || Math.abs(x - 111) > w - 4) ? hex('#a84a3a') : hex('#c86a4a')); }
    // la ventana doble a la sala de control: el marco gordo de madera; (el interior lo pinta el fotograma)
    rect(155, 41, 273, 109, C.k); rect(156, 42, 272, 108, IC.panel); rect(156, 42, 272, 42, IC.panelL); rect(156, 108, 272, 108, IC.panelS); rect(159, 45, 269, 105, C.k);
    // la puerta acolchada: los botones del capitoné, el ojo de buey, la manilla, las bisagras y el marco
    rect(274, 54, 316, 151, C.k); rect(275, 55, 315, 151, IC.panelS); rect(277, 57, 313, 151, hex('#6a2a3a'));
    for (let y = 62; y < 150; y += 8) for (let x = 281 + ((y >> 3) & 1) * 4; x < 312; x += 8) { pset(x, y, hex('#4a1a28')); pset(x - 1, y - 1, hex('#8a3a4a')); }
    disco(295, 96, 7, C.k); disco(295, 96, 6, C.metalL); disco(295, 96, 5, hex('#2a3a4a')); pset(293, 94, IC.reflejo); pset(294, 93, IC.reflejo);
    rect(279, 112, 284, 114, C.k); rect(280, 112, 284, 113, C.oroL); for (const y of [64, 140]) { rect(313, y, 315, y + 5, C.metalD); }
    // el atril con el guion (renglones de trazos, una hoja doblada), los cascos colgados y la botella de agua en su taburete
    linea(48, 158, 54, 128, C.k); linea(60, 158, 54, 128, C.k); rect(53, 120, 55, 158, C.metalD);
    poligono([[38, 104], [70, 104], [72, 122], [36, 122]], C.k); poligono([[39, 105], [69, 105], [71, 121], [37, 121]], C.blanco); rect(54, 105, 54, 121, C.grisL);
    for (let y = 108; y < 120; y += 2) { rect(41, y, 41 + 6 + Math.floor(h(y, 1, 971) * 6), y, C.gris); rect(57, y, 57 + 5 + Math.floor(h(y, 2, 971) * 7), y, C.gris); } rect(42, 108, 46, 108, C.rojo);
    rect(28, 50, 30, 52, C.metalD); R.anillo(29, 60, 6, C.k); rect(22, 58, 25, 66, C.k); rect(33, 58, 36, 66, C.k); rect(23, 59, 24, 65, hex('#c84a3a')); rect(34, 59, 35, 65, hex('#c84a3a')); pset(23, 59, hex('#e87a6a')); R.anillo(29, 60, 5, C.metalL); linea(29, 66, 31, 90, C.k); linea(31, 90, 26, 100, C.k);
    rect(204, 138, 216, 140, C.maderaD); rect(205, 138, 215, 138, C.maderaL); for (const x of [206, 214]) rect(x, 141, x + 1, 158, C.maderaD);
    rect(207, 124, 211, 137, C.k); rect(208, 126, 210, 137, hex('#8ac0e0')); rect(208, 130, 210, 137, hex('#5a9ac8')); rect(208, 124, 210, 125, hex('#3a7ab0')); pset(208, 127, C.blanco);
    // el aplique de pared (luz cálida en abanico) y la trampa de graves del rincón
    rect(8, 34, 16, 40, C.k); rect(9, 35, 15, 39, hex('#e8c880')); rect(9, 35, 15, 35, hex('#fff0c0')); for (let y = 41; y < 70; y++) for (let x = 12 - ((y - 41) >> 1); x <= 12 + ((y - 41) >> 1); x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) pset(x, y, i_mezcla(c, hex('#e8c880'), 0.14)); }
    poligono([[0, 17], [10, 17], [0, 30]], IC.espD); for (let y = 17; y < 148; y += 3) rect(0, y, 2, y, IC.espS);
    // el cable del micro serpentea por el suelo hasta la caja de conexiones de la pared
    linea(110, 156, 130, 162, C.k); linea(130, 162, 160, 158, C.k); linea(160, 158, 180, 150, C.k); rect(178, 140, 190, 148, C.k); rect(179, 141, 189, 147, C.metal); for (const x of [182, 186]) { disco(x, 144, 1, C.k); }
    i_sombra(R, 108, 160, 12, 2, 0.6); i_sombra(R, 54, 160, 10, 2, 0.7); i_sombra(R, 210, 160, 9, 2, 0.7); i_sombra(R, 295, 153, 22, 2, 0.75);
  });
  // la sala de control al otro lado del cristal: la pared de listones con luz cálida, el rack de luces, el magnetófono
  // de bobinas que gira y los altavoces de control; (el técnico lo pinta la escena; i_estudioDelante pone la mesa)
  const W = [160, 46, 268, 104];
  R.recorte(W);
  for (let y = W[1]; y <= W[3]; y++) for (let x = W[0]; x <= W[2]; x++) pset(x, y, (x % 6 === 0) ? hex('#6a4a30') : (x % 6 === 1) ? hex('#a87a50') : hex('#8a6240'));
  for (let y = W[1]; y < W[1] + 6; y++) for (let x = W[0] + (y & 1); x <= W[2]; x += 2) pset(x, y, hex('#5a3c26'));
  // el rack con sus luces (que parpadean) y el magnetófono con las dos bobinas
  rect(164, 54, 186, 104, C.k); for (let k = 0; k < 6; k++) { const y = 56 + k * 8; rect(165, y, 185, y + 6, hex('#2a2e36')); rect(165, y, 185, y, hex('#4a4e58')); for (let i = 0; i < 4; i++) pset(168 + i * 4, y + 3, Math.floor(t * 4 + i * 1.7 + k) % 3 === 0 ? [C.verdeL, C.rojo, C.amarillo, hex('#5ac8f0')][(i + k) % 4] : hex('#3a3e48')); }
  rect(240, 52, 266, 92, C.k); rect(241, 53, 265, 91, hex('#3a3e48')); rect(241, 53, 265, 53, hex('#5a5e68'));
  i_bobina(R, 247, 62, 6, t, 1, 0.8); i_bobina(R, 259, 62, 6, t, 1, 0.4); linea(247, 69, 259, 69, hex('#5a3a2a')); rect(244, 76, 262, 80, hex('#2a2e36')); for (let i = 0; i < 4; i++) rect(245 + i * 5, 84, 247 + i * 5, 86, i === 1 ? C.rojo : C.metalL);
  for (let k = 0; k < 2; k++) i_vu(R, 202 + k * 16, 66, 12, 8, t, k);
  for (const sx of [194, 230]) { rect(sx - 4, 50, sx + 4, 62, C.k); rect(sx - 3, 51, sx + 3, 61, hex('#2a2a30')); const b = Math.round(Math.max(0, Math.sin(t * 9 + sx)) * 1); disco(sx, 58, 2 + b, hex('#4a4a54')); disco(sx, 58, 1, C.k); disco(sx, 53, 1, hex('#6a6a74')); }
  R.recorte(null);
  // el piloto de grabación y el foco sobre el micro (cono tramado, con motas de polvo que flotan)
  i_piloto(R, 110, 24, o.grabando !== false, t);
  rect(104, 14, 116, 18, C.k); rect(105, 15, 115, 17, C.metalD); poligono([[104, 18], [116, 18], [118, 24], [102, 24]], C.k); rect(105, 23, 115, 24, hex('#fff4c0'));
  i_luz(R, 96, 32, 124, 150, 0, 0.12, hex('#fff4c0'), 0.24);
  for (let k = 0; k < 9; k++) { const u = ((t * (0.05 + h(k, 1, 972) * 0.05) + h(k, 2, 972)) % 1), x = Math.round(98 + h(k, 3, 972) * 26 + Math.sin(t + k) * 3 + (u - 0.5) * 20), y = Math.round(40 + u * 100); if (Math.abs(x - 110) < 10 + (y - 32) * 0.24) pset(x, y, hex('#fff8d8')); }
  // el micro y su sombra
  const M = i_micro(R, 111, 158, 52, t, -1);
  // la estrella dorada de la puerta (o.estrella)
  const ea = o.estrella == null ? 1 : Math.max(0, Math.min(1, o.estrella)); i_estrella(R, 295, 72, 7, t, ea);
  if (ea > 0.2 && ea < 0.9) for (let k = 0; k < 8; k++) { const a = k * 0.785 + t, d = 10 + (ea - 0.2) * 20; pset(Math.round(295 + Math.cos(a) * d), Math.round(72 + Math.sin(a) * d), C.oroL); }
  // los reflejos del cristal (pasan por delante de todo lo de dentro)
  for (const d of [168, 176, 230]) for (let i = 0; i < 40; i++) { const x = d + i, y = 104 - Math.round(i * 1.45); if (y < 46) break; const c = R.pget(x, y); if (c) pset(x, y, i_mezcla(c, IC.reflejo, 0.35)); }
  return { suelo: 158, micro: M, ventana: W, tecnico: { x: [196, 232], suelo: 110 }, puerta: [276, 56, 314, 151], estrella: [295, 72], sitio: { actores: [92, 130], libre: [136, 270] } };
}

// la mesa de faders de la sala de control y el alféizar del cristal, por delante del técnico (cabina general)
function i_consolaVentana(R, t) {
  const { rect, pset, poligono } = R, W = [160, 46, 268, 104];
  R.recorte(W);
  poligono([[160, 97], [268, 97], [268, 105], [160, 105]], C.k); poligono([[160, 98], [268, 98], [268, 104], [160, 104]], hex('#3a3e48')); for (let x = 160; x <= 268; x++) pset(x, 98, hex('#5a5e68'));
  for (let x = 162; x < 268; x += 4) { pset(x + 1, 99 + Math.round((Math.sin(t * 1.5 + x) + 1)), C.blanco); pset(x + 2, 99, [C.rojo, hex('#3a8ac8'), C.amarillo][(x >> 2) % 3]); pset(x + 1, 103, Math.sin(t * 6 + x * 0.3) > 0.2 ? C.verdeL : hex('#2a4a2a')); }
  for (const d of [168, 176, 230]) for (let i = 0; i < 8; i++) { const x = d + i, y = 104 - Math.round(i * 1.45); const c = R.pget(x, y); if (c && y >= 97) pset(x, y, i_mezcla(c, IC.reflejo, 0.35)); }
  R.recorte(null);
  rect(159, 105, 269, 108, IC.panel); rect(159, 105, 269, 105, IC.panelL); rect(159, 108, 269, 108, IC.panelS);
}

// G 'cabina' 'micro' (el contraplano, desde la sala de control): suelo 174 (el técnico, a la derecha, x ≈ 292, dir −1);
// la consola por delante (y 126–179, la pinta i_estudioDelante); el cristal x 64–256, y 30–112 (.ventana); dentro de la
// cabina, el actor de pie en x 120–160 con los pies en y 116 (los tapa el alféizar), el micro en .micro y la puerta con
// la estrella en .estrella.
function i_control(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  i_fijo(R, 'si-estudio-control', () => {
    // la sala de control: techo de listones, pared de listones de madera con luz cálida y el suelo
    rect(0, 0, 319, 10, hex('#3a2a20')); for (let x = 0; x < 320; x += 6) rect(x, 0, x, 10, hex('#2a1e16'));
    for (let y = 11; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 7 === 0) ? hex('#5a3c26') : (x % 7 === 1) ? hex('#a87a50') : (h(x, y >> 3, 975) < 0.1 ? hex('#7a5434') : hex('#8a6240')));
    for (let y = 11; y < 16; y++) for (let x = (y & 1); x < 320; x += 2) pset(x, y, hex('#4a3020'));
    i_moqueta(R, 150, 179, hex('#4a3e3a'), hex('#3a302c'), hex('#5a4e48'), 3);
    // el marco del cristal grande
    rect(58, 24, 262, 118, C.k); rect(59, 25, 261, 117, IC.panelS); rect(59, 25, 261, 25, IC.panelL); rect(63, 29, 257, 113, C.k);
    // el magnetófono de bobinas, alto, a la izquierda: el mueble, las cabezas, las teclas y el vúmetro
    rect(4, 40, 54, 160, C.k); rect(5, 41, 53, 159, hex('#4a4e58')); rect(5, 41, 53, 41, hex('#6a6e78')); rect(52, 42, 53, 159, hex('#34383f'));
    rect(10, 84, 48, 92, hex('#2a2e36')); rect(24, 86, 32, 90, C.metalL); for (let i = 0; i < 5; i++) rect(11 + i * 7, 98, 15 + i * 7, 102, i === 2 ? C.rojo : C.metalL);
    rect(8, 110, 50, 156, hex('#3a3e48')); for (let y = 114; y < 154; y += 3) rect(12, y, 46, y, hex('#2e3238'));
    // el altavoz de control en la pared derecha y un póster de onda (sin letras)
    rect(274, 52, 300, 90, C.k); rect(275, 53, 299, 89, hex('#2a2a30')); rect(275, 53, 299, 53, hex('#4a4a52'));
    rect(270, 98, 314, 124, C.k); rect(271, 99, 313, 123, hex('#1a2a4a')); for (let x = 273; x < 312; x++) pset(x, Math.round(111 + Math.sin(x * 0.4) * 6 * Math.sin(x * 0.07)), hex('#5ac8f0'));
    i_sombra(R, 29, 162, 26, 2, 0.7);
  });
  // dentro de la cabina, tras el cristal: espuma más oscura por la distancia, la alfombra, el micro bajo el foco y la
  // puerta acolchada con su estrella
  const W = [64, 30, 256, 112];
  R.recorte(W);
  i_espuma(R, 64, 30, 256, 112, hex('#34344a'), hex('#22222e'), hex('#46465c'));
  for (let y = 100; y <= 112; y++) for (let x = 64; x <= 256; x++) pset(x, y, ((x >> 1) + y) % 4 === 0 ? hex('#3a3442') : hex('#4a4250'));
  // la puerta de la cabina con la estrella
  rect(212, 38, 246, 112, C.k); rect(213, 39, 245, 112, hex('#6a2a3a')); for (let y = 44; y < 110; y += 8) for (let x = 217 + ((y >> 3) & 1) * 4; x < 244; x += 8) pset(x, y, hex('#4a1a28'));
  disco(229, 74, 6, C.k); disco(229, 74, 5, hex('#2a3a4a')); pset(227, 72, IC.reflejo);
  const ea = o.estrella == null ? 1 : Math.max(0, Math.min(1, o.estrella)); i_estrella(R, 229, 52, 7, t, ea);
  // el foco y su luz sobre el micro, con motas
  i_luz(R, 136, 30, 160, 112, 0, 0.16, hex('#fff4c0'), 0.2);
  for (let k = 0; k < 7; k++) { const u = ((t * (0.05 + h(k, 1, 976) * 0.05) + h(k, 2, 976)) % 1), x = Math.round(140 + h(k, 3, 976) * 18 + Math.sin(t + k) * 2), y = Math.round(34 + u * 70); pset(x, y, hex('#fff8d8')); }
  const M = i_micro(R, 166, 112, 30, t, -1);
  i_piloto(R, 110, 38, o.grabando !== false, t);
  R.recorte(null);
  // el magnetófono: las bobinas que giran y la cinta entre ellas
  i_bobina(R, 18, 62, 12, t, 1, 0.8); i_bobina(R, 41, 62, 12, t, 1, 0.35); linea(18, 74, 28, 88, hex('#5a3a2a')); linea(41, 74, 32, 88, hex('#5a3a2a'));
  for (let i = 0; i < 5; i++) if (i === 2) rect(25, 98, 29, 102, Math.sin(t * 4) > 0 ? C.rojo : C.rojoS);
  // el altavoz de control que bota un poco
  { const b = Math.round(Math.max(0, Math.sin(t * 8)) * 1.2); disco(287, 77, 7 + b, hex('#4a4a54')); disco(287, 77, 5 + b, hex('#3a3a44')); disco(287, 77, 2, C.k); disco(287, 60, 3, hex('#5a5a64')); disco(287, 60, 1, C.k); }
  // los reflejos del cristal
  for (const d of [80, 92, 180]) for (let i = 0; i < 70; i++) { const x = d + i, y = 112 - Math.round(i * 1.3); if (y < 30) break; const c = R.pget(x, y); if (c) pset(x, y, i_mezcla(c, IC.reflejo, 0.3)); }
  return { suelo: 174, sueloCabina: 116, ventana: W, micro: M, estrella: [229, 52], puerta: [212, 38, 246, 112], sitio: { tecnico: 292, actor: [120, 160] } };
}

// la consola grande de la sala de control (por delante de todo en 'micro'): el alféizar del cristal, el puente de
// vúmetros, las 24 tiras de faders con sus botones de colores (los faders se mueven un poco) y las luces de nivel
function i_consolaGrande(R, t) {
  const { rect, pset, poligono } = R;
  rect(58, 112, 262, 118, C.k); rect(59, 113, 261, 117, IC.panel); rect(59, 113, 261, 113, IC.panelL);
  poligono([[56, 126], [264, 126], [272, 179], [48, 179]], C.k); poligono([[57, 127], [263, 127], [271, 179], [49, 179]], hex('#3a3e48'));
  rect(70, 119, 250, 127, C.k); rect(71, 120, 249, 126, hex('#2a2e36'));
  for (let k = 0; k < 6; k++) i_vu(R, 74 + k * 29, 120, 18, 6, t, k);
  for (let k = 0; k < 24; k++) { const x0 = 60 + k * 8.4, x = Math.round(x0);
    rect(x + 2, 130, x + 5, 130, hex('#5a5e68'));
    for (let j = 0; j < 3; j++) { R.disco(x + 3, 133 + j * 6, 1, [C.rojo, hex('#3a8ac8'), C.amarillo][j]); pset(x + 3, 132 + j * 6, C.blanco); }
    rect(x + 3, 152, x + 3, 174, C.k); const f = Math.round(160 + Math.sin(t * 0.8 + k * 0.7) * 4 + (k % 5) * 1.5); rect(x + 1, f, x + 5, f + 2, C.k); rect(x + 2, f, x + 4, f + 1, C.metalL);
    for (let j = 0; j < 4; j++) pset(x + 6, 150 - j * 2, Math.abs(Math.sin(t * 7 + k)) * 4 > j ? (j > 2 ? C.rojo : C.verdeL) : hex('#2a3a2a')); }
  rect(57, 127, 263, 127, hex('#5a5e68'));
}

// G 'musica' general: suelo 160; los teclados en su soporte de tijera x 84–196 (teclado de abajo, teclas en y 124–129;
// el de arriba en y 108–113); el altavoz grande de suelo x 236–270 (.altavoz) y el pequeño en su pie a la izquierda; el
// atril con la partitura en .atril; el rack de sintetizadores x 6–44. Sitio: el compositor de pie en x ≈ 206 (dir −1,
// junto al extremo de los teclados) o en x 60–80; libre x 200–232.
function i_musica(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, bota = o.bota ?? 0.6;
  i_fijo(R, 'si-estudio-musica', () => {
    i_techo(R, [[186, 236]], 9);
    // las paredes de listones (veta y juntas) y el difusor de madera en el centro (bloques de alturas distintas)
    for (let y = 12; y < 132; y++) for (let x = 0; x < 320; x++) { const c = x % 8 === 0 ? IC.panelS : (x % 8 === 1 ? IC.panelL : (h(x, y >> 2, 980) < 0.12 ? hex('#6a4a2c') : IC.panel)); pset(x, y, c); }
    for (let y = 12; y < 16; y++) for (let x = (y & 1); x < 320; x += 2) pset(x, y, IC.panelS);
    rect(96, 22, 196, 70, C.k); for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) { const d = Math.floor(h(i, j, 981) * 4), x = 97 + i * 6, y = 23 + j * 6, c = [hex('#c8a070'), hex('#b08a5a'), hex('#a07a4a'), hex('#d8b080')][d];
      rect(x, y, x + 5, y + 5, c); rect(x, y, x + 5, y, i_mezcla(c, C.blanco, 0.3)); rect(x + 5, y, x + 5, y + 5, i_mezcla(c, C.k, 0.35)); rect(x, y + 5, x + 5, y + 5, i_mezcla(c, C.k, 0.35)); }
    rect(0, 132, 319, 135, IC.panelS); rect(0, 132, 319, 132, IC.panelL);
    // el parqué y la alfombra
    for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const t0 = Math.floor((x + (y >> 2) * 13) / 24), c = h(t0, y >> 2, 982) < 0.5 ? C.madera : C.maderaL; pset(x, y, ((x + (y >> 2) * 13) % 24 === 0 || (y % 4 === 0)) ? C.maderaS : c); }
    for (let y = 146; y < 176; y++) for (let x = 70; x < 250; x++) { const b = y < 148 || y > 173 || x < 72 || x > 247; pset(x, y, b ? hex('#2a3a6a') : (((x >> 2) + (y >> 2)) & 1 ? hex('#4a5a9a') : hex('#3a4a8a'))); }
    // el disco de oro enmarcado (sin letras) y una foto del equipo de figuritas
    rect(210, 26, 240, 60, C.k); rect(211, 27, 239, 59, hex('#2a2a3a')); disco(225, 40, 10, C.oro); disco(225, 40, 9, C.oroL); disco(225, 40, 6, C.oro); disco(225, 40, 2, hex('#c84a3a')); rect(216, 53, 234, 56, C.oroS); pset(220, 35, C.blanco);
    rect(246, 30, 270, 52, C.k); rect(247, 31, 269, 51, C.blanco); rect(248, 32, 268, 46, hex('#8ab0d8'));
    for (let k = 0; k < 5; k++) { const x = 250 + k * 4; rect(x, 40, x + 2, 46, [C.rojo, hex('#3a5ab0'), C.amarillo, hex('#3a8a4a'), hex('#8a3a9a')][k]); rect(x, 37, x + 2, 39, hex('#e8b890')); }
    // el estante de cintas y disquetes
    rect(274, 78, 316, 80, C.maderaS); rect(274, 78, 316, 78, C.maderaL); for (let k = 0; k < 9; k++) { const x = 276 + k * 4.5; rect(Math.round(x), 70, Math.round(x) + 3, 77, [C.k, hex('#3a3a4a'), hex('#c84a3a'), C.blanco][k % 4]); pset(Math.round(x) + 1, 72, C.blanco); }
    // el rack de sintetizadores (los módulos con sus perillas), con su sombra
    rect(6, 52, 44, 158, C.k); rect(7, 53, 43, 157, hex('#2a2a30'));
    for (let k = 0; k < 7; k++) { const y = 55 + k * 14; rect(8, y, 42, y + 12, k % 2 ? hex('#3a3e48') : hex('#4a4a54')); rect(8, y, 42, y, hex('#6a6e78')); for (let i = 0; i < 5; i++) { disco(12 + i * 7, y + 5, 1, C.metalL); pset(12 + i * 7, y + 4, C.k); } rect(9, y + 9, 41, y + 10, hex('#1a1a20')); }
    i_sombra(R, 25, 160, 20, 2, 0.7);
    // el soporte de tijera y los dos teclados (blancas con luz, negras, el panel con perillas y la pantallita)
    linea(96, 160, 184, 112, C.k); linea(184, 160, 96, 112, C.k); linea(97, 160, 185, 112, C.metalD); linea(185, 160, 97, 112, C.metalD); linea(140, 100, 140, 128, C.metalD);
    for (const [y0, x0, x1, c] of [[100, 92, 188, hex('#3a3a44')], [118, 84, 196, hex('#c8c0b0')]]) {
      rect(x0, y0, x1, y0 + 13, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 5, c); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, i_mezcla(c, C.blanco, 0.3));
      for (let i = 0; i < 6; i++) disco(x0 + 6 + i * 6, y0 + 3, 1, i_mezcla(c, C.k, 0.4)); rect(x1 - 26, y0 + 2, x1 - 8, y0 + 4, hex('#2a4a3a'));
      for (let x = x0 + 2; x < x1 - 1; x += 3) { rect(x, y0 + 6, x + 1, y0 + 12, C.blanco); rect(x, y0 + 12, x + 1, y0 + 12, C.grisL); }
      for (let x = x0 + 3; x < x1 - 2; x += 3) if ([0, 1, 3, 4, 5].includes(Math.floor((x - x0) / 3) % 7)) rect(x + 1, y0 + 6, x + 2, y0 + 9, C.k);
    }
    i_sombra(R, 140, 162, 52, 2, 0.75);
    // el atril con la partitura: pentagramas y notas (símbolos)
    linea(64, 160, 70, 120, C.k); linea(76, 160, 70, 120, C.k); rect(69, 100, 71, 160, C.metalD);
    poligono([[52, 82], [88, 82], [90, 102], [50, 102]], C.k); poligono([[53, 83], [87, 83], [89, 101], [51, 101]], C.blanco);
    for (const y0 of [85, 93]) { for (let j = 0; j < 5; j++) rect(54, y0 + j, 86, y0 + j, j === 2 ? C.gris : C.grisL); for (let k = 0; k < 6; k++) { const nx = 57 + k * 5, ny = y0 + Math.floor(h(k, y0, 983) * 4); rect(nx, ny, nx + 1, ny + 1, C.k); rect(nx + 1, ny - 3, nx + 1, ny, C.k); } }
    // el ordenador secuenciador en su mesita, a la derecha
    rect(276, 128, 316, 131, C.k); rect(277, 128, 315, 130, IC.mesaL); for (const x of [279, 312]) rect(x, 132, x + 2, 160, IC.mesaD);
    rect(282, 120, 312, 127, C.k); rect(283, 121, 311, 126, IC.beis); for (let x = 285; x < 310; x += 2) pset(x, 123, IC.beisL);
    i_sombra(R, 296, 162, 20, 2, 0.75);
    // el pie del altavoz pequeño de la izquierda
    rect(57, 104, 59, 158, C.metalD); linea(50, 160, 58, 150, C.k); linea(66, 160, 58, 150, C.k);
  });
  // los cables de conexión del rack, que se mecen
  for (let k = 0; k < 4; k++) { const x0 = 12 + k * 8, y0 = 62 + k * 14, x1 = 18 + k * 6, y1 = 90 + k * 14, sw = Math.sin(t * 1.5 + k) * 3, c = [C.rojo, C.amarillo, hex('#3a8ac8'), C.verdeL][k];
    for (let i = 0; i <= 10; i++) { const u = i / 10; pset(Math.round(x0 + (x1 - x0) * u + Math.sin(u * Math.PI) * sw), Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 8), c); } }
  // las luces del rack que parpadean
  for (let k = 0; k < 7; k++) for (let i = 0; i < 3; i++) pset(34 + i * 3, 59 + k * 14, Math.floor(t * 5 + i * 2 + k * 1.3) % 4 === 0 ? [C.rojo, C.verdeL, C.amarillo][i] : hex('#3a3a3a'));
  // las pantallitas de los teclados: la onda que corre
  for (const [y0, x1] of [[100, 188], [118, 196]]) for (let x = x1 - 25; x <= x1 - 9; x++) pset(x, y0 + 3 + Math.round(Math.sin(x * 0.8 + t * 6) * 1), hex('#8af0a0'));
  // el monitor del secuenciador: las barras de las notas que corren
  { const S = i_crt(R, 284, 92, 312, 119, t, { margen: 3, barbilla: 3 }); R.recorte(S); for (let k = 0; k < 10; k++) { const x = Math.round(S[0] + ((k * 9 - t * 12) % 30 + 30) % 30), y = S[1] + 2 + Math.floor(h(k, 1, 984) * (S[3] - S[1] - 4)); for (let i = 0; i < 5 + (k % 3) * 2; i++) pset(x + i, y, [hex('#5ae86a'), hex('#e8c840'), hex('#5ac8f0')][k % 3]); } rect(S[0] + 12, S[1], S[0] + 12, S[3], hex('#3a5a4a')); R.recorte(null); }
  // los altavoces que botan: el pequeño en su pie y el grande de suelo (cono que late y se aplasta), y las notas que suben
  const lat = (k) => Math.max(0, Math.sin(t * 9 + k)) * bota;
  for (const [x0, y0, x1, y1, k] of [[48, 70, 70, 104, 0], [236, 74, 272, 158, 1]]) {
    const b = Math.round(lat(k) * 2), cx = (x0 + x1) >> 1;
    rect(x0, y0 - b, x1, y1, C.k); rect(x0 + 1, y0 + 1 - b, x1 - 1, y1 - 1, hex('#2a2a30')); rect(x0 + 1, y0 + 1 - b, x1 - 1, y0 + 1 - b, hex('#4a4a52')); rect(x1 - 2, y0 + 2 - b, x1 - 1, y1 - 1, hex('#1e1e24'));
    const big = k === 1, r = big ? 13 : 7, cy = big ? 124 : 94;
    disco(cx, cy, r + 1, hex('#4a4a54')); disco(cx, cy, r - 1 + Math.round(lat(k) * 2), hex('#3a3a44')); R.anillo(cx, cy, r - 3 + Math.round(lat(k) * 2), hex('#52525e')); disco(cx, cy, big ? 4 : 2, C.k); pset(cx - 1, cy - 1, hex('#6a6a74'));
    disco(cx, big ? 92 : 78 - b, big ? 5 : 3, hex('#4a4a54')); disco(cx, big ? 92 : 78 - b, big ? 2 : 1, C.k);
    if (big) { disco(cx, 106, 3, C.k); disco(cx, 106, 2, hex('#1a1a20')); }
    for (let i = 0; i < 3; i++) { const u = ((t * 0.45 + i / 3 + k * 0.17) % 1), nx = cx + (k ? -1 : 1) * (6 + u * 18) + Math.sin(t * 3 + i) * 3, ny = y0 - 4 - u * 34; if (ny > 46) i_nota(R, nx, ny, [C.oroL, hex('#f0a0c0'), hex('#a0e0f0')][(i + k) % 3], i === 1); }
  }
  return { suelo: 160, teclados: [84, 118, 196], tecladoAlto: [92, 100, 188], altavoz: [236, 74, 272, 158], atril: [50, 82, 90, 102], sitio: { compositor: 206, otro: [60, 80], libre: [200, 232] } };
}

// G 'musica' 'teclados': el teclado grande de cerca. Suelo 172 (el compositor de pie en x ≈ 292, dir −1, la mano en
// el extremo del teclado, en (≈ 276, 136)); el teclado x 10–282, teclas y 136–160 (.teclado); el panel de mandos en
// y 120–135; el secuenciador encima (pantalla .pantalla); los altavoces en .altavoces. o.tocar (true por omisión): las
// teclas bajan con una melodía; o.bota (0–1).
function i_teclados(R, t, o) {
  const { rect, pset, disco, linea } = R, bota = o.bota ?? 0.6;
  i_fijo(R, 'si-estudio-teclados', () => {
    // la pared de listones del fondo con el difusor y el póster de onda
    for (let y = 0; y < 160; y++) for (let x = 0; x < 320; x++) { const c = x % 8 === 0 ? IC.panelS : (x % 8 === 1 ? IC.panelL : (h(x, y >> 2, 985) < 0.12 ? hex('#6a4a2c') : IC.panel)); pset(x, y, c); }
    rect(70, 32, 250, 35, C.maderaS); rect(70, 32, 250, 32, C.maderaL); for (const x of [80, 240]) rect(x, 36, x + 2, 40, C.maderaD);
    let x = 74; for (let k = 0; x < 246; k++) { const w = 3 + Math.floor(h(k, 1, 986) * 3), c = [C.k, hex('#3a3a4a'), hex('#c84a3a'), C.blanco, hex('#3a5ab0')][k % 5]; rect(x, 22, x + w - 1, 31, c); rect(x, 22, x, 31, i_mezcla(c, C.blanco, 0.3)); if (w > 3) pset(x + 1, 25, C.blanco); x += w; }
    // la mesa del teclado (canto de madera) y el suelo
    rect(0, 160, 319, 179, C.madera); for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 987) < 0.3) pset(x, y, C.maderaS); else if (y % 5 === 0) pset(x, y, C.maderaL);
    // el cuerpo del teclado: la caja, el panel con perillas, deslizadores, botones y la pantallita
    rect(4, 116, 288, 164, C.k); rect(5, 117, 287, 135, hex('#3a3a44')); rect(5, 117, 287, 118, hex('#5a5a66')); rect(5, 161, 287, 163, hex('#2a2a30'));
    for (let i = 0; i < 10; i++) { disco(14 + i * 9, 124, 3, C.k); disco(14 + i * 9, 124, 2, hex('#6a6a74')); pset(14 + i * 9, 122, C.blanco); }
    for (let i = 0; i < 6; i++) { rect(112 + i * 6, 120, 113 + i * 6, 132, C.k); }
    rect(156, 120, 206, 132, C.k); rect(157, 121, 205, 131, hex('#1a3a2a'));
    for (let i = 0; i < 8; i++) { rect(214 + i * 9, 126, 220 + i * 9, 130, [C.rojo, C.amarillo, hex('#3a8ac8'), C.blanco][i % 4]); rect(214 + i * 9, 126, 220 + i * 9, 126, C.blanco); }
    // las ruedas de tono a la izquierda
    for (const xr of [8, 16]) { rect(xr, 138, xr + 4, 158, C.k); rect(xr + 1, 139, xr + 3, 157, hex('#4a4a54')); }
    // el cable que cuelga y la sombra
    linea(286, 150, 300, 178, C.k); i_sombra(R, 146, 166, 140, 2, 0.6);
  });
  // las teclas: blancas con su luz y sombra, negras con brillo; las que suenan bajan y se iluminan
  const X0 = 24, X1 = 282, ww = 6, nb = Math.floor((X1 - X0) / ww);
  const pulsa = (i) => o.tocar !== false && (Math.floor(t * 5) * 7 + 3) % nb === i || (o.tocar !== false && (Math.floor(t * 5 + 2) * 11) % nb === i && Math.sin(t * 2) > 0);
  for (let i = 0; i < nb; i++) { const x = X0 + i * ww, p = pulsa(i) ? 1 : 0;
    rect(x, 136, x + ww - 1, 160, C.k); rect(x + 1, 136 + p, x + ww - 2, 159, p ? hex('#fff0c0') : C.blanco); rect(x + 1, 157, x + ww - 2, 159, C.grisL); rect(x + ww - 2, 136, x + ww - 2, 156, hex('#e0dcd4')); }
  for (let i = 0; i < nb - 1; i++) if ([0, 1, 3, 4, 5].includes(i % 7)) { const x = X0 + i * ww + 4, p = pulsa(i + 100) ? 1 : 0; rect(x, 136, x + 3, 150 + p, C.k); rect(x + 1, 136, x + 2, 148 + p, hex('#2a2a32')); pset(x + 1, 137, hex('#5a5a66')); }
  // la pantallita con la onda y los deslizadores que se mueven
  for (let x = 158; x <= 204; x++) pset(x, 126 + Math.round(Math.sin(x * 0.5 + t * 7) * 3 * Math.sin(x * 0.05 + t)), hex('#8af0a0'));
  for (let i = 0; i < 6; i++) { const y = Math.round(126 + Math.sin(t * 0.9 + i) * 4); rect(111 + i * 6, y, 114 + i * 6, y + 1, C.metalL); }
  for (let i = 0; i < 8; i++) if (Math.floor(t * 4 + i * 1.3) % 3 === 0) pset(217 + i * 9, 122, C.rojo);
  // el secuenciador encima: el monitor beis con el rollo de notas que corre
  const S = i_crt(R, 120, 44, 196, 108, t, { margen: 5, barbilla: 5 });
  rect(S[0], S[1], S[2], S[3], hex('#0e1a24')); R.recorte(S);
  for (let y = S[1]; y <= S[3]; y += 4) for (let x = S[0]; x <= S[2]; x += 2) pset(x, y, hex('#1a2a3a'));
  for (let k = 0; k < 18; k++) { const x = Math.round(S[0] + ((k * 13 - t * 16) % 80 + 80) % 80 - 6), y = S[1] + 2 + Math.floor(h(k, 1, 988) * (S[3] - S[1] - 6)), L = 4 + (k % 4) * 3; rect(x, y, x + L, y + 1, [hex('#5ae86a'), hex('#e8c840'), hex('#5ac8f0'), hex('#f07aa0')][k % 4]); }
  { const cx = S[0] + 22; for (let y = S[1]; y <= S[3]; y++) pset(cx, y, C.blanco); }
  R.recorte(null); i_brilloPantalla(R, S);
  rect(150, 109, 166, 115, C.k); rect(151, 110, 165, 115, IC.beisS);
  // los altavoces que botan, a los lados del monitor, y las notas que salen
  for (const [x0, k] of [[30, 0], [228, 1]]) { const b = Math.max(0, Math.sin(t * 9 + k)) * bota, by = Math.round(b * 2), cx = x0 + 18;
    rect(x0, 52 - by, x0 + 36, 114, C.k); rect(x0 + 1, 53 - by, x0 + 35, 113, hex('#2a2a30')); rect(x0 + 1, 53 - by, x0 + 35, 53 - by, hex('#4a4a52'));
    disco(cx, 94, 13, hex('#4a4a54')); disco(cx, 94, 11 + Math.round(b * 2), hex('#3a3a44')); R.anillo(cx, 94, 8 + Math.round(b * 2), hex('#5a5a66')); disco(cx, 94, 4, C.k); pset(cx - 2, 92, hex('#7a7a84'));
    disco(cx, 66 - by, 5, hex('#4a4a54')); disco(cx, 66 - by, 2, C.k);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.45 + i / 3 + k * 0.2) % 1), ny = 50 - u * 22; if (k === 0 && ny < 40) continue; if (k === 1 && ny < 30) continue; i_nota(R, cx + (k ? -1 : 1) * (8 + u * 16) + Math.sin(t * 3 + i) * 3, ny, [C.oroL, hex('#f0a0c0'), hex('#a0e0f0')][(i + k) % 3], i === 1); } }
  return { suelo: 172, teclado: [X0, 136, X1, 160], pantalla: S, altavoces: [[30, 52, 66, 114], [228, 52, 264, 114]], sitio: { compositor: 292, mano: [276, 136] } };
}

// G 'mesa' (inserto de la tarjeta de sonido): la mesa de pino (tablero y 128–179, de frente y un poco desde arriba)
// con la tarjeta en .tarjeta (pie; tarjetaSonido(R, x, y, t, { musicos })); a la izquierda el ordenador abierto (las
// ranuras de expansión, el ventilador de la fuente que gira); detrás la caja del juego con su castillo, un disquete; a la
// derecha el altavoz que bota (o.bota 0–1, por omisión 0,6) con el cable que va a la tarjeta, y la lámpara con su
// círculo de luz; en la pared, la ventana de noche (luna, estrellas, pinos) y el corcho. Libre sobre la mesa: x 110–
// 230, y 100–150 (los músicos diminutos y las notas).
function i_mesaTarjeta(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, bota = o.bota ?? 0.6;
  i_fijo(R, 'si-estudio-mesa', () => {
    // la pared de papel pintado (rayas finas de dos tonos) de noche
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 10 < 2) ? hex('#6a5a7a') : (h(x, y, 990) < 0.15 ? hex('#6a5a7a') : hex('#7a6a8a')));
    rect(0, 96, 319, 99, hex('#4a3a2a')); rect(0, 96, 319, 96, hex('#6a5a4a'));
    // la ventana de noche: estrellas, luna, la sierra y los pinos
    rect(118, 10, 202, 72, C.k); rect(119, 11, 201, 71, hex('#e8e0d0')); rect(122, 14, 198, 68, C.noche1);
    for (let y = 14; y < 69; y++) if (y > 40) for (let x = 122 + (y & 1); x <= 198; x += 2) pset(x, y, C.noche2);
    poligono([[122, 56], [140, 44], [156, 52], [176, 40], [198, 50], [198, 68], [122, 68]], hex('#2a3058'));
    for (let x = 124; x < 198; x += 7) { const a = 6 + Math.floor(h(x, 1, 991) * 6); for (let j = 0; j < a; j++) rect(x - Math.round(j * 0.35), 68 - a + j, x + Math.round(j * 0.35), 68 - a + j, hex('#14203a')); }
    rect(159, 14, 160, 68, hex('#e8e0d0')); rect(122, 40, 198, 41, hex('#e8e0d0'));
    rect(114, 8, 120, 74, hex('#8a3a4a')); rect(200, 8, 206, 74, hex('#8a3a4a')); for (let y = 8; y < 74; y += 3) { pset(116, y, hex('#6a2a3a')); pset(203, y, hex('#6a2a3a')); }
    rect(112, 6, 208, 7, C.maderaD);
    // el corcho con dos bocetos
    rect(222, 52, 262, 86, C.maderaS); rect(223, 53, 261, 85, IC.corcho); for (let k = 0; k < 60; k++) pset(224 + Math.floor(h(k, 1, 992) * 37), 54 + Math.floor(h(k, 2, 992) * 31), IC.corchoS);
    rect(226, 56, 242, 72, C.blanco); i_nota(R, 230, 60, C.k, true); rect(246, 60, 258, 80, hex('#f0e890')); for (let y = 63; y < 79; y += 3) rect(248, y, 256, y, C.grisL); pset(234, 56, C.rojo); pset(252, 60, C.rojo);
    // la mesa de pino vista un poco desde arriba: tablas con vetas y nudos
    for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 16), n = h(x >> 2, y, 993 + tb); let c = C.pinoM; if (y % 16 === 0) c = C.pinoMS; else if (n < 0.12) c = C.pinoMS; else if (n > 0.9) c = C.formica; pset(x, y, c); }
    for (let k = 0; k < 4; k++) { const nx = 30 + k * 80 + Math.floor(h(k, 1, 994) * 30), ny = 108 + k * 16 + 6; rect(nx - 3, ny, nx + 3, ny, C.pinoMS); rect(nx - 1, ny - 1, nx + 1, ny + 1, hex('#6a4420')); }
    rect(0, 100, 319, 101, hex('#4a3420'));
    // el ordenador abierto a la izquierda: la caja beis, la tapa quitada, la placa con ranuras y la fuente
    rect(4, 66, 96, 128, C.k); rect(5, 67, 95, 127, IC.beis); rect(5, 67, 95, 67, IC.beisL); rect(10, 72, 90, 122, hex('#1a2a20'));
    rect(12, 80, 88, 120, IC.pcbS); for (let k = 0; k < 40; k++) pset(13 + Math.floor(h(k, 1, 995) * 75), 81 + Math.floor(h(k, 2, 995) * 38), IC.pista);
    for (let k = 0; k < 4; k++) { const x = 16 + k * 12; rect(x, 84, x + 3, 118, C.k); rect(x + 1, 85, x + 2, 117, hex('#3a3a44')); }
    rect(68, 74, 88, 92, C.metalS); rect(69, 75, 87, 91, C.metal); rect(64, 98, 74, 108, C.k); rect(65, 99, 73, 107, hex('#3a3a44')); for (let i = 0; i < 6; i++) rect(64, 100 + i * 2, 74, 100 + i * 2, C.metalD);
    i_sombra(R, 50, 130, 48, 3, 0.7);
    // la caja del juego (un castillo dibujado, sin letras) y un disquete sobre la mesa
    rect(96, 104, 120, 132, C.k); rect(97, 105, 119, 131, hex('#3a2a6a')); rect(99, 107, 117, 124, hex('#6a8ad8')); rect(103, 114, 113, 124, C.piedraC); rect(102, 110, 104, 124, C.piedraC); rect(112, 110, 114, 124, C.piedraC); pset(103, 109, hex('#3a5ab0')); pset(113, 109, hex('#3a5ab0')); rect(107, 119, 109, 124, C.k);
    rect(99, 126, 117, 128, C.oro);
    poligono([[230, 148], [252, 144], [256, 162], [234, 166]], C.k); poligono([[231, 149], [251, 145], [255, 161], [235, 165]], C.disco); poligono([[236, 149], [246, 147], [247, 152], [237, 154]], C.etiqueta); disco(244, 156, 2, hex('#1a1a20'));
    // el cable de la tarjeta al altavoz
    linea(196, 148, 230, 140, C.k); linea(230, 140, 262, 136, C.k);
    // la lámpara (base y brazo) y su círculo de luz sobre la mesa
    rect(296, 124, 312, 128, C.k); rect(297, 124, 311, 126, C.metalD); linea(304, 124, 300, 96, C.k); linea(300, 96, 286, 86, C.k);
    poligono([[276, 82], [290, 80], [294, 90], [278, 92]], C.k); poligono([[277, 83], [289, 81], [293, 89], [279, 91]], hex('#3a6a4a'));
    for (let y = 104; y < 176; y++) { const w = Math.round(86 * Math.sqrt(Math.max(0, 1 - ((y - 140) / 37) ** 2))); for (let x = 160 - w; x <= 160 + w; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); pset(x, y, i_mezcla(c, hex('#fff0b0'), 0.18)); } }
  });
  // las estrellas que titilan y la luna en la ventana, y una nube fina que pasa
  R.recorte([122, 14, 198, 68]);
  for (let k = 0; k < 14; k++) { const x = 124 + Math.floor(h(k, 1, 996) * 72), y = 16 + Math.floor(h(k, 2, 996) * 24); if (Math.sin(t * 3 + k * 2.1) > -0.5) pset(x, y, C.blanco); }
  disco(184, 24, 5, hex('#f0ead0')); disco(186, 23, 4, C.noche1); pset(181, 26, C.blanco);
  { const x = Math.round(118 + ((t * 3) % 100)); for (let i = 0; i < 20; i++) if ((i & 1) === 0) pset(x + i, 30 + (i % 3 === 0 ? 1 : 0), hex('#5a6290')); }
  R.recorte(null);
  // el ventilador de la fuente que gira
  { const cx = 78, cy = 83; for (let k = 0; k < 3; k++) { const a = t * 14 + k * 2.09; linea(cx, cy, Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), C.metalD); } disco(cx, cy, 1, C.k); }
  pset(90, 124, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a4a2a'));
  // el altavoz que bota (y se aplasta al botar) con sus ondas
  { const b = Math.max(0, Math.sin(t * 9)) * bota, by = Math.round(Math.abs(Math.sin(t * 4.5)) * 4 * bota), x0 = 254, x1 = 290, y1 = 150 - by, y0 = 100 - by + Math.round(b * 2);
    i_sombra(R, 272, 152, 20 - by, 2, 0.7);
    rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#5a3a2a')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#7a5a40')); rect(x1 - 2, y0 + 2, x1 - 1, y1 - 1, hex('#3a2418'));
    const cx = 272, cy = Math.round((y0 + y1) / 2) + 6; disco(cx, cy, 12, C.k); disco(cx, cy, 11, hex('#3a3a44')); disco(cx, cy, 8 + Math.round(b * 2), hex('#2a2a32')); R.anillo(cx, cy, 6 + Math.round(b * 2), hex('#4a4a54')); disco(cx, cy, 3, C.k); pset(cx - 1, cy - 1, hex('#6a6a74'));
    disco(cx, y0 + 8, 3, hex('#3a3a44')); disco(cx, y0 + 8, 1, C.k);
    if (b > 0.2) for (const r of [16, 20]) for (let a = -0.9; a <= 0.9; a += 0.15) pset(Math.round(cx - Math.cos(a) * r - 4), Math.round(cy + Math.sin(a) * r), hex('#f0d890')); }
  return { suelo: 150, tarjeta: [160, 140], mesa: 100, altavoz: [254, 100, 290, 150], libre: [110, 100, 230, 150] };
}

// una sombra plana a ras de mesa (para las piezas de los gags)
function i_sombraT(R, cx, cy, rx, ry) { i_sombra(R, cx, cy, rx, ry, 0.72); }

// un músico diminuto (~10 px) con su instrumento: 'violin' (bajo la barbilla, el arco que va y viene), 'trompa' (la
// campana dorada, se infla al soplar) o 'timbal' (la caldera de cobre y dos mazas que golpean); u (0–1): al salir, todavía
// encogido. Pies en (x, y).
function i_musico(R, x, y, t, ins, ropa, u = 1) {
  const { rect, pset, disco, linea } = R, piel = hex('#f0c8a0'), pelo = hex('#5a3a2a'), e = u < 0.5 ? 1 : 0;
  // piernas, cuerpo con la levita de color y botones, cabeza con el pelo y los ojos
  rect(x - 1, y - 2, x - 1, y, C.k); rect(x + 1, y - 2, x + 1, y, C.k);
  rect(x - 2, y - 7 + e, x + 2, y - 3, C.k); rect(x - 1, y - 6 + e, x + 1, y - 3, ropa); pset(x, y - 5 + e, C.oroL);
  rect(x - 2, y - 11 + e, x + 2, y - 8 + e, C.k); rect(x - 1, y - 10 + e, x + 1, y - 8 + e, piel); rect(x - 1, y - 11 + e, x + 1, y - 11 + e, pelo); pset(x - 1, y - 9 + e, C.k); pset(x + 1, y - 9 + e, C.k);
  if (ins === 'violin') {
    rect(x + 2, y - 9 + e, x + 5, y - 7 + e, hex('#a8582a')); pset(x + 3, y - 8 + e, hex('#5a2a10')); linea(x + 5, y - 8 + e, x + 7, y - 9 + e, hex('#3a2010'));
    const ar = Math.sin(t * 8) * 3; linea(Math.round(x + 1 + ar), y - 11 + e, Math.round(x + 6 + ar), y - 5 + e, hex('#e8e0c8')); pset(x + 2, y - 6 + e, piel);
  } else if (ins === 'trompa') {
    const s = Math.sin(t * 6) > 0 ? 1 : 0; R.anillo(x + 3, y - 6 + e, 2, C.oro); pset(x + 2, y - 8 + e, C.oro); disco(x + 6, y - 7 + e, 1 + s, C.oroL); pset(x + 6, y - 7 + e, C.oroS); pset(x - 2, y - 6 + e, piel);
  } else {
    disco(x + 5, y - 2, 3, C.k); rect(x + 3, y - 4, x + 7, y - 3, hex('#e8e0d0')); rect(x + 3, y - 2, x + 7, y - 1, hex('#c8783a')); pset(x + 4, y - 2, hex('#f0a060'));
    const g = Math.floor(t * 6) % 2; linea(x + 2, y - 7 + e, x + 4, y - 5 + g * 2 - 1, hex('#8a5a2a')); linea(x + 2, y - 6 + e, x + 6, y - 4 - g * 2 + 1, hex('#8a5a2a'));
    if (g) { pset(x + 9, y - 6, C.blanco); pset(x + 10, y - 7, C.blanco); }
  }
}

// Lo que va por delante de los personajes en cada encuadre de hoy() (con las mismas opciones): la mesa del salón con sus
// cosas, el escritorio del cuarto, el álbum, la roca del mapa con el cuaderno, las rocas de primer plano de la cueva.
// Devuelve lo que la escena necesita para poner una mano: { lapiz: [x, y] } (tableta y cuaderno), { carta: [x, y] }
// (el cromo que se pega), { pantalla: [x0, y0, x1, y1] }.
export function j_hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'salon', cam = o.camara ?? 'general';
  if (enc === 'salon') return cam === 'mesa' ? j_salonMesaDelante(R, t, o) : j_salonDelante(R, t, o);
  if (enc === 'cuarto') return cam === 'album' ? j_albumDelante(R, t, o) : j_cuartoDelante(R, t, o);
  if (enc === 'cueva') {
    if ((o.estilo ?? 'real') === '3d') { if (cam !== 'mapa') j_cueva3dDelante(R, t, o); return {}; }
    return cam === 'mapa' ? j_rocaMapaDelante(R, t, o) : (j_cuevaRealDelante(R, t, o), {});
  }
  return {};
}

const j_C = pal({
  // el salón de hoy: estuco, arrimadero, tarima de roble, mesa de nogal, la foto en sepia
  p0: '#a29078', p1: '#b4a48a', p2: '#c4b59c', p3: '#d2c5ac', p4: '#dfd4bc',
  zoc: '#e8e2d4', zocS: '#bfb7a4', zocL: '#f8f4ea', zocD: '#9e9682',
  roble: '#b98a56', robleS: '#9e6e42', robleL: '#cfa06a', robleJ: '#6e4a2a', robleB: '#e6c08a',
  nogal: '#6e462a', nogalS: '#4a2c1a', nogalL: '#8e5e38', nogalB: '#b88250', nogalD: '#2e1a10',
  sepia0: '#3e2c1c', sepia1: '#6e5034', sepia2: '#9a7a52', sepia3: '#c8a878', sepia4: '#ecd8b0',
  hoja: '#4a8a3a', hojaS: '#2e6a2a', hojaL: '#7ab85a', tiesto: '#c0663a', tiestoS: '#8e4424',
  // el cuarto del chico: pared azul, moqueta, el mapa a lápiz
  q0: '#1c2638', q1: '#243048', q2: '#2c3a56', q3: '#364866', q4: '#425878',
  moq: '#4a4e62', moqS: '#3c4054', moqL: '#5c6076', blanco2: '#e8e8ee', blanco2S: '#b8bac8', blanco2D: '#8a8ca0',
  papel: '#efe6cc', papelS: '#d6caa8', lapiz: '#5a5a72', lapizR: '#c8403a', lapizA: '#3a6ab8',
  // la cueva de verdad: caliza a la luz de la lámpara
  r0: '#0e0a0a', r1: '#1e1612', r2: '#33271c', r3: '#4e3c2a', r4: '#6e583a', r5: '#937a52', r6: '#b89a68',
  agua0: '#081216', agua1: '#10262c', agua2: '#1e3e44', aguaL: '#7ab0a0',
  llama: '#ffd25a', llamaL: '#fff4c0', llamaR: '#ff8a30', laton: '#c89a3a', latonS: '#8a6420', latonL: '#f0cc6a', dia: '#d8ecd0',
  // la cueva en 3D: polígonos limpios
  v0: '#160f36', v1: '#24194f', v2: '#352670', v3: '#4a3592', v4: '#5c48aa', v5: '#2c5a92', v6: '#2f7c9c', v7: '#3aa6aa',
  cristalC: '#6af0ff', cristalM: '#ff6ae0', haz: '#fff2c0', rio: '#22b6c8', rioL: '#a8fcff', rioS: '#167c9a',
  suelo3: '#5a4a86', suelo3L: '#7a64a8', suelo3S: '#3e3266',
  // las gafas de realidad virtual y su espuma
  gafa: '#f4f4f6', gafaS: '#c8ccd6', gafaD: '#8e94a4', vidrioRV: '#181c2a', vidrioRVL: '#4a5a80', correa: '#5a5e6a', correaS: '#3a3e48',
  espuma: '#2a2a32', espumaS: '#1c1c22', espumaL: '#3a3a44',
});

const j_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const j_u = (x, y) => j_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function j_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// los fondos fijos de hoy(): se pintan una vez en un búfer de R.nuevo() y se copian enteros en cada fotograma
const j_capas = new Map();

function j_fondo(R, clave, dibuja) {
  let b = j_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); j_capas.set(clave, b); }
  R.buf.set(b);
}

// lo fijo de primer plano (con huecos): se pinta una vez sobre un color vacío y se copian solo sus píxeles
function j_delante(R, clave, dibuja) {
  let c = j_capas.get(clave);
  if (!c) {
    const b = R.nuevo(), V = 0x01020304; b.fill(V); const prev = R.usar(b); dibuja(); R.usar(prev);
    const idx = []; for (let i = 0; i < b.length; i++) if (b[i] !== V) idx.push(i); c = { b, idx: Int32Array.from(idx) }; j_capas.set(clave, c);
  }
  const B = R.buf, { b, idx } = c; for (let k = 0; k < idx.length; k++) B[idx[k]] = b[idx[k]];
}

// un rectángulo que respeta R.recorte (R.rect no lo respeta)
const j_rc = (R, x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); };

// vela un rectángulo hacia un color (luz o sombra) en la proporción a; con trama < 1 solo en esa fracción de píxeles
function j_velo(R, x0, y0, x1, y1, col, a, trama = 1) {
  const B = R.buf;
  for (let y = Math.max(0, Math.round(y0)); y <= Math.min(179, Math.round(y1)); y++) for (let x = Math.max(0, Math.round(x0)); x <= Math.min(319, Math.round(x1)); x++) if (trama >= 1 || j_u(x, y) < trama) B[y * 320 + x] = j_mezcla(B[y * 320 + x], col, a);
}

// un halo redondo tramado (luz que cae alrededor de un punto): a en el centro, nada en el radio r
function j_halo(R, cx, cy, r, col, a, sy = 1) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - r * sy)); y <= Math.min(179, Math.ceil(cy + r * sy)); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, Math.ceil(cx + r)); x++) {
    const d = Math.hypot(x - cx, (y - cy) / sy) / r; if (d >= 1) continue; const q = a * (1 - d) * (1 - d); if (q > 0.02) B[y * 320 + x] = j_mezcla(B[y * 320 + x], col, q > 0.35 || j_u(x, y) < 0.75 ? q : q * 0.5);
  }
}

// cielo tramado entre bandas (directo al búfer) en un rectángulo: P = [[fracción, color], …]
function j_cielo(R, x0, y0, x1, y1, P) {
  const B = R.buf, H = Math.max(1, y1 - y0);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) {
    const f = (y - y0) / H; let i = 0; while (i + 2 < P.length && f >= P[i + 1][0]) i++;
    const p = Math.max(0, Math.min(1, (f - P[i][0]) / (P[i + 1][0] - P[i][0]))), a = P[i][1], b = P[i + 1][1];
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = j_u(x, y) < p ? b : a;
  }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; c = [sombra, cuerpo, luz]
function j_nube(R, cx, cy, w, sem, c) {
  const n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 811)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 812) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.66), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.linea(Math.round(cx - w * 0.44), y0, Math.round(cx + w * 0.44), y0, c[0]);
}

// un pájaro de 3 px que aletea
function j_pajaro(R, x, y, t, c, k = 0) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 13 + k * 2) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); if (a) { R.pset(x - 2, y - 1, c); R.pset(x + 2, y - 1, c); } else { R.pset(x - 2, y + 1, c); R.pset(x + 2, y + 1, c); } }

// cifras diminutas de 3 × 5 (solo dígitos)
const j_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

function j_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = j_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// un dibujo de filas de letras (cada letra, un color de pal; '.' vacío) a escala s
function j_spr(R, filas, x, y, pal, s = 1) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = pal[f[i]]; if (c == null) continue; if (s === 1) R.pset(x + i, y + j, c); else R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); } }); }

// tarima de tablas en perspectiva (filas que crecen hacia delante, juntas al tresbolillo, veta) entre y0 e y1; luz(x, y)
// devuelve cuánto aclara la luz del ventanal (0–1)
function j_tarima(R, y0, y1, k, luz = () => 0) {
  const B = R.buf, C3 = [j_C.roble, j_C.robleS, j_C.robleL]; let y = y0, alto = 2.4, fila = 0;
  while (y <= y1) {
    const ya = y, yb = Math.min(y1, y + Math.round(alto) - 1), L = 16 + fila * 7, off = h(fila, 1, k) * L;
    for (let yy = ya; yy <= yb; yy++) for (let x = 0; x < 320; x++) {
      const u = x + off, tab = Math.floor(u / L), junta = u - tab * L < 1;
      let c = yy === ya ? j_C.robleJ : junta ? j_C.robleS : C3[Math.floor(h(tab, fila, k) * 2.99)];
      if (!junta && yy !== ya && h(x >> 2, yy, k + tab) < 0.1) c = j_mezcla(c, j_C.robleJ, 0.35);
      if (!junta && yy === ya + 1 && (x & 7) === 3) c = j_mezcla(c, j_C.robleB, 0.3);
      const l = luz(x, yy); if (l > 0 && j_u(x, yy) < l) c = j_mezcla(c, j_C.robleB, 0.45);
      B[yy * 320 + x] = c;
    }
    y = yb + 1; alto *= 1.2; fila++;
  }
}

// el jardín visto por la ventana (se pinta entero en cada fotograma, recortado al cristal x0–x1, y0–y1): cielo tramado,
// nubes de tres tonos a tres velocidades, pájaros, colinas, la casa del vecino, un vecino con su perro detrás de la valla,
// la valla, flores, el césped segado a franjas, el roble que se mece (raíz en rx), el aspersor y el comedero con su pájaro
function j_jardin(R, t, x0, y0, x1, y1, o = {}) {
  const { pset, disco, poligono, linea } = R, W = x1 - x0, Hh = y1 - y0, Y = (f) => Math.round(y0 + f * Hh), X = (f) => Math.round(x0 + f * W);
  R.recorte([x0, y0, x1, y1]);
  const hor = Y(0.46);
  j_cielo(R, x0, y0, x1, hor, [[0, hex('#3e8ad8')], [0.4, hex('#62a8e6')], [0.75, hex('#8cc4ee')], [1, hex('#c4e0f0')]]);
  const NUB = [hex('#a8cfec'), hex('#d6ecfa'), hex('#ffffff')];
  for (let k = 0; k < 4; k++) { const v = [1.6, 2.6, 4.2, 2.1][k], w = [26, 18, 22, 14][k], span = W + 60, x = x0 - 30 + ((h(k, 1, 813) * span + t * v) % span), y = y0 + 6 + [4, 0, 11, 7][k] * Hh / 80; if (y + 6 < hor - 2) j_nube(R, x, y, w, k, NUB); }
  for (let k = 0; k < 2; k++) { const u = ((t + k * 5.3) % 13) / 13; j_pajaro(R, x1 + 6 - u * (W + 20), y0 + 8 + k * 5 + Math.sin(t * 2 + k) * 1.5, t, hex('#2a3040'), k); }
  // colinas y arboleda lejana
  for (let x = x0; x <= x1; x++) { const yc = hor - 3 - Math.round(3 * Math.sin(x * 0.06 + 1) + 2 * Math.sin(x * 0.17)); linea(x, yc, x, hor + 2, hex('#86a8b0')); }
  for (let x = x0; x <= x1; x++) { const yc = hor + 1 - Math.round(2.5 * Math.abs(Math.sin(x * 0.21)) + 1.5 * Math.abs(Math.sin(x * 0.53))); linea(x, yc, x, hor + 6, (x * 7) % 5 ? hex('#4e7e5a') : hex('#3e6a4a')); }
  // la casa del vecino
  { const hx = X(0.62), hw = Math.round(W * 0.3), hy = hor - 4; poligono([[hx - 2, hy + 4], [hx + hw / 2, hy - 6], [hx + hw + 2, hy + 4]], hex('#a8583a')); linea(hx - 2, hy + 4, hx + hw / 2, hy - 6, hex('#7a3a2a'));
    j_rc(R, hx, hy + 4, hx + hw, hy + 12, hex('#e8dcc4')); j_rc(R, hx + 3, hy + 6, hx + 7, hy + 10, hex('#5a7a9a')); j_rc(R, hx + hw - 8, hy + 6, hx + hw - 4, hy + 10, hex('#5a7a9a')); pset(hx + 4, hy + 7, hex('#a8c8e0'));
    j_rc(R, hx + hw - 6, hy - 6, hx + hw - 4, hy - 1, hex('#8a4a3a')); }
  // el césped segado a franjas, que se aclara hacia delante
  const yv = hor + 6;
  for (let y = yv; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (y - yv) / Math.max(1, y1 - yv), franja = ((x + (y - yv) * 0.6) / 9 | 0) % 2; R.pset(x, y, h(x, y, 814) < 0.07 ? hex('#3a7a2e') : franja ? (j_u(x, y) < f ? hex('#7cc05a') : hex('#62a848')) : (j_u(x, y) < f ? hex('#6ab44e') : hex('#56983e'))); }
  // el sendero de losas
  for (let k = 0; k < 4; k++) { const yy = yv + 4 + k * Math.round((y1 - yv - 4) / 4), w = 2 + k, cx = X(0.45) + k * 2; j_rc(R, cx - w, yy, cx + w, yy + 1, hex('#b8b0a0')); j_rc(R, cx - w + 1, yy, cx + w - 1, yy, hex('#ddd6c6')); }
  // un vecino con su perro, que pasa detrás de la valla
  { const u = ((t + 3) % 16) / 16, px = Math.round(x1 + 8 - u * (W + 20)), py = yv - 1, pa = Math.floor(t * 5) % 2;
    j_rc(R, px, py - 9, px + 2, py - 4, hex('#c84a4a')); disco(px + 1, py - 11, 1.6, hex('#e8b890')); pset(px + 1, py - 13, hex('#5a3a2a')); pset(px + pa, py - 3, hex('#3a3a5a')); pset(px + 2 - pa, py - 3, hex('#3a3a5a')); linea(px - 1, py - 6, px - 5, py - 2, hex('#3a3040'));
    j_rc(R, px - 9, py - 3, px - 5, py - 2, hex('#a8743c')); pset(px - 10, py - 4, hex('#a8743c')); pset(px - 9 + pa, py - 1, hex('#6a4a2a')); pset(px - 5 - pa, py - 1, hex('#6a4a2a')); pset(px - 4, py - 4, hex('#a8743c')); }
  // la valla blanca de estacas
  for (let x = x0 + 1; x <= x1; x += 5) { j_rc(R, x, yv - 7, x + 2, yv + 2, hex('#f2eee4')); pset(x + 1, yv - 8, hex('#f2eee4')); linea(x + 2, yv - 6, x + 2, yv + 2, hex('#c8c2b4')); }
  linea(x0, yv - 4, x1, yv - 4, hex('#d8d2c4')); linea(x0, yv, x1, yv, hex('#d8d2c4')); linea(x0, yv + 3, x1, yv + 3, hex('#3e6a3a'));
  // las flores del arriate, que se mecen
  for (let k = 0; k < Math.round(W / 4); k++) { const fx = x0 + 2 + k * 4 + Math.round(Math.sin(t * 2 + k) * 0.6), fy = yv + 2 + (k % 2); pset(fx, fy + 1, hex('#3a7a2e')); pset(fx, fy, [hex('#e84a6a'), hex('#f8d040'), hex('#ffffff'), hex('#a868d8')][k % 4]); }
  // el roble, que se mece
  { const rx = o.rx ?? X(0.2), base = y1 - 4, al = Math.round(Hh * 0.5), m = Math.sin(t * 0.8) * 1.4, top = base - al;
    j_rc(R, rx - 2, top + 8, rx + 2, base, hex('#5a4030')); linea(rx - 2, top + 8, rx - 2, base, hex('#3e2c20')); linea(rx + 2, top + 16, rx + 9, top + 8, hex('#5a4030')); linea(rx - 1, top + 18, rx - 8, top + 10, hex('#5a4030'));
    const bolas = [[0, 0, 11], [-10, 5, 8], [10, 5, 9], [-4, -7, 8], [6, -6, 7], [0, 8, 8]];
    for (const [dx, dy, r] of bolas) disco(Math.round(rx + dx + m * (1 - dy / 20)), top + 4 + dy, r + 1, hex('#2e5a2a'));
    for (const [dx, dy, r] of bolas) disco(Math.round(rx + dx + m * (1 - dy / 20)), top + 4 + dy, r, hex('#4a8a3a'));
    for (const [dx, dy, r] of bolas) disco(Math.round(rx + dx - 2 + m * (1 - dy / 20)), top + 2 + dy, Math.round(r * 0.55), hex('#7ab85a'));
    for (let k = 0; k < 14; k++) { const lx = Math.round(rx - 14 + h(k, 1, 815) * 28 + m), ly = top - 4 + Math.round(h(k, 2, 815) * 22); pset(lx, ly, Math.sin(t * 3 + k) > 0.3 ? hex('#9ad070') : hex('#2e5a2a')); } }
  // el aspersor: un abanico de gotas que barre
  { const sx = X(0.7), sy = y1 - 6, a = Math.sin(t * 1.3) * 0.9; pset(sx, sy, hex('#5a5a6a')); pset(sx, sy - 1, hex('#9a9aaa'));
    for (let k = 0; k < 12; k++) { const u = ((t * 1.6 + k / 12) % 1), d = u * 16, ang = -Math.PI / 2 + a + (k % 3 - 1) * 0.15; const gx = Math.round(sx + Math.cos(ang) * d * 1.3), gy = Math.round(sy + Math.sin(ang) * d + u * u * 12); pset(gx, gy, u < 0.6 ? hex('#e8f8ff') : hex('#a8d8f0')); } }
  // el comedero con su pájaro, que va y viene
  { const cx = X(0.9), cy = hor + 2; linea(cx, cy, cx, y1, hex('#4a4a52')); j_rc(R, cx - 3, cy - 3, cx + 3, cy, hex('#b8743c')); poligono([[cx - 5, cy - 3], [cx, cy - 7], [cx + 6, cy - 3]], hex('#6a3a2a')); pset(cx, cy - 2, hex('#2a1a12'));
    const fase = (t % 6) / 6; if (fase < 0.7) { const b = Math.floor(t * 3) % 2; j_rc(R, cx + 3, cy - 4 - b, cx + 5, cy - 2 - b, hex('#c82a2a')); pset(cx + 6, cy - 3 - b, hex('#e8a030')); pset(cx + 4, cy - 5 - b, hex('#c82a2a')); }
    else j_pajaro(R, cx + 4 + (fase - 0.7) * 60, cy - 6 - (fase - 0.7) * 40, t, hex('#c82a2a')); }
  // dos mariposas
  for (let k = 0; k < 2; k++) { const bx = X(0.3 + k * 0.35) + Math.round(Math.sin(t * 0.9 + k * 3) * 8), by = yv + 6 + Math.round(Math.sin(t * 2.1 + k) * 3), a = Math.sin(t * 16 + k) > 0; pset(bx, by, hex('#3a2a2a')); if (a) { pset(bx - 1, by - 1, k ? hex('#f8f070') : hex('#f8a040')); pset(bx + 1, by - 1, k ? hex('#f8f070') : hex('#f8a040')); } else { pset(bx - 1, by, k ? hex('#f8f070') : hex('#f8a040')); pset(bx + 1, by, k ? hex('#f8f070') : hex('#f8a040')); } }
  R.recorte(null);
}

// un visillo que ondea: una tela clara y transparente de x a x + w (w cambia con la altura y el aire), de y0 a y1
function j_visillo(R, t, x, y0, y1, w, dir = 1) {
  const B = R.buf, blanco = hex('#fbf8f0');
  for (let y = y0; y <= y1; y++) { const ww = w + Math.round(Math.sin(t * 0.9 + y * 0.08) * 1.5 + (y - y0) * 0.04);
    for (let i = 0; i <= ww; i++) { const xx = x + i * dir; if (xx < 0 || xx > 319) continue; const pl = (i + Math.round(Math.sin(y * 0.05 + t * 0.7) * 2)) % 4; B[y * 320 + xx] = j_mezcla(B[y * 320 + xx], blanco, pl === 0 ? 0.75 : pl === 2 ? 0.45 : 0.58); }
    const xe = x + ww * dir; if (xe >= 0 && xe <= 319) B[y * 320 + xe] = j_mezcla(B[y * 320 + xe], hex('#c8c0b0'), 0.6); }
}

// la foto antigua de los dos en 1979 (sepia: la cocina, la lámpara, la mesa con el terminal y los dos jóvenes), en su
// marco con paspartú; x0, y0 esquina, w × hh
function j_fotoAntigua(R, x0, y0, w, hh) {
  const { rect, pset, disco, linea } = R, S = [j_C.sepia0, j_C.sepia1, j_C.sepia2, j_C.sepia3, j_C.sepia4];
  rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh + 1, j_C.nogalD); rect(x0, y0, x0 + w, y0 + hh, j_C.nogal); rect(x0, y0, x0 + w, y0, j_C.nogalB); rect(x0, y0, x0, y0 + hh, j_C.nogalL);
  rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + hh - 2, hex('#f2ead6')); rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + 2, hex('#cfc4ac'));
  const px0 = x0 + 5, py0 = y0 + 5, px1 = x0 + w - 5, py1 = y0 + hh - 5, pw = px1 - px0, ph = py1 - py0;
  for (let y = py0; y <= py1; y++) for (let x = px0; x <= px1; x++) { const f = (y - py0) / ph, d = Math.hypot((x - px0 - pw * 0.5) / pw, (y - py0 - ph * 0.3) / ph); const n = Math.max(0, Math.min(4, Math.round(3.4 - d * 3 - (f > 0.62 ? 0.8 : 0) + (j_u(x, y) - 0.5)))); pset(x, y, S[n]); }
  const mx = px0 + Math.round(pw * 0.5), my = py0 + Math.round(ph * 0.66);
  rect(px0, my, px1, my + 1, S[1]); rect(px0 + 3, my + 2, px0 + 3, py1, S[1]); rect(px1 - 3, my + 2, px1 - 3, py1, S[1]);   // la mesa
  linea(mx, py0, mx, py0 + Math.round(ph * 0.2), S[1]); rect(mx - 3, py0 + Math.round(ph * 0.2), mx + 3, py0 + Math.round(ph * 0.2) + 1, S[1]); pset(mx, py0 + Math.round(ph * 0.2) + 2, S[4]);   // la lámpara
  const tx = mx - 2, ty = my - 6; rect(tx - 3, ty, tx + 3, my - 1, S[0]); rect(tx - 2, ty + 1, tx + 2, my - 3, hex('#b8c8a0')); pset(tx - 1, ty + 2, hex('#e8f0d0'));   // el terminal con su pantalla que brilla
  for (const [fx, pelo, d] of [[mx - 10, S[0], 1], [mx + 8, S[1], -1]]) { const fy = my - 1; rect(fx - 2, fy - 5, fx + 2, fy, S[1]); disco(fx, fy - 8, 2.6, S[3]); rect(fx - 2, fy - 11, fx + 2, fy - 9, pelo); if (d > 0) { pset(fx - 3, fy - 8, pelo); pset(fx - 3, fy - 7, pelo); } pset(fx + d, fy - 8, S[0]); }
  pset(mx + 12, my - 2, S[4]); rect(mx + 11, my - 1, mx + 13, my - 1, S[3]);   // una taza
  for (let i = 0; i < Math.min(pw, ph) - 2; i += 1) if (i % 3 !== 2) pset(px0 + 2 + i, py0 + Math.round(ph * 0.45) - i, j_mezcla(S[4], hex('#ffffff'), 0.5));   // el reflejo del cristal
  rect(px0, py0, px1, py0, S[0]); disco(x0 + w - 4, y0 + hh - 4, 0.6, S[3]);
}

// el dibujo de un castillo hecho por un nieto, a ceras, pegado con celo; x0, y0 esquina, w × hh
function j_dibujoCastillo(R, x0, y0, w, hh) {
  const { rect, pset, poligono, disco } = R;
  rect(x0, y0, x0 + w, y0 + hh, hex('#fbfaf4')); rect(x0 + w, y0 + 1, x0 + w, y0 + hh, hex('#d8d4c8')); rect(x0 + 1, y0 + hh, x0 + w, y0 + hh, hex('#d8d4c8'));
  for (const [cx, cy] of [[x0 + 2, y0], [x0 + w - 2, y0]]) rect(cx - 2, cy - 1, cx + 2, cy + 1, hex('#f0e8b0'));
  const b = y0 + hh - 3; for (let x = x0 + 1; x < x0 + w; x++) { pset(x, b, hex('#4ab04a')); if (x % 2) pset(x, b - 1, hex('#4ab04a')); }
  for (let x = x0 + 2; x < x0 + w - 1; x++) if ((x + b) % 3) pset(x, b + 1, hex('#4a7ad8'));
  const cx = x0 + Math.round(w / 2), cw = Math.round(w * 0.32), cy = b - Math.round(hh * 0.38);
  rect(cx - cw, cy, cx + cw, b - 1, hex('#9a9aa8')); for (let x = cx - cw; x <= cx + cw; x += 2) pset(x, cy - 1, hex('#9a9aa8'));
  for (const tx of [cx - cw, cx + cw - 2]) { rect(tx, cy - 6, tx + 2, cy, hex('#8a8a98')); poligono([[tx - 1, cy - 6], [tx + 1, cy - 10], [tx + 4, cy - 6]], hex('#d84a4a')); pset(tx + 1, cy - 11, hex('#5a5a5a')); rect(tx + 2, cy - 12, tx + 4, cy - 11, hex('#e8c040')); }
  rect(cx - 1, b - 4, cx + 1, b - 1, hex('#6a4a2a')); disco(x0 + w - 5, y0 + 5, 2.5, hex('#f8d040')); for (let k = 0; k < 6; k++) pset(Math.round(x0 + w - 5 + Math.cos(k) * 4), Math.round(y0 + 5 + Math.sin(k) * 4), hex('#f8d040'));
  pset(x0 + 4, y0 + 5, hex('#3a3a4a')); pset(x0 + 5, y0 + 4, hex('#3a3a4a')); pset(x0 + 6, y0 + 5, hex('#3a3a4a'));
}

// una librería empotrada de madera de x0 a x1 y de y0 a y1 (tres baldas): libros, las ocho cajas con corona de la serie,
// un globo, cestos de mimbre, una foto y un bol
function j_libreria(R, x0, y0, x1, y1) {
  const { rect, pset, disco, linea } = R, M = hex('#8e6038'), MS = hex('#5e3c20'), ML = hex('#b07c4c'), FON = hex('#3a2818');
  rect(x0, y0, x1, y1, MS); rect(x0 + 1, y0, x1 - 1, y0 + 2, ML); rect(x0 + 1, y0 + 3, x1 - 1, y0 + 3, M);
  const n = 3, alto = Math.floor((y1 - y0 - 4) / n);
  for (let k = 0; k < n; k++) {
    const a = y0 + 4 + k * alto, b = a + alto - 4;
    for (let y = a; y <= b; y++) for (let x = x0 + 3; x <= x1 - 3; x++) pset(x, y, (y - a) < 3 ? hex('#22160e') : h(x >> 1, y, 820) < 0.15 ? hex('#2e2014') : FON);
    rect(x0 + 2, b + 1, x1 - 2, b + 3, M); rect(x0 + 2, b + 1, x1 - 2, b + 1, ML); rect(x0 + 2, b + 4, x1 - 2, b + 4, MS);
    let x = x0 + 4;
    if (k === 1) {   // las ocho cajas con corona, de pie, con sus sujetalibros
      rect(x, b - 4, x + 2, b, hex('#8a8a96')); x += 4;
      for (let i = 0; i < 8; i++) { const c = [hex('#2a4fa8'), hex('#3a8a4a'), hex('#c83a3a'), hex('#6a3a8a'), hex('#d87a2a'), hex('#2a7a8a'), hex('#8a2a4a'), hex('#4a4a8a')][i], hh = alto - 7;
        rect(x, b - hh, x + 4, b, hex('#1c1222')); rect(x + 1, b - hh + 1, x + 3, b, c); rect(x + 1, b - hh + 1, x + 1, b, j_mezcla(c, hex('#ffffff'), 0.25));
        pset(x + 1, b - hh + 3, hex('#e8b830')); pset(x + 3, b - hh + 3, hex('#e8b830')); rect(x + 1, b - hh + 4, x + 3, b - hh + 4, hex('#e8b830')); pset(x + 2, b - hh + 3, hex('#fff0a0')); rect(x + 1, b - 3, x + 3, b - 3, j_mezcla(c, hex('#000000'), 0.3)); x += 5; }
      rect(x, b - 4, x + 2, b, hex('#8a8a96')); x += 5;
      if (x < x1 - 14) { disco(x + 5, b - 5, 5, hex('#1c1222')); disco(x + 5, b - 5, 4, hex('#3a7ac8')); rect(x + 3, b - 7, x + 6, b - 5, hex('#5aa85a')); pset(x + 7, b - 3, hex('#5aa85a')); rect(x + 4, b - 1, x + 6, b, hex('#a87a18')); x += 12; }
    } else if (k === 2) {   // cestos de mimbre y un bol
      for (let i = 0; i < 2 && x < x1 - 20; i++) { const w = 16, hh = alto - 9; rect(x, b - hh, x + w, b, hex('#7a5a30')); for (let yy = b - hh + 1; yy <= b; yy++) for (let xx = x + 1; xx < x + w; xx++) pset(xx, yy, ((xx + (yy & 1) * 2) % 4) < 2 ? hex('#c8a060') : hex('#a88040')); rect(x, b - hh, x + w, b - hh + 1, hex('#d8b878')); x += w + 3; }
      if (x < x1 - 12) { disco(x + 5, b - 2, 5, hex('#3a6a8a')); rect(x, b - 8, x + 10, b - 3, FON); rect(x + 1, b - 3, x + 9, b - 3, hex('#5a8aaa')); x += 13; }
    }
    const cols = [hex('#b8343a'), hex('#3a6ab8'), hex('#e0b040'), hex('#3a8a5a'), hex('#7a4ab0'), hex('#d8d0c0'), hex('#c86a2a'), hex('#2a4a7a'), hex('#e8e0c8')];
    for (let i = 0; x < x1 - 4; i++) { const w = 2 + Math.round(h(i, k, 821) * 2), hh = alto - 9 + Math.round(h(i, k, 822) * 4), c = cols[Math.floor(h(i, k, 823) * 9)];
      if (k === 0 && i === 5 && x < x1 - 12) { rect(x, b - 9, x + 8, b, hex('#1c1222')); rect(x + 1, b - 8, x + 7, b - 1, hex('#e8e0c8')); rect(x + 2, b - 7, x + 6, b - 2, hex('#8ab0c8')); rect(x + 2, b - 4, x + 6, b - 2, hex('#6a9a5a')); x += 10; continue; }
      if (x + w > x1 - 3) break; rect(x, b - hh, x + w, b, hex('#1c1222')); rect(x + 1, b - hh + 1, x + w - (w > 2 ? 1 : 0), b, c); pset(x + 1, b - hh + 2, j_mezcla(c, hex('#ffffff'), 0.5)); pset(x + 1, b - 2, j_mezcla(c, hex('#000000'), 0.35)); x += w + 1;
      if (h(i, k, 824) < 0.12 && x < x1 - 9) { linea(x, b, x + 4, b - hh + 2, hex('#1c1222')); linea(x + 1, b, x + 5, b - hh + 2, cols[(i + 3) % 9]); x += 7; } }
  }
  rect(x0, y0, x0, y1, MS); rect(x1, y0, x1, y1, MS);
}

// una silla de comedor de madera con respaldo de barrotes, vista de frente, detrás de quien se sienta en x (el asiento,
// tapado por la mesa); yTop es lo alto del respaldo y yPie el suelo bajo la mesa (las patas asoman entre y0 e yPie)
function j_silla(R, x, yTop, y0, yPie) {
  const { rect } = R, M = j_C.nogal, ML = j_C.nogalL, MS = j_C.nogalS;
  rect(x - 10, yTop, x + 10, yTop + 3, j_C.nogalD); rect(x - 9, yTop + 1, x + 9, yTop + 2, ML); rect(x - 9, yTop + 1, x + 9, yTop + 1, j_C.nogalB);
  for (const dx of [-10, 9]) { rect(x + dx, yTop, x + dx + 1, y0, j_C.nogalD); rect(x + dx, yTop + 1, x + dx, y0, M); }
  for (let i = -6; i <= 6; i += 4) rect(x + i, yTop + 4, x + i + 1, y0, i < 0 ? MS : M);
  for (const dx of [-9, 8]) { rect(x + dx, y0 + 1, x + dx + 1, yPie, MS); rect(x + dx, yPie - 1, x + dx + 1, yPie, j_C.nogalD); }
}

function j_salon(R, t, o) {
  const { rect, pset, disco, linea } = R, cam = o.camara ?? 'general';
  if (cam === 'mesa') {
    j_fondo(R, 'salon-mesa', () => j_salonMesaFijo(R));
    j_jardin(R, t, 0, 12, 43, 108, { rx: 14 });
    // el parteluz y la luz que entra por el cristal
    rect(20, 12, 21, 108, j_C.zocL); rect(22, 12, 22, 108, j_C.zocS); rect(0, 58, 43, 59, j_C.zocL); rect(0, 60, 43, 60, j_C.zocS);
    for (let k = 0; k < 3; k++) for (let i = 0; i < 14; i++) if (i % 4 !== 3) pset(4 + k * 13 + i, 50 - i * 2 + k * 30, hex('#e8f4fc'));
    j_visillo(R, t, 40, 6, 116, 9, 1);
    // las sillas detrás de los puestos
    for (const x of o.sillas ?? [128, 196]) j_silla(R, x, 112, 127, 127);
    // motas de polvo en la luz
    for (let k = 0; k < 14; k++) { const x = Math.round(50 + h(k, 1, 830) * 90 + Math.sin(t * 0.4 + k) * 5), y = Math.round(20 + ((h(k, 2, 830) * 90 + t * (1.2 + h(k, 3, 830))) % 90)); if (Math.sin(t * 1.1 + k * 2) > -0.1 && y < 126) pset(x, y, hex('#fff6dc')); }
    // el reloj de la librería no, la lámpara de la pared: su brillo late suave
    return { suelo: 137, puestos: o.sillas ?? [128, 196], mesa: [0, 128, 319], tableta: [98, 138, 150, 160], pantalla: [227, 91, 271, 119], foto: [132, 22, 188, 68], ventana: [0, 12, 43, 108] };
  }
  j_fondo(R, 'salon-g', () => j_salonFijo(R));
  // el jardín por el ventanal, el bastidor por encima, los reflejos y los visillos
  j_jardin(R, t, 14, 18, 116, 94, { rx: 34 });
  rect(48, 18, 49, 94, j_C.zocL); rect(50, 18, 50, 94, j_C.zocS); rect(83, 18, 84, 94, j_C.zocL); rect(85, 18, 85, 94, j_C.zocS); rect(14, 43, 116, 44, j_C.zocL); rect(14, 45, 116, 45, j_C.zocS);
  rect(48, 42, 50, 46, j_C.zocD); rect(83, 42, 85, 46, j_C.zocD);
  for (const [x0, y0] of [[20, 40], [56, 36], [90, 40]]) for (let i = 0; i < 12; i++) if (i % 5 !== 4) j_velo(R, x0 + i, y0 - i * 2, x0 + i + 1, y0 - i * 2, hex('#ffffff'), 0.4);
  j_visillo(R, t, 5, 12, 100, 13, 1); j_visillo(R, t + 1.7, 125, 12, 100, 13, -1);
  // el reloj de pared (las agujas andan) y el tocadiscos (el disco gira)
  { const cx = 214, cy = 34, a1 = t * 0.5 - 1.2, a2 = t * 0.05 + 2.2; linea(cx, cy, Math.round(cx + Math.cos(a1) * 6), Math.round(cy + Math.sin(a1) * 6), hex('#2a2a32')); linea(cx, cy, Math.round(cx + Math.cos(a2) * 4), Math.round(cy + Math.sin(a2) * 4), hex('#2a2a32')); const a3 = t * 2; pset(Math.round(cx + Math.cos(a3) * 6), Math.round(cy + Math.sin(a3) * 6), hex('#c83a3a')); pset(cx, cy, hex('#c83a3a')); }
  { const cx = 191, cy = 85, a = t * 3.5; for (let k = 0; k < 3; k++) { const aa = a + k * 2.1; pset(Math.round(cx + Math.cos(aa) * 7), Math.round(cy + Math.sin(aa) * 1.6), hex('#5a5a66')); } pset(cx, cy, hex('#d84a3a')); }
  // las sillas detrás de los puestos
  for (const x of o.sillas ?? [148, 192]) j_silla(R, x, 130, 143, 164);
  // motas en el haz del ventanal
  for (let k = 0; k < 16; k++) { const x = Math.round(30 + h(k, 1, 831) * 110 + Math.sin(t * 0.4 + k) * 4), y = Math.round(100 + ((h(k, 2, 831) * 60 + t * (1.4 + h(k, 3, 831))) % 60)); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x + Math.round((y - 100) * 0.5), y, hex('#fff2d0')); }
  // la llama del flexo no: la lámpara de pie con su brillo, y el gato que se lava junto a la librería
  gato(R, 296, 172, t, { dir: -1 });
  return { suelo: 152, sueloPie: 170, puestos: o.sillas ?? [148, 192], mesa: [96, 143, 244], ventana: [14, 18, 116, 94], foto: [132, 22, 170, 56], libreria: [226, 52, 312, 111], libre: [[60, 92], [250, 286]] };
}

// lo fijo del salón general: estuco con la luz del ventanal, cornisa, arrimadero, el ventanal y su alféizar con macetas,
// la foto de 1979, el dibujo del castillo, la esfera del reloj, la lámpara de pie, el aparador con sus cosas, la librería,
// la tarima con la luz y la alfombra, y la sombra de la mesa
function j_salonFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, P = [j_C.p0, j_C.p1, j_C.p2, j_C.p3, j_C.p4];
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 66) * 0.8, (y - 56) * 1.25); B[y * 320 + x] = P[Math.max(0, Math.min(4, Math.floor(4.4 - d / 62 + j_u(x, y) * 0.9 + (h(x >> 1, y >> 1, 801) - 0.5) * 0.45)))]; }
  rect(0, 0, 319, 2, j_C.zocL); rect(0, 3, 319, 3, j_C.zocS); rect(0, 4, 319, 4, j_mezcla(P[1], j_C.zocD, 0.4));
  // el arrimadero de cuarterones con su moldura, y el rodapié
  rect(0, 80, 319, 82, j_C.zocL); rect(0, 83, 319, 83, j_C.zocS); rect(0, 84, 319, 111, j_C.zoc);
  for (let k = 0; k < 11; k++) { const x0 = 4 + k * 30, x1 = x0 + 24; rect(x0, 87, x1, 87, j_C.zocS); rect(x0, 87, x0, 103, j_C.zocS); rect(x0 + 1, 104, x1, 104, j_C.zocL); rect(x1, 88, x1, 104, j_C.zocL); rect(x0 + 2, 89, x1 - 2, 102, j_mezcla(j_C.zoc, j_C.zocS, 0.15)); }
  rect(0, 106, 319, 111, j_C.zocL); rect(0, 106, 319, 106, j_C.zocS); rect(0, 111, 319, 111, j_C.zocD);
  // la tarima, con la luz del ventanal que cae en diagonal, la alfombra y la sombra de la mesa
  j_tarima(R, 112, 179, 840, (x, y) => { const a = 14 + (y - 112) * 0.75, b = 120 + (y - 112) * 1.3; return x > a && x < b ? 0.55 - Math.abs(x - (a + b) / 2) / (b - a) * 0.6 : 0; });
  for (let y = 150; y <= 178; y++) { const f = (y - 150) / 28, a = Math.round(84 - f * 20), b = Math.round(256 + f * 20); for (let x = a; x <= b; x++) { const bor = y < 152 || y > 176 || x < a + 3 || x > b - 3, u = x - 160, v = (y - 164) * 3.2, rombo = (Math.abs(u) % 22 + Math.abs(v) % 22) < 11;
      B[y * 320 + x] = bor ? (y === 150 || y === 178 || x === a || x === b ? hex('#5a2a24') : hex('#c89a5a')) : rombo ? ((Math.abs(u) + Math.abs(v)) % 22 < 3 ? hex('#e8d8b8') : hex('#2e4a5a')) : hex('#8a3e34'); if (!bor && h(x, y, 841) < 0.08) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#000000'), 0.2); } }
  for (let x = 84; x < 258; x += 3) pset(x, 149, hex('#e8d8b8'));
  for (let y = 154; y <= 170; y++) for (let x = 92; x <= 248; x++) { const d = ((x - 170) / 80) ** 2 + ((y - 163) / 9) ** 2; if (d < 1 && j_u(x, y) < 0.7 - d * 0.5) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#1a0e08'), 0.45); }
  // el ventanal: marco, alféizar con macetas de crasas y una regadera
  rect(10, 14, 120, 98, j_C.zocL); rect(10, 14, 120, 14, j_C.zocS); rect(119, 15, 120, 98, j_C.zocS); rect(13, 17, 117, 17, j_C.zocS); rect(13, 17, 13, 95, j_C.zocS);
  rect(6, 96, 124, 100, j_C.zocL); rect(6, 96, 124, 96, hex('#ffffff')); rect(6, 101, 124, 102, j_C.zocD);
  for (const [x, c] of [[24, j_C.tiesto], [40, hex('#3a6a8a')], [96, j_C.tiesto]]) { rect(x - 4, 89, x + 4, 95, hex('#1c1222')); rect(x - 3, 90, x + 3, 95, c); rect(x - 3, 90, x + 3, 90, j_mezcla(c, hex('#ffffff'), 0.3)); for (let k = 0; k < 6; k++) { const a = -2.7 + k * 0.42; for (let d = 1; d < 5; d++) pset(Math.round(x + Math.cos(a) * d * 1.2), Math.round(88 + Math.sin(a) * d), k % 2 ? j_C.hojaL : j_C.hoja); } }
  { const x = 66; rect(x - 4, 90, x + 3, 95, hex('#1c1222')); rect(x - 3, 91, x + 2, 95, hex('#5a9a8a')); linea(x + 3, 92, x + 8, 88, hex('#5a9a8a')); rect(x - 2, 88, x + 1, 89, hex('#1c1222')); }
  // la barra de los visillos
  rect(2, 10, 128, 11, hex('#8a7a62')); disco(2, 10, 1.5, hex('#a8843a')); disco(128, 10, 1.5, hex('#a8843a'));
  // la foto antigua de los dos y el dibujo del castillo del nieto
  j_fotoAntigua(R, 132, 22, 38, 34); for (let y = 57; y < 60; y++) for (let x = 134; x < 172; x++) if (j_u(x, y) < 0.4) pset(x, y, j_mezcla(R.pget(x, y), hex('#000000'), 0.2));
  j_dibujoCastillo(R, 177, 25, 22, 22);
  // la esfera del reloj de pared
  disco(214, 34, 9, hex('#2a2a32')); disco(214, 34, 8, hex('#c89a3a')); disco(214, 34, 7, hex('#f8f4ea')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(214 + Math.cos(a) * 6), Math.round(34 + Math.sin(a) * 6), k % 3 ? hex('#b8b0a0') : hex('#2a2a32')); }
  // la lámpara de pie: pantalla de tela encendida, su luz en la pared, el pie y la base
  j_halo(R, 214, 62, 26, hex('#fff0c8'), 0.5, 1.2);
  poligono([[206, 66], [209, 52], [219, 52], [222, 66]], hex('#e8d8b0')); linea(209, 52, 219, 52, hex('#f8ecd0')); for (let y = 54; y < 66; y += 3) linea(208, y, 220, y, hex('#d8c498')); rect(205, 66, 223, 66, hex('#b8a478'));
  rect(213, 67, 214, 109, hex('#3a3a42')); rect(213, 67, 213, 109, hex('#6a6a74')); rect(208, 109, 219, 111, hex('#2a2a32')); rect(209, 109, 218, 109, hex('#5a5a64'));
  // el aparador con sus cosas (detrás de la mesa y de ellos)
  { const x0 = 124, x1 = 204; rect(x0, 90, x1, 92, j_C.nogalD); rect(x0 + 1, 90, x1 - 1, 90, j_C.nogalB); rect(x0 + 1, 93, x1 - 1, 107, j_C.nogal);
    for (let k = 0; k < 3; k++) { const a = x0 + 3 + k * 26, b = a + 22; rect(a, 95, b, 105, j_C.nogalS); rect(a + 1, 96, b - 1, 104, j_C.nogalL); for (let i = 0; i < 4; i++) linea(a + 2, 97 + i * 2, b - 2, 97 + i * 2 + (i % 2), j_C.nogal); disco(k === 1 ? a + 11 : k ? a + 3 : b - 3, 100, 1, hex('#e8c060')); }
    rect(x0 + 2, 108, x0 + 3, 111, j_C.nogalD); rect(x1 - 3, 108, x1 - 2, 111, j_C.nogalD);
    // el jarrón con flores, los juegos de mesa apilados, el tocadiscos con su disco y una foto pequeña
    rect(131, 80, 137, 89, hex('#1c1222')); rect(132, 81, 136, 89, hex('#3a7a9a')); rect(132, 81, 132, 89, hex('#6aaac8'));
    for (let k = 0; k < 7; k++) { const fx = 128 + k * 2 + (k % 2), fy = 70 + (k * 5) % 9; linea(134, 80, fx, fy, j_C.hojaS); disco(fx, fy, 1.5, [hex('#f8f0e8'), hex('#e84a6a'), hex('#f8d040'), hex('#e87a3a')][k % 4]); pset(fx, fy, hex('#c88a20')); }
    for (const [y, w, c] of [[86, 22, hex('#2a6ab8')], [82, 20, hex('#c83a3a')], [78, 18, hex('#e8c040')]]) { rect(144, y, 144 + w, y + 3, hex('#1c1222')); rect(145, y + 1, 143 + w, y + 2, c); rect(145, y + 1, 150, y + 2, hex('#f6f2ea')); }
    rect(178, 86, 204, 89, hex('#1c1222')); rect(179, 86, 203, 88, hex('#a8743c')); rect(179, 86, 203, 86, hex('#c8945a')); disco(191, 85, 7.5, hex('#1a1a20')); for (let k = 3; k < 8; k += 2) for (let a = 0; a < 6.28; a += 0.3) pset(Math.round(191 + Math.cos(a) * k), Math.round(85 + Math.sin(a) * k * 0.22), hex('#2a2a34')); rect(190, 84, 192, 85, hex('#d84a3a'));
    linea(201, 83, 197, 86, hex('#c8c8d0')); rect(200, 81, 202, 83, hex('#8a8a94'));
    rect(168, 80, 175, 89, hex('#c8a038')); rect(169, 81, 174, 88, hex('#e8dcc0')); rect(170, 82, 173, 86, hex('#8ab0c8')); rect(170, 85, 173, 86, hex('#6a9a5a')); }
  // la librería con el poto que cuelga
  j_libreria(R, 226, 52, 312, 111);
  { rect(232, 44, 244, 52, hex('#1c1222')); rect(233, 45, 243, 52, hex('#e8e4d8')); rect(233, 45, 243, 45, hex('#ffffff'));
    for (let k = 0; k < 5; k++) { let px = 236 + k * 2, py = 46; for (let i = 0; i < 18 + k * 8; i++) { py += 1; px += Math.round(Math.sin(i * 0.4 + k) * 0.7) - (k < 2 ? 0.3 : 0); if (py > 52 && px > 226 && px < 232) px = 226; if (i % 3 === 0) { pset(px, py, j_C.hojaL); pset(px - 1, py, j_C.hoja); pset(px, py + 1, j_C.hojaS); } else pset(px, py, j_C.hojaS); } } }
  // el sillón de lectura de terciopelo mostaza con su manta de punto, y la mesita con un libro y unas gafas
  { const x0 = 16, x1 = 66; rect(x0, 112, x1, 140, hex('#1c1222')); rect(x0 + 1, 113, x1 - 1, 139, hex('#c89a30')); for (let x = x0 + 4; x < x1 - 3; x += 6) rect(x, 114, x, 126, hex('#a87a20'));
    rect(x0 + 1, 113, x1 - 1, 114, hex('#e0b850')); rect(x0 - 3, 124, x0 + 6, 150, hex('#1c1222')); rect(x1 - 6, 124, x1 + 3, 150, hex('#1c1222')); rect(x0 - 2, 125, x0 + 5, 149, hex('#b8882a')); rect(x1 - 5, 125, x1 + 2, 149, hex('#b8882a')); rect(x0 - 2, 125, x0 + 5, 126, hex('#e0b850')); rect(x1 - 5, 125, x1 + 2, 126, hex('#e0b850'));
    rect(x0 + 6, 132, x1 - 6, 146, hex('#1c1222')); rect(x0 + 7, 133, x1 - 7, 145, hex('#d8aa3a')); rect(x0 + 7, 133, x1 - 7, 134, hex('#f0c860')); rect(x0 + 7, 146, x1 - 7, 150, hex('#a87a20'));
    for (let y = 123; y < 150; y++) { const xa = x1 - 7 + Math.round(Math.sin(y * 0.3) * 0.6), xb = x1 + 4 - (y > 140 ? 0 : 1); for (let x = xa; x <= xb; x++) pset(x, y, x === xa || x === xb ? hex('#2a4a6a') : ((y >> 1) % 3 === 0 ? hex('#e8e0d0') : ((x + y) % 2 ? hex('#4a7a9a') : hex('#3a6a8a')))); }
    for (let x = x1 - 7; x <= x1 + 4; x += 2) pset(x, 150, hex('#e8e0d0'));
    for (const lx of [x0 - 1, x1 - 1]) rect(lx, 150, lx + 1, 154, hex('#3a2418'));
    rect(70, 128, 88, 130, j_C.nogalD); rect(71, 128, 87, 128, j_C.nogalB); rect(72, 131, 73, 152, j_C.nogalD); rect(84, 131, 85, 152, j_C.nogalD); rect(73, 141, 84, 142, j_C.nogalS);
    rect(73, 125, 83, 127, hex('#1c1222')); rect(74, 125, 82, 126, hex('#3a8a5a')); rect(74, 125, 75, 126, hex('#f6f2ea')); disco(78, 123, 1.2, hex('#3a3a4a')); disco(81, 123, 1.2, hex('#3a3a4a')); }
  for (let y = 150; y <= 156; y++) for (let x = 10; x <= 90; x++) { const d = ((x - 46) / 40) ** 2 + ((y - 153) / 3.5) ** 2; if (d < 1 && j_u(x, y) < 0.6 - d * 0.4) pset(x, y, j_mezcla(R.pget(x, y), hex('#1a0e08'), 0.4)); }
  // la sombra de la librería y del aparador en la tarima
  for (let x = 226; x < 316; x++) if (j_u(x, 112) < 0.6) pset(x, 112, j_mezcla(R.pget(x, 112), hex('#000000'), 0.35));
}

// la mesa de nogal del salón general por delante de ellos (tablero con veta y la luz del ventanal, canto, faldón con
// cajón, patas torneadas) y sus cosas: el portátil de Roberta, su taza, el puzle a medias, el portátil de Ken, unas gafas,
// la planta y una frutera; las tazas humean
function j_salonDelante(R, t, o) {
  const { rect, pset, disco, linea } = R;
  j_delante(R, 'salon-g-delante', () => {
    const x0 = 96, x1 = 244;
    for (let y = 143; y <= 147; y++) for (let x = x0; x <= x1; x++) { let c = (y === 143) ? j_C.nogalS : h(x >> 2, y, 850) < 0.25 ? j_C.nogalS : y % 2 ? j_C.nogal : j_C.nogalL; if (x < 150 && j_u(x, y) < 0.35 - (x - x0) / 160) c = j_mezcla(c, j_C.nogalB, 0.6); pset(x, y, c); }
    rect(x0 - 1, 148, x1 + 1, 150, j_C.nogalB); rect(x0 - 1, 150, x1 + 1, 150, j_C.nogalL); rect(x0 - 1, 147, x0 - 1, 150, j_C.nogalD); rect(x1 + 1, 147, x1 + 1, 150, j_C.nogalD);
    rect(x0 + 2, 151, x1 - 2, 156, j_C.nogal); rect(x0 + 2, 151, x1 - 2, 151, j_C.nogalS); rect(x0 + 2, 156, x1 - 2, 156, j_C.nogalD); rect(150, 152, 190, 155, j_C.nogalL); rect(167, 153, 173, 153, hex('#e8c060'));
    for (const lx of [x0 + 3, x1 - 7]) { rect(lx, 157, lx + 4, 172, j_C.nogalD); rect(lx + 1, 157, lx + 3, 171, j_C.nogal); rect(lx + 1, 157, lx + 1, 171, j_C.nogalL); rect(lx, 162, lx + 4, 163, j_C.nogalS); rect(lx + 1, 172, lx + 3, 174, j_C.nogalD); }
    // el portátil de Roberta (la tapa, de espaldas, con una pegatina de una estrella) y su taza
    rect(110, 134, 130, 145, hex('#1c1222')); rect(111, 135, 129, 144, hex('#c4c8d2')); rect(111, 135, 111, 144, hex('#e4e8ee')); rect(112, 145, 131, 146, hex('#8e94a4')); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 1.2566; linea(120, 139, Math.round(120 + Math.cos(a) * 3), Math.round(139 + Math.sin(a) * 3), hex('#e8b830')); }
    rect(133, 139, 139, 146, hex('#1c1222')); rect(134, 140, 138, 146, hex('#d84a3a')); rect(134, 140, 138, 140, hex('#5a3a2a')); rect(139, 141, 141, 144, hex('#1c1222')); pset(140, 142, hex('#d84a3a'));
    // el puzle a medias: el marco hecho, piezas sueltas y la caja
    rect(156, 144, 184, 147, hex('#1c1222')); for (let y = 144; y <= 147; y++) for (let x = 157; x <= 183; x++) { const borde = y === 144 || y === 147 || x < 159 || x > 181, hecho = borde || (x < 168 && y > 145); if (hecho) pset(x, y, y < 146 ? hex('#5aa0d8') : hex('#5aa84a')); else pset(x, y, ((x + y) & 1) ? hex('#2a2018') : hex('#3a2c20')); }
    rect(170, 145, 172, 145, hex('#d8d0c0')); for (const [px, py, c] of [[188, 145, hex('#5aa0d8')], [192, 146, hex('#9a9aa8')], [153, 146, hex('#5aa84a')]]) { rect(px, py, px + 2, py + 1, c); pset(px + 1, py - 1, c); }
    // el portátil de Ken, unas gafas de leer, la frutera y la planta
    rect(204, 134, 224, 145, hex('#1c1222')); rect(205, 135, 223, 144, hex('#4a4e5a')); rect(205, 135, 205, 144, hex('#6a6e7a')); rect(206, 145, 225, 146, hex('#2e3038')); rect(212, 138, 216, 141, hex('#5a8ad8')); pset(214, 137, hex('#5a8ad8'));
    disco(196, 146, 1.4, hex('#3a3a4a')); disco(200, 146, 1.4, hex('#3a3a4a')); pset(198, 146, hex('#3a3a4a'));
    rect(226, 142, 238, 146, hex('#1c1222')); rect(227, 143, 237, 145, hex('#e8e0d0')); disco(229, 141, 2.5, hex('#e8c040')); disco(233, 140, 2.5, hex('#d84a3a')); disco(236, 141, 2, hex('#7ab84a')); pset(232, 139, hex('#ffd0c0'));
    rect(98, 138, 106, 146, hex('#1c1222')); rect(99, 139, 105, 146, j_C.tiesto); rect(99, 139, 105, 139, hex('#e08a5a')); for (let k = 0; k < 7; k++) { const a = -2.9 + k * 0.42; for (let d = 1; d < 9; d++) pset(Math.round(102 + Math.cos(a) * d * 0.9), Math.round(137 + Math.sin(a) * d - d * d / 30), k % 2 ? j_C.hojaL : j_C.hoja); }
  });
  // el vapor de las tazas
  for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; for (let i = 0; i < 3; i++) { const y = Math.round(138 - ph * 12 - i * 2); pset(Math.round(136 + Math.sin(ph * 6 + k * 2 + i) * 1.4), y, ph < 0.6 ? hex('#f4f0ea') : hex('#cfc8bc')); } }
  // la luz de la pantalla de Ken en el borde de la tapa
  if (Math.sin(t * 0.7) > 0) pset(224, 135, hex('#a8d8ff'));
  return { mesa: [96, 143, 244] };
}

// lo fijo del salón de cerca: estuco con la luz, el bastidor del ventanal, la foto grande de 1979, el paisaje de la
// sierra, el castillo del nieto, el aplique, el arrimadero y la librería con las ocho cajas
function j_salonMesaFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, P = [j_C.p0, j_C.p1, j_C.p2, j_C.p3, j_C.p4];
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 10) * 0.7, (y - 60) * 1.2); B[y * 320 + x] = P[Math.max(0, Math.min(4, Math.floor(4.5 - d / 80 + j_u(x, y) * 0.9 + (h(x >> 1, y >> 1, 802) - 0.5) * 0.45)))]; }
  rect(0, 0, 319, 2, j_C.zocL); rect(0, 3, 319, 3, j_C.zocS);
  rect(0, 92, 319, 94, j_C.zocL); rect(0, 95, 319, 95, j_C.zocS); rect(0, 96, 319, 127, j_C.zoc);
  for (let k = 0; k < 9; k++) { const x0 = 50 + k * 38, x1 = x0 + 32; rect(x0, 99, x1, 99, j_C.zocS); rect(x0, 99, x0, 122, j_C.zocS); rect(x0 + 1, 123, x1, 123, j_C.zocL); rect(x1, 100, x1, 123, j_C.zocL); rect(x0 + 2, 101, x1 - 2, 121, j_mezcla(j_C.zoc, j_C.zocS, 0.15)); }
  // el bastidor del ventanal
  rect(43, 6, 52, 118, j_C.zocL); rect(51, 6, 52, 118, j_C.zocS); rect(43, 6, 43, 118, j_C.zocS); rect(0, 108, 50, 112, j_C.zocL); rect(0, 113, 50, 114, j_C.zocD); rect(0, 4, 56, 5, hex('#8a7a62'));
  // la foto antigua, grande, con su sombra
  for (let y = 24; y < 72; y++) for (let x = 135; x < 192; x++) if (j_u(x, y) < 0.45) pset(x, y, j_mezcla(R.pget(x, y), hex('#000000'), 0.22));
  j_fotoAntigua(R, 132, 22, 56, 46);
  // el paisaje de la sierra (pinos, la montaña nevada, un lago) y el castillo del nieto
  { const x0 = 88, y0 = 30, w = 32, hh = 24; rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh + 1, hex('#1c1222')); rect(x0, y0, x0 + w, y0 + hh, hex('#c8a038')); rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + hh - 2, hex('#8ac0e8'));
    poligono([[x0 + 2, y0 + 17], [x0 + 14, y0 + 6], [x0 + 24, y0 + 14], [x0 + 30, y0 + 11], [x0 + 30, y0 + 18], [x0 + 2, y0 + 18]], hex('#7a8aa8')); poligono([[x0 + 11, y0 + 9], [x0 + 14, y0 + 6], [x0 + 17, y0 + 9]], hex('#f2f6fa'));
    rect(x0 + 2, y0 + 17, x0 + w - 2, y0 + hh - 2, hex('#3a6a4a')); rect(x0 + 12, y0 + 19, x0 + 24, y0 + 20, hex('#5aa0d8')); for (let k = 0; k < 5; k++) { const px = x0 + 4 + k * 6; poligono([[px - 2, y0 + 19], [px, y0 + 12 + (k % 2) * 2], [px + 3, y0 + 19]], hex('#1e4a2e')); } }
  j_dibujoCastillo(R, 200, 28, 26, 26);
  // el aplique de pared con su luz
  j_halo(R, 72, 40, 18, hex('#fff0c8'), 0.45, 1.3); rect(70, 44, 74, 50, hex('#a8843a')); poligono([[66, 44], [69, 34], [75, 34], [78, 44]], hex('#f2e4c0')); linea(69, 34, 75, 34, hex('#fff8e0'));
  // la librería, que sigue fuera de cuadro
  j_libreria(R, 254, 54, 330, 127);
  { rect(258, 46, 270, 54, hex('#1c1222')); rect(259, 47, 269, 54, hex('#c0663a')); for (let k = 0; k < 9; k++) { const a = -2.9 + k * 0.34; for (let d = 1; d < 10; d++) pset(Math.round(264 + Math.cos(a) * d), Math.round(46 + Math.sin(a) * d * 0.7), k % 2 ? j_C.hojaL : j_C.hoja); } }
}

// la mesa del salón de cerca, por delante de ellos (con los pies en y 137 se les ven la cabeza y los hombros): el tablero de
// nogal con la luz del ventanal, el puzle a medias con su caja, la planta, la tableta de Roberta en la que se dibuja la
// cueva (o.dibujo 0–1; devuelve la punta del lápiz), las tazas que humean, las galletas, las gafas, el teclado de Ken, su
// ratón y su monitor (código que corre y la cueva en 3D que gira; o.render 0–1: de alambre a sombreada), el móvil
function j_salonMesaDelante(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  j_delante(R, 'salon-m-delante', () => {
    for (let y = 128; y <= 168; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 128) / 14), u = x * 0.5 + Math.sin(y * 0.7 + tabla * 3) * 3 + tabla * 40;
      let c = (y - 128) % 14 === 0 && y > 128 ? j_C.nogalD : y === 128 ? j_C.nogalS : (Math.floor(u / 3) % 5 === 0 && h(x >> 3, y, 851) < 0.6) ? j_C.nogalS : (h(x >> 1, y, 852) < 0.1 ? j_C.nogalL : j_C.nogal);
      const luz = 0.62 - x / 220 - Math.abs(y - 150) / 80; if (luz > 0 && j_u(x, y) < luz) c = j_mezcla(c, j_C.nogalB, 0.55); pset(x, y, c); }
    rect(0, 169, 319, 172, j_C.nogalB); rect(0, 169, 319, 169, j_C.nogalL); rect(0, 173, 319, 173, j_C.nogalD); rect(0, 174, 319, 179, j_C.nogalS);
    for (let x = 0; x < 320; x += 4) rect(x, 176, x + 1, 176, j_C.nogalD);
    // el puzle a medias (un castillo bajo el cielo) y su caja
    { const x0 = 12, y0 = 142, x1 = 84, y1 = 164; poligono([[x0 + 4, y0], [x1 - 2, y0], [x1, y1], [x0, y1]], hex('#1c1222'));
      for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const f = (y - y0) / (y1 - y0), xa = x0 + 4 - f * 4, xb = x1 - 2 + f * 2; if (x <= xa || x >= xb) continue; const borde = y < y0 + 3 || y > y1 - 3 || x < xa + 3 || x > xb - 3, dentro = x < x0 + 40 && y > y0 + 6;
        if (!(borde || dentro)) { pset(x, y, ((x >> 1) + (y >> 1)) & 1 ? hex('#3a2c20') : hex('#4a3a2a')); continue; }
        let c = y < y0 + 10 ? (h(x >> 2, y >> 2, 853) < 0.2 ? hex('#ffffff') : hex('#6aaee8')) : y < y0 + 15 ? hex('#9a9aa8') : hex('#5aa84a'); if (y >= y0 + 9 && y < y0 + 15 && x > x0 + 14 && x < x0 + 30) c = (x % 4 === 0) ? hex('#6a6a7a') : hex('#b8b8c8'); if (y > y0 + 6 && y < y0 + 10 && (x === x0 + 16 || x === x0 + 27)) c = hex('#d84a4a');
        if ((x - x0) % 6 === 0 || (y - y0) % 5 === 0) c = j_mezcla(c, hex('#000000'), 0.25); pset(x, y, c); }
      for (const [px, py, c] of [[56, 152, hex('#6aaee8')], [64, 156, hex('#9a9aa8')], [72, 150, hex('#5aa84a')], [88, 160, hex('#6aaee8')], [92, 152, hex('#5aa84a')]]) { rect(px - 2, py - 2, px + 2, py + 1, hex('#1c1222')); rect(px - 1, py - 1, px + 1, py, c); pset(px, py - 2, c); pset(px + 2, py, c); }
      poligono([[2, 132], [40, 130], [44, 140], [4, 142]], hex('#1c1222')); poligono([[3, 133], [39, 131], [42, 139], [5, 141]], hex('#2a4fa8')); poligono([[8, 134], [24, 133], [26, 138], [10, 139]], hex('#f2f6fa')); rect(14, 135, 18, 137, hex('#9a9aa8')); pset(16, 134, hex('#d84a4a')); }
    // la planta de hojas grandes, al fondo a la izquierda
    { rect(56, 120, 74, 133, hex('#1c1222')); rect(57, 121, 73, 133, hex('#e8e4d8')); rect(57, 121, 73, 122, hex('#ffffff')); rect(70, 123, 72, 133, hex('#c8c2b4'));
      for (const [a, l] of [[-2.6, 18], [-2.1, 22], [-1.6, 24], [-1.1, 21], [-0.6, 17], [-1.9, 14], [-1.3, 15]]) { const ex = 65 + Math.cos(a) * l, ey = 121 + Math.sin(a) * l; linea(65, 121, Math.round(ex), Math.round(ey), j_C.hojaS); disco(Math.round(ex), Math.round(ey), 3.5, j_C.hojaS); disco(Math.round(ex), Math.round(ey) - 1, 3, j_C.hoja); pset(Math.round(ex) - 1, Math.round(ey) - 2, j_C.hojaL); linea(Math.round(ex - Math.cos(a) * 3), Math.round(ey - Math.sin(a) * 3), Math.round(ex + Math.cos(a) * 2), Math.round(ey + Math.sin(a) * 2), j_C.hojaL); } }
    // la tableta de Roberta (el marco; la pantalla la pinta cada fotograma)
    poligono([[100, 138], [148, 138], [152, 161], [96, 161]], hex('#1c1222')); poligono([[101, 139], [147, 139], [150, 160], [97, 160]], hex('#3a3e48'));
    // las tazas, las galletas, las gafas
    for (const [mx, c] of [[160, hex('#d84a3a')], [170, hex('#3a7aaa')]]) { rect(mx - 4, 134, mx + 4, 144, hex('#1c1222')); rect(mx - 3, 135, mx + 3, 144, c); rect(mx - 3, 135, mx + 3, 136, hex('#4a2a1a')); rect(mx - 3, 137, mx - 2, 143, j_mezcla(c, hex('#ffffff'), 0.3)); rect(mx + 4, 137, mx + 6, 141, hex('#1c1222')); pset(mx + 5, 139, c); }
    disco(166, 157, 8, hex('#1c1222')); disco(166, 157, 7, hex('#f2f0ea')); disco(166, 157, 5, hex('#e2ded4')); for (const [cx, cy] of [[163, 155], [168, 154], [169, 159], [163, 159]]) { disco(cx, cy, 2.2, hex('#a86a2a')); disco(cx, cy, 1.6, hex('#d8a050')); pset(cx, cy, hex('#4a2a1a')); }
    disco(150, 166, 3, hex('#1c1222')); disco(158, 166, 3, hex('#1c1222')); disco(150, 166, 2, hex('#a8c8e0')); disco(158, 166, 2, hex('#a8c8e0')); linea(152, 165, 156, 165, hex('#1c1222')); linea(147, 165, 142, 162, hex('#1c1222'));
    // el teclado y el ratón de Ken
    poligono([[180, 144], [216, 144], [218, 152], [178, 152]], hex('#1c1222')); poligono([[181, 145], [215, 145], [217, 151], [179, 151]], hex('#d8dae2'));
    for (let j = 0; j < 3; j++) for (let i = 0; i < 12; i++) pset(181 + i * 3 + j, 146 + j * 2, hex('#9a9eac')); rect(190, 151, 206, 151, hex('#9a9eac'));
    disco(224, 150, 3, hex('#1c1222')); disco(224, 150, 2, hex('#e8e8ee')); pset(224, 148, hex('#9a9eac'));
    // el monitor de Ken (pie, cuello y marco; la pantalla la pinta cada fotograma)
    rect(240, 128, 258, 133, hex('#1c1222')); rect(241, 129, 257, 132, hex('#5a5e6a')); rect(241, 129, 257, 129, hex('#8a8e9a')); rect(246, 120, 252, 128, hex('#1c1222')); rect(247, 120, 251, 128, hex('#4a4e5a'));
    rect(223, 87, 275, 123, hex('#1c1222')); rect(224, 88, 274, 122, hex('#2a2c34')); rect(224, 88, 274, 88, hex('#4a4e5a'));
    // el móvil, boca arriba
    rect(232, 152, 246, 160, hex('#1c1222')); rect(233, 153, 245, 159, hex('#24262e'));
  });
  // la tableta: la cueva que Roberta va dibujando (o.dibujo 0–1), y la punta del lápiz
  const d = o.dibujo ?? 0.5; let lapiz = [124, 149];
  { const X = (u) => Math.round(102 + u * 44), Y = (v) => Math.round(141 + v * 17);
    for (let y = 141; y <= 158; y++) for (let x = 100 + Math.round((y - 141) * 0.12); x <= 148 - Math.round((141 - y) * 0.12); x++) pset(x, y, j_u(x, y) < (y - 141) / 40 ? hex('#e4eaf0') : hex('#f4f8fb'));
    const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([X(u), Y(0.08 + 0.12 * Math.abs(Math.sin(u * 9)) + u * 0.02)]); }
    const n = Math.floor(Math.min(1, d / 0.45) * pts.length);
    for (let i = 1; i < n; i++) linea(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], hex('#3a3a5a'));
    for (let k = 0; k < 6; k++) { const u = 0.1 + k * 0.16; if (d > 0.3 + k * 0.05) { const sx = X(u), sy = pts[Math.round(u * 40)][1]; linea(sx, sy, sx + 1, sy + 3 + (k % 3), hex('#3a3a5a')); } }   // las estalactitas
    if (d > 0.62) { const u = Math.min(1, (d - 0.62) / 0.15); for (let x = X(0.05); x < X(0.05 + u * 0.9); x++) if (x % 3) pset(x, Y(0.78) + (x % 6 < 3 ? 0 : 1), hex('#3a7ac8')); }   // el río
    if (d > 0.8) { const lx = X(0.3), ly = Y(0.6); rect(lx - 1, ly - 3, lx + 1, ly, hex('#a87a18')); pset(lx, ly - 4, hex('#f8c040')); if (d > 0.9) pset(lx, ly - 5, hex('#ffe890')); }   // la lámpara
    for (let k = 0; k < 4; k++) if (d > 0.88 + k * 0.03) { const sx = X(0.6 + k * 0.08), sy = Y(0.95); linea(sx, sy, sx + 1, sy - 3 - k % 2, hex('#3a3a5a')); }   // las estalagmitas
    const idx = Math.min(pts.length - 1, Math.max(0, n - 1)); lapiz = d < 0.45 ? pts[idx] : d < 0.62 ? [X(0.1 + (d - 0.45) * 5), Y(0.4)] : d < 0.8 ? [X(0.05 + Math.min(1, (d - 0.62) / 0.15) * 0.9), Y(0.78)] : [X(0.7), Y(0.9)];
    for (let i = 0; i < 6; i++) if (i % 3 !== 2) pset(104 + i, 152 - i, hex('#ffffff')); }
  // el monitor de Ken: código de colores que corre a la izquierda y la cueva en 3D que gira a la derecha
  { const x0 = 226, y0 = 90, x1 = 272, y1 = 120, rend = o.render ?? 0.6; R.recorte([x0, y0, x1, y1]);
    j_rc(R, x0, y0, x1, y1, hex('#141824')); j_rc(R, x0, y0, x1, y0 + 2, hex('#2a3044'));
    const off = Math.floor(t * 3); for (let l = 0; l < 9; l++) { const k = l + off, ind = (h(k, 1, 854) * 3 | 0) * 2, w = 4 + (h(k, 2, 854) * 12 | 0), y = y0 + 4 + l * 3; linea(x0 + 2 + ind, y, x0 + 2 + ind + w, y, [hex('#8ad0ff'), hex('#f0a0e0'), hex('#a8f0a0'), hex('#f8d870')][k % 4]); if (h(k, 3, 854) < 0.5) linea(x0 + 4 + ind + w, y, x0 + 6 + ind + w + (h(k, 4, 854) * 5 | 0), y, hex('#c8d0e0')); }
    if (Math.floor(t * 2) % 2) linea(x0 + 3, y0 + 4 + 8 * 3 + 1, x0 + 5, y0 + 4 + 8 * 3 + 1, hex('#ffffff'));
    const cx = 260, cy = 106, a = t * 0.7; j_rc(R, 249, y0 + 3, x1 - 1, y1 - 1, hex('#0e1020'));
    for (let k = 0; k < 7; k++) { const ang = a + k * 0.9, r = 9, px = Math.round(cx + Math.cos(ang) * r), pz = Math.sin(ang), top = cy - 9 + Math.round(pz * 2), largo = 5 + (k % 3) * 2, c = rend > 0.5 ? j_mezcla(hex('#4a3a9a'), hex('#9a8ae8'), (pz + 1) / 2) : hex('#6ad8ff');
      if (rend > 0.5) poligono([[px - 2, top], [px + 2, top], [px, top + largo]], c); else { linea(px - 2, top, px, top + largo, c); linea(px + 2, top, px, top + largo, c); } }
    if (rend > 0.5) { for (let i = -10; i <= 10; i++) pset(cx + i, cy + 8 + Math.round(Math.sin(i * 0.6 + t * 3) * 0.6), hex('#22b6c8')); disco(cx, cy + 3, 2, hex('#f8c040')); pset(cx, cy + 1, hex('#ffffff')); }
    else { for (let i = -10; i <= 10; i += 2) pset(cx + i, cy + 8, hex('#6ad8ff')); linea(cx - 11, cy + 9, cx + 11, cy + 9, hex('#2a6a8a')); }
    R.recorte(null); for (let i = 0; i < 8; i++) if (i % 4 !== 3) pset(x0 + 30 + i, y0 + 10 - i, hex('#3a4058')); }
  // el móvil, que se enciende con un aviso cada pocos segundos
  if ((t % 7) < 2.2) { rect(234, 154, 244, 158, hex('#4a7ad0')); rect(235, 155, 237, 157, hex('#ffffff')); rect(239, 155, 243, 155, hex('#c8dcff')); rect(239, 157, 242, 157, hex('#c8dcff')); }
  // el vapor de las tazas
  for (const mx of [160, 170]) for (let k = 0; k < 3; k++) { const ph = (t * 0.55 + k / 3 + mx * 0.01) % 1; for (let i = 0; i < 4; i++) { const y = Math.round(132 - ph * 16 - i * 2); pset(Math.round(mx + Math.sin(ph * 6 + k * 2 + i * 0.8) * 1.6), y, ph < 0.6 ? hex('#f4f0ea') : hex('#cfc8bc')); } }
  return { lapiz, tableta: [98, 138, 150, 160], pantalla: [226, 90, 272, 120] };
}

// el atardecer de un barrio visto por una ventana (se pinta entero en cada fotograma, recortado al cristal): cielo
// tramado de la tarde, el sol que se pone, nubes de tres tonos a dos velocidades, la primera estrella, un avión que
// parpadea, las colinas, los tejados con ventanas que se encienden, árboles, una farola, el tendido con pájaros
function j_ventanaTarde(R, t, x0, y0, x1, y1) {
  const { pset, disco, poligono, linea } = R, W = x1 - x0, Hh = y1 - y0, hor = Math.round(y0 + Hh * 0.74);
  R.recorte([x0, y0, x1, y1]);
  j_cielo(R, x0, y0, x1, hor, [[0, hex('#24225a')], [0.28, hex('#43397a')], [0.52, hex('#9a4e7a')], [0.72, hex('#dc765a')], [0.88, hex('#f6b468')], [1, hex('#fcdc9c')]]);
  { const sx = Math.round(x0 + W * 0.68), sy = hor - 1; j_halo(R, sx, sy, 16, hex('#fff0b0'), 0.55); disco(sx, sy, 5, hex('#ffe8a0')); disco(sx, sy, 4, hex('#fff6d0')); }
  for (let k = 0; k < 3; k++) { const tw = Math.sin(t * (1.5 + k) + k * 2); if (tw > -0.3) pset(x0 + 6 + k * 19 + (k * 7) % 5, y0 + 3 + k * 2, tw > 0.5 ? hex('#ffffff') : hex('#b8b0d8')); }
  const NUB = [hex('#7a4476'), hex('#d8807a'), hex('#ffd4a4')];
  for (let k = 0; k < 3; k++) { const v = [1.4, 2.6, 1.9][k], w = [20, 14, 16][k], span = W + 50, x = x0 - 25 + ((h(k, 1, 860) * span + t * v) % span), y = y0 + 12 + k * Hh * 0.12; j_nube(R, x, y, w, k + 5, NUB); }
  { const u = ((t + 4) % 15) / 15, ax = Math.round(x0 - 4 + u * (W + 8)), ay = Math.round(y0 + 9 - u * 4); pset(ax, ay, hex('#2a2440')); pset(ax + 1, ay, hex('#2a2440')); if (Math.floor(t * 2.5) % 2) pset(ax + 2, ay, hex('#ff4a4a')); }
  for (let x = x0; x <= x1; x++) { const yc = hor - 4 - Math.round(3 * Math.sin(x * 0.05 + 2) + 1.5 * Math.sin(x * 0.19)); linea(x, yc, x, hor + 1, hex('#5a3a6a')); }
  // los tejados de la calle de enfrente, con sus ventanas
  const casas = [[0, 18, 7], [0.24, 16, 5], [0.48, 20, 8], [0.76, 18, 6]];
  casas.forEach(([f, w, al], k) => { const hx = Math.round(x0 + f * W), hy = hor - al + 6; poligono([[hx - 2, hy], [hx + w / 2, hy - 7], [hx + w + 2, hy]], hex('#2a1e36')); linea(hx - 2, hy, hx + w / 2, hy - 7, hex('#4a3050')); j_rc(R, hx, hy, hx + w, y1, hex('#3a2c4a'));
    for (let i = 0; i < 2; i++) { const wx = hx + 3 + i * (w - 9), on = h(k, i + Math.floor(t / 4 + k * 0.3) * 3, 861) < 0.6; j_rc(R, wx, hy + 3, wx + 3, hy + 6, on ? hex('#f8c860') : hex('#24203a')); if (on) pset(wx, hy + 3, hex('#fff0b0')); } });
  // árboles oscuros, la farola encendida y el tendido con dos pájaros posados
  for (const [f, r] of [[0.15, 6], [0.62, 5], [0.95, 7]]) { const tx = Math.round(x0 + f * W), ty = hor + 2; disco(tx, ty, r, hex('#1e1a2e')); disco(tx - 2, ty - 2, r - 2, hex('#2a2440')); }
  { const lx = Math.round(x0 + W * 0.4); linea(lx, hor - 6, lx, y1, hex('#1a1626')); pset(lx + 1, hor - 6, hex('#1a1626')); j_halo(R, lx + 2, hor - 5, 7, hex('#ffe0a0'), 0.5); pset(lx + 2, hor - 5, hex('#fff6d0')); }
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / W; pset(x, Math.round(y0 + Hh * 0.5 + 4 * Math.sin(u * Math.PI)), hex('#2a2238')); }
  for (let k = 0; k < 2; k++) { const bx = Math.round(x0 + W * (0.3 + k * 0.12)), by = Math.round(y0 + Hh * 0.5 + 4 * Math.sin((0.3 + k * 0.12) * Math.PI)) - 1, mira = Math.sin(t * 0.8 + k * 3) > 0.6 ? 1 : 0; pset(bx, by, hex('#1a1626')); pset(bx + 1, by, hex('#1a1626')); pset(bx + (k ? -mira : 1 + mira), by - 1, hex('#1a1626')); }
  R.recorte(null);
}

// una persiana veneciana bajada hasta yb (lamas con luz y sombra) y su cordón que se balancea
function j_persiana(R, t, x0, y0, x1, yb) {
  const { rect, pset, linea } = R;
  for (let y = y0; y <= yb; y += 3) { rect(x0, y, x1, y + 1, hex('#e8e4dc')); rect(x0, y, x1, y, hex('#fbf8f2')); rect(x0, y + 2, x1, y + 2, j_mezcla(hex('#b8b0a4'), hex('#000000'), 0.1)); }
  rect(x0 - 1, yb + 1, x1 + 1, yb + 2, hex('#c8c0b4')); rect(x0 - 1, y0 - 2, x1 + 1, y0 - 1, hex('#f2eee6'));
  const cx = x1 - 5, m = Math.sin(t * 1.1) * 2; linea(cx, yb + 2, Math.round(cx + m), yb + 22, hex('#d8d4cc')); rect(Math.round(cx + m) - 1, yb + 22, Math.round(cx + m) + 1, yb + 25, hex('#f2eee6'));
}

// el mapa dibujado a mano en una hoja grande pegada con celo, en el rectángulo dado: salas a lápiz con sus números,
// pasillos, el lago, árboles, el castillo, calaveritas donde se muere, flechas y el camino rojo de puntos hasta la X
function j_mapaPared(R, x0, y0, x1, y1) {
  const { rect, pset, linea, disco } = R, W = x1 - x0, Hh = y1 - y0, X = (u) => Math.round(x0 + u * W), Y = (v) => Math.round(y0 + v * Hh), L = j_C.lapiz;
  rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#141c2c'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const arr = Math.sin((x - x0) * 0.21 + (y - y0) * 0.05) + Math.sin((y - y0) * 0.33); pset(x, y, arr > 1.2 && j_u(x, y) < 0.5 ? j_C.papelS : h(x, y, 862) < 0.03 ? j_C.papelS : j_C.papel); }
  for (let x = x0 + 3; x < x1 - 2; x += 4) for (let y = y0 + 3; y < y1 - 2; y += 4) pset(x, y, hex('#dcd8c8'));
  const salas = [[0.06, 0.1, 0.26, 0.32], [0.38, 0.06, 0.6, 0.28], [0.72, 0.1, 0.94, 0.36], [0.08, 0.5, 0.3, 0.74], [0.42, 0.46, 0.62, 0.7], [0.74, 0.58, 0.94, 0.86], [0.3, 0.8, 0.52, 0.95]];
  const cen = salas.map(([a, b, c, d]) => [X((a + c) / 2), Y((b + d) / 2)]);
  for (const [i, j] of [[0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [3, 6], [2, 5]]) { linea(cen[i][0], cen[i][1], cen[j][0], cen[j][1], j_mezcla(L, j_C.papel, 0.35)); linea(cen[i][0] + 1, cen[i][1] + 1, cen[j][0] + 1, cen[j][1] + 1, j_mezcla(L, j_C.papel, 0.6)); }
  salas.forEach(([a, b, c, d], k) => { rect(X(a), Y(b), X(c), Y(d), j_C.papel); linea(X(a), Y(b), X(c), Y(b), L); linea(X(a), Y(d), X(c), Y(d), L); linea(X(a), Y(b), X(a), Y(d), L); linea(X(c), Y(b), X(c), Y(d) + (k % 2), L); j_cifras(R, k + 1, X(a) + 2, Y(b) + 2, L); });
  // el lago, los árboles y el castillo
  for (let a = 0; a < 6.28; a += 0.15) { const r = 1 + 0.15 * Math.sin(a * 3); pset(Math.round(X(0.5) + Math.cos(a) * W * 0.06 * r), Math.round(Y(0.38) + Math.sin(a) * Hh * 0.05 * r), j_C.lapizA); }
  for (let i = -3; i <= 3; i += 2) pset(X(0.5) + i, Y(0.38), j_C.lapizA);
  for (const [u, v] of [[0.12, 0.42], [0.18, 0.44], [0.66, 0.44], [0.86, 0.48], [0.62, 0.86]]) { pset(X(u), Y(v) - 2, hex('#3a8a4a')); linea(X(u) - 1, Y(v) - 1, X(u) + 1, Y(v) - 1, hex('#3a8a4a')); pset(X(u), Y(v), L); }
  { const cx = X(0.83), cy = Y(0.26); linea(cx - 3, cy, cx + 3, cy, L); linea(cx - 3, cy, cx - 3, cy - 4, L); linea(cx + 3, cy, cx + 3, cy - 4, L); pset(cx, cy - 3, L); pset(cx - 3, cy - 5, j_C.lapizR); pset(cx + 3, cy - 5, j_C.lapizR); }
  // calaveritas donde se muere, con su flecha
  for (const [u, v] of [[0.3, 0.38], [0.97, 0.46], [0.16, 0.86], [0.66, 0.08]]) { const sx = X(u) - 2, sy = Y(v) - 2; j_spr(R, ['.###.', '#.#.#', '#####', '.#.#.'], sx, sy, { '#': hex('#2a2a3a') }); }
  // el camino rojo de puntos hasta la X
  const ruta = [cen[0], cen[1], cen[4], cen[5]];
  for (let s = 0; s + 1 < ruta.length; s++) { const [ax, ay] = ruta[s], [bx, by] = ruta[s + 1], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)); for (let i = 0; i <= n; i += 3) pset(Math.round(ax + (bx - ax) * i / n) + 1, Math.round(ay + (by - ay) * i / n) - 1, j_C.lapizR); }
  { const [ex, ey] = cen[5]; linea(ex - 2, ey - 2, ex + 2, ey + 2, j_C.lapizR); linea(ex - 2, ey + 2, ex + 2, ey - 2, j_C.lapizR); linea(ex - 2, ey - 1, ex + 2, ey + 3, j_C.lapizR); }
  // el celo de las esquinas
  for (const [cx, cy] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) for (let j = -2; j <= 2; j++) for (let i = -3; i <= 3; i++) if (Math.abs(i + j * (cx === cy ? 1 : -1)) < 3) pset(cx + i, cy + j, j_mezcla(R.pget(cx + i, cy + j), hex('#f8f0b0'), 0.5));
}

// las figuras de una balda (de pie en yb, desde x): el caballero, el dragón, el castillo, el mago, el cofre, el trofeo; s
// es la escala (1 o 2); devuelve las posiciones de las banderas del castillo y del cabezón para animarlas
function j_figuras(R, x, yb, s = 1, fila = 0) {
  const P = { k: hex('#1c1222'), g: hex('#a8acb8'), G: hex('#d8dce4'), d: hex('#5a5e6a'), r: hex('#d83a3a'), b: hex('#2a4fa8'), B: hex('#4a78d0'), v: hex('#3a9a4a'), V: hex('#6ad05a'), y: hex('#e8c040'), Y: hex('#fff0a0'), w: hex('#f6f2ea'), m: hex('#8a5a2a'), M: hex('#b07a3a'), p: hex('#f6c290'), a: hex('#6a3a9a'), A: hex('#9a6ad0') };
  const S = {
    caballero: ['..r..', '.rr..', '.kkk.', 'kGgdk', 'kgggk', '.kgk.', 'bBggg', 'bbggg', '.ggg.', '.g.g.', 'kk.kk'],
    dragon: ['......vv..', '.V...vVvk.', 'VV..vVvvvy', 'VVVvVVv...', '.vVVVv....', 'vVVVVv....', 'v.v..v....'],
    castillo: ['k.k.....k.k.', 'kGk.....kGk.', 'kgk.kkk.kgk.', 'kgkkgGgkkgk.', 'kgggggggggk.', 'kgGgggggGgk.', 'kgggkkkgggk.', 'kgggkdkgggk.', 'kgggkdkgggk.', 'kkkkkkkkkkk.'],
    mago: ['..y..', '.bb..', '.bBb.', 'bBBBb', '.ppp.', '.www.', 'bwwwb', 'bBwBb', 'bBBBb', 'bBBBb', '.k.k.'],
    gnomo: ['..r..', '.rr..', '.rrr.', 'rrrrr', '.ppp.', 'wwwww', 'bwwwb', '.bbb.', '.k.k.'],
    cofre: ['.kkkkkk.', 'kMMyMMMk', 'kmmymmmk', 'kyyYyyyk', 'kmmymmmk', 'kkkkkkkk'],
    trofeo: ['kyyyk', 'yYyyy', '.yyy.', '..y..', '.kkk.', 'kmmmk'],
    dado: ['.kkk.', 'krrrk', 'rwrwr', 'krrrk', '.kkk.'],
    caja: ['kkkkk', 'kaAak', 'kAyAk', 'kaAak', 'kaaak', 'kAAAk', 'kaaak', 'kkkkk'],
  };
  const pon = (n) => { const f = S[n]; j_spr(R, f, x, yb - f.length * s + 1, P, s); const r = [x, yb - f.length * s + 1, f[0].length * s]; x += f[0].length * s + 2 * s; return r; };
  const out = {};
  if (fila === 0) { pon('caballero'); pon('dragon'); out.castillo = pon('castillo'); pon('mago'); if (s === 1) pon('trofeo'); }
  else { pon('gnomo'); pon('caja'); pon('caja'); pon('cofre'); out.cabezon = [x + 2 * s, yb]; x += 8 * s; pon('dado'); }
  return out;
}

// las banderas del castillo de una figura (que ondean) y el cabezón que cabecea
function j_figurasVivas(R, t, castillo, cabezon, s = 1) {
  const { rect, pset, disco } = R;
  if (castillo) { const [cx, cy, w] = castillo; for (const fx of [cx + s, cx + 9 * s]) { rect(fx, cy - 3 * s, fx + s - 1, cy - 1, hex('#5a5e6a')); const o = Math.floor(t * 4 + fx) % 2; rect(fx + s, cy - 3 * s + o, fx + 3 * s - 1, cy - 2 * s + o, hex('#d83a3a')); } }
  if (cabezon) { const [bx, by] = cabezon, b = Math.round(Math.sin(t * 5) * s); rect(bx, by - 4 * s, bx + 3 * s, by, hex('#1c1222')); rect(bx + s, by - 3 * s, bx + 2 * s, by, hex('#3e8a6a')); disco(bx + 1.5 * s + b, by - 7 * s, 3.2 * s, hex('#1c1222')); disco(bx + 1.5 * s + b, by - 7 * s, 2.6 * s, hex('#f6c290')); rect(bx - s + b, by - 10 * s, bx + 4 * s + b, by - 9 * s, hex('#7a4a24')); pset(Math.round(bx + 0.5 * s + b), by - 7 * s, hex('#1c1222')); pset(Math.round(bx + 2.5 * s + b), by - 7 * s, hex('#1c1222')); }
}

// la tira de luces bajo una balda: tiñe la pared de debajo de un color que va cambiando
function j_tiraLuz(R, t, x0, x1, y, fase = 0) {
  const k = (t * 0.25 + fase) % 1, cols = [hex('#ff4ab0'), hex('#6a5aff'), hex('#3ae0ff'), hex('#ff4ab0')], i = Math.floor(k * 3), u = k * 3 - i, c = j_mezcla(cols[i], cols[i + 1], u);
  R.rect(x0 + 1, y, x1 - 1, y, j_mezcla(c, hex('#ffffff'), 0.6)); const B = R.buf;
  for (let yy = y + 1; yy < y + 16; yy++) for (let x = x0 - 2; x <= x1 + 2; x++) { const q = (1 - (yy - y) / 16) ** 1.5 * 0.6 * (x < x0 || x > x1 ? 0.4 : 1); if (j_u(x, yy) < q) B[yy * 320 + x] = j_mezcla(B[yy * 320 + x], c, 0.25); }
}

// la silla gamer (respaldo con orejas, el cojín, los colores) detrás de quien se sienta en x; la base de cinco patas con
// ruedas asoma bajo el escritorio entre y0 e yPie
function j_sillaGamer(R, x, yTop, y0, yPie) {
  const { rect, pset, linea, disco } = R, N = hex('#22222a'), NL = hex('#3a3a46'), RO = hex('#c8343a'), ROL = hex('#e8545a');
  rect(x - 12, yTop + 3, x + 12, y0, hex('#141218')); rect(x - 11, yTop + 4, x + 11, y0, N); rect(x - 11, yTop + 4, x - 10, y0, NL);
  rect(x - 8, yTop, x + 8, y0, hex('#141218')); rect(x - 7, yTop + 1, x + 7, y0, RO); rect(x - 7, yTop + 1, x + 7, yTop + 1, ROL); rect(x - 1, yTop + 1, x + 1, y0, hex('#f2eee6'));
  rect(x - 5, yTop + 4, x + 5, yTop + 8, hex('#141218')); rect(x - 4, yTop + 5, x + 4, yTop + 7, N); pset(x - 3, yTop + 5, NL);
  if (yPie > y0) { rect(x - 1, y0 + 1, x + 1, yPie - 3, hex('#5a5e6a')); rect(x - 1, y0 + 1, x - 1, yPie - 3, hex('#8a8e9a')); for (const [ex, ey] of [[-12, 0], [12, 0], [-7, 2], [7, 2], [0, 1]]) { linea(x, yPie - 3, x + ex, yPie - 1 + ey, N); disco(x + ex, yPie + ey, 1, hex('#0e0e12')); } }
}

// el perro dormido en la cama, hecho un ovillo: respira, mueve una oreja y a ratos la cola
function j_perroDormido(R, t, x, y) {
  const { disco, pset, rect } = R, r = Math.sin(t * 1.6) * 0.5;
  disco(x, y, 6.5 + r, hex('#1c1222')); disco(x, y, 5.6 + r, hex('#c88a4a')); disco(x - 1, y - 2, 3.5 + r, hex('#e0a868')); disco(x - 6, y, 3.2, hex('#1c1222')); disco(x - 6, y, 2.6, hex('#d89858')); pset(x - 8, y + 1, hex('#1c1222'));
  const oreja = Math.sin(t * 0.7) > 0.85 ? 1 : 0; rect(x - 6, y - 3 - oreja, x - 4, y - 2 - oreja, hex('#8a5a2a')); pset(x - 7, y - 1, hex('#5a3a1a'));
  const cola = Math.sin(t * 9) * (Math.sin(t * 0.5) > 0.7 ? 2 : 0); pset(Math.round(x + 6 + cola * 0.3), y + 3, hex('#c88a4a')); pset(Math.round(x + 7 + cola), y + 2, hex('#c88a4a'));
  if (Math.sin(t * 0.6) > 0.3) { const z = (t * 0.6) % 1; pset(x - 4 + Math.round(z * 4), y - 9 - Math.round(z * 6), hex('#c8d0ff')); }
}

function j_cuarto(R, t, o) {
  const { rect, pset, linea } = R, cam = o.camara ?? 'general';
  if (cam === 'album') {
    j_fondo(R, 'cuarto-album', () => j_albumFijo(R));
    j_ventanaTarde(R, t, 235, 53, 319, 103); j_persiana(R, t, 235, 53, 319, 70);
    rect(232, 50, 234, 106, j_C.blanco2); rect(234, 51, 234, 106, j_C.blanco2D);
    j_tiraLuz(R, t, 6, 94, 59, 0.3);
    j_figurasVivas(R, t, j_capas.get('cuarto-album-fig'), null, 2);
    j_sillaGamer(R, o.silla ?? 160, 90, 112, 112);
    return { suelo: 121, puesto: o.silla ?? 160, mesa: [0, 112, 319], album: [66, 120, 254, 168], hueco: [220, 147, 243, 165], monton: [262, 140, 284, 152], mapa: [104, 26, 212, 86], ventana: [235, 53, 319, 103] };
  }
  j_fondo(R, 'cuarto-g', () => j_cuartoFijo(R));
  j_ventanaTarde(R, t, 197, 21, 261, 79); j_persiana(R, t, 197, 21, 261, 34);
  rect(227, 21, 228, 79, j_C.blanco2); rect(229, 21, 229, 79, j_C.blanco2D);
  j_tiraLuz(R, t, 14, 80, 47, 0); j_tiraLuz(R, t, 14, 80, 73, 0.15);
  const fig = j_capas.get('cuarto-g-fig') || {}; j_figurasVivas(R, t, fig.castillo, fig.cabezon, 1);
  // la nota adhesiva que se levanta con el aire
  { const lev = Math.max(0, Math.sin(t * 1.4)) > 0.55 ? 1 : 0; rect(176, 40, 186, 50, hex('#1c1222')); rect(177, 41, 185, 49, hex('#f08ab8')); rect(178, 43, 184, 43, hex('#a85a80')); rect(178, 45, 182, 45, hex('#a85a80')); if (lev) { rect(181, 46, 185, 49, R.pget(188, 48)); R.poligono([[180, 49], [186, 44], [186, 49]], hex('#f8b8d8')); } }
  j_perroDormido(R, t, 258, 101);
  j_sillaGamer(R, o.silla ?? 116, 111, 132, 152);
  return { suelo: 141, sueloPie: 168, puesto: o.silla ?? 116, mesa: [18, 132, 184], pantalla: [26, 90, 90, 120], mapa: [88, 22, 172, 76], ventana: [197, 21, 261, 79], cama: [222, 104, 319, 146], libre: [[192, 300]] };
}

// lo fijo del cuarto general: pared azul con la luz del monitor y de la ventana, rodapié, el marco y el alféizar con un
// cactus, las baldas con figuras, el mapa con notas, el póster del caballero bajo la luna, la cama con la colcha de
// estrellas, la mochila, la moqueta con la alfombra, las zapatillas, el balón y el mando, y la sombra bajo el escritorio
function j_cuartoFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, Q = [j_C.q0, j_C.q1, j_C.q2, j_C.q3, j_C.q4];
  for (let y = 0; y < 115; y++) for (let x = 0; x < 320; x++) { const dv = Math.hypot(x - 229, (y - 50) * 1.2), dm = Math.hypot((x - 58) * 0.8, y - 104); B[y * 320 + x] = Q[Math.max(0, Math.min(4, Math.floor(0.7 + 2.4 * Math.exp(-dv / 55) + 2 * Math.exp(-dm / 42) + j_u(x, y) * 0.9 + (h(x >> 1, y >> 1, 863) - 0.5) * 0.5)))]; }
  rect(0, 0, 319, 1, j_C.q4); rect(0, 2, 319, 2, j_C.q0);
  rect(0, 109, 319, 114, j_C.blanco2); rect(0, 109, 319, 109, hex('#ffffff')); rect(0, 114, 319, 114, j_C.blanco2D);
  // la ventana: marco, alféizar, un cactus y una figura de pato
  rect(194, 18, 264, 82, j_C.blanco2); rect(194, 18, 264, 18, hex('#ffffff')); rect(263, 19, 264, 82, j_C.blanco2S); rect(196, 20, 262, 20, j_C.blanco2D); rect(196, 20, 196, 80, j_C.blanco2D);
  rect(190, 80, 268, 84, j_C.blanco2); rect(190, 80, 268, 80, hex('#ffffff')); rect(190, 85, 268, 85, j_C.blanco2D);
  rect(202, 74, 208, 79, hex('#1c1222')); rect(203, 75, 207, 79, j_C.tiesto); rect(204, 68, 206, 74, hex('#3a8a4a')); rect(202, 70, 203, 72, hex('#3a8a4a')); pset(205, 67, hex('#f87ab0'));
  rect(248, 75, 254, 79, hex('#e8c040')); rect(252, 73, 255, 76, hex('#e8c040')); pset(256, 75, hex('#e8803a')); pset(253, 74, hex('#1c1222'));
  // las baldas y sus figuras
  for (const y of [44, 70]) { rect(13, y, 81, y + 2, hex('#e8e4dc')); rect(13, y, 81, y, hex('#ffffff')); rect(13, y + 3, 81, y + 3, hex('#141c2c')); }
  const f0 = j_figuras(R, 16, 43, 1, 0), f1 = j_figuras(R, 16, 69, 1, 1); j_capas.set('cuarto-g-fig', { castillo: f0.castillo, cabezon: f1.cabezon });
  // el mapa con sus notas adhesivas
  j_mapaPared(R, 88, 22, 172, 76);
  rect(176, 24, 186, 34, hex('#1c1222')); rect(177, 25, 185, 33, hex('#f8e070')); for (let l = 0; l < 3; l++) rect(178, 27 + l * 2, 184 - l * 2, 27 + l * 2, hex('#a8904a'));
  rect(176, 54, 186, 64, hex('#1c1222')); rect(177, 55, 185, 63, hex('#a8e890')); j_spr(R, ['.###.', '#.#.#', '#####', '.#.#.'], 179, 57, { '#': hex('#3a5a3a') });
  // el póster: un caballero bajo la luna, el castillo en el monte y estrellas
  { const x0 = 272, y0 = 48, x1 = 312, y1 = 78; rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#141218')); j_cielo(R, x0, y0, x1, y1, [[0, hex('#1a1a4a')], [0.6, hex('#4a3a8a')], [1, hex('#c8607a')]]);
    disco(302, 56, 4, hex('#fff4d0')); for (let k = 0; k < 8; k++) pset(x0 + 2 + Math.round(h(k, 1, 864) * 36), y0 + 2 + Math.round(h(k, 2, 864) * 14), hex('#ffffff'));
    poligono([[x0, y1], [x0 + 14, y0 + 16], [x0 + 26, y0 + 22], [x1, y0 + 14], [x1, y1]], hex('#1c1630')); rect(x0 + 12, y0 + 12, x0 + 16, y0 + 17, hex('#1c1630')); pset(x0 + 12, y0 + 11, hex('#1c1630')); pset(x0 + 16, y0 + 11, hex('#1c1630'));
    rect(x0 + 22, y1 - 9, x0 + 24, y1 - 3, hex('#0e0a18')); pset(x0 + 23, y1 - 10, hex('#0e0a18')); linea(x0 + 25, y1 - 9, x0 + 27, y1 - 14, hex('#c8c8d8')); rect(x0 + 20, y1 - 7, x0 + 21, y1 - 5, hex('#0e0a18'));
    rect(x0 + 2, y1 - 3, x1 - 2, y1 - 2, hex('#e8c040')); for (let x = x0 + 4; x < x1 - 4; x += 3) pset(x, y1 - 2, hex('#a87a18')); }
  // la moqueta, la alfombra de rayas, la sombra bajo el escritorio
  for (let y = 115; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 865); B[y * 320 + x] = n < 0.12 ? j_C.moqS : n > 0.9 ? j_C.moqL : (j_u(x, y) < (y - 115) / 130 ? j_C.moqL : j_C.moq); }
  rect(0, 115, 319, 116, hex('#2a2c3a'));
  for (let y = 154; y <= 177; y++) { const f = (y - 154) / 23, a = Math.round(190 - f * 8), b = Math.round(312 + f * 6); for (let x = a; x <= b; x++) { const fr = Math.floor((y - 154) / 3) % 4; B[y * 320 + x] = x === a || x === b || y === 154 || y === 177 ? hex('#2a2a3a') : [hex('#3ab0a8'), hex('#e8e0c8'), hex('#2a7a8a'), hex('#e8e0c8')][fr]; if (h(x, y, 866) < 0.06) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#000000'), 0.2); } }
  for (let x = 184; x < 318; x += 3) pset(x, 178, hex('#e8e0c8'));
  for (let y = 140; y <= 160; y++) for (let x = 50; x <= 184; x++) if (j_u(x, y) < 0.75 - (y - 140) / 40) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#0a0c14'), 0.55);
  // la cama: el cabecero, la colcha de estrellas que cae por el lado, las almohadas, el dragón de peluche
  { rect(304, 78, 319, 112, hex('#141218')); rect(305, 79, 319, 112, hex('#8e6038')); for (let x = 307; x < 319; x += 4) rect(x, 82, x + 1, 110, hex('#6e4826')); rect(305, 79, 319, 80, hex('#b07c4c'));
    rect(222, 104, 304, 106, hex('#141218')); rect(222, 107, 306, 140, hex('#141218'));
    for (let y = 105; y <= 139; y++) for (let x = 223; x <= 305; x++) { const top = y < 112, cx = Math.floor((x - 223) / 10), cy = Math.floor((y - (top ? 105 : 112)) / 9), cu = [hex('#2a4fa8'), hex('#e8c040'), hex('#3a8a8a'), hex('#c8443a')][(cx + cy * 3) % 4];
      let c = top ? j_mezcla(cu, hex('#ffffff'), 0.2) : cu; if (((x - 223) % 10 === 0) || (!top && (y - 112) % 9 === 0)) c = hex('#f2eee6'); const sx = (x - 223) % 10 - 5, sy = (y - (top ? 105 : 112)) % 9 - 4; if (!top && Math.abs(sx) + Math.abs(sy) < 2) c = hex('#ffffff'); if (!top && y > 132) c = j_mezcla(c, hex('#000000'), 0.25); pset(x, y, c); }
    rect(222, 140, 306, 146, hex('#0e0c14')); rect(230, 141, 250, 146, hex('#6a4a2a')); rect(231, 141, 249, 141, hex('#8a6a3a')); rect(224, 141, 226, 147, hex('#5e3c20')); rect(302, 141, 304, 147, hex('#5e3c20'));
    for (const px of [284, 294]) { rect(px - 1, 96, px + 10, 105, hex('#141218')); rect(px, 97, px + 9, 104, hex('#f2f0f8')); rect(px, 97, px + 9, 98, hex('#ffffff')); rect(px + 1, 103, px + 8, 104, hex('#c8c8d8')); }
    j_spr(R, ['..vv....', '.vVvv.y.', 'vVVVvvv.', '.vVVv...', 'v.v.v...'], 270, 99, { v: hex('#3a9a4a'), V: hex('#6ad05a'), y: hex('#e8c040') }); }
  // la mochila apoyada en la cama, las zapatillas, el balón, el mando
  { poligono([[226, 150], [228, 128], [242, 128], [244, 150]], hex('#141218')); poligono([[227, 149], [229, 129], [241, 129], [243, 149]], hex('#e8803a')); rect(230, 138, 240, 147, hex('#c8602a')); rect(230, 138, 240, 138, hex('#f8d040')); linea(231, 128, 235, 124, hex('#141218')); linea(235, 124, 239, 128, hex('#141218')); }
  for (const [sx, sy] of [[196, 164], [208, 166]]) { rect(sx, sy - 3, sx + 9, sy, hex('#141218')); rect(sx + 1, sy - 2, sx + 8, sy - 1, hex('#f2f2f6')); rect(sx + 1, sy - 2, sx + 3, sy - 2, hex('#d83a3a')); rect(sx, sy, sx + 9, sy, hex('#8a8a9a')); }
  disco(222, 152, 5.5, hex('#141218')); disco(222, 152, 4.6, hex('#e8803a')); linea(217, 152, 227, 152, hex('#5a2a14')); linea(222, 147, 222, 157, hex('#5a2a14')); pset(220, 150, hex('#f8b070'));
  rect(266, 168, 278, 172, hex('#141218')); rect(267, 169, 277, 171, hex('#3a3a4a')); pset(269, 169, hex('#d83a3a')); pset(275, 169, hex('#3ad84a')); pset(276, 170, hex('#3a8ad8'));
}

// el escritorio blanco del cuarto por delante del chico (con los pies en y 141 se le ven la cabeza y los hombros): el
// tablero, los cajones, el panel; el monitor con la aventura antigua (o.juego 0–1: el caballero cruza el camino; sin él,
// va y viene), la torre con ventiladores de colores, el teclado con su ola de luz, el ratón, el álbum cerrado y un bote
function j_cuartoDelante(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  j_delante(R, 'cuarto-g-delante', () => {
    rect(17, 131, 185, 131, hex('#141218')); rect(17, 132, 185, 136, j_C.blanco2); rect(17, 132, 185, 132, hex('#ffffff')); for (let x = 20; x < 184; x += 9) pset(x, 134, j_C.blanco2S);
    rect(17, 137, 185, 139, j_C.blanco2S); rect(17, 139, 185, 139, j_C.blanco2D); rect(57, 140, 175, 142, j_C.blanco2D);
    rect(18, 140, 56, 166, j_C.blanco2); rect(18, 140, 18, 166, j_C.blanco2D); rect(56, 140, 56, 166, j_C.blanco2D);
    for (const [y0, y1] of [[142, 149], [151, 158], [160, 165]]) { rect(20, y0, 54, y1, j_C.blanco2S); rect(21, y0 + 1, 53, y1 - 1, j_C.blanco2); rect(21, y0 + 1, 53, y0 + 1, hex('#ffffff')); rect(32, y0 + 3, 42, y0 + 3, j_C.blanco2D); }
    rect(176, 140, 184, 166, j_C.blanco2); rect(176, 140, 176, 166, j_C.blanco2D); rect(18, 166, 56, 167, hex('#141218')); rect(176, 166, 184, 167, hex('#141218'));
    // el monitor: pie, cuello, marco
    rect(46, 129, 68, 132, hex('#141218')); rect(47, 129, 67, 131, hex('#3a3a46')); rect(54, 122, 60, 129, hex('#141218')); rect(55, 122, 59, 129, hex('#2a2a34'));
    rect(24, 87, 92, 123, hex('#141218')); rect(25, 88, 91, 122, hex('#22222a')); rect(25, 88, 91, 88, hex('#3a3a46'));
    // la torre con su cristal
    rect(150, 98, 171, 132, hex('#141218')); rect(151, 99, 170, 131, hex('#2a2a34')); rect(152, 100, 166, 130, hex('#0e0e14')); rect(167, 100, 169, 130, hex('#3a3a46')); pset(168, 102, hex('#3ad84a'));
    // el teclado, la alfombrilla, el álbum cerrado y el bote de lápices
    rect(92, 133, 132, 136, hex('#141218')); rect(93, 133, 131, 135, hex('#2a2a34')); rect(134, 133, 148, 137, hex('#1a1a22'));
    rect(64, 133, 88, 136, hex('#141218')); rect(65, 133, 87, 134, hex('#2a4fa8')); rect(65, 135, 87, 135, hex('#e8e4d8')); j_spr(R, ['.###.', '#.#.#', '#####', '.#.#.'], 74, 129, { '#': hex('#f6f2ea') });
    rect(176, 124, 183, 132, hex('#141218')); rect(177, 125, 182, 132, hex('#3a8a8a')); for (const [x, c, y] of [[178, hex('#e8c040'), 117], [180, hex('#d83a3a'), 119], [181, hex('#f6f2ea'), 116]]) { rect(x, y, x, 124, c); pset(x, y - 1, hex('#141218')); }
  });
  // la pantalla: una aventura de los ochenta (homenaje dibujado por nosotros): el castillo, el foso, el camino y el caballero
  { const x0 = 26, y0 = 90, x1 = 90, y1 = 120; R.recorte([x0, y0, x1, y1]);
    j_rc(R, x0, y0, x1, y0 + 13, hex('#5ab8f8')); j_rc(R, x0, y0 + 9, x1, y0 + 13, hex('#8ad0f8'));
    { const nx = x0 + ((t * 3) % 80) - 10; j_rc(R, nx, y0 + 3, nx + 7, y0 + 4, hex('#ffffff')); j_rc(R, nx + 2, y0 + 2, nx + 5, y0 + 2, hex('#ffffff')); }
    for (let x = x0; x <= x1; x++) { const yc = y0 + 11 - Math.round(2 * Math.sin(x * 0.2)); linea(x, yc, x, y0 + 14, hex('#3a8a3a')); }
    j_rc(R, x0, y0 + 14, x1, y1 - 7, hex('#5ac84a')); for (let x = x0; x <= x1; x += 3) pset(x + (x % 2), y0 + 16 + (x % 4), hex('#3a9a3a'));
    for (let y = y0 + 14; y <= y1 - 7; y++) { const c = Math.round(x0 + 10 + (y - y0 - 14) * 2.5); linea(c, y, c + 30, y, hex('#d8b878')); }
    { const cx = 76; j_rc(R, cx - 7, y0 + 4, cx + 7, y0 + 15, hex('#a8a8b8')); for (let x = cx - 7; x <= cx + 7; x += 2) pset(x, y0 + 3, hex('#a8a8b8')); for (const tx of [cx - 8, cx + 6]) { j_rc(R, tx, y0 + 1, tx + 2, y0 + 15, hex('#8a8a98')); R.poligono([[tx - 1, y0 + 1], [tx + 1, y0 - 3], [tx + 4, y0 + 1]], hex('#3a5ab0')); }
      j_rc(R, cx - 2, y0 + 10, cx + 2, y0 + 15, hex('#4a2a1a')); pset(cx - 4, y0 + 7, hex('#2a2a3a')); pset(cx + 4, y0 + 7, hex('#2a2a3a')); const fl = Math.floor(t * 4) % 2; pset(cx + 1, y0 - 4 + fl, hex('#d83a3a'));
      for (let x = cx - 10; x <= cx + 10; x++) pset(x, y0 + 16 + (Math.floor(t * 3 + x) % 3 === 0 ? 1 : 0), hex('#3a6ad8')); }
    for (const [tx, ty] of [[x0 + 6, y0 + 12], [x0 + 52, y0 + 18]]) { j_rc(R, tx, ty, tx + 1, ty + 4, hex('#6a4a2a')); R.disco(tx + 0.5, ty - 1, 3, hex('#2a7a2a')); }
    { const u = o.juego ?? (0.5 + 0.5 * Math.sin(t * 0.5)), kx = Math.round(x0 + 14 + u * 36), ky = y0 + 15 + Math.round(u * 4), pa = Math.floor(t * 6) % 2; j_rc(R, kx, ky - 5, kx + 2, ky - 1, hex('#a8a8b8')); pset(kx + 1, ky - 6, hex('#d83a3a')); pset(kx + pa * 2, ky, hex('#3a3a5a')); pset(kx + 1, ky - 4, hex('#3a3a5a')); }
    j_rc(R, x0, y1 - 6, x1, y1, hex('#0a0a12')); pset(x0 + 2, y1 - 4, hex('#c8c8d8')); pset(x0 + 3, y1 - 3, hex('#c8c8d8')); pset(x0 + 2, y1 - 2, hex('#c8c8d8'));
    { const n = Math.floor((t * 6) % 30); for (let i = 0; i < Math.min(n, 22); i++) if (i % 5 !== 4) pset(x0 + 6 + i * 2, y1 - 3, hex('#c8c8d8')); if (Math.floor(t * 2) % 2) j_rc(R, x0 + 6 + Math.min(n, 22) * 2, y1 - 4, x0 + 7 + Math.min(n, 22) * 2, y1 - 2, hex('#ffffff')); }
    R.recorte(null); for (let i = 0; i < 9; i++) if (i % 4 !== 3) pset(30 + i, 100 - i, j_mezcla(R.pget(30 + i, 100 - i), hex('#ffffff'), 0.3)); }
  // la torre: tres ventiladores que giran y cambian de color
  for (let k = 0; k < 3; k++) { const cx = 159, cy = 105 + k * 10, c = j_mezcla(hex('#ff4ab0'), hex('#3ae0ff'), (Math.sin(t * 1.5 + k) + 1) / 2); R.disco(cx, cy, 4, c); R.disco(cx, cy, 3, hex('#141218')); const a = t * 9 + k; for (let b = 0; b < 3; b++) { const aa = a + b * 2.09; linea(cx, cy, Math.round(cx + Math.cos(aa) * 3), Math.round(cy + Math.sin(aa) * 3), hex('#5a5a6a')); } pset(cx, cy, c); }
  // el teclado con su ola de luz y el ratón
  for (let i = 0; i < 18; i++) { const c = j_mezcla(hex('#6a5aff'), hex('#3ae0ff'), (Math.sin(t * 3 - i * 0.5) + 1) / 2); pset(94 + i * 2, 134, c); if (i % 2) pset(95 + i * 2, 133, j_mezcla(c, hex('#ff4ab0'), 0.4)); }
  disco(141, 135, 2, hex('#141218')); pset(141, 134, hex('#2a2a34')); pset(141, 136, j_mezcla(hex('#ff4ab0'), hex('#3ae0ff'), (Math.sin(t * 2) + 1) / 2));
  return { pantalla: [26, 90, 90, 120] };
}

// lo fijo del cuarto de cerca: pared con la luz del flexo y del monitor, la balda grande con las figuras a escala 2, el
// mapa y el marco de la ventana
function j_albumFijo(R) {
  const { rect, pset } = R, B = R.buf, Q = [j_C.q0, j_C.q1, j_C.q2, j_C.q3, j_C.q4];
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const dl = Math.hypot(x - 268, (y - 96) * 1.2), dm = Math.hypot(x - 20, y - 112); B[y * 320 + x] = Q[Math.max(0, Math.min(4, Math.floor(0.8 + 2.6 * Math.exp(-dl / 60) + 1.4 * Math.exp(-dm / 50) + j_u(x, y) * 0.9 + (h(x >> 1, y >> 1, 867) - 0.5) * 0.5)))]; }
  rect(0, 0, 319, 1, j_C.q4); rect(0, 2, 319, 2, j_C.q0);
  rect(4, 56, 96, 58, hex('#e8e4dc')); rect(4, 56, 96, 56, hex('#ffffff')); rect(4, 59, 96, 59, hex('#141c2c'));
  const f = j_figuras(R, 8, 55, 2, 0); j_capas.set('cuarto-album-fig', f.castillo);
  j_mapaPared(R, 104, 26, 212, 86);
  rect(222, 30, 230, 40, hex('#1c1222')); rect(223, 31, 229, 39, hex('#f8e070')); rect(224, 33, 228, 33, hex('#a8904a')); rect(224, 35, 227, 35, hex('#a8904a'));
  rect(232, 50, 319, 52, j_C.blanco2); rect(232, 50, 319, 50, hex('#ffffff')); rect(232, 104, 319, 108, j_C.blanco2); rect(232, 104, 319, 104, hex('#ffffff')); rect(232, 109, 319, 109, j_C.blanco2D);
}

// un cromo de muerte de broma de 24 × 19 en (x, y): tipo 0 la calavera que guiña, 1 el caballero mojado que gotea, 2 el
// conserje chamuscado que humea, 3 el caballero aplastado con estrellas, 4 el platillo que abduce, 5 la rana con corona,
// 6 la calavera dorada con gafas de broma (el último); los brillantes llevan un destello que los cruza
function j_cromo(R, x, y, tipo, t, brillante = false) {
  const { rect, pset, disco, linea, poligono } = R, w = 23, hh = 18, oro = tipo === 6;
  const fondos = [hex('#6a3a9a'), hex('#2a7a8a'), hex('#e8803a'), hex('#5aa84a'), hex('#1e2450'), hex('#a888d8'), hex('#c89a2a')];
  rect(x, y, x + w, y + hh, hex('#1c1222')); rect(x + 1, y + 1, x + w - 1, y + hh - 1, oro ? hex('#f8d860') : brillante ? hex('#c8d8f0') : hex('#f2eee6'));
  rect(x + 2, y + 2, x + w - 2, y + hh - 5, fondos[tipo]); rect(x + 2, y + 2, x + w - 2, y + 2, j_mezcla(fondos[tipo], hex('#ffffff'), 0.3));
  const cx = x + 12, cy = y + 8;
  if (tipo === 0 || tipo === 6) { disco(cx, cy, 4.5, hex('#1c1222')); disco(cx, cy, 3.6, hex('#f2eee2')); rect(cx - 2, cy + 3, cx + 2, cy + 5, hex('#f2eee2')); pset(cx - 1, cy + 5, hex('#1c1222')); pset(cx + 1, cy + 5, hex('#1c1222'));
    const guino = Math.sin(t * 1.3 + x) > 0.7; rect(cx - 2, cy - 1, cx - 1, cy, hex('#1c1222')); if (guino) rect(cx + 1, cy, cx + 2, cy, hex('#1c1222')); else rect(cx + 1, cy - 1, cx + 2, cy, hex('#1c1222')); pset(cx, cy + 2, hex('#1c1222'));
    if (oro) { rect(cx - 4, cy - 2, cx + 4, cy - 2, hex('#1c1222')); rect(cx - 3, cy - 1, cx - 1, cy + 1, hex('#1c1222')); rect(cx + 1, cy - 1, cx + 3, cy + 1, hex('#1c1222')); pset(cx - 2, cy - 1, hex('#5a8ad8')); if (!guino) pset(cx + 2, cy - 1, hex('#5a8ad8')); } }
  else if (tipo === 1) { rect(cx - 2, cy - 3, cx + 2, cy + 4, hex('#a8acb8')); rect(cx - 2, cy - 1, cx + 2, cy - 1, hex('#3a3a4a')); pset(cx, cy - 4, hex('#d83a3a')); rect(cx - 6, cy + 5, cx + 6, cy + 6, hex('#5ab8f8')); for (let k = 0; k < 3; k++) { const ph = (t * 1.5 + k / 3) % 1; pset(cx - 3 + k * 3, Math.round(cy - 1 + ph * 6), hex('#a8e0ff')); } pset(cx + 4, cy - 5, hex('#5ab8f8')); pset(cx + 5, cy - 4, hex('#5ab8f8')); }
  else if (tipo === 2) { rect(cx - 2, cy - 2, cx + 2, cy + 4, hex('#3a3a4a')); disco(cx, cy - 4, 2, hex('#4a4a52')); rect(cx - 3, cy - 6, cx + 2, cy - 6, hex('#2a2a32')); pset(cx - 1, cy - 4, hex('#ffffff')); pset(cx + 1, cy - 4, hex('#ffffff')); linea(cx + 3, cy - 1, cx + 6, cy + 4, hex('#8a6a3a'));
    for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; disco(Math.round(cx - 2 + k * 2 + Math.sin(ph * 6) * 1.5), Math.round(cy - 6 - ph * 5), 1.2 - ph * 0.6, j_mezcla(hex('#e8e0d8'), hex('#8a8090'), ph)); } }
  else if (tipo === 3) { disco(cx, cy - 2, 4, hex('#1c1222')); disco(cx, cy - 2, 3.4, hex('#8a8a98')); pset(cx - 1, cy - 4, hex('#b8b8c8')); rect(cx - 6, cy + 3, cx + 6, cy + 4, hex('#a8acb8')); pset(cx + 6, cy + 2, hex('#d83a3a'));
    for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.09; pset(Math.round(cx + Math.cos(a) * 6), Math.round(cy - 6 + Math.sin(a) * 1.5), hex('#fff060')); } }
  else if (tipo === 4) { for (let k = 0; k < 5; k++) pset(x + 3 + k * 4, y + 3 + (k * 3) % 5, hex('#ffffff')); poligono([[cx - 6, cy - 3], [cx + 6, cy - 3], [cx + 3, cy - 1], [cx - 3, cy - 1]], hex('#a8acb8')); disco(cx, cy - 4, 2, hex('#6af0ff')); const on = Math.floor(t * 3) % 2;
    for (let yy = cy; yy < cy + 6; yy++) for (let xx = cx - 2 - (yy - cy) / 2; xx <= cx + 2 + (yy - cy) / 2; xx++) if (j_u(Math.round(xx), yy) < (on ? 0.5 : 0.35)) pset(Math.round(xx), yy, hex('#f8f0a0')); const b = Math.round(Math.sin(t * 2) * 1); rect(cx - 1, cy + 3 + b, cx + 1, cy + 5 + b, hex('#e8803a')); pset(cx, cy + 2 + b, hex('#f6c290')); }
  else if (tipo === 5) { rect(x + 2, cy + 3, x + w - 2, y + hh - 5, hex('#5a8ad8')); disco(cx, cy + 1, 4, hex('#1c1222')); disco(cx, cy + 1, 3.3, hex('#5ac84a')); const bl = Math.sin(t * 2 + x) > 0.85; disco(cx - 2, cy - 2, 1.3, hex('#5ac84a')); disco(cx + 2, cy - 2, 1.3, hex('#5ac84a')); if (!bl) { pset(cx - 2, cy - 2, hex('#1c1222')); pset(cx + 2, cy - 2, hex('#1c1222')); } rect(cx - 1, cy - 5, cx + 1, cy - 4, hex('#e8c040')); pset(cx - 1, cy - 6, hex('#e8c040')); pset(cx + 1, cy - 6, hex('#e8c040')); }
  // la franja de abajo: trazos (el nombre) y su número
  rect(x + 3, y + hh - 3, x + 12, y + hh - 3, hex('#8a8aa0')); j_cifras(R, String(tipo + 1), x + w - 5, y + hh - 4, hex('#3a3a4a'));
  if (brillante || oro) { const u = ((t * 0.5 + x * 0.013) % 1.6) - 0.3; for (let j = 1; j < hh; j++) { const xx = Math.round(x + u * (w + 10) - j * 0.6); for (let i = 0; i < 3; i++) if (xx + i > x && xx + i < x + w) pset(xx + i, y + j, j_mezcla(R.pget(xx + i, y + j), hex('#ffffff'), i === 1 ? 0.55 : 0.3)); } }
}

// el escritorio de cerca por delante del chico (con los pies en y 121): el tablero de abedul con la luz del flexo, el
// teclado con su ola de luz, el ratón, la lata, la lupa, el álbum abierto con once cromos y el hueco del último, el
// montón de cromos, los sobres abiertos, el flexo y el móvil; o.pega (0–1): el último cromo va del montón a su hueco
// (devuelve su centro en carta, para la mano)
function j_albumDelante(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R;
  j_delante(R, 'cuarto-album-delante', () => {
    for (let y = 112; y <= 170; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((y - 112) / 15); let c = (y - 112) % 15 === 0 ? hex('#a8845a') : h(x >> 3, y + tabla * 7, 870) < 0.12 ? hex('#c8a070') : hex('#d8b480'); if (Math.sin(x * 0.13 + y * 0.5 + tabla) > 0.92) c = hex('#c8a070');
      const luz = 0.7 - Math.hypot(x - 262, (y - 140) * 1.6) / 120; if (luz > 0 && j_u(x, y) < luz) c = j_mezcla(c, hex('#fff0c8'), 0.4); pset(x, y, c); }
    rect(0, 112, 319, 112, hex('#8a6a40')); rect(0, 171, 319, 174, hex('#c8a070')); rect(0, 171, 319, 171, hex('#f0d0a0')); rect(0, 175, 319, 179, hex('#2a2030'));
    // el teclado y el ratón
    poligono([[2, 114], [58, 114], [62, 126], [0, 126]], hex('#141218')); poligono([[3, 115], [57, 115], [60, 125], [1, 125]], hex('#2a2a34'));
    disco(72, 122, 3.5, hex('#141218')); disco(72, 122, 2.6, hex('#2a2a34')); linea(72, 118, 66, 113, hex('#141218'));
    // la lata, la lupa
    rect(24, 130, 32, 143, hex('#141218')); rect(25, 131, 31, 143, hex('#3a8ad8')); rect(25, 131, 31, 132, hex('#c8ccd6')); rect(25, 136, 31, 138, hex('#f6f2ea')); rect(26, 133, 26, 142, hex('#6aaaf0'));
    disco(36, 156, 7, hex('#141218')); disco(36, 156, 6, hex('#8a8e9a')); disco(36, 156, 5, hex('#cfe4f0')); pset(34, 153, hex('#ffffff')); linea(41, 161, 50, 168, hex('#141218')); linea(42, 161, 51, 168, hex('#5a3a2a'));
    // el álbum abierto: tapas, hojas, lomo, los huecos
    poligono([[70, 118], [250, 118], [256, 169], [64, 169]], hex('#141218')); poligono([[71, 119], [249, 119], [255, 168], [65, 168]], hex('#1e3a7a'));
    poligono([[74, 121], [157, 121], [158, 166], [69, 166]], hex('#efe8d4')); poligono([[163, 121], [246, 121], [251, 166], [162, 166]], hex('#efe8d4'));
    for (let y = 121; y <= 166; y++) for (let x = 154; x <= 166; x++) { const d = Math.abs(x - 160) / 6; if (d < 1) pset(x, y, j_mezcla(R.pget(x, y), hex('#3a2a20'), (1 - d) * 0.45)); }
    linea(160, 119, 160, 168, hex('#141218'));
    for (const px of [76, 103, 130, 165, 192, 219]) for (const py of [126, 147]) { rect(px - 1, py - 1, px + 24, py + 19, hex('#d8d0b8')); }
    // el montón de cromos y los sobres abiertos
    for (let k = 0; k < 4; k++) { rect(262 + k, 152 - k * 2, 285 + k, 153 - k * 2, hex('#141218')); rect(263 + k, 152 - k * 2, 284 + k, 152 - k * 2, hex('#f2eee6')); }
    for (const [sx, sy, c] of [[268, 120, hex('#c83a8a')], [290, 128, hex('#3a8ad8')]]) { poligono([[sx, sy], [sx + 18, sy - 2], [sx + 20, sy + 10], [sx + 2, sy + 12]], hex('#141218')); poligono([[sx + 1, sy + 1], [sx + 17, sy - 1], [sx + 19, sy + 9], [sx + 2, sy + 11]], c); for (let i = 0; i < 16; i += 2) pset(sx + 2 + i, sy + (i % 4 ? 0 : 1), hex('#e8e8f0')); for (let i = 0; i < 6; i++) pset(sx + 5 + i, sy + 6 - i % 2, j_mezcla(c, hex('#ffffff'), 0.6)); }
    // el flexo: base, brazo, cabeza y su haz
    rect(288, 144, 304, 148, hex('#141218')); rect(289, 144, 303, 147, hex('#e8e4dc')); linea(296, 144, 302, 112, hex('#141218')); linea(297, 144, 303, 112, hex('#e8e4dc')); linea(302, 112, 282, 92, hex('#141218')); linea(303, 112, 283, 92, hex('#e8e4dc')); disco(302, 112, 1.5, hex('#8a8e9a'));
    poligono([[270, 94], [281, 84], [291, 92], [283, 100]], hex('#141218')); poligono([[272, 94], [281, 86], [289, 92], [283, 98]], hex('#c8343a')); linea(274, 93, 281, 87, hex('#e8545a')); disco(281, 96, 2.5, hex('#fff6d0')); pset(281, 96, hex('#ffffff'));
    // el móvil
    rect(292, 156, 312, 166, hex('#141218')); rect(293, 157, 311, 165, hex('#24262e'));
  });
  // los once cromos (y el hueco del último, con su «?»)
  const sitios = []; for (const px of [76, 103, 130, 165, 192, 219]) for (const py of [126, 147]) sitios.push([px, py]);
  const tipos = [0, 1, 2, 3, 4, 5, 1, 3, 2, 0, 5, 6];
  sitios.forEach(([px, py], i) => { if (i < 11) j_cromo(R, px, py, tipos[i], t, i === 3 || i === 8); });
  const p = o.pega ?? 0, [hx, hy] = sitios[11];
  if (p < 1) { for (let i = 0; i <= 23; i++) { if (i % 3 !== 2) { pset(hx + i, hy, hex('#a89a7a')); pset(hx + i, hy + 18, hex('#a89a7a')); } } for (let j = 0; j <= 18; j++) if (j % 3 !== 2) { pset(hx, hy + j, hex('#a89a7a')); pset(hx + 23, hy + j, hex('#a89a7a')); }
    j_spr(R, ['.###.', '#...#', '...#.', '..#..', '.....', '..#..'], hx + 9, hy + 6, { '#': hex('#a89a7a') }); }
  const u = Math.min(1, p), cx = Math.round(lerp(266, hx, u)), cy = Math.round(lerp(132, hy, u) - Math.sin(u * Math.PI) * 14);
  if (p > 0) { j_cromo(R, cx, cy, 6, t, true); if (p >= 1) for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.57, r = 14 + Math.sin(t * 4 + k) * 2; pset(Math.round(cx + 12 + Math.cos(a) * r), Math.round(cy + 9 + Math.sin(a) * r * 0.6), hex('#fff6a0')); } }
  // el teclado con su ola de luz y el móvil que se enciende
  for (let i = 0; i < 26; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) pset(5 + i * 2 + j, 117 + j * 2, j_mezcla(hex('#6a5aff'), hex('#3ae0ff'), (Math.sin(t * 3 - i * 0.4 + j) + 1) / 2));
  if ((t % 6) < 2) { rect(294, 158, 310, 164, hex('#4a7ad0')); rect(295, 159, 298, 162, hex('#ffffff')); rect(300, 159, 309, 159, hex('#c8dcff')); rect(300, 161, 306, 161, hex('#c8dcff')); }
  return { carta: p > 0 ? [cx + 12, cy + 9] : [274, 148], hueco: [hx, hy, hx + 23, hy + 18] };
}

// el techo y el suelo del río de la cueva real (perfiles que no son rectos)
const j_techo = (x) => Math.round(14 + 6 * Math.sin(x * 0.03) + 4 * Math.sin(x * 0.11 + 1));

const j_orilla = (x) => Math.round(117 + 2 * Math.sin(x * 0.07) + Math.sin(x * 0.23));

// las estalactitas de la cueva general: [x, largo, ancho]
const j_ESTALACTITAS = [[14, 22, 7], [34, 34, 9], [52, 16, 5], [70, 44, 10], [92, 20, 6], [118, 30, 8], [146, 48, 11], [170, 18, 6], [192, 36, 9], [210, 14, 5], [246, 28, 8], [262, 18, 6]];

// una estalactita (o estalagmita si dir = -1) con su cara iluminada, su cara en sombra, el contorno y la punta mojada;
// T = la paleta de tonos, n = el tono de su luz
function j_estalactita(R, x, y, largo, ancho, T, n, dir = 1) {
  const { poligono, pset, linea } = R, tip = y + largo * dir, a = Math.max(0, n - 2), b = Math.min(T.length - 1, n), c = Math.min(T.length - 1, n + 1);
  poligono([[x - ancho / 2 - 1, y], [x + ancho / 2 + 1, y], [x, tip + dir]], T[0]);
  poligono([[x - ancho / 2, y], [x, y], [x, tip]], c); poligono([[x, y], [x + ancho / 2, y], [x, tip]], a);
  poligono([[x - ancho / 4, y], [x + ancho / 6, y], [x + 0.5, tip - largo * 0.35 * dir]], b);
  for (let k = 1; k < 4; k++) { const yy = Math.round(y + largo * k / 4 * dir); linea(Math.round(x - ancho / 2 * (1 - k / 4)), yy, Math.round(x - ancho / 2 * (1 - k / 4)) + 1, yy, T[Math.max(0, a - 1)]); }
  linea(Math.round(x - ancho / 2) + 1, y, Math.round(x), Math.round(tip) - dir, T[Math.min(T.length - 1, n + 2)]);
  if (dir > 0) pset(Math.round(x), Math.round(tip), T[Math.min(T.length - 1, n + 2)]);
}

function j_cuevaReal(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, cam = o.camara ?? 'general';
  if (cam === 'mapa') {
    j_fondo(R, 'cueva-real-mapa', () => j_cuevaMapaFijo(R));
    // la gota de la estalactita que cae al charco de la roca, y sus ondas
    { const ph = (t % 2.6) / 2.6, gx = 250; if (ph < 0.4) { const gy = Math.round(46 + ph / 0.4 * 84); pset(gx, gy, j_C.aguaL); pset(gx, gy - 1, j_C.agua2); } else { const r = (ph - 0.4) * 14; for (let a = 0; a < 6.28; a += 0.4) pset(Math.round(gx + Math.cos(a) * r), Math.round(136 + Math.sin(a) * r * 0.3), j_C.aguaL); } }
    // motas de polvo que suben con el calor de la lámpara y la cuerda del pasadizo, que se mece
    for (let k = 0; k < 16; k++) { const u = (h(k, 1, 895) + t * 0.05 * (1 + h(k, 2, 895))) % 1, x = Math.round(206 + h(k, 3, 895) * 60 + Math.sin(t * 0.9 + k) * 4), y = Math.round(120 - u * 100); if (Math.sin(t * 1.7 + k * 2) > -0.3) pset(x, y, u < 0.5 ? hex('#ffe8b0') : hex('#c8a870')); }
    { const m = Math.sin(t * 0.8) * 1.5; for (let y = 40; y < 100; y++) pset(64 + Math.round(Math.sin(y * 0.3) * 0.6 + m * (y - 40) / 60), y, j_C.r6); }
    // el pasadizo oscuro: de vez en cuando brillan dos ojillos de murciélago
    if ((t % 8) < 1.2) { pset(56, 66, hex('#f8d040')); pset(59, 66, hex('#f8d040')); }
    return { suelo: 137, puesto: 112, mesa: [40, 128, 280], cuaderno: [128, 131, 212, 149], lampara: [236, 118], pasadizo: [38, 40, 82, 100] };
  }
  j_fondo(R, 'cueva-real', () => j_cuevaRealFijo(R));
  // la luz de la boca: polvo que flota en sus rayos
  for (let k = 0; k < 14; k++) { const u = (h(k, 1, 880) + t * 0.02 * (1 + h(k, 2, 880))) % 1, x = Math.round(270 - u * 110 + Math.sin(t * 0.7 + k) * 3), y = Math.round(80 + u * 60 + h(k, 3, 880) * 14); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#e8f0d8')); }
  // el río: corrientes que van a la izquierda y los reflejos que tiemblan (la lámpara y la boca)
  for (let y = 119; y < 132; y++) for (let x = 0; x < 320; x++) { if (y < j_orilla(x) + 2) continue; const fl = (x + t * 14 + y * 7) % 41; if (fl < 3 && (y & 1)) pset(x, y, j_C.agua2);
    if (y & 1) continue; const rl = Math.exp(-Math.abs(x - 96) / 14), rm = Math.exp(-Math.abs(x - 270) / 20) * 0.8, s = Math.sin(Math.floor(x / 3) * 1.7 + t * 3 + y * 2.3) * Math.sin(t * 1.3 + y); if (s > 0.35 && rl > 0.25) pset(x, y, rl > 0.6 ? hex('#ffd890') : hex('#c89a50')); else if (s > 0.4 && rm > 0.25) pset(x, y, rm > 0.5 ? hex('#d8f0e0') : j_C.aguaL); }
  // gotas que caen de tres estalactitas al río, con su onda
  for (const [k, x, larg] of [[0, 70, 44], [1, 146, 48], [2, 192, 36]]) { const per = 2.2 + k * 0.7, ph = ((t + k * 0.9) % per) / per, y0 = j_techo(x) + larg + 1, ya = 124;
    if (ph < 0.35) { const gy = Math.round(y0 + (ph / 0.35) ** 2 * (ya - y0)); pset(x, gy, j_C.aguaL); pset(x, gy - 1, j_C.agua2); }
    else { const r = (ph - 0.35) * 16; for (let a = 0; a < 6.28; a += 0.35) pset(Math.round(x + Math.cos(a) * r), Math.round(ya + Math.sin(a) * r * 0.25), ph < 0.7 ? j_C.aguaL : j_C.agua2); } }
  // los murciélagos: uno colgado que se rebulle y otro que cruza de vez en cuando
  { const bx = 128, by = j_techo(128) + 1, m = Math.sin(t * 3) > 0.8 ? 1 : 0; rect(bx - 1, by, bx + 1, by + 4, hex('#140e12')); pset(bx - 2 - m, by + 1, hex('#140e12')); pset(bx + 2 + m, by + 1, hex('#140e12')); pset(bx, by + 4, hex('#3a2a2a')); }
  { const u = (t % 9) / 2.5; if (u < 1) { const x = Math.round(-6 + u * 300), y = Math.round(40 + Math.sin(u * 9) * 8), a = Math.sin(t * 20) > 0; pset(x, y, hex('#140e12')); pset(x + 1, y, hex('#140e12')); pset(x - 1, y - (a ? 1 : -1), hex('#140e12')); pset(x + 2, y - (a ? 1 : -1), hex('#140e12')); pset(x - 2, y - (a ? 2 : 0), hex('#140e12')); pset(x + 3, y - (a ? 2 : 0), hex('#140e12')); } }
  // la lámpara de latón: la llama que tiembla y su luz
  const fl = 0.85 + 0.15 * Math.sin(t * 11) * Math.sin(t * 7.3);
  j_halo(R, 96, 134, 34 * fl, hex('#ffc870'), 0.32);
  { const lx = 96, ly = 136; disco(lx, ly - 2, 2.2 * fl, j_C.llamaR); disco(lx, ly - 2, 1.4 * fl, j_C.llama); pset(lx, ly - 3 - Math.round(fl), j_C.llamaL); pset(lx, ly - 1, j_C.llamaL); }
  // el haz de la linterna del casco
  if (o.linterna) { const [lx, ly, d] = o.linterna, B = R.buf; for (let i = 4; i < 110; i++) { const x = Math.round(lx + i * d); if (x < 0 || x > 319) break; const sp = i * 0.32; for (let j = Math.round(-sp); j <= Math.round(sp); j++) { const y = Math.round(ly + i * 0.18 + j); if (y < 0 || y > 179) continue; const q = (1 - i / 110) * (1 - Math.abs(j) / (sp + 1)) * 0.75; if (j_u(x, y) < q) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#fff0c0'), 0.35); } } }
  // el cable que sale de junto al explorador y se va por el suelo, con un pulso de luz
  let cable = null;
  if (o.cable) { const pts = [[o.cableDe?.[0] ?? 152, o.cableDe?.[1] ?? 156], [190, 162], [232, 158], [276, 152], [322, 150]], L = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(l); tot += l; }
    const hasta = tot * Math.min(1, o.cable); let acc = 0;
    for (let i = 1; i < pts.length && acc < hasta; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], f = Math.min(1, (hasta - acc) / L[i - 1]), ex = ax + (bx - ax) * f, ey = ay + (by - ay) * f; linea(ax, ay + 1, ex, ey + 1, hex('#0e0a0a')); linea(ax, ay, ex, ey, hex('#2a2a3a')); acc += L[i - 1]; cable = [Math.round(ex), Math.round(ey)]; }
    const pu = (t * 0.6) % 1; if (pu * tot < hasta) { let a2 = 0; for (let i = 1; i < pts.length; i++) { if (pu * tot <= a2 + L[i - 1]) { const f = (pu * tot - a2) / L[i - 1]; const px = Math.round(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f), py = Math.round(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); disco(px, py, 1.6, hex('#8af0a0')); pset(px, py, hex('#ffffff')); break; } a2 += L[i - 1]; } } }
  return { suelo: 156, puesto: 140, lampara: [96, 136], rio: [0, 117, 319, 132], boca: [250, 56, 302, 116], cable, libre: [[110, 290]] };
}

// lo fijo de la cueva general: la caliza en estratos con la luz de la lámpara y la de la boca, el techo, las estalactitas,
// la colada de la pared, la columna, la boca con el día y los helechos, los rayos que entran, los cristales, el río
// oscuro con las estalagmitas de la otra orilla, la repisa del suelo con guijarros y charcos, la roca con la lámpara, la
// cuerda y la mochila
function j_cuevaRealFijo(R) {
  const { rect, pset, disco, poligono, linea } = R, B = R.buf, T = [j_C.r0, j_C.r1, j_C.r2, j_C.r3, j_C.r4, j_C.r5, j_C.r6];
  const luz = (x, y) => 0.45 + 3.5 * Math.exp(-Math.hypot(x - 96, (y - 134) * 1.3) / 80) + 2.6 * Math.exp(-Math.hypot(x - 270, (y - 92) * 0.9) / 52);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tc = j_techo(x), orl = j_orilla(x); let n = luz(x, y) + j_u(x, y) * 0.9 - 0.2;
    if (y < tc) n -= 1.4 + (tc - y) * 0.05;
    else if (y < orl) { const banda = Math.floor((y + 4 * Math.sin(x * 0.05) + 2 * Math.sin(x * 0.17)) / 6); n += banda % 3 === 0 ? 0.6 : banda % 3 === 1 ? -0.3 : 0; if (h(banda, x >> 3, 881) < 0.05 && (y + Math.round(4 * Math.sin(x * 0.05))) % 6 === 0) n -= 1.5; }
    else if (y < 133) { const f = (y - orl) / (133 - orl); B[y * 320 + x] = f < 0.15 ? j_C.agua2 : j_u(x, y) < f ? j_C.agua0 : j_C.agua1; continue; }
    else { n += (y === 133 || y === 134) ? 1.2 : 0.3 - (y - 134) * 0.008; if (h(x >> 1, y >> 1, 882) < 0.06) n -= 1; if (h(x >> 2, y >> 1, 883) > 0.95) n += 1; }
    n += (h(x >> 1, y >> 1, 884) - 0.5) * 0.6; B[y * 320 + x] = T[Math.max(0, Math.min(6, Math.floor(n)))];
  }
  // la colada de la pared: cortinas de piedra clara
  for (let x = 150; x < 196; x++) { const al = 40 + Math.round(30 * Math.sin((x - 150) / 46 * Math.PI)); for (let y = j_techo(x) + 4; y < j_techo(x) + al; y++) if (((x + Math.round(Math.sin(y * 0.2) * 1.5)) % 4) === 0) { const n = Math.floor(luz(x, y) + 1 + j_u(x, y) * 0.8); pset(x, y, T[Math.max(0, Math.min(6, n))]); } }
  // la columna: una estalactita y una estalagmita que se han juntado
  for (let y = j_techo(226); y < j_orilla(226); y++) { const w = 4 + Math.round(3 * Math.abs(Math.sin(y * 0.07)) + (y > 90 ? (y - 90) * 0.15 : 0) + (y < 30 ? (30 - y) * 0.2 : 0)); for (let x = 226 - w; x <= 226 + w; x++) { const s = (x - 226) / w, n = Math.floor(luz(x, y) + 1.2 - s * 1.4 + j_u(x, y) * 0.8); pset(x, y, Math.abs(s) > 0.9 ? T[0] : T[Math.max(0, Math.min(6, n))]); } }
  // la boca de la cueva con el día: el cielo pálido, el monte, los helechos y el borde de roca iluminado
  for (let y = 54; y <= 118; y++) for (let x = 244; x <= 308; x++) { const e = ((x - 276) / 24) ** 2 + ((y - 88) / 31) ** 2 + (h(x >> 2, y >> 2, 885) - 0.5) * 0.25; if (e > 1) { if (e < 1.3) pset(x, y, T[Math.min(6, 4 + (e < 1.12 ? 1 : 0) + (j_u(x, y) < 0.5 ? 1 : 0))]); continue; }
    const f = (y - 56) / 60; let c = j_u(x, y) < f ? hex('#b8dcc0') : hex('#e2f0e0'); if (y > 96 - Math.round(6 * Math.sin(x * 0.2))) c = j_u(x, y) < 0.5 ? hex('#5a8a5a') : hex('#6a9a62'); if (y > 108) c = hex('#4a7a4a'); pset(x, y, c); }
  for (const [x, l, w] of [[258, 10, 5], [270, 6, 4], [284, 12, 6], [296, 7, 4]]) { let yy = 54; while (yy < 100 && ((x - 276) / 24) ** 2 + ((yy - 88) / 31) ** 2 > 1) yy++; j_estalactita(R, x, yy - 2, l, w, T, 5); }
  for (let y = 64; y < 92; y++) { const tx = 290 + Math.round(Math.sin(y * 0.3)); pset(tx, y, hex('#4a6a4a')); if (y % 4 === 0) { pset(tx - 1, y, hex('#5a8a5a')); pset(tx + 1, y + 1, hex('#5a8a5a')); } }
  for (let k = 0; k < 6; k++) { const fx = 250 + k * 10, fy = 116; for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.35; linea(fx, fy, Math.round(fx + Math.cos(a) * 8), Math.round(fy + Math.sin(a) * 9), k % 2 ? hex('#2a4a2a') : hex('#3a5a32')); } }
  // los rayos de luz que entran por la boca
  for (let y = 60; y < 170; y++) for (let x = 120; x < 280; x++) { const s = (x - 276) + (y - 88) * 1.15, k = Math.floor((s + 400) / 12); if (s > -2 || s < -150 || y < 60 + (276 - x) * 0.1) continue; const fr = (s + 400) % 12; if ((k % 3 === 0 && fr < 6) && j_u(x, y) < 0.32 * (1 + s / 150)) B[y * 320 + x] = j_mezcla(B[y * 320 + x], hex('#e8f0d8'), 0.22); }
  // las estalactitas del techo y las estalagmitas de la otra orilla
  for (const [x, l, w] of j_ESTALACTITAS) j_estalactita(R, x, j_techo(x) - 1, l, w, T, Math.max(1, Math.min(5, Math.floor(luz(x, j_techo(x) + l / 2) + 1))));
  for (const [x, l, w] of [[22, 14, 7], [44, 20, 8], [180, 12, 6], [204, 18, 8], [300, 10, 6]]) j_estalactita(R, x, j_orilla(x) + 1, l, w, T, Math.max(1, Math.min(5, Math.floor(luz(x, j_orilla(x) - l / 2) + 1))), -1);
  // los cristales de la pared, junto a la lámpara
  for (const [cx, cy, l, a] of [[30, 108, 9, -1.9], [34, 110, 12, -1.6], [38, 109, 8, -1.2], [26, 111, 6, -2.4], [42, 111, 6, -0.9]]) { const ex = Math.round(cx + Math.cos(a) * l), ey = Math.round(cy + Math.sin(a) * l); poligono([[cx - 2, cy], [cx + 2, cy], [ex + 1, ey], [ex - 1, ey]], hex('#6a4a8a')); linea(cx - 1, cy, ex - 1, ey, hex('#c8a8f0')); pset(ex, ey, hex('#ffffff')); }
  // la repisa: guijarros, charcos que reflejan, la roca con la lámpara de latón, la cuerda enrollada y la mochila
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 886) * 316), y = 138 + Math.round(h(k, 2, 886) ** 0.8 * 40), r = 1 + Math.round(h(k, 3, 886) * 1.6), n = Math.floor(luz(x, y) + 1.4); disco(x, y, r, T[Math.max(0, Math.min(6, n - 1))]); pset(x - 1, y - r + 1, T[Math.max(0, Math.min(6, n + 1))]); }
  for (const [cx, cy, rx] of [[176, 168, 12], [60, 172, 9], [270, 162, 10]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - rx; x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / 2.5) ** 2 < 1) pset(x, y, (y === cy - 1 && Math.abs(x - cx) < rx * 0.4) ? hex('#c8b890') : j_C.agua1);
  { poligono([[82, 148], [86, 140], [102, 138], [110, 144], [108, 156], [84, 156]], T[0]); poligono([[84, 147], [88, 141], [101, 139], [108, 145], [106, 155], [85, 155]], T[4]); poligono([[88, 141], [101, 139], [104, 143], [90, 145]], T[6]); linea(92, 150, 100, 152, T[2]);
    rect(93, 131, 99, 140, hex('#1c1222')); rect(94, 132, 98, 139, j_C.laton); rect(94, 132, 94, 139, j_C.latonL); rect(95, 133, 97, 137, hex('#fff0c0')); rect(92, 140, 100, 141, j_C.latonS); rect(93, 129, 99, 130, j_C.latonS); linea(94, 128, 96, 125, j_C.latonS); linea(98, 128, 96, 125, j_C.latonS); }
  for (let k = 0; k < 4; k++) for (let a = 0; a < 6.28; a += 0.25) pset(Math.round(206 + Math.cos(a) * (7 - k * 1.4)), Math.round(162 + Math.sin(a) * (2.6 - k * 0.5)), k % 2 ? hex('#c8a060') : hex('#a8803a'));
  { poligono([[232, 160], [234, 144], [248, 144], [250, 160]], hex('#1c1222')); poligono([[233, 159], [235, 145], [247, 145], [249, 159]], hex('#7a6a3a')); rect(236, 150, 246, 157, hex('#5e5030')); rect(236, 150, 246, 150, hex('#9a8a5a')); rect(238, 143, 244, 145, hex('#3a3020')); }
}

// las rocas de primer plano de la cueva general (por delante de los personajes): una masa oscura a la izquierda y una
// estalagmita a la derecha, con el filo iluminado por la lámpara
function j_cuevaRealDelante(R, t, o) {
  j_delante(R, 'cueva-real-delante', () => {
    const { pset } = R;
    for (let y = 112; y < 180; y++) { const xl = Math.round(10 + 10 * Math.sin((y - 112) * 0.05) + (y - 112) * 0.25); for (let x = 0; x <= xl; x++) pset(x, y, x >= xl - 1 ? j_C.r3 : (h(x >> 1, y >> 1, 887) < 0.1 ? j_C.r1 : j_C.r0)); }
    for (let y = 120; y < 180; y++) { const w = Math.round((y - 120) * 0.22 + 2); for (let x = 312 - w; x <= 319; x++) pset(x, y, x <= 312 - w + 1 ? j_C.r2 : j_C.r0); }
  });
}

// lo fijo de la cueva de cerca (el explorador dibuja el mapa): la pared de estratos grandes con la luz de la lámpara de
// carburo, el techo con dos estalactitas, el pasadizo oscuro que queda por explorar con una cuerda que baja
function j_cuevaMapaFijo(R) {
  const { pset, linea } = R, B = R.buf, T = [j_C.r0, j_C.r1, j_C.r2, j_C.r3, j_C.r4, j_C.r5, j_C.r6];
  const luz = (x, y) => 4 * Math.exp(-Math.hypot(x - 236, (y - 110) * 1.2) / 90) + 1.6 * Math.exp(-Math.hypot(x - 112, y - 100) / 50);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const tc = 10 + Math.round(5 * Math.sin(x * 0.04) + 3 * Math.sin(x * 0.13)); let n = luz(x, y) + j_u(x, y) * 0.9 - 0.3;
    if (y < tc) n -= 1.6; else { const banda = Math.floor((y + 6 * Math.sin(x * 0.03) + 2 * Math.sin(x * 0.11)) / 10); n += banda % 3 === 0 ? 0.6 : banda % 3 === 1 ? -0.4 : 0; if ((y + Math.round(6 * Math.sin(x * 0.03))) % 10 === 0) n -= 0.8; if (h(banda, x >> 2, 888) < 0.04) n -= 1.4; }
    const e = ((x - 60) / 22) ** 2 + ((y - 70) / 30) ** 2 + (h(x >> 2, y >> 2, 889) - 0.5) * 0.45 + 0.12 * Math.sin(y * 0.25); if (e < 1) { B[y * 320 + x] = e < 0.7 ? hex('#060404') : T[0]; continue; } else if (e < 1.25) n += 1.2;
    n += (h(x >> 1, y >> 1, 890) - 0.5) * 0.6; B[y * 320 + x] = T[Math.max(0, Math.min(6, Math.floor(n)))];
  }
  for (let y = 40; y < 100; y++) pset(64 + Math.round(Math.sin(y * 0.3) * 0.6), y, j_C.r5);
  for (let k = 0; k < 4; k++) pset(64, 46 + k * 14, j_C.r6);
  for (const [x, l, w] of [[250, 34, 12], [196, 18, 7], [292, 22, 8], [150, 12, 6]]) j_estalactita(R, x, 8 + Math.round(5 * Math.sin(x * 0.04) + 3 * Math.sin(x * 0.13)), l, w, T, Math.max(1, Math.min(5, Math.floor(luz(x, 30) + 1))));
  for (let k = 0; k < 6; k++) { const x = 140 + k * 26, y = 40 + (k * 13) % 30; linea(x, y, x + 6, y + 1, j_C.r5); }
}

// la roca plana del mapa por delante del explorador (con los pies en y 137): el tablero de piedra con su luz, el frente
// agrietado, el charco con sus ondas, el cuaderno abierto en el que se dibuja el mapa (o.dibujo 0–1; devuelve la punta
// del lápiz), la lámpara de carburo con su llama, la brújula con la aguja que tiembla, la vela, las tizas y la cuerda
function j_rocaMapaDelante(R, t, o) {
  const { rect, pset, disco, poligono, linea } = R, T = [j_C.r0, j_C.r1, j_C.r2, j_C.r3, j_C.r4, j_C.r5, j_C.r6];
  j_delante(R, 'cueva-roca-delante', () => {
    for (let y = 128; y < 180; y++) { const xa = Math.round(40 - (y - 128) * 0.5 + Math.sin(y * 0.4) * 2), xb = Math.round(280 + (y - 128) * 0.4 + Math.sin(y * 0.3) * 2);
      for (let x = Math.max(0, xa); x <= Math.min(319, xb); x++) { const top = y < 150, l = 3.4 * Math.exp(-Math.hypot(x - 236, (y - 130) * 2) / 110); let n = (top ? 2.6 + l : 1.2 + l * 0.6 - (y - 150) * 0.03) + j_u(x, y) * 0.9 + (h(x >> 1, y >> 1, 891) - 0.5) * 0.7;
        if (y === 150 || y === 151) n += 1.4; if (!top && h(x >> 3, y >> 2, 892) < 0.08) n -= 1.5; if (x <= xa + 1 || x >= xb - 1) n = 0.5; pset(x, y, T[Math.max(0, Math.min(6, Math.floor(n)))]); } }
    for (let k = 0; k < 5; k++) { let x = 60 + k * 48, y = 152; for (let i = 0; i < 14; i++) { const nx = x + Math.round((h(k, i, 893) - 0.5) * 4), ny = y + 2; linea(x, y, nx, ny, T[0]); x = nx; y = ny; } }
    for (let y = 134; y <= 138; y++) for (let x = 242; x <= 258; x++) if (((x - 250) / 8) ** 2 + ((y - 136) / 2.4) ** 2 < 1) pset(x, y, y === 135 ? j_C.aguaL : j_C.agua1);
    // el cuaderno abierto, de papel cuadriculado, con su espiral
    poligono([[130, 131], [210, 131], [214, 149], [126, 149]], hex('#141010')); poligono([[131, 132], [209, 132], [212, 148], [128, 148]], hex('#ece2c4'));
    for (let y = 134; y < 148; y += 3) linea(130 - Math.round((y - 132) * 0.15), y, 210 + Math.round((y - 132) * 0.15), y, hex('#cfd8d8')); for (let x = 134; x < 210; x += 4) linea(x, 133, x - Math.round((x - 170) * -0.04), 147, hex('#d8dcd0'));
    for (let y = 132; y < 149; y += 2) { pset(170, y, hex('#8a8a94')); pset(171, y, hex('#c8c8d0')); }
    // la lámpara de carburo, la brújula, la vela, las tizas y la cuerda
    rect(229, 116, 243, 135, hex('#141010')); rect(230, 117, 242, 134, j_C.laton); rect(230, 117, 231, 134, j_C.latonL); rect(241, 117, 242, 134, j_C.latonS); rect(230, 124, 242, 125, j_C.latonS); disco(236, 114, 6, hex('#141010')); disco(236, 114, 5, j_C.latonL); disco(236, 114, 3, hex('#fff6d0')); rect(228, 135, 244, 137, j_C.latonS);
    disco(78, 140, 6, hex('#141010')); disco(78, 140, 5, hex('#c8c0a8')); disco(78, 140, 4, hex('#f2eee2')); pset(78, 136, hex('#c83a3a'));
    rect(94, 134, 98, 142, hex('#141010')); rect(95, 135, 97, 142, hex('#f0e8d0')); rect(93, 142, 99, 143, j_C.r2);
    for (const [x, y, c] of [[106, 145, hex('#f2f2f2')], [111, 146, hex('#e8a0a0')]]) { linea(x, y, x + 5, y - 1, hex('#141010')); linea(x, y - 1, x + 5, y - 2, c); }
    for (let k = 0; k < 4; k++) for (let a = 0; a < 6.28; a += 0.25) pset(Math.round(266 + Math.cos(a) * (9 - k * 1.8)), Math.round(141 + Math.sin(a) * (3 - k * 0.6)), k % 2 ? hex('#c8a060') : hex('#a8803a'));
  });
  // el mapa que se va dibujando: pasadizos de doble raya, salas, el río a lápiz azul, la flecha del norte y las cotas
  const d = o.dibujo ?? 0.5, X = (u) => Math.round(134 + u * 74), Y = (v) => Math.round(134 + v * 12), ink = hex('#3a3040');
  const ruta = [[0.02, 0.5], [0.18, 0.4], [0.3, 0.55], [0.44, 0.3], [0.58, 0.35], [0.7, 0.7], [0.84, 0.6], [0.96, 0.4]];
  const per = ruta.length - 1, hasta = Math.min(1, d / 0.75) * per; let lapiz = [X(ruta[0][0]), Y(ruta[0][1])];
  for (let i = 0; i < per && i < hasta; i++) { const f = Math.min(1, hasta - i), [a, b] = ruta[i], [c, e] = ruta[i + 1], ex = X(a + (c - a) * f), ey = Y(b + (e - b) * f); linea(X(a), Y(b) - 1, ex, ey - 1, ink); linea(X(a), Y(b) + 1, ex, ey + 1, ink); lapiz = [ex, ey]; }
  for (const [k, u, v, r] of [[2, 0.3, 0.55, 3], [4, 0.58, 0.35, 4], [6, 0.84, 0.6, 3]]) if (hasta > k) { for (let a = 0; a < 6.28; a += 0.3) pset(Math.round(X(u) + Math.cos(a) * r * 1.4), Math.round(Y(v) + Math.sin(a) * r * 0.7), ink); j_cifras(R, k, X(u) - 1, Y(v) - 7, ink); }
  if (d > 0.78) { const u = Math.min(1, (d - 0.78) / 0.12); for (let x = X(0.35); x < X(0.35 + 0.35 * u); x++) pset(x, Y(0.88) + ((x >> 1) % 2), hex('#3a6ab8')); }
  if (d > 0.92) { const nx = X(0.06), ny = Y(0.1); linea(nx, ny + 4, nx, ny - 2, ink); pset(nx - 1, ny - 1, ink); pset(nx + 1, ny - 1, ink); }
  if (d >= 0.75 && d < 1) lapiz = d < 0.9 ? [X(0.35 + 0.35 * Math.min(1, (d - 0.78) / 0.12)), Y(0.88)] : [X(0.06), Y(0.1)];
  // la llama de la lámpara de carburo, la de la vela, y la aguja de la brújula que tiembla
  const fl = Math.sin(t * 13) * Math.sin(t * 8.1); j_halo(R, 236, 110, 40, hex('#ffd890'), 0.25 + fl * 0.04);
  disco(236, 107, 2 + fl * 0.4, j_C.llamaR); disco(236, 107, 1.2, j_C.llama); pset(236, 105 - (fl > 0 ? 1 : 0), j_C.llamaL);
  pset(96, 133, j_C.llama); pset(96, 132 - (fl > 0.2 ? 1 : 0), j_C.llamaL); pset(96, 134, j_C.llamaR);
  { const a = -Math.PI / 2 + Math.sin(t * 2.3) * 0.25; linea(78, 140, Math.round(78 + Math.cos(a) * 3), Math.round(140 + Math.sin(a) * 3), hex('#c83a3a')); linea(78, 140, Math.round(78 - Math.cos(a) * 3), Math.round(140 - Math.sin(a) * 3), hex('#3a3a4a')); }
  return { lapiz, cuaderno: [128, 131, 212, 149] };
}

const j_RAMPA = ['#120c2a', '#1c1442', '#281e5a', '#362874', '#46368e', '#4248a2', '#3a64aa', '#3a86b0', '#48a8b8'].map(hex);

// la misma cueva, hecha de polígonos planos: la pared y el techo en una malla de triángulos con sombreado plano, los
// haces de luz que bajan de un agujero del techo con su polvo, las estalactitas facetadas, la columna, los cristales que
// laten, el río turquesa con sus reflejos, el suelo de facetas y la lámpara en su roca, que brilla; luciérnagas
function j_cueva3d(R, t, o) {
  const { pset, disco } = R, cam = o.camara ?? 'general';
  if (cam === 'mapa') return j_vistaGafas(R, t, o);
  j_fondo(R, 'cueva-3d', () => j_cueva3dFijo(R));
  const B = R.buf;
  // el río: bandas que corren y los reflejos de la lámpara
  for (let y = 119; y < 133; y++) for (let x = 0; x < 320; x++) { const s = (x + t * 16 + (y % 3) * 11) % 29; if (s < 5 && (y % 3) === 1) B[y * 320 + x] = j_C.rioL; else if ((y % 3) === 2 && Math.abs(x - 96) < 16 - (y - 119) * 0.4 && Math.sin(Math.floor(x / 3) * 1.9 + t * 3 + y) > 0.3) B[y * 320 + x] = hex('#ffe0a0'); }
  // los haces de luz con su polvo
  for (let y = 10; y < 170; y++) for (let x = 0; x < 320; x++) { const s = x - 214 + (y - 10) * 0.55; if (s > 0 || s < -54) continue; const k = Math.floor(-s / 18), fr = (-s) % 18; if (fr > 11) continue; const q = (0.22 + 0.06 * Math.sin(t * 0.8 + k * 1.7)) * (1 - y / 190); if (j_u(x, y) < q * 2.2) B[y * 320 + x] = j_mezcla(B[y * 320 + x], j_C.haz, 0.3); }
  for (let k = 0; k < 16; k++) { const u = (h(k, 1, 900) + t * 0.03 * (1 + h(k, 2, 900))) % 1, y = Math.round(14 + u * 150), x = Math.round(214 - (y - 10) * 0.55 - 6 - h(k, 3, 900) * 40 + Math.sin(t + k) * 2); pset(x, y, hex('#fff8e0')); }
  // los cristales que laten
  for (const [cx, cy, c, f] of [[34, 108, j_C.cristalC, 0], [300, 112, j_C.cristalM, 1.3], [256, 150, j_C.cristalC, 2.1], [62, 34, j_C.cristalM, 0.7]]) { const p = 0.5 + 0.5 * Math.sin(t * 2 + f); j_halo(R, cx, cy - 4, 14 + p * 4, c, 0.25 + p * 0.15); pset(cx, cy - 8, hex('#ffffff')); }
  // la lámpara: un halo cálido grande que respira
  { const p = 0.9 + 0.1 * Math.sin(t * 3); j_halo(R, 96, 132, 40 * p, hex('#ffcc70'), 0.38); disco(96, 133, 3, hex('#fff2b0')); pset(96, 132, hex('#ffffff')); }
  // luciérnagas
  for (let k = 0; k < 12; k++) { const x = Math.round((h(k, 1, 901) * 320 + Math.sin(t * 0.6 + k) * 14 + t * 3) % 320), y = Math.round(60 + h(k, 2, 901) * 90 + Math.sin(t * 1.1 + k * 2) * 6); if (x > 270 && y < 48) continue; const b = Math.sin(t * 3 + k * 1.7); if (b > -0.3) { pset(x, y, b > 0.5 ? hex('#fffcc0') : hex('#c8f0a0')); if (b > 0.8) { pset(x + 1, y, hex('#a8d880')); pset(x - 1, y, hex('#a8d880')); } } }
  return { suelo: 156, puesto: 150, lampara: [96, 133], rio: [0, 118, 319, 132], libre: [[110, 290]] };
}

// lo fijo de la cueva en 3D: la malla de la pared y el techo (triángulos de sombreado plano, más claros cerca de la
// lámpara y de la luz del techo), el agujero del techo, las estalactitas y estalagmitas facetadas, la columna, los
// cristales, el río y el suelo de facetas, la roca de la lámpara y la lámpara de latón
function j_cueva3dFijo(R) {
  const { poligono, pset, disco, linea, rect } = R, B = R.buf, RA = j_RAMPA;
  const luz = (x, y) => 2.6 * Math.exp(-Math.hypot(x - 96, y - 132) / 70) + 2.2 * Math.exp(-Math.hypot(x - 180, y - 70) / 70);
  const tono = (x, y, s) => RA[Math.max(0, Math.min(8, Math.round(y < 20 ? 0.5 : 1.2 + (y / 118) * 2.4 + luz(x, y) + s)))];
  // la malla
  const P = []; for (let j = 0; j <= 8; j++) { P.push([]); for (let i = 0; i <= 15; i++) P[j].push([i * 23 - 12 + (j % 2) * 11 + Math.round((h(i, j, 902) - 0.5) * 12), j * 16 - 6 + Math.round((h(i, j, 903) - 0.5) * 10)]); }
  for (let j = 0; j < 8; j++) for (let i = 0; i < 15; i++) { const a = P[j][i], b = P[j][i + 1], c = P[j + 1][i], d = P[j + 1][i + 1];
    for (const [tri, k] of [[[a, b, c], 0], [[b, d, c], 1]]) { const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3; poligono(tri, tono(cx, cy, (h(i, j * 2 + k, 904) - 0.5) * 1.6)); } }
  // el agujero del techo con el cielo
  poligono([[198, 0], [236, 0], [232, 8], [204, 9]], hex('#d8f4ff')); poligono([[204, 2], [228, 2], [226, 6], [208, 7]], hex('#ffffff')); linea(198, 0, 204, 9, RA[5]); linea(204, 9, 232, 8, RA[6]);
  // el río (bandas limpias) y la orilla
  for (let y = 117; y < 133; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y < 119 ? j_C.rioS : (y % 3 === 0 ? j_C.rioS : j_C.rio);
  for (let x = 0; x < 320; x += 1) pset(x, 117, RA[7]);
  // el suelo de facetas
  const S = [j_C.suelo3S, j_C.suelo3, j_C.suelo3L, hex('#9a80c0')]; const Q = [];
  for (let j = 0; j <= 4; j++) { Q.push([]); for (let i = 0; i <= 12; i++) Q[j].push([i * 30 - 15 + (j % 2) * 15 + Math.round((h(i, j, 905) - 0.5) * 10), 133 + Math.round(j * j * 3.3) + (j ? Math.round((h(i, j, 906) - 0.5) * 4) : 0)]); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) { const a = Q[j][i], b = Q[j][i + 1], c = Q[j + 1][i], d = Q[j + 1][i + 1];
    for (const [tri, k] of [[[a, b, c], 0], [[b, d, c], 1]]) { const cx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3, cy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3, l = 1.6 * Math.exp(-Math.hypot(cx - 96, cy - 140) / 70); poligono(tri, S[Math.max(0, Math.min(3, Math.round(1 + l + (h(i, j * 2 + k, 907) - 0.5) * 1.4)))]); } }
  for (let x = 0; x < 320; x++) pset(x, 133, j_C.suelo3L);
  // las estalactitas facetadas y la columna
  const fac = (x, y, l, w, dir) => { const tip = y + l * dir; poligono([[x - w / 2, y], [x, y], [x, tip]], tono(x - 2, y + l / 2, 1.2)); poligono([[x, y], [x + w / 2, y], [x, tip]], tono(x + 2, y + l / 2, -0.8)); poligono([[x - w / 4, y], [x + w / 6, y], [x, y + l * 0.55 * dir]], tono(x, y + l / 3, 0.4)); };
  for (const [x, l, w] of j_ESTALACTITAS) { if (x > 196 && x < 238) continue; fac(x, -2, l + 14, w + 2, 1); }
  for (const [x, l, w] of [[22, 16, 8], [44, 22, 9], [180, 14, 7], [204, 20, 9]]) fac(x, 118, l, w, -1);
  { const x = 268; poligono([[x - 7, 0], [x, 0], [x - 2, 118], [x - 9, 118]], tono(x - 4, 60, 1)); poligono([[x, 0], [x + 7, 0], [x + 6, 118], [x - 2, 118]], tono(x + 3, 60, -1)); poligono([[x - 3, 40], [x + 2, 40], [x + 1, 80], [x - 4, 80]], tono(x, 60, 0.3)); }
  // los cristales facetados
  const cristal = (cx, cy, c, n, s) => { for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + (k - (n - 1) / 2) * 0.42, l = (8 + (k % 2) * 5) * s, ex = cx + Math.cos(a) * l, ey = cy + Math.sin(a) * l; poligono([[cx - 2 * s, cy], [cx + 2 * s, cy], [ex + 1, ey], [ex - 1, ey]], j_mezcla(c, hex('#000000'), 0.35)); poligono([[cx - 2 * s, cy], [cx, cy], [ex, ey]], c); pset(Math.round(ex), Math.round(ey), hex('#ffffff')); } };
  cristal(34, 110, j_C.cristalC, 5, 1); cristal(300, 114, j_C.cristalM, 4, 1); cristal(256, 152, j_C.cristalC, 3, 0.8); cristal(62, 34, j_C.cristalM, 3, 0.7);
  // la roca de la lámpara y la lámpara de latón
  poligono([[82, 148], [86, 140], [104, 138], [110, 146], [106, 156], [84, 156]], j_C.suelo3S); poligono([[86, 140], [104, 138], [100, 146], [88, 147]], j_C.suelo3L); poligono([[100, 146], [104, 138], [110, 146], [106, 156]], j_C.suelo3);
  rect(92, 128, 100, 140, hex('#5a3a1a')); rect(93, 129, 99, 139, j_C.laton); rect(93, 129, 94, 139, j_C.latonL); rect(98, 129, 99, 139, j_C.latonS); rect(94, 130, 98, 137, hex('#fff2b0')); rect(91, 140, 101, 141, j_C.latonS); rect(92, 126, 100, 127, j_C.latonS); linea(93, 125, 96, 121, j_C.latonS); linea(99, 125, 96, 121, j_C.latonS);
}

// las estalagmitas facetadas de primer plano de la cueva en 3D, por delante de los personajes
function j_cueva3dDelante(R, t, o) {
  j_delante(R, 'cueva-3d-delante', () => {
    const { poligono } = R;
    poligono([[0, 180], [0, 128], [10, 112], [18, 140], [26, 180]], j_RAMPA[1]); poligono([[0, 128], [10, 112], [8, 150], [0, 160]], j_RAMPA[3]); poligono([[10, 112], [18, 140], [12, 150]], j_RAMPA[2]);
    poligono([[300, 180], [308, 132], [314, 120], [319, 136], [319, 180]], j_RAMPA[1]); poligono([[308, 132], [314, 120], [312, 160], [304, 170]], j_RAMPA[4]);
  });
}

// la vista a través de unas gafas de RV: la cueva en 3D de este mismo fotograma, pintada aparte, se ve en las dos lentes
// (con un poco de paralaje, la distorsión de barril, la viñeta y el borde de colores de la lente); alrededor, la espuma
// del visor con su costura y el hueco de la nariz por el que entra luz
function j_vistaGafas(R, t, o) {
  let off = j_capas.get('vr-off'); if (!off) { off = R.nuevo(); j_capas.set('vr-off', off); }
  const prev = R.usar(off); j_cueva3d(R, t, { ...o, camara: 'general' }); R.usar(prev);
  const B = R.buf, lentes = [[98, 92, -4], [222, 92, 4]], rx = 66, ry = 70;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c = -1;
    for (const [lx, ly, ojo] of lentes) { const dx = (x - lx) / rx, dy = (y - ly) / ry, r2 = dx * dx + dy * dy; if (r2 >= 1) continue;
      const k = 1 + 0.16 * r2, sx = Math.round(142 + ojo + (x - lx) * 1.22 * k), sy = Math.round(100 + (y - ly) * 1.22 * k);
      c = (sx < 0 || sx > 319 || sy < 0 || sy > 179) ? hex('#08060e') : off[sy * 320 + sx];
      if (r2 > 0.78) c = j_mezcla(c, hex('#000000'), Math.min(1, (r2 - 0.78) / 0.22) * 0.9);
      if (r2 > 0.9 && r2 < 0.97) c = j_mezcla(c, dx < 0 ? hex('#ff3a5a') : hex('#3a8aff'), 0.35);
      if (dx < -0.2 && dy < -0.35 && r2 > 0.55 && r2 < 0.62) c = j_mezcla(c, hex('#ffffff'), 0.18);
      break; }
    if (c < 0) { const nariz = Math.abs(x - 160) < 18 - (180 - y) * 0.25 && y > 140, borde = Math.min(x, 319 - x, y, 179 - y), n = h(x >> 1, y >> 1, 910);
      c = nariz ? (j_u(x, y) < (y - 140) / 50 ? hex('#4a4a58') : hex('#121218')) : borde < 6 ? (borde === 3 && ((x + y) % 4 < 2) ? j_C.espumaL : j_C.espumaS) : n < 0.2 ? j_C.espumaS : n > 0.85 ? j_C.espumaL : j_C.espuma; }
    B[y * 320 + x] = c;
  }
  return { suelo: null, lentes: [[98, 92, rx, ry], [222, 92, rx, ry]] };
}
