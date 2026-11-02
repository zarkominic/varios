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
// El momento en que te mueres en una aventura: un monitor de los ochenta con el juego congelado y el cuadro de la muerte.
// o.encuadre:
//   'pantalla': un escritorio de 1985 con el monitor grande en el centro (la imagen del juego congelada y desaturada
//     detrás) y el cuadro de la muerte encima (pieza cuadroMuerte); un reloj de pared; o.camara 'general' o 'cerca' (el
//     cuadro llena el plano, con la calavera grande).
//   'partidas': una pared de ranuras de partidas guardadas como buzones, cada una con su disquete y un dibujo (un puente,
//     una puerta, un monstruo); o.pila (0–1): una pila de disquetes que crece; o.camara 'general' o 'pila'.
//   'dividido': la pantalla partida en dos por la mitad: a la izquierda, el mundo soleado del «aquí no te mueres» (un sol,
//     una calavera tachada en un cartel); a la derecha, el mundo de Sierra (la calavera que guiña, el disquete guardando);
//     o.camara 'general' o 'cerca'.
export function muerte(R, t, o = {}) {
  provisional(R, t, C.disco, C.discoL);
  return { suelo: 160 };
}

// ── E · El espacio ───────────────────────────────────────────────────────────────────────────────────────────────────
// La ciencia ficción de broma de las aventuras espaciales de 1986–1991, nuestra. o.encuadre:
//   'nave': el pasillo de una nave espacial: paneles con remaches, luces de aviso, tuberías, ojos de buey con estrellas,
//     un robot de limpieza; o.alarma (0–1) tiñe de rojo; o.camara 'general' o 'armario' (el armario de las escobas
//     abierto: cubos, fregonas, una almohada).
//   'puente': el puente de mando: consolas, pantallas con radar y ondas, sillones, el ventanal con un planeta; o.camara
//     'general' o 'radio' (la consola de radio de cerca, con su micro).
//   'desierto': un planeta desértico con dunas, rocas con forma de seta, dos soles, una nave al fondo; o.explosion (0–1):
//     la nave explota en fuegos de colores (de cuento, sin nadie dentro); o.camara 'general' o 'cerca'.
//   'asteroide': la sede de una empresa de videojuegos malvada en un asteroide: cúpulas, chimeneas, un cartel con un
//     pictograma de joystick con cuernos, una jaula; o.camara 'general' o 'jaula'.
//   'portal': un portal del tiempo en espiral en medio del espacio; o.camara 'general' o 'pixeles' (el mundo del primer
//     juego: todo de píxeles gordos de 2×2 y con 16 colores, una nave y un desierto simplificados).
export function espacio(R, t, o = {}) {
  provisional(R, t, C.metalS, C.metal);
  return { suelo: 160 };
}

// ── F · La ciudad ────────────────────────────────────────────────────────────────────────────────────────────────────
// Una ciudad de 1987–1993. o.luz 'noche' (por omisión) o 'dia'. o.encuadre:
//   'calle': una calle de ciudad: de noche, neones de formas (una copa, una estrella, un corazón, sin letras), asfalto
//     mojado con reflejos, ventanas encendidas; de día, la comisaría de ladrillo con su escalinata y el aparcamiento;
//     o.camara 'general' o 'coche' (el aparcamiento de cerca, sitio para el coche patrulla y dos policías).
//   'bar': un bar con un piano de cola, taburetes, botellas en estantes con luz, un escenario con cortina; o.camara
//     'general' o 'puerta' (una puerta con una mirilla y un cartel con un «?» donde se hace un examen).
//   'orleans': una calle antigua de Nueva Orleans de noche: balcones de hierro forjado con plantas, farolas de gas,
//     adoquines, una librería con su escaparate y un gato; o.camara 'general' o 'libreria'.
export function ciudad(R, t, o = {}) {
  provisional(R, t, C.asfalto, C.asfaltoL);
  return { suelo: 160 };
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
// El disquete con ojos (nuestro hilo de gags): un disquete de 5¼ pulgadas negro con su etiqueta en blanco, el agujero y
// la ventana, de ~16 × 16 px a o.s 1 (pie en (x, y)), con dos ojos grandes que parpadean, boca y patitas que corren.
// o.corre (0–1) anda/corre; o.dir; o.expresion 'normal' | 'susto' | 'feliz' | 'triste'; o.guarda (0–1): se ilumina,
// un destello y una marca «✓»; o.gafas (0–1): se pone unas gafas de RV; o.saluda. Devuelve { x, y, cabeza }.
export function disquete(R, x, y, t, o = {}) {
  R.rect(x - 7, y - 15, x + 7, y, C.disco); R.rect(x - 4, y - 13, x + 4, y - 9, C.etiqueta);
  return { x, y, cabeza: [x, y - 16] };
}
// El cuadro de la muerte (sin letras): un cuadro con marco doble, una calavera que guiña (o.guino 0–1), un reloj de
// arena, renglones de trazos y un botón; o.w ancho (por omisión 120); o.abre (0–1) aparece con un rebote; o.gafas pone a
// la calavera unas gafas de broma. (x, y) es su esquina superior izquierda.
export function cuadroMuerte(R, x, y, t, o = {}) {
  const w = o.w ?? 120; R.rect(x, y, x + w, y + Math.round(w * 0.55), C.hueso);
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
// El coche patrulla de 1987 (blanco y negro con luces, sin letras ni escudos) de ~60 px; o.dir; o.rueda (0–1): la rueda
// delantera revienta con un «¡pum!», humo, y el coche se queda torcido; o.anda (0–1).
export function cochePatrulla(R, x, y, t, o = {}) {
  R.rect(x - 30, y - 14, x + 30, y, C.hueso);
}
