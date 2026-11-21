// Fontanería y decorados del episodio 27 (Tetris: el juego que se escapó de la Unión Soviética) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Moscú en 1984 (el centro de cálculo de la
// Academia de Ciencias), B Occidente 1986–1988 (Budapest, la torre del magnate en Londres, una tienda de informática de
// EE. UU.), C Moscú en 1989 (la Plaza Roja nevada, el edificio de Elorg), D la guerra de los cartuchos (el juzgado, el
// almacén, la juguetería de 1989) y E hoy (el estudio de Atom, el laboratorio del sueño de 2000, el salón de 2023).
// DERECHOS (caso Tetris Holding contra Xio, 2012): nada del juego tal cual: ni las siete piezas con sus colores, ni el pozo
// alto y estrecho con piezas cayendo, ni la pieza siguiente, ni el logotipo; el juego de 1984 es corchetes de texto verde
// en pantalla negra, y las piezas, bloques sueltos de madera monocromos. Nada con la silueta de la Game Boy: la consola de
// bolsillo es la genérica de PIEZAS_TS. Sin logos de Nintendo, Atari, Tengen, Mirrorsoft ni letras legibles.
// Los personajes son los de ELENCO_TS y PIEZAS_TS (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, mostradores, bancos) va en
// su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/ts-comun.js';
//   const { E, R, M } = await T.preparar('ts-gancho');
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
// las piezas del episodio (PIEZAS_TS: el terminal, el disquete, el télex, la consola de bolsillo genérica…), las crea el reparto
export const PIEZAS_TS = KIT.PIEZAS_TS || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Moscú: el gris soviético, el rojo de las banderas y estrellas, el verde del fósforo de las pantallas, la nieve
    grisSov: '#8a8a84', grisSovS: '#5a5a56', rojoSov: '#c8302a', fosforo: '#5aff8a', fosforoS: '#1a6a32', nieve: '#eef2f8',
    // Occidente y los ochenta: moqueta, plástico beige de los ordenadores, cartón de las cajas, el oro de las cúpulas
    beige: '#d8ccb0', beigeS: '#a89c80', carton: '#c8a06a', cartonS: '#8a6a3a', cupula: '#e8b040', bata: '#eef0f2',
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
  const E = await escena(id, 'ep27');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1984 (el laboratorio), 1989 (Moscú y la guerra de los cartuchos), 1996 (la compañía), 2023, 2026
  Object.assign(R.ICONOS, {
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    disquete: ['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#.....#', '#######'],
    bolsillo: ['.#####.', '.#...#.', '.#...#.', '.#####.', '.#.#.#.', '.#####.', '.......'],
    bloques: ['##.##..', '##.##..', '.......', '##.##.#', '##.##.#', '.......', '.......'],
  });
  R.tramosTiempo([[1984, 1989, R.PALA.ROJO, 'estrella'], [1989, 1996, R.PALA.ORO, 'disquete'], [1996, 2023, R.PALA.AZUL ?? R.PALA.ROJO, 'bolsillo'], [2023, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'bloques']]);
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







// ── A · Moscú 1984 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Moscú de noche con nieve: la luz fría entra
// por las ventanas (la calle nevada, las farolas, el tranvía) y la cálida es la de las lámparas de dentro.
//   'centro' (por omisión): el centro de cálculo de la Academia de Ciencias, 1984, de noche. Techo de placas con tres
//     fluorescentes (el del medio parpadea a ratos) que tiran su luz tramada; dos ventanas altas de doble hoja (con su
//     ventanillo) a la calle de Moscú: cielo tramado con nubes de tres tonos a dos velocidades, bloques de pisos con luces
//     que se encienden y apagan, el rascacielos de la época con su estrella roja, farolas cálidas, un tranvía que cruza
//     con su chispa en el cable, la nieve que cae y se amontona en el alféizar, escarcha en las esquinas; radiadores de
//     hierro con su tubería; el cartel rojo de la estrella (sin letras), una pancarta roja sobre los armarios (estrella,
//     engranaje y barras) y el cartel del engranaje a la derecha; una impresora de líneas con su papel pijama que avanza;
//     cinco armarios de cinta magnética cuyas bobinas giran a tirones (adelante y atrás) con sus pilotos; la consola de
//     la derecha con osciloscopio y diales; suelo de linóleo en perspectiva con reflejos de las ventanas y los tubos, la
//     canaleta y los cables. Vida de fondo: un científico pequeño de bata que pasa por delante de los armarios y un
//     operario que toca la consola. Los pies de los personajes en y 150 (detrás de las mesas) a 172; la zona libre del
//     suelo es x 128–210. centroDelante pinta las dos mesas de delante (izquierda x 16–124, con el terminal
//     PIEZAS_TS.terminal, el rompecabezas de madera, la taza que humea y el flexo; derecha x 212–316, con otro ordenador,
//     listados, teléfono y disquetes). o.texto, o.completa: lo que muestra el terminal de la mesa (como la pieza);
//     o.terminal: false lo quita (para que la escena lo pinte ella); o.taza: false quita la taza (la lleva un actor).
//     Cámara 'terminal': la mesa de Pázhitnov de cerca: la pared con la ventana nevada, el corcho con notas de
//     pictogramas (la pieza de cinco cuadrados, la raqueta, un 4), el radiador, la estantería de carpetas y el canto de un
//     armario de cinta con sus pilotos; centroDelante pinta la mesa de madera de cerca: el terminal grande de fósforo verde
//     con corchetes [ ] que caen y encajan en todo el ancho (nada de pozo ni de pieza siguiente) y una fila completa que
//     parpadea y desaparece (o.fila 0–1; sin o.fila el ciclo va solo con t), el teclado, el cuaderno con pictogramas, la
//     taza que humea, la bandeja con el rompecabezas de madera de cinco cuadrados y el flexo con su luz cálida.
//     o.piezas (0–1): cuántas piezas del rompecabezas están ya en la bandeja (1 por omisión).
//   'pasillo': el pasillo del instituto: pared de dos tonos (zócalo de pintura verde brillante y yeso arriba), parqué en
//     espiga, dos lámparas de globo que se mecen, la puerta 214 con su montante de cristal, el tablón de corcho con papeles
//     de barras y chinchetas, la ventana con la nieve, el radiador, el reloj sobre la segunda puerta (entreabierta, con la
//     luz que sale), el extintor, el cartel del engranaje y la mampara de cristal de la sala de ordenadores (al fondo,
//     filas de terminales con corchetes verdes, una operadora pequeña que teclea y otra que pasa). centroDelante pinta el
//     perchero con abrigos y la ushanka (izquierda) y el ficus en su maceta (derecha).
//     Cámara 'archivo': el despacho del archivo: papel pintado con motivo, friso de madera, archivadores grises (un cajón
//     abierto con carpetas), la ventana con cortinas pesadas a la noche nevada, el cartel del engranaje, el mapamundi
//     insinuado y el globo terráqueo en su pie (gira despacio; o.globo: velocidad, 1 por omisión); centroDelante pinta la
//     mesa con tapete verde: la carpeta de cartón, el sello rojo con la estrella (o.sello 0–1: 0 arriba, 1 apretado sobre
//     la carpeta; la estrella roja queda en la carpeta desde que toca, o con o.marca), el tampón, la caja de metal con
//     candado (o.caja 0–1: 0 abierta con el disquete dentro, 1 cerrada con el candado echado) y la lámpara verde.
// Devuelve { suelo, ... } con las coordenadas útiles (las de la cabecera de centroDelante).
export function centro(R, t, o = {}) {
  const enc = o.encuadre ?? 'centro', cam = o.camara ?? 'general';
  if (enc === 'pasillo') return cam === 'archivo' ? a_archivo(R, t, o) : a_pasillo(R, t, o);
  return cam === 'terminal' ? a_rincon(R, t, o) : a_sala(R, t, o);
}
// lo de delante de los personajes en cada encuadre de centro(); se llama después de los actores, con las mismas opciones.
//   'centro' general: las dos mesas (izquierda x 16–124, tapa con canto en y 140; derecha x 212–316, igual); quien está
//     detrás de una mesa pisa en y 150 y se le ven cabeza y hombros. Devuelve { terminal: [x, y] (centro de la pantalla),
//     puzle: [x, y], taza: [x, y], flexo: [x, y] }.
//   'centro' / 'terminal': la mesa de cerca (canto del fondo en y 118, todo lo de debajo es tapa de mesa), el terminal
//     grande (pantalla x 40–136, y 40–106; solo corchetes verdes, sin ningún número), el teclado (y 132–150), el
//     cuaderno, la taza, la bandeja del rompecabezas y el flexo; quien está detrás de la mesa pisa en y 125 (en x 160–200
//     se le ven cabeza y hombros, de y ~100 al canto de y 118). Devuelve { pantalla: [x0, y0, x1, y1], teclado: [x, y],
//     taza: [x, y], puzle: [x, y], suelo: 125 }.
//   'pasillo' general: el perchero (x 0–20) y el ficus (x 298–319). Devuelve {}.
//   'pasillo' / 'archivo': la mesa (x 108–242, canto en y 140; detrás se pisa en y 150), la carpeta, el sello (o.sello),
//     el tampón, la caja con candado (o.caja) y la lámpara. Devuelve { sello: [x, y] (el mango), carpeta: [x, y],
//     caja: [x, y] }.
export function centroDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'centro', cam = o.camara ?? 'general';
  if (enc === 'pasillo') return cam === 'archivo' ? a_archivoMesa(R, t, o) : a_pasilloDelante(R, t, o);
  return cam === 'terminal' ? a_rinconMesa(R, t, o) : a_salaMesas(R, t, o);
}
// ── B · Occidente 1986–1988 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'budapest': la oficina de un instituto de Budapest en 1986, de día: pared de yeso crema arriba y pintura al óleo verde
//     gris abajo (con su filete), techo con cornisa, parqué en espiga con la luz de las ventanas y motas de polvo que
//     flotan en ella; dos ventanas altas de madera (x 92–146 y 158–212, y 20–89) con cortinas de terciopelo verde que se
//     mecen, geranio y cactus en los alféizares y radiadores de hierro debajo; por ellas, el Danubio con el puente de
//     cadenas insinuado (dos torres de piedra con su arco y las cadenas colgadas), la colina con un palacio de cúpula verde
//     (con su bandera tricolor que ondea) y una torre de tejas de colores; nubes de tres tonos a tres velocidades,
//     gaviotas, un barco de recreo y una gabarra que pasan, destellos en el agua y el tranvía amarillo por el muelle.
//     Dentro: la estantería de libros y archivadores (x 4–62), el perchero con abrigo, sombrero y paraguas, la lámpara de
//     tulipa verde (x 186), el reloj de pared con su segundero, el tablero de corcho con papeles clavados, el archivador
//     metálico con su planta (x 280–316) y la papelera. El télex (PIEZAS_TS.telex) en su mesita metálica (x 222–258,
//     pies en y 154), con la luz que parpadea; o.cinta 0–1: su cinta de papel perforada sale, baja al suelo y cruza la
//     oficina en ondas (las perforaciones corren); a partir de 0,3 se amontona en rizos por el suelo, los radiadores, la
//     estantería y el archivador, y con 1 la oficina está llena. La mesa de delante (con el ordenador de la época, que
//     muestra el juego en corchetes verdes, disquetes y un café que humea) va en occidenteDelante, junto con los rizos de
//     cinta que quedan por delante de los personajes.
//     Cámara 'telex': la máquina de télex de cerca (al triple, x 105–195, y 92–158) sobre la mesa de madera, con la cinta
//     ancha (las cinco filas de agujeros y la de arrastre, que corren) que sale por la derecha, cae sobre la mesa y se
//     enrosca (o.cinta, igual que arriba); detrás, la ventana con el puente, un corcho con el mapa de Europa y un hilo rojo
//     de Budapest a Moscú, el teléfono de disco, papeles, el café que humea y el flexo que ilumina la máquina. La mano que
//     teclea la pone la escena (el teclado: x 117–180, y 125–140). Los rizos de delante van en occidenteDelante.
//   'torre': el despacho alto del magnate en Londres, 1987: un ventanal de pared a pared (x 28–266, y 12–118) con Londres
//     desde arriba (nubes grises de tres tonos con un claro de sol, la ciudad lejana con una cúpula y agujas, dos grúas
//     que giran con su luz roja, el Támesis con un crucero y un remolcador con gabarras, un puente con un autobús rojo,
//     tejados cercanos con chimeneas que echan humo, palomas y un helicóptero que cruza) y reflejos en el cristal;
//     paneles de nogal, moqueta verde con la luz del ventanal y una alfombra persa; un caballete con la maqueta de una
//     portada (cabecera roja y rayas, sin letras), el aparador con el decantador, periódicos y una pantalla de bolsa que
//     se mueve, la bola del mundo que gira, el sillón de cuero, un catalejo y dos portadas enmarcadas en la pared. La
//     mesa enorme de caoba (con los teléfonos de botones que parpadean, la lámpara de banquero y maquetas con rayas) va
//     en occidenteDelante; el magnate se pone detrás de ella.
//     Cámara 'tienda' (o también o.encuadre 'tienda'): una tienda de informática de EE. UU. en 1988: el escaparate a la
//     calle (x 4–98, y 18–96) y la puerta de cristal (x 107–125, y 20–116), con la calle de enfrente (fachada de ladrillo,
//     toldo a rayas, coches que pasan, paseantes, un árbol que se mece, el parquímetro); en el escaparate, sobre la
//     tarima roja, la caja del juego al doble (PIEZAS_TS.cajaJuego, x 32–72, y 46–98) en su caballete bajo el foco, una
//     pirámide de cajas iguales y otras sin letras; la pared de listones con estanterías de cajas de programas sin
//     letras, el rótulo de pictogramas, un póster espacial y joysticks colgados; los fluorescentes (uno parpadea) y un
//     móvil con una estrella que gira; la mesa de demostración con dos ordenadores beis encendidos cuyas pantallas
//     cambian, la impresora debajo y el piloto de la disquetera. El mostrador con la caja registradora (sus cifras
//     cambian) va en occidenteDelante; el dependiente se pone detrás.
// Devuelve { suelo, ... } con las coordenadas de lo que tocan los personajes (ver cada encuadre).
export function occidente(R, t, o = {}) {
  const enc = o.encuadre ?? 'budapest', cam = o.camara ?? 'general';
  if (enc === 'tienda' || (enc === 'torre' && cam === 'tienda')) return b_tienda(R, t, o);
  if (enc === 'torre') return b_torre(R, t, o);
  if (cam === 'telex') return b_telexCerca(R, t, o);
  return b_budapest(R, t, o);
}
// lo de delante de los personajes en cada encuadre de occidente(); se llama después de los actores, con las mismas opciones:
// en 'budapest', la mesa con el ordenador (tablero y 138–146, x 78–204) y los rizos de cinta de delante; en 'telex', los
// rizos de delante; en 'torre', la mesa de caoba (tablero y 136–144, x 164–316); en 'tienda', el mostrador (y 130–176,
// x 244–319, tablero y 135–140) con la caja registradora
export function occidenteDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'budapest', cam = o.camara ?? 'general';
  if (enc === 'tienda' || (enc === 'torre' && cam === 'tienda')) return b_tiendaDelante(R, t, o);
  if (enc === 'torre') return b_torreDelante(R, t, o);
  if (cam === 'telex') return b_telexCercaDelante(R, t, o);
  return b_budapestDelante(R, t, o);
}
// ── C · Moscú 1989 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre ({ suelo, … })
//   'plaza': la Plaza Roja evocada, nevada, de noche, en 1989. Cielo tramado con la luna entre nubes de nieve de tres tonos
//     que van a tres velocidades; a la izquierda la muralla roja almenada (merlones en cola de golondrina con su nieve,
//     ladrillo iluminado desde abajo), la torre del reloj (esfera con agujas que se mueven, chapitel verde y una estrella
//     pequeña que brilla), una torre redonda y otra pequeña en el borde; abetos nevados al pie del muro con una cola de
//     gente pequeña que avanza; en el centro y a la derecha la catedral de cúpulas de cebolla de colores (espirales, rayas,
//     zigzag, con nieve en los hombros) y su chapitel; en el borde derecho los almacenes con las ventanas encendidas y las
//     guirnaldas de bombillas que corren. La plaza: nieve azulada con ondas del viento, sendas pisadas donde asoma el
//     adoquín, huellas, montones de nieve, dos farolas de tres globos con su halo y su charco de luz; una barredora
//     naranja con su rotativo cruza lejos, una abuela barre la nieve, alguien cruza; nieva en dos capas (y la capa de
//     copos grandes va en moscuDelante). Suelo de los personajes 156 (zona libre x 44–268, y 128–176).
//     o.huellas (true): la fila de huellas de la senda; o.barredora (true); o.cola (true): la cola de gente del muro.
//     Cámara 'puerta': la entrada del edificio gris de la agencia, de noche: fachada de piedra almohadillada, portada con
//     pilastras, la puerta doble de roble con cuarterones y tiradores de latón bajo un montante encendido, dos faroles,
//     la placa de bronce sin letras (barras), ventanas con reja y luz dentro (alguien pasa por detrás de una), la cornisa
//     con nieve y carámbanos que gotean; a la izquierda, la calle: fachadas lejanas, un trolebús que pasa con chispas en
//     el cable, un coche cubierto de nieve y una farola de brazo. Suelo de la acera 162; el umbral de la puerta, 146.
//     o.puerta (0–1): la hoja derecha se abre hacia dentro (se ve el vestíbulo con su luz).
//   'elorg': la sala de reuniones de la agencia: paredes de color verde gris con trama de rodillo y zócalo de madera con
//     cuarterones, parqué de espiga, el retrato oficial de lejos y sin rasgos (un busto oscuro en un marco dorado) entre
//     dos apliques, un reloj de pared con péndulo, una estantería de archivadores, un perchero con gorros de piel, un
//     radiador de hierro bajo el ventanal con cortinas pesadas que se mecen, y a la izquierda la puerta abierta al pasillo
//     (tres puertas acolchadas al fondo, una lámpara, alguien que pasa). o.hora (0–1): la luz de la ventana va de la
//     mañana gris de nieve (0) a la tarde naranja (0,5) y a la noche (1, con los apliques más fuertes); por la ventana, los
//     tejados nevados, una cúpula lejana y la nieve que cae. Sillas detrás de la mesa. La mesa larga va en moscuDelante.
//     Suelo de detrás de la mesa 131 (asoman cabeza y hombros); delante de la mesa y junto a la puerta, 172.
//     Cámara 'mesa': la mesa de cerca (en moscuDelante; detrás, la estantería, un cuadro de abedules, el calendario de taco
//     con el número o.dia y la ventana): tapete verde con su pelusa, la lámpara de banquero con su cono de
//     luz, el cartucho genérico (PIEZAS_TS.cartucho) bajo la lámpara, el contrato (PIEZAS_TS.contrato), papeles, vasos de
//     té con su soporte de metal que humean, un ábaco, un cenicero; detrás, la pared con la estantería y la ventana.
//     Suelo de detrás de la mesa 120 (asoman cabeza y hombros).
//     Cámara 'pasillo' (nueva): el pasillo largo de la agencia de frente: zócalo pintado de verde oscuro y pared encalada,
//     tres puertas acolchadas con botones y su número de latón (1, 2, 3), alfombra roja con cenefa sobre el parqué,
//     apliques de globo (uno parpadea), el reloj sobre la puerta del medio, el tubo de la calefacción (sube a la moldura en
//     x 264) y el cable con aisladores (baja a su caja de empalmes en x 240: la esquina de Atom queda de pared lisa de cal), un banco con un gato que duerme, un ficus, un extintor, un tablón y el cuadro de honor; o.puertas [a, b, c]
//     (0–1): cuánto se abre cada puerta (se ve el despacho de dentro con su luz). Suelo 150.
export function moscu(R, t, o = {}) {
  const enc = o.encuadre ?? 'plaza', cam = o.camara ?? 'general';
  if (enc === 'plaza') return cam === 'puerta' ? c_puerta(R, t, o) : c_plaza(R, t, o);
  if (cam === 'mesa') return c_mesaFondo(R, t, o);
  if (cam === 'pasillo') return c_pasillo(R, t, o);
  return c_sala(R, t, o);
}
// lo de delante de los personajes en cada encuadre de moscu(); se llama después de los actores, con las mismas opciones:
// en la plaza y la puerta, los copos grandes y cercanos que caen deprisa; en 'elorg', la mesa larga (c_mesaLarga); en
// la cámara 'mesa', la mesa de cerca con todo lo de encima (c_mesaCerca); en el pasillo, nada
export function moscuDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'plaza', cam = o.camara ?? 'general';
  if (enc === 'plaza') { c_nieva(R, t, 380, cam === 'puerta' ? 12 : 16, 34, hex('#f4f8ff'), 0, 0, 319, 179, true); return {}; }
  if (cam === 'mesa') return c_mesaCerca(R, t, o);
  if (cam === 'pasillo') return {};
  return c_mesaLarga(R, t, o);
}
// ── D · La guerra de los cartuchos ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre ({ suelo, … });
// suelo = donde se plantan los pies de los personajes (el y de R.actor; el chibi mide 27 px: la cabeza, los 13 de arriba).
//   'juzgado' (por omisión; suelo 150): una sala de juzgado federal de EE. UU. en junio de 1989. Techo de casetones con el
//     ventilador que gira y dos lámparas de globo, la pared de mármol veteado (y 11–60) y el friso de nogal con cuarterones
//     (y 62–112). A la izquierda el ventanal alto (hueco x 10–54, y 22–92; persiana a medio bajar: el cielo con nubes de
//     tres tonos a tres velocidades, rascacielos de 1989, un árbol que se mece y pájaros) con su rayo de sol y motas en el
//     suelo; el estrado de los testigos (x 62–100; el testigo, suelo 102, x 72–86); la bandera de rayas sin estrellas en su
//     mástil (x 104) y otra azul con un aro de oro (x 216), las dos con pliegues que se mecen; en el centro el respaldo
//     alto de nogal con el medallón de bronce de la balanza (sin letras ni escudos reales; centro 160, 36) y el sillón de
//     cuero del juez (la jueza, suelo 98, x 152: asoma cabeza y hombros por encima del estrado, tapa en y 88); a la derecha
//     la mesa del secretario con su busto que teclea la estenotipia (sale la tira de papel), el reloj de pared (240, 30) y la
//     puerta doble del pasillo (x 266–304, y 50–112; de vez en cuando pasa una sombra por los cristales). El suelo de parquet
//     con la alfombra roja del pasillo central. Detrás de la mesa de la derecha, las cajas de cartuchos requisadas
//     (12 cajas en x 222–312, base y 124): o.apila 0–1 las lleva de un montón revuelto a una fila perfecta de dos alturas
//     (cada caja salta a su sitio, de abajo arriba; al llegar a 1, un brillo recorre la fila).
//     Delante (guerraDelante): el frente del estrado (x 108–212, y 88–114) con la lámpara verde, la placa sin letras, los
//     papeles, la jarra y el mazo en su taco (o.mazo: false lo quita, si lo sostiene la jueza; o.golpe: segundo del golpe,
//     saltan líneas y astillas del taco); el frente del estrado de testigos; las dos mesas de las partes (x 24–124 y
//     196–296, tablero y 141; los abogados, suelo 150, asoman de cabeza y hombros) con carpetas, vasos, un maletín y, en la
//     de la derecha, el cartucho genérico con la etiqueta roja de prueba; y abajo, la fila del público de espaldas (cabezas
//     en x 0–112 y 208–320, y 160–180). El pasillo central (x 124–196, suelo 150–178) queda libre.
//     Cámara 'almacen' (suelo 160): un almacén de EE. UU. en 1989. Cerchas de acero y lucernarios (x 186–262) con haces de
//     luz y motas, dos lámparas de campana que se mecen, la chapa ondulada de las paredes; las estanterías de palés
//     naranjas y azules (x 6–176, tres alturas en y 50, 86, 122) llenas de cajas de cartuchos (o.vacia 0–1: se van
//     vaciando, de arriba a la derecha hacia abajo a la izquierda); la carretilla elevadora que va y viene con su palé
//     (y 110–140); el muelle de carga (x 196–262, hueco y 80–130) con la persiana a media altura, el camión y un mozo que
//     carga cajas; a la derecha la trituradora amarilla (x 266–318, y 60–140) con la cinta que sube cajas (desde x 180,
//     y 124 hasta x 272, y 76); o.tritura 0–1 la pone en marcha: seis cajas entran por abajo, suben y caen dentro una tras
//     otra entre polvo, con la luz ámbar que gira y el piloto verde (a 1 ya no queda ninguna); sin o.tritura (o false), la
//     máquina está parada, con el piloto rojo, y la cinta quieta y vacía. El suelo de hormigón con juntas, líneas
//     amarillas y manchas. Delante: el palé de cajas abajo a la izquierda (x 0–42, y 128–180) y la carretilla de mano con
//     cajas abajo a la derecha (x 286–320, y 132–180). Libre para los operarios: x 48–280, suelo 156–172.
//   'jugueteria' (suelo 158): una juguetería de EE. UU. en el verano de 1989. Techo de placas con fluorescentes (uno
//     parpadea), móviles colgados que giran (estrellas y un cartel de la consola que se mece); la cenefa de confeti al
//     estilo de los ochenta; la pared del fondo (x 76–232, y 24–124) con baldas abarrotadas de juguetes (cajas de colores,
//     peluches, un robot, pelotas) y un tren de juguete que recorre la balda de arriba; en el centro el cartel luminoso de la
//     consola de bolsillo (x 130–190, y 30–66) y la pirámide de cajas de la consola (PIEZAS_TS.consolaBolsillo en su caja;
//     x 124–196, y 92–132) con globos atados; a la izquierda el escaparate (hueco x 4–66, y 26–118) a la calle soleada:
//     la acera, los coches que pasan, los paseantes, un árbol y la fachada de enfrente; la caseta de demostración con dos
//     consolas encendidas (x 86–122, tablero y 132; los niños juegan de pie delante, suelo 158). A la derecha, detrás del
//     mostrador, la pared con cajas y la tele de tubo (x 244–276, y 48–72) con un anuncio de símbolos.
//     Delante: el mostrador (x 230–318, tablero y 130; el tendero detrás, suelo 140, x 248–262) con el cuenco de caramelos
//     (x 233–247) y la caja registradora (x 284–312; o.caja 0–1 abre el cajón). El suelo de
//     baldosas en damero con brillos. Libre: x 70–226, suelo 140–178.
//     Cámara 'autobus' (de pie, suelo 177; sentados, suelo 156): el interior de un autobús urbano de 1989 de lado. Techo con
//     la tira de luz; la barra (y 38) con las asas que se balancean con el traqueteo, la franja de anuncios de pictogramas (una consola, una hamburguesa,
//     un sol, un teléfono), tres ventanas (x 8–92, 100–184, 192–270; y 38–92) por las que pasa la ciudad en paralaje (cielo
//     con nubes, rascacielos lejos, edificios, árboles y farolas deprisa, algún coche), el plano de la línea con sus paradas
//     a la derecha (x 278–316, y 52–92); el respaldo corrido de tela de los ochenta (y 104–152) con la luz de las ventanas que
//     barre y parpadea al pasar los árboles; el suelo de goma estriada (y 165–180) con un billete, un chicle y una lata que
//     rueda. Delante, en dos capas: guerraDelante con o.capa 'asientos' (después de los sentados y ANTES de los que van de
//     pie) pinta el borde del asiento corrido (y 151–165; los sentados asoman hasta la cintura: x 12–84, 104–176,
//     196–262); con o.capa 'barras' (después de los de pie) las dos barras verticales (x 96 y 188, y 38–178) con el
//     pulsador de parada; sin o.capa, las dos cosas.
export function guerra(R, t, o = {}) {
  const f = d_cualGuerra(o);
  return f[0](R, t, o);
}
// lo de delante de los personajes en cada encuadre de guerra(); se llama después de los actores, con las mismas opciones
export function guerraDelante(R, t, o = {}) {
  const f = d_cualGuerra(o);
  return f[1](R, t, o);
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría útil.
//   'estudio' (cámaras 'general' y 'estanteria'): el estudio de Atom de noche, cálido: papel pintado de rayas con
//     zócalo de cuarterones, tarima, alfombra; la ventana con cortinas, la ciudad de noche (luna, nubes a tres
//     velocidades, ventanas que se encienden, un avión, coches) y el gato en el alféizar; el radiador; la ESTANTERÍA
//     grande (4 baldas, x 94–210, y 24–146) donde los libros caen desde arriba y encajan en sus huecos (o.encajan 0–1:
//     van cayendo uno tras otro; o.balda: la balda que se llena, 2 por omisión) y, llena, se ilumina, se deshace en
//     chispas y las baldas de encima bajan una (o.desaparece 0–1); o.parpadean: los huecos de las otras baldas laten en
//     dorado (las «tareas pendientes»); el escritorio con el ordenador viejo (bloques monocromos sueltos en su pantalla),
//     el flexo, la taza que humea, los bloques de madera (PIEZAS_TS.bloques) y el reloj; o.pizarra: una pizarra de tiza
//     sobre el escritorio (en vez del cuadro) para que la escena dibuje encima (devuelve su hueco en .pizarra).
//     Cámara 'estanteria': la estantería de cerca (x 46–274, y 12–180, libros al doble), con el mismo gag y opciones.
//   'sueno': el laboratorio del sueño de Harvard en 2000, al anochecer: bloques de hormigón pintado, falso techo con
//     fluorescentes (uno parpadea), la ventana con Boston (ladrillo, una aguja, ventanas que se encienden), el póster
//     del cerebro con la luna, el corcho con notas, el reloj; la mesa larga con tres ordenadores beis de la época
//     (pantallas con bloques monocromos sueltos, cada una de un tono) y sus torres; a la derecha, la cristalera de la
//     habitación de dormir (la cama, la mesilla con su lamparita, la cámara de infrarrojos con su piloto, reflejos en el
//     cristal) y, delante, la mesa de control con el monitor de ondas que corren y el polígrafo que escupe papel.
//     o.durmiente: alguien duerme en la cama del fondo.
//     Cámara 'cama': la habitación de noche de cerca: la cama con el voluntario dormido (la cabeza en la almohada, los
//     ojos cerrados, los electrodos; o.durmiente false: la cama vacía), la manta que respira, la ventana con la luna y
//     su haz sobre la cama, la mesilla con el despertador (3 12), el carro del electroencefalograma con las ondas y los
//     cables; o.suena 0–1: bloques claros que caen y se posan sobre la almohada, con su halo.
//   'salon23': un salón de Oklahoma en diciembre de 2023, de noche: papel pintado, guirnalda de luces de colores, el
//     árbol con luces y regalos, la tele de tubo con antena en su mueble, la consola antigua (caja negra baja de carga
//     por arriba, sin logos) con su cartucho y el cable del mando (o.mando: [x, y] donde acaba; si no, se enrolla en el
//     suelo), el aro de luz de grabar, pósters sin letras, la ventana con el barrio (casas con luces, nieve, una farola,
//     un coche), el sofá con el gato; la pantalla con bloques monocromos sueltos y el nivel que sube; o.congela 0–1: la
//     imagen se para y entran rayas de colores.
//     Cámara 'tele': la tele de cerca (pantalla x 86–204, y 36–124) con la consola en el mueble.
//   'oficina96': una oficina de Honolulu en 1996, de día: el ventanal con persianas, el cielo con nubes a tres
//     velocidades y gaviotas, el volcán, la ciudad, el mar con un velero y las palmeras que se mecen; el ventilador del
//     techo que gira, la luz del sol en la moqueta, el cuadro de los bloques, el reloj, el dispensador de agua que hace
//     burbujas y la palmera en maceta; la mesa (x 196–312) con el ordenador de los noventa (salvapantallas de bloques),
//     la torre, el teléfono, los disquetes, el contrato y dos tazas de café que humean (o.tazas false: sin ellas).
//     Cámara 'mesa': la mesa de cerca: el contrato grande en el centro (PIEZAS_TS.contrato con o.firma, o.casillas,
//     o.sello), las dos tazas, el bolígrafo, el teclado, el ventanal con las palmeras al fondo.
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'sueno') return cam === 'cama' ? e_cama(R, t, o) : e_sueno(R, t, o);
  if (enc === 'salon23') return cam === 'tele' ? e_teleCerca(R, t, o) : e_salon(R, t, o);
  if (enc === 'oficina96') return cam === 'mesa' ? e_mesa96(R, t, o) : e_oficina(R, t, o);
  return cam === 'estanteria' ? e_estudioCerca(R, t, o) : e_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// estudio general: el helecho en su maceta (x 296–319) y la pila de libros del suelo (x 0–24); sueno general: el carrito
// de los electrodos (x 300–319); salon23 general: el puf (x 0–30) y la caja de pizza (x 288–319); oficina96 general: la
// planta baja (x 0–22). Todo abajo, por debajo de y 136: no tapa caras
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (cam !== 'general') return {};
  if (enc === 'estudio') { e_maceta(R, 307, 179, t, 16); e_pilaSuelo(R, 2, 179); }
  else if (enc === 'sueno') e_carrito(R, t, 300, 179);
  else if (enc === 'salon23') { e_puf(R, 14, 179); e_pizza(R, 302, 179); }
  else if (enc === 'oficina96') e_maceta(R, 10, 179, t, 12);
  return {};
}
// la paleta del centro: el gris verdoso de las paredes de instituto, la pintura verde del zócalo, el linóleo rojizo, el
// beis de los ordenadores, la noche de fuera y la luz cálida de las lámparas
const a_P = pal({
  techo: '#2c2e36', techoL: '#3a3c46', techoS: '#22232a', pared: '#8e9688', paredL: '#a2aa9a', paredS: '#727a6e', paredM: '#868e80',
  zocalo: '#3e6656', zocaloL: '#5a8a76', zocaloS: '#2c4c40', rodapie: '#2a2a2e',
  lino: '#7a4c3c', linoL: '#8e5c48', linoS: '#5e382c', linoJ: '#4a2c24', linoR: '#a0806c', linoF: '#6a6c88',
  beis: '#d2c8aa', beisL: '#e8e0c8', beisS: '#a89c80', beisD: '#7a705c', gris: '#9a9c98', grisL: '#bcbeb8', grisS: '#6c6e6a', grisD: '#4a4c4a',
  vidrioN: '#1a2230', vidrioNL: '#2c3a4e', cintaM: '#3a2a22', cintaL: '#5a4434',
  cielo0: '#0c1028', cielo1: '#151c3c', cielo2: '#232a52', cielo3: '#3a3458', nubeS: '#1e2240', nubeM: '#2c2e50', nubeL: '#4a4060',
  edif: '#1c2034', edifL: '#262c44', edifS: '#141828', ventC: '#f0c060', ventCs: '#b07a30', ventF: '#9ab8d8',
  nieve: '#dfe6f2', nieveS: '#aeb8d0', nieveD: '#7a86a8', nieveL: '#ffffff', farol: '#ffd27a', farolS: '#c88a3a', halo1: '#5a4a52', halo2: '#8a6a50',
  marco: '#d8d6c8', marcoS: '#9e9c90', marcoD: '#6a6a62', escarcha: '#c4d4ea', hierro: '#6a6660', hierroL: '#8c8880', hierroS: '#46423e',
  rojo: '#c8302a', rojoL: '#e8584a', rojoS: '#8a1e1a', oro: '#f0c040', oroS: '#b88a20', crema: '#efe6cc', cremaS: '#c8bc98',
  fosforo: '#5aff8a', fosforoM: '#2ec860', fosforoS: '#145a2a', pantN: '#06100a', tubo: '#f2f6ff', tuboL: '#cfe0f0', tuboHalo: '#b4bcc4',
  madera: '#7a4a2a', maderaL: '#9a6238', maderaS: '#4e2c18', maderaD: '#341c10', maderaV: '#6a3e22', clara: '#c8965a', claraL: '#e0b47a', claraS: '#9a6a38',
  piel: '#f2c092', bata: '#eef0f2', bataS: '#b8bcc8', traje: '#3a3e4a', pelo: '#3a2a20', k: '#141218', blanco: '#ffffff', verdeT: '#2e6a4a', verdeTL: '#4a8a64',
  calido: '#ffe0a0', calidoS: '#d8a860', frio: '#9ab4d8',
});

const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_b4 = (x, y) => (a_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla de dos colores (k = 0: a; k = 1: b)
function a_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// una rampa de colores tramada (v de 0 a rampa.length - 1)
const a_tono = (rampa, v, x, y) => { let l = Math.floor(v); if (v - l > a_b4(x, y)) l++; return rampa[Math.max(0, Math.min(rampa.length - 1, l))]; };

// cifras de 3 × 5 (solo números: la puerta, las notas) en (x, y) arriba a la izquierda, con su escala s
const a_CIF = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001011001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001001001', 8: '111101111101111', 9: '111101111001111' };

function a_cifras5(R, txt, x, y, c, s = 1) { [...String(txt)].forEach((d, k) => { const g = a_CIF[d]; if (g) for (let i = 0; i < 15; i++) if (g[i] === '1') R.rect(x + k * 4 * s + (i % 3) * s, y + Math.floor(i / 3) * s, x + k * 4 * s + (i % 3) * s + s - 1, y + Math.floor(i / 3) * s + s - 1, c); }); }

// un fondo fijo que se pinta una sola vez por lienzo y se copia entero en cada fotograma (con R.usar(b) y su prev)
const a_CAPAS = new WeakMap();

function a_capa(R, clave, dibuja) {
  let m = a_CAPAS.get(R); if (!m) a_CAPAS.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// oscurece (k > 0) o aclara hacia la luz (k < 0) lo ya pintado en un rectángulo, en trama de 4 × 4 (sombras y luces)
function a_tinte(R, x0, y0, x1, y1, col, f = 0.5, paso = 1) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x += paso) if (a_b4(x, y) < f) R.pset(x, y, a_mezcla(R.pget(x, y), col, 0.45));
}

// la luz de una lámpara (cono tramado de color cálido), de (cx, y0) hacia abajo, con su anchura arriba w0 y abajo w1
function a_cono(R, cx, y0, y1, w0, w1, col, f = 0.35) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0), w = w0 + (w1 - w0) * u, g = f * (1 - u * 0.6);
    for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const borde = 1 - Math.abs(x - cx) / Math.max(1, w); if (a_b4(x, y) < g * (0.4 + borde)) R.pset(x, y, a_mezcla(R.pget(x, y), col, 0.4)); } }
}

// una nube de noche en tres tonos (sombra, cuerpo y el borde de abajo encendido por la ciudad); la recorta R.recorte
function a_nubeNoche(R, cx, cy, w) {
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.2], [0.32, 0.06, 0.22], [-0.1, -0.12, 0.22], [0.15, -0.08, 0.19]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), a_P.nubeL);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), a_P.nubeM);
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w + 1), Math.round(cy + dy * w - 1), r(f * 0.75), a_P.nubeS);
}

// la calle de Moscú de noche vista por un hueco [x0, y0, x1, y1] (todo recortado a él): cielo tramado con nubes a dos
// velocidades, la torre de la época con su estrella roja, bloques de pisos con ventanas que se encienden y apagan, el
// cable del tranvía, las farolas con su halo cálido sobre la nieve, el tranvía que cruza (con su chispa) y la nieve que
// cae. o.dx desplaza la vista (cada ventana ve otro trozo de la misma calle); o.hor: la altura de la acera; o.torre:
// la x (de la calle) del rascacielos o null
function a_calle(R, t, x0, y0, x1, y1, o = {}) {
  const { pset, disco, linea, poligono } = R, rect = (a, b, c, d, col) => R.rect(Math.max(a, x0), Math.max(b, y0), Math.min(c, x1), Math.min(d, y1), col), P = a_P, dx = o.dx ?? 0, hor = o.hor ?? Math.round(y0 + (y1 - y0) * 0.7);
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, hor - y0); for (let x = x0; x <= x1; x++) pset(x, y, a_tono([P.cielo0, P.cielo1, P.cielo2, P.cielo3], u * 3.2, x, y)); }
  // las nubes, lentas y más lentas
  for (let k = 0; k < 3; k++) { const vel = k === 1 ? 1.1 : 0.55, W = 260, nx = ((h(k, 3, 77) * W + t * vel - dx) % W + W) % W - 40; a_nubeNoche(R, x0 + nx, y0 + 6 + k * 5 + h(k, 4, 77) * 6, 16 + k * 5); }
  // estrellas pálidas entre las nubes
  for (let k = 0; k < 10; k++) { const sx = x0 + Math.floor(h(k, 9, dx) * (x1 - x0)), sy = y0 + 2 + Math.floor(h(k, 8, dx) * (hor - y0) * 0.4); if (R.pget(sx, sy) === P.cielo0 || R.pget(sx, sy) === P.cielo1) pset(sx, sy, Math.sin(t * 2 + k) > 0.6 ? P.ventF : P.cielo3); }
  // el rascacielos (siete hermanas): cuerpo escalonado, aguja y la estrella roja que brilla
  if (o.torre != null) { const tx = x0 + o.torre, base = hor - 4;
    for (const [w, y] of [[16, base - 22], [11, base - 34], [7, base - 42], [4, base - 48]]) { rect(tx - w, y, tx + w, base, P.edifS); rect(tx - w, y, tx - w + 1, base, P.edifL); }
    linea(tx, base - 48, tx, base - 58, P.edifL); disco(tx, base - 60, 2, P.rojo); pset(tx, base - 60, P.rojoL);
    if (Math.sin(t * 1.5) > 0) R.anillo(tx, base - 60, 3, P.rojoS);
    for (let j = base - 44; j < base - 2; j += 3) for (let i = -10; i <= 10; i += 3) if (h(i, j, 5) > 0.72 && Math.abs(i) < (j < base - 34 ? 6 : j < base - 22 ? 10 : 15)) pset(tx + i, j, P.ventCs); }
  // los bloques de pisos (fila del fondo, más oscura, y la de delante con más luces)
  for (let fila = 0; fila < 2; fila++) { const ancho = fila ? 30 : 22, alto0 = fila ? 18 : 30, ytop = hor - 3;
    for (let wx = Math.floor((dx + x0 - 40) / ancho) * ancho; wx < dx + x1 + ancho; wx += ancho) { const n = Math.floor(wx / ancho) + fila * 31, hgt = alto0 + Math.floor(h(n, 1, 11) * 14), bx = x0 + wx - dx - x0 + (fila ? 6 : 0);
      const xa = bx, xb = bx + ancho - (fila ? 4 : 2), yt = ytop - hgt;
      rect(xa, yt, xb, ytop, fila ? P.edif : P.edifS); rect(xa, yt, xb, yt, P.edifL);
      if (fila) rect(xa, yt - 2, xa + 3, yt - 1, P.edif);
      for (let j = yt + 3; j < ytop - 2; j += 4) for (let i = xa + 2; i < xb - 1; i += 4) { const on = h(i + dx, j, n) > (fila ? 0.45 : 0.6), parpa = h(i, j, 3) > 0.93 && Math.sin(t * 0.7 + i) > 0.3;
        if (on !== parpa) { pset(i, j, h(i, j, 9) > 0.8 ? P.ventF : P.ventC); if (fila) pset(i + 1, j, P.ventCs); } } } }
  // la acera nevada con los surcos del tranvía, el cable y las farolas
  for (let y = hor; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, a_tono([P.nieveD, P.nieveS, P.nieve], 2.2 - (y - hor) * 0.12 + (h(x >> 1, y, 4) - 0.5) * 0.8, x, y));
  for (const yr of [hor + 4, hor + 7]) if (yr <= y1) linea(x0, yr, x1, yr, P.nieveD);
  linea(x0, hor - 15, x1, hor - 15, P.k);
  for (let wx = Math.floor((dx + x0) / 46) * 46 + 20; wx < dx + x1 + 46; wx += 46) { const lx = x0 + wx - dx - x0 + 0;
    R.halo(lx, hor - 12, 13, [P.halo1, P.halo2], 0.9); linea(lx, hor - 12, lx, hor + 2, P.k); rect(lx - 3, hor - 13, lx + 1, hor - 12, P.k); disco(lx - 2, hor - 11, 1, P.farol);
    for (let i = -6; i <= 6; i++) if (hor + 3 <= y1) pset(lx + i, hor + 3 + (Math.abs(i) > 4 ? 1 : 0), P.calidoS); }
  // el tranvía: rojo abajo, crema arriba, ventanas encendidas, el trole y la chispa; cruza cada 15 s
  { const per = 15, u = ((t + (o.fase ?? 0)) % per) / per, trx = -80 + u * 520 - dx, ty = hor + 6;
    if (trx > x0 - 70 && trx < x1 + 10) { rect(trx, ty - 12, trx + 56, ty, P.k); rect(trx + 1, ty - 11, trx + 55, ty - 5, P.crema); rect(trx + 1, ty - 4, trx + 55, ty - 1, P.rojo); rect(trx + 1, ty - 11, trx + 55, ty - 11, P.blanco);
      for (let i = trx + 4; i < trx + 52; i += 7) rect(i, ty - 9, i + 4, ty - 6, Math.floor(i / 7) % 5 === 2 ? P.ventCs : P.ventC);
      for (const r of [trx + 10, trx + 46]) disco(r, ty, 2, P.k);
      linea(trx + 30, ty - 12, trx + 22, hor - 15, P.k);
      if (Math.sin(t * 23) > 0.85) { pset(trx + 22, hor - 16, P.blanco); pset(trx + 21, hor - 17, P.ventF); pset(trx + 23, hor - 14, P.ventF); } } }
  // la nieve que cae, en dos tamaños, con un vaivén
  for (let k = 0; k < 28; k++) { const Wd = x1 - x0 + 10, Hd = y1 - y0 + 6, cerca = k % 3 === 0, vel = cerca ? 14 : 8;
    const fx = x0 + ((h(k, 1, 5) * Wd + Math.sin(t * 1.3 + k) * 3 + t * 2) % Wd + Wd) % Wd - 5, fy = y0 + (h(k, 2, 5) * Hd + t * vel) % Hd - 3;
    pset(fx, fy, P.nieveL); if (cerca) { pset(fx + 1, fy, P.nieve); pset(fx, fy + 1, P.nieveS); } }
  R.recorte(null);
}

// una ventana de doble hoja de instituto soviético, pintada de blanco crema: la calle por el hueco, el marco con su
// sombra, el larguero y el travesaño, el ventanillo (fortochka) arriba, la escarcha de las esquinas y la nieve en el
// alféizar de fuera
function a_ventana(R, t, x0, y0, x1, y1, o = {}) {
  const { rect, pset } = R, P = a_P;
  a_calle(R, t, x0 + 3, y0 + 3, x1 - 3, y1 - 4, o);
  // la nieve amontonada contra el cristal de abajo
  for (let x = x0 + 3; x <= x1 - 3; x++) { const hh = 2 + Math.round(h(x, 1, 21) * 2 + Math.sin(x * 0.4) * 0.8); rect(x, y1 - 4 - hh, x, y1 - 4, hh > 3 ? P.nieve : P.nieveS); pset(x, y1 - 4 - hh, P.nieveL); }
  // la escarcha de las esquinas (tramada)
  for (const [cx, cy] of [[x0 + 3, y0 + 3], [x1 - 3, y0 + 3], [x0 + 3, y1 - 4], [x1 - 3, y1 - 4]]) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) {
    const x = cx + i, y = cy + j; if (x < x0 + 3 || x > x1 - 3 || y < y0 + 3 || y > y1 - 4) continue; const d = Math.hypot(i, j); if (d < 9 && a_b4(x, y) < (1 - d / 9) * 0.9) pset(x, y, P.escarcha); }
  // el marco, el larguero y el travesaño (la luz por arriba a la izquierda, la sombra abajo a la derecha)
  const mx = Math.round((x0 + x1) / 2), my = y0 + Math.round((y1 - y0) * 0.36);
  rect(x0, y0, x1, y0 + 2, P.marco); rect(x0, y0, x0 + 2, y1, P.marco); rect(x1 - 2, y0, x1, y1, P.marcoS); rect(x0, y1 - 3, x1, y1, P.marcoS);
  rect(x0, y0, x1, y0, P.k); rect(x0, y0, x0, y1, P.k); rect(x1, y0, x1, y1, P.k); rect(x0 + 3, y0 + 3, x1 - 3, y0 + 3, P.marcoD);
  rect(mx - 1, y0, mx + 1, y1, P.marco); rect(mx + 1, y0 + 3, mx + 1, y1 - 3, P.marcoS);
  rect(x0, my - 1, x1, my + 1, P.marco); rect(x0 + 3, my + 1, x1 - 3, my + 1, P.marcoS);
  // el ventanillo de arriba a la izquierda, entreabierto (su marco y su cristal un poco más oscuro)
  { const fx1 = mx - 1, fy1 = my - 1; rect(x0 + 5, y0 + 5, fx1 - 3, y0 + 5, P.marco); rect(x0 + 5, fy1 - 2, fx1 - 3, fy1 - 2, P.marcoS); rect(x0 + 5, y0 + 5, x0 + 5, fy1 - 2, P.marco); rect(fx1 - 3, y0 + 5, fx1 - 3, fy1 - 2, P.marcoS);
    rect(fx1 - 6, y0 + 9, fx1 - 5, y0 + 10, P.hierroS); }
  // la manilla y el alféizar de dentro (madera pintada con su canto)
  rect(mx + 3, my + 6, mx + 4, my + 10, P.hierroL); pset(mx + 3, my + 6, P.blanco);
  rect(x0 - 3, y1 + 1, x1 + 3, y1 + 3, P.marco); rect(x0 - 3, y1 + 1, x1 + 3, y1 + 1, P.blanco); rect(x0 - 3, y1 + 4, x1 + 3, y1 + 4, P.marcoD);
  // la luz fría que entra por el cristal: una trama azulada en el alféizar
  for (let x = x0; x <= x1; x += 2) pset(x, y1 + 2, P.frio);
}

// la textura de una pared pintada: el color con moteado, desconchones pequeños y la luz que baja (de arriba, la lámpara)
function a_pared(R, x0, y0, x1, y1, base, luz, sombra, k = 0) {
  const { pset, rect } = R; rect(x0, y0, x1, y1, base);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x >> 1, y >> 1, k); if (n > 0.86) pset(x, y, luz); else if (n < 0.1) pset(x, y, sombra); }
  for (let k2 = 0; k2 < (x1 - x0) * (y1 - y0) / 900; k2++) { const cx = x0 + Math.floor(h(k2, 1, k + 50) * (x1 - x0)), cy = y0 + Math.floor(h(k2, 2, k + 50) * (y1 - y0)); pset(cx, cy, sombra); pset(cx + 1, cy, luz); pset(cx, cy + 1, luz); }
}

// el zócalo de pintura de aceite brillante (verde de instituto) con su filete, el brillo que corre y el rodapié
function a_zocalo(R, x0, x1, y0, y1, k = 0) {
  const { rect, pset } = R, P = a_P; rect(x0, y0, x1, y1, P.zocalo);
  rect(x0, y0, x1, y0 + 1, P.rojoS); rect(x0, y0 + 2, x1, y0 + 2, P.zocaloS);
  for (let y = y0 + 3; y <= y1 - 4; y++) for (let x = x0; x <= x1; x++) { const n = h(x >> 2, y, k + 9); if (n > 0.92) pset(x, y, P.zocaloL); else if (n < 0.06) pset(x, y, P.zocaloS); }
  for (let x = x0; x <= x1; x += 1) if (((x + y0) >> 3) % 5 === 0) pset(x, y0 + 5 + ((x >> 1) % 2), P.zocaloL);
  rect(x0, y1 - 3, x1, y1, P.rodapie); rect(x0, y1 - 3, x1, y1 - 3, P.grisS);
}

// un radiador de hierro fundido (los elementos con su luz y su sombra, la tubería que baja y la llave) y, encima, el
// aire caliente que tiembla (con t)
function a_radiador(R, t, x0, x1, y0, y1) {
  const { rect, pset } = R, P = a_P;
  for (let x = x0; x <= x1; x += 4) { rect(x, y0, x + 2, y1, P.k); rect(x + 1, y0 + 1, x + 2, y1 - 1, P.hierro); rect(x + 1, y0 + 1, x + 1, y1 - 1, P.hierroL); pset(x + 2, y0 + 2, P.hierroS); }
  rect(x0, y0 + 3, x1 + 2, y0 + 4, P.hierroS); rect(x0, y1 - 4, x1 + 2, y1 - 3, P.hierroS);
  rect(x1 + 3, y0 + 2, x1 + 5, y1 + 6, P.k); rect(x1 + 4, y0 + 2, x1 + 4, y1 + 6, P.hierroL); rect(x1 + 2, y0 + 4, x1 + 6, y0 + 6, P.rojoS);
  for (let k = 0; k < 6; k++) { const u = (t * 0.6 + k / 6) % 1, x = x0 + 4 + Math.floor(h(k, 1, 31) * (x1 - x0 - 8)) + Math.round(Math.sin(t * 3 + k) * 1.5), y = y0 - 2 - Math.round(u * 8); if (u < 0.8) pset(x, y, a_mezcla(R.pget(x, y), P.blanco, 0.25)); }
}

// un cartel soviético sin letras: fondo rojo o crema con rayos, un pictograma grande (estrella, engranaje o cohete) y
// barras en lugar de texto; con su sombra en la pared y las chinchetas
function a_cartel(R, x0, y0, x1, y1, tipo) {
  const { rect, pset, disco, poligono, linea } = R, P = a_P, cx = Math.round((x0 + x1) / 2), w = x1 - x0;
  rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, P.paredS);
  rect(x0, y0, x1, y1, tipo === 'engranaje' ? P.crema : P.rojo);
  // los rayos que salen del pictograma (tramados)
  const cy = y0 + Math.round((y1 - y0) * 0.42);
  for (let y = y0 + 1; y < y1 - 7; y++) for (let x = x0 + 1; x < x1; x++) { const a = Math.atan2(y - cy, x - cx); if (Math.floor((a + 3.2) * 4) % 2 === 0 && a_b4(x, y) < 0.5) pset(x, y, tipo === 'engranaje' ? P.cremaS : P.rojoL); }
  const r = Math.max(5, Math.round(w * 0.3));
  if (tipo === 'estrella') { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    poligono(pts.map(([x, y]) => [x + 1, y + 1]), P.rojoS); poligono(pts, P.oro); poligono(pts.slice(0, 4).concat([[cx, cy]]), P.oroS); }
  else if (tipo === 'engranaje') { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rect(Math.round(cx + Math.cos(a) * r) - 1, Math.round(cy + Math.sin(a) * r) - 1, Math.round(cx + Math.cos(a) * r) + 1, Math.round(cy + Math.sin(a) * r) + 1, P.rojo); }
    disco(cx, cy, r - 1, P.rojo); disco(cx, cy, Math.max(2, r - 4), P.crema); R.anillo(cx - 1, cy - 1, r - 2, P.rojoL);
    disco(cx, cy, 2, P.rojoS); }
  else { poligono([[cx, cy - r], [cx + 3, cy + r - 3], [cx - 3, cy + r - 3]], P.crema); rect(cx - 1, cy - r + 4, cx + 1, cy - r + 6, P.k); poligono([[cx - 3, cy + r - 4], [cx - 6, cy + r], [cx - 3, cy + r]], P.oro); poligono([[cx + 3, cy + r - 4], [cx + 6, cy + r], [cx + 3, cy + r]], P.oro);
    for (let i = 0; i < 3; i++) pset(cx - 1 + i, cy + r + 1 + (i % 2), P.oro); }
  // las barras del lema (sin letras)
  rect(x0 + 3, y1 - 6, x1 - 3, y1 - 5, tipo === 'engranaje' ? P.rojo : P.crema); rect(x0 + 5, y1 - 3, x1 - 6, y1 - 3, tipo === 'engranaje' ? P.rojoS : P.cremaS);
  rect(x0, y0, x1, y0, P.k); rect(x0, y1, x1, y1, P.k); rect(x0, y0, x0, y1, P.k); rect(x1, y0, x1, y1, P.k);
  for (const x of [x0 + 2, x1 - 2]) { pset(x, y0 + 2, P.hierroS); pset(x, y0 + 1, P.blanco); }
  pset(x1 - 1, y1 - 1, P.cremaS); pset(x1 - 2, y1 - 1, P.cremaS);
}

// un fluorescente colgado (la caja de chapa, el tubo y la trama de luz que cae); con parpadea, se apaga a ratos
function a_fluorescente(R, t, x0, x1, y, parpadea = false) {
  const { rect, pset } = R, P = a_P, on = !(parpadea && (t % 4.7) < 0.6 && Math.sin(t * 47) > -0.3);
  rect(x0 + 6, y - 3, x0 + 6, y - 1, P.grisD); rect(x1 - 6, y - 3, x1 - 6, y - 1, P.grisD);
  rect(x0 - 1, y, x1 + 1, y + 2, P.k); rect(x0, y, x1, y, P.grisS); rect(x0, y + 1, x1, y + 2, on ? P.tubo : P.grisD); if (on) rect(x0 + 2, y + 1, x1 - 2, y + 1, P.blanco);
  if (on) for (let yy = y + 3; yy < y + 13; yy++) { const e = yy - y - 3; for (let x = x0 - e; x <= x1 + e; x++) if (a_b4(x, yy) < 0.28 - e * 0.025) pset(x, yy, a_mezcla(R.pget(x, yy), P.tuboL, 0.3)); }
  return on;
}

// un armario de cinta magnética (24 × 74, la esquina de arriba a la izquierda en (x, y)), la parte que no se mueve: la
// caja beis y gris con su luz y su sombra, el panel de arriba, el cristal de la puerta con su marco, los botones de abajo
// y la rejilla de ventilación
function a_cintaFija(R, x, y) {
  const { rect, pset } = R, P = a_P;
  rect(x, y, x + 23, y + 73, P.k); rect(x + 1, y + 1, x + 22, y + 72, P.beis); rect(x + 1, y + 1, x + 22, y + 1, P.beisL); rect(x + 1, y + 1, x + 1, y + 72, P.beisL); rect(x + 21, y + 2, x + 22, y + 72, P.beisS);
  rect(x + 2, y + 3, x + 20, y + 10, P.grisD); rect(x + 2, y + 3, x + 20, y + 3, P.gris);
  rect(x + 3, y + 13, x + 19, y + 46, P.grisS); rect(x + 4, y + 14, x + 18, y + 45, P.vidrioN);
  rect(x + 3, y + 49, x + 20, y + 54, P.grisL); for (let i = 0; i < 4; i++) { rect(x + 4 + i * 4, y + 50, x + 6 + i * 4, y + 52, i === 0 ? P.rojo : P.gris); pset(x + 4 + i * 4, y + 50, P.blanco); }
  for (let yy = y + 57; yy < y + 70; yy += 2) rect(x + 4, yy, x + 19, yy, P.beisD);
  rect(x + 1, y + 71, x + 22, y + 72, P.grisD);
}

// lo que se mueve del armario de cinta: las dos bobinas (arriba y abajo) que giran a tirones, adelante y atrás, con la
// cinta enrollada, el bucle de cinta que sube y baja entre ellas, el reflejo del cristal y los pilotos que parpadean
function a_cintaVida(R, t, x, y, k) {
  const { rect, pset, disco, linea } = R, P = a_P;
  const ang = t * 3.2 * (k % 2 ? 1 : -1) + 2.4 * Math.sin(t * 1.1 + k * 1.9) + k;
  for (const [cy, lleno] of [[y + 22, 0.4 + 0.3 * Math.sin(t * 0.1 + k)], [y + 38, 0.7 - 0.3 * Math.sin(t * 0.1 + k)]]) {
    const cx = x + 11; disco(cx, cy, 6.5, P.grisL); disco(cx, cy, 2.5 + lleno * 3.5, P.cintaM); R.anillo(cx, cy, 2.5 + lleno * 3.5, P.cintaL);
    for (let s = 0; s < 3; s++) { const a = ang + s * 2.094; linea(cx, cy, Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), P.grisS); }
    disco(cx, cy, 1.5, P.grisD); pset(cx, cy, P.blanco); }
  const lb = Math.round(3 + 2 * Math.sin(t * 2.6 + k)); linea(x + 17, y + 22, x + 17, y + 30 + lb, P.cintaL); linea(x + 18, y + 22, x + 18, y + 30 + lb, P.cintaM);
  for (let i = 0; i < 8; i += 2) pset(x + 6 + i, y + 42 - i * 3, P.vidrioNL);
  for (let i = 0; i < 6; i++) { const on = Math.sin(t * (2 + i * 0.7) + k * 3 + i) > 0.2; pset(x + 4 + i * 3, y + 6, on ? [P.rojoL, P.oro, P.fosforo][i % 3] : P.grisS); }
  pset(x + 4, y + 8, Math.floor(t * 2 + k) % 2 ? P.fosforo : P.fosforoS);
}

// una figura pequeña de fondo (12 px de alto) con los pies en (x, suelo): la cabeza, el pelo, la bata o el traje y las
// piernas que andan; o.anda, o.dir, o.brazo (0–1, el brazo que sube a tocar algo), o.ropa ('bata' o 'traje')
function a_figura(R, t, x, suelo, o = {}) {
  const { rect, pset } = R, P = a_P, ropa = o.ropa === 'traje' ? P.traje : P.bata, ropaS = o.ropa === 'traje' ? P.k : P.bataS, paso = o.anda ? Math.floor(t * 6) % 2 : 0, d = o.dir ?? 1;
  x = Math.round(x);
  rect(x - 2, suelo - 4, x - 1, suelo - 1 + (paso ? -1 : 0), P.traje); rect(x + 1, suelo - 4, x + 2, suelo - 1 - (paso ? 0 : 1) + 1, P.traje);
  rect(x - 3, suelo - 9, x + 3, suelo - 4, ropa); rect(x + (d > 0 ? -3 : 2), suelo - 9, x + (d > 0 ? -3 : 3), suelo - 4, ropaS);
  const br = o.brazo ?? 0; if (br > 0) { rect(x + 3 * d, suelo - 9 - Math.round(br * 3), x + 4 * d, suelo - 8, ropa); pset(x + 4 * d, suelo - 10 - Math.round(br * 3), P.piel); } else pset(x + 3 * d, suelo - 5, P.piel);
  rect(x - 2, suelo - 13, x + 2, suelo - 10, P.piel); rect(x - 2, suelo - 13, x + 2, suelo - 13, o.pelo ?? P.pelo); pset(x - 2 * d, suelo - 12, o.pelo ?? P.pelo); pset(x + d, suelo - 11, P.k);
  rect(x - 3, suelo, x + 3, suelo, a_mezcla(R.pget(x, suelo), P.k, 0.4));
}

// LA SALA GRANDE: lo fijo (en su búfer)
function a_salaFija(R) {
  const { rect, pset, linea, poligono, disco } = R, P = a_P;
  // el techo de placas con sus juntas, tranquilo (debajo va la barra del año)
  rect(0, 0, 319, 15, P.techo); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 13, P.techoS); rect(0, 7, 319, 7, P.techoS);
  for (let k = 0; k < 60; k++) pset(Math.floor(h(k, 1, 2) * 320), Math.floor(h(k, 2, 2) * 13), P.techoL);
  rect(0, 14, 319, 15, P.grisD); rect(0, 14, 319, 14, P.grisS);
  // la pared con su moteado y la luz que baja de los tubos; el zócalo verde
  a_pared(R, 0, 16, 319, 87, P.pared, P.paredL, P.paredS, 1);
  for (let y = 16; y < 30; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < 0.25 - (y - 16) * 0.018) pset(x, y, P.paredS);
  a_zocalo(R, 0, 319, 88, 121, 1);
  // las sombras de las ventanas en la pared, los radiadores (lo vivo va aparte) y la tubería que corre
  rect(0, 113, 319, 114, P.hierroS); rect(0, 113, 319, 113, P.hierroL);
  // el cartel de la estrella y, debajo, el reloj de pared
  a_cartel(R, 120, 24, 146, 60, 'estrella');
  disco(133, 72, 6, P.k); disco(133, 72, 5, P.crema); R.anillo(133, 72, 5, P.cremaS); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; pset(Math.round(133 + Math.cos(a) * 4), Math.round(72 + Math.sin(a) * 4), P.grisS); }
  // la pancarta roja sobre los armarios: tela con pliegues, estrella, engranaje y barras de lema (sin letras)
  rect(154, 21, 274, 21, P.k); for (const x of [156, 214, 272]) { pset(x, 20, P.hierroS); pset(x, 19, P.hierroS); }
  for (let y = 22; y <= 36; y++) for (let x = 156; x <= 272; x++) { const pl = (x - 156) % 16; pset(x, y, pl < 2 ? P.rojoS : pl < 5 ? P.rojoL : P.rojo); }
  for (let x = 156; x <= 272; x += 4) { pset(x, 37, P.rojo); pset(x + 1, 37, P.rojoS); }
  a_cartelPicto(R, 'estrella', 166, 29, 5); a_cartelPicto(R, 'engranaje', 262, 29, 5);
  rect(178, 26, 250, 27, P.crema); rect(184, 31, 244, 32, P.crema); rect(178, 26, 250, 26, P.blanco);
  // el cartel del engranaje a la derecha (bajo la esquina de Atom)
  a_cartel(R, 286, 50, 310, 76, 'engranaje');
  // la impresora de líneas: el armario gris, la tapa con su ventanilla, la caja de papel continuo y los botones
  rect(116, 84, 150, 121, P.k); rect(117, 85, 149, 120, P.gris); rect(117, 85, 149, 86, P.grisL); rect(147, 87, 149, 120, P.grisS);
  rect(119, 88, 146, 97, P.grisS); rect(120, 89, 145, 96, P.vidrioN);
  for (let i = 0; i < 3; i++) { rect(121 + i * 5, 101, 123 + i * 5, 102, [P.fosforoM, P.oro, P.rojo][i]); }
  for (let yy = 106; yy < 119; yy += 2) rect(120, yy, 145, yy, P.grisS);
  // los cinco armarios de cinta y su sombra en el zócalo
  for (let i = 0; i < 5; i++) { a_cintaFija(R, 154 + i * 24, 46); }
  for (let y = 121; y < 124; y++) for (let x = 152; x < 276; x++) if (a_b4(x, y) < 0.5) pset(x, y, P.k);
  // la consola de la derecha: el pupitre inclinado con diales, interruptores y el osciloscopio
  rect(277, 80, 319, 121, P.k); rect(278, 81, 319, 120, P.gris); rect(278, 81, 319, 81, P.grisL); rect(278, 81, 278, 120, P.grisL);
  poligono([[276, 92], [319, 88], [319, 100], [276, 100]], P.grisS); linea(276, 92, 319, 88, P.grisL);
  rect(282, 83, 300, 87, P.grisD);
  for (let i = 0; i < 4; i++) { disco(284 + i * 9, 106, 3, P.k); disco(284 + i * 9, 106, 2, P.grisL); pset(284 + i * 9, 104, P.k); }
  for (let i = 0; i < 6; i++) { rect(282 + i * 6, 113, 284 + i * 6, 116, P.grisD); pset(283 + i * 6, 113, P.grisL); }
  // el suelo de linóleo en baldosas, en perspectiva, con su veta
  for (let y = 122; y < 180; y++) for (let x = 0; x < 320; x++) {
    const z = (y - 112) / 68, u = (x - 160) / (z * 1.8) / 22, v = 1 / z * 3, cel = (Math.floor(u) + Math.floor(v)) & 1, jun = (u % 1 + 1) % 1 < 0.06 / z || (v % 1 + 1) % 1 < 0.06 / z * 3;
    pset(x, y, jun ? P.linoJ : a_tono(cel ? [P.linoS, P.lino, P.linoL] : [P.linoJ, P.linoS, P.lino], 1.2 + (h(x >> 1, y, 7) - 0.5) * 0.9 + z * 0.4, x, y)); }
  rect(0, 122, 319, 122, P.k);
  // la canaleta de los cables que sale de los armarios y los cables que serpentean hacia las mesas
  rect(150, 124, 278, 126, P.grisD); rect(150, 124, 278, 124, P.gris);
  for (const [xa, xb, c] of [[170, 70, P.k], [196, 92, P.grisD], [230, 262, P.k], [250, 292, P.grisD]]) { let px = xa, py = 127; for (let y = 127; y < 142; y++) { const x = Math.round(xa + (xb - xa) * ((y - 127) / 15) ** 1.4 + Math.sin(y * 0.6) * 1.5); linea(px, py, x, y, c); px = x; py = y; } }
}

// un pictograma de cartel (estrella o engranaje) pequeño, centrado en (cx, cy) con radio r
function a_cartelPicto(R, tipo, cx, cy, r) {
  const { poligono, disco, rect } = R, P = a_P;
  if (tipo === 'estrella') { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } poligono(pts, P.oro); }
  else { for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; rect(Math.round(cx + Math.cos(a) * r) - 1, Math.round(cy + Math.sin(a) * r) - 1, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), P.oro); } disco(cx, cy, r - 1, P.oro); disco(cx, cy, Math.max(1, r - 3), P.rojo); }
}

// LA SALA GRANDE: el decorado entero con su vida
function a_sala(R, t, o) {
  const { rect, pset, linea, disco } = R, P = a_P;
  a_capa(R, 'sala', () => a_salaFija(R));
  // las dos ventanas altas a la calle (cada una ve otro trozo) y su luz fría en el suelo
  a_ventana(R, t, 8, 24, 56, 80, { dx: 0, torre: 30 });
  a_ventana(R, t, 64, 24, 112, 80, { dx: 0 });
  for (const [x0, x1] of [[10, 54], [66, 110]]) for (let y = 128; y < 150; y++) { const e = (y - 128) * 0.7; for (let x = Math.round(x0 + e); x <= Math.round(x1 + e * 1.4); x += 1) if (a_b4(x, y) < 0.14) pset(x, y, P.linoF); }
  a_radiador(R, t, 14, 48, 92, 110); a_radiador(R, t, 70, 104, 92, 110);
  // el reloj (la aguja de los segundos corre) y las bobinas, pilotos y bucles de los armarios
  { const a = t * Math.PI / 30 - Math.PI / 2; linea(133, 72, Math.round(133 + Math.cos(a) * 4), Math.round(72 + Math.sin(a) * 4), P.rojo); linea(133, 72, 133, 69, P.k); linea(133, 72, 135, 72, P.k); }
  for (let i = 0; i < 5; i++) a_cintaVida(R, t, 154 + i * 24, 46, i);
  // la impresora: el papel pijama que sale por arriba y cae en pliegues, la cabeza que va y viene tras la ventanilla
  { const off = Math.floor(t * 3) % 6; for (let y = 76; y < 84; y++) rect(121, y, 144, y, (y + off) % 6 < 1 ? P.fosforoS : P.blanco); for (let y = 76; y < 84; y += 3) { pset(122, y, P.grisS); pset(143, y, P.grisS); }
    const cab = 121 + Math.round((Math.sin(t * 6) * 0.5 + 0.5) * 22); rect(cab, 91, cab + 1, 94, P.grisL); pset(cab, 92, P.blanco);
    pset(121, 99, Math.floor(t * 4) % 2 ? P.fosforo : P.fosforoS);
    for (let k = 0; k < 4; k++) { const y = 72 - k * 2 + (Math.floor(t * 3) % 2); rect(124 - k, y, 141 + k, y, k % 2 ? P.crema : P.blanco); } }
  // la consola: el osciloscopio con su onda, los pilotos y el operario que gira un dial
  { R.recorte([283, 84, 299, 86]); for (let x = 283; x <= 299; x++) pset(x, Math.round(85 + Math.sin(x * 0.7 + t * 8) * 1.4), P.fosforo); R.recorte(null);
    for (let i = 0; i < 7; i++) pset(303 + (i % 4) * 4, 84 + Math.floor(i / 4) * 3, Math.sin(t * 3 + i * 1.7) > 0 ? [P.rojoL, P.oro, P.fosforo][i % 3] : P.grisD);
    a_figura(R, t, 300, 121, { dir: 1, brazo: 0.5 + 0.5 * Math.sin(t * 1.4), ropa: 'traje', pelo: P.grisS }); }
  // el científico de bata que pasa por delante de los armarios (va y vuelve)
  { const per = 16, u = (t % per) / per, ida = u < 0.5, x = ida ? 150 + u * 2 * 120 : 270 - (u - 0.5) * 2 * 120; a_figura(R, t, x, 121, { anda: true, dir: ida ? 1 : -1 }); }
  // los fluorescentes (el del medio parpadea) y su reflejo en el linóleo
  const on = [a_fluorescente(R, t, 34, 84, 16), a_fluorescente(R, t, 128, 178, 16, true), a_fluorescente(R, t, 214, 264, 16)];
  [[59, on[0]], [153, on[1]], [239, on[2]]].forEach(([cx, e]) => { if (!e) return; for (const [y, w] of [[130, 18], [136, 22], [146, 28]]) for (let x = cx - w; x <= cx + w; x += 2) if (a_b4(x, y) < 0.6) pset(x + ((y >> 1) % 2), y, P.linoR); });
  return { suelo: 150, sueloDelante: 172, libre: [128, 210], ventanas: [[8, 24, 56, 80], [64, 24, 112, 80]], armarios: [154, 46, 273, 120], consola: [277, 80, 319, 121], impresora: [116, 72, 150, 121], cartelEstrella: [120, 24, 146, 60] };
}

// LAS DOS MESAS DE DELANTE DE LA SALA: tapa de madera con su canto y sus vetas, el faldón con cajones y tiradores, las
// patas de metal y la sombra en el suelo; encima, en la izquierda, el terminal (PIEZAS_TS.terminal), el rompecabezas de
// madera, la taza que humea y el flexo con su luz; en la derecha, otro ordenador (pantalla de corchetes), listados de
// papel pijama, el teléfono, una caja de disquetes y un vaso de lápices
function a_mesaFrente(R, x0, x1, y) {
  const { rect, pset } = R, P = a_P;
  for (let yy = Math.min(y + 32, 174); yy < 180; yy++) for (let x = x0 - 2; x <= x1 + 6; x++) if (a_b4(x, yy) < 0.5) pset(x, yy, a_mezcla(R.pget(x, yy), P.k, 0.5));
  rect(x0, y - 5, x1, y, P.k); rect(x0 + 1, y - 4, x1 - 1, y - 1, P.madera); rect(x0 + 1, y - 4, x1 - 1, y - 4, P.maderaL);
  for (let x = x0 + 2; x < x1 - 1; x++) if (h(x, 3, 41) > 0.7) pset(x, y - 3 + (x % 2), P.maderaV);
  rect(x0, y + 1, x1, y + 2, P.maderaS);
  const pb = Math.min(y + 30, 172), fh = pb - y;
  rect(x0 + 2, y + 3, x1 - 2, pb + 1, P.k); rect(x0 + 3, y + 3, x1 - 3, pb, P.maderaV);
  for (let yy = y + 3; yy <= pb; yy++) for (let x = x0 + 3; x <= x1 - 3; x++) { const v = Math.sin(x * 0.11 + Math.sin(yy * 0.3 + x * 0.02) * 2.2); if (v > 0.82) pset(x, yy, P.madera); else if (v < -0.9) pset(x, yy, P.maderaS); }
  const n = Math.max(2, Math.round((x1 - x0) / 36)), w = (x1 - x0 - 6) / n;
  for (let i = 0; i < n; i++) { const a = Math.round(x0 + 3 + i * w), b = Math.round(x0 + 3 + (i + 1) * w) - 1; rect(a, y + 3, a, pb, P.maderaL); rect(b, y + 3, b, pb, P.maderaS);
    const ym = y + Math.round(fh * 0.47); rect(a + 1, ym, b - 1, ym, P.maderaS); const cx = Math.round((a + b) / 2), y1a = y + Math.round(fh * 0.25), y2a = y + Math.round(fh * 0.72);
    rect(cx - 3, y1a, cx + 3, y1a + 1, P.hierroS); rect(cx - 3, y1a, cx + 3, y1a, P.hierroL); rect(cx - 3, y2a, cx + 3, y2a + 1, P.hierroS); rect(cx - 3, y2a, cx + 3, y2a, P.hierroL); }
  rect(x0 + 3, pb - 1, x1 - 3, pb, P.maderaS);
  for (const x of [x0 + 3, x1 - 6]) { rect(x, pb + 1, x + 3, 179, P.k); rect(x + 1, pb + 1, x + 2, 178, P.grisS); pset(x + 1, pb + 1, P.grisL); }
}

function a_salaMesas(R, t, o) {
  const { rect, pset, disco, linea } = R, P = a_P, y = 146;
  a_mesaFrente(R, 16, 124, y); a_mesaFrente(R, 212, 316, y);
  // la izquierda: papeles, el terminal, el rompecabezas, la taza y el flexo con su cono de luz cálida
  rect(70, y - 6, 88, y - 4, P.crema); rect(72, y - 7, 90, y - 6, P.blanco); for (let x = 74; x < 88; x += 3) pset(x, y - 6, P.grisS);
  if (o.terminal !== false) PIEZAS_TS.terminal?.(R, 46, y - 3, { texto: o.texto ?? 3, completa: o.completa, t });
  a_puzle(R, 98, y - 5, 1, o.piezas ?? 1);
  const tz = [82, y - 5]; if (o.taza !== false) a_taza(R, t, tz[0], tz[1]);
  a_flexo(R, t, 118, y - 4, -1);
  // la derecha: el ordenador de oficina (caja beis, monitor con corchetes), listados, teléfono, disquetes y lápices
  a_monitorPeq(R, t, 290, y - 4, 1);
  for (let k = 0; k < 2; k++) { rect(226 - k, y - 6 - k * 2, 252 - k, y - 5 - k * 2, k % 2 ? P.crema : P.blanco); for (let x = 228 - k; x < 250 - k; x += 3) pset(x, y - 6 - k * 2, P.fosforoS); }
  for (let k = 0; k < 3; k++) { const yy = y - 4 + k; pset(226 + (k % 2), yy, P.blanco); }
  rect(256, y - 9, 268, y - 5, P.k); rect(257, y - 8, 267, y - 6, P.rojo); rect(256, y - 11, 268, y - 10, P.rojoS); rect(255, y - 12, 258, y - 10, P.k); rect(266, y - 12, 269, y - 10, P.k); disco(262, y - 7, 1, P.crema);
  rect(214, y - 12, 224, y - 5, P.k); rect(215, y - 11, 223, y - 5, P.carton ?? P.claraS); for (let k = 0; k < 4; k++) rect(216 + k * 2, y - 14 + (k % 2), 216 + k * 2, y - 11, P.k);
  rect(306, y - 12, 311, y - 5, P.grisS); rect(306, y - 12, 311, y - 12, P.grisL); for (const [dx, c] of [[0, P.rojo], [2, P.oro], [4, P.fosforoM]]) linea(307 + dx, y - 12, 307 + dx - 1, y - 17, c);
  return { terminal: [46, y - 23], puzle: [98, y - 7], taza: tz, flexo: [106, y - 22], suelo: 150 };
}

// la taza de té o café con su plato, el brillo y el humo que sube ondulando (pie en (x, y))
function a_taza(R, t, x, y, s = 1) {
  const { rect, pset } = R, P = a_P;
  rect(x - 4 * s, y, x + 4 * s, y, P.grisL); rect(x - 3 * s, y - 6 * s, x + 2 * s, y - 1, P.k); rect(x - 2 * s, y - 5 * s, x + 1 * s, y - 1, P.blanco); rect(x - 2 * s, y - 5 * s, x - 2 * s + s - 1, y - 1, P.crema);
  rect(x + 3 * s, y - 5 * s, x + 4 * s, y - 2 * s, P.k); pset(x + 3 * s, y - 4 * s, P.blanco); rect(x - 2 * s, y - 3 * s, x + 1 * s, y - 3 * s, P.rojo);
  for (let k = 0; k < 7 * s; k++) { const u = ((t * 0.45 + k / (7 * s)) % 1), yy = y - 7 * s - Math.round(u * 14 * s), xx = x + Math.round(Math.sin(u * 7 + t * 1.6) * 2 * s); if (u < 0.85) pset(xx, yy, a_mezcla(R.pget(xx, yy), P.blanco, 0.55 - u * 0.4)); }
}

// el rompecabezas de madera de cinco cuadrados: una bandeja (caja) y piezas de madera clara en tonos de un solo color,
// cada una de cinco cuadrados, con su luz y su sombra; s: tamaño de cada cuadrado (1 → 3 px); lleno 0–1: cuántas
// piezas están dentro (las demás, sueltas al lado)
const a_PENTO = [[[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1]], [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]]];

function a_puzle(R, cx, y, s, lleno = 1) {
  const { rect, pset } = R, P = a_P, q = 3 * s, qy = Math.max(2, Math.round(q * 0.6)), W = 6 * q, H = 4 * qy, x0 = Math.round(cx - W / 2), y0 = Math.round(y - H);
  rect(x0 - 2, y0 - 2, x0 + W + 1, y0 + H + 1, P.k); rect(x0 - 1, y0 - 1, x0 + W, y0 + H, P.maderaS); rect(x0, y0, x0 + W - 1, y0 + H - 1, P.maderaD); rect(x0 - 1, y0 - 1, x0 + W, y0 - 1, P.maderaV);
  rect(x0 - 1, y0 + H + 1, x0 + W + 1, y0 + H + 1, P.maderaD);
  const sitios = [[0, 0], [3, 0], [0, 1], [2, 2], [1, 3], [4, 1]], dentro = Math.round(lleno * a_PENTO.length);
  a_PENTO.forEach((pz, i) => {
    const fuera = i >= dentro, [bx, by] = fuera ? [W + q + (i - dentro) * 3 * q, -qy + ((i * 2) % 3) * qy] : [sitios[i][0] * q, sitios[i][1] * qy];
    pz.forEach(([a, b]) => { const X = x0 + bx + a * q, Y = y0 + by + b * qy;
      if (!fuera && (X >= x0 + W || Y >= y0 + H)) return;
      rect(X, Y, X + q - 1, Y + qy - 1, (i % 2) ? P.clara : P.claraL); rect(X + q - 1, Y, X + q - 1, Y + qy - 1, P.claraS); rect(X, Y + qy - 1, X + q - 1, Y + qy - 1, P.claraS); if (s > 1) { pset(X + 1, Y + 1, P.blanco); pset(X + 2, Y + Math.floor(qy / 2), P.claraS); } });
    if (fuera) { const sx = x0 + bx, sy = y0 + by + 3 * qy; rect(sx, sy, sx + 2 * q, sy, P.maderaS); }
  });
}

// el flexo: la base, el brazo de dos tramos con el muelle, la pantalla verde y la bombilla, y su luz cálida que cae
// (base en (x, y); dir hacia dónde mira; s escala)
function a_flexo(R, t, x, y, dir = -1, s = 1, luz = 1) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P, cx = x + dir * 12 * s, cy = y - 22 * s;
  if (luz) a_cono(R, cx, cy + 3 * s, y + 2, 2 * s, 14 * s, P.calido, 0.42);
  rect(x - 4 * s, y - 1 * s, x + 4 * s, y, P.k); rect(x - 3 * s, y - 1 * s, x + 3 * s, y - 1 * s, P.verdeTL);
  linea(x, y - 1, x - dir * 3 * s, y - 14 * s, P.k); linea(x + 1, y - 1, x - dir * 3 * s + 1, y - 14 * s, P.grisS);
  linea(x - dir * 3 * s, y - 14 * s, cx, cy, P.k); linea(x - dir * 3 * s, y - 15 * s, cx, cy - 1, P.grisL);
  disco(x - dir * 3 * s, y - 14 * s, 1 * s, P.grisD);
  poligono([[cx - 4 * s, cy + 4 * s], [cx + 4 * s, cy + 4 * s], [cx + 2 * s, cy - 1 * s], [cx - 2 * s, cy - 1 * s]], P.verdeT); linea(cx - 2 * s, cy - 1 * s, cx + 2 * s, cy - 1 * s, P.verdeTL);
  rect(cx - 2 * s, cy + 4 * s, cx + 2 * s, cy + 4 * s + Math.max(0, s - 1), P.calido); pset(cx, cy + 4 * s, P.blanco);
}

// un ordenador de oficina pequeño (monitor beis con pantalla de corchetes verdes que cambian, la caja y el teclado);
// pie en (x, y)
function a_monitorPeq(R, t, x, y, k = 0) {
  const { rect, pset } = R, P = a_P;
  rect(x - 14, y - 2, x + 14, y, P.k); rect(x - 13, y - 2, x + 13, y - 1, P.beis); for (let i = x - 11; i < x + 12; i += 2) pset(i, y - 2, P.beisD);
  rect(x - 12, y - 24, x + 12, y - 5, P.k); rect(x - 11, y - 23, x + 11, y - 6, P.beis); rect(x - 11, y - 23, x + 11, y - 23, P.beisL); rect(x + 10, y - 22, x + 11, y - 6, P.beisS);
  rect(x - 9, y - 21, x + 7, y - 9, P.pantN); rect(x - 4, y - 5, x + 4, y - 3, P.beisS);
  for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) { if (h(c, f, k + Math.floor(t * 0.8)) < 0.45) continue; const gx = x - 8 + c * 4, gy = y - 19 + f * 4; pset(gx, gy, P.fosforoM); pset(gx, gy + 1, P.fosforoM); pset(gx + 2, gy, P.fosforoM); pset(gx + 2, gy + 1, P.fosforoM); }
  if (Math.sin(t * 5 + k) > 0) rect(x - 8, y - 11, x - 7, y - 10, P.fosforo);
  pset(x + 8, y - 8, P.fosforo);
}

// EL RINCÓN DE PÁZHITNOV (cámara 'terminal'): lo fijo
function a_rinconFija(R) {
  const { rect, pset, disco, linea } = R, P = a_P;
  rect(0, 0, 319, 7, P.techo); rect(0, 6, 319, 7, P.grisD);
  a_pared(R, 0, 8, 319, 89, P.pared, P.paredL, P.paredS, 3);
  for (let y = 8; y < 26; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < 0.22 - (y - 8) * 0.012) pset(x, y, P.paredS);
  a_zocalo(R, 0, 319, 90, 117, 3);
  // el canto de un armario de cinta a la izquierda (lo vivo, aparte)
  rect(0, 14, 22, 117, P.k); rect(0, 15, 21, 116, P.beis); rect(19, 16, 21, 116, P.beisS); rect(0, 15, 21, 15, P.beisL);
  rect(2, 20, 17, 28, P.grisD); rect(2, 34, 17, 74, P.grisS); rect(3, 35, 16, 73, P.vidrioN); for (let yy = 82; yy < 112; yy += 2) rect(3, yy, 17, yy, P.beisD);
  // el tablón de corcho con las notas de Pázhitnov (pictogramas: la pieza de cinco cuadrados, la raqueta, un 4, una
  // flecha que gira) y sus chinchetas
  const cx0 = 150, cy0 = 26, cx1 = 192, cy1 = 74;
  rect(cx0 - 2, cy0 - 2, cx1 + 2, cy1 + 2, P.madera); rect(cx0 - 2, cy0 - 2, cx1 + 2, cy0 - 2, P.maderaL); rect(cx0 - 1, cy1 + 2, cx1 + 2, cy1 + 2, P.maderaS);
  for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) pset(x, y, a_tono([P.claraS, P.clara, P.claraL], 1 + (h(x, y, 13) - 0.5) * 1.6, x, y));
  const nota = (x, y, w, hh, c, inc) => { rect(x + 1, y + 1, x + w + 1, y + hh + 1, P.claraS); rect(x, y, x + w, y + hh, c); rect(x, y, x + w, y, P.blanco); disco(x + Math.round(w / 2), y + 1, 1, inc); };
  nota(153, 29, 16, 15, P.crema, P.rojo); for (const [a, b] of [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]) rect(156 + a * 3, 33 + b * 3, 157 + a * 3, 34 + b * 3, P.k);
  nota(173, 30, 15, 17, P.blanco, P.fosforoM); { R.anillo(180, 37, 4, P.k); linea(183, 40, 186, 44, P.k); for (let i = -2; i <= 2; i += 2) { linea(178 + i + 2, 34, 178 + i + 2, 40, P.grisS); } linea(177, 37, 183, 37, P.grisS); }
  nota(154, 50, 14, 16, P.blanco, P.oro); a_cifras5(R, '4', 159, 56, P.k, 2);
  nota(172, 52, 17, 13, P.crema, P.rojo); { for (let a = 0; a < 5; a++) pset(180 + Math.round(Math.cos(a * 1.1) * 4), 58 + Math.round(Math.sin(a * 1.1) * 4), P.k); rect(183, 61, 185, 61, P.k); pset(185, 60, P.k); }
  // la ventana (lo vivo, aparte) y el radiador bajo ella
  // la estantería de la derecha con archivadores de colores apagados, cajas y una planta (bajo la esquina de Atom)
  rect(274, 50, 319, 52, P.k); rect(274, 50, 319, 50, P.maderaL); rect(274, 51, 319, 52, P.madera);
  rect(274, 80, 319, 82, P.k); rect(274, 80, 319, 80, P.maderaL); rect(274, 81, 319, 82, P.madera);
  for (let i = 0; i < 7; i++) { const c = [P.rojoS, P.verdeT, P.grisS, P.claraS, P.traje, P.rojoS, P.verdeT][i], hh = 18 + (i % 3) * 3; rect(278 + i * 5, 79 - hh, 281 + i * 5, 79, P.k); rect(279 + i * 5, 80 - hh, 281 + i * 5, 79, c); rect(279 + i * 5, 74 - hh + 8, 280 + i * 5, 75 - hh + 8, P.crema); }
  rect(278, 100, 300, 112, P.k); rect(279, 101, 299, 111, P.carton ?? P.claraS); rect(279, 101, 299, 102, P.claraL); rect(286, 105, 292, 106, P.cremaS);
  rect(306, 70, 314, 79, P.k); rect(307, 71, 313, 79, P.rojoS); for (const [dx, dy] of [[-3, -6], [0, -9], [3, -7], [-1, -4], [2, -3]]) { rect(310 + dx, 70 + dy, 311 + dx, 72 + dy, P.verdeT); pset(310 + dx, 70 + dy, P.verdeTL); }
}

function a_rincon(R, t, o) {
  const { rect, pset } = R, P = a_P;
  a_capa(R, 'rincon', () => a_rinconFija(R));
  a_ventana(R, t, 200, 18, 268, 84, { dx: 140, torre: 60, fase: 6 });
  a_radiador(R, t, 206, 254, 92, 110);
  // los pilotos del armario de cinta y una bobina que asoma por su cristal
  for (let i = 0; i < 5; i++) pset(4 + i * 3, 23, Math.sin(t * (2.3 + i) + i) > 0.2 ? [P.rojoL, P.oro, P.fosforo][i % 3] : P.grisS);
  { R.recorte([3, 35, 16, 73]); const a = t * 3 + Math.sin(t * 1.1) * 2; R.disco(10, 46, 7, P.grisL); R.disco(10, 46, 5, P.cintaM); for (let s = 0; s < 3; s++) R.linea(10, 46, Math.round(10 + Math.cos(a + s * 2.1) * 7), Math.round(46 + Math.sin(a + s * 2.1) * 7), P.grisS); R.recorte(null); }
  // la luz de la pantalla grande se derrama por la pared (verde tenue que respira)
  { const f = 0.18 + 0.05 * Math.sin(t * 2.3); for (let y = 30; y < 118; y++) for (let x = 140; x < 200; x += 1) { const d = (x - 140) / 60; if (a_b4(x, y) < f * (1 - d)) pset(x, y, a_mezcla(R.pget(x, y), P.fosforoS, 0.5)); } }
  return { suelo: 125, ventana: [200, 18, 268, 84], corcho: [148, 24, 194, 76] };
}

// LA MESA DE CERCA (cámara 'terminal'): la tapa de madera vista desde arriba, el terminal grande, el teclado, el
// cuaderno, la taza, la bandeja del rompecabezas y el flexo
function a_rinconMesa(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P;
  // la tapa: tablero de madera con vetas largas en perspectiva, el canto del fondo y la luz del flexo
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 100) / 80, u = (x - 160) / z, v = Math.sin(u * 0.05 + Math.sin(u * 0.013 + y * 0.02) * 2.5 + (y * 0.03));
    pset(x, y, a_tono([P.maderaS, P.maderaV, P.madera, P.maderaL], 1.6 + v * 0.7 + (h(u >> 2, y >> 1, 3) - 0.5) * 0.5 + z * 0.3, x, y)); }
  rect(0, 117, 319, 118, P.maderaD); rect(0, 119, 319, 119, P.maderaL);
  // el terminal grande: caja beis, bisel, la pantalla negra de fósforo con los corchetes, el reflejo y el pie
  a_pantallaGrande(R, t, o);
  // el teclado en perspectiva (las filas de teclas con su luz) con su cable
  poligono([[34, 152], [148, 152], [140, 132], [44, 132]], P.k); poligono([[36, 150], [146, 150], [139, 133], [45, 133]], P.beis); linea(45, 133, 139, 133, P.beisL);
  for (let f = 0; f < 4; f++) { const y = 135 + f * 4, a = 46 - f * 2 + 2, b = 138 + f * 2 - 2; for (let x = a; x < b; x += 5) { rect(x, y, x + 3, y + 2, P.beisS); rect(x, y, x + 3, y, P.beisL); } }
  rect(70, 151, 112, 151, P.beisD);
  { const tecla = Math.floor(t * 5) % 9; if (Math.sin(t * 9) > 0.4) rect(56 + tecla * 8, 140, 59 + tecla * 8, 141, P.beisD); }
  linea(92, 132, 96, 126, P.k);
  // el cuaderno abierto con pictogramas (la pieza de cinco cuadrados, la raqueta, el 4) y el lápiz
  poligono([[156, 172], [214, 172], [208, 140], [160, 140]], P.k); poligono([[157, 171], [184, 171], [184, 141], [161, 141]], P.blanco); poligono([[185, 171], [213, 171], [207, 141], [185, 141]], P.crema);
  linea(184, 141, 184, 171, P.cremaS); for (let y = 146; y < 170; y += 4) { linea(163 - (y - 141) * 0.12, y, 182, y, P.tuboL); linea(187, y, 206 + (y - 141) * 0.2, y, P.tuboL); }
  for (const [a, b] of [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1]]) rect(166 + a * 3, 147 + b * 3, 167 + a * 3, 148 + b * 3, P.k);
  R.anillo(195, 152, 4, P.k); linea(198, 155, 202, 160, P.k); a_cifras5(R, '4', 164, 158, P.k, 2);
  linea(190, 166, 206, 160, P.oro); linea(190, 167, 206, 161, P.oroS); pset(189, 167, P.k);
  // la taza que humea
  if (o.taza !== false) a_taza(R, t, 226, 140, 2);
  // la bandeja con el rompecabezas de madera, más grande (o.piezas: cuántas están dentro)
  a_puzle(R, 266, 172, 2, o.piezas ?? 0.67);
  // el flexo: pinza en el canto de la derecha, brazo y pantalla, con su cono cálido sobre la bandeja
  a_flexo(R, t, 304, 132, -1, 2);
  // el cable de la lámpara y una moneda de un rublo junto al cuaderno (la del sueldo)
  linea(304, 132, 319, 124, P.k);
  if (o.rublo) PIEZAS_TS.rublo?.(R, 222, 168, { giro: 0 });
  return { pantalla: [40, 40, 136, 106], teclado: [92, 142], taza: [226, 128], puzle: [266, 160], suelo: 125 };
}

// la pantalla grande del terminal (cámara 'terminal'): la caja, el bisel, y en la pantalla, corchetes [ ] verdes que
// caen y encajan en todo el ancho (montones a la izquierda y a la derecha, una pieza que baja); la fila de abajo
// completa parpadea y desaparece (o.fila 0–1 o el ciclo de t); scanlines, el brillo del cristal y la luz verde
function a_pantallaGrande(R, t, o) {
  const { rect, pset, linea, disco } = R, P = a_P, X0 = 40, Y0 = 40, X1 = 136, Y1 = 106;
  // el pie y la caja
  rect(70, 112, 106, 124, P.k); rect(71, 112, 105, 123, P.beisS); rect(64, 122, 112, 127, P.k); rect(65, 122, 111, 126, P.beis); rect(65, 122, 111, 122, P.beisL);
  rect(24, 24, 152, 116, P.k); rect(25, 25, 151, 115, P.beis); rect(25, 25, 151, 26, P.beisL); rect(25, 25, 26, 115, P.beisL); rect(148, 27, 151, 115, P.beisS); rect(25, 112, 151, 115, P.beisS);
  for (let y = 27; y < 112; y++) for (let x = 27; x < 148; x++) if (h(x, y, 61) > 0.94) pset(x, y, P.beisL);
  rect(33, 32, 143, 112, P.beisD); rect(35, 34, 141, 110, P.grisD); rect(36, 35, 140, 109, P.k);
  rect(38, 37, 138, 108, P.pantN);
  // la placa con el piloto y los dos mandos de abajo (sin letras)
  pset(130, 113, P.fosforo); rect(118, 113, 120, 113, P.beisD); rect(122, 113, 124, 113, P.beisD); rect(34, 113, 52, 113, P.beisD);
  // lo que hay en la pantalla: celdas de 8 × 6 (12 de ancho, 11 de alto)
  const cw = 8, ch = 6, nc = 12, nf = 11;
  const ciclo = o.fila != null ? null : (t % 6) / 6, fila = o.fila != null ? Math.max(0, Math.min(1, o.fila)) : (ciclo < 0.55 ? 0 : (ciclo - 0.55) / 0.45);
  const cae = o.fila != null || ciclo >= 0.55 ? 1 : ciclo / 0.55, dy = Math.round((1 - cae) * 8), borrada = fila >= 0.7;
  // el montón: alturas por columna (la columna 7 vacía: la fila de abajo tiene ahí su hueco hasta que la pieza encaja)
  const alt = [3, 2, 3, 2, 2, 1, 2, 0, 2, 3, 2, 3];
  let celdas = [];
  for (let c = 0; c < nc; c++) for (let f = 0; f < alt[c]; f++) celdas.push([c, f, 0]);
  // la pieza que baja (cuatro corchetes en «L») y encaja en el hueco de la columna 7
  for (const [c, f] of [[7, 0], [7, 1], [7, 2], [8, 2]]) celdas.push([c, f + dy, 1]);
  if (borrada) celdas = celdas.filter(([, f]) => f !== 0).map(([c, f, m]) => [c, f - 1, m]);
  const brilla = fila > 0 && !borrada && Math.sin(t * 16) > 0;
  for (const [c, f, mov] of celdas) {
    if (f < 0 || f >= nf) continue;
    const gx = X0 + 2 + c * cw, gy = Y1 - 3 - (f + 1) * ch, col = (!borrada && fila > 0 && f === 0) ? (brilla ? P.blanco : P.fosforo) : mov && cae < 1 ? P.fosforo : P.fosforoM;
    rect(gx, gy, gx + 1, gy, col); rect(gx, gy, gx, gy + 4, col); rect(gx, gy + 4, gx + 1, gy + 4, col);
    rect(gx + 5, gy, gx + 6, gy, col); rect(gx + 6, gy, gx + 6, gy + 4, col); rect(gx + 5, gy + 4, gx + 6, gy + 4, col);
  }
  // el destello de la fila que se va (unos puntos que suben)
  if (fila > 0.6 && fila < 0.95) for (let k = 0; k < 12; k++) pset(X0 + 4 + k * 8, Y1 - 9 - Math.round((fila - 0.6) * 30) - (k % 3), P.fosforo);
  // el cursor que parpadea arriba (nada más: ni marcador, ni cuenta, ni pieza siguiente, ni pozo)
  if (Math.sin(t * 5) > -0.2) rect(X0 + 2, Y0 + 2, X0 + 4, Y0 + 5, P.fosforo);
  // las líneas de barrido, el resplandor de los bordes, la curva del cristal y su reflejo
  for (let y = Y0 - 2; y <= Y1 + 1; y += 2) for (let x = X0 - 2; x <= X1 + 1; x++) if (R.pget(x, y) === P.pantN) pset(x, y, P.k);
  for (let x = X0 - 2; x <= X1 + 1; x++) { pset(x, Y0 - 3, P.grisD); pset(x, Y1 + 2, P.grisD); }
  // la banda de refresco del tubo, que baja despacio (solo aclara el fondo negro, no los corchetes)
  { const by = Math.round(Y0 - 2 + ((t * 9) % (Y1 - Y0 + 12)) - 8), fu = [0.06, 0.13, 0.2, 0.2, 0.13, 0.06];
    for (let j = 0; j < 6; j++) { const y = by + j; if (y < Y0 - 2 || y > Y1 + 1) continue; const fo = a_mezcla(P.pantN, P.fosforoS, fu[j]), fk = a_mezcla(P.k, P.fosforoS, fu[j] * 0.7);
      for (let x = X0 - 2; x <= X1 + 1; x++) { const c = R.pget(x, y); if (c === P.pantN) pset(x, y, fo); else if (c === P.k) pset(x, y, fk); } } }
  for (let i = 0; i < 18; i++) { pset(X0 + 6 + i, Y0 + 2 + Math.round(i * 0.5), P.vidrioNL); }
  for (let i = 0; i < 10; i++) pset(X1 - 6 - i, Y1 - 2, P.vidrioNL);
  // la luz verde sobre el teclado y la tapa
  for (let y = 117; y < 132; y++) for (let x = 40; x < 140; x++) if (a_b4(x, y) < 0.22 - (y - 117) * 0.012) pset(x, y, a_mezcla(R.pget(x, y), P.fosforoM, 0.35));
}
// EL PASILLO: lo fijo
function a_pasilloFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P;
  rect(0, 0, 319, 13, P.techo); for (let x = 0; x < 320; x += 32) rect(x, 0, x, 12, P.techoS); rect(0, 14, 319, 17, P.cremaS); rect(0, 14, 319, 14, P.crema); rect(0, 17, 319, 17, P.paredS);
  a_pared(R, 0, 18, 319, 83, P.crema, a_mezcla(P.crema, P.blanco, 0.45), a_mezcla(P.crema, P.cremaS, 0.7), 5);
  for (let y = 18; y < 34; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < 0.2 - (y - 18) * 0.012) pset(x, y, P.cremaS);
  a_zocalo(R, 0, 319, 84, 127, 5);
  // el parqué en espiga, con las juntas, el brillo de las lámparas y la sombra del rodapié
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 112) / 68, u = (x - 160) / z / 6, v = (y - 128) / z / 3.2, a = Math.floor(u + v), b = Math.floor(u - v), espiga = (a + b) & 1, f = espiga ? (u + v) % 1 : (u - v + 100) % 1;
    const jun = (espiga ? ((u - v + 100) % 2) : ((u + v) % 2)) < 0.12;
    pset(x, y, jun ? P.maderaD : a_tono([P.maderaS, P.maderaV, P.madera, P.maderaL], 1.4 + (h(a, b, 4) - 0.5) * 1.2 + (f < 0.1 ? -0.6 : 0) + (h(x >> 2, y, 5) - 0.5) * 0.4, x, y)); }
  for (let y = 128; y < 131; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < 0.6 - (y - 128) * 0.2) pset(x, y, P.maderaD);
  // la puerta 214: el marco, los cuarterones con su luz y su sombra, el montante de cristal encendido, la manilla y la
  // placa del número
  const puerta = (x0, x1, y0, n, abierta) => {
    rect(x0 - 3, y0 - 9, x1 + 3, 127, P.maderaD); rect(x0 - 2, y0 - 8, x1 + 2, 127, P.madera); rect(x0 - 2, y0 - 8, x1 + 2, y0 - 8, P.maderaL); rect(x0 - 2, y0 - 8, x0 - 2, 127, P.maderaL);
    rect(x0, y0 - 6, x1, y0 - 2, P.k); rect(x0 + 1, y0 - 5, x1 - 1, y0 - 3, P.calidoS); rect(x0 + 1, y0 - 5, x1 - 1, y0 - 5, P.calido); for (let x = x0 + 6; x < x1; x += 6) rect(x, y0 - 5, x, y0 - 3, P.k);
    rect(x0, y0, x1, 127, P.k);
    if (abierta) { rect(x0 + 1, y0 + 1, x0 + 3, 127, P.calido); rect(x0 + 4, y0 + 1, x0 + 4, 127, P.calidoS); }
    const xa = abierta ? x0 + 5 : x0 + 1;
    rect(xa, y0 + 1, x1 - 1, 127, P.maderaV); rect(xa, y0 + 1, x1 - 1, y0 + 1, P.maderaL);
    for (let y = y0 + 2; y < 127; y++) for (let x = xa; x < x1; x++) { const v = Math.sin(x * 0.9 + Math.sin(y * 0.08 + x) * 1.6); if (v > 0.9) pset(x, y, P.madera); else if (v < -0.92) pset(x, y, P.maderaS); }
    for (const [ya, yb] of [[y0 + 6, y0 + 36], [y0 + 42, 120]]) { rect(xa + 4, ya, x1 - 5, yb, P.maderaS); rect(xa + 5, ya + 1, x1 - 5, yb, P.madera); rect(xa + 5, ya + 1, x1 - 5, ya + 1, P.maderaL); rect(xa + 5, ya + 1, xa + 5, yb, P.maderaL); }
    rect(x1 - 6, y0 + 39, x1 - 2, y0 + 40, P.oroS); rect(x1 - 6, y0 + 39, x1 - 3, y0 + 39, P.oro); rect(x1 - 4, y0 + 41, x1 - 3, y0 + 44, P.oroS);
    if (n) { rect(xa + 7, y0 + 10, xa + 23, y0 + 18, P.k); rect(xa + 8, y0 + 11, xa + 22, y0 + 17, P.crema); a_cifras5(R, n, xa + 9, y0 + 12, P.k); }
    for (let y = 128; y < 132; y++) for (let x = x0; x <= x1; x++) if (a_b4(x, y) < 0.35) pset(x, y, P.maderaD);
  };
  puerta(14, 48, 52, '214', false);
  puerta(190, 222, 52, '', true);
  // el tablón de corcho con papeles de barras, una foto, un dibujo de cuadrados y chinchetas rojas
  const tx0 = 58, ty0 = 44, tx1 = 112, ty1 = 84;
  rect(tx0 - 2, ty0 - 2, tx1 + 2, ty1 + 2, P.madera); rect(tx0 - 2, ty0 - 2, tx1 + 2, ty0 - 2, P.maderaL); rect(tx0 - 1, ty1 + 3, tx1 + 3, ty1 + 3, P.cremaS);
  for (let y = ty0; y <= ty1; y++) for (let x = tx0; x <= tx1; x++) pset(x, y, a_tono([P.claraS, P.clara, P.claraL], 1 + (h(x, y, 17) - 0.5) * 1.6, x, y));
  const papel = (x, y, w, hh, c, chin, barras = true) => { rect(x + 1, y + 1, x + w + 1, y + hh + 1, P.claraS); rect(x, y, x + w, y + hh, c); if (barras) for (let yy = y + 3; yy < y + hh - 1; yy += 2) rect(x + 2, yy, x + 2 + Math.floor(h(x, yy, 3) * (w - 4)), yy, P.grisS); disco(x + Math.round(w / 2), y + 1, 1, chin); };
  papel(61, 47, 14, 18, P.blanco, P.rojo); papel(78, 46, 16, 13, P.crema, P.fosforoM); papel(97, 48, 12, 16, P.blanco, P.rojo);
  papel(62, 68, 13, 13, P.crema, P.oro, false); rect(64, 71, 73, 79, P.grisS); rect(65, 72, 72, 78, P.frio); rect(66, 76, 71, 78, P.verdeT); disco(70, 74, 1, P.crema);
  papel(79, 63, 14, 17, P.blanco, P.rojo, false); for (const [a, b] of [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1]]) rect(81 + a * 3, 68 + b * 3, 82 + a * 3, 69 + b * 3, P.k); a_cifras5(R, '5', 85, 74, P.rojo);
  papel(96, 67, 13, 14, P.rojo, P.oro, false); a_cartelPicto(R, 'estrella', 102, 74, 4);
  // el reloj sobre la segunda puerta (la aguja va aparte) y el cartel del engranaje
  disco(206, 34, 7, P.k); disco(206, 34, 6, P.blanco); R.anillo(206, 34, 6, P.cremaS); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; pset(Math.round(206 + Math.cos(a) * 5), Math.round(34 + Math.sin(a) * 5), P.grisS); }
  a_cartel(R, 228, 18, 252, 44, 'engranaje');
  // el extintor colgado entre la ventana y la puerta
  rect(178, 98, 184, 120, P.k); rect(179, 101, 183, 119, P.rojo); rect(179, 101, 179, 119, P.rojoL); rect(180, 98, 182, 100, P.grisD); linea(184, 101, 186, 110, P.k); rect(179, 108, 183, 111, P.crema);
  // la mampara de cristal de la sala de ordenadores: el marco de madera, el antepecho, y dentro (recortado) la sala fría
  rect(232, 50, 319, 127, P.maderaD); rect(233, 51, 319, 126, P.madera); rect(233, 51, 319, 51, P.maderaL);
  rect(236, 55, 319, 109, P.k);
  R.recorte([237, 56, 319, 108]);
  for (let y = 56; y <= 108; y++) for (let x = 237; x <= 319; x++) pset(x, y, a_tono([P.grisS, P.paredM, P.paredL], 1.2 + (y < 66 ? 0.6 : 0) + (h(x >> 1, y >> 1, 21) - 0.5) * 0.5, x, y));
  rect(237, 84, 319, 108, P.lino); for (let y = 86; y < 109; y += 4) rect(237, y, 319, y, P.linoS);
  rect(250, 58, 300, 59, P.tubo); rect(250, 57, 300, 57, P.grisD);
  a_cartel(R, 300, 62, 314, 78, 'estrella');
  for (const [mx, my] of [[248, 92], [272, 92], [296, 92]]) { rect(mx - 11, my, mx + 11, my + 2, P.maderaS); rect(mx - 11, my, mx + 11, my, P.maderaL); rect(mx - 10, my + 3, mx - 9, 106, P.grisD); rect(mx + 9, my + 3, mx + 10, 106, P.grisD);
    rect(mx - 7, my - 13, mx + 7, my - 1, P.k); rect(mx - 6, my - 12, mx + 6, my - 1, P.beis); rect(mx - 4, my - 10, mx + 4, my - 4, P.pantN); rect(mx + 5, my - 12, mx + 6, my - 1, P.beisS); }
  R.recorte(null);
  // los parteluces y el reflejo del cristal, el antepecho de madera con cuarterones
  for (const x of [264, 292]) { rect(x - 1, 55, x + 1, 109, P.madera); rect(x - 1, 55, x - 1, 109, P.maderaL); }
  for (let k = 0; k < 4; k++) { const xa = 240 + k * 22; for (let i = 0; i < 14; i++) pset(xa + i, 104 - i * 3, a_mezcla(R.pget(xa + i, 104 - i * 3), P.blanco, 0.3)); }
  rect(233, 109, 319, 112, P.maderaL); rect(233, 112, 319, 113, P.maderaS);
  for (const x0 of [236, 264, 292]) { rect(x0, 115, x0 + 24, 124, P.maderaS); rect(x0 + 1, 116, x0 + 24, 124, P.madera); rect(x0 + 1, 116, x0 + 24, 116, P.maderaL); }
}

function a_pasillo(R, t, o) {
  const { rect, pset, linea, disco } = R, P = a_P;
  a_capa(R, 'pasillo', () => a_pasilloFijo(R));
  a_ventana(R, t, 120, 22, 176, 88, { dx: 300, torre: 30, fase: 9 });
  a_radiador(R, t, 128, 168, 98, 118);
  // la luz fría de la ventana en el parqué y la cálida de la puerta entreabierta (que tiembla un poco)
  for (let y = 132; y < 158; y++) { const e = (y - 132) * 0.6; for (let x = Math.round(118 + e); x <= Math.round(178 + e * 1.5); x++) if (a_b4(x, y) < 0.12) pset(x, y, P.linoF); }
  //   (un haz suave: se mezcla con el parqué, más fuerte junto a la rendija y en su eje, y respira poco a poco)
  { const f = 0.34 + 0.03 * Math.sin(t * 1.7) + 0.015 * Math.sin(t * 4.1);
    for (let y = 128; y < 162; y++) { const k = (y - 128) / 34, a = 191 - (y - 128) * 0.55, b = 195 + (y - 128) * 0.35, m = (a + b) / 2, w = (b - a) / 2;
      for (let x = Math.floor(a); x <= Math.ceil(b); x++) { const d = Math.min(1, Math.abs(x - m) / w), al = f * (1 - k) * (1 - k) * (1 - d * d);
        if (al > 0.02) pset(x, y, a_mezcla(R.pget(x, y), P.calido, al)); } } }
  // el reloj: la aguja de los segundos y las de la hora
  { const a = t * Math.PI / 30 - Math.PI / 2; linea(206, 34, Math.round(206 + Math.cos(a) * 5), Math.round(34 + Math.sin(a) * 5), P.rojo); linea(206, 34, 206, 30, P.k); linea(206, 34, 209, 35, P.k); }
  // la sala de detrás de la mampara: las pantallas con corchetes que cambian, la operadora que teclea, otra que pasa
  R.recorte([237, 56, 319, 108]);
  for (const [mx, my, k] of [[248, 92, 0], [272, 92, 1], [296, 92, 2]]) for (let f = 0; f < 2; f++) for (let c = 0; c < 2; c++) { if (h(c, f, k * 7 + Math.floor(t * 0.7 + k)) < 0.35) continue; const gx = mx - 3 + c * 4, gy = my - 9 + f * 3; pset(gx, gy, P.fosforoM); pset(gx, gy + 1, P.fosforoM); pset(gx + 2, gy, P.fosforoM); pset(gx + 2, gy + 1, P.fosforoM); }
  a_figura(R, t, 280, 100, { dir: -1, brazo: Math.sin(t * 9) > 0 ? 0.3 : 0, pelo: P.rojoS });
  { const u = ((t + 4) % 13) / 13; a_figura(R, t, 330 - u * 110, 104, { anda: true, dir: -1, ropa: 'bata' }); }
  R.recorte(null);
  // las lámparas de globo que cuelgan y se mecen, con su halo cálido
  for (const [lx, k] of [[84, 0], [266, 1]]) { const sw = Math.round(Math.sin(t * 0.9 + k * 2) * 1.2), gy = 24;
    linea(lx, 13, lx + sw, gy - 5, P.k); rect(lx + sw - 2, gy - 6, lx + sw + 2, gy - 5, P.oroS);
    R.halo(lx + sw, gy, 14, [P.cremaS, P.crema, P.calido], 0.7); disco(lx + sw, gy, 5, P.calidoS); disco(lx + sw, gy, 4, P.calido); disco(lx + sw - 1, gy - 1, 2, P.blanco); }
  // sus brillos en el parqué
  for (const [cx, w] of [[84, 22], [266, 22]]) for (const y of [140, 146, 156]) for (let x = cx - w; x <= cx + w; x += 2) if (a_b4(x, y) < 0.5) pset(x + ((y >> 1) % 2), y, P.maderaL);
  return { suelo: 152, sueloDelante: 170, libre: [22, 296], puerta214: [14, 52, 48, 127], puertaAbierta: [190, 52, 222, 127], tablon: [58, 44, 112, 84], ventana: [120, 22, 176, 88], mampara: [232, 50, 319, 127] };
}
// lo de delante del pasillo: el perchero de pie con un abrigo, una bufanda y la ushanka (izquierda) y el ficus en su
// maceta, cuyas hojas se mueven un poco con el aire del radiador (derecha)
function a_pasilloDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = a_P;
  rect(9, 104, 11, 176, P.k); rect(10, 104, 10, 176, P.maderaS); rect(2, 174, 18, 177, P.k); rect(3, 174, 17, 175, P.madera);
  for (const d of [-1, 1]) linea(10, 108, 10 + d * 7, 104, P.k);
  poligono([[3, 112], [17, 112], [20, 150], [0, 150]], P.k); poligono([[4, 113], [16, 113], [18, 149], [1, 149]], P.traje); linea(10, 114, 10, 148, P.k); for (const y of [122, 132, 142]) pset(11, y, P.grisL);
  rect(0, 113, 3, 140, P.rojoS); rect(1, 113, 2, 140, P.rojo);
  rect(3, 99, 17, 107, P.k); rect(4, 100, 16, 106, P.maderaS); for (let x = 4; x < 17; x += 2) pset(x, 100 + (x % 3), P.madera); rect(2, 105, 18, 108, P.maderaD); rect(2, 105, 18, 105, P.madera);
  for (let y = 160; y < 180; y++) for (let x = 0; x < 22; x++) if (a_b4(x, y) < 0.3) pset(x, y, a_mezcla(R.pget(x, y), P.k, 0.5));
  // el ficus: la maceta de barro con su luz, la tierra, el tronco y las hojas
  poligono([[300, 158], [319, 158], [317, 179], [302, 179]], P.k); poligono([[301, 159], [319, 159], [316, 179], [303, 179]], P.claraS); rect(301, 159, 319, 161, P.clara); rect(301, 159, 319, 159, P.claraL);
  linea(310, 158, 308, 126, P.maderaS); linea(311, 158, 313, 132, P.maderaS);
  for (let k = 0; k < 14; k++) { const a = h(k, 1, 41) * 6.28, r = 6 + h(k, 2, 41) * 12, sw = Math.sin(t * 1.4 + k) * 0.8, x = Math.round(310 + Math.cos(a) * r * 0.6 + sw), y = Math.round(128 + Math.sin(a) * r * 0.8);
    disco(x, y, 3, P.zocaloS); disco(x - 1, y - 1, 2, k % 3 ? P.verdeT : P.verdeTL); pset(x - 1, y - 2, P.zocaloL); }
  return {};
}

// EL ARCHIVO: lo fijo
function a_archivoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P;
  rect(0, 0, 319, 11, P.techo); rect(0, 12, 319, 15, P.crema); rect(0, 12, 319, 12, P.blanco); rect(0, 15, 319, 15, P.cremaS);
  // el papel pintado verde apagado con un motivo de rombos y flores pequeñas
  for (let y = 16; y < 94; y++) for (let x = 0; x < 320; x++) { const u = (x + (Math.floor(y / 10) % 2) * 6) % 12, v = y % 10, m = Math.abs(u - 6) + Math.abs(v - 5) * 1.2;
    pset(x, y, m < 1.5 ? P.zocaloL : m > 4.8 && m < 5.6 ? P.paredS : a_tono([P.paredS, P.paredM, P.pared], 1.3 + (h(x >> 2, y >> 2, 23) - 0.5) * 0.5, x, y)); }
  for (let y = 16; y < 30; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) < 0.25 - (y - 16) * 0.017) pset(x, y, P.paredS);
  // el friso de madera con sus tablas, vetas y moldura
  rect(0, 94, 319, 97, P.maderaL); rect(0, 97, 319, 97, P.maderaS);
  for (let y = 98; y < 140; y++) for (let x = 0; x < 320; x++) { const tabla = x % 20, v = Math.sin(y * 0.4 + Math.sin(x * 0.7) * 2 + Math.floor(x / 20) * 3);
    pset(x, y, tabla === 0 ? P.maderaD : tabla === 1 ? P.maderaL : v > 0.85 ? P.maderaV : v < -0.9 ? P.maderaS : P.madera); }
  rect(0, 137, 319, 139, P.maderaD);
  // el parqué y la alfombra roja con su cenefa
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) { const z = (y - 120) / 60, u = (x - 160) / z / 9, j = (u % 1 + 1) % 1 < 0.08;
    pset(x, y, j ? P.maderaD : a_tono([P.maderaS, P.maderaV, P.madera], 1.3 + (h(Math.floor(u), Math.floor((y - 140) / z / 6), 9) - 0.5) * 1.2, x, y)); }
  for (let y = 148; y < 180; y++) { const e = (y - 148) * 0.9; for (let x = Math.round(118 - e); x <= Math.round(240 + e); x++) { const borde = x < 122 - e || x > 236 + e; pset(x, y, borde ? (((x + y) >> 1) % 2 ? P.oroS : P.rojoS) : a_tono([P.rojoS, P.rojo], 0.6 + (h(x >> 1, y, 2) - 0.5) * 0.8, x, y)); } }
  // los archivadores grises: cuatro cuerpos de cuatro cajones con su portaetiquetas (vacío), el tirador y la luz
  for (let i = 0; i < 4; i++) { const x0 = 6 + i * 25, x1 = x0 + 23;
    rect(x0, 56, x1, 139, P.k); rect(x0 + 1, 57, x1 - 1, 138, P.gris); rect(x0 + 1, 57, x1 - 1, 57, P.grisL); rect(x1 - 2, 58, x1 - 1, 138, P.grisS);
    for (let d = 0; d < 4; d++) { const y0 = 59 + d * 20; if (i === 2 && d === 1) continue; rect(x0 + 2, y0, x1 - 3, y0 + 18, P.grisS); rect(x0 + 3, y0 + 1, x1 - 4, y0 + 17, P.gris); rect(x0 + 3, y0 + 1, x1 - 4, y0 + 1, P.grisL);
      rect(x0 + 8, y0 + 4, x1 - 9, y0 + 7, P.grisD); rect(x0 + 9, y0 + 5, x1 - 10, y0 + 6, P.crema); rect(x0 + 8, y0 + 11, x1 - 9, y0 + 12, P.grisD); rect(x0 + 8, y0 + 11, x1 - 9, y0 + 11, P.grisL); } }
  // el cajón abierto con carpetas de colores apagados
  { const x0 = 56, y0 = 79; rect(x0, y0 - 6, x0 + 24, y0 + 18, P.k); rect(x0 + 1, y0 + 6, x0 + 23, y0 + 17, P.gris); rect(x0 + 1, y0 + 6, x0 + 23, y0 + 6, P.grisL);
    for (let k = 0; k < 8; k++) { const c = [P.claraS, P.crema, P.clara, P.cremaS][k % 4], hh = 5 + (k % 3); rect(x0 + 2 + k * 3, y0 + 6 - hh, x0 + 3 + k * 3, y0 + 5, c); pset(x0 + 2 + k * 3, y0 + 6 - hh, P.blanco); }
    rect(x0 + 8, y0 + 10, x0 + 16, y0 + 11, P.grisD); rect(x0 + 8, y0 + 10, x0 + 16, y0 + 10, P.grisL); }
  // encima de los archivadores: cajas de cartón, legajos atados y una planta
  rect(8, 40, 34, 55, P.k); rect(9, 41, 33, 55, P.claraS); rect(9, 41, 33, 42, P.claraL); rect(18, 46, 24, 47, P.crema);
  for (let k = 0; k < 4; k++) { rect(40, 52 - k * 3, 66, 54 - k * 3, k % 2 ? P.crema : P.cremaS); rect(52, 52 - k * 3, 52, 54 - k * 3, P.rojoS); }
  rect(76, 44, 98, 55, P.k); rect(77, 45, 97, 55, P.claraS); rect(77, 45, 97, 46, P.claraL); rect(84, 49, 90, 50, P.crema);
  // la ventana va viva; sus cortinas pesadas (pliegues con luz y sombra) y la barra
  rect(112, 18, 202, 19, P.oroS); rect(112, 18, 202, 18, P.oro);
  for (const [xa, xb] of [[112, 127], [189, 202]]) for (let y = 20; y < 100; y++) for (let x = xa; x <= xb; x++) { const pl = (x - xa + Math.round(Math.sin(y * 0.05) * 1.5)) % 5; pset(x, y, pl === 0 ? P.maderaD : pl < 2 ? P.rojoS : pl < 4 ? a_mezcla(P.rojoS, P.rojo, 0.5) : P.rojo); }
  for (const [xa, xb] of [[112, 127], [189, 202]]) { rect(xa, 100, xb, 101, P.oroS); }
  // el cartel del engranaje y el mapamundi insinuado (continentes en manchas, sin letras) junto al globo
  a_cartel(R, 210, 26, 234, 58, 'engranaje');
  rect(238, 50, 274, 78, P.k); rect(239, 51, 273, 77, P.crema); for (let y = 52; y < 77; y++) for (let x = 240; x < 273; x++) { const n = Math.sin(x * 0.35) * Math.cos(y * 0.5) + Math.sin(x * 0.13 + y * 0.2); if (n > 0.6) pset(x, y, P.verdeTL); else if (((x + y) & 7) === 0) pset(x, y, P.frio); }
  rect(239, 64, 273, 64, P.cremaS); rect(256, 51, 256, 77, P.cremaS);
  // el globo: el pie de madera torneada con tres patas y el meridiano de latón (la esfera, viva)
  linea(282, 126, 272, 148, P.k); linea(282, 126, 292, 148, P.k); linea(283, 126, 283, 150, P.k); linea(281, 126, 271, 148, P.maderaL); linea(283, 126, 293, 148, P.maderaS);
  rect(279, 120, 285, 128, P.k); rect(280, 121, 284, 127, P.madera); rect(280, 121, 281, 127, P.maderaL);
  for (let y = 144; y < 152; y++) for (let x = 266; x < 300; x++) if (a_b4(x, y) < 0.4 - Math.abs(x - 283) * 0.02) pset(x, y, P.maderaD);
}

// la esfera del globo terráqueo que gira despacio (continentes que pasan), con su luz, su sombra y el meridiano
function a_globo(R, t, cx, cy, r, vel = 1) {
  const { pset, disco } = R, P = a_P, giro = t * 0.25 * vel;
  disco(cx, cy, r + 1, P.k);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue; const z = Math.sqrt(r * r - d2), lon = Math.atan2(i, z) + giro, lat = Math.asin(j / r);
    const tierra = Math.sin(lon * 3) * Math.cos(lat * 2.5) + Math.sin(lon * 5 + lat * 3) * 0.5 > 0.35, luz = (-i * 0.5 - j * 0.6 + z) / r;
    pset(cx + i, cy + j, tierra ? a_tono([P.verdeT, P.verdeTL, P.claraL], luz * 1.6, cx + i, cy + j) : a_tono([P.cielo2, P.frio, P.tuboL], luz * 1.7, cx + i, cy + j)); }
  for (let a = -2.2; a <= 2.2; a += 0.05) { const x = Math.round(cx + Math.sin(a) * (r + 2)), y = Math.round(cy - Math.cos(a) * (r + 2)); pset(x, y, P.oroS); }
  pset(cx - Math.round(r * 0.4), cy - Math.round(r * 0.5), P.blanco);
}

function a_archivo(R, t, o) {
  const { rect, pset, linea, disco } = R, P = a_P;
  a_capa(R, 'archivo', () => a_archivoFijo(R));
  a_ventana(R, t, 128, 22, 186, 92, { dx: 520, torre: 34, fase: 3 });
  a_radiador(R, t, 136, 178, 104, 122);
  a_globo(R, t, 283, 104, 15, o.globo ?? 1);
  // la luz fría de la ventana en la alfombra
  for (let y = 142; y < 170; y++) { const e = (y - 142) * 0.5; for (let x = Math.round(126 + e); x <= Math.round(188 + e * 1.3); x++) if (a_b4(x, y) < 0.1) pset(x, y, P.linoF); }
  // la lámpara de techo (aplique) a la derecha de la ventana, cálida, y el polvo que flota en su luz
  R.halo(256, 36, 16, [P.cremaS, P.crema, P.calido], 0.7); rect(253, 40, 259, 42, P.oroS); rect(255, 42, 257, 46, P.oroS); disco(256, 36, 4, P.calidoS); disco(256, 35, 3, P.calido); pset(255, 34, P.blanco);
  for (let k = 0; k < 7; k++) { const u = (t * 0.07 + h(k, 1, 7)) % 1, x = Math.round(206 + h(k, 2, 7) * 60 + Math.sin(t * 0.6 + k) * 4), y = Math.round(110 + u * 30); pset(x, y, a_mezcla(R.pget(x, y), P.calido, 0.5)); }
  return { suelo: 150, sueloDelante: 168, libre: [244, 319], globo: [283, 104, 15], archivadores: [6, 56, 106, 139], ventana: [128, 22, 186, 92] };
}

// la mesa del archivo con su tapete verde y lo de encima: la carpeta, el sello (o.sello), el tampón, la caja de metal con
// candado (o.caja) con el disquete dentro y la lámpara verde de banquero con su luz
function a_archivoMesa(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = a_P, y = 146;
  a_mesaFrente(R, 108, 242, y);
  rect(112, y - 4, 238, y - 2, P.verdeT); rect(112, y - 4, 238, y - 4, P.verdeTL);
  // la lámpara de banquero
  a_cono(R, 231, y - 18, y - 1, 6, 14, P.calido, 0.5);
  rect(225, y - 6, 237, y - 4, P.k); rect(226, y - 6, 236, y - 5, P.oroS); rect(230, y - 16, 232, y - 6, P.oroS);
  poligono([[222, y - 16], [240, y - 16], [237, y - 22], [225, y - 22]], P.k); poligono([[223, y - 17], [239, y - 17], [236, y - 21], [226, y - 21]], P.verdeT); linea(226, y - 21, 236, y - 21, P.verdeTL); rect(225, y - 16, 237, y - 16, P.calido);
  // el tampón
  rect(118, y - 7, 132, y - 4, P.k); rect(119, y - 6, 131, y - 5, P.rojoS); rect(119, y - 7, 131, y - 7, P.grisS);
  // la carpeta de cartón con sus cintas y, si ya se selló, la estrella roja
  const fx = 166, sello = Math.max(0, Math.min(1, o.sello ?? 0));
  poligono([[148, y - 3], [186, y - 3], [183, y - 8], [151, y - 8]], P.k); poligono([[149, y - 4], [185, y - 4], [182, y - 7], [152, y - 7]], P.clara); linea(152, y - 7, 182, y - 7, P.claraL);
  rect(166, y - 4, 167, y - 3, P.crema); linea(158, y - 6, 176, y - 6, P.claraS);
  if (sello >= 0.98 || o.marca) { for (const [dx, dy] of [[0, -2], [-1, -1], [0, -1], [1, -1], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [1, 1]]) pset(fx + dx + 4, y - 5 + dy, P.rojo); }
  // el sello: el mango torneado, el cuerpo y la base con la estrella; baja de lo alto (sello 0) a apretar (sello 1)
  const sy = Math.round(y - 8 - (1 - sello) * 22), sx = fx + 4;
  if (sello < 0.98) for (let x = sx - 4; x <= sx + 4; x++) if (a_b4(x, y - 6) < 0.6 - (1 - sello) * 0.4) pset(x, y - 6, P.maderaS);
  rect(sx - 4, sy - 2, sx + 4, sy, P.k); rect(sx - 3, sy - 2, sx + 3, sy - 1, P.rojo); pset(sx - 3, sy - 2, P.rojoL);
  rect(sx - 2, sy - 6, sx + 2, sy - 3, P.k); rect(sx - 1, sy - 6, sx + 1, sy - 3, P.maderaS);
  disco(sx, sy - 10, 3, P.k); disco(sx, sy - 10, 2, P.madera); pset(sx - 1, sy - 11, P.maderaL); rect(sx - 1, sy - 8, sx + 1, sy - 7, P.madera);
  // la caja de metal con candado (caja 0: abierta, con el disquete dentro; 1: cerrada con el candado echado)
  const caja = Math.max(0, Math.min(1, o.caja ?? 1)), bx = 196 - 0;
  rect(bx, y - 14, bx + 22, y - 3, P.k); rect(bx + 1, y - 13, bx + 21, y - 4, P.grisS); rect(bx + 1, y - 13, bx + 21, y - 13, P.gris); rect(bx + 20, y - 12, bx + 21, y - 4, P.grisD);
  if (caja < 0.5) { rect(bx + 2, y - 13, bx + 20, y - 11, P.k); PIEZAS_TS.disquete?.(R, bx + 11, y - 10, {}); const ab = Math.round((0.5 - caja) * 2 * 10); rect(bx, y - 15 - ab, bx + 22, y - 14, P.k); rect(bx + 1, y - 15 - ab, bx + 21, y - 15, P.gris); rect(bx + 1, y - 15 - ab, bx + 21, y - 15 - ab, P.grisL); }
  else { rect(bx, y - 16, bx + 22, y - 13, P.k); rect(bx + 1, y - 15, bx + 21, y - 14, P.gris); rect(bx + 1, y - 15, bx + 21, y - 15, P.grisL);
    const cerr = Math.round((caja - 0.5) * 2 * 2); R.anillo(bx + 11, y - 12 - cerr, 2, P.oroS); rect(bx + 8, y - 11, bx + 14, y - 6, P.k); rect(bx + 9, y - 10, bx + 13, y - 7, P.oro); pset(bx + 9, y - 10, P.claraL); pset(bx + 11, y - 9, P.k); }
  return { sello: [sx, sy - 10], carpeta: [fx, y - 6], caja: [bx + 11, y - 10], suelo: 150 };
}

// la paleta de Occidente: Budapest (yeso, óleo verde, parqué, terciopelo), la vista del Danubio, Londres y la tienda
const BO = pal({
  pared: '#dccaa2', paredL: '#e8dab8', paredS: '#c4b088', paredM: '#d2be94',
  oleo: '#7e9686', oleoL: '#92a898', oleoS: '#647a6c', filete: '#4a5e52',
  techo: '#ece2c8', cornisa: '#f4ecd6', cornisaS: '#c6b48e',
  zocalo: '#4a3424', zocaloL: '#6a4c34',
  parq1: '#9c6a3c', parq2: '#8a5c32', parq3: '#ae7a46', parqJ: '#6e4626', parqL: '#c48e56',
  marco: '#ece6d4', marcoS: '#bcb29a', marcoD: '#8a826e',
  terc: '#3e6a52', tercL: '#568a6c', tercS: '#2a4a3a',
  rad: '#d4d0c4', radS: '#9c988c', radL: '#eceae2',
  mueble: '#6a4428', muebleS: '#4a2c18', muebleL: '#8a5c38', fondoMueble: '#3a2416',
  arch: '#8a978c', archS: '#66726a', archL: '#aab6aa',
  corcho: '#c49a64', corchoS: '#a87e4c', corchoL: '#dab47e',
  papel: '#f4f0e4', papelS: '#cfc8b4', tinta: '#4a4a5a',
  cinta: '#fbf8ec', cintaM: '#ebe4d0', cintaS: '#bdb49c', agujero: '#6e6658', cintaD: '#9a907a',
  laton: '#c8a04a', latonL: '#ecd27a', latonS: '#8a6a2a',
  hoja: '#4e8a3e', hojaL: '#74b052', hojaS: '#2e5a2a', flor: '#d83a3a', florL: '#f07060',
  barro: '#b85a36', barroS: '#8a3e22', k: '#1a1620', blanco: '#ffffff', rojo: '#d0302a', verde: '#3aa04a',
  metal: '#7a7e86', metalS: '#4e525a', metalL: '#aab0b8',
});

// la vista de Budapest: cielo, colinas, palacio, torre de tejas, río, puente, muelle con árboles y la calzada del tranvía
const BV = pal({
  c0: '#6aa4da', c1: '#80b2e0', c2: '#98c2e8', c3: '#b2d2ee', c4: '#cce0f0',
  mL: '#93ae9a', m: '#76987e', mS: '#5a7e64', mD: '#46664e',
  pal: '#d6caa8', palS: '#aea080', tej: '#5f9088', tejL: '#86b8aa', ven: '#6a6252',
  tor: '#c6baa0', torS: '#988c72', torL: '#ded4bc', arco: '#4e545c',
  cad: '#3a3c44', cadL: '#6a6c78', tablero: '#585a62', tableroL: '#7a7c84', farol: '#f0e0a0',
  a0: '#3c6a90', a1: '#4a7aa0', a2: '#5a8ab0', a3: '#6a98bc', aL: '#b4d4ea',
  muro: '#b4a88e', muroS: '#8a7e66', via: '#7a7672', viaL: '#8a867e', rail: '#56524c',
  arb: '#4e7a3e', arbS: '#365a2c', arbL: '#74a052',
  tejaR: '#c8643a', tejaO: '#e0b444', tejaV: '#4a8a5a',
});

const BV_CIELO = [BV.c0, BV.c1, BV.c2, BV.c3, BV.c4], BV_AGUA = [BV.a0, BV.a1, BV.a2, BV.a3], BV_VIA = [BV.via, BV.viaL, BV.rail];

const b_K = BO.k;

// los búferes fijos del grupo: se pintan una vez (clave) y se guardan; lo que no se pinta queda a 0, transparente
const b_capas = new Map();

function b_capa(R, clave, dibuja) {
  let b = b_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_capas.set(clave, b); }
  return b;
}

// pone encima un búfer con huecos (los píxeles a 0 dejan ver lo de debajo: la vista por las ventanas)
function b_encima(R, F) {
  const B = R.buf;
  if (B) { for (let i = 0; i < F.length; i++) { const v = F[i]; if (v) B[i] = v; } return; }
  for (let i = 0; i < F.length; i++) if (F[i]) R.pset(i % 320, (i / 320) | 0, F[i]);
}

// la máscara de una vista por colores (1 cielo, 2 agua, 3 calzada…): lo que pasa por la vista solo se pinta en su zona, así
// las nubes quedan detrás de los tejados y los barcos detrás de los pilares
const b_mascaras = new Map();

function b_mascara(clave, V, grupos) {
  let m = b_mascaras.get(clave); if (m) return m;
  m = new Uint8Array(V.length); const mapa = new Map();
  for (const [v, cols] of grupos) for (const c of cols) mapa.set(c >>> 0, v);
  for (let i = 0; i < V.length; i++) { const v = mapa.get(V[i] >>> 0); if (v) m[i] = v; }
  b_mascaras.set(clave, m); return m;
}

// pset dentro de la máscara (val 0: en cualquier zona marcada)
function b_pm(R, m, val, x, y, c) {
  x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return;
  const v = m[y * 320 + x]; if (val === 0 ? v : v === val) R.pset(x, y, c);
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function b_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// el umbral de la trama ordenada de 4 × 4 (para degradados tramados y bordes suaves)
const b_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const b_um = (x, y) => (b_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// rect recortado a una caja (R.rect no respeta R.recorte)
function b_rr(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// degradado tramado vertical entre y0 e y1 con los colores cols (de arriba abajo)
function b_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > b_um(x, y) ? cols[Math.min(n, i + 1)] : cols[i]); }
}

// aclara (o oscurece, con col oscuro) un píxel ya pintado
function b_tinte(R, x, y, col, a) { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, a)); }

// la luz de una ventana sobre el suelo: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila; huecos:
// las columnas que quedan en sombra, como el parteluz)
function b_luz(R, x0, y0, x1, y1, inclin, a, col, huecos = []) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin), fade = 1 - (y - y0) / (y1 - y0 + 1) * 0.5;
    for (let x = x0 + d; x <= x1 + d; x++) { if (((x + y) & 1) && fade < 0.9) continue; if (huecos.some(([a0, a1]) => x - d >= a0 && x - d <= a1)) continue; b_tinte(R, x, y, col, a * fade); } }
}

// una nube de tres tonos (luz arriba a la izquierda, cuerpo, sombra abajo; base plana) que solo se pinta en la zona val de
// la máscara m
function b_nubeM(R, m, val, cx, cy, w, [cL, cM, cS]) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.38, 1, r * 0.72], [-w * 0.12, -r * 0.35, r * 0.95], [w * 0.18, -r * 0.12, r * 0.85], [w * 0.4, 1, r * 0.62]];
  const x0 = Math.floor(cx - w * 0.42 - r), x1 = Math.ceil(cx + w * 0.42 + r), y0 = Math.floor(cy - r * 1.4), y1 = Math.ceil(cy + r * 0.7);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let d = 9, dl = 9;
    for (const [dx, dy, rr] of B) { const e = Math.hypot(x + 0.5 - cx - dx, y + 0.5 - cy - dy) / rr; if (e < d) d = e; const e2 = Math.hypot(x + 0.5 - cx - dx + rr * 0.3, y + 0.5 - cy - dy + rr * 0.4) / rr; if (e2 < dl) dl = e2; }
    if (d > 1 || y > cy + r * 0.5) continue;
    const u = b_um(x, y) - 0.5; let c = cM;
    if (dl < 0.6 + u * 0.3) c = cL; else if (d > 0.8 + u * 0.2 || y > cy + r * 0.15 + u * 3) c = cS;
    b_pm(R, m, val, x, y, c);
  }
}

// una persona lejana de 9–18 px (cabeza, cuerpo, piernas que andan) pintada con p(x, y, c); cols: [abrigo, piernas, piel, pelo]
function b_persona(p, x, suelo, t, cols, alto, dir = 1, anda = true) {
  const [ab, pi, pl, pe] = cols, s = alto / 12, paso = anda ? Math.sin(t * 9 + x * 0.3) : 0, cab = Math.max(1, Math.round(1.6 * s));
  const yc = suelo - Math.round(12 * s), cx = Math.round(x);
  for (let j = -cab; j <= cab; j++) for (let i = -cab; i <= cab; i++) if (i * i + j * j <= cab * cab + 0.5) p(cx + i, yc + cab + j, j < 0 || (i * dir < 0 && j < 1) ? pe : pl);
  const y0 = yc + cab * 2 + 1, y1 = suelo - Math.round(4 * s), w = Math.max(1, Math.round(1.6 * s));
  for (let y = y0; y <= y1; y++) for (let i = -w; i <= w; i++) p(cx + i, y, i === w * dir ? b_mezcla(ab, b_K, 0.3) : ab);
  for (let y = y1 + 1; y <= suelo; y++) { const a = Math.round(paso * (y - y1) * 0.5); p(cx - Math.max(1, Math.round(w / 2)) + a, y, pi); p(cx + Math.max(1, Math.round(w / 2)) - a, y, pi); }
  if (s > 1.1) for (let y = y0 + 1; y <= y1 - 1; y++) p(cx + (w + 1) * (paso > 0 ? 1 : -1) * dir, y, b_mezcla(ab, b_K, 0.2));
}

// un reloj de pared: aro de madera, esfera, marcas, agujas (h0: la hora al empezar) y el segundero rojo que salta
function b_reloj(R, cx, cy, r, t, h0) {
  const { disco, pset, linea } = R;
  disco(cx, cy, r + 1, b_K); disco(cx, cy, r, BO.mueble); disco(cx - 1, cy - 1, r - 1, BO.muebleL); disco(cx, cy, r - 1, BO.mueble);
  disco(cx, cy, r - 2, b_K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - r * 0.5 ? BO.blanco : BO.papel));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 4; pset(Math.round(cx + Math.cos(a) * q), Math.round(cy + Math.sin(a) * q), k % 3 ? BO.papelS : b_K); }
  const hora = h0 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * (r * 0.4)), Math.round(cy + Math.sin(ah) * (r * 0.4)), b_K);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 4)), Math.round(cy + Math.sin(am) * (r - 4)), b_K);
  linea(cx, cy, Math.round(cx + Math.cos(as) * (r - 3)), Math.round(cy + Math.sin(as) * (r - 3)), BO.rojo);
  pset(cx, cy, BO.laton);
}

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda, sombra abajo y a la derecha, el campo y dos vetas
function b_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 920) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 921 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.07 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// una fila de libros de pie sobre una balda (yb: la balda; alto: el más alto): lomos de colores con su luz, su sombra y
// las bandas doradas; de vez en cuando un hueco, un libro inclinado o un montón tumbado
const b_LIBROS = ['#8a2c2c', '#2c4c70', '#4a6a3c', '#8c6c2c', '#5c3c5c', '#c8bc9c', '#3c3c44', '#9c4a2a', '#2c5c5c', '#6a4a2a'].map(hex);

function b_libros(R, x0, x1, yb, alto, k = 0) {
  const { rect, pset } = R;
  for (let x = x0, i = 0; x <= x1; i++) {
    const v = h(i, k, 930);
    if (v < 0.07) { x += 2 + Math.round(h(i, k, 931) * 3); continue; }
    if (v < 0.15 && x + 12 <= x1) {
      for (let f = 0; f < 3; f++) { const w = 10 + Math.round(h(i, f, 932) * 3), c = b_LIBROS[(i + f * 3 + k) % b_LIBROS.length]; rect(x, yb - 3 * f - 3, x + w - 1, yb - 3 * f - 1, c); rect(x, yb - 3 * f - 3, x + w - 1, yb - 3 * f - 3, b_mezcla(c, BO.blanco, 0.25)); pset(x + w - 1, yb - 3 * f - 2, b_mezcla(c, b_K, 0.4)); rect(x + 1, yb - 3 * f - 2, x + w - 2, yb - 3 * f - 2, BO.papel); }
      x += 14; continue;
    }
    const w = 2 + Math.round(h(i, k, 933) * 2), al = alto - Math.round(h(i, k, 934) * 5), c = b_LIBROS[Math.floor(h(i, k, 935) * b_LIBROS.length)];
    if (x + w - 1 > x1) break;
    rect(x, yb - al, x + w - 1, yb - 1, c); rect(x, yb - al, x, yb - 1, b_mezcla(c, BO.blanco, 0.22)); rect(x + w - 1, yb - al, x + w - 1, yb - 1, b_mezcla(c, b_K, 0.35));
    if (al > 7) { rect(x, yb - al + 2, x + w - 1, yb - al + 2, BO.laton); rect(x, yb - 3, x + w - 1, yb - 3, BO.latonS); }
    x += w;
  }
}

// el parqué en espiga de Budapest entre y0 e y1: tablillas de tres tonos con sus juntas, vetas y el brillo del barniz
function b_parquet(R, y0, y1) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
    const u = x >> 3, xi = x & 7, v = y * 2 + ((u & 1) ? xi : 7 - xi), tabla = v >> 3, hv = h(u, tabla, 940);
    let c = hv < 0.34 ? BO.parq1 : hv < 0.68 ? BO.parq2 : BO.parq3;
    if ((v & 7) === 0 || xi === 0) c = BO.parqJ;
    else if (h(x, y, 941) < 0.1) c = b_mezcla(c, BO.parqJ, 0.45);
    else if ((v & 7) === 1 && h(u, tabla, 942) < 0.5) c = BO.parqL;
    if (y < y0 + 4) c = b_mezcla(c, b_K, 0.35 - (y - y0) * 0.08);
    R.pset(x, y, c);
  }
}

// la vista de Budapest desde la ventana, en coordenadas propias de 124 × 72 desplazadas a (ox, oy) y recortadas a cl:
// el cielo tramado, la colina lejana con el palacio de cúpula verde, la torre de tejas de colores, la colina cercana
// arbolada, el Danubio con sus ondas, el puente de cadenas (dos torres de piedra con su arco, el tablero con farolas, las
// cadenas y sus tirantes), el muelle con árboles y farolas y la calzada con los raíles del tranvía
function b_vistaBud(R, ox, oy, cl) {
  const { pset, poligono, disco } = R; R.recorte(cl);
  const P = (pts) => pts.map(([x, y]) => [x + ox, y + oy]), ps = (x, y, c) => pset(x + ox, y + oy, c), rr = (a, b, c, d, col) => b_rr(R, cl, a + ox, b + oy, c + ox, d + oy, col);
  for (let y = -8; y <= 46; y++) { const u = Math.max(0, Math.min(1, (y + 8) / 48)) * 4, i = Math.floor(u), f = u - i; for (let x = -2; x <= 126; x++) ps(x, y, f > b_um(x + ox, y + oy) ? BV_CIELO[Math.min(4, i + 1)] : BV_CIELO[i]); }
  // la colina lejana, brumosa, con sus arboledas
  poligono(P([[-2, 33], [12, 29], [28, 25], [46, 23], [62, 24], [78, 27], [94, 30], [110, 29], [126, 32], [126, 46], [-2, 46]]), (x, y) => { const v = h(x >> 1, y, 950); return v < 0.12 ? BV.mS : v < 0.4 ? BV.m : BV.mL; });
  // el palacio: la fachada larga con dos filas de ventanas, el tejado verde, las alas y la cúpula con su linterna
  rr(14, 25, 18, 31, BV.palS); rr(58, 25, 62, 31, BV.palS); rr(18, 22, 58, 31, BV.pal); rr(56, 22, 58, 31, BV.palS); rr(18, 21, 58, 21, BV.tej); rr(14, 24, 18, 24, BV.tej); rr(58, 24, 62, 24, BV.tej);
  for (let x = 20; x <= 56; x += 3) { ps(x, 24, BV.ven); ps(x, 27, BV.ven); } for (let x = 15; x <= 61; x += 2) if (x < 18 || x > 58) ps(x, 27, BV.ven);
  rr(14, 31, 62, 32, BV.muroS); rr(34, 16, 42, 21, BV.pal); for (let x = 35; x <= 41; x += 2) rr(x, 17, x, 20, BV.palS);
  for (let j = -6; j <= 0; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 30) ps(38 + i, 16 + j, i < -1 && j < -2 ? BV.tejL : (i > 3 ? b_mezcla(BV.tej, b_K, 0.2) : BV.tej));
  rr(37, 7, 39, 10, BV.pal); ps(38, 6, BV.cad); ps(38, 5, BV.cad);
  // la torre de tejas de colores, con sus torrecillas
  rr(92, 15, 99, 31, BV.tor); rr(98, 15, 99, 31, BV.torS); for (const y of [19, 24]) { ps(94, y, BV.ven); ps(96, y, BV.ven); }
  poligono(P([[91, 15.5], [95.5, 2], [100.5, 15.5]]), (x, y) => ((x + y) % 3 === 0 ? BV.tejaO : (x - y + 99) % 4 === 0 ? BV.tejaV : BV.tejaR));
  for (const tx of [89, 101]) { rr(tx, 20, tx + 1, 31, BV.torS); ps(tx, 19, BV.tejaR); ps(tx + 1, 19, BV.tejaR); ps(tx, 18, BV.tejaO); }
  // la colina cercana, arbolada, bajando al agua
  poligono(P([[-2, 36], [20, 34], [40, 35], [64, 38], [90, 37], [110, 35], [126, 36], [126, 46], [-2, 46]]), (x, y) => { const v = h(x, y >> 1, 951); return v < 0.2 ? BV.mD : v < 0.6 ? BV.mS : BV.m; });
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 952) * 120), y = 37 + Math.round(h(k, 2, 952) * 3); ps(x, y, BV.palS); ps(x + 1, y, BV.pal); ps(x, y - 1, BV.tejaR); }
  // el Danubio: oscuro junto a la orilla de enfrente (el reflejo de la colina) y ondas claras
  for (let y = 44; y <= 60; y++) { const i = y < 47 ? 0 : y < 51 ? 1 : y < 56 ? 2 : 3; for (let x = -2; x <= 126; x++) { let c = BV_AGUA[i]; if (y < 47 && h(x, y, 953) < 0.4) c = BV.a1; if (h(x >> 2, y, 954) < 0.12 && (x & 3) < 3) c = i < 2 ? BV.a2 : BV.a3; ps(x, y, c); } }
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 3, 955) * 124), y = 48 + Math.round(h(k, 4, 955) * 11); rr(x, y, x + 2, y, BV.aL); }
  // el puente de cadenas: el tablero con farolas, las dos torres con su arco y sus pilares, y las cadenas con sus tirantes
  rr(-2, 44, 126, 46, BV.tablero); rr(-2, 44, 126, 44, BV.tableroL); for (let x = 2; x < 124; x += 7) { ps(x, 43, BV.cad); ps(x, 42, BV.farol); }
  const cadena = (x) => (x < 30 ? 26 + 15 * Math.pow((30 - x) / 32, 0.9) : x <= 94 && x >= 38 ? 26 + 16 * (1 - ((x - 62) / 24) ** 2) : x > 94 ? 26 + 15 * Math.pow((x - 94) / 32, 0.9) : 26);
  for (let x = -2; x <= 126; x++) { if ((x >= 30 && x <= 38) || (x >= 86 && x <= 94)) continue; const y = Math.round(cadena(x)); ps(x, y, BV.cad); ps(x, y + 1, BV.cadL); if (x % 3 === 0) for (let yy = y + 2; yy < 44; yy++) if ((yy & 1) === 0) ps(x, yy, BV.cadL); }
  for (const tx of [30, 86]) {
    rr(tx - 1, 47, tx + 9, 52, BV.torS); rr(tx - 1, 52, tx + 9, 52, BV.aL);
    rr(tx, 24, tx + 8, 47, BV.tor); rr(tx + 7, 24, tx + 8, 47, BV.torS); rr(tx - 1, 23, tx + 9, 24, BV.torL); rr(tx - 1, 26, tx + 9, 26, BV.torS); rr(tx, 24, tx, 47, BV.torL);
    rr(tx + 2, 35, tx + 6, 46, BV.arco); rr(tx + 3, 34, tx + 5, 34, BV.arco); rr(tx + 2, 44, tx + 6, 45, BV.tablero);
    for (const y of [29, 31]) { ps(tx + 2, y, BV.torS); ps(tx + 6, y, BV.torS); }
  }
  // el muelle de este lado: el pretil de piedra, los árboles con sus farolas y la calzada del tranvía
  rr(-2, 60, 126, 72, BV.via); for (let y = 61; y <= 72; y++) for (let x = -2; x <= 126; x++) if (h(x, y, 956) < 0.12) ps(x, y, BV.viaL);
  for (const y of [66, 69]) rr(-2, y, 126, y, BV.rail);
  rr(-2, 58, 126, 59, BV.muro); rr(-2, 60, 126, 60, BV.muroS); for (let x = 0; x < 126; x += 6) ps(x, 58, BV.muroS);
  for (let x = 4; x < 126; x += 18) {
    rr(x, 51, x, 59, BV.arbS); disco(x + ox + 0.5, 49 + oy, 5.5, BV.arbS); disco(x + ox, 48 + oy, 4.6, BV.arb); disco(x + ox - 1, 47 + oy, 2.6, BV.arbL);
    rr(x + 9, 50, x + 9, 59, BV.cad); ps(x + 8, 50, BV.cad); ps(x + 10, 50, BV.cad); ps(x + 9, 49, BV.farol);
  }
  R.recorte(null);
}

// la vida de la vista de Budapest (máscara m): nubes de tres tonos a tres velocidades, gaviotas, la bandera del palacio,
// el barco de recreo y la gabarra con sus estelas, destellos en el agua, paseantes y el tranvía amarillo por el muelle
function b_vidaBud(R, m, t, ox, oy) {
  const NUB = [[hex('#f4f8fc'), hex('#dce8f2'), hex('#b2c6da')], [hex('#ffffff'), hex('#e6eef6'), hex('#bccee0')]];
  for (let k = 0; k < 6; k++) { const v = 0.6 + (k % 3) * 0.7, w = 10 + (k % 3) * 6 + Math.round(h(k, 1, 960) * 5), x = ox - 20 + ((h(k, 2, 960) * 170 + t * v) % 170), y = oy + 2 + (k % 3) * 5 + Math.round(h(k, 3, 960) * 4) - (k % 3 === 2 ? 0 : 0);
    b_nubeM(R, m, 1, x, y + (k < 3 ? 8 : 0), w, NUB[k % 2]); }
  // la bandera tricolor de la cúpula, que ondea
  for (let i = 1; i <= 4; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.9) * 0.6); for (let j = 0; j < 3; j++) b_pm(R, m, 1, ox + 38 + i, oy + 1 + j + dy, [BO.rojo, BO.blanco, BO.verde][j]); }
  for (let j = 0; j < 5; j++) b_pm(R, m, 1, ox + 38, oy + 1 + j, BV.cad);
  // gaviotas
  for (let k = 0; k < 3; k++) { const u = ((t * (7 + k * 2) + k * 61) % 190) - 30, x = Math.round(ox + (k % 2 ? 124 - u : u)), y = Math.round(oy + 8 + k * 5 + Math.sin(t * 1.3 + k) * 2), al = Math.sin(t * 9 + k * 2) > 0 ? -1 : 0;
    b_pm(R, m, 1, x, y, BO.blanco); b_pm(R, m, 1, x - 1, y + al, BO.papelS); b_pm(R, m, 1, x + 1, y + al, BO.papelS); b_pm(R, m, 1, x - 2, y + al + (al ? 0 : 1), BO.papelS); b_pm(R, m, 1, x + 2, y + al + (al ? 0 : 1), BO.papelS); }
  // destellos en el agua
  for (let k = 0; k < 26; k++) if (Math.sin(t * 2.5 + k * 1.9) > 0.55) { const x = ox + Math.round(h(k, 5, 961) * 124), y = oy + 47 + Math.round(h(k, 6, 961) * 12); b_pm(R, m, 2, x, y, BO.blanco); b_pm(R, m, 2, x + 1, y, BV.aL); }
  // el barco de recreo (casco blanco con raya azul, cabina con ventanas, la estela) y la gabarra que baja despacio
  { const x = Math.round(ox - 24 + ((t * 4 + 40) % 170)), y = oy + 51;
    for (let i = 0; i < 20; i++) { const corta = i < 2 || i > 17; if (!corta) { b_pm(R, m, 2, x + i, y, i % 3 === 1 ? hex('#3a5a8a') : BO.blanco); b_pm(R, m, 2, x + i, y - 1, BO.blanco); }
      if (i > 2 && i < 15) { b_pm(R, m, 2, x + i, y - 2, i % 2 ? hex('#4a6a8a') : hex('#e8ecf0')); b_pm(R, m, 2, x + i, y - 3, hex('#d0d6dc')); }
      b_pm(R, m, 2, x + i, y + 1, i % 2 ? hex('#2a4a7a') : BO.blanco); b_pm(R, m, 2, x + i, y + 2, BV.a0); }
    b_pm(R, m, 2, x + 9, y - 4, BO.rojo); for (let i = 1; i < 8; i++) if ((i + Math.floor(t * 4)) % 3) b_pm(R, m, 2, x - i, y + 1 + (i > 4 ? 1 : 0), BV.aL); }
  { const x = Math.round(ox + 150 - ((t * 2.2 + 20) % 200)), y = oy + 57;
    for (let i = 0; i < 26; i++) { b_pm(R, m, 2, x + i, y, hex('#3a3430')); b_pm(R, m, 2, x + i, y - 1, i > 3 && i < 22 ? hex('#7a5a3a') : hex('#3a3430')); if (i > 21) b_pm(R, m, 2, x + i, y - 2, hex('#e0dcd0')); }
    for (let i = 27; i < 33; i++) if ((i + Math.floor(t * 3)) % 3) b_pm(R, m, 2, x + i, y, BV.aL); }
  // paseantes por el muelle y el tranvía amarillo
  for (let k = 0; k < 2; k++) { const d = k ? -1 : 1, u = (t * (3 + k) + k * 50) % 150, x = ox + (d > 0 ? u - 10 : 134 - u); b_persona((a, b, c) => b_pm(R, m, 3, a, b, c), x, oy + 64, t, k ? [hex('#8a3a3a'), hex('#3a3a44'), hex('#e8b090'), hex('#3a2a1a')] : [hex('#3a4a6a'), hex('#2a2a30'), hex('#e8b090'), hex('#6a4a2a')], 7, d); }
  { const x = Math.round(ox - 40 + ((t * 9) % 260)), y = oy + 62;
    for (let i = 0; i < 30; i++) { const c = i % 15 === 0 ? hex('#6a5a20') : null;
      b_pm(R, m, 3, x + i, y, hex('#d8a020')); for (let j = 1; j <= 5; j++) { let col = c ?? hex('#f2c230'); if (j === 2 && i % 4 !== 0 && i % 15 > 1) col = (i + Math.floor(t)) % 7 ? hex('#4a5a6a') : hex('#e8eef0'); if (j === 4) col = hex('#c8302a'); b_pm(R, m, 3, x + i, y + j, col); } b_pm(R, m, 3, x + i, y + 6, i % 6 < 2 ? b_K : hex('#5a5048')); } }
}

// el cuarto de Budapest (el búfer de delante de la vista, con las ventanas huecas)
function b_budFrente(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // el techo con su cornisa y sus dentículos
  rect(0, 0, 319, 6, BO.techo); for (let x = 0; x < 320; x++) if (h(x, 1, 970) < 0.08) pset(x, 3, BO.paredL);
  rect(0, 7, 319, 7, BO.cornisaS); rect(0, 8, 319, 9, BO.cornisa); rect(0, 10, 319, 10, BO.cornisaS); for (let x = 1; x < 320; x += 4) pset(x, 9, BO.cornisaS);
  // la pared: yeso crema arriba (con manchas y su sombra bajo la cornisa) y óleo verde gris abajo con el filete
  for (let y = 11; y <= 106; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y < 74) { const v = h(x >> 1, y >> 1, 971); c = v < 0.06 ? BO.paredS : v < 0.22 ? BO.paredM : v > 0.96 ? BO.paredL : BO.pared; if (y < 14 && ((x + y) & 1)) c = BO.paredS; if (h(x >> 4, 0, 972) < 0.3 && y < 30 && h(x, y, 973) < 0.25) c = BO.paredM; }
    else { const v = h(x, y, 974); c = v < 0.05 ? BO.oleoS : v > 0.96 ? BO.oleoL : BO.oleo; if (y > 98 && h(x >> 1, y, 975) < 0.12) c = BO.oleoS; if (((x * 3 + y * 7) % 41) === 0) c = BO.oleoL; }
    pset(x, y, c);
  }
  rect(0, 73, 319, 74, BO.filete); rect(0, 75, 319, 75, BO.oleoL);
  rect(0, 107, 319, 111, BO.zocalo); rect(0, 107, 319, 107, BO.zocaloL); for (let x = 0; x < 320; x += 23) rect(x, 108, x, 111, BO.muebleS);
  // el parqué en espiga y la sombra junto a la pared
  b_parquet(R, 112, 179);
  // las ventanas: el marco crema, el hueco del cristal, el parteluz, el travesaño, la falleba de latón y el alféizar
  for (const [x0, x1] of [[92, 146], [158, 212]]) {
    rect(x0 - 5, 15, x1 + 5, 95, BO.marcoD); rect(x0 - 4, 16, x1 + 4, 94, BO.marco); rect(x1 + 2, 17, x1 + 4, 92, BO.marcoS); rect(x0 - 4, 16, x1 + 4, 16, BO.blanco);
    rect(x0 - 1, 19, x1 + 1, 90, BO.marcoS); rect(x0, 20, x1, 89, 0);
    const mx = Math.round((x0 + x1) / 2); rect(mx - 1, 20, mx + 1, 89, BO.marco); rect(mx + 1, 20, mx + 1, 89, BO.marcoS); rect(x0, 37, x1, 39, BO.marco); rect(x0, 39, x1, 39, BO.marcoS);
    for (const [a, b] of [[x0, mx - 2], [mx + 2, x1]]) { rect(a, 40, a, 89, BO.marcoS); rect(b, 40, b, 89, BO.marcoD); rect(a, 88, b, 89, BO.marcoS); }
    rect(mx - 2, 58, mx + 2, 60, BO.latonS); rect(mx - 1, 58, mx + 1, 59, BO.laton); pset(mx, 61, BO.latonS); pset(mx, 62, BO.laton);
    rect(x0 - 7, 89, x1 + 7, 92, BO.marco); rect(x0 - 7, 89, x1 + 7, 89, BO.blanco); rect(x0 - 7, 93, x1 + 7, 94, BO.marcoS); rect(x0 - 6, 95, x1 + 6, 95, BO.oleoS);
    // el radiador de hierro debajo, con sus aletas, la llave de latón y la tubería al suelo
    const ra = x0 + 4, rb = x1 - 4;
    rect(ra, 97, rb, 106, BO.oleoS); for (let x = ra; x <= rb - 1; x += 3) { rect(x, 98, x + 1, 106, BO.rad); pset(x, 98, BO.radL); rect(x + 1, 99, x + 1, 106, BO.radS); }
    rect(ra, 97, rb, 97, BO.radS); rect(ra, 107, rb, 107, BO.radS); rect(ra + 2, 108, ra + 3, 111, BO.radS); rect(rb - 3, 108, rb - 2, 111, BO.radS);
    rect(ra - 4, 103, ra - 1, 104, BO.radS); disco(ra - 4, 102, 1.6, BO.laton); for (let k = 0; k < 6; k++) pset(ra + Math.round(h(k, x0, 976) * (rb - ra)), 99 + Math.round(h(k, 2, 976) * 7), BO.radS);
  }
  // el geranio en su maceta (alféizar 1) y el cactus (alféizar 2), por delante del cristal
  rect(98, 82, 108, 88, BO.barro); rect(98, 82, 108, 82, BO.barroS); rect(107, 83, 108, 88, BO.barroS); rect(99, 81, 107, 81, BO.barro);
  for (const [dx, dy, r] of [[-3, -4, 3], [2, -5, 3.2], [6, -3, 2.6], [0, -8, 2.6]]) { disco(103 + dx, 80 + dy, r, BO.hojaS); disco(103 + dx - 0.5, 79.5 + dy, r * 0.75, BO.hoja); pset(103 + dx - 1, 78 + dy, BO.hojaL); }
  for (const [x, y] of [[100, 72], [105, 71], [109, 75], [102, 75], [107, 69]]) { disco(x, y, 1.5, BO.flor); pset(x - 1, y - 1, BO.florL); }
  rect(198, 83, 205, 88, BO.barro); rect(204, 83, 205, 88, BO.barroS); rect(200, 74, 203, 82, BO.hoja); rect(203, 74, 203, 82, BO.hojaS); rect(197, 77, 199, 78, BO.hoja); rect(197, 74, 197, 77, BO.hoja); rect(204, 78, 206, 79, BO.hoja); rect(206, 75, 206, 78, BO.hoja); pset(201, 73, BO.florL);
  for (let y = 75; y < 82; y += 2) pset(201, y, BO.hojaL);
  // la barra de las cortinas, de latón, con sus remates
  rect(80, 15, 222, 16, BO.latonS); rect(80, 15, 222, 15, BO.laton); disco(80, 15.5, 2, BO.laton); disco(222, 15.5, 2, BO.laton);
  // la estantería de libros: el mueble, las baldas, los libros, los archivadores, la caja de disquetes y el armarito de abajo
  rect(3, 22, 63, 111, BO.muebleS); rect(4, 23, 62, 25, BO.mueble); rect(3, 21, 63, 22, BO.muebleL); rect(7, 26, 59, 89, BO.fondoMueble);
  rect(4, 26, 6, 111, BO.mueble); rect(4, 26, 4, 111, BO.muebleL); rect(60, 26, 62, 111, BO.mueble); rect(62, 26, 62, 111, BO.muebleS);
  for (const y of [36, 54, 72, 90]) { rect(7, y, 59, y + 1, BO.mueble); rect(7, y, 59, y, BO.muebleL); rect(7, y + 2, 59, y + 2, BO.fondoMueble); }
  b_libros(R, 8, 58, 36, 10, 1);
  for (let x = 8, i = 0; x + 5 <= 40; x += 6, i++) { const c = [hex('#3a5a8a'), hex('#8a3a3a'), hex('#3a6a4a'), hex('#5a5a62'), hex('#8a6a2a')][i % 5]; rect(x, 40, x + 5, 53, c); rect(x, 40, x, 53, b_mezcla(c, BO.blanco, 0.25)); rect(x + 5, 40, x + 5, 53, b_mezcla(c, b_K, 0.35)); rect(x + 2, 43, x + 3, 47, BO.papel); disco(x + 2.5, 50.5, 1, b_K); }
  rect(42, 44, 57, 53, hex('#3a3a44')); rect(42, 44, 57, 44, hex('#5a5a66')); for (let i = 0; i < 6; i++) { rect(44 + i * 2, 41 + (i % 2), 44 + i * 2, 44, b_K); pset(44 + i * 2, 41 + (i % 2), BO.papel); }
  b_libros(R, 8, 58, 72, 15, 2);
  rect(8, 80, 24, 89, BO.carton ?? hex('#c8a06a')); rect(8, 80, 24, 80, hex('#dcb880')); rect(24, 81, 24, 89, hex('#8a6a3a')); rect(11, 83, 21, 85, BO.papel);
  b_libros(R, 26, 58, 90, 13, 3);
  rect(7, 92, 59, 109, BO.mueble); b_cuarteron(R, 8, 93, 32, 108, BO.mueble, BO.muebleL, BO.muebleS, BO.muebleS, 1); b_cuarteron(R, 34, 93, 58, 108, BO.mueble, BO.muebleL, BO.muebleS, BO.muebleS, 2);
  disco(30, 100, 1.2, BO.laton); disco(36, 100, 1.2, BO.laton);
  // el perchero con el abrigo, el sombrero y el paraguas apoyado
  rect(74, 30, 75, 109, BO.muebleS); rect(74, 30, 74, 109, BO.mueble); linea(74, 109, 68, 112, BO.muebleS); linea(75, 109, 81, 112, BO.muebleS); rect(73, 28, 76, 30, BO.mueble);
  linea(73, 33, 69, 30, BO.muebleS); linea(76, 33, 80, 30, BO.muebleS);
  poligono([[70, 34], [79, 34], [83, 78], [66, 78]], (x, y) => ((x - 66) % 5 === 0 && y > 44 ? hex('#5a3a22') : x > 78 ? hex('#5e4026') : hex('#7a5434')));
  rect(70, 34, 79, 36, hex('#5a3a22')); linea(74, 37, 74, 60, hex('#5a3a22')); pset(74, 42, BO.laton); pset(74, 50, BO.laton); rect(66, 77, 83, 78, hex('#5a3a22'));
  rect(68, 27, 81, 28, hex('#4a4a52')); rect(71, 22, 78, 27, hex('#5a5a62')); rect(71, 25, 78, 26, hex('#3a3a42')); rect(72, 22, 77, 22, hex('#6e6e78'));
  linea(84, 84, 82, 110, b_K); poligono([[84, 84], [88, 104], [81, 104]], hex('#2a2a3a')); linea(85, 88, 86, 102, hex('#4a4a5e')); linea(84, 84, 86, 81, b_K);
  // el tablero de corcho con la tira del télex, una postal, un gráfico de barras y el calendario
  rect(222, 42, 272, 74, BO.mueble); rect(222, 42, 272, 42, BO.muebleL); rect(224, 44, 270, 72, BO.corcho);
  for (let y = 44; y <= 72; y++) for (let x = 224; x <= 270; x++) { const v = h(x, y, 977); if (v < 0.18) pset(x, y, BO.corchoS); else if (v > 0.9) pset(x, y, BO.corchoL); }
  rect(227, 47, 239, 69, BO.papelS); rect(226, 46, 238, 68, BO.papel); for (let y = 49; y < 67; y += 2) for (let x = 228; x < 236; x++) if (h(x, y, 978) < 0.7) pset(x, y, BO.tinta);
  rect(244, 46, 257, 55, BO.blanco); rect(245, 47, 256, 50, BV.c2); rect(245, 51, 256, 54, BV.a2); rect(249, 49, 252, 51, BV.tor); pset(250, 48, BV.tor);
  rect(244, 58, 258, 70, BO.papel); rect(244, 70, 258, 70, BO.papelS); for (const [i, a] of [[0, 4], [1, 7], [2, 5], [3, 9]]) rect(246 + i * 3, 68 - a, 247 + i * 3, 68, [BO.rojo, hex('#3a6ab0'), BO.verde, hex('#e0a030')][i]);
  rect(261, 46, 269, 61, BO.papel); rect(261, 46, 269, 48, BO.rojo); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) pset(262 + i * 2, 50 + j * 3, BO.papelS); rect(265, 55, 266, 56, BO.rojo);
  for (const [x, y, c] of [[232, 46, BO.rojo], [250, 45, hex('#3a6ab0')], [251, 57, BO.verde], [265, 45, BO.laton]]) { disco(x, y, 1, c); pset(x - 1, y - 1, BO.blanco); }
  // el enchufe y el cable que va a la mesita del télex
  rect(262, 97, 266, 101, BO.papel); pset(263, 99, b_K); pset(265, 99, b_K); linea(264, 102, 262, 112, b_K); linea(262, 112, 256, 150, b_K);
  // el archivador metálico verde gris con sus cuatro cajones, los tarjeteros y la planta con los archivadores tumbados
  rect(279, 62, 317, 113, BO.archS); rect(280, 63, 316, 112, BO.arch); rect(280, 63, 316, 64, BO.archL); rect(280, 63, 280, 112, BO.archL); rect(315, 64, 316, 112, BO.archS);
  for (let k = 0; k < 4; k++) { const y = 66 + k * 12; rect(283, y, 313, y + 10, BO.archS); rect(283, y, 312, y + 9, BO.arch); rect(283, y, 312, y, BO.archL); rect(293, y + 2, 302, y + 4, BO.papel); rect(293, y + 2, 302, y + 2, BO.metalS); rect(294, y + 6, 301, y + 7, BO.metalS); rect(294, y + 6, 301, y + 6, BO.metalL); }
  rect(282, 56, 300, 62, hex('#3a5a8a')); rect(282, 56, 300, 56, hex('#5a7aa8')); rect(284, 52, 298, 55, hex('#8a3a3a')); rect(284, 52, 298, 52, hex('#aa5a5a'));
  rect(304, 54, 313, 62, BO.barro); rect(304, 54, 313, 54, BO.barroS); rect(312, 55, 313, 62, BO.barroS);
  for (const [x, top, inc] of [[306, 44, -1], [308, 41, 0], [310, 43, 1], [312, 46, 1], [305, 47, -1]]) for (let y = top; y < 54; y++) { const xx = x + Math.round(inc * (54 - y) * 0.2); pset(xx, y, (y + x) % 4 ? BO.hoja : BO.hojaL); if (y > top + 1) pset(xx + 1, y, BO.hojaS); }
  // la papelera de rejilla con papeles arrugados
  for (let y = 140; y <= 152; y++) { const a = 60 + Math.round((152 - y) * 0.15), b = 71 - Math.round((152 - y) * 0.15); for (let x = a; x <= b; x++) pset(x, y, (x + y) % 3 === 0 ? BO.metalL : (x + y) % 3 === 1 ? BO.metalS : b_mezcla(BO.parq2, b_K, 0.4)); }
  rect(59, 139, 72, 140, BO.metal); disco(63, 138, 2.2, BO.papel); disco(67, 137, 2, BO.papelS); pset(64, 137, BO.papelS);
  // la lámpara colgante de tulipa verde (fuera de la barra del año) con su bombilla
  rect(186, 0, 186, 19, hex('#3a3030')); rect(184, 19, 188, 20, BO.latonS);
  poligono([[178, 27], [183, 20], [190, 20], [195, 27]], (x, y) => (x < 184 ? hex('#5a9a72') : x > 190 ? hex('#2a5a3c') : hex('#3e7a52'))); rect(178, 27, 195, 27, BO.marco); rect(184, 21, 185, 23, hex('#8ac0a0'));
  disco(186.5, 28.5, 2, hex('#fff4c8')); pset(186, 28, BO.blanco);
  // la luz de las ventanas sobre el parqué (con la sombra del parteluz)
  b_luz(R, 96, 113, 142, 179, 0.42, 0.24, hex('#fff2d0'), [[117, 121]]); b_luz(R, 162, 113, 208, 179, 0.42, 0.24, hex('#fff2d0'), [[183, 187]]);
  // las rayas de luz de las ventanas en la pared de abajo (el óleo), junto a los radiadores
  for (let y = 112; y <= 116; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) b_tinte(R, x, y, b_K, 0.15);
}

// la mesita metálica del télex (patas a y base + 14) con la balda de abajo y el rollo de papel
function b_mesaTelex(R, cx, base) {
  const { rect, pset, disco } = R, a = cx - 18, b = cx + 18;
  rect(a, base, b, base + 3, BO.metalS); rect(a, base, b, base, BO.metalL); rect(a + 1, base + 1, b - 1, base + 2, BO.metal);
  for (const x of [a + 1, b - 2]) { rect(x, base + 4, x + 1, base + 14, BO.metalS); pset(x, base + 4, BO.metal); rect(x - 1, base + 14, x + 2, base + 14, b_K); }
  rect(a + 2, base + 10, b - 2, base + 11, BO.metalS); rect(a + 2, base + 10, b - 2, base + 10, BO.metal);
  disco(cx - 6, base + 7, 2.6, BO.papelS); disco(cx - 6, base + 7, 2, BO.papel); pset(cx - 6, base + 7, BO.metalS); rect(cx + 2, base + 6, cx + 12, base + 9, hex('#3a5a8a')); rect(cx + 2, base + 6, cx + 12, base + 6, hex('#5a7aa8'));
}

// la cinta de papel perforada a lo largo de un camino de puntos (pts, uno por píxel): w de ancho (2 de lejos, 9 de cerca),
// el canto de luz, el cuerpo y el canto en sombra; las perforaciones corren con off (la cinta que sale)
function b_cinta(R, pts, n, w, off) {
  n = Math.min(n, pts.length); const fila = w > 3 ? 3 : 3;
  for (let k = 0; k < n; k++) {
    const [x, y] = pts[k], [xa, ya] = pts[Math.max(0, k - 1)], [xb, yb] = pts[Math.min(pts.length - 1, k + 1)];
    let tx = xb - xa, ty = yb - ya; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L; const nx = -ty, ny = tx;
    const q = k - Math.floor(off), fase = ((q % fila) + fila) % fila, rf = Math.floor(q / fila);
    for (let d = 0; d < w; d++) {
      const o = d - (w - 1) / 2; let c = d === 0 ? BO.cinta : d === w - 1 ? BO.cintaS : BO.cintaM;
      if (w <= 3) { if (d === 0 && fase === 0) c = BO.agujero; }
      else if (fase === 1 && d > 0 && d < w - 1) { if (d === 4) c = BO.cintaD; else if (h(rf, d, 990) < 0.45) c = BO.agujero; }
      const px = Math.round(x + nx * o), py = Math.round(y + ny * o); R.pset(px, py, c); if (w > 3) R.pset(Math.round(x + nx * o + tx * 0.5), Math.round(y + ny * o + ty * 0.5), c);
    }
  }
}

// un rizo de cinta tumbado (una elipse de cinta: la mitad de delante clara con su sombra debajo, la de atrás más oscura y
// las perforaciones); g: grosor (1 lejos, 3 de cerca)
function b_rizo(R, cx, cy, rx, ry, k, g = 1) {
  const n = Math.max(16, Math.round((rx + ry) * 3)), inc = (h(k, 1, 991) - 0.5) * 0.5;
  for (let s = 0; s < n; s++) {
    const a = s / n * Math.PI * 2, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry + Math.cos(a) * rx * inc, delante = Math.sin(a) > 0;
    for (let e = 0; e < g; e++) {
      const c = (s + k) % 4 === 0 && e === Math.floor(g / 2) ? BO.agujero : delante ? (e === 0 ? BO.cinta : BO.cintaM) : BO.cintaS;
      R.pset(Math.round(x), Math.round(y - g + 1 + e), c);
    }
    if (delante) R.pset(Math.round(x), Math.round(y + 1), BO.cintaD);
  }
}

// el camino de la cinta del télex de Budapest: sale por la derecha, baja por la pata de la mesita y cruza el suelo en ondas
let b_caminoBud = null;

function b_caminoBudapest() {
  if (b_caminoBud) return b_caminoBud;
  const p = [];
  for (let x = 254; x <= 260; x++) p.push([x, 127]);
  for (let y = 128; y <= 153; y++) p.push([261 + Math.round(Math.sin(y * 0.35) * 0.7), y]);
  for (let s = 1; s < 330; s++) { const x = 261 - s, y = 154 + Math.min(1, s / 26) * (9 + 4 * Math.sin(s * 0.045 + 0.4)); p.push([x, Math.round(y)]); const y2 = Math.round(154 + Math.min(1, (s + 0.5) / 26) * (9 + 4 * Math.sin((s + 0.5) * 0.045 + 0.4))); if (Math.abs(y2 - p[p.length - 1][1]) > 0) p.push([x, y2]); }
  return (b_caminoBud = p);
}

// los rizos de cinta de Budapest: montones que crecen con o.cinta (de 0,3 a 1) por el suelo y encima de los muebles;
// cada rizo: [cx, cy, rx, ry, umbral]; los de cy > 158 van por delante de los personajes (occidenteDelante)
let b_rizosBud = null;

function b_rizosBudapest() {
  if (b_rizosBud) return b_rizosBud;
  const MONTON = [[266, 166, 16], [228, 172, 18], [150, 174, 22], [60, 166, 16], [26, 140, 12], [204, 126, 14], [298, 128, 12], [118, 122, 14], [300, 166, 14],
    [119, 96, 16, 'radiador'], [185, 96, 16, 'radiador'], [298, 61, 10, 'archivo'], [32, 35, 14, 'balda'], [240, 139, 8, 'mesita'], [100, 176, 18], [180, 160, 16]];
  const r = [];
  for (let k = 0; k < 120; k++) {
    const [mx, my, mw, tipo] = MONTON[k % MONTON.length], capa = Math.floor(k / MONTON.length), ancho = mw * (1 - capa * 0.07);
    const cx = mx + (h(k, 2, 992) - 0.5) * ancho * 2, cy = my - (tipo ? capa * 1.6 : capa * 2.4) + (h(k, 3, 992) - 0.5) * (tipo ? 2 : 6);
    r.push([cx, cy, 4 + h(k, 4, 992) * (tipo ? 5 : 8), 1.5 + h(k, 5, 992) * (tipo ? 1.5 : 3), 0.3 + 0.7 * (k / 120) * (0.85 + h(k, 6, 992) * 0.15), k]);
  }
  return (b_rizosBud = r);
}

function b_pintaRizos(R, lista, c, filtro, g = 1) { for (const [cx, cy, rx, ry, u, k] of lista) if (c >= u && filtro(cy)) b_rizo(R, Math.round(cx), Math.round(cy), rx, ry, k, g); }

function b_budapest(R, t, o) {
  const c = Math.max(0, Math.min(1, o.cinta ?? 0));
  const V = b_capa(R, 'b_budV', () => { R.rect(0, 0, 319, 179, BV.c4); b_vistaBud(R, 90, 18, [92, 12, 212, 90]); });
  const F = b_capa(R, 'b_budF', () => b_budFrente(R));
  const m = b_mascara('b_budM', V, [[1, BV_CIELO], [2, BV_AGUA], [3, BV_VIA]]);
  R.copiar(V); b_vidaBud(R, m, t, 90, 18); b_encima(R, F);
  // las cortinas de terciopelo, que se mecen con el aire de la ventana entreabierta
  for (const [a, b, lado] of [[83, 93, -1], [145, 151, 1], [152, 159, -1], [211, 221, 1]]) {
    for (let x = a; x <= b; x++) { const i = x - a;
      for (let y = 17; y <= 100; y++) { const sw = Math.sin(t * 0.9 + a) * (y - 17) / 83 * 1.4, f = Math.sin((i + sw) * 1.5); let col = f > 0.45 ? BO.tercL : f < -0.45 ? BO.tercS : BO.terc; if (y > 58 && y < 63) col = y === 60 ? BO.laton : BO.latonS; if (y > 97) col = y === 100 ? BO.tercS : BO.terc; R.pset(x + (y > 63 ? Math.round(sw * 0.6) : 0) + (y > 58 && y < 63 ? -lado : 0), y, col); } }
    for (let x = a; x <= b; x += 2) R.pset(x, 17, BO.latonS);
  }
  // el reloj de pared, las motas de polvo en la luz y el brillo de la bombilla
  b_reloj(R, 246, 27, 9, t, 10.3);
  for (let k = 0; k < 22; k++) { const w = k % 2 ? 162 : 96, y = Math.round(178 - ((h(k, 2, 993) * 66 + t * (1.5 + h(k, 3, 993) * 2)) % 66)), x = Math.round(w + (y - 113) * 0.42 + h(k, 1, 993) * 46 + Math.sin(t * 0.5 + k) * 3); if (Math.sin(t * 1.7 + k * 1.3) > 0) b_tinte(R, x, y, hex('#fff8e0'), 0.55); }
  if (Math.sin(t * 7) > 0.92) R.pset(187, 29, hex('#fff4c8'));
  // la mesita del télex, la cinta y sus rizos de detrás
  b_pintaRizos(R, b_rizosBudapest(), c, (cy) => cy <= 158 && cy < 126);
  b_mesaTelex(R, 240, 140);
  PIEZAS_TS.telex(R, 240, 140, { cinta: 0, t });
  const camino = b_caminoBudapest(); b_cinta(R, camino, Math.round(Math.min(1, c / 0.4) * camino.length), 2, t * 14);
  b_pintaRizos(R, b_rizosBudapest(), c, (cy) => cy <= 158 && cy >= 126);
  return { suelo: 154, sueloMesa: 146, mesa: [78, 138, 204, 178], pantalla: [112, 126], telex: [240, 140], teclado: [239, 131], salidaCinta: [254, 127], ventanas: [[92, 20, 146, 89], [158, 20, 212, 89]], perchero: [75, 110], archivador: [298, 113] };
}

function b_budapestDelante(R, t, o) {
  const c = Math.max(0, Math.min(1, o.cinta ?? 0)), { rect, pset, poligono, linea, disco } = R;
  // la mesa: el tablero con su veta, el canto, el cajonero de la izquierda con tres cajones, el faldón y la pata
  poligono([[84, 138], [198, 138], [204, 146], [78, 146]], (x, y) => (h(x >> 2, y, 994) < 0.2 ? BO.muebleS : (x + y * 3) % 17 === 0 ? BO.muebleL : BO.mueble));
  linea(84, 138, 198, 138, BO.muebleL); rect(78, 146, 204, 148, BO.muebleL); rect(78, 148, 204, 148, BO.muebleS);
  rect(80, 149, 114, 178, BO.muebleS); for (let k = 0; k < 3; k++) { const y = 151 + k * 9; b_cuarteron(R, 82, y, 112, y + 7, BO.mueble, BO.muebleL, BO.muebleS, BO.muebleS, k + 5); rect(94, y + 3, 100, y + 4, BO.latonS); rect(94, y + 3, 100, y + 3, BO.laton); }
  rect(114, 149, 202, 160, BO.mueble); rect(114, 149, 202, 149, BO.muebleS); b_cuarteron(R, 120, 151, 196, 158, BO.mueble, BO.muebleL, BO.muebleS, BO.muebleS, 9);
  rect(196, 160, 202, 178, BO.mueble); rect(201, 160, 202, 178, BO.muebleS); rect(78, 178, 204, 179, b_mezcla(BO.parq2, b_K, 0.5));
  // encima: el ordenador con el juego (corchetes verdes), los disquetes, los papeles, el lapicero y el café que humea
  PIEZAS_TS.terminal(R, 112, 143, { texto: 3, completa: Math.sin(t * 0.8) > 0.3, t });
  rect(136, 140, 156, 144, BO.papelS); rect(135, 139, 155, 143, BO.papel); for (let y = 140; y < 143; y++) for (let x = 137; x < 152; x += 1) if (h(x, y, 995) < 0.6) pset(x, y, BO.papelS);
  PIEZAS_TS.disquete(R, 172, 145, {}); PIEZAS_TS.disquete(R, 178, 143, { etiqueta: '#f0d890' });
  rect(186, 136, 192, 143, BO.papel); rect(186, 136, 192, 137, BO.papelS); rect(191, 137, 192, 143, BO.papelS); rect(187, 138, 191, 138, hex('#6a3a1a')); rect(193, 138, 194, 141, BO.papelS);
  for (let k = 0; k < 4; k++) { const u = ((t * 0.7 + k * 0.25) % 1), y = Math.round(135 - u * 12), x = Math.round(189 + Math.sin(u * 8 + k * 2) * 1.6); if (u < 0.85) pset(x, y, b_mezcla(BO.blanco, BO.pared, u)); }
  rect(197, 134, 200, 143, hex('#3a5a8a')); rect(197, 134, 197, 143, hex('#5a7aa8')); pset(198, 131, BO.rojo); linea(198, 132, 198, 133, hex('#e0c060')); pset(199, 130, b_K); linea(199, 131, 199, 133, hex('#e8e0c0'));
  // la cinta: los rizos de delante y, al final, la que cuelga del canto de la mesa
  b_pintaRizos(R, b_rizosBudapest(), c, (cy) => cy > 158);
  if (c > 0.85) for (const x of [128, 148, 168]) { const L = Math.round((c - 0.85) / 0.15 * 22); b_cinta(R, Array.from({ length: L + 6 }, (_, i) => (i < 6 ? [x - 6 + i, 141] : [x + Math.round(Math.sin(i * 0.3) * 1), 141 + (i - 6)])), L + 6, 2, t * 14); }
  return {};
}

// el télex de cerca: la vista por la ventana, la pared, el corcho con el mapa y el hilo rojo, la mesa y sus cosas
function b_telexFrente(R) {
  const { rect, pset, linea, poligono, disco } = R;
  for (let y = 0; y <= 117; y++) for (let x = 0; x < 320; x++) {
    let c; if (y < 84) { const v = h(x >> 1, y >> 1, 1001); c = v < 0.06 ? BO.paredS : v < 0.22 ? BO.paredM : v > 0.96 ? BO.paredL : BO.pared; }
    else { const v = h(x, y, 1002); c = v < 0.05 ? BO.oleoS : v > 0.96 ? BO.oleoL : BO.oleo; }
    pset(x, y, c);
  }
  rect(0, 83, 319, 84, BO.filete); rect(0, 85, 319, 85, BO.oleoL);
  // la ventana con el puente
  rect(4, 20, 86, 96, BO.marcoD); rect(5, 21, 85, 95, BO.marco); rect(83, 22, 85, 93, BO.marcoS); rect(9, 23, 81, 91, BO.marcoS); rect(10, 24, 80, 90, 0);
  rect(44, 24, 46, 90, BO.marco); rect(46, 24, 46, 90, BO.marcoS); rect(10, 40, 80, 42, BO.marco); rect(10, 42, 80, 42, BO.marcoS); rect(43, 62, 47, 64, BO.laton);
  rect(2, 90, 88, 93, BO.marco); rect(2, 90, 88, 90, BO.blanco); rect(2, 94, 88, 95, BO.marcoS);
  // el corcho con el mapa de Europa (manchas verdes en mar azul), las chinchetas de Budapest y Moscú y el hilo rojo
  rect(100, 16, 200, 74, BO.mueble); rect(100, 16, 200, 16, BO.muebleL); rect(102, 18, 198, 72, BO.corcho);
  for (let y = 18; y <= 72; y++) for (let x = 102; x <= 198; x++) { const v = h(x, y, 1003); if (v < 0.18) pset(x, y, BO.corchoS); else if (v > 0.9) pset(x, y, BO.corchoL); }
  rect(112, 22, 176, 62, BO.papelS); rect(110, 20, 174, 60, hex('#a8c8e0'));
  for (let y = 20; y <= 60; y++) for (let x = 110; x <= 174; x++) { const n = Math.sin(x * 0.11) * 4 + Math.cos(y * 0.17 + x * 0.05) * 3 + h(x >> 2, y >> 2, 1004) * 4; if ((x > 128 || y > 40) && n + (y - 20) * 0.15 > 3.2 && !(x < 138 && y < 30)) pset(x, y, (x + y) % 9 ? hex('#9ac08a') : hex('#7aa874')); }
  for (let y = 20; y <= 60; y += 8) for (let x = 110; x <= 174; x++) if (x % 2) pset(x, y, hex('#8ab0cc'));
  const bud = [140, 46], mos = [168, 30];
  linea(bud[0], bud[1], mos[0], mos[1], BO.rojo); linea(bud[0] + 1, bud[1], mos[0] + 1, mos[1], hex('#a01e1a'));
  disco(bud[0], bud[1], 2, BO.rojo); pset(bud[0] - 1, bud[1] - 1, BO.blanco); disco(mos[0], mos[1], 2.4, BO.rojo); pset(mos[0], mos[1] - 4, BO.laton); pset(mos[0] - 1, mos[1] - 3, BO.laton); pset(mos[0] + 1, mos[1] - 3, BO.laton);
  rect(180, 22, 194, 46, BO.papel); for (let y = 25; y < 44; y += 2) for (let x = 182; x < 192; x++) if (h(x, y, 1005) < 0.7) pset(x, y, BO.tinta); disco(187, 22, 1, hex('#3a6ab0'));
  rect(118, 64, 134, 71, BO.papel); for (let x = 120; x < 132; x++) if (x % 3) pset(x, 67, BO.tinta);
  // la balda con archivadores a la derecha (por debajo de Atom) y una tira de télex clavada
  rect(214, 78, 276, 80, BO.mueble); rect(214, 78, 276, 78, BO.muebleL); rect(216, 81, 218, 86, BO.muebleS); rect(272, 81, 274, 86, BO.muebleS);
  b_libros(R, 216, 274, 78, 18, 7);
  rect(226, 30, 240, 66, BO.papelS); rect(225, 29, 239, 65, BO.papel); for (let y = 32; y < 63; y += 2) for (let x = 227; x < 237; x++) if (h(x, y, 1006) < 0.7) pset(x, y, BO.tinta); disco(232, 29, 1, BO.verde);
  // la mesa de madera: el tablero visto desde arriba con su veta y el canto de delante
  for (let y = 118; y <= 179; y++) for (let x = 0; x < 320; x++) {
    const v = h(x >> 3, y, 1007), w = Math.sin(x * 0.04 + y * 0.9 + Math.sin(y * 0.3) * 2);
    let c = w > 0.85 ? BO.muebleL : w < -0.9 ? BO.muebleS : v < 0.1 ? b_mezcla(BO.mueble, BO.muebleS, 0.5) : BO.mueble;
    if (y < 121) c = b_mezcla(c, b_K, 0.4); if (y > 173) c = y === 174 ? BO.muebleL : BO.muebleS; pset(x, y, c);
  }
  // el teléfono de disco beis, los impresos, el lapicero
  poligono([[22, 150], [26, 136], [52, 136], [56, 150]], (x, y) => (y < 139 ? hex('#e8dcc0') : x > 50 ? hex('#a89c80') : hex('#d8ccb0'))); rect(22, 150, 56, 152, hex('#8a7e64'));
  disco(39, 143, 5.4, hex('#f0e6cc')); for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 1.6 + 0.6; pset(Math.round(39 + Math.cos(a) * 3.6), Math.round(143 + Math.sin(a) * 3.6), hex('#6a604c')); } disco(39, 143, 1.4, hex('#c8bca0'));
  rect(20, 128, 58, 133, hex('#d8ccb0')); rect(20, 128, 58, 128, hex('#f0e6cc')); rect(18, 130, 22, 136, hex('#c8bca0')); rect(56, 130, 60, 136, hex('#c8bca0')); linea(58, 136, 66, 150, hex('#6a604c'));
  for (let k = 0; k < 4; k++) { rect(64 + k, 152 - k * 2, 94 + k, 164 - k * 2, k === 3 ? BO.papel : BO.papelS); } for (let y = 148; y < 157; y += 2) for (let x = 70; x < 92; x++) if (h(x, y, 1008) < 0.6) pset(x, y, BO.tinta);
  rect(30, 158, 36, 170, hex('#3a5a8a')); rect(30, 158, 30, 170, hex('#5a7aa8')); linea(32, 157, 31, 150, hex('#e0b040')); linea(34, 157, 36, 151, hex('#2a2a30')); pset(31, 149, b_K);
  // el flexo de la derecha (la base, los brazos y la cabeza que ilumina la máquina)
  disco(296, 154, 8, BO.metalS); disco(296, 153, 7, hex('#3a5a4a')); rect(289, 152, 303, 154, hex('#2a4a3a'));
  linea(296, 152, 284, 100, hex('#2a4a3a')); linea(297, 152, 285, 100, hex('#4a6a5a')); linea(284, 100, 259, 81, hex('#2a4a3a')); linea(285, 101, 260, 82, hex('#4a6a5a')); disco(284.5, 100.5, 2.2, BO.metalS); pset(284, 100, BO.metalL);
  linea(293, 150, 288, 104, BO.metalS); linea(288, 104, 270, 92, BO.metalS);
  poligono([[255.5, 77.5], [261, 82.5], [251, 102.5], [236.5, 89.5]], (x, y) => (x + y < 334 ? hex('#5a9a7a') : x - y > 160 ? hex('#1e4a34') : hex('#3a6a52'))); disco(258.5, 80, 3, hex('#2a4a3a')); pset(257, 78, hex('#7ab89a'));
  linea(237, 90, 251, 102, hex('#e8e0b8')); linea(238, 91, 250, 101, hex('#fff4c8')); disco(244, 96.5, 2.4, hex('#fffbe8'));
  // la sombra de la máquina en la mesa
  for (let y = 156; y <= 162; y++) for (let x = 100 + (y - 156); x <= 202 - (y - 156); x++) if ((x + y) & 1) b_tinte(R, x, y, b_K, 0.4);
}

let b_caminoTx = null;

function b_caminoTelex() {
  if (b_caminoTx) return b_caminoTx;
  const p = [];
  for (let x = 193; x <= 212; x += 0.5) p.push([x, 120]);
  for (let a = 0; a <= Math.PI / 2; a += 0.04) p.push([212 + Math.sin(a) * 14, 120 + (1 - Math.cos(a)) * 14]);
  for (let y = 134; y <= 156; y += 0.5) p.push([226 + Math.sin(y * 0.2) * 0.5, y]);
  for (let s = 0; s <= 60; s += 0.5) { const a = s / 60 * Math.PI * 0.5; p.push([226 + Math.sin(a) * 18 + s * 0.4, 156 + (1 - Math.cos(a)) * 8 + Math.sin(s * 0.2) * 1.5]); }
  for (let x = 268; x <= 340; x += 0.5) p.push([x, 165 + Math.sin(x * 0.07) * 4]);
  return (b_caminoTx = p);
}

let b_rizosTx = null;

function b_rizosTelex() {
  if (b_rizosTx) return b_rizosTx;
  const MONTON = [[262, 160, 26], [300, 150, 18], [214, 170, 22], [150, 172, 30], [80, 168, 24], [40, 160, 18], [290, 130, 14], [250, 128, 10]];
  const r = [];
  for (let k = 0; k < 70; k++) { const [mx, my, mw] = MONTON[k % MONTON.length], capa = Math.floor(k / MONTON.length);
    r.push([mx + (h(k, 2, 1009) - 0.5) * mw * 2 * (1 - capa * 0.08), my - capa * 4 + (h(k, 3, 1009) - 0.5) * 6, 10 + h(k, 4, 1009) * 12, 3 + h(k, 5, 1009) * 4, 0.3 + 0.7 * (k / 70), k]); }
  return (b_rizosTx = r);
}

function b_telexCerca(R, t, o) {
  const c = Math.max(0, Math.min(1, o.cinta ?? 0));
  const V = b_capa(R, 'b_txV', () => { R.rect(0, 0, 319, 179, BV.c4); b_vistaBud(R, -18, 20, [10, 24, 80, 90]); });
  const F = b_capa(R, 'b_txF', () => b_telexFrente(R));
  const m = b_mascara('b_txM', V, [[1, BV_CIELO], [2, BV_AGUA], [3, BV_VIA]]);
  R.copiar(V); b_vidaBud(R, m, t, -18, 20); b_encima(R, F);
  // la cortina de la ventana, que se mece
  for (let x = 84; x <= 94; x++) for (let y = 18; y <= 104; y++) { const sw = Math.sin(t * 0.9) * (y - 18) / 86 * 1.4, f = Math.sin((x - 84 + sw) * 1.5); R.pset(x + Math.round(sw * 0.5), y, f > 0.45 ? BO.tercL : f < -0.45 ? BO.tercS : BO.terc); }
  // el café que humea (delante del teléfono, a la izquierda)
  { const { rect, pset } = R; rect(100, 150, 112, 162, BO.papel); rect(100, 150, 112, 151, BO.papelS); rect(110, 151, 112, 162, BO.papelS); rect(101, 152, 109, 153, hex('#5a3418')); rect(113, 153, 115, 158, BO.papelS); rect(97, 162, 116, 163, BO.papelS);
    for (let k = 0; k < 6; k++) { const u = ((t * 0.6 + k / 6) % 1), y = Math.round(148 - u * 22), x = Math.round(105 + Math.sin(u * 7 + k * 2) * 2.5); if (u < 0.9) { R.pset(x, y, b_mezcla(BO.blanco, BO.oleo, u)); R.pset(x + 1, y, b_mezcla(BO.blanco, BO.oleo, Math.min(1, u + 0.3))); } } }
  // los rizos de detrás, la máquina al triple, la cinta ancha que sale y la luz del flexo
  b_pintaRizos(R, b_rizosTelex(), c, (cy) => cy <= 160, 3);
  PIEZAS_TS.telex(R, 150, 158, { cinta: 0, t, s: 3 });
  b_relieveTelex(R, t);
  const camino = b_caminoTelex(); b_cinta(R, camino, Math.round(Math.min(1, c / 0.35) * camino.length), 9, t * 18);
  for (let y = 80; y <= 160; y++) { const a = Math.max(0, 1 - Math.abs(y - 112) / 50); for (let x = 150 + Math.round((y - 80) * 0.2); x <= 250 - Math.round((160 - y) * 0.4); x++) if (((x + y) & 3) === 0) b_tinte(R, x, y, hex('#fff6d0'), 0.18 * a); }
  return { suelo: 174, mesa: 118, telex: [150, 158], teclado: [117, 125, 180, 140], salidaCinta: [193, 120], ventana: [10, 24, 80, 90] };
}

// el relieve del télex al triple: sombreado tramado de la carcasa beis (luz arriba, sombra abajo), motas del plástico,
// los tornillos, las rejillas de ventilación del costado, el brillo de las teclas y la placa sin letras
function b_relieveTelex(R, t) {
  const T0 = hex('#d0c8b0') >>> 0, W0 = hex('#e8e4dc') >>> 0, E0 = hex('#6a6456') >>> 0, luz = hex('#e4dcc4'), som = hex('#b0a88e');
  for (let y = 92; y <= 158; y++) for (let x = 105; x <= 195; x++) { const c = R.pget(x, y) >>> 0;
    if (c === T0) { const u = (y - 113) / 45; if (u < 0.25 && b_um(x, y) > u * 4) R.pset(x, y, luz); else if (u > 0.6 && b_um(x, y) < (u - 0.6) * 1.6) R.pset(x, y, som); else if (h(x, y, 1260) < 0.04) R.pset(x, y, som); }
    else if (c === E0 && ((x + y) & 3) === 0 && y < 125) R.pset(x, y, hex('#7a7464')); else if (c === W0 && (y % 3) === 2) R.pset(x, y, hex('#c8c4bc')); }
  for (const [x, y] of [[110, 118], [190, 118], [110, 152], [190, 152]]) { R.disco(x, y, 1.5, hex('#8a8270')); R.pset(x - 1, y - 1, hex('#f0ecdc')); R.pset(x, y, hex('#5a5446')); }
  for (let k = 0; k < 5; k++) R.rect(184, 128 + k * 4, 190, 129 + k * 4, k % 2 ? hex('#8a8270') : hex('#7a7464'));
  R.rect(134, 145, 166, 151, hex('#a89c80')); R.rect(135, 146, 165, 150, hex('#c8bc9c')); R.rect(135, 146, 165, 146, hex('#e8e0c8'));
  if (Math.sin(t * 6) > 0) R.disco(181, 120, 1.6, hex('#ff6a5a'));
}

function b_telexCercaDelante(R, t, o) {
  const c = Math.max(0, Math.min(1, o.cinta ?? 0));
  b_pintaRizos(R, b_rizosTelex(), c, (cy) => cy > 160, 3);
  return {};
}

const BL = pal({
  c0: '#7f96b0', c1: '#91a6be', c2: '#a5b8cc', c3: '#b9c8d6', c4: '#cbd6de', c5: '#d9dfe2', sol1: '#e4e2d8', sol2: '#f0ecdc',
  lej: '#8492a6', lej2: '#77869c', lejL: '#9aa6b8', cup: '#94a2b6', cupL: '#aab6c6',
  piedra: '#b4a894', piedraS: '#8e8472', ladr: '#9a6a56', ladrS: '#7a5040', port: '#c4bcac', pizarra: '#5e6676', pizarraL: '#7a8292', venta: '#4a5262', ventaL: '#d8d0a0',
  rio0: '#566e86', rio1: '#62798f', rio2: '#6e859a', rio3: '#7a90a4', rioL: '#a8bccc', muelle: '#8a8070',
  calz: '#76767c', calzL: '#88888e', parque: '#5a7a50', parqueL: '#7a9a62',
  nogal: '#5a3a24', nogalL: '#7a5232', nogalS: '#3e2616', techo: '#3a2618', techoL: '#4a3222',
  bronce: '#3a3230', bronceL: '#6a5e54', marmol: '#d6cec2', marmolS: '#b8aea0',
  moq: '#2e4c42', moqS: '#264036', moqL: '#38584c', alf: '#8a2a2a', alfS: '#5a1a1a', alfO: '#c8a050', alfA: '#2a3a6a',
  cuero: '#6a1c1c', cueroL: '#8a2a26', cueroS: '#4a1212',
  caoba: '#7a3420', caobaL: '#9a4a2c', caobaS: '#5e2616', caobaD: '#3e180c', oro: '#c8a040', oroL: '#ecd27a', oroS: '#8a6a2a',
  verdeB: '#2e6a4a', verdeBL: '#5aa07a',
});

const BL_CIELO = [BL.c0, BL.c1, BL.c2, BL.c3, BL.c4, BL.c5, BL.sol1, BL.sol2], BL_AGUA = [BL.rio0, BL.rio1, BL.rio2, BL.rio3, BL.rioL], BL_CALZ = [BL.calz, BL.calzL];

const b_rioArriba = (x) => 88 + 4 * Math.sin((x - 28) * 0.022), b_rioAbajo = (x) => 100 + 4 * Math.sin((x - 28) * 0.022 + 0.8);

// Londres desde arriba, recortado al ventanal: cielo con un claro de sol, la ciudad lejana con la cúpula y las agujas, los
// mástiles de dos grúas, la ciudad media de piedra y ladrillo, el Támesis, el puente y los tejados cercanos con chimeneas
function b_vistaLondres(R) {
  const cl = [28, 12, 266, 118], { pset, poligono, disco } = R; R.recorte(cl);
  const rr = (a, b, c, d, col) => b_rr(R, cl, a, b, c, d, col);
  b_degradado(R, 28, 12, 266, 70, [BL.c0, BL.c1, BL.c2, BL.c3, BL.c4, BL.c5]);
  for (let y = 12; y <= 60; y++) for (let x = 190; x <= 252; x++) { const d = Math.hypot(x - 220, (y - 30) * 1.3) / 26; if (d < 1 && (1 - d) * 1.3 > b_um(x, y) + 0.1) pset(x, y, d < 0.45 ? BL.sol2 : BL.sol1); }
  // la ciudad lejana, brumosa: bloques, la cúpula con sus dos torres, las agujas y las grúas
  for (let x = 28, i = 0; x < 267; i++) { const w = 4 + Math.round(h(i, 1, 1100) * 8), al = 6 + Math.round(h(i, 2, 1100) * 12), c = i % 2 ? BL.lej : BL.lej2; rr(x, 76 - al, x + w - 1, 76, c); for (let y = 78 - al; y < 76; y += 3) for (let xx = x + 1; xx < x + w - 1; xx += 2) if (h(xx, y, 1101) < 0.5) pset(xx, y, BL.lejL); x += w; }
  rr(98, 60, 126, 76, BL.lej2); rr(105, 52, 119, 60, BL.lej); for (let x = 106; x <= 118; x += 2) rr(x, 53, x, 59, BL.lej2);
  for (let j = -9; j <= 0; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j * 1.2 <= 72) pset(112 + i, 52 + j, i < -3 && j < -3 ? BL.cupL : BL.cup);
  rr(111, 39, 113, 44, BL.cup); pset(112, 38, BL.lej2); pset(112, 37, BL.lej2); for (const tx of [99, 123]) { rr(tx, 50, tx + 3, 60, BL.lej); poligono([[tx - 0.5, 50.5], [tx + 2, 45], [tx + 4.5, 50.5]], BL.lej2); }
  for (const [x, top, base] of [[66, 44, 64], [150, 48, 66], [176, 50, 68], [86, 54, 66]]) { poligono([[x - 2, base], [x + 0.5, top], [x + 3, base]], BL.lej2); rr(x - 2, base, x + 3, base + 4, BL.lej2); }
  for (const x of [232, 250]) for (let y = 38; y <= 74; y++) { pset(x, y, BL.lej2); pset(x + 2, y, BL.lej2); if ((y + x) % 4 === 0) pset(x + 1, y, BL.lej2); }
  // la ciudad media: manzanas de piedra, ladrillo y piedra de Portland, con sus tejados de pizarra, ventanas y un parque
  for (let x = 28, i = 0; x < 267; i++) { const w = 10 + Math.round(h(i, 3, 1102) * 14), top = 70 + Math.round(h(i, 4, 1102) * 8), tipo = Math.floor(h(i, 5, 1102) * 4);
    if (tipo === 3) { rr(x, top + 4, x + w - 1, 92, BL.parque); for (let k = 0; k < w; k += 3) disco(x + k + 1, top + 4, 2, (k / 3) % 2 ? BL.parqueL : BL.parque); x += w; continue; }
    const c = [BL.piedra, BL.ladr, BL.port][tipo], cS = [BL.piedraS, BL.ladrS, BL.piedraS][tipo];
    rr(x, top, x + w - 1, 92, c); rr(x + w - 1, top, x + w - 1, 92, cS); rr(x, top - 2, x + w - 1, top, BL.pizarra); rr(x, top - 2, x + w - 1, top - 2, BL.pizarraL);
    for (let y = top + 2; y < 92; y += 3) for (let xx = x + 1; xx < x + w - 2; xx += 2) pset(xx, y, BL.venta);
    if (h(i, 6, 1102) < 0.5) { rr(x + 2, top - 5, x + 3, top - 2, BL.ladrS); pset(x + 2, top - 6, BL.ladr); }
    x += w; }
  // el Támesis con sus muelles, sus ondas y sus reflejos
  for (let x = 28; x <= 266; x++) { const a = Math.round(b_rioArriba(x)), b = Math.round(b_rioAbajo(x)); pset(x, a - 1, BL.muelle); pset(x, a - 2, BL.calz);
    for (let y = a; y <= b; y++) { const u = (y - a) / Math.max(1, b - a) * 3, i = Math.floor(u); let c = (u - i) > b_um(x, y) ? [BL.rio0, BL.rio1, BL.rio2, BL.rio3][Math.min(3, i + 1)] : [BL.rio0, BL.rio1, BL.rio2, BL.rio3][i]; if (h(x >> 2, y, 1103) < 0.1 && (x & 3) < 3) c = BL.rioL; pset(x, y, c); }
    pset(x, b + 1, BL.muelle); pset(x, b + 2, BL.calz); pset(x, b + 3, BL.calzL); }
  // el puente que cruza en diagonal (el tablero, el pretil y los arcos del costado)
  { const xa = 148, xb = 176, ya = Math.round(b_rioAbajo(xa)) + 3, yb = Math.round(b_rioArriba(xb)) - 3;
    poligono([[xa - 3, ya + 2], [xa - 6, ya + 6], [xb - 6, yb + 4], [xb - 3, yb]], BL.piedraS);
    for (let k = 1; k < 5; k++) { const u = k / 5, x = Math.round(lerp(xa - 4, xb - 4, u)), y = Math.round(lerp(ya + 4, yb + 2, u)); disco(x, y + 2, 1.6, BL.rio0); }
    poligono([[xa - 3, ya], [xa + 5, ya], [xb + 3, yb], [xb - 3, yb]], BL.calz); R.linea(xa - 3, ya, xb - 3, yb, BL.port); R.linea(xa + 5, ya, xb + 3, yb, BL.piedraS); }
  // los tejados cercanos: pretiles, chimeneas con sus cañones de barro, claraboyas, el depósito de agua y la antena
  const TEJ = [[28, 90, 106, BL.piedra], [90, 160, 110, BL.ladr], [160, 228, 102, BL.port], [228, 266, 108, BL.ladr]];
  for (const [a, b, top, col] of TEJ) {
    rr(a, top, b, 118, col); rr(a, top, b, top + 1, BL.pizarraL); rr(a, top + 2, b, top + 2, BL.pizarra);
    for (let y = top + 6; y < 118; y += 5) for (let x = a + 3; x < b - 3; x += 6) { rr(x, y, x + 2, y + 2, BL.venta); pset(x, y, BL.ventaL); }
    for (let x = a + 1; x < b; x++) if (h(x, top, 1104) < 0.15) pset(x, top + 3, b_mezcla(col, b_K, 0.2));
  }
  for (const x of [40, 66, 104, 132, 240]) { const top = TEJ.find(([a, b]) => x >= a && x < b)[2]; rr(x, top - 8, x + 6, top, BL.ladr); rr(x, top - 8, x + 6, top - 8, BL.ladrS); rr(x + 6, top - 7, x + 6, top, BL.ladrS); for (const dx of [1, 4]) { rr(x + dx, top - 11, x + dx + 1, top - 9, hex('#c86a3a')); pset(x + dx, top - 11, hex('#e08a50')); } }
  rr(176, 90, 190, 101, BL.pizarra); rr(176, 90, 190, 90, BL.pizarraL); for (const x of [177, 189]) rr(x, 96, x, 102, BL.pizarra);
  rr(206, 94, 214, 101, BL.venta); rr(206, 94, 214, 94, BL.lejL); R.linea(218, 101, 218, 84, b_K); R.linea(214, 88, 222, 88, b_K); R.linea(215, 92, 221, 92, b_K);
  R.recorte(null);
}

// la vida de Londres: nubes grises de tres tonos, las plumas de las grúas que giran con su luz, el helicóptero, palomas,
// el crucero y el remolcador con las gabarras, el autobús rojo y un taxi por el puente, y el humo de las chimeneas
function b_vidaLondres(R, m, t) {
  const NUB = [[hex('#eef0f0'), hex('#d0d6dc'), hex('#a6b0bc')], [hex('#f4f4f2'), hex('#dadee2'), hex('#b0b8c2')]];
  for (let k = 0; k < 8; k++) { const v = 0.8 + (k % 3) * 0.9, w = 16 + (k % 3) * 8 + Math.round(h(k, 1, 1110) * 8), x = 10 + ((h(k, 2, 1110) * 300 + t * v) % 300), y = 18 + (k % 3) * 9 + Math.round(h(k, 3, 1110) * 6);
    b_nubeM(R, m, 1, x, y, w, NUB[k % 2]); }
  for (const [x, f] of [[233, 0], [251, 2.2]]) {
    const a = Math.sin(t * 0.12 + f) * 0.9, L = 20, ex = Math.round(x + Math.cos(a) * L), ec = Math.round(x - Math.cos(a) * 7);
    R.linea(ec, 37, ex, 37, (px, py) => (m[py * 320 + px] === 1 ? BL.lej2 : null)); R.linea(x - 1, 34, x + 1, 37, (px, py) => (m[py * 320 + px] === 1 ? BL.lej2 : null));
    for (let y = 38; y < 44 + Math.round(Math.sin(t * 0.3 + f) * 2); y++) b_pm(R, m, 1, ex - 2, y, BL.lej2);
    b_pm(R, m, 1, ex - 3, 44 + Math.round(Math.sin(t * 0.3 + f) * 2), BL.lej2); b_pm(R, m, 1, ex - 1, 44 + Math.round(Math.sin(t * 0.3 + f) * 2), BL.lej2);
    if (Math.sin(t * 3 + f) > 0.2) { b_pm(R, m, 1, x + 1, 33, BO.rojo); b_pm(R, m, 1, ex, 36, BO.rojo); }
  }
  { const u = (t % 24) / 24, x = Math.round(300 - u * 300), y = 24 + Math.round(Math.sin(t * 0.7) * 2);
    for (let i = 0; i < 6; i++) b_pm(R, m, 1, x + i, y, hex('#3a4048')); for (let i = 1; i < 4; i++) b_pm(R, m, 1, x + i, y - 1, hex('#3a4048')); for (let i = 6; i < 10; i++) b_pm(R, m, 1, x + i, y - (i > 8 ? 1 : 0), hex('#3a4048'));
    const rot = Math.floor(t * 20) % 2; for (let i = -3; i <= 8; i++) if ((i + rot) % 2) b_pm(R, m, 1, x + i, y - 2, hex('#5a6068')); if (Math.sin(t * 6) > 0.5) b_pm(R, m, 1, x + 2, y + 1, BO.rojo); }
  for (let k = 0; k < 4; k++) { const u = ((t * (6 + k * 2) + k * 77) % 300) - 20, x = Math.round(k % 2 ? 280 - u : u), y = Math.round(50 + k * 9 + Math.sin(t * 1.4 + k) * 2), al = Math.sin(t * 10 + k * 2) > 0 ? -1 : 0;
    b_pm(R, m, 0, x, y, hex('#4a4e58')); b_pm(R, m, 0, x - 1, y + al, hex('#6a6e78')); b_pm(R, m, 0, x + 1, y + al, hex('#6a6e78')); b_pm(R, m, 0, x - 2, y + al + 1, hex('#6a6e78')); b_pm(R, m, 0, x + 2, y + al + 1, hex('#6a6e78')); }
  { const x = Math.round(10 + ((t * 5 + 60) % 290)), y = Math.round(b_rioArriba(x) + 6);
    for (let i = 0; i < 12; i++) { b_pm(R, m, 2, x + i, y, BO.blanco); b_pm(R, m, 2, x + i, y + 1, hex('#3a4a6a')); if (i > 2 && i < 9) b_pm(R, m, 2, x + i, y - 1, i % 2 ? hex('#5a6a7a') : hex('#e8ecf0')); }
    for (let i = 1; i < 9; i++) if ((i + Math.floor(t * 4)) % 3) b_pm(R, m, 2, x - i, y + 1, BL.rioL); }
  { const x = Math.round(300 - ((t * 3 + 10) % 320)), y = Math.round(b_rioAbajo(x) - 3);
    for (let i = 0; i < 7; i++) { b_pm(R, m, 2, x + i, y, hex('#2a2a30')); if (i < 4) b_pm(R, m, 2, x + i, y - 1, hex('#c83a2a')); } b_pm(R, m, 2, x + 1, y - 2, b_K);
    for (let g = 0; g < 2; g++) { const gx = x + 10 + g * 13; for (let i = 0; i < 11; i++) { b_pm(R, m, 2, gx + i, y, hex('#3a3430')); b_pm(R, m, 2, gx + i, y - 1, i > 1 && i < 10 ? hex('#6a5a44') : hex('#3a3430')); } b_pm(R, m, 2, gx - 2, y - 1, b_K); }
    for (let i = 36; i < 44; i++) if ((i + Math.floor(t * 3)) % 3) b_pm(R, m, 2, x + i, y + 1, BL.rioL); }
  for (const [v, f, col, lar] of [[0.09, 0, hex('#c8282a'), 4], [0.13, 0.5, hex('#1a1a1e'), 3]]) { const u = ((t * v + f) % 2), w = u < 1 ? u : 2 - u, x = lerp(150, 176, w), y = lerp(b_rioAbajo(150) + 4, b_rioArriba(176) - 2, w);
    for (let i = 0; i < lar; i++) for (let j = 0; j < 2; j++) b_pm(R, m, 3, x + i - 1 + (col === BL.calz ? 0 : 0), y - j - i * 0.5, j === 1 && col !== hex('#1a1a1e') ? hex('#e04a3a') : col); }
  for (const x of [41, 44, 67, 70, 105, 108, 133, 136, 241, 244]) { const top = x < 90 ? 106 : x < 160 ? 110 : 108;
    for (let k = 0; k < 5; k++) { const u = ((t * 0.35 + k / 5 + x * 0.013) % 1), y = Math.round(top - 12 - u * 22), xx = Math.round(x + u * 9 + Math.sin(u * 6 + x) * 1.5), r = 1 + u * 2;
      for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (1 - u) * 0.9 > b_um(xx + i, y + j)) { const p = (y + j) * 320 + xx + i; if (m[p]) R.pset(xx + i, y + j, b_mezcla(hex('#c8ccd2'), hex('#e8eaec'), u)); } } }
}

// los reflejos del ventanal: rayas en diagonal que aclaran la vista
let b_reflejosL = null;

function b_reflejos(R, m) {
  if (!b_reflejosL) { b_reflejosL = []; for (const [x0, w] of [[40, 9], [56, 3], [120, 12], [140, 3], [196, 8], [214, 2], [244, 10]]) for (let y = 12; y <= 118; y++) for (let i = 0; i < w; i++) { const x = x0 + i + Math.round((118 - y) * 0.45); if (x >= 28 && x <= 266 && ((x + y) & 1)) b_reflejosL.push(y * 320 + x); } }
  const B = R.buf; if (!B) return; const bl = hex('#ffffff');
  for (const p of b_reflejosL) if (m[p] !== undefined && p < B.length) B[p] = b_mezcla(B[p], bl, 0.16);
}

function b_torreFrente(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // el techo de nogal con sus casetones y dos focos
  rect(0, 0, 319, 9, BL.techo); for (let x = 0; x < 320; x += 40) rect(x, 0, x + 1, 9, BL.techoL); rect(0, 9, 319, 9, BL.nogalS);
  for (const x of [196, 244]) { rect(x - 2, 6, x + 2, 7, hex('#f4e8c0')); pset(x, 8, hex('#fff8e0')); }
  // las paredes de nogal a los lados, con sus cuarterones
  rect(0, 10, 23, 121, BL.nogal); b_cuarteron(R, 3, 16, 20, 62, BL.nogal, BL.nogalL, BL.nogalS, BL.nogalS, 1); b_cuarteron(R, 3, 68, 20, 116, BL.nogal, BL.nogalL, BL.nogalS, BL.nogalS, 2);
  rect(271, 10, 319, 121, BL.nogal); for (let y = 12; y <= 46; y++) for (let x = 272; x < 320; x++) if (h(x >> 1, y, 1120) < 0.08) pset(x, y, b_mezcla(BL.nogal, BL.nogalL, 0.4));
  b_cuarteron(R, 274, 48, 316, 116, BL.nogal, BL.nogalL, BL.nogalS, BL.nogalS, 3);
  // las dos portadas enmarcadas: marco dorado, la hoja con la cabecera roja, el titular en rayas gruesas, la foto y las columnas
  for (const [y0, y1, k] of [[52, 80, 0], [84, 112, 1]]) {
    rect(279, y0, 311, y1, BL.oroS); rect(280, y0 + 1, 310, y1 - 1, BL.oro); rect(280, y0 + 1, 310, y0 + 1, BL.oroL); rect(282, y0 + 3, 308, y1 - 3, BO.papel);
    rect(284, y0 + 5, 306, y0 + 8, k ? b_K : BO.rojo); rect(284, y0 + 10, 306, y0 + 11, b_K); rect(284, y0 + 13, 298, y0 + 13, b_K);
    rect(284, y0 + 15, 294, y1 - 6, hex('#8a8e98')); rect(285, y0 + 16, 289, y0 + 18, hex('#b8bcc4')); for (let y = y0 + 15; y < y1 - 5; y += 2) rect(296, y, 306, y, BO.papelS);
  }
  // el marco de bronce del ventanal, el hueco del cristal y los montantes
  rect(24, 9, 270, 121, BL.bronce); rect(24, 10, 270, 10, BL.bronceL); rect(28, 12, 266, 118, 0);
  for (const x of [86, 146, 206]) { rect(x, 12, x + 2, 118, BL.bronce); rect(x, 12, x, 118, BL.bronceL); }
  // el alféizar de mármol con sus vetas
  rect(22, 117, 272, 121, BL.marmol); rect(22, 117, 272, 117, BO.blanco); rect(22, 121, 272, 121, BL.marmolS); for (let x = 22; x < 272; x++) if (h(x >> 2, 0, 1121) < 0.3) pset(x, 119 + Math.round(Math.sin(x * 0.3)), BL.marmolS);
  // la moqueta verde con su trama y la luz del ventanal, y la alfombra persa
  for (let y = 122; y <= 179; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 1122); let c = ((x + y * 2) & 7) === 0 ? BL.moqS : BL.moq; if (v < 0.08) c = BL.moqS; else if (v > 0.93) c = BL.moqL; if (y < 125) c = b_mezcla(c, b_K, 0.35); pset(x, y, c); }
  b_luz(R, 30, 123, 264, 160, -0.35, 0.16, hex('#e8e4d0'), [[84, 90], [144, 150], [204, 210]]);
  poligono([[40, 150], [146, 150], [154, 176], [30, 176]], (x, y) => {
    const lx = x - lerp(40, 30, (y - 150) / 26), w = lerp(106, 124, (y - 150) / 26), u = lx / w, v = (y - 150) / 26, borde = u < 0.06 || u > 0.94 || v < 0.12 || v > 0.86;
    if (borde) return (Math.floor(lx / 3) + y) % 2 ? BL.alfO : BL.alfS; if (u < 0.08 || u > 0.92 || v < 0.16 || v > 0.82) return BL.alfS;
    const du = Math.abs(u - 0.5) * 2.4, dv = Math.abs(v - 0.5) * 2; if (du + dv < 0.55) return du + dv < 0.3 ? BL.alfO : BL.alfA; if (((Math.floor(lx / 4) + Math.floor(y / 3)) % 5) === 0) return BL.alfO; return BL.alf; });
  for (let x = 30; x <= 154; x += 2) { pset(x, 177, BO.papel); pset(x + 1, 178, BO.papelS); }
  // el caballete con la maqueta de una portada (cabecera roja, titular en rayas, la foto y las columnas)
  linea(12, 74, 5, 156, BL.nogalS); linea(13, 74, 6, 156, BL.nogalL); linea(26, 74, 33, 156, BL.nogalS); linea(27, 74, 34, 156, BL.nogal); linea(19, 76, 20, 150, BL.nogalS); rect(7, 118, 32, 120, BL.nogal);
  rect(5, 80, 33, 118, BL.nogalS); rect(6, 81, 32, 117, BO.papel); rect(8, 83, 30, 88, BO.rojo); rect(9, 84, 13, 87, BO.blanco); rect(8, 91, 30, 93, b_K); rect(8, 95, 24, 96, b_K);
  rect(8, 99, 18, 110, hex('#7a7e88')); rect(9, 100, 14, 103, hex('#a8acb4')); rect(12, 105, 17, 109, hex('#5a5e68')); for (let y = 99; y <= 114; y += 2) rect(20, y, 30, y, hex('#9a9aa4')); rect(8, 113, 18, 113, hex('#9a9aa4'));
  // el aparador de nogal con el decantador, los vasos, los periódicos doblados y la pantalla de bolsa
  rect(38, 101, 134, 124, BL.nogalS); rect(36, 100, 136, 103, BL.nogal); rect(36, 100, 136, 100, BL.nogalL);
  for (let k = 0; k < 4; k++) { const x = 40 + k * 24; b_cuarteron(R, x, 105, x + 21, 121, BL.nogal, BL.nogalL, BL.nogalS, BL.nogalS, 4 + k); rect(x + (k % 2 ? 2 : 18), 111, x + (k % 2 ? 3 : 19), 114, BL.oro); }
  rect(38, 122, 134, 124, BL.nogalS);
  rect(42, 98, 64, 99, hex('#c8ccd4')); rect(42, 98, 64, 98, BO.blanco);
  poligono([[47, 97], [47, 88], [49, 86], [49, 82], [51, 82], [51, 86], [53, 88], [53, 97]], hex('#d8e4ec')); rect(48, 90, 52, 96, hex('#c88a3a')); rect(48, 90, 48, 96, hex('#e8b060')); rect(49, 80, 51, 81, hex('#d8e4ec')); pset(48, 84, BO.blanco);
  for (const x of [56, 60]) { rect(x, 93, x + 2, 97, hex('#d8e4ec')); rect(x, 95, x + 2, 97, hex('#c88a3a')); pset(x, 93, BO.blanco); }
  for (let k = 0; k < 4; k++) { rect(68, 98 - k * 2, 90, 99 - k * 2, k % 2 ? BO.papelS : BO.papel); for (let x = 70; x < 88; x += 3) pset(x, 98 - k * 2, BO.tinta); } rect(68, 90, 90, 91, BO.rojo);
  rect(96, 78, 126, 100, hex('#3a3a40')); rect(96, 78, 126, 78, hex('#5a5a62')); rect(99, 81, 123, 96, hex('#0a1a12')); rect(108, 98, 114, 99, hex('#2a2a30'));
  // el sillón de cuero capitoné detrás de la mesa
  for (let y = 96; y <= 140; y++) for (let x = 204; x <= 246; x++) { const dx = Math.abs(x - 225), top = 96 + Math.round(dx * dx / 70); if (y < top) continue; const borde = x < 207 || x > 243; let c = borde ? BL.cueroS : (y - top < 2 ? BL.cueroL : BL.cuero); if (!borde && ((x - 207 + (Math.floor((y - 100) / 6) % 2) * 4) % 8 === 0) && (y - 100) % 6 === 0) c = BL.cueroS; if (!borde && x < 212 && (x + y) % 3 === 0) c = BL.cueroL; pset(x, y, c); }
  for (let y = 100; y < 138; y += 6) for (let x = 211; x < 242; x += 8) { const xx = x + ((y - 100) / 6 % 2) * 4; disco(xx, y, 1, BL.cueroS); pset(xx - 1, y - 1, BL.cueroL); }
  // el catalejo de latón sobre su trípode, junto al ventanal
  linea(250, 101, 266, 91, BL.oroS); linea(250, 100, 266, 90, BL.oro); linea(251, 99, 265, 90, BL.oroL); rect(264, 88, 267, 92, BL.oroS);
  linea(257, 97, 250, 140, BL.nogalS); linea(257, 97, 262, 140, BL.nogalS); linea(257, 97, 257, 140, BL.nogal);
}

function b_torre(R, t, o) {
  const V = b_capa(R, 'b_torV', () => { R.rect(0, 0, 319, 179, BL.c3); b_vistaLondres(R); });
  const F = b_capa(R, 'b_torF', () => b_torreFrente(R));
  const m = b_mascara('b_torM', V, [[1, BL_CIELO], [2, BL_AGUA], [3, BL_CALZ]]);
  // la máscara también marca con 4 el resto del cristal (para el humo y las palomas)
  if (!m.b_hecha) { for (let y = 12; y <= 118; y++) for (let x = 28; x <= 266; x++) if (!m[y * 320 + x]) m[y * 320 + x] = 4; for (let y = 12; y <= 118; y++) for (const x0 of [86, 146, 206]) for (let x = x0; x <= x0 + 2; x++) m[y * 320 + x] = 0; m.b_hecha = true; }
  R.copiar(V); b_vidaLondres(R, m, t); b_reflejos(R, m); b_encima(R, F);
  const { pset, disco, linea, rect } = R;
  // la pantalla de bolsa del aparador: dos líneas que avanzan y la rejilla
  for (let x = 100; x <= 122; x += 4) for (let y = 82; y <= 95; y += 2) pset(x, y, hex('#123a22'));
  for (let x = 99; x <= 123; x++) { const s = x + Math.floor(t * 6), y1 = Math.round(89 + Math.sin(s * 0.5) * 2 + Math.sin(s * 0.13) * 3), y2 = Math.round(92 + Math.sin(s * 0.31 + 2) * 2); pset(x, y1, hex('#5aff8a')); pset(x, y2, hex('#e0c040')); }
  if (Math.sin(t * 4) > 0) pset(122, 81, BO.rojo);
  // la bola del mundo que gira, con su meridiano de latón, sobre el pie de madera
  { const cx = 151, cy = 126, r = 9; linea(151, 136, 145, 150, BL.nogalS); linea(151, 136, 157, 150, BL.nogalS); linea(151, 136, 151, 150, BL.nogal); rect(146, 135, 156, 137, BL.nogal);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue; const lat = j / r, lon = Math.asin(Math.max(-1, Math.min(1, i / (r * Math.sqrt(Math.max(0.05, 1 - lat * lat)))))) + t * 0.4;
      const tierra = Math.sin(lon * 2.1 + lat * 2) + Math.sin(lon * 3.7 - lat * 4) * 0.6 > 0.5; let c = tierra ? hex('#d8c88a') : hex('#6a9aba'); if (i < -3 && j < -3) c = b_mezcla(c, BO.blanco, 0.3); if (i > 4 || j > 5) c = b_mezcla(c, b_K, 0.3); pset(cx + i, cy + j, c); }
    for (let a = -2.3; a <= 2.3; a += 0.08) pset(Math.round(cx + Math.sin(a) * (r + 1.5)), Math.round(cy - Math.cos(a) * (r + 1.5)), BL.oro); pset(cx, cy - r - 2, BL.oroL); }
  return { suelo: 164, sueloMesa: 144, mesa: [164, 136, 316, 176], firma: [250, 138], sillon: [225, 140], ventanal: [28, 12, 266, 118], caballete: [19, 156], bola: [151, 150], aparador: [38, 100, 134, 124], alfombra: [30, 150, 154, 176] };
}

function b_torreDelante(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R;
  // el tablero de caoba con su veta, el reflejo del ventanal y el cuero verde con el filete dorado
  poligono([[172, 136], [308, 136], [316, 144], [164, 144]], (x, y) => (h(x >> 3, y, 1130) < 0.2 ? BL.caobaS : ((x + y * 4) % 23 === 0 ? BL.caobaL : BL.caoba)));
  for (let y = 137; y <= 143; y++) for (const [a, b] of [[176, 196], [262, 290]]) for (let x = a - (y - 137); x <= b - (y - 137); x++) if ((x + y) % 2 === 0) pset(x, y, BL.caobaL);
  poligono([[192, 137], [288, 137], [292, 142], [188, 142]], BL.verdeB); linea(192, 137, 288, 137, BL.oro); linea(188, 142, 292, 142, BL.oro); linea(193, 138, 287, 138, BL.verdeBL);
  rect(164, 144, 316, 146, BL.caobaL); rect(164, 147, 316, 176, BL.caoba); rect(164, 147, 316, 147, BL.caobaS);
  for (let k = 0; k < 3; k++) { const a = 170 + k * 49; b_cuarteron(R, a, 151, a + 43, 170, BL.caoba, BL.caobaL, BL.caobaD, BL.caobaS, 10 + k); rect(a + 18, 158, a + 25, 159, BL.oroS); rect(a + 18, 158, a + 25, 158, BL.oro); }
  rect(164, 172, 316, 176, BL.caobaS); rect(164, 172, 316, 172, BL.caobaL); rect(164, 177, 316, 179, b_mezcla(BL.moq, b_K, 0.5));
  // la lámpara de banquero (pantalla de cristal verde, la luz sobre el tablero)
  disco(298, 135, 4, BL.oroS); rect(294, 133, 302, 135, BL.oro); rect(297, 122, 298, 133, BL.oro); rect(299, 122, 299, 133, BL.oroS);
  poligono([[286, 122], [290, 116], [306, 116], [310, 122]], (x, y) => (y < 118 ? BL.verdeBL : x > 304 ? hex('#1e4a32') : BL.verdeB)); rect(286, 122, 310, 122, BL.oroS); rect(289, 123, 307, 123, hex('#fff2c0'));
  for (let y = 136; y <= 143; y++) for (let x = 280 - (y - 136); x <= 316; x++) if ((x + y) & 1) b_tinte(R, x, y, hex('#fff2c0'), 0.22);
  // los dos teléfonos: el crema con el auricular y el negro de varias líneas con sus botones que parpadean
  poligono([[172, 140], [175, 131], [191, 131], [194, 140]], (x, y) => (y < 133 ? hex('#f0e6cc') : x > 189 ? hex('#a89c80') : hex('#dccfb0'))); rect(174, 128, 192, 131, hex('#e8dcc0')); rect(172, 129, 175, 132, hex('#d0c4a4')); rect(191, 129, 194, 132, hex('#d0c4a4'));
  disco(183, 136, 2.5, hex('#f8f0dc')); pset(183, 136, hex('#8a7e64'));
  rect(196, 132, 210, 140, hex('#1e1e24')); rect(196, 132, 210, 132, hex('#3a3a44')); rect(197, 129, 209, 131, hex('#2a2a32'));
  for (let i = 0; i < 4; i++) { const on = Math.sin(t * (2 + i * 0.7) + i * 1.3) > 0.4; pset(198 + i * 3, 135, on ? (i % 2 ? BO.verde : BO.rojo) : hex('#4a4a52')); pset(198 + i * 3, 137, hex('#6a6a72')); }
  // el portaplumas de mármol y las maquetas de portada con rayas
  rect(244, 133, 256, 136, BL.marmol); rect(244, 133, 256, 133, BO.blanco); linea(247, 133, 244, 126, b_K); linea(253, 133, 256, 126, b_K); pset(244, 126, BL.oro); pset(256, 126, BL.oro);
  for (const [x, y, k] of [[264, 136, 0], [272, 138, 1]]) { rect(x, y, x + 16, y + 6, BO.papelS); rect(x - 1, y - 1, x + 15, y + 5, BO.papel); rect(x, y, x + 14, y + 1, k ? b_K : BO.rojo); rect(x, y + 3, x + 9, y + 3, b_K); for (let xx = x + 11; xx < x + 15; xx++) pset(xx, y + 3, BO.papelS); }
  return {};
}

const BT = pal({
  c0: '#8cc0e8', c1: '#a4cef0', c2: '#bcdcf4',
  ladr: '#b05e46', ladrS: '#8a4634', ladrL: '#c87458', cornisa: '#d8c8a8', cornisaS: '#a89878', ventF: '#e8e0d0', ventC: '#5a7a9a', ventCL: '#8aaac8',
  acera: '#c8c4ba', aceraS: '#a8a49a', aceraL: '#dcd8ce', bordillo: '#8a8680', asfalto: '#5a5a60', asfaltoS: '#4a4a50', asfaltoL: '#6a6a70', raya: '#e8c040',
  toldo1: '#c83a3a', toldo2: '#f4ece0', tiendaL: '#f0d8a0',
  alu: '#9ca0a8', aluL: '#d0d4da', aluS: '#6c7078',
  techo: '#e6e2d6', techoS: '#ccc8bc', fluor: '#f8f8f0', fluorS: '#d8dcd0',
  pared: '#d8d2c2', paredS: '#b8b2a2', paredL: '#e8e2d4', balda: '#eceae4', baldaS: '#a8a49a',
  moq: '#5e6a80', moqS: '#4e586c', moqL: '#6e7a90',
  tarima: '#a83a3a', tarimaS: '#7a2a2a', madera: '#8a5a34', maderaS: '#6a4228', maderaL: '#a8744a',
  beis: '#d8ccb0', beisS: '#a89c80', beisL: '#ece2cc', tecla: '#6a6456',
  lam: '#e0d8c4', lamS: '#a8a090', cromo: '#b8bcc4',
});

const BT_CIELO = [BT.c0, BT.c1, BT.c2];

const b_CAJAS = ['#c83a3a', '#3a6ad8', '#2a8a5a', '#e0a020', '#7a3aa8', '#1a1a2a', '#e86a2a', '#2aa8b8', '#d8d0c0', '#5a3a2a'].map(hex);

// una caja de programa de pie, de cara, sin letras: el color, la banda de arriba, un dibujo (rayas, planeta, montañas,
// rejilla, estrella o puesta de sol), el canto en sombra y el brillo
function b_cajaSoft(R, x, yb, w, al, k) {
  const { rect, pset, disco } = R, c = b_CAJAS[k % b_CAJAS.length], cS = b_mezcla(c, b_K, 0.35), cL = b_mezcla(c, BO.blanco, 0.35), y0 = yb - al, tipo = Math.floor(h(k, 1, 1200) * 6);
  rect(x, y0, x + w - 1, yb - 1, c); rect(x + w - 1, y0, x + w - 1, yb - 1, cS); rect(x, y0, x + w - 2, y0, cL); rect(x, y0 + 1, x + w - 2, y0 + 2, cS);
  const ax = x + 1, ay = y0 + 4, bx = x + w - 3, by = yb - 3;
  if (tipo === 0) { for (let y = ay; y <= by; y++) for (let xx = ax; xx <= bx; xx++) if (((xx + y) >> 1) % 3 === 0) pset(xx, y, cL); }
  else if (tipo === 1) { rect(ax, ay, bx, by, hex('#14142a')); disco((ax + bx) / 2, (ay + by) / 2 + 1, Math.min(bx - ax, by - ay) / 2.6, cL); pset(ax + 1, ay + 1, BO.blanco); pset(bx - 1, ay + 2, BO.blanco); }
  else if (tipo === 2) { rect(ax, ay, bx, by, cL); for (let xx = ax; xx <= bx; xx++) { const top = by - Math.abs(((xx - ax) % 6) - 3) - 1; for (let y = top; y <= by; y++) pset(xx, y, cS); } }
  else if (tipo === 3) { rect(ax, ay, bx, by, b_K); for (let y = ay + 1; y <= by; y += 2) for (let xx = ax; xx <= bx; xx++) pset(xx, y, hex('#3aa0e0')); }
  else if (tipo === 4) { const cx = Math.round((ax + bx) / 2), cy = Math.round((ay + by) / 2); for (let i = -2; i <= 2; i++) { pset(cx + i, cy, BT.raya); pset(cx, cy + i, BT.raya); } pset(cx - 1, cy - 1, BT.raya); pset(cx + 1, cy + 1, BT.raya); pset(cx + 1, cy - 1, BT.raya); pset(cx - 1, cy + 1, BT.raya); }
  else { for (let y = ay; y <= by; y++) rect(ax, y, bx, y, [hex('#f0c040'), hex('#f08a3a'), hex('#d04a6a'), hex('#6a3a8a')][Math.min(3, Math.floor((y - ay) / Math.max(1, (by - ay + 1) / 4)))]); }
  rect(x + 1, yb - 2, x + w - 3, yb - 2, cS);
}

// la calle de enfrente por el escaparate: el cielo, la fachada de ladrillo con ventanas y persianas, la tienda de abajo
// con su toldo a rayas, las aceras con sus juntas y el asfalto con la doble raya amarilla
function b_vistaCalle(R) {
  const { rect, pset } = R;
  b_degradado(R, 0, 0, 140, 30, BT_CIELO);
  rect(0, 22, 140, 66, BT.ladr); for (let y = 22; y <= 66; y++) for (let x = 0; x <= 140; x++) { if (y % 3 === 0) pset(x, y, BT.ladrS); else if ((x + (Math.floor(y / 3) % 2) * 3) % 6 === 0) pset(x, y, BT.ladrS); else if (h(x, y, 1201) < 0.06) pset(x, y, BT.ladrL); }
  rect(0, 22, 140, 25, BT.cornisa); rect(0, 25, 140, 26, BT.cornisaS); for (let x = 1; x < 140; x += 4) pset(x, 24, BT.cornisaS);
  for (let x = 6; x < 140; x += 22) { rect(x - 1, 30, x + 10, 43, BT.ventF); rect(x, 31, x + 9, 42, BT.ventC); for (let y = 31; y < 37; y += 2) rect(x, y, x + 9, y, BT.ventCL); rect(x + 4, 31, x + 5, 42, BT.ventF); rect(x - 2, 43, x + 11, 44, BT.cornisa); }
  for (let y = 46; y <= 52; y++) for (let x = 0; x <= 140; x++) pset(x, y, Math.floor(x / 5) % 2 ? BT.toldo1 : BT.toldo2);
  for (let x = 0; x <= 140; x += 5) { pset(x + 1, 53, BT.toldo1); pset(x + 2, 53, BT.toldo1); pset(x + 2, 54, BT.toldo1); }
  rect(0, 55, 140, 66, hex('#4a3a34')); for (let x = 4; x < 140; x += 30) { rect(x, 56, x + 22, 65, BT.tiendaL); rect(x, 61, x + 22, 65, hex('#d8b880')); rect(x + 10, 56, x + 11, 65, hex('#4a3a34')); }
  rect(0, 66, 140, 70, BT.acera); for (let x = 0; x < 140; x += 12) rect(x, 66, x, 70, BT.aceraS); rect(0, 70, 140, 71, BT.bordillo);
  for (let y = 72; y <= 86; y++) for (let x = 0; x <= 140; x++) { const v = h(x, y, 1202); pset(x, y, v < 0.1 ? BT.asfaltoS : v > 0.93 ? BT.asfaltoL : BT.asfalto); }
  rect(0, 78, 140, 78, BT.raya); rect(0, 80, 140, 80, BT.raya);
  rect(0, 87, 140, 88, BT.bordillo); rect(0, 87, 140, 87, BT.aceraL);
  for (let y = 89; y <= 120; y++) for (let x = 0; x <= 140; x++) { let c = BT.acera; if (x % 16 === 0 || (y - 89) % 10 === 0) c = BT.aceraS; else if (h(x, y, 1203) < 0.05) c = BT.aceraL; else if (h(x >> 1, y >> 1, 1204) < 0.02) c = BT.asfaltoL; pset(x, y, c); }
}

// la vida de la calle: nubes, coches de los ochenta (sedán, ranchera con madera, furgoneta) en los dos sentidos, paseantes
// por la acera, y por delante el árbol que se mece, el parquímetro y la caja de periódicos
function b_vidaCalle(R, m, t) {
  const { rect, pset, disco } = R;
  for (let k = 0; k < 4; k++) { const x = -20 + ((h(k, 1, 1210) * 170 + t * (1 + k % 3 * 0.8)) % 170), y = 8 + (k % 2) * 6; b_nubeM(R, m, 1, x, y + 6, 12 + (k % 3) * 5, [BO.blanco, hex('#e8f0f6'), hex('#b8cce0')]); }
  const COCHES = [[hex('#8a5a3a'), 0], [hex('#e8e0c8'), 1], [hex('#a82a2a'), 0], [hex('#2a3a6a'), 2], [hex('#4a6a4a'), 1]];
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, v = 26 + k * 4, u = (t * v + k * 97) % 260, x = Math.round(d > 0 ? u - 50 : 190 - u), y = d > 0 ? 85 : 77, [col, tipo] = COCHES[k % COCHES.length], cS = b_mezcla(col, b_K, 0.35);
    rect(x, y - 6, x + 30, y - 2, col); rect(x, y - 2, x + 30, y - 2, cS); rect(x - 1, y - 4, x + 31, y - 3, BT.cromo);
    if (tipo === 2) { rect(x + 2, y - 13, x + 26, y - 6, col); rect(x + (d > 0 ? 20 : 3), y - 12, x + (d > 0 ? 25 : 8), y - 8, hex('#5a7a9a')); }
    else { rect(x + 7, y - 11, x + 23, y - 6, col); rect(x + 9, y - 10, x + 15, y - 7, hex('#6a8aaa')); rect(x + 16, y - 10, x + 21, y - 7, hex('#6a8aaa')); pset(x + 9, y - 10, hex('#b8d0e4')); if (tipo === 1) { rect(x + 2, y - 5, x + 28, y - 4, hex('#8a5a2a')); rect(x + 4, y - 11, x + 26, y - 6, col); rect(x + 22, y - 10, x + 25, y - 7, hex('#6a8aaa')); } }
    for (const dx of [6, 24]) { disco(x + dx, y - 1, 2.6, b_K); disco(x + dx, y - 1, 1.2, BT.cromo); }
    pset(d > 0 ? x + 30 : x, y - 5, d > 0 ? hex('#fff4c0') : BO.rojo); }
  const GENTE = [[hex('#c84a6a'), hex('#3a4a7a'), hex('#e8b090'), hex('#3a2a1a')], [hex('#3a7a9a'), hex('#5a4a3a'), hex('#a8704a'), hex('#1a1a1a')], [hex('#e0b030'), hex('#2a2a3a'), hex('#e8b090'), hex('#8a5a2a')], [hex('#6a3a8a'), hex('#3a3a44'), hex('#c88a60'), hex('#5a3a1a')]];
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, u = (t * (9 + k * 2) + k * 61) % 190, x = d > 0 ? u - 25 : 165 - u; b_persona((a, b, c) => pset(a, b, c), x, 106 + (k % 2) * 4, t, GENTE[k], 17, d); }
  for (let k = 0; k < 3; k++) { const d = k % 2 ? 1 : -1, u = (t * (5 + k) + k * 40) % 180, x = d > 0 ? u - 20 : 160 - u; b_persona((a, b, c) => pset(a, b, c), x, 69, t, GENTE[(k + 2) % 4], 9, d); }
  // el árbol de la acera en su alcorque, que se mece; el parquímetro; la caja de periódicos azul (sin letras)
  const sw = Math.sin(t * 0.9) * 1.2;
  rect(20, 60, 23, 112, hex('#5a4030')); rect(20, 60, 20, 112, hex('#7a5840')); rect(14, 111, 29, 113, hex('#3a3a3a'));
  for (const [dx, dy, r] of [[-8, 48, 9], [8, 46, 9], [0, 39, 10], [-4, 56, 7], [7, 56, 7], [1, 32, 6]]) { disco(22 + dx + sw * (60 - dy) / 30, dy + 1, r, hex('#2e5a2a')); disco(21.5 + dx + sw * (60 - dy) / 30, dy, r * 0.8, hex('#4a8a3a')); disco(20.5 + dx + sw * (60 - dy) / 30, dy - 1.5, r * 0.4, hex('#74b052')); }
  for (let k = 0; k < 10; k++) if (Math.sin(t * 3 + k * 2) > 0.4) pset(Math.round(22 + (h(k, 1, 1211) - 0.5) * 30 + sw), Math.round(32 + h(k, 2, 1211) * 26), hex('#9ad070'));
  rect(87, 76, 88, 100, BT.aluS); rect(84, 70, 91, 77, hex('#5a5e66')); rect(85, 71, 90, 74, hex('#c8d8c0')); pset(87, 72, BO.rojo);
  rect(110, 96, 122, 112, hex('#3a5aa8')); rect(110, 96, 122, 96, hex('#5a7ac8')); rect(112, 99, 120, 104, hex('#c8d4e0')); rect(113, 100, 119, 100, hex('#8a9aaa')); rect(110, 112, 111, 114, b_K); rect(121, 112, 122, 114, b_K);
}

function b_tiendaFrente(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // el techo de placas con su rejilla y su moteado, y el raíl de los focos
  for (let y = 0; y <= 13; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 20 === 0 || y === 6 || y === 13 ? BT.techoS : h(x, y, 1220) < 0.1 ? BT.techoS : BT.techo);
  rect(20, 13, 120, 14, BT.aluS);
  // el escaparate y la puerta: el aluminio, los huecos del cristal, el tirador, la campanilla y el letrero del horario
  rect(0, 15, 131, 120, BT.alu); rect(0, 15, 131, 15, BT.aluL); rect(4, 18, 98, 96, 0); rect(107, 20, 125, 116, 0);
  rect(2, 16, 100, 17, BT.aluS); rect(99, 16, 101, 98, BT.aluS); rect(100, 16, 100, 98, BT.aluL); rect(102, 17, 130, 19, BT.aluS); rect(104, 18, 106, 118, BT.aluS); rect(126, 18, 128, 118, BT.aluS); rect(104, 18, 104, 118, BT.aluL);
  rect(108, 64, 124, 67, BT.aluS); rect(108, 64, 124, 65, BT.aluL); rect(109, 66, 110, 70, BT.aluS); rect(122, 66, 123, 70, BT.aluS);
  rect(110, 38, 121, 49, BO.blanco); rect(110, 38, 121, 38, BO.papelS); disco(115.5, 44, 3.5, b_K); disco(115.5, 44, 2.6, BO.blanco); linea(115, 44, 115, 42, b_K); linea(115, 44, 117, 44, b_K);
  rect(115, 20, 117, 22, BO.laton); disco(116, 24, 1.5, BO.latonL);
  for (let x = 76; x < 94; x++) for (const [j, c] of [[0, hex('#e04a3a')], [1, hex('#f0a030')], [2, hex('#f0e040')], [3, hex('#4ab04a')], [4, hex('#3a7ad8')]]) { const y = 34 - Math.round(Math.sqrt(Math.max(0, 81 - (x - 85) * (x - 85)))) + j; pset(x, y, c); }
  rect(0, 96, 100, 120, BT.alu);
  // la tarima del escaparate, enmoquetada de rojo, con su frente de madera
  rect(0, 96, 100, 100, BT.tarima); for (let x = 0; x <= 100; x++) if (h(x, 1, 1221) < 0.3) pset(x, 97 + (x % 3), BT.tarimaS); rect(0, 100, 100, 101, BT.tarimaS);
  for (let y = 102; y <= 120; y++) for (let x = 0; x <= 100; x++) { const w = Math.sin(x * 0.07 + y * 0.6 + Math.sin(y) * 2); pset(x, y, w > 0.85 ? BT.maderaL : w < -0.88 ? BT.maderaS : BT.madera); } rect(0, 102, 100, 102, BT.maderaL); rect(100, 102, 100, 120, BT.maderaS);
  // la pared de listones con el rótulo de pictogramas y las cuatro baldas de cajas de programas
  for (let y = 15; y <= 120; y++) for (let x = 132; x < 320; x++) { let c = (y % 4 === 0) ? BT.paredS : (y % 4 === 1 ? BT.paredL : BT.pared); if (x > 274 && y < 48) c = (y % 4 === 0) ? b_mezcla(BT.pared, BT.paredS, 0.5) : BT.pared; pset(x, y, c); }
  rect(132, 15, 134, 120, BT.aluS);
  rect(176, 16, 272, 27, hex('#2a3050')); rect(176, 16, 272, 16, hex('#4a5070')); rect(176, 27, 272, 27, hex('#1a1e34'));
  const PICT = [['#######', '#.###.#', '#.###.#', '#######', '#.....#', '#.....#', '#######'], ['...#...', '...#...', '..###..', '...#...', '.#####.', '#######', '.......'], ['#######', '#.....#', '#.....#', '#######', '...#...', '.#####.', '.......'], ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......']];
  const PCOL = ['#f0c040', '#e04a3a', '#3ab0e0', '#5ad05a'].map(hex);
  for (let k = 0; k < 8; k++) { const g = PICT[k % 4], x0 = 182 + k * 11; g.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') pset(x0 + i, 18 + j, PCOL[k % 4]); }); }
  for (const yb of [46, 70, 94, 118]) {
    for (let x = 138, k = yb; x < 268; k++) { const w = 10 + Math.round(h(k, 2, 1222) * 6), al = 14 + Math.round(h(k, 3, 1222) * 6); if (x + w > 270) break; b_cajaSoft(R, x, yb, w, Math.min(al, yb - (yb === 46 ? 30 : yb - 22)), k); if (h(k, 4, 1222) < 0.5) { rect(x + 2, yb + 3, x + 5, yb + 4, BO.blanco); pset(x + 3, yb + 3, BO.rojo); } x += w + 1 + (h(k, 5, 1222) < 0.2 ? 3 : 0); }
    rect(136, yb, 270, yb + 2, BT.balda); rect(136, yb + 2, 270, yb + 2, BT.baldaS); for (const x of [140, 204, 266]) rect(x, yb + 3, x + 1, yb + 5, BT.aluS);
  }
  // el póster espacial (por debajo de Atom) y el panel de joysticks colgados
  rect(280, 50, 314, 80, b_K); rect(281, 51, 313, 79, hex('#141432')); for (let k = 0; k < 18; k++) pset(282 + Math.round(h(k, 1, 1223) * 30), 52 + Math.round(h(k, 2, 1223) * 26), k % 3 ? BO.blanco : BT.raya);
  disco(304, 72, 7, hex('#c86a3a')); disco(302, 70, 4, hex('#e09050')); poligono([[290, 70], [294, 58], [298, 70]], hex('#e8e8f0')); rect(292, 70, 296, 72, BO.rojo); pset(294, 74, BT.raya); pset(293, 75, hex('#f08a3a')); pset(295, 75, hex('#f08a3a'));
  rect(278, 84, 316, 118, hex('#c8b896')); for (let y = 86; y < 118; y += 4) for (let x = 280; x < 316; x += 4) pset(x, y, hex('#8a7a5a'));
  for (const [x, y] of [[282, 88], [298, 88], [282, 104], [298, 104]]) { rect(x, y, x + 13, y + 12, hex('#d8e4ec')); rect(x + 3, y + 7, x + 10, y + 10, b_K); rect(x + 6, y + 2, x + 7, y + 7, b_K); disco(x + 6.5, y + 2, 1.6, BO.rojo); rect(x + 5, y - 1, x + 8, y, BT.aluS); }
  // la moqueta de placas gris azulada con sus juntas, el felpudo de la entrada y la luz del escaparate
  for (let y = 121; y <= 179; y++) for (let x = 0; x < 320; x++) { let c = BT.moq; if (x % 32 === 0 || (y - 121) % 16 === 0) c = BT.moqS; else { const v = h(x, y, 1224); if (v < 0.12) c = BT.moqS; else if (v > 0.88) c = BT.moqL; else if (v > 0.86) c = hex('#8a6a8a'); else if (v > 0.845) c = hex('#6a8a9a'); if (((x >> 5) + ((y - 121) >> 4)) & 1 && (x + y) % 3 === 0) c = b_mezcla(c, BT.moqS, 0.4); } if (y < 124) c = b_mezcla(c, b_K, 0.3); pset(x, y, c); }
  for (let y = 121; y <= 134; y++) for (let x = 98 + Math.round((y - 121) * 0.3); x <= 136; x++) pset(x, y, y % 2 ? hex('#3a3a3a') : hex('#4a4a4a'));
  b_luz(R, 6, 121, 128, 178, 0.55, 0.14, hex('#fff8e0'), [[98, 106]]);
  // la mesa de demostración (laminado y patas cromadas), la impresora con su papel continuo y los dos ordenadores beis
  rect(140, 128, 236, 131, BT.lam); rect(140, 128, 236, 128, BO.blanco); rect(140, 132, 236, 133, BT.lamS);
  for (const x of [144, 230]) { rect(x, 134, x + 2, 148, BT.cromo); rect(x + 2, 134, x + 2, 148, BT.aluS); rect(x - 1, 148, x + 3, 149, BT.aluS); }
  rect(146, 140, 228, 141, BT.cromo); rect(160, 133, 192, 140, BT.beis); rect(160, 133, 192, 134, BT.beisL); rect(166, 136, 186, 137, b_K); rect(164, 130, 188, 132, BO.papel); for (let x = 165; x < 188; x += 3) pset(x, 131, BO.papelS);
  for (let k = 0; k < 3; k++) rect(200 + k, 136 - k * 2, 222 + k, 140 - k * 2, k % 2 ? BO.papelS : BO.papel);
  // A: la de teclado integrado con el monitor encima
  rect(150, 119, 186, 127, BT.beisS); rect(150, 118, 186, 125, BT.beis); rect(150, 118, 186, 118, BT.beisL); for (let j = 0; j < 2; j++) for (let i = 0; i < 15; i++) rect(152 + i * 2 + j, 120 + j * 2, 152 + i * 2 + j, 120 + j * 2, BT.tecla); rect(158, 124, 176, 124, BT.tecla);
  rect(154, 95, 182, 117, BT.beisS); rect(154, 95, 181, 116, BT.beis); rect(154, 95, 181, 95, BT.beisL); rect(156, 97, 179, 114, hex('#3a3a3a')); pset(178, 115, BO.verde);
  // B: el de sobremesa con dos disqueteras, el monitor encima y el teclado delante
  rect(194, 111, 232, 124, BT.beisS); rect(194, 111, 231, 123, BT.beis); rect(194, 111, 231, 111, BT.beisL); for (const x of [210, 221]) { rect(x, 116, x + 8, 118, b_K); rect(x + 3, 117, x + 5, 117, BT.tecla); }
  rect(198, 88, 228, 110, BT.beisS); rect(198, 88, 227, 109, BT.beis); rect(198, 88, 227, 88, BT.beisL); rect(200, 90, 225, 107, hex('#3a3a3a'));
  rect(196, 124, 230, 127, BT.beis); rect(196, 124, 230, 124, BT.beisL); for (let i = 0; i < 16; i++) pset(198 + i * 2, 125, BT.tecla); rect(204, 126, 222, 126, BT.tecla);
  rect(166, 126, 174, 127, b_K); disco(170, 125, 1.4, BO.rojo); linea(170, 125, 172, 121, b_K);
}

// las pantallas de la mesa de demostración: A alterna un vuelo (el horizonte que se inclina) y un programa de dibujo que
// pinta franjas de colores; B alterna un gráfico de barras que crece y una hoja de cálculo de casillas que parpadean
function b_pantallasTienda(R, t) {
  const { rect, pset, linea } = R;
  { const x0 = 157, y0 = 98, x1 = 178, y1 = 113, fase = Math.floor(t / 5) % 2;
    if (fase === 0) { const a = Math.sin(t * 0.8) * 0.35; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const hz = (y1 + y0) / 2 + (x - (x0 + x1) / 2) * a + Math.sin(t * 0.5) * 2; pset(x, y, y < hz ? (y < y0 + 4 ? hex('#2a4ab8') : hex('#3a6ae0')) : ((x + y + Math.floor(t * 6)) % 4 ? hex('#3aa040') : hex('#2a8030'))); }
      linea(165, 106, 170, 106, BO.blanco); pset(167, 105, BO.blanco); pset(168, 105, BO.blanco); }
    else { rect(x0, y0, x1, y1, BO.blanco); const n = Math.floor((t % 5) / 5 * 22); const COL = ['#e04a3a', '#f0a030', '#f0e040', '#4ab04a', '#3a7ad8', '#8a4ad8'].map(hex); for (let i = 0; i < n; i++) for (let y = y0 + 2; y <= y1 - 2; y++) pset(x0 + i, y, COL[Math.floor((y - y0 - 2) / 2) % 6]); rect(x0, y0, x1, y0, hex('#a8a8a8')); } }
  { const x0 = 201, y0 = 91, x1 = 224, y1 = 106, fase = Math.floor(t / 4) % 2;
    rect(x0, y0, x1, y1, hex('#0a0a1a'));
    if (fase === 0) { const g = Math.min(1, (t % 4) / 1.5); for (let k = 0; k < 6; k++) { const al = Math.round((3 + h(k, 1, 1230) * 10) * g); rect(x0 + 2 + k * 4, y1 - al, x0 + 4 + k * 4, y1 - 1, k % 2 ? hex('#ff55ff') : hex('#55ffff')); } rect(x0 + 1, y1, x1 - 1, y1, BO.blanco); }
    else { for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) { const x = x0 + 1 + i * 6, y = y0 + 1 + j * 3; rect(x, y, x + 4, y + 1, (i + j + Math.floor(t * 3)) % 7 === 0 ? hex('#ffff55') : hex('#55ffff')); } }
    if (Math.sin(t * 9) > 0.3) pset(219, 119, BO.rojo); else pset(219, 119, hex('#4a1a1a')); }
}

function b_tienda(R, t, o) {
  const V = b_capa(R, 'b_tiV', () => b_vistaCalle(R));
  const F = b_capa(R, 'b_tiF', () => b_tiendaFrente(R));
  const m = b_mascara('b_tiM', V, [[1, BT_CIELO]]);
  R.copiar(V); b_vidaCalle(R, m, t); b_encima(R, F);
  const { rect, pset, poligono, linea, disco } = R;
  // los fluorescentes (el segundo parpadea) y el foco del escaparate con su cono de luz sobre la caja
  for (const [x, falla] of [[184, false], [236, true]]) { const on = !falla || !(t % 3.7 < 0.12 || (t % 3.7 > 0.2 && t % 3.7 < 0.26) || (t % 9 > 6.5 && t % 9 < 6.7)); rect(x, 2, x + 36, 8, BT.fluorS); rect(x + 1, 3, x + 35, 7, on ? BT.fluor : hex('#c8ccc4')); for (let i = x + 3; i < x + 35; i += 4) rect(i, 3, i, 7, BT.fluorS); }
  for (const x of [40, 66]) { rect(x - 2, 14, x + 2, 15, BT.aluS); rect(x - 2, 16, x + 3, 20, b_K); rect(x - 1, 16, x + 2, 19, hex('#3a3a44')); rect(x - 1, 21, x + 3, 21, hex('#fff4c8')); }
  for (let y = 22; y <= 98; y++) { const a = 37 - (y - 22) * 0.12, b = 69 + (y - 22) * 0.12; for (let x = Math.round(a); x <= Math.round(b); x++) if (((x + y) & 1) === 0) b_tinte(R, x, y, hex('#fff6d0'), 0.2); }
  // la caja del juego al doble en su caballete, la pirámide de cajas iguales y otras cajas sin letras; el cartel de estrella
  linea(38, 98, 46, 44, BT.maderaS); linea(66, 98, 58, 44, BT.maderaS); rect(36, 92, 68, 93, BT.madera);
  PIEZAS_TS.cajaJuego(R, 52, 98, { s: 2 });
  for (let k = 0; k < 5; k++) { const ph = (t * 0.9 + k * 0.37) % 1, x = Math.round(36 + h(k, 1, 1240) * 32), y = Math.round(50 + h(k, 2, 1240) * 44); if (ph < 0.25) { pset(x, y, BO.blanco); if (ph < 0.12) { pset(x - 1, y, hex('#fff4c0')); pset(x + 1, y, hex('#fff4c0')); pset(x, y - 1, hex('#fff4c0')); pset(x, y + 1, hex('#fff4c0')); } } }
  PIEZAS_TS.cajaJuego(R, 82, 98, {}); PIEZAS_TS.cajaJuego(R, 98, 98, {}); PIEZAS_TS.cajaJuego(R, 90, 72, {});
  for (let k = 0; k < 3; k++) { rect(6, 92 - k * 5, 28, 96 - k * 5, b_CAJAS[(k * 3 + 1) % 10]); rect(6, 92 - k * 5, 28, 92 - k * 5, b_mezcla(b_CAJAS[(k * 3 + 1) % 10], BO.blanco, 0.3)); rect(8, 94 - k * 5, 20, 94 - k * 5, BO.blanco); }
  { const cx = 16, cy = 66, g = Math.sin(t * 2) * 0.08; poligono(Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2 + g, r = i % 2 ? 6 : 10; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }), BT.raya); disco(cx, cy, 4, BO.rojo); pset(cx - 1, cy - 2, BO.blanco); linea(cx, cy + 10, cx, 78, BT.aluS); }
  // el móvil del techo con una estrella que gira
  { const cx = 252, s = Math.cos(t * 1.2); linea(cx, 9, cx, 30, BT.aluS); const w = Math.max(1, Math.abs(Math.round(7 * s))); for (let j = -7; j <= 7; j++) { const an = Math.round(w * (1 - Math.abs(j) / 8)); for (let i = -an; i <= an; i++) pset(cx + i, 37 + j, s > 0 ? BT.raya : hex('#c8a020')); } pset(cx, 37, BO.rojo); }
  b_pantallasTienda(R, t);
  return { suelo: 156, sueloMostrador: 144, mostrador: [244, 135, 319, 176], escaparate: [4, 18, 98, 96], puerta: [104, 18, 128, 120], cajaJuego: [52, 98, 2], mesaDemo: [140, 128, 236, 149], pantallas: [[167, 105], [212, 98]] };
}

// las cifras pequeñas de 3 × 5 (el visor de la caja registradora)
const b_CIFRAS = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };

function b_tiendaDelante(R, t, o) {
  const { rect, pset, linea } = R;
  // el mostrador: el laminado de arriba, el frente de listones de madera y el zócalo cromado
  rect(244, 135, 319, 137, BT.lam); rect(244, 135, 319, 135, BO.blanco); rect(244, 138, 319, 140, BT.lamS);
  for (let x = 248; x <= 319; x++) { const c = (x - 248) % 6 === 0 ? BT.maderaS : (x - 248) % 6 === 1 ? BT.maderaL : BT.madera; rect(x, 141, x, 172, c); }
  for (let y = 141; y <= 172; y++) for (let x = 249; x <= 319; x++) if (h(x, y >> 1, 1250) < 0.06) pset(x, y, BT.maderaS);
  rect(246, 141, 248, 176, BT.maderaS); rect(248, 173, 319, 176, BT.cromo); rect(248, 173, 319, 173, BO.blanco); rect(246, 177, 319, 179, b_mezcla(BT.moq, b_K, 0.5));
  // la caja registradora beis con el visor verde de cifras que cambian, las teclas y el cajón
  rect(292, 118, 318, 134, BT.beisS); rect(292, 117, 317, 133, BT.beis); rect(292, 117, 317, 117, BT.beisL); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) rect(295 + i * 3, 123 + j * 3, 296 + i * 3, 124 + j * 3, (i + j) % 4 === 0 ? BO.rojo : BT.tecla);
  rect(300, 109, 316, 116, BT.beisS); rect(301, 110, 315, 115, hex('#0a1a12'));
  const v = [3995, 2495, 1999, 4995][Math.floor(t / 2.5) % 4].toString().padStart(4, '0');
  for (let k = 0; k < 4; k++) b_CIFRAS[v[k]].forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') pset(302 + k * 3 + (k > 1 ? 1 : 0) + i, 110 + j, hex('#5aff8a')); });
  pset(308, 114, hex('#5aff8a')); rect(290, 134, 319, 135, BT.beisS);
  // las bolsas de papel, la bandeja de disquetes y la campanilla del mostrador
  rect(248, 126, 262, 134, hex('#c8a06a')); rect(248, 126, 262, 126, hex('#dcb880')); rect(261, 127, 262, 134, hex('#8a6a3a')); for (let x = 250; x < 261; x += 3) pset(x, 130, hex('#8a6a3a'));
  rect(264, 130, 272, 134, hex('#3a3a44')); for (let k = 0; k < 3; k++) rect(265 + k * 2, 126 + k, 266 + k * 2, 130, k % 2 ? hex('#f0d890') : BO.papel);
  R.disco(288, 132, 2.5, BO.laton); R.pset(288, 129, BO.latonL); rect(285, 134, 291, 134, BO.latonS);
  return {};
}

// trama de Bayer 4×4 (0–1) para los degradados, las luces y las sombras tramadas de Moscú
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores: a = 0 deja c, a = 1 da d
const c_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// los fondos fijos de Moscú: se pintan una vez en un búfer de R.nuevo() y se reutilizan
const c_CAPAS = new Map();

function c_capa(R, clave, dibuja) { let b = c_CAPAS.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); c_CAPAS.set(clave, b); } return b; }

// pega un búfer por encima de lo que hay, solo donde tiene algo pintado (lo vacío deja ver el cielo y lo que se mueve detrás)
function c_pegar(R, b, y0 = 0, y1 = 179) { const d = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const v = b[i]; if (v) d[i] = v; } }

// degradado tramado de arriba abajo entre varios colores
function c_degr(R, x0, y0, x1, y1, cols, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const v0 = ((y - y0) / alto) ** curva * n; for (let x = x0; x <= x1; x++) { let l = Math.floor(v0); if (v0 - l > c_b4(x, y)) l++; R.pset(x, y, cols[Math.min(n, l)]); } }
}

// aclara (o tiñe) una elipse hacia el color col, con el borde tramado: la luz de una farola, de un aplique, de una ventana
function c_aclara(R, cx, cy, rx, ry, col, a = 0.5) {
  for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
    const d = ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2; if (d >= 1) continue; const g = 1 - d;
    if (g * a * 1.7 > c_b4(x, y)) R.pset(x, y, c_mez(R.pget(x, y), col, Math.min(0.8, 0.12 + g * a))); }
}

// nube de nieve de noche, encendida por debajo por la luz de la ciudad: c = [arriba, cuerpo, luz, filo]; (cx, cy) es el
// centro de su base, w el ancho y k la semilla de su forma
function c_nubeN(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 1) ? c[0] : c[1]);
}

// la nieve que cae dentro de [x0, y0, x1, y1]: n copos de semilla k, velocidad v (px/s), con el vaivén del aire; gordo:
// copos de 2 px
function c_nieva(R, t, k, n, v, col, x0 = 0, y0 = 0, x1 = 319, y1 = 179, gordo = false) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1;
  for (let i = 0; i < n; i++) { const vi = v * (0.75 + h(i, 3, k) * 0.5), y = y0 + ((h(i, 2, k) * H + t * vi) % H), x = x0 + ((((h(i, 1, k) * W + t * v * 0.35 + Math.sin(t * 1.3 + i * 1.7) * 3) % W) + W) % W);
    const px = Math.round(x), py = Math.round(y); R.pset(px, py, col); if (gordo) { R.pset(px + 1, py, col); R.pset(px, py + 1, col); R.pset(px + 1, py + 1, c_mez(col, hex('#8a96b8'), 0.4)); } }
}

const c_NIEVE = hex('#e8eef8'), c_NIEVES = hex('#b4c0da'), c_NIEVEO = hex('#8a96b8');

const c_NOCHE = ['#0a0e24', '#0e1434', '#141a40', '#1c2048', '#262650', '#322c58', '#40345e', '#523c62', '#644466'].map(hex);

const c_NUBEL = [hex('#161a3c'), hex('#1e2246'), hex('#2c2c54'), hex('#3c3660')];

const c_NUBEM = [hex('#20244a'), hex('#2a2c56'), hex('#3e3866'), hex('#5a4a74')];

// una figurita lejana con abrigo (6 px): gorro de piel con su nieve, la cara, el abrigo y las piernas (que andan con anda)
function c_figurita(R, x, y, t, abrigo, anda = false, k = 0) {
  const p = anda ? Math.floor(t * 4 + k) % 2 : 0;
  R.pset(x, y - 6, c_NIEVES); R.rect(x - 1, y - 5, x + 1, y - 5, hex('#3a2a22')); R.pset(x, y - 4, hex('#d8a088'));
  R.rect(x - 1, y - 3, x + 1, y - 1, abrigo); R.pset(x + 1, y - 2, c_mez(abrigo, hex('#000000'), 0.4));
  R.pset(x - 1 + p, y, hex('#141420')); R.pset(x + 1 - p, y, hex('#141420'));
}

// una figura del término medio (11 px) con abrigo largo: gorro de piel, cara, bufanda, brazos que se mecen al andar y la
// sombra azul en la nieve; dir 1 / −1
function c_figura(R, x, y, t, abrigo, o = {}) {
  const { rect, pset } = R, dir = o.dir ?? 1, p = o.anda ? Math.floor(t * 4 + (o.k ?? 0)) % 2 : 0, osc = c_mez(abrigo, hex('#000000'), 0.4), luz = c_mez(abrigo, hex('#ffffff'), 0.25);
  rect(x - 3, y + 1, x + 3, y + 1, c_mez(R.pget(x, y + 1), hex('#3a4068'), 0.5));
  rect(x - 2, y - 11, x + 2, y - 10, o.gorro ?? hex('#4a3426')); rect(x - 1, y - 12, x + 1, y - 12, c_NIEVE); pset(x - 2, y - 9, o.gorro ?? hex('#4a3426')); pset(x + 2, y - 9, o.gorro ?? hex('#4a3426'));
  rect(x - 1, y - 9, x + 1, y - 8, hex('#e0aa8c')); pset(x + dir, y - 9, hex('#1a1418'));
  rect(x - 2, y - 7, x + 2, y - 7, o.bufanda ?? hex('#a83a34'));
  rect(x - 2, y - 6, x + 2, y - 2, abrigo); rect(x - 2, y - 6, x - 2, y - 2, luz); rect(x + 2, y - 6, x + 2, y - 2, osc); rect(x - 2, y - 1, x + 2, y - 1, osc);
  pset(x - 3 + (p ? 0 : 0), y - 5 + p, osc); pset(x + 3, y - 5 + (1 - p), osc); pset(x - 3, y - 4 + p, hex('#2a1e1a')); pset(x + 3, y - 4 + (1 - p), hex('#2a1e1a'));
  pset(x - 1 - p, y, hex('#141420')); pset(x + 1 + p - (p ? 1 : 0), y, hex('#141420')); pset(x + 1, y, hex('#141420'));
  if (o.maleta) { rect(x + dir * 4 - 1, y - 4, x + dir * 4 + 1, y - 1, hex('#6a4a2a')); pset(x + dir * 4, y - 5, hex('#2a1a10')); }
}

// el cielo de noche de Moscú, fijo: el degradado tramado (más claro abajo por la luz de la ciudad) y estrellas tenues
function c_cieloNoche(R) {
  c_degr(R, 0, 0, 319, 179, c_NOCHE, 1.15);
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 260) * 319), y = Math.round(2 + h(k, 2, 260) * 58); if (x > 272 && y < 48) continue; R.pset(x, y, h(k, 3, 260) < 0.3 ? hex('#8a8ab8') : hex('#4a4a7a')); }
}

// una cúpula de cebolla de base (cx, base), ancho w y alto hgt: pal = [color 1, su sombra, color 2, su sombra]; tipo 0
// espiral, 1 gajos, 2 zigzag, 3 escamas; con la nieve en los hombros, el contorno, su brillo y la aguja dorada
function c_cebolla(R, cx, base, w, hgt, pal, tipo = 0) {
  const r0 = w / 2, rad = (u) => u < 0.36 ? r0 * (0.74 + 0.26 * Math.sin(u / 0.36 * Math.PI / 2)) : r0 * Math.pow(Math.max(0, Math.cos((u - 0.36) / 0.64 * Math.PI / 2)), 1.3);
  for (let j = 0; j <= hgt; j++) { const y = base - j, u = j / hgt, r = rad(u), ru = rad(Math.min(1, (j + 1) / hgt));
    for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x++) { const i = x + 0.5 - cx; if (Math.abs(i) > r) continue;
      const a = i / Math.max(0.6, r); let c;
      if (Math.abs(i) > r - 1 || j === 0) c = hex('#1a0e1a');
      else if (Math.abs(i) > ru - 0.3 && u > 0.4) c = h(x, y, 280) < 0.75 ? c_NIEVE : c_NIEVES;
      else { const b = tipo === 0 ? Math.floor(a * 2.4 + u * 5 + 10) % 2 : tipo === 1 ? Math.floor(a * 3.2 + 10) % 2 : tipo === 2 ? Math.floor(a * 3 + 10 + (Math.floor(u * 7) % 2) * 0.5 + Math.abs((u * 7) % 1 - 0.5)) % 2 : ((Math.floor(u * 6) + Math.floor(a * 3 + (Math.floor(u * 6) % 2) * 0.5 + 10)) % 2);
        const luz = 1 - Math.abs(a + 0.3) * 0.85 - u * 0.25; c = pal[b * 2 + (luz < c_b4(x, y) * 0.55 + 0.18 ? 1 : 0)]; }
      R.pset(x, y, c); } }
  R.pset(Math.round(cx - r0 * 0.4), Math.round(base - hgt * 0.32), hex('#fff4e0')); R.pset(Math.round(cx - r0 * 0.4), Math.round(base - hgt * 0.32) + 1, c_mez(pal[0], hex('#ffffff'), 0.5));
  R.rect(cx, base - hgt - 4, cx, base - hgt, hex('#c89838')); R.pset(cx, base - hgt - 2, hex('#f8d870')); R.pset(cx, base - hgt - 5, hex('#f8e8a0'));
}

// el tambor de una cúpula: cilindro de ladrillo rojo con pilastras blancas, ventanitas en arco y la corona de
// kokóshniks; de top a bottom, ancho w
function c_tambor(R, cx, top, bottom, w) {
  const { rect, pset } = R, x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2);
  for (let y = top; y <= bottom; y++) for (let x = x0; x <= x1; x++) { const a = (x - cx) / (w / 2); R.pset(x, y, Math.abs(a + 0.2) > 0.75 - c_b4(x, y) * 0.2 ? hex('#7a2420') : (y - top) % 3 === 2 && h(x, y, 281) < 0.5 ? hex('#8a2a24') : hex('#a83a2e')); }
  for (const f of [-0.75, 0, 0.75]) rect(Math.round(cx + f * w / 2), top + 2, Math.round(cx + f * w / 2), bottom, f > 0.5 ? hex('#a8a090') : hex('#e0d8c8'));
  for (const f of [-0.4, 0.4]) { const x = Math.round(cx + f * w / 2); rect(x, top + 4, x, bottom - 2, hex('#1a1018')); pset(x, top + 3, hex('#3a2a2a')); if (f < 0) pset(x, top + 6, hex('#6a4a2a')); }
  rect(x0, top, x1, top, hex('#e8e0d0')); for (let x = x0; x <= x1; x += 3) pset(x + 1, top - 1, hex('#d8d0c0'));
  rect(x0, top - 1, x1, top - 1, c_NIEVES); rect(x0, bottom, x1, bottom, hex('#e0d8c8'));
}

// un abeto azul de los del pie de la muralla, con la nieve en cada piso (x, base, alto)
function c_abeto(R, x, base, alto) {
  R.rect(x, base - 2, x, base, hex('#2a1a14'));
  for (let j = 0; j < alto; j++) { const y = base - 2 - j, u = j / alto, piso = (j % 5) / 5, w = Math.round((1 - u) * alto * 0.38 * (0.7 + piso * 0.5));
    for (let i = -w; i <= w; i++) R.pset(x + i, y, (j % 5 === 4 && Math.abs(i) < w) ? (h(x + i, y, 282) < 0.7 ? c_NIEVE : c_NIEVES) : i < -w * 0.3 ? hex('#2e5058') : i > w * 0.4 ? hex('#162a32') : hex('#1e3a44')); }
  R.pset(x, base - 2 - alto, c_NIEVE);
}

// una farola de la plaza (el poste, la base de fundición y la cruceta de tres globos con su nieve); los globos
// encendidos y su halo los pinta c_farolaLuz
function c_farola(R, x, base, alto) {
  const { rect, pset } = R, top = base - alto, F = hex('#161824'), FL = hex('#3a3e54');
  rect(x - 3, base - 6, x + 3, base, F); rect(x - 2, base - 6, x - 2, base - 1, FL); rect(x - 4, base, x + 4, base, F); rect(x - 2, base - 9, x + 2, base - 7, F);
  rect(x, top + 6, x + 1, base - 9, F); rect(x, top + 6, x, base - 9, FL); for (let y = top + 16; y < base - 10; y += 14) rect(x - 1, y, x + 2, y, F);
  rect(x - 7, top + 6, x + 8, top + 6, F); pset(x - 7, top + 5, F); pset(x + 8, top + 5, F); rect(x - 6, top + 5, x + 7, top + 5, c_NIEVES);
  rect(base - alto > 0 ? x - 7 : x, top + 7, x - 7, top + 8, F); rect(x + 8, top + 7, x + 8, top + 8, F); rect(x, top + 1, x + 1, top + 5, F);
}

// los tres globos encendidos de una farola, el halo tramado en el aire y el centelleo de la nieve que lo cruza
function c_farolaLuz(R, x, base, alto, t, k = 0) {
  const top = base - alto, fl = 0.5 + 0.06 * Math.sin(t * 9 + k) + (Math.sin(t * 23 + k * 3) > 0.97 ? -0.15 : 0);
  c_aclara(R, x + 0.5, top + 4, 26, 22, hex('#c8a878'), fl * 0.55);
  for (const [gx, gy] of [[x - 7, top + 11], [x + 8, top + 11], [x + 0.5, top - 1]]) { R.disco(Math.round(gx), gy, 2, hex('#fff2c8')); R.pset(Math.round(gx) - 1, gy - 1, hex('#ffffff')); R.rect(Math.round(gx) - 1, gy - 3, Math.round(gx) + 1, gy - 3, c_NIEVE); R.pset(Math.round(gx), gy + 2, hex('#e0b878')); }
}

// lo fijo de la plaza (búfer con el cielo vacío): la ciudad lejana, la muralla, las torres, la catedral, los almacenes,
// los abetos, la plaza nevada con las sendas y las huellas, los montones de nieve y los postes de las farolas
function c_plazaFija(R) {
  const { rect, pset, poligono, linea, disco } = R;
  const RJ = [hex('#4a1014'), hex('#6e1c1c'), hex('#8c2824'), hex('#a8382e'), hex('#bf4e3a'), hex('#d2684a')];
  const BL = hex('#e4dccc'), BLS = hex('#a8a094');
  // la ciudad lejana, a contraluz, con alguna ventana encendida, y una torre alta de pisos escalonados entre la muralla y la catedral
  for (let x = 0, k = 0; x < 320; k++) { const w = 9 + Math.floor(h(k, 1, 270) * 15), top = 91 + Math.floor(h(k, 2, 270) * 9);
    rect(x, top, x + w - 1, 108, hex('#1a1a3a')); rect(x, top, x + w - 1, top, hex('#2a2a4e')); for (let wy = top + 2; wy < 106; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (h(wx, wy, 271) < 0.13) pset(wx, wy, h(wx, wy, 272) < 0.5 ? hex('#a08050') : hex('#7a7aa0')); x += w; }
  for (const [a, b, top] of [[152, 170, 72], [155, 167, 64], [158, 164, 56], [160, 162, 50]]) rect(a, top, b, 108, hex('#20203e'));
  rect(161, 44, 161, 50, hex('#20203e')); for (let y = 58; y < 104; y += 3) for (let x = 153; x < 170; x += 2) if (h(x, y, 273) < 0.18 && y > 66 - (x > 156 && x < 166 ? 8 : 0)) pset(x, y, hex('#9a8058'));
  // la muralla: ladrillo iluminado desde abajo por los focos, hiladas y juntas, el adarve con nieve y los merlones de cola de golondrina
  for (let y = 84; y <= 109; y++) for (let x = 0; x <= 158; x++) { const v = 1 + (y - 84) / 25 * 3.2 + (h(x >> 2, y >> 1, 274) - 0.5) * 0.5; let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; l = Math.max(1, Math.min(5, l));
    const fila = Math.floor((y - 84) / 3); pset(x, y, ((y - 84) % 3 === 2 || (x + fila * 4) % 8 === 0) && h(x, y, 275) < 0.75 ? RJ[l - 1] : RJ[l]); }
  rect(0, 86, 158, 87, RJ[1]); for (let x = 2; x < 158; x += 6) { pset(x, 88, RJ[0]); pset(x + 1, 88, RJ[0]); pset(x + 2, 88, RJ[0]); pset(x + 1, 89, RJ[0]); }
  rect(0, 84, 158, 84, c_NIEVES); rect(0, 85, 158, 85, RJ[2]);
  for (let x0 = 1; x0 < 156; x0 += 8) { rect(x0, 78, x0 + 4, 83, RJ[2]); rect(x0, 78, x0, 83, RJ[3]); rect(x0 + 4, 78, x0 + 4, 83, RJ[1]); pset(x0 + 2, 81, RJ[0]); pset(x0 + 2, 82, RJ[0]);
    rect(x0 + 2, 78, x0 + 2, 79, 0); pset(x0, 77, c_NIEVE); pset(x0 + 1, 77, c_NIEVES); pset(x0 + 3, 77, c_NIEVE); pset(x0 + 4, 77, c_NIEVES); pset(x0 + 2, 80, c_NIEVES); }
  // la torre pequeña del borde (chapitel verde)
  for (let y = 66; y <= 109; y++) for (let x = 3; x <= 17; x++) pset(x, y, x > 13 ? RJ[1] : (y % 3 === 0 && h(x, y, 276) < 0.5) ? RJ[2] : RJ[3]);
  rect(2, 66, 18, 67, BL); rect(2, 80, 18, 80, BLS); rect(7, 84, 11, 96, hex('#1a1016')); pset(9, 83, hex('#1a1016')); rect(8, 70, 10, 76, hex('#1a1016'));
  for (let j = 0; j < 26; j++) { const y = 65 - j, w = Math.round((1 - j / 26) * 8); for (let i = -w; i <= w; i++) pset(10 + i, y, i < -w * 0.2 ? hex('#3a8a5a') : i > w * 0.5 ? hex('#16402a') : (j % 3 === 0 ? hex('#1e5a3a') : hex('#2a6a48'))); if (j % 6 === 5) pset(10 - w, y, c_NIEVE); }
  // la torre del reloj (centro tx; todo baja dy para dejar tranquila la barra del año): cuerpo con molduras blancas y
  // arcos ciegos, la puerta con luz, la esfera, el campanario, el chapitel verde
  const tx = 100, X = (v) => v - 62 + tx, dy = 6, Y = (v) => v + dy;
  for (let y = Y(58); y <= 109; y++) for (let x = X(48); x <= X(76); x++) { const a = Math.abs(x - tx + 3) / 16, v = 1.5 + (y - Y(58)) / 45 * 2.6 - a * 1.4; let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; l = Math.max(0, Math.min(5, l)); pset(x, y, (y % 3 === 0 && (x + y) % 7 && h(x, y, 277) < 0.6) ? RJ[Math.max(0, l - 1)] : RJ[l]); }
  rect(X(47), Y(57), X(77), Y(58), BL); rect(X(47), Y(59), X(77), Y(59), BLS); rect(X(47), Y(71), X(77), Y(72), BL); rect(X(48), Y(73), X(77), Y(73), BLS);
  for (const ax of [51, 59, 67]) { const a = X(ax); rect(a, Y(77), a, Y(87), BL); rect(a + 6, Y(77), a + 6, Y(87), BLS); rect(a + 1, Y(76), a + 5, Y(76), BL); pset(a + 3, Y(75), BL); rect(a + 1, Y(77), a + 5, Y(87), RJ[1]); rect(a + 2, Y(80), a + 4, Y(86), hex('#2a1018')); pset(a + 3, Y(79), hex('#2a1018')); }
  rect(X(55), 95, X(69), 109, BL); rect(X(56), 96, X(68), 109, hex('#1a0e12')); for (let i = 0; i < 4; i++) rect(X(57) + i, 96 - i + 3, X(67) - i, 96 - i + 3, BL);
  for (let y = 100; y <= 109; y++) for (let x = X(57); x <= X(67); x++) if ((y - 98) / 11 > c_b4(x, y) + 0.1) pset(x, y, y > 105 ? hex('#c88a48') : hex('#7a4a2a')); rect(X(60), 97, X(64), 99, hex('#c8a040'));
  for (const px of [X(48), X(76)]) { rect(px - 1, Y(50), px + 1, Y(57), BL); pset(px, Y(49), c_NIEVE); pset(px, Y(48), BL); }
  for (let y = Y(44); y <= Y(56); y++) for (let x = X(52); x <= X(72); x++) pset(x, y, x > X(68) ? RJ[2] : (y % 3 === 0 && h(x, y, 278) < 0.5) ? RJ[3] : RJ[4]);
  rect(X(51), Y(43), X(73), Y(43), BL); rect(X(51), Y(42), X(73), Y(42), c_NIEVES); disco(tx, Y(50), 6, hex('#c89838')); disco(tx, Y(50), 5, hex('#141826'));
  for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; pset(Math.round(tx + Math.cos(an) * 4), Math.round(Y(50) + Math.sin(an) * 4), k % 3 ? hex('#a88030') : hex('#f0c860')); }
  for (let y = Y(35); y <= Y(41); y++) for (let x = X(54); x <= X(70); x++) pset(x, y, x > X(67) ? BLS : BL);
  for (const ax of [56, 61, 66]) { rect(X(ax), Y(36), X(ax) + 2, Y(41), hex('#1a1424')); pset(X(ax) + 1, Y(35), hex('#1a1424')); } rect(X(54), Y(34), X(70), Y(34), c_NIEVES);
  for (let y = Y(30); y <= Y(33); y++) for (let x = X(56); x <= X(68); x++) pset(x, y, x > X(65) ? RJ[2] : RJ[4]); rect(X(55), Y(29), X(69), Y(29), BL);
  for (let j = 0; j < 9; j++) { const y = Y(28) - j, w = Math.round((1 - j / 9) * 6.5); for (let i = -w; i <= w; i++) pset(tx + i, y, i < -w * 0.25 ? hex('#3a8a5a') : i > w * 0.45 ? hex('#16402a') : ((i + j) % 3 === 0 ? hex('#1e5a3a') : hex('#2a6a48'))); if (j % 3 === 1) { pset(tx - w, y, c_NIEVE); pset(tx + w, y, c_NIEVES); } }
  rect(tx, Y(18), tx, Y(20), hex('#c89838'));
  // la cadena baja con sus postes que separa la plaza de la muralla
  for (let x = 4; x < 160; x += 12) { rect(x, 112, x + 1, 117, hex('#1a1c28')); pset(x, 111, c_NIEVE); pset(x + 1, 111, c_NIEVE); for (let i = 2; i < 12; i++) pset(x + i, 113 + Math.round(Math.sin(i / 12 * Math.PI) * 2), hex('#3a3e54')); }
  // la torre redonda del otro extremo de la muralla, con su matacán y el chapitel de teja
  for (let y = 70; y <= 109; y++) for (let x = 146; x <= 162; x++) { const a = (x - 153) / 8.5, v = 4 - Math.abs(a + 0.15) * 3.4 + (y - 70) / 40; let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; pset(x, y, (y % 3 === 0 && h(x, y, 279) < 0.5) ? RJ[Math.max(0, Math.min(5, l) - 1)] : RJ[Math.max(0, Math.min(5, l))]); }
  rect(145, 74, 163, 77, RJ[2]); for (let x = 146; x < 163; x += 3) rect(x, 78, x + 1, 79, RJ[1]); rect(145, 73, 163, 73, c_NIEVES); for (const wy of [84, 96]) rect(152, wy, 154, wy + 4, hex('#1a1016'));
  for (let j = 0; j < 20; j++) { const y = 72 - j, w = Math.round((1 - j / 20) * 9); for (let i = -w; i <= w; i++) pset(154 + i, y, i < -w * 0.3 ? RJ[3] : i > w * 0.4 ? RJ[0] : (j % 2 ? RJ[1] : RJ[2])); if (j % 4 === 2) pset(154 - w, y, c_NIEVE); }
  rect(154, 49, 154, 52, hex('#c89838'));
  // la catedral: el zócalo con su galería y la escalera, el cuerpo de ladrillo con arcos blancos y la fila de kokóshniks
  for (let y = 94; y <= 110; y++) for (let x = 166; x <= 274; x++) pset(x, y, (y - 94) % 4 === 3 && h(x, y, 283) < 0.6 ? RJ[1] : x > 268 ? RJ[1] : RJ[(x + y) % 9 === 0 ? 2 : 3]);
  rect(166, 94, 274, 95, BL); for (let ax = 170; ax < 270; ax += 9) { rect(ax, 99, ax + 5, 108, BL); rect(ax + 1, 100, ax + 4, 108, hex('#1e1018')); pset(ax + 1, 100, BL); pset(ax + 4, 100, BL); if (ax % 2) rect(ax + 2, 104, ax + 3, 108, hex('#6a3a24')); }
  for (let k = 0; k < 9; k++) { const y = 110 - k, x = 160 + k; rect(x, y, x + 6, y, k % 2 ? BLS : BL); pset(x, y - 1, c_NIEVE); }
  for (let y = 72; y <= 93; y++) for (let x = 172; x <= 266; x++) pset(x, y, ((y - 72) % 3 === 2 && h(x, y, 284) < 0.55) ? RJ[2] : x > 260 ? RJ[2] : RJ[4 - ((x + y) % 11 === 0 ? 1 : 0)]);
  for (let ax = 176; ax < 262; ax += 12) { rect(ax, 80, ax + 4, 90, BL); rect(ax + 1, 81, ax + 3, 90, hex('#1a1018')); pset(ax + 2, 79, BL); if ((ax / 12) % 2 < 1) rect(ax + 1, 86, ax + 3, 90, hex('#8a5a2a')); }
  rect(172, 92, 266, 93, BLS); for (let x = 172; x < 266; x += 8) { for (let k = 0; k < 7; k++) { const an = Math.PI + k / 6 * Math.PI; pset(Math.round(x + 4 + Math.cos(an) * 4), Math.round(73 + Math.sin(an) * 3), BL); } pset(x + 4, 69, c_NIEVE); }
  rect(252, 84, 274, 94, RJ[3]); rect(252, 83, 274, 83, BL); rect(252, 82, 274, 82, c_NIEVES);
  // el chapitel central: la tienda ochavada con su celosía de rombos, el tamborcillo y la cebollita dorada
  for (let j = 0; j < 38; j++) { const y = 72 - j, w = Math.round(11 - j * 0.24); for (let i = -w; i <= w; i++) { const d = (i + 40 + (j % 4 < 2 ? 0 : 2)) % 4 === 0 && j % 2 === 0; pset(210 + i, y, i > w - 3 ? hex('#7a5024') : i < -w + 2 ? hex('#e0b060') : d ? hex('#f0e8d0') : (j % 6 < 3 ? hex('#c89048') : hex('#3a7a4a'))); } if (j % 5 === 4) { pset(210 - w, y, c_NIEVE); pset(210 - w + 1, y, c_NIEVES); } }
  rect(206, 32, 214, 34, BL); rect(207, 30, 213, 31, RJ[3]); c_cebolla(R, 210, 30, 8, 9, [hex('#f0c860'), hex('#a87828'), hex('#e0b048'), hex('#8a6020')], 1);
  // los tambores y las cebollas de colores
  const DOMOS = [[180, 70, 14, 16, 79, [hex('#d8483a'), hex('#8a2420'), hex('#3a9a5a'), hex('#1e5a3a')], 0], [194, 56, 17, 19, 74, [hex('#4a7ad8'), hex('#24407a'), hex('#e8ecf0'), hex('#9aa4b8')], 0],
    [228, 54, 17, 19, 74, [hex('#3aa860'), hex('#1a5a34'), hex('#f0c848'), hex('#a07820')], 2], [244, 66, 15, 17, 78, [hex('#e04a3a'), hex('#8a2420'), hex('#f0ece0'), hex('#a8a090')], 1], [262, 76, 12, 13, 84, [hex('#e8b848'), hex('#9a7020'), hex('#3a8a5a'), hex('#1e5a3a')], 3]];
  for (const [cx, b, w, hg, fondo] of DOMOS) c_tambor(R, cx, b + 1, fondo, Math.round(w * 0.7));
  for (const [cx, b, w, hg, , pal, tipo] of DOMOS) c_cebolla(R, cx, b, w, hg, pal, tipo);
  // el campanario de la derecha (bajo, para dejar tranquila la esquina de Atom)
  rect(268, 60, 275, 84, BL); rect(269, 64, 274, 70, hex('#1a1424')); rect(270, 66, 273, 68, hex('#8a6a3a')); rect(267, 59, 276, 59, c_NIEVES); for (let j = 0; j < 6; j++) rect(271 - Math.round((6 - j) / 2), 58 - j, 272 + Math.round((6 - j) / 2), 58 - j, hex('#2a6a48'));
  // los almacenes del borde derecho: fachada de piedra clara, arcos con escaparates encendidos, torrecillas y el tejado nevado
  for (let y = 64; y <= 110; y++) for (let x = 277; x <= 319; x++) pset(x, y, (y - 64) % 4 === 3 && h(x, y, 285) < 0.5 ? hex('#7a6a64') : x < 279 ? hex('#5a4a4a') : hex('#9a8478'));
  rect(277, 62, 319, 63, c_NIEVE); rect(277, 64, 319, 65, hex('#b8a08c')); for (const px of [286, 310]) { rect(px - 3, 52, px + 3, 61, hex('#9a8478')); rect(px - 2, 50, px + 2, 51, c_NIEVE); rect(px - 1, 55, px + 1, 59, hex('#e8b860')); pset(px, 48, hex('#3a8a5a')); pset(px, 49, hex('#3a8a5a')); }
  for (const [ry, alto] of [[70, 13], [89, 18]]) for (let ax = 281; ax < 318; ax += 9) { rect(ax, ry, ax + 6, ry + alto, hex('#5a4038')); rect(ax + 1, ry + 2, ax + 5, ry + alto, hex('#e8b860')); rect(ax + 1, ry + 2, ax + 5, ry + 3, hex('#f8d890')); pset(ax + 1, ry + 1, hex('#5a4038')); rect(ax + 3, ry + 2, ax + 3, ry + alto, hex('#8a6038'));
    if (ry > 80) for (let i = 0; i < 4; i++) pset(ax + 1 + i + (i > 1 ? 1 : 0), ry + alto - 2 - (i % 2), [hex('#c84a3a'), hex('#3a6ac8'), hex('#f0f0e0'), hex('#3a9a5a')][(ax + i) % 4]); rect(ax, ry + alto + 1, ax + 6, ry + alto + 1, c_NIEVES); }
  // la plaza: nieve azulada de noche con ondas del viento, la senda pisada en diagonal y la del muro, donde asoma el adoquín
  for (let y = 109; y <= 179; y++) { const p = (y - 109) / 70, base = c_mez(hex('#646e98'), hex('#a2acca'), p), som = c_mez(hex('#545c88'), hex('#8890b8'), p), luz = c_mez(hex('#8a94bc'), hex('#ccd4ea'), p);
    const xs = 150 - (y - 109) * 1.55, ancho = 3 + p * 15, fila = Math.max(1, Math.round(1 + p * 3));
    for (let x = 0; x <= 319; x++) { let c = base; const ola = Math.sin(x * 0.04 + y * 0.5 + Math.sin(x * 0.013) * 3 + h(x >> 4, y >> 2, 291) * 2.4);
      if (ola > 0.75) c = luz; else if (ola < -0.8 && c_b4(x, y) < 0.5) c = som;
      const enSenda = Math.abs(x - xs) < ancho + (h(x >> 2, y, 286) - 0.5) * 4 || (y >= 112 && y <= 115 + (x < 160 ? 0 : 0) && x < 170 && h(x >> 1, y, 287) < 0.8) || (y > 150 && Math.abs(x - (292 - (y - 150) * 3.4)) < 2 + p * 7 + (h(x >> 2, y, 292) - 0.5) * 3);
      if (enSenda) { const fy = (y - 109) % (fila + 1) === 0, fx = (x + Math.floor((y - 109) / (fila + 1)) * 3) % (fila * 2 + 2) === 0;
        c = fy || fx ? c_mez(base, hex('#3a3e60'), 0.55) : h(x, y, 288) < 0.55 ? c_mez(base, hex('#5a6080'), 0.35) : c_mez(base, hex('#8a90b0'), 0.2); }
      if (h(x, y, 289) < 0.008 + p * 0.006) c = hex('#ffffff');
      pset(x, y, c); } }
  // los charcos de luz de las farolas y los montones de nieve al pie de la muralla, de la catedral y en las esquinas
  for (const [x, y, rx] of [[30, 168, 34], [292, 156, 30]]) c_aclara(R, x, y, rx, rx * 0.22, hex('#f0d8b0'), 0.55);
  for (let x = 0; x <= 274; x++) { const a = Math.round(2 + Math.sin(x * 0.2) * 1.2 + h(x >> 2, 1, 290) * 2); rect(x, 110 - a, x, 110, x > 164 ? c_NIEVES : c_NIEVE); pset(x, 110 - a, hex('#f4f8ff')); }
  for (const [cx, cy, rx, ry] of [[14, 180, 40, 13], [300, 179, 36, 15], [244, 128, 14, 4]]) for (let y = cy - ry; y <= cy; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1) pset(x, y, d > 0.82 && y < cy - ry * 0.5 ? hex('#f4f8ff') : (x - cx) / rx > 0.3 + c_b4(x, y) * 0.3 ? c_NIEVES : c_NIEVE); }
  // las huellas que cruzan la senda
  for (let k = 0; k < 14; k++) { const y = 113 + k * 4.6, x = 150 - (y - 109) * 1.55 + (k % 2 ? 3 : -3) * (1 + (y - 109) / 50); rect(Math.round(x), Math.round(y), Math.round(x + 1 + k / 7), Math.round(y), hex('#4a5078')); }
  // las rodadas de la barredora y la franja que ha limpiado, y las huellas sueltas de quien pasó antes
  for (let x = 150; x <= 319; x++) { const y = Math.round(118 + Math.sin(x * 0.025) * 1.5); for (const dy of [0, 4]) if (h(x, dy, 293) < 0.85) pset(x, y + dy, hex('#4a5078')); if (c_b4(x, y + 2) < 0.4) pset(x, y + 2, hex('#7a84aa')); }
  for (let k = 0; k < 10; k++) { const x = Math.round(196 + k * 7 + Math.sin(k) * 3), y = Math.round(140 + k * 2.6); pset(x, y, hex('#545a84')); pset(x + 1, y, hex('#545a84')); pset(x + 3, y + 1, hex('#545a84')); }
  // los abetos al pie de la muralla y los postes de las farolas
  for (const [x, a] of [[40, 22], [60, 26], [134, 22], [24, 16]]) c_abeto(R, x, 110, a);
  c_farola(R, 30, 168, 74); c_farola(R, 292, 156, 64);
}

// la Plaza Roja nevada de noche (ver la cabecera de moscu)
function c_plaza(R, t, o) {
  const { rect, pset, disco, linea } = R;
  R.copiar(c_capa(R, 'mz-cielo', () => c_cieloNoche(R)));
  for (let k = 0; k < 7; k++) if (Math.sin(t * (1.1 + k * 0.4) + k * 2) > 0.6) pset(Math.round(30 + h(k, 7, 261) * 230), Math.round(20 + h(k, 8, 261) * 30), hex('#c8c8ec'));
  // la luna, que asoma entre las nubes
  c_aclara(R, 240, 28, 24, 20, hex('#4e4e80'), 0.55); disco(240, 28, 6, hex('#e6e2cc')); disco(239, 27, 4, hex('#f4f2e4')); pset(242, 30, hex('#c4c0aa')); pset(243, 27, hex('#ccc8b2')); pset(238, 31, hex('#ccc8b2')); pset(237, 25, hex('#ffffff'));
  // las nubes de nieve: la capa lejana despacio, la media y los jirones bajos más deprisa
  for (let k = 0; k < 4; k++) { const w = 46 + (k % 3) * 14, x = ((k * 113 + t * 1.3) % 440) - 60; c_nubeN(R, x, 24 + (k % 2) * 9, w, k, c_NUBEL); }
  for (let k = 0; k < 3; k++) { const w = 58 + k * 10, x = ((k * 151 + 40 + t * 2.8) % 460) - 70; c_nubeN(R, x, 46 + (k % 2) * 8, w, k + 10, c_NUBEM); }
  for (let k = 0; k < 4; k++) { const x0 = Math.round(((k * 97 + t * 5.5) % 420) - 60), y = 62 + (k % 3) * 5, L = 26 + (k % 2) * 16; for (let i = 0; i < L; i++) if ((i + k) % 5 && c_b4(x0 + i, y) < 0.7) pset(x0 + i, y, hex('#3e3a66')); for (let i = 4; i < L - 6; i++) if (i % 4) pset(x0 + i + 2, y - 1, hex('#34325e')); }
  c_pegar(R, c_capa(R, 'mz-plaza', () => c_plazaFija(R)));
  // la estrella pequeña del chapitel, que late, y las agujas del reloj
  { const v = 0.5 + 0.5 * Math.sin(t * 1.6); const sx = 100, sy = 22; c_aclara(R, sx + 0.5, sy + 0.5, 6, 6, hex('#ff5a4a'), 0.3 + v * 0.3); pset(sx, sy - 2, hex('#e83a30')); rect(sx - 2, sy, sx + 2, sy, hex('#e83a30')); rect(sx - 1, sy - 1, sx + 1, sy + 1, hex('#e83a30')); pset(sx - 2, sy + 2, hex('#c02420')); pset(sx + 2, sy + 2, hex('#c02420')); pset(sx, sy, v > 0.5 ? hex('#ffb0a0') : hex('#ff7a6a')); }
  { const m = t * 0.5, hh = t * 0.04 + 1.2; linea(100, 56, Math.round(100 + Math.sin(m) * 4), Math.round(56 - Math.cos(m) * 4), hex('#f0c860')); linea(100, 56, Math.round(100 + Math.sin(hh) * 3), Math.round(56 - Math.cos(hh) * 3), hex('#f8d870')); }
  // las guirnaldas de bombillas de los almacenes, que corren, y algún escaparate que se apaga
  for (let x = 278; x < 320; x += 2) { const on = ((x >> 1) + Math.floor(t * 6)) % 3; pset(x, 64, on === 0 ? hex('#fff4c0') : on === 1 ? hex('#e8b860') : hex('#8a6a48')); }
  for (const ax of [281, 290, 299, 308, 317]) for (let y = 70; y < 107; y += 3) { const on = ((y + ax) / 3 + Math.floor(t * 5)) % 4 === 0; if (on) pset(ax, y, hex('#fff0b0')); }
  if ((t % 9) < 2.2) rect(300, 72, 304, 83, hex('#5a4038'));
  // la luz de las farolas
  c_farolaLuz(R, 30, 168, 74, t, 0); c_farolaLuz(R, 292, 156, 64, t, 2);
  // la cola de gente al pie de la muralla, que avanza a saltitos
  if (o.cola !== false) { const av = (Math.floor(t / 2.5) % 2) * 1; const AB = [hex('#3a3a4a'), hex('#5a3a2a'), hex('#2a3a4a'), hex('#4a2a2a'), hex('#3a4a3a')];
    for (let k = 0; k < 6; k++) { const x = 122 + k * 6 + av + (k % 3 === 0 ? 1 : 0); c_figurita(R, x, 115, t, AB[k % 5], false, k); if (k === 4 && Math.sin(t * 2) > 0.6) pset(x + 2, 110, hex('#ffffff')); } }
  // la barredora naranja que cruza lejos con su rotativo y su abanico de nieve
  if (o.barredora !== false) { const u = (t / 34 + 0.15) % 1, x = Math.round(330 - u * 380), y = 121;
    if (x > -30 && x < 330) { rect(x, y - 7, x + 13, y - 2, hex('#e07a2a')); rect(x, y - 7, x + 13, y - 7, hex('#f8a050')); rect(x + 1, y - 11, x + 6, y - 7, hex('#c86020')); rect(x + 2, y - 10, x + 5, y - 8, hex('#9ac8e8')); rect(x - 4, y - 4, x - 1, y - 1, hex('#5a5a68'));
      for (const wx of [x + 3, x + 11]) { disco(wx, y, 2, hex('#141420')); pset(wx, y, hex('#6a6a7a')); } const on = Math.floor(t * 6) % 2; pset(x + 3, y - 12, on ? hex('#ffc040') : hex('#8a4a10')); if (on) c_aclara(R, x + 3.5, y - 11.5, 8, 6, hex('#ffb040'), 0.45);
      for (let i = 0; i < 6; i++) pset(x - 5 - Math.round(h(i, Math.floor(t * 8), 262) * 6), y - 1 - Math.round(h(i, 2, Math.floor(t * 8)) * 5), c_NIEVE); } }
  // la abuela que barre la nieve con su escoba de ramas
  { const x = 246, y = 130, b = Math.sin(t * 3.2); c_figura(R, x, y, t, hex('#5a4a6a'), { dir: -1, gorro: hex('#8a3a4a'), bufanda: hex('#c8b890') });
    const ex = Math.round(x - 6 + b * 3); linea(x - 2, y - 5, ex, y - 1, hex('#6a4a2a')); for (let i = -2; i <= 2; i++) linea(ex, y - 1, ex - 2 + i, y + 1, hex('#8a6a3a')); if (b < -0.6) for (let i = 0; i < 3; i++) pset(ex - 3 - i, y - 1 - (i % 2), c_NIEVE); }
  // alguien que cruza lejos con prisa
  { const u = ((t + 6) / 22) % 1, x = Math.round(-10 + u * 340); c_figura(R, x, 124, t, hex('#2a3048'), { anda: true, k: 3 }); }
  // la nieve que cae: la capa lejana, fina y lenta, y la media
  c_nieva(R, t, 263, 90, 9, hex('#9aa4c8'), 0, 0, 319, 179);
  c_nieva(R, t, 264, 46, 17, c_NIEVE, 0, 0, 319, 179);
  // el polvo de nieve que arrastra el viento a ras de suelo
  for (let k = 0; k < 6; k++) { const x = Math.round(((k * 71 + t * 30) % 380) - 30), y = 140 + k * 6; for (let i = 0; i < 8; i++) if (c_b4(x + i, y) < 0.5) pset(x + i, y - (i > 4 ? 1 : 0), hex('#eef2fa')); }
  return { suelo: 156, libre: [44, 268], farolas: [30, 292], muralla: [0, 158, 78, 110], catedral: [166, 274, 20, 110], almacenes: [277, 319] };
}

// lo lejano de la entrada de la agencia (búfer): el cielo y, por la izquierda, la calle con sus fachadas y ventanas
function c_puertaLejos(R) {
  const { rect, pset } = R;
  c_cieloNoche(R);
  for (const [x0, x1, top, k] of [[-4, 30, 34, 0], [30, 60, 58, 1], [60, 92, 76, 2]]) {
    const pared = [hex('#3a3a54'), hex('#423c50'), hex('#38404e')][k];
    for (let y = top; y <= 132; y++) for (let x = x0; x <= x1; x++) pset(x, y, (y - top) % 7 === 6 && h(x, y, 300) < 0.6 ? c_mez(pared, hex('#000000'), 0.25) : pared);
    rect(x0, top - 2, x1, top - 1, hex('#5a5a70')); rect(x0, top - 3, x1, top - 3, c_NIEVES);
    const sx = 4 - k, sy = 8 - k * 2;
    for (let wy = top + 6; wy < 124; wy += sy + 3) for (let wx = x0 + 3; wx < x1 - sx; wx += sx + 4) { const on = h(wx, wy, 301) < 0.45; rect(wx, wy, wx + sx, wy + sy, on ? (h(wx, wy, 302) < 0.5 ? hex('#e8b860') : hex('#c8a078')) : hex('#1e2234')); if (on) rect(wx, wy, wx + sx, wy, hex('#f8d890')); rect(wx, wy + sy + 1, wx + sx, wy + sy + 1, c_NIEVES); }
  }
  // la calzada que se aleja, con las rodadas y los montones de nieve del bordillo
  for (let y = 128; y <= 158; y++) for (let x = 0; x <= 92; x++) { const p = (y - 128) / 30; let c = c_mez(hex('#5a6088'), hex('#8a94b8'), p); if (Math.abs(((x + (y - 128) * 0.8) % 22) - 11) < 1.2 && h(x, y, 303) < 0.8) c = hex('#3e4466'); if (h(x, y, 304) < 0.01) c = hex('#ffffff'); pset(x, y, c); }
  for (let x = 0; x <= 92; x++) { const a = Math.round(2 + Math.sin(x * 0.3) + h(x >> 2, 2, 305)); rect(x, 132 - a, x, 132, c_NIEVES); pset(x, 132 - a, c_NIEVE); }
}

// lo cercano de la entrada (búfer, vacío donde se ve lo lejano): la fachada, la portada, la puerta, los escalones, la acera,
// el coche nevado y el poste de la farola
function c_puertaCerca(R) {
  const { rect, pset, poligono, linea, disco } = R;
  const EST = hex('#7c7a78'), ESTL = hex('#929088'), ESTS = hex('#62605e'), JUN = hex('#3a3a40');
  // el estuco del piso alto: rodillo, hiladas, más claro abajo por la luz de los faroles
  for (let y = 0; y <= 62; y++) for (let x = 88; x <= 319; x++) { const v = 0.6 + y / 62 * 0.9 - Math.abs(x - 172) / 260 + (h(x >> 1, y, 306) - 0.5) * 0.5; let c = v > 1 + c_b4(x, y) * 0.5 ? ESTL : v < 0.35 + c_b4(x, y) * 0.3 ? ESTS : EST; if (y % 9 === 8) c = c_mez(c, JUN, 0.45); if (h(x, y, 307) < 0.02) c = c_mez(c, hex('#4a4a50'), 0.5); pset(x, y, c); }
  rect(88, 0, 91, 179, hex('#5a5856')); rect(92, 0, 92, 152, hex('#9a988e'));
  // las ventanas altas: recercado, frontón con nieve, cortinas y luz (la de la derecha, a oscuras)
  for (const [x0, luz] of [[102, true], [222, false]]) { const x1 = x0 + 26;
    rect(x0 - 3, 10, x1 + 3, 52, hex('#a4a29a')); rect(x0 - 3, 10, x0 - 3, 52, hex('#bab8b0')); rect(x1 + 3, 10, x1 + 3, 52, hex('#7a786e'));
    poligono([[x0 - 6, 9], [x1 + 6, 9], [(x0 + x1) / 2, 2]], hex('#a4a29a')); linea(x0 - 6, 9, (x0 + x1) / 2, 2, c_NIEVE); linea(x0 - 5, 9, (x0 + x1) / 2, 3, c_NIEVES); rect(x0 - 6, 10, x1 + 6, 10, hex('#5a5852'));
    rect(x0, 13, x1, 49, hex('#2a2a36'));
    if (luz) { for (let y = 14; y <= 48; y++) for (let x = x0 + 1; x <= x1 - 1; x++) pset(x, y, c_mez(hex('#f0c070'), hex('#c87a3a'), (y - 14) / 40 + c_b4(x, y) * 0.15)); for (let y = 14; y <= 48; y++) { rect(x0 + 1, y, x0 + 6 + Math.round(Math.sin(y * 0.3)), y, hex('#8a3030')); rect(x1 - 6 - Math.round(Math.sin(y * 0.3)), y, x1 - 1, y, hex('#8a3030')); } rect(x0 + 10, 40, x0 + 16, 48, hex('#3a2a1a')); rect(x0 + 11, 36, x0 + 15, 39, hex('#e8e0b0')); }
    else for (let y = 14; y <= 48; y++) for (let x = x0 + 1; x <= x1 - 1; x++) pset(x, y, (x - y * 0.6) % 9 < 1.5 ? hex('#3a4060') : hex('#1e2234'));
    rect(x0, 30, x1, 31, hex('#d8d4c8')); rect(x0 + 12, 13, x0 + 14, 49, hex('#d8d4c8'));
    rect(x0 - 5, 50, x1 + 5, 52, hex('#b4b2aa')); rect(x0 - 5, 49, x1 + 5, 49, c_NIEVE); rect(x0 - 4, 48, x1 + 4, 48, c_NIEVES); }
  // el medallón con una estrella pequeña sobre la portada
  disco(172, 36, 10, hex('#5a5852')); disco(172, 36, 9, hex('#a4a29a')); disco(172, 36, 7, hex('#8a8880')); for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2; pset(Math.round(172 + Math.cos(an) * 8), Math.round(36 + Math.sin(an) * 8), k % 2 ? hex('#b8b6ac') : hex('#6a6862')); }
  pset(172, 32, hex('#d8b850')); rect(170, 34, 174, 34, hex('#d8b850')); rect(171, 35, 173, 37, hex('#d8b850')); pset(170, 38, hex('#a88830')); pset(174, 38, hex('#a88830')); rect(164, 26, 180, 26, c_NIEVES);
  // la cornisa con su nieve y los dentículos; los carámbanos cuelgan debajo
  rect(88, 56, 319, 62, hex('#a8a69e')); rect(88, 56, 319, 56, hex('#c4c2b8')); rect(88, 62, 319, 63, hex('#4a4842')); for (let x = 90; x < 320; x += 4) rect(x, 60, x + 1, 62, hex('#7a786e'));
  for (let x = 86; x <= 319; x++) { const a = Math.round(2 + Math.sin(x * 0.17) * 1 + h(x >> 2, 3, 308) * 1.5); rect(x, 56 - a, x, 55, c_NIEVE); pset(x, 56 - a, hex('#f8faff')); if (h(x, 4, 308) < 0.3) pset(x, 55, c_NIEVES); }
  for (let x = 94; x < 316; x += 3) { const L = Math.floor(h(x, 5, 309) * 7); if (L < 2 || (x > 272 && x < 284)) continue; for (let j = 0; j < L; j++) { pset(x, 64 + j, j < L - 2 ? hex('#c8d8ec') : hex('#e8f2fc')); if (j < L / 2) pset(x + 1, 64 + j, hex('#9aaccc')); } }
  // el piso bajo de piedra almohadillada (hiladas de 10 px, bisel de luz arriba y de sombra abajo, granito moteado)
  for (let y = 64; y <= 151; y++) { const fila = Math.floor((y - 64) / 10), fy = (y - 64) % 10, off = fila % 2 ? 12 : 0;
    for (let x = 93; x <= 319; x++) { const fx = (x - 93 + off) % 24; let c;
      if (fy === 9 || fx === 23) c = JUN; else if (fy === 0 || fx === 0) c = hex('#8e8a94'); else if (fy === 8 || fx === 22) c = hex('#545058');
      else { c = hex('#726e78'); const n = h(x, y, 310); if (n < 0.18) c = hex('#66626c'); else if (n > 0.92) c = hex('#86828c'); }
      pset(x, y, c); } }
  // las ventanas bajas con reja: el hueco (lo de dentro lo pinta c_puerta), la reja de barrotes y arcos y el alféizar con nieve
  for (const x0 of [100, 242]) { rect(x0 - 3, 89, x0 + 31, 133, hex('#4a4850')); rect(x0 - 2, 90, x0 + 30, 132, hex('#8a8690')); rect(x0, 92, x0 + 28, 130, 0);
    rect(x0 - 4, 133, x0 + 32, 135, hex('#a4a29a')); rect(x0 - 4, 132, x0 + 32, 132, c_NIEVE); rect(x0 - 3, 131, x0 + 31, 131, c_NIEVES); }
  // la portada: pilastras acanaladas con capitel, el entablamento con su nieve, el montante y la puerta de roble
  for (const px of [138, 196]) { rect(px, 82, px + 9, 146, hex('#9e9a92')); rect(px, 82, px, 146, hex('#b8b4aa')); rect(px + 9, 82, px + 9, 146, hex('#6e6a64')); for (const fx of [2, 4, 6]) for (let y = 88; y < 142; y++) pset(px + fx, y, h(px + fx, y, 311) < 0.85 ? hex('#86827a') : hex('#9e9a92')); rect(px - 1, 82, px + 10, 85, hex('#b0aca2')); rect(px - 1, 142, px + 10, 146, hex('#8a867e')); }
  rect(134, 72, 210, 81, hex('#aeaaa0')); rect(134, 72, 210, 72, hex('#c8c4ba')); rect(134, 80, 210, 81, hex('#6a665e')); for (let x = 136; x < 210; x += 5) rect(x, 78, x + 2, 79, hex('#8a867e'));
  for (let x = 132; x <= 212; x++) { const a = Math.round(2 + Math.sin(x * 0.4) * 0.8); rect(x, 72 - a, x, 71, c_NIEVE); pset(x, 72 - a, hex('#f8faff')); }
  rect(148, 82, 196, 146, hex('#2a2422'));
  for (let y = 84; y <= 92; y++) for (let x = 150; x <= 194; x++) pset(x, y, c_mez(hex('#f8d890'), hex('#d89848'), (y - 84) / 9));
  for (let k = 0; k < 7; k++) linea(172, 92, Math.round(172 + Math.cos(Math.PI + k / 6 * Math.PI) * 22), Math.round(92 + Math.sin(Math.PI + k / 6 * Math.PI) * 9), hex('#2a2422')); rect(150, 92, 194, 93, hex('#2a2422'));
  for (const [a, b] of [[150, 171], [173, 194]]) { for (let y = 94; y <= 146; y++) for (let x = a; x <= b; x++) pset(x, y, h(x, y >> 2, 312) < 0.3 ? hex('#4a2a18') : (x * 3 + (y >> 3)) % 7 === 0 ? hex('#3a2010') : hex('#5a3420'));
    for (const [y0, y1] of [[98, 117], [122, 140]]) { rect(a + 3, y0, b - 3, y1, hex('#3a2010')); rect(a + 4, y0 + 1, b - 4, y1 - 1, hex('#6a4028')); rect(a + 4, y0 + 1, b - 4, y0 + 1, hex('#8a5a34')); rect(a + 4, y0 + 1, a + 4, y1 - 1, hex('#7a4a2c')); rect(a + 7, y0 + 4, b - 7, y1 - 4, hex('#5a3420')); rect(a + 7, y1 - 4, b - 7, y1 - 4, hex('#7a4a2c')); }
    rect(a, 142, b, 146, hex('#a88030')); rect(a, 142, b, 142, hex('#d8b050')); }
  rect(171, 94, 172, 146, hex('#1a1008')); rect(168, 114, 169, 126, hex('#c89838')); rect(175, 114, 176, 126, hex('#c89838')); pset(168, 114, hex('#f8e090')); pset(175, 114, hex('#f8e090')); for (const x of [164, 180]) disco(x, 108, 1, hex('#a88030'));
  // la placa de bronce sin letras (barras), con sus tornillos
  rect(212, 102, 234, 118, hex('#1a1408')); rect(213, 103, 233, 117, hex('#c8a040')); rect(214, 104, 232, 116, hex('#3a2e18')); disco(223, 107, 2, hex('#c8a040')); pset(223, 107, hex('#3a2e18'));
  for (const [y, a, b] of [[111, 216, 230], [113, 217, 229], [115, 219, 227]]) rect(a, y, b, y, hex('#d8b850')); for (const [x, y] of [[214, 104], [232, 104], [214, 116], [232, 116]]) pset(x, y, hex('#f0d878'));
  // los brazos de los faroles
  for (const x of [130, 214]) { const d = x < 172 ? 1 : -1; rect(x, 90, x + 4 * d, 90, hex('#1a1a22')); linea(x, 94, x + 4 * d, 90, hex('#1a1a22')); }
  // la bajante, oscura y discreta, con el hielo en la boca
  rect(276, 0, 277, 148, hex('#4a4a52')); rect(276, 0, 276, 148, hex('#5e5e66')); for (let y = 20; y < 148; y += 22) rect(275, y, 278, y + 1, hex('#3a3a42')); rect(274, 148, 280, 150, hex('#c8dcf0')); pset(279, 151, hex('#e8f4fc'));
  // los escalones de granito con nieve en los lados y pisados en el centro
  rect(134, 146, 210, 151, hex('#8a8690')); rect(134, 146, 210, 146, hex('#b0acb6')); rect(134, 151, 210, 151, hex('#4a4652'));
  rect(126, 152, 218, 157, hex('#7e7a86')); rect(126, 152, 218, 152, hex('#a8a4ae')); rect(126, 157, 218, 157, hex('#46424e'));
  for (const [y, a, b] of [[145, 134, 210], [151, 126, 218]]) for (let x = a; x <= b; x++) if (Math.abs(x - 172) > 14 + h(x, y, 313) * 6) { pset(x, y, c_NIEVE); if (Math.abs(x - 172) > 22) pset(x, y + 1, c_NIEVES); }
  // los montones de nieve al pie de la fachada
  for (let x = 93; x <= 319; x++) { if (x > 124 && x < 220) continue; const a = Math.round(5 + Math.sin(x * 0.11) * 2 + h(x >> 2, 6, 314) * 3); rect(x, 158 - a, x, 158, (x + a) % 5 === 0 ? c_NIEVES : c_NIEVE); pset(x, 158 - a, hex('#f8faff')); if (h(x, 7, 314) < 0.3) pset(x, 157 - Math.floor(a / 2), c_NIEVES); }
  // la acera nevada: senda pisada, huellas que suben a la puerta, el bordillo y alguna chispa de hielo
  for (let y = 158; y <= 179; y++) { const p = (y - 158) / 21; for (let x = 0; x <= 319; x++) { let c = c_mez(hex('#8a94b8'), hex('#b8c2dc'), p); const ola = Math.sin(x * 0.05 + y * 0.7 + h(x >> 3, y >> 2, 315) * 2); if (ola > 0.8) c = c_mez(c, hex('#e8eef8'), 0.5); else if (ola < -0.85) c = c_mez(c, hex('#5a6088'), 0.25);
    if (Math.abs(y - 166 - Math.sin(x * 0.02) * 2) < 4 + p * 2 && h(x >> 1, y, 316) < 0.7) c = c_mez(c, hex('#5a6088'), 0.3); if (h(x, y, 317) < 0.01) c = hex('#ffffff'); pset(x, y, c); } }
  for (let k = 0; k < 9; k++) { const x = Math.round(150 + k * 3 + (k % 2) * 4), y = Math.round(176 - k * 2.4); rect(x, y, x + 1, y, hex('#545a84')); }
  // el coche cubierto de nieve junto al bordillo (carrocería de sedán de los setenta, cromados, el faro, la matrícula sin letras)
  { const x0 = 6, sue = 157;
    rect(x0, sue - 14, x0 + 66, sue - 5, hex('#141820')); rect(x0 + 1, sue - 13, x0 + 65, sue - 6, hex('#3a4a5a')); rect(x0 + 1, sue - 13, x0 + 65, sue - 12, hex('#5a6a7a')); rect(x0 + 1, sue - 7, x0 + 65, sue - 6, hex('#2a3644'));
    poligono([[x0 + 14, sue - 14], [x0 + 20, sue - 24], [x0 + 46, sue - 24], [x0 + 54, sue - 14]], hex('#141820')); poligono([[x0 + 16, sue - 14], [x0 + 21, sue - 22], [x0 + 32, sue - 22], [x0 + 32, sue - 14]], hex('#1e2a3a')); poligono([[x0 + 35, sue - 14], [x0 + 35, sue - 22], [x0 + 45, sue - 22], [x0 + 51, sue - 14]], hex('#1e2a3a'));
    linea(x0 + 18, sue - 15, x0 + 24, sue - 21, hex('#4a5a72')); rect(x0 + 1, sue - 9, x0 + 65, sue - 9, hex('#a8b0bc')); rect(x0 - 1, sue - 8, x0 + 4, sue - 6, hex('#c8ccd4')); rect(x0 + 62, sue - 8, x0 + 67, sue - 6, hex('#c8ccd4')); rect(x0 + 63, sue - 12, x0 + 65, sue - 10, hex('#f0e8c0'));
    for (const wx of [x0 + 14, x0 + 52]) { disco(wx, sue - 3, 5, hex('#0e1016')); disco(wx, sue - 3, 2, hex('#8a909a')); pset(wx, sue - 3, hex('#d0d4dc')); }
    for (let x = x0 + 18; x <= x0 + 48; x++) { const a = Math.round(3 + Math.sin((x - x0 - 18) / 30 * Math.PI) * 3); rect(x, sue - 24 - a, x, sue - 24, c_NIEVE); pset(x, sue - 24 - a, hex('#f8faff')); }
    for (let x = x0; x <= x0 + 66; x++) if (x < x0 + 16 || x > x0 + 52) { const a = Math.round(2 + h(x >> 1, 8, 318) * 2); rect(x, sue - 14 - a, x, sue - 14, c_NIEVE); }
    for (let x = x0 - 4; x <= x0 + 72; x++) { const a = Math.round(2 + Math.sin(x * 0.3) + h(x, 9, 318) * 2); rect(x, sue + 1 - a, x, sue + 1, c_NIEVES); pset(x, sue + 1 - a, c_NIEVE); } }
  // el poste de la farola de brazo
  rect(80, 62, 81, 160, hex('#1a1c26')); rect(80, 62, 80, 160, hex('#3a3e52')); rect(78, 152, 83, 160, hex('#1a1c26')); linea(81, 62, 76, 58, hex('#1a1c26')); rect(62, 57, 76, 58, hex('#1a1c26')); rect(63, 56, 75, 56, c_NIEVES); rect(60, 59, 66, 61, hex('#1a1c26'));
}

// la entrada del edificio de la agencia (ver la cabecera de moscu, cámara 'puerta')
function c_puerta(R, t, o) {
  const { rect, pset, disco, linea } = R;
  R.copiar(c_capa(R, 'mz-puertaLejos', () => c_puertaLejos(R)));
  // nubes y los cables del trolebús por la izquierda
  R.recorte([0, 0, 92, 100]);
  for (let k = 0; k < 3; k++) { const x = ((k * 71 + t * (1.5 + k)) % 200) - 50; c_nubeN(R, x, 16 + k * 9, 40 + k * 8, k + 20, k === 2 ? c_NUBEM : c_NUBEL); }
  R.recorte(null);
  for (const dy of [0, 3]) linea(0, 50 + dy, 92, 70 + dy, hex('#12121c'));
  // el trolebús que pasa por la calle lejana, con chispas en el cable
  { const u = (t / 16 + 0.1) % 1, x = Math.round(-50 + u * 200), y = 130;
    if (x < 96) { R.recorte([0, 0, 92, 179]); rect(x, y - 13, x + 36, y - 2, hex('#141420')); rect(x + 1, y - 12, x + 35, y - 3, hex('#c8c0a0')); rect(x + 1, y - 6, x + 35, y - 3, hex('#3a6ab0'));
      for (let i = 0; i < 6; i++) rect(x + 3 + i * 5, y - 11, x + 6 + i * 5, y - 7, h(i, 1, 319) < 0.7 ? hex('#f0d890') : hex('#2a2a3a')); for (const wx of [x + 7, x + 29]) { R.disco(wx, y - 1, 2, hex('#0e0e14')); }
      const wx = x + 10 + Math.round((x + 10) * 0.217); linea(x + 8, y - 13, wx - 2, 50 + Math.round((wx - 2) * 0.217), hex('#2a2a34')); linea(x + 12, y - 13, wx + 2, 53 + Math.round((wx + 2) * 0.217), hex('#2a2a34'));
      if (Math.sin(t * 13) > 0.85) { const sy = 51 + Math.round(wx * 0.217); pset(wx, sy, hex('#ffffff')); pset(wx - 1, sy - 1, hex('#a8d8ff')); pset(wx + 1, sy + 1, hex('#a8d8ff')); c_aclara(R, wx, sy, 6, 6, hex('#a8c8ff'), 0.5); }
      R.recorte(null); } }
  // la nieve lejana de la calle
  c_nieva(R, t, 320, 26, 10, hex('#9aa4c8'), 0, 0, 92, 150);
  c_pegar(R, c_capa(R, 'mz-puertaCerca', () => c_puertaCerca(R)));
  // dentro de las ventanas bajas: el despacho encendido, con un archivador, una lámpara y alguien que pasa por detrás
  for (const [x0, k] of [[100, 0], [242, 1]]) { R.recorte([x0, 92, x0 + 28, 130]);
    for (let y = 92; y <= 130; y++) for (let x = x0; x <= x0 + 28; x++) pset(x, y, y > 120 ? hex('#6a4a30') : c_mez(hex('#e0c088'), hex('#b88a50'), (y - 92) / 30 + c_b4(x, y) * 0.1));
    if (k === 0) { rect(x0 + 2, 104, x0 + 10, 124, hex('#6a6a62')); for (const y of [108, 114, 120]) rect(x0 + 3, y, x0 + 9, y, hex('#4a4a44')); rect(x0 + 18, 116, x0 + 27, 118, hex('#5a3a22')); rect(x0 + 22, 110, x0 + 23, 116, hex('#2a2a2a')); rect(x0 + 19, 106, x0 + 25, 110, hex('#2a6a3a')); }
    else { rect(x0 + 4, 98, x0 + 14, 108, hex('#c8a040')); rect(x0 + 5, 99, x0 + 13, 107, hex('#8aa0b0')); rect(x0 + 2, 118, x0 + 26, 120, hex('#5a3a22')); }
    const u = ((t + k * 5) % 11) / 11; if (u < 0.45) { const px = Math.round(x0 - 6 + u / 0.45 * 40); rect(px, 104, px + 6, 130, hex('#3a3040')); disco(px + 3, 101, 3, hex('#3a3040')); }
    R.recorte(null);
    for (let x = x0 + 2; x < x0 + 28; x += 4) rect(x, 92, x, 130, hex('#14141c')); for (const y of [104, 118]) rect(x0, y, x0 + 28, y, hex('#14141c')); for (let x = x0; x < x0 + 28; x += 8) for (let k2 = 0; k2 < 5; k2++) pset(x + 4 + Math.round(Math.cos(Math.PI + k2 / 4 * Math.PI) * 4), 98 + Math.round(Math.sin(Math.PI + k2 / 4 * Math.PI) * 3), hex('#14141c')); }
  // la hoja derecha de la puerta que se abre hacia dentro (o.puerta): el vestíbulo encendido con su alfombra y su escalera
  const ab = Math.max(0, Math.min(1, o.puerta ?? 0));
  if (ab > 0) { R.recorte([173, 94, 194, 146]);
    for (let y = 94; y <= 146; y++) for (let x = 173; x <= 194; x++) pset(x, y, y > 132 ? (Math.abs(x - 183) < 5 ? hex('#a83a34') : hex('#8a6a4a')) : c_mez(hex('#f0d090'), hex('#c89858'), (y - 94) / 40));
    for (let k = 0; k < 6; k++) rect(184 + k * 2, 120 - k * 4, 194, 121 - k * 4, hex('#b89868')); linea(182, 132, 194, 108, hex('#5a3420')); disco(183, 100, 2, hex('#fff4c8'));
    const w = Math.round(21 * (1 - ab * 0.8)); for (let y = 94; y <= 146; y++) rect(194 - w, y, 194, y, (y % 6 === 0) ? hex('#4a2a18') : hex('#3e2414')); rect(194 - w, 94, 194 - w, 146, hex('#7a4a2c'));
    R.recorte(null); c_aclara(R, 183, 152, 22, 5, hex('#f0c880'), 0.5 * ab); }
  // los faroles de la portada, con su llama que tiembla, y la luz que cae sobre la nieve
  for (const x of [130, 214]) { const d = x < 172 ? 1 : -1, lx = x + 4 * d, fl = 0.5 + 0.08 * Math.sin(t * 11 + x);
    c_aclara(R, lx + 0.5, 98, 20, 18, hex('#f0c070'), fl * 0.5);
    rect(lx - 3, 91, lx + 3, 92, hex('#1a1a22')); rect(lx - 2, 93, lx + 2, 101, hex('#1a1a22')); rect(lx - 1, 94, lx + 1, 100, hex('#ffe8a8')); pset(lx, 96 + (Math.sin(t * 9 + x) > 0 ? 0 : 1), hex('#ffffff')); rect(lx - 3, 102, lx + 3, 102, hex('#1a1a22')); pset(lx, 89, c_NIEVE); rect(lx - 2, 90, lx + 2, 90, c_NIEVE); }
  // el brillo que recorre la placa y los tiradores
  { const g = Math.round(((t * 8) % 60) - 10); for (let j = 0; j < 4; j++) { const x = 213 + g + j; if (x > 213 && x < 233) pset(x, 104 + j * 3, hex('#fff0b0')); } }
  // la farola de brazo: la campana encendida y el cono de luz donde brillan los copos
  { const fl = 0.55 + 0.05 * Math.sin(t * 7); c_aclara(R, 63, 70, 18, 12, hex('#e8d0a0'), fl * 0.5);
    for (let y = 63; y < 156; y += 1) { const w = (y - 62) * 0.22; for (let x = Math.round(63 - w); x <= 63 + w; x++) if (c_b4(x, y) < 0.09 && h(x, y, 321) < 0.6) pset(x, y, c_mez(R.pget(x, y), hex('#f0d8a8'), 0.35)); }
    rect(59, 61, 67, 62, hex('#1a1c26')); rect(60, 63, 66, 64, hex('#fff2c8')); pset(63, 65, hex('#ffffff')); }
  // las gotas de los carámbanos
  for (let k = 0; k < 5; k++) { const x = 100 + k * 43 + (k % 2) * 2, u = ((t * 0.9 + k * 0.37) % 1.6); if (x > 270 && x < 286) continue; if (u < 1) pset(x, Math.round(70 + u * u * 80), hex('#c8e0f8')); }
  // la nieve que cae delante de la fachada (la de los copos grandes va en moscuDelante)
  c_nieva(R, t, 322, 60, 14, c_NIEVE, 0, 0, 319, 179);
  return { suelo: 164, umbral: 146, puerta: [150, 194, 92, 146], placa: [212, 234, 102, 118], faroles: [134, 210], coche: [6, 72, 133, 157], farola: 80, libre: [96, 270] };
}

// el color del cielo de la ventana según o.hora: 0 la mañana gris de nieve, 0,5 la tarde naranja, 1 la noche
function c_cieloHora(hora, v) {
  const P = [['#9aa6bc', '#c4ccd8', '#dde2ea'], ['#c87a5a', '#e8a868', '#f4d098'], ['#0e1430', '#1e2448', '#34305a']].map((f) => f.map(hex));
  const u = Math.max(0, Math.min(1, hora)) * 2, i = Math.min(1, Math.floor(u)), f = u - i; return c_mez(P[i][v], P[i + 1][v], f);
}

// lo que se ve por una ventana de la agencia [x0, y0, x1, y1] (recortado a su hueco): el cielo de la hora, nubes, los
// tejados nevados con chimeneas que humean, una cúpula dorada lejana, la torre de pisos escalonados, ventanas que se
// encienden al caer la tarde y la nieve que cae
function c_ventanaHora(R, t, x0, y0, x1, y1, hora) {
  const { rect, pset } = R, H = y1 - y0, noche = Math.max(0, hora * 2 - 1), tarde = 1 - Math.abs(hora - 0.5) * 2;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const v = (y - y0) / H * 2; for (let x = x0; x <= x1; x++) { let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; R.pset(x, y, c_cieloHora(hora, Math.min(2, l))); } }
  if (tarde > 0.3) R.disco(Math.round(x0 + (x1 - x0) * 0.7), Math.round(y0 + H * 0.55), 4, c_mez(hex('#f8e0a0'), hex('#ffffff'), 0.3));
  for (let k = 0; k < 3; k++) { const cx = x0 + ((k * 37 + t * (1.5 + k * 0.8)) % (x1 - x0 + 50)) - 25, cy = y0 + 8 + k * 7, nb = c_cieloHora(hora, 2); for (let i = -9; i <= 9; i++) for (let j = -2; j <= 1; j++) if ((i / 9) ** 2 + (j / 2.4) ** 2 < 1 && c_b4(Math.round(cx + i), cy + j) < 0.7) pset(Math.round(cx + i), cy + j, j < 0 ? c_mez(nb, hex('#ffffff'), 0.4) : c_mez(nb, hex('#000000'), 0.12)); }
  const osc = c_mez(c_cieloHora(hora, 0), hex('#000000'), 0.5), med = c_mez(osc, hex('#5a5a6a'), 0.3), base = y1 - Math.round(H * 0.22);
  for (const [a, b, top] of [[x0 + 20, x0 + 26, y0 + H * 0.3], [x0 + 22, x0 + 24, y0 + H * 0.2]]) rect(a, Math.round(top), b, base, med);
  R.disco(x0 + Math.round((x1 - x0) * 0.78), base - Math.round(H * 0.28), 3, hex('#d8a840')); rect(x0 + Math.round((x1 - x0) * 0.78) - 2, base - Math.round(H * 0.25), x0 + Math.round((x1 - x0) * 0.78) + 2, base, med); pset(x0 + Math.round((x1 - x0) * 0.78), base - Math.round(H * 0.28) - 4, hex('#d8a840'));
  for (let x = x0, k = 0; x <= x1; k++) { const w = 8 + Math.floor(h(k, 1, 330) * 10), top = base - Math.floor(h(k, 2, 330) * 8); rect(x, top, x + w, y1, osc); rect(x, top - 1, x + w, top, c_NIEVE);
    for (let wy = top + 3; wy < y1; wy += 4) for (let wx = x + 2; wx < x + w - 1; wx += 3) if (h(wx, wy, 331) < noche * 0.6 + tarde * 0.2) pset(wx, wy, hex('#f0c068'));
    if (k % 2 === 0) { rect(x + 3, top - 4, x + 4, top - 1, osc); const u = (t * 0.4 + k * 0.3) % 1; pset(x + 3 + Math.round(u * 3), top - 5 - Math.round(u * 6), c_mez(c_cieloHora(hora, 1), hex('#ffffff'), 0.5)); }
    x += w + 1; }
  c_nieva(R, t, 332, 14, 11, hex('#f4f6fa'), x0, y0, x1, y1);
  R.recorte(null);
}

// la pared pintada de la agencia (verde gris con la trama del rodillo de flores y las esquinas más oscuras)
function c_paredSov(R, x0, y0, x1, y1, base = '#9aa696') {
  const B = hex(base), L = c_mez(B, hex('#ffffff'), 0.12), S = c_mez(B, hex('#000000'), 0.14), S2 = c_mez(B, hex('#000000'), 0.26);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fx = (x + (Math.floor(y / 8) % 2) * 5) % 10, fy = y % 8, flor = (fx === 4 && fy === 3) || (fy === 3 && (fx === 3 || fx === 5)) || (fx === 4 && (fy === 2 || fy === 4));
    const v = 0.5 - ((y - y0) / Math.max(1, y1 - y0)) * 0.25 + Math.abs((x - (x0 + x1) / 2) / (x1 - x0)) * 0.7 + (h(x >> 3, y >> 3, 333) - 0.5) * 0.2; let c = v > 0.62 + c_b4(x, y) * 0.2 ? S : B; if (v > 0.85 + c_b4(x, y) * 0.15) c = S2; if (flor && h(x, y, 334) < 0.8) c = c === B ? L : B; R.pset(x, y, c); }
}

// el zócalo de madera de cuarterones (de y0 a y1, con el pasamanos arriba)
function c_zocalo(R, x0, x1, y0, y1) {
  const { rect, pset } = R;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, h(x >> 2, y, 335) < 0.25 ? hex('#5a3620') : (x + (y >> 2)) % 9 === 0 ? hex('#5e3a22') : hex('#6a4228'));
  rect(x0, y0, x1, y0 + 2, hex('#8a5a34')); rect(x0, y0, x1, y0, hex('#a87444')); rect(x0, y0 + 3, x1, y0 + 3, hex('#3a2010'));
  for (let x = x0 + 4; x < x1 - 20; x += 30) { rect(x, y0 + 7, x + 24, y1 - 5, hex('#4a2c18')); rect(x + 1, y0 + 8, x + 23, y1 - 6, hex('#734a2c')); rect(x + 1, y0 + 8, x + 23, y0 + 8, hex('#8a5a34')); rect(x + 1, y1 - 6, x + 23, y1 - 6, hex('#4a2c18'));
    for (let i = 0; i < 4; i++) for (let y = y0 + 10; y < y1 - 7; y++) if (h(x + i * 6, y, 336) < 0.6) pset(x + 3 + i * 6 + Math.round(Math.sin(y * 0.5 + i)), y, hex('#5e3a22')); }
  rect(x0, y1 - 2, x1, y1, hex('#3a2010'));
}

// el parqué de espiga (de y0 a y1), barnizado: tablillas con veta y juntas oscuras
function c_parquet(R, x0, x1, y0, y1) {
  const T = [hex('#8a5a30'), hex('#7a4e2a'), hex('#9a6838'), hex('#6e4424')];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = Math.floor((x + y * 2) / 10), b = Math.floor((x - y * 2 + 400) / 10), lado = (a + b) % 2, u = lado ? (x + y * 2) % 10 : (x - y * 2 + 400) % 10;
    let c = T[(a * 3 + b * 5) % 4]; if (u === 0) c = hex('#3a2414'); else if (h(x, y, 337) < 0.12) c = c_mez(c, hex('#000000'), 0.2); else if (u === 1 && lado) c = c_mez(c, hex('#ffffff'), 0.12); R.pset(x, y, c); }
}

// lo fijo de la sala de reuniones (búfer): techo, paredes, zócalo, parqué y alfombra, estantería, perchero, retrato,
// reloj, ventana (el hueco vacío), radiador, el marco de la puerta y las sillas de detrás de la mesa
function c_salaFija(R) {
  const { rect, pset, disco, linea, poligono } = R;
  c_paredSov(R, 0, 8, 319, 98);
  rect(0, 0, 319, 5, hex('#d8d4c4')); rect(0, 6, 319, 6, hex('#a8a494')); rect(0, 7, 319, 7, hex('#6a6a5a')); for (let x = 0; x < 320; x += 6) pset(x + 2, 3, hex('#b8b4a4')); rect(0, 13, 319, 13, hex('#7a8676'));
  c_zocalo(R, 0, 319, 99, 130); c_parquet(R, 0, 319, 131, 179);
  // la alfombra granate con cenefa bajo la mesa
  for (let y = 140; y <= 179; y++) { const w = Math.round(110 + (y - 140) * 1.2); for (let x = 160 - w; x <= 160 + w; x++) { const bx = Math.min(x - (160 - w), 160 + w - x), by = y - 140; let c = hex('#7a2a2a'); if (bx < 3 || by < 3) c = hex('#c8a050'); else if (bx < 7 || by < 6) c = (x + y) % 4 < 2 ? hex('#2a4a3a') : hex('#5a1a1e'); else if ((x * 3 + y * 5) % 23 === 0) c = hex('#a84040'); else if (h(x, y, 338) < 0.15) c = hex('#6a2222'); pset(x, y, c); } }
  // la puerta del pasillo: el marco (el hueco lo pinta c_sala) y la hoja acolchada abierta hacia la sala
  rect(10, 80, 50, 131, hex('#4a2c18')); rect(11, 81, 49, 131, hex('#7a4a2c')); rect(11, 81, 49, 81, hex('#9a6a3c')); rect(14, 84, 46, 131, 0);
  for (let x = 50; x <= 62; x++) { const u = (x - 50) / 12, ya = Math.round(83 - u * 5), yb = Math.round(131 + u * 6); for (let y = ya; y <= yb; y++) pset(x, y, x === 62 ? hex('#2a1410') : ((x + y) % 5 === 0 && (y - x) % 5 === 0) ? hex('#c8a040') : u > 0.7 ? hex('#5a2a22') : hex('#6e342a')); }
  rect(58, 104, 59, 108, hex('#c89838'));
  // la estantería de puertas de cristal con los archivadores de colores (lomos sin letras, con su tarjeta blanca)
  rect(66, 54, 100, 131, hex('#3a2212')); rect(67, 55, 99, 130, hex('#6a4226')); rect(65, 52, 101, 54, hex('#8a5a34'));
  for (let s = 0; s < 4; s++) { const y0 = 58 + s * 17; rect(69, y0, 97, y0 + 14, hex('#2a1a10')); let x = 70; while (x < 96) { const w = 2 + Math.floor(h(x, s, 339) * 3), c = [hex('#3a5a8a'), hex('#8a3a2a'), hex('#4a6a3a'), hex('#a88a3a'), hex('#5a4a6a'), hex('#c8c0b0')][Math.floor(h(x, s, 340) * 6)], top = y0 + 2 + Math.floor(h(x, s, 341) * 3);
      rect(x, top, Math.min(96, x + w - 1), y0 + 14, c); pset(x, top, c_mez(c, hex('#ffffff'), 0.3)); if (w > 2) rect(x + 1, y0 + 8, x + 1, y0 + 10, hex('#e8e4d8')); x += w + (h(x, s, 342) < 0.15 ? 2 : 0); }
    rect(68, y0 + 15, 98, y0 + 16, hex('#8a5a34')); }
  for (let y = 56; y < 128; y += 1) { if ((y % 23) < 9) pset(70 + Math.round((y % 23) * 0.6), y, hex('#c8d8d0')); } rect(83, 55, 83, 130, hex('#3a2212'));
  rect(74, 44, 82, 51, hex('#a85a3a')); rect(73, 43, 83, 44, hex('#c8784a')); for (const [dx, dy] of [[0, 0], [-3, -4], [3, -5], [-1, -8], [2, -9], [5, -2], [-5, -1]]) linea(78, 43, 78 + dx, 43 + dy, hex('#3a7a4a'));
  rect(88, 46, 98, 51, hex('#d8d0b8')); rect(89, 45, 97, 45, hex('#b8b098')); rect(88, 48, 98, 48, hex('#a8a090'));
  // el reloj de pared con su caja de péndulo (las agujas y el péndulo los mueve c_sala)
  rect(104, 30, 120, 70, hex('#3a2010')); rect(105, 31, 119, 69, hex('#6a3a20')); rect(104, 28, 120, 30, hex('#8a5a30')); pset(112, 27, hex('#8a5a30')); disco(112, 40, 6, hex('#c8a040')); disco(112, 40, 5, hex('#f0ead8'));
  for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; pset(Math.round(112 + Math.cos(an) * 4), Math.round(40 + Math.sin(an) * 4), hex('#3a3a3a')); }
  rect(107, 48, 117, 67, hex('#2a1a10')); rect(108, 49, 116, 66, hex('#4a3020'));
  // el retrato oficial, de lejos y sin rasgos: marco dorado tallado, fondo oscuro y un busto de traje
  rect(136, 24, 182, 76, hex('#5a4010')); rect(137, 25, 181, 75, hex('#c89838')); rect(137, 25, 181, 25, hex('#f0c860')); rect(181, 25, 181, 75, hex('#8a6420')); rect(140, 28, 178, 72, hex('#7a5a18'));
  for (let x = 138; x < 181; x += 3) { pset(x, 26, hex('#f8d870')); pset(x + 1, 74, hex('#8a6420')); } for (let y = 28; y < 74; y += 3) { pset(138, y, hex('#f8d870')); pset(180, y, hex('#8a6420')); }
  for (let y = 29; y <= 71; y++) for (let x = 141; x <= 177; x++) pset(x, y, c_mez(hex('#4a4a3a'), hex('#22221c'), Math.hypot(x - 159, y - 44) / 32 + c_b4(x, y) * 0.12));
  poligono([[146, 72], [149, 60], [159, 56], [169, 60], [172, 72]], hex('#22242c')); poligono([[155, 57], [159, 66], [163, 57]], hex('#e8e4d8')); rect(158, 58, 160, 66, hex('#5a2a2a'));
  for (let j = -9; j <= 8; j++) for (let i = -7; i <= 7; i++) if ((i / 7) ** 2 + (j / 9) ** 2 < 1) pset(159 + i, 46 + j, i > 3 + c_b4(i + 160, j + 46) * 2 ? hex('#a87a5a') : hex('#c8987a'));
  for (let i = -7; i <= 7; i++) for (let j = -10; j <= -5; j++) if ((i / 7) ** 2 + ((j + 5) / 5) ** 2 < 1 && j < -6 + Math.abs(i) * 0.1) pset(159 + i, 46 + j, hex('#3a3430'));
  rect(155, 53, 157, 54, hex('#b8886a')); for (let k = 0; k < 6; k++) pset(150 + k * 3, 68 + (k % 2), hex('#3a3c48'));
  linea(159, 24, 151, 15, hex('#4a3a20')); linea(159, 24, 167, 15, hex('#4a3a20')); pset(159, 14, hex('#c89838'));
  // la ventana: el marco blanco doble (el hueco lo pinta c_sala), el alféizar con plantas, el radiador de hierro
  rect(202, 20, 264, 98, hex('#b8b4a8')); rect(203, 21, 263, 97, hex('#e0dcd0')); rect(206, 24, 260, 94, 0);
  rect(198, 96, 268, 99, hex('#e8e4d8')); rect(198, 99, 268, 100, hex('#a8a498'));
  rect(212, 90, 218, 95, hex('#b8603a')); rect(211, 89, 219, 90, hex('#d8784a')); for (const [dx, dy, c] of [[0, -3, '#3a8a4a'], [-2, -2, '#2a6a3a'], [2, -2, '#2a6a3a'], [0, -5, '#c83a4a'], [-1, -5, '#e85a5a']]) R.disco(215 + dx, 88 + dy, 1, hex(c));
  rect(246, 91, 251, 95, hex('#a8a090')); rect(248, 85, 249, 90, hex('#4a8a4a')); pset(247, 87, hex('#4a8a4a')); pset(250, 86, hex('#4a8a4a'));
  rect(208, 104, 258, 126, hex('#4a4a48')); for (let x = 210; x < 257; x += 4) { rect(x, 105, x + 2, 125, hex('#d8d0b8')); rect(x + 2, 105, x + 2, 125, hex('#a8a090')); pset(x, 105, hex('#f0ead8')); if (h(x, 1, 343) < 0.5) rect(x + 1, 112 + Math.floor(h(x, 2, 343) * 8), x + 1, 113 + Math.floor(h(x, 2, 343) * 8), hex('#5a4a3a')); }
  rect(206, 124, 260, 125, hex('#8a8478')); rect(204, 112, 207, 114, hex('#6a6a68')); rect(204, 112, 205, 130, hex('#6a6a68'));
  // la barra de las cortinas con sus anillas
  rect(192, 15, 274, 16, hex('#a88030')); for (let x = 194; x < 274; x += 5) pset(x, 17, hex('#f0c860')); disco(191, 15, 2, hex('#c89838')); disco(275, 15, 2, hex('#c89838'));
  // el perchero con dos gorros de piel, un abrigo y un paraguas
  rect(287, 72, 289, 130, hex('#4a2a14')); rect(287, 72, 287, 130, hex('#7a4a2a')); rect(281, 128, 295, 130, hex('#3a2010')); disco(288, 70, 2, hex('#7a4a2a'));
  for (const [dx, dy] of [[-5, 76], [5, 76], [-4, 82], [4, 82]]) linea(288, dy + 2, 288 + dx, dy, hex('#4a2a14'));
  for (const [cx, cy, c] of [[282, 73, '#5a4030'], [295, 73, '#8a7a6a']]) { R.disco(cx, cy, 4, hex(c)); rect(cx - 4, cy, cx + 4, cy + 3, hex(c)); for (let i = -3; i <= 3; i += 2) pset(cx + i, cy - 2, c_mez(hex(c), hex('#ffffff'), 0.3)); }
  poligono([[282, 84], [294, 84], [297, 118], [279, 118]], hex('#3a3a44')); rect(287, 84, 289, 118, hex('#2a2a34')); for (const y of [92, 100, 108]) pset(286, y, hex('#c8a040')); rect(280, 116, 296, 118, hex('#2a2a34'));
  linea(299, 100, 302, 128, hex('#1a1a1a')); poligono([[297, 104], [302, 104], [304, 124], [300, 126]], hex('#2a3a5a')); linea(299, 99, 300, 97, hex('#6a4a2a'));
  // las sillas de detrás de la mesa: respaldo de madera con cuero verde y tachuelas
  for (const cx of [92, 136, 206, 250]) { rect(cx - 8, 106, cx + 8, 130, hex('#3a2010')); rect(cx - 7, 107, cx + 7, 129, hex('#6a4024')); rect(cx - 5, 109, cx + 5, 124, hex('#2a5a3a')); rect(cx - 5, 109, cx + 5, 109, hex('#3a7a4a'));
    for (let x = cx - 5; x <= cx + 5; x += 2) pset(x, 108, hex('#c8a040')); rect(cx - 8, 104, cx + 8, 105, hex('#8a5a34')); pset(cx - 8, 103, hex('#8a5a34')); pset(cx + 8, 103, hex('#8a5a34')); }
}

// la sala de reuniones de la agencia (ver la cabecera de moscu, encuadre 'elorg')
function c_sala(R, t, o) {
  const { rect, pset, disco, linea } = R, hora = Math.max(0, Math.min(1, o.hora ?? 0.15)), noche = Math.max(0, hora * 2 - 1), tarde = 1 - Math.abs(hora - 0.5) * 2;
  R.copiar(c_capa(R, 'mz-sala', () => c_salaFija(R)));
  // la ventana y el visillo
  c_ventanaHora(R, t, 206, 24, 260, 94, hora);
  for (let y = 24; y <= 94; y++) for (let x = 206; x <= 260; x++) if ((x + y * 3) % 7 === 0 && c_b4(x, y) < 0.5) pset(x, y, c_mez(R.pget(x, y), hex('#f0f0ea'), 0.45));
  rect(232, 24, 234, 94, hex('#e0dcd0')); rect(206, 56, 260, 58, hex('#e0dcd0')); rect(206, 40, 232, 40, hex('#c8c4b8')); pset(229, 62, hex('#a8a498')); pset(236, 62, hex('#a8a498'));
  // las cortinas pesadas que se mecen abajo
  for (const [xa, xb, lado] of [[194, 207, -1], [259, 272, 1]]) for (let y = 17; y <= 129; y++) { const ata = 70, g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(xb - xa + 1 - g * 5), sw = y > ata ? Math.round(Math.sin(t * 0.8 + xa * 0.1 + y * 0.05) * (y - ata) / 40) : 0, x0 = lado < 0 ? xa + sw : xb - w + 1 + sw;
    for (let x = x0; x < x0 + w; x++) pset(x, y, [hex('#8a3038'), hex('#6e2430'), hex('#561a24'), hex('#6e2430')][(x - x0 + (lado < 0 ? 0 : 2)) % 4]); pset(lado < 0 ? x0 + w : x0 - 1, y, hex('#2a0c10')); if (y === 129) for (let x = x0; x < x0 + w; x += 2) pset(x, 130, hex('#c89838'));
    if (y === ata) rect(x0, y, x0 + w - 1, y + 1, hex('#c89838')); }
  // el pasillo por la puerta abierta: tres puertas acolchadas al fondo, la lámpara, la alfombra y alguien que pasa
  R.recorte([14, 84, 46, 131]);
  for (let y = 84; y <= 131; y++) for (let x = 14; x <= 46; x++) { const fy = y < 96 ? 0 : y > 118 ? 2 : 1; pset(x, y, fy === 0 ? hex('#c8c4b4') : fy === 2 ? ((Math.abs(x - 30) < (y - 118) * 0.6 + 3) ? hex('#8a2a2a') : hex('#7a5030')) : y > 108 ? hex('#3a5a48') : hex('#d0ccbc')); }
  for (let y = 96; y <= 118; y++) { const d = Math.round((y - 96) * 0.4); pset(14 + d, y, hex('#9a9684')); pset(46 - d, y, hex('#9a9684')); }
  rect(25, 98, 35, 118, hex('#d8d0b8')); rect(26, 99, 34, 117, c_cieloHora(hora, 1)); rect(30, 99, 30, 117, hex('#d8d0b8'));
  for (const [x, y0, y1] of [[17, 98, 122], [41, 98, 122]]) { rect(x - 1, y0, x + 2, y1, hex('#6a2a24')); pset(x, y0 + 8, hex('#c8a040')); }
  rect(29, 84, 31, 87, hex('#3a3a3a')); disco(30, 89, 2, hex('#fff0c0')); c_aclara(R, 30, 92, 10, 8, hex('#fff0c0'), 0.4);
  { const u = ((t + 3) % 13) / 13; if (u < 0.5) { const x = Math.round(12 + u / 0.5 * 38); rect(x, 104, x + 4, 118, hex('#3a3a4a')); disco(x + 2, 101, 2, hex('#d8a888')); rect(x, 99, x + 4, 99, hex('#4a3426')); pset(x + (u < 0.25 ? 1 : 3), 119, hex('#1a1a1a')); } }
  R.recorte(null);
  // el reloj: las agujas y el péndulo
  { const m = t * 0.6, hh = 0.9 + t * 0.05; linea(112, 40, Math.round(112 + Math.sin(m) * 4), Math.round(40 - Math.cos(m) * 4), hex('#1a1a1a')); linea(112, 40, Math.round(112 + Math.sin(hh) * 3), Math.round(40 - Math.cos(hh) * 3), hex('#1a1a1a'));
    const a = Math.sin(t * Math.PI) * 0.35, px = Math.round(112 + Math.sin(a) * 12), py = Math.round(50 + Math.cos(a) * 12); linea(112, 50, px, py, hex('#a88030')); disco(px, py, 2, hex('#e8c050')); pset(px - 1, py - 1, hex('#fff0b0')); }
  // los apliques a los lados del retrato (más fuertes de noche)
  for (const x of [127, 191]) { const fl = 0.35 + noche * 0.35 + 0.04 * Math.sin(t * 5 + x); c_aclara(R, x, 46, 18, 16, hex('#f8e0a0'), fl);
    rect(x, 50, x, 54, hex('#a88030')); rect(x - 4, 50, x + 4, 50, hex('#a88030')); rect(x - 1, 55, x + 1, 56, hex('#c89838'));
    for (const dx of [-4, 4]) { rect(x + dx - 2, 44, x + dx + 2, 48, hex('#f0e0b8')); rect(x + dx - 1, 43, x + dx + 1, 43, hex('#e0d0a8')); rect(x + dx - 2, 48, x + dx + 2, 48, hex('#c8b088')); pset(x + dx, 49, hex('#fff8d0')); } }
  // la luz de la ventana en la pared y en el suelo (fría por la mañana, naranja por la tarde) y las motas que flotan en ella
  if (noche < 0.8) { const col = c_mez(hex('#dfe8f4'), hex('#f8c070'), Math.min(1, tarde * 1.2)), a = 0.32 * (1 - noche) * (0.6 + tarde * 0.6);
    for (let y = 132; y <= 150; y++) { const x0 = Math.round(200 - (y - 132) * 2.6), x1 = x0 + 56; for (let x = x0; x <= x1; x++) if (c_b4(x, y) < a * 1.4) pset(x, y, c_mez(R.pget(x, y), col, 0.35)); }
    for (let k = 0; k < 12; k++) { const y = Math.round(130 - ((h(k, 2, 344) * 70 + t * (1.5 + h(k, 3, 344) * 2)) % 70)), x = Math.round(210 - (130 - y) * 0.2 - (y - 60) * 0.0 + h(k, 1, 344) * 50 - (130 - y) * 0.4); if (Math.sin(t * 1.4 + k * 1.9) > 0) pset(x, y, c_mez(R.pget(x, y), col, 0.6)); } }
  // el aire caliente que tiembla sobre el radiador
  for (let k = 0; k < 6; k++) { const x = 212 + k * 8, y = Math.round(100 - ((t * 6 + k * 3) % 8)); if (c_b4(x, y) < 0.5) pset(x + Math.round(Math.sin(t * 3 + k)), y, c_mez(R.pget(x, y), hex('#ffffff'), 0.25)); }
  return { suelo: 172, detras: 131, mesa: [60, 262, 127, 143], puerta: [14, 46, 84, 131], ventana: [206, 260, 24, 94], retrato: [136, 182, 24, 76], sillas: [92, 136, 206, 250], perchero: 288 };
}

// la mesa larga de la sala de reuniones, por delante de los personajes de detrás: el tapete verde con su pelusa y el
// borde de madera, el faldón tallado, las patas torneadas, la sombra en la alfombra; encima, las jarras de agua, los
// vasos tallados, el cenicero con su humo, los vasos de té en su soporte de metal que humean, los papeles, el ábaco
// (o.abaco, true por omisión) y el teléfono negro
function c_mesaLarga(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R;
  for (let y = 144; y <= 150; y++) for (let x = 62; x <= 260; x++) if (c_b4(x, y) < 0.5) pset(x, y, c_mez(R.pget(x, y), hex('#000000'), 0.35));
  for (const lx of [68, 124, 196, 252]) { rect(lx - 2, 141, lx + 2, 166, hex('#3a2010')); rect(lx - 1, 141, lx + 1, 166, hex('#6a4024')); rect(lx - 1, 141, lx - 1, 166, hex('#8a5a34')); for (const y of [148, 156]) rect(lx - 3, y, lx + 3, y + 1, hex('#5a3420')); rect(lx - 3, 164, lx + 3, 166, hex('#2a1408')); rect(lx - 4, 167, lx + 4, 167, c_mez(R.pget(lx, 167), hex('#000000'), 0.4)); }
  poligono([[64, 126], [258, 126], [264, 134], [58, 134]], hex('#1a1008'));
  for (let y = 127; y <= 133; y++) { const xa = Math.round(64 - (y - 127) * 0.85), xb = Math.round(258 + (y - 127) * 0.85); for (let x = xa; x <= xb; x++) pset(x, y, h(x, y, 345) < 0.18 ? hex('#245a32') : h(x, y, 346) > 0.93 ? hex('#3e8a52') : hex('#2e6e3e')); }
  rect(56, 134, 266, 136, hex('#8a5a34')); rect(56, 134, 266, 134, hex('#a87444')); rect(56, 137, 266, 143, hex('#5a3420')); rect(56, 143, 266, 143, hex('#2a1408'));
  for (let x = 60; x < 264; x += 6) { pset(x, 139, hex('#7a4a2c')); pset(x + 1, 140, hex('#7a4a2c')); pset(x + 2, 139, hex('#7a4a2c')); }
  // las jarras de agua
  for (const jx of [86, 236]) { rect(jx - 3, 116, jx + 3, 131, hex('#2a3a44')); rect(jx - 2, 117, jx + 2, 130, hex('#cce4ee')); rect(jx - 2, 122, jx + 2, 130, hex('#8ab8d0')); rect(jx - 1, 114, jx + 1, 116, hex('#2a3a44')); rect(jx - 1, 113, jx + 1, 113, hex('#b8d8e8')); pset(jx - 1, 119, hex('#ffffff')); pset(jx - 1, 124, hex('#e8f4fa')); if (Math.sin(t * 1.3 + jx) > 0.8) pset(jx + 1, 126, hex('#ffffff')); }
  // los vasos tallados
  for (const gx of [102, 146, 178, 220]) { rect(gx - 2, 125, gx + 2, 131, hex('#4a5a64')); rect(gx - 1, 126, gx + 1, 130, hex('#b8d4e0')); pset(gx - 1, 128, hex('#ffffff')); pset(gx, 126, hex('#ffffff')); }
  // los vasos de té en su soporte de metal, con su vapor
  for (const [vx, k] of [[160, 0], [196, 1]]) { rect(vx - 2, 124, vx + 2, 128, hex('#a85a20')); rect(vx - 2, 124, vx + 2, 124, hex('#d8a060')); rect(vx - 3, 128, vx + 3, 131, hex('#a8a8b0')); rect(vx - 3, 128, vx + 3, 128, hex('#d8d8e0')); rect(vx + 4, 126, vx + 4, 129, hex('#a8a8b0')); linea(vx + 1, 123, vx + 3, 118, hex('#c8c8d0'));
    for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3 + k * 0.4) % 1; const sx = Math.round(vx - 1 + Math.sin(u * 7 + t + k) * 1.5), sy = Math.round(122 - u * 12); if (c_b4(sx, sy) < 0.8 - u * 0.6) pset(sx, sy, c_mez(R.pget(sx, sy), hex('#ffffff'), 0.55)); } }
  // los papeles apilados y una carpeta con cinta
  for (let k = 0; k < 4; k++) rect(112 - k, 128 - k, 132 - k, 130 - k, k % 2 ? hex('#e8e4d8') : hex('#f4f2ea')); rect(110, 124, 130, 124, hex('#c8c4b8')); for (let x = 112; x < 128; x += 3) pset(x, 125, hex('#6a6a7a'));
  rect(204, 128, 226, 131, hex('#c8a870')); rect(204, 128, 226, 128, hex('#e0c088')); rect(214, 128, 215, 131, hex('#f0f0f0'));
  // el cenicero con su colilla y el humo que sube
  rect(238, 129, 248, 131, hex('#4a5a6a')); rect(239, 128, 247, 128, hex('#7a8a9a')); rect(243, 127, 246, 127, hex('#e8e4d8')); pset(246, 127, Math.sin(t * 4) > 0 ? hex('#ff6a2a') : hex('#c84a1a'));
  for (let i = 0; i < 6; i++) { const u = (t * 0.35 + i / 6) % 1, sx = Math.round(246 + Math.sin(u * 9 + t * 0.7) * (1 + u * 3)), sy = Math.round(125 - u * 22); if (c_b4(sx, sy) < 0.7 - u * 0.5) pset(sx, sy, c_mez(R.pget(sx, sy), hex('#c8ccd4'), 0.5)); }
  // el ábaco
  if (o.abaco !== false) { rect(64, 118, 78, 131, hex('#4a2a14')); rect(65, 119, 77, 130, hex('#e8d8a8')); for (let r = 0; r < 4; r++) { const y = 121 + r * 3; rect(65, y, 77, y, hex('#6a6a6a')); for (let b = 0; b < 4; b++) { const x = 66 + b * 2 + (b >= (r + Math.floor(t / 2)) % 4 ? 3 : 0); pset(x, y, r % 2 ? hex('#3a2010') : hex('#c84a2a')); pset(x + 1, y, r % 2 ? hex('#5a3420') : hex('#e86a3a')); } } }
  // el teléfono negro de disco
  rect(250, 125, 260, 131, hex('#141418')); rect(251, 124, 259, 124, hex('#2a2a32')); rect(249, 122, 261, 123, hex('#141418')); pset(250, 122, hex('#4a4a52')); disco(255, 128, 2, hex('#e8e4d8')); pset(255, 128, hex('#141418'));
  return {};
}

// lo fijo del fondo de la mesa de cerca (búfer): la pared con su trama, el zócalo, la estantería de archivadores, el
// cuadro de abedules bajo el aplique, el calendario de taco (el número lo pinta c_mesaFondo) y el marco de la ventana
function c_mesaFondoFijo(R) {
  const { rect, pset, disco, linea } = R;
  c_paredSov(R, 0, 0, 319, 92); c_zocalo(R, 0, 319, 92, 132); rect(0, 133, 319, 179, hex('#4a2c18'));
  // la estantería grande
  rect(6, 18, 80, 132, hex('#3a2212')); rect(7, 19, 79, 131, hex('#6a4226')); rect(5, 16, 81, 18, hex('#8a5a34'));
  for (let s = 0; s < 4; s++) { const y0 = 22 + s * 26; rect(9, y0, 77, y0 + 22, hex('#24160c')); let x = 10; while (x < 76) { const w = 3 + Math.floor(h(x, s, 350) * 3), c = [hex('#3a5a8a'), hex('#8a3a2a'), hex('#4a6a3a'), hex('#a88a3a'), hex('#5a4a6a'), hex('#c8c0b0'), hex('#2a3a4a')][Math.floor(h(x, s, 351) * 7)], top = y0 + 2 + Math.floor(h(x, s, 352) * 5);
      rect(x, top, Math.min(76, x + w - 1), y0 + 22, c); rect(x, top, x, y0 + 22, c_mez(c, hex('#ffffff'), 0.2)); rect(Math.min(76, x + w - 1), top, Math.min(76, x + w - 1), y0 + 22, c_mez(c, hex('#000000'), 0.3)); if (w > 3) { rect(x + 1, y0 + 12, x + w - 2, y0 + 15, hex('#e8e4d8')); pset(x + 1, y0 + 6, c_mez(c, hex('#ffffff'), 0.4)); } x += w + (h(x, s, 353) < 0.12 ? 3 : 0); }
    if (s === 2) { for (let k = 0; k < 5; k++) rect(54, y0 + 14 + k * 2, 74, y0 + 15 + k * 2, k % 2 ? hex('#c8a870') : hex('#e0c088')); }
    rect(8, y0 + 23, 78, y0 + 25, hex('#8a5a34')); rect(8, y0 + 23, 78, y0 + 23, hex('#a87444')); }
  rect(43, 19, 43, 131, hex('#3a2212')); for (let y = 20; y < 130; y++) if ((y % 31) < 12) { pset(14 + Math.round((y % 31) * 0.7), y, hex('#c8d8d0')); pset(50 + Math.round((y % 31) * 0.7), y, hex('#b8c8c0')); }
  rect(40, 70, 41, 76, hex('#c89838')); rect(45, 70, 46, 76, hex('#c89838'));
  // el cuadro de abedules con su marco
  rect(92, 52, 128, 78, hex('#5a3a14')); rect(93, 53, 127, 77, hex('#a87a30')); for (let y = 55; y <= 75; y++) for (let x = 95; x <= 125; x++) pset(x, y, y < 66 ? c_mez(hex('#b8c8d8'), hex('#e8e0c8'), (y - 55) / 11) : c_mez(hex('#8a9a5a'), hex('#5a6a3a'), (y - 66) / 9 + c_b4(x, y) * 0.2));
  for (const bx of [99, 104, 113, 120]) { rect(bx, 57, bx, 74, hex('#f0ece0')); for (let y = 58; y < 74; y += 3) pset(bx, y, hex('#2a2a2a')); for (let k = 0; k < 6; k++) pset(bx + (k % 2 ? 2 : -2), 57 + k * 2, hex('#c8a040')); }
  // el calendario de taco
  rect(140, 26, 166, 60, hex('#3a2a1a')); rect(141, 27, 165, 59, hex('#f0ece0')); rect(141, 27, 165, 33, hex('#c8302a')); rect(141, 56, 165, 59, hex('#d8d4c8')); for (let x = 143; x < 165; x += 3) pset(x, 54, hex('#8a8a8a')); pset(153, 24, hex('#2a2a2a')); rect(152, 25, 154, 26, hex('#5a5a5a'));
  // el marco de la ventana (el hueco lo pinta c_mesaFondo) y el alféizar
  rect(194, 16, 254, 100, hex('#b8b4a8')); rect(195, 17, 253, 99, hex('#e0dcd0')); rect(198, 20, 250, 96, 0); rect(190, 98, 258, 101, hex('#e8e4d8')); rect(190, 102, 258, 102, hex('#a8a498'));
  rect(226, 90, 232, 97, hex('#b8603a')); rect(225, 89, 233, 90, hex('#d8784a')); for (const [dx, dy] of [[0, -4], [-3, -2], [3, -3], [-1, -7], [2, -6]]) linea(229, 89, 229 + dx, 89 + dy, hex('#3a7a4a'));
  rect(184, 13, 264, 14, hex('#a88030')); for (let x = 186; x < 264; x += 5) pset(x, 15, hex('#f0c860'));
  rect(260, 92, 319, 132, hex('#4a3020')); rect(260, 92, 319, 94, hex('#7a5030'));
}

// el fondo de la mesa de cerca (ver la cabecera de moscu, cámara 'mesa'): suelo de los de detrás 120; o.dia: el número del calendario de taco (21)
function c_mesaFondo(R, t, o) {
  const { rect, pset, linea } = R, hora = Math.max(0, Math.min(1, o.hora ?? 0.15)), noche = Math.max(0, hora * 2 - 1);
  R.copiar(c_capa(R, 'mz-mesaFondo', () => c_mesaFondoFijo(R)));
  c_ventanaHora(R, t, 198, 20, 250, 96, hora);
  for (let y = 20; y <= 96; y++) for (let x = 198; x <= 250; x++) if ((x + y * 3) % 7 === 0 && c_b4(x, y) < 0.5) pset(x, y, c_mez(R.pget(x, y), hex('#f0f0ea'), 0.45));
  rect(223, 20, 225, 96, hex('#e0dcd0')); rect(198, 54, 250, 56, hex('#e0dcd0'));
  for (const [xa, xb, lado] of [[184, 199, -1], [249, 264, 1]]) for (let y = 15; y <= 132; y++) { const ata = 74, g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(xb - xa + 1 - g * 6), sw = y > ata ? Math.round(Math.sin(t * 0.8 + xa * 0.1 + y * 0.05) * (y - ata) / 36) : 0, x0 = lado < 0 ? xa + sw : xb - w + 1 + sw;
    for (let x = x0; x < x0 + w; x++) pset(x, y, [hex('#8a3038'), hex('#6e2430'), hex('#561a24'), hex('#6e2430')][(x - x0 + (lado < 0 ? 0 : 2)) % 4]); pset(lado < 0 ? x0 + w : x0 - 1, y, hex('#2a0c10')); if (y === ata) rect(x0, y, x0 + w - 1, y + 1, hex('#c89838')); }
  R.numero(String(o.dia ?? 21), 153, 52, { color: hex('#1a1a1a'), centro: true, sombra: false, tam: 16 });
  // el aplique sobre el cuadro
  { const fl = 0.38 + noche * 0.3 + 0.04 * Math.sin(t * 5); c_aclara(R, 110, 40, 22, 20, hex('#f8e0a0'), fl); rect(110, 44, 110, 48, hex('#a88030')); rect(106, 44, 114, 44, hex('#a88030')); for (const dx of [-4, 4]) { rect(110 + dx - 2, 38, 110 + dx + 2, 42, hex('#f0e0b8')); rect(110 + dx - 2, 42, 110 + dx + 2, 42, hex('#c8b088')); pset(110 + dx, 43, hex('#fff8d0')); } }
  // una mosca que da vueltas a la lámpara del techo (se ve su sombra en la pared)
  { const a = t * 2.3, x = Math.round(150 + Math.cos(a) * 22 + Math.sin(a * 2.7) * 4), y = Math.round(78 + Math.sin(a) * 7); pset(x, y, hex('#1a1a1a')); if (Math.sin(t * 40) > 0) pset(x - 1, y - 1, hex('#8a8a9a')); }
  return { suelo: 120, borde: 117, cartucho: [238, 164], contrato: [150, 172], lampara: [284, 120], ventana: [198, 250, 20, 96], calendario: [140, 166, 26, 60] };
}

// la mesa de cerca, por delante de los personajes de detrás: el borde de madera, el tapete verde con su pelusa y el
// charco de luz de la lámpara de banquero (la pantalla de cristal verde, la cadenita, la base de latón); encima, el
// cartucho genérico bajo la luz (o.cartucho, true por omisión; o.colorCartucho), el contrato (o.contrato, true por
// omisión, con o.casillas, o.firma, o.sello), los papeles, las gafas, los vasos de té que humean, el ábaco
// (o.abaco) y el cenicero
function c_mesaCerca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, PZ = PIEZAS_TS;
  rect(0, 117, 319, 118, hex('#2a1408')); rect(0, 119, 319, 121, hex('#8a5a34')); rect(0, 119, 319, 119, hex('#b07a48')); for (let x = 0; x < 320; x += 7) pset(x + 3, 120, hex('#6a4024'));
  for (let y = 122; y <= 179; y++) for (let x = 0; x <= 319; x++) { const n = h(x, y, 360); let c = n < 0.2 ? hex('#245a32') : n > 0.94 ? hex('#3e8a52') : hex('#2e6e3e'); if (((x * 7 + y * 3) % 13 === 0) && n < 0.6) c = hex('#286436'); if (y < 126) c = c_mez(c, hex('#000000'), 0.25); pset(x, y, c); }
  c_aclara(R, 240, 154, 70, 26, hex('#e8e098'), 0.5);
  // los papeles y una carpeta
  poligono([[50, 150], [92, 146], [96, 172], [52, 176]], hex('#c8c0a8')); poligono([[52, 148], [94, 145], [97, 170], [54, 173]], hex('#f2efe4')); for (let k = 0; k < 6; k++) linea(58, 153 + k * 3, 88, 150 + k * 3, k === 0 ? hex('#3a3a5a') : hex('#8a8aa0'));
  rect(100, 158, 128, 177, hex('#a8885a')); rect(100, 158, 128, 159, hex('#c8a870')); rect(112, 158, 113, 177, hex('#e8e8e8'));
  // las gafas de leer
  disco(176, 150, 3, hex('#1a1a1a')); disco(176, 150, 2, hex('#7aa0a8')); disco(185, 150, 3, hex('#1a1a1a')); disco(185, 150, 2, hex('#7aa0a8')); rect(179, 149, 182, 149, hex('#1a1a1a')); linea(173, 149, 168, 146, hex('#1a1a1a')); pset(175, 149, hex('#ffffff'));
  // el contrato
  if (o.contrato !== false) { rect(141, 147, 164, 174, c_mez(R.pget(150, 160), hex('#000000'), 0.35)); PZ.contrato?.(R, 150, 172, { casillas: o.casillas ?? [1, 0, 0], firma: o.firma, sello: o.sello }); }
  // los vasos de té con su soporte de metal y el vapor
  for (const [vx, vy, k] of [[30, 134, 0], [204, 132, 1]]) { rect(vx - 4, vy, vx + 4, vy + 8, hex('#a85a20')); rect(vx - 4, vy, vx + 4, vy + 1, hex('#d8a060')); rect(vx - 3, vy + 2, vx - 3, vy + 7, hex('#e8c090')); rect(vx - 5, vy + 8, vx + 5, vy + 13, hex('#a8a8b0')); rect(vx - 5, vy + 8, vx + 5, vy + 8, hex('#e0e0e8')); for (let x = vx - 4; x <= vx + 4; x += 2) pset(x, vy + 10, hex('#7a7a84')); rect(vx + 6, vy + 3, vx + 7, vy + 10, hex('#a8a8b0')); rect(vx + 6, vy + 3, vx + 6, vy + 3, hex('#e0e0e8')); linea(vx + 2, vy - 1, vx + 5, vy - 9, hex('#c8c8d0'));
    for (let i = 0; i < 4; i++) { const u = (t * 0.45 + i / 4 + k * 0.3) % 1, r = 1 + u * 2.5, sx = vx - 1 + Math.sin(u * 6 + t + k) * 2.5, sy = vy - 2 - u * 22; for (let yy = Math.floor(sy - r); yy <= sy + r; yy++) for (let xx = Math.floor(sx - r); xx <= sx + r; xx++) if (Math.hypot(xx - sx, yy - sy) < r && c_b4(xx, yy) < 0.75 - u * 0.65) pset(xx, yy, c_mez(R.pget(xx, yy), hex('#ffffff'), 0.5)); } }
  // el ábaco de madera con sus cuentas
  if (o.abaco !== false) { rect(10, 150, 46, 176, hex('#4a2a14')); rect(12, 152, 44, 174, hex('#d8c898')); for (let r = 0; r < 6; r++) { const y = 155 + r * 3.4 | 0; rect(12, y, 44, y, hex('#6a6a6a')); const n = (r * 3 + Math.floor(t / 1.5)) % 7; for (let b = 0; b < 7; b++) { const x = 13 + b * 3 + (b >= n ? 9 : 0); rect(x, y - 1, x + 2, y + 1, r === 2 ? hex('#3a2010') : hex('#c84a2a')); pset(x, y - 1, r === 2 ? hex('#6a4024') : hex('#f08060')); } } rect(12, 162, 44, 162, hex('#4a2a14')); }
  // el cenicero
  disco(130, 136, 6, hex('#4a5a6a')); disco(130, 135, 5, hex('#7a8a9a')); disco(130, 136, 3, hex('#3a4450')); rect(127, 134, 134, 135, hex('#e8e4d8')); pset(134, 134, Math.sin(t * 4) > 0 ? hex('#ff6a2a') : hex('#c84a1a'));
  for (let i = 0; i < 6; i++) { const u = (t * 0.32 + i / 6) % 1, sx = Math.round(134 + Math.sin(u * 8 + t * 0.6) * (1 + u * 4)), sy = Math.round(132 - u * 26); if (c_b4(sx, sy) < 0.7 - u * 0.5) pset(sx, sy, c_mez(R.pget(sx, sy), hex('#c8ccd4'), 0.5)); }
  // el cartucho bajo la lámpara, con su sombra
  if (o.cartucho !== false) { rect(232, 162, 246, 165, c_mez(R.pget(238, 163), hex('#000000'), 0.45)); PZ.cartucho?.(R, 238, 164, { color: o.colorCartucho }); }
  // la lámpara de banquero: base de latón, el mástil, la pantalla verde con su brillo y la cadenita que se mece
  rect(272, 150, 298, 156, hex('#5a4010')); rect(273, 150, 297, 154, hex('#c89838')); rect(273, 150, 297, 150, hex('#f0c860')); rect(282, 128, 286, 150, hex('#a88030')); rect(282, 128, 282, 150, hex('#f0c860'));
  poligono([[266, 130], [270, 119], [298, 119], [302, 130]], hex('#0e3a1e')); poligono([[268, 129], [271, 120], [297, 120], [300, 129]], hex('#1e7a3e')); rect(271, 121, 296, 122, hex('#4ab86a')); rect(274, 121, 280, 121, hex('#a8f0b8')); rect(266, 130, 302, 131, hex('#c89838'));
  for (let x = 270; x < 300; x++) pset(x, 132, hex('#fff4c8'));
  { const sw = Math.round(Math.sin(t * 1.7) * 1.5); linea(296, 131, 296 + sw, 140, hex('#c89838')); disco(296 + sw, 141, 1, hex('#f0c860')); }
  return {};
}

// lo fijo del pasillo (búfer): la pared encalada con manchas, el zócalo de pintura verde con su brillo, el rodapié, el
// parqué y la alfombra roja con cenefa, la ventana del extremo con su radiador, las tres puertas con su marco y el
// despacho de dentro (las hojas las pinta c_pasillo), el banco, el tablón, el cuadro de honor, el extintor y el ficus
function c_pasilloFijo(R) {
  const { rect, pset, disco, linea, poligono } = R;
  for (let y = 0; y <= 95; y++) for (let x = 0; x <= 319; x++) { const n = h(x >> 2, y >> 2, 370); let c = n < 0.3 ? hex('#cfcbbc') : hex('#d8d4c4'); if (h(x >> 4, y >> 3, 371) < 0.06) c = hex('#c4bea8'); if (y < 30) c = c_mez(c, hex('#8a8878'), (30 - y) / 60 + c_b4(x, y) * 0.05); pset(x, y, c); }
  rect(0, 95, 319, 96, hex('#2a4a38'));
  // la moldura del techo, el tubo de la calefacción con sus abrazaderas, el cable de la luz con sus aisladores y la rejilla de ventilación
  rect(0, 0, 319, 4, hex('#e4e0d0')); rect(0, 5, 319, 5, hex('#a8a494')); rect(0, 6, 319, 6, hex('#bab6a6'));
  // (el tubo y el cable acaban antes de x 272: la esquina de arriba a la derecha queda de pared tranquila para Atom)
  rect(0, 22, 263, 24, hex('#8a8a80')); rect(0, 22, 263, 22, hex('#b8b8ac')); rect(0, 24, 263, 24, hex('#5a5a54')); for (let x = 12; x < 260; x += 40) { rect(x, 21, x + 2, 25, hex('#4a4a44')); rect(x + 1, 26, x + 1, 27, hex('#4a4a44')); }
  // el codo del tubo, que sube y se mete en la moldura del techo con su collarín
  rect(264, 7, 266, 24, hex('#8a8a80')); rect(264, 7, 264, 22, hex('#b8b8ac')); rect(266, 7, 266, 24, hex('#5a5a54')); pset(263, 22, hex('#b8b8ac')); pset(265, 24, hex('#5a5a54'));
  rect(262, 7, 268, 8, hex('#4a4a44')); rect(262, 7, 268, 7, hex('#6a6a64')); rect(263, 14, 267, 15, hex('#4a4a44'));
  // el cable de la luz con sus aisladores: termina en el último aislador, baja por la pared y entra en la caja de empalmes
  for (let x = 0; x <= 240; x++) pset(x, 32 + Math.round(Math.abs(Math.sin(x / 30 * Math.PI)) * 2), hex('#3a3a3a')); for (let x = 0; x <= 240; x += 30) { rect(x - 1, 31, x + 1, 33, hex('#f0ece0')); pset(x, 34, hex('#a8a498')); }
  for (let y = 33; y <= 42; y++) pset(241 + Math.round(Math.max(0, y - 40) * 0.5), y, hex('#3a3a3a'));
  rect(239, 43, 248, 50, hex('#6a6a5e')); rect(240, 44, 247, 49, hex('#a8a48e')); rect(240, 44, 247, 44, hex('#c8c4ae')); rect(247, 45, 247, 49, hex('#7a766a')); pset(243, 46, hex('#4a4a44')); pset(244, 47, hex('#4a4a44')); rect(240, 51, 247, 51, hex('#bcb8a6'));
  rect(142, 44, 160, 52, hex('#8a8678')); for (let y = 45; y < 52; y += 2) rect(143, y, 159, y, hex('#4a4a44'));
  for (const [x, y, rx] of [[70, 40, 14], [250, 82, 10]]) for (let j = -6; j <= 6; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 6) ** 2 < 1 && c_b4(x + i, y + j) < 0.35) pset(x + i, y + j, hex('#c0b898'));
  for (let y = 97; y <= 139; y++) for (let x = 0; x <= 319; x++) { let c = hex('#3a5a48'); if (Math.abs(((x + y * 0.3) % 37) - 18) < 1.2 && y < 128) c = hex('#4e7260'); else if (h(x >> 1, y >> 3, 372) < 0.1) c = hex('#30503e'); if (y === 97) c = hex('#5a7e6a'); pset(x, y, c); }
  rect(0, 140, 319, 143, hex('#4a3020')); rect(0, 140, 319, 140, hex('#6a4a30'));
  c_parquet(R, 0, 319, 144, 179);
  for (let y = 150; y <= 172; y++) for (let x = 0; x <= 319; x++) { const b = Math.min(y - 150, 172 - y); let c = hex('#8a2a28'); if (b === 0) c = hex('#4a1814'); else if (b < 2) c = hex('#c8a050'); else if (b < 4) c = hex('#2a5a3a'); else if (h(x, y, 373) < 0.12) c = hex('#7a2420'); else if (Math.abs(((x * 0.5) % 16) - 8) < 0.6 && b > 5) c = hex('#9a3a34'); if (Math.abs(y - 161) < 4 && h(x >> 2, y, 374) < 0.3) c = c_mez(c, hex('#5a3a30'), 0.3); pset(x, y, c); }
  // la ventana del extremo izquierdo (hueco vacío: lo pinta c_pasillo) y su radiador
  rect(4, 28, 36, 90, hex('#b8b4a8')); rect(5, 29, 35, 89, hex('#e0dcd0')); rect(8, 32, 32, 86, 0); rect(2, 89, 38, 92, hex('#e8e4d8'));
  rect(8, 104, 32, 124, hex('#4a4a48')); for (let x = 9; x < 32; x += 3) { rect(x, 105, x + 1, 123, hex('#d8d0b8')); pset(x + 1, 105, hex('#a8a090')); }
  // las tres puertas: el marco pintado y el despacho de dentro (pared, ventana con luz, mesa, lámpara)
  for (const cx of [60, 160, 256]) { const a = cx - 16, b = cx + 16;
    rect(a - 4, 94, b + 4, 143, hex('#8a8678')); rect(a - 3, 95, b + 3, 143, hex('#d0ccbc')); rect(a - 3, 95, b + 3, 95, hex('#e8e4d4')); rect(b + 3, 95, b + 3, 143, hex('#9a9684'));
    for (let y = 98; y <= 143; y++) for (let x = a; x <= b; x++) pset(x, y, y > 132 ? hex('#7a5030') : c_mez(hex('#d8c898'), hex('#b8a070'), (y - 98) / 34 + c_b4(x, y) * 0.1));
    rect(a + 14, 104, b - 2, 120, hex('#e0dcd0')); rect(a + 15, 105, b - 3, 119, hex('#a8c0d8')); rect(a + 15, 112, b - 3, 112, hex('#e0dcd0')); for (let k = 0; k < 4; k++) pset(a + 17 + k * 3, 106 + (k * 5) % 12, hex('#ffffff'));
    rect(a + 2, 124, a + 22, 126, hex('#5a3a22')); rect(a + 4, 127, a + 5, 140, hex('#3a2212')); rect(a + 19, 127, a + 20, 140, hex('#3a2212')); rect(a + 6, 118, a + 7, 123, hex('#2a2a2a')); rect(a + 3, 115, a + 10, 118, hex('#2a6a3a')); rect(a + 12, 121, a + 18, 123, hex('#f0ece0')); }
  // el banco de madera con un gato que duerme
  rect(86, 126, 128, 128, hex('#7a4a2a')); rect(86, 126, 128, 126, hex('#9a6a3a')); rect(86, 131, 128, 132, hex('#6a4024')); for (const lx of [89, 125]) rect(lx, 129, lx + 1, 143, hex('#3a2212')); rect(86, 114, 128, 116, hex('#7a4a2a')); rect(86, 114, 128, 114, hex('#9a6a3a')); for (const lx of [88, 126]) rect(lx, 114, lx + 1, 126, hex('#5a3420'));
  // el tablón de corcho con hojas y un cartel de pictogramas
  rect(90, 60, 124, 88, hex('#5a3a1a')); for (let y = 61; y <= 87; y++) for (let x = 91; x <= 123; x++) pset(x, y, h(x, y, 375) < 0.3 ? hex('#a87a48') : hex('#c09060'));
  for (const [x, y, w, hh, c] of [[93, 63, 9, 12, '#f4f2ea'], [104, 62, 8, 10, '#e8e0c0'], [114, 64, 8, 11, '#f4f2ea'], [95, 77, 12, 9, '#d8e8f0'], [110, 76, 11, 10, '#f8e8b0']]) { rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#7a5a3a')); rect(x, y, x + w, y + hh, hex(c)); for (let j = y + 3; j < y + hh - 1; j += 2) rect(x + 2, j, x + w - 2 - (j % 3), j, hex('#8a8aa0')); pset(x + Math.round(w / 2), y, hex('#c83a3a')); }
  R.icono('estrella', 98, 78, hex('#c83a3a'), null, 1);
  // el cuadro de honor: marco dorado y seis retratitos sin rasgos
  rect(190, 52, 232, 90, hex('#5a4010')); rect(191, 53, 231, 89, hex('#c89838')); rect(193, 55, 229, 87, hex('#7a1e22'));
  for (let k = 0; k < 6; k++) { const x = 196 + (k % 3) * 11, y = 58 + Math.floor(k / 3) * 15; rect(x, y, x + 8, y + 11, hex('#e8e4d8')); rect(x + 1, y + 1, x + 7, y + 10, hex('#8a8a84')); disco(x + 4, y + 4, 2, hex('#c8c4b8')); rect(x + 2, y + 7, x + 6, y + 10, hex('#4a4a50')); }
  // el reloj redondo sobre la puerta del medio
  disco(160, 76, 7, hex('#2a2a2a')); disco(160, 76, 6, hex('#f0ece0')); for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; pset(Math.round(160 + Math.cos(an) * 5), Math.round(76 + Math.sin(an) * 5), hex('#3a3a3a')); }
  // el extintor colgado
  rect(132, 116, 137, 134, hex('#8a1a1a')); rect(133, 116, 136, 134, hex('#c83a2a')); rect(133, 117, 133, 133, hex('#e8645a')); rect(133, 113, 136, 115, hex('#2a2a2a')); linea(137, 114, 140, 126, hex('#1a1a1a')); rect(131, 120, 138, 120, hex('#4a4a4a'));
  // el ficus en su maceta
  rect(290, 130, 304, 143, hex('#8a4a2a')); rect(289, 129, 305, 130, hex('#a85a34')); rect(291, 131, 292, 142, hex('#b86a40')); rect(296, 104, 297, 129, hex('#4a3020'));
  for (let k = 0; k < 18; k++) { const x = Math.round(296 + (h(k, 1, 376) - 0.5) * 24), y = Math.round(96 + h(k, 2, 376) * 30); R.disco(x, y, 2, k % 3 ? hex('#2a6a3a') : hex('#3a8a4a')); pset(x - 1, y - 1, hex('#5aa86a')); }
}

// un gato gris atigrado que duerme enroscado (x, y: el centro de su base), con la respiración y la cola que se mueve
function c_gatoDuerme(R, x, y, t) {
  const r = Math.sin(t * 2) > 0 ? 1 : 0, G = hex('#7a7a84'), GS = hex('#54545e'), GL = hex('#9a9aa4');
  for (let j = 0; j < 5 + r; j++) { const w = Math.round(7 - Math.abs(j - 2.5) * 0.9); R.rect(x - w, y - j, x + w, y - j, j === 0 ? GS : G); }
  for (let i = -5; i <= 5; i += 3) R.pset(x + i, y - 3, GS); R.pset(x - 4, y - 5 - r, GL); R.disco(x + 6, y - 2, 2, G); R.pset(x + 5, y - 5, G); R.pset(x + 7, y - 5, G); R.rect(x + 5, y - 2, x + 7, y - 2, GS);
  const c = Math.round(Math.sin(t * 1.3) * 2); R.linea(x - 7, y, x - 9, y - 2 + c, G); R.pset(x - 9, y - 3 + c, GS);
  if ((t % 6) < 3) { const u = (t % 3) / 3; R.pset(x + 8 + Math.round(u * 3), y - 7 - Math.round(u * 6), hex('#8a8aa0')); }
}

// el pasillo de la agencia (ver la cabecera de moscu, cámara 'pasillo'); o.puertas [a, b, c] (0–1)
function c_pasillo(R, t, o) {
  const { rect, pset, disco } = R, hora = Math.max(0, Math.min(1, o.hora ?? 0.15)), P = o.puertas ?? [0, 0, 0];
  R.copiar(c_capa(R, 'mz-pasillo', () => c_pasilloFijo(R)));
  c_ventanaHora(R, t, 8, 32, 32, 86, hora); rect(19, 32, 21, 86, hex('#e0dcd0')); rect(8, 58, 32, 59, hex('#e0dcd0'));
  // las hojas acolchadas de las puertas (con botones de latón en rombo, el número en su placa, el tirador y la mirilla),
  // que se abren hacia dentro según o.puertas; la luz del despacho sale al suelo
  [60, 160, 256].forEach((cx, i) => { const a = cx - 16, b = cx + 16, ab = Math.max(0, Math.min(1, P[i] ?? 0)), w = Math.round(32 * (1 - ab * 0.85));
    if (ab > 0) c_aclara(R, cx, 150, 22 * ab + 4, 5, hex('#f0d090'), 0.5 * ab);
    for (let y = 98; y <= 143; y++) for (let x = a; x <= a + w; x++) { const u = (x - a) / Math.max(1, w), q = ((x - a) + (y - 98)) % 8, r2 = ((x - a) - (y - 98) + 80) % 8; let c = ab > 0 ? c_mez(hex('#6a2a24'), hex('#3a1410'), ab * 0.5) : hex('#6a2a24'); if (q === 0 || r2 === 0) c = c_mez(c, hex('#000000'), 0.3); else if (q === 1) c = c_mez(c, hex('#ffffff'), 0.1); if (q === 0 && r2 === 0) c = hex('#c8a040'); if (x === a + w) c = hex('#2a0c08'); pset(x, y, c); }
    if (ab < 0.5) { const px = a + Math.round(w * 0.5); rect(px - 3, 104, px + 3, 108, hex('#c89838')); rect(px - 2, 105, px + 2, 107, hex('#f0d878')); R.numero(String(i + 1), px, 108, { color: hex('#3a2a10'), centro: true, sombra: false, fina: true }); pset(px, 112, hex('#141414')); rect(a + w - 4, 120, a + w - 2, 121, hex('#c89838')); pset(a + w - 4, 120, hex('#fff0b0')); } });
  // los apliques de globo (el de la derecha parpadea y zumba)
  for (const [x, k] of [[136, 0], [236, 1]]) { const on = k === 0 || !((t % 4.7) < 0.5 && Math.floor(t * 18) % 2); rect(x - 1, 64, x + 1, 66, hex('#a88030')); rect(x, 66, x, 68, hex('#a88030'));
    if (on) c_aclara(R, x, 60, 22, 18, hex('#fff4d0'), 0.45); disco(x, 60, 4, on ? hex('#f8f0d8') : hex('#b8b4a8')); if (on) { pset(x - 1, 58, hex('#ffffff')); pset(x - 2, 59, hex('#ffffff')); } }
  // las agujas del reloj
  R.linea(160, 76, Math.round(160 + Math.sin(t * 0.6) * 4), Math.round(76 - Math.cos(t * 0.6) * 4), hex('#1a1a1a')); R.linea(160, 76, Math.round(160 + Math.sin(2 + t * 0.05) * 3), Math.round(76 - Math.cos(2 + t * 0.05) * 3), hex('#1a1a1a')); if (Math.floor(t) % 2) pset(Math.round(160 + Math.sin(t * 6.28) * 4), Math.round(76 - Math.cos(t * 6.28) * 4), hex('#c83a3a'));
  // el gato que duerme en el banco
  c_gatoDuerme(R, 110, 125, t);
  return { suelo: 156, umbral: 143, puertas: [[44, 76], [144, 176], [240, 272]], banco: [86, 128, 126], ventana: [8, 32, 32, 86] };
}

// qué encuadre pide o: [fondo, delante]
function d_cualGuerra(o) {
  const cam = o.camara && o.camara !== 'general';
  if (o.camara === 'almacen') return [d_almacen, d_almacenDelante];
  if (o.camara === 'autobus') return [d_autobus, d_autobusDelante];
  if (o.encuadre === 'jugueteria') return cam ? [d_autobus, d_autobusDelante] : [d_jugueteria, d_jugueteriaDelante];
  return cam ? [d_almacen, d_almacenDelante] : [d_juzgado, d_juzgadoDelante];
}

// la paleta de D: el nogal y el mármol del juzgado, el cartón de las cajas, el cielo de verano, la chapa del almacén, la
// juguetería y el autobús
const D = pal({
  k: '#1c1222', nog: '#6e4426', nogL: '#8e5c34', nogS: '#4e2e18', nogV: '#5e3820', nogD: '#3a2010',
  marmol: '#e2d8c4', marmolS: '#d0c4ac', marmolV: '#bcae94', marmolL: '#f0e8d8', techo: '#e8dec8', techoS: '#d2c6ac', techoD: '#bcae92',
  parquet: '#b07a46', parquetS: '#93613a', parquetL: '#c8935e', parquetD: '#7a4c2a', alfombra: '#8a2a30', alfombraS: '#681c24', alfombraL: '#a83a40',
  cuero: '#5e2228', cueroL: '#7e343a', cueroS: '#40161a', bronce: '#a8743a', bronceL: '#d0a058', bronceS: '#6e4620', campo: '#24463a', campoL: '#2e5a4a',
  oro: '#d8a838', oroL: '#f6dc78', oroS: '#9a7020', rojo: '#c8302a', rojoS: '#8e1e1c', rojoL: '#e85a4a', blanco: '#f4f0e6', blancoS: '#cfc8bc',
  azul: '#2a4a8e', azulS: '#1c3366', azulL: '#4a6ab0', verde: '#3a7a4a', verdeS: '#24563a', verdeL: '#5aa064',
  carton: '#c8a06a', cartonS: '#9a7444', cartonL: '#e0bc84', cartonD: '#7a5832', cinta: '#e2d4a4', grisC: '#9a9ca4', grisCS: '#6a6c76',
  cielo0: '#5a9ad8', cielo1: '#7ab4e8', cielo2: '#a4d0f2', nube: '#ffffff', nubeM: '#e4eef8', nubeS: '#bccee2', nubeF: '#d4e2f0',
  torre0: '#8a9ab4', torre1: '#a4b2c8', torreS: '#6e7c96', torreV: '#c8dcec', ladrillo: '#a8584a', ladrilloS: '#844236', hoja: '#3a8a3a', hojaL: '#5aaa4a', hojaS: '#246a2a', tronco: '#5a3a24',
  cristal: '#c8dce4', agua: '#8ab8d8', piel: '#f0b890', pielS: '#c88a64', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#d0d8e2', metalD: '#4a5262',
  chapa: '#9aa8a4', chapaS: '#7e8c88', chapaL: '#b4c0bc', chapaD: '#5e6a68', acero: '#4a5466', aceroL: '#6a768a', aceroS: '#323a48',
  naranja: '#e07a2a', naranjaS: '#a8541a', naranjaL: '#f49a4a', azulR: '#2a5aa8', azulRS: '#1c3e7a', hormigon: '#a8a69e', hormigonS: '#908e86', hormigonL: '#bcbab2',
  amarillo: '#f0c43a', amarilloS: '#b8901e', amarilloL: '#ffe07a', negro: '#2a2a32',
  placa: '#eeeae0', placaS: '#d8d2c4', baldosa: '#ece4d0', baldosaS: '#d4cab4', baldosa2: '#3aa8a0', baldosa2S: '#2a8880', rosa: '#e86aa0', turquesa: '#3ac8c0', violeta: '#8a5ac8',
  tela: '#2e4a8a', telaS: '#22386a', telaL: '#4a6aa8', goma: '#4a4c54', gomaS: '#36383e', gomaL: '#5e6068', crema: '#e8e0cc', cremaS: '#c8bea8',
});

const d_PICTO = [D.rojo, D.azulL, D.verdeL, D.amarillo, D.rosa, D.turquesa];

// mezcla el píxel (x, y) con un color (m 0–1): luces, reflejos y penumbras sobre lo ya pintado (como h_aclara del 11)
function d_aclara(R, x, y, m, [cr, cg, cb] = [255, 244, 214]) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * m) << 16) | (Math.round(g + (cg - g) * m) << 8) | Math.round(r + (cr - r) * m)) >>> 0);
}

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function d_rr(R, cl, x0, y0, x1, y1, c) {
  R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c);
}

// un fondo fijo: se pinta una vez por lienzo y clave en un búfer de R.nuevo() y se copia en cada fotograma
const d_CACHE = new WeakMap();

function d_fijo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un cuarterón de madera en relieve: bisel con luz arriba a la izquierda y sombra abajo a la derecha, el campo y dos vetas
function d_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// una nube de tres tonos (luz arriba, medio, sombra en la base plana) recortada a cl; w: medio ancho
function d_nube(R, cl, cx, cy, w, [cL, cM, cS]) {
  const hh = Math.max(3, Math.round(w * 0.42));
  for (let j = -hh; j <= Math.round(hh * 0.5); j++) for (let i = -w; i <= w; i++) {
    const x = Math.round(cx + i), y = Math.round(cy + j); if (x < cl[0] || x > cl[2] || y < cl[1] || y > cl[3]) continue;
    const b1 = (i / w) ** 2 + (j / (hh * 0.7)) ** 2, b2 = ((i + w * 0.3) / (w * 0.5)) ** 2 + ((j + hh * 0.35) / (hh * 0.85)) ** 2, b3 = ((i - w * 0.28) / (w * 0.45)) ** 2 + ((j + hh * 0.55) / (hh * 0.75)) ** 2;
    if (Math.min(b1, b2, b3) > 1) continue;
    R.pset(x, y, j > hh * 0.15 ? cS : (b2 < 0.55 || b3 < 0.5) && j < -hh * 0.2 ? cL : cM);
  }
}

// el cielo de verano dentro de cl: degradado tramado en tres tonos, nubes de tres tonos a tres velocidades (vel las
// acelera, para el autobús) y, de vez en cuando, dos pájaros que cruzan; sem cambia la colocación
function d_cielo(R, cl, t, vel = 1, sem = 0) {
  const [x0, y0, x1, y1] = cl, H = y1 - y0 + 1, cs = [D.cielo0, D.cielo1, D.cielo2];
  for (let y = y0; y <= y1; y++) { const u = Math.min(1.99, (y - y0) / H * 2.4), a = Math.floor(u), f = u - a;
    for (let x = x0; x <= x1; x++) R.pset(x, y, (f > 0.66 || (f > 0.33 && (x + y) % 2 === 0)) ? cs[a + 1] : cs[a]); }
  for (let k = 0; k < 6; k++) { const capa = k % 3, w = 5 + capa * 3 + Math.round(h(k, 1, sem) * 4), span = (x1 - x0) + 2 * w + 30,
    cx = x0 - w - 15 + ((h(k, 2, sem) * span + t * (0.5 + capa * 0.9) * vel) % span), cy = y0 + 4 + h(k, 3, sem) * Math.max(4, H * 0.35) + capa * 2;
    d_nube(R, cl, cx, cy, w, capa === 0 ? [D.nubeF, D.nubeF, D.nubeS] : capa === 1 ? [D.nube, D.nubeM, D.nubeS] : [D.nube, D.nube, D.nubeM]); }
  const u = ((t + sem * 3.1) % 9) / 3.4; if (u < 1) for (let k = 0; k < 2; k++) { const bx = Math.round(x1 + 3 - u * (x1 - x0 + 10) + k * 5), by = Math.round(y0 + 6 + k * 2 + Math.sin(u * 9 + k) * 1.5), al = Math.floor(t * 8 + k) % 2;
    for (const [dx, dy] of [[0, 0], [-1, -al], [1, -al]]) { const xx = bx + dx, yy = by + dy; if (xx >= x0 && xx <= x1 && yy >= y0 && yy <= y1) R.pset(xx, yy, D.k); } }
}

// una figurita de fondo (10 px) que anda o trabaja: cabeza, pelo, ropa y piernas que se alternan; carga: lleva una caja
function d_figura(R, x, suelo, t, ropa, pelo, anda = true, carga = false, cl = null) {
  const p = (xx, yy, c) => { if (!cl || (xx >= cl[0] && xx <= cl[2] && yy >= cl[1] && yy <= cl[3])) R.pset(xx, yy, c); };
  const fr = (a, b, c, d, col) => { for (let yy = b; yy <= d; yy++) for (let xx = a; xx <= c; xx++) p(xx, yy, col); };
  x = Math.round(x); const paso = anda ? Math.floor(t * 6 + x * 0.1) % 2 : 0, y = suelo - 10;
  fr(x - 1, y, x + 1, y + 2, D.piel); fr(x - 1, y - 1, x + 1, y - 1, pelo); p(x - 1, y, pelo);
  fr(x - 2, y + 3, x + 2, y + 6, ropa); p(x + 2, y + 6, D.k);
  fr(x - 1, y + 7, x - 1, y + 9 - paso, D.negro); fr(x + 1, y + 7, x + 1, y + 9 - (1 - paso), D.negro);
  if (carga) { fr(x - 3, y + 2, x + 3, y + 6, D.carton); fr(x - 3, y + 2, x + 3, y + 2, D.cartonL); fr(x + 3, y + 3, x + 3, y + 6, D.cartonS); }
}

// una caja de cartón de cartuchos (x, y: esquina de arriba a la izquierda; w × hh): luz arriba, sombra a la derecha y abajo,
// la cinta de embalar, el pictograma del cartucho (gris con su franja de color, sin letras), una mancha y, con prueba, la
// pegatina roja de las pruebas
function d_caja(R, x, y, w, hh, k = 0, prueba = false) {
  const { rect, pset } = R; x = Math.round(x); y = Math.round(y);
  rect(x, y, x + w - 1, y + hh - 1, D.k); rect(x + 1, y + 1, x + w - 2, y + hh - 2, D.carton);
  rect(x + 1, y + 1, x + w - 2, y + 1, D.cartonL); rect(x + 1, y + 1, x + 1, y + hh - 2, D.cartonL);
  rect(x + w - 3, y + 2, x + w - 2, y + hh - 2, D.cartonS); rect(x + 2, y + hh - 2, x + w - 2, y + hh - 2, D.cartonS);
  const cx = x + (w >> 1); rect(cx - 1, y + 1, cx, Math.min(y + 3, y + hh - 2), D.cinta);
  if (w >= 10 && hh >= 8) { const px = x + 3, py = y + hh - 7; rect(px, py, px + 4, py + 4, D.grisCS); rect(px, py, px + 3, py + 3, D.grisC); rect(px + 1, py + 1, px + 2, py + 1, d_PICTO[k % 6]); }
  if (h(k, 1, 9) > 0.5) pset(x + 2 + Math.floor(h(k, 2, 9) * (w - 5)), y + 3 + Math.floor(h(k, 3, 9) * (hh - 5)), D.cartonD);
  if (prueba && w >= 10) { rect(x + w - 7, y + 3, x + w - 4, y + 5, D.rojo); pset(x + w - 7, y + 3, D.rojoL); }
}

// las 12 cajas: en el montón (x, y de la esquina, w, h) y en la fila perfecta (dos alturas de seis)
const d_MONTON = [[224, 113, 14, 10], [236, 115, 10, 14], [249, 114, 14, 10], [262, 112, 14, 12], [278, 114, 14, 10], [293, 113, 14, 11],
  [229, 103, 14, 10], [244, 98, 10, 14], [255, 102, 14, 10], [270, 99, 14, 13], [284, 104, 14, 10], [262, 89, 14, 10]];

const d_FILA = Array.from({ length: 12 }, (_, i) => [222 + (i % 6) * 15, i < 6 ? 114 : 104, 14, 10]);

// el público de espaldas en la fila de delante: x, color de pelo, de ropa
const d_NUCAS = [[8, '#3a2418', '#4a6aa8'], [30, '#c8a060', '#8a4a4a'], [54, '#1c1424', '#5a7a5a'], [80, '#8c8ca0', '#6a5a8a'], [104, '#6a3a1a', '#a87a3a'],
  [214, '#2a1e1a', '#3a5a7a'], [238, '#d8b860', '#a85a6a'], [262, '#5a3a24', '#4a4a5a'], [288, '#1c1424', '#7a8a4a'], [312, '#a8704a', '#5a4a6a']];

function d_juzgado(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = D.k;
  d_fijo(R, 'juzgado', () => {
    // el techo de casetones en penumbra (oscuro y tranquilo bajo la barra del año): vigas de nogal tostado, el fondo
    // hundido de cada casetón, un filo de luz abajo (lo alumbran las lámparas desde abajo) y un florón apagado
    rect(0, 0, 319, 10, hex('#4a3828')); for (let y = 0; y < 9; y++) for (let x = 0; x < 320; x++) if (h(x, y, 140) > 0.9) pset(x, y, hex('#3e2e20'));
    for (let x = 0; x < 320; x += 32) { rect(x, 0, x + 2, 8, hex('#5a4430')); rect(x + 2, 0, x + 2, 8, hex('#36281c'));
      rect(x + 5, 0, x + 27, 6, hex('#3a2a1e')); rect(x + 6, 0, x + 26, 5, hex('#2e2218')); rect(x + 5, 6, x + 27, 6, hex('#6a5038')); rect(x + 27, 0, x + 27, 6, hex('#5a4430'));
      pset(x + 16, 3, hex('#4a3828')); pset(x + 15, 3, hex('#3a2a1e')); pset(x + 17, 3, hex('#3a2a1e')); }
    rect(0, 7, 319, 7, hex('#5a4430')); rect(0, 8, 319, 8, hex('#7a5e40'));
    rect(0, 9, 319, 9, D.nogS); rect(0, 10, 319, 10, D.nogL); for (let x = 1; x < 320; x += 4) pset(x, 10, D.nog);
    // la pared de mármol veteado, con pilastras y la moldura de abajo
    for (let y = 11; y < 60; y++) for (let x = 0; x < 320; x++) {
      const v = Math.sin(x * 0.045 + y * 0.11 + Math.sin(y * 0.17 + x * 0.021) * 2.2), v2 = Math.sin(x * 0.09 - y * 0.07 + 1.3 + Math.sin(x * 0.05) * 1.5), n = h(x, y, 3);
      pset(x, y, Math.abs(v) < 0.035 || Math.abs(v2) < 0.02 ? D.marmolV : n > 0.9 ? D.marmolS : n < 0.05 ? D.marmolL : D.marmol);
    }
    for (const px of [58, 226]) { rect(px, 11, px + 5, 60, D.marmolL); rect(px + 5, 11, px + 5, 60, D.marmolS); rect(px + 2, 14, px + 2, 57, D.marmolS); }
    rect(0, 57, 319, 57, D.marmolL); rect(0, 58, 319, 59, D.marmolS); rect(0, 60, 319, 61, D.nogS); rect(0, 60, 319, 60, D.nogL);
    // el entablamento de nogal bajo el techo (oscuro y tranquilo detrás del año): la faja, la fila de dentículos en sombra
    // con su filo de luz, el arquitrabe con su veta y el junquillo dorado apagado
    rect(0, 11, 319, 17, D.nogD); rect(0, 11, 319, 11, D.nogS);
    for (let x = 0; x < 320; x += 4) { rect(x, 12, x + 1, 13, D.nogS); pset(x, 14, D.nog); pset(x + 1, 14, D.nogS); }
    rect(0, 15, 319, 15, D.nogS); for (let x = 0; x < 320; x++) if (h(x, 16, 143) > 0.7) pset(x, 16, D.nogS); rect(0, 17, 319, 17, D.nogL); rect(0, 18, 319, 18, D.nog); rect(0, 19, 319, 19, D.k);
    for (let x = 2; x < 320; x += 6) pset(x, 15, D.bronceS);
    // el friso de nogal: dos alturas de cuarterones y el zócalo
    rect(0, 62, 319, 111, D.nog);
    for (let c = 0; c < 15; c++) { const x0 = -4 + c * 22, x1 = x0 + 20; rect(x0, 62, x0, 107, D.nogS);
      d_cuarteron(R, x0 + 3, 65, x1 - 2, 82, D.nog, D.nogL, D.nogS, D.nogV, c); d_cuarteron(R, x0 + 3, 87, x1 - 2, 104, D.nog, D.nogL, D.nogS, D.nogV, c + 20); }
    rect(0, 84, 319, 84, D.nogL); rect(0, 85, 319, 85, D.nogS); rect(0, 106, 319, 106, D.nogL); rect(0, 107, 319, 111, D.nogS); rect(0, 111, 319, 111, D.nogD);
    // el marco del ventanal (pintado de crema) con el alféizar
    rect(6, 20, 58, 96, K); rect(7, 21, 57, 95, D.crema); rect(8, 21, 56, 94, D.cremaS); rect(55, 21, 56, 94, D.techoD);
    rect(3, 94, 61, 99, K); rect(4, 95, 60, 97, D.crema); rect(4, 98, 60, 98, D.cremaS);
    // el respaldo alto de nogal del estrado con sus dos pilastras acanaladas y la cornisa
    rect(112, 12, 208, 90, K); rect(113, 13, 207, 90, D.nog); d_cuarteron(R, 124, 20, 196, 86, D.nog, D.nogL, D.nogS, D.nogV, 40);
    for (const px of [113, 199]) { rect(px, 13, px + 7, 90, D.nogL); rect(px + 1, 16, px + 6, 90, D.nog); for (let i = 0; i < 3; i++) rect(px + 2 + i * 2, 18, px + 2 + i * 2, 88, D.nogS); }
    rect(110, 11, 210, 15, K); rect(111, 12, 209, 13, D.nogL); rect(111, 14, 209, 14, D.nogS); for (let x = 114; x < 208; x += 6) pset(x, 13, D.oro);
    // la luz cálida de arriba sobre el medallón
    for (let y = 16; y < 64; y++) for (let x = 124; x < 197; x++) if ((x + y) % 2 === 0 && ((x - 160) / 36) ** 2 + ((y - 16) / 46) ** 2 < 1) d_aclara(R, x, y, 0.1, [255, 214, 140]);
    // el medallón de bronce: aro con hojas de laurel, campo verde oscuro y la balanza grande dorada (sin letras ni estrellas)
    { const sx = 160, sy = 38;
      disco(sx, sy, 18, K); disco(sx, sy, 17, (x, y) => (x + y < sx + sy - 8 ? D.bronceL : x + y > sx + sy + 9 ? D.bronceS : D.bronce));
      for (let k = 0; k < 26; k++) { const a = k / 26 * Math.PI * 2; pset(Math.round(sx + Math.cos(a) * 15), Math.round(sy + Math.sin(a) * 15), D.bronceS); pset(Math.round(sx + Math.cos(a + 0.1) * 15.5), Math.round(sy + Math.sin(a + 0.1) * 15.5), D.bronceL); }
      disco(sx, sy, 13, K); disco(sx, sy, 12, (x, y, d) => (d > 0.85 ? D.campo : D.campoL));
      R.icono('balanza', sx - 7, sy - 8, D.oroL, D.oroS, 2); rect(sx - 8, sy + 8, sx + 8, sy + 9, D.oroS); rect(sx - 7, sy + 8, sx + 7, sy + 8, D.oro); }
    // el sillón del juez, de cuero con botones
    rect(145, 56, 175, 90, K); rect(146, 57, 174, 90, D.cuero); rect(146, 57, 174, 58, D.cueroL); rect(172, 59, 174, 90, D.cueroS);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const bx = 150 + i * 6 + (j % 2) * 3, by = 61 + j * 6; pset(bx, by, D.cueroS); pset(bx - 1, by - 1, D.cueroL); }
    // los mástiles dorados con su punta, la peana y el cordón
    for (const mx of [104, 216]) { rect(mx - 3, 107, mx + 4, 111, K); rect(mx - 2, 107, mx + 3, 110, D.oroS); rect(mx - 2, 107, mx + 3, 107, D.oro);
      rect(mx, 21, mx + 1, 107, D.oroS); rect(mx, 21, mx, 107, D.oro); poligono([[mx - 2, 20], [mx + 0.5, 13], [mx + 3, 20]], K); poligono([[mx - 1, 19], [mx + 0.5, 15], [mx + 2, 19]], D.oro); }
    // el estrado de los testigos por detrás: el respaldo del sillón vacío
    rect(66, 80, 96, 92, K); rect(67, 81, 95, 92, D.nogS); rect(72, 72, 90, 92, K); rect(73, 73, 89, 92, D.cuero); rect(73, 73, 89, 74, D.cueroL);
    // la puerta doble del pasillo: marco, montante, dos hojas con cristal esmerilado, placas de empuje
    rect(262, 44, 308, 112, K); rect(263, 45, 307, 111, D.nogL); rect(265, 47, 305, 111, D.nog); rect(266, 47, 304, 52, D.nogS); rect(268, 48, 302, 51, D.cremaS);
    rect(285, 53, 285, 111, K);
    for (const [a, b] of [[267, 283], [287, 303]]) { rect(a, 53, b, 111, D.nog); rect(a, 53, b, 53, D.nogL); rect(a + 3, 57, b - 3, 81, K); rect(a + 4, 58, b - 4, 80, hex('#d4dad2')); rect(a + 4, 58, b - 4, 58, hex('#eef2ea'));
      d_cuarteron(R, a + 3, 86, b - 3, 106, D.nog, D.nogL, D.nogS, D.nogV, a); rect(a === 267 ? b - 3 : a + 1, 82, a === 267 ? b - 1 : a + 3, 85, D.oroS); }
    // el suelo de parquet en perspectiva (tablas más largas cuanto más cerca) y la alfombra roja del pasillo central
    let y = 112, fila = 0;
    while (y < 180) { const alto = 2 + Math.floor(fila / 2), largo = 18 + fila * 4, off = (fila % 2) * (largo >> 1);
      for (let yy = y; yy < Math.min(180, y + alto); yy++) for (let x = 0; x < 320; x++) { const tabla = Math.floor((x + off) / largo), n = h(tabla, fila, 11);
        pset(x, yy, (x + off) % largo === 0 ? D.parquetD : yy === y + alto - 1 ? D.parquetS : n > 0.66 ? D.parquetL : n < 0.25 ? D.parquetS : D.parquet); }
      for (let x = 0; x < 320; x += 3) if (h(x, fila, 12) > 0.8) pset(x, y + (alto >> 1), D.parquetS);
      y += alto; fila++; }
    for (let yy = 112; yy < 180; yy++) { const u = (yy - 112) / 68, a = Math.round(138 - u * 24), b = Math.round(182 + u * 24);
      for (let x = a; x <= b; x++) { const borde = x - a < 2 + u * 2 || b - x < 2 + u * 2; pset(x, yy, x === a || x === b ? D.k : borde ? D.oroS : ((x + yy) % 6 === 0 || (x - yy) % 6 === 0) && yy > 116 ? D.alfombraS : D.alfombra); }
      if (yy % 7 === 0) for (let x = a + 4; x <= b - 4; x += 2) pset(x, yy, D.alfombraL); }
    rect(0, 112, 319, 113, D.parquetD);
    // el sol del ventanal en el suelo, con la sombra de la cruz del marco
    for (let yy = 116; yy < 152; yy++) { const d = (yy - 116) * 0.9, xa = Math.round(12 + d), xb = Math.round(58 + d), xm = (xa + xb) >> 1;
      for (let x = xa; x <= xb; x++) { if (Math.abs(x - xm) < 2 || Math.abs(yy - 130) < 2) continue; if ((x + yy) % 2 === 0 || (x - xa > 2 && xb - x > 2 && yy > 118 && yy < 149)) d_aclara(R, x, yy, 0.22, [255, 236, 190]); } }
    // la sombra al pie del friso
    for (let x = 0; x < 320; x++) { d_aclara(R, x, 114, 0.25, [40, 20, 10]); if (x % 2) d_aclara(R, x, 115, 0.15, [40, 20, 10]); }
    // la sombra del techo sobre lo alto de la sala (mármol, marco del ventanal, respaldo): la franja de la barra del año
    // queda en penumbra cálida y el año se lee; se aclara hacia abajo con un tramado
    for (let y = 20; y < 36; y++) { const m = 0.55 * (1 - (y - 20) / 16) ** 1.3; for (let x = 0; x < 320; x++) if (m > 0.22 || (x + y) % 2 === 0) d_aclara(R, x, y, m, [62, 44, 32]); }
  });
  // ── lo que se mueve ──
  // el ventanal: cielo con nubes y pájaros, los rascacielos de 1989, un árbol que se mece; la persiana y la cruz del marco
  const CL = [10, 22, 54, 92];
  d_cielo(R, CL, t, 1, 2);
  const torres = [[10, 52, 8, 0], [19, 40, 9, 1], [29, 58, 7, 0], [36, 34, 10, 1], [47, 48, 8, 0]];
  for (const [bx, by, bw, tipo] of torres) { d_rr(R, CL, bx, by, bx + bw, 92, tipo ? D.torre1 : D.torre0); d_rr(R, CL, bx + bw, by + 1, bx + bw, 92, D.torreS); d_rr(R, CL, bx, by, bx + bw, by, D.torreV);
    for (let wy = by + 3; wy < 88; wy += 3) for (let wx = bx + 1; wx < bx + bw; wx += 2) if (wx <= 54) pset(wx, wy, h(wx, wy, 5) > 0.85 ? D.amarilloL : tipo ? D.torreV : D.torreS); }
  d_rr(R, CL, 36, 30, 36, 33, D.torreS); if (Math.floor(t * 1.5) % 2) pset(36, 29, D.rojoL);
  for (let x = 10; x <= 54; x++) { const ht = 82 + Math.round(Math.sin(x * 0.7) * 1.5 + h(x, 1, 7) * 2); d_rr(R, CL, x, ht, x, 92, (x % 3) ? D.hojaS : D.hoja); }
  { const m = Math.sin(t * 0.9) * 1.6; d_rr(R, CL, 44, 76, 45, 92, D.tronco);
    for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const xx = Math.round(45 + i + m * (9 - j) / 18), yy = 70 + j; const d = (i / 9) ** 2 + (j / 8) ** 2 + (h(i, j, 8) - 0.5) * 0.3;
      if (d < 1 && xx >= CL[0] && xx <= CL[2]) pset(xx, yy, i + j < -6 ? D.hojaL : i + j > 5 ? D.hojaS : D.hoja); } }
  for (let yy = 22; yy < 40; yy += 2) { rect(10, yy, 54, yy, D.blanco); rect(10, yy + 1, 54, yy + 1, D.blancoS); }
  rect(10, 40, 54, 41, hex('#a89a80')); linea(50, 42, 50, 52 + Math.round(Math.sin(t * 1.1)), hex('#a89a80')); pset(50, 53 + Math.round(Math.sin(t * 1.1)), D.oroS);
  rect(31, 20, 33, 94, D.crema); rect(33, 20, 33, 94, D.cremaS); rect(8, 58, 56, 59, D.crema); rect(8, 60, 56, 60, D.cremaS);
  // el rayo de sol con motas que flotan
  for (let k = 0; k < 14; k++) { const fy = (h(k, 3, 121) * 60 + t * (2 + h(k, 4, 121) * 3)) % 60, x = Math.round(20 + fy * 0.7 + h(k, 5, 121) * 34 + Math.sin(t * 0.6 + k) * 2), y = Math.round(92 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#fff4d8')); }
  // las dos banderas: la de rayas (sin estrellas: el cantón azul liso con su ribete) y la azul con el aro de oro
  for (const [x0, dir, tipo] of [[102, -1, 0], [218, 1, 1]]) for (let i = 0; i < 15; i++) {
    const f = Math.sin(i * 0.9 + Math.sin(t * 0.6 + x0) * 0.9), luz = f > 0.4 ? 2 : f < -0.4 ? 1 : 0, x = x0 + i * dir, ya = 23 + Math.round(i * 0.3), alto = 25 + Math.round(f * 1.2) - Math.round(i * 0.15);
    pset(x, ya - 1, K);
    for (let j = 0; j < alto; j++) { let c;
      if (tipo === 0) c = i < 6 && j < 12 ? (j === 11 || i === 5 ? [D.azulS, D.azulS, D.azul] : [D.azul, D.azulS, D.azulL]) : Math.floor(j / 2) % 2 ? [D.blanco, D.blancoS, hex('#ffffff')] : [D.rojo, D.rojoS, D.rojoL];
      else { const d = Math.hypot(i - 7, j - 11); c = d > 3.5 && d < 5.2 ? [D.oro, D.oroS, D.oroL] : [D.azul, D.azulS, D.azulL]; }
      pset(x, ya + j, c[luz]); }
    pset(x, ya + alto, i % 2 ? D.oro : D.oroS); if (i % 2 === 0) pset(x, ya + alto + 1, D.oroS);
  }
  // el ventilador del techo (gira) y las dos lámparas de globo con su halo
  { const fx = 236, fy = 6; rect(fx, 0, fx, fy - 2, D.metalS); rect(fx - 2, fy - 2, fx + 2, fy, D.metalD);
    for (let b = 0; b < 4; b++) { const a = t * 7 + b * Math.PI / 2, ex = Math.round(fx + Math.cos(a) * 14), ey = Math.round(fy + Math.sin(a) * 2); linea(fx, fy, ex, ey, D.nogS); linea(fx, fy - 1, ex, ey - 1, D.nog); } }
  for (const lx of [186, 252]) { rect(lx, 11, lx, 17, D.metalS); disco(lx, 21, 4, D.k); disco(lx, 21, 3, D.marmolL); pset(lx - 1, 19, hex('#ffffff'));
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, r = 6 + Math.sin(t * 2 + k) * 0.6; if ((k + Math.floor(t * 2)) % 3) d_aclara(R, Math.round(lx + Math.cos(a) * r), Math.round(21 + Math.sin(a) * r), 0.25, [255, 236, 180]); } }
  // el reloj de pared, con el segundero rojo a saltos
  { const cx = 240, cy = 30, r = 8; disco(cx, cy, r + 1, K); disco(cx, cy, r, D.nog); disco(cx, cy, r - 1, D.nogL); disco(cx, cy, r - 2, K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - 4 ? D.blanco : D.marmolL));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), k % 3 ? D.blancoS : K); }
    const hora = 10.2 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(ah) * 3), Math.round(cy + Math.sin(ah) * 3), K); linea(cx, cy, Math.round(cx + Math.cos(am) * 5), Math.round(cy + Math.sin(am) * 5), K);
    linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), D.rojo); }
  // la sombra de alguien que cruza el pasillo por los cristales de la puerta
  { const u = (t * 0.09 + 0.3) % 1; if (u < 0.35) { const sx = Math.round(262 + u / 0.35 * 46); for (let yy = 62; yy <= 80; yy++) for (let x = sx - 4; x <= sx + 4; x++) {
      const dentro = (x >= 271 && x <= 279) || (x >= 291 && x <= 299); if (!dentro || yy < 58) continue; if (yy < 67 ? Math.hypot(x - sx, yy - 64.5) < 3 : true) pset(x, yy, (x + yy) % 2 ? hex('#a8aea6') : hex('#9aa098')); } } }
  // el secretario: su busto tras la mesa, que teclea la estenotipia; la tira de papel sale y se pliega en la bandeja
  { R.busto('calvo', tela('#4a5a7a', '#36445e', { W: '#8c8ca0' }), 232, 84, t + 3);
    const tec = Math.floor(t * 7) % 3; rect(229, 94, 244, 96, K); rect(230, 94, 243, 95, D.metalS); for (let i = 0; i < 5; i++) pset(231 + i * 3, 94, (i + tec) % 3 ? D.metalL : D.blanco);
    pset(231 + tec * 4, 93, D.piel); pset(240 - tec * 3, 93, D.piel);
    const largo = 3 + Math.floor((t * 2) % 6); for (let j = 0; j < largo; j++) pset(246 + (j % 2), 93 - j, D.blanco);
    rect(220, 96, 258, 112, K); rect(221, 97, 257, 112, D.nog); rect(221, 97, 257, 98, D.nogL); d_cuarteron(R, 224, 101, 254, 110, D.nog, D.nogL, D.nogS, D.nogV, 61);
    rect(250, 89, 255, 96, K); rect(251, 90, 254, 95, D.blanco); rect(251, 92, 254, 92, D.blancoS); }
  // las cajas de cartuchos requisadas: del montón revuelto a la fila perfecta (o.apila 0–1); cada una salta a su sitio
  const ap = Math.max(0, Math.min(1, o.apila ?? 0));
  for (let i = 0; i < 12; i++) {
    const a = d_MONTON[i], b = d_FILA[i], u0 = i * 0.045, u = Math.max(0, Math.min(1, (ap - u0) / (1 - 11 * 0.045))), e = u * u * (3 - 2 * u);
    const x = a[0] + (b[0] - a[0]) * e, y = a[1] + (b[1] - a[1]) * e - Math.sin(Math.PI * u) * 10, w = Math.round(a[2] + (b[2] - a[2]) * e), hh = Math.round(a[3] + (b[3] - a[3]) * e);
    if (u > 0.98 || u < 0.02) { for (let xx = Math.round(x); xx < x + w; xx++) d_aclara(R, xx, Math.round(y + hh), 0.3, [40, 20, 10]); }
    d_caja(R, x, y, w, hh, i, i % 4 === 1);
  }
  if (ap >= 1) { const g = (t % 3) / 0.9; if (g < 1) { const gx = Math.round(218 + g * 100); for (let yy = 104; yy < 124; yy++) for (const dx of [0, 1, 4]) d_aclara(R, gx + dx - Math.round((yy - 104) * 0.3), yy, dx === 4 ? 0.25 : 0.5, [255, 250, 220]); } }
  return { suelo: 150, juez: [152, 98], testigo: [72, 102], abogados: [[30, 110], [202, 282]], sueloAbogados: 150, pasillo: [124, 196], cajas: [222, 312, 124], mazo: [186, 88], puerta: [266, 304, 112], ventana: [10, 54, 22, 92] };
}
// lo de delante en el juzgado: el frente del estrado y del estrado de testigos (con lo que hay encima), las mesas de las
// partes y la fila del público de espaldas
function d_juzgadoDelante(R, t, o = {}) {
  const { rect, pset, linea, disco, poligono } = R, K = D.k;
  // el estrado de los testigos: baranda, frente de cuarterones y el micrófono con su luz
  rect(60, 90, 102, 114, K); rect(61, 93, 101, 113, D.nog); rect(59, 89, 103, 93, K); rect(60, 90, 102, 91, D.nogL); rect(60, 92, 102, 92, D.nog);
  d_cuarteron(R, 64, 96, 79, 110, D.nog, D.nogL, D.nogS, D.nogV, 71); d_cuarteron(R, 83, 96, 98, 110, D.nog, D.nogL, D.nogS, D.nogV, 72);
  linea(96, 89, 96, 84, K); linea(96, 84, 93, 82, K); rect(91, 81, 93, 82, D.metalD); pset(97, 89, Math.floor(t * 1.3) % 2 ? D.rojoL : D.rojoS);
  // el estrado: cuerpo, tapa con su vuelo y el filete dorado, cinco cuarterones, la balanza pequeña de latón y la tarima
  rect(106, 108, 214, 116, K); rect(107, 109, 213, 115, D.nogS); rect(107, 109, 213, 109, D.nogL);
  rect(110, 90, 210, 110, K); rect(111, 91, 209, 109, D.nog);
  rect(107, 87, 213, 92, K); rect(108, 88, 212, 89, D.nogL); rect(108, 90, 212, 91, D.nog); for (let x = 110; x < 212; x += 2) pset(x, 89, D.oro);
  for (let k = 0; k < 5; k++) { const x = 114 + k * 19; if (k === 2) continue; d_cuarteron(R, x, 94, x + 15, 106, D.nog, D.nogL, D.nogS, D.nogV, 50 + k); }
  disco(160, 100, 6, K); disco(160, 100, 5, D.bronce); disco(159, 99, 3, D.bronceL); R.icono('balanza', 157, 97, D.campo, D.bronceS, 1);
  // encima: la lámpara verde de banquero (con su luz), los papeles, la placa sin letras, el mazo en su taco y la jarra
  { rect(126, 86, 136, 87, K); rect(130, 80, 131, 86, D.oroS); poligono([[122, 81], [140, 81], [137, 76], [125, 76]], K); poligono([[123, 80], [139, 80], [136, 77], [126, 77]], D.verde); rect(126, 77, 136, 77, D.verdeL);
    for (let x = 124; x < 139; x++) if (x % 2) d_aclara(R, x, 88, 0.35, [255, 236, 160]); }
  rect(140, 84, 150, 87, K); rect(141, 84, 149, 84, D.blanco); rect(141, 85, 149, 85, D.blancoS); rect(141, 86, 149, 86, D.blanco);
  rect(152, 85, 168, 88, K); rect(153, 86, 167, 87, D.oro); rect(153, 86, 167, 86, D.oroL); for (let x = 155; x < 166; x += 3) rect(x, 87, x + 1, 87, D.oroS);
  if (o.mazo !== false) { const pz = PIEZAS_TS.mazo; if (pz) pz(R, 186, 88, {}); else { rect(180, 85, 194, 87, D.nogS); rect(182, 82, 188, 86, D.nogL); } }
  if (o.golpe != null) { const u = t - o.golpe; if (u >= 0 && u < 0.4) { const r = 4 + u * 30; for (let k = 0; k < 8; k++) { const a = Math.PI + k / 7 * Math.PI, x0 = 186 + Math.cos(a) * r, y0 = 84 + Math.sin(a) * r * 0.6;
      linea(Math.round(x0), Math.round(y0), Math.round(x0 + Math.cos(a) * 3), Math.round(y0 + Math.sin(a) * 2), k % 2 ? D.blanco : D.oroL); } if (u < 0.2) for (let k = 0; k < 4; k++) pset(178 + k * 5, 82 - Math.round(u * 40 * (k % 2 + 1)), D.nogL); } }
  rect(198, 78, 204, 87, K); rect(199, 79, 203, 86, D.cristal); rect(199, 82, 203, 86, D.agua); pset(199, 79, hex('#ffffff')); rect(205, 80, 205, 84, K);
  // las mesas de las partes: tablero con su brillo que corre, frente de cuarterones y patas
  for (const [a, b] of [[24, 124], [196, 296]]) {
    rect(a + 3, 145, b - 3, 166, K); rect(a + 4, 146, b - 4, 166, D.nog); rect(a + 4, 146, b - 4, 147, D.nogS);
    for (let x = a + 8; x + 16 < b - 4; x += 21) d_cuarteron(R, x, 150, x + 16, 163, D.nog, D.nogL, D.nogS, D.nogV, x);
    rect(a, 141, b, 145, K); rect(a + 1, 142, b - 1, 143, D.nogL); rect(a + 1, 144, b - 1, 144, D.nog);
    const g = ((t * 0.3 + a * 0.01) % 2) * (b - a); if (g < b - a - 6) rect(a + 1 + Math.round(g), 142, a + 6 + Math.round(g), 142, hex('#c89058'));
    rect(a + 1, 167, b - 1, 168, D.parquetD);
  }
  // la mesa de la izquierda (Nintendo): las carpetas, el vaso y el maletín en el suelo
  rect(27, 135, 41, 141, K); rect(28, 136, 40, 137, D.azul); rect(28, 138, 40, 139, D.blanco); rect(28, 140, 40, 140, D.rojoS);
  rect(112, 134, 117, 141, K); rect(113, 135, 116, 140, D.cristal); rect(113, 137, 116, 140, D.agua); pset(113, 135, hex('#ffffff'));
  // la de la derecha (Tengen): las carpetas, el micrófono y el cartucho de prueba con la etiqueta roja, sobre su caja
  rect(199, 135, 213, 141, K); rect(200, 136, 212, 137, D.ocreT ?? D.carton); rect(200, 138, 212, 139, D.blanco); rect(200, 140, 212, 140, D.verdeS);
  d_caja(R, 274, 131, 18, 10, 3, true);
  { const pz = PIEZAS_TS.cartucho; if (pz) pz(R, 283, 131, { color: '#c8302a' }); rect(288, 120, 291, 122, D.rojo); pset(288, 120, D.rojoL); }
  // la fila del público, de espaldas: nucas y hombros que se mueven un poco (uno gira la cabeza, otra se inclina)
  rect(0, 172, 319, 179, K); rect(0, 173, 319, 179, D.nogS); rect(0, 173, 319, 173, D.nogL); for (let x = 0; x < 320; x += 4) pset(x, 176, D.nogD);
  d_NUCAS.forEach(([x, pelo, ropa], k) => { if (x > 116 && x < 206) return; const inc = k === 3 ? Math.round(Math.sin(t * 0.8) * 1.5) : 0, gira = k === 6 && Math.sin(t * 0.5) > 0.6, cy = 163 + (k % 2), cx = x + inc;
    rect(cx - 9, cy + 6, cx + 9, 173, K); rect(cx - 8, cy + 7, cx + 8, 173, hex(ropa)); rect(cx - 8, cy + 7, cx + 8, cy + 7, D.k);
    disco(cx, cy, 7, K); disco(cx, cy, 6, (xx, yy) => (yy > cy + 3 ? D.piel : hex(pelo))); if (gira) { rect(cx + 4, cy, cx + 6, cy + 4, D.piel); pset(cx + 5, cy + 1, K); }
    pset(cx - 3, cy - 4, D.blancoS); });
  return {};
}

// las cajas de cada balda de la estantería, para vaciarlas en orden (de arriba a la derecha a abajo a la izquierda)
const d_BAHIAS = (() => { const r = []; for (let n = 0; n < 3; n++) for (let b = 2; b >= 0; b--) r.push([b, n]); return r; })();

function d_almacen(R, t, o = {}) {
  const { rect, pset, linea, disco, poligono } = R, K = D.k;
  d_fijo(R, 'almacen', () => {
    // la chapa ondulada de las paredes (nervios verticales con luz y sombra, remaches, manchas de óxido)
    for (let y = 22; y < 132; y++) for (let x = 0; x < 320; x++) { const m = x % 6, n = h(x >> 1, y >> 2, 31);
      pset(x, y, m === 0 ? D.chapaD : m === 1 ? D.chapaL : m === 4 ? D.chapaS : n > 0.93 ? D.chapaS : D.chapa); }
    for (let y = 40; y < 132; y += 36) { rect(0, y, 319, y, D.chapaD); for (let x = 3; x < 320; x += 12) pset(x, y - 1, D.metalL); }
    for (let k = 0; k < 9; k++) { const x = Math.floor(h(k, 1, 33) * 310), y = 44 + Math.floor(h(k, 2, 33) * 70); for (let j = 0; j < 6; j++) if (h(k, j, 34) > 0.3) pset(x + (j % 2), y + j, hex('#8a6a4a')); }
    // el techo: las cerchas de acero en celosía (oscuras y tranquilas) y los lucernarios
    rect(0, 0, 319, 21, D.aceroS);
    for (let x = 0; x < 320; x += 4) for (let y = 0; y < 22; y++) if (h(x, y, 35) > 0.7) pset(x, y, hex('#3a4252'));
    for (const [a, b] of [[186, 222], [228, 262]]) { rect(a, 2, b, 16, K); rect(a + 1, 3, b - 1, 15, hex('#cfe4f2')); rect(a + 1, 3, b - 1, 5, hex('#eaf4fa')); for (let x = a + 6; x < b; x += 6) rect(x, 3, x, 15, D.metalS); }
    rect(0, 17, 319, 21, D.acero); rect(0, 17, 319, 17, D.aceroL); rect(0, 21, 319, 21, K);
    for (let x = 0; x < 320; x += 20) { linea(x, 17, x + 10, 4, D.acero); linea(x + 10, 4, x + 20, 17, D.acero); }
    rect(0, 3, 319, 4, D.acero);
    // la estantería de palés: tres bahías, largueros azules en tres alturas, puntales naranjas con sus agujeros
    for (const lv of [50, 86, 122]) { rect(6, lv, 176, lv + 3, K); rect(7, lv + 1, 175, lv + 2, D.azulR); rect(7, lv + 1, 175, lv + 1, hex('#4a7ac8')); }
    for (const px of [6, 62, 118, 172]) { rect(px, 26, px + 4, 132, K); rect(px + 1, 26, px + 3, 132, D.naranja); rect(px + 1, 26, px + 1, 132, D.naranjaL); for (let y = 30; y < 130; y += 4) pset(px + 2, y, D.naranjaS); rect(px - 1, 129, px + 5, 132, D.metalD); }
    // el muelle de carga: el marco de la puerta, la persiana enrollable a media altura y las bandas de goma
    rect(194, 48, 264, 132, K); rect(195, 49, 263, 131, hex('#c8b030')); for (let y = 49; y < 132; y += 6) rect(195, y, 263, y + 2, D.negro);
    rect(198, 52, 260, 80, D.metalS); for (let y = 53; y < 80; y += 3) { rect(198, y, 260, y, D.metalL); rect(198, y + 1, 260, y + 1, D.metal); }
    rect(198, 79, 260, 80, K); rect(226, 81, 232, 82, D.metalD);
    // el suelo de hormigón: textura, juntas en perspectiva, las líneas amarillas del pasillo, manchas de aceite y huellas
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 36), n2 = h(x >> 3, y >> 2, 37); pset(x, y, n > 0.92 ? D.hormigonS : n < 0.06 ? D.hormigonL : n2 > 0.75 ? D.hormigonL : D.hormigon); }
    rect(0, 132, 319, 133, D.hormigonS);
    for (let k = -6; k < 12; k++) linea(160 + k * 30, 133, 160 + k * 60, 180, D.hormigonS);
    for (const y of [148, 166]) rect(0, y, 319, y, D.hormigonS);
    for (const [y0, y1] of [[140, 141], [174, 175]]) rect(0, y0, 319, y1, D.amarillo);
    for (let x = 0; x < 320; x += 10) { pset(x, 140, D.amarilloS); pset(x + 3, 175, D.amarilloS); }
    for (const [cx, cy, rx] of [[96, 156, 9], [230, 168, 12], [40, 144, 6]]) for (let j = -3; j <= 3; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 3) ** 2 < 1 - h(i, j, 38) * 0.3) pset(cx + i, cy + j, (i + j) % 3 ? hex('#8a8880') : hex('#7a7870'));
    for (let x = 60; x < 260; x++) { if (x % 3) pset(x, 158 + Math.round(Math.sin(x * 0.05) * 2), D.hormigonS); }
    for (let x = 0; x < 320; x++) d_aclara(R, x, 134, 0.25, [30, 30, 40]);
  });
  // ── lo que se mueve ──
  // por el muelle: el patio con sol, el camión con las puertas abiertas y un mozo que carga cajas
  { const CL = [198, 81, 260, 130]; d_cielo(R, [198, 81, 260, 96], t, 1, 5);
    d_rr(R, CL, 198, 97, 260, 130, hex('#c8c0a8')); for (let x = 198; x <= 260; x += 3) pset(x, 97 + (x % 2), hex('#b0a890'));
    d_rr(R, CL, 204, 86, 254, 128, K); d_rr(R, CL, 205, 87, 253, 126, hex('#e8e6e0')); d_rr(R, CL, 209, 91, 249, 124, hex('#3a3a44'));
    for (let k = 0; k < 6; k++) d_caja(R, 211 + (k % 3) * 12, 112 - Math.floor(k / 3) * 10, 11, 10, k);
    d_rr(R, CL, 205, 126, 253, 129, D.negro); for (const wx of [212, 246]) for (let j = 0; j < 2; j++) d_rr(R, CL, wx - 3, 129 + j, wx + 3, 130, K);
    const u = (t * 0.25) % 2, ida = u < 1, fx = ida ? 196 + u * 40 : 236 - (u - 1) * 40; d_figura(R, fx, 128, t, D.azulR, D.k, true, ida, CL); }
  // la estantería llena de cajas (o.vacia 0–1 la vacía por bahías: arriba a la derecha primero)
  const vacia = Math.max(0, Math.min(1, o.vacia ?? 0)), quedan = Math.round(9 * (1 - vacia));
  d_BAHIAS.forEach(([b, n], idx) => { const x0 = 12 + b * 56, base = [50, 86, 122][n]; if (idx < 9 - quedan) { rect(x0, base - 3, x0 + 48, base - 1, hex('#b08a5a')); rect(x0, base - 3, x0 + 48, base - 3, hex('#c8a070')); return; }
    rect(x0, base - 3, x0 + 48, base - 1, hex('#b08a5a')); for (let x = x0 + 2; x < x0 + 48; x += 8) rect(x, base - 2, x + 2, base - 1, hex('#6a4a2a'));
    for (let c = 0; c < 3; c++) for (let f = 0; f < 2; f++) { const bx = x0 + 1 + c * 16, by = base - 3 - (f + 1) * 11; if (n === 0 && by < 26) continue; d_caja(R, bx + (f % 2), by, 15, 11, idx * 7 + c + f * 3); }
    if (idx % 4 === 2) for (let y = base - 25; y < base - 3; y += 2) for (let x = x0 + 1; x < x0 + 48; x += 5) d_aclara(R, x, y, 0.3, [255, 255, 255]); });
  // los haces de luz de los lucernarios, con motas que suben
  for (let y = 22; y < 150; y++) { const d = (y - 22) * 0.35, xa = Math.round(186 - d), xb = Math.round(262 - d); for (let x = xa; x <= xb; x += 1) if ((x + y) % 3 === 0 && !(x > 222 - d && x < 228 - d)) d_aclara(R, x, y, 0.09, [255, 248, 220]); }
  for (let k = 0; k < 16; k++) { const fy = (h(k, 1, 39) * 110 - t * (1.5 + h(k, 2, 39) * 2) + 1100) % 110, x = Math.round(150 + h(k, 3, 39) * 70 - fy * 0.35 + 40 + Math.sin(t + k) * 2), y = Math.round(28 + fy); if (Math.sin(t * 1.3 + k) > -0.3) pset(x, y, hex('#fff6dc')); }
  // las lámparas de campana que se mecen, con su cono de luz
  for (const [lx, fase] of [[40, 0], [120, 1.7]]) { const m = Math.sin(t * 0.9 + fase) * 1.5, bx = Math.round(lx + m); linea(lx, 22, bx, 32, D.aceroS);
    poligono([[bx - 7, 38], [bx + 7, 38], [bx + 3, 32], [bx - 3, 32]], K); poligono([[bx - 6, 37], [bx + 6, 37], [bx + 2, 33], [bx - 2, 33]], D.verdeS); rect(bx - 2, 38, bx + 2, 39, hex('#fff4c0'));
    for (let y = 40; y < 128; y += 1) { const w = (y - 38) * 0.4; for (let x = Math.round(bx - w); x <= bx + w; x++) if ((x + y) % 4 === 0) d_aclara(R, x, y, 0.12, [255, 240, 190]); } }
  // la trituradora: el cuerpo amarillo con franjas, la tolva, la luz ámbar que gira y el polvo; la cinta que le sube cajas
  { rect(266, 72, 318, 140, K); rect(267, 73, 317, 139, D.amarillo); rect(267, 73, 317, 74, D.amarilloL); rect(312, 75, 317, 139, D.amarilloS);
    for (let x = 268; x < 312; x += 8) poligono([[x, 132], [x + 4, 132], [x + 8, 139], [x + 4, 139]], D.negro); rect(267, 130, 317, 131, K);
    rect(272, 82, 306, 122, D.amarilloS); rect(273, 83, 305, 121, D.amarillo); rect(276, 90, 302, 112, K); for (let y = 91; y < 112; y += 3) rect(277, y, 301, y, D.aceroL);
    // o.tritura: un número 0–1 la pone en marcha (las cajas entran por abajo, suben y caen dentro una tras otra; a 1 ya
    // no queda ninguna); sin ella (o false), la máquina está parada y la cinta, quieta y vacía
    const tr = typeof o.tritura === 'number' ? Math.max(0, Math.min(1, o.tritura)) : null, marcha = tr !== null && tr < 1;
    const N_TR = 6, PASO_TR = 0.26, avance = tr === null ? 0 : tr * (1 + (N_TR - 1) * PASO_TR + 0.08);
    const cae = (k) => avance - k * PASO_TR;
    const vib = marcha ? Math.floor(t * 14) % 2 : 0; rect(284 + vib, 114, 294 + vib, 118, D.aceroS);
    // el cuadro de mando: el piloto verde (en marcha) o rojo (parada) y la palanca
    rect(306, 96, 315, 110, K); rect(307, 97, 314, 109, D.metalS); rect(307, 97, 314, 97, D.metalL);
    disco(310, 100, 1, marcha ? (Math.floor(t * 3) % 2 ? D.verdeL : D.verde) : D.verdeS); disco(310, 105, 1, marcha ? D.rojoS : (Math.floor(t * 1.2) % 2 ? D.rojoL : D.rojo));
    linea(313, 104, marcha ? 313 : 314, marcha ? 100 : 108, D.k); pset(marcha ? 313 : 314, marcha ? 99 : 109, D.rojo);
    poligono([[262, 60], [318, 60], [312, 72], [270, 72]], K); poligono([[264, 61], [316, 61], [311, 71], [271, 71]], D.metalS); rect(266, 61, 316, 62, D.metalL);
    // la luz ámbar: gira y alumbra solo en marcha; parada, apagada con su brillo de cristal
    const giro = Math.floor(t * 4) % 4; disco(300, 56, 3, K); disco(300, 56, 2, marcha ? (giro % 2 ? D.naranjaL : D.naranja) : D.naranjaS); pset(299, 55, marcha ? hex('#fff0c0') : D.naranja);
    if (marcha) for (let k = 0; k < 6; k++) { const a = t * 6 + k * 0.15; d_aclara(R, Math.round(300 + Math.cos(a) * (5 + k)), Math.round(56 + Math.sin(a) * (2 + k * 0.4)), 0.4, [255, 180, 80]); }
    // el polvo sale de la tolva cuando cae una caja (y un hilo de polvo mientras muele)
    let polvo = marcha ? 0.35 : 0; for (let k = 0; k < N_TR; k++) { const d = cae(k) - 1; if (d > -0.08 && d < 0.3) polvo = Math.max(polvo, 1 - Math.abs(d - 0.05) / 0.25); }
    for (let k = 0; k < 8; k++) { const u = ((t * 0.7 + k / 8) % 1), x = Math.round(282 + Math.sin(k * 2.1) * 10 + u * 6 * Math.sin(k)), y = Math.round(60 - u * 14); if (u < 0.85 * polvo) disco(x, y, 1 + Math.round(u * 2), (k + Math.floor(t * 3)) % 2 ? hex('#d8d0c0') : hex('#bcb4a4')); }
    // la cinta inclinada: el bastidor, los rodillos y las cajas que suben y se caen dentro
    linea(180, 128, 272, 72, K); linea(180, 130, 272, 74, K); linea(180, 129, 272, 73, D.goma); linea(181, 131, 273, 75, D.metalD);
    // los tacos de la cinta corren hacia arriba en marcha (parada, quietos)
    const fase = marcha ? Math.floor(t * 6) : 0;
    for (let k = 0; k < 12; k++) { const u = k / 11; pset(Math.round(180 + u * 92), Math.round(129 - u * 56), (k + fase) % 2 ? D.metalL : D.gomaS); }
    for (const px of [196, 236]) { const py = Math.round(129 - (px - 180) / 92 * 56); rect(px, py + 2, px + 1, 132, D.metalD); }
    // el motor al pie de la cinta: el tambor gira en marcha
    disco(182, 130, 4, K); disco(182, 130, 3, D.aceroS); { const a = marcha ? t * 8 : 0.6; linea(182, 130, Math.round(182 + Math.cos(a) * 3), Math.round(130 + Math.sin(a) * 3), D.metalL); }
    // las cajas: cada una entra por abajo, sube y vuelca en la tolva (se recortan a la boca: dentro ya no se ven)
    if (tr !== null) for (let k = 0; k < N_TR; k++) { const u = cae(k); if (u < 0 || u > 1.08) continue;
      if (u <= 1) { const x = 180 + u * 92, y = 129 - u * 56, b = Math.min(1, u / 0.06); d_caja(R, x - 5, y - 9 + Math.round((1 - b) * 3), 10, 8, k + 20); }
      else { const v = (u - 1) / 0.08, x = 272 + v * 8, y = 73 + v * 4; if (y - 9 < 66) d_caja(R, x - 5, y - 9, 10, Math.max(2, Math.min(8, 66 - Math.round(y - 9))), k + 20); } } }
  // la carretilla elevadora que va y viene por el pasillo con un palé de cajas (la lleva un conductor pequeño)
  { const u = (t * 0.08) % 2, va = u < 1, e = va ? u : 2 - u, ee = e * e * (3 - 2 * e), x = Math.round(20 + ee * 120), dir = va ? 1 : -1, suelo = 138;
    const X = (i) => x + i * dir, rr = (a, b, c, d, col) => rect(Math.min(X(a), X(c)), b, Math.max(X(a), X(c)), d, col);
    rr(-14, suelo - 14, 8, suelo - 4, K); rr(-13, suelo - 13, 7, suelo - 5, D.naranja); rr(-13, suelo - 13, 7, suelo - 13, D.naranjaL); rr(-14, suelo - 17, -10, suelo - 13, D.metalD);
    rr(-8, suelo - 30, -7, suelo - 13, D.aceroS); rr(4, suelo - 30, 5, suelo - 13, D.aceroS); rr(-8, suelo - 30, 5, suelo - 29, D.aceroS);
    d_figura(R, X(-2), suelo - 11, t, D.azulR, hex('#3a2418'), false);
    rr(9, suelo - 28, 10, suelo - 2, K); rr(10, suelo - 3, 22, suelo - 2, D.metalD);
    rr(10, suelo - 6, 23, suelo - 4, hex('#b08a5a')); d_caja(R, Math.min(X(11), X(22)), suelo - 15, 12, 9, 40); d_caja(R, Math.min(X(11), X(22)) + 1, suelo - 23, 11, 8, 41);
    for (const wx of [-10, 4]) { disco(X(wx), suelo - 2, 3, K); disco(X(wx), suelo - 2, 1, D.metalS); }
    if (Math.floor(t * 3) % 2) pset(X(-14), suelo - 18, D.naranjaL); }
  return { suelo: 160, libre: [48, 280], estanteria: [6, 176, 26, 132], muelle: [196, 262, 80, 130], trituradora: [266, 318, 60, 140], cinta: [[180, 128], [272, 72]] };
}
// lo de delante en el almacén: el palé de cajas abajo a la izquierda y la carretilla de mano con cajas abajo a la derecha
function d_almacenDelante(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, K = D.k;
  rect(0, 170, 44, 176, K); rect(0, 171, 43, 175, hex('#b08a5a')); rect(0, 171, 43, 171, hex('#c8a070')); for (let x = 2; x < 44; x += 10) rect(x, 173, x + 3, 175, hex('#6a4a2a'));
  for (let f = 0; f < 3; f++) for (let c = 0; c < 2; c++) if (!(f === 2 && c === 1)) d_caja(R, -4 + c * 22 + (f % 2) * 2, 156 - f * 14, 22, 15, 60 + f * 2 + c, f === 0 && c === 1);
  for (let y = 128; y < 170; y += 3) pset(41 - ((y >> 2) % 2), y, hex('#e8eef4'));
  // la carretilla de mano: dos varas, la pala, la rueda, y tres cajas atadas con una cinta
  linea(312, 132, 300, 176, K); linea(313, 132, 301, 176, D.metalD); linea(318, 134, 306, 177, K); rect(296, 175, 318, 177, D.metalD);
  for (let k = 0; k < 3; k++) d_caja(R, 290 + k * 2, 162 - k * 13, 24, 13, 70 + k, k === 1);
  linea(290, 150, 316, 150, D.rojoS); disco(310, 174, 5, K); disco(310, 174, 3, D.goma); pset(310, 174, D.metalL);
  return {};
}

// los juguetes de las baldas: cajas de colores (con un pictograma), peluches, pelotas, robots
function d_juguete(R, x, base, k) {
  const { rect, pset, disco } = R, K = D.k, tipo = Math.floor(h(k, 1, 41) * 5), c = d_PICTO[k % 6];
  if (tipo <= 1) { const w = 9 + Math.floor(h(k, 2, 41) * 6), hh = 10 + Math.floor(h(k, 3, 41) * 8); rect(x, base - hh, x + w, base, K); rect(x + 1, base - hh + 1, x + w - 1, base - 1, c);
    rect(x + 1, base - hh + 1, x + w - 1, base - hh + 2, hex('#ffffff')); rect(x + w - 1, base - hh + 2, x + w - 1, base - 1, D.k); disco(x + (w >> 1), base - (hh >> 1), 2, d_PICTO[(k + 2) % 6]); return w + 2; }
  if (tipo === 2) { disco(x + 6, base - 6, 6, K); disco(x + 6, base - 6, 5, (xx, yy) => (Math.abs(xx - x - 6 + (yy - base + 6)) < 2 ? D.blanco : c)); pset(x + 4, base - 9, hex('#ffffff')); return 14; }
  if (tipo === 3) { const col = [hex('#a8784a'), hex('#e8d0b0'), hex('#c8789a')][k % 3]; disco(x + 6, base - 5, 5, K); disco(x + 6, base - 5, 4, col); disco(x + 6, base - 12, 4, K); disco(x + 6, base - 12, 3, col);
    disco(x + 3, base - 15, 1, col); disco(x + 9, base - 15, 1, col); pset(x + 5, base - 12, K); pset(x + 7, base - 12, K); pset(x + 6, base - 11, D.rojoS); return 14; }
  rect(x + 2, base - 18, x + 9, base, K); rect(x + 3, base - 17, x + 8, base - 11, D.metalL); rect(x + 3, base - 10, x + 8, base - 3, D.metal); pset(x + 4, base - 15, D.rojoL); pset(x + 7, base - 15, D.rojoL);
  rect(x + 5, base - 19, x + 6, base - 18, K); pset(x + 5, base - 20, D.amarilloL); rect(x + 4, base - 2, x + 7, base, D.metalD); return 12;
}

// la caja de la consola de bolsillo: cartón blanco con la franja de color, la consola pintada (PIEZAS_TS.consolaBolsillo) y
// un brillo; x, base: el centro de abajo
function d_cajaConsola(R, x, base, k = 0) {
  const { rect } = R, K = D.k; x = Math.round(x);
  rect(x - 17, base - 22, x + 16, base, K); rect(x - 16, base - 21, x + 15, base - 1, D.blanco); rect(x - 16, base - 21, x + 15, base - 17, [D.turquesa, D.rosa, D.violeta][k % 3]);
  rect(x + 14, base - 16, x + 15, base - 1, D.blancoS); rect(x - 16, base - 2, x + 15, base - 1, D.blancoS);
  const pz = PIEZAS_TS.consolaBolsillo; if (pz) pz(R, x, base - 3, {}); else rect(x - 13, base - 15, x + 13, base - 3, D.grisC);
  for (let i = 0; i < 4; i++) R.pset(x + 10 + (i % 2), base - 20 + i, D.amarilloL);
}

function d_jugueteria(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, K = D.k;
  d_fijo(R, 'jugueteria', () => {
    // el techo de placas en penumbra (tranquilo bajo la barra del año: los fluorescentes quedan fuera de x 20–60, donde va
    // el año), con la perfilería, alguna placa manchada y la sombra que cae sobre lo alto de la pared
    for (let y = 0; y < 15; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 141); pset(x, y, n > 0.93 ? hex('#8e8678') : y < 5 ? hex('#7e776a') : y < 10 ? ((x + y) % 2 ? hex('#8a8274') : hex('#7e776a')) : hex('#948c7c')); }
    for (let x = 0; x < 320; x += 24) { rect(x, 0, x, 14, hex('#5e584e')); rect(x + 1, 0, x + 1, 14, hex('#a49c8a')); } for (const y of [6, 14]) { rect(0, y, 319, y, hex('#5e584e')); rect(0, y - 1, 319, y - 1, hex('#a49c8a')); }
    for (const k of [2, 9]) { const x = k * 24 + 4; for (let i = 0; i < 9; i++) pset(x + i + (i % 3), 2 + (i % 4), hex('#9a8a64')); }
    for (const fx of [84, 132, 196, 252]) { rect(fx - 10, 8, fx + 10, 12, hex('#5e584e')); rect(fx - 9, 9, fx + 9, 11, hex('#fbfbf4')); rect(fx - 9, 11, fx + 9, 11, hex('#dcdcd0')); }
    // la pared con la cenefa de confeti de los ochenta (triángulos, garabatos y puntos)
    rect(0, 15, 319, 127, hex('#f2ece0'));
    for (let y = 15; y < 128; y++) for (let x = 0; x < 320; x++) if (h(x, y, 42) > 0.94) pset(x, y, hex('#e4dccc'));
    // la cenefa de los ochenta, de fondo azul noche (el año se lee encima) con su confeti de colores
    rect(0, 15, 319, 23, hex('#283466')); for (let x = 0; x < 320; x++) { pset(x, 15, hex('#1c2448')); if (h(x, 16, 142) > 0.8) pset(x, 16 + (x % 6), hex('#34427a')); } rect(0, 22, 319, 22, hex('#3a4a86')); rect(0, 23, 319, 23, D.k);
    for (let x = 2; x < 320; x += 11) { const k = Math.floor(x / 11); if (x > 16 && x < 62 && k % 3 !== 0) continue; if (k % 3 === 0) poligono([[x, 21], [x + 4, 21], [x + 2, 17]], D.turquesa); else if (k % 3 === 1) for (let i = 0; i < 6; i++) pset(x + i, 19 + Math.round(Math.sin(i * 1.6)), D.rosa); else { pset(x + 1, 18, D.amarillo); pset(x + 3, 20, D.violeta); pset(x + 5, 17, D.k); } }
    // las baldas del fondo: montantes, tableros y los juguetes
    rect(74, 24, 234, 127, hex('#d8cfbc')); rect(74, 24, 75, 127, K); rect(233, 24, 234, 127, K);
    for (const by of [46, 70, 96, 124]) { let x = 77, k = by; while (x < 228) { const w = d_juguete(R, x, by, k); x += w; k += 7; } rect(75, by + 1, 233, by + 3, K); rect(75, by + 1, 233, by + 1, hex('#ffffff')); rect(75, by + 2, 233, by + 2, D.cremaS); }
    // el cartel luminoso de la consola: marco, fondo turquesa con destellos y la consola grande
    rect(128, 28, 192, 68, K); rect(129, 29, 191, 67, hex('#2a8a98')); for (let y = 30; y < 67; y++) for (let x = 130; x < 191; x++) if ((x * 3 + y * 5) % 23 === 0) pset(x, y, D.turquesa);
    { const pz = PIEZAS_TS.consolaBolsillo; if (pz) pz(R, 160, 60, { s: 2, encendida: true }); }
    rect(128, 28, 192, 29, D.blanco);
    // la tele de la pared de detrás del mostrador (la pantalla se pinta cada fotograma) y las baldas de la consola
    rect(236, 24, 319, 127, hex('#e6dccb')); rect(236, 24, 237, 127, D.cremaS);
    rect(242, 46, 278, 74, K); rect(243, 47, 277, 73, D.negro); rect(256, 75, 264, 77, D.metalD); rect(258, 78, 262, 82, D.metalS);
    for (const by of [100, 124]) { for (let k = 0; k < 2; k++) d_cajaConsola(R, 262 + k * 36, by, k + by); rect(238, by + 1, 319, by + 3, K); rect(238, by + 1, 319, by + 1, hex('#ffffff')); }
    for (let k = 0; k < 4; k++) { const x = 284 + k * 9; rect(x, 52, x, 54, D.metalD); const pz = PIEZAS_TS.cartucho; if (pz) pz(R, x, 72, { color: ['#c8302a', '#3a8a9a', '#e8b040', '#6a4ac8'][k] }); }
    // el escaparate: el marco de aluminio y el zócalo
    rect(0, 22, 70, 122, K); rect(1, 23, 69, 121, D.metalS); rect(2, 24, 68, 120, D.metalL);
    // el suelo de baldosas en damero con perspectiva
    for (let y = 128; y < 180; y++) { const u = (y - 128) / 52, ancho = 14 + u * 14, fila = Math.floor(Math.pow(u, 0.8) * 7);
      for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) / ancho + 100) + fila, borde = Math.abs(((x - 160) / ancho + 100) % 1) < 0.04;
        pset(x, y, borde ? D.baldosaS : col % 2 ? (h(x, y, 43) > 0.95 ? D.baldosa2S : D.baldosa2) : (h(x, y, 43) > 0.95 ? D.baldosaS : D.baldosa)); } }
    rect(0, 127, 319, 128, D.k);
    for (let x = 0; x < 320; x++) d_aclara(R, x, 129, 0.2, [30, 30, 40]);
    for (const fx of [84, 132, 196, 252]) for (let y = 140; y < 176; y += 2) for (let x = fx - 8; x <= fx + 8; x += 2) if (((x - fx) / 8) ** 2 + ((y - 158) / 18) ** 2 < 1) d_aclara(R, x + (y % 4 ? 1 : 0), y, 0.25, [255, 255, 255]);
  });
  // ── lo que se mueve ──
  // el escaparate: la calle soleada (la fachada de enfrente, la acera, los coches, los paseantes, un árbol) recortada al hueco
  { const CL = [4, 26, 66, 118]; d_cielo(R, [4, 26, 66, 40], t, 1, 7);
    d_rr(R, CL, 4, 34, 66, 92, D.ladrillo); for (let y = 34; y < 92; y += 3) for (let x = 4 + (y % 6 ? 0 : 3); x < 67; x += 6) pset(x, y, D.ladrilloS);
    for (const wx of [8, 26, 44]) { d_rr(R, CL, wx, 44, wx + 12, 62, D.blancoS); d_rr(R, CL, wx + 1, 45, wx + 11, 61, hex('#4a6a8a')); d_rr(R, CL, wx + 1, 45, wx + 4, 61, hex('#6a8aaa')); }
    for (let x = 4; x <= 66; x++) { const yy = 76 + ((x >> 2) % 2); d_rr(R, CL, x, 72, x, yy, (x >> 2) % 2 ? D.rojo : D.blanco); }
    d_rr(R, CL, 4, 92, 66, 100, D.metalL); d_rr(R, CL, 4, 100, 66, 110, D.goma); for (let x = 6 - Math.floor(t * 8) % 12; x < 67; x += 12) d_rr(R, CL, x, 105, x + 5, 105, D.amarillo); d_rr(R, CL, 4, 110, 66, 118, D.metalL);
    for (let k = 0; k < 2; k++) { const u = ((t * 0.12 + k * 0.5) % 1), cx = Math.round(-30 + u * 130); const col = k ? D.azulL : D.rojo;
      d_rr(R, CL, cx, 98, cx + 22, 106, K); d_rr(R, CL, cx + 1, 99, cx + 21, 105, col); d_rr(R, CL, cx + 5, 94, cx + 16, 99, K); d_rr(R, CL, cx + 6, 95, cx + 15, 98, D.cristal);
      for (const wx of [cx + 5, cx + 17]) { d_rr(R, CL, wx - 2, 105, wx + 2, 108, K); } }
    for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k * 0.33) % 1), fx = 70 - u * 76; d_figura(R, fx, 117, t, [D.verde, D.rosa, D.azul][k], [D.k, hex('#c8a060'), hex('#6a3a1a')][k], true, false, CL); }
    { const m = Math.sin(t * 0.8) * 1.2; d_rr(R, CL, 55, 70, 56, 112, D.tronco); for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const xx = Math.round(56 + i + m * (10 - j) / 20), yy = 62 + j; if ((i / 10) ** 2 + (j / 9) ** 2 + (h(i, j, 44) - 0.5) * 0.3 < 1 && xx >= 4 && xx <= 66 && yy >= 26) pset(xx, yy, i + j < -6 ? D.hojaL : i + j > 6 ? D.hojaS : D.hoja); } }
    for (let k = 0; k < 5; k++) d_aclara(R, 10 + k * 3, 30 + k, 0.35, [255, 255, 255]); for (let k = 0; k < 9; k++) d_aclara(R, 20 + k, 30 + k, 0.25, [255, 255, 255]);
    rect(35, 24, 36, 120, D.metalS); rect(2, 112, 68, 121, K); rect(3, 113, 67, 120, D.rosa); rect(3, 113, 67, 113, hex('#f8a8c8'));
    for (let k = 0; k < 3; k++) d_cajaConsola(R, 14 + k * 21, 112 - (k === 1 ? 2 : 0), k); }
  // los fluorescentes: uno parpadea; su halo
  { const falla = (t % 6.1) < 0.1 || ((t % 6.1) > 0.2 && (t % 6.1) < 0.26); rect(187, 9, 205, 11, falla ? D.placaS : hex('#fbfbf4')); }
  // el tren de juguete que recorre la balda de arriba (locomotora roja con humo y dos vagones), por delante de los juguetes
  { const u = (t * 0.07) % 2, e = u < 1 ? u : 2 - u, dir = u < 1 ? 1 : -1, x = Math.round(84 + e * 120);
    rect(76, 44, 232, 45, D.metalD); for (let k = 0; k < 3; k++) { const vx = x - dir * k * 13, col = k ? [D.azulL, D.amarillo][k - 1] : D.rojo; rect(vx - 5, 37, vx + 5, 43, K); rect(vx - 4, 38, vx + 4, 42, col); rect(vx - 4, 38, vx + 4, 38, D.blanco);
      disco(vx - 3, 44, 1, K); disco(vx + 3, 44, 1, K); if (!k) { rect(vx + dir * 2, 33, vx + dir * 3, 37, K); for (let j = 0; j < 3; j++) { const fy = 31 - ((t * 6 + j * 3) % 9); pset(vx + dir * 2 - dir * Math.round((31 - fy) * 0.6), Math.round(fy), D.blancoS); } } } }
  // la tele de detrás del mostrador: el anuncio de símbolos (la consola, un corazón que late y la cifra 89 en rojo)
  { const n = Math.floor(t / 2.2) % 3, f = t % 2.2; rect(244, 48, 276, 72, n === 2 ? hex('#1a2a4a') : hex('#2a6a8a'));
    if (n === 0) { const pz = PIEZAS_TS.consolaBolsillo; if (pz) pz(R, 260, 67, { encendida: true, t }); }
    else if (n === 1) { const s = Math.sin(t * 8) > 0 ? 7 : 6; for (let j = -s; j <= s; j++) for (let i = -s; i <= s; i++) { const x = i / s * 1.2, y = -j / s * 1.2 + 0.25; if ((x * x + y * y - 1) ** 3 - x * x * y * y * y < 0) pset(260 + i, 60 + j, (i + j) < -4 ? hex('#ffb0d0') : D.rosa); } }
    else R.numero('89', 260, 66, { centro: true });
    if (f < 0.12) rect(244, 48 + Math.round(f / 0.12 * 24), 276, 48 + Math.round(f / 0.12 * 24), D.blanco);
    for (let y = 48; y < 73; y += 2) for (let x = 244; x < 277; x += 3) d_aclara(R, x, y, 0.08, [0, 0, 0]); for (let k = 0; k < 6; k++) d_aclara(R, 266 + k, 49 + k, 0.3, [255, 255, 255]); }
  // los móviles colgados del techo: dos estrellas que giran y el cartel de la consola que se mece
  for (const [mx, fase] of [[52, 0], [222, 1.3]]) { const a = Math.cos(t * 1.4 + fase); linea(mx, 15, mx, 26, D.metalS); const w = Math.max(1, Math.round(Math.abs(a) * 5));
    poligono([[mx - w, 30], [mx, 25], [mx + w, 30], [mx, 35]], K); poligono([[mx - w + 1, 30], [mx, 26], [mx + w - 1, 30], [mx, 34]], a > 0 ? D.amarillo : D.amarilloS); }
  // la caseta de demostración: un pie con dos consolas encendidas (atadas con su cable) a la altura de los niños
  { rect(86, 132, 124, 158, K); rect(87, 133, 123, 158, D.turquesa); rect(87, 133, 123, 135, hex('#7ae8e0')); rect(121, 136, 123, 158, hex('#2a9890'));
    for (let y = 140; y < 156; y += 5) rect(90, y, 120, y, hex('#2a9890')); rect(84, 130, 126, 133, K); rect(85, 130, 125, 131, D.blanco);
    const pz = PIEZAS_TS.consolaBolsillo; if (pz) { pz(R, 96, 130, { encendida: true, t }); pz(R, 114, 130, { encendida: true, t: t + 0.7 }); }
    linea(96, 131, 96, 140, D.k); linea(114, 131, 114, 140, D.k); }
  // la pirámide de cajas de la consola con los globos que se mecen
  { for (const [x, b, k] of [[142, 132, 0], [178, 132, 1], [160, 110, 2]]) d_cajaConsola(R, x, b, k);
    rect(122, 132, 198, 138, K); rect(123, 133, 197, 137, D.rosa); rect(123, 133, 197, 133, hex('#f8a8c8'));
    for (const [gx, col, f] of [[128, D.rojo, 0], [192, D.amarillo, 1.1], [198, D.azulL, 2]]) { const bx = Math.round(gx + Math.sin(t * 1.1 + f) * 2), by = Math.round(80 + Math.sin(t * 0.9 + f) * 1.5) - (gx === 198 ? 6 : 0);
      linea(gx, 132, bx, by + 6, D.blancoS); disco(bx, by, 5, K); disco(bx, by, 4, col); pset(bx - 2, by - 2, D.blanco); pset(bx, by + 5, K); } }
  // la luz que entra por el escaparate en el suelo
  for (let y = 130; y < 160; y++) for (let x = 2 + (y - 130); x < 50 + (y - 130); x += 2) d_aclara(R, x + (y % 2), y, 0.14, [255, 240, 200]);
  return { suelo: 158, libre: [70, 226], caseta: [86, 124, 132], piramide: [124, 196, 92, 132], tendero: [248, 140], mostrador: [232, 318, 130], escaparate: [4, 66, 26, 118], tele: [244, 276, 48, 72] };
}
// lo de delante en la juguetería: el mostrador con la caja registradora (o.caja 0–1 abre el cajón), una pila de cajas de la
// consola y el cuenco de caramelos
function d_jugueteriaDelante(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, K = D.k;
  rect(230, 129, 319, 179, K); rect(231, 134, 319, 179, D.blanco); rect(231, 134, 319, 136, D.blancoS);
  for (const [y, c] of [[146, D.turquesa], [150, D.rosa], [154, D.amarillo]]) rect(231, y, 319, y + 2, c);
  for (let x = 236; x < 320; x += 16) rect(x, 160, x, 178, D.blancoS);
  rect(228, 128, 319, 133, K); rect(229, 129, 319, 130, hex('#e86a8a')); rect(229, 131, 319, 132, D.rosa);
  // la caja registradora: cuerpo gris, teclas, la ventanita con la cifra y el cajón que sale con monedas
  const ab = Math.max(0, Math.min(1, o.caja ?? 0)), dx = Math.round(ab * 7);
  rect(284, 108, 312, 129, K); rect(285, 109, 311, 128, D.metal); rect(285, 109, 311, 110, D.metalL); rect(308, 111, 311, 128, D.metalS);
  rect(290, 101, 306, 108, K); rect(291, 102, 305, 107, D.negro); R.numero('35', 298, 107, { centro: true, fina: true });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) { rect(287 + i * 4, 112 + j * 4, 289 + i * 4, 114 + j * 4, K); pset(288 + i * 4, 113 + j * 4, (i + j) % 4 ? D.blanco : D.rojoL); }
  rect(282 - dx, 124, 312, 129, K); rect(283 - dx, 125, 311, 128, D.metalS); if (dx > 2) { for (let i = 0; i < 4; i++) disco(285 - dx + i * 2, 126, 1, i % 2 ? D.oroL : D.metalL); }
  // la caja de la consola de muestra, tumbada en el borde, y el cuenco de caramelos de colores
  { const pz = PIEZAS_TS.consolaBolsillo; rect(314, 120, 319, 129, K); rect(315, 121, 319, 128, D.blanco); }
  disco(240, 125, 6, K); rect(233, 125, 247, 130, K); disco(240, 125, 5, D.cristal); rect(234, 125, 246, 129, D.cristal); for (let k = 0; k < 9; k++) pset(236 + (k * 3) % 9, 122 + (k % 3), d_PICTO[k % 6]); pset(237, 121, hex('#ffffff'));
  return {};
}

// los anuncios de la franja de arriba (pictogramas sin letras): una consola, una hamburguesa, un sol, un teléfono
function d_anuncio(R, x, k) {
  const { rect, disco, pset } = R, K = D.k; rect(x, 24, x + 26, 34, K); rect(x + 1, 25, x + 25, 33, [D.turquesa, D.amarilloL, D.azulL, D.rosa][k]);
  if (k === 0) { rect(x + 6, 26, x + 20, 32, K); rect(x + 7, 27, x + 19, 31, D.grisC); rect(x + 10, 27, x + 16, 30, hex('#8ab84a')); pset(x + 8, 29, D.azul); pset(x + 18, 28, D.rojo); pset(x + 18, 30, D.rojo); }
  if (k === 1) { rect(x + 8, 27, x + 18, 28, D.naranja); rect(x + 8, 29, x + 18, 29, D.verdeL); rect(x + 8, 30, x + 18, 31, D.nogS); rect(x + 8, 32, x + 18, 32, D.naranja); }
  if (k === 2) { disco(x + 13, 29, 3, D.amarillo); for (let i = 0; i < 8; i++) pset(Math.round(x + 13 + Math.cos(i * 0.8) * 5), Math.round(29 + Math.sin(i * 0.8) * 4), D.naranja); }
  if (k === 3) { rect(x + 7, 27, x + 19, 32, D.rojo); rect(x + 9, 26, x + 17, 27, D.rojoS); disco(x + 13, 30, 1, D.blanco); }
}

function d_autobus(R, t, o = {}) {
  const { rect, pset, linea, disco } = R, K = D.k;
  const VENT = [[8, 92], [100, 184], [192, 270]];
  d_fijo(R, 'autobus', () => {
    // el techo curvo de plástico crema, la tira de luz y la barra
    // (la curva del techo se aleja de la luz: arriba, en penumbra y tranquila bajo la barra del año)
    for (let y = 0; y < 22; y++) { const u = y / 21; for (let x = 0; x < 320; x++) { const c = u < 0.45 ? hex('#5e584c') : u < 0.75 ? ((x + y) % 2 ? hex('#6e685a') : hex('#5e584c')) : hex('#6e685a'); pset(x, y, c); } }
    for (let y = 0; y < 18; y++) if (y % 5 === 0) { rect(0, y, 319, y, hex('#4a453c')); if (y > 0) rect(0, y + 1, 319, y + 1, hex('#7a7466')); }
    for (let x = 6; x < 320; x += 26) { pset(x, 3, hex('#827c6c')); pset(x, 13, hex('#827c6c')); }
    for (let x = 172; x < 320; x++) for (let y = 4; y < 18; y++) if ((x + y) % 2 === 0 || y > 6) d_aclara(R, x, y, 0.35 * (1 - Math.abs(y - 10) / 8) * Math.min(1, (x - 172) / 20), [251, 248, 238]);
    rect(186, 8, 300, 12, D.cremaS); rect(187, 9, 299, 11, hex('#fbf8ee')); rect(0, 18, 319, 19, D.metalS); rect(0, 18, 319, 18, D.metal); rect(0, 20, 319, 20, D.metalD); for (let x = 174; x < 320; x += 3) pset(x, 18, D.metalL);
    // la franja de anuncios
    rect(0, 22, 319, 36, D.cremaS); rect(0, 22, 319, 22, K); rect(0, 36, 319, 36, K);
    [12, 52, 104, 144, 196, 236].forEach((x, i) => d_anuncio(R, x, i % 4));
    // los montantes entre ventanas y la pared de debajo
    rect(0, 37, 319, 103, hex('#d8d2c2')); for (let y = 37; y < 104; y++) for (let x = 0; x < 320; x++) if (h(x, y, 45) > 0.95) pset(x, y, D.cremaS);
    for (const [a, b] of VENT) { rect(a - 3, 35, b + 3, 95, K); rect(a - 2, 36, b + 2, 94, D.metalS); rect(a - 1, 37, b + 1, 93, D.metalL); }
    // el plano de la línea en la pared del fondo: la línea con sus paradas y la flecha (sin letras)
    rect(278, 52, 316, 92, K); rect(279, 53, 315, 91, D.blanco); for (let y = 56; y < 90; y += 4) rect(283, y, 284, y, D.blancoS);
    linea(297, 56, 297, 88, D.rojo); linea(298, 56, 298, 88, D.rojo); for (let k = 0; k < 6; k++) { disco(297, 58 + k * 6, 2, K); disco(297, 58 + k * 6, 1, k === 3 ? D.amarillo : D.blanco); rect(302, 58 + k * 6, 308 - (k % 3), 58 + k * 6, D.blancoS); }
    rect(0, 95, 319, 98, D.metalL); rect(0, 96, 319, 96, hex('#ffffff')); rect(0, 98, 319, 98, D.metalS);
    rect(0, 99, 319, 103, hex('#b8b2a2'));
    // el respaldo corrido de tela de los ochenta (azul con confeti naranja y turquesa), con el rodillo de arriba
    rect(0, 103, 319, 106, K); rect(0, 104, 319, 105, D.telaL);
    for (let y = 107; y < 153; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 46); pset(x, y, n > 0.96 ? D.naranja : n < 0.03 ? D.turquesa : (x + y * 2) % 7 === 0 ? D.telaS : D.tela); }
    for (const x of [96, 188, 274]) { rect(x - 1, 103, x + 1, 150, D.telaS); }
    for (let y = 107; y < 151; y += 8) rect(0, y, 319, y, D.telaS);
    // el suelo de goma estriada con la tira amarilla y la sombra del asiento
    for (let y = 165; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x + Math.floor((y - 165) * 0.6)) % 5 === 0 ? D.gomaS : h(x, y, 47) > 0.95 ? D.gomaL : D.goma);
    rect(0, 165, 319, 166, D.gomaS); rect(0, 178, 319, 178, D.amarillo); rect(0, 179, 319, 179, D.amarilloS);
    // lo que hay por el suelo: un billete, un chicle, una lata que rueda (la lata se pinta cada fotograma)
    rect(60, 171, 65, 173, D.k); rect(61, 171, 64, 172, D.amarilloL); pset(62, 172, D.rojo); R.disco(232, 170, 1, D.gomaL); R.disco(150, 175, 1, hex('#e8a0c0'));
  });
  // ── lo que se mueve ──
  // la ciudad que pasa por las tres ventanas, en paralaje (todo recortado al hueco de cada ventana)
  const tq = Math.sin(t * 9) > 0.92 ? 1 : 0;
  for (const [a, b] of VENT) { const CL = [a, 38, b, 92]; d_cielo(R, [a, 38, b, 92], t, 1.5, a);
    for (let k = 0; k < 14; k++) { const span = 560, x = Math.round(((h(k, 1, 48) * span - t * 6) % span + span) % span - 60), hh = 14 + Math.floor(h(k, 2, 48) * 22), w = 12 + Math.floor(h(k, 3, 48) * 12);
      d_rr(R, CL, x, 80 - hh, x + w, 92, D.torre0); d_rr(R, CL, x + w, 81 - hh, x + w, 92, D.torreS); for (let wy = 82 - hh; wy < 90; wy += 3) for (let wx = x + 2; wx < x + w; wx += 3) if (wx >= a && wx <= b && wy >= 38) pset(wx, wy, D.torreV); }
    for (let k = 0; k < 8; k++) { const span = 520, x = Math.round(((h(k, 4, 48) * span - t * 22) % span + span) % span - 50), hh = 16 + Math.floor(h(k, 5, 48) * 12), w = 24 + Math.floor(h(k, 6, 48) * 14), col = [D.ladrillo, hex('#c8b48a'), hex('#8a9aa8')][k % 3];
      d_rr(R, CL, x, 92 - hh, x + w, 92, col); d_rr(R, CL, x, 92 - hh, x + w, 93 - hh, K); for (let wy = 95 - hh; wy < 90; wy += 5) for (let wx = x + 3; wx < x + w - 3; wx += 6) d_rr(R, CL, wx, wy, wx + 2, wy + 2, h(wx, wy, 49) > 0.8 ? D.amarilloL : hex('#3a4a6a')); }
    for (let k = 0; k < 5; k++) { const span = 400, x = Math.round(((k * 80 - t * 70) % span + span) % span - 40);
      if (k % 2) { d_rr(R, CL, x + 6, 70, x + 7, 92, D.metalD); d_rr(R, CL, x + 4, 68, x + 12, 69, D.metalD); if (x + 12 >= a && x + 12 <= b) pset(x + 12, 70, D.amarilloL); }
      else { d_rr(R, CL, x + 9, 74, x + 11, 92, D.tronco); for (let j = -10; j <= 10; j++) for (let i = -12; i <= 12; i++) { const xx = x + 10 + i, yy = 64 + j; if ((i / 12) ** 2 + (j / 10) ** 2 + (h(i, j, 50) - 0.5) * 0.3 < 1 && xx >= a && xx <= b && yy >= 38) pset(xx, yy, i + j < -8 ? D.hojaL : i + j > 6 ? D.hojaS : D.hoja); } } }
    for (let k = 0; k < 9; k++) d_aclara(R, a + 6 + k, 40 + k, 0.25, [255, 255, 255]); for (let k = 0; k < 5; k++) d_aclara(R, a + 12 + k, 40 + k, 0.2, [255, 255, 255]);
    rect(a + ((b - a) >> 1), 37, a + ((b - a) >> 1) + 1, 93, D.metalS);
  }
  // un coche que adelanta por la calle, abajo de las ventanas
  { const u = (t * 0.2) % 1, cx = Math.round(-30 + u * 330); for (const [a, b] of VENT) { const CL = [a, 38, b, 92]; d_rr(R, CL, cx, 84, cx + 24, 92, K); d_rr(R, CL, cx + 1, 85, cx + 23, 92, D.amarillo); d_rr(R, CL, cx + 5, 80, cx + 18, 85, K); d_rr(R, CL, cx + 6, 81, cx + 17, 84, D.cristal); } }
  // la luz de las ventanas que barre el respaldo y el suelo, cortada por los árboles que pasan
  for (const [a, b] of VENT) { const sombra = Math.sin(t * 3.5 + a * 0.05) > 0.4;
    if (!sombra) for (let y = 108; y < 148; y += 2) for (let x = a + 4; x < b - 4; x += 2) d_aclara(R, x + ((y >> 1) % 2) - Math.round((y - 108) * 0.3), y, 0.16, [255, 244, 210]);
    for (let y = 168; y < 178; y += 2) for (let x = a + 10; x < b; x += 3) d_aclara(R, x + 20 - Math.round((y - 168) * 0.2), y, sombra ? 0.05 : 0.14, [255, 244, 210]); }
  // la lata que rueda por el suelo con el traqueteo
  { const lx = Math.round(110 + Math.sin(t * 0.7) * 30), g = Math.floor(t * 4) % 2; rect(lx - 3, 172, lx + 3, 176, D.k); rect(lx - 2, 173, lx + 2, 175, D.rojo); rect(lx - 2 + g * 2, 173, lx - 2 + g * 2, 175, D.blanco); }
  // las asas que se balancean con el traqueteo
  rect(0, 38, 270, 40, K); rect(0, 39, 270, 39, D.metalL); for (const x of [40, 140, 240]) rect(x, 36, x + 1, 38, D.metalD);
  for (let k = 0; k < 10; k++) { const x = 14 + k * 26, a = Math.sin(t * 1.6 + k * 0.35) * 0.28 + tq * 0.1, ex = Math.round(x + Math.sin(a) * 9), ey = Math.round(40 + Math.cos(a) * 9);
    linea(x, 40, ex, ey, D.metalD); disco(ex, ey + 3, 3, K); disco(ex, ey + 3, 2, hex('#e8e0c8')); pset(ex, ey + 3, D.k); }
  return { suelo: 177, sueloSentados: 156, asientos: [[12, 84], [104, 176], [196, 262]], barras: [96, 188], ventanas: VENT.map(([a, b]) => [a, 38, b, 92]), plano: [278, 316, 52, 92] };
}
// lo de delante en el autobús: el borde del asiento corrido (los sentados asoman hasta la cintura), las barras verticales con
// el pulsador de parada y la calefacción de debajo del asiento
function d_autobusDelante(R, t, o = {}) {
  const { rect, pset } = R, K = D.k, capa = o.capa;
  if (capa !== 'barras') {
    rect(0, 151, 319, 155, K); rect(0, 152, 319, 153, D.telaL); rect(0, 154, 319, 154, D.tela);
    rect(0, 156, 319, 164, D.telaS); for (let x = 0; x < 320; x++) if (h(x, 3, 51) > 0.85) pset(x, 157 + (x % 4), D.tela);
    rect(0, 164, 319, 165, K); for (let x = 4; x < 320; x += 8) rect(x, 161, x + 4, 162, D.metalD);
    for (let x = 0; x < 320; x++) if (x % 2) d_aclara(R, x, 166, 0.3, [20, 20, 30]);
  }
  if (capa === 'asientos') return {};
  for (const x of [96, 188]) { rect(x - 2, 38, x + 2, 178, K); rect(x - 1, 38, x + 1, 178, D.metalL); rect(x + 1, 38, x + 1, 178, D.metalS); rect(x - 3, 174, x + 3, 178, D.metalD);
    rect(x - 3, 118, x + 3, 124, K); rect(x - 2, 119, x + 2, 123, D.rojo); pset(x - 1, 119, (Math.floor(t * 2) % 2) ? D.rojoL : D.rojo); }
  return {};
}

const e_CACHE = new WeakMap();

// un fondo fijo: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma
function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla de dos colores (k = 0: a; k = 1: b)
function e_mez(a, b, k) { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * k) << s; } return r >>> 0; }

const e_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada 4 × 4
const e_b4 = (x, y) => (e_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const e_cl = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;

// rectángulo recortado a cl ([x0, y0, x1, y1]): R.rect no respeta R.recorte
function e_rr(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// degradado vertical tramado entre los colores de cols, con una luz opcional luz(x, y) que suma escalones
function e_degradado(R, x0, y0, x1, y1, cols, luz = null) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = (y - y0) / alto * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > e_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// una luz tramada que aclara (o tiñe) lo que ya hay: un óvalo de radios rx, ry con el color col y fuerza a
function e_luz(R, cx, cy, rx, ry, col, a = 0.35) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const g = 1 - Math.hypot((x - cx) / rx, (y - cy) / ry); if (g <= 0) continue; const f = g * a * 2.2; if (f > e_b4(x, y) * 0.9) R.pset(x, y, e_mez(R.pget(x, y), col, Math.min(0.75, a + g * a))); }
}

// sombra tramada (oscurece lo que hay) en un rectángulo
function e_sombra(R, x0, y0, x1, y1, a = 0.35, col = hex('#1a1018')) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 || a > 0.5) R.pset(x, y, e_mez(R.pget(x, y), col, a)); }

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba); cols = [sombra, cuerpo, luz]
function e_nube(R, cx, cy, w, cols) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1.5, r * 0.75], [-w * 0.12, -1, r], [w * 0.2, -0.5, r * 0.9], [w * 0.42, 1.5, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.5, rr, cols[0]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, cols[1]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1.2, rr * 0.55, cols[2]);
}

// cifras pequeñas de 3 × 5 (relojes, despertadores, contadores): s, el texto (cifras, ':' y ' ')
const e_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function e_cifras(R, s, x, y, c, g = 1) {
  for (const ch of String(s)) { if (ch === ':') { R.rect(x, y + g, x + g - 1, y + 2 * g - 1, c); R.rect(x, y + 3 * g, x + g - 1, y + 4 * g - 1, c); x += 2 * g; continue; } if (ch === ' ') { x += 2 * g; continue; }
    const m = e_DIG[+ch]; if (!m) continue; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (m[j * 3 + i] === '1') R.rect(x + i * g, y + j * g, x + i * g + g - 1, y + j * g + g - 1, c); x += 4 * g; }
}

// tablas de madera horizontales de frente (zócalos, mesas, muebles): juntas, vetas claras y oscuras, nudos, canto de luz
function e_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 8) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 3; g++) { const gy = y + 1 + Math.round(h(f, g, 610 + k) * (tabla - 3)); let x = x0 - Math.round(h(f, g, 611 + k) * 20);
      while (x < x1) { const L = 6 + Math.round(h(x, gy, 612 + k) * 26); if (h(x, g, 613 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 2 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 614 + k) * 10); } }
    if (h(f, 9, 615 + k) < 0.4 && y + 5 < y1 && x1 - x0 > 24) { const nx = x0 + 8 + Math.round(h(f, 7, 616 + k) * (x1 - x0 - 16)), ny = y + (tabla >> 1) - 1; rect(nx - 3, ny, nx + 3, ny, cS); rect(nx - 1, ny - 1, nx + 1, ny + 1, cS); R.pset(nx, ny, cD); }
  }
  rect(x0, y0, x1, y0, cL);
}

// tarima vista desde arriba en perspectiva: filas de tablas que crecen hacia abajo, juntas a matajunta, vetas y brillo
function e_tarima(R, y0, y1, c, cS, cL, cD, k = 0) {
  const { rect, pset } = R; let y = y0, f = 0;
  while (y <= y1) { const alto = Math.round(3 + (y - y0) * 0.16), ya = y, yb = Math.min(y1, y + alto - 1), larg = 40 + Math.round((y - y0) * 1.1), dx = Math.round(h(f, 1, 620 + k) * larg);
    rect(0, ya, 319, yb, h(f, 2, 621 + k) < 0.33 ? e_mez(c, cS, 0.35) : c);
    for (let x = -dx; x < 320; x += larg) { rect(x, ya, x, yb, cD); pset(x + 1, ya, cL); }
    for (let g = 0; g < Math.max(1, alto >> 1); g++) { const gy = ya + 1 + Math.round(h(f, g, 622 + k) * Math.max(0, alto - 2)); let x = Math.round(h(f, g, 623 + k) * 30) - 30;
      while (x < 320) { const L = 8 + Math.round(h(x, gy, 624 + k) * 30); if (gy < yb) rect(Math.max(0, x), gy, Math.min(319, x + L), gy, g & 1 ? cL : cS); x += L + 4 + Math.round(h(x, f, 625 + k) * 14); } }
    rect(0, yb, 319, yb, cD); y = yb + 1; f++; }
}

// papel pintado de rayas con un motivo pequeño de rombos y un poco de grano
function e_papel(R, x0, y0, x1, y1, base, raya, motivo, k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, base);
  for (let x = x0 - (x0 % 12); x <= x1; x += 12) { rect(Math.max(x0, x), y0, Math.min(x1, x + 2), y1, raya); if (x + 6 <= x1 && x + 6 >= x0) for (let y = y0 + 3 + ((x / 12) & 1) * 7; y < y1; y += 14) { pset(x + 7, y, motivo); pset(x + 6, y + 1, motivo); pset(x + 8, y + 1, motivo); pset(x + 7, y + 2, motivo); } }
  for (let i = 0; i < (x1 - x0) * (y1 - y0) / 30; i++) pset(x0 + Math.round(h(i, 1, 630 + k) * (x1 - x0)), y0 + Math.round(h(i, 2, 630 + k) * (y1 - y0)), h(i, 3, 630 + k) < 0.5 ? raya : motivo);
}

// cuarterones de madera (el zócalo alto): marcos con luz arriba y a la izquierda y sombra abajo y a la derecha
function e_cuarterones(R, x0, y0, x1, y1, ancho, M, k = 0) {
  e_madera(R, x0, y0, x1, y1, M.c, M.s, M.l, M.d, k, 6);
  for (let x = x0 + 4; x + ancho - 4 <= x1; x += ancho) { const a = x, b = x + ancho - 6, ya = y0 + 4, yb = y1 - 4;
    R.rect(a, ya, b, ya, M.d); R.rect(a, ya, a, yb, M.d); R.rect(a + 1, yb, b, yb, M.l); R.rect(b, ya + 1, b, yb, M.l);
    R.rect(a + 1, ya + 1, b - 1, ya + 1, M.s); R.rect(a + 2, ya + 3, b - 2, yb - 2, e_mez(M.c, M.l, 0.12)); }
  R.rect(x0, y0, x1, y0 + 1, M.l); R.rect(x0, y0 + 2, x1, y0 + 2, M.d);
}

// un libro de canto (x, yb: abajo a la izquierda; w × hh) o una pila de tres tumbados (tipo 'pila'); blanco: cuánto se
// aclara hacia el blanco (la balda llena que se ilumina)
const e_TONOS = ['#8a2a2a', '#2a4a7a', '#2e5a3a', '#c8963a', '#2a6a6a', '#d8c8a0', '#6a3a22', '#a84a2a', '#5a2a5a', '#4a5260', '#7a6a2a', '#3a3a5a'].map(hex);

function e_libro(R, x, yb, w, hh, c, s, tipo, k, blanco = 0) {
  const { rect, pset } = R, W = hex('#fff6dc'), ORO = hex('#e8c060');
  const tono = (cc) => blanco ? e_mez(cc, W, blanco) : cc;
  if (tipo === 'pila') { const hb = Math.max(2, Math.round(hh / 3));
    for (let m = 0; m < 3; m++) { const cc = tono(e_TONOS[(k * 5 + m * 3) % e_TONOS.length]), y1 = yb - 1 - m * hb, y0 = y1 - hb + 1, a = x + (m % 2) * s, b = x + w - 1 - ((m + 1) % 2) * s;
      rect(a, y0, b, y1, cc); rect(a, y0, b, y0, e_mez(cc, W, 0.35)); rect(a, y1, b, y1, e_mez(cc, C.k, 0.4)); rect(b - s, y0 + 1, b, y1 - 1, tono(hex('#efe2c0'))); if (hb > 3) rect(a + 2 * s, y0 + (hb >> 1), a + 4 * s, y0 + (hb >> 1), tono(ORO)); }
    return; }
  const cc = tono(c), cL = e_mez(cc, W, 0.3), cS = e_mez(cc, C.k, 0.4), cB = blanco ? cL : k % 3 === 0 ? ORO : e_mez(cc, C.k, 0.3);
  rect(x, yb - hh, x + w - 1, yb - 1, cc); rect(x, yb - hh, x + s - 1, yb - 1, cL); rect(x + w - s, yb - hh, x + w - 1, yb - 1, cS); rect(x, yb - hh, x + w - 1, yb - hh, cL);
  if (hh >= 10 * s) { const b1 = yb - hh + 2 * s, b2 = yb - 4 * s; rect(x + s, b1, x + w - 1 - s, b1 + s - 1, cB); rect(x + s, b2, x + w - 1 - s, b2 + s - 1, cB); }
  if (w >= 5 * s && hh >= 13 * s && k % 2 === 0) { const ly = yb - Math.round(hh * 0.62); rect(x + s + 1, ly, x + w - 2 - s, ly + 2 * s, e_mez(cc, W, 0.55)); }
  else if (w >= 4 * s && k % 3 === 1) for (let y = yb - hh + 5 * s; y < yb - 5 * s; y += 3 * s) pset(x + (w >> 1), y, cB);
}

const e_FILAS = new Map();

// el contenido de cada balda (libros y pilas, deterministas) para una estantería G; a: la balda que se llena
function e_filas(G, a) {
  const key = [G.x0, G.x1, G.alto, G.n, G.s, a].join(','); if (e_FILAS.has(key)) return e_FILAS.get(key);
  const s = G.s, xi0 = G.x0 + G.lado, xi1 = G.x1 - G.lado, hmax = G.alto - G.tb - 3 * s, filas = [];
  for (let j = 0; j < G.n; j++) { const L = []; let x = xi0 + 2 * s, i = 0, fin = xi1 - 2 * s;
    while (x < fin - 2 * s) { let w, hh, tipo = 'libro';
      if (h(i, j, 640) < 0.09 && x + 16 * s < fin) { w = 14 * s; hh = 9 * s; tipo = 'pila'; }
      else { w = (4 + Math.floor(h(i, j, 641) * 5)) * s; hh = Math.round(hmax * (0.6 + h(i, j, 642) * 0.4)); }
      if (fin - (x + w) < 4 * s) w = fin - x;
      L.push({ x, w, hh, c: e_TONOS[Math.floor(h(i, j, 643) * e_TONOS.length)], tipo, k: i, hueco: false }); x += w; i++; }
    const libros = L.filter((b) => b.tipo === 'libro' && b.w >= 4 * s && b.w < 9 * s), pon = (f) => { const b = libros[Math.min(libros.length - 1, Math.floor(f * libros.length))]; if (b) b.hueco = true; };
    if (j === a) { pon(0.18); pon(0.52); pon(0.83); } else pon((0.27 + j * 0.37) % 1);
    filas.push(L); }
  e_FILAS.set(key, filas); return filas;
}

// la estructura de la estantería (va en el fondo fijo): costados, copete, fondo de tablas con su sombra, baldas con
// canto de luz y el zócalo con dos cajones. G = { x0, x1, y0, alto, n, s, lado, tb }
function e_mueble(R, G) {
  const { rect, pset } = R, s = G.s, M = { c: hex('#6a3c22'), s: hex('#4e2a16'), l: hex('#9a6238'), d: hex('#341a0c') }, FON = hex('#3a2416'), FONS = hex('#2a180e'), xi0 = G.x0 + G.lado, xi1 = G.x1 - G.lado, yB = G.y0 + G.n * G.alto;
  // el copete con su moldura
  rect(G.x0 - 3 * s, G.y0 - 5 * s, G.x1 + 3 * s, G.y0 - 1, M.d); rect(G.x0 - 2 * s, G.y0 - 5 * s, G.x1 + 2 * s, G.y0 - 3 * s, M.c); rect(G.x0 - 2 * s, G.y0 - 5 * s, G.x1 + 2 * s, G.y0 - 5 * s, M.l); rect(G.x0 - s, G.y0 - 2 * s, G.x1 + s, G.y0 - 1, M.s);
  // el fondo: tablas verticales oscuras con vetas
  rect(xi0, G.y0, xi1, yB, FON);
  for (let x = xi0; x <= xi1; x++) { if ((x - xi0) % (10 * s) === 0) rect(x, G.y0, x, yB, FONS); else for (let y = G.y0; y < yB; y += 2) if (h(x, y >> 3, 650) < 0.12) rect(x, y, x, y + 3 * s, hex('#46301e')); }
  // los costados
  for (const [a, b] of [[G.x0, xi0 - 1], [xi1 + 1, G.x1]]) { e_madera(R, a, G.y0, b, yB + G.tb + 7 * s, M.c, M.s, M.l, M.d, a, 40); rect(a, G.y0, a, yB + G.tb + 7 * s, a === G.x0 ? M.l : M.d); rect(b, G.y0, b, yB + G.tb + 7 * s, M.d); }
  for (let j = 0; j <= G.n; j++) { const y = G.y0 + j * G.alto;
    if (j < G.n) { for (let i = 0; i < 4 * s; i++) for (let x = xi0; x <= xi1; x++) if (i < 2 * s || ((x + i) & 1)) pset(x, y + G.tb + i, e_mez(R.pget(x, y + G.tb + i), C.k, 0.45 - i * 0.08 / s));   // la sombra bajo la balda
      for (let i = 0; i < 3 * s; i++) for (let yy = y + G.tb; yy < y + G.alto; yy++) if (((i + yy) & 1) || i < s) pset(xi0 + i, yy, e_mez(R.pget(xi0 + i, yy), C.k, 0.35)); }
    rect(xi0, y, xi1, y + G.tb - 1, M.c); rect(xi0, y, xi1, y, M.l); rect(xi0, y + G.tb - 1, xi1, y + G.tb - 1, M.d);
    for (let x = xi0 + 3; x < xi1; x += 7 + (x % 5)) rect(x, y + 1, x + 3 * s, y + 1, M.s); }
  // el zócalo con dos cajones y sus tiradores
  const yz = yB + G.tb, yz1 = yz + 7 * s; rect(G.x0, yz, G.x1, yz1, M.s); rect(G.x0, yz1, G.x1, yz1, M.d);
  const mx = (G.x0 + G.x1) >> 1; for (const [a, b] of [[G.x0 + 3 * s, mx - s], [mx + s, G.x1 - 3 * s]]) { rect(a, yz + s, b, yz1 - s - 1, M.c); rect(a, yz + s, b, yz + s, M.l); rect(a, yz1 - s - 1, b, yz1 - s - 1, M.d); rect(((a + b) >> 1) - 2 * s, yz + 3 * s, ((a + b) >> 1) + 2 * s, yz + 3 * s + s - 1, hex('#d8b060')); }
}

// los libros de la estantería con el gag: los huecos de la balda a se llenan con libros que caen (enc 0–1), la balda
// llena se ilumina, se deshace en chispas y las de encima bajan (des 0–1); parp: los huecos de las otras baldas laten
function e_libros(R, t, G, a, enc, des, parp) {
  const { rect, pset, linea } = R, s = G.s, filas = e_filas(G, a), base = (j) => G.y0 + (j + 1) * G.alto, ORO = hex('#ffd860'), BL = hex('#fffbe8');
  const caida = des >= 0.55 ? e_cl((des - 0.55) / 0.4) : 0, baja = caida > 0, ease = (u) => { const v = u * u; return u > 0.8 ? 1 + Math.sin((u - 0.8) / 0.2 * Math.PI) * 0.06 : v / 0.64; };
  const huecos = [];
  // las baldas que no cambian (debajo de a) y las de encima, que con «baja» caen una balda
  for (let j = 0; j < G.n; j++) {
    if (j === a && des > 0 && des < 0.55) continue;
    if (baja && j <= a) continue;
    for (const b of filas[j]) { if (b.hueco) { huecos.push([b.x, base(j) - b.hh, b.w, b.hh]); if (j === a && enc >= 1 - 1e-6 || j === a && des > 0) { /* llena */ } else { if (j !== a && parp) { const p = 0.5 + 0.5 * Math.sin(t * 6 + j); if (p > 0.35) { rect(b.x, base(j) - b.hh, b.x + b.w - 1, base(j) - b.hh, ORO); rect(b.x, base(j) - b.hh, b.x, base(j) - 1, ORO); rect(b.x + b.w - 1, base(j) - b.hh, b.x + b.w - 1, base(j) - 1, ORO); rect(b.x, base(j) - 1, b.x + b.w - 1, base(j) - 1, ORO); if (p > 0.8) for (let y = base(j) - b.hh + 2; y < base(j) - 2; y += 2) pset(b.x + (b.w >> 1), y, hex('#c89a38')); } } continue; } }
      e_libro(R, b.x, base(j), b.w, b.hh, b.c, s, b.tipo, b.k); }
  }
  // la balda a: los libros que caen desde arriba de la pantalla y encajan en su hueco
  if (des <= 0) { const gaps = filas[a].filter((b) => b.hueco), n = gaps.length;
    gaps.forEach((b, k) => { const u = e_cl(enc * n - k), yb = base(a);
      if (u <= 0 || u >= 1) { if (u >= 1) { const tras = enc * n - k; if (tras < 1.35) { const f = 1 - (tras - 1) / 0.35; linea(b.x - 2 * s, yb - b.hh - 2 * s, b.x - 4 * s, yb - b.hh - 4 * s, BL); linea(b.x + b.w + s, yb - b.hh - 2 * s, b.x + b.w + 3 * s, yb - b.hh - 4 * s, BL); if (f > 0.5) { rect(b.x - s, yb - b.hh - s, b.x + b.w, yb - b.hh - s, ORO); } } } return; }
      const y = Math.round(-b.hh - 6 * s + (yb + 6 * s) * u * u);
      for (let i = 1; i <= 3; i++) { const ly = y - i * 5 * s; linea(b.x + (b.w >> 1) - 2 * s, ly - 3 * s, b.x + (b.w >> 1) - 2 * s, ly, e_mez(b.c, BL, 0.6)); linea(b.x + (b.w >> 1) + 2 * s, ly - 2 * s, b.x + (b.w >> 1) + 2 * s, ly, e_mez(b.c, BL, 0.6)); }
      R.rect(b.x - 1, y - b.hh, b.x + b.w, y, C.k); e_libro(R, b.x, y, b.w, b.hh, b.c, s, 'libro', b.k); }); }
  // la balda llena que se ilumina (latido dorado) y se deshace en chispas
  if (des > 0 && des < 0.55) { const yb = base(a), yt = yb - G.alto + G.tb, xi0 = G.x0 + G.lado, xi1 = G.x1 - G.lado;
    const brillo = des < 0.4 ? 0.35 + 0.45 * Math.abs(Math.sin(des * 40)) : 0.85, q = des < 0.4 ? 0 : (des - 0.4) / 0.15;
    for (let y = yt; y < yb; y++) for (let x = xi0; x <= xi1; x += 1) if (((x + y) & 1) === 0) pset(x, y, e_mez(R.pget(x, y), ORO, 0.35 + brillo * 0.3));
    for (const b of filas[a]) { if (q <= 0) e_libro(R, b.x, yb, b.w, b.hh, b.c, s, b.tipo, b.k, brillo);
      else for (let y = yb - b.hh; y < yb; y++) for (let x = b.x; x < b.x + b.w; x++) if (h(x, y, 660) > q) pset(x, y, h(x, y, 661) < 0.5 ? BL : ORO); }
    for (let k = 0; k < 40; k++) { const px = xi0 + Math.round(h(k, 1, 662) * (xi1 - xi0)), v = 10 + h(k, 2, 662) * 30, py = Math.round(yb - 4 - (des * 60 + h(k, 3, 662) * 20) * (0.4 + h(k, 4, 662))); if (des > 0.15 && py > yt - 30) { pset(px, py, k % 3 ? ORO : BL); if (k % 4 === 0) { pset(px - 1, py, ORO); pset(px + 1, py, ORO); pset(px, py - 1, ORO); pset(px, py + 1, ORO); } } }
    for (let i = 0; i < 6 * s; i++) { const y = yt - i; if (y < 0) break; for (let x = xi0; x <= xi1; x++) if (e_b4(x, y) < (1 - i / (6 * s)) * brillo * 0.5) pset(x, y, e_mez(R.pget(x, y), ORO, 0.4)); } }
  // las baldas de encima que bajan (con un botecito al llegar) y, al final, se quedan una más abajo
  if (baja) { const e = ease(caida);
    for (let j = 1; j <= a; j++) { const off = Math.round(-G.alto * (1 - e)); for (const b of filas[j - 1]) e_libro(R, b.x, base(j) + off, b.w, b.hh, b.c, s, b.tipo, b.k); }
    if (caida > 0.75 && caida < 1) for (let k = 0; k < 10; k++) { const px = G.x0 + G.lado + Math.round(h(k, 5, 663) * (G.x1 - G.x0 - 2 * G.lado)), py = base(a) - 1 - Math.round((caida - 0.75) * 16 * h(k, 6, 663)); pset(px, py, hex('#c8b090')); } }
  return { huecos, baldas: Array.from({ length: G.n }, (_, j) => [G.x0 + G.lado, base(j) - G.alto + G.tb, G.x1 - G.lado, base(j) - 1]) };
}

// la ciudad por una ventana (cl = [x0, y0, x1, y1]): modo 'noche' (luna, estrellas, avión) o 'tarde' (Boston al
// anochecer: ladrillo, la aguja, el cielo de naranja a malva); nubes de tres tonos a tres velocidades, dos capas de
// edificios con ventanas que se encienden y se apagan, la antena con su piloto, coches abajo; todo recortado al hueco
function e_ciudad(R, t, cl, modo = 'noche') {
  const [x0, y0, x1, y1] = cl, { pset, linea, disco } = R, W = x1 - x0, H = y1 - y0, noche = modo === 'noche';
  R.recorte(cl);
  const cielo = noche ? ['#0e1430', '#162048', '#202c5c', '#2c3a6c', '#3a4676', '#4c4e7a'].map(hex) : ['#3a3a78', '#5a4886', '#8a5a8a', '#c06e7e', '#e88a6a', '#f4b072'].map(hex);
  e_degradado(R, x0, y0, x1, y1, cielo);
  if (noche) { for (let k = 0; k < 22; k++) { const x = x0 + Math.round(h(k, 1, 670) * W), y = y0 + Math.round(h(k, 2, 670) * H * 0.55), b = Math.sin(t * (1.3 + (k % 4) * 0.5) + k * 2); if (b > -0.3) pset(x, y, b > 0.6 ? hex('#f4f0ff') : hex('#8a8ac0')); }
    const mx = x0 + Math.round(W * 0.7), my = y0 + 11; R.halo(mx, my, 13, [hex('#2a3668'), hex('#3a4678'), hex('#4e5a88')], 1.1); disco(mx, my, 6, hex('#f6f0d8')); disco(mx + 2, my - 1, 5, cielo[1]); pset(mx - 3, my + 1, hex('#d8d0b8')); pset(mx - 2, my - 3, hex('#d8d0b8'));
    const u = (t / 30) % 1, ax = Math.round(x0 - 10 + u * (W + 20)), ay = y0 + Math.round(H * 0.18 + u * 4); pset(ax, ay, hex('#c8c8d8')); pset(ax + 1, ay, hex('#c8c8d8')); if (Math.sin(t * 6) > 0.4) pset(ax - 1, ay, hex('#ff4a3a')); if (Math.sin(t * 6 + 2) > 0.6) pset(ax + 2, ay, hex('#f8f8ff')); }
  else { const sx = x0 + Math.round(W * 0.25), sy = y1 - Math.round(H * 0.28); R.halo(sx, sy, 22, [hex('#e88a6a'), hex('#f4a46a'), hex('#f8c47a'), hex('#fde0a0')], 1.1); disco(sx, sy, 5, hex('#fff0c0'));
    for (let k = 0; k < 3; k++) { const u = ((t / 40 + k * 0.33) % 1), bx = Math.round(x1 + 6 - u * (W + 20)), by = y0 + 8 + k * 5 + Math.round(Math.sin(t + k) * 1.5), a = Math.sin(t * 8 + k) > 0; pset(bx, by, hex('#2a1a2a')); pset(bx - 1, by - (a ? 1 : 0), hex('#2a1a2a')); pset(bx + 1, by - (a ? 1 : 0), hex('#2a1a2a')); } }
  const NB = noche ? [[hex('#1a2048'), hex('#2a325e'), hex('#4a5480')], [hex('#232a54'), hex('#343e6a'), hex('#5a6490')], [hex('#2a3260'), hex('#3e4874'), hex('#7a84a8')]] : [[hex('#6a4a7a'), hex('#a8607a'), hex('#e8906e')], [hex('#8a5a80'), hex('#c87a80'), hex('#f4b080')], [hex('#a8687e'), hex('#e09a84'), hex('#fcd4a0')]];
  for (const [fy, w, v, k] of [[0.12, 22, 0.8, 0], [0.26, 16, 1.6, 1], [0.38, 12, 2.6, 2]]) for (let r = 0; r < 2; r++) { const cx = x0 - 20 + ((h(k, r, 671) * 200 + t * v) % (W + 40)); e_nube(R, cx, y0 + H * fy + r * 3, w - r * 4, NB[k]); }
  // los edificios lejanos y los cercanos, con ventanas que cambian
  const capas = noche ? [[hex('#1e2448'), 0.45, hex('#c8a85a')], [hex('#141830'), 0.62, hex('#f4d27a')]] : [[hex('#7a4a5a'), 0.48, hex('#f8d890')], [hex('#5a3040'), 0.64, hex('#fce4a0')]];
  capas.forEach(([col, alt, luz], ci) => { let x = x0 - 4, i = 0;
    while (x < x1) { const w = 7 + Math.round(h(i, ci, 672) * 10), top = y1 - Math.round(H * (alt - 0.15 + h(i, ci, 673) * 0.3) * (ci ? 0.8 : 1)); e_rr(R, cl, x, top, x + w - 1, y1, col);
      if (!noche && ci === 1) for (let yy = top + 2; yy < y1; yy += 3) for (let xx = x + ((yy / 3) & 1); xx < x + w - 1; xx += 3) pset(xx, yy, e_mez(col, hex('#2a1420'), 0.4));
      for (let yy = top + 3; yy < y1 - 2; yy += 4) for (let xx = x + 2; xx < x + w - 2; xx += 3) if (h(xx, yy + Math.floor((t + xx * 0.3) / 7), 674 + ci) < (noche ? 0.32 : 0.4)) { pset(xx, yy, luz); if (ci) pset(xx, yy + 1, e_mez(luz, col, 0.4)); }
      if (i % 4 === 2 && ci === 1) { linea(x + (w >> 1), top - 6, x + (w >> 1), top, col); if (Math.sin(t * 2.5 + i) > 0) pset(x + (w >> 1), top - 7, hex('#ff4a3a')); }
      x += w + (ci ? 1 : 2); i++; } });
  if (!noche) { const ax = x0 + Math.round(W * 0.62), ay = y1 - Math.round(H * 0.62); R.poligono([[ax - 3, ay + 10], [ax + 3, ay + 10], [ax, ay - 8]], hex('#4a2838')); e_rr(R, cl, ax - 4, ay + 10, ax + 4, y1, hex('#4a2838')); pset(ax, ay + 13, hex('#fce4a0')); }
  // la calle: coches con sus faros que pasan
  e_rr(R, cl, x0, y1 - 2, x1, y1, noche ? hex('#0e1020') : hex('#3a2030'));
  for (let k = 0; k < 2; k++) { const u = ((t / (7 + k * 3) + k * 0.5) % 1), cx = k ? Math.round(x1 + 8 - u * (W + 16)) : Math.round(x0 - 8 + u * (W + 16)); pset(cx, y1 - 1, hex('#fff4c0')); pset(cx + (k ? 1 : -1), y1 - 1, hex('#fff4c0')); pset(cx + (k ? 6 : -6), y1 - 1, hex('#ff4a3a')); }
  R.recorte(null);
}

// el marco de una ventana de madera con su cruz, el alféizar y el reflejo en el cristal (encima de lo que se ve)
function e_marco(R, x0, y0, x1, y1, M, cruz = true) {
  const { rect, linea } = R; rect(x0 - 4, y0 - 4, x1 + 4, y0 - 1, M.c); rect(x0 - 4, y1 + 1, x1 + 4, y1 + 3, M.c); rect(x0 - 4, y0 - 4, x0 - 1, y1 + 3, M.c); rect(x1 + 1, y0 - 4, x1 + 4, y1 + 3, M.c);
  rect(x0 - 4, y0 - 4, x1 + 4, y0 - 4, M.l); rect(x0 - 4, y0 - 4, x0 - 4, y1 + 3, M.l); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, M.d); rect(x1 + 4, y0 - 4, x1 + 4, y1 + 3, M.d);
  if (cruz) { const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1; rect(mx - 1, y0, mx + 1, y1, M.c); rect(mx - 1, y0, mx - 1, y1, M.l); rect(mx + 1, y0, mx + 1, y1, M.d); rect(x0, my - 1, x1, my + 1, M.c); rect(x0, my - 1, x1, my - 1, M.l); rect(x0, my + 1, x1, my + 1, M.d); }
  R.recorte([x0, y0, x1, y1]); for (const d of [0, 1, 6]) linea(x0 + 8 + d, y1, x0 + 8 + d + (y1 - y0), y0, e_mez(hex('#8a9ac8'), hex('#ffffff'), 0.3), 3); R.recorte(null);
  rect(x0 - 7, y1 + 4, x1 + 7, y1 + 7, M.c); rect(x0 - 7, y1 + 4, x1 + 7, y1 + 4, M.l); rect(x0 - 7, y1 + 7, x1 + 7, y1 + 7, M.d);
}

// una cortina de tela con pliegues verticales (luz y sombra) que se mece un poco
function e_cortina(R, t, x0, x1, y0, y1, c, k = 0) {
  const cS = e_mez(c, C.k, 0.35), cL = e_mez(c, hex('#ffffff'), 0.25);
  for (let y = y0; y <= y1; y++) { const d = Math.round(Math.sin(t * 0.8 + y * 0.05 + k) * (y - y0) / (y1 - y0) * 1.5); for (let x = x0; x <= x1; x++) { const f = Math.sin((x - x0 + d) * 1.1 + k); R.pset(x, y, f > 0.55 ? cL : f < -0.5 ? cS : c); } }
  R.rect(x0, y1, x1, y1, cS); for (let x = x0; x <= x1; x += 3) R.pset(x, y1 + 1, cS);
}

// la barra de la cortina con sus anillas
function e_barra(R, x0, x1, y) { R.rect(x0, y, x1, y + 1, hex('#b08a4a')); R.rect(x0, y, x1, y, hex('#e8c880')); R.disco(x0, y + 0.5, 2, hex('#c8a050')); R.disco(x1, y + 0.5, 2, hex('#c8a050')); }

// un monitor de tubo (de los ochenta y noventa, beis o gris) de w × hh con su pie; devuelve el hueco de la pantalla
function e_crt(R, x, y, w, hh, cuerpo = hex('#d8ccb0')) {
  const { rect, pset } = R, cL = e_mez(cuerpo, hex('#ffffff'), 0.35), cS = e_mez(cuerpo, C.k, 0.3), cD = e_mez(cuerpo, C.k, 0.55);
  rect(x + 4, y + 2, x + w - 5, y + hh + 1, cD);   // la caja de atrás del tubo, que asoma
  rect(x, y, x + w - 1, y + hh - 1, C.k); rect(x + 1, y + 1, x + w - 2, y + hh - 2, cuerpo); rect(x + 1, y + 1, x + w - 2, y + 1, cL); rect(x + 1, y + 1, x + 1, y + hh - 2, cL); rect(x + w - 2, y + 2, x + w - 2, y + hh - 2, cS); rect(x + 2, y + hh - 2, x + w - 2, y + hh - 2, cS);
  const sx0 = x + 4, sy0 = y + 4, sx1 = x + w - 5, sy1 = y + hh - 8; rect(sx0 - 1, sy0 - 1, sx1 + 1, sy1 + 1, cD);
  pset(x + w - 6, y + hh - 5, hex('#4ae070')); rect(x + 4, y + hh - 5, x + 8, y + hh - 5, cS); for (let i = x + 10; i < x + w - 9; i += 2) pset(i, y + hh - 5, cS);
  rect(x + (w >> 1) - 6, y + hh, x + (w >> 1) + 5, y + hh + 2, cS); rect(x + (w >> 1) - 9, y + hh + 2, x + (w >> 1) + 8, y + hh + 3, cuerpo); rect(x + (w >> 1) - 9, y + hh + 3, x + (w >> 1) + 8, y + hh + 3, cS);
  return [sx0, sy0, sx1, sy1];
}

// lo que sale en una pantalla: bloques monocromos sueltos que bajan despacio por columnas (nunca un pozo con piezas de
// colores) y un montoncito suelto abajo que de vez en cuando se ilumina y se borra, con las líneas de barrido y el
// reflejo; tinta, fondo; frio: t fijo (la imagen congelada); k: semilla
function e_pantalla(R, t, sc, o = {}) {
  const [x0, y0, x1, y1] = sc, { pset } = R, tin = o.tinta ?? hex('#7aff9a'), fon = o.fondo ?? hex('#0c1a14'), b = o.bloque ?? 3, k = o.k ?? 0, tt = o.frio != null ? o.frio : t;
  const W = x1 - x0 + 1, H = y1 - y0 + 1, cols = Math.max(2, Math.floor((W - 2) / (b + 1))), tS = e_mez(tin, fon, 0.45), tL = e_mez(tin, hex('#ffffff'), 0.5);
  R.rect(x0, y0, x1, y1, fon);
  const cuadro = (cx, cy, c) => { for (let j = 0; j < b; j++) for (let i = 0; i < b; i++) { const X = cx + i, Y = cy + j; if (X >= x0 && X <= x1 && Y >= y0 && Y <= y1) pset(X, Y, i === 0 || j === 0 ? tL : i === b - 1 || j === b - 1 ? tS : c); } };
  const ciclo = 6, fase = Math.floor(tt / ciclo), u = (tt % ciclo) / ciclo;
  for (let c = 0; c < cols; c++) { const alto = Math.floor(h(c, fase, 680 + k) * 2.4); for (let r = 0; r < alto; r++) cuadro(x0 + 1 + c * (b + 1), y1 - (r + 1) * (b + 1) + 1, u > 0.85 && r === 0 ? (Math.floor(tt * 10) % 2 ? tL : tin) : tin); }
  for (let n = 0; n < Math.max(2, cols >> 1); n++) { const c = Math.floor(h(n, 1, 681 + k) * cols), v = 4 + h(n, 2, 681 + k) * 6, y = y0 - b + ((tt * v + h(n, 3, 681 + k) * H) % (H - 2 * b)); cuadro(x0 + 1 + c * (b + 1), Math.round(y), tin); if (n % 2 === 0) cuadro(x0 + 1 + (c + 1) % cols * (b + 1), Math.round(y), tin); }
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) pset(x, y, e_mez(R.pget(x, y), C.k, 0.22));
  pset(x0 + 1, y0 + 1, hex('#ffffff')); pset(x0 + 2, y0 + 1, e_mez(fon, hex('#ffffff'), 0.5)); pset(x0 + 1, y0 + 2, e_mez(fon, hex('#ffffff'), 0.5));
}

// una taza que humea (x: centro, yb: la base)
function e_taza(R, t, x, yb, col, k = 0, g = 1) {
  const { rect, pset } = R, cS = e_mez(col, C.k, 0.35), cL = e_mez(col, hex('#ffffff'), 0.4), w = 3 * g, hh = 6 * g;
  rect(x - w - 1, yb - hh - 1, x + w + 1, yb, C.k); rect(x - w, yb - hh, x + w, yb - 1, col); rect(x - w, yb - hh, x - w + g - 1, yb - 1, cL); rect(x + w - g + 1, yb - hh, x + w, yb - 1, cS);
  rect(x - w, yb - hh, x + w, yb - hh + g - 1, hex('#4a2a14'));
  rect(x + w + 1, yb - hh + 2 * g, x + w + 2 * g, yb - 2 * g, C.k); rect(x + w + 1, yb - hh + 3 * g, x + w + g, yb - 3 * g, col);
  for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3 + k * 0.37) % 1, y = yb - hh - 1 - Math.round(ph * 12 * g), xx = x - g + i * g + Math.round(Math.sin(ph * 6 + i + t) * 1.5 * g); if (ph < 0.85 && e_b4(xx, y) < 1 - ph) { pset(xx, y, hex('#f0ece4')); if (g > 1) pset(xx + 1, y, hex('#d8d4cc')); } }
}

// una planta en maceta de barro con hojas que se mecen (x: centro, yb: base, alto)
function e_maceta(R, x, yb, t, alto = 16) {
  const { rect, linea, pset } = R, w = Math.round(alto * 0.4), V = [hex('#2e5a2a'), hex('#4a8a3a'), hex('#7ab84a')];
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.33 + Math.sin(t * 1.4 + k) * 0.06, L = alto * (0.7 + h(k, 1, 690) * 0.5), ex = x + Math.cos(a) * L, ey = yb - w * 1.6 + Math.sin(a) * L;
    linea(x, yb - Math.round(w * 1.6), Math.round(ex), Math.round(ey), V[0]); for (let i = 2; i < L; i += 2) { const px = Math.round(x + Math.cos(a) * i), py = Math.round(yb - w * 1.6 + Math.sin(a) * i); pset(px - 1, py, V[1]); pset(px + 1, py + 1, V[2 - (k & 1)]); } }
  rect(x - w, yb - Math.round(w * 1.6), x + w, yb, C.k); rect(x - w + 1, yb - Math.round(w * 1.6) + 1, x + w - 1, yb - 1, hex('#b0603a')); rect(x - w - 1, yb - Math.round(w * 1.6), x + w + 1, yb - Math.round(w * 1.6) + 2, hex('#c87a4a')); rect(x - w - 1, yb - Math.round(w * 1.6), x + w + 1, yb - Math.round(w * 1.6), hex('#e8a070')); rect(x + w - 2, yb - Math.round(w * 1.6) + 3, x + w - 1, yb - 1, hex('#8a4a2a'));
}

// la pila de libros del suelo (delante, abajo a la izquierda)
function e_pilaSuelo(R, x, yb) { e_libro(R, x, yb, 24, 15, 0, 1, 'pila', 3); e_libro(R, x + 2, yb - 15, 19, 12, 0, 1, 'pila', 7); }

// el gato atigrado sentado (x: centro, yb: donde apoya), que mueve la cola, parpadea y gira las orejas
function e_gato(R, t, x, yb, dir = 1) {
  const { rect, pset, disco } = R, A = hex('#d8843a'), S = hex('#9a5222'), L = hex('#f4b06a'), K = hex('#2a1a12');
  const cola = Math.sin(t * 1.7) * 3;
  for (let i = 0; i < 9; i++) { const cx = x - dir * (5 + i), cy = yb - 1 - Math.round(Math.sin(i / 9 * Math.PI) * (2 + cola * 0.5) + (i > 6 ? (i - 6) * cola * 0.4 : 0)); pset(cx, cy, i % 3 === 1 ? S : A); pset(cx, cy - 1, K); }
  disco(x, yb - 5, 5, K); disco(x, yb - 5, 4, A); rect(x - 3, yb - 2, x + 3, yb - 1, A); for (const d of [-2, 1]) rect(x + d, yb - 8, x + d, yb - 3, S);
  rect(x - 4, yb - 1, x - 2, yb - 1, L); rect(x + 2, yb - 1, x + 4, yb - 1, L);
  const hx = x + dir * 2, hy = yb - 12; disco(hx, hy, 4, K); disco(hx, hy, 3, A); const or = Math.sin(t * 0.6) > 0.9 ? 1 : 0;
  pset(hx - 3, hy - 4 + or, K); pset(hx - 2, hy - 4, A); pset(hx - 3, hy - 3, A); pset(hx + 3, hy - 4, K); pset(hx + 2, hy - 4, A); pset(hx + 3, hy - 3, A);
  if ((t % 4.3) > 0.18) { pset(hx - 1, hy, hex('#c8e070')); pset(hx + 2, hy, hex('#c8e070')); } else { pset(hx - 1, hy, S); pset(hx + 2, hy, S); }
  pset(hx + dir, hy + 2, hex('#e87a8a')); rect(hx - 2, hy - 3, hx + 2, hy - 3, S); pset(hx, hy - 2, S);
}

// una polilla que da vueltas alrededor de una lámpara
function e_polilla(R, t, cx, cy, r = 6) { const a = t * 3.1, x = Math.round(cx + Math.cos(a) * r + Math.sin(t * 7) * 1.5), y = Math.round(cy + Math.sin(a * 1.3) * r * 0.6); R.pset(x, y, hex('#e8dcc0')); if (Math.sin(t * 30) > 0) { R.pset(x - 1, y - 1, hex('#c8b898')); R.pset(x + 1, y - 1, hex('#c8b898')); } }

// motas de polvo que flotan en un cono de luz
function e_motas(R, t, x0, x1, y0, y1, n, c, k = 0) { for (let i = 0; i < n; i++) { const x = Math.round(x0 + ((h(i, 1, 700 + k) * (x1 - x0) + Math.sin(t * 0.4 + i) * 6 + t * 1.5) % (x1 - x0))), y = Math.round(y0 + ((h(i, 2, 700 + k) * (y1 - y0) - t * (1 + h(i, 3, 700 + k) * 2)) % (y1 - y0) + (y1 - y0)) % (y1 - y0)); if (Math.sin(t * 2 + i) > -0.4) R.pset(x, y, c); } }

// una alfombra ovalada con cenefa (cx, cy, rx, ry)
function e_alfombra(R, cx, cy, rx, ry, cols) {
  for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d > 1) continue;
    const c = d > 0.92 ? cols[0] : d > 0.82 ? ((x + y) % 4 < 2 ? cols[1] : cols[2]) : d > 0.76 ? cols[0] : d < 0.3 && ((Math.abs(x - cx) * ry / rx + Math.abs(y - cy)) % 6 < 2) ? cols[2] : ((x >> 1) + (y >> 1)) % 7 === 0 ? cols[1] : cols[3]; R.pset(x, y, y > cy + ry * 0.7 && d > 0.9 ? e_mez(c, C.k, 0.3) : c); }
  for (let x = cx - rx + 6; x <= cx + rx - 6; x += 3) { R.pset(x, cy + ry + 1, cols[2]); }
}

// un reloj de pared redondo con las agujas que andan (r: radio)
function e_reloj(R, t, cx, cy, r, aro = hex('#c8a050')) {
  R.disco(cx, cy, r + 1, C.k); R.disco(cx, cy, r, aro); R.disco(cx, cy, r - 1, hex('#f4ecd8'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.sin(a) * (r - 2)), Math.round(cy - Math.cos(a) * (r - 2)), hex('#6a5a4a')); }
  const s = (t * 6) % 60, m = 14 + t / 60; R.linea(cx, cy, Math.round(cx + Math.sin(m / 60 * 6.283) * (r - 2)), Math.round(cy - Math.cos(m / 60 * 6.283) * (r - 2)), C.k); R.linea(cx, cy, Math.round(cx + Math.sin(0.4) * (r - 3)), Math.round(cy - Math.cos(0.4) * (r - 3)), C.k);
  R.linea(cx, cy, Math.round(cx + Math.sin(s / 60 * 6.283) * (r - 1)), Math.round(cy - Math.cos(s / 60 * 6.283) * (r - 1)), hex('#c83a2a')); R.pset(cx, cy, C.k);
}

// un flexo sobre la mesa (base en x, yb) con la pantalla en (hx, hy) que mira hacia abajo y su cono de luz
function e_flexo(R, x, yb, hx, hy, col = hex('#3a6a5a')) {
  const { rect, linea, disco, poligono } = R, cS = e_mez(col, C.k, 0.4), cL = e_mez(col, hex('#ffffff'), 0.35), mx = x + 3, my = hy + 8;
  rect(x - 5, yb - 2, x + 5, yb, C.k); rect(x - 4, yb - 2, x + 4, yb - 1, col); rect(x - 4, yb - 2, x + 4, yb - 2, cL);
  linea(x, yb - 2, mx, my, C.k); linea(x + 1, yb - 2, mx + 1, my, hex('#8a8a8a')); linea(mx, my, hx - 2, hy, C.k); linea(mx + 1, my, hx - 1, hy + 1, hex('#8a8a8a')); disco(mx, my, 1.5, cS);
  poligono([[hx - 4, hy - 2], [hx + 3, hy - 4], [hx + 8, hy + 5], [hx - 2, hy + 6]], C.k); poligono([[hx - 3, hy - 1], [hx + 3, hy - 3], [hx + 6, hy + 4], [hx - 1, hy + 5]], col); linea(hx - 3, hy - 1, hx + 3, hy - 3, cL);
  rect(hx - 1, hy + 5, hx + 6, hy + 6, hex('#fff4c8'));
}

// los bloques de madera del escritorio, de la pieza del reparto
function e_bloquesMesa(R, x, yb) { const B = PIEZAS_TS.bloques; if (!B) return; B(R, x, yb, { n: 2 }); B(R, x - 4, yb - 10, { n: 1 }); }

// el estudio de Atom, plano general (ver la cabecera de hoy)
function e_estudio(R, t, o) {
  const { rect, pset, linea, disco } = R, G = { x0: 94, x1: 210, y0: 30, alto: 27, n: 4, s: 1, lado: 5, tb: 3 }, pz = !!o.pizarra;
  const MZ = { c: hex('#6e4228'), s: hex('#52301a'), l: hex('#9a6a3e'), d: hex('#341c0e') }, MV = { c: hex('#e2d4b4'), l: hex('#fff4dc'), d: hex('#a8987a') }, LUZ = hex('#ffd890');
  e_fijo(R, 'estudio' + (pz ? 'P' : ''), () => {
    e_papel(R, 0, 4, 319, 105, hex('#7a4a3a'), hex('#714334'), hex('#8c5a46'), 1);
    rect(0, 0, 319, 2, hex('#4a2a1c')); rect(0, 3, 319, 3, hex('#9a6a4a'));
    e_cuarterones(R, 0, 106, 319, 127, 28, MZ, 2);
    rect(0, 128, 319, 131, hex('#3a2014')); rect(0, 128, 319, 128, hex('#8a5a34'));
    e_tarima(R, 132, 179, hex('#8a5432'), hex('#744428'), hex('#ad7a4a'), hex('#4a2814'), 3);
    // la luz cálida del flexo y la de la ventana en la pared
    e_luz(R, 248, 100, 58, 44, LUZ, 0.2); e_luz(R, 46, 62, 50, 46, hex('#6a7ab0'), 0.1);
    // el radiador bajo la ventana
    rect(20, 108, 72, 127, C.k); for (let x = 21; x < 72; x += 4) { rect(x, 109, x + 2, 126, hex('#d8d0c0')); rect(x, 109, x, 126, hex('#f4ecdc')); rect(x + 2, 110, x + 2, 126, hex('#a8a090')); } rect(20, 108, 72, 109, hex('#c0b8a8')); rect(70, 124, 76, 126, hex('#8a7a5a'));
    // la alfombra
    e_alfombra(R, 160, 164, 70, 12, [hex('#5a1e22'), hex('#c8963a'), hex('#e8cf8a'), hex('#8a2e2e')]);
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) if (y < 150 && x > 210 && x < 316 && (x + y) % 2 === 0) pset(x, y, e_mez(R.pget(x, y), C.k, 0.25));
    // la estantería
    e_mueble(R, G); rect(G.x0 - 3, 147, G.x1 + 3, 149, hex('#3a2014'));
    // la bola del mundo y la planta colgante encima
    disco(110, 19, 5, C.k); disco(110, 19, 4, hex('#3a7ab0')); for (const [dx, dy] of [[-2, -1], [-1, -2], [1, 1], [2, 0], [0, 2]]) pset(110 + dx, 19 + dy, hex('#6aa84a')); pset(108, 17, hex('#a8d8f8')); rect(109, 24, 111, 24, hex('#c8a050')); rect(106, 25, 114, 25, hex('#8a6a30'));
    e_libro(R, 120, 25, 18, 9, 0, 1, 'pila', 5);
    rect(190, 18, 200, 24, C.k); rect(191, 19, 199, 24, hex('#b0603a')); rect(190, 18, 200, 18, hex('#e8a070'));
    for (let k = 0; k < 7; k++) { const x = 188 + k * 2, L = 4 + Math.round(h(k, 1, 701) * 22); for (let i = 0; i < L; i++) pset(x + Math.round(Math.sin(i * 0.4 + k) * 1.2), 24 + i, i % 3 ? hex('#4a8a3a') : hex('#7ab84a')); }
    // el escritorio con su cajonera
    e_madera(R, 216, 124, 314, 128, MZ.c, MZ.s, MZ.l, MZ.d, 5, 5); rect(216, 124, 314, 124, hex('#c08a5a')); rect(216, 128, 314, 128, MZ.d);
    rect(220, 129, 224, 147, MZ.s); rect(220, 129, 220, 147, MZ.l); rect(225, 129, 281, 147, e_mez(hex('#2a1810'), hex('#4a2a1a'), 0.5));
    e_madera(R, 282, 129, 312, 147, MZ.c, MZ.s, MZ.l, MZ.d, 6, 6); for (let j = 0; j < 3; j++) { const y = 130 + j * 6; rect(284, y, 310, y + 5, MZ.d); rect(285, y + 1, 309, y + 4, MZ.c); rect(285, y + 1, 309, y + 1, MZ.l); rect(294, y + 3, 300, y + 3, hex('#d8b060')); }
    // el cuadro (o la pizarra) y el reloj
    if (pz) { rect(214, 36, 276, 88, C.k); e_madera(R, 215, 37, 275, 87, MZ.c, MZ.s, MZ.l, MZ.d, 8, 49); rect(218, 40, 272, 83, hex('#24382e'));
      for (let i = 0; i < 160; i++) pset(219 + Math.round(h(i, 1, 702) * 52), 41 + Math.round(h(i, 2, 702) * 41), h(i, 3, 702) < 0.5 ? hex('#30463a') : hex('#3a5244'));
      for (let k = 0; k < 4; k++) linea(222 + k * 12, 78 - k, 232 + k * 12, 74 - k, hex('#4a6052')); rect(216, 84, 274, 86, MZ.l); rect(232, 83, 238, 84, hex('#f4f0e4')); rect(250, 83, 253, 84, hex('#f0c0c8')); }
    else { rect(222, 56, 262, 82, C.k); rect(223, 57, 261, 81, hex('#c8a050')); rect(223, 57, 261, 57, hex('#f0d890')); rect(226, 60, 258, 78, hex('#8ab0d0'));
      for (let y = 60; y <= 78; y++) for (let x = 226; x <= 258; x++) { const m = 70 - Math.abs(x - 238) * 0.6 - Math.abs(x - 252) * 0.2; if (y > 72) pset(x, y, (x + y) % 3 ? hex('#3a6a9a') : hex('#5a8ab8')); else if (y > m) pset(x, y, y > m + 4 ? hex('#4a7a4a') : hex('#6a9a5a')); else if (y < 64 && h(x, y, 703) < 0.15) pset(x, y, hex('#f4f4f4')); }
      disco(252, 64, 2, hex('#fff0b0')); rect(223, 81, 261, 81, hex('#8a6a30')); }
    // las cosas de la mesa que no se mueven: el monitor, el teclado, los disquetes, el lapicero
    rect(252, 122, 292, 124, hex('#a89c80')); rect(253, 122, 291, 122, hex('#e8dcc0')); for (let x = 255; x < 290; x += 3) pset(x, 123, hex('#7a705a'));
    rect(296, 121, 302, 123, hex('#d8d0c0')); rect(296, 121, 302, 121, hex('#ffffff')); linea(302, 122, 306, 124, hex('#6a6a6a'));
    rect(218, 120, 226, 123, hex('#2a2a3a')); rect(218, 118, 226, 119, hex('#3a4a8a')); rect(219, 116, 225, 117, hex('#8a2a2a'));
  });
  // la ciudad de noche por la ventana, el marco, las cortinas y el gato del alféizar
  e_ciudad(R, t, [18, 30, 74, 92], 'noche'); e_marco(R, 18, 30, 74, 92, MV);
  e_barra(R, 2, 90, 18); e_cortina(R, t, 3, 15, 20, 104, hex('#2e5a4e'), 0); e_cortina(R, t, 77, 89, 20, 104, hex('#2e5a4e'), 2);
  e_gato(R, t, 30, 95, 1);
  // los libros con el gag
  const est = e_libros(R, t, G, o.balda ?? 2, e_cl(o.encajan ?? 0), e_cl(o.desaparece ?? 0), !!o.parpadean);
  // el ordenador viejo, el flexo, la taza, los bloques, el reloj
  const sc = e_crt(R, 254, 91, 36, 30); e_pantalla(R, t, sc, { tinta: hex('#ffc860'), fondo: hex('#1a1206'), k: 1 });
  e_flexo(R, 230, 124, 244, 98); e_luz(R, 250, 123, 20, 4, LUZ, 0.3); e_polilla(R, t, 246, 104, 7);
  e_taza(R, t, 240, 124, hex('#c84a3a'), 0); e_bloquesMesa(R, 305, 124);
  if (!pz) e_reloj(R, t, 272, 70, 6);
  e_motas(R, t, 236, 270, 100, 122, 7, hex('#ffe8b0'));
  return { suelo: 152, estanteria: est, ventana: [18, 30, 74, 92], mesa: [216, 124, 314, 124], pantalla: sc, pizarra: pz ? [218, 40, 272, 83] : null, libre: [[20, 92], [100, 212]] };
}

// el estudio de Atom, cámara 'estanteria': la estantería de cerca, con el mismo gag a doble tamaño
function e_estudioCerca(R, t, o) {
  const { rect, pset } = R, G = { x0: 46, x1: 270, y0: 24, alto: 38, n: 4, s: 2, lado: 8, tb: 5 }, MZ = { c: hex('#6e4228'), s: hex('#52301a'), l: hex('#9a6a3e'), d: hex('#341c0e') };
  e_fijo(R, 'estudioCerca', () => {
    e_papel(R, 0, 0, 319, 115, hex('#7a4a3a'), hex('#714334'), hex('#8c5a46'), 4);
    e_cuarterones(R, 0, 116, 319, 165, 30, MZ, 9); rect(0, 166, 319, 170, hex('#3a2014')); rect(0, 166, 319, 166, hex('#8a5a34'));
    e_tarima(R, 171, 179, hex('#8a5432'), hex('#744428'), hex('#ad7a4a'), hex('#4a2814'), 7);
    e_luz(R, 300, 74, 40, 50, hex('#ffd890'), 0.25);
    // el aplique de la pared derecha y el retrato pequeño de debajo
    rect(297, 78, 303, 84, C.k); rect(298, 79, 302, 83, hex('#c8a050')); R.poligono([[292, 66], [308, 66], [305, 76], [295, 76]], hex('#f4dca0')); rect(295, 66, 305, 66, hex('#fff4d0')); rect(295, 76, 305, 76, hex('#c8a060'));
    rect(288, 94, 312, 112, C.k); rect(289, 95, 311, 111, hex('#c8a050')); rect(291, 97, 309, 109, hex('#e8dcc4')); R.disco(300, 102, 4, hex('#6a4a3a')); rect(296, 106, 304, 109, hex('#4a5a7a'));
    e_mueble(R, G);
  });
  // a la izquierda, el borde de la ventana con la noche y la cortina
  e_ciudad(R, t, [0, 30, 22, 100], 'noche'); rect(23, 26, 27, 104, hex('#e2d4b4')); rect(23, 26, 23, 104, hex('#fff4dc')); rect(0, 101, 30, 104, hex('#e2d4b4')); rect(0, 101, 30, 101, hex('#fff4dc'));
  e_cortina(R, t, 26, 40, 20, 112, hex('#2e5a4e'), 1); e_barra(R, 0, 42, 18);
  const est = e_libros(R, t, G, o.balda ?? 2, e_cl(o.encajan ?? 0), e_cl(o.desaparece ?? 0), !!o.parpadean);
  e_polilla(R, t, 300, 70, 9); e_motas(R, t, 280, 318, 60, 110, 6, hex('#ffe8b0'), 3);
  return { suelo: 178, estanteria: est, libre: [[2, 40], [278, 318]] };
}

// pared de bloques de hormigón pintado: hiladas con su junta, bloques a matajunta, grano y alguno más claro
function e_bloquesPared(R, x0, y0, x1, y1, c, cJ, cL, k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += 8, f++) { rect(x0, y, x1, y, cJ); for (let x = x0 - (f & 1) * 9; x <= x1; x += 18) { if (x >= x0) rect(x, y, x, Math.min(y1, y + 7), cJ); if (x + 1 >= x0 && x + 1 <= x1) rect(x + 1, y + 1, Math.min(x1, x + 17), y + 1, cL); if (h(x, f, 720 + k) < 0.15) rect(Math.max(x0, x + 2), y + 2, Math.min(x1, x + 16), Math.min(y1, y + 6), e_mez(c, cL, 0.4)); } }
  for (let i = 0; i < (x1 - x0) * (y1 - y0) / 25; i++) pset(x0 + Math.round(h(i, 1, 721 + k) * (x1 - x0)), y0 + Math.round(h(i, 2, 721 + k) * (y1 - y0)), h(i, 3, 721 + k) < 0.5 ? cJ : cL);
}

// suelo de losetas de linóleo en perspectiva, a cuadros de dos tonos, con motas y el reflejo de los fluorescentes
function e_linoleo(R, y0, y1, c1, c2, cJ, k = 0) {
  const { rect, pset } = R; let y = y0, f = 0;
  while (y <= y1) { const alto = Math.round(4 + (y - y0) * 0.22), w = 22 + Math.round((y - y0) * 0.5), yb = Math.min(y1, y + alto - 1), dx = Math.round((y - y0) * 0.1);
    for (let x = -w + (dx % w), i = 0; x < 320; x += w, i++) { rect(x, y, x + w - 1, yb, (i + f) & 1 ? c1 : c2); rect(x, y, x, yb, cJ); }
    rect(0, y, 319, y, cJ); for (let i = 0; i < 30 + alto * 6; i++) pset(Math.round(h(i, f, 730 + k) * 319), y + 1 + Math.round(h(i, f + 50, 730 + k) * (alto - 2)), h(i, f, 731 + k) < 0.5 ? cJ : e_mez(c1, hex('#ffffff'), 0.4));
    y = yb + 1; f++; }
}

// una torre de ordenador beis de los noventa con su disquetera, el lector y el piloto que parpadea
function e_torre(R, t, x, yb, w = 12, hh = 26, k = 0) {
  const { rect, pset } = R, B = hex('#d8ccb0'), L = hex('#f2e8d0'), S = hex('#a89c80');
  rect(x, yb - hh, x + w - 1, yb - 1, C.k); rect(x + 1, yb - hh + 1, x + w - 2, yb - 1, B); rect(x + 1, yb - hh + 1, x + w - 2, yb - hh + 1, L); rect(x + 1, yb - hh + 1, x + 1, yb - 1, L); rect(x + w - 2, yb - hh + 2, x + w - 2, yb - 1, S);
  rect(x + 2, yb - hh + 4, x + w - 3, yb - hh + 6, S); rect(x + 3, yb - hh + 5, x + w - 4, yb - hh + 5, hex('#3a3a3a')); rect(x + 2, yb - hh + 9, x + w - 3, yb - hh + 10, S); rect(x + 4, yb - hh + 9, x + w - 5, yb - hh + 9, hex('#4a4a4a'));
  for (let y = yb - 10; y < yb - 2; y += 2) rect(x + 3, y, x + w - 4, y, S);
  pset(x + 3, yb - hh + 13, Math.sin(t * 9 + k * 3) > 0.2 ? hex('#ffb040') : hex('#7a5a2a')); pset(x + 5, yb - hh + 13, hex('#4ae070'));
}

// el monitor de ondas: cuatro trazos verdes que corren hacia la izquierda, con el barrido
function e_ondas(R, t, sc, n = 4, tin = hex('#5aff8a')) {
  const [x0, y0, x1, y1] = sc, { pset } = R; R.rect(x0, y0, x1, y1, hex('#06140c'));
  for (let x = x0; x <= x1; x += 4) for (let y = y0; y <= y1; y += 4) pset(x, y, hex('#0e2a1a'));
  const paso = (y1 - y0) / n;
  for (let k = 0; k < n; k++) { const yb = y0 + paso * (k + 0.5); let py = null;
    for (let x = x0; x <= x1; x++) { const u = x * 0.9 + t * 30, v = Math.sin(u * (0.12 + k * 0.05)) * (paso * 0.25) + Math.sin(u * 0.37 + k) * (paso * 0.12) + (h(Math.floor(u), k, 740) - 0.5) * paso * 0.25, y = Math.round(yb + v);
      if (py != null) R.linea(x - 1, py, x, y, k === 1 ? hex('#f0e070') : tin); py = y; } }
  const bx = x0 + Math.round((t * 14) % (x1 - x0)); for (let y = y0; y <= y1; y++) pset(bx, y, hex('#1a4a2a'));
}

// la habitación de dormir vista por la cristalera (cl): pared azul, la cama, la mesilla con su lamparita, la cámara de
// infrarrojos con el piloto, la cortina y, si dormido, alguien bajo la manta
function e_cuartoFondo(R, t, cl, dormido) {
  const [x0, y0, x1, y1] = cl, { rect, pset, disco, linea } = R, rr = (a, b, c, d, col) => e_rr(R, cl, a, b, c, d, col);
  R.recorte(cl);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y > y1 - 12 ? (((x >> 3) + (y >> 2)) & 1 ? hex('#2a2a40') : hex('#262638')) : (x % 10 < 2 ? hex('#2a3454') : hex('#2e3a5c')));
  e_luz(R, 308, 86, 26, 22, hex('#f8c070'), 0.22);
  rr(x0, y1 - 12, x1, y1 - 12, hex('#3e3e58'));
  // el cuadro de constelaciones, la cortina de la izquierda y la cámara de infrarrojos con su piloto
  rr(240, 60, 262, 72, hex('#c8a050')); rr(241, 61, 261, 71, hex('#141a34')); for (const [a, b] of [[244, 64], [249, 67], [254, 63], [258, 68]]) pset(a, b, hex('#e8e8ff')); linea(244, 64, 249, 67, hex('#5a6aa0')); linea(249, 67, 254, 63, hex('#5a6aa0'));
  for (let x = x0; x < x0 + 12; x++) for (let y = y0; y <= y1 - 12; y++) pset(x, y, Math.sin(x * 1.3 + Math.sin(t * 0.7 + y * 0.08)) > 0.3 ? hex('#5a4a7a') : hex('#4a3c66'));
  rr(296, 54, 306, 58, hex('#2a2a30')); rr(296, 54, 306, 54, hex('#6a6a7a')); rr(304, 58, 305, 62, hex('#4a4a52')); pset(298, 56, Math.sin(t * 3) > 0 ? hex('#ff3a3a') : hex('#6a1a1a'));
  // la cama de canto: patas, colchón, manta azul, almohada y el cabecero a la derecha
  rr(228, 98, 230, y1 - 6, hex('#5a3a22')); rr(292, 98, 294, y1 - 6, hex('#5a3a22')); rr(226, 92, 296, 99, hex('#e8e8f0')); rr(226, 98, 296, 99, hex('#a8a8c0'));
  rr(296, 76, 301, y1 - 6, hex('#6a4428')); rr(296, 76, 301, 77, hex('#9a6a3e'));
  rr(283, 86, 295, 92, hex('#f4f4fc')); rr(283, 91, 295, 92, hex('#b8b8d0'));
  if (dormido) { const r = Math.sin(t * 1.3) > 0 ? 1 : 0; rr(228, 86 - r, 284, 97, hex('#4a6aa0')); rr(240, 84 - r, 272, 86, hex('#4a6aa0')); rr(228, 86 - r, 284, 86 - r, hex('#7a9ad0')); for (let x = 232; x < 284; x += 6) rr(x, 88, x, 96, hex('#3a5888'));
    disco(287, 85, 4, hex('#5a3a20')); disco(286, 86, 3, hex('#e8c0a0')); pset(285, 86, hex('#3a2010')); rr(280, 86 - r, 283, 92, hex('#e8e8f0')); }
  else { rr(230, 88, 270, 92, hex('#4a6aa0')); rr(230, 88, 270, 88, hex('#7a9ad0')); for (let x = 234; x < 270; x += 6) pset(x, 90, hex('#3a5888')); }
  // la mesilla con la lamparita encendida
  rr(304, 92, 318, y1 - 6, hex('#5a3a22')); rr(304, 92, 318, 93, hex('#8a5a32')); rr(306, 98, 316, 99, hex('#3a2414')); rr(309, 86, 312, 91, hex('#c8a060')); R.poligono([[306, 80], [315, 80], [317, 86], [304, 86]], hex('#f8d890')); rr(305, 86, 316, 86, hex('#fff4c8'));
  R.recorte(null);
}

// el laboratorio del sueño (ver la cabecera de hoy)
function e_sueno(R, t, o) {
  const { rect, pset, linea, disco } = R, GR = { c: hex('#b4bcc4'), l: hex('#e4eaf0'), d: hex('#6a7480') };
  e_fijo(R, 'sueno', () => {
    // el falso techo y la pared de bloques
    rect(0, 0, 319, 8, hex('#d4d4cc')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 8, hex('#bcbcb4')); rect(0, 4, 319, 4, hex('#c4c4bc')); for (let i = 0; i < 160; i++) pset(Math.round(h(i, 1, 750) * 319), Math.round(h(i, 2, 750) * 8), hex('#c0c0b8')); rect(0, 8, 319, 8, hex('#9a9a92'));
    e_bloquesPared(R, 0, 9, 319, 122, hex('#c2ccbc'), hex('#a8b2a2'), hex('#d6dece'), 1);
    rect(0, 123, 319, 127, hex('#5a6458')); rect(0, 123, 319, 123, hex('#8a9488'));
    e_linoleo(R, 128, 179, hex('#c8c8b4'), hex('#b4b8a4'), hex('#9a9c8a'), 1);
    for (let k = 0; k < 3; k++) { const cx = 40 + k * 60; for (let y = 140; y < 178; y++) for (let x = cx - 6; x <= cx + 6; x++) if (e_b4(x, y) < 0.35 - (y - 140) * 0.008) pset(x, y, e_mez(R.pget(x, y), hex('#ffffff'), 0.4)); }
    // el póster del cerebro con la luna y el corcho con notas, sin letras
    rect(104, 22, 134, 58, C.k); rect(105, 23, 133, 57, hex('#f4f4f0')); rect(107, 25, 131, 55, hex('#1e2a5a'));
    disco(119, 38, 8, hex('#e88aa0')); disco(119, 38, 7, hex('#f4a8b8')); for (const [a, b, c2, d] of [[113, 36, 118, 34], [119, 33, 124, 37], [114, 41, 120, 40], [120, 43, 125, 41]]) linea(a, b, c2, d, hex('#c86a80')); rect(117, 45, 120, 49, hex('#e88aa0'));
    disco(128, 29, 3, hex('#f8e8a0')); disco(129, 28, 3, hex('#1e2a5a')); for (const [a, b] of [[110, 28], [112, 50], [128, 51]]) pset(a, b, hex('#ffffff')); for (let i = 0; i < 3; i++) rect(109 + i * 7, 52, 112 + i * 7, 53, hex('#8ab0f0'));
    rect(140, 22, 186, 60, hex('#6a4a2a')); rect(142, 24, 184, 58, hex('#c89a5a')); for (let i = 0; i < 260; i++) pset(142 + Math.round(h(i, 1, 751) * 42), 24 + Math.round(h(i, 2, 751) * 34), h(i, 3, 751) < 0.5 ? hex('#a87a42') : hex('#dab070'));
    for (const [a, b, w, hh, pin] of [[145, 27, 12, 15, '#e83a3a'], [160, 26, 10, 12, '#3a8ae8'], [173, 29, 9, 11, '#3ac860'], [147, 45, 14, 10, '#f0c020'], [165, 41, 15, 14, '#e83a3a']]) { rect(a + 1, b + 1, a + w + 1, b + hh + 1, hex('#8a6a3a')); rect(a, b, a + w, b + hh, hex('#f4f2ea')); for (let y = b + 3; y < b + hh - 1; y += 2) rect(a + 2, y, a + w - 2 - (y % 3), y, hex('#a8a8b8')); disco(a + (w >> 1), b + 1, 1, hex(pin)); }
    for (let x = 166; x < 179; x++) pset(x, 50 - Math.round(Math.abs(Math.sin(x * 0.9)) * 5), hex('#3a6ac8'));
    // la mesa larga de los ordenadores: encimera de formica, puertas de armario y zócalo
    rect(2, 104, 188, 108, C.k); rect(3, 104, 187, 107, hex('#e6e2d4')); rect(3, 104, 187, 104, hex('#fffcf0')); rect(3, 107, 187, 107, hex('#b8b4a4'));
    rect(4, 109, 186, 138, hex('#8a98a8')); for (let x = 4; x < 186; x += 30) { rect(x, 109, x, 138, hex('#5a6878')); rect(x + 1, 110, x + 28, 110, hex('#aab8c8')); rect(x + 26, 120, x + 26, 126, hex('#d8dce4')); } rect(4, 136, 186, 138, hex('#3a4450'));
    for (let i = 0; i < 3; i++) { const x = 14 + i * 60; rect(x - 2, 104, x + 36, 106, hex('#d8d4c4')); rect(x + 3, 104, x + 31, 105, hex('#bab6a6')); for (let k = x + 4; k < x + 31; k += 2) pset(k, 104, hex('#8a8676')); rect(x + 38, 103, x + 41, 105, hex('#e8e4d4')); linea(x + 40, 103, x + 44, 99, hex('#6a6a6a')); }
    // papeles, el diario de sueño, la planta y la taza
    rect(4, 98, 12, 103, hex('#b0603a')); for (let k = 0; k < 6; k++) linea(8, 98, 4 + k * 2, 90 + (k % 3), hex('#4a8a3a'));
    rect(108, 101, 120, 103, hex('#f4f2ea')); rect(109, 100, 121, 100, hex('#e4e2da')); rect(176, 97, 186, 103, hex('#3a5a9a')); rect(177, 98, 185, 98, hex('#5a7aba'));
    // el tabique de la habitación de dormir: postes, dintel y el panel de abajo
    rect(190, 44, 195, 139, GR.c); rect(190, 44, 190, 139, GR.l); rect(195, 44, 195, 139, GR.d); rect(190, 44, 319, 47, GR.c); rect(190, 44, 319, 44, GR.l); rect(190, 47, 319, 47, GR.d);
    rect(196, 112, 319, 139, hex('#a8b2a2')); rect(196, 112, 319, 113, GR.c); rect(196, 112, 319, 112, GR.l); for (let x = 200; x < 320; x += 24) rect(x, 116, x, 136, hex('#949e8e'));
    // la mesa de control: encimera, frente y una lámpara de brazo
    rect(198, 118, 319, 121, C.k); rect(199, 118, 319, 120, hex('#e6e2d4')); rect(199, 118, 319, 118, hex('#fffcf0')); rect(200, 122, 319, 146, hex('#7a8898')); rect(200, 122, 319, 123, hex('#5a6878')); for (let x = 230; x < 320; x += 40) { rect(x, 124, x, 146, hex('#5a6878')); rect(x + 4, 132, x + 10, 132, hex('#d8dce4')); }
  });
  // los fluorescentes del techo (uno parpadea) y su reflejo
  for (const [a, b, k] of [[196, 244, 0], [252, 272, 1]]) { const on = k === 1 || !((t % 6.3) < 0.5 && Math.sin(t * 70) > 0); rect(a, 1, b, 6, hex('#a8a8a0')); rect(a + 1, 2, b - 1, 5, on ? hex('#fbfbf2') : hex('#c8c8c0')); if (on) for (let x = a + 3; x < b - 2; x += 6) pset(x, 3, hex('#e8f0ff')); }
  // la ventana con Boston al anochecer
  e_ciudad(R, t, [18, 24, 96, 66], 'tarde'); e_marco(R, 18, 24, 96, 66, { c: hex('#b4bcc4'), l: hex('#e4eaf0'), d: hex('#6a7480') }, true);
  e_reloj(R, t, 172, 72, 6, hex('#3a3a3a'));
  // la cristalera con la habitación de dormir, sus reflejos y el montante del medio
  e_cuartoFondo(R, t, [196, 48, 319, 111], !!o.durmiente);
  R.recorte([196, 48, 319, 111]); for (const d of [0, 2, 9, 30, 33]) linea(150 + d + 60, 111, 150 + d + 60 + 63, 48, hex('#6a7a9a'), 2); R.recorte(null);
  rect(256, 48, 258, 111, GR.c); rect(256, 48, 256, 111, GR.l); rect(258, 48, 258, 111, GR.d);
  // los tres ordenadores con sus torres, cada pantalla de un tono
  const pant = [];
  [[hex('#7aff9a'), hex('#08180e')], [hex('#ffc860'), hex('#1a1206')], [hex('#c8dcff'), hex('#0a1028')]].forEach(([tin, fon], i) => { const x = 14 + i * 60, sc = e_crt(R, x, 71, 34, 30); e_pantalla(R, t + i * 1.7, sc, { tinta: tin, fondo: fon, k: i + 3 }); pant.push(sc); e_torre(R, t, x + 39, 104, 12, 26, i); });
  // el monitor de ondas, el polígrafo con su papel que sale y cae, el micro
  const so = e_crt(R, 204, 86, 36, 30, hex('#5a5e66')); e_ondas(R, t, so);
  rect(246, 106, 290, 118, C.k); rect(247, 107, 289, 117, hex('#b4b8b0')); rect(247, 107, 289, 107, hex('#e4e8e0')); rect(250, 102, 286, 106, hex('#f4f2ea')); rect(250, 102, 286, 102, hex('#ffffff'));
  for (let k = 0; k < 5; k++) { const px = 254 + k * 7, py = 104 + Math.round(Math.sin(t * (6 + k * 2) + k) * 1.5); linea(px, 110, px + 2, py, hex('#2a2a2a')); pset(px + 2, py, hex('#c83a2a')); } for (let k = 0; k < 4; k++) { pset(280 + k * 2, 113, k === 0 && Math.sin(t * 4) > 0 ? hex('#ff4a3a') : hex('#3a3a3a')); }
  for (let y = 118; y <= 146; y++) { const x = 256 + Math.round(Math.sin((y - 118) * 0.2) * 2), off = (y + Math.floor(t * 12)); rect(x, y, x + 22, y, (off % 9) === 0 ? hex('#d8d8d0') : hex('#f4f2ea')); for (let k = 0; k < 4; k++) pset(x + 3 + k * 5 + Math.round(Math.sin(off * (0.7 + k * 0.3)) * 1.5), y, hex('#3a3a8a')); }
  rect(298, 104, 300, 117, hex('#3a3a3a')); linea(299, 104, 304, 96, hex('#3a3a3a')); disco(305, 95, 2, hex('#1a1a1a')); e_taza(R, t, 312, 118, hex('#f4f2ea'), 2);
  return { suelo: 152, pantallas: pant, monitorOndas: so, cristal: [196, 48, 319, 111], cama: [226, 86, 301, 99], mesa: [2, 104, 188, 104], mesaControl: [198, 118, 319, 118], puestos: [[14, 152], [74, 152], [134, 152]], libre: [[0, 186], [196, 290]] };
}

// el carrito de los electrodos (delante, abajo a la derecha)
function e_carrito(R, t, x, yb) {
  const { rect, pset, disco, linea } = R; rect(x - 2, yb - 22, x + 19, yb - 20, hex('#c8ccd4')); rect(x - 2, yb - 22, x + 19, yb - 22, hex('#f0f2f8')); rect(x - 1, yb - 12, x + 18, yb - 11, hex('#a8acb4'));
  for (const dx of [-1, 18]) rect(x + dx, yb - 22, x + dx, yb - 4, hex('#8a8e96')); for (const dx of [0, 17]) { disco(x + dx, yb - 2, 2, C.k); pset(x + dx, yb - 2, hex('#8a8a8a')); }
  rect(x, yb - 29, x + 12, yb - 23, hex('#e8e8f0')); rect(x, yb - 29, x + 12, yb - 29, hex('#ffffff'));
  for (let k = 0; k < 5; k++) { const c = [hex('#e83a3a'), hex('#3a8ae8'), hex('#f0c020'), hex('#3ac860'), hex('#f0f0f0')][k]; for (let i = 0; i < 12; i++) pset(x + 2 + k * 2 + Math.round(Math.sin(i * 0.8 + k) * 1.5), yb - 20 + i, c); disco(x + 2 + k * 2, yb - 30, 1, c); }
  rect(x + 2, yb - 10, x + 16, yb - 6, hex('#3a5a9a')); rect(x + 2, yb - 10, x + 16, yb - 10, hex('#5a7aba'));
}

// la habitación de dormir de cerca, de noche (ver la cabecera de hoy)
function e_cama(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, dormido = o.durmiente !== false, sue = e_cl(o.suena ?? 0), MD = { c: hex('#5a3a28'), s: hex('#3e2618'), l: hex('#8a5e3e'), d: hex('#24140a') };
  e_fijo(R, 'cama', () => {
    e_papel(R, 0, 0, 319, 129, hex('#2c3058'), hex('#282c52'), hex('#363c68'), 5);
    rect(0, 130, 319, 133, hex('#1e1a2a')); rect(0, 130, 319, 130, hex('#4a4466'));
    e_tarima(R, 134, 179, hex('#3e3048'), hex('#33283e'), hex('#5a4a66'), hex('#221a2a'), 6);
    e_alfombra(R, 150, 166, 90, 10, [hex('#2a2440'), hex('#6a5a8a'), hex('#9a8ab8'), hex('#3e3460')]);
    // la puerta entornada con la luz del pasillo
    rect(6, 40, 42, 133, C.k); e_madera(R, 7, 41, 41, 133, MD.c, MD.s, MD.l, MD.d, 11, 93); rect(10, 46, 38, 84, MD.s); rect(10, 90, 38, 128, MD.s); rect(11, 47, 37, 83, MD.c); rect(11, 91, 37, 127, MD.c); disco(36, 92, 1.5, hex('#c8a050'));
    rect(42, 40, 44, 133, hex('#f8d890')); for (let y = 134; y < 179; y++) { const w = Math.round((y - 134) * 0.6) + 2; for (let x = 43; x < 43 + w; x++) if (e_b4(x, y) < 0.5 - (y - 134) * 0.008) pset(x, y, e_mez(R.pget(x, y), hex('#f8d890'), 0.4)); }
    // la mesilla y el cabecero
    rect(272, 116, 290, 150, C.k); e_madera(R, 273, 117, 289, 150, MD.c, MD.s, MD.l, MD.d, 12, 11); rect(272, 114, 291, 117, MD.l); rect(275, 126, 287, 126, MD.d); rect(279, 121, 283, 121, hex('#c8a050'));
    rect(262, 66, 272, 152, C.k); e_madera(R, 263, 67, 271, 152, MD.c, MD.s, MD.l, MD.d, 13, 85); disco(267, 64, 4, C.k); disco(267, 64, 3, MD.l); rect(264, 80, 270, 80, MD.l); rect(264, 140, 270, 140, MD.d);
    // la cama: el pie, el colchón y su larguero
    rect(50, 104, 60, 152, C.k); e_madera(R, 51, 105, 59, 152, MD.c, MD.s, MD.l, MD.d, 14, 47); disco(55, 102, 3, C.k); disco(55, 102, 2, MD.l);
    rect(60, 120, 262, 132, hex('#e4e4f0')); rect(60, 128, 262, 132, hex('#b8b8d0'));
    rect(58, 133, 264, 144, C.k); e_madera(R, 59, 134, 263, 143, MD.c, MD.s, MD.l, MD.d, 15, 10);
  });
  // la ventana con la luna, sus cortinas de visillo y el haz de luna sobre la cama
  e_ciudad(R, t, [110, 26, 180, 76], 'noche'); e_marco(R, 110, 26, 180, 76, { c: hex('#9a9ab8'), l: hex('#c8c8e0'), d: hex('#5a5a78') });
  e_barra(R, 96, 194, 18); e_cortina(R, t, 98, 108, 20, 90, hex('#6a6a9a'), 1); e_cortina(R, t, 182, 192, 20, 90, hex('#6a6a9a'), 3);
  for (let y = 84; y < 134; y++) { const d = Math.round((y - 84) * 0.75); for (let x = 112 - d; x <= 178 - d; x++) if (((x + y) & 1) === 0) pset(x, y, e_mez(R.pget(x, y), hex('#b8c8f8'), 0.18)); }
  // la almohada, la manta de retales que respira y la sábana doblada
  const r = Math.round((Math.sin(t * 1.25) + 1) * 0.8);
  rect(218, 104, 260, 121, C.k); rect(219, 105, 259, 120, hex('#f4f4fc')); rect(219, 116, 259, 120, hex('#c8c8e0')); rect(219, 105, 259, 105, hex('#ffffff')); for (let x = 224; x < 256; x += 5) pset(x, 108 + (x % 3), hex('#d8d8ec'));
  const tope = (x) => x > 214 ? 118 : Math.round(112 - (x < 90 ? (x - 60) * 0.1 : x < 200 ? 4 + Math.sin((x - 90) / 110 * Math.PI) * 4 : 4 - (x - 200) * 0.1) - (x > 150 && x < 214 ? r : 0));
  for (let x = 60; x <= 222; x++) { const y0 = tope(x); for (let y = y0; y <= 131; y++) { const pi = Math.floor((x - 60) / 14), pj = Math.floor((y - 100) / 9), c = [hex('#3a5a9a'), hex('#4a7aa0'), hex('#2e4a7a'), hex('#5a6aa8')][(pi + pj * 3) & 3]; pset(x, y, y === y0 ? e_mez(c, hex('#ffffff'), 0.35) : ((x - 60) % 14 === 0 || (y - 100) % 9 === 0) && (x + y) & 1 ? hex('#c8d4f0') : c); } }
  for (let x = 204; x <= 222; x++) for (let y = tope(x) - 1; y <= 125; y++) pset(x, y, x < 207 ? hex('#c8c8e0') : hex('#f0f0fa'));
  // el voluntario dormido: la cabeza en la almohada, los ojos cerrados y los electrodos con sus cables al carro
  const hx = 236, hy = 104 + (r > 1 ? 1 : 0);
  if (dormido) { disco(hx, hy, 10, C.k); disco(hx, hy, 9, hex('#6a4020')); disco(hx - 3, hy + 3, 7, hex('#f0c8a0')); rect(hx - 9, hy + 2, hx - 6, hy + 8, hex('#f0c8a0'));
    for (const [a, b] of [[hx - 8, hy - 4], [hx - 4, hy - 7], [hx + 1, hy - 8], [hx + 5, hy - 5]]) { pset(a, b, hex('#8a5a30')); pset(a + 1, b - 1, hex('#8a5a30')); }
    rect(hx - 7, hy + 3, hx - 5, hy + 3, hex('#3a2010')); rect(hx - 2, hy + 3, hx, hy + 3, hex('#3a2010')); pset(hx - 7, hy + 2, hex('#3a2010')); pset(hx, hy + 2, hex('#3a2010'));
    pset(hx - 7, hy + 5, hex('#f0a0a0')); pset(hx, hy + 5, hex('#f0a0a0')); rect(hx - 4, hy + 7, hx - 3, hy + 7, hex('#b06a5a')); disco(hx + 4, hy + 3, 2, hex('#e0b090'));
    const cab = [hex('#b84a4a'), hex('#4a6aa8'), hex('#b8a040'), hex('#4a9a5a')];
    cab.forEach((c, k) => { const ex = hx - 5 + k * 4, ey = hy - 8 + Math.abs(k - 1.5) | 0; disco(ex, ey, 1, hex('#e8e8e8')); pset(ex, ey, c); let px = ex, py = ey; for (let i = 1; i <= 20; i++) { const u = i / 20, x = Math.round(ex + (296 + k * 3 - ex) * u), y = Math.round(ey + (93 - ey) * u - Math.sin(u * Math.PI) * (3 + k * 4)); linea(px, py, x, y, c); px = x; py = y; } }); }
  else { R.poligono([[228, 108], [248, 108], [244, 112], [232, 112]], hex('#d8d8ec')); }
  // la mesilla: el despertador (3 12, los dos puntos laten) y el vaso de agua
  rect(274, 104, 288, 113, C.k); rect(275, 105, 287, 112, hex('#2a2a32')); e_cifras(R, Math.sin(t * 3.1) > 0 ? '3:12' : '3 12', 276, 106, hex('#ff4a3a'), 1); R.halo(281, 109, 9, [hex('#3a2a40'), hex('#4a2a3a')], 0.6);
  rect(283, 108, 286, 113, hex('#8ab0d8')); rect(283, 108, 286, 109, hex('#c8e0f8'));
  // el carro del electroencefalograma con su monitor de ondas
  rect(292, 92, 318, 134, C.k); rect(293, 93, 317, 133, hex('#c8ccd4')); rect(293, 93, 317, 93, hex('#f0f2f8')); for (let k = 0; k < 4; k++) { disco(298 + k * 6, 100, 1.5, hex('#3a3a3a')); pset(298 + k * 6, 99, hex('#8a8a8a')); } rect(296, 106, 314, 110, hex('#2a2a32')); for (let k = 0; k < 4; k++) pset(298 + k * 4, 108, Math.sin(t * 5 + k) > 0 ? hex('#4ae070') : hex('#1a4a2a'));
  for (let y = 114; y < 132; y += 4) rect(296, y, 314, y, hex('#a8acb4')); rect(296, 134, 298, 148, hex('#8a8e96')); rect(312, 134, 314, 148, hex('#8a8e96')); rect(292, 146, 318, 147, hex('#6a6e76')); for (const xx of [294, 316]) { disco(xx, 150, 2, C.k); pset(xx, 150, hex('#8a8a8a')); }
  const so = e_crt(R, 290, 58, 29, 28, hex('#5a5e66')); e_ondas(R, t, so, 3);
  // el sueño: bloques claros que caen sobre la almohada con su halo, y se deshacen al posarse
  if (sue > 0) { e_luz(R, 236, 76, 54, 44, hex('#b8a8ff'), 0.14 * sue);
    const n = Math.round(1 + sue * 6), B = 7, cols = [hex('#e8e0ff'), hex('#c8b8ff'), hex('#a898f0')];
    for (let k = 0; k < n; k++) { const per = 2.6 + h(k, 1, 760) * 1.2, ph = ((t + h(k, 2, 760) * per) % per) / per, bx = 206 + Math.round(h(k, 3, 760) * 56) + Math.floor((t + h(k, 2, 760) * per) / per) * 11 % 20 - 10, suelo = bx > 214 && bx < 256 ? 104 - B : 108 - B;
      const caer = 0.72, y = ph < caer ? Math.round(14 + (suelo - 14) * (ph / caer) ** 2) : suelo, fade = ph < caer ? 1 : 1 - (ph - caer) / (1 - caer);
      for (let j = 0; j < B; j++) for (let i = 0; i < B; i++) { const X = bx + i, Y = y + j; if (fade < 1 && h(X, Y, 761) > fade) continue; const c = i === 0 || j === 0 ? cols[0] : i === B - 1 || j === B - 1 ? cols[2] : cols[1]; pset(X, Y, ph < caer ? c : e_mez(R.pget(X, Y), c, 0.75)); }
      if (ph < caer) for (let i = 1; i < 4; i++) pset(bx + 3, y - i * 3, cols[2]);
      else if (ph < caer + 0.08) { for (const [dx, dy] of [[-2, 6], [B + 1, 6], [-3, 3], [B + 2, 3]]) pset(bx + dx, suelo + dy, cols[0]); } } }
  return { suelo: 172, cama: [60, 104, 272, 144], almohada: [218, 104, 260, 121], cabeza: [hx, hy], puerta: [6, 40, 44, 133], monitorOndas: so, libre: [[0, 48], [60, 200]] };
}

// el barrio de Oklahoma una noche de diciembre por una ventana (cl): cielo tramado con estrellas y luna fina, nubes a
// tres velocidades, dos casas con nieve en el tejado y guirnaldas que parpadean, un árbol pelado, la farola con su halo,
// un coche que pasa con los faros y copos que caen; todo recortado al hueco
function e_barrio(R, t, cl) {
  const [x0, y0, x1, y1] = cl, { pset, linea, disco, poligono } = R, W = x1 - x0, H = y1 - y0, rr = (a, b, c, d, col) => e_rr(R, cl, a, b, c, d, col);
  R.recorte(cl);
  e_degradado(R, x0, y0, x1, y1, ['#0c1230', '#141c44', '#1e2856', '#2a3464', '#3a4270'].map(hex));
  for (let k = 0; k < 14; k++) { const b = Math.sin(t * (1.5 + k % 3) + k); if (b > -0.2) pset(x0 + Math.round(h(k, 1, 770) * W), y0 + Math.round(h(k, 2, 770) * H * 0.4), b > 0.6 ? hex('#ffffff') : hex('#8a90c8')); }
  disco(x1 - 12, y0 + 9, 4, hex('#f4f0d8')); disco(x1 - 10, y0 + 8, 4, hex('#141c44'));
  for (const [fy, w, v, k] of [[0.1, 16, 0.7, 0], [0.22, 12, 1.4, 1], [0.32, 9, 2.4, 2]]) { const cx = x0 - 16 + ((h(k, 3, 771) * 100 + t * v) % (W + 32)); e_nube(R, cx, y0 + H * fy, w, [hex('#1a2250'), hex('#2a3460'), hex('#4a5480')]); }
  const suelo = y1 - Math.round(H * 0.18);
  // las casas: paredes, tejado nevado, ventanas encendidas y la guirnalda del alero
  [[x0 + 2, 26, 0.36, hex('#6a5a5a'), 0], [x0 + 32, 30, 0.44, hex('#5a6276'), 1]].forEach(([hx, hw, ha, col, k]) => { const top = suelo - Math.round(H * ha), alero = top + 8;
    rr(hx, alero, hx + hw, suelo, col); poligono([[hx - 3, alero], [hx + hw + 3, alero], [hx + hw / 2, top]], hex('#3a3040')); poligono([[hx - 3, alero - 1], [hx + hw + 3, alero - 1], [hx + hw / 2, top]], hex('#e8f0fa')); poligono([[hx + 2, alero - 2], [hx + hw - 2, alero - 2], [hx + hw / 2, top + 2]], hex('#c8d4e8'));
    for (let i = 0; i < 2; i++) { const wx = hx + 4 + i * (hw - 12); rr(wx, alero + 4, wx + 6, alero + 10, hex('#f8d27a')); rr(wx + 3, alero + 4, wx + 3, alero + 10, hex('#a87a3a')); }
    rr(hx + (hw >> 1) - 2, suelo - 9, hx + (hw >> 1) + 2, suelo, hex('#3a2a20'));
    for (let x = hx - 2; x <= hx + hw + 2; x += 3) { const c = [hex('#ff4a4a'), hex('#4aff6a'), hex('#4a8aff'), hex('#ffd84a')][(x + k + Math.floor(t * 2)) & 3]; pset(x, alero + 1 + ((x >> 1) & 1), c); } });
  // el árbol pelado, la farola con su halo y el césped nevado con huellas
  linea(x1 - 22, suelo, x1 - 22, suelo - 20, hex('#2a2030')); linea(x1 - 22, suelo - 12, x1 - 28, suelo - 20, hex('#2a2030')); linea(x1 - 22, suelo - 15, x1 - 16, suelo - 22, hex('#2a2030')); linea(x1 - 25, suelo - 17, x1 - 27, suelo - 24, hex('#2a2030'));
  rr(x0, suelo, x1, y1, hex('#c8d4e8')); for (let x = x0; x <= x1; x++) { if (h(x, 1, 772) < 0.3) pset(x, suelo + 1 + Math.round(h(x, 2, 772) * 3), hex('#e8f0fa')); } rr(x0, y1 - 3, x1, y1, hex('#3a3a48'));
  const fx = x1 - 8; rr(fx, suelo - 26, fx, suelo, hex('#2a2a3a')); R.halo(fx - 2, suelo - 25, 9, [hex('#3a3a58'), hex('#6a6070'), hex('#a8906a')], 1.1); pset(fx - 2, suelo - 25, hex('#fff4c8')); pset(fx - 1, suelo - 25, hex('#fff4c8'));
  { const u = (t / 9) % 1, cx = Math.round(x1 + 12 - u * (W + 24)), cy = y1 - 2; rr(cx - 6, cy - 3, cx + 6, cy, hex('#7a2a2a')); rr(cx - 3, cy - 5, cx + 3, cy - 3, hex('#5a1e1e')); pset(cx - 7, cy - 1, hex('#fff4c0')); for (let i = 1; i < 8; i++) if (e_b4(cx - 7 - i, cy - 1) < 0.6 - i * 0.07) pset(cx - 7 - i, cy - 1, hex('#f8e8a8')); pset(cx + 6, cy - 2, hex('#ff3a3a')); }
  for (let k = 0; k < 18; k++) { const x = x0 + Math.round(((h(k, 1, 773) * W + Math.sin(t + k) * 3) % W + W) % W), y = y0 + Math.round((h(k, 2, 773) * H + t * (5 + k % 4)) % H); pset(x, y, hex('#f0f4ff')); }
  R.recorte(null);
}

// una palmera (x: pie del tronco; alto) que se mece con el viento; inclina el tronco hacia dir
function e_palmera(R, t, x, yb, alto, k = 0, dir = 1) {
  const { pset, linea } = R, sw = Math.sin(t * 1.1 + k) * 1.5, T1 = hex('#8a6a4a'), T2 = hex('#6a4a32'), H1 = hex('#2e6a2e'), H2 = hex('#4a9a3a'), H3 = hex('#7ac44a');
  let tx = x, ty = yb; for (let i = 0; i <= alto; i++) { const u = i / alto; tx = x + dir * Math.round(u * u * alto * 0.25 + sw * u); ty = yb - i; pset(tx, ty, i % 3 === 0 ? T2 : T1); pset(tx + 1, ty, T2); if (u < 0.3) pset(tx - 1, ty, T1); }
  for (let f = 0; f < 7; f++) { const a = -Math.PI / 2 + (f - 3) * 0.55 + Math.sin(t * 1.6 + f + k) * 0.08, L = alto * (0.42 + (f % 2) * 0.1);
    let px = tx, py = ty; for (let i = 1; i <= L; i++) { const u = i / L, x2 = Math.round(tx + Math.cos(a) * i * 1.1), y2 = Math.round(ty + Math.sin(a) * i * 0.7 + u * u * L * 0.55); linea(px, py, x2, y2, H1); if (i % 2 === 0 && u > 0.15) { pset(x2, y2 + 1, H2); pset(x2, y2 + 2, u > 0.6 ? H1 : H2); pset(x2 - 1, y2 + 1, H3); } px = x2; py = y2; } }
  R.disco(tx, ty + 1, 2, hex('#6a4a2a'));
}

// Honolulu de día por una ventana (cl): cielo tramado, nubes de tres tonos a tres velocidades, gaviotas, el volcán, la
// ciudad clara, el mar con brillos y un velero, el seto y las palmeras que se mecen; todo recortado al hueco
function e_vistaSol(R, t, cl) {
  const [x0, y0, x1, y1] = cl, { pset, linea, poligono } = R, W = x1 - x0, H = y1 - y0, rr = (a, b, c, d, col) => e_rr(R, cl, a, b, c, d, col);
  R.recorte(cl);
  e_degradado(R, x0, y0, x1, y1, ['#4a8ad0', '#64a2de', '#80b8e8', '#9ccaf0', '#bcdcf4', '#d8ecf8'].map(hex), (x, y) => { const d = 1 - Math.hypot(x - x0, (y - y0) * 1.5) / 90; return d > 0 ? d * 1.5 : 0; });
  for (const [fy, w, v, k] of [[0.1, 26, 0.6, 0], [0.2, 18, 1.3, 1], [0.3, 12, 2.4, 2]]) for (let r = 0; r < 2; r++) { const cx = x0 - 24 + ((h(k, r, 780) * 300 + t * v) % (W + 48)); e_nube(R, cx, y0 + H * fy + r * 4, w - r * 5, [hex('#a8c0dc'), hex('#e4eef8'), hex('#ffffff')]); }
  for (let k = 0; k < 3; k++) { const u = ((t / (18 + k * 5) + k * 0.3) % 1), bx = Math.round(x0 - 6 + u * (W + 12)), by = y0 + Math.round(H * (0.3 + k * 0.06) + Math.sin(t * 0.8 + k) * 3), a = Math.sin(t * 7 + k * 2) > 0; pset(bx, by, hex('#f8f8f8')); pset(bx - 1, by - (a ? 1 : 0), hex('#3a3a4a')); pset(bx + 1, by - (a ? 1 : 0), hex('#3a3a4a')); pset(bx - 2, by - (a ? 2 : 0), hex('#5a5a6a')); pset(bx + 2, by - (a ? 2 : 0), hex('#5a5a6a')); }
  const hor = y0 + Math.round(H * 0.62);
  // el volcán a la derecha, con sus crestas en sombra
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / W, m = Math.round(H * (0.05 + Math.max(0, 0.22 - Math.abs(u - 0.78) * 0.7) + Math.max(0, 0.1 - Math.abs(u - 0.3) * 0.4)) + Math.sin(x * 0.3) * 1); if (m <= 0) continue; for (let y = hor - m; y < hor; y++) pset(x, y, y === hor - m ? hex('#9ab88a') : ((x * 3 + y * 7) % 11 < 3 ? hex('#5a7a5a') : hex('#6e8e6a'))); }
  // la ciudad clara con sus filas de ventanas
  let bx = x0 + 4, i = 0; while (bx < x1 - 10) { const w = 6 + Math.round(h(i, 1, 781) * 8), top = hor - Math.round(4 + h(i, 2, 781) * H * 0.22), col = [hex('#f0ece0'), hex('#e0e4ec'), hex('#f4e4d0'), hex('#d8e0e8')][i & 3];
    rr(bx, top, bx + w - 1, hor + 2, col); rr(bx + w - 1, top, bx + w - 1, hor + 2, e_mez(col, hex('#6a7a9a'), 0.35)); for (let y = top + 2; y < hor; y += 3) for (let x = bx + 1; x < bx + w - 1; x += 2) pset(x, y, h(x, y, 782) < 0.2 ? hex('#ffffff') : hex('#8aa0c0')); bx += w + 2 + Math.round(h(i, 3, 781) * 6); i++; }
  // el mar con brillos que se mueven y el velero
  rr(x0, hor + 3, x1, y1, hex('#2a6aa8')); for (let y = hor + 3; y <= y1; y++) for (let x = x0; x <= x1; x++) { const s = Math.sin(x * 0.35 + t * 2 + y * 1.7) + Math.sin(x * 0.11 - t * 1.3); if (s > 1.5) pset(x, y, hex('#e8f4ff')); else if (s > 0.9) pset(x, y, hex('#4a8ac8')); }
  { const u = (t / 70 + 0.2) % 1, vx = Math.round(x0 - 8 + u * (W + 16)), vy = hor + 6; rr(vx - 4, vy, vx + 4, vy + 1, hex('#f4f4f4')); poligono([[vx, vy - 1], [vx, vy - 9], [vx + 5, vy - 1]], hex('#ffffff')); poligono([[vx - 1, vy - 1], [vx - 1, vy - 7], [vx - 4, vy - 1]], hex('#e8d8c0')); }
  // el seto y las palmeras de delante
  for (let x = x0; x <= x1; x++) { const hh = Math.round(4 + Math.sin(x * 0.4) * 1.5 + h(x, 1, 783) * 2); for (let y = y1 - hh; y <= y1; y++) pset(x, y, y === y1 - hh ? hex('#7ac44a') : (x + y) % 3 ? hex('#3a7a32') : hex('#2e6a2a')); }
  e_palmera(R, t, x0 + Math.round(W * 0.12), y1 + 4, Math.round(H * 0.85), 0, 1); e_palmera(R, t, x0 + Math.round(W * 0.9), y1 + 4, Math.round(H * 0.72), 2, -1); if (W > 120) e_palmera(R, t, x0 + Math.round(W * 0.55), y1 + 4, Math.round(H * 0.5), 4, 1);
  R.recorte(null);
}

// la guirnalda de luces de colores en guirnaldas colgantes (de x0 a x1, en n tramos, con la caída c); parpadean
function e_guirnalda(R, t, x0, x1, y, n, c) {
  const COL = ['#ff4a4a', '#4ae86a', '#4a8aff', '#ffd84a', '#ff8ae8'].map(hex), L = (x1 - x0) / n;
  for (let x = x0; x <= x1; x++) { const u = ((x - x0) % L) / L; R.pset(x, Math.round(y + Math.sin(u * Math.PI) * c), hex('#2a3a2a')); }
  for (let x = x0 + 3, i = 0; x < x1; x += 7, i++) { const u = ((x - x0) % L) / L, yy = Math.round(y + Math.sin(u * Math.PI) * c) + 1, on = Math.sin(t * 2.2 + i * 1.7) > -0.5, cc = COL[i % 5];
    R.pset(x, yy, on ? cc : e_mez(cc, C.k, 0.55)); R.pset(x, yy + 1, on ? e_mez(cc, hex('#ffffff'), 0.4) : e_mez(cc, C.k, 0.55)); if (on) { R.pset(x - 1, yy + 1, e_mez(R.pget(x - 1, yy + 1), cc, 0.4)); R.pset(x + 1, yy + 1, e_mez(R.pget(x + 1, yy + 1), cc, 0.4)); R.pset(x, yy + 2, e_mez(R.pget(x, yy + 2), cc, 0.4)); } }
}

// el árbol de Navidad (x: centro, yb: el suelo) con sus bolas, las luces que parpadean, la estrella y los regalos
function e_arbolNavidad(R, t, x, yb, alto) {
  const { rect, pset, poligono } = R, V = [hex('#1e4a2a'), hex('#2e6a3a'), hex('#4a8a4a')], top = yb - alto;
  rect(x - 2, yb - 12, x + 2, yb - 6, hex('#5a3a22'));
  for (let k = 0; k < 4; k++) { const y0 = top + k * (alto - 12) / 4.2, y1 = y0 + (alto - 12) / 3, w = (4 + k * 4.5) * Math.max(1, alto / 100); poligono([[x, y0], [x + w, y1], [x - w, y1]], V[0]); poligono([[x, y0 + 1], [x + w - 2, y1 - 1], [x - w + 1, y1 - 1]], V[1]); for (let i = 0; i < w * 1.4; i++) pset(Math.round(x - w + 1 + h(i, k, 790) * (w * 2 - 2)), Math.round(y1 - 1 - h(i, k + 9, 790) * 4), V[2]); }
  for (let i = 0; i < 16; i++) { const u = h(i, 1, 791), yy = Math.round(top + 6 + u * (alto - 22)), w = 2 + (yy - top) * 0.32, xx = Math.round(x + (h(i, 2, 791) - 0.5) * w * 1.6), on = Math.sin(t * 3 + i * 2.1) > -0.2, c = ['#ff4a4a', '#ffd84a', '#4a8aff', '#ff8ae8'].map(hex)[i & 3]; pset(xx, yy, on ? c : e_mez(c, C.k, 0.5)); if (on && i % 3 === 0) { pset(xx + 1, yy, e_mez(R.pget(xx + 1, yy), c, 0.5)); pset(xx, yy - 1, e_mez(R.pget(xx, yy - 1), c, 0.5)); } }
  const st = Math.sin(t * 2) > 0 ? hex('#fff4a0') : hex('#f0c040'); rect(x - 1, top - 2, x + 1, top, st); pset(x, top - 3, st); pset(x - 2, top - 1, st); pset(x + 2, top - 1, st);
  for (const [dx, w, hh, c, l] of [[-12, 9, 7, '#c83a3a', '#f0d060'], [-2, 8, 5, '#3a6ac8', '#f0f0f0'], [6, 10, 8, '#3a9a5a', '#e83a3a']]) { rect(x + dx, yb - hh, x + dx + w, yb - 1, hex(c)); rect(x + dx, yb - hh, x + dx + w, yb - hh, e_mez(hex(c), hex('#ffffff'), 0.3)); rect(x + dx + (w >> 1), yb - hh, x + dx + (w >> 1), yb - 1, hex(l)); rect(x + dx, yb - hh + 2, x + dx + w, yb - hh + 2, hex(l)); }
}

// la consola antigua genérica: caja negra baja de carga por arriba (sin logos y sin la forma de ninguna real), el
// cartucho gris que asoma, el piloto rojo y dos botones redondos; (x, yb: abajo a la izquierda; g: escala)
function e_consola(R, t, x, yb, g = 1) {
  const { rect, pset } = R, w = 34 * g, hh = 7 * g, K = hex('#1e1e24'), L = hex('#4a4a56'), S = hex('#0e0e12');
  rect(x + 2 * g, yb - hh - 7 * g, x + 12 * g, yb - hh, hex('#8a8a92')); rect(x + 2 * g, yb - hh - 7 * g, x + 12 * g, yb - hh - 7 * g, hex('#c8c8d0')); rect(x + 3 * g, yb - hh - 5 * g, x + 11 * g, yb - hh - 3 * g, hex('#5a5a66')); rect(x + 4 * g, yb - hh - 4 * g, x + 10 * g, yb - hh - 4 * g, hex('#e8e0c8'));
  rect(x, yb - hh, x + w, yb - 1, K); rect(x, yb - hh, x + w, yb - hh + g - 1, L); rect(x + w - g + 1, yb - hh, x + w, yb - 1, S); rect(x + g, yb - g, x + w - g, yb - 1, S);
  rect(x + g, yb - hh - g, x + 14 * g, yb - hh - 1, L); rect(x + 18 * g, yb - hh + 2 * g, x + 30 * g, yb - hh + 2 * g, L);
  for (const dx of [20, 25]) { R.disco(x + dx * g, yb - 3 * g, 1.5 * g, hex('#5a5a66')); pset(x + dx * g, yb - 4 * g, hex('#9a9aa6')); }
  rect(x + 30 * g, yb - 4 * g, x + 30 * g + g - 1, yb - 4 * g + g - 1, Math.sin(t * 1.5) > -0.8 ? hex('#ff3a2a') : hex('#8a1a1a'));
}

// la pantalla de la tele: bloques monocromos sueltos y el nivel que sube; congela 0–1: la imagen se para y entran rayas
function e_teleImagen(R, t, sc, congela, g = 1) {
  const [x0, y0, x1, y1] = sc, frio = congela > 0, tt = frio ? 37.3 : t;
  e_pantalla(R, tt, sc, { tinta: hex('#d8dce8'), fondo: hex('#10121c'), bloque: 3 * g + 1, k: 7, frio: frio ? tt : null });
  // sin contador de nivel ni marcador (derechos: nada que se lea como el marcador del juego)
  if (frio) { const n = Math.round(congela * (y1 - y0) * 0.5), COL = ['#ff3a6a', '#3aff9a', '#3a8aff', '#ffe84a', '#ff8a3a', '#c84aff'].map(hex);
    for (let k = 0; k < n; k++) { const y = y0 + Math.floor(h(k, 1, 795) * (y1 - y0 + 1)), xa = x0 + Math.floor(h(k, 2, 795) * (x1 - x0) * 0.5), xb = Math.min(x1, xa + 4 + Math.floor(h(k, 3, 795) * (x1 - x0))); for (let x = xa; x <= xb; x++) R.pset(x, y, COL[(Math.floor(x / (3 + k % 5)) + k) % 6]); } }
  for (const [cx, cy] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) R.pset(cx, cy, hex('#1a1a1e'));
}

// la tele de tubo (x, y: arriba a la izquierda; w × hh): carcasa gris oscuro, panel del altavoz con botones y el piloto;
// devuelve el hueco de la pantalla
function e_televisor(R, t, x, y, w, hh) {
  const { rect, pset } = R, K = hex('#34343c'), L = hex('#5a5a66'), S = hex('#1e1e24'), pw = Math.round(w * 0.18);
  rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, K); rect(x + 1, y + 1, x + w - 1, y + 2, L); rect(x + 1, y + 1, x + 2, y + hh - 1, L); rect(x + w - 2, y + 2, x + w - 1, y + hh - 1, S); rect(x + 2, y + hh - 2, x + w - 1, y + hh - 1, S);
  const sx0 = x + 6, sy0 = y + 6, sx1 = x + w - pw - 6, sy1 = y + hh - 7; rect(sx0 - 3, sy0 - 3, sx1 + 3, sy1 + 3, hex('#18181c')); rect(sx0 - 3, sy1 + 3, sx1 + 3, sy1 + 3, L);
  const px = x + w - pw - 2; for (let yy = y + 6; yy < y + hh * 0.6; yy += 2) for (let xx = px; xx < x + w - 3; xx += 2) pset(xx, yy, S);
  for (let k = 0; k < 3; k++) { R.disco(px + (pw >> 1) - 1, y + hh * 0.66 + k * 5, 1.5, L); } pset(px + 1, y + hh - 6, hex('#ff3a2a'));
  return [sx0, sy0, sx1, sy1];
}

// el salón de Oklahoma en 2023 (ver la cabecera de hoy)
function e_salon(R, t, o) {
  const { rect, pset, linea, disco } = R, MD = { c: hex('#6a4a32'), s: hex('#4e3220'), l: hex('#9a7048'), d: hex('#2e1a0e') }, SF = hex('#3a4a7a');
  e_fijo(R, 'salon', () => {
    e_papel(R, 0, 4, 319, 127, hex('#b89a74'), hex('#ae906c'), hex('#c6a882'), 7); rect(0, 0, 319, 3, hex('#e8dcc4')); rect(0, 3, 319, 3, hex('#a8987a'));
    rect(0, 128, 319, 132, hex('#e8e0d0')); rect(0, 132, 319, 132, hex('#a89c88'));
    rect(0, 133, 319, 179, hex('#9a8a76')); for (let i = 0; i < 2600; i++) pset(Math.round(h(i, 1, 800) * 319), 133 + Math.round(h(i, 2, 800) * 46), h(i, 3, 800) < 0.5 ? hex('#8a7a68') : hex('#aa9a86'));
    e_alfombra(R, 130, 164, 86, 11, [hex('#4a2a2a'), hex('#2e5a3a'), hex('#d8c08a'), hex('#8a3a32')]);
    e_luz(R, 312, 96, 50, 40, hex('#ffd890'), 0.2);
    // el mueble de la tele: una puerta y el hueco abierto
    rect(42, 118, 136, 147, C.k); e_madera(R, 43, 119, 135, 146, MD.c, MD.s, MD.l, MD.d, 21, 9); rect(42, 118, 136, 120, MD.l); rect(68, 123, 134, 144, hex('#1e140c')); rect(68, 123, 134, 124, hex('#0e0a06'));
    rect(45, 123, 65, 144, MD.d); rect(46, 124, 64, 143, MD.c); rect(46, 124, 64, 124, MD.l); rect(61, 132, 62, 135, hex('#d8b060'));
    for (let k = 0; k < 5; k++) { const x = 110 + k * 4, c = [hex('#5a5a62'), hex('#2a2a30'), hex('#7a7a84'), hex('#3a3a44'), hex('#8a8a92')][k]; rect(x, 128 + (k % 2), x + 3, 144, c); rect(x, 128 + (k % 2), x + 3, 128 + (k % 2), e_mez(c, hex('#ffffff'), 0.4)); rect(x + 1, 133, x + 2, 137, hex('#d8d0b8')); }
    // los pósters sin letras: el cohete con estrellas y un mando con un corazón
    rect(146, 30, 172, 68, C.k); rect(147, 31, 171, 67, hex('#1e2a5a')); for (const [a, b] of [[150, 35], [167, 40], [153, 58], [166, 62], [159, 33]]) pset(a, b, hex('#ffffff'));
    R.poligono([[159, 38], [164, 52], [154, 52]], hex('#e8e8f0')); rect(155, 52, 163, 56, hex('#e8e8f0')); disco(159, 47, 1.5, hex('#4a8aff')); R.poligono([[154, 52], [151, 58], [155, 56]], hex('#e83a3a')); R.poligono([[164, 52], [167, 58], [163, 56]], hex('#e83a3a')); rect(157, 57, 161, 61, hex('#ffb040')); pset(159, 62, hex('#ffe84a'));
    rect(176, 40, 198, 64, C.k); rect(177, 41, 197, 63, hex('#f0d050')); rect(180, 49, 194, 57, hex('#3a3a44')); rect(182, 52, 186, 52, hex('#d8d8e0')); rect(184, 50, 184, 54, hex('#d8d8e0')); disco(191, 51, 1, hex('#e83a3a')); disco(189, 54, 1, hex('#e83a3a')); for (const [a, b] of [[186, 44], [188, 44], [185, 45], [189, 45], [187, 46]]) pset(a, b, hex('#e83a3a'));
    // el sofá con sus cojines, la manta de cuadros y la mesita con la lámpara
    rect(204, 104, 306, 146, C.k); rect(212, 105, 298, 124, SF); for (let x = 212; x < 298; x += 29) { rect(x, 105, x, 124, e_mez(SF, C.k, 0.4)); rect(x + 1, 105, x + 27, 106, e_mez(SF, hex('#ffffff'), 0.25)); }
    rect(205, 112, 213, 145, e_mez(SF, hex('#ffffff'), 0.1)); rect(297, 112, 305, 145, e_mez(SF, C.k, 0.15)); rect(205, 112, 213, 113, e_mez(SF, hex('#ffffff'), 0.35)); rect(297, 112, 305, 113, e_mez(SF, hex('#ffffff'), 0.3));
    rect(214, 124, 296, 131, e_mez(SF, hex('#ffffff'), 0.15)); rect(214, 124, 296, 124, e_mez(SF, hex('#ffffff'), 0.35)); rect(214, 132, 296, 145, e_mez(SF, C.k, 0.25)); for (let x = 241; x < 296; x += 28) rect(x, 124, x, 131, e_mez(SF, C.k, 0.4));
    rect(272, 108, 286, 122, hex('#c8503a')); rect(272, 108, 286, 109, hex('#e8806a')); rect(256, 112, 268, 123, hex('#e8b040')); rect(256, 112, 268, 112, hex('#f8d870'));
    for (let y = 106; y < 126; y++) for (let x = 286; x < 297; x++) pset(x, y, ((x >> 1) + (y >> 1)) % 4 === 0 ? hex('#e8e0c8') : (x % 4 === 0 || y % 4 === 0) ? hex('#2a5a3a') : hex('#8a2a2a'));
    rect(307, 112, 319, 146, MD.s); rect(306, 110, 319, 112, MD.l); rect(311, 98, 313, 110, hex('#c8a060')); R.poligono([[306, 86], [318, 86], [320, 98], [304, 98]], hex('#f4dca0')); rect(305, 98, 319, 98, hex('#c8a060'));
  });
  e_guirnalda(R, t, 24, 268, 17, 4, 7);
  e_barrio(R, t, [212, 34, 268, 94]); e_marco(R, 212, 34, 268, 94, { c: hex('#f0ece4'), l: hex('#ffffff'), d: hex('#b8b0a0') }, false);
  for (let y = 34; y < 46; y += 2) { rect(212, y, 268, y, hex('#e8e4dc')); rect(212, y + 1, 268, y + 1, hex('#b8b0a0')); } linea(222, 46, 222, 62 + Math.round(Math.sin(t) * 1), hex('#d8d0c0')); disco(222, 63, 1, hex('#c8c0b0'));
  e_arbolNavidad(R, t, 20, 148, 86);
  // la tele de tubo con su antena y la cámara, la consola y los cables
  linea(89, 64, 74, 42, hex('#9a9aa6')); linea(90, 64, 106, 44, hex('#9a9aa6')); disco(89, 63, 3, hex('#2a2a30')); pset(74, 42, hex('#d8d8e0')); pset(106, 44, hex('#d8d8e0'));
  const sc = e_televisor(R, t, 50, 64, 78, 54); e_teleImagen(R, t, sc, e_cl(o.congela ?? 0));
  rect(56, 58, 64, 63, hex('#1e1e24')); disco(60, 60, 2, hex('#3a3a4a')); pset(60, 60, hex('#8ab0ff')); pset(63, 59, Math.sin(t * 2) > 0 ? hex('#ff3a3a') : hex('#5a1a1a'));
  for (let i = 0; i < 6; i++) { const u = (t * 0.7 + i / 6) % 1; if (u < 0.9) pset(sc[0] + 4 + i * 8, sc[3] + 6 + Math.round(u * 10), e_mez(hex('#3a3a5a'), hex('#9ab0ff'), 0.3)); }
  e_luz(R, (sc[0] + sc[2]) >> 1, sc[3] + 30, 46, 16, hex('#a8b8ff'), 0.08);
  e_consola(R, t, 72, 144);
  const ex = 106, ey = 141, [mx, my] = o.mando ?? [134, 156];
  let px = ex, py = ey; for (let i = 1; i <= 24; i++) { const u = i / 24, x = Math.round(ex + (mx - ex) * u), y = Math.round(ey + (my - ey) * u + Math.sin(u * Math.PI) * 8); linea(px, py, x, y, hex('#1a1a1e')); px = x; py = y; }
  if (!o.mando) { rect(mx - 6, my - 2, mx + 6, my + 3, C.k); rect(mx - 5, my - 1, mx + 5, my + 2, hex('#8a8a92')); rect(mx - 4, my, mx - 2, my, hex('#2a2a30')); rect(mx - 3, my - 1, mx - 3, my + 1, hex('#2a2a30')); pset(mx + 2, my, hex('#c83a3a')); pset(mx + 4, my + 1, hex('#c83a3a')); }
  // el aro de luz de grabar en su trípode, con el móvil en medio
  linea(194, 84, 194, 146, hex('#2a2a30')); linea(194, 140, 186, 147, hex('#2a2a30')); linea(194, 140, 202, 147, hex('#2a2a30'));
  R.halo(194, 74, 16, [hex('#c8b090'), hex('#e0d0b8'), hex('#f4ecdc')], 0.8); R.anillo(194.5, 74.5, 9, hex('#ffffff')); R.anillo(194.5, 74.5, 8, hex('#f4f4ff')); R.anillo(194.5, 74.5, 10, hex('#8a8a92')); rect(192, 70, 197, 79, hex('#1e1e24')); rect(193, 71, 196, 78, hex('#3a4a6a'));
  // el gato dormido en el sofá: respira y mueve la punta de la cola
  { const r = Math.sin(t * 1.4) > 0 ? 1 : 0, gx = 226, gy = 123; disco(gx, gy - 3, 5 + r * 0.3, C.k); disco(gx, gy - 3, 4 + r * 0.3, hex('#5a5a62')); disco(gx + 5, gy - 3, 3, C.k); disco(gx + 5, gy - 3, 2.5, hex('#5a5a62')); pset(gx + 4, gy - 6, hex('#5a5a62')); pset(gx + 7, gy - 6, hex('#5a5a62')); pset(gx + 5, gy - 3, hex('#2a2a2e')); pset(gx + 7, gy - 3, hex('#2a2a2e'));
    for (let i = 0; i < 6; i++) pset(gx - 5 + i, gy + (i > 3 && Math.sin(t * 2) > 0.3 ? -1 : 0), hex('#7a7a84')); rect(gx - 2, gy - 6, gx + 1, gy - 6, hex('#7a7a84')); }
  return { suelo: 156, tele: [50, 64, 128, 118], pantalla: sc, consola: [72, 130, 106, 144], cable: [ex, ey], ventana: [212, 34, 268, 94], sofa: [204, 104, 306, 146], aro: [194, 74], libre: [[40, 200]] };
}

// el salón de 2023, cámara 'tele': la tele de tubo de cerca con la consola en su mueble (ver la cabecera de hoy)
function e_teleCerca(R, t, o) {
  const { rect, pset, linea } = R, MD = { c: hex('#6a4a32'), s: hex('#4e3220'), l: hex('#9a7048'), d: hex('#2e1a0e') };
  e_fijo(R, 'teleCerca', () => {
    e_papel(R, 0, 0, 319, 140, hex('#b89a74'), hex('#ae906c'), hex('#c6a882'), 8);
    e_luz(R, 150, 80, 120, 70, hex('#a8b8ff'), 0.06);
    rect(0, 141, 319, 144, hex('#e8e0d0')); rect(0, 144, 319, 144, hex('#a89c88')); rect(0, 145, 319, 179, hex('#9a8a76')); for (let i = 0; i < 1800; i++) pset(Math.round(h(i, 1, 801) * 319), 145 + Math.round(h(i, 2, 801) * 34), h(i, 3, 801) < 0.5 ? hex('#8a7a68') : hex('#aa9a86'));
    // el mueble con el hueco abierto y las dos puertas
    rect(40, 138, 264, 179, C.k); e_madera(R, 41, 139, 263, 179, MD.c, MD.s, MD.l, MD.d, 31, 10); rect(40, 138, 264, 142, MD.l); rect(40, 142, 264, 142, MD.d);
    rect(104, 147, 196, 178, hex('#1e140c')); rect(104, 147, 196, 149, hex('#0e0a06'));
    for (const [a, b] of [[46, 100], [200, 258]]) { rect(a, 146, b, 179, MD.d); rect(a + 1, 147, b - 1, 179, MD.c); rect(a + 1, 147, b - 1, 147, MD.l); rect(a + 5, 152, b - 5, 179, MD.s); rect(a + 6, 153, b - 6, 179, MD.c); rect(a + 6, 153, b - 6, 153, MD.l); }
    rect(97, 160, 98, 166, hex('#d8b060')); rect(203, 160, 204, 166, hex('#d8b060'));
    for (let k = 0; k < 4; k++) { const x = 184 + k * 3; rect(x, 154, x + 2, 177, [hex('#5a5a62'), hex('#2a2a30'), hex('#7a7a84'), hex('#3a3a44')][k]); rect(x, 154, x + 2, 154, hex('#a8a8b0')); }
  });
  e_guirnalda(R, t, -10, 330, 12, 5, 6);
  // a la izquierda, el árbol; a la derecha, la ventana con el barrio
  e_arbolNavidad(R, t, 12, 180, 140);
  e_barrio(R, t, [276, 58, 319, 118]); e_marco(R, 276, 58, 323, 118, { c: hex('#f0ece4'), l: hex('#ffffff'), d: hex('#b8b0a0') }, false);
  // la antena, la tele y su imagen; el reflejo de la habitación en el cristal
  linea(186, 27, 206, 7, hex('#9a9aa6')); linea(192, 27, 238, 12, hex('#9a9aa6')); R.disco(189, 26, 4, hex('#2a2a30')); pset(206, 7, hex('#d8d8e0')); pset(238, 12, hex('#d8d8e0'));
  const sc = e_televisor(R, t, 70, 24, 162, 114); e_teleImagen(R, t, sc, e_cl(o.congela ?? 0), 2);
  R.recorte(sc); for (const d of [0, 1, 5]) linea(sc[0] + 6 + d, sc[1] + 22, sc[0] + 22 + d, sc[1], hex('#5a6080'), 2); R.recorte(null);
  // la consola grande en el hueco y el cable que cuelga
  e_consola(R, t, 116, 176, 2);
  let px = 184, py = 172; for (let i = 1; i <= 16; i++) { const u = i / 16, x = Math.round(184 + 14 * u), y = Math.round(172 + 8 * u * u); linea(px, py, x, y, hex('#1a1a1e')); px = x; py = y; }
  return { suelo: 178, pantalla: sc, tele: [70, 24, 232, 138], consola: [116, 148, 184, 176], libre: [[0, 60], [264, 318]] };
}

// el ventilador de techo que gira (centro del eje en cx; cuatro aspas en perspectiva)
function e_ventilador(R, t, cx, y) {
  const { rect, linea, poligono } = R, a0 = t * 4.2;
  rect(cx - 1, 0, cx + 1, y - 3, hex('#8a7a62')); rect(cx - 5, y - 3, cx + 5, y + 2, C.k); rect(cx - 4, y - 2, cx + 4, y + 1, hex('#8a6a4a')); rect(cx - 4, y - 2, cx + 4, y - 2, hex('#c8a070'));
  for (let k = 0; k < 4; k++) { const a = a0 + k * Math.PI / 2, ex = Math.cos(a) * 30, ey = Math.sin(a) * 4, w = 1.5 + Math.abs(Math.sin(a)) * 1.5;
    for (let i = 3; i <= 30; i++) { const u = i / 30, px = Math.round(cx + ex * u), py = Math.round(y + 1 + ey * u); rect(px, py - Math.floor(w * (0.6 + u * 0.4)), px, py + Math.floor(w * 0.5), Math.sin(a) > 0 ? hex('#6a4026') : hex('#b07a46')); R.pset(px, py - Math.floor(w * (0.6 + u * 0.4)), Math.sin(a) > 0 ? hex('#8a5a32') : hex('#d8a46a')); } }
  R.disco(cx, y + 3, 2, hex('#f4e4b0')); R.pset(cx, y + 5, hex('#c8a060'));
}

// el dispensador de agua con su garrafa azul y las burbujas que suben de vez en cuando
function e_garrafa(R, t, x, yb) {
  const { rect, pset, disco } = R; rect(x, yb - 34, x + 12, yb, C.k); rect(x + 1, yb - 33, x + 11, yb - 1, hex('#e8e8ec')); rect(x + 1, yb - 33, x + 2, yb - 1, hex('#ffffff')); rect(x + 10, yb - 32, x + 11, yb - 1, hex('#b8b8c0'));
  rect(x + 3, yb - 26, x + 9, yb - 24, hex('#3a3a44')); pset(x + 4, yb - 24, hex('#4a8aff')); pset(x + 8, yb - 24, hex('#ff4a3a')); rect(x + 2, yb - 18, x + 10, yb - 17, hex('#a8a8b0'));
  rect(x + 1, yb - 52, x + 11, yb - 35, hex('#3a6aa8')); rect(x + 2, yb - 51, x + 10, yb - 36, hex('#6aa8e0')); rect(x + 3, yb - 50, x + 3, yb - 38, hex('#c8e8ff')); rect(x + 4, yb - 54, x + 8, yb - 52, hex('#3a6aa8'));
  for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k * 0.23) % 1.6); if (u < 1) disco(x + 6 + Math.round(Math.sin(t * 3 + k) * 2), yb - 37 - Math.round(u * 13), 0.9, hex('#e8f8ff')); }
}

// la oficina de Honolulu en 1996 (ver la cabecera de hoy)
function e_oficina(R, t, o) {
  const { rect, pset, linea, disco } = R, AL = { c: hex('#c8ccd4'), l: hex('#f4f6fa'), d: hex('#8a8e98') }, MD = { c: hex('#c08a52'), s: hex('#a0703e'), l: hex('#e0b07a'), d: hex('#6a4626') };
  e_fijo(R, 'oficina', () => {
    rect(0, 0, 319, 127, hex('#ece2cc')); for (let i = 0; i < 2400; i++) pset(Math.round(h(i, 1, 810) * 319), Math.round(h(i, 2, 810) * 127), h(i, 3, 810) < 0.5 ? hex('#e2d6bc') : hex('#f6eedc'));
    rect(0, 0, 319, 3, hex('#fbf6ea')); rect(0, 4, 319, 4, hex('#d0c4a8'));
    e_luz(R, 120, 70, 150, 70, hex('#fff4d0'), 0.12);
    rect(0, 128, 319, 131, hex('#8a7a62')); rect(0, 128, 319, 128, hex('#b8a888'));
    rect(0, 132, 319, 179, hex('#6a7890')); for (let i = 0; i < 3800; i++) pset(Math.round(h(i, 1, 811) * 319), 132 + Math.round(h(i, 2, 811) * 47), h(i, 3, 811) < 0.5 ? hex('#5e6c84') : hex('#7888a0')); for (let y = 136; y < 180; y += 6) for (let x = (y * 3) % 8; x < 320; x += 8) pset(x, y, hex('#56647a'));
    // el sol que entra por los tres paños y cae en la moqueta
    for (const [a, b] of [[16, 70], [78, 130], [138, 192]]) for (let y = 132; y < 178; y++) { const d = Math.round((y - 132) * 0.9); for (let x = a + d; x <= b + d - 6; x++) if (((x + y) & 1) === 0 && x < 320) pset(x, y, e_mez(R.pget(x, y), hex('#fff0c0'), 0.28)); }
    // el cuadro de los bloques de madera y la silla de detrás de la mesa
    rect(206, 30, 244, 64, C.k); rect(207, 31, 243, 63, hex('#c8a050')); rect(207, 31, 243, 31, hex('#f0d890')); rect(210, 34, 240, 60, hex('#f4ecd8'));
    for (const [bx, by] of [[214, 52], [222, 52], [230, 52], [218, 44], [226, 44], [222, 36]]) { rect(bx, by, bx + 7, by + 7, hex('#c08a52')); rect(bx, by, bx + 7, by, hex('#e8b880')); rect(bx, by, bx, by + 7, hex('#e8b880')); rect(bx + 7, by + 1, bx + 7, by + 7, hex('#8a5a32')); rect(bx + 1, by + 7, bx + 7, by + 7, hex('#8a5a32')); }
    R.disco(240, 96, 9, hex('#1e2a4a')); R.disco(240, 96, 8, hex('#2e3e6a')); rect(231, 96, 249, 117, hex('#1e2a4a')); rect(232, 96, 248, 117, hex('#2e3e6a')); rect(234, 90, 246, 90, hex('#4a5a8a')); for (let y = 98; y < 116; y += 4) rect(233, y, 247, y, hex('#26345a'));
    // la mesa de roble claro con la cajonera
    rect(196, 117, 314, 122, C.k); e_madera(R, 197, 118, 313, 121, MD.c, MD.s, MD.l, MD.d, 41, 4); rect(197, 118, 313, 118, MD.l);
    rect(200, 123, 312, 147, MD.s); e_madera(R, 201, 123, 282, 147, MD.s, MD.d, MD.c, MD.d, 42, 8); rect(201, 123, 282, 125, MD.d);
    e_madera(R, 284, 123, 312, 147, MD.c, MD.s, MD.l, MD.d, 43, 8); for (let j = 0; j < 3; j++) { const y = 125 + j * 7; rect(286, y, 310, y + 5, MD.d); rect(287, y + 1, 309, y + 4, MD.c); rect(287, y + 1, 309, y + 1, MD.l); rect(295, y + 3, 301, y + 3, hex('#e8e0d0')); }
    // lo de la mesa: teclado, teléfono de los noventa, disquetes, el portalápices y el contrato
    rect(248, 115, 288, 117, hex('#a89c80')); rect(249, 115, 287, 115, hex('#e8dcc0')); for (let x = 251; x < 286; x += 3) pset(x, 116, hex('#7a705a'));
    rect(200, 110, 214, 117, C.k); rect(201, 111, 213, 116, hex('#d8ccb0')); rect(199, 108, 215, 110, hex('#c8bca0')); rect(199, 108, 215, 108, hex('#f0e4c8')); for (let k = 0; k < 6; k++) pset(203 + (k % 3) * 3, 112 + (k >> 1) * 2 % 4, hex('#7a705a'));
    for (let i = 0; i < 10; i++) pset(215 + (i & 1), 112 + i, hex('#3a3a3a'));
    for (let k = 0; k < 3; k++) { rect(230, 114 - k * 2, 240, 115 - k * 2, [hex('#2a2a3a'), hex('#c83a3a'), hex('#3a6ac8')][k]); } rect(242, 109, 246, 117, hex('#3a5a3a')); linea(243, 109, 242, 104, hex('#e8c040')); linea(245, 109, 246, 105, hex('#c83a3a'));
    R.poligono([[218, 117], [230, 117], [233, 114], [221, 114]], hex('#f8f6f0')); linea(222, 115, 229, 115, hex('#a8a8b8')); linea(221, 116, 227, 116, hex('#a8a8b8'));
  });
  e_vistaSol(R, t, [14, 22, 194, 102]);
  // el ventanal: marco de aluminio en tres paños, la persiana recogida arriba con sus cordones, y el alféizar
  rect(10, 18, 198, 21, AL.c); rect(10, 18, 198, 18, AL.l); rect(10, 18, 13, 106, AL.c); rect(195, 18, 198, 106, AL.c); rect(10, 18, 10, 106, AL.l); rect(198, 18, 198, 106, AL.d);
  for (const x of [74, 134]) { rect(x - 2, 22, x + 1, 102, AL.c); rect(x - 2, 22, x - 2, 102, AL.l); rect(x + 1, 22, x + 1, 102, AL.d); }
  for (let y = 22; y < 31; y += 2) { rect(14, y, 194, y, hex('#f4f0e6')); rect(14, y + 1, 194, y + 1, hex('#c8c0b0')); } rect(14, 31, 194, 32, hex('#e8e4dc'));
  for (const [x, k] of [[30, 0], [178, 1]]) { const sw = Math.round(Math.sin(t * 0.9 + k * 2) * 1.5); linea(x, 33, x + sw, 58, hex('#e8e4dc')); R.disco(x + sw, 59, 1.5, hex('#c8b898')); }
  rect(6, 103, 202, 106, hex('#f4f0e8')); rect(6, 103, 202, 103, hex('#ffffff')); rect(6, 106, 202, 106, hex('#b8b0a0'));
  R.recorte([14, 33, 194, 102]); for (const d of [0, 2, 8]) linea(40 + d, 102, 100 + d, 33, hex('#f0f8ff'), 3); for (const d of [0, 5]) linea(150 + d, 102, 190 + d, 54, hex('#f0f8ff'), 3); R.recorte(null);
  // el ventilador, el reloj, el dispensador de agua y la palmera en su maceta
  e_ventilador(R, t, 236, 13); e_reloj(R, t, 262, 52, 6, hex('#2a2a2a'));
  e_credencia(R); e_fax(R, t, 112, 105);
  e_garrafa(R, t, 0, 146); { const sh = (x0, x1) => { for (let y = 146; y < 150; y++) for (let x = x0; x <= x1; x++) if ((x + y) & 1) pset(x, y, e_mez(R.pget(x, y), C.k, 0.3)); }; sh(0, 14); }
  e_palmera(R, t, 186, 138, 52, 7, -1); rect(179, 136, 193, 147, C.k); rect(180, 137, 192, 146, hex('#d8d0c0')); rect(180, 137, 192, 138, hex('#f4f0e8')); rect(190, 139, 191, 146, hex('#a8a090'));
  // el ordenador de los noventa con su salvapantallas de bloques, la torre y las dos tazas
  const sc = e_crt(R, 250, 82, 36, 30); e_pantalla(R, t, sc, { tinta: hex('#9ad0ff'), fondo: hex('#0a1430'), k: 9 });
  e_torre(R, t, 291, 118, 14, 30, 4);
  if (o.tazas !== false) { e_taza(R, t, 222, 118, hex('#f4f0e8'), 3); e_taza(R, t, 238, 118, hex('#2a6ab0'), 5); }
  return { suelo: 154, ventana: [14, 22, 194, 102], credencia: [20, 106, 150, 128], mesa: [196, 117, 314, 117], tazas: [[222, 118], [238, 118]], contrato: [218, 114, 233, 117], pantalla: sc, libre: [[24, 176]] };
}

// la oficina de 1996, cámara 'mesa': la mesa de cerca con el contrato, las tazas y el ventanal detrás
function e_mesa96(R, t, o) {
  const { rect, pset, linea, disco } = R, MD = { c: hex('#c08a52'), s: hex('#a0703e'), l: hex('#e0b07a'), d: hex('#6a4626') };
  e_fijo(R, 'mesa96', () => {
    rect(0, 0, 319, 94, hex('#ece2cc')); for (let i = 0; i < 1500; i++) pset(Math.round(h(i, 1, 820) * 319), Math.round(h(i, 2, 820) * 94), h(i, 3, 820) < 0.5 ? hex('#e2d6bc') : hex('#f6eedc'));
    // la mesa de roble en perspectiva: tablas que se ensanchan hacia nosotros, vetas y el canto de atrás con luz
    let y = 94, f = 0; while (y < 180) { const alto = Math.round(5 + (y - 94) * 0.18), yb = Math.min(179, y + alto - 1); e_madera(R, 0, y, 319, yb, f & 1 ? MD.c : e_mez(MD.c, MD.s, 0.3), MD.s, MD.l, MD.d, 50 + f, alto + 1); rect(0, yb, 319, yb, MD.d); y = yb + 1; f++; }
    rect(0, 94, 319, 95, MD.l);
    for (let yy = 96; yy < 180; yy++) for (let x = 0; x < 140; x++) if (((x + yy) & 1) === 0 && x < 140 - (yy - 96) * 0.6) pset(x, yy, e_mez(R.pget(x, yy), hex('#fff0c0'), 0.18));
    // el vade de piel verde con sus esquinas
    rect(78, 108, 244, 176, C.k); rect(79, 109, 243, 175, hex('#2e5a3e')); for (let i = 0; i < 900; i++) pset(80 + Math.round(h(i, 1, 821) * 162), 110 + Math.round(h(i, 2, 821) * 64), h(i, 3, 821) < 0.5 ? hex('#26503a') : hex('#3a6a4a'));
    for (const [a, b, c2, d] of [[79, 109, 92, 116], [230, 109, 243, 116], [79, 168, 92, 175], [230, 168, 243, 175]]) { rect(a, b, c2, d, hex('#5a2a1a')); rect(a, b, c2, b, hex('#8a4a2a')); }
    // el teléfono, los disquetes y el bolígrafo
    rect(14, 104, 52, 122, C.k); rect(15, 105, 51, 121, hex('#d8ccb0')); rect(13, 98, 53, 104, hex('#c8bca0')); rect(13, 98, 53, 98, hex('#f0e4c8')); for (let k = 0; k < 12; k++) rect(20 + (k % 4) * 7, 108 + Math.floor(k / 4) * 4, 23 + (k % 4) * 7, 109 + Math.floor(k / 4) * 4, hex('#8a8070'));
    for (let k = 0; k < 4; k++) { const x = 260 + k, yy = 162 - k * 3; rect(x, yy, x + 18, yy + 2, C.k); rect(x, yy, x + 18, yy + 1, [hex('#2a2a3a'), hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040')][k]); }
    linea(196, 168, 222, 158, hex('#1e1e2a')); linea(196, 169, 222, 159, hex('#3a3a5a')); rect(220, 157, 223, 159, hex('#e8c040'));
  });
  // el ventanal con las palmeras y el mar al fondo, con su marco y la persiana recogida
  e_vistaSol(R, t, [4, 18, 266, 86]);
  rect(0, 14, 270, 17, hex('#c8ccd4')); rect(0, 14, 270, 14, hex('#f4f6fa')); rect(267, 14, 270, 90, hex('#c8ccd4')); rect(270, 14, 270, 90, hex('#8a8e98')); rect(0, 87, 270, 90, hex('#f4f0e8')); rect(0, 87, 270, 87, hex('#ffffff'));
  rect(134, 18, 137, 86, hex('#c8ccd4')); rect(134, 18, 134, 86, hex('#f4f6fa')); for (let y = 18; y < 26; y += 2) { rect(4, y, 266, y, hex('#f4f0e6')); rect(4, y + 1, 266, y + 1, hex('#c8c0b0')); }
  R.recorte([4, 26, 266, 86]); for (const d of [0, 3, 10]) linea(60 + d, 86, 120 + d, 26, hex('#f0f8ff'), 3); R.recorte(null);
  // el monitor que asoma a la derecha, con su salvapantallas
  const sc = e_crt(R, 274, 50, 52, 42); e_pantalla(R, t, sc, { tinta: hex('#9ad0ff'), fondo: hex('#0a1430'), k: 11, bloque: 4 });
  // el contrato grande en el centro (la pieza del reparto) y las dos tazas que humean
  const P = PIEZAS_TS.contrato; for (let y = 172; y < 176; y++) for (let x = 140; x < 186; x++) if ((x + y) & 1) pset(x, y, e_mez(R.pget(x, y), C.k, 0.35));
  if (P) P(R, 161, 172, { s: 2, firma: o.firma, casillas: o.casillas, sello: o.sello, t });
  if (o.tazas !== false) { e_taza(R, t, 104, 150, hex('#f4f0e8'), 3, 2); e_taza(R, t, 216, 140, hex('#2a6ab0'), 5, 2); }
  return { suelo: 178, contrato: [139, 116, 183, 172], tazas: [[104, 150], [216, 140]], ventana: [4, 18, 266, 86], pantalla: sc };
}

// la credencia baja bajo el ventanal de la oficina: puertas de roble, archivadores de anillas encima y la bandeja
function e_credencia(R) {
  const { rect, disco } = R, MD = { c: hex('#c08a52'), s: hex('#a0703e'), l: hex('#e0b07a'), d: hex('#6a4626') };
    rect(20, 106, 150, 128, C.k); e_madera(R, 21, 107, 149, 128, MD.c, MD.s, MD.l, MD.d, 44, 7); for (let x = 21; x < 149; x += 32) { rect(x + 2, 110, x + 29, 126, MD.s); rect(x + 3, 111, x + 28, 125, MD.c); rect(x + 3, 111, x + 28, 111, MD.l); rect(x + 13, 117, x + 18, 117, hex('#e8e0d0')); }
    for (let k = 0; k < 7; k++) { const x = 24 + k * 6, c = [hex('#2a4a8a'), hex('#c83a3a'), hex('#2a6a4a'), hex('#e8c040'), hex('#4a4a5a'), hex('#2a4a8a'), hex('#8a3a6a')][k]; rect(x, 92, x + 5, 105, c); rect(x, 92, x, 105, e_mez(c, hex('#ffffff'), 0.3)); rect(x + 1, 96, x + 4, 99, hex('#f4f0e8')); disco(x + 3, 102, 1, hex('#e8e8e8')); }
    rect(70, 100, 90, 105, hex('#3a3a44')); rect(71, 98, 89, 99, hex('#f4f2ea')); rect(72, 96, 88, 97, hex('#e4e2da'));
}

// el fax de los noventa sobre la credencia (x, yb: abajo a la izquierda): el papel que sale despacio y se enrolla, y el piloto
function e_fax(R, t, x, yb) {
  const { rect, pset } = R, u = (t % 9) / 9; rect(x, yb - 9, x + 28, yb, C.k); rect(x + 1, yb - 8, x + 27, yb - 1, hex('#d8d0bc')); rect(x + 1, yb - 8, x + 27, yb - 8, hex('#f0e8d4')); rect(x + 18, yb - 6, x + 25, yb - 3, hex('#8a8272')); for (let k = 0; k < 6; k++) pset(x + 19 + (k % 3) * 2, yb - 5 + (k >> 1) % 2 * 2, hex('#e8e0cc'));
  rect(x + 3, yb - 6, x + 15, yb - 5, hex('#3a3a3a')); pset(x + 25, yb - 2, Math.sin(t * 4) > 0 ? hex('#4ae070') : hex('#1a4a2a'));
  const L = Math.round(u * 14); rect(x + 4, yb - 9 - Math.min(L, 6), x + 14, yb - 9, hex('#f8f6f0')); if (L > 6) { rect(x + 4, yb - 15, x + 14, yb - 15, hex('#e0ded8')); rect(x + 14, yb - 15, x + 14 + (L - 6), yb - 15 + Math.round((L - 6) * 0.4), hex('#f8f6f0')); } for (let y = yb - 8; y > yb - 9 - Math.min(L, 6); y -= 2) rect(x + 6, y, x + 12, y, hex('#a8a8b8'));
}

// el puf de tela (delante, abajo a la izquierda)
function e_puf(R, x, yb) { const { disco, rect, pset } = R; disco(x, yb - 8, 14, C.k); disco(x, yb - 8, 13, hex('#c8503a')); disco(x - 4, yb - 12, 7, hex('#e07a5a')); for (let i = -10; i <= 10; i += 5) pset(x + i, yb - 8 + Math.abs(i) * 0.2, hex('#8a2a1a')); rect(x - 16, yb - 1, x + 16, yb, hex('#6a5a48')); }

// la caja de pizza abierta con una porción (delante, abajo a la derecha)
function e_pizza(R, x, yb) {
  const { rect, poligono, pset } = R; rect(x - 18, yb - 6, x + 18, yb, C.k); rect(x - 17, yb - 5, x + 17, yb - 1, hex('#d8b880')); rect(x - 17, yb - 5, x + 17, yb - 5, hex('#f0d8a8'));
  poligono([[x - 14, yb - 4], [x + 6, yb - 4], [x - 4, yb - 1]], hex('#e8a040')); for (const [dx, dy] of [[-8, -3], [-3, -3], [-5, -2]]) pset(x + dx, yb + dy, hex('#c83a2a'));
  rect(x - 18, yb - 16, x + 18, yb - 7, C.k); rect(x - 17, yb - 15, x + 17, yb - 8, hex('#c8a870')); rect(x - 8, yb - 13, x + 8, yb - 10, hex('#c83a2a'));
}
