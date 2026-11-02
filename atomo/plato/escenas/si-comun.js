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
// Un pueblo de fantasía de 1989 con su gremio de aventureros. o.encuadre:
//   'gremio': la plaza del pueblo con el edificio del gremio (madera y piedra, escudo con una espada, sin letras), un
//     tablón de anuncios con dibujos, una fuente, puestos; o.camara 'general' o 'tablon'.
//   'camino': un camino que sale del pueblo entre colinas hacia un mapa siguiente (un desierto lejano); o.camara
//     'general' o 'puerta' (una puerta de muralla cerrada, sitio para tres héroes).
export function fantasia(R, t, o = {}) {
  provisional(R, t, C.hierbaS, C.oroF);
  return { suelo: 160 };
}

// ── G · El estudio de sonido y color, 1990 ───────────────────────────────────────────────────────────────────────────
// El estudio de una compañía de juegos en 1990 (moqueta gris, monitores beis, flexos, cables). o.encuadre:
//   'estudio': mesas con ordenadores, un ratón, un caballete con un lienzo pintado a mano (un bosque) y un escáner;
//     o.camara 'general' o 'monitores' (dos monitores lado a lado: el mismo bosque en 16 colores y en 256).
//   'cabina': la cabina de grabación: espuma en las paredes, el micrófono con su filtro, el cristal y, detrás, la mesa
//     del técnico con faders y un magnetófono; una estrella dorada en la puerta (o.estrella); o.camara 'general' o
//     'micro'.
//   'musica': el departamento de música: teclados, sintetizadores con luces, un rack, altavoces que botan, partituras
//     con notas (símbolos); o.camara 'general' o 'teclados'.
export function estudio(R, t, o = {}) {
  provisional(R, t, C.moqueta, C.beis);
  return { suelo: 160 };
}

// ── H · Hoy (y la cueva) ─────────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'salon': el salón de una casa de hoy de una pareja mayor: mesa grande con dos portátiles, una tableta, plantas, un
//     puzle a medias, una foto antigua de los dos en la pared, ventanal con un jardín; o.camara 'general' o 'mesa'.
//   'cuarto': el cuarto de un chico de hoy: escritorio con un ordenador moderno con una aventura antigua en pantalla, un
//     mapa dibujado a mano en la pared, estantería con figuras, cama; o.camara 'general' o 'album' (un álbum de cromos
//     abierto en el escritorio, con cromos de calaveras que guiñan y caballeros mojados).
//   'cueva': una cueva de piedra caliza con estalactitas, un río subterráneo, cristales y una lámpara de aceite;
//     o.estilo 'real' (1970: oscura, con la linterna de un explorador y un cuaderno de mapa) o '3d' (2023: limpia, de
//     colores, con luces volumétricas); o.camara 'general' o 'mapa' (real: el explorador dibujando el mapa; 3d: la vista
//     a través de unas gafas de RV, con el borde de las lentes).
export function hoy(R, t, o = {}) {
  provisional(R, t, C.granito, C.granitoL);
  return { suelo: 160 };
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
// Una tarjeta de sonido verde con chips y conectores; o.musicos (0–1): salen de ella músicos diminutos (violín, trompa,
// timbal) que tocan sobre la mesa. Pie en (x, y).
export function tarjetaSonido(R, x, y, t, o = {}) {
  R.rect(x - 14, y - 6, x + 14, y, C.pinoV);
}
// Unas gafas de realidad virtual blancas con su correa; o.puestas, o.brillo. Pie en (x, y).
export function gafasRV(R, x, y, t, o = {}) {
  R.rect(x - 8, y - 5, x + 8, y, C.hueso);
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
