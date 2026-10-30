// Fontanería y decorados del episodio 17 (los tesoros perdidos: el oro de los templarios, el Santo Grial, Rennes-le-Château,
// el rollo de cobre y el cofre de Fenn, 1120–2020) en el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md.
// Ocho decorados (guion.md): A el Temple de París en 1307, B Ultramar, C el puerto, D la logia, E el Grial,
// F Rennes-le-Château, G el desierto y el taller, H hoy; más las piezas de los gags (el detector de metales del buscador,
// el cofre, el rollo de cobre, las copas, la carta sellada). Sin letras: pergaminos y carteles con trazos y pictogramas.
// Leyenda y hecho separados; los masones con respeto; nada de violencia en la imagen.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite.
//
//   import * as T from '/atomo/plato/escenas/te-comun.js';
//   const { E, R, M } = await T.preparar('te-gancho');
//   T.rodar(E, R, [[0, (t) => T.temple(R, t, { encuadre: 'calle', luz: 'alba' })]], { año: 1307 });
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
    // la piedra medieval de París y de Ultramar, el blanco y la cruz roja templarios, el azul y el oro del rey de Francia
    piedra: '#a8a090', piedraS: '#787060', piedraL: '#ccc4b0', arenisca: '#d8b880', areniscaS: '#a88a58', areniscaL: '#f0d8a8',
    mantoT: '#f2eee2', cruzT: '#c8303a', azulRey: '#2a4a9a', oroRey: '#e8b830',
    // la logia (madera oscura, suelo ajedrezado, velas), el pergamino y la cera
    nogal: '#4a2e1c', nogalL: '#6e4630', ajedrezB: '#e8e0cc', ajedrezN: '#2a2430', vela: '#f8e8a0', pergamino: '#e8d8a8', pergaminoS: '#c0a878', cera: '#a8303a',
    // el cobre oxidado del rollo, el desierto de Qumrán, el mar Muerto
    cobre: '#c87a3a', cobreS: '#8a4a24', cardenillo: '#5aa890', desierto: '#d8b078', desiertoS: '#a8804c', marMuerto: '#5a9ab0',
    // las Rocosas de hoy: pinos, granito, río
    pino: '#2a5a3a', pinoL: '#4a8a5a', granito: '#8a8a94', granitoL: '#b0b0b8',
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
  const E = await escena(id, 'ep17');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la cruz templaria (1120–1314), el pergamino (1315–1899) y la pala (1900–2026)
  Object.assign(R.ICONOS, {
    cruz: ['..###..', '..###..', '#######', '#######', '#######', '..###..', '..###..'],
    pergamino: ['.#####.', '#.....#', '.#####.', '.#...#.', '.#####.', '#.....#', '.#####.'],
    pala: ['..###..', '..###..', '...#...', '...#...', '...#...', '..###..', '.#####.'],
  });
  R.tramosTiempo([[1120, 1314, R.PALA.ROJO, 'cruz'], [1315, 1899, R.PALA.ORO, 'pergamino'], [1900, 2026, R.PALA.AZUL, 'pala']]);
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

// ── A · El Temple de París, 1307 ────────────────────────────────────────────────────────────────────────────────────
// El recinto del Temple de París en 1307 y el París de alrededor. Cada encuadre con dos cámaras (o.camara). o.encuadre:
//   'calle' (por omisión): una calle de París al amanecer: casas de entramado con voladizos y piñón a la calle, tiendas con
//     el mostrador abatido y muestras colgadas que se mecen, chimeneas que humean, el barro con roderas y charcos que
//     reflejan el cielo, niebla baja que se arrastra; a la derecha la muralla almenada del Temple y su puerta fortificada
//     (portón de dos hojas con herrajes y clavos, la cruz roja pintada encima sobre un disco encalado, dos antorchas que
//     chisporrotean), y por encima de la muralla la gran torre del Temple en la neblina. Vida: nubes a tres velocidades,
//     pájaros, palomas en las almenas, un gallo en el carro, un gato en el tonel, ventanas con vela que tiemblan.
//     o.luz 'alba' (por omisión) o 'noche' (estrellas, luna, casi todas las ventanas encendidas); o.puerta (0–1) abre la
//     hoja derecha del portón hacia dentro (se ve el zaguán con luz de vela, para que salga un templario).
//     o.camara 'patio': el patio del recinto: la gran torre del Temple de cerca con sus cuatro torrecillas, la rotonda de
//     la iglesia, las cuadras con caballos que asoman y una espadaña con la campana que tañe (o.campana: 0 quieta,
//     1 por omisión tañe), el pozo con el cubo que sube y baja, el abrevadero, el empedrado; sitio para una fila de 4–6.
//   'torre': la gran torre por dentro: bóveda de crucería, muros de sillería, dos saeteras con haces de luz y polvo que
//     flota, la escalera de caracol a la izquierda, estanterías con rollos y códices, tres arcones (cofre(), casi vacíos)
//     contra el muro y el escritorio de las cuentas con libro, tintero, vela y balanza; un ratón que corre por el zócalo.
//     o.abre (0–1) abre las tapas de los arcones. o.camara 'cofres': tres cofres grandes de cerca sobre las losas, delante
//     del muro con una saetera; o.abre (0–1) abre las tapas (dentro casi nada: unas monedas y telarañas).
//   'palacio': el salón del rey: techo de vigas, tapices azules con lises de oro (sin letras) que ondean un poco, dos
//     ventanales góticos con el cielo y las nubes, el trono bajo un dosel azul con lises sobre un estrado, candelabros con
//     velas, suelo de baldosas a cuadros, un lebrel tumbado que mueve la cola. o.camara 'mesa': la mesa de las cuentas de
//     cerca: el libro abierto, el paño de contar con fichas, montones de monedas, tintero, vela y sello; el libro no se
//     acaba: un reguero de pliegos cae por el canto de la mesa y se amontona en el suelo hasta salir del plano (gag).
//     o.paginas (0–1) pasa páginas (una hoja que voltea cada vez más deprisa) y alarga el reguero.
//   'sena': París al anochecer desde la orilla: cielo de ocaso con nubes encendidas, la isla de la Cité con Notre-Dame y
//     el palacio a contraluz, ventanas que se encienden, el puente con casas, el río con reflejos que se mueven y barcas
//     con su barquero; en primer término la orilla con juncos que se mecen, una barca amarrada y un poste. o.humo (0–1):
//     una columna de humo lejana que sube detrás de la isla y se dobla con el viento (sin fuego ni personas).
//     o.camara 'orilla': más cerca del agua, desde un embarcadero de madera: un sauce, la ciudad más pequeña y lejos, y
//     gente pequeña en la orilla mirando de espaldas hacia el humo; o.humo igual.
// Devuelve { suelo, pies:[x…] (bordes izquierdos para R.actor), … } y, según el encuadre, puerta, hueco, cofres, mesa,
// trono, escritorio, libro…
export function temple(R, t, o = {}) {
  const enc = o.encuadre || 'calle', cam = o.camara || 'general';
  if (enc === 'calle') return cam === 'patio' ? a_patio(R, t, o) : a_calle(R, t, o);
  if (enc === 'torre') return cam === 'cofres' ? a_torreCofres(R, t, o) : a_torre(R, t, o);
  if (enc === 'palacio') return cam === 'mesa' ? a_palacioMesa(R, t, o) : a_palacio(R, t, o);
  return cam === 'orilla' ? a_orilla(R, t, o) : a_sena(R, t, o);
}
// ── B · Ultramar ────────────────────────────────────────────────────────────────────────────────────────────────────
// Jerusalén y los caminos de Tierra Santa hacia 1120–1300, al sol blanco de calor (cielo tramado de azul a casi blanco,
// nubes de tres tonos a tres velocidades, pájaros). Devuelve la geometría del encuadre ({ suelo, pies, … }). o.encuadre:
//   'jerusalen': o.camara 'general': de lejos, las murallas doradas de sillería con almenas y torres (gallardetes lisos
//     que ondean, un centinela que pasea tras las almenas), la puerta con su arco y el camino de polvo que baja hasta el
//     primer término con peregrinos pequeños que llegan levantando polvo; detrás de la muralla, las azoteas de la
//     ciudad, cipreses, la gran cúpula dorada sobre su tambor de azulejos y la cúpula gris de al-Aqsa con sus arcos (sin
//     cruces ni símbolos), un humo que sube, palomas en torno a la cúpula; un olivo a la izquierda, una palmera a la
//     derecha y el temblor del calor. o.altar (false): un altar de piedra con mantel blanco, un libro cerrado y dos velas
//     (sin cruz) en x 78–108, para el juramento.
//     o.camara 'explanada': la explanada empedrada con losas grandes; a la derecha, el pórtico de siete arcos de
//     al-Aqsa con su cúpula de plomo, convertido en cuadras: caballos bajo los arcos (uno come del pesebre, otro mueve
//     la cola, otro asoma la cabeza), sillas y arreos colgados, paja y un mozo que echa heno; a la izquierda, las
//     escaleras con los arcos sueltos que suben a la gran cúpula dorada, cipreses, una fuente con su caño que gotea y
//     un abrevadero con el agua que tiembla; palomas que picotean.
//   'camino': o.camara 'general': el camino de los peregrinos que serpentea entre colinas pedregosas en tres términos
//     (bancales, olivos, un pueblo lejano), una caravana de camellos que cruza la loma del fondo, cabras que pastan, un
//     pozo con su armazón, polea, cubo que sube y baja, y el abrevadero; sombras de nubes que pasan por las laderas, el
//     temblor del calor, un lagarto que hace flexiones y matas que mueve el viento.
//     o.camara 'emboscada': la curva del camino entre un cortado de roca a estratos y peñas grandes; una higuera que
//     cuelga del cortado, un cuervo que mira desde la peña (y grazna), piedrecitas que caen, polvo en el camino. La peña
//     de delante (donde se esconde el ladrón) va por delante de los personajes: rocasDelante(R, t), que el decorado ya
//     pinta salvo con o.delante: false (la escena la pinta después del ladrón).
//   'casa': o.camara 'general': una casa del Temple junto al mar que es castillo y banco: la torre del homenaje con el
//     estandarte blanco y negro, la muralla con almenas y la puerta, el mar con dos naves que cabecean (una con la cruz
//     roja en la vela) y gaviotas; en el patio, la casa de cuentas con su puerta abierta y el letrero de la balanza (un
//     pictograma), un carro de sacos del que un mozo descarga sacos sin parar, otro carro con barriles, un rebaño de
//     ovejas que pasta con su pastor y su perro, gallinas, humo de la cocina.
//     o.camara 'mostrador': dentro, el mostrador de cerca: muro de sillería, la ventana de arco con reja por la que se ve
//     el mar (nave y gaviota recortadas al hueco) y su haz de luz con motas, las estanterías con libros de cuentas sin
//     letras, rollos, sacos de monedas y cofres, el arca grande con su candado, un reloj de arena, la puerta del fondo
//     con un contable diminuto que cuenta monedas a la luz de una vela, un gato que duerme en un cofre. El mostrador
//     (tablero con balanza que oscila, montones de monedas que brillan, el libro abierto, tintero y pluma, una vela)
//     va por delante de quien está detrás: mostradorDelante(R, t), que el decorado pinta salvo con o.delante: false.
//   'sello': el sello de cera de la orden: dos caballeros con yelmo, lanza y escudo en un solo caballo, en relieve con la
//     luz arriba a la izquierda, la orla de perlas (sin letras) y el borde de cera aplastado; el caballo tiene cara de
//     cansado (párpados caídos que parpadean despacio, la lengua fuera, las orejas gachas, gotas de sudor que caen y
//     resoplidos). o.luz 'vela' (por omisión: cálida, con el brillo que tiembla) o 'dia'. o.camara 'general': la mesa de
//     madera con el pergamino escrito a trazos, el sello que cuelga de su cordón, la vela, la barra de lacre, la matriz
//     de latón, el tintero con la pluma y unas monedas; 'cerca': el sello llena el plano, con el cordón trenzado.
export function ultramar(R, t, o = {}) {
  const enc = o.encuadre ?? 'jerusalen', cam = o.camara ?? 'general';
  if (enc === 'camino') return cam === 'emboscada' ? b_emboscada(R, t, o) : b_camino(R, t, o);
  if (enc === 'casa') return cam === 'mostrador' ? b_mostrador(R, t, o) : b_casaTemple(R, t, o);
  if (enc === 'sello') return b_sello(R, t, o);
  return cam === 'explanada' ? b_explanada(R, t, o) : b_jerusalen(R, t, o);
}
// ── C · El puerto ────────────────────────────────────────────────────────────────────────────────────────────────────
// Un puerto atlántico de 1307 y la leyenda de la flota. Devuelve la geometría del encuadre ({ suelo, pies, … }). o.encuadre:
//   'puerto': de noche, con niebla que se arrastra en bancos a dos velocidades. o.camara 'general': la bocana entre dos
//     torres de piedra (en la de la derecha arde una almenara; una cadena cuelga entre las dos), las casas del puerto
//     con ventanas que se encienden y se apagan, estrellas, la luna con su halo y su reflejo, tres galeras amarradas
//     con las velas recogidas, los remos alzados y su farol de popa que tiembla en el agua; en primer término el muelle
//     de sillería mojada con argollas, bolardos, amarras, barriles, cajas, una red y un farol con su halo; un gato en
//     los barriles. o.flota (0–1): las galeras sueltan amarras, despliegan las velas con la cruz roja, salen por la
//     bocana y se pierden en la niebla, cada vez más pequeñas y transparentes (casi fantasmas), y en alta mar asoman
//     otras galeras fantasma. o.camara 'muelle': el muelle de cerca: barriles apilados, cajas, rollos de cuerda, un
//     ancla, la red colgada, el bolardo con su amarra, el farol con su halo, y detrás el casco de una galera amarrada
//     (tracas, portillas, remos alzados, el farol de popa y un marinero diminuto que adujar cabos en cubierta).
//   'tribunal': una sala de 1308 (Poitiers) de sillería con bóveda, dos ventanales ojivales con vidrieras geométricas y
//     sus haces de luz con motas, un tapiz rojo de rombos (sin símbolos), el estrado con tres sillas altas de respaldo
//     apuntado y el suelo de baldosas en perspectiva. o.camara 'general': con el banco del declarante a la izquierda y el
//     atril del escribano a la derecha; la mesa de los inquisidores (paño rojo con galón de oro, pergaminos con sello,
//     dos velas, tintero y un reloj de arena que corre) va por delante de los sentados: tribunalDelante(R, t), que el
//     decorado pinta salvo con o.delante: false. o.camara 'banco': el banco del declarante de cerca, con la ventana
//     enrejada y su haz, una antorcha en la pared, la esquina de la mesa con su vela y un hueco de pared libre arriba
//     para el bocadillo (bocadilloBarcos(R, x, y, n, t, o): un bocadillo con n galeras dibujadas).
//   'mapa': un mapa de papel viejo sobre una mesa de noche con una vela y una brújula de latón cuya aguja tiembla:
//     costas a tinta con su rayado, el mar tramado con ondas, montes en pictograma, castillos de las ciudades, la rosa
//     de los vientos con sus rumbos, una serpiente de mar, pliegues, manchas y un cerco de taza (sin letras). o.rutas
//     (0–1): las rutas punteadas de la leyenda salen de La Rochelle hacia Escocia, Portugal y América, con una galera
//     dibujada que avanza en la punta de cada una; al llegar, una marca. o.camara 'general' (Europa y el Atlántico) u
//     'oeste' (Nueva Escocia de cerca: la chincheta en Oak Island y el pozo dibujado al lado, con su línea de puntos).
export function puerto(R, t, o = {}) {
  const enc = o.encuadre ?? 'puerto', cam = o.camara ?? 'general';
  if (enc === 'tribunal') return cam === 'banco' ? b_banco(R, t, o) : b_tribunal(R, t, o);
  if (enc === 'mapa') return b_mapaRutas(R, t, o);
  return cam === 'muelle' ? b_muelle(R, t, o) : b_puertoNoche(R, t, o);
}
// ── D · La logia ─────────────────────────────────────────────────────────────────────────────────────────────────────
// Los masones del siglo XVIII, con respeto y solo con historia. o.encuadre:
//   'taberna' (por omisión): una taberna de Londres en 1717 de tarde: techo de vigas, pared de yeso entre entramados,
//     la chimenea encendida (fuego, caldero y un perro que duerme delante), el ventanal emplomado a la calle (casas de
//     enfrente, gente que pasa y el letrero colgante del ganso y la parrilla, en pictograma, que se mece), el reloj de
//     caja con su péndulo, los estantes de jarras de peltre y botellas, los toneles con la moza que va y viene, y la mesa
//     larga (la pinta logiaDelante, por delante de los que están detrás de ella). o.camara 'mesa': la mesa de cerca,
//     vista un poco desde arriba, con jarras con espuma, pipas de barro que humean, la vela, el pan y el queso, el
//     tintero y el pergamino de las reglas (renglones de trazos y un sello de cera); detrás, la ventana con el letrero
//     y la chimenea; la tabla la pinta logiaDelante.
//   'catedral': una catedral gótica a medio construir de día: la torre acabada, la nave con el rosetón vacío, la otra
//     torre a medias entre andamios de troncos atados, la grúa con su polea que sube y baja un sillar (y el canterito
//     que da vueltas al torno), canteros pequeños que golpean en los andamios y uno que sube la escalera con el capacho,
//     la cabaña de los canteros (la «logia») con su tejado de paja, herramientas y humo, sillares y un carro en el suelo.
//     o.camara 'cerca': el banco del cantero junto al muro: un sillar sobre el banco con la marca del cantero tallada
//     (o.talla 0–1 la va descubriendo; 1 por omisión), saltan esquirlas (o.golpes, true por omisión), la escuadra, el
//     compás, la maza y el cincel; detrás, el muro de sillería con su ventana ojival, el andamio y la polea.
//   'salon': el salón de una logia del siglo XVIII: suelo ajedrezado en perspectiva, el estrado de tres peldaños con el
//     sitial del venerable bajo un dosel con la estrella flamígera (brilla), dos columnas con sus globos, candeleros altos
//     con velas que titilan, la alfombra del cuadro de la logia en el suelo (escuadra y compás), bancos a los lados con
//     hermanos pequeños sentados que asienten, ventanales. o.lugar 'paris' (1736, por omisión: paneles claros con
//     molduras doradas, lámpara de araña, luz de tarde) o 'alemania' (hacia 1755: madera oscura, cortinas rojas, noche,
//     solo la luz de las velas). o.camara 'atril': el atril del orador de cerca (lo pinta logiaDelante: libro abierto con
//     renglones de trazos que o.paginas 0–1 pasa, y su vela), con el dosel, la estrella, una columna y un candelabro.
//   'desfile': una calle mayor de hoy (un pueblo de EE. UU.) de fiesta: cielo con nubes, fachadas de ladrillo con
//     cornisas, ventanas con reflejos y toldos a rayas, guirnaldas de banderines que ondean, público pequeño en la acera
//     que saluda (globos), una banda lejana que desfila con mantos y sombreros de pluma, farolas y confeti; sin letras ni
//     escudos. o.camara 'cerca': el bordillo de cerca, con el público más grande tras la cuerda, el escaparate y el toldo.
// Devuelve { suelo, pies:[x…], … } con las posiciones de cada encuadre (ver cada rama).
export function logia(R, t, o = {}) {
  const enc = o.encuadre ?? 'taberna', cam = o.camara ?? 'general';
  if (enc === 'catedral') return cam === 'cerca' ? c_cantero(R, t, o) : c_catedral(R, t, o);
  if (enc === 'salon') return cam === 'atril' ? c_atril(R, t, o) : c_salon(R, t, o);
  if (enc === 'desfile') return c_desfile(R, t, o, cam === 'cerca');
  return cam === 'mesa' ? c_tabernaMesa(R, t, o) : c_taberna(R, t, o);
}
// ── E · El Grial ─────────────────────────────────────────────────────────────────────────────────────────────────────
// Los poemas del Grial (1190–1210) y el cáliz de Valencia. o.encuadre:
//   'scriptorium' (por omisión): un scriptorium medieval de piedra con bóveda: la ventana ojival con lluvia (o.luz
//     'noche', por omisión, con algún relámpago) o con sol y un haz de luz con motas (o.luz 'dia'), estantes con libros y
//     rollos, el arcón con un gato que duerme y mueve la cola, un monje pequeño que pasa con su vela por la galería del
//     fondo, el suelo de losas con esteras, y el pupitre inclinado del poeta con su libro, el tintero y la vela (el
//     frente del pupitre lo pinta grialDelante, por delante del poeta). o.vision (0–1): el bocadillo de imaginación sale
//     de la cabeza del poeta y crece; dentro, un joven caballero a caballo ve pasar por una sala con antorchas un objeto
//     que brilla (una doncella lo lleva). o.camara 'hoja': la hoja del libro de cerca sobre el pupitre: la hoja izquierda
//     escrita (renglones de trazos, sin letras) con una capitular de adorno, la derecha a medio escribir (o.escrito 0–1,
//     0,6 por omisión); la pluma en el tintero (o.pluma 'tintero', por omisión), sobre la hoja ('hoja') o ninguna (false,
//     si la escena pone la mano); la vela con o.vela (1 encendida, por omisión; 0 apagada, con su hilo de humo); el reloj
//     de arena que cae y una polilla que ronda la llama; o.dibujo 'cena': en la hoja derecha, una miniatura de una cena
//     (mesa larga con figuritas) con una copa que brilla (o.brillo 0–1).
//   'castillo': el castillo del Grial de los poemas, de noche: la gran sala de piedra con arcos y pilares, ventanales
//     con la luna, antorchas que llamean, estandartes blancos con la cruz roja que ondean, el altar sobre dos gradas con la
//     piedra luminosa (o.objeto 'piedra', por omisión) o una copa de oro (o.objeto 'copa') que irradia rayos que giran, y
//     una procesión de figuritas con velas que cruza por el fondo. o.camara 'altar': el altar de cerca, con mantel
//     bordado, candeleros, el mosaico dorado del ábside y el objeto grande que late.
//   'mostrador': un mostrador largo de feria al atardecer, con toldo a rayas, farolillos, otros puestos y gente pequeña
//     de fondo, un castillo lejano, banderines y una fila de copas distintas (madera, oro, barro, cristal, plata, ágata…)
//     que dicen ser el Grial: o.copas (cuántas, 7 por omisión), o.nueva (0–1: aparece otra al final de la fila con un
//     destello), o.falta (índice de una copa que ya no está). o.camara 'cerca': el mostrador de cerca, con menos copas más
//     grandes y sus etiquetas de precio (solo números).
//   'valencia': la capilla del Santo Cáliz de la catedral de Valencia: la bóveda de crucería con su clave dorada, el
//     retablo de alabastro con sus hornacinas y figuritas en relieve, las rejas, la vitrina con la copa de ágata roja con
//     asas de oro y perlas en el centro, velas, el haz de luz de una vidriera con motas, losas de mármol y visitantes
//     pequeños; el frente del altar lo pinta grialDelante. o.camara 'caliz': la copa de cerca en su vitrina sobre
//     terciopelo, con la luz que la atraviesa (reflejo rojo que se mueve en el paño) y los reflejos del cristal que pasan.
// Devuelve { suelo, pies:[x…], … } con las posiciones de cada encuadre.
export function grial(R, t, o = {}) {
  const enc = o.encuadre ?? 'scriptorium', cam = o.camara ?? 'general';
  if (enc === 'castillo') return cam === 'altar' ? c_altarGrial(R, t, o) : c_castillo(R, t, o);
  if (enc === 'mostrador') return c_mostrador(R, t, o, cam === 'cerca');
  if (enc === 'valencia') return cam === 'caliz' ? c_caliz(R, t, o) : c_capilla(R, t, o);
  return cam === 'hoja' ? c_hoja(R, t, o) : c_scriptorium(R, t, o);
}
// ── F · Rennes-le-Château ───────────────────────────────────────────────────────────────────────────────────────────
// El pueblecito en su colina del sur de Francia (Aude), 1885–hoy. Lo fijo de cada encuadre va en búferes de R.nuevo()
// (d_capaRq); en cada fotograma se mueven las nubes de tres tonos a tres velocidades, los pájaros, el humo, la gente
// pequeña de fondo y la hierba. o.encuadre:
//   'colina' (por omisión): el pueblo en lo alto de su colina (casas de piedra con teja, la iglesia con su torre de
//     tejado de pizarra), el camino en zigzag que sube, los Pirineos nevados al fondo, la garriga con cipreses y un
//     pastor con sus ovejas en la ladera, y abajo el camino de tierra con roderas, la cruz de piedra y el murete (pies
//     en y 170). o.anyo 1885 (pobre: sin la villa, una choza en ruinas) o 1905 (por omisión: la villa Betania, el
//     jardín, el mirador y la torre Magdala); o.agujeros (0–1): el pueblo como un queso, con hoyos y montones de tierra
//     en la ladera, palas clavadas y gente diminuta cavando, y en primer plano un hoyo grande (devuelve hoyo [x, y, w]:
//     la escena saca de ahí al buscador y pinta delante el labio con d_bordeHoyo) y el cartel de la pala tachada
//     (d_cartelPala; o.cartel: false para que lo pinte la escena, que lo hace caer). o.camara 'general' o 'iglesia':
//     la fachada de la iglesia de cerca (portada de arco con dovelas, tímpano, la hornacina con su santa, las puertas
//     con clavos, la campana que se mueve), la casa de al lado con postigos, la puerta del cementerio, el plátano que
//     da sombra, palomas que picotean y un gato; pies en y 166, la puerta en x 138–162.
//   'villa': la villa Betania vista desde el jardín (dos plantas, balcón, persianas), el estanque con su fuente, los
//     parterres, el invernadero de cristal, el mirador con balaustrada que lleva a la torre Magdala, los Pirineos;
//     pies en y 166. o.hotel (los años cincuenta): toldos, mesas con sombrillas a rayas, el rótulo de la cama y las
//     estrellas, un coche de la época y el autobús de turistas que llega por la carretera de detrás (o.bus 0–1: su
//     avance; 1 = parado ante la puerta). o.camara 'general' o 'torre': la torre Magdala de cerca con sus almenas y su
//     torrecilla, el paseo del mirador (pies en y 160) y el valle abierto a la izquierda.
//   'despacho': el despacho del cura hacia 1900: zócalo de madera, papel pintado, la ventana con el campo (nubes que
//     pasan, recortadas a su hueco), el crucifijo, el reloj de péndulo, la estantería, la mesa con montañas de sobres
//     (o.sobres 0–1, por omisión 1), la saca de correo desbordada y montones en el suelo, la lámpara de aceite que
//     tiembla; pies en y 172 delante de la mesa (x 96–204). o.camara 'general' o 'mesa': la mesa de cerca (inserto):
//     pergaminos con renglones de trazos, la taza de té que humea, la tetera, el tintero con la pluma, el lacre;
//     o.manchas (0–1): las manchas de té que crecen sobre los pergaminos.
//   'libreria': una librería de 1982–2003: estanterías de lomos de colores (sin letras), la mesa con montañas del libro
//     del cáliz, la caja (mostrador x 6–70), el escaparate a la calle con la gente que pasa y la cola de fuera (recortadas); pies
//     en y 170.
//     o.camara 'general' o 'cine': la calle de noche con la marquesina del cine (bombillas que corren, rótulo de
//     barras), los carteles del cáliz, la gente que se mueve tras las puertas de cristal y el asfalto mojado; pies en y 168.
// Devuelve { suelo, … } con lo que necesita cada encuadre (puerta, mesa, hoyo, cartel, bus, ventana…).
export function rennes(R, t, o = {}) {
  const en = o.encuadre ?? 'colina', cam = o.camara ?? 'general';
  if (en === 'villa') return cam === 'torre' ? d_rnTorre(R, t, o) : d_rnVilla(R, t, o);
  if (en === 'despacho') return cam === 'mesa' ? d_rnMesa(R, t, o) : d_rnDespacho(R, t, o);
  if (en === 'libreria') return cam === 'cine' ? d_rnCine(R, t, o) : d_rnLibreria(R, t, o);
  return cam === 'iglesia' ? d_rnIglesia(R, t, o) : d_rnColina(R, t, o);
}
// ── G · El desierto y el taller ─────────────────────────────────────────────────────────────────────────────────────
// El rollo de cobre (1952–hoy). Lo fijo va en búferes de R.nuevo(); en cada fotograma se mueven las nubes, los pájaros,
// las lámparas, el agua, la lluvia, la sierra, el polvo y la gente pequeña de fondo. o.encuadre:
//   'qumran' (por omisión): los acantilados de marga de Qumrán al atardecer, con sus estratos, cárcavas y las bocas de
//     las cuevas (la cueva 3 a la izquierda, a pie de cornisa, x 26–66, por donde salen los personajes), la cornisa de
//     cascajo (pies en y 160, x 0–200), la llanura con las ruinas de Qumrán y la tienda de la excavación, el mar Muerto
//     turquesa que destella y los montes de Moab rosados al fondo; arqueólogos diminutos con lámparas que bajan por la
//     senda, cuervos que planean. o.camara 'general' o 'cueva': dentro de la cueva 3 (roca en estratos, la boca a la
//     derecha con el desierto y el mar, el haz de luz con polvo, piedras caídas, tinajas rotas, la lámpara que tiembla,
//     un murciélago) y el rollo de cobre partido en dos en el suelo (o.rollo: false para que lo pinte la escena con
//     rollo()); pies en y 162.
//   'taller': el taller de ingeniería de Manchester en 1955–1956: ladrillo ennegrecido, ventanales de fábrica con lluvia,
//     cerchas, lámparas de pantalla verde, el torno con su correa del eje de transmisión, el banco de la sierra fina en
//     el centro (la sierra gira; x 130–200, tablero en y 130), el tablero de herramientas, el banco con el tornillo, la
//     tetera que humea en su hornillo, el reloj; la mesa del tapete (x 214–306, y 134) con las tiras ya cortadas
//     (o.cortes 0–23); pies en y 168. o.camara 'general' o 'sierra' (inserto): el disco grande y finísimo de frente
//     (centro 168, 104), con dientes que corren y el brillo que gira, el protector verde, el rollo puesto de punta en sus
//     mordazas de bronce (la espiral, centro 168, 128) con la ranura del corte, virutas y chispas finas, la lupa que
//     aumenta los dientes, la bandeja con las tiras cortadas y el taller desenfocado detrás (o.corte 0–1: hondura del
//     corte; o.gira: false para el disco).
//   'tiras': las 23 tiras sobre un tapete verde, vistas desde arriba, en tres filas, con renglones de trazos grabados (sin
//     letras), lingotes y monedas dibujados en el margen, una regla y una libreta con cifras; o.griegas (0–1): aparecen
//     letras griegas sueltas como símbolos dorados que brillan; o.monton (0–1): una montaña de lingotes y vasijas que
//     crece desde abajo hasta llenar el plano. o.camara 'general' o 'lupa': tres tiras de cerca y la lupa sobre un
//     renglón, con el símbolo dorado y un «?» cuando o.griegas > 0.5.
//   'museo': el museo de Amán: la sala de piedra caliza en penumbra, la vitrina central iluminada con las tiras
//     (x 104–216, tapa de cristal y 112–128, pies delante en y 172), las vitrinas laterales con tinajas y lámparas de
//     barro, los focos con su polvo, la puerta del fondo a la ciudadela al sol (columnas, gente pequeña que pasa) y la
//     silla del vigilante. o.camara 'general' o 'vitrina': la vitrina de cerca con el cristal (x 30–290, y 64–160) y sus
//     reflejos que barren, las tiras en sus atriles y las cartelas de barras; pies delante en y 178.
//   'escalones': un desierto de ruinas al sol con escalones de piedra en todas direcciones (suben a nada, bajan a la
//     tierra, rodean un pilar, van hacia el este y hacia el oeste), dunas, un camello que pasa, buitres, la calima que
//     tiembla, arena que vuela y una lagartija; pies en y 164, sitio libre en x 120–190. o.camara 'general' o 'cerca': de
//     cerca, tres tramos grandes alrededor (sube a un arco, baja a una boca oscura, peldaños al frente); pies en y 168.
// Devuelve { suelo, … } con lo que necesita cada encuadre (cueva, rollo, banco, sierra, tiras, vitrina, cristal…).
export function desierto(R, t, o = {}) {
  const en = o.encuadre ?? 'qumran', cam = o.camara ?? 'general';
  if (en === 'taller') return cam === 'sierra' ? d_dsSierra(R, t, o) : d_dsTaller(R, t, o);
  if (en === 'tiras') return cam === 'lupa' ? d_dsLupa(R, t, o) : d_dsTiras(R, t, o);
  if (en === 'museo') return cam === 'vitrina' ? d_dsVitrina(R, t, o) : d_dsMuseo(R, t, o);
  if (en === 'escalones') return d_dsEscalones(R, t, o, cam === 'cerca');
  return cam === 'cueva' ? d_dsCueva(R, t, o) : d_dsQumran(R, t, o);
}
// ── H · Hoy ──────────────────────────────────────────────────────────────────────────────────────────────────────────
// Los buscadores de hoy. o.encuadre:
//   'campo': un campo de Francia junto a un castillo en ruinas (la torre del homenaje con almenas, ventanal roto y
//     saeteras, la muralla con su puerta en arco, el cubo desmochado, la hiedra, los escombros), el bocage, el pueblo con
//     su campanario y los chopos al fondo, el prado con amapolas y la senda que sube a la puerta; la mochila y la pala del
//     buscador. Vida: nubes, avión con su estela, cuervos alrededor de la torre, un tractor que ara a lo lejos, ovejas,
//     mariposas y la hierba que mece el viento a ráfagas. o.camara 'general' o 'suelo' (de cerca y a ras de suelo: el pie
//     de la muralla con la hiedra y un cuervo que salta; la tierra cortada como en un dibujo de excavación, con raíces,
//     piedras, el cimiento enterrado, una lombriz, hormigas y cosas que no son tesoros; el hoyo, el montón de tierra y la
//     pala; o.lata (0–1): la lata sube del fondo del hoyo hasta el borde).
//   'mesa': el cuarto del buscador de noche: la estantería con libros, un globo, un catalejo, un ánfora y el gato que duerme
//     encima; el tablero de corcho con el mapa, las fotos y los hilos rojos; la ventana (ramas que se mecen, luna,
//     estrellas, un murciélago); el reloj de péndulo; la mesa con el mapa extendido, la lupa, la brújula, los libros, la
//     taza que humea y la lámpara de banquero; el detector apoyado en la mesa (o.detector false lo quita; o.pita lo hace
//     pitar). o.camara 'general' o 'mapa' (el mapa de cerca, visto desde arriba sobre la mesa: costa, montes, río, la
//     rosa de los vientos, un barquito, la senda de puntos y tres marcas: una cruz templaria, una copa y un rollo de
//     metal; o.marcas (0–3, con decimales: cada marca aparece y su círculo de tinta se dibuja), o.preguntas (0–1: un «?»
//     que flota sobre cada marca); alrededor la lupa, la brújula con la aguja que tiembla, la taza que humea, el lápiz,
//     fotos y monedas; una mariquita que cruza el mapa).
//   'rocosas': las montañas Rocosas: picos de granito con nieve, laderas de pinos en tres términos, una cascada, el río
//     frío que cruza el valle con sus piedras, la fuente termal (poza turquesa con terrazas de minerales naranjas, vapor
//     que sube y el reguero caliente que llega al río), un ciervo que bebe, un halcón, y el sendero del primer término con
//     piedras, raíces y un pino grande que se mece; o.luz 'dia' (por omisión) o 'atardecer' (sol bajo tras los picos y luz
//     cálida). o.camara 'general' o 'rocas' (de cerca: el montón de bolos de granito con liquen y grietas, el hueco en
//     sombra donde está el cofre de bronce, el arroyo caliente que humea, el bosque detrás, una ardilla que se asoma y
//     un arrendajo; o.cofre (0–1): el hueco se ilumina un poco, para cuando aparece el cofre).
//   'escalon': un atardecer en el campo: los restos de una escalera de piedra vieja (cuatro escalones con musgo, grietas y
//     hierba entre las juntas) que sube hacia un muro roto con medio arco, su sombra larga, colinas a contraluz, una
//     granja lejana con la ventana encendida, golondrinas y luciérnagas; o.camara 'general' o 'cerca' (más cerca y más
//     bajo: dos escalones grandes, el sol enorme en el horizonte, la valla, un árbol solo, un caracol que sube el escalón).
//   'tienda': una tienda de barrio de hoy: el mostrador con la caja y el datáfono (sin marcas), el cartel de pagar con
//     tarjeta (pictograma), estantes llenos de productos, la nevera de bebidas, la cafetera que humea, la puerta de
//     cristal con la calle detrás (coches y gente que pasan, recortados al hueco), un cliente de fondo; o.camara 'general'
//     o 'cerca' (el datáfono de cerca sobre el mostrador, con la tienda desenfocada detrás: o.importe (número, por
//     omisión 12), o.pago (0–1: de la cifra a la palomita verde con las ondas sin contacto; sale el tique)).
//     En 'general', el que cobra se planta detrás del mostrador (pies en y 146) y luego se pinta T.e_mostrador(R, t)
//     para que el mostrador le tape las piernas.
// Devuelve { suelo, pies:[x…], … } con los sitios de cada encuadre (ver la geometría que entrega el decorado).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'campo', cam = o.camara ?? 'general';
  if (enc === 'mesa') return cam === 'mapa' ? e_mapa(R, t, o) : e_estudio(R, t, o);
  if (enc === 'rocosas') return cam === 'rocas' ? e_rocas(R, t, o) : e_rocosas(R, t, o);
  if (enc === 'escalon') return e_escalon(R, t, o);
  if (enc === 'tienda') return cam === 'cerca' ? e_caja(R, t, o) : e_tienda(R, t, o);
  return cam === 'suelo' ? e_suelo(R, t, o) : e_campo(R, t, o);
}
// ── Piezas de los gags (se pintan encima del decorado) ──────────────────────────────────────────────────────────────
// El detector de metales del buscador (la pieza del hilo de gags), en sus manos o en el suelo. (x, y) es el puño: la mano
// del personaje (R.actor(EL.buscador, x, suelo, t, { sostiene: [x + 15, suelo - 12] }).mano). De ahí sale hacia atrás el
// brazalete del antebrazo y hacia delante y abajo la vara de aluminio con el cable enrollado, hasta el plato que roza el
// suelo; bajo el puño, la caja de mando con su luz y su aguja. o.dir (1 hacia la derecha); o.suelo (la y del suelo, por
// omisión y + 16); o.largo (lo que se adelanta el plato, 20); o.barre (0–1: el plato barre de lado a lado); o.pita (0–1:
// ondas que salen del plato, la luz roja que parpadea, la aguja que se dispara y las rayitas del pitido junto a la caja);
// o.tumbado (en el suelo, de lado: (x, y) es el puño apoyado en el suelo). Devuelve { disco: [x, y], caja: [x, y] }.
export function detector(R, x, y, t, o = {}) {
  const { pset, linea, rect } = R, P = e_P, d = o.dir ?? 1, p = Math.max(0, Math.min(1, o.pita ?? 0));
  x = Math.round(x); y = Math.round(y);
  let dx, dy;
  if (o.tumbado) { dx = x + d * 24; dy = y; }
  else { const sy = o.suelo ?? y + 16, s = (o.barre ?? 0) * Math.sin(t * 3.2) * 7; dx = Math.round(x + d * ((o.largo ?? 20) + s)); dy = Math.max(y + 5, sy - 2); }
  // el brazalete del antebrazo y el tramo de arriba de la vara
  const bx = x - d * (o.tumbado ? 7 : 5), by = o.tumbado ? y : y - 4;
  linea(bx, by, x, y, P.dk); linea(bx, by + 1, x, y + 1, P.dg);
  rect(Math.min(bx, bx - d * 2), by - 2, Math.max(bx, bx - d * 2), by - 1, P.dk); pset(bx - d * 2, by, P.dk); pset(bx, by - 2, P.dg);
  // la vara: aluminio con su brillo, el tramo de abajo negro y el cable enrollado
  const n = Math.max(1, Math.round(Math.hypot(dx - x, dy - y)));
  for (let i = 0; i <= n; i++) { const u = i / n, px = Math.round(x + (dx - x) * u), py = Math.round(y + (dy - y) * u) - (u > 0.97 ? 1 : 0);
    if (u < 0.62) { pset(px, py, P.dm); pset(px, py + 1, P.dmS); if (i % 5 === 0) pset(px, py, P.dmL); } else { pset(px, py, P.dk); pset(px, py + 1, P.dg); }
    if (u > 0.08 && u < 0.92 && i % 3 === 0) pset(px + (i % 6 ? 0 : d), py - 1, P.dk); }
  // la caja de mando bajo el puño: la luz (verde; roja y parpadeando cuando pita) y la aguja
  const cx = x + d * 2, cy = y + 2;
  rect(cx - 3, cy - 1, cx + 3, cy + 2, P.dk); rect(cx - 2, cy, cx + 2, cy + 1, P.dcaja); rect(cx - 2, cy, cx + 2, cy, P.dcajaL);
  const parpa = p > 0 && Math.floor(t * (6 + p * 10)) % 2 === 0;
  pset(cx + d * 2, cy, parpa ? C.rojo : p > 0 ? hex('#ff8a70') : hex('#7aff8a')); pset(cx - d * 1, cy + 1, C.k);
  { const a = p > 0 ? 0.3 + p * 0.6 + Math.sin(t * 30) * 0.15 * p : 0.15; pset(cx - d * 2 + Math.round(Math.cos(Math.PI * (1 - a)) * 1), cy, P.dk); }
  // el puño de goma
  rect(x - 1, y - 1, x + 1, y, P.dk);
  // el plato: una elipse negra con el aro amarillo de la bobina y su brillo
  const w = 7, hh = 2;
  for (let j = -hh; j <= hh; j++) for (let i = -w; i <= w; i++) { const e = (i / (w + 0.5)) ** 2 + (j / (hh + 0.5)) ** 2; if (e > 1) continue; pset(dx + i, dy + j, e > 0.62 ? (j > 0 ? P.dplatoL : P.dk) : j < 0 ? P.dg : P.dplato); }
  pset(dx - d * 4, dy - 1, P.dmL);
  if (p > 0) {
    // las ondas: arcos que salen del plato y se deshacen
    for (let k = 0; k < 3; k++) { const u = (t * (1.2 + p) + k / 3) % 1, r = 4 + u * (10 + p * 10);
      for (let a = 0; a <= 40; a++) { const an = Math.PI * (a / 40), qx = Math.round(dx + Math.cos(an) * r * 1.3), qy = Math.round(dy - 1 - Math.sin(an) * r * 0.75); if (e_um(qx, qy) < (1 - u) * (0.5 + p * 0.6)) pset(qx, qy, u < 0.4 ? P.onda : P.ondaS); } }
    // el pitido junto a la caja: dos rayitas que salen y vuelven
    if (parpa) for (let k = 1; k <= 2; k++) { const ex = cx + d * (4 + k * 2); linea(ex, cy - 2 - k, ex + d, cy - 3 - k, P.onda); linea(ex + d, cy + 1, ex + d * 2, cy + 1, P.onda); }
  }
  return { disco: [dx, dy], caja: [cx, cy] };
}
// Un cofre de tesoro, centrado en x con la base en y. De madera (tablas con vetas, flejes de hierro remachados, cantoneras
// y la cerradura con su bocallave) o de bronce con o.bronce (el cofre de Fenn: bronce dorado con pátina verde, arquerías
// en relieve, asas y patitas). La tapa es abombada y gira hacia atrás con o.abre (0–1): se ve el forro de la tapa y la boca.
// o.brillo (0–1): dentro, monedas y joyas que destellan y un resplandor dorado. o.vacio: casi vacío (fondo oscuro, dos o
// tres monedas y una telaraña). o.s: escala (1 = 18 × 15 px con la tapa cerrada). o.k: semilla (varía vetas y monedas).
// Devuelve { x, y, tapa: [x, y] (lo alto de la tapa), boca: [x0, y0, x1, y1] (el hueco abierto), ancho, alto }.
export function cofre(R, x, y, t, o = {}) {
  const { pset, rect, linea } = R, s = o.s ?? 1, abre = Math.max(0, Math.min(1, o.abre ?? 0)), k = o.k ?? 0, br = o.bronce;
  const w = Math.round(9 * s), hb = Math.round(10 * s), lt = Math.max(3, Math.round(5 * s)), x0 = Math.round(x - w), x1 = Math.round(x + w), yT = Math.round(y - hb);
  const MAT = br ? a_r(['#2a1e10', '#4a361a', '#6e5226', '#947034', '#b89048', '#d8b468', '#f0d898']) : A_MADERA;
  const FL = br ? a_r(['#1e2a22', '#2e4a3a', '#4a7a62', '#6aa888', '#9ad0b0']) : A_HIERRO;
  const tono = (xx, yy, v) => R.tone(MAT, v, xx, yy);
  // la sombra en el suelo
  for (let xx = x0 - 2; xx <= x1 + 3; xx++) { pset(xx, y + 1, hex('#1a1418')); if (xx > x0 && xx < x1 + 2) pset(xx, y + 2, hex('#2a2228')); }
  // el cuerpo
  for (let yy = yT; yy <= y; yy++) for (let xx = x0; xx <= x1; xx++) {
    const u = (xx - x0) / (x1 - x0);
    let v = 3.4 - u * 1.6 + (yy === yT ? 1 : 0) + (yy === y ? -1.4 : 0);
    if (br) { const ar = Math.floor((xx - x0) / Math.max(4, 5 * s)), lx = (xx - x0) % Math.max(4, Math.round(5 * s)), ly = yy - yT; const arco = ly > 2 * s && ly < hb - 2 * s && (lx === 0 || ly === Math.round(3 * s) && lx > 0); v += arco ? -1.2 : (lx === 1 ? 0.6 : 0); if (h(xx, yy, 40 + k) < 0.07) { pset(xx, yy, FL[3]); continue; } }
    else { const tabla = Math.floor((yy - yT) / Math.max(3, Math.round(3.4 * s))); if ((yy - yT) % Math.max(3, Math.round(3.4 * s)) === 0 && yy > yT) v -= 1.4; v += (h(tabla, k, 41) - 0.5) * 0.8 + (R.vnoise(xx * 0.35 / s + tabla * 3, yy * 0.15) - 0.5) * 1.1; }
    pset(xx, yy, tono(xx, yy, v));
  }
  // flejes, cantoneras y remaches
  const flejes = br ? [x0, x1] : [x0 + Math.round(2 * s), x1 - Math.round(2 * s), Math.round(x)];
  for (const fx of flejes) { const fw = Math.max(1, Math.round(s * (br ? 1.2 : 0.5))); for (let yy = yT; yy <= y; yy++) for (let i = -fw; i <= fw; i++) pset(fx + i, yy, R.tone(FL, 2.6 - i * 0.6 + (yy === yT ? 1 : 0), fx + i, yy)); if (!br) for (let yy = yT + 2; yy < y; yy += Math.max(2, Math.round(3 * s))) { pset(fx, yy, FL[4]); pset(fx + 1, yy + 1, FL[0]); } }
  if (br) { for (const fy of [yT, y - 1]) { rect(x0, fy, x1, fy + Math.max(0, Math.round(s * 0.6)), MAT[5]); } for (const fx of [x0 - 1, x1 + 1]) { rect(fx, Math.round(yT + hb * 0.35), fx, Math.round(yT + hb * 0.6), MAT[2]); pset(fx, Math.round(yT + hb * 0.35), MAT[6]); } rect(x0 + 1, y + 1, x0 + Math.round(2 * s), y + 1, MAT[1]); rect(x1 - Math.round(2 * s), y + 1, x1 - 1, y + 1, MAT[1]); }
  // la cerradura
  { const cw = Math.max(2, Math.round(2.4 * s)), cy = yT + Math.max(1, Math.round(1 * s)); const ch = Math.round(3.6 * s), X = Math.round(x); for (let yy = cy; yy <= cy + ch; yy++) for (let xx = X - cw; xx <= X + cw; xx++) pset(xx, yy, xx === X - cw || yy === cy ? (br ? hex('#fff0c0') : FL[4]) : xx === X + cw || yy === cy + ch ? (br ? MAT[2] : FL[0]) : (br ? MAT[5] : FL[3])); if (s > 1.5) for (const [dx, dy] of [[-cw + 1, 1], [cw - 1, 1], [-cw + 1, ch - 1], [cw - 1, ch - 1]]) pset(X + dx, cy + dy, br ? MAT[6] : FL[4]); pset(Math.round(x), cy + Math.round(1.6 * s), FL[0]); if (s > 1.5) pset(Math.round(x), cy + Math.round(1.6 * s) + 1, FL[0]); }
  // la tapa: cerrada (abombada) o girando hacia atrás
  const m = Math.round(4 * s * abre), boca = [x0 + 1, yT - m, x1 - 1, yT];
  if (abre < 0.04) {
    for (let yy = yT - lt; yy < yT; yy++) { const e = (yy - (yT - lt)) / lt, ww = Math.round(w - (1 - Math.sqrt(Math.max(0, e))) * w * 0.12); for (let xx = Math.round(x - ww); xx <= Math.round(x + ww); xx++) { let v = 3.6 - (xx - x0) / (x1 - x0) * 1.6 + (1 - e) * 1.4; if (!br && (xx - x0) % Math.max(3, Math.round(4 * s)) === 0) v -= 0.9; pset(xx, yy, tono(xx, yy, v)); } }
    for (const fx of flejes) for (let yy = yT - lt; yy < yT; yy++) pset(fx, yy, FL[3]);
    rect(x0, yT - 1, x1, yT - 1, MAT[1]);
  } else {
    // la boca: el interior visto desde arriba
    for (let yy = yT - m; yy <= yT; yy++) for (let xx = x0 + 1; xx <= x1 - 1; xx++) pset(xx, yy, yy === yT - m || xx === x0 + 1 || xx === x1 - 1 ? MAT[4] : hex(o.vacio ? '#140e0a' : '#2a1a0e'));
    // el contenido
    if (o.vacio) {
      for (let j = 0; j < 3; j++) { const cx = Math.round(x0 + 3 * s + h(j, k, 42) * (2 * w - 6 * s)), cy = Math.round(yT - m * 0.3 - h(j, k, 43) * m * 0.4); pset(cx, cy, hex('#c8962a')); pset(cx + 1, cy, hex('#f0c850')); }
      if (m > 3) { linea(x0 + 2, yT - m + 1, x0 + 2 + Math.round(4 * s), yT - 1, hex('#8a8a98')); linea(x0 + 2, yT - 1, x0 + 2 + Math.round(3 * s), yT - m + 1, hex('#8a8a98')); pset(x0 + 2 + Math.round(2 * s), yT - Math.round(m / 2), hex('#c0c0cc')); }
    } else {
      const lleno = Math.round(m + 2 * s * (o.brillo ?? 0.6));
      for (let yy = yT - lleno; yy <= yT; yy++) for (let xx = x0 + 2; xx <= x1 - 2; xx++) { const lomo = Math.sin((xx - x0) / (x1 - x0) * Math.PI) * 2 * s; if (yy < yT - m + 1 - lomo) continue; const c = h(xx >> 1, yy, 44 + k); pset(xx, yy, c < 0.12 ? hex('#fff6c0') : c < 0.5 ? hex('#f0c040') : c < 0.85 ? hex('#c8902a') : hex('#8a5a1a')); }
      for (let j = 0; j < 3; j++) { const jx = Math.round(x0 + 3 * s + h(j, k, 45) * (2 * w - 6 * s)), jy = Math.round(yT - m - h(j, k, 46) * s * 1.5); const c = [hex('#e83a4a'), hex('#3ac86a'), hex('#4a8ae8')][j]; pset(jx, jy, c); pset(jx + 1, jy, c); pset(jx, jy - 1, a_mez(c, 0xffffffff, 0.5)); }
    }
    // la tapa vista por dentro (el forro), que sube detrás de la boca
    const L = Math.round((lt + 4 * s) * abre), yb = yT - m;
    for (let yy = yb - L; yy < yb; yy++) { const e = (yb - yy) / Math.max(1, L), ins = Math.round(e * s * 1.5);
      for (let xx = x0 + ins; xx <= x1 - ins; xx++) { let v = 3.4 + e * 0.8 - (xx - x0) / (x1 - x0) * 1.2 + (xx === x0 + ins ? 0.8 : xx === x1 - ins ? -1 : 0); if (!br && (yy - yb + 400) % Math.max(3, Math.round(3.4 * s)) === 0) v -= 1.2; pset(xx, yy, tono(xx, yy, v)); }
      for (const fx of flejes) { const f2 = fx < x ? fx + ins : fx > x ? fx - ins : fx; pset(f2, yy, FL[2]); } }
    if (L > 0) { const ins = Math.round(s * 1.5); rect(x0 + ins, yb - L, x1 - ins, yb - L, MAT[6]); rect(x0, yb, x1, yb, MAT[1]); }
    if (!o.vacio && (o.brillo ?? 0) > 0) {
      a_brillo(R, x, yT - m, 12 * s, hex('#ffe08a'), 0.5 * (o.brillo ?? 0));
      for (let j = 0; j < 4; j++) { const f = Math.sin(t * 3 + j * 1.9 + k); if (f < 0.55) continue; const sx = Math.round(x0 + 3 * s + h(j, k, 47) * (2 * w - 6 * s)), sy = Math.round(yT - m - h(j, k, 48) * 3 * s), r = f > 0.85 ? 2 : 1;
        pset(sx, sy, hex('#ffffff')); for (let i = 1; i <= r; i++) { pset(sx - i, sy, hex('#fff6c0')); pset(sx + i, sy, hex('#fff6c0')); pset(sx, sy - i, hex('#fff6c0')); pset(sx, sy + i, hex('#fff6c0')); } }
    }
  }
  return { x, y, tapa: [x, abre < 0.04 ? yT - lt : yT - m - Math.round((lt + 7 * s) * abre)], boca, ancho: x1 - x0 + 1, alto: y - (yT - lt) };
}
// El rollo de cobre (la pieza de los gags, se pinta encima del decorado). o.estado 'enrollado' (por omisión): los dos
// trozos verdosos y quebradizos, tumbados, cada uno con su espiral en un extremo, la pátina de cardenillo con manchas de
// cobre, grietas y el borde roto por donde se partió (o.uno: un solo rollo entero, el que va en el carro de la sierra);
// o.trocito (0–1): un trocito que se desprende del trozo de la izquierda, cae y rebota en el suelo. 'tira': una tira
// plana con renglones de trazos grabados (sin letras). o.carta: en vez del rollo, una carta sellada (pergamino doblado
// con el sello rojo de lacre). o.s: escala (1 = un trozo de 18 × 9 px). x, y: el centro sobre el suelo.
// Devuelve { x, y, piezas: [[x, y], …], trocito: [x, y] | null }.
export function rollo(R, x, y, t, o = {}) {
  const s = o.s ?? 1, { pset } = R;
  x = Math.round(x); y = Math.round(y);
  if (o.carta) {
    const w = Math.round(16 * s), a = Math.round(11 * s), x0 = x - (w >> 1), y0 = y - a;
    R.rect(x0 + 1, y0 + 1, x0 + w + 1, y0 + a + 1, d_mezclaRq(R.pget(x0 + w + 1, y0 + a + 1) || C.k, C.k, 0.4));
    for (let j = 0; j <= a; j++) for (let i = 0; i <= w; i++) { const borde = i === 0 || j === 0 || i === w || j === a; pset(x0 + i, y0 + j, borde ? hex('#a08a5a') : h(i >> 1, j >> 1, 1190) < 0.15 ? hex('#d8c490') : hex('#ecdcb0')); }
    R.linea(x0, y0, x + 0, y0 + Math.round(a * 0.55), hex('#b8a070')); R.linea(x0 + w, y0, x, y0 + Math.round(a * 0.55), hex('#b8a070'));
    const r = Math.max(2, Math.round(2.6 * s)); R.disco(x, y0 + Math.round(a * 0.55) + 1, r + 1, hex('#6a1a1e')); R.disco(x, y0 + Math.round(a * 0.55), r, C.cera ?? hex('#a8303a')); R.disco(x - 0.6, y0 + Math.round(a * 0.55) - 0.6, r * 0.45, hex('#d85a5a'));
    for (let k = 0; k < 3; k++) R.pset(x - 1 + k, y0 + Math.round(a * 0.55) + r + 1 + (k & 1), hex('#8a2228'));
    return { x, y, piezas: [[x, y0]], trocito: null };
  }
  if (o.estado === 'tira') {
    const w = Math.round(30 * s), a = Math.round(8 * s), x0 = x - (w >> 1), y0 = y - a;
    for (let j = 0; j <= a; j++) for (let i = 0; i <= w; i++) { const borde = i === 0 || j === 0 || i === w || j === a, q = h((x0 + i) >> 1, (y0 + j) >> 1, 1191); if (borde && h(i, j, 1192) < 0.3) continue;
      pset(x0 + i, y0 + j, borde ? hex('#2e5a4e') : q < 0.1 ? hex('#c87a3a') : q < 0.35 ? hex('#4a8a78') : q > 0.9 ? hex('#8ad0b0') : hex('#5aa890')); }
    for (let j = 2; j < a - 1; j += Math.max(2, Math.round(2 * s))) { let i = 2; while (i < w - 2) { const L = 1 + Math.floor(h(i, j, 1193) * 3); for (let u = 0; u < L; u++) pset(x0 + i + u, y0 + j, hex('#1e3a34')); i += L + 1; } }
    R.rect(x0 + 1, y + 1, x0 + w + 1, y + 1, d_mezclaRq(R.pget(x0 + 2, y + 1) || C.k, C.k, 0.4));
    return { x, y, piezas: [[x, y0]], trocito: null };
  }
  // un trozo enrollado tumbado: cilindro de L × 2r, con la espiral en el extremo del lado `esp` y el borde roto en el otro
  const trozo = (cx, cy, L, r, esp, k) => {
    for (let i = -2; i <= L + 2; i++) { const xx = cx - (L >> 1) + i, sw = Math.round(r * 1.1); for (let j = 0; j < 2; j++) { const p = R.pget(xx, cy + 1 + j); if (p) pset(xx, cy + 1 + j, d_mezclaRq(p, C.k, 0.35)); } if (i > L || i < 0) continue; }
    for (let i = 0; i <= L; i++) { const roto = esp > 0 ? i < 3 : i > L - 3, xx = cx - (L >> 1) + i;
      for (let j = -r; j <= r; j++) { if (roto && h(i, j, 1194 + k) < 0.45 + Math.abs(j) / (r * 3)) continue; const yy = cy - r + (j + r), e = Math.abs(j) / r, q = h(xx >> (s > 1.2 ? 1 : 0), yy >> (s > 1.2 ? 1 : 0), 1195 + k);
        let c = j < -r * 0.45 ? hex('#8ad0b0') : j < r * 0.2 ? hex('#5aa890') : j < r * 0.7 ? hex('#3a7a68') : hex('#24524a');
        if (q < 0.1) c = hex('#c87a3a'); else if (q < 0.15) c = hex('#8a4a24'); else if (q > 0.95) c = hex('#e0f4e4');
        if ((Math.abs(i * 7 - j * 3 + k * 5) % 23) === 0 && i > 2 && i < L - 2) c = hex('#1e3a34');   // grietas
        if (e > 0.92) c = hex('#1e3a34'); pset(xx, yy - r, c); } }
    const ex = esp > 0 ? cx + (L >> 1) : cx - (L >> 1), ry = r, rx = Math.max(2, Math.round(r * 0.45));
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = Math.hypot(i / rx, j / ry); if (d > 1) continue; const anillo = Math.round(d * r * 1.1 + Math.atan2(j, i) / Math.PI * 0.8) % 2;
      pset(ex + i, cy - r + j, d > 0.88 ? hex('#1e3a34') : anillo ? hex('#2e5a4e') : (d < 0.3 ? hex('#1c1222') : hex('#6ab89a'))); }
    return [cx, cy - 2 * r];
  };
  const r = Math.max(3, Math.round(4.5 * s)), L = Math.round(18 * s);
  const piezas = [];
  if (o.uno) piezas.push(trozo(x, y, Math.round(L * 1.8), r, 1, 0));
  else { piezas.push(trozo(x - Math.round(L * 0.62), y, L, r, -1, 0)); piezas.push(trozo(x + Math.round(L * 0.62), y - Math.round(s), L - Math.round(2 * s), r, 1, 3)); }
  // el trocito que se desprende, cae y rebota
  let troc = null;
  if (o.trocito != null && o.trocito > 0) { const u = Math.min(1, o.trocito), x0 = x - Math.round(L * 0.5), y0 = y - 2 * r, xf = x0 - Math.round(10 * s), cae = Math.min(1, u * 1.6), reb = u > 0.62 ? Math.sin((u - 0.62) / 0.38 * Math.PI) * 3 * s : 0;
    const tx = Math.round(lerp(x0, xf, u)), ty = Math.round(lerp(y0, y - 1, cae * cae) - reb); troc = [tx, ty];
    R.rect(tx - 1, ty - 1, tx + Math.round(s), ty, hex('#5aa890')); pset(tx, ty - 1, hex('#8ad0b0')); pset(tx + Math.round(s), ty, hex('#1e3a34'));
    if (u > 0.6 && u < 0.9) for (let k = 0; k < 4; k++) pset(tx - 3 + k * 2, y + 1 - (k % 2), hex('#c8b890')); }
  return { x, y, piezas, trocito: troc };
}
// Una copa (x, y: el centro del pie, abajo; mide 12·s de alto y unos 11·s de ancho). o.tipo 'agata' (la de Valencia:
// cuenco de ágata roja con vetas, tallo y nudo de oro con esmeraldas, asas de oro y pie de ágata con su cerco de perlas),
// 'oro' (cáliz de oro con su nudo), 'plata', 'madera' (vaso torneado con vetas), 'barro' (cuenco de barro con su franja
// pintada) o 'cristal' (transparente: deja ver lo de detrás, con sus brillos). o.s: tamaño entero (1–5). o.brillo (0–1):
// un halo y destellos que giran. Sombreado con la luz por la izquierda. Devuelve { x, y, arriba, ancho }.
export function copa(R, x, y, t, o = {}) {
  const s = Math.max(1, Math.round(o.s ?? 1)), tipo = o.tipo ?? 'oro', K = C.k, br = o.brillo ?? 0;
  x = Math.round(x); y = Math.round(y);
  const P = c_COPAS[tipo] ?? c_COPAS.oro, alto = 12 * s, y0 = y - alto + 1;
  if (br > 0) c_luz(R, x, y0 + 3 * s, 8 * s + 6, 7 * s + 6, hex('#fff2b0'), 0.35 * br);
  const W = (j) => Math.max(0.5, P.w[Math.min(11, Math.floor(j / s))] * s), rol = (j) => P.r[Math.min(11, Math.floor(j / s))];
  // las asas de la de Valencia, por detrás del contorno del cuenco
  if (P.asas) for (const d of [-1, 1]) { const pts = [[2, 7.2], [5.6, 6.6], [6.2, 5], [5.2, 3.6]].map(([a, b]) => [x + d * a * s, y0 + b * s]);
    for (let i = 0; i < 3; i++) { const [a, b] = pts[i], [c2, e] = pts[i + 1]; for (let k = -Math.floor(s / 2); k <= Math.floor(s / 2); k++) { R.linea(a, b + k, c2, e + k, k === -Math.floor(s / 2) ? hex('#fff0a0') : C.oro); } R.linea(a, b + Math.floor(s / 2) + 1, c2, e + Math.floor(s / 2) + 1, C.oroS); } }
  // el contorno negro y el relleno fila a fila
  for (let j = -1; j <= alto; j++) { const jj = Math.max(0, Math.min(alto - 1, j)), w = Math.round(W(jj)) + 1; R.rect(x - w, y0 + j, x + w, y0 + j, K); }
  for (let j = 0; j < alto; j++) { const w = W(j), r = rol(j), cols = P.c[r] ?? P.c.copa, py = y0 + j;
    for (let px = Math.round(x - w); px <= Math.round(x + w); px++) { const u = (px - x) / Math.max(1, w);
      if (P.cristal && r !== 'nudo') { c_tine(R, px, py, hex('#d8ecf8'), 0.35); if (Math.abs(u) > 0.82) R.pset(px, py, hex('#f0f8ff')); else if (u > -0.6 && u < -0.4) R.pset(px, py, C.blanco); continue; }
      let c = u < -0.45 ? cols[0] : u > 0.4 ? cols[2] : cols[1];
      if (P.vetas && r === 'copa' && Math.sin((py * 0.9 + px * 0.25 + Math.sin(px * 0.3) * 2) * 1.1 / s) > 0.75) c = c_mez(c, hex('#f0a090'), 0.45);
      if (P.vetas && r === 'pie' && Math.sin((py * 1.3 - px * 0.4) / s) > 0.8) c = c_mez(c, hex('#e08070'), 0.35);
      if (P.grano && Math.abs(Math.sin(px * 1.7 / s + Math.sin(py * 0.2) * 1.5)) > 0.93) c = cols[2];
      if (P.metal && u > -0.72 && u < -0.55) c = c_mez(c, C.blanco, 0.6);
      R.pset(px, py, c); } }
  // la boca del cuenco (una elipse más oscura arriba), las franjas y cercos, las perlas y las esmeraldas
  if (s >= 2) { const w = Math.round(W(0)) - 1; for (let px = x - w; px <= x + w; px++) { const d = Math.sqrt(Math.max(0, 1 - ((px - x) / (w + 0.5)) ** 2)); for (let k = 0; k <= Math.round(d * s * 0.6); k++) R.pset(px, y0 + k, P.cristal ? hex('#b8d8f0') : c_mez((P.c.copa)[2], K, 0.35)); } R.rect(x - w, y0, x + w, y0, P.cristal ? C.blanco : (P.c.copa)[0]); }
  if (P.franja) { const jy = y0 + 4 * s; for (let k = 0; k < Math.max(1, s >> 1); k++) R.rect(x - Math.round(W(4 * s)), jy + k, x + Math.round(W(4 * s)), jy + k, P.franja); if (s >= 2) for (let px = x - Math.round(W(4 * s)) + 1; px < x + W(4 * s); px += 3) R.pset(px, jy + Math.max(1, s >> 1), hex('#f0e0c0')); }
  if (P.asas) { const wb = Math.round(W(alto - 1)); R.rect(x - wb, y - Math.max(0, s - 2), x + wb, y, C.oro); R.rect(x - Math.round(W(9 * s)), y0 + 9 * s, x + Math.round(W(9 * s)), y0 + 9 * s + Math.max(0, (s >> 1) - 1), C.oro);
    if (s >= 2) { for (let px = x - wb + 1; px < x + wb; px += Math.max(2, s)) { R.pset(px, y - s, hex('#fffaf0')); if (s >= 3) R.pset(px + 1, y - s, hex('#d8d0c8')); }
      const ny = y0 + 6 * s + (s >> 1); R.pset(x - Math.round(s * 0.8), ny, hex('#3ac87a')); R.pset(x + Math.round(s * 0.8), ny, hex('#3ac87a')); R.pset(x, ny - 1, hex('#e84a5a')); if (s >= 3) { R.pset(x - Math.round(s * 0.8) - 1, ny, hex('#2a8a5a')); R.pset(x + Math.round(s * 0.8) + 1, ny, hex('#2a8a5a')); } } }
  // los destellos que giran
  if (br > 0) for (let k = 0; k < 4; k++) { const a = t * 1.6 + k * Math.PI / 2, r = (6 + 2 * Math.sin(t * 3 + k)) * s * 0.9; const px = Math.round(x + Math.cos(a) * r), py = Math.round(y0 + 3 * s + Math.sin(a) * r * 0.8);
    if (Math.sin(t * 4 + k * 1.7) > 1 - br * 1.4) { R.pset(px, py, C.blanco); R.pset(px - 1, py, hex('#fff4c0')); R.pset(px + 1, py, hex('#fff4c0')); R.pset(px, py - 1, hex('#fff4c0')); R.pset(px, py + 1, hex('#fff4c0')); } }
  return { x, y, arriba: y0, ancho: Math.round(W(0)) * 2 + 1 };
}
// el hueco de un búfer fijo (lo que no se pinta y deja ver lo de detrás) y los búferes ya pintados, por clave
const a_V = 0x01020304;

const a_bufs = new Map();

const a_datos = new Map();

// un búfer fijo que se pinta una sola vez (lleno de hueco) y se guarda; f puede dejar datos (ventanas, chimeneas…)
function a_capa(R, k, f) { let b = a_bufs.get(k); if (!b) { b = R.nuevo(); b.fill(a_V); const prev = R.usar(b); a_datos.set(k, f() || {}); R.usar(prev); a_bufs.set(k, b); } return b; }

// pega un búfer fijo sobre lo que haya, saltando el hueco, entre las filas y0 e y1
function a_pegar(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) if (b[i] !== a_V) B[i] = b[i]; }

// mezcla dos colores (u = 0 el primero, 1 el segundo)
const a_mez = (a, b, u) => { const f = (s) => (Math.round(((a >>> s) & 255) * (1 - u) + ((b >>> s) & 255) * u) & 255) * (1 << s); return (0xff000000 + f(16) + f(8) + f(0)) >>> 0; };

// tiñe un rectángulo (luz del alba, de la noche, neblina), saltando el hueco
function a_tinte(R, x0, y0, x1, y1, col, u) { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const i = y * 320 + x; if (B[i] !== a_V) B[i] = a_mez(B[i], col, u); } }

// un resplandor tramado (antorcha, vela, haz de luz): aclara hacia col sin tapar el dibujo
function a_brillo(R, cx, cy, r, col, f = 0.5) {
  const B = R.buf;
  for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(179, cy + r); y++) for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(319, cx + r); x++) {
    const g = 1 - Math.hypot(x - cx, y - cy) / r; if (g <= 0) continue;
    const q = Math.min(0.75, Math.floor(g * g * f * 4 + R.b4(x, y)) / 4); if (q <= 0) continue;
    const i = y * 320 + x; if (B[i] !== a_V) B[i] = a_mez(B[i], col, q);
  }
}

// degradado tramado: f(x, y) da el escalón de la rampa
function a_degr(R, x0, y0, x1, y1, ramp, f) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, R.tone(ramp, f(x, y), x, y)); }

const a_r = (a) => a.map(hex);

// rampas de la piedra, la madera, el barro, las tejas y el revoco
const A_PIEDRA = a_r(['#2e2a34', '#4e4a50', '#6a645e', '#857d70', '#a09886', '#bab29e', '#d2cab4']);

const A_PIEDRAF = a_r(['#2a2630', '#4a4246', '#665a52', '#82725e', '#9e8c72', '#b8a688', '#d0c09e']);

const A_MADERA = a_r(['#1e140e', '#34221a', '#4a3222', '#62442c', '#7c5836', '#987044', '#b48a58']);

const A_BARRO = a_r(['#241c16', '#382a20', '#4e3c2a', '#665036', '#7e6646', '#987e5a']);

const A_TEJA = a_r(['#3a1e1a', '#5a2a22', '#7a3a2a', '#9a4e34', '#b86a46']);

const A_PIZARRA = a_r(['#1c1e2a', '#2a2e3e', '#3a4052', '#4e566a', '#687288']);

const A_HIERRO = a_r(['#141418', '#26262e', '#3a3a46', '#585a66', '#808490']);

// sillería: hiladas de hb px y sillares de wb px a matajuntas; cada sillar con su tono, la arista alta con luz, la baja
// con sombra, juntas oscuras, desconchones y manchas; luz(x, y) suma o resta luz
function a_sillar(R, x0, y0, x1, y1, ramp, hb = 7, wb = 14, luz = null, k = 0) {
  const n = ramp.length - 1;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) {
    const fila = Math.floor((y - y0) / hb), ly = (y - y0) % hb, off = fila % 2 ? wb >> 1 : 0;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const col = Math.floor((x - x0 + off) / wb), lx = (x - x0 + off) % wb;
      if (ly === hb - 1 || lx === wb - 1) { R.pset(x, y, ramp[ly === hb - 1 && h(x, fila, k) < 0.15 ? 2 : 1]); continue; }
      let v = n * 0.55 + (h(col, fila, 3 + k) - 0.5) * 1.3 + (ly === 0 ? 0.9 : ly === hb - 2 ? -0.7 : 0) + (lx === 0 ? 0.5 : lx === wb - 2 ? -0.3 : 0)
        + (h(x, y, 5 + k) < 0.07 ? -1 : 0) + (h(x >> 1, y >> 1, 6 + k) < 0.035 ? 0.8 : 0) + (R.vnoise(x * 0.11 + k, y * 0.11) - 0.5) * 0.9;
      if (luz) v += luz(x, y);
      R.pset(x, y, R.tone(ramp, v, x, y));
    }
  }
}

// losas en perspectiva hacia el punto (vx, vy): hiladas que se ensanchan hacia delante, juntas, tono por losa, brillo
function a_losas(R, x0, y0, x1, y1, ramp, vx, vy, wb = 34, nf = 6, luz = null, k = 0) {
  const n = ramp.length - 1, F = (y) => Math.pow((y - y0) / (y1 - y0 + 1), 0.72) * nf;
  for (let y = y0; y <= y1; y++) {
    const fy = F(y), fila = Math.floor(fy), junta = Math.floor(F(y + 1)) !== fila, d = (y - vy) / (y1 - vy), off = fila % 2 ? 0.5 : 0;
    for (let x = x0; x <= x1; x++) {
      const wx = (x - vx) / d / wb + off, c = Math.floor(wx), jx = Math.floor((x + 1 - vx) / d / wb + off) !== c;
      if (junta || jx) { R.pset(x, y, ramp[1]); continue; }
      let v = n * 0.5 + (h(c, fila, 9 + k) - 0.5) * 1.2 - (1 - d) * 0.8 + (fy - fila < 0.12 ? 0.6 : 0) + (h(x, y, 8 + k) < 0.05 ? -0.8 : 0) + (R.vnoise(x * 0.09, y * 0.2 + k) - 0.5) * 0.8;
      if (luz) v += luz(x, y);
      R.pset(x, y, R.tone(ramp, v, x, y));
    }
  }
}

// textura de tejas (para poligono): hiladas de 3 px con tejas de 4 px a matajuntas
const a_teja = (R, ramp, luz = 0) => (x, y) => { const f = Math.floor(y / 3), lx = (x + (f % 2) * 2) & 3, ly = y % 3; return ly === 2 ? ramp[0] : R.tone(ramp, 2.2 + luz + (lx === 0 ? -0.8 : 0) + (ly === 0 ? 0.6 : 0) + (h(x >> 2, f, 4) - 0.5) * 1.2, x, y); };

// el cielo (alba, noche u ocaso) tramado, con un resplandor donde está el sol, estrellas de noche y nubes de tres tonos
// a tres velocidades; y1 = la última fila
const A_CIELO = {
  alba: a_r(['#2e2c5e', '#3e3472', '#56407e', '#784a88', '#a2568a', '#cc6a88', '#e88e86', '#f6b48c', '#fcd6a2']),
  noche: a_r(['#070a1c', '#0c1128', '#111834', '#162040', '#1c284e', '#24325c', '#2e3e6a']),
  ocaso: a_r(['#1c2054', '#28286a', '#3c2e76', '#5a387e', '#844480', '#b0527a', '#d46a6c', '#ee8a5e', '#f8b05e', '#fcd48a']),
};

const A_NUBES = {
  alba: [a_r(['#3a3268', '#54407a', '#8a5486', '#c27494']), a_r(['#4e3a72', '#7a4c84', '#c86e8e', '#f2a296']), a_r(['#6a4278', '#a65a86', '#ec8a8a', '#fcc89e'])],
  noche: [a_r(['#0c1028', '#141a36', '#1e2844', '#2a3654']), a_r(['#10142e', '#1a223e', '#28344e', '#3a4864']), a_r(['#12162e', '#1e2640', '#2e3a54', '#46546e'])],
  ocaso: [a_r(['#2a2462', '#423070', '#704280', '#a45682']), a_r(['#3a2a66', '#663a78', '#b85a78', '#f0886a']), a_r(['#4a2c62', '#8a4470', '#de6e6a', '#fcb070'])],
};

function a_nube(R, cx, cy, w, k, c) {
  const n = 3 + Math.floor(w / 14), L = [];
  for (let i = 0; i < n; i++) { const e = Math.sin((i + 0.5) / n * Math.PI); L.push([cx - w / 2 + (i + 0.5) * w / n, w / n * (0.55 + 0.5 * e) + h(i, k, 2) * 2, h(i, k, 3)]); }
  R.recorte([0, 0, 319, Math.round(cy + 2)]);
  for (const [lx, r, s] of L) R.disco(Math.round(lx), Math.round(cy - r * 0.35 + 1), r, c[0]);
  for (const [lx, r, s] of L) R.disco(Math.round(lx), Math.round(cy - r * 0.35), r - 1, c[1]);
  for (const [lx, r, s] of L) R.disco(Math.round(lx - 1), Math.round(cy - r * 0.6), r * 0.62, c[2]);
  for (const [lx, r, s] of L) if (s > 0.35) R.disco(Math.round(lx - 2), Math.round(cy - r * 0.85), Math.max(1, r * 0.28), c[3]);
  R.recorte(null);
  for (let x = Math.round(cx - w / 2 + 2); x < cx + w / 2 - 2; x++) if (h(x, k, 7) > 0.3) R.pset(x, Math.round(cy + 2), c[0]);
}

function a_cielo(R, t, y1, tipo, sol = null) {
  const ramp = A_CIELO[tipo], n = ramp.length - 1, B = R.buf;
  for (let y = 0; y <= y1; y++) { const v0 = (y / y1) * (n - 0.8) + 0.3;
    for (let x = 0; x < 320; x++) { let v = v0; if (sol) { const d = 1 - Math.hypot((x - sol[0]) * 0.42, y - sol[1]) / 80; if (d > 0) v += d * d * 3.2; } B[y * 320 + x] = R.tone(ramp, v, x, y); } }
  if (tipo === 'noche') {
    for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 30) * 319), y = Math.round(h(k, 2, 30) * y1 * 0.8); if (x > 272 && y < 48) continue; const b = Math.sin(t * (1.1 + (k % 5) * 0.5) + k * 3);
      if (b > -0.3) R.pset(x, y, b > 0.7 ? hex('#f4f0ff') : hex('#7a84b4')); if (b > 0.85 && k % 4 === 0) { R.pset(x - 1, y, hex('#5a6494')); R.pset(x + 1, y, hex('#5a6494')); } }
    const mx = 196, my = 26; R.disco(mx, my, 9, hex('#26305a')); R.disco(mx, my, 7, hex('#e8e4cc')); R.disco(mx + 3, my - 2, 6, hex('#1c2648')); R.pset(mx - 4, my + 1, hex('#c8c4ac')); R.pset(mx - 3, my + 3, hex('#c8c4ac'));
  }
  const NB = A_NUBES[tipo];
  const capas = [[0.24, 2.5, 34, 0], [0.42, 5, 48, 1], [0.62, 9, 62, 2]];
  for (const [fy, v, w, c] of capas) for (let j = 0; j < 3; j++) {
    const x = ((h(j, c, 11) * 440 + t * v) % 440) - 60, y = Math.round(y1 * fy + (h(j, c, 12) - 0.5) * 8);
    a_nube(R, x, y, w * (0.7 + h(j, c, 13) * 0.6), j + c * 3, NB[c]);
  }
}

// pájaros pequeños que cruzan (uves que aletean), n de ellos, alrededor de la fila y
function a_pajaros(R, t, n, y, col, v = 14, k = 0) {
  for (let i = 0; i < n; i++) { const x = Math.round(((h(i, k, 20) * 400 - t * (v + i % 3 * 3)) % 400 + 400) % 400 - 40), yy = Math.round(y + h(i, k, 21) * 18 + Math.sin(t * 0.8 + i) * 2), a = Math.sin(t * 9 + i * 2) > 0 ? -1 : 0;
    if (x > 270 && yy < 48) continue; R.pset(x, yy, col); R.pset(x - 1, yy + a, col); R.pset(x + 1, yy + a, col); R.pset(x - 2, yy + a * 2 - (a ? 0 : 1) * 0, col); R.pset(x + 2, yy + a * 2, col); }
}

// niebla baja que se arrastra entre y0 e y1 (densa en el centro de la franja)
function a_niebla(R, t, y0, y1, col, dens = 0.5, v = 4) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const p = Math.sin((y - y0) / (y1 - y0) * Math.PI);
    for (let x = 0; x < 320; x++) { const nz = R.vnoise((x + t * v) * 0.028, y * 0.11 + t * 0.03) * 0.7 + R.vnoise((x - t * v * 0.6) * 0.06, y * 0.2) * 0.3;
      const q = Math.min(0.6, Math.floor((dens * p * (nz * 1.6 - 0.3)) * 5 + R.b4(x, y)) / 5); if (q > 0) { const i = y * 320 + x; B[i] = a_mez(B[i], col, q); } } }
}

// una bocanada de humo (disco tramado que se deshace al subir)
function a_bocanada(R, cx, cy, r, col, u) { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && R.b4(cx + i, cy + j) < u) R.pset(Math.round(cx + i), Math.round(cy + j), col); }

// el humo de una chimenea, que sube y se tuerce con el viento
function a_humo(R, x, y, t, col, alto = 26, viento = 0.5, k = 0) {
  for (let i = 0; i < 9; i++) { const e = ((t * 0.32 + i / 9 + h(k, i, 3) * 0.05) % 1), py = y - e * alto, px = x + e * e * alto * viento + Math.sin(t * 1.3 + i + k) * e * 2;
    if (py > 18) a_bocanada(R, px, py, 1 + e * 3.5, col, 0.85 - e * 0.75); }
}

// una antorcha en su soporte de hierro (y = la boca de la tea): llama que baila, chispas y su resplandor
function a_antorcha(R, x, y, t, f = 1) {
  const fl = Math.sin(t * 13 + x) * 0.5 + Math.sin(t * 7.3 + x * 2) * 0.5;
  a_brillo(R, x, y - 5, 22 * f + fl * 1.5, hex('#ffb060'), 0.55 * f);
  R.linea(x - 3, y + 8, x, y + 3, A_HIERRO[1]); R.rect(x - 1, y + 2, x + 1, y + 3, A_HIERRO[2]); R.rect(x - 4, y + 6, x - 3, y + 10, A_HIERRO[1]);
  R.rect(x - 1, y - 1, x + 1, y + 1, hex('#4a3020')); R.pset(x - 1, y - 1, hex('#6a4a2a'));
  const top = Math.round(y - 9 - fl * 2);
  R.poligono([[x - 3, y - 1], [x + 3, y - 1], [x + 2, y - 5], [x + Math.round(fl), top]], hex('#e8582a'));
  R.poligono([[x - 2, y - 1], [x + 2, y - 1], [x + 1, y - 4], [x + Math.round(fl * 0.6), top + 3]], hex('#ffa83a'));
  R.rect(x - 1, y - 3, x, y - 2, hex('#fff0b0'));
  for (let i = 0; i < 3; i++) { const e = (t * 1.6 + i / 3) % 1; if (e < 0.7) R.pset(Math.round(x + Math.sin(t * 5 + i * 2) * 2 + e * 3), Math.round(y - 10 - e * 14), e < 0.35 ? hex('#ffe08a') : hex('#d8783a')); }
}

// una vela con su llama (y = la base de la vela), su gota de cera y su resplandor
function a_vela(R, x, y, t, alto = 5, f = 1) {
  const fl = Math.sin(t * 11 + x * 1.7) > 0.3 ? 1 : 0;
  a_brillo(R, x, y - alto - 2, 12 * f, hex('#ffd890'), 0.5 * f);
  R.rect(x - 1, y - alto, x + 1, y, hex('#f0e4c0')); R.pset(x + 1, y - alto + 1, hex('#c8b890')); R.pset(x - 1, y - alto + 2, hex('#fff8e0'));
  R.pset(x, y - alto - 1, hex('#3a2a20')); R.pset(x, y - alto - 2, hex('#ffb84a')); R.pset(x, y - alto - 3 - fl, hex('#ffe890')); R.pset(x, y - alto - 3, hex('#fff6c0'));
}

// la cruz paté templaria (brazos que se ensanchan), centrada en (cx, cy), de radio r
function a_cruz(R, cx, cy, r, c, cs = null) {
  const a = Math.max(1, Math.round(r * 0.22)), b = Math.round(r * 0.62);
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const P = (u, v) => [cx + dx * u + dy * v, cy + dy * u + dx * v];
    R.poligono([P(0, -a), P(r, -b), P(r, b), P(0, a)], c);
  }
  if (cs) { R.linea(cx + 1, cy + 1, cx + r, cy + b, cs); R.linea(cx + 1, cy + 1, cx + b, cy + r, cs); }
}

// la flor de lis (5 × 6 px)
const A_LIS = ['..#..', '.###.', '#.#.#', '#####', '..#..', '.#.#.'];

function a_lis(R, x, y, c, cs) { A_LIS.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') { R.pset(x + i, y + j, c); if (cs && (j === 3 || i === 0)) R.pset(x + i, y + j + 1, cs); } }); }

// arco apuntado: semiancho a la altura dy sobre los arranques (dos arcos de radio = la luz)
const a_arco = (w, dy) => (dy <= 0 ? w / 2 : Math.max(0, Math.sqrt(Math.max(0, w * w - dy * dy)) - w / 2));

// los tejados y campanarios de París a lo lejos, de base en la fila base (silueta con filo de luz y ventanucos)
function a_lejos(R, base, k, c0, c1, c2) {
  let x = -4;
  while (x < 320) {
    const w = 12 + Math.floor(h(x, k, 1) * 16), alto = 12 + Math.floor(h(x, k, 2) * 18), tipo = h(x, k, 3);
    const top = base - alto;
    R.rect(x, top, x + w, base, c0);
    R.poligono([[x - 1, top], [x + w / 2, top - w * 0.55], [x + w + 1, top]], c1);
    R.linea(x + Math.round(w / 2), Math.round(top - w * 0.55), x + w + 1, top, c2);
    if (tipo > 0.82) { const cx = x + Math.round(w / 2); R.rect(cx - 2, top - 16, cx + 2, top, c0); R.poligono([[cx - 3, top - 16], [cx, top - 30], [cx + 3, top - 16]], c1); R.pset(cx, top - 31, c2); }
    for (let j = 0; j < 3; j++) if (h(x, j, k + 4) > 0.55) R.pset(x + 2 + Math.floor(h(x, j, k + 5) * (w - 4)), top + 4 + j * 4, c2);
    x += w - 2;
  }
}

// la gran torre del Temple: cuerpo cuadrado de sillería con saeteras, cuatro torrecillas redondas con chapitel de pizarra
// y su tejado a cuatro aguas; x0 = izquierda, w = ancho del cuerpo, top = arranque del tejado, base = pie
function a_torreon(R, x0, w, top, base, s = 1) {
  const tw = Math.max(5, Math.round(9 * s)), x1 = x0 + w;
  a_sillar(R, x0, top, x1, base, A_PIEDRAF, Math.max(3, Math.round(5 * s)), Math.max(6, Math.round(11 * s)), (x) => (x - x0) / w * -1.2 + 0.4, 2);
  // tejado de pizarra a cuatro aguas
  R.poligono([[x0 + 2, top], [x0 + w * 0.3, top - w * 0.42], [x1 - w * 0.3, top - w * 0.42], [x1 - 2, top]], a_teja(R, A_PIZARRA, 0.4));
  R.linea(Math.round(x0 + w * 0.3), Math.round(top - w * 0.42), Math.round(x1 - w * 0.3), Math.round(top - w * 0.42), A_PIZARRA[4]);
  // saeteras y ventanas
  for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const sx = Math.round(x0 + w * (0.33 + i * 0.34)), sy = Math.round(top + 6 * s + j * (base - top) / 3.2); R.rect(sx, sy, sx, sy + Math.round(5 * s), A_PIEDRAF[0]); if (s > 0.9) R.pset(sx + 1, sy, A_PIEDRAF[6]); }
  // las cuatro torrecillas (las dos de delante se ven enteras)
  for (const cx of [x0, x1]) {
    a_sillar(R, cx - tw, top - Math.round(8 * s), cx + tw, base, A_PIEDRAF, Math.max(3, Math.round(5 * s)), Math.max(4, Math.round(7 * s)), (x) => { const u = (x - cx) / tw; return -u * 1.3 - Math.abs(u) * 0.5; }, 3);
    const ct = top - Math.round(8 * s);
    R.poligono([[cx - tw - 1, ct], [cx, ct - Math.round(20 * s)], [cx + tw + 1, ct]], (x, y) => R.tone(A_PIZARRA, 2.6 - (x - cx) / tw * 1.4 + (y % 3 === 0 ? -0.6 : 0), x, y));
    R.pset(cx, ct - Math.round(20 * s) - 1, A_HIERRO[3]); R.pset(cx, ct - Math.round(20 * s) - 2, A_HIERRO[2]);
    R.rect(cx - 1, ct + Math.round(8 * s), cx, ct + Math.round(13 * s), A_PIEDRAF[0]);
  }
  // almenas sobre el cuerpo
  for (let x = x0 + tw + 1; x < x1 - tw - 2; x += Math.max(3, Math.round(5 * s))) R.rect(x, top - Math.round(3 * s), x + Math.max(1, Math.round(2 * s)), top - 1, A_PIEDRAF[3]);
}

// una ventana de casa: hueco oscuro con vidrio emplomado en rombos, alféizar y dos postigos abiertos
function a_ventana(R, x0, y0, x1, y1, postigos = true) {
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, hex('#2a1a12'));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x - x0) + (y - y0)) % 4 === 0 || ((x - x0) - (y - y0) + 40) % 4 === 0 ? hex('#4a4a5a') : y < y0 + 2 ? hex('#3a4a6a') : hex('#262a3a'));
  R.rect(x0 - 2, y1 + 2, x1 + 2, y1 + 2, hex('#7a6a58')); R.rect(x0 - 2, y1 + 3, x1 + 2, y1 + 3, hex('#3a2a20'));
  if (postigos) { const w = Math.max(2, Math.round((x1 - x0) / 2)); for (const [a, b] of [[x0 - 2 - w, x0 - 2], [x1 + 2, x1 + 2 + w]]) { R.rect(a, y0 - 1, b, y1 + 1, hex('#4a6a5a')); for (let x = a; x <= b; x += 2) R.linea(x, y0, x, y1, hex('#3a5448')); R.rect(a, y0 + 1, b, y0 + 1, hex('#2e4038')); R.rect(a, y1 - 1, b, y1 - 1, hex('#2e4038')); } }
}

// una casa de entramado de París: planta baja de piedra con su tienda, pisos de entramado (vigas oscuras sobre revoco) con
// voladizo, el piñón a la calle con su tejado de tejas y la chimenea; devuelve ventanas, chimenea y muestra
function a_casa(R, x0, w, base, tope, k) {
  const { rect, linea, pset, poligono } = R;
  const rev = [a_r(['#9a8462', '#b8a07a', '#d0b890', '#e4d0a8', '#f0e2c0']), a_r(['#9a6e56', '#b88a6c', '#cca080', '#deb898', '#ecceb0']), a_r(['#8a8470', '#a8a08a', '#c0b8a0', '#d6ceb6', '#e6e0cc'])][k % 3];
  const VG = [hex('#22160e'), hex('#3a2618'), hex('#553a24')];
  const out = { ventanas: [], chimenea: null, muestra: null };
  // planta baja de piedra con su tienda: arco rebajado, el mostrador abatido con mercancía y la puerta
  const pb = base - 26;
  a_sillar(R, x0, pb, x0 + w - 1, base, A_PIEDRA, 6, 11, null, k);
  const tx0 = x0 + 4, tx1 = x0 + Math.round(w * 0.58), ty = pb + 6;
  rect(tx0, ty, tx1, base - 9, hex('#1a120e')); for (let x = tx0 + 1; x < tx1; x += 3) linea(x, ty + 2, x, base - 10, hex('#2a1e16'));
  for (let i = 0; i < (tx1 - tx0) / 4; i++) { const c = [hex('#c8a040'), hex('#8a3a2a'), hex('#d8d0b0'), hex('#4a6a3a')][(i + k) % 4]; rect(tx0 + 2 + i * 4, ty + 4, tx0 + 4 + i * 4, ty + 7, c); pset(tx0 + 2 + i * 4, ty + 4, hex('#f0e0b0')); }
  rect(tx0 - 2, base - 9, tx1 + 2, base - 7, VG[2]); rect(tx0 - 2, base - 6, tx1 + 2, base - 6, VG[0]); rect(tx0, base - 5, tx0 + 1, base, VG[1]); rect(tx1 - 1, base - 5, tx1, base, VG[1]);
  for (let i = 0; i < 4; i++) { const cx = tx0 + 3 + i * Math.round((tx1 - tx0 - 6) / 3); R.disco(cx, base - 11, 2, [hex('#e0b040'), hex('#a8c050'), hex('#c84a3a'), hex('#e8d8b0')][(i + k) % 4]); pset(cx - 1, base - 12, hex('#fff0c0')); }
  for (let x = tx0 - 1; x <= tx1 + 1; x++) { const dy = Math.round(Math.sqrt(Math.max(0, 1 - ((x - (tx0 + tx1) / 2) / ((tx1 - tx0) / 2 + 2)) ** 2)) * 4); pset(x, ty - dy, A_PIEDRA[1]); pset(x, ty - dy - 1, A_PIEDRA[5]); }
  const px0 = tx1 + 4, px1 = Math.min(x0 + w - 4, px0 + 10);
  rect(px0 - 1, pb + 3, px1 + 1, base, VG[0]); for (let x = px0; x <= px1; x++) for (let y = pb + 4; y <= base; y++) pset(x, y, R.tone(A_MADERA, 2.6 + ((x - px0) % 3 === 0 ? -1 : 0) + (h(x, y >> 2, k) - 0.5), x, y));
  rect(px0, pb + 9, px1, pb + 9, A_HIERRO[2]); rect(px0, base - 6, px1, base - 6, A_HIERRO[2]); pset(px1 - 2, pb + 15, A_HIERRO[4]);
  rect(px0 - 2, base, px1 + 2, base, A_PIEDRA[5]);
  // los pisos de entramado, cada uno 2 px más volado que el de abajo
  let y = pb, sale = 0;
  const pisos = Math.max(1, Math.floor((pb - tope - 18) / 20));
  for (let p = 0; p < pisos; p++) {
    sale += 2; const xa = x0 - sale, xb = x0 + w - 1 + sale, ya = y - 20;
    for (let yy = ya; yy < y; yy++) for (let xx = xa; xx <= xb; xx++) pset(xx, yy, R.tone(rev, 2.4 + (R.vnoise(xx * 0.3 + k * 7, yy * 0.3) - 0.5) * 1.6 + (yy - ya < 3 ? -0.8 : 0) + (h(xx, yy, k) < 0.05 ? -1 : 0), xx, yy));
    rect(xa, ya, xb, ya + 1, VG[1]); rect(xa, y - 3, xb, y - 1, VG[1]); rect(xa, y, xb, y + 1, VG[0]);
    for (let xx = xa; xx <= xb; xx += 4) pset(xx, y - 2, VG[2]);
    const np = Math.max(2, Math.round((xb - xa) / 12)), paso = (xb - xa) / np;
    for (let i = 0; i <= np; i++) { const xp = Math.round(xa + i * paso); rect(xp - 1, ya, xp, y - 1, VG[1]); pset(xp - 1, ya + 3, VG[2]); }
    for (let i = 0; i < np; i++) {
      const a = Math.round(xa + i * paso) + 2, b = Math.round(xa + (i + 1) * paso) - 3;
      if ((i + p + k) % 2 === 0 && b - a > 5) { const v0 = ya + 5, v1 = y - 7; a_ventana(R, a + 2, v0, b - 2, v1, b - a > 9); out.ventanas.push([a + 2, v0, b - 2, v1]); }
      else { linea(a, ya + 2, b, y - 4, VG[1]); linea(b, ya + 2, a, y - 4, VG[1]); linea(a + 1, ya + 2, b + 1, y - 4, VG[0]); }
    }
    y = ya;
  }
  // el piñón con su tejado de tejas a dos aguas, el entramado del desván y un ventanuco
  const xa = x0 - sale - 1, xb = x0 + w + sale, cx = (xa + xb) / 2;
  poligono([[xa, y], [cx, tope], [xb, y]], (xx, yy) => R.tone(rev, 2.2 + (R.vnoise(xx * 0.3 + k, yy * 0.3) - 0.5) * 1.4, xx, yy));
  linea(Math.round(cx), tope + 2, Math.round(cx), y, VG[1]); rect(Math.round(xa + (cx - xa) * 0.4), Math.round(y - (y - tope) * 0.4), Math.round(xb - (xb - cx) * 0.4), Math.round(y - (y - tope) * 0.4) + 1, VG[1]);
  linea(xa + 4, y - 1, Math.round(cx) - 1, Math.round(y - (y - tope) * 0.4), VG[1]); linea(xb - 4, y - 1, Math.round(cx) + 1, Math.round(y - (y - tope) * 0.4), VG[1]);
  { const vy = Math.round(y - (y - tope) * 0.4) + 4; if (y - vy > 6) { a_ventana(R, Math.round(cx) - 2, vy, Math.round(cx) + 2, vy + 4, false); out.ventanas.push([Math.round(cx) - 2, vy, Math.round(cx) + 2, vy + 4]); } }
  rect(xa - 1, y, xb + 1, y + 1, VG[1]);
  for (let i = 0; i < 4; i++) { const tej = (xx, yy) => (i === 3 ? A_TEJA[0] : R.tone(A_TEJA, 3.2 - i * 0.7 + (h(xx >> 1, yy, 3) - 0.5) * 1.2, xx, yy)); linea(xa - 3 + i, y + 1 - i * 0, Math.round(cx), tope - 3 + i, tej(xa, y)); linea(xb + 3 - i, y + 1, Math.round(cx), tope - 3 + i, tej(xb, y)); }
  for (let yy = tope - 3; yy <= y + 1; yy += 3) { const u = (yy - tope + 3) / (y - tope + 4), dx = (cx - xa + 3) * u; pset(Math.round(cx - dx), yy, A_TEJA[0]); pset(Math.round(cx + dx), yy, A_TEJA[0]); }
  // la chimenea de ladrillo
  const chx = Math.round(k % 2 ? xb - 7 : xa + 5), chy = Math.round(tope + (y - tope) * 0.35);
  for (let yy = chy - 10; yy <= chy; yy++) for (let xx = chx - 2; xx <= chx + 2; xx++) pset(xx, yy, yy % 3 === 0 || (xx + (yy / 3 | 0)) % 4 === 0 ? hex('#4a2a22') : xx === chx - 2 ? hex('#b06a4a') : hex('#8a4a36'));
  rect(chx - 3, chy - 11, chx + 3, chy - 10, A_PIEDRA[4]); out.chimenea = [chx, chy - 12];
  // la muestra de hierro colgada del primer piso
  out.muestra = [x0 + (k % 2 ? w - 2 : 2), pb - 6, k % 3];
  return out;
}

// la muestra de una tienda colgada de su brazo de hierro, que se mece (pictogramas: llave, bota o jarra)
function a_muestra(R, x, y, t, tipo, dir) {
  R.linea(x, y, x + dir * 12, y, A_HIERRO[2]); R.linea(x, y + 4, x + dir * 6, y, A_HIERRO[1]); R.pset(x + dir * 12, y - 1, A_HIERRO[3]);
  const a = Math.sin(t * 1.7 + x) * 0.18, cx = x + dir * 9, L = 4, bx = Math.round(cx + Math.sin(a) * L), by = Math.round(y + Math.cos(a) * L);
  R.linea(cx - 3, y, bx - 3, by, A_HIERRO[3]); R.linea(cx + 3, y, bx + 3, by, A_HIERRO[3]);
  R.rect(bx - 5, by, bx + 5, by + 8, hex('#6a4a2a')); R.rect(bx - 4, by + 1, bx + 4, by + 7, hex('#c8a050')); R.rect(bx - 5, by + 8, bx + 5, by + 8, hex('#3a2418'));
  const c = hex('#3a2418');
  if (tipo === 0) { R.rect(bx - 3, by + 2, bx + 3, by + 3, c); R.rect(bx - 2, by + 4, bx + 2, by + 4, c); R.pset(bx, by + 5, c); R.rect(bx - 2, by + 6, bx + 2, by + 6, c); }
  else if (tipo === 1) { R.rect(bx - 2, by + 2, bx, by + 6, c); R.rect(bx, by + 5, bx + 3, by + 6, c); }
  else { R.rect(bx - 2, by + 2, bx + 1, by + 6, c); R.pset(bx + 2, by + 3, c); R.pset(bx + 3, by + 4, c); R.pset(bx + 2, by + 5, c); }
}

// la puerta del Temple: arco apuntado con dovelas sobre los arranques; las dos hojas de tablas con herrajes y clavos;
// abre (0–1) abre la hoja derecha hacia dentro y deja ver el zaguán con luz de vela
function a_porton(R, cx, base, w, alto, t, abre = 0, noche = false) {
  const sp = base - alto + w * 0.87, top = base - alto;
  const hueco = (x, y) => y <= base && y >= top && Math.abs(x + 0.5 - cx) <= a_arco(w, sp - y);
  // dovelas alrededor del arco
  for (let y = top - 5; y <= base; y++) for (let x = cx - w / 2 - 5; x <= cx + w / 2 + 5; x++) {
    const d = Math.abs(x + 0.5 - cx), e = a_arco(w + 9, sp - y + 1);
    if (d <= e && !hueco(x, y)) { const ang = Math.atan2(sp - y, x - cx), dov = Math.floor(ang * 6), junta = Math.floor((ang + 0.03) * 6) !== dov && sp - y > 0;
      R.pset(x, y, junta ? A_PIEDRA[1] : R.tone(A_PIEDRA, 4 + (h(dov, 1, 2) - 0.5) * 1.2 + (d > e - 1.5 ? -1.2 : 0.4), x, y)); }
  }
  // el zaguán (si la hoja se abre): sombra con una vela al fondo y las losas
  const xm = Math.round(cx);
  for (let y = top; y <= base; y++) for (let x = Math.round(cx - w / 2); x <= cx + w / 2; x++) if (hueco(x, y)) {
    const dz = Math.hypot(x - cx - 4, y - base + 12) / 22;
    R.pset(x, y, y > base - 6 ? R.tone(A_PIEDRA, 2.2 - dz * 2 + ((x + (y > base - 3 ? 2 : 0)) % 6 === 0 ? -1 : 0), x, y) : R.tone(a_r(['#0e0a10', '#1e140e', '#3a2414', '#6a3e1c', '#a0662a']), 3.4 - dz * 3.4, x, y));
  }
  a_vela(R, xm + 6, base - 12, t, 4, 0.7); R.rect(xm + 3, base - 12, xm + 9, base - 11, A_MADERA[3]);
  // las hojas
  const hoja = (x0, x1, fx) => {
    for (let y = top; y <= base; y++) for (let x = x0; x <= x1; x++) { if (!hueco(fx ? fx(x) : x, y)) continue;
      const tabla = Math.floor((x - x0) / 4), lx = (x - x0) % 4;
      R.pset(x, y, lx === 3 ? A_MADERA[0] : R.tone(A_MADERA, 3 + (h(tabla, 2, 7) - 0.5) * 1.2 + (lx === 0 ? 0.6 : 0) + (R.vnoise(x * 0.4, y * 0.08 + tabla) - 0.5) * 1.2 - (noche ? 0.6 : 0), x, y)); }
    for (const yy of [top + 10, base - 18, base - 6]) { R.rect(x0 + 1, yy, x1 - 1, yy + 1, A_HIERRO[2]); R.rect(x0 + 1, yy, x1 - 1, yy, A_HIERRO[3]); for (let x = x0 + 2; x < x1; x += 3) R.pset(x, yy + 1, A_HIERRO[4]); }
    for (let y = top + 4; y < base - 2; y += 5) for (let x = x0 + 2; x < x1; x += 4) if (hueco(fx ? fx(x) : x, y)) R.pset(x, y, A_HIERRO[1]);
  };
  hoja(Math.round(cx - w / 2), xm - 1, null);
  const w2 = Math.max(2, Math.round((w / 2) * (1 - abre * 0.85)));
  hoja(xm, xm + w2, (x) => xm + (x - xm) * (w / 2) / w2);
  R.linea(xm - 1, top + 2, xm - 1, base, A_MADERA[0]);
  // la aldaba
  R.disco(xm - 4, base - 22, 2, A_HIERRO[3]); R.disco(xm - 4, base - 22, 1, A_MADERA[1]); R.pset(xm - 5, base - 23, A_HIERRO[4]);
  return { hueco: [Math.round(cx - w / 2), top, Math.round(cx + w / 2), base] };
}

// un carro de dos ruedas con toneles (primer término), base = suelo de las ruedas
function a_carro(R, x0, base) {
  const { rect, linea, pset, disco } = R;
  // los varales que bajan al suelo
  linea(x0 + 40, base - 16, x0 + 62, base - 2, A_MADERA[1]); linea(x0 + 40, base - 15, x0 + 62, base - 1, A_MADERA[3]);
  // la caja
  for (let y = base - 26; y <= base - 14; y++) for (let x = x0 - 4; x <= x0 + 42; x++) pset(x, y, (y - base + 26) % 4 === 3 ? A_MADERA[0] : R.tone(A_MADERA, 3 + (h(x >> 3, (y - base) >> 2, 4) - 0.5) + (R.vnoise(x * 0.3, y * 0.5) - 0.5), x, y));
  rect(x0 - 4, base - 27, x0 + 42, base - 27, A_MADERA[5]);
  // dos toneles
  for (const [cx, w] of [[x0 + 6, 9], [x0 + 26, 9]]) { for (let y = base - 46; y <= base - 27; y++) { const u = (y - (base - 36.5)) / 10, ww = Math.round(w * (1 - u * u * 0.12)); for (let x = cx - ww; x <= cx + ww; x++) pset(x, y, ((x - cx + 40) % 4 === 0) ? A_MADERA[1] : R.tone(A_MADERA, 3.8 - (x - cx) / ww * 1.6, x, y)); }
    for (const yy of [base - 44, base - 37, base - 30]) { rect(cx - w, yy, cx + w, yy, A_HIERRO[2]); pset(cx - w + 2, yy, A_HIERRO[4]); }
    R.rect(cx - w + 2, base - 47, cx + w - 2, base - 47, A_MADERA[5]); }
  // la rueda de radios
  const wx = x0 + 18, wy = base - 12;
  disco(wx, wy, 12, A_MADERA[0]); disco(wx, wy, 10, hex('#3a3238'));
  for (let a = 0; a < 8; a++) linea(wx, wy, Math.round(wx + Math.cos(a * Math.PI / 4) * 10), Math.round(wy + Math.sin(a * Math.PI / 4) * 10), A_MADERA[3]);
  for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(Math.round(wx + Math.cos(an) * 11), Math.round(wy + Math.sin(an) * 11), an > 3.4 && an < 5.4 ? A_MADERA[5] : A_MADERA[2]); }
  disco(wx, wy, 2, A_HIERRO[3]); pset(wx - 1, wy - 1, A_HIERRO[4]);
  rect(x0 - 6, base, x0 + 60, base + 1, hex('#1a1410'));
}

// el barro de la calle: adoquines junto a las casas, roderas, piedras, paja y charcos que reflejan el cielo
function a_barro(R, y0, y1, charcos, cielo) {
  for (let y = y0; y <= y1; y++) { const pr = (y - y0) / (y1 - y0);
    for (let x = 0; x < 320; x++) {
      let v;
      if (y < y0 + 5) { const c = Math.floor((x + (y - y0 > 2 ? 2 : 0)) / 4), j = (x + (y - y0 > 2 ? 2 : 0)) % 4 === 3 || y - y0 === 2; v = j ? 1 : 3 + (h(c, y > y0 + 2 ? 1 : 0, 6) - 0.5) * 1.4; }
      else {
        v = 2.4 + (R.vnoise(x * 0.07, y * 0.22) - 0.5) * 1.8 + pr * 0.4;
        for (const [ry, a, f] of [[154, 2, 0.021], [162, 2.5, 0.017], [173, 3, 0.013]]) { const dd = Math.abs(y - (ry + Math.sin(x * f + ry) * a)); if (dd < 1.2) v -= 1.2; else if (dd < 2.2) v += 0.5; }
        if (h(x, y, 31) < 0.03) v += 1.4; if (h(x >> 1, y, 32) < 0.02) v -= 1.2;
      }
      R.pset(x, y, R.tone(A_BARRO, v, x, y));
    }
  }
  for (const [cx, cy, rx, ry] of charcos) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1) continue;
    R.pset(x, y, d > 0.75 ? A_BARRO[0] : R.tone(cielo, (cielo.length - 1) * (0.35 + (y - cy + ry) / (2 * ry) * 0.5) + (h(x, y, 33) < 0.08 ? 1 : 0), x, y));
  }
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 34) * 319), y = Math.round(y0 + 6 + h(k, 2, 34) * (y1 - y0 - 6)), l = 1 + Math.round(h(k, 3, 34) * 2); R.linea(x, y, x + l, y - (k % 2), hex(k % 3 ? '#c8a858' : '#a08040')); }
  for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 4, 34) * 319), y = Math.round(y0 + 8 + h(k, 5, 34) * (y1 - y0 - 8)); R.pset(x, y, A_PIEDRA[5]); R.pset(x + 1, y, A_PIEDRA[3]); R.pset(x, y + 1, A_BARRO[0]); R.pset(x + 1, y + 1, A_BARRO[0]); }
}

// ondas en los charcos (una gota del alero cada poco)
function a_ondas(R, t, charcos, col) {
  charcos.forEach(([cx, cy, rx, ry], k) => { const e = (t * 0.7 + k * 0.37) % 1, r = e * rx * 0.7; if (e > 0.85) return;
    for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2; if ((a + k) % 2) R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r * ry / rx), col); } });
}

// una paloma pequeña que pasea y picotea (y = sus patas)
function a_paloma(R, x, y, t, dir, k = 0) {
  const pica = Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0, c = hex('#7a7a8a'), cs = hex('#4a4a5a');
  R.rect(x - 2, y - 3, x + 2, y - 1, c); R.pset(x - 2 * dir, y - 1, cs); R.pset(x + 2 * dir, y - 2, cs);
  R.pset(x + 3 * dir, y - 3 + pica * 2, hex('#9a9aac')); R.pset(x + 3 * dir, y - 4 + pica * 2, hex('#9a9aac')); R.pset(x + 4 * dir, y - 3 + pica * 2, hex('#c88a5a'));
  R.pset(x - 3 * dir, y - 2, cs); R.pset(x, y, hex('#c86a5a')); R.pset(x - 1, y, hex('#c86a5a')); R.pset(x + 1 * dir, y - 2, hex('#5a8a7a'));
}

const A_CASAS = [[-6, 58, 34, 0], [52, 56, 50, 1], [108, 60, 30, 2]];

const A_CHARCOS = [[92, 167, 13, 3], [262, 173, 15, 3], [168, 159, 8, 2]];

function a_calleFijo(R, noche) {
  const { rect, pset, linea } = R;
  const d = { casas: [] };
  // lejos: los tejados y campanarios de París y, por encima de la muralla, la gran torre del Temple en la neblina
  a_lejos(R, 92, 3, hex('#5a4a72'), hex('#6a5280'), hex('#a07a98'));
  a_torreon(R, 228, 36, 36, 92, 0.75);
  a_tinte(R, 0, 0, 319, 92, hex('#9a7aa2'), 0.5);
  // la muralla del recinto, almenada, con contrafuertes y su adarve
  a_sillar(R, 170, 84, 319, 146, A_PIEDRA, 6, 13, (x, y) => -((y - 84) / 62) * 0.5, 1);
  for (let x = 172; x < 320; x += 11) { a_sillar(R, x, 76, x + 6, 83, A_PIEDRA, 4, 7, () => 0.6, 2); rect(x, 76, x + 6, 76, A_PIEDRA[6]); }
  rect(170, 84, 319, 85, A_PIEDRA[1]);
  for (const bx of [270, 304]) { for (let y = 92; y <= 146; y++) { const w = Math.round(3 + (y - 92) / 9); for (let x = bx - w; x <= bx + w; x++) pset(x, y, R.tone(A_PIEDRA, 3.6 - (x - bx + w) / (2 * w) * 2.2 + (y % 6 === 0 ? -1 : 0), x, y)); } }
  // la puerta fortificada: cuerpo de sillería con matacanes y almenas, saeteras y el disco encalado con la cruz roja
  a_sillar(R, 188, 54, 256, 146, A_PIEDRA, 6, 12, (x) => (x < 191 ? 0.8 : x > 252 ? -0.9 : 0), 3);
  for (let x = 186; x < 258; x += 8) { rect(x, 58, x + 4, 62, A_PIEDRA[4]); rect(x, 62, x + 4, 63, A_PIEDRA[1]); }
  rect(186, 56, 257, 57, A_PIEDRA[5]);
  for (let x = 186; x < 258; x += 9) { a_sillar(R, x, 46, x + 5, 55, A_PIEDRA, 5, 6, () => 0.5, 4); rect(x, 46, x + 5, 46, A_PIEDRA[6]); }
  for (const sx of [196, 248]) { rect(sx, 76, sx, 86, A_PIEDRA[0]); rect(sx - 1, 80, sx + 1, 80, A_PIEDRA[0]); pset(sx + 1, 77, A_PIEDRA[6]); }
  R.disco(222, 80, 12, A_PIEDRA[2]); R.disco(222, 80, 11, hex('#d8d0bc')); R.disco(222, 80, 10, hex('#ece6d6'));
  for (let k = 0; k < 14; k++) { const a = h(k, 1, 40) * 6.28, r = 3 + h(k, 2, 40) * 7; pset(Math.round(222 + Math.cos(a) * r), Math.round(80 + Math.sin(a) * r), hex('#c8bea8')); }
  a_cruz(R, 222, 80, 8, hex('#c8303a'), hex('#8a1e28')); pset(220, 76, hex('#e85a5a')); pset(219, 79, hex('#e85a5a'));
  rect(208, 92, 236, 93, A_PIEDRA[5]); rect(208, 94, 236, 94, A_PIEDRA[1]);
  // el umbral de piedra
  rect(204, 146, 240, 148, A_PIEDRA[4]); rect(204, 146, 240, 146, A_PIEDRA[6]); rect(204, 149, 240, 149, A_PIEDRA[1]);
  // las casas de entramado
  for (const [x, w, tope, k] of A_CASAS) d.casas.push(a_casa(R, x, w, 146, tope, k));
  // un callejón oscuro entre la última casa y la muralla
  for (let y = 70; y <= 146; y++) for (let x = 168; x <= 170; x++) pset(x, y, A_PIEDRA[0]);
  // la calle
  a_barro(R, 147, 179, A_CHARCOS, noche ? A_CIELO.noche : A_CIELO.alba);
  rect(204, 147, 240, 148, A_PIEDRA[4]); rect(204, 147, 240, 147, A_PIEDRA[6]); rect(204, 149, 240, 149, A_PIEDRA[1]);
  // la luz: violeta del alba o azul de noche
  a_tinte(R, 0, 0, 319, 179, noche ? hex('#101838') : hex('#5a3a7a'), noche ? 0.5 : 0.16);
  return d;
}

// primer término de la calle (va por delante de la niebla): el carro con toneles, el tonel del agua y el poyo de montar
function a_calleDelante(R, noche) {
  const { rect, pset } = R;
  a_carro(R, 4, 182);
  for (let y = 150; y <= 179; y++) for (let x = 296; x <= 319; x++) { const j = (y - 150) % 7 === 6 || (x + ((y - 150) / 7 | 0) * 5) % 12 === 0; pset(x, y, j ? A_PIEDRA[1] : R.tone(A_PIEDRA, 4.2 - (x - 296) / 24 * 1.8 + (h(x >> 2, y >> 2, 5) - 0.5), x, y)); }
  rect(296, 150, 319, 150, A_PIEDRA[6]);
  for (let y = 124; y <= 149; y++) { const u = (y - 136.5) / 12.5, ww = Math.round(10 * (1 - u * u * 0.1)); for (let x = 300 - ww; x <= 300 + ww; x++) pset(x, y, ((x + 40) % 4 === 0) ? A_MADERA[1] : R.tone(A_MADERA, 3.6 - (x - 300) / ww * 1.6, x, y)); }
  for (const yy of [126, 136, 146]) rect(290, yy, 310, yy, A_HIERRO[2]);
  rect(291, 123, 309, 123, A_MADERA[5]);
  for (let x = 286; x < 296; x++) pset(x, 150 + (x & 1), hex('#3a5a3a'));
  rect(0, 178, 319, 179, hex('#1a1410'));
  a_tinte(R, 0, 110, 319, 179, noche ? hex('#101838') : hex('#5a3a7a'), noche ? 0.45 : 0.12);
}

function a_calle(R, t, o) {
  const noche = o.luz === 'noche', clave = noche ? 'calleN' : 'calleA';
  a_cielo(R, t, 100, noche ? 'noche' : 'alba', noche ? null : [196, 92]);
  if (!noche) { a_pajaros(R, t, 5, 30, hex('#3a2a4a'), 12, 1); }
  const b = a_capa(R, clave, () => a_calleFijo(R, noche)), d = a_datos.get(clave);
  a_pegar(R, b);
  // humo de las chimeneas
  d.casas.forEach((c, k) => a_humo(R, c.chimenea[0], c.chimenea[1], t + k * 1.3, noche ? hex('#3a4058') : hex('#b498b0'), 28, 0.6, k));
  // ventanas con vela (de noche casi todas; al alba unas pocas)
  d.casas.forEach((c, k) => c.ventanas.forEach(([x0, y0, x1, y1], j) => {
    if (!noche && (j + k) % 3 !== 1) return; if (noche && (j + k) % 4 === 3) return;
    const f = 0.75 + 0.25 * Math.sin(t * (3 + j) + k * 5) * Math.sin(t * 7.1 + j);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x - x0) + (y - y0)) % 4 === 0 || ((x - x0) - (y - y0) + 40) % 4 === 0 ? hex('#6a3e1e') : f > 0.85 ? hex('#ffd890') : hex('#f0a850'));
    a_brillo(R, (x0 + x1) / 2, y1 + 3, 9, hex('#ffc070'), noche ? 0.45 * f : 0.25 * f);
  }));
  // las muestras que se mecen
  d.casas.forEach((c, k) => a_muestra(R, c.muestra[0], c.muestra[1], t, c.muestra[2], k % 2 ? -1 : 1));
  // el portón (o.puerta lo abre) y las dos antorchas
  const pt = a_porton(R, 222, 146, 30, 44, t, o.puerta ?? 0, noche);
  a_antorcha(R, 200, 104, t, noche ? 1.3 : 1); a_antorcha(R, 244, 104, t + 0.7, noche ? 1.3 : 1);
  // palomas en las almenas y en el alero de la puerta
  for (let k = 0; k < 3; k++) { const x = Math.round(262 + k * 16 + Math.sin(t * 0.4 + k * 2) * 4); a_paloma(R, x, 75, t, Math.cos(t * 0.4 + k * 2) > 0 ? 1 : -1, k); }
  a_paloma(R, Math.round(196 + Math.sin(t * 0.3) * 3), 45, t + 1, 1, 5);
  // charcos que tiemblan y la niebla del amanecer que se arrastra por la calle
  a_ondas(R, t, A_CHARCOS, noche ? hex('#4a5a8a') : hex('#fce0c0'));
  a_niebla(R, t, 118, 172, noche ? hex('#4a5478') : hex('#d8bcd0'), noche ? 0.35 : 0.42, 5);
  a_pegar(R, a_capa(R, clave + 'D', () => a_calleDelante(R, noche)), 110, 179);
  // el gallo en el carro, que estira el cuello, y el gato en el tonel que mueve la cola
  { const x = 40, y = 154, c = Math.sin(t * 1.2) > 0.7 ? 2 : 0; R.rect(x - 3, y - 5, x + 3, y - 1, hex('#a8482a')); R.rect(x - 4, y - 7, x - 2, y - 4, hex('#2a4a3a')); R.pset(x - 5, y - 8, hex('#3a6a4a'));
    R.rect(x + 2, y - 9 - c, x + 4, y - 5, hex('#c86a3a')); R.pset(x + 3, y - 10 - c, hex('#d8302a')); R.pset(x + 4, y - 11 - c, hex('#d8302a')); R.pset(x + 5, y - 8 - c, hex('#e8b030')); R.pset(x + 4, y - 8 - c, hex('#1a1010'));
    R.pset(x - 1, y, hex('#e8b030')); R.pset(x + 1, y, hex('#e8b030')); }
  { const x = 302, y = 122, cola = Math.round(Math.sin(t * 2.2) * 2); R.rect(x - 3, y - 5, x + 2, y, hex('#3a3236')); R.rect(x - 2, y - 8, x + 2, y - 5, hex('#3a3236')); R.pset(x - 2, y - 9, hex('#3a3236')); R.pset(x + 2, y - 9, hex('#3a3236'));
    R.pset(x - 1, y - 7, hex('#c8d040')); R.pset(x + 1, y - 7, hex('#c8d040')); R.linea(x + 3, y - 1, x + 6, y - 3 + cola, hex('#3a3236')); R.pset(x + 6, y - 4 + cola, hex('#3a3236')); }
  return { suelo: 156, pies: [140, 162, 180, 252, 274], puerta: [222, 147], hueco: pt.hueco, umbral: 147, antorchas: [[200, 95], [244, 95]], carro: [4, 50], tonel: [290, 310] };
}

// un establo de piedra con galería de madera y tejado, tres puertas partidas (la mitad de arriba abierta) y la espadaña
function a_cuadras(R, x0, x1, top, base) {
  const { rect, pset, linea, poligono } = R;
  // tejado de tejas en pendiente y la galería de madera
  poligono([[x0 - 2, top + 10], [x0 + 4, top], [x1 + 2, top], [x1 + 6, top + 10]], a_teja(R, A_TEJA, 0.2));
  rect(x0 - 2, top + 10, x1 + 6, top + 11, A_MADERA[1]); rect(x0 - 2, top + 12, x1 + 6, top + 12, A_MADERA[0]);
  for (let y = top + 13; y <= top + 24; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x - x0) % 8 === 0 ? A_MADERA[1] : y === top + 18 ? A_MADERA[4] : R.tone(A_MADERA, 2.8 + (h(x >> 1, y, 2) - 0.5) + ((x - x0) % 8 === 1 ? 0.8 : 0), x, y));
  for (let x = x0 + 4; x < x1; x += 8) { linea(x, top + 19, x + 4, top + 24, A_MADERA[2]); }
  rect(x0, top + 25, x1, top + 26, A_MADERA[0]);
  a_sillar(R, x0, top + 27, x1, base, A_PIEDRA, 6, 11, (x, y) => -(y - top) / (base - top) * 0.3, 7);
  // las puertas partidas: la hoja de abajo cerrada, la de arriba abierta a la cuadra oscura
  const puertas = [];
  for (let i = 0; i < 3; i++) {
    const px = x0 + 8 + i * Math.round((x1 - x0 - 16) / 3), pw = 20, pt = base - 24;
    rect(px - 2, pt - 2, px + pw + 2, base, A_MADERA[0]); rect(px - 2, pt - 3, px + pw + 2, pt - 2, A_PIEDRA[5]);
    for (let y = pt; y < pt + 11; y++) for (let x = px; x <= px + pw; x++) pset(x, y, R.tone(a_r(['#0c0806', '#1a120c', '#2a1e14']), 1.4 - (y - pt) / 11 + (h(x, y, 3) < 0.1 ? 1 : 0), x, y));
    for (let y = pt + 11; y <= base; y++) for (let x = px; x <= px + pw; x++) pset(x, y, (x - px) % 4 === 3 ? A_MADERA[1] : R.tone(A_MADERA, 3.2 + (h((x - px) >> 2, i, 4) - 0.5) + (y === pt + 11 ? 1 : 0), x, y));
    linea(px, pt + 12, px + pw, base - 1, A_MADERA[2]); rect(px, pt + 11, px + pw, pt + 11, A_MADERA[5]);
    // la hoja de arriba abierta contra el muro
    for (let y = pt; y < pt + 11; y++) for (let x = px + pw + 3; x <= px + pw + 6; x++) pset(x, y, R.tone(A_MADERA, 2.4 + (x === px + pw + 3 ? 1 : 0), x, y));
    // heno en el pesebre
    for (let k = 0; k < 10; k++) pset(px + 2 + Math.floor(h(k, i, 5) * (pw - 4)), pt + 8 + Math.floor(h(k, i, 6) * 3), hex('#b89a48'));
    puertas.push([px, pt, pw]);
  }
  // la espadaña con su campana (la campana se pinta aparte, porque tañe)
  const ex = Math.round((x0 + x1) / 2);
  a_sillar(R, ex - 10, top - 24, ex + 10, top + 2, A_PIEDRA, 5, 7, () => 0.3, 8);
  poligono([[ex - 12, top - 24], [ex, top - 32], [ex + 12, top - 24]], (x, y) => R.tone(A_PIEDRA, 4 - (x - ex + 12) / 24 * 2, x, y));
  for (let y = top - 20; y <= top - 4; y++) for (let x = ex - 5; x <= ex + 5; x++) if (Math.abs(x + 0.5 - ex) <= a_arco(10, top - 14 - y)) pset(x, y, hex('#6a5a7a'));
  a_cruz(R, ex, top - 35, 3, A_HIERRO[2]);
  return { puertas, campana: [ex, top - 18] };
}

// la rotonda de la iglesia del Temple: cilindro de sillería con contrafuertes, ventanas de medio punto y tejado cónico
function a_rotonda(R, cx, r, top, base) {
  const { pset, poligono, rect } = R;
  for (let y = top; y <= base; y++) for (let x = cx - r; x <= cx + r; x++) {
    const u = (x - cx) / r, z = Math.sqrt(Math.max(0, 1 - u * u)), fila = Math.floor((y - top) / 6), ang = Math.asin(Math.max(-1, Math.min(1, u))), col = Math.floor((ang * r) / 9 + (fila % 2) * 0.5);
    const junta = (y - top) % 6 === 5 || Math.floor(((Math.asin(Math.max(-1, Math.min(1, (x + 1 - cx) / r))) * r) / 9 + (fila % 2) * 0.5)) !== col;
    pset(x, y, junta ? A_PIEDRA[1] : R.tone(A_PIEDRA, 2.2 + z * 1.6 - u * 1.1 + (h(col, fila, 9) - 0.5) * 1.1 + (R.vnoise(x * 0.12, y * 0.12) - 0.5) * 0.8, x, y));
  }
  // cornisa y tejado cónico de pizarra
  rect(cx - r - 1, top - 2, cx + r + 1, top, A_PIEDRA[5]); rect(cx - r - 1, top + 1, cx + r + 1, top + 1, A_PIEDRA[1]);
  poligono([[cx - r - 2, top - 2], [cx, top - Math.round(r * 0.75)], [cx + r + 2, top - 2]], (x, y) => R.tone(A_PIZARRA, 3 - (x - cx) / r * 1.6 + ((y + Math.round((x - cx) * 0.2)) % 3 === 0 ? -0.7 : 0), x, y));
  R.pset(cx, top - Math.round(r * 0.75) - 1, A_HIERRO[4]); a_cruz(R, cx, top - Math.round(r * 0.75) - 4, 2, A_HIERRO[3]);
  // contrafuertes y ventanas de medio punto
  for (const u of [-0.75, -0.25, 0.25, 0.75]) { const x = Math.round(cx + u * r); for (let y = top + 3; y <= base; y++) { const w = 1 + Math.round((y - top) / (base - top) * 2); for (let i = -w; i <= w; i++) pset(x + i, y, R.tone(A_PIEDRA, 3.6 - u - i * 0.5, x + i, y)); } }
  for (const u of [-0.5, 0, 0.5]) { const x = Math.round(cx + u * r), y0 = top + 10; for (let y = y0; y <= y0 + 14; y++) for (let i = -2; i <= 2; i++) if (y > y0 + 2 || i * i + (y - y0 - 2) ** 2 <= 5) pset(x + i, y, y < y0 + 4 ? hex('#3a4a6a') : hex('#1e2234')); pset(x - 1, y0 + 4, hex('#c8a0b0')); }
  // la portada con su arco abocinado
  const py = base - 22;
  for (let k = 3; k >= 0; k--) for (let y = py - k; y <= base; y++) for (let x = cx - 7 - k; x <= cx + 7 + k; x++) if (y > py + 6 - k || (x - cx) ** 2 + (y - py - 6 + k) ** 2 <= (7 + k) ** 2) pset(x, y, k === 0 ? hex('#1a1214') : R.tone(A_PIEDRA, 2 + k * 0.8 - (x - cx) / 10, x, y));
  for (let y = py + 6; y <= base; y++) for (let x = cx - 6; x <= cx + 6; x++) pset(x, y, x === cx ? A_MADERA[0] : R.tone(A_MADERA, 2.6 + ((x - cx) % 3 === 0 ? -0.8 : 0), x, y));
}

// un pozo de brocal redondo con su tejadillo y el torno (el cubo se pinta aparte); base = pie del brocal
function a_pozo(R, cx, base) {
  const { rect, pset, linea, poligono } = R;
  for (let y = base - 14; y <= base; y++) for (let x = cx - 14; x <= cx + 14; x++) { const u = (x - cx) / 14, fila = Math.floor((y - base + 14) / 4), col = Math.floor((Math.asin(Math.max(-1, Math.min(1, u))) * 14) / 6 + fila * 0.5);
    pset(x, y, (y - base + 14) % 4 === 3 ? A_PIEDRA[1] : R.tone(A_PIEDRA, 3.4 - u * 1.4 + Math.sqrt(1 - u * u) * 0.6 + (h(col, fila, 4) - 0.5), x, y)); }
  for (let x = cx - 14; x <= cx + 14; x++) { const e = Math.sqrt(Math.max(0, 1 - ((x - cx) / 14) ** 2)) * 4; for (let y = Math.round(base - 14 - e); y <= Math.round(base - 14 + e); y++) pset(x, y, Math.abs(y - (base - 14)) > e - 1.2 ? A_PIEDRA[5] : hex('#141018')); }
  for (const px of [cx - 13, cx + 12]) { rect(px, base - 40, px + 1, base - 15, A_MADERA[3]); pset(px, base - 40, A_MADERA[5]); rect(px + 1, base - 40, px + 1, base - 15, A_MADERA[1]); }
  poligono([[cx - 18, base - 38], [cx, base - 48], [cx + 18, base - 38]], a_teja(R, A_TEJA, 0.3)); rect(cx - 18, base - 38, cx + 18, base - 37, A_MADERA[0]);
  rect(cx - 12, base - 33, cx + 12, base - 30, A_MADERA[2]); rect(cx - 12, base - 33, cx + 12, base - 33, A_MADERA[4]);
  for (let x = cx - 9; x <= cx + 9; x += 2) pset(x, base - 32, hex('#a89068'));
  linea(cx + 13, base - 31, cx + 17, base - 27, A_HIERRO[2]); rect(cx + 16, base - 27, cx + 18, base - 26, A_MADERA[3]);
}

// el abrevadero de piedra (el agua se pinta aparte, porque se mueve)
function a_pila(R, x0, x1, top, base) {
  for (let y = top; y <= base; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, y === top ? A_PIEDRA[6] : (x - x0) % 12 === 11 ? A_PIEDRA[1] : R.tone(A_PIEDRA, 3.6 - (y - top) / (base - top) * 1.6 + (h(x >> 2, y >> 2, 6) - 0.5), x, y));
  R.rect(x0 + 2, top + 1, x1 - 2, top + 3, hex('#2a3a4a'));
}

function a_patioFijo(R) {
  const { rect, pset, linea } = R;
  // la gran torre al fondo y la torrecilla pegada a ella
  a_torreon(R, 156, 66, 46, 134, 1);
  a_sillar(R, 224, 70, 240, 134, A_PIEDRAF, 5, 8, (x) => -(x - 224) / 16 * 1.2, 4);
  R.poligono([[222, 70], [232, 54], [242, 70]], (x, y) => R.tone(A_PIZARRA, 3 - (x - 232) / 10 * 1.4, x, y));
  for (let y = 92; y < 128; y += 12) { rect(232, y, 232, y + 4, A_PIEDRAF[0]); }
  // la puerta de la torre, alta y con escalinata
  for (let y = 100; y <= 134; y++) for (let x = 180; x <= 198; x++) if (y > 108 || Math.abs(x + 0.5 - 189) <= a_arco(18, 108 - y)) pset(x, y, y > 108 && Math.abs(x + 0.5 - 189) < 7 ? R.tone(A_MADERA, 2.4 + ((x - 182) % 3 === 0 ? -1 : 0), x, y) : A_PIEDRAF[1]);
  for (let s = 0; s < 4; s++) { rect(176 - s * 3, 134 + s * 2 - 6, 202 + s * 3, 134 + s * 2 - 5, A_PIEDRA[5]); rect(176 - s * 3, 134 + s * 2 - 4, 202 + s * 3, 134 + s * 2 - 4, A_PIEDRA[2]); }
  a_rotonda(R, 284, 34, 78, 134);
  a_tinte(R, 150, 0, 319, 134, hex('#7a6a9a'), 0.18);
  // las cuadras a la izquierda, con la espadaña
  const cu = a_cuadras(R, 0, 136, 88, 134);
  // un murete bajo que cierra el patio por detrás
  a_sillar(R, 136, 124, 160, 134, A_PIEDRA, 5, 9, null, 5);
  // el empedrado en perspectiva, con barro, paja y un charco
  a_losas(R, 0, 135, 319, 179, a_r(['#2e2824', '#4a4038', '#665a4c', '#807260', '#9a8a74', '#b2a28a']), 160, 60, 9, 12, (x, y) => (R.vnoise(x * 0.05, y * 0.1) > 0.62 ? -1.2 : 0), 3);
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 50) * 319), y = Math.round(138 + h(k, 2, 50) * 40); linea(x, y, x + 1 + (k % 3), y - (k & 1), hex(k % 2 ? '#c8a858' : '#a08040')); }
  for (let y = 166; y <= 172; y++) for (let x = 250; x <= 280; x++) if (((x - 265) / 15) ** 2 + ((y - 169) / 3.5) ** 2 < 1) pset(x, y, R.tone(A_CIELO.alba, 6 + (y - 166) * 0.3, x, y));
  // el pozo, el abrevadero, un banco de piedra con un cubo y un haz de heno
  a_pozo(R, 40, 152);
  a_pila(R, 72, 116, 140, 152);
  for (let y = 152; y <= 154; y++) linea(70, y, 118, y, hex('#2a221c'));
  rect(298, 138, 319, 150, hex('#8a7a48')); for (let k = 0; k < 30; k++) { const x = 298 + Math.floor(h(k, 3, 51) * 22), y = 138 + Math.floor(h(k, 4, 51) * 12); pset(x, y, hex(k % 2 ? '#d8c070' : '#6a5a30')); }
  linea(296, 150, 312, 118, A_MADERA[3]); for (let i = 0; i < 3; i++) linea(310 + i, 118, 310 + i * 2, 112, A_HIERRO[3]);
  a_tinte(R, 0, 0, 319, 179, hex('#5a3a7a'), 0.12);
  return cu;
}

function a_patio(R, t, o) {
  a_cielo(R, t, 100, 'alba', [80, 96]);
  a_pajaros(R, t, 6, 26, hex('#3a2a4a'), 11, 3);
  const b = a_capa(R, 'patio', () => a_patioFijo(R)), d = a_datos.get('patio');
  a_pegar(R, b);
  // los caballos que asoman por las puertas de las cuadras
  d.puertas.forEach(([px, pt, pw], i) => {
    const cab = Math.round(Math.sin(t * 0.9 + i * 2.1) * 1.5), x = px + 6 + i * 2, y = pt + 3 + cab, pel = [hex('#6a3a22'), hex('#2a2020'), hex('#c8b8a0')][i], ps = [hex('#4a2618'), hex('#141010'), hex('#9a8a78')][i];
    R.rect(x, y, x + 6, y + 8, pel); R.rect(x + 6, y + 3, x + 10, y + 7, pel); R.rect(x + 9, y + 5, x + 10, y + 7, ps); R.pset(x + 10, y + 5, hex('#1a1010'));
    R.pset(x + 5, y + 2, hex('#1a1010')); R.pset(x + 1, y - 1, pel); R.pset(x + 2, y - 2 + (Math.sin(t * 2 + i) > 0.6 ? 1 : 0), pel); R.rect(x - 1, y, x, y + 6, ps);
  });
  // la campana de la espadaña, que tañe
  { const [bx, by] = d.campana, a = (o.campana ?? 1) * Math.sin(t * 3.2) * 0.5, cx = bx + Math.sin(a) * 4, cy = by + Math.cos(a) * 4;
    R.linea(bx - 5, by - 3, bx + 5, by - 3, A_MADERA[1]); R.linea(bx, by - 3, Math.round(cx), Math.round(cy - 2), A_HIERRO[2]);
    R.poligono([[cx - 2, cy - 3], [cx + 2, cy - 3], [cx + 4, cy + 3], [cx - 4, cy + 3]], hex('#b8862a')); R.pset(Math.round(cx - 2), Math.round(cy - 1), hex('#f0c860')); R.pset(Math.round(cx + Math.sin(a) * 3), Math.round(cy + 4), A_HIERRO[1]);
    if ((o.campana ?? 1) > 0 && Math.abs(Math.sin(t * 3.2)) > 0.97) for (const s of [-1, 1]) { R.pset(bx + s * 9, by - 1, hex('#f8e0c0')); R.pset(bx + s * 11, by - 2, hex('#f8e0c0')); R.pset(bx + s * 11, by, hex('#f8e0c0')); }
  }
  // el cubo del pozo que sube y baja, y el torno que gira
  { const u = (Math.sin(t * 0.7) + 1) / 2, by = Math.round(122 + u * 16); R.linea(40, 121, 40, by - 2, hex('#a89068'));
    if (by < 138) { R.rect(37, by - 2, 43, by + 3, A_MADERA[3]); R.rect(37, by - 2, 43, by - 2, A_HIERRO[3]); R.rect(37, by + 1, 43, by + 1, A_HIERRO[2]); R.pset(38, by, A_MADERA[5]); }
    const g = t * 2.2; R.linea(57, 125, Math.round(57 + Math.cos(g) * 3), Math.round(125 + Math.sin(g) * 3), A_HIERRO[4]); }
  // el agua del abrevadero, con reflejos que corren
  for (let x = 74; x <= 114; x++) { const w = Math.sin(x * 0.5 - t * 3) + Math.sin(x * 0.23 + t * 1.7); R.pset(x, 141, w > 1.2 ? hex('#f8d8c0') : hex('#5a6a8a')); R.pset(x, 142, w < -0.8 ? hex('#3a4a6a') : hex('#4a5a7a')); }
  // gallinas que picotean
  for (let k = 0; k < 2; k++) { const x = Math.round(64 + k * 18 + Math.sin(t * 0.5 + k * 3) * 6), y = 162 + k * 4, pica = Math.sin(t * 4 + k * 2) > 0.5 ? 2 : 0, dir = Math.cos(t * 0.5 + k * 3) > 0 ? 1 : -1, c = k ? hex('#e8e0d0') : hex('#a85a2a');
    R.rect(x - 3, y - 4, x + 2, y - 1, c); R.rect(x + 2 * dir, y - 6 + pica, x + 3 * dir, y - 4 + pica, c); R.pset(x + 4 * dir, y - 5 + pica, hex('#e8b030')); R.pset(x + 2 * dir, y - 7 + pica, hex('#d8302a')); R.pset(x - 3 * dir, y - 5, c); R.pset(x, y, hex('#e8b030')); }
  a_niebla(R, t, 120, 150, hex('#e0c8d8'), 0.28, 4);
  return { suelo: 160, fila: [134, 156, 178, 200, 222, 244], pies: [100, 134, 156, 178, 200, 222, 244, 266], pozo: [40, 152], abrevadero: [72, 116, 140], cuadras: [0, 136], puertaTorre: [189, 134], campana: d.campana };
}

// el estandarte templario (Beauséant): paño partido, negro arriba y blanco abajo, colgado de un asta con su cordón;
// x0, y0 = esquina de arriba a la izquierda, w × alto; el borde de abajo acaba en dos puntas
function a_bauseant(R, x0, y0, w, alto) {
  R.rect(x0 - 3, y0 - 2, x0 + w + 3, y0 - 1, A_MADERA[3]); R.rect(x0 - 3, y0 - 2, x0 + w + 3, y0 - 2, A_MADERA[5]); R.disco(x0 - 3, y0 - 2, 1, hex('#c8962a')); R.disco(x0 + w + 3, y0 - 2, 1, hex('#c8962a'));
  for (let y = y0; y <= y0 + alto; y++) for (let x = x0; x <= x0 + w; x++) {
    const u = (x - x0) / w, cola = y > y0 + alto - 6 && Math.abs(u - 0.5) < (y - (y0 + alto - 6)) / 12; if (cola) continue;
    const plie = Math.sin(u * Math.PI * 3) * 0.7, neg = y < y0 + alto * 0.4;
    R.pset(x, y, R.tone(neg ? a_r(['#0a0a0e', '#1a1a20', '#2c2c34', '#40404a']) : a_r(['#8a8478', '#b8b2a4', '#dcd6c8', '#f2eee2']), 1.8 + plie + (x === x0 ? -0.6 : 0), x, y));
  }
  R.linea(x0 + 2, y0 - 1, x0 + 2, y0 + 8, hex('#c8962a')); R.pset(x0 + 2, y0 + 9, hex('#e8b030'));
}

// una saetera abocinada con el cielo del alba al fondo (x = centro, y0–y1 = alto del hueco)
function a_saetera(R, x, y0, y1, an = 7) {
  for (let y = y0 - 4; y <= y1 + 4; y++) { const w = an - Math.round(Math.abs(y - (y0 + y1) / 2) / (y1 - y0 + 8) * 3); for (let i = -w; i <= w; i++) R.pset(x + i, y, R.tone(A_PIEDRA, 1.6 + (i < 0 ? 1.4 : -0.2) + (Math.abs(i) / w) * 0.6 + (y > y1 ? -0.8 : 0) + (y < y0 ? 0.5 : 0), x + i, y)); }
  for (let y = y0; y <= y1; y++) for (let i = -1; i <= 1; i++) R.pset(x + i, y, R.tone(A_CIELO.alba, 4 + (y - y0) / (y1 - y0) * 4, x + i, y));
  R.rect(x - 3, y1 + 4, x + 3, y1 + 4, A_PIEDRA[5]);
}

// la bóveda de crucería: plementería de piedra entre nervios que bajan a las columnas adosadas
function a_boveda(R, y1, cols) {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y % 5 === 4 && (x + y) % 2 === 0) ? A_PIEDRAF[1] : R.tone(A_PIEDRAF, 1.4 + y / y1 * 1.6 + (R.vnoise(x * 0.1, y * 0.2) - 0.5) * 0.9, x, y));
  for (let i = 0; i < cols.length - 1; i++) { const a = cols[i], b = cols[i + 1], m = (a + b) / 2;
    for (let x = a; x <= b; x++) { const u = (x - m) / ((b - a) / 2), y = Math.round(y1 - (1 - u * u) * y1 * 0.92); R.pset(x, y, A_PIEDRAF[5]); R.pset(x, y + 1, A_PIEDRAF[2]); R.pset(x, y - 1, A_PIEDRAF[3]); }
    R.linea(a, y1, m, 2, A_PIEDRAF[4]); R.linea(b, y1, m, 2, A_PIEDRAF[4]); R.linea(a + 1, y1, m + 1, 2, A_PIEDRAF[1]);
    R.disco(Math.round(m), 3, 3, A_PIEDRAF[5]); R.disco(Math.round(m), 3, 1, A_PIEDRAF[2]); }
}

// una columna adosada con capitel y basa
function a_columna(R, x, y0, y1) {
  for (let y = y0; y <= y1; y++) for (let i = -4; i <= 4; i++) R.pset(x + i, y, R.tone(A_PIEDRA, 3.4 - i * 0.45 + ((y - y0) % 14 === 13 ? -1.2 : 0), x + i, y));
  for (let k = 0; k < 4; k++) R.rect(x - 6 + k, y0 - k, x + 6 - k, y0 - k, A_PIEDRA[k === 0 ? 2 : 5]);
  R.rect(x - 6, y1 - 3, x + 6, y1, A_PIEDRA[4]); R.rect(x - 6, y1 - 3, x + 6, y1 - 3, A_PIEDRA[6]);
}

// una estantería de madera con rollos, códices de lomos de colores (sin letras), cajas y una bolsa
function a_estante(R, x0, x1, y0, y1) {
  const { rect, pset } = R;
  rect(x0, y0, x1, y1, A_MADERA[0]);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 2; x <= x1 - 2; x++) pset(x, y, R.tone(A_MADERA, 1.2 + (h(x >> 2, y >> 3, 7) - 0.5) * 0.6, x, y));
  rect(x0, y0, x0 + 1, y1, A_MADERA[3]); rect(x1 - 1, y0, x1, y1, A_MADERA[2]);
  const n = 4, alto = (y1 - y0) / n;
  for (let s = 0; s < n; s++) {
    const yb = Math.round(y0 + (s + 1) * alto); rect(x0, yb - 1, x1, yb, A_MADERA[4]); rect(x0, yb + 1, x1, yb + 1, A_MADERA[0]);
    let x = x0 + 3;
    while (x < x1 - 4) { const k = h(x, s, 8);
      if (k < 0.4) { const w = 2 + Math.floor(h(x, s, 9) * 2), hh = Math.round(alto * (0.55 + h(x, s, 10) * 0.3)), c = [hex('#8a2a2a'), hex('#2a4a6a'), hex('#5a3a1e'), hex('#3a5a3a'), hex('#a8783a')][Math.floor(h(x, s, 11) * 5)];
        rect(x, yb - 1 - hh, x + w, yb - 2, c); rect(x, yb - 1 - hh, x, yb - 2, a_mez(c, 0xffffffff, 0.3)); pset(x + 1, yb - hh + 1, hex('#e8c860')); pset(x + 1, yb - 4, hex('#e8c860')); x += w + 1; }
      else if (k < 0.75) { const r = 2; for (let j = 0; j < 2; j++) { R.disco(x + r, yb - 2 - r - j * 4, r, hex('#e8d8a8')); R.disco(x + r, yb - 2 - r - j * 4, 1, hex('#a88a58')); } x += 2 * r + 2; }
      else { rect(x, yb - 7, x + 6, yb - 2, A_MADERA[4]); rect(x, yb - 7, x + 6, yb - 7, A_MADERA[6]); pset(x + 3, yb - 5, A_HIERRO[3]); x += 8; }
    }
  }
}

// el escritorio de las cuentas: atril inclinado con el libro abierto, tintero con pluma, la balanza de monedas y el taburete
function a_escritorio(R, x0, base) {
  const { rect, pset, linea, poligono } = R;
  for (const lx of [x0 + 3, x0 + 42]) { rect(lx, base - 24, lx + 2, base, A_MADERA[2]); rect(lx, base - 24, lx, base, A_MADERA[4]); }
  rect(x0 + 3, base - 6, x0 + 44, base - 5, A_MADERA[1]);
  poligono([[x0, base - 24], [x0 + 48, base - 24], [x0 + 48, base - 30], [x0, base - 34]], (x, y) => R.tone(A_MADERA, 3.6 + (h(x >> 3, y, 2) - 0.5) * 0.8 + ((x + y * 2) % 9 === 0 ? -0.7 : 0), x, y));
  rect(x0, base - 24, x0 + 48, base - 22, A_MADERA[1]); rect(x0, base - 24, x0 + 48, base - 24, A_MADERA[5]);
  // el libro abierto sobre el atril
  poligono([[x0 + 8, base - 27], [x0 + 22, base - 26], [x0 + 22, base - 32], [x0 + 9, base - 34]], hex('#efe2bc'));
  poligono([[x0 + 22, base - 26], [x0 + 36, base - 26], [x0 + 35, base - 31], [x0 + 22, base - 32]], hex('#e4d4a8'));
  for (let k = 0; k < 4; k++) { linea(x0 + 11, base - 32 + k * 1.4, x0 + 20, base - 31 + k * 1.4, hex('#7a6a58')); linea(x0 + 24, base - 30 + k * 1.1, x0 + 33, base - 30 + k * 1.1, hex('#7a6a58')); }
  linea(x0 + 22, base - 32, x0 + 22, base - 26, hex('#a08a60'));
  // tintero y pluma, montones de monedas y la balanza
  rect(x0 + 40, base - 29, x0 + 43, base - 26, hex('#1a1a2a')); linea(x0 + 42, base - 29, x0 + 46, base - 37, hex('#f0ece0')); pset(x0 + 45, base - 36, hex('#d8d0c0'));
  for (let k = 0; k < 3; k++) { const mx = x0 + 52 + k * 5, mh = 3 + k * 2; rect(mx, base - 24 - mh, mx + 3, base - 24, hex('#c8962a')); for (let y = base - 24 - mh; y < base - 24; y += 2) rect(mx, y, mx + 3, y, hex('#f0c850')); }
  rect(x0 + 48, base - 24, x0 + 70, base - 22, A_MADERA[2]); rect(x0 + 50, base - 22, x0 + 51, base, A_MADERA[2]); rect(x0 + 67, base - 22, x0 + 68, base, A_MADERA[2]);
  return { libro: [x0 + 22, base - 30], tintero: [x0 + 41, base - 28], vela: [x0 + 4, base - 34] };
}

function a_torreFijo(R) {
  const { rect, pset, linea } = R;
  a_boveda(R, 34, [0, 160, 320]);
  a_sillar(R, 0, 34, 319, 146, A_PIEDRA, 7, 15, (x, y) => { const d1 = Math.hypot((x - 102) * 0.6, y - 64) / 70, d2 = Math.hypot((x - 262) * 0.6, y - 64) / 70; return Math.max(0, 1 - Math.min(d1, d2)) * 1.4 - 0.5 - (y - 34) / 112 * 0.6; }, 11);
  a_columna(R, 160, 34, 146); a_columna(R, 4, 34, 146); a_columna(R, 316, 34, 146);
  a_saetera(R, 102, 50, 80); a_saetera(R, 262, 50, 80);
  // la escalera de caracol: arco de entrada, peldaños en abanico que suben a la oscuridad, la cuerda de pasamanos
  const OSC = a_r(['#0a080c', '#16121a', '#262028', '#3a3234', '#564c48', '#766a5e']);
  for (let y = 84; y <= 146; y++) for (let x = 12; x <= 44; x++) {
    if (!(y > 96 || Math.abs(x + 0.5 - 28) <= a_arco(32, 96 - y))) continue;
    const n = Math.floor((146 - y) / 5), ly = (146 - y) % 5, xl = 19 + n * 2.2, luz = 4.6 - n * 0.42 - (x - xl) / 30;
    if (x < 19) { const u = (x - 12) / 7; pset(x, y, R.tone(OSC, 2.6 - n * 0.2 + Math.sin(u * Math.PI) * 1.4, x, y)); continue; }
    if (x < xl) { pset(x, y, R.tone(OSC, 1.2 - n * 0.1, x, y)); continue; }
    pset(x, y, ly === 4 ? R.tone(OSC, luz + 0.6, x, y) : ly === 3 ? R.tone(OSC, luz - 0.2, x, y) : R.tone(OSC, luz - 1.6 + (h(x, n, 3) < 0.1 ? -0.6 : 0), x, y));
  }
  for (let k = 0; k < 3; k++) { const ty = 128 - k * 12; linea(20, ty, 22, ty, hex('#5a4a30')); }
  for (let y = 80; y <= 146; y++) for (let x = 8; x <= 48; x++) { const d = Math.abs(x + 0.5 - 28), e0 = a_arco(32, 96 - y), e1 = a_arco(40, 98 - y) ; if (d > e0 && d <= e1 && y < 147 && (y <= 96 || d <= 20)) { const ang = Math.atan2(96 - y, x - 28); pset(x, y, Math.floor(ang * 5) !== Math.floor((ang + 0.04) * 5) ? A_PIEDRA[1] : R.tone(A_PIEDRA, 4 - (x - 28) / 20, x, y)); } }
  linea(20, 126, 42, 98, hex('#a08a5a')); linea(20, 127, 42, 99, hex('#5a4a30'));
  // el estandarte Beauséant (mitad negro, mitad blanco) colgado de su asta
  a_bauseant(R, 124, 42, 18, 44);
  // la estantería de documentos
  a_estante(R, 176, 230, 70, 146);
  // el suelo de losas en perspectiva
  a_losas(R, 0, 147, 319, 179, A_PIEDRA, 160, 40, 26, 6, (x, y) => { const b1 = Math.abs((x - 102) - (y - 147) * 1.2 - 30) < 22, b2 = Math.abs((x - 262) - (y - 147) * 1.2 - 30) < 22; return (b1 || b2 ? 0.9 : 0) - 0.2; }, 4);
  for (let x = 0; x < 320; x++) { pset(x, 146, A_PIEDRA[0]); pset(x, 147, A_PIEDRA[1]); }
  // el escritorio de las cuentas, un saco de grano y una escoba apoyada
  const es = a_escritorio(R, 236, 162);
  for (let y = 148; y <= 162; y++) { const w = Math.round(6 + Math.sin((y - 148) / 14 * Math.PI) * 2); for (let x = 50 - w; x <= 50 + w; x++) pset(x, y, R.tone(a_r(['#4a3a28', '#7a6444', '#a08a62', '#c0aa80']), 2.4 - (x - 50) / w + (h(x, y, 3) < 0.1 ? -1 : 0), x, y)); }
  rect(47, 146, 53, 147, hex('#5a4a34'));
  linea(156, 120, 168, 162, A_MADERA[3]); for (let k = -3; k <= 3; k++) linea(166 + k, 155, 168 + k * 2, 163, hex('#a88a48'));
  // la penumbra de las esquinas y la luz cálida de dentro
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.hypot((x - 160) / 190, (y - 100) / 120); if (v > 0.75 && R.b4(x, y) < (v - 0.75) * 2.4) { const B = R.buf, i = y * 320 + x; B[i] = a_mez(B[i], hex('#1a1420'), 0.35); } }
  a_tinte(R, 0, 0, 319, 179, hex('#7a4a2a'), 0.1);
  return es;
}

function a_torre(R, t, o) {
  const b = a_capa(R, 'torre', () => a_torreFijo(R)), es = a_datos.get('torre');
  R.copiar(b);
  // los haces de luz de las saeteras, con el polvo que flota dentro
  for (const sx of [102, 262]) {
    for (let y = 60; y <= 178; y++) { const c = sx + 30 + (y - 60) * 0.9, w = 3 + (y - 60) * 0.12; for (let x = Math.round(c - w); x <= c + w; x++) if (R.b4(x, y) < 0.32 + 0.1 * Math.sin(t * 0.7 + y * 0.02)) { const i = y * 320 + x, B = R.buf; if (x >= 0 && x < 320) B[i] = a_mez(B[i], hex('#ffe8c0'), 0.28); } }
    for (let k = 0; k < 10; k++) { const e = ((t * 0.05 + h(k, sx, 1)) % 1), y = Math.round(70 + e * 100), x = Math.round(sx + 30 + (y - 60) * 0.9 + Math.sin(t * 0.8 + k) * 4); if (Math.sin(t * 2 + k) > -0.4) R.pset(x, y, hex('#fff4d8')); }
  }
  // los tres arcones contra el muro (o.abre)
  const cofres = [[66, 156], [104, 156], [142, 156]];
  cofres.forEach(([x, y], i) => cofre(R, x, y, t, { s: 1.3, abre: o.abre ?? 0, vacio: true, k: i }));
  // la corona de luz colgada de la bóveda, con sus velas
  { const cx = 230, cy = 30, bal = Math.round(Math.sin(t * 0.8) * 1); R.linea(cx, 0, cx + bal, cy - 6, A_HIERRO[2]); R.linea(cx + bal, cy - 6, cx - 10 + bal, cy, A_HIERRO[2]); R.linea(cx + bal, cy - 6, cx + 10 + bal, cy, A_HIERRO[2]);
    R.rect(cx - 12 + bal, cy, cx + 12 + bal, cy + 1, A_HIERRO[2]); R.rect(cx - 12 + bal, cy, cx + 12 + bal, cy, A_HIERRO[4]); for (const dx of [-11, -4, 4, 11]) a_vela(R, cx + dx + bal, cy - 1, t + dx, 3, 0.6); }
  // la antorcha de la columna y la vela del escritorio
  a_antorcha(R, 160, 96, t, 0.9);
  a_vela(R, es.vela[0], es.vela[1] + 1, t, 5, 0.9);
  // un ratón que corre por el zócalo de un lado a otro
  { const u = (t * 0.18) % 2, f = u < 1 ? u : 2 - u, x = Math.round(60 + f * 100), dir = u < 1 ? 1 : -1, y = 158 + Math.round(Math.sin(t * 20) * 0.5);
    if ((t * 0.18) % 1 < 0.8) { R.rect(x - 2, y - 2, x + 2, y, hex('#6a6068')); R.pset(x + 3 * dir, y - 1, hex('#6a6068')); R.pset(x + 4 * dir, y - 1, hex('#e8a0a0')); R.pset(x + 1 * dir, y - 3, hex('#9a8a90')); R.linea(x - 3 * dir, y, x - 6 * dir, y - 1, hex('#8a7a80')); } }
  // una paloma posada en la saetera de la derecha
  a_paloma(R, 266, 85, t, -1, 2);
  return { suelo: 162, pies: [30, 82, 120, 190, 220], cofres, escritorio: [236, 162], libro: es.libro, escalera: [28, 146], estante: [176, 230], saeteras: [[102, 65], [262, 65]] };
}

function a_torreCofresFijo(R) {
  const { rect, pset, linea } = R;
  a_sillar(R, 0, 0, 319, 132, A_PIEDRA, 12, 26, (x, y) => { const d = Math.hypot((x - 160) * 0.5, y - 55) / 90; return Math.max(0, 1 - d) * 1.6 - 0.6 - (y / 132) * 0.4 + (x < 40 ? -0.6 : 0); }, 12);
  a_saetera(R, 160, 30, 76, 10);
  // la telaraña de la esquina, una argolla de hierro y un nicho con candil
  for (let k = 0; k < 6; k++) linea(0, 0, Math.round(Math.cos(k * 0.28) * 26), Math.round(Math.sin(k * 0.28) * 26), hex('#9a9aa8'));
  for (let r = 6; r < 26; r += 6) for (let k = 0; k < 5; k++) linea(Math.round(Math.cos(k * 0.28) * r), Math.round(Math.sin(k * 0.28) * r), Math.round(Math.cos((k + 1) * 0.28) * r), Math.round(Math.sin((k + 1) * 0.28) * r), hex('#8a8a98'));
  R.disco(40, 86, 4, A_HIERRO[3]); R.disco(40, 86, 2, A_PIEDRA[3]); rect(38, 80, 42, 82, A_HIERRO[2]);
  for (let y = 70; y <= 96; y++) for (let x = 254; x <= 276; x++) if (y > 78 || Math.abs(x + 0.5 - 265) <= a_arco(22, 78 - y)) pset(x, y, R.tone(A_PIEDRA, 1.2 + (x - 254) / 22 * 1.4 - (96 - y) / 26 * 0.4, x, y));
  rect(252, 97, 278, 98, A_PIEDRA[5]);
  // el suelo de losas grandes
  rect(0, 132, 319, 133, A_PIEDRA[0]);
  a_losas(R, 0, 134, 319, 179, A_PIEDRA, 160, 20, 44, 4, (x, y) => (Math.abs((x - 160) - (y - 134) * 0.6) < 30 ? 1 : 0) - 0.3, 6);
  // una moneda perdida y una linterna en el suelo
  R.disco(126, 170, 2, hex('#c8962a')); pset(125, 169, hex('#fff0a0'));
  rect(286, 150, 296, 164, A_HIERRO[1]); rect(287, 152, 295, 162, hex('#e8a850')); for (let y = 152; y <= 162; y += 3) rect(287, y, 295, y, A_HIERRO[2]); rect(285, 148, 297, 149, A_HIERRO[3]); R.disco(291, 146, 2, A_HIERRO[2]);
  a_bauseant(R, 64, 22, 22, 50);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.hypot((x - 160) / 180, (y - 80) / 110); if (v > 0.7 && R.b4(x, y) < (v - 0.7) * 2.2) { const B = R.buf, i = y * 320 + x; B[i] = a_mez(B[i], hex('#1a1420'), 0.4); } }
  a_tinte(R, 0, 0, 319, 179, hex('#7a4a2a'), 0.1);
}

function a_torreCofres(R, t, o) {
  R.copiar(a_capa(R, 'torreC', () => a_torreCofresFijo(R)));
  // el haz de la saetera y el polvo
  for (let y = 70; y <= 179; y++) { const c = 160 + (y - 70) * 0.6, w = 5 + (y - 70) * 0.18; for (let x = Math.round(c - w); x <= c + w; x++) if (x >= 0 && x < 320 && R.b4(x, y) < 0.34) { const B = R.buf, i = y * 320 + x; B[i] = a_mez(B[i], hex('#ffecc8'), 0.3); } }
  for (let k = 0; k < 14; k++) { const e = ((t * 0.04 + h(k, 3, 1)) % 1), y = Math.round(76 + e * 96), x = Math.round(160 + (y - 70) * 0.6 + Math.sin(t * 0.7 + k * 1.3) * 7); if (Math.sin(t * 1.6 + k) > -0.5) R.pset(x, y, hex('#fff6dc')); }
  // las antorchas, el candil del nicho y la linterna del suelo
  a_antorcha(R, 112, 76, t, 0.9); a_antorcha(R, 208, 76, t + 0.5, 0.9);
  a_vela(R, 265, 96, t, 6, 1);
  a_brillo(R, 291, 157, 14, hex('#ffc070'), 0.4 + 0.08 * Math.sin(t * 9));
  // los tres cofres grandes
  const cofres = [[64, 156], [160, 156], [256, 156]];
  const bocas = cofres.map(([x, y], i) => cofre(R, x, y, t, { s: 2.4, abre: o.abre ?? 0, vacio: true, k: i + 3 }));
  // una araña que baja de su hilo
  { const y = Math.round(18 + (Math.sin(t * 0.6) + 1) * 10); R.linea(12, 6, 12, y, hex('#b0b0c0')); R.rect(11, y, 13, y + 1, hex('#1a1a20')); R.pset(10, y + 2, hex('#1a1a20')); R.pset(14, y + 2, hex('#1a1a20')); R.pset(10, y - 1, hex('#1a1a20')); R.pset(14, y - 1, hex('#1a1a20')); }
  return { suelo: 164, pies: [16, 98, 194, 290], cofres, bocas, saetera: [160, 53] };
}

const A_AZUL = a_r(['#101a3a', '#18284e', '#223a6e', '#2e4c8a', '#3e62a6']);

const A_ORO = a_r(['#6a4a14', '#a07020', '#d0a030', '#f0c850', '#fff0a0']);

// un tapiz azul sembrado de lises de oro, con cenefa dorada, pliegues verticales, la barra de colgar y flecos
function a_tapiz(R, x0, y0, x1, y1, k = 0) {
  R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 2, A_MADERA[2]); R.rect(x0 - 2, y0 - 3, x1 + 2, y0 - 3, A_MADERA[5]);
  for (const ex of [x0 - 3, x1 + 3]) { R.disco(ex, y0 - 3, 2, A_ORO[2]); R.pset(ex - 1, y0 - 4, A_ORO[4]); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const borde = x - x0 < 3 || x1 - x < 3 || y - y0 < 3 || y1 - y < 3, plie = Math.sin((x - x0) / 9 * Math.PI) * 0.8;
    if (borde) { R.pset(x, y, (x + y) % 3 === 0 ? A_ORO[1] : R.tone(A_ORO, 2.6 + plie * 0.6, x, y)); continue; }
    R.pset(x, y, R.tone(A_AZUL, 2.4 + plie + ((x * 3 + y * 5) % 7 === 0 ? -0.6 : 0) + (R.vnoise(x * 0.2, y * 0.2 + k) - 0.5) * 0.6, x, y));
  }
  for (let y = y0 + 6, f = 0; y < y1 - 9; y += 11, f++) for (let x = x0 + 5 + (f % 2) * 6; x < x1 - 8; x += 12) { const sh = Math.sin((x + 2 - x0) / 9 * Math.PI) < -0.3; a_lis(R, x, y, sh ? A_ORO[1] : A_ORO[3], A_ORO[0]); if (!sh) R.pset(x + 2, y, A_ORO[4]); }
  for (let x = x0; x <= x1; x += 2) { R.pset(x, y1 + 1, A_ORO[2]); R.pset(x, y1 + 2, A_ORO[1]); }
}

// un ventanal gótico con parteluz y tracería; el hueco (vidrios emplomados claros) se deja como hueco para ver el cielo
function a_ventanal(R, x0, y0, x1, y1) {
  const w = x1 - x0, cx = (x0 + x1) / 2, sp = y0 + w * 0.87;
  for (let y = y0 - 4; y <= y1 + 4; y++) for (let x = x0 - 4; x <= x1 + 4; x++) {
    const d = Math.abs(x + 0.5 - cx), dentro = y <= y1 && Math.abs(x + 0.5 - cx) <= a_arco(w, sp - y) && y >= y0, marco = d <= a_arco(w + 8, sp - y + 4) && y <= y1 + 4;
    if (dentro) {
      const mullion = Math.abs(x + 0.5 - cx) < 1.2 && y > y0 + w * 0.45, sub = y > sp - 2 && y < sp + 1, rosa = Math.hypot(x + 0.5 - cx, y - (y0 + w * 0.42)) , anillo = Math.abs(rosa - w * 0.18) < 1;
      const plomo = (((x - x0) + (y - y0) * 2) % 6 === 0) || (((x - x0) - (y - y0) * 2 + 600) % 6 === 0);
      if (mullion || sub || anillo) R.pset(x, y, R.tone(A_PIEDRA, 4.4 - (x - cx) / w * 2, x, y));
      else if (plomo) R.pset(x, y, hex('#3a3a4a'));
      else R.pset(x, y, a_V);   // el resto queda hueco: se ve el cielo de detrás
    } else if (marco) R.pset(x, y, R.tone(A_PIEDRA, 3.2 + (x < cx ? 0.8 : -0.6) + (y > y1 ? 1.2 : 0), x, y));
  }
  R.rect(x0 - 6, y1 + 4, x1 + 6, y1 + 6, A_PIEDRA[5]); R.rect(x0 - 6, y1 + 7, x1 + 6, y1 + 7, A_PIEDRA[1]);
}

// suelo de baldosas a cuadros (rojo y crema) en perspectiva hacia (vx, vy)
function a_ajedrez(R, y0, y1, vx, vy, wb = 16, nf = 7) {
  const F = (y) => Math.pow((y - y0) / (y1 - y0 + 1), 0.7) * nf, A = a_r(['#4a1e18', '#7a3424', '#9a4a30', '#b8603c']), Bc = a_r(['#7a6a50', '#a8987a', '#c8b898', '#e0d4b8']);
  for (let y = y0; y <= y1; y++) { const fy = F(y), f = Math.floor(fy), d = (y - vy) / (y1 - vy);
    for (let x = 0; x < 320; x++) { const c = Math.floor((x - vx) / d / wb), cl = (c + f) & 1, j = Math.floor(F(y + 1)) !== f || Math.floor((x + 1 - vx) / d / wb) !== c;
      R.pset(x, y, j ? hex('#2a1c18') : R.tone(cl ? A : Bc, 1.6 + (fy - f < 0.15 ? 1 : 0) - (1 - d) * 0.6 + (h(c, f, 3) - 0.5) * 0.8 + (h(x, y, 4) < 0.05 ? -1 : 0), x, y)); } }
}

// un candelabro de pie de hierro con tres velas (base en el suelo; las llamas se pintan aparte)
function a_candelabro(R, x, base) {
  R.rect(x, base - 42, x + 1, base - 4, A_HIERRO[2]); R.rect(x, base - 42, x, base - 4, A_HIERRO[4]);
  R.linea(x - 6, base, x, base - 6, A_HIERRO[2]); R.linea(x + 7, base, x + 1, base - 6, A_HIERRO[2]); R.rect(x - 1, base - 24, x + 2, base - 22, A_HIERRO[3]);
  R.rect(x - 8, base - 42, x + 9, base - 41, A_HIERRO[3]); R.rect(x - 8, base - 42, x + 9, base - 42, A_HIERRO[4]);
  for (const dx of [-7, 0, 8]) R.rect(x + dx - 1, base - 44, x + dx + 1, base - 43, A_HIERRO[2]);
  return [[x - 7, base - 45], [x, base - 45], [x + 8, base - 45]];
}

function a_palacioFijo(R) {
  const { rect, pset, linea, poligono } = R;
  // el techo de vigas con estrellas pintadas (apagado, que es la zona del año)
  for (let y = 0; y <= 16; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 24 < 6 ? R.tone(A_MADERA, 2.4 + (x % 24 === 0 ? 1 : 0) - (y > 14 ? 1 : 0), x, y) : R.tone(a_r(['#141a30', '#1c2440', '#26304e']), 1.2 + y / 16, x, y));
  for (let x = 12; x < 320; x += 24) for (const y of [5, 11]) pset(x + (y === 11 ? 4 : 0), y, hex('#8a7a4a'));
  rect(0, 17, 319, 18, A_MADERA[1]);
  // el muro de piedra con el friso pintado
  a_sillar(R, 0, 19, 319, 140, A_PIEDRA, 7, 15, (x, y) => -0.3 - (y > 120 ? 0.4 : 0), 13);
  for (let x = 0; x < 320; x++) { for (let y = 22; y <= 30; y++) pset(x, y, y === 22 || y === 30 ? A_ORO[1] : (y === 26 && x % 8 < 4) ? A_ORO[3] : ((x >> 3) % 2 ? hex('#8a2a2a') : hex('#2a3a6a'))); }
  // los ventanales (huecos)
  a_ventanal(R, 100, 40, 130, 102); a_ventanal(R, 190, 40, 220, 102);
  // los tapices
  a_tapiz(R, 8, 46, 84, 120, 0); a_tapiz(R, 236, 50, 312, 120, 2);
  // el dosel azul con lises, el trono dorado con cojín rojo y el estrado de tres gradas
  poligono([[136, 44], [184, 44], [180, 52], [140, 52]], (x, y) => R.tone(A_AZUL, 3 + (y - 44) * 0.1, x, y)); rect(136, 43, 184, 43, A_ORO[3]);
  for (let x = 140; x <= 180; x += 3) { pset(x, 53, A_ORO[2]); pset(x + 1, 54, A_ORO[1]); }
  a_tapiz(R, 142, 56, 178, 124, 4);
  for (let s = 0; s < 3; s++) { const y = 128 + s * 4, x0 = 130 - s * 6, x1 = 190 + s * 6; rect(x0, y, x1, y + 3, R.tone(A_PIEDRA, 5 - s * 0.3, x0, y)); a_sillar(R, x0, y + 1, x1, y + 3, A_PIEDRA, 3, 10, () => 0.8 - s * 0.3, 20 + s); rect(x0, y, x1, y, A_PIEDRA[6]); }
  for (let y = 129; y <= 140; y++) for (let x = 140; x <= 180; x++) if (y < 132 && (x - 140) % 4 !== 3) pset(x, y, R.tone(a_r(['#5a1418', '#8a2028', '#b03038', '#d04a50']), 2 + Math.sin(x * 0.4) * 0.5, x, y));
  // el trono
  for (let y = 84; y <= 128; y++) for (let x = 150; x <= 170; x++) { const resp = y < 112 && (x < 153 || x > 167 || y < 88); if (y < 112 && !resp) continue; pset(x, y, R.tone(A_ORO, 2.4 - (x - 150) / 20 * 1.4 + (y % 6 === 0 ? -0.8 : 0) + (y < 88 ? 0.6 : 0), x, y)); }
  for (let y = 88; y < 112; y++) for (let x = 153; x <= 167; x++) pset(x, y, R.tone(A_AZUL, 2.6 - (x - 153) / 14 + (((x - 153) + (y - 88)) % 6 === 0 ? 1 : 0), x, y));
  a_lis(R, 158, 94, A_ORO[3], A_ORO[0]);
  for (const px of [149, 171]) { R.disco(px, 83, 2, A_ORO[3]); pset(px - 1, 82, A_ORO[4]); }
  rect(152, 110, 168, 114, hex('#b03038')); rect(152, 110, 168, 110, hex('#e05a60'));
  // un banco largo con cojines bajo el tapiz de la izquierda y un arcón de la casa real a la derecha
  for (let y = 124; y <= 140; y++) for (let x = 10; x <= 84; x++) pset(x, y, y < 128 ? R.tone(A_MADERA, 4 - (y - 124) * 0.5, x, y) : (x - 10) % 18 < 3 ? A_MADERA[2] : y > 132 ? A_MADERA[0] : A_MADERA[1]);
  for (let k = 0; k < 3; k++) { rect(16 + k * 24, 119, 32 + k * 24, 123, hex('#b03038')); rect(16 + k * 24, 119, 32 + k * 24, 119, hex('#e05a60')); pset(16 + k * 24, 123, A_ORO[3]); pset(32 + k * 24, 123, A_ORO[3]); }
  // el suelo a cuadros
  a_ajedrez(R, 141, 179, 160, 60, 16, 7);
  // una alfombra roja del estrado a la puerta
  for (let y = 141; y <= 179; y++) { const w = 16 + (y - 141) * 0.5; for (let x = Math.round(160 - w); x <= 160 + w; x++) pset(x, y, Math.abs(x - 160) > w - 2 ? A_ORO[2] : R.tone(a_r(['#4a1014', '#7a1a20', '#9a2630', '#b83440']), 2 + ((x + y) % 5 === 0 ? 1 : 0) - (y - 141) / 40, x, y)); }
  a_tinte(R, 0, 0, 319, 179, hex('#3a2a4a'), 0.08);
  return { velas: [...a_candelabro(R, 120, 150), ...a_candelabro(R, 200, 150)] };
}

function a_palacio(R, t, o) {
  // el cielo por los ventanales
  a_cielo(R, t, 104, 'alba', [160, 104]);
  a_pajaros(R, t, 3, 50, hex('#3a2a4a'), 10, 7);
  const d = (a_pegar(R, a_capa(R, 'palacio', () => a_palacioFijo(R))), a_datos.get('palacio'));
  // la luz de los ventanales sobre el suelo
  for (const wx of [115, 205]) for (let y = 141; y <= 179; y++) { const c = wx + (y - 141) * 0.7, w = 8 + (y - 141) * 0.3; for (let x = Math.round(c - w); x <= c + w; x++) if (R.b4(x, y) < 0.3) { const B = R.buf, i = y * 320 + x; B[i] = a_mez(B[i], hex('#ffe0c0'), 0.3); } }
  d.velas.forEach(([x, y], k) => a_vela(R, x, y, t + k, 4, 0.7));
  // el lebrel tumbado junto al estrado, que mueve la cola y levanta la oreja
  { const x = 212, y = 150, c = hex('#c8b8a0'), cs = hex('#9a8a74'), cola = Math.round(Math.sin(t * 4) * 2);
    R.rect(x, y - 5, x + 16, y - 1, c); R.rect(x, y - 1, x + 16, y, cs); R.rect(x - 6, y - 7, x, y - 2, c); R.rect(x - 9, y - 4, x - 6, y - 2, c); R.pset(x - 9, y - 3, hex('#1a1414')); R.pset(x - 4, y - 6, hex('#1a1414'));
    R.pset(x - 2, y - 8 - (Math.sin(t * 0.9) > 0.8 ? 1 : 0), cs); R.pset(x - 1, y - 8, cs); R.rect(x - 8, y, x - 2, y, cs); R.linea(x + 16, y - 3, x + 21, y - 6 + cola, c); R.rect(x + 1, y - 5, x + 3, y - 4, hex('#c83a3a')); }
  // los flecos de los tapices que se mecen con la corriente
  for (const [x0, x1, y1] of [[8, 84, 120], [236, 312, 120]]) for (let x = x0; x <= x1; x += 2) if (Math.sin(t * 2 + x * 0.3) > 0.2) R.pset(x + 1, y1 + 2, A_ORO[2]);
  return { suelo: 160, pies: [40, 70, 96, 220, 250, 276], trono: [160, 128], estrado: [124, 196, 128], ventanales: [[115, 70], [205, 70]], banco: [10, 84, 124] };
}

// un R que pinta desplazado dy filas hacia abajo (para bajar un grupo de objetos entero)
function a_desplaza(R, dy) {
  return { ...R, pset: (x, y, c) => R.pset(x, y + dy, c), rect: (x0, y0, x1, y1, c) => R.rect(x0, y0 + dy, x1, y1 + dy, c), linea: (x0, y0, x1, y1, c) => R.linea(x0, y0 + dy, x1, y1 + dy, c),
    disco: (x, y, r, c) => R.disco(x, y + dy, r, c), poligono: (pts, c) => R.poligono(pts.map(([x, y]) => [x, y + dy]), typeof c === 'function' ? (x, y) => c(x, y - dy) : c), tone: (r, v, x, y) => R.tone(r, v, x, y - dy) };
}

// la mesa de las cuentas de cerca
function a_mesaFijo(R) {
  const { rect, pset, linea, poligono } = R;
  a_sillar(R, 0, 0, 319, 139, A_PIEDRA, 6, 14, (x, y) => (y < 20 ? -0.8 : -0.3) + Math.max(0, 1 - Math.hypot(x - 267, y - 80) / 70) * 0.9, 14);
  for (let x = 0; x < 320; x++) { R.pset(x, 138, A_PIEDRA[5]); R.pset(x, 139, A_PIEDRA[1]); }
  a_tapiz(R, 6, 24, 226, 122, 6);
  a_ventanal(R, 252, 50, 282, 112);
  a_ajedrez(R, 140, 179, 180, 40, 22, 6);
  // la mesa (bajada 30 px con un R desplazado): tablero en perspectiva con vetas, faldón tallado, patas torneadas y travesaño
  ((R) => { const { rect, pset, linea, poligono } = R;
  poligono([[98, 112], [286, 112], [292, 128], [92, 128]], (x, y) => R.tone(A_MADERA, 4 + ((y - 112) / 16) * -0.6 + (R.vnoise(x * 0.05, y * 0.8) - 0.5) * 1.6 + ((x + y * 7) % 23 === 0 ? -1 : 0), x, y));
  rect(92, 128, 292, 129, A_MADERA[5]);
  for (let y = 130; y <= 138; y++) for (let x = 92; x <= 292; x++) pset(x, y, ((x - 92) % 20 < 2 || y === 138) ? A_MADERA[1] : R.tone(A_MADERA, 2.8 + ((x - 92) % 20 === 10 && y > 131 && y < 137 ? 1.5 : 0) - (y - 130) * 0.1, x, y));
  for (const lx of [100, 280]) { for (let y = 139; y <= 164; y++) { const w = 2 + Math.round(Math.abs(Math.sin((y - 139) * 0.35)) * 1.5); for (let x = lx - w; x <= lx + w; x++) pset(x, y, R.tone(A_MADERA, 3.4 - (x - lx) / w * 1.4, x, y)); } }
  rect(100, 156, 280, 157, A_MADERA[2]); rect(100, 156, 280, 156, A_MADERA[4]);
  rect(94, 165, 288, 166, hex('#2a1810'));
  // el paño de contar a cuadros con sus fichas (las fichas se mueven aparte)
  poligono([[228, 114], [280, 114], [284, 126], [226, 126]], (x, y) => ((x >> 2) + ((y - 114) >> 1)) % 2 ? hex('#2a5a3a') : hex('#3a7a4a'));
  for (let x = 228; x <= 282; x += 9) linea(x, 114, x + 2, 126, hex('#c8c0a0'));
  // montones de monedas, la bolsa abierta, el tintero con pluma, el sello y la cinta de lacre
  for (let k = 0; k < 5; k++) { const mx = 104 + k * 6, mh = 3 + ((k * 7) % 5) * 2; for (let y = 124 - mh; y <= 124; y++) rect(mx, y, mx + 4, y, (y - 124) % 2 ? hex('#c8962a') : hex('#f0c850')); pset(mx, 124 - mh, hex('#fff0a0')); }
  poligono([[134, 126], [144, 126], [146, 118], [140, 114], [132, 118]], hex('#7a5a3a')); rect(134, 116, 144, 117, hex('#5a3a22')); for (let k = 0; k < 4; k++) pset(136 + k * 2, 115, hex('#f0c850'));
  rect(218, 118, 222, 124, hex('#1a1a2a')); rect(218, 118, 222, 118, hex('#4a4a6a')); linea(221, 118, 228, 104, hex('#f0ece0')); linea(222, 118, 228, 105, hex('#c8c0b0'));
  R.disco(212, 124, 3, hex('#a8303a')); R.disco(212, 124, 2, hex('#c8484a')); pset(211, 123, hex('#e87a7a')); linea(209, 126, 204, 128, hex('#a8303a'));
  // el libro de cuentas abierto, grande, con renglones de trazos y columnas de cifras
  poligono([[150, 124], [182, 125], [182, 106], [152, 104]], hex('#efe2bc')); poligono([[182, 125], [214, 124], [212, 104], [182, 106]], hex('#e6d6aa'));
  rect(148, 125, 216, 126, hex('#5a2a1a')); linea(182, 106, 182, 125, hex('#a08a60'));
  for (let k = 0; k < 7; k++) { const y = 108 + k * 2.4; linea(156, y, 170, y + 0.3, hex('#6a5a48')); linea(173, y + 0.3, 179, y + 0.4, hex('#8a3a2a')); linea(186, y + 0.2, 200, y, hex('#6a5a48')); linea(203, y, 209, y, hex('#8a3a2a')); }
  // el reguero de pliegos sobre la mesa
  for (let k = 0; k < 9; k++) { const x = 216 + k * 9, y = 124 - (k % 2) * 2; if (x > 290) break; poligono([[x, y], [x + 9, y - 1 + (k % 2) * 2], [x + 9, y + 2 + (k % 2) * 2], [x, y + 3]], k % 2 ? hex('#e6d6aa') : hex('#d4c294')); }
  })(a_desplaza(R, 30));
  // el reguero de pliegos que cae por el canto de la mesa hasta el suelo, y el montón
  for (let k = 0; k < 4; k++) { const y = 157 + k * 5; poligono([[292 - (k % 2) * 6, y], [300 + (k % 2) * 4, y + 3], [298 + (k % 2) * 4, y + 9], [290 - (k % 2) * 6, y + 6]], k % 2 ? hex('#e6d6aa') : hex('#cbb888')); linea(292 - (k % 2) * 6, y + 1, 298, y + 4, hex('#8a7a5a')); }
  for (let k = 0; k < 14; k++) { const x = 270 + (k % 5) * 11 + (k >> 2) * 3, y = 176 - Math.floor(k / 5) * 4 - (k % 2); poligono([[x, y], [x + 12, y - 2], [x + 13, y + 2], [x + 1, y + 4]], k % 2 ? hex('#e6d6aa') : hex('#d0bc8c')); linea(x + 2, y + 1, x + 10, y - 1, hex('#8a7a5a')); }
  a_tinte(R, 0, 0, 319, 179, hex('#3a2a4a'), 0.06);
}

function a_palacioMesa(R, t, o) {
  a_cielo(R, t, 116, 'alba', [270, 116]);
  a_pegar(R, a_capa(R, 'mesa', () => a_mesaFijo(R)));
  const u = Math.max(0, Math.min(1, o.paginas ?? 0));
  // la vela grande de la mesa
  a_vela(R, 124, 143, t, 8, 1.1);
  // la lámpara de bronce colgada de la viga, que se mece
  { const an = Math.sin(t * 0.9) * 0.08, lx = Math.round(240 + Math.sin(an) * 40), ly = Math.round(Math.cos(an) * 40) + 4;
    R.linea(240, 0, lx, ly - 4, A_HIERRO[2]); R.poligono([[lx - 6, ly - 2], [lx + 6, ly - 2], [lx + 3, ly + 3], [lx - 3, ly + 3]], A_ORO[1]); R.linea(lx - 6, ly - 2, lx + 6, ly - 2, A_ORO[3]); R.pset(lx - 4, ly - 1, A_ORO[4]);
    for (const dx of [-5, 0, 5]) a_vela(R, lx + dx, ly - 2, t + dx, 2, 0.5); }
  const R0 = R; { const R = a_desplaza(R0, 30);
  // las fichas que se corren por el paño
  for (let k = 0; k < 6; k++) { const x = Math.round(232 + ((k * 9 + (u > 0 ? t * 6 : 0) * (k % 2 ? 1 : 0.5)) % 48)), y = 116 + (k % 3) * 4; R.disco(x, y, 1, hex('#e8e0c8')); R.pset(x, y - 1, hex('#ffffff')); }
  }
  { const R = a_desplaza(R0, 30);
  // la hoja que voltea (cada vez más deprisa) y el reguero de pliegos que se alarga por el suelo hasta salir del plano
  { const vel = 0.6 + u * 2.4, f = (t * vel) % 1, ang = f * Math.PI, ex = 182 + Math.cos(ang) * 28, ey = 106 - Math.sin(ang) * 12;
    if (u > 0) { R.poligono([[182, 106], [182, 125], [ex, 125 - Math.sin(ang) * 8], [ex, ey]], f < 0.5 ? hex('#f4ead0') : hex('#e0d0a4')); R.linea(182, 106, Math.round(ex), Math.round(ey), hex('#a08a60')); } }
  }
  const n = Math.floor(u * 12);
  for (let k = 0; k < n; k++) { const x = 300 + k * 10 - Math.floor(u * 40), y = 172 + (k % 2) * 2; if (x > 330) break; R.poligono([[x, y], [x + 11, y - 2], [x + 12, y + 2], [x + 1, y + 4]], k % 2 ? hex('#efe2bc') : hex('#d4c294')); R.linea(x + 2, y + 1, x + 9, y - 1, hex('#8a7a5a')); }
  // una hoja suelta que planea hasta el montón
  { const e = (t * 0.4) % 1, x = Math.round(296 + Math.sin(e * 9) * 6), y = Math.round(158 + e * 16); if (u > 0.1) R.poligono([[x, y], [x + 6, y + (e * 10 % 2 > 1 ? 2 : -1)], [x + 6, y + 3], [x, y + 3]], hex('#f4ead0')); }
  return { suelo: 170, pies: [30, 54, 76], mesa: [92, 292, 142, 158], libro: [182, 145], vela: [124, 135], monedas: [104, 130, 150], pano: [228, 280, 150], montonPliegos: [270, 320, 172] };
}

// Notre-Dame a contraluz, vista de costado (x0 = fachada; s = escala): dos torres cuadradas, la nave con arbotantes,
// la aguja del crucero y el ábside; con filo de luz a la izquierda y rosetones apagados
function a_notreDame(R, x0, base, s, c0, c1, c2) {
  const S = (v) => Math.round(v * s), { rect, linea, poligono, pset } = R;
  for (const tx of [0, 16]) { rect(x0 + S(tx), base - S(54), x0 + S(tx + 13), base, c0); rect(x0 + S(tx), base - S(54), x0 + S(tx), base, c1); for (let k = 0; k < 2; k++) rect(x0 + S(tx + 4 + k * 4), base - S(46), x0 + S(tx + 5 + k * 4), base - S(34), c2); for (let x = x0 + S(tx); x <= x0 + S(tx + 13); x += 3) pset(x, base - S(55), c1); }
  rect(x0 + S(13), base - S(40), x0 + S(16), base, c0); R.disco(x0 + S(14.5), base - S(28), S(4), c2); R.disco(x0 + S(14.5), base - S(28), S(3), c0);
  rect(x0 + S(29), base - S(30), x0 + S(84), base, c0);
  poligono([[x0 + S(29), base - S(30)], [x0 + S(34), base - S(38)], [x0 + S(80), base - S(38)], [x0 + S(84), base - S(30)]], c0);
  linea(x0 + S(34), base - S(38), x0 + S(80), base - S(38), c1);
  for (let k = 0; k < 6; k++) { const ax = x0 + S(34 + k * 9); linea(ax, base - S(14), ax + S(5), base - S(28), c0); rect(ax - 1, base - S(16), ax, base, c0); rect(ax + S(2), base - S(24), ax + S(3), base - S(18), c2); }
  rect(x0 + S(84), base - S(26), x0 + S(92), base, c0); R.disco(x0 + S(88), base - S(26), S(5), c0);
  const ax = x0 + S(60); poligono([[ax - S(2), base - S(38)], [ax, base - S(66)], [ax + S(2), base - S(38)]], c0); linea(ax, base - S(66), ax, base - S(40), c1);
}

function a_senaFijo(R, cerca) {
  const { rect, pset, linea, poligono } = R, d = { ventanas: [] };
  const C0 = hex('#2a1c3a'), C1 = hex('#e8906a'), C2 = hex('#3e2a4a'), hor = cerca ? 114 : 104, s = cerca ? 0.62 : 1;
  // la otra orilla, lejos y en la bruma
  a_lejos(R, hor - (cerca ? 2 : 4), 9, hex('#6a4a72'), hex('#7a5280'), hex('#b07a8a'));
  if (!cerca) {
    // el palacio de la Cité con sus torres de chapitel y la Santa Capilla
    a_sillar(R, 50, 70, 128, hor, a_r(['#1e1428', '#2a1c38', '#34243e', '#3e2c48']), 4, 9, null, 30);
    for (const [tx, tw, th] of [[50, 10, 66], [64, 10, 62], [96, 8, 58]]) { rect(tx, th, tx + tw, hor, C0); poligono([[tx - 1, th], [tx + tw / 2, th - tw * 1.4], [tx + tw + 1, th]], C2); pset(tx, th + 3, C1); }
    rect(108, 64, 124, hor, C0); poligono([[106, 64], [116, 50], [126, 64]], C2); linea(116, 50, 116, 30, C0); linea(115, 40, 117, 40, C0); for (let k = 0; k < 3; k++) rect(110 + k * 5, 70, 111 + k * 5, 84, hex('#6a3a4a'));
    a_notreDame(R, 158, hor, 1, C0, C1, C2);
    // las casas de la isla
    for (let x = 128; x < 158; x += 7) { const hh = 14 + (x % 3) * 4; rect(x, hor - hh, x + 6, hor, C0); poligono([[x - 1, hor - hh], [x + 3, hor - hh - 5], [x + 7, hor - hh]], C2); d.ventanas.push([x + 2, hor - hh + 5]); }
    for (let x = 252; x < 320; x += 8) { const hh = 10 + (x % 4) * 3; rect(x, hor - hh, x + 7, hor, C0); poligono([[x - 1, hor - hh], [x + 3, hor - hh - 4], [x + 8, hor - hh]], C2); d.ventanas.push([x + 3, hor - hh + 4]); }
    // el puente con casas encima y sus arcos
    rect(0, hor - 6, 48, hor + 8, C0);
    for (let k = 0; k < 4; k++) { const ax = 4 + k * 12; for (let y = hor + 1; y <= hor + 8; y++) for (let x = ax; x <= ax + 8; x++) if ((x - ax - 4) ** 2 + ((y - hor - 8) * 1.3) ** 2 < 18) pset(x, y, a_V); }
    for (let x = 0; x < 48; x += 8) { const hh = 10 + (x % 3) * 3; rect(x, hor - 6 - hh, x + 7, hor - 6, C2); poligono([[x - 1, hor - 6 - hh], [x + 3, hor - 10 - hh], [x + 8, hor - 6 - hh]], C0); d.ventanas.push([x + 3, hor - 2 - hh]); }
    for (let k = 0; k < 10; k++) d.ventanas.push([60 + k * 7, 76 + (k % 3) * 8]);
    for (let k = 0; k < 6; k++) d.ventanas.push([192 + k * 8, hor - 12]);
    // el filo de luz del ocaso por la izquierda de las siluetas
    for (let y = 20; y < hor; y++) for (let x = 1; x < 320; x++) { const i = y * 320 + x, B = R.buf; if (B[i] !== a_V && B[i - 1] === a_V && R.b2(x, y) < 0.75) B[i] = C1; }
  } else {
    // de cerca: la ciudad pequeña y lejos, a la derecha
    a_notreDame(R, 196, hor, s, C0, C1, C2);
    for (let x = 140; x < 196; x += 6) { const hh = 8 + (x % 3) * 3; rect(x, hor - hh, x + 5, hor, C0); poligono([[x - 1, hor - hh], [x + 2, hor - hh - 3], [x + 6, hor - hh]], C2); d.ventanas.push([x + 2, hor - hh + 3]); }
    for (let x = 254; x < 320; x += 6) { const hh = 7 + (x % 4) * 2; rect(x, hor - hh, x + 5, hor, C0); poligono([[x - 1, hor - hh], [x + 2, hor - hh - 3], [x + 6, hor - hh]], C2); d.ventanas.push([x + 2, hor - hh + 3]); }
    for (let y = 60; y < hor; y++) for (let x = 1; x < 320; x++) { const i = y * 320 + x, B = R.buf; if (B[i] !== a_V && B[i - 1] === a_V && R.b2(x, y) < 0.75) B[i] = C1; }
    // la lengua de tierra del medio, con su hierba (aquí se plantan los mirones pequeños)
    for (let y = 128; y <= 138; y++) for (let x = 0; x < 170; x++) { const borde = 128 + Math.round((x / 170) ** 2 * 10); if (y < borde) continue; pset(x, y, y === borde ? hex('#5a6a4a') : R.tone(a_r(['#1e2a1e', '#2a3a26', '#3a4a30', '#4a5a3a']), 2.2 - (y - 128) * 0.12 + (h(x, y, 3) - 0.5), x, y)); }
  }
  return d;
}

// el primer término de la orilla: barro, hierba, piedras, la barca amarrada al poste (los juncos se pintan aparte)
function a_orillaFijo(R, cerca) {
  const { rect, pset, linea, poligono } = R, y0 = cerca ? 150 : 150;
  for (let y = y0; y <= 179; y++) for (let x = 0; x < 320; x++) { const borde = y0 + Math.round(Math.sin(x * 0.03) * 3 + Math.sin(x * 0.11) * 1.5); if (y < borde) continue;
    const hierba = y - borde > 4; pset(x, y, y - borde < 2 ? hex('#6a5a48') : hierba ? R.tone(a_r(['#141e14', '#1e2c1c', '#2a3a24', '#3a4a2e', '#4e5e3a']), 2.4 + (R.vnoise(x * 0.12, y * 0.25) - 0.5) * 1.8 - (y - y0) * 0.03 + (h(x, y, 5) < 0.06 ? 1.2 : 0), x, y) : R.tone(A_BARRO, 2.4 + (h(x, y, 6) - 0.5), x, y)); }
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 60) * 319), y = Math.round(y0 + 6 + h(k, 2, 60) * 24); R.disco(x, y, 1 + (k % 2), hex('#5a5260')); pset(x - 1, y - 1, hex('#8a8290')); }
  if (cerca) {
    // el embarcadero de tablas sobre pilotes que entra en el agua
    for (let k = 0; k < 5; k++) { const px = 30 + k * 24; rect(px, 142, px + 2, 160, A_MADERA[1]); rect(px, 142, px, 160, A_MADERA[3]); }
    for (let y = 140; y <= 147; y++) for (let x = 18; x <= 150; x++) pset(x, y, (x - 18) % 7 === 6 ? A_MADERA[0] : y === 140 ? A_MADERA[5] : R.tone(A_MADERA, 3.4 - (y - 140) * 0.3 + (h((x - 18) / 7 | 0, 3, 61) - 0.5), x, y));
    rect(18, 148, 150, 148, A_MADERA[0]);
    // el sauce: tronco nudoso y copa colgante (las ramas que se mecen se pintan aparte)
    for (let y = 40; y <= 160; y++) { const w = 4 + Math.round((y - 40) / 40) + (y > 150 ? (y - 150) : 0), cx = 12 + Math.round(Math.sin(y * 0.05) * 3); for (let x = cx - w; x <= cx + w; x++) pset(x, y, R.tone(a_r(['#140e0c', '#22180e', '#3a2a1c', '#4e3a26']), 2.2 - (x - cx) / w * 1.2 + (h(x, y >> 2, 3) < 0.15 ? -1 : 0), x, y)); }
    for (let k = 0; k < 40; k++) { const cx = Math.round(h(k, 1, 62) * 80 - 6), cy = Math.round(30 + h(k, 2, 62) * 36); R.disco(cx, cy, 5 + (k % 3), R.tone(a_r(['#141e18', '#1e2e22', '#2a3e2c', '#3a5236']), 1.2 + h(k, 3, 62) * 1.8, cx, cy)); }
  } else {
    // la barca amarrada al poste con su farol
    poligono([[228, 160], [298, 160], [292, 168], [234, 168]], (x, y) => R.tone(A_MADERA, 3 - (y - 160) * 0.3 + ((y - 160) % 3 === 0 ? -0.8 : 0), x, y)); rect(228, 159, 298, 159, A_MADERA[5]);
    for (const bx of [246, 264, 282]) rect(bx, 158, bx + 1, 160, A_MADERA[2]);
    linea(232, 156, 286, 154, A_MADERA[4]);
    rect(214, 136, 217, 168, A_MADERA[2]); rect(214, 136, 214, 168, A_MADERA[4]); rect(213, 135, 218, 135, A_MADERA[5]); linea(217, 150, 230, 160, hex('#a89068'));
    rect(218, 136, 223, 137, A_HIERRO[2]);
  }
}

// el río: copia de la franja de cielo y siluetas reflejada, que tiembla con ondas, y brillos que corren
function a_rio(R, t, y0, y1, hor, sol) {
  const B = R.buf;
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / (y1 - y0), ry = Math.max(0, Math.min(179, hor - (y - y0) - 1));
    for (let x = 0; x < 320; x++) { const ox = Math.round(Math.sin(y * 0.9 + t * 2.4 + x * 0.05) * (1 + p * 2)), sx = Math.max(0, Math.min(319, x + ox));
      let c = B[ry * 320 + sx]; c = a_mez(c, hex('#1a1638'), 0.28 + p * 0.3);
      if (Math.abs(x - sol) < 10 + p * 24 && Math.sin(x * 0.7 + y * 2.3 - t * 3) > 0.7 && (y & 1)) c = hex('#f8c070');
      else if (h(x >> 2, y, 70) < 0.06 && Math.sin(t * 3 + x) > 0) c = a_mez(c, hex('#f0b0a0'), 0.4);
      B[y * 320 + x] = c; } }
  for (let x = 0; x < 320; x++) B[y0 * 320 + x] = a_mez(B[y0 * 320 + x], hex('#f0a080'), 0.4);
}

// una barca con su barquero que empuja con la pértiga (x = popa, y = línea del agua, dir)
function a_barca(R, x, y, t, dir, k = 0) {
  const c = hex('#2a1a1a');
  R.poligono([[x, y - 3], [x + 22 * dir, y - 3], [x + 19 * dir, y], [x + 3 * dir, y]], c); R.linea(x, y - 3, x + 22 * dir, y - 3, hex('#8a5a3a'));
  const bx = x + 6 * dir, bal = Math.sin(t * 1.5 + k) * 1.5;
  R.rect(bx - 1, y - 11, bx + 1, y - 4, c); R.disco(bx, y - 13, 2, c); R.linea(bx + Math.round(bal), y - 14, bx - 6 * dir + Math.round(bal * 2), y + 4, hex('#4a3020'));
  if (k % 2) { R.rect(x + 12 * dir, y - 6, x + 16 * dir, y - 4, hex('#5a4030')); }
  for (let i = 1; i < 4; i++) R.pset(x - i * 3 * dir, y + (i & 1), hex('#c8a0b0'));
}

// la columna de humo lejana (sin fuego): sube detrás de la isla, se ensancha y se dobla con el viento hacia la izquierda
function a_columnaHumo(R, t, x, base, alto, u, s = 1) {
  if (u <= 0) return;
  for (let i = 0; i < 26; i++) { const e = ((t * 0.05 + i / 26) % 1), y = base - e * alto * u, xx = x - e * e * 40 * s + Math.sin(t * 0.7 + i) * 2 * e; if (y < 22) continue;
    a_bocanada(R, xx, y, (2 + e * 8) * s, e < 0.4 ? hex('#4a3a4a') : hex('#6a5664'), (0.75 - e * 0.45) * Math.min(1, u * 1.5)); }
}

// juncos y espadañas que se mecen (primer término)
function a_juncos(R, t, x0, x1, base, k = 0) {
  for (let x = x0; x <= x1; x += 2) { if (h(x, k, 80) < 0.35) continue; const alto = 8 + Math.round(h(x, k, 81) * 14), v = Math.sin(t * 1.6 + x * 0.15) * 2;
    R.linea(x, base, Math.round(x + v), base - alto, h(x, k, 82) < 0.5 ? hex('#3a4a2a') : hex('#5a6a3a'));
    if (h(x, k, 83) < 0.2) { R.rect(Math.round(x + v), base - alto - 3, Math.round(x + v) + 1, base - alto, hex('#5a3a22')); } }
}

// gente pequeña (8–10 px) de espaldas, de pie, con capucha o sombrero (y = pies)
function a_gentecilla(R, x, y, t, k) {
  const ropa = [hex('#5a3a2a'), hex('#3a4a5a'), hex('#6a2a2a'), hex('#4a4a3a'), hex('#5a4a6a')][k % 5], pelo = [hex('#2a1a12'), hex('#5a3a1a'), hex('#8a8070')][k % 3], bal = Math.sin(t * 1.2 + k * 2) > 0.8 ? 1 : 0;
  R.rect(x - 2, y - 6, x + 2, y, ropa); R.rect(x - 2, y - 6, x - 2, y, a_mez(ropa, 0xffffffff, 0.2)); R.pset(x - 1, y, hex('#1a1210')); R.pset(x + 1, y, hex('#1a1210'));
  R.disco(x + bal * 0, y - 8, 2, k % 2 ? ropa : pelo); if (k % 3 === 2) R.rect(x - 3, y - 10, x + 3, y - 10, hex('#3a2a1a'));
  if (k % 4 === 1) { R.rect(x - 3, y - 5, x - 3, y - 2, ropa); R.rect(x - 5, y - 3, x - 4, y - 2, hex('#2a1a12')); }
}

function a_sena(R, t, o) {
  a_cielo(R, t, 104, 'ocaso', [40, 104]);
  a_pajaros(R, t, 6, 44, hex('#2a1c3a'), 9, 9);
  a_columnaHumo(R, t, 226, 100, 76, o.humo ?? 0);
  const b = a_capa(R, 'sena', () => a_senaFijo(R, false)), d = a_datos.get('sena');
  a_pegar(R, b, 0, 112);
  a_rio(R, t, 105, 152, 104, 40);
  // ventanas que se encienden
  d.ventanas.forEach(([x, y], k) => { if (Math.sin(t * 0.3 + k * 1.7) > -0.2 && y < 105) { R.pset(x, y, Math.sin(t * 5 + k) > 0.6 ? hex('#ffe8a0') : hex('#f0a850')); R.pset(x, y + 1, hex('#a0582a')); } });
  // las barcas
  a_barca(R, Math.round(((t * 4 + 40) % 380) - 30), 126, t, 1, 0);
  a_barca(R, Math.round(330 - ((t * 3 + 120) % 380)), 142, t, -1, 1);
  a_pegar(R, a_capa(R, 'senaO', () => a_orillaFijo(R, false)), 140, 179);
  a_juncos(R, t, 0, 200, 156, 0); a_juncos(R, t, 300, 319, 156, 1);
  a_vela(R, 220, 141, t, 3, 1);
  return { suelo: 164, pies: [40, 80, 120, 150, 176], horizonte: 104, rio: [105, 152], humo: [226, 100], barca: [228, 298, 160], poste: [215, 136], notreDame: [158, 250] };
}

function a_orilla(R, t, o) {
  a_cielo(R, t, 114, 'ocaso', [300, 114]);
  a_pajaros(R, t, 5, 50, hex('#2a1c3a'), 8, 10);
  a_columnaHumo(R, t, 228, 112, 70, o.humo ?? 0, 0.7);
  const b = a_capa(R, 'orilla', () => a_senaFijo(R, true)), d = a_datos.get('orilla');
  a_pegar(R, b, 0, 139);
  a_rio(R, t, 115, 152, 114, 300);
  a_pegar(R, b, 128, 139);
  d.ventanas.forEach(([x, y], k) => { if (Math.sin(t * 0.3 + k * 1.3) > -0.3) R.pset(x, y, Math.sin(t * 5 + k) > 0.6 ? hex('#ffe8a0') : hex('#f0a850')); });
  // la gente pequeña de espaldas en la lengua de tierra, mirando hacia el humo
  for (let k = 0; k < 6; k++) a_gentecilla(R, 40 + k * 18 + (k % 2) * 4, 131 + Math.round((((40 + k * 18) / 170) ** 2) * 8), t, k);
  a_barca(R, Math.round(((t * 3 + 200) % 380) - 30), 146, t, 1, 2);
  a_pegar(R, a_capa(R, 'orillaO', () => a_orillaFijo(R, true)), 28, 179);
  // las ramas del sauce que cuelgan y se mecen
  for (let k = 0; k < 16; k++) { const x0 = Math.round(h(k, 4, 62) * 76 - 4), y0 = 40 + Math.round(h(k, 5, 62) * 20), L = 30 + Math.round(h(k, 6, 62) * 40);
    for (let j = 0; j < L; j += 2) { const x = Math.round(x0 + Math.sin(t * 1.1 + k + j * 0.05) * j * 0.08), y = y0 + j; R.pset(x, y, j % 4 ? hex('#3a5a32') : hex('#5a7a3e')); } }
  a_juncos(R, t, 150, 319, 162, 2);
  return { suelo: 168, pies: [90, 130, 170, 200, 230], horizonte: 114, embarcadero: [18, 150, 140], humo: [228, 112], gente: [40, 140, 131] };
}

// umbral del tramado ordenado 4 × 4 para el píxel (x, y), entre 0 y 1
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_um = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function b_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

const b_pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

// los colores de Ultramar y del puerto
const b_C = b_pal({
  calor: ['#5a9ad0', '#6eaad8', '#88bce0', '#a6cce4', '#c4dae6', '#dde4e0', '#f0eada'], nubeCalor: ['#c4d2de', '#e6eef2', '#ffffff'],
  dia: ['#3a86d6', '#4c98de', '#68ace6', '#88c0ec', '#a8d2f0', '#cce2ee'], nubeDia: ['#a8cce8', '#d8ecfa', '#ffffff'],
  noche: ['#080c22', '#0c1230', '#121a3c', '#1a2448', '#243054', '#2e3c5e', '#3a4866'], nubeNoche: ['#1c2440', '#28324e', '#38445e'],
  oroP: ['#dcb878', '#b48c52', '#f2d89a', '#9a7446'], oroPS: '#7e5c38',   // la piedra dorada de Jerusalén: cuerpo, sombra, luz, junta
  casa: ['#e8d2a4', '#c4a676', '#f8eac8', '#a88a5e'], gris: ['#a89e8a', '#7e7564', '#c8bea8', '#686050'],
  cupula: ['#f2c440', '#b88420', '#fff0a0', '#d8a028'], plomo: ['#8e9aa8', '#66707e', '#bcc6d2'], azulejo: ['#2e66a6', '#5ab0d8', '#1e4a7a', '#3a9a8a'],
  colina: ['#c8b48e', '#a89470', '#e8dcc4'], colina2: ['#cfa872', '#a8804e', '#e2c08a'], colina3: ['#d8b07a', '#b08850', '#ecc890'],
  polvo: ['#e8d4a8', '#c8ae80', '#f6e8c8', '#a88e62'], olivo: ['#5e7048', '#3e4e30', '#8a9a6a', '#a8b88a'], ciprés: ['#2a4a2a', '#1a3420', '#3e6438'],
  cera: ['#a02a32', '#6e1820', '#cc4a48', '#ee8070', '#4a0e16'], latón: ['#d8a840', '#9a7020', '#f6dc88'],
  mar: ['#2a6aa8', '#3a80bc', '#5aa0d0', '#a8d4ee'], marN: ['#0e1a30', '#14243e', '#1c3050', '#2a4060'], niebla: '#8a98b0',
  casco: ['#4a2e1c', '#6a4228', '#8a5a34', '#2a1a10'], vela: ['#e8dcc0', '#b8a888', '#fff6e0'], farol: ['#ffd070', '#ffb040', '#fff4c0'],
  muro: ['#a49a88', '#7a7262', '#c4baa6', '#5e574a'], baldosa: ['#b8643c', '#8a4628', '#d8a050', '#a87a30'], tela: ['#8a2028', '#5e141c', '#b03a3a', '#d8a838'],
  madera: ['#83552c', '#5e3a1e', '#a8743c', '#3a2214'], ropa: ['#c8b89a', '#8a6a4a', '#5a7a9a', '#a85a3a', '#e8e0cc', '#6a8a5a'],
});

const b_PIEL = hex('#e8b088');

const b_FIJOS = new WeakMap();

// un fondo fijo: se pinta una vez en su búfer de R.nuevo() y se copia en cada fotograma; con cielo (la función que pinta
// solo el cielo) devuelve además la máscara del cielo que queda a la vista, para que nubes y pájaros pasen por detrás
function b_fijo(R, clave, dibuja, cielo = null) {
  let m = b_FIJOS.get(R); if (!m) b_FIJOS.set(R, (m = new Map()));
  let e = m.get(clave);
  if (!e) {
    const b = R.nuevo(), prev = R.usar(b); R.recorte(null); let mask = null;
    if (cielo) { cielo(); const s = b.slice(); dibuja(); mask = new Uint8Array(320 * 180); for (let i = 0; i < mask.length; i++) mask[i] = b[i] === s[i] ? 1 : 0; } else dibuja();
    R.usar(prev); e = { b, mask }; m.set(clave, e);
  }
  R.copiar(e.b); return e.mask;
}

// pinta el píxel solo si es cielo a la vista (m: la máscara de b_fijo)
const b_psM = (R, m, x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) R.buf[y * 320 + x] = c; };

function b_discoM(R, m, cx, cy, r, c) { cx = Math.round(cx); cy = Math.round(cy); for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r * 0.6) b_psM(R, m, cx + i, cy + j, c); }

// mezcla el píxel con el color c en la proporción a (para luces, sombras y niebla)
const b_tiñe = (R, x, y, c, a) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; const i = y * 320 + x, B = R.buf; B[i] = b_mez(B[i], c, a); };

// degradado tramado de y0 a y1 por los colores cols (de arriba abajo)
function b_degradado(R, y0, y1, cols) {
  const B = R.buf, n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), p = u - i;
    for (let x = 0; x < 320; x++) B[y * 320 + x] = b_um(x, y) < p ? cols[i + 1] : cols[i]; }
}

// el sol con su halo tramado (en el fondo fijo)
function b_sol(R, sx, sy, sr, halo = hex('#fff8dc')) {
  const B = R.buf, R2 = sr + 12;
  for (let y = Math.max(0, sy - R2); y <= sy + R2; y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (b_um(x, y) < q * q) B[y * 320 + x] = b_mez(B[y * 320 + x], halo, 0.45); }
  R.disco(sx, sy, sr + 1, hex('#ffe8a0')); R.disco(sx, sy, sr, hex('#fff6d0')); R.disco(sx - 2, sy - 2, Math.max(1, sr >> 1), hex('#fffcf0'));
}

// un cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana, solo sobre el cielo a la vista
function b_nube(R, m, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) b_discoM(R, m, x, y + 1, Math.round(r), c[0]);
  for (const [x, y, r] of bolas) b_discoM(R, m, x, y, Math.round(r), c[1]);
  for (const [x, y, r] of bolas) b_discoM(R, m, x - 1, y - 2, Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.47); x <= cx + w * 0.47; x++) { b_psM(R, m, x, y0, c[0]); b_psM(R, m, x, y0 + 1, c[0]); }
}

// las nubes del cielo: cirros lejanos casi quietos, cúmulos pequeños y lentos, y uno o dos grandes y más rápidos
function b_nubes(R, t, m, hor, c, n = 5, v = 1) {
  for (let k = 0; k < 3; k++) { const w = 30 + Math.round(h(k, 5, 402) * 40), x0 = ((h(k, 6, 402) * 440 + t * (0.6 + k * 0.3) * v) % 470) - 80, y = Math.round(hor * (0.18 + k * 0.17)) + 4;
    for (let i = 0; i < w; i++) { if (h(i >> 2, k, 403) < 0.25) continue; const e = Math.sin(i / w * Math.PI), x = x0 + i; b_psM(R, m, x, y, e > 0.35 ? c[1] : c[0]); if (e > 0.6 && i % 4) b_psM(R, m, x + 3, y - 1, c[2]); if (e > 0.5 && i % 5 === 0) b_psM(R, m, x - 4, y + 1, c[0]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 26 + k * 9 : 12 + ((k * 7) % 9), vv = (cerca ? 3.2 + k * 1.1 : 1.2 + k * 0.3) * v, y = Math.round(cerca ? hor * 0.42 + k * hor * 0.16 : hor * (0.3 + (k - 2) * 0.13)) + 6, x = ((h(k, 7, 402) * 470 + t * vv) % 500) - 90;
    b_nube(R, m, Math.round(x), y, w, k, c); }
}

// pájaros que cruzan aleteando (una V que sube y baja), solo sobre el cielo
function b_pajaros(R, t, m, y0, n = 4, sem = 0, c = hex('#3a3040')) {
  for (let k = 0; k < n; k++) { const v = 14 + h(k, sem, 405) * 10, x = ((h(k, sem, 406) * 400 + t * v) % 420) - 50 - (k % 3) * 9, y = y0 + h(k, sem, 407) * 22 + Math.sin(t * 1.3 + k) * 2, a = Math.sin(t * 9 + k * 2) > 0 ? -1 : 1;
    b_psM(R, m, x, y, c); b_psM(R, m, x - 1, y + (a > 0 ? 0 : -1), c); b_psM(R, m, x + 1, y + (a > 0 ? 0 : -1), c); b_psM(R, m, x - 2, y + (a > 0 ? 1 : -1), c); b_psM(R, m, x + 2, y + (a > 0 ? 1 : -1), c); }
}

// sillería: hiladas de alto a, sillares de ancho w a matajunta; cada sillar con su tono, el canto de luz arriba y a la
// izquierda, la sombra abajo y a la derecha, motas y algún desconchón; cols = [cuerpo, sombra, luz, junta]; k: semilla
function b_sillar(R, x0, y0, x1, y1, cols, a = 6, w = 12, k = 0) {
  const B = R.buf, [c, cS, cL, cJ] = cols, cM = b_mez(c, cS, 0.5), cLL = b_mez(c, cL, 0.55);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const f = Math.floor(y / a), yy = y - f * a, off = (f & 1) * (w >> 1) + ((f * 5) % 3);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const g = Math.floor((x + off) / w), xx = x + off - g * w, q = h(g, f, 400 + k);
      let col;
      if (yy === a - 1 || xx === w - 1) col = cJ;
      else { col = q < 0.2 ? cM : q > 0.84 ? cLL : c; if (yy === 0 || xx === 0) col = q < 0.2 ? c : cL; else if (yy === a - 2) col = cM;
        const r = h(x, y, 401 + k); if (r < 0.05) col = cS; else if (r > 0.97) col = cL;
        if (q > 0.93 && xx > 2 && yy > 1 && xx < 6 && yy < a - 2) col = cS; }   // un desconchón
      B[y * 320 + x] = col; } }
}

// oscurece (o aclara) un rectángulo mezclándolo con col en la proporción a (sombras de torres, interiores)
function b_velo(R, x0, y0, x1, y1, col, a) { const B = R.buf; for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[y * 320 + x] = b_mez(B[y * 320 + x], col, a); }

// almenas de x0 a x1 sobre la línea y (merlones de ancho w, alto al, hueco g)
function b_almenas(R, x0, x1, y, cols, w = 5, al = 5, g = 3) {
  for (let x = x0; x <= x1; x += w + g) { const xe = Math.min(x1, x + w - 1); R.rect(x, y - al, xe, y - 1, cols[0]); R.rect(x, y - al, xe, y - al, cols[2]); R.rect(xe, y - al + 1, xe, y - 1, cols[1]); R.rect(x, y - al, x, y - 1, cols[2]); }
}

// tierra de polvo: el color con motas de dos tonos, piedrecitas con su luz y su sombra
function b_tierra(R, x0, y0, x1, y1, cols, k = 0, piedras = 0.012) {
  const B = R.buf, [c, cS, cL] = cols;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const r = h(x, y, 410 + k), q = h(x >> 3, y >> 2, 411 + k);
    B[y * 320 + x] = r < 0.07 ? cS : r > 0.93 ? cL : q < 0.3 ? b_mez(c, cS, 0.3) : c; }
  const n = Math.round((x1 - x0) * (y1 - y0) * piedras);
  for (let i = 0; i < n; i++) { const x = x0 + Math.round(h(i, 1, 412 + k) * (x1 - x0)), y = y0 + 1 + Math.round(h(i, 2, 412 + k) * (y1 - y0 - 2)), s = h(i, 3, 412 + k) < 0.2 ? 2 : 1;
    R.rect(x, y, x + s, y + s - 1, hex('#9a9080')); R.pset(x, y - 1, hex('#d8d0c0')); R.rect(x, y + s, x + s, y + s, cS); }
}

// una peña: un canto redondeado con la luz arriba a la izquierda, grietas y líquenes (cx, base, ancho, alto)
function b_peña(R, cx, base, w, al, cols = [hex('#b8a888'), hex('#8a7c62'), hex('#dcd0b4'), hex('#5e5444')], k = 0) {
  const [c, cS, cL, cK] = cols;
  for (let y = base - al; y <= base; y++) for (let x = cx - w; x <= cx + w; x++) {
    const u = (x - cx) / w, v = (y - base) / al, rr = u * u + v * v * (v < 0 ? 1 : 4) - 0.12 * h(Math.round(x / 4), Math.round(y / 3), 420 + k);
    if (rr > 1) continue; const luz = -u * 0.6 - v * 0.8 - 0.4, r = h(x, y, 421 + k);
    let col = rr > 0.86 ? cK : luz > 0.25 ? cL : luz < -0.35 ? cS : c; if (rr <= 0.86 && r < 0.07) col = cS; else if (rr <= 0.86 && r > 0.95) col = cL;
    if (h(x >> 1, y, 422 + k) < 0.04 && y > base - al * 0.7) col = hex('#8a9a5a');   // líquenes
    R.pset(x, y, col); }
  for (let g = 0; g < 2; g++) { let x = cx - w * 0.3 + h(g, k, 423) * w * 0.6, y = base - al * 0.8; for (let i = 0; i < al * 0.6; i++) { R.pset(Math.round(x), Math.round(y), cK); x += (h(i, g, 424 + k) - 0.5) * 1.6; y += 1; } }
  for (let x = cx - w + 2; x <= cx + w - 2; x++) R.pset(x, base + 1, b_mez(cK, C.k, 0.3));
}

// gente pequeña de fondo (de 6 a 13 px): piernas que andan, túnica con su sombra, cabeza con tocado; o.dir, o.anda,
// o.baculo (el bastón del peregrino), o.carga (un saco al hombro), o.lanza, o.toca (color del tocado)
function b_figura(R, x, suelo, alto, t, ropa, o = {}) {
  const { pset, linea } = R; x = Math.round(x); suelo = Math.round(suelo); const s = alto / 10, d = o.dir ?? 1, paso = o.anda ? Math.floor(t * 6 + x * 0.13 + (o.fase ?? 0)) % 2 : 0;
  const pi = Math.max(1, Math.round(2.4 * s)), cu = Math.max(2, Math.round(4.6 * s)), ca = Math.max(2, Math.round(2.4 * s)), w = Math.max(1, Math.round(1.6 * s)), rS = b_mez(ropa, C.k, 0.35);
  const yC = suelo - pi, yT = yC - cu;
  for (let y = yC + 1; y <= suelo; y++) { pset(x - 1 + (paso && y > yC + 1 ? -1 : 0), y, hex('#3a2a20')); pset(x + 1 + (!paso && o.anda && y > yC + 1 ? 1 : 0), y, hex('#3a2a20')); }
  for (let y = yT; y <= yC; y++) { const ww = w + (y > yT + 1 ? 1 : 0); for (let i = -ww; i <= ww; i++) pset(x + i, y, i === ww * d ? rS : ropa); }
  for (let j = 0; j < ca; j++) for (let i = -Math.ceil(ca / 2) + 1; i <= Math.floor(ca / 2); i++) pset(x + i, yT - 1 - j, j === ca - 1 ? (o.toca ?? hex('#4a3020')) : b_PIEL);
  if (ca > 2) pset(x + (d > 0 ? 1 : 0), yT - ca + 1, o.toca ?? hex('#4a3020'));
  if (o.baculo) { linea(x + 2 * d + w * d, yT - ca - 1, x + 2 * d + w * d, suelo, hex('#6a4a2a')); pset(x + 2 * d + w * d, yT - ca - 2, hex('#e8e0c8')); }
  if (o.lanza) { linea(x + (w + 1) * d, yT - ca - 6, x + (w + 1) * d, suelo, hex('#5a4a3a')); pset(x + (w + 1) * d, yT - ca - 7, hex('#d0d4dc')); }
  if (o.carga) { const cx = x - d * (w + 1); for (let j = 0; j < 4; j++) for (let i = -2; i <= 1; i++) pset(cx + i, yT - 2 + j, j === 0 ? hex('#e8dcb8') : i === 1 ? hex('#a89a70') : hex('#d8c8a0')); }
}

// una paloma (o gorrión) que picotea en el suelo o se posa; cada cierto tiempo levanta el vuelo un momento
function b_paloma(R, x, y, t, k = 0, c = hex('#9a9aa8')) {
  const fase = (t * 0.5 + k * 0.37) % 4, vuela = fase > 3.5, pic = !vuela && Math.sin(t * 6 + k * 3) > 0.6, d = Math.floor(t * 0.3 + k) % 2 ? 1 : -1;
  const yy = Math.round(y - (vuela ? Math.sin((fase - 3.5) / 0.5 * Math.PI) * 6 : 0)), xx = Math.round(x + (vuela ? (fase - 3.5) * 10 * d : 0));
  R.rect(xx - 1, yy - 2, xx + 1, yy - 1, c); R.pset(xx + 2 * d, yy - (pic ? 1 : 3), hex('#6a6a7a')); R.pset(xx + (pic ? 3 : 2) * d, yy - (pic ? 0 : 3), hex('#e8a040'));
  R.pset(xx - 2 * d, yy - 2, hex('#6a6a7a')); if (vuela) { const a = Math.sin(t * 20) > 0 ? -2 : 0; R.pset(xx - 1, yy - 3 + a, c); R.pset(xx + 1, yy - 3 + a, c); } else R.pset(xx, yy, hex('#c86a5a'));
}

// una palmera datilera: tronco anillado que se curva, el cogollo con dátiles y las palmas en arco que mecen el viento
function b_palmera(R, x, base, alto, t, k = 0) {
  const { pset, rect, disco } = R, m = Math.sin(t * 1.1 + k) * 1.4, top = base - alto, lean = (u) => Math.round(u * u * (5 + m));
  for (let y = base; y >= top; y--) { const u = (base - y) / alto, xx = x + lean(u); rect(xx - 2, y, xx + 2, y, (y % 3) ? hex('#9a7a54') : hex('#7a5a3a')); pset(xx + 2, y, hex('#6a4a2e')); pset(xx - 2, y, hex('#b8966a')); }
  const cx = x + lean(1), cy = top;
  const palma = (a, l, c, cS) => { for (let d = 1; d <= l; d++) { const f = d / l, xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.6 + f * f * l * 0.6); pset(xx, yy, c); if (d > 2 && d % 2 === 0) { pset(xx, yy + 1, cS); pset(xx, yy + 2, cS); } } };
  const sw = (i) => Math.sin(t * 1.7 + i * 0.9 + k) * 0.06 + m * 0.02;
  for (let i = 0; i < 11; i++) palma(-Math.PI - 0.1 + i * ((Math.PI + 0.2) / 10) + sw(i), 20 + (i % 3) * 4, hex('#3e6a2e'), hex('#2a4a22'));
  disco(cx, cy + 1, 2, hex('#6a5a3a')); for (let i = 0; i < 4; i++) pset(cx - 2 + i, cy + 3 + (i % 2), hex('#d8822a'));
  for (let i = 0; i < 12; i++) { const an = -Math.PI - 0.3 + i * ((Math.PI + 0.6) / 11) + sw(i + 9), l = 16 + ((i * 5) % 4) * 3; palma(an, l, i % 2 ? hex('#5a8a3a') : hex('#6e9e44'), hex('#3e6a2e')); palma(an + 0.04, l - 2, hex('#86b85a'), hex('#4a7a34')); }
}

// un olivo: tronco retorcido y la copa gris verdosa en bolas de tres tonos; viento (0–1): las hojas que destellan
function b_olivo(R, x, base, r, t, k = 0, viento = 1) {
  const { pset, disco, linea } = R, cols = b_C.olivo;
  for (let j = 0; j < r * 1.1; j++) { const xx = Math.round(x + Math.sin(j * 0.35 + k) * 1.6); R.rect(xx - 1 - (j < 3 ? 1 : 0), base - j, xx + 1, base - j, j % 4 ? hex('#7a6a58') : hex('#5a4a3a')); pset(xx + 1, base - j, hex('#4a3a2c')); }
  linea(x, base - Math.round(r * 0.8), x - Math.round(r * 0.6), base - Math.round(r * 1.2), hex('#6a5a48')); linea(x, base - Math.round(r * 0.9), x + Math.round(r * 0.5), base - Math.round(r * 1.3), hex('#6a5a48'));
  const B = [[0, -1.5, 0.75], [-0.75, -1.25, 0.55], [0.7, -1.3, 0.55], [-0.35, -1.9, 0.5], [0.4, -1.85, 0.5]];
  const sw = Math.round(Math.sin(t * 1.2 + k) * 0.6 * viento);
  for (const [dx, dy, f] of B) disco(Math.round(x + dx * r + sw), Math.round(base + dy * r + 1), Math.round(f * r), cols[1]);
  for (const [dx, dy, f] of B) disco(Math.round(x + dx * r + sw), Math.round(base + dy * r), Math.round(f * r * 0.92), cols[0]);
  for (const [dx, dy, f] of B) disco(Math.round(x + dx * r + sw - f * r * 0.3), Math.round(base + dy * r - f * r * 0.35), Math.round(f * r * 0.5), cols[2]);
  for (let i = 0; i < r * 3; i++) { const a = h(i, k, 425) * 6.28, d = h(i, k, 426) * r * 0.9, [dx, dy] = B[i % 5], xx = Math.round(x + dx * r + Math.cos(a) * d + sw), yy = Math.round(base + dy * r + Math.sin(a) * d * 0.8);
    const brilla = Math.sin(t * 3 * viento + i * 1.7) > 0.7; pset(xx, yy, brilla ? cols[3] : (i % 3 ? cols[1] : cols[2])); }
}

// un ciprés: la llama verde oscura y estrecha con su lado de luz, que apenas se mece
function b_cipres(R, x, base, al, t = 0, k = 0) {
  const [c, cS, cL] = b_C.ciprés, sw = Math.sin(t * 0.9 + k) * 0.8;
  for (let j = 0; j <= al; j++) { const u = j / al, w = Math.round(Math.sin(Math.min(1, (1 - u) * 1.15) * Math.PI * 0.5 + 0.1) * (al * 0.11 + 1) * (u < 0.15 ? 0.8 : 1)), xx = Math.round(x + sw * u * u);
    for (let i = -w; i <= w; i++) R.pset(xx + i, base - j, i < -w + 1 + (j % 3 === 0 ? 1 : 0) ? cL : i > w - 2 ? cS : h(xx + i, j, 427 + k) < 0.2 ? cS : c); }
}

// un caballo de lado a la escala de los personajes (lomo a 19 px del suelo, cabeza a 30; unos 34 px de largo): silueta
// con su contorno, la luz arriba y la sombra en la tripa, las patas de lejos más oscuras, crin, cola y cascos. o.dir,
// o.color, o.crin, o.anda (las patas al paso), o.come (baja la cabeza al pesebre o al suelo), o.cola (espanta moscas),
// o.silla (silla y gualdrapa blanca con ribete rojo), o.cansado (cabeza gacha, orejas caídas, párpado a media asta y la
// lengua fuera). Solo usa pset: respeta R.recorte. Exportado: las escenas lo usan para los caballos que se instalan.
export function b_caballo(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, c = hex(o.color ?? '#8a5a34'), cS = b_mez(c, C.k, 0.32), cL = b_mez(c, C.blanco, 0.25), cr = hex(o.crin ?? '#3a2416'), K = b_mez(c, C.k, 0.72), cSS = b_mez(c, C.k, 0.5);
  x = Math.round(x); suelo = Math.round(suelo);
  const f = t * 7 + x * 0.1, anda = !!o.anda, bob = anda ? Math.round(Math.abs(Math.sin(f))) : 0;
  const a = o.come ? 1.3 + Math.sin(t * 2.5) * 0.06 : o.cansado ? 0.5 : Math.sin(t * 0.8 + x) * 0.04;   // giro de cuello y cabeza hacia abajo
  const ca = Math.cos(a), sa = Math.sin(a), des = ([i, j]) => { const dx = i - 8, dy = j + 16; return [8 + dx * ca + dy * sa, -16 - dx * sa + dy * ca]; };   // deshace el giro
  const seg = (px, py, ax, ay, bx, by) => { const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / (vx * vx + vy * vy))); return [Math.hypot(px - ax - u * vx, py - ay - u * vy), u]; };
  const cs = o.cola !== false ? Math.sin(t * (o.cola ? 5 : 1.4) + x) * (o.cola ? 3 : 1) : 0;
  const pata = (i0, fa) => { const sw = anda ? Math.sin(f + fa) * 2.4 : 0, lift = anda ? Math.max(0, Math.cos(f + fa) * 1.6) : 0; return [i0, -12 - bob, i0 + sw, -0.5 - lift]; };
  const P = [pata(-7, Math.PI), pata(7, 0), pata(-9.5, 0), pata(9.5, Math.PI)];   // de lejos (2) y de cerca (2)
  // código de cada punto: 0 fuera, 1 cuerpo, 2 pata de lejos, 3 casco, 4 crin o cola, 5 silla, 6 gualdrapa, 7 ribete
  const cod = (i, j) => {
    if (o.silla && j >= -22 - bob && j <= -20 - bob && i >= -4 && i <= 3) return 5;
    if (o.silla && j > -20 - bob && j <= -14 - bob && i >= -5 && i <= 3) return j === -14 - bob ? 7 : 6;
    const [hi, hj] = des([i, j + bob]);
    if (seg(hi, hj, 6.5, -19, 11, -28)[0] < 1.6 && hi < 11.5) return 4;   // la crin
    if (seg(i, j + bob, -12, -18, -14 + cs, -7)[0] < 1.6 - 0.04 * (j + 18)) return 4;   // la cola
    if (((i) / 11.5) ** 2 + ((j + bob + 14.5) / 5.2) ** 2 <= 1 || Math.hypot(i - 8.5, j + bob + 15) <= 5.2 || Math.hypot(i + 8.5, j + bob + 15.5) <= 5.4) return 1;
    if (seg(hi, hj, 8, -16, 12.5, -25)[0] <= 3.6 || seg(hi, hj, 12.5, -26, 18.5, -21.5)[0] <= 2.7) return 1;   // cuello y cabeza
    if (o.cansado ? seg(hi, hj, 12, -28, 9.5, -29)[0] <= 0.9 : seg(hi, hj, 12, -28, 12.8, -31)[0] <= 0.9) return 1;   // la oreja
    for (let k = 0; k < 4; k++) { const [i0, j0, i1, j1] = P[k], [dd, u] = seg(i, j, i0, j0, i1, j1); if (dd <= 1.7 - u * 0.7) return u > 0.9 ? 3 : k < 2 ? 2 : 1; }
    return 0;
  };
  const W = 46, H = 36, M = new Uint8Array(W * H);
  for (let jj = 0; jj < H; jj++) for (let ii = 0; ii < W; ii++) M[jj * W + ii] = cod(ii - 18, jj - 34);
  const g = (ii, jj) => (ii < 0 || jj < 0 || ii >= W || jj >= H ? 0 : M[jj * W + ii]);
  for (let jj = 0; jj < H; jj++) for (let ii = 0; ii < W; ii++) { const k = M[jj * W + ii]; if (!k) continue; const i = ii - 18, j = jj - 34;
    const borde = !g(ii - 1, jj) || !g(ii + 1, jj) || !g(ii, jj - 1) || !g(ii, jj + 1), arriba = !g(ii, jj - 1) || !g(ii, jj - 2), abajo = !g(ii, jj + 1);
    let col = k === 3 ? hex('#2a2018') : k === 4 ? (h(i, j, 450) < 0.3 ? b_mez(cr, C.blanco, 0.15) : cr) : k === 5 ? (arriba ? hex('#8a5a30') : hex('#5a3418')) : k === 6 ? hex('#f2eee2') : k === 7 ? hex('#c8303a') : k === 2 ? cSS : arriba ? cL : (abajo || j + bob > -12) ? cS : c;
    if (borde && k !== 4 && k !== 6 && k !== 7) col = K; else if (borde && k === 6) col = hex('#c8c0b0');
    R.pset(x + i * d, suelo + j, col); }
  // el ojo (que parpadea), el ollar y, si está cansado, el párpado caído y la lengua
  const E = ([i, j], col) => R.pset(x + Math.round(i) * d, suelo + Math.round(j) - bob, col);
  { const rot = (i, j) => { const dx = i - 8, dy = j + 16; return [8 + dx * ca - dy * sa, -16 + dx * sa + dy * ca]; };
    const parpa = (t * 0.5 + x * 0.01) % 4 < 0.12; E(rot(14.6, -24.6), parpa ? cS : hex('#1a1010')); if (o.cansado) { E(rot(14.6, -25.6), cSS); E(rot(15.6, -25.6), cSS); E(rot(13.6, -25.6), cSS); }
    else E(rot(15.4, -25.2), C.blanco);
    E(rot(19.2, -22.2), K); if (o.cansado) { const l = Math.round(Math.sin(t * 3) * 0.6); E(rot(18.6, -19.4 + l), hex('#e8788a')); E(rot(18.6, -18.4 + l), hex('#d85a6a')); } }
}

function b_jerusalen(R, t, o) {
  const { pset, rect, linea, disco, poligono } = R, J = b_C.oroP, hor = 70, altar = !!o.altar;
  // el camino: de la puerta (240, 124) baja haciendo curva hasta el primer término
  const cam = (y) => { const u = (y - 124) / 56; return [240 - 92 * u + 34 * Math.sin(u * Math.PI) * (1 - u), 7 + u * 44]; };
  const merlon = (x) => (x % 8) < 5;
  const m = b_fijo(R, 'jer:' + altar, () => {
    b_sol(R, 62, 30, 8);
    // las colinas del fondo (el monte de los Olivos), con olivares y casitas
    for (let x = 0; x < 320; x++) { const yc = Math.round(60 - 7 * (0.6 + 0.3 * Math.sin(x * 0.021 + 1) + 0.12 * Math.sin(x * 0.07 + 2)));
      for (let y = yc; y < 100; y++) { const p = y - yc + Math.round(Math.sin(x * 0.05) * 2); let c = (y - yc) < 1 ? b_C.colina[2] : b_um(x, y) < (y - 60) / 40 ? b_C.colina[1] : b_C.colina[0]; if (p > 2 && p % 6 === 5 && h(x >> 2, y, 437) < 0.8) c = b_C.colina[1]; else if (p > 2 && p % 6 === 0) c = b_C.colina[2]; R.buf[y * 320 + x] = c; }
      if (h(x, 3, 430) < 0.18) { const yy = yc + 6 + Math.round(h(x, 4, 430) * 20); rect(x, yy, x + 1, yy, b_C.olivo[1]); pset(x + 1, yy - 1, b_C.olivo[2]); }
      if (h(x, 1, 430) < 0.25) { const yy = yc + 3 + Math.round(h(x, 2, 430) * 10); rect(x, yy, x + 1, yy, b_C.olivo[1]); pset(x, yy - 1, b_C.olivo[0]); } }
    for (const [x0, n] of [[8, 4], [150, 3], [252, 5]]) for (let k = 0; k < n; k++) { const x = x0 + k * 5, yb = Math.round(60 - 7 * (0.6 + 0.3 * Math.sin(x * 0.021 + 1) + 0.12 * Math.sin(x * 0.07 + 2))) + 3; rect(x, yb - 3 - (k % 2), x + 3, yb, b_C.casa[2]); rect(x + 3, yb - 3 - (k % 2), x + 3, yb, b_C.casa[1]); }   // aldeas en las lomas
    // las azoteas de la ciudad tras la muralla: cubos con su cara de sombra, ventanitas, alguna cupulita blanca
    const casas = [];
    for (let k = 0; k < 46; k++) casas.push([Math.round(h(k, 1, 431) * 330) - 10, 6 + Math.round(h(k, 2, 431) * 14), 6 + Math.round(h(k, 3, 431) * 16), h(k, 4, 431)]);
    casas.sort((a, b) => b[2] - a[2]);
    for (const [x, w, al, q] of casas) { const top = 98 - al - Math.round(Math.sin(x * 0.02) * 4), cs = b_C.casa;
      rect(x, top, x + w, 98, q < 0.3 ? cs[3] : cs[0]); rect(x + w - 2, top + 1, x + w, 98, cs[1]); rect(x, top, x + w, top, cs[2]); rect(x, top + 1, x + w, top + 1, cs[1]);
      for (let i = x + 2; i < x + w - 3; i += 4) for (let j = top + 4; j < 96; j += 6) if (h(i, j, 432) < 0.45) { rect(i, j, i, j + 2, hex('#5a4030')); pset(i, j - 1, hex('#7a5a40')); }
      if (q > 0.82) { for (let j = 0; j <= 4; j++) { const ww = Math.round(Math.sqrt(1 - (j / 5) ** 2) * 4); rect(x + (w >> 1) - ww, top - j, x + (w >> 1) + ww, top - j, j > 2 ? cs[2] : cs[0]); } } }
    for (const [cx, al] of [[22, 22], [58, 18], [92, 24], [158, 20], [182, 16], [272, 22], [300, 18]]) b_cipres(R, cx, 98, al, 0, cx);
    // la gran cúpula dorada sobre su tambor de azulejos, con su arquería; y al-Aqsa con su cúpula gris
    { const cx = 120, top = 74; const A = b_C.azulejo, Cu = b_C.cupula;
      rect(cx - 17, 88, cx + 17, 98, b_C.casa[2]); for (let i = cx - 16; i <= cx + 16; i += 4) { rect(i, 91, i + 1, 98, hex('#7a5a40')); pset(i, 90, hex('#7a5a40')); }   // el pórtico
      rect(cx - 14, top + 2, cx + 14, 88, A[0]); rect(cx + 6, top + 2, cx + 14, 88, A[2]);
      for (let y = top + 3; y < 87; y++) for (let x = cx - 13; x <= cx + 13; x++) { if (((x + y) % 4 === 0) || ((x - y) % 4 === 0)) pset(x, y, x > cx + 5 ? A[0] : A[1]); }
      for (let x = cx - 12; x <= cx + 12; x += 4) { rect(x, top + 6, x + 1, top + 10, hex('#1a2a4a')); pset(x, top + 5, hex('#e8e0c8')); pset(x + 1, top + 5, hex('#e8e0c8')); }
      rect(cx - 14, top + 1, cx + 14, top + 2, hex('#f2e8d0')); rect(cx - 14, 86, cx + 14, 88, hex('#f2e8d0'));
      for (let j = 0; j <= 14; j++) { const w = Math.round(Math.sqrt(1 - (j / 14.5) ** 2) * 13); for (let i = -w; i <= w; i++) pset(cx + i, top - j, i < -w * 0.45 && i > -w * 0.8 ? Cu[2] : i > w * 0.45 ? Cu[1] : (i + j) % 7 === 0 ? Cu[3] : Cu[0]); pset(cx - w, top - j, Cu[1]); pset(cx + w, top - j, hex('#8a6018')); }
      rect(cx - 13, top, cx + 13, top + 1, hex('#8a6018')); rect(cx, top - 21, cx, top - 15, Cu[1]); disco(cx, top - 21, 1, Cu[2]);
      const ax = 200; rect(ax - 26, 84, ax + 26, 98, b_C.gris[0]); rect(ax + 18, 84, ax + 26, 98, b_C.gris[1]); rect(ax - 26, 84, ax + 26, 84, b_C.gris[2]);
      for (let i = ax - 23; i <= ax + 21; i += 7) { rect(i, 89, i + 3, 98, hex('#4a4034')); pset(i + 1, 88, hex('#4a4034')); pset(i + 2, 88, hex('#4a4034')); }
      const Pl = b_C.plomo; rect(ax - 7, 80, ax + 7, 84, b_C.gris[2]); for (let j = 0; j <= 8; j++) { const w = Math.round(Math.sqrt(1 - (j / 8.5) ** 2) * 8); rect(ax - w, 80 - j, ax + w, 80 - j, Pl[0]); rect(ax + Math.round(w * 0.4), 80 - j, ax + w, 80 - j, Pl[1]); if (w > 3) pset(ax - w + 2, 80 - j, Pl[2]); } }
    // la muralla: sillería dorada con almenas, la escarpa y su sombra; las torres con saeteras; la puerta
    b_sillar(R, 0, 100, 319, 124, J, 5, 10, 1); b_almenas(R, 0, 319, 100, [J[0], J[1], J[2]]);
    rect(0, 100, 319, 100, J[3]); for (let y = 119; y <= 124; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < (y - 118) / 8) pset(x, y, J[1]);
    const torre = (x0, x1, top, k) => { b_sillar(R, x0, top, x1, 124, J, 5, 9, k); b_velo(R, x1 - Math.round((x1 - x0) * 0.35), top, x1, 124, b_C.oroPS, 0.45); b_almenas(R, x0 - 1, x1 + 1, top, [J[0], J[1], J[2]], 4, 5, 3); rect(x0 - 1, top, x1 + 1, top + 1, J[3]);
      for (let y = top + 7; y < 112; y += 13) { const sx = (x0 + x1) >> 1; rect(sx, y, sx, y + 5, hex('#3a2a1a')); pset(sx - 1, y + 2, J[2]); pset(sx + 1, y + 2, J[1]); } };
    torre(12, 44, 80, 2); torre(212, 230, 86, 3); torre(250, 268, 86, 4); torre(292, 318, 90, 5);
    rect(230, 104, 250, 124, J[0]); b_sillar(R, 230, 100, 250, 105, J, 5, 10, 6);
    for (let y = 102; y <= 124; y++) for (let x = 233; x <= 247; x++) { const ax = Math.abs(x - 240), arco = y >= 109 || (y - 102) >= (7 - ax) * 0.0 + (ax > 4 ? (ax - 4) * 1.6 : 0); if (!arco) continue;
      pset(x, y, y > 118 ? hex('#6a4a30') : x > 244 ? hex('#2a1a12') : hex('#3a2618')); }
    for (let x = 233; x <= 247; x++) pset(x, 124, hex('#8a6a48'));
    linea(232, 108, 236, 102, J[2]); linea(244, 102, 248, 108, J[1]); for (let y = 102; y < 124; y += 3) { pset(232, y + 6, J[3]); pset(248, y + 6, J[3]); }
    // la tierra: polvo con piedras, el camino que baja de la puerta con sus rodadas y huellas
    b_tierra(R, 0, 125, 319, 179, [b_C.polvo[0], b_C.polvo[1], b_C.polvo[2]], 1);
    for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < 0.5 && y < 128) pset(x, y, J[1]);
    for (let y = 125; y < 180; y++) { const [cx, w] = cam(y); for (let x = Math.round(cx - w); x <= cx + w; x++) { const u = (x - cx) / w, r = h(x, y, 433);
      let c = r < 0.05 ? b_C.polvo[1] : r > 0.9 ? hex('#fbf2dc') : b_C.polvo[2]; if (Math.abs(Math.abs(u) - 0.38) < 0.06 + 0.02 * (y - 125) / 55) c = b_C.polvo[0]; if (Math.abs(u) > 0.9) c = b_C.polvo[0];
      if (h(x >> 1, y >> 1, 434) < 0.03 && Math.abs(u) < 0.3) c = b_C.polvo[3]; pset(x, y, c); } }
    // matas y piedras
    for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 435) * 319), y = 130 + Math.round(h(k, 2, 435) ** 0.8 * 46), [cx, w] = cam(y); if (Math.abs(x - cx) < w + 3) continue; const r = 2 + Math.round((y - 125) / 22);
      if (k % 3) { disco(x, y, r, b_C.olivo[1]); disco(x - 1, y - 1, Math.max(1, r - 1), b_C.olivo[0]); pset(x - 1, y - r, b_C.olivo[3]); for (let i = -r; i <= r; i++) pset(x + i, y + 1, b_C.polvo[3]); }
      else b_peña(R, x, y, 3 + r, 2 + r, undefined, k); }
    if (altar) { const ax = 93, base = 158;
      rect(ax - 18, base - 1, ax + 18, base + 2, b_C.gris[1]); rect(ax - 18, base - 2, ax + 18, base - 2, b_C.gris[2]);
      b_sillar(R, ax - 14, base - 16, ax + 14, base - 3, b_C.gris, 4, 9, 7); b_velo(R, ax + 8, base - 16, ax + 14, base - 3, C.k, 0.25);
      rect(ax - 16, base - 19, ax + 16, base - 16, hex('#f2eee2')); rect(ax - 16, base - 16, ax + 16, base - 12, hex('#e2dccc')); rect(ax - 16, base - 13, ax + 16, base - 13, hex('#c8303a')); rect(ax - 16, base - 19, ax + 16, base - 19, C.blanco);
      for (let i = ax - 15; i <= ax + 15; i += 3) pset(i, base - 11, hex('#d8d0be'));
      rect(ax - 5, base - 23, ax + 5, base - 20, hex('#6a2a1a')); rect(ax - 5, base - 23, ax + 5, base - 23, hex('#8a3a24')); rect(ax - 4, base - 21, ax + 4, base - 21, hex('#f2e8d0')); pset(ax, base - 22, b_C.cupula[0]);
      for (const sx of [ax - 12, ax + 12]) { rect(sx - 2, base - 21, sx + 2, base - 20, b_C.latón[1]); rect(sx - 1, base - 26, sx + 1, base - 22, b_C.latón[0]); rect(sx - 1, base - 33, sx + 1, base - 27, hex('#f2ecd8')); pset(sx + 1, base - 32, hex('#d8d0b8')); } }
  }, () => b_degradado(R, 0, 99, b_C.calor));
  b_nubes(R, t, m, hor, b_C.nubeCalor, 5, 0.8);
  b_pajaros(R, t, m, 26, 4, 1);
  // palomas que dan vueltas a la cúpula
  for (let k = 0; k < 3; k++) { const a = t * 0.9 + k * 2.1, x = Math.round(120 + Math.cos(a) * (20 + k * 3)), y = Math.round(58 + Math.sin(a) * 6 - k), al = Math.sin(t * 12 + k) > 0;
    pset(x, y, hex('#e8e4dc')); pset(x - 1, y + (al ? -1 : 1), hex('#c8c4bc')); pset(x + 1, y + (al ? -1 : 1), hex('#c8c4bc')); }
  // un humo de cocina que sube despacio y se deshace
  for (let i = 0; i < 18; i++) { const u = ((t * 0.12 + i / 18) % 1), x = Math.round(70 + u * 14 + Math.sin(u * 7 + t) * 2), y = Math.round(84 - u * 34); if (b_um(x, y) < (1 - u) * 0.8) pset(x, y, hex('#e8e4dc')); if (u > 0.4 && b_um(x + 1, y) < (1 - u) * 0.6) pset(x + 1, y, hex('#d8d4cc')); }
  // los gallardetes lisos que ondean en las torres
  for (const [px, top] of [[28, 75], [221, 81], [259, 81], [305, 85]]) { linea(px, top, px, top - 12, hex('#5a4030'));
    for (let i = 1; i <= 8; i++) { const ond = Math.round(Math.sin(t * 6 - i * 0.8 + px) * (i / 6)); for (let j = 0; j < Math.max(1, 4 - (i >> 1)); j++) pset(px + i, top - 12 + j + ond, j === 0 && i < 6 ? hex('#f2eee2') : hex('#c8303a')); } }
  // el centinela que pasea tras las almenas (se ve por los huecos)
  { const u = (t * 0.05) % 2, x = Math.round(u < 1 ? lerp(60, 200, u) : lerp(200, 60, u - 1)), sx = (xx, yy, c) => { if (!merlon(xx) || yy < 95) pset(xx, yy, c); };
    for (let j = 0; j < 3; j++) sx(x, 97 + j, hex('#7a8090')); sx(x + 1, 97, hex('#7a8090')); sx(x, 96, b_PIEL); sx(x + 1, 96, b_PIEL); sx(x, 95, hex('#9aa0b0')); sx(x + 1, 95, hex('#9aa0b0')); for (let j = 88; j < 100; j++) sx(x + 3, j, hex('#5a4a3a')); sx(x + 3, 87, hex('#d8dce4')); }
  // el temblor del calor sobre la muralla: las filas se desplazan un píxel
  { const B = R.buf; for (let y = 125; y < 131; y++) { const s = Math.round(Math.sin(t * 5 + y * 1.3)); if (!s) continue; const f = y * 320; if (s > 0) B.copyWithin(f + 1, f, f + 319); else B.copyWithin(f, f + 1, f + 320); } }
  // los peregrinos pequeños que suben por el camino hacia la puerta, levantando polvo
  for (let k = 0; k < 4; k++) { const u = 1 - ((t * 0.035 + k * 0.27) % 1), y = 124 + u * 50, [cx, w] = cam(y), x = cx + (k % 2 ? -0.3 : 0.25) * w, al = 5 + u * 7;
    if (u < 0.05) continue; b_figura(R, x, y, al, t, b_C.ropa[k % 4 + 1 === 3 ? 1 : k % 4], { anda: true, baculo: k !== 2, carga: k === 2, dir: 1, fase: k, toca: k === 1 ? hex('#e8e0c8') : undefined });
    for (let i = 0; i < 3; i++) { const v = ((t * 2 + i / 3 + k) % 1); if (b_um(Math.round(x - 3 - v * 4), Math.round(y - v * 3)) < 0.6 - v * 0.5) pset(Math.round(x - 3 - v * 4 - i), Math.round(y - v * 3), b_C.polvo[2]); } }
  // el olivo de la izquierda y la palmera de la derecha, en el primer término
  b_olivo(R, 22, 172, 16, t, 1); b_palmera(R, 298, 176, 74, t, 2);
  for (let k = 0; k < 12; k++) { const x = Math.round(h(k, 1, 436) * 319), y = 150 + Math.round(h(k, 2, 436) * 28), [cx, w] = cam(y); if (Math.abs(x - cx) < w + 2) continue; const s = Math.sin(t * 2.4 + k) * 1.2;   // matas de hierba seca que mueve el viento
    for (let i = -2; i <= 2; i++) linea(x + i, y, x + i + Math.round(s + i * 0.6), y - 4 - (i & 1), i % 2 ? hex('#b8a060') : hex('#d8c080')); }
  if (altar) for (const sx of [81, 105]) { const fl = Math.round(Math.sin(t * 13 + sx) * 0.7); for (const [i, j] of [[-1, 0], [0, 0], [1, 0], [-1, -1], [0, -1], [1, -1]]) b_tiñe(R, sx + i * 2, 120 + j * 2, hex('#ffe8a0'), 0.35); pset(sx, 124, hex('#3a2a20')); pset(sx, 123, hex('#ff9030')); pset(sx - 1, 123, hex('#ffb040')); pset(sx + 1, 123, hex('#ffb040')); pset(sx, 122, hex('#ffd070')); pset(sx + fl, 121, hex('#fff4c0')); pset(sx + fl, 120, hex('#fff8e0')); }
  return { suelo: 158, pies: [70, 120, 150, 180, 210], puerta: [240, 124], camino: (y) => cam(y)[0], altar: altar ? [93, 139] : null, sol: [62, 30], horizonte: 99 };
}

function b_explanada(R, t, o) {
  const { pset, rect, linea, disco } = R, J = b_C.oroP, Gr = b_C.gris, hor = 78;
  const arco = (k) => 124 + k * 28;   // x izquierda del hueco k (0–6), 20 px de ancho; del suelo (142) al arranque (104) y la clave (92)
  const enArco = (x, y, k) => { const x0 = arco(k), ax = Math.abs(x - (x0 + 10)); return x >= x0 && x <= x0 + 20 && y <= 142 && (y >= 104 || y - 92 >= (ax > 3 ? (ax - 3) * 1.6 : 0)); };
  const m = b_fijo(R, 'explanada', () => {
    b_sol(R, 44, 28, 8);
    // el monte de los Olivos al fondo
    for (let x = 0; x < 320; x++) { const yc = Math.round(66 - 6 * (0.6 + 0.4 * Math.sin(x * 0.018 + 4))); for (let y = yc; y < 100; y++) R.buf[y * 320 + x] = y === yc ? b_C.colina[2] : b_um(x, y) < (y - 64) / 30 ? b_C.colina[1] : b_C.colina[0];
      if (h(x, 3, 440) < 0.22) { const yy = yc + 2 + Math.round(h(x, 4, 440) * 8); pset(x, yy, b_C.olivo[1]); pset(x + 1, yy, b_C.olivo[0]); } }
    // la gran cúpula dorada sobre el tambor de azulejos, en lo alto de su plataforma
    { const cx = 74, top = 54, A = b_C.azulejo, Cu = b_C.cupula;
      rect(cx - 30, 84, cx + 30, 92, hex('#f2e8d0')); for (let i = cx - 29; i <= cx + 29; i += 5) { rect(i + 1, 86, i + 3, 92, hex('#7a5a40')); pset(i + 2, 85, hex('#7a5a40')); } rect(cx + 14, 84, cx + 30, 92, b_mez(hex('#f2e8d0'), C.k, 0.15));
      rect(cx - 22, top + 2, cx + 22, 84, A[0]); rect(cx + 10, top + 2, cx + 22, 84, A[2]); rect(cx - 22, top + 2, cx - 17, 84, b_mez(A[0], C.blanco, 0.15));
      for (let y = top + 3; y < 83; y++) for (let x = cx - 21; x <= cx + 21; x++) if ((x + y) % 4 === 0 || (x - y) % 4 === 0) pset(x, y, x > cx + 9 ? A[0] : (x + y) % 8 === 0 ? A[3] : A[1]);
      for (let x = cx - 19; x <= cx + 18; x += 5) { rect(x, top + 8, x + 2, top + 15, hex('#1a2a4a')); rect(x, top + 7, x + 2, top + 7, hex('#f2e8d0')); pset(x + 1, top + 6, hex('#f2e8d0')); }
      rect(cx - 22, top + 1, cx + 22, top + 2, hex('#f2e8d0')); rect(cx - 22, 78, cx + 22, 79, hex('#f2e8d0')); rect(cx - 22, top + 18, cx + 22, top + 19, hex('#f2e8d0'));
      for (let j = 0; j <= 19; j++) { const w = Math.round(Math.sqrt(1 - (j / 19.5) ** 2) * 17); for (let i = -w; i <= w; i++) pset(cx + i, top - j, i < -w * 0.4 && i > -w * 0.8 ? Cu[2] : i > w * 0.5 ? Cu[1] : (i * 3 + j) % 11 === 0 ? Cu[3] : Cu[0]); pset(cx - w, top - j, Cu[1]); pset(cx + w, top - j, hex('#8a6018')); }
      rect(cx - 17, top, cx + 17, top + 1, hex('#8a6018')); rect(cx, top - 27, cx, top - 20, Cu[1]); disco(cx, top - 27, 1, Cu[2]);
      // el muro de la plataforma, la escalera y los arcos sueltos (qanatir) en lo alto
      b_sillar(R, 0, 94, 117, 112, J, 4, 9, 11); rect(0, 94, 117, 95, J[2]); b_velo(R, 0, 96, 117, 98, b_C.oroPS, 0.35);
      for (const px of [36, 52, 68, 84]) { rect(px, 80, px + 3, 95, J[2]); rect(px + 3, 80, px + 4, 95, J[1]); rect(px - 1, 79, px + 5, 80, J[0]); }
      for (const px of [40, 56, 72]) for (let i = 0; i <= 11; i++) { const y = 79 - Math.round(Math.sin(i / 11 * Math.PI) * 5); rect(px + i, y - 1, px + i, y, J[2]); pset(px + i, y + 1, J[1]); }
      rect(34, 70, 90, 73, J[0]); rect(34, 70, 90, 70, J[2]); rect(34, 73, 90, 73, J[1]); for (let i = 36; i < 90; i += 4) pset(i, 72, J[3]); }
    for (const [cx, al, k] of [[10, 30, 1], [112, 26, 2], [100, 20, 3]]) b_cipres(R, cx, 112, al, 0, k);
    // la cúpula de plomo de al-Aqsa sobre su tambor
    { const ax = 236, Pl = b_C.plomo; rect(ax - 12, 64, ax + 12, 80, Gr[0]); rect(ax + 5, 64, ax + 12, 80, Gr[1]); for (let i = ax - 10; i <= ax + 8; i += 5) { rect(i, 68, i + 1, 74, hex('#3a3428')); pset(i, 67, Gr[2]); }
      for (let j = 0; j <= 14; j++) { const w = Math.round(Math.sqrt(1 - (j / 14.5) ** 2) * 13); for (let i = -w; i <= w; i++) pset(ax + i, 64 - j, i > w * 0.35 ? Pl[1] : i < -w * 0.5 && i > -w * 0.85 ? Pl[2] : (i + j * 2) % 6 === 0 ? Pl[1] : Pl[0]); }
      rect(ax - 13, 63, ax + 13, 64, Gr[2]); rect(ax, 43, ax, 50, Pl[1]); pset(ax, 42, b_C.cupula[2]); }
    // el pórtico de siete arcos: pretil, sillería, enjutas con rosetones lisos, los huecos de las cuadras
    b_sillar(R, 116, 80, 319, 142, J, 6, 12, 12); b_almenas(R, 116, 319, 82, [J[0], J[1], J[2]], 4, 4, 4); rect(116, 82, 319, 85, J[2]); rect(116, 86, 319, 86, J[3]);
    for (let k = 0; k < 7; k++) { const cx = arco(k) + 10;
      for (let y = 88; y <= 142; y++) for (let x = arco(k) - 2; x <= arco(k) + 22; x++) { if (enArco(x, y, k)) { const p = (y - 92) / 50, luz = Math.max(0, 1 - Math.hypot(x - cx, y - 116) / 16) * (k % 2 ? 0.5 : 0.25);
            let c = b_mez(hex('#2a1c14'), hex('#6a4a30'), Math.min(1, p * 0.8 + luz)); if (y > 134) c = (h(x, y, 441) < 0.4) ? b_C.polvo[1] : hex('#b8984a'); if (y > 128 && y <= 134 && h(x, y, 442) < 0.25) c = hex('#c8a85a'); pset(x, y, c); }
          else if (enArco(x - 1, y, k) || enArco(x + 1, y, k) || enArco(x, y + 1, k)) pset(x, y, x > cx ? J[1] : J[2]); }
      rect(arco(k) - 2, 104, arco(k) - 1, 104, J[2]); rect(arco(k) + 21, 104, arco(k) + 22, 104, J[2]);
      if (k < 6) { const rx = arco(k) + 24; disco(rx, 95, 2, J[1]); pset(rx, 95, J[2]); }
      // dentro: pesebres, sillas en su caballete, cubos, arreos colgados y lámparas
      rect(arco(k) + 2, 112, arco(k) + 18, 112, hex('#5a3a22')); rect(arco(k) + 2, 120, arco(k) + 18, 121, hex('#5a3a22'));
      for (let i = arco(k) + 3; i < arco(k) + 18; i += 3) linea(i, 112, i + 1, 120, hex('#6a4a2a'));
      for (let i = arco(k) + 3; i < arco(k) + 18; i += 2) pset(i, 113 + (i % 3), hex('#d8b858'));
      if (k === 0 || k === 6) { rect(arco(k) + 4, 128, arco(k) + 16, 129, hex('#4a3020')); for (const sx of [arco(k) + 5, arco(k) + 11]) { rect(sx, 124, sx + 4, 127, hex('#7a4424')); rect(sx, 124, sx + 4, 124, hex('#a8643a')); rect(sx + 1, 127, sx + 3, 130, hex('#f2eee2')); } rect(arco(k) + 5, 137, arco(k) + 8, 141, hex('#6a5a4a')); rect(arco(k) + 5, 137, arco(k) + 8, 137, hex('#8a7a6a')); }
      if (k % 3 === 1) { linea(arco(k) + 3, 104, arco(k) + 3, 110, hex('#3a2a1a')); }
    }
    // la explanada: losas grandes en perspectiva (filas que crecen hacia delante), gastadas, con juntas, grietas y hierbas
    for (let y = 112; y < 180; y++) { const al = y - 96, z = 640 / al, fz = z / 5, fila = Math.floor(fz), thz = 640 / (al * al) / 5;
      for (let x = 0; x < 320; x++) { if (y < 143 && x >= 116) continue;
        const wx = (x - 160) * z / 90 / 4 + (fila & 1) * 0.5, col = Math.floor(wx), q = h(col, fila, 443), r = h(x, y, 444), thx = z / 90 / 4;
        let c = q < 0.22 ? J[1] : q > 0.78 ? J[2] : J[0]; if (fz - fila < thz * 1.2 || wx - col < thx * 1.2) c = J[3]; else if (fz - fila < thz * 2.4) c = J[2]; else if (r < 0.05) c = J[1]; else if (r > 0.96) c = J[2];
        R.buf[y * 320 + x] = c; } }
    for (let s = 0; s < 7; s++) { const y = 112 + s * 2, xa = 40 - s * 3, xb = 88 + s * 3; rect(xa, y, xb, y + 1, J[2]); rect(xa, y + 1, xb, y + 1, J[1]); rect(xa - 1, y, xa - 1, y + 1, J[3]); rect(xb + 1, y, xb + 1, y + 1, J[3]); }
    for (let k = 0; k < 9; k++) { let x = h(k, 1, 445) * 300 + 10, y = 146 + h(k, 2, 445) * 30; for (let i = 0; i < 8; i++) { pset(Math.round(x), Math.round(y), J[3]); x += 1; y += (h(i, k, 446) - 0.5) * 1.6; } if (k % 3 === 0) { pset(Math.round(x), Math.round(y) - 1, C.hierba); pset(Math.round(x) + 1, Math.round(y) - 2, C.hierbaL); } }
    for (let x = 114; x < 320; x++) { pset(x, 143, J[1]); if (b_um(x, 144) < 0.5) pset(x, 144, J[1]); }
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 447) * 300 + 10), y = 145 + Math.round(h(k, 2, 447) * 30); linea(x, y, x + 2, y - (k % 2), hex('#d8b858')); }   // paja suelta
    // la fuente (sabil) con su arco y su pila, y el abrevadero de piedra
    { const fx = 30; b_sillar(R, fx - 14, 118, fx + 14, 160, Gr, 5, 8, 13); for (let y = 124; y <= 150; y++) for (let x = fx - 8; x <= fx + 8; x++) { const ax = Math.abs(x - fx); if (y >= 130 || y - 124 >= (ax > 3 ? (ax - 3) * 1.4 : 0)) pset(x, y, y > 146 ? hex('#4a6a7a') : hex('#3a3228')); }
      rect(fx - 16, 116, fx + 16, 118, Gr[2]); rect(fx - 10, 150, fx + 10, 160, Gr[0]); rect(fx - 10, 150, fx + 10, 150, Gr[2]); rect(fx - 8, 151, fx + 8, 153, hex('#5a8aa8')); rect(fx - 1, 135, fx + 1, 136, b_C.latón[1]); pset(fx, 137, b_C.latón[0]); }
    { const tx0 = 236, tx1 = 300; rect(tx0, 152, tx1, 166, Gr[0]); b_sillar(R, tx0, 155, tx1, 166, Gr, 5, 10, 14); rect(tx0, 152, tx1, 154, Gr[2]); rect(tx0 + 3, 155, tx1 - 3, 157, hex('#4a7a9a')); rect(tx0, 167, tx1, 167, hex('#6a5a40')); }
  }, () => b_degradado(R, 0, 111, b_C.calor));
  b_nubes(R, t, m, hor, b_C.nubeCalor, 5, 0.9); b_pajaros(R, t, m, 18, 3, 2);
  // los caballos bajo los arcos (recortados a su hueco), las lámparas que tiemblan y el mozo que echa heno
  const cab = [[1, 1, '#8a5a34', { come: true }], [2, -1, '#3a2a22', { cola: true }], [4, 1, '#c8c0b0', {}], [5, -1, '#a86a3a', { come: true, cola: true }]];
  for (const [k, d, col, op] of cab) { const x0 = arco(k); R.recorte([x0, 92, x0 + 20, 142]); b_caballo(R, x0 + 10 - d * 2, 141, t + k, { dir: d, color: col, ...op, silla: k === 4 }); }
  R.recorte([arco(3), 92, arco(3) + 20, 142]); { const u = (t * 0.25) % 2, x = arco(3) + 4 + Math.round(Math.abs(u - 1) * 12), al = Math.sin(t * 3) > 0; b_figura(R, x, 141, 12, t, hex('#a8905a'), { anda: true, dir: u < 1 ? 1 : -1 }); linea(x + 2, 128, x + 5, al ? 124 : 128, hex('#7a5a3a')); if (al) { pset(x + 5, 123, hex('#d8b858')); pset(x + 6, 122, hex('#e8c868')); } } R.recorte(null);
  for (const k of [1, 4]) { const x = arco(k) + 3, fl = Math.sin(t * 9 + k) > 0.2; rect(x - 1, 110, x + 1, 113, hex('#3a2a1a')); pset(x, 111, fl ? hex('#ffe08a') : hex('#ffb040')); pset(x, 112, hex('#ffd070')); }
  // la fuente que gotea, el agua del abrevadero que tiembla, palomas que picotean
  { const fx = 30, u = (t * 2.2) % 1; pset(fx, 138 + Math.round(u * 13), hex('#a8d8f0')); if (u > 0.85) { pset(fx - 1, 151, hex('#e8f4fc')); pset(fx + 1, 151, hex('#e8f4fc')); } for (let x = fx - 8; x <= fx + 8; x++) if (Math.sin(x * 0.9 + t * 4) > 0.7) pset(x, 152, hex('#a8d0e8')); }
  for (let x = 239; x <= 297; x++) { const s = Math.sin(x * 0.5 + t * 3) + Math.sin(x * 0.23 - t * 2); if (s > 1.1) pset(x, 155, hex('#a8d0e8')); else if (s < -1.3) pset(x, 156, hex('#2e5a7a')); }
  for (let k = 0; k < 4; k++) b_paloma(R, 190 + k * 9 + Math.round(Math.sin(t * 0.4 + k) * 4), 172 + (k % 2) * 3, t, k);
  return { suelo: 164, pies: [70, 110, 150, 190, 220], arcos: Array.from({ length: 7 }, (_, k) => [arco(k) + 10, 142]), abrevadero: [268, 152], fuente: [30, 150], sol: [44, 28], horizonte: 70 };
}

function b_camino(R, t, o) {
  const { pset, rect, linea, disco } = R, hor = 64;
  const cr1 = (x) => Math.round(64 - 9 * (0.55 + 0.3 * Math.sin(x * 0.02 + 1.3) + 0.15 * Math.sin(x * 0.061 + 0.4)));
  const cr2 = (x) => Math.round(86 - 13 * (0.5 + 0.35 * Math.sin(x * 0.016 + 2.6) + 0.15 * Math.sin(x * 0.047 + 1.1)));
  const cr3 = (x) => Math.round(110 - 15 * (0.5 + 0.4 * Math.sin(x * 0.013 + 4.2) + 0.1 * Math.sin(x * 0.05 + 2)));
  const cam = (y) => { const u = Math.max(0, (y - 104) / 76); return [60 + 150 * u + 40 * Math.sin(u * 3.4), 2 + u * u * 40 + u * 6]; };
  const pozo = [262, 146];
  const m = b_fijo(R, 'camino', () => {
    b_sol(R, 238, 30, 8);
    // tres términos de colinas: la lejana azulada con un pueblo, la media con bancales y olivos, la cercana con peñas
    const capa = (cr, yb, [c, cS, cL], banc, k) => { for (let x = 0; x < 320; x++) { const yc = cr(x), pend = cr(x + 3) - cr(x - 3);
        for (let y = Math.max(0, yc); y <= yb; y++) { const p = y - yc; let col = p < 2 ? cL : pend > 1 && p < 8 ? cS : c; if (banc && (p % banc) === banc - 1 && h(x >> 2, y, 460 + k) < 0.8) col = cS; else if (banc && (p % banc) === 0 && p > 0) col = cL;
          if (h(x, y, 461 + k) < 0.05) col = cS; R.buf[y * 320 + x] = col; } } };
    capa(cr1, 100, [hex('#c4bca8'), hex('#aaa290'), hex('#dcd6c4')], 0, 0);
    for (let k = 0; k < 9; k++) { const x = 64 + k * 4 + (k % 3), y = cr1(x) - 2 - (k % 2) * 2; rect(x, y, x + 3, cr1(x) + 1, hex('#e2dacb')); rect(x + 3, y, x + 3, cr1(x) + 1, hex('#bab2a0')); pset(x + 1, y + 1, hex('#8a8070')); }   // el pueblo lejano
    capa(cr2, 120, b_C.colina2, 5, 1);
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 462) * 319), y = cr2(x) + 3 + Math.round(h(k, 2, 462) * 24); if (y > 118) continue; rect(x, y, x + 1, y, b_C.olivo[1]); pset(x, y - 1, b_C.olivo[0]); pset(x + 1, y - 1, b_C.olivo[2]); }
    // el sendero lejano que trepa por la colina media
    for (let i = 0; i < 60; i++) { const x = 20 + i * 0.8, y = cr2(Math.round(x)) + 18 - i * 0.22 + Math.sin(i * 0.3) * 2; if ((i % 4) < 3) { pset(Math.round(x), Math.round(y), hex('#ecd4a0')); pset(Math.round(x) + 1, Math.round(y), hex('#ecd4a0')); } }
    capa(cr3, 179, b_C.colina3, 7, 2);
    // el camino que baja serpenteando hasta el primer término, con rodadas y piedras
    for (let y = 104; y < 180; y++) { const [cx, w] = cam(y); if (y < cr3(Math.round(cx))) continue;
      for (let x = Math.round(cx - w); x <= cx + w; x++) { const u = (x - cx) / w, r = h(x, y, 463); let c = r < 0.05 ? b_C.polvo[1] : r > 0.92 ? hex('#fbf2dc') : b_C.polvo[2];
        if (Math.abs(Math.abs(u) - 0.4) < 0.07 + 0.03 * (y - 104) / 76) c = b_C.polvo[0]; if (Math.abs(u) > 0.88) c = b_C.polvo[0]; pset(x, y, c); }
      pset(Math.round(cx - w) - 1, y, b_C.colina3[1]); pset(Math.round(cx + w) + 1, y, b_C.colina3[1]); }
    // olivos grandes y peñas en la colina cercana; piedras y cardos del primer término
    for (const [x, r, k] of [[18, 9, 1], [92, 6, 2], [128, 5, 3], [300, 10, 4], [228, 5, 5]]) { const base = Math.max(cr3(x) + r * 2, 112 + r * 3); b_olivo(R, x, base, r, 0, k, 0); }
    for (const [x, y, w, al, k] of [[44, 150, 16, 12, 1], [70, 132, 9, 7, 2], [150, 124, 8, 6, 3], [6, 170, 14, 14, 4], [306, 168, 16, 13, 5], [282, 132, 7, 6, 6]]) b_peña(R, x, y, w, al, undefined, k);
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 464) * 319), y = 118 + Math.round(h(k, 2, 464) * 60), [cx, w] = cam(y); if (Math.abs(x - cx) < w + 2) continue; const s = 1 + Math.round((y - 110) / 30);
      R.rect(x, y, x + s, y + s - 1, hex('#a89a80')); pset(x, y - 1, hex('#e0d6c0')); R.rect(x, y + s, x + s, y + s, b_C.colina3[1]); }
    // el pozo: el brocal de piedra, el armazón de madera con la polea, y el abrevadero
    { const [px, pb] = pozo; for (let y = pb - 12; y <= pb; y++) for (let x = px - 11; x <= px + 11; x++) { const u = (x - px) / 11, r = h(x >> 2, y >> 1, 465); pset(x, y, (y - pb + 12) % 4 === 3 || ((x + (y >> 2) * 3) % 6 === 0) ? b_C.gris[3] : u > 0.5 ? b_C.gris[1] : u < -0.6 ? b_C.gris[2] : r < 0.3 ? b_C.gris[1] : b_C.gris[0]); }
      for (let i = -11; i <= 11; i++) { const e = Math.round(Math.sqrt(1 - (i / 11.5) ** 2) * 3); pset(px + i, pb - 12 - e, b_C.gris[2]); pset(px + i, pb - 12 + e, b_C.gris[2]); for (let j = -e + 1; j < e; j++) pset(px + i, pb - 12 + j, hex('#1a1612')); }
      for (const s of [-1, 1]) { linea(px + s * 10, pb - 12, px + s * 2, pb - 36, b_C.madera[0]); linea(px + s * 11, pb - 12, px + s * 3, pb - 36, b_C.madera[1]); }
      rect(px - 4, pb - 37, px + 4, pb - 36, b_C.madera[3]); disco(px, pb - 35, 2, b_C.madera[2]); pset(px, pb - 35, b_C.madera[3]);
      rect(px + 14, pb - 6, px + 34, pb, b_C.gris[0]); rect(px + 14, pb - 6, px + 34, pb - 6, b_C.gris[2]); rect(px + 16, pb - 5, px + 32, pb - 4, hex('#5a8aa8')); rect(px + 14, pb + 1, px + 34, pb + 1, b_C.colina3[1]); }
  }, () => b_degradado(R, 0, 100, b_C.calor));
  b_nubes(R, t, m, hor, b_C.nubeCalor, 5, 0.9);
  // dos milanos que planean en círculo
  for (let k = 0; k < 2; k++) { const a = t * (0.5 + k * 0.15) + k * 3, x = 150 + k * 50 + Math.cos(a) * 26, y = 28 + k * 6 + Math.sin(a) * 6, al = Math.sin(t * 2 + k) > 0.6;
    for (let i = -4; i <= 4; i++) b_psM(R, m, x + i, y + (Math.abs(i) > 2 ? (al ? -1 : 0) : 0), hex('#4a3a34')); b_psM(R, m, x, y + 1, hex('#4a3a34')); b_psM(R, m, x - Math.sign(Math.cos(a + 1.57)), y + 1, hex('#6a5044')); }
  // la caravana de camellos que cruza la loma media, recortada contra la colina lejana
  for (let k = 0; k < 6; k++) { const x = Math.round(((t * 3.2) % 420) - 60 - k * 13), y = cr2(Math.max(0, Math.min(319, x))) + 1; if (x < -12 || x > 330) continue; const c = hex('#7a5a3e'), cl = hex('#a07a54'), pa = Math.floor(t * 3 + k) % 2;
    if (k === 5) { b_figura(R, x, y, 8, t, hex('#e8e0cc'), { anda: true, toca: hex('#e8e0cc'), baculo: true }); continue; }
    rect(x - 4, y - 6, x + 3, y - 4, c); rect(x - 2, y - 8, x + 1, y - 7, c); pset(x - 1, y - 9, cl); rect(x - 4, y - 6, x + 3, y - 6, cl); linea(x + 3, y - 5, x + 5, y - 8, c); rect(x + 5, y - 9, x + 7, y - 8, c); pset(x + 7, y - 9, cl);
    for (const [lx, f] of [[-4, 0], [-3, 1], [2, 1], [3, 0]]) linea(x + lx + (f === pa ? 1 : 0), y - 3, x + lx, y, hex('#5a4030'));
    if (k % 2 === 0) { rect(x - 3, y - 9, x, y - 8, k === 2 ? hex('#c8303a') : hex('#3a6aa8')); } }
  // sombras de nubes que pasan por las laderas
  for (const [v, w, y0, k] of [[7, 46, 120, 0], [5, 60, 150, 1]]) { const cx = ((t * v + k * 210) % 460) - 70; for (let y = y0 - 6; y <= y0 + 6; y++) for (let x = Math.round(cx - w); x <= cx + w; x++) { if (x < 0 || x > 319) continue; const e = ((x - cx) / w) ** 2 + ((y - y0) / 6) ** 2; if (e < 1 && b_um(x, y) < 0.5) b_tiñe(R, x, y, hex('#6a4a30'), 0.18); } }
  // cabras que pastan en la ladera
  for (const [x0, y, k] of [[40, 122, 0], [106, 116, 1], [188, 112, 2]]) { const x = Math.round(x0 + Math.sin(t * 0.2 + k) * 6), d = Math.cos(t * 0.2 + k) > 0 ? 1 : -1, come = Math.sin(t * 1.5 + k * 2) > 0, c = k === 1 ? hex('#3a2a22') : hex('#e8e0d0'), cS = k === 1 ? hex('#2a1a14') : hex('#b8ae9a');
    rect(x - 3, y - 4, x + 2, y - 2, c); rect(x - 3, y - 2, x + 2, y - 2, cS); for (const lx of [-3, -2, 1, 2]) linea(x + lx * d, y - 1, x + lx * d, y, cS); rect(x + 3 * d, y - (come ? 2 : 6), x + 4 * d, y - (come ? 1 : 5), c); pset(x + 3 * d, y - (come ? 3 : 7), cS); pset(x - 4 * d, y - 5, cS); }
  // el cubo del pozo, que sube y baja con su cuerda
  { const [px, pb] = pozo, cy = Math.round(pb - 26 + Math.sin(t * 0.7) * 8); linea(px + 2, pb - 34, px + 2, cy - 3, hex('#c8b890')); if (cy < pb - 14) { rect(px, cy - 2, px + 4, cy + 2, b_C.madera[1]); rect(px, cy - 2, px + 4, cy - 2, b_C.madera[2]); pset(px + 1, cy, b_C.madera[3]); }
    for (let x = px + 17; x <= px + 31; x++) if (Math.sin(x * 0.8 + t * 3) > 0.75) pset(x, pb - 5, hex('#a8d0e8')); }
  // un lagarto en la peña que hace flexiones
  { const x = 40, y = 139, f = Math.sin(t * 5) > 0 && (t % 4) < 2 ? 1 : 0; rect(x, y - f, x + 5, y - f, hex('#6a7a3a')); pset(x + 6, y - f - 1, hex('#6a7a3a')); pset(x + 6, y - f - 1, hex('#8a9a4a')); linea(x - 1, y, x - 5, y + 1, hex('#5a6a32')); pset(x + 1, y + 1, hex('#5a6a32')); pset(x + 4, y + 1, hex('#5a6a32')); }
  // el temblor del calor y las matas que mueve el viento
  { const B = R.buf; for (let y = 98; y < 103; y++) { const s = Math.round(Math.sin(t * 5 + y * 1.3)); if (!s) continue; const f = y * 320; if (s > 0) B.copyWithin(f + 1, f, f + 319); else B.copyWithin(f, f + 1, f + 320); } }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 466) * 319), y = 150 + Math.round(h(k, 2, 466) * 28), [cx, w] = cam(y); if (Math.abs(x - cx) < w + 2) continue; const s = Math.sin(t * 2.4 + k) * 1.4;
    for (let i = -2; i <= 2; i++) linea(x + i, y, x + i + Math.round(s + i * 0.6), y - 5 - (i & 1), i % 2 ? hex('#b8a060') : hex('#d8c080'));
    if (k % 4 === 0) { pset(x + Math.round(s), y - 7, hex('#9a6ac8')); pset(x + Math.round(s) + 1, y - 7, hex('#7a4aa8')); } }
  for (let i = 0; i < 6; i++) { const u = ((t * 0.3 + i / 6) % 1), x = Math.round(20 + u * 300), y = Math.round(166 + Math.sin(u * 9 + i) * 3); if (b_um(x, y) < 0.5 - u * 0.3) { pset(x, y, b_C.polvo[2]); pset(x + 2, y - 1, b_C.polvo[2]); } }   // el polvo que levanta el viento
  return { suelo: 162, pies: [110, 150, 190, 230], camino: (y) => cam(y)[0], pozo, sol: [238, 30], horizonte: 64 };
}

function b_emboscada(R, t, o) {
  const { pset, rect, linea, disco } = R, hor = 60;
  const cort = (x) => Math.round(50 + 8 * Math.sin(x * 0.045 + 1) + 5 * Math.sin(x * 0.13));   // el filo del cortado
  const camino = [[-10, 118], [24, 128], [52, 142], [80, 152], [130, 158], [180, 162], [230, 164], [280, 160], [330, 152]];
  const m = b_fijo(R, 'emboscada', () => {
    b_sol(R, 64, 30, 8);
    for (let x = 0; x < 320; x++) { const yc = Math.round(76 - 10 * (0.6 + 0.4 * Math.sin(x * 0.03 + 2))); for (let y = yc; y < 140; y++) R.buf[y * 320 + x] = y - yc < 2 ? hex('#e2d4b4') : b_um(x, y) < (y - yc) / 50 ? hex('#b8a888') : hex('#cbbc9c'); }
    for (let x = 0; x < 200; x++) { const yc = Math.round(104 - 18 * (0.5 + 0.5 * Math.sin(x * 0.02 + 0.3))); for (let y = yc; y < 180; y++) { const p = y - yc, r = h(x, y, 470); R.buf[y * 320 + x] = p < 2 ? b_C.colina3[2] : r < 0.06 ? b_C.colina3[1] : (p % 9 === 8 && h(x >> 2, y, 471) < 0.7) ? b_C.colina3[1] : b_C.colina3[0]; } }
    // el cortado de roca: estratos de caliza con su repisa de luz y su sombra, grietas, matas colgadas
    for (let x = 150; x < 320; x++) { const yc = cort(x) + Math.max(0, (170 - x) * 3); for (let y = Math.max(0, yc); y < 160; y++) { const p = y - yc, e = Math.floor((y + Math.sin(x * 0.05) * 3) / 7), q = h(e, 0, 472), r = h(x, y, 473), ee = ((y + Math.sin(x * 0.05) * 3) % 7 + 7) % 7;
        let c = q < 0.3 ? hex('#c8b490') : q < 0.65 ? hex('#d8c4a0') : hex('#b8a080'); if (ee < 1) c = hex('#ecdcb8'); else if (ee > 5.8) c = hex('#8a7458'); if (r < 0.05) c = hex('#9a8468'); if (p < 2) c = hex('#f0e2c0');
        const luz = x < 200 ? 0 : (x - 200) / 160; if (b_um(x, y) < luz * 0.5) c = b_mez(c, hex('#6a5640'), 0.35); R.buf[y * 320 + x] = c; } }
    for (let g = 0; g < 9; g++) { let x = 170 + h(g, 1, 474) * 140, y = cort(Math.round(x)) + 4; for (let i = 0; i < 30 + h(g, 2, 474) * 40 && y < 150; i++) { pset(Math.round(x), Math.round(y), hex('#6a5640')); x += (h(i, g, 475) - 0.5) * 1.4; y += 1; } }
    for (let k = 0; k < 12; k++) { const x = 160 + Math.round(h(k, 1, 476) * 150), y = cort(x) + 10 + Math.round(h(k, 2, 476) * 60); disco(x, y, 2, b_C.olivo[1]); pset(x - 1, y - 1, b_C.olivo[0]); pset(x, y - 2, b_C.olivo[2]); linea(x, y + 2, x + 1, y + 5, b_C.olivo[1]); }
    // el camino: baja de la colina y hace la curva por delante del cortado
    for (let i = 0; i < camino.length - 1; i++) { const [x0, y0] = camino[i], [x1, y1] = camino[i + 1]; for (let s = 0; s <= 1; s += 0.02) { const x = x0 + (x1 - x0) * s, y = y0 + (y1 - y0) * s, w = 4 + (y - 118) * 0.3; for (let j = -2; j <= 2; j++) for (let k = -Math.round(w); k <= w; k++) pset(Math.round(x + k), Math.round(y + j * w * 0.18), h(Math.round(x + k), Math.round(y + j), 477) < 0.06 ? b_C.polvo[1] : b_C.polvo[2]); } }
    b_tierra(R, 0, 166, 319, 179, [b_C.colina3[0], b_C.colina3[1], b_C.colina3[2]], 3, 0.02);
    for (let x = 0; x < 320; x++) for (let y = 164; y < 168; y++) if (b_um(x, y) < (y - 163) / 5) pset(x, y, b_C.colina3[0]);
    // las peñas de detrás de la curva y la higuera que cuelga del cortado
    b_peña(R, 236, 150, 30, 42, undefined, 1); b_peña(R, 292, 156, 30, 48, undefined, 2); b_peña(R, 196, 158, 13, 15, undefined, 3); b_peña(R, 30, 172, 18, 12, undefined, 4);
    { linea(176, 80, 168, 92, hex('#6a5a48')); linea(177, 80, 169, 93, hex('#5a4a38')); linea(176, 80, 190, 84, hex('#6a5a48')); for (let i = 0; i < 3; i++) linea(178 + i * 3, 78, 180 + i * 4, 70, hex('#5a4a38'));
      for (const [dx, dy, r] of [[0, -4, 7], [-8, 2, 6], [8, 2, 6], [-4, 8, 5]]) { disco(166 + dx, 92 + dy, r, hex('#3e6a2e')); disco(165 + dx, 91 + dy, r - 2, hex('#5a8a3a')); for (let i = 0; i < 6; i++) pset(166 + dx + Math.round(h(i, dx, 478) * r - r / 2), 92 + dy + Math.round(h(i, dy, 479) * r - r / 2), hex('#86b85a')); } }
  }, () => b_degradado(R, 0, 110, b_C.calor));
  b_nubes(R, t, m, hor, b_C.nubeCalor, 4, 0.8); b_pajaros(R, t, m, 22, 3, 3);
  // piedrecitas que caen del cortado de vez en cuando
  for (let k = 0; k < 2; k++) { const u = ((t * 0.35 + k * 0.5) % 1.6), x = 210 + k * 50 + Math.round(u * 3), y = cort(210 + k * 50) + 6 + Math.round(u * u * 60); if (u < 1.4) { pset(x, y, hex('#8a7458')); pset(x + 1, y - 2, hex('#a89070')); } }
  // el cuervo en lo alto de la peña: mira a los lados, da saltitos y grazna
  { const x = 236 + (Math.floor(t * 0.4) % 3 === 1 ? 4 : 0), y = 108 - (Math.sin(t * 2) > 0.94 ? 2 : 0), d = Math.floor(t * 0.7) % 2 ? 1 : -1, gr = (t % 3) < 0.4; const c = hex('#1e1a26'), cl = hex('#3e3a54');
    rect(x - 3, y - 4, x + 1, y - 2, c); rect(x - 2, y - 4, x, y - 4, cl); rect(x + 1 * d - (d < 0 ? 1 : 0), y - 6, x + 2 * d - (d < 0 ? 0 : 1), y - 5, c); pset(x + 2 * d, y - 6, C.blanco); pset(x + 3 * d, y - 5, hex('#3a3a3a')); if (gr) { pset(x + 3 * d, y - 6, hex('#3a3a3a')); pset(x + 5 * d, y - 8, C.blanco); pset(x + 6 * d, y - 9, C.blanco); }
    linea(x - 4 * d, y - 3, x - 6 * d, y - 2, c); pset(x - 1, y - 1, hex('#5a4a3a')); pset(x + 1, y - 1, hex('#5a4a3a')); }
  // el polvo que barre el camino y la mata que tiembla
  for (let k = 0; k < 9; k++) { const v = 30 + h(k, 1, 480) * 20, x = ((h(k, 2, 480) * 400 + t * v) % 400) - 40, y = 154 + Math.round(h(k, 3, 480) * 12 + Math.sin(t * 3 + k)); R.rect(Math.round(x), y, Math.round(x) + 3 + (k % 3), y, b_C.polvo[2]); }
  for (let i = -3; i <= 3; i++) linea(56 + i, 176, 56 + i + Math.round(Math.sin(t * 3) * 1.5 + i * 0.6), 168 - (i & 1) * 2, i % 2 ? hex('#a89060') : hex('#c8b070'));
  if (o.delante !== false) rocasDelante(R, t);
  return { suelo: 162, pies: [40, 90, 140, 190], escondite: [244, 162], rocaArriba: 136, camino: camino.map(([x, y]) => [x, y + 4]), sol: [64, 30] };
}

// La peña de la emboscada y su mata seca, que van por delante de los personajes (el ladrón se esconde detrás, con los
// pies en (244, 162): la peña le tapa entero; su lomo queda en y 136 entre x 226 y 262).
export function rocasDelante(R, t) {
  b_peña(R, 244, 174, 26, 38, [hex('#bcaa88'), hex('#8a7a5e'), hex('#e0d2b2'), hex('#5a5040')], 9);
  for (let i = -4; i <= 4; i++) R.linea(214 + i, 176, 214 + i + Math.round(Math.sin(t * 2.6 + 1) * 1.5 + i * 0.7), 166 - (i & 1) * 3, i % 2 ? hex('#a89060') : hex('#c8b070'));
  for (let i = 0; i < 3; i++) R.pset(212 + i * 3, 165 - i, hex('#8a6a3a'));
}

function b_casaTemple(R, t, o) {
  const { pset, rect, linea, disco } = R, hor = 70, J = b_C.casa, G = b_C.gris;
  const puerta = [159, 140];
  const m = b_fijo(R, 'casa', () => {
    b_sol(R, 210, 26, 7);
    // la torre del homenaje
    b_sillar(R, 16, 38, 86, 140, J, 6, 11, 21); b_velo(R, 66, 38, 86, 140, b_C.oroPS, 0.35); b_almenas(R, 14, 88, 38, [J[0], J[1], J[2]], 5, 5, 4); rect(14, 38, 88, 39, J[3]);
    for (const [wx, wy] of [[30, 54], [52, 54], [30, 80], [52, 80], [41, 104]]) { rect(wx, wy, wx + 5, wy + 10, hex('#3a2a1e')); rect(wx + 1, wy - 1, wx + 4, wy - 1, hex('#3a2a1e')); rect(wx - 1, wy + 11, wx + 6, wy + 11, J[2]); pset(wx + 4, wy + 2, hex('#5a4030')); }
    rect(60, 22, 61, 38, hex('#4a3a2a'));
    // la muralla con sus almenas, la puerta y su torre
    b_sillar(R, 86, 96, 319, 126, J, 5, 10, 22); b_almenas(R, 86, 319, 96, [J[0], J[1], J[2]]); rect(86, 96, 319, 96, J[3]); b_velo(R, 86, 118, 319, 126, b_C.oroPS, 0.18);
    b_sillar(R, 228, 76, 266, 126, J, 5, 9, 23); b_velo(R, 254, 76, 266, 126, b_C.oroPS, 0.35); b_almenas(R, 226, 268, 76, [J[0], J[1], J[2]], 4, 5, 3);
    for (let y = 98; y <= 126; y++) for (let x = 236; x <= 258; x++) { const ax = Math.abs(x - 247); if (y >= 106 || y - 98 >= (ax > 5 ? (ax - 5) * 1.4 : 0)) pset(x, y, y > 120 ? hex('#c8b890') : y > 106 ? b_C.mar[2] : b_C.mar[3]); }
    for (let x = 236; x <= 258; x += 3) linea(x, 98, x, 104, hex('#3a3a40')); for (let y = 99; y <= 104; y += 2) linea(236, y, 258, y, hex('#3a3a40'));
    b_sillar(R, 296, 84, 319, 126, J, 5, 9, 24); b_almenas(R, 294, 319, 84, [J[0], J[1], J[2]], 4, 5, 3);
    // la casa de cuentas: dos plantas, la puerta abierta con el resplandor de dentro, el letrero de la balanza
    b_sillar(R, 108, 84, 210, 140, G, 5, 9, 25); b_velo(R, 196, 84, 210, 140, C.k, 0.2); rect(106, 82, 212, 84, G[2]); rect(106, 85, 212, 85, G[3]);
    for (let x = 108; x < 210; x += 8) { rect(x, 78, x + 4, 82, G[0]); rect(x, 78, x + 4, 78, G[2]); }
    for (const wx of [118, 140, 176, 196]) { rect(wx, 92, wx + 6, 102, hex('#2a2018')); rect(wx - 2, 92, wx - 1, 102, hex('#4a6a3a')); rect(wx + 7, 92, wx + 8, 102, hex('#4a6a3a')); rect(wx - 2, 103, wx + 8, 103, G[2]); }
    for (let y = 110; y <= 140; y++) for (let x = 150; x <= 168; x++) { const ax = Math.abs(x - 159); if (y >= 116 || y - 110 >= (ax > 4 ? (ax - 4) * 1.2 : 0)) pset(x, y, b_mez(hex('#2a1a12'), hex('#a86a30'), Math.max(0, 1 - Math.hypot(x - 162, y - 130) / 12) * 0.8)); }
    rect(152, 128, 166, 130, hex('#5a3a20')); rect(152, 128, 166, 128, hex('#8a5a30')); pset(156, 126, hex('#ffd070')); pset(162, 127, b_C.cupula[0]); pset(163, 127, b_C.cupula[2]);
    linea(149, 116, 153, 110, G[2]); linea(165, 110, 169, 116, G[1]);
    for (let s = 0; s < 3; s++) rect(146 - s * 2, 140 + s, 172 + s * 2, 140 + s, s % 2 ? G[1] : G[2]);
    rect(170, 106, 180, 106, hex('#3a2a20')); rect(172, 107, 172, 108, hex('#3a2a20')); rect(178, 107, 178, 108, hex('#3a2a20'));
    // el patio: tierra apisonada con un camino empedrado a la puerta, paja y piedras
    b_tierra(R, 0, 127, 319, 179, [hex('#c8aa78'), hex('#a88a5a'), hex('#dcc294')], 4, 0.01);
    for (let y = 126; y < 132; y++) for (let x = 0; x < 320; x++) if (b_um(x, y) < (132 - y) / 7) pset(x, y, hex('#9a7c50'));
    for (let y = 143; y < 180; y++) { const w = 12 + (y - 143) * 0.7, cx = 159 + (y - 143) * 0.3; for (let x = Math.round(cx - w); x <= cx + w; x++) { const fila = Math.floor((y - 143) / 3), col = Math.floor((x + fila * 2) / 4); pset(x, y, (y - 143) % 3 === 2 || (x + fila * 2) % 4 === 0 ? hex('#8a7a62') : h(col, fila, 482) < 0.3 ? hex('#a89a80') : hex('#bcae92')); } }
    // el carro de sacos (los sacos atados, la rueda de radios, las varas en el suelo)
    { const x0 = 22, b = 160; rect(x0, b - 22, x0 + 48, b - 14, b_C.madera[0]); rect(x0, b - 22, x0 + 48, b - 22, b_C.madera[2]); for (let x = x0 + 8; x < x0 + 48; x += 10) rect(x, b - 21, x, b - 14, b_C.madera[1]);
      linea(x0 + 48, b - 16, x0 + 70, b - 2, b_C.madera[1]); linea(x0 + 48, b - 17, x0 + 70, b - 3, b_C.madera[2]);
      for (const [sx, sy] of [[4, -30], [14, -31], [24, -30], [34, -29], [9, -38], [20, -38], [30, -37]]) { const x = x0 + sx, y = b + sy; rect(x - 4, y, x + 4, y + 8, hex('#d8c8a0')); rect(x - 3, y - 1, x + 3, y - 1, hex('#d8c8a0')); rect(x + 3, y, x + 4, y + 8, hex('#a89870')); rect(x - 4, y, x - 4, y + 8, hex('#ece0c0')); rect(x - 1, y - 3, x + 1, y - 2, hex('#a89870')); pset(x, y + 3, hex('#8a7a5a')); }
      for (let a = 0; a < 6.28; a += 0.05) { pset(Math.round(x0 + 16 + Math.cos(a) * 9), Math.round(b - 9 + Math.sin(a) * 9), b_C.madera[3]); pset(Math.round(x0 + 16 + Math.cos(a) * 8), Math.round(b - 9 + Math.sin(a) * 8), b_C.madera[1]); }
      for (let k = 0; k < 8; k++) linea(x0 + 16, b - 9, x0 + 16 + Math.round(Math.cos(k * 0.785) * 8), b - 9 + Math.round(Math.sin(k * 0.785) * 8), b_C.madera[1]); disco(x0 + 16, b - 9, 2, b_C.madera[3]);
      for (let x = x0 + 4; x < x0 + 30; x++) pset(x, b + 1, hex('#8a6a40')); }
    // el otro carro, con barriles y sacos
    { const x0 = 268, b = 156; rect(x0, b - 14, x0 + 44, b - 8, b_C.madera[0]); rect(x0, b - 14, x0 + 44, b - 14, b_C.madera[2]);
      for (const bx of [x0 + 6, x0 + 18, x0 + 30]) { rect(bx - 5, b - 30, bx + 5, b - 15, hex('#9a6a3a')); rect(bx - 5, b - 30, bx - 4, b - 15, hex('#b8844a')); rect(bx + 3, b - 30, bx + 5, b - 15, hex('#6a4424')); for (const y of [b - 27, b - 18]) rect(bx - 5, y, bx + 5, y, hex('#3a3a40')); rect(bx - 4, b - 31, bx + 4, b - 31, hex('#c8945a')); }
      for (let a = 0; a < 6.28; a += 0.06) pset(Math.round(x0 + 30 + Math.cos(a) * 7), Math.round(b - 7 + Math.sin(a) * 7), b_C.madera[3]); for (let k = 0; k < 6; k++) linea(x0 + 30, b - 7, x0 + 30 + Math.round(Math.cos(k * 1.05) * 6), b - 7 + Math.round(Math.sin(k * 1.05) * 6), b_C.madera[1]); }
  }, () => { b_degradado(R, 0, 70, b_C.dia);
    // el mar al fondo
    for (let y = 70; y < 128; y++) for (let x = 0; x < 320; x++) { const p = (y - 70) / 30; R.buf[y * 320 + x] = b_um(x, y) < p ? b_C.mar[0] : (y < 72 ? b_C.mar[3] : b_C.mar[1]); if (h(x, y, 481) < 0.04) R.buf[y * 320 + x] = b_C.mar[2]; }
    for (let x = 270; x < 320; x++) { const yc = Math.round(66 + Math.sin((x - 270) * 0.06) * 3); for (let y = yc; y < 76; y++) pset(x, y, y === yc ? hex('#d8c8a0') : hex('#b8a880')); }   // un cabo lejano
  });
  b_nubes(R, t, m, hor, b_C.nubeDia, 5, 1);
  // las gaviotas sobre el mar
  for (let k = 0; k < 3; k++) { const x = Math.round(150 + Math.sin(t * 0.4 + k * 2) * 60 + k * 30), y = Math.round(54 + Math.cos(t * 0.6 + k) * 8), a = Math.sin(t * 8 + k) > 0 ? -1 : 0; if (x > 270 && y < 46) continue; b_psM(R, m, x, y, C.blanco); b_psM(R, m, x - 1, y + a, C.blanco); b_psM(R, m, x + 1, y + a, C.blanco); b_psM(R, m, x - 2, y + a + 1, hex('#9aa0b0')); b_psM(R, m, x + 2, y + a + 1, hex('#9aa0b0')); }
  // destellos del mar y dos naves que cabecean (una con la cruz roja en la vela); se ven por encima de la muralla
  for (let k = 0; k < 24; k++) { const x = Math.round((h(k, 1, 483) * 320 + t * (2 + k % 3)) % 320), y = 72 + Math.round(h(k, 2, 483) * 22); if (Math.sin(t * 3 + k * 1.7) > 0.4) { b_psM(R, m, x, y, b_C.mar[3]); b_psM(R, m, x + 1, y, C.blanco); } }
  { const ps = (x, y, c) => b_psM(R, m, x, y, c), rc = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) ps(x, y, c); };
    for (const [x0, y, k, cruz] of [[150, 90, 0, true], [204, 88, 1, false], [110, 78, 2, false]]) { const x = Math.round(x0 + Math.sin(t * 0.05 + k) * 10), b = Math.round(Math.sin(t * 1.4 + k) * 1), s = k === 2 ? 0.6 : 1, S = (v) => Math.round(v * s);
      rc(x - S(9), y - S(3) + b, x + S(9), y + b, b_C.casco[0]); rc(x - S(10), y - S(4) + b, x - S(8), y - S(3) + b, b_C.casco[2]); rc(x + S(8), y - S(4) + b, x + S(10), y - S(3) + b, b_C.casco[2]); rc(x - S(9), y - S(3) + b, x + S(9), y - S(3) + b, b_C.casco[2]);
      rc(x, y - S(20) + b, x, y - S(4) + b, b_C.casco[3]); const ond = Math.round(Math.sin(t * 2 + k)); rc(x - S(6), y - S(18) + b, x + S(6) + ond, y - S(7) + b, b_C.vela[0]); rc(x + S(4) + ond, y - S(18) + b, x + S(6) + ond, y - S(7) + b, b_C.vela[1]); rc(x - S(6), y - S(18) + b, x + S(6), y - S(18) + b, b_C.vela[2]);
      if (cruz) { rc(x - 1, y - 16 + b, x + 1, y - 9 + b, hex('#c8303a')); rc(x - 4, y - 14 + b, x + 4, y - 12 + b, hex('#c8303a')); } else rc(x - S(6), y - S(14) + b, x + S(6), y - S(12) + b, hex('#3a6aa8'));
      ps(x, y - S(21) + b, hex('#c8303a')); ps(x + 1, y - S(21) + b, hex('#c8303a')); } }
  // el estandarte blanco y negro que ondea en la torre, y el humo de la cocina
  for (let i = 1; i <= 12; i++) { const ond = Math.round(Math.sin(t * 5 - i * 0.7) * (i / 8)); for (let j = 0; j < 8; j++) pset(61 + i, 22 + j + ond, j < 4 ? hex('#1c1a20') : hex('#f2eee2')); }
  for (let i = 0; i < 18; i++) { const u = ((t * 0.13 + i / 18) % 1), x = Math.round(30 + u * 18 + Math.sin(u * 6 + t) * 2), y = Math.round(32 - u * 22); if (b_um(x, y) < (1 - u) * 0.8) pset(x, y, hex('#e8e8ec')); if (u > 0.3 && b_um(x + 1, y) < (1 - u) * 0.6) pset(x + 1, y, hex('#c8ccd4')); }
  // el letrero de la balanza que se mece
  { const s = Math.round(Math.sin(t * 1.5) * 0.6), x = 175 + s; rect(x - 5, 109, x + 5, 118, b_C.madera[1]); rect(x - 4, 110, x + 4, 117, b_C.madera[2]); linea(x - 3, 112, x + 3, 112, b_C.cupula[1]); rect(x, 111, x, 116, b_C.cupula[1]); pset(x - 3, 113, b_C.cupula[0]); pset(x + 3, 113, b_C.cupula[0]); pset(x - 3, 114, b_C.cupula[1]); pset(x + 3, 114, b_C.cupula[1]); rect(x - 1, 116, x + 1, 116, b_C.cupula[1]); }
  // el rebaño que pasta con su pastor y su perro
  for (let k = 0; k < 7; k++) { const bx = 204 + (k % 4) * 13 + (k > 3 ? 6 : 0), by = 140 + (k > 3 ? 8 : 0), x = Math.round(bx + Math.sin(t * 0.15 + k * 1.3) * 4), d = Math.cos(t * 0.15 + k * 1.3) > 0 ? 1 : -1, come = Math.sin(t * 1.2 + k * 2) > -0.2, c = k === 5 ? hex('#4a3a34') : hex('#f0ece0');
    for (let j = -4; j <= 0; j++) for (let i = -4; i <= 3; i++) if ((i / 4.4) ** 2 + ((j + 2) / 2.8) ** 2 <= 1) pset(x + i, by - 3 + j, j < -2 ? b_mez(c, C.blanco, 0.3) : (i + j) % 3 === 0 ? b_mez(c, C.k, 0.12) : c);
    for (const lx of [-3, -1, 1, 2]) linea(x + lx, by - 2, x + lx, by, hex('#3a3030')); rect(x + 4 * d - (d < 0 ? 1 : 0), by - (come ? 3 : 7), x + 5 * d - (d < 0 ? 0 : 1), by - (come ? 2 : 5), hex('#3a3030')); pset(x + 3 * d, by - (come ? 4 : 7), hex('#3a3030')); }
  b_figura(R, 262, 150, 12, t, hex('#7a6a4a'), { baculo: true, dir: -1, toca: hex('#e8e0cc') });
  { const u = (t * 0.2) % 2, x = Math.round(u < 1 ? lerp(196, 252, u) : lerp(252, 196, u - 1)), d = u < 1 ? 1 : -1, pa = Math.floor(t * 8) % 2, c = hex('#c89a5a'), y = 154;
    rect(x - 3, y - 4, x + 2, y - 2, c); rect(x + 2 * d, y - 6, x + 3 * d, y - 4, c); pset(x + 4 * d, y - 5, hex('#3a2a20')); pset(x + 2 * d, y - 7, hex('#8a6a3a')); for (const lx of [-3, 2]) { pset(x + lx + (pa ? 1 : 0), y - 1, c); pset(x + lx, y, c); } linea(x - 4 * d, y - 4, x - 6 * d, y - 6 + (pa ? 1 : 0), c); }
  // gallinas que picotean junto al carro
  for (let k = 0; k < 3; k++) { const x = Math.round(84 + k * 9 + Math.sin(t * 0.3 + k * 2) * 3), y = 166 + (k % 2) * 4, pic = Math.sin(t * 5 + k * 1.7) > 0.5, d = k % 2 ? 1 : -1, c = k === 1 ? hex('#a8603a') : hex('#f2eee2');
    rect(x - 2, y - 3, x + 1, y - 1, c); pset(x + 2 * d - (d < 0 ? 1 : 0), y - (pic ? 1 : 4), c); pset(x + 2 * d - (d < 0 ? 1 : 0), y - (pic ? 2 : 5), hex('#c8303a')); pset(x + 3 * d - (d < 0 ? 1 : 0), y - (pic ? 0 : 4), hex('#e8a040')); pset(x - 3 * d, y - 4, c); pset(x, y, hex('#e8a040')); }
  // el mozo que descarga sacos del carro y los lleva a la casa de cuentas
  { const u = (t * 0.09) % 2, va = u < 1, x = Math.round(va ? lerp(78, 146, u) : lerp(146, 78, u - 1)); b_figura(R, x, 150, 12, t, hex('#8a6a4a'), { anda: true, dir: va ? 1 : -1, carga: va, fase: 2 }); }
  return { suelo: 164, pies: [100, 140, 180, 220], puerta, carro: [46, 160], mar: 70, sol: [210, 26] };
}

function b_mostrador(R, t, o) {
  const { pset, rect, linea, disco } = R, G = b_C.gris, M = b_C.madera, V = [16, 30, 54, 96];   // la ventana: x0, y0, x1, y1
  const enV = (x, y) => x >= V[0] && x <= V[2] && y <= V[3] && (y >= V[1] + 19 || Math.hypot(x - 35, y - (V[1] + 19)) <= 19);
  b_fijo(R, 'mostrador', () => {
    b_sillar(R, 0, 0, 319, 172, [hex('#b8a888'), hex('#8e8066'), hex('#d4c6a6'), hex('#6e624e')], 7, 14, 30);
    // la bóveda: el arco de arriba en penumbra
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) { const k = Math.abs(x - 160) / 160, top = 4 + k * k * 22; if (y < top && b_um(x, y) < 0.7) b_tiñe(R, x, y, hex('#3a2e24'), 0.45); }
    for (let x = 0; x < 320; x++) { const k = Math.abs(x - 160) / 160, y = Math.round(4 + k * k * 22); pset(x, y, hex('#e0d4b4')); pset(x, y + 1, hex('#7a6c56')); }
    // la ventana de arco: jambas gruesas, el cielo y el mar, la reja
    for (let y = V[1] - 3; y <= V[3] + 3; y++) for (let x = V[0] - 4; x <= V[2] + 4; x++) { if (enV(x, y)) { const c = y < 76 ? (b_um(x, y) < (y - V[1]) / 50 ? b_C.dia[3] : b_C.dia[2]) : y < 78 ? hex('#d8c8a0') : (h(x, y, 490) < 0.08 ? b_C.mar[3] : b_C.mar[1]); pset(x, y, c); }
      else if (enV(x - 3, y) || enV(x + 3, y) || enV(x, y + 3) || enV(x, y - 3)) pset(x, y, x < 35 ? hex('#ece0c4') : hex('#a89a7c')); }
    for (let x = V[0] - 4; x <= V[2] + 4; x++) { pset(x, V[3] + 4, hex('#e8dcc0')); pset(x, V[3] + 5, hex('#7a6c56')); }
    // las estanterías de detrás del mostrador: libros de cuentas sin letras, rollos, sacos de monedas, cofres, tarros
    { const x0 = 74, x1 = 262; rect(x0 - 3, 38, x1 + 3, 150, M[3]); rect(x0, 40, x1, 150, hex('#4a2e1a'));
      for (const y of [62, 86, 110, 134]) { rect(x0 - 3, y, x1 + 3, y + 2, M[2]); rect(x0 - 3, y + 3, x1 + 3, y + 3, M[1]); }
      rect(x0 - 3, 38, x1 + 3, 40, M[2]); for (const x of [x0 - 3, (x0 + x1) >> 1, x1 + 1]) rect(x, 38, x + 2, 150, M[0]);
      const libros = [hex('#8a2a2a'), hex('#2a4a7a'), hex('#5a6a2a'), hex('#7a4a1a'), hex('#4a2a5a'), hex('#a87a2a')];
      for (const [y, k] of [[62, 0], [86, 1], [110, 2], [134, 3]]) { let x = x0 + 2;
        while (x < x1 - 4) { const q = h(x, k, 491), mitad = (x0 + x1) >> 1; if (Math.abs(x - mitad) < 4) { x += 4; continue; }
          if (q < 0.5) { const w = 3 + Math.round(h(x, k, 492) * 3), al = 13 + Math.round(h(x, k, 493) * 7), c = libros[Math.floor(h(x, k, 494) * 6)]; rect(x, y - al, x + w - 1, y - 1, c); rect(x, y - al, x, y - 1, b_mez(c, C.blanco, 0.25)); rect(x + w - 1, y - al, x + w - 1, y - 1, b_mez(c, C.k, 0.3)); rect(x, y - al + 2, x + w - 1, y - al + 2, b_C.cupula[1]); rect(x, y - 4, x + w - 1, y - 4, b_C.cupula[1]); x += w + (q < 0.1 ? 2 : 0); }
          else if (q < 0.68) { for (let j = 0; j < 3; j++) { const yy = y - 3 - j * 4; rect(x, yy - 1, x + 10, yy + 1, hex('#e8d8a8')); rect(x, yy + 1, x + 10, yy + 1, hex('#b8a070')); disco(x + 10, yy, 1, hex('#c8b088')); pset(x + 10, yy, hex('#8a7048')); } x += 13; }
          else if (q < 0.84) { rect(x, y - 9, x + 8, y - 1, hex('#c8a870')); rect(x + 1, y - 10, x + 7, y - 10, hex('#c8a870')); rect(x + 6, y - 9, x + 8, y - 1, hex('#9a7a48')); rect(x + 3, y - 12, x + 5, y - 11, hex('#8a6a3a')); pset(x + 4, y - 6, b_C.cupula[0]); pset(x + 2, y - 4, b_C.cupula[2]); x += 11; }
          else { rect(x, y - 10, x + 12, y - 1, hex('#6a4022')); rect(x, y - 10, x + 12, y - 10, hex('#9a6a3a')); rect(x + 3, y - 10, x + 3, y - 1, hex('#3a3a40')); rect(x + 9, y - 10, x + 9, y - 1, hex('#3a3a40')); rect(x + 5, y - 6, x + 7, y - 4, b_C.cupula[1]); x += 15; } } } }
    // la puerta del fondo con el cuarto del contable
    for (let y = 70; y <= 160; y++) for (let x = 274; x <= 308; x++) { const ax = Math.abs(x - 291); if (y >= 86 || Math.hypot(x - 291, y - 86) <= 17) pset(x, y, b_mez(hex('#2a1e16'), hex('#a8783a'), Math.max(0, 1 - Math.hypot(x - 296, y - 128) / 26) * 0.75)); }
    for (let y = 68; y <= 160; y++) for (const x of [271, 272, 273, 309, 310, 311]) pset(x, y, x < 290 ? hex('#d4c6a6') : hex('#8e8066'));
    rect(282, 136, 304, 138, M[1]); rect(282, 136, 304, 136, M[2]); rect(284, 139, 285, 160, M[3]); rect(301, 139, 302, 160, M[3]);
    // el arca grande con su candado, en el suelo
    { const x0 = 18, y0 = 134; rect(x0, y0, x0 + 40, y0 + 34, hex('#5a3a20')); rect(x0, y0, x0 + 40, y0 + 3, hex('#8a5a30')); rect(x0 + 36, y0, x0 + 40, y0 + 34, hex('#3a2414')); for (const x of [x0 + 6, x0 + 20, x0 + 34]) rect(x, y0, x + 1, y0 + 34, hex('#3a3a44'));
      rect(x0, y0 + 14, x0 + 40, y0 + 15, hex('#3a3a44')); rect(x0 + 17, y0 + 8, x0 + 23, y0 + 14, hex('#c8a040')); rect(x0 + 19, y0 + 5, x0 + 21, y0 + 7, hex('#3a3a44')); pset(x0 + 20, y0 + 11, hex('#3a2a10')); for (const x of [x0 + 3, x0 + 27]) { pset(x, y0 + 20, hex('#9a9aa8')); pset(x + 10, y0 + 26, hex('#9a9aa8')); } }
    // el suelo de losas
    for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = y < 173 ? 0 : 1, col = Math.floor((x + fila * 9) / (18 + fila * 4)); R.buf[y * 320 + x] = y === 168 || y === 173 || (x + fila * 9) % (18 + fila * 4) === 0 ? hex('#6e624e') : h(col, fila, 495) < 0.3 ? hex('#a89878') : hex('#bcac8c'); }
    // el haz de luz de la ventana sobre la pared, el arca y el suelo
    for (let y = V[3] + 6; y < 180; y++) { const d = (y - V[3]) * 0.9; for (let x = Math.round(V[0] + 4 + d); x <= V[2] - 4 + d * 1.25; x++) if (b_um(x, y) < 0.5) b_tiñe(R, x, y, hex('#fff4d0'), 0.22); }
  });
  // por la ventana: la nave que cruza y la gaviota (recortadas al hueco); las olas que brillan
  R.recorte([V[0], V[1], V[2], V[3]]);
  { const x = Math.round(((t * 3) % 80) - 14), b = Math.round(Math.sin(t * 1.5)); for (let i = -6; i <= 6; i++) pset(x + i, 80 + b, b_C.casco[0]); for (let i = -5; i <= 5; i++) pset(x + i, 79 + b, b_C.casco[2]); linea(x, 78 + b, x, 66 + b, b_C.casco[3]); R.poligono([[x - 5, 67 + b], [x + 5, 67 + b], [x + 5, 76 + b], [x - 5, 76 + b]], b_C.vela[0]); R.linea(x - 1, 70 + b, x + 1, 70 + b, hex('#c8303a')); R.linea(x, 69 + b, x, 72 + b, hex('#c8303a')); }
  { const x = 20 + ((t * 7) % 40), y = 46 + Math.sin(t) * 4, a = Math.sin(t * 9) > 0 ? -1 : 0; pset(x, y, C.blanco); pset(x - 1, y + a, C.blanco); pset(x + 1, y + a, C.blanco); }
  for (let k = 0; k < 8; k++) { const x = V[0] + Math.round(h(k, 1, 496) * 38), y = 80 + Math.round(h(k, 2, 496) * 14); if (Math.sin(t * 3 + k * 2) > 0.5) pset(x, y, C.blanco); }
  R.recorte(null);
  for (let y = 30; y <= 96; y += 1) for (const x of [28, 42]) if (enV(x, y)) pset(x, y, hex('#2a2a30')); for (const y of [56, 76]) for (let x = 17; x <= 53; x++) if (enV(x, y)) pset(x, y, hex('#2a2a30'));
  // motas de polvo que flotan en el haz de luz
  for (let k = 0; k < 14; k++) { const u = (t * 0.03 + h(k, 1, 497)) % 1, y = Math.round(100 + u * 70), d = (y - 96) * 0.9, x = Math.round(24 + d + h(k, 2, 497) * 30 + Math.sin(t * 0.7 + k) * 2); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, hex('#fff8e0')); }
  // el reloj de arena de la estantería, el gato que duerme en el arca, el contable diminuto que cuenta monedas
  { const x = 168, y = 110, u = (t * 0.08) % 1; rect(x - 3, y - 13, x + 3, y - 13, M[2]); rect(x - 3, y - 1, x + 3, y - 1, M[2]); for (let j = 1; j < 12; j++) { const w = Math.abs(6 - j) < 2 ? 0 : Math.round(Math.abs(6 - j) / 2); pset(x - w - 1, y - 13 + j, hex('#c8d8e0')); pset(x + w + 1, y - 13 + j, hex('#c8d8e0')); }
    const arriba = Math.round((1 - u) * 4), abajo = Math.round(u * 4); for (let j = 0; j < arriba; j++) R.rect(x - 1, y - 8 - j, x + 1, y - 8 - j, hex('#e8c878')); for (let j = 0; j < abajo; j++) R.rect(x - 1 - (j > 1 ? 0 : 1), y - 2 - j, x + 1 + (j > 1 ? 0 : 1), y - 2 - j, hex('#e8c878')); pset(x, y - 6 + (Math.floor(t * 8) % 3), hex('#e8c878')); }
  { const x = 38, y = 133, c = hex('#d8883a'), r = Math.sin(t * 0.8) > 0 ? 1 : 0; rect(x - 7, y - 3 - r, x + 5, y, c); rect(x - 6, y - 4 - r, x + 4, y - 4 - r, hex('#e8a050')); for (let i = -6; i < 5; i += 3) pset(x + i, y - 2, hex('#b8682a')); rect(x + 4, y - 6, x + 8, y - 2, c); pset(x + 5, y - 7, c); pset(x + 8, y - 7, c); pset(x + 6, y - 4, hex('#3a2a20')); pset(x + 7, y - 4, hex('#3a2a20'));
    const cs = Math.round(Math.sin(t * 2) * 2); linea(x - 7, y - 1, x - 11, y + 1 + cs, c); }
  { const x = 292, fl = Math.sin(t * 11) > 0; b_figura(R, x, 136, 11, t, hex('#6a6a7a'), { dir: -1 }); pset(286, 134 - (fl ? 1 : 0), hex('#ffe08a')); pset(286, 135, hex('#ffb040')); const mo = Math.floor(t * 2) % 3; pset(288 + mo, 135, b_C.cupula[0]); pset(289, 135, b_C.cupula[2]); }
  if (o.delante !== false) mostradorDelante(R, t);
  return { suelo: 176, detras: 160, mostrador: [60, 300, 149], libre: [124, 224], ventana: V, puerta: [291, 160], arca: [38, 168] };
}

// El mostrador de la casa del Temple, que va por delante de quien atiende detrás (pies en y 160): el tablero de nogal
// (y 149–157) con su veta, el frente de tablas con arcos tallados y clavos de hierro (y 157–171), la vela que tiembla,
// el libro abierto, el tintero con la pluma, montones de monedas que destellan y la balanza que oscila. Deja libre el
// tablero entre x 124 y 224 para la bolsa y la carta.
export function mostradorDelante(R, t) {
  const { pset, rect, linea, disco } = R, M = b_C.madera, x0 = 60, x1 = 300;
  rect(x0, 149, x1, 156, M[0]); for (let y = 150; y < 156; y += 2) for (let x = x0; x <= x1; x++) if (h(x >> 3, y, 498) < 0.5) pset(x, y, M[1]); for (let x = x0; x <= x1; x += 37) rect(x, 149, x, 156, M[3]);
  rect(x0, 149, x1, 149, M[2]); rect(x0 - 2, 157, x1 + 2, 158, M[2]); rect(x0 - 2, 159, x1 + 2, 159, M[3]);
  rect(x0, 160, x1, 170, M[1]); for (let x = x0; x <= x1; x += 30) { rect(x, 160, x + 1, 170, M[3]); for (let i = 4; i < 27; i++) { const y = 163 + Math.round(Math.abs(i - 15.5) ** 1.6 / 14); pset(x + i, y, M[3]); pset(x + i, y + 1, M[2]); } rect(x + 4, 168, x + 26, 168, M[3]); pset(x + 2, 162, hex('#9a9aa8')); pset(x + 2, 168, hex('#9a9aa8')); }
  rect(x0 - 2, 171, x1 + 2, 172, M[3]);
  // la vela con su resplandor
  { const x = 70, fl = Math.round(Math.sin(t * 13) * 0.7); for (let j = -10; j <= 10; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 1.1); if (d < 12 && b_um(x + i, 136 + j) < (1 - d / 12) * 0.6) b_tiñe(R, x + i, 136 + j, hex('#ffe8a0'), 0.3); }
    rect(x - 4, 147, x + 4, 149, b_C.latón[1]); rect(x - 4, 147, x + 4, 147, b_C.latón[2]); rect(x - 2, 136, x + 2, 146, hex('#f2ecd8')); rect(x + 1, 136, x + 2, 146, hex('#d8d0b8')); pset(x - 2, 139, hex('#fff8e8'));
    pset(x, 135, hex('#3a2a20')); pset(x, 134, hex('#ff9030')); pset(x - 1, 134, hex('#ffb040')); pset(x + 1, 134, hex('#ffb040')); pset(x + fl, 133, hex('#ffd070')); pset(x + fl, 132, hex('#fff4c0')); pset(x + fl, 131, hex('#fff8e0')); }
  // el libro de cuentas abierto, el tintero y la pluma
  { const x = 84; rect(x, 148, x + 30, 152, hex('#5a2a1a')); rect(x + 1, 146, x + 14, 151, hex('#f2e8cc')); rect(x + 16, 146, x + 29, 151, hex('#f2e8cc')); rect(x + 15, 146, x + 15, 151, hex('#c8b890')); for (let y = 147; y < 151; y++) { rect(x + 2, y, x + 3 + Math.round(h(y, 1, 499) * 9), y, hex('#8a7a6a')); rect(x + 17, y, x + 18 + Math.round(h(y, 2, 499) * 9), y, hex('#8a7a6a')); } }
  { const x = 118; rect(x - 3, 146, x + 3, 151, hex('#2a2a34')); rect(x - 2, 145, x + 2, 145, hex('#4a4a5a')); pset(x - 2, 147, hex('#6a6a7a')); const p = Math.round(Math.sin(t * 0.7) * 0.6); linea(x, 145, x + 6 + p, 133, hex('#f2eee2')); linea(x + 1, 144, x + 7 + p, 134, hex('#c8c0b0')); pset(x + 6 + p, 132, C.blanco); }
  // montones de monedas que destellan
  for (const [x, n] of [[232, 4], [240, 6], [248, 3], [238, 2]]) { const y0 = n === 2 ? 152 : 150; for (let k = 0; k < n; k++) { const y = y0 - k * 2; rect(x - 3, y - 1, x + 3, y, b_C.cupula[0]); rect(x - 3, y, x + 3, y, b_C.cupula[1]); rect(x - 2, y - 1, x, y - 1, b_C.cupula[2]); }
    if (Math.sin(t * 2.5 + x) > 0.85) { const y = y0 - n * 2; pset(x - 1, y - 1, C.blanco); pset(x - 1, y - 3, C.blanco); pset(x - 3, y - 2, hex('#fff4c0')); pset(x + 1, y - 2, hex('#fff4c0')); } }
  // la balanza: el pie, el astil que oscila y los platillos colgados de sus cadenas
  { const x = 274, a = Math.sin(t * 1.2) * 0.12, L = 15, y = 122, xl = x - Math.round(Math.cos(a) * L), yl = y - Math.round(Math.sin(a) * L), xr = x + Math.round(Math.cos(a) * L), yr = y + Math.round(Math.sin(a) * L);
    rect(x - 6, 147, x + 6, 149, b_C.latón[1]); rect(x - 5, 146, x + 5, 146, b_C.latón[0]); rect(x - 1, 121, x, 146, b_C.latón[1]); rect(x - 1, 121, x - 1, 146, b_C.latón[2]); disco(x, 119, 2, b_C.latón[0]); pset(x - 1, 118, b_C.latón[2]);
    linea(xl, yl, xr, yr, b_C.latón[1]); linea(xl, yl - 1, xr, yr - 1, b_C.latón[2]);
    for (const [px, py, lleno] of [[xl, yl, true], [xr, yr, false]]) { linea(px, py, px - 4, py + 14, hex('#8a7a5a')); linea(px, py, px + 4, py + 14, hex('#8a7a5a')); rect(px - 6, py + 14, px + 6, py + 15, b_C.latón[0]); rect(px - 5, py + 16, px + 5, py + 16, b_C.latón[1]); rect(px - 5, py + 14, px - 2, py + 14, b_C.latón[2]); if (lleno) { rect(px - 3, py + 12, px + 2, py + 13, b_C.cupula[0]); pset(px - 1, py + 11, b_C.cupula[2]); } } }
}

// la altura del relieve del sello en el punto (u, v) del disco de radio 1 (−1 fuera; 1 campo y borde; 2 línea del suelo;
// 3 figuras; 4 orla de perlas, escudo y yelmos): dos caballeros en un caballo cansado que mira hacia la derecha
function b_alturaSello(u, v) {
  const d = Math.hypot(u, v), an = Math.atan2(v, u), re = 1 + 0.05 * Math.sin(an * 5 + 1) + 0.03 * Math.sin(an * 11 + 2);
  if (d > re) return -1; if (d > 0.985) return 1; if (d > 0.9) return 3;
  if (d > 0.82) { const k = Math.round(an / (Math.PI * 2 / 40)), ba = k * Math.PI * 2 / 40; return Math.hypot(u - Math.cos(ba) * 0.86, v - Math.sin(ba) * 0.86) < 0.028 ? 4 : 1; }
  if (d > 0.79) return 2;
  const sg = (ax, ay, bx, by, r) => { const vx = bx - ax, vy = by - ay, w = Math.max(0, Math.min(1, ((u - ax) * vx + (v - ay) * vy) / (vx * vx + vy * vy))); return Math.hypot(u - ax - w * vx, v - ay - w * vy) <= r; };
  const el = (cx, cy, rx, ry) => ((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2 <= 1;
  if (sg(-0.62, 0.64, 0.62, 0.64, 0.016)) return 2;
  if (el(-0.06, -0.05, 0.075, 0.11) && v < 0.06 - Math.abs(u + 0.06) * 0.6) return 4;   // el escudo del de atrás
  if (sg(0.13, -0.33, 0.13, -0.38, 0.058) || sg(-0.15, -0.31, -0.15, -0.36, 0.058)) return v < -0.425 ? 1 : Math.abs(v + (u > 0 ? 0.355 : 0.335)) < 0.012 && Math.abs(u - (u > 0 ? 0.15 : -0.13)) < 0.04 ? 2 : 4;   // los yelmos con su ranura
  if (sg(0.2, -0.04, 0.44, -0.7, 0.018) || (u > 0.38 && u < 0.52 && v > -0.69 && v < -0.58 && (v + 0.69) > (u - 0.38) * 0.75 && (v + 0.58) < -(u - 0.38) * 0.05 + 0.0)) return 3;   // la lanza y su banderola
  if (sg(0.13, 0.02, 0.13, -0.16, 0.075) || sg(-0.15, 0.02, -0.15, -0.15, 0.075) || sg(0.15, -0.1, 0.22, -0.05, 0.03) || sg(-0.12, -0.08, 0.02, -0.03, 0.028) || sg(0.13, 0.04, 0.17, 0.25, 0.035) || sg(-0.15, 0.04, -0.11, 0.25, 0.035)) return 3;   // los caballeros
  if (el(0, 0.21, 0.37, 0.15) || Math.hypot(u - 0.3, v - 0.19) < 0.13 || Math.hypot(u + 0.3, v - 0.18) < 0.14) return 3;   // el cuerpo del caballo
  if (sg(0.32, 0.13, 0.5, -0.05, 0.09) || sg(0.5, -0.07, 0.68, 0.13, 0.078) || Math.hypot(u - 0.52, v + 0.03) < 0.085) return 3;   // el cuello y la cabeza, gacha
  if (sg(0.47, -0.12, 0.37, -0.16, 0.026) || sg(0.52, -0.12, 0.6, -0.15, 0.024)) return 3;   // las orejas caídas
  if (sg(0.3, 0.3, 0.34, 0.45, 0.036) || sg(0.34, 0.45, 0.31, 0.6, 0.033) || sg(0.21, 0.3, 0.24, 0.46, 0.036) || sg(0.24, 0.46, 0.2, 0.6, 0.033)) return 3;   // las patas de delante, que flojean
  if (sg(-0.27, 0.3, -0.29, 0.6, 0.035) || sg(-0.37, 0.28, -0.41, 0.6, 0.035)) return 3;
  if (sg(-0.43, 0.13, -0.47, 0.44, 0.028)) return 3;   // la cola, lacia
  return 1;
}

// pinta el sello de cera de radio r en (cx, cy) con su relieve (luz arriba a la izquierda), motas y grietas finas
function b_pintaSello(R, cx, cy, r, luz) {
  const Ce = b_C.cera, n = Math.ceil(r * 1.12), W = 2 * n + 1, H = new Int8Array(W * W);
  for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) H[j * W + i] = b_alturaSello((i - n) / r, (j - n) / r);
  const g = (i, j) => (i < 0 || j < 0 || i >= W || j >= W ? -1 : H[j * W + i]), brillo = luz === 'dia' ? hex('#f2a8a0') : hex('#ffb880');
  for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) { const a = H[j * W + i], x = cx + i - n, y = cy + j - n; if (a < 0) { if (g(i - 2, j - 2) >= 0 && b_um(x, y) < 0.6) b_tiñe(R, x, y, hex('#2a1810'), 0.4); continue; }
    const ul = g(i - 1, j - 1), dr = g(i + 1, j + 1), ul2 = g(i - 2, j - 2);
    let c = a >= 3 ? Ce[2] : a === 2 ? Ce[0] : Ce[0];
    if (ul < a && ul >= 0) c = a >= 3 ? Ce[3] : Ce[2]; else if (dr < a && dr >= 0) c = Ce[1];
    if (ul > a || ul2 > a + 1) c = a >= 3 ? Ce[1] : Ce[4];
    if (ul < 0) c = Ce[3]; else if (dr < 0) c = Ce[4];
    const rr = h(x, y, 500); if (rr < 0.05) c = b_mez(c, Ce[4], 0.4); else if (rr > 0.97) c = b_mez(c, Ce[3], 0.5);
    const dl = Math.hypot(i - n * 0.55, j - n * 0.55) / (n * 1.5); if (b_um(x, y) < 0.35 - dl * 0.6 && a >= 1) c = b_mez(c, brillo, 0.35);
    R.pset(x, y, c); }
  for (let g2 = 0; g2 < 3; g2++) { let a = h(g2, 1, 501) * 6.28, d = 0.92 * r; for (let k = 0; k < r * 0.25; k++) { R.pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), Ce[4]); d -= 0.8; a += (h(k, g2, 502) - 0.5) * 0.04; } }
}

// lo que se mueve del sello: el párpado que cae y parpadea, la lengua, las gotas de sudor y los resoplidos
function b_vidaSello(R, cx, cy, r, t) {
  const Ce = b_C.cera, P = (u, v) => [Math.round(cx + u * r), Math.round(cy + v * r)], s = Math.max(1, Math.round(r / 22));
  const [ex, ey] = P(0.56, -0.02), cierra = (t % 3.6) < 0.35 ? 1 : 0;
  R.rect(ex - s - 1, ey - s - 1, ex + s + 1, ey + s, Ce[1]); R.rect(ex - s, ey - s + 1, ex + s, ey + s - 1, Ce[4]); R.rect(ex - s - 1, ey - s - 1, ex + s + 1, ey - s + cierra * s * 2, Ce[3]); R.rect(ex - s - 1, ey - s + 1 + cierra * s * 2, ex + s + 1, ey - s + 1 + cierra * s * 2, Ce[1]); R.rect(ex - s, ey + s + 1, ex + s, ey + s + 1, Ce[2]);
  const [lx, ly] = P(0.68, 0.19), l = Math.round((1.5 + Math.sin(t * 3) * 0.5) * s); R.rect(lx - s + 1, ly, lx, ly + l, Ce[3]); R.pset(lx, ly + l + 1, Ce[2]);
  for (let k = 0; k < 2; k++) { const u0 = [0.5, 0.05][k], v0 = [-0.13, 0.06][k], f = (t * 0.35 + k * 0.5) % 1, [gx, gy] = P(u0 + f * 0.02, v0 + f * 0.25);
    if (f < 0.85) { R.pset(gx, gy - s, hex('#f4c8c0')); R.rect(gx - (s > 1 ? 1 : 0), gy, gx + (s > 1 ? 1 : 0), gy + s, hex('#f4c8c0')); R.pset(gx, gy, C.blanco); R.pset(gx + 1, gy + s, Ce[1]); } }
  for (let k = 0; k < 2; k++) { const f = (t * 0.5 + k * 0.5) % 1, [px, py] = P(0.72 + f * 0.1, 0.12 + f * 0.04 - Math.sin(f * 3) * 0.03); if (f < 0.7 && s > 1) { R.pset(px, py, Ce[3]); R.pset(px + 1, py - 1, Ce[3]); R.pset(px + 2, py, Ce[2]); } }
}

function b_sello(R, t, o) {
  const { pset, rect, linea, disco } = R, cerca = o.camara === 'cerca', luz = o.luz ?? 'vela', M = b_C.madera, vela = luz !== 'dia';
  const [cx, cy, r] = cerca ? [160, 114, 63] : [126, 140, 24];
  b_fijo(R, 'sello:' + cerca + luz, () => {
    // la mesa de nogal con su veta
    for (let y = 0; y < 180; y++) { const tabla = Math.floor((y + 3) / 22); for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + tabla * 7 + Math.sin(x * 0.013 + tabla) * 3 + y * 0.35), r2 = h(x, y, 503); let c = v > 0.85 ? hex('#5a3820') : v < -0.8 ? hex('#3a2212') : hex('#4a2c18'); if ((y + 3) % 22 === 0) c = hex('#24140a'); else if ((y + 3) % 22 === 1) c = hex('#6a4428'); if (r2 < 0.03) c = hex('#2e1a0e'); R.buf[y * 320 + x] = c; } }
    // el pergamino escrito a trazos (sin letras), con su sombra y las esquinas que se levantan
    const [px0, py0, px1, py1] = cerca ? [-10, -10, 330, 46] : [34, 20, 216, 120];
    for (let y = py0 + 3; y <= py1 + 3; y++) for (let x = px0 + 4; x <= px1 + 4; x++) if (b_um(x, y) < 0.6) b_tiñe(R, x, y, hex('#1a0e06'), 0.45);
    for (let y = Math.max(0, py0); y <= Math.min(179, py1); y++) for (let x = Math.max(0, px0); x <= Math.min(319, px1); x++) { const borde = Math.min(x - px0, px1 - x, y - py0, py1 - y), r2 = h(x >> 1, y >> 1, 504);
      let c = r2 < 0.15 ? C.pergaminoS : r2 > 0.9 ? hex('#f4e8c4') : C.pergamino; if (borde < 3 && b_um(x, y) < 0.6) c = C.pergaminoS; if (h(x >> 3, y >> 3, 505) < 0.06) c = b_mez(c, hex('#a8885a'), 0.3); pset(x, y, c); }
    const renglon = (x0, x1, y, k) => { let x = x0; while (x < x1) { const w = 3 + Math.round(h(x, y, 506 + k) * 9); for (let i = 0; i < w && x + i < x1; i++) { pset(x + i, y, hex('#4a3a2a')); if ((x + i) % 3 === 0) pset(x + i, y - 1, hex('#6a5a48')); } x += w + 2; } };
    if (cerca) { for (let y = 25; y <= 40; y += 5) renglon(y < 30 ? 56 : 24, 266, y, y); }
    else { rect(44, 30, 56, 42, hex('#8a2a2a')); rect(46, 32, 54, 40, b_C.cupula[0]); rect(48, 34, 52, 38, hex('#2a4a7a')); for (let y = 32; y < 100; y += 5) renglon(y < 44 ? 60 : 44, 206, y, y); renglon(150, 196, 108, 1); linea(150, 112, 196, 110, hex('#4a3a2a')); }
    // el cordón trenzado de seda que baja del pergamino al sello
    const top = cerca ? 46 : py1, cyT = cy - r + 2;
    for (let y = top; y <= cyT; y++) for (const [dx, c1, c2] of [[-4, hex('#c8303a'), hex('#8a1e24')], [3, hex('#f2eee2'), hex('#c8c0b0')]]) { const x = cx + dx + Math.round(Math.sin(y * 0.5) * 1); pset(x, y, (y + dx) % 3 ? c1 : c2); pset(x + 1, y, (y + dx + 1) % 3 ? c1 : c2); }
    b_pintaSello(R, cx, cy, r, luz);
    if (!cerca) {
      // la barra de lacre, la matriz de latón, el tintero con su pluma, unas monedas y las gotas de cera
      linea(214, 168, 244, 154, hex('#a02a32')); linea(214, 169, 244, 155, hex('#6e1820')); linea(215, 167, 243, 153, hex('#cc4a48')); rect(244, 152, 247, 155, hex('#3a2a20'));
      { const x = 290, y = 148; disco(x + 2, y + 3, 11, hex('#1a0e06')); disco(x, y, 11, b_C.latón[1]); disco(x, y, 10, b_C.latón[0]); disco(x, y, 8, b_C.latón[1]); disco(x - 3, y - 3, 3, b_C.latón[2]); for (let a = 0; a < 6.28; a += 0.3) pset(Math.round(x + Math.cos(a) * 6), Math.round(y + Math.sin(a) * 6), b_C.latón[0]); rect(x + 9, y - 2, x + 18, y + 2, M[1]); rect(x + 9, y - 2, x + 18, y - 2, M[2]); }
      { const x = 18, y = 58; disco(x + 2, y + 2, 7, hex('#1a0e06')); disco(x, y, 7, hex('#2a2a34')); disco(x, y, 5, hex('#3a3a4a')); disco(x, y, 3, hex('#0a0a12')); pset(x - 4, y - 3, hex('#8a8aa0')); linea(x + 1, y - 1, x + 12, y - 22, hex('#f2eee2')); linea(x + 2, y - 1, x + 13, y - 21, hex('#c8c0b0')); for (let i = 0; i < 6; i++) { pset(x + 9 + Math.round(i * 0.6) - 1, y - 16 - i, hex('#e8e4dc')); pset(x + 11 + Math.round(i * 0.6) + 1, y - 15 - i, hex('#d8d4cc')); } }
      for (const [x, y] of [[236, 120], [246, 126], [228, 130]]) { disco(x + 1, y + 1, 4, hex('#1a0e06')); disco(x, y, 4, b_C.cupula[1]); disco(x, y, 3, b_C.cupula[0]); pset(x - 1, y - 1, b_C.cupula[2]); pset(x + 1, y, b_C.cupula[3]); }
      for (const [x, y] of [[170, 150], [186, 162], [160, 168]]) { disco(x, y, 2, hex('#a02a32')); pset(x - 1, y - 1, hex('#cc4a48')); }
    } else {
      for (const [x, y] of [[40, 150], [276, 160], [60, 168]]) { disco(x, y, 3, hex('#a02a32')); pset(x - 1, y - 1, hex('#cc4a48')); }
    }
  });
  // la vela (solo en el plano general) y el resplandor que tiembla sobre la mesa
  const fl = Math.sin(t * 11) * 0.5 + Math.sin(t * 17) * 0.3;
  if (!cerca) { const x = 262; rect(x - 9, 148, x + 9, 152, b_C.latón[1]); rect(x - 9, 148, x + 9, 148, b_C.latón[2]); rect(x - 3, 144, x + 3, 147, b_C.latón[0]); rect(x - 4, 104, x + 4, 143, hex('#f2ecd8')); rect(x + 2, 104, x + 4, 143, hex('#d8d0b8')); rect(x - 4, 104, x - 3, 143, hex('#fffaf0'));
    for (const [dx, l] of [[-4, 9], [3, 14], [0, 5]]) rect(x + dx, 104, x + dx + 1, 104 + l, hex('#fffaf0'));
    if (vela) for (let j = -26; j <= 26; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j * 1.2); if (d < 30 && d > 4 && b_um(x + i, 96 + j) < (1 - d / 30) * (0.55 + fl * 0.1)) b_tiñe(R, x + i, 96 + j, hex('#ffe8a0'), 0.22); }
    const f = Math.round(fl); pset(x, 103, hex('#2a1a10')); R.rect(x - 1, 99, x + 1, 102, hex('#ffb040')); R.rect(x - 1 + f, 96, x + 1 + f, 99, hex('#ffd070')); pset(x + f, 95, hex('#fff4c0')); pset(x + f, 94, hex('#fff8e0')); pset(x, 101, hex('#fff8e0'));
    for (let i = 0; i < 6; i++) { const u = (t * 0.5 + i / 6) % 1; if (b_um(x, 90 - Math.round(u * 20)) < 0.5 - u * 0.4) pset(x + Math.round(Math.sin(u * 8 + t) * 2), 90 - Math.round(u * 20), hex('#9a9090')); } }
  else if (vela) { for (let y = 0; y < 180; y += 1) for (let x = 250 + (y & 1); x < 320; x += 2) if (b_um(x, y) < (x - 250) / 140 * (0.8 + fl * 0.2)) b_tiñe(R, x, y, hex('#ffd890'), 0.2); }
  // un destello que tiembla en la orla y lo que se mueve del caballo
  { const a = -2.4 + Math.sin(t * 0.7) * 0.15 + fl * 0.05, d = r * 0.93; for (let k = -2; k <= 2; k++) pset(Math.round(cx + Math.cos(a + k * 0.03) * d), Math.round(cy + Math.sin(a + k * 0.03) * d), k === 0 ? C.blanco : hex('#ffc8a0')); }
  b_vidaSello(R, cx, cy, r, t);
  return { sello: [cx, cy, r], ojo: [Math.round(cx + 0.56 * r), Math.round(cy - 0.02 * r)], vela: cerca ? null : [262, 96], mesa: 180 };
}

const b_TMP = new WeakMap();

// dibuja con transparencia a (0–1, tramada) y un velo de niebla: lo que pinta dibuja() en (x0, y0)–(x1, y1) pasa por un
// búfer aparte y se compone sobre el fotograma
function b_conAlfa(R, a, [x0, y0, x1, y1], dibuja, velo = null, va = 0) {
  if (a <= 0.02) return; if (a >= 0.999 && !velo) { dibuja(); return; }
  let tmp = b_TMP.get(R); if (!tmp) b_TMP.set(R, (tmp = R.nuevo()));
  x0 = Math.max(0, Math.floor(x0)); y0 = Math.max(0, Math.floor(y0)); x1 = Math.min(319, Math.ceil(x1)); y1 = Math.min(179, Math.ceil(y1));
  for (let y = y0; y <= y1; y++) tmp.fill(0, y * 320 + x0, y * 320 + x1 + 1);
  const prev = R.usar(tmp); dibuja(); R.usar(prev); const D = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, c = tmp[i]; if (!c || b_um(x, y) >= a) continue; D[i] = velo ? b_mez(c, velo, va) : c; }
}

// una galera de lado: casco bajo con espolón, popa alzada con su castillete, tracas, remos (alzados o al agua, bogando),
// el mástil con la entena en diagonal, la vela recogida o desplegada con la cruz roja, y el farol de popa; s: escala
// (1: unos 76 px de largo), o.dir, o.vela (0 recogida … 1 desplegada), o.remos 'arriba' | 'agua', o.farol, o.noche
function b_galera(R, x, y, t, o = {}) {
  const { linea, poligono, pset } = R, s = o.s ?? 1, d = o.dir ?? 1, K = b_C.casco, V = b_C.vela, noche = o.noche !== false;
  const X = (i) => x + i * s * d, Y = (j) => y + j * s, P = (pts) => pts.map(([i, j]) => [X(i), Y(j)]);
  const os = noche ? (c) => b_mez(c, hex('#1a2440'), 0.35) : (c) => c;
  // los remos
  const n = 13; for (let k = 0; k < n; k++) { const i = -24 + k * 4; if (o.remos === 'agua') { const a = Math.sin(t * 3 + k * 0.1) * 3; linea(X(i), Y(-4), X(i - 3 + a), Y(5), os(K[2])); } else linea(X(i), Y(-4), X(i - 7), Y(-15), os(K[2])); }
  // el mástil, la entena y la vela
  const v = o.vela ?? 0, mx = 4;
  linea(X(mx), Y(-6), X(mx), Y(-44), os(K[3])); if (s >= 0.6) linea(X(mx + 0.6), Y(-6), X(mx + 0.6), Y(-44), os(K[1]));
  const e0 = [-22, -20], e1 = [30, -50]; linea(X(e0[0]), Y(e0[1]), X(e1[0]), Y(e1[1]), os(K[3]));
  if (v > 0.05) { const pie = [lerp(-6, -18, v), lerp(-22, -9, v)], pz = [lerp(20, 14, v), lerp(-44, -10, v)], ond = Math.sin(t * 2) * 1.5 * v;
    poligono(P([e0, e1, [pz[0] + ond, pz[1]], [pie[0], pie[1]]]), os(V[0])); poligono(P([[e1[0] - 6, e1[1] + 4], e1, [pz[0] + ond, pz[1]], [pz[0] - 4 + ond, pz[1]]]), os(V[1]));
    if (v > 0.6) { const cx = (e0[0] + e1[0] + pz[0] + pie[0]) / 4 + 2, cy = (e0[1] + e1[1] + pz[1] + pie[1]) / 4, w = 6 * v; poligono(P([[cx - 2, cy - w], [cx + 2, cy - w], [cx + 2, cy + w], [cx - 2, cy + w]]), os(hex('#c8303a'))); poligono(P([[cx - w, cy - 2], [cx + w, cy - 2], [cx + w, cy + 2], [cx - w, cy + 2]]), os(hex('#c8303a'))); } }
  else { for (let k = 0; k <= 20; k++) { const u = k / 20, i = lerp(e0[0], e1[0], u), j = lerp(e0[1], e1[1], u); pset(X(i), Y(j + 1), os(V[0])); if (s >= 0.6) { pset(X(i), Y(j + 2), os(k % 4 === 0 ? V[1] : V[0])); if (k % 3 === 1) pset(X(i), Y(j + 3), os(V[1])); } } }
  // el casco: espolón a proa, popa que sube y castillete
  poligono(P([[-34, -12], [-30, -6], [30, -6], [36, -8], [37, -5], [44, -1], [32, 2], [-28, 2], [-36, -3], [-38, -10]]), os(K[0]));
  poligono(P([[-30, -6], [32, -6], [32, -4], [-30, -4]]), os(K[2]));
  poligono(P([[-28, -1], [34, -1], [34, 0], [-28, 0]]), os(K[1]));
  poligono(P([[-34, -14], [-20, -14], [-20, -6], [-32, -6]]), os(K[1])); poligono(P([[-34, -15], [-20, -15], [-20, -14], [-34, -14]]), os(K[2]));
  linea(X(-38), Y(-10), X(-41), Y(-17), os(K[0])); linea(X(-41), Y(-17), X(-39), Y(-19), os(K[0]));
  if (s >= 0.6) for (let i = -18; i < 30; i += 4) pset(X(i), Y(-3), os(K[3]));
  if (o.farol) { const fl = Math.sin(t * 9 + x) > 0; pset(X(-40), Y(-20), b_C.farol[fl ? 2 : 0]); pset(X(-40), Y(-21), b_C.farol[1]); if (s >= 0.8) { pset(X(-40) + 1, Y(-20), b_C.farol[0]); pset(X(-40) - 1, Y(-20), b_C.farol[1]); } }
}

// un barril de pie (x: centro, base), con sus duelas, aros y su luz; luz: color del reflejo del farol
function b_barril(R, x, base, w = 6, al = 16, luz = hex('#d8a060')) {
  const { rect, pset } = R; rect(x - w, base - al, x + w, base, hex('#6a4224')); rect(x - w + 1, base - al, x - w + 2, base, hex('#8a5a30')); rect(x + w - 2, base - al, x + w, base, hex('#3a2414'));
  for (let i = x - w + 3; i < x + w - 2; i += 3) rect(i, base - al + 1, i, base - 1, hex('#5a3820')); for (const y of [base - al + 2, base - 3]) rect(x - w, y, x + w, y + 1, hex('#2a2a32'));
  rect(x - w + 1, base - al - 1, x + w - 1, base - al - 1, hex('#8a5a30')); pset(x - w + 1, base - al + 6, luz); pset(x - w + 1, base - al + 7, luz);
}

// el halo de un farol (o de una vela) que tiembla: aclara tramando alrededor de (x, y) con radio r
function b_halo(R, x, y, r, t, col = hex('#ffd890'), a = 0.35) {
  const fl = 0.85 + Math.sin(t * 11 + x) * 0.08 + Math.sin(t * 17) * 0.05;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; if (b_um(x + i, y + j) < (1 - d / r) * fl) b_tiñe(R, x + i, y + j, col, a); }
}

// el farol de hierro colgado de su poste, con su llama que tiembla
function b_farol(R, x, y, t) {
  const { rect, pset } = R, fl = Math.sin(t * 13 + x) > 0; rect(x - 3, y - 4, x + 3, y + 4, hex('#1a1a20')); rect(x - 2, y - 3, x + 2, y + 3, b_C.farol[0]); rect(x - 1, y - 2, x + 1, y + 2, fl ? b_C.farol[2] : b_C.farol[1]); rect(x, y - 3, x, y + 3, hex('#1a1a20')); rect(x - 4, y - 5, x + 4, y - 5, hex('#1a1a20')); pset(x, y - 6, hex('#1a1a20'));
}

// bancos de niebla que se arrastran de y0 a y1 (dos capas a distinta velocidad): aclaran tramando
function b_niebla(R, t, y0, y1, dens = 0.5, col = b_C.niebla, a = 0.4) {
  for (let y = y0; y <= y1; y++) { const fy = Math.sin((y - y0) / (y1 - y0) * Math.PI);
    for (let x = 0; x < 320; x++) { const n = 0.5 + 0.3 * Math.sin(x * 0.021 + t * 0.25 + y * 0.09) + 0.2 * Math.sin(x * 0.047 - t * 0.4 + y * 0.03); if (b_um(x, y) < n * fy * dens) b_tiñe(R, x, y, col, a); } }
}

function b_puertoNoche(R, t, o) {
  const { pset, rect, linea, disco } = R, hor = 92, fl = o.flota ?? 0, M = b_C.muro;
  const amarres = [[64, 132], [168, 130], [262, 133]];
  const m = b_fijo(R, 'puertoNoche', () => {
    // el mar: tramado oscuro con ondas, más claro hacia la bocana
    for (let y = hor; y < 150; y++) for (let x = 0; x < 320; x++) { const p = (y - hor) / 58, w = Math.sin(x * 0.3 + y * 1.7) > 0.8; R.buf[y * 320 + x] = w ? b_C.marN[2] : b_um(x, y) < p ? b_C.marN[0] : b_C.marN[1]; }
    // las casas del puerto a los lados: tejados a dos aguas, entramado, ventanas
    const casa = (x, w, top, base, k) => { rect(x, top, x + w, base, hex('#3a3a4a')); rect(x + w - 2, top, x + w, base, hex('#2a2a38'));
      for (let j = 0; j <= 6; j++) rect(x - 1 + j, top - j, x + w + 1 - j, top - j, j === 6 || (j % 2) ? hex('#4a2e2a') : hex('#5a3a32'));
      for (let i = x + 2; i < x + w - 2; i += 5) for (let j = top + 3; j < base - 3; j += 7) rect(i, j, i + 1, j + 2, h(i, j, 520 + k) < 0.5 ? hex('#1a1a26') : hex('#e8a040'));
      for (let j = top + 1; j < base; j += 7) rect(x, j, x + w, j, hex('#2a2230')); };
    for (const [x, w, top, k] of [[-2, 18, 72, 0], [14, 16, 66, 1], [28, 20, 74, 2], [46, 18, 70, 3], [62, 22, 78, 4], [226, 20, 76, 5], [244, 18, 70, 6], [260, 24, 74, 7], [282, 18, 68, 8], [298, 24, 72, 9]]) casa(x, w, top, 100, k);
    // las dos torres de la bocana: sillería con su lado de luna, almenas, saeteras con luz; la cadena entre las dos
    const torre = (x0, x1, top, k, redonda) => { b_sillar(R, x0, top, x1, 112, M, 5, 8, 40 + k); for (let y = top; y <= 112; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0); if (b_um(x, y) < (redonda ? 0.9 - u * 1.2 : 0.4)) b_tiñe(R, x, y, hex('#141a30'), 0.55); }
      b_almenas(R, x0 - 2, x1 + 2, top, [M[0], M[1], M[2]], 4, 5, 3); rect(x0 - 2, top, x1 + 2, top + 2, M[3]); rect(x0 - 3, 108, x1 + 3, 114, M[1]);
      for (let y = top + 10; y < 104; y += 14) { const sx = (x0 + x1) >> 1; rect(sx, y, sx, y + 5, h(y, k, 521) < 0.5 ? hex('#ffc860') : hex('#141420')); } };
    torre(92, 124, 44, 0, true); torre(198, 224, 56, 1, false);
    for (let i = 0; i <= 74; i++) { const x = 124 + i, y = Math.round(100 + Math.sin(i / 74 * Math.PI) * 7); pset(x, y, (i % 3) ? hex('#4a4a56') : hex('#6a6a7a')); }
    // el muelle de primer término: sillería mojada con la línea de algas, argollas; el empedrado de arriba
    b_sillar(R, 0, 146, 319, 156, [hex('#4a4c58'), hex('#34363e'), hex('#6a6c78'), hex('#262830')], 5, 12, 44);
    for (let x = 0; x < 320; x++) { pset(x, 155, hex('#2a3a2a')); if (b_um(x, 154) < 0.5) pset(x, 154, hex('#3a4a34')); }
    for (const x of [40, 120, 200, 280]) { disco(x, 150, 2, hex('#1a1a20')); pset(x, 150, hex('#4a4a56')); }
    for (let y = 156; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 156) / 4), col = Math.floor((x + fila * 3) / 6); R.buf[y * 320 + x] = (y - 156) % 4 === 3 || (x + fila * 3) % 6 === 0 ? hex('#22242c') : h(col, fila, 522) < 0.3 ? hex('#3e404c') : h(col, fila, 523) < 0.2 ? hex('#5a5c6a') : hex('#4a4c58'); }
    rect(0, 156, 319, 157, hex('#6a6c7a'));
    // bolardos, barriles, cajas, la red y los rollos de cuerda
    for (const x of [44, 214]) { rect(x - 3, 152, x + 3, 160, hex('#2a2a32')); rect(x - 4, 151, x + 4, 152, hex('#3a3a44')); pset(x - 2, 154, hex('#5a5a6a')); }
    for (const [x, b] of [[274, 172], [288, 172], [302, 172], [281, 155], [295, 155]]) b_barril(R, x, b, 6, 16);
    for (const [x0, y0] of [[300, 154], [312, 170]]) { rect(x0, y0 - 12, x0 + 14, y0, hex('#7a5a34')); rect(x0, y0 - 12, x0 + 14, y0 - 12, hex('#a87a48')); linea(x0, y0 - 12, x0 + 14, y0, hex('#5a3e22')); linea(x0 + 14, y0 - 12, x0, y0, hex('#5a3e22')); }
    for (const [cx, cy] of [[20, 168], [236, 166]]) for (let r = 7; r > 1; r -= 2) for (let a = 0; a < 6.28; a += 0.2) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.4), r % 4 === 3 ? hex('#a88a5a') : hex('#c8a870'));
    for (let i = 0; i < 26; i++) for (let j = 0; j < 12; j++) if ((i + j) % 4 === 0 || (i - j + 40) % 4 === 0) pset(6 + i, 150 + j + Math.round(Math.sin(i * 0.3) * 1), hex('#6a6a5a'));
  }, () => { b_degradado(R, 0, hor - 1, b_C.noche); const B = R.buf, [lx, ly, lr] = [232, 30, 7];
    for (let y = ly - lr - 9; y <= ly + lr + 9; y++) for (let x = lx - lr - 9; x <= lx + lr + 9; x++) { const d = Math.hypot(x - lx, y - ly); if (d <= lr) B[y * 320 + x] = (d > lr - 1 || (x * 3 + y) % 7 === 0) ? hex('#d8d0b4') : hex('#f4ecd0'); else if (d < lr + 9 && b_um(x, y) < (lr + 9 - d) / 14) B[y * 320 + x] = b_mez(B[y * 320 + x], hex('#f4ecd0'), 0.25); } });
  // estrellas que titilan (sobre el cielo a la vista, fuera de la esquina de Atom)
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 524) * 319), y = Math.round(h(k, 2, 524) ** 1.3 * 70); if (x > 272 && y < 48) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 524) * 2) + k); if (tw > -0.4) b_psM(R, m, x, y, tw > 0.5 ? C.blanco : hex('#8a94c0')); }
  b_nubes(R, t, m, hor, b_C.nubeNoche, 3, 0.6);
  // el reflejo de la luna y los de los faroles, que tiemblan en el agua; las ondas
  for (let y = hor + 1; y < 146; y++) { const w = Math.round(3 + (y - hor) * 0.15); for (let i = -w; i <= w; i++) { const x = 232 + i + Math.round(Math.sin(y * 0.7 + t * 2) * 2); if (Math.sin(y * 1.9 + t * 3 + i) > 0.55 && b_um(x, y) < 0.6) pset(x, y, hex('#c8c4b0')); } }
  for (const [rx, k] of [[109, 0], [211, 1], [101, 2], [26, 3]]) for (let y = 120; y < 146; y += 2) { const x = rx + Math.round(Math.sin(y * 0.8 + t * 2.5 + k) * 2); if (Math.sin(y * 2.3 - t * 4 + k) > 0.2) { pset(x, y, b_C.farol[0]); pset(x + 1, y, b_C.farol[1]); } }
  for (let k = 0; k < 30; k++) { const x = Math.round((h(k, 1, 525) * 340 + t * (3 + k % 4)) % 340) - 10, y = hor + 4 + Math.round(h(k, 2, 525) * 50); rect(x, y, x + 2 + (k % 3), y, b_C.marN[3]); }
  // la almenara de la torre derecha (fuego que tiembla) y las ventanas que se encienden y apagan
  { const x = 211, y = 50; for (let i = 0; i < 6; i++) { const u = (t * 2 + i / 6) % 1; pset(x - 2 + Math.round(Math.sin(i * 2 + t * 6) * 2), y - Math.round(u * 6), u < 0.3 ? b_C.farol[2] : u < 0.6 ? b_C.farol[0] : b_C.farol[1]); } rect(x - 3, y, x + 3, y + 1, b_C.farol[1]); b_halo(R, x, y - 2, 12, t, hex('#ffc070'), 0.25); }
  for (let k = 0; k < 6; k++) { const x = [5, 20, 52, 232, 266, 304][k], y = [78, 72, 76, 82, 80, 78][k]; if (Math.sin(t * 0.3 + k * 2.2) > 0) rect(x, y, x + 1, y + 2, b_C.farol[0]); }
  // las galeras: amarradas, o saliendo por la bocana hacia la niebla (o.flota)
  const bocana = [161, 99];
  for (let k = 2; k >= 0; k--) { const [ax, ay] = amarres[k], u = Math.max(0, Math.min(1, fl * 1.6 - k * 0.25)), e = u * u * (3 - 2 * u), b = Math.round(Math.sin(t * 1.2 + k) * 1);
    if (u <= 0) { if (k !== 1) for (const [bx, by] of [[44, 152], [214, 152]]) if (Math.abs(bx - ax) < 60) for (let i = 0; i <= 10; i++) pset(Math.round(lerp(bx, ax - 30, i / 10)), Math.round(lerp(by, ay - 6, i / 10) + Math.sin(i / 10 * Math.PI) * 3), hex('#8a7a5a'));
      b_galera(R, ax, ay + b, t, { dir: k === 1 ? -1 : 1, farol: true, s: 1 }); continue; }
    const x = e < 0.6 ? lerp(ax, bocana[0], e / 0.6) : lerp(bocana[0], bocana[0] + (k - 1) * 40, (e - 0.6) / 0.4), y = e < 0.6 ? lerp(ay, bocana[1] + 2, e / 0.6) : lerp(bocana[1] + 2, 94, (e - 0.6) / 0.4), s = e < 0.6 ? lerp(1, 0.45, e / 0.6) : lerp(0.45, 0.2, (e - 0.6) / 0.4), al = e < 0.55 ? 1 : lerp(1, 0.25, (e - 0.55) / 0.45);
    b_conAlfa(R, al, [x - 50 * s, y - 55 * s, x + 50 * s, y + 6], () => b_galera(R, Math.round(x), Math.round(y + b), t, { s, dir: 1, vela: Math.min(1, u * 2), remos: 'agua', farol: true }), hex('#8a98b0'), Math.min(0.6, (1 - s) * 0.7)); }
  if (fl > 0.4) for (let k = 0; k < 5; k++) { const a = Math.min(0.6, (fl - 0.4) * 1.2) * (0.7 + 0.3 * Math.sin(t * 0.5 + k)), x = 128 + k * 17 + Math.sin(t * 0.1 + k) * 4, y = 93 + (k % 2);
    b_conAlfa(R, a, [x - 12, y - 14, x + 12, y + 2], () => b_galera(R, Math.round(x), y, t, { s: 0.24 + (k % 2) * 0.05, vela: 1, remos: 'agua' }), hex('#8a98b0'), 0.4); }
  // la niebla que se arrastra
  b_niebla(R, t, 80, 128, 0.55, b_C.niebla, 0.32); b_niebla(R, t * 1.6 + 40, 120, 150, 0.35, b_C.niebla, 0.25);
  // el farol del muelle y su halo; el gato que mueve la cola en los barriles
  rect(108, 112, 110, 168, hex('#1a1a20')); rect(109, 112, 109, 166, hex('#3a3a46')); rect(106, 165, 112, 168, hex('#1a1a20')); rect(108, 114, 118, 115, hex('#1a1a20')); rect(117, 115, 117, 116, hex('#1a1a20'));
  b_farol(R, 118, 120, t); b_halo(R, 118, 120, 22, t, hex('#ffd890'), 0.28);
  { const x = 288, y = 138, c = hex('#2a2430'), cs = Math.round(Math.sin(t * 1.6) * 2); rect(x - 4, y - 3, x + 2, y, c); rect(x + 1, y - 6, x + 4, y - 3, c); pset(x + 1, y - 7, c); pset(x + 4, y - 7, c); pset(x + 2, y - 5, Math.sin(t * 0.7) > -0.9 ? hex('#c8e040') : c); pset(x + 3, y - 5, hex('#c8e040')); linea(x - 4, y - 1, x - 7, y - 4 + cs, c); }
  return { suelo: 168, pies: [80, 130, 170, 210, 250], bocana, galeras: amarres, farol: [118, 120], luna: [232, 30], horizonte: hor };
}

function b_muelle(R, t, o) {
  const { pset, rect, linea, disco } = R, K = b_C.casco, bob = Math.round(Math.sin(t * 1.1) * 1);
  b_fijo(R, 'muelle', () => {
    b_degradado(R, 0, 112, b_C.noche);
    for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 530) * 319), y = Math.round(h(k, 2, 530) * 60); if (!(x > 272 && y < 48)) pset(x, y, k % 3 ? hex('#8a94c0') : C.blanco); }
    for (let x = 0; x < 320; x++) { const yc = 82 + Math.round(h(x >> 4, 1, 531) * 14); for (let y = yc; y < 112; y++) R.buf[y * 320 + x] = (x & 15) === 0 && y < yc + 6 ? hex('#2a2a38') : hex('#262838'); if (h(x >> 2, yc, 532) < 0.2) for (let y = yc + 4; y < 108; y += 7) rect(x, y, x, y + 1, hex('#c88a3a')); }
    for (let y = 112; y < 140; y++) for (let x = 0; x < 320; x++) R.buf[y * 320 + x] = Math.sin(x * 0.25 + y * 1.3) > 0.85 ? b_C.marN[2] : b_um(x, y) < (y - 112) / 28 ? b_C.marN[0] : b_C.marN[1];
    // el borde del muelle y el empedrado grande
    b_sillar(R, 0, 136, 319, 146, [hex('#4a4c58'), hex('#34363e'), hex('#6a6c78'), hex('#262830')], 5, 16, 50); for (let x = 0; x < 320; x++) pset(x, 145, hex('#2a3a2a'));
    rect(0, 146, 319, 148, hex('#7a7c8a')); rect(0, 149, 319, 149, hex('#2a2c34'));
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fh = 4 + Math.floor((y - 150) / 10), fila = Math.floor((y - 150) / 6), col = Math.floor((x + fila * 5) / 10); R.buf[y * 320 + x] = (y - 150) % 6 === 5 || (x + fila * 5) % 10 === 0 ? hex('#22242c') : (y - 150) % 6 === 0 ? hex('#6a6c7a') : h(col, fila, 533) < 0.3 ? hex('#3e404c') : hex('#4c4e5a'); }
    // los barriles apilados, las cajas, la red colgada y el ancla
    for (const [x, b] of [[12, 168], [30, 168], [48, 168], [21, 150], [39, 150], [30, 132]]) b_barril(R, x, b, 8, 18);
    for (const [x0, y0, w] of [[60, 168, 20], [64, 150, 14]]) { rect(x0, y0 - w + 4, x0 + w, y0, hex('#7a5a34')); rect(x0, y0 - w + 4, x0 + w, y0 - w + 4, hex('#a87a48')); for (let i = 1; i < 3; i++) rect(x0, y0 - (w - 4) * i / 3, x0 + w, y0 - (w - 4) * i / 3, hex('#5a3e22')); rect(x0 + w - 1, y0 - w + 4, x0 + w, y0, hex('#4a3018')); }
    for (let i = 0; i < 36; i++) for (let j = 0; j < 20; j++) if ((i + j) % 4 === 0 || (i - j + 40) % 4 === 0) pset(226 + i, 114 + j + Math.round(Math.sin(i * 0.17) * 3), hex('#7a7a6a'));
    rect(224, 112, 264, 113, b_C.madera[1]); for (const x of [224, 262]) rect(x, 112, x + 2, 150, b_C.madera[3]);
    { const x = 92, y = 168; rect(x, y - 24, x + 2, y - 2, hex('#3a3a44')); rect(x - 6, y - 24, x + 8, y - 22, hex('#3a3a44')); disco(x + 1, y - 27, 2, hex('#3a3a44')); for (let i = -9; i <= 11; i++) pset(x + i, y - 2 - Math.round(Math.abs(i) ** 1.5 / 8), hex('#4a4a56')); }
    for (let r = 9; r > 1; r -= 2) for (let a = 0; a < 6.28; a += 0.15) pset(Math.round(196 + Math.cos(a) * r), Math.round(170 + Math.sin(a) * r * 0.4), r % 4 === 1 ? hex('#a88a5a') : hex('#c8a870'));
    rect(244, 152, 252, 166, hex('#2a2a32')); rect(242, 150, 254, 152, hex('#3a3a44')); pset(246, 155, hex('#5a5a6a'));
    rect(292, 104, 295, 168, hex('#1a1a20')); rect(288, 166, 299, 168, hex('#1a1a20')); rect(282, 104, 295, 105, hex('#1a1a20'));
  });
  // el casco de la galera amarrada detrás del muelle, que cabecea
  { const y0 = 72 + bob, arr = (x) => Math.round(((x - 200) / 130) ** 2 * 8);   // el arrufo: la borda sube hacia popa y hacia proa
    for (let x = 70; x < 320; x++) { const top = y0 + 10 - arr(x); for (let y = top; y <= 124 + bob; y++) { const p = (y - top) / (124 + bob - top), fila = Math.floor((y - top) / 6);
        let c = p < 0.12 ? K[2] : p > 0.75 ? K[3] : (y - top) % 6 === 0 ? K[3] : (y - top) % 6 === 1 ? K[2] : K[0]; if ((x + fila * 11) % 23 === 0 && (y - top) % 6 > 1) c = K[3]; if (p > 0.4 && b_um(x, y) < (p - 0.4)) c = b_mez(c, C.k, 0.3); pset(x, y, c); }
      pset(x, top - 1, K[3]); }
    rect(70, y0 - 6, 108, y0 + 10, K[1]); rect(70, y0 - 7, 108, y0 - 6, K[2]); for (let x = 72; x < 108; x += 4) rect(x, y0 - 4, x + 1, y0 + 2, K[3]);
    for (let x = 116; x < 320; x += 9) { const yy = y0 + 17 - arr(x); rect(x, yy, x + 2, yy + 2, hex('#120c08')); linea(x + 1, yy + 1, x - 14, yy - 19, K[2]); linea(x + 2, yy + 1, x - 13, yy - 19, K[1]); }
    linea(200, y0 + 10, 200, 10, K[3]); linea(201, y0 + 10, 201, 10, K[1]); for (let i = 0; i <= 150; i++) { const x = 110 + i, y = Math.round(40 - i * 0.16) + bob; pset(x, y, K[3]); pset(x, y + 1, b_C.vela[1]); if (i % 3) pset(x, y + 2, b_C.vela[0]); if (i % 7 === 2) pset(x, y + 3, b_C.vela[1]); }
    b_farol(R, 74, y0 - 12, t); linea(74, y0 - 7, 74, y0 - 16, hex('#1a1a20'));
    for (let x = 70; x < 330; x++) { const w = Math.sin(x * 0.2 + t * 2) > 0.5; if (w) pset(x, 124 + bob, b_C.marN[3]); } }
  { const u = (t * 0.15) % 2, x = Math.round(u < 1 ? lerp(130, 180, u) : lerp(180, 130, u - 1)); b_figura(R, x, 82 + bob, 9, t, hex('#5a4a3a'), { anda: true, dir: u < 1 ? 1 : -1 }); }
  // reflejos en el agua y la amarra al bolardo
  for (let y = 126; y < 136; y += 2) { const x = 74 + Math.round(Math.sin(y + t * 3) * 2); pset(x, y, b_C.farol[0]); pset(x + 1, y, b_C.farol[1]); }
  for (let i = 0; i <= 20; i++) pset(Math.round(lerp(248, 290, i / 20)), Math.round(lerp(151, 100 + bob, i / 20) + Math.sin(i / 20 * Math.PI) * 6), hex('#a88a5a'));
  b_niebla(R, t, 60, 120, 0.5, b_C.niebla, 0.3);
  b_farol(R, 287, 112, t); b_halo(R, 287, 112, 24, t, hex('#ffd890'), 0.28);
  // una gaviota dormida en el bolardo
  { const x = 248, y = 149, r = Math.sin(t * 0.8) > 0.8 ? 1 : 0; rect(x - 3, y - 4 + r, x + 2, y - 1, C.blanco); rect(x - 3, y - 3 + r, x - 1, y - 2, hex('#9aa0b0')); rect(x + 1, y - 6 + r, x + 3, y - 4 + r, C.blanco); pset(x + 4, y - 5 + r, hex('#e8a040')); pset(x + 2, y - 5 + r, hex('#3a3a3a')); }
  return { suelo: 166, pies: [100, 130, 160, 200, 230], farol: [287, 112], galera: [200, 124], barriles: [0, 60] };
}

const b_VENT = [[30, 30, 54, 92], [238, 48, 262, 104]];   // los ventanales: x0, y0 (punta), x1, y1

function b_enVent([x0, y0, x1, y1], x, y) { const cx = (x0 + x1) / 2, w = (x1 - x0) / 2; if (x < x0 || x > x1 || y > y1) return false; const ys = y0 + w * 1.6; return y >= ys || Math.hypot(Math.abs(x - cx) + w * 0.6, y - ys) <= w * 1.6; }

function b_salaPiedra(R, k) {
  const { pset, rect } = R;
  b_sillar(R, 0, 0, 319, 128, b_C.muro, 7, 14, 60 + k);
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) { const kx = Math.abs(x - 160) / 160, top = 6 + kx * kx * 26; if (y < top && b_um(x, y) < 0.75) b_tiñe(R, x, y, hex('#2a2420'), 0.5); }
  for (let x = 0; x < 320; x++) { const kx = Math.abs(x - 160) / 160, y = Math.round(6 + kx * kx * 26); pset(x, y, b_C.muro[2]); pset(x, y + 1, b_C.muro[2]); pset(x, y + 2, b_C.muro[3]); }
}

function b_vidriera(R, v, k) {
  const [x0, y0, x1, y1] = v, cols = [hex('#3a6ac8'), hex('#c83a3a'), hex('#e8c040'), hex('#4a9a5a'), hex('#a8c8e8')];
  for (let y = y0 - 4; y <= y1 + 4; y++) for (let x = x0 - 4; x <= x1 + 4; x++) { if (b_enVent(v, x, y)) { const u = Math.floor((x + y) / 5), w = Math.floor((x - y + 200) / 5), plomo = (x + y) % 5 === 0 || (x - y + 200) % 5 === 0;
      R.pset(x, y, plomo ? hex('#2a2a34') : (u + w) % 5 === 0 ? cols[(u + k) % 4] : h(u, w, 540) < 0.2 ? cols[2] : cols[4]); }
    else if (b_enVent(v, x - 3, y) || b_enVent(v, x + 3, y) || b_enVent(v, x, y + 3) || b_enVent(v, x, y - 3)) R.pset(x, y, x < (x0 + x1) / 2 ? b_C.muro[2] : b_C.muro[1]); }
  R.rect(x0 - 5, y1 + 4, x1 + 5, y1 + 6, b_C.muro[2]); R.rect(x0 - 5, y1 + 7, x1 + 5, y1 + 7, b_C.muro[3]);
}

function b_baldosas(R, y0, k = 0) {
  const B = b_C.baldosa;
  for (let y = y0; y < 180; y++) { const al = y - y0 + 12, z = 900 / al, fz = z / 4, fila = Math.floor(fz), thz = 900 / (al * al) / 4;
    for (let x = 0; x < 320; x++) { const wx = (x - 160) * z / 140 / 4, col = Math.floor(wx), thx = z / 140 / 4;
      let c = ((col + fila) & 1) ? B[0] : B[2]; if (((col + fila) & 1) && h(col, fila, 541 + k) < 0.15) c = B[3]; if (fz - fila < thz * 1.1 || wx - col < thx * 1.1) c = hex('#4a3020'); else if (h(x, y, 542) < 0.04) c = b_mez(c, C.k, 0.3); else if (fz - fila < thz * 2.2) c = b_mez(c, C.blanco, 0.25);
      R.buf[y * 320 + x] = c; } }
}

// el haz de luz de un ventanal que cae hacia la derecha y abajo, tramado
function b_haz(R, v, y1, inclin = 0.7, a = 0.2) { const [x0, , x1, yb] = v; for (let y = yb + 7; y <= y1; y++) { const d = (y - yb) * inclin; for (let x = Math.round(x0 + d); x <= x1 + d * 1.3; x++) if (b_um(x, y) < 0.45) b_tiñe(R, x, y, hex('#fff4d8'), a); } }

// una silla alta de respaldo apuntado (x: centro, suelo), con su cojín rojo
function b_sillaAlta(R, x, suelo, alto) {
  const { rect, pset } = R, M = b_C.madera, top = suelo - alto;
  rect(x - 11, top + 6, x + 11, suelo, M[3]); rect(x - 10, top + 6, x + 10, suelo, M[0]); rect(x - 8, top + 9, x + 8, suelo - 16, hex('#7a2028')); for (let y = top + 11; y < suelo - 16; y += 4) rect(x - 7, y, x + 7, y, hex('#5e141c'));
  for (let j = 0; j <= 7; j++) rect(x - Math.round(10 - j * 1.3), top + 6 - j, x + Math.round(10 - j * 1.3), top + 6 - j, j === 7 ? M[2] : M[0]); pset(x, top - 2, M[2]); pset(x, top - 3, b_C.cupula[0]);
  for (const s of [-1, 1]) { rect(x + s * 12 - 1, top + 2, x + s * 12 + 1, suelo, M[1]); pset(x + s * 12, top + 1, b_C.cupula[0]); }
  rect(x - 10, top + 6, x - 9, suelo, M[2]);
}

function b_tribunal(R, t, o) {
  const { pset, rect, linea, disco } = R, M = b_C.madera;
  b_fijo(R, 'tribunal', () => {
    b_salaPiedra(R, 0); for (const [i, v] of b_VENT.entries()) b_vidriera(R, v, i);
    // el tapiz rojo de rombos con su galón y sus flecos
    { const x0 = 104, x1 = 216, y0 = 24, y1 = 92; rect(x0 - 2, y0 - 3, x1 + 2, y0 - 1, M[1]);
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const ond = Math.round(Math.sin(x * 0.2) * 0.8), borde = x < x0 + 5 || x > x1 - 5 || y < y0 + 5 || y > y1 - 5, dx = Math.abs(((x - x0) % 16) - 8), dy = Math.abs(((y - y0) % 16) - 8);
        let c = borde ? ((x + y) % 4 < 2 ? b_C.tela[3] : b_C.tela[1]) : dx + dy === 7 ? b_C.tela[3] : dx + dy < 3 ? hex('#2a4a8a') : (x % 9 === 0 ? b_C.tela[1] : b_C.tela[0]); if (h(x, y, 543) < 0.04) c = b_C.tela[2]; pset(x, y + ond, c); }
      for (let x = x0; x <= x1; x += 2) rect(x, y1 + 1, x, y1 + 3, b_C.tela[3]); }
    // el estrado: tarima de madera y escalón
    rect(84, 116, 236, 128, M[0]); for (let x = 84; x <= 236; x += 12) rect(x, 117, x, 128, M[3]); rect(84, 116, 236, 116, M[2]); rect(80, 126, 240, 130, M[1]); rect(80, 126, 240, 126, M[2]);
    for (const [x, al] of [[124, 52], [160, 62], [196, 52]]) b_sillaAlta(R, x, 128, al);
    b_baldosas(R, 128, 0);
    b_haz(R, b_VENT[0], 179, 0.75, 0.2); b_haz(R, b_VENT[1], 179, 0.45, 0.16);
    // el banco del declarante y el atril del escribano
    { const x0 = 18, x1 = 84, y = 156; rect(x0, y - 12, x1, y - 10, M[2]); rect(x0, y - 9, x1, y - 8, M[1]); for (const x of [x0 + 2, x1 - 4]) { rect(x, y - 8, x + 2, y + 8, M[3]); rect(x, y - 26, x + 2, y - 12, M[3]); } rect(x0, y - 27, x1, y - 24, M[0]); rect(x0, y - 27, x1, y - 27, M[2]); rect(x0, y - 20, x1, y - 19, M[1]); }
    { const x = 286, y = 168; rect(x - 2, y - 30, x + 2, y, M[3]); rect(x - 8, y - 2, x + 8, y, M[1]); for (let i = -12; i <= 12; i++) { const yy = y - 36 + Math.round(i * 0.35); rect(x + i, yy, x + i, yy + 3, M[0]); pset(x + i, yy, M[2]); }
      for (let i = -9; i <= 6; i += 1) pset(x + i, y - 36 + Math.round(i * 0.35) - 1, hex('#f2e8cc')); for (let i = -8; i <= 4; i += 2) pset(x + i, y - 36 + Math.round(i * 0.35) - 1, hex('#6a5a48')); }
    // apliques de vela en la pared
    for (const x of [86, 234]) { rect(x - 3, 70, x + 3, 72, b_C.latón[1]); rect(x - 1, 72, x + 1, 76, b_C.latón[1]); rect(x - 1, 62, x + 1, 69, hex('#f2ecd8')); }
  });
  for (const x of [86, 234]) { const fl = Math.round(Math.sin(t * 12 + x) * 0.7); pset(x + fl, 59, hex('#fff4c0')); pset(x, 60, hex('#ffd070')); pset(x, 61, hex('#ff9030')); b_halo(R, x, 62, 12, t, hex('#ffd890'), 0.22); }
  // motas en los haces de luz y la paloma en el alféizar del ventanal
  for (let k = 0; k < 18; k++) { const v = b_VENT[k % 2], u = (t * 0.025 + h(k, 1, 544)) % 1, y = Math.round(v[3] + 8 + u * 70), d = (y - v[3]) * (k % 2 ? 0.45 : 0.75), x = Math.round(v[0] + d + h(k, 2, 544) * 24 + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 2 + k) > -0.2) pset(x, y, hex('#fff8e0')); }
  { const x = 46, y = 97, pic = Math.sin(t * 3) > 0.7; rect(x - 2, y - 3, x + 2, y - 1, hex('#9a9aa8')); pset(x + 3, y - (pic ? 2 : 4), hex('#6a6a7a')); pset(x + 4, y - (pic ? 1 : 4), hex('#e8a040')); pset(x - 3, y - 3, hex('#6a6a7a')); }
  if (o.delante !== false) tribunalDelante(R, t);
  return { suelo: 168, detras: 136, sillas: [124, 160, 196], mesa: [92, 228, 124], banco: [18, 84, 156], atril: [286, 168], ventanas: b_VENT };
}

// La mesa de los inquisidores, que va por delante de los que se sientan detrás (pies en y 136): el tablero (y 124–128),
// el paño rojo con el galón de oro y sus pliegues hasta el suelo, pergaminos con su sello colgado, dos velas que
// tiemblan, el tintero con la pluma y un reloj de arena que corre.
export function tribunalDelante(R, t) {
  const { pset, rect, linea } = R, M = b_C.madera, T = b_C.tela, x0 = 92, x1 = 228;
  rect(x0 - 2, 122, x1 + 2, 126, M[0]); rect(x0 - 2, 122, x1 + 2, 122, M[2]);
  for (let y = 126; y <= 150; y++) for (let x = x0; x <= x1; x++) { const p = Math.sin((x - x0) * 0.35); let c = p > 0.6 ? T[2] : p < -0.6 ? T[1] : T[0]; if (y < 131) c = (x + y) % 3 ? T[3] : hex('#a87a18'); else if (y === 131) c = T[1]; if (y === 150) c = T[1]; pset(x, y, c); }
  for (let x = x0; x <= x1; x += 3) pset(x, 151, T[3]);
  // pergaminos con su sello, el tintero con la pluma, el reloj de arena
  for (const [x, w] of [[104, 18], [176, 22]]) { rect(x, 119, x + w, 122, hex('#f2e8cc')); rect(x, 122, x + w, 122, hex('#c8b890')); for (let i = x + 2; i < x + w - 2; i += 3) pset(i, 120, hex('#6a5a48')); linea(x + w - 4, 122, x + w - 3, 128, hex('#c8303a')); R.disco(x + w - 3, 130, 2, b_C.cera[0]); pset(x + w - 4, 129, b_C.cera[3]); }
  { const x = 160; rect(x - 3, 118, x + 3, 122, hex('#2a2a34')); pset(x - 2, 119, hex('#6a6a7a')); linea(x + 1, 118, x + 7, 106, hex('#f2eee2')); linea(x + 2, 118, x + 8, 107, hex('#c8c0b0')); }
  { const x = 142, y = 121, u = (t * 0.1) % 1; rect(x - 3, y - 12, x + 3, y - 12, M[2]); rect(x - 3, y, x + 3, y, M[2]); rect(x - 3, y - 12, x - 3, y, M[1]); rect(x + 3, y - 12, x + 3, y, M[1]);
    for (let j = 1; j < 11; j++) { const w = Math.round(Math.abs(5.5 - j) / 2); pset(x - w - 1, y - 12 + j, hex('#c8d8e0')); pset(x + w + 1, y - 12 + j, hex('#c8d8e0')); }
    for (let j = 0; j < Math.round((1 - u) * 3); j++) rect(x - 1, y - 8 - j, x + 1, y - 8 - j, hex('#e8c878')); for (let j = 0; j < Math.round(u * 3) + 1; j++) rect(x - 1 - (j ? 0 : 1), y - 1 - j, x + 1 + (j ? 0 : 1), y - 1 - j, hex('#e8c878')); pset(x, y - 5 + (Math.floor(t * 8) % 3), hex('#e8c878')); }
  for (const x of [98, 222]) { const fl = Math.round(Math.sin(t * 12 + x) * 0.7); rect(x - 3, 120, x + 3, 122, b_C.latón[1]); rect(x - 1, 108, x + 1, 119, hex('#f2ecd8')); pset(x, 107, hex('#2a1a10')); pset(x, 106, hex('#ff9030')); pset(x - 1, 106, hex('#ffb040')); pset(x + 1, 106, hex('#ffb040')); pset(x + fl, 105, hex('#ffd070')); pset(x + fl, 104, hex('#fff4c0')); b_halo(R, x, 106, 10, t, hex('#ffd890'), 0.2); }
}

function b_banco(R, t, o) {
  const { pset, rect, linea, disco } = R, M = b_C.madera, V = [26, 18, 58, 60];
  b_fijo(R, 'banco', () => {
    b_sillar(R, 0, 0, 319, 136, b_C.muro, 10, 20, 70);
    for (let y = V[1] - 5; y <= V[3] + 5; y++) for (let x = V[0] - 5; x <= V[2] + 5; x++) { if (b_enVent(V, x, y)) R.pset(x, y, b_um(x, y) < (y - V[1]) / 60 ? hex('#c8dcec') : hex('#a8c8e8')); else if (b_enVent(V, x - 4, y) || b_enVent(V, x + 4, y) || b_enVent(V, x, y + 4) || b_enVent(V, x, y - 4)) R.pset(x, y, x < 42 ? b_C.muro[2] : b_C.muro[1]); }
    for (const x of [34, 42, 50]) for (let y = V[1]; y <= V[3]; y++) if (b_enVent(V, x, y)) { pset(x, y, hex('#2a2a30')); pset(x + 1, y, hex('#4a4a54')); }
    for (const y of [36, 48]) for (let x = V[0]; x <= V[2]; x++) if (b_enVent(V, x, y)) pset(x, y, hex('#2a2a30'));
    rect(V[0] - 6, V[3] + 5, V[2] + 6, V[3] + 7, b_C.muro[2]);
    // el suelo de baldosas, más grandes
    b_baldosas(R, 136, 1);
    b_haz(R, V, 179, 1.1, 0.22);
    // la antorcha en su soporte de hierro
    rect(226, 70, 230, 72, hex('#2a2a30')); linea(228, 72, 228, 82, hex('#2a2a30')); rect(225, 58, 231, 70, b_C.madera[1]); rect(225, 58, 231, 59, b_C.madera[3]);
    // la esquina de la mesa de los inquisidores, con su paño, pergaminos y la vela
    { const x0 = 252; rect(x0 - 2, 118, 319, 122, M[0]); rect(x0 - 2, 118, 319, 118, M[2]); for (let y = 122; y <= 166; y++) for (let x = x0; x < 320; x++) { const p = Math.sin((x - x0) * 0.3); pset(x, y, y < 128 ? ((x + y) % 3 ? b_C.tela[3] : hex('#a87a18')) : p > 0.6 ? b_C.tela[2] : p < -0.6 ? b_C.tela[1] : b_C.tela[0]); }
      rect(264, 114, 290, 117, hex('#f2e8cc')); rect(264, 117, 290, 117, hex('#c8b890')); for (let i = 266; i < 288; i += 3) pset(i, 115, hex('#6a5a48')); rect(270, 107, 276, 117, hex('#f2e8cc')); rect(299, 114, 305, 117, b_C.latón[1]); rect(301, 98, 303, 113, hex('#f2ecd8')); }
    // el banco: respaldo, asiento de tablas gastadas, patas
    { const x0 = 70, x1 = 206, y = 150; rect(x0, y - 30, x1, y - 24, M[0]); rect(x0, y - 30, x1, y - 30, M[2]); rect(x0, y - 24, x1, y - 24, M[3]); for (let x = x0 + 6; x < x1; x += 22) rect(x, y - 23, x + 2, y - 6, M[3]);
      rect(x0 - 2, y - 6, x1 + 2, y - 2, M[0]); rect(x0 - 2, y - 6, x1 + 2, y - 6, M[2]); rect(x0 - 2, y - 2, x1 + 2, y - 1, M[3]); for (let x = x0; x < x1; x += 7) if (h(x, 1, 545) < 0.5) rect(x, y - 5, x + 4, y - 5, M[1]);
      for (const x of [x0 + 2, x1 - 6]) { rect(x, y - 1, x + 4, y + 16, M[3]); rect(x, y - 1, x + 1, y + 16, M[1]); } rect(x0 + 6, y + 10, x1 - 6, y + 11, M[1]); }
  });
  { const fl = Math.sin(t * 10) * 1.2; for (let i = 0; i < 9; i++) { const u = (t * 2.5 + i / 9) % 1; pset(228 + Math.round(Math.sin(i * 2.3 + t * 7) * (2 - u * 2) + fl * u), 57 - Math.round(u * 9), u < 0.3 ? b_C.farol[2] : u < 0.6 ? b_C.farol[0] : b_C.farol[1]); } rect(226, 55, 230, 57, b_C.farol[1]); b_halo(R, 228, 54, 24, t, hex('#ffc070'), 0.25);
    for (let i = 0; i < 5; i++) { const u = (t * 0.4 + i / 5) % 1; if (b_um(228, 40 - Math.round(u * 20)) < 0.6 - u * 0.5) pset(228 + Math.round(Math.sin(u * 6 + t) * 3), 44 - Math.round(u * 22), hex('#6a6060')); } }
  { const fl = Math.round(Math.sin(t * 12) * 0.7); pset(302 + fl, 95, hex('#fff4c0')); pset(302, 96, hex('#ffd070')); pset(302, 97, hex('#ff9030')); b_halo(R, 302, 97, 12, t, hex('#ffd890'), 0.22); }
  for (let k = 0; k < 12; k++) { const u = (t * 0.03 + h(k, 1, 546)) % 1, y = Math.round(66 + u * 100), x = Math.round(V[0] + (y - V[3]) * 1.1 + h(k, 2, 546) * 30 + Math.sin(t * 0.6 + k) * 2); if (Math.sin(t * 2 + k) > -0.2) pset(x, y, hex('#fff8e0')); }
  // una araña que sube y baja de su hilo en la esquina
  { const y = Math.round(28 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 16); linea(150, 0, 150, y, hex('#c8c0b0')); rect(149, y, 151, y + 1, hex('#2a2a30')); pset(148, y + 2, hex('#2a2a30')); pset(152, y + 2, hex('#2a2a30')); }
  return { suelo: 166, banco: [70, 206, 144], libre: [80, 20, 230, 110], ventana: V, mesa: [252, 118] };
}

// Un bocadillo de pensamiento con n galeras dibujadas dentro (el rumor de los barcos): x, y su esquina de arriba a la
// izquierda; o.w, o.h su tamaño (por omisión 120 × 64), o.cola [x, y] adonde apunta su colita de burbujas, o.u (0–1)
// para que aparezca (crece desde la cola). Las galeras se ordenan en filas y se achican según n (2, 5, 18…) y cabecean.
export function bocadilloBarcos(R, x, y, n, t, o = {}) {
  const u = o.u ?? 1; if (u <= 0) return; const w = Math.round((o.w ?? 120) * Math.min(1, u * 1.3)), hh = Math.round((o.h ?? 64) * Math.min(1, u * 1.3)), [cxo, cyo] = o.cola ?? [x + 20, y + hh + 24];
  const cx = x + w / 2, cy = y + hh / 2, B = hex('#f6f2e6'), K = hex('#2a2430');
  for (let k = 0; k < 3; k++) { const f = (k + 1) / 4, bx = Math.round(lerp(cxo, x + w * 0.3, f)), by = Math.round(lerp(cyo, y + hh, f)), r = 2 + k; R.disco(bx, by, r + 1, K); R.disco(bx, by, r, B); }
  for (const pass of [0, 1]) for (let j = -hh / 2 - 2; j <= hh / 2 + 2; j++) for (let i = -w / 2 - 2; i <= w / 2 + 2; i++) { const e = (i / (w / 2)) ** 4 + (j / (hh / 2)) ** 4, bump = 0.06 * Math.sin(Math.atan2(j, i) * 9); if (pass === 0 ? e <= 1.18 + bump : e <= 1 + bump) R.pset(Math.round(cx + i), Math.round(cy + j), pass ? B : K); }
  if (u < 0.75) return;
  const filas = n <= 2 ? 1 : n <= 6 ? 2 : 3, por = Math.ceil(n / filas), s = Math.min((w - 12) / por / 90, (hh - 10) / filas / 55);
  R.recorte([x + 3, y + 3, x + w - 3, y + hh - 3]);
  for (let k = 0; k < n; k++) { const f = Math.floor(k / por), c = k % por, enFila = Math.min(por, n - f * por), gx = cx + (c - (enFila - 1) / 2) * ((w - 12) / por), gy = y + 6 + (f + 1) * ((hh - 8) / filas) - 4 + Math.sin(t * 2 + k) * 1;
    for (let i = -Math.round(46 * s); i <= Math.round(46 * s); i++) if (Math.sin(i * 0.8 + t * 3 + k) > 0.3) R.pset(Math.round(gx + i), Math.round(gy + 2 * s + 1), hex('#5a8ac8'));
    b_galera(R, gx, gy, t + k, { s, vela: 1, remos: 'agua', noche: false }); }
  R.recorte(null);
}

const b_TIERRAS = [
  // Península Ibérica y Europa (hasta el borde este), con el Mediterráneo
  [[-9.3, 43.2], [-8, 43.7], [-4, 43.5], [-1.8, 43.4], [-1.2, 44.6], [-1.2, 46.2], [-2.2, 47.1], [-4.5, 47.9], [-4.7, 48.6], [-3, 48.8], [-1.6, 48.7], [-1.4, 49.7], [0.2, 49.5], [1.5, 50.2], [2.5, 51.1], [4, 51.4], [4.8, 53], [7, 53.5], [8.6, 53.9], [8.6, 55.5], [8.2, 56.8], [10.5, 57.7], [10.5, 56.2], [12.5, 56], [12, 54.4], [14, 54], [18, 54.8], [22, 55], [25, 55], [25, 40.5], [22, 40.5], [19.5, 42], [15, 45], [13.7, 45.7], [12.3, 45.3], [13.5, 43.6], [16, 41.5], [18.5, 40.2], [16, 38], [15.6, 40], [12.3, 41.7], [10.5, 43.9], [9, 44.4], [7.5, 43.8], [6, 43.1], [3.5, 43.3], [3, 42.4], [3, 41.8], [0.5, 40.5], [0, 38.8], [-0.7, 37.6], [-2, 36.7], [-5.5, 36], [-6.5, 36.9], [-7.4, 37.2], [-8.9, 37], [-8.8, 38.7], [-9.5, 39], [-8.7, 41], [-8.9, 42.5]],
  // el norte de África
  [[-12, 28], [-9.8, 31.5], [-8.5, 33.3], [-6, 35.8], [-2, 35.1], [3, 36.8], [10, 37.2], [11, 35.5], [10, 33.8], [15, 32.3], [20, 30.5], [25, 31.5], [25, 26], [-12, 26]],
  // Gran Bretaña
  [[-5.7, 50], [-3, 50.6], [1.4, 51.2], [1.7, 52.7], [0.3, 53.4], [-0.4, 54.5], [-1.6, 55.6], [-2.2, 56.8], [-1.8, 57.6], [-3.3, 58.6], [-5, 58.6], [-6.2, 57.4], [-5.6, 56.3], [-5.7, 55.3], [-4.9, 54.8], [-3.2, 54.9], [-3.4, 54], [-3, 53.4], [-4.6, 53.3], [-4.2, 52.3], [-5.2, 51.7], [-3.3, 51.4], [-4.7, 51]],
  // Irlanda
  [[-6, 52.2], [-6.2, 53.9], [-5.5, 54.5], [-7.3, 55.3], [-8.5, 54.5], [-10, 54], [-9.8, 52.2], [-10.4, 51.6], [-8, 51.6]],
  // Escandinavia
  [[5, 58], [7, 58], [10.5, 59.5], [11, 58.8], [12, 56.5], [13, 55.4], [16, 56.2], [16.5, 57.5], [18.8, 59.5], [17.5, 62], [21, 64], [25, 66], [5, 66], [4.8, 61]],
  // Islandia
  [[-22.5, 63.9], [-18, 63.4], [-14, 64.4], [-13.6, 65.5], [-16, 66.5], [-20, 66.1], [-23.5, 66.3], [-24, 64.9]],
  // América del Norte (la costa este), con el golfo de San Lorenzo
  [[-81, 25], [-81, 31.5], [-79, 33], [-76, 35], [-75.5, 36], [-76, 37], [-75.5, 38.3], [-74, 40], [-73.5, 40.8], [-70, 41.5], [-70.5, 42.2], [-70.7, 43], [-69, 44], [-67, 44.7], [-66, 45.2], [-64.8, 45.6], [-64.2, 45.9], [-64.6, 46.4], [-64.5, 47], [-65, 48.5], [-64.2, 48.8], [-66.5, 49.2], [-70, 48.3], [-71, 47], [-67, 49.5], [-64, 50.2], [-60, 50.2], [-57, 51.5], [-56, 52.5], [-58, 54], [-61, 56], [-62, 58], [-64.5, 60.3], [-65, 66], [-90, 66], [-90, 25]],
  // Nueva Escocia y la isla del Cabo Bretón
  [[-66.2, 44.2], [-65.9, 43.8], [-65.5, 43.45], [-64.9, 43.9], [-64.4, 44.3], [-64.2, 44.42], [-63.6, 44.6], [-62.5, 44.8], [-61, 45.25], [-60.3, 45.6], [-59.8, 46], [-60.2, 46.6], [-60.5, 47], [-61.4, 46.5], [-61.6, 45.9], [-62.6, 45.7], [-63.6, 45.8], [-64.2, 45.9], [-64.5, 45.35], [-65.3, 44.9], [-65.9, 44.55]],
  // la isla del Príncipe Eduardo
  [[-64.4, 46.6], [-63, 46.2], [-62, 46.4], [-63.5, 46.75]],
  // Terranova
  [[-59.3, 47.6], [-56, 47.6], [-53, 46.6], [-52.6, 47.6], [-53.6, 49.3], [-55.6, 49.8], [-55.8, 51.6], [-57, 50.8], [-59.4, 48.5]],
];

const b_LR = [-1.15, 46.16], b_OAK = [-64.3, 44.5];

const b_RUTAS = [
  [b_LR, [-5, 47.4], [-10.5, 50.5], [-11.5, 54], [-8.6, 56.2], [-5.8, 56.3]],   // a Escocia
  [b_LR, [-4.5, 45.3], [-10, 43], [-10.2, 40.5], [-9.4, 39.4]],                    // a Portugal
  [b_LR, [-12, 46.4], [-28, 47.5], [-44, 46.5], [-56, 44.8], [b_OAK[0] + 0.6, b_OAK[1]]],   // a América (Oak Island)
];

// los puntos de una ruta suavizada (Catmull-Rom) en píxeles, con su largo acumulado
function b_rutaPx(ruta, P) {
  const p = ruta.map(([a, b]) => P(a, b)), out = [];
  for (let i = 0; i < p.length - 1; i++) { const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
    for (let s = 0; s < 1; s += 0.02) { const s2 = s * s, s3 = s2 * s, f = (k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * s + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * s2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * s3); out.push([f(0), f(1)]); } }
  out.push(p[p.length - 1]); const L = [0]; for (let i = 1; i < out.length; i++) L.push(L[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1])); return { pts: out, L };
}

// una galera en pictograma de tinta (de 9 × 6 px), para las rutas y el bocadillo
function b_galeraTinta(R, x, y, t, c = hex('#3a2418'), d = 1) {
  x = Math.round(x); y = Math.round(y + Math.sin(t * 3 + x) * 0.6);
  for (let i = -4; i <= 4; i++) R.pset(x + i * d, y, c); for (let i = -3; i <= 3; i++) R.pset(x + i * d, y + 1, c); R.pset(x - 5 * d, y - 1, c); R.pset(x + 5 * d, y - 1, c);
  for (let j = 1; j <= 5; j++) R.pset(x, y - j, c); for (let j = 0; j < 4; j++) { R.pset(x + 1 * d, y - 4 + j, hex('#c8303a')); R.pset(x + 2 * d, y - 4 + j + (j > 1 ? 0 : 0), j === 1 ? hex('#c8303a') : hex('#e8d8b8')); R.pset(x + 3 * d, y - 3 + (j >> 1), hex('#e8d8b8')); }
  R.pset(x + 2 * d, y - 3, hex('#c8303a')); R.pset(x + 1 * d, y - 3, hex('#c8303a')); R.pset(x + 3 * d, y - 3, hex('#c8303a'));
}

function b_mapaRutas(R, t, o) {
  const { pset, rect, linea, disco, poligono } = R, oeste = o.camara === 'oeste', ru = o.rutas ?? 1;
  const H0 = [22, 18, 298, 164];   // el papel
  const V = oeste ? [-72, -36, 39, 55] : [-76, 16, 29, 63];
  const P = (lon, lat) => [H0[0] + (lon - V[0]) / (V[1] - V[0]) * (H0[2] - H0[0]), H0[1] + (V[3] - lat) / (V[3] - V[2]) * (H0[3] - H0[1])];
  const tinta = hex('#3a2418'), mar = hex('#b2c0b0'), marO = hex('#9eb0a2'), tierra = hex('#ecdcb2'), tierraS = hex('#d8c494'), TIERRA = 0xff00ff01;
  const rutas = b_RUTAS.map((r) => b_rutaPx(r, P));
  b_fijo(R, 'mapa:' + oeste, () => {
    // la mesa de noche
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.09 + Math.sin(x * 0.02 + y * 0.01) * 2 + x * 0.004), r2 = h(x, y, 550); let c = v > 0.8 ? hex('#3a2416') : v < -0.7 ? hex('#22140a') : hex('#2e1c10'); if (r2 < 0.03) c = hex('#1a0e06'); if ((x + 6) % 64 === 0) c = hex('#160a04'); R.buf[y * 320 + x] = c; }
    for (let y = H0[1] + 3; y <= H0[3] + 4; y++) for (let x = H0[0] + 4; x <= H0[2] + 5; x++) if (b_um(x, y) < 0.7) b_tiñe(R, x, y, hex('#0a0602'), 0.5);
    R.recorte(H0);
    rect(H0[0], H0[1], H0[2], H0[3], mar);
    for (const T of b_TIERRAS) poligono(T.map(([a, b]) => P(a, b)), TIERRA);
    R.recorte(null);
    const B = R.buf, LM = new Uint8Array(320 * 180); for (let i = 0; i < LM.length; i++) LM[i] = B[i] === TIERRA ? 1 : 0;
    const esT = (x, y) => x >= H0[0] && x <= H0[2] && y >= H0[1] && y <= H0[3] && LM[y * 320 + x] === 1;
    const cerca = new Uint8Array(320 * 180);
    for (let y = H0[1]; y <= H0[3]; y++) for (let x = H0[0]; x <= H0[2]; x++) if (esT(x, y)) for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const xx = x + i, yy = y + j; if (xx >= 0 && xx < 320 && yy >= 0 && yy < 180) { const d = Math.max(Math.abs(i), Math.abs(j)); const k = yy * 320 + xx; if (!cerca[k] || cerca[k] > d) cerca[k] = d || 1; } }
    for (let y = H0[1]; y <= H0[3]; y++) for (let x = H0[0]; x <= H0[2]; x++) { const k = y * 320 + x, r2 = h(x >> 1, y >> 1, 551);
      let c; if (LM[k]) { const borde = !esT(x - 1, y) || !esT(x + 1, y) || !esT(x, y - 1) || !esT(x, y + 1); c = borde ? tinta : r2 < 0.15 ? tierraS : tierra; if (!borde && (!esT(x + 2, y + 2))) c = tierraS; }
      else { const d = cerca[k]; c = r2 < 0.12 ? marO : mar; if (d && d <= 3 && (x + y * 2) % 3 === 0) c = hex('#8a7a5a'); else if (d === 4 && (x + y) % 4 === 0) c = marO; else if (!d && Math.sin(x * 0.55 + Math.floor(y / 6) * 2) > 0.85 && y % 6 === 0) c = hex('#8a8a6a'); }
      B[k] = c; }
    // vejez del papel: bordes tostados, pliegues, manchas y el cerco de una taza
    for (let y = H0[1]; y <= H0[3]; y++) for (let x = H0[0]; x <= H0[2]; x++) { const e = Math.min(x - H0[0], H0[2] - x, y - H0[1], H0[3] - y); if (e < 6 && b_um(x, y) < (6 - e) / 7) b_tiñe(R, x, y, hex('#8a5a28'), 0.35); if (h(x >> 2, y >> 2, 552) < 0.03) b_tiñe(R, x, y, hex('#9a7040'), 0.18); }
    for (let y = H0[1]; y <= H0[3]; y++) { b_tiñe(R, 160, y, hex('#8a6a40'), 0.3); b_tiñe(R, 161, y, C.blanco, 0.2); } for (let x = H0[0]; x <= H0[2]; x++) { b_tiñe(R, x, 91, hex('#8a6a40'), 0.3); b_tiñe(R, x, 92, C.blanco, 0.2); }
    { const [tx, ty] = oeste ? [244, 136] : [70, 138]; for (let a = 0; a < 6.28; a += 0.02) { const r = 13 + Math.sin(a * 3) * 0.4; b_tiñe(R, Math.round(tx + Math.cos(a) * r), Math.round(ty + Math.sin(a) * r * 0.9), hex('#7a4a20'), 0.35); } }
    // los montes en pictograma, los castillos de las ciudades, la rosa de los vientos con sus rumbos, la serpiente
    const monte = (lon, lat) => { const [x, y] = P(lon, lat).map(Math.round); for (let i = 0; i <= 3; i++) { pset(x - i, y - 3 + i, tinta); pset(x + i, y - 3 + i, i === 3 ? tinta : hex('#8a6a4a')); } pset(x - 1, y - 1, hex('#a88a5a')); };
    for (const [a, b] of [[7, 46.2], [9, 46.5], [11, 46.9], [-1, 42.8], [1.2, 42.6], [-4.6, 57.1], [-5.2, 57.8], [8, 61], [10, 60.5], [-75, 41.5], [-73, 43.8], [-71, 45], [-4, 40.5], [-6, 37.5], [-66, 47.5], [-19, 64.8], [-5, 31.5]]) if (a > V[0] && a < V[1] && b > V[2] && b < V[3]) monte(a, b);
    const castillo = ([lon, lat], c = tinta) => { const [x, y] = P(lon, lat).map(Math.round); rect(x - 2, y - 4, x + 2, y, c); pset(x - 2, y - 5, c); pset(x, y - 5, c); pset(x + 2, y - 5, c); pset(x, y - 2, tierra); };
    for (const c of [[2.35, 48.85], [-9.1, 38.7], [-3.2, 55.95], [12.5, 41.9], b_LR]) if (c[0] > V[0] && c[0] < V[1]) castillo(c, c === b_LR ? hex('#8a1e24') : tinta);
    const [rx, ry] = oeste ? [80, 132] : P(-32, 37), rr = oeste ? 14 : 12;
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; for (let d = rr + 2; d < 150; d += 3) { const x = Math.round(rx + Math.cos(a) * d), y = Math.round(ry + Math.sin(a) * d); if (x > H0[0] + 2 && x < H0[2] - 2 && y > H0[1] + 2 && y < H0[3] - 2) b_tiñe(R, x, y, hex('#8a6a4a'), 0.35); } }
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, L = k % 2 ? rr * 0.55 : rr; poligono([[rx + Math.cos(a) * L, ry + Math.sin(a) * L], [rx + Math.cos(a + 0.35) * 3, ry + Math.sin(a + 0.35) * 3], [rx, ry]], k === 0 ? hex('#8a1e24') : tinta); poligono([[rx + Math.cos(a) * L, ry + Math.sin(a) * L], [rx + Math.cos(a - 0.35) * 3, ry + Math.sin(a - 0.35) * 3], [rx, ry]], k === 0 ? hex('#c8303a') : hex('#a88a5a')); }
    for (let a = 0; a < 6.28; a += 0.08) pset(Math.round(rx + Math.cos(a) * (rr * 0.45)), Math.round(ry + Math.sin(a) * (rr * 0.45)), tinta); disco(rx, ry, 1, b_C.cupula[0]);
    { const [sx, sy] = oeste ? [210, 140] : P(-22, 33); for (let i = 0; i < 30; i++) { const x = sx + i, y = sy - Math.round(Math.abs(Math.sin(i * 0.32)) * 4); if (Math.sin(i * 0.32) > 0) { pset(x, y, tinta); pset(x, y + 1, hex('#5a8a5a')); } }
      rect(sx + 30, sy - 4, sx + 33, sy - 2, tinta); pset(sx + 34, sy - 3, hex('#c8303a')); pset(sx + 32, sy - 4, tierra); for (let i = 0; i < 30; i += 5) pset(sx + i, sy + 2, hex('#6a8aa8')); }
    if (oeste) { // el pozo dibujado junto a Oak Island: el pozo de tablas que baja, con su línea de puntos hasta la isla
      const [ox, oy] = P(b_OAK[0], b_OAK[1]).map(Math.round), px = 228, py = 40;
      rect(px - 18, py - 4, px + 18, py + 46, hex('#e8d8b0')); for (let x = px - 18; x <= px + 18; x++) { pset(x, py - 4, tinta); pset(x, py + 46, tinta); } for (let y = py - 4; y <= py + 46; y++) { pset(px - 18, y, tinta); pset(px + 18, y, tinta); }
      for (let x = px - 16; x <= px + 16; x++) pset(x, py + 2, hex('#6a8a4a')); for (let y = py + 3; y < py + 44; y++) { pset(px - 6, y, tinta); pset(px + 6, y, tinta); for (let x = px - 5; x <= px + 5; x++) if (b_um(x, y) < 0.3) pset(x, y, hex('#8a6a4a')); }
      for (let y = py + 8; y < py + 44; y += 6) { linea(px - 5, y, px + 5, y, hex('#7a4a20')); pset(px - 7, y, tinta); pset(px + 7, y, tinta); }
      for (let x = px - 4; x <= px + 4; x++) pset(x, py + 42, hex('#5a8ac8')); disco(px, py + 36, 2, b_C.cupula[1]); pset(px - 1, py + 35, b_C.cupula[2]); R.icono('?', px + 10, py + 28, b_C.cera[0], C.k, 1);
      for (let i = 0; i <= 30; i++) if (i % 3 === 0) pset(Math.round(lerp(ox + 4, px - 18, i / 30)), Math.round(lerp(oy - 4, py + 30, i / 30)), tinta); }
  });
  // la vela de la esquina, su resplandor sobre el papel, y la brújula de latón con su aguja que tiembla
  { const x = 10, y = 150, fl = Math.sin(t * 11) * 0.5 + Math.sin(t * 17) * 0.3; rect(x - 5, 172, x + 5, 176, b_C.latón[1]); rect(x - 5, 172, x + 5, 172, b_C.latón[2]); rect(x - 3, 150, x + 3, 171, hex('#f2ecd8')); rect(x + 1, 150, x + 3, 171, hex('#d8d0b8')); rect(x - 3, 150, x - 3, 160, hex('#fffaf0'));
    for (let j = -30; j <= 30; j++) for (let i = -2; i <= 40; i++) { const d = Math.hypot(i, j * 1.2); if (d < 40 && b_um(x + i, 140 + j) < (1 - d / 40) * (0.5 + fl * 0.1)) b_tiñe(R, x + i, 140 + j, hex('#ffe0a0'), 0.25); }
    const f = Math.round(fl); pset(x, 149, hex('#2a1a10')); rect(x - 1, 145, x + 1, 148, hex('#ffb040')); rect(x - 1 + f, 142, x + 1 + f, 145, hex('#ffd070')); pset(x + f, 141, hex('#fff4c0')); pset(x + f, 140, hex('#fff8e0')); }
  { const x = 300, y = 164; disco(x + 2, y + 2, 12, hex('#0a0602')); disco(x, y, 12, b_C.latón[1]); disco(x, y, 11, b_C.latón[0]); disco(x, y, 9, hex('#f2e8cc')); for (let k = 0; k < 8; k++) pset(Math.round(x + Math.cos(k * 0.785) * 8), Math.round(y + Math.sin(k * 0.785) * 8), tinta);
    const a = -Math.PI / 2 + Math.sin(t * 1.3) * 0.25 + Math.sin(t * 3.1) * 0.05; linea(x, y, Math.round(x + Math.cos(a) * 7), Math.round(y + Math.sin(a) * 7), hex('#c8303a')); linea(x, y, Math.round(x - Math.cos(a) * 6), Math.round(y - Math.sin(a) * 6), tinta); pset(x, y, b_C.latón[2]); pset(x - 4, y - 5, C.blanco); }
  // las rutas punteadas de la leyenda, con su galera en la punta, recortadas al papel
  R.recorte([H0[0] + 2, H0[1] + 2, H0[2] - 2, H0[3] - 2]);
  const tramos = [[0, 0.4], [0.25, 0.6], [0.45, 1]];
  rutas.forEach(({ pts, L }, k) => { const [a, b] = tramos[k], p = Math.max(0, Math.min(1, (ru - a) / (b - a))); if (p <= 0) return; const lim = L[L.length - 1] * p; let cab = pts[0], dir = 1;
    for (let i = 0; i < pts.length && L[i] <= lim; i++) { if ((L[i] % 5) < 3) { pset(Math.round(pts[i][0]), Math.round(pts[i][1]), hex('#8a1e24')); pset(Math.round(pts[i][0]), Math.round(pts[i][1]) + 1, hex('#5a1018')); } cab = pts[i]; if (i > 0) dir = pts[i][0] >= pts[i - 1][0] ? 1 : -1; }
    if (p < 1) b_galeraTinta(R, cab[0], cab[1] - 2, t, tinta, dir);
    else { const [x, y] = pts[pts.length - 1].map(Math.round); if (k === 2) chincheta(R, x, y, t, C.rojo, { pulso: oeste }); else { for (let i = -2; i <= 2; i++) { pset(x + i, y, hex('#8a1e24')); pset(x, y + i, hex('#8a1e24')); } } } });
  R.recorte(null);
  // el polvo que flota en la luz de la vela
  for (let k = 0; k < 8; k++) { const u = (t * 0.04 + h(k, 1, 553)) % 1, x = Math.round(12 + h(k, 2, 553) * 40 + Math.sin(t * 0.5 + k) * 3), y = Math.round(170 - u * 60); if (Math.sin(t * 2 + k) > 0) pset(x, y, hex('#fff0c8')); }
  const pp = (c) => P(c[0], c[1]).map(Math.round);
  return { papel: H0, rochelle: pp(b_LR), oak: pp(b_OAK), escocia: pp(b_RUTAS[0][5]), portugal: pp(b_RUTAS[1][4]), vela: [10, 140], brujula: [300, 164], proyecta: P };
}

// Lo que va por delante de los personajes en la logia (se llama después de pintarlos), con las mismas o.encuadre y
// o.camara que logia(): en la taberna, la mesa larga (general) o la mesa de cerca con sus jarras, pipas que humean, la
// vela y el pergamino ('mesa'); en el salón, el atril del orador con su libro y su vela ('atril'). En los demás, nada.
export function logiaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'taberna', cam = o.camara ?? 'general';
  if (enc === 'taberna') {
    if (cam === 'mesa') { c_pegar(R, c_capa(R, 'tmesaD', () => c_pintaMesaCerca(R)), 124, 179); c_vivoMesaCerca(R, t); }
    else { c_pegar(R, c_capa(R, 'tabernaD', () => c_pintaMesaLarga(R)), 128, 165); c_vivoMesaLarga(R, t); }
  } else if (enc === 'salon' && cam === 'atril') c_atrilDelante(R, t, o);
}

// mezcla de dos colores (k = 0 → a, k = 1 → b)
function c_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// tiñe un píxel hacia un color
function c_tine(R, x, y, col, k) { const c = R.pget(x, y); if (c) R.pset(x, y, c_mez(c, col, k)); }

// una luz cálida (o una sombra, con col oscuro) en elipse, con caída suave y tramada en el borde
function c_luz(R, cx, cy, rx, ry, col, a = 0.35) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue; const g = (1 - d) * a; if (g < 0.06 && ((x + y) & 1)) continue; c_tine(R, x, y, col, g);
  }
}

// un fondo fijo: se pinta una vez en un búfer propio y se copia en cada fotograma (sin romper los fundidos)
const c_BUF = new Map();

function c_fondo(R, clave, pinta) { let b = c_BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); c_BUF.set(clave, b); } R.copiar(b); }

// una capa fija con huecos (0 = transparente) que se pega encima con c_pegar
function c_capa(R, clave, pinta) { let b = c_BUF.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); c_BUF.set(clave, b); } return b; }

function c_pegar(R, b, y0 = 0, y1 = 179) { const D = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) if (b[i]) D[i] = b[i]; }

// cielo tramado en cuatro tonos con nubes de tres tonos a tres velocidades (cols: arriba → horizonte; nub: luz, cuerpo, sombra)
function c_cielo(R, t, y1, cols, nub, o = {}) {
  const n = cols.length;
  for (let y = 0; y <= y1; y++) { const f = y / (y1 + 1) * (n - 1), i = Math.floor(f), r = f - i;
    for (let x = 0; x < 320; x++) R.pset(x, y, cols[Math.min(n - 1, i + ((r > [0.15, 0.55, 0.35, 0.75][(x & 1) + 2 * (y & 1)]) ? 1 : 0))]); }
  if (o.sol) { const [sx, sy, sr] = o.sol; R.disco(sx, sy, sr + 3, c_mez(cols[0], nub[0], 0.5)); R.disco(sx, sy, sr + 1, hex('#fff6c8')); R.disco(sx, sy, sr, hex('#ffe890')); }
  const NB = o.nubes ?? [[30, 22, 40, 1.2], [150, 30, 52, 0.7], [250, 54, 30, 1.8], [90, 62, 26, 2.4], [210, 18, 34, 0.9]];
  for (const [x0, y, w, v] of NB) if (y + 8 < y1) c_nube(R, ((x0 + t * v) % 400 + 400) % 400 - 40, y, w, nub);
}

// una nube de tres tonos: la sombra abajo, el cuerpo y la luz arriba, con el borde tramado
function c_nube(R, cx, cy, w, [cL, cM, cS]) {
  const r = Math.max(3, w * 0.24), B = [[-w * 0.36, 2, r * 0.8], [-w * 0.12, -1, r * 1.05], [w * 0.14, -2, r * 1.15], [w * 0.38, 1, r * 0.85]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 2, rr, cS);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, cM);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 2, rr * 0.55, cL);
  R.rect(Math.round(cx - w * 0.5), Math.round(cy + r * 0.9), Math.round(cx + w * 0.5), Math.round(cy + r * 0.9) + 1, cS);
}

// pájaros que cruzan aleteando
function c_pajaros(R, t, y, n = 3, col = hex('#3a3a4a'), v = 14) {
  for (let k = 0; k < n; k++) { const x = Math.round(((k * 53 + t * (v + k * 3)) % 380) - 30), yy = Math.round(y + k * 5 + Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 10 + k * 2) > 0;
    R.pset(x, yy, col); R.pset(x - 1, yy - (a ? 1 : 0), col); R.pset(x + 1, yy - (a ? 1 : 0), col); R.pset(x - 2, yy - (a ? 2 : -1), col); R.pset(x + 2, yy - (a ? 2 : -1), col); }
}

// gente pequeña de fondo (alto ≈ 9–14 px): o.ropa, o.ropaS, o.piel, o.pelo, o.sombrero (color o null), o.pluma, o.anda,
// o.saluda (brazo arriba que se agita), o.dir, o.manto (capa que asoma), o.capacho (lleva algo a la espalda)
function c_gente(R, x, suelo, t, o = {}) {
  const { rect, pset } = R, K = C.k, alto = o.alto ?? 10, ropa = o.ropa ?? hex('#3a5a8a'), ropaS = o.ropaS ?? c_mez(ropa, K, 0.35), piel = o.piel ?? hex('#e8b890');
  const pelo = o.pelo ?? hex('#4a3020'), cab = alto >= 13 ? 4 : 3, cuerpo = Math.round(alto * 0.42), pier = alto - cab - cuerpo, ph = o.anda ? Math.floor(t * 6 + x * 0.7) % 2 : 0;
  x = Math.round(x); suelo = Math.round(suelo); const w = alto >= 13 ? 3 : 2, yc = suelo - pier, yh = yc - cuerpo;
  if (o.manto) { rect(x - w - 1, yh + 1, x + w + 1, suelo - 1, K); rect(x - w, yh + 2, x + w, suelo - 2, o.manto); }
  rect(x - 1 - (w > 2 ? 1 : 0), yc, x - 1, suelo - 1 - ph, o.pierna ?? hex('#2a2430')); rect(x + 1, yc, x + 1 + (w > 2 ? 1 : 0), suelo - 1 - (1 - ph) * (o.anda ? 1 : 0), o.pierna ?? hex('#2a2430'));
  rect(x - w, yh, x + w, yc, ropa); rect(x + w, yh, x + w, yc, ropaS); rect(x - w, yc, x + w, yc, ropaS);
  if (o.capacho) { rect(x - w - 3, yh, x - w - 1, yc - 1, hex('#8a6a3a')); pset(x - w - 3, yh, hex('#b8945a')); }
  const hx = x - (cab >> 1); rect(hx, yh - cab, hx + cab - 1, yh - 1, piel); rect(hx, yh - cab, hx + cab - 1, yh - cab, pelo); pset(o.dir < 0 ? hx : hx + cab - 1, yh - cab + 1, pelo);
  if (o.peluca) { rect(hx - 1, yh - cab, hx + cab, yh - cab, o.peluca); pset(hx - 1, yh - cab + 1, o.peluca); pset(hx + cab, yh - cab + 1, o.peluca); }
  if (o.sombrero) { rect(hx - 1, yh - cab - 1, hx + cab, yh - cab - 1, o.sombrero); rect(hx, yh - cab - 3, hx + cab - 1, yh - cab - 2, o.sombrero); if (o.pluma) { pset(hx + cab, yh - cab - 4, o.pluma); pset(hx + cab + 1, yh - cab - 5 + (Math.sin(t * 5 + x) > 0 ? 1 : 0), o.pluma); pset(hx + cab, yh - cab - 3, o.pluma); } }
  if (o.saluda) { const s = Math.sin(t * 7 + x) > 0 ? 1 : 0; R.linea(x + w + 1, yh + 1, x + w + 2 + s, yh - 3, ropa); pset(x + w + 2 + s, yh - 4, piel); }
}

// una vela encendida con su llama que titila y un halo pequeño (x, y: la base; alto de la vela)
function c_vela(R, x, y, t, alto = 6, k = 0, cera = C.vela) {
  const { rect, pset } = R; x = Math.round(x); y = Math.round(y);
  rect(x - 1, y - alto, x + 1, y, cera); rect(x + 1, y - alto, x + 1, y, c_mez(cera, C.k, 0.3)); pset(x - 1, y - alto, hex('#fffbe0'));
  const f = Math.sin(t * 13 + k * 2.3) + Math.sin(t * 7.1 + k), dx = f > 1.2 ? 1 : f < -1.2 ? -1 : 0, ya = y - alto - 1;
  c_luz(R, x, ya - 2, 9, 8, hex('#ffd890'), 0.22 + 0.04 * Math.sin(t * 9 + k));
  pset(x, ya, hex('#ff9a30')); pset(x, ya - 1, hex('#ffd860')); pset(x + dx, ya - 2, hex('#fff4c0')); if (f > -0.5) pset(x + dx, ya - 3, hex('#ffd860')); pset(x, ya + 1, C.k);
}

// un fuego de leña: llamas por columnas que suben y se apagan, del blanco al rojo (x0–x1, yb: la base)
function c_fuego(R, x0, x1, yb, alto, t) {
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), env = Math.sin(u * Math.PI);
    const hh = Math.round(alto * env * (0.55 + 0.25 * Math.sin(t * 9 + x * 1.7) + 0.2 * Math.sin(t * 15.3 + x * 0.6)));
    for (let j = 0; j < hh; j++) { const g = j / Math.max(1, hh); R.pset(x, yb - j, g < 0.3 ? hex('#fff0a0') : g < 0.6 ? hex('#ffb030') : g < 0.85 ? hex('#e8602a') : hex('#a8301a')); } }
  for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1, x = Math.round(x0 + (x1 - x0) * (0.2 + 0.6 * h(k, Math.floor(t * 0.9 + k / 4)))); R.pset(x + Math.round(Math.sin(u * 9) * 2), Math.round(yb - alto - u * 14), u < 0.5 ? hex('#ffd860') : hex('#e8602a')); }
}

// humo que sube en volutas (x, y: de dónde sale)
function c_humo(R, x, y, t, n = 5, col = hex('#c8c0b8'), alto = 20) {
  for (let k = 0; k < n; k++) { const u = (t * 0.45 + k / n) % 1, xx = Math.round(x + Math.sin(u * 6 + k) * (1 + u * 3) + u * 3), yy = Math.round(y - u * alto), r = u < 0.35 ? 0 : 1;
    if (r) { R.pset(xx, yy, col); R.pset(xx + 1, yy, col); R.pset(xx, yy - 1, col); if (u < 0.8) R.pset(xx + 1, yy - 1, c_mez(col, C.blanco, 0.3)); } else R.pset(xx, yy, col); }
}

// tablas de madera horizontales: juntas, vetas, nudos y el canto de luz (como b_madera del 11)
function c_tablas(R, x0, y0, x1, y1, [c, cS, cL, cD], k = 0, tabla = 8) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += tabla, f++) { rect(x0, y, x1, y, cD);
    for (let g = 0; g < 3; g++) { const gy = y + 2 + Math.round(h(f, g, 410 + k) * (tabla - 3)); let x = x0 - Math.round(h(f, g, 411 + k) * 20);
      while (x < x1) { const L = 6 + Math.round(h(x, gy, 412 + k) * 26); if (h(x, g, 413 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 2 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 414 + k) * 10); } }
    let x = x0 + Math.round(h(f, 5, 415 + k) * 40); while (x < x1) { rect(x, y + 1, x, Math.min(y1, y + tabla - 1), cD); x += 30 + Math.round(h(x, f, 416 + k) * 40); }
    if (h(f, 9, 417 + k) < 0.5 && y + 5 < y1) { const nx = x0 + 8 + Math.round(h(f, 7, 418 + k) * (x1 - x0 - 16)); rect(nx - 2, y + 3, nx + 2, y + 4, cS); R.pset(nx, y + 3, cD); }
  }
}

// sillería: bloques de w × a a matajunta, cada uno con su tono, su canto de luz arriba, su sombra abajo y poros
function c_sillar(R, x0, y0, x1, y1, w, a, [c, cS, cL, cJ], k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, cJ);
  for (let f = 0, y = y0; y <= y1; f++, y += a) { const dx = (f & 1) ? w >> 1 : 0;
    for (let x = x0 - dx; x <= x1; x += w) { const xa = Math.max(x0, x + 1), xb = Math.min(x1, x + w - 1), ya = y + 1, yb = Math.min(y1, y + a - 1); if (xb < xa || yb < ya) continue;
      const v = h(x, y, 420 + k), cc = v < 0.2 ? c_mez(c, cS, 0.35) : v > 0.85 ? c_mez(c, cL, 0.35) : c; rect(xa, ya, xb, yb, cc); rect(xa, ya, xb, ya, c_mez(cc, cL, 0.6)); rect(xa, yb, xb, yb, c_mez(cc, cS, 0.5)); rect(xb, ya, xb, yb, c_mez(cc, cS, 0.3));
      for (let p = 0; p < (w * a) / 18; p++) pset(xa + Math.floor(h(x + p, y, 421 + k) * (xb - xa + 1)), ya + 1 + Math.floor(h(x, y + p, 422 + k) * Math.max(1, yb - ya - 1)), h(p, x, 423 + k) < 0.6 ? c_mez(cc, cS, 0.45) : c_mez(cc, cL, 0.45)); } }
}

// yeso encalado con manchas, desconchones y alguna grieta
function c_yeso(R, x0, y0, x1, y1, [c, cS, cL], k = 0) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = h(x >> 2, y >> 2, 430 + k) * 0.6 + h(x >> 1, y >> 1, 431 + k) * 0.4; if (v < 0.2 && (x + y) & 1) pset(x, y, cS); else if (v > 0.86 && (x + y) & 1) pset(x, y, cL); }
  for (let g = 0; g < (x1 - x0) / 40; g++) { let x = x0 + Math.round(h(g, 1, 432 + k) * (x1 - x0)), y = y0 + Math.round(h(g, 2, 432 + k) * (y1 - y0)); for (let s = 0; s < 8; s++) { pset(x, y, cS); x += h(g, s, 433 + k) < 0.5 ? 1 : 0; y += 1; } }
}

// suelo ajedrezado en perspectiva hacia (vx, vy), de la fila y0 a y1, con brillo de cera
function c_ajedrez(R, y0, y1, vx, vy, B, N, k = 7) {
  for (let y = y0; y <= y1; y++) { const z = (y - vy), v = Math.floor(k * 30 / z * 1.0 + 0.0), sombra = 1 - (y - y0) / (y1 - y0 + 1);
    for (let x = 0; x < 320; x++) { const u = Math.floor((x - vx) / z * k * 0.55 + 100), oscuro = ((u + v) & 1) === 1; let c = oscuro ? N[0] : B[0];
      const fu = ((x - vx) / z * k * 0.55 + 100) % 1, fv = (k * 30 / z) % 1; if (fu < 0.04 || fv < 0.03) c = oscuro ? N[1] : B[1];
      if (sombra > 0.55 && ((x + y) & 1)) c = oscuro ? N[1] : B[1]; else if (h(x, y, 440) < 0.04) c = oscuro ? N[2] : B[2]; R.pset(x, y, c); } }
}

// una escuadra y un compás entrelazados (el símbolo, sin letra), de lado ≈ s
function c_escuadraCompas(R, cx, cy, s, col, colS) {
  const L = (a, b, c2, d) => { R.linea(a, b, c2, d, colS); R.linea(a, b - 1, c2, d - 1, col); };
  L(cx, cy - s, cx - s, cy + s * 0.6); L(cx, cy - s, cx + s, cy + s * 0.6); R.disco(cx, cy - s, 1.5, col);
  L(cx - s * 0.8, cy - s * 0.05, cx, cy + s * 0.75); L(cx + s * 0.8, cy - s * 0.05, cx, cy + s * 0.75);
}

// una estrella de cinco puntas (la estrella flamígera) con su brillo que gira
function c_estrella(R, cx, cy, r, t, col, colL, colS) {
  const P = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  R.poligono(P.map(([x, y]) => [x + 1, y + 1]), colS); R.poligono(P, col);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.4, r0 = r + 2, r1 = r + 4 + ((i + Math.floor(t * 3)) % 3); R.linea(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, i % 2 ? colS : col); }
  R.pset(cx - 1, cy - 2, colL); R.pset(cx, cy - 1, colL);
}

// la taberna de 1717, de frente (ver la cabecera de logia)
const c_TB = { yeso: [hex('#d6c296'), hex('#b4a074'), hex('#eadab0')], viga: hex('#3a2416'), vigaL: hex('#5c3c24'), vigaS: hex('#22140a'),
  suelo: [hex('#6a4a2e'), hex('#523822'), hex('#84603c'), hex('#3a2616')], peltre: hex('#a4a8b0'), peltreS: hex('#6a6e78'), peltreL: hex('#e0e4ea'), piedra: [hex('#8a7e6c'), hex('#62584a'), hex('#aea290'), hex('#3e362c')] };

function c_taberna(R, t, o) {
  const { rect, pset, linea } = R, K = C.k, T = c_TB;
  c_fondo(R, 'taberna', () => {
    // el techo: tablazón ahumada entre viguetas (oscuro y tranquilo bajo la barra del año) y la gran viga
    c_tablas(R, 0, 0, 319, 15, [hex('#4a3626'), hex('#3a2a1c'), hex('#5a4430'), hex('#2a1c12')], 1, 5);
    for (let x = 6; x < 320; x += 26) { rect(x, 0, x + 6, 15, T.vigaS); rect(x + 1, 0, x + 5, 14, T.viga); rect(x + 1, 0, x + 1, 14, T.vigaL); }
    rect(0, 15, 319, 21, K); rect(0, 16, 319, 20, T.viga); rect(0, 16, 319, 16, T.vigaL); rect(0, 20, 319, 20, T.vigaS); for (let x = 3; x < 320; x += 11) pset(x, 18, T.vigaS);
    // la pared de yeso entre postes de entramado con tornapuntas, y el zócalo de tablas
    c_yeso(R, 0, 22, 319, 103, T.yeso, 1);
    for (const [px, d] of [[80, 1], [178, -1], [204, 1]]) { rect(px, 22, px + 5, 103, T.viga); rect(px, 22, px, 103, T.vigaL); rect(px + 5, 22, px + 5, 103, T.vigaS); }
    rect(0, 58, 79, 61, T.viga); rect(0, 58, 79, 58, T.vigaL);
    for (let k = 0; k < 4; k++) linea(86 + k, 98, 104 + k, 64, k === 0 ? T.vigaL : T.viga);
    c_tablas(R, 0, 104, 319, 127, [hex('#5a3a22'), hex('#462c18'), hex('#74502e'), hex('#2e1c10')], 2, 6); rect(0, 102, 319, 104, T.vigaS); rect(0, 102, 319, 102, T.vigaL);
    // el suelo de tablones anchos con serrín
    c_tablas(R, 0, 128, 319, 179, T.suelo, 3, 9); rect(0, 128, 319, 129, T.vigaS);
    for (let i = 0; i < 260; i++) pset(Math.floor(h(i, 1, 450) * 320), 130 + Math.floor(h(i, 2, 450) * 50), h(i, 3, 450) < 0.5 ? hex('#c8a46a') : hex('#a8844e'));
    // la chimenea de piedra con la repisa, el hogar negro, los morillos y el caldero colgado
    c_sillar(R, 6, 62, 76, 127, 12, 7, T.piedra, 2); rect(4, 62, 78, 68, K); rect(5, 63, 77, 66, T.vigaL); rect(5, 67, 77, 67, T.vigaS);
    rect(18, 78, 64, 127, K); for (let y = 79; y < 127; y++) for (let x = 19; x < 64; x++) if (h(x, y, 451) < 0.18) pset(x, y, hex('#2a1e18'));
    rect(16, 76, 66, 77, T.piedra[1]); rect(22, 118, 60, 122, hex('#3a2a1c')); rect(24, 116, 58, 117, hex('#5a3a22'));
    for (const mx of [24, 56]) { rect(mx, 112, mx + 1, 126, hex('#2a2a30')); rect(mx - 1, 111, mx + 2, 112, hex('#4a4a54')); }
    linea(41, 78, 41, 96, hex('#4a4a54'));
    // en la repisa, platos de peltre, dos candeleros y una jarra
    for (const [x, r] of [[16, 5], [30, 6]]) { R.disco(x, 56, r + 1, K); R.disco(x, 56, r, T.peltre); R.disco(x - 1, 55, r - 3, T.peltreL); R.disco(x, 56, r - 2, T.peltre); }
    for (const x of [48, 68]) { rect(x - 2, 60, x + 2, 61, C.oroS); rect(x - 1, 54, x, 60, C.oro); }
    rect(56, 52, 61, 61, K); rect(57, 53, 60, 60, T.peltre); rect(57, 53, 57, 60, T.peltreL); rect(61, 55, 62, 58, K);
    // el cuadro del barco con su marco
    rect(86, 34, 108, 54, K); rect(87, 35, 107, 53, hex('#8a6a2a')); rect(89, 37, 105, 51, hex('#7a9aa8')); rect(89, 46, 105, 51, hex('#3a5a6a'));
    for (let x = 89; x <= 105; x++) if ((x & 3) === 0) pset(x, 47, hex('#a8c8d0'));
    rect(94, 43, 101, 45, hex('#5a3a22')); rect(97, 38, 97, 43, K); R.poligono([[93, 39], [97, 39], [97, 42], [92, 42]], hex('#e8e0c8')); R.poligono([[98, 39], [102, 40], [102, 42], [98, 42]], hex('#e8e0c8'));
    // el ventanal: marco, alféizar con una botella y una maceta
    rect(110, 30, 176, 94, K); rect(111, 31, 175, 93, T.vigaL); rect(114, 34, 172, 89, K);
    rect(108, 90, 178, 95, K); rect(109, 91, 177, 93, T.vigaL); rect(109, 94, 177, 94, T.vigaS);
    rect(160, 82, 163, 90, hex('#2a5a3a')); rect(161, 79, 162, 81, hex('#2a5a3a')); pset(160, 83, hex('#6aa87a'));
    rect(120, 85, 126, 90, hex('#8a4a2a')); for (const [dx, dy] of [[-1, -3], [1, -4], [3, -3], [2, -5], [0, -5]]) pset(123 + dx, 84 + dy, hex('#4a8a3a'));
    // el reloj de caja alto
    rect(182, 38, 200, 127, K); rect(183, 39, 199, 126, hex('#5a2e18')); rect(183, 39, 183, 126, hex('#7a4a2a')); R.disco(191, 48, 7, K); R.disco(191, 48, 6, hex('#f0e4c4'));
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pset(Math.round(191 + Math.cos(a) * 5), Math.round(48 + Math.sin(a) * 5), hex('#5a4a3a')); }
    rect(186, 60, 196, 100, K); rect(187, 61, 195, 99, hex('#2a1810')); rect(184, 106, 198, 122, hex('#4a2614')); rect(185, 107, 197, 108, hex('#6a3e22'));
    // los estantes con jarras de peltre y botellas
    for (const sy of [62, 82]) { rect(208, sy, 316, sy + 2, K); rect(209, sy, 315, sy, T.vigaL); rect(209, sy + 1, 315, sy + 1, T.viga); for (const bx of [212, 312]) { rect(bx, sy + 3, bx + 1, sy + 6, T.vigaS); } }
    for (let k = 0; k < 9; k++) { const x = 212 + k * 11, tipo = h(k, 1, 452); if (tipo < 0.55) { rect(x, 53, x + 6, 61, K); rect(x + 1, 54, x + 5, 61, T.peltre); rect(x + 1, 54, x + 1, 61, T.peltreL); rect(x + 5, 55, x + 5, 61, T.peltreS); rect(x + 7, 55, x + 8, 59, K); }
      else { const c = [hex('#2a5a3a'), hex('#5a2a2a'), hex('#3a3a6a')][k % 3]; rect(x + 1, 52, x + 5, 61, K); rect(x + 2, 53, x + 4, 61, c); rect(x + 3, 48, x + 3, 52, c); pset(x + 2, 54, c_mez(c, C.blanco, 0.5)); } }
    for (let k = 0; k < 13; k++) { const x = 211 + k * 8, ht = 4 + Math.floor(h(k, 2, 453) * 4); rect(x, 81 - ht, x + 5, 81, K); rect(x + 1, 82 - ht, x + 4, 81, k % 3 ? hex('#c8b890') : hex('#8a5a3a')); rect(x + 1, 82 - ht, x + 1, 81, hex('#e8dcb8')); }
    // los toneles sobre su potro, con sus aros y la espita
    rect(212, 120, 312, 127, T.vigaS); for (const bx of [216, 304]) rect(bx, 108, bx + 3, 127, T.viga);
    for (const [cx, cy] of [[238, 106], [278, 106], [258, 86]]) { R.disco(cx, cy, 14, K); R.disco(cx, cy, 13, hex('#8a5a32')); R.disco(cx - 2, cy - 2, 9, hex('#a0703e')); R.anillo(cx, cy, 12, hex('#3a3a40')); R.anillo(cx, cy, 7, hex('#5a3a22'));
      R.disco(cx, cy, 2, hex('#3a2a1c')); rect(cx - 1, cy + 6, cx + 1, cy + 10, hex('#8a8a90')); pset(cx, cy + 11, hex('#5a5a60')); }
    // un taburete y un perro que duerme junto al fuego (el perro respira; ver más abajo)
    rect(90, 120, 106, 122, K); rect(91, 120, 105, 121, T.vigaL); rect(92, 123, 93, 134, T.viga); rect(103, 123, 104, 134, T.viga);
  });
  // ── lo que se mueve ──
  // la calle por el ventanal: casas de enfrente, cielo de tarde y la gente que pasa, recortado al hueco
  R.recorte([115, 35, 171, 88]);
  for (let y = 35; y <= 88; y++) for (let x = 115; x <= 171; x++) pset(x, y, y < 46 ? ((x + y) & 1 && y > 41 ? hex('#e8b880') : hex('#c8a0a0')) : y < 50 ? hex('#e8b880') : hex('#7a6a5a'));
  for (const [x0, x1, top, c] of [[115, 136, 50, hex('#c8b490')], [137, 158, 46, hex('#b8a080')], [159, 171, 52, hex('#c8b898')]]) {
    for (let y = top; y <= 80; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x === x0 || ((x - x0) % 8 === 0 && y > top + 3)) ? hex('#3a2416') : y === top + 12 || y === top + 13 ? hex('#3a2416') : c);
    R.poligono([[x0 - 2, top], [(x0 + x1) / 2, top - 8], [x1 + 2, top]], hex('#5a4a4a')); for (let wx = x0 + 3; wx < x1 - 3; wx += 8) { for (let y = top + 4; y < top + 10; y++) for (let x = wx; x < wx + 4; x++) pset(x, y, Math.sin(t * 0.7 + wx) > 0.6 ? hex('#ffd890') : hex('#3a4a5a')); } }
  for (let y = 81; y <= 88; y++) for (let x = 115; x <= 171; x++) pset(x, y, h(x >> 1, y, 454) < 0.3 ? hex('#5a4a3a') : hex('#6e5c48'));
  for (let k = 0; k < 3; k++) { const u = (t / 9 + k / 3) % 1, x = Math.round(lerp(k % 2 ? 180 : 106, k % 2 ? 106 : 180, u)); c_gente(R, x, 86, t, { anda: true, ropa: [hex('#6a2a2a'), hex('#2a3a5a'), hex('#4a4a3a')][k], sombrero: k === 1 ? K : null, alto: 11, dir: k % 2 ? -1 : 1 }); }
  // el letrero del ganso y la parrilla, colgado del brazo de hierro de enfrente, que se mece
  { const sw = Math.sin(t * 1.6) * 2.2, bx = 146, by = 54; linea(132, 52, 158, 52, K); linea(140, 52, 140 + Math.round(sw * 0.3), 55, K); linea(152, 52, 152 + Math.round(sw * 0.3), 55, K);
    const ox = Math.round(sw); for (let y = 0; y < 13; y++) for (let x = 0; x < 18; x++) pset(bx - 9 + x + ox + Math.round(y * sw * 0.05), by + 1 + y, x === 0 || x === 17 || y === 0 || y === 12 ? K : y < 2 ? hex('#3a5a2a') : hex('#2a4a22'));
    const gx = bx - 5 + ox, gy = by + 4; for (const [dx, dy] of [[0, 2], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3], [4, 3], [4, 2], [5, 1], [5, 0], [6, 0], [7, 0]]) pset(gx + dx, gy + dy, hex('#f0ece0')); pset(gx + 8, gy, hex('#e8a030'));
    for (let i = 0; i < 4; i++) linea(gx + 1 + i * 2, gy + 6, gx + 1 + i * 2, gy + 7, hex('#c8c8c8')); linea(gx, gy + 6, gx + 8, gy + 6, hex('#c8c8c8')); linea(gx + 8, gy + 7, gx + 10, gy + 7, hex('#c8c8c8')); }
  R.recorte(null);
  // el emplomado en rombos, por encima de la calle, con el reflejo de la tarde
  for (let k = -6; k < 12; k++) { linea(115 + k * 8, 35, 115 + k * 8 + 53, 88, (x, y) => (x >= 115 && x <= 171 && y >= 35 && y <= 88 ? hex('#3a3a40') : null)); linea(171 - k * 8, 35, 171 - k * 8 - 53, 88, (x, y) => (x >= 115 && x <= 171 && y >= 35 && y <= 88 ? hex('#3a3a40') : null)); }
  rect(142, 34, 144, 89, K); rect(114, 61, 172, 62, K);
  for (let k = 0; k < 10; k++) pset(118 + k, 44 - k, hex('#f8f0e0')); for (let k = 0; k < 6; k++) pset(148 + k, 72 - k, hex('#f8f0e0'));
  // el péndulo del reloj
  { const a = Math.sin(t * Math.PI) * 0.22, px = 191 + Math.round(Math.sin(a) * 28); linea(191, 62, px, 90, C.oroS); R.disco(px, 92, 3, C.oro); pset(px - 1, 91, C.oroL);
    const hm = t * 0.05, hh = t * 0.004; linea(191, 48, 191 + Math.round(Math.cos(hm * 6.28 - 1.57) * 4), 48 + Math.round(Math.sin(hm * 6.28 - 1.57) * 4), K); linea(191, 48, 191 + Math.round(Math.cos(hh * 6.28 + 1) * 3), 48 + Math.round(Math.sin(hh * 6.28 + 1) * 3), K); }
  // el fuego, el caldero que borbotea, las brasas y la luz que baila por la pared y el suelo
  c_fuego(R, 24, 58, 117, 22, t); rect(34, 96, 48, 106, K); rect(35, 97, 47, 105, hex('#2a2a30')); rect(35, 97, 47, 97, hex('#5a5a64'));
  c_humo(R, 41, 94, t, 4, hex('#d8d0c8'), 12);
  for (let x = 24; x < 59; x++) if (h(x, Math.floor(t * 6), 455) < 0.5) pset(x, 117, hex('#ff8a30'));
  c_luz(R, 41, 108, 70 + Math.sin(t * 8) * 3, 48, hex('#ffb060'), 0.24 + 0.05 * Math.sin(t * 11));
  // el perro que duerme delante del fuego: respira y mueve la cola
  { const x = 44, y = 146, r = Math.sin(t * 2.4) > 0 ? 1 : 0; rect(x - 12, y - 6 - r, x + 6, y, K); rect(x - 11, y - 5 - r, x + 5, y - 1, hex('#a86a3a')); rect(x - 11, y - 5 - r, x + 5, y - 5 - r, hex('#c88a52'));
    rect(x + 4, y - 7, x + 11, y, K); rect(x + 5, y - 6, x + 10, y - 1, hex('#a86a3a')); rect(x + 9, y - 6, x + 11, y - 3, hex('#6a3e1e')); pset(x + 10, y - 2, K); pset(x + 7, y - 4, K);
    const c = Math.sin(t * 5) > 0.3 ? -1 : 0; linea(x - 12, y - 2, x - 17, y - 3 + c, hex('#a86a3a')); linea(x - 12, y - 1, x - 17, y - 2 + c, K);
    if ((t % 3) < 1.5) { const u = (t % 3) / 1.5; R.icono && pset(x + 12 + Math.round(u * 3), y - 9 - Math.round(u * 6), hex('#f0f0f0')); } }
  // la moza que va y viene entre los toneles y llena una jarra
  { const u = (t % 8) / 8, x = Math.round(u < 0.4 ? lerp(226, 290, u / 0.4) : u < 0.5 ? 290 : u < 0.9 ? lerp(290, 226, (u - 0.5) / 0.4) : 226); c_gente(R, x, 127, t, { anda: u < 0.4 || (u > 0.5 && u < 0.9), ropa: hex('#7a3a3a'), alto: 12, pelo: hex('#8a4a2a'), dir: u < 0.45 ? 1 : -1 });
    rect(x - 4, 100, x + 4, 100, hex('#f0ece0')); }
  // velas en la pared y el humo de pipas que flota bajo las vigas
  for (const [x, k] of [[48, 0], [68, 1]]) c_vela(R, x, 54, t, 5, k);
  for (let k = 0; k < 6; k++) { const x = Math.round(((k * 61 + t * 4) % 340) - 10), y = 26 + (k % 3) * 6; for (let i = 0; i < 9; i++) if ((x + i + y) & 1) c_tine(R, x + i, y + Math.round(Math.sin(i * 0.7 + t) * 1), hex('#e8e0d0'), 0.25); }
  return { suelo: 160, detras: 140, pies: [70, 112, 140, 168, 196, 250], mesa: [92, 136, 236, 160], ventana: [114, 34, 172, 89], chimenea: [18, 78, 64, 127], reloj: [182, 38, 200, 127], toneles: [212, 72, 312, 127], perro: [32, 146] };
}

// la mesa larga de la taberna (por delante de los que están detrás): tablero con vetas, faldón, patas y lo de encima
function c_pintaMesaLarga(R) {
  const { rect, pset } = R, K = C.k, T = c_TB;
  rect(90, 135, 238, 142, K); c_tablas(R, 91, 136, 237, 141, [hex('#7a5232'), hex('#5e3e24'), hex('#9a6e44'), hex('#4a2e18')], 5, 3); rect(91, 136, 237, 136, hex('#b08458'));
  rect(92, 143, 236, 148, K); rect(93, 143, 235, 147, hex('#5a3a22')); rect(93, 143, 235, 143, hex('#3a2416')); for (let x = 98; x < 232; x += 22) rect(x, 144, x + 14, 146, hex('#6a4628'));
  for (const lx of [96, 160, 228]) { rect(lx, 149, lx + 4, 163, K); rect(lx + 1, 149, lx + 3, 162, hex('#5a3a22')); rect(lx + 1, 149, lx + 1, 162, hex('#7a5232')); }
  for (let x = 92; x < 238; x++) for (let y = 164; y < 167; y++) if ((x + y) & 1) pset(x, y, hex('#3a2616'));
  // jarras, un plato con pan, una pipa en su soporte y el candelero (la llama la pone c_vivoMesaLarga)
  for (const [x, alto] of [[104, 8], [128, 9], [196, 8], [222, 9]]) { rect(x, 135 - alto, x + 6, 136, K); rect(x + 1, 136 - alto, x + 5, 135, T.peltre); rect(x + 1, 136 - alto, x + 1, 135, T.peltreL); rect(x + 5, 137 - alto, x + 5, 135, T.peltreS); rect(x + 7, 137 - alto, x + 8, 133, K); rect(x + 1, 135 - alto, x + 5, 135 - alto, hex('#f4ecd8')); }
  R.disco(150, 135, 6, K); R.disco(150, 135, 5, T.peltre); rect(146, 130, 154, 134, hex('#c88a42')); rect(147, 130, 153, 130, hex('#e8b060')); pset(149, 132, hex('#8a5a2a'));
  rect(170, 133, 186, 134, hex('#f0ece0')); rect(186, 131, 188, 134, hex('#f0ece0'));
  rect(208, 133, 214, 135, C.oroS); rect(210, 128, 212, 133, C.oro);
}

function c_vivoMesaLarga(R, t) { c_vela(R, 211, 128, t, 5, 3); c_humo(R, 188, 130, t, 4, hex('#d8d4cc'), 16); }

// la mesa de la taberna de cerca (ver la cabecera de logia: o.camara 'mesa')
function c_tabernaMesa(R, t, o) {
  const { rect, pset, linea } = R, K = C.k, T = c_TB;
  c_fondo(R, 'tabernaMesa', () => {
    c_tablas(R, 0, 0, 319, 9, [hex('#4a3626'), hex('#3a2a1c'), hex('#5a4430'), hex('#2a1c12')], 6, 5);
    rect(0, 9, 319, 15, K); rect(0, 10, 319, 14, T.viga); rect(0, 10, 319, 10, T.vigaL);
    c_yeso(R, 0, 16, 319, 119, T.yeso, 7);
    for (const px of [126, 184]) { rect(px, 16, px + 6, 119, T.viga); rect(px, 16, px, 119, T.vigaL); rect(px + 6, 16, px + 6, 119, T.vigaS); }
    rect(132, 54, 184, 58, T.viga); rect(132, 54, 184, 54, T.vigaL);
    // la ventana grande (la calle se pinta en cada fotograma)
    rect(24, 20, 116, 92, K); rect(25, 21, 115, 91, T.vigaL); rect(28, 24, 112, 87, K); rect(22, 88, 118, 93, K); rect(23, 89, 117, 91, T.vigaL);
    // estante con jarras y un cuadro pequeño
    rect(140, 26, 176, 50, K); rect(141, 27, 175, 49, hex('#8a6a2a')); rect(143, 29, 173, 47, hex('#5a7a5a')); rect(143, 40, 173, 47, hex('#3a5a3a')); R.disco(166, 34, 3, hex('#e8d890'));
    for (let k = 0; k < 6; k++) { const x = 140 + k * 7; R.poligono([[x, 47], [x + 3, 38 + (k % 3) * 2], [x + 7, 47]], hex('#4a6a3a')); }
    rect(192, 64, 270, 66, K); rect(193, 64, 269, 64, T.vigaL);
    for (let k = 0; k < 7; k++) { const x = 195 + k * 11; rect(x, 54, x + 7, 63, K); rect(x + 1, 55, x + 6, 63, T.peltre); rect(x + 1, 55, x + 1, 63, T.peltreL); rect(x + 6, 56, x + 6, 63, T.peltreS); }
    // la chimenea a la derecha, de piedra, con su repisa
    c_sillar(R, 276, 40, 319, 119, 12, 7, T.piedra, 8); rect(274, 40, 319, 46, K); rect(275, 41, 319, 44, T.vigaL); rect(286, 60, 319, 119, K);
    for (const x of [280, 296]) { rect(x - 2, 38, x + 2, 39, C.oroS); rect(x - 1, 33, x, 38, C.oro); }
  });
  // la calle por la ventana, recortada, con su letrero que se mece y la gente que pasa
  R.recorte([29, 25, 111, 86]);
  for (let y = 25; y <= 86; y++) for (let x = 29; x <= 111; x++) pset(x, y, y < 40 ? ((x + y) & 1 && y > 34 ? hex('#e8b880') : hex('#c8a0a0')) : hex('#7a6a5a'));
  for (const [x0, x1, top, c] of [[29, 58, 40, hex('#c8b490')], [59, 90, 34, hex('#b8a080')], [91, 111, 44, hex('#c8b898')]]) {
    for (let y = top; y <= 78; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x === x0 || ((x - x0) % 10 === 0 && y > top + 3)) ? hex('#3a2416') : y === top + 14 || y === top + 15 ? hex('#3a2416') : h(x >> 1, y >> 1, 456) < 0.1 ? c_mez(c, K, 0.15) : c);
    for (let wx = x0 + 3; wx < x1 - 4; wx += 10) for (let y = top + 4; y < top + 11; y++) for (let x = wx; x < wx + 5; x++) pset(x, y, Math.sin(t * 0.6 + wx) > 0.5 ? hex('#ffd890') : hex('#3a4a5a')); }
  for (let y = 79; y <= 86; y++) for (let x = 29; x <= 111; x++) pset(x, y, h(x >> 1, y, 457) < 0.3 ? hex('#5a4a3a') : hex('#6e5c48'));
  for (let k = 0; k < 3; k++) { const u = (t / 8 + k / 3) % 1, x = Math.round(lerp(k % 2 ? 120 : 20, k % 2 ? 20 : 120, u)); c_gente(R, x, 86, t, { anda: true, ropa: [hex('#6a2a2a'), hex('#2a3a5a'), hex('#4a4a3a')][k], sombrero: k === 1 ? K : null, alto: 13, dir: k % 2 ? -1 : 1 }); }
  { const sw = Math.sin(t * 1.6) * 3, bx = 76, by = 34; linea(58, 30, 96, 30, K); linea(68, 30, 68 + Math.round(sw * 0.3), 34, K); linea(84, 30, 84 + Math.round(sw * 0.3), 34, K);
    const ox = Math.round(sw); for (let y = 0; y < 18; y++) for (let x = 0; x < 26; x++) pset(bx - 13 + x + ox + Math.round(y * sw * 0.05), by + y, x === 0 || x === 25 || y === 0 || y === 17 ? K : x === 1 || y === 1 ? hex('#4a7a3a') : hex('#2a4a22'));
    const gx = bx - 8 + ox, gy = by + 3; for (const [dx, dy] of [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 3], [6, 2], [7, 1], [7, 0], [8, 0], [9, 0], [1, 5], [2, 5], [3, 5], [4, 5]]) pset(gx + dx, gy + dy, hex('#f0ece0')); pset(gx + 10, gy, hex('#e8a030')); pset(gx + 8, gy - 1, K); pset(gx + 3, gy + 6, hex('#e8a030')); pset(gx + 5, gy + 6, hex('#e8a030'));
    for (let i = 0; i < 5; i++) linea(gx + 1 + i * 2, gy + 9, gx + 1 + i * 2, gy + 11, hex('#c8c8c8')); linea(gx, gy + 9, gx + 10, gy + 9, hex('#c8c8c8')); linea(gx, gy + 11, gx + 10, gy + 11, hex('#c8c8c8')); linea(gx + 11, gy + 10, gx + 14, gy + 10, hex('#c8c8c8')); }
  R.recorte(null);
  for (let k = -9; k < 14; k++) { const cl = (x, y) => (x >= 29 && x <= 111 && y >= 25 && y <= 86 ? hex('#3a3a40') : null); linea(29 + k * 10, 25, 29 + k * 10 + 61, 86, cl); linea(111 - k * 10, 25, 111 - k * 10 - 61, 86, cl); }
  rect(68, 24, 71, 87, K); rect(28, 54, 112, 56, K); for (let k = 0; k < 12; k++) pset(34 + k, 38 - k, hex('#f8f0e0'));
  // el fuego de la chimenea y su luz
  c_fuego(R, 290, 319, 116, 24, t); c_luz(R, 300, 96, 70, 50, hex('#ffb060'), 0.22 + 0.05 * Math.sin(t * 11));
  for (const [x, k] of [[280, 0], [296, 1]]) c_vela(R, x, 33, t, 4, k);
  for (let k = 0; k < 5; k++) { const x = Math.round(((k * 71 + t * 5) % 340) - 10), y = 20 + (k % 3) * 7; for (let i = 0; i < 10; i++) if ((x + i + y) & 1) c_tine(R, x + i, y + Math.round(Math.sin(i * 0.7 + t) * 1), hex('#e8e0d0'), 0.22); }
  // la mesa de cerca también aquí, para que el fondo pinte toda la pantalla aunque la escena no llame a logiaDelante
  R.rect(0, 120, 319, 127, c_TB.viga); R.rect(0, 120, 319, 120, c_TB.vigaL);
  c_pegar(R, c_capa(R, 'tmesaD', () => c_pintaMesaCerca(R)), 124, 179); c_vivoMesaCerca(R, t);
  return { suelo: 131, pies: [40, 80, 150, 210, 250], mesa: [0, 128, 319, 179], pergamino: [126, 136, 196, 166], ventana: [29, 25, 111, 86], letrero: [76, 44], chimenea: [286, 60, 319, 119] };
}

// el tablero de la mesa de cerca, en perspectiva, con todo lo de encima (capa por delante de los personajes)
function c_pintaMesaCerca(R) {
  const { rect, pset, linea, poligono } = R, K = C.k, T = c_TB;
  poligono([[6, 126], [314, 126], [340, 180], [-20, 180]], K);
  poligono([[8, 128], [312, 128], [338, 180], [-18, 180]], (x, y) => { const z = (y - 74), u = (x - 160) / z * 9, f = Math.floor(u + 50), fr = (u + 50) % 1;
    let c = h(f, 0, 460) < 0.3 ? hex('#7a5232') : hex('#86603a'); if (fr < 0.06) c = hex('#4a2e18'); else if (h(f, Math.floor(y / 3), 461) < 0.12 && fr > 0.4 && fr < 0.5) c = hex('#6a4628'); else if (fr > 0.9) c = hex('#9a7048'); return c; });
  rect(8, 128, 312, 128, hex('#b08458')); rect(8, 129, 312, 129, hex('#9a7048'));
  // el pergamino de las reglas: renglones de trazos (sin letras), la capitular de adorno y el sello de cera
  poligono([[128, 134], [196, 134], [202, 168], [122, 168]], K); poligono([[129, 135], [195, 135], [201, 167], [123, 167]], (x, y) => (h(x >> 1, y >> 1, 462) < 0.15 ? C.pergaminoS : C.pergamino));
  rect(122, 166, 202, 167, C.pergaminoS); rect(129, 135, 195, 135, hex('#f4e8c0'));
  for (let r = 0; r < 9; r++) { const y = 140 + r * 3, x0 = 136 - Math.round(r * 0.4) + (r === 0 ? 8 : 0); let x = x0; const fin = 188 + Math.round(r * 0.4) - (r === 8 ? 26 : 0);
    while (x < fin) { const L = 2 + Math.floor(h(x, r, 463) * 6); linea(x, y, Math.min(fin, x + L), y, hex('#4a3a2a')); if (h(x, r, 464) < 0.3) pset(x + 1, y - 1, hex('#4a3a2a')); x += L + 2; } }
  rect(134, 138, 141, 145, hex('#a83030')); rect(135, 139, 140, 144, hex('#e8c060')); pset(137, 141, hex('#a83030')); pset(138, 142, hex('#3a6a3a'));
  R.disco(188, 162, 4, hex('#6a1818')); R.disco(188, 162, 3, C.cera); pset(187, 161, hex('#e86a6a')); linea(184, 166, 180, 172, hex('#a83030')); linea(192, 166, 195, 172, hex('#a83030'));
  // tintero con su pluma, monedas y un plato con pan y queso
  rect(210, 140, 220, 150, K); rect(211, 141, 219, 149, hex('#2a2a3a')); rect(211, 141, 219, 142, hex('#4a4a5a')); linea(216, 140, 228, 120, hex('#f0ece0')); linea(217, 140, 229, 121, hex('#c8c0b0')); for (let k = 0; k < 6; k++) pset(222 + k, 129 - k * 1.5, hex('#f8f4ea'));
  for (const [x, y] of [[96, 160], [104, 163], [100, 156]]) { R.disco(x, y, 3, K); R.disco(x, y, 2, C.oro); pset(x - 1, y - 1, C.oroL); }
  R.disco(262, 150, 18, K); R.disco(262, 150, 17, T.peltre); R.disco(262, 150, 13, T.peltreS); R.disco(262, 150, 12, T.peltre); R.disco(258, 146, 5, T.peltreL);
  poligono([[250, 146], [266, 140], [272, 150], [256, 156]], K); poligono([[251, 146], [265, 141], [270, 150], [256, 155]], hex('#c8883a')); linea(254, 147, 266, 143, hex('#e8b060')); for (const [x, y] of [[257, 149], [262, 147], [265, 150]]) pset(x, y, hex('#8a5a2a'));
  poligono([[266, 152], [278, 148], [276, 160]], K); poligono([[267, 152], [277, 149], [275, 158]], hex('#f0d060')); pset(272, 153, hex('#c8a030'));
  // dos jarras de peltre con espuma (delante, grandes) y otra detrás
  for (const [x, y, s] of [[40, 166, 2], [70, 142, 1], [286, 140, 1]]) { const w = 8 * s, a = 12 * s; rect(x - 1, y - a - 1, x + w + 1, y, K); rect(x, y - a, x + w, y - 1, T.peltre); rect(x + 1, y - a, x + 1 + s, y - 1, T.peltreL); rect(x + w - s, y - a, x + w, y - 1, T.peltreS);
    for (const yy of [y - a + 3 * s, y - 3 * s]) rect(x, yy, x + w, yy, T.peltreS); rect(x + w + 1, y - a + 2 * s, x + w + 3 * s, y - a + 3 * s, K); rect(x + w + 2 * s, y - a + 3 * s, x + w + 3 * s, y - 3 * s, K);
    rect(x, y - a - 1 - s, x + w, y - a - 1, hex('#f4ecd8')); pset(x + 2, y - a - 2 - s, hex('#ffffff')); R.disco(x + w / 2, y - a - 1 - s, s + 1, hex('#f4ecd8')); }
  // dos pipas de barro largas apoyadas, y el candelero de latón (las llamas y el humo, en c_vivoMesaCerca)
  linea(60, 172, 112, 152, hex('#f0ece0')); linea(60, 173, 112, 153, hex('#c8c0b0')); rect(112, 148, 116, 152, K); rect(113, 149, 115, 151, hex('#e8e0d0'));
  linea(228, 176, 276, 166, hex('#f0ece0')); linea(228, 177, 276, 167, hex('#c8c0b0')); rect(225, 172, 229, 176, K); rect(226, 173, 228, 175, hex('#e8e0d0'));
  R.disco(110, 142, 6, K); R.disco(110, 142, 5, C.oroS); R.disco(109, 141, 3, C.oro); rect(108, 128, 112, 140, K); rect(109, 128, 111, 140, C.oro); rect(109, 128, 109, 140, C.oroL);
  // la sombra del borde de delante y unas migas
  for (let k = 0; k < 40; k++) pset(150 + Math.floor(h(k, 1, 465) * 120), 160 + Math.floor(h(k, 2, 465) * 18), hex('#e8b060'));
}

function c_vivoMesaCerca(R, t) { c_vela(R, 110, 127, t, 9, 2); c_humo(R, 114, 147, t, 5, hex('#e0dcd4'), 26); c_humo(R, 227, 171, t + 1.3, 5, hex('#e0dcd4'), 26); c_luz(R, 110, 120, 40, 24, hex('#ffd890'), 0.14); }

// la catedral a medio construir (ver la cabecera de logia: o.encuadre 'catedral')
const c_CT = { caliza: [hex('#d8c8a4'), hex('#a8987a'), hex('#efe2c4'), hex('#7a6e58')], palo: hex('#7a5232'), paloL: hex('#a07448'), paloS: hex('#4e3420') };

function c_catedral(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, S = c_CT;
  c_cielo(R, t, 150, [hex('#5a8ad0'), hex('#78a6e0'), hex('#9cc2ea'), hex('#c4dcf0')], [hex('#ffffff'), hex('#e6eef8'), hex('#b4c4dc')], { nubes: [[20, 20, 44, 1.0], [140, 34, 36, 1.6], [250, 70, 30, 2.2], [80, 64, 26, 2.8], [200, 26, 38, 0.6]] });
  c_pajaros(R, t, 30, 3, hex('#3a3a4a'), 12);
  c_pegar(R, c_capa(R, 'catedral', () => {
    // colinas y tejados lejanos del pueblo
    poligono([[0, 132], [60, 122], [120, 128], [200, 118], [270, 126], [320, 120], [320, 150], [0, 150]], hex('#8aa880'));
    for (let x = 0; x < 320; x++) for (let y = 120; y < 150; y++) if (R.pget(x, y) === hex('#8aa880') && h(x >> 1, y >> 1, 470) < 0.25) pset(x, y, hex('#7a9870'));
    for (let k = 0; k < 14; k++) { const x = 4 + k * 23 + Math.floor(h(k, 1, 471) * 8), y = 134 + Math.floor(h(k, 2, 471) * 6); rect(x, y, x + 12, y + 8, hex('#d8c8a8')); poligono([[x - 2, y], [x + 6, y - 6], [x + 14, y]], hex('#a8584a')); rect(x + 4, y + 3, x + 6, y + 6, hex('#5a4a3a')); }
    // la catedral: torre izquierda acabada, la fachada con el rosetón vacío y la torre derecha a medias
    const piedra = (x0, y0, x1, y1, k) => { c_sillar(R, x0, y0, x1, y1, 10, 6, S.caliza, k); for (let y = y0; y <= y1; y++) for (let x = x1 - 5; x <= x1; x++) if ((x + y) & 1) c_tine(R, x, y, hex('#5a5068'), 0.25); };
    piedra(36, 30, 90, 150, 1); rect(34, 26, 92, 30, S.caliza[3]); for (let x = 36; x < 92; x += 6) rect(x, 22, x + 3, 26, S.caliza[0]);
    for (const wy of [44, 84]) { rect(52, wy, 74, wy + 26, S.caliza[3]); poligono([[52, wy], [63, wy - 10], [74, wy]], S.caliza[3]); rect(54, wy, 72, wy + 26, hex('#2a2a3a')); poligono([[54, wy], [63, wy - 8], [72, wy]], hex('#2a2a3a')); rect(62, wy - 6, 64, wy + 26, S.caliza[1]); }
    for (const px of [36, 88]) for (let y = 30; y < 150; y += 2) pset(px, y, S.caliza[2]);
    piedra(90, 56, 172, 150, 2); poligono([[90, 56], [131, 30], [172, 56]], S.caliza[3]); poligono([[93, 55], [131, 33], [169, 55]], S.caliza[0]);
    for (let y = 34; y < 56; y++) for (let x = 93; x < 169; x++) if (R.pget(x, y) === S.caliza[0] && (h(x >> 2, y >> 1, 472) < 0.2)) pset(x, y, S.caliza[1]);
    R.disco(131, 76, 17, S.caliza[3]); R.disco(131, 76, 15, hex('#2a2a3a')); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; linea(131, 76, 131 + Math.cos(a) * 15, 76 + Math.sin(a) * 15, S.caliza[1]); } R.disco(131, 76, 4, S.caliza[0]); R.anillo(131, 76, 10, S.caliza[1]);
    // el pórtico con sus arquivoltas y la puerta de madera
    for (let k = 0; k < 4; k++) { const w = 22 - k * 3; rect(131 - w, 112 + k * 2, 131 + w, 150, k % 2 ? S.caliza[1] : S.caliza[2]); poligono([[131 - w, 113 + k * 2], [131, 96 + k * 3], [131 + w, 113 + k * 2]], k % 2 ? S.caliza[1] : S.caliza[2]); }
    rect(117, 122, 145, 150, hex('#5a3a22')); poligono([[117, 122], [131, 110], [145, 122]], hex('#5a3a22')); for (let x = 119; x < 145; x += 4) rect(x, 118, x, 150, hex('#3a2416')); rect(130, 112, 132, 150, hex('#3a2416'));
    for (const y of [128, 142]) rect(117, y, 145, y, hex('#2a2a2a'));
    piedra(172, 76, 214, 150, 3); for (let x = 172; x < 214; x += 4) { const hh = Math.floor(h(x, 1, 473) * 8); rect(x, 70 + hh, x + 3, 76, S.caliza[0]); rect(x, 70 + hh, x + 3, 70 + hh, S.caliza[2]); }
    rect(184, 92, 202, 118, S.caliza[3]); poligono([[184, 92], [193, 82], [202, 92]], S.caliza[3]); rect(186, 92, 200, 118, hex('#2a2a3a')); poligono([[186, 92], [193, 84], [200, 92]], hex('#2a2a3a'));
    // los andamios de troncos atados: pies derechos, travesaños, tornapuntas, tablas y escalas
    for (const px of [166, 180, 196, 212, 220]) { rect(px, 40, px + 1, 150, S.palo); rect(px, 40, px, 150, S.paloL); }
    for (const py of [64, 88, 112]) { rect(164, py, 222, py + 1, S.palo); rect(164, py, 222, py, S.paloL); rect(164, py - 2, 222, py - 1, hex('#b08a5a')); for (const px of [166, 180, 196, 212, 220]) { pset(px - 1, py + 2, hex('#c8b890')); pset(px + 2, py + 2, hex('#c8b890')); } }
    for (const [x0, y0, x1, y1] of [[166, 112, 196, 88], [196, 88, 220, 64], [180, 150, 212, 112]]) linea(x0, y0, x1, y1, S.paloS);
    for (let y = 92; y < 150; y += 4) rect(224, y, 230, y, S.paloL); rect(224, 90, 224, 150, S.palo); rect(230, 90, 230, 150, S.palo);
    // la grúa: el mástil sobre el andamio y el brazo con su polea
    rect(206, 26, 208, 64, S.palo); linea(206, 28, 238, 34, S.palo); linea(206, 29, 238, 35, S.paloS); linea(208, 50, 230, 34, S.palo); R.disco(238, 36, 3, K); R.disco(238, 36, 2, hex('#8a6a4a'));
    // el torno en el suelo
    rect(236, 140, 256, 150, K); rect(237, 141, 255, 149, S.palo); R.disco(246, 138, 8, S.paloS); R.anillo(246, 138, 8, S.palo);
    // la cabaña de los canteros (la logia): postes, tejado de paja, herramientas colgadas y su banco
    rect(258, 116, 316, 152, hex('#3a2a1c')); for (let x = 258; x < 316; x += 5) rect(x, 116, x + 3, 152, h(x, 1, 474) < 0.5 ? hex('#6a4a2e') : hex('#5a3e26'));
    rect(264, 126, 300, 150, hex('#2a1e14')); for (let y = 127; y < 150; y++) for (let x = 265; x < 300; x++) if (h(x >> 1, y >> 1, 478) < 0.2) pset(x, y, hex('#3a2a1c'));
    rect(267, 129, 281, 132, hex('#a8acb4')); for (let x = 268; x < 281; x += 2) pset(x, 133, hex('#6a6e78')); rect(281, 129, 284, 132, hex('#8a5a32'));
    for (const mx of [288, 295]) { rect(mx, 130, mx, 138, hex('#8a6a4a')); R.disco(mx, 129, 2, hex('#a8987a')); }
    rect(268, 138, 270, 147, hex('#c8c8c8')); rect(268, 145, 278, 147, hex('#c8c8c8'));
    for (const [bx, by] of [[284, 146], [292, 144]]) { rect(bx, by, bx + 6, by + 4, hex('#d8c8a4')); rect(bx, by, bx + 6, by, hex('#efe2c4')); }
    poligono([[252, 118], [286, 96], [320, 102], [320, 120]], hex('#8a6a3a')); for (let y = 96; y < 121; y++) for (let x = 252; x < 320; x++) if (R.pget(x, y) === hex('#8a6a3a')) pset(x, y, h(x, y >> 1, 475) < 0.3 ? hex('#6a4e28') : (x + y * 2) % 5 === 0 ? hex('#b08a4a') : hex('#8a6a3a'));
    linea(252, 118, 286, 96, hex('#4a3418')); rect(258, 152, 316, 152, hex('#2a1e14'));
    // el suelo de tierra apisonada con esquirlas, sillares apilados y un carro
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 476); pset(x, y, v < 0.2 ? hex('#8a7050') : v > 0.85 ? hex('#b8a07a') : hex('#a08860')); }
    for (let k = 0; k < 160; k++) pset(Math.floor(h(k, 1, 477) * 320), 151 + Math.floor(h(k, 2, 477) * 29), hex('#efe2c4'));
    for (const [x, y, w] of [[6, 150, 22], [10, 140, 16], [30, 152, 18], [16, 160, 20]]) { rect(x - 1, y - 9, x + w + 1, y, K); c_sillar(R, x, y - 8, x + w, y - 1, w + 2, 9, S.caliza, x); rect(x, y - 8, x + w, y - 8, S.caliza[2]); }
    rect(240, 160, 290, 166, K); rect(241, 161, 289, 165, S.palo); for (const sx of [244, 268]) { rect(sx, 154, sx + 18, 160, K); c_sillar(R, sx + 1, 155, sx + 17, 159, 20, 6, S.caliza, sx); }
    R.disco(252, 170, 8, K); R.disco(252, 170, 7, S.palo); R.disco(252, 170, 2, K); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; linea(252, 170, 252 + Math.cos(a) * 6, 170 + Math.sin(a) * 6, S.paloS); }
    linea(290, 163, 312, 158, S.palo);
  }));
  // lo que se mueve: el sillar que sube y baja colgado de la polea, el torno que gira, los canteros que golpean y el que sube
  { const u = (t % 10) / 10, sube = u < 0.5 ? u * 2 : 2 - u * 2, by = Math.round(lerp(132, 52, sube)); linea(238, 38, 238, by - 6, hex('#c8b890')); linea(246, 138, 238, 38, hex('#c8b890'));
    rect(232, by - 6, 244, by + 2, K); c_sillar(R, 233, by - 5, 243, by + 1, 12, 7, S.caliza, 9); linea(233, by - 6, 238, by - 10, K); linea(243, by - 6, 238, by - 10, K);
    const a = t * (u < 0.5 ? 1.6 : -1.6); for (let i = 0; i < 4; i++) { const b = a + i * Math.PI / 2; linea(246, 138, 246 + Math.round(Math.cos(b) * 8), 138 + Math.round(Math.sin(b) * 8), c_CT.paloL); }
    c_gente(R, 262, 150, t, { ropa: hex('#6a5a3a'), alto: 12, saluda: false, dir: -1 }); }
  for (const [x, y, k] of [[172, 62, 0], [188, 86, 1], [204, 110, 2], [186, 62, 3]]) { const g = Math.sin(t * 6 + k * 1.7) > 0; c_gente(R, x, y, t, { ropa: [hex('#7a5a3a'), hex('#5a6a7a'), hex('#8a4a3a'), hex('#6a6a4a')][k], alto: 11, pelo: hex('#5a3a22') });
    linea(x + 3, y - 6, x + 6, g ? y - 9 : y - 5, hex('#8a8a90')); if (!g && (Math.floor(t * 6 / Math.PI + k) % 3 === 0)) { pset(x + 7, y - 6, S.caliza[2]); pset(x + 8, y - 8, S.caliza[2]); } }
  { const u = (t % 7) / 7, y = Math.round(lerp(150, 92, u)); c_gente(R, 227, y, t, { ropa: hex('#6a4a3a'), alto: 11, capacho: true, anda: true }); }
  // humo de la fragua de la cabaña
  c_humo(R, 300, 98, t, 6, hex('#e8e4e0'), 30);
  return { suelo: 168, pies: [60, 90, 120, 150, 180, 210], portico: [117, 110, 145, 150], andamio: [164, 40, 222, 150], cabana: [258, 96, 316, 152], grua: [238, 36], horizonte: 132 };
}

// el banco del cantero de cerca (ver la cabecera de logia: 'catedral', o.camara 'cerca')
function c_cantero(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, S = c_CT, talla = o.talla ?? 1;
  c_fondo(R, 'cantero', () => {
    // el muro de sillería de cerca: cada sillar con las huellas diagonales de la gradina, chorretones, musgo en las juntas
    c_sillar(R, 0, 0, 319, 128, 22, 11, S.caliza, 11);
    for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(y / 11), bx = Math.floor((x + ((f & 1) ? 11 : 0)) / 22);
      if (((x + y * 2 + bx * 3) % 5 === 0) && (y % 11) > 1 && (y % 11) < 10 && h(bx, f, 485) < 0.6) c_tine(R, x, y, S.caliza[1], 0.3);
      if (h(x >> 1, 0, 486) < 0.07 && h(x >> 1, y >> 3, 487) < 0.6) c_tine(R, x, y, hex('#8a7a5a'), 0.25); }
    for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 488) * 320), y = Math.floor(h(k, 2, 488) * 12) * 11; pset(x, y, hex('#6a7a4a')); pset(x + 1, y, hex('#5a6a3a')); if (k % 2) pset(x, y - 1, hex('#7a8a5a')); }
    for (const [mx, my] of [[244, 58], [290, 102], [12, 80]]) { linea(mx, my, mx + 4, my - 5, S.caliza[3]); linea(mx + 4, my - 5, mx + 8, my, S.caliza[3]); linea(mx + 2, my - 2, mx + 6, my - 2, S.caliza[3]); }
    // la ventana ojival sin vidrio: el marco, el parteluz y su derrame en sombra
    rect(30, 24, 82, 104, S.caliza[3]); poligono([[30, 24], [56, 0], [82, 24]], S.caliza[3]);
    rect(55, 8, 57, 104, S.caliza[1]); for (const [x0, x1] of [[30, 34], [78, 82]]) for (let y = 0; y < 104; y += 11) rect(x0, y, x1, y, S.caliza[3]);
    rect(28, 104, 84, 108, K); rect(29, 104, 83, 106, S.caliza[2]); rect(29, 107, 83, 107, S.caliza[1]);
    // la luz de tarde sesgada sobre el muro
    for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) if (((x - y * 0.6) % 90 + 90) % 90 < 30 && (x + y) & 1) c_tine(R, x, y, hex('#fff0c8'), 0.12);
    // el andamio de delante del muro, con su plataforma y tornapunta
    for (const px of [104, 244]) { rect(px, 0, px + 3, 150, S.palo); rect(px, 0, px, 150, S.paloL); rect(px + 3, 0, px + 3, 150, S.paloS); for (let y = 6; y < 150; y += 9) pset(px + 1, y, S.paloS); }
    rect(98, 40, 252, 44, K); rect(99, 40, 251, 42, hex('#b08a5a')); rect(99, 43, 251, 43, S.paloS); for (let x = 112; x < 250; x += 18) rect(x, 40, x, 42, S.paloS);
    for (const px of [104, 244]) { for (let k = 0; k < 3; k++) linea(px - 2, 44 + k * 2, px + 5, 46 + k * 2, hex('#c8b890')); }
    rect(100, 86, 250, 88, S.palo); rect(100, 86, 250, 86, S.paloL);
    linea(107, 86, 243, 44, S.paloS); linea(107, 87, 243, 45, S.palo);
    // el suelo de tierra con esquirlas, polvo de piedra y el capazo de herramientas
    for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 481); pset(x, y, v < 0.2 ? hex('#8a7050') : v > 0.85 ? hex('#b8a07a') : hex('#a08860')); }
    rect(0, 128, 319, 129, hex('#6a5640'));
    for (let k = 0; k < 220; k++) { const x = Math.floor(h(k, 1, 482) * 320), y = 132 + Math.floor(h(k, 2, 482) * 48); pset(x, y, hex('#efe2c4')); if (k % 3 === 0) pset(x + 1, y, hex('#d8c8a4')); }
    for (let y = 150; y < 180; y++) for (let x = 120; x < 240; x++) if (h(x, y, 489) < 0.25) pset(x, y, hex('#d8c8a4'));
    rect(254, 150, 282, 170, K); for (let y = 151; y < 170; y++) for (let x = 255; x < 282; x++) pset(x, y, (x + y) % 4 < 2 ? hex('#a8844e') : hex('#8a6a3a')); rect(254, 150, 282, 152, hex('#6a4a2a'));
    rect(260, 140, 262, 150, S.palo); rect(258, 136, 264, 140, hex('#8a6a4a')); linea(270, 150, 278, 136, hex('#8a8a90')); linea(271, 150, 279, 136, hex('#5a5a60'));
    for (const [x, y, w] of [[16, 160, 26], [30, 150, 18], [290, 172, 24]]) { rect(x - 1, y - 10, x + w + 1, y, K); c_sillar(R, x, y - 9, x + w, y - 1, w + 2, 10, S.caliza, x); }
    // el banco del cantero (el «banker»): tablero grueso y patas, a la altura de la cintura de un personaje
    rect(118, 147, 232, 155, K); c_tablas(R, 119, 148, 231, 154, [hex('#7a5232'), hex('#5e3e24'), hex('#9a6e44'), hex('#4a2e18')], 12, 3); rect(119, 148, 231, 148, hex('#b08458'));
    for (const lx of [124, 222]) { rect(lx, 156, lx + 6, 172, K); rect(lx + 1, 156, lx + 5, 171, hex('#5a3a22')); rect(lx + 1, 156, lx + 1, 171, hex('#7a5232')); }
    rect(130, 164, 220, 166, K); rect(131, 165, 219, 165, hex('#5a3a22'));
    for (let x = 116; x < 236; x++) for (let y = 172; y < 176; y++) if ((x + y) & 1) c_tine(R, x, y, K, 0.35);
    // el sillar sobre el banco: la cara de delante, la de arriba y el lado en sombra
    poligono([[136, 116], [204, 116], [214, 110], [146, 110]], K); poligono([[137, 115], [203, 115], [212, 111], [147, 111]], S.caliza[2]);
    rect(135, 116, 205, 147, K); c_sillar(R, 136, 117, 204, 146, 80, 40, S.caliza, 13); rect(205, 111, 215, 142, K); poligono([[205, 116], [214, 111], [214, 141], [205, 146]], S.caliza[1]);
    for (let y = 117; y < 147; y++) for (let x = 136; x < 205; x++) if (h(x, y, 483) < 0.08) pset(x, y, S.caliza[1]);
    for (let y = 117; y < 147; y += 3) linea(136, y, 141, y - 4, S.caliza[1]);
    // la escuadra y el compás sobre el banco
    rect(214, 144, 230, 146, hex('#a8acb4')); rect(228, 130, 230, 146, hex('#a8acb4')); rect(214, 144, 230, 144, hex('#e0e4ea')); rect(228, 130, 228, 146, hex('#e0e4ea'));
    linea(122, 146, 128, 128, hex('#c8a040')); linea(134, 146, 128, 128, hex('#c8a040')); linea(124, 140, 132, 140, hex('#8a6a20')); R.disco(128, 127, 1.5, hex('#e8c860'));
  });
  // por la ventana: el cielo con nubes que pasan y la otra torre lejana con su andamio
  R.recorte([34, 4, 78, 103]);
  for (let y = 4; y <= 103; y++) for (let x = 34; x <= 78; x++) if (x < 55 || x > 57) pset(x, y, y < 40 ? hex('#78a6e0') : y < 70 ? ((x + y) & 1 ? hex('#9cc2ea') : hex('#78a6e0')) : hex('#b4d0ee'));
  for (const [x0, y, w, v] of [[30, 30, 26, 2], [70, 60, 20, 3]]) c_nube(R, ((x0 + t * v) % 80) + 20, y, w, [hex('#ffffff'), hex('#e6eef8'), hex('#b4c4dc')]);
  for (let y = 56; y <= 103; y++) for (let x = 60; x <= 74; x++) pset(x, y, (y % 6 === 0 || (x + (Math.floor(y / 6) & 1) * 3) % 6 === 0) ? S.caliza[1] : S.caliza[0]);
  for (const px of [58, 76]) for (let y = 48; y <= 103; y++) pset(px, y, S.palo); for (let y = 60; y < 104; y += 14) for (let x = 58; x <= 76; x++) pset(x, y, S.palo);
  for (let x = 34; x <= 78; x++) for (let y = 96; y <= 103; y++) if (x < 55 || x > 57) pset(x, y, h(x >> 1, y, 490) < 0.5 ? hex('#8aa880') : hex('#7a9870'));
  R.recorte(null);
  // la marca del cantero que va saliendo en la cara del sillar (un trazo en flecha con barra, sin letra)
  { const P = [[160, 122, 160, 142], [160, 122, 152, 130], [160, 122, 168, 130], [152, 137, 168, 137], [168, 137, 176, 144], [176, 144, 182, 134]], n = P.length * talla;
    for (let i = 0; i < Math.floor(n); i++) { const [a, b, c2, d] = P[i]; linea(a + 1, b + 1, c2 + 1, d + 1, S.caliza[2]); linea(a, b, c2, d, S.caliza[3]); }
    const r = n % 1, i = Math.floor(n); if (i < P.length && r > 0) { const [a, b, c2, d] = P[i]; linea(a, b, a + (c2 - a) * r, b + (d - b) * r, S.caliza[3]); } }
  // las esquirlas que saltan a cada golpe y el polvo
  if (o.golpes !== false) { const u = (t % 1.2) / 1.2; if (u < 0.5) for (let k = 0; k < 6; k++) { const a = -2.6 + k * 0.35 + h(k, Math.floor(t / 1.2), 484) * 0.3, d = u * 26; pset(Math.round(150 + Math.cos(a) * d), Math.round(132 + Math.sin(a) * d + u * u * 30), k % 2 ? S.caliza[2] : S.caliza[0]); }
    c_luz(R, 160, 132, 12, 10, hex('#fff4d8'), 0.18 * (1 - u)); }
  // la polea con su sillar que sube y baja, un cantero pequeño por la plataforma y un pajarillo que salta
  { const u = (t % 9) / 9, y = Math.round(lerp(150, 50, u < 0.5 ? u * 2 : 2 - u * 2)); linea(266, 0, 266, y - 6, hex('#c8b890')); rect(260, y - 6, 272, y + 2, K); c_sillar(R, 261, y - 5, 271, y + 1, 12, 7, S.caliza, 14); }
  { const x = Math.round(180 + Math.sin(t * 0.4) * 30); c_gente(R, x, 40, t, { ropa: hex('#6a5a3a'), alto: 12, anda: true, dir: Math.cos(t * 0.4) > 0 ? 1 : -1, capacho: true }); }
  { const salta = Math.sin(t * 3) > 0.7 ? 1 : 0; rect(120, 82 - salta, 124, 85 - salta, hex('#6a4a3a')); pset(125, 83 - salta, hex('#e8a030')); pset(122, 82 - salta, C.k); }
  return { suelo: 166, pies: [92, 60, 250], banco: [118, 147, 232, 172], sillar: [135, 110, 215, 147], marca: [150, 122, 182, 144], escuadra: [214, 130, 230, 146], compas: [122, 127, 134, 146], ventana: [34, 4, 78, 103] };
}

// el salón de la logia (ver la cabecera de logia: o.encuadre 'salon', o.lugar 'paris' o 'alemania')
function c_SL(lugar) {
  return lugar === 'alemania'
    ? { pared: [hex('#4a2e1e'), hex('#341e12'), hex('#6a4430'), hex('#22140a')], moldura: hex('#8a6a3a'), molduraL: hex('#b8944a'), cortina: hex('#8a1e24'), cortinaS: hex('#5a1018'), cortinaL: hex('#b0343a'),
      fuera: [hex('#141a3e'), hex('#1e2650'), hex('#2a3460')], B: [hex('#c8bca4'), hex('#a89c84'), hex('#e0d4bc')], N: [hex('#1e1a24'), hex('#141018'), hex('#2e2836')], oscuro: 0.42, techo: hex('#2a1a10') }
    : { pared: [hex('#c4ccd0'), hex('#a0aab2'), hex('#dce2e4'), hex('#7a848e')], moldura: hex('#c8a040'), molduraL: hex('#f0d070'), cortina: hex('#2a4a8a'), cortinaS: hex('#1a2e5a'), cortinaL: hex('#4a6ab0'),
      fuera: [hex('#e8a070'), hex('#f0c090'), hex('#f8dcb0')], B: [hex('#ece4d0'), hex('#ccc2ac'), hex('#ffffff')], N: [hex('#2a2430'), hex('#1e1a24'), hex('#4a4250')], oscuro: 0, techo: hex('#b8b0a0') };
}

function c_salon(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, lugar = o.lugar ?? 'paris', P = c_SL(lugar), al = lugar === 'alemania';
  c_fondo(R, 'salon' + lugar, () => {
    // el techo con la cornisa (tranquilo bajo la barra del año)
    rect(0, 0, 319, 9, P.techo); for (let x = 0; x < 320; x += 4) pset(x, 8, c_mez(P.techo, K, 0.3)); rect(0, 10, 319, 13, P.moldura); rect(0, 10, 319, 10, P.molduraL); for (let x = 1; x < 320; x += 4) rect(x, 12, x + 1, 13, c_mez(P.moldura, K, 0.4));
    // la pared en paneles con molduras
    rect(0, 14, 319, 111, P.pared[0]);
    for (let y = 14; y < 112; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y >> 2, 490) < 0.12 && (x + y) & 1) pset(x, y, P.pared[1]);
    for (let c = 0; c < 9; c++) { const x0 = 2 + c * 36, x1 = x0 + 30; for (const [y0, y1] of [[20, 70], [78, 104]]) { rect(x0, y0, x1, y0, P.molduraL); rect(x0, y0, x0, y1, P.molduraL); rect(x1, y0, x1, y1, P.pared[3]); rect(x0, y1, x1, y1, P.pared[3]); rect(x0 + 2, y0 + 2, x1 - 2, y0 + 2, P.pared[1]); } }
    rect(0, 72, 319, 75, P.moldura); rect(0, 72, 319, 72, P.molduraL); rect(0, 105, 319, 111, P.pared[3]); rect(0, 105, 319, 105, P.molduraL);
    // los ventanales con cortinas (de tarde en París; de noche, con luna, en Alemania)
    for (const wx of [26, 236]) { rect(wx, 22, wx + 36, 100, K); rect(wx + 1, 23, wx + 35, 99, P.moldura);
      for (let y = 25; y < 98; y++) for (let x = wx + 3; x < wx + 34; x++) pset(x, y, P.fuera[Math.min(2, Math.floor((y - 25) / 26 + (((x + y) & 1) ? 0.3 : 0)))]);
      if (al) { R.disco(wx + 24, 36, 4, hex('#f0ecd8')); R.disco(wx + 26, 35, 3, P.fuera[0]); for (let k = 0; k < 6; k++) pset(wx + 5 + Math.floor(h(k, wx, 491) * 26), 28 + Math.floor(h(k, 1, 491) * 30), hex('#e8e8f8')); }
      else { for (let x = wx + 3; x < wx + 34; x++) { const hh = 82 + Math.floor(h(x >> 2, 1, 492) * 8); rect(x, hh, x, 97, hex('#8a7a8a')); } R.disco(wx + 10, 76, 5, hex('#fff0c0')); }
      rect(wx + 18, 23, wx + 19, 99, P.moldura); for (const y of [48, 74]) rect(wx + 2, y, wx + 34, y, P.moldura);
      for (const [cx, d] of [[wx - 2, 1], [wx + 38, -1]]) { for (let y = 18; y < 106; y++) { const ww = 6 + Math.round((y - 18) / 30); for (let i = 0; i < ww; i++) pset(cx + d * i - (d < 0 ? 0 : 0), y, (i + Math.floor(y / 3)) % 4 === 0 ? P.cortinaS : i === 1 ? P.cortinaL : P.cortina); } }
      rect(wx - 6, 16, wx + 42, 19, P.moldura); rect(wx - 6, 16, wx + 42, 16, P.molduraL); }
    // el estrado de tres peldaños, el dosel con su caída y el sitial del venerable
    rect(110, 18, 210, 22, P.moldura); rect(110, 18, 210, 18, P.molduraL);
    for (let y = 22; y < 98; y++) for (let x = 114; x < 207; x++) { const f = (x - 114) % 10; pset(x, y, f < 2 ? P.cortinaS : f > 7 ? P.cortinaL : P.cortina); }
    for (let x = 114; x < 207; x++) { const yb = 30 + Math.round(Math.abs(Math.sin((x - 114) / 93 * Math.PI * 2)) * 6); rect(x, 22, x, yb, P.cortinaL); pset(x, yb + 1, P.moldura); if (x % 4 === 0) rect(x, yb + 1, x, yb + 3, P.molduraL); }
    rect(142, 58, 178, 100, K); rect(143, 59, 177, 99, hex('#5a2e18')); rect(146, 62, 174, 90, hex('#8a1e24')); for (let y = 63; y < 90; y += 4) for (let x = 147; x < 174; x += 4) pset(x + ((y >> 2) & 1) * 2, y, hex('#b0343a'));
    rect(140, 56, 180, 58, P.moldura); R.disco(160, 55, 4, P.molduraL); rect(140, 90, 180, 94, hex('#6a3e22'));
    for (const [y0, x0, x1] of [[100, 108, 212], [106, 100, 220], [112, 92, 228]]) { rect(x0, y0, x1, y0 + 5, K); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 4, hex('#7a1a20')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#a83038')); rect(x0 + 1, y0 + 4, x1 - 1, y0 + 4, hex('#4a0e14')); for (let x = x0 + 2; x < x1; x += 3) pset(x, y0 + 3, hex('#5a1218')); }
    // el suelo ajedrezado en perspectiva
    c_ajedrez(R, 118, 179, 160, 40, P.B, P.N, 6);
    // la alfombra del cuadro de la logia en el suelo: escuadra, compás, columnas y una estrella pintadas
    poligono([[124, 132], [196, 132], [214, 160], [106, 160]], K); poligono([[125, 133], [195, 133], [212, 159], [108, 159]], hex('#e8dcb8'));
    poligono([[128, 135], [192, 135], [208, 157], [112, 157]], hex('#3a5a8a')); poligono([[131, 137], [189, 137], [204, 155], [116, 155]], hex('#f0e8d0'));
    c_escuadraCompas(R, 160, 147, 7, hex('#c8a040'), hex('#6a5020'));
    for (const cx of [128, 192]) { rect(cx - 2, 140, cx + 2, 153, hex('#8a7a6a')); rect(cx - 3, 139, cx + 3, 140, hex('#5a4a3a')); }
    // las dos columnas con sus globos
    for (const cx of [86, 234]) { rect(cx - 8, 28, cx + 8, 140, K); for (let y = 29; y < 140; y++) for (let x = cx - 7; x <= cx + 7; x++) { const u = (x - cx + 7) / 14; pset(x, y, u < 0.2 ? hex('#e8dcc0') : u > 0.75 ? hex('#7a6a50') : (x - cx) % 3 === 0 ? hex('#a8987a') : hex('#c8b898')); }
      rect(cx - 10, 26, cx + 10, 32, K); rect(cx - 9, 27, cx + 9, 31, P.moldura); rect(cx - 9, 27, cx + 9, 27, P.molduraL); for (let x = cx - 8; x < cx + 9; x += 3) pset(x, 30, c_mez(P.moldura, K, 0.4));
      rect(cx - 10, 134, cx + 10, 142, K); rect(cx - 9, 135, cx + 9, 141, hex('#a8987a')); rect(cx - 9, 135, cx + 9, 135, hex('#e8dcc0'));
      R.disco(cx, 21, 6, K); R.disco(cx, 21, 5, (x, y) => ((x * 3 + y * 5) % 7 < 2 ? hex('#4a8a5a') : hex('#3a6aa8'))); R.disco(cx - 2, 19, 2, hex('#a8c8e8')); R.anillo(cx, 21, 5, P.moldura); }
    // los bancos de los lados, de frente en escorzo
    for (const [x0, x1] of [[0, 54], [266, 319]]) { rect(x0, 126, x1, 128, K); rect(x0, 126, x1, 126, hex('#8a5a32')); rect(x0, 129, x1, 134, hex('#5a3a22')); for (const lx of [x0 + 4, x1 - 6]) rect(lx, 135, lx + 2, 146, hex('#3a2416')); rect(x0, 106, x1, 108, hex('#5a3a22')); }
    // el cuadro con la escuadra y el compás en la pared y dos retratos
    rect(4, 30, 22, 62, K); rect(5, 31, 21, 61, P.moldura); rect(7, 33, 19, 59, hex('#efe6cc')); c_escuadraCompas(R, 13, 46, 5, hex('#3a3a5a'), hex('#7a7a9a'));
    for (const px of [294]) { rect(px, 50, px + 20, 74, K); rect(px + 1, 51, px + 19, 73, P.moldura); rect(px + 3, 53, px + 17, 71, hex('#3a2a2a')); R.disco(px + 10, 59, 3, hex('#e8c0a0')); rect(px + 7, 63, px + 13, 71, hex('#2a2a4a')); rect(px + 6, 55, px + 14, 56, hex('#e8e4dc')); }
  });
  // ── lo que se mueve ──
  if (!al) { // la lámpara de araña con sus velas y cristales que destellan (la cadena, tenue bajo la barra del año)
    for (let y = 0; y < 18; y += 2) pset(160, y, c_mez(P.techo, K, 0.3)); rect(150, 18, 170, 22, P.moldura); linea(140, 26, 180, 26, P.moldura); linea(140, 26, 150, 21, P.moldura); linea(180, 26, 170, 21, P.moldura); R.disco(160, 28, 4, P.moldura);
    for (const [x, k] of [[140, 0], [150, 1], [160, 2], [170, 3], [180, 4]]) c_vela(R, x, 26, t, 4, k);
    for (let k = 0; k < 8; k++) { const x = 142 + k * 5, y = 30 + (k % 2) * 2; pset(x, y, Math.sin(t * 4 + k) > 0.6 ? C.blanco : hex('#c8d8e8')); } }
  // los candeleros altos a los lados del estrado, con sus velas
  for (const [cx, k] of [[60, 0], [260, 1]]) { rect(cx - 1, 84, cx + 1, 150, K); rect(cx, 84, cx, 150, P.molduraL); rect(cx - 5, 148, cx + 5, 152, K); rect(cx - 4, 148, cx + 4, 151, P.moldura); rect(cx - 8, 82, cx + 8, 84, P.moldura); for (const dx of [-6, 0, 6]) c_vela(R, cx + dx, 81, t, 6, k * 3 + dx); }
  for (const [x, k] of [[116, 5], [204, 6]]) c_vela(R, x, 98, t, 6, k);
  // la estrella flamígera del dosel, que brilla
  c_estrella(R, 160, 42, 8, t, P.molduraL, hex('#fff8d0'), P.moldura);
  // los hermanos pequeños sentados en los bancos, con mandil, que asienten
  for (let k = 0; k < 8; k++) { const x = k < 4 ? 6 + k * 13 : 272 + (k - 4) * 12, s = Math.sin(t * 1.3 + k * 1.9) > 0.8 ? 1 : 0, y = 126;
    rect(x - 3, y - 7, x + 3, y, [hex('#2a2a3a'), hex('#4a2a2a'), hex('#2a3a2a'), hex('#3a3a4a')][k % 4]); rect(x - 2, y - 3, x + 2, y, hex('#f0ece0')); rect(x - 2, y - 11 + s, x + 2, y - 8 + s, hex('#e8b890')); rect(x - 2, y - 12 + s, x + 2, y - 11 + s, hex('#e8e4dc')); pset(x - 3, y - 10 + s, hex('#e8e4dc')); pset(x + 3, y - 10 + s, hex('#e8e4dc')); }
  // la luz: en París entra la tarde por los ventanales; en Alemania, todo a la luz de las velas
  if (al) { for (let y = 14; y < 180; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) && y <= 112) c_tine(R, x, y, hex('#0a0610'), 0.18);
    for (const [cx, cy] of [[60, 76], [260, 76], [116, 92], [204, 92], [160, 40]]) c_luz(R, cx, cy, 34, 30, hex('#ffc070'), 0.26 + 0.04 * Math.sin(t * 9 + cx)); }
  else { for (const wx of [26, 236]) for (let y = 100; y < 170; y++) { const d = Math.round((y - 100) * (wx < 160 ? 0.5 : -0.5)); for (let x = wx + d; x < wx + 36 + d; x++) if (((x + y) & 1) === 0) c_tine(R, x, y, hex('#fff0d0'), 0.16); } }
  return { suelo: 162, estrado: 102, pies: [36, 70, 100, 130, 190, 220, 250], estradoX: [112, 208], sitial: [142, 58, 178, 100], columnas: [86, 234], alfombra: [106, 132, 214, 160], ventanas: [[26, 22, 62, 100], [236, 22, 272, 100]] };
}

// el atril del orador de cerca (o.camara 'atril'); el atril en sí lo pinta logiaDelante
function c_atril(R, t, o) {
  const { rect, pset, linea } = R, K = C.k, lugar = o.lugar ?? 'paris', P = c_SL(lugar), al = lugar === 'alemania';
  c_fondo(R, 'atril' + lugar, () => {
    // el dosel de cerca, con sus pliegues y flecos, que llena el fondo
    rect(0, 0, 319, 7, P.techo); rect(0, 8, 319, 12, P.moldura); rect(0, 8, 319, 8, P.molduraL);
    for (let y = 13; y < 150; y++) for (let x = 0; x < 320; x++) { const f = (x + Math.round(Math.sin(y * 0.05) * 2)) % 18; pset(x, y, f < 3 ? P.cortinaS : f > 13 ? P.cortinaL : (h(x >> 1, y >> 2, 495) < 0.1 ? P.cortinaS : P.cortina)); }
    for (let x = 0; x < 320; x++) { const yb = 24 + Math.round(Math.abs(Math.sin(x / 80 * Math.PI)) * 9); rect(x, 13, x, yb, P.cortinaL); rect(x, yb + 1, x, yb + 1, P.moldura); if (x % 3 === 0) rect(x, yb + 1, x, yb + 4, P.molduraL); }
    // la columna de la izquierda, entera, con su capitel y su globo
    for (const cx of [30]) { for (let y = 34; y < 152; y++) for (let x = cx - 14; x <= cx + 14; x++) { const u = (x - cx + 14) / 28; pset(x, y, x === cx - 14 || x === cx + 14 ? K : u < 0.2 ? hex('#e8dcc0') : u > 0.75 ? hex('#7a6a50') : (x - cx) % 4 === 0 ? hex('#a8987a') : hex('#c8b898')); }
      rect(cx - 17, 30, cx + 17, 38, K); rect(cx - 16, 31, cx + 16, 37, P.moldura); rect(cx - 16, 31, cx + 16, 31, P.molduraL); R.disco(cx, 20, 10, K); R.disco(cx, 20, 9, (x, y) => ((x * 3 + y * 5) % 7 < 2 ? hex('#4a8a5a') : hex('#3a6aa8'))); R.disco(cx - 3, 17, 3, hex('#a8c8e8')); R.anillo(cx, 20, 9, P.moldura); }
    // el suelo ajedrezado
    c_ajedrez(R, 150, 179, 160, 100, P.B, P.N, 9);
  });
  // la estrella del dosel grande, que brilla, y el candelabro de cinco velas a la derecha
  c_estrella(R, 160, 56, 13, t, P.molduraL, hex('#fff8d0'), P.moldura);
  { const cx = 262; rect(cx - 1, 70, cx + 1, 156, K); rect(cx, 70, cx, 156, P.molduraL); rect(cx - 9, 154, cx + 9, 158, K); rect(cx - 8, 154, cx + 8, 157, P.moldura); linea(cx - 16, 70, cx + 16, 70, P.moldura); linea(cx - 16, 70, cx - 16, 64, P.moldura); linea(cx + 16, 70, cx + 16, 64, P.moldura); linea(cx - 8, 70, cx - 8, 62, P.moldura); linea(cx + 8, 70, cx + 8, 62, P.moldura);
    for (const [dx, y, k] of [[-16, 64, 0], [-8, 62, 1], [0, 60, 2], [8, 62, 3], [16, 64, 4]]) c_vela(R, cx + dx, y, t, 6, k); }
  if (al) { for (let y = 13; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, hex('#0a0610'), 0.2); c_luz(R, 262, 60, 50, 46, hex('#ffc070'), 0.3 + 0.04 * Math.sin(t * 9)); }
  else c_luz(R, 160, 56, 60, 40, hex('#fff0c0'), 0.12);
  return { suelo: 156, pies: [150], atril: [124, 142, 200, 179], libro: [134, 142, 190, 153], columna: [16, 34, 44, 152], candelabro: [262, 60] };
}

// el atril, por delante del orador: columna tallada con la escuadra y el compás, tablero inclinado, el libro y su vela
function c_atrilDelante(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, P = c_SL(o.lugar ?? 'paris'), pag = o.paginas ?? 0;
  rect(146, 156, 178, 174, K); for (let y = 157; y < 174; y++) for (let x = 147; x < 178; x++) { const u = (x - 147) / 31; pset(x, y, u < 0.15 ? hex('#8a5a32') : u > 0.8 ? hex('#3a2416') : (x % 5 === 0 ? hex('#4a2e1c') : hex('#5e3c22'))); }
  rect(136, 173, 188, 179, K); rect(137, 174, 187, 178, hex('#5e3c22')); rect(137, 174, 187, 174, hex('#8a5a32'));
  R.disco(162, 165, 6, K); R.disco(162, 165, 5, hex('#4a2e1c')); c_escuadraCompas(R, 162, 165, 4, P.molduraL, P.moldura);
  poligono([[124, 157], [200, 157], [194, 146], [130, 146]], K); poligono([[125, 156], [199, 156], [193, 147], [131, 147]], hex('#6e4630')); linea(125, 156, 199, 156, hex('#8a5a32')); linea(131, 147, 193, 147, hex('#8a5a32'));
  for (let x = 128; x < 198; x += 6) pset(x, 152, hex('#5a3a22'));
  // el libro abierto: dos hojas con renglones de trazos; o.paginas pasa una hoja
  poligono([[136, 152], [161, 152], [161, 143], [139, 143]], hex('#f0e8d0')); poligono([[163, 152], [188, 152], [185, 143], [163, 143]], hex('#e8dcc0')); rect(161, 142, 163, 153, hex('#8a6a4a')); rect(134, 152, 190, 153, hex('#6a2420'));
  for (let r = 0; r < 4; r++) { linea(142 - r * 0.5, 145 + r * 2, 158, 145 + r * 2, hex('#6a5a4a'), 3); linea(166, 145 + r * 2, 182 + r * 0.5, 145 + r * 2, hex('#6a5a4a'), 3); }
  const u = (pag * 3) % 1; if (pag > 0 && u > 0.05 && u < 0.95) { const xe = Math.round(lerp(186, 140, u)), ye = 143 - Math.round(Math.sin(u * Math.PI) * 8); poligono([[163, 152], [xe, ye + 9], [xe, ye], [163, 143]], hex('#f8f0dc')); linea(163, 143, xe, ye, hex('#c8bca0')); }
  rect(190, 150, 196, 152, C.oroS); c_vela(R, 193, 150, t, 7, 9);
}

// la calle mayor de fiesta con el desfile (ver la cabecera de logia: o.encuadre 'desfile')
function c_desfile(R, t, o, cerca) {
  const { rect, pset, linea, poligono } = R, K = C.k;
  if (!cerca) {
    c_cielo(R, t, 80, [hex('#4a86d8'), hex('#6aa2e4'), hex('#90bcec'), hex('#bcd6f2')], [hex('#ffffff'), hex('#e6eef8'), hex('#b0c2dc')], { nubes: [[30, 18, 40, 1.0], [140, 26, 34, 1.5], [230, 50, 28, 2.0], [90, 50, 22, 2.6]] });
    c_pajaros(R, t, 34, 3);
    c_pegar(R, c_capa(R, 'desfile', () => {
      // las fachadas: ladrillo, piedra clara y madera pintada, con cornisas, ventanas con persianas y reflejos
      const F = [[0, 46, 28, hex('#a84a3a')], [46, 104, 40, hex('#d8c8a4')], [104, 150, 22, hex('#8a3a32')], [150, 206, 36, hex('#5a7a6a')], [206, 254, 26, hex('#b8603e')], [254, 320, 52, hex('#c8b490')]];
      for (const [x0, x1, top, c] of F) { const cS = c_mez(c, K, 0.25), cL = c_mez(c, C.blanco, 0.25), ladrillo = h(x0, 1, 500) < 0.6;
        for (let y = top; y < 124; y++) for (let x = x0; x < x1; x++) pset(x, y, ladrillo && ((y % 4 === 0) || ((x + (Math.floor(y / 4) & 1) * 4) % 8 === 0)) ? cS : h(x, y, 501) < 0.05 ? cL : c);
        rect(x0, top - 4, x1 - 1, top, K); rect(x0, top - 3, x1 - 1, top - 1, cL); for (let x = x0 + 1; x < x1; x += 3) pset(x, top, cS); rect(x0, top + 1, x1 - 1, top + 1, cS);
        for (let fy = top + 6; fy < 92; fy += 20) for (let wx = x0 + 5; wx + 9 < x1; wx += 14) { rect(wx - 1, fy - 1, wx + 9, fy + 13, cS); rect(wx, fy, wx + 8, fy + 12, hex('#2a3a5a')); rect(wx, fy, wx + 8, fy + 4 + Math.floor(h(wx, fy, 502) * 4), hex('#e8e0c8'));
          linea(wx + 1, fy + 11, wx + 6, fy + 6, hex('#8ab0d0')); rect(wx - 2, fy + 13, wx + 10, fy + 14, cL); if (h(wx, fy, 503) < 0.4) { rect(wx + 1, fy + 10, wx + 7, fy + 12, hex('#8a4a2a')); pset(wx + 2, fy + 9, hex('#e84a6a')); pset(wx + 5, fy + 9, hex('#f0d040')); } }
        // planta baja: escaparate con toldo a rayas y la puerta
        rect(x0 + 2, 98, x1 - 3, 123, K); rect(x0 + 3, 100, x1 - 4, 123, hex('#2a3a4a')); for (let x = x0 + 4; x < x1 - 4; x += 6) { rect(x, 112, x + 3, 122, [hex('#e8c060'), hex('#c84a4a'), hex('#4a8ac8'), hex('#e8e0d0')][Math.floor(h(x, 2, 504) * 4)]); rect(x, 112, x + 3, 112, C.blanco); }
        linea(x0 + 4, 120, x0 + 14, 102, hex('#8ab0d0')); rect(x1 - 14, 104, x1 - 6, 123, hex('#5a3a22')); pset(x1 - 8, 114, C.oro);
        rect(x0 + 2, 90, x1 - 3, 97, K); for (let x = x0 + 3; x < x1 - 3; x++) { const r = Math.floor((x - x0) / 4) & 1; rect(x, 91, x, 96, r ? C.blanco : [hex('#c83a3a'), hex('#2a6a4a'), hex('#2a4a8a')][Math.floor(x0 / 50) % 3]); pset(x, 97 + ((x & 1) ? 0 : 1), r ? C.blanco : hex('#a82a2a')); }
        rect(x0 + 6, 82, x1 - 7, 87, hex('#2a2430')); for (let x = x0 + 9; x < x1 - 9; x += 4) rect(x, 84, x + 2, 85, hex('#e8d8a0')); }
      // la acera, el bordillo y el asfalto con su textura y la doble línea amarilla
      for (let y = 124; y < 138; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 20 === 0 || y === 131) ? hex('#a8a49a') : h(x >> 1, y, 505) < 0.15 ? hex('#c0bcb2') : hex('#cfcbc0'));
      rect(0, 138, 319, 140, hex('#8a867e')); rect(0, 138, 319, 138, hex('#e0dcd2'));
      for (let y = 141; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 506); pset(x, y, v < 0.15 ? hex('#3a3a42') : v > 0.9 ? hex('#5a5a62') : hex('#46464e')); }
      for (let x = 0; x < 320; x++) { if ((x >> 3) % 2 === 0) { pset(x, 176, hex('#e8c040')); } pset(x, 158, hex('#d8b030')); pset(x, 160, hex('#d8b030')); }
      for (const [x, y] of [[40, 166], [200, 150], [280, 172]]) { rect(x, y, x + 8, y + 2, hex('#2a2a32')); pset(x + 1, y, hex('#5a5a62')); }
      // farolas y bocas de riego
      for (const lx of [24, 132, 230]) { rect(lx, 70, lx + 1, 136, hex('#2a3a2a')); rect(lx - 3, 64, lx + 4, 70, K); rect(lx - 2, 65, lx + 3, 69, hex('#f0e8b0')); rect(lx - 4, 63, lx + 5, 63, hex('#2a3a2a')); rect(lx - 2, 134, lx + 3, 137, hex('#2a3a2a')); }
      rect(186, 128, 190, 137, hex('#c83a3a')); rect(185, 127, 191, 128, hex('#e85a5a')); rect(184, 131, 192, 132, hex('#a82a2a'));
    }));
    // las guirnaldas de banderines que ondean entre las fachadas
    for (const [y0, k] of [[34, 0], [52, 1]]) for (let x = 0; x < 320; x++) { const y = Math.round(y0 + Math.sin(x / 320 * Math.PI) * 10 + Math.sin(t * 2 + x * 0.05) * 0.6); pset(x, y, hex('#3a3a3a'));
      if (x % 10 === 0) { const c = [hex('#c83a3a'), C.blanco, hex('#3a6ac8'), hex('#e8c040')][(x / 10 + k) % 4], f = Math.round(Math.sin(t * 4 + x) * 1); poligono([[x, y + 1], [x + 7, y + 1], [x + 3 + f, y + 7]], c); } }
    // el público de la acera: saluda, con niños y globos
    for (let k = 0; k < 24; k++) { const x = 6 + k * 13 + Math.floor(h(k, 1, 507) * 5), alto = h(k, 2, 507) < 0.25 ? 9 : 12;
      c_gente(R, x, 134, t, { alto, ropa: [hex('#c84a4a'), hex('#3a6ac8'), hex('#e8c040'), hex('#4a8a5a'), hex('#8a4ab0'), hex('#e8e0d0')][k % 6], piel: [hex('#e8b890'), hex('#a8704a'), hex('#d8a07a'), hex('#6a4430')][k % 4], pelo: [hex('#3a2418'), hex('#e8c060'), K, hex('#8a4a2a')][(k * 3) % 4], saluda: h(k, 3, 507) < 0.6 });
      if (k % 7 === 2) { const by = 108 + Math.round(Math.sin(t * 1.5 + k) * 2); linea(x + 4, 124, x + 5, by + 4, hex('#e8e8e8')); R.disco(x + 5, by, 3, [hex('#e84a6a'), hex('#4ab0e8'), hex('#f0d040')][k % 3]); pset(x + 4, by - 1, C.blanco); } }
    // la banda lejana que desfila (mantos y sombreros de pluma), por el fondo de la calzada
    for (let k = 0; k < 9; k++) { const x = ((k * 16 + t * 9) % 360) - 20, tambor = k % 3 === 1; c_gente(R, x, 150, t, { alto: 11, anda: true, ropa: hex('#2a2a3a'), manto: k % 2 ? hex('#f0ece0') : hex('#2a2a4a'), sombrero: hex('#1a1a24'), pluma: k % 2 ? C.blanco : hex('#c83a3a') });
      if (tambor) { R.disco(x + 4, 144, 2, hex('#e8e0d0')); pset(x + 4, 142, hex('#c83a3a')); } }
    // el confeti que cae
    for (let k = 0; k < 40; k++) { const x = Math.round(((k * 37 + Math.sin(t * 2 + k) * 6) % 330 + 330) % 330 - 5), y = Math.round((k * 23 + t * (14 + (k % 4) * 3)) % 190) - 5; pset(x, y, [hex('#e84a6a'), hex('#f0d040'), hex('#4ab0e8'), C.blanco, hex('#6ad06a')][k % 5]); if (Math.sin(t * 8 + k) > 0) pset(x + 1, y, [hex('#a83a4a'), hex('#c8a830'), hex('#3a88c0'), hex('#c8c8c8'), hex('#4aa04a')][k % 5]); }
    return { suelo: 170, acera: 134, pies: [40, 80, 120, 160, 200, 240], fachadas: [0, 20, 320, 124], horizonte: 124, banda: 150 };
  }
  // el bordillo de cerca: el escaparate y su toldo, el público más grande tras la cuerda roja, el confeti
  c_fondo(R, 'desfileCerca', () => {
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) pset(x, y, (y % 6 === 0 || ((x + (Math.floor(y / 6) & 1) * 6) % 12 === 0)) ? hex('#7a3a2a') : h(x, y, 510) < 0.06 ? hex('#c8705a') : hex('#a84a3a'));
    for (const [wx, ww] of [[14, 60], [188, 78]]) { rect(wx - 3, 18, wx + ww + 3, 70, hex('#e8e0d0')); rect(wx, 21, wx + ww, 67, hex('#2a3a5a')); for (let y = 21; y < 67; y++) for (let x = wx; x <= wx + ww; x++) if ((x - y * 0.6 + 400) % 30 < 6) pset(x, y, hex('#4a6a8a'));
      rect(wx + ww / 2 - 1, 21, wx + ww / 2, 67, hex('#e8e0d0')); rect(wx, 21, wx + ww, 32, hex('#e8e0d0')); for (let x = wx + 2; x < wx + ww; x += 4) rect(x, 24, x + 1, 31, hex('#c8c0b0'));
      rect(wx, 54, wx + ww, 56, hex('#8a6a4a')); for (let k = 0; wx + 4 + k * 9 < wx + ww - 6; k++) { const gx = wx + 4 + k * 9, c = [hex('#c84a4a'), hex('#e8c060'), hex('#4a8ac8'), hex('#6aa84a'), hex('#8a4ab0')][k % 5];
        if (k % 3 === 0) { rect(gx, 48, gx + 6, 53, c); rect(gx - 1, 53, gx + 7, 53, c_mez(c, K, 0.3)); } else if (k % 3 === 1) { rect(gx + 1, 44, gx + 5, 53, c); rect(gx + 2, 42, gx + 4, 43, c); pset(gx + 2, 46, C.blanco); } else { rect(gx, 47, gx + 6, 53, c); rect(gx, 47, gx + 6, 47, c_mez(c, C.blanco, 0.4)); } }
      for (let k = 0; k < 4; k++) { const gx = wx + 6 + k * (ww / 4); R.disco(gx, 62, 3, [hex('#e8e0d0'), hex('#c8a040'), hex('#a8603a'), hex('#4a6a8a')][k]); } }
    rect(90, 10, 170, 112, K); rect(92, 12, 168, 112, hex('#2a3a4a')); for (let k = 0; k < 7; k++) { const x = 98 + k * 10; rect(x, 78, x + 7, 108, [hex('#e8c060'), hex('#c84a4a'), hex('#4a8ac8'), hex('#e8e0d0')][k % 4]); rect(x, 78, x + 7, 79, C.blanco); rect(x + 1, 84, x + 6, 86, hex('#2a2430')); }
    linea(96, 70, 120, 20, hex('#6a8aaa')); linea(100, 70, 124, 20, hex('#5a7a9a'));
    rect(0, 76, 319, 86, K); for (let x = 0; x < 320; x++) { const r = Math.floor(x / 8) & 1; rect(x, 77, x, 85, r ? C.blanco : hex('#2a6a4a')); pset(x, 86 + ((x & 2) ? 1 : 0), r ? C.blanco : hex('#1a4a34')); }
    for (let y = 112; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y === 130) ? hex('#a8a49a') : h(x >> 1, y, 511) < 0.15 ? hex('#c0bcb2') : hex('#cfcbc0'));
    rect(0, 150, 319, 154, hex('#8a867e')); rect(0, 150, 319, 150, hex('#e8e4da'));
    for (let y = 155; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 512); pset(x, y, v < 0.15 ? hex('#3a3a42') : v > 0.9 ? hex('#5a5a62') : hex('#46464e')); }
    for (const px of [20, 120, 220, 316]) { rect(px - 1, 128, px + 2, 148, hex('#c8a040')); rect(px - 2, 126, px + 3, 128, hex('#f0d070')); rect(px - 3, 147, px + 4, 149, hex('#8a6a20')); }
  });
  // el público tras la cuerda: aplaude y saluda; banderines de mano sin escudos
  for (let k = 0; k < 15; k++) { const x = 10 + k * 21 + Math.floor(h(k, 1, 513) * 6), alto = h(k, 2, 513) < 0.2 ? 13 : 17;
    c_gente(R, x, 128, t, { alto, ropa: [hex('#c84a4a'), hex('#3a6ac8'), hex('#e8c060'), hex('#4a8a5a'), hex('#8a4ab0'), hex('#e8e0d0')][k % 6], piel: [hex('#e8b890'), hex('#a8704a'), hex('#d8a07a'), hex('#6a4430')][k % 4], pelo: [hex('#3a2418'), hex('#e8c060'), K, hex('#8a4a2a')][(k * 3) % 4], saluda: k % 3 !== 1 });
    if (k % 4 === 1) { const f = Math.round(Math.sin(t * 6 + k) * 1); linea(x + 5, 112, x + 5, 100, hex('#8a6a4a')); poligono([[x + 6, 100], [x + 14, 102 + f], [x + 6, 105]], [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040')][k % 3]); } }
  for (let x = 0; x < 320; x++) { const y = 130 + Math.round(Math.abs(Math.sin((x % 100) / 100 * Math.PI)) * 4); pset(x, y, hex('#c82a2a')); pset(x, y + 1, hex('#8a1a1a')); }
  for (let k = 0; k < 46; k++) { const x = Math.round(((k * 37 + Math.sin(t * 2 + k) * 6) % 330 + 330) % 330 - 5), y = Math.round((k * 23 + t * (16 + (k % 4) * 3)) % 190) - 5; pset(x, y, [hex('#e84a6a'), hex('#f0d040'), hex('#4ab0e8'), C.blanco, hex('#6ad06a')][k % 5]); if (Math.sin(t * 8 + k) > 0) pset(x, y + 1, [hex('#a83a4a'), hex('#c8a830'), hex('#3a88c0'), hex('#c8c8c8'), hex('#4aa04a')][k % 5]); }
  return { suelo: 172, acera: 146, pies: [30, 80, 130, 180, 230, 280], cuerda: 130, toldo: [0, 76, 319, 88] };
}

// Lo que va por delante de los personajes en el Grial (se llama después de pintarlos), con las mismas opciones que
// grial(): el frente del pupitre del poeta con su libro y su vela (scriptorium general) y el frente del altar de la capilla
// de Valencia con su frontal bordado y los candeleros (valencia general). En los demás, nada.
export function grialDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'scriptorium', cam = o.camara ?? 'general';
  if (enc === 'scriptorium' && cam === 'general') { c_pegar(R, c_capa(R, 'pupitre', () => { c_pintaPupitre(R); const b = R.buf; b.copyWithin(10 * 320, 0, 170 * 320); b.fill(0, 0, 10 * 320); }), 134, 179); c_vela(R, 194, 143, t, 7, 4); c_luz(R, 194, 132, 36, 26, hex('#ffd890'), 0.16); }
  else if (enc === 'valencia' && cam === 'general') { c_pegar(R, c_capa(R, 'altarVLC', () => c_pintaAltarVLC(R)), 140, 179); for (const [x, k] of [[118, 0], [202, 1]]) c_vela(R, x, 142, t, 8, k); }
}

// el scriptorium (ver la cabecera de grial)
const c_SC = { piedra: [hex('#7a6e62'), hex('#564c42'), hex('#9a8e80'), hex('#3a322a')], losa: [hex('#8a7e6e'), hex('#6a5e50'), hex('#a89c8a'), hex('#4a4036')] };

function c_scriptorium(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, S = c_SC, dia = o.luz === 'dia';
  c_fondo(R, 'scriptorium', () => {
    // la bóveda de cañón con sus nervios y los muros de sillería
    c_sillar(R, 0, 0, 319, 150, 16, 8, S.piedra, 21);
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.35 - y * 0.01);
    for (const ax of [0, 160, 320]) { for (let k = 0; k < 3; k++) for (let a = 0; a <= Math.PI; a += 0.01) { const x = Math.round(ax + Math.cos(a) * (80 - k)), y = Math.round(34 - Math.sin(a) * 30 + k); pset(x, y, k === 0 ? S.piedra[2] : k === 1 ? S.piedra[0] : S.piedra[3]); } }
    for (const px of [80, 240]) { rect(px - 5, 30, px + 5, 150, S.piedra[3]); rect(px - 4, 30, px + 4, 150, S.piedra[0]); rect(px - 4, 30, px - 3, 150, S.piedra[2]); rect(px + 3, 30, px + 4, 150, S.piedra[1]); rect(px - 7, 28, px + 7, 32, S.piedra[2]); rect(px - 7, 32, px + 7, 33, S.piedra[3]); }
    // la galería del fondo: un arco abierto a un pasillo en penumbra (por ahí pasa el monje)
    rect(96, 64, 140, 128, S.piedra[3]); poligono([[96, 64], [118, 44], [140, 64]], S.piedra[3]); rect(99, 64, 137, 128, hex('#2a221c')); poligono([[99, 64], [118, 47], [137, 64]], hex('#2a221c'));
    for (let y = 48; y < 128; y++) for (let x = 99; x < 138; x++) if (R.pget(x, y) === hex('#2a221c') && h(x >> 2, y >> 2, 520) < 0.3) pset(x, y, hex('#342a22'));
    // la ventana ojival con su derrame y el alféizar (lo de fuera se pinta en cada fotograma)
    rect(16, 30, 66, 108, S.piedra[3]); poligono([[16, 30], [41, 8], [66, 30]], S.piedra[3]); rect(14, 106, 68, 112, K); rect(15, 106, 67, 109, S.piedra[2]); rect(15, 110, 67, 111, S.piedra[1]);
    // los estantes con libros de lomos de colores, rollos y una calavera no: un tarro, una vela de repuesto
    rect(250, 52, 314, 132, K); rect(251, 53, 313, 131, hex('#4a2e1c')); for (const sy of [72, 94, 116]) { rect(251, sy, 313, sy + 2, hex('#6e4630')); rect(251, sy, 313, sy, hex('#8a5a3a')); }
    for (const [y0, y1, k0] of [[56, 71, 0], [78, 93, 1], [100, 115, 2]]) { let x = 253; while (x < 310) { const w = 3 + Math.floor(h(x, k0, 521) * 3), alto = (y1 - y0) - Math.floor(h(x, k0, 522) * 5), c = [hex('#8a2a2a'), hex('#2a4a6a'), hex('#5a6a2a'), hex('#7a5a2a'), hex('#4a2a4a')][Math.floor(h(x, k0, 523) * 5)];
      if (h(x, k0, 524) < 0.15) { R.disco(x + 3, y1 - 3, 3, hex('#e8d8a8')); R.anillo(x + 3, y1 - 3, 3, hex('#a8906a')); x += 8; continue; }
      rect(x, y1 - alto, x + w - 1, y1, c); rect(x, y1 - alto, x, y1, c_mez(c, C.blanco, 0.3)); rect(x, y1 - alto + 2, x + w - 1, y1 - alto + 2, hex('#c8a040')); rect(x, y1 - 3, x + w - 1, y1 - 3, hex('#c8a040')); x += w + 1; } }
    rect(256, 120, 266, 131, hex('#6a5a4a')); rect(257, 118, 265, 120, hex('#8a7a6a')); rect(290, 122, 300, 131, hex('#e8d8a8')); rect(290, 122, 300, 123, hex('#c8b890'));
    // el arcón de madera con herrajes (el gato duerme encima) y un atril vacío al fondo
    rect(14, 128, 64, 152, K); c_tablas(R, 15, 129, 63, 151, [hex('#6e4630'), hex('#4a2e1c'), hex('#8a5a3a'), hex('#3a2416')], 22, 6); for (const x of [20, 56]) rect(x, 129, x + 2, 151, hex('#3a3a40')); rect(37, 136, 41, 141, hex('#c8a040'));
    rect(150, 96, 172, 100, hex('#4a2e1c')); rect(159, 100, 162, 136, hex('#3a2416')); rect(152, 134, 170, 136, hex('#3a2416')); rect(151, 92, 171, 96, hex('#e8dcc0'));
    // el suelo de losas con esteras de junco
    for (let y = 150; y < 180; y++) { const fila = Math.floor((y - 150) / 7.5); for (let x = 0; x < 320; x++) { const w = 26 + fila * 4, bx = Math.floor((x + fila * 11) / w), jx = (x + fila * 11) % w === 0, jy = (y - 150) % 8 === 0;
      pset(x, y, jx || jy ? S.losa[3] : h(bx, fila, 525) < 0.3 ? S.losa[1] : h(x >> 1, y >> 1, 526) < 0.1 ? S.losa[2] : S.losa[0]); } }
    poligono([[96, 160], [230, 160], [244, 176], [84, 176]], hex('#a8904a')); for (let y = 160; y < 177; y++) for (let x = 84; x < 245; x++) if (R.pget(x, y) === hex('#a8904a') && (x + (y & 1)) % 3 === 0) pset(x, y, hex('#8a7438'));
    rect(0, 150, 319, 150, S.piedra[3]);
  });
  // ── lo que se mueve ──
  // por la ventana: lluvia de noche con algún relámpago, o el día con nubes
  R.recorte([19, 12, 63, 105]);
  const rayo = !dia && (t % 7.3) < 0.12;
  for (let y = 12; y <= 105; y++) for (let x = 19; x <= 63; x++) { const ok = y >= 30 || Math.abs(x - 41) < (y - 10) * 1.1; if (!ok) continue;
    pset(x, y, dia ? (y < 60 ? hex('#78a6e0') : (x + y) & 1 ? hex('#9cc2ea') : hex('#78a6e0')) : rayo ? hex('#c8d0e8') : y < 60 ? hex('#2a3048') : (x + y) & 1 ? hex('#3a4058') : hex('#2a3048')); }
  if (dia) { c_nube(R, ((t * 2) % 70) + 10, 40, 22, [hex('#ffffff'), hex('#e6eef8'), hex('#b4c4dc')]); for (let x = 19; x <= 63; x++) for (let y = 88; y <= 105; y++) pset(x, y, h(x >> 1, y >> 1, 527) < 0.5 ? hex('#6a8a5a') : hex('#5a7a4a')); }
  else { for (let x = 19; x <= 63; x++) for (let y = 90; y <= 105; y++) pset(x, y, hex('#1a2030')); for (let k = 0; k < 30; k++) { const x = 19 + (k * 13) % 45, y = 12 + ((k * 29 + t * 90) % 94); linea(x, y, x - 1, y + 3, hex('#8a9ab8')); } }
  R.recorte(null);
  rect(40, 14, 42, 106, S.piedra[2]); rect(19, 58, 63, 59, S.piedra[2]);
  // el monje pequeño que cruza la galería del fondo con su vela
  { const u = (t % 11) / 11, x = Math.round(lerp(92, 146, u)); R.recorte([99, 48, 137, 128]); c_gente(R, x, 126, t, { alto: 13, anda: true, ropa: hex('#4a3a2a'), pelo: hex('#4a3a2a'), dir: 1 }); c_luz(R, x + 4, 112, 12, 10, hex('#ffd890'), 0.25); pset(x + 4, 110, hex('#ffd860')); pset(x + 4, 111, hex('#ffb030')); R.recorte(null); }
  // el gato dormido sobre el arcón: respira y mueve la cola
  { const x = 40, y = 128, r = Math.sin(t * 2) > 0 ? 1 : 0; rect(x - 8, y - 5 - r, x + 6, y, K); rect(x - 7, y - 4 - r, x + 5, y - 1, hex('#5a5a62')); rect(x - 7, y - 4 - r, x + 5, y - 4 - r, hex('#7a7a84')); for (let i = 0; i < 4; i++) pset(x - 5 + i * 3, y - 3 - r, hex('#3a3a42'));
    rect(x + 4, y - 7, x + 10, y, K); rect(x + 5, y - 6, x + 9, y - 1, hex('#5a5a62')); pset(x + 5, y - 8, K); pset(x + 9, y - 8, K); linea(x + 6, y - 4, x + 8, y - 4, K);
    const c = Math.round(Math.sin(t * 1.7) * 3); linea(x - 8, y - 1, x - 13, y + 2 + c, hex('#5a5a62')); pset(x - 13, y + 3 + c, K); }
  // el haz de la ventana: luz de día con motas, o el reflejo azul del relámpago
  if (dia) { for (let y = 60; y < 170; y++) { const d = Math.round((y - 60) * 0.9); for (let x = 26 + d; x < 58 + d; x++) if (((x + y) & 1) === 0) c_tine(R, x, y, hex('#fff4d0'), 0.18); }
    for (let k = 0; k < 14; k++) { const u = (t * 0.05 + k / 14) % 1, y = Math.round(70 + u * 90), x = Math.round(30 + (y - 60) * 0.9 + h(k, 1, 528) * 28 + Math.sin(t + k) * 2); pset(x, y, hex('#fff8e0')); } }
  else if (rayo) for (let y = 30; y < 170; y++) for (let x = 0; x < 160; x++) if ((x + y) & 1) c_tine(R, x, y, hex('#c8d8ff'), 0.2);
  // el bocadillo de imaginación del poeta
  if ((o.vision ?? 0) > 0) c_vision(R, t, o.vision);
  return { suelo: 168, detras: 147, pies: [150, 90, 214, 250], pupitre: [118, 136, 202, 179], cabezaPoeta: [157, 133], ventana: [19, 12, 63, 105], gato: [40, 124], arcon: [14, 128, 64, 152], galeria: [99, 48, 137, 128], vision: [16, 18, 156, 92] };
}

// el bocadillo: tres burbujas que suben desde el poeta y la nube grande con la escena del Grial dentro
function c_vision(R, t, v) {
  const { pset } = R, K = C.k, u = Math.min(1, v * 1.4), cx = 86, cy = 56, rx = 66 * u, ry = 34 * u;
  for (const [x, y, r, k] of [[156, 116, 2, 0.1], [146, 104, 3, 0.25], [132, 92, 4, 0.4]]) if (v > k) { R.disco(x, y, r + 1, K); R.disco(x, y, r, hex('#f4f0e4')); }
  if (u < 0.45) return;
  const dentro = (x, y, m = 0) => ((x - cx) / (rx - m)) ** 2 + ((y - cy) / (ry - m)) ** 2 < 1 + Math.sin(Math.atan2(y - cy, x - cx) * 7) * 0.06;
  for (let y = Math.floor(cy - ry - 3); y <= cy + ry + 3; y++) for (let x = Math.floor(cx - rx - 4); x <= cx + rx + 4; x++) { if (!dentro(x, y, -2)) continue; pset(x, y, dentro(x, y, 0) ? (dentro(x, y, 3) ? hex('#2a2438') : hex('#f4f0e4')) : K); }
  // dentro: la sala con antorchas, el suelo, el joven caballero a caballo a la izquierda y la doncella que pasa con el grial
  const din = (x, y) => dentro(x, y, 3);
  for (let y = cy + 12; y < cy + ry; y++) for (let x = cx - rx; x < cx + rx; x++) if (din(x, y)) pset(x, y, (x + y) % 6 === 0 ? hex('#4a3a3a') : hex('#3a2e30'));
  for (const ax of [cx - 30, cx, cx + 30]) for (let y = cy - 20; y < cy + 12; y++) for (let x = ax - 10; x <= ax + 10; x++) if (din(x, y) && (Math.abs(x - ax) === 10 || (y === cy - 20 + Math.round(Math.abs(x - ax) * 0.5) - 5))) pset(x, y, hex('#5a4a58'));
  for (const tx of [cx - 46, cx + 46]) { if (din(tx, cy - 6)) { pset(tx, cy - 4, hex('#8a6a4a')); pset(tx, cy - 5, hex('#8a6a4a')); pset(tx, cy - 6, hex('#ffb030')); pset(tx, cy - 7 - (Math.sin(t * 12 + tx) > 0 ? 1 : 0), hex('#ffe080')); } }
  const hx = cx - 40, hy = cy + 18;
  if (din(hx, hy)) { R.rect(hx - 6, hy - 6, hx + 6, hy - 2, hex('#e8e0d0')); R.rect(hx + 5, hy - 9, hx + 8, hy - 5, hex('#e8e0d0')); for (const lx of [hx - 5, hx - 1, hx + 2, hx + 5]) R.rect(lx, hy - 1, lx, hy + 2, hex('#e8e0d0')); pset(hx - 7, hy - 5, hex('#c8c0b0'));
    R.rect(hx - 2, hy - 12, hx + 1, hy - 6, hex('#3a6ac8')); R.rect(hx - 2, hy - 15, hx + 1, hy - 13, hex('#e8b890')); R.rect(hx - 2, hy - 16, hx + 1, hy - 16, hex('#e8c060')); pset(hx + 2, hy - 10, hex('#e8b890')); }
  const w = (t * 0.12) % 1, gx = Math.round(cx - 20 + w * 60), gy = cy + 16;
  if (din(gx, gy)) { R.rect(gx - 2, gy - 10, gx + 2, gy, hex('#f0ece0')); R.rect(gx - 1, gy - 13, gx + 1, gy - 11, hex('#e8b890')); R.rect(gx - 2, gy - 14, gx + 2, gy - 13, hex('#8a4a2a'));
    for (let y = gy - 30; y < gy; y++) for (let x = gx - 18; x <= gx + 18; x++) { const d = Math.hypot(x - gx, (y - (gy - 16)) * 1.2); if (din(x, y) && d < 14 && ((x + y) & 1) && d < 8 + 4 * Math.sin(t * 5)) c_tine(R, x, y, hex('#fff0a0'), 0.4); }
    R.rect(gx - 2, gy - 18, gx + 2, gy - 15, hex('#f8d840')); pset(gx, gy - 14, hex('#c8a030')); pset(gx - 1, gy - 18, hex('#ffffff'));
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + t * 2, r0 = 5, r1 = 8 + (k % 2) * 2; const x = Math.round(gx + Math.cos(a) * r1), y = Math.round(gy - 16 + Math.sin(a) * r1); if (din(x, y)) pset(x, y, hex('#fff8c0')); } }
}

// el pupitre del poeta (por delante): tablero inclinado con el libro abierto, el tintero y la base del candelero
function c_pintaPupitre(R) {
  const { rect, pset, linea, poligono } = R, K = C.k;
  poligono([[122, 138], [202, 138], [198, 126], [128, 126]], K); poligono([[123, 137], [201, 137], [197, 127], [129, 127]], hex('#6e4630')); linea(123, 137, 201, 137, hex('#8a5a3a'));
  poligono([[134, 135], [161, 135], [161, 128], [137, 128]], hex('#f0e8d0')); poligono([[163, 135], [188, 135], [186, 128], [163, 128]], hex('#e8dcc0')); rect(161, 127, 163, 136, hex('#8a2a2a'));
  for (let r = 0; r < 3; r++) { linea(139, 129 + r * 2, 158, 129 + r * 2, hex('#6a5a4a'), 3); linea(166, 129 + r * 2, 178 - r * 3, 129 + r * 2, hex('#6a5a4a'), 3); }
  rect(140, 129, 142, 131, hex('#a83030')); pset(141, 130, hex('#e8c060'));
  rect(126, 139, 198, 172, K); c_tablas(R, 127, 139, 197, 171, [hex('#6e4630'), hex('#4a2e1c'), hex('#8a5a3a'), hex('#3a2416')], 30, 8);
  rect(132, 144, 192, 166, hex('#4a2e1c')); rect(132, 144, 192, 144, hex('#3a2416')); rect(133, 145, 191, 165, hex('#5a3a22')); for (let x = 138; x < 190; x += 12) { linea(x, 148, x + 5, 162, hex('#6e4630')); }
  rect(124, 170, 200, 174, K); rect(125, 171, 199, 173, hex('#4a2e1c'));
  rect(118, 132, 124, 138, K); rect(119, 133, 123, 137, hex('#2a2a3a')); linea(121, 132, 113, 116, hex('#f0ece0')); linea(122, 132, 114, 116, hex('#c8c0b0')); for (let k = 0; k < 5; k++) pset(112 + k, 118 + k * 2, hex('#f8f4ea'));
  rect(190, 134, 198, 137, C.oroS); rect(191, 133, 197, 133, C.oro);
}

// la hoja del libro de cerca (o.camara 'hoja')
function c_hoja(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, escrito = o.escrito ?? 0.6, vela = o.vela ?? 1, pluma = o.pluma ?? 'tintero';
  c_fondo(R, 'hoja' + (o.dibujo ?? ''), () => {
    // el tablero del pupitre con sus vetas y la pared de piedra arriba
    c_sillar(R, 0, 0, 319, 30, 16, 8, c_SC.piedra, 30); for (let y = 0; y < 31; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.3);
    rect(0, 30, 319, 33, K); c_tablas(R, 0, 34, 319, 179, [hex('#7a5232'), hex('#5e3e24'), hex('#9a6e44'), hex('#4a2e18')], 31, 10);
    // el libro abierto: tapas de cuero, el lomo, las dos hojas con su curva y el canto de las páginas
    rect(30, 40, 290, 172, K); rect(31, 41, 289, 171, hex('#6a2420')); rect(31, 41, 289, 42, hex('#8a3a30'));
    for (let k = 0; k < 4; k++) { rect(36 - k, 46 + k, 156, 166 - k, k % 2 ? hex('#d8c8a0') : hex('#e8dcb8')); rect(164, 46 + k, 284 + k, 166 - k, k % 2 ? hex('#d8c8a0') : hex('#e8dcb8')); }
    for (let y = 48; y < 165; y++) for (let x = 40; x < 280; x++) { if (x > 156 && x < 164) continue; const sh = x > 140 && x <= 156 ? (x - 140) / 16 : x >= 164 && x < 180 ? (180 - x) / 16 : 0;
      let c = h(x >> 1, y >> 1, 530) < 0.08 ? C.pergaminoS : C.pergamino; if (sh > 0 && ((x + y) & 1 || sh > 0.6)) c = c_mez(c, hex('#8a7048'), sh * 0.5); pset(x, y, c); }
    rect(157, 44, 163, 168, hex('#4a1a18')); rect(159, 44, 160, 168, hex('#6a2420'));
    // la hoja izquierda escrita: la capitular de adorno (hojas, oro y un pájaro, sin letra) y los renglones de trazos
    rect(48, 54, 74, 80, K); rect(49, 55, 73, 79, hex('#2a4a8a')); rect(51, 57, 71, 77, hex('#c8a040')); rect(53, 59, 69, 75, hex('#8a2a2a'));
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; pset(Math.round(61 + Math.cos(a) * 5), Math.round(67 + Math.sin(a) * 5), hex('#4a8a3a')); } R.disco(61, 67, 2, hex('#f0d060')); pset(61, 66, hex('#ffffff'));
    for (let y = 82; y < 160; y++) if (y % 5 === 0) { pset(46 + (y & 2), y, hex('#3a7a3a')); pset(47, y + 1, hex('#c8a040')); }
    const renglones = (x0, x1, y0, n, k, frac = 1) => { for (let r = 0; r < n; r++) { const y = y0 + r * 6; if (r / n >= frac) break; let x = x0 + (r === 0 && x0 < 80 ? 36 : 0); const fin = r === n - 1 ? x0 + (x1 - x0) * 0.6 : x1;
      while (x < fin) { const L = 2 + Math.floor(h(x, r, k) * 7); linea(x, y, Math.min(fin, x + L), y, hex('#3a2a20')); if (h(x, r, k + 1) < 0.35) pset(x + 1, y - 1 - (h(x, r, k + 2) < 0.4 ? 1 : 0), hex('#3a2a20')); if (h(x, r, k + 3) < 0.2) pset(x + L, y + 1, hex('#3a2a20')); x += L + 2 + (h(x, r, k + 4) < 0.15 ? 3 : 0); }
      if (h(r, 0, k + 5) < 0.2) pset(x0 - 3, y, hex('#a83030')); } };
    for (let r = 0; r < 4; r++) { let x = 80; const y = 58 + r * 6; while (x < 148) { const L = 2 + Math.floor(h(x, r, 531) * 7); linea(x, y, Math.min(148, x + L), y, hex('#3a2a20')); x += L + 2; } }
    renglones(50, 148, 86, 13, 532);
    // el margen con una mancha de tinta y una nota en rojo (trazos)
    R.disco(150, 158, 2, hex('#3a2a20')); pset(153, 160, hex('#3a2a20'));
    if (o.dibujo === 'cena') {
      // la miniatura de la cena: el marco, el fondo azul, la mesa con mantel y figuritas, la copa en medio
      rect(176, 52, 274, 116, K); rect(177, 53, 273, 115, hex('#c8a040')); rect(179, 55, 271, 113, hex('#2a4a8a')); for (let y = 55; y < 114; y++) for (let x = 179; x < 272; x++) if ((x + y) % 7 === 0) pset(x, y, hex('#3a5a9a'));
      rect(186, 92, 264, 100, hex('#f0ece0')); rect(186, 100, 264, 104, hex('#d8d0c0')); for (let x = 188; x < 264; x += 6) pset(x, 102, hex('#a83030'));
      for (let k = 0; k < 7; k++) { const x = 192 + k * 11, c = [hex('#a83030'), hex('#3a7a3a'), hex('#e8c060'), hex('#8a4ab0'), hex('#c86a30'), hex('#3a6ac8'), hex('#a83030')][k]; rect(x - 3, 80, x + 3, 92, c); rect(x - 2, 73, x + 2, 79, hex('#e8b890')); R.anillo(x, 75, 4, hex('#e8c060')); }
      for (let k = 0; k < 4; k++) rect(194 + k * 20, 90, 198 + k * 20, 91, hex('#c8a060'));
      renglones(178, 272, 124, 6, 533, escrito);
    } else renglones(170, 272, 56, 18, 534, escrito);
  });
  // la copa de la miniatura, que brilla
  if (o.dibujo === 'cena') { copa(R, 225, 91, t, { tipo: 'oro', brillo: o.brillo ?? 0.6, s: 1 }); }
  // la pluma: en el tintero, o tumbada sobre la hoja al final de lo escrito
  rect(296, 150, 314, 168, K); rect(297, 151, 313, 167, hex('#2a2a3a')); rect(297, 151, 313, 153, hex('#4a4a5a')); R.disco(305, 151, 5, K); R.disco(305, 151, 4, hex('#101018'));
  if (pluma === 'tintero') { const b = Math.round(Math.sin(t * 0.8) * 1); linea(305, 150, 314 + b, 116, hex('#f0ece0')); linea(306, 150, 315 + b, 116, hex('#c8c0b0')); for (let k = 0; k < 8; k++) { pset(310 + b + k * 0.3, 134 - k * 2.4, hex('#f8f4ea')); pset(312 + b + k * 0.4, 132 - k * 2.4, hex('#e0dcd0')); } }
  else if (pluma === 'hoja') { const yl = 56 + Math.floor(18 * escrito) * 6 - (o.dibujo === 'cena' ? 0 : 6), x = 236; linea(x, yl, x + 40, yl - 20, hex('#f0ece0')); linea(x + 1, yl, x + 41, yl - 20, hex('#c8c0b0')); for (let k = 0; k < 9; k++) pset(x + 22 + k * 2, yl - 12 - k, hex('#f8f4ea')); pset(x, yl, K); }
  // el reloj de arena que cae, a la izquierda
  { const x = 14, y = 120, u = (t % 20) / 20; rect(x - 8, y - 22, x + 8, y - 20, hex('#6e4630')); rect(x - 8, y + 20, x + 8, y + 22, hex('#6e4630')); rect(x - 8, y - 20, x - 7, y + 20, hex('#4a2e1c')); rect(x + 7, y - 20, x + 8, y + 20, hex('#4a2e1c'));
    for (let j = -19; j <= 19; j++) { const w = Math.max(1, Math.round(Math.abs(j) * 0.3)); for (let i = -w; i <= w; i++) { const arriba = j < 0 && -j < (1 - u) * 16 + 1, abajo = j > 0 && (20 - j) < u * 14 + 1; pset(x + i, y + j, arriba || abajo ? hex('#e8c880') : hex('#c8d8e0')); } }
    pset(x, y + Math.floor((t * 20) % 18), hex('#e8c880')); }
  // la vela con su luz, o apagada con su hilo de humo; la polilla que ronda la llama
  { const x = 306, y = 96; rect(x - 6, y + 4, x + 6, y + 7, K); rect(x - 5, y + 4, x + 5, y + 6, C.oro); rect(x - 5, y + 4, x + 5, y + 4, C.oroL);
    const alto = 12; rect(x - 2, y - alto, x + 2, y + 3, C.vela); rect(x + 2, y - alto, x + 2, y + 3, hex('#d8c880')); for (let k = 0; k < 3; k++) pset(x - 2 + k, y - alto + 1 + k * 3, hex('#fffbe0')); pset(x, y - alto - 1, K);
    if (vela > 0) { const f = Math.sin(t * 13) + Math.sin(t * 7.1), s = Math.max(0.2, vela), fy = y - alto - 2; c_luz(R, x, fy - 3, 90 * s, 60 * s, hex('#ffd890'), 0.18 * s);
      for (let j = 0; j < Math.round(7 * s); j++) { const w = j < 2 ? 1 : j < 5 ? 1 : 0, dx = f > 1 && j > 3 ? 1 : 0; for (let i = -w; i <= w; i++) pset(x + i + dx, fy - j, j < 2 ? hex('#ff9a30') : j < 4 ? hex('#ffd860') : hex('#fff4c0')); }
      const a = t * 2.3, mx = Math.round(x + Math.cos(a) * 16 + Math.sin(a * 2.7) * 4), my = Math.round(fy - 4 + Math.sin(a * 1.3) * 10), al = Math.sin(t * 30) > 0; pset(mx, my, hex('#a89a8a')); pset(mx - 1, my - (al ? 1 : 0), hex('#c8bca8')); pset(mx + 1, my - (al ? 1 : 0), hex('#c8bca8')); }
    else { for (let y2 = y - alto - 2; y2 >= 0; y2 -= 1) { void y2; } for (let all = 0; all < 1; all++) c_luz(R, 160, 100, 200, 120, hex('#0a0810'), 0.35); c_humo(R, x, y - alto - 2, t, 7, hex('#b8b0a8'), 40); } }
  return { pagina: [[40, 48, 156, 164], [164, 48, 280, 164]], renglon: [170, 56 + Math.floor(18 * escrito) * 6], vela: [306, 82], tintero: [305, 151], arena: [14, 120], miniatura: o.dibujo === 'cena' ? [176, 52, 274, 116] : null, copaMiniatura: [225, 91] };
}

// el castillo del Grial de noche (o.encuadre 'castillo')
const c_CS = { piedra: [hex('#5a5468'), hex('#3e3a4e'), hex('#7a7488'), hex('#26222e')] };

function c_castillo(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, S = c_CS;
  c_fondo(R, 'castillo', () => {
    c_sillar(R, 0, 0, 319, 134, 18, 9, S.piedra, 40);
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.4 - y * 0.012);
    // los arcos del fondo y los pilares que se alejan
    for (const [ax, w] of [[40, 34], [160, 40], [280, 34]]) { for (let k = 0; k < 4; k++) { for (let a = 0; a <= Math.PI; a += 0.008) { const x = Math.round(ax + Math.cos(a) * (w - k)), y = Math.round(52 - Math.sin(a) * w * 0.9 + k); pset(x, y, k === 0 ? S.piedra[2] : k === 3 ? S.piedra[3] : S.piedra[0]); } } }
    for (const px of [6, 74, 116, 204, 246, 314]) { rect(px - 6, 50, px + 6, 134, S.piedra[3]); rect(px - 5, 50, px + 5, 134, S.piedra[0]); rect(px - 5, 50, px - 3, 134, S.piedra[2]); rect(px + 3, 50, px + 5, 134, S.piedra[1]); rect(px - 8, 46, px + 8, 50, S.piedra[2]); rect(px - 8, 50, px + 8, 51, S.piedra[3]); for (let y = 56; y < 134; y += 9) rect(px - 5, y, px + 5, y, S.piedra[1]); }
    // los ventanales altos con la noche (la luna en uno)
    for (const wx of [40, 280]) { rect(wx - 10, 60, wx + 10, 108, K); poligono([[wx - 10, 60], [wx, 48], [wx + 10, 60]], K);
      for (let y = 50; y < 108; y++) for (let x = wx - 9; x <= wx + 9; x++) if (y >= 60 || Math.abs(x - wx) < (y - 48) * 0.85) pset(x, y, (x + y) & 1 && y > 84 ? hex('#2a3460') : hex('#1a2048'));
      rect(wx, 50, wx, 108, K); rect(wx - 9, 80, wx + 9, 80, K); }
    R.disco(34, 66, 4, hex('#f0ecd8')); R.disco(36, 65, 3, hex('#1a2048')); for (const [x, y] of [[44, 58], [276, 64], [286, 90], [272, 96], [46, 96]]) pset(x, y, hex('#e8e8f8'));
    // el ábside del fondo, más claro, con el altar sobre dos gradas
    rect(124, 54, 196, 134, hex('#2e2a3a')); for (let y = 54; y < 134; y++) for (let x = 124; x < 197; x++) if ((x * 3 + y * 7) % 11 === 0) pset(x, y, hex('#4a4058'));
    rect(120, 120, 200, 126, K); rect(121, 121, 199, 125, S.piedra[2]); rect(116, 126, 204, 134, K); rect(117, 127, 203, 133, S.piedra[0]); rect(117, 127, 203, 127, S.piedra[2]);
    rect(138, 100, 182, 120, K); rect(139, 101, 181, 119, hex('#e8e4d8')); rect(139, 101, 181, 103, hex('#c8a040')); for (let x = 140; x < 181; x += 4) pset(x, 106, hex('#c83030')); rect(156, 108, 164, 118, hex('#d8d4c8')); rect(159, 109, 161, 117, hex('#c83030')); rect(157, 112, 163, 113, hex('#c83030'));
    // el suelo de losas en perspectiva
    for (let y = 134; y < 180; y++) { const z = y - 70, v = Math.floor(400 / z); for (let x = 0; x < 320; x++) { const u = Math.floor((x - 160) / z * 4 + 50), j = ((x - 160) / z * 4 + 50) % 1 < 0.06 || (400 / z) % 1 < 0.08;
      pset(x, y, j ? S.piedra[3] : h(u, v, 541) < 0.3 ? S.piedra[1] : h(x >> 1, y >> 1, 542) < 0.08 ? S.piedra[2] : S.piedra[0]); } }
    // la alfombra roja que lleva al altar
    poligono([[148, 134], [172, 134], [196, 180], [124, 180]], hex('#7a1a20')); poligono([[150, 134], [170, 134], [192, 180], [128, 180]], hex('#9a2a30')); for (let y = 134; y < 180; y++) for (let x = 120; x < 200; x++) if (R.pget(x, y) === hex('#9a2a30') && (x + y) % 5 === 0) pset(x, y, hex('#b83a40'));
  });
  // ── lo que se mueve ──
  // los estandartes blancos con la cruz roja que ondean
  for (const [x0, k] of [[85, 0], [215, 1]]) for (let y = 56; y < 96; y++) { const ond = Math.round(Math.sin(t * 2 + y * 0.15 + k) * 1.2); for (let x = 0; x < 20; x++) { const yy = y + (y > 92 && (x % 6 < 3) ? 0 : 0); pset(x0 + x + ond, yy, x === 0 || x === 19 ? hex('#c8c0b0') : (x >= 8 && x <= 11 && y > 62 && y < 88) || (y >= 70 && y <= 73 && x > 3 && x < 16) ? hex('#c8303a') : hex('#f2eee2')); } }
  // las antorchas en los pilares
  for (const [x, k] of [[74, 0], [116, 1], [204, 2], [246, 3]]) { rect(x - 1, 74, x + 1, 84, hex('#5a3a22')); rect(x - 2, 72, x + 2, 74, hex('#3a3a40')); c_fuego(R, x - 3, x + 3, 71, 8, t + k); c_luz(R, x, 70, 26, 22, hex('#ffb060'), 0.24 + 0.05 * Math.sin(t * 10 + k)); }
  // el objeto del Grial sobre el altar, que irradia
  const obj = o.objeto ?? 'piedra', ox = 160, oy = 92;
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2 + t * 0.3, r0 = 12, r1 = 22 + (k % 2) * 10 + Math.sin(t * 3 + k) * 3; linea(ox + Math.cos(a) * r0, oy + Math.sin(a) * r0, ox + Math.cos(a) * r1, oy + Math.sin(a) * r1, (x, y) => { const c = R.pget(x, y); return c ? c_mez(c, hex('#fff4c0'), 0.45) : null; }); }
  c_luz(R, ox, oy, 46, 40, hex('#fff0b0'), 0.32 + 0.06 * Math.sin(t * 3));
  if (obj === 'copa') copa(R, ox, 100, t, { tipo: 'oro', brillo: 1, s: 2 }); else c_piedraGrial(R, ox, oy + 6, t, 1);
  // la procesión de figuritas con velas que cruza por el fondo
  for (let k = 0; k < 6; k++) { const x = Math.round(((k * 24 + t * 8) % 260) + 30), blanco = k % 2 === 0; if (x > 112 && x < 208) continue;
    c_gente(R, x, 132, t, { alto: 12, anda: true, ropa: blanco ? hex('#e8e4d8') : hex('#4a3a5a'), pelo: blanco ? hex('#e8e4d8') : hex('#3a2a2a'), dir: 1 }); pset(x + 3, 122, hex('#f8f0d0')); pset(x + 3, 121, hex('#ffd860')); c_luz(R, x + 3, 120, 8, 7, hex('#ffd890'), 0.3); }
  return { suelo: 164, pies: [40, 80, 100, 220, 250, 280], altar: [138, 100, 182, 120], objeto: [ox, oy], gradas: [116, 120, 204, 134], alfombra: [124, 134, 196, 180], procesion: 132 };
}

// la piedra luminosa (la de Wolfram): una gema tallada de luz verde y blanca que late (x, y: su base)
function c_piedraGrial(R, x, y, t, s = 1) {
  const p = 0.5 + 0.5 * Math.sin(t * 3), w = 8 * s, a = 12 * s;
  const P = [[x - w, y - a * 0.5], [x - w * 0.5, y - a], [x + w * 0.5, y - a], [x + w, y - a * 0.5], [x + w * 0.6, y], [x - w * 0.6, y]];
  R.poligono(P.map(([px, py]) => [px + (px < x ? -1 : 1), py + (py < y - a * 0.5 ? -1 : 1)]), C.k);
  R.poligono(P, (px, py) => { const u = (px - x) / w, v = (py - (y - a)) / a; return u < -0.3 && v < 0.6 ? hex('#e8fff0') : u > 0.35 ? hex('#4ab890') : v > 0.7 ? hex('#6ad0a8') : hex('#a8f0d0'); });
  R.linea(x - w * 0.5, y - a, x - w * 0.2, y, hex('#ffffff')); R.linea(x + w * 0.5, y - a, x + w * 0.2, y, hex('#6ad0a8')); R.linea(x - w, y - a * 0.5, x + w, y - a * 0.5, hex('#c8ffe8'));
  const sx = Math.round(x - w * 0.4 + p * w * 0.5), sy = Math.round(y - a * 0.75); R.pset(sx, sy, hex('#ffffff')); R.pset(sx + 1, sy, hex('#ffffff')); R.pset(sx, sy - 1, hex('#ffffff'));
  if (p > 0.8) { R.pset(sx - 2, sy, hex('#ffffff')); R.pset(sx + 3, sy, hex('#ffffff')); R.pset(sx, sy - 3, hex('#ffffff')); R.pset(sx, sy + 2, hex('#ffffff')); }
}

// el altar del castillo de cerca (o.camara 'altar')
function c_altarGrial(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, S = c_CS;
  c_fondo(R, 'altarGrial', () => {
    c_sillar(R, 0, 0, 319, 150, 20, 10, S.piedra, 44);
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.35 - y * 0.01);
    // el ábside con el mosaico dorado tramado y su arco
    rect(70, 30, 250, 150, K); poligono([[70, 30], [160, 4], [250, 30]], K);
    for (let y = 8; y < 150; y++) for (let x = 72; x < 249; x++) { if (y < 30 && Math.abs(x - 160) > (y - 4) * 3.4) continue; const tes = ((x >> 1) + (y >> 1)) & 1, v = h(x >> 1, y >> 1, 545); pset(x, y, v < 0.1 ? hex('#a87a20') : tes ? hex('#c8962a') : v > 0.85 ? hex('#f0c850') : hex('#d8a838')); }
    for (let y = 30; y < 150; y++) for (let x = 72; x < 249; x++) if ((x + y) & 1) c_tine(R, x, y, hex('#2a1a10'), Math.min(0.5, Math.abs(x - 160) / 180));
    for (const px of [62, 258]) { rect(px - 8, 26, px + 8, 150, S.piedra[3]); rect(px - 7, 26, px + 7, 150, S.piedra[0]); rect(px - 7, 26, px - 5, 150, S.piedra[2]); rect(px + 5, 26, px + 7, 150, S.piedra[1]); rect(px - 10, 22, px + 10, 27, S.piedra[2]); }
    // el suelo de losas y la grada
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 150) / 10), jx = (x + fila * 13) % 34 === 0; pset(x, y, jx || (y - 150) % 10 === 0 ? S.piedra[3] : h(Math.floor((x + fila * 13) / 34), fila, 546) < 0.3 ? S.piedra[1] : S.piedra[0]); }
    rect(86, 144, 234, 150, K); rect(87, 145, 233, 149, S.piedra[2]); rect(87, 145, 233, 145, hex('#9a94a8'));
    // el altar con el mantel bordado y la caída de flecos, y el cojín
    rect(100, 116, 220, 144, K); rect(101, 117, 219, 143, hex('#e8e4d8')); for (let y = 117; y < 144; y++) for (let x = 101; x < 220; x++) if (h(x >> 1, y >> 1, 547) < 0.1) pset(x, y, hex('#d0ccc0'));
    rect(101, 117, 219, 120, hex('#c8a040')); rect(101, 121, 219, 121, hex('#8a6a20')); for (let x = 103; x < 219; x += 6) { pset(x, 124, hex('#c83030')); pset(x + 1, 125, hex('#c83030')); pset(x + 2, 124, hex('#c83030')); }
    for (let x = 101; x < 220; x += 2) rect(x, 143, x, 145, hex('#c8a040'));
    rect(150, 126, 170, 140, hex('#d8d4c8')); rect(158, 127, 162, 139, hex('#c83030')); rect(152, 131, 168, 134, hex('#c83030'));
    rect(140, 108, 180, 116, K); rect(141, 109, 179, 115, hex('#8a1e24')); rect(141, 109, 179, 110, hex('#b0343a')); for (const cx of [141, 179]) { rect(cx - 1, 112, cx + 1, 118, hex('#c8a040')); }
  });
  for (const [x, k] of [[112, 0], [208, 1]]) { rect(x - 4, 114, x + 4, 116, C.oroS); rect(x - 1, 100, x + 1, 114, C.oro); rect(x - 3, 98, x + 3, 100, C.oroS); c_vela(R, x, 97, t, 9, k); }
  const obj = o.objeto ?? 'piedra', ox = 160, oy = 84;
  for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2 + t * 0.25, r0 = 22, r1 = 40 + (k % 2) * 16 + Math.sin(t * 3 + k) * 4; linea(ox + Math.cos(a) * r0, oy + Math.sin(a) * r0, ox + Math.cos(a) * r1, oy + Math.sin(a) * r1, (x, y) => { const c = R.pget(x, y); return c ? c_mez(c, hex('#fff4c0'), 0.5) : null; }); }
  c_luz(R, ox, oy, 80, 60, hex('#fff0b0'), 0.3 + 0.08 * Math.sin(t * 3));
  if (obj === 'copa') copa(R, ox, 108, t, { tipo: 'oro', brillo: 1, s: 3 }); else c_piedraGrial(R, ox, 107, t, 2.2);
  for (let k = 0; k < 10; k++) { const u = (t * 0.15 + k / 10) % 1, x = Math.round(ox + Math.sin(k * 2.1 + t * 0.5) * 30), y = Math.round(oy + 30 - u * 70); if (u < 0.9) pset(x, y, hex('#fff8d0')); }
  return { suelo: 170, pies: [30, 60, 240, 270], altar: [100, 116, 220, 144], objeto: [ox, oy], candeleros: [112, 208] };
}

// el mostrador de las copas en la feria (o.encuadre 'mostrador')
function c_mostrador(R, t, o, cerca) {
  const { rect, pset, linea, poligono } = R, K = C.k;
  const TIPOS = ['madera', 'oro', 'barro', 'cristal', 'plata', 'agata', 'oro', 'madera', 'barro', 'plata', 'cristal'];
  if (!cerca) {
    c_cielo(R, t, 100, [hex('#4a5aa0'), hex('#8a6aa8'), hex('#e08a7a'), hex('#f0b880')], [hex('#ffe8d0'), hex('#e8a8a0'), hex('#9a6a8a')], { nubes: [[20, 18, 36, 1.0], [130, 30, 30, 1.6], [220, 52, 26, 2.2], [80, 50, 22, 2.8]] });
    c_pajaros(R, t, 30, 3, hex('#2a2440'));
    c_pegar(R, c_capa(R, 'feria', () => {
      // el castillo lejano en su colina y los puestos del fondo con sus toldos
      poligono([[0, 100], [70, 84], [140, 96], [220, 80], [320, 92], [320, 112], [0, 112]], hex('#6a5a7a'));
      rect(196, 58, 226, 86, hex('#5a4a6a')); for (const tx of [194, 222]) { rect(tx, 48, tx + 8, 86, hex('#5a4a6a')); poligono([[tx - 1, 48], [tx + 4, 40], [tx + 9, 48]], hex('#4a3a5a')); } for (let x = 196; x < 227; x += 4) rect(x, 55, x + 1, 58, hex('#5a4a6a')); pset(211, 70, hex('#ffd890')); pset(198, 60, hex('#ffd890'));
      for (let k = 0; k < 7; k++) { const x = -10 + k * 50, y = 96, c = [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#4a8a5a')][k % 4];
        rect(x, y, x + 40, y + 22, hex('#6a4a2e')); for (let xx = x; xx <= x + 40; xx++) { const r = Math.floor((xx - x) / 5) & 1; rect(xx, y - 8, xx, y - 1, r ? hex('#f0ece0') : c); pset(xx, y + ((xx & 1) ? 0 : 1), r ? hex('#d8d0c0') : c_mez(c, K, 0.3)); } rect(x + 4, y + 4, x + 36, y + 14, hex('#3a2a1c')); for (let i = 0; i < 6; i++) rect(x + 6 + i * 5, y + 8, x + 8 + i * 5, y + 13, [hex('#e8c060'), hex('#c84a4a'), hex('#6aa84a')][(i + k) % 3]); }
      // la plaza de tierra
      for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x >> 1, y >> 1, 550); pset(x, y, v < 0.18 ? hex('#8a6a4a') : v > 0.88 ? hex('#b89870') : hex('#a08060')); }
      for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 551) * 320), y = 120 + Math.floor(h(k, 2, 551) * 58); rect(x, y, x + 1, y, hex('#6a5038')); }
      // el gran puesto de las copas: postes, el toldo a rayas con flecos, la trasera con estantes y el mostrador largo
      rect(14, 44, 306, 132, hex('#4a3020')); c_tablas(R, 16, 46, 304, 130, [hex('#6a4a2e'), hex('#523822'), hex('#84603c'), hex('#3a2616')], 50, 9);
      for (const sy of [70, 96]) { rect(16, sy, 304, sy + 2, K); rect(16, sy, 304, sy, hex('#9a7048')); }
      for (let x = 20; x < 302; x++) for (let y = 100; y < 146; y++) { const f = (x + Math.round(Math.sin(y * 0.2) * 2)) % 14; pset(x, y, y < 103 ? hex('#c8a040') : f < 2 ? hex('#3a1a3a') : f > 11 ? hex('#7a3a7a') : hex('#5a2a5a')); }
            for (let k = 0; k < 16; k++) { const x = 26 + k * 18, y = 69; rect(x, y - 7, x + 4, y - 1, [hex('#8a8a90'), hex('#c8a040'), hex('#a8603a'), hex('#c8d8e8')][k % 4]); rect(x + 1, y - 1, x + 3, y, K); pset(x, y - 7, C.blanco); }
      for (const px of [10, 306]) { rect(px, 30, px + 5, 160, K); rect(px + 1, 30, px + 4, 160, hex('#6e4630')); rect(px + 1, 30, px + 1, 160, hex('#9a6a44')); }
      for (let x = 4; x < 316; x++) { const r = Math.floor((x - 4) / 12) & 1; for (let y = 26; y < 42; y++) pset(x, y, y < 28 ? K : r ? hex('#f0ece0') : hex('#2a6a4a')); rect(x, 42, x, 44 + ((x % 12) < 6 ? 2 : 0), r ? hex('#d8d0c0') : hex('#1a4a34')); }
      rect(4, 24, 316, 26, K);
      rect(6, 145, 314, 176, K); c_tablas(R, 7, 150, 313, 175, [hex('#7a5232'), hex('#5e3e24'), hex('#9a6e44'), hex('#4a2e18')], 51, 8); rect(7, 146, 313, 149, hex('#a07448')); rect(7, 146, 313, 146, hex('#c89868')); rect(7, 149, 313, 149, hex('#5e3e24'));
      for (let x = 7; x < 313; x += 40) { rect(x + 4, 154, x + 34, 172, hex('#6a4628')); rect(x + 4, 154, x + 34, 154, hex('#4a2e18')); }
      for (let y = 176; y < 180; y++) for (let x = 6; x < 315; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.35);
    }));
    // farolillos que se mecen bajo el toldo, gente pequeña que pasea al fondo y banderines
    for (const [x, k] of [[60, 0], [160, 1], [260, 2]]) { const sw = Math.round(Math.sin(t * 1.4 + k) * 2); linea(x, 44, x + sw, 52, K); rect(x - 3 + sw, 52, x + 3 + sw, 60, K); rect(x - 2 + sw, 53, x + 2 + sw, 59, hex('#ffc860')); pset(x - 1 + sw, 54, hex('#fff4c0')); c_luz(R, x + sw, 56, 20, 16, hex('#ffd890'), 0.22); }
    // una polilla que ronda cada farolillo
    for (const [x, k] of [[60, 0], [160, 1], [260, 2]]) { const a = t * 2.1 + k * 2, mx = Math.round(x + Math.cos(a) * 9), my = Math.round(56 + Math.sin(a * 1.4) * 6); pset(mx, my, hex('#e8e0d0')); pset(mx + (Math.sin(t * 30 + k) > 0 ? 1 : -1), my - 1, hex('#c8c0b0')); }
    for (let x = 0; x < 320; x++) { const y = Math.round(8 + Math.sin(x / 320 * Math.PI) * 10); if (y > 15) { pset(x, y, hex('#2a2a2a')); if (x % 9 === 0) { const f = Math.round(Math.sin(t * 4 + x) * 1); poligono([[x, y + 1], [x + 6, y + 1], [x + 3 + f, y + 6]], [hex('#c83a3a'), hex('#e8c040'), hex('#3a6ac8')][(x / 9) % 3]); } } }
  } else {
    // de cerca: la trasera del puesto, el toldo arriba, los farolillos y el mostrador grande
    c_fondo(R, 'feriaCerca', () => {
      c_tablas(R, 0, 20, 319, 149, [hex('#6a4a2e'), hex('#523822'), hex('#84603c'), hex('#3a2616')], 52, 10);
      for (let x = 0; x < 320; x++) for (let y = 96; y < 140; y++) { const f = (x + Math.round(Math.sin(y * 0.15) * 3)) % 20; pset(x, y, y < 99 ? hex('#c8a040') : f < 3 ? hex('#3a1a3a') : f > 16 ? hex('#7a3a7a') : hex('#5a2a5a')); }
      for (const sy of [52, 84]) { rect(0, sy, 319, sy + 3, K); rect(0, sy, 319, sy, hex('#9a7048')); }
      for (let k = 0; k < 12; k++) { const x = 8 + k * 26, y = k % 2 ? 51 : 83; rect(x, y - 11, x + 7, y - 1, [hex('#8a8a90'), hex('#c8a040'), hex('#a8603a'), hex('#c8d8e8')][k % 4]); rect(x + 2, y - 1, x + 5, y, K); rect(x, y - 11, x + 1, y - 1, C.blanco); }
      rect(0, 0, 319, 20, K); for (let x = 0; x < 320; x++) { const r = Math.floor(x / 16) & 1; rect(x, 0, x, 18, r ? hex('#f0ece0') : hex('#2a6a4a')); rect(x, 19, x, 21 + ((x % 16) < 8 ? 3 : 0), r ? hex('#d8d0c0') : hex('#1a4a34')); }
            rect(0, 150, 319, 180, K); c_tablas(R, 0, 158, 319, 179, [hex('#7a5232'), hex('#5e3e24'), hex('#9a6e44'), hex('#4a2e18')], 54, 9); rect(0, 151, 319, 157, hex('#a07448')); rect(0, 151, 319, 151, hex('#c89868')); rect(0, 157, 319, 157, hex('#5e3e24'));
      // un paño de terciopelo sobre el mostrador
      rect(14, 146, 306, 155, hex('#5a1a2a')); rect(14, 146, 306, 147, hex('#8a2a3a')); for (let x = 14; x < 306; x += 3) pset(x, 155 + (x % 6 === 0 ? 1 : 0), hex('#c8a040'));
    });
    for (const [x, k] of [[40, 0], [280, 1]]) { const sw = Math.round(Math.sin(t * 1.4 + k) * 2); linea(x, 22, x + sw, 30, K); rect(x - 4 + sw, 30, x + 4 + sw, 40, K); rect(x - 3 + sw, 31, x + 3 + sw, 39, hex('#ffc860')); c_luz(R, x + sw, 35, 24, 18, hex('#ffd890'), 0.24); }
  }
  // la fila de copas: cada una con su sombra; la nueva aparece al final con un destello
  const n = o.copas ?? (cerca ? 5 : 7), s = cerca ? 3 : 2, y = cerca ? 149 : 146, x0 = cerca ? 36 : 34, paso = cerca ? 50 : 36, pos = [];
  for (let i = 0; i < n; i++) { const x = x0 + i * paso; pos.push([x, y]); if (i === o.falta) continue; for (let k = -6 * s; k <= 6 * s; k++) if ((k + i) & 1) c_tine(R, x + k + 2, y + 1, K, 0.4);
    copa(R, x, y, t, { tipo: TIPOS[i % TIPOS.length], s, brillo: 0.15 });
    if (cerca) { rect(x - 9, y + 9, x + 9, y + 20, K); rect(x - 8, y + 10, x + 8, y + 19, hex('#efe6cc')); rect(x - 8, y + 10, x + 8, y + 10, C.blanco); R.numero(String(2 + ((i * 5) % 7)), x, y + 18, { fina: true, centro: true, rampa: [hex('#3a2a20'), hex('#3a2a20'), hex('#3a2a20'), hex('#3a2a20')] }); pset(x - 7, y + 12, hex('#c8a040')); } }
  const nv = o.nueva ?? 0; if (nv > 0) { const x = x0 + n * paso; pos.push([x, y]); const u = Math.min(1, nv * 1.5);
    if (u >= 0.3) copa(R, x, y, t, { tipo: TIPOS[n % TIPOS.length], s, brillo: 1 - u * 0.5 });
    const r = Math.round(4 + u * 14 * s / 2); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t * 3; pset(Math.round(x + Math.cos(a) * r), Math.round(y - 6 * s + Math.sin(a) * r), hex('#fff8c0')); } c_luz(R, x, y - 6 * s, r + 6, r + 6, hex('#fff4c0'), 0.4 * (1 - u * 0.6)); }
  return cerca ? { suelo: 178, pies: [60, 110, 160, 210], mostrador: [0, 146, 319, 179], copas: pos, alto: 12 * s } : { suelo: 178, pies: [40, 90, 140, 190, 240], mostrador: [6, 145, 314, 176], copas: pos, alto: 12 * s };
}

// la capilla del Santo Cáliz de Valencia (o.encuadre 'valencia')
const c_VL = { piedra: [hex('#c8b898'), hex('#a09070'), hex('#e0d4b8'), hex('#7a6a50')], alab: hex('#f0e8d8'), alabS: hex('#c8bca4'), alabL: hex('#fffcf4') };

function c_capilla(R, t, o) {
  const { rect, pset, linea, poligono } = R, K = C.k, V = c_VL;
  c_fondo(R, 'capilla', () => {
    c_sillar(R, 0, 0, 319, 140, 20, 10, V.piedra, 60);
    // la bóveda de crucería: plementos en sombra, los nervios y la clave dorada (tranquila bajo la barra del año)
    for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, hex('#3a2e24'), 0.42 - y * 0.009);
    for (const [x0, y0, x1, y1] of [[0, 34, 160, 4], [320, 34, 160, 4], [70, 34, 160, 4], [250, 34, 160, 4]]) { linea(x0, y0, x1, y1, V.piedra[2]); linea(x0, y0 + 1, x1, y1 + 1, V.piedra[3]); }
    R.disco(160, 6, 4, K); R.disco(160, 6, 3, C.oro); pset(159, 5, C.oroL);
    // el retablo de alabastro: tres calles con dos pisos de hornacinas, cada una con su figurita en relieve, y los pináculos
    rect(60, 30, 260, 124, K); rect(61, 31, 259, 123, V.alabS);
    for (let c = 0; c < 6; c++) for (let f = 0; f < 2; f++) { if ((c === 2 || c === 3) && f === 1) continue; const x = 66 + c * 32, y = 40 + f * 42;
      rect(x, y + 6, x + 26, y + 38, V.alab); poligono([[x, y + 6], [x + 13, y - 2], [x + 26, y + 6]], V.alab); rect(x + 3, y + 8, x + 23, y + 36, V.alabS); poligono([[x + 3, y + 8], [x + 13, y + 2], [x + 23, y + 8]], V.alabS);
      for (let yy = y + 3; yy < y + 37; yy++) for (let xx = x + 4; xx < x + 23; xx++) if ((xx + yy) & 1 && xx > x + 15) c_tine(R, xx, yy, V.piedra[3], 0.2);
      const fx = x + 13, fy = y + 34; rect(fx - 3, fy - 14, fx + 3, fy, V.alab); rect(fx - 2, fy - 19, fx + 2, fy - 15, V.alabL); rect(fx + 3, fy - 14, fx + 3, fy, V.alabS); rect(fx - 3, fy - 4, fx + 3, fy - 4, V.alabS);
      if ((c + f) % 2) { linea(fx - 5, fy - 12, fx - 3, fy - 8, V.alabL); } else { R.anillo(fx, fy - 18, 4, hex('#d8c070')); }
      rect(x - 2, y + 6, x - 1, y + 38, V.alabL); rect(x + 27, y + 6, x + 28, y + 38, V.piedra[3]);
      for (let k = 0; k < 3; k++) pset(x + 13, y - 3 - k, V.alabL); }
    for (let px = 62; px < 260; px += 32) { rect(px, 22, px + 2, 34, V.alab); poligono([[px - 1, 22], [px + 1, 14], [px + 3, 22]], V.alab); }
    rect(60, 123, 260, 126, V.alab); rect(60, 123, 260, 123, V.alabL);
    // la hornacina central grande, donde va la vitrina
    rect(126, 80, 194, 124, K); poligono([[126, 80], [160, 56], [194, 80]], K); rect(128, 80, 192, 124, hex('#3a1a22')); poligono([[128, 80], [160, 59], [192, 80]], hex('#3a1a22'));
    for (let y = 60; y < 124; y++) for (let x = 128; x < 193; x++) if (R.pget(x, y) === hex('#3a1a22') && ((x + y) % 4 === 0)) pset(x, y, hex('#4a2430'));
    // las rejas de los lados, de hierro forjado con puntas doradas
    for (const [x0, x1] of [[4, 54], [266, 316]]) { for (let x = x0; x <= x1; x += 5) { rect(x, 70, x, 150, hex('#2a2a30')); pset(x, 68, C.oro); pset(x, 69, C.oroS); } for (const y of [76, 112, 146]) rect(x0, y, x1, y + 1, hex('#2a2a30')); for (let x = x0 + 2; x < x1; x += 10) R.anillo(x + 2, 94, 3, hex('#3a3a42')); }
    // la vidriera alta de la izquierda (la luz entra por ella)
    rect(16, 18, 40, 60, K); poligono([[16, 18], [28, 8], [40, 18]], K); for (let y = 10; y < 60; y++) for (let x = 17; x < 40; x++) if (y >= 18 || Math.abs(x - 28) < (y - 8) * 1.1) pset(x, y, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#3a8a5a')][(Math.floor(x / 4) + Math.floor(y / 5)) % 4]);
    for (let y = 10; y < 60; y += 5) rect(17, y, 39, y, K); for (let x = 20; x < 40; x += 4) rect(x, 10, x, 59, K);
    // el suelo de losas de mármol blanco y rojizo a cuadros en diagonal
    for (let y = 140; y < 180; y++) { const z = y - 60; for (let x = 0; x < 320; x++) { const u = (x - 160) / z * 5, v = 300 / z, a = Math.floor(u + v), b = Math.floor(u - v); pset(x, y, (a + b) & 1 ? (h(a, b, 561) < 0.3 ? hex('#a86a5a') : hex('#b87a68')) : (h(a, b, 562) < 0.3 ? hex('#d8d0c4') : hex('#e8e0d4'))); } }
    rect(0, 140, 319, 140, V.piedra[3]);
    // la grada del altar
    rect(92, 136, 228, 142, K); rect(93, 137, 227, 141, V.piedra[2]); rect(93, 137, 227, 137, V.alabL);
  });
  // la vitrina con la copa de ágata en su peana dorada; los reflejos del cristal pasan
  { rect(140, 82, 180, 122, K); rect(141, 83, 179, 121, hex('#5a2a3a')); rect(141, 110, 179, 121, C.oroS); rect(141, 110, 179, 110, C.oroL); for (let x = 142; x < 179; x += 3) pset(x, 115, C.oro);
    c_luz(R, 160, 96, 22, 18, hex('#ffd8c0'), 0.3); copa(R, 160, 110, t, { tipo: 'agata', s: 2, brillo: 0.4 });
    rect(140, 82, 180, 82, hex('#c8d8e8')); rect(140, 82, 140, 122, hex('#a8b8c8')); rect(180, 82, 180, 122, hex('#a8b8c8'));
    const u = (t % 5) / 5, rx = Math.round(130 + u * 70); for (let k = 0; k < 30; k++) { const x = rx + k * 0.4 - 6, y = 84 + k; if (x > 141 && x < 179 && y < 121) { c_tine(R, Math.round(x), y, C.blanco, 0.45); c_tine(R, Math.round(x) + 2, y, C.blanco, 0.25); } } }
  // las velas del retablo, el haz de la vidriera con motas y los visitantes pequeños que miran tras la reja
  for (const [x, k] of [[96, 2], [224, 3]]) { rect(x - 3, 124, x + 3, 126, C.oroS); c_vela(R, x, 123, t, 8, k); }
  for (let y = 60; y < 175; y++) { const d = Math.round((y - 60) * 0.9); for (let x = 20 + d; x < 40 + d; x++) if (((x + y) & 1) === 0) c_tine(R, x, y, [hex('#ffd0c0'), hex('#c0d0ff'), hex('#fff0b0')][Math.floor((x - d - 20) / 7) % 3], 0.16); }
  for (let k = 0; k < 12; k++) { const u = (t * 0.05 + k / 12) % 1, y = Math.round(70 + u * 100), x = Math.round(22 + (y - 60) * 0.9 + h(k, 1, 563) * 18 + Math.sin(t + k) * 2); pset(x, y, hex('#fff8e0')); }
  for (let k = 0; k < 3; k++) { const x = 280 + k * 12 + Math.round(Math.sin(t * 0.3 + k) * 3); R.recorte([262, 60, 319, 150]); c_gente(R, x, 140, t, { alto: 12, ropa: [hex('#3a6ac8'), hex('#c84a4a'), hex('#4a8a5a')][k], dir: -1, piel: [hex('#e8b890'), hex('#a8704a'), hex('#d8a07a')][k] }); R.recorte(null); }
  for (let x = 266; x <= 316; x += 5) rect(x, 70, x, 150, hex('#2a2a30')); for (const y of [76, 112, 146]) rect(266, y, 316, y + 1, hex('#2a2a30'));
  return { suelo: 166, detras: 150, pies: [70, 100, 160, 220, 250], vitrina: [140, 82, 180, 122], copa: [160, 110], altar: [100, 140, 220, 172], retablo: [60, 30, 260, 126], vidriera: [16, 8, 40, 60] };
}

// el altar de la capilla (por delante del papa que celebra): frontal bordado con la cruz, el mantel y el misal abierto
function c_pintaAltarVLC(R) {
  const { rect, pset, linea } = R, K = C.k;
  rect(100, 146, 220, 174, K); rect(101, 147, 219, 173, hex('#f0ece0')); rect(101, 147, 219, 150, hex('#ffffff')); for (let x = 102; x < 219; x += 2) pset(x, 151, hex('#c8a040'));
  rect(106, 153, 214, 172, hex('#8a1e24')); rect(106, 153, 214, 154, hex('#c8a040')); rect(106, 171, 214, 172, hex('#c8a040')); for (let y = 156; y < 170; y += 3) for (let x = 108; x < 213; x += 6) pset(x + ((y / 3) & 1) * 3, y, hex('#a8303a'));
  rect(156, 156, 164, 170, hex('#e8c060')); rect(152, 160, 168, 164, hex('#e8c060')); pset(157, 157, hex('#fff0a0'));
  rect(98, 174, 222, 177, K); rect(99, 174, 221, 176, hex('#a09070'));
  rect(140, 141, 160, 146, hex('#f0e8d0')); rect(161, 141, 180, 146, hex('#e8dcc0')); rect(160, 140, 161, 146, hex('#8a2a2a')); for (let r = 0; r < 2; r++) { linea(143, 142 + r * 2, 157, 142 + r * 2, hex('#6a5a4a'), 3); linea(164, 142 + r * 2, 178, 142 + r * 2, hex('#6a5a4a'), 3); }
  for (const x of [118, 202]) { rect(x - 4, 144, x + 4, 146, C.oroS); rect(x - 1, 142, x + 1, 144, C.oro); }
}

// la copa de ágata de cerca en su vitrina (o.camara 'caliz')
function c_caliz(R, t, o) {
  const { rect, pset, linea } = R, K = C.k;
  c_fondo(R, 'caliz', () => {
    // el fondo de la hornacina: terciopelo granate con su trama, el arco de alabastro y la peana dorada
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (x + Math.round(Math.sin(y * 0.06) * 3)) % 22; pset(x, y, f < 3 ? hex('#3a1018') : f > 17 ? hex('#7a2a3a') : h(x >> 1, y >> 1, 570) < 0.1 ? hex('#4a1820') : hex('#5a1a28')); }
    for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if ((x + y) & 1) c_tine(R, x, y, K, 0.3);
    for (const px of [30, 290]) { rect(px - 14, 0, px + 14, 180, K); for (let y = 0; y < 180; y++) for (let x = px - 13; x <= px + 13; x++) { const u = (x - px + 13) / 26; pset(x, y, u < 0.2 ? c_VL.alabL : u > 0.75 ? c_VL.alabS : (x - px) % 5 === 0 ? c_VL.alabS : c_VL.alab); } }
    rect(70, 146, 250, 180, K); rect(71, 147, 249, 180, C.oroS); rect(71, 147, 249, 150, C.oroL); for (let x = 74; x < 248; x += 8) { R.disco(x, 158, 2, C.oro); pset(x - 1, 157, C.oroL); } rect(71, 166, 249, 168, hex('#8a6a20'));
    rect(84, 136, 236, 147, K); rect(85, 137, 235, 146, hex('#7a1a2a')); rect(85, 137, 235, 138, hex('#a83040'));
  });
  // la luz que atraviesa la ágata: un reflejo rojo que se mece en el paño y la peana
  c_luz(R, 160, 70, 90, 70, hex('#ffe0c8'), 0.22);
  { const dx = Math.round(Math.sin(t * 0.8) * 10); c_luz(R, 160 + dx, 142, 40, 8, hex('#ff5a4a'), 0.45); c_luz(R, 160 + dx, 142, 20, 4, hex('#ffb0a0'), 0.4); }
  copa(R, 160, 140, t, { tipo: 'agata', s: 5, brillo: o.brillo ?? 0.5 });
  // el cristal de la vitrina: el marco fino, el canto y los reflejos que pasan
  rect(58, 10, 262, 11, hex('#c8d0d8')); rect(58, 10, 59, 147, hex('#a8b0b8')); rect(261, 10, 262, 147, hex('#a8b0b8'));
  const u = (t % 6) / 6, rx = Math.round(20 + u * 300); for (let y = 12; y < 146; y++) { const x = rx + Math.round((146 - y) * 0.5) - 60; for (let i = 0; i < 6; i++) if (x + i > 60 && x + i < 261) c_tine(R, x + i, y, C.blanco, i < 2 ? 0.35 : 0.15); for (let i = 0; i < 2; i++) if (x + 12 + i > 60 && x + 12 + i < 261) c_tine(R, x + 12 + i, y, C.blanco, 0.2); }
  for (let k = 0; k < 8; k++) { const a = (t * 0.2 + k / 8) % 1, x = Math.round(80 + h(k, 1, 571) * 160), y = Math.round(140 - a * 120); if (a < 0.85) pset(x, y, hex('#fff0e0')); }
  return { copa: [160, 140], arriba: 80, vitrina: [58, 10, 262, 147], atom: [297, 24] };
}

// los perfiles de las copas: medio ancho por fila (12 filas a s = 1, de arriba abajo), el papel de cada fila y sus colores
const c_COPAS = (() => {
  const oro = [hex('#fff0a0'), hex('#e8b830'), hex('#a87818')], plata = [hex('#ffffff'), hex('#c8ccd4'), hex('#7a808c')], agata = [hex('#e86a5a'), hex('#b8323a'), hex('#6a1420')];
  return {
    agata: { w: [5, 5, 4.6, 4, 3, 1, 1.8, 1, 1.4, 3.4, 4.4, 5.4], r: ['copa', 'copa', 'copa', 'copa', 'copa', 'tallo', 'nudo', 'tallo', 'tallo', 'pie', 'pie', 'pie'], c: { copa: agata, tallo: oro, nudo: oro, pie: [hex('#c84a44'), hex('#9a2a30'), hex('#5a1018')] }, vetas: true, asas: true },
    oro: { w: [5, 5, 4.5, 4, 3, 1, 1, 2, 1, 2, 3.5, 5], r: ['copa', 'copa', 'copa', 'copa', 'copa', 'tallo', 'tallo', 'nudo', 'tallo', 'pie', 'pie', 'pie'], c: { copa: oro, tallo: oro, nudo: oro, pie: oro }, metal: true },
    plata: { w: [4.5, 4.5, 4.5, 4, 3, 1, 2, 1, 1, 2.5, 4, 4.5], r: ['copa', 'copa', 'copa', 'copa', 'copa', 'tallo', 'nudo', 'tallo', 'tallo', 'pie', 'pie', 'pie'], c: { copa: plata, tallo: plata, nudo: plata, pie: plata }, metal: true },
    madera: { w: [4, 4, 4, 4, 4, 4, 3.8, 3.6, 3.4, 3.4, 4, 4], r: Array(12).fill('copa'), c: { copa: [hex('#b07a48'), hex('#8a5a32'), hex('#5a3a1e')] }, grano: true },
    barro: { w: [3.5, 4, 4.5, 5, 5, 5, 4.5, 4, 3.5, 3, 3.5, 4], r: Array(12).fill('copa'), c: { copa: [hex('#e09a6a'), hex('#c06a3e'), hex('#7a3e22')] }, franja: hex('#3a2418') },
    cristal: { w: [4.5, 4.5, 4.2, 3.8, 3, 0.8, 0.8, 1.6, 0.8, 2, 3.5, 4.5], r: ['copa', 'copa', 'copa', 'copa', 'copa', 'tallo', 'tallo', 'nudo', 'tallo', 'pie', 'pie', 'pie'], c: { copa: plata, nudo: [hex('#ffffff'), hex('#d8ecf8'), hex('#a8c8e0')] }, cristal: true },
  };
})();

// la paleta del sur de Francia (caliza, teja, garriga, Pirineos), del despacho y de la librería
const d_PRq = pal({
  cal: '#dcc8a0', calS: '#b09a72', calL: '#f0e2bc', calJ: '#8e7a5a', calD: '#7a6648',
  teja: '#c0603a', tejaS: '#8a3e28', tejaL: '#e08a5a', tejaD: '#5e2a1c', pizarra: '#4a4e62', pizarraL: '#6e7488',
  piri: '#8494c4', piriS: '#6a78a8', piriN: '#f2f4fa', piriNS: '#c4cce4', bruma: '#c8d6ec', medio: '#7a9480', medioS: '#5e7a6a', medioB: '#a8bcc0',
  gar: '#7a8a46', garS: '#56662e', garL: '#9aaa58', garD: '#3a4a22', roca: '#bcae8a', rocaS: '#8a7c5e', ocre: '#c8a068', ocreS: '#9a7448',
  cipres: '#2e4a2a', cipresL: '#4a6a3a', camino: '#d8c094', caminoS: '#b09868', caminoL: '#ecd8ac',
  villa: '#ecdcc0', villaS: '#c4b090', villaL: '#fff4dc', persiana: '#5a8a6a', persianaS: '#3a6a4a',
  vidrio: '#a8d0e0', vidrioS: '#6a98b0', agua: '#5a9ac0', aguaL: '#a8d8f0', aguaS: '#3a7098',
  oveja: '#ece6d4', ovejaS: '#b8b0a0',
  papel: '#c8b48a', papelS: '#a08a64', papelL: '#e0cca0', zocalo: '#6a4228', zocaloS: '#4a2c1a', zocaloL: '#8a5a38', suelo: '#8a5a34', sueloS: '#6a4226', sueloL: '#a8743e',
  sobre: '#f0e8d4', sobreS: '#c8bca0', sobreA: '#e8d8b0', sello: '#c84a3a', te: '#9a6a3a', teS: '#7a4a24', teL: '#b88a5a',
  libR: '#c83a3a', libA: '#2a5aa8', libV: '#3a8a4a', libM: '#e8c040', libN: '#2a2430', libB: '#e8e0cc', libP: '#8a3a8a',
});

// lo fijo se pinta una vez en un búfer de R.nuevo() y se reutiliza (clave: encuadre y opciones fijas)
const d_cacheRq = new Map();

function d_capaRq(R, clave, pinta) {
  let b = d_cacheRq.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); pinta(); R.usar(prev); d_cacheRq.set(clave, b); }
  return b;
}

// pega una capa con huecos (0 = transparente) desde la fila y0 hasta la y1
function d_pegarRq(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = Math.max(0, y0) * 320, n = (Math.min(179, y1) + 1) * 320; i < n; i++) { const c = b[i]; if (c) B[i] = c; } }

const d_BAYRq = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const d_umbralRq = (x, y) => d_BAYRq[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function d_mezclaRq(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// oscurece (f < 1) o aclara hacia c lo ya pintado en una elipse (sombras al pie y charcos de luz)
function d_sombraRq(R, cx, cy, rx, ry, a = 0.3, c = C.k) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const p = R.pget(x, cy + j); if (p) R.pset(x, cy + j, d_mezclaRq(p, c, a)); } }
}

// los cielos: [fracción de la altura hasta el horizonte, color] y los tres tonos de sus nubes
const d_CIELORq = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.22, '#4aa6ea'], [0.45, '#74bef2'], [0.68, '#94ccf2'], [0.86, '#b4def4'], [1, '#dcecf0']],
  sur: [[0, '#2e7ad4'], [0.2, '#4a9ae4'], [0.42, '#6cb4ee'], [0.64, '#94caf0'], [0.84, '#c0e0f0'], [1, '#f0eadc']],
  tarde: [[0, '#2a2860'], [0.16, '#463a80'], [0.32, '#7a4284'], [0.46, '#b2547a'], [0.6, '#dc6c62'], [0.74, '#f0925a'], [0.87, '#f8c272'], [1, '#fde6a8']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [1, '#3e4678']],
  calor: [[0, '#3a86d0'], [0.25, '#5aa2dc'], [0.5, '#88bce4'], [0.72, '#b8d4e4'], [0.88, '#e0e2d4'], [1, '#f4e6c4']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const d_NUBERq = Object.fromEntries(Object.entries({ dia: ['#a8d0ee', '#d6ecfa', '#ffffff'], sur: ['#a8d0ee', '#d6ecfa', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#1a2048', '#262e58', '#343e6c'], calor: ['#c4d4e0', '#e8eef0', '#ffffff'] }).map(([k, v]) => [k, v.map(hex)]));

// el degradado tramado del cielo hasta hor (fijo: va en la capa del fondo), y el halo del sol si lo hay
function d_degradadoRq(R, hor, modo, sol = null) {
  const B = R.buf, P = d_CIELORq[modo], lim = P.map(([f]) => Math.round(f * hor)), tr = 3;
  for (let y = 0; y < 180; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = d_umbralRq(x, y) < p ? b : a;
  }
  if (modo === 'noche') for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 901) * 319), y = Math.round(h(k, 2, 901) ** 1.3 * (hor - 8)); if (x > 272 && y < 48) continue; B[y * 320 + x] = k % 3 ? hex('#8a94c0') : C.blanco; }
  if (sol) { const [sx, sy, sr] = sol, gl = modo === 'tarde' ? hex('#ffe6a0') : hex('#fff8dc'), R2 = sr + (modo === 'tarde' ? 22 : 12);
    for (let y = Math.max(0, sy - R2); y <= Math.min(179, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
      const d = Math.hypot(x - sx, y - sy); if (d > R2) continue; if (d <= sr) { B[y * 320 + x] = d > sr - 1 ? hex('#ffe28a') : d < sr * 0.45 && x < sx && y < sy ? hex('#fffcec') : hex('#fff4c8'); continue; }
      const q = 1 - (d - sr) / (R2 - sr); if (d_umbralRq(x, y) < q * q) B[y * 320 + x] = d_mezclaRq(B[y * 320 + x], gl, 0.45); } }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana
function d_nubeRq(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// las nubes que pasan, cada frente a su velocidad: cirros lejanos casi quietos, cúmulos lejanos lentos y cercanos rápidos;
// la zona de Atom y la barra del año quedan libres (no hay cúmulos por encima de y 22 ni a la derecha de x 268 arriba)
function d_nubesRq(R, t, hor, modo, n = 5, o = {}) {
  const cn = d_NUBERq[modo], atom = (x, y) => (x > 270 && y < 48) || (y < 16 && x > 16 && x < 174);
  for (let k = 0; k < 3; k++) { const w = 30 + Math.round(h(k, 5, 902) * 40), x0 = ((h(k, 6, 902) * 440 + t * (0.6 + k * 0.25)) % 470) - 80, y = Math.round(Math.max(20, hor * (0.2 + k * 0.12)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 903) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      R.pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, cn[2]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 28 + k * 9 : 13 + ((k * 7) % 9), v = (cerca ? 3.4 + k * 1.1 : 1.2 + k * 0.3) * (o.v ?? 1), y = Math.round(cerca ? Math.max(30, hor * 0.32) + k * hor * 0.12 : Math.max(26, hor * (0.46 + (k - 2) * 0.09))), x = ((h(k, 7, 904 + (o.sem ?? 0)) * 470 + t * v) % 500) - 90;
    if (y < (o.ymax ?? 999)) d_nubeRq(R, Math.round(x), y, w, k, cn); }
}

// pájaros lejanos: n uves que aletean y cruzan despacio entre y0 e y0 + 14 (c: su color)
function d_pajarosRq(R, t, n, y0, c = hex('#2a2436'), v = 9) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, 905) * 400 + t * (v + k * 1.5)) % 420) - 50), y = Math.round(y0 + h(k, 2, 905) * 14 + Math.sin(t * 0.8 + k) * 2), a = Math.floor(t * 6 + k * 1.3) % 2;
    if (x > 268 && y < 48) continue; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a, c); R.pset(x + 2, y - 1 + a, c); }
}

// una sierra lejana (cresta de senos con la semilla sem entre y0 − amp e y0, rellena hasta yb) que se funde con la bruma;
// o.nieve: color de la nieve por encima de o.nieveY (con su sombra o.nieveS en las laderas de la izquierda), o.filo
function d_sierraRq(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.5 + 0.28 * Math.sin(x * 0.021 + sem) + 0.16 * Math.sin(x * 0.057 + sem * 2.3) + 0.08 * Math.abs(Math.sin(x * 0.16 + sem * 4.1)))); cresta[x] = yc;
    const pend = x > 0 ? yc - cresta[x - 1] : 0;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 9) / 10; let col = c;
      if (o.nieve != null && y < o.nieveY - h(x >> 1, 3, sem) * 5 && y - yc < 8 + h(x >> 2, 4, sem) * 6) col = pend > 0 || (y - yc > 3 && h(x, y, sem) < 0.3) ? o.nieveS : o.nieve;
      else if (o.sombra != null && pend > 0 && y - yc < 10 + (x % 5)) col = o.sombra;
      B[y * 320 + x] = p > 0 && d_umbralRq(x, y) < p ? bruma : col; }
    if (o.filo != null && yc >= 0 && (x * 7 + sem * 3) % 5) B[yc * 320 + x] = o.filo;
  }
  return cresta;
}

// sillería o mampostería en un rectángulo: hiladas de alto a, piezas de 6–12 px a matajunta, cada una con su tono, el
// canto de luz arriba a la izquierda y la sombra abajo; P = [c, cS, cL, cJ]
function d_sillarRq(R, x0, y0, x1, y1, P, k = 0, a = 5) {
  const [c, cS, cL, cJ] = P;
  for (let y = y0; y <= y1; y++) { const f = Math.floor((y - y0) / a), yy = (y - y0) % a, off = Math.floor(h(f, 0, 910 + k) * 9);
    for (let x = x0; x <= x1; x++) { const u = x + off, w = 7 + Math.floor(h(f, Math.floor(u / 9), 911 + k) * 4), b = Math.floor(u / w), xx = u - b * w, q = h(b, f, 912 + k);
      let col = q < 0.18 ? cS : q > 0.86 ? cL : c;
      if (yy === a - 1 || xx === 0) col = cJ; else if (yy === 0 || xx === 1) col = q > 0.5 ? cL : c; else if (xx === w - 1 || yy === a - 2) col = cS;
      if (h(x, y, 913 + k) < 0.04) col = cS;
      R.pset(x, y, col); } }
}

// un tejado de teja árabe: las canales verticales con su sombra, las hiladas y el alero en sombra; pts: el polígono
function d_tejadoRq(R, pts, P = [d_PRq.teja, d_PRq.tejaS, d_PRq.tejaL, d_PRq.tejaD], k = 0) {
  const [c, cS, cL, cD] = P, ys = pts.map((p) => p[1]), ymx = Math.max(...ys);
  R.poligono(pts, (x, y) => { const m = (x + k) % 3, fila = (y + k) % 3; if (y >= ymx - 1) return cD; if (m === 0) return cS; if (fila === 0) return cD; return m === 1 ? (h(x, y >> 1, 914 + k) < 0.12 ? cS : cL) : c; });
}

// una casa del pueblo: muros de mampostería, tejado de teja a una o dos aguas, ventanas con postigos (alguna cerrada),
// la puerta y la chimenea; devuelve la boca de la chimenea [x, y] (para el humo)
function d_casaRq(R, x0, base, w, alto, k = 0, o = {}) {
  const { rect, pset } = R, P = o.P ?? [d_PRq.cal, d_PRq.calS, d_PRq.calL, d_PRq.calJ], y0 = base - alto;
  d_sillarRq(R, x0, y0, x0 + w, base, P, k, alto > 14 ? 4 : 3);
  rect(x0 + w - Math.max(2, w >> 3), y0, x0 + w, base, P[1]);   // el lado en sombra
  const dosAguas = o.aguas ?? (k % 2 === 0), cum = dosAguas ? [x0 + w / 2, y0 - Math.round(w * 0.28)] : null;
  if (dosAguas) d_tejadoRq(R, [[x0 - 2, y0 + 1], cum, [x0 + w + 2, y0 + 1]], undefined, k); else d_tejadoRq(R, [[x0 - 2, y0 + 1], [x0 - 2, y0 - 4], [x0 + w + 2, y0 - 1], [x0 + w + 2, y0 + 1]], undefined, k);
  rect(x0 - 2, y0 + 1, x0 + w + 2, y0 + 1, d_PRq.tejaD);
  const pv = o.postigo ?? [d_PRq.persiana, d_PRq.persianaS, hex('#7a5a3a'), hex('#4a6a9a')][k % 4];
  for (let i = 0; i < (o.ventanas ?? Math.max(1, Math.floor(w / 9))); i++) { const vx = x0 + 3 + i * 9, vy = y0 + 3; if (vx + 3 > x0 + w - 2) break;
    if (h(i, k, 915) < 0.3) { rect(vx, vy, vx + 3, vy + 3, pv); pset(vx + 1, vy + 1, C.k); } else { rect(vx, vy, vx + 3, vy + 3, C.k); pset(vx + 1, vy + 1, o.luz ?? hex('#3a3040')); rect(vx - 1, vy, vx - 1, vy + 3, pv); rect(vx + 4, vy, vx + 4, vy + 3, pv); }
    if (alto > 14) { rect(vx, vy + 8, vx + 3, vy + 12, C.k); rect(vx - 1, vy + 8, vx - 1, vy + 12, pv); } }
  if (o.puerta !== false) { const px = x0 + w - 7; rect(px, base - 6, px + 3, base, hex('#4a2e1c')); rect(px, base - 6, px + 3, base - 6, d_PRq.calD); }
  const ch = [Math.round(x0 + w * 0.7), Math.round(dosAguas ? y0 - w * 0.12 : y0 - 3)];
  rect(ch[0], ch[1] - 4, ch[0] + 2, ch[1], d_PRq.calS); rect(ch[0] - 1, ch[1] - 5, ch[0] + 3, ch[1] - 5, d_PRq.tejaS);
  return [ch[0] + 1, ch[1] - 6];
}

// el humo de una chimenea: bocanadas que suben, se ensanchan, se tuercen con el viento y se deshacen
function d_humoRq(R, t, x, y, n = 6, c = hex('#e8e4ec'), cS = hex('#b8b4c4')) {
  for (let i = 0; i < n; i++) { const u = ((t * 0.32 + i / n) % 1), yy = Math.round(y - u * 26), xx = Math.round(x + u * u * 16 + Math.sin(t * 1.5 + i) * u * 2), r = 1 + u * 3;
    if (h(i, Math.floor(t * 0.32 + i / n), 916) < 0.15) continue;
    for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) if (k * k + j * j <= r * r && d_umbralRq(xx + k, yy + j) < 1 - u * 0.75) R.pset(xx + k, yy + j, j > r / 3 ? cS : c); }
}

// una figurita lejana (~10 px de alto, gente de fondo): piernas, cuerpo de su color, cabeza y pelo o sombrero; o.anda,
// o.dir, o.pala (cava: la pala sube y baja), o.lampara (lleva un farol que brilla), o.som (color del sombrero)
function d_figuraRq(R, x, suelo, t, col, o = {}) {
  const { pset, rect } = R; x = Math.round(x); suelo = Math.round(suelo);
  const piel = o.piel ?? hex('#e0aa80'), pie = o.pierna ?? hex('#3a3040'), dir = o.dir ?? 1, p = o.anda ? Math.floor(t * 5 + x * 0.1) % 2 : 0, cav = o.pala ? Math.round((Math.sin(t * 4 + x) + 1) * 1.5) : 0;
  rect(x + p, suelo - 2, x + p, suelo, pie); rect(x + 2 - p, suelo - 2, x + 2 - p, suelo, pie);
  rect(x, suelo - 6 + (o.pala ? 1 : 0), x + 2, suelo - 3, col); pset(x + (dir > 0 ? 2 : 0), suelo - 5, d_mezclaRq(col, C.blanco, 0.3)); pset(x + (dir > 0 ? 0 : 2), suelo - 3, d_mezclaRq(col, C.k, 0.35));
  const hy = suelo - 8 + (o.pala ? 1 + (cav > 1 ? 1 : 0) : 0); rect(x, hy, x + 1, hy + 1, piel); pset(x + (dir > 0 ? 2 : -1), hy + 1, piel);
  if (o.som != null) { rect(x - 1, hy - 1, x + 2, hy - 1, o.som); rect(x, hy - 2, x + 1, hy - 2, o.som); } else { rect(x, hy - 1, x + 1, hy - 1, o.pelo ?? hex('#4a3020')); pset(x + (dir > 0 ? 0 : 1), hy, o.pelo ?? hex('#4a3020')); }
  if (o.pala) { const px = x + (dir > 0 ? 4 : -2), py = suelo - 3 - cav; R.linea(px - dir * 2, py - 4, px, py, hex('#8a6a3a')); rect(px - 1 + (dir > 0 ? 1 : 0), py, px + (dir > 0 ? 1 : 0), py + 1, C.metal ?? hex('#9aa4b4')); }
  if (o.lampara) { const lx = x + (dir > 0 ? 3 : -1), ly = suelo - 4; pset(lx, ly, hex('#fff0a0')); pset(lx, ly + 1, hex('#e8a030')); if (Math.sin(t * 9 + x) > -0.6) { pset(lx - 1, ly, hex('#ffd870')); pset(lx + 1, ly, hex('#ffd870')); pset(lx, ly - 1, hex('#ffd870')); } }
}

// un cipres que se mece (x, base: el pie; alto)
function d_cipresRq(R, x, base, alto, t, c = d_PRq.cipres, cL = d_PRq.cipresL) {
  const m = Math.sin(t * 1.2 + x) * 0.8;
  R.rect(x, base - 2, x + 1, base, hex('#4a3020'));
  for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.round(Math.sin(Math.min(1, u * 1.25) * Math.PI * 0.92) * (alto / 9) + 0.6), sx = Math.round(x + m * (1 - u) * (1 - u) * 1.5), y = base - 2 - (alto - j);
    for (let i = -w; i <= w + 1; i++) R.pset(sx + i, y, i <= -w + 1 ? C.k : i > w - 1 && j % 3 !== 0 ? cL : (h(sx + i, y, 917) < 0.2 ? cL : c)); }
}

// una mata de garriga o de jardín (redonda, de tres tonos)
function d_mataRq(R, x, y, r, c = d_PRq.gar, cS = d_PRq.garS, cL = d_PRq.garL) {
  R.disco(x, y + 1, r, cS); R.disco(x - 0.5, y, r * 0.86, c); R.disco(x - 1, y - 1, r * 0.45, cL); if (r > 2) R.pset(Math.round(x + r * 0.4), Math.round(y - r * 0.2), cL);
}

// un hoyo de buscador: la boca oscura con el fondo en sombra, el labio de tierra y el montón al lado (con piedras)
function d_hoyoRq(R, x, y, w, k = 0, pala = false) {
  const { disco, pset, linea } = R, r = w / 2, ry = Math.max(1, Math.round(w / 5));
  const mx = x + (k % 2 ? -1 : 1) * Math.round(w * 0.75);
  for (let j = 0; j <= Math.round(w * 0.35); j++) { const ww = Math.round(w * 0.45 * Math.sqrt(1 - j / (w * 0.35 + 1))); R.rect(mx - ww, y - j, mx + ww, y - j, j > w * 0.2 ? hex('#a8845a') : hex('#8a6a44')); }
  for (let i = 0; i < w / 2; i++) pset(mx - Math.round(w * 0.4) + Math.round(h(i, k, 918) * w * 0.8), y - Math.round(h(i, k, 919) * w * 0.25), i % 2 ? hex('#6a4e30') : hex('#c8a87a'));
  for (let j = -ry - 1; j <= ry + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const e = (i / (r + 1)) ** 2 + (j / (ry + 1)) ** 2; if (e <= 1) pset(x + i, y + j, e > 0.62 ? (j < 0 ? hex('#6a4e30') : hex('#a8845a')) : j < 0 ? hex('#1c1222') : hex('#3a2a1e')); }
  if (pala) { const px = mx + (k % 2 ? -2 : 2); linea(px, y - Math.round(w * 0.3) - 9, px, y - Math.round(w * 0.3), hex('#8a6a3a')); R.rect(px - 1, y - Math.round(w * 0.3) - 10, px + 1, y - Math.round(w * 0.3) - 10, hex('#5a3a1a')); R.rect(px - 1, y - Math.round(w * 0.3) + 1, px + 1, y - Math.round(w * 0.3) + 3, hex('#9aa4b4')); }
}

// el labio delantero de un hoyo, que va POR DELANTE del personaje que sale de él (x, y: centro; w: su ancho)
export function d_bordeHoyo(R, x, y, w) {
  const r = w / 2, ry = Math.max(1, Math.round(w / 5));
  for (let j = 0; j <= ry + 3; j++) for (let i = -r - 2; i <= r + 2; i++) { const e = (i / (r + 1.5)) ** 2 + (j / (ry + 1.5)) ** 2, e2 = (i / (r - 0.5)) ** 2 + (j / Math.max(1, ry - 0.5)) ** 2;
    if (e <= 1 && e2 > 1) R.pset(x + i, y + j, j > ry ? hex('#8a6a44') : (i + j) % 3 ? hex('#a8845a') : hex('#c8a87a')); }
  for (let i = 0; i < 5; i++) R.pset(x - r + Math.round(h(i, 1, 919) * w), y + ry + 1, hex('#6a4e30'));
}

// el cartel de «prohibido cavar»: el poste de madera y la placa blanca con la pala tachada en rojo (pictograma, sin
// letras); x: el poste, y: la base del poste; o.ang (radianes) lo inclina al caer; o.alto (largo del poste)
export function d_cartelPala(R, x, y, o = {}) {
  const a = o.ang ?? 0, L = o.alto ?? 30, s = Math.sin(a), c = Math.cos(a), P = (u, v) => [Math.round(x + u * c - v * s), Math.round(y + u * s + v * c)];
  for (let v = 0; v >= -L; v--) for (let u = -1; u <= 1; u++) { const [px, py] = P(u, v); R.pset(px, py, u === 1 ? hex('#5a3a1a') : u === -1 ? hex('#a8743c') : hex('#83552c')); }
  const cy = -L - 6;
  for (let v = -9; v <= 9; v++) for (let u = -10; u <= 10; u++) { const [px, py] = P(u, cy + v); const borde = Math.abs(u) === 10 || Math.abs(v) === 9; R.pset(px, py, borde ? C.k : Math.abs(u) === 9 || Math.abs(v) === 8 ? hex('#c8c4bc') : hex('#f6f2ea')); }
  for (let v = -7; v <= 7; v++) for (let u = -7; u <= 7; u++) { const d = Math.hypot(u, v), [px, py] = P(u, cy + v); if (d <= 7.4 && d > 5.6) R.pset(px, py, hex('#c83a3a')); }
  const pala = (u, v, col) => { const [px, py] = P(u, cy + v); R.pset(px, py, col); };
  for (let k = -4; k <= 2; k++) pala(k, -k, hex('#5a3a1a'));   // el mango de la pala, en diagonal
  for (const [u, v] of [[2, -3], [3, -3], [3, -4], [4, -4], [4, -5], [2, -4], [3, -5], [4, -3], [5, -5]]) pala(u - 1, -v - 1 + 1, hex('#4a5262'));
  pala(-4, 4, hex('#5a3a1a')); pala(-5, 4, hex('#5a3a1a')); pala(-5, 5, hex('#5a3a1a'));
  for (let k = -5; k <= 5; k++) { pala(k, k, hex('#c83a3a')); pala(k + 1, k, hex('#c83a3a')); }   // la barra roja que la tacha
  return P(0, cy);
}

// F · la colina con el pueblo (general)
function d_rnColina(R, t, o) {
  const P = d_PRq, anyo = o.anyo ?? 1905, ag = o.agujeros ?? 0, rico = anyo >= 1900, hor = 112;
  const cresta = (x) => { const s = (u) => u * u * (3 - 2 * u); let y = x < 40 ? 132 : x < 150 ? 132 - 58 * s((x - 40) / 110) : x < 292 ? 74 : 74 + 26 * s(Math.min(1, (x - 292) / 40)); return Math.round(y + Math.sin(x * 0.21) * 1.2 + h(x >> 2, 1, 920) * 1.5); };
  const fondo = d_capaRq(R, 'rn-col-f', () => d_degradadoRq(R, hor, 'sur', [58, 34, 8]));
  const chimeneas = [];
  const capa = d_capaRq(R, `rn-col-c-${rico}-${Math.round(ag * 10)}`, () => {
    const { rect, pset, linea } = R;
    d_sierraRq(R, 94, 40, 124, P.piri, P.bruma, 2.1, { nieve: P.piriN, nieveS: P.piriNS, nieveY: 76, sombra: P.piriS });
    d_sierraRq(R, 108, 14, 136, P.medio, P.medioB, 5.3, { sombra: P.medioS });
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 921) * 319), y = 102 + Math.round(h(k, 2, 921) * 24); rect(x, y - 2, x, y, P.medioS); rect(x - 1, y, x + 1, y, P.medioS); }   // pinos lejanos
    // la colina de Rennes: garriga moteada, la ladera de la izquierda en sombra, terrazas de piedra seca y rocas
    for (let x = 0; x < 320; x++) { const yc = cresta(x), pend = cresta(Math.min(319, x + 2)) - cresta(Math.max(0, x - 2));
      for (let y = yc; y < 150; y++) { const q = h(x >> 1, y >> 1, 922), d = y - yc;
        let c = q < 0.16 ? P.garS : q > 0.82 ? P.garL : P.gar; if (pend < -1 && d < 30 && d_umbralRq(x, y) < 0.45) c = d_mezclaRq(c, P.garD, 0.4);
        if (d === 0) c = P.garL; if (h(x >> 3, y >> 2, 923) < 0.1 && d > 3) c = (y & 1) ? P.roca : P.rocaS;
        if (d > 6 && (y + Math.round(x * 0.08)) % 11 === 0 && h(x >> 4, y, 924) < 0.7) c = P.rocaS;   // terrazas
        pset(x, y, c); } }
    for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 925) * 319), yc = cresta(x), y = yc + 4 + Math.round(h(k, 2, 925) ** 1.3 * (146 - yc)); if (y < 148) d_mataRq(R, x, y, 1 + Math.round(h(k, 3, 925) * 2)); }
    // viñas en hileras, un campo segado y olivos en la ladera
    for (const [x0, y0, w, a] of [[56, 118, 40, 12], [168, 104, 46, 14], [230, 112, 50, 12], [96, 132, 50, 10]]) for (let y = y0; y < y0 + a; y++) for (let x = x0 - (y - y0); x < x0 + w - (y - y0); x++) if (y >= cresta(Math.max(0, Math.min(319, x))) + 2) pset(x, y, (y - y0) % 3 === 0 ? ((x + y) % 2 ? hex('#4a6a2a') : hex('#6a8a3a')) : (x0 === 230 ? (x % 4 ? hex('#d8c070') : hex('#b8a050')) : hex('#a88a5a')));
    for (let k = 0; k < 18; k++) { const x = 40 + Math.round(h(k, 1, 926) * 260), yc = cresta(x), y = yc + 8 + Math.round(h(k, 2, 926) * (140 - yc - 8)); if (y < 144 && !(x > 196 && y < 100)) { rect(x, y - 1, x, y + 1, hex('#5a4a3a')); d_mataRq(R, x, y - 3, 2.5, hex('#8a9a7a'), hex('#5e6e56'), hex('#aab89a')); } }
    // el camino que sube en zigzag hasta la puerta del pueblo
    const cam = [[0, 148], [70, 140], [128, 128], [84, 116], [124, 104], [104, 96], [146, 86], [196, 77]];
    for (let i = 0; i + 1 < cam.length; i++) { const [ax, ay] = cam[i], [bx, by] = cam[i + 1]; linea(ax, ay + 1, bx, by + 1, P.caminoS); linea(ax, ay, bx, by, P.camino); linea(ax, ay - 1, bx, by - 1, P.caminoL); }
    // el pueblo: casas apiñadas, la iglesia con su torre y el muro de la plaza
    const casas = [[206, 82, 16, 12], [222, 84, 12, 10], [258, 82, 14, 13], [272, 84, 16, 11], [286, 86, 12, 10], [198, 90, 12, 9], [234, 92, 18, 10], [262, 93, 14, 9], [280, 95, 16, 10]];
    rect(196, 80, 300, 98, P.calS); for (let x = 196; x <= 300; x++) if (h(x, 1, 926) < 0.4) pset(x, 98, P.calJ);
    casas.forEach(([x, b, w, a], k) => { if (k < 5) chimeneas.push(d_casaRq(R, x, b, w, a, k)); });
    // la iglesia de Santa María Magdalena: la nave, el ábside, la torre cuadrada con su chapitel de pizarra
    d_sillarRq(R, 232, 66, 258, 84, [P.cal, P.calS, P.calL, P.calJ], 7, 4); rect(254, 66, 258, 84, P.calS);
    d_tejadoRq(R, [[230, 67], [244, 58], [260, 67]], undefined, 3); rect(230, 67, 260, 67, P.tejaD);
    d_sillarRq(R, 236, 46, 246, 66, [P.cal, P.calS, P.calL, P.calJ], 8, 4); rect(244, 46, 246, 66, P.calS);
    R.poligono([[234, 47], [241, 34], [248, 47]], (x, y) => (x + y) % 3 === 0 ? P.pizarraL : P.pizarra); rect(234, 47, 248, 47, C.k);
    rect(239, 50, 242, 55, C.k); pset(240, 52, hex('#a87a30')); rect(241, 30, 241, 34, C.k); rect(240, 31, 242, 31, C.k);   // la ventana de la campana y la cruz
    rect(248, 72, 250, 77, C.k); rect(236, 72, 238, 77, C.k);
    casas.forEach(([x, b, w, a], k) => { if (k >= 5) chimeneas.push(d_casaRq(R, x, b, w, a, k)); });
    if (rico) {
      // la villa Betania, el jardín, el mirador con su balaustrada y la torre Magdala al borde del cortado
      rect(140, 82, 200, 86, P.calS); for (let x = 140; x <= 200; x += 3) { rect(x, 79, x, 82, P.calL); } rect(140, 78, 200, 78, P.calL);
      for (let k = 0; k < 8; k++) d_mataRq(R, 152 + k * 6, 76 - (k % 2), 2.5, hex('#3a6a2a'), hex('#24521a'), hex('#5a9a3a'));
      d_sillarRq(R, 162, 60, 186, 76, [P.villa, P.villaS, P.villaL, P.calS], 11, 4); rect(183, 60, 186, 76, P.villaS);
      d_tejadoRq(R, [[160, 61], [166, 54], [182, 54], [188, 61]], undefined, 1); rect(160, 61, 188, 61, P.tejaD);
      for (const vx of [165, 171, 177]) { rect(vx, 63, vx + 2, 66, C.k); rect(vx, 70, vx + 2, 74, C.k); rect(vx - 1, 63, vx - 1, 66, P.persiana); rect(vx + 3, 63, vx + 3, 66, P.persiana); }
      d_sillarRq(R, 144, 52, 154, 82, [P.cal, P.calS, P.calL, P.calJ], 12, 4); rect(152, 52, 154, 82, P.calS);
      for (let x = 143; x <= 155; x += 2) rect(x, 49, x, 52, P.cal); rect(143, 52, 155, 52, P.calJ);   // almenas
      rect(154, 46, 157, 52, P.calL); for (let x = 153; x <= 158; x += 2) pset(x, 45, P.calL); rect(148, 58, 149, 63, C.k); rect(148, 68, 149, 72, C.k);
      R.poligono([[192, 76], [194, 68], [206, 68], [208, 76]], (x, y) => (x % 3 === 0 || y === 72) ? P.vidrioS : P.vidrio);   // el invernadero
    } else {
      for (let k = 0; k < 9; k++) d_mataRq(R, 150 + k * 6, 78 - (k % 2), 2, P.gar, P.garS, P.garL);
      d_sillarRq(R, 168, 72, 180, 79, [P.cal, P.calS, P.calL, P.calJ], 13, 3); R.poligono([[167, 73], [170, 69], [176, 72], [181, 73]], P.tejaS);   // la choza en ruinas
    }
    // el primer plano: la cuneta con hierba, el murete de piedra seca, la cruz del camino y el camino de tierra
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 156) { const q = h(x >> 1, y, 927); c = q < 0.2 ? P.garS : q > 0.75 ? P.garL : P.gar; if (y === 146) c = P.garD; }
      else { const rod = Math.abs(y - 166) < 2 || Math.abs(y - 175) < 1, q = h(x >> 1, y, 928); c = rod ? P.caminoS : q < 0.12 ? P.caminoS : q > 0.88 ? P.caminoL : P.camino; if (y === 156) c = P.garD; if (y === 157) c = P.caminoS; }
      pset(x, y, c); }
    for (let x = 0; x < 320; x++) { if (h(x >> 3, 2, 929) < 0.7) { pset(x, 165, P.caminoS); pset(x, 167, hex('#9a8458')); pset(x, 174, P.caminoS); pset(x, 176, hex('#9a8458')); } }
    for (const [cx, cy, rx] of [[120, 171, 9], [214, 168, 6]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 2.5) ** 2 < 1) pset(cx + i, cy + j, j < 0 ? hex('#94caf0') : hex('#6cb4ee'));
    for (let k = 0; k < 24; k++) { const x = Math.round(h(k, 1, 941) * 319), y = 160 + Math.round(h(k, 2, 941) * 18); pset(x, y, P.garS); pset(x + 1, y - 1, P.gar); pset(x - 1, y - 1, P.garL); }
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 929) * 319), y = 158 + Math.round(h(k, 2, 929) * 20); rect(x, y, x + 1, y, P.rocaS); pset(x, y - 1, P.roca); }
    d_sillarRq(R, 0, 136, 70, 152, [P.roca, P.rocaS, P.cal, P.calJ], 14, 4); for (let x = 0; x <= 70; x++) if (h(x, 0, 930) < 0.5) pset(x, 135, P.roca);
    { const cx = 298; rect(cx - 4, 148, cx + 4, 154, P.rocaS); rect(cx - 3, 147, cx + 3, 147, P.roca); rect(cx - 1, 118, cx + 1, 147, P.roca); rect(cx + 1, 118, cx + 1, 147, P.rocaS); rect(cx - 6, 124, cx + 6, 126, P.roca); rect(cx - 6, 126, cx + 6, 126, P.rocaS); pset(cx - 6, 124, P.calL); }
    // los agujeros: el pueblo como un queso
    if (ag > 0) {
      const n = Math.round(ag * 34);
      for (let k = 0; k < n; k++) { const x = 20 + Math.round(h(k, 1, 931) * 280), yc = cresta(x), y = yc + 6 + Math.round(h(k, 2, 931) * (140 - yc)); if (y > 140 || (x > 196 && x < 300 && y < 100)) continue; d_hoyoRq(R, x, y, 4 + Math.round(h(k, 3, 931) * 4), k, k % 5 === 0); }
      for (let k = 0; k < Math.round(ag * 8); k++) { const x = 200 + Math.round(h(k, 1, 932) * 96), y = 96 + Math.round(h(k, 2, 932) * 4); d_hoyoRq(R, x, y, 4, k); }
      for (const [x, y, w, k] of [[40, 172, 20, 1], [104, 162, 14, 2], [228, 176, 22, 3], [284, 164, 12, 4], [20, 152, 10, 5]].slice(0, Math.max(1, Math.round(ag * 5)))) d_hoyoRq(R, x, y, w, k, k !== 3);
      d_hoyoRq(R, 160, 170, 26, 0);
    }
  });
  R.copiar(fondo);
  d_nubesRq(R, t, hor, 'sur', 5, { ymax: 70 });
  d_pajarosRq(R, t, 4, 40);
  d_pegarRq(R, capa, 28);
  const { pset, rect } = R;
  // el humo de las chimeneas, el pastor con sus ovejas en la ladera y un carro lejano que sube por el zigzag
  for (const [x, y] of [[214, 66], [264, 64], [291, 70]]) d_humoRq(R, t, x, y, 5);
  { const u = (t * 0.6) % 120, px = Math.round(30 + u * 0.5), cr = Math.round(132 - 58 * Math.max(0, Math.min(1, (px - 40) / 110)) ** 2 * (3 - 2 * Math.max(0, Math.min(1, (px - 40) / 110))));
    for (let k = 0; k < 6; k++) { const ox = px + 6 + k * 5 + Math.round(Math.sin(t * 0.7 + k) * 2), oy = Math.max(cr, 128) + 4 + (k % 2) * 3, b = Math.floor(t * 2 + k) % 3 === 0 ? 1 : 0;
      rect(ox, oy - 2, ox + 3, oy - 1, P.oveja); rect(ox, oy, ox + 3, oy, P.ovejaS); pset(ox + 4, oy - 2 + b, C.k); pset(ox + 1, oy + 1, C.k); pset(ox + 3, oy + 1, C.k); }
    d_figuraRq(R, px, Math.max(cr, 128) + 6, t, hex('#7a5a3a'), { som: hex('#3a2a1a'), anda: true }); R.linea(px + 4, Math.max(cr, 128) - 4, px + 4, Math.max(cr, 128) + 6, hex('#8a6a3a')); }
  { const cam = [[128, 128], [84, 116], [124, 104], [104, 96], [146, 86], [196, 77]], L = cam.slice(1).map((p, i) => Math.hypot(p[0] - cam[i][0], p[1] - cam[i][1])), tot = L.reduce((a, b) => a + b), u = ((t * 3.5) % tot);
    let s = u, i = 0; while (i < L.length - 1 && s > L[i]) { s -= L[i]; i++; } const f = Math.min(1, s / L[i]), x = Math.round(cam[i][0] + (cam[i + 1][0] - cam[i][0]) * f), y = Math.round(cam[i][1] + (cam[i + 1][1] - cam[i][1]) * f), d = cam[i + 1][0] > cam[i][0] ? 1 : -1;
    rect(x - 2, y - 3, x + 2, y - 1, hex('#83552c')); pset(x - 1, y, C.k); pset(x + 1, y, C.k); rect(x + d * 3, y - 3, x + d * 4, y - 1, hex('#6a5a4a')); pset(x + d * 5, y - 3, hex('#6a5a4a')); }
  // la gente diminuta que cava cuando el pueblo está lleno de hoyos
  if (ag > 0.3) for (let k = 0; k < 4; k++) { const x = [60, 120, 180, 250][k], y = [136, 122, 140, 138][k]; d_figuraRq(R, x, y, t + k, [hex('#c83a3a'), hex('#3a6aa8'), hex('#e8c040'), hex('#5a8a4a')][k], { pala: true, dir: k % 2 ? -1 : 1 }); }
  // la hierba de la cuneta que mueve el viento y los cipreses
  for (let x = 2; x < 320; x += 4) { const s = Math.round(Math.sin(t * 2.2 + x * 0.15) * 1.2), y = 146 + (x * 7) % 9; pset(x + s, y - 3, P.garL); pset(x, y - 2, P.gar); pset(x + Math.round(s / 2), y - 1, P.garS); }
  d_cipresRq(R, 14, 140, 44, t); d_cipresRq(R, 24, 142, 34, t + 1); d_cipresRq(R, 312, 150, 50, t + 2);
  if (ag > 0 && o.cartel !== false) d_cartelPala(R, 262, 160);
  return { suelo: 170, camino: [0, 319], hoyo: ag > 0 ? [160, 170, 26] : null, cartel: ag > 0 ? [262, 160] : null, iglesia: [241, 58], villa: rico ? [174, 66] : null, torre: rico ? [149, 52] : null, sol: [58, 34] };
}

// F · la plaza y la portada de la iglesia (cámara 'iglesia')
function d_rnIglesia(R, t, o) {
  const P = d_PRq, ag = o.agujeros ?? 0;
  const capa = d_capaRq(R, `rn-igl-${Math.round(ag * 10)}`, () => {
    const { rect, pset, linea } = R;
    d_degradadoRq(R, 60, 'sur');
    d_sierraRq(R, 58, 16, 70, P.piri, P.bruma, 3.7, { nieve: P.piriN, nieveS: P.piriNS, nieveY: 50, sombra: P.piriS });
    // la casa de la izquierda, con postigos, balcón de hierro y un tiesto de geranios
    d_sillarRq(R, 0, 40, 92, 150, [P.cal, P.calS, P.calL, P.calJ], 20, 5); rect(86, 40, 92, 150, P.calS);
    d_tejadoRq(R, [[0, 34], [96, 34], [96, 41], [0, 41]], undefined, 2); rect(0, 41, 96, 42, P.tejaD);
    for (const [vx, vy] of [[14, 56], [52, 56], [14, 96]]) { rect(vx - 1, vy - 1, vx + 15, vy + 23, P.calL); rect(vx, vy, vx + 14, vy + 22, C.k); rect(vx + 1, vy + 1, vx + 13, vy + 21, hex('#2a2a3a')); linea(vx + 7, vy + 1, vx + 7, vy + 21, P.calJ);
      rect(vx - 7, vy, vx - 2, vy + 22, P.persiana); rect(vx + 16, vy, vx + 21, vy + 22, P.persiana); for (let y = vy + 2; y < vy + 22; y += 2) { rect(vx - 7, y, vx - 2, y, P.persianaS); rect(vx + 16, y, vx + 21, y, P.persianaS); } }
    rect(48, 78, 72, 79, C.k); for (let x = 49; x < 72; x += 3) rect(x, 80, x, 86, C.k); rect(48, 86, 72, 87, C.k);   // el balcón
    rect(54, 74, 64, 78, hex('#b0603a')); for (let k = 0; k < 6; k++) R.disco(55 + k * 2, 72 - (k % 2), 1.5, k % 2 ? hex('#3a7a2a') : hex('#c83a3a'));
    rect(50, 116, 70, 150, C.k); rect(51, 117, 69, 150, hex('#5a3a22')); for (let y = 120; y < 150; y += 6) rect(52, y, 68, y, hex('#4a2e1a')); pset(66, 134, hex('#c8a040'));
    // la iglesia: los muros de sillería, la portada de arco con sus dovelas, el tímpano y la hornacina con la santa
    d_sillarRq(R, 96, 18, 222, 150, [P.cal, P.calS, P.calL, P.calJ], 21, 6); rect(96, 18, 99, 150, P.calL);
    R.poligono([[94, 20], [159, -6], [224, 20]], (x, y) => (x + y) % 4 === 0 ? P.calS : P.cal); rect(94, 19, 224, 20, P.calJ);
    rect(120, 54, 198, 58, P.calJ); rect(120, 52, 198, 53, P.calL);   // la cornisa
    { const cx = 150, cy = 108;   // el arco de la portada con las dovelas
      for (let y = 66; y <= 150; y++) for (let x = 120; x <= 180; x++) { const d = Math.hypot(x - cx, Math.min(0, y - cy)), a = Math.atan2(cy - y, x - cx);
        if (y < cy && d > 30) continue; if (y >= cy && Math.abs(x - cx) > 30) continue;
        let c; if (d > 22 || (y >= cy && Math.abs(x - cx) > 22)) { c = y < cy ? (((a / 0.2) % 1 + 1) % 1 < 0.14 ? P.calJ : d > 28 ? P.calS : P.calL) : (y % 7 === 0 ? P.calJ : Math.abs(x - cx) > 27 ? P.calS : P.cal); }
        else if (y < cy - 4) { c = h(x >> 1, y >> 1, 933) < 0.3 ? P.calS : P.cal; if (y === cy - 5) c = P.calJ; }   // el tímpano
        else { c = (x - 129) % 5 === 0 ? hex('#3a2414') : x < cx ? hex('#5e3a22') : hex('#4e2e1a'); if (x === cx) c = C.k; if ((y - cy) % 9 === 3 && (x - 129) % 5 === 2) c = hex('#a8a4b0'); }
        pset(x, y, c); } }
    rect(146, 88, 154, 102, C.k); rect(147, 89, 153, 101, hex('#3a2a4a'));   // la hornacina con la santa
    rect(149, 91, 151, 92, hex('#e8d0b0')); rect(148, 93, 152, 100, hex('#4a6aa8')); rect(149, 94, 151, 99, hex('#6a8ac8')); pset(150, 90, hex('#e8c040'));
    for (let y = 150; y <= 158; y += 3) rect(118 - (y - 150), y, 182 + (y - 150), y + 2, y % 2 ? P.calL : P.cal);   // las gradas
    // la torre a la derecha con la ventana de la campana y la puerta del cementerio
    d_sillarRq(R, 222, 0, 272, 150, [P.cal, P.calS, P.calL, P.calJ], 22, 6); rect(268, 0, 272, 150, P.calS);
    rect(238, 50, 256, 76, C.k); R.disco(247, 50, 9, C.k); rect(240, 50, 254, 76, hex('#2a2a3a')); R.disco(247, 50, 7, hex('#2a2a3a'));
    // el muro del cementerio con su verja de hierro: detrás, cipreses, cruces y lápidas
    for (let y = 60; y < 150; y++) for (let x = 272; x < 320; x++) if (y > 130) pset(x, y, h(x >> 1, y, 937) < 0.3 ? C.hierbaS : C.hierba);
    R.poligono([[272, 118], [292, 110], [320, 114], [320, 131], [272, 131]], (x, y) => h(x >> 1, y >> 1, 940) < 0.25 ? P.medioS : P.medio);
    for (let k = 0; k < 4; k++) d_cipresRq(R, 284 + k * 10, 132, 30 + (k % 2) * 12, k * 3);
    for (let k = 0; k < 5; k++) { const x = 276 + k * 9, y = 134 + (k % 2) * 3; rect(x, y - 8, x + 1, y, P.calL); rect(x - 2, y - 6, x + 3, y - 5, P.calL); rect(x + 1, y - 8, x + 1, y, P.calS); }
    d_sillarRq(R, 272, 136, 320, 150, [P.roca, P.rocaS, P.calL, P.calJ], 23, 4); d_sillarRq(R, 272, 92, 278, 150, [P.roca, P.rocaS, P.calL, P.calJ], 25, 4);
    for (let x = 281; x < 320; x += 4) { rect(x, 100, x, 136, C.k); pset(x, 99, hex('#5a5a68')); pset(x - 1, 100, hex('#5a5a68')); pset(x + 1, 100, hex('#5a5a68')); pset(x + 1, 112, hex('#5a5a68')); }
    rect(278, 104, 320, 105, C.k); rect(278, 128, 320, 129, C.k); for (let x = 282; x < 320; x += 8) { R.anillo(x + 2, 116, 3, C.k); }
    // el plátano de la plaza: tronco moteado de corteza que se pela, ramas y la copa (lo que se mueve va en cada fotograma)
    for (let y = 70; y < 166; y++) { const w = 5 + (y > 150 ? (y - 150) >> 2 : 0), cx = 300 + Math.round(Math.sin(y * 0.05) * 2); for (let x = cx - w; x <= cx + w; x++) { const q = h(x >> 1, y >> 2, 938); pset(x, y, x === cx - w ? hex('#4a4438') : x > cx + w - 2 ? hex('#6a6450') : q < 0.3 ? hex('#c8c09a') : q < 0.6 ? hex('#9a9478') : hex('#b0a888')); } }
    R.linea(300, 92, 270, 64, hex('#8a8470')); R.linea(301, 92, 271, 64, hex('#6a6450')); R.linea(300, 84, 318, 58, hex('#8a8470'));
    // la fachada: contrafuertes, el óculo con su vidriera, el farol de hierro, el tablón de avisos y la humedad del zócalo
    for (const x0 of [100, 204]) { d_sillarRq(R, x0, 30, x0 + 12, 150, [P.calL, P.cal, hex('#fff2d0'), P.calJ], 26 + x0, 6); rect(x0 + 10, 30, x0 + 12, 150, P.calS); R.poligono([[x0, 31], [x0 + 6, 24], [x0 + 12, 31]], P.calS); for (let y = 60; y < 150; y += 30) rect(x0, y, x0 + 12, y + 1, P.calJ); }
    { const cx = 159, cy = 34; R.disco(cx, cy, 11, P.calJ); R.disco(cx, cy, 10, P.calL); R.disco(cx, cy, 8, C.k);
      for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d > 7.5) continue; const a = Math.atan2(j, i), s = Math.floor(((a + Math.PI) / (Math.PI * 2)) * 8); pset(cx + i, cy + j, d < 2 ? hex('#e8c040') : (Math.abs(((a + Math.PI) / (Math.PI / 4)) % 1 - 0.5) > 0.42 ? C.k : [hex('#3a5ab0'), hex('#c83a3a'), hex('#e8c040'), hex('#3a8a5a')][s % 4])); } }
    { const x = 118, y = 92; rect(x, y, x + 6, y, C.k); rect(x + 6, y, x + 6, y + 3, C.k); rect(x + 4, y + 3, x + 8, y + 10, C.k); rect(x + 5, y + 4, x + 7, y + 9, hex('#e8d890')); rect(x + 3, y + 3, x + 9, y + 3, C.k); }
    rect(186, 100, 200, 120, hex('#5a3a22')); rect(187, 101, 199, 119, hex('#c8b080')); for (let k = 0; k < 4; k++) { rect(188, 103 + k * 4, 194 + (k * 3) % 5, 104 + k * 4, hex('#f0e8d0')); pset(197, 103 + k * 4, C.rojo); }
    for (let y = 128; y < 150; y++) for (let x = 96; x < 272; x++) if (d_umbralRq(x, y) < (y - 128) / 40 + h(x >> 3, 1, 939) * 0.2) pset(x, y, d_mezclaRq(R.pget(x, y), hex('#6a6040'), 0.25));
    // la plaza: el empedrado en perspectiva, el pozo con su roldana
    for (let y = 150; y < 180; y++) { const fila = Math.floor((y - 150) / (2 + (y - 150) / 8)); for (let x = 0; x < 320; x++) { if (y < 158 && x > 116 - (y - 150) && x < 184 + (y - 150)) continue;
      const w = 5 + (y - 150) / 4, b = Math.floor((x + fila * w / 2) / w), q = h(b, fila, 934), jy = (y - 150) % Math.max(2, Math.round(2 + (y - 150) / 8)) === 0, jx = ((x + fila * w / 2) % w) < 1;
      pset(x, y, jy || jx ? P.calJ : q < 0.25 ? P.rocaS : q > 0.8 ? P.calL : P.roca); } }
    { const px = 30, py = 166; rect(px - 12, py - 12, px + 12, py, P.calS); d_sillarRq(R, px - 12, py - 12, px + 12, py, [P.roca, P.rocaS, P.calL, P.calJ], 24, 4); rect(px - 13, py - 13, px + 13, py - 12, P.calL);
      rect(px - 11, py - 38, px - 10, py - 13, hex('#3a3a48')); rect(px + 10, py - 38, px + 11, py - 13, hex('#3a3a48')); R.linea(px - 11, py - 38, px + 11, py - 38, hex('#3a3a48')); R.disco(px, py - 36, 3, hex('#5a5a68')); R.disco(px, py - 36, 1, hex('#8a8a98')); rect(px, py - 33, px, py - 22, hex('#a8905a')); rect(px - 2, py - 22, px + 2, py - 18, hex('#83552c')); }
    for (let k = 0; k < Math.round(ag * 6); k++) d_hoyoRq(R, 200 + k * 20 - (k % 2) * 140, 170 - (k % 3) * 4, 10 + (k % 3) * 3, k, true);
  });
  R.copiar(capa);
  const { rect, pset } = R;
  d_nubesRq(R, t, 46, 'sur', 2, { ymax: 30, sem: 4 });
  // la campana que se mueve dentro de su ventana (recortada a su hueco)
  { const a = Math.sin(t * 2.4) * 0.35, cx = 247, cy = 52; R.recorte([240, 42, 254, 76]); for (let j = 0; j < 14; j++) { const w = 2 + Math.round(j * 0.35), x = Math.round(cx + Math.sin(a) * j); for (let i = -w; i <= w; i++) R.pset(x + i, cy + j, i === -w ? hex('#e8c060') : i > w - 2 ? hex('#7a5a20') : hex('#c8902c')); } R.linea(cx - 7, cy - 1, cx + 7, cy - 1, hex('#3a2414')); R.recorte(null); }
  // la copa del plátano, que se mece, y su sombra de hojas que tiembla en la plaza
  for (let k = 0; k < 30; k++) { const x = 236 + Math.round(h(k, 1, 935) * 84), y = 152 + Math.round(h(k, 2, 935) * 26) + Math.round(Math.sin(t * 1.5 + k) * 1); d_sombraRq(R, x, y, 4, 1, 0.22); }
  for (let k = 0; k < 34; k++) { const m = Math.round(Math.sin(t * 1.1 + k * 0.4) * 1.2), x = 256 + Math.round(h(k, 1, 936) * 64) + m, y = 52 + Math.round(h(k, 2, 936) * 40); if (x > 274 && y < 52) continue; d_mataRq(R, x, y, 5 + (k % 3), hex('#4a8a3a'), hex('#2e6a2a'), hex('#7ab04a')); }
  { const u = (t * 0.13) % 1, fx = Math.round(296 - u * 120 + Math.sin(t * 3) * 3), fy = Math.round(90 + u * 80); if (u < 0.9) { pset(fx, fy, hex('#c8a040')); pset(fx + 1, fy, hex('#a8802a')); } }   // una hoja que cae
  // palomas que picotean en la plaza y un gato que se lame en las gradas
  for (let k = 0; k < 4; k++) { const x = [200, 214, 92, 226][k] + Math.round(Math.sin(t * 0.4 + k * 2) * 6), y = [168, 172, 170, 162][k], p = Math.sin(t * 5 + k * 1.7) > 0.4 ? 1 : 0, d = Math.cos(t * 0.4 + k * 2) > 0 ? 1 : -1;
    rect(x - 2, y - 3, x + 1, y - 1, hex('#8a8e9e')); rect(x - 1, y - 3, x, y - 2, hex('#a8acbc')); pset(x + 2 * d, y - 3 + p, hex('#6a6e7e')); pset(x + 3 * d, y - 3 + p, hex('#d8903a')); pset(x - 3 * d, y - 2, hex('#5a5e6e')); pset(x, y, hex('#d86a5a')); }
  { const x = 176, y = 157, l = Math.floor(t * 1.2) % 4 === 0; rect(x, y - 3, x + 5, y, hex('#4a4a52')); rect(x + 4, y - 6, x + 6, y - 3, hex('#4a4a52')); pset(x + 4, y - 7, hex('#4a4a52')); pset(x + 6, y - 7, hex('#4a4a52')); pset(x + 5, y - 5, hex('#c8d040')); R.linea(x, y - 1, x - 3, y - 4 - (l ? 1 : 0), hex('#4a4a52')); }
  return { suelo: 166, puerta: [138, 162, 150], gradas: [116, 184, 150, 158], pozo: [30, 166], campana: [247, 52] };
}

// F · la villa Betania y su jardín (villa, general); o.hotel: el hotel de los años cincuenta
function d_rnVilla(R, t, o) {
  const P = d_PRq, hotel = !!o.hotel;
  const fondo = d_capaRq(R, 'rn-villa-f', () => d_degradadoRq(R, 96, 'sur', [72, 28, 7]));
  const capa = d_capaRq(R, `rn-villa-c-${hotel}`, () => {
    const { rect, pset, linea } = R;
    d_sierraRq(R, 92, 30, 116, P.piri, P.bruma, 1.2, { nieve: P.piriN, nieveS: P.piriNS, nieveY: 76, sombra: P.piriS });
    d_sierraRq(R, 104, 10, 124, P.medio, P.medioB, 6.1, { sombra: P.medioS });
    // la carretera de detrás del jardín (por ahí llega el autobús) con su murete
    for (let y = 116; y < 126; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 116 ? P.caminoL : y === 125 ? P.caminoS : h(x >> 1, y, 940) < 0.1 ? P.caminoS : P.camino);
    // la villa: dos plantas enlucidas, el porche, el balcón, las persianas, el tejado a cuatro aguas con sus chimeneas
    const vx0 = 34, vx1 = 150, vb = 132;
    d_sillarRq(R, vx0, 56, vx1, vb, [P.villa, P.villaS, P.villaL, P.villaS], 41, 6); rect(vx1 - 8, 56, vx1, vb, P.villaS); rect(vx0, 92, vx1, 94, P.calL); rect(vx0, 95, vx1, 95, P.villaS);
    d_tejadoRq(R, [[vx0 - 6, 57], [vx0 + 14, 40], [vx1 - 14, 40], [vx1 + 6, 57]], undefined, 4); rect(vx0 - 6, 57, vx1 + 6, 58, P.tejaD);
    for (const cx of [56, 128]) { d_sillarRq(R, cx, 30, cx + 6, 42, [P.villa, P.villaS, P.villaL, P.villaS], cx, 3); rect(cx - 1, 29, cx + 7, 30, P.tejaS); }
    const ventana = (x, y, w, a, abierta) => { rect(x - 2, y - 2, x + w + 2, y - 1, P.calL); rect(x - 1, y + a, x + w + 1, y + a + 1, P.villaS); rect(x, y, x + w, y + a - 1, C.k); rect(x + 1, y + 1, x + w - 1, y + a - 2, hotel ? hex('#e8c87a') : hex('#3a4a5a')); linea(x + (w >> 1), y + 1, x + (w >> 1), y + a - 2, P.villaL); rect(x + 1, y + (a >> 1), x + w - 1, y + (a >> 1), P.villaL);
      if (!abierta) { rect(x - 5, y, x - 1, y + a - 1, P.persiana); rect(x + w + 1, y, x + w + 5, y + a - 1, P.persiana); for (let j = y + 1; j < y + a; j += 2) { rect(x - 5, j, x - 1, j, P.persianaS); rect(x + w + 1, j, x + w + 5, j, P.persianaS); } } };
    for (const [x, k] of [[44, 0], [76, 1], [112, 2], [132, 3]]) { ventana(x, 64, 10, 20, k === 1); ventana(x, 102, 10, 22, k === 2); }
    rect(70, 86, 98, 87, C.k); for (let x = 71; x < 98; x += 3) rect(x, 88, x, 92, C.k); pset(71, 89, P.villaS);   // el balcón de hierro
    rect(92, 104, 104, 132, C.k); rect(93, 105, 103, 132, hex('#5a3a22')); rect(98, 105, 98, 132, hex('#3a2414')); R.disco(98, 105, 6, C.k); R.disco(98, 105, 5, hex('#8ac0d8')); rect(92, 105, 104, 108, C.k); rect(93, 106, 103, 108, hex('#5a3a22'));
    for (let y = 132; y <= 138; y += 2) rect(88 - (y - 132), y, 108 + (y - 132), y + 1, y % 4 ? P.calL : P.cal);   // la escalinata
    // el invernadero de hierro y cristal, con sus plantas
    { const x0 = 168, x1 = 222, b = 132; R.poligono([[x0, b], [x0, 100], [x0 + 10, 88], [x1 - 10, 88], [x1, 100], [x1, b]], (x, y) => { const m = (x - x0) % 7 === 0 || y % 9 === 0 || y === 100; return m ? hex('#e8ecf0') : h(x >> 2, y >> 2, 941) < 0.3 ? P.vidrioS : y < 100 ? hex('#c0e0ec') : P.vidrio; });
      for (let k = 0; k < 7; k++) d_mataRq(R, x0 + 6 + k * 7, b - 6 - (k % 2) * 3, 3, hex('#3a7a2a'), hex('#24521a'), hex('#6aaa3a')); rect(x0, b - 3, x1, b, hex('#b0603a')); }
    // el mirador: la balaustrada que va hacia la torre Magdala
    rect(222, 108, 320, 112, P.calS); for (let x = 224; x < 320; x += 4) { rect(x, 100, x + 1, 107, P.cal); pset(x, 103, P.calL); } rect(222, 98, 320, 99, P.calL); rect(222, 100, 320, 100, P.calS);
    d_sillarRq(R, 238, 50, 270, 108, [P.cal, P.calS, P.calL, P.calJ], 42, 5); rect(265, 50, 270, 108, P.calS);
    for (let x = 236; x <= 272; x += 4) rect(x, 44, x + 1, 50, P.cal); rect(236, 50, 272, 51, P.calJ);
    R.disco(272, 52, 6, P.calS); rect(266, 46, 278, 70, P.cal); rect(274, 46, 278, 70, P.calS); for (let x = 266; x <= 277; x += 3) rect(x, 43, x + 1, 46, P.cal);
    rect(250, 64, 256, 80, C.k); R.disco(253, 64, 3, C.k); rect(251, 66, 255, 80, hex('#2a3a4a'));
    // el jardín: el césped a franjas, los caminos de grava, los parterres y el estanque con su surtidor
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const grava = Math.abs(x - 98 - (y - 138) * 0.6) < 10 + (y - 132) * 0.5 || y > 160; let c;
      if (grava) { const q = h(x, y, 942); c = q < 0.2 ? P.caminoS : q > 0.85 ? P.caminoL : P.camino; }
      else { c = Math.floor((x + y * 0.4) / 14) % 2 ? C.hierba : hex('#4e9a34'); if (h(x, y, 943) < 0.05) c = C.hierbaL; if (h(x, y, 944) < 0.04) c = C.hierbaS; }
      pset(x, y, c); }
    rect(0, 160, 319, 160, P.caminoS);
    for (const [x0, x1, y] of [[4, 66, 140], [138, 234, 142], [246, 316, 140]]) { rect(x0, y, x1, y + 6, hex('#2e6a2a')); rect(x0, y + 7, x1, y + 7, C.hierbaS); for (let x = x0 + 1; x < x1; x += 3) pset(x, y + 1 + (x % 3), [C.rojo, hex('#f0d040'), C.blanco, hex('#c060c0')][((x / 3) | 0) % 4]); }
    { const cx = 190, cy = 154; for (let j = -6; j <= 6; j++) for (let i = -26; i <= 26; i++) { const e = (i / 26) ** 2 + (j / 6) ** 2; if (e <= 1) pset(cx + i, cy + j, e > 0.8 ? P.calL : e > 0.66 ? P.calS : P.agua); } rect(cx - 1, cy - 8, cx + 1, cy, P.cal); rect(cx - 3, cy - 9, cx + 3, cy - 8, P.calL); }
    for (const x of [8, 156, 226, 312]) d_cipresRq(R, x, 140, 30, x);
    if (hotel) {
      // el hotel: el toldo a rayas sobre la puerta, el rótulo de la cama con estrellas y la terraza con mesas
      for (let x = 82; x <= 114; x++) for (let y = 96; y <= 102; y++) pset(x, y, Math.floor((x - 82) / 4) % 2 ? C.blanco : hex('#c83a3a')); for (let x = 82; x <= 114; x += 4) { pset(x, 103, hex('#c83a3a')); pset(x + 2, 103, C.blanco); }
      rect(60, 40, 134, 52, C.k); rect(61, 41, 133, 51, hex('#1e3a6a'));       for (let k = 0; k < 3; k++) { const sx = 96 + k * 12, sy = 46; for (const [i, j] of [[0, -2], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [-1, 1], [1, 1], [0, -1], [-1, 2], [1, 2]]) pset(sx + i, sy + j, hex('#f0d080')); }
      rect(68, 44, 80, 48, hex('#f0d080')); rect(68, 42, 70, 44, hex('#f0d080')); rect(80, 46, 84, 48, hex('#f0d080')); rect(84, 44, 85, 48, hex('#f0d080'));   // la cama del rótulo
    }
  });
  R.copiar(fondo);
  d_nubesRq(R, t, 96, 'sur', 5, { ymax: 64, sem: 2 });
  d_pajarosRq(R, t, 3, 30);
  d_pegarRq(R, capa, 26);
  const { rect, pset } = R;
  // el humo de las chimeneas, el agua del estanque y el surtidor
  d_humoRq(R, t, 59, 28, 4); d_humoRq(R, t + 1.7, 131, 28, 4);
  { const cx = 190, cy = 154; for (let k = 0; k < 9; k++) { const x = cx - 20 + ((k * 11 + Math.floor(t * 3)) % 40), y = cy - 3 + (k % 5); if (((x - cx) / 24) ** 2 + ((y - cy) / 5) ** 2 < 1) { pset(x, y, P.aguaL); pset(x + 1, y, P.aguaL); } }
    for (let k = 0; k < 10; k++) { const u = ((t * 1.2 + k / 10) % 1), x = Math.round(cx + (k % 2 ? 1 : -1) * u * 6), y = Math.round(cy - 10 - Math.sin(u * Math.PI) * 9 + u * 8); pset(x, y, u < 0.5 ? P.aguaL : C.blanco); } }
  // el jardinero que rastrilla al fondo y una mariposa
  { const x = 236 + Math.round(Math.sin(t * 0.25) * 10); d_figuraRq(R, x, 130, t, hex('#5a7aa8'), { som: hex('#e8d090'), pala: true }); }
  { const x = Math.round(260 + Math.sin(t * 0.9) * 30), y = Math.round(130 + Math.sin(t * 2.3) * 6), a = Math.floor(t * 10) % 2; pset(x, y, C.k); pset(x - 1, y - a, hex('#f0e060')); pset(x + 1, y - a, hex('#f0e060')); }
  let bus = null;
  if (hotel) {
    // un coche de los cincuenta aparcado y el autobús de turistas que llega por la carretera de detrás
    { const x = 286, y = 124; rect(x - 14, y - 6, x + 14, y - 1, C.k); rect(x - 13, y - 5, x + 13, y - 2, hex('#7ab0a0')); rect(x - 8, y - 10, x + 6, y - 6, C.k); rect(x - 7, y - 9, x + 5, y - 7, hex('#a8d0e0')); for (const dx of [-8, 8]) { R.disco(x + dx, y, 3, C.k); R.disco(x + dx, y, 1, hex('#c8ccd4')); } rect(x - 13, y - 3, x + 13, y - 3, hex('#e8ecf0')); }
    const u = Math.max(0, Math.min(1, o.bus ?? 1)), bx = Math.round(lerp(-70, 236, 1 - (1 - u) ** 2)), by = 124, rueda = Math.round(t * 8) % 2;
    bus = [bx, by];
    if (bx > -66) { rect(bx - 32, by - 16, bx + 32, by - 2, C.k); R.poligono([[bx - 31, by - 3], [bx - 31, by - 12], [bx - 28, by - 15], [bx + 28, by - 15], [bx + 31, by - 11], [bx + 31, by - 3]], (x, y) => y < by - 8 ? hex('#e8e0c8') : hex('#c84a3a'));
      for (let k = 0; k < 7; k++) { const wx = bx - 26 + k * 8; rect(wx, by - 13, wx + 5, by - 9, k === 6 ? hex('#a8d0e0') : hex('#5a7a90')); if (k < 6 && Math.floor(t * 2 + k) % 4 === 0) pset(wx + 2, by - 11, hex('#e0aa80')); }
      rect(bx - 31, by - 7, bx + 31, by - 7, hex('#f0d080')); rect(bx + 29, by - 6, bx + 31, by - 4, hex('#fff0a0')); rect(bx - 26, by - 18, bx + 10, by - 16, hex('#4a4a5a')); for (let k = 0; k < 4; k++) rect(bx - 24 + k * 9, by - 21, bx - 18 + k * 9, by - 18, [hex('#8a5a3a'), hex('#3a6aa8'), hex('#c8a040'), hex('#6a3a5a')][k]);
      for (const dx of [-20, 20]) { R.disco(bx + dx, by - 1, 4, C.k); R.disco(bx + dx, by - 1, 2, hex('#c8ccd4')); pset(bx + dx + (rueda ? 1 : -1), by - 1, C.k); }
      if (u < 1) for (let k = 0; k < 6; k++) { const x = bx - 34 - k * 3, y = by - 2 - (k % 2); if (h(k, Math.floor(t * 8), 945) < 0.7) pset(x, y, hex('#e8dcc0')); } }
    // la terraza: mesas y sillas de hierro bajo sombrillas a rayas, a la escala de los personajes (las ocupa la escena)
    for (let k = 0; k < 2; k++) { const x = 22 + k * 40, y = 160; for (let i = -14; i <= 14; i++) { const yy = y - 34 + Math.round(Math.abs(i) * 0.4); pset(x + i, yy, Math.floor((i + 14) / 4) % 2 ? C.blanco : [hex('#c83a3a'), hex('#3a6aa8')][k]); pset(x + i, yy + 1, Math.floor((i + 14) / 4) % 2 ? hex('#d8d4cc') : [hex('#8e2424'), hex('#2a4a88')][k]); } pset(x, y - 35, C.k);
      rect(x, y - 33, x, y - 10, hex('#5a5a68')); rect(x - 8, y - 11, x + 8, y - 10, hex('#e8e4dc')); rect(x - 8, y - 9, x + 8, y - 9, hex('#a8a4a0')); rect(x - 6, y - 8, x - 6, y, hex('#3a3a48')); rect(x + 6, y - 8, x + 6, y, hex('#3a3a48')); for (const d of [-13, 11]) { rect(x + d, y - 12, x + d + 2, y - 12, hex('#3a3a48')); rect(x + d, y - 7, x + d + 2, y - 7, hex('#3a3a48')); rect(x + d + (d < 0 ? 0 : 2), y - 16, x + d + (d < 0 ? 0 : 2), y, hex('#3a3a48')); }
      pset(x - 3, y - 12, C.blanco); pset(x - 2, y - 13, C.blanco); pset(x + 3, y - 12, hex('#c83a3a')); d_sombraRq(R, x, y + 1, 12, 2, 0.25); }
    for (let k = 0; k < 3; k++) d_figuraRq(R, 232 + k * 26 + Math.round(Math.sin(t * 0.3 + k) * 8), 98, t, [hex('#e8c0c0'), hex('#c8d8f0'), hex('#f0e0a0')][k], { anda: true, dir: Math.cos(t * 0.3 + k) > 0 ? 1 : -1, som: k === 1 ? hex('#e8d090') : null });   // veraneantes que pasean por el mirador
  }
  return { suelo: 166, puerta: [98, 132], escalinata: [88, 108, 132, 138], estanque: [190, 154], torre: [254, 50], bus, terraza: hotel ? [[22, 160], [62, 160]] : null };
}

// F · la torre Magdala y el mirador (villa, cámara 'torre')
function d_rnTorre(R, t, o) {
  const P = d_PRq, hotel = !!o.hotel;
  const fondo = d_capaRq(R, 'rn-torre-f', () => d_degradadoRq(R, 110, 'sur', [60, 34, 7]));
  const capa = d_capaRq(R, 'rn-torre-c', () => {
    const { rect, pset, linea } = R;
    d_sierraRq(R, 96, 40, 130, P.piri, P.bruma, 4.4, { nieve: P.piriN, nieveS: P.piriNS, nieveY: 78, sombra: P.piriS });
    const cr = d_sierraRq(R, 120, 16, 150, P.medio, P.medioB, 8.2, { sombra: P.medioS });
    for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 950) * 190), y = cr[x] + 3 + Math.round(h(k, 2, 950) * 20); if (y < 148) { rect(x, y - 2, x, y, P.medioS); rect(x - 1, y, x + 1, y, P.medioS); } }
    for (let k = 0; k < 6; k++) { const x = 20 + k * 30, y = 128 + (k % 3) * 4; d_casaRq(R, x, y, 7, 5, k + 30, { ventanas: 1, puerta: false }); }   // un pueblo del valle
    // la torre Magdala: sillería, almenas con su sombra, la torrecilla redonda, la ventana ojival y la puerta
    d_sillarRq(R, 196, 22, 262, 150, [P.cal, P.calS, P.calL, P.calJ], 51, 6); rect(252, 22, 262, 150, P.calS); for (let y = 22; y < 150; y += 6) rect(252, y, 262, y, P.calJ);
    for (let x = 192; x <= 266; x += 8) { d_sillarRq(R, x, 12, x + 4, 22, [P.cal, P.calS, P.calL, P.calJ], 52 + x, 5); } rect(192, 21, 266, 23, P.calJ); rect(192, 24, 266, 25, P.calS);
    for (let y = 24; y <= 150; y++) for (let x = 180; x <= 200; x++) { const d = Math.abs(x - 190) / 10; if (d > 1) continue; const yy = y; pset(x, yy, (y % 6 === 0) ? P.calJ : d > 0.75 && x > 190 ? P.calS : d > 0.75 ? P.calL : x > 194 ? P.calS : P.cal); }   // la torrecilla
    for (let x = 178; x <= 202; x += 6) d_sillarRq(R, x, 14, x + 3, 24, [P.cal, P.calS, P.calL, P.calJ], 53 + x, 5);
    rect(186, 50, 192, 64, C.k); R.disco(189, 50, 3, C.k); rect(187, 52, 191, 64, hex('#2a3a4a'));
    { const x0 = 218, y0 = 52; for (let y = y0 - 10; y < y0 + 30; y++) for (let x = x0 - 8; x <= x0 + 8; x++) { const ojiva = y >= y0 || (Math.hypot(x - (x0 - 8), y - y0) < 16 && Math.hypot(x - (x0 + 8), y - y0) < 16); if (ojiva) pset(x, y, Math.abs(x - x0) > 6 || y === y0 + 29 ? P.calJ : (x === x0 || y === y0 + 10) ? P.calL : hex('#2a3a4a')); }
      for (let k = 0; k < 4; k++) { const x = x0 - 5 + k * 3, y = y0 + 2 + (k % 2) * 12; rect(x, y, x + 1, y + 6, [P.libR, P.libA, P.libM, P.libV][k]); } }   // libros tras el cristal
    rect(214, 124, 234, 150, C.k); R.disco(224, 124, 10, C.k); rect(215, 126, 233, 150, hex('#5a3a22')); R.disco(224, 124, 9, hex('#5a3a22')); rect(224, 116, 224, 150, hex('#3a2414')); for (let y = 128; y < 150; y += 5) rect(215, y, 233, y, hex('#4a2e1a'));
    // el paseo del mirador: losas, la balaustrada de piedra con sus balaustres y las macetas
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 150) / 6), j = (y - 150) % 6 === 0 || ((x + fila * 9) % 18) === 0, q = h(x >> 2, fila, 954); pset(x, y, j ? P.calJ : q < 0.2 ? P.calS : q > 0.85 ? P.calL : P.cal); }
    rect(0, 134, 178, 136, P.calL); rect(0, 137, 178, 138, P.calS); rect(0, 148, 178, 150, P.calS);
    for (let x = 2; x < 178; x += 6) { R.disco(x + 1.5, 141, 1.8, P.cal); rect(x, 143, x + 3, 147, P.cal); rect(x + 3, 139, x + 3, 147, P.calS); pset(x, 142, P.calL); }
    for (let k = 0; k < 4; k++) { const x = 14 + k * 46; rect(x - 4, 128, x + 4, 134, hex('#b0603a')); rect(x - 4, 128, x + 4, 128, hex('#d08050')); }
    rect(262, 140, 320, 150, P.calS); d_sillarRq(R, 262, 120, 320, 148, [P.cal, P.calS, P.calL, P.calJ], 55, 5);
  });
  R.copiar(fondo);
  d_nubesRq(R, t, 110, 'sur', 5, { ymax: 90, sem: 6 });
  d_pajarosRq(R, t, 5, 50, hex('#3a3446'), 12);
  d_pegarRq(R, capa, 10);
  const { pset, rect } = R;
  // los geranios que mueve el aire, una bandera en la torre y las golondrinas que entran y salen de las almenas
  for (let k = 0; k < 4; k++) { const x = 14 + k * 46; for (let i = -4; i <= 4; i += 2) { const s = Math.round(Math.sin(t * 2 + i + k) * 0.8); pset(x + i + s, 125 - (Math.abs(i) < 2 ? 2 : 0), [C.rojo, hex('#f06080'), C.rojo][k % 3]); pset(x + i, 127, hex('#3a7a2a')); pset(x + i + s, 126, hex('#5a9a3a')); } }
  { const x = 228, b = 12; rect(x, b - 10, x, b, C.k); const f = Math.floor(t * 4) % 2; for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) pset(x + 1 + i, b - 10 + j + ((i + f) % 3 === 0 ? 1 : 0), i < 3 ? hex('#2a4a9a') : i < 6 ? C.blanco : C.rojo); }
  for (let k = 0; k < 2; k++) { const a = t * (0.9 + k * 0.3) + k * 3, x = Math.round(150 + Math.cos(a) * 60), y = Math.round(60 + Math.sin(a * 2) * 20), w = Math.floor(t * 8 + k) % 2; pset(x, y, C.k); pset(x - 1, y - w, C.k); pset(x + 1, y - w, C.k); pset(x - 2, y - 1, C.k); pset(x + 2, y - 1, C.k); }
  if (hotel) for (let k = 0; k < 2; k++) d_figuraRq(R, 60 + k * 40 + Math.round(Math.sin(t * 0.3 + k) * 20), 133, t, [hex('#e8c0c0'), hex('#c8d8f0')][k], { anda: true, dir: Math.cos(t * 0.3 + k) > 0 ? 1 : -1 });
  return { suelo: 160, puerta: [224, 150], balaustrada: [0, 178, 134], torre: [196, 262] };
}

// F · el despacho del cura (despacho, general)
function d_rnDespacho(R, t, o) {
  const P = d_PRq, sob = o.sobres ?? 1;
  const capa = d_capaRq(R, `rn-desp-${Math.round(sob * 10)}`, () => {
    const { rect, pset, linea } = R;
    // la pared: papel pintado con flores en rombo, la moldura, el zócalo de madera y el suelo de tablas
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const u = (x + y) % 16, v = (x - y + 320) % 16, flor = (u < 2 || v < 2) && (x + y) % 2 === 0, cen = (x % 16 === 8 && y % 16 === 8);
      let c = flor ? P.papelS : h(x >> 1, y >> 1, 960) < 0.08 ? P.papelL : P.papel; if (cen || (Math.abs((x % 16) - 8) + Math.abs((y % 16) - 8) === 1)) c = hex('#a85a4a'); pset(x, y, c); }
    for (let x = 0; x < 320; x++) for (let y = 0; y < 112; y++) { const d = Math.max(0, 1 - y / 70) * 0.25 + (x < 60 ? 0 : (x - 60) / 900); if (d_umbralRq(x, y) < d * 0.6) pset(x, y, d_mezclaRq(R.pget(x, y), C.k, 0.2)); }
    rect(0, 0, 319, 3, P.zocaloS); rect(0, 4, 319, 5, P.zocaloL);
    d_maderaRq(R, 0, 112, 319, 150, P.zocalo, P.zocaloS, P.zocaloL, d_oscRq(P.zocaloS), 1, 13); for (let x = 0; x < 320; x += 40) { rect(x + 4, 116, x + 36, 146, P.zocaloS); rect(x + 5, 117, x + 35, 145, P.zocalo); rect(x + 5, 117, x + 35, 117, P.zocaloL); }
    rect(0, 110, 319, 112, P.zocaloL);
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const tab = Math.floor(x / 18 + (y - 150) * 0), fila = y - 150, w = (x + Math.floor(h(Math.floor(x / 18), 0, 961) * 30) + 0) % 34; let c = (x % 18 === 0) ? P.sueloS : h(x, y >> 1, 962) < 0.07 ? P.sueloS : (h(x >> 3, y, 963) < 0.1 ? P.sueloL : P.suelo);
      if (w === 0 && fila % 2) c = P.sueloS; pset(x, y, c); }
    rect(0, 150, 319, 150, P.zocaloS);
    // la alfombra
    for (let y = 164; y < 180; y++) for (let x = 60; x < 260; x++) { const b = y === 164 || x === 60 || x === 259 ? hex('#5a1e1e') : (y === 166 || x === 62 || x === 257) ? hex('#d8a040') : ((x >> 2) + (y >> 1)) % 4 === 0 ? hex('#3a2a5a') : hex('#8a2a2a'); pset(x, y, b); }
    // la ventana con su marco, el alféizar y las cortinas
    rect(18, 22, 78, 96, hex('#e8e0cc')); rect(20, 24, 76, 94, C.k); rect(18, 96, 80, 99, hex('#d8d0bc')); rect(18, 99, 80, 100, P.zocaloS);
    for (let y = 18; y < 108; y++) for (let x = 6; x < 20; x++) pset(x, y, ((x + Math.floor(y / 3)) % 4 === 0) ? hex('#6a2a2a') : hex('#8e3a3a'));
    for (let y = 18; y < 108; y++) for (let x = 78; x < 92; x++) pset(x, y, ((x + Math.floor(y / 3)) % 4 === 0) ? hex('#6a2a2a') : hex('#8e3a3a'));
    rect(2, 15, 96, 17, hex('#a8743c')); R.disco(2, 16, 2, hex('#c8a040')); R.disco(96, 16, 2, hex('#c8a040'));
    // el crucifijo, el cuadro de la Magdalena (sin letras), el reloj de péndulo y la estantería
    rect(146, 24, 149, 58, hex('#4a2e1a')); rect(138, 32, 157, 35, hex('#4a2e1a')); rect(147, 25, 148, 57, hex('#6a4228')); rect(146, 34, 149, 44, hex('#e0c8a0'));
    rect(104, 28, 128, 56, hex('#c8a040')); rect(106, 30, 126, 54, hex('#2a3a4a')); R.disco(116, 38, 3, hex('#e0b090')); rect(112, 41, 120, 54, hex('#4a6aa8')); rect(111, 36, 113, 46, hex('#c88a3a'));
    rect(172, 26, 196, 100, hex('#5a3a22')); rect(174, 28, 194, 98, hex('#7a4a2a')); R.disco(184, 40, 9, hex('#c8a040')); R.disco(184, 40, 8, hex('#f0e8d0')); for (let k = 0; k < 12; k++) pset(Math.round(184 + Math.cos(k * Math.PI / 6) * 6), Math.round(40 + Math.sin(k * Math.PI / 6) * 6), C.k);
    rect(178, 54, 190, 92, hex('#3a2414')); rect(172, 100, 196, 104, hex('#4a2e1a'));
    { const x0 = 216, x1 = 300, y0 = 50; rect(x0, y0, x1, 150, hex('#4a2e1a')); rect(x0 + 2, y0 + 2, x1 - 2, 148, hex('#3a2414'));
      for (let s = 0; s < 4; s++) { const sy = y0 + 4 + s * 24; rect(x0 + 2, sy + 20, x1 - 2, sy + 21, hex('#6a4228'));
        let x = x0 + 4; while (x < x1 - 6) { const w = 2 + Math.floor(h(x, s, 964) * 3), a = 14 + Math.floor(h(x, s, 965) * 6), c = [P.libR, P.libA, P.libV, hex('#6a4a2a'), hex('#8a6a3a'), P.libN][Math.floor(h(x, s, 966) * 6)];
          if (h(x, s, 967) < 0.08) { rect(x, sy + 16, x + 12, sy + 19, hex('#e8dcc0')); rect(x, sy + 13, x + 12, sy + 15, hex('#c8bca0')); x += 14; continue; }
          rect(x, sy + 20 - a, x + w, sy + 19, c); pset(x, sy + 20 - a + 2, hex('#d8b060')); pset(x, sy + 20 - a + 3, hex('#d8b060')); rect(x + w, sy + 20 - a, x + w, sy + 19, d_mezclaRq(c, C.k, 0.4)); x += w + 1; } } }
    // la mesa de escritorio con su tapete, los cajones, y las montañas de sobres
    const mx0 = 96, mx1 = 204, my = 128;
    rect(mx0 - 4, my - 2, mx1 + 4, my + 3, hex('#4a2e1a')); rect(mx0 - 4, my - 2, mx1 + 4, my - 2, hex('#8a5a38')); rect(mx0 + 10, my - 3, mx1 - 10, my - 2, hex('#2a5a3a'));
    d_maderaRq(R, mx0, my + 4, mx1, 150, hex('#6a4228'), hex('#4a2e1a'), hex('#8a5a38'), hex('#3a2414'), 2, 8);
    for (const dx of [mx0 + 6, mx1 - 36]) { rect(dx, my + 8, dx + 30, my + 18, hex('#3a2414')); rect(dx + 1, my + 9, dx + 29, my + 17, hex('#7a4a2a')); rect(dx + 13, my + 12, dx + 17, my + 13, hex('#c8a040')); }
    rect(mx0, 146, mx0 + 4, 150, hex('#3a2414')); rect(mx1 - 4, 146, mx1, 150, hex('#3a2414'));
    const sobre = (x, y, k) => { const c = [P.sobre, P.sobreA, hex('#e8e0f0')][k % 3]; rect(x, y, x + 8, y + 4, c); R.linea(x, y, x + 4, y + 2, P.sobreS); R.linea(x + 8, y, x + 4, y + 2, P.sobreS); rect(x, y + 4, x + 8, y + 4, P.sobreS); if (k % 4 === 0) pset(x + 7, y + 1, P.sello); };
    const monton = (cx, base, alto, ancho, k0) => { for (let j = 0; j < alto; j += 2) { const w = Math.round(ancho * (1 - j / (alto * 1.15))); for (let i = -w; i <= w - 8; i += 7) sobre(cx + i + Math.round((h(i, j, 968 + k0) - 0.5) * 4), base - 5 - j, Math.floor(h(i, j, 969 + k0) * 9)); } };
    if (sob > 0) { monton(122, my - 2, Math.round(28 * sob), 22, 1); monton(176, my - 2, Math.round(20 * sob), 16, 2); monton(258, 172, Math.round(18 * sob), 18, 3); monton(36, 168, Math.round(14 * sob), 14, 4); }
    // la saca de correos, abierta, con sobres que se salen
    if (sob > 0.3) { R.poligono([[222, 172], [228, 146], [246, 146], [252, 172]], hex('#8a7a5a')); for (let y = 148; y < 172; y += 3) R.linea(226, y, 248, y, hex('#6a5a40')); rect(226, 144, 248, 146, hex('#6a5a40')); for (let k = 0; k < 5; k++) sobre(226 + k * 4, 140 - (k % 2) * 3, k); }
    R.disco(150, 104, 6, hex('#c8a040'));   // el pie de la lámpara (la llama tiembla en cada fotograma)
    rect(147, 104, 153, 122, hex('#c8a040')); rect(144, 122, 156, 125, hex('#a8802a')); rect(146, 92, 154, 104, hex('#e8f0e8'));
  });
  R.copiar(capa);
  const { rect, pset } = R;
  // por la ventana: el cielo con nubes que pasan, la colina y el campanario (recortado al hueco)
  R.recorte([21, 25, 75, 93]);
  { for (let y = 25; y <= 93; y++) R.linea(21, y, 75, y, (x) => d_umbralRq(x, y) < (y - 25) / 68 ? hex('#a8daf4') : hex('#74bef2'));
    for (let k = 0; k < 3; k++) { const x = Math.round(((t * (2 + k) + k * 40) % 100) - 20), y = 34 + k * 10; for (let i = 0; i < 14; i++) { R.pset(x + i, y, C.blanco); if (i > 2 && i < 11) R.pset(x + i, y - 1, C.blanco); R.pset(x + i, y + 1, hex('#d2ecfc')); } }
    R.poligono([[20, 94], [20, 70], [40, 64], [60, 66], [76, 60], [76, 94]], (x, y) => h(x >> 1, y >> 1, 970) < 0.2 ? d_PRq.garS : d_PRq.gar);
    R.poligono([[56, 66], [56, 52], [60, 46], [64, 52], [64, 66]], d_PRq.cal); R.linea(60, 46, 60, 42, C.k);
    const b = Math.floor(t * 0.5) % 3 === 0 ? 1 : 0; R.pset(60, 55 + b, hex('#a87a30')); }
  rect(47, 25, 48, 93, hex('#e8e0cc')); rect(21, 58, 75, 59, hex('#e8e0cc'));
  R.recorte(null);
  // el péndulo del reloj, la llama de la lámpara con su halo y las motas de polvo en la luz de la ventana
  { const a = Math.sin(t * Math.PI) * 0.4, px = 184, py = 56; R.recorte([179, 55, 189, 91]); for (let j = 0; j < 30; j++) R.pset(Math.round(px + Math.sin(a) * j), py + j, hex('#c8a040')); R.disco(Math.round(px + Math.sin(a) * 32), py + 32, 3, hex('#e8c060')); R.recorte(null);
    const an = t * Math.PI / 30, am = t * Math.PI / 1800; R.linea(184, 40, Math.round(184 + Math.sin(an) * 6), Math.round(40 - Math.cos(an) * 6), C.k); R.linea(184, 40, Math.round(184 + Math.sin(am) * 4), Math.round(40 - Math.cos(am) * 4), C.k); }
  { const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5, r = 22 + Math.round(fl * 2);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1 && d > 0.25 && d_umbralRq(150 + i, 98 + j) < (1 - d) * 0.5) { const c = R.pget(150 + i, 98 + j); R.pset(150 + i, 98 + j, d_mezclaRq(c, hex('#ffe0a0'), 0.3)); } }
    rect(149, 95 - Math.round(fl), 151, 100, hex('#ffd060')); pset(150, 94 - Math.round(fl), hex('#fff0b0')); pset(150, 99, hex('#fff8e0')); }
  for (let k = 0; k < 12; k++) { const x = Math.round(30 + h(k, 1, 971) * 90 + Math.sin(t * 0.5 + k) * 4), y = Math.round(100 + h(k, 2, 971) * 60 + ((t * 2 + k * 9) % 20) - 10); if (Math.sin(t * 2 + k) > 0) { const c = R.pget(x, y); R.pset(x, y, d_mezclaRq(c, hex('#fff0c0'), 0.6)); } }
  d_luzRq(R, 34, 152, 90, 179, 0.7, 0.18, hex('#fff0c0'));
  return { suelo: 172, mesa: [96, 204, 128], ventana: [20, 24, 76, 94], crucifijo: [148, 40], reloj: [184, 40], saca: [237, 160], estanteria: [216, 300] };
}

// tablero de madera de frente (tablas horizontales): juntas, vetas claras y oscuras y algún nudo
function d_maderaRq(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0 + 3, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 972 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 973 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 974 + k) * 34); if (h(x, g, 975 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 976 + k) * 12); } }
    if (h(f, 9, 977 + k) < 0.55 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 978 + k) * (x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; rect(nx - 3, ny, nx + 3, ny, cS); rect(nx - 1, ny, nx + 1, ny, cD); }
  }
  rect(x0, y0, x1, y0, cL);
}

const d_oscRq = (c) => d_mezclaRq(c, C.k, 0.4);

// la luz que entra por una ventana: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila)
function d_luzRq(R, x0, y0, x1, y1, inclin, a = 0.3, col = C.blanco) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, d_mezclaRq(c, col, a)); } }
}

// F · la mesa de cerca con los pergaminos y el té (despacho, cámara 'mesa': inserto)
function d_rnMesa(R, t, o) {
  const P = d_PRq, man = Math.max(0, Math.min(1, o.manchas ?? 0.4));
  const capa = d_capaRq(R, 'rn-mesa', () => {
    const { rect, pset, linea } = R;
    d_maderaRq(R, 0, 0, 319, 179, hex('#6a4228'), hex('#4a2e1a'), hex('#8a5a38'), hex('#3a2414'), 5, 22);
    for (let x = 0; x < 320; x++) for (let y = 0; y < 180; y++) { const d = Math.hypot((x - 150) / 320, (y - 90) / 180); if (d_umbralRq(x, y) < (d - 0.25) * 1.3) pset(x, y, d_mezclaRq(R.pget(x, y), C.k, 0.35)); }   // la viñeta de la lámpara
    // los sobres abiertos que asoman por el borde
    for (const [x, y, a] of [[6, 8, 0], [24, 150, 1], [270, 150, 2], [290, 8, 3]]) { rect(x, y, x + 36, y + 22, a % 2 ? P.sobre : P.sobreA); linea(x, y, x + 18, y + 11, P.sobreS); linea(x + 36, y, x + 18, y + 11, P.sobreS); rect(x + 30, y + 2, x + 34, y + 7, P.sello); rect(x, y + 22, x + 36, y + 22, P.sobreS); }
  });
  R.copiar(capa);
  const { rect, pset, linea } = R;
  // los tres pergaminos con renglones de trazos (de una «escritura» sin letras), sus bordes gastados y su sombra
  const pergs = [[60, 28, 130, 112, -1], [170, 36, 252, 124, 1], [118, 96, 196, 160, 0]];
  pergs.forEach(([x0, y0, x1, y1, k], n) => {
    for (let y = y0 + 2; y <= y1 + 2; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if (x > x1 || y > y1) { const c = R.pget(x, y); pset(x, y, d_mezclaRq(c, C.k, 0.35)); }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const borde = x - x0 < 2 || x1 - x < 2 || y - y0 < 2 || y1 - y < 2; if (borde && h(x, y, 980 + n) < 0.35) continue;
      let c = h(x >> 1, y >> 1, 981 + n) < 0.15 ? hex('#d8c490') : hex('#ecdcb0'); if (borde) c = hex('#c8b080'); pset(x, y, c); }
    for (let y = y0 + 8; y < y1 - 6; y += 6) { let x = x0 + 6; while (x < x1 - 8) { const w = 3 + Math.floor(h(x, y, 982 + n) * 8); for (let i = 0; i < w; i++) pset(x + i, y + ((i + x) % 3 === 0 ? -1 : 0), hex('#3a2a2a')); if (h(x, y, 983 + n) < 0.2) pset(x + w - 1, y - 2, hex('#3a2a2a')); x += w + 2 + Math.floor(h(x, y, 984 + n) * 3); } }
    if (n === 1) { R.disco(x1 - 14, y1 - 14, 6, P.cera); R.disco(x1 - 15, y1 - 15, 3, hex('#d85a5a')); pset(x1 - 16, y1 - 16, hex('#f08080')); }
    if (n === 0) for (let k = 0; k < 3; k++) { R.anillo(x0 + 20 + k * 16, y0 + 2, 1, hex('#3a2a2a')); }
  });
  // las manchas de té que crecen: aguadas de bordes más oscuros, con el anillo de la taza
  const manchas = [[90, 60, 18], [214, 82, 22], [150, 128, 16], [74, 98, 10], [236, 54, 12]];
  manchas.forEach(([cx, cy, r0], k) => { const r = r0 * Math.min(1, man * 1.6 - k * 0.12); if (r < 1) return;
    for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const a = Math.atan2(j, i), rr = r * (1 + 0.18 * Math.sin(a * 3 + k) + 0.08 * Math.sin(a * 7 + k * 2)), d = Math.hypot(i, j);
      if (d > rr) continue; const c = R.pget(cx + i, cy + j); if ((c & 255) < 150) continue; pset(cx + i, cy + j, d_mezclaRq(c, d > rr - 1.4 ? P.teS : P.te, d > rr - 1.4 ? 0.6 : 0.32)); } });
  // la taza con su plato y el té que humea, la tetera, el tintero con la pluma y la lupa
  { const cx = 278, cy = 104; R.disco(cx, cy, 20, hex('#d8d4cc')); R.disco(cx, cy, 18, hex('#f0ece4')); R.disco(cx, cy, 13, hex('#a8a4a0')); R.disco(cx, cy - 1, 12, hex('#f6f2ea')); R.disco(cx, cy - 1, 10, P.te); R.disco(cx - 2, cy - 3, 4, P.teL);
    rect(cx + 12, cy - 4, cx + 18, cy + 2, hex('#f0ece4')); rect(cx + 14, cy - 2, cx + 16, cy, hex('#a8a4a0'));
    for (let k = 0; k < 3; k++) for (let j = 0; j < 22; j++) { const u = ((t * 0.5 + k / 3) % 1), y = cy - 12 - j - Math.round(u * 6), x = Math.round(cx - 4 + k * 4 + Math.sin(j * 0.35 + t * 2 + k) * 2); if (d_umbralRq(x, y) < 0.55 - j / 44) pset(x, y, hex('#f0ece4')); } }
  { const cx = 40, cy = 136; R.disco(cx, cy, 22, hex('#5a6a8a')); R.disco(cx, cy, 19, hex('#7a8aaa')); R.disco(cx - 5, cy - 6, 8, hex('#9aaaca')); R.disco(cx, cy, 4, hex('#3a4a6a')); R.disco(cx, cy - 1, 3, hex('#c8a040'));
    for (let i = 0; i < 18; i++) { pset(cx + 20 + i, cy - 10 - Math.round(i * 0.4), hex('#5a6a8a')); pset(cx + 20 + i, cy - 9 - Math.round(i * 0.4), hex('#3a4a6a')); } }
  { const cx = 262, cy = 162; R.disco(cx, cy, 9, C.k); R.disco(cx, cy, 8, hex('#3a3a4a')); R.disco(cx - 2, cy - 2, 3, hex('#5a5a6a')); R.disco(cx, cy, 4, hex('#101018'));
    const b = Math.sin(t * 0.8) * 2; for (let i = 0; i < 30; i++) { const x = Math.round(cx - 4 - i * 0.9), y = Math.round(cy - 6 - i * 1.2 + (i > 20 ? b * (i - 20) / 10 : 0)); pset(x, y, C.blanco); if (i > 6) { pset(x - 1, y + 1, hex('#e0dcd4')); pset(x + 1, y - 1, hex('#c8c4bc')); } } }
  // la lupa sobre la mesa, que destella
  { const cx = 30, cy = 40; R.disco(cx, cy, 13, C.k); R.disco(cx, cy, 12, hex('#c8a040')); R.disco(cx, cy, 10, hex('#b8d8e8')); R.disco(cx - 3, cy - 3, 3, C.blanco); linea(cx + 9, cy + 9, cx + 22, cy + 22, hex('#3a2414')); linea(cx + 10, cy + 9, cx + 23, cy + 22, hex('#5a3a22'));
    if (Math.sin(t * 1.7) > 0.85) { pset(cx - 6, cy - 7, C.blanco); pset(cx - 7, cy - 6, C.blanco); pset(cx - 5, cy - 6, C.blanco); } }
  return { suelo: 180, pergaminos: pergs.map(([x0, y0, x1, y1]) => [x0, y0, x1, y1]), taza: [278, 104], tintero: [262, 162], tetera: [40, 136] };
}

// F · la librería de 1982–2003 (libreria, general)
function d_rnLibreria(R, t, o) {
  const P = d_PRq;
  const capa = d_capaRq(R, 'rn-lib', () => {
    const { rect, pset, linea } = R;
    // la pared de ladrillo visto arriba, el techo con los focos y el suelo de tarima
    for (let y = 0; y < 40; y++) for (let x = 0; x < 320; x++) { const f = y >> 2, j = (y & 3) === 3 || ((x + (f & 1) * 6) % 12) === 0; pset(x, y, j ? hex('#c8b8a0') : h(x >> 2, f, 990) < 0.25 ? hex('#8a3e2e') : h(x >> 2, f, 991) > 0.85 ? hex('#b86a4e') : hex('#a4503a')); }
    rect(0, 0, 319, 4, hex('#3a3440')); for (let x = 20; x < 320; x += 60) { rect(x, 4, x + 1, 8, C.k); rect(x - 3, 8, x + 4, 12, hex('#2a2a32')); }
    // las estanterías de toda la pared con sus lomos de colores (sin letras) y los rótulos de sección con iconos
    for (let s = 0; s < 5; s++) { const y0 = 40 + s * 22; rect(0, y0, 319, y0 + 21, hex('#5a3a22')); rect(0, y0 + 19, 319, y0 + 21, hex('#8a5a38')); rect(0, y0 + 21, 319, y0 + 21, hex('#3a2414'));
      let x = 2; while (x < 318) { const w = 2 + Math.floor(h(x, s, 992) * 3), a = 12 + Math.floor(h(x, s, 993) * 6), c = [P.libR, P.libA, P.libV, P.libM, P.libN, P.libB, P.libP, hex('#e88a3a')][Math.floor(h(x, s, 994) * 8)];
        if (h(x, s, 995) < 0.05) { R.linea(x, y0 + 18, x + 5, y0 + 18 - a, c); R.linea(x + 1, y0 + 18, x + 6, y0 + 18 - a, c); x += 8; continue; }
        rect(x, y0 + 19 - a, x + w, y0 + 18, c); pset(x, y0 + 19 - a + 2, d_mezclaRq(c, C.blanco, 0.5)); rect(x + w, y0 + 19 - a, x + w, y0 + 18, d_mezclaRq(c, C.k, 0.35)); x += w + 1; } }
    for (const x of [0, 80, 160, 240, 318]) rect(x, 40, x + 2, 150, hex('#3a2414'));
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor(x / 22 + (y - 150) * 0.0); pset(x, y, x % 22 === 0 ? hex('#8a6a4a') : h(x >> 2, y, 996) < 0.1 ? hex('#a8845a') : hex('#c09a6a')); }
    rect(0, 150, 319, 151, hex('#3a2414'));
    // el escaparate a la calle (la gente pasa por fuera), con la puerta de cristal
    rect(236, 44, 318, 148, hex('#3a3440')); rect(240, 48, 314, 146, hex('#a8c8d8')); rect(276, 48, 278, 146, hex('#3a3440'));
    // la caja registradora en su mostrador, a la izquierda
    rect(6, 120, 70, 150, hex('#6a4228')); rect(6, 118, 70, 120, hex('#8a5a38')); d_maderaRq(R, 8, 122, 68, 150, hex('#6a4228'), hex('#4a2e1a'), hex('#8a5a38'), hex('#3a2414'), 7, 9);
    rect(40, 104, 62, 118, hex('#4a4a5a')); rect(42, 106, 60, 110, hex('#2a3a2a')); rect(44, 112, 58, 116, hex('#6a6a7a')); for (let k = 0; k < 4; k++) pset(46 + k * 3, 114, hex('#c8c8d4'));
    // la mesa con las montañas del libro del cáliz (cubierta oscura con el cáliz dorado) y el cartel con el «1»
    rect(110, 132, 230, 136, hex('#4a2e1a')); rect(110, 132, 230, 132, hex('#8a5a38')); rect(114, 136, 118, 150, hex('#3a2414')); rect(222, 136, 226, 150, hex('#3a2414'));
    const libro = (x, y, k) => { const osc = k % 4 !== 3; rect(x, y, x + 13, y + 3, C.k); rect(x + 1, y + 1, x + 12, y + 2, osc ? hex('#2a2440') : hex('#7a2a2a')); rect(x + 1, y, x + 12, y, osc ? hex('#4a4070') : hex('#a84a3a')); rect(x + 12, y + 1, x + 12, y + 2, hex('#f0e8d0')); pset(x + 6, y + 1, hex('#e8c040')); pset(x + 6, y + 2, hex('#c8a040')); };
    for (const [cx, n] of [[136, 6], [170, 9], [204, 6]]) for (let j = 0; j < n; j++) { const w = Math.max(1, Math.ceil((n - j) / 3)); for (let i = 0; i < w; i++) libro(cx - w * 7 + i * 14 + (j % 2) * 2 - 1, 128 - j * 4, i + j * 2); }
    for (const [x, y] of [[118, 128], [214, 128]]) { rect(x, y - 1, x + 10, y + 2, C.k); rect(x + 1, y, x + 9, y + 1, hex('#e8e0cc')); }
    for (const cx of [132, 208]) { rect(cx - 6, 86, cx + 6, 104, hex('#1e1a2a')); rect(cx - 5, 87, cx + 5, 103, hex('#2a2440')); const g = cx; rect(g - 2, 91, g + 2, 92, hex('#e8c040')); rect(g - 1, 93, g + 1, 95, hex('#e8c040')); pset(g, 96, hex('#e8c040')); rect(g - 2, 97, g + 2, 98, hex('#e8c040')); rect(cx, 104, cx, 126 - (cx === 132 ? 30 : 27), hex('#5a5a68')); }
    { rect(160, 66, 180, 84, C.k); rect(161, 67, 179, 83, hex('#c83a3a')); }
  });
  R.copiar(capa);
  const { rect, pset } = R;
  R.numero('1', 170, 81, { color: hex('#f6f2ea'), sombra: C.k, s: 1 });
  // la calle por el escaparate: la acera, los coches y la gente que pasa (recortados al cristal)
  R.recorte([240, 48, 314, 146]);
  for (let y = 48; y < 146; y++) R.linea(240, y, 314, y, (x) => y > 128 ? (h(x >> 2, y, 997) < 0.2 ? hex('#8a8694') : hex('#a8a4b0')) : y > 116 ? hex('#5a5a68') : (x + y) % 9 === 0 ? hex('#c0d8e4') : hex('#a8c8d8'));
  for (let k = 0; k < 3; k++) { const x = Math.round(((t * 18 + k * 60) % 140) + 220), c = [hex('#c84a3a'), hex('#e8c040'), hex('#4a6aa8')][k]; R.poligono([[x - 12, 126], [x - 12, 120], [x - 6, 116], [x + 6, 116], [x + 12, 120], [x + 12, 126]], c); R.disco(x - 7, 126, 2, C.k); R.disco(x + 7, 126, 2, C.k); }
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, x = d > 0 ? ((t * (8 + k) + k * 37) % 110) + 226 : 330 - ((t * (7 + k) + k * 29) % 110); d_figuraRq(R, x, 144, t, [hex('#5a8a5a'), hex('#c87a3a'), hex('#3a4a8a'), hex('#a84a6a')][k], { anda: true, dir: d }); }
  R.recorte(null);
  for (let k = 0; k < 3; k++) R.linea(246 + k * 22, 140, 266 + k * 22, 54, hex('#d8eaf4'));   // reflejos del cristal
  rect(276, 48, 278, 146, hex('#3a3440'));
  // por el escaparate, la cola que espera fuera (quieta, recortada al cristal; se mueve un poco)
  R.recorte([240, 48, 314, 146]); for (let k = 0; k < 7; k++) { const x = 244 + k * 9 + Math.round(Math.sin(t * 0.6 + k) * 0.6); d_figuraRq(R, x, 140 + (k % 2), t + k, [hex('#5a7aa8'), hex('#c84a3a'), hex('#4a8a5a'), hex('#e8a040'), hex('#8a5aa8'), hex('#3a3a4a'), hex('#c87a9a')][k], { dir: -1, pelo: [hex('#3a2a1a'), hex('#c8a040'), hex('#1c1424')][k % 3] }); } R.recorte(null);
  for (let k = 0; k < 3; k++) R.linea(250 + k * 22, 140, 268 + k * 22, 60, hex('#e4f0f8'));
  if (Math.floor(t * 1.5) % 4 === 0) { rect(44, 106, 58, 110, hex('#6ac06a')); }
  // los charcos de luz de los focos sobre la tarima y la mesa
  for (const x of [80, 170, 260]) d_sombraRq(R, x, 160, 26, 5, 0.18, hex('#fff0c0'));
  return { suelo: 170, mesa: [110, 230, 132], caja: [6, 70, 118], escaparate: [240, 48, 314, 146], cola: [78, 136] };
}

// F · la calle de noche con la marquesina del cine (libreria, cámara 'cine')
function d_rnCine(R, t, o) {
  const P = d_PRq;
  const capa = d_capaRq(R, 'rn-cine', () => {
    const { rect, pset, linea } = R;
    d_degradadoRq(R, 70, 'noche');
    // los edificios de los lados con ventanas, y la fachada del cine con su marquesina
    for (const [x0, x1, top, c] of [[0, 70, 30, hex('#3a3448')], [250, 320, 50, hex('#34303e')]]) { rect(x0, top, x1, 150, c); for (let y = top + 6; y < 140; y += 12) for (let x = x0 + 6; x < x1 - 6; x += 14) { rect(x, y, x + 6, y + 7, h(x, y, 1000) < 0.45 ? hex('#f0c870') : hex('#1c1a2a')); rect(x, y + 4, x + 6, y + 4, C.k); } }
    d_sillarRq(R, 70, 24, 250, 150, [hex('#7a3a3a'), hex('#5a2a2a'), hex('#9a4a44'), hex('#4a2226')], 60, 6);
    rect(70, 20, 250, 26, hex('#c8a040')); rect(70, 20, 250, 20, hex('#f0d070'));
    rect(78, 60, 242, 84, C.k); rect(80, 62, 240, 82, hex('#f0e8d0')); for (let k = 0; k < 3; k++) { const y = 66 + k * 6; for (let x = 92; x < 228; x += 4) if (h(x >> 2, k, 1001) < 0.8) rect(x, y, x + 2, y + 2, hex('#2a2430')); }
    rect(70, 84, 250, 92, hex('#c83a3a')); rect(70, 92, 250, 93, hex('#8e2424'));
    // los carteles con el cáliz y la puerta acristalada con la taquilla
    for (const cx of [100, 220]) { rect(cx - 16, 100, cx + 16, 140, hex('#c8a040')); rect(cx - 14, 102, cx + 14, 138, hex('#1e1a3a'));
      for (let y = 103; y < 138; y++) for (let x = cx - 13; x <= cx + 13; x++) if (d_umbralRq(x, y) < (y - 103) / 60) pset(x, y, hex('#3a2a5a'));
      rect(cx - 6, 108, cx + 6, 110, hex('#e8c040')); R.disco(cx, 111, 6, hex('#e8c040')); rect(cx - 6, 104, cx + 6, 111, hex('#1e1a3a')); R.disco(cx, 110, 5, hex('#e8c040')); rect(cx - 5, 104, cx + 5, 109, hex('#1e1a3a')); rect(cx - 6, 108, cx + 6, 110, hex('#f0d070'));
      rect(cx - 1, 116, cx + 1, 124, hex('#c8a040')); rect(cx - 5, 125, cx + 5, 127, hex('#c8a040')); pset(cx - 3, 109, C.blanco); for (let k = 0; k < 3; k++) rect(cx - 10, 130 + k * 2, cx + 10 - k * 5, 130 + k * 2, hex('#8a84a0')); }
    rect(134, 100, 186, 150, C.k); for (const x of [136, 162]) { rect(x, 102, x + 22, 150, hex('#5a3a2a')); rect(x + 2, 104, x + 20, 140, hex('#f0c070')); rect(x + 2, 120, x + 20, 121, hex('#5a3a2a')); }
    // la acera, el bordillo y el asfalto mojado que refleja las luces
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 164) c = (x % 16 === 0 || y === 157) ? hex('#5a5668') : h(x >> 1, y, 1002) < 0.1 ? hex('#6a6678') : hex('#7a768a');
      else if (y < 166) c = y === 164 ? hex('#a8a4b0') : hex('#4a4658');
      else { c = h(x >> 1, y, 1003) < 0.15 ? hex('#22202e') : hex('#2a2838'); }
      pset(x, y, c); }
    for (let k = 0; k < 4; k++) { const cx = 40 + k * 80; for (let y = 168; y < 180; y++) for (let x = cx - 14; x <= cx + 14; x++) if (((x - cx) / 14) ** 2 + ((y - 172) / 5) ** 2 < 1) pset(x, y, hex('#3a3850')); }   // charcos
  });
  R.copiar(capa);
  const { rect, pset } = R;
  // las bombillas de la marquesina que corren, y su reflejo en el asfalto mojado
  for (let x = 72; x <= 248; x += 4) for (const y of [57, 87]) { const on = (Math.floor(t * 8) + x / 4) % 4 < 2; pset(x, y, on ? hex('#fff4b0') : hex('#8a6a3a')); if (on) { pset(x, y - 1, hex('#e8c060')); } }
  for (let y = 58; y <= 86; y += 4) for (const x of [72, 248]) { const on = (Math.floor(t * 8) + y / 4) % 4 < 2; pset(x, y, on ? hex('#fff4b0') : hex('#8a6a3a')); }
  for (let y = 168; y < 180; y++) for (let x = 72; x <= 248; x += 3) if (d_umbralRq(x, y) < 0.25 + Math.sin(t * 3 + x * 0.1 + y) * 0.1) { const c = R.pget(x, y); pset(x, y, d_mezclaRq(c, hex('#e8a060'), 0.4)); }
  // la luna y una farola
  R.disco(212, 22, 6, hex('#f4ecd0')); R.disco(215, 20, 5, d_CIELORq.noche[1][1]);
  { const x = 24; rect(x, 112, x + 1, 164, hex('#2a2834')); rect(x - 3, 106, x + 4, 112, hex('#2a2834')); rect(x - 2, 107, x + 3, 110, hex('#ffe8a0')); for (let j = 0; j < 40; j++) for (let i = -j / 3; i <= j / 3; i++) { const xx = Math.round(x + i), yy = 112 + j; if (d_umbralRq(xx, yy) < 0.15) pset(xx, yy, d_mezclaRq(R.pget(xx, yy), hex('#ffe8a0'), 0.35)); } }
  // gente que se mueve tras las puertas de cristal del vestíbulo (recortada a cada hoja); un coche que pasa
  for (const [x0, x1] of [[138, 156], [164, 182]]) { R.recorte([x0, 104, x1, 140]); for (let k = 0; k < 3; k++) { const x = x0 - 6 + ((t * (5 + k * 2) + k * 9) % (x1 - x0 + 12)); d_figuraRq(R, x, 140, t, hex('#5a3a2a'), { anda: true, pelo: hex('#3a2414'), piel: hex('#a8704a') }); } R.recorte(null); }
  { const x = Math.round(((t * 40) % 480) - 80), y = 176; rect(x - 18, y - 8, x + 18, y - 2, hex('#2a4a6a')); rect(x - 10, y - 13, x + 8, y - 8, hex('#2a4a6a')); rect(x - 9, y - 12, x + 7, y - 9, hex('#6a8aa8')); rect(x + 16, y - 6, x + 18, y - 5, hex('#fff4b0')); for (const dx of [-11, 11]) R.disco(x + dx, y - 1, 3, C.k); }
  return { suelo: 168, puerta: [136, 184, 150], taquilla: [160, 120], carteles: [[100, 120], [220, 120]], marquesina: [70, 250, 56, 92] };
}

// la paleta del desierto de Judea, del taller de Manchester y del museo
const d_PQ = pal({
  marga: '#dcc49a', margaS: '#b49a70', margaL: '#f0dcb4', margaD: '#8a7050', margaR: '#e8b890',
  moab: '#c88a8e', moabS: '#9a6a82', moabL: '#e8aa98', mar: '#4aa8b0', marL: '#8ad8d0', marS: '#2a7a8a',
  llano: '#d0b088', llanoS: '#a88a64', roca: '#7a5a42', rocaS: '#4e3828', rocaL: '#9a7656', rocaD: '#2e2018',
  ladrillo: '#7a3a2e', ladrilloS: '#4e2620', ladrilloL: '#9a4e3a', hollin: '#3a2e2e', hormigon: '#8a8a88', hormigonS: '#6a6a6a', hormigonL: '#a8a8a4',
  maquina: '#4a6a5a', maquinaS: '#2e4a3e', maquinaL: '#6a8a7a', acero: '#a8b0b8', aceroS: '#6a7280', aceroL: '#e0e6ec',
  tapete: '#2e6a4a', tapeteS: '#1e4a34', tapeteL: '#3e7e5a', oro: '#e8c040', oroL: '#fff0a0', oroS: '#b08a20',
  caliza: '#cbb894', calizaS: '#a8946e', calizaL: '#e2d2b0', calizaJ: '#8a7a5a', penumbra: '#2a2228',
  arena: '#e4c08a', arenaS: '#c09a64', arenaL: '#f4dcac', sillar: '#d4c8aa', sillarS: '#9a8a6c', sillarL: '#f4ecd2', sillarJ: '#5e4e3a',
});

// G · los acantilados de Qumrán al atardecer (qumran, general)
function d_dsQumran(R, t, o) {
  const P = d_PQ, hor = 96;
  // la silueta del acantilado: de la izquierda alta (y 30) a la llanura por la derecha
  const borde = (y) => 150 + Math.round((y - 30) * 0.62 + Math.sin(y * 0.2) * 3 + h(y >> 2, 0, 1101) * 4);
  const cuevas = [[46, 134, 20, 26, true], [96, 74, 7, 9], [120, 104, 8, 10], [30, 64, 6, 8], [150, 58, 5, 7], [72, 102, 5, 6]];
  const fondo = d_capaRq(R, 'ds-qum-f', () => d_degradadoRq(R, hor, 'tarde'));
  const capa = d_capaRq(R, 'ds-qum-c', () => {
    const { rect, pset, linea } = R;
    // los montes de Moab, rosados por el sol de poniente, y el mar Muerto
    d_sierraRq(R, 92, 26, 100, P.moab, P.moabL, 3.3, { sombra: P.moabS, filo: P.moabL });
    for (let y = 98; y < 114; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 98 ? P.marL : (x * 3 + y * 7) % 23 === 0 ? P.marL : y > 110 ? P.marS : P.mar);
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1102); pset(x, y, q < 0.15 ? P.llanoS : q > 0.88 ? P.margaL : P.llano); }
    // las ruinas de Qumrán: muros bajos de piedra, la torre, la cisterna y la tienda de la excavación
    for (const [x0, y0, x1, y1] of [[214, 124, 290, 140], [224, 128, 250, 136], [256, 118, 300, 130], [232, 140, 270, 148]]) { for (let yy = y0 + 2; yy < y1; yy++) for (let xx = x0 + 2; xx < x1; xx++) if (h(xx >> 2, yy >> 1, 1108) < 0.3) pset(xx, yy, P.llanoS); rect(x0, y0 - 2, x1, y0 - 1, P.margaL); rect(x0, y0, x1, y0 + 1, P.margaD); rect(x0, y1, x1, y1 + 1, P.margaD); rect(x0, y0, x0 + 1, y1, P.margaD); rect(x1, y0, x1 + 1, y1 + 1, P.margaD); rect(x0 + 1, y0 + 2, x1 - 1, y0 + 2, P.margaS); }
    d_sillarRq(R, 270, 104, 284, 122, [P.marga, P.margaS, P.margaL, P.margaD], 1, 3); rect(281, 104, 284, 122, P.margaS); for (let x = 270; x <= 284; x += 3) pset(x, 103, P.marga);
    R.poligono([[292, 146], [302, 132], [312, 146]], (x, y) => x < 302 ? hex('#e8dcc0') : hex('#b8a88a')); rect(301, 140, 303, 146, hex('#3a2a1e'));
    // el acantilado de marga: estratos, cárcavas verticales, la luz de poniente en las aristas
    for (let y = 26; y < 180; y++) { const xe = borde(y); for (let x = 0; x < Math.min(320, xe); x++) {
      const yt = 30 + Math.round(Math.sin(x * 0.05) * 6 + Math.sin(x * 0.13) * 2 + x * 0.04); if (y < yt) continue;
      const v = Math.sin(x * 0.23 + Math.sin(y * 0.07 + x * 0.02) * 2.2 + h(x >> 3, y >> 4, 1103) * 1.4) * 0.7 + Math.sin(x * 0.07 + 1) * 0.3, q = h(x >> 1, y >> 1, 1104), est = (Math.floor((y + Math.sin(x * 0.04) * 3) / 6) % 3 === 0) && (y % 6 === 0);
      let lv = v > 0.6 ? 3 : v > -0.35 ? 2 : v > -0.8 ? 1 : 0; if (est && lv > 0) lv--; if (Math.floor((y + Math.sin(x * 0.05) * 3) / 11) % 3 === 1 && lv === 2 && d_umbralRq(x, y) < 0.3) lv = 1; if (q < 0.06) lv = Math.max(0, lv - 1); let c = [P.margaD, P.margaS, P.marga, P.margaL][lv]; if (lv === 3 && q > 0.8) c = P.margaR;
      if (y - yt < 2) c = P.margaR; if (xe - x < 3) c = P.margaS; pset(x, y, c); } }
    // las bocas de las cuevas (la 3, grande, a pie de cornisa)
    for (const [cx, cy, rx, ry, grande] of cuevas) { for (let j = -ry; j <= (grande ? 26 : ry); j++) for (let i = -rx - 2; i <= rx + 2; i++) { const e = (i / rx) ** 2 + (Math.min(0, j) / ry) ** 2, f = j > 0 ? Math.abs(i) <= rx * (1 - j / 60) : e <= 1;
      if (f) pset(cx + i, cy + j, Math.abs(i) > rx - 2 && i > 0 ? P.rocaS : j > (grande ? 20 : ry - 2) ? P.roca : P.rocaD); else if (e <= 1.35 && j <= 0) pset(cx + i, cy + j, P.margaD); } }
    // la cornisa de cascajo a pie de cueva, con piedras sueltas y matas secas
    for (let y = 152; y < 180; y++) for (let x = 0; x < 214 + (y - 152); x++) { const q = h(x >> 1, y, 1105); pset(x, y, y === 152 ? P.margaL : q < 0.2 ? P.margaS : q > 0.85 ? P.margaL : P.marga); }
    for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 1106) * 220), y = 154 + Math.round(h(k, 2, 1106) * 24), r = 1 + Math.round(h(k, 3, 1106) * 2); R.disco(x, y + 1, r, P.margaD); R.disco(x, y, r, k % 3 ? P.margaS : P.marga); pset(x - 1, y - r + 1, P.margaL); }
    for (let k = 0; k < 8; k++) { const x = 20 + k * 26, y = 170 + (k % 3) * 3; for (let i = -3; i <= 3; i++) linea(x, y, x + i, y - 3 - (i & 1), hex('#8a7a4a')); }
    // la senda que baja a las ruinas
    const senda = [[70, 152], [150, 152], [190, 140], [214, 132], [236, 128]];
    for (let i = 0; i + 1 < senda.length; i++) { linea(senda[i][0], senda[i][1], senda[i + 1][0], senda[i + 1][1], P.margaL); linea(senda[i][0], senda[i][1] + 1, senda[i + 1][0], senda[i + 1][1] + 1, P.margaS); }
    // las cuerdas y la escala de los excavadores en la boca de la cueva
    linea(60, 108, 66, 150, hex('#a8905a')); for (let y = 112; y < 150; y += 5) linea(57 + (y - 108) / 7, y, 65 + (y - 108) / 7, y, hex('#8a7044'));
    rect(10, 140, 26, 152, hex('#6a5a3a')); rect(11, 141, 25, 151, hex('#8a7a5a')); rect(10, 144, 26, 144, hex('#5a4a2a'));   // una caja de herramientas
  });
  R.copiar(fondo);
  d_nubesRq(R, t, hor, 'tarde', 4, { ymax: 70 });
  // el brillo del agua que se mueve
  d_pegarRq(R, capa, 24);
  const { pset } = R;
  for (let k = 0; k < 26; k++) { const x = Math.round(((h(k, 1, 1107) * 340 + t * (2 + (k % 3))) % 340) - 10), y = 100 + (k % 10); if (x > borde(y) && Math.sin(t * 3 + k) > 0) { pset(x, y, P.marL); pset(x + 1, y, hex('#e0fff4')); } }
  // los cuervos que planean sobre el cortado
  for (let k = 0; k < 3; k++) { const a = t * (0.35 + k * 0.08) + k * 2, x = Math.round(120 + Math.cos(a) * (40 + k * 12)), y = Math.round(46 + Math.sin(a) * 10 + k * 6), b = Math.floor(t * 4 + k) % 3 === 0 ? 1 : 0;
    for (let i = -3; i <= 3; i++) pset(x + i, y - (Math.abs(i) > 1 ? b : 0) + (Math.abs(i) === 3 ? 1 : 0), hex('#1e1824')); }
  // los arqueólogos diminutos con sus lámparas, que bajan por la senda; y la lámpara de la tienda
  const senda = [[70, 152], [150, 152], [190, 140], [214, 132], [236, 128]];
  for (let k = 0; k < 3; k++) { const u = ((t * 0.04 + k * 0.33) % 1), s = u * 4, i = Math.min(3, Math.floor(s)), f = s - i, x = senda[i][0] + (senda[i + 1][0] - senda[i][0]) * f, y = senda[i][1] + (senda[i + 1][1] - senda[i][1]) * f, lejos = y < 145;
    d_figuraRq(R, x, y, t, [hex('#c8b078'), hex('#e8e0cc'), hex('#a8905a')][k], { anda: true, som: hex('#e8d8a8'), lampara: true }); if (lejos) {} }
  if (Math.sin(t * 7) > -0.7) { pset(299, 143, hex('#ffd870')); pset(300, 143, hex('#fff0a0')); }
  return { suelo: 160, cueva: [46, 134, 26, 66], cornisa: [0, 200], ruinas: [214, 300, 128], mar: [98, 112], senda };
}

// G · dentro de la cueva 3 (qumran, cámara 'cueva')
function d_dsCueva(R, t, o) {
  const P = d_PQ;
  const capa = d_capaRq(R, 'ds-cueva', () => {
    const { rect, pset, linea } = R;
    // por la boca: el cielo del atardecer, los montes de Moab y el mar
    d_degradadoRq(R, 110, 'tarde');
    d_sierraRq(R, 104, 18, 114, P.moab, P.moabL, 7.1, { sombra: P.moabS });
    for (let y = 112; y < 124; y++) for (let x = 200; x < 320; x++) pset(x, y, (x + y * 3) % 17 === 0 ? P.marL : P.mar);
    for (let y = 124; y < 180; y++) for (let x = 200; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 1110) < 0.2 ? P.llanoS : P.llano);
    // la roca de la cueva en estratos: más oscura hacia el fondo, con aristas de luz cerca de la boca
    const boca = (x, y) => { const cx = 268, cy = 104; return ((x - cx) / 46) ** 2 + ((y - cy) / 70) ** 2 < 1 + Math.sin(y * 0.3) * 0.06 + h(y >> 2, 1, 1111) * 0.08 && y < 150; };
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (boca(x, y)) continue;
      const luz = Math.max(0.12, 1 - Math.hypot(x - 268, y - 104) / 270), q = h(x >> 3, y >> 2, 1112), est = ((y + Math.round(Math.sin(x * 0.03) * 6 + Math.sin(x * 0.11) * 2)) % 9) === 0;
      let lv = Math.floor(luz * 4.2 + (q - 0.5) * 0.7 + d_umbralRq(x, y) - 0.5); if (est) lv--; if (h(x >> 2, y >> 4, 1115) < 0.04) lv--; lv = Math.max(0, Math.min(4, lv)); let c = [P.rocaD, P.rocaS, P.roca, P.rocaL, P.margaR][lv];

      pset(x, y, c); }
    for (let y = 30; y < 160; y++) for (let x = 210; x < 320; x++) if (!boca(x, y) && (boca(x - 1, y) || boca(x + 1, y) || boca(x, y - 1))) pset(x, y, P.margaR);
    // el suelo de polvo y cascajo
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (boca(x, y)) continue; const q = h(x >> 1, y, 1113), luz = Math.max(0, 1 - Math.abs(x - 220) / 200); let c = q < 0.2 ? P.margaD : q > 0.85 ? P.margaS : hex('#9a8060');
      if (d_umbralRq(x, y) > luz + 0.2) c = d_mezclaRq(c, P.rocaD, 0.5); pset(x, y, c); }
    rect(0, 150, 319, 150, P.rocaS);
    // piedras caídas y tinajas rotas
    for (const [x, y, r] of [[30, 160, 8], [62, 170, 5], [250, 168, 7], [290, 158, 6], [110, 174, 4], [196, 160, 3]]) { R.disco(x, y + 1, r, P.rocaD); R.disco(x, y, r, P.roca); R.disco(x - 1, y - 1, r * 0.6, P.rocaL); }
    { const x = 84, y = 156; R.poligono([[x - 8, y], [x - 9, y - 14], [x - 5, y - 22], [x + 5, y - 22], [x + 9, y - 14], [x + 8, y]], (xx, yy) => xx > x + 4 ? hex('#8a5a3a') : yy % 6 === 0 ? hex('#a87050') : hex('#c08a62')); rect(x - 4, y - 25, x + 4, y - 22, hex('#a87050'));
      R.poligono([[x + 2, y - 22], [x + 9, y - 14], [x + 5, y - 10]], P.rocaS); }   // una tinaja con un tajo
    for (const [x, y] of [[100, 162], [108, 166], [214, 164], [222, 170]]) { R.poligono([[x, y], [x + 6, y - 3], [x + 8, y + 1]], hex('#c08a62')); pset(x + 4, y, hex('#8a5a3a')); }
  });
  R.copiar(capa);
  const { rect, pset } = R;
  // el haz de luz que entra por la boca, con el polvo que flota
  for (let y = 60; y < 176; y++) { const x0 = Math.round(268 - (y - 60) * 1.2), w = 26 + (y - 60) * 0.25; for (let x = x0 - w; x < x0 + w; x++) if (d_umbralRq(x, y) < 0.18 && x < 230) { const c = R.pget(x, y); pset(x, y, d_mezclaRq(c, hex('#ffd8a0'), 0.25)); } }
  for (let k = 0; k < 22; k++) { const u = ((t * 0.05 + h(k, 1, 1114)) % 1), x = Math.round(240 - u * 140 + Math.sin(t + k) * 4), y = Math.round(80 + h(k, 2, 1114) * 80 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.5 + k) > -0.3) pset(x, y, hex('#ffe8c0')); }
  // la lámpara de petróleo en el suelo, que tiembla, con su halo
  { const x = 128, y = 158, fl = Math.sin(t * 11) * 0.5 + Math.sin(t * 6.7) * 0.5;
    for (let j = -26; j <= 26; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j * 1.2) / (28 + fl * 2); if (d < 1 && d_umbralRq(x + i, y - 8 + j) < (1 - d) * 0.55) pset(x + i, y - 8 + j, d_mezclaRq(R.pget(x + i, y - 8 + j), hex('#ffc870'), 0.3)); }
    rect(x - 3, y - 2, x + 3, y, hex('#5a4a3a')); rect(x - 2, y - 9, x + 2, y - 3, hex('#e8e0c0')); rect(x - 1, y - 8 + Math.round(fl), x + 1, y - 4, hex('#ffd060')); pset(x, y - 7 + Math.round(fl), hex('#fff4c0')); rect(x - 3, y - 10, x + 3, y - 10, hex('#5a4a3a')); R.linea(x - 3, y - 10, x, y - 14, hex('#5a4a3a')); R.linea(x + 3, y - 10, x, y - 14, hex('#5a4a3a')); }
  // un murciélago que revolotea en la penumbra de arriba
  { const a = t * 1.3, x = Math.round(70 + Math.cos(a) * 40), y = Math.round(28 + Math.sin(a * 2) * 10), b = Math.floor(t * 12) % 2; pset(x, y, hex('#1a1218')); pset(x, y + 1, hex('#1a1218')); for (const d of [-1, 1]) { pset(x + d, y - b, hex('#3a2a30')); pset(x + 2 * d, y - 1 + b, hex('#3a2a30')); pset(x + 3 * d, y + b, hex('#3a2a30')); } }
  let piezas = null;
  if (o.rollo !== false) piezas = rollo(R, 160, 160, t, { estado: 'enrollado', s: 1.4, trocito: o.trocito });
  return { suelo: 162, rollo: [160, 160], piezas: piezas && piezas.piezas, boca: [222, 314, 34, 150], lampara: [128, 158] };
}

// G · el taller de Manchester de 1955–1956 (taller, general)
function d_dsTaller(R, t, o) {
  const P = d_PQ, n = Math.max(0, Math.min(23, Math.round(o.cortes ?? 0)));
  const capa = d_capaRq(R, 'ds-taller', () => {
    const { rect, pset, linea } = R;
    // las paredes de ladrillo ennegrecido, con su hollín arriba
    for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const f = y >> 2, j = (y & 3) === 3 || ((x + (f & 1) * 5) % 10) === 0, q = h(x / 10 | 0, f, 1120);
      let c = j ? hex('#4a3a34') : q < 0.2 ? P.ladrilloS : q > 0.85 ? P.ladrilloL : P.ladrillo; if (d_umbralRq(x, y) < (1 - y / 70) * 0.6) c = d_mezclaRq(c, P.hollin, 0.5); pset(x, y, c); }
    // las cerchas del techo
    rect(0, 0, 319, 6, hex('#2a2428')); for (let x = 0; x < 320; x += 40) { linea(x, 6, x + 20, 0, hex('#4a4448')); linea(x + 40, 6, x + 20, 0, hex('#4a4448')); } rect(0, 6, 319, 7, hex('#3a3438'));
    // los ventanales de fábrica: marco de hierro con muchos cristales
    for (const x0 of [18, 228]) { rect(x0, 16, x0 + 74, 84, hex('#2a2a30')); for (let y = 18; y < 84; y += 11) for (let x = x0 + 2; x < x0 + 74; x += 12) rect(x, y, x + 10, y + 9, hex('#7a8a98')); rect(x0 - 2, 84, x0 + 76, 87, hex('#a8a4a0')); }
    // el eje de transmisión del techo con sus poleas
    rect(0, 22, 319, 23, P.aceroS); for (const x of [56, 150]) { R.disco(x, 23, 6, C.k); R.disco(x, 23, 5, P.aceroS); R.disco(x, 23, 2, P.acero); }
    // el suelo de hormigón con manchas de aceite y las líneas pintadas
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1121); let c = q < 0.15 ? P.hormigonS : q > 0.9 ? P.hormigonL : P.hormigon; if (y === 160 || (x - (y - 132) * 0.3) % 80 < 1) c = P.hormigonS; pset(x, y, c); }
    rect(0, 132, 319, 133, hex('#3a3438'));
    for (const [x, y, r] of [[60, 156, 8], [200, 170, 10], [276, 152, 6]]) d_sombraRq(R, x, y, r, 2, 0.35, hex('#2a2a30'));
    rect(0, 176, 319, 177, hex('#c8a040')); for (let x = 0; x < 320; x += 12) rect(x, 176, x + 5, 177, hex('#2a2a30'));
    // el torno, a la izquierda, con su bancada y su motor
    { const x0 = 12, y0 = 112; rect(x0, y0, x0 + 70, y0 + 10, P.maquinaS); rect(x0 + 1, y0 + 1, x0 + 69, y0 + 8, P.maquina); rect(x0 + 1, y0 + 1, x0 + 69, y0 + 1, P.maquinaL);
      rect(x0 + 4, y0 + 10, x0 + 14, 150, P.maquinaS); rect(x0 + 56, y0 + 10, x0 + 66, 150, P.maquinaS); rect(x0 + 5, y0 + 11, x0 + 13, 149, P.maquina); rect(x0 + 57, y0 + 11, x0 + 65, 149, P.maquina);
      rect(x0 + 2, y0 - 16, x0 + 18, y0, P.maquinaS); rect(x0 + 3, y0 - 15, x0 + 17, y0 - 1, P.maquina); rect(x0 + 3, y0 - 15, x0 + 17, y0 - 15, P.maquinaL); rect(x0 + 54, y0 - 10, x0 + 64, y0, P.maquinaS);
      rect(x0 + 18, y0 - 6, x0 + 54, y0 - 4, P.acero); rect(x0 + 18, y0 - 6, x0 + 54, y0 - 6, P.aceroL); R.disco(x0 + 10, y0 - 8, 3, P.acero); for (const dx of [26, 36]) { R.disco(x0 + dx, y0 + 4, 2, P.acero); } }
    // el tablero de herramientas en la pared
    rect(104, 40, 200, 84, hex('#8a6a44')); for (let y = 42; y < 84; y += 4) for (let x = 106; x < 200; x += 4) pset(x, y, hex('#5a4428'));
    for (const [x, tipo] of [[110, 0], [122, 1], [134, 2], [146, 0], [160, 3], [172, 1], [186, 2]]) { if (tipo === 0) { rect(x, 46, x + 1, 66, P.aceroS); rect(x - 2, 46, x + 3, 49, P.acero); } else if (tipo === 1) { rect(x, 50, x + 1, 70, hex('#c83a3a')); rect(x, 70, x + 1, 78, P.acero); } else if (tipo === 2) { R.anillo(x + 2, 56, 4, P.acero); rect(x + 1, 60, x + 3, 74, P.aceroS); } else { rect(x - 2, 46, x + 6, 50, P.acero); rect(x + 1, 50, x + 3, 70, hex('#8a5a2a')); } }
    // el reloj de la pared y el calendario de barras (sin letras)
    R.disco(212, 40, 9, C.k); R.disco(212, 40, 8, hex('#f0ece0')); for (let k = 0; k < 12; k++) pset(Math.round(212 + Math.cos(k * Math.PI / 6) * 6), Math.round(40 + Math.sin(k * Math.PI / 6) * 6), C.k);
    rect(98, 90, 118, 110, hex('#f0ece0')); rect(98, 90, 118, 94, hex('#c83a3a')); for (let y = 97; y < 109; y += 3) for (let x = 100; x < 117; x += 3) pset(x, y, hex('#5a5a68'));
    // el banco de la sierra fina en el centro: patas de hierro, el tablero, el carro y el motor
    { const x0 = 130, x1 = 200, y = 130; rect(x0, y, x1, y + 4, C.k); rect(x0 + 1, y + 1, x1 - 1, y + 3, P.acero); rect(x0 + 1, y + 1, x1 - 1, y + 1, P.aceroL);
      for (const lx of [x0 + 4, x1 - 8]) { rect(lx, y + 4, lx + 4, 168, P.maquinaS); rect(lx + 1, y + 4, lx + 3, 167, P.maquina); } rect(x0 + 4, 156, x1 - 4, 158, P.maquinaS);
      rect(x0 + 18, y + 6, x0 + 40, y + 20, P.maquinaS); rect(x0 + 19, y + 7, x0 + 39, y + 19, P.maquina); for (let k = 0; k < 4; k++) rect(x0 + 21, y + 9 + k * 3, x0 + 37, y + 9 + k * 3, P.maquinaS);
      rect(x0 + 6, y - 6, x0 + 26, y, P.aceroS); rect(x0 + 7, y - 5, x0 + 25, y - 1, P.acero); R.disco(x0 + 16, y - 9, 4, P.aceroS); }   // el carro con su tornillo
    // el banco de trabajo con el tornillo de banco y la tetera en su hornillo
    { const x0 = 86, x1 = 126, y = 136; rect(x0, y, x1, y + 3, hex('#5a3a22')); rect(x0, y, x1, y, hex('#8a5a38')); rect(x0 + 2, y + 3, x0 + 4, 166, hex('#3a2414')); rect(x1 - 4, y + 3, x1 - 2, 166, hex('#3a2414')); rect(x0 + 2, 158, x1 - 2, 159, hex('#3a2414'));
      rect(x0 + 4, y - 8, x0 + 14, y - 1, P.maquinaS); rect(x0 + 5, y - 7, x0 + 13, y - 2, P.maquina); rect(x0 + 2, y - 10, x0 + 16, y - 8, P.acero);
      rect(x1 - 16, y - 3, x1 - 4, y - 1, hex('#3a3a40')); R.disco(x1 - 10, y - 8, 5, hex('#4a4a52')); R.disco(x1 - 11, y - 9, 2, hex('#7a7a84')); rect(x1 - 4, y - 10, x1 - 1, y - 9, hex('#4a4a52')); rect(x1 - 12, y - 14, x1 - 8, y - 13, hex('#4a4a52')); }
    // la mesa del tapete verde donde se ponen las tiras en fila
    { const x0 = 214, x1 = 306, y = 134; rect(x0, y, x1, y + 4, hex('#5a3a22')); rect(x0 + 1, y - 4, x1 - 1, y, P.tapete); rect(x0 + 1, y - 4, x1 - 1, y - 4, P.tapeteL); for (const lx of [x0 + 3, x1 - 6]) rect(lx, y + 4, lx + 3, 168, hex('#3a2414')); rect(x0 + 3, 160, x1 - 3, 161, hex('#3a2414')); }
    // un armario de cajones y la estufa de carbón al fondo a la derecha
    rect(300, 92, 320, 132, hex('#4a5a6a')); for (let y = 96; y < 132; y += 8) { rect(301, y, 319, y, hex('#2e3a46')); rect(308, y + 3, 312, y + 4, P.acero); }
  });
  R.copiar(capa);
  const { rect, pset, linea } = R;
  // la lluvia de Manchester tras los cristales (recortada a cada ventanal) y el cielo gris que pasa
  for (const x0 of [18, 228]) { R.recorte([x0 + 2, 18, x0 + 72, 82]);
    for (let y = 18; y < 83; y++) R.linea(x0 + 2, y, x0 + 72, y, (x) => d_umbralRq(x, y) < (y - 18) / 90 + Math.sin(x * 0.1 + t * 0.4) * 0.1 ? hex('#8a96a2') : hex('#a8b4be'));
    for (let k = 0; k < 7; k++) { const cx = x0 + ((k * 23 + t * 3) % 90) - 10, cy = 26 + (k % 3) * 9; for (let i = 0; i < 16; i++) R.pset(cx + i, cy + (i % 5 === 0 ? 1 : 0), hex('#c4ccd4')); }
    R.poligono([[x0 + 2, 82], [x0 + 2, 60], [x0 + 20, 58], [x0 + 22, 50], [x0 + 30, 50], [x0 + 32, 62], [x0 + 72, 62], [x0 + 72, 82]], hex('#5a5a66'));
    R.linea(x0 + 26, 50, x0 + 26, 38, hex('#5a5a66')); R.linea(x0 + 27, 50, x0 + 27, 38, hex('#5a5a66'));   // la chimenea de una fábrica vecina
    for (let k = 0; k < 40; k++) { const x = x0 + 2 + ((k * 13 + Math.floor(t * 60) * 3) % 70), y = 18 + ((k * 29 + Math.floor(t * 60) * 7) % 64); R.linea(x, y, x - 1, y + 3, hex('#d8e0e8')); }
    R.recorte(null);
    for (let y = 18; y < 84; y += 11) rect(x0 + 2, y - 1, x0 + 73, y - 1, hex('#2a2a30')); for (let x = x0 + 2; x < x0 + 74; x += 12) rect(x - 1, 16, x - 1, 84, hex('#2a2a30'));
    for (let k = 0; k < 3; k++) { const x = x0 + 8 + k * 24, y = 20 + ((t * 9 + k * 17) % 60); pset(x, Math.round(y), hex('#e8f0f8')); pset(x, Math.round(y) + 1, hex('#c4ccd4')); } }   // gotas que resbalan
  // las correas del eje al torno y al banco, que corren
  for (const [xa, ya, xb, yb] of [[56, 23, 26, 96], [150, 23, 160, 131]]) { linea(xa - 5, ya, xb - 3, yb, hex('#3a2a20')); linea(xa + 5, ya, xb + 3, yb, hex('#3a2a20')); const L = Math.hypot(xb - xa, yb - ya); for (let k = 0; k < 6; k++) { const u = ((t * 1.6 + k / 6) % 1); pset(Math.round(xa - 5 + (xb - 3 - xa + 5) * u), Math.round(ya + (yb - ya) * u), hex('#8a6a4a')); pset(Math.round(xa + 5 + (xb + 3 - xa - 5) * (1 - u)), Math.round(ya + (yb - ya) * (1 - u)), hex('#8a6a4a')); } }
  { const a = t * 6; for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; pset(Math.round(56 + Math.cos(an) * 4), Math.round(23 + Math.sin(an) * 4), P.aceroL); pset(Math.round(150 + Math.cos(-an) * 4), Math.round(23 + Math.sin(-an) * 4), P.aceroL); } }
  // la sierra circular muy fina: el disco que gira con sus dientes y un brillo
  { const cx = 172, cy = 122, r = 10, gira = o.gira !== false ? t * 14 : 0;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const a = Math.atan2(j, i); pset(cx + i, cy + j, d > r - 1.2 ? ((Math.floor((a + gira) / (Math.PI / 12)) & 1) ? P.aceroS : P.aceroL) : d < 2 ? C.k : Math.abs(Math.sin(a * 2 + gira)) > 0.97 ? C.blanco : P.acero); }
    rect(cx - 12, cy - 4, cx - 10, cy + 8, P.maquinaS); rect(cx + 10, cy + 2, cx + 18, cy + 8, P.maquinaS); }
  // la tetera que humea, las lámparas de pantalla verde que se mecen un poco y su luz
  for (let k = 0; k < 3; k++) for (let j = 0; j < 16; j++) { const u = ((t * 0.6 + k / 3) % 1), x = Math.round(124 + j * 0.3 + Math.sin(j * 0.4 + t * 2 + k) * 1.5), y = 126 - j - Math.round(u * 6); if (d_umbralRq(x, y) < 0.5 - j / 32) pset(x, y, hex('#e8ecf0')); }
  for (const lx of [60, 166, 262]) { const m = Math.round(Math.sin(t * 0.8 + lx) * 1.2); linea(lx, 7, lx + m, 30, C.k); R.poligono([[lx + m - 8, 38], [lx + m - 3, 30], [lx + m + 3, 30], [lx + m + 8, 38]], P.maquina); rect(lx + m - 8, 38, lx + m + 8, 38, P.maquinaS); rect(lx + m - 2, 39, lx + m + 2, 40, hex('#fff4c0'));
    for (let j = 0; j < 90; j++) { const w = 6 + j * 0.35; for (let i = -w; i <= w; i += 1) { const x = Math.round(lx + m + i), y = 41 + j; if (d_umbralRq(x, y) < 0.1) pset(x, y, d_mezclaRq(R.pget(x, y), hex('#fff0c0'), 0.3)); } } }
  // las agujas del reloj
  { const an = t * Math.PI / 30, am = t * Math.PI / 1800; linea(212, 40, Math.round(212 + Math.sin(an) * 6), Math.round(40 - Math.cos(an) * 6), C.k); linea(212, 40, Math.round(212 + Math.sin(am + 2) * 4), Math.round(40 - Math.cos(am + 2) * 4), C.k); }
  // las tiras ya cortadas en fila sobre el tapete
  for (let k = 0; k < n; k++) { const x = 217 + (k % 12) * 7, y = 128 + Math.floor(k / 12) * 3 - 2; rect(x, y, x + 5, y + 1, k % 3 ? hex('#5aa890') : hex('#8a8a5a')); pset(x + 1, y, hex('#c87a3a')); pset(x + 4, y + 1, hex('#3a7a68')); }
  // el rollo sujeto en el carro, delante del disco
  rollo(R, 148, 127, t, { estado: 'enrollado', s: 0.8, uno: true });
  return { suelo: 168, banco: [130, 200, 130], sierra: [172, 122], mesaTiras: [214, 306, 130], torno: [12, 82, 112], tetera: [116, 128] };
}

// G · la sierra de cerca (taller, cámara 'sierra': inserto)
function d_dsSierra(R, t, o) {
  const P = d_PQ, corte = Math.max(0, Math.min(1, o.corte ?? 0.5)), gira = o.gira !== false, cx = 168, cy = 104, rs = 58;
  const capa = d_capaRq(R, 'ds-sierra', () => {
    const { rect, pset, linea } = R;
    // el fondo del taller, desenfocado: ladrillo en penumbra, una ventana con luz gris y el tablero de herramientas
    for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const f = y >> 3, j = (y & 7) === 7 || ((x + (f & 1) * 10) % 20) === 0; let c = j ? hex('#2e2426') : h(x / 20 | 0, f, 1134) < 0.3 ? hex('#4a2a26') : hex('#5a322a'); if (d_umbralRq(x, y) < 0.25 + Math.abs(x - 160) / 500) c = d_mezclaRq(c, hex('#1c1418'), 0.5); pset(x, y, c); }
    rect(240, 10, 306, 66, hex('#2a2a30')); for (let y = 12; y < 66; y += 14) for (let x = 242; x < 306; x += 16) rect(x, y, x + 14, y + 12, hex('#6a7682'));
    rect(14, 20, 90, 70, hex('#5a4630')); for (let k = 0; k < 6; k++) rect(20 + k * 12, 28, 22 + k * 12, 56 - (k % 3) * 6, [hex('#7a8088'), hex('#a83a2a'), hex('#7a8088')][k % 3]);
    // el tablero de la máquina: acero cepillado con su ranura y la regla grabada
    for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 3, y, 1135); let c = q < 0.2 ? P.aceroS : q > 0.85 ? P.aceroL : P.acero; if (y === 124) c = P.aceroL; if (y === 125) c = hex('#5a6270'); pset(x, y, c); }
    rect(0, 150, 319, 152, hex('#4a525e')); for (let x = 4; x < 320; x += 6) rect(x, 126, x, x % 30 === 4 ? 131 : 128, hex('#4a525e'));
    // las mordazas de bronce que sujetan el rollo, a cada lado
    for (const x0 of [96, 222]) { rect(x0, 104, x0 + 26, 140, hex('#5a4020')); rect(x0 + 1, 105, x0 + 25, 139, hex('#b0883e')); rect(x0 + 1, 105, x0 + 25, 106, hex('#e0b860')); for (const y of [112, 132]) { R.disco(x0 + 13, y, 3, hex('#5a4020')); R.disco(x0 + 13, y, 2, hex('#d8b060')); pset(x0 + 12, y, hex('#5a4020')); } }
    // la bandeja de las tiras ya cortadas, a la derecha, y la lupa en su brazo, a la izquierda
    rect(256, 150, 318, 178, hex('#3a3a42')); rect(258, 152, 316, 176, hex('#5a5a62'));
    for (let k = 0; k < 4; k++) d_tiraQ(R, 261 + k * 14, 154, 11, 20, 60 + k, { paso: 3 });
    linea(0, 60, 30, 84, hex('#4a4a52')); linea(0, 61, 30, 85, hex('#6a6a72')); R.disco(30, 85, 3, hex('#3a3a42')); linea(30, 85, 44, 112, hex('#4a4a52')); linea(31, 85, 45, 112, hex('#6a6a72'));
  });
  R.copiar(capa);
  const { rect, pset, linea } = R;
  // el disco de la sierra, grande y finísimo, visto de frente: dientes que corren, el brillo radial que gira y el cubo
  const g = gira ? t * 9 : 0;
  for (let j = -rs - 3; j <= 24; j++) for (let i = -rs - 3; i <= rs + 3; i++) { const d = Math.hypot(i, j); if (d > rs + 2.5) continue; const a = Math.atan2(j, i), x = cx + i, y = cy + j;
    let c; if (d > rs) { const dt = ((a + g) / (Math.PI * 2) * 48 % 1 + 1) % 1; if (d - rs > dt * 2.6) continue; c = dt < 0.4 ? P.aceroL : P.aceroS; }
    else if (d > rs - 2) c = P.aceroS; else if (d < 9) c = d < 4 ? C.k : d < 6 ? P.aceroS : P.acero;
    else { const sh = Math.cos(a * 2 - g * 0.3); c = sh > 0.92 ? C.blanco : sh > 0.6 ? P.aceroL : sh < -0.7 ? P.aceroS : P.acero; if (Math.abs(d - rs * 0.62) < 0.6) c = P.aceroS; }
    pset(x, y, c); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + g * 0.1; R.disco(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), 1, P.aceroL); }
  // el protector verde de la sierra, arriba
  for (let j = -rs - 8; j <= -rs + 10; j++) for (let i = -rs - 8; i <= rs + 8; i++) { const d = Math.hypot(i, j); if (d > rs + 4 && d < rs + 9 && j < -rs * 0.55) pset(cx + i, cy + j, d > rs + 7.5 ? P.maquinaS : d < rs + 5 ? P.maquinaL : P.maquina); }
  // el rollo, de punta, en sus mordazas: la espiral de cobre verde por delante del disco y la ranura del corte
  const rr = 22, ry = 128;
  for (let j = -rr - 1; j <= rr + 1; j++) for (let i = -rr - 1; i <= rr + 1; i++) { const d = Math.hypot(i, j); if (d > rr + 1) continue; const a = Math.atan2(j, i), x = cx + i, y = ry + j;
    if (d > rr) { pset(x, y, hex('#1e3a34')); continue; } const vuelta = (d / 3.2 + a / (Math.PI * 2)) % 1, q = h(x >> 1, y >> 1, 1136);
    let c = vuelta < 0.22 ? hex('#1e3a34') : j < -6 ? hex('#7ac0a4') : j < 8 ? hex('#5aa890') : hex('#3a7a68'); if (q < 0.1 && vuelta >= 0.22) c = hex('#c87a3a'); if (d < 2) c = C.k; pset(x, y, c); }
  const prof = Math.round(corte * rr * 2); for (let j = 0; j < prof; j++) { pset(cx, ry - rr + j, C.k); if (j % 3 === 0) pset(cx + 1, ry - rr + j, hex('#e8a060')); }
  // virutas finas y chispas diminutas que saltan del corte; y el polvo de cobre que cae
  if (gira) for (let k = 0; k < 22; k++) { const u = ((t * 2.4 + k / 22) % 1), a = -0.3 - h(k, 1, 1137) * 2.5, s = k % 2 ? 1 : -1, x = Math.round(cx + s * Math.abs(Math.cos(a)) * u * 46), y = Math.round(ry - rr + Math.sin(a) * u * 30 + u * u * 40); pset(x, y, u < 0.25 ? hex('#fff0a0') : k % 3 ? hex('#e8a060') : hex('#8ac8a8')); }
  for (let k = 0; k < 8; k++) { const u = ((t * 0.8 + k / 8) % 1); pset(cx - 6 + (k * 5) % 13, Math.round(ry + rr + 2 + u * 24), hex('#7ab09a')); }
  // la lupa: aumenta los dientes del disco donde entra en el cobre, y su brillo
  { const lx = 58, ly = 118, r = 18; R.disco(lx, ly, r + 2, hex('#2a2a32')); R.disco(lx, ly, r + 1, hex('#a8a8b0')); const tmp = [];
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) tmp.push([i, j, R.pget(Math.round(cx + i * 0.45), Math.round(ry - rr + j * 0.45))]);
    for (const [i, j, c] of tmp) pset(lx + i, ly + j, d_mezclaRq(c, hex('#e0f0ff'), 0.12)); linea(lx - 10, ly - 6, lx - 5, ly - 12, C.blanco); pset(lx - 11, ly - 5, C.blanco); }
  // la luz de la lámpara del taller (un charco cálido que tiembla apenas sobre el tablero)
  d_sombraRq(R, cx, 150, 90 + Math.round(Math.sin(t * 9) * 1.5), 12, 0.14, hex('#fff4d0'));
  return { suelo: 180, corte: [cx, ry - rr], disco: [cx, cy, rs], rollo: [cx, ry, rr], lupa: [58, 118], bandeja: [256, 318, 150] };
}

// una tira del rollo vista desde arriba (x, y: esquina; w × a), con renglones de trazos grabados y su pátina; k: semilla
function d_tiraQ(R, x, y, w, a, k, o = {}) {
  const { pset, rect } = R;
  rect(x + 1, y + 1, x + w + 1, y + a + 1, hex('#14301e'));   // la sombra en el tapete
  for (let j = 0; j <= a; j++) for (let i = 0; i <= w; i++) { const q = h((x + i) >> 1, (y + j) >> 1, 1140 + k), borde = i === 0 || j === 0 || i === w || j === a;
    if (borde && h(i, j, 1141 + k) < 0.3) continue; let c = q < 0.25 ? hex('#4a8a78') : q < 0.75 ? hex('#5aa890') : hex('#7ac0a4'); if (h(i >> 1, j >> 1, 1142 + k) < 0.08) c = hex('#c87a3a'); if (borde) c = hex('#2e5a4e'); pset(x + i, y + j, c); }
  const paso = o.paso ?? 3;
  for (let j = 3; j < a - 1; j += paso) { let i = 2; while (i < w - 3) { const L = 1 + Math.floor(h(i, j, 1143 + k) * 3); for (let u = 0; u < L; u++) pset(x + i + u, y + j + ((u + i) % 3 === 0 ? -1 : 0), hex('#1e3a34')); if (h(i, j, 1144 + k) < 0.25) pset(x + i, y + j - 1, hex('#1e3a34')); i += L + 1; } }
}

// un lingote dorado de lado (para el margen y la montaña) y una moneda
function d_lingoteQ(R, x, y, s = 1) { const w = 6 * s, a = 3 * s; R.poligono([[x, y + a], [x + s, y], [x + w - s, y], [x + w, y + a]], d_PQ.oro); R.rect(x + s, y, x + w - s, y, d_PQ.oroL); R.rect(x, y + a, x + w, y + a, d_PQ.oroS); }

function d_monedaQ(R, x, y, r = 2) { R.disco(x, y, r, d_PQ.oroS); R.disco(x - 0.4, y - 0.4, r - 0.6, d_PQ.oro); R.pset(Math.round(x - r / 2), Math.round(y - r / 2), d_PQ.oroL); }

// las letras griegas sueltas, como símbolos dorados de 5 × 5 (Δ, Σ, Π, Ω, Χ, Κ)
const d_GRIEGAQ = [['..#..', '.#.#.', '.#.#.', '#...#', '#####'], ['#####', '.#...', '..#..', '.#...', '#####'], ['#####', '.#.#.', '.#.#.', '.#.#.', '.#.#.'], ['.###.', '#...#', '#...#', '.#.#.', '##.##'], ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'], ['#..#.', '#.#..', '##...', '#.#..', '#..#.']];

function d_griegaQ(R, x, y, k, t, s = 1, brillo = 1) {
  const f = d_GRIEGAQ[k % d_GRIEGAQ.length], g = 0.5 + 0.5 * Math.sin(t * 3 + k * 1.7);
  f.forEach((fila, j) => { for (let i = 0; i < 5; i++) if (fila[i] === '#') { R.rect(x + i * s + 1, y + j * s + 1, x + i * s + s, y + j * s + s, hex('#5a3a10')); R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, brillo > 0.5 && g > 0.6 && j === 0 ? d_PQ.oroL : d_PQ.oro); } });
  if (brillo > 0.5 && g > 0.85) { const cx = x + 5 * s + 1, cy = y - 1; R.pset(cx, cy, C.blanco); R.pset(cx - 1, cy, d_PQ.oroL); R.pset(cx + 1, cy, d_PQ.oroL); R.pset(cx, cy - 1, d_PQ.oroL); R.pset(cx, cy + 1, d_PQ.oroL); }
}

// la montaña de lingotes, monedas y vasijas que crece desde abajo (u 0–1) hasta llenar el plano
function d_montonQ(R, t, u) {
  if (u <= 0) return;
  const cima = Math.round(lerp(190, -24, u)), ancho = 70 + u * 300, items = [];
  for (let k = 0; k < 520; k++) { const fx = h(k, 1, 1150) - 0.5, fy = h(k, 2, 1150), x = Math.round(160 + fx * ancho), surf = cima + Math.pow(Math.abs(fx) * 2, 1.6) * (196 - cima), y = Math.round(surf + fy * fy * (196 - surf)); if (y > 186 || x < -12 || x > 332 || (x > 262 && y < 52) || (y < 18 && x > 10 && x < 180)) continue; items.push([y, x, k]); }
  items.sort((a, b) => a[0] - b[0]); for (const [y, x, k] of items) { const tipo = k % 7;
    if (tipo < 4) d_lingoteQ(R, x, y, 2); else if (tipo < 6) d_monedaQ(R, x, y, 3); else { const c = k % 2 ? hex('#c8a040') : hex('#a8b0b8'), cS = k % 2 ? hex('#8a6a20') : hex('#6a7280'); R.disco(x, y, 5, cS); R.disco(x - 1, y - 1, 4, c); R.rect(x - 2, y - 8, x + 2, y - 5, cS); R.rect(x - 3, y - 9, x + 3, y - 8, c); R.pset(x - 2, y - 2, C.blanco); } }
  for (let k = 0; k < 10; k++) { if (Math.sin(t * 4 + k * 2.3) < 0.7) continue; const x = Math.round(160 + (h(k, 3, 1151) - 0.5) * ancho), y = Math.round(cima + 10 + h(k, 4, 1151) * (190 - cima)); R.pset(x, y, C.blanco); R.pset(x - 1, y, d_PQ.oroL); R.pset(x + 1, y, d_PQ.oroL); R.pset(x, y - 1, d_PQ.oroL); R.pset(x, y + 1, d_PQ.oroL); }
}

// G · las 23 tiras sobre el tapete (tiras, general)
function d_dsTiras(R, t, o) {
  const P = d_PQ, gr = Math.max(0, Math.min(1, o.griegas ?? 0)), mon = Math.max(0, Math.min(1, o.monton ?? 0));
  const tiras = []; for (let k = 0; k < 23; k++) { const fila = Math.floor(k / 8), col = k % 8; tiras.push([22 + col * 30 + (fila === 2 ? 15 : 0), 30 + fila * 44, 24, 36]); }
  const capa = d_capaRq(R, 'ds-tiras', () => {
    const { rect, pset } = R;
    // el tapete verde con su lanilla y el borde de la mesa de madera
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 1160); pset(x, y, q < 0.2 ? P.tapeteS : q > 0.9 ? P.tapeteL : P.tapete); }
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 300, (y - 90) / 170); if (d_umbralRq(x, y) < (d - 0.3) * 1.2) pset(x, y, d_mezclaRq(R.pget(x, y), C.k, 0.35)); }
    tiras.forEach(([x, y, w, a], k) => d_tiraQ(R, x, y, w, a, k));
    // en los márgenes, lingotes y monedas dibujados (la lista de escondites)
    tiras.forEach(([x, y, w, a], k) => { if (k % 3 === 0) d_lingoteQ(R, x + w - 8, y + a - 6, 1); else if (k % 3 === 1) d_monedaQ(R, x + w - 4, y + a - 4, 1.6); });
    // la regla, la libreta con las cifras y el lápiz
    rect(268, 8, 316, 14, hex('#e8d8a8')); for (let x = 270; x < 316; x += 3) rect(x, 8, x, x % 15 === 0 ? 11 : 10, hex('#3a3020'));
    rect(270, 128, 316, 172, hex('#f0ece0')); rect(270, 128, 316, 131, hex('#c83a3a')); for (let y = 136; y < 170; y += 5) rect(272, y, 314, y, hex('#a8c8e8'));
    R.linea(250, 176, 290, 150, hex('#e8c040')); R.linea(251, 176, 291, 150, hex('#c8a020')); R.pset(291, 149, hex('#3a3020'));
  });
  R.copiar(capa);
  R.numero('23', 276, 143, { color: hex('#2a3a6a'), sombra: false }); R.numero('64', 276, 157, { color: hex('#2a3a6a'), sombra: false });
  // la luz de la lámpara que tiembla apenas y un brillo que recorre el cobre
  { const u = (t * 0.25) % 1, bx = Math.round(lerp(0, 320, u)); for (const [x, y, w, a] of tiras) if (Math.abs(x + w / 2 - bx) < 14) for (let j = 2; j < a; j += 4) R.pset(x + 2 + ((j + Math.floor(t * 10)) % (w - 4)), y + j, hex('#c8f0dc')); }
  // las letras griegas sueltas que aparecen como símbolos dorados
  const sitios = [[2, 8, 14], [6, 10, 22], [9, 4, 6], [13, 12, 26], [17, 6, 18], [20, 14, 10]];
  sitios.forEach(([k, dx, dy], i) => { const a = Math.max(0, Math.min(1, gr * 6 - i)); if (a <= 0) return; const [x, y] = tiras[k]; d_griegaQ(R, x + dx - 2, y + dy, i, t, 1, a); });
  d_montonQ(R, t, mon);
  return { suelo: 180, tiras, libreta: [270, 128, 316, 172], griegas: sitios.map(([k, dx, dy]) => [tiras[k][0] + dx, tiras[k][1] + dy]) };
}

// G · tres tiras de cerca con la lupa (tiras, cámara 'lupa')
function d_dsLupa(R, t, o) {
  const P = d_PQ, gr = Math.max(0, Math.min(1, o.griegas ?? 0)), mon = Math.max(0, Math.min(1, o.monton ?? 0));
  const capa = d_capaRq(R, 'ds-lupa', () => {
    const { pset } = R;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 1161); pset(x, y, q < 0.2 ? P.tapeteS : q > 0.9 ? P.tapeteL : P.tapete); }
    for (const [x, k] of [[16, 30], [118, 31], [220, 32]]) d_tiraQ(R, x, 14, 84, 152, k, { paso: 8 });
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 160) / 320, (y - 90) / 180); if (d_umbralRq(x, y) < (d - 0.25) * 1.1) pset(x, y, d_mezclaRq(R.pget(x, y), C.k, 0.4)); }
    d_lingoteQ(R, 80, 150, 2); d_monedaQ(R, 190, 152, 3); d_lingoteQ(R, 282, 150, 2);
  });
  R.copiar(capa);
  const { pset } = R;
  // la lupa que se mueve despacio sobre un renglón, aumentando los trazos (y el símbolo griego cuando aparece)
  const lx = Math.round(158 + Math.sin(t * 0.5) * 10), ly = Math.round(86 + Math.sin(t * 0.37) * 3), r = 34;
  if (gr > 0) d_griegaQ(R, 152, 80, 1, t, 2, gr);
  for (let j = -r - 3; j <= r + 3; j++) for (let i = -r - 3; i <= r + 3; i++) { const d = Math.hypot(i, j); if (d > r + 3) continue; if (d > r) { pset(lx + i, ly + j, d > r + 2 ? C.k : j < 0 ? hex('#e0c060') : hex('#a88020')); continue; } }
  { const tmp = []; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) tmp.push([i, j, R.pget(Math.round(lx + i * 0.55), Math.round(ly + j * 0.55))]);
    for (const [i, j, c] of tmp) pset(lx + i, ly + j, d_mezclaRq(c, hex('#e8f8ff'), 0.1)); }
  for (let k = 0; k < 6; k++) pset(lx - 18 + k, ly - 24 + Math.round(k * 0.3), C.blanco);
  for (let k = 0; k < 40; k++) { const x = lx + r + 2 + Math.round(k * 0.8), y = ly + r + 2 + k; pset(x, y, hex('#3a2414')); pset(x + 1, y, hex('#6a4228')); pset(x + 2, y, hex('#3a2414')); }
  if (gr > 0.5) { const b = Math.round(Math.sin(t * 3) * 2); R.icono('?', lx + r + 10, ly - r - 4 + b, hex('#f6f2ea'), C.k, 2); }
  d_montonQ(R, t, mon);
  return { suelo: 180, lupa: [lx, ly, r], griega: [150, 80] };
}

// G · el museo de Amán (museo, general)
function d_dsMuseo(R, t, o) {
  const P = d_PQ;
  const capa = d_capaRq(R, 'ds-museo', () => {
    const { rect, pset, linea } = R;
    // los muros de sillería caliza en penumbra (más claros bajo los focos)
    d_sillarRq(R, 0, 0, 319, 150, [P.caliza, P.calizaS, P.calizaL, P.calizaJ], 70, 8);
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const l = Math.max(...[60, 160, 260].map((fx) => Math.max(0, 1 - Math.hypot((x - fx) / 1.4, y - 70) / 70))); if (d_umbralRq(x, y) > l * 0.9 + 0.08) pset(x, y, d_mezclaRq(R.pget(x, y), P.penumbra, 0.55)); }
    rect(0, 0, 319, 8, hex('#2a2226')); for (const fx of [60, 160, 260]) { rect(fx - 1, 8, fx + 1, 14, C.k); rect(fx - 4, 14, fx + 4, 19, hex('#3a3a42')); rect(fx - 3, 19, fx + 3, 19, hex('#fff4c0')); }
    // la puerta del fondo a la ciudadela al sol (columnas del templo, el cielo) — la gente pasa en cada fotograma
    rect(136, 34, 184, 112, hex('#2a2226')); for (let y = 36; y < 110; y++) for (let x = 138; x < 182; x++) pset(x, y, y < 84 ? (d_umbralRq(x, y) < (y - 36) / 48 ? hex('#a8d8f4') : hex('#74bef2')) : hex('#e4c89a'));
    for (const cx of [146, 158, 172]) { rect(cx, 50, cx + 4, 92, hex('#e8d4a8')); rect(cx + 3, 50, cx + 4, 92, hex('#c4ac80')); rect(cx - 1, 48, cx + 5, 50, hex('#d8c498')); }
    rect(138, 46, 182, 48, hex('#d8c498'));
    R.poligono([[136, 36], [160, 26], [184, 36]], hex('#2a2226'));
    // las vitrinas laterales con tinajas y lámparas de barro, iluminadas
    for (const x0 of [12, 238]) { rect(x0, 70, x0 + 70, 150, hex('#3a3036')); rect(x0 + 2, 72, x0 + 68, 120, hex('#4a4a56')); for (let y = 72; y < 120; y++) for (let x = x0 + 2; x < x0 + 69; x++) if (d_umbralRq(x, y) < (1 - (y - 72) / 60) * 0.4) pset(x, y, hex('#6a6a7a'));
      for (const [dx, k] of [[14, 0], [34, 1], [54, 2]]) { const cx = x0 + dx, b = 118; if (k === 1) { rect(cx - 6, b - 3, cx + 6, b, hex('#a87050')); R.disco(cx, b - 4, 4, hex('#c08a62')); pset(cx + 5, b - 5, hex('#ffcf60')); } else { R.poligono([[cx - 6, b], [cx - 7, b - 18], [cx - 4, b - 26], [cx + 4, b - 26], [cx + 7, b - 18], [cx + 6, b]], (x, y) => x > cx + 3 ? hex('#8a5a3a') : (y % 7 === 0 ? hex('#a87050') : hex('#c8946a'))); rect(cx - 5, b - 30, cx + 5, b - 26, hex('#a87050')); } }
      rect(x0, 120, x0 + 70, 122, hex('#8a8a96')); rect(x0 + 2, 124, x0 + 68, 148, hex('#4a3a34')); for (let y = 130; y < 146; y += 6) rect(x0 + 6, y, x0 + 30, y + 1, hex('#8a7a6a')); }
    // el suelo de losas pulidas que reflejan
    for (let y = 150; y < 180; y++) { const f = y - 150; for (let x = 0; x < 320; x++) { const j = f % Math.round(4 + f / 4) === 0 || ((x - 160) / (f + 20) * 6 % 1 + 1) % 1 < 0.06; pset(x, y, j ? hex('#5a4a44') : h(x >> 2, y >> 1, 1170) < 0.2 ? hex('#8a7a6a') : hex('#9a8a78')); } }
    rect(0, 150, 319, 151, hex('#3a3036'));
    // la vitrina central: el zócalo de madera oscura, la tapa de cristal y las tiras dentro, bajo su foco
    rect(104, 128, 216, 162, hex('#2a1e1a')); rect(106, 130, 214, 160, hex('#3a2a24')); rect(106, 130, 214, 130, hex('#5a4434')); for (let x = 118; x < 214; x += 24) rect(x, 134, x + 16, 156, hex('#33241e'));
    rect(104, 108, 216, 128, hex('#5a6a7a')); rect(106, 110, 214, 126, hex('#2a3a4a'));
    for (let k = 0; k < 12; k++) { const x = 110 + k * 8.5, y = 113 + (k % 2) * 4; rect(Math.round(x), y, Math.round(x) + 5, y + 7, hex('#5aa890')); pset(Math.round(x) + 1, y + 2, hex('#1e3a34')); pset(Math.round(x) + 3, y + 4, hex('#1e3a34')); pset(Math.round(x) + 2, y + 1, hex('#c87a3a')); }
    rect(104, 107, 216, 108, hex('#c8d4e0'));
    // la silla del vigilante con su gorra encima
    { const x = 222, y = 150; rect(x, y - 10, x + 8, y - 9, hex('#5a3a22')); rect(x, y - 22, x + 1, y, hex('#3a2414')); rect(x + 7, y - 9, x + 8, y, hex('#3a2414')); rect(x + 2, y - 13, x + 7, y - 11, hex('#2a3a5a')); }
  });
  R.copiar(capa);
  const { pset, rect } = R;
  // gente pequeña que pasa por fuera, al sol, al otro lado de la puerta (recortada a su hueco)
  R.recorte([138, 36, 181, 109]); for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, x = d > 0 ? ((t * (6 + k) + k * 23) % 70) + 128 : 192 - ((t * (5 + k) + k * 31) % 70); d_figuraRq(R, x, 104, t, [hex('#c84a3a'), hex('#e8e0cc'), hex('#3a6aa8')][k], { anda: true, dir: d }); } R.recorte(null);
  // el polvo que flota en los conos de los focos y el foco de la vitrina
  for (const fx of [60, 160, 260]) for (let j = 0; j < 128; j++) { const w = 4 + j * 0.28; for (let i = -w; i <= w; i++) { const x = Math.round(fx + i), y = 20 + j; if (d_umbralRq(x, y) < 0.07) pset(x, y, d_mezclaRq(R.pget(x, y), hex('#fff0c8'), 0.3)); } }
  for (let k = 0; k < 18; k++) { const fx = [60, 160, 260][k % 3], x = Math.round(fx + Math.sin(t * 0.4 + k) * (8 + k % 5 * 3)), y = Math.round(30 + ((t * 3 + k * 23) % 110)); if (Math.sin(t * 2 + k) > 0) pset(x, y, hex('#fff4d8')); }
  // el reflejo que barre la tapa de cristal y el brillo de las tiras
  { const u = (t * 0.2) % 1, rx = Math.round(lerp(90, 240, u)); for (let k = 0; k < 4; k++) R.linea(rx + k, 126, rx + k + 12, 110, k % 2 ? hex('#a8c0d8') : hex('#e0ecf8')); rect(104, 107, 216, 108, hex('#c8d4e0')); rect(104, 109, 105, 128, hex('#5a6a7a')); rect(215, 109, 216, 128, hex('#5a6a7a')); }
  for (let k = 0; k < 12; k++) if (Math.sin(t * 2.5 + k * 1.9) > 0.8) pset(112 + Math.round(k * 8.5), 114 + (k % 2) * 4, hex('#c8f0dc'));
  return { suelo: 172, vitrina: [104, 216, 108, 162], puerta: [136, 184, 112], vitrinas: [[12, 82], [238, 308]], silla: [226, 150] };
}

// G · la vitrina de cerca (museo, cámara 'vitrina')
function d_dsVitrina(R, t, o) {
  const P = d_PQ;
  const capa = d_capaRq(R, 'ds-vitrina', () => {
    const { rect, pset } = R;
    // la pared de caliza en penumbra detrás, el marco de la vitrina y su fondo de tela
    d_sillarRq(R, 0, 0, 319, 180, [P.caliza, P.calizaS, P.calizaL, P.calizaJ], 71, 10);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (d_umbralRq(x, y) > 0.35 - Math.abs(x - 160) / 600) pset(x, y, d_mezclaRq(R.pget(x, y), P.penumbra, 0.6));
    rect(24, 58, 296, 166, hex('#2a2226')); rect(28, 62, 292, 162, hex('#3a3440'));
    for (let y = 64; y < 160; y++) for (let x = 30; x < 290; x++) { const l = Math.max(0, 1 - Math.hypot((x - 160) / 2.2, y - 70) / 90); pset(x, y, (x + y) % 4 === 0 ? hex('#2e3a5a') : d_umbralRq(x, y) < l * 0.8 ? hex('#4a5a80') : hex('#3a4a6a')); }
    // las tiras en sus atriles inclinados, con su cartela de barras debajo
    for (let k = 0; k < 7; k++) { const x = 40 + k * 36, y = 76; rect(x - 2, y + 56, x + 26, y + 58, hex('#6a6a7a')); rect(x + 10, y + 58, x + 14, y + 66, hex('#5a5a68')); d_tiraQ(R, x, y, 24, 54, 40 + k, { paso: 4 });
      rect(x, y + 72, x + 24, y + 78, hex('#e8e0cc')); rect(x + 2, y + 74, x + 18, y + 74, hex('#5a5a68')); rect(x + 2, y + 76, x + 12, y + 76, hex('#8a8a96')); }
    // el zócalo de madera de la vitrina y el suelo
    rect(20, 162, 300, 180, hex('#2a1e1a')); rect(22, 164, 298, 180, hex('#3a2a24')); rect(22, 164, 298, 164, hex('#5a4434'));
    for (let x = 0; x < 20; x++) for (let y = 162; y < 180; y++) pset(x, y, hex('#5a4a44')); for (let x = 300; x < 320; x++) for (let y = 162; y < 180; y++) pset(x, y, hex('#5a4a44'));
  });
  R.copiar(capa);
  const { pset, rect, linea } = R;
  // el foco que ilumina las tiras: un brillo que recorre el cobre
  for (let k = 0; k < 7; k++) { const x = 40 + k * 36; if (Math.sin(t * 1.4 - k * 0.6) > 0.6) for (let j = 0; j < 54; j += 5) pset(x + 3 + ((j + k) % 18), 78 + j, hex('#c8f0dc')); }
  // el cristal: un velo muy leve, los reflejos que barren en diagonal y el canto de luz arriba
  R.recorte([28, 62, 292, 162]);
  { const u = (t * 0.16) % 1, rx = Math.round(lerp(-40, 340, u)); for (let k = 0; k < 10; k++) linea(rx + k * (k < 6 ? 1 : 2) + (k >= 6 ? 6 : 0), 162, rx + k * (k < 6 ? 1 : 2) + (k >= 6 ? 6 : 0) + 50, 62, k % 3 === 0 ? hex('#c8d8e8') : hex('#8aa0b8'), k > 5 ? 2 : 0); }
  for (let y = 62; y < 163; y += 2) for (let x = 28 + (y & 2); x < 293; x += 6) if (d_umbralRq(x, y) < 0.06) pset(x, y, d_mezclaRq(R.pget(x, y), hex('#e0ecf8'), 0.3));
  R.recorte(null);
  rect(28, 62, 292, 62, hex('#e0ecf8')); rect(28, 63, 292, 63, hex('#8aa0b8'));
  return { suelo: 178, cristal: [28, 62, 292, 162], tiras: Array.from({ length: 7 }, (_, k) => [40 + k * 36, 76, 64 + k * 36, 130]) };
}

// G · el desierto de los escalones (escalones, general y cerca)
function d_dsEscalones(R, t, o, cerca) {
  const P = d_PQ, hor = cerca ? 78 : 92;
  // un tramo de escalones de sillería: n peldaños de alto a y huella w, que suben hacia dir (1 este, −1 oeste); x, y: el pie
  const tramo = (x, y, n, w, a, dir, k, lado = 4) => {
    const x0 = dir > 0 ? x : x - n * w - lado, x1 = dir > 0 ? x + n * w + lado : x;
    R.poligono([[x0 - 2, y], [x1 + 2, y], [x1 - 8, y + 4], [x0 - 10, y + 4]], (px, py) => d_mezclaRq(R.pget(px, py), P.sillarJ, 0.45));   // la sombra en la arena
    for (let i = 0; i < n; i++) { const xs = dir > 0 ? x + i * w : x - (i + 1) * w, top = y - (i + 1) * a, ax = dir > 0 ? xs : x0, bx = dir > 0 ? x1 : xs + w;
      d_sillarRq(R, ax, top, bx, top + a - 1, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], k + i, Math.max(3, a));
      R.poligono([[xs, top], [xs + w + (dir > 0 ? 0 : 0), top], [xs + w + 2, top - 2], [xs + 2, top - 2]], P.sillarL);   // la huella, en escorzo
      R.rect(xs, top, xs + w, top, hex('#fffaf0'));
      R.rect(dir > 0 ? xs : xs + w, top, dir > 0 ? xs : xs + w, top + a - 1, P.sillarJ);   // la arista de la contrahuella
      if (i === n - 1) R.rect(dir > 0 ? x1 - 1 : x0, top, dir > 0 ? x1 : x0 + 1, y - 1, P.sillarS); } };
  const capa = d_capaRq(R, `ds-esc-${cerca}`, () => {
    const { rect, pset, linea } = R;
    // las dunas lejanas y la meseta, con su bruma de calima
    const c1 = d_sierraRq(R, hor + 4, cerca ? 10 : 18, hor + 20, hex('#e0b888'), hex('#f0dcb8'), 2.7, { sombra: hex('#c49a70'), filo: hex('#f4dcb0') });
    for (let y = hor + 6; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x >> 1, y >> 1, 1180), rizo = Math.sin(x * 0.18 + y * 0.9 + Math.sin(x * 0.03) * 3) > 0.86; if (y < c1[x] + 6) continue; pset(x, y, rizo ? P.arenaS : q < 0.12 ? P.arenaS : q > 0.88 ? P.arenaL : P.arena); }
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 1181) * 319), y = hor + 26 + Math.round(h(k, 2, 1181) * 60); R.disco(x, y + 1, 1.5, P.sillarJ); R.disco(x, y, 1.5, P.sillarS); }
    if (!cerca) {
      // ruinas lejanas: columnas rotas, un arco, muros bajos y escalones que suben a nada
      for (const [x, y, a] of [[20, 112, 26], [34, 112, 18], [292, 110, 30], [304, 110, 14]]) { d_sillarRq(R, x, y - a, x + 6, y, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], x, 4); rect(x - 1, y - a - 1, x + 7, y - a, P.sillarL); }
      tramo(60, 116, 6, 4, 3, 1, 10); tramo(258, 114, 5, 4, 3, -1, 20); tramo(108, 106, 4, 3, 2, 1, 30); tramo(222, 104, 4, 3, 2, -1, 40);
      { const x0 = 196, y0 = 110; d_sillarRq(R, x0, y0 - 26, x0 + 6, y0, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 50, 4); d_sillarRq(R, x0 + 24, y0 - 26, x0 + 30, y0, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 51, 4);
        for (let a = 0; a <= Math.PI; a += 0.02) for (let r = 12; r <= 15; r++) pset(Math.round(x0 + 15 + Math.cos(a) * r), Math.round(y0 - 26 - Math.sin(a) * r), r === 15 ? P.sillarJ : P.sillar); }
      // en el plano medio: un tramo que baja a la tierra (con su boca oscura) y una escalera de caracol alrededor de un pilar
      { const x0 = 24, y0 = 140; R.poligono([[x0, y0], [x0 + 40, y0], [x0 + 46, y0 + 8], [x0 - 6, y0 + 8]], P.sillarJ); for (let i = 0; i < 4; i++) { rect(x0 + 2 + i * 2, y0 + 1 + i * 2, x0 + 38 - i * 2, y0 + 2 + i * 2, i % 2 ? P.sillar : P.sillarS); rect(x0 + 2 + i * 2, y0 + 1 + i * 2, x0 + 38 - i * 2, y0 + 1 + i * 2, P.sillarL); } rect(x0 + 10, y0 + 9, x0 + 30, y0 + 10, P.rocaD); }
      { const cx = 262, b = 152; d_sillarRq(R, cx - 4, b - 50, cx + 4, b, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 60, 4); for (let i = 0; i < 12; i++) { const a = i * 0.9, x = Math.round(cx + Math.cos(a) * 10), y = b - 4 - i * 4; if (Math.sin(a) > -0.2) { rect(x - 5, y, x + 5, y + 2, P.sillar); rect(x - 5, y, x + 5, y, P.sillarL); rect(x - 5, y + 2, x + 5, y + 2, P.sillarJ); } } }
      tramo(78, 156, 6, 6, 4, 1, 70); tramo(246, 160, 5, 7, 4, -1, 80); tramo(196, 142, 4, 5, 3, 1, 90); tramo(150, 128, 4, 5, 3, -1, 95); tramo(100, 136, 3, 5, 3, -1, 96);
      { d_sillarRq(R, 128, 118, 140, 126, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 97, 4); tramo(140, 118, 4, 3, 3, 1, 98); }   // escalones que suben de un muro a nada
      // el pie de unos escalones en primer plano, que suben hacia la derecha y hacia la izquierda
      tramo(0, 180, 4, 8, 5, 1, 100); tramo(320, 180, 3, 9, 5, -1, 110);
    } else {
      // de cerca: un tramo grande que sube a un arco, otro que baja a una boca oscura, y peldaños al frente
      tramo(10, 168, 8, 9, 7, 1, 120, 6);
      { const x0 = 70, y0 = 112; d_sillarRq(R, x0, y0 - 40, x0 + 8, y0, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 121, 5); d_sillarRq(R, x0 + 30, y0 - 40, x0 + 38, y0, [P.sillar, P.sillarS, P.sillarL, P.sillarJ], 122, 5);
        for (let a = 0; a <= Math.PI; a += 0.015) for (let r = 15; r <= 19; r++) pset(Math.round(x0 + 19 + Math.cos(a) * r), Math.round(y0 - 40 - Math.sin(a) * r), r === 19 ? P.sillarJ : (Math.floor(a * 6) % 2 ? P.sillarL : P.sillar)); }
      { const x0 = 220, y0 = 150; R.poligono([[x0, y0], [x0 + 80, y0], [x0 + 92, y0 + 20], [x0 - 12, y0 + 20]], P.sillarJ); for (let i = 0; i < 5; i++) { rect(x0 + 3 + i * 3, y0 + 2 + i * 3, x0 + 77 - i * 3, y0 + 4 + i * 3, i % 2 ? P.sillar : P.sillarS); rect(x0 + 3 + i * 3, y0 + 2 + i * 3, x0 + 77 - i * 3, y0 + 2 + i * 3, P.sillarL); } rect(x0 + 18, y0 + 17, x0 + 62, y0 + 20, P.rocaD); }
      tramo(320, 140, 6, 8, 6, -1, 130, 6); tramo(120, 186, 3, 30, 5, 1, 140, 0);
    }
  });
  const fondo = d_capaRq(R, `ds-esc-f-${cerca}`, () => d_degradadoRq(R, hor, 'calor', [236, 34, 8]));
  R.copiar(fondo);
  d_nubesRq(R, t, hor, 'calor', 3, { ymax: hor - 30, v: 0.6 });
  d_pegarRq(R, capa, hor - 22);
  const { pset, rect } = R;
  // los buitres que giran en el cielo
  for (let k = 0; k < 2; k++) { const a = t * 0.5 + k * 3, x = Math.round(120 + Math.cos(a) * 30 + k * 40), y = Math.round(40 + Math.sin(a) * 8), b = Math.floor(t * 3 + k) % 4 === 0 ? 1 : 0; for (let i = -4; i <= 4; i++) pset(x + i, y - (Math.abs(i) > 2 ? b : 0) + (Math.abs(i) === 4 ? 1 : 0), hex('#3a2e2a')); }
  // un camello lejano que cruza las dunas con su camellero
  if (!cerca) { const x = Math.round(((t * 4) % 380) - 30), y = hor + 10, p = Math.floor(t * 3) % 2; rect(x, y - 6, x + 8, y - 4, hex('#b08a5a')); rect(x + 2, y - 8, x + 5, y - 6, hex('#b08a5a')); rect(x + 8, y - 9, x + 9, y - 5, hex('#b08a5a')); rect(x + 9, y - 10, x + 11, y - 9, hex('#b08a5a')); for (const dx of [1, 7]) { rect(x + dx + p, y - 3, x + dx + p, y, hex('#8a6a42')); rect(x + dx + 1 - p, y - 3, x + dx + 1 - p, y, hex('#8a6a42')); } d_figuraRq(R, x - 6, y, t, hex('#e8e0cc'), { anda: true, som: hex('#e8e0cc') }); }
  // la calima que tiembla sobre la arena y la arena que vuela con el viento
  for (let y = hor + 4; y < hor + 14; y += 2) for (let x = 0; x < 320; x += 3) { const s = Math.round(Math.sin(t * 6 + x * 0.3 + y) * 1); if (s !== 0 && d_umbralRq(x, y) < 0.3) { const c = R.pget(x + s, y); pset(x, y, c); } }
  for (let k = 0; k < 30; k++) { const x = Math.round(((h(k, 1, 1182) * 340 + t * (30 + k % 5 * 6)) % 340) - 10), y = Math.round(hor + 30 + h(k, 2, 1182) * 70 + Math.sin(t * 2 + k) * 2); pset(x, y, P.arenaL); if (k % 3 === 0) pset(x - 1, y, P.arena); }
  // una lagartija que corre de piedra en piedra
  { const u = (t % 9) / 9, x = Math.round(lerp(-6, 330, u)), y = cerca ? 172 : 168, s = Math.floor(t * 12) % 2; if (Math.sin(t * 1.3) > -0.4 || u > 0.5) { rect(x, y, x + 5, y, hex('#8a9a4a')); pset(x + 6, y, hex('#6a7a3a')); pset(x - 1, y + 1, hex('#8a9a4a')); pset(x - 2, y + 1, hex('#8a9a4a')); pset(x + 1, y - 1 + s, hex('#6a7a3a')); pset(x + 4, y + 1 - s, hex('#6a7a3a')); } }
  return cerca ? { suelo: 168, libre: [110, 210], arco: [89, 92], boca: [238, 282, 170], subida: [10, 82] } : { suelo: 164, libre: [120, 190], sol: [236, 34], horizonte: hor };
}

// (copiado de th-comun.js: el cielo rico, las nubes de tres tonos y las cordilleras)
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_um = (x, y) => e_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (los de hex(): 0xAABBGGRR) en la proporción a (0–1)
function e_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// cifras diminutas de 3 × 5 (los números de las casas): solo dígitos
// los cielos ricos, de arriba abajo: [fracción de la altura hasta el horizonte, color]; y los tres tonos de sus nubes
const e_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.2, '#4aa6ea'], [0.42, '#74bef2'], [0.64, '#90caf2'], [0.82, '#a8daf4'], [0.94, '#d0e8ee']],
  tarde: [[0, '#24225a'], [0.14, '#3a3a7a'], [0.3, '#5e3e82'], [0.45, '#a0507a'], [0.58, '#cc626a'], [0.7, '#e88a5a'], [0.83, '#f8c070'], [0.94, '#fde4a4']],
  noche: [[0, '#0c1030'], [0.3, '#141a3e'], [0.6, '#1e2650'], [0.84, '#2c3466'], [0.95, '#3a4274']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const e_NUBES = Object.fromEntries(Object.entries({ dia: ['#a8d6f2', '#d2ecfc', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#1a2048', '#262e58', '#343e6c'] }).map(([k, v]) => [k, v.map(hex)]));

const e_colD = pal({
  estrella: '#8a94c0', estela: '#f4f8fc', estelaS: '#cfe4f4', estelaT: '#ffd8b4', estelaTS: '#f0a888', ave: '#2a2436', luna: '#f4ecd0', lunaS: '#c8c0a8',
  halo: '#fff8dc', haloT: '#ffe6a0', luz: '#ffe8a0', luzL: '#fff6d0', vidrioN: '#16182c', calido: '#ff9a5a',
  tronco: '#b0a08c', falda: '#9a7a44', faldaS: '#7a5a30', cogollo: '#6a5a3a', palma: '#2e6a2a', palmaS: '#245a24',
});

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function e_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]); R.rect(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// cielo rico (cielo() es compartido y no se toca): bandas con transición tramada; el sol con su halo tramado (grande y
// bajo al atardecer); la estela de un avión que se deshace detrás de él; cirros lejanos casi quietos y cúmulos medianos y
// cercanos a distinta velocidad; de noche, estrellas que titilan, la luna en cuarto creciente, una fugaz de vez en
// cuando y las luces de un avión. o.hor; o.modo: 'dia' | 'tarde' | 'noche'; o.sol [x, y, r] (null: sin sol); o.luna
// [x, y, r]; o.estela [y en x = 0, pendiente] (null: sin avión); o.nubes (false: sin nubes); o.cumulos (5)
function e_cielo(R, t, o = {}) {
  const { pset, disco } = R, hor = o.hor ?? 96, modo = o.modo ?? 'dia', B = R.buf, P = e_CIELOS[modo], tr = 3, lim = P.map(([f]) => Math.round(f * hor));
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = e_um(x, y) < p ? b : a;
  }
  const atom = (x, y) => x > 272 && y < 48;   // la esquina de Atom queda tranquila
  if (modo === 'noche') {
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.25 * (hor - 6)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? C.blanco : e_colD.estrella; if (k % 11 === 0 && tw > 0.75) { pset(x - 1, y, e_colD.estrella); pset(x + 1, y, e_colD.estrella); pset(x, y - 1, e_colD.estrella); pset(x, y + 1, e_colD.estrella); } }
    const [lx, ly, lr] = o.luna ?? [212, 26, 6];   // la luna en cuarto creciente, con su halo
    for (let y = ly - lr - 4; y <= ly + lr + 4; y++) for (let x = lx - lr - 4; x <= lx + lr + 4; x++) { if (y < 0 || y >= hor || x < 0 || x > 319) continue; const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? e_colD.lunaS : e_colD.luna; else if (d > lr && d < lr + 4 && e_um(x, y) < (lr + 4 - d) / 8) B[y * 320 + x] = e_mezcla(B[y * 320 + x], e_colD.luna, 0.25); }
    { const k = Math.floor(t / 7), u = (t % 7) / 0.7; if (u < 1) { const x0 = 30 + h(k, 1, 305) * 190, y0 = 8 + h(k, 2, 305) * hor * 0.3; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 60 - i * 1.7), y = Math.round(y0 + u * 22 - i * 0.6); if (y >= 0 && y < hor && !atom(x, y)) pset(x, y, i < 2 ? C.blanco : e_colD.estrella); } } }
  } else {
    const sol = o.sol === undefined ? (modo === 'tarde' ? [214, hor - 14, 12] : [226, 22, 8]) : o.sol;
    if (sol) {
      const [sx, sy, sr] = sol, gl = modo === 'tarde' ? e_colD.haloT : e_colD.halo, R2 = sr + (modo === 'tarde' ? 18 : 10);
      for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) {
        const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (e_um(x, y) < q * q) B[y * 320 + x] = e_mezcla(B[y * 320 + x], gl, 0.42); }
      if (modo === 'tarde') e_discoSol(R, sol, 'tarde');
    }
  }
  // la estela del avión: recta y densa junto a él, luego más ancha, ondulada y rala hasta deshacerse
  if (o.estela !== null) {
    const [e0, pe] = o.estela ?? [hor * 0.45, 0.04], u = ((t + (o.fase ?? 3)) % 44) * 10 - 40, ax = Math.round(u), ay = Math.round(e0 + u * pe);
    if (modo !== 'noche') { const ce = modo === 'tarde' ? e_colD.estelaT : e_colD.estela, ce2 = modo === 'tarde' ? e_colD.estelaTS : e_colD.estelaS;
      for (let i = 3; i < 190; i++) { const x = ax - i, y = Math.round(ay - i * pe + (i > 60 ? Math.sin(i * 0.15 + t * 0.2) * 0.8 : 0)); if (x < 0 || x > 319 || y < 1 || y >= hor - 1 || atom(x, y)) continue; const d = i < 40 ? 1 : i < 120 ? 0.95 - (i - 40) / 130 : 0.33 - (i - 120) / 240;
        if (e_um(x, y) < d) B[y * 320 + x] = ce; if (i > 18 && e_um(x, y + 1) < d * 0.75) B[(y + 1) * 320 + x] = ce2; if (i > 70 && e_um(x, y - 1) < d * 0.5) B[(y - 1) * 320 + x] = ce2; } }
    if (ax >= 0 && ax < 320 && !atom(ax, ay)) { if (modo !== 'noche') { R.rect(ax - 2, ay, ax + 1, ay, C.blanco); pset(ax - 1, ay - 1, C.grisL); } if (Math.floor(t * 2.5) % 2) pset(ax + 1, ay, C.rojo); else if (modo === 'noche') pset(ax, ay, C.blanco); }
  }
  if (o.nubes === false) { if (modo === 'dia' && o.sol !== null) e_discoSol(R, o.sol ?? [226, 22, 8], 'dia'); return; }
  const cn = e_NUBES[modo];
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 4; k++) { const w = 34 + Math.round(h(k, 5, 302) * 46), x0 = ((h(k, 6, 302) * 440 + t * (0.7 + k * 0.25)) % 470) - 80, y = Math.max(18, Math.round(hor * (0.16 + k * 0.1)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 303) < 0.22) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) pset(x + 3, y - 1, cn[2]); if (e > 0.5 && i % 5 === 0) pset(x - 4, y + 1, cn[0]); } }
  // cúmulos: los lejanos, pequeños y lentos; los cercanos, grandes y más rápidos
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 10 : 14 + ((k * 7) % 9), v = cerca ? 3.6 + k * 1.2 : 1.4 + k * 0.35, y = Math.round(cerca ? Math.max(32, hor * 0.3) + k * hor * 0.14 : Math.max(28, hor * (0.45 + (k - 2) * 0.1))), x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    e_nube(R, Math.round(x), y, w, k, cn); }
  if (modo === 'dia' && o.sol !== null) e_discoSol(R, o.sol ?? [226, 22, 8], 'dia');   // de día, el disco del sol queda delante de las nubes
}

// el disco del sol, con su borde y su brillo
function e_discoSol(R, [sx, sy, sr], modo) { R.disco(sx, sy, sr + 1, modo === 'tarde' ? hex('#ffd890') : C.solL); R.disco(sx, sy, sr, C.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), hex('#fffcec')); }

// una cordillera lejana: la cresta (suma de senos con la semilla sem) entre y0 − amp e y0, rellena hasta yb con c; abajo
// se funde tramada con la bruma; o.filo: color del borde de la cresta; o.arboles: color de los árboles sueltos (robles,
// pinos) sobre la ladera. Devuelve la cresta (y de cada columna)
function e_colinas(R, y0, amp, yb, c, bruma, sem, o = {}) {
  const B = R.buf, cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(y0 - amp * (0.55 + 0.3 * Math.sin(x * 0.019 + sem) + 0.14 * Math.sin(x * 0.051 + sem * 2.3) + 0.06 * Math.sin(x * 0.13 + sem * 4.1))); cresta[x] = yc;
    for (let y = Math.max(0, yc); y <= yb; y++) { const p = (y - yb + 7) / 8; B[y * 320 + x] = p > 0 && e_um(x, y) < p ? bruma : c; }
    if (o.filo != null && yc >= 0 && (x * 7 + sem * 3) % 5) B[yc * 320 + x] = o.filo;
  }
  if (o.arboles != null) for (let k = 0; k < (o.n ?? 30); k++) { const x = Math.round(h(k, sem, 304) * 319), y = cresta[x] + 1 + Math.round(h(k, sem, 305) ** 1.6 * Math.max(1, yb - cresta[x] - 6)); if (y > yb - 2) continue;
    if (o.pinos) { R.rect(x, y - 3, x, y, o.arboles); R.rect(x - 1, y - 1, x + 1, y, o.arboles); } else { R.rect(x - 1, y - 1, x + 1, y, o.arboles); R.pset(x, y - 2, o.arboles); } }
  return cresta;
}

const e_P = pal({
  // el campo de Francia: colinas lejanas, el bocage de parcelas y setos, la loma del castillo, el prado y sus flores
  lej: '#9ab4c4', lejB: '#c8dce6', lejA: '#7a98aa', seto: '#3e6a36', setoL: '#5a8a46', bocA: '#8ab45e',
  c0: '#8ab45e', c1: '#a8c46e', c2: '#d8c470', c3: '#b8b456', c4: '#7aa452',
  loma: '#6a9e48', lomaL: '#86b858', lomaS: '#4e8236',
  pr0: '#b0d072', pr1: '#8cbe56', pr2: '#6ca440', pr3: '#548c32', pr4: '#3c7228', prD: '#2a5420', prL: '#cce684',
  amapola: '#e0402e', amapolaS: '#8a1e1a', margarita: '#f8f4ea', boton: '#f4cc3a', aciano: '#6a8ae0',
  senda: '#c0a274', sendaS: '#9a7c52', sendaL: '#dcc49a', sendaD: '#7a5e3c',
  // la piedra de las ruinas (junta, sombra, cuerpo, cuerpo claro, luz), la hiedra y los huecos
  pj: '#5e564c', ps: '#7e7466', pc: '#a49a88', pc2: '#b8ae9a', pl: '#d4cab4',
  hiedra: '#3a6a2e', hiedraL: '#62963e', hiedraS: '#244a1e', hueco: '#2c2622', huecoL: '#4a4038',
  // la tierra cortada: césped, tierra negra, arcilla, raíces; la lata
  cesped: '#3e6a2a', tn: '#5a3e28', tnS: '#432c1c', tnL: '#74523a', tnD: '#2e1e12', ar: '#9a6a40', arS: '#7a5030', arL: '#b4844e', raiz: '#d0b088', raizS: '#a0805c',
  lata: '#b4bcc4', lataS: '#727c88', lataL: '#eef2f6', oxido: '#a8582a', oxidoS: '#6e3418', etiq: '#c84a3a', etiqS: '#8a2e26',
  ave: '#2a2436', aveL: '#4a4458', lombriz: '#d88a8a', lombrizS: '#a85a62', hormiga: '#2a1a14', mariposa: '#f4e05a', mariposaS: '#e8903a',
  // el detector: el mango negro, el aluminio, la caja con su luz y el plato
  dk: '#1e1e26', dg: '#3a3c48', dm: '#8a92a0', dmL: '#c8d0dc', dmS: '#5a6270', dcaja: '#2e5a3a', dcajaL: '#4a8a5a', dplato: '#24242e', dplatoL: '#e8b830', onda: '#fff4a0', ondaS: '#f0c040',
});

// el búfer fijo de la clave (lo pinta la primera vez con dibuja()); lo que no se pinta queda transparente (0)
const e_CACHE = new WeakMap();

function e_fijo(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); m[clave] = b; b.datos = dibuja() ?? {}; R.usar(prev); }
  return m[clave];
}

// pega encima los píxeles pintados (no transparentes) del búfer b, de la fila y0 a la y1
function e_capa(R, b, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c) B[i] = c; } }

// copia el rectángulo (x0, y0)–(x1, y1) del búfer b al lienzo (para las piezas que van por delante de los personajes)
function e_trozo(R, b, x0, y0, x1, y1) { const B = R.buf; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const c = b[y * 320 + x]; if (c) B[y * 320 + x] = c; } }

// la luz del atardecer sobre un búfer ya pintado: multiplica cada canal (fr, fg, fb) desde la fila y0
function e_tono(b, fr, fg, fb, y0 = 0) {
  for (let i = y0 * 320; i < b.length; i++) { const c = b[i]; if (!c) continue;
    b[i] = (0xff000000 | (Math.min(255, ((c >>> 16) & 255) * fb) << 16) | (Math.min(255, ((c >>> 8) & 255) * fg) << 8) | Math.min(255, (c & 255) * fr)) >>> 0; }
}

// rellena con c lo que haya quedado transparente en el búfer actual, de la fila y0 a la y1
function e_tapar(R, y0, y1, c) { const B = R.buf; for (let i = y0 * 320; i < (y1 + 1) * 320; i++) if (!B[i]) B[i] = c; }

// la sillería de un muro: hiladas de a px y sillares de w px a matajunta; el color del píxel (x, y) con la paleta
// p = [junta, sombra, cuerpo, cuerpo claro, luz] y la luz f (0 cara en sombra … 1 al sol); cada sillar tiene su tono
function e_sillar(x, y, k, a, w, p, f) {
  const r = Math.floor(y / a), yi = y - r * a, s = x + Math.floor(h(r, 0, k) * w), bi = Math.floor(s / w), xi = s - bi * w;
  if (yi === a - 1 || xi === w - 1) return p[0];
  const luz = f + (h(bi, r, k + 1) - 0.5) * 0.5 + (e_um(x, y) - 0.5) * 0.2;
  if (h(x >> 1, y >> 1, k + 2) < 0.035) return p[0];   // desconchones
  if (yi === 0 && luz > 0.25) return p[4];
  if (xi === w - 2 || yi === a - 2) return luz > 0.8 ? p[2] : p[1];
  return luz < 0.3 ? p[1] : luz < 0.62 ? p[2] : luz < 0.92 ? p[3] : p[4];
}

// hiedra sobre un muro: manchas de hojas en tres verdes, más tupidas donde n es bajo (n: ruido de la mancha)
function e_hojaHiedra(x, y, k) { const q = h(x, y, k); return q < 0.3 ? e_P.hiedraS : q < 0.75 ? e_P.hiedra : e_P.hiedraL; }

// vapor que sube de una boca (x, y): bocanadas redondas que crecen, se deshacen tramadas y se las lleva el aire
function e_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 18, ancho = 1) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = (1.6 + u * 3.4) * ancho, cx = x + u * alto * 0.45 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (d < 0.7 && u < 0.6) R.pset(xx, yy, col); else if (e_um(xx, yy) < (1.1 - u) * (1.3 - d)) R.pset(xx, yy, col); } }
}

// un pájaro pequeño de perfil que aletea (cuervo, golondrina): 5–7 px
function e_pajaro(R, x, y, t, c = e_P.ave, k = 0) {
  x = Math.round(x); y = Math.round(y); const a = Math.floor(t * 8 + k * 3) % 3;
  R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x - 1, y, c);
  if (a === 0) { R.pset(x - 2, y - 1, c); R.pset(x - 3, y - 2, c); R.pset(x + 2, y - 1, c); R.pset(x + 3, y - 2, c); }
  else if (a === 1) { R.pset(x - 2, y, c); R.pset(x - 3, y, c); R.pset(x + 2, y, c); R.pset(x + 3, y, c); }
  else { R.pset(x - 2, y + 1, c); R.pset(x - 3, y + 1, c); R.pset(x + 2, y + 1, c); R.pset(x + 3, y + 1, c); }
}

// una mata de hierba alta que se mece (base x, y; alto en px; v: viento −1…1): 3–5 briznas en dos verdes
function e_mata(R, x, y, alto, v, cols, k = 0) {
  const n = 3 + Math.floor(h(k, 1, 451) * 3);
  for (let i = 0; i < n; i++) { const bx = x + i - (n >> 1), al = alto * (0.6 + h(k, i, 452) * 0.5), tx = bx + (i - (n >> 1)) * 0.6 + v * al * 0.35; R.linea(bx, y, Math.round(tx), Math.round(y - al), cols[(i + k) % cols.length]); }
}

// una mariposa que revolotea alrededor de (x, y)
function e_mariposa(R, x, y, t, k, c, cS) {
  const px = Math.round(x + Math.sin(t * 0.9 + k) * 14 + Math.sin(t * 2.3 + k * 2) * 4), py = Math.round(y + Math.sin(t * 1.7 + k * 3) * 6 - Math.abs(Math.sin(t * 5 + k)) * 2), a = Math.floor(t * 10 + k) % 2;
  R.pset(px, py, e_P.ave); if (a) { R.pset(px - 1, py - 1, c); R.pset(px + 1, py - 1, c); R.pset(px - 1, py, cS); R.pset(px + 1, py, cS); } else { R.pset(px - 1, py, c); R.pset(px + 1, py, c); }
}

// H · el campo junto al castillo en ruinas (o.camara 'general'): ver la cabecera de hoy()
function e_campo(R, t, o) {
  const hor = 96, b = e_fijo(R, 'campo', () => e_campoFijo(R)), { pset, rect, linea } = R;
  e_cielo(R, t, { hor, modo: 'dia', sol: [206, 26, 8], estela: [36, 0.05], fase: 9, cumulos: 5 });
  e_capa(R, b, 24);
  // un tractor diminuto que ara la parcela lejana, con su polvo; y las ovejas que pastan
  { const u = (t * 0.035) % 1, x = Math.round(176 + u * 46), y = 104; rect(x, y - 2, x + 3, y, C.rojo); rect(x + 1, y - 4, x + 2, y - 3, C.rojoS); pset(x, y + 1, C.k); pset(x + 3, y + 1, C.k);
    for (let i = 0; i < 4; i++) { const d = (t * 2 + i * 0.25) % 1; if (e_um(x, i) < 1 - d) pset(Math.round(x - 2 - d * 8), Math.round(y - 1 - d * 2), e_P.sendaL); } }
  for (let k = 0; k < 6; k++) { const x = 150 + k * 6 + Math.round(h(k, 1, 460) * 4), y = 108 + Math.round(h(k, 2, 460) * 3), m = Math.sin(t * 1.3 + k * 2) > 0.4 ? 1 : 0; rect(x, y, x + 2, y + 1, C.blanco); pset(x + 3, y + m, C.grisS); pset(x, y + 2, C.grisS); pset(x + 2, y + 2, C.grisS); }
  // los cuervos que dan vueltas a la torre
  for (let k = 0; k < 3; k++) { const a = t * (0.5 + k * 0.12) + k * 2.1; e_pajaro(R, 54 + Math.cos(a) * (18 + k * 6), 26 + Math.sin(a) * 5 + k * 2, t, e_P.ave, k); }
  // la hierba del prado que mece el viento: ráfagas que cruzan de izquierda a derecha
  const ga = (x) => Math.sin(t * 1.6 - x * 0.035) * 0.6 + Math.sin(t * 3.1 - x * 0.09) * 0.25;
  for (const [x, y, al, k] of b.datos.matas) e_mata(R, x, y, al, ga(x), y > 150 ? [e_P.pr3, e_P.pr2, e_P.pr4] : [e_P.pr2, e_P.pr1, e_P.pr3], k);
  // mariposas sobre las flores
  e_mariposa(R, 250, 128, t, 1, e_P.mariposa, e_P.mariposaS); e_mariposa(R, 120, 140, t, 4, C.blanco, C.grisL);
  // hierba alta del primer término, en las dos esquinas de abajo
  for (let k = 0; k < 26; k++) { const x = k < 13 ? 2 + k * 4 : 262 + (k - 13) * 4.4, al = 10 + h(k, 3, 461) * 10; e_mata(R, Math.round(x), 181, al, ga(x) * 1.4, [e_P.prD, e_P.pr4, e_P.pr3], k); }
  return { suelo: 150, pies: [40, 90, 150, 190, 240], hoyo: [214, 151], castillo: [52, 30], puerta: [99, 100], mochila: [244, 150] };
}

function e_campoFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, P = e_P;
  // las colinas lejanas con arboledas y el bocage: parcelas de colores con sus setos
  e_colinas(R, 90, 9, 104, P.lej, P.lejB, 1.7, { arboles: P.lejA, n: 28 });
  const cr = e_colinas(R, 100, 8, 116, P.bocA, P.bocA, 3.1, {});
  const campos = [P.c0, P.c1, P.c2, P.c3, P.c4];
  for (let y = 88; y <= 116; y++) for (let x = 0; x < 320; x++) { if (y < cr[x]) continue;
    const s = x - (y - 96) * 1.6, u = Math.floor(s / 34), v = Math.floor((y - 95) / 6), sm = ((s % 34) + 34) % 34;
    let c = campos[Math.floor(h(u, v, 401) * 5)]; if (c === P.c2 && (x + y * 2) % 4 === 0) c = P.c3;   // surcos del trigo
    if (sm < 1 || (y - 95) % 6 === 0) c = h(x >> 1, y, 402) < 0.7 ? P.seto : P.setoL; if (y === cr[x]) c = P.setoL;
    B[y * 320 + x] = c; }
  for (let k = 0; k < 60; k++) { const x = Math.round(h(k, 1, 403) * 319), y = Math.max(cr[x] + 1, 95 + 6 * Math.floor(h(k, 2, 403) * 3.5)); disco(x, y - 1, 1, P.seto); pset(x - 1, y - 2, P.setoL); }   // árboles de los setos
  // el pueblo lejano: casas con tejado rojo y la iglesia con su campanario
  for (let k = 0; k < 7; k++) { const x = 226 + k * 6 + Math.round(h(k, 1, 404) * 3), y = 103 - (k % 3); rect(x, y - 3, x + 4, y, hex('#e8dcc4')); rect(x + 3, y - 3, x + 4, y, hex('#c4b8a0')); poligono([[x - 1, y - 3], [x + 2, y - 6], [x + 5, y - 3]], hex('#b8503a')); pset(x + 1, y - 1, hex('#5a5048')); }
  rect(246, 88, 250, 103, hex('#d8ccb4')); rect(249, 88, 250, 103, hex('#b4a890')); poligono([[245, 88], [248, 78], [251, 88]], hex('#6a6a7a')); rect(247, 91, 248, 93, C.k); pset(248, 77, C.k);
  // la hilera de chopos junto al camino lejano
  for (let k = 0; k < 8; k++) { const x = 150 + k * 7, yb = 106 + (k & 1); poligono([[x, yb - 16], [x - 2, yb - 10], [x - 2, yb - 3], [x, yb], [x + 2, yb - 3], [x + 2, yb - 10]], hex('#3e6a38')); linea(x + 1, yb - 13, x + 2, yb - 4, hex('#5a8a48')); }
  // la loma del castillo, con su hierba
  poligono([[0, 106], [12, 96], [50, 92], [98, 94], [140, 101], [176, 114], [0, 114]], P.loma);
  for (let y = 90; y <= 114; y++) for (let x = 0; x < 180; x++) if (B[y * 320 + x] === P.loma) { const q = h(x, y, 405); if (q < 0.12) pset(x, y, P.lomaS); else if (q > 0.9 || (y < 100 && e_um(x, y) < 0.2)) pset(x, y, P.lomaL); }
  // ── el castillo en ruinas (el sol viene de la derecha)
  const pie = [P.pj, P.ps, P.pc, P.pc2, P.pl];
  // la muralla rota, con la puerta en arco por la que se ve el campo de detrás
  const topeM = (x) => Math.round(54 + (x - 66) * 0.42 + h(x >> 2, 1, 407) * 7 + (x > 112 && x < 120 ? 10 : 0));
  for (let x = 66; x <= 132; x++) for (let y = topeM(x); y <= 102; y++) {
    const dx = x - 99, puerta = Math.abs(dx) <= 6 && (y >= 86 || dx * dx + (y - 86) ** 2 <= 36);
    let c = puerta ? (y < 94 ? P.c1 : y < 98 ? P.c4 : P.loma) : e_sillar(x, y, 410, 5, 9, pie, 0.45 + (x - 66) / 140);
    if (!puerta && (Math.abs(dx) === 7 || Math.abs(dx) === 8) && y >= 82) c = Math.abs(dx) === 7 ? P.pj : P.pl;   // el dintel y las jambas
    if (y === topeM(x)) c = P.pl; else if (y === topeM(x) + 1 && !puerta) c = P.ps;
    if (!puerta && x < 92 && y > 70 && h(x >> 2, y >> 2, 408) * 0.7 + h(x >> 1, y >> 1, 409) * 0.3 < 0.32) c = e_hojaHiedra(x, y, 411);
    pset(x, y, c); }
  // la torre del homenaje: frente y costado al sol, almenas a la izquierda y la parte de la derecha derrumbada
  const topeT = (x) => x <= 47 ? (x % 6 < 3 ? 30 : 33) : Math.round(33 + (x - 47) * 1.1 + h(x >> 1, 2, 412) * 4 - (x > 58 ? 4 : 0));
  for (let x = 34; x <= 70; x++) for (let y = topeT(x); y <= 104; y++) {
    const lado = x > 62; let c = e_sillar(x, y, 413, 5, lado ? 6 : 9, pie, lado ? 0.95 : 0.25 + (x - 34) / 70);
    if (x === 62) c = P.pj;
    if (y === topeT(x)) c = P.pl;
    if (x < 50 && y > 72 && h(x >> 2, y >> 2, 414) * 0.7 + h(x >> 1, y >> 1, 415) * 0.3 < 0.4) c = e_hojaHiedra(x, y, 416);
    pset(x, y, c); }
  for (const [ax, ay] of [[42, 46], [54, 50]]) { rect(ax - 1, ay - 1, ax + 1, ay + 9, P.ps); rect(ax, ay, ax, ay + 8, P.hueco); pset(ax + 1, ay, P.pl); }   // saeteras
  { for (let y = 64; y <= 80; y++) for (let x = 41; x <= 55; x++) { const d = x - 48, e = y < 70 ? d * d + (y - 70) ** 2 <= 49 : Math.abs(d) <= 7; if (e) pset(x, y, Math.abs(d) >= 6 || y === 64 ? P.huecoL : (y > 76 || x < 44) ? P.hueco : hex('#3a322c')); }   // el ventanal roto, sin parteluz
    rect(41, 80, 55, 81, P.pl); rect(41, 82, 55, 82, P.ps); for (const [x, y] of [[50, 70], [46, 74], [52, 77]]) pset(x, y, P.huecoL); }
  { for (let y = 90; y <= 104; y++) for (let x = 43; x <= 53; x++) { const d = x - 48; if (y >= 95 || d * d + (y - 95) ** 2 <= 25) pset(x, y, Math.abs(d) === 5 ? P.pj : y > 101 ? P.loma : P.hueco); } }   // la puerta de la torre
  // el cubo redondo desmochado, en el extremo de la muralla
  for (let x = 128; x <= 150; x++) { const yt = Math.round(70 + h(x >> 1, 3, 417) * 6 + Math.abs(x - 139) * 0.2); for (let y = yt; y <= 106; y++) { const f = 0.15 + Math.sin(((x - 128) / 22) * Math.PI * 0.95) * 0.35 + (x - 128) / 34; pset(x, y, y === yt ? P.pl : e_sillar(x, y, 418, 4, 6, pie, f)); } }
  rect(137, 80, 138, 88, P.hueco); pset(139, 80, P.pl);
  // los escombros al pie: sillares caídos con su cara de luz
  for (let k = 0; k < 34; k++) { const x = Math.round(20 + h(k, 1, 419) * 146), y = Math.round(100 + h(k, 2, 419) * 9), r = 1 + Math.floor(h(k, 3, 419) * 2.6);
    rect(x - r, y - r + 1, x + r, y + 1, P.ps); rect(x - r, y - r, x + r - 1, y - r, P.pl); rect(x - r + 1, y - r + 1, x + r - 1, y, P.pc); pset(x + r, y + 1, P.pj); }
  // ── el prado: degradado tramado de lejos (amarillento) a cerca (verde hondo), con briznas, tréboles y flores
  const tonos = [P.pr0, P.pr1, P.pr2, P.pr3, P.pr4];
  for (let y = 108; y < 180; y++) { const v = (y - 108) / 72, fr = 108 + Math.round(4 * Math.sin(0) + 0);
    for (let x = 0; x < 320; x++) { if (y < 113 + Math.round(2 * Math.sin(x * 0.05)) && B[y * 320 + x]) continue;
      let l = v * 3.2 + (h(x >> 3, y >> 2, 420) - 0.5) * 0.9 + 0.3; const fl = Math.floor(l); l = fl + (l - fl > e_um(x, y) ? 1 : 0); let c = tonos[Math.max(0, Math.min(4, l))];
      const alto = 2 + Math.floor(v * 4); if (h(x, Math.floor(y / alto), 421) < 0.09 + v * 0.07) c = v > 0.5 ? P.prD : P.pr4; else if (h(x, y, 422) < 0.03 + v * 0.03) c = P.prL;
      B[y * 320 + x] = c; } }
  // la senda de tierra que sube del primer término a la puerta del castillo: rodadas, la franja de hierba y guijarros
  for (let y = 102; y < 180; y++) { const u = (y - 102) / 78, cx = 99 + (186 - 99) * u * u * 0.6 + (186 - 99) * u * 0.4 + Math.sin(u * 5) * 6, w = 2 + u * 30;
    for (let x = Math.floor(cx - w); x <= cx + w; x++) { const e = (x - cx) / w, bord = Math.abs(e) > 0.86; if (bord && h(x, y, 423) < 0.5) continue;
      let c = P.senda; if (Math.abs(Math.abs(e) - 0.5) < 0.12) c = P.sendaS; else if (Math.abs(e) < 0.16 && u > 0.1) c = h(x, y, 424) < 0.6 ? P.pr2 : P.pr3; else if (h(x, y, 425) < 0.06) c = P.sendaL; else if (bord) c = P.sendaS;
      pset(x, y, c); }
    if (h(y, 1, 426) < 0.3) { const gx = Math.round(cx + (h(y, 2, 426) - 0.5) * w * 1.4); pset(gx, y, P.sendaL); pset(gx + 1, y, P.sendaD); } }
  // flores: amapolas, margaritas, botones de oro y acianos, más grandes cerca
  const matas = [];
  for (let k = 0; k < 190; k++) { const y = Math.round(114 + h(k, 2, 427) ** 0.8 * 64), x = Math.round(h(k, 1, 427) * 319), c0 = B[y * 320 + x]; if (c0 === P.senda || c0 === P.sendaS || c0 === P.sendaL) continue; const v = (y - 114) / 66, q = h(k, 3, 427);
    const c = q < 0.4 ? P.amapola : q < 0.7 ? P.margarita : q < 0.88 ? P.boton : P.aciano;
    if (v > 0.45) { linea(x, y, x, y - 3, P.pr4); pset(x, y - 4, c); pset(x - 1, y - 4, c); pset(x + 1, y - 4, c); pset(x, y - 5, c); pset(x, y - 3, q < 0.4 ? P.amapolaS : P.boton); }
    else { pset(x, y, c); if (v > 0.2) pset(x + 1, y, c); } }
  for (let k = 0; k < 110; k++) { const y = Math.round(116 + h(k, 5, 428) * 54), x = Math.round(h(k, 4, 428) * 319), c0 = B[y * 320 + x]; if (c0 === P.senda || c0 === P.sendaS) continue; matas.push([x, y, 3 + (y - 116) * 0.14, k]); }
  // piedras viejas del prado: un mojón con musgo, un sillar caído y el tambor de una columna en el primer término
  const roca = (x0, y0, x1, y1, k) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const ex = (x - (x0 + x1) / 2) / ((x1 - x0) / 2 + 0.5), ey = (y - (y0 + y1) / 2) / ((y1 - y0) / 2 + 0.5); if (ex * ex + ey * ey > 1) continue; const l = -ex * 0.5 - ey * 0.8 + (h(x, y, k) - 0.5) * 0.4; pset(x, y, ex * ex + ey * ey > 0.8 ? P.pj : l > 0.5 ? P.pl : l > 0 ? P.pc2 : l > -0.5 ? P.pc : P.ps); if (ey < -0.3 && h(x >> 1, y, k + 1) < 0.35) pset(x, y, P.hiedraL); } };
  roca(272, 134, 290, 146, 430); roca(30, 140, 44, 150, 431);
  { const x0 = 248, y0 = 156; rect(x0, y0 - 9, x0 + 22, y0, P.pj); for (let y = y0 - 8; y < y0; y++) for (let x = x0 + 1; x < x0 + 22; x++) pset(x, y, e_sillar(x, y, 432, 9, 22, pie, y < y0 - 6 ? 0.95 : 0.35)); rect(x0 + 1, y0 - 9, x0 + 21, y0 - 9, P.pl); for (let x = x0; x <= x0 + 22; x += 3) pset(x, y0 + 1, P.prD); }
  { const cx = 6, cy = 170; for (let y = cy - 12; y <= cy + 9; y++) for (let x = 0; x <= cx + 20; x++) { const d = Math.hypot((x - cx) / 20, (y - cy) / 12); if (d > 1) continue; const cara = (x - cx - 13) ** 2 / 16 + (y - cy) ** 2 / 110 < 1; pset(x, y, cara ? (h(x, y, 433) < 0.2 ? P.ps : x > cx + 15 ? P.pc2 : P.pc) : y < cy - 9 ? P.pl : d > 0.92 ? P.pj : (y + Math.floor(x / 5)) % 6 === 0 ? P.ps : P.pc); if (!cara && y > cy + 4 && h(x >> 1, y >> 1, 434) < 0.4) pset(x, y, P.hiedra); } }
  // la mochila del buscador y su pala clavada, junto a donde cava
  { const x = 244, y = 150; rect(x, y - 9, x + 7, y, hex('#6a5a2a')); rect(x + 1, y - 10, x + 6, y - 9, hex('#8a7a3a')); rect(x + 1, y - 6, x + 6, y - 4, hex('#5a4a22')); rect(x + 2, y - 5, x + 5, y - 5, hex('#c8a040')); rect(x + 6, y - 8, x + 7, y, hex('#4a3e1a')); linea(x + 1, y - 10, x - 1, y - 4, C.k);
    linea(x + 13, y - 18, x + 11, y - 2, P.sendaD); linea(x + 14, y - 18, x + 12, y - 2, hex('#a8743c')); rect(x + 11, y - 20, x + 15, y - 19, C.k); rect(x + 9, y - 2, x + 14, y + 2, C.metalS); rect(x + 9, y - 2, x + 10, y + 1, C.metalL); rect(x + 7, y + 1, x + 17, y + 2, P.sendaS); }
  e_tapar(R, 96, 179, P.pr2);
  return { matas };
}

// H · el suelo de cerca, donde se cava (o.camara 'suelo'): el pie de la muralla y la tierra cortada con el hoyo
function e_suelo(R, t, o) {
  const hor = 98, b = e_fijo(R, 'suelo', () => e_sueloFijo(R)), { pset, rect, linea } = R, P = e_P;
  e_cielo(R, t, { hor, modo: 'dia', sol: [250, 60, 7], estela: null, cumulos: 4 });
  e_capa(R, b, 18);
  // la hiedra que se mueve con el viento y un cuervo que salta por lo alto del muro
  for (let k = 0; k < 40; k++) { const x = 108 + Math.round(h(k, 1, 470) * 48), y = 30 + Math.round(h(k, 2, 470) * 60); if (Math.sin(t * 3 + k * 1.7 + x * 0.1) > 0.7) pset(x + 1, y, P.hiedraL); }
  { const s = Math.floor(t * 0.7) % 4, x = 30 + [0, 6, 6, 14][s], sal = (t * 0.7) % 1 < 0.2 ? 2 : 0, y = 24 - sal; rect(x, y - 3, x + 4, y - 1, P.ave); pset(x + 5, y - 3, P.ave); pset(x + 6, y - 3, C.oroS); pset(x + 4, y - 4, P.ave); pset(x - 1, y - 2, P.ave); pset(x + 1, y, P.aveL); pset(x + 3, y, P.aveL); pset(x + 5, y - 4, C.blanco); }
  // la lombriz en su galería y las hormigas que cruzan por el borde del césped
  { const lx = 96, ly = 150; for (let i = 0; i < 9; i++) { const x = lx + i + Math.round(Math.sin(t * 2) * 1.5), y = ly + Math.round(Math.sin(t * 4 + i * 0.8) * 1); pset(x, y, i === 8 ? P.lombrizS : P.lombriz); if (i % 3 === 0) pset(x, y + 1, P.lombrizS); } }
  for (let k = 0; k < 9; k++) { const x = Math.round(((k * 13 + t * 9) % 150)) + 4, y = 133 - (k % 2); pset(x, y, P.hormiga); pset(x + 1, y, P.hormiga); if (Math.floor(t * 8 + k) % 2) pset(x + 2, y + 1, P.hormiga); }
  // la lata: enterrada al fondo del hoyo (o.lata 0) o subiendo hasta el borde (1)
  { const u = Math.max(0, Math.min(1, o.lata ?? 0)), x = 179, y = Math.round(158 - u * 30); e_lata(R, x, y, t, { tierra: u < 0.8 }); if (u < 0.15) { for (let i = -6; i <= 6; i++) pset(x + i, y - 3 + (i & 1), i & 2 ? P.tnL : P.tn); } }
  // la hierba del borde, que se mece, y las migas de tierra que caen al hoyo
  for (const [x, y, al, k] of b.datos.matas) e_mata(R, x, y, al, Math.sin(t * 1.7 - x * 0.04) * 0.6, [P.pr3, P.pr2, P.pr4], k);
  for (let k = 0; k < 3; k++) { const u = (t * 0.8 + k * 0.37) % 1.6; if (u < 1) pset(164 + k * 12 + (k & 1), Math.round(135 + u * 20), P.tnL); }
  e_mariposa(R, 250, 108, t, 2, e_P.mariposa, e_P.mariposaS);
  return { suelo: 132, hoyo: [179, 134], fondo: [179, 160], monton: [218, 122], pala: [226, 104], pies: [60, 120, 210, 250] };
}

function e_sueloFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, P = e_P, pie = [P.pj, P.ps, P.pc, P.pc2, P.pl];
  // lejos, a la derecha del muro: el campo, las colinas y un roble solitario
  e_colinas(R, 94, 8, 104, P.lej, P.lejB, 2.4, { arboles: P.lejA, n: 14 });
  for (let y = 100; y <= 112; y++) for (let x = 180; x < 320; x++) if (!B[y * 320 + x] || y > 103) B[y * 320 + x] = (y - 100) / 12 > e_um(x, y) ? P.pr1 : P.pr0;
  { const x = 276, yb = 104; rect(x - 1, yb - 14, x + 1, yb, C.cortezaS); for (const [dx, dy, r, c] of [[0, -20, 9, P.seto], [-6, -16, 6, P.seto], [6, -15, 6, P.seto], [-2, -22, 6, P.setoL], [4, -19, 4, P.setoL]]) disco(x + dx, yb + dy, r, c); for (let k = 0; k < 20; k++) pset(x - 8 + Math.round(h(k, 1, 471) * 16), yb - 26 + Math.round(h(k, 2, 471) * 16), P.hiedraS); }
  // el muro grande del castillo, de cerca: sillares grandes, una saetera, mechinales, la hiedra que cuelga y el musgo del pie
  const tope = (x) => Math.round(x < 120 ? 24 + h(x >> 3, 1, 472) * 4 : x < 172 ? 24 + (x - 120) * 0.55 + h(x >> 2, 2, 472) * 6 : 52 + (x - 172) * 3 + h(x >> 1, 3, 472) * 7);   // a la derecha el muro se acaba roto, en escalones
  for (let x = 0; x <= 196; x++) { const yt = tope(x); for (let y = yt; y <= 116; y++) {
    let c = e_sillar(x, y, 473, 9, 17, pie, 0.3 + x / 260 + (y > 100 ? -0.15 : 0));
    if (y === yt) c = P.pl; else if (y === yt + 1) c = P.ps;
    const hi = h(x >> 2, y >> 2, 474) * 0.6 + h(x >> 1, y >> 1, 475) * 0.4, cortina = x > 104 && x < 160 && y < yt + 62 - Math.abs(x - 132) * 0.9;
    if ((cortina && hi < 0.62) || (y > 100 && hi < 0.38)) c = e_hojaHiedra(x, y, 476);
    pset(x, y, c); } }
  for (let y = 36; y <= 66; y++) { const w = y < 40 || y > 62 ? 0 : 1; rect(58 - w - 2, y, 58 + w + 2, y, P.ps); rect(58 - w, y, 58 + w, y, P.hueco); } rect(55, 35, 61, 35, P.pl); rect(55, 67, 61, 67, P.pl);
  for (const [x, y] of [[20, 52], [92, 50], [20, 86], [92, 84], [176, 70]]) { rect(x, y, x + 3, y + 3, P.hueco); rect(x, y, x + 3, y, P.pj); }
  // el césped de detrás, donde se plantan los personajes (y = 132)
  for (let y = 112; y <= 133; y++) for (let x = 0; x < 320; x++) { const v = (y - 112) / 21; let l = 0.6 + v * 2.4 + (h(x >> 2, y >> 1, 477) - 0.5) * 0.8; const fl = Math.floor(l); l = fl + (l - fl > e_um(x, y) ? 1 : 0);
    let c = [P.pr0, P.pr1, P.pr2, P.pr3, P.pr4][Math.max(0, Math.min(4, l))]; if (h(x, y >> 1, 478) < 0.12) c = P.pr4; else if (h(x, y, 479) < 0.04) c = P.prL; B[y * 320 + x] = c; }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 480) * 319), y = 114 + Math.round(h(k, 2, 480) * 16), q = h(k, 3, 480); const c = q < 0.4 ? P.amapola : q < 0.75 ? P.margarita : P.boton; pset(x, y, c); pset(x + 1, y, c); pset(x, y - 1, c); if (y > 124) { pset(x - 1, y, c); pset(x, y + 1, P.pr4); } }
  // ── la tierra cortada (como en un dibujo de excavación): tepe con raíces, tierra negra, arcilla con piedras
  for (let y = 134; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ond = Math.round(Math.sin(x * 0.06) * 2 + Math.sin(x * 0.17) * 1);
    let c;
    if (y < 139) c = h(x, y, 481) < 0.3 ? P.cesped : y < 136 ? P.pr4 : P.tnS;
    else if (y < 158 + ond) { const q = h(x >> 1, y >> 1, 482); c = q < 0.15 ? P.tnS : q > 0.88 ? P.tnL : P.tn; if (y > 155 + ond && e_um(x, y) < 0.5) c = P.arS; }
    else { const q = h(x >> 1, y >> 1, 483); c = q < 0.18 ? P.arS : q > 0.86 ? P.arL : P.ar; if ((y + (x >> 3)) % 7 === 0 && h(x >> 2, y, 484) < 0.6) c = P.arS; }
    B[y * 320 + x] = c; }
  rect(0, 133, 319, 133, P.pr3); for (let x = 0; x < 320; x += 2) pset(x + (x >> 1 & 1), 134, P.prD);
  // las piedras de la tierra, con su luz arriba
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 485) * 319), y = Math.round(142 + h(k, 2, 485) * 36), r = 1 + Math.floor(h(k, 3, 485) * (y > 158 ? 4 : 2.5)); if (x > 154 && x < 204 && y < 166) continue;
    disco(x, y, r, P.ps); disco(x - 1, y - 1, Math.max(0, r - 1), P.pc); pset(x - Math.max(1, r - 1), y - r + 1, P.pl); pset(x + r, y + 1, P.tnD); }
  // el cimiento enterrado del castillo: tres sillares viejos
  for (let y = 160; y <= 179; y++) for (let x = 14; x <= 84; x++) pset(x, y, y === 160 ? P.ps : e_sillar(x, y, 486, 10, 24, [P.tnD, P.ps, P.pc, P.pc, P.pc2], 0.4));
  // las raíces que bajan del césped, con sus raicillas
  for (let k = 0; k < 16; k++) { let x = Math.round(h(k, 1, 487) * 319), y = 136; if (x > 150 && x < 206) continue; const L = 6 + Math.round(h(k, 2, 487) * 16);
    for (let i = 0; i < L; i++) { pset(x, y, i < 3 ? P.raiz : P.raizS); if (i % 4 === 2) pset(x + (i & 4 ? 1 : -1), y + 1, P.raizS); y++; if (h(k, i, 488) < 0.35) x += h(k, i, 489) < 0.5 ? -1 : 1; } }
  // cosas enterradas que no son tesoros: una herradura, una chapa, un clavo y un trozo de teja
  { const x = 246, y = 164; for (let a = 0; a <= 9; a++) { const an = Math.PI * (0.1 + a * 0.09); pset(Math.round(x + Math.cos(an) * 5), Math.round(y - Math.sin(an) * 5), a % 3 ? P.oxido : P.oxidoS); pset(Math.round(x + Math.cos(an) * 4), Math.round(y - Math.sin(an) * 4), P.oxidoS); } }
  disco(280, 146, 2, C.rojo); pset(279, 145, C.blanco); pset(281, 147, C.rojoS); linea(120, 168, 126, 165, P.oxidoS); pset(120, 168, P.oxido); poligono([[300, 166], [310, 162], [312, 168], [302, 170]], C.ladrillo); linea(300, 166, 310, 162, C.ladrilloL);
  // la galería de la lombriz
  for (let x = 90; x < 112; x++) pset(x, 150 + Math.round(Math.sin(x * 0.4)), P.tnD);
  // el hoyo: un cuenco abierto en la tierra, con la pared de atrás en sombra y el borde desmoronado
  for (let x = 156; x <= 202; x++) { const u = (x - 156) / 46, yb = Math.round(134 + 28 * Math.pow(Math.sin(Math.PI * u), 0.55)); for (let y = 132; y <= yb; y++) {
    const pared = y > yb - 2 || x < 159 || x > 199; pset(x, y, pared ? P.tnL : (h(x, y, 490) < 0.12 ? P.tnL : (x + y) % 9 === 0 ? P.tn : y < 140 ? P.tnD : P.tnS)); } }
  // el montón de tierra sacada, con terrones, y la pala clavada
  for (let x = 202; x <= 240; x++) { const yt = Math.round(132 - 10 * Math.pow(Math.sin(Math.PI * (x - 202) / 38), 0.8)); for (let y = yt; y <= 133; y++) { const q = h(x, y, 491); pset(x, y, y === yt ? P.tnL : q < 0.2 ? P.tnS : q > 0.85 ? P.tnL : x > 226 ? P.tnS : P.tn); } }
  for (let k = 0; k < 8; k++) { const x = 206 + Math.round(h(k, 1, 492) * 30), y = 128 + Math.round(h(k, 2, 492) * 4); rect(x, y, x + 1, y + 1, P.tn); pset(x, y, P.tnL); }
  linea(226, 104, 222, 124, P.sendaD); linea(227, 104, 223, 124, hex('#a8743c')); rect(224, 102, 229, 103, C.k); rect(225, 101, 228, 101, hex('#a8743c'));
  poligono([[219, 123], [227, 123], [226, 130], [220, 130]], C.metalS); linea(219, 123, 220, 129, C.metalL);
  // las matas del borde del césped (se mecen en cada fotograma)
  const matas = [];
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 493) * 319), y = 116 + Math.round(h(k, 2, 493) * 17); if (x > 152 && x < 242 && y > 124) continue; matas.push([x, y, 3 + (y - 112) * 0.2, k]); }
  e_tapar(R, 98, 179, P.pr2);
  return { matas };
}

// La lata del gag del detector: una lata de conservas vieja y abollada, con la etiqueta descolorida (sin letras) y el
// óxido; (x, y) es el centro de su base. o.tierra: con tierra pegada; o.tumbada: de lado. Para pintarla en la mano de
// un personaje (R.actor(..., { sostiene }) devuelve la mano), pásale la mano y súmale 5 a la y.
export function e_lata(R, x, y, t, o = {}) {
  const { rect, pset } = R, P = e_P;
  if (o.tumbada) { rect(x - 5, y - 6, x + 5, y, C.k); rect(x - 4, y - 5, x + 4, y - 1, P.lata); rect(x - 2, y - 5, x + 2, y - 1, P.etiq); rect(x - 2, y - 2, x + 2, y - 1, P.etiqS); rect(x + 4, y - 5, x + 4, y - 1, P.lataS); pset(x - 4, y - 4, P.lataL); pset(x, y - 3, P.oxido); return { x, y }; }
  rect(x - 4, y - 10, x + 4, y, C.k);
  rect(x - 3, y - 9, x + 3, y - 1, P.lata); rect(x - 3, y - 7, x + 3, y - 3, P.etiq); rect(x + 1, y - 7, x + 3, y - 3, P.etiqS); rect(x - 3, y - 6, x - 2, y - 5, hex('#e87a5a'));
  rect(x - 1, y - 6, x, y - 5, hex('#e8c040'));   // el dibujo de la etiqueta: un tomate amarillento, sin letras
  rect(x + 2, y - 9, x + 3, y - 1, P.lataS); pset(x - 3, y - 9, P.lataL); pset(x - 2, y - 9, P.lataL); for (const yy of [y - 8, y - 2]) rect(x - 3, yy, x + 3, yy, P.lataS);
  pset(x + 1, y - 2, P.oxido); pset(x - 2, y - 2, P.oxido); pset(x + 2, y - 8, P.oxidoS); pset(x - 1, y - 4, P.etiqS);   // abolladura y óxido
  pset(x + 3, y - 11, P.lataS); pset(x + 4, y - 12, P.lataL); pset(x + 2, y - 10, P.lataS);   // la tapa medio abierta
  if (o.tierra) { pset(x - 3, y - 1, P.tn); pset(x - 2, y - 1, P.tnS); pset(x + 2, y - 1, P.tn); pset(x - 3, y - 2, P.tnL); }
  return { x, y };
}

const e_Q = pal({
  // el cuarto del buscador: papel pintado verde oliva, zócalo de nogal, suelo de tablas, alfombra
  pp: '#55654a', ppS: '#46543c', ppL: '#6a7a5a', ppM: '#7a8a62', zo: '#5a3a24', zoS: '#3e2818', zoL: '#7a5034', zoD: '#2a1a10',
  sue: '#7a5232', sueS: '#5e3e24', sueL: '#94683e', sueD: '#3e2818', alf: '#8a2e2e', alfS: '#5e1e22', alfB: '#2a3a6a', alfO: '#c8a040',
  corcho: '#b8834a', corchoS: '#946236', corchoL: '#d4a060', marco: '#4a2e1c', papel: '#ece0c0', papelS: '#c8b48a', hilo: '#d02a2a',
  noche0: '#141a3e', noche1: '#24305e', noche2: '#3a4a7a', rama: '#0e1224', cort: '#8a2e3a', cortS: '#5e1e28', cortL: '#b04a52',
  pantalla: '#2e6a3e', pantallaL: '#4e9a5a', laton: '#c8963a', latonL: '#f0d070', latonS: '#8a6020', luzL: '#ffe8a0',
  gato: '#e8903a', gatoS: '#b0602a', gatoL: '#f8c070', taza: '#e8e4dc', tazaS: '#a8a4a0', cafe: '#4a2a18',
  // el mapa de cerca: la mesa, el pergamino, el mar, la tierra, los montes y la tinta
  m0: '#8a5a32', m1: '#7a4c2a', m2: '#9a6a3c', m3: '#6a4022', mD: '#4a2c16', mL: '#b07c48',
  pg: '#ead8a8', pgS: '#d0b884', pgL: '#f6ead0', pgD: '#a88a5a', mar: '#9ec4c4', marS: '#7aa8b0', tinta: '#4a3424', tintaR: '#b02a26', rio: '#4a88b0', monte: '#8a7a5a', bosque: '#5a7a44',
});

// H · el cuarto del buscador, de noche (o.encuadre 'mesa', o.camara 'general')
function e_estudio(R, t, o) {
  const b = e_fijo(R, 'estudio', () => e_estudioFijo(R)), { pset, rect, linea, disco } = R, Q = e_Q;
  R.copiar(b);
  // la ventana: estrellas que titilan, nubes que pasan ante la luna, las ramas que se mecen y un murciélago (recortado)
  R.recorte([215, 33, 259, 95]);
  for (let k = 0; k < 14; k++) { const x = 216 + Math.round(h(k, 1, 501) * 42), y = 34 + Math.round(h(k, 2, 501) * 40); if (Math.sin(t * (1.5 + k * 0.3) + k) > -0.2) pset(x, y, k % 3 ? Q.noche2 : C.blanco); }
  disco(246, 46, 6, hex('#f4ecd0')); disco(244, 45, 1, hex('#c8c0a8')); disco(248, 49, 1, hex('#c8c0a8'));
  { const x = ((t * 3) % 70) + 200; for (const [dx, dy, r] of [[0, 0, 3], [4, -1, 4], [8, 0, 3]]) disco(Math.round(x + dx), 50 + dy, r, Q.noche2); }
  { const m = Math.sin(t * 1.1) * 2; for (let i = 0; i < 30; i++) { const x = 259 - i, y = Math.round(62 + i * 0.5 + Math.sin(i * 0.3) * 2 + m * i / 30); pset(x, y, Q.rama); pset(x, y + 1, Q.rama); if (i % 5 === 0) { linea(x, y, x - 3, Math.round(y - 4 + m), Q.rama); disco(x - 3, Math.round(y - 5 + m), 2, Q.rama); } } }
  { const u = (t * 0.25) % 1, x = Math.round(214 + u * 50), y = Math.round(70 - Math.sin(u * 9) * 6); e_pajaro(R, x, y, t * 1.6, Q.rama, 3); }
  R.recorte(null);
  // el péndulo del reloj
  { const a = Math.sin(t * 3.1) * 0.35, px = Math.round(71 + Math.sin(a) * 10), py = Math.round(108 + Math.cos(a) * 10); linea(71, 108, px, py, Q.latonS); disco(px, py, 2, Q.laton); pset(px - 1, py - 1, Q.latonL); }
  // la cola del gato que duerme sobre la estantería, y su respiración
  { const c = Math.sin(t * 1.4); for (let i = 0; i < 6; i++) pset(56 + i, Math.round(30 + i * 0.3 + c * (i / 6) * 2), i > 3 ? Q.gatoL : Q.gato); if (Math.sin(t * 2) > 0) rect(36, 25, 50, 25, Q.gato); }
  // el vapor de la taza y una polilla que ronda la lámpara
  e_vapor(R, 171, 129, t, 1, hex('#d8d4cc'), 12); e_vapor(R, 171, 129, t + 1.6, 2, hex('#d8d4cc'), 10);
  { const a = t * 2.4, x = Math.round(206 + Math.cos(a) * 9 + Math.sin(a * 2.3) * 3), y = Math.round(106 + Math.sin(a * 1.3) * 5); pset(x, y, hex('#e8dcc0')); pset(x + (Math.floor(t * 14) % 2 ? 1 : -1), y, hex('#c8bca0')); }
  // la bombilla parpadea un poco
  if (Math.sin(t * 13) + Math.sin(t * 7.3) > 1.6) rect(201, 121, 211, 121, Q.luzL);
  if (o.detector !== false) detector(R, 230, 124, t, { dir: -1, suelo: 160, largo: 8, pita: o.pita ?? 0 });
  return { suelo: 160, pies: [70, 232, 256], mesa: [96, 136, 218, 159], lampara: [206, 116], ventana: [212, 30, 262, 98], tablero: [82, 26, 196, 92], taza: [171, 132], detector: [230, 124] };
}

function e_estudioFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, Q = e_Q;
  const luz = (x, y) => Math.max(0, 1 - Math.hypot((x - 206) / 120, (y - 122) / 90));   // la luz de la lámpara
  // el papel pintado: rayas, un motivo de flor de lis pequeño, la luz cálida de la lámpara y las esquinas en sombra
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const l = luz(x, y) - (x < 20 || y < 8 ? 0.15 : 0);
    let c = x % 12 < 2 ? Q.ppS : Q.pp; const mx = x % 12, my = y % 12; if ((mx === 7 && my >= 4 && my <= 7) || (my === 5 && mx >= 6 && mx <= 8)) c = Q.ppM;
    if (l > 0.55 && e_um(x, y) < (l - 0.55) * 2.5) c = c === Q.ppS ? Q.pp : Q.ppL; else if (l < 0.15 && e_um(x, y) < 0.15 - l + 0.2) c = Q.ppS;
    B[y * 320 + x] = c; }
  rect(0, 0, 319, 3, Q.zo); rect(0, 4, 319, 4, Q.zoL); rect(0, 5, 319, 5, Q.zoD);
  // el zócalo de nogal con sus cuarterones
  rect(0, 112, 319, 147, Q.zo); rect(0, 112, 319, 113, Q.zoL); rect(0, 114, 319, 114, Q.zoD);
  for (let x0 = 2; x0 < 320; x0 += 32) { rect(x0 + 2, 118, x0 + 28, 142, Q.zoS); rect(x0 + 3, 119, x0 + 27, 141, Q.zo); rect(x0 + 2, 118, x0 + 28, 118, Q.zoD); rect(x0 + 2, 142, x0 + 28, 142, Q.zoL); rect(x0 + 28, 118, x0 + 28, 142, Q.zoL);
    for (let k = 0; k < 4; k++) { const y = 121 + Math.round(h(x0, k, 502) * 18); linea(x0 + 4, y, x0 + 26, y + (k & 1), Q.zoS); } }
  rect(0, 144, 319, 147, Q.zoD); rect(0, 144, 319, 144, Q.zoL);
  // el suelo de tablas en perspectiva, con juntas que fugan al centro, cabezas de tabla y la alfombra
  for (let y = 148; y < 180; y++) { const z = (y - 120) / 60;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z, i = Math.floor(u / 22), f = u / 22 - i, fila = Math.floor(((1 / z) * 60 + h(i, 0, 503) * 9) / 6);
      let c = h(i, fila, 504) < 0.3 ? Q.sueS : h(i, fila, 504) > 0.8 ? Q.sueL : Q.sue; if (f < 0.04 * z + 0.02) c = Q.sueD; else if (h(x, y, 505) < 0.06) c = Q.sueS;
      if (y === 148) c = Q.sueD; B[y * 320 + x] = c; } }
  for (let y = 162; y < 180; y++) for (let x = 40; x < 280; x++) { const e = ((x - 160) / 118) ** 2 + ((y - 172) / 10) ** 2; if (e > 1) continue; pset(x, y, e > 0.82 ? Q.alfO : e > 0.6 ? Q.alfB : (x + y * 2) % 8 < 2 ? Q.alfS : Q.alf); }
  // la estantería: marco, baldas, libros de colores con lomo (bandas, sin letras), un globo, un catalejo y un ánfora
  rect(6, 32, 60, 147, Q.zoD); rect(8, 34, 58, 145, Q.zoS);
  for (const yb of [58, 84, 110, 136]) { rect(8, yb, 58, yb + 2, Q.zoL); rect(8, yb + 3, 58, yb + 3, Q.zoD); }
  const lomos = [hex('#8a2e2e'), hex('#2e4a7a'), hex('#3a6a3a'), hex('#a87a2a'), hex('#5a2e5a'), hex('#c8b490'), hex('#6a3a1e'), hex('#2a5a5a')];
  for (const [yb, k0] of [[58, 0], [84, 1], [110, 2], [136, 3]]) { let x = 10;
    while (x < 56) { const w = 2 + Math.floor(h(x, k0, 506) * 3), al = 14 + Math.floor(h(x, k0, 507) * 9), c = lomos[Math.floor(h(x, k0, 508) * 8)];
      if (k0 === 1 && x > 34 && x < 50) { disco(42, yb - 9, 7, hex('#3a7aa8')); for (const [a, b2] of [[39, -12], [44, -8], [40, -6]]) disco(a, yb + b2, 2, hex('#6aa84a')); pset(40, yb - 13, C.blanco); rect(41, yb - 1, 43, yb - 1, Q.laton); x = 50; continue; }
      if (k0 === 3 && x > 40) { rect(42, yb - 6, 56, yb - 2, Q.latonS); rect(42, yb - 6, 56, yb - 6, Q.latonL); rect(52, yb - 7, 56, yb - 1, Q.laton); break; }
      if (h(x, k0, 509) < 0.12) { linea(x, yb - 1, x + 5, yb - al + 2, C.k); linea(x + 1, yb - 1, x + 6, yb - al + 2, c); x += 7; continue; }
      rect(x, yb - al, x + w, yb - 1, C.k); rect(x, yb - al + 1, x + w - 1, yb - 1, c); pset(x, yb - al + 1, C.blanco); rect(x, yb - al + 3, x + w - 1, yb - al + 3, Q.laton); rect(x, yb - 4, x + w - 1, yb - 4, Q.laton);
      x += w + 1; } }
  // el ánfora y el gato dormido sobre la estantería
  { const x = 16; poligono([[x, 32], [x - 4, 24], [x - 2, 16], [x + 2, 16], [x + 4, 24]], hex('#b0603a')); linea(x - 2, 24, x - 1, 18, hex('#d8885a')); rect(x - 2, 14, x + 2, 15, hex('#8a4a2a')); rect(x - 3, 22, x + 3, 22, hex('#5a2e1a')); }
  { for (let j = -5; j <= 2; j++) for (let i = -12; i <= 12; i++) if ((i / 12.5) ** 2 + (j / 5.5) ** 2 < 1) pset(44 + i, 31 + j, j < -2 ? Q.gatoL : j > 0 ? Q.gatoS : (i + 40) % 5 === 0 ? Q.gatoS : Q.gato);
    disco(33, 28, 4, Q.gato); pset(31, 23, Q.gato); pset(35, 23, Q.gato); pset(30, 24, Q.gatoS); rect(31, 28, 32, 28, C.k); rect(34, 28, 35, 28, C.k); pset(33, 30, hex('#e87a8a')); }
  // el reloj de péndulo de pared
  rect(64, 92, 78, 128, Q.zoD); rect(65, 93, 77, 127, Q.zo); disco(71, 100, 5, Q.taza); disco(71, 100, 5, Q.zoD); disco(71, 100, 4, Q.taza); linea(71, 100, 71, 97, C.k); linea(71, 100, 73, 101, C.k); rect(66, 107, 76, 125, hex('#2a1a10')); rect(66, 107, 66, 125, Q.zoL);
  // el tablero de corcho: el mapa, las fotos, el recorte de periódico (barras), notas y los hilos rojos
  rect(82, 26, 196, 92, Q.marco); for (let y = 28; y <= 90; y++) for (let x = 84; x <= 194; x++) { const q = h(x, y, 510); pset(x, y, q < 0.25 ? Q.corchoS : q > 0.85 ? Q.corchoL : Q.corcho); }
  rect(83, 27, 195, 27, Q.zoL);
  { rect(98, 32, 148, 70, Q.papelS); rect(97, 31, 147, 69, Q.papel); for (let y = 33; y < 68; y++) for (let x = 99; x < 146; x++) if (Math.sin(x * 0.12 + y * 0.05) * 6 + Math.sin(y * 0.2) * 4 > 3) pset(x, y, hex('#a8c8c0')); for (let i = 0; i < 6; i++) pset(110 + i * 5, 52 - (i & 1) * 3, Q.tinta); linea(102, 64, 140, 40, Q.tintaR, 2); }
  const foto = (x, y, tipo) => { rect(x + 1, y + 1, x + 15, y + 17, Q.ppS); rect(x, y, x + 14, y + 16, C.blanco); rect(x + 2, y + 2, x + 12, y + 11, tipo === 2 ? hex('#3a2a20') : hex('#8ac0e0'));
    if (tipo === 0) { rect(x + 4, y + 5, x + 7, y + 11, Q.monte); rect(x + 8, y + 7, x + 11, y + 11, Q.monte); pset(x + 4, y + 4, Q.monte); pset(x + 6, y + 4, Q.monte); rect(x + 2, y + 11, x + 12, y + 11, Q.bosque); }
    else if (tipo === 1) { poligono([[x + 2, y + 11], [x + 6, y + 4], [x + 9, y + 8], [x + 10, y + 6], [x + 12, y + 11]], hex('#8a8a94')); pset(x + 6, y + 4, C.blanco); }
    else { rect(x + 6, y + 4, x + 8, y + 6, Q.laton); rect(x + 7, y + 7, x + 7, y + 9, Q.laton); rect(x + 5, y + 10, x + 9, y + 10, Q.laton); }
    rect(x + 3, y + 13, x + 10, y + 13, Q.ppS); };
  foto(154, 32, 0); foto(174, 52, 1); foto(88, 70, 2);
  { const x = 152, y = 70; rect(x, y, x + 20, y + 18, Q.papel); rect(x + 2, y + 2, x + 18, y + 4, C.k); for (let j = 7; j < 17; j += 2) { rect(x + 2, y + j, x + 9, y + j, Q.papelS); rect(x + 11, y + j, x + 18, y + j, Q.papelS); } }
  for (const [x, y, c] of [[122, 74, hex('#f0e070')], [178, 34, hex('#a8d8f0')]]) { rect(x, y, x + 12, y + 11, c); for (let j = 3; j < 10; j += 2) linea(x + 2, y + j, x + 10 - (j & 2), y + j, Q.tinta); }
  const pins = [[110, 50], [161, 34], [181, 54], [95, 72], [162, 72], [128, 76], [184, 36]];
  for (const [a, b2] of [[0, 1], [1, 2], [0, 3], [2, 4], [0, 5]]) linea(pins[a][0], pins[a][1], pins[b2][0], pins[b2][1], Q.hilo);
  for (const [x, y] of pins) { disco(x, y, 1, C.rojo); pset(x - 1, y - 1, C.blanco); }
  // la ventana con su marco, el alféizar con un cactus y las cortinas
  rect(212, 30, 262, 98, Q.zoD); for (let y = 33; y <= 95; y++) for (let x = 215; x <= 259; x++) { const v = (y - 33) / 62; pset(x, y, v * 2.2 + 0.2 > e_um(x, y) + Math.floor(v * 2.2) ? [Q.noche0, Q.noche1, Q.noche2][Math.min(2, Math.floor(v * 2.2) + 1)] : [Q.noche0, Q.noche1, Q.noche2][Math.min(2, Math.floor(v * 2.2))]); }
  rect(236, 33, 237, 95, Q.zoD); rect(215, 63, 259, 64, Q.zoD); rect(208, 96, 266, 99, Q.zoL); rect(208, 100, 266, 100, Q.zoD);
  rect(218, 90, 224, 95, hex('#b0603a')); rect(219, 82, 223, 89, hex('#4a8a4a')); pset(220, 84, C.blanco); pset(222, 87, C.blanco); rect(250, 89, 255, 95, hex('#c8d8e0'));
  for (const [x0, x1] of [[202, 214], [260, 272]]) for (let y = 26; y < 104; y++) for (let x = x0; x <= x1; x++) { const f = (x - x0) % 4; pset(x, y, f === 0 ? Q.cortS : f === 2 ? Q.cortL : Q.cort); }
  rect(200, 24, 274, 26, Q.laton); rect(200, 24, 274, 24, Q.latonL);
  // la mesa: tablero con su canto, cajones con tiradores de latón y patas torneadas; su sombra en el suelo
  for (let y = 158; y < 162; y++) for (let x = 92; x < 224; x++) if (e_um(x, y) < 0.5) pset(x, y, Q.sueD);
  rect(96, 136, 218, 140, Q.zoL); rect(94, 141, 220, 143, Q.zo); rect(94, 143, 220, 143, Q.zoD);
  for (let x = 98; x < 216; x += 3) if (h(x, 1, 511) < 0.5) rect(x, 137, x + 2, 137, Q.zo);
  rect(98, 144, 216, 150, Q.zoS); for (const x of [100, 140, 180]) { rect(x, 145, x + 32, 149, Q.zo); rect(x, 145, x + 32, 145, Q.zoL); rect(x + 15, 147, x + 17, 147, Q.laton); }
  for (const x of [98, 212]) { rect(x, 151, x + 4, 159, Q.zoD); rect(x + 1, 151, x + 2, 159, Q.zo); rect(x - 1, 154, x + 5, 155, Q.zoS); }
  // lo de encima: los libros apilados, el mapa extendido que cuelga por el canto, la lupa, la brújula y la taza
  for (const [y, w, c] of [[134, 14, hex('#2e4a7a')], [130, 12, hex('#8a2e2e')], [126, 13, hex('#3a6a3a')]]) { rect(100, y - 3, 100 + w, y, C.k); rect(101, y - 2, 99 + w, y - 1, c); rect(101, y - 2, 99 + w, y - 2, C.blanco); }
  poligono([[118, 135], [166, 134], [168, 141], [164, 148], [120, 148], [116, 141]], Q.papelS); poligono([[118, 135], [166, 134], [167, 140], [117, 140]], Q.papel);
  for (let i = 0; i < 5; i++) linea(122 + i * 9, 138, 126 + i * 9, 136 + (i & 1), Q.tinta); linea(120, 144, 162, 145, Q.pgD); pset(140, 137, Q.tintaR); pset(141, 136, Q.tintaR); pset(139, 136, Q.tintaR); pset(141, 138, Q.tintaR); pset(139, 138, Q.tintaR);
  disco(150, 136, 3, C.k); disco(150, 136, 2, hex('#c8e8f8')); pset(149, 135, C.blanco); linea(153, 138, 157, 140, Q.zoD);
  disco(184, 137, 3, Q.latonS); disco(184, 137, 2, Q.papel); pset(184, 136, C.rojo); pset(184, 137, C.k);
  rect(167, 130, 175, 138, C.k); rect(168, 131, 174, 137, Q.taza); rect(172, 131, 174, 137, Q.tazaS); rect(168, 131, 174, 131, Q.cafe); rect(175, 132, 177, 135, C.k); pset(176, 133, Q.taza); pset(176, 134, Q.taza);
  // la lámpara de banquero: pie de latón, tulipa verde y su cono de luz sobre el tablero
  rect(200, 132, 212, 135, C.k); rect(201, 132, 211, 134, Q.laton); rect(201, 132, 211, 132, Q.latonL); rect(205, 120, 207, 131, Q.latonS); rect(205, 120, 205, 131, Q.latonL);
  poligono([[198, 121], [201, 113], [211, 113], [214, 121]], Q.pantalla); linea(201, 114, 211, 114, Q.pantallaL); rect(198, 121, 214, 121, Q.latonS);
  for (let y = 122; y <= 140; y++) for (let x = 180; x <= 232; x++) { const w = 7 + (y - 122) * 1.4; if (Math.abs(x - 206) < w && e_um(x, y) < 0.35 - (y - 122) * 0.01) { const c = B[y * 320 + x]; if (c) pset(x, y, e_mezcla(c, Q.luzL, 0.4)); } }
  rect(202, 121, 210, 121, hex('#f8d870'));
}

// H · el mapa de cerca, visto desde arriba sobre la mesa (o.encuadre 'mesa', o.camara 'mapa')
const e_MARCAS = { cruz: [108, 64], copa: [198, 72], rollo: [152, 128] };

function e_mapa(R, t, o) {
  const b = e_fijo(R, 'mapa', () => e_mapaFijo(R)), { pset, rect, linea, disco } = R, Q = e_Q;
  R.copiar(b);
  // el vapor de la taza (desde arriba: volutas que se deshacen), la aguja de la brújula y la mariquita que cruza
  e_vapor(R, 36, 40, t, 3, hex('#e8e0d0'), 14, 1.2); e_vapor(R, 32, 42, t + 1.7, 5, hex('#e8e0d0'), 12);
  { const a = -0.4 + Math.sin(t * 2.3) * 0.18 + Math.sin(t * 5.1) * 0.06, cx = 284, cy = 140; for (let i = -9; i <= 9; i++) pset(Math.round(cx + Math.cos(a) * i), Math.round(cy + Math.sin(a) * i), i > 0 ? C.rojo : C.metalD); disco(cx, cy, 1, Q.latonS); }
  { const u = ((t * 0.07) % 1), x = Math.round(30 + u * 260), y = Math.round(172 - Math.sin(u * 7) * 3); disco(x, y, 2, C.rojo); pset(x + 2, y, C.k); pset(x, y - 1, C.k); pset(x - 1, y + 1, C.k); if (Math.floor(t * 8) % 2) { pset(x - 1, y + 2, C.k); pset(x + 1, y + 2, C.k); } }
  // las tres marcas: cada una aparece, se rodea con un círculo de tinta y, con o.preguntas, lleva un «?» que flota
  const n = Math.max(0, Math.min(3, o.marcas ?? 3)), q = o.preguntas ?? 0;
  ['cruz', 'copa', 'rollo'].forEach((k, i) => { const f = Math.max(0, Math.min(1, n - i)); if (f <= 0) return; const [x, y] = e_MARCAS[k];
    if (f > 0.25) e_marca(R, k, x, y);
    for (let a = 0; a < f * 2 * Math.PI; a += 0.06) { const r = 13 + Math.sin(a * 3) * 0.6; pset(Math.round(x + Math.cos(a - 1.8) * r), Math.round(y + Math.sin(a - 1.8) * r * 0.85), Q.tintaR); pset(Math.round(x + Math.cos(a - 1.8) * (r + 1)), Math.round(y + Math.sin(a - 1.8) * (r + 1) * 0.85), Q.tintaR); }
    if (f < 1) { const ex = (f - 0.25) / 0.75; if (ex > 0) for (let j = 0; j < 3; j++) pset(x + Math.round(Math.cos(j * 2.1 + t * 4) * 16 * ex), y + Math.round(Math.sin(j * 2.1 + t * 4) * 14 * ex), Q.luzL); }
    if (q > 0) R.icono('?', x - 2, Math.round(y - 25 - Math.abs(Math.sin(t * 3 + i * 1.3)) * 3 + (1 - q) * 6), Q.tintaR, Q.pgD, 1); });
  // motas de polvo en la luz de la lámpara
  for (let k = 0; k < 8; k++) { const x = Math.round(250 + Math.sin(t * 0.4 + k * 2) * 30 + k * 4), y = Math.round(70 + ((t * 3 + k * 23) % 60)); pset(x, y, Q.luzL); }
  return { mapa: [64, 20, 252, 164], marcas: e_MARCAS, lupa: [34, 146], brujula: [284, 140], taza: [34, 44], lapiz: [262, 166] };
}

// una de las tres marcas del mapa (pictogramas de tinta y color): 'cruz' (la cruz templaria roja), 'copa' (el cáliz de
// oro), 'rollo' (el rollo de metal verdoso)
function e_marca(R, k, x, y) {
  const { rect, pset, poligono } = R, Q = e_Q;
  if (k === 'cruz') { for (const [a, b] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) poligono([[x, y], [x + a * 7 + b * 4, y + b * 7 + a * 4], [x + a * 7 - b * 4, y + b * 7 - a * 4]].map(([p, q]) => [Math.round(p), Math.round(q)]), Q.tinta);
    for (const [a, b] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) poligono([[x, y], [x + a * 6 + b * 3, y + b * 6 + a * 3], [x + a * 6 - b * 3, y + b * 6 - a * 3]], C.rojo); pset(x - 1, y - 4, hex('#f07070')); }
  else if (k === 'copa') { rect(x - 5, y - 8, x + 5, y - 3, Q.tinta); rect(x - 4, y - 7, x + 4, y - 3, C.oro); rect(x - 3, y - 2, x + 3, y - 1, C.oro); rect(x - 1, y, x + 1, y + 3, C.oroS); rect(x - 4, y + 4, x + 4, y + 5, C.oro); rect(x - 4, y + 5, x + 4, y + 5, C.oroS); rect(x - 3, y - 7, x - 2, y - 4, C.oroL); rect(x + 3, y - 7, x + 4, y - 2, C.oroS); }
  else { rect(x - 8, y - 5, x + 8, y + 3, Q.tinta); rect(x - 7, y - 4, x + 7, y + 2, hex('#c87a3a')); for (let i = -6; i <= 6; i += 3) rect(x + i, y - 2, x + i + 1, y - 2, hex('#5aa890')); rect(x - 7, y + 1, x + 7, y + 2, hex('#8a4a24')); rect(x - 9, y - 6, x - 6, y + 4, hex('#a85a2a')); rect(x + 6, y - 6, x + 9, y + 4, hex('#a85a2a')); pset(x - 8, y - 5, hex('#f0a868')); pset(x + 7, y - 5, hex('#f0a868')); }
}

function e_mapaFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, Q = e_Q;
  // la mesa: tablones anchos con vetas que ondulan, juntas, nudos y el charco de luz cálida de la lámpara
  for (let y = 0; y < 180; y++) { const tab = Math.floor(y / 36), yi = y % 36;
    for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.045 + h(tab, 0, 520) * 20 + Math.sin(x * 0.013 + tab) * 3 + yi * 0.55) + (h(x >> 3, y, 521) - 0.5) * 0.6;
      let c = v > 0.75 ? Q.m2 : v > -0.2 ? Q.m0 : v > -0.8 ? Q.m1 : Q.m3; if (yi === 0) c = Q.mD; else if (yi === 1) c = Q.mL;
      const l = 1 - Math.hypot((x - 290) / 150, (y - 70) / 110); if (l > 0 && e_um(x, y) < l * 0.6) c = e_mezcla(c, Q.luzL, 0.22); else if (l < -0.25 && e_um(x, y) < -l - 0.25) c = e_mezcla(c, C.k, 0.25);
      B[y * 320 + x] = c; } }
  for (const [x, y] of [[40, 100], [300, 20], [210, 172]]) { for (let r = 4; r > 0; r--) R.anillo ? R.anillo(x, y, r, r & 1 ? Q.mD : Q.m3) : disco(x, y, r, Q.m3); }
  // el pergamino: sombra, borde roto, manchas, dobleces y la doble orla
  const borde = (x, y) => { const d = Math.min(x - 64, 252 - x, y - 20, 164 - y); return d + (h(x >> 1, y >> 1, 522) - 0.5) * 3; };
  for (let y = 16; y < 170; y++) for (let x = 60; x < 258; x++) { if (borde(x - 3, y - 3) > 0 && borde(x, y) <= 0) pset(x, y, e_mezcla(B[y * 320 + x], C.k, 0.45)); }
  for (let y = 16; y < 170; y++) for (let x = 60; x < 258; x++) { const d = borde(x, y); if (d <= 0) continue;
    const m = h(x >> 3, y >> 3, 523) * 0.6 + h(x >> 2, y >> 2, 524) * 0.4; let c = d < 2 ? Q.pgD : d < 5 && e_um(x, y) < 0.5 ? Q.pgS : m < 0.22 ? Q.pgS : m > 0.85 ? Q.pgL : Q.pg;
    if (x === 158 || y === 92) c = Q.pgS; else if (x === 159 || y === 93) c = Q.pgL; pset(x, y, c); }
  rect(72, 27, 244, 27, Q.tinta); rect(72, 157, 244, 157, Q.tinta); rect(72, 27, 72, 157, Q.tinta); rect(244, 27, 244, 157, Q.tinta);
  rect(75, 30, 241, 30, Q.pgD); rect(75, 154, 241, 154, Q.pgD); rect(75, 30, 75, 154, Q.pgD); rect(241, 30, 241, 154, Q.pgD);
  // el contenido, recortado a la orla: el mar a la izquierda y abajo con olas, la costa, montes, bosques, el río
  R.recorte([76, 31, 240, 153]);
  const costa = (y) => 104 + Math.sin(y * 0.09) * 8 + Math.sin(y * 0.23) * 3;
  for (let y = 31; y <= 153; y++) for (let x = 76; x <= 240; x++) { if (x < costa(y) || (y > 140 && x < 150 + Math.sin(x * 0.2) * 4)) { if (B[y * 320 + x] === Q.pg || B[y * 320 + x] === Q.pgL || B[y * 320 + x] === Q.pgS) pset(x, y, (x * 3 + y * 5) % 11 === 0 ? Q.marS : Q.mar); } }
  for (let y = 31; y <= 153; y++) { const x = Math.round(costa(y)); pset(x, y, Q.tinta); pset(x + 1, y, Q.pgD); }
  for (let x = 76; x < 150; x++) pset(x, Math.round(140 + Math.sin(x * 0.2) * 4), Q.tinta);
  for (let k = 0; k < 9; k++) { const x = 80 + (k % 3) * 8, y = 40 + Math.floor(k / 3) * 30 + (k & 1) * 6; linea(x, y, x + 1, y - 1, Q.marS); linea(x + 2, y - 1, x + 3, y, Q.marS); }
  for (let k = 0; k < 5; k++) { const x = 90 + k * 12, y = 148; linea(x, y, x + 1, y - 1, Q.marS); linea(x + 2, y - 1, x + 3, y, Q.marS); }
  { const x = 86, y = 118; poligono([[x - 5, y], [x + 5, y], [x + 3, y + 3], [x - 3, y + 3]], Q.tinta); linea(x, y, x, y - 9, Q.tinta); poligono([[x + 1, y - 9], [x + 6, y - 3], [x + 1, y - 2]], Q.pgL); linea(x + 1, y - 9, x + 6, y - 3, Q.tinta); }
  for (let k = 0; k < 9; k++) { const x = 150 + (k % 5) * 16 + (k > 4 ? 8 : 0), y = 50 + (k > 4 ? 12 : 0); poligono([[x, y - 7], [x - 6, y], [x + 6, y]], Q.monte); linea(x, y - 7, x + 6, y, Q.tinta); linea(x, y - 7, x - 6, y, Q.tinta); linea(x, y - 7, x - 2, y - 4, C.blanco); }
  for (let k = 0; k < 14; k++) { const x = 172 + Math.round(h(k, 1, 525) * 60), y = 100 + Math.round(h(k, 2, 525) * 40); disco(x, y, 2, Q.bosque); pset(x, y + 3, Q.tinta); }
  for (let y = 66; y < 140; y++) { const x = Math.round(170 - (y - 66) * 0.3 + Math.sin(y * 0.15) * 6); pset(x, y, Q.rio); pset(x + 1, y, Q.rio); }
  // la senda de puntos que une las tres marcas
  const ruta = [[108, 64], [140, 80], [176, 66], [198, 72], [190, 104], [170, 118], [152, 128]];
  for (let i = 0; i + 1 < ruta.length; i++) linea(ruta[i][0], ruta[i][1], ruta[i + 1][0], ruta[i + 1][1], Q.tintaR, 3);
  // la rosa de los vientos
  { const x = 222, y = 132; for (const [a, b] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) { poligono([[x, y], [x + a * 10 + b * 2, y + b * 10 - a * 2], [x + a * 10, y + b * 10]], Q.tinta); poligono([[x, y], [x + a * 10 - b * 2, y + b * 10 + a * 2], [x + a * 10, y + b * 10]], Q.tintaR); } R.anillo ? R.anillo(x, y, 5, Q.tinta) : 0; }
  R.recorte(null);
  // alrededor: la taza (desde arriba), la lupa, la brújula de latón, el lápiz, las fotos y unas monedas
  disco(34, 44, 12, e_mezcla(Q.m1, C.k, 0.4)); disco(32, 42, 11, Q.taza); disco(32, 42, 8, Q.tazaS); disco(32, 42, 7, Q.cafe); pset(29, 39, hex('#8a5a3a')); pset(30, 39, hex('#8a5a3a')); rect(43, 40, 48, 44, Q.taza); rect(44, 41, 47, 43, Q.m0);
  for (let a = 0; a < 6.28; a += 0.05) pset(Math.round(56 + Math.cos(a) * 9), Math.round(62 + Math.sin(a) * 9), e_mezcla(Q.m0, Q.cafe, 0.5));   // el cerco de café
  { const x = 34, y = 146; linea(x + 8, y + 8, x + 22, y + 22, C.k); linea(x + 9, y + 8, x + 23, y + 22, Q.zoD); linea(x + 10, y + 8, x + 24, y + 21, Q.zoL); disco(x, y, 13, C.k); disco(x, y, 12, Q.latonS); disco(x, y, 11, Q.laton); disco(x, y, 10, hex('#b8dce8'));
    for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j < 90 && (i - j) % 7 === 0) pset(x + i, y + j, hex('#e0f0f8')); rect(x - 6, y - 7, x - 3, y - 6, C.blanco); }
  { const x = 284, y = 140; disco(x + 2, y + 2, 15, e_mezcla(Q.m0, C.k, 0.45)); disco(x, y, 15, Q.latonS); disco(x, y, 14, Q.laton); disco(x, y, 12, Q.pgL); for (let a = 0; a < 16; a++) { const an = a * Math.PI / 8, r = a % 4 ? 10 : 9; pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), Q.tinta); } pset(x - 8, y - 9, Q.latonL); pset(x - 9, y - 8, Q.latonL); rect(x - 2, y - 17, x + 2, y - 15, Q.laton); }
  { linea(262, 168, 306, 150, C.k); linea(262, 167, 306, 149, hex('#e8c040')); linea(263, 169, 306, 151, hex('#b8901c')); poligono([[256, 171], [262, 166], [263, 170]], hex('#e8c8a0')); pset(256, 171, C.k); rect(304, 148, 308, 152, hex('#e87a9a')); }
  const pol = (x, y, tipo) => { rect(x + 2, y + 2, x + 24, y + 28, e_mezcla(Q.m0, C.k, 0.4)); rect(x, y, x + 22, y + 26, C.blanco); rect(x + 2, y + 2, x + 20, y + 19, tipo ? hex('#8ac0e0') : hex('#9ac4e8'));
    if (tipo) { poligono([[x + 2, y + 19], [x + 9, y + 6], [x + 14, y + 12], [x + 16, y + 9], [x + 20, y + 19]], hex('#7a7a88')); pset(x + 9, y + 6, C.blanco); rect(x + 2, y + 17, x + 20, y + 19, hex('#2a5a3a')); }
    else { rect(x + 5, y + 8, x + 10, y + 19, Q.monte); rect(x + 12, y + 11, x + 17, y + 19, Q.monte); for (let i = 0; i < 3; i++) pset(x + 5 + i * 2, y + 7, Q.monte); rect(x + 7, y + 12, x + 8, y + 14, C.k); rect(x + 2, y + 18, x + 20, y + 19, hex('#5aa83a')); } };
  pol(262, 62, 0); pol(274, 84, 1);
  for (const [x, y] of [[300, 172], [292, 176], [306, 166]]) { disco(x, y, 3, C.oroS); disco(x, y, 2, C.oro); pset(x - 1, y - 1, C.oroL); }
}

const e_M = pal({
  // las Rocosas: granito (luz, cuerpo, sombra, hondo), nieve, bruma, bosques, río, la fuente termal, el sendero
  gL: '#c4c2cc', g0: '#9e9caa', gS: '#72707e', gD: '#4e4c5c', gK: '#363442', nv: '#f4f8fc', nvS: '#c4d0e4', bruma: '#a8c0d8',
  b0: '#4a7a78', b0L: '#6a9a8a', b1: '#2e5e4a', b1L: '#4a7a5a', b2: '#1e4636', b2L: '#3a6a4a', b3: '#143024', tronco: '#5a3a24',
  agua: '#3a7aa8', aguaS: '#2a5a88', aguaL: '#8ac8e8', espuma: '#e8f4fc', grava: '#a8a49a', gravaS: '#7a766c',
  turq: '#4ac8c8', turqD: '#2a88a8', turqL: '#a8f0e8', min0: '#e8a040', min1: '#d06a2a', min2: '#f0d070', minS: '#a85a2a',
  sen: '#a8885e', senS: '#866848', senL: '#c8a87a', agujas: '#7a5a3a', agujasS: '#5a4028', helecho: '#5a8a3a', helechoL: '#7aaa4a',
  liq0: '#d8903a', liq1: '#b8c890', ciervo: '#9a6a3a', ciervoS: '#6a4424', ardilla: '#b07a42',
  // el atardecer de los escalones
  tc0: '#e0b060', tc1: '#b89048', tc2: '#8a7a3c', tc3: '#5e5a30', tc4: '#3e3a24', tcL: '#f8d080', lomaT0: '#7a5a8a', lomaT1: '#5a3e66', lomaT2: '#3a2a46', silu: '#2a1e30',
  es0: '#f0c088', esS: '#8a6a62', esSS: '#6a4e4e', esJ: '#4a3638', esL: '#ffd8a0', musgo: '#6a7a3a', musgoL: '#8a9a4a', luciernaga: '#f8f080',
  // la tienda de hoy
  techo: '#e0dcd4', techoS: '#c4c0b8', pared: '#ece4d4', paredS: '#d4cab8', franja: '#3a7a6a', suelo0: '#d8d4cc', suelo1: '#c4c0b8', sueloS: '#a8a49c', sueloL: '#f0ece4',
  mos: '#b07a48', mosS: '#8a5a34', mosL: '#d09a62', mosT: '#e8e0d0', mosTS: '#c8beac', acero: '#b8c0c8', aceroS: '#8a929c', vidrio: '#a8d0e0', vidrioS: '#7aa8c0',
  neve: '#e8f0f8', neveL: '#fafcff', dk: '#2a2e36', dkL: '#4a5060', pant: '#9ae8b0', pantD: '#1e4a2e', fachada: '#c8946a', fachadaS: '#a8744e',
});

// un pico de granito: la cresta (x, y), la base de xl a xr en yb; la cara de la izquierda en sombra (el sol a la
// derecha), grietas, la nieve de arriba con lenguas por las canales; bru (0–1): cuánta bruma lo aleja
function e_pico(R, px, py, xl, xr, yb, k, bru) {
  const M = e_M, cols = [M.gK, M.gD, M.gS, M.g0, M.gL].map((c) => e_mezcla(c, M.bruma, bru)), nv = e_mezcla(M.nv, M.bruma, bru * 0.6), nvS = e_mezcla(M.nvS, M.bruma, bru * 0.6);
  for (let y = py; y <= yb; y++) { const u = (y - py) / (yb - py), a = px + (xl - px) * u, b = px + (xr - px) * u, rx = px + (y - py) * 0.12 + Math.sin(y * 0.3 + k) * 2;
    for (let x = Math.floor(a); x <= Math.ceil(b); x++) { if (x < 0 || x > 319) continue; const e = Math.min(x - a, b - x) + (h(x >> 1, y >> 1, k) - 0.5) * 4; if (e < 0) continue;
      const lit = x > rx, gr = h(Math.floor((x + y * (lit ? 0.4 : -0.4)) / 3), Math.floor(y / 7), k + 1) < 0.22;
      let i = lit ? (gr ? 2 : (e_um(x, y) < 0.3 ? 4 : 3)) : (gr ? 0 : (e_um(x, y) < 0.25 ? 2 : 1));
      const nieve = u < 0.32 + h(x >> 2, 1, k + 2) * 0.12 - (h(x >> 3, 2, k + 3) < 0.3 ? 0.15 : 0) || (u < 0.55 && h(x >> 1, Math.floor(y / 4), k + 4) < 0.1);
      R.pset(x, y, nieve ? (lit ? nv : nvS) : cols[i]); } }
}

// una franja de bosque de pinos: cresta ondulada (y0, amplitud amp) rellena hasta yb, con pinos en la cresta y por la
// ladera (esc: tamaño); devuelve la cresta
function e_bosque(R, y0, amp, yb, sem, c, cP, cL, esc, n) {
  const cr = new Int16Array(320);
  for (let x = 0; x < 320; x++) { cr[x] = Math.round(y0 - amp * (0.5 + 0.35 * Math.sin(x * 0.021 + sem) + 0.15 * Math.sin(x * 0.07 + sem * 2))); R.rect(x, cr[x], x, yb, c); if (h(x, yb, sem) < 0.3) R.pset(x, cr[x] + 1 + Math.floor(h(x, 3, sem) * (yb - cr[x])), cP); }
  for (let k = 0; k < n; k++) { const x = Math.round(h(k, sem, 540) * 330) - 5, xc = Math.max(0, Math.min(319, x)), yb2 = cr[xc] + 3 + Math.round(h(k, sem, 541) ** 1.5 * Math.max(1, yb - cr[xc] - 2)), s = esc * (0.7 + h(k, sem, 542) * 0.6);
    for (let j = 0; j < 3; j++) { const w = (5 - j * 1.4) * s, y = yb2 - j * 4 * s; R.poligono([[x, y - 7 * s], [x - w, y], [x + w, y]], cP); R.poligono([[x, y - 7 * s], [x + 1, y - 1], [x + w * 0.9, y]], cL); } }
  return cr;
}

// un bolo de granito redondeado (centro, radios rx, ry): contorno, luz de arriba a la derecha, motas del granito,
// grietas y manchas de liquen
function e_roca(R, cx, cy, rx, ry, k, o = {}) {
  const M = e_M, cols = [M.gK, M.gD, M.gS, M.g0, M.gL], den = (x, y) => { const a = Math.atan2(y - cy, x - cx), n = 1 + 0.1 * Math.sin(a * 3 + k) + 0.06 * Math.sin(a * 7 + k * 2); return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < n * n; };
  for (let y = Math.floor(cy - ry * 1.2); y <= cy + ry * 1.2; y++) for (let x = Math.floor(cx - rx * 1.2); x <= cx + rx * 1.2; x++) { if (!den(x, y)) continue;
    if (!den(x + 1, y) || !den(x - 1, y) || !den(x, y - 1) || !den(x, y + 1)) { R.pset(x, y, M.gK); continue; }
    const nx = (x - cx) / rx, ny = (y - cy) / ry, l = nx * 0.55 - ny * 0.8 + (e_um(x, y) - 0.5) * 0.35 + (h(x >> 2, y >> 2, k) - 0.5) * 0.3;
    let c = cols[l > 0.75 ? 4 : l > 0.2 ? 3 : l > -0.4 ? 2 : 1]; const q = h(x, y, k + 1);
    if (q < 0.06) c = M.gD; else if (q > 0.96) c = M.gL;
    const lq = h(x >> 2, y >> 2, k + 2); if (ny < 0.2 && lq < 0.1) c = (x + y) & 1 ? M.liq0 : e_mezcla(M.liq0, M.gS, 0.4); else if (lq > 0.93) c = M.liq1;
    R.pset(x, y, c); }
  for (let g = 0; g < 2; g++) { let x = cx + Math.round((h(g, k, 3) - 0.5) * rx), y = cy - Math.round(ry * 0.6); for (let i = 0; i < ry; i++) { if (den(x, y)) R.pset(x, y, M.gK); y++; x += h(i, g, k + 5) < 0.3 ? -1 : h(i, g, k + 5) > 0.7 ? 1 : 0; } }
}

// H · las Rocosas (o.encuadre 'rocosas', o.camara 'general'); o.luz 'dia' | 'atardecer'
function e_rocosas(R, t, o) {
  const tarde = o.luz === 'atardecer', hor = 104, b = e_fijo(R, 'rocosas' + (tarde ? 'T' : ''), () => { const d = e_rocosasFijo(R); if (tarde) e_tono(R.buf, 1.1, 0.82, 0.66); return d; }), { pset, rect, linea, disco, poligono } = R, M = e_M;
  e_cielo(R, t, tarde ? { hor, modo: 'tarde', sol: [212, 74, 11], estela: null, cumulos: 4 } : { hor, modo: 'dia', sol: [236, 22, 8], estela: [30, 0.04], fase: 20, cumulos: 5 });
  e_capa(R, b, 20);
  // la cascada que baja por el bosque, con su espuma abajo
  for (let y = 98; y <= 118; y++) for (let x = 185; x <= 189; x++) if (h(x, Math.floor(y - t * 24), 543) > 0.35) pset(x, y, (x + Math.floor(y - t * 24)) % 3 ? M.espuma : M.aguaL);
  for (let k = 0; k < 6; k++) pset(183 + k + (Math.floor(t * 6 + k) % 2), 119 + (k & 1), M.espuma);
  // el río: brillos y ondas que corren hacia la izquierda
  for (let k = 0; k < 46; k++) { const x = Math.round(((h(k, 1, 544) * 340 - t * (14 + (k % 3) * 5)) % 340 + 340) % 340) - 10, y = Math.round(126 + Math.sin(x * 0.03) * 3 + 1 + h(k, 2, 544) * 5); if (b[y * 320 + x] !== M.agua && b[y * 320 + x] !== M.aguaS && !tarde) continue; rect(x, y, x + 2 + (k % 3), y, k % 4 ? M.aguaL : M.espuma); }
  // el vapor de la fuente termal: columnas que suben y se van con el aire
  for (let k = 0; k < 4; k++) e_vapor(R, 46 + k * 10, 138, t + k * 0.8, k, k & 1 ? hex('#eef4f8') : C.blanco, 34, 1.5);
  // el ciervo que bebe en la orilla de enfrente
  { const x = 248, y = 123, baja = Math.sin(t * 0.8) > 0 ? 3 : 0; rect(x, y - 6, x + 8, y - 3, M.ciervo); rect(x, y - 3, x + 8, y - 3, M.ciervoS); for (const lx of [x, x + 2, x + 6, x + 8]) rect(lx, y - 2, lx, y, M.ciervoS); rect(x - 2, y - 9 + baja, x, y - 5 + baja, M.ciervo); rect(x - 4, y - 9 + baja, x - 2, y - 7 + baja, M.ciervo); pset(x - 4, y - 8 + baja, C.k); linea(x - 1, y - 10 + baja, x - 3, y - 13 + baja, M.ciervoS); linea(x, y - 10 + baja, x + 2, y - 13 + baja, M.ciervoS); pset(x + 9, y - 6, C.blanco); }
  // el halcón
  { const a = t * 0.35; e_pajaro(R, 120 + Math.cos(a) * 40, 44 + Math.sin(a) * 8, t * 0.5, M.gK, 1); }
  // el pino grande del primer término, que se mece
  { const m = Math.sin(t * 1.1) * 1.5; rect(12, 60, 15, 179, M.tronco); rect(12, 60, 12, 179, e_mezcla(M.tronco, C.k, 0.4)); for (let y = 70; y < 180; y += 9) pset(14, y, e_mezcla(M.tronco, C.k, 0.4));
    for (let j = 0; j < 9; j++) { const y = 46 + j * 13, w = 10 + j * 3.2, sw = m * (1 - j / 10); poligono([[14 + sw, y - 12], [14 - w, y + 4], [14 + w * 0.9, y + 4]], M.b3); poligono([[14 + sw, y - 12], [15, y], [14 + w * 0.9, y + 4]], M.b2); for (let i = 0; i < w; i += 3) pset(Math.round(14 - w + i), y + 4 + (i & 1), M.b2L); } }
  return { suelo: 154, sendero: [0, 142, 319, 166], pies: [60, 110, 160, 210, 250], fuente: [62, 140], rio: [0, 122, 319, 133], cascada: [187, 98], sol: tarde ? [212, 74] : [236, 22], ciervo: [248, 123] };
}

function e_rocosasFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, M = e_M;
  e_pico(R, 40, 50, -40, 130, 104, 550, 0.35); e_pico(R, 214, 52, 120, 300, 104, 551, 0.35);
  e_pico(R, 118, 26, 30, 222, 108, 552, 0.08); e_pico(R, 264, 58, 190, 345, 108, 553, 0.12);
  e_bosque(R, 106, 8, 122, 1.3, M.b0, M.b1, M.b0L, 1.1, 70);
  e_bosque(R, 116, 6, 132, 2.7, M.b1, M.b2, M.b1L, 1.5, 60);
  // el río frío que cruza el valle: orillas de grava, el agua con su trama y piedras con espuma
  for (let x = 0; x < 320; x++) { const yt = Math.round(126 + Math.sin(x * 0.03) * 3);
    for (let y = yt - 2; y <= yt + 9; y++) pset(x, y, y < yt || y > yt + 7 ? (h(x, y, 554) < 0.4 ? M.gravaS : M.grava) : (y < yt + 2 || (x + y * 3) % 13 === 0) ? M.aguaS : M.agua); }
  for (let k = 0; k < 9; k++) { const x = 20 + k * 36 + Math.round(h(k, 1, 555) * 20), y = Math.round(126 + Math.sin(x * 0.03) * 3) + 3 + (k % 3); disco(x, y, 2, M.gS); pset(x - 1, y - 2, M.gL); pset(x - 3, y, M.espuma); pset(x + 3, y + 1, M.espuma); }
  // la pradera de la orilla de acá, con piedras
  for (let y = 133; y < 142; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 556); B[y * 320 + x] = q < 0.2 ? M.b1 : q > 0.85 ? M.helechoL : M.helecho; }
  // la fuente termal: terrazas de minerales en naranja y amarillo, la poza turquesa y el reguero caliente hasta el río
  for (let y = 132; y <= 148; y++) for (let x = 24; x <= 102; x++) { const e = ((x - 62) / 38) ** 2 + ((y - 140) / 8) ** 2; if (e > 1) continue;
    const c = e < 0.18 ? M.turqD : e < 0.38 ? M.turq : e < 0.46 ? M.turqL : e < 0.6 ? M.min2 : e < 0.78 ? ((x + y) & 1 ? M.min0 : M.min1) : (h(x, y, 557) < 0.5 ? M.minS : M.min1); pset(x, y, c); }
  for (let y = 133; y >= 128; y--) { const x = 72 + (133 - y); pset(x, y, M.turq); pset(x + 1, y, M.min0); pset(x - 1, y, M.min1); }
  // el sendero: tierra con rodadas de pisadas, piedras, raíces y agujas de pino
  for (let y = 142; y < 167; y++) for (let x = 0; x < 320; x++) { const bord = y < 144 || y > 164, q = h(x, y, 558); let c = bord ? (q < 0.5 ? M.helecho : M.senS) : q < 0.12 ? M.senS : q > 0.9 ? M.senL : M.sen; if (!bord && h(x >> 1, y, 559) < 0.06) c = M.agujas; B[y * 320 + x] = c; }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 560) * 319), y = 145 + Math.round(h(k, 2, 560) * 19), r = Math.floor(h(k, 3, 560) * 2.5); disco(x, y, r, M.gS); pset(x - r, y - r, M.gL); pset(x + r, y + 1, M.senS); }
  for (let k = 0; k < 4; k++) { let x = 40 + k * 70, y = 143; for (let i = 0; i < 14; i++) { pset(x, y, M.agujasS); x += 2; if (i % 3 === 0) y++; } }
  // el primer término: helechos, matas y una roca grande a la derecha
  for (let y = 167; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = h(x, y, 561) < 0.4 ? M.b2 : M.helecho;
  for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 1, 562) * 319), y = 176 + Math.round(h(k, 2, 562) * 4); for (let i = -3; i <= 3; i++) { linea(x, y, x + i * 3, y - 9 + Math.abs(i), M.helechoL); pset(x + i * 3, y - 9 + Math.abs(i), M.helecho); } }
  e_roca(R, 302, 156, 22, 16, 563);
  e_tapar(R, 108, 179, M.helecho);
}

// H · las rocas de cerca, donde está el cofre (o.encuadre 'rocosas', o.camara 'rocas')
function e_rocas(R, t, o) {
  const tarde = o.luz === 'atardecer', hor = 76, b = e_fijo(R, 'rocas' + (tarde ? 'T' : ''), () => { const d = e_rocasFijo(R); if (tarde) e_tono(R.buf, 1.1, 0.82, 0.66); return d; }), { pset, rect, disco } = R, M = e_M;
  e_cielo(R, t, tarde ? { hor, modo: 'tarde', sol: [70, 60, 10], estela: null, cumulos: 3 } : { hor, modo: 'dia', sol: [204, 20, 7], estela: null, cumulos: 4 });
  e_capa(R, b, 18);
  // el hueco: con o.cofre se aclara un poco (el bronce que asoma devuelve la luz)
  if (o.cofre) for (let y = 132; y <= 150; y++) for (let x = 222; x <= 256; x++) { const c = b[y * 320 + x]; if (c === M.gK && e_um(x, y) < o.cofre * 0.3) pset(x, y, M.gD); }
  // el arroyo caliente de la esquina: corre y humea
  for (let k = 0; k < 18; k++) { const u = ((t * 0.5 + k / 18) % 1), x = Math.round(4 + u * 70 + (k % 3) * 5), y = Math.round(124 + u * 56); if (b[y * 320 + x] === M.agua || b[y * 320 + x] === M.aguaS) { pset(x, y, M.aguaL); pset(x + 1, y, M.espuma); } }
  for (let k = 0; k < 3; k++) e_vapor(R, 18 + k * 18, 140 + k * 14, t + k, k + 4, C.blanco, 26, 1.3);
  // la ardilla que se asoma por encima del bolo de la derecha
  { const s = (t % 6) / 6, sube = s < 0.15 ? s / 0.15 : s < 0.6 ? 1 : s < 0.7 ? (0.7 - s) / 0.1 : 0; if (sube > 0) { const x = 272, y = Math.round(96 - sube * 6); R.recorte([250, 0, 319, 97]); disco(x, y + 3, 3, M.ardilla); disco(x, y, 2, M.ardilla); pset(x - 1, y - 1, C.k); pset(x - 2, y - 3, M.ardilla); pset(x + 1, y - 3, M.ardilla); for (let i = 0; i < 5; i++) pset(x + 4 + (i >> 1), y + 2 - i, e_mezcla(M.ardilla, C.blanco, 0.3)); R.recorte(null); } }
  // un arrendajo que salta en la rama de la izquierda, y agujas que caen
  { const sx = Math.floor(t * 0.8) % 3, x = 104 + sx * 5, y = 78 - ((t * 0.8) % 1 < 0.15 ? 2 : 0); rect(x, y - 2, x + 4, y, hex('#3a6ac8')); pset(x + 5, y - 2, hex('#3a6ac8')); pset(x + 6, y - 2, C.k); pset(x + 5, y - 3, hex('#3a6ac8')); pset(x - 1, y - 1, hex('#2a4a8a')); pset(x + 1, y - 1, C.blanco); }
  for (let k = 0; k < 6; k++) { const y = Math.round((k * 31 + t * 12) % 120) + 40, x = Math.round(60 + k * 40 + Math.sin(t * 2 + k) * 4); pset(x, y, M.agujas); pset(x + 1, y + 1, M.agujas); }
  e_mariposa(R, 170, 118, t, 5, hex('#f8f4e0'), hex('#d8c890'));
  return { suelo: 156, pies: [80, 120, 160, 190], hueco: [239, 148], rocas: [[214, 104, 52, 36], [276, 126, 36, 30], [156, 130, 26, 18]], arroyo: [0, 124, 90, 179] };
}

function e_rocasFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, M = e_M;
  e_pico(R, 236, 48, 170, 330, 84, 570, 0.3);
  e_bosque(R, 76, 6, 98, 0.8, M.b1, M.b2, M.b1L, 1.8, 50);
  const cr = e_bosque(R, 96, 8, 132, 2.2, M.b2, M.b3, M.b2L, 2.6, 44);
  for (let k = 0; k < 12; k++) { const x = 8 + k * 27 + Math.round(h(k, 1, 571) * 10); rect(x, 112, x + 2, 132, M.tronco); rect(x, 112, x, 132, e_mezcla(M.tronco, C.k, 0.4)); }
  // la rama del arrendajo
  linea(96, 79, 136, 82, M.tronco); linea(96, 80, 136, 83, e_mezcla(M.tronco, C.k, 0.4));
  // el suelo del bosque: agujas, tierra, piñas y helechos
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const q = h(x, y, 572), v = (y - 128) / 52; B[y * 320 + x] = q < 0.15 ? M.agujasS : q > 0.88 ? M.senL : h(x >> 1, y >> 1, 573) < 0.25 + v * 0.1 ? M.agujas : M.sen; }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 574) * 319), y = 140 + Math.round(h(k, 2, 574) * 36); rect(x, y, x + 2, y + 3, M.agujasS); pset(x + 1, y + 1, M.senL); }
  for (let k = 0; k < 16; k++) { const x = Math.round(h(k, 1, 575) * 319), y = 134 + Math.round(h(k, 2, 575) * 44), s = 0.6 + (y - 134) / 40; for (let i = -3; i <= 3; i++) { linea(x, y, x + Math.round(i * 3 * s), Math.round(y - (8 - Math.abs(i)) * s), M.helecho); pset(x + Math.round(i * 3 * s), Math.round(y - (8 - Math.abs(i)) * s), M.helechoL); } }
  // el arroyo caliente que baja de la fuente por la esquina, con su borde de minerales
  for (let y = 120; y < 180; y++) { const xa = Math.round((y - 120) * 0.9 - 6 + Math.sin(y * 0.2) * 2), xb = xa + 16 + Math.round((y - 120) * 0.25);
    for (let x = Math.max(0, xa - 2); x <= Math.min(319, xb + 2); x++) pset(x, y, x < xa || x > xb ? (h(x, y, 576) < 0.5 ? M.min1 : M.min0) : (x + y * 2) % 9 === 0 ? M.aguaS : (x - xa < 3 ? M.turq : M.agua)); }
  // los bolos de granito y el hueco en sombra donde está el cofre
  e_roca(R, 214, 104, 52, 36, 577); e_roca(R, 276, 126, 36, 30, 578); e_roca(R, 156, 130, 26, 18, 579);
  for (let y = 128; y <= 152; y++) for (let x = 220; x <= 258; x++) { const e = ((x - 239) / 18) ** 2 + ((y - 141) / 11) ** 2; if (e > 1) continue; pset(x, y, e > 0.8 ? M.gD : e > 0.5 && e_um(x, y) < 0.5 ? M.gD : M.gK); }
  rect(226, 150, 252, 152, M.agujasS); for (let x = 224; x < 256; x += 3) pset(x, 149, M.helecho);
  e_roca(R, 190, 156, 14, 7, 580); e_roca(R, 300, 166, 18, 10, 581);
  e_tapar(R, 76, 179, M.sen);
}

// H · el escalón al atardecer (o.encuadre 'escalon'; o.camara 'general' o 'cerca')
function e_escalon(R, t, o) {
  const cerca = o.camara === 'cerca', hor = cerca ? 122 : 112, b = e_fijo(R, cerca ? 'escalonC' : 'escalon', () => e_escalonFijo(R, cerca)), { pset, rect, linea } = R, M = e_M;
  e_cielo(R, t, { hor, modo: 'tarde', sol: cerca ? [204, 112, 19] : [236, 100, 13], estela: null, cumulos: 4 });
  e_capa(R, b, 40);
  // la ventana de la granja que tiembla, golondrinas y luciérnagas
  if (!cerca && Math.sin(t * 5) + Math.sin(t * 9.3) > -1.2) rect(44, 106, 45, 107, hex('#ffd060'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.12 + k * 0.33) % 1), x = 340 - u * 380, y = 50 + k * 12 + Math.sin(u * 20 + k) * 6; e_pajaro(R, x, y, t * 1.4, M.silu, k); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 590) * 300 + 10 + Math.sin(t * 0.7 + k) * 8), y = Math.round(118 + h(k, 2, 590) * 50 + Math.sin(t * 0.9 + k * 2) * 5), f = Math.sin(t * 2.4 + k * 1.9); if (f > 0.3) { pset(x, y, M.luciernaga); if (f > 0.8) { pset(x + 1, y, M.tcL); pset(x, y - 1, M.tcL); } } }
  // el caracol que sube el escalón (cerca), y la hierba alta del primer término a contraluz
  if (cerca) { const x = Math.round(70 + (t * 1.2) % 60), y = 146; rect(x, y - 1, x + 5, y, hex('#c8a890')); R.disco(x + 2, y - 3, 2, hex('#a86a3a')); pset(x + 2, y - 3, hex('#e8b070')); pset(x + 6, y - 2, hex('#c8a890')); pset(x + 6, y - 3, C.k); }
  for (let k = 0; k < 30; k++) { const x = k * 11 + Math.round(h(k, 1, 591) * 6); e_mata(R, x, 181, 8 + h(k, 2, 591) * 10, Math.sin(t * 1.3 - x * 0.03) * 0.7, [M.silu, M.tc4, M.tc3], k); }
  return cerca ? { suelo: 162, asiento: [100, 147], escalones: [[40, 147], [92, 133], [150, 119]], muro: [246, 70], sol: [204, 112], pies: [24, 200, 240, 270] }
    : { suelo: 157, asiento: [114, 149], escalones: [[96, 149], [118, 141], [140, 133], [162, 125]], muro: [210, 80], sol: [236, 100], pies: [40, 70, 230, 260] };
}

// la escalera de piedra vieja: [x0, x1, arriba, abajo] de cada escalón; la cara de arriba encendida por el sol bajo,
// la de delante en sombra con juntas, musgo, grietas y hierba en las juntas; el muro roto con medio arco a la derecha
function e_escalera(R, esc, muro) {
  const { rect, pset, linea } = R, M = e_M;
  esc.forEach(([x0, x1, yt, yb], i) => {
    for (let y = yt; y <= yb; y++) for (let x = x0; x <= x1; x++) {
      let c; if (y <= yt + 1) c = y === yt ? M.esL : M.es0; else c = e_sillar(x, y - yt - 2, 600 + i, Math.max(4, yb - yt - 1), 14 + i * 3, [M.esJ, M.esSS, M.esS, M.esS, M.es0], 0.35 + (x - x0) / (x1 - x0) * 0.3);
      if (y > yb - 3 && h(x >> 1, y, 601 + i) < 0.45) c = (x + y) & 1 ? M.musgo : M.musgoL;
      if (x === x0 && y > yt + 1) c = M.esJ; pset(x, y, c); }
    for (let k = 0; k < 4; k++) { const x = x0 + 6 + Math.round(h(i, k, 602) * (x1 - x0 - 12)); e_mata(R, x, yt + 1, 3 + h(i, k, 603) * 4, 0.3, [M.musgo, M.musgoL], k); }
    { let x = x0 + Math.round((x1 - x0) * 0.4) + i * 7, y = yt + 2; for (let j = 0; j < yb - yt - 2; j++) { pset(x, y + j, M.esJ); if (h(i, j, 604) < 0.4) x++; } }
    pset(x0, yt, M.esS); pset(x0 + 1, yt, M.es0); });
  const [mx0, mx1, my] = muro, base = esc[0][3];
  for (let x = mx0; x <= mx1; x++) { const yt = Math.round(my + h(x >> 1, 1, 605) * 8 + (x > mx1 - 6 ? 10 : 0)); for (let y = yt; y <= base; y++) pset(x, y, y === yt ? M.esL : x > mx1 - 3 ? M.es0 : e_sillar(x, y, 606, 5, 8, [M.esJ, M.esSS, M.esS, M.esS, M.es0], 0.3 + (x - mx0) / (mx1 - mx0) * 0.5)); }
  for (let a = 0; a <= 26; a++) { const an = Math.PI * (0.5 + a / 52), r = (mx1 - mx0) * 1.6; for (let w = 0; w < 5; w++) { const x = Math.round(mx0 + Math.cos(an) * (r - w) + 2), y = Math.round(my + 18 - Math.sin(an) * (r - w) * 0.6 + 14); if (a < 22 || w < 3) pset(x, y, w === 0 ? M.esL : w === 4 ? M.esJ : M.esS); } }
}

function e_escalonFijo(R, cerca) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, M = e_M, hor = cerca ? 122 : 112;
  e_colinas(R, hor - 6, 10, hor + 2, M.lomaT0, hex('#c87a7a'), 2.2, { arboles: M.lomaT1, n: 20 });
  e_colinas(R, hor, 7, hor + 6, M.lomaT1, M.lomaT1, 4.1, { filo: hex('#e89a7a'), arboles: M.lomaT2, n: 26, pinos: true });
  // el prado dorado: de lejos encendido, de cerca en sombra, con briznas y el filo de luz de las espigas
  const tonos = [M.tc0, M.tc1, M.tc2, M.tc3, M.tc4];
  for (let y = hor + 4; y < 180; y++) { const v = (y - hor - 4) / (176 - hor); for (let x = 0; x < 320; x++) { let l = v * 3.6 + (h(x >> 3, y >> 2, 610) - 0.5) * 0.9; const fl = Math.floor(l); l = fl + (l - fl > e_um(x, y) ? 1 : 0); let c = tonos[Math.max(0, Math.min(4, l))]; if (h(x, Math.floor(y / (2 + v * 4)), 611) < 0.1 + v * 0.06) c = v > 0.5 ? M.tc4 : M.tc3; else if (h(x, y, 612) < 0.04) c = M.tcL; if (y > hor + 4 || !B[y * 320 + x]) B[y * 320 + x] = c; } }
  if (!cerca) {
    // la granja lejana con su ventana, la valla y el roble a contraluz
    rect(36, 102, 52, 110, M.silu); poligono([[34, 102], [44, 95], [54, 102]], M.silu); rect(48, 94, 50, 99, M.silu);
    for (let x = 0; x < 92; x += 8) { rect(x, 116 + (x >> 4), x + 1, 122 + (x >> 4), M.silu); } linea(0, 118, 92, 123, M.silu); linea(0, 120, 92, 125, M.tc3);
    { const x = 270, yb = 118; rect(x - 2, yb - 22, x + 1, yb, M.silu); for (const [dx, dy, r] of [[0, -32, 12], [-10, -26, 8], [10, -26, 9], [-4, -38, 8], [6, -36, 7]]) disco(x + dx, yb + dy, r, M.silu); for (let k = 0; k < 14; k++) pset(x - 14 + Math.round(h(k, 1, 613) * 28), yb - 44 + Math.round(h(k, 2, 613) * 24), M.lomaT2); }
    // la sombra larga de la escalera hacia la izquierda
    for (let y = 150; y <= 168; y++) for (let x = 20; x <= 212; x++) { const u = (y - 150) / 18, xa = 96 - u * 70, xb = 212 - u * 60; if (x >= xa && x <= xb && e_um(x, y) < 0.6) pset(x, y, e_mezcla(B[y * 320 + x], M.silu, 0.45)); }
    e_escalera(R, [[96, 212, 149, 157], [118, 212, 141, 148], [140, 212, 133, 140], [162, 212, 125, 132]], [206, 230, 80]);
  } else {
    // la valla, el árbol solo a la derecha, y la escalera más cerca y más alta
    for (let x = 0; x < 320; x += 12) rect(x, 118, x + 1, 128, M.silu); linea(0, 121, 319, 121, M.silu); linea(0, 125, 319, 125, M.silu);
    { const x = 286, yb = 128; rect(x - 2, yb - 30, x + 2, yb, M.silu); linea(x, yb - 30, x - 12, yb - 44, M.silu); linea(x, yb - 26, x + 10, yb - 40, M.silu); for (const [dx, dy, r] of [[-12, -50, 9], [10, -46, 9], [0, -54, 8], [-4, -42, 7]]) disco(x + dx, yb + dy, r, M.silu); }
    for (let y = 152; y <= 170; y++) for (let x = 0; x <= 252; x++) { const u = (y - 152) / 18, xa = 40 - u * 40, xb = 252 - u * 50; if (x >= xa && x <= xb && e_um(x, y) < 0.6) pset(x, y, e_mezcla(B[y * 320 + x], M.silu, 0.45)); }
    e_escalera(R, [[40, 252, 147, 161], [92, 252, 133, 146], [150, 252, 119, 132]], [246, 272, 72]);
  }
  e_tapar(R, hor + 4, 179, M.tc2);
}

// H · la tienda de hoy (o.encuadre 'tienda', o.camara 'general'). El que cobra va detrás del mostrador (pies en y 146);
// después se pinta e_mostrador(R, t) para que el mostrador le tape las piernas.
function e_tienda(R, t, o) {
  const b = e_fijo(R, 'tienda', () => e_tiendaFijo(R)), { pset, rect, disco, linea } = R, M = e_M;
  R.copiar(b);
  // la calle tras la puerta de cristal: coches y gente que pasan (recortados al hueco)
  R.recorte([9, 41, 53, 145]);
  for (let k = 0; k < 2; k++) { const u = ((t * (0.18 + k * 0.07) + k * 0.5) % 1.4), x = Math.round(k ? 70 - u * 110 : -40 + u * 110), y = 122 + k * 4, c = k ? hex('#c83a3a') : hex('#3a6ac8');
    R.poligono([[x, y], [x + 30, y], [x + 30, y - 7], [x + 22, y - 7], [x + 18, y - 12], [x + 6, y - 12], [x + 2, y - 7], [x, y - 7]], c); R.poligono([[x + 7, y - 11], [x + 17, y - 11], [x + 20, y - 7], [x + 4, y - 7]], M.vidrio); disco(x + 7, y, 3, C.k); disco(x + 23, y, 3, C.k); disco(x + 7, y, 1, M.acero); disco(x + 23, y, 1, M.acero); }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.09 + k * 0.55) % 1), x = Math.round(k ? 60 - u * 60 : u * 60), y = 134, p = Math.floor(t * 4 + k) % 2; R.disco(x, y - 12, 2, hex('#e8b890')); R.linea(x, y - 10, x, y - 4, k ? hex('#3a8a5a') : hex('#c84a8a')); R.linea(x, y - 6, x, y - 8, k ? hex('#3a8a5a') : hex('#c84a8a')); R.linea(x, y - 4, x - 1 + p * 2, y, C.k); R.linea(x, y - 4, x + 1 - p * 2, y, C.k); }
  R.recorte(null);
  // un cliente de fondo que pasea tras la góndola (se le ve de hombros arriba)
  { const u = (t * 0.05) % 1, x = Math.round(270 - Math.abs(u * 2 - 1) * 70), y = 116 + (Math.floor(t * 4) % 2); disco(x, y - 6, 3, hex('#d8a880')); rect(x - 3, y - 9, x + 3, y - 8, hex('#3a2a1e')); rect(x - 4, y - 2, x + 4, y + 1, hex('#e8803a')); pset(x + 1, y - 6, C.k); }
  // el tubo que parpadea, el vapor de la cafetera, la pantalla de la caja que cambia y el datáfono que espera
  if (Math.sin(t * 17) + Math.sin(t * 5.3) > 1.5) rect(192, 15, 238, 17, M.techoS);
  e_vapor(R, 136, 92, t, 2, C.blanco, 12);
  { const v = 10 + (Math.floor(t * 0.7) % 9); rect(100, 108, 116, 114, M.pantD); R.numero('$' + v, 102, 114, { color: M.pant, sombra: false }); }
  if (Math.floor(t * 2) % 2) pset(151, 121, hex('#7aff8a'));
  return { suelo: 162, cajero: [92, 146], mostrador: [62, 128, 176, 156], datafono: [151, 124], puerta: [6, 36, 58, 150], pies: [182, 210, 240], nevera: [266, 50, 318, 150] };
}

// el mostrador de la tienda, que va por delante del que cobra: se pinta después de él
export function e_mostrador(R, t) {
  const b = e_fijo(R, 'tienda', () => e_tiendaFijo(R)); e_trozo(R, b, 62, 128, 176, 156);
  if (Math.floor(t * 2) % 2) R.pset(151, 121, hex('#7aff8a'));
}

function e_tiendaFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, M = e_M;
  // el techo de placas con dos pantallas de luz
  for (let y = 0; y < 23; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = x % 24 === 0 || y % 8 === 0 ? M.techoS : M.techo;
  for (const x0 of [60, 190]) { rect(x0, 13, x0 + 50, 19, M.techoS); rect(x0 + 1, 14, x0 + 49, 18, M.neveL); rect(x0 + 2, 16, x0 + 48, 16, M.neve); }
  // la pared: pintura con su trama, la franja de color y la luz de los tubos
  for (let y = 23; y < 152; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 1, y >> 1, 620) < 0.1 ? M.paredS : M.pared; if (y >= 42 && y <= 45) c = M.franja; else if (y < 30 && e_um(x, y) < 0.3) c = M.paredS; B[y * 320 + x] = c; }
  // los carteles de las secciones: pictogramas (una lata, una botella, una galleta, una manzana)
  [[192, '#c84a3a'], [210, '#3a7ac8'], [228, '#d8a040'], [246, '#5aa84a']].forEach(([x, c], i) => { rect(x, 28, x + 14, 39, hex(c)); rect(x, 39, x + 14, 39, C.k);
    if (i === 0) { rect(x + 5, 30, x + 9, 37, C.blanco); rect(x + 5, 33, x + 9, 34, hex(c)); } else if (i === 1) { rect(x + 6, 30, x + 8, 32, C.blanco); rect(x + 5, 33, x + 9, 37, C.blanco); } else if (i === 2) { disco(x + 7, 34, 3, C.blanco); pset(x + 6, 33, hex(c)); pset(x + 8, 35, hex(c)); } else { disco(x + 7, 35, 3, C.blanco); pset(x + 7, 31, C.blanco); pset(x + 8, 30, hex('#3a7a3a')); } });
  // los estantes del fondo, llenos de productos con su etiqueta de precio
  const prod = (x0, x1, yb, k) => { let x = x0; while (x < x1 - 3) { const w = 3 + Math.floor(h(x, k, 621) * 4), al = 6 + Math.floor(h(x, k, 622) * 8), c = [hex('#c84a3a'), hex('#3a7ac8'), hex('#e8c040'), hex('#5aa84a'), hex('#e8803a'), hex('#8a4aa8'), C.blanco, hex('#2a8a8a')][Math.floor(h(x, k, 623) * 8)], tipo = h(x, k, 624);
      if (x + w > x1) break;
      if (tipo < 0.3) { rect(x, yb - al, x + w, yb, C.k); rect(x + 1, yb - al + 2, x + w - 1, yb - 1, c); rect(x + 1, yb - al + 1, x + w - 1, yb - al + 1, M.acero); rect(x + 1, yb - al + 3, x + w - 1, yb - al + 4, C.blanco); }
      else if (tipo < 0.55) { rect(x + 1, yb - al, x + w - 1, yb, c); rect(x + Math.floor(w / 2), yb - al - 2, x + Math.floor(w / 2), yb - al, c); pset(x + 1, yb - al + 1, C.blanco); rect(x + 1, yb - 4, x + w - 1, yb - 3, C.blanco); }
      else { rect(x, yb - al, x + w, yb, C.k); rect(x + 1, yb - al + 1, x + w - 1, yb - 1, c); rect(x + w - 1, yb - al + 1, x + w - 1, yb - 1, e_mezcla(c, C.k, 0.3)); rect(x + 1, yb - al + 1, x + 1, yb - 1, e_mezcla(c, C.blanco, 0.4)); if (w > 3) disco(x + Math.floor(w / 2), yb - Math.floor(al / 2), 1, C.blanco); }
      x += w + 1; } };
  rect(184, 48, 262, 112, M.paredS);
  for (const yb of [64, 82, 100]) { prod(186, 260, yb - 1, yb); rect(184, yb, 262, yb + 1, M.aceroS); rect(184, yb, 262, yb, M.acero); for (let x = 190; x < 260; x += 14) { rect(x, yb + 1, x + 5, yb + 3, C.blanco); rect(x + 1, yb + 2, x + 4, yb + 2, C.rojo); } }
  prod(186, 260, 111, 1);
  // la nevera de bebidas: puertas de cristal con marco, botellas iluminadas y el reflejo
  rect(264, 48, 319, 152, M.dk); for (const x0 of [266, 293]) { rect(x0, 52, x0 + 24, 146, M.neve);
    for (const yb of [72, 94, 116, 140]) { rect(x0, yb, x0 + 24, yb + 1, M.aceroS); for (let x = x0 + 1; x < x0 + 23; x += 4) { const c = [hex('#c83a3a'), hex('#3a8a3a'), hex('#e8a030'), hex('#3a6ac8')][(x + yb) % 4]; rect(x, yb - 12, x + 2, yb - 1, c); rect(x + 1, yb - 14, x + 1, yb - 13, c); pset(x, yb - 10, C.blanco); } }
    linea(x0 + 4, 54, x0 + 16, 144, M.neveL); rect(x0 + 22, 90, x0 + 23, 106, M.acero); }
  // la puerta de cristal: marco de aluminio, la calle (fachada de ladrillo, acera) y la barra de empujar
  rect(4, 36, 58, 152, M.aceroS); rect(6, 38, 56, 150, M.acero);
  for (let y = 41; y <= 145; y++) for (let x = 9; x <= 53; x++) { let c = y < 112 ? ((y % 6 === 0 || (x + (Math.floor(y / 6) & 1) * 4) % 8 === 0) ? M.fachadaS : M.fachada) : y < 124 ? hex('#5a5a68') : y < 130 ? hex('#4a4a58') : hex('#b0aca4');
    if (y >= 52 && y <= 72 && ((x >= 14 && x <= 26) || (x >= 34 && x <= 46))) c = y % 10 === 2 ? hex('#3a4a5a') : hex('#8ab8d8'); B[y * 320 + x] = c; }
  for (let y = 41; y <= 145; y++) for (let x = 9; x <= 53; x++) if ((x - y * 0.5 + 400) % 26 < 3) pset(x, y, e_mezcla(B[y * 320 + x], C.blanco, 0.35));
  rect(9, 100, 53, 102, M.aceroS); rect(9, 100, 53, 100, M.neveL); disco(31, 60, 5, hex('#3aa85a')); disco(31, 60, 3, C.blanco); disco(31, 60, 2, hex('#3aa85a'));
  // el reloj de pared y el cartel de pagar con tarjeta (pictograma) colgado sobre el mostrador
  disco(150, 58, 7, C.k); disco(150, 58, 6, C.blanco); linea(150, 58, 150, 54, C.k); linea(150, 58, 153, 59, C.k);
  linea(150, 23, 150, 90, M.aceroS); linea(170, 23, 170, 90, M.aceroS); rect(144, 90, 176, 106, C.k); rect(145, 91, 175, 105, M.franja); rect(149, 94, 163, 103, C.blanco); rect(149, 96, 163, 97, C.k); rect(151, 100, 154, 101, hex('#e8c040'));
  for (let r = 2; r <= 6; r += 2) for (let a = -0.7; a <= 0.7; a += 0.15) pset(Math.round(166 + Math.cos(a) * r), Math.round(98 + Math.sin(a) * r), C.blanco);
  // detrás del mostrador: la balda alta con productos, el mueble bajo con la cafetera y vasos
  rect(66, 86, 126, 88, M.mosS); prod(68, 124, 85, 7);
  rect(62, 110, 176, 127, M.mosS); rect(62, 110, 176, 111, M.mosL); for (let x = 64; x < 176; x += 28) { rect(x, 113, x + 25, 126, M.mos); rect(x + 12, 118, x + 14, 118, M.acero); }
  rect(128, 92, 146, 110, M.dk); rect(130, 94, 144, 100, M.dkL); disco(137, 97, 2, hex('#ff6a4a')); rect(133, 104, 141, 109, M.acero); rect(135, 106, 139, 109, C.blanco); for (let k = 0; k < 3; k++) { rect(152 + k * 6, 104, 155 + k * 6, 109, C.blanco); rect(152 + k * 6, 104, 155 + k * 6, 104, M.mosTS); }
  // el suelo de baldosas con el reflejo de las luces
  for (let y = 152; y < 180; y++) { const z = (y - 120) / 60; for (let x = 0; x < 320; x++) { const u = (x - 160) / z, i = Math.floor(u / 26), j = Math.floor((60 / z) / 5), f = u / 26 - i;
    let c = (i + j) & 1 ? M.suelo0 : M.suelo1; if (f < 0.05 || Math.abs(60 / z - j * 5) < 0.4) c = M.sueloS; if (Math.abs(x - 85) < 18 - (y - 152) * 0.3 && e_um(x, y) < 0.35) c = M.sueloL; if (Math.abs(x - 215) < 18 - (y - 152) * 0.3 && e_um(x, y) < 0.35) c = M.sueloL; B[y * 320 + x] = c; } }
  rect(0, 152, 319, 152, M.sueloS);
  // la góndola de en medio, la pila de cestas junto a la puerta y el felpudo
  rect(196, 118, 262, 152, M.aceroS); rect(197, 119, 261, 151, M.paredS); for (const yb of [130, 142]) { prod(199, 259, yb - 1, yb + 7); rect(197, yb, 261, yb + 1, M.acero); } prod(199, 259, 150, 9); rect(196, 118, 262, 118, M.acero);
  for (let k = 0; k < 3; k++) { const y = 150 - k * 3; rect(40, y - 5, 56, y, hex('#c83a3a')); for (let x = 41; x < 56; x += 3) pset(x, y - 3, hex('#8e2424')); rect(39, y - 5, 57, y - 5, hex('#e85a4a')); }
  rect(8, 154, 50, 160, hex('#4a4a5a')); for (let x = 10; x < 50; x += 3) rect(x, 155, x, 159, hex('#3a3a48'));
  // el mostrador: tablero claro, frente de madera con paneles, la vitrina de golosinas y el zócalo
  rect(60, 128, 178, 133, M.mosTS); rect(60, 128, 178, 129, M.mosT); rect(60, 133, 178, 133, C.k);
  rect(62, 134, 176, 156, M.mos); for (let x = 64; x < 176; x += 4) for (let y = 135; y < 153; y++) if (h(x, y >> 2, 625) < 0.3) pset(x, y, M.mosS);
  rect(112, 136, 174, 152, M.mosS); rect(113, 137, 173, 151, M.mosL); rect(116, 139, 170, 149, M.mos);
  rect(66, 137, 108, 152, M.aceroS); rect(67, 138, 107, 151, M.vidrio); for (const yb of [144, 151]) { let x = 69; while (x < 105) { const w = 3 + Math.floor(h(x, yb, 626) * 3), c = [hex('#e84a6a'), hex('#e8c040'), hex('#5aa84a'), hex('#3a7ac8'), hex('#e8803a')][Math.floor(h(x, yb, 627) * 5)]; rect(x, yb - 4, x + w - 1, yb - 1, c); pset(x, yb - 4, C.blanco); x += w + 1; } }
  linea(68, 139, 74, 150, M.neveL);
  rect(62, 154, 176, 156, M.dk);
  // sobre el mostrador: la caja con su pantalla (cara al que cobra) y el datáfono del lado del cliente
  rect(96, 116, 120, 127, M.dk); rect(97, 117, 119, 126, M.dkL); rect(98, 106, 118, 115, C.k); rect(104, 115, 110, 116, M.dk);
  rect(146, 118, 157, 128, C.k); rect(147, 119, 156, 127, M.dk); rect(148, 120, 155, 123, M.pantD); rect(149, 121, 154, 121, M.pant); for (let y = 125; y <= 126; y++) for (let x = 148; x <= 155; x += 2) pset(x, y, M.acero);
  rect(160, 124, 170, 127, hex('#e8e0c0')); rect(160, 124, 170, 124, C.blanco);   // un taco de tiques
}

// H · el datáfono de cerca (o.encuadre 'tienda', o.camara 'cerca'): o.importe, o.pago (0–1)
function e_caja(R, t, o) {
  const b = e_fijo(R, 'caja', () => e_cajaFijo(R)), { pset, rect, disco, linea } = R, M = e_M, pago = o.pago ?? 0;
  R.copiar(b);
  // la tienda desenfocada de detrás: las luces que titilan y alguien que pasa
  for (let k = 0; k < 10; k++) { const x = 10 + k * 31, y = 20 + (k % 3) * 16; if (Math.sin(t * 1.3 + k * 2) > 0.6) disco(x, y, 2, M.neveL); }
  { const u = (t * 0.07) % 1, x = Math.round(-20 + u * 360); for (let y = 30; y < 92; y++) for (let i = -9; i <= 9; i++) if (e_um(x + i, y) < 0.5 - Math.abs(i) / 20) pset(x + i, y, y < 46 ? hex('#c8a080') : hex('#4a6a9a')); }
  // la pantalla: el importe y, al pagar, la palomita verde y las ondas sin contacto
  const sx0 = 154, sy0 = 60, sx1 = 202, sy1 = 92;
  rect(sx0, sy0, sx1, sy1, pago > 0.5 ? hex('#c8f0d0') : hex('#d8ecf0'));
  for (let y = sy0; y <= sy1; y += 2) rect(sx0, y, sx1, y, pago > 0.5 ? hex('#b8e4c4') : hex('#c8dce4'));
  if (pago <= 0.5) { R.numero('$' + (o.importe ?? 12), 160, 82, { color: M.dk, sombra: false }); if (Math.floor(t * 2) % 2) rect(193, 75, 194, 82, M.dk); rect(160, 86, 196, 87, M.aceroS); }
  else { const u = Math.min(1, (pago - 0.5) * 4); for (let i = 0; i <= 14 * u; i++) { const x = 166 + i, y = i < 5 ? 76 + i : 81 - (i - 5) * 1.2; disco(x, Math.round(y), 2, hex('#2a9a4a')); } }
  // las ondas sin contacto sobre el datáfono cuando se acerca la tarjeta
  if (pago > 0.05 && pago < 0.7) for (let k = 0; k < 3; k++) { const u = (t * 1.5 + k / 3) % 1, r = 4 + u * 14; for (let a = -0.8; a <= 0.8; a += 0.08) { const x = Math.round(178 + Math.sin(a) * r), y = Math.round(52 - Math.cos(a) * r * 0.6); if (e_um(x, y) < 1 - u) pset(x, y, hex('#4ac8f0')); } }
  // el tique que sale por arriba al cobrar
  if (pago > 0.7) { const l = Math.round((pago - 0.7) / 0.3 * 26); rect(164, 52 - l, 192, 52, C.blanco); for (let y = 52 - l + 3; y < 52; y += 3) rect(167, y, 167 + ((y * 7) % 18) + 4, y, C.grisL); rect(192, 52 - l, 192, 52, C.grisL); }
  // la luz de estado
  pset(200, 98, pago > 0.5 ? hex('#5aff7a') : Math.floor(t * 3) % 2 ? hex('#ffb040') : M.dkL);
  return { datafono: [178, 104], pantalla: [154, 60, 202, 92], lector: [178, 52], ranura: [178, 150], mostrador: 112 };
}

function e_cajaFijo(R) {
  const { rect, pset, poligono, disco, linea } = R, B = R.buf, M = e_M;
  // la tienda desenfocada: bandas de estantes de colores, la nevera que brilla, manchas de luz (bokeh)
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y + 4) / 22), base = [hex('#d8d0c0'), hex('#c87a6a'), hex('#7aa0c8'), hex('#d8b870'), hex('#8ab07a')][(f + Math.floor((x + f * 13) / 37)) % 5]; let c = e_mezcla(base, M.pared, 0.55);
    if ((y + 4) % 22 < 3) c = M.paredS; if (x > 256) c = e_mezcla(M.neve, hex('#a8c8e8'), (x % 20) / 40); if (e_um(x, y) < 0.2) c = e_mezcla(c, C.blanco, 0.15); B[y * 320 + x] = c; }
  for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 630) * 319), y = Math.round(h(k, 2, 630) * 100), r = 3 + Math.floor(h(k, 3, 630) * 5), c = [hex('#f8e8b0'), hex('#f8c0a8'), hex('#c8e0f8')][k % 3];
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d < 1 && (d < 0.75 || e_um(x + i, y + j) < 0.5)) { const q = B[(y + j) * 320 + x + i]; if (q && y + j < 112) pset(x + i, y + j, e_mezcla(q, c, 0.55)); } } }
  // el mostrador visto de cerca: tablero de madera clara con vetas y su canto
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + Math.sin(y * 0.08) * 2 + y * 0.02) + (h(x >> 2, y, 631) - 0.5) * 0.7; B[y * 320 + x] = y < 114 ? M.mosT : v > 0.7 ? M.mosL : v < -0.7 ? M.mosS : M.mos; }
  rect(0, 172, 319, 179, M.mosS); rect(0, 172, 319, 172, M.mosL);
  // el platillo de las monedas, el bote de caramelos, el timbre y el pincho de los tiques
  for (let j = -6; j <= 6; j++) for (let i = -18; i <= 18; i++) { const e = (i / 18) ** 2 + (j / 6.5) ** 2; if (e < 1) pset(66 + i, 150 + j, e > 0.7 ? M.aceroS : M.acero); }
  for (const [x, y] of [[60, 149], [68, 151], [73, 148], [62, 153]]) { disco(x, y, 3, C.oroS); disco(x, y - 1, 2, C.oro); pset(x - 1, y - 2, C.oroL); }
  rect(88, 96, 116, 136, M.vidrioS); rect(89, 97, 115, 135, hex('#d8eef4')); for (let k = 0; k < 26; k++) { const x = 91 + Math.round(h(k, 1, 632) * 22), y = 106 + Math.round(h(k, 2, 632) * 27); disco(x, y, 2, [hex('#e84a6a'), hex('#e8c040'), hex('#5aa84a'), hex('#3a7ac8')][k % 4]); pset(x - 1, y - 1, C.blanco); } rect(86, 92, 118, 96, hex('#c83a3a')); linea(92, 100, 96, 130, C.blanco);
  disco(258, 150, 8, M.aceroS); disco(258, 149, 7, M.acero); disco(256, 147, 2, M.neveL); rect(257, 140, 259, 142, C.k); rect(248, 156, 268, 158, M.dk);
  rect(287, 100, 288, 160, M.aceroS); rect(280, 158, 296, 162, M.dk); for (let k = 0; k < 5; k++) { const y = 128 + k * 6; rect(279 + (k & 1) * 2, y, 297 - (k & 1), y + 4, C.blanco); rect(282, y + 2, 294, y + 2, C.grisL); }
  // el datáfono en su base: cuerpo oscuro redondeado con brillos, el marco de la pantalla, el teclado con cifras,
  // las teclas de color (roja, amarilla, verde), la ranura de la tarjeta y su sombra en el mostrador
  for (let y = 154; y < 166; y++) for (let x = 140; x < 220; x++) if (e_um(x, y) < 0.55) pset(x, y, e_mezcla(B[y * 320 + x], C.k, 0.4));
  rect(150, 54, 206, 160, C.k); rect(151, 55, 205, 159, M.dk); rect(151, 55, 152, 159, M.dkL); rect(153, 55, 205, 55, M.dkL);
  rect(153, 58, 203, 94, C.k);
  const dig = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];
  for (let k = 0; k < 12; k++) { const col = k % 3, fila = Math.floor(k / 3), x = 158 + col * 15, y = 100 + fila * 12, n = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -1][k];
    rect(x, y, x + 11, y + 9, C.k); rect(x, y, x + 10, y + 8, hex('#5a6070')); rect(x, y, x + 10, y, hex('#8a90a0'));
    if (n >= 0) { for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (dig[n][j * 3 + i] === '1') pset(x + 4 + i, y + 2 + j, C.blanco); }
    else { const c = k === 9 ? hex('#d83a3a') : hex('#e8c040'); rect(x + 1, y + 1, x + 9, y + 7, c); rect(x + 1, y + 1, x + 9, y + 1, C.blanco); } }
  rect(158, 148, 198, 152, C.k); rect(160, 149, 196, 150, hex('#16181e'));
  rect(206, 120, 208, 124, M.dkL); linea(150, 160, 206, 160, M.dkL);
  // el símbolo sin contacto encima de la pantalla
  for (let r = 2; r <= 6; r += 2) for (let a = -0.8; a <= 0.8; a += 0.12) pset(Math.round(178 + Math.sin(a) * r), Math.round(58 - Math.cos(a) * r * 0.35), M.dkL);
}
