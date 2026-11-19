// Fontanería y decorados del episodio 40 (Anticitera: la máquina de engranajes de hace dos mil años) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A el mar de Anticitera, 1900–1901: la
// tormenta, la cala y el rescate (mar); B el fondo y el naufragio (fondo); C el museo de Atenas en 1902 y en 2005
// (museo); D el despacho de Price con las radiografías (price); E la máquina reconstruida: la caja, la esfera de delante,
// los engranajes por dentro y las espirales de atrás (maquina); F la Grecia antigua: el taller, el cielo, Olimpia, el
// mapa y el reloj medieval (antigua); G hoy: el estudio de Atom con su mecanismo de cartón (hoy).
// CUIDADO:
// · NADA DE MUERTES NI DE ACCIDENTES DE BUZOS. Las «personas» del fondo son ESTATUAS de bronce y mármol (sorpresa, no
//   susto): nada que parezca un cuerpo de verdad (estatuas reconocibles: pedestal, brazo de bronce verde, ropa de piedra).
// · Nada de extraterrestres, rayos misteriosos ni «tecnología perdida» mágica: la máquina es bronce, madera y oficio.
// · SIN LETRAS: solo números (R.numero), rayas, iconos y pictogramas. Las inscripciones del mecanismo son FILAS DE
//   GARABATOS diminutos que no se leen (no letras latinas ni griegas legibles). Los signos del zodiaco, como iconitos.
// · Las personas reales, por sus atributos y solo con hechos; nada de burla. Los gags van con objetos y animales; los
//   objetos NO tienen cara.
// · La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del año (x 20–170, y 0–14; las cifras del año
//   bajan hasta y ≈ 20: nada con detalle en y 0–20 bajo x 20–170).
// Los personajes son los de ELENCO_AK (stadiatisAK con escafandra, stadiatisCubiertaAK, kontosAK, buzoAK, bomberoAK,
// marineroAK, staisAK, spyridonAK, estudiosoAK, estudioso2AK, priceAK, karakalosAK, investigadorAK, investigadoraAK,
// fisicoAK, fisico2AK, hiparcoAK, arquimedesAK, posidonioAK, ciceronAK, generalAK, artesanoAK, babilonioAK, atletaAK);
// los escribe pixel-chibi.js (T.ELENCO_AK).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bordas, vitrinas) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// Cada encuadre devuelve su geometría: { encuadre, camara, suelo, libre: [x0, x1] (dónde caben los actores de pie), y
// los puntos que nombra su cabecera; ninguno se llama 'camara' ni 'encuadre' }.
// LA BARRA DEL AÑO: tres tramos, 1900–1950, 1951–2004 y 2005–2026; las escenas de la Grecia antigua van sin año.
//
// CANON COMPARTIDO (lo dibujan varios grupos a la vez: tiene que cuadrar entre decorados)
// · EL MECANISMO RECONSTRUIDO: una caja de madera de nogal (un poco más grande que una caja de zapatos, apaisada), con
//   una MANIVELA de bronce en el lado derecho. DELANTE: una esfera grande de bronce con dos anillos concéntricos (fuera,
//   el calendario de los meses con sus marquitas; dentro, el zodiaco con 12 iconitos), la aguja del SOL (un rayito de
//   oro), la aguja de la LUNA y una BOLITA de la fase de la Luna, mitad plateada y mitad negra, que gira; alrededor de la
//   esfera, unos anillos de colores de los planetas (fino, opcional). DETRÁS: dos espirales grandes, la de ARRIBA de 5
//   vueltas (el ciclo de 19 años) y la de ABAJO de 4 vueltas (el Saros, 223 meses) con casillas y unas MARCAS de eclipse
//   (un círculo relleno de Sol, un círculo con media luna) en algunas casillas; una esfera pequeña de 4 sectores (los
//   Juegos) dentro de la de arriba. POR DENTRO: engranajes de bronce con dientes triangulares, de muchos tamaños, uno
//   sobre otro; la RUEDA GRANDE de atrás (la de 223 dientes) y, montadas en ella, DOS RUEDECITAS CON LOS EJES
//   DESPLAZADOS unidas por una CLAVIJA que corre en una RANURA (el truco de la Luna).
// · EL TERRÓN: un bloque de bronce verde de corrosión (verdín) con madera negra podrida pegada, roto por un lado; en la
//   grieta asoma una rueda dentada que brilla un poco. El más grande es como una palma.
// · EL CAÍQUE DE 1900: un velero griego de madera pintada (blanco con franja azul y roja), un solo palo con vela latina,
//   la BOMBA DE AIRE de manivela en cubierta (dos hombres la giran), la manguera hasta el agua, la escalerilla.
// · LA ESCAFANDRA: el casco de cobre redondo con su cristal (la cara se ve) y el traje de lona (ya en el reparto).
// · EL BARCO ANTIGUO HUNDIDO: tablas del casco medio enterradas en arena y posidonia, ÁNFORAS apiladas y caídas,
//   ESTATUAS de bronce (verde) y de mármol (blanco gastado) tumbadas, un caballo de bronce, vasos de vidrio.
// · EL ESTUDIO DE ATOM (hilo de gags): una mesa con su MECANISMO DE CARTÓN (una caja de cartón con ruedas de cartón
//   dentadas, chinchetas como ejes y una manivela de lápiz), un globo terráqueo de aula, una lupa, una lámpara de flexo,
//   un ordenador.
//
//   import * as T from '/atomo/plato/escenas/ak-comun.js';
//   const { E, R, M } = await T.preparar('ak-gancho');
//   T.rodar(E, R, [[0, (t) => T.maquina(R, t, { encuadre: 'caja' })]], {});
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

// el reparto del episodio (ELENCO_AK) lo crea pixel-chibi.js
export const ELENCO_AK = KIT.ELENCO_AK || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el bronce nuevo y el verde de la corrosión, el cobre de las escafandras, el azul del Egeo y el del fondo, la roca
    // caliza de Anticitera, el mármol, la madera de la caja, el papel de las radiografías, el negro de la noche antigua
    bronce: '#c8963a', bronceL: '#f0c868', bronceS: '#8a6024', verdin: '#4a8a6a', verdinS: '#2e5a46', verdinL: '#7ab89a',
    cobre: '#c87a3a', cobreL: '#f0b070', egeo: '#2a6a9a', egeoS: '#1a4a72', egeoL: '#4a8ab8', fondo: '#1a3a4a', fondoS: '#0e2430',
    caliza: '#c8b898', calizaS: '#9a8a6a', marmol: '#eeeae0', marmolS: '#c8c2b4', madera: '#8a5a34', maderaS: '#5e3c22',
    rayosX: '#9ab8d8', rayosXS: '#2a3a5a', nocheA: '#141a34', oro: '#e8c060',
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
  const E = await escena(id, 'ep40');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1900–1950 (los buzos y el museo), 1951–2004 (Price y los rayos), 2005–2026 (el escáner y hoy);
  // las escenas de la Grecia antigua van sin año
  Object.assign(R.ICONOS, {
    ancla: ['...#...', '..###..', '...#...', '...#...', '#..#..#', '##.#.##', '.#####.'],
    rueda: ['.#.#.#.', '#######', '.##.##.', '###.###', '.##.##.', '#######', '.#.#.#.'],
    lupa: ['.###...', '#...#..', '#...#..', '#...#..', '.###...', '....##.', '.....##'],
  });
  R.tramosTiempo([[1900, 1950, R.PALA.AZUL ?? R.PALA.ROJO, 'ancla'], [1951, 2004, R.PALA.ORO, 'rueda'], [2005, 2026, R.PALA.ROJO, 'lupa']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };


// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado por encima del suelo y el color oscuro
// por debajo, para que la página pinte
const provisional = (R, t, c0, c1, suelo = 180) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y >= suelo ? (h(x >> 1, y >> 1, 3) > 0.85 ? c0 : c1) : (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ESQUELETO: cada decorado tiene su tabla { encuadre: { cam: '<segunda cámara>', general: { col, geo }, <cam>: { col,
// geo } } }; la vista que piden las opciones (un encuadre que no existe cae en el primero; una cámara que no es la suya,
// en 'general') pinta su provisional y devuelve una copia de su geometría
function vista(R, t, o, V) {
  const enc = V[o.encuadre] ? o.encuadre : Object.keys(V)[0], e = V[enc], cam = o.camara === e.cam ? e.cam : 'general', v = e[cam];
  provisional(R, t, hex(v.col[0]), hex(v.col[1]), v.geo.suelo ?? 180);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(v.geo)) };
}



// ── A · El mar de Anticitera, 1900–1901: la tormenta, la cala y el rescate ──────────────────────────────────────────
// o.encuadre (y o.camara). LLAMA A marDelante DESPUÉS DE LOS ACTORES, con las mismas opciones y el mismo t.
// Opciones de todo el grupo: o.luz 'dia' (por omisión) | 'tormenta' (= o.tormenta 1) | 'tarde' (sol bajo, todo dorado);
// o.tormenta 0–1 (en los cuatro encuadres): el cielo se cierra con nubes negras que corren y jirones bajos, el mar se
// pica con borreguitos y olas más altas, llueve en diagonal (de lejos en mar, de cerca en marDelante) y, de 0,6 arriba,
// cada 5,7 s cae un rayo y su destello ilumina todo el plano, actores incluidos (lo da marDelante); los barcos cabecean
// (el suelo que devuelve mar() ya lleva ese vaivén de 1–2 px: úsalo en cada fotograma). El decorado NO tiñe a los
// actores con la luz de tormenta o de tarde. Gaviotas, nubes en tres capas a tres velocidades y agua con reflejos,
// brillos y la estela del sol en todos.
//   'cala' (general): LA ISLA DE ANTICITERA desde el mar: a la izquierda los acantilados de caliza ocre (facetas con luz,
//     estratos, grietas, manchas de óxido, matorral, una capillita blanca de cúpula azul arriba, dos cabras que pastan en
//     una repisa, cuevas y rocas con espuma al pie) que cierran una cala turquesa con su playita de cantos, una choza con
//     redes tendidas, una barquita varada y un pescador que remienda; a la derecha el mar abierto hasta el horizonte
//     (y 96) con Creta difuminada y un islote. En medio, EL CAÍQUE (canon: blanco con franja azul y roja, el palo en x
//     176 con la vela latina recogida en su entena, la bandera griega de franjas en la popa, esponjas secándose en un
//     cabo, un barril, un cesto de esponjas, rollos de cabo, el bote a remolque y el cabo del ancla) con LA BOMBA DE AIRE
//     en cubierta (x 258; su volante gira si o.bomba > 0) y la manguera que baja al agua, donde salen burbujas si
//     o.bomba > 0 o o.burbujas. o.bomba 1 pinta además a dos bomberoAK dándole al volante (x 234 y 267); o.bomba 0,5:
//     gira sin hombres (la escena pone los suyos). La escalerilla cuelga por fuera de la borda en x 222–228 (la pinta
//     marDelante, por delante del buzo). o.entra 0–1 (nueva; 1 por omisión): el caíque llega navegando con la vela
//     latina hinchada desde fuera de cuadro por la izquierda (0) hasta su fondeadero (1); o.vela 0–1 fija la vela (por
//     omisión, hinchada mientras entra y recogida fondeado). Devuelve suelo 150 (la cubierta), libre [140, 218] (el palo
//     corta en x 175–177), burbujas, horizonte 96, bomba (el eje del volante), palo, escalera (lo alto de la
//     escalerilla) y dx (lo que se ha corrido el caíque al entrar; todo lo demás ya lo lleva sumado).
//     Cámara 'cubierta': LA CUBIERTA DEL CAÍQUE de cerca: tablas con juntas, vetas y clavos, la borda por dentro con sus
//     cuadernas e imbornales, la bomba de aire (caja de madera, dos volantes de hierro de radios que giran con o.bomba,
//     manómetro de latón con la aguja que tiembla), la manguera enrollada en el suelo que va hasta la escalerilla de
//     madera colgada de la borda (x 261–278), el palo (x 202–209) con sus cabillas y cabos adujados, esponjas colgadas de
//     un cabo que se mecen, redes con corchos sobre la borda, dos cestos, una jarra de barro, el casco de cobre de
//     repuesto sobre un cajón, una gaviota posada y gotas que caen; detrás, el mar con un caíque lejano y la isla, que
//     suben y bajan con el balanceo. o.bomba 1 pinta dos bomberoAK en x 58 y 108. Devuelve suelo 158, libre [20, 250],
//     escalera, bomba, horizonte (el del momento).
//   'rescate' (general): EL RESCATE DE 1900–1901: al fondo, el vapor de la marina griega de costado (casco gris con
//     portillos, costuras y remaches, la franja roja de flotación, la caseta y el puente con toldo, una chimenea con su
//     humo que se va a la izquierda, dos palos con jarcia, botes en los pescantes, manguerotes, marineritos que van y
//     vienen, la bandera de franjas azules y blancas con la cruz, sin escudo), un bote de remos que va y viene, un casco de
//     buzo que asoma con burbujas, Creta a lo lejos y la isla detrás a la derecha; delante, la cubierta del caíque con la
//     bomba de aire (x 46; gira por omisión, o.bomba 0 la para; o.bomba 1 pinta dos bomberoAK en x 22 y 55), la
//     escalerilla (x 176–182, en marDelante) y LA GRÚA DE MADERA (el puntal en x 230–233 y la pluma que sale sobre el agua
//     hasta x 292) que iza desde el torno (x 212, su manubrio gira mientras sube) UNA ESTATUA de bronce verde con su peana,
//     en una eslinga con su tabla, que sale del agua (y 160) y chorrea (o.iza 0–1: 0 bajo el agua, solo el cabo tenso y
//     las ondas; entre medias, lo de debajo del agua se ve teñido y ondulado; 1 colgada en lo alto, goteando). Devuelve
//     suelo 152, libre [72, 196], gancho (el gancho del cabo), estatua (su peana), torno, bomba, escalera, horizonte 92.
//     Cámara 'hallazgos': LA CUBIERTA DEL VAPOR CON LOS HALLAZGOS: tablas de teca calafateadas, la amurada de chapa con
//     costuras, remaches y chorreras de óxido y la regala de madera, de la que cuelgan tres baldes de incendios, un remo
//     y un bichero trincados, un rollo de cabo y el salvavidas; un manguerote de ventilación, las bitas con su estacha;
//     sobre una lona mojada, una estatua de bronce tumbada (x 18–98) y en una parihuela de madera oscura una de mármol
//     comido por el mar (x 100–152), ambas con su peana (estatuas, no cuerpos), un ánfora tumbada; ánforas con
//     incrustaciones en su caballete (x 170–210), vasos de vidrio sobre un cajón (x 212–234), una caja de madera con
//     joyitas que brillan (x 238–256), charcos que reflejan y tiemblan, y en el rincón, un cesto con los TERRONES verdes
//     (canon, x 264–292) junto a un rollo de cabo, que nadie mira (o.terron 0–1: un brillito de una rueda, casi nada);
//     detrás, el mar con el caíque fondeado que cabecea y la isla, y el humo de la chimenea que cruza. Devuelve suelo 160,
//     libre [20, 220] (los hallazgos quedan detrás, por encima de y 158), terrones, horizonte 80.
//   Las cuatro vistas dejan tranquilas la esquina de Atom y la barra del año: allí solo cielo, y las nubes y el humo
//   bajan poco a poco al acercarse.
const V_MAR = {
  cala: { cam: 'cubierta', general: { col: ['#a8c8e0', '#2a6a9a'], geo: { suelo: 150, libre: [140, 218], burbujas: [262, 172], horizonte: 96, bomba: [258, 137], palo: 176, escalera: [225, 146], dx: 0 } }, cubierta: { col: ['#a8c8e0', '#8a5a34'], geo: { suelo: 158, libre: [20, 250], escalera: [269, 98], bomba: [91, 135] } } },
  rescate: { cam: 'hallazgos', general: { col: ['#a8c8e0', '#2a6a9a'], geo: { suelo: 152, libre: [72, 196], gancho: [292, 86], estatua: [292, 128], torno: [212, 140], bomba: [46, 139], escalera: [179, 148], horizonte: 92 } }, hallazgos: { col: ['#a8c8e0', '#8a5a34'], geo: { suelo: 160, libre: [20, 220], terrones: [279, 138] } } },
};
export function mar(R, t, o = {}) {
  const enc = o.encuadre === 'rescate' ? 'rescate' : 'cala', e = V_MAR[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const L = a_mLuz(o); a_mPv = a_mPaleta(L);
  let geo;
  if (enc === 'cala') geo = cam === 'cubierta' ? a_mCubierta(R, t, o, L) : a_mCala(R, t, o, L);
  else geo = cam === 'hallazgos' ? a_mHallazgos(R, t, o, L) : a_mRescate(R, t, o, L);
  // la tormenta: la lluvia de lejos (el destello del rayo lo da marDelante, por encima de los actores)
  if (L.s > 0.05) a_mLluvia(R, t, Math.round(L.s * 160), 0.6 + L.s * 0.6, L.s);
  return { encuadre: enc, camara: cam, ...geo };
}
// lo de delante de los personajes: en 'cala' y 'rescate', la borda de cerca del caíque (la regala y el casco: les tapa
// 2–3 px de los pies), el agua que lame la flotación, la escalerilla de fuera y la manguera que pasa por encima de la
// borda y baja al agua (y, en la cala con tormenta, los rociones de la proa); en 'cubierta', el rollo de cabo abajo a la
// izquierda y un balde con su esponja que gotea abajo a la derecha; en 'hallazgos', el agua que chorrea de la lona;
// con tormenta, la lluvia de cerca y el destello del rayo sobre todo. Se llama con las mismas opciones (y el mismo t)
// que mar(); devuelve {}
export function marDelante(R, t, o = {}) {
  const enc = o.encuadre === 'rescate' ? 'rescate' : 'cala', e = V_MAR[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const L = a_mLuz(o), s = L.s; a_mPv = a_mPaleta(L);
  if (enc === 'cala' && cam === 'general') {
    const { dx, dy } = a_mCalaPos(t, o, s);
    const b = a_mBuf(R, 'calaBorda|' + a_mClaveL(o, L), (bb) => { a_mCaiqueBorda(R, a_mCAL.X, a_mCAL.Y, a_mCAL.L); a_mTinte(bb, L); });
    a_mVolcarDesde(R, b, dx, dy, a_mCAL.Y - 4, 180);
    a_mAguaDelante(R, t, a_mCAL.X + dx, a_mCAL.X + a_mCAL.L + dx, a_mCAL.Y + 16 + dy, L);
    a_mEscalerilla(R, a_mCAL.X + 116 + dx, a_mCAL.Y - 3 + dy, a_mCAL.Y + 19 + dy);
    if (dx > -200) a_mMangueraFuera(R, t, a_mCAL.X + 154 + dx, a_mCAL.Y + dy, a_mCAL.Y + 16 + dy, s);
    if (s > 0.2) a_mRocion(R, t, a_mCAL.X + a_mCAL.L - 8 + dx, a_mCAL.Y - 14 + dy, s);
  } else if (enc === 'rescate' && cam === 'general') {
    const dy = Math.round(Math.sin(t * 1.7) * s * 1.6);
    const b = a_mBuf(R, 'resBorda|' + a_mClaveL(o, L), (bb) => { a_mCaiqueBorda(R, a_mRES.X, a_mRES.Y, a_mRES.L); a_mTinte(bb, L); });
    a_mVolcarDesde(R, b, 0, dy, a_mRES.Y - 4, 180);
    a_mAguaDelante(R, t, a_mRES.X, a_mRES.X + a_mRES.L, a_mRES.Y + 16 + dy, L);
    a_mEscalerilla(R, 176, a_mRES.Y - 3 + dy, a_mRES.Y + 19 + dy);
    a_mMangueraFuera(R, t, 52, a_mRES.Y + dy, a_mRES.Y + 16 + dy, s);
  } else if (cam === 'cubierta') {
    // el rollo de cabo de abajo a la izquierda y el balde con su esponja a la derecha
    a_mRollo(R, 12, 176, 14, 5);
    a_mBalde(R, 300, 179, t);
  } else if (cam === 'hallazgos') {
    // el agua que chorrea de la lona hasta los charcos
    for (let k = 0; k < 5; k++) { const x = [40, 78, 120, 182, 230][k], u = ((t * 0.9 + k * 0.37) % 1); if (u < 0.7) R.pset(x, Math.round(153 + u * 6), a_mPv.gota); }
  }
  if (s > 0.05) a_mLluvia(R, t + 3.1, Math.round(s * 50), 0.7 + s * 0.6, s, true);
  if (s > 0.6) a_mDestello(R, a_mRayoLuz(t) * s);
  return {};
}
// ── B · El fondo y el naufragio ────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en fondoDelante (se llama después de los actores, con las mismas opciones).
//   'naufragio' (cámara 'general'): EL FONDO A UNOS 50 m, 1900–1901. Detrás, el agua tramada en azules con dos crestas de
//     arrecife lejanas en la bruma; a la izquierda, el ACANTILADO de roca (x 0–84) con estratos, esponjas naranjas,
//     amarillas y moradas, erizos y dos gorgonias que se mecen, y castañuelas (pececitos negros) que revolotean; la arena
//     con ondas y conchas, y la pradera de POSIDONIA que ondea al fondo y en matas. EL BARCO ANTIGUO HUNDIDO (canon): el
//     casco (x 146–318, y 128–162) con las cuadernas rotas, la tablazón, la regala medio enterrada, ÁNFORAS en filas, de
//     pie, caídas y rotas, y dos vasos de vidrio. LAS ESTATUAS (nada que parezca un cuerpo: todas enteras, rígidas, con
//     pedestal o plinto, pliegues de piedra y sin cara): el CABALLO DE BRONCE verde volcado y hundido hasta las rodillas
//     (x 74–126, y 95–134), la ESTATUA DE MÁRMOL tumbada con su plinto, picada y con algas (x 120–184, y 116–137), y la
//     ESTATUA DE BRONCE de pie, algo inclinada contra la carga, con el BRAZO DOBLADO HACIA ARRIBA y la mano abierta, como si
//     saludara (pedestal en x 217–237, y 147–158; la mano en estatua, unos 55 px más alta que el suelo). Bronce antiguo:
//     pardo con manchas de verdín. Las estatuas van en su propia capa, por delante de la posidonia que ondea. Vida: rayos de luz azul que bajan y se mueven (aparecen bajo y 22, lejos de Atom), cáusticas
//     que corren por la arena, partículas a tres profundidades, un banco de peces plateados, tres sargos, un pez grande en
//     la bruma y EL PULPO (sobre un ánfora, junto a la estatua). Devuelve suelo 162, libre [20, 250], estatua: [x, y]
//     (la mano levantada), estatuaCabeza: [x, y] (lo alto de la cabeza, para el pañuelo del gag 3), estatuaPie: [x, y],
//     pulpo: [x, y] (donde se posa), caballo, marmol, anforas: [x0, y0, x1, y1], barco: [x0, y0, x1, y1].
//     o.siluetas 0–1: la penumbra: un velo azul noche cubre todo (también lo de fondoDelante, si se le pasa la misma
//     opción) y las tres estatuas se vuelven SILUETAS OSCURAS confusas, con un halo que tiembla con el agua, revueltas con
//     las ánforas y las cuadernas (el susto del buzo); al bajar a 0 vuelve la luz y se ve que son estatuas.
//     o.pulpo false: el decorado no pinta el pulpo (la escena lo mueve con b_pulpo). o.luz 0–1 (por omisión 1): la fuerza
//     de los rayos de luz.
//   Cámara 'terron': EL TERRÓN EN EL FONDO de cerca (canon): un bloque de bronce verde de verdín con placas de madera
//     negra podrida a la izquierda, roto a la derecha con las capas a la vista, medio enterrado en la arena con su
//     sombra; junto a él un ÁNFORA grande rota con su cuello caído, una roca con esponjas, erizos y gusanos de abanico,
//     conchas y una estrella de mar; al fondo, el casco y la estatua en la bruma. Vida: cáusticas, partículas, posidonia,
//     castañuelas, un gobio en la arena y un cangrejo ermitaño que cruza. o.brillo 0–1: un rayo de luz recorre la arena
//     hasta el terrón y descubre en la grieta una RUEDA DENTADA (unos 19 px, 18 dientes triangulares y cuatro radios) que pasa
//     de bronce apagado a oro con un destello (> 0,75). Devuelve terron: [x, y] (el centro), rueda: [x, y], mano: [x, y]
//     (el borde izquierdo: ahí acaba un T.brazo que entra desde abajo a la izquierda, dir 1), suelo 180, libre [0, 0]. El
//     terrón ocupa x 132–189, y 98–132 (unos 57 × 34 px; la mano canónica, 14 px, a su lado).
const V_FONDO = {
  naufragio: { cam: 'terron', general: { col: ['#2a6a9a', '#1a3a4a'], geo: { suelo: 162, libre: [20, 250], estatua: [223, 103] } }, terron: { col: ['#1a3a4a', '#c8b898'], geo: { suelo: 180, libre: [0, 0], terron: [160, 117], rueda: [170, 116] } } },
};
export function fondo(R, t, o = {}) {
  return o.camara === 'terron' ? b_terron(R, t, o) : b_naufragio(R, t, o);
}
// lo que va por delante de los actores: en el naufragio, una roca con un erizo y matas altas de posidonia en las dos
// esquinas de abajo, un ánfora caída abajo a la derecha (x 256–302, y 164–178) y partículas grandes desenfocadas; en el
// terrón, hojas de posidonia de cerca en los bordes. Sigue a o.siluetas (el mismo velo que el fondo).
export function fondoDelante(R, t, o = {}) {
  const s = Math.max(0, Math.min(1, o.siluetas ?? 0)), dk = s > 0 ? (c) => b_mez(c, BF.noche, 0.72 * s) : (c) => c;
  if (o.camara === 'terron') {
    for (const [x, y, L, k] of [[6, 180, 58, 1], [16, 180, 44, 2], [26, 180, 30, 3], [312, 180, 40, 4], [302, 180, 26, 5]]) b_hoja(R, x, y, L, t, k, 3, dk);
    b_motas(R, t, 6, 2, dk);
    return {};
  }
  // la roca de la esquina de la izquierda, con su erizo y una esponja
  R.poligono([[0, 160], [8, 157], [18, 161], [24, 168], [26, 180], [0, 180]], (x, y) => dk(b_tono(BF.ROCA, 1.6 + (b_ruido(x / 4, y / 3, 61) - 0.5) * 2 - (y - 158) / 22, x, y)));
  R.linea(8, 157, 18, 161, dk(BF.rocaL)); R.linea(18, 161, 24, 168, dk(BF.rocaL));
  b_erizo(R, 12, 165, t, dk); b_esponja(R, 21, 172, 3, BF.esN, dk);
  // el ánfora caída de la derecha
  b_anfora(R, 280, 172, 0.12, 46, { dk, rota: 0.18 });
  for (const [x, y, L, k] of [[3, 180, 30, 11], [9, 180, 24, 12], [306, 180, 34, 13], [314, 180, 28, 14], [298, 180, 18, 15]]) b_hoja(R, x, y, L, t, k, 2, dk);
  b_motas(R, t, 5, 2, dk);
  return {};
}
// ── C · El Museo Arqueológico Nacional de Atenas, 1902 y 2005 ───────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en museoDelante (se llama después de los actores, con las mismas opciones).
//   'sala1902': UNA SALA DE TRABAJO DEL MUSEO EN 1902, a la luz dorada de la tarde: techo con cornisa de dentículos,
//     pared pompeyana con paneles y pilastras jónicas, el friso de grecas y el zócalo de mármol verde; a la izquierda, el
//     VENTANAL en arco con cortinas de terciopelo (por él se ve el cielo de Atenas con nubes de tres tonos a tres
//     velocidades, golondrinas y la Acrópolis con el Partenón; un gato duerme en el alféizar y mueve la cola); la luz entra
//     en rayos con POLVO QUE FLOTA y cae en el suelo con la sombra del parteluz; la VITRINA de nogal y cristal (vasos,
//     un bronce pequeño, fragmentos con etiquetas de rayas) con el reloj de pared encima; dos ESTATUAS en sus pedestales
//     (una de mármol con ropa de piedra y una de bronce con el brazo levantado); a la derecha, la estantería con cajas de
//     fragmentos y etiquetas (rayas y números) y una escalera de mano; el suelo de mármol en damero con perspectiva y
//     vetas; y la MESA de Stais (de pie, a la altura de la cintura de los chibis): el paño blanco con el TERRÓN (canon:
//     verde, con madera negra y un brillito), la lupa grande en su brazo, el quinqué con la llama que tiembla, papeles y el
//     tintero. o.polvo 0–1: pasan los años: la luz se enfría, el polvo cubre la vitrina, la estantería y la mesa, salen
//     telarañas, el quinqué se apaga y el reloj se para (para «medio siglo»).
//     Devuelve suelo 160, libre [20, 160] (y a la derecha de la mesa, [234, 300]), mesa: [170, 142, 228, 160] (tablero
//     y 143–148), terron: [x, y] (sobre el paño), lupa: [x, y], vitrina: [72, 50, 140, 133], ventana: [8, 30, 50, 118],
//     estatuas: [[x, yPie], [x, yPie]], stais: [x, suelo] y spyridon: [x, suelo] (donde se plantan para mirar el terrón).
//     museoDelante: una caja de embalaje con paja y un fragmento que asoma (abajo a la izquierda, x 0–40, y 148–179).
//     Cámara 'grieta': EL TERRÓN DE CERCA sobre el paño, en la mesa de Stais: detrás, la sala desenfocada (la mancha del
//     ventanal, los rayos de luz, una estatua y la vitrina en manchas suaves, el polvo que brilla); delante, el tablero con
//     vetas, el paño de lino con su trama y sus pliegues, el terrón grande (bronce verde de verdín con costras, madera
//     negra podrida con fibras, roto por un lado), bandejitas con fragmentos, un compás de puntas y papeles con garabatos;
//     y la LUPA grande apoyada (o.lupa false la quita, para que la escena la lleve en la mano). o.grieta 0–1: la madera
//     seca se agrieta (0–0,3 una raya que crece, astillas y polvillo), se abre (0,3–0,7) y en la grieta aparece la RUEDA
//     DENTADA de bronce (canon), que brilla y destella (0,7–1). Devuelve rueda: [x, y], terron: [x0, y0, x1, y1],
//     lupa: [x, y], suelo 180, libre [0, 0].
//   'escaner': LA SALA DEL MUSEO EN 2005, de otra manera: paredes claras con molduras, raíl de focos en el techo, la gran
//     PUERTA del museo en arco a la izquierda (por ella se ve el pasillo con una estatua y visitantes pequeños que pasan),
//     la cartela verde de salida (un pictograma), una cámara de vigilancia, una foto grande del fragmento en la pared, la
//     MESA de los monitores (tres pantallas con cortes grises que cambian, teclado, portátil, tazas, una caja de espuma con
//     un fragmento), vitrina moderna con luz, tablones de contrachapado en el suelo para el carro y cables; el ESCÁNER de
//     ocho toneladas: un armario gris y blanco sobre un carro con ruedas, puerta de plomo con franjas de aviso y el trébol,
//     luces de estado que parpadean, rejillas, una pantallita y una baliza. o.entra 0–1 (si no se da, 1: ya instalado):
//     0–0,3 aparece en el pasillo, 0,3–0,5 llena la puerta con UN PÍXEL de margen (flechitas de aviso y el «1»), 0,5–0,65
//     cruza hacia delante y 0,65–1 rueda hasta su sitio. o.escanea: la baliza gira y la puerta de plomo brilla.
//     Devuelve suelo 160, libre [20, 200], puerta: [22, 50, 100, 138] (el hueco), escaner: [x0, y0, x1, y1] (donde está en
//     ese instante; instalado, [206, 71, 282, 158]), mesa: [114, 122, 196, 138], monitores: [[x, y], …].
//     museoDelante: un baúl de transporte negro con cantos de aluminio y un rollo de cable (abajo a la derecha, x 290–319).
//     Cámara 'pantalla': UN MONITOR GRANDE de 2005 de cerca, en su mesa (teclado, ratón, taza con vapor, notas con
//     garabatos), con la sala desenfocada detrás (el escáner con su luz, la ventana): la imagen del escáner es el fragmento
//     en grises con sus capas, la barra de herramientas con iconos, el número del corte y la barra de progreso;
//     o.letras 0–1: aparecen FILAS DE GARABATOS DIMINUTOS que no se leen (las inscripciones, canon) dentro de un recuadro;
//     o.corte 0–1: una raya de luz recorre el fragmento y por encima de ella se ven las RUEDAS de dentro. Devuelve
//     pantalla: [56, 30, 264, 138] (la imagen), letras: [x0, y0, x1, y1], suelo 180, libre [0, 0].
const V_MUSEO = {
  sala1902: { cam: 'grieta', general: { col: ['#e8d8b8', '#7a5a3a'], geo: { suelo: 160, libre: [20, 160], libre2: [234, 300], mesa: [170, 142, 228, 160], terron: [199, 141], lupa: [214, 135], vitrina: [72, 50, 140, 133], ventana: [8, 30, 50, 118], estatuas: [[176, 96], [216, 96]], stais: [160, 160], spyridon: [240, 160] } },
    grieta: { col: ['#7a5a3a', '#4a8a6a'], geo: { suelo: 180, libre: [0, 0], rueda: [158, 104], terron: [92, 72, 226, 138], lupa: [268, 128] } } },
  escaner: { cam: 'pantalla', general: { col: ['#e8ecee', '#9aa0a8'], geo: { suelo: 160, libre: [20, 200], puerta: [22, 50, 100, 138], escaner: [206, 71, 282, 158], mesa: [114, 122, 196, 138], monitores: [[128, 108], [155, 104], [182, 108]] } },
    pantalla: { col: ['#1a2030', '#9ab8d8'], geo: { suelo: 180, libre: [0, 0], pantalla: [56, 30, 264, 138], letras: [150, 50, 250, 96] } } },
};
export function museo(R, t, o = {}) {
  const [enc, cam] = c_vistaMuseo(o), geo = JSON.parse(JSON.stringify(V_MUSEO[enc][cam].geo));
  const f = enc === 'sala1902' ? (cam === 'general' ? c_sala1902 : c_grieta) : (cam === 'general' ? c_escaner : c_pantalla);
  return { encuadre: enc, camara: cam, ...geo, ...(f(R, t, o) || {}) };
}
// Lo que va por delante de los personajes (llámala después de los actores, con las mismas opciones que museo): en
// 'sala1902' la caja de embalaje con paja; en 'escaner' el baúl de transporte y el rollo de cable; en los primeros planos,
// nada
export function museoDelante(R, t, o = {}) {
  const [enc, cam] = c_vistaMuseo(o);
  if (cam !== 'general') return {};
  if (enc === 'sala1902') c_cajaPaja(R, t, o); else c_baul(R, t, o);
  return {};
}
// ── D · El despacho de Price (1951–1974) ──────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en priceDelante (se llama DESPUÉS de los actores, con las mismas opciones).
//   'despacho' (cámara 'general'): UN DESPACHO DE LOS AÑOS 50–70 con la luz cálida de la lámpara de mesa: papel pintado de
//     rayas, friso de madera con cuarterones y parqué con una alfombra; a la izquierda una estantería alta con libros de
//     lomos sin letras, cajas de archivo, un busto de yeso y una maqueta de rueda dentada; en la pared, un NEGATOSCOPIO
//     con tres radiografías azuladas a contraluz (capas de ruedas fantasmales; el tubo parpadea de vez en cuando), un
//     reloj de pared que anda y un grabado de un templo; en el centro, la PIZARRA con dos ruedas de tiza que engranan
//     (20 y 40 dientes), números y flechas; delante de la pizarra, el ESCRITORIO de nogal con la máquina de escribir, la
//     regla de cálculo, papeles con columnas de números, un tazón de café que humea, la lámpara de banquero verde y el
//     TELÉFONO NEGRO DE DISCO; a la derecha, un tabique acristalado con su puerta y, detrás, EL LABORATORIO DE RAYOS
//     GAMMA (pared de ladrillos de plomo, la máquina con su brazo y el cabezal sobre una mesa con el TERRÓN, un piloto
//     rojo, el signo de radiación, un técnico pequeño que va y viene). Opciones: o.suena 0–1 (el gag 4: el teléfono
//     tiembla, el auricular salta y salen ondas); o.rayos 0–1 (el cabezal baja sobre el terrón, se enciende el piloto
//     y brilla un halo); o.puerta 0–1 (la puerta de cristal se abre hacia dentro); o.terron (true por omisión; false: la
//     mesa del laboratorio vacía); o.libro 0–1 (aparece de pie en la mesa el libro de tapas con la rueda); o.lampara
//     (true por omisión; false: la lámpara apagada y el despacho más oscuro). Devuelve suelo 160, libre [10, 250],
//     telefono: [x, y], negatoscopio: [x0, y0, x1, y1], pizarra: [x0, y0, x1, y1], mesa: [x0, y0, x1, y1] (y0 = el
//     tablero, donde se apoyan las cosas), lampara: [x, y], puerta: [x0, y0, x1, y1], cristal: [x0, y0, x1, y1],
//     maquina: [x, y] (el cabezal), terron: [x, y], libro: [x, y].
//   Cámara 'radiografia': LAS RADIOGRAFÍAS DE CERCA en el negatoscopio (con su marco, sus pinzas, la pared y el borde de
//     la mesa con lápiz, goma y lupa): una placa azulada con capas de RUEDAS fantasmales unas encima de otras (como
//     páginas pegadas) dentro de la silueta del terrón, y delante una rueda grande de 24 dientes triangulares bien
//     contables; o.cuenta 0–1: unas marquitas de lápiz rojo van contando los dientes (una por diente), y o.pierde 1:
//     las marcas se emborronan (siguen ahí, pero hechas un borrón; el gag 4); o.suena 0–1: la placa vibra con el
//     timbre. Devuelve rueda: [x, y, r], dientes: 24, contados: n, punta: [x, y] (la punta del diente que toca marcar:
//     ahí va el lápiz de la escena).
const V_PRICE = {
  despacho: { cam: 'radiografia',
    general: { col: ['#d6bc8e', '#7a4628'], geo: { suelo: 160, libre: [10, 250], telefono: [181, 131], negatoscopio: [64, 64, 152, 124], pizarra: [158, 30, 246, 100], mesa: [166, 137, 250, 156], lampara: [238, 112], puerta: [286, 52, 317, 150], cristal: [254, 56, 317, 128], maquina: [275, 92], terron: [273, 103], libro: [214, 129] } },
    radiografia: { col: ['#9ab8d8', '#2a3a5a'], geo: { suelo: 180, libre: [0, 0], rueda: [156, 92, 42], dientes: 24 } } },
};
export function price(R, t, o = {}) {
  const e = V_PRICE.despacho, cam = o.camara === 'radiografia' ? 'radiografia' : 'general', geo = JSON.parse(JSON.stringify(e[cam].geo));
  const out = { encuadre: 'despacho', camara: cam, ...geo };
  if (cam === 'radiografia') return Object.assign(out, d_radiografia(R, t, o));
  d_fijo(R, 'despacho' + (o.lampara === false ? '0' : '1'), () => d_despachoFondo(R, o.lampara !== false));
  d_despachoVida(R, t, o);
  return out;
}
// lo de delante de los personajes (solo en la cámara general): la papelera de mimbre con bolas de papel y la pila de
// revistas del suelo, abajo a la izquierda, y la pata de la silla giratoria con su sombra; deja libre la acción
export function priceDelante(R, t, o = {}) {
  if (o.camara === 'radiografia') return {};
  const { rect, pset, linea, disco } = R, P = D_P;
  // la papelera de mimbre (x 4–20, abajo): trenzado en rombos con luz a la izquierda, borde, y bolas de papel que asoman
  d_sombra(R, 13, 179, 11, 2, 0.7);
  for (let y = 163; y <= 179; y++) { const w = 7 + Math.round((179 - y) * 0.12); for (let x = 13 - w; x <= 13 + w; x++) {
    const tr = ((x + y) % 4 === 0) || ((x - y + 40) % 4 === 0), lado = (x - 13 + w) / (2 * w); pset(x, y, x === 13 - w || x === 13 + w ? P.madD : tr ? (lado < 0.35 ? P.mimbreL : P.mimbreS) : lado < 0.35 ? P.mimbre : lado > 0.75 ? P.mimbreS : P.mimbre); } }
  rect(4, 161, 22, 163, P.madD); rect(5, 161, 21, 161, P.mimbreL);
  for (const [bx, by, r] of [[9, 160, 3], [15, 159, 3], [12, 157, 2]]) { disco(bx, by, r, P.papelS); disco(bx - 1, by - 1, r - 1, P.papel); pset(bx, by, P.papelS); pset(bx + 1, by - 1, P.papelS); }
  // la pila de revistas atadas con un cordel (x 26–48), cada una de un color con su canto claro
  const REV = [P.libro3, P.papel, P.libro1, P.libro5, P.papelS, P.libro2];
  for (let i = 0; i < 6; i++) { const y = 177 - i * 3, dx = Math.round(Math.sin(i * 2.3) * 2); rect(26 + dx, y - 2, 48 + dx, y, P.madD); rect(27 + dx, y - 2, 47 + dx, y - 1, REV[i]); rect(27 + dx, y - 2, 47 + dx, y - 2, P.papel); }
  linea(37, 160, 37, 179, P.cordel); linea(26, 170, 48, 170, P.cordel);
  rect(25, 179, 50, 179, P.tablaD);
  return {};
}
// ── E · La máquina reconstruida ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Es el decorado central del episodio: bronce que brilla, sombras, y TODO GIRA con o.giro
// (vueltas de manivela, puede bajar o ser negativo; por omisión t * 0.2). Una vuelta de manivela ≈ un mes lunar: la aguja
// de la Luna da una vuelta, la del Sol 1/13,37. Sin letras: el zodiaco en iconitos (dibujos, no glifos), las
// inscripciones como garabatos. Las ruedas tienen dientes triangulares de verdad y cada una gira según sus dientes
// (ω2 = −ω1·N1/N2, engranadas en fase; las de un mismo eje, juntas). Lo de delante va en maquinaDelante (después de los
// actores, con las mismas opciones). Todas las posiciones que devuelve son ejes o puntos «en vivo» del fotograma.
//   'caja' (suelo 160, libre [14, 80]): EL MECANISMO DE FRENTE, enorme, sobre un banco de taller antiguo: la caja de
//     nogal (x 128–262, y 26–134, con su cara de arriba y su lado derecho), la placa de delante con columnas de
//     garabatos, la ESFERA [194, 84, 44] con el anillo del calendario (365 marquitas, 12 meses) y el del zodiaco (12
//     iconitos), las agujas del Sol (rayito de oro con su solecito) y de la Luna (de plata, que acelera y frena como la de
//     Hiparco) y la BOLITA mitad plata mitad negra en la aguja de la Luna, que gira; los anillos de los planetas en el
//     centro (o.planetas 0–1: 0.35 por omisión, finos; 1, con sus bolitas que dan vueltas a su paso); la MANIVELA en el
//     lado derecho (eje [268, 92], el pomo gira con o.giro). En la pared, una ventana al mar (nubes de tres tonos a tres
//     velocidades, un barquito, gaviotas), un estante con rollos, un dibujo de una rueda y el colgador de herramientas;
//     en el banco, la lucerna (la llama baila), limas, compás, ruedecitas sueltas y virutas; polvo en el rayo de luz y
//     una salamanquesa que se pasea. o.fecha true | número: un contador en una plaquita (x 130–166, y 117–131) que avanza
//     y retrocede con la manivela (número + giro·27,3 días). o.mareo 1: la bolita da vueltas locas, la aguja se tambalea
//     y le giran estrellitas alrededor (el gag 6). o.zapatos 1: una caja de zapatos de cartón en el banco (x 88–124, y
//     112–134) para comparar el tamaño. o.agujeros 0–1: el anillo de agujeros bajo el calendario (r 46–47), que se van
//     marcando. El personaje de pie a la izquierda (x 14–80) llega con la mano al canto del banco (x 84, y 133).
//     Devuelve suelo, libre, esfera: [x, y, r], manivela: [x, y] (el eje), pomo: [x, y], bolita: [x, y] (en vivo), sol y
//     luna (la punta de cada aguja), banco: [84, 132, 318, 143], zapatos: [x, y] (si o.zapatos), fecha: [x, y].
//     Cámara 'dentro' (sin suelo: inserto): LOS ENGRANAJES POR DENTRO con la tapa quitada: un tren de nueve ruedas de
//     bronce en dos planos (las de atrás más oscuras, sombra de las de delante encima), la RUEDA GRANDE con sus cuatro
//     radios y, montadas en ella, LAS DOS RUEDECITAS DE EJES DESPLAZADOS con la CLAVIJA en la RANURA (la de atrás va a
//     tirones: deprisa y despacio); la placa de bronce con remaches, polvo en la luz y una arañita que baja de su hilo.
//     o.dos 1: solo dos ruedas de 20 y 40 dientes (diente marcado en rojo en cada una; la de 40 da media vuelta por cada
//     vuelta de la de 20) con sus números debajo (o.numeros false los quita); devuelve ruedas [[110, 96, 25.5], [186,
//     96, 50.9]]. o.atasco 0–1: los dientes chocan (chispa y brillo rojo en el punto de choque, el tren tiembla y va a
//     tirones de diente en diente); para que se pare del todo, pasa o.paro (el giro en que se atasca: más allá de él,
//     el tren se queda quieto temblando). Devuelve ruedas: [[x, y, r]…], clavija: [x, y] (en vivo), grande: [x, y, r],
//     choque: [x, y].
//   'atras' (sin suelo: inserto): LA PARTE DE ATRÁS: la placa con las dos espirales (arriba [160, 64, 40], 5 vueltas, 235
//     casillas; abajo [160, 144, 34], 4 vueltas, 223 casillas; a 5 px por vuelta las casillas del centro son una trama),
//     garabatos en columnas, remaches, la aguja de cada espiral con su cursor que sigue el surco (o.aguja 0–1, o
//     [arriba, abajo]; por omisión, despacio con el giro), la esfera de los Juegos [160, 64, 10] con 4 sectores (o.juegos
//     1: corren 4 atletitas de 4 px por su borde), la de 3 sectores en el centro de la de abajo, y 14 MARCAS de eclipse
//     de 5 px (Sol: disco de oro con rayos; Luna: disco de plata mordido) que se encienden una a una (o.eclipses 0–1).
//     Una lucerna a la izquierda (x 38–54, y 118–134) ilumina de lado; en las paredes, un dibujo de espiral, compás,
//     regla, cuerda, un aro graduado, un nicho con un ánfora y rollos. Devuelve arriba, abajo, juegos: [x, y, r], punta: [[x,
//     y], [x, y]] (cursor de cada aguja), marcas: [[x, y]…] (las de eclipse). Cámara 'rueda' (sin suelo: inserto, deja
//     x 8–80, y 60–160 libres para T.mano): LA RUEDA DE 223 DIENTES de verdad, enorme (centro [190, 124], r 106, se
//     sale por abajo), sobre un banco con una regla, una lupa y tornillitos; o.cuenta 0–1: la rueda gira bajo una
//     lucecita fija arriba (190, 17) y los dientes que ya pasaron quedan dorados, con el contador (x 52, y 44) de 0 a
//     223 (o.contador false lo quita). Las dos ruedecitas de la Luna, montadas en ella. Devuelve rueda: [x, y, r],
//     luz: [x, y], contador: [x, y], ruedecitas: [x, y].
const V_MAQUINA = {
  caja: { cam: 'dentro', general: { col: ['#6a4a30', '#c8963a'], geo: { suelo: 160, libre: [14, 80], manivela: [268, 92], esfera: [194, 84, 44], bolita: [194, 67], banco: [84, 132, 318, 143], fecha: [148, 128] } }, dentro: { col: ['#3a2a1c', '#c8963a'], geo: { suelo: 180, libre: [0, 0], clavija: [200, 64], grande: [200, 98, 61.1], ruedas: [] } } },
  atras: { cam: 'rueda', general: { col: ['#3a2a1c', '#c8963a'], geo: { suelo: 180, libre: [0, 0], arriba: [160, 64, 40], abajo: [160, 144, 34], juegos: [160, 64, 10] } }, rueda: { col: ['#2a1e14', '#c8963a'], geo: { suelo: 180, libre: [0, 0], rueda: [190, 124, 106.5], luz: [190, 17], contador: [52, 44] } } },
};
export function maquina(R, t, o = {}) {
  const enc = V_MAQUINA[o.encuadre] ? o.encuadre : 'caja', e = V_MAQUINA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)) }, giro = o.giro ?? t * 0.2;
  if (enc === 'caja' && cam === 'general') return e_caja(R, t, o, giro, geo);
  if (enc === 'caja') return o.dos ? e_dos(R, t, o, giro, geo) : e_dentro(R, t, o, giro, geo);
  if (cam === 'general') return e_atras(R, t, o, giro, geo);
  return e_ruedaGrande(R, t, o, giro, geo);
}
// lo que va por delante de los actores: en 'caja', un cesto de chatarra de bronce y un ánfora en la esquina de abajo a
// la derecha (x 284–320, y 146–180); en 'dentro', el canto de nogal de la caja abajo (y 171–180) con sus clavijos.
export function maquinaDelante(R, t, o = {}) {
  const enc = V_MAQUINA[o.encuadre] ? o.encuadre : 'caja', cam = o.camara === V_MAQUINA[enc].cam ? V_MAQUINA[enc].cam : 'general';
  const { rect, pset, disco, poligono, linea } = R, P = e_P;
  if (enc === 'caja' && cam === 'general') {
    // el ánfora apoyada, con su asa y su brillo
    poligono([[300, 140], [314, 140], [319, 150], [316, 172], [306, 180], [298, 180], [295, 162], [296, 150]], (x, y) => e_tono(P.barro, 2.6 - (x - 296) / 9 + (y > 166 ? -0.6 : 0) + h(x, y, 61) * 0.5, x, y));
    rect(302, 136, 312, 140, P.barro[1]); rect(301, 135, 313, 136, P.barro[3]); linea(300, 142, 297, 150, P.barro[0]); linea(313, 142, 318, 150, P.barro[0]);
    for (let y = 144; y < 176; y += 9) linea(297, y, 316, y + 1, P.barro[1]);
    rect(299, 146, 300, 158, P.barro[4]);
    // el cesto de mimbre con trozos de bronce viejo
    for (let y = 158; y < 180; y++) for (let x = 278 - (y - 158) * 0.2; x < 298; x++) pset(x, y, ((x + (y >> 1)) & 3) === 0 ? P.mimbre[0] : (y & 1) ? P.mimbre[2] : P.mimbre[1]);
    rect(277, 156, 298, 158, P.mimbre[3]); rect(277, 158, 298, 158, P.mimbre[0]);
    for (const [x, y, r] of [[283, 154, 3], [290, 153, 4], [295, 155, 2]]) { disco(x, y, r, P.verdin[1]); pset(x - 1, y - 1, P.verdin[3]); }
    e_ruedita(R, 287, 151, 3, P.br, t * 0.4);
    linea(282, 156, 292, 147, P.br[2]); pset(292, 147, P.br[5]);
  } else if (enc === 'caja') {
    // el canto de la caja: nogal con vetas, un filo de luz y los clavijos de madera
    for (let y = 171; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, e_veta(P.nogal, x, y, 9, 0.3));
    rect(0, 171, 319, 171, P.nogal[4]); rect(0, 172, 319, 172, P.nogal[3]);
    for (let x = 18; x < 320; x += 64) { disco(x, 176, 2, P.nogal[0]); pset(x - 1, 175, P.nogal[3]); }
  }
  return {};
}
// ── F · La Grecia antigua, el cielo y lo que vino después ─────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en antiguaDelante (se llama después de los actores, con las mismas opciones).
// Sin año en la barra. Todos devuelven { encuadre, camara, suelo, libre, … } con los puntos que se dicen abajo.
//   'taller' (general): UN TALLER DE BRONCE EN RODAS hacia el 150 a. C.: techo de vigas, pared encalada con la piedra
//     asomando donde se cae la cal, el zócalo pintado de ocre rojo y bocetos de ruedas a carboncillo en la pared; a la
//     izquierda el HORNO de ladrillo y barro con su chimenea, BRASAS que laten y un fuelle que sopla (las brasas se
//     avivan), la cesta de carbón, las tenazas y un gato sentado en el hombro del horno (parpadea y mueve la cola); el estante
//     con ánforas, rollos de papiro y una balanza, y las herramientas colgadas; a la derecha, una hornacina con un jarro
//     y lingotes y el mandil de cuero colgado; la VENTANA AL PUERTO (recortada): cielo con
//     nubes, una colina con su templo, el faro en el muelle, un mercante que pasa a vela, una TRIRREME que rema y un
//     mozo diminuto que carga un ánfora por el muelle; un emparrado que se mece en el dintel; el rayo de luz en el suelo
//     de baldosas con motas de polvo; el BANCO de trabajo al fondo con el torno de banco, láminas de bronce, limas, un
//     compás, el taladro de arco, una rueda ya hecha en su clavo, la RUEDA A MEDIO CORTAR (los dientes solo en media
//     vuelta) y la lucerna con su llamita; la tina de templar con su gota. o.horno 1: un CRISOL sobre las brasas con
//     bronce fundido que brilla y chispitas que suben (para «se fundía»; sin llamas). o.luz 'dia' (por omisión) |
//     'tarde' (luz dorada, cielo de poniente) | 'noche' (estrellas por la ventana, la sala a oscuras con la luz de las
//     brasas y la lucerna). Delante (antiguaDelante): el yunque en su tocón con el martillo y un ánfora grande, a la
//     derecha (x 268–319). Devuelve suelo 160, libre [20, 250], banco: [x0, y0, x1, y1] (la tabla), rueda: [x, y] (la
//     rueda a medio cortar, no taparla), horno: [x, y] (la boca), ventana: [x0, y0, x1, y1].
//   Cámara 'cielo': EL CIELO DE NOCHE desde una terraza de mármol: estrellas a montones que titilan, la VÍA LÁCTEA en
//     diagonal con su franja oscura, una fugaz de vez en cuando, una barca con su farol, la LUNA que cruza con su halo y su reflejo en el mar
//     (o.luna 0–1, su posición en el arco; por omisión 0,45; o.prisa 1: se adelanta y se atrasa a ratos, para el truco
//     de la clavija), la colina con el TEMPLO dórico y sus lucernas, las luces del pueblo en la orilla que tiemblan, una
//     lechuza que cruza; la columna de la izquierda, el ciprés de la derecha que se mece, la balaustrada con una lucerna,
//     la ESFERA ARMILAR de bronce en su pie (sus anillos giran despacio) y un taburete con rollos (x 190–206). o.eclipse
//     0–1 (cualquier número, también 0): DE DÍA, con nubes y gaviotas, y un ECLIPSE DE SOL sobre el templo (la Luna negra
//     se come el Sol; desde 0,55 el cielo y la terraza se oscurecen, salen las estrellas y las luces y, al final, la
//     corona); o.eclipse 'luna' (o o.rojo 0–1): ECLIPSE DE LUNA, la Luna se pone cobriza.
//     Devuelve suelo 160, libre [20, 150], luna: [x, y] (la del instante; con eclipse de Sol, el Sol, y sol: [x, y]),
//     armilar: [x, y], templo: [x, y], taburete: [x, y].
//   'olimpia' (general): EL ESTADIO DE OLIMPIA de día: cielo con nubes de tres tonos y golondrinas, el sol, la colina del
//     Cronio con pinos, el TEMPLO DE ZEUS y los tesoros entre olivos que se mecen, el talud de enfrente con público
//     diminuto sentado que se mueve y saluda, la tribuna de piedra de los jueces (de púrpura), la PISTA de tierra con sus
//     surcos, huellas y calles de cal, un mozo que rastrilla el borde, el trípode de bronce del premio, la pila de agua,
//     ánforas, y en nuestro borde un disco y unas halteras, la LÍNEA DE SALIDA de losas con sus ranuras y postes, el canal de agua de piedra que brilla, el
//     túnel de entrada abovedado; o.carrera 0–1: cuatro atletas diminutos corren la pista de izquierda a derecha con su
//     polvo (sin o.carrera, dos calientan trotando al fondo). Delante: matas de hierba que se mecen en el borde de abajo.
//     Devuelve suelo 158 (la pista de cerca), libre [20, 280], salida: [x, y], tribuna: [x, y], templo: [x, y].
//   Cámara 'mapa': EL MEDITERRÁNEO EN UN MAPA ANTIGUO sin rótulos, en un pergamino sobre la mesa de madera: costas a
//     tinta con su sombreado de agua, montañas y bosques en picto, Italia, Sicilia, Cerdeña, Grecia, el Peloponeso,
//     Creta, Rodas, Chipre, Asia Menor, la costa de África y el Nilo; ciudades como puntitos; una rosa de los vientos sin
//     letras; barquitos que navegan, un delfín que salta y el agua que riela. o.marca 'corinto' | 'siracusa' | 'rodas' |
//     'anticitera' | 'roma' | 'atenas' | 'alejandria' | null (o una lista de ellas): un circulito rojo que late sobre
//     ese lugar; o.ruta 'roma': una línea de puntos de Rodas a Roma por Anticitera y el estrecho de Mesina, con un barquito
//     en la punta (o.avance 0–1, cuánto va dibujado; por omisión 1). Delante: la lucerna y el compás sobre las esquinas.
//     Devuelve suelo 180, libre [0, 0], corinto, siracusa, rodas, anticitera, roma, atenas, alejandria: [x, y] y
//     barco: [x, y] (la punta de la ruta; con o.avance 0,27 llega a Anticitera).
//   'reloj' (general): UNA PLAZA EUROPEA DEL SIGLO XIV con su RELOJ ASTRONÓMICO de fantasía en la torre: la esfera
//     azul y oro de 24 rayitas (sin números romanos) con la franja del día, el anillo del zodiaco descentrado con sus 12
//     marquitas, la mano del Sol que gira y la bolita de la Luna mitad plata y mitad negra; encima, una ventanita por la
//     que desfilan figuritas, y la campana con su martillo; la aguja y el portal gótico; casas de entramado con
//     contraventanas y macetas, chimeneas que humean, un cartel de pictograma, un puesto con toldo, el pozo, el empedrado,
//     gente pequeña que pasa, palomas que picotean y echan a volar, nubes y vencejos. o.siglos 0–1: hitos de piedra
//     que se ponen uno a uno por el suelo, desde una cajita de bronce (la máquina, a la izquierda) hasta el pie de la
//     torre (para «mil cuatrocientos años»). Delante: dos palomas en primer término. Devuelve suelo 160, libre [76, 250],
//     esfera: [x, y, r], caja: [x, y] (el primer hito), hitos: [[x, y], …].
//   Cámara 'tablillas': UNA AZOTEA DE BABILONIA AL ANOCHECER: cielo de poniente tramado con las primeras estrellas y la
//     Luna creciente, nubes rosas lentas, vencejos; el ZIGURAT a lo lejos con su santuario, la muralla almenada, las
//     azoteas de la ciudad con puertas que se encienden, palmeras que se mecen, el Éufrates que brilla; en otra azotea,
//     un astrónomo diminuto que señala la Luna. En la nuestra: el pretil de adobe, esteras de junco tejidas, un perro que duerme, un taburete, un
//     cántaro, un escobón, un banco de adobe
//     con tablillas de arcilla (rayitas en cuña, nada legible), la TABLILLA GRANDE en su atril, el cesto de barro
//     fresco, los cálamos en un jarro, un gnomon y la lucerna. o.apunta 0–1: van saliendo marquitas nuevas en la tablilla
//     grande (y la última brilla un instante). Delante: unas jarras en la esquina de abajo a la izquierda. Devuelve
//     suelo 160, libre [20, 180], tablilla: [x, y] (el centro de la tablilla grande), luna: [x, y].
const V_ANTIGUA = {
  taller: { cam: 'cielo', general: { col: ['#e8dcc0', '#8a6a44'], geo: { suelo: 160, libre: [20, 250], banco: [148, 134, 270, 141], rueda: [251, 120], horno: [57, 132], ventana: [197, 31, 257, 89] } }, cielo: { col: ['#141a34', '#4a4a5a'], geo: { suelo: 160, libre: [20, 150], taburete: [198, 146], luna: [140, 34], armilar: [168, 128], templo: [232, 92] } } },
  olimpia: { cam: 'mapa', general: { col: ['#b8d8f0', '#c8a878'], geo: { suelo: 158, libre: [20, 280], salida: [44, 136], tribuna: [170, 100], templo: [168, 62] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], corinto: [169, 75], siracusa: [90, 84], rodas: [225, 91], anticitera: [174, 97], roma: [61, 32], atenas: [178, 74], alejandria: [242, 147] } } },
  reloj: { cam: 'tablillas', general: { col: ['#b8d0e8', '#9a8a6a'], geo: { suelo: 160, libre: [76, 250], esfera: [204, 82, 22], caja: [20, 168] } }, tablillas: { col: ['#4a3a5a', '#c8a878'], geo: { suelo: 160, libre: [20, 180], tablilla: [206, 128], luna: [126, 40] } } },
};
export function antigua(R, t, o = {}) {
  const enc = V_ANTIGUA[o.encuadre] ? o.encuadre : 'taller', e = V_ANTIGUA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const geo = JSON.parse(JSON.stringify(e[cam].geo)), pinta = F_PINTA[enc][cam], extra = pinta(R, t, o) || {};
  return { encuadre: enc, camara: cam, ...geo, ...extra };
}
// lo que va por delante de los actores en cada encuadre (llámala después de ellos con las mismas opciones)
export function antiguaDelante(R, t, o = {}) {
  const enc = V_ANTIGUA[o.encuadre] ? o.encuadre : 'taller', e = V_ANTIGUA[enc], cam = o.camara === e.cam ? e.cam : 'general';
  const f = F_DELANTE[enc + '-' + cam]; if (f) f(R, t, o);
  return {};
}
// ── G · Hoy: el estudio de Atom ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Cada vista pinta los 320 × 180 en cada fotograma: lo fijo va en un búfer de R.nuevo() (uno por
// vista) y encima la vida animada. Lo de delante va en hoyDelante (se llama después de los actores, con las mismas o.*).
// LAS OPCIONES DEL GAG son PROGRESOS 0–1 que la escena sube con R.tramo (el decorado no sabe cuándo empieza nada); con
// un 1 sostenido queda el estado final, que sigue vivo:
//   o.gira 0–1: la manivela de lápiz da dos vueltas (y con ella todo el tren de ruedas, que engrana de verdad: la grande
//     va despacio y la Luna de papel, en su alambre, da la vuelta alrededor del Sol de chincheta dorada).
//   o.atasco 0–1 (el gag 1): hasta 0,3 el tren se atasca y TIEMBLA (la manivela tira y no pasa); de 0,3 a 1 la rueda
//     mediana (marrón oscura) salta de su chincheta y sale RODANDO; con 1 queda en el suelo, meciéndose (en el plano de
//     cerca sale de cuadro por la izquierda y en el eje queda la chincheta sola).
//   o.mareo 0–1 (el gag 6, la Luna mareada): la bolita de la Luna se bambolea en su alambre, gira sobre sí misma muy
//     deprisa y le dan vueltas tres estrellitas por encima (la escena sube o.gira deprisa a la vez).
//   o.final 0–1 (el gag 8): el tren gira suave (tres vueltas más de manivela, sin temblor) y a partir de 0,2 la Luna de
//     papel se suelta del alambre y sale VOLANDO: en el estudio cruza la habitación y sale por la ventana hasta quedar
//     como una lunita sobre el Egeo; de cerca sube y sale de cuadro por ARRIBA, entre x 190 y 250 (lejos del año y de Atom).
// Todas las vistas devuelven, además de su geometría fija, los puntos que se mueven en ese fotograma: manivela [x, y] (el
// borrador del lápiz, donde va la mano), luna [x, y] (la Luna de papel, también cuando vuela) y rueda [x, y] (la rueda
// suelta, con o.atasco > 0,3).
//   'estudio': EL ESTUDIO DE ATOM, de día. Pared de cal cálida con su textura y el zócalo de tablas azul egeo; tarima de
//     roble con vetas y nudos; la luz del sol que entra por la ventana y cae en el suelo con motas que flotan. A la
//     izquierda la estantería (x 4–60) con libros sin letras, un ánfora, una brújula y un barco; el olivo en su maceta de
//     greca (las hojas se mecen); el póster azul de engranajes con chinchetas (x 68–102 × 24–58) y el reloj (x 184–196 ×
//     22–34) que anda. El tablero de corcho (x 106–198 × 40–94) con dibujos de ruedas, la foto de la isla, el terrón y un
//     cordel rojo. LA MESA de nogal (x 96–216, tablero y 134–140, canto hasta 143, patas hasta y 156) con el MECANISMO DE
//     CARTÓN (canon, a escala 0,44: cara x 112–200 × 99–139, solapas hasta y ≈ 86; la manivela de lápiz gira alrededor
//     de [182, 117] con radio 17, así que barre y 100–134: fuera del alcance de un chibi de pie, la gira Atom o el plano
//     de cerca), el flexo, el bote de lápices, la cinta, las tijeras y recortes. LA VENTANA (x 206–262 ×
//     26–100) abierta, con las hojas hacia dentro y cortinas de lino que se mecen: el Egeo de hoy (cielo tramado con nubes
//     de tres tonos a tres velocidades, la isla con casitas blancas y cúpula azul, Creta difuminada, un velero que cruza,
//     gaviotas y brillos en el agua). La cómoda (x 270–316) con el GLOBO TERRÁQUEO de aula que gira despacio; la
//     alfombra de greca. Devuelve suelo 158, libre [40, 262], carton [156, 119] (el centro de la cara del mecanismo),
//     mesa [96, 134, 216, 156], ventana [206, 26, 262, 100], globo [293, 86], manivela, luna, rueda.
//     hoyDelante: las cajas de mudanza con rollos de papel (x 0–30, y 128–179) y el cesto de cartones con una regla
//     (x 294–319, y 146–179), en las esquinas de abajo; no tapan nada dentro de libre.
//   Cámara 'carton': EL MECANISMO DE CARTÓN DE CERCA (el mismo objeto, a escala 1): la caja de cartón ondulado (cara x
//     50–250 × 60–150, solapas levantadas hasta y ≈ 28, canto ondulado, cinta en las esquinas, garabatos, la etiqueta con
//     las fases de la Luna y el cerco de café), cuatro ruedas de cartón con dientes y agujeros clavadas con chinchetas de
//     colores (la grande, centro [104, 114], lleva la chincheta dorada que hace de Sol; la mediana, centro [152, 89], es la
//     que sale rodando; la gris, centro [210, 101], lleva el LÁPIZ-manivela de 38 px) y la Luna de papel en su alambre de
//     44 px desde el Sol. Detrás, el estudio ampliado y desenfocado (el corcho y la ventana con el mar y sus brillos que
//     titilan, la cortina que se mece); la mesa de nogal de tablas anchas (y 130–179) con la hoja de la rueda y el compás,
//     bolitas de papel arrugado (Lunas que salieron mal), la regla, las tijeras, el celo, virutas y la taza que humea
//     (x 285–310, y 138–163). La rueda suelta cae a la mesa y sale de cuadro por la izquierda. Devuelve suelo 180, libre
//     [0, 0], carton [150, 105], manivela (el borrador del lápiz: ahí va la mano, T.mano con sinManga, o Atom), luna,
//     rueda. hoyDelante: nada.
//   'ordenador': EL ESCRITORIO DE NOCHE, con luz de flexo. Papel pintado azul noche con rayas y rombos (tranquilo en la
//     esquina de Atom y bajo el año), zócalo de madera, tarima oscura y una alfombra azul bajo la zona libre, la luz de la
//     Luna en el suelo; la VENTANA (x 14–74 × 26–96) a la noche del Egeo (estrellas que titilan, una nube que pasa, la
//     Luna con su halo y su reguero que tiembla en el agua, la isla negra con ventanitas y el faro que barre, un barco con
//     sus luces) con cortinas de terciopelo y un gato en el alféizar que mueve la cola. La balda (x 116–214, y 60) con
//     libros, una escafandra de juguete y la cajita de un mecanismo de cartón; el cuadro de las dos espirales (x 218–262 ×
//     28–74). LA MESA (x 104–302; tablero y 138–147, canto hasta 150, cajonero x 108–136, patas hasta y 162) con DOS
//     PANTALLAS: la del ESCÁNER (hueco x 128–186 × 102–134: el corte del terrón en grises con sus ruedas y garabatos, que
//     una raya clara recorre de arriba abajo; retícula y barra de grises) y la de la SIMULACIÓN (hueco x 196–254 ×
//     102–134: tres ruedas de luz que engranan y giran con o.simula 0–1 (y despacio con t, salvo al chocar), el contador de días (cifras 0–120) y la barra de
//     avance verde; o.choca 0–1: la mediana y la pequeña se ponen rojas, el tren tiembla, destello rojo que late entre
//     ellas, la «!» y la barra roja que parpadea; la escena deja de subir o.simula mientras choca). Teclado, ratón, la taza
//     roja que humea (x 113–124, y 134–143), la lupa, papeles con ruedas, el flexo (luz en [271, 108]), la torre bajo la
//     mesa con sus luces y la papelera. Devuelve suelo 162, libre [12, 100], pantallas, mesa [104, 138, 302, 162], ventana,
//     flexo, choque ([x, y] del destello o null), escaner (la y de la raya). hoyDelante: la planta grande de la esquina
//     (x 284–319, y 118–179: las hojas tapan el pie del flexo).
//   Cámara 'globo': UN AULA de colegio de día: pared verde pálido con su textura, zócalo de azulejos y linóleo a cuadros en
//     perspectiva con el rayo de sol; la PIZARRA (x 34–188 × 28–86) con el Sol, la órbita de la Tierra a trazos, la Tierra
//     con la de la Luna y un eclipse dibujados con tiza (sin letras), la repisa con tizas y borrador; la tira de corcho con
//     seis dibujos de alumnos (x 36–186, y 95–107); el póster de las fases de la Luna (x 6–28); la ventana (x 206–266 ×
//     28–98) con la persiana a medias que tiembla y su cordón, el patio (nubes de tres tonos, tejados, tapia, canasta, dos
//     árboles que se mecen y pájaros) y geranios en el alféizar; el armario de libros (x 276–318, y 70–162) con una planta
//     encima y el reloj que anda (centro [297, 52]). LA MESA DEL PROFESOR (x 184–274, tablero y 138–146, faldón hasta 162)
//     con el GLOBO TERRÁQUEO (centro [236, 118], r 16) en su meridiano de latón, la LÁMPARA-SOL (bombilla [204, 108], con
//     halo que late) y la PELOTITA-LUNA (r 4,6) colgada de un hilo de un brazo de alambre: da vueltas al globo con la cara
//     iluminada hacia la lámpara y pasa por detrás cuando va por el lado de allá; o.gira 0–1: el globo da dos vueltas y la
//     pelotita una; además los dos derivan despacio con t, así que nunca quedan quietos). Libros, manzana. Devuelve suelo 162, libre [16, 182], globo,
//     lampara, pelota [x, y], pizarra, mesa [184, 138, 274, 162], ventana [206, 28, 266, 98]. hoyDelante: dos pupitres de
//     la primera fila (x 0–74 y 112–186, tablero y 165–171, hasta y 179), por debajo de los pies.
const V_HOY = {
  estudio: { cam: 'carton', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [40, 262], carton: [156, 119], ventana: [206, 26, 262, 100], mesa: [96, 134, 216, 156], globo: [293, 86] } }, carton: { col: ['#e8d8c0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], carton: [150, 105], manivela: [230, 70] } } },
  ordenador: { cam: 'globo', general: { col: ['#2a2a3a', '#5a4a3a'], geo: { suelo: 162, libre: [12, 100], pantallas: [[128, 102, 186, 134], [196, 102, 254, 134]], mesa: [104, 138, 302, 162], ventana: [14, 26, 74, 96], flexo: [271, 108] } }, globo: { col: ['#d6e6ce', '#9aaa98'], geo: { suelo: 162, libre: [16, 182], globo: [236, 118], lampara: [204, 108], pizarra: [34, 28, 188, 86], mesa: [184, 138, 274, 162], ventana: [206, 28, 266, 98] } } },
};
export function hoy(R, t, o = {}) {
  const enc = V_HOY[o.encuadre] ? o.encuadre : 'estudio', e = V_HOY[enc], cam = o.camara === e.cam ? e.cam : 'general';
  let vivo;
  if (enc === 'ordenador') vivo = cam === 'globo' ? g_aula(R, t, o) : g_ordenador(R, t, o);
  else vivo = cam === 'carton' ? g_carton(R, t, o) : g_estudio(R, t, o);
  return { encuadre: enc, camara: cam, ...JSON.parse(JSON.stringify(e[cam].geo)), ...vivo };
}
// lo de delante de los personajes en cada vista de hoy(); se llama después de los actores, con las mismas opciones:
//   estudio: las cajas de mudanza (abajo a la izquierda) y el cesto de cartones (abajo a la derecha); carton: nada;
//   ordenador: la planta grande de la esquina; globo: los dos pupitres de la primera fila
export function hoyDelante(R, t, o = {}) {
  const enc = V_HOY[o.encuadre] ? o.encuadre : 'estudio', cam = o.camara === V_HOY[enc].cam ? V_HOY[enc].cam : 'general';
  if (enc === 'ordenador') { if (cam === 'globo') g_pupitresDelante(R, t); else g_plantaDelante(R, t); return {}; }
  if (cam !== 'carton') g_cajasDelante(R, t);
  return {};
}
// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_AK = { mar: V_MAR, fondo: V_FONDO, museo: V_MUSEO, price: V_PRICE, maquina: V_MAQUINA, antigua: V_ANTIGUA, hoy: V_HOY };

// tramado ordenado 4 × 4 (umbrales 0–1)
const a_mB4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_mU = (x, y) => a_mB4[((y & 3) << 2) | (x & 3)];

const a_mLim = (v) => Math.max(0, Math.min(1, v));

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function a_mMezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// los colores propios del mar: el caíque, el vapor, la caliza, las estatuas, las ánforas, los cabos, las gaviotas
const a_mP = pal({
  casco: '#eeece2', cascoS: '#bfc0b8', cascoD: '#8e908c', azulC: '#2a5aa0', azulCL: '#4a7cc0', rojoC: '#b83a32', obra: '#3a3430',
  madera: '#9a6a3c', maderaL: '#c08e58', maderaS: '#6a4426', maderaD: '#3e2816', tabla: '#c8a472', tablaL: '#dcbc88', tablaS: '#a08052', junta: '#5e4428',
  cuerda: '#d0b884', cuerdaS: '#94784c', jarcia: '#2e2620', lona: '#ece0c4', lonaS: '#c4b494', lonaD: '#968462', lonaM: '#a8a088',
  esponja: '#d8b060', esponjaS: '#a07a3a', esponjaD: '#6a4a22', hierro: '#33353d', hierroL: '#6a6e78', laton: '#e0b048', latonS: '#9a7020', latonL: '#f8e090',
  gris: '#7a828a', grisS: '#58606a', grisL: '#a6acb4', grisD: '#3a3f48', blanco: '#f4f2ea', blancoS: '#cfcdc4', vidrio: '#2a3a4a', vidrioL: '#a8d0e0',
  humo: '#c8c8cc', humoS: '#8e8e96', humoD: '#62626a', gaviota: '#f6f6f2', gaviotaS: '#a8acb2', gaviotaD: '#4a4e56', pico: '#f0b030', negro: '#16161c',
  calizaL: '#e4d8ba', calizaD: '#706450', calizaO: '#c89858', calizaH: '#f2ead4', mata: '#5a7040', mataS: '#3a4c2c', mataL: '#80984e', algas: '#4a5a3a',
  cabra: '#ece4d4', cabraS: '#a89c88', canto: '#bab0a0', cantoS: '#8e8678', cantoL: '#d8d0c0', choza: '#b8ac94', chozaS: '#8a806c',
  barro: '#b86a3a', barroS: '#8a4a28', barroL: '#da9060', costra: '#d8d4c4', teca: '#b88a58', tecaL: '#d0a470', tecaS: '#8e6640', calafate: '#2a2420',
  chapa: '#c8ccc8', chapaS: '#9ea4a2', chapaL: '#e6e8e2', remache: '#7e8684', cobre: '#c87a3a', cobreL: '#f0b070', cobreS: '#8a4a24',
  rojoV: '#a83a30', piel: '#e8b088', ropaM: '#e8e8f0', ropaA: '#2a3a6a', gota: '#a8d8f0', espuma: '#f4fbff', joya: '#f0e080', joyaR: '#e05050', joyaA: '#50a0f0',
  cristalV: '#6ab0a0', cristalVL: '#c8f0e0', cristalA: '#5a7ab8', creta: '#7e94ae', creta2: '#9aaec4',
});

// la paleta de lo que se pinta en cada fotograma, ya teñida con la luz (los búferes fijos usan a_mP y se tiñen enteros)
let a_mPv = a_mP;

const a_mPALS = new Map();

function a_mPaleta(L) {
  const k = L.base + '|' + L.sq; let pv = a_mPALS.get(k); if (pv) return pv;
  const A = a_mLUZ[L.base].tinte, T = a_mLUZ.tormenta.tinte;
  pv = Object.fromEntries(Object.entries(a_mP).map(([n, c]) => { let d = A ? a_mMezcla(c, A[0], A[1]) : c; if (L.sq > 0) d = a_mMezcla(d, T[0], T[1] * L.sq); return [n, d]; }));
  a_mPALS.set(k, pv); return pv;
}

// las luces: el cielo (de arriba al horizonte), las nubes (sombra, cuerpo, luz), el mar (hondo, medio, claro, espuma),
// el turquesa de la cala (cuerpo, claro), el tinte de lo fijo y el sol; la tormenta se mezcla con la base según s
const a_mLUZ = Object.fromEntries(Object.entries({
  dia: { cielo: ['#3f84cc', '#559ad6', '#6eaee0', '#8cc2e8', '#acd4ee', '#d2e8f0'], nube: ['#a4bcd8', '#e2ecf6', '#ffffff'], agua: ['#164a74', '#2468a0', '#3e8ac0', '#e8f6fc'], cala: ['#2a9cb0', '#62ccc4'], tinte: null, sol: '#fff8dc', solXY: [228, 36, 6] },
  tarde: { cielo: ['#465896', '#70689e', '#a87890', '#d6927a', '#eeb47e', '#f6d49c'], nube: ['#8e6680', '#da988a', '#ffd6ae'], agua: ['#2e3052', '#58486a', '#9a6c6c', '#ffe0a0'], cala: ['#3e6a7a', '#8aa29a'], tinte: ['#d0783c', 0.14], sol: '#ffe0a0', solXY: [206, 74, 8] },
  tormenta: { cielo: ['#20262f', '#2a313c', '#353d4a', '#414a58', '#4e5866', '#5e6874'], nube: ['#1c2028', '#363c48', '#56606c'], agua: ['#122028', '#1c303c', '#324c5a', '#bcccd0'], cala: ['#24484e', '#3a6266'], tinte: ['#36404e', 0.44], sol: null },
}).map(([k, v]) => [k, { ...v, cielo: v.cielo.map(hex), nube: v.nube.map(hex), agua: v.agua.map(hex), cala: v.cala.map(hex), sol: v.sol && hex(v.sol), tinte: v.tinte && [hex(v.tinte[0]), v.tinte[1]] }]));

// la luz del momento: la base (día o tarde) y la tormenta s (0–1) mezcladas color a color; sq, la tormenta en décimas
// para los búferes fijos
function a_mLuz(o) {
  const base = o.luz === 'tarde' ? 'tarde' : 'dia', s = o.luz === 'tormenta' ? 1 : a_mLim(o.tormenta ?? 0), A = a_mLUZ[base], T = a_mLUZ.tormenta;
  const mx = (a, b) => a.map((c, i) => a_mMezcla(c, b[i], s)), sq = Math.round(s * 10) / 10;
  return { s, sq, base, cielo: mx(A.cielo, T.cielo), nube: mx(A.nube, T.nube), agua: mx(A.agua, T.agua), cala: mx(A.cala, T.cala), sol: A.sol, solXY: A.solXY };
}

const a_mClaveL = (o, L) => L.base + '|' + L.sq;

// tiñe un búfer fijo con la luz (el oro de la tarde, el gris de la tormenta en décimas)
function a_mTinte(b, L) {
  const A = a_mLUZ[L.base].tinte, T = a_mLUZ.tormenta.tinte, m = new Map();
  if (!A && L.sq <= 0) return;
  for (let i = 0; i < b.length; i++) { const c = b[i]; if (!c) continue; let d = m.get(c);
    if (d === undefined) { d = A ? a_mMezcla(c, A[0], A[1]) : c; if (L.sq > 0) d = a_mMezcla(d, T[0], T[1] * L.sq); m.set(c, d); } b[i] = d; }
}

// los búferes fijos (uno por clave), pintados una vez con R.nuevo() y vueltos a usar en cada fotograma
const a_mCACHE = new WeakMap();

function a_mBuf(R, clave, dibuja) {
  let m = a_mCACHE.get(R); if (!m) a_mCACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b), pv = a_mPv; a_mPv = a_mP; dibuja(b); a_mPv = pv; R.recorte(null); R.usar(prev); m.set(clave, b); }
  return b;
}

// vuelca un búfer con huecos (0 = transparente) corrido (dx, dy), de la fila y0 a la y1 (filas del búfer)
function a_mVolcarDesde(R, b, dx, dy, y0 = 0, y1 = 180) {
  const B = R.buf; dx = Math.round(dx); dy = Math.round(dy);
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) { const yy = y + dy; if (yy < 0 || yy > 179) continue; const f = y * 320, g = yy * 320;
    for (let x = Math.max(0, -dx); x < Math.min(320, 320 - dx); x++) { const c = b[f + x]; if (c) B[g + x + dx] = c; } }
}

// el cielo tramado hasta hor, con el sol y su halo (se va con la tormenta) y las nubes en tres capas; yh corre el
// horizonte (el balanceo de la cubierta)
function a_mCielo(R, t, hor, L, o = {}) {
  const B = R.buf, P = L.cielo, n = P.length - 1, yh = o.yh ?? 0, H = Math.min(180, hor);
  for (let y = 0; y < H; y++) { const f = Math.max(0, Math.min(n - 0.001, ((y - yh * 0.5) / hor) * n)), i = f | 0, p = f - i, a = P[i], b = P[i + 1], r = y * 320;
    for (let x = 0; x < 320; x++) B[r + x] = a_mU(x, y) < p ? b : a; }
  if (L.sol && L.s < 0.85 && !o.sinSol) {
    const [sx, sy0, sr] = L.solXY, sy = sy0 + yh, k0 = 1 - L.s / 0.85, R2 = sr + 16;
    for (let y = Math.max(0, sy - R2); y <= Math.min(H - 1, sy + R2); y++) for (let x = sx - R2; x <= sx + R2; x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const k = (1 - (d - sr) / (R2 - sr)) * k0; if (a_mU(x, y) < k * k) B[y * 320 + x] = a_mMezcla(B[y * 320 + x], L.sol, 0.55); }
    if (k0 > 0.3) { R.disco(sx, sy, sr + 1, a_mMezcla(L.sol, P[3], 0.4)); R.disco(sx, sy, sr, L.sol); R.disco(sx - 1, sy - 1, Math.max(1, sr - 2), hex('#fffdf4')); }
  }
  a_mNubes(R, t, hor, L, o);
}

// baja la nube poco a poco según se acerca a la esquina de Atom (x ≥ 278: su borde de arriba por debajo de y 50) o a
// la barra del año (x ≤ 170: por debajo de y 23), sin saltos: la que no cabe se hunde tras el horizonte y el mar la tapa
function a_mApartaNube(cx, cy, w, ap, yh) {
  const alto = Math.ceil(0.6 * w * ap), kA = a_mLim((cx + w * 0.5 - 238) / 40), kY = a_mLim((210 - (cx - w * 0.5)) / 40);
  let y = cy; const nA = 50 + alto + yh, nY = 23 + alto + yh;
  if (nA > y) y += (nA - y) * kA; if (nY > y) y = Math.max(y, cy + (nY - cy) * kY);
  return Math.round(y);
}

// un cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana
function a_mNube(R, cx, cy, w, sem, c, ap = 1) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)) * ap; bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.66), c[2]);
  const y0 = Math.round(cy + w * 0.08 * ap); R.rect(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0 + 1, c[0]);
}

// las nubes hasta hor en tres capas (lejos: pequeñas, lentas y desvaídas; cerca: grandes y rápidas) y, con tormenta,
// más nubes, más oscuras y más deprisa, con jirones bajos; se apartan de la barra del año y de la esquina de Atom
function a_mNubes(R, t, hor, L, o = {}) {
  const s = L.s, yh = o.yh ?? 0, lejos = L.nube.map((c) => a_mMezcla(c, L.cielo[4], 0.5)), medio = L.nube.map((c) => a_mMezcla(c, L.cielo[3], 0.22)), vv = 1 + s * 3.5;
  const n = 9 + Math.round(s * 9);
  for (let k = 0; k < n; k++) {
    const capa = k % 3, w = [16, 26, 40][capa] + h(k, 3, 631) * [10, 14, 22][capa] + s * [6, 16, 30][capa], v = [0.8, 1.9, 3.4][capa] * vv, span = 360 + w * 2;
    const cx = (((h(k, 4, 631) * span + t * v) % span) + span) % span - w - 20;
    const fr = [0.7 + 0.18 * h(k, 5, 631), 0.42 + 0.2 * h(k, 5, 631), 0.14 + 0.3 * h(k, 5, 631)][capa];
    let cy = Math.round(24 + fr * (hor - 34)) + yh;
    const ap = capa === 0 ? 0.8 : 1; cy = a_mApartaNube(cx, cy, w, ap, yh);
    a_mNube(R, Math.round(cx), Math.round(cy), Math.round(w), k + 3, capa === 0 ? lejos : capa === 1 ? medio : L.nube, capa === 0 ? 0.8 : 1);
  }
  // los jirones bajos de la tormenta, que corren deprisa por delante
  if (s > 0.3) { const jc = [a_mMezcla(L.nube[0], L.cielo[1], 0.2), a_mMezcla(L.nube[0], L.nube[1], 0.4), L.nube[1]];
    for (let k = 0; k < 5; k++) { const w = 50 + h(k, 6, 632) * 40, span = 320 + w * 2, cx = (((h(k, 7, 632) * span + t * 14 * s) % span) + span) % span - w, cy = Math.round(hor * (0.45 + 0.35 * h(k, 8, 632))) + yh;
      a_mNube(R, Math.round(cx), a_mApartaNube(cx, cy, w, 0.42, yh), Math.round(w), k + 40, jc, 0.42); } }
}

// una gaviota en vuelo (alas que baten) en (x, y); lejos: tres puntos
function a_mGaviota(R, x, y, t, k, lejos = false) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * (lejos ? 7 : 9) + k * 2.1), d = a > 0.3 ? -2 : a < -0.3 ? 1 : 0, P = a_mP;
  if (lejos) { R.pset(x, y, P.gaviotaS); R.pset(x - 1, y + Math.sign(d), P.gaviotaD); R.pset(x + 1, y + Math.sign(d), P.gaviotaD); return; }
  R.linea(x - 1, y, x - 4, y + d, P.gaviotaS); R.linea(x + 1, y, x + 4, y + d, P.gaviotaS); R.pset(x - 4, y + d, P.gaviotaD); R.pset(x + 4, y + d, P.gaviotaD);
  R.rect(x - 1, y, x + 1, y, P.gaviota); R.pset(x, y + 1, P.gaviota); R.pset(x + 2, y, P.pico);
}

// n gaviotas que cruzan la zona [x0, y0, x1, y1] dando vueltas (no entran en la esquina de Atom ni en la barra del año)
function a_mGaviotas(R, t, zona, n, sem = 0) {
  const [x0, y0, x1, y1] = zona, W = x1 - x0 + 40;
  for (let k = 0; k < n; k++) { const v = (5 + h(k, sem, 641) * 7) * (k % 2 ? 1 : -1), x = x0 - 20 + ((((h(k, sem + 1, 641) * W + t * v) % W) + W) % W), y = y0 + h(k, sem + 2, 641) * (y1 - y0) + Math.sin(t * 0.9 + k * 1.7) * 4;
    if ((x > 266 && y < 50) || (x < 180 && y < 24)) continue; a_mGaviota(R, x, y, t, k + sem, k % 3 === 2); }
}

// una gaviota posada que mueve la cabeza y, a ratos, da un saltito
function a_mGaviotaPosada(R, x, y, t, dir = 1, k = 0) {
  const P = a_mPv, salto = (t * 0.4 + k) % 5 < 0.25 ? 2 : 0; y = Math.round(y - salto); x = Math.round(x); const F = (i) => x + dir * i, cab = Math.sin(t * 1.3 + k) > 0.5 ? 1 : 0;
  R.pset(F(-1), y, P.pico); R.pset(F(1), y, P.pico);
  R.rect(Math.min(F(-3), F(2)), y - 4, Math.max(F(-3), F(2)), y - 1, P.gaviota); R.rect(Math.min(F(-4), F(-1)), y - 4, Math.max(F(-4), F(-1)), y - 3, P.gaviotaS);
  R.pset(F(-5), y - 4, P.gaviotaD); R.pset(F(-4), y - 2, P.gaviotaD); R.pset(F(2), y - 1, P.gaviotaS);
  const hx = F(2 + cab); R.rect(Math.min(hx, hx + dir), y - 7, Math.max(hx, hx + dir), y - 5, P.gaviota); R.pset(hx + dir, y - 6, P.negro); R.pset(hx + 2 * dir, y - 5, P.pico);
}

// la información del agua de un encuadre (máscara de dónde hay mar bajo el fijo, la primera fila de agua de cada
// columna para los reflejos y la espuma, y cuánto turquesa lleva cada píxel)
function a_mAguaInfo(R, clave, fijo, hor, tq) {
  let m = a_mCACHE.get(R); if (!m) a_mCACHE.set(R, (m = new Map()));
  let A = m.get('agua|' + clave); if (A) return A;
  const mk = new Uint8Array(57600), eje = new Int16Array(320), q = tq ? new Float32Array(57600) : null;
  for (let x = 0; x < 320; x++) { eje[x] = -1; for (let y = hor; y < 180; y++) { const i = y * 320 + x; if (!fijo || !fijo[i]) { mk[i] = 1; if (eje[x] < 0) eje[x] = y; if (q) q[i] = tq(x, y); } } }
  A = { m: mk, eje, q, hor }; m.set('agua|' + clave, A); return A;
}

// el mar: tres tonos tramados (más hondo cerca), olas que corren (más altas y con borreguitos con tormenta), los brillos
// y la estela del sol, el reflejo ondulado de lo pintado encima de cada columna (los acantilados en la cala), el turquesa
// de la cala y la espuma al pie de las rocas. Una pasada por las filas de agua
function a_mAgua(R, t, L, A, o = {}) {
  const B = R.buf, [aS, a, aL, br] = L.agua, s = L.s, hor = A.hor, dy = o.dy ?? 0, ola = 1 + s * 1.6, refl = o.refl ?? 0.4, solX = L.sol && s < 0.7 ? L.solXY[0] : -999;
  const c0 = L.cala[0], c1 = L.cala[1], tsol = 1 - s / 0.7;
  for (let y = hor; y < (o.y1 ?? 180); y++) { const f = (y - hor) / Math.max(1, 180 - hor), r = y * 320, ph1 = h(3, y, 655) * 6.283, ph2 = h(5, y, 655) * 6.283, kx = 0.24 - f * 0.12;
    for (let x = 0; x < 320; x++) { const i = r + x; if (!A.m[i]) continue;
      const w = Math.sin(x * kx + t * 1.6 * ola + ph1) + 0.85 * Math.sin(x * 0.05 - t * 0.7 * ola + ph2) + s * 0.5 * Math.sin(x * 0.11 + y * 0.6 - t * 3);
      let c = a_mU(x, y) < f * 0.85 ? aS : a_mU(x + 1, y + 2) < 0.3 - f * 0.3 ? aL : a;
      if (A.q) { const q = A.q[i]; if (q > 0) c = a_mU(x + 2, y + 1) < q ? (a_mU(x, y + 3) < q - 0.45 ? c1 : c0) : c; }
      const e = A.eje[x], d = y - e;
      if (refl > 0 && e >= 0) { const yr = e - d - 1 + dy + Math.round(Math.sin(y * 0.9 + t * 2.3) * 0.6), xr = Math.min(319, Math.max(0, x + Math.round(Math.sin(y * 0.7 + t * 2.1) * (1 + f * 2) * ola)));
        if (yr >= 0 && yr < e) { const k = (e > hor + 1 ? refl : refl * 0.5) * (1 - Math.min(1, d / 40)); if (k > 0.04) c = a_mMezcla(c, B[yr * 320 + xr], k); } }
      // la espuma al pie de las rocas
      if (e > hor && d < 3 && Math.sin(t * 1.4 + x * 0.33 + h(x >> 2, 1, 656) * 6) > d * 0.5 - 0.3) c = d === 0 || (x + y) & 1 ? br : aL;
      if (w > 1.42 + (1 - f) * 0.2 - s * 0.55) c = w > 1.76 - s * 0.5 && (x + y) & 1 ? br : aL; else if (w < -1.45 + s * 0.3) c = a_mMezcla(c, aS, 0.6);
      // los borreguitos de la tormenta
      if (s > 0.25 && h((x + Math.floor(t * (6 + f * 10))) >> 3, y >> 1, 657) > 1.02 - 0.09 * s * (0.5 + f) && w > 0.4) c = (x & 1) ? br : aL;
      // la estela del sol
      if (Math.abs(x - solX) < 8 + f * 26 + (o.estela ?? 0) && w > 1.0 && tsol > 0 && ((x + y + Math.floor(t * 6)) % 3 === 0)) c = a_mMezcla(c, L.sol, 0.7 * tsol);
      B[i] = c; } }
}

// el reflejo oscuro y roto de un casco bajo su flotación y, de x0 a x1
function a_mReflejo(R, t, x0, x1, y, col, n = 7) {
  const B = R.buf;
  for (let j = 1; j <= n; j++) { const yy = y + j; if (yy > 179 || yy < 0) continue; const dx = Math.round(Math.sin(j * 1.3 + t * 2.2) * (1 + j * 0.3)), k = 0.5 - j * 0.055;
    for (let x = Math.max(0, x0 + dx + j); x <= Math.min(319, x1 + dx - j); x++) if ((x + j * 3 + Math.floor(t * 4)) % 7 !== 0) B[yy * 320 + x] = a_mMezcla(B[yy * 320 + x], col, k); }
}

// la lluvia en diagonal (n trazos); cerca: trazos más largos y claros, por delante de todo
function a_mLluvia(R, t, n, dx, s, cerca = false) {
  const c = cerca ? hex('#c8d4e0') : hex('#9aa8bc'), c2 = cerca ? hex('#8a9aae') : hex('#6a7890');
  for (let k = 0; k < n; k++) { const v = (cerca ? 260 : 170) + h(k, 1, 640) * 90, L = (cerca ? 8 : 4) + Math.round(h(k, 2, 640) * 5), y = ((h(k, 4, 640) * 400 + t * v) % 210) - 15, x = ((((h(k, 3, 640) * 420 + t * v * dx * 0.5 - y * dx * 0.5) % 420) + 420) % 420) - 50;
    if (x > 274 && y < 46) continue; for (let i = 0; i < L; i++) R.pset(Math.round(x - i * dx * 0.5), Math.round(y - i), i < 2 ? c : c2); }
}

// el rayo: cada 5,7 s, un destello doble (0–1); el trazo lo pinta a_mRayo en el cielo
function a_mRayoLuz(t) { const u = t % 5.7 - 0.6; return u < 0 || u > 0.34 ? 0 : u < 0.07 || (u > 0.15 && u < 0.21) ? 1 : 0.4; }

function a_mRayo(R, t, hor, s) {
  if (s <= 0.6 || a_mRayoLuz(t) <= 0) return; const k = Math.floor(t / 5.7), x0 = 190 + h(k, 1, 630) * 70;
  let x = x0, y = 50; const bl = hex('#f4f0ff'), az = hex('#a8b4f0');
  while (y < hor - 2) { const nx = x + (h(k, y, 631) - 0.5) * 10, ny = y + 3 + h(k, y, 632) * 4; R.linea(x, y, nx, ny, bl); R.pset(Math.round(nx) + 1, Math.round(ny), az); x = nx; y = ny; }
}

// el destello del rayo sobre todo el plano (una pasada)
function a_mDestello(R, f) { if (f <= 0.02) return; const B = R.buf, c = hex('#d0d8f4'); for (let i = 0; i < 57600; i++) B[i] = a_mMezcla(B[i], c, 0.3 * f); }

// una pared de caliza entre x0 y x1, de top(x) a base(x): facetas verticales con su lado de luz (el sol viene de la
// derecha), estratos, grietas, oquedades, manchas de óxido, la franja mojada y verdosa del pie y el matorral en lo alto y
// en las repisas; lejos (0–1) la funde con la bruma del color bruma
function a_mCaliza(R, x0, x1, top, base, sem, lejos = 0, bruma = 0) {
  const P = a_mPv, cols = [P.calizaD, C.calizaS, C.caliza, P.calizaL, P.calizaH];
  for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const yt = Math.round(top(x)), yb = Math.round(base(x));
    for (let y = Math.max(0, yt); y <= Math.min(179, yb); y++) {
      const fx = x + Math.round((h(0, y >> 2, sem) - 0.5) * 5), k = Math.floor(fx / 11), u = (fx - k * 11) / 11, lit = h(k, 1, sem);
      let v = 1.2 + lit * 1.4 + (u - 0.5) * 0.9;
      const sy = (y + Math.round(h(k, 2, sem) * 7)) % 8; if (sy === 0) v -= 1.1; else if (sy === 1) v += 0.45;
      if (sy === 0 && h(k, y >> 3, sem + 3) > 0.55) v -= 0.6;
      if (y - yt < 2) v += 0.9;
      v += (h(x, y, sem + 5) - 0.5) * 0.7;
      if (fx - k * 11 === 0 && h(k, y >> 3, sem + 4) > 0.35) v -= 1.4;
      if (h(x >> 1, y >> 1, sem + 9) > 0.965) v -= 1.6;
      let c = cols[Math.max(0, Math.min(4, Math.floor(v + a_mU(x, y) * 0.8 - 0.4)))];
      if (h(k, 4, sem) > 0.72 && u < 0.35 && y - yt > 4 && a_mU(x, y) < 0.6) c = a_mMezcla(c, P.calizaO, 0.55);
      if (yb - y < 3) c = a_mMezcla(c, yb - y < 1 ? P.algas : P.calizaD, 0.6);
      if (lejos > 0) c = a_mMezcla(c, bruma, lejos);
      R.pset(x, y, c);
    }
    // el matorral: en lo alto y en algunas repisas
    if (h(x >> 2, 7, sem) > 0.45 && (x & 1)) { const yy = yt + 1 + Math.round(h(x, 8, sem) * 2), cm = lejos ? [P.mataS, P.mata, P.mataL].map((cc) => a_mMezcla(cc, bruma, lejos)) : [P.mataS, P.mata, P.mataL];
      R.pset(x, yy, cm[0]); R.pset(x, yy - 1, cm[1]); if (h(x, 9, sem) > 0.5) { R.pset(x - 1, yy - 1, cm[2]); R.pset(x + 1, yy, cm[1]); R.pset(x, yy - 2, cm[2]); } }
    if (h(x >> 3, 10, sem) > 0.8) for (let y = yt + 10; y < yb - 8; y += 8 + Math.round(h(x >> 3, y, sem) * 8)) if (h(x >> 1, y, sem + 11) > 0.55) { R.pset(x, y, P.mataS); R.pset(x, y - 1, lejos ? a_mMezcla(P.mata, bruma, lejos) : P.mata); }
  }
}

const a_mCAL = { X: 106, Y: 150, L: 190 };

const a_mCalaTop = (x) => { const P = [[0, 40], [24, 35], [48, 38], [70, 44], [96, 52], [124, 66], [150, 80], [170, 90], [184, 97]]; for (let i = 0; i + 1 < P.length; i++) if (x <= P[i + 1][0]) { const u = (x - P[i][0]) / (P[i + 1][0] - P[i][0]); return P[i][1] + (P[i + 1][1] - P[i][1]) * u + Math.sin(x * 0.4) * 1.2 + (h(x >> 2, 0, 71) - 0.5) * 2.5; } return 99; };

const a_mCalaBase = (x) => (x < 44 ? 132 - x * 0.4 : x < 64 ? 114 : x < 116 ? 103 : x < 150 ? 108 + (x - 116) * 0.08 : 111) + Math.round((h(x >> 3, 1, 72) - 0.5) * 3);

// el fijo de la cala: Creta y el islote en el horizonte, los acantilados, las cuevas, la playita de cantos con la
// choza, la capilla y las rocas del pie
function a_mCalaFijo(R) {
  const P = a_mPv, hor = 96;
  // Creta, difuminada, y un islote
  for (let x = 186; x < 270; x++) { const u = (x - 186) / 84, hh = Math.round(Math.sin(u * Math.PI) * 5 + Math.sin(u * 9) * 1.2 + 1); for (let y = hor - hh; y < hor; y++) R.pset(x, y, y === hor - hh ? P.creta2 : (a_mU(x, y) < 0.3 ? P.creta2 : P.creta)); }
  for (let x = 290; x < 320; x++) { const hh = Math.round(3 + Math.sin((x - 290) * 0.2) * 2); for (let y = hor - hh; y < hor; y++) R.pset(x, y, y === hor - hh ? hex('#a0a898') : hex('#7e8478')); }
  // los acantilados: el fondo de la cala más lejos (más bruma) y la punta de delante
  a_mCaliza(R, 0, 186, a_mCalaTop, a_mCalaBase, 31, 0, 0);
  // la sombra de la cala (el fondo, metido): un velo azulado en la pared de en medio
  for (let x = 60; x < 120; x++) for (let y = Math.round(a_mCalaTop(x)) + 14; y < a_mCalaBase(x); y++) if (a_mU(x, y) < 0.45) R.pset(x, y, a_mMezcla(R.pget(x, y), hex('#6a7aa0'), 0.35));
  // las cuevas del pie
  for (const [cx, w, hh] of [[20, 12, 9], [134, 9, 6], [166, 6, 4]]) { const yb = a_mCalaBase(cx); for (let j = 0; j < hh; j++) { const m = Math.round(w * 0.5 * Math.sqrt(1 - (j / hh) ** 2)); for (let x = cx - m; x <= cx + m; x++) R.pset(x, yb - j, j === hh - 1 || Math.abs(x - cx) === m ? C.calizaS : hex('#2a2a30')); } }
  // la playita de cantos al fondo de la cala, con la choza de piedra y sus redes tendidas
  for (let x = 66; x < 114; x++) for (let y = 100; y < 104; y++) { const v = h(x, y, 73); R.pset(x, y, v > 0.7 ? P.cantoL : v > 0.3 ? P.canto : P.cantoS); }
  R.rect(92, 93, 104, 100, P.choza); for (let y = 93; y <= 100; y++) for (let x = 92; x <= 104; x++) if ((y % 3 === 0 && (x + y) % 5 === 0) || h(x, y, 74) > 0.85) R.pset(x, y, P.chozaS);
  R.rect(91, 91, 105, 92, hex('#8a6a4a')); R.rect(97, 96, 99, 100, hex('#3a2a20')); R.pset(102, 95, hex('#3a2a20'));
  for (let x = 72; x < 88; x++) { R.pset(x, 96 + Math.round(Math.sin(x * 0.5)), P.cuerdaS); if (x % 2) R.pset(x, 97 + Math.round(Math.sin(x * 0.5)), hex('#6a5a40')); }
  R.linea(71, 94, 71, 100, P.maderaS); R.linea(88, 94, 88, 100, P.maderaS);
  // la barquita varada en la playa
  R.rect(108, 101, 116, 102, P.casco); R.rect(109, 103, 115, 103, P.azulC); R.pset(107, 100, P.maderaS); R.pset(117, 100, P.maderaS);
  // la capillita blanca en lo alto (cúpula azul, campanita) y su sendero
  R.rect(62, 37, 74, 45, P.blanco); R.rect(62, 37, 63, 45, P.blancoS); R.rect(66, 41, 68, 45, hex('#3a4a7a'));
  R.disco(70, 37, 3, hex('#3a6ac0')); R.rect(67, 37, 73, 37, hex('#3a6ac0')); R.pset(69, 34, hex('#7aa0e0')); R.linea(70, 33, 70, 31, P.blanco); R.pset(69, 32, P.blanco); R.pset(71, 32, P.blanco);
  R.rect(61, 46, 75, 46, P.blancoS);
  for (let k = 0; k < 22; k++) { const x = 74 + k * 2, y = Math.round(46 + k * 1.1 + Math.sin(k * 0.8) * 1.5); R.pset(x, y, P.calizaH); }
  // las rocas sueltas al pie, en el agua
  for (const [cx, cy, r] of [[8, 140, 7], [40, 124, 4], [150, 112, 3], [178, 112, 2]]) { R.disco(cx, cy, r, C.calizaS); R.disco(cx - 1, cy - 1, r - 1, C.caliza); R.pset(cx - 1, cy - r + 1, a_mP.calizaH); R.rect(cx - r, cy + 1, cx + r, cy + 2, a_mP.algas); }
}

// el turquesa de la cala: una elipse al pie de los acantilados
const a_mCalaTq = (x, y) => { const d = ((x - 86) / 120) ** 2 + ((y - 104) / 34) ** 2; return d < 1 ? Math.min(1, (1 - d) * 1.5) : 0; };

// dónde está el caíque de la cala: la entrada (o.entra) y el cabeceo de la tormenta
function a_mCalaPos(t, o, s) {
  const en = a_mLim(o.entra ?? 1), u = en * en * (3 - 2 * en);
  return { dx: Math.round(-(1 - u) * 310), dy: Math.round(Math.sin(t * 1.7) * (s * 1.6 + (en < 1 ? 1 : 0))), en };
}

function a_mCala(R, t, o, L) {
  const P = a_mPv, hor = 96, s = L.s, K = a_mClaveL(o, L);
  const fijo = a_mBuf(R, 'cala|' + K, (b) => { a_mCalaFijo(R); a_mTinte(b, L); });
  const A = a_mAguaInfo(R, 'cala', a_mBuf(R, 'cala|dia|0', (b) => a_mCalaFijo(R)), hor, a_mCalaTq);
  a_mCielo(R, t, hor, L);
  a_mRayo(R, t, hor, s);
  a_mVolcarDesde(R, fijo, 0, 0);
  a_mAgua(R, t, L, A, { refl: 0.42 });
  // vida en la isla: dos cabras que pastan en la repisa y el pescador que remienda en la playa
  for (let k = 0; k < 2; k++) { const x = Math.round(118 + k * 12 + Math.sin(t * 0.25 + k * 2) * 5), y = Math.round(a_mCalaTop(x) + 7 + k), d = Math.cos(t * 0.25 + k * 2) > 0 ? 1 : -1, cab = Math.sin(t * 1.1 + k) > 0.2 ? 1 : 0;
    R.rect(x - 2, y - 2, x + 2, y - 1, P.cabra); R.pset(x - 2, y, P.cabraS); R.pset(x + 1, y, P.cabraS); R.pset(x - 1, y, P.cabraS); R.pset(x + 2, y, P.cabraS); R.pset(x + 3 * d, y - 2 + cab, P.cabra); R.pset(x + 3 * d, y - 3 + cab, P.cabraS); R.pset(x - 3 * d, y - 2, P.cabraS); }
  { const x = 84, y = 100, b = Math.sin(t * 3) > 0 ? 1 : 0; R.pset(x, y - 5, P.piel); R.rect(x - 1, y - 4, x + 1, y - 2, hex('#3a4a6a')); R.pset(x + 2, y - 3 - b, P.piel); R.pset(x - 1, y - 1, hex('#2a2a30')); R.pset(x + 1, y - 1, hex('#2a2a30')); R.pset(x, y - 6, hex('#2a2a30')); }
  // gaviotas sobre la cala y una posada en una roca
  a_mGaviotas(R, t, [10, 52, 250, 88], Math.round(6 - s * 4), 0);
  a_mGaviotaPosada(R, 40, 120, t, -1, 2);
  // el caíque: con la entrada y la tormenta se corre y cabecea
  const { dx, dy, en } = a_mCalaPos(t, o, s), X = a_mCAL.X, Y = a_mCAL.Y, Lc = a_mCAL.L, vela = o.vela ?? (en < 1 ? 1 : 0);
  if (dx > -300) {
    a_mReflejo(R, t, X + 8 + dx, X + Lc - 14 + dx, Y + 16 + dy, hex('#1a2a3a'), 8);
    const b = a_mBuf(R, 'calaCaique|' + K + '|' + (vela > 0.5 ? 1 : 0), (bb) => { a_mCaique(R, X, Y, Lc, { vela: vela > 0.5, palo: 70, bomba: 152 }); a_mTinte(bb, L); });
    // el bote a remolque y el cabo del ancla
    const bx = X - 46 + dx + Math.round(Math.sin(t * 0.7) * 2), by = Y + 14 + Math.round(Math.sin(t * 1.3 + 1) * 1);
    R.linea(bx + 32, by - 3, X + 2 + dx, Y - 2 + dy, P.cuerdaS); a_mBotecito(R, bx, by, L);
    a_mVolcarDesde(R, b, dx, dy, 0, Y - 3);
    if (en >= 1) R.linea(X + Lc + 4 + dx, Y - 12 + dy, X + Lc + 18 + dx, Y + 22, P.cuerdaS);
    // la bandera de popa, las esponjas del cabo y la bomba
    a_mBandera(R, X + 2 + dx, Y - 36 + dy, t, 1 + s, -1);
    a_mEsponjas(R, t, X + 6 + dx, Y - 28 + dy, X + 68 + dx, Y - 46 + dy, 7, s);
    const gira = (o.bomba ?? 0) > 0;
    a_mVolante(R, X + 152 + dx, Y - 13 + dy, 8, gira ? t * 3.2 : 0.4);
    if ((o.bomba ?? 0) >= 1 && ELENCO_AK.bomberoAK) { R.actor(ELENCO_AK.bomberoAK, X + 128 + dx, Y + dy, t, { dir: 1, brazos: Math.sin(t * 3.2) > 0 }); R.actor(ELENCO_AK.bomberoAK, X + 161 + dx, Y + dy, t + 0.5, { dir: -1, brazos: Math.sin(t * 3.2) < 0 }); }
    // las burbujas del buzo junto a la manguera
    if (gira || o.burbujas) a_mBurbujas(R, t, X + 156 + dx, Y + 26, 6, L);
    a_mVolcarDesde(R, a_mBuf(R, 'calaBorda|' + K, (bb) => { a_mCaiqueBorda(R, X, Y, Lc); a_mTinte(bb, L); }), dx, dy, 0, 180);
    a_mAguaDelante(R, t, X + dx, X + Lc + dx, Y + 16 + dy, L);
    a_mEscalerilla(R, X + 116 + dx, Y - 3 + dy, Y + 19 + dy);
  }
  return { suelo: Y + dy, libre: [X + 34 + dx, X + 112 + dx], escalera: [X + 119 + dx, Y - 4 + dy], burbujas: [X + 156 + dx, Y + 22], horizonte: hor, bomba: [X + 152 + dx, Y - 13 + dy], palo: X + 70 + dx, dx };
}

// la escalerilla de madera colgada por fuera de la borda, de la regala (x, y0) hasta el agua (y1)
function a_mEscalerilla(R, x, y0, y1) {
  const P = a_mPv; for (const xx of [x, x + 6]) { R.rect(xx, y0 - 2, xx, y1, P.maderaL); R.pset(xx, y0 - 3, P.hierro); }
  for (let y = y0 + 1; y < y1; y += 3) { R.rect(x + 1, y, x + 5, y, P.maderaL); R.rect(x + 1, y + 1, x + 5, y + 1, P.maderaS); }
}

// el borde del agua contra el casco (la ola que lame la flotación) entre x0 y x1 en la fila y
function a_mAguaDelante(R, t, x0, x1, y, L) {
  for (let x = Math.max(0, x0 + 6); x <= Math.min(319, x1 - 10); x++) { const w = Math.sin(x * 0.35 + t * 2.6) + Math.sin(x * 0.13 - t * 1.4); const yy = y + (w > 0.6 ? -1 : 0); R.pset(x, yy, w > 1.2 ? L.agua[3] : L.agua[2]); if (w > 1.5) R.pset(x, yy - 1, L.agua[3]); }
}

// el bote de remos a remolque (x, y: proa a la derecha, y la flotación)
function a_mBotecito(R, x, y, L) {
  const P = a_mPv; R.poligono([[x, y - 5], [x + 30, y - 6], [x + 27, y], [x + 4, y]], (xx, yy) => (yy <= y - 5 ? P.maderaL : yy === y - 4 ? P.azulC : yy >= y - 1 ? P.cascoS : P.casco));
  R.rect(x + 2, y - 6, x + 28, y - 6, P.madera); R.rect(x + 10, y - 7, x + 12, y - 7, P.maderaS); R.rect(x + 19, y - 7, x + 21, y - 7, P.maderaS);
  R.linea(x + 12, y - 8, x + 4, y - 9, P.maderaS); a_mReflejo(R, 0, x + 2, x + 28, y, hex('#1a2a3a'), 3);
}

// la manguera del aire por fuera del casco: baja desde la borda (x, y) hasta el agua (yw), con su vaivén
function a_mMangueraFuera(R, t, x, y, yw, s) {
  const c = hex('#2a2422'), cl = hex('#5a4a40');
  for (let yy = y - 4; yy <= yw + 2; yy++) { const u = (yy - y + 4) / (yw - y + 6), xx = Math.round(x + 2 + u * 4 + Math.sin(t * 1.3 + yy * 0.2) * u * (1 + s)); R.pset(xx, yy, c); R.pset(xx + 1, yy, yy % 3 ? c : cl); }
  R.rect(x - 1, y - 5, x + 2, y - 4, c); R.pset(x, y - 5, cl);
}

// las burbujas del aire del buzo que suben y revientan alrededor de (x, y)
function a_mBurbujas(R, t, x, y, n, L) {
  for (let k = 0; k < n; k++) { const u = ((t * 1.3 + h(k, 1, 660)) % 1), bx = Math.round(x + (h(k, 2, 660) - 0.5) * 14 + Math.sin(t * 3 + k) * 1), by = Math.round(y + 6 - u * 8);
    if (u < 0.8) { R.pset(bx, by, L.agua[3]); if (k % 2) R.pset(bx + 1, by, L.agua[2]); } else { R.pset(bx - 1, by, L.agua[3]); R.pset(bx + 1, by, L.agua[3]); R.pset(bx, by - 1, L.agua[2]); } }
  for (let j = 0; j < 2; j++) { const r = ((t * 3 + j * 1.5) % 3) + 2; for (let a = 0; a < 6.28; a += 0.5) { const xx = Math.round(x + Math.cos(a) * r * 1.6), yy = Math.round(y + 4 + Math.sin(a) * r * 0.4); if (r < 4.5) R.pset(xx, yy, L.agua[2]); } }
}

// los rociones de la proa con mar picada
function a_mRocion(R, t, x, y, s) {
  const k = Math.floor(t / 1.6), u = (t % 1.6) / 0.7; if (u > 1) return;
  for (let i = 0; i < 14 * s; i++) { const a = -0.3 - h(k, i, 670) * 2.4, v = 10 + h(i, k, 671) * 16, px = Math.round(x + Math.cos(a) * v * u), py = Math.round(y + 10 + Math.sin(a) * v * u + u * u * 14); R.pset(px, py, i % 3 ? hex('#e8f4fa') : hex('#a8c8d8')); }
}

// la bandera griega de la época (nueve franjas azules y blancas, la cruz blanca en el cantón azul, sin escudo) que
// ondea desde el asta en (x, y) hacia dir; v, la fuerza del viento
function a_mBandera(R, x, y, t, v = 1, dir = -1, w = 15, alto = 9) {
  const az = hex('#2a5ab0'), azS = hex('#1c3e80'), bl = hex('#f4f4f4'), blS = hex('#c8ccd4');
  R.linea(x, y - 1, x, y + 24, a_mP.maderaS); R.pset(x, y - 2, a_mP.laton);
  for (let i = 0; i < w; i++) { const o = Math.sin(t * 6 * v - i * 0.55), dyy = Math.round(o * (i / w) * 1.6 * v), sombra = o > 0.55;
    for (let j = 0; j < alto; j++) { let c; if (i < 5 && j < 5) c = i === 2 || j === 2 ? bl : az; else c = j % 2 === 0 ? az : bl; if (sombra) c = c === az ? azS : blS; R.pset(x + dir * (i + 1), y + j + dyy, c); } }
}

// las esponjas puestas a secar en un cabo de (x0, y0) a (x1, y1), que se mecen
function a_mEsponjas(R, t, x0, y0, x1, y1, n, s) {
  const P = a_mPv; R.linea(x0, y0, x1, y1, P.cuerdaS);
  for (let k = 1; k <= n; k++) { const u = k / (n + 1), x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 3), sw = Math.round(Math.sin(t * (1.6 + s * 2) + k) * (1 + s * 2)), r = 2 + (k % 2);
    R.linea(x, y, x + sw, y + 2, P.cuerdaS); const cx = x + sw, cy = y + 3 + r; R.disco(cx, cy, r, P.esponjaS); R.disco(cx - 0.5, cy - 0.5, r - 0.6, P.esponja); R.pset(cx, cy, P.esponjaD); R.pset(cx - 1, cy + 1, P.esponjaD); }
}

// el volante de la bomba (hierro, cuatro radios, el manubrio en el canto) en (cx, cy), radio r, girado a
function a_mVolante(R, cx, cy, r, a) {
  const P = a_mPv;
  for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 2; R.linea(cx, cy, Math.round(cx + Math.cos(b) * r), Math.round(cy + Math.sin(b) * r), r < 10 ? hex('#9aa0aa') : P.hierroL); }
  for (let k = 0; k < Math.round(r * 7); k++) { const b = k / (r * 7) * 6.283; R.pset(Math.round(cx + Math.cos(b) * r), Math.round(cy + Math.sin(b) * r), Math.sin(b) < -0.3 ? P.hierroL : P.hierro); }
  R.disco(cx, cy, Math.max(1, r * 0.2), P.laton);
  const mx = Math.round(cx + Math.cos(a) * r), my = Math.round(cy + Math.sin(a) * r); R.rect(mx - 1, my - 1, mx + 1, my + 1, P.maderaL); R.pset(mx + 1, my + 1, P.maderaS);
}

// la subida de la borda hacia la popa y la proa (u 0–1 a lo largo del caíque)
const a_mSubida = (u) => (a_mLim((0.12 - u) / 0.12) ** 2) * 9 + (a_mLim((u - 0.86) / 0.14) ** 2) * 15;

const a_mBordaY = (X, Y, Lc, x) => Y - 3 - a_mSubida((x - X) / Lc);

// EL CAÍQUE DEL CANON de costado (proa a la derecha), todo menos la borda de cerca: X la popa, Y la cubierta donde se
// plantan los pies, Lc la eslora. La borda de lejos por dentro (cuadernas y regala), las tablas de la cubierta, el
// palo con la entena y la vela latina (recogida o hinchada), los obenques y estays, el barril, el cesto de esponjas, los
// rollos de cabo, la caja de la bomba (el volante lo pinta a_mVolante) y el asta de popa. o.palo / o.bomba: dónde van
// (desde la popa) o null
function a_mCaique(R, X, Y, Lc, o = {}) {
  const P = a_mPv;
  for (let x = X + 3; x < X + Lc - 3; x++) { const top = a_mBordaY(X, Y, Lc, x), tap = Math.min(1, (x - X) / 18, (X + Lc - x) / 22), far = Math.round(top - 14 * tap), deck = Math.round(far + 5 * tap);
    for (let y = far; y < top; y++) { let c;
      if (y === far) c = P.maderaL; else if (y === far + 1) c = P.madera;
      else if (y < deck) c = ((x - X) % 9 === 0) ? P.maderaS : (y === deck - 1 ? P.maderaD : (a_mU(x, y) < 0.3 ? P.maderaS : P.madera));
      else { const row = y - deck; c = row % 3 === 0 ? P.junta : ((x + row * 13) % 23 === 0 ? P.junta : (h(x >> 2, y, 81) > 0.8 ? P.tablaS : a_mU(x, y) < 0.15 ? P.tablaL : P.tabla)); }
      R.pset(x, y, c); } }
  const yS = (x) => a_mBordaY(X, Y, Lc, x);
  // la roda y el codaste
  R.linea(X + Lc - 1, yS(X + Lc - 3), X + Lc + 2, yS(X + Lc - 3) - 7, P.maderaS); R.linea(X + Lc, yS(X + Lc - 3), X + Lc + 3, yS(X + Lc - 3) - 7, P.madera);
  R.linea(X + 2, yS(X + 3), X, yS(X + 3) - 5, P.maderaS);
  // el bauprés
  R.linea(X + Lc - 4, yS(X + Lc - 3) - 2, X + Lc + 14, yS(X + Lc - 3) - 6, P.madera);
  // la carga de cubierta, contra la borda de lejos
  const pie = Y - 7;
  // el barril
  R.rect(X + 14, pie - 9, X + 21, pie, P.madera); R.rect(X + 14, pie - 9, X + 15, pie, P.maderaL); R.rect(X + 20, pie - 9, X + 21, pie, P.maderaS); R.rect(X + 14, pie - 7, X + 21, pie - 7, P.hierro); R.rect(X + 14, pie - 2, X + 21, pie - 2, P.hierro); R.rect(X + 15, pie - 10, X + 20, pie - 10, P.maderaD);
  // el cesto de esponjas
  for (let y = pie - 6; y <= pie; y++) for (let x = X + 54; x <= X + 64; x++) R.pset(x, y, (x + y) % 2 ? hex('#b89a5a') : hex('#8a7040'));
  for (let k = 0; k < 4; k++) { R.disco(X + 56 + k * 2.6, pie - 7 - (k % 2), 2, P.esponja); R.pset(X + 56 + k * 2.6, pie - 7, P.esponjaD); }
  // los rollos de cabo
  a_mRollo(R, X + 38, pie, 6, 2); a_mRollo(R, X + 108, pie, 5, 2);
  // la caja de la bomba y la manguera enrollada
  if (o.bomba != null) { const bx = X + o.bomba; R.rect(bx - 6, pie - 7, bx + 6, pie + 1, P.madera); R.rect(bx - 6, pie - 7, bx + 6, pie - 7, P.maderaL); R.rect(bx + 5, pie - 6, bx + 6, pie + 1, P.maderaS); R.rect(bx - 2, pie - 9, bx + 2, pie - 8, P.laton); R.pset(bx, pie - 10, P.latonL);
    for (let k = 0; k < 3; k++) { const r = 5 - k; for (let a = 0; a < 6.28; a += 0.3) R.pset(Math.round(bx - 16 + Math.cos(a) * r), Math.round(pie - 1 + Math.sin(a) * r * 0.35), k === 1 ? hex('#5a4a40') : hex('#2a2422')); } }
  // el palo, con la entena y la vela
  if (o.palo != null) { const mx = X + o.palo, tope = Y - 116;
    if (o.vela) {
      // la vela latina hinchada: triángulo de la entena al puño de escota, con costuras y la luz del viento
      const A0 = [X + 20, Y - 36], A1 = [X + 132, Y - 124], Q = [X + 150, Y - 20];
      R.poligono([A0, A1, Q], (x, y) => { const u = ((x - A0[0]) * 0.6 + (A0[1] - y) * 0.4) / 110, sea = (Math.round(x * 0.78 + y * 0.62) % 9 === 0); return sea ? P.lonaS : (a_mU(x, y) < 0.22 + u * 0.3 ? P.lonaS : P.lona); });
      R.linea(A0[0], A0[1], Q[0], Q[1], P.lonaD); R.linea(A1[0], A1[1], Q[0], Q[1], P.lonaD);
      for (let k = 1; k < 6; k++) { const u = k / 6; R.linea(Math.round(A0[0] + (A1[0] - A0[0]) * u), Math.round(A0[1] + (A1[1] - A0[1]) * u), Math.round(Q[0] - 4 + (A0[0] - Q[0]) * 0.1), Math.round(Q[1]), (x, y, kk) => (kk % 3 ? null : P.lonaM)); }
      R.linea(Q[0], Q[1], X + 120, Y - 10, P.jarcia);
    }
    R.rect(mx - 1, tope, mx + 1, Y - 10, P.madera); R.linea(mx - 1, tope, mx - 1, Y - 10, P.maderaL); R.linea(mx + 1, tope, mx + 1, Y - 10, P.maderaS); R.rect(mx - 2, tope - 2, mx + 2, tope, P.maderaS);
    R.rect(mx - 3, Y - 12, mx + 3, Y - 9, P.maderaS); R.pset(mx - 3, Y - 12, P.maderaL);
    for (const yy of [Y - 26, Y - 22]) { R.pset(mx - 3, yy, P.maderaL); R.pset(mx + 3, yy, P.maderaL); }
    // la entena con la vela recogida (un rollo de lona atado) o desnuda
    R.linea(X + 20, Y - 36, X + 132, Y - 124, P.maderaS); R.linea(X + 21, Y - 36, X + 133, Y - 124, P.madera);
    if (!o.vela) for (let k = 0; k < 100; k++) { const u = k / 100, x = Math.round(X + 22 + 108 * u), y = Math.round(Y - 34 - 88 * u), g = 2 + Math.round(Math.sin(u * Math.PI) * 2);
      for (let j = 0; j < g; j++) R.pset(x + j, y + j, j === 0 ? P.lona : j === g - 1 ? P.lonaD : (k % 11 === 0 ? P.cuerdaS : P.lonaS)); }
    // la driza, los obenques y los estays
    R.linea(mx, tope + 1, mx, Y - 75, P.jarcia); R.linea(mx, tope, X + Lc + 12, yS(X + Lc - 3) - 5, P.jarcia); R.linea(mx, tope, X + 3, Y - 18, P.jarcia);
    R.linea(mx, tope + 4, mx - 8, Y - 13, P.jarcia); R.linea(mx, tope + 4, mx + 8, Y - 13, P.jarcia);
  }
  // el asta de popa (la bandera la pinta a_mBandera)
  R.linea(X + 2, Y - 12, X + 2, Y - 36, P.maderaS);
}

// LA BORDA DE CERCA del caíque (lo que tapa los pies de los personajes): la regala de madera, el casco blanco con la
// franja azul y la roja, las tracas, la curva de los extremos y la flotación oscura (Y + 16)
function a_mCaiqueBorda(R, X, Y, Lc) {
  const P = a_mPv, Yw = Y + 16;
  for (let x = X; x <= X + Lc; x++) { const top = Math.round(a_mBordaY(X, Y, Lc, x)), sx = top + (x - X) / 14 * (Yw - top), bx = top + (X + Lc - x) / 20 * (Yw - top), bot = Math.min(Yw, sx, bx), fin = Math.min(1, (x - X) / 24, (X + Lc - x) / 24);
    for (let y = top; y <= bot; y++) { const d = y - top; let c;
      if (d === 0) c = P.maderaL; else if (d === 1) c = P.madera; else if (d === 2) c = P.maderaS;
      else if (d === 4 || d === 5) c = d === 4 ? P.azulCL : P.azulC; else if (d === 6) c = P.rojoC;
      else if (y >= Yw - 1) c = P.obra;
      else { const v = (y - top - 7) / Math.max(1, Yw - top - 7); c = (d - 7) % 3 === 2 && h(x >> 3, d, 82) > 0.2 ? P.cascoS : (a_mU(x, y) < v * 0.75 + (1 - fin) * 0.4 ? (a_mU(x + 2, y) < v * 0.3 ? P.cascoD : P.cascoS) : P.casco); }
      R.pset(x, y, c); } }
  // los toletes y las cornamusas de la regala
  for (let x = X + 30; x < X + Lc - 20; x += 26) { const y = Math.round(a_mBordaY(X, Y, Lc, x)); R.pset(x, y - 1, P.maderaS); R.pset(x + 1, y - 1, P.maderaS); }
}

// un rollo de cabo en el suelo (x, y su base), radio r y aplastado a
function a_mRollo(R, x, y, r, a) {
  const P = a_mPv; for (let k = 0; k < 3; k++) { const rr = r - k * 1.3; for (let b = 0; b < 6.28; b += 0.18) R.pset(Math.round(x + Math.cos(b) * rr), Math.round(y - a + Math.sin(b) * rr * a / r - k * 0.5), Math.sin(b) < 0 ? P.cuerda : P.cuerdaS); }
  R.pset(x, y - a, P.cuerdaS);
}

// un balde de madera con su esponja que gotea (x el centro, y la base)
function a_mBalde(R, x, y, t) {
  const P = a_mPv; R.poligono([[x - 9, y - 14], [x + 9, y - 14], [x + 7, y], [x - 7, y]], (xx, yy) => (yy === y - 9 || yy === y - 3 ? P.hierro : xx < x - 5 ? P.maderaL : xx > x + 5 ? P.maderaS : P.madera));
  R.rect(x - 9, y - 15, x + 9, y - 14, P.maderaD); R.rect(x - 8, y - 15, x + 8, y - 15, hex('#2a4a5a')); R.disco(x + 2, y - 17, 4, P.esponjaS); R.disco(x + 1, y - 18, 3, P.esponja); R.pset(x + 2, y - 17, P.esponjaD); R.pset(x, y - 19, P.esponjaD);
  const u = (t * 1.2) % 1; R.pset(x - 9, Math.round(y - 12 + u * 12), P.gota);
}

function a_mCubiertaFijo(R) {
  const P = a_mPv;
  // la borda por dentro: la regala (más alta hacia la proa, a la derecha), las tablas y las cuadernas
  for (let x = 0; x < 320; x++) { const tope = Math.round(100 - x * 0.03);
    for (let y = tope; y < 124; y++) { let c; const d = y - tope;
      if (d < 2) c = d === 0 ? P.maderaL : P.madera; else if (d === 2) c = P.maderaD; else if (d < 5) c = hex('#4a7a7a');
      else { const fr = x % 30; c = fr < 4 ? (fr === 0 ? P.maderaL : fr === 3 ? P.maderaD : P.madera) : ((d - 5) % 5 === 4 ? P.maderaD : h(x >> 3, (d - 5) / 5 | 0, 91) > 0.7 ? P.maderaS : a_mU(x, y) < 0.2 ? P.maderaL : P.madera); if (fr >= 4 && y > 118) c = a_mMezcla(c, P.maderaD, 0.4); }
      R.pset(x, y, c); }
    // los imbornales
    if (x % 60 === 40) R.rect(x, 121, x + 5, 123, P.maderaD);
  }
  // las tablas de la cubierta, cada vez más anchas hacia delante, con sus juntas, testas y clavos
  let y = 124, k = 0; while (y < 180) { const ancho = 3 + Math.round(k * 0.28), off = (k * 47) % 61; for (let yy = y; yy < Math.min(180, y + ancho); yy++) for (let x = 0; x < 320; x++) { const xb = (x + off) % 61, veta = Math.sin(x * 0.09 + k * 2.3 + (yy - y) * 1.7) > 0.86 && h(x >> 4, k, 96) > 0.3;
      let c = yy === y ? P.junta : (xb === 0 ? P.junta : veta ? P.tablaS : h(x >> 3, k, 92) > 0.84 ? P.tablaS : h(x >> 2, k, 93) > 0.9 ? P.tablaL : yy === y + 1 ? (a_mU(x, yy) < 0.5 ? P.tablaL : P.tabla) : a_mU(x, yy) < 0.1 ? P.tablaL : P.tabla);
      if (yy === y + (ancho >> 1) && (xb === 3 || xb === 58)) c = P.maderaD; R.pset(x, yy, c); } y += ancho; k++; }
  // la sombra de la borda en la cubierta y unas manchas de agua
  for (let x = 0; x < 320; x++) for (let yy = 124; yy < 128; yy++) if (a_mU(x, yy) < 0.6 - (yy - 124) * 0.15) R.pset(x, yy, a_mMezcla(R.pget(x, yy), P.maderaD, 0.45));
  for (const [cx, cy, rx] of [[150, 150, 14], [236, 166, 10], [40, 170, 12]]) for (let yy = -3; yy <= 3; yy++) for (let x = -rx; x <= rx; x++) if ((x / rx) ** 2 + (yy / 3) ** 2 < 1 && a_mU(cx + x, cy + yy) < 0.5) R.pset(cx + x, cy + yy, a_mMezcla(R.pget(cx + x, cy + yy), P.tablaS, 0.6));
  // las redes con sus corchos sobre la borda
  for (let x = 128; x < 196; x++) { const caida = 10 + Math.round(Math.sin((x - 128) / 68 * Math.PI) * 10); for (let yy = 98; yy < 98 + caida; yy++) if ((x + yy) % 4 === 0 || (x - yy + 400) % 4 === 0) R.pset(x, yy, (yy & 1) ? hex('#a8844a') : hex('#7a5e34')); }
  for (let x = 130; x < 196; x += 7) { R.rect(x, 98, x + 2, 99, hex('#d8b878')); R.pset(x + 2, 99, hex('#a88a50')); }
  // el palo con su fogonadura, las cabillas y los cabos adujados
  R.rect(202, 0, 209, 150, P.madera); R.rect(202, 0, 203, 150, P.maderaL); R.rect(208, 0, 209, 150, P.maderaS); for (let yy = 4; yy < 150; yy += 9) R.pset(205 + (yy % 2), yy, P.maderaS);
  R.rect(198, 146, 213, 152, P.maderaS); R.rect(198, 146, 213, 146, P.maderaL); R.rect(196, 150, 215, 153, P.maderaD);
  R.rect(194, 112, 217, 114, P.maderaS); R.rect(194, 112, 217, 112, P.maderaL); for (const x of [196, 200, 212, 216]) { R.rect(x, 108, x, 117, P.maderaL); R.pset(x, 108, P.maderaS); }
  for (const x of [196, 216]) for (let j = 0; j < 9; j++) R.linea(x - 2, 114 + j, x + 2, 114 + j, j % 2 ? P.cuerda : P.cuerdaS);
  R.linea(209, 30, 320, 70, P.jarcia); R.linea(203, 20, 140, 100, P.jarcia);
  // los cestos junto al palo y la jarra de barro
  for (const [x0, w, hh, lleno] of [[222, 16, 13, 1], [240, 12, 9, 0]]) { for (let yy = 150 - hh; yy <= 150; yy++) for (let x = x0; x < x0 + w; x++) R.pset(x, yy, (x + yy) % 2 ? hex('#b89a5a') : (yy % 3 ? hex('#9a7c44') : hex('#7a6034'))); R.rect(x0 - 1, 150 - hh - 1, x0 + w, 150 - hh, hex('#6a5030'));
    if (lleno) for (let k = 0; k < 5; k++) { R.disco(x0 + 3 + k * 2.6, 150 - hh - 2 - (k % 2), 2.4, P.esponja); R.pset(x0 + 3 + k * 2.6, 150 - hh - 2, P.esponjaD); } }
  R.disco(126, 140, 5, P.barro); R.disco(125, 139, 4, P.barroL); R.rect(123, 131, 129, 135, P.barro); R.rect(122, 130, 130, 131, P.barroS); R.rect(121, 145, 131, 146, P.barroS); R.pset(124, 138, hex('#f0b080'));
  // el casco de cobre de repuesto sobre un cajón
  R.rect(156, 136, 182, 150, P.madera); R.rect(156, 136, 182, 137, P.maderaL); R.rect(181, 137, 182, 150, P.maderaS); R.rect(160, 140, 178, 140, P.maderaS); R.rect(160, 145, 178, 145, P.maderaS);
  R.disco(169, 128, 8, P.cobreS); R.disco(168, 127, 7.5, P.cobre); R.disco(166, 124, 3, P.cobreL); R.rect(161, 134, 177, 136, P.laton); R.rect(161, 136, 177, 136, P.latonS);
  R.disco(169, 129, 3, P.laton); R.disco(169, 129, 2, P.vidrio); R.pset(168, 128, P.vidrioL); for (const [x, y] of [[162, 126], [176, 126], [169, 120]]) { R.disco(x, y, 1.5, P.laton); R.pset(x, y, P.vidrio); }
  // la caja de la bomba (el volante y el manómetro van aparte, se mueven)
  R.rect(72, 116, 110, 150, P.madera); R.rect(72, 116, 110, 118, P.maderaL); R.rect(108, 118, 110, 150, P.maderaS); R.rect(72, 148, 110, 150, P.maderaD);
  for (let yy = 122; yy < 148; yy += 6) R.rect(73, yy, 107, yy, P.maderaS);
  for (const [x, y] of [[74, 119], [106, 119], [74, 146], [106, 146]]) { R.pset(x, y, P.laton); }
  R.rect(84, 112, 98, 116, P.latonS); R.rect(84, 112, 98, 112, P.latonL);
  // la manguera: sale de la bomba, se enrolla en el suelo y va hasta la escalerilla
  const hc = hex('#2a2422'), hl = hex('#5a4a40');
  for (let k = 0; k < 4; k++) { const r = 18 - k * 4; for (let a = 0; a < 6.28; a += 0.05) { const x = Math.round(150 + Math.cos(a) * r), yy = Math.round(168 + Math.sin(a) * r * 0.28); R.pset(x, yy, Math.sin(a) < 0 ? hl : hc); R.pset(x, yy + 1, hc); } }
  R.linea(110, 140, 130, 166, hc); R.linea(111, 140, 131, 166, hl);
  for (let x = 168; x < 262; x++) { const yy = Math.round(168 - (x - 168) * 0.42 + Math.sin(x * 0.1) * 1.5); R.pset(x, yy, hc); R.pset(x, yy - 1, x % 3 ? hl : hc); }
  // la escalerilla colgada de la borda
  for (const x of [261, 277]) { R.rect(x, 70, x + 1, 100, P.maderaL); R.rect(x + 1, 70, x + 1, 100, P.madera); R.rect(x - 1, 99, x + 2, 101, P.hierro); R.rect(x - 1, 68, x + 1, 70, P.hierro); R.pset(x - 2, 70, P.hierro); }
  for (let yy = 74; yy < 98; yy += 5) { R.rect(263, yy, 276, yy, P.maderaL); R.rect(263, yy + 1, 276, yy + 1, P.maderaS); }
}

function a_mCubierta(R, t, o, L) {
  const P = a_mPv, s = L.s, K = a_mClaveL(o, L), osc = Math.round(Math.sin(t * 0.9) * (1.5 + s * 4)), hor = 74 + osc;
  const fijo = a_mBuf(R, 'cub|' + K, (b) => { a_mCubiertaFijo(R); a_mTinte(b, L); });
  a_mCielo(R, t, 100, L, { yh: osc });
  a_mRayo(R, t, hor, s);
  // la isla a lo lejos, a la izquierda, que sube y baja con el balanceo
  const isla = a_mBuf(R, 'cubIsla|' + K, (b) => { a_mCaliza(R, 0, 130, (x) => 52 + x * 0.12 + Math.sin(x * 0.3) * 1.5 + (x > 100 ? (x - 100) * 0.5 : 0), () => 74, 41, 0.45, hex('#9ab0c8')); R.disco(40, 52, 2, P.blanco); R.rect(38, 52, 42, 55, P.blanco); a_mTinte(b, L); });
  a_mVolcarDesde(R, isla, 0, osc, 40, 75);
  const A = a_mAguaInfo(R, 'cub|' + osc, null, Math.max(0, hor), null);
  a_mAgua(R, t, L, A, { refl: 0.2, y1: 104 });
  // un caíque vecino a lo lejos y gaviotas
  { const x = Math.round(230 + Math.sin(t * 0.1) * 6), y = hor + 6; R.rect(x, y - 2, x + 16, y, P.casco); R.rect(x + 1, y, x + 15, y, P.azulC); R.linea(x + 7, y - 2, x + 7, y - 14, P.maderaS); R.poligono([[x + 8, y - 13], [x + 15, y - 3], [x + 8, y - 3]], P.lona); }
  a_mGaviotas(R, t, [10, 30, 250, 70], Math.round(5 - s * 3), 4);
  a_mVolcarDesde(R, fijo, 0, 0);
  // las esponjas del cabo que va del palo a proa y la gaviota posada en la regala
  a_mEsponjas(R, t, 0, 66, 201, 54, 10, s);
  a_mGaviotaPosada(R, 240, 99, t, -1, 1);
  // el volante (gira con o.bomba) y el manómetro con la aguja que tiembla
  const gira = (o.bomba ?? 0) > 0, ang = gira ? t * 3.2 : 0.6;
  a_mVolante(R, 90, 136, 14, ang + 0.35); a_mVolante(R, 91, 134, 14, ang);
  R.disco(91, 106, 5, P.latonS); R.disco(91, 106, 4, P.blanco); R.pset(91, 102, P.negro); R.pset(87, 106, P.negro); R.pset(95, 106, P.negro);
  const ag = -2.4 + (gira ? 1.6 + Math.sin(t * 6.4) * 0.15 : 0.1); R.linea(91, 106, Math.round(91 + Math.cos(ag) * 3), Math.round(106 + Math.sin(ag) * 3), hex('#c02a2a')); R.pset(91, 106, P.negro); R.rect(90, 111, 92, 112, P.laton);
  if ((o.bomba ?? 0) >= 1 && ELENCO_AK.bomberoAK) { R.actor(ELENCO_AK.bomberoAK, 58, 158, t, { dir: 1, brazos: Math.sin(t * 3.2) > 0 }); R.actor(ELENCO_AK.bomberoAK, 108, 158, t + 0.5, { dir: -1, brazos: Math.sin(t * 3.2) < 0 }); }
  // las gotas que caen de la escalerilla
  for (let k = 0; k < 2; k++) { const u = (t * 1.1 + k * 0.5) % 1; R.pset(264 + k * 12, Math.round(100 + u * 20), P.gota); }
  return { suelo: 158, libre: [20, 250], escalera: [269, 98], bomba: [91, 135], horizonte: hor };
}

const a_mRES = { X: -60, Y: 152, L: 312 };

// EL VAPOR DE LA MARINA GRIEGA de costado (proa a la derecha): X la popa, Yw la flotación
function a_mVapor(R, X, Yw) {
  const P = a_mPv, D = Yw - 18;
  // los palos y la jarcia, detrás de todo
  for (const [mx, tope] of [[X + 32, Yw - 86], [X + 160, Yw - 80]]) { R.rect(mx - 1, tope, mx, D, P.grisD); R.pset(mx - 1, tope, P.grisL); R.rect(mx - 4, tope + 10, mx + 3, tope + 10, P.grisD); R.linea(mx, tope, mx - 18, D, P.jarcia); R.linea(mx, tope, mx + 16, D, P.jarcia); R.linea(mx, tope + 10, mx - 10, D, P.jarcia); }
  R.linea(X + 32, Yw - 86, X + 160, Yw - 80, P.jarcia); R.linea(X + 160, Yw - 80, X + 196, D - 4, P.jarcia); R.linea(X + 32, Yw - 86, X + 2, D - 18, P.jarcia);
  // la chimenea, con su franja negra arriba y el sombreado de cilindro
  for (let y = Yw - 66; y < D - 10; y++) for (let x = X + 92; x <= X + 103; x++) { const u = (x - X - 92) / 11; R.pset(x, y, y < Yw - 61 ? (u < 0.3 ? P.grisD : P.negro) : u < 0.2 ? P.grisL : u > 0.75 ? P.grisS : a_mU(x, y) < 0.2 ? P.grisL : P.gris); }
  R.rect(X + 91, Yw - 67, X + 104, Yw - 66, P.grisD); R.rect(X + 92, Yw - 52, X + 103, Yw - 51, P.grisS);
  // los manguerotes
  for (const x of [X + 80, X + 114]) { R.rect(x, D - 20, x + 2, D - 10, P.blancoS); R.disco(x + 2, D - 21, 3, P.blanco); R.disco(x + 3, D - 21, 1.6, P.rojoV); }
  // la caseta, el puente y su toldo
  R.rect(X + 60, D - 12, X + 132, D, P.blanco); R.rect(X + 60, D - 12, X + 132, D - 12, P.blancoS); R.rect(X + 60, D - 1, X + 132, D, P.blancoS);
  for (let x = X + 64; x < X + 130; x += 8) { R.rect(x, D - 9, x + 3, D - 6, P.vidrio); R.pset(x, D - 9, P.vidrioL); }
  R.rect(X + 120, D - 24, X + 142, D - 12, P.blanco); R.rect(X + 140, D - 24, X + 142, D - 12, P.blancoS); for (let x = X + 122; x < X + 140; x += 5) { R.rect(x, D - 21, x + 3, D - 17, P.vidrio); R.pset(x, D - 21, P.vidrioL); }
  R.rect(X + 116, D - 27, X + 146, D - 25, P.lona); R.rect(X + 116, D - 25, X + 146, D - 25, P.lonaS);
  // los botes en sus pescantes
  for (const bx of [X + 38, X + 140]) { R.linea(bx, D - 20, bx, D, P.grisD); R.linea(bx + 22, D - 20, bx + 22, D, P.grisD); R.poligono([[bx - 2, D - 16], [bx + 24, D - 16], [bx + 21, D - 10], [bx + 1, D - 10]], (x, y) => (y === D - 16 ? P.maderaL : P.blanco)); R.rect(bx, D - 11, bx + 20, D - 10, P.blancoS); }
  // la regala con sus candeleros
  for (let x = X + 4; x < X + 186; x++) { R.pset(x, D - 5, P.grisL); if (x % 6 === 0) R.linea(x, D - 5, x, D - 1, P.grisS); }
  // el casco: chapa gris con sus costuras y remaches, la traca de arriba más clara, los portillos, la franja roja
  const proa = (y) => X + 196 - (y - (D - 4)) * 0.18, popa = (y) => X + 4 + Math.max(0, (y - D) * 0.6);
  for (let y = D - 4; y < Yw; y++) for (let x = Math.round(popa(y)); x <= Math.round(proa(y)); x++) { let c;
    if (y >= Yw - 2) c = P.rojoV; else if (y < D - 1) c = P.grisL; else if (y === D - 1) c = P.blancoS;
    else { c = (x - X) % 16 === 0 ? P.grisS : (y - D) % 6 === 5 ? P.grisS : (a_mU(x, y) < (y - D) / 30 ? P.grisS : P.gris); if ((x - X) % 16 === 2 && (y - D) % 3 === 1) c = P.grisL; }
    R.pset(x, y, c); }
  for (let x = X + 16; x < X + 186; x += 10) { if (x > X + 86 && x < X + 98) continue; R.disco(x, Yw - 11, 1.6, P.laton); R.pset(x, Yw - 11, P.vidrio); R.pset(x - 1, Yw - 12, P.vidrioL); }
  // el ancla en el escobén y el nombre insinuado con rayitas (sin letras)
  R.rect(X + 184, D + 2, X + 186, D + 3, P.grisD); R.linea(X + 185, D + 3, X + 185, D + 9, P.grisD); R.linea(X + 182, D + 8, X + 188, D + 8, P.grisD); R.pset(X + 182, D + 7, P.grisD); R.pset(X + 188, D + 7, P.grisD);
  for (let k = 0; k < 5; k++) R.rect(X + 160 + k * 4, D + 3, X + 162 + k * 4, D + 3, P.grisL);
}

// el humo de la chimenea en (x, y): bocanadas de tres tonos que suben y se van con el viento hacia dir
function a_mHumo(R, t, x, y, s, dir = -1) {
  const P = a_mPv;
  const n = 26, B = R.buf;
  for (let k = n - 1; k >= 0; k--) { const u = ((t * 0.16 + k / n) % 1), px = x + dir * u * (120 + s * 60) + Math.sin(t * 0.9 + k * 1.7) * 3 * u + (h(k, 1, 690) - 0.5) * 8 * u, py = y - u * 30 + u * u * 12 * (1 + s) + (h(k, 2, 690) - 0.5) * 6 * u, r = 2 + u * 7 + h(k, 3, 690) * 2;
    if ((px + r > 270 && py - r < 50) || (px - r < 176 && py - r < 23)) continue;
    // al final se deshace en tramado
    const fin = a_mLim((u - 0.6) / 0.4), cx = Math.round(px), cy = Math.round(py), R2 = Math.ceil(r);
    for (let j = -R2; j <= R2; j++) for (let i = -R2; i <= R2; i++) { const d = (i * i + j * j) / (r * r); if (d > 1) continue; const X = cx + i, Y = cy + j; if (X < 0 || X > 319 || Y < 0 || Y > 179) continue; if (a_mU(X, Y) < fin * (0.4 + d * 0.6)) continue;
      const lz = (-i - j) / r; B[Y * 320 + X] = u < 0.25 ? (lz > 0.3 ? P.humoS : P.humoD) : lz > 0.35 ? P.humo : d > 0.7 || lz < -0.4 ? P.humoS : a_mMezcla(P.humo, P.humoS, 0.4); } }
}

// un marinerito de fondo (8 px) que va y viene por la cubierta del vapor entre x0 y x1
function a_mMarinerito(R, t, x0, x1, y, k) {
  const P = a_mPv, W = x1 - x0, u = ((t * (6 + k * 2) + k * 37) % (2 * W)), x = Math.round(x0 + (u < W ? u : 2 * W - u)), p = Math.floor(t * 5 + k) % 2;
  R.pset(x, y - 8, P.piel); R.pset(x + 1, y - 8, P.piel); R.rect(x, y - 9, x + 1, y - 9, P.ropaA); R.rect(x - 1, y - 7, x + 2, y - 4, P.ropaM); R.pset(x - 1 + p, y - 3, P.ropaA); R.pset(x + 2 - p, y - 3, P.ropaA); R.pset(x, y - 2, P.ropaA); R.pset(x + 1, y - 2, P.ropaA);
}

// un bote de remos con dos remeros pequeñitos que va y viene
function a_mBoteRemos(R, t, x, y, L) {
  const P = a_mPv, r = Math.sin(t * 3);
  R.poligono([[x, y - 4], [x + 26, y - 5], [x + 23, y], [x + 3, y]], (xx, yy) => (yy <= y - 4 ? P.maderaL : yy >= y - 1 ? P.cascoS : P.casco)); R.rect(x + 2, y - 3, x + 24, y - 3, P.grisS);
  for (const [bx, c] of [[x + 8, P.ropaM], [x + 16, hex('#c06040')]]) { R.rect(bx, y - 9, bx + 2, y - 6, c); R.rect(bx, y - 11, bx + 1, y - 10, P.piel); R.linea(bx + 1, y - 7, bx + 1 + Math.round(r * 5), y + 1, P.maderaS); }
  a_mReflejo(R, t, x + 2, x + 24, y, hex('#1a2a3a'), 3);
  for (let k = 0; k < 3; k++) R.pset(x - 3 - k * 3, y - 1 + (k % 2), L.agua[3]);
}

// la estatua de bronce (verde del mar con calvas de bronce) o de mármol (blanco comido, con picaduras): en pie (cx el
// centro, pie la base de la peana) o tumbada (cx la peana a la izquierda, pie la base); se ve que es estatua: la peana,
// los pliegues de piedra o metal, el brazo levantado de bronce y, en la de mármol, el brazo roto
function a_mEstatua(R, cx, pie, tipo = 'bronce', tumbada = false, t = 0) {
  const P = a_mPv, br = tipo === 'bronce', cS = br ? C.verdinS : hex('#a8a296'), c = br ? C.verdin : C.marmolS, cL = br ? C.verdinL : C.marmol, cB = br ? C.bronce : hex('#d8d0c0');
  const ps = (u, v, col) => { if (tumbada) R.pset(cx + v, pie - u - 4, col); else R.pset(cx + u, pie - v, col); };
  const tono = (u, v, base) => { const ruido = h(u + 20, v + 40, br ? 501 : 502); if (!br && ruido > 0.88) return hex('#7a746a'); if (br && ruido > 0.9) return cB; return base; };
  // la peana
  for (let v = 0; v < 4; v++) for (let u = -6; u <= 6; u++) ps(u, v, v === 3 ? cL : u > 4 || u === -6 || v === 0 ? cS : tono(u, v, br ? c : hex('#d4cec0')));
  // el manto con sus pliegues, de los pies a los hombros
  for (let v = 4; v < 22; v++) { const m = Math.round(4 - (v - 4) * 0.06 + (v < 8 ? 1 : 0)); for (let u = -m; u <= m; u++) { const pl = (u + 20 + Math.round(v * 0.3)) % 3 === 0; ps(u, v, u === m ? cS : u === -m ? cL : pl ? cS : tono(u, v, a_mU(u + 8, v) < 0.2 ? cL : c)); } }
  // el pecho, el cuello y la cabeza con el pelo en bucles
  for (let v = 22; v < 25; v++) for (let u = -3; u <= 3; u++) ps(u, v, u === 3 ? cS : tono(u, v, c));
  ps(0, 25, cS); ps(-1, 25, c);
  for (let v = 26; v < 32; v++) for (let u = -3; u <= 2; u++) { if ((v === 26 || v === 31) && (u === -3 || u === 2)) continue; ps(u, v, v > 29 ? ((u + v) % 2 ? cS : c) : u === 2 ? cS : u === -3 ? cL : tono(u, v, c)); }
  // el brazo derecho levantado (bronce) o roto a la altura del codo (mármol)
  if (br) { for (let k = 0; k < 10; k++) { ps(4 + Math.round(k * 0.3), 22 + k, k % 3 ? c : cL); ps(5 + Math.round(k * 0.3), 22 + k, cS); } ps(7, 32, c); ps(8, 33, cL); ps(6, 33, c); }
  else { ps(4, 22, c); ps(5, 21, c); ps(5, 20, cS); ps(6, 20, hex('#f4f0e8')); }
  // el brazo izquierdo pegado al manto
  for (let v = 12; v < 22; v++) ps(-5, v, v === 12 ? cL : cS);
  // las algas y caracolillos pegados (del mar)
  for (let k = 0; k < 5; k++) ps(-4 + Math.round(h(k, 1, 503) * 8), 4 + Math.round(h(k, 2, 503) * 18), k % 2 ? P.costra : hex('#5a7a4a'));
}

// un ánfora con incrustaciones (x el centro, pie la punta); tumbada: hacia la derecha
function a_mAnfora(R, x, pie, tumbada = false, sem = 0) {
  const P = a_mPv, ps = (u, v, c) => (tumbada ? R.pset(x + v, pie - 4 - u, c) : R.pset(x + u, pie - v, c));
  ps(0, 0, P.barroS); ps(0, 1, P.barro);
  for (let v = 2; v < 14; v++) { const m = Math.round(Math.sin(((v - 1) / 13) * Math.PI) * 4.2 + (v > 10 ? -0.5 : 0)); for (let u = -m; u <= m; u++) ps(u, v, u === m ? P.barroS : u <= -m + 1 ? P.barroL : h(u + sem, v, 511) > 0.86 ? P.costra : P.barro); }
  for (let v = 14; v < 19; v++) { ps(-1, v, P.barroL); ps(0, v, P.barro); ps(1, v, P.barroS); }
  ps(-2, 19, P.barro); ps(-1, 19, P.barroL); ps(0, 19, P.barro); ps(1, 19, P.barro); ps(2, 19, P.barroS);
  for (const sg of [-1, 1]) { ps(2 * sg, 17, P.barroS); ps(3 * sg, 16, P.barroS); ps(3 * sg, 15, P.barroS); ps(3 * sg, 14, P.barroS); ps(2 * sg, 13, P.barroS); }
}

function a_mRescateFijo(R) {
  const P = a_mPv, hor = 92;
  // la isla al fondo, a la derecha (con bruma) y Creta
  a_mCaliza(R, 196, 319, (x) => 70 + Math.max(0, 40 - (x - 196) * 0.9) * 0.5 + Math.sin(x * 0.25) * 1.5 + (x > 300 ? (x - 300) * 0.6 : 0), () => hor + 2, 51, 0.38, hex('#a8c4dc'));
  for (let x = 6; x < 70; x++) { const hh = Math.round(Math.sin((x - 6) / 64 * Math.PI) * 4 + 1); for (let y = hor - hh; y < hor; y++) R.pset(x, y, y === hor - hh ? P.creta2 : P.creta); }
  // el vapor de la marina, de costado
  a_mVapor(R, 8, 124);
}

function a_mRescate(R, t, o, L) {
  const P = a_mPv, hor = 92, s = L.s, K = a_mClaveL(o, L), X = a_mRES.X, Y = a_mRES.Y, Lc = a_mRES.L, dy = Math.round(Math.sin(t * 1.7) * s * 1.6);
  const fijo = a_mBuf(R, 'res|' + K, (b) => { a_mRescateFijo(R); a_mTinte(b, L); });
  const A = a_mAguaInfo(R, 'res', a_mBuf(R, 'res|dia|0', () => a_mRescateFijo(R)), hor, null);
  if (L.base === 'dia') L.solXY = [196, 30, 6];
  a_mCielo(R, t, hor, L);
  a_mRayo(R, t, hor, s);
  a_mHumo(R, t, 106, 56, s);
  a_mVolcarDesde(R, fijo, 0, 0);
  a_mAgua(R, t, L, A, { refl: 0.36 });
  a_mReflejo(R, t, 14, 200, 124, hex('#2a3440'), 8);
  // la vida del vapor: marineritos, la bandera de popa y el humo de delante
  a_mMarinerito(R, t, 20, 58, 106, 0); a_mMarinerito(R, t, 140, 186, 106, 1); a_mMarinerito(R, t + 3, 64, 118, 106, 2);
  a_mBandera(R, 24, 82, t, 1 + s, -1, 13, 9);
  a_mGaviotas(R, t, [10, 30, 250, 80], Math.round(6 - s * 4), 7);
  // un bote de remos que va y viene entre los barcos y un buzo que asoma con sus burbujas
  a_mBoteRemos(R, t, Math.round(150 + Math.sin(t * 0.22) * 40), 132, L);
  { const u = (t * 0.25) % 1, yb = 128 + Math.round(u < 0.5 ? 6 - u * 12 : 0); if (u < 0.6) { R.disco(232, yb, 3, P.cobreS); R.disco(231, yb - 1, 2.6, P.cobre); R.pset(230, yb - 2, P.cobreL); R.disco(233, yb, 1, P.vidrio); } a_mBurbujas(R, t, 232, 128, 4, L); }
  // la estatua que sube: debajo del agua, teñida y ondulada; fuera, chorreando
  const iza = a_mLim(o.iza ?? 0), gx = 292, flot = 160, base = Math.round(212 - iza * 84), yG = base - 42;
  // el agua por delante de la proa y la cuerda que va al agua
  R.linea(gx, 62, gx, Math.min(yG, flot), P.cuerda);
  if (yG < flot) {
    const B2 = a_mBuf(R, 'resEst', () => {}), prev = R.usar(B2); B2.fill(0); a_mEstatua(R, gx, base, 'bronce'); R.usar(prev);
    const B = R.buf; for (let y = Math.max(0, yG - 2); y < 180; y++) for (let x = gx - 10; x <= gx + 10; x++) { const c = B2[y * 320 + x]; if (!c) continue; if (y < flot + Math.round(Math.sin(x * 0.5 + t * 3))) B[y * 320 + x] = c; else { const xx = x + Math.round(Math.sin(y * 0.8 + t * 3)); if (xx >= 0 && xx < 320) B[y * 320 + xx] = a_mMezcla(c, L.agua[1], 0.6); } }
    // el lazo de cuerdas, el gancho y el chorreo
    // la eslinga: dos cabos del gancho que bajan por los lados hasta debajo de la peana, un abrazo de cabo al manto y la
    // tabla de madera bajo la peana (se iza como una carga, no como una persona)
    R.linea(gx, yG, gx - 8, base - 1, P.cuerda); R.linea(gx, yG, gx + 8, base - 1, P.cuerda); R.rect(gx - 9, base, gx + 9, base + 1, P.maderaS); R.rect(gx - 9, base, gx + 9, base, P.maderaL);
    R.rect(gx - 6, base - 14, gx + 6, base - 13, P.cuerda); R.rect(gx - 6, base - 13, gx + 6, base - 13, P.cuerdaS); R.rect(gx - 1, yG - 2, gx + 1, yG, P.hierro); R.pset(gx, yG - 3, P.hierroL);
    if (iza > 0.3) for (let k = 0; k < 7; k++) { const u = ((t * 1.6 + h(k, 1, 680)) % 1), x = gx - 6 + Math.round(h(k, 2, 680) * 12), y0 = base - Math.round(h(k, 3, 680) * 24), y = Math.round(y0 + u * (flot - y0)); if (y < flot) R.pset(x, y, P.gota); }
  }
  // las ondas alrededor de la cuerda o de la estatua
  for (let j = 0; j < 3; j++) { const r = ((t * 2.4 + j * 2) % 6) + 2; for (let a = 0; a < 6.28; a += 0.35) { const xx = Math.round(gx + Math.cos(a) * r * 1.8), yy = Math.round(flot + Math.sin(a) * r * 0.4); if (Math.sin(a) > -0.2) R.pset(xx, yy, r < 5 ? L.agua[3] : L.agua[2]); } }
  // el caíque de delante (sin palo: la grúa hace de palo), su bomba y su torno
  const b = a_mBuf(R, 'resCaique|' + K, (bb) => { a_mCaique(R, X, Y, Lc, { palo: null, bomba: 106 }); a_mGrua(R, Y); a_mTinte(bb, L); });
  a_mVolcarDesde(R, b, 0, dy, 0, Y - 3);
  a_mGruaCabos(R, gx, yG, dy);
  const gira = (o.bomba ?? 1) > 0; a_mVolante(R, 46, Y - 13 + dy, 8, gira ? t * 3.2 : 0.4);
  if ((o.bomba ?? 0) >= 1 && ELENCO_AK.bomberoAK) { R.actor(ELENCO_AK.bomberoAK, 22, Y + dy, t, { dir: 1, brazos: Math.sin(t * 3.2) > 0 }); R.actor(ELENCO_AK.bomberoAK, 55, Y + dy, t + 0.5, { dir: -1, brazos: Math.sin(t * 3.2) < 0 }); }
  // el torno: el tambor con la cuerda y el manubrio que gira mientras la estatua sube
  const ang = iza * 22 + (iza > 0 && iza < 1 ? t * 0.5 : 0); { const tx = 212, ty = Y - 12 + dy; R.rect(tx - 7, ty - 3, tx - 6, ty + 7, P.maderaS); R.rect(tx + 6, ty - 3, tx + 7, ty + 7, P.maderaS); R.rect(tx - 5, ty - 2, tx + 5, ty + 2, P.cuerda); for (let x = tx - 5; x <= tx + 5; x += 2) R.linea(x, ty - 2, x + 1, ty + 2, P.cuerdaS); R.rect(tx - 5, ty + 2, tx + 5, ty + 2, P.cuerdaS);
    const mx = Math.round(tx + 9 + Math.cos(ang) * 4), my = Math.round(ty + Math.sin(ang) * 4); R.linea(tx + 8, ty, mx, my, P.hierro); R.rect(mx, my - 1, mx + 1, my + 1, P.maderaL); }
  a_mGaviotaPosada(R, 250, Y - 19 + dy, t, -1, 3);
  a_mVolcarDesde(R, a_mBuf(R, 'resBorda|' + K, (bb) => { a_mCaiqueBorda(R, X, Y, Lc); a_mTinte(bb, L); }), 0, dy, 0, 180);
  a_mAguaDelante(R, t, X, X + Lc, Y + 16 + dy, L);
  a_mEscalerilla(R, 176, Y - 3 + dy, Y + 19 + dy);
  return { suelo: Y + dy, libre: [72, 196], escalera: [179, Y - 4 + dy], gancho: [gx, yG], estatua: [gx, base], torno: [212, Y - 12 + dy], bomba: [46, Y - 13 + dy], horizonte: hor };
}

// LA GRÚA DE MADERA del caíque del rescate: el puntal en x 232 con sus vientos y la pluma que sale sobre el agua hasta
// (292, 60); Y la cubierta
function a_mGrua(R, Y) {
  const P = a_mPv;
  R.rect(230, 48, 233, Y - 8, P.madera); R.rect(230, 48, 230, Y - 8, P.maderaL); R.rect(233, 48, 233, Y - 8, P.maderaS); R.rect(228, 46, 235, 48, P.maderaS); R.rect(227, Y - 10, 236, Y - 7, P.maderaD);
  for (let y = 60; y < Y - 12; y += 14) R.rect(230, y, 233, y, P.maderaD);
  R.linea(231, 47, 150, Y - 14, P.jarcia); R.linea(232, 47, 256, Y - 18, P.jarcia);
  // la pluma, de la coz (junto al puntal) a la punta, y su amantillo
  for (let k = 0; k <= 58; k++) { const x = 234 + k, y = Math.round(Y - 30 - k * (Y - 92) / 58); R.pset(x, y, P.madera); R.pset(x + 1, y, P.maderaS); R.pset(x - 1, y, P.maderaL); }
  R.linea(232, 50, 292, 60, P.jarcia); R.rect(290, 58, 294, 62, P.maderaS); R.disco(292, 61, 2, P.hierro); R.pset(292, 61, P.hierroL);
}

// los cabos de la grúa: el de izar baja de la punta al gancho (gx, yG) y vuelve por la pluma al torno
function a_mGruaCabos(R, gx, yG, dy) {
  const P = a_mPv; R.linea(292, 62, 236, 120 + dy, P.cuerda); R.linea(236, 120 + dy, 214, 138 + dy, P.cuerda);
}

function a_mHallazgosFijo(R) {
  const P = a_mPv;
  // la amurada de chapa con remaches, sus costuras y la regala de madera; un portalón con candeleros
  for (let x = 0; x < 320; x++) { for (let y = 104; y < 128; y++) { let c; const d = y - 104;
      if (d < 3) c = d === 0 ? P.tecaL : d === 1 ? P.teca : P.tecaS; else if (d === 3) c = P.chapaS;
      else { c = x % 40 === 0 ? P.chapaS : x % 40 === 1 ? P.chapaL : (a_mU(x, y) < (d / 24) * 0.5 ? P.chapaS : P.chapa); if ((x % 40 === 3 || x % 40 === 37) && d % 4 === 2) c = P.remache; if (d === 13) c = x % 40 < 2 ? c : P.chapaS; }
      if (d > 17) c = a_mMezcla(c, P.gris, 0.45); if (d === 17) c = P.grisS; if (y > 124) c = a_mMezcla(c, P.grisD, 0.3); R.pset(x, y, c); }
    if (x % 64 === 20) R.rect(x, 124, x + 7, 127, P.grisD); }
  // las chorreras de óxido bajo los remaches y la sombra de la regala
  for (let x = 0; x < 320; x++) { if (x % 40 === 3 || x % 40 === 37 || h(x, 3, 98) > 0.93) { const L0 = 3 + Math.round(h(x, 4, 98) * 12); for (let j = 0; j < L0; j++) if (a_mU(x, 108 + j) < 0.7 - j / L0 * 0.6) R.pset(x, 109 + j, a_mMezcla(R.pget(x, 109 + j), hex('#a86a3a'), 0.45)); }
    R.pset(x, 107, a_mMezcla(R.pget(x, 107), P.grisD, 0.35)); }
  // las costuras de la chapa, más marcadas
  for (let x = 0; x < 320; x += 40) { R.rect(x, 108, x, 127, P.grisS); R.rect(x + 1, 108, x + 1, 127, P.chapaL); }
  R.rect(0, 117, 319, 117, P.chapaS); R.rect(0, 118, 319, 118, P.chapaL);
  // colgado de la regala: tres baldes de incendios rojos, un bichero y un remo trincados, un rollo de cabo
  for (const bx of [44, 54, 64]) { R.linea(bx, 106, bx, 109, P.cuerdaS); R.poligono([[bx - 4, 110], [bx + 4, 110], [bx + 3, 118], [bx - 3, 118]], (x) => (x < bx - 1 ? hex('#e05a48') : x > bx + 1 ? hex('#8a2a24') : P.rojoV)); R.rect(bx - 4, 110, bx + 4, 110, P.grisD); R.rect(bx - 3, 118, bx + 3, 118, hex('#5a1a18')); }
  R.rect(170, 112, 228, 113, P.tecaL); R.rect(170, 114, 228, 114, P.tecaS); R.poligono([[224, 110], [240, 111], [240, 115], [224, 116]], (x, y) => (y < 113 ? P.tecaL : P.teca));
  R.rect(172, 109, 214, 109, P.maderaS); R.rect(214, 108, 217, 110, P.hierro); R.pset(218, 107, P.hierro);
  for (const x of [184, 208]) { R.rect(x, 108, x + 1, 115, P.cuerda); R.pset(x, 116, P.cuerdaS); }
  for (let k = 0; k < 3; k++) { const r = 6 - k * 1.5; for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(296 + Math.cos(a) * r), Math.round(114 + Math.sin(a) * r), Math.sin(a) < 0 ? P.cuerda : P.cuerdaS); }
  R.linea(296, 106, 296, 108, P.cuerdaS);
  // las bitas de amarre con su estacha adujada y un escotillón
  for (const bx of [148, 160]) { R.rect(bx - 3, 120, bx + 3, 131, P.grisD); R.rect(bx - 3, 120, bx - 2, 131, P.gris); R.rect(bx - 4, 119, bx + 4, 120, P.grisS); R.pset(bx - 3, 119, P.grisL); }
  R.rect(144, 130, 164, 133, P.grisD); for (let k = 0; k < 6; k++) R.linea(146 + k * 2, 124 - k % 2, 148 + k * 2, 127, k % 2 ? P.cuerda : P.cuerdaS);
  // la cubierta de teca calafateada, con tablas que se abren hacia delante
  let y = 128, k = 0; while (y < 180) { const ancho = 3 + Math.round(k * 0.3), off = (k * 53) % 73; for (let yy = y; yy < Math.min(180, y + ancho); yy++) for (let x = 0; x < 320; x++) { const xb = (x + off) % 73, veta = Math.sin(x * 0.08 + k * 1.9 + (yy - y) * 1.9) > 0.86 && h(x >> 4, k, 97) > 0.3;
      let c = yy === y ? P.calafate : xb === 0 ? P.calafate : veta ? P.tecaS : h(x >> 3, k, 94) > 0.84 ? P.tecaS : yy === y + 1 ? (a_mU(x, yy) < 0.5 ? P.tecaL : P.teca) : a_mU(x, yy) < 0.1 ? P.tecaL : P.teca;
      if (yy === y + (ancho >> 1) && (xb === 2 || xb === 71)) c = P.calafate; R.pset(x, yy, c); } y += ancho; k++; }
  for (let x = 0; x < 320; x++) for (let yy = 128; yy < 131; yy++) if (a_mU(x, yy) < 0.55 - (yy - 128) * 0.18) R.pset(x, yy, a_mMezcla(R.pget(x, yy), P.calafate, 0.4));
  // el manguerote de ventilación a la izquierda (boca hacia nosotros, roja por dentro)
  R.rect(6, 86, 17, 132, P.blanco); R.rect(6, 86, 7, 132, P.chapaL); R.rect(15, 86, 17, 132, P.blancoS); R.rect(3, 130, 20, 134, P.grisS);
  R.disco(12, 76, 12, P.blancoS); R.disco(11, 75, 11, P.blanco); R.disco(12, 77, 8, hex('#8a2a24')); R.disco(12, 78, 6, hex('#5a1a18'));
  // el salvavidas colgado de la amurada (cuartos rojos y blancos)
  for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d > 7 || d < 3.4) continue; const a = Math.atan2(j, i), q = Math.floor((a + Math.PI) / (Math.PI / 2) + 0.5) % 2; R.pset(256 + i, 116 + j, q ? (j < 0 ? hex('#e05040') : hex('#b83a30')) : (j < 0 ? P.blanco : P.blancoS)); }
  R.linea(250, 108, 262, 108, P.cuerdaS);
  // la lona mojada con sus pliegues y la estatua de bronce y la de mármol tumbadas encima
  R.poligono([[22, 140], [96, 138], [98, 157], [18, 158]], (x, yy) => { const pl = Math.sin(x * 0.35 + yy * 0.2) > 0.75; return pl ? P.lonaS : h(x >> 2, yy >> 1, 95) > 0.8 ? P.lonaM : a_mU(x, yy) < 0.18 ? P.lonaS : P.lona; });
  R.linea(18, 158, 98, 157, P.lonaD);
  // la parihuela de madera oscura (y mojada) con la estatua de mármol
  R.rect(100, 140, 152, 157, P.maderaD); for (let x = 100; x <= 152; x++) for (let yy = 140; yy <= 157; yy++) if ((yy - 140) % 4 === 0) R.pset(x, yy, P.maderaS); else if (a_mU(x, yy) < 0.18) R.pset(x, yy, hex('#2e1e12'));
  R.rect(99, 157, 153, 158, hex('#2a1c10')); R.rect(100, 139, 152, 139, P.maderaS); R.linea(22, 140, 18, 158, P.lonaS);
  for (const [cx, cy] of [[60, 150], [40, 145], [84, 153]]) for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 2.4) ** 2 < 1 && a_mU(cx + i, cy + j) < 0.6) R.pset(cx + i, cy + j, a_mMezcla(R.pget(cx + i, cy + j), P.lonaD, 0.5));
  a_mEstatua(R, 30, 154, 'bronce', true);
  a_mEstatua(R, 108, 152, 'marmol', true);
  // el caballete con las ánforas (de pie y una tumbada) y sus incrustaciones
  R.rect(170, 136, 210, 138, P.madera); R.rect(170, 136, 210, 136, P.maderaL); R.rect(171, 138, 173, 156, P.maderaS); R.rect(207, 138, 209, 156, P.maderaS);
  for (let k = 0; k < 4; k++) a_mAnfora(R, 176 + k * 9, 156, false, k * 7);
  a_mAnfora(R, 140, 160, true, 3);
  // el cajón con los vasos de vidrio
  R.rect(212, 142, 234, 157, P.madera); R.rect(212, 142, 234, 143, P.maderaL); R.rect(233, 143, 234, 157, P.maderaS); R.rect(214, 149, 232, 149, P.maderaS);
  for (const [x, c, cL, hh] of [[216, P.cristalV, P.cristalVL, 8], [223, P.cristalA, P.vidrioL, 6], [229, P.cristalV, P.cristalVL, 5]]) { R.rect(x - 2, 141 - hh, x + 2, 141, c); R.rect(x - 1, 141 - hh - 1, x + 1, 141 - hh - 1, c); R.linea(x - 1, 141 - hh, x - 1, 140, cL); R.rect(x - 3, 141 - hh - 2, x + 3, 141 - hh - 2, cL); }
  // la caja de las joyitas con la tapa abierta
  R.rect(238, 148, 254, 157, P.maderaS); R.rect(238, 148, 254, 149, P.madera); R.rect(240, 150, 252, 152, hex('#5a2a3a')); R.poligono([[238, 148], [254, 148], [256, 140], [240, 140]], (x, yy) => (yy === 140 ? P.maderaL : P.madera)); R.rect(245, 144, 248, 145, P.laton);
  for (const [x, c] of [[242, P.joya], [245, P.joyaR], [248, P.joya], [250, P.joyaA]]) R.pset(x, 150, c);
  // el cesto de los terrones en el rincón, el rollo de cabo y el balde
  for (let yy = 140; yy <= 158; yy++) { const m = 14 - Math.round((yy - 140) * 0.12); for (let x = 278 - m; x <= 278 + m; x++) R.pset(x, yy, (x + yy) % 2 ? hex('#b89a5a') : (yy % 3 ? hex('#9a7c44') : hex('#7a6034'))); }
  R.rect(263, 139, 293, 140, hex('#6a5030'));
  for (const [x, yy, r] of [[270, 137, 4], [279, 136, 5], [287, 138, 3]]) { R.disco(x, yy, r, C.verdinS); R.disco(x - 0.5, yy - 0.8, r - 1, C.verdin); R.pset(x - 1, yy - r + 1, C.verdinL); R.rect(x + 1, yy, x + r - 1, yy + 1, hex('#2a201a')); R.pset(x - 2, yy + 1, hex('#2a201a')); }
  a_mRollo(R, 306, 160, 11, 4);
}

function a_mHallazgos(R, t, o, L) {
  const P = a_mPv, s = L.s, K = a_mClaveL(o, L), hor = 80;
  const fijo = a_mBuf(R, 'hal|' + K, (b) => { a_mHallazgosFijo(R); a_mTinte(b, L); });
  a_mCielo(R, t, hor, L);
  a_mRayo(R, t, hor, s);
  // la isla al fondo a la izquierda y el caíque fondeado que cabecea
  const isla = a_mBuf(R, 'halIsla|' + K, (b) => { a_mCaliza(R, 30, 200, (x) => 58 + Math.abs(x - 110) * 0.2 + Math.sin(x * 0.3) * 1.5, () => hor + 1, 61, 0.42, hex('#a8c4dc')); a_mTinte(b, L); });
  a_mVolcarDesde(R, isla, 0, 0, 40, hor + 2);
  const A = a_mAguaInfo(R, 'hal', null, hor, null);
  a_mAgua(R, t, L, A, { refl: 0.3, y1: 108 });
  { const x = 200, y = 96 + Math.round(Math.sin(t * 1.1) * 1); R.poligono([[x, y - 4], [x + 40, y - 5], [x + 36, y], [x + 4, y]], (xx, yy) => (yy <= y - 4 ? P.maderaL : yy === y - 3 ? P.azulC : yy === y - 2 ? P.rojoC : P.casco)); R.linea(x + 16, y - 4, x + 16, y - 30, P.maderaS); R.linea(x + 4, y - 10, x + 32, y - 32, P.lonaS); R.linea(x + 16, y - 30, x + 40, y - 6, P.jarcia); a_mReflejo(R, t, x + 2, x + 38, y, hex('#1a2a3a'), 4); }
  a_mGaviotas(R, t, [40, 30, 250, 70], Math.round(5 - s * 3), 9);
  // el humo de la chimenea (fuera de cuadro, a la izquierda) que cruza
  a_mHumo(R, t, -6, 50, s, 1);
  a_mVolcarDesde(R, fijo, 0, 0);
  // los charcos que reflejan el cielo y tiemblan, las joyitas que brillan y el brillito del terrón
  for (const [cx, cy, rx] of [[48, 163, 12], [196, 166, 9], [128, 172, 14]]) for (let j = -2; j <= 2; j++) for (let i = -rx; i <= rx; i++) { if ((i / rx) ** 2 + (j / 2.4) ** 2 >= 1) continue; const v = Math.sin(i * 0.6 + t * 3 + j); R.pset(cx + i, cy + j, v > 0.85 ? L.cielo[5] : a_mMezcla(L.cielo[3], P.tecaS, 0.35 + (j + 2) * 0.08)); }
  for (const [x, y, k] of [[242, 150, 0], [248, 150, 1], [250, 151, 2], [216, 133, 3]]) { const b = Math.sin(t * 4 + k * 1.9); if (b > 0.6) { R.pset(x, y - 1, P.blanco); R.pset(x - 1, y, P.latonL); R.pset(x + 1, y, P.latonL); R.pset(x, y + 1, P.latonL); R.pset(x, y, P.blanco); } }
  const tr = a_mLim(o.terron ?? 0); if (tr > 0) { const b = (0.5 + 0.5 * Math.sin(t * 2.6)) * tr; if (b > 0.25) { R.pset(279, 135, P.latonL); if (b > 0.6) { R.pset(278, 135, P.laton); R.pset(280, 135, P.laton); R.pset(279, 134, P.laton); } } }
  a_mGaviotaPosada(R, 132, 104, t, 1, 5);
  return { suelo: 160, libre: [20, 220], terrones: [279, 138], horizonte: hor };
}

// la paleta del fondo del mar: el agua de arriba abajo, la arena, la roca, la posidonia, la madera del casco, el barro
// de las ánforas, el bronce verde, el mármol, las esponjas, el velo de la penumbra y el negro de las siluetas
const BF = (() => {
  const P = pal({
    noche: '#04101e', sil: '#050c16', halo: '#0b1a2c', rayo: '#a6dcf4', blanco: '#f4fbff',
    arenaSS: '#4a5a58', arenaS: '#687a72', arena: '#8a9a88', arenaL: '#aeb8a0', arenaLL: '#ccd2b4',
    rocaSS: '#1c2a38', rocaS: '#2e4054', roca: '#46596c', rocaL: '#647a8c', rocaLL: '#86a0ae',
    pos0: '#163a30', pos1: '#22523c', pos2: '#33704a', pos3: '#4e8c58', posP: '#8a8a52',
    madS: '#1c1614', madN: '#2e2420', mad: '#44362e', madL: '#64524a',
    anfSS: '#3a2622', anfS: '#5e3e34', anf: '#8a5e4a', anfL: '#b0806a', conc: '#b4b0a2', concV: '#6a7a5a',
    verSS: '#13281f', verS: '#2a5442', ver: '#3f7a60', verL: '#6aa88c', verLL: '#9ccab4', bro: '#b08a44', broL: '#e0c070',
    marSS: '#3a4852', marS: '#687a84', mar: '#98a8ae', marL: '#c8d2d2', alga: '#5e6e44',
    esN: '#c8703a', esA: '#c0a63c', esM: '#7a4a86', gorg: '#a04a5a', gorgL: '#d8a050',
    pulpo: '#a44a3a', pulpoS: '#6a2a24', pulpoL: '#d07858', ojo: '#f0e6c8',
    pezL: '#d4e2ea', pez: '#8aa8bc', pezS: '#3e5a70', castS: '#141c2c', vidrio: '#8ad4c8',
    lodo: '#0e1a16', tierra: '#7a5a3a', turq: '#4ab0a0',
  });
  P.AGUA = ['#4e9ece', '#3a88bc', '#2c72a6', '#225e90', '#1a4c78', '#143e64', '#0e3050', '#0a2440'].map(hex);
  P.ARENA = [P.arenaSS, P.arenaS, P.arena, P.arenaL, P.arenaLL];
  P.ROCA = [P.rocaSS, P.rocaS, P.roca, P.rocaL, P.rocaLL];
  P.POS = [P.pos0, P.pos1, P.pos2, P.pos3, P.posP];
  P.MAD = [P.madS, P.madN, P.mad, P.madL];
  P.ANF = [P.anfSS, P.anfS, P.anf, P.anfL];
  P.VER = [P.verSS, P.verS, P.ver, P.verL, P.verLL];
  P.MAR = [P.marSS, P.marS, P.mar, P.marL];
  return P;
})();

// mezcla dos colores: a = 0 deja c, a = 1 da d
function b_mez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// la trama ordenada 4 × 4 (umbral 0–1 por píxel) y un tono de una rampa tramado: f continuo de 0 a n − 1
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const b_bay = (x, y) => (b_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

const b_tono = (cols, f, x, y) => cols[Math.max(0, Math.min(cols.length - 1, Math.floor(f + b_bay(x, y))))];

// ruido suave (interpolado) sobre la función h
function b_ruido(x, y, k = 0) {
  const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

// distancia de un punto a un segmento, y en qué parte del segmento cae (u 0–1)
function b_seg(px, py, ax, ay, bx, by) {
  const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / (vx * vx + vy * vy)));
  return [Math.hypot(px - ax - vx * u, py - ay - vy * u), u];
}

// una capa fija por lienzo: se pinta una vez en un búfer de R.nuevo() y luego se copia (o se lee) cada fotograma
const b_CACHE = new WeakMap();

function b_capa(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); m[clave] = { b, extra: dibuja(b) }; R.usar(prev); }
  return m[clave];
}

// una figura girada: recorre su caja en el lienzo, pasa cada píxel a coordenadas locales (x hacia la derecha, y hacia
// abajo, girado ang alrededor de x0, y0) y pinta lo que devuelve fn(lx, ly, x, y) (un color o null); borde: el
// contorno de un píxel alrededor
function b_forma(R, x0, y0, ang, [lx0, ly0, lx1, ly1], fn, borde) {
  const c = Math.cos(ang), s = Math.sin(ang), W = [];
  for (const [a, b] of [[lx0, ly0], [lx1, ly0], [lx0, ly1], [lx1, ly1]]) W.push([x0 + a * c - b * s, y0 + a * s + b * c]);
  const X0 = Math.floor(Math.min(...W.map((p) => p[0]))) - 1, X1 = Math.ceil(Math.max(...W.map((p) => p[0]))) + 1, Y0 = Math.floor(Math.min(...W.map((p) => p[1]))) - 1, Y1 = Math.ceil(Math.max(...W.map((p) => p[1]))) + 1;
  const loc = (x, y) => { const dx = x - x0, dy = y - y0; return [dx * c + dy * s, -dx * s + dy * c]; };
  for (let y = Math.max(0, Y0); y <= Math.min(179, Y1); y++) for (let x = Math.max(0, X0); x <= Math.min(319, X1); x++) {
    const [lx, ly] = loc(x, y), col = fn(lx, ly, x, y);
    if (col != null) { R.pset(x, y, col); continue; }
    if (borde != null) for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const [ax, ay] = loc(x + i, y + j); if (fn(ax, ay, x + i, y + j) != null) { R.pset(x, y, borde); break; } }
  }
}

// un ánfora romana (cuello con dos asas, panza y pie en punta) de largo L, girada ang, con barro sombreado, concreciones
// blancas y verdes; o.rota 0–1: le falta la boca hasta ahí y se ve el hueco oscuro; o.dk: el velo de la penumbra
function b_anfora(R, cx, cy, ang, L, o = {}) {
  const dk = o.dk || ((c) => c), rota = o.rota ?? 0, cs = Math.cos(ang);
  const prof = (q) => (q < 0.05 ? 0.12 : q < 0.24 ? 0.075 : q < 0.34 ? 0.075 + (q - 0.24) / 0.1 * 0.15 : q < 0.7 ? 0.225 - (q - 0.34) * 0.12 : q < 0.95 ? 0.18 * (1 - (q - 0.7) / 0.25) + 0.035 : 0.035);
  const asa = (q, a) => q > 0.07 && q < 0.3 && ((a > 0.13 * L && a < 0.165 * L) || (q < 0.11 && a > 0.07 * L && a < 0.165 * L));
  b_forma(R, cx, cy, ang, [-L / 2, -0.24 * L, L / 2, 0.24 * L], (u, v, x, y) => {
    const q = u / L + 0.5, w = prof(q) * L, a = Math.abs(v);
    if (q < 0 || q > 1 || (a > w && !asa(q, a))) return null;
    if (q < rota + 0.03 * Math.sin(v * 1.7)) return null;
    if (rota > 0 && q < rota + 0.06 && a < w - 1.2) return dk(BF.lodo);
    const hh = h(x, y, 71);
    if (hh > 0.93) return dk(BF.conc); if (hh > 0.89) return dk(BF.concV);
    return dk(b_tono(BF.ANF, 1.8 - (v / Math.max(1, w)) * cs * 1.3 - (asa(q, a) && a > w ? 0.4 : 0) + (b_ruido(x / 3, y / 3, 72) - 0.5) * 0.8, x, y));
  }, dk(BF.anfSS));
}

// una mata de esponja (bulto con luz arriba, sombra abajo y los ósculos oscuros)
function b_esponja(R, x, y, r, col, dk = (c) => c, tipo = 0) {
  if (tipo === 1) { // de tubos: dos o tres chimeneas con la boca oscura
    for (let k = 0; k < 3; k++) { const tx = x - r + k * r, alto = r + 2 + ((k * 5 + x) % 3); R.rect(tx, y - alto, tx + 1, y, dk(col)); R.pset(tx, y - alto, dk(BF.lodo)); R.rect(tx + 1, y - alto + 1, tx + 1, y, dk(b_mez(col, BF.noche, 0.45))); R.pset(tx, y - alto + 1, dk(b_mez(col, BF.blanco, 0.35))); }
    return;
  }
  if (tipo === 2) { // costra: una mancha plana e irregular
    for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / (r * 2)) ** 2 + (j / r) ** 2 + (h(x + i, y + j, 106) - 0.5) * 0.6 < 0.8) R.pset(x + i, y + j, dk(h(x + i, y + j, 107) > 0.75 ? b_mez(col, BF.blanco, 0.3) : j > 0 ? b_mez(col, BF.noche, 0.3) : col));
    return;
  }
  R.disco(x, y + 1, r, dk(b_mez(col, BF.noche, 0.55))); R.disco(x, y, r, dk(col)); R.disco(x - 1, y - 1, Math.max(1, r - 2), dk(b_mez(col, BF.blanco, 0.3)));
  R.pset(x, y - r + 1, dk(BF.lodo)); if (r > 2) R.pset(x + 1, y, dk(b_mez(col, BF.noche, 0.6)));
}

// un erizo: bola negra con púas que se mueven un poco
function b_erizo(R, x, y, t, dk = (c) => c) {
  for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + Math.sin(t * 0.8 + k) * 0.08, l = 3.5 + (k & 1); R.linea(x, y, Math.round(x + Math.cos(a) * l), Math.round(y + Math.sin(a) * l * 0.8), dk(hex('#2a2238'))); }
  R.disco(x, y, 2, dk(hex('#140f1e'))); R.pset(x - 1, y - 1, dk(hex('#4a3a5a')));
}

// una hoja (cinta) de posidonia del suelo y = y0 hacia arriba, de largo L, que ondea con t; ancho 1–3
function b_hoja(R, x0, y0, L, t, k, ancho = 1, dk = (c) => c) {
  const lean = (h(k, 3, 81) - 0.5) * 0.5, fase = h(k, 4, 82) * 6;
  let px = x0, py = y0;
  for (let i = 1; i <= L; i++) {
    const u = i / L, x = x0 + lean * i + Math.sin(t * 1.25 + fase + u * 2.2) * 2.4 * u * u * (L / 14), y = y0 - i * (1 - 0.18 * u * u);
    const c = dk(BF.POS[Math.min(4, Math.floor(u * 3.2 + (k & 1) * 0.6 + (u > 0.88 && (k % 3 === 0) ? 2 : 0)))]);
    for (let w = 0; w < ancho; w++) R.linea(Math.round(px) + w, Math.round(py), Math.round(x) + w, Math.round(y), w === ancho - 1 && ancho > 1 ? dk(BF.pos0) : c);
    px = x; py = y;
  }
}

// las partículas que flotan en el agua: n por cada una de tres profundidades (o tamaño 2 si es de delante); nunca en la
// esquina de Atom
function b_motas(R, t, n, grande = 0, dk = (c) => c) {
  for (let k = 0; k < n * 3; k++) {
    const z = k % 3, v = 1.5 + z * 2.2, x = Math.round(((h(k, 1, 91) * 340 + t * v * (h(k, 5, 91) - 0.3)) % 340 + 340) % 340 - 10), y = Math.round(((h(k, 2, 91) * 190 + t * (0.8 + z * 0.6) + Math.sin(t * 0.7 + k) * 3) % 190 + 190) % 190 - 5);
    if (x > 272 && y < 50) continue;
    const c = dk(b_mez(BF.rayo, BF.AGUA[4], 0.55 - z * 0.2));
    if (grande) { if (k % 2) continue; R.pset(x, y, c); R.pset(x + 1, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 1, dk(BF.blanco)); }
    else { R.pset(x, y, c); if (z === 2 && h(k, 7) > 0.6) R.pset(x + 1, y, c); }
  }
}

// un pez de largo L (cuerpo de uso, cola que bate), mirando a dir; cols [lomo, cuerpo, vientre]; o.bandas (sargo)
function b_pez(R, x, y, dir, L, t, cols, o = {}) {
  const [S, M, Lz] = cols;
  if (L <= 5) { const bate = Math.sin(t * 9 + x * 0.3) > 0 ? 1 : 0; for (let i = 0; i < L; i++) { const px = Math.round(x + dir * (L / 2 - i)); R.pset(px, y, i === 1 ? Lz : M); if (i > 0 && i < L - 1) R.pset(px, y - 1, S); } R.pset(Math.round(x - dir * (L / 2 + 1)), y - bate, M); return; }
  const hgt = Math.max(1, Math.round(L * 0.32)), bate = Math.sin(t * 9 + x * 0.3) > 0 ? 1 : 0;
  for (let i = 0; i < L; i++) {
    const u = i / (L - 1), half = Math.max(0, Math.round(hgt * Math.sin(Math.PI * Math.min(1, u * 1.15)) * 0.9)), px = Math.round(x + dir * (L / 2 - i));
    for (let j = -half; j <= half; j++) R.pset(px, y + j, j < 0 ? S : j > 0 && half > 1 ? Lz : (o.bandas && i % 3 === 1 ? S : M));
  }
  const tx = Math.round(x - dir * (L / 2 + 1)); R.pset(tx, y - 1 - bate, M); R.pset(tx, y + 1 - bate, M); R.pset(tx - dir, y - 2 - bate, S); R.pset(tx - dir, y + 2 - bate, S);
  if (L >= 6) R.pset(Math.round(x + dir * (L / 2 - 2)), y - 1 + (hgt > 2 ? 0 : 1), BF.sil);
}

// EL PULPO (exportado para el gag 3): el manto con manchas y los ojos, sentado en x, y (la base del manto), con los ocho
// brazos que se enroscan con t; o.dir 1/−1 (hacia dónde mira); o.hacia [x, y]: un brazo se estira hasta ahí (o.estira
// 0–1); o.color: 0 rojizo (por omisión) a 1 pálido (cambia de color al asustarse); o.dk: el velo de la penumbra
export function b_pulpo(R, x, y, t, o = {}) {
  const dk = o.dk || ((c) => c), dir = o.dir ?? 1, pal = o.color ? (c) => dk(b_mez(c, BF.marL, o.color * 0.6)) : dk;
  const P = pal(BF.pulpo), PS = pal(BF.pulpoS), PL = pal(BF.pulpoL);
  // los brazos: cuatro a cada lado, gruesos en la raíz y con ventosas claras
  for (let k = 0; k < 8; k++) {
    const lado = k < 4 ? -1 : 1, j = k % 4, a0 = lado * (0.35 + j * 0.32), Lb = 11 + (j === 1 ? 3 : 0), estira = o.hacia && k === (dir > 0 ? 6 : 1) ? (o.estira ?? 1) : 0;
    let px = x + lado * (1 + j * 0.6), py = y - 1;
    for (let i = 1; i <= Lb; i++) {
      const u = i / Lb, cur = a0 + lado * u * 1.6 * Math.sin(t * 1.4 + k * 0.9) + lado * u * u * 1.4;
      let nx = px + Math.sin(cur) * 1.2, ny = py + Math.cos(cur) * 0.55 + (u < 0.4 ? 0.35 : -0.15);
      if (estira > 0) { const tx = x + (o.hacia[0] - x) * u, ty = y - 1 + (o.hacia[1] - y + 1) * u + Math.sin(u * 9 + t * 6) * 1.2 * (1 - u); nx = nx + (tx - nx) * estira; ny = ny + (ty - ny) * estira; }
      const g = u < 0.35 ? 2 : u < 0.7 ? 1 : 0;
      for (let w = 0; w < g; w++) R.pset(Math.round(nx), Math.round(ny) - w, w ? P : PS);
      if (!g) R.pset(Math.round(nx), Math.round(ny), P);
      if (g && i % 2 === 0) R.pset(Math.round(nx), Math.round(ny) + 1, PL);
      px = nx; py = ny;
    }
  }
  // el manto (la «cabeza»), que respira
  const r = Math.sin(t * 2.2) > 0 ? 0 : 1, mx = x - dir * 2, my = y - 6 - r;
  R.disco(mx, my + 1, 5, PS); R.disco(mx, my, 5, P); R.disco(mx - dir * 1, my - 2, 3, PL);
  for (const [i, j] of [[-2, 1], [2, -1], [0, 3], [-3, -2], [3, 2]]) R.pset(mx + i, my + j, PS);
  R.rect(x - 4, y - 3, x + 4, y - 1, P); R.rect(x - 4, y - 1, x + 4, y - 1, PS);
  // los ojos, con la pupila en raya
  for (const e of [-2, 2]) { const ex = x + e + dir; R.pset(ex, y - 4, pal(BF.ojo)); R.pset(ex + 1, y - 4, pal(BF.ojo)); R.pset(ex + (dir > 0 ? 1 : 0), y - 4, dk(BF.sil)); R.pset(ex, y - 5, PL); R.pset(ex + 1, y - 5, PL); }
}

// ESTATUA DE BRONCE (local: pies del pedestal en 0, 0; y hacia abajo): pedestal con moldura, túnica larga con pliegues
// de piedra y el manto cruzado, el brazo izquierdo doblado hacia arriba con la mano abierta (parece que saluda), el otro
// en la cadera, y la cabeza lisa de pelo rizado, sin cara; part(lx, ly) devuelve la pieza o null
function b_estatuaParte(lx, ly) {
  const a = Math.abs(lx);
  if (ly <= 0.5 && ly > -3 && a <= 9) return 'ped';
  if (ly <= -3 && ly > -9 && a <= 7.6) return 'ped';
  if (ly <= -9 && ly > -11 && a <= 9) return 'pedA';
  if (b_seg(lx, ly, -5, -35.5, -12, -39)[0] <= 1.9 || b_seg(lx, ly, -12, -39, -13.5, -49)[0] <= 1.7) return 'bra';
  if (Math.hypot(lx + 13.6, ly + 51) <= 2.3 || b_seg(lx, ly, -14.6, -51, -15.4, -55)[0] <= 0.6 || b_seg(lx, ly, -13.4, -52, -13.2, -56)[0] <= 0.6 || b_seg(lx, ly, -12.2, -51, -11.4, -54.5)[0] <= 0.6) return 'mano';
  if (b_seg(lx, ly, 5.2, -35.5, 9, -30)[0] <= 1.7 || b_seg(lx, ly, 9, -30, 5.6, -26.5)[0] <= 1.6) return 'bra';
  if (ly <= -11 && ly > -28 && a <= 6.4 - (-11 - ly) * 0.07) return 'tun';
  if (ly <= -28 && ly > -38 && a <= 5 + (ly < -35 ? 1 : 0)) return 'tun';
  if (ly <= -38 && ly > -41.5 && a <= 1.7) return 'cue';
  const e = (lx / 3.3) ** 2 + ((ly + 44.6) / 3.8) ** 2;
  if (e <= 1) return ly < -45.5 || (lx > 1.6 && ly < -43) ? 'pelo' : 'cab';
  return null;
}

const b_EST = { x: 226, y: 158, ang: 0.2 };

// el bronce antiguo: pardo oscuro con manchas de verdín (no el verde liso de una estatua moderna)
const b_BRZ = ['#1e1610', '#3a2c1e', '#5a4428', '#806236', '#b08a4a'].map(hex);

function b_bronceViejo(f, x, y) {
  const n = b_ruido(x / 6, y / 5, 105) + (h(x, y, 106) - 0.5) * 0.12, c = n > 0.55 ? b_tono(BF.VER, f + 0.3, x, y) : b_tono(b_BRZ, f, x, y);
  const hh = h(x, y, 104); return hh > 0.965 ? BF.broL : hh > 0.95 ? BF.conc : c;
}

// pinta la estatua de bronce (o su silueta con sil)
function b_estatua(R, sil) {
  b_forma(R, b_EST.x, b_EST.y, b_EST.ang, [-18, -58, 12, 1], (lx, ly, x, y) => {
    const p = b_estatuaParte(lx, ly); if (!p) return null; if (sil) return BF.sil;
    let f = 2.3 - lx / 6.5 + (b_ruido(x / 2.5, y / 2.5, 101) - 0.5) * 1.1;
    if (p === 'ped' || p === 'pedA') { f = p === 'pedA' ? 3 : 1.8 - lx / 10 + (h(x, y, 102) - 0.5) * 0.6; if (p === 'ped' && ly > -3.6 && ly < -2.4) f -= 1.4; return b_tono(BF.VER, f, x, y); }
    if (p === 'tun') { const pl = Math.abs(((lx + 30 + (ly < -28 ? 0 : (ly + 11) * 0.06)) % 3) - 1.5); if (pl < 0.45) f -= 1.2; else if (pl > 1.2) f += 0.5; if (Math.abs(ly + 31 + lx * 0.8) < 0.6 || Math.abs(ly + 24 + lx * 0.8) < 0.5) f -= 1.3; if (ly > -13) f -= 0.6; }
    if (p === 'pelo') f = ((Math.round(lx * 1.3) + Math.round(ly * 1.3)) & 1) ? 1.4 : 2.8;
    if (p === 'cue') f -= 0.8;
    if (p === 'mano') f += 0.4;
    return b_bronceViejo(f, x, y);
  }, sil ? null : b_BRZ[0]);
}

// EL CABALLO DE BRONCE (local: el suelo bajo la panza en 0, 0; mira a la derecha), con la crin de cresta labrada
const b_CAB = { x: 96, y: 131, ang: -0.12 };

function b_caballoParte(lx, ly) {
  if ((lx / 15) ** 2 + ((ly + 16) / 7) ** 2 <= 1 || ((lx - 10) / 7) ** 2 + ((ly + 17) / 7) ** 2 <= 1 || ((lx + 11) / 7) ** 2 + ((ly + 17) / 7) ** 2 <= 1) return 'cue';
  const [dc, uc] = b_seg(lx, ly, 11, -21, 17.5, -30); if (dc <= 5 - uc * 1.2) return b_seg(lx, ly, 8.4, -24.5, 14, -34.5)[0] <= 1.5 ? 'crin' : 'cue';
  const [dh, uh] = b_seg(lx, ly, 17.5, -31, 25.5, -24.5); if (dh <= 3.6 - uh * 1.3) return 'cab';
  if (b_seg(lx, ly, 16, -34, 16.5, -37.5)[0] <= 1) return 'cab';
  if (b_seg(lx, ly, 14.5, -35, 8.4, -24.5)[0] <= 1.6) return 'crin';
  for (const [a, b, c, d] of [[-11, -11, -12, 0], [-6, -10, -4, 0], [8, -10, 9, 0], [12, -11, 15, -2]]) if (b_seg(lx, ly, a, b, c, d)[0] <= 2) return 'pata';
  if (b_seg(lx, ly, -16, -18, -19, -8)[0] <= 1.5) return 'cola';
  return null;
}

function b_caballo(R, sil) {
  b_forma(R, b_CAB.x, b_CAB.y, b_CAB.ang, [-22, -40, 29, 1], (lx, ly, x, y) => {
    const p = b_caballoParte(lx, ly); if (!p) return null; if (sil) return BF.sil;
    let f = 2.7 - (ly + 22) / 11 + (b_ruido(x / 2.5, y / 2.5, 111) - 0.5) * 1.1 - lx * 0.02;
    if (p === 'crin') f = ((Math.round(lx + ly * 0.4)) & 1) ? 1 : 2.6;
    if (p === 'pata' || p === 'cola') f -= 0.6;
    if (p === 'cab' && Math.hypot(lx - 19.5, ly + 29.5) < 0.9) f = 0.3;
    return b_bronceViejo(f, x, y);
  }, sil ? null : b_BRZ[0]);
}

// LA ESTATUA DE MÁRMOL tumbada (local: el centro; el plinto a la derecha, la cabeza lisa con su moño a la izquierda),
// envuelta en el manto de pliegues largos, picada por el mar y con manchas de algas
const b_MAR = { x: 152, y: 134, ang: 0.06, e: 1.25 };

function b_marmolParte(lx, ly) {
  if (lx >= 17 && lx <= 23 && ly >= -13 && ly <= 1) return 'ped';
  const top = -7 - 2 * Math.exp(-(((lx + 6) / 6) ** 2)) - 1.4 * Math.exp(-(((lx - 9) / 5) ** 2));
  if (lx >= -17 && lx < 17 && ly >= top && ly <= 0.5) return 'man';
  if (((lx + 20.5) / 3.6) ** 2 + ((ly + 4.6) / 3.8) ** 2 <= 1) return 'cab';
  if (Math.hypot(lx + 23.6, ly + 6) <= 1.9) return 'pelo';
  return null;
}

function b_marmol(R, sil) {
  const E = b_MAR.e;
  b_forma(R, b_MAR.x, b_MAR.y, b_MAR.ang, [-26 * E, -14 * E, 24 * E, 2 * E], (lx, ly, x, y) => {
    lx /= E; ly /= E; const p = b_marmolParte(lx, ly); if (!p) return null; if (sil) return BF.sil;
    let f = 2.4 - (ly + 8) / 6 + (b_ruido(x / 3, y / 3, 121) - 0.5) * 0.9;
    if (p === 'man') { const pl = Math.abs(((ly + lx * 0.12 + 40) % 2.7) - 1.35); if (pl < 0.4) f -= 1.1; if (lx > 14) f -= 0.5; }
    if (p === 'ped') { f = 2.2 - (lx - 17) / 5 + (ly > -1 ? -1 : 0); if (Math.abs(lx - 18.5) < 0.5) f -= 1; }
    if (p === 'pelo') f -= 0.8;
    let c = b_tono(BF.MAR, f, x, y);
    if (b_ruido(x / 4, y / 3, 122) > 0.68) c = b_mez(c, BF.alga, 0.5);
    if (h(x, y, 123) > 0.9) c = b_mez(c, BF.marSS, 0.6);
    return c;
  }, sil ? null : hex('#16222c'));
}

// las alturas del fondo: la arena de atrás, las dos crestas de arrecife lejanas
const b_sb = (x) => 119 + 3 * Math.sin(x * 0.045 + 0.5) + 2 * Math.sin(x * 0.13);

const b_ACANT = [[0, 30], [10, 31], [20, 37], [28, 47], [33, 60], [42, 68], [48, 84], [54, 92], [60, 108], [70, 118], [78, 132], [84, 146], [76, 158], [0, 160]];

// el naufragio fijo (lo que no se mueve): agua, arrecifes, acantilado, arena, casco, carga y estatuas; devuelve la
// máscara de la arena (para las cáusticas)
function b_naufFijo(R, buf) {
  const { pset, linea, poligono, disco } = R;
  // el agua: la rampa de azules con bandas suaves de luz difusa
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, b_tono(BF.AGUA, y / 166 * 6 + (b_ruido(x / 46, y / 12, 3) - 0.5) * 0.9, x, y));
  // las dos crestas de arrecife lejanas, en la bruma (más claras arriba, donde les da la luz)
  const cresta = (fy, a, mez, k) => { for (let x = 0; x < 320; x++) { const y0 = Math.round(fy(x)); for (let y = y0; y < 150; y++) { const n = b_ruido(x / 5, y / 4, k), d = y - y0; pset(x, y, b_mez(buf[y * 320 + x], d < 2 ? BF.rocaLL : n > 0.62 ? BF.rocaS : BF.roca, d < 2 ? mez * 0.7 : mez + (n - 0.5) * 0.08)); } } };
  cresta((x) => 92 + 9 * Math.sin(x * 0.021 + 1.3) + 5 * Math.sin(x * 0.067 + 0.4) + 3 * b_ruido(x / 6, 0, 7), 0, 0.16, 8);
  cresta((x) => 106 + 7 * Math.sin(x * 0.033 + 2.1) + 4 * Math.sin(x * 0.09 + 1) + 3 * b_ruido(x / 5, 2, 9), 0, 0.3, 10);
  // matas lejanas de posidonia sobre la segunda cresta
  for (let x = 90; x < 320; x += 2) { const y0 = Math.round(106 + 7 * Math.sin(x * 0.033 + 2.1) + 4 * Math.sin(x * 0.09 + 1) + 3 * b_ruido(x / 5, 2, 9)); if (h(x, 1, 11) > 0.55) linea(x, y0, x + (h(x, 2) > 0.5 ? 1 : 0), y0 - 2 - Math.round(h(x, 3) * 3), b_mez(BF.pos1, BF.AGUA[4], 0.45)); }
  // la arena: más azul al fondo y más clara delante, con ondas que se abren con la cercanía, conchas y piedrecitas
  const arena = new Uint32Array(320 * 180);
  for (let x = 0; x < 320; x++) for (let y = Math.round(b_sb(x)); y < 180; y++) {
    const d = (y - 118) / 62, n = b_ruido(x / 8, y / 4, 21), p = 2.6 + d * 4.5, fa = (y + 2.2 * Math.sin(x * 0.06 + y * 0.2)) / p, fr = fa - Math.floor(fa);
    let f = 1.2 + d * 1.7 + (n - 0.5) * 0.8; if (fr < 0.18) f -= 0.9; else if (fr < 0.34) f += 0.6;
    let c = b_tono(BF.ARENA, f, x, y); const hh = h(x, y, 22);
    if (hh > 0.988) c = BF.arenaLL; else if (hh > 0.978) c = BF.arenaSS;
    if (d < 0.35) c = b_mez(c, BF.AGUA[4], 0.38 * (1 - d / 0.35));
    pset(x, y, c); arena[y * 320 + x] = c;
  }
  // la pradera de posidonia del fondo (la base; las hojas que se mueven van encima)
  for (let x = 60; x < 320; x++) { if (b_ruido(x / 9, 0, 31) < 0.36) continue; const yb = Math.round(b_sb(x)) + 3, hh = 3 + Math.round(7 * b_ruido(x / 4, 1, 32)); for (let i = 0; i < hh; i++) pset(x + (i > hh * 0.6 && x % 3 === 0 ? 1 : 0), yb - i, b_mez(b_tono(BF.POS, i / hh * 2.6 + (x % 2) * 0.4, x, yb - i), BF.AGUA[4], 0.3)); }
  // el acantilado: estratos, grietas, la luz por arriba y el contorno
  poligono(b_ACANT, (x, y) => { const n = b_ruido(x / 7, y / 5, 11), st = (y + 6 * n + x * 0.12) % 11; let f = 2.1 + (n - 0.5) * 2 - (y - 30) / 130 * 0.9 - x / 160; if (st < 1.1) f = 0.2; else if (st < 2.6) f += 1; return b_tono(BF.ROCA, f, x, y); });
  for (let i = 0; i + 1 < b_ACANT.length - 1; i++) linea(b_ACANT[i][0], b_ACANT[i][1], b_ACANT[i + 1][0], b_ACANT[i + 1][1], BF.rocaLL);
  for (let i = 0; i + 1 < b_ACANT.length - 1; i++) linea(b_ACANT[i][0] + 1, b_ACANT[i][1] + 1, b_ACANT[i + 1][0] + 1, b_ACANT[i + 1][1] + 1, BF.rocaL);
  // las esponjas, las anémonas y los gusanos de tubo del acantilado
  for (const [x, y, r, c, q] of [[12, 52, 3, 'esN', 1], [24, 64, 2, 'esA', 2], [30, 82, 3, 'esM', 0], [14, 94, 4, 'esN', 1], [40, 100, 2, 'esA', 2], [26, 114, 3, 'esA', 0], [50, 118, 3, 'esM', 1], [8, 124, 2, 'esM', 2], [62, 134, 4, 'esN', 1], [36, 140, 2, 'esN', 2], [18, 148, 3, 'esA', 1], [70, 148, 2, 'esM', 0], [44, 76, 2, 'esN', 2]]) b_esponja(R, x, y, r, BF[c], undefined, q);
  for (const [x, y] of [[6, 70], [36, 90], [56, 124], [28, 128], [46, 150]]) b_erizo(R, x, y, 0);
  // el casco hundido: la tablazón del lado de allá (rota), las cuadernas, la carga y la regala de este lado medio enterrada
  const cx = 232, cy = 146, rx = 86, ry = 16;
  for (let x = cx - rx + 2; x <= cx + rx; x++) { const u = (x - cx) / rx, yt = Math.round(cy - ry * Math.sqrt(Math.max(0, 1 - u * u))); for (let y = yt; y < cy + ry * Math.sqrt(Math.max(0, 1 - u * u)); y++) pset(x, y, b_mez(buf[y * 320 + x], BF.lodo, 0.32)); }
  for (let x = cx - rx + 6; x <= cx + rx - 2; x++) { const u = (x - cx) / rx, yt = Math.round(cy - ry * Math.sqrt(Math.max(0, 1 - u * u))); if (b_ruido(x / 7, 0, 141) < 0.3) continue; const alto = 2 + Math.round(4 * b_ruido(x / 5, 1, 142)); for (let j = 0; j < alto; j++) pset(x, yt - j, BF.MAD[j === alto - 1 ? 3 : (j % 3 === 0 ? 0 : 1 + (x & 1))]); if (x % 13 === 0) pset(x, yt - 1, BF.madS); }
  // las cuadernas del lado de allá: maderos curvos rotos a distintas alturas
  for (let i = 0; i < 11; i++) { const x = 156 + i * 15 + Math.round(h(i, 1, 143) * 4), u = (x - cx) / rx, yb = Math.round(cy - ry * Math.sqrt(Math.max(0, 1 - u * u))) + 2, top = yb - 8 - Math.round(h(i, 2, 143) * 14);
    for (let y = top; y <= yb; y++) { const xx = x + Math.round((yb - y) * 0.12 * (u < 0 ? -1 : 1)), roto = y === top && (i & 1); pset(xx - 1, y, roto ? BF.madS : BF.madL); pset(xx, y, BF.mad); pset(xx + 1, y, BF.madN); pset(xx + 2, y, BF.madS); if (h(xx, y, 144) > 0.86) pset(xx, y, BF.madS); }
    pset(x - 1, top - 1, BF.madN); pset(x + 1, top - 1, BF.madS); }
  // la carga: tres filas de ánforas tumbadas, unas de pie, alguna rota, y dos vasos de vidrio
  for (let i = 0; i < 12; i++) b_anfora(R, 176 + i * 11 + Math.round(h(i, 1, 151) * 3), 134 + Math.round(h(i, 2, 151) * 2), -0.22 + h(i, 3, 151) * 0.2, 17);
  for (let i = 0; i < 9; i++) b_anfora(R, 186 + i * 13 + Math.round(h(i, 1, 152) * 3), 142, 0.15 - h(i, 3, 152) * 0.35, 20, { rota: i === 3 || i === 7 ? 0.25 : 0 });
  for (const [x, y, a] of [[292, 136, -1.45], [300, 138, -1.62], [284, 140, -1.5]]) b_anfora(R, x, y, a, 18);
  for (const [x, y, a, L, r] of [[252, 152, 0.5, 22, 0], [298, 150, -0.2, 22, 0.3], [178, 152, -0.35, 20, 0], [160, 156, 0.2, 18, 0.35]]) b_anfora(R, x, y, a, L, { rota: r });
  for (const [x, y] of [[196, 155], [206, 157]]) { for (let i = -3; i <= 3; i++) for (let j = 0; j <= 3; j++) if (Math.abs(i) <= 3 - (j > 2 ? 1 : 0)) pset(x + i, y - 3 + j, b_mez(R.pget(x + i, y - 3 + j), BF.vidrio, j === 0 || Math.abs(i) === 3 ? 0.65 : 0.25)); pset(x - 2, y - 2, BF.blanco); pset(x, y + 1, BF.vidrio); }
  // la regala de este lado: un madero largo medio enterrado, con montoncitos de arena encima
  for (let x = 150; x < 318; x++) { const u = (x - cx) / rx, y = Math.round(cy + ry * Math.sqrt(Math.max(0, 1 - u * u))) - 1; if (b_ruido(x / 6, 3, 145) < 0.33) { pset(x, y, BF.arenaL); pset(x, y + 1, BF.arena); continue; } pset(x, y - 1, BF.madL); pset(x, y, BF.mad); pset(x, y + 1, BF.madS); }
  // unas piedras y conchas en la arena de delante
  for (let k = 0; k < 16; k++) { const x = 20 + Math.round(h(k, 1, 161) * 280), y = 150 + Math.round(h(k, 2, 161) * 28); if (h(k, 3, 161) > 0.5) { disco(x, y, 1, BF.rocaS); pset(x - 1, y - 1, BF.rocaL); } else { pset(x, y, BF.arenaLL); pset(x + 1, y, BF.marL); pset(x, y + 1, BF.arenaS); } }
  // la máscara de la arena: donde sigue viéndose la arena (ahí corren las cáusticas)
  const m = new Uint8Array(320 * 180); for (let i = 0; i < m.length; i++) m[i] = arena[i] !== 0 && buf[i] === arena[i] ? 1 : 0;
  return m;
}

// las tres estatuas en su capa (van por delante de la posidonia que ondea): el caballo hundido hasta las rodillas en
// su montón de arena, el mármol tumbado y la de bronce
function b_naufEstatuas(R, buf) {
  buf.fill(b_VACIO); b_caballo(R);
  R.poligono([[75, 131], [84, 126], [92, 128], [100, 125], [110, 129], [118, 134], [75, 135]], (x, y) => b_tono(BF.ARENA, 1.2 + (y - 125) / 9 + (b_ruido(x / 3, y, 24) - 0.5), x, y));
  R.linea(84, 126, 100, 125, BF.arenaL);
  b_marmol(R); b_estatua(R);
}

// las siluetas de las estatuas (la penumbra): negro con un halo tramado, en un búfer aparte con un color de «vacío»
const b_VACIO = 0x01020304;

function b_naufSiluetas(R, buf) {
  buf.fill(b_VACIO); b_caballo(R, true); b_marmol(R, true); b_estatua(R, true);
  for (let y = 84; y < 166; y++) for (let x = 72; x < 250; x++) { if (buf[y * 320 + x] !== b_VACIO) continue; let n = 0; for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0]]) if (buf[(y + j) * 320 + x + i] === BF.sil) n++; if (n && (x + y) % 2 === 0) buf[y * 320 + x] = BF.halo; }
}

// las cáusticas: una red de luz que corre por la arena
function b_causticas(R, t, mask, y0, y1, fuerza) {
  for (let y = y0; y < y1; y++) for (let x = 0; x < 320; x++) {
    if (!mask[y * 320 + x]) continue;
    const v = Math.sin(x * 0.16 + t * 1.2 + Math.sin(y * 0.35 + t * 0.9) * 1.6) + Math.sin(y * 0.42 - t * 1.0 + Math.sin(x * 0.1 - t * 0.7) * 1.8);
    if (v > 1.45) R.pset(x, y, b_mez(R.pget(x, y), BF.rayo, (v > 1.75 ? 0.36 : 0.2) * fuerza));
  }
}

// un rayo de luz: una banda que baja de arriba (x0 arriba, x1 abajo), ancho w, que aclara lo que toca; empieza a verse
// bajo y 22 (la barra del año) y se apaga hacia y1
function b_rayo(R, xa, xb, ya, yb, w, a) {
  for (let y = Math.max(22, ya); y < yb; y++) {
    const u = (y - ya) / (yb - ya), cx = xa + (xb - xa) * u, ww = w * (0.7 + u * 0.6), fa = a * Math.min(1, (y - 22) / 26) * (u > 0.8 ? (1 - u) / 0.2 : 1);
    for (let x = Math.max(0, Math.floor(cx - ww)); x <= Math.min(319, Math.ceil(cx + ww)); x++) {
      if (x > 272 && y < 50) continue;
      const d = 1 - Math.abs(x - cx) / ww; if (d <= 0) continue;
      const k = fa * d * (d > 0.5 ? 1 : 0.6); if (k > b_bay(x, y) * 0.08) R.pset(x, y, b_mez(R.pget(x, y), BF.rayo, k));
    }
  }
}

// una gorgonia (abanico rojo de ramas finas con puntas amarillas) que se mece
function b_gorgonia(R, x, y, t, s, dk) {
  for (let k = 0; k < 6; k++) {
    const a0 = -1.25 + k * 0.5 * 0.9 - 0.2, L = s * (0.75 + h(k, 1, 171) * 0.4);
    let px = x, py = y;
    for (let i = 1; i <= L; i++) { const u = i / L, nx = x + Math.sin(a0 + u * 0.3) * i + Math.sin(t * 1.1 + k) * 1.4 * u * u, ny = y - Math.cos(a0) * i; R.linea(Math.round(px), Math.round(py), Math.round(nx), Math.round(ny), dk(u > 0.85 ? BF.gorgL : BF.gorg)); if (i === Math.round(L * 0.5)) { R.linea(Math.round(nx), Math.round(ny), Math.round(nx + Math.sin(a0 + 0.5) * L * 0.35 + Math.sin(t * 1.1 + k) * u), Math.round(ny - L * 0.3), dk(BF.gorg)); } px = nx; py = ny; }
  }
}

// EL NAUFRAGIO: la capa fija, la luz, la vida, la penumbra y las siluetas
function b_naufragio(R, t, o) {
  const s = Math.max(0, Math.min(1, o.siluetas ?? 0)), luz = (o.luz ?? 1) * (1 - 0.82 * s), dk = (c) => c;
  const fijo = b_capa(R, 'ak-nauf', (b) => b_naufFijo(R, b));
  R.copiar(fijo.b);
  b_causticas(R, t, fijo.extra, 116, 180, luz);
  // la vida lejana: un pez grande que cruza en la bruma
  { const x = ((t * 7 + 40) % 420) - 50; b_pez(R, Math.round(x), 84 + Math.round(Math.sin(t * 0.4) * 3), 1, 16, t * 0.5, [b_mez(BF.pezS, BF.AGUA[3], 0.6), b_mez(BF.pez, BF.AGUA[3], 0.65), b_mez(BF.pezL, BF.AGUA[3], 0.65)]); }
  // la posidonia del fondo y las matas de la arena, que ondean
  for (let x = 64; x < 320; x += 7) { const yb = Math.round(b_sb(x)) + 4; if (b_ruido(x / 9, 0, 31) < 0.4) continue; for (let j = 0; j < 3; j++) b_hoja(R, x + j * 2, yb, 7 + Math.round(h(x, j, 181) * 7), t, x * 3 + j, 1, (c) => b_mez(c, BF.AGUA[4], 0.22)); }
  for (const [x, y, n] of [[96, 152, 4], [134, 160, 5], [30, 170, 4], [172, 172, 3], [118, 176, 3]]) for (let j = 0; j < n; j++) b_hoja(R, x + j * 2 - n, y, 9 + Math.round(h(x, j, 182) * 8), t, x + j * 7, 1, dk);
  // las cáusticas en la arena y los rayos de luz que bajan y se mueven
  for (let k = 0; k < 5; k++) {
    const xa = [26, 82, 138, 186, 232][k] + Math.sin(t * 0.23 + k * 1.7) * 9, ab = 0.16 + 0.07 * Math.sin(t * 0.6 + k * 2.3);
    b_rayo(R, xa, xa + 44 + Math.sin(t * 0.31 + k) * 6, 0, 150 + k * 4, 6 + (k % 3) * 2 + Math.sin(t * 0.5 + k) * 1.5, ab * luz);
  }
  // las gorgonias y las castañuelas del acantilado
  { const est = b_capa(R, 'ak-nauf-est', (b) => b_naufEstatuas(R, b)).b; for (let y = 84; y < 166; y++) for (let x = 70; x < 250; x++) { const c = est[y * 320 + x]; if (c !== b_VACIO && c !== 0) R.pset(x, y, c); } }
  b_gorgonia(R, 36, 66, t, 12, dk); b_gorgonia(R, 58, 108, t, 10, dk); b_gorgonia(R, 14, 136, t, 9, dk);
  for (let k = 0; k < 10; k++) { const x = 40 + Math.round(h(k, 1, 191) * 50 + Math.sin(t * 0.9 + k * 2) * 6), y = 72 + Math.round(h(k, 2, 191) * 44 + Math.sin(t * 1.3 + k) * 3), d = Math.cos(t * 0.9 + k * 2) > 0 ? 1 : -1; b_pez(R, x, y, d, 4, t + k, [BF.castS, hex('#24304a'), hex('#34405a')]); }
  // el banco de peces plateados que gira en el agua y tres sargos
  { const cx = 160 + 105 * Math.sin(t * 0.13), cy = 68 + 10 * Math.sin(t * 0.21), dir = Math.cos(t * 0.13) >= 0 ? 1 : -1;
    for (let k = 0; k < 18; k++) { const x = Math.round(cx + (h(k, 1, 201) - 0.5) * 60 + Math.sin(t * 1.7 + k) * 2), y = Math.round(cy + (h(k, 2, 201) - 0.5) * 20 + Math.sin(t * 2.1 + k * 1.3) * 1.5); if (x > 268 && y < 50) continue; b_pez(R, x, y, dir, 5, t + k, [BF.pezS, BF.pez, BF.pezL]); if (Math.sin(t * 3 + k) > 0.92) R.pset(x, y, BF.blanco); } }
  for (let k = 0; k < 3; k++) { const v = 9 + k * 3, x = ((t * v + k * 140) % 400) - 40, d = k === 1 ? -1 : 1; b_pez(R, Math.round(d > 0 ? x : 320 - x), 102 + k * 9 + Math.round(Math.sin(t + k) * 2), d, 10, t + k, [BF.pezS, hex('#b8c8d0'), BF.pezL], { bandas: true }); }
  // el pulpo, sobre el ánfora junto a la estatua
  if (o.pulpo !== false) b_pulpo(R, 262, 147, t, { dir: -1 });
  b_motas(R, t, 14, 0, dk);
  // la penumbra: el velo azul noche y las siluetas confusas que tiemblan con el agua
  if (s > 0) {
    const N = BF.noche, a = 0.72 * s;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, b_mez(R.pget(x, y), N, a));
    const sil = b_capa(R, 'ak-nauf-sil', (b) => b_naufSiluetas(R, b)).b, as = Math.max(0, Math.min(1, (s - 0.25) / 0.5));
    if (as > 0) for (let y = 84; y < 166; y++) { const dx = Math.round(Math.sin(t * 1.3 + y * 0.35) * 1.2 * s); for (let x = 72; x < 250; x++) { const c = sil[y * 320 + x - dx]; if (c !== b_VACIO && c !== 0 && b_bay(x, y) < as) R.pset(x, y, c); } }
  }
  const P = (lx, ly, e) => { const c = Math.cos(e.ang), sn = Math.sin(e.ang); return [Math.round(e.x + lx * c - ly * sn), Math.round(e.y + lx * sn + ly * c)]; };
  return { encuadre: 'naufragio', camara: 'general', suelo: 162, libre: [20, 250], estatua: P(-13.4, -53, b_EST), estatuaCabeza: P(0, -48.5, b_EST), estatuaPie: [b_EST.x, b_EST.y], pulpo: [262, 147], caballo: P(4, -18, b_CAB), marmol: [b_MAR.x, b_MAR.y - 6], anforas: [172, 124, 310, 158], barco: [146, 126, 318, 162] };
}

// EL TERRÓN de cerca: centro, tamaño (escala) y la grieta con la rueda
const b_TER = { x: 160, y: 117, s: 0.82, rx: 12, ry: -1 };

const b_TERPOL = [[-34, -6], [-31, -15], [-22, -20], [-8, -23], [4, -19], [15, -22], [26, -17], [33, -8], [35, 2], [31, 11], [19, 16], [1, 18], [-17, 17], [-30, 11]];

function b_terronFijo(R, buf) {
  const { pset, linea, poligono, disco } = R, S = b_TER.s, X = (lx) => b_TER.x + lx * S, Y = (ly) => b_TER.y + ly * S;
  // el agua de arriba, la bruma con el casco y la estatua lejos, y la arena que se aleja
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, b_tono(BF.AGUA, 0.6 + y / 76 * 3.6 + (b_ruido(x / 40, y / 10, 301) - 0.5) * 0.9, x, y));
  const lejos = (c) => b_mez(c, BF.AGUA[3], 0.62);
  for (let i = 0; i < 9; i++) { const x = 176 + i * 12, top = 46 + Math.round(h(i, 1, 302) * 14); for (let y = top; y < 72; y++) { pset(x, y, lejos(BF.mad)); pset(x + 1, y, lejos(BF.madN)); } }
  for (let y = 40; y < 72; y++) { const w = y < 44 ? 1 : y < 56 ? 3 : 4; for (let x = 222 - w; x <= 222 + w; x++) pset(x + Math.round((72 - y) * 0.1), y, lejos(BF.verS)); }
  linea(219, 50, 214, 36, lejos(BF.verS)); linea(220, 50, 215, 36, lejos(BF.verS));
  const arena = new Uint32Array(320 * 180), sb = (x) => 66 + 3 * Math.sin(x * 0.04 + 1) + 2 * Math.sin(x * 0.11);
  for (let x = 0; x < 320; x++) for (let y = Math.round(sb(x)); y < 180; y++) {
    const d = (y - 66) / 114, p = 2 + d * 9, fa = (y + 3 * Math.sin(x * 0.045 + y * 0.08)) / p, fr = fa - Math.floor(fa);
    let f = 0.9 + d * 2.4 + (b_ruido(x / 10, y / 6, 303) - 0.5) * 0.9; if (fr < 0.16) f -= 0.9; else if (fr < 0.3) f += 0.6;
    let c = b_tono(BF.ARENA, f, x, y); const hh = h(x >> (d > 0.6 ? 1 : 0), y >> (d > 0.6 ? 1 : 0), 304);
    if (hh > 0.985) c = BF.arenaLL; else if (hh > 0.972) c = BF.arenaSS;
    if (d < 0.3) c = b_mez(c, BF.AGUA[3], 0.45 * (1 - d / 0.3));
    pset(x, y, c); arena[y * 320 + x] = c;
  }
  // lejos en la arena: un ánfora medio enterrada, unos tiestos y una piedra
  b_anfora(R, 198, 84, -0.18, 22, { dk: (c) => b_mez(c, BF.AGUA[3], 0.35) }); b_anfora(R, 150, 80, 0.4, 14, { rota: 0.4, dk: (c) => b_mez(c, BF.AGUA[3], 0.45) });
  poligono([[186, 88], [196, 85], [212, 88], [210, 92], [184, 92]], (x, y) => b_tono(BF.ARENA, 1.4 + (y - 85) / 6, x, y));
  for (const [x, y, r] of [[118, 92, 3], [226, 96, 2], [96, 100, 2]]) { R.disco(x, y + 1, r, BF.rocaSS); R.disco(x, y, r, BF.rocaS); R.pset(x - 1, y - r + 1, BF.rocaL); }
  // la pradera del fondo a la izquierda (la base)
  for (let x = 0; x < 150; x++) { if (b_ruido(x / 8, 0, 305) < 0.3) continue; const yb = Math.round(sb(x)) + 4, hh = 4 + Math.round(9 * b_ruido(x / 4, 1, 306)); for (let i = 0; i < hh; i++) pset(x, yb - i, b_mez(b_tono(BF.POS, i / hh * 2.6 + (x % 2) * 0.4, x, yb - i), BF.AGUA[3], 0.4)); }
  // la roca de la derecha con esponjas, erizos y conchas
  const ROC = [[238, 140], [242, 112], [252, 92], [270, 80], [292, 74], [320, 72], [320, 150], [300, 152], [270, 148]];
  poligono(ROC, (x, y) => { const n = b_ruido(x / 6, y / 5, 307), st = (y + 5 * n - x * 0.2) % 10; let f = 2.3 + (n - 0.5) * 2 - (y - 72) / 80 + (x - 240) / 160; if (st < 1) f = 0.3; else if (st < 2.4) f += 0.9; return b_tono(BF.ROCA, f, x, y); });
  for (let i = 0; i + 1 < 6; i++) { linea(ROC[i][0], ROC[i][1], ROC[i + 1][0], ROC[i + 1][1], BF.rocaLL); linea(ROC[i][0] + 1, ROC[i][1] + 1, ROC[i + 1][0] + 1, ROC[i + 1][1] + 1, BF.rocaL); }
  for (const [x, y, r, c, q] of [[262, 96, 4, 'esN', 1], [284, 88, 3, 'esA', 2], [306, 96, 5, 'esM', 0], [252, 122, 3, 'esA', 2], [292, 120, 4, 'esN', 1], [314, 132, 3, 'esA', 0], [274, 136, 3, 'esM', 2]]) b_esponja(R, x, y, r, BF[c], undefined, q);
  for (const [x, y] of [[268, 112], [300, 140], [248, 136]]) b_erizo(R, x, y, 0);
  // EL ÁNFORA GRANDE ROTA a la izquierda, su cuello caído y los tiestos
  b_anfora(R, 76, 124, 0.32, 84, { rota: 0.27 });
  b_anfora(R, 40, 154, -0.5, 60, { rota: 0 }); poligono([[14, 146], [24, 140], [70, 160], [64, 180], [10, 180]], (x, y) => b_tono(BF.ARENA, 2.7 + (b_ruido(x / 4, y / 3, 308) - 0.5), x, y));
  for (const [x, y, a] of [[118, 150, 0.4], [104, 162, -0.3], [128, 160, 1]]) poligono([[x, y], [x + 5 * Math.cos(a), y + 5 * Math.sin(a)], [x + 3, y + 3]], BF.anfS);
  // la sombra del terrón en la arena
  for (let y = Y(-4); y < Y(26); y++) for (let x = X(-30); x < X(46); x++) { const u = (x - X(10)) / (40 * S), v = (y - Y(16)) / (11 * S); if (u * u + v * v < 1) pset(x, y, b_mez(R.pget(x, y), BF.lodo, 0.35)); }
  // EL TERRÓN: verdín con costras y manchas, placas de madera negra a la izquierda, capas rotas a la derecha
  const P = b_TERPOL.map(([a, b]) => [X(a), Y(b)]);
  const dentro = (x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  for (let y = 80; y < 150; y++) for (let x = 120; x < 200; x++) {
    if (!dentro(x + 0.5, y + 0.5)) { if (dentro(x + 1.5, y + 0.5) || dentro(x - 0.5, y + 0.5) || dentro(x + 0.5, y + 1.5) || dentro(x + 0.5, y - 0.5)) pset(x, y, hex('#0e1e18')); continue; }
    const lx = (x - b_TER.x) / S, ly = (y - b_TER.y) / S, n = b_ruido(x / 3, y / 3, 311), n2 = b_ruido(x / 7, y / 6, 312);
    let f = 2.4 - (lx * 0.3 + ly * 0.9) / 14 + (n - 0.5) * 1.6, c;
    if (n2 > 0.66 && n > 0.45) f += 0.8;   // las costras abultadas
    c = b_tono(BF.VER, f, x, y);
    if (b_ruido(x / 4, y / 4, 313) > 0.72) c = b_mez(c, BF.turq, 0.45);
    if (b_ruido(x / 5, y / 3, 314) > 0.74) c = b_mez(c, BF.tierra, 0.55);
    if (h(x, y, 315) > 0.95) c = BF.conc;
    // la madera negra podrida pegada (vetas verticales, astillas)
    if (lx < -13 + 6 * b_ruido(0, ly / 5, 316) && ly > -19) { const tb = (ly + lx * 0.18 + 40) / 6.5, fr = tb - Math.floor(tb), v = (ly * 1.1 + Math.sin(lx * 0.45 + Math.floor(tb) * 2) * 0.8 + 40) % 2.2; c = fr < 0.14 ? hex('#7a6248') : fr > 0.9 ? hex('#140e0c') : v < 0.6 ? hex('#2a1e16') : b_tono([hex('#2e2219'), hex('#45331f'), hex('#5e4630')], 1.2 - lx / 50 + (n - 0.5), x, y); if (h(x, y, 317) > 0.95) c = hex('#14100c'); }
    // las capas del lado roto (como páginas pegadas)
    if (lx > 23 + 4 * b_ruido(ly / 5, 0, 318)) { const q = (lx * 0.7 + ly * 0.45 + 40) % 3.2; c = q < 0.9 ? BF.verLL : q < 1.8 ? BF.ver : BF.verSS; if (h(x, y, 319) > 0.9) c = BF.bro; }
    pset(x, y, c);
  }
  // la grieta y el hueco donde asoma la rueda
  const G = [[-6, -23], [-2, -16], [3, -11], [6, -8], [18, 8], [16, 13], [20, 17]].map(([a, b]) => [X(a), Y(b)]);
  for (let i = 0; i + 1 < G.length; i++) { linea(G[i][0], G[i][1], G[i + 1][0], G[i + 1][1], BF.lodo); linea(G[i][0] + 1, G[i][1], G[i + 1][0] + 1, G[i + 1][1], hex('#16261e')); linea(G[i][0] - 1, G[i][1] - 1, G[i + 1][0] - 1, G[i + 1][1] - 1, BF.verLL); }
  const gx = X(b_TER.rx), gy = Y(b_TER.ry), hueco = (x, y) => { const a = Math.atan2(y - gy, x - gx), r = 7.8 + 2.4 * b_ruido(a * 2 + 5, 0, 320) + (Math.abs(Math.sin(a - 0.6)) > 0.7 ? 1.5 : 0); return Math.hypot((x - gx) / 1.08, (y - gy) / 0.86) <= r; };
  const rueda = [];
  for (let y = Math.floor(gy - 13); y <= gy + 13; y++) for (let x = Math.floor(gx - 14); x <= gx + 14; x++) {
    if (!hueco(x, y)) { if (hueco(x - 1, y - 1) && !hueco(x, y)) pset(x, y, BF.verLL); continue; }
    pset(x, y, BF.lodo);
    const dx = x - gx - 1, dy = y - gy, r = Math.hypot(dx, dy), a = Math.atan2(dy, dx), fr = ((a / (Math.PI * 2)) * 18 % 1 + 1) % 1, rt = 7.4 + 2.4 * (1 - Math.abs(fr * 2 - 1));
    if (r > rt) continue;
    let k; // 0 sombra, 1 cuerpo, 2 luz, 3 brillo
    if (r > 7.4) k = dx + dy < 0 ? 2 : 1;
    else if (r > 6.3) k = dx + dy < -2 ? 3 : 2;
    else if (r < 1.6) k = 3;
    else if (r < 2.6) k = 1;
    else { const sa = ((a + Math.PI * 2) % (Math.PI / 2)) / (Math.PI / 2); k = sa < 0.22 || sa > 0.92 ? 1 : 0; if (k === 0 && r > 5.6) k = 1; }
    if (k === 0) continue;
    rueda.push(x, y, k, h(x, y, 321) > 0.82 ? 1 : 0);
  }
  // la arena que lo entierra por abajo
  poligono([[X(-36), Y(9)], [X(-26), Y(13)], [X(-12), Y(11)], [X(0), Y(15)], [X(14), Y(12)], [X(26), Y(15)], [X(37), Y(10)], [X(44), Y(22)], [X(-44), Y(22)]], (x, y) => b_tono(BF.ARENA, 2.2 + (y - Y(10)) / 14 + (b_ruido(x / 3, y / 2, 322) - 0.5) * 0.9, x, y));
  linea(X(-36), Y(9), X(-26), Y(13), BF.arenaLL); linea(X(-12), Y(11), X(0), Y(15), BF.arenaL); linea(X(14), Y(12), X(26), Y(15), BF.arenaLL);
  // conchas, una estrella de mar y piedrecitas en la arena de delante
  for (let k = 0; k < 22; k++) { const x = 10 + Math.round(h(k, 1, 331) * 300), y = 140 + Math.round(h(k, 2, 331) * 38); if (x > 120 && x < 200 && y < 150) continue; if (h(k, 3, 331) > 0.5) { disco(x, y, 1, BF.rocaS); pset(x - 1, y - 1, BF.rocaL); } else { pset(x, y, BF.arenaLL); pset(x + 1, y, BF.marL); pset(x - 1, y, BF.marS); pset(x, y + 1, BF.arenaS); } }
  for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - Math.PI / 2; linea(232, 164, Math.round(232 + Math.cos(a) * 6), Math.round(164 + Math.sin(a) * 5), hex('#b8584a')); linea(233, 164, Math.round(233 + Math.cos(a) * 5), Math.round(164 + Math.sin(a) * 4), hex('#d8885a')); }
  pset(232, 164, hex('#e8a86a'));
  const m = new Uint8Array(320 * 180); for (let i = 0; i < m.length; i++) m[i] = arena[i] !== 0 && buf[i] === arena[i] ? 1 : 0;
  return { m, rueda, gx, gy };
}

// EL TERRÓN: la capa fija, la luz que lo descubre, la rueda que brilla y la vida
function b_terron(R, t, o) {
  const b = Math.max(0, Math.min(1, o.brillo ?? 0)), dk = (c) => c;
  const fijo = b_capa(R, 'ak-terron', (bf) => b_terronFijo(R, bf)), { m, rueda, gx, gy } = fijo.extra;
  R.copiar(fijo.b);
  b_causticas(R, t, m, 64, 180, 0.8);
  // dos rayos tenues que se mueven y el rayo del hallazgo, que recorre la arena hasta el terrón
  b_rayo(R, 40 + Math.sin(t * 0.3) * 8, 70, 0, 170, 7, 0.14);
  b_rayo(R, 214 + Math.sin(t * 0.25 + 2) * 8, 250, 0, 140, 6, 0.12);
  const xb = lerp(56, gx, Math.min(1, b * 1.35)); b_rayo(R, xb - 36, xb, 0, gy + 14, 10 + b * 2, 0.12 + 0.2 * b);
  // la rueda: de bronce apagado a oro
  const D = [null, hex('#4a3e26'), hex('#6e5a32'), hex('#8a7040')], L = [null, C.bronceS, C.bronce, C.bronceL];
  const luzR = Math.min(1, b * 1.2);
  for (let i = 0; i < rueda.length; i += 4) { const k = rueda[i + 2], c = b_mez(D[k], L[k], luzR); R.pset(rueda[i], rueda[i + 1], rueda[i + 3] && luzR < 0.6 ? b_mez(c, BF.ver, 0.6) : c); }
  if (b > 0.75) { const p = 0.5 + 0.5 * Math.sin(t * 7), sx = Math.round(gx - 5), sy = Math.round(gy - 6), r = 2 + Math.round(p * 3 * (b - 0.75) * 4);
    for (let k = 1; k <= r; k++) { R.pset(sx + k, sy, BF.blanco); R.pset(sx - k, sy, BF.blanco); R.pset(sx, sy + k, BF.blanco); R.pset(sx, sy - k, BF.blanco); } R.pset(sx, sy, BF.blanco); R.pset(sx + 1, sy + 1, hex('#fff0b0')); R.pset(sx - 1, sy - 1, hex('#fff0b0')); }
  // la posidonia de atrás, los gusanos de abanico de la roca y los peces
  for (let x = 4; x < 150; x += 6) { if (b_ruido(x / 8, 0, 305) < 0.35) continue; const yb = Math.round(66 + 3 * Math.sin(x * 0.04 + 1) + 2 * Math.sin(x * 0.11)) + 5; for (let j = 0; j < 3; j++) b_hoja(R, x + j * 2, yb, 9 + Math.round(h(x, j, 341) * 8), t, x * 5 + j, 1, (c) => b_mez(c, BF.AGUA[3], 0.3)); }
  for (const [x, y, k] of [[258, 108, 0], [296, 106, 1], [280, 128, 2]]) { const ab = 0.6 + 0.4 * Math.sin(t * 1.3 + k * 2); R.linea(x, y, x, y - 4, BF.conc); for (let i = -3; i <= 3; i++) R.linea(x, y - 4, Math.round(x + i * ab * 1.2), Math.round(y - 5 - (3 - Math.abs(i)) * ab), i & 1 ? hex('#e0d0a0') : hex('#c8784a')); }
  for (let k = 0; k < 4; k++) { const x = 190 + Math.round(h(k, 1, 351) * 60 + Math.sin(t * 0.8 + k * 2) * 10), y = 60 + Math.round(h(k, 2, 351) * 30 + Math.sin(t * 1.2 + k) * 3), d = Math.cos(t * 0.8 + k * 2) > 0 ? 1 : -1; b_pez(R, x, y, d, 5, t + k, [BF.castS, hex('#24304a'), hex('#3a4660')]); }
  { const x = Math.round(lerp(60, 108, 0.5 + 0.5 * Math.sin(t * 0.35))), y = 168, salto = Math.max(0, Math.sin(t * 2.4)) > 0.95 ? 1 : 0; b_pez(R, x, y - salto, Math.cos(t * 0.35) > 0 ? 1 : -1, 7, 0, [hex('#6a6a5a'), hex('#a09a80'), hex('#c8c0a0')]); }
  // el cangrejo ermitaño que cruza por delante con su caracola
  { const x = Math.round(300 - (t * 4) % 150), y = 158, p = Math.floor(t * 6) % 2;
    R.disco(x + 2, y - 3, 3, hex('#c8b8a0')); R.disco(x + 2, y - 3, 2, hex('#a8907a')); R.pset(x + 2, y - 3, hex('#6a5a4a')); R.pset(x + 3, y - 4, hex('#e8dcc8'));
    R.rect(x - 2, y - 2, x, y - 1, hex('#c0503a')); R.pset(x - 3, y - 3, hex('#e07050')); R.pset(x - 2, y - 4, BF.sil); R.pset(x - 1, y - 4, BF.sil);
    for (let i = 0; i < 3; i++) R.pset(x - 2 + i, y + ((i + p) & 1), hex('#a8402e')); }
  b_motas(R, t, 12, 0, dk);
  const S = b_TER.s;
  return { encuadre: 'naufragio', camara: 'terron', suelo: 180, libre: [0, 0], terron: [b_TER.x, b_TER.y], rueda: [Math.round(gx), Math.round(gy)], mano: [Math.round(b_TER.x - 33 * S), Math.round(b_TER.y - 2 * S)] };
}

const c_vistaMuseo = (o) => { const enc = V_MUSEO[o.encuadre] ? o.encuadre : 'sala1902', e = V_MUSEO[enc]; return [enc, o.camara === e.cam ? e.cam : 'general']; };

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function c_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara (o tiñe) un píxel ya pintado hacia el color [r, g, b] en la proporción m
function c_aclara(R, x, y, m, [cr, cg, cb] = [255, 236, 190]) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * m) << 16) | (Math.round(g + (cg - g) * m) << 8) | Math.round(r + (cr - r) * m)) >>> 0);
}

// los búferes de lo fijo de cada vista: se pintan una vez y se copian en cada fotograma
const c_capas = new Map();

function c_capa(R, clave, dibuja) {
  let b = c_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.usar(prev); c_capas.set(clave, b); }
  R.copiar(b); return b;
}

// el color «hueco» que deja el búfer donde va lo que se mueve detrás (el cielo del ventanal, el pasillo de la puerta)
const c_HUECO = 0xff010203;

// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda, sombra abajo y a la derecha, y dos vetas
function c_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}

// madera vista de frente con vetas horizontales onduladas y algún nudo
function c_vetas(R, x0, y0, x1, y1, c, cS, cL, k = 0) {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0 + 1; y < y1; y += 2) { const f = h(y, 3, k); if (f < 0.35) continue; let x = x0 + Math.round(h(y, 4, k) * 10);
    while (x < x1) { const L = 5 + Math.round(h(x, y, k + 1) * 16); for (let i = 0; i < L && x + i <= x1; i++) R.pset(x + i, y + Math.round(Math.sin((x + i) * 0.12 + y) * 0.6), f > 0.8 ? cL : cS); x += L + 4 + Math.round(h(x, y, k + 2) * 10); } }
}

// el polvo que flota en un rayo de luz: un punto claro que sube y baja despacio y titila
function c_motas(R, t, n, caja, dentro, col, k = 0) {
  const [x0, y0, x1, y1] = caja;
  for (let i = 0; i < n; i++) {
    const vx = 1.2 + h(i, 1, k) * 2.4, vy = 0.8 + h(i, 2, k) * 1.6;
    const x = x0 + ((h(i, 3, k) * (x1 - x0) + t * vx + Math.sin(t * 0.7 + i) * 3) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const y = y0 + ((h(i, 4, k) * (y1 - y0) + Math.sin(t * 0.5 + i * 1.3) * 4 - t * vy * 0.4) % (y1 - y0) + (y1 - y0)) % (y1 - y0);
    if (Math.sin(t * 2.1 + i * 2.7) < -0.4) continue;
    const X = Math.round(x), Y = Math.round(y); if (!dentro(X, Y)) continue;
    R.pset(X, Y, col); if (i % 7 === 0) c_aclara(R, X + 1, Y, 0.35);
  }
}

// los colores del museo de 1902
const c_MU = {
  techo: hex('#d9c39c'), techoS: hex('#cdb48c'), corn: hex('#e2cda6'), cornS: hex('#c6ac82'), cornD: hex('#b09468'),
  pared: hex('#c4845a'), paredS: hex('#ad6e48'), paredL: hex('#d5966a'), panel: hex('#bb7c53'), panelL: hex('#e2b47c'), panelS: hex('#93593a'),
  friso: hex('#5a3626'), frisoL: hex('#e6cc9c'), zoc: hex('#55645a'), zocS: hex('#3c4a42'), zocL: hex('#7c8c7e'), zocV: hex('#9aa89a'),
  s1: hex('#e8dcc2'), s2: hex('#b9a286'), sJ: hex('#8e7c66'), sV1: hex('#cfc0a2'), sV2: hex('#a08a70'),
  marmol: hex('#ece6d8'), marmolS: hex('#bdb5a4'), marmolL: hex('#fffbf2'), marmolD: hex('#958e80'),
  bronce: hex('#7c5c34'), bronceS: hex('#4c3820'), bronceL: hex('#b89254'), verdin: hex('#4f8a6c'), verdinL: hex('#7ab89a'), verdinS: hex('#2e5a46'),
  ped: hex('#4c564f'), pedL: hex('#717e75'), pedS: hex('#323a35'),
  nogal: hex('#6a4224'), nogalL: hex('#90603a'), nogalS: hex('#482a16'), nogalV: hex('#58361c'),
  vidrio: hex('#c6d4cc'), vidrioS: hex('#9ab0a8'), terc: hex('#862a2c'), tercS: hex('#5a181c'), tercL: hex('#b04446'),
  cielo1: hex('#5c9ad8'), cielo2: hex('#86b6e4'), cielo3: hex('#c4d6e2'), cielo4: hex('#f2d8a8'),
  nubeL: hex('#fff8ec'), nube: hex('#f0dcc4'), nubeS: hex('#c8b0a8'), monte: hex('#a99cb4'), monteS: hex('#958aa4'),
  roca: hex('#c8a878'), rocaS: hex('#a08058'), templo: hex('#efe2c4'), tejado: hex('#c8684a'), casa: hex('#f0e6d4'), casaS: hex('#d0c2aa'), ciprés: hex('#3e5a3a'),
  lino: hex('#f2ece0'), linoS: hex('#d4cab6'), linoL: hex('#fffdf6'), papel: hex('#efe4c8'), papelS: hex('#cdbf9c'),
  latón: hex('#c89a3a'), latónL: hex('#f0d070'), latónS: hex('#8a6420'), gato: hex('#5a5a62'), gatoL: hex('#8a8a94'),
};

const c_GOLD = [255, 226, 160];

// el cielo de Atenas por el ventanal (solo donde el búfer dejó el hueco): degradado tramado de la tarde, monte Himeto al
// fondo, nubes de tres tonos a tres velocidades, la Acrópolis con el Partenón, casas blancas y cipreses, y golondrinas
function c_cieloAtenas(R, t, b, x0, y0, x1, y1, frio = 0) {
  const M = c_MU, hueco = (x, y) => b[y * 320 + x] === c_HUECO;
  const nubes = [[0, 44, 16, 2.2], [1, 58, 11, 3.6], [2, 70, 13, 5.2]];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (!hueco(x, y)) continue;
    const u = (y - y0) / (y1 - y0), d = ((x * 3 + y * 5) % 7) / 7 * 0.12;
    let c = u + d < 0.3 ? M.cielo1 : u + d < 0.55 ? M.cielo2 : u + d < 0.78 ? M.cielo3 : M.cielo4;
    // nubes (cada una, tres elipses: luz arriba, cuerpo, sombra abajo)
    for (const [k, ny, w, v] of nubes) { const cx = x0 - 20 + ((h(k, 7, 400) * 80 + t * v) % (x1 - x0 + 40)), dx = x - cx, dy = y - ny;
      const e = (dx / w) ** 2 + (dy / (w * 0.32)) ** 2, e2 = ((dx - w * 0.4) / (w * 0.55)) ** 2 + ((dy + w * 0.22) / (w * 0.32)) ** 2;
      if (e < 1 || e2 < 1) c = dy > w * 0.12 ? M.nubeS : dy < -w * 0.18 || (e2 < 1 && dy < -w * 0.05) ? M.nubeL : M.nube; }
    // el Himeto, la Acrópolis y la ciudad
    const himeto = 92 + Math.sin(x * 0.11) * 2 + Math.sin(x * 0.29 + 1) * 1.5;
    if (y > himeto) c = (x + y) % 3 ? M.monte : M.monteS;
    const roca = 100 - Math.max(0, 10 - Math.abs(x - 31) * 0.9) - (Math.abs(x - 31) < 9 ? 2 : 0) + h(x, 1, 401) * 1.2;
    if (y > roca) c = h(x, y, 402) < 0.25 ? M.rocaS : x > 34 ? M.rocaS : M.roca;
    if (y > 108 + Math.sin(x * 0.5) * 1.5) { const cx2 = Math.floor((x + Math.floor(y / 3) * 2) / 4), fy = (y - 108) % 3; c = fy === 0 && h(cx2, y >> 2, 403) < 0.5 ? M.tejado : (x + Math.floor(y / 3) * 2) % 4 === 3 ? M.casaS : M.casa; }
    if (frio) c = c_mezcla(c, hex('#8a92a0'), frio * 0.45);
    R.pset(x, y, c);
  }
  // el Partenón en lo alto de la roca: frontón, columnas y escalinata
  const P = (x, y, c) => { if (hueco(x, y)) R.pset(x, y, frio ? c_mezcla(c, hex('#8a92a0'), frio * 0.45) : c); };
  for (let x = 24; x <= 38; x++) { P(x, 87, M.templo); P(x, 88, M.rocaS); if (x > 24 && x < 38) P(x, 86, M.templo); }
  for (let x = 26; x <= 36; x++) if (x % 2 === 0) for (let y = 82; y <= 86; y++) P(x, y, M.templo); else for (let y = 82; y <= 86; y++) P(x, y, M.rocaS);
  for (let x = 25; x <= 37; x++) { P(x, 81, M.templo); if (x > 27 && x < 35) P(x, 80, M.templo); if (x > 29 && x < 33) P(x, 79, M.templo); }
  // cipreses
  for (const cx of [14, 45]) for (let y = 102; y <= 110; y++) for (let x = cx - 1; x <= cx + 1; x++) if (Math.abs(x - cx) <= (y - 101) / 4 + 0.3) P(x, y, M.ciprés);
  // golondrinas que cruzan
  for (let k = 0; k < 3; k++) { const bx = Math.round(x0 + ((t * (9 + k * 4) + k * 23) % (x1 - x0 + 30)) - 15), by = Math.round(50 + k * 9 + Math.sin(t * 1.3 + k) * 4), a = Math.sin(t * 11 + k * 2) > 0;
    P(bx, by, C.k); P(bx - 1, by - (a ? 1 : 0), C.k); P(bx + 1, by - (a ? 1 : 0), C.k); P(bx - 2, by - (a ? 2 : 0), C.k); P(bx + 2, by - (a ? 2 : 0), C.k); }
}

// suelo de baldosas de mármol en damero con perspectiva (punto de fuga en (160, y0 - fuga)): juntas, vetas y brillo
function c_damero(R, y0, cols, k = 0, fuga = 70, ancho = 3.4, fondo = 1300) {
  const [c1, c2, cJ, v1, v2] = cols;
  for (let y = y0; y < 180; y++) { const d = y - y0 + fuga, v = fondo / d, fv = Math.floor(v), fv2 = Math.floor(fondo / (d + 1));
    for (let x = 0; x < 320; x++) { const u = (x - 160) * ancho / d, fu = Math.floor(u), fu2 = Math.floor((x + 1 - 160) * ancho / d);
      if (fu !== fu2 || fv !== fv2) { R.pset(x, y, cJ); continue; }
      const par = (fu + fv) & 1, a = h(fu, fv, 410 + k) * 2 - 1, b0 = h(fu, fv, 411 + k), fr = u - fu, fr2 = v - fv;
      const vena = Math.abs(fr - b0 - a * fr2 * 0.8) < 0.035 || (h(fu, fv, 412 + k) < 0.4 && Math.abs(fr2 - 0.3 - fr * 0.5) < 0.04);
      R.pset(x, y, vena ? (par ? v2 : v1) : par ? c2 : c1);
    } }
}

// una estatua de mármol (una mujer con peplo de pliegues de piedra, una mano recoge la tela) sobre su pedestal en pieY
function c_estatuaMarmol(R, cx, pieY) {
  const { rect, disco, poligono, pset } = R, M = c_MU, K = C.k, b = pieY;
  poligono([[cx - 7, b], [cx + 8, b], [cx + 6, b - 24], [cx + 6, b - 30], [cx - 6, b - 30], [cx - 6, b - 24]], K);
  poligono([[cx - 6, b - 1], [cx + 7, b - 1], [cx + 5, b - 24], [cx + 5, b - 29], [cx - 5, b - 29], [cx - 5, b - 24]], (x, y) => (x > cx + 2 ? M.marmolS : x < cx - 3 ? M.marmolL : M.marmol));
  for (const fx of [-3, 0, 3]) for (let y = b - 22; y < b - 1; y++) if ((y + fx) % 5) pset(cx + fx + Math.round(Math.sin(y * 0.3 + fx) * 0.6), y, M.marmolD);
  rect(cx - 5, b - 26, cx + 5, b - 25, M.marmolS); rect(cx - 6, b - 2, cx + 7, b - 1, M.marmolS);
  // los brazos: uno cae y recoge el manto, el otro se dobla sobre el pecho
  rect(cx - 8, b - 28, cx - 6, b - 15, K); rect(cx - 7, b - 27, cx - 6, b - 16, M.marmol); rect(cx - 8, b - 15, cx - 5, b - 13, K); pset(cx - 7, b - 14, M.marmolL);
  rect(cx + 6, b - 28, cx + 8, b - 20, K); rect(cx + 6, b - 27, cx + 7, b - 21, M.marmolS); rect(cx + 1, b - 22, cx + 7, b - 20, K); rect(cx + 2, b - 21, cx + 6, b - 21, M.marmolS);
  // cuello y cabeza con el moño
  rect(cx - 1, b - 33, cx + 1, b - 30, K); pset(cx, b - 32, M.marmol); pset(cx, b - 31, M.marmolS);
  disco(cx, b - 36, 4, K); disco(cx, b - 36, 3, (x, y) => (x > cx + 1 ? M.marmolS : M.marmol)); disco(cx + 2, b - 39, 2, K); disco(cx + 2, b - 39, 1.2, M.marmolS); pset(cx - 2, b - 37, M.marmolL);
}

// una estatua de bronce (un joven con el brazo derecho levantado que sostiene una bola, con un manto a la cadera): bronce
// oscuro con brillos y manchas de verdín, sobre su pedestal en pieY
function c_estatuaBronce(R, cx, pieY) {
  const { rect, disco, poligono, pset, linea } = R, M = c_MU, K = C.k, b = pieY;
  const col = (x, y) => (h(x >> 1, y >> 1, 420) < 0.18 ? M.verdin : x < cx - 1 ? M.bronceL : x > cx + 2 ? M.bronceS : M.bronce);
  // las piernas (una adelantada) y el manto en la cadera
  poligono([[cx - 4, b], [cx - 1, b], [cx, b - 16], [cx - 4, b - 16]], K); poligono([[cx - 3, b - 1], [cx - 1, b - 1], [cx - 1, b - 15], [cx - 3, b - 15]], col);
  poligono([[cx + 1, b], [cx + 5, b], [cx + 4, b - 16], [cx + 1, b - 16]], K); poligono([[cx + 2, b - 1], [cx + 4, b - 1], [cx + 3, b - 15], [cx + 2, b - 15]], col);
  poligono([[cx - 6, b - 14], [cx + 6, b - 14], [cx + 5, b - 20], [cx - 5, b - 20]], K); poligono([[cx - 5, b - 15], [cx + 5, b - 15], [cx + 4, b - 19], [cx - 4, b - 19]], (x, y) => (h(x, y, 421) < 0.3 ? M.verdinS : M.verdin));
  // el torso, los brazos (el derecho, en alto)
  poligono([[cx - 5, b - 19], [cx + 5, b - 19], [cx + 6, b - 30], [cx - 6, b - 30]], K); poligono([[cx - 4, b - 20], [cx + 4, b - 20], [cx + 5, b - 29], [cx - 5, b - 29]], col);
  pset(cx - 2, b - 26, M.bronceS); pset(cx + 2, b - 26, M.bronceS); linea(cx, b - 28, cx, b - 21, M.bronceS);
  poligono([[cx + 5, b - 30], [cx + 8, b - 30], [cx + 11, b - 41], [cx + 9, b - 42]], K); linea(cx + 6, b - 30, cx + 9, b - 40, M.bronceL); linea(cx + 7, b - 30, cx + 10, b - 40, M.bronce);
  disco(cx + 10, b - 44, 2.2, K); disco(cx + 10, b - 44, 1.4, M.bronceL);
  poligono([[cx - 6, b - 29], [cx - 4, b - 29], [cx - 6, b - 17], [cx - 8, b - 18]], K); linea(cx - 6, b - 28, cx - 7, b - 19, M.bronceL);
  // la cabeza con el pelo rizado
  rect(cx - 1, b - 33, cx + 1, b - 30, K); pset(cx, b - 32, M.bronce);
  disco(cx, b - 36, 4, K); disco(cx, b - 36, 3, col); for (let i = -3; i <= 3; i += 2) pset(cx + i, b - 39 + (i & 1), M.bronceS); pset(cx - 2, b - 36, M.bronceL); pset(cx + 2, b - 35, M.verdin);
}

// el pedestal de mármol oscuro: zócalo, fuste con la cartela de rayas (sin letras) y la cornisa; la estatua se pone en pieY
function c_pedestal(R, cx, pieY, base) {
  const { rect, pset } = R, M = c_MU, K = C.k;
  rect(cx - 11, pieY, cx + 11, pieY + 4, K); rect(cx - 10, pieY + 1, cx + 10, pieY + 1, M.pedL); rect(cx - 10, pieY + 2, cx + 10, pieY + 3, M.ped);
  rect(cx - 9, pieY + 5, cx + 9, base - 5, K); rect(cx - 8, pieY + 5, cx + 8, base - 5, M.ped); rect(cx - 8, pieY + 5, cx - 7, base - 5, M.pedL); rect(cx + 6, pieY + 5, cx + 8, base - 5, M.pedS);
  for (let y = pieY + 6; y < base - 5; y++) if (h(cx, y, 430) < 0.3) pset(cx - 4 + Math.round(h(y, cx, 431) * 8), y, M.pedL);
  rect(cx - 5, pieY + 10, cx + 5, pieY + 16, K); rect(cx - 4, pieY + 11, cx + 4, pieY + 15, M.latón); rect(cx - 3, pieY + 12, cx + 2, pieY + 12, M.latónS); rect(cx - 3, pieY + 14, cx, pieY + 14, M.latónS); pset(cx - 4, pieY + 11, M.latónL);
  rect(cx - 12, base - 4, cx + 12, base, K); rect(cx - 11, base - 3, cx + 11, base - 3, M.pedL); rect(cx - 11, base - 2, cx + 11, base - 1, M.pedS);
}

// la sala del museo en 1902 (encuadre general)
function c_sala1902(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, M = c_MU, K = C.k, polvo = Math.max(0, Math.min(1, o.polvo ?? 0));
  const b = c_capa(R, 'sala1902', () => {
    // el techo con sus casetones apenas marcados y la cornisa de dentículos (en tonos suaves: encima va la barra del año)
    rect(0, 0, 319, 8, M.techo); for (let x = 6; x < 320; x += 26) rect(x, 0, x, 7, M.techoS); rect(0, 5, 319, 5, M.techoS);
    rect(0, 9, 319, 9, M.cornS); rect(0, 10, 319, 12, M.corn); for (let x = 0; x < 320; x += 4) rect(x, 13, x + 1, 15, M.cornS); rect(0, 13, 319, 13, M.corn);
    rect(0, 16, 319, 17, M.cornS); rect(0, 18, 319, 18, M.cornD);
    // la pared pompeyana: estuco con su grano, la cenefa alta y un panel enmarcado en cada tramo
    rect(0, 19, 319, 101, M.pared);
    for (let y = 19; y < 102; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 440); if (n < 0.06) pset(x, y, M.paredS); else if (n > 0.95) pset(x, y, M.paredL); }
    rect(0, 19, 319, 19, M.paredS); rect(0, 24, 319, 24, M.panelS); rect(0, 25, 319, 25, M.paredL);
    for (const [a, bb] of [[70, 143], [158, 233], [248, 319]]) { rect(a + 3, 31, bb - 3, 92, M.panelL); rect(a + 4, 32, bb - 4, 91, M.panelS); rect(a + 5, 33, bb - 5, 90, M.panel);
      for (let y = 34; y < 90; y++) for (let x = a + 6; x < bb - 5; x++) if (h(x >> 1, y >> 1, 441) < 0.05) pset(x, y, M.paredS); }
    // una guirnalda pintada en el panel de las estatuas, colgada de dos rosetas, con sus cintas
    for (let x = 166; x <= 226; x++) { const y = Math.round(38 + Math.sin((x - 166) / 60 * Math.PI) * 6); pset(x, y, hex('#6a7a3a')); pset(x, y + 1, (x & 1) ? hex('#8a9a4a') : hex('#c84a3a')); if (x % 4 === 0) pset(x, y + 2, hex('#6a7a3a')); }
    for (const rx of [166, 226]) { disco(rx, 37, 2, M.panelL); pset(rx, 37, hex('#c84a3a')); linea(rx, 39, rx + (rx < 200 ? -2 : 2), 46, M.panelL); }
    // el friso de grecas y el zócalo de mármol verde con sus vetas
    rect(0, 93, 319, 94, M.panelS); rect(0, 95, 319, 101, M.friso); rect(0, 95, 319, 95, M.frisoL); rect(0, 101, 319, 101, M.frisoL);
    for (let x = 0; x < 320; x += 8) { rect(x, 97, x + 5, 97, M.frisoL); rect(x + 5, 97, x + 5, 99, M.frisoL); rect(x + 2, 99, x + 5, 99, M.frisoL); rect(x + 2, 98, x + 2, 99, M.frisoL); rect(x, 97, x, 100, M.frisoL); rect(x, 100, x + 7, 100, M.frisoL); }
    rect(0, 102, 319, 102, M.zocL); rect(0, 103, 319, 125, M.zoc);
    for (let k = 0; k < 40; k++) { let x = h(k, 1, 442) * 320, y = 104 + h(k, 2, 442) * 18; for (let i = 0; i < 14; i++) { pset(Math.round(x), Math.round(y), i % 5 ? M.zocV : M.zocL); x += 1; y += Math.sin(i * 0.7 + k) * 0.8; } }
    for (let x = 0; x < 320; x += 40) rect(x, 103, x, 125, M.zocS);
    rect(0, 124, 319, 125, M.zocS); rect(0, 126, 319, 127, K);
    // el suelo de mármol en damero
    c_damero(R, 128, [M.s1, M.s2, M.sJ, M.sV1, M.sV2], 0, 60, 4.2, 1700);
    // las pilastras jónicas, con sus estrías, el capitel de volutas y la basa
    for (const px of [58, 146, 236]) {
      rect(px - 1, 26, px + 9, 101, K); rect(px, 27, px + 8, 101, M.corn); rect(px, 27, px + 1, 101, hex('#f0dfba')); rect(px + 7, 27, px + 8, 101, M.cornS);
      for (const sx of [2, 4, 6]) rect(px + sx, 30, px + sx, 98, M.cornS);
      rect(px - 3, 21, px + 11, 26, K); rect(px - 2, 22, px + 10, 25, M.corn); rect(px - 2, 22, px + 10, 22, hex('#f0dfba'));
      for (const vx of [px - 2, px + 9]) { disco(vx + 0.5, 24.5, 2.3, K); disco(vx + 0.5, 24.5, 1.6, M.corn); pset(vx, 24, M.cornD); }
      rect(px - 3, 102, px + 11, 125, K); rect(px - 2, 103, px + 10, 124, M.zocL); rect(px - 2, 103, px + 10, 103, M.zocV); rect(px + 8, 104, px + 10, 124, M.zoc);
    }
    // el ventanal en arco: marco blanco, hueco para el cielo, parteluz y travesaños, alféizar y cortinas de terciopelo
    poligono([[6, 118], [6, 52], [52, 52], [52, 118]], K); disco(29, 52, 23, K);
    const enVentana = (x, y) => x >= 9 && x <= 49 && y <= 115 && (y >= 52 || (x - 29) ** 2 + (y - 52) ** 2 <= 400);
    for (let y = 28; y <= 116; y++) for (let x = 7; x <= 51; x++) { if (enVentana(x, y)) pset(x, y, c_HUECO); else if (x >= 7 && x <= 51 && y <= 117 && (y >= 52 || (x - 29) ** 2 + (y - 52) ** 2 <= 22 * 22)) pset(x, y, x < 9 || y < 30 ? hex('#f4ead6') : hex('#d8ccb4')); }
    rect(28, 30, 30, 116, hex('#efe4cc')); rect(30, 30, 30, 116, hex('#c8bca4')); rect(9, 64, 49, 65, hex('#efe4cc')); rect(9, 66, 49, 66, hex('#c8bca4')); rect(9, 90, 49, 91, hex('#efe4cc')); rect(9, 92, 49, 92, hex('#c8bca4'));
    for (let a = 0; a < 1; a += 0.01) { const x = Math.round(29 + Math.cos(Math.PI + a * Math.PI) * 13), y = Math.round(52 + Math.sin(Math.PI + a * Math.PI) * 13); pset(x, y, hex('#efe4cc')); }
    rect(3, 116, 55, 117, K); rect(4, 117, 54, 119, hex('#f0e6d0')); rect(4, 120, 54, 120, M.cornD); rect(3, 121, 55, 121, K);
    // la barra de la cortina y las cortinas recogidas con sus pliegues y el alzapaño dorado
    rect(0, 26, 58, 27, K); rect(0, 26, 58, 26, M.latón); disco(1, 26.5, 2, M.latónL); disco(57, 26.5, 2, M.latónL);
    for (const [xa, xb, s] of [[0, 9, 1], [48, 58, -1]]) for (let y = 28; y <= 124; y++) { const cint = y > 82 && y < 88, w = cint ? 2 : y > 88 ? 2 + Math.round((y - 88) * 0.15) : 0, aa = s > 0 ? xa : xa + w, bb2 = s > 0 ? xb - w : xb;
      for (let x = aa; x <= bb2; x++) { const f = (x * 2 + Math.round(Math.sin(y * 0.08) * 2)) % 6; pset(x, y, x === aa || x === bb2 ? K : f < 2 ? M.tercS : f < 4 ? M.terc : M.tercL); }
      if (cint) rect(aa, y, bb2, y, M.latón); }
    // el reloj de pared sobre la vitrina (esfera, números en rayas y el péndulo dentro de su caja)
    rect(98, 30, 114, 49, K); rect(99, 31, 113, 48, M.nogal); rect(99, 31, 113, 31, M.nogalL); disco(106, 38, 6, K); disco(106, 38, 5, hex('#f4ecd8'));
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(106 + Math.cos(a) * 4), Math.round(38 + Math.sin(a) * 4), k % 3 ? hex('#a89a80') : K); }
    rect(102, 45, 110, 47, K); rect(103, 45, 109, 46, hex('#2a1a10'));
    // la vitrina de nogal: copete con su moldura, el cuerpo de cristal con tres baldas y sus piezas, la base con cajones
    rect(72, 50, 140, 133, K); rect(73, 51, 139, 56, M.nogal); rect(73, 51, 139, 51, M.nogalL); rect(71, 56, 141, 58, K); rect(72, 57, 140, 57, M.nogalL);
    rect(73, 59, 139, 113, M.nogalS); rect(76, 60, 136, 112, hex('#3a2a1e'));
    for (let y = 61; y < 112; y++) for (let x = 77; x < 136; x++) pset(x, y, ((x + y) & 3) ? hex('#4a3a2c') : hex('#54443a'));
    for (const by of [77, 95, 111]) { rect(76, by, 136, by + 1, M.nogalL); rect(76, by + 1, 136, by + 1, M.nogalS); }
    // piezas: vasos de figuras rojas, un bronce pequeño, fragmentos con su etiqueta
    const vaso = (x, y, c, cs) => { disco(x, y - 5, 4, K); disco(x, y - 5, 3, c); rect(x - 1, y - 11, x + 1, y - 8, K); pset(x, y - 10, c); rect(x - 2, y - 1, x + 2, y, K); rect(x - 2, y - 6, x + 2, y - 5, cs); pset(x - 2, y - 7, hex('#f8d090')); };
    vaso(84, 76, hex('#c86a3a'), K); vaso(98, 76, K, hex('#c86a3a')); vaso(126, 76, hex('#c86a3a'), K);
    rect(110, 70, 114, 76, K); rect(111, 69, 113, 75, M.verdin); disco(112, 68, 2, M.verdin); pset(111, 68, M.verdinL); rect(116, 73, 120, 76, K); rect(117, 74, 119, 75, M.bronceL);
    for (let k = 0; k < 6; k++) { const x = 80 + k * 9, y = 94; poligono([[x, y], [x + 6, y], [x + 5, y - 3 - (k % 3)], [x + 1, y - 4]], k % 2 ? M.verdin : M.bronce); pset(x + 2, y - 3, M.verdinL); rect(x + 1, y + 2, x + 5, y + 4, C.blanco); pset(x + 2, y + 3, C.grisS); pset(x + 4, y + 3, C.grisS); linea(x + 3, y, x + 3, y + 2, C.grisS); }
    for (let k = 0; k < 4; k++) { const x = 82 + k * 14; rect(x - 4, 106, x + 4, 110, K); rect(x - 3, 107, x + 3, 109, hex('#d8c098')); pset(x - 1, 108, M.bronceS); rect(x, 108, x + 2, 108, M.verdin); }
    // los cristales: los listones del marco y los reflejos en diagonal
    rect(105, 59, 107, 112, M.nogal); rect(106, 59, 106, 112, M.nogalL);
    for (let y = 60; y < 113; y++) for (let x = 77; x < 136; x++) { const d = (x - 77) - (y - 60) * 0.35; if ((d > 6 && d < 12) || (d > 15 && d < 17) || (d > 36 && d < 41)) c_aclara(R, x, y, (x + y) & 1 ? 0.16 : 0.1, [240, 236, 220]); }
    rect(72, 113, 140, 114, K); rect(73, 115, 139, 128, M.nogal); c_cuarteron(R, 75, 116, 104, 127, M.nogal, M.nogalL, M.nogalS, M.nogalV, 3); c_cuarteron(R, 108, 116, 137, 127, M.nogal, M.nogalL, M.nogalS, M.nogalV, 4);
    disco(90, 121, 1.2, M.latónL); disco(122, 121, 1.2, M.latónL);
    rect(73, 129, 139, 130, M.nogalS); rect(74, 131, 77, 133, M.nogalS); rect(135, 131, 138, 133, M.nogalS);
    // la sombra de la vitrina en el suelo
    for (let y = 131; y < 137; y++) for (let x = 70 + (y - 131); x < 146 + (y - 131); x++) if ((x + y) & 1) c_aclara(R, x, y, 0.22, [60, 40, 30]);
    // las dos estatuas en sus nichos de sombra, con sus pedestales
    for (const [ex, cal] of [[176, 0], [216, 1]]) {
      for (let y = 34; y < 120; y++) for (let x = ex - 15; x <= ex + 15; x++) if ((x - ex) ** 2 / 225 + (y > 50 ? 0 : (y - 50) ** 2 / 256) <= 1 && (x + y) % 2 === 0) c_aclara(R, x, y, 0.18, [70, 40, 30]);
      c_pedestal(R, ex, 96, 127); cal ? c_estatuaBronce(R, ex, 96) : c_estatuaMarmol(R, ex, 96);
    }
    // la estantería de la derecha: montantes, cinco baldas con cajas (etiquetas de rayas y números) y libros de registro
    rect(250, 52, 318, 129, K); rect(251, 53, 317, 128, M.nogalS);
    for (let y = 54; y < 128; y++) for (let x = 254; x < 315; x++) if (((x * 7 + y * 3) % 11) === 0) pset(x, y, hex('#3a2212'));
    for (const by of [53, 72, 91, 110]) { rect(250, by + 18, 318, by + 19, K); rect(251, by + 18, 317, by + 18, M.nogalL); }
    rect(250, 52, 253, 129, M.nogal); rect(315, 52, 318, 129, M.nogal); rect(250, 52, 250, 129, K); rect(318, 52, 318, 129, K); rect(251, 52, 251, 129, M.nogalL);
    rect(248, 50, 320, 53, K); rect(249, 51, 320, 52, M.nogalL);
    const caja = (x, y, w, hh, n, k) => { rect(x, y - hh, x + w, y, K); rect(x + 1, y - hh + 1, x + w - 1, y - 1, k % 3 === 0 ? hex('#c8a46a') : k % 3 === 1 ? hex('#b08a54') : hex('#d4b480')); rect(x + 1, y - hh + 1, x + w - 1, y - hh + 1, hex('#e0c890'));
      for (let yy = y - hh + 3; yy < y - 1; yy += 3) rect(x + 2, yy, x + w - 2, yy, hex('#9a7a48')); rect(x + 2, y - hh + 3, x + 2 + Math.min(8, w - 4), y - hh + 7, C.blanco); rect(x + 3, y - hh + 4, x + 1 + Math.min(8, w - 4), y - hh + 4, C.grisS); rect(x + 3, y - hh + 6, x + Math.min(6, w - 4), y - hh + 6, C.grisS); };
    let k = 0; for (const by of [70, 89, 108, 127]) { let x = 255; while (x < 308) { const w = 12 + Math.round(h(k, by, 450) * 8); if (x + w > 314) break; if (h(k, 9, 451) < 0.2) { for (let i = 0; i < 4; i++) { rect(x + i * 3, by - 13, x + i * 3 + 2, by - 1, K); rect(x + i * 3 + 1, by - 12, x + i * 3 + 1, by - 1, [hex('#6a2a2a'), hex('#2a4a6a'), hex('#4a5a2a'), hex('#7a5a2a')][i]); } x += 14; } else { caja(x, by - 1, w, 10 + (k % 3) * 2, k, k); x += w + 2; } k++; } }
    // la escalera de mano apoyada en la estantería
    linea(244, 128, 256, 60, K); linea(245, 128, 257, 60, M.nogalL); linea(258, 128, 266, 62, K); linea(259, 128, 267, 62, M.nogal);
    for (let y = 70; y < 126; y += 9) { const xa = 244 + Math.round((128 - y) * 12 / 68) + 1, xb = 258 + Math.round((128 - y) * 8 / 66); rect(xa, y, xb, y, M.nogalL); rect(xa, y + 1, xb, y + 1, M.nogalS); }
    // la mesa de Stais: tablero visto desde arriba con vetas, el canto y las patas torneadas, con su sombra
    for (let y = 156; y < 162; y++) for (let x = 168 + (y - 156) * 2; x < 236 + (y - 156); x++) if ((x + y) & 1) c_aclara(R, x, y, 0.25, [60, 40, 30]);
    rect(169, 142, 229, 152, K); c_vetas(R, 170, 143, 228, 148, M.nogalL, M.nogal, hex('#a87444'), 7); rect(170, 149, 228, 151, M.nogal); rect(170, 149, 228, 149, M.nogalS); rect(170, 151, 228, 151, M.nogalS);
    for (const lx of [172, 224]) { rect(lx - 1, 152, lx + 2, 160, K); rect(lx, 152, lx + 1, 159, M.nogal); pset(lx, 155, M.nogalL); rect(lx - 1, 155, lx + 2, 155, K); }
    for (const lx of [180, 216]) { rect(lx, 152, lx + 2, 156, K); rect(lx + 1, 152, lx + 1, 155, M.nogalS); }
    rect(174, 153, 222, 154, M.nogalS);
    // sobre la mesa: papeles con columnas de rayas, el tintero con su pluma y una bandejita con fragmentos
    poligono([[214, 144], [227, 143], [228, 148], [215, 149]], K); poligono([[215, 144], [226, 144], [227, 147], [216, 148]], M.papel); for (let i = 0; i < 3; i++) linea(217, 145 + i, 224, 145 + i - 0, M.papelS, 2);
    rect(222, 139, 226, 144, K); rect(223, 140, 225, 143, hex('#2a2a3a')); pset(223, 140, C.blanco); linea(225, 140, 229, 135, K); linea(226, 140, 230, 136, C.blanco);
    rect(171, 145, 181, 148, K); rect(172, 146, 180, 147, hex('#d8c098')); pset(174, 146, M.verdin); pset(177, 147, M.bronce); pset(179, 146, M.verdinS);
    // el paño de lino blanco (cae por el canto) y su trama
    poligono([[186, 143], [212, 143], [213, 149], [211, 154], [187, 154], [185, 149]], K);
    poligono([[187, 144], [211, 144], [212, 149], [210, 153], [188, 153], [186, 149]], (x, y) => (y > 149 ? ((x & 1) ? M.linoS : M.lino) : ((x + y) % 4 === 0 ? M.linoS : M.lino)));
    for (const fx of [192, 199, 206]) linea(fx, 150, fx + 1, 153, M.linoS);
    // el terrón sobre el paño (verdín, madera negra y la ruedecita que asoma)
    poligono([[193, 147], [205, 147], [206, 143], [203, 139], [197, 138], [193, 141]], K);
    poligono([[194, 146], [204, 146], [205, 143], [202, 140], [197, 139], [194, 142]], (x, y) => (y < 142 ? (h(x, y, 452) < 0.5 ? hex('#2a2018') : hex('#3e3024')) : h(x, y, 453) < 0.3 ? M.verdinS : h(x, y, 453) > 0.8 ? M.verdinL : M.verdin));
    rect(193, 148, 205, 148, M.linoS);
    // el quinqué de latón con su tubo de cristal (la llama la pone el fotograma)
    rect(174, 140, 182, 143, K); rect(175, 141, 181, 142, M.latón); rect(176, 136, 180, 140, K); rect(177, 137, 179, 139, M.latónL); rect(175, 133, 181, 136, K); rect(176, 134, 180, 135, M.latón);
    rect(176, 122, 180, 133, K); rect(177, 123, 179, 132, hex('#e8eef0')); pset(177, 124, C.blanco);
    // la lupa grande en su brazo articulado
    rect(217, 141, 223, 143, K); rect(218, 141, 222, 142, M.latón); linea(220, 141, 220, 132, K); linea(219, 141, 219, 132, M.latónS); linea(220, 132, 214, 130, K);
    disco(213, 135, 5.5, K); disco(213, 135, 4.6, M.latón); disco(213, 135, 3.6, hex('#d4ecf0')); pset(211, 133, C.blanco); pset(212, 133, C.blanco); pset(215, 137, hex('#a8c8d0'));
    // la luz dorada del ventanal: rayos en el aire y la mancha en el suelo con la sombra del parteluz y los travesaños
    for (let y = 30; y < 128; y++) for (let x = 52; x < 175; x++) { const s = (x - 52), y0 = y - s * 0.62; if (y0 < 36 || y0 > 115) continue;
      if (Math.abs(y0 - 65) < 1.6 || Math.abs(y0 - 91) < 1.6) continue; const raya = Math.abs(((y0 + s * 0.2) % 13) - 6) < 2 ? 0.07 : 0; if ((x + y) % 2 && !raya) continue; c_aclara(R, x, y, 0.1 + raya + 0.07 * Math.max(0, 1 - s / 120), c_GOLD); }
    for (let y = 130; y < 180; y++) { const d = (y - 130), xa = 54 + d * 1.25, xb = 104 + d * 1.6, xm = (xa + xb) / 2;
      for (let x = Math.round(xa); x <= xb; x++) { if (Math.abs(x - xm) < 1.5 + d * 0.03 || Math.abs(y - 146 - d * 0.0) < 1) continue; c_aclara(R, x, y, (x + y) % 2 === 0 || (x - xa > 2 && xb - x > 2) ? 0.34 : 0.18, c_GOLD); } }
  });
  // el cielo por el ventanal (con el polvo de los años, más frío)
  c_cieloAtenas(R, t, b, 9, 29, 49, 115, polvo);
  // el gato atigrado dormido en el alféizar, hecho un ovillo: respira, mueve una oreja y la punta de la cola
  { const gx = 40, gy = 116, r = Math.sin(t * 2) > 0 ? 1 : 0, o2 = Math.sin(t * 0.9) > 0.92;
    for (let j = -5; j <= 0; j++) for (let i = -7; i <= 7; i++) { const e = (i / 7.5) ** 2 + ((j + 0.5) / (5.5 + r * 0.5)) ** 2; if (e > 1) continue; pset(gx + i, gy + j, e > 0.78 ? K : j < -3 ? M.gatoL : (i + 9) % 4 === 0 ? hex('#3e3e46') : M.gato); }
    disco(gx + 6, gy - 4, 3.2, K); disco(gx + 6, gy - 4, 2.4, M.gato); pset(gx + 5, gy - 6, M.gatoL); pset(gx + 5, gy - 4, K); pset(gx + 7, gy - 4, K); pset(gx + 6, gy - 3, hex('#d88a8a'));
    pset(gx + 4, gy - 7 - (o2 ? 1 : 0), K); pset(gx + 4, gy - 6, K); pset(gx + 8, gy - 7, K); pset(gx + 8, gy - 6, K);
    const c = Math.round(Math.sin(t * 1.7) * 1.5); linea(gx - 7, gy - 1, gx - 3, gy + c * 0 + 0, K); linea(gx - 3, gy, gx + 2, gy + 0, K); pset(gx + 3, gy - 1 + c, K); pset(gx + 2, gy - 1, M.gatoL); }
  // el reloj: las agujas y el péndulo (se paran con el polvo)
  { const tt = polvo > 0.5 ? 0 : t, am = (tt / 60) * Math.PI * 2 - 1.2, ah = -0.4 + tt / 720 * Math.PI * 2;
    linea(106, 38, Math.round(106 + Math.cos(am) * 4), Math.round(38 + Math.sin(am) * 4), K); linea(106, 38, Math.round(106 + Math.cos(ah) * 3), Math.round(38 + Math.sin(ah) * 3), K);
    const p = Math.round(Math.sin(tt * Math.PI) * 2); pset(106 + p, 46, M.latónL); pset(106 + Math.round(p / 2), 45, M.latónS); }
  // la llama del quinqué que tiembla, con su halo (con el polvo, apagado)
  if (polvo < 0.5) { const f = Math.sin(t * 13) + Math.sin(t * 7.3); pset(178, 129 - (f > 0.8 ? 1 : 0), hex('#fff0a0')); pset(178, 130, hex('#ffb040')); pset(178, 131, hex('#ffb040')); pset(177 + (f > 0 ? 1 : 0), 128, hex('#ffe070'));
    for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d < 7 && d > 2 && (i + j) % 2 === 0) c_aclara(R, 178 + i, 129 + j, 0.12 * (1 - d / 7) + 0.03 * f, [255, 220, 150]); } }
  // el brillo de la ruedecita del terrón
  if (Math.sin(t * 2.3) > 0.55) { pset(199, 140, C.oroL); pset(200, 141, hex('#f0c868')); }
  // el polvo que flota en los rayos de luz
  c_motas(R, t, 46, [52, 30, 176, 130], (x, y) => { const y0 = y - (x - 52) * 0.62; return y0 > 36 && y0 < 115; }, hex('#fff2cc'), 3);
  // el paso de los años: polvo en la vitrina, la estantería y la mesa, telarañas y la luz más fría
  if (polvo > 0) {
    for (let k = 0; k < Math.round(900 * polvo); k++) { const z = k % 3, x = z === 0 ? 76 + h(k, 1, 460) * 60 : z === 1 ? 252 + h(k, 1, 460) * 64 : 170 + h(k, 1, 460) * 58, y = z === 0 ? 60 + h(k, 2, 460) * 52 : z === 1 ? 53 + h(k, 2, 460) * 75 : 143 + h(k, 2, 460) * 5;
      c_aclara(R, Math.round(x), Math.round(y), 0.35 + 0.2 * polvo, [200, 196, 186]); }
    const tela = (cx, cy, dx, dy, r) => { for (let a = 0; a < 5; a++) { const an = a / 4 * Math.PI / 2; linea(cx, cy, Math.round(cx + Math.cos(an) * r * dx), Math.round(cy + Math.sin(an) * r * dy), hex('#e8e4dc')); }
      for (let q = 3; q < r; q += 3) for (let a = 0; a < 4; a++) { const a0 = a / 4 * Math.PI / 2, a1 = (a + 1) / 4 * Math.PI / 2; linea(Math.round(cx + Math.cos(a0) * q * dx), Math.round(cy + Math.sin(a0) * q * dy), Math.round(cx + Math.cos(a1) * q * dx), Math.round(cy + Math.sin(a1) * q * dy), hex('#d8d4cc')); } };
    const r = Math.round(4 + polvo * 9); tela(73, 59, 1, 1, r); tela(317, 54, -1, 1, r); tela(229, 143, -1, -1, Math.round(r * 0.6));
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) c_aclara(R, x, y, 0.32 * polvo, [150, 160, 176]);
  }
  return {};
}

// la caja de embalaje con paja que va delante, abajo a la izquierda (tablas con clavos, la paja que se mueve con la
// corriente y un fragmento envuelto que asoma)
function c_cajaPaja(R, t, o) {
  const { rect, pset, linea } = R, M = c_MU, K = C.k;
  for (let i = 0; i < 18; i++) { const x = 3 + i * 2, a = Math.sin(t * 1.5 + i) * 1.2; linea(x, 152, Math.round(x + a + (i % 3) - 1), 145 - (i * 7) % 5, i % 2 ? hex('#e8c870') : hex('#c8a048')); }
  rect(26, 140, 34, 150, K); rect(27, 141, 33, 149, C.verdin); pset(28, 142, C.verdinL); rect(30, 144, 33, 146, hex('#2a2018'));
  rect(-1, 150, 40, 179, K); c_vetas(R, 0, 151, 39, 179, hex('#c8a46a'), hex('#a8844a'), hex('#e0c088'), 9);
  for (const y of [158, 166, 174]) rect(0, y, 39, y, hex('#8a6a3a')); rect(0, 151, 39, 152, hex('#e0c088'));
  for (const y of [154, 162, 170]) { pset(4, y, C.grisS); pset(35, y, C.grisS); }
  rect(12, 160, 26, 166, C.blanco); rect(13, 162, 22, 162, C.grisS); rect(13, 164, 18, 164, C.grisS); R.numero('7', 22, 167, { tam: 8, fina: true });
}

// ruido suave (valor interpolado entre los puntos de una rejilla), para manchas sin cuadros
function c_ruido(x, y, k = 0) { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi, k), b = h(xi + 1, yi, k), c = h(xi, yi + 1, k), d = h(xi + 1, yi + 1, k); return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy; }

// el contorno del terrón grande del primer plano y el camino de su grieta (de arriba abajo, por la madera)
const c_TERRON = [[96, 128], [106, 137], [140, 141], [186, 139], [214, 132], [224, 118], [222, 100], [214, 86], [198, 75], [170, 70], [140, 72], [116, 79], [101, 91], [93, 108]];

const c_GRIETA = [[150, 73], [156, 81], [151, 89], [159, 97], [154, 105], [162, 113], [157, 122]];

const c_xGrieta = (y) => { for (let i = 0; i + 1 < c_GRIETA.length; i++) { const [xa, ya] = c_GRIETA[i], [xb, yb] = c_GRIETA[i + 1]; if (y >= ya && y <= yb) return xa + (xb - xa) * (y - ya) / (yb - ya); } return null; };

// la rueda dentada de bronce que asoma por la grieta: el color de cada píxel (dientes triangulares, la llanta, los
// radios, el cubo y su eje), con brillo
function c_colorRueda(x, y, cx, cy, r, brillo, giro = 0) {
  const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx) + giro, n = 24;
  const f = ((a / (Math.PI * 2) * n) % 1 + 1) % 1, diente = r + 2.6 * (1 - Math.abs(f - 0.5) * 2);
  if (d > diente) return null;
  const luz = (-dx - dy) / (r * 1.4);
  let c = d > r - 2 ? (luz > 0.2 ? hex('#f0c868') : luz < -0.3 ? hex('#8a6024') : hex('#c8963a')) : d > r - 4 ? hex('#8a6024') : null;
  if (!c) { const rad = Math.abs(((a / (Math.PI * 2) * 4) % 1 + 1) % 1 - 0.5) < 0.09; c = d < 3.2 ? (d < 1.5 ? hex('#3a2a14') : hex('#f0c868')) : rad ? (luz > 0 ? hex('#e0b050') : hex('#b08030')) : hex('#2a1c10'); }
  if (brillo > 0) { const k = brillo * (0.25 + 0.2 * Math.max(0, luz)); c = c_mezcla(c, hex('#fff0b0'), k); }
  return c;
}

// el terrón de cerca sobre el paño, en la mesa de Stais (encuadre 'sala1902', cámara 'grieta')
function c_grieta(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, M = c_MU, K = C.k, g = Math.max(0, Math.min(1, o.grieta ?? 0)), conLupa = o.lupa !== false;
  c_capa(R, conLupa ? 'grieta' : 'grieta-sinlupa', () => {
    // la sala desenfocada: la pared pompeyana en degradado, la mancha del ventanal, la vitrina, una estatua y los rayos
    for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const n = (y / 62) + ((x * 3 + y * 7) % 5) / 5 * 0.08; pset(x, y, n < 0.35 ? hex('#c98c60') : n < 0.7 ? hex('#bf8058') : hex('#b07450')); }
    const mancha = (cx, cy, rx, ry, col, a) => { for (let y = Math.max(0, cy - ry); y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1) c_aclara(R, x, y, a * (1 - e * e), col); } };
    mancha(150, 34, 40, 20, [70, 46, 30], 0.6); mancha(150, 32, 30, 12, [120, 90, 60], 0.3);   // la vitrina
    mancha(14, 40, 24, 26, [255, 246, 220], 0.85); mancha(14, 40, 4, 22, [200, 180, 150], 0.3);   // el ventanal
    mancha(222, 30, 9, 26, [240, 234, 222], 0.75); mancha(222, 8, 6, 6, [240, 234, 222], 0.6); mancha(222, 58, 16, 6, [80, 90, 84], 0.6);   // la estatua de mármol
    mancha(84, 22, 8, 8, [250, 240, 214], 0.55); mancha(84, 22, 3, 3, [60, 40, 30], 0.3);   // el reloj
    for (const [vx, vc] of [[128, [210, 110, 60]], [146, [40, 30, 30]], [166, [80, 150, 120]], [176, [210, 110, 60]]]) mancha(vx, 30, 4, 6, vc, 0.55);   // los vasos de la vitrina
    for (const px of [50, 112, 196, 262]) for (let y = 0; y < 50; y++) for (let x = px - 6; x <= px + 6; x++) c_aclara(R, x, y, 0.22 * (1 - Math.abs(x - px) / 7), [245, 225, 190]);   // las pilastras
    for (let y = 44; y < 56; y++) for (let x = 0; x < 320; x++) c_aclara(R, x, y, 0.5 * Math.sin(Math.PI * (y - 44) / 12), [70, 90, 80]);   // el zócalo verde
    mancha(250, 28, 6, 20, [80, 60, 36], 0.6); mancha(250, 8, 4, 4, [80, 60, 36], 0.5);   // la estatua de bronce
    mancha(300, 54, 24, 6, [90, 60, 36], 0.5);   // la estantería, abajo
    for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const s = x - y * 0.9; if (s > 30 && s < 120 && (x + y) % 2 === 0) c_aclara(R, x, y, 0.1 + (Math.abs((s % 26) - 13) < 4 ? 0.08 : 0), c_GOLD); }
    // el tablero de la mesa en perspectiva: las tablas que fugan, sus vetas y el canto del fondo
    for (let y = 56; y < 180; y++) { const d = y - 56 + 40;
      for (let x = 0; x < 320; x++) { const u = (x - 160) * 40 / d, tabla = Math.floor((u + 400) / 34), fr = ((u + 400) % 34) / 34;
        let c = (tabla & 1) ? M.nogal : hex('#744a28'); if (fr < 0.03) c = M.nogalS;
        const veta = Math.sin(u * 0.9 + Math.sin(y * 0.11 + tabla) * 2.2 + tabla * 3);
        if (veta > 0.93) c = M.nogalL; else if (veta < -0.9) c = M.nogalV;
        pset(x, y, c); } }
    rect(0, 56, 319, 57, M.nogalS); rect(0, 58, 319, 58, M.nogalL);
    for (let y = 56; y < 180; y++) for (let x = 0; x < 320; x++) { const s = x - y * 0.9 + 60; if (s > 30 && s < 150 && (x + y) % 2 === 0) c_aclara(R, x, y, 0.1, c_GOLD); }
    // el paño de lino: trapecio en perspectiva con su trama, el dobladillo y los pliegues
    const pano = [[66, 64], [256, 62], [292, 178], [28, 178]];
    poligono(pano, (x, y) => ((x + (y >> 1)) % 3 === 0) ? M.linoS : ((x + y) % 4 === 1 ? M.linoL : M.lino));
    // los pliegues: una línea de sombra con su luz al lado, en curva suave
    for (const [xa, ya, xb, yb, cv] of [[70, 150, 120, 176, 6], [210, 66, 250, 120, -5], [236, 140, 284, 174, 4], [88, 68, 70, 110, 3], [120, 150, 150, 177, -3]]) for (let i = 0; i <= 60; i++) { const u = i / 60, x = Math.round(xa + (xb - xa) * u + Math.sin(u * Math.PI) * cv), y = Math.round(ya + (yb - ya) * u);
      pset(x, y, M.linoS); pset(x + 1, y, M.linoS); pset(x + 2, y, M.linoL); if (i % 3 === 0) pset(x - 1, y, hex('#e0d8c8')); }
    for (let y = 62; y < 179; y++) { const xa = Math.round(66 + (28 - 66) * (y - 64) / 114), xb = Math.round(256 + (292 - 256) * (y - 62) / 116); pset(xa, y, K); pset(xa + 2, y, M.linoS); pset(xb, y, K); pset(xb - 2, y, M.linoS); if (y % 3 === 0) { pset(xa - 1, y, M.lino); pset(xb + 1, y, M.lino); } }
    linea(66, 63, 256, 61, K); linea(66, 65, 256, 63, M.linoS);
    // la sombra del terrón en el paño
    for (let y = 120; y < 152; y++) for (let x = 90; x < 240; x++) { const e = ((x - 168) / 74) ** 2 + ((y - 138) / 12) ** 2; if (e < 1 && (x + y) % 2 === 0) c_aclara(R, x, y, 0.45 * (1 - e), [70, 60, 50]); }
    // el terrón: verdín con costras abajo, madera negra podrida con sus fibras arriba y, a la derecha, el canto roto con
    // las capas de las placas de bronce
    poligono(c_TERRON.map(([x, y]) => [x - 1, y + 1]), K); poligono(c_TERRON.map(([x, y]) => [x + 1, y - 1]), K);
    poligono(c_TERRON, (x, y) => {
      const madera = y < 98 + (x - 150) * 0.28 + Math.sin(x * 0.2) * 3, canto = x > 206 + (y - 100) * 0.3;
      if (canto) { const capa = Math.floor((y + x * 0.4) / 3) % 4; return [M.verdinS, hex('#6a5030'), M.verdin, hex('#3a2c1c')][capa]; }
      if (madera) { const fib = Math.sin(x * 0.55 + y * 1.9 + Math.sin(x * 0.07) * 4); return fib > 0.75 ? hex('#4a3a2a') : fib < -0.6 ? hex('#140e0a') : h(x >> 1, y, 470) < 0.15 ? hex('#5a4630') : hex('#2a2018'); }
      const n = c_ruido(x / 9, y / 7, 471) * 0.7 + c_ruido(x / 4, y / 4, 472) * 0.3, n2 = h(x >> 1, y >> 1, 473), sh = (x - 100) * 0.004 + (y - 100) * 0.012;
      if (n < 0.22) return n2 < 0.3 ? hex('#5a4228') : hex('#7a5a34');
      const v = n + sh + (n2 - 0.5) * 0.18; return v < 0.45 ? M.verdinL : v < 0.62 ? M.verdin : v < 0.8 ? M.verdinS : hex('#24483a');
    });
    // el borde: la luz de arriba a la izquierda y la sombra de abajo a la derecha
    for (let i = 0; i < c_TERRON.length; i++) { const [xa, ya] = c_TERRON[i], [xb, yb] = c_TERRON[(i + 1) % c_TERRON.length], nx = yb - ya, ny = xa - xb;
      linea(xa, ya + (ny > 0 ? 1 : 0), xb, yb + (ny > 0 ? 1 : 0), ny < 0 || nx < -2 ? hex('#9ad0b0') : hex('#1e3a2e')); }
    // costras y bultos del verdín, y las grietas pequeñas de la madera
    for (let k = 0; k < 26; k++) { const x = 104 + Math.round(h(k, 1, 473) * 110), y = 100 + Math.round(h(k, 2, 473) * 34); if (R.pget(x, y) === K) continue; disco(x, y, 1.2 + h(k, 3, 473) * 1.6, k % 3 ? M.verdinS : M.verdinL); pset(x - 1, y - 1, hex('#b0e0c4')); }
    for (const [xa, ya, xb, yb] of [[118, 86, 130, 90], [176, 78, 186, 84], [196, 86, 204, 98], [110, 95, 122, 97]]) linea(xa, ya, xb, yb, hex('#0c0806'));
    // una bandejita de fragmentos, un compás de puntas y una hoja con garabatos
    rect(8, 136, 58, 166, K); rect(9, 137, 57, 165, hex('#d8c098')); rect(9, 137, 57, 138, hex('#efe0b8')); rect(10, 163, 57, 165, hex('#b09870'));
    for (let k = 0; k < 7; k++) { const x = 14 + (k % 4) * 11, y = 144 + Math.floor(k / 4) * 11, w = 3 + (k % 3); poligono([[x - w, y + 2], [x + w, y + 3], [x + w - 1, y - 2], [x - 1, y - w]], K); poligono([[x - w + 1, y + 1], [x + w - 1, y + 2], [x + w - 2, y - 1], [x - 1, y - w + 1]], k % 2 ? M.verdin : hex('#7a5a34')); pset(x, y - 1, M.verdinL); }
    poligono([[18, 82], [60, 78], [62, 120], [16, 124]], K); poligono([[19, 83], [59, 79], [61, 119], [17, 123]], M.papel);
    for (let r = 0; r < 7; r++) { let x = 22; const y = 88 + r * 5; while (x < 54) { const w = 2 + Math.round(h(x, r, 474) * 3); for (let i = 0; i < w; i++) pset(x + i, y + Math.round(Math.sin((x + i) * 1.7) * 0.8) - Math.round((x - 22) * 0.1), hex('#4a3a2a')); x += w + 2; } }
    linea(222, 170, 262, 150, K); linea(222, 168, 262, 150, K); linea(262, 150, 266, 148, hex('#c8c8d0')); linea(223, 169, 261, 150, hex('#c8c8d0')); disco(264, 149, 2.5, K); disco(264, 149, 1.5, M.latón);
    linea(240, 174, 264, 151, K); linea(241, 174, 264, 152, hex('#a8a8b4'));
    // la lupa grande apoyada en el paño: el aro de latón, el mango de madera torneada y, dentro, la trama agrandada
    if (conLupa) { const lx = 268, ly = 128, r = 22;
      for (let k = 0; k < 18; k++) { const x = lx + 16 + k * 1.6, y = ly + 16 + k * 1.3; disco(x, y, 3.4, K); disco(x, y, 2.4, k % 6 === 0 ? M.nogalS : (k & 1) ? M.nogal : M.nogalL); }
      for (let y = ly - r; y <= ly + r; y++) for (let x = lx - r; x <= lx + r; x++) { const d = Math.hypot(x - lx, y - ly); if (d > r) continue;
        const c = R.pget(x, y), lino = c === M.lino || c === M.linoS || c === M.linoL;
        if (lino || d >= 0) pset(x, y, ((x >> 1) + (y >> 1)) % 3 === 0 ? hex('#c8d0d0') : ((x >> 1) + y) % 4 === 1 ? hex('#fafcfa') : hex('#e4ecea')); }
      for (let a = 0; a < Math.PI * 2; a += 0.02) { const xx = Math.round(lx + Math.cos(a) * (r + 1.5)), yy = Math.round(ly + Math.sin(a) * (r + 1.5)); pset(xx, yy, Math.cos(a) + Math.sin(a) < 0 ? M.latónL : M.latón); pset(Math.round(lx + Math.cos(a) * (r + 3)), Math.round(ly + Math.sin(a) * (r + 3)), K); pset(Math.round(lx + Math.cos(a) * r), Math.round(ly + Math.sin(a) * r), M.latónS); }
      for (let a = 3.6; a < 4.6; a += 0.03) { pset(Math.round(lx + Math.cos(a) * (r - 4)), Math.round(ly + Math.sin(a) * (r - 4)), C.blanco); pset(Math.round(lx + Math.cos(a) * (r - 5)), Math.round(ly + Math.sin(a) * (r - 5)), C.blanco); }
    }
  });
  // los círculos de luz desenfocados que flotan delante de la sala
  for (let k = 0; k < 6; k++) { const bx = Math.round(((h(k, 1, 490) * 300 + t * (2 + k)) % 330) - 5), by = Math.round(10 + h(k, 2, 490) * 40 + Math.sin(t * 0.5 + k) * 3), r = 3 + (k % 3);
    if (bx > 270 && by < 48) continue; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d <= r) c_aclara(R, bx + i, by + j, d > r - 1 ? 0.22 : 0.1, [255, 240, 200]); } }
  // las motas de polvo que brillan en el rayo de luz
  c_motas(R, t, 40, [20, 0, 300, 120], (x, y) => { const s = x - y * 0.9 + (y > 56 ? 60 : 0); return s > 30 && s < 140; }, hex('#fff2cc'), 5);
  // la grieta: una raya que crece (0–0,3), se abre (0,3–0,7) y deja ver la rueda que brilla (0,7–1)
  const largo = Math.min(1, g / 0.3), abre = Math.max(0, Math.min(1, (g - 0.3) / 0.4)), brillo = Math.max(0, Math.min(1, (g - 0.7) / 0.3));
  const [, y0] = c_GRIETA[0], y1 = c_GRIETA[c_GRIETA.length - 1][1], yFin = y0 + (y1 - y0) * largo, rx = 158, ry = 102;
  if (g > 0) {
    // el resplandor alrededor de la rueda, antes de dibujar la grieta
    if (brillo > 0) for (let j = -30; j <= 30; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j); if (d < 30 && (i + j) % 2 === 0) c_aclara(R, rx + i, ry + j, brillo * 0.28 * (1 - d / 30) * (0.85 + 0.15 * Math.sin(t * 4)), [255, 230, 150]); }
    for (let y = y0; y <= yFin; y++) { const cx = c_xGrieta(y), perf = Math.sin(Math.PI * (y - y0) / (y1 - y0)), w = abre * 12 * Math.max(0.3, perf);
      if (cx == null) continue;
      if (w < 0.6) { pset(Math.round(cx), y, hex('#0a0604')); pset(Math.round(cx) + 1, y, hex('#6a5038')); continue; }
      for (let x = Math.floor(cx - w - 2); x <= Math.ceil(cx + w + 2); x++) { const dx = Math.abs(x - cx);
        if (dx < w) { const c = c_colorRueda(x, y, rx, ry, 15, brillo, t * 0.0); pset(x, y, c ?? (dx > w - 1 ? hex('#140c08') : hex('#24180e'))); }
        else if (dx < w + 1.6) pset(x, y, (y + x) % 3 ? hex('#8a6a48') : hex('#a88458')); }   // el canto de la madera recién partida
    }
    // las astillas y el polvillo que saltan cuando se parte (puras en g)
    if (g > 0.12 && g < 0.75) for (let k = 0; k < 14; k++) { const [px, py] = c_GRIETA[k % c_GRIETA.length], g0 = 0.12 + (k % 5) * 0.06, u = g - g0; if (u < 0 || u > 0.35) continue;
      const vx = (h(k, 1, 480) - 0.5) * 70, x = Math.round(px + vx * u), y = Math.round(py - 18 * u + 260 * u * u); if (y > 150) continue; pset(x, y, k % 2 ? hex('#3a2a1c') : hex('#8a6a48')); if (k % 3 === 0) pset(x + 1, y, hex('#2a2018')); }
    if (g > 0.25 && g < 0.6) { const u = (g - 0.25) / 0.35; for (let k = 0; k < 30; k++) { const a = h(k, 2, 481) * Math.PI * 2, r = 4 + u * (10 + h(k, 3, 481) * 14), [px, py] = c_GRIETA[k % c_GRIETA.length]; if (h(k, 4, 481) < u) continue; c_aclara(R, Math.round(px + Math.cos(a) * r), Math.round(py + Math.sin(a) * r * 0.7 - u * 6), 0.5, [220, 200, 170]); } }
    // el destello en un diente de la rueda
    if (brillo > 0.5) { const s = (Math.sin(t * 3) + 1) / 2, L = Math.round(2 + s * 4 * brillo), sx = rx - 4, sy = ry - 13;
      for (let i = -L; i <= L; i++) { pset(sx + i, sy, i === 0 ? C.blanco : hex('#fff4c0')); pset(sx, sy + i, i === 0 ? C.blanco : hex('#fff4c0')); }
      if (s > 0.6) { pset(sx - 1, sy - 1, hex('#fff4c0')); pset(sx + 1, sy + 1, hex('#fff4c0')); pset(sx + 1, sy - 1, hex('#fff4c0')); pset(sx - 1, sy + 1, hex('#fff4c0')); } }
  }
  return { rueda: [rx, ry] };
}

// una cifra de 3 × 5 píxeles (a escala s) para las pegatinas pequeñas, donde la fuente de R.numero no cabe
const c_CIFRAS = { 0: '111101101101111', 1: '010110010010111', 8: '111101111101111' };

function c_cifra(R, d, x, y, c, s = 1) { const f = c_CIFRAS[d]; for (let i = 0; i < 15; i++) if (f[i] === '1') R.rect(x + (i % 3) * s, y + Math.floor(i / 3) * s, x + (i % 3) * s + s - 1, y + Math.floor(i / 3) * s + s - 1, c); }

// los colores de la sala de 2005
const c_MO = {
  techo: hex('#e6e2da'), techoS: hex('#d6d0c6'), pared: hex('#dcd5c8'), paredS: hex('#c8c0b2'), paredL: hex('#ece6da'), moldura: hex('#f2ede4'), molduraS: hex('#b8b0a2'),
  zoc: hex('#8a96a0'), zocS: hex('#6a7680'), zocL: hex('#a8b4bc'), s1: hex('#d4d2cc'), s2: hex('#b4b2ac'), sJ: hex('#96948e'), sV1: hex('#c4c2bc'), sV2: hex('#a4a29c'),
  piedra: hex('#e8dcc4'), piedraS: hex('#c4b494'), piedraL: hex('#f8f0dc'), madera: hex('#8a5a34'), maderaS: hex('#5e3c22'), maderaL: hex('#b07a48'),
  contra: hex('#d8b882'), contraS: hex('#b8945c'), contraL: hex('#ecd4a4'),
  esc: hex('#e6e8ea'), escS: hex('#b8bcc2'), escL: hex('#f8f9fa'), escD: hex('#8a9098'), plomo: hex('#8e959e'), plomoS: hex('#6a7078'), plomoL: hex('#aab0b8'),
  carro: hex('#3e4650'), carroL: hex('#5e6874'), aviso: hex('#f0c020'), pantalla: hex('#0e1a24'), verde: hex('#3ad06a'), ambar: hex('#f0a020'), rojo: hex('#e03a3a'),
  monitor: hex('#2a2e34'), monitorL: hex('#4a5058'), mesa: hex('#c8ccd0'), mesaS: hex('#9aa0a6'), mesaL: hex('#e4e8ea'),
};

// el hueco de la puerta del museo (x0, y0, x1, y1: lo que no es marco) y el tamaño del escáner: un píxel menos por cada
// lado y por arriba (el gag del centímetro)
const c_PUERTA = [22, 50, 100, 138], c_ESC = { w: 77, h: 88 };

// el escáner de ocho toneladas con su carro, la base abajo en yb y el borde izquierdo en x0: carro de acero con cuatro
// ruedas (giro: lo que han rodado), armario gris y blanco con sus paneles y remaches, la puerta de plomo con la ventanilla,
// las franjas de aviso y el trébol, el panel de mando con la pantallita, la seta roja y los pilotos, las rejillas, la
// pegatina del «8» y la columna de luces (verde fija; ámbar que parpadea y baliza que gira si escanea)
function c_escanerCuerpo(R, x0, yb, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, M = c_MO, K = C.k, W = c_ESC.w, x1 = x0 + W - 1, top = yb - c_ESC.h + 1, giro = o.giro ?? 0, esc = !!o.escanea;
  // el carro con sus ruedas
  rect(x0, yb - 9, x1, yb - 4, K); rect(x0 + 1, yb - 8, x1 - 1, yb - 5, M.carro); rect(x0 + 1, yb - 8, x1 - 1, yb - 8, M.carroL);
  for (let x = x0 + 4; x < x1 - 2; x += 6) pset(x, yb - 6, M.carroL);
  for (const wx of [x0 + 6, x0 + 22, x1 - 22, x1 - 6]) { rect(wx - 2, yb - 4, wx + 2, yb - 3, K); disco(wx, yb - 2, 3, K); disco(wx, yb - 2, 2.2, hex('#2a2e34')); pset(Math.round(wx + Math.cos(giro) * 1.6), Math.round(yb - 2 + Math.sin(giro) * 1.6), hex('#8a929c')); pset(wx, yb - 2, hex('#aab0b8')); }
  // el armario
  rect(x0, top + 6, x1, yb - 10, K); rect(x0 + 1, top + 7, x1 - 1, yb - 10, M.esc); rect(x0 + 1, top + 7, x0 + 2, yb - 10, M.escL); rect(x1 - 3, top + 7, x1 - 1, yb - 10, M.escS);
  rect(x0 + 1, top + 7, x1 - 1, top + 11, M.escD); rect(x0 + 1, top + 7, x1 - 1, top + 7, M.escS); for (let x = x0 + 4; x < x1 - 3; x += 9) pset(x, top + 9, M.escL);
  rect(x0 + 1, yb - 14, x1 - 1, yb - 11, M.escS); rect(x0 + 1, yb - 14, x1 - 1, yb - 14, M.escD);
  for (const y of [top + 14, yb - 17]) for (let x = x0 + 3; x < x1 - 2; x += 8) pset(x, y, M.escD);
  // la puerta de plomo: marco, la hoja, la ventanilla de cristal plomado, el asa, las franjas de aviso y el trébol
  const dx0 = x0 + 6, dx1 = x0 + 46, dy0 = top + 15, dy1 = yb - 19;
  rect(dx0 - 1, dy0 - 1, dx1 + 1, dy1 + 1, K); rect(dx0, dy0, dx1, dy1, esc && Math.sin(t * 6) > 0 ? hex('#a0a8b4') : M.plomo); rect(dx0, dy0, dx1, dy0, M.plomoL); rect(dx0, dy0, dx0, dy1, M.plomoL); rect(dx1 - 1, dy0, dx1, dy1, M.plomoS);
  for (let y = dy0 + 2; y < dy1; y += 4) for (let x = dx0 + 2; x < dx1 - 2; x += 4) pset(x, y, M.plomoS);
  rect(dx0, dy0, dx0 + 4, dy1, K); for (let y = dy0; y <= dy1; y++) for (let x = dx0; x <= dx0 + 3; x++) pset(x, y, ((x + y) % 6) < 3 ? M.aviso : K);
  rect(dx0 + 10, dy0 + 4, dx1 - 6, dy0 + 16, K); rect(dx0 + 11, dy0 + 5, dx1 - 7, dy0 + 15, hex('#1e3a40')); linea(dx0 + 13, dy0 + 14, dx0 + 20, dy0 + 6, hex('#4a8a90')); linea(dx0 + 15, dy0 + 14, dx0 + 22, dy0 + 6, hex('#3a6a74'));
  { const tx = dx0 + 22, ty = dy0 + 30; disco(tx, ty, 8, K); disco(tx, ty, 7, M.aviso); disco(tx, ty, 1.6, K);
    for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 3; poligono([[tx + Math.cos(a - 0.5) * 2.6, ty + Math.sin(a - 0.5) * 2.6], [tx + Math.cos(a - 0.5) * 6.2, ty + Math.sin(a - 0.5) * 6.2], [tx + Math.cos(a + 0.5) * 6.2, ty + Math.sin(a + 0.5) * 6.2], [tx + Math.cos(a + 0.5) * 2.6, ty + Math.sin(a + 0.5) * 2.6]], K); } }
  rect(dx1 - 6, dy0 + 26, dx1 - 3, dy0 + 36, K); rect(dx1 - 5, dy0 + 27, dx1 - 4, dy0 + 35, hex('#d8dce0')); rect(dx1 - 10, dy0 + 30, dx1 - 5, dy0 + 32, K); rect(dx1 - 9, dy0 + 31, dx1 - 5, dy0 + 31, hex('#d8dce0'));
  for (const y of [dy0 + 3, dy1 - 3]) { rect(dx1 + 1, y - 2, dx1 + 3, y + 2, K); rect(dx1 + 2, y - 1, dx1 + 2, y + 1, M.escD); }
  // el panel de mando: la pantallita con su onda, los botones, la llave y la seta de parada
  const px0 = x0 + 51, px1 = x1 - 5;
  rect(px0, dy0, px1, dy0 + 30, K); rect(px0 + 1, dy0 + 1, px1 - 1, dy0 + 29, hex('#cfd3d8')); rect(px0 + 1, dy0 + 1, px1 - 1, dy0 + 1, M.escL);
  rect(px0 + 3, dy0 + 3, px1 - 3, dy0 + 12, K); rect(px0 + 4, dy0 + 4, px1 - 4, dy0 + 11, M.pantalla);
  for (let x = px0 + 4; x <= px1 - 4; x++) { const y = Math.round(dy0 + 8 + Math.sin(x * 0.7 + t * (esc ? 9 : 3)) * (esc ? 2.5 : 1.2)); pset(x, y, M.verde); }
  for (let k = 0; k < 4; k++) { const bx = px0 + 4 + k * 4; rect(bx, dy0 + 15, bx + 2, dy0 + 17, K); pset(bx + 1, dy0 + 16, [M.verde, M.ambar, hex('#4a8ad8'), M.escL][k]); }
  disco(px0 + 6, dy0 + 23, 3, K); disco(px0 + 6, dy0 + 23, 2.2, M.aviso); disco(px0 + 6, dy0 + 22.5, 1.6, M.rojo); pset(px0 + 5, dy0 + 21, hex('#ff9a9a'));
  rect(px1 - 8, dy0 + 20, px1 - 4, dy0 + 26, K); rect(px1 - 7, dy0 + 21, px1 - 5, dy0 + 25, hex('#7a8088')); pset(px1 - 6, dy0 + 22, M.aviso);
  // las rejillas de ventilación y la pegatina del «8» (las ocho toneladas)
  rect(px0, dy0 + 34, px1, dy1, K); rect(px0 + 1, dy0 + 35, px1 - 1, dy1 - 1, M.escS); for (let y = dy0 + 37; y < dy1 - 1; y += 3) { rect(px0 + 2, y, px1 - 2, y, K); rect(px0 + 2, y + 1, px1 - 2, y + 1, M.escD); }
  rect(x0 + 6, yb - 13 - 0, x0 + 6, yb - 13, M.escD);
  rect(dx0 + 8, top + 54, dx0 + 19, top + 67, K); rect(dx0 + 9, top + 55, dx0 + 18, top + 66, M.aviso); rect(dx0 + 9, top + 55, dx0 + 18, top + 55, hex('#fff0a0')); c_cifra(R, '8', dx0 + 11, top + 56, K, 2);
  // la columna de luces y la baliza encima del armario
  rect(x1 - 12, top, x1 - 6, top + 6, K); pset(x1 - 9, top + 5, M.escD);
  pset(x1 - 10, top + 4, M.verde); pset(x1 - 8, top + 4, M.verde); pset(x1 - 10, top + 2, esc && Math.sin(t * 8) > 0 ? M.ambar : hex('#6a4a1a')); pset(x1 - 8, top + 2, esc && Math.sin(t * 8) > 0 ? M.ambar : hex('#6a4a1a'));
  rect(x1 - 11, top + 1, x1 - 7, top + 1, hex('#5a1a1a')); if (esc) { const b = Math.floor(t * 6) % 4; pset(x1 - 11 + b, top + 1, M.rojo); }
  rect(x0 + 4, top + 2, x0 + 20, top + 6, K); rect(x0 + 5, top + 3, x0 + 19, top + 5, M.escD); for (let x = x0 + 6; x < x0 + 19; x += 2) pset(x, top + 4, K);
  linea(x0 + 26, top + 6, x0 + 30, top + 1, K); linea(x0 + 30, top + 1, x0 + 40, top + 1, K); pset(x0 + 40, top + 2, K);
}

// el pasillo que se ve por la puerta: paredes y suelo que fugan, focos, al fondo un ventanal con el cielo y una estatua
// de bronce con los brazos abiertos en su pedestal
function c_pasillo(R) {
  const { rect, pset, poligono } = R, M = c_MO, K = C.k, [x0, y0, x1, y1] = c_PUERTA, fx0 = 46, fx1 = 76, fy0 = 70, fy1 = 112;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c;
    if (x >= fx0 && x <= fx1 && y >= fy0 && y <= fy1) c = M.paredL;
    else if (y > fy1 && y - fy1 >= Math.abs(x - 61) * (y1 - fy1) / 40 - 6) { const d = y - fy1 + 6, u = (x - 61) * 8 / d; c = (Math.floor(u) + Math.floor(120 / d)) & 1 ? M.s1 : M.s2; }
    else if (y < fy0 && fy0 - y >= Math.abs(x - 61) * (fy0 - y0) / 40 - 4) c = (x + y) % 2 ? M.techo : M.techoS;
    else c = x < 61 ? M.pared : M.paredS;
    pset(x, y, c);
  }
  // las juntas de las esquinas, el zócalo de los lados y los focos del techo
  for (let i = 0; i < 26; i++) { pset(x0 + i, y1 - Math.round(i * 26 / 26) + 0, M.sJ); }
  for (let y = y0; y <= y1; y++) { const a = (y < fy0) ? Math.round(fx0 - (fy0 - y) * 24 / (fy0 - y0)) : y > fy1 ? Math.round(fx0 - (y - fy1) * 24 / (y1 - fy1)) : fx0, b = (y < fy0) ? Math.round(fx1 + (fy0 - y) * 24 / (fy0 - y0)) : y > fy1 ? Math.round(fx1 + (y - fy1) * 24 / (y1 - fy1)) : fx1; pset(a, y, M.molduraS); pset(b, y, M.molduraS); }
  for (const [lx, ly] of [[40, 56], [82, 56], [52, 64], [70, 64]]) { rect(lx - 1, ly, lx + 1, ly, K); pset(lx, ly + 1, C.blanco); }
  // el ventanal del fondo con el cielo y la estatua de bronce con los brazos abiertos
  rect(fx0 + 6, fy0 + 4, fx1 - 6, fy0 + 26, M.molduraS); rect(fx0 + 7, fy0 + 5, fx1 - 7, fy0 + 25, hex('#9ccaf0')); rect(fx0 + 7, fy0 + 19, fx1 - 7, fy0 + 25, hex('#cfe4f4')); rect(60, fy0 + 5, 61, fy0 + 25, M.moldura);
  rect(55, 104, 67, 112, K); rect(56, 105, 66, 112, hex('#6a706c')); rect(56, 105, 66, 105, hex('#8a908c'));
  const b = hex('#3e5a4a'), bl = hex('#5a8068'); rect(60, 88, 62, 104, b); rect(59, 96, 63, 104, b); pset(61, 86, b); rect(60, 85, 62, 87, b);
  for (let i = 0; i < 10; i++) { pset(59 - i, 90 - Math.round(i * 0.2), b); pset(63 + i, 90 - Math.round(i * 0.2), b); } pset(61, 89, bl); pset(60, 92, bl);
  // la luz que entra al pasillo desde la sala, en el suelo
  for (let y = 126; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0) c_aclara(R, x, y, 0.15, [255, 250, 236]);
}

// el escáner visto a lo lejos en el pasillo, a escala s (de la imagen guardada en el búfer spr), solo dentro del hueco
function c_escanerLejos(R, spr, s, oscuro) {
  const [x0, , x1, y1] = c_PUERTA, W = Math.round(c_ESC.w * s), H = Math.round(c_ESC.h * s), cx = 61, X0 = Math.round(cx - W / 2), Y1 = Math.round(y1 - (1 - s) * 26);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const sx = Math.floor(i / s), sy = Math.floor(j / s), c = spr[sy * 320 + sx]; if (c === c_HUECO || !c) continue; const x = X0 + i, y = Y1 - H + 1 + j; if (x < x0 || x > x1) continue; R.pset(x, y, c_mezcla(c, hex('#5a5650'), oscuro)); }
}

// la sala del museo en 2005 con el escáner (encuadre 'escaner')
function c_escaner(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, M = c_MO, K = C.k, [px0, py0, px1, py1] = c_PUERTA;
  const e = Math.max(0, Math.min(1, o.entra ?? 1));
  c_capa(R, 'escaner', () => {
    // el techo, la cornisa y el raíl de los focos
    rect(0, 0, 319, 10, M.techo); rect(0, 4, 319, 4, M.techoS); for (let x = 10; x < 320; x += 30) rect(x, 0, x, 9, M.techoS);
    rect(0, 11, 319, 12, M.moldura); rect(0, 13, 319, 13, M.molduraS); for (let x = 2; x < 320; x += 5) rect(x, 14, x + 2, 15, M.moldura); rect(0, 16, 319, 17, M.paredS);
    // la pared clara con su estuco, los paneles de moldura, el pasamanos y el zócalo gris azulado
    rect(0, 18, 319, 113, M.pared);
    for (let y = 18; y < 114; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 500); if (n < 0.05) pset(x, y, M.paredS); else if (n > 0.96) pset(x, y, M.paredL); }
    for (const [a, b2, ya, yb2] of [[118, 198, 26, 96], [296, 319, 52, 104]]) { rect(a, ya, b2, yb2, M.molduraS); rect(a + 1, ya + 1, b2 - 1, yb2 - 1, M.moldura); rect(a + 2, ya + 2, b2 - 2, yb2 - 2, M.pared); rect(a + 2, ya + 2, b2 - 2, ya + 2, M.paredS); }
    rect(0, 112, 319, 113, M.moldura); rect(0, 114, 319, 114, M.molduraS); rect(0, 115, 319, 137, M.zoc);
    for (let x = 0; x < 320; x += 32) { rect(x + 3, 118, x + 28, 134, M.zocS); rect(x + 4, 119, x + 27, 133, M.zoc); rect(x + 4, 119, x + 27, 119, M.zocL); }
    rect(0, 136, 319, 137, M.zocS); rect(0, 138, 319, 138, K);
    // el suelo de mármol gris pulido
    c_damero(R, 139, [M.s1, M.s2, M.sJ, M.sV1, M.sV2], 7, 50, 2.6, 900);
    // el pasillo por la puerta y la portada de piedra con su frontón, las jambas y las hojas abiertas
    c_pasillo(R);
    rect(px0 - 9, py0 - 9, px0 - 1, py1, K); rect(px1 + 1, py0 - 9, px1 + 9, py1, K); rect(px0 - 9, py0 - 9, px1 + 9, py0 - 1, K);
    rect(px0 - 8, py0 - 8, px0 - 2, py1, M.piedra); rect(px1 + 2, py0 - 8, px1 + 8, py1, M.piedra); rect(px0 - 8, py0 - 8, px1 + 8, py0 - 2, M.piedra);
    rect(px0 - 8, py0 - 8, px0 - 7, py1, M.piedraL); rect(px1 + 7, py0 - 8, px1 + 8, py1, M.piedraS); rect(px0 - 4, py0 - 4, px0 - 4, py1, M.piedraS); rect(px1 + 4, py0 - 4, px1 + 4, py1, M.piedraS); rect(px0 - 4, py0 - 4, px1 + 4, py0 - 4, M.piedraS);
    rect(px0 - 2, py0 - 2, px1 + 2, py0 - 1, M.piedraS);
    rect(px0 - 13, py0 - 14, px1 + 13, py0 - 9, K); rect(px0 - 12, py0 - 13, px1 + 12, py0 - 10, M.piedra); rect(px0 - 12, py0 - 13, px1 + 12, py0 - 13, M.piedraL); for (let x = px0 - 10; x < px1 + 12; x += 4) pset(x, py0 - 11, M.piedraS);
    for (const xx of [px0 - 13, px1 + 1]) { rect(xx, py0 - 9, xx + 11, py0 - 8, K); }
    // las hojas de la puerta, abiertas contra la pared
    for (const [a, b2] of [[px0 - 21, px0 - 10], [px1 + 10, px1 + 21]]) { rect(a, py0 - 6, b2, py1, K); rect(a + 1, py0 - 5, b2 - 1, py1, M.madera); c_cuarteron(R, a + 2, py0 - 2, b2 - 2, py0 + 38, M.madera, M.maderaL, M.maderaS, M.maderaS, a); c_cuarteron(R, a + 2, py0 + 42, b2 - 2, py1 - 4, M.madera, M.maderaL, M.maderaS, M.maderaS, a + 1); pset(a < 60 ? b2 - 2 : a + 2, py0 + 40, C.oro); }
    // la señal verde de salida (solo el pictograma del que corre) y la cámara de vigilancia
    rect(51, 27, 71, 35, K); rect(52, 28, 70, 34, hex('#1a9a5a')); rect(52, 28, 70, 28, hex('#4ac88a'));
    { const sx = 57; pset(sx + 2, 29, C.blanco); rect(sx + 1, 30, sx + 2, 31, C.blanco); pset(sx, 32, C.blanco); pset(sx + 3, 32, C.blanco); pset(sx - 1, 33, C.blanco); pset(sx + 4, 33, C.blanco); pset(sx, 30, C.blanco); pset(sx + 3, 30, C.blanco); rect(sx + 6, 30, sx + 9, 32, C.blanco); pset(sx + 10, 31, C.blanco); rect(sx + 6, 31, sx + 7, 31, hex('#1a9a5a')); }
    rect(246, 30, 250, 32, K); linea(248, 32, 248, 36, K); rect(244, 35, 256, 40, K); rect(245, 36, 255, 39, hex('#e8e8ea')); rect(256, 36, 258, 39, K); pset(257, 37, hex('#2a3a5a'));
    // la foto grande del fragmento en la pared, sobre la mesa de los monitores
    rect(120, 28, 196, 94, K); rect(121, 29, 195, 93, hex('#242a30')); rect(121, 29, 195, 29, hex('#3a424a'));
    for (let y = 36; y < 88; y++) for (let x = 130; x < 188; x++) { const e2 = ((x - 158) / 27) ** 2 + ((y - 62) / 23) ** 2 + (c_ruido(x / 5, y / 5, 501) - 0.5) * 0.5; if (e2 < 1) pset(x, y, e2 > 0.85 ? hex('#2e5a46') : c_ruido(x / 4, y / 4, 502) < 0.35 ? hex('#3a6a52') : c_ruido(x / 3, y / 3, 503) > 0.7 ? hex('#6a9a7e') : hex('#4a7a62')); }
    for (const [gx, gy, gr] of [[150, 58, 11], [170, 70, 7]]) for (let a = 0; a < Math.PI * 2; a += 0.05) { const r = gr + (Math.floor(a / (Math.PI * 2) * 30 * (gr / 11)) % 2); pset(Math.round(gx + Math.cos(a) * r), Math.round(gy + Math.sin(a) * r), hex('#c8a858')); }
    rect(121, 89, 195, 93, hex('#1a1e22')); rect(124, 90, 140, 91, hex('#6a7078')); rect(184, 90, 192, 91, hex('#6a7078'));
    // la ventana de la derecha: marco blanco, el hueco del cristal (la vista la pone el fotograma) y el alféizar
    rect(210, 48, 284, 108, K); rect(211, 49, 283, 107, M.moldura); rect(282, 49, 283, 107, M.molduraS); rect(214, 52, 280, 104, K);
    for (let y = 53; y < 104; y++) for (let x = 215; x < 280; x++) pset(x, y, c_HUECO);
    rect(208, 107, 286, 110, K); rect(209, 108, 285, 109, M.paredL); rect(209, 110, 285, 110, M.molduraS);
    // la vitrina moderna de la derecha: peana blanca, campana de cristal con su luz y un bronce pequeño dentro
    rect(294, 96, 319, 138, K); rect(295, 97, 319, 137, M.mesaL); rect(295, 97, 319, 98, C.blanco); rect(317, 97, 319, 137, M.mesa);
    rect(293, 56, 319, 96, K); rect(294, 57, 319, 95, hex('#d8e4e8')); for (let y = 57; y < 96; y++) for (let x = 294; x < 320; x++) if ((x - y * 0.5) % 9 < 2) pset(x, y, hex('#eef6f8')); rect(294, 57, 319, 58, C.blanco);
    rect(302, 80, 312, 95, K); rect(303, 81, 311, 95, hex('#6a5030')); disco(307, 76, 4, K); disco(307, 76, 3, hex('#7a5c34')); pset(306, 75, hex('#b08a54')); rect(300, 94, 314, 95, hex('#c8ccd0'));
    // el extintor rojo en su soporte
    rect(199, 116, 204, 134, K); rect(200, 117, 203, 133, M.rojo); rect(200, 117, 200, 133, hex('#f07070')); rect(200, 113, 203, 116, K); rect(201, 114, 202, 115, hex('#3a3a3a')); linea(203, 115, 206, 120, K); rect(199, 124, 204, 125, hex('#3a3a3a'));
    // la mesa de los monitores: tablero, faldón con cajones, patas, el teclado, el portátil, tazas y la caja de espuma
    rect(112, 120, 198, 124, K); rect(113, 121, 197, 122, M.mesaL); rect(113, 123, 197, 123, M.mesa);
    rect(116, 124, 132, 137, K); rect(117, 125, 131, 137, M.mesa); for (const y of [129, 133]) { rect(117, y, 131, y, M.mesaS); rect(122, y - 2, 126, y - 2, M.mesaS); }
    rect(193, 124, 195, 137, K); rect(194, 124, 194, 137, M.mesaS);
    // las sillas de oficina delante de la mesa
    for (const sx of [150, 178]) { rect(sx - 6, 116, sx + 6, 126, K); rect(sx - 5, 117, sx + 5, 125, hex('#2a3440')); rect(sx - 5, 117, sx + 5, 117, hex('#4a5868')); rect(sx - 7, 126, sx + 7, 128, K); rect(sx - 6, 127, sx + 6, 127, hex('#3a4450')); rect(sx, 129, sx + 1, 134, K); linea(sx - 5, 137, sx + 6, 137, K); pset(sx - 5, 136, K); pset(sx + 6, 136, K); }
  });
  // por la ventana, la Atenas de 2005: cielo tramado con nubes de tres tonos, el Licabeto con su capilla, los bloques
  // blancos con antenas y toldos, y un pájaro; delante, la persiana de lamas medio subida
  { const B = c_capas.get('escaner'), hueco = (x, y) => B[y * 320 + x] === c_HUECO;
    for (let y = 53; y < 104; y++) for (let x = 215; x < 280; x++) { if (!hueco(x, y)) continue;
      const u = (y - 53) / 50 + ((x + y * 3) % 5) * 0.02; let c = u < 0.3 ? hex('#5a9ad8') : u < 0.6 ? hex('#7ab2e4') : hex('#a8cceb');
      for (const [k, ny, w, v] of [[0, 60, 13, 1.6], [1, 70, 9, 2.8]]) { const cx = 205 + ((h(k, 9, 530) * 80 + t * v) % 90), dx = x - cx, dy = y - ny, e2 = (dx / w) ** 2 + (dy / (w * 0.35)) ** 2; if (e2 < 1) c = dy > 1 ? hex('#c8d4e0') : dy < -2 ? C.blanco : hex('#eaf0f4'); }
      const lic = 88 - Math.max(0, 16 - Math.abs(x - 238) * 1.1); if (y > lic) c = (x + y) % 3 ? hex('#7a8a6a') : hex('#5e6e52');
      if (x >= 236 && x <= 240 && y >= lic - 4 && y <= lic) c = C.blanco;
      const bloque = Math.floor((x - 215) / 9), alto = 84 + Math.round(h(bloque, 1, 531) * 8); if (y > alto) { const fx = (x - 215) % 9, fy = (y - alto) % 4; c = fx === 0 ? hex('#b8b0a0') : fy === 1 && fx % 3 === 1 ? hex('#5a6a7a') : fy === 3 && h(bloque, y, 532) < 0.3 ? hex('#4a8a6a') : hex('#ece6da'); }
      pset(x, y, c); }
    for (let b2 = 0; b2 < 5; b2++) { const ax = 216 + h(b2, 3, 533) * 60, ay = 84 + Math.round(h(b2, 4, 533) * 8) - 3; if (b2 % 2 === 0) { pset(Math.round(ax), ay, K); pset(Math.round(ax), ay - 1, K); pset(Math.round(ax) + 1, ay - 2, K); } }
    { const bx = 215 + Math.round((t * 7) % 70), by = 64 + Math.round(Math.sin(t * 1.4) * 3), a = Math.sin(t * 10) > 0; if (hueco(bx, by)) { pset(bx, by, K); pset(bx - 1, by - (a ? 1 : 0), K); pset(bx + 1, by - (a ? 1 : 0), K); } }
    for (let y = 53; y < 72; y += 3) { rect(215, y, 279, y, hex('#f4f2ec')); rect(215, y + 1, 279, y + 1, hex('#c8c4ba')); }
    rect(215, 72, 279, 74, K); rect(215, 72, 279, 73, hex('#e0dcd2')); linea(232, 53, 232, 72, hex('#b8b4aa')); linea(262, 53, 262, 72, hex('#b8b4aa')); linea(270, 74, 270, 86 + Math.round(Math.sin(t * 0.8) * 1), hex('#d8d4ca')); pset(270, 87 + Math.round(Math.sin(t * 0.8)), K);
    rect(246, 53, 247, 103, M.moldura); rect(215, 78, 279, 78, M.moldura); }
  // el pasillo: visitantes pequeños que pasan (no mientras entra el escáner)
  if (e >= 0.99 || e <= 0) { R.recorte([px0, py0, px1, py1]);
    for (let k = 0; k < 2; k++) { const dir = k ? -1 : 1, u = ((t * 0.07 + k * 0.5) % 1), x = Math.round(dir > 0 ? 30 + u * 64 : 94 - u * 64), y = 124 - k * 6, paso = Math.floor(t * 4 + k) % 2, col = [hex('#c84a3a'), hex('#3a6aa8')][k];
      for (let j = 0; j < 3; j++) R.pset(x, y - 10 + j, hex('#e8b890')); R.pset(x, y - 11, hex('#4a2e1a')); R.pset(x + 1, y - 11, hex('#4a2e1a')); R.pset(x - 1, y - 10, hex('#4a2e1a'));
      for (let j = 0; j < 5; j++) { R.pset(x, y - 7 + j, col); R.pset(x + 1, y - 7 + j, col); } R.pset(x - 1, y - 6, col); R.pset(x + 2, y - 6, col);
      R.pset(x + (paso ? 0 : -1), y - 2, hex('#2a2a34')); R.pset(x + (paso ? 0 : -1), y - 1, hex('#2a2a34')); R.pset(x + 1 + (paso ? 1 : 0), y - 2, hex('#2a2a34')); R.pset(x + 1 + (paso ? 1 : 0), y - 1, hex('#2a2a34')); }
    R.recorte(null); }
  // los monitores con sus cortes grises que cambian, el teclado, el portátil, la taza con vapor y la caja de espuma
  const monitor = (cx, y0, w, hh, k) => { rect(cx - (w >> 1) - 1, y0 - 1, cx + (w >> 1) + 1, y0 + hh + 1, K); rect(cx - (w >> 1), y0, cx + (w >> 1), y0 + hh, M.monitor); rect(cx - (w >> 1) + 1, y0 + 1, cx + (w >> 1) - 1, y0 + hh - 2, hex('#101418'));
    const f = Math.floor(t * 0.8 + k * 1.3) % 3; for (let j = y0 + 2; j < y0 + hh - 2; j++) for (let i = cx - (w >> 1) + 2; i < cx + (w >> 1) - 1; i++) { const dx = (i - cx) / (w * 0.32), dy = (j - y0 - hh / 2 + 1) / (hh * 0.32), d = dx * dx + dy * dy;
      if (d < 1) pset(i, j, f === 1 && Math.abs(Math.hypot(dx, dy) - 0.55) < 0.1 ? hex('#e8e8e8') : d > 0.8 ? hex('#8a8a8a') : (h(i, j, 510 + f) < 0.3 ? hex('#6a6a6a') : hex('#a8a8a8'))); }
    if (k === 2) { const yy = y0 + 2 + Math.floor(t * 6) % (hh - 4); rect(cx - (w >> 1) + 2, yy, cx + (w >> 1) - 2, yy, hex('#4ac8e8')); }
    rect(cx - 1, y0 + hh + 1, cx + 1, 120, K); rect(cx - 4, 119, cx + 4, 120, K); pset(cx + (w >> 1) - 2, y0 + hh - 1, Math.sin(t * 2 + k) > 0 ? M.verde : hex('#2a6a3a')); };
  monitor(128, 104, 18, 13, 0); monitor(155, 100, 22, 16, 1); monitor(182, 104, 18, 13, 2);
  rect(140, 118, 168, 120, K); rect(141, 118, 167, 119, hex('#3a3e44')); for (let x = 142; x < 167; x += 2) pset(x, 118, hex('#8a9098')); if (Math.floor(t * 7) % 3 === 0) pset(142 + Math.floor(t * 13) % 24, 118, C.blanco);
  rect(170, 118, 172, 120, K); pset(171, 118, hex('#d8dce0'));
  rect(113, 112, 124, 120, K); rect(114, 113, 123, 117, hex('#2a3a5a')); for (let k = 0; k < 3; k++) rect(115, 114 + k, 115 + ((k * 3 + Math.floor(t * 2)) % 7), 114 + k, hex('#8ac0e8')); rect(112, 119, 125, 120, hex('#9aa0a6'));
  rect(186, 115, 190, 120, K); rect(187, 116, 189, 120, C.blanco); pset(190, 117, K); for (let k = 0; k < 3; k++) { const y = 113 - ((t * 6 + k * 3) % 9), x = 188 + Math.round(Math.sin(t * 2 + y * 0.6)); if (y > 103) pset(x, Math.round(y), hex('#f4f4f4')); }
  rect(193, 115, 199, 120, K); rect(194, 116, 198, 119, hex('#e8e4a0')); pset(196, 117, hex('#4a7a62'));
  // los tablones de contrachapado para el carro, de la puerta a su sitio
  const tablon = (a, b2, ya, yb2) => { rect(a, ya, b2, yb2, M.contraS); rect(a, ya, b2, yb2 - 1, M.contra); rect(a, ya, b2, ya, M.contraL); for (let x = a + 3; x < b2; x += 12) { pset(x, ya + 2, M.contraS); pset(x, yb2 - 2, M.contraS); } for (let x = a; x < b2; x++) if (h(x, ya, 520) < 0.1) pset(x, ya + 1 + Math.round(h(x, 2, 520) * (yb2 - ya - 2)), M.contraS); };
  tablon(18, 104, 139, 146); for (let k = 0; k < 4; k++) tablon(18 + k * 70, 18 + k * 70 + 68, 152, 162);
  // el escáner: por el pasillo (lejos), en la puerta (un píxel de margen), cruzando hacia delante y rodando a su sitio
  const xFin = 206, ybFin = 158, sigma = (u) => u * u * (3 - 2 * u);
  let x0 = px0 + 1, yb = py1, giro = 0;
  if (e < 0.3) {
    let spr = c_capas.get('escaner-sprite'); if (!spr) { spr = R.nuevo(); spr.fill(c_HUECO); const prev = R.usar(spr); c_escanerCuerpo(R, 0, c_ESC.h - 1, 0, {}); R.usar(prev); c_capas.set('escaner-sprite', spr); }
    if (e > 0.02) c_escanerLejos(R, spr, 0.35 + 0.65 * sigma(e / 0.3), 0.6 * (1 - e / 0.3));
  } else {
    if (e >= 0.5 && e < 0.65) yb = Math.round(py1 + (ybFin - py1) * sigma((e - 0.5) / 0.15));
    if (e >= 0.65) { yb = ybFin; const u = sigma((e - 0.65) / 0.35); x0 = Math.round(px0 + 1 + (xFin - px0 - 1) * u); giro = (x0 - px0) / 3; }
    // su sombra en el suelo (si ya ha cruzado)
    if (yb > py1) for (let y = yb - 3; y <= yb + 2; y++) for (let x = x0 - 2; x <= x0 + c_ESC.w + 2; x++) if ((x + y) & 1) c_aclara(R, x, y, 0.35, [40, 40, 50]);
    // los cables, cuando está en su sitio
    if (e >= 0.99) { for (const [dy, c] of [[0, K], [2, hex('#2a3a6a')]]) for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(x0 - 2 - u * 18), y = Math.round(150 + dy - Math.sin(u * Math.PI) * 4 - u * 12); pset(x, y, c); pset(x, y + 1, c); } }
    c_escanerCuerpo(R, x0, yb, t, { giro, escanea: o.escanea });
    // el centímetro: la rendija brilla y las flechitas y el «1» lo señalan mientras está en la puerta
    if (e >= 0.3 && e < 0.5) { const p = Math.sin(t * 8) > 0;
      for (let x = px0; x <= px1; x++) pset(x, py0, p ? hex('#fff6c0') : hex('#f0d060')); for (let y = py0; y <= py1; y++) { pset(px0, y, p ? hex('#fff6c0') : hex('#f0d060')); pset(px1, y, p ? hex('#fff6c0') : hex('#f0d060')); }
      const fx = 61; for (let i = 0; i < 3; i++) { rect(fx - i, py0 - 15 + i, fx + i, py0 - 15 + i, M.aviso); } rect(fx, py0 - 19, fx, py0 - 16, M.aviso);
      rect(px1 + 12, py0 + 26, px1 + 22, py0 + 36, K); rect(px1 + 13, py0 + 27, px1 + 21, py0 + 35, M.aviso); c_cifra(R, '1', px1 + 15, py0 + 29, K, 1);
      linea(px1 + 12, py0 + 31, px1 + 3, py0 + 31, M.aviso); pset(px1 + 4, py0 + 30, M.aviso); pset(px1 + 4, py0 + 32, M.aviso); }
  }
  // la luz de los focos del raíl en la pared, en abanico
  for (const fx of [40, 100, 230, 262]) { rect(fx - 2, 18, fx + 2, 21, K); rect(fx - 1, 21, fx + 1, 22, hex('#3a3e44')); pset(fx, 22, hex('#fff8d8')); }
  return { escaner: [x0, yb - c_ESC.h + 1, x0 + c_ESC.w - 1, yb] };
}

// el baúl de transporte negro con cantos de aluminio y el rollo de cable que van delante, abajo a la derecha
function c_baul(R, t, o) {
  const { rect, pset, disco } = R, K = C.k;
  rect(290, 150, 319, 179, K); rect(291, 151, 319, 179, hex('#26282e')); rect(291, 151, 319, 153, hex('#a8b0b8')); rect(291, 151, 293, 179, hex('#a8b0b8')); rect(291, 165, 319, 166, hex('#a8b0b8'));
  for (const [x, y] of [[292, 152], [292, 165], [318, 152]]) { pset(x, y, C.blanco); }
  rect(302, 158, 312, 160, K); rect(303, 159, 311, 159, hex('#5a5e66')); rect(296, 170, 300, 174, hex('#a8b0b8'));
  for (let k = 0; k < 3; k++) { disco(276, 176 - k, 12 - k * 3, K); disco(276, 176 - k, 11 - k * 3, k % 2 ? hex('#3a3e44') : hex('#2a2c32')); }
}

// la imagen del escáner dentro del visor (x 70–262, y 38–126): el fragmento en grises con su costra y sus capas; con
// dentro, el corte que enseña las ruedas (anillos claros con dientes, el cubo y los radios) y las placas
function c_imagenEscaner(R, dentro) {
  const { pset } = R, VX0 = 70, VY0 = 38, VX1 = 262, VY1 = 126;
  const ruedas = [[136, 80, 24, 40], [196, 98, 13, 24], [110, 102, 9, 16], [100, 72, 8, 15]];
  for (let y = VY0; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) {
    const ex = (x - 160) / 78, ey = (y - 82) / 38, borde = ex * ex + ey * ey + (c_ruido(x / 9, y / 9, 540) - 0.5) * 0.55 + (Math.abs(ex) > 0.7 && ey > 0.2 ? 0.3 : 0);
    let v;
    if (borde > 1) v = ((x + y) % 3 === 0 ? 14 : 8) + (h(x, y, 541) < 0.05 ? 20 : 0);
    else { const capa = Math.sin(borde * 14 + c_ruido(x / 6, y / 6, 542) * 3); v = 70 + c_ruido(x / 3, y / 3, 543) * 50 + capa * 14 - borde * 30;
      if (borde > 0.85) v = 150 + c_ruido(x / 2, y / 2, 544) * 40;
      if (dentro) { v = v * 0.55;
        for (const [cx, cy, r, n] of ruedas) { const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx), f = ((a / (Math.PI * 2) * n) % 1 + 1) % 1, dt = r + 2.5 * (1 - Math.abs(f - 0.5) * 2);
          if (d < dt && d > r - 2.5) v = 205 + (d < r ? 20 : 0); else if (d < 2.5) v = 230; else if (d < r - 2.5 && Math.abs(((a / (Math.PI * 2) * 4) % 1 + 1) % 1 - 0.5) < 0.06 * (r / d + 0.5)) v = 180; }
        if (Math.abs(y - 82 + (x - 160) * 0.08) < 1) v = Math.max(v, 160); }
      else for (const [cx, cy, r] of ruedas) { const d = Math.hypot(x - cx, y - cy); if (Math.abs(d - r) < 1 && h(x, y, 545) < 0.35) v += 22; } }
    v = Math.max(0, Math.min(255, Math.round(v))); pset(x, y, (0xff000000 | (Math.round(v * 1.04) << 16) | (v << 8) | Math.round(v * 0.96)) >>> 0);
  }
}

// un monitor grande de 2005 de cerca (encuadre 'escaner', cámara 'pantalla')
function c_pantalla(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, M = c_MO, K = C.k, corte = Math.max(0, Math.min(1, o.corte ?? 0)), letras = Math.max(0, Math.min(1, o.letras ?? 0));
  const VX0 = 70, VY0 = 38, VX1 = 262, VY1 = 126;
  const b = c_capa(R, 'pantalla', () => {
    // la sala desenfocada: la pared clara, la ventana en una mancha de luz, el escáner grande con su luz, los focos
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = y / 180 + ((x * 3 + y * 5) % 7) * 0.012; pset(x, y, n < 0.3 ? hex('#dcd6ca') : n < 0.6 ? hex('#d2ccc0') : hex('#c4beb2')); }
    const mancha = (cx, cy, rx, ry, col, a) => { for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e < 1) c_aclara(R, x, y, a * (1 - e * e), col); } };
    mancha(18, 70, 22, 40, [255, 252, 240], 0.8); mancha(18, 70, 3, 36, [180, 176, 168], 0.25);
    mancha(298, 104, 28, 50, [236, 238, 240], 0.7); mancha(296, 112, 10, 18, [140, 146, 154], 0.6); mancha(306, 70, 6, 6, [240, 200, 40], 0.5);
    mancha(298, 150, 30, 6, [60, 66, 74], 0.55);
    for (let y = 120; y < 146; y++) for (let x = 0; x < 320; x++) c_aclara(R, x, y, 0.25, [120, 134, 146]);
    // la mesa: tablero gris claro con su grano y el canto
    rect(0, 146, 319, 179, M.mesa); for (let y = 147; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 550); if (n < 0.07) pset(x, y, M.mesaS); else if (n > 0.95) pset(x, y, M.mesaL); }
    rect(0, 146, 319, 147, M.mesaL); rect(0, 148, 319, 148, M.mesaS);
    // la peana y el pie del monitor
    rect(140, 146, 180, 152, K); rect(141, 147, 179, 151, M.monitorL); rect(141, 147, 179, 147, hex('#6a7078')); rect(152, 140, 168, 147, K); rect(153, 140, 167, 146, M.monitor);
    // el marco del monitor, el logotipo en rayas (sin letras), el piloto y la nota adhesiva con garabatos
    rect(46, 20, 274, 144, K); rect(47, 21, 273, 143, M.monitor); rect(47, 21, 273, 22, M.monitorL); rect(47, 21, 48, 143, M.monitorL); rect(271, 23, 273, 143, hex('#1e2226'));
    rect(54, 28, 266, 140, hex('#121518'));
    rect(150, 139, 170, 141, hex('#3a4048')); for (const bx of [240, 246, 252]) rect(bx, 140, bx + 3, 141, hex('#3a4048'));
    poligono([[250, 18], [272, 20], [270, 40], [248, 38]], K); poligono([[251, 19], [271, 21], [269, 39], [249, 37]], hex('#f4e078'));
    for (let r = 0; r < 4; r++) for (let x = 253; x < 267; x++) if (h(x, r, 551) > 0.3) pset(x, 24 + r * 4 + Math.round((x - 253) * 0.08) + (h(x, r, 552) < 0.3 ? 1 : 0), hex('#5a4a2a'));
    // la interfaz del programa: la barra de arriba con iconos y números, la de herramientas, el visor y la barra de abajo
    rect(56, 30, 264, 36, hex('#2a3038')); for (let k = 0; k < 6; k++) { rect(58 + k * 8, 31, 63 + k * 8, 35, hex('#3e4650')); pset(60 + k * 8, 33, hex('#9ab8d8')); }
    rect(240, 31, 262, 35, hex('#1a2028')); rect(242, 33, 250, 33, hex('#4ac8e8'));
    rect(56, 37, 68, 138, hex('#22282e')); for (let k = 0; k < 6; k++) { rect(58, 40 + k * 14, 66, 50 + k * 14, hex('#323a44')); }
    R.icono('lupa', 59, 42, hex('#c8d8e8'), hex('#22282e')); R.icono('rueda', 59, 56, hex('#e8c060'), hex('#22282e'));
    for (const [y, f] of [[72, 0], [86, 1], [100, 2], [114, 3]]) { if (f === 0) { rect(59, y, 65, y + 6, hex('#7a8a9a')); rect(60, y + 1, 64, y + 5, hex('#22282e')); } if (f === 1) { disco(62, y + 3, 3, hex('#7a8a9a')); disco(62, y + 3, 1.5, hex('#22282e')); } if (f === 2) linea(59, y + 6, 65, y, hex('#7a8a9a')); if (f === 3) for (let i = 0; i < 4; i++) rect(59 + i * 2, y + 6 - i * 2, 59 + i * 2, y + 6, hex('#7a8a9a')); }
    rect(69, 37, 263, 127, hex('#0a0c0e'));
    c_imagenEscaner(R, false);
    rect(69, 128, 264, 138, hex('#1e242a'));
    // la regla de la escala abajo a la izquierda del visor y las marcas de las esquinas
    for (let x = 76; x < 116; x++) pset(x, 122, hex('#c8d0d8')); for (let x = 76; x <= 116; x += 10) { pset(x, 121, hex('#c8d0d8')); pset(x, 120, hex('#c8d0d8')); }
    for (const [cx, cy, sx, sy] of [[72, 40, 1, 1], [260, 40, -1, 1], [72, 124, 1, -1], [260, 124, -1, -1]]) { for (let i = 0; i < 5; i++) { pset(cx + i * sx, cy, hex('#4ac8e8')); pset(cx, cy + i * sy, hex('#4ac8e8')); } }
    // en la mesa: el teclado, el ratón con su cable, la taza y las notas con garabatos
    rect(84, 156, 206, 172, K); rect(85, 157, 205, 171, hex('#d8dce0')); rect(85, 171, 205, 171, hex('#9aa0a6'));
    for (let r = 0; r < 4; r++) for (let x = 88; x < 202; x += 7) { if (r === 3 && x > 116 && x < 172) continue; rect(x, 159 + r * 3, x + 5, 160 + r * 3, hex('#f4f6f8')); rect(x, 161 + r * 3, x + 5, 161 + r * 3, hex('#8a9098')); pset(x + 6, 160 + r * 3, hex('#9aa0a6')); }
    rect(116, 168, 172, 169, hex('#f4f6f8')); rect(116, 170, 172, 170, hex('#b8bcc2'));
    linea(232, 148, 228, 158, hex('#3a3e44')); disco(228, 164, 5, K); disco(228, 164, 4, hex('#e4e6e8')); rect(228, 159, 228, 163, hex('#9aa0a6')); pset(226, 161, C.blanco);
    rect(18, 148, 36, 170, K); rect(19, 149, 35, 169, hex('#c84a3a')); rect(19, 149, 21, 169, hex('#e06a5a')); rect(19, 149, 35, 151, hex('#4a2a1a')); rect(36, 153, 40, 163, K); rect(37, 154, 39, 162, hex('#c84a3a')); rect(37, 156, 37, 160, hex('#7a2a20'));
    poligono([[244, 152], [300, 150], [304, 178], [246, 179]], K); poligono([[245, 153], [299, 151], [303, 178], [247, 178]], C.blanco);
    for (let r = 0; r < 5; r++) for (let x = 250; x < 296; x++) if (h(x >> 1, r, 553) > 0.25) pset(x, 157 + r * 4 + Math.round((x - 250) * -0.03) + (h(x, r, 554) < 0.25 ? -1 : 0), hex('#2a3a6a'));
    linea(262, 176, 300, 160, K); linea(263, 176, 300, 161, hex('#2a5ac8'));
  });
  // el corte: por encima de la raya de luz, la imagen de dentro (las ruedas)
  let dentro = c_capas.get('pantalla-dentro'); if (!dentro) { dentro = R.nuevo(); const prev = R.usar(dentro); c_imagenEscaner(R, true); R.usar(prev); c_capas.set('pantalla-dentro', dentro); }
  if (corte > 0) { const yc = Math.round(VY0 + (VY1 - VY0) * corte), buf = R.buf;
    for (let y = VY0; y < yc; y++) { const i0 = y * 320 + VX0; buf.set(dentro.subarray(i0, i0 + VX1 - VX0 + 1), i0); }
    if (corte < 1) for (let x = VX0; x <= VX1; x++) { pset(x, yc, hex('#c8f4ff')); c_aclara(R, x, yc - 1, 0.5, [120, 220, 255]); c_aclara(R, x, yc + 1, 0.35, [120, 220, 255]); } }
  // las inscripciones: un recuadro y filas de garabatos diminutos que no se leen, que salen de izquierda a derecha
  const L = [172, 46, 248, 76];
  if (letras > 0) { const [lx0, ly0, lx1, ly1] = L, xs = lx0 + 3 + (lx1 - lx0 - 6) * letras;
    for (let x = lx0; x <= lx1; x++) if (x % 4 < 2) { pset(x, ly0, hex('#f0c040')); pset(x, ly1, hex('#f0c040')); }
    for (let y = ly0; y <= ly1; y++) if (y % 4 < 2) { pset(lx0, y, hex('#f0c040')); pset(lx1, y, hex('#f0c040')); }
    for (let r = 0; r < 6; r++) { const y = ly0 + 4 + r * 4 + Math.round(r * 0.4); let x = lx0 + 3 + Math.round(h(r, 1, 560) * 3);
      while (x < lx1 - 4 && x < xs) { const tipo = Math.floor(h(x, r, 561) * 6), c = hex('#f4f0e0'), c2 = hex('#b8b4a8');
        if (tipo === 0) { pset(x, y, c); pset(x, y + 1, c); pset(x, y + 2, c2); }
        else if (tipo === 1) { pset(x, y + 2, c); pset(x + 1, y + 1, c); }
        else if (tipo === 2) { pset(x, y, c); pset(x + 1, y + 1, c2); pset(x, y + 2, c); }
        else if (tipo === 3) { pset(x, y + 1, c2); }
        else if (tipo === 4) { pset(x, y, c2); pset(x + 1, y, c); pset(x + 1, y + 2, c2); }
        else { pset(x, y + 1, c); pset(x + 1, y + 2, c); pset(x + 2, y + 1, c2); }
        x += (tipo === 3 ? 2 : tipo === 5 ? 4 : 3) + (h(x, r, 562) < 0.18 ? 3 : 0); } } }
  // la barra de abajo: el progreso del corte, el número de la capa y el piloto
  rect(74, 131, 196, 134, hex('#323a44')); rect(74, 131, 74 + Math.round(122 * (corte || ((t * 0.1) % 1) * 0.15)), 134, hex('#4ac8e8'));
  R.numero(String(100 + Math.round(corte * 1499 + (corte ? 0 : Math.floor(t) % 7))), 230, 137, { tam: 8, fina: true, rampa: [hex('#9ab8d8'), hex('#9ab8d8'), hex('#c8d8e8'), hex('#c8d8e8'), hex('#c8d8e8'), hex('#e8f0f8'), hex('#e8f0f8'), hex('#e8f0f8')] });
  pset(262, 142, Math.sin(t * 2) > -0.5 ? hex('#4ad86a') : hex('#2a6a3a'));
  // el puntero del ratón que va y viene por el visor
  { const mx = Math.round(150 + Math.sin(t * 0.7) * 40), my = Math.round(90 + Math.sin(t * 1.1) * 18); for (let j = 0; j < 6; j++) for (let i = 0; i <= j * 0.6; i++) pset(mx + i, my + j, i === 0 || i >= Math.floor(j * 0.6) ? K : C.blanco); pset(mx + 2, my + 6, K); pset(mx + 3, my + 7, C.blanco); }
  // el reflejo de la sala en el cristal, la luz ámbar del escáner que parpadea al fondo y el vapor de la taza
  for (let y = 30; y < 139; y++) for (let x = 56; x < 265; x++) { const d = x - 56 + (y - 30) * 0.7; if ((d > 120 && d < 134) || (d > 140 && d < 144)) { if ((x + y) & 1) c_aclara(R, x, y, 0.08, [220, 230, 240]); } }
  if (Math.sin(t * 5) > 0) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j < 10) c_aclara(R, 306 + i, 70 + j, 0.35, [255, 200, 60]);
  for (let k = 0; k < 4; k++) { const y = 146 - ((t * 7 + k * 4) % 16), x = 27 + Math.round(Math.sin(t * 1.8 + y * 0.4) * 2); if (y > 132) c_aclara(R, x, Math.round(y), 0.55, [255, 255, 255]); }
  return { letras: L };
}

// la paleta del despacho de Price (los años 50–70: papel pintado ocre, nogal, parqué, pizarra verde, luz de tubo azulada)
const D_P = pal({
  pared: '#d4b886', paredL: '#e2c898', paredS: '#bea070', paredD: '#9a7c52', cornisa: '#efe0bc', cornisaS: '#c4a87a',
  mad: '#6e3e22', madL: '#93582e', madS: '#53301a', madD: '#36190a', madV: '#5e3420',
  tabla: '#8e5c34', tablaL: '#ae7644', tablaS: '#6c4222', tablaD: '#47280f',
  alf: '#7a2428', alfS: '#54181c', alfL: '#a8443a', alfO: '#d2a252', alfA: '#2a3c5c', alfF: '#e4d0a4',
  piz: '#2b4535', pizS: '#1d3226', pizL: '#3b5947', tiza: '#e6ecdc', tizaS: '#9eae9c',
  luz: '#e6f2fb', luzS: '#bcd0e4', film: '#121c34', filmM: '#24395e', filmL: '#5578ac', filmLL: '#9cbce2',
  caja: '#cbc6b6', cajaL: '#e8e4d8', cajaS: '#8e8a7c', cajaD: '#5e5a50',
  negro: '#17171b', negroL: '#4a4a56', negroM: '#2a2a33', negroB: '#7a7a8a',
  verde: '#256446', verdeL: '#5aa87a', verdeS: '#183e2c', laton: '#c8963a', latonL: '#f0c868', latonS: '#8a6024',
  papel: '#f2ead4', papelS: '#cdc2a4', tinta: '#4a4a6e', rojo: '#d23a2a', rojoS: '#8a1a14', rojoL: '#ff7a5a',
  cristal: '#a8c8d0', cristalL: '#e2f2f6', plomo: '#5c6872', plomoL: '#8894a0', plomoS: '#3a444c', plomoD: '#262e34',
  azulejo: '#cdd6d0', azulejoS: '#a6b2ac', amarillo: '#e8c040', verdin: '#4a8a6a', verdinS: '#2e5a46', verdinL: '#7ab89a',
  bata: '#8e9cac', bataS: '#647284', piel: '#e8b48a', pelo: '#3a2a1e', yeso: '#ece6d8', yesoS: '#bdb3a0',
  mimbre: '#c49a5a', mimbreL: '#e0bc7a', mimbreS: '#8e6a36', cordel: '#e8d8b0', cafe: '#3a2014', taza: '#e8e6e0',
  lampara: '#ffd890', libro1: '#7a2a2e', libro2: '#2a3e66', libro3: '#3a5a3a', libro4: '#a8823a', libro5: '#5e4a6e', libro6: '#8a8478', libro7: '#a85a32', libro8: '#2e4a4e',
});

const D_LIBROS = ['libro1', 'libro2', 'libro3', 'libro4', 'libro5', 'libro6', 'libro7', 'libro8'];

// un fondo fijo que se pinta una vez por R en un búfer y se copia en cada fotograma (como c_fondoFijo de th-comun.js)
const D_CACHE = new WeakMap();

function d_fijo(R, clave, dibuja) {
  let m = D_CACHE.get(R); if (!m) D_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// la trama ordenada 4 × 4 (0–1) para degradados y halos sin ruido
const D_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d_b4 = (x, y) => (D_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0 el primero, 1 el segundo)
const d_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// tiñe el píxel (x, y) hacia el color c en la proporción m (la luz de la lámpara, el halo del negatoscopio, las sombras)
function d_tine(R, x, y, c, m) { if (x < 0 || x > 319 || y < 0 || y > 179 || m <= 0) return; R.pset(x, y, d_mezcla(R.pget(x, y), c, Math.min(1, m))); }

// una sombra elíptica tramada en el suelo (oscurece lo que hay)
function d_sombra(R, cx, cy, rx, ry, f = 0.75) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) d_tine(R, x, cy + j, D_P.madD, 1 - f); }
}

// un rectángulo que respeta R.recorte (R.rect no lo respeta): para todo lo que va detrás del cristal
function d_rect(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) R.linea(Math.round(x0), y, Math.round(x1), y, c); }

// un cuarterón de madera en relieve (como h_cuarteron de th-comun.js): bisel con luz arriba a la izquierda, campo y vetas
function d_cuarteron(R, x0, y0, x1, y1, k = 0) {
  const P = D_P; R.rect(x0, y0, x1, y1, P.madD); R.rect(x0, y0, x1 - 1, y1 - 1, P.madL); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, P.mad);
  R.rect(x0 + 2, y0 + 2, x1 - 2, y1 - 2, P.madV); R.rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, P.mad);
  for (let i = 0; i < 3; i++) { const vx = x0 + 5 + Math.floor(h(k, i, 120) * (x1 - x0 - 10));
    for (let y = y0 + 4; y < y1 - 3; y++) if (h(vx, y, 121 + i) > 0.1) R.pset(Math.min(x1 - 4, Math.max(x0 + 4, vx + Math.round(Math.sin(y * 0.09 + k * 1.7 + i * 2) * 1.6))), y, i === 1 ? P.madL : P.madS); }
}

// el perfil de una rueda con dientes triangulares: el radio en el ángulo a (r: el fondo del diente, alto: la punta)
const d_perfil = (a, r, n, alto, rot) => { const f = ((a - rot) * n / (Math.PI * 2)) % 1, u = f < 0 ? f + 1 : f; return r + alto * (1 - Math.abs(2 * u - 1)); };

// una rueda de tiza en la pizarra: el contorno de los dientes con el grano de la tiza, el cubo y cuatro radios
function d_ruedaTiza(R, cx, cy, r, n, rot, k) {
  const P = D_P, alto = Math.max(2, Math.round(r * 0.16)), m = r + alto + 1;
  for (let j = -m; j <= m; j++) for (let i = -m; i <= m; i++) { const d = Math.hypot(i, j), p = d_perfil(Math.atan2(j, i), r, n, alto, rot);
    const e = Math.abs(d - p); if (e < 1.0 && h(cx + i, cy + j, 140 + k) < 0.9) R.pset(cx + i, cy + j, e < 0.55 ? P.tiza : P.tizaS); }
  for (let a = 0; a < Math.PI * 2; a += 0.9 / r) { const x = Math.round(cx + Math.cos(a) * r * 0.3), y = Math.round(cy + Math.sin(a) * r * 0.3); if (h(x, y, 141 + k) < 0.8) R.pset(x, y, P.tizaS); }
  for (let s = 0; s < 4; s++) { const a = rot + s * Math.PI / 2; for (let q = r * 0.3; q < r - 1; q += 1) { const x = Math.round(cx + Math.cos(a) * q), y = Math.round(cy + Math.sin(a) * q); if (h(x, y, 142 + k) < 0.82) R.pset(x, y, P.tiza); } }
  R.pset(cx, cy, P.tiza);
}

// una línea de tiza con su grano
function d_tiza(R, x0, y0, x1, y1, c, k = 0) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); if (h(x, y, 130 + k) < 0.85) R.pset(x, y, c); }
}

// UNA PLACA DE RAYOS (x0, y0)–(x1, y1): la base azul casi negra, la silueta del terrón algo más clara (con su costra y
// grietas) y, dentro, RUEDAS fantasmales en capas (cada una: [cx, cy, r, dientes, giro, peso]); el brillo se suma y se
// pasa a la rampa del negativo con trama (pinta píxel a píxel: solo en búferes fijos)
function d_placa(R, x0, y0, x1, y1, ruedas, bulto, k = 0) {
  const P = D_P, RAMPA = [P.film, P.filmM, P.filmL, P.filmLL, P.luz];
  const [bx, by, br] = bulto;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let b = 0.08 + h(x >> 2, y >> 2, 400 + k) * 0.03;
    const dx = x - bx, dy = (y - by) * 1.15, a = Math.atan2(dy, dx), rb = br * (1 + 0.12 * Math.sin(3 * a + k) + 0.07 * Math.sin(7 * a + 2 * k) + 0.04 * Math.sin(13 * a)), d = Math.hypot(dx, dy);
    if (d < rb) { b += 0.17 + (d > rb - 3 ? 0.1 : 0) + h(x >> 2, y >> 2, 401 + k) * 0.06; if (Math.abs(Math.sin((x + y * 0.4) * 0.11 + k)) < 0.03 && d < rb - 4) b -= 0.12; }
    for (const [cx, cy, r, n, rot, w] of ruedas) {
      const ex = x - cx, ey = y - cy, dd = Math.hypot(ex, ey); if (dd > r + r * 0.2 + 2) continue;
      const p = d_perfil(Math.atan2(ey, ex), r, n, Math.max(1.5, r * 0.14), rot);
      if (Math.abs(dd - p) < 1.1) b += w; else if (dd < p) { b += w * 0.22; if (dd < r * 0.18) b += w * 0.6; else if (dd < r * 0.8) for (let s = 0; s < 4; s++) { const sa = rot + s * Math.PI / 2; if (Math.abs(ex * Math.sin(sa) - ey * Math.cos(sa)) < Math.max(1, r * 0.06) && ex * Math.cos(sa) + ey * Math.sin(sa) > 0) b += w * 0.5; } if (Math.abs(dd - r * 0.82) < 0.8) b += w * 0.4; }
    }
    const v = Math.max(0, Math.min(1, b)) * (RAMPA.length - 1), i = Math.floor(v), f = v - i;
    R.pset(x, y, RAMPA[Math.min(RAMPA.length - 1, i + (f > d_b4(x, y) ? 1 : 0))]);
  }
}

// EL FONDO FIJO DEL DESPACHO (en su búfer): techo, pared, friso, parqué, alfombra, estantería, negatoscopio con sus
// placas, grabado, pizarra con sus ruedas de tiza, escritorio y lo que hay encima (menos el teléfono, que tiembla),
// silla, el laboratorio detrás del cristal (lo que no se mueve) y la luz: el charco cálido de la lámpara y el halo frío
// del negatoscopio
function d_despachoFondo(R, lampara) {
  const { rect, pset, linea, disco } = R, P = D_P;
  // la cornisa de escayola del techo
  rect(0, 0, 319, 5, P.cornisa); rect(0, 0, 319, 0, P.cornisaS); rect(0, 3, 319, 3, P.cornisaS); rect(0, 5, 319, 5, P.paredD);
  for (let x = 0; x < 320; x += 6) { pset(x, 2, P.cornisaS); pset(x + 3, 4, P.cornisaS); }
  // el papel pintado: rayas finas de dos tonos, un rombito entre raya y raya y motas; cerca de la esquina de Atom, sin rombitos
  for (let y = 6; y < 102; y++) for (let x = 0; x < 320; x++) {
    const xm = x % 12, calma = x > 256 && y < 50;
    let c = xm === 0 ? P.paredS : xm === 1 && (y & 1) ? P.paredL : P.pared;
    if (!calma && xm === 6 && y % 16 === 8) c = P.paredS; else if (!calma && (xm === 5 || xm === 7) && y % 16 === 8 && (y & 1) === 0) c = P.paredL;
    if (h(x, y, 300) > 0.985) c = P.paredS;
    if (y < 12 && d_b4(x, y) < (12 - y) / 8) c = d_mezcla(c, P.paredD, 0.5);   // la sombra bajo la cornisa
    pset(x, y, c);
  }
  // el friso de madera: moldura, cuarterones y zócalo
  rect(0, 101, 319, 101, P.madD); rect(0, 102, 319, 102, P.madL); rect(0, 103, 319, 104, P.mad); rect(0, 105, 319, 105, P.madS);
  rect(0, 106, 319, 146, P.madS);
  for (let x = 1, k = 0; x < 320; x += 30, k++) d_cuarteron(R, x, 108, x + 27, 143, k);
  rect(0, 144, 319, 145, P.madS); rect(0, 146, 319, 146, P.madL); rect(0, 147, 319, 149, P.madD);
  // el parqué: tablas que se ensanchan hacia delante, juntas al tresbolillo, vetas y el brillo de la cera
  const FILAS = [150, 153, 157, 162, 168, 175, 183];
  for (let f = 0; f + 1 < FILAS.length; f++) { const y0 = FILAS[f], y1 = Math.min(179, FILAS[f + 1] - 1), L = 26 + f * 7;
    rect(0, y0, 319, y1, P.tabla); rect(0, y0, 319, y0, P.tablaD);
    for (let x = -Math.round(h(f, 1, 310) * L); x < 320; x += L) { linea(x, y0, x, y1, P.tablaD); if (x + 1 < 320) linea(x + 1, y0 + 1, x + 1, y1, P.tablaL); }
    for (let g = 0; g < 2 + f; g++) { const gy = y0 + 1 + Math.round(h(f, g, 311) * Math.max(0, y1 - y0 - 1)); let x = Math.round(h(f, g, 312) * 30) - 20; while (x < 320) { const l = 8 + Math.round(h(x, gy, 313) * 26); rect(Math.max(0, x), gy, Math.min(319, x + l), gy, g % 3 === 2 ? P.tablaL : P.tablaS); x += l + 6 + Math.round(h(x, gy, 314) * 14); } }
  }
  for (let y = 150; y < 157; y++) for (let x = 0; x < 320; x++) d_tine(R, x, y, P.madD, (157 - y) / 7 * 0.3);   // la sombra al pie del friso
  // la alfombra (trapecio): flecos, cenefa de dos colores, campo rojo con un medallón azul y rombos de oro
  for (let y = 158; y <= 178; y++) { const u = (y - 158) / 20, xa = Math.round(130 - u * 12), xb = Math.round(256 + u * 12);
    for (let x = xa; x <= xb; x++) { const bx = Math.min(x - xa, xb - x), by = Math.min(y - 158, 178 - y), cx = (x - (xa + xb) / 2) / ((xb - xa) / 2), cy = (y - 168) / 10;
      let c = P.alf;
      if (bx < 1 || by < 1) c = P.alfS; else if (bx < 4 || by < 2) c = (x + y) & 1 ? P.alfO : P.alfL; else if (bx < 6 || by < 3) c = P.alfA;
      else { const rm = Math.abs(cx) * 1.6 + Math.abs(cy); if (rm < 0.55) c = rm < 0.25 ? P.alfO : (x + y) % 3 ? P.alfA : P.alfL; else if (rm < 0.62) c = P.alfO; else if (((x + 2 * y) % 9 === 0) || ((x - 2 * y + 900) % 9 === 0)) c = P.alfL; }
      if (h(x, y, 320) > 0.93) c = d_mezcla(c, P.alfS, 0.5); pset(x, y, c); }
    if (y % 2 === 0) { pset(xa - 1, y, P.alfF); pset(xa - 2, y, P.alfF); pset(xb + 1, y, P.alfF); pset(xb + 2, y, P.alfF); } }
  // LA ESTANTERÍA (x 0–58, y 24–152): costados, baldas con su sombra, libros de lomos sin letras (bandas doradas),
  // cajas de archivo, una pila tumbada, un busto de yeso y una maqueta de rueda
  rect(0, 22, 60, 152, P.madD); rect(1, 23, 59, 24, P.madL); rect(2, 25, 57, 150, P.madS);
  const BALDAS = [26, 51, 76, 101, 126, 150];
  for (let b = 0; b + 1 < BALDAS.length; b++) { const y0 = BALDAS[b] + 1, y1 = BALDAS[b + 1] - 3;
    rect(3, y0, 56, y1, d_mezcla(P.madS, P.madD, 0.55)); rect(3, y0, 56, y0 + 2, P.madD);   // el fondo del hueco, en sombra
    let x = 4, k = 0;
    while (x < 54) { const tipo = h(b, k, 330);
      if (b === 1 && k === 3) { // el busto de yeso sobre su peana
        rect(x, y1 - 2, x + 8, y1, P.yesoS); disco(x + 4, y1 - 13, 3, P.yeso); rect(x + 1, y1 - 9, x + 7, y1 - 3, P.yeso); rect(x + 6, y1 - 9, x + 7, y1 - 3, P.yesoS); pset(x + 5, y1 - 13, P.yesoS); rect(x + 2, y1 - 16, x + 5, y1 - 16, P.yesoS); x += 10; k++; continue; }
      if (b === 3 && k === 2) { // la maqueta de rueda dentada de latón en su pie
        const cx = x + 7, cy = y1 - 9; for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j), p = d_perfil(Math.atan2(j, i), 5.5, 12, 1.8, 0.2); if (d <= p) pset(cx + i, cy + j, d > p - 1 ? P.latonS : i + j < -3 ? P.latonL : P.laton); }
        disco(cx, cy, 2, P.latonS); pset(cx, cy, P.latonL); rect(cx - 1, cy + 7, cx + 1, y1, P.latonS); rect(cx - 4, y1, cx + 4, y1, P.madD); x += 16; k++; continue; }
      if (tipo < 0.1 && x < 44) { // una caja de archivo de cartón con su asa
        rect(x, y1 - 15, x + 10, y1, P.cajaS); rect(x + 1, y1 - 14, x + 9, y1, P.caja); rect(x + 1, y1 - 14, x + 1, y1, P.cajaL); rect(x + 3, y1 - 11, x + 7, y1 - 10, P.cajaD); rect(x + 3, y1 - 5, x + 7, y1 - 4, P.cajaL); x += 12; k++; continue; }
      if (tipo > 0.9 && x < 42) { // una pila de libros tumbados
        for (let i = 0; i < 4; i++) { const c = P[D_LIBROS[(b * 3 + i) % 8]], w = 11 - (i % 2) * 2; rect(x + (i % 2), y1 - 2 - i * 3, x + w, y1 - i * 3, c); rect(x + (i % 2), y1 - 2 - i * 3, x + w, y1 - 2 - i * 3, d_mezcla(c, P.papel, 0.35)); pset(x + w, y1 - 1 - i * 3, P.papel); } x += 13; k++; continue; }
      const w = 2 + Math.floor(h(b, k, 331) * 3), alto = (y1 - y0) - 3 - Math.floor(h(b, k, 332) * 6), c = P[D_LIBROS[Math.floor(h(b, k, 333) * 8)]];
      rect(x, y1 - alto, x + w, y1, c); rect(x, y1 - alto, x, y1, d_mezcla(c, P.papel, 0.25)); rect(x + w, y1 - alto, x + w, y1, d_mezcla(c, P.madD, 0.45));
      if (h(b, k, 334) < 0.6) { rect(x, y1 - alto + 2, x + w, y1 - alto + 2, P.laton); rect(x, y1 - 3, x + w, y1 - 3, P.laton); } else rect(x + 1, y1 - alto + 3, x + w - 1, y1 - alto + 5, P.papelS);
      x += w + 1; k++;
    }
    rect(2, BALDAS[b + 1] - 2, 57, BALDAS[b + 1], P.madL); rect(2, BALDAS[b + 1], 57, BALDAS[b + 1], P.madS); rect(2, BALDAS[b + 1] + 1, 57, BALDAS[b + 1] + 1, P.madD);
  }
  rect(0, 150, 60, 152, P.madD); rect(60, 24, 61, 152, P.madD);
  // el grabado enmarcado de un templo griego (x 116–150, y 28–54): marco dorado, paspartú y columnas a la sepia
  rect(116, 28, 150, 54, P.latonS); rect(117, 29, 149, 53, P.laton); rect(117, 29, 149, 29, P.latonL); rect(119, 31, 147, 51, P.papel);
  rect(122, 34, 144, 48, P.papelS); rect(122, 34, 144, 38, d_mezcla(P.papelS, P.papel, 0.5));
  for (let x = 124; x <= 142; x += 4) { rect(x, 40, x + 1, 46, P.tinta); }
  linea(122, 39, 133, 35, P.tinta); linea(133, 35, 144, 39, P.tinta); rect(123, 39, 143, 39, P.tinta); rect(122, 47, 144, 47, P.tinta);
  d_sombra(R, 134, 55, 17, 0, 0.8);
  // el reloj de pared (cx 90, cy 42, r 10): caja de madera, esfera con sus marcas (las agujas, en cada fotograma)
  disco(91, 43, 12, d_mezcla(P.pared, P.madD, 0.35)); disco(90, 42, 12, P.madD); disco(90, 42, 11, P.madL); disco(90, 42, 10, P.mad); disco(90, 42, 8, P.papel);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; pset(Math.round(90 + Math.cos(a) * 7), Math.round(42 + Math.sin(a) * 7), i % 3 ? P.papelS : P.negro); }
  pset(88, 36, P.cajaL);
  // EL NEGATOSCOPIO (x 64–152, y 64–124): la caja de chapa crema con su bisel, el panel de luz, tres placas sujetas con
  // pinzas, el interruptor y el cable que baja al enchufe
  rect(63, 63, 153, 126, P.cajaD); rect(64, 64, 152, 125, P.cajaS); rect(64, 64, 151, 124, P.cajaL); rect(65, 65, 151, 124, P.caja);
  rect(67, 67, 149, 119, P.luzS); rect(68, 68, 148, 118, P.luz);
  for (const [x0, k, ruedas] of [[69, 1, [[81, 84, 9, 12, 0.3, 0.32], [77, 98, 6, 10, 1.0, 0.22], [86, 104, 4, 8, 0.2, 0.2]]], [97, 2, [[110, 92, 11, 16, 0.1, 0.36], [104, 82, 5, 9, 0.5, 0.24], [116, 106, 6, 10, 0.9, 0.22]]], [125, 3, [[137, 90, 8, 12, 0.6, 0.3], [133, 102, 7, 11, 0.2, 0.26], [143, 80, 4, 8, 0.1, 0.2]]]]) {
    d_placa(R, x0, 70, x0 + 24, 116, ruedas, [x0 + 12, 93, 11], k);
    rect(x0 + 9, 68, x0 + 15, 70, P.negroL); rect(x0 + 10, 68, x0 + 14, 68, P.negroB);   // la pinza
  }
  rect(67, 120, 149, 122, P.cajaS); rect(140, 121, 146, 123, P.negroM); pset(141, 121, P.rojo);   // el interruptor con su piloto
  linea(150, 126, 152, 134, P.negro); linea(152, 134, 152, 140, P.negro); rect(150, 140, 154, 143, P.cajaL); rect(151, 141, 153, 142, P.cajaS);
  // el halo frío del negatoscopio sobre la pared y el friso (tramado)
  for (let y = 54; y < 150; y++) for (let x = 52; x < 166; x++) { if (x >= 63 && x <= 153 && y >= 63 && y <= 126) continue;
    const dx = Math.max(0, Math.abs(x - 108) - 45), dy = Math.max(0, Math.abs(y - 94) - 31), d = Math.hypot(dx, dy * 1.2); if (d < 13) d_tine(R, x, y, P.luz, (1 - d / 13) * 0.3); }
  // LA PIZARRA (x 158–246, y 30–100): marco de roble, el verde con borrones de tiza vieja, dos ruedas que engranan
  // (20 y 40 dientes) con sus números, flechas de giro, una cuenta y una espiral; abajo, el cajetín con tizas y borrador
  rect(158, 30, 246, 100, P.madD); rect(159, 31, 245, 99, P.madL); rect(161, 33, 243, 97, P.madS);
  for (let y = 34; y <= 96; y++) for (let x = 162; x <= 242; x++) { let c = P.piz; const nb = h(x >> 3, y >> 2, 340); if (nb > 0.82 && d_b4(x, y) < 0.45) c = P.pizL; else if (h(x, y, 341) > 0.96) c = P.pizS; else if (y < 38 && d_b4(x, y) < 0.3) c = P.pizS; pset(x, y, c); }
  d_ruedaTiza(R, 179, 66, 9, 20, 0.12, 1);
  d_ruedaTiza(R, 211, 60, 18, 40, 0.0, 2);
  R.numero('20', 179, 92, { color: P.tiza, centro: true, sombra: false, fina: true });
  R.numero('40', 211, 92, { color: P.tiza, centro: true, sombra: false, fina: true });
  for (let a = -2.4; a < -1.0; a += 0.08) pset(Math.round(182 + Math.cos(a) * 15), Math.round(66 + Math.sin(a) * 15), P.tiza);   // la flecha de giro de la pequeña
  d_tiza(R, 175, 53, 172, 52, P.tiza, 3); d_tiza(R, 175, 53, 174, 50, P.tiza, 4);
  for (let a = -0.9; a < 0.5; a += 0.05) pset(Math.round(211 + Math.cos(a) * 25), Math.round(60 + Math.sin(a) * 25), P.tiza);
  d_tiza(R, 233, 72, 236, 69, P.tiza, 5); d_tiza(R, 233, 72, 230, 70, P.tiza, 6);
  R.numero('1:2', 230, 46, { color: P.tizaS, centro: true, sombra: false, fina: true });
  for (let a = 0; a < 12; a += 0.15) { const r = 1 + a * 0.55; pset(Math.round(172 + Math.cos(a) * r), Math.round(42 + Math.sin(a) * r * 0.9), P.tizaS); }
  rect(158, 100, 246, 103, P.madL); rect(158, 103, 246, 104, P.madD);
  rect(166, 98, 172, 99, P.tiza); rect(174, 99, 177, 99, P.amarillo); rect(220, 96, 232, 99, P.madL); rect(220, 99, 232, 99, P.tizaS); rect(221, 96, 231, 97, P.cajaD);
  // la silla giratoria de madera (detrás de la mesa, se asoma el respaldo de barrotes)
  rect(214, 118, 236, 120, P.madL); rect(214, 120, 236, 121, P.madD);
  for (let x = 216; x <= 234; x += 4) rect(x, 121, x + 1, 136, P.mad);
  // EL ESCRITORIO de nogal (x 166–250): tablero visto desde arriba (y 137–141), canto, cajones con tiradores de latón y patas
  rect(166, 136, 250, 142, P.madD); rect(167, 137, 249, 140, P.madL); rect(167, 137, 249, 137, d_mezcla(P.madL, P.papel, 0.3));
  for (let x = 170; x < 248; x += 9) if (h(x, 1, 350) < 0.7) rect(x, 138 + (x % 3 ? 1 : 0), x + 5, 138 + (x % 3 ? 1 : 0), P.mad);
  rect(166, 141, 250, 142, P.madS);
  rect(168, 143, 248, 152, P.madS);
  for (const [x0, x1] of [[170, 196], [222, 246]]) { d_cuarteron(R, x0, 143, x1, 148, x0); d_cuarteron(R, x0, 149, x1, 154, x0 + 1); rect((x0 + x1 >> 1) - 2, 145, (x0 + x1 >> 1) + 2, 146, P.latonS); rect((x0 + x1 >> 1) - 1, 145, (x0 + x1 >> 1) + 1, 145, P.latonL); rect((x0 + x1 >> 1) - 2, 151, (x0 + x1 >> 1) + 2, 152, P.latonS); rect((x0 + x1 >> 1) - 1, 151, (x0 + x1 >> 1) + 1, 151, P.latonL); }
  rect(198, 143, 220, 150, P.madD); rect(199, 143, 219, 144, d_mezcla(P.madD, P.madS, 0.5));   // el hueco de las rodillas
  rect(168, 152, 170, 156, P.madD); rect(246, 152, 248, 156, P.madD); rect(197, 150, 199, 155, P.madD); rect(219, 150, 221, 155, P.madD);
  d_sombra(R, 208, 157, 44, 1, 0.7);
  // lo de encima: la regla de cálculo (canto de delante), papeles con columnas de números, la máquina de escribir con su
  // hoja, la pila de libros y la lámpara de banquero
  rect(184, 140, 214, 141, P.papel); rect(194, 140, 202, 141, P.cajaL); for (let x = 185; x < 214; x += 2) pset(x, 140, P.tinta); rect(197, 140, 197, 141, P.rojo);
  for (const [px, py, gr] of [[219, 131, -1], [222, 133, 1]]) { rect(px, py, px + 12, py + 5, P.papelS); rect(px, py, px + 11, py + 4, P.papel); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) if (h(px + c, r, 351) < 0.85) rect(px + 1 + c * 3, py + 1 + r * 1, px + 2 + c * 3, py + 1 + r, P.tinta); }
  // la máquina de escribir (x 192–212): carro con rodillo y la hoja, teclado en gradas y la caja negra con brillo
  rect(194, 122, 210, 128, P.papel); for (let y = 123; y < 128; y += 2) rect(196, y, 208, y, P.papelS);
  rect(190, 127, 214, 129, P.negroM); rect(189, 128, 189, 128, P.cajaL); rect(215, 128, 216, 128, P.cajaL); rect(190, 127, 214, 127, P.negroL);
  rect(192, 130, 212, 136, P.negro); rect(193, 130, 211, 130, P.negroL);
  for (let r = 0; r < 3; r++) for (let x = 194 + r; x < 211 - r; x += 2) pset(x, 132 + r * 1.5 | 0, r === 0 ? P.cajaL : P.negroB);
  rect(194, 136, 210, 136, P.negroM);
  // la pila de libros y el tazón (x 170–188): lomos de colores y una taza con su asa
  for (let i = 0; i < 3; i++) { const c = P[D_LIBROS[(i * 3 + 1) % 8]]; rect(169 + i, 133 - i * 3, 186 - i, 135 - i * 3, c); rect(169 + i, 133 - i * 3, 186 - i, 133 - i * 3, d_mezcla(c, P.papel, 0.4)); rect(186 - i, 134 - i * 3, 186 - i, 135 - i * 3, P.papel); }
  // la lámpara de banquero (pie de latón, pantalla verde de vidrio) en x 238
  rect(232, 134, 244, 136, P.latonS); rect(233, 134, 243, 134, P.latonL); rect(237, 118, 238, 134, P.laton); pset(237, 120, P.latonL);
  for (let y = 110; y <= 117; y++) { const w = 4 + Math.round((y - 110) * 0.9); rect(238 - w, y, 238 + w, y, y === 110 ? P.verdeL : y < 113 ? P.verde : P.verdeS); pset(238 - w, y, P.verdeS); pset(238 - w + 2, y, y < 115 ? P.verdeL : P.verde); }
  rect(230, 117, 246, 118, lampara ? P.latonL : P.latonS); rect(238, 108, 239, 109, P.latonS);
  // EL TABIQUE ACRISTALADO (x 252–319, y 50–150): el laboratorio detrás, el montante de la parte fija y su zócalo; la
  // puerta (x 286–317) se pinta en cada fotograma
  d_laboratorio(R);
  rect(250, 50, 253, 150, P.madD); rect(251, 51, 252, 149, P.madL); rect(250, 50, 319, 53, P.madD); rect(251, 51, 319, 52, P.madL);
  rect(254, 54, 283, 55, P.madS); rect(282, 54, 285, 150, P.madD); rect(283, 55, 284, 149, P.madL);
  rect(254, 129, 283, 150, P.madS); d_cuarteron(R, 255, 131, 281, 146, 7); rect(254, 128, 283, 129, P.madD);
  for (let i = 0; i < 2; i++) { const x0 = 258 + i * 12; for (let y = 58; y < 126; y++) { const x = x0 + Math.round((126 - y) * 0.35); if (x <= 281) { d_tine(R, x, y, P.cristalL, 0.45); d_tine(R, x + 1, y, P.cristalL, 0.25); } } }
  // LA LUZ: el charco cálido de la lámpara (sobre la mesa, la pizarra y el friso) y las esquinas en penumbra
  for (let y = 6; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dl = Math.hypot((x - 236) / 1.25, (y - 128) * (y < 118 ? 1.6 : 1)), warm = lampara ? Math.max(0, 1 - dl / 70) : 0;
    if (warm > 0) d_tine(R, x, y, P.lampara, warm * 0.24);
    const vig = Math.max(0, Math.hypot((x - 170) / 190, (y - 100) / 110) - 0.72) * (lampara ? 1.2 : 2.2);
    if (vig > 0) d_tine(R, x, y, P.madD, Math.min(0.32, vig * 0.3));
  }
  if (lampara) for (let y = 119; y < 137; y++) { const w = Math.round(6 + (y - 119) * 0.9); for (let x = 238 - w; x <= 238 + w; x++) d_tine(R, x, y, P.latonL, Math.max(0, 0.2 - (y - 119) / 90) * (1 - Math.abs(x - 238) / (w + 1))); }
}

// EL LABORATORIO DE RAYOS GAMMA detrás del cristal (lo fijo, recortado a x 254–317, y 54–150): pared de ladrillos de plomo
// y azulejo blanco, el signo de radiación, el panel de mandos, la columna de la máquina con su contrapeso, la mesa
// con la placa fotográfica (el terrón y el cabezal se pintan en cada fotograma) y el suelo de terrazo
function d_laboratorio(R) {
  const P = D_P, { pset, linea, disco, poligono } = R; R.recorte([254, 54, 317, 150]);
  for (let y = 54; y <= 150; y++) for (let x = 254; x <= 317; x++) {
    let c;
    if (y > 124) c = (h(x, y, 360) > 0.8 ? P.azulejoS : P.azulejo);   // el terrazo
    else if (y > 92) { const fy = (y - 93) % 6, fx = (x + ((y - 93) / 6 | 0) % 2 * 6) % 12; c = fy === 0 || fx === 0 ? P.plomoS : fy === 1 ? P.plomoL : P.plomo; }   // los ladrillos de plomo
    else { const fy = (y - 54) % 8, fx = (x - 254) % 8; c = fy === 0 || fx === 0 ? P.azulejoS : P.azulejo; }   // el azulejo
    pset(x, y, d_mezcla(c, P.cristal, 0.18));
  }
  linea(254, 124, 317, 124, P.plomoD);
  // el signo de radiación (trébol amarillo y negro) y el panel de mandos con diales
  disco(262, 66, 5, P.negro); disco(262, 66, 4, P.amarillo);
  for (let s = 0; s < 3; s++) { const a = -Math.PI / 2 + s * Math.PI * 2 / 3; for (let r = 1.8; r < 4; r += 0.5) for (let da = -0.45; da <= 0.45; da += 0.12) pset(Math.round(262 + Math.cos(a + da) * r), Math.round(66 + Math.sin(a + da) * r), P.negro); }
  pset(262, 66, P.negro);
  d_rect(R, 256, 98, 270, 124, P.plomoD); d_rect(R, 257, 99, 269, 112, P.caja); d_rect(R, 257, 99, 269, 99, P.cajaL);
  for (const [dx, dy] of [[260, 103], [266, 103]]) { disco(dx, dy, 2, P.negro); pset(dx, dy - 1, P.cajaL); }
  d_rect(R, 258, 108, 268, 109, P.negroM);
  // la columna de la máquina (gris plomo) con su contrapeso y el carril del brazo
  d_rect(R, 296, 60, 302, 124, P.plomoD); d_rect(R, 297, 60, 300, 124, P.plomo); linea(297, 60, 297, 124, P.plomoL);
  d_rect(R, 293, 116, 305, 124, P.plomoS); d_rect(R, 293, 116, 305, 117, P.plomoL);
  // la mesa de acero con la placa en su chasis
  d_rect(R, 262, 112, 290, 114, P.plomoL); d_rect(R, 262, 115, 290, 115, P.plomoD); linea(264, 116, 264, 128, P.plomoD); linea(288, 116, 288, 128, P.plomoD);
  d_rect(R, 266, 110, 284, 111, P.negroM); d_rect(R, 267, 110, 283, 110, P.negroL);
  R.recorte(null);
}

// lo que se mueve en el despacho cada fotograma: las agujas del reloj, el parpadeo del tubo del negatoscopio, el
// laboratorio (técnico, piloto, cabezal, terrón, halo), la puerta, el teléfono, el vapor del café, las motas en la luz y
// el libro
function d_despachoVida(R, t, o) {
  const { rect, pset, linea, disco } = R, P = D_P, suena = o.suena ?? 0, rayos = o.rayos ?? 0, abre = Math.max(0, Math.min(1, o.puerta ?? 0));
  // el reloj: minutero y horario (empieza a las diez y diez y anda deprisa, para que se note)
  const mi = -Math.PI / 2 + (10 + t * 0.6) / 60 * Math.PI * 2, ho = -Math.PI / 2 + (10 + 10 / 60 + t * 0.01) / 12 * Math.PI * 2;
  linea(90, 42, Math.round(90 + Math.cos(ho) * 4), Math.round(42 + Math.sin(ho) * 4), P.negro); linea(90, 42, Math.round(90 + Math.cos(mi) * 6), Math.round(42 + Math.sin(mi) * 6), P.negro);
  const se = -Math.PI / 2 + Math.floor(t) / 60 * Math.PI * 2; linea(90, 42, Math.round(90 + Math.cos(se) * 7), Math.round(42 + Math.sin(se) * 7), P.rojo); pset(90, 42, P.latonL);
  // el tubo del negatoscopio: de vez en cuando titila
  const tit = (t % 6.3) < 0.12 || ((t % 6.3) > 0.2 && (t % 6.3) < 0.26);
  if (tit) for (let y = 68; y <= 118; y++) for (let x = 68; x <= 148; x++) { const c = R.pget(x, y); if (c === P.luz || c === P.filmLL) pset(x, y, P.luzS); }
  else { const u = (t * 0.7) % 1, yb = 68 + Math.round(u * 50); for (let x = 68; x <= 148; x++) if (R.pget(x, yb) === P.luz && (x & 1)) pset(x, yb, P.cajaL); }   // la raya de barrido del tubo
  // EL LABORATORIO (recortado a lo que se ve: el cristal fijo y el hueco de la puerta)
  R.recorte([254, 56, 317, 128]);
  const pil = rayos > 0.5 ? (Math.sin(t * 9) > 0 ? P.rojoL : P.rojo) : (Math.sin(t * 2.2) > 0.6 ? P.rojoS : P.plomoS);   // el piloto
  disco(276, 62, 3, P.plomoD); disco(276, 62, 2, pil); if (rayos > 0.5) for (let a = 0; a < 6; a++) pset(Math.round(276 + Math.cos(a + t * 3) * 5), Math.round(62 + Math.sin(a + t * 3) * 5), P.rojoL);
  // el brazo y el cabezal: baja sobre la placa con o.rayos
  const yc = Math.round(84 + rayos * 10);
  d_rect(R, 278, yc - 4, 299, yc - 2, P.plomoS); d_rect(R, 278, yc - 4, 299, yc - 4, P.plomoL);
  d_rect(R, 269, yc - 6, 281, yc + 4, P.plomoD); d_rect(R, 270, yc - 5, 280, yc + 3, P.plomo); linea(270, yc - 5, 270, yc + 3, P.plomoL); d_rect(R, 272, yc + 4, 278, yc + 5, P.amarillo);
  // el terrón sobre la placa: bronce verde con madera negra, roto por un lado, y la rueda que brilla en la grieta
  if (o.terron !== false) { const tx = 274, ty = 106;
    R.poligono([[tx - 8, ty + 3], [tx - 7, ty - 2], [tx - 3, ty - 5], [tx + 3, ty - 4], [tx + 7, ty - 2], [tx + 7, ty + 3], [tx - 5, ty + 4]], P.verdin); for (let i = -5; i <= 4; i += 3) R.pset(tx + i, ty + 1 - (i & 1), P.verdinS);
    linea(tx - 5, ty - 2, tx + 3, ty - 3, P.verdinL); linea(tx - 6, ty + 3, tx + 5, ty + 3, P.verdinS); pset(tx - 3, ty, P.negro); pset(tx - 2, ty + 1, P.negro); pset(tx + 4, ty + 1, P.negroM);
    pset(tx + 2, ty - 1, (t * 1.3) % 2 < 0.3 ? P.latonL : P.laton); pset(tx + 3, ty, P.latonS); }
  if (rayos > 0) for (let j = -9; j <= 9; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 1.2) / 12; if (d < 1 && d_b4(274 + i, 102 + j) < (1 - d) * rayos * (0.5 + 0.2 * Math.sin(t * 6))) d_tine(R, 274 + i, 102 + j, P.amarillo, 0.3); }
  // el técnico del laboratorio (bata gris y gorro: no es nadie del reparto), que va del panel a la máquina y vuelve
  const ux = (Math.sin(t * 0.55) + 1) / 2, tx = Math.round(258 + ux * 28), anda = Math.abs(Math.cos(t * 0.55)) > 0.25, pie = anda && Math.floor(t * 6) % 2;
  d_rect(R, tx, 112, tx + 4, 120, P.bata); linea(tx, 112, tx, 120, P.bataS); d_rect(R, tx + 1, 121, tx + 1, 124 - pie, P.negroM); d_rect(R, tx + 3, 121, tx + 3, 124 - (1 - pie) * (anda ? 1 : 0), P.negroM);
  disco(tx + 2, 108, 2, P.piel); d_rect(R, tx, 105, tx + 4, 106, P.cajaL); pset(tx + (Math.cos(t * 0.55) > 0 ? 3 : 1), 108, P.negro);
  R.recorte(null);
  // LA PUERTA de cristal (x 286–317): se abre hacia dentro y se estrecha hacia las bisagras de la derecha; por su
  // cristal y por el hueco se ve el laboratorio del búfer
  const w = Math.round(31 * (1 - abre * 0.72)), x0 = 317 - w;
  rect(x0, 53, 317, 56, P.madD); rect(x0, 53, x0 + 2, 150, P.madD); rect(315, 53, 317, 150, P.madD); rect(x0 + 1, 54, 316, 55, P.madL); rect(x0 + 1, 54, x0 + 1, 149, P.madL);
  rect(x0, 127, 317, 150, P.madD); rect(x0 + 1, 127, 316, 149, P.mad); rect(x0 + 1, 127, 316, 127, P.madL);
  if (w > 8) { R.recorte([x0 + 3, 57, 314, 126]); for (let y = 57; y <= 126; y++) for (let x = x0 + 3; x <= 314; x++) d_tine(R, x, y, P.cristal, abre > 0 ? 0.5 : 0.14);
    for (let i = 0; i < 2; i++) for (let y = 57; y <= 126; y++) { const x = x0 + 5 + i * 9 + Math.round((126 - y) * 0.3); if (x < 314) d_tine(R, x, y, P.cristalL, 0.4); }
    R.recorte(null); rect(x0 + 3, 128, 314, 146, P.madS); if (w > 16) d_cuarteron(R, x0 + 4, 130, 313, 145, 9); }
  rect(x0 + 3, 98, x0 + 6, 100, P.latonS); rect(x0 + 3, 98, x0 + 5, 98, P.latonL);   // el pomo
  // EL TELÉFONO NEGRO DE DISCO (cx 181, cy 131): cuerpo con brillo, el disco con sus agujeros, el auricular en la
  // horquilla, el cable rizado; con o.suena tiembla, el auricular salta y salen ondas
  const tb = suena > 0 ? Math.round(Math.sin(t * 70) * suena) : 0, salta = suena > 0.3 && Math.sin(t * 35) > 0 ? 1 : 0, cx = 181 + tb, cy = 131;
  d_sombra(R, 181, 137, 9, 1, 0.65);
  R.poligono([[cx - 8, cy + 5], [cx - 6, cy - 2], [cx + 6, cy - 2], [cx + 8, cy + 5]], P.negro);
  linea(cx - 6, cy - 2, cx + 6, cy - 2, P.negroL); linea(cx - 7, cy + 1, cx - 6, cy - 1, P.negroL);
  disco(cx, cy + 1, 4, P.negroM); disco(cx, cy + 1, 3, P.cajaL); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.4; pset(Math.round(cx + Math.cos(a) * 3), Math.round(cy + 1 + Math.sin(a) * 3), P.negro); } pset(cx, cy + 1, P.negroM);
  const ay = cy - 4 - salta * 2;
  rect(cx - 8, ay, cx + 8, ay + 1, P.negro); rect(cx - 6, ay - 1, cx + 6, ay - 1, P.negroL); rect(cx - 9, ay + 1, cx - 6, ay + 3, P.negro); rect(cx + 6, ay + 1, cx + 9, ay + 3, P.negro); pset(cx - 4, ay - 1, P.negroB);
  for (let i = 0; i < 9; i++) pset(cx + 8 + i, cy + 4 + (i & 1), P.negroM);   // el cable rizado
  if (suena > 0.2) { const fase = (t * 4) % 1; for (const s of [-1, 1]) for (let k = 0; k < 2; k++) { const r = 5 + k * 3 + fase * 3; for (let a = -0.7; a <= 0.7; a += 0.18) { const x = Math.round(cx + s * (6 + Math.cos(a) * r)), y = Math.round(cy - 4 + Math.sin(a) * r); if (fase < 0.8) pset(x, y, k ? P.papelS : P.papel); } } }
  // el tazón de café y su vapor (x 190)
  rect(186, 133, 190, 136, P.taza); rect(186, 133, 190, 133, P.cafe); pset(191, 134, P.taza); pset(191, 135, P.papelS); rect(186, 136, 190, 136, P.papelS);
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1), y = Math.round(131 - u * 12), x = Math.round(188 + Math.sin(t * 2 + k * 2 + u * 5) * 1.6); if (u < 0.85) { pset(x, y, P.papel); if (u < 0.5) pset(x + 1, y + 1, P.cajaL); } }
  // las motas que flotan en la luz de la lámpara
  if (o.lampara !== false) for (let k = 0; k < 7; k++) { const x = Math.round(214 + h(k, 1, 370) * 44 + Math.sin(t * 0.7 + k) * 4), y = Math.round(112 + ((h(k, 2, 370) * 26 + t * (1.5 + k % 3)) % 26)); if (((t * 2 + k) % 3) < 2.2) d_tine(R, x, y, P.papel, 0.6); }
  // el libro de tapas con la rueda, de pie apoyado en la pila (o.libro)
  const lb = Math.max(0, Math.min(1, o.libro ?? 0));
  if (lb > 0) { const yb = Math.round(129 + (1 - lb) * 6), xb = 214;
    R.recorte([0, 0, 319, 136]); rect(xb - 6, yb - 9, xb + 6, yb + 7, P.madD); rect(xb - 5, yb - 8, xb + 5, yb + 6, P.libro2); rect(xb - 5, yb - 8, xb - 4, yb + 6, d_mezcla(P.libro2, P.papel, 0.3));
    for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const d = Math.hypot(i, j), p = d_perfil(Math.atan2(j, i), 2.8, 8, 1.2, t * 0.5); if (d <= p) pset(xb + i, yb - 1 + j, d > p - 1 ? P.latonS : P.latonL); }
    pset(xb, yb - 1, P.libro2); rect(xb - 3, yb + 4, xb + 3, yb + 4, P.laton); R.recorte(null);
    if (lb >= 1 && (t * 1.5) % 2 < 0.3) { pset(xb + 7, yb - 10, P.papel); pset(xb + 6, yb - 10, P.latonL); pset(xb + 8, yb - 10, P.latonL); pset(xb + 7, yb - 11, P.latonL); pset(xb + 7, yb - 9, P.latonL); } }
}

// LAS RADIOGRAFÍAS DE CERCA (cámara 'radiografia'): el fondo fijo en su búfer y, encima, el titileo, las motas y las
// marquitas rojas de la cuenta (o.cuenta, o.pierde); devuelve contados y punta
function d_radiografia(R, t, o) {
  const { rect, pset, linea, disco } = R, P = D_P, [cx, cy, r] = V_PRICE.despacho.radiografia.geo.rueda, N = 24, alto = 7, rot = 0.13;
  d_fijo(R, 'radiografia', () => d_radiografiaFondo(R, cx, cy, r, N, alto, rot));
  const suena = o.suena ?? 0, dx = suena > 0 ? Math.round(Math.sin(t * 60) * suena) : 0;
  if (dx) { // la placa vibra con el timbre: se corre un píxel la franja de la placa
    for (let y = 30; y <= 152; y++) { if (dx > 0) for (let x = 262; x >= 14; x--) pset(x, y, R.pget(x - 1, y)); else for (let x = 14; x <= 262; x++) pset(x, y, R.pget(x + 1, y)); } }
  // el tubo titila de vez en cuando (oscurece lo más claro de la placa)
  if ((t % 5.7) < 0.1 || ((t % 5.7) > 0.18 && (t % 5.7) < 0.23)) for (let y = 26; y <= 154; y += 1) for (let x = 10; x <= 268; x++) { const c = R.pget(x, y); if (c === P.luz) pset(x, y, P.luzS); else if (c === P.filmLL) pset(x, y, P.filmL); }
  // las motas de polvo que cruzan la luz
  for (let k = 0; k < 9; k++) { const x = Math.round(((h(k, 1, 380) * 260 + t * (3 + k % 4)) % 250) + 12), y = Math.round(30 + h(k, 2, 380) * 120 + Math.sin(t * 0.8 + k) * 5); d_tine(R, x, y, P.luz, 0.5); }
  // las marquitas de lápiz rojo: una por diente, en la punta, en el sentido de las agujas del reloj desde arriba
  const cuenta = Math.max(0, Math.min(1, o.cuenta ?? 0)), n = Math.floor(cuenta * N + 1e-6), pierde = o.pierde ?? 0;
  const paso = Math.PI * 2 / N, k0 = Math.round((-Math.PI / 2 - rot) / paso - 0.5), punta = (i) => { const a = rot + (k0 + i + 0.5) * paso; return [Math.cos(a), Math.sin(a)]; };
  for (let i = 0; i < n; i++) { const [ux, uy] = punta(i), x0 = cx + ux * (r + alto + 2), y0 = cy + uy * (r + alto + 2);
    if (pierde > 0) { // el borrón: la marca se corre en un manchurrón tramado
      for (let j = -3; j <= 3; j++) for (let q = -3; q <= 3; q++) { const d = Math.hypot(q, j) / 3.4; if (d < 1 && h(i * 7 + q, j, 390) < (1 - d) * pierde + 0.15) d_tine(R, Math.round(x0 + q + ux * 2), Math.round(y0 + j + uy * 2), P.rojo, 0.55); }
      linea(Math.round(x0 - 3), Math.round(y0 + 2), Math.round(x0 + 3), Math.round(y0 - 2), P.rojoS); }
    else { linea(Math.round(x0), Math.round(y0), Math.round(x0 + ux * 4), Math.round(y0 + uy * 4), P.rojo); linea(Math.round(x0 + 1), Math.round(y0), Math.round(x0 + 1 + ux * 4), Math.round(y0 + uy * 4), P.rojoS); pset(Math.round(x0 + ux * 4), Math.round(y0 + uy * 4), P.rojoL); }
  }
  // la cifra de la cuenta, en lápiz rojo en la tira de papel de la derecha (se emborrona con o.pierde)
  if (n > 0) { R.numero(String(n), 296, 150, { color: pierde > 0 ? P.rojoS : P.rojo, centro: true, sombra: false });
    if (pierde > 0) for (let k = 0; k < 14; k++) pset(288 + Math.round(h(k, 3, 391) * 16), 142 + Math.round(h(k, 4, 391) * 9), P.rojo); }
  const [ux, uy] = punta(Math.min(N - 1, n));
  return { dientes: N, contados: n, punta: [Math.round(cx + ux * (r + alto)), Math.round(cy + uy * (r + alto))] };
}

// el fondo fijo de las radiografías de cerca: la pared con su papel, el marco del negatoscopio con pinzas, el panel de
// luz, la placa de al lado y la placa grande con capas de ruedas fantasmales y la rueda de 24 dientes delante, la tira
// de papel con columnas de cifras a la derecha y, abajo, el borde de la mesa con lápiz, goma y lupa
function d_radiografiaFondo(R, cx, cy, r, N, alto, rot) {
  const { rect, pset, linea, disco } = R, P = D_P;
  // la pared (el mismo papel de rayas, más cerca: rayas más anchas) y el friso que asoma a la derecha
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const xm = x % 24; let c = xm < 2 ? P.paredS : xm === 2 && (y & 1) ? P.paredL : P.pared; if (h(x, y, 300) > 0.985) c = P.paredS; if (x > 270 && y < 50) c = xm < 2 ? d_mezcla(P.pared, P.paredS, 0.5) : P.pared; pset(x, y, c); }
  // el marco de chapa (x 6–272, y 22–158) con su bisel y los tornillos
  rect(6, 22, 272, 158, P.cajaD); rect(7, 23, 271, 157, P.cajaS); rect(7, 23, 270, 156, P.cajaL); rect(9, 25, 269, 155, P.caja);
  for (const [x, y] of [[12, 28], [266, 28], [12, 152], [266, 152]]) { disco(x, y, 1, P.cajaD); pset(x, y, P.cajaL); }
  rect(13, 29, 265, 151, P.luzS); rect(14, 30, 264, 150, P.luz);
  // la placa de al lado (x 16–74), con ruedas más pequeñas, montada un poco por detrás de la grande
  d_placa(R, 16, 34, 76, 148, [[44, 70, 14, 16, 0.4, 0.3], [36, 110, 10, 12, 0.1, 0.26], [58, 126, 7, 10, 0.8, 0.22], [52, 92, 20, 30, 0.2, 0.16]], [46, 92, 30], 7);
  // la placa grande (x 80–236) con el terrón, las capas fantasmales y LA RUEDA de 24 dientes delante
  d_placa(R, 80, 32, 238, 150, [[cx + 30, cy - 20, 30, 40, 0.2, 0.26], [cx - 34, cy + 24, 24, 30, 0.6, 0.24], [cx + 48, cy + 38, 14, 18, 0.1, 0.28], [cx - 50, cy - 32, 12, 15, 0.3, 0.28], [cx + 6, cy + 4, 58, 64, 0.05, 0.16], [cx, cy, r, N, rot, 0.5]], [cx + 2, cy + 2, 66], 11);
  // el borde de la placa grande (un filo claro) y las pinzas negras de arriba
  linea(80, 32, 238, 32, P.filmLL); linea(80, 32, 80, 150, P.filmL); linea(238, 32, 238, 150, P.filmM);
  for (const x of [104, 214, 40]) { rect(x - 6, 26, x + 6, 34, P.negro); rect(x - 5, 27, x + 5, 27, P.negroB); rect(x - 2, 23, x + 2, 26, P.negroL); }
  // el halo de la luz en el borde de dentro del marco
  for (let y = 30; y <= 150; y++) for (const x of [14, 15, 263, 264]) d_tine(R, x, y, P.cajaL, 0.4);
  // la tira de papel cuadriculado clavada a la derecha (x 278–314, y 56–158) con columnas de cifras a lápiz
  rect(279, 57, 315, 158, P.papelS); rect(278, 56, 314, 157, P.papel);
  for (let y = 60; y < 157; y += 4) for (let x = 279; x < 314; x += 2) pset(x, y, d_mezcla(P.papel, P.filmL, 0.25));
  for (let x = 282; x < 314; x += 8) for (let y = 57; y < 157; y += 2) pset(x, y, d_mezcla(P.papel, P.filmL, 0.18));
  disco(296, 58, 2, P.rojoS); pset(296, 57, P.rojoL);
  const CIF = ['20', '40', '64', '38', '48', '24', '127', '32', '223'];
  CIF.forEach((s, i) => R.numero(s, 296, 68 + i * 8, { color: P.tinta, centro: true, sombra: false, fina: true }));
  // abajo: el borde de la mesa de nogal con la regla, el lápiz rojo, una goma y la lupa
  rect(0, 160, 319, 179, P.madL); rect(0, 160, 319, 160, d_mezcla(P.madL, P.papel, 0.3)); rect(0, 161, 319, 161, P.mad);
  for (let g = 0; g < 7; g++) { const gy = 163 + g * 2 + (g % 2); let x = Math.round(h(g, 1, 395) * 30) - 30; while (x < 320) { const l = 10 + Math.round(h(x, gy, 396) * 34); rect(Math.max(0, x), gy, Math.min(319, x + l), gy, g % 3 ? P.mad : P.madS); x += l + 8; } }
  rect(0, 158, 319, 159, P.madD);
  for (let y = 162; y < 170; y++) for (let x = 0; x < 320; x++) if (d_b4(x, y) < (170 - y) / 16) d_tine(R, x, y, P.madD, 0.5);   // la sombra del marco
  rect(30, 168, 120, 171, P.papel); for (let x = 32; x < 120; x += 3) pset(x, 168, P.tinta); rect(70, 168, 82, 171, P.cajaL); rect(76, 168, 76, 171, P.rojo);   // la regla de cálculo
  rect(150, 172, 164, 175, P.cajaL); rect(150, 175, 164, 175, P.cajaS); rect(150, 172, 154, 175, P.rojo);   // la goma
  disco(214, 172, 7, P.negro); disco(214, 172, 6, P.laton); disco(214, 172, 5, P.cristal); pset(212, 170, P.cristalL); pset(211, 171, P.cristalL); linea(220, 177, 232, 179, P.negro); linea(220, 176, 232, 178, P.mad);   // la lupa
  for (let y = 162; y <= 179; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - 150) / 160, (y - 158) / 30); if (d < 1 && d_b4(x, y) < (1 - d) * 0.5) d_tine(R, x, y, P.luz, 0.18); }   // el reflejo frío de la luz en la mesa
}

const TAU = Math.PI * 2;

// la paleta del decorado E: el bronce en siete tonos (del contorno al reflejo), el nogal, la piedra encalada, el barro,
// la plata y el negro de la bolita, el verdín, el mimbre, el mar y el cielo de la ventana
const e_P = {
  br: [hex('#24140a'), hex('#5a3a18'), hex('#8a6024'), hex('#c8963a'), hex('#deae4c'), hex('#f0c868'), hex('#fff2c0')],
  brO: [hex('#140c06'), hex('#3a2610'), hex('#5e4220'), hex('#8a6430'), hex('#a47a3c'), hex('#c49a50'), hex('#e8c87a')],
  nogal: [hex('#1e1009'), hex('#3a2214'), hex('#56341e'), hex('#74482a'), hex('#946036')],
  muro: [hex('#8a7458'), hex('#a8906c'), hex('#c4ab84'), hex('#d8c29a'), hex('#e8d6b0')],
  barro: [hex('#4a2010'), hex('#7a3a1c'), hex('#a8542a'), hex('#c87040'), hex('#e09a62')],
  plata: [hex('#3a3e48'), hex('#7a808c'), hex('#b8bec8'), hex('#e8ecf2'), hex('#ffffff')],
  negro: hex('#121218'), negroL: hex('#2e2e3a'),
  verdin: [hex('#1e3a2e'), hex('#3a6a52'), hex('#5a9a7a'), hex('#8ac8a8')],
  mimbre: [hex('#5a4020'), hex('#8a6a3a'), hex('#b08a50'), hex('#d0aa6a')],
  cielo: [hex('#6aa8d8'), hex('#8ac0e8'), hex('#b4d8f0')], nube: [hex('#c0cede'), hex('#e4ecf4'), hex('#ffffff')],
  mar: [hex('#1a4a72'), hex('#2a6a9a'), hex('#4a8ab8'), hex('#a8d0ec')],
  oro: hex('#ffd860'), rojo: hex('#d83a2a'), rojoL: hex('#ff8a5a'), lino: hex('#e8dcc0'), linoS: hex('#b8a888'),
  llama: [hex('#c84a10'), hex('#f08a20'), hex('#ffd060'), hex('#fff8d0')], luz: [hex('#5a3a18'), hex('#8a5a24')],
};

// tramado 2×2 para los degradados
const e_b4 = (x, y) => [[0, 0.5], [0.75, 0.25]][y & 1][x & 1];

// el tono v (0 = el primero) de una rampa, con trama
const e_tono = (ramp, v, x, y) => ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(v + e_b4(x, y))))];

// oscurece a la mitad el píxel que ya hay (sombras arrojadas)
const e_osc = (c) => (c & 0xff000000) | ((c >> 1) & 0x7f7f7f);

// la veta de la madera: bandas onduladas con nudos, en la rampa dada; v sube o baja el tono
const e_veta = (ramp, x, y, k, v = 0) => { const b = y * 0.55 + Math.sin(x * 0.045 + k) * 2.2 + Math.sin(x * 0.17 + y * 0.1 + k) * 0.7; return e_tono(ramp, 1.6 + v + Math.sin(b * 1.7) * 0.7 + (h(x >> 2, y, k) - 0.5) * 0.8, x, y); };

// la capa fija de una vista: se pinta una vez en un búfer aparte y en cada fotograma se copia entera
const e_capas = new Map();

function e_capa(R, clave, dibuja) {
  let b = e_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_capas.set(clave, b); }
  R.copiar(b);
}

// la tabla polar de una rueda de radio de caja rb: distancia, ángulo, coseno, seno y luz (la de arriba a la izquierda)
// de cada píxel; se calcula una vez por tamaño, así cada fotograma solo compara números
const e_tablas = new Map();

function e_tabla(rb) {
  let T = e_tablas.get(rb);
  if (T) return T;
  const w = 2 * rb + 1, n = w * w, d = new Float32Array(n), a = new Float32Array(n), l = new Float32Array(n), cs = new Float32Array(n), sn = new Float32Array(n);
  for (let j = 0; j < w; j++) for (let i = 0; i < w; i++) {
    const dx = i - rb, dy = j - rb, k = j * w + i, dd = Math.hypot(dx, dy) || 0.001;
    d[k] = dd; a[k] = Math.atan2(dy, dx); cs[k] = dx / dd; sn[k] = dy / dd; l[k] = -(0.6 * cs[k] + 0.8 * sn[k]);
  }
  T = { rb, w, d, a, l, cs, sn }; e_tablas.set(rb, T);
  return T;
}

// pone en fase la rueda b engranada con a (b en la dirección th desde a): ω_b = −ω_a·N_a/N_b y un diente de a frente a
// un hueco de b sobre la línea de centros
const e_engrana = (a, b, th) => { b.x = a.x + Math.cos(th) * (a.r + b.r); b.y = a.y + Math.sin(th) * (a.r + b.r); b.phi = th + Math.PI + Math.PI / b.N - (a.N / b.N) * (a.phi - th); return b; };

// UNA RUEDA DENTADA de bronce: g = { x, y, r (radio primitivo), N (dientes), phi (giro, rad), th (alto del diente),
// rayos (0 = disco lleno), pal (rampa de 7 tonos), marca (diente 0 en rojo), dorados (cuántos dientes, desde el 0, van
// dorados), sombra (px) }. Dientes triangulares de verdad, llanta, radios y cubo con luz arriba a la izquierda, rayado
// de torno que gira con ella, un reflejo fijo y la sombra arrojada sobre lo de detrás.
function e_rueda(R, g) {
  const { pset, pget } = R, th = g.th ?? 3, rb = Math.ceil(g.r + th / 2 + 4), T = e_tabla(rb), w = T.w;
  const root = g.r - th / 2, rimIn = root - Math.max(2.5, g.r * 0.13), hub = Math.max(2.2, g.r * 0.15), sw = Math.max(1.5, g.r * 0.065);
  const ns = g.rayos ?? (g.r > 13 ? 4 : 0), P = ns ? TAU / ns : 1, k = g.N / TAU, pal = g.pal ?? e_P.br, phi = g.phi;
  const cx = Math.round(g.x), cy = Math.round(g.y), sh = g.sombra ?? 3, d = T.d, A = T.a;
  // 0 vacío, 1 dientes y llanta, 2 radio, 3 cubo, 4 disco lleno; m = cuánto le falta para el borde del diente
  let m = 0, del = 0;
  const sol = (q) => {
    const dd = d[q]; if (dd > root + th) return 0;
    let u = (A[q] - phi) * k + 0.5; u -= Math.floor(u); const prof = root + th * Math.min(1, (1 - Math.abs(2 * u - 1)) * 1.25);
    if (dd > prof) return 0; m = prof - dd;
    if (dd >= rimIn) return 1; if (dd <= hub) return 3;
    if (!ns) return 4;
    let ar = A[q] - phi; ar -= Math.floor(ar / P) * P; del = ar < P / 2 ? ar : ar - P;
    return dd * Math.abs(Math.sin(del)) < sw ? 2 : 0;
  };
  // la sombra arrojada (abajo a la derecha)
  if (sh) for (let j = sh; j < w; j++) { const y = cy - rb + j; if (y < 0 || y > 179) continue; for (let i = sh; i < w; i++) { const x = cx - rb + i; if (x < 0 || x > 319) continue; if (d[j * w + i] > g.r + th + 3) continue; if (sol((j - sh) * w + i - sh)) pset(x, y, e_osc(pget(x, y))); } }
  for (let j = 0; j < w; j++) {
    const y = cy - rb + j; if (y < 0 || y > 179) continue;
    for (let i = 0; i < w; i++) {
      const x = cx - rb + i; if (x < 0 || x > 319) continue;
      const q = j * w + i, dd = d[q];
      if (dd > root + th + 1.2) continue;
      const s = sol(q), L = T.l[q];
      if (!s) { if (dd > root + 0.5 && dd < root + th + 1.2) { let u = (A[q] - phi) * k + 0.5; u -= Math.floor(u); if (dd <= root + th * Math.min(1, (1 - Math.abs(2 * u - 1)) * 1.25) + 1) pset(x, y, pal[0]); } continue; }
      let v;
      if (s === 1) {
        if (m < 1) v = L > 0.3 ? 5 : L < -0.3 ? 1 : 3;
        else if (dd - rimIn < 1) v = -L > 0.3 ? 4 : -L < -0.3 ? 1 : 2;
        else { let ar = A[q] - phi; ar -= Math.floor(ar / TAU) * TAU; v = 2.9 + 1.1 * L * dd / g.r + e_b4(x, y) + (((dd | 0) % 3 === 0) ? 0.5 : 0) - (h(dd | 0, (ar * dd * 0.5) | 0, 7) > 0.86 ? 1 : 0); v = Math.max(2, Math.min(5, Math.floor(v))); if (g.r > 30) { const sr = rimIn + (root - rimIn) * 0.45; if (Math.abs(dd - sr) < 0.5) v = 1; else if (Math.abs(dd - sr - 1) < 0.5) v = 5; } }
        if (L > 0.9 && m < 3.5 && dd > root - 1) v = 6;
        if (g.marca && dd > root - 2.5) { const n = Math.floor((A[q] - phi) * k + 0.5); if (((n % g.N) + g.N) % g.N === 0) { pset(x, y, m < 1 ? e_P.rojo : e_P.rojoL); continue; } }
        if (g.dorados && dd > root - 2.5) { const n = ((Math.floor((A[q] - phi) * k + 0.5) % g.N) + g.N) % g.N; if (n < g.dorados) { pset(x, y, m < 1.2 ? e_P.plata[4] : dd > root - 0.5 ? e_P.llama[2] : e_P.llama[1]); continue; } }
      } else if (s === 2) {
        const borde = sw - dd * Math.abs(Math.sin(del));
        if (borde < 0.9) { const Ls = (del > 0 ? 1 : -1) * (0.6 * T.sn[q] - 0.8 * T.cs[q]); v = Ls > 0.2 ? 5 : Ls < -0.2 ? 1 : 3; } else v = Math.max(2, Math.min(5, Math.floor(3 + 1.1 * L * dd / g.r + (borde < 1.9 ? 0.4 : 0) + e_b4(x, y))));
      } else if (s === 3) {
        v = dd < 1.2 ? 0 : hub - dd < 1 ? (L > 0.3 ? 5 : L < -0.3 ? 1 : 3) : (L > 0.5 && dd < hub - 1 ? 6 : 4);
      } else {
        v = Math.abs(dd - (hub + 2)) < 0.6 ? 1 : (L > 0.3 && Math.abs(dd - (hub + 3)) < 0.6) ? 5 : 3;
      }
      pset(x, y, pal[v]);
    }
  }
}

// una ruedita pequeña de adorno (de 2 a 5 px): disco con dientecitos que giran
function e_ruedita(R, x, y, r, pal, a) {
  R.disco(x, y, r + 0.6, pal[1]); R.disco(x, y, r - 0.4, pal[3]);
  for (let k = 0; k < 8; k++) { const b = a + k * TAU / 8; R.pset(Math.round(x + Math.cos(b) * (r + 1)), Math.round(y + Math.sin(b) * (r + 1)), pal[2]); }
  R.pset(x - 1, y - 1, pal[5]); R.pset(x, y, pal[0]);
}

// garabatos grabados (las inscripciones, que no se leen): trazos de 1–3 px en filas, oscuros con su filo de luz
function e_garabatos(R, x0, y0, x1, y1, k, ramp, paso = 4) {
  for (let y = y0; y <= y1; y += paso) for (let x = x0; x <= x1; x++) {
    const v = h(x, y, k); if (v > 0.55) continue;
    const f = Math.floor(h(x, y, k + 1) * 4);
    R.pset(x, y + (f === 1 ? 1 : 0), ramp[1]); if (f === 2) R.pset(x, y + 1, ramp[1]); if (f === 3) R.pset(x, y - 1, ramp[1]);
    if (v < 0.12) R.pset(x, y + 2, ramp[5]);
  }
}

// un remache de bronce con su brillo
function e_remache(R, x, y, pal) { R.disco(x, y, 1.8, pal[1]); R.pset(x, y, pal[4]); R.pset(x - 1, y - 1, pal[5]); R.pset(x + 1, y + 1, pal[0]); }

// la luz de la lucerna: una lámpara de aceite de barro con su llama que baila y su halo
function e_lucerna(R, t, x, y, k = 0) {
  const { rect, pset, disco } = R, P = e_P, f = Math.sin(t * 13 + k) * 0.6 + Math.sin(t * 7.3 + k) * 0.4;
  R.halo(x + 7, y - 6, 22 + f * 2, [P.luz[0], P.luz[1], P.llama[0]], 0.55);
  // el cuerpo de barro, el pico y el asa
  disco(x + 5, y + 2, 5, P.barro[1]); rect(x, y, x + 11, y + 3, P.barro[2]); rect(x + 1, y - 1, x + 10, y - 1, P.barro[3]);
  rect(x + 11, y - 1, x + 14, y + 1, P.barro[2]); pset(x + 14, y - 2, P.barro[3]); rect(x - 2, y, x - 1, y + 2, P.barro[1]); pset(x - 3, y - 1, P.barro[1]);
  disco(x + 5, y, 1.5, P.barro[0]); rect(x + 1, y + 5, x + 10, y + 6, P.barro[0]); pset(x + 2, y, P.barro[4]);
  // la llama
  const fy = Math.round(f * 1.2), fx = Math.round(Math.sin(t * 5 + k) * 0.8);
  pset(x + 14 + fx, y - 7 + fy, P.llama[0]); rect(x + 13, y - 6 + fy, x + 15, y - 3, P.llama[1]); rect(x + 14, y - 5 + fy, x + 14, y - 3, P.llama[2]); pset(x + 14, y - 3, P.llama[3]);
  if (Math.sin(t * 3 + k) > 0.6) pset(x + 15 + fx, y - 10 + fy, P.llama[0]);
}

// las motas de polvo que flotan en un rayo de luz (cuadrilátero aproximado por una caja x0–x1, y0–y1)
function e_polvo(R, t, x0, y0, x1, y1, n, c, k = 0) {
  for (let i = 0; i < n; i++) {
    const x = x0 + ((h(i, 1, k) * (x1 - x0) + Math.sin(t * 0.4 + i) * 6 + t * (1 + h(i, 3, k) * 2)) % (x1 - x0) + (x1 - x0)) % (x1 - x0);
    const y = y0 + ((h(i, 2, k) * (y1 - y0) + t * (2 + h(i, 4, k) * 3)) % (y1 - y0));
    if (Math.sin(t * 2 + i * 1.7) > -0.3) R.pset(Math.round(x), Math.round(y), c);
  }
}

// un signo del zodiaco como dibujito de 7×7 (cabeza de carnero, toro, gemelos, cangrejo, león, espiga, balanza,
// escorpión, arco, cabra, cántaro, peces): dibujos, no glifos, para que ninguno se lea como letra
const E_ZOD = [
  ['##...##', '#.#.#.#', '#.###.#', '..###..', '..###..', '...#...'],
  ['#.....#', '.#...#.', '.#####.', '#######', '.##.##.', '..###..'],
  ['.##.##.', '.##.##.', '#######', '.##.##.', '.#..#..', '.#..#..'],
  ['##...##', '#.....#', '.#####.', '#######', '.#####.', '#.#.#.#'],
  ['.###...', '#####..', '#####.#', '.######', '.#####.', '.#...#.'],
  ['...#...', '..###..', '.#.#.#.', '..###..', '.#.#.#.', '...#...', '...#...'],
  ['...#...', '#######', '#..#..#', '##.#.##', '...#...', '.#####.'],
  ['....##.', '......#', '.....#.', '.####..', '######.', '.#.#...'],
  ['...####', '.....##', '..#.#.#', '.#.#...', '.##....', '#......'],
  ['#..##..', '.####..', '.#####.', '.#####.', '..#..#.', '..#..#.'],
  ['..###..', '...#...', '.#####.', '.#####.', '..###..', '#.#.#.#'],
  ['.#...#.', '###.###', '.#...#.', '.......', '#.#.#.#', '.#.#.#.'],
];

function e_signo(R, k, x, y, c, cl) {
  const f = E_ZOD[k];
  for (let j = 0; j < f.length; j++) for (let i = 0; i < 7; i++) if (f[j][i] === '#') { R.pset(x + i + 1, y + j + 1, cl); }
  for (let j = 0; j < f.length; j++) for (let i = 0; i < 7; i++) if (f[j][i] === '#') R.pset(x + i, y + j, c);
}

// la piedra encalada de la pared del taller: sillares con juntas, desconchones y manchas; v sube o baja el tono
function e_muro(R, x0, y0, x1, y1, k, v = 0) {
  const P = e_P.muro;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const fila = Math.floor(y / 11), dx = (fila & 1) * 13, jx = (x + dx) % 26, jy = y % 11;
    let t = 2.3 + v + (h(x >> 1, y >> 1, k) - 0.5) * 0.7 + (h((x + dx) / 26 | 0, fila, k + 3) - 0.5) * 0.6;
    if (jy === 0 || jx === 0) t -= 1.3; else if (jy === 1 || jx === 1) t += 0.6;
    if (h(x >> 3, y >> 3, k + 9) > 0.93) t -= 0.8;
    R.pset(x, y, e_tono(P, t, x, y));
  }
}

// los ángulos del soporte de las ruedecitas: dada la vuelta de la que lleva la clavija, el ángulo de la de la ranura
// (ejes desplazados e px; la clavija a rp del eje): va deprisa y despacio
const e_ranura = (al, rp, e) => Math.atan2(rp * Math.sin(al), rp * Math.cos(al) - e);

// LAS DOS RUEDECITAS DE LA LUNA montadas en la rueda grande: el puente que las sujeta, la de atrás con su RANURA (gira
// a tirones), la de delante con su CLAVIJA, que corre por la ranura. (x, y) es el eje de la de delante; ang, el giro de
// la rueda grande; s, la escala. Devuelve la clavija [x, y].
function e_ruedecitas(R, x, y, ang, al, s = 1, pal = e_P.br) {
  const { linea, disco, pset } = R, e = 3 * s, rp = 5.5 * s, r = 9 * s;
  const ux = Math.cos(ang), uy = Math.sin(ang), qx = x + ux * e, qy = y + uy * e;
  // el puente de bronce con sus dos tornillos
  for (let k = -1; k <= 1; k++) linea(x - uy * k - ux * (r + 4), y + ux * k - uy * (r + 4), x - uy * k + ux * (r + 6), y + ux * k + uy * (r + 6), k ? pal[2] : pal[4]);
  e_remache(R, Math.round(x - ux * (r + 3)), Math.round(y - uy * (r + 3)), pal); e_remache(R, Math.round(x + ux * (r + 5)), Math.round(y + uy * (r + 5)), pal);
  // la de atrás (eje desplazado) con su ranura
  const af = e_ranura(al, rp, e);
  e_rueda(R, { x: qx, y: qy, r, N: Math.round(14 * s), phi: af + ang, th: 2.4 * s, rayos: 0, pal: e_P.brO, sombra: 2 });
  const fx = Math.cos(af + ang), fy = Math.sin(af + ang);
  for (let k = 2; k <= r - 1; k += 0.5) { pset(Math.round(qx + fx * k), Math.round(qy + fy * k), e_P.brO[0]); pset(Math.round(qx + fx * k - fy), Math.round(qy + fy * k + fx), e_P.brO[1]); }
  // la de delante con la clavija
  e_rueda(R, { x, y, r: r - 1.5 * s, N: Math.round(13 * s), phi: al + ang, th: 2.4 * s, rayos: 0, pal, sombra: 2 });
  const cxp = x + Math.cos(al + ang) * rp, cyp = y + Math.sin(al + ang) * rp;
  disco(cxp, cyp, 1.6 * s, pal[0]); disco(cxp - 0.4, cyp - 0.4, 1.1 * s, e_P.plata[3]); pset(Math.round(cxp - 1), Math.round(cyp - 1), e_P.plata[4]);
  disco(qx, qy, 1.2 * s, pal[1]); pset(Math.round(qx), Math.round(qy), pal[5]);
  return [Math.round(cxp), Math.round(cyp)];
}

// 'caja': el mecanismo de frente en el banco del taller
function e_caja(R, t, o, giro, geo) {
  const { rect, pset, disco, poligono, linea } = R, P = e_P, B = P.br, [EX, EY, ER] = geo.esfera, zap = !!o.zapatos;
  e_capa(R, 'caja' + (zap ? 'z' : ''), () => e_cajaFija(R, zap));
  // la ventana: el cielo con nubes a tres velocidades, el mar que brilla, un barquito y dos gaviotas (recortado)
  R.recorte([25, 41, 69, 91]);
  for (let y = 41; y < 72; y++) for (let x = 25; x < 70; x++) pset(x, y, e_tono(P.cielo, 2.4 - (y - 41) / 13, x, y));
  for (const [vel, yb, tono, k] of [[1.2, 47, 0, 0], [2.2, 55, 1, 3], [3.4, 62, 2, 7]]) for (let n = 0; n < 2; n++) {
    const nx = 25 + ((h(n, k) * 80 + t * vel) % 80) - 18;
    for (let i = 0; i < 4; i++) disco(nx + i * 4, yb - (i === 1 || i === 2 ? 2 : 0), 3 - (i === 3 ? 1 : 0), P.nube[tono]);
    for (let i = 0; i < 14; i++) pset(Math.round(nx + i), yb + 2, P.nube[Math.max(0, tono - 1)]);
  }
  for (let y = 72; y < 92; y++) for (let x = 25; x < 70; x++) { const g = Math.sin(x * 0.7 + t * 2 + y * 1.3) + Math.sin(x * 0.23 - t * 1.1); pset(x, y, g > 1.5 && y < 84 ? P.mar[3] : e_tono(P.mar, 2.4 - (y - 72) / 9 + g * 0.15, x, y)); }
  poligono([[25, 72], [32, 68], [40, 69], [48, 72]], P.mar[0]); rect(25, 72, 48, 72, P.mar[1]);
  { const bx = 25 + ((t * 2.2) % 60) - 6, by = 77 + Math.round(Math.sin(t * 1.6)); rect(bx, by, bx + 7, by + 1, P.lino); rect(bx + 1, by + 2, bx + 6, by + 2, P.nogal[2]); linea(bx + 4, by - 6, bx + 4, by, P.nogal[1]); poligono([[bx + 4.5, by - 6], [bx + 9, by - 1], [bx + 4.5, by - 1]], P.lino); }
  for (let k = 0; k < 2; k++) { const gx = 25 + ((t * (6 + k * 3) + k * 30) % 60) - 8, gy = 50 + k * 7 + Math.round(Math.sin(t * 2 + k) * 2), a = Math.sin(t * 9 + k) > 0; pset(gx, gy, P.negroL); pset(gx - 1, gy - (a ? 1 : 0), P.negroL); pset(gx + 1, gy - (a ? 1 : 0), P.negroL); pset(gx - 2, gy - (a ? 1 : -1), P.negroL); pset(gx + 2, gy - (a ? 1 : -1), P.negroL); }
  R.recorte(null);
  // el polvo en el rayo de luz que baja de la ventana
  e_polvo(R, t, 40, 92, 110, 150, 18, P.muro[4], 3);
  // una salamanquesa que se pasea por la pared (se para y sigue)
  { const u = (t * 0.08) % 1, sx = Math.round(96 + Math.sin(u * TAU) * 14 + (Math.sin(t * 0.9) > 0.3 ? 0 : 0)), sy = Math.round(104 + Math.cos(u * TAU) * 8), p = Math.sin(t * 6) > 0 ? 1 : 0, c = hex('#6a7a4a'), cl = hex('#9aaa6a');
    rect(sx - 3, sy, sx + 3, sy, c); pset(sx + 4, sy, cl); pset(sx + 5, sy - 1 + p, c); pset(sx - 4, sy + 1, c); pset(sx - 5, sy + 1, c); pset(sx - 6, sy + 2, c);
    pset(sx - 2, sy - 1 - p, c); pset(sx - 2, sy + 1 + p, c); pset(sx + 2, sy - 1 + p, c); pset(sx + 2, sy + 1 - p, c); pset(sx + 4, sy - 1, P.negro); }
  // la lucerna del banco
  e_lucerna(R, t, 280, 128, 1);
  // los anillos de los planetas (o.planetas): cinco órbitas finas de colores con su bolita, cada una a su paso
  const pl = o.planetas ?? 0.35;
  if (pl > 0) {
    const cols = [hex('#b8bcc4'), hex('#f4e8b0'), hex('#e0583a'), hex('#e8b070'), hex('#d8c878')], vel = [4.15, 1.62, 0.53, 0.084, 0.034];
    for (let k = 0; k < 5; k++) { const r = 6 + k * 2.2, a0 = h(k, 9) * TAU + giro * vel[k] * TAU / 13.37;
      if (pl >= 0.5) R.anillo(EX + 0.5, EY + 0.5, r, cols[k], 0); else R.anillo(EX + 0.5, EY + 0.5, r, cols[k], 3);
      if (pl >= 0.5) { const x = EX + Math.cos(a0) * r, y = EY + Math.sin(a0) * r; disco(x, y, 1.6, P.br[0]); disco(x - 0.3, y - 0.3, 1.1, cols[k]); } }
  }
  // las agujas: la del Sol (oro, con su solecito) y la de la Luna (plata, acelera y frena) con la bolita de las fases
  const mareo = o.mareo ?? 0;
  const aSol = -Math.PI / 2 + giro * TAU / 13.37;
  let aLuna = -Math.PI / 2 + (giro + 0.06 * Math.sin(giro * TAU * 0.93)) * TAU;
  if (mareo > 0) aLuna += Math.sin(t * 9) * 0.35 * mareo;
  const punta = (a, r) => [EX + Math.cos(a) * r, EY + Math.sin(a) * r];
  const [sx, sy] = punta(aSol, 42), [lx, ly] = punta(aLuna, 38);
  linea(EX + 1, EY + 1, sx + 1, sy + 1, B[0]); linea(EX, EY, sx, sy, P.oro); linea(EX + Math.cos(aSol + 1.57), EY + Math.sin(aSol + 1.57), sx, sy, B[5]);
  { const [x, y] = punta(aSol, 33); disco(x, y, 3.4, B[0]); disco(x, y, 2.6, P.oro); for (let k = 0; k < 8; k++) { const b = k * TAU / 8 + t * 0.5; pset(Math.round(x + Math.cos(b) * 4.4), Math.round(y + Math.sin(b) * 4.4), P.oro); } pset(Math.round(x - 1), Math.round(y - 1), P.llama[3]); }
  linea(EX + 1, EY + 1, lx + 1, ly + 1, B[0]); linea(EX, EY, lx, ly, P.plata[3]); linea(EX + Math.cos(aLuna + 1.57), EY + Math.sin(aLuna + 1.57), lx, ly, P.plata[1]);
  const [bx, by] = punta(aLuna, 17), psi = mareo > 0 ? t * 14 * mareo + (aLuna - aSol) : aLuna - aSol;
  // la bolita: media esfera de plata y media negra que gira sobre su eje
  disco(bx, by, 5.4, B[0]);
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) {
    const xs = (i + 0.5) / 5, ys = (j + 0.5) / 5, z2 = 1 - xs * xs - ys * ys; if (z2 <= 0) continue;
    const q = xs * Math.cos(psi) + Math.sqrt(z2) * Math.sin(psi), luz = -0.55 * xs - 0.6 * ys + 0.6 * Math.sqrt(z2);
    pset(Math.round(bx) + i, Math.round(by) + j, q > 0 ? e_tono(P.plata, 1.6 + luz * 2.2, i, j) : (luz > 0.75 ? P.negroL : P.negro));
  }
  pset(Math.round(bx) - 2, Math.round(by) - 3, P.plata[4]);
  if (mareo > 0) for (let k = 0; k < 3; k++) { const b = t * 6 + k * TAU / 3, x = Math.round(bx + Math.cos(b) * 9), y = Math.round(by - 6 + Math.sin(b) * 3); pset(x, y, P.oro); pset(x - 1, y, P.llama[2]); pset(x + 1, y, P.llama[2]); pset(x, y - 1, P.llama[2]); pset(x, y + 1, P.llama[2]); }
  disco(EX, EY, 3, B[0]); disco(EX, EY, 2.2, B[4]); pset(EX - 1, EY - 1, B[6]);
  // el anillo de agujeros (o.agujeros): agujeritos bajo el calendario que se van marcando
  const ag = o.agujeros ?? 0;
  if (ag > 0) { const n = 120; for (let k = 0; k < n; k++) { const b = k * TAU / n - Math.PI / 2, x = Math.round(EX + Math.cos(b) * 46.6), y = Math.round(EY + Math.sin(b) * 46.6); pset(x, y, k / n < ag ? P.oro : B[0]); } }
  // la manivela: el pomo de madera gira alrededor del eje en el lado de la caja
  const [MX, MY] = geo.manivela, am = giro * TAU, kx = MX + Math.cos(am) * 13, ky = MY + Math.sin(am) * 13;
  linea(MX + 1, MY + 1, kx + 1, ky + 1, B[0]); for (let k = -1; k <= 1; k++) linea(MX, MY + k * 0.5, kx, ky + k * 0.5, k ? B[3] : B[5]);
  disco(MX, MY, 3.2, B[0]); disco(MX, MY, 2.4, B[4]); pset(MX - 1, MY - 1, B[6]);
  disco(kx + 1, ky + 1, 3, P.nogal[0]); disco(kx, ky, 2.6, P.nogal[3]); pset(Math.round(kx) - 1, Math.round(ky) - 1, P.nogal[4]);
  // el contador de la fecha (o.fecha): una plaquita con números que avanzan y retroceden
  if (o.fecha != null && o.fecha !== false) {
    const base = typeof o.fecha === 'number' ? o.fecha : 1, n = Math.floor(base + giro * 27.3);
    rect(130, 117, 166, 131, B[0]); rect(131, 118, 165, 130, P.negroL); rect(131, 118, 165, 118, P.negro);
    R.numero(String(Math.abs(n)), 148, 128, { centro: true });
  }
  geo.pomo = [Math.round(kx), Math.round(ky)]; geo.bolita = [Math.round(bx), Math.round(by)]; geo.sol = [Math.round(sx), Math.round(sy)]; geo.luna = [Math.round(lx), Math.round(ly)];
  if (zap) geo.zapatos = [106, 112];
  return geo;
}

// lo fijo de 'caja' (en su búfer): la pared, la ventana, el estante, las herramientas, el banco, el suelo y la caja con
// su esfera grabada
function e_cajaFija(R, zap) {
  const { rect, pset, disco, poligono, linea } = R, P = e_P, B = P.br, N = P.nogal;
  // el techo de vigas (oscuro y tranquilo) y la pared de piedra encalada con su zócalo ocre
  for (let y = 0; y < 8; y++) for (let x = 0; x < 320; x++) pset(x, y, e_veta(N, x, y, 2, -0.4));
  for (let x = 6; x < 320; x += 52) { rect(x, 6, x + 10, 9, N[1]); rect(x, 6, x + 10, 6, N[2]); }
  e_muro(R, 0, 8, 319, 127, 11);
  for (let y = 8; y < 16; y++) for (let x = 0; x < 320; x++) if ((x + y) % (y - 6) === 0) pset(x, y, P.muro[0]);
  for (let y = 128; y < 160; y++) for (let x = 0; x < 320; x++) pset(x, y, e_tono([hex('#5e4426'), hex('#7a5a32'), hex('#94703e'), hex('#a8824a')], 1.8 + (h(x >> 1, y, 4) - 0.5) * 0.8 - (y > 156 ? 1 : 0), x, y));
  rect(0, 127, 319, 127, P.muro[0]); rect(0, 128, 319, 128, hex('#b08a50'));
  for (let x = 0; x < 320; x += 3) if (h(x, 1, 31) > 0.6) pset(x, 129 + Math.floor(h(x, 2, 31) * 3), hex('#5e4426'));
  // la ventana: el marco de madera, el alféizar y el rayo de luz que entra tramado
  rect(21, 37, 73, 95, N[1]); rect(23, 39, 71, 93, N[0]); rect(21, 37, 73, 37, N[3]); rect(46, 39, 47, 93, N[2]); rect(23, 65, 71, 66, N[2]);
  rect(17, 94, 77, 98, P.muro[3]); rect(17, 94, 77, 94, P.muro[4]); rect(17, 98, 77, 98, P.muro[0]);
  for (let y = 99; y < 160; y++) for (let x = 24 + (y - 99) * 0.9; x < 72 + (y - 99) * 1.1; x++) if ((((x | 0) + y) & 3) === 0) pset(x | 0, y, y < 128 ? P.muro[4] : hex('#c49a5a'));
  // el estante con rollos de papiro, un tintero y un compás colgado
  rect(92, 58, 126, 60, N[2]); rect(92, 58, 126, 58, N[4]); rect(92, 61, 126, 61, N[0]); rect(95, 62, 96, 66, N[1]); rect(122, 62, 123, 66, N[1]);
  for (const [x, c] of [[95, 0], [101, 1], [107, 0]]) { rect(x, 52, x + 4, 57, c ? P.linoS : P.lino); disco(x + 2, 54.5, 1.4, P.linoS); pset(x + 2, 54, N[2]); }
  rect(113, 51, 118, 57, P.barro[1]); rect(114, 50, 117, 50, P.barro[3]); rect(114, 52, 114, 56, P.barro[3]); linea(120, 49, 125, 57, B[2]); linea(122, 49, 121, 57, B[3]); pset(121, 48, B[5]);
  // un dibujo de una rueda dentada clavado en la pared (un papiro con trazos, sin letras)
  rect(94, 70, 124, 94, P.linoS); rect(95, 71, 123, 93, P.lino); disco(102, 70, 1, B[2]); disco(116, 70, 1, B[2]);
  R.anillo(105, 82, 7, hex('#5a4a3a')); for (let k = 0; k < 12; k++) { const a = k * TAU / 12; pset(Math.round(105 + Math.cos(a) * 8.6), Math.round(82 + Math.sin(a) * 8.6), hex('#5a4a3a')); } linea(105, 75, 105, 89, hex('#8a7a6a')); linea(98, 82, 112, 82, hex('#8a7a6a'));
  R.anillo(117, 88, 3.5, hex('#5a4a3a')); for (let x = 99; x < 122; x += 3) pset(x, 74, hex('#8a7a6a'));
  // el colgador de herramientas a la derecha (por debajo de Atom): sierra, tenazas, limas, martillo y un compás
  rect(278, 52, 316, 54, N[2]); rect(278, 52, 316, 52, N[4]); for (let x = 282; x < 316; x += 8) { pset(x, 55, B[1]); pset(x, 56, B[2]); }
  rect(280, 57, 284, 82, N[3]); rect(280, 57, 280, 82, N[4]); for (let y = 58; y < 82; y += 2) pset(285, y, P.plata[1]); rect(285, 57, 287, 82, P.plata[2]); rect(285, 57, 285, 82, P.plata[3]);
  linea(292, 57, 289, 80, P.plata[1]); linea(294, 57, 297, 80, P.plata[1]); disco(293, 60, 1.5, P.plata[2]);
  for (const x of [301, 305]) { rect(x, 57, x + 1, 76, P.plata[1]); rect(x, 57, x, 76, P.plata[3]); rect(x - 1, 57, x + 2, 60, N[3]); }
  rect(310, 57, 311, 78, N[3]); rect(307, 74, 314, 79, P.plata[1]); rect(307, 74, 314, 74, P.plata[3]);
  // el banco de taller: tablero grueso con vetas, canto, patas y travesaño con un cesto
  for (let y = 132; y < 138; y++) for (let x = 84; x < 319; x++) pset(x, y, e_veta(N, x, y * 3, 5, 0.9));
  rect(84, 132, 318, 132, N[4]); rect(84, 138, 318, 143, N[2]); for (let x = 84; x < 319; x++) pset(x, 139 + (h(x >> 3, 0, 8) > 0.7 ? 1 : 0), N[1]); rect(84, 143, 318, 143, N[0]);
  for (const x of [88, 304]) { rect(x, 144, x + 7, 160, N[2]); rect(x, 144, x, 160, N[3]); rect(x + 7, 144, x + 7, 160, N[0]); }
  rect(95, 152, 304, 154, N[1]); rect(95, 152, 304, 152, N[2]);
  for (let y = 140; y < 152; y++) for (let x = 200 - (y - 140) * 0.3; x < 236 + (y - 140) * 0.3; x++) pset(x | 0, y, ((x | 0) + (y >> 1)) % 3 ? P.mimbre[1] : P.mimbre[0]);
  rect(199, 138, 237, 140, P.mimbre[2]); for (const [x, c] of [[206, 1], [214, 2], [224, 1]]) { disco(x, 137, 3, P.verdin[c]); pset(x - 1, 136, P.verdin[3]); }
  // el suelo de baldosas de barro en tres filas, con juntas y manchas; la sombra del banco
  for (let y = 160; y < 180; y++) { const f = y < 166 ? 0 : y < 173 ? 1 : 2, an = [14, 18, 23][f];
    for (let x = 0; x < 320; x++) { const jx = (x + f * 7) % an; let v = 2.2 - f * 0.3 + (h(x >> 1, y, 13) - 0.5) * 0.7 + (h((x + f * 7) / an | 0, f, 14) - 0.5) * 0.6;
      if (y === 160 || y === 166 || y === 173 || jx === 0) v -= 1.4; if (x > 80 && x < 318 && y < 168) v -= 0.9; pset(x, y, e_tono(P.barro, v, x, y)); } }
  // en el banco: limas, un compás, una regla, ruedecitas sueltas y virutas de bronce (o la caja de zapatos)
  if (zap) {
    poligono([[88, 112], [124, 112], [124, 134], [88, 134]], (x, y) => e_tono([hex('#7a5a3a'), hex('#a07a4a'), hex('#c49a62'), hex('#d8b47a')], 2.2 - (y - 112) / 22 + (x === 88 ? -1 : 0), x, y));
    rect(88, 112, 124, 112, hex('#e8c88a')); rect(88, 112, 88, 134, hex('#6a4a2a')); rect(98, 120, 114, 124, hex('#e8dcc8')); rect(99, 121, 113, 121, hex('#b8a888'));
    poligono([[84, 108], [90, 104], [90, 132], [84, 134]], hex('#8a6a42')); linea(84, 108, 90, 104, hex('#d8b47a'));
  } else {
    rect(90, 131, 112, 132, B[2]); rect(90, 131, 112, 131, B[4]); rect(108, 129, 120, 130, P.plata[1]); rect(108, 129, 120, 129, P.plata[3]); rect(118, 128, 124, 131, N[3]);
    linea(92, 128, 102, 122, B[2]); linea(92, 128, 99, 120, B[3]); disco(99, 120, 1.5, B[4]);
    e_ruedita(R, 116, 125, 3, B, 0.3); e_ruedita(R, 106, 128, 2, B, 1.1);
  }
  for (let k = 0; k < 14; k++) pset(96 + Math.floor(h(k, 5) * 190), 133 + Math.floor(h(k, 6) * 3), k & 1 ? B[5] : B[2]);
  // LA CAJA: la cara de arriba y el lado derecho en perspectiva, de nogal con vetas, y la sombra en el banco
  for (let y = 134; y < 138; y++) for (let x = 126; x < 282; x++) pset(x, y, e_osc(R.pget(x, y)));
  poligono([[128, 26], [262, 26], [274, 19], [140, 19]], (x, y) => e_veta(N, x, y * 4, 1, 1.2));
  linea(140, 19, 274, 19, N[4]); linea(128, 26, 262, 26, N[4]);
  poligono([[262, 26], [274, 19], [274, 127], [262, 134]], (x, y) => e_veta(N, y, x * 3, 3, -0.4));
  linea(274, 19, 274, 127, N[0]); linea(262, 134, 274, 127, N[0]);
  for (let y = 27; y < 134; y++) for (let x = 128; x < 262; x++) pset(x, y, e_veta(N, x, y, 7, 0.2));
  rect(128, 27, 261, 27, N[4]); rect(128, 27, 128, 133, N[3]); rect(261, 27, 261, 133, N[0]); rect(128, 133, 261, 133, N[0]);
  // las esquinas de bronce y la placa de delante con sus columnas de garabatos y remaches
  for (const [x, y] of [[129, 28], [255, 28], [129, 127], [255, 127]]) { rect(x, y, x + 5, y + 5, B[2]); rect(x, y, x + 5, y, B[5]); pset(x + 2, y + 2, B[0]); }
  for (let y = 34; y < 129; y++) for (let x = 136; x < 254; x++) pset(x, y, e_tono(B, 3.1 + (h(x >> 3, y, 21) - 0.5) * 0.35 - (x - 136) / 160 - (y - 34) / 260 + ((y * 5 + (x >> 4) * 3) % 11 === 0 ? -0.5 : 0), x, y));
  rect(136, 34, 253, 34, B[5]); rect(136, 34, 136, 128, B[4]); rect(253, 34, 253, 128, B[1]); rect(136, 128, 253, 128, B[1]);
  e_garabatos(R, 139, 38, 166, 112, 41, B); e_garabatos(R, 222, 38, 250, 124, 43, B);
  for (const [x, y] of [[140, 37], [249, 37], [249, 124], [140, 114]]) e_remache(R, x, y, B);
  // la esfera: el canto en relieve, el anillo del calendario (365 marquitas, 12 meses), el del zodiaco (12 dibujitos) y
  // el campo de dentro con su círculo grabado
  const EX = 194, EY = 84;
  R.disco(EX + 2, EY + 2, 45.5, B[1]);
  R.disco(EX, EY, 45.5, (x, y, f) => { const dx = x + 0.5 - EX, dy = y + 0.5 - EY, d = Math.hypot(dx, dy), L = -(0.6 * dx + 0.8 * dy) / (d || 1);
    if (d > 44.2) return L > 0.2 ? B[5] : L < -0.2 ? B[1] : B[3];
    if (d > 36.5) return e_tono(B, 3.6 + L * 0.3 + (h(x, y, 3) - 0.5) * 0.4, x, y);
    if (d > 35.5) return B[1];
    if (d > 24.5) return e_tono(B, 2.8 + (h(x, y, 5) - 0.5) * 0.4, x, y);
    if (d > 23.5) return B[1];
    return e_tono(B, 2.5 - d / 60 + L * d / 60 + (h(x >> 1, y >> 1, 6) - 0.5) * 0.2, x, y); });
  for (let k = 0; k < 365; k++) { const a = k * TAU / 365 - Math.PI / 2; pset(Math.round(EX + Math.cos(a) * 43.2 - 0.5), Math.round(EY + Math.sin(a) * 43.2 - 0.5), k & 1 ? B[1] : B[2]); }
  for (let k = 0; k < 12; k++) { const a = k * TAU / 12 - Math.PI / 2;
    linea(EX + Math.cos(a) * 36.5, EY + Math.sin(a) * 36.5, EX + Math.cos(a) * 44, EY + Math.sin(a) * 44, B[0]);
    linea(EX + Math.cos(a) * 24.5, EY + Math.sin(a) * 24.5, EX + Math.cos(a) * 35.5, EY + Math.sin(a) * 35.5, B[1]);
    for (let j = 0; j < 5; j++) { const b = a + (j + 1.5) * TAU / 12 / 7; if (h(k, j, 44) > 0.25) { pset(Math.round(EX + Math.cos(b) * 39.5), Math.round(EY + Math.sin(b) * 39.5), B[1]); pset(Math.round(EX + Math.cos(b) * 40.5), Math.round(EY + Math.sin(b) * 40.5), h(k, j, 45) > 0.5 ? B[1] : B[5]); } }
    const c = a + TAU / 24; e_signo(R, k, Math.round(EX + Math.cos(c) * 30 - 3.5), Math.round(EY + Math.sin(c) * 30 - 3), B[0], B[5]); }
  R.anillo(EX + 0.5, EY + 0.5, 18.5, B[1]); R.anillo(EX + 0.5, EY + 1.5, 18.5, B[4]);
}

// 'dentro': el tren de engranajes con la tapa quitada
const E_TREN = { p: 4 };

function e_tren(giro) {
  const r = (N) => N * E_TREN.p / TAU, G = {};
  G.m = { N: 16, r: r(16), x: 267, y: 74, phi: giro * TAU, rayos: 0 };                       // el piñón de la manivela
  G.g = e_engrana(G.m, { N: 96, r: r(96) }, Math.atan2(98 - 74, 200 - 267));                  // la RUEDA GRANDE
  G.b = e_engrana(G.g, { N: 32, r: r(32) }, 3.49);                                            // atrás a la izquierda
  G.bp = { N: 12, r: r(12), x: G.b.x, y: G.b.y, phi: G.b.phi, rayos: 0 };             // su piñón, en el mismo eje (gira con ella)
  G.c = e_engrana(G.bp, { N: 40, r: r(40) }, 2.62);
  G.d = e_engrana(G.c, { N: 20, r: r(20) }, 4.0);
  G.e = e_engrana(G.c, { N: 48, r: r(48) }, 1.72);
  G.f = e_engrana(G.e, { N: 36, r: r(36) }, 3.6);
  G.h = e_engrana(G.g, { N: 24, r: r(24) }, 0.7);
  G.i = e_engrana(G.h, { N: 36, r: r(36) }, -0.05);
  return G;
}

function e_dentro(R, t, o, giro, geo) {
  const { pset, disco } = R, P = e_P;
  e_capa(R, 'dentro', () => e_placa(R, 'dentro'));
  // el atasco: tirones de diente en diente y, pasado o.paro, quieto; tiembla con o.atasco
  const at = o.atasco ?? 0;
  let gi = giro;
  if (at > 0) { const paso = 1 / 16; gi = giro - at * (giro - Math.floor(giro / paso) * paso) * 0.9; if (o.paro != null) { const s = 0.03, z = (o.paro - gi) / s; gi = z > 30 ? gi : o.paro - s * Math.log(1 + Math.exp(z)); } }
  const G = e_tren(gi), tb = at > 0 ? Math.round(Math.sin(t * 47) * 1.2 * at) : 0, tbY = at > 0 ? Math.round(Math.cos(t * 39) * at) : 0;
  const atras = { pal: P.brO, sombra: 3 };
  for (const k of ['b', 'g', 'h', 'i']) { const g = G[k]; e_rueda(R, { ...g, ...atras, x: g.x + tb, y: g.y + tbY, rayos: g.r > 14 ? 4 : 0 }); }
  e_rueda(R, { ...G.m, x: G.m.x + tb, y: G.m.y + tbY, pal: P.brO, sombra: 2 });
  // las dos ruedecitas en la rueda grande: giran con ella y la de la ranura va a tirones
  const ang = G.g.phi, rx = G.g.x + tb + Math.cos(ang - 1.1) * 33, ry = G.g.y + tbY + Math.sin(ang - 1.1) * 33;
  const clav = e_ruedecitas(R, rx, ry, ang - 1.1, giro * TAU * 0.8, 1.15);
  // el plano de delante, más claro, con la sombra sobre el de atrás
  for (const k of ['bp', 'c', 'd', 'e', 'f']) { const g = G[k]; e_rueda(R, { ...g, x: g.x + tb, y: g.y + tbY, rayos: g.r > 14 ? 4 : 0, sombra: 4 }); }
  // el atasco: brillo rojo y chispas donde chocan los dientes de c y e
  const ch = [Math.round((G.c.x * G.e.r + G.e.x * G.c.r) / (G.c.r + G.e.r)), Math.round((G.c.y * G.e.r + G.e.y * G.c.r) / (G.c.r + G.e.r))];
  if (at > 0.05) {
    R.halo(ch[0], ch[1], 8 + 4 * at, [hex('#8a2a10'), P.rojo, P.rojoL], 0.6 + at);
    for (let k = 0; k < 6; k++) { const ft = (t * 3 + k / 6) % 1, b = h(k, Math.floor(t * 3 + k / 6), 5) * TAU; if (h(k, Math.floor(t * 3), 9) < at) { const x = ch[0] + Math.cos(b) * ft * 12, y = ch[1] + Math.sin(b) * ft * 12 + ft * ft * 6; pset(Math.round(x), Math.round(y), ft < 0.5 ? P.llama[3] : P.llama[1]); } }
  }
  // el polvo en la luz de la lámpara y la arañita que baja y sube de su hilo
  e_polvo(R, t, 20, 20, 150, 160, 24, P.brO[6], 4);
  { const ay = 22 + Math.round((Math.sin(t * 0.7) * 0.5 + 0.5) * 26); for (let y = 10; y < ay; y++) if (y & 1) pset(36, y, P.plata[1]); disco(36, ay + 1, 1.6, P.negro); for (const s of [-1, 1]) { pset(36 + s * 2, ay, P.negro); pset(36 + s * 3, ay - 1, P.negro); pset(36 + s * 2, ay + 2, P.negro); pset(36 + s * 3, ay + 3, P.negro); } }
  geo.ruedas = Object.values(G).map((g) => [Math.round(g.x), Math.round(g.y), +g.r.toFixed(1)]);
  geo.grande = [Math.round(G.g.x), Math.round(G.g.y), +G.g.r.toFixed(1)]; geo.clavija = clav; geo.choque = ch;
  return geo;
}

// 'dentro' con o.dos: el ejemplo de 20 y 40 dientes
function e_dos(R, t, o, giro, geo) {
  const P = e_P;
  e_capa(R, 'dentro', () => e_placa(R, 'dentro'));
  const p = 8, a = { N: 20, r: 20 * p / TAU, x: 110, y: 96, phi: giro * TAU }, b = e_engrana(a, { N: 40, r: 40 * p / TAU }, 0);
  e_rueda(R, { ...b, th: 6, rayos: 4, marca: true, sombra: 4 });
  e_rueda(R, { ...a, th: 6, rayos: 4, marca: true, sombra: 4 });
  // las flechitas del sentido de giro (símbolos) y los números de dientes
  for (const [g, s] of [[a, 1], [b, -1]]) { const r = g.r + 9; for (let k = 0; k < 9; k++) { const an = -2.4 + s * k * 0.09 + (s < 0 ? -0.8 : 0); R.pset(Math.round(g.x + Math.cos(an) * r), Math.round(g.y + Math.sin(an) * r), P.brO[5]); }
    const an = -2.4 + s * 9 * 0.09 + (s < 0 ? -0.8 : 0), ex = g.x + Math.cos(an) * r, ey = g.y + Math.sin(an) * r; R.disco(ex, ey, 1.5, P.brO[6]); }
  if (o.numeros !== false) { R.numero('20', Math.round(a.x), 166, { centro: true }); R.numero('40', Math.round(b.x), 166, { centro: true }); }
  e_polvo(R, t, 20, 20, 300, 160, 20, P.brO[6], 6);
  geo.ruedas = [[a.x, a.y, +a.r.toFixed(1)], [Math.round(b.x), b.y, +b.r.toFixed(1)]]; geo.clavija = null; geo.numeros = [[a.x, 166], [Math.round(b.x), 166]];
  return geo;
}

// la placa de dentro de la caja (en su búfer): bronce oscuro cepillado con la luz de la lámpara de arriba a la
// izquierda, remaches, círculos grabados de los ejes, y los cantos de nogal arriba y a los lados
function e_placa(R, clave) {
  const { rect, pset } = R, P = e_P, B = P.brO, N = P.nogal;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const luz = 1 - Math.hypot(x - 60, y - 30) / 300;
    pset(x, y, e_tono(B, 1.1 + luz * 2.2 + (h(x >> 3, y, 15) - 0.5) * 0.3 + ((y * 5 + (x >> 5) * 3) % 11 === 0 ? -0.4 : 0), x, y));
  }
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 16) * 300) + 10, y = Math.floor(h(k, 2, 16) * 160) + 10, l = 3 + Math.floor(h(k, 3, 16) * 8); for (let i = 0; i < l; i++) pset(x + i, y + (i >> 2), B[1]); }
  for (const [x, y, r] of [[60, 140, 12], [250, 40, 9], [30, 60, 7]]) { R.anillo(x, y, r, B[1]); R.anillo(x, y + 1, r, B[4]); }
  for (let y = 0; y < 10; y++) for (let x = 0; x < 320; x++) pset(x, y, e_veta(N, x, y * 3, 4, -0.5));
  rect(0, 10, 319, 10, N[4]); rect(0, 11, 319, 11, N[0]);
  for (let y = 10; y < 180; y++) for (let x = 0; x < 8; x++) pset(x, y, e_veta(N, y, x * 3, 8, -0.2));
  for (let y = 10; y < 180; y++) for (let x = 312; x < 320; x++) pset(x, y, e_veta(N, y, x * 3, 9, -0.7));
  rect(8, 11, 8, 179, N[0]); rect(311, 11, 311, 179, N[4]);
  for (const [x, y] of [[16, 20], [302, 20], [16, 164], [302, 164], [160, 20], [160, 164]]) e_remache(R, x, y, B);
  e_garabatos(R, 14, 26, 46, 44, 51, B, 5);
}

// 'atras': la parte de atrás con las dos espirales
function e_atras(R, t, o, giro, geo) {
  const { pset, disco, linea } = R, P = e_P, B = P.br;
  e_capa(R, 'atras', () => e_atrasFija(R));
  R.halo(50, 122, 34 + Math.sin(t * 9) * 1.5, [hex('#4a3a2a'), hex('#6a5640')], 0.35); e_lucerna(R, t, 38, 128, 2);
  // las marcas de eclipse que se encienden (o.eclipses)
  const ec = o.eclipses ?? 0, M = E_MARCAS, n = Math.round(ec * M.length);
  for (let k = 0; k < M.length; k++) { const [x, y, sol] = M[k]; if (k >= n) continue;
    const late = Math.sin(t * 5 + k) > 0;
    R.halo(x, y, 6, [B[3], B[5]], 0.7);
    if (sol) { disco(x, y, 2.6, B[0]); disco(x, y, 2, P.oro); for (const [dx, dy] of [[0, -4], [0, 4], [-4, 0], [4, 0]]) pset(x + dx, y + dy, late ? P.llama[3] : P.oro); pset(x - 1, y - 1, P.llama[3]); }
    else { disco(x, y, 2.6, B[0]); disco(x, y, 2, P.plata[3]); disco(x + 1.2, y - 0.6, 1.5, B[0]); pset(x - 1, y - 1, P.plata[4]); if (late) pset(x - 2, y, P.plata[4]); }
  }
  // las agujas de las dos espirales con su cursor sobre el surco
  const ag = Array.isArray(o.aguja) ? o.aguja : o.aguja != null ? [o.aguja, o.aguja] : [giro / 47 - Math.floor(giro / 47), giro / 44.6 - Math.floor(giro / 44.6)];
  const puntas = [];
  for (const [k, [cx, cy, rOut], rIn, vueltas] of [[0, geo.arriba, 15, 5], [1, geo.abajo, 13, 4]]) {
    const f = ag[k], a = -Math.PI / 2 + f * vueltas * TAU, rr = rIn + (rOut - rIn) * f, ex = cx + Math.cos(a) * (rOut + 2), ey = cy + Math.sin(a) * (rOut + 2);
    linea(cx + 1, cy + 1, ex + 1, ey + 1, B[0]); linea(cx, cy, ex, ey, B[5]); linea(cx + Math.cos(a + 1.57) * 0.8, cy + Math.sin(a + 1.57) * 0.8, ex, ey, B[3]);
    const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr; disco(px, py, 2.4, B[0]); disco(px, py, 1.7, P.plata[3]); pset(Math.round(px - 1), Math.round(py - 1), P.plata[4]);
    puntas.push([Math.round(px), Math.round(py)]);
  }
  // la esfera de los Juegos (4 sectores) con su aguja y, con o.juegos, los atletitas corriendo por el borde
  { const [cx, cy, r] = geo.juegos, a = -Math.PI / 2 + giro * TAU / 47 * 4 / 1.5;
    disco(cx, cy, 2, B[0]); linea(cx, cy, cx + Math.cos(a) * (r - 1), cy + Math.sin(a) * (r - 1), P.oro); disco(cx, cy, 1.2, B[5]);
    if (o.juegos) for (let k = 0; k < 4; k++) { const b = t * 1.4 + k * TAU / 4, x = Math.round(cx + Math.cos(b) * (r + 2)), y = Math.round(cy + Math.sin(b) * (r + 2)), p = Math.sin(t * 16 + k) > 0 ? 1 : 0, c = [P.rojo, hex('#3a6ad8'), hex('#2a9a4a'), P.oro][k];
      pset(x, y - 3, hex('#f0c8a0')); pset(x, y - 2, c); pset(x, y - 1, c); pset(x - p, y, P.negro); pset(x + 1 - p, y, P.negro); pset(x - 1 + 2 * p, y - 2, hex('#f0c8a0')); } }
  { const [cx, cy] = geo.abajo, a = -Math.PI / 2 + giro * TAU / 44.6 / 3; linea(cx, cy, cx + Math.cos(a) * 8, cy + Math.sin(a) * 8, P.plata[3]); disco(cx, cy, 1.5, B[5]); }
  e_polvo(R, t, 50, 30, 230, 170, 20, B[6], 8);
  geo.punta = puntas; geo.marcas = M.map(([x, y]) => [x, y]);
  return geo;
}

// las 14 casillas con marca de eclipse en la espiral de abajo: [x, y, sol]
const E_MARCAS = (() => {
  const out = [], [cx, cy, rOut] = [160, 144, 34], rIn = 13, vueltas = 4, cas = 223;
  for (const c of [6, 23, 35, 52, 64, 81, 99, 112, 128, 141, 158, 170, 187, 205]) {
    const f = (c + 0.5) / cas, a = -Math.PI / 2 + f * vueltas * TAU, r = rIn + (rOut - rIn) * f + 2.6;
    out.push([Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), c % 2 === 0]);
  }
  return out;
})();

// lo fijo de 'atras' (en su búfer): la pared del taller en penumbra con su estante, la caja de nogal de espaldas y la
// placa de bronce con las espirales, sus casillas, los garabatos, las marcas sin encender y las esferitas
function e_atrasFija(R) {
  const { rect, pset, disco, linea } = R, P = e_P, B = P.br, N = P.nogal;
  // la pared en penumbra (más luz cerca de la lucerna) y el estante de la derecha con rollos y un ánfora
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor(y / 11), dx = (fila & 1) * 13, jx = (x + dx) % 26, jy = y % 11, luz = Math.max(0, 1 - Math.hypot(x - 46, y - 118) / 150);
    let v = 0.4 + luz * 2.4 + (h(x >> 1, y >> 1, 71) - 0.5) * 0.6; if (jy === 0 || jx === 0) v -= 1; else if (jy === 1 || jx === 1) v += 0.4;
    pset(x, y, e_tono([hex('#2a2018'), hex('#4a3a2a'), hex('#6a5640'), hex('#8a7458'), hex('#a8906c')], v, x, y));
  }
  rect(8, 136, 80, 139, N[2]); rect(8, 136, 80, 136, N[4]); rect(8, 140, 80, 140, N[0]); rect(14, 141, 16, 146, N[1]); rect(72, 141, 74, 146, N[1]);
  rect(16, 128, 26, 135, P.barro[1]); rect(17, 126, 25, 127, P.barro[2]); rect(18, 129, 18, 134, P.barro[3]); rect(60, 130, 74, 135, P.linoS); disco(62, 132.5, 2.5, P.lino);
  rect(240, 104, 312, 107, N[1]); rect(240, 104, 312, 104, N[3]); rect(240, 108, 312, 108, N[0]);
  for (const [x, c] of [[246, 0], [253, 1], [260, 0]]) { rect(x, 97, x + 5, 103, c ? hex('#7a6a50') : hex('#9a8a6a')); disco(x + 2.5, 100, 1.5, hex('#5a4a3a')); }
  // a la izquierda: una repisa con un compás y una regla colgados, un rollo de cuerda y un dibujo de espiral clavado
  rect(14, 40, 70, 82, hex('#8a7a5a')); rect(15, 41, 69, 81, hex('#c8b88e')); disco(20, 41, 1, B[2]); disco(64, 41, 1, B[2]);
  for (let a = 0; a < 5 * TAU; a += 0.08) { const r = 3 + a * 1.1; pset(Math.round(42 + Math.cos(a) * r * 0.55), Math.round(61 + Math.sin(a) * r * 0.55), hex('#6a5a44')); }
  for (let y = 46; y < 78; y += 4) if (h(y, 1, 77) > 0.3) rect(18, y, 24, y, hex('#9a8a6a'));
  rect(10, 90, 76, 92, N[2]); rect(10, 90, 76, 90, N[4]); for (const x of [16, 30, 44, 58]) { pset(x, 93, B[1]); pset(x, 94, B[2]); }
  linea(16, 95, 12, 118, P.plata[1]); linea(16, 95, 20, 118, P.plata[1]); disco(16, 96, 1.5, P.plata[3]);
  rect(29, 95, 31, 124, N[3]); rect(29, 95, 29, 124, N[4]); for (let y = 98; y < 124; y += 3) pset(30, y, N[0]);
  for (let k = 0; k < 4; k++) R.anillo(48, 104, 5 - k * 0.8, k & 1 ? P.mimbre[1] : P.mimbre[2]); linea(44, 95, 48, 99, P.mimbre[1]);
  rect(56, 95, 70, 97, P.plata[1]); rect(56, 95, 70, 95, P.plata[3]); rect(66, 97, 68, 112, N[2]);
  // a la derecha: un aro graduado colgado, un nicho con un ánfora y una ventanita de noche con la Luna
  R.anillo(276, 70, 14, B[1]); R.anillo(276, 70, 13, B[3]); R.anillo(276, 70, 9, B[2]); for (let k = 0; k < 24; k++) { const a = k * TAU / 24; pset(Math.round(276 + Math.cos(a) * 11), Math.round(70 + Math.sin(a) * 11), B[4]); } linea(263, 70, 289, 70, B[2]); pset(276, 55, B[4]); linea(276, 50, 276, 56, P.mimbre[1]);
  rect(250, 120, 300, 160, hex('#1c140e')); rect(250, 120, 300, 121, hex('#6a5640')); rect(250, 160, 300, 162, hex('#8a7458'));
  for (let y = 126; y < 160; y++) for (let x = 262 - (y > 132 ? 6 : (y - 126)); x < 274 + (y > 132 ? 6 : (y - 126)); x++) if (y < 156 || Math.abs(x - 268) < 6 - (y - 156)) pset(x, y, e_tono(P.barro, 2.4 - (x - 256) / 9 + (y > 148 ? -0.6 : 0), x, y));
  rect(264, 122, 272, 125, P.barro[1]); rect(284, 140, 294, 159, P.linoS); rect(285, 141, 293, 158, P.lino); for (let y = 144; y < 156; y += 3) rect(287, y, 291, y, P.linoS);
  rect(282, 88, 292, 103, P.barro[1]); rect(284, 85, 290, 87, P.barro[1]); rect(283, 90, 283, 101, P.barro[2]); rect(296, 92, 306, 103, P.mimbre[1]); for (let x = 297; x < 306; x += 2) rect(x, 92, x, 103, P.mimbre[0]);
  // la caja de espaldas: el marco de nogal
  for (let y = 0; y < 180; y++) for (let x = 86; x < 236; x++) pset(x, y, e_veta(N, y, x * 3, 12, (86 - x) / 300));
  rect(86, 0, 86, 179, N[4]); rect(235, 0, 235, 179, N[0]);
  // la placa: bronce con la luz de lado (más clara a la izquierda), rayado de lima
  for (let y = 18; y < 180; y++) for (let x = 96; x < 226; x++) pset(x, y, e_tono(B, 3.7 - (x - 96) / 75 + (h(x >> 3, y, 72) - 0.5) * 0.3 + ((y * 5 + (x >> 4) * 3) % 11 === 0 ? -0.5 : 0), x, y));
  rect(96, 18, 225, 18, B[5]); rect(96, 18, 96, 179, B[5]); rect(225, 18, 225, 179, B[1]);
  for (const [x, y] of [[100, 22], [221, 22], [100, 104], [221, 104], [100, 174], [221, 174]]) e_remache(R, x, y, B);
  e_garabatos(R, 100, 28, 116, 98, 81, B); e_garabatos(R, 204, 28, 220, 98, 82, B); e_garabatos(R, 100, 112, 122, 170, 83, B); e_garabatos(R, 198, 112, 220, 170, 84, B);
  // las dos espirales: surco, casillas alternas y su grabado; en el centro, las esferitas
  for (const [cx, cy, rOut, rIn, vueltas, cas] of [[160, 64, 40, 15, 5, 235], [160, 144, 34, 13, 4, 223]]) {
    const paso = (rOut - rIn) / vueltas;
    for (let y = cy - rOut - 4; y <= cy + rOut + 4; y++) for (let x = cx - rOut - 4; x <= cx + rOut + 4; x++) {
      if (y < 0 || y > 179) continue;
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy); let a = Math.atan2(dy, dx) + Math.PI / 2; a -= Math.floor(a / TAU) * TAU;
      if (d > rOut + 3.5 || d < rIn - 2) continue;
      const s = (d - rIn) / paso - a / TAU, vuelta = Math.floor(s), fs = s - vuelta, pos = vuelta + a / TAU;
      if (pos < 0 || pos > vueltas) { if (d > rOut + 2.5 && d < rOut + 3.5) pset(x, y, B[1]); continue; }
      const cel = Math.floor(pos / vueltas * cas), fc = pos / vueltas * cas - cel;
      let v;
      if (fs < 0.17) v = 1; else if (fs < 0.3) v = 5;
      else if (fc < 0.2 && d > 22) v = 2;
      else v = (cel & 1 ? 3.2 : 3.8) - (x - 96) / 140;
      pset(x, y, e_tono(B, v, x, y));
    }
  }
  // la esfera de los Juegos (4 sectores con su pictograma: una corona de olivo, un disco, una lira, una antorcha)
  { const [cx, cy, r] = [160, 64, 10];
    disco(cx + 1, cy + 1, r + 1, B[0]); disco(cx, cy, r + 1, B[1]); disco(cx, cy, r, (x, y) => e_tono(B, 4 - ((x + y) & 1) * 0.3, x, y));
    for (let k = 0; k < 4; k++) { const a = k * TAU / 4 - Math.PI / 4; linea(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, B[1]); }
    R.anillo(cx, cy - 6, 2, B[1]); disco(cx + 6, cy, 1.5, B[1]); linea(cx - 1, cy + 5, cx - 1, cy + 8, B[1]); linea(cx + 1, cy + 5, cx + 1, cy + 8, B[1]); pset(cx, cy + 5, B[1]); linea(cx - 6, cy - 1, cx - 6, cy + 2, B[1]); pset(cx - 6, cy - 2, P.rojo); }
  { const [cx, cy, r] = [160, 144, 9];
    disco(cx + 1, cy + 1, r + 1, B[0]); disco(cx, cy, r + 1, B[1]); disco(cx, cy, r, (x, y) => e_tono(B, 3.8 - ((x + y) & 1) * 0.3, x, y));
    for (let k = 0; k < 3; k++) { const a = k * TAU / 3 - Math.PI / 2; linea(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, B[1]); }
    for (let k = 0; k < 3; k++) { const a = k * TAU / 3 - Math.PI / 6; for (let j = 0; j <= k; j++) pset(Math.round(cx + Math.cos(a) * 5) + j * 2 - k, Math.round(cy + Math.sin(a) * 5), B[1]); } }
  // las marcas de eclipse sin encender: grabadas, apagadas
  for (const [x, y, sol] of E_MARCAS) { R.anillo(x + 0.5, y + 0.5, 2.4, B[1]); if (sol) disco(x, y, 1.2, B[2]); else { disco(x, y, 1.5, B[2]); pset(x + 1, y - 1, B[1]); } }
}

// 'rueda': la rueda de 223 dientes de cerca
function e_ruedaGrande(R, t, o, giro, geo) {
  const { rect, pset, disco, linea } = R, P = e_P, B = P.br, [cx, cy, r] = geo.rueda, N = 223;
  e_capa(R, 'rueda', () => e_bancoRueda(R));
  const cu = o.cuenta, phi0 = -Math.PI / 2;
  const ang = (cu != null ? -cu * TAU : 0) + giro * TAU * 0.15;
  const g = { x: cx, y: cy, r, N, phi: phi0 + ang, th: 3, rayos: 4, sombra: 4 };
  if (cu != null) g.dorados = Math.max(0, Math.min(N, Math.round(cu * N)));
  e_rueda(R, g);
  // las ruedecitas de la Luna, montadas en ella
  const ra = ang - 2.2, rx = cx + Math.cos(ra) * 62, ry = cy + Math.sin(ra) * 62;
  e_ruedecitas(R, rx, ry, ra, giro * TAU * 0.8, 1.3);
  // la lucecita que cuenta (fija arriba) y el contador
  if (cu != null) {
    const [lx, ly] = geo.luz, f = Math.sin(t * 10) > 0;
    R.halo(lx, ly + 2, 9, [B[4], B[5], B[6]], 0.9); disco(lx, ly, 2, f ? P.llama[3] : P.oro); linea(lx, ly + 3, lx, ly + 6, P.oro);
    if (o.contador !== false) { const [nx, ny] = geo.contador; rect(nx - 20, ny - 12, nx + 20, ny + 3, B[0]); rect(nx - 19, ny - 11, nx + 19, ny + 2, P.negroL); R.numero(String(Math.round(Math.max(0, Math.min(1, cu)) * N)), nx, ny, { centro: true }); }
  }
  geo.ruedecitas = [Math.round(rx), Math.round(ry)];
  return geo;
}

// lo fijo de 'rueda' (en su búfer): un banco de nogal con vetas, una regla de bronce con sus rayitas, una lupa,
// tornillitos y una ruedecita suelta; la luz cae de arriba a la izquierda
function e_bancoRueda(R) {
  const { rect, pset, disco, linea } = R, P = e_P, N = P.nogal, B = P.br;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 36); pset(x, y, (y % 36 === 0) ? N[0] : e_veta(N, x, y + tabla * 50, 20 + tabla, 0.6 - Math.hypot(x - 60, y - 40) / 260)); }
  for (let y = 1; y < 180; y += 36) rect(0, y, 319, y, N[3]);
  // la regla de bronce abajo a la izquierda
  rect(4, 164, 98, 174, B[2]); rect(4, 164, 98, 164, B[5]); rect(4, 174, 98, 174, B[0]); for (let x = 6; x < 98; x += 3) rect(x, 165, x, x % 15 === 6 ? 170 : 167, B[0]);
  // la lupa
  for (let k = 0; k < 12; k++) { rect(286 - k, 148 + k, 287 - k, 149 + k, N[1]); pset(286 - k, 148 + k, N[3]); } disco(296, 140, 9, B[1]); disco(296, 140, 7.5, hex('#7a8a9a')); disco(294, 138, 3, hex('#b8c8d8')); pset(299, 137, hex('#ffffff'));
  // tornillitos y una ruedecita suelta
  for (let k = 0; k < 8; k++) { const x = 8 + Math.floor(h(k, 1, 90) * 70), y = 46 + Math.floor(h(k, 2, 90) * 12); rect(x, y, x + 2, y, B[3]); pset(x + 3, y, B[5]); }
  e_ruedita(R, 70, 30, 4, B, 0.4);
}

// la paleta de la Grecia antigua (y de la plaza medieval y Babilonia)
const FA = pal({
  k: '#1a1218', cal: '#eadfc8', calS: '#cbbd9f', calL: '#f6eedd', calD: '#a89a80', pie: '#b49c7c', pieS: '#8a7458', pieL: '#d0bc9a',
  ocre: '#a8482c', ocreS: '#7a3020', ocreL: '#c86a44', viga: '#5a3a22', vigaS: '#3a2414', vigaL: '#7a5432',
  teja: '#b8643a', tejaS: '#8a4426', tejaL: '#d88a5a', tejaJ: '#6a3420', mad: '#8a5a34', madS: '#5e3c22', madL: '#b07a4a', madD: '#3e2614',
  arc: '#a86a44', arcS: '#7a4a2e', arcL: '#c88a5a', brasa: '#ff7a2a', brasaL: '#ffd060', brasaS: '#b8341a', brasaD: '#5a1a10', ceniza: '#4a4040', cenizaL: '#7a6a64',
  hollin: '#3a3030', bro: '#c8963a', broL: '#f0c868', broS: '#8a6024', broD: '#5a3e18', fundido: '#ffb030', fundidoL: '#fff0a0',
  mar: '#2a6a9a', marS: '#1a4a72', marL: '#4a8ab8', marE: '#cfe6f4', hoja: '#5a7a34', hojaS: '#3e5a24', hojaL: '#8aa848',
  oliv: '#6a7a4a', olivS: '#4a5a34', olivL: '#9aa878', pino: '#2e5a3a', pinoS: '#1e4028', pinoL: '#4a7a4a',
  marm: '#eeeae0', marmS: '#c8c2b4', marmL: '#ffffff', marmD: '#9a9488', tierra: '#c8a070', tierraS: '#a8804e', tierraL: '#e0bc8a', tierraD: '#8a6640',
  hierba: '#6a9a3a', hierbaS: '#4a7a2a', hierbaL: '#9ac25a', hierbaD: '#365a22', piel: '#e0aa80', pielS: '#b07a54',
  agua: '#4a8ab8', aguaL: '#a8d8f0', blanco: '#ffffff', luz: '#fff2c8', luzT: '#ffc070', luzN: '#9ab0e0',
  noche0: '#070a1e', noche1: '#0e1430', noche2: '#18204a', noche3: '#26306a', estrella: '#9aa4d0', estrellaL: '#ffffff', lactea: '#3a4478', lacteaL: '#5a6498', lacteaS: '#141a38',
  luna: '#f4ecd0', lunaS: '#c8c0a8', lunaR: '#b4583a', lunaRS: '#7a3428', sol: '#fff0a0', solL: '#fffce8',
  adobe: '#c49a6a', adobeS: '#9a7448', adobeL: '#dcb886', adobeD: '#7a5636', arcilla: '#b88a5a', arcillaS: '#8a6038', arcillaL: '#d8ac78',
  junco: '#c8a860', juncoS: '#9a7e40', piedraG: '#9a948a', piedraGS: '#6e6a62', piedraGL: '#bab4a8', azulR: '#2a4a9a', azulRS: '#1a3070', azulRL: '#4a6ac0',
  pergamino: '#ead8b0', pergaminoS: '#d4bc8c', pergaminoL: '#f6ead0', pergaminoD: '#a8885a', tinta: '#4a3424', tintaL: '#7a5a3a', marMapa: '#9cc0b8', marMapaS: '#7aa69e', marMapaL: '#b8d4c8',
  rojoM: '#c83a2a', rojoML: '#f07050', purpura: '#6a2a6a', purpuraL: '#9a4a8a',
});

const F_VACIO = 0x01020304;

const F_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de trama ordenada 4 × 4 (0–1) para los degradados y los brillos tramados
const f_umbral = (x, y) => (F_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_mezcla(c, d, a) {
  const r1 = c & 255, g1 = (c >>> 8) & 255, b1 = (c >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((d >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((d >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((d & 255) - r1) * a)) >>> 0;
}

// ruido suave (interpolado) en una rejilla de paso e: manchas orgánicas en lugar de cuadros
function f_ruido(x, y, k, e) {
  const gx = x / e, gy = y / e, x0 = Math.floor(gx), y0 = Math.floor(gy), fx = gx - x0, fy = gy - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(x0, y0, k), b = h(x0 + 1, y0, k), c = h(x0, y0 + 1, k), d = h(x0 + 1, y0 + 1, k);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

// el búfer de lo fijo de un encuadre: se pinta una vez (dibuja()) y se guarda por su clave; transparente: empieza vacío
const f_capas = new Map();

function f_capa(R, clave, dibuja, transparente = false) {
  let b = f_capas.get(clave);
  if (!b) { b = R.nuevo(); if (transparente) b.fill(F_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); f_capas.set(clave, b); }
  return b;
}

// pega una capa transparente encima de lo pintado; osc 0–1 la oscurece hacia col (para el eclipse)
function f_sobre(R, b, osc = 0, col = 0) {
  const B = R.buf, n = B.length;
  if (osc <= 0) { for (let i = 0; i < n; i++) { const c = b[i]; if (c !== F_VACIO) B[i] = c; } }
  else for (let i = 0; i < n; i++) { const c = b[i]; if (c !== F_VACIO) B[i] = f_mezcla(c, col, osc); }
}

// aclara (o tiñe) tramado lo que ya hay en un punto: para luces, halos y sombras
function f_tinte(R, x, y, col, a) { const c = R.pget(x, y); if (c && c !== F_VACIO) R.pset(x, y, f_mezcla(c, col, a)); }

// degradado vertical tramado entre y0 e y1 por las paradas [[fracción, color], …], en las columnas x0–x1
function f_degradado(R, x0, x1, y0, y1, P) {
  const B = R.buf, alto = Math.max(1, y1 - y0);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) {
    const f = (y - y0) / alto; let i = 0; while (i + 1 < P.length && f >= P[i + 1][0]) i++;
    const a = P[i][1], b = P[Math.min(i + 1, P.length - 1)][1], p = i + 1 < P.length ? (f - P[i][0]) / (P[i + 1][0] - P[i][0]) : 0, fila = y * 320;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) B[fila + x] = f_umbral(x, y) < p ? b : a;
  }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma; c = [sombra, cuerpo, luz]
function f_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.linea(Math.round(cx - w * 0.47), y0, Math.round(cx + w * 0.47), y0, c[0]); R.linea(Math.round(cx - w * 0.4), y0 - 1, Math.round(cx + w * 0.4), y0 - 1, c[1]);
}

// los cielos ricos de la Grecia antigua (paradas del degradado) y los tres tonos de sus nubes
const F_CIELOS = Object.fromEntries(Object.entries({
  dia: [[0, '#3a8ade'], [0.25, '#4aa6ea'], [0.5, '#74bef2'], [0.75, '#98ccf0'], [0.92, '#c8e4f0'], [1, '#e4eef0']],
  tarde: [[0, '#2a2a6a'], [0.18, '#4a3a82'], [0.36, '#8a4a7e'], [0.52, '#c85a6a'], [0.68, '#ec8a5a'], [0.84, '#f8c070'], [1, '#fde4a4']],
  noche: [[0, '#060918'], [0.35, '#0c1230'], [0.7, '#162048'], [1, '#26306a']],
}).map(([k, v]) => [k, v.map(([f, c]) => [f, hex(c)])]));

const F_NUBES = Object.fromEntries(Object.entries({ dia: ['#a8d0ee', '#d6ecfa', '#ffffff'], tarde: ['#7a4476', '#de8478', '#ffd4a4'], noche: ['#141a3a', '#1e2650', '#2c3666'] }).map(([k, v]) => [k, v.map(hex)]));

// un cielo de exterior entre y = 0 y hor: degradado tramado, el sol con su halo (o la luna), cirros casi quietos y
// cúmulos a dos velocidades; la esquina de Atom queda sin nubes. o.sol [x, y, r] | null; o.cumulos (5); o.cirros (3)
function f_cieloExt(R, t, hor, modo, o = {}) {
  f_degradado(R, 0, 319, 0, hor, F_CIELOS[modo]);
  const atom = (x, y) => x > 270 && y < 50, B = R.buf;
  if (modo === 'noche') for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 401) * 319), y = Math.round(h(k, 2, 401) ** 1.3 * (hor - 8)); if (atom(x, y)) continue; const tw = Math.sin(t * (1.3 + h(k, 3, 401) * 2) + k); if (tw > -0.4) B[y * 320 + x] = tw > 0.5 ? FA.estrellaL : FA.estrella; }
  const sol = o.sol === undefined ? null : o.sol;
  if (sol) { const [sx, sy, sr] = sol, R2 = sr + 11;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor, sy + R2); y++) for (let x = Math.max(0, sx - R2); x <= Math.min(319, sx + R2); x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (f_umbral(x, y) < q * q) B[y * 320 + x] = f_mezcla(B[y * 320 + x], FA.luz, 0.45); } }
  const cn = F_NUBES[modo];
  for (let k = 0; k < (o.cirros ?? 3); k++) { const w = 30 + Math.round(h(k, 5, 402) * 40), x0 = ((h(k, 6, 402) * 440 + t * (0.6 + k * 0.3)) % 470) - 80, y = Math.round(hor * (0.18 + k * 0.13)) + 4;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || atom(x, y) || h(i >> 2, k, 403) < 0.25) continue; const e = Math.sin(i / w * Math.PI); R.pset(x, y, e > 0.35 ? cn[1] : cn[0]); if (e > 0.6 && i % 4) R.pset(x + 3, y - 1, cn[2]); } }
  const n = o.cumulos ?? 5;
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 26 + k * 9 : 13 + ((k * 7) % 8), v = cerca ? 3.2 + k * 1.1 : 1.2 + k * 0.3, y = Math.round(cerca ? hor * 0.42 + k * hor * 0.16 : hor * (0.5 + (k - 2) * 0.12)), x = ((h(k, 7, 402) * 470 + t * v) % 500) - 90;
    if (x + w / 2 > 266 && y < 56) continue; f_nube(R, Math.round(x), y, w, k + 3, cn); }
  if (sol && modo !== 'noche') { const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, hex('#fff6c0')); R.disco(sx, sy, sr, FA.sol); R.disco(sx - Math.round(sr / 3), sy - Math.round(sr / 3), Math.max(1, Math.round(sr / 3)), FA.solL); }
}

// una figurita de fondo de ~9 px (gente lejana): piernas que andan si va, cuerpo, cabeza y pelo; d: hacia dónde mira
function f_figurita(R, x, suelo, t, ropa, o = {}) {
  const { pset } = R, d = o.dir ?? 1, anda = o.anda ?? false, f = anda ? Math.floor(t * 6 + x * 0.3) % 2 : 0, pi = o.piel ?? FA.piel, pelo = o.pelo ?? FA.madD, s = o.esc ?? 1;
  const P = (i, j, c) => { for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) pset(x + i * s + a, suelo - j * s - b, c); };
  P(0, 0, FA.madD); P(2, 0, FA.madD); P(f ? 0 : 1, 1, pi); P(f ? 2 : 1, 1, pi);
  for (let j = 2; j <= 5; j++) for (let i = 0; i <= 2; i++) P(i, j, j === 2 && i !== 1 ? ropa : (i === (d > 0 ? 0 : 2) && j < 5 ? f_mezcla(ropa, FA.k, 0.25) : ropa));
  if (o.brazo) { P(d > 0 ? 3 : -1, 5, ropa); P(d > 0 ? 4 : -2, 6, pi); } else { P(d > 0 ? -1 : 3, 3, pi); }
  if (o.carga) { P(d > 0 ? -1 : 3, 6, o.carga); P(d > 0 ? -1 : 3, 7, o.carga); P(d > 0 ? 0 : 2, 8, o.carga); P(d > 0 ? -1 : 3, 5, f_mezcla(o.carga, FA.k, 0.3)); }
  P(0, 6, pi); P(1, 6, pi); P(2, 6, pi); P(0, 7, pi); P(1, 7, pi); P(2, 7, pi); P(d > 0 ? 2 : 0, 7, FA.k);
  P(0, 8, pelo); P(1, 8, pelo); P(2, 8, pelo); P(d > 0 ? 0 : 2, 7, pelo);
}

// un pájaro en vuelo de 5 px (ala arriba / ala abajo)
function f_pajaro(R, x, y, t, c, k = 0) { x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 11 + k * 1.7) > 0; R.pset(x, y, c); R.pset(x - 1, y - (a ? 1 : 0), c); R.pset(x + 1, y - (a ? 1 : 0), c); R.pset(x - 2, y - (a ? 2 : -1), c); R.pset(x + 2, y - (a ? 2 : -1), c); }

// una paloma en el suelo que picotea, y de vez en cuando echa a volar y vuelve (x, y: los pies)
function f_paloma(R, x, y, t, k = 0) {
  const ciclo = 9 + (k % 3) * 2, u = ((t + k * 2.7) % ciclo) / ciclo, vuela = u > 0.82, g = hex('#8a8e9e'), gS = hex('#5e6274'), gL = hex('#b8bccc'), cu = hex('#5a8a7a');
  if (vuela) { const v = (u - 0.82) / 0.18, yy = y - Math.sin(v * Math.PI) * 22, xx = x + v * 16 * (k % 2 ? -1 : 1); f_pajaro(R, xx, yy, t, gS, k); return; }
  const pica = Math.sin(t * 5 + k * 3) > 0.55, d = k % 2 ? -1 : 1, X = (i) => x + i * d, mv = Math.round(Math.sin(t * 0.7 + k) * 3);
  x += mv; const { pset, rect } = R;
  rect(Math.min(X(-2), X(1)), y - 3, Math.max(X(-2), X(1)), y - 2, g); pset(X(-3), y - 3, gS); pset(X(-1), y - 3, gL); pset(X(0), y - 2, gS);
  if (pica) { pset(X(2), y - 2, cu); pset(X(3), y - 1, g); pset(X(4), y - 1, hex('#e0a050')); } else { pset(X(2), y - 3, cu); pset(X(2), y - 4, g); pset(X(3), y - 5, g); pset(X(3), y - 4, FA.k); pset(X(4), y - 4, hex('#e0a050')); }
  pset(X(-1), y - 1, hex('#c86a5a')); pset(X(0), y - 1, hex('#c86a5a'));
}

// lo fijo del taller (en su búfer): techo, pared encalada con piedra, zócalo ocre, bocetos, horno, estante y
// herramientas, el banco con sus cosas, la tina y el suelo de baldosas; luz: tiñe todo para la tarde o la noche
function f_tallerFijo(R, luz) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf;
  // el techo: tablas oscuras con vetas y la viga maestra
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) { let c = y < 8 ? ((x % 22 === 0) ? FA.vigaS : h(x >> 3, y, 405) < 0.3 ? FA.vigaS : FA.viga) : y < 13 ? (y === 8 ? FA.vigaL : h(x >> 2, y, 406) < 0.25 ? FA.vigaS : FA.viga) : FA.madD; if (y < 8 && (x % 22) > 18) c = FA.vigaS; B[y * 320 + x] = c; }
  for (let x = 0; x < 260; x += 40) { rect(x + 2, 8, x + 5, 13, FA.madD); pset(x + 3, 10, FA.vigaL); }   // las clavijas de la viga
  // la pared: cal sobre sillarejo; donde se ha caído la cal asoma la piedra con sus juntas
  for (let y = 14; y < 150; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 14) / 9), off = h(fila, 3, 407) * 20, col = Math.floor((x + off) / (16 + Math.round(h(fila, 4, 407) * 8))), bloqueX = (x + off) % (16 + Math.round(h(fila, 4, 407) * 8));
    const n = f_ruido(x, y, 408, 22) * 0.75 + f_ruido(x, y, 409, 7) * 0.25, pelado = n < 0.24 && y > 20 && !(x > 266 && y < 52);
    let c;
    if (pelado) c = ((y - 14) % 9 === 8 || bloqueX === 0) ? FA.pieS : h(col, fila, 410) < 0.3 ? FA.pieL : h(x, y, 411) < 0.08 ? FA.pieS : FA.pie;
    else if (n < 0.27 && y > 20 && !(x > 266 && y < 52)) c = FA.calD;   // el borde de la cal que se cae
    else c = h(x, y, 412) < 0.06 ? FA.calS : (h(x >> 1, y >> 2, 413) < 0.12 ? FA.calL : FA.cal);
    if (!pelado && ((y - 14) % 9 === 8) && h(x >> 2, fila, 414) < 0.18) c = FA.calS;   // la piedra se adivina bajo la cal
    B[y * 320 + x] = c;
  }
  // el zócalo de ocre rojo con su filete
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; let c = y === 120 ? FA.k : y === 121 ? FA.ocreL : y === 124 ? FA.ocreS : h(x >> 1, y, 415) < 0.1 ? FA.ocreS : h(x, y >> 1, 416) < 0.06 ? FA.ocreL : FA.ocre; if (y > 144) c = f_mezcla(c, FA.k, 0.25); B[i] = c; }
  // el hollín sobre el horno: la pared se ennegrece hacia la chimenea
  for (let y = 14; y < 120; y++) for (let x = 0; x < 130; x++) { const d = Math.hypot((x - 57) * 0.8, (y - 40) * 0.6), a = Math.max(0, 1 - d / 62); if (a > 0 && f_umbral(x, y) < a * 1.1) B[y * 320 + x] = f_mezcla(B[y * 320 + x], FA.hollin, 0.35 + a * 0.3); }
  // bocetos de ruedas a carboncillo sobre la cal (sin letras)
  { const bx = 120, by = 92; const circ = (cx, cy, r, dientes) => { for (let a = 0; a < Math.PI * 2; a += 0.5 / r) { const rr = r + (dientes && Math.floor(a * dientes / (Math.PI * 2) * 2) % 2 ? 1.5 : 0); pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), hex('#6a6058')); } };
    circ(bx, by, 9, 24); circ(bx, by, 2, 0); circ(bx + 15, by + 6, 5, 14); circ(bx + 15, by + 6, 1, 0); linea(bx, by, bx + 15, by + 6, hex('#8a8070')); linea(bx - 12, by + 14, bx + 26, by + 14, hex('#8a8070')); for (let i = 0; i < 6; i++) pset(bx - 12 + i * 7, by + 15, hex('#6a6058')); }
  // ── el horno: la base de piedra, la cúpula de barro, la boca, la chimenea hasta el techo y el reborde
  for (let y = 14; y < 80; y++) { const w = 6 + Math.round((y - 14) * 0.12); for (let x = 57 - w; x <= 57 + w; x++) { const borde = x === 57 - w || x === 57 + w; B[y * 320 + x] = borde ? FA.k : x > 57 + w - 3 ? FA.arcS : (y % 7 === 0 ? FA.arcS : h(x, y, 417) < 0.1 ? FA.hollin : x < 57 - w + 3 ? FA.arcL : FA.arc); } }
  for (let x = 47; x <= 67; x++) { pset(x, 46, FA.arcS); pset(x, 47, FA.arcL); }   // el aro de la chimenea
  for (let y = 78; y < 112; y++) { const v = (y - 112) / 34, w = Math.round(Math.sqrt(Math.max(0, 1 - v * v)) * 36); for (let x = 57 - w; x <= 57 + w; x++) { const e = (x - 57) / Math.max(1, w), sh = e > 0.45 ? FA.arcS : e < -0.5 ? FA.arcL : FA.arc; B[y * 320 + x] = x === 57 - w || x === 57 + w || y === 78 ? FA.k : h(x >> 1, y >> 1, 418) < 0.1 ? FA.arcS : (h(x, y, 419) < 0.04 ? FA.hollin : sh); }
    if (y > 84 && y % 6 === 0) for (let x = 57 - w + 2; x <= 57 + w - 2; x++) if (h(x >> 2, y, 420) < 0.5) pset(x, y, FA.arcS); }   // las grietas y las vueltas de barro
  for (let y = 110; y < 152; y++) for (let x = 20; x <= 94; x++) { const fila = Math.floor((y - 110) / 6), jx = (x + (fila % 2) * 6) % 12, junta = (y - 110) % 6 === 5 || jx === 0; B[y * 320 + x] = x === 20 || x === 94 ? FA.k : junta ? FA.tejaJ : x > 86 ? FA.tejaS : h(Math.floor((x + (fila % 2) * 6) / 12), fila, 421) < 0.3 ? FA.tejaL : FA.teja; }
  rect(18, 109, 96, 111, FA.k); rect(19, 109, 95, 109, FA.pieL); rect(19, 110, 95, 110, FA.pie);   // el reborde de piedra sobre la base
  // la boca en arco (oscura: las brasas se pintan encima en cada fotograma)
  for (let y = 116; y <= 144; y++) for (let x = 42; x <= 72; x++) { const dx = x - 57, dy = y - 128, dentro = y >= 128 ? Math.abs(dx) <= 14 : dx * dx + dy * dy <= 196; const borde = y >= 128 ? Math.abs(dx) === 15 : (dx * dx + dy * dy > 196 && dx * dx + dy * dy <= 256); if (dentro) B[y * 320 + x] = y < 130 ? hex('#2a1410') : hex('#3a1a12'); else if (borde) B[y * 320 + x] = FA.k; }
  for (let a = Math.PI; a <= Math.PI * 2; a += 0.08) { const xx = Math.round(57 + Math.cos(a) * 17), yy = Math.round(128 + Math.sin(a) * 17); pset(xx, yy, FA.pieS); pset(xx, yy - 1, FA.pieL); }   // las dovelas
  rect(38, 144, 76, 147, FA.k); rect(39, 144, 75, 145, FA.pieL); rect(39, 146, 75, 146, FA.pieS);   // la solera delante de la boca
  // la cesta de carbón, las tenazas y el atizador apoyados
  for (let y = 140; y < 156; y++) { const w = 8 - Math.round((y - 140) * 0.12); for (let x = 9 - w; x <= 9 + w; x++) pset(x, y, x === 9 - w || x === 9 + w ? FA.k : ((x + y) % 3 === 0) ? FA.juncoS : FA.junco); }
  for (let i = 0; i < 18; i++) { const x = 2 + Math.round(h(i, 1, 422) * 14), y = 137 + Math.round(h(i, 2, 422) * 4); pset(x, y, i % 3 ? FA.ceniza : FA.k); pset(x + 1, y, FA.cenizaL); }
  linea(98, 150, 104, 112, FA.k); linea(99, 150, 105, 112, FA.metalD ?? hex('#4a5262')); linea(103, 150, 106, 112, FA.k); pset(105, 111, FA.k); pset(107, 112, FA.k);
  // la tina de templar: duelas de madera con sus aros
  for (let y = 144; y < 160; y++) for (let x = 108; x <= 128; x++) { const borde = x === 108 || x === 128 || y === 159; pset(x, y, borde ? FA.k : (y === 148 || y === 155) ? hex('#4a5262') : (x - 108) % 4 === 0 ? FA.madS : x > 124 ? FA.madS : FA.mad); }
  rect(108, 143, 128, 143, FA.k);
  // el estante con ánforas, jarras, rollos y una balanza; debajo, las herramientas colgadas
  rect(98, 52, 160, 54, FA.k); rect(99, 52, 159, 52, FA.madL); rect(99, 53, 159, 53, FA.mad); for (const bx of [102, 154]) { rect(bx, 55, bx + 2, 60, FA.k); pset(bx + 1, 56, FA.madS); }
  const anfora = (x, yb, alto, c, cS, cL) => { for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.round(u < 0.15 ? 1 + u * 6 : u < 0.75 ? 4 + Math.sin((u - 0.15) / 0.6 * Math.PI) * 1.5 : 4 - (u - 0.75) * 12); for (let i = -w; i <= w; i++) pset(x + i, yb - j, Math.abs(i) === w ? FA.k : i > w / 3 ? cS : i < -w / 3 ? cL : c); }
    const yt = yb - alto; rect(x - 1, yt - 2, x + 1, yt, FA.k); pset(x, yt - 1, c); for (const s of [-1, 1]) { pset(x + s * 2, yt + 1, FA.k); pset(x + s * 3, yt + 2, FA.k); pset(x + s * 3, yt + 3, FA.k); } };
  anfora(106, 51, 16, FA.teja, FA.tejaS, FA.tejaL); anfora(117, 51, 12, FA.arcL, FA.arc, hex('#e0b080'));
  for (let k = 0; k < 3; k++) { const x = 124 + k * 5; rect(x, 46, x + 3, 51, FA.k); rect(x + 1, 47, x + 2, 51, k === 1 ? hex('#d8c8a0') : hex('#e8dcb8')); pset(x + 1, 47, hex('#a89870')); }   // los rollos de papiro, de canto
  { const x = 146; linea(x, 40, x, 51, FA.k); linea(x - 7, 42, x + 7, 42, FA.broS); for (const s of [-1, 1]) { linea(x + s * 7, 42, x + s * 5, 47, FA.broS); linea(x + s * 7, 42, x + s * 9, 47, FA.broS); rect(x + s * 7 - 2, 47, x + s * 7 + 2, 48, FA.bro); pset(x + s * 7 - 1, 47, FA.broL); } rect(x - 2, 50, x + 2, 51, FA.broS); }   // la balanza
  // las herramientas colgadas de sus clavos: martillo, tenazas, sierra de arco, compás grande, limas y rollo de alambre
  const clavo = (x, y) => { pset(x, y, FA.k); pset(x, y - 1, FA.cenizaL); };
  clavo(104, 64); rect(103, 65, 104, 80, FA.mad); rect(100, 80, 107, 83, FA.k); rect(101, 81, 106, 82, hex('#6a7080'));
  clavo(114, 64); linea(113, 65, 110, 82, FA.k); linea(115, 65, 118, 82, FA.k); linea(112, 66, 111, 72, hex('#6a7080'));
  clavo(128, 64); linea(122, 66, 138, 66, FA.madS); linea(122, 66, 122, 74, FA.madS); linea(138, 66, 138, 74, FA.madS); linea(122, 74, 138, 74, hex('#8a90a0')); for (let x = 123; x < 138; x += 2) pset(x, 75, hex('#6a7080'));
  clavo(146, 64); linea(146, 65, 141, 86, FA.broS); linea(146, 65, 151, 86, FA.broS); disco(146, 66, 1, FA.bro); linea(143, 77, 149, 77, FA.broS);
  clavo(156, 64); for (let k = 0; k < 3; k++) { rect(154 + k * 2, 65, 154 + k * 2, 80, hex('#7a8090')); rect(154 + k * 2, 65, 154 + k * 2, 68, FA.mad); }
  // ── el banco de trabajo contra la pared: la tabla, el faldón, las patas y el travesaño; su sombra en la pared
  for (let y = 141; y < 150; y++) for (let x = 150; x <= 270; x++) if (f_umbral(x, y) < 0.6) pset(x, y, f_mezcla(R.pget(x, y), FA.k, 0.35));
  rect(148, 133, 270, 141, FA.k); rect(149, 134, 269, 135, FA.madL); for (let x = 149; x < 270; x++) { pset(x, 136, h(x >> 2, 1, 423) < 0.3 ? FA.madS : FA.mad); pset(x, 137, h(x >> 3, 2, 423) < 0.4 ? FA.mad : FA.madS); } rect(149, 138, 269, 140, FA.madS); for (let x = 152; x < 270; x += 13) pset(x, 139, FA.madD);
  for (const lx of [152, 263]) { rect(lx, 141, lx + 4, 153, FA.k); rect(lx + 1, 141, lx + 3, 153, FA.madS); pset(lx + 1, 142, FA.mad); }
  rect(156, 148, 263, 149, FA.k); rect(156, 148, 263, 148, FA.madS);
  // lo que hay sobre el banco: el torno de banco, las láminas, una rueda hecha en su clavo, el taladro de arco, limas,
  // el compás y la rueda a medio cortar (la lucerna con su llama se pinta aparte)
  rect(152, 124, 162, 133, FA.k); rect(153, 125, 156, 132, FA.mad); rect(158, 125, 161, 132, FA.madL); rect(154, 120, 160, 123, FA.k); rect(155, 121, 159, 122, FA.bro); pset(155, 121, FA.broL); linea(150, 127, 164, 127, hex('#6a7080'));
  for (let k = 0; k < 3; k++) { rect(166 + k, 131 - k, 182 + k, 132 - k, FA.k); rect(167 + k, 131 - k, 181 + k, 131 - k, k === 2 ? FA.broL : FA.bro); }
  { const cx = 188, cy = 122; rect(cx, cy + 6, cx, 133, FA.k); for (let a = 0; a < Math.PI * 2; a += 0.12) { const r = Math.floor(a / (Math.PI * 2) * 20) % 2 ? 6 : 5; pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), FA.broS); } disco(cx, cy, 4, FA.bro); disco(cx - 1, cy - 1, 2, FA.broL); pset(cx, cy, FA.k); }
  linea(198, 132, 214, 126, FA.k); linea(198, 131, 214, 125, FA.mad); for (let x = 199; x < 214; x++) pset(x, Math.round(129 - (x - 199) * 0.35), hex('#d8c8a0'));   // el taladro de arco con su cuerda
  rect(205, 120, 206, 132, FA.k);
  for (let k = 0; k < 3; k++) { rect(218 + k * 3, 128 + k, 219 + k * 3, 133, FA.k); rect(218 + k * 3, 124 + k, 219 + k * 3, 128 + k, hex('#8a90a0')); }   // limas en su taco
  rect(216, 130, 228, 133, FA.k); rect(217, 130, 227, 131, FA.madL);
  linea(232, 133, 236, 121, FA.broS); linea(240, 133, 236, 121, FA.broS); disco(236, 121, 1, FA.bro); pset(236, 120, FA.broL);   // el compás abierto
  rect(248, 126, 254, 133, FA.k); rect(249, 127, 253, 133, FA.madS);   // el taco que sostiene la rueda (la rueda va aparte)
  // la pared de detrás del banco: una tabla con plantillas de rueda colgada
  rect(196, 100, 228, 116, FA.k); rect(197, 101, 227, 115, FA.madL); for (let x = 197; x < 228; x += 5) linea(x, 101, x, 115, FA.mad);
  for (const [cx, cy, r] of [[204, 108, 5], [215, 107, 4], [223, 110, 3]]) { for (let a = 0; a < Math.PI * 2; a += 0.2) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), FA.madD); pset(cx, cy, FA.k); }
  // la hornacina de la derecha (por debajo de la esquina de Atom) con un jarro y lingotes de bronce, y el mandil de cuero colgado
  { const x0 = 282, x1 = 306, y0 = 62, y1 = 84; rect(x0 - 1, y0 - 4, x1 + 1, y1 + 1, FA.k); for (let y = y0 - 3; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dy = y - y0, dx = x - (x0 + x1) / 2; if (dy < 0 && dx * dx > 144 - dy * dy * 6) { pset(x, y, FA.cal); continue; } pset(x, y, y > y1 - 2 ? FA.pieL : x < x0 + 3 ? hex('#6a5a48') : hex('#8a7860')); }
    anfora(290, 83, 11, FA.arc, FA.arcS, FA.arcL); for (let k = 0; k < 3; k++) { rect(296 + (k % 2) * 3, 80 - k * 2, 303 + (k % 2) * 3, 81 - k * 2, FA.k); rect(297 + (k % 2) * 3, 80 - k * 2, 302 + (k % 2) * 3, 80 - k * 2, k === 2 ? FA.broL : FA.bro); }
    rect(x0 - 2, y1 + 1, x1 + 2, y1 + 3, FA.k); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, FA.pieL); }
  { const x = 292; pset(x, 94, FA.k); pset(x, 93, FA.cenizaL); linea(x, 95, x - 6, 101, FA.madD); linea(x, 95, x + 6, 101, FA.madD);
    for (let y = 100; y < 124; y++) { const w = y < 106 ? 5 : 7; for (let i = -w; i <= w; i++) pset(x + i, y, Math.abs(i) === w || y === 123 ? FA.k : i > w - 3 ? hex('#5a3a24') : (y + i) % 9 === 0 ? hex('#6a4428') : hex('#8a5a38')); } rect(x - 4, 110, x + 4, 113, hex('#5a3a24')); pset(x - 3, 111, FA.broL); }
  // el marco de la ventana: el dintel, el alféizar de piedra y las contraventanas de tablas abiertas
  rect(186, 25, 268, 30, FA.k); rect(187, 26, 267, 28, FA.madL); rect(187, 29, 267, 29, FA.madS);
  rect(186, 90, 268, 96, FA.k); rect(187, 91, 267, 92, FA.pieL); rect(187, 93, 267, 95, FA.pie); for (let x = 190; x < 268; x += 9) pset(x, 94, FA.pieS);
  for (const [x0, x1] of [[184, 195], [259, 270]]) { rect(x0, 31, x1, 89, FA.k); for (let x = x0 + 1; x < x1; x++) for (let y = 32; y < 89; y++) pset(x, y, (x - x0) % 4 === 0 ? FA.madD : y === 44 || y === 76 ? FA.madS : h(x, y >> 2, 424) < 0.1 ? FA.madS : FA.mad); }
  rect(196, 30, 196, 90, FA.k); rect(258, 30, 258, 90, FA.k);
  // la maceta de albahaca en el alféizar
  rect(244, 84, 252, 90, FA.k); rect(245, 85, 251, 89, FA.teja); rect(245, 85, 251, 85, FA.tejaL); disco(248, 81, 4, FA.hojaS); disco(247, 80, 3, FA.hoja); pset(246, 78, FA.hojaL); pset(249, 79, FA.hojaL);
  // ── el suelo de baldosas de barro en perspectiva, con polvo de metal junto al banco y el horno
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) {
    const ys = [150, 153, 157, 162, 168, 175], fila = ys.findIndex((v, i) => y >= v && (i === ys.length - 1 || y < ys[i + 1])), u = (x - 160) / (y - 70) * 4.2 + (fila % 2) * 0.5, tx = Math.floor(u);
    let c = ys.includes(y) || ((u % 1 + 1) % 1) < 0.06 ? FA.tejaJ : h(tx, fila, 425) < 0.25 ? FA.tejaS : h(tx, fila, 426) < 0.2 ? FA.tejaL : FA.teja;
    if (h(x, y, 427) < 0.05) c = f_mezcla(c, FA.k, 0.2);
    if (y < 153) c = f_mezcla(c, FA.k, 0.3);
    B[y * 320 + x] = c;
  }
  for (let i = 0; i < 60; i++) { const x = 140 + Math.round(h(i, 1, 428) * 130), y = 151 + Math.round(h(i, 2, 428) ** 2 * 10); pset(x, y, i % 4 ? FA.broS : FA.broL); }   // limaduras
  for (let i = 0; i < 30; i++) { const x = 30 + Math.round(h(i, 3, 428) * 60), y = 150 + Math.round(h(i, 4, 428) * 8); pset(x, y, i % 2 ? FA.ceniza : FA.k); }   // ceniza y carbonilla
  // el tinte de la luz (una sola vez, al crear la capa)
  if (luz !== 'dia') { const col = luz === 'tarde' ? hex('#ffa060') : hex('#0e1230'), a = luz === 'tarde' ? 0.12 : 0.72; for (let i = 0; i < B.length; i++) B[i] = f_mezcla(B[i], col, a); }
}

// lo que se ve por la ventana del taller (recortado al hueco): el cielo, la colina con el templo, el mar con el muelle y
// el faro, el mercante a vela, la trirreme que rema, gaviotas y un mozo que carga un ánfora por el muelle
function f_puerto(R, t, x0, y0, x1, y1, luz) {
  const { pset, linea, disco, poligono } = R, hz = 64;
  R.recorte([x0, y0, x1, y1]);
  const P = luz === 'noche' ? F_CIELOS.noche : luz === 'tarde' ? F_CIELOS.tarde : F_CIELOS.dia;
  f_degradado(R, x0, x1, y0, hz, P.map(([f, c]) => [f, c]));
  if (luz === 'noche') { for (let k = 0; k < 22; k++) { const x = x0 + Math.round(h(k, 1, 430) * (x1 - x0)), y = y0 + Math.round(h(k, 2, 430) * (hz - y0 - 8)); if (Math.sin(t * 2 + k * 1.3) > -0.3) pset(x, y, k % 4 ? FA.estrella : FA.estrellaL); } disco(244, 40, 4, FA.luna); disco(246, 39, 3, F_CIELOS.noche[1][1]); }
  else { const cn = F_NUBES[luz]; for (let k = 0; k < 3; k++) { const x = x0 + ((h(k, 3, 430) * 90 + t * (2 + k)) % 100) - 20; f_nube(R, Math.round(x), y0 + 10 + k * 7, 14 + k * 4, k + 7, cn); }
    if (luz === 'tarde') { disco(214, hz - 3, 6, hex('#ffd890')); disco(214, hz - 3, 5, hex('#fff0b0')); } }
  // la colina con su templo y el pueblo
  const col = luz === 'noche' ? hex('#1e2a3a') : luz === 'tarde' ? hex('#8a6a7a') : hex('#8aa0a8'), colS = luz === 'noche' ? hex('#141c2a') : luz === 'tarde' ? hex('#6a4e62') : hex('#6e8a90');
  for (let x = x0; x <= x1; x++) { const yc = Math.round(hz - 4 - 6 * Math.sin((x - x0) / 40 + 0.4) - 2 * Math.sin(x * 0.2)); for (let y = yc; y < hz; y++) pset(x, y, y === yc ? col : (x + y) % 5 === 0 ? colS : col); }
  { const tx = 214, ty = hz - 13; R.rect(tx - 6, ty + 5, tx + 6, ty + 6, luz === 'noche' ? hex('#3a4458') : FA.marmS); for (let i = -5; i <= 5; i += 2) linea(tx + i, ty + 1, tx + i, ty + 4, luz === 'noche' ? hex('#3a4458') : FA.marm); poligono([[tx - 7, ty + 1], [tx, ty - 2], [tx + 7, ty + 1]], luz === 'noche' ? hex('#3a4458') : FA.marm); }
  for (let k = 0; k < 6; k++) { const x = 226 + k * 4, y = hz - 5 + (k % 2); R.recorte([x0, y0, x1, y1]); pset(x, y, luz === 'noche' ? (Math.sin(t * 3 + k) > 0 ? FA.brasaL : FA.brasa) : FA.calL); pset(x + 1, y, luz === 'noche' ? hex('#1e2a3a') : FA.calS); }
  // el mar, con las rayas de las olas que corren
  const mc = luz === 'noche' ? [hex('#0e1a34'), hex('#16264a'), hex('#2a3a6a')] : luz === 'tarde' ? [hex('#4a3a6a'), hex('#7a4a6a'), hex('#f0a070')] : [FA.marS, FA.mar, FA.marL];
  for (let y = hz; y <= y1; y++) for (let x = x0; x <= x1; x++) { const w = Math.sin(x * 0.5 + y * 1.3 + t * 2.2 + Math.sin(y * 0.7) * 3); pset(x, y, w > 0.85 ? mc[2] : y < hz + 3 ? mc[1] : (w < -0.6 ? mc[0] : mc[1])); }
  // el muelle de piedra con el faro
  R.rect(232, hz + 6, 257, hz + 9, FA.k); for (let x = 233; x <= 257; x++) { pset(x, hz + 7, FA.pieL); pset(x, hz + 8, (x % 5) ? FA.pie : FA.pieS); }
  for (let y = hz - 12; y <= hz + 6; y++) for (let x = 247; x <= 252; x++) pset(x, y, x === 247 || x === 252 ? FA.k : x > 250 ? FA.pieS : FA.pieL);
  disco(249, hz - 14, 2, luz === 'dia' ? FA.pieL : (Math.sin(t * 4) > 0 ? FA.brasaL : FA.brasa)); pset(249, hz - 17, FA.k);
  // el mercante que pasa despacio a vela
  { const sx = x0 + ((t * 2.5) % 90) - 15, sy = hz + 4; for (let i = -6; i <= 6; i++) { pset(Math.round(sx + i), sy, FA.madS); if (Math.abs(i) < 5) pset(Math.round(sx + i), sy + 1, FA.madD); } linea(Math.round(sx), sy - 10, Math.round(sx), sy, FA.madD); for (let j = 0; j < 8; j++) for (let i = -4; i <= 4; i++) pset(Math.round(sx + i + (j > 3 ? 1 : 0)), sy - 9 + j, j === 0 ? FA.madD : luz === 'noche' ? hex('#4a5070') : (i + j) % 7 === 0 ? FA.calS : FA.calL); }
  // la trirreme que cruza remando, más cerca
  { const sx = x1 + 40 - ((t * 7) % 140), sy = hz + 15, g = Math.floor(t * 4) % 2;
    for (let i = -16; i <= 16; i++) { const yb = sy + (Math.abs(i) > 13 ? -1 : 0); pset(Math.round(sx + i), yb - 1, FA.madS); pset(Math.round(sx + i), yb, FA.madD); pset(Math.round(sx + i), yb - 2, i % 3 === 0 ? FA.ocre : FA.mad); }
    pset(Math.round(sx - 17), sy - 1, FA.madD); pset(Math.round(sx - 18), sy, hex('#6a7080')); for (let j = 0; j < 4; j++) pset(Math.round(sx + 16), sy - 2 - j, FA.madD); pset(Math.round(sx + 15), sy - 6, FA.madD);
    for (let i = -12; i <= 12; i += 3) linea(Math.round(sx + i), sy, Math.round(sx + i + (g ? 2 : -2)), sy + 3, FA.madS);
    linea(Math.round(sx), sy - 12, Math.round(sx), sy - 3, FA.madD); for (let j = 0; j < 7; j++) for (let i = -5; i <= 5; i++) pset(Math.round(sx + i), sy - 11 + j, j === 0 ? FA.madD : Math.abs(i) < 2 ? FA.ocre : luz === 'noche' ? hex('#5a6080') : FA.calL); }
  // gaviotas y el mozo del muelle
  for (let k = 0; k < 2; k++) f_pajaro(R, x0 + ((t * (9 + k * 3) + k * 40) % 90) - 10, y0 + 18 + k * 6 + Math.sin(t + k) * 2, t, luz === 'noche' ? hex('#3a4a6a') : FA.blanco, k);
  { const u = (t * 0.06) % 1, mx = Math.round(233 + u * 14); f_figurita(R, mx, hz + 6, t, hex('#8a6a4a'), { anda: true, carga: FA.teja }); }
  R.recorte(null);
}

// las brasas de la boca del horno, que laten y se avivan con el fuelle; con crisol: el bronce fundido y las chispas
function f_brasas(R, t, crisol, noche) {
  const { pset, rect, disco } = R, sopla = Math.max(0, Math.sin(t * 2.2)) ** 3;
  for (let y = 126; y <= 143; y++) for (let x = 43; x <= 71; x++) { const dx = x - 57, dy = y - 128; if (y < 128 ? dx * dx + dy * dy > 196 : Math.abs(dx) > 14) continue;
    const base = 1 - (143 - y) / 14, n = h(x, y, 431), l = Math.sin(t * (2 + n * 3) + n * 20) * 0.25 + base * 0.9 + sopla * 0.35 - 0.2;
    if (y >= 135) pset(x, y, l > 0.75 ? FA.brasaL : l > 0.45 ? FA.brasa : l > 0.2 ? FA.brasaS : FA.brasaD);
    else if (f_umbral(x, y) < (l - 0.2) * 0.5) pset(x, y, FA.brasaS); }
  for (let k = 0; k < 9; k++) { const x = 46 + Math.round(h(k, 1, 432) * 22), y = 136 + Math.round(h(k, 2, 432) * 4); rect(x, y, x + 2, y + 1, FA.k); pset(x + 1, y, Math.sin(t * 3 + k) > 0.2 ? FA.brasa : FA.brasaS); }   // los carbones
  // el resplandor que sale de la boca, sobre la solera, el suelo y la base
  const a = 0.18 + sopla * 0.12 + Math.sin(t * 7) * 0.03;
  const RG = noche ? 56 : 36; for (let y = 100; y < 180; y++) for (let x = 4; x < 124; x++) { const dx = x - 57, dy = y - 140, d = Math.hypot(dx, dy * 1.4); if (d < 17 || d > RG) continue; if (y < 144 && Math.abs(dx) <= 15) continue; const q = (1 - (d - 17) / (RG - 17)) * (noche ? 1.3 : 1); if (f_umbral(x, y) < q * 0.8) f_tinte(R, x, y, FA.brasa, a * (noche ? 1.6 : 1)); }
  if (crisol) { // el crisol de barro sobre las brasas, con el bronce que brilla y tiembla, y chispitas que suben
    for (let y = 124; y <= 136; y++) { const w = 7 - Math.round((y - 124) * 0.3); for (let x = 57 - w; x <= 57 + w; x++) pset(x, y, x === 57 - w || x === 57 + w || y === 136 ? FA.k : x > 57 + w - 2 ? FA.arcS : FA.arc); }
    for (let x = 51; x <= 63; x++) { const s = Math.sin(x * 0.9 + t * 6); pset(x, 124, s > 0.5 ? FA.fundidoL : FA.fundido); pset(x, 125, s > 0 ? FA.fundido : FA.brasa); }
    rect(49, 123, 50, 125, FA.k); rect(64, 123, 65, 125, FA.k); pset(65, 122, FA.k);
    for (let k = 0; k < 5; k++) { const u = ((t * 0.7 + k / 5) % 1), x = Math.round(57 + (h(k, 3, 433) - 0.5) * 10 + Math.sin(t * 3 + k) * 2), y = Math.round(122 - u * 14); if (u < 0.85) pset(x, y, u < 0.4 ? FA.brasaL : FA.brasa); }
    for (let x = 52; x <= 62; x++) if (Math.sin(t * 9 + x) > 0.6) f_tinte(R, x, 120 + (x % 3), FA.fundidoL, 0.3);   // el aire que tiembla
  }
}

// pinta el taller: la capa fija, el puerto por la ventana, el emparrado, el rayo de luz con sus motas, las brasas (y
// el crisol), el fuelle, el gato, la rueda a medio cortar, la lucerna y la gota en la tina
function f_taller(R, t, o) {
  const luz = ['tarde', 'noche'].includes(o.luz) ? o.luz : 'dia', noche = luz === 'noche', { pset, rect, linea, disco } = R;
  R.copiar(f_capa(R, 'taller-' + luz, () => f_tallerFijo(R, luz)));
  f_puerto(R, t, 197, 31, 257, 89, luz);
  // el emparrado del dintel, que se mece
  for (let k = 0; k < 9; k++) { const x = 190 + k * 9, m = Math.round(Math.sin(t * 1.4 + k) * 1.2), L = 4 + Math.round(h(k, 1, 434) * 7); for (let j = 0; j < L; j++) pset(x + (j > 2 ? m : 0), 30 + j, j % 2 ? FA.hojaS : FA.hoja); disco(x + m, 30 + L, 1, noche ? hex('#2a3a2a') : FA.hojaL); if (k % 3 === 1) { pset(x + m + 1, 31 + L, hex('#6a3a6a')); pset(x + m, 32 + L, hex('#6a3a6a')); } }
  // el rayo de luz que entra por la ventana hasta el suelo, con motas de polvo
  if (!noche) { const sl = luz === 'tarde' ? 1.5 : 0.95, cl = luz === 'tarde' ? FA.luzT : FA.luz;
    for (let y = 151; y < 180; y++) { const d = Math.round((y - 92) * sl); for (let x = 197 - d; x <= 257 - d; x++) if (f_umbral(x, y) < 0.55) f_tinte(R, x, y, cl, 0.22); }
    for (let k = 0; k < 16; k++) { const u = (h(k, 1, 435) + t * 0.03) % 1, y = 96 + u * 70, x = 197 + h(k, 2, 435) * 60 - (y - 92) * sl + Math.sin(t * 0.6 + k) * 3; if (Math.sin(t * 1.5 + k * 2) > -0.2) pset(Math.round(x), Math.round(y), cl); } }
  f_brasas(R, t, !!o.horno, noche);
  // el fuelle de cuero que sopla (se aplasta y se hincha)
  { const p = Math.max(0, Math.sin(t * 2.2)), ab = Math.round(5 - p * 3); for (let y = 136 - ab; y <= 140 + ab; y++) { const w = 7 - Math.abs(y - 138) * 0.4; for (let x = 76; x <= 76 + w * 2; x++) pset(x, y, x === 76 || y === 136 - ab || y === 140 + ab ? FA.k : y < 138 ? hex('#8a5a3a') : hex('#6a4028')); }
    rect(90, 136 - ab - 1, 96, 136 - ab, FA.madS); rect(90, 140 + ab, 96, 141 + ab, FA.madS); rect(72, 137, 76, 139, FA.k); pset(73, 138, FA.broS); }
  // el gato dormido en el hombro del horno (mueve la cola)
  gato(R, 86, 107, t, { dir: -1 });
  // la rueda a medio cortar en su taco: los dientes solo en media vuelta, el resto aún liso; brilla a ratos
  { const cx = 251, cy = 120; for (let a = 0; a < Math.PI * 2; a += 0.05) { const diente = a > Math.PI * 0.9 && Math.floor(a / (Math.PI * 2) * 36) % 2 === 0; const r = diente ? 8 : 7; pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), FA.k); }
    disco(cx, cy, 6, FA.bro); for (let a = -0.6; a < 1.5; a += 0.1) pset(Math.round(cx + Math.cos(a + Math.PI) * 5), Math.round(cy + Math.sin(a + Math.PI) * 5), FA.broL); disco(cx, cy, 1, FA.k);
    for (let a = 0; a < Math.PI * 0.9; a += 0.25) pset(Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 7), FA.broS);   // la parte aún por cortar, marcada
    if ((t % 3.2) < 0.4) { pset(cx - 3, cy - 4, FA.blanco); pset(cx - 4, cy - 4, FA.broL); pset(cx - 3, cy - 5, FA.broL); } }
  // la lucerna del banco con su llamita y su halo
  { const x = 264, y = 131; rect(x - 4, y - 1, x + 3, y + 1, FA.k); rect(x - 3, y - 1, x + 2, y, FA.arc); pset(x - 2, y - 1, FA.arcL); rect(x + 3, y - 2, x + 5, y - 1, FA.k); const f = Math.round(Math.sin(t * 13) * 0.6 + Math.sin(t * 7.3) * 0.5);
    pset(x + 4 + f, y - 4, FA.brasaL); pset(x + 4, y - 3, FA.brasa); pset(x + 4 + (f > 0 ? 1 : 0), y - 5, FA.luz);
    for (let j = -10; j <= 8; j++) for (let i = -12; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 3 && d < 12 && f_umbral(x + i, y + j) < (1 - d / 12) * (noche ? 1 : 0.6)) f_tinte(R, x + 4 + i, y - 3 + j, FA.luzT, noche ? 0.3 : 0.15); } }
  // la gota que cae del cazo en la tina y sus ondas
  { const u = (t % 2.6) / 2.6; rect(118, 130, 119, 140, FA.madS); rect(115, 140, 121, 142, FA.k); if (u < 0.3) pset(119, 143 + Math.round(u * 6), FA.aguaL); for (let x = 109; x <= 127; x++) { const w = Math.sin(x * 0.8 - t * 3) * (u > 0.3 && u < 0.7 ? 1 : 0.2); pset(x, 144, w > 0.5 ? FA.aguaL : noche ? hex('#1a2a4a') : FA.agua); } }
  return {};
}

// delante del taller: el yunque en su tocón con el martillo y un ánfora grande apoyada, en la esquina de abajo a la derecha
function f_tallerDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, noche = o.luz === 'noche', osc = (c) => noche ? f_mezcla(c, hex('#0e1230'), 0.55) : c;
  const hi = [osc(hex('#4a5262')), osc(hex('#6a7282')), osc(hex('#a8b0bc')), osc(hex('#2e3442'))];
  // el tocón con su corteza y los anillos de la cara de arriba
  for (let y = 160; y < 180; y++) for (let x = 278; x <= 304; x++) { const e = x === 278 || x === 304; pset(x, y, e ? FA.k : (x - 278) % 5 === 0 ? osc(FA.madD) : x > 299 ? osc(FA.madS) : x < 282 ? osc(FA.madL) : osc(FA.mad)); }
  for (let x = 277; x <= 305; x++) { pset(x, 158, FA.k); pset(x, 159, osc(FA.madL)); } for (let x = 282; x <= 300; x += 3) pset(x, 159, osc(FA.mad));
  // el yunque: la bigornia hacia la izquierda, la tabla de arriba con su brillo, la cintura y el pie
  rect(282, 156, 300, 158, FA.k); rect(283, 156, 299, 157, hi[0]); rect(286, 150, 296, 155, FA.k); rect(287, 150, 295, 155, hi[0]); rect(293, 150, 295, 155, hi[3]);
  rect(280, 144, 304, 150, FA.k); rect(281, 145, 303, 149, hi[1]); rect(281, 145, 303, 145, hi[2]); rect(300, 146, 303, 149, hi[0]);
  for (let i = 0; i < 9; i++) { const x = 279 - i, y0 = 145 + Math.round(i * 0.3), y1 = 149 - Math.round(i * 0.25); if (y1 >= y0) { linea(x, y0, x, y1, hi[1]); pset(x, y0 - 1, FA.k); pset(x, y1 + 1, FA.k); pset(x, y0, hi[2]); } } pset(270, 147, FA.k);
  if ((t % 2.4) < 0.15) { pset(288, 143, FA.brasaL); pset(292, 142, FA.brasa); }   // un brillo en la tabla
  // el martillo apoyado en el tocón
  linea(296, 172, 310, 162, FA.k); linea(296, 171, 310, 161, osc(FA.madL)); rect(307, 157, 312, 162, FA.k); rect(308, 158, 311, 161, hi[1]);
  // el ánfora grande apoyada en la esquina
  for (let j = 0; j < 30; j++) { const u = j / 30, w = Math.round(u < 0.2 ? 2 + u * 15 : u < 0.8 ? 5 + Math.sin((u - 0.2) / 0.6 * Math.PI) * 2 : 5 - (u - 0.8) * 20); for (let i = -w; i <= w; i++) pset(316 + i, 186 - j, Math.abs(i) === w ? FA.k : i > 2 ? osc(FA.tejaS) : i < -2 ? osc(FA.tejaL) : osc(FA.teja)); }
}

// lo fijo del cielo de la terraza (dia: la versión de día para el eclipse de Sol): el cielo con estrellas y la Vía
// Láctea, el mar, la colina con el templo y el pueblo, la terraza de mármol con la balaustrada, la columna, el ciprés
// (sin su copa, que se mece), el taburete con rollos
function f_cieloFijo(R, dia) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf, hor = 112;
  if (!dia) {
    f_degradado(R, 0, 319, 0, hor, F_CIELOS.noche);
    // la Vía Láctea: una franja en diagonal, grumosa, con su franja oscura en medio
    for (let y = 0; y < hor; y++) for (let x = 0; x < 320; x++) { if (x > 266 && y < 52) continue; const cx = 40 + (hor - y) * 1.55, d = (x - cx) / 26, n = h(x >> 2, y >> 2, 436) * 0.5 + h(x >> 1, y >> 1, 437) * 0.3 + h(x, y, 438) * 0.2;
      const v = Math.exp(-d * d * 1.6) * (0.55 + n * 0.7) - Math.exp(-(((x - cx - 4 + Math.sin(y * 0.1) * 4) / 5) ** 2)) * 0.45;
      if (v > 0.2 && f_umbral(x, y) < v) B[y * 320 + x] = v > 0.75 && h(x, y, 439) < 0.4 ? FA.lacteaL : FA.lactea; else if (v < -0.1 && f_umbral(x, y) < -v) B[y * 320 + x] = FA.lacteaS; }
    for (let k = 0; k < 260; k++) { const x = Math.round(h(k, 1, 440) * 319), y = Math.round(h(k, 2, 440) ** 1.15 * (hor - 6)); if (x > 266 && y < 52) continue; B[y * 320 + x] = h(k, 3, 440) < 0.2 ? FA.estrellaL : FA.estrella; }
  }
  // el mar hasta la orilla
  const ms = dia ? [FA.marS, FA.mar, FA.marL] : [hex('#0a1028'), hex('#121a3a'), hex('#1e2a54')];
  for (let y = hor; y < 132; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = ((x + y * 7) % 13 === 0 || h(x >> 2, y, 441) < 0.12) ? ms[2] : y < hor + 2 ? ms[1] : h(x >> 3, y, 442) < 0.4 ? ms[0] : ms[1];
  // la colina de la derecha con olivos y el templo dórico en lo alto
  const cc = dia ? [hex('#7a8a5a'), hex('#5a6a42'), hex('#9aa070')] : [hex('#141a2c'), hex('#0c1120'), hex('#202840')];
  const cresta = new Int16Array(320);
  for (let x = 0; x < 320; x++) { const u = (x - 160) / 160, yc = Math.round(hor + 6 - Math.max(0, Math.sin((x - 150) / 170 * Math.PI)) * 30 - 3 * Math.sin(x * 0.11)); cresta[x] = yc; for (let y = Math.max(0, yc); y < 132; y++) B[y * 320 + x] = y === yc ? cc[2] : h(x >> 1, y >> 1, 443) < 0.18 ? cc[1] : cc[0]; }
  for (let k = 0; k < 40; k++) { const x = 160 + Math.round(h(k, 1, 444) * 150), y = cresta[x] + 2 + Math.round(h(k, 2, 444) * Math.max(1, 128 - cresta[x] - 4)); if (y > 128) continue; disco(x, y, 1 + (k % 2), cc[1]); pset(x - 1, y - 1, dia ? FA.olivL : hex('#2a3450')); }
  { const ty = cresta[232] - 2; for (let x = 204; x <= 260; x++) { const top = ty + 1 + Math.round(Math.abs(x - 232) > 24 ? (Math.abs(x - 232) - 24) * 0.6 : 0); for (let y = top; y <= Math.max(top, cresta[x] + 1); y++) B[y * 320 + x] = y === top ? cc[2] : h(x >> 1, y, 449) < 0.25 ? cc[1] : cc[0]; } }
  { const tx = 232, ty = cresta[232] - 2, cm = dia ? [FA.marm, FA.marmS, FA.marmD] : [hex('#4a5270'), hex('#323a58'), hex('#262c46')];
    rect(tx - 22, ty - 2, tx + 22, ty, FA.k); rect(tx - 21, ty - 2, tx + 21, ty - 1, cm[1]); rect(tx - 23, ty - 3, tx + 23, ty - 3, cm[0]);
    for (let i = -20; i <= 20; i += 4) { rect(tx + i, ty - 16, tx + i + 2, ty - 3, cm[0]); pset(tx + i + 2, ty - 10, cm[1]); rect(tx + i + 2, ty - 16, tx + i + 2, ty - 3, cm[1]); }
    rect(tx - 22, ty - 19, tx + 22, ty - 17, cm[0]); rect(tx - 22, ty - 17, tx + 22, ty - 17, cm[2]); for (let i = -21; i <= 21; i += 3) pset(tx + i, ty - 18, cm[2]);
    poligono([[tx - 24, ty - 19], [tx, ty - 28], [tx + 24, ty - 19]], FA.k); poligono([[tx - 21, ty - 20], [tx, ty - 26], [tx + 21, ty - 20]], cm[0]); poligono([[tx - 14, ty - 21], [tx, ty - 24], [tx + 14, ty - 21]], cm[1]); }
  // la orilla con el pueblo (casitas encaladas; sus ventanas se encienden en cada fotograma)
  for (let k = 0; k < 14; k++) { const x = 150 + k * 11 + Math.round(h(k, 1, 445) * 4), y = 128 - Math.round(h(k, 2, 445) * 6), w = 4 + Math.round(h(k, 3, 445) * 3); rect(x - w, y - 5, x + w, 131, dia ? FA.cal : hex('#2a3048')); rect(x - w, y - 6, x + w, y - 6, dia ? FA.teja : hex('#3a2a34')); rect(x + w - 1, y - 5, x + w, 131, dia ? FA.calS : hex('#1e2438')); }
  // la terraza: losas de mármol en perspectiva con su brillo de luna
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const ys = [150, 153, 157, 162, 168, 175], fila = ys.findIndex((v, i) => y >= v && (i === ys.length - 1 || y < ys[i + 1])), u = (x - 160) / (y - 80) * 3 + (fila % 2) * 0.5;
    let c = ys.includes(y) || ((u % 1 + 1) % 1) < 0.05 ? FA.marmD : h(Math.floor(u), fila, 446) < 0.3 ? FA.marmS : FA.marm; if (h(x, y >> 1, 447) < 0.04) c = FA.marmS;
    B[y * 320 + x] = dia ? c : f_mezcla(c, hex('#1a2250'), 0.62); }
  // la balaustrada: pasamanos, balaustres torneados y zócalo
  const bc = dia ? [FA.marm, FA.marmS, FA.marmD, FA.marmL] : [hex('#5a6488'), hex('#3e4668'), hex('#2a3050'), hex('#8a94b8')];
  rect(0, 137, 319, 147, dia ? FA.marmD : hex('#141a36')); for (let x = 0; x < 320; x += 3) pset(x, 146, dia ? FA.marmS : hex('#1e2648'));   // las losas de más allá, entre los balaustres
  rect(0, 132, 319, 137, FA.k); rect(0, 133, 319, 134, bc[3]); rect(0, 135, 319, 136, bc[1]);
  for (let x = 4; x < 320; x += 9) for (let y = 138; y < 147; y++) { const w = y < 140 || y > 144 ? 2 : 1 + (y === 142 ? 1 : 0); for (let i = -w; i <= w; i++) pset(x + i, y, Math.abs(i) === w ? FA.k : i > 0 ? bc[1] : bc[0]); }
  rect(0, 147, 319, 150, FA.k); rect(0, 148, 319, 148, bc[0]); rect(0, 149, 319, 149, bc[2]);
  // la columna dórica de la izquierda con sus estrías, el capitel y el arquitrabe que sale del cuadro
  for (let y = 0; y < 150; y++) for (let x = 2; x <= 19; x++) { const e = x === 2 || x === 19, est = (x - 2) % 3 === 0; let c = e ? FA.k : est ? bc[1] : x > 15 ? bc[2] : x < 6 ? bc[3] : bc[0]; if (y < 12) c = y === 11 || y === 8 || y < 2 ? FA.k : y < 8 ? bc[0] : bc[1]; B[y * 320 + x] = c; }
  rect(0, 0, 24, 6, FA.k); rect(0, 1, 23, 4, bc[1]); rect(0, 9, 22, 11, FA.k); rect(0, 9, 21, 10, bc[0]);
  // el taburete con dos rollos y una tablilla de cera
  { const x = 198; rect(x - 8, 145, x + 8, 147, FA.k); rect(x - 7, 145, x + 7, 145, dia ? FA.madL : hex('#4a3a3a')); for (const lx of [x - 7, x + 6]) rect(lx, 148, lx + 1, 158, FA.k); linea(x - 6, 154, x + 6, 154, FA.k);
    for (let k = 0; k < 2; k++) { rect(x - 6 + k * 5, 141, x - 2 + k * 5, 144, FA.k); rect(x - 5 + k * 5, 142, x - 3 + k * 5, 144, dia ? hex('#e8dcb8') : hex('#8a8aa0')); } rect(x + 4, 141, x + 8, 144, FA.k); rect(x + 5, 142, x + 7, 143, dia ? FA.madS : hex('#2a2a3a')); }
  // el pie de la esfera armilar (los anillos se pintan en cada fotograma)
  { const x = 168; rect(x - 1, 134, x + 1, 157, FA.k); rect(x, 134, x, 157, dia ? FA.broL : hex('#8a7a5a')); rect(x - 6, 155, x + 6, 158, FA.k); rect(x - 5, 155, x + 5, 156, dia ? FA.bro : hex('#5a4a3a')); }
}

// cuánto se ha oscurecido el día con el eclipse de Sol (0 de día, 0,82 en la totalidad); −1 si no hay eclipse de Sol
function f_eclipseK(o) { return typeof o.eclipse === 'number' ? Math.max(0, (Math.min(1, o.eclipse) - 0.55) / 0.45) ** 1.4 * 0.82 : -1; }

// pinta la cámara 'cielo': de noche (la capa con la Vía Láctea, las estrellas que titilan, la fugaz, la Luna que cruza
// con su reflejo, la barca con su farol) o, con o.eclipse numérico, de día con nubes y pájaros que se apaga por el eclipse
function f_cielo(R, t, o) {
  const { pset, rect, disco, linea } = R, k = f_eclipseK(o), solar = k >= 0, rojo = o.eclipse === 'luna' ? (o.rojo ?? 1) : (o.rojo ?? 0);
  let res;
  if (solar) {
    const e = Math.min(1, o.eclipse), sx = 232, sy = 50, r = 8;
    f_cieloExt(R, t, 112, 'dia', { sol: null, cumulos: 4 });
    for (let n = 0; n < 3; n++) f_pajaro(R, ((t * (10 + n * 3) + n * 90) % 380) - 30, 70 + n * 7 + Math.sin(t + n) * 3, t, hex('#2a2436'), n);   // gaviotas
    f_sobre(R, f_capa(R, 'cieloF-dia', () => f_cieloFijo(R, true), true));
    f_cieloVivo(R, t, true);
    if (k > 0) { const B = R.buf, osc = hex('#0a0e26'); for (let i = 0; i < B.length; i++) B[i] = f_mezcla(B[i], osc, k); }
    for (let j = -r - 14; j <= r + 14; j++) for (let i = -r - 14; i <= r + 14; i++) { const d = Math.hypot(i, j); if (d > r && d < r + 14 && f_umbral(sx + i, sy + j) < (1 - (d - r) / 14) ** 2 * (1 - k * 0.6)) f_tinte(R, sx + i, sy + j, FA.luz, 0.45); }
    if (k > 0.25) for (let n = 0; n < 60; n++) { const x = Math.round(h(n, 1, 440) * 319), y = Math.round(h(n, 2, 440) * 104); if (x > 266 && y < 52) continue; if (h(n, 4, 440) < (k - 0.25) * 1.6) pset(x, y, Math.sin(t * 3 + n) > 0 ? FA.estrellaL : FA.estrella); }
    if (e > 0.96) for (let a = 0; a < Math.PI * 2; a += 0.05) { const L = 3 + Math.round((Math.sin(a * 5 + t) + Math.sin(a * 9 - t * 0.6) + 2) * 2.2); for (let d = 0; d < L; d++) { const xx = Math.round(sx + Math.cos(a) * (r + 1 + d)), yy = Math.round(sy + Math.sin(a) * (r + 1 + d)); if (f_umbral(xx, yy) < 1 - d / L) pset(xx, yy, d < 2 ? FA.solL : hex('#d8e0f0')); } }
    disco(sx, sy, r + 1, hex('#fff6c0')); disco(sx, sy, r, FA.sol); disco(sx - 2, sy - 2, 3, FA.solL);
    if (e > 0) { const mx = Math.round(sx + (1 - e) * (2 * r + 3)), my = Math.round(sy - (1 - e) * 3); disco(mx, my, r, hex('#0c0e1a')); }
    if (e > 0.96) { pset(sx - r + 1, sy + 2, FA.blanco); pset(sx - r + 1, sy + 3, FA.solL); }   // el anillo de diamante
    res = { luna: [sx, sy], sol: [sx, sy] };
  } else {
    R.copiar(f_capa(R, 'cieloF-noche', () => f_cieloFijo(R, false)));
    // las estrellas que titilan y una fugaz de vez en cuando
    for (let n = 0; n < 50; n++) { const x = Math.round(h(n, 1, 440) * 319), y = Math.round(h(n, 2, 440) ** 1.15 * 106); if (x > 266 && y < 52) continue; const tw = Math.sin(t * (1.5 + h(n, 5, 440) * 2.5) + n * 1.7); if (tw > 0.6) { pset(x, y, FA.estrellaL); if (n % 7 === 0) { pset(x - 1, y, FA.estrella); pset(x + 1, y, FA.estrella); pset(x, y - 1, FA.estrella); pset(x, y + 1, FA.estrella); } } else if (tw < -0.7) pset(x, y, FA.lactea); }
    { const kk = Math.floor(t / 6.5), u = (t % 6.5) / 0.6; if (u < 1) { const x0 = 40 + h(kk, 1, 448) * 170, y0 = 10 + h(kk, 2, 448) * 40; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 50 - i * 1.7), y = Math.round(y0 + u * 18 - i * 0.6); if (!(x > 266 && y < 52)) pset(x, y, i < 2 ? FA.estrellaL : FA.estrella); } } }
    // la luna que cruza en su arco (con prisa: se adelanta y se atrasa)
    let u = o.luna ?? 0.45; if (o.prisa) u += Math.sin(t * 1.7) * 0.05 + Math.sin(t * 0.9) * 0.03; u = Math.max(0, Math.min(1, u));
    const lx = Math.round(48 + u * 196), ly = Math.round(78 - Math.sin(u * Math.PI) * 46), r = 9, cl = f_mezcla(FA.luna, FA.lunaR, rojo), cs = f_mezcla(FA.lunaS, FA.lunaRS, rojo), hal = rojo > 0.5 ? hex('#8a3a2a') : FA.luna;
    for (let j = -r - 8; j <= r + 8; j++) for (let i = -r - 8; i <= r + 8; i++) { const d = Math.hypot(i, j); if (d > r && d < r + 8 && f_umbral(lx + i, ly + j) < (1 - (d - r) / 8) ** 1.5 * 0.7) f_tinte(R, lx + i, ly + j, hal, 0.22); }
    disco(lx, ly, r, cl); for (const [cx, cy, cr] of [[-3, -2, 2], [3, 3, 2], [2, -4, 1], [-4, 4, 1], [5, -1, 1]]) disco(lx + cx, ly + cy, cr, cs);
    for (let a = 0.3; a < 2.6; a += 0.08) pset(Math.round(lx + Math.cos(a) * r), Math.round(ly + Math.sin(a) * r), cs);
    if (rojo > 0.2) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && i + j < -6 && f_umbral(lx + i, ly + j) < 0.5) pset(lx + i, ly + j, f_mezcla(cl, FA.k, 0.3 * rojo));
    // su reflejo en el mar: rayitas que tiemblan
    for (let y = 113; y < 131; y += 2) { const w = 1 + Math.abs(Math.sin(t * 2.3 + y * 1.7)) * 3, c0 = Math.round(lx + Math.sin(t * 2 + y * 0.7) * 2); for (let x = Math.round(c0 - w); x <= c0 + w; x++) if (h(x, y + Math.floor(t * 4), 449) < 0.6) pset(x, y, y < 118 ? cs : f_mezcla(cs, hex('#121a3a'), 0.4)); }
    // una barca de pesca con su farol que se balancea
    { const bx = Math.round(70 + Math.sin(t * 0.15) * 20), by = 124 + Math.round(Math.sin(t * 1.4)); rect(bx - 6, by, bx + 6, by + 1, hex('#0a0c18')); pset(bx - 7, by - 1, hex('#0a0c18')); pset(bx + 7, by - 1, hex('#0a0c18')); linea(bx + 3, by - 6, bx + 3, by - 1, hex('#0a0c18')); pset(bx + 4, by - 5, Math.sin(t * 5) > -0.3 ? FA.brasaL : FA.brasa); f_figurita(R, bx - 3, by - 1, t, hex('#1a1e30'), { piel: hex('#2a2a3a'), pelo: hex('#14141e') }); for (let i = -1; i <= 1; i++) if (Math.sin(t * 4 + i) > 0) pset(bx + 4 + i, by + 3 + Math.abs(i), FA.brasa); }
    f_cieloVivo(R, t, false);
    // la lechuza que cruza de vez en cuando
    { const uu = (t % 11) / 11; if (uu < 0.5) { const v = uu / 0.5, x = Math.round(330 - v * 360), y = Math.round(84 + Math.sin(v * 6) * 4), a = Math.sin(t * 9) > 0; rect(x - 1, y - 1, x + 1, y + 1, hex('#5a4a3a')); pset(x - 1, y - 1, hex('#c8a870')); for (const sg of [-1, 1]) { pset(x + sg * 2, y - (a ? 1 : -1), hex('#5a4a3a')); pset(x + sg * 3, y - (a ? 2 : -1), hex('#5a4a3a')); } } }
    res = { luna: [lx, ly] };
  }
  // las luces del pueblo y las lucernas del templo, que tiemblan (de noche o cuando el eclipse ya ha oscurecido)
  if (!solar || k > 0.35) { for (let n = 0; n < 14; n++) { const x = 150 + n * 11 + Math.round(h(n, 1, 445) * 4), y = 128 - Math.round(h(n, 2, 445) * 6); if (Math.sin(t * 0.6 + n * 2.3) > -0.5) pset(x - 1, y - 2, Math.sin(t * 5 + n) > 0 ? FA.brasaL : FA.brasa); }
    for (const dx of [-12, 0, 12]) pset(232 + dx, 106, Math.sin(t * 6 + dx) > -0.2 ? FA.brasaL : FA.brasa); }
  return { ...res, armilar: [168, 128], templo: [232, 92] };
}

// lo que se mueve en la terraza (antes del oscurecimiento del eclipse, para que se apague igual): la esfera armilar, la
// lucerna de la balaustrada con su halo y el ciprés que se mece; dia: colores de día
function f_cieloVivo(R, t, dia) {
  const { pset, rect, disco } = R;
  { const x = 168, y = 126, a = t * 0.5, cb = dia ? FA.bro : hex('#a8884a'), cbL = dia ? FA.broL : hex('#d8b870');
    for (let s = 0; s < Math.PI * 2; s += 0.06) { pset(Math.round(x + Math.cos(s) * 9), Math.round(y + Math.sin(s) * 9), FA.k); pset(Math.round(x + Math.cos(s) * 8), Math.round(y + Math.sin(s) * 8), cb);
      pset(Math.round(x + Math.cos(s) * 8 * Math.cos(a)), Math.round(y + Math.sin(s) * 8), Math.sin(s) < 0 ? cbL : cb);
      pset(Math.round(x + Math.cos(s) * 8), Math.round(y + Math.sin(s) * 3 + Math.cos(s) * 3), Math.cos(s) > 0 ? cbL : cb); }
    disco(x, y, 2, dia ? FA.mar : hex('#3a5a8a')); pset(x - 1, y - 1, FA.aguaL); }
  { const x = 60, y = 131; rect(x - 3, y - 1, x + 3, y + 1, FA.k); rect(x - 2, y - 1, x + 2, y, FA.arc); const f = Math.round(Math.sin(t * 12) * 0.6); pset(x + 3 + f, y - 3, FA.brasaL); pset(x + 3, y - 2, FA.brasa);
    if (!dia) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 2 && d < 9 && f_umbral(x + i, y + j) < 1 - d / 9) f_tinte(R, x + 3 + i, y - 3 + j, FA.luzT, 0.3); } }
  { const x = 304, m = Math.sin(t * 0.9) * 1.5; for (let y = 54; y < 150; y++) { const u = (y - 54) / 96, w = Math.round(2 + Math.sin(Math.min(1, u * 1.3) * Math.PI * 0.55) * 9), dx = Math.round(m * (1 - u)); for (let i = -w; i <= w; i++) pset(x + i + dx, y, Math.abs(i) === w ? FA.k : (i + y) % 5 === 0 ? (dia ? FA.pinoL : hex('#1a2a2a')) : i > w / 2 ? (dia ? FA.pinoS : hex('#0a1414')) : (dia ? FA.pino : hex('#142020'))); } rect(302, 140, 305, 150, FA.madD); }
}

// delante de la terraza: nada tapa al astrónomo; solo una maceta de laurel en la esquina de abajo a la derecha (con el
// eclipse de Sol se apaga como el resto)
function f_cieloDelante(R, t, o) {
  const { rect, disco, pset } = R, k = f_eclipseK(o), dia = k >= 0, C2 = (c) => k > 0 ? f_mezcla(c, hex('#0a0e26'), k) : c;
  rect(282, 166, 300, 180, FA.k); rect(283, 167, 299, 180, dia ? C2(FA.teja) : hex('#3a2a34')); rect(283, 167, 299, 168, dia ? C2(FA.tejaL) : hex('#5a3a44'));
  for (let n = 0; n < 7; n++) { const m = Math.round(Math.sin(t * 1.3 + n) * 1); disco(284 + n * 2.5 + m, 160 - (n % 3) * 3, 3, dia ? C2(FA.hojaS) : hex('#14241a')); pset(284 + n * 2.5 + m, 158 - (n % 3) * 3, dia ? C2(FA.hojaL) : hex('#2a4a34')); }
}

// lo fijo de Olimpia, transparente donde va el cielo: la colina del Cronio, el templo de Zeus y los tesoros, el talud con
// su público (el público se mueve aparte), la tribuna de los jueces, la pista, la línea de salida, el canal y el túnel
function f_olimpiaFijo(R) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf;
  // la colina del Cronio, con pinos
  for (let x = 0; x < 320; x++) { const yc = Math.round(48 + Math.max(0, (x - 70) / 90) ** 2 * 26 - Math.sin(x * 0.05) * 3); for (let y = Math.min(yc, 84); y < 84; y++) B[y * 320 + x] = y === yc ? FA.pinoL : h(x >> 1, y >> 1, 450) < 0.35 ? FA.pinoS : FA.pino; }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 451) * 150), yb = Math.round(54 + (x / 150) * 20 + h(k, 2, 451) * 10); for (let j = 0; j < 8; j++) { const w = Math.round((8 - j) / 3); for (let i = -w; i <= w; i++) pset(x + i, yb - j, j === 7 ? FA.pinoL : i > 0 ? FA.pinoS : FA.pinoL); } pset(x, yb + 1, FA.madD); }
  // la lejanía de la derecha (colinas azuladas)
  for (let x = 160; x < 320; x++) { const yc = Math.round(66 - Math.sin((x - 160) / 50) * 6 - Math.sin(x * 0.13) * 1.5); for (let y = yc; y < 84; y++) if (B[y * 320 + x] === F_VACIO) B[y * 320 + x] = (x + y) % 6 === 0 ? hex('#7a96a8') : hex('#8aa6b4'); }
  // el templo de Zeus: el basamento de gradas, las columnas dóricas, el entablamento con triglifos y el frontón
  { const x0 = 128, x1 = 210, yb = 82;
    for (let g = 0; g < 3; g++) { rect(x0 - 6 + g * 2, yb - g * 2 - 1, x1 + 6 - g * 2, yb - g * 2, FA.k); rect(x0 - 5 + g * 2, yb - g * 2 - 1, x1 + 5 - g * 2, yb - g * 2 - 1, FA.calL); }
    rect(x0, 56, x1, yb - 6, hex('#8a7a62'));   // la cella en sombra
    for (let x = x0; x <= x1; x += 6) { rect(x, 56, x + 3, yb - 6, FA.k); rect(x + 1, 56, x + 2, yb - 6, FA.cal); pset(x + 3, 60, FA.calS); for (let y = 57; y < yb - 6; y += 3) pset(x + 2, y, FA.calS); rect(x - 1, 55, x + 4, 56, FA.calS); }
    rect(x0 - 3, 50, x1 + 3, 55, FA.k); rect(x0 - 2, 51, x1 + 2, 52, FA.cal); for (let x = x0; x <= x1; x += 4) { rect(x, 53, x + 1, 54, hex('#4a6aa0')); rect(x + 2, 53, x + 3, 54, FA.calS); }   // triglifos pintados
    poligono([[x0 - 5, 50], [(x0 + x1) / 2, 40], [x1 + 5, 50]], FA.k); poligono([[x0 - 1, 49], [(x0 + x1) / 2, 42], [x1 + 1, 49]], FA.cal); poligono([[x0 + 10, 49], [(x0 + x1) / 2, 44], [x1 - 10, 49]], hex('#c86a4a'));
    for (let k = 0; k < 7; k++) { const fx = x0 + 18 + k * 7; rect(fx, 46, fx + 1, 49, FA.calL); pset(fx, 45, FA.calL); }   // las figuritas del frontón
    disco((x0 + x1) / 2, 39, 1, FA.broL); pset(x0 - 5, 49, FA.broL); pset(x1 + 5, 49, FA.broL); }
  // los tesoros pequeños a la izquierda, en la terraza al pie del Cronio
  for (const [x, w] of [[30, 14], [56, 12], [80, 14], [104, 10]]) { rect(x - w / 2 - 1, 70, x + w / 2 + 1, 82, FA.k); rect(x - w / 2, 71, x + w / 2, 81, FA.cal); for (let i = -w / 2 + 1; i < w / 2; i += 3) rect(x + i, 73, x + i, 81, FA.calS); poligono([[x - w / 2 - 2, 70], [x, 65], [x + w / 2 + 2, 70]], FA.k); poligono([[x - w / 2, 69], [x, 66], [x + w / 2, 69]], FA.calL); }
  // los olivos del Altis
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 452) * 319), y = 82 + Math.round(h(k, 2, 452) * 4); if (x > 124 && x < 214) continue; rect(x, y - 3, x, y + 1, FA.madD); disco(x, y - 5, 3 + (k % 2), FA.olivS); disco(x - 1, y - 6, 2 + (k % 2), FA.oliv); pset(x - 1, y - 8, FA.olivL); }
  // el talud de enfrente, de hierba, con el público (se pinta aparte) y la tribuna de piedra de los jueces
  for (let y = 84; y < 108; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 84 ? FA.hierbaS : h(x >> 1, y, 453) < 0.2 ? FA.hierbaS : h(x, y, 454) < 0.08 ? FA.hierbaL : (y > 104 ? FA.hierbaS : FA.hierba);
  { const x = 170; rect(x - 20, 92, x + 20, 106, FA.k); rect(x - 19, 93, x + 19, 105, FA.marmS); for (let y = 95; y < 106; y += 3) rect(x - 19, y, x + 19, y, FA.marmD); rect(x - 19, 93, x + 19, 93, FA.marm); }
  // la pista: tierra apisonada con los surcos del rastrillo, huellas y matices
  for (let y = 108; y < 167; y++) for (let x = 0; x < 320; x++) { const surco = (y % 6 === 0 && h(x >> 3, y, 455) < 0.6), n = h(x >> 2, y >> 1, 456); let c = surco ? FA.tierraS : n < 0.18 ? FA.tierraS : n > 0.9 ? FA.tierraL : FA.tierra; if (h(x, y, 457) < 0.03) c = FA.tierraD; if (y < 111) c = f_mezcla(c, FA.hierbaS, 0.4); B[y * 320 + x] = c; }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 458) * 300) + 10, y = 116 + Math.round(h(k, 2, 458) * 44); pset(x, y, FA.tierraD); pset(x + 3, y + 1, FA.tierraD); }   // huellas
  for (const y of [117, 127, 139, 153]) for (let x = 0; x < 320; x++) if ((x + y) % 7 < 5) pset(x, y, f_mezcla(FA.tierra, FA.tierraL, 0.6));   // las calles marcadas con cal
  for (let y = 109; y < 112; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 459) < 0.5) pset(x, y, FA.tierraS);   // el borde pisado de la pista
  // en el borde de enfrente: un trípode de bronce (el premio), una pila de agua, ánforas y un poste de la meta
  { const x = 236, y = 111; for (const dx of [-4, 0, 4]) R.linea(x + dx, y, x, y - 8, FA.broS); for (let i = -5; i <= 5; i++) { pset(x + i, y - 9, FA.bro); pset(x + i, y - 8, FA.broS); } pset(x - 3, y - 10, FA.broL); pset(x + 3, y - 10, FA.broL); }
  { const x = 120, y = 111; rect(x - 6, y - 4, x + 6, y, FA.k); rect(x - 5, y - 4, x + 5, y - 1, FA.marmS); rect(x - 5, y - 4, x + 5, y - 4, FA.marm); rect(x - 4, y - 3, x + 4, y - 3, FA.agua); }
  for (const x of [96, 101]) { for (let j = 0; j < 8; j++) { const w = j < 2 ? 1 : j < 6 ? 2 : 1; for (let i = -w; i <= w; i++) pset(x + i, 111 - j, Math.abs(i) === w ? FA.k : FA.teja); } }
  // en nuestro borde: un disco de bronce, unas halteras de piedra y un jarro
  { const x = 150, y = 164; for (let i = -3; i <= 3; i++) { pset(x + i, y, FA.broS); pset(x + i, y - 1, Math.abs(i) < 3 ? FA.bro : FA.broS); } pset(x - 1, y - 1, FA.broL); }
  for (const x of [182, 190]) { rect(x - 2, 161, x + 2, 164, FA.k); rect(x - 1, 162, x + 1, 163, FA.piedraG); pset(x - 1, 162, FA.piedraGL); }
  { const x = 260; rect(x - 2, 158, x + 2, 164, FA.k); rect(x - 1, 159, x + 1, 164, FA.arc); pset(x - 1, 159, FA.arcL); rect(x - 1, 157, x + 1, 157, FA.k); pset(x + 3, 160, FA.k); }
  // la línea de salida: losas en diagonal con dos ranuras y los agujeros de los postes (con sus postes de madera)
  for (let y = 108; y < 167; y++) { const xa = Math.round(52 - (y - 108) * 0.42), w = 4 + Math.round((y - 108) * 0.1); for (let x = xa; x <= xa + w; x++) pset(x, y, x === xa || x === xa + w ? FA.marmD : (x === xa + 1 || x === xa + w - 2) ? FA.marmD : (y % 9 === 0) ? FA.marmS : FA.marm); }
  for (let k = 0; k < 6; k++) { const y = 112 + k * 10, x = Math.round(52 - (y - 108) * 0.42) + 2; rect(x, y - 7 - k, x + 1, y, FA.k); pset(x, y - 7 - k, FA.madL); }
  // la meta del otro extremo, a la derecha
  for (let y = 108; y < 167; y++) { const xa = Math.round(294 + (y - 108) * 0.42), w = 4 + Math.round((y - 108) * 0.1); for (let x = xa; x <= xa + w && x < 320; x++) pset(x, y, x === xa || x === xa + w ? FA.marmD : FA.marm); }
  // el canal de agua de piedra al borde de la pista, con sus pilas
  rect(0, 166, 319, 170, FA.k); rect(0, 167, 319, 167, FA.marm); for (let x = 0; x < 320; x++) { pset(x, 168, FA.agua); pset(x, 169, FA.marmS); } for (let x = 30; x < 320; x += 64) { rect(x, 166, x + 8, 171, FA.k); rect(x + 1, 167, x + 7, 170, FA.agua); }
  // la hierba de nuestro lado
  for (let y = 171; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = h(x, y, 459) < 0.15 ? FA.hierbaL : h(x >> 1, y, 460) < 0.3 ? FA.hierbaS : FA.hierba;
  // el túnel de entrada abovedado en el talud de la izquierda
  { const x = 14; rect(x - 10, 88, x + 10, 108, FA.k); rect(x - 9, 89, x + 9, 108, FA.pieL); for (let y = 92; y < 108; y += 4) rect(x - 9, y, x + 9, y, FA.pieS); for (let y = 94; y <= 108; y++) for (let i = -6; i <= 6; i++) { const dy = y - 100; if (dy >= 0 || i * i + dy * dy <= 36) pset(x + i, y, hex('#2a2018')); } for (let a = Math.PI; a <= Math.PI * 2; a += 0.2) pset(Math.round(x + Math.cos(a) * 7), Math.round(100 + Math.sin(a) * 7), FA.pieS); }
}

// un atleta diminuto que corre (~12 px), con el polvo de sus pies
function f_corredor(R, x, y, t, ropa, k) {
  const { pset, rect } = R, f = Math.floor(t * 10 + k * 1.3) % 4, P = FA.piel;
  const piernas = [[[-2, 0], [2, -1]], [[-1, 0], [1, 0]], [[2, 0], [-2, -1]], [[1, 0], [-1, 0]]][f];
  for (const [dx, dy] of piernas) { pset(x + Math.round(dx / 2), y - 3, P); pset(x + dx, y + dy - 1, P); pset(x + dx, y + dy, FA.madD); }
  rect(x - 1, y - 7, x + 1, y - 4, ropa); pset(x + 2, y - 6 + (f % 2), P); pset(x - 2, y - 5 - (f % 2), P);
  rect(x - 1, y - 10, x + 1, y - 8, P); pset(x + 1, y - 9, FA.k); rect(x - 1, y - 11, x + 1, y - 11, FA.madD); pset(x - 2, y - 10, FA.madD);
  for (let i = 0; i < 3; i++) if (Math.sin(t * 8 + i * 2 + k) > 0) pset(x - 4 - i * 2, y - (i % 2), FA.tierraL);
}

// pinta Olimpia: el cielo con nubes y golondrinas, la capa fija, los olivos que brillan, el público que se mueve, los
// jueces, la carrera (o el calentamiento), el mozo que rastrilla y el agua del canal
function f_olimpia(R, t, o) {
  const { pset, rect, disco } = R;
  f_cieloExt(R, t, 84, 'dia', { sol: [196, 26, 8] });
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 62, cada: 10, v: 46 });
  f_sobre(R, f_capa(R, 'olimpia', () => f_olimpiaFijo(R), true));
  // los olivos se mecen (unas hojas que brillan)
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 452) * 319), y = 82 + Math.round(h(k, 2, 452) * 4); if (x > 124 && x < 214) continue; if (Math.sin(t * 2 + k) > 0.3) pset(x + Math.round(Math.sin(t * 1.5 + k)), y - 7, FA.olivL); }
  // el público del talud: filas de gente diminuta sentada, con túnicas de colores, que se mueve y saluda
  const ropas = [hex('#e8e0d0'), hex('#c86a4a'), hex('#4a6aa0'), hex('#d8b850'), hex('#8a5a8a'), hex('#6a9a6a'), hex('#e8e0d0')];
  for (let fila = 0; fila < 4; fila++) for (let x = 2 + fila * 2; x < 320; x += 5) { if (x > 148 && x < 192) continue; if (x < 26) continue; const k = x * 7 + fila, y = 88 + fila * 5; if (h(k, 1, 461) < 0.25) continue;
    const c = ropas[Math.floor(h(k, 2, 461) * 7)], salta = Math.sin(t * 3 + k) > 0.92 ? 1 : 0; rect(x, y - salta, x + 1, y + 1 - salta, c); pset(x, y - 1 - salta, FA.piel); pset(x + 1, y - 1 - salta, FA.piel); pset(x, y - 2 - salta, FA.madD);
    if (h(k, 3, 461) < 0.12 && Math.sin(t * 6 + k) > 0) pset(x + 2, y - 3, FA.piel); }
  // los jueces de púrpura en su tribuna (uno levanta la vara)
  for (let k = 0; k < 4; k++) { const x = 156 + k * 9; rect(x, 88, x + 2, 92, FA.purpura); pset(x + 2, 89, FA.purpuraL); rect(x, 85, x + 2, 87, FA.piel); rect(x, 84, x + 2, 84, k % 2 ? FA.madD : FA.marmS); pset(x + 1, 83, FA.hojaL); }
  { const v = Math.sin(t * 2) > 0.5; R.linea(160, 88, v ? 163 : 165, v ? 80 : 86, FA.madL); }
  // la carrera: cuatro atletas de izquierda a derecha con su polvo; sin carrera, dos que trotan para calentar
  if (o.carrera != null) { const u = Math.max(0, Math.min(1, o.carrera)); for (let k = 0; k < 4; k++) { const v = [1, 0.94, 0.9, 0.86][(k * 3) % 4], x = Math.round(56 + u * v * 236 + (k % 2) * 4), y = 120 + k * 6; f_corredor(R, x, y, t, [FA.marm, FA.rojoM, FA.azulRL, FA.broL][k], k); } }
  else for (let k = 0; k < 2; k++) { const u = (t * 0.05 + k * 0.5) % 1, d = k ? -1 : 1, x = Math.round(d > 0 ? 70 + u * 200 : 270 - u * 200), y = 116 + k * 5; f_corredor(R, x, y, t * 0.6, k ? FA.marm : FA.rojoM, k); }
  // el mozo que rastrilla el borde de la pista, de un lado a otro
  { const u = (Math.sin(t * 0.25) + 1) / 2, x = Math.round(36 + u * 50), d = Math.cos(t * 0.25) > 0 ? 1 : -1, g = Math.sin(t * 4) > 0 ? 1 : 0; f_figurita(R, x, 113, t, hex('#a89070'), { dir: d, anda: true }); R.linea(x + (d > 0 ? 3 : -1), 107, x + (d > 0 ? 7 + g : -5 - g), 113, FA.madL); R.linea(x + (d > 0 ? 6 + g : -6 - g), 113, x + (d > 0 ? 9 + g : -3 - g), 113, FA.madD); }
  // el agua del canal que brilla
  for (let x = 0; x < 320; x++) if (Math.sin(x * 0.7 - t * 3) > 0.8) pset(x, 168, FA.aguaL);
  return {};
}

// delante de Olimpia: matas de hierba que se mecen en el borde de abajo (por debajo de los pies)
function f_olimpiaDelante(R, t, o) {
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 462) * 319), L = 3 + Math.round(h(k, 2, 462) * 5), m = Math.sin(t * 2 + x * 0.2) * 1.5;
    for (let j = 0; j < L; j++) { const xx = Math.round(x + m * j / L); R.pset(xx, 179 - j, j === L - 1 ? FA.hierbaL : FA.hierbaS); R.pset(xx + 2, 179 - Math.round(j * 0.7), FA.hierba); } }
}

// la proyección del mapa: longitud y latitud a píxeles del pergamino (los lugares y las costas usan la misma)
const f_mx = (lon) => Math.round(14 + (lon - 8) * 10.43), f_my = (lat) => Math.round(10 + (44 - lat) * 10.67);

const F_LUGARES = { roma: [12.5, 41.9], siracusa: [15.3, 37.1], corinto: [22.9, 37.9], atenas: [23.7, 38], anticitera: [23.3, 35.87], rodas: [28.2, 36.4], alejandria: [29.9, 31.2] };

const F_TIERRAS = [
  [[8, 46], [8, 44.4], [9, 44.3], [10, 44], [10.5, 43.3], [11, 42.5], [12, 41.8], [13, 41.2], [14, 40.8], [15, 40.2], [15.6, 40], [15.8, 39.2], [16.1, 38.5], [15.65, 38], [16.1, 37.95], [16.6, 38.4], [17.1, 38.9], [17.2, 39.4], [16.6, 39.8], [16.9, 40.4], [17.5, 40.3], [18.5, 40.1], [18.4, 40.6], [17.2, 40.9], [16, 41.4], [15.2, 41.9], [14.5, 42.3], [13.9, 42.9], [13.5, 43.6], [12.5, 44.2], [12.3, 44.8], [12.2, 45.5], [13, 45.7], [13.7, 46]],
  [[12.4, 37.8], [13.3, 38.2], [14, 38.05], [15.1, 38.2], [15.6, 38.25], [15.1, 37.5], [15.3, 37.1], [15.1, 36.7], [14.3, 36.8], [13.2, 37.5], [12.6, 37.6]],
  [[8.4, 41.1], [9.2, 41.2], [9.8, 40.8], [9.7, 39.2], [9, 39.1], [8.4, 38.9], [8.5, 39.9], [8.2, 40.6]], [[8.6, 42.9], [9.4, 43], [9.5, 42.5], [9.4, 41.6], [9.1, 41.4], [8.7, 41.7], [8.6, 42.2]],
  [[6, 37], [9.8, 37.3], [10.3, 36.9], [11.1, 37.1], [10.5, 36.3], [11.1, 35.2], [10.1, 34.3], [11.1, 33.3], [12.5, 32.8], [15.2, 32.3], [15.8, 31.4], [18.5, 30.3], [19.8, 30.8], [20.1, 31.9], [21, 32.8], [22.5, 32.8], [23.3, 32.2], [25, 31.7], [27, 31.4], [29, 30.9], [30, 31.3], [31, 31.6], [32.3, 31.2], [34.2, 31.3], [34.9, 32.8], [35.5, 34], [35.9, 35.3], [35.9, 36.4], [36.2, 36.9], [38, 36.9], [38, 26], [6, 26]],
  [[13.7, 46], [13.7, 45.6], [14.5, 45.2], [15, 44.5], [16, 43.5], [17.5, 43], [18.5, 42.4], [19.4, 41.8], [19.5, 41], [19.4, 40.3], [20, 39.7], [20.7, 39], [21.1, 38.4], [21.5, 38.3], [22.5, 38.2], [22.95, 37.98], [22.4, 38.1], [21.7, 38.2], [21.3, 37.9], [21.1, 37.6], [21.6, 37.1], [21.7, 36.8], [22.1, 37], [22.4, 36.5], [22.6, 36.8], [23, 36.5], [23.2, 36.4], [22.9, 37.2], [23.2, 37.5], [23.05, 37.85], [23.5, 38], [24, 37.65], [24.1, 38.2], [23.6, 38.4], [22.8, 38.85], [23.3, 39.2], [22.9, 39.6], [22.6, 40.1], [22.9, 40.6], [23.8, 40.2], [24.4, 40.9], [25.5, 40.9], [26.1, 40.6], [26.2, 40.9], [27.3, 40.6], [28, 41], [29, 41.2], [28, 41.6], [27.8, 42.5], [28, 43.5], [28.6, 44.5], [28.6, 46]],
  [[26.2, 40.05], [26.7, 40.4], [27.5, 40.35], [29, 40.4], [29.9, 40.7], [29.2, 41.2], [31, 41.2], [38, 41.5], [38, 36.9], [36.2, 36.9], [35, 36.6], [34, 36.3], [32.5, 36.1], [31, 36.8], [30.5, 36.4], [29.6, 36.2], [28.3, 36.8], [27.4, 37], [27.3, 37.6], [26.4, 38.3], [26.9, 38.6], [26.7, 39.3], [26.2, 39.5]],
  [[23.5, 35.6], [24.2, 35.55], [25, 35.4], [25.8, 35.3], [26.3, 35.2], [26.2, 35], [25, 34.95], [24.2, 35.2], [23.5, 35.25]],
  [[32.3, 35.1], [33, 35.4], [34, 35.5], [34.6, 35.7], [33.9, 35.2], [33.9, 34.9], [33, 34.6], [32.4, 34.75]],
  [[27.7, 36.2], [28.2, 36.45], [28.25, 36.1], [27.75, 35.9]], [[22.8, 38.9], [23.6, 38.6], [24.5, 38.1], [24.2, 38.3], [23.3, 38.85]],
];

const F_ISLAS = [[25.4, 37.4], [24.9, 37.1], [25.4, 37.05], [25.1, 36.75], [24.4, 37.4], [25.2, 36.4], [26.3, 36.95], [24.7, 36.7], [23.3, 35.87], [23, 36.25], [14.4, 35.9], [26.3, 39.2], [26, 38.4], [26.8, 37.75], [27.2, 36.85], [19.9, 39.6], [20.7, 38.3], [24.5, 38.9]];

const F_RUTA = [[28.2, 36.4], [26.5, 36.1], [24.5, 35.9], [23.3, 35.87], [21.8, 36.2], [19, 37.2], [16.2, 37.9], [15.62, 38.15], [15.3, 39.2], [14.2, 40.4], [12.9, 41.3], [12.5, 41.85]];

const F_PERG = [10, 7, 309, 172];   // el pergamino en la mesa

let f_tierra = null;   // la máscara de tierra del mapa (1 tierra, 0 mar, 2 fuera del pergamino)

// lo fijo del mapa: la mesa de madera, el pergamino con su borde quemado, la tierra y el mar con su línea de costa a
// tinta y el agua sombreada, manchas, montañas, bosques, el Nilo, las ciudades, la rosa de los vientos y las esquinas
function f_mapaFijo(R) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf, [px0, py0, px1, py1] = F_PERG;
  // la mesa de madera con vetas
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.7 + Math.sin(x * 0.03 + y * 0.1) * 3) * 0.5 + h(x >> 3, y, 463) * 0.5; B[y * 320 + x] = (y % 15 === 0) ? FA.madD : v > 0.7 ? FA.madL : v < 0.2 ? FA.madS : FA.mad; }
  // la sombra del pergamino sobre la mesa
  for (let y = py0 + 3; y <= py1 + 3; y++) for (let x = px0 + 3; x <= px1 + 3; x++) if (f_umbral(x, y) < 0.7) B[y * 320 + x] = f_mezcla(B[y * 320 + x], FA.k, 0.4);
  // la tierra y el mar, a la misma proyección que los lugares
  const tmp = R.nuevo(), prev = R.usar(tmp); for (const p of F_TIERRAS) poligono(p.map(([a, b]) => [f_mx(a), f_my(b)]), 1); for (const [a, b] of F_ISLAS) disco(f_mx(a), f_my(b), 1, 1); R.usar(prev);
  f_tierra = new Uint8Array(57600);
  const borde = (x, y) => { const e = Math.min(x - px0, px1 - x, y - py0, py1 - y); return e + (h(x >> 1, y >> 1, 464) - 0.5) * 3; };
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, e = borde(x, y); if (e < 0) { f_tierra[i] = 2; continue; } f_tierra[i] = tmp[i] === 1 ? 1 : 0; }
  for (let y = py0 - 2; y <= py1 + 2; y++) for (let x = px0 - 2; x <= px1 + 2; x++) { if (y < 0 || y > 179 || x < 0 || x > 319) continue; const i = y * 320 + x; if (f_tierra[i] === 2) continue; const e = borde(x, y), tierra = f_tierra[i] === 1;
    // la distancia a la costa (para el sombreado del agua y la línea de tinta)
    let costa = false, cerca = 0; if (!tierra) for (let d = 1; d <= 4 && !cerca; d++) for (const [dx, dy] of [[d, 0], [-d, 0], [0, d], [0, -d]]) if (f_tierra[(y + dy) * 320 + x + dx] === 1) { cerca = d; break; }
    if (tierra) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (f_tierra[(y + dy) * 320 + x + dx] === 0) costa = true;
    const n = h(x >> 2, y >> 2, 465) * 0.6 + h(x, y, 466) * 0.4;
    let c = tierra ? (n < 0.15 ? FA.pergaminoS : n > 0.88 ? FA.pergaminoL : FA.pergamino) : (cerca === 1 ? FA.marMapaL : cerca === 2 && (x + y) % 2 ? FA.marMapaL : n < 0.12 ? FA.marMapaS : FA.marMapa);
    if (costa) c = FA.tinta;
    if (e < 5) c = f_mezcla(c, FA.pergaminoD, (5 - e) / 6);   // el borde quemado y gastado
    if (e < 1.5) c = FA.tintaL;
    B[i] = c; }
  // manchas de humedad y una arruga
  for (let k = 0; k < 6; k++) { const cx = px0 + h(k, 1, 467) * (px1 - px0), cy = py0 + h(k, 2, 467) * (py1 - py0), r = 6 + h(k, 3, 467) * 10; for (let y = Math.round(cy - r); y <= cy + r; y++) for (let x = Math.round(cx - r); x <= cx + r; x++) { if (y < 0 || y > 179 || x < 0 || x > 319 || f_tierra[y * 320 + x] === 2) continue; const d = Math.hypot(x - cx, y - cy) / r; if (d < 1 && f_umbral(x, y) < 0.3 * (1 - d)) B[y * 320 + x] = f_mezcla(B[y * 320 + x], FA.pergaminoD, 0.15); } }
  for (let y = py0; y <= py1; y++) { const x = Math.round(150 + Math.sin(y * 0.05) * 3); if (f_tierra[y * 320 + x] !== 2) B[y * 320 + x] = f_mezcla(B[y * 320 + x], FA.pergaminoD, 0.25); }
  // montañas (picos a tinta) y bosques (puntitos) en tierra; las olas («~») en el mar
  for (let k = 0; k < 120; k++) { const x = px0 + 6 + Math.round(h(k, 1, 468) * (px1 - px0 - 12)), y = py0 + 6 + Math.round(h(k, 2, 468) * (py1 - py0 - 12)), i = y * 320 + x; if (f_tierra[i] !== 1 || f_tierra[i + 3] !== 1 || f_tierra[i - 3] !== 1 || f_tierra[i + 960] !== 1) continue;
    if (k % 3) { pset(x - 2, y + 1, FA.tintaL); pset(x - 1, y, FA.tinta); pset(x, y - 1, FA.tinta); pset(x + 1, y, FA.tintaL); pset(x + 2, y + 1, FA.tintaL); pset(x + 1, y + 1, FA.pergaminoD); } else { pset(x, y, hex('#6a7a4a')); pset(x + 2, y, hex('#6a7a4a')); pset(x + 1, y - 1, hex('#5a6a3a')); } }
  // el Nilo y su delta
  { let x = f_mx(31.25), y = f_my(29); for (let yy = y; yy > f_my(30.4); yy--) pset(x + Math.round(Math.sin(yy * 0.3)), yy, hex('#6a9aa0')); const yd = f_my(30.4); for (const dx of [-5, -2, 2, 5]) linea(x, yd, x + dx, f_my(31.45), hex('#6a9aa0')); }
  // las ciudades: puntitos de tinta con un círculo
  for (const [a, b] of Object.values(F_LUGARES)) { const x = f_mx(a), y = f_my(b); pset(x, y, FA.tinta); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pset(x + dx * 2, y + dy * 2, FA.tintaL); }
  for (const [a, b] of [[14.25, 40.85], [16.9, 41.1], [19.7, 39.6], [27.15, 38.4], [30.7, 36.9], [35.5, 33.9], [10.2, 36.85], [21.7, 37.6], [22.4, 39.6]]) { const x = f_mx(a), y = f_my(b); pset(x, y, FA.tinta); pset(x + 1, y, FA.tintaL); }
  // la rosa de los vientos (sin letras) en el mar, al sur de Grecia
  { const cx = f_mx(18.6), cy = f_my(33.6); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, L = k % 4 === 0 ? 11 : k % 2 === 0 ? 7 : 4; for (let d = 0; d <= L; d++) pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), k % 4 === 0 ? (d > L - 3 ? FA.rojoM : FA.tinta) : FA.tintaL); }
    for (let a = 0; a < Math.PI * 2; a += 0.15) pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), FA.tinta); disco(cx, cy, 1, FA.rojoM); }
  // las esquinas del pergamino un poco levantadas, con su sombra
  for (const [cx, cy, sx, sy] of [[px0, py0, 1, 1], [px1, py0, -1, 1], [px0, py1, 1, -1], [px1, py1, -1, -1]]) for (let j = 0; j < 7; j++) for (let i = 0; i < 7 - j; i++) { const x = cx + sx * i, y = cy + sy * j; if (f_tierra[y * 320 + x] === 2) continue; pset(x, y, i + j > 4 ? FA.pergaminoD : FA.pergaminoL); }
}

// pinta el mapa: la capa fija, las rayitas del agua, los barquitos, el delfín, la ruta con su barco y las marcas
function f_mapa(R, t, o) {
  const { pset, disco, rect } = R;
  R.copiar(f_capa(R, 'mapa', () => f_mapaFijo(R)));
  const mar = (x, y) => f_tierra && f_tierra[(Math.round(y) * 320 + Math.round(x))] === 0;
  // el agua que riela: unas rayitas («~») que se mueven despacio por el mar
  for (let k = 0; k < 70; k++) { const x = Math.round(F_PERG[0] + 8 + ((h(k, 1, 469) * 280 + t * 1.5) % 284)), y = F_PERG[1] + 8 + Math.round(h(k, 2, 469) * 150); if (!mar(x, y) || !mar(x + 4, y) || !mar(x, y + 2)) continue; const f = Math.floor(t * 2 + k) % 2; pset(x, y + f, FA.marMapaS); pset(x + 1, y + 1 - f, FA.marMapaS); pset(x + 2, y + f, FA.marMapaS); pset(x + 3, y + 1 - f, FA.marMapaS); }
  // barquitos que navegan (solo por el mar)
  const barco = (x, y, d, col) => { x = Math.round(x); y = Math.round(y); if (!mar(x, y) || !mar(x + 4 * d, y) || !mar(x - 4 * d, y)) return; for (let i = -3; i <= 3; i++) pset(x + i, y, FA.tinta); pset(x - 2, y + 1, FA.tinta); pset(x + 2, y + 1, FA.tinta); for (let i = -1; i <= 1; i++) pset(x + i + 1, y + 1, FA.tintaL); R.linea(x, y - 5, x, y - 1, FA.tinta); for (let j = 0; j < 4; j++) for (let i = 0; i <= 2; i++) pset(x + i * d, y - 5 + j, j === 0 ? FA.tinta : col); };
  barco(f_mx(18) + Math.sin(t * 0.25) * 10, f_my(35.2), Math.cos(t * 0.25) > 0 ? 1 : -1, FA.pergaminoL);
  barco(f_mx(32) - ((t * 1.2) % 30), f_my(33.2) + Math.sin(t * 0.5), -1, FA.rojoML);
  barco(f_mx(11) + ((t * 1) % 26), f_my(39.5), 1, FA.pergaminoL);
  // un delfín que salta en el mar Jónico
  { const u = (t % 5) / 1.2; if (u < 1) { const x0 = f_mx(18.3), y0 = f_my(38.4); for (let i = 0; i < 6; i++) { const v = u - i * 0.05; if (v < 0 || v > 1) continue; pset(Math.round(x0 + v * 10), Math.round(y0 - Math.sin(v * Math.PI) * 6), i === 0 ? hex('#4a6a7a') : FA.tintaL); } if (u > 0.85) { pset(x0 + 10, y0 + 1, FA.marMapaL); pset(x0 + 11, y0, FA.marMapaL); pset(x0 + 9, y0, FA.marMapaL); } } }
  // la ruta de Rodas a Roma: una línea de puntos que se va dibujando, con el barquito en la punta
  let punta = null;
  if (o.ruta === 'roma') {
    const pts = F_RUTA.map(([a, b]) => [f_mx(a), f_my(b)]), L = []; let total = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); total += d; }
    const hasta = total * Math.max(0, Math.min(1, o.avance ?? 1)); let s = 0;
    for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i]; for (let d = 0; d < L[i - 1]; d += 1) { if (s + d > hasta) break; const x = Math.round(ax + (bx - ax) * d / L[i - 1]), y = Math.round(ay + (by - ay) * d / L[i - 1]); if (Math.floor((s + d - t * 6) / 3) % 2 === 0) { pset(x, y, FA.rojoM); } punta = [x, y]; } s += L[i - 1]; }
    if (punta) { const [x, y] = punta; for (let i = -2; i <= 2; i++) pset(x + i, y + 1, FA.tinta); R.linea(x, y - 4, x, y, FA.tinta); pset(x + 1, y - 3, FA.marmL); pset(x + 1, y - 2, FA.marmL); pset(x + 2, y - 2, FA.marmL); }
  }
  // las marcas que laten sobre los lugares
  const marcas = o.marca == null ? [] : Array.isArray(o.marca) ? o.marca : [o.marca];
  for (const m of marcas) { const L = F_LUGARES[m]; if (!L) continue; const x = f_mx(L[0]), y = f_my(L[1]), p = (t * 1.2) % 1, r = 3 + p * 6;
    for (let a = 0; a < Math.PI * 2; a += 0.12) if (f_umbral(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r)) < 1 - p) pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), FA.rojoML);
    for (let a = 0; a < Math.PI * 2; a += 0.2) { pset(Math.round(x + Math.cos(a) * 3), Math.round(y + Math.sin(a) * 3), FA.rojoM); } disco(x, y, 1, FA.rojoM); pset(x, y, FA.rojoML); }
  const lugares = Object.fromEntries(Object.entries(F_LUGARES).map(([k, [a, b]]) => [k, [f_mx(a), f_my(b)]]));
  return punta ? { ...lugares, barco: punta } : lugares;
}

// delante del mapa: la lucerna en la esquina de abajo a la derecha (con su llama) y el compás abierto en la de la izquierda
function f_mapaDelante(R, t, o) {
  const { rect, pset, disco, linea } = R;
  { const x = 296, y = 168; for (let j = -3; j <= 3; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 3.5) ** 2 < 1) pset(x + i, y + j, j > 1 ? FA.arcS : j < -1 ? FA.arcL : FA.arc); rect(x + 8, y - 2, x + 13, y, FA.k); rect(x + 9, y - 2, x + 12, y - 1, FA.arc); disco(x, y - 1, 2, FA.k); rect(x - 13, y - 1, x - 9, y, FA.arcS);
    const f = Math.round(Math.sin(t * 12) * 0.6); pset(x + 12 + f, y - 4, FA.brasaL); pset(x + 12, y - 3, FA.brasa); pset(x + 12 + f, y - 5, FA.luz);
    for (let j = -10; j <= 6; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 2 && d < 10 && f_umbral(x + 12 + i, y - 4 + j) < 1 - d / 10) f_tinte(R, x + 12 + i, y - 4 + j, FA.luzT, 0.22); } }
  { const x = 30, y = 160; linea(x, y, x - 12, y + 14, FA.k); linea(x + 1, y, x - 11, y + 14, FA.broS); linea(x, y, x + 16, y + 10, FA.k); linea(x, y + 1, x + 16, y + 11, FA.broS); disco(x, y, 2, FA.bro); pset(x - 1, y - 1, FA.broL); }
}

const F_RELOJ = [204, 82, 22];   // la esfera: centro y radio

// lo fijo de la plaza, transparente donde va el cielo: casas de entramado, la torre con la esfera (sin sus manos), el
// portal, el pozo, el puesto y el empedrado
function f_relojFijo(R) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf;
  const casa = (x0, x1, yt, pared, ent) => { // una casa de entramado con su tejado a dos aguas, ventanas con contraventanas y macetas
    const cx = (x0 + x1) / 2, yb = 152;
    for (let y = yt; y < yb; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { let c = x === x0 || x === x1 ? FA.k : h(x, y, 470) < 0.06 ? f_mezcla(pared, FA.k, 0.12) : pared; if (x > x1 - 4) c = f_mezcla(c, FA.k, 0.18); B[y * 320 + x] = c; }
    for (let y = yt; y < yb; y += 14) rect(x0, y, x1, y + 1, ent);   // las vigas del entramado
    for (let x = x0; x <= x1; x += 10) rect(x, yt, x + 1, yb, ent);
    for (let y = yt; y < yb - 14; y += 14) for (let x = x0; x < x1 - 10; x += 20) linea(x, y + 14, x + 10, y, ent);
    poligono([[x0 - 3, yt], [cx, yt - (x1 - x0) * 0.55], [x1 + 3, yt]], FA.k); poligono([[x0 - 1, yt - 1], [cx, yt - (x1 - x0) * 0.55 + 2], [x1 + 1, yt - 1]], FA.teja);
    for (let y = Math.round(yt - (x1 - x0) * 0.55) + 3; y < yt; y += 3) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (B[y * 320 + x] === FA.teja) B[y * 320 + x] = (x + (y % 6 === 0 ? 2 : 0)) % 4 === 0 ? FA.tejaS : FA.tejaJ;
    for (let y = Math.round(yt - (x1 - x0) * 0.55) + 4; y < yt; y += 3) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (B[y * 320 + x] === FA.tejaJ && h(x, y, 471) < 0.3) B[y * 320 + x] = FA.tejaL;
    for (let y = yt + 4; y < yb - 16; y += 14) for (let x = x0 + 4; x < x1 - 8; x += 10) { rect(x, y, x + 5, y + 7, FA.k); rect(x + 1, y + 1, x + 4, y + 6, hex('#3a4a5a')); pset(x + 1, y + 1, hex('#8ab0c8')); rect(x - 2, y, x - 1, y + 7, hex('#3a6a4a')); rect(x + 6, y, x + 7, y + 7, hex('#3a6a4a')); rect(x - 1, y + 8, x + 6, y + 9, FA.madS); pset(x, y + 7, FA.rojoM); pset(x + 3, y + 7, FA.rojoML); pset(x + 5, y + 7, hex('#e8c840')); }
  };
  casa(-4, 40, 70, hex('#e8dcc0'), FA.madS); casa(42, 84, 60, hex('#d8c098'), FA.madD); casa(86, 132, 74, hex('#e0d0b0'), FA.madS); casa(134, 168, 88, hex('#c8b090'), FA.madD);
  casa(240, 276, 82, hex('#e8d8b8'), FA.madS); casa(278, 324, 92, hex('#d8c4a0'), FA.madD);
  // las chimeneas (el humo, aparte)
  for (const [x, y] of [[24, 46], [70, 38], [116, 49]]) { rect(x, y, x + 4, y + 8, FA.k); rect(x + 1, y + 1, x + 3, y + 8, FA.teja); rect(x - 1, y - 1, x + 5, y, FA.k); }
  // el cartel colgado de la herrería (un pictograma: un yunque, sin letras)
  { const x = 128, y = 112; linea(x, y - 6, x + 10, y - 6, FA.k); linea(x + 3, y - 6, x + 3, y - 2, FA.k); linea(x + 9, y - 6, x + 9, y - 2, FA.k); rect(x + 1, y - 2, x + 11, y + 6, FA.k); rect(x + 2, y - 1, x + 10, y + 5, hex('#d8b850')); rect(x + 3, y + 1, x + 9, y + 2, FA.k); rect(x + 5, y + 3, x + 7, y + 4, FA.k); pset(x + 2, y + 1, FA.k); }
  // la torre: piedra con sillares, ventanas góticas, la aguja con su tejado de pizarra y el remate dorado
  const tx0 = 172, tx1 = 236;
  for (let y = 22; y < 152; y++) for (let x = tx0; x <= tx1; x++) { const fila = Math.floor(y / 6), j = (x + (fila % 2) * 7) % 14; let c = x === tx0 || x === tx1 ? FA.k : (y % 6 === 5 || j === 0) ? FA.piedraGS : h(Math.floor((x + (fila % 2) * 7) / 14), fila, 472) < 0.3 ? FA.piedraGL : FA.piedraG; if (x > tx1 - 6) c = f_mezcla(c, FA.k, 0.2); B[y * 320 + x] = c; }
  for (const [x0, x1, y0] of [[tx0 - 3, tx1 + 3, 110], [tx0 - 3, tx1 + 3, 42]]) { rect(x0, y0, x1, y0 + 3, FA.k); rect(x0 + 1, y0, x1 - 1, y0 + 1, FA.piedraGL); }
  // la aguja de pizarra con los pináculos
  poligono([[tx0 - 2, 23], [204, 2], [tx1 + 2, 23]], FA.k); poligono([[tx0 + 1, 22], [204, 5], [tx1 - 1, 22]], hex('#4a5a7a'));
  for (let y = 7; y < 22; y += 3) for (let x = tx0; x <= tx1; x++) if (B[y * 320 + x] === hex('#4a5a7a')) B[y * 320 + x] = (x + y) % 4 === 0 ? hex('#3a4868') : hex('#5a6a8a');
  for (const px of [tx0 + 2, tx1 - 2]) { poligono([[px - 3, 24], [px, 10], [px + 3, 24]], FA.k); poligono([[px - 2, 23], [px, 12], [px + 2, 23]], FA.piedraGL); }
  rect(203, 0, 205, 4, FA.k); pset(204, 1, FA.broL);
  // la campana bajo su arco (el martillo se mueve aparte)
  for (let y = 26; y < 42; y++) for (let x = 192; x <= 216; x++) { const dy = y - 34, dx = x - 204; if (y >= 34 ? Math.abs(dx) <= 10 : dx * dx + dy * dy <= 100) B[y * 320 + x] = hex('#2a2a3a'); }
  // la ventanita de las figuritas
  rect(190, 47, 218, 56, FA.k); rect(191, 48, 217, 55, hex('#2a2030')); rect(189, 56, 219, 57, FA.piedraGL);
  // la esfera: el marco de piedra, el aro de oro con 24 rayitas, el disco azul con la franja del día y la noche
  const [cx, cy, r] = F_RELOJ;
  for (let y = cy - r - 4; y <= cy + r + 4; y++) for (let x = cx - r - 4; x <= cx + r + 4; x++) { const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx); let c = null;
    if (d <= r + 4 && d > r + 2) c = d > r + 3.2 ? FA.k : FA.piedraGL;
    else if (d <= r + 2 && d > r - 3) { const tick = Math.abs(((a / (Math.PI * 2 / 24)) % 1 + 1) % 1 - 0.5) > 0.42; c = d > r + 1 ? FA.broS : tick ? FA.k : d > r - 1 ? FA.broL : FA.bro; }
    else if (d <= r - 3) { const yy = y - cy; c = yy > 4 ? FA.azulRS : yy > 1 ? hex('#8a3a4a') : yy > -2 ? hex('#c86a3a') : FA.azulR; if (yy < -2 && h(x, y, 473) < 0.06) c = FA.broL; if (d > r - 4) c = FA.k; }
    if (c != null) B[y * 320 + x] = c; }
  // el anillo del zodiaco, descentrado hacia arriba, con sus doce marquitas
  { const zx = cx, zy = cy - 4, zr = 12; for (let a = 0; a < Math.PI * 2; a += 0.04) { pset(Math.round(zx + Math.cos(a) * zr), Math.round(zy + Math.sin(a) * zr), FA.broL); pset(Math.round(zx + Math.cos(a) * (zr - 3)), Math.round(zy + Math.sin(a) * (zr - 3)), FA.bro); }
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(zx + Math.cos(a) * (zr - 1.5)), Math.round(zy + Math.sin(a) * (zr - 1.5)), k % 3 ? FA.blanco : FA.rojoML); } }
  // la esfera pequeña del calendario bajo la grande y el portal gótico
  { const c2 = [204, 123, 7]; disco(c2[0], c2[1], c2[2] + 1, FA.k); disco(c2[0], c2[1], c2[2], FA.bro); disco(c2[0], c2[1], c2[2] - 2, FA.azulR); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(c2[0] + Math.cos(a) * (c2[2] - 1)), Math.round(c2[1] + Math.sin(a) * (c2[2] - 1)), FA.k); } }
  for (let y = 132; y < 152; y++) for (let x = 192; x <= 216; x++) { const dy = y - 142, dx = x - 204; if (y >= 142 ? Math.abs(dx) <= 10 : dx * dx * 0.6 + dy * dy <= 100) B[y * 320 + x] = Math.abs(dx) < 1 ? FA.madD : (x + y) % 5 === 0 ? FA.madS : FA.mad; else if (y >= 142 ? Math.abs(dx) <= 12 : dx * dx * 0.6 + dy * dy <= 144) B[y * 320 + x] = FA.piedraGS; }
  pset(201, 144, FA.broL); pset(207, 144, FA.broL);
  // ventanas góticas de la torre
  for (const [x, y] of [[182, 122], [226, 122], [182, 30], [226, 30]]) { rect(x - 2, y - 4, x + 2, y + 6, FA.k); rect(x - 1, y - 3, x + 1, y + 5, hex('#2a3048')); pset(x, y - 5, FA.k); }
  // el puesto del mercado con su toldo a rayas (a la derecha, al fondo) y su mercancía
  { const x0 = 246, x1 = 300; for (let x = x0; x <= x1; x++) for (let y = 120; y < 128; y++) pset(x, y, y === 127 || x === x0 || x === x1 ? FA.k : Math.floor((x - x0) / 5) % 2 ? FA.rojoM : FA.calL); for (let x = x0; x <= x1; x += 5) pset(x + 2, 128, Math.floor((x - x0) / 5) % 2 ? FA.rojoM : FA.calL);
    for (const lx of [x0 + 1, x1 - 1]) rect(lx, 128, lx, 152, FA.madD); rect(x0, 140, x1, 143, FA.k); rect(x0 + 1, 140, x1 - 1, 141, FA.madL);
    for (let k = 0; k < 9; k++) disco(x0 + 5 + k * 6, 138, 2, [FA.rojoM, hex('#e8a040'), FA.hojaL][k % 3]); for (let x = x0 + 2; x < x1; x += 2) pset(x, 139, FA.k); }
  // el pozo de piedra con su tejadillo y el cubo
  { const x = 46; rect(x - 12, 136, x + 12, 152, FA.k); for (let y = 137; y < 152; y++) for (let i = -11; i <= 11; i++) pset(x + i, y, (y - 137) % 5 === 4 || (i + (Math.floor((y - 137) / 5) % 2) * 3) % 6 === 0 ? FA.piedraGS : i > 7 ? FA.piedraGS : FA.piedraG); rect(x - 13, 135, x + 13, 136, FA.piedraGL);
    for (const lx of [x - 11, x + 10]) rect(lx, 112, lx + 1, 135, FA.madD); poligono([[x - 16, 114], [x, 104], [x + 16, 114]], FA.k); poligono([[x - 14, 113], [x, 106], [x + 14, 113]], FA.teja); rect(x - 10, 117, x + 10, 118, FA.madS); }
  // el empedrado de la plaza en perspectiva
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 152) / (2 + (y - 152) * 0.12)), u = (x - 160) / (y - 90) * 9 + (fila % 2) * 0.5, j = ((u % 1) + 1) % 1 < 0.14; let c = j ? FA.piedraGS : h(Math.floor(u), fila, 474) < 0.3 ? FA.piedraGL : h(Math.floor(u), fila, 475) < 0.2 ? hex('#a89a88') : FA.piedraG; if (h(x, y, 476) < 0.04) c = FA.piedraGS; if (y < 155) c = f_mezcla(c, FA.k, 0.25); B[y * 320 + x] = c; }
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) if ((y - 152) % Math.max(2, Math.round(2 + (y - 152) * 0.12)) === 0 && h(x >> 2, y, 477) < 0.7) B[y * 320 + x] = FA.piedraGS;
}

// pinta la plaza: el cielo con vencejos, la capa fija, el humo, las manos de la esfera, el desfile de figuritas, la
// campana, la gente que pasa, las palomas, la gota del pozo y los hitos de los siglos
function f_reloj(R, t, o) {
  const { pset, rect, disco, linea } = R, [cx, cy, r] = F_RELOJ;
  f_cieloExt(R, t, 100, 'dia', { sol: [104, 38, 7], cumulos: 4 });
  for (let k = 0; k < 5; k++) { const a = t * 0.35 + k * 1.3, x = 120 + Math.cos(a) * (30 + k * 6), y = 36 + Math.sin(a * 1.4) * 8 + k * 3; f_pajaro(R, x, y, t, hex('#2a2436'), k); }   // los vencejos
  f_sobre(R, f_capa(R, 'reloj', () => f_relojFijo(R), true));
  // el humo de las chimeneas
  for (const [x, y] of [[26, 45], [72, 37], [118, 48]]) for (let k = 0; k < 6; k++) { const u = ((t * 0.4 + k / 6) % 1), xx = Math.round(x + u * 12 + Math.sin(t + k) * 1.5), yy = Math.round(y - u * 18); const c = u < 0.5 ? hex('#d8d8d8') : hex('#c0c4cc'); if (u < 0.9) { pset(xx, yy, c); pset(xx + 1, yy, c); if (u > 0.3) pset(xx, yy - 1, c); } }
  // las manos de la esfera: la del Sol (con su sol de oro) da la vuelta, y la bolita de la Luna mitad plata y mitad negra
  { const a = t * 0.25 - Math.PI / 2, L = r - 3; linea(cx, cy, Math.round(cx + Math.cos(a) * L), Math.round(cy + Math.sin(a) * L), FA.k); linea(cx + 1, cy, Math.round(cx + 1 + Math.cos(a) * (L - 1)), Math.round(cy + Math.sin(a) * (L - 1)), FA.broL);
    disco(Math.round(cx + Math.cos(a) * (L - 5)), Math.round(cy + Math.sin(a) * (L - 5)), 3, FA.k); disco(Math.round(cx + Math.cos(a) * (L - 5)), Math.round(cy + Math.sin(a) * (L - 5)), 2, FA.broL); pset(Math.round(cx + Math.cos(a) * (L - 5)) - 1, Math.round(cy + Math.sin(a) * (L - 5)) - 1, FA.blanco);
    const b = t * 0.23 - Math.PI / 2 + 2.4, mx = Math.round(cx + Math.cos(b) * (L - 9)), my = Math.round(cy + Math.sin(b) * (L - 9)); linea(cx, cy, mx, my, FA.broS); disco(mx, my, 3, FA.k); const fase = t * 0.6;
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 5) pset(mx + i, my + j, Math.cos(fase) * i + Math.sin(fase) * j > 0 ? FA.marmL : hex('#1a1a2a'));
    disco(cx, cy, 2, FA.k); pset(cx, cy, FA.broL); }
  // las figuritas que desfilan por la ventanita y el martillo que da en la campana
  R.recorte([191, 48, 217, 55]);
  for (let k = 0; k < 4; k++) { const u = ((t * 0.12 + k * 0.25) % 1), x = Math.round(186 + u * 36), c = [FA.rojoM, FA.azulRL, FA.hojaL, FA.broL][k];
    for (let y = 51; y <= 55; y++) for (let i = -1; i <= 1; i++) pset(x + i, y, i === 1 ? f_mezcla(c, FA.k, 0.3) : c); pset(x, 50, FA.piel); pset(x - 1, 50, FA.piel); pset(x, 49, FA.piel); pset(x, 48, FA.broL); }
  R.recorte(null);
  rect(190, 47, 190, 56, FA.k); rect(218, 47, 218, 56, FA.k);
  { const golpe = (t % 4) < 0.25; disco(204, 36, 6, FA.k); disco(204, 36, 5, FA.bro); disco(202, 34, 2, FA.broL); rect(198, 40, 210, 41, FA.broS); const hx = golpe ? 211 : 214; linea(214, 28, hx, 36, FA.k); rect(hx - 1, 36, hx + 1, 38, hex('#6a7080'));
    if (golpe) for (const [dx, dy] of [[-10, -6], [-12, 0], [10, -8], [12, -2]]) pset(204 + dx, 36 + dy, FA.broL); }
  // la gente que pasa por el fondo de la plaza y las palomas que picotean
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, v = 0.022 + k * 0.006, u = ((t * v + k * 0.27) % 1), x = Math.round(d > 0 ? -10 + u * 340 : 330 - u * 340); if (x > 34 && x < 60) continue; f_figurita(R, x, 154, t, [hex('#7a3a3a'), hex('#3a5a7a'), hex('#6a6a3a'), hex('#8a6aa0')][k], { dir: d, anda: true, carga: k === 1 ? hex('#c8a060') : null }); }
  for (let k = 0; k < 5; k++) f_paloma(R, 92 + k * 31 + (k % 2) * 8, 166 + (k % 3) * 4, t, k);
  // el agua del pozo que gotea del cubo
  { const u = (t % 1.8) / 1.8; pset(44, 119 + Math.round(u * 14), FA.aguaL); rect(41, 118, 47, 122, FA.k); rect(42, 118, 46, 121, hex('#6a7080')); linea(44, 117, 44, 109, FA.madD); }
  // los siglos: hitos de piedra que se plantan uno a uno desde la cajita de bronce hasta el pie de la torre
  const hitos = []; for (let k = 0; k < 8; k++) hitos.push([30 + k * 24, 170 - Math.round(Math.sin(k * 0.9) * 2)]);
  if (o.siglos != null) { const s = Math.max(0, Math.min(1, o.siglos));
    { const x = 14, y = 168; rect(x - 6, y - 7, x + 6, y, FA.k); rect(x - 5, y - 6, x + 5, y - 1, FA.mad); rect(x - 5, y - 6, x + 5, y - 6, FA.madL); disco(x, y - 3, 2, FA.bro); pset(x - 1, y - 4, FA.broL); pset(x + 6, y - 4, FA.bro); }
    for (let k = 0; k < hitos.length; k++) { const v = Math.max(0, Math.min(1, s * hitos.length - k)); if (v <= 0) break; const [x, y] = hitos[k], alto = Math.round(v * 7);
      for (let i = 0; i < 6; i++) if (h(i, k, 478) < 0.5 || v >= 1) pset(x - 14 + i * 3, y - 1, FA.piedraGS);
      rect(x - 2, y - alto, x + 2, y, FA.k); if (alto > 1) { rect(x - 1, y - alto + 1, x + 1, y - 1, FA.marm); pset(x - 1, y - alto + 1, FA.marmL); rect(x - 1, y - 3, x + 1, y - 3, FA.marmD); } }
    if (s >= 1) { const p = (t * 2) % 1; pset(204, 160 - Math.round(p * 4), FA.broL); } }
  return { hitos };
}

// delante de la plaza: dos palomas en primer término, abajo a la izquierda y a la derecha (no tapan a nadie)
function f_relojDelante(R, t, o) { f_paloma(R, 22, 178, t, 7); f_paloma(R, 300, 177, t, 8); }

// lo fijo de la azotea babilonia, transparente donde va el cielo: el zigurat, la muralla, la ciudad, el río, nuestra
// azotea con su pretil, las esteras, el banco con las tablillas pequeñas, el atril, el cesto, los cálamos y el gnomon
function f_tablillasFijo(R) {
  const { pset, rect, disco, linea, poligono } = R, B = R.buf;
  const lej = hex('#6a4a5a'), lejS = hex('#523a4a'), lejL = hex('#8a5a5a');
  // el zigurat de siete pisos, con su escalinata y el santuario de arriba
  for (let p = 0; p < 6; p++) { const w = 40 - p * 6, y0 = 108 - p * 8; for (let y = y0 - 8; y < y0; y++) for (let x = 236 - w; x <= 236 + w; x++) B[y * 320 + x] = x > 236 + w - 4 ? lejS : (y === y0 - 8 ? lejL : (x % 4 === 0 ? lejS : lej)); }
  rect(232, 60, 240, 64, lejS); rect(233, 58, 239, 59, lejL); for (let y = 64; y < 108; y++) { pset(235, y, lejL); pset(237, y, lejS); }
  // la muralla almenada con una puerta y torres
  for (let x = 0; x < 320; x++) for (let y = 106; y < 116; y++) B[y * 320 + x] = (y === 106 && x % 6 < 3) ? F_VACIO : y < 108 ? (x % 6 < 3 ? lej : F_VACIO) : (y % 4 === 0 || (x + (y >> 2) * 3) % 8 === 0) ? lejS : lej;
  for (const tx of [40, 120, 300]) { rect(tx - 5, 98, tx + 5, 116, lej); for (let x = tx - 5; x <= tx + 5; x += 3) rect(x, 96, x + 1, 97, lej); rect(tx + 3, 98, tx + 5, 116, lejS); }
  // el Éufrates entre la muralla y la ciudad baja (sus destellos, aparte)
  for (let y = 116; y < 121; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = (x + y * 3) % 9 === 0 ? hex('#c88a6a') : hex('#5a4a6a');
  // las azoteas de la ciudad, de adobe en sombra, con sus puertas oscuras (se encienden aparte)
  for (let k = 0; k < 22; k++) { const x = k * 15 - 4 + Math.round(h(k, 1, 480) * 6), w = 6 + Math.round(h(k, 2, 480) * 5), y = 121 + Math.round(h(k, 3, 480) * 6); rect(x - w, y, x + w, 134, FA.adobeD); rect(x - w, y, x + w, y, FA.adobeS); rect(x + w - 2, y + 1, x + w, 134, hex('#5a3e2a')); rect(x - 1, y + 4, x + 1, y + 8, hex('#2a1a1a')); }
  // las palmeras de la ciudad (sus copas se mecen aparte), los troncos
  for (const [x, y] of [[24, 124], [92, 126], [168, 122], [276, 125]]) for (let j = 0; j < 16; j++) { pset(x + Math.round(j * 0.15), y - j, j % 2 ? FA.madS : FA.madD); }
  // la otra azotea, más cerca, donde está el astrónomo diminuto
  for (let y = 118; y < 134; y++) for (let x = 70; x <= 112; x++) pset(x, y, x === 70 || x === 112 ? FA.k : y === 118 ? FA.adobeL : (y - 118) % 4 === 3 || (x + ((y - 118) >> 2) * 4) % 8 === 0 ? FA.adobeD : x > 106 ? FA.adobeD : FA.adobeS);
  for (let x = 70; x <= 112; x += 4) rect(x, 116, x + 1, 117, FA.adobeS); rect(84, 124, 88, 133, FA.k); rect(85, 125, 87, 133, hex('#3a2418')); rect(96, 121, 104, 124, hex('#6a5a3a')); for (let x = 96; x <= 104; x += 2) pset(x, 120, hex('#8a7a4a'));
  // nuestro pretil de adobe con sus ladrillos
  for (let y = 134; y < 150; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 134) / 4), j = (x + (fila % 2) * 5) % 10; B[y * 320 + x] = y === 134 ? FA.adobeL : (y - 134) % 4 === 3 || j === 0 ? FA.adobeS : h(Math.floor((x + (fila % 2) * 5) / 10), fila, 481) < 0.25 ? FA.adobeL : h(x, y, 482) < 0.05 ? FA.adobeD : FA.adobe; }
  rect(0, 133, 319, 133, FA.k);
  // el suelo de la azotea: barro apisonado con esteras de junco
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 150 ? FA.adobeD : h(x >> 1, y >> 1, 483) < 0.15 ? FA.adobeS : h(x, y, 484) < 0.05 ? FA.adobeL : FA.adobe;
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 488) * 319), y = 152 + Math.round(h(k, 2, 488) * 27); linea(x, y, x + 2 + (k % 3), y + (k % 2), k % 2 ? FA.juncoS : FA.junco); }   // pajas sueltas
  for (let k = 0; k < 7; k++) { let x = Math.round(h(k, 3, 488) * 300), y = 155 + Math.round(h(k, 4, 488) * 20); for (let i = 0; i < 9; i++) { pset(x, y, FA.adobeD); x += 1; y += Math.round(h(i, k, 489) * 2 - 0.7); } }   // grietas del barro
  // las esteras de junco tejidas, con su orla
  for (const [x0, x1, y0, y1] of [[24, 120, 156, 174], [196, 300, 160, 178]]) for (let y = y0; y <= y1; y++) for (let x = Math.round(x0 + (y - y0) * 0.3); x <= x1 + (y - y0) * 0.3; x++) { const lx = x - Math.round((y - y0) * 0.3), bx = Math.floor((lx - x0) / 4), by = Math.floor((y - y0) / 4), hor = (bx + by) % 2 === 0;
    pset(x, y, y === y0 || y === y1 || lx <= x0 + 1 || lx >= x1 - 1 ? FA.juncoS : hor ? ((y - y0) % 4 === 3 ? FA.juncoS : (y % 2 ? FA.junco : hex('#d8bc78'))) : ((lx - x0) % 4 === 3 ? FA.juncoS : (lx % 2 ? FA.junco : hex('#b89850')))); }
  // el banco de adobe con tablillas pequeñas y el atril con la tablilla grande (sus marcas, aparte)
  rect(178, 138, 262, 154, FA.k); for (let y = 139; y < 154; y++) for (let x = 179; x < 262; x++) pset(x, y, y === 139 ? FA.adobeL : (y - 139) % 5 === 4 ? FA.adobeS : x > 256 ? FA.adobeS : FA.adobe);
  for (let k = 0; k < 4; k++) { const x = 184 + k * 9 + (k > 1 ? 34 : 0), y = 134; rect(x, y, x + 6, y + 4, FA.k); rect(x + 1, y + 1, x + 5, y + 3, FA.arcilla); for (let i = x + 1; i < x + 5; i += 2) pset(i, y + 2, FA.arcillaS); pset(x + 1, y + 1, FA.arcillaL); }
  rect(204, 132, 208, 138, FA.k); rect(205, 132, 207, 138, FA.madS);   // el pie del atril
  rect(194, 116, 218, 140, FA.k); rect(195, 117, 217, 139, FA.arcilla); rect(195, 117, 217, 117, FA.arcillaL); rect(217, 117, 217, 139, FA.arcillaS); rect(195, 139, 217, 139, FA.arcillaS);
  // las filas de cuña ya escritas en la tablilla grande (rayitas, nada legible)
  for (let fila = 0; fila < 4; fila++) for (let i = 0; i < 6; i++) { const x = 197 + i * 3 + (fila % 2), y = 119 + fila * 3; if (h(i, fila, 485) < 0.2) continue; pset(x, y, hex('#6a4428')); pset(x + 1, y, FA.arcillaS); pset(x, y + 1, hex('#6a4428')); }
  for (let fila = 0; fila < 6; fila++) rect(196, 121 + fila * 3, 216, 121 + fila * 3, f_mezcla(FA.arcilla, FA.arcillaS, 0.4));
  // el cesto de barro fresco, el jarro con los cálamos y el gnomon con su sombra
  for (let y = 142; y < 156; y++) { const w = 7 - Math.round((y - 142) * 0.15); for (let x = 268 - w; x <= 268 + w; x++) pset(x, y, x === 268 - w || x === 268 + w ? FA.k : (x + y) % 3 === 0 ? FA.juncoS : FA.junco); } disco(268, 142, 5, FA.arcillaS); disco(267, 141, 3, FA.arcilla);
  { const x = 250; for (let y = 128; y < 138; y++) { const w = y < 131 ? 2 : 3; for (let i = -w; i <= w; i++) pset(x + i, y, Math.abs(i) === w ? FA.k : i > 0 ? FA.arcS : FA.arc); } for (const d of [-2, 0, 2]) linea(x + d, 128, x + d * 2, 118, FA.junco); }
  { const x = 132; rect(x - 6, 160, x + 6, 162, FA.k); rect(x - 5, 160, x + 5, 160, FA.madL); rect(x - 5, 163, x - 4, 168, FA.k); rect(x + 4, 163, x + 5, 168, FA.k); }   // un taburete de junco
  for (let j = 0; j < 14; j++) { const u = j / 14, w = Math.round(u < 0.6 ? 3 + Math.sin(u / 0.6 * Math.PI) * 2 : 3 - (u - 0.6) * 4); for (let i = -w; i <= w; i++) pset(170 + i, 166 - j, Math.abs(i) === w ? FA.k : i > 1 ? FA.arcS : i < -1 ? FA.arcL : FA.arc); }   // un cántaro
  R.linea(304, 178, 314, 160, FA.madD); for (let i = 0; i < 5; i++) R.linea(302 + i, 179, 304 + i, 176, FA.juncoS);   // el escobón
  for (let k = 0; k < 8; k++) { const x = 30 + Math.round(h(k, 5, 488) * 260), y = 175 + Math.round(h(k, 6, 488) * 3); pset(x, y, FA.arcS); pset(x + 1, y, FA.arcL); }   // tiestos
  rect(300, 132, 301, 156, FA.k); rect(297, 155, 304, 157, FA.k); pset(300, 132, FA.broL); for (let y = 140; y < 156; y += 4) pset(301, y, FA.adobeL);   // el gnomon y su sombra larga
  for (let i = 0; i < 16; i++) if (f_umbral(285 - i, 157) < 0.7) pset(285 - i + 12, 157, f_mezcla(FA.adobe, FA.k, 0.3));
}

// pinta la azotea babilonia: el cielo de poniente con estrellas, Luna, nubes y vencejos, la capa fija, el perro, el
// río, las puertas que se encienden, las palmeras, el astrónomo lejano, las marcas nuevas y la lucerna
function f_tablillas(R, t, o) {
  const { pset, rect, disco, linea } = R;
  // el cielo de poniente, las primeras estrellas, la Luna creciente y nubes rosas lentas
  f_degradado(R, 0, 319, 0, 116, F_CIELOS.tarde);
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 486) * 319), y = Math.round(h(k, 2, 486) * 44); if (x > 270 && y < 50) continue; if (Math.sin(t * (1.2 + h(k, 3, 486) * 2) + k) > 0.1) pset(x, y, k % 5 ? FA.estrella : FA.estrellaL); }
  { const lx = 126, ly = 40; for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d > 6 && d < 12 && f_umbral(lx + i, ly + j) < (1 - (d - 6) / 6) * 0.6) f_tinte(R, lx + i, ly + j, FA.luna, 0.2); }
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36 && (i - 3) * (i - 3) + (j + 1) * (j + 1) > 26) pset(lx + i, ly + j, i < -4 ? FA.lunaS : FA.luna); }
  for (let k = 0; k < 3; k++) { const x = ((h(k, 4, 486) * 400 + t * (1 + k * 0.6)) % 420) - 60, y = 60 + k * 12; for (let i = 0; i < 40 + k * 10; i++) { const xx = Math.round(x + i); if (h(i >> 2, k, 487) < 0.25 || (xx > 270 && y < 50)) continue; pset(xx, y, k ? hex('#e88a7a') : hex('#c86a7a')); if (i % 3) pset(xx + 2, y + 1, hex('#a85a7a')); if (i % 4 === 0) pset(xx - 1, y - 1, hex('#f8b890')); } }
  for (let k = 0; k < 4; k++) { const a = t * 0.5 + k * 1.6, x = 60 + Math.cos(a) * 40 + k * 18, y = 76 + Math.sin(a * 1.3) * 10; f_pajaro(R, x, y, t, hex('#2a1a2a'), k); }   // los vencejos
  f_sobre(R, f_capa(R, 'tablillas', () => f_tablillasFijo(R), true));
  // el perro que duerme en la azotea (respira y mueve la oreja)
  { const x = 150, y = 172, r = Math.sin(t * 2) > 0 ? 1 : 0, c = hex('#b8905a'), cS = hex('#8a6a3a'); rect(x - 6, y - 3 - r, x + 4, y, FA.k); rect(x - 5, y - 2 - r, x + 3, y, c); rect(x - 5, y, x + 3, y, cS); rect(x + 3, y - 3, x + 7, y, FA.k); rect(x + 4, y - 2, x + 6, y, c); pset(x + 6, y - 1, FA.k);
    pset(x + 4, y - 3 - (Math.sin(t * 0.7) > 0.8 ? 1 : 0), cS); for (let i = 0; i < 4; i++) pset(x - 7 - i, y - Math.round(Math.abs(Math.sin(i * 0.8)) * 1), cS); }
  // el río que brilla y las puertas de la ciudad que se encienden
  for (let x = 0; x < 320; x++) if (Math.sin(x * 0.6 - t * 2 + Math.sin(x * 0.1) * 2) > 0.8) pset(x, 117 + (x % 3), hex('#f0b08a'));
  for (let k = 0; k < 22; k++) { const x = k * 15 - 4 + Math.round(h(k, 1, 480) * 6), y = 121 + Math.round(h(k, 3, 480) * 6); if (x >= 70 && x <= 112) continue; if (Math.sin(t * 0.4 + k * 2.1) > -0.2) { rect(x - 1, y + 5, x + 1, y + 8, Math.sin(t * 6 + k) > 0 ? FA.brasaL : FA.brasa); } }
  // las copas de las palmeras que se mecen
  for (const [x, y] of [[24, 124], [92, 126], [168, 122], [276, 125]]) { const cx = x + 2, cy = y - 16; for (let k = 0; k < 8; k++) { const a = -Math.PI + k * Math.PI / 7 + Math.sin(t * 1.3 + x) * 0.08; for (let d = 1; d < 8; d++) pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d * 0.6 + d * d * 0.06), d > 5 ? hex('#3a4a2a') : hex('#2a3a1e')); } }
  // el astrónomo diminuto de la otra azotea, que señala la Luna
  { const sube = Math.sin(t * 1.5) > -0.3; f_figurita(R, 90, 118, t, hex('#e8dcc0'), { dir: -1, brazo: sube, pelo: hex('#2a1a1a') }); }
  // las marcas nuevas de la tablilla grande: aparecen una a una, y la última brilla un instante
  if (o.apunta != null) { const n = Math.floor(Math.max(0, Math.min(1, o.apunta)) * 12);
    for (let k = 0; k < n; k++) { const fila = 4 + Math.floor(k / 6), i = k % 6, x = 197 + i * 3 + (fila % 2), y = 119 + fila * 3, nueva = k === n - 1 && o.apunta < 1;
      pset(x, y, hex('#4a2a14')); pset(x + 1, y, hex('#6a4428')); pset(x, y + 1, hex('#4a2a14'));
      if (nueva) { const b = (t * 4) % 1 < 0.6; for (const [dx, dy] of [[-1, -1], [2, -1], [-1, 2], [2, 1], [0, -1], [1, 2]]) pset(x + dx, y + dy, b ? FA.blanco : FA.arcillaL); } } }
  { const x = 232, y = 137; rect(x - 4, y - 1, x + 3, y + 1, FA.k); rect(x - 3, y - 1, x + 2, y, FA.arc); const f = Math.round(Math.sin(t * 12) * 0.6); pset(x + 3 + f, y - 3, FA.brasaL); pset(x + 3, y - 2, FA.brasa); pset(x + 3 + f, y - 4, FA.luz);
    for (let j = -10; j <= 8; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d > 2 && d < 10 && f_umbral(x + 3 + i, y - 3 + j) < 1 - d / 10) f_tinte(R, x + 3 + i, y - 3 + j, FA.luzT, 0.25); } }
  return {};
}

// delante de la azotea: unas jarras de barro en la esquina de abajo a la izquierda
function f_tablillasDelante(R, t, o) {
  const { pset } = R;
  for (const [x, alto] of [[8, 20], [22, 14]]) for (let j = 0; j < alto; j++) { const u = j / alto, w = Math.round(u < 0.7 ? 4 + Math.sin(u / 0.7 * Math.PI) * 3 : 3 - (u - 0.7) * 6); for (let i = -w; i <= w; i++) pset(x + i, 180 - j, Math.abs(i) === w ? FA.k : i > w / 3 ? FA.arcS : i < -w / 3 ? FA.arcL : FA.arc); }
}

const F_PINTA = { taller: { general: f_taller, cielo: f_cielo }, olimpia: { general: f_olimpia, mapa: f_mapa }, reloj: { general: f_reloj, tablillas: f_tablillas } };

const F_DELANTE = { 'taller-general': f_tallerDelante, 'taller-cielo': f_cieloDelante, 'olimpia-general': f_olimpiaDelante, 'olimpia-mapa': f_mapaDelante, 'reloj-general': f_relojDelante, 'reloj-tablillas': f_tablillasDelante };

// la trama de Bayer 4 × 4 (0–1) para degradados y luces tramadas
const g_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_b4 = (x, y) => g_B4[((y & 3) << 2) | (x & 3)] / 16;

// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function g_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// los fondos fijos de cada vista: se pintan una vez en su búfer de R.nuevo() y se copian en cada fotograma
const g_capas = new Map();

function g_capa(R, clave, dibuja) {
  let b = g_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); g_capas.set(clave, b); }
  return b;
}

// un rectángulo que respeta el recorte cl (R.rect no lo respeta)
function g_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// degradado vertical tramado entre varios colores (con pset: respeta el recorte)
function g_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, cols[f > g_b4(x, y) ? i + 1 : i]); }
}

// tiñe una zona con col en la proporción a (trama: solo un píxel de cada dos)
function g_tinte(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (trama && ((x + y) & 1)) continue; const c = R.pget(x, y); if (c) R.pset(x, y, g_mezcla(c, col, a)); }
}

// un charco de luz (o de sombra) elíptico, más fuerte en el centro, en tres escalones tramados
function g_charco(R, cx, cy, rx, ry, col, a) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d >= 1) continue;
    const x = cx + i, y = cy + j, k = a * (1 - d); if (k * 1.6 < g_b4(x, y) * 0.5) continue; const c = R.pget(x, y); if (c) R.pset(x, y, g_mezcla(c, col, Math.ceil(k * 3) / 3 * a)); }
}

// tablero de madera de frente (tablas horizontales): juntas, testas a matajunta, vetas claras y oscuras, nudos y el canto
function g_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0, f = 0; y <= y1; y += tabla, f++) {
    if (y + tabla - 1 <= y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let x = x0 + Math.round(h(f, 1, 720 + k) * 60); x < x1; x += 70 + Math.round(h(f, x, 721 + k) * 40)) rect(x, y, x, Math.min(y1, y + tabla - 2), cD);
    for (let g = 0; g < 3; g++) { const gy = y + 1 + Math.round(h(f, g, 722 + k) * (tabla - 3)); let x = x0 - Math.round(h(f, g, 723 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 724 + k) * 30); if (h(x, g, 725 + k) < 0.7 && gy <= y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 2 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 726 + k) * 12); } }
    if (h(f, 9, 727 + k) < 0.5 && y + 5 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 728 + k) * (x1 - x0 - 20)), ny = y + (tabla >> 1) - 1; rect(nx - 3, ny, nx + 3, ny, cS); rect(nx - 1, ny - 1, nx + 1, ny + 1, cS); R.pset(nx, ny, cD); }
  }
}

// una fila de libros sin letras de base yb: lomos de colores con su luz y su sombra, bandas doradas y alguno tumbado
function g_lomos(R, x0, x1, yb, alto, cols, k = 0) {
  const { rect, pset } = R;
  for (let x = x0, i = 0; x < x1; i++) {
    const w = 3 + Math.floor(h(i, k, 730) * 4), hh = Math.round(alto * (0.62 + h(i, k, 731) * 0.38)), c = cols[Math.floor(h(i, k, 732) * cols.length)];
    if (x + w > x1) break;
    if (h(i, k, 733) < 0.12 && x + 12 < x1) {   // un par de libros tumbados, uno sobre otro
      for (let j = 0; j < 2; j++) { const cc = cols[(i + j * 3) % cols.length], y = yb - j * 4; rect(x, y - 3, x + 11, y, C.k); rect(x + 1, y - 2, x + 10, y - 1, cc); rect(x + 1, y - 2, x + 10, y - 2, g_mezcla(cc, C.blanco, 0.3)); rect(x + 9, y - 2, x + 10, y - 1, hex('#efe6cc')); }
      x += 13; continue;
    }
    rect(x, yb - hh, x + w - 1, yb, C.k); rect(x + 1, yb - hh + 1, x + w - 2, yb, c);
    rect(x + 1, yb - hh + 1, x + 1, yb, g_mezcla(c, C.blanco, 0.3)); if (w > 3) rect(x + w - 2, yb - hh + 1, x + w - 2, yb, g_mezcla(c, C.k, 0.3));
    if (h(i, k, 734) < 0.6) { rect(x + 1, yb - hh + 3, x + w - 2, yb - hh + 3, hex('#e8c060')); rect(x + 1, yb - 3, x + w - 2, yb - 3, g_mezcla(c, C.k, 0.4)); }
    if (w > 4 && h(i, k, 735) < 0.5) pset(x + 2, yb - (hh >> 1), hex('#e8c060'));
    x += w;
  }
}

// una chincheta vista de frente: la cabeza de color con su brillo y su sombrita
function g_pin(R, x, y, c, r = 1.6) {
  R.disco(x + 0.9, y + 1.4, r, hex('#3a2a1a')); R.disco(x + 0.5, y + 0.5, r, C.k); R.disco(x + 0.5, y + 0.5, r - 0.6, c); R.pset(x - (r > 2 ? 1 : 0), y - (r > 2 ? 1 : 0), g_mezcla(c, C.blanco, 0.7));
}

// una rueda dentada en (cx, cy) de radio r y n dientes, girada ang; cols [borde, base, sombra, luz]; o.carton: las rayas
// del ondulado (giran con la rueda); o.agujeros: cuántos agujeros redondos tiene (se ve lo de detrás); o.diente: alto
function g_rueda(R, cx, cy, r, n, ang, cols, o = {}) {
  const [ck, c, cS, cL] = cols, td = Math.max(1, o.diente ?? Math.round(r * 0.1 + 0.7)), R2 = Math.ceil(r + td + 1), ca = Math.cos(ang), sa = Math.sin(ang);
  const nag = o.agujeros ?? 0, ra = r * 0.17, rh = r * 0.52;
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -R2; j <= R2; j++) for (let i = -R2; i <= R2; i++) {
    const d = Math.hypot(i, j); if (d > r + td + 0.5) continue;
    const a = Math.atan2(j, i) - ang, f = ((a / (2 * Math.PI) * n) % 1 + 1) % 1, tri = 1 - Math.abs(f - 0.5) * 2, borde = r + td * Math.min(1, tri * 1.7);
    if (d > borde + 0.5) continue;
    // los agujeros
    let hueco = false;
    for (let k = 0; k < nag; k++) { const ak = ang + k * 2 * Math.PI / nag + 0.4, dx = i - Math.cos(ak) * rh, dy = j - Math.sin(ak) * rh, dd = Math.hypot(dx, dy); if (dd < ra) { hueco = true; break; } if (dd < ra + 1) { R.pset(cx + i, cy + j, ck); hueco = null; break; } }
    if (hueco) continue; if (hueco === null) continue;
    let col;
    if (d > borde - 0.6) col = ck;
    else {
      const l = (-i - j) / (d + 0.01);
      col = c;
      if (d > r - 1.6) col = l > 0.25 ? cL : l < -0.35 ? cS : c;
      else if (o.carton && r > 6) { const u = i * ca + j * sa; if (((Math.round(u) % 3) + 3) % 3 === 0) col = g_mezcla(c, cS, 0.45); }
      if (Math.abs(d - r * 0.3) < 0.5 && r > 8) col = cS;
      if (d < r * 0.3 && l > 0.5 && r > 8 && d > r * 0.2) col = cL;
    }
    R.pset(cx + i, cy + j, col);
  }
}

const g_CARTON = { c: hex('#c89a5e'), cL: hex('#e0b878'), cS: hex('#a07642'), cD: hex('#7a5630'), dentro: hex('#4a321c'), onda: hex('#8a643a') };

// las cuatro ruedas del mecanismo de cartón: centro (en la cara de 200 × 90), radio, dientes, colores y agujeros
const g_RUEDAS = {
  B: { x: 54, y: 54, r: 31, n: 26, cols: ['#3a2410', '#d8ac6a', '#a8783a', '#f0cc90'], ag: 6 },
  M: { x: 102, y: 29, r: 20, n: 17, cols: ['#2a1608', '#a86a38', '#7a4620', '#d08a50'], ag: 5 },
  S: { x: 131, y: 51, r: 12, n: 10, cols: ['#3a2a10', '#e8d090', '#b8a058', '#fff0b8'], ag: 0 },
  T: { x: 160, y: 41, r: 15, n: 13, cols: ['#2a2a2a', '#b4aea0', '#848070', '#dcd6c8'], ag: 5 },
};
for (const k in g_RUEDAS) g_RUEDAS[k].cols = g_RUEDAS[k].cols.map(hex);

// el estado del mecanismo de cartón en un fotograma, a partir de o.gira, o.atasco y o.final (ver la cabecera de hoy)
function g_estado(t, o) {
  const gi = o.gira ?? 0, at = o.atasco ?? 0, fi = o.final ?? 0;
  let A = gi * 4 * Math.PI + fi * 6 * Math.PI, jx = 0, jy = 0;
  if (at > 0 && at < 0.36) { A += Math.sin(t * 38) * 0.09; jx = Math.round(Math.sin(t * 51) * 0.8); jy = Math.round(Math.cos(t * 43) * 0.6); }
  const rT = g_RUEDAS.T.n, aT = A, aS = -A * rT / g_RUEDAS.S.n + 0.3, aM = A * rT / g_RUEDAS.M.n + 0.1, aB = -A * rT / g_RUEDAS.B.n;
  return { A, aT, aS, aM, aB, jx, jy, mareo: Math.max(0, Math.min(1, o.mareo ?? 0)), fuera: at > 0.3 ? Math.min(1, (at - 0.3) / 0.7) : 0, vuela: fi > 0.2 ? Math.min(1, (fi - 0.2) / 0.8) : 0, lunaAng: -aB * 3 - Math.PI * 0.62 };
}

// EL MECANISMO DE CARTÓN (canon), con el origen en la esquina de arriba a la izquierda de su cara de delante y a escala s
// (1 = el primer plano: la cara mide 200 × 90): la caja de cartón ondulado con sus solapas, el canto ondulado y la cinta;
// las cuatro ruedas de cartón clavadas con chinchetas (la mediana falta si est.fuera); el lápiz que hace de manivela; la
// chincheta dorada del Sol y la Luna de papel en su alambre (si no vuela). Devuelve los puntos que se mueven.
function g_mecanismo(R, X, Y, s, t, est) {
  const { rect, pset, linea, poligono, disco } = R, K = g_CARTON;
  X += est.jx; Y += est.jy;
  const P = (x, y) => [Math.round(X + x * s), Math.round(Y + y * s)], W = Math.round(200 * s), H = Math.round(90 * s), dx = Math.round(14 * s), dy = Math.round(12 * s);
  // la sombra en la mesa, hacia la derecha (la luz viene de la izquierda)
  for (let i = 0; i < Math.round(26 * s); i++) for (let j = 0; j <= Math.max(1, Math.round(3 * s)); j++) { const x = X + W + i - Math.round(4 * s), y = Y + H - j; if (g_b4(x, y) < 0.7 - i / (30 * s)) { const c = R.pget(x, y); if (c) pset(x, y, g_mezcla(c, C.k, 0.3)); } }
  // la solapa de atrás y la de la izquierda, levantadas
  poligono([[X + dx, Y - dy], [X + dx + W, Y - dy], [X + dx + W - Math.round(6 * s), Y - dy - Math.round(16 * s)], [X + dx + Math.round(8 * s), Y - dy - Math.round(14 * s)]], K.cS);
  linea(X + dx + Math.round(8 * s), Y - dy - Math.round(14 * s), X + dx + W - Math.round(6 * s), Y - dy - Math.round(16 * s), K.cL);
  poligono([[X, Y], [X + dx, Y - dy], [X + dx - Math.round(10 * s), Y - dy - Math.round(18 * s)], [X - Math.round(12 * s), Y - Math.round(14 * s)]], K.cL);
  linea(X, Y, X - Math.round(12 * s), Y - Math.round(14 * s), K.cD); linea(X - Math.round(12 * s), Y - Math.round(14 * s), X + dx - Math.round(10 * s), Y - dy - Math.round(18 * s), K.onda);
  // la boca de la caja (oscura por dentro) y el lado derecho en sombra
  poligono([[X, Y], [X + W, Y], [X + W + dx, Y - dy], [X + dx, Y - dy]], K.dentro);
  for (let i = 0; i < W; i += Math.max(2, Math.round(5 * s))) linea(X + dx + i, Y - dy + 1, X + i + 2, Y - 1, hex('#5a3e24'));
  poligono([[X + W, Y], [X + W + dx, Y - dy], [X + W + dx, Y + H - dy], [X + W, Y + H]], K.cS);
  for (let y = Y; y < Y + H; y += Math.max(2, Math.round(4 * s))) linea(X + W + 1, y, X + W + dx - 1, y - dy + 1, g_mezcla(K.cS, K.cD, 0.4));
  // la cara de delante: el papel del cartón con sus rayas de onda muy suaves, manchas y el borde
  rect(X, Y, X + W, Y + H, K.c);
  for (let x = X + 1; x < X + W; x++) { if ((x - X) % Math.max(2, Math.round(4 * s)) === 0) for (let y = Y + 1; y < Y + H; y++) if (g_b4(x, y) < 0.5) pset(x, y, g_mezcla(K.c, K.cS, 0.35)); }
  for (let k = 0; k < Math.round(30 * s); k++) { const x = X + 2 + Math.floor(h(k, 1, 740) * (W - 4)), y = Y + 2 + Math.floor(h(k, 2, 740) * (H - 4)); pset(x, y, h(k, 3, 740) < 0.5 ? K.cS : K.cL); }
  rect(X, Y, X + W, Y, K.cL); rect(X, Y, X, Y + H, K.cL); rect(X, Y + H, X + W, Y + H, K.cD); rect(X + W, Y, X + W, Y + H, K.cD);
  // el canto ondulado del corte de arriba (las ondas del cartón)
  for (let i = 0; i <= W; i++) pset(X + i, Y + 1, (i % Math.max(2, Math.round(3 * s))) ? K.onda : K.cL);
  // la cinta adhesiva en las esquinas (translúcida, con su brillo)
  for (const [cx, cy, w] of [[0, 0, 18], [200, 0, 18], [0, 90, 16], [200, 90, 16]]) { const [px, py] = P(cx, cy), a = Math.round(w * s * 0.5);
    for (let j = -a; j <= a; j++) for (let i = -Math.max(1, Math.round(4 * s)); i <= Math.max(1, Math.round(4 * s)); i++) { const x = px + i + j, y = py + j; const c = R.pget(x, y); if (c) pset(x, y, g_mezcla(c, hex('#f4ecc8'), 0.45)); }
  }
  // los garabatos de lápiz en la cara (cálculos de Atom: rayitas, ruedecitas y flechas, sin letras)
  if (s > 0.5) { const G = hex('#6a5a4a');
    for (const [gx, gy, k] of [[150, 70, 0], [8, 8, 1], [178, 80, 2]]) { let x = X + gx * s, y = Y + gy * s; for (let i = 0; i < 14; i++) { const nx = x + 1.5 * s, ny = Y + (gy + Math.sin(i * 1.9 + k) * 2.2) * s; linea(x, y, nx, ny, G); x = nx; y = ny; } }
    const [ax, ay] = P(176, 66); R.anillo(ax, ay, 5 * s, G); linea(ax - 8 * s, ay + 6 * s, ax - 2 * s, ay + 2 * s, G); linea(ax - 2 * s, ay + 2 * s, ax - 4 * s, ay + 1 * s, G);
  }
  // de cerca: el cerco de café de la taza, la etiqueta de papel pegada con celo con las fases de la Luna dibujadas
  // (cinco circulitos, de nueva a llena) y una flecha de giro a lápiz
  if (s > 0.5) { const [cx, cy] = P(176, 20); R.anillo(cx, cy, 7 * s, g_mezcla(K.c, hex('#6a3a1a'), 0.5)); R.anillo(cx + 0.6, cy + 0.4, 6.4 * s, g_mezcla(K.c, hex('#6a3a1a'), 0.3), 3);
    const [lx, ly] = P(8, 70); rect(lx, ly, lx + 34, ly + 12, hex('#8a7a60')); rect(lx, ly - 1, lx + 33, ly + 11, hex('#f6f0e0')); rect(lx, ly - 1, lx + 33, ly - 1, C.blanco);
    for (let k = 0; k < 5; k++) { const x = lx + 4 + k * 6.5, y = ly + 5; disco(x, y, 2.4, hex('#3a3a44')); disco(x + (k - 2) * 0.9 - (k < 2 ? 0 : 0), y, k === 4 ? 2.4 : 1.6 + k * 0.2, hex('#f6f0e0')); if (k === 0) disco(x, y, 2.4, hex('#3a3a44')); }
    for (const tx of [lx - 3, lx + 30]) for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { const x = tx + i, y = ly + 3 + j - (i >> 1); const c = R.pget(x, y); if (c) pset(x, y, g_mezcla(c, hex('#f4ecc8'), 0.4)); }
    const G = hex('#6a5a4a'); for (let k = 0; k < 18; k++) { const a = -0.6 + k * 0.09, [ax, ay] = P(160, 41); pset(Math.round(ax + Math.cos(a) * 24), Math.round(ay + Math.sin(a) * 24), G); }
    { const [ax, ay] = P(160, 41), a = 1.0; linea(ax + Math.cos(a) * 24, ay + Math.sin(a) * 24, ax + Math.cos(a) * 24 - 3, ay + Math.sin(a) * 24 - 1, G); linea(ax + Math.cos(a) * 24, ay + Math.sin(a) * 24, ax + Math.cos(a) * 24 + 1, ay + Math.sin(a) * 24 - 3, G); } }
  // las ruedas (la grande detrás, la manivela delante); la mediana falta si salió rodando
  const DR = [['B', est.aB], ['M', est.aM], ['S', est.aS], ['T', est.aT]], out = {};
  for (const [k, a] of DR) { const g = g_RUEDAS[k]; if (k === 'M' && est.fuera > 0) continue; const [gx, gy] = P(g.x, g.y);
    // la sombra de la rueda en la cara
    disco(gx + Math.max(1, 2 * s), gy + Math.max(1, 2 * s), g.r * s + 1, g_mezcla(K.c, K.cD, 0.55));
    g_rueda(R, gx, gy, g.r * s, g.n, a, g.cols, { carton: true, agujeros: s > 0.5 ? g.ag : 0, diente: Math.max(1, Math.round(3 * s)) }); }
  // las chinchetas de los ejes (la de la grande, dorada: el Sol de Atom)
  { const [bx, by] = P(54, 54); if (s > 0.5) { R.halo(bx, by, 9 * s, [hex('#f0c868'), hex('#f8dc90')], 0.9); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + est.aB; linea(bx + Math.cos(a) * 5 * s, by + Math.sin(a) * 5 * s, bx + Math.cos(a) * 8 * s, by + Math.sin(a) * 8 * s, hex('#e8a830')); } }
    g_pin(R, bx, by, hex('#f0c040'), Math.max(1.5, 4 * s)); }
  for (const [k, c] of [['M', '#3a8ad8'], ['S', '#e84a4a'], ['T', '#4ab86a']]) { const g = g_RUEDAS[k], [gx, gy] = P(g.x, g.y); if (k === 'M' && est.fuera > 0) { disco(gx + 0.5, gy + 0.5, Math.max(1, 1.5 * s), C.k); } g_pin(R, gx, gy, hex(c), Math.max(1.2, 3 * s)); }
  // el lápiz que hace de manivela: clavado por la punta al eje de la rueda gris; la mano va en el borrador
  { const g = g_RUEDAS.T, [px, py] = P(g.x, g.y), L = 38 * s, a = est.aT - 0.5, ex = px + Math.cos(a) * L, ey = py + Math.sin(a) * L, nx = -Math.sin(a), ny = Math.cos(a), gro = Math.max(1, Math.round(2.2 * s));
    for (let w = -gro; w <= gro; w++) { const c = w < 0 ? hex('#ffe070') : w > 0 ? hex('#c8901a') : hex('#f0c030'); linea(px + Math.cos(a) * 6 * s + nx * w, py + Math.sin(a) * 6 * s + ny * w, ex - Math.cos(a) * 5 * s + nx * w, ey - Math.sin(a) * 5 * s + ny * w, c); }
    for (let w = -gro; w <= gro; w++) linea(px + nx * w * 0.3, py + ny * w * 0.3, px + Math.cos(a) * 6 * s + nx * w, py + Math.sin(a) * 6 * s + ny * w, hex('#ecc898'));
    linea(px, py, px + Math.cos(a) * 2 * s, py + Math.sin(a) * 2 * s, hex('#3a3a3a'));
    for (let w = -gro; w <= gro; w++) { linea(ex - Math.cos(a) * 5 * s + nx * w, ey - Math.sin(a) * 5 * s + ny * w, ex - Math.cos(a) * 3 * s + nx * w, ey - Math.sin(a) * 3 * s + ny * w, w < 0 ? hex('#e8ecf0') : hex('#9aa0aa')); linea(ex - Math.cos(a) * 3 * s + nx * w, ey - Math.sin(a) * 3 * s + ny * w, ex + nx * w, ey + ny * w, w < 0 ? hex('#ffaab4') : hex('#e0707e')); }
    g_pin(R, px, py, hex('#4ab86a'), Math.max(1.2, 3 * s));
    out.manivela = [Math.round(ex), Math.round(ey)]; }
  // el alambre con la Luna de papel, que da la vuelta alrededor del Sol
  { const [bx, by] = P(54, 54), L = 44 * s, lx = bx + Math.cos(est.lunaAng) * L, ly = by + Math.sin(est.lunaAng) * L;
    out.luna = [Math.round(lx), Math.round(ly)];
    if (est.vuela <= 0) { const mw = est.mareo * Math.sin(t * 9) * 2.5 * s, mx = lx + mw, my = ly + est.mareo * Math.cos(t * 7) * 1.5 * s;
      linea(bx, by, mx, my, hex('#8a8a96')); if (s > 0.5) linea(bx + 1, by, mx + 1, my, hex('#d0d0da')); g_lunaPapel(R, mx, my, Math.max(2.5, 8 * s), est.lunaAng * 1.5 + t * 0.3 + est.mareo * t * 14);
      // mareada: tres estrellitas que le dan vueltas por encima
      if (est.mareo > 0.05) for (let k = 0; k < 3; k++) { const a = t * 5 + k * 2.1, sx = Math.round(mx + Math.cos(a) * (8 * s + 4)), sy = Math.round(my - 8 * s - 3 + Math.sin(a) * 2.5);
        const c = k === 1 ? hex('#fff0a0') : hex('#f0c040'); pset(sx, sy, C.blanco); pset(sx - 1, sy, c); pset(sx + 1, sy, c); pset(sx, sy - 1, c); pset(sx, sy + 1, c); } }
    else { const L2 = L * 0.35; linea(bx, by, bx + Math.cos(est.lunaAng) * L2, by + Math.sin(est.lunaAng) * L2, hex('#8a8a96')); } }
  out.centroM = P(g_RUEDAS.M.x, g_RUEDAS.M.y);
  return out;
}

// la Luna de papel: una bolita de papel arrugado mitad pintada de negro (la fase), que gira; r el radio
function g_lunaPapel(R, cx, cy, r, gir) {
  const ca = Math.cos(gir), sa = Math.sin(gir), rr = Math.ceil(r + 1); cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i + 0.5 * 0, j); if (d > r + 0.5) continue;
    if (d > r - 0.7) { R.pset(cx + i, cy + j, C.k); continue; }
    const negro = i * ca + j * sa > 0, l = (-i - j) / (r + 0.01), arr = h(i + Math.round(gir * 2), j, 750) < 0.18;
    let c = negro ? (l > 0.3 ? hex('#4a4a56') : hex('#24242c')) : (l > 0.2 ? hex('#fbf8ee') : l < -0.4 ? hex('#c8c2b0') : hex('#ece6d4'));
    if (arr) c = negro ? hex('#3a3a44') : hex('#d8d0bc');
    R.pset(cx + i, cy + j, c); }
}

// la rueda suelta del atasco: dónde está y cuánto ha girado, según u (0–1); de (x0, y0) salta, cae a ySuelo, rueda hasta
// xFin y allí se mece; out: si sale de cuadro
function g_ruedaSuelta(t, u, x0, y0, xs, ySuelo, xFin, r) {
  if (u < 0.3) { const v = u / 0.3, x = x0 + (xs - x0) * v, y = y0 + (ySuelo - y0) * v * v - 30 * Math.sin(v * Math.PI) * (r / 8 + 0.5); return { x, y, a: -v * 4 }; }
  if (u < 0.88) { const v = (u - 0.3) / 0.58, e = 1 - (1 - v) ** 1.6, x = xs + (xFin - xs) * e, bote = Math.abs(Math.sin(v * Math.PI * 3)) * (1 - v) * 6; return { x, y: ySuelo - bote, a: -4 - (x - xs) / r * -1 }; }
  const v = (u - 0.88) / 0.12, m = Math.sin(t * 5) * 0.12 * (1.2 - v * 0.5);
  return { x: xFin + m * r * 0.4, y: ySuelo, a: -4 - (xFin - xs) / r * -1 + m };
}

// los colores del estudio de día
const g_E = {
  pared: hex('#ecdcc0'), paredS: hex('#d6c2a2'), paredL: hex('#f8ecd6'), paredM: hex('#e2d0b2'),
  zoc: hex('#5a8aaa'), zocS: hex('#3e6a8a'), zocL: hex('#8ab4cc'), zocD: hex('#284866'),
  roble: hex('#c8955a'), robleS: hex('#a8743e'), robleL: hex('#e2b67c'), robleD: hex('#7e5428'),
  nogal: hex('#8a5a34'), nogalS: hex('#6a4224'), nogalL: hex('#b47e4c'), nogalD: hex('#3e2412'),
  corcho: hex('#c8955e'), corchoS: hex('#a8763e'), corchoL: hex('#e2b47e'), lino: hex('#f4ecd8'), linoS: hex('#d8ccb0'), linoL: hex('#fffaf0'),
};

const g_LOMOS = [hex('#c84a3a'), hex('#3a6aa8'), hex('#e0b040'), hex('#4a8a5a'), hex('#e07a3a'), hex('#7a4a98'), hex('#ece4d0'), hex('#2a8a8a'), hex('#8a3a3a')];

// el ESTUDIO de día (ver la cabecera de hoy): el fondo fijo del búfer, el Egeo por la ventana, las cortinas, el globo, el
// olivo, el reloj, las motas, el mecanismo, la rueda suelta y la Luna que vuela
function g_estudio(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(g_capa(R, 'estudio', () => g_estudioFijo(R)));
  const est = g_estado(t, o), V = [209, 29, 259, 97];
  // la Luna que vuela: dentro de la habitación hasta el marco y fuera, ya pequeña, sobre el Egeo
  const vu = est.vuela;
  // el Egeo por la ventana (recortado al hueco)
  g_egeoDia(R, t, V, 70);
  let lunaFuera = null;
  if (vu > 0.62) { const v = (vu - 0.62) / 0.38, x = 236 + v * 10, y = 60 - v * 22 + Math.sin(t * 2) * 0.6; lunaFuera = [x, y];
    R.recorte(V); g_lunaPapel(R, x, y, 3 - v * 1.5, t * 2); if (v > 0.9) R.halo(x, y, 6, [hex('#e8f0f8'), hex('#f4f8fc')], 0.5); R.recorte(null); }
  g_ventanaDia(R, t);
  // el reloj de pared, con el segundero que anda
  { const cx = 190, cy = 28; const a = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(cx, cy, cx + Math.round(Math.cos(a) * 4), cy + Math.round(Math.sin(a) * 4), hex('#c83a3a')); pset(cx, cy, C.k); }
  // el olivo: las hojas plateadas se mecen
  g_olivo(R, t, 80, 104);
  // el globo terráqueo sobre la cómoda, que gira despacio
  g_globo(R, 293, 86, 12, t * 0.25, -1);
  // las motas de polvo en la luz de la ventana
  for (let k = 0; k < 16; k++) { const u = ((t * (0.02 + h(k, 1, 760) * 0.03) + h(k, 2, 760)) % 1), y = Math.round(104 + h(k, 3, 760) * 60 - u * 40), x = Math.round(200 - (y - 104) * 0.9 + h(k, 4, 760) * 40 + Math.sin(t * 0.7 + k) * 3); if (Math.sin(t * 1.3 + k * 2) > -0.3) pset(x, y, hex('#fff6dc')); }
  // el mecanismo de cartón sobre la mesa
  const m = g_mecanismo(R, 112, 99, 0.44, t, est);
  // la rueda suelta: salta de la mesa, cae al suelo, rueda por la alfombra y se queda meciéndose
  let rueda = null;
  if (est.fuera > 0) { const g = g_RUEDAS.M, r = g.r * 0.44, q = g_ruedaSuelta(t, est.fuera, m.centroM[0], m.centroM[1], 92, 171 - r, 46, r);
    if (q.y > 150) for (let i = -Math.round(r); i <= Math.round(r); i++) { const c = R.pget(Math.round(q.x) + i, 172); if (c) pset(Math.round(q.x) + i, 172, g_mezcla(c, C.k, 0.3)); }
    g_rueda(R, q.x, q.y, r, g.n, q.a, g.cols, { carton: true, agujeros: 0, diente: 1 }); g_pin(R, Math.round(q.x), Math.round(q.y), hex('#3a8ad8'), 1.4); rueda = [Math.round(q.x), Math.round(q.y)]; }
  // la Luna que vuela por la habitación hacia la ventana (por delante de todo)
  let luna = m.luna;
  if (vu > 0) {
    if (vu <= 0.62) { const v = vu / 0.62, e = v * v * (3 - 2 * v), [x0, y0] = m.luna, x1 = 236, y1 = 60, cxq = 190, cyq = 52;
      const x = (1 - e) ** 2 * x0 + 2 * (1 - e) * e * cxq + e * e * x1, y = (1 - e) ** 2 * y0 + 2 * (1 - e) * e * cyq + e * e * y1 + Math.sin(t * 9) * 0.6;
      for (let k = 1; k <= 3; k++) { const ee = Math.max(0, e - k * 0.04), sx = (1 - ee) ** 2 * x0 + 2 * (1 - ee) * ee * cxq + ee * ee * x1, sy = (1 - ee) ** 2 * y0 + 2 * (1 - ee) * ee * cyq + ee * ee * y1; pset(Math.round(sx), Math.round(sy), hex('#fff6dc')); }
      g_lunaPapel(R, x, y, 3, t * 5); luna = [Math.round(x), Math.round(y)]; }
    else luna = lunaFuera.map(Math.round);
  }
  return { manivela: m.manivela, luna, rueda };
}

// el fondo fijo del estudio
function g_estudioFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, P = g_E;
  // la pared de cal: el grano, manchas suaves más claras y oscuras, la sombra junto al techo
  for (let y = 0; y < 86; y++) for (let x = 0; x < 320; x++) {
    let c = P.pared; const n = h(x >> 1, y >> 1, 770), m = h(x >> 3, y >> 3, 771);
    if (m > 0.72 && g_b4(x, y) < 0.35) c = P.paredM; if (m < 0.15 && g_b4(x, y) < 0.3) c = P.paredL;
    if (n < 0.06) c = P.paredS; else if (n > 0.95) c = P.paredL;
    if (y < 8 && g_b4(x, y) < (8 - y) / 16) c = P.paredM;
    pset(x, y, c); }
  // el zócalo de tablas pintadas de azul egeo: la moldura, las tablas con su junta y su veta, la luz y el rodapié
  rect(0, 84, 319, 87, P.zocD); rect(0, 84, 319, 84, P.zocL); rect(0, 85, 319, 86, P.zoc);
  for (let x = 0; x < 320; x++) for (let y = 88; y < 114; y++) { const b = x % 9; let c = b === 0 ? P.zocD : b === 1 ? P.zocL : P.zoc; if (b > 1 && h(x, y >> 2, 772) < 0.08) c = P.zocS; if (b > 1 && y < 90) c = P.zocS; pset(x, y, c); }
  rect(0, 112, 319, 118, hex('#e8e0d0')); rect(0, 112, 319, 112, hex('#fffaf0')); rect(0, 117, 319, 118, hex('#b8ae9c'));
  // la tarima de roble y la sombra de contacto junto a la pared
  g_madera(R, 0, 119, 319, 179, P.roble, P.robleS, P.robleL, P.robleD, 3, 7);
  g_tinte(R, 0, 119, 319, 122, C.k, 0.22);
  // la luz del sol que entra por la ventana: en la pared bajo el alféizar y en el suelo, hacia la izquierda
  for (let y = 119; y < 176; y++) { const d = Math.round((y - 119) * 0.95); for (let x = 166 - d; x <= 238 - d; x++) if (((x + y) & 1) === 0 && x >= 0) { const c = R.pget(x, y); R.pset(x, y, g_mezcla(c, hex('#fff2c8'), 0.3 * (1 - (y - 119) / 70))); } }
  // la alfombra de lana con la greca: el campo rojo teja con su trama, la cenefa y los flecos
  { const y0 = 150, y1 = 176, xa = (y) => Math.round(54 - (y - y0) * 0.6), xb = (y) => Math.round(250 + (y - y0) * 0.6);
    for (let y = y0; y <= y1; y++) for (let x = xa(y); x <= xb(y); x++) {
      const bx = x - xa(y), by = y - y0, bd = Math.min(bx, xb(y) - x, by, y1 - y);
      let c = ((x + y * 2) % 4 === 0) ? hex('#a04432') : hex('#b8543c');
      if (bd < 7) { const gx = ((x % 8) + 8) % 8, gy = bd; const GR = ['########', '#.......', '#.####..', '#.#..#..', '#.#.##..', '#.#....#', '#.######']; c = gy < 7 && GR[gy][gx] === '#' ? hex('#eedcb4') : hex('#6a2a1e'); if (bd === 0) c = hex('#4a1a12'); }
      else if (bd < 9) c = hex('#e0a050');
      pset(x, y, c); }
    for (let y = y0; y <= y1; y += 2) { pset(xa(y) - 1, y, hex('#eedcb4')); pset(xa(y) - 2, y, hex('#d8c49a')); pset(xb(y) + 1, y, hex('#eedcb4')); pset(xb(y) + 2, y, hex('#d8c49a')); }
    // la luz de la ventana también sobre la alfombra
    for (let y = y0; y <= y1; y++) { const d = Math.round((y - 119) * 0.95); for (let x = 166 - d; x <= 238 - d; x++) if (((x + y) & 1) === 0 && x >= xa(y) && x <= xb(y)) R.pset(x, y, g_mezcla(R.pget(x, y), hex('#fff2c8'), 0.18)); } }
  // la estantería de nogal (x 4–60, y 22–119): baldas con libros, el ánfora, la brújula, un barco y cajas
  g_tinte(R, 61, 24, 64, 118, C.k, 0.2);
  rect(4, 22, 60, 119, P.nogalD); rect(6, 24, 58, 117, hex('#3a2010'));
  for (let y = 25; y < 117; y += 3) for (let x = 7; x < 58; x += 6) pset(x + (y % 2 ? 3 : 0), y, hex('#46281a'));
  g_lomos(R, 7, 57, 43, 16, g_LOMOS, 1);
  g_lomos(R, 7, 36, 67, 18, g_LOMOS, 2);
  // el ánfora de recuerdo de barro rojo: boca, cuello, asas, cuerpo con su luz y una franja de greca negra abajo
  { const ax = 47, ay = 66, BAR = hex('#d0784a');
    rect(ax - 2, ay - 19, ax + 2, ay - 18, C.k); rect(ax - 1, ay - 17, ax + 1, ay - 14, C.k); pset(ax, ay - 16, BAR); pset(ax, ay - 15, BAR);
    linea(ax - 2, ay - 16, ax - 5, ay - 13, C.k); linea(ax + 2, ay - 16, ax + 5, ay - 13, C.k);
    poligono([[ax - 3, ay - 14], [ax + 3, ay - 14], [ax + 6, ay - 9], [ax + 4, ay - 3], [ax + 1, ay], [ax - 1, ay], [ax - 4, ay - 3], [ax - 6, ay - 9]], C.k);
    poligono([[ax - 2, ay - 13], [ax + 2, ay - 13], [ax + 5, ay - 9], [ax + 3, ay - 3], [ax, ay - 1], [ax - 3, ay - 3], [ax - 5, ay - 9]], BAR);
    rect(ax - 4, ay - 11, ax - 3, ay - 5, hex('#f0a070')); rect(ax + 3, ay - 9, ax + 4, ay - 5, hex('#a85a34'));
    for (let x = ax - 4; x <= ax + 3; x++) { pset(x, ay - 5, hex('#2a1a12')); if (x % 2) pset(x, ay - 4, hex('#2a1a12')); } }
  g_lomos(R, 7, 40, 91, 17, g_LOMOS, 3);
  // la brújula de latón y el barco de madera con su vela
  disco(48, 86, 5, C.k); disco(48, 86, 4, hex('#d8a840')); disco(48, 86, 3, hex('#f4ecd8')); linea(48, 84, 48, 86, hex('#c83a3a')); linea(48, 86, 48, 88, hex('#3a3a4a')); pset(46, 84, C.blanco); rect(43, 90, 53, 91, hex('#8a5a2a'));
  rect(10, 113, 28, 116, C.k); rect(11, 113, 27, 115, hex('#8a4a24')); rect(12, 113, 26, 113, hex('#c87a3a')); rect(18, 98, 18, 112, hex('#5a3a1a'));
  poligono([[19, 99], [26, 110], [19, 110]], hex('#f4ecd8')); poligono([[17, 101], [12, 110], [17, 110]], hex('#e0d4b8')); rect(15, 97, 20, 97, hex('#c83a3a'));
  g_lomos(R, 32, 57, 116, 16, g_LOMOS, 4);
  for (const y of [43, 67, 91]) { rect(5, y + 1, 59, y + 3, P.nogal); rect(5, y + 1, 59, y + 1, P.nogalL); rect(5, y + 3, 59, y + 3, P.nogalD); }
  rect(4, 22, 6, 119, P.nogal); rect(4, 22, 5, 119, P.nogalL); rect(58, 22, 60, 119, P.nogalS); rect(4, 22, 60, 23, P.nogalL); rect(2, 20, 62, 22, P.nogal); rect(2, 20, 62, 20, P.nogalL);
  // el póster azul de engranajes con sus chinchetas y su sombra
  g_tinte(R, 71, 27, 104, 61, C.k, 0.18);
  rect(68, 24, 102, 58, hex('#1a3a5a')); rect(69, 25, 101, 57, hex('#2a5a8a'));
  for (let y = 27; y < 57; y += 4) for (let x = 70; x < 101; x++) if (x % 2) pset(x, y, hex('#3a6a9a'));
  for (let x = 71; x < 101; x += 4) for (let y = 26; y < 57; y++) if (y % 2) pset(x, y, hex('#3a6a9a'));
  for (const [cx, cy, r, n] of [[80, 38, 8, 12], [92, 46, 5, 8], [92, 32, 4, 7]]) { R.anillo(cx, cy, r, hex('#e0ecf8')); for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n; pset(Math.round(cx + Math.cos(a) * (r + 1) - 0.5), Math.round(cy + Math.sin(a) * (r + 1) - 0.5), hex('#e0ecf8')); } R.anillo(cx, cy, 1.5, hex('#e0ecf8')); }
  linea(70, 54, 100, 54, hex('#e0ecf8')); for (let x = 72; x < 100; x += 5) pset(x, 53, hex('#e0ecf8'));
  for (const [x, y] of [[69, 25], [101, 25], [69, 57], [101, 57]]) g_pin(R, x, y, hex('#e84a4a'), 1.4);
  // el reloj de pared (el segundero lo pinta cada fotograma)
  disco(190.5, 28.5, 7, hex('#5a3a1a')); disco(190.5, 28.5, 6, hex('#8a5a34')); disco(190.5, 28.5, 5, hex('#f8f2e2'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(190 + Math.cos(a) * 4), Math.round(28 + Math.sin(a) * 4), hex('#5a4a3a')); }
  linea(190, 28, 190, 25, C.k); linea(190, 28, 192, 29, C.k);
  // el tablero de corcho: marco, grano del corcho, papeles con ruedas dibujadas, la foto de la isla, la foto del terrón,
  // un mapa de estrellas y el cordel rojo entre chinchetas
  g_tinte(R, 108, 42, 200, 96, C.k, 0.2);
  rect(106, 40, 198, 94, P.nogalD); rect(107, 41, 197, 93, P.nogal); rect(107, 41, 197, 41, P.nogalL);
  for (let y = 43; y <= 91; y++) for (let x = 109; x <= 195; x++) { const n = h(x, y, 773); pset(x, y, n < 0.22 ? P.corchoS : n > 0.85 ? P.corchoL : P.corcho); }
  const papel = (x0, y0, x1, y1, c, ang = 0) => { rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, hex('#8a6a3e')); rect(x0, y0, x1, y1, c); rect(x0, y1, x1, y1, g_mezcla(c, C.k, 0.15)); };
  papel(112, 46, 134, 70, hex('#f6f2e6')); R.anillo(122, 57, 7, hex('#5a5a6a')); for (let k = 0; k < 14; k++) { const a = k * Math.PI / 7; pset(Math.round(122 + Math.cos(a) * 8.6 - 0.5), Math.round(57 + Math.sin(a) * 8.6 - 0.5), hex('#5a5a6a')); } R.anillo(130, 66, 3, hex('#5a5a6a')); linea(113, 68, 133, 48, hex('#c84a4a'), 3);
  papel(140, 48, 162, 64, hex('#fbfbf6')); g_degradado(R, 141, 49, 161, 55, [hex('#7ab4e4'), hex('#b8daf0')]); rect(141, 56, 161, 63, hex('#2a6a9a')); poligono([[143, 58], [150, 52], [158, 58]], hex('#c8a870')); rect(148, 54, 150, 56, C.blanco); rect(152, 55, 153, 56, C.blanco); pset(151, 53, hex('#3a6ab8'));
  papel(118, 76, 140, 90, hex('#f6f2e6')); rect(121, 79, 137, 88, hex('#2a2a30')); disco(129, 84, 5, hex('#4a8a6a')); disco(127, 82, 2, hex('#7ab89a')); disco(131, 85, 2, hex('#2e5a46')); R.anillo(130, 84, 2, hex('#e8c060'));
  papel(170, 46, 192, 68, hex('#24305a')); for (let k = 0; k < 18; k++) pset(172 + Math.floor(h(k, 1, 774) * 19), 48 + Math.floor(h(k, 2, 774) * 18), k % 3 ? hex('#e8e8ff') : hex('#f8e080')); linea(175, 52, 183, 56, hex('#8a9ad8')); linea(183, 56, 188, 63, hex('#8a9ad8'));
  papel(150, 72, 192, 90, hex('#f2ecd8')); for (let y = 75; y < 89; y += 3) { let x = 153; while (x < 189) { const L = 3 + Math.floor(h(x, y, 775) * 6); rect(x, y, Math.min(188, x + L), y, hex('#8a8070')); x += L + 2; } }
  for (const [x, y, c] of [[123, 47, '#e84a4a'], [151, 49, '#3a8ad8'], [129, 77, '#4ab86a'], [181, 47, '#f0c040'], [171, 73, '#e84a4a']]) g_pin(R, x, y, hex(c), 1.3);
  linea(124, 48, 152, 50, hex('#d83a3a')); linea(152, 50, 182, 48, hex('#d83a3a')); linea(152, 50, 130, 78, hex('#d83a3a'));
  // la ventana: el alféizar de mármol (el marco, las hojas y las cortinas van por fotograma)
  g_tinte(R, 202, 100, 268, 104, C.k, 0.15);
  rect(200, 98, 268, 102, hex('#eeeae0')); rect(200, 98, 268, 98, C.blanco); rect(200, 102, 268, 102, hex('#b8b2a4'));
  // la albahaca en su maceta y una caracola en el alféizar
  rect(240, 90, 248, 97, C.k); rect(241, 91, 247, 97, hex('#c86a3a')); rect(241, 91, 247, 91, hex('#e88a5a'));
  for (const [x, y] of [[242, 86], [245, 85], [244, 88], [247, 87], [240, 88]]) { disco(x, y, 2, hex('#3a7a3a')); pset(x - 1, y - 1, hex('#7ac05a')); }
  poligono([[224, 97], [228, 92], [233, 97]], hex('#f0d8c0')); linea(225, 96, 231, 96, hex('#c89a80')); pset(228, 93, C.blanco);
  // la cómoda de nogal con sus cajones y tiradores, y la sombra en la pared
  g_tinte(R, 317, 104, 319, 150, C.k, 0.25);
  rect(270, 100, 316, 150, P.nogalD); g_madera(R, 271, 104, 315, 148, P.nogal, P.nogalS, P.nogalL, P.nogalD, 5, 15);
  rect(268, 98, 318, 103, P.nogal); rect(268, 98, 318, 98, P.nogalL); rect(268, 103, 318, 103, P.nogalD);
  for (const y of [111, 126, 141]) { rect(289, y - 1, 297, y + 1, C.k); rect(290, y, 296, y, hex('#e8c060')); }
  rect(272, 148, 275, 153, P.nogalD); rect(311, 148, 314, 153, P.nogalD); g_tinte(R, 270, 153, 318, 155, C.k, 0.25, true);
  // la peana del globo (el globo lo pinta cada fotograma) y unos libros tumbados
  rect(287, 97, 299, 98, C.k); rect(288, 96, 298, 96, hex('#c8963a')); rect(292, 99, 294, 99, hex('#8a6024'));
  for (const [y, c] of [[97, '#3a6aa8'], [93, '#c84a3a'], [89, '#e0b040']]) { rect(302, y - 3, 315, y, C.k); rect(303, y - 2, 314, y - 1, hex(c)); rect(312, y - 2, 314, y - 1, hex('#efe6cc')); }
  // el olivo: la maceta de barro con su greca (las hojas van por fotograma)
  rect(70, 104, 90, 119, C.k); rect(71, 105, 89, 118, hex('#c8683a')); rect(71, 105, 89, 107, hex('#e08a54')); rect(86, 108, 88, 118, hex('#9a4a24'));
  for (let x = 72; x < 88; x++) { const GR = ['####', '#..#', '#.##']; for (let j = 0; j < 3; j++) if (GR[j][x % 4] === '#') pset(x, 110 + j, hex('#2a1a12')); }
  g_tinte(R, 72, 119, 98, 121, C.k, 0.3, true);
  linea(80, 104, 79, 96, hex('#6a5a44')); linea(79, 96, 82, 86, hex('#6a5a44')); linea(81, 104, 80, 96, hex('#8a7a5a')); linea(82, 86, 78, 76, hex('#6a5a44')); linea(82, 86, 88, 78, hex('#6a5a44')); linea(80, 94, 74, 88, hex('#6a5a44'));
  // la mesa de nogal: el tablero visto un poco desde arriba, el canto, el cajón con su tirador y las patas
  g_tinte(R, 100, 150, 220, 158, C.k, 0.28, true);
  rect(98, 143, 102, 156, P.nogalD); rect(99, 143, 100, 155, P.nogal); rect(210, 143, 214, 156, P.nogalD); rect(211, 143, 212, 155, P.nogal);
  rect(96, 134, 216, 140, P.nogalD); g_madera(R, 97, 135, 215, 139, P.nogalL, P.nogal, hex('#d09a64'), P.nogalS, 7, 6);
  rect(96, 140, 216, 143, P.nogal); rect(96, 140, 216, 140, hex('#d09a64')); rect(96, 143, 216, 143, P.nogalD);
  rect(128, 144, 188, 150, P.nogalD); rect(129, 144, 187, 149, P.nogal); rect(155, 146, 161, 147, hex('#e8c060')); rect(129, 149, 187, 149, P.nogalS);
  // en la mesa: la pila de recortes de cartón, el celo, las tijeras abiertas y el bote de lápices
  for (let k = 0; k < 4; k++) { const y = 137 - k * 2, x = 99 + (k % 2); rect(x, y - 1, x + 10, y, C.k); rect(x + 1, y - 1, x + 9, y - 1, k % 2 ? g_CARTON.cL : g_CARTON.c); }
  disco(105, 127, 3.5, C.k); disco(105, 127, 2.5, hex('#f4ecc8')); disco(105, 127, 1.2, hex('#8a7a5a')); pset(104, 125, C.blanco);
  linea(207, 139, 213, 136, hex('#5a5a6a')); linea(207, 137, 213, 139, hex('#5a5a6a')); R.anillo(206.5, 136.5, 1.2, hex('#c83a3a')); R.anillo(206.5, 140, 1.2, hex('#c83a3a'));
  rect(206, 122, 213, 135, C.k); rect(207, 123, 212, 134, hex('#3a6aa8')); rect(207, 123, 208, 134, hex('#6a9ad8')); rect(207, 129, 212, 129, hex('#2a4a7a'));
  for (const [x, c] of [[208, '#f0c030'], [210, '#c83a3a'], [211, '#4ab86a']]) { linea(x, 122, x - 1 + (x % 3), 114, hex(c)); pset(x - 1 + (x % 3), 113, hex('#3a3a3a')); }
}

// el Egeo de día por un hueco V = [x0, y0, x1, y1] con el horizonte en hor: el cielo tramado con nubes de tres tonos a
// tres velocidades, Creta difuminada, la isla con casitas blancas y cúpula azul, el mar con olas y brillos, un velero que
// cruza y gaviotas; todo recortado al hueco
function g_egeoDia(R, t, V, hor) {
  const { pset, disco, linea, poligono } = R, [x0, y0, x1, y1] = V;
  R.recorte(V);
  g_degradado(R, x0, y0, x1, hor, [hex('#4a8ad0'), hex('#6aa6dc'), hex('#94c2e8'), hex('#c8e2f2')]);
  // las nubes: tres capas (lejos, despacio y pálidas; cerca, más deprisa y con más contraste)
  for (const [y, w, v, k, cols] of [[38, 14, 0.5, 0, [hex('#b8d4ea'), hex('#d8e8f4'), hex('#f0f6fa')]], [46, 18, 1.1, 1, [hex('#a8c4dc'), hex('#e4eef6'), hex('#ffffff')]], [34, 22, 1.8, 2, [hex('#98b4d0'), hex('#e8f0f8'), hex('#ffffff')]]]) {
    const span = (x1 - x0) + w * 2 + 40, cx = x0 - w + ((h(k, 1, 780) * span + t * v) % span);
    for (const [dx, dy, r] of [[0, 0, w * 0.28], [w * 0.3, -2, w * 0.24], [-w * 0.3, 1, w * 0.2], [w * 0.55, 1, w * 0.16]]) disco(cx + dx, y + dy + 1, r, cols[0]);
    for (const [dx, dy, r] of [[0, -1, w * 0.26], [w * 0.3, -3, w * 0.22], [-w * 0.3, 0, w * 0.18], [w * 0.55, 0, w * 0.14]]) disco(cx + dx, y + dy, r, cols[1]);
    disco(cx - 1, y - 3, w * 0.14, cols[2]); disco(cx + w * 0.28, y - 5, w * 0.1, cols[2]);
    for (let i = -w * 0.7; i < w * 0.8; i++) pset(Math.round(cx + i), y + Math.round(w * 0.22), cols[0]);
  }
  // Creta, difuminada en el horizonte
  for (let x = x0; x <= x1; x++) { const hh = Math.round(2 + 1.5 * Math.sin(x * 0.11) + Math.sin(x * 0.37)); for (let y = hor - hh; y < hor; y++) pset(x, y, y === hor - hh ? hex('#b8c8dc') : hex('#a4b8d0')); }
  // el mar: degradado, franjas de olas que corren y brillos que titilan
  g_degradado(R, x0, hor, x1, y1, [hex('#3a86bc'), hex('#2a72a8'), hex('#1e5e92'), hex('#1a5286')]);
  for (let y = hor + 2; y <= y1; y += 3) { const v = (y - hor) * 0.12 + 0.4; for (let x = x0; x <= x1; x++) { const w = Math.sin((x + t * 6 * v) * 0.35 + y * 1.7) + Math.sin((x - t * 3) * 0.13 + y); if (w > 1.3) pset(x, y, hex('#6aaad4')); else if (w < -1.5) pset(x, y, hex('#164a7a')); } }
  for (let k = 0; k < 14; k++) { const x = x0 + Math.floor(h(k, 1, 781) * (x1 - x0)), y = hor + 3 + Math.floor(h(k, 2, 781) * (y1 - hor - 4)); if (Math.sin(t * (2 + k % 3) + k * 1.7) > 0.55) { pset(x, y, C.blanco); pset(x + 1, y, hex('#bfe0f4')); } }
  // la isla: la roca ocre con su sombra, el matorral, las casitas blancas con puertas azules y la iglesita de cúpula azul
  { const base = hor + 9, top = (x) => Math.round(base - 13 * Math.max(0, Math.sin((x - x0 + 2) / 30 * Math.PI)) - 2 * Math.sin(x * 0.5)), xa = x0, xb = x0 + 30;
    for (let x = xa; x <= xb; x++) for (let y = top(x); y <= base; y++) pset(x, y, y === top(x) ? hex('#e8c890') : x > xa + 20 ? hex('#a8845a') : (h(x, y, 782) < 0.2 ? hex('#b89268') : hex('#c8a474')));
    for (let k = 0; k < 10; k++) { const x = xa + 2 + Math.floor(h(k, 1, 783) * 26), y = top(x) + 2 + Math.floor(h(k, 2, 783) * 4); pset(x, y, hex('#6a8a4a')); pset(x + 1, y, hex('#4a6a3a')); }
    for (const [x, w, hh] of [[xa + 6, 4, 3], [xa + 11, 3, 3], [xa + 15, 4, 4], [xa + 8, 3, 2]]) { const y = top(x + 1) + 3; R.rect(Math.max(x0, x), y - hh, x + w, y, hex('#fbfaf4')); pset(x + w, y - hh, hex('#d8d4c8')); pset(x + 1, y, hex('#3a6ab8')); }
    { const cx = xa + 20, cy = top(xa + 20) + 3; R.rect(cx - 2, cy - 3, cx + 2, cy, hex('#fbfaf4')); disco(cx + 0.5, cy - 3, 2.2, hex('#2a5ab8')); pset(cx, cy - 5, hex('#5a8ae8')); }
    for (let x = xa; x <= xb; x++) if (Math.sin(t * 2 + x * 0.6) > 0.2) pset(x, base + 1, hex('#e8f4fa')); }
  // el velero que cruza despacio, cabeceando
  { const x = x0 + ((t * 2.2 + 30) % (x1 - x0 + 30)) - 12, y = hor + 13 + Math.round(Math.sin(t * 1.4)); linea(x - 4, y, x + 4, y, C.blanco); linea(x - 3, y + 1, x + 3, y + 1, hex('#2a4a7a')); linea(x, y - 1, x, y - 9, hex('#5a4a3a')); poligono([[x + 1, y - 9], [x + 1, y - 1], [x + 6, y - 1]], C.blanco); poligono([[x - 1, y - 7], [x - 1, y - 1], [x - 4, y - 1]], hex('#e8e0d0')); for (let i = 1; i < 6; i++) if ((i + Math.floor(t * 4)) % 2) pset(x - 4 - i, y + 1, hex('#bfe0f4')); }
  // las gaviotas
  for (let k = 0; k < 3; k++) { const x = Math.round(x0 + ((t * (4 + k) + k * 23) % (x1 - x0 + 20)) - 10), y = Math.round(y0 + 10 + k * 7 + Math.sin(t * 1.3 + k) * 3), a = Math.sin(t * 8 + k * 2) > 0 ? -1 : 1;
    pset(x, y, hex('#f8f8f8')); pset(x - 1, y + a, hex('#e0e4ea')); pset(x + 1, y + a, hex('#e0e4ea')); pset(x - 2, y + a * 2, hex('#7a8494')); pset(x + 2, y + a * 2, hex('#7a8494')); }
  R.recorte(null);
}

// el marco de la ventana del estudio, las dos hojas abiertas hacia dentro con el reflejo, la barra y las cortinas de lino
// que se mecen con la brisa
function g_ventanaDia(R, t) {
  const { rect, pset, linea, poligono } = R, B = hex('#f2eee4'), BS = hex('#c8c0b0'), BD = hex('#9a9282');
  rect(206, 26, 262, 28, B); rect(206, 26, 262, 26, C.blanco); rect(206, 28, 262, 28, BS);
  rect(206, 26, 208, 98, B); rect(206, 26, 206, 98, C.blanco); rect(208, 29, 208, 97, BS); rect(260, 26, 262, 98, B); rect(260, 29, 260, 97, BS); rect(262, 26, 262, 98, BD);
  // las hojas abiertas, en escorzo, con el cristal que refleja el cuarto
  for (const [xa, xb, sg] of [[198, 206, -1], [262, 270, 1]]) {
    poligono([[xa, 30 - (sg < 0 ? 3 : 0)], [xb, 30 - (sg > 0 ? 3 : 0)], [xb, 96 + (sg > 0 ? 3 : 0)], [xa, 96 + (sg < 0 ? 3 : 0)]], B);
    poligono([[xa + 1, 33 - (sg < 0 ? 3 : 0)], [xb - 1, 33 - (sg > 0 ? 3 : 0)], [xb - 1, 93 + (sg > 0 ? 3 : 0)], [xa + 1, 93 + (sg < 0 ? 3 : 0)]], hex('#a8c8dc'));
    for (let y = 34; y < 92; y++) { const u = ((y + Math.floor(t * 3)) % 26); if (u < 3) pset(sg < 0 ? xa + 2 + (u) : xb - 2 - u, y, hex('#e8f4fa')); }
    rect(xa + 1, 62, xb - 1, 63, B);
  }
  // la barra de latón y las cortinas: pliegues verticales con luz y sombra, que se mecen más abajo
  rect(192, 22, 276, 23, hex('#c8963a')); rect(192, 22, 276, 22, hex('#f0c868')); R.disco(192, 22.5, 1.5, hex('#e8b040')); R.disco(276.5, 22.5, 1.5, hex('#e8b040'));
  for (const [xa, w, sg] of [[190, 12, -1], [266, 12, 1]]) for (let y = 24; y <= 104; y++) {
    const sw = Math.round(Math.sin(t * 1.1 + y * 0.06) * (y - 24) / 30 + Math.sin(t * 2.3 + y * 0.2) * 0.4), ancho = w + Math.round((y - 24) / 26);
    for (let i = 0; i < ancho; i++) { const x = (sg < 0 ? xa + i - Math.round((y - 24) / 26) : xa + i) + sw, f = Math.sin((i + (sg < 0 ? 0 : 1)) * 1.3 + y * 0.01);
      pset(x, y, i === 0 || i === ancho - 1 ? g_E.linoS : f > 0.55 ? g_E.linoL : f < -0.45 ? g_E.linoS : g_E.lino); }
    if (y === 104) for (let i = 0; i < ancho; i++) pset((sg < 0 ? xa + i - 3 : xa + i) + sw, 105, g_mezcla(g_E.linoS, C.k, 0.15));
  }
  for (let x = 192; x <= 276; x += 6) { if (x > 202 && x < 266) continue; R.anillo(x, 23.5, 1.2, hex('#c8963a')); }
}

// el olivo de la maceta: el tronco va en el búfer; aquí las hojas plateadas en racimos que se mecen
function g_olivo(R, t, cx, cy) {
  for (let k = 0; k < 46; k++) { const a = h(k, 1, 790) * Math.PI * 2, d = Math.sqrt(h(k, 2, 790)), x = cx + Math.cos(a) * d * 18, y = cy - 26 + Math.sin(a) * d * 12 - (k % 3) * 2, sw = Math.sin(t * 1.4 + x * 0.1) * (1 + (cy - 26 - y) / 10) * 0.8;
    const px = Math.round(x + sw), py = Math.round(y); const c = h(k, 3, 790) < 0.35 ? hex('#a8b890') : h(k, 3, 790) < 0.7 ? hex('#7a8a5a') : hex('#56663e');
    R.pset(px, py, c); R.pset(px + 1, py, c); R.pset(px + 2, py + 1, g_mezcla(c, C.k, 0.2)); if (k % 7 === 0) R.pset(px + 1, py + 1, hex('#3a2a4a')); }
}

// un globo terráqueo de aula de radio r en (cx, cy): océanos, continentes que giran con lon, sombra hacia el lado
// contrario de la luz (luz −1: desde la izquierda), el brillo y el meridiano de latón inclinado
function g_globo(R, cx, cy, r, lon, luz = -1) {
  const { pset, linea } = R, inc = 0.41;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue;
    const z = Math.sqrt(r * r - d2), xr = i * Math.cos(inc) + j * Math.sin(inc), yr = -i * Math.sin(inc) + j * Math.cos(inc), la = Math.asin(Math.max(-1, Math.min(1, yr / r))), lo = Math.atan2(xr, z) + lon;
    const n = Math.sin(lo * 2 + 1) * 0.6 + Math.sin(lo * 3.3 + la * 4) * 0.5 + Math.cos(la * 5 + lo) * 0.35 + Math.sin(lo * 7 - la * 3) * 0.2, tierra = n > 0.45 && Math.abs(la) < 1.25;
    let c = tierra ? (Math.abs(la) > 0.9 ? hex('#f0f0e8') : n > 0.9 ? hex('#c8a85a') : hex('#6aa84a')) : hex('#3a7ac8');
    if (Math.abs(la) > 1.25) c = hex('#f4f8fc');
    const l = (luz * -i * 0.7 - j * 0.5) / r + z / r * 0.4;
    if (l < -0.1 && g_b4(cx + i, cy + j) < 0.5 - l) c = g_mezcla(c, hex('#1a2a4a'), 0.45); else if (l > 0.55) c = g_mezcla(c, C.blanco, 0.25);
    if (d2 > (r - 1) * (r - 1)) c = g_mezcla(c, hex('#1a2a4a'), 0.5);
    pset(cx + i, cy + j, c); }
  pset(cx - Math.round(r * 0.45 * -luz * -1) - 2, cy - Math.round(r * 0.5), C.blanco); pset(cx - Math.round(r * 0.45 * -luz * -1) - 1, cy - Math.round(r * 0.5), hex('#c8e0f8'));
  // el meridiano de latón, inclinado, y su eje
  const rr = r + 2;
  for (let k = 0; k < 64; k++) { const a = -Math.PI / 2 + k / 63 * Math.PI, x = rr * Math.cos(a), y = rr * Math.sin(a), px = Math.round(cx + x * Math.cos(inc) - y * Math.sin(inc) * 0), py = Math.round(cy + y); const xx = Math.round(cx + (x * Math.cos(inc) + y * Math.sin(inc))), yy = Math.round(cy + (-x * Math.sin(inc) * 0 + y * Math.cos(inc) + x * 0)); pset(xx, yy, k % 9 === 0 ? hex('#fff0b0') : hex('#c8963a')); pset(xx + 1, yy, hex('#8a6024')); }
  linea(cx + Math.round((r + 3) * Math.sin(inc)), cy - Math.round((r + 3) * Math.cos(inc)), cx + Math.round(r * Math.sin(inc)), cy - Math.round(r * Math.cos(inc)), hex('#8a6024'));
  linea(cx, cy + r + 1, cx, cy + r + 5, hex('#8a6024'));
}

// lo de delante del estudio: las cajas de mudanza con rollos de papel (abajo a la izquierda) y el cesto de mimbre con
// recortes de cartón (abajo a la derecha)
function g_cajasDelante(R, t) {
  const { rect, pset, linea, poligono, disco } = R, K = g_CARTON;
  // dos cajas de cartón, una sobre otra, con la cinta y los rollos de papel que asoman
  for (const [x0, y0, x1, y1] of [[-2, 156, 30, 179], [2, 140, 26, 156]]) { rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, K.c); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 2, K.cL); rect(x1 - 3, y0 + 1, x1 - 1, y1 - 1, K.cS);
    rect(x0 + 1, y0 + 3, x1 - 1, y0 + 4, hex('#e8dcb0')); for (let x = x0 + 2; x < x1 - 3; x += 4) pset(x, y0 + 8 + (x % 3), K.cS); }
  for (const [x, c, y0] of [[8, '#e8dcb8', 124], [13, '#a8d0e8', 128], [19, '#f0e8d0', 126]]) { linea(x - 3, 140, x + 2, y0, C.k); linea(x - 2, 140, x + 3, y0, hex(c)); linea(x - 1, 140, x + 4, y0, g_mezcla(hex(c), C.k, 0.25)); linea(x - 1, 133, x + 1, 133, hex('#c83a3a')); R.disco(x + 3, y0, 1.5, g_mezcla(hex(c), C.blanco, 0.4)); }
  // el cesto de mimbre con recortes de cartón y una regla
  rect(294, 160, 319, 179, C.k);
  for (let y = 161; y < 180; y++) for (let x = 295; x < 320; x++) pset(x, y, ((x + (y >> 1)) % 4 < 2) !== ((y >> 1) % 2 === 0) ? hex('#c8a060') : hex('#a07a3a'));
  rect(294, 160, 319, 162, hex('#e0c080'));
  poligono([[298, 160], [304, 150], [309, 160]], K.c); linea(298, 160, 304, 150, K.cD); disco(312, 156, 5, K.cL); disco(312, 156, 2, K.dentro);
  rect(302, 146, 304, 160, hex('#f0d060')); for (let y = 148; y < 160; y += 2) pset(302, y, C.k);
}

// EL MECANISMO DE CARTÓN DE CERCA (cámara 'carton' del estudio): el estudio desenfocado detrás y la mesa con sus cosas
// van en su búfer; encima, las manchas de luz que tiemblan, el mecanismo a escala 1, la taza que humea, la rueda que sale
// rodando por la mesa y la Luna que vuela
function g_carton(R, t, o) {
  const { pset, linea, disco } = R;
  R.copiar(g_capa(R, 'carton', () => g_cartonFijo(R)));
  // los brillos del mar, desenfocados, por la ventana del fondo (x 236–319, y 92–128)
  for (let k = 0; k < 9; k++) { const x = 240 + h(k, 1, 800) * 76 + Math.sin(t * 0.5 + k) * 4, y = 96 + h(k, 2, 800) * 30, f = Math.sin(t * (1.1 + h(k, 3, 800)) + k * 1.9);
    if (f > 0.1) R.halo(x, y, 2 + f * 2.5, [hex('#9ccce8'), hex('#e4f4fc')], 0.9); }
  // la cortina desenfocada que se mece delante de la ventana (una banda clara que va y viene)
  for (let y = 26; y < 128; y += 1) { const x = Math.round(236 + Math.sin(t * 1.1 + y * 0.05) * 3 * (y - 26) / 100); for (let i = 0; i < 4; i++) { const c = R.pget(x + i, y); if (c) pset(x + i, y, g_mezcla(c, g_E.linoL, 0.35 - i * 0.07)); } }
  // las manchas de sol en la mesa, que tiemblan con la brisa (luz de la ventana, desde la derecha)
  for (let k = 0; k < 4; k++) g_charco(R, Math.round(206 + k * 26 + Math.sin(t * 0.4 + k * 2) * 5), Math.round(158 + (k % 2) * 10 + Math.cos(t * 0.3 + k) * 2), 11, 3, hex('#ffe6b0'), 0.32);
  // el mecanismo, a escala 1
  const est = g_estado(t, o), m = g_mecanismo(R, 50, 60, 1, t, est);
  // la taza que humea (el vapor sube en dos hilos que ondulan)
  for (let k = 0; k < 2; k++) for (let i = 0; i < 26; i++) { const u = ((i / 26 + t * 0.18 + k * 0.5) % 1), y = 136 - u * 34, x = 294 + k * 5 + Math.sin(u * 7 + t * 2 + k * 3) * 3 * u;
    if (h(i, k, 801) < 0.75 - u * 0.5) { const c = R.pget(Math.round(x), Math.round(y)); if (c) pset(Math.round(x), Math.round(y), g_mezcla(c, C.blanco, 0.55 - u * 0.4)); } }
  // la rueda mediana que salta de su chincheta, cae a la mesa y sale rodando por la izquierda
  let rueda = null;
  if (est.fuera > 0) { const g = g_RUEDAS.M, u = est.fuera, [cx0, cy0] = m.centroM; let x, y, a;
    if (u < 0.3) { const v = u / 0.3; x = cx0 + (64 - cx0) * v; y = cy0 + (150 - cy0) * v * v - 22 * Math.sin(v * Math.PI); a = -v * 3; }
    else { const v = (u - 0.3) / 0.7; x = 64 - 190 * v ** 1.25; y = 150 - Math.abs(Math.sin(v * Math.PI * 3)) * (1 - v) * 9; a = -3 + (x - 64) / g.r; }
    if (y > 120) for (let i = -g.r; i <= g.r; i++) { const sx = Math.round(x) + i, c = R.pget(sx, 171); if (c) { pset(sx, 171, g_mezcla(c, C.k, 0.35)); if (Math.abs(i) < g.r - 4) pset(sx, 172, g_mezcla(R.pget(sx, 172), C.k, 0.25)); } }
    g_rueda(R, x, y, g.r, g.n, a, g.cols, { carton: true, agujeros: g.ag, diente: 3 }); g_pin(R, Math.round(x), Math.round(y), hex('#3a8ad8'), 3);
    rueda = [Math.round(x), Math.round(y)]; }
  // la Luna de papel que se suelta del alambre y sale volando por arriba (entre x 200 y 250: lejos del año y de Atom)
  let luna = m.luna;
  if (est.vuela > 0) { const v = est.vuela, e = v * v * (3 - 2 * v), [x0, y0] = m.luna, cx = 190, cy = 30, x1 = 238, y1 = -16;
    const P = (q) => [(1 - q) ** 2 * x0 + 2 * (1 - q) * q * cx + q * q * x1, (1 - q) ** 2 * y0 + 2 * (1 - q) * q * cy + q * q * y1];
    for (let k = 1; k <= 5; k++) { const [sx, sy] = P(Math.max(0, e - k * 0.03)); pset(Math.round(sx), Math.round(sy), k % 2 ? hex('#fff6dc') : hex('#f0d890')); }
    const [x, y] = P(e); g_lunaPapel(R, x, y, 8 - e * 2, t * 6); luna = [Math.round(x), Math.round(y)]; }
  return { manivela: m.manivela, luna, rueda };
}

// el fondo fijo del plano de cerca: el estudio (con el Egeo y la ventana) ampliado y desenfocado detrás, oscurecido un poco
// para que el cartón destaque; la mesa de nogal de tablas anchas; la hoja con la rueda dibujada y el compás, las bolitas
// de papel arrugado (Lunas que salieron mal), la regla, las tijeras, el celo, virutas de lápiz y la taza
function g_cartonFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, B = R.buf, K = g_CARTON;
  // el estudio entero en un búfer de paso (con el mar y la ventana en t = 0), y de ahí la ampliación desenfocada
  const fuente = R.nuevo(); { const prev = R.usar(fuente); R.copiar(g_capa(R, 'estudio', () => g_estudioFijo(R))); g_egeoDia(R, 0, [209, 29, 259, 97], 70); g_ventanaDia(R, 0); R.usar(prev); }
  const px = (x, y) => fuente[Math.max(0, Math.min(179, y | 0)) * 320 + Math.max(0, Math.min(319, x | 0))];
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) {
    const sx = 100 + x * 0.45, sy = 30 + y * 0.45; let r = 0, g = 0, b = 0;
    for (const [dx, dy] of [[-1.2, -0.6], [1.1, -0.9], [-0.8, 1.2], [1.0, 1.0], [0, 0]]) { const c = px(sx + dx, sy + dy); r += c & 255; g += (c >>> 8) & 255; b += (c >>> 16) & 255; }
    const k = 0.84 + 0.1 * (y / 132); r = r / 5 * k; g = g / 5 * k; b = b / 5 * (k + 0.03);
    B[y * 320 + x] = (0xff000000 | (Math.min(255, b) << 16) | (Math.min(255, g) << 8) | Math.min(255, r)) >>> 0;
  }
  // la mesa: tablas anchas que se ensanchan hacia nosotros, con vetas y nudos; el canto de atrás con su luz
  const P = g_E; let y = 132;
  for (const alto of [5, 7, 9, 11, 13, 16]) { const y1 = Math.min(179, y + alto); g_madera(R, 0, y, 319, y1, P.nogalL, P.nogal, hex('#d09a64'), P.nogalS, 40 + alto, alto + 1); y = y1 + 1; }
  rect(0, 130, 319, 131, P.nogalD); rect(0, 132, 319, 132, hex('#e0aa70'));
  g_tinte(R, 0, 133, 319, 142, C.k, 0.2, true);
  // la hoja de papel con la rueda dibujada a lápiz y el compás abierto encima
  poligono([[4, 156], [42, 150], [48, 178], [8, 179]], hex('#9a8a70')); poligono([[4, 155], [42, 149], [47, 177], [8, 178]], hex('#f6f0e0'));
  for (let k = 0; k < 6; k++) linea(8 + k * 0.4, 158 + k * 3.4, 44 + k * 0.4, 152 + k * 4, hex('#d4dce8'));
  R.anillo(26, 164, 8, hex('#6a6a7a')); R.anillo(26, 164, 5, hex('#8a8a9a'), 2); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(26 + Math.cos(a) * 9.5), Math.round(164 + Math.sin(a) * 9.5), hex('#5a5a6a')); }
  linea(27, 147, 22, 170, C.k); linea(28, 147, 23, 170, hex('#c8ccd4')); linea(29, 147, 35, 169, C.k); linea(30, 147, 36, 169, hex('#9aa0ac')); disco(28.5, 146.5, 2.2, C.k); disco(28.5, 146.5, 1.4, hex('#e8c060')); pset(36, 170, hex('#3a3a3a'));
  // las bolitas de papel arrugado: Lunas que salieron mal (una mitad pintada de negro, otra blanca del todo)
  for (const [cx, cy, r, gi] of [[12, 140, 5, 0.6], [38, 137, 4, 2.2], [214, 172, 4.5, -0.8]]) { disco(cx + 1.5, cy + 2, r, g_mezcla(P.nogal, C.k, 0.4)); g_lunaPapel(R, cx, cy, r, gi); }
  // la regla de madera con sus marcas (sin números)
  poligono([[64, 172], [190, 168], [191, 173], [65, 177]], C.k); poligono([[65, 172], [189, 168], [190, 172], [66, 176]], hex('#e8c878'));
  for (let i = 0; i <= 62; i++) { const x = 67 + i * 2, yy = 172 - i * 0.065; linea(x, yy, x, yy + (i % 5 === 0 ? 2.5 : 1), hex('#7a5a2a')); }
  linea(65, 172, 189, 168, hex('#fff0c0'));
  // las tijeras abiertas (hojas de acero, mangos rojos)
  linea(232, 176, 252, 166, C.k); linea(232, 175, 252, 165, hex('#d8dce4')); linea(234, 168, 252, 170, C.k); linea(234, 167, 252, 169, hex('#b0b6c0')); disco(252, 168, 1.3, hex('#3a3a3a'));
  R.anillo(257.5, 164.5, 3, hex('#3a1010')); R.anillo(257.5, 164.5, 2.2, hex('#d83a3a')); R.anillo(258.5, 172.5, 3, hex('#3a1010')); R.anillo(258.5, 172.5, 2.2, hex('#d83a3a'));
  // el rollo de celo (translúcido, con su brillo) y una tira cortada
  disco(277, 152, 7.5, C.k); disco(277, 152, 6.5, hex('#e8e0c0')); disco(277, 152, 4.5, hex('#b8a888')); disco(277, 152, 3.2, P.nogal); pset(273, 148, C.blanco); pset(274, 147, C.blanco);
  poligono([[262, 160], [272, 158], [273, 161], [263, 163]], hex('#f0e8cc'));
  // virutas de lápiz (rizos de madera con el filo de color)
  for (const [x, yy, c] of [[200, 160, '#f0c030'], [206, 163, '#f0c030'], [196, 166, '#c83a3a']]) { R.anillo(x, yy, 2, hex('#e8c090')); pset(x - 2, yy, hex(c)); pset(x - 1, yy + 1, hex(c)); }
  // la taza de cerámica blanca con la franja de greca azul, el café y el asa; su sombra
  g_charco(R, 300, 164, 14, 3, C.k, 0.4);
  rect(285, 138, 305, 163, C.k); rect(286, 139, 304, 162, hex('#f4f0e6')); rect(286, 139, 288, 162, C.blanco); rect(300, 139, 304, 162, hex('#d8d2c4')); rect(303, 139, 304, 162, hex('#bab4a6'));
  rect(286, 146, 304, 150, hex('#2a5aa8')); for (let x = 287; x < 304; x += 4) { rect(x, 147, x + 1, 147, C.blanco); rect(x + 1, 148, x + 2, 148, C.blanco); }
  rect(286, 139, 304, 141, hex('#5a3a22')); rect(287, 140, 303, 140, hex('#7a5232')); pset(290, 140, hex('#c89a6a'));
  R.anillo(307.5, 150.5, 5, C.k); R.anillo(307.5, 150.5, 4, hex('#e8e2d4')); R.anillo(307.5, 150.5, 3, C.k);
  rect(285, 163, 305, 163, C.k);
}

// los colores del escritorio de noche
const g_N = {
  pap: hex('#2c3a5c'), papS: hex('#222e4a'), papL: hex('#3a4a6e'), papR: hex('#4a5a82'),
  zoc: hex('#4a3424'), zocL: hex('#6a4a32'), zocD: hex('#2a1c12'),
  suelo: hex('#5a3e2a'), sueloS: hex('#46301e'), sueloL: hex('#74543a'), sueloD: hex('#2e1e12'),
  mesa: hex('#8a6440'), mesaS: hex('#6a4a2c'), mesaL: hex('#b08454'), mesaD: hex('#3a2616'),
  calido: hex('#ffd890'), frio: hex('#7ac8f0'),
};

// EL ESCRITORIO DE NOCHE (encuadre 'ordenador'): el fondo fijo en su búfer (con la luz del flexo y el resplandor de las
// pantallas ya pintados); encima, la noche del Egeo por la ventana, el gato, las dos pantallas que cambian, el vapor de
// la taza, la luz de la torre y el parpadeo de las pantallas en la pared
function g_ordenador(R, t, o) {
  const { pset, linea, disco, rect } = R;
  R.copiar(g_capa(R, 'ordenador', () => g_ordenadorFijo(R)));
  g_nocheEgeo(R, t, [16, 28, 72, 94], 70);
  // el gato en el alféizar (silueta contra la noche): se lame una pata de vez en cuando y mueve la cola
  { const x = 20, y = 95, K = hex('#14141e'), KL = hex('#3a3a50');
    rect(x, y - 7, x + 7, y, K); rect(x + 1, y - 10, x + 6, y - 7, K); pset(x + 1, y - 11, K); pset(x + 6, y - 11, K); rect(x + 1, y - 7, x + 1, y - 1, KL);
    if (Math.sin(t * 2.3) > 0.2) { pset(x + 2, y - 9, hex('#e8d040')); pset(x + 5, y - 9, hex('#e8d040')); }
    for (let i = 0; i < 9; i++) { const a = Math.sin(t * 2.4 + i * 0.4) * 0.5 * (i / 9); pset(Math.round(x + 8 + i * 0.6), Math.round(y - 1 - i * 0.5 + Math.sin(a + i * 0.3) * i * 0.3), K); } }
  // las dos pantallas
  const sc = g_pantallaEscaner(R, t, [128, 102, 186, 134]), sim = g_pantallaSimula(R, t, [196, 102, 254, 134], o);
  // el reflejo frío de las pantallas en la pared, que late un poco
  { const f = 0.5 + 0.5 * Math.sin(t * 3.1) * Math.sin(t * 1.7); for (let x = 130; x <= 252; x += 2) if (h(x, Math.floor(t * 4), 810) < 0.3 * f) pset(x, 97, hex('#4a6a9a')); }
  // el vapor de la taza
  for (let k = 0; k < 2; k++) for (let i = 0; i < 14; i++) { const u = ((i / 14 + t * 0.2 + k * 0.5) % 1), y = Math.round(133 - u * 18), x = Math.round(117 + k * 3 + Math.sin(u * 6 + t * 2 + k * 2) * 2 * u);
    if (h(i, k, 811) < 0.7 - u * 0.5) { const c = R.pget(x, y); if (c) pset(x, y, g_mezcla(c, hex('#c8d0e0'), 0.5 - u * 0.35)); } }
  // la luz de la torre, que parpadea (la del disco) y la fija
  pset(272, 155, hex('#5ad8ff')); if (h(Math.floor(t * 9), 1, 812) < 0.5) pset(272, 157, hex('#ffb040'));
  return { choque: sim.choque, escaner: sc };
}

// la noche del Egeo por la ventana (hueco V, horizonte hor): cielo tramado de azules con estrellas que titilan, la Luna
// con su halo y su reguero en el agua, la isla negra con ventanas encendidas, el faro que barre, un barco con sus luces
// y el mar con brillos; todo recortado al hueco
function g_nocheEgeo(R, t, V, hor) {
  const { pset, linea, disco, poligono } = R, [x0, y0, x1, y1] = V;
  R.recorte(V);
  g_degradado(R, x0, y0, x1, hor, [hex('#0a1430'), hex('#122050'), hex('#1c3066'), hex('#2a4478')]);
  for (let k = 0; k < 26; k++) { const x = x0 + Math.floor(h(k, 1, 815) * (x1 - x0)), y = y0 + Math.floor(h(k, 2, 815) * (hor - y0 - 6)), f = Math.sin(t * (1.5 + h(k, 3, 815) * 3) + k);
    if (f > -0.3) pset(x, y, f > 0.6 ? C.blanco : hex('#9ab0d8')); if (k % 9 === 0 && f > 0.7) { pset(x - 1, y, hex('#6a80b0')); pset(x + 1, y, hex('#6a80b0')); } }
  // una nube larga y oscura que pasa despacio por delante de las estrellas, con el borde iluminado por la Luna
  { const cx = x0 + ((t * 1.2 + 10) % (x1 - x0 + 50)) - 25; for (let i = -14; i <= 14; i++) { const hh = Math.round(3 - Math.abs(i) / 6); for (let j = -hh; j <= hh; j++) pset(Math.round(cx + i), 50 + j, j === -hh ? hex('#5a6a98') : hex('#24305a')); } }
  // la Luna con su halo
  R.halo(62, 38, 11, [hex('#1e3268'), hex('#2c4480'), hex('#3e5a96')], 1.1); disco(62, 38, 4.5, hex('#e8ecf4')); disco(63, 37, 1.3, hex('#c8ccd8')); pset(60, 40, hex('#c8ccd8'));
  // el mar: degradado oscuro, olas que corren, el reguero de la Luna que tiembla
  g_degradado(R, x0, hor, x1, y1, [hex('#14244a'), hex('#0e1c3c'), hex('#0a1630')]);
  for (let y = hor + 2; y <= y1; y += 2) for (let x = x0; x <= x1; x++) { const w = Math.sin((x + t * 4) * 0.3 + y * 1.9) + Math.sin((x - t * 2) * 0.11 + y); if (w > 1.4) pset(x, y, hex('#2a4070')); }
  for (let y = hor + 1; y <= y1; y++) { const w = 1 + (y - hor) * 0.14; for (let i = -w; i <= w; i++) { const x = Math.round(62 + i + Math.sin(t * 3 + y * 0.9) * 1.5); if (h(x, y + Math.floor(t * 6), 816) < 0.45) pset(x, y, (y + Math.floor(t * 5)) % 3 ? hex('#c8d4ec') : hex('#7a90c0')); } }
  // la isla: silueta negra con ventanitas encendidas (alguna se apaga) y el faro en la punta, que barre
  { const top = (x) => Math.round(hor - 1 - 8 * Math.max(0, Math.sin((x - x0 + 1) / 32 * Math.PI)) - Math.sin(x * 0.7));
    for (let x = x0; x <= x0 + 34; x++) for (let y = top(x); y <= hor + 1; y++) pset(x, y, y === top(x) ? hex('#1a2440') : hex('#080c18'));
    for (let k = 0; k < 7; k++) { const x = x0 + 4 + Math.floor(h(k, 1, 817) * 24), y = top(x) + 2 + Math.floor(h(k, 2, 817) * 3); if (h(k, Math.floor(t / 3), 818) < 0.85) pset(x, y, k % 3 ? hex('#ffd070') : hex('#ffe8a8')); }
    const fx = x0 + 34, fy = hor - 6; R.rect(fx - 1, fy, fx, hor, hex('#d8d8e0')); pset(fx, fy - 1, hex('#fff0b0'));
    const a = t * 1.3, dx = Math.cos(a), dy = Math.sin(a) * 0.25; if (dx > -0.2) for (let i = 2; i < 40; i++) { const x = Math.round(fx + dx * i), y = Math.round(fy - 1 + dy * i); if (h(i, 1, 819) < 0.8 - i / 60) pset(x, y, i < 12 ? hex('#fff0b0') : hex('#c8b880')); } }
  // el barco que pasa con sus luces (blanca de tope, roja y verde)
  { const x = Math.round(x1 + 10 - ((t * 2.5) % (x1 - x0 + 30))), y = hor + 6; g_rc(R, V, x - 5, y, x + 5, y + 1, hex('#060a14')); pset(x - 2, y - 1, hex('#060a14')); pset(x - 2, y - 4, hex('#fff8e0')); pset(x - 4, y - 1, hex('#ff4040')); pset(x + 4, y - 1, hex('#40ff80'));
    for (let i = -3; i <= 3; i++) if (h(i, Math.floor(t * 4), 820) < 0.5) pset(x + i, y + 3, hex('#4a6090')); }
  R.recorte(null);
}

// la pantalla del escáner (hueco S): el corte de rayos X del terrón en grises —la silueta rota, el grano, las ruedas de
// dientes que asoman y las filas de garabatos ilegibles— que una raya clara recorre de arriba abajo; la retícula del
// visor y la barra de grises a la derecha. Devuelve dónde está la raya
function g_pantallaEscaner(R, t, S) {
  const { pset, linea } = R, [x0, y0, x1, y1] = S, cx = x0 + 24, cy = y0 + 17;
  R.recorte(S);
  const ry = y0 + ((t * 9) % (y1 - y0 + 8)) - 4;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1 - 8; x++) {
    const dx = x - cx, dy = (y - cy) * 1.25, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx), borde = 14 + 3 * Math.sin(a * 3 + 1) + 2 * Math.sin(a * 7) - (a > 0.3 && a < 1.2 ? 5 : 0);
    let v = 0.05 + h(x, y, 821) * 0.04;
    if (d < borde) { v = 0.42 + h(x, y, 822) * 0.14 + (dx < 0 ? 0.06 : -0.04);
      for (const [gx, gy, gr, n] of [[-5, -2, 7, 14], [6, 3, 4.5, 10]]) { const ex = dx - gx, ey = dy - gy, e = Math.hypot(ex, ey); if (Math.abs(e - gr) < 0.8) v = 0.86; else if (e > gr && e < gr + 1.8 && Math.cos(Math.atan2(ey, ex) * n) > 0.3) v = 0.8; else if (Math.abs(e - gr * 0.3) < 0.6) v = 0.7; }
      if (Math.abs(dy + 9) < 0.6 && dx > -8 && dx < 8 && h(x, 1, 823) < 0.6) v = 0.75;
      if (d > borde - 1.2) v = 0.62; }
    if (y > ry) v *= 0.55;
    if (Math.abs(y - ry) < 1) v = Math.min(1, v + 0.45);
    const g = Math.round(v * 255), b = Math.min(255, g + 18);
    pset(x, y, (0xff000000 | (b << 16) | (Math.min(255, g + 6) << 8) | g) >>> 0);
  }
  // la barra de grises y la retícula
  for (let y = y0 + 2; y <= y1 - 2; y++) { const v = Math.round((1 - (y - y0) / (y1 - y0)) * 220) + 20; R.rect(x1 - 5, y, x1 - 2, y, (0xff000000 | (v << 16) | (v << 8) | v) >>> 0); }
  linea(x0 + 1, y0 + 1, x0 + 4, y0 + 1, hex('#5ad8ff')); linea(x0 + 1, y0 + 1, x0 + 1, y0 + 4, hex('#5ad8ff')); linea(x1 - 9, y1 - 1, x1 - 12, y1 - 1, hex('#5ad8ff')); linea(x1 - 9, y1 - 1, x1 - 9, y1 - 4, hex('#5ad8ff'));
  for (let i = -3; i <= 3; i++) { pset(cx + i, cy, hex('#ffd040')); pset(cx, cy + i, hex('#ffd040')); }
  R.recorte(null);
  return Math.round(ry);
}

// la pantalla de la simulación (hueco S): fondo de cuadrícula, el contador de días (cifras), tres ruedas de luz que
// engranan y giran con o.simula 0–1, y la barra de avance; con o.choca 0–1 los dientes de la rueda pequeña y la
// mediana chocan: destello rojo que late, las dos ruedas en rojo, el tren tiembla, la «!» y la barra en rojo
function g_pantallaSimula(R, t, S, o) {
  const { pset, linea, disco } = R, [x0, y0, x1, y1] = S, si = Math.max(0, Math.min(1, o.simula ?? 0)), ch = Math.max(0, Math.min(1, o.choca ?? 0));
  R.recorte(S);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, (x - x0) % 6 === 0 || (y - y0) % 6 === 0 ? hex('#12284a') : hex('#0a1a34'));
  const tb = ch > 0 ? Math.sin(t * 40) * ch : 0, jx = Math.round(tb), A = si * 10 * Math.PI + (ch > 0.15 ? 0 : t * 0.4) + (ch > 0 ? Math.sin(t * 30) * 0.06 * ch : 0);
  const azul = [hex('#04101e'), hex('#2a8ac8'), hex('#1a5a90'), hex('#8ad8f8')], rojo = [hex('#1e0404'), hex('#d83a3a'), hex('#901a1a'), hex('#ff9a8a')];
  const G = [[x0 + 16 + jx, y0 + 20, 9, 18, A, azul], [x0 + 32 + jx, y0 + 14, 6, 12, -A * 18 / 12 + 0.2, ch > 0.15 ? rojo : azul], [x0 + 45 + jx, y0 + 20, 5, 10, A * 18 / 10 + 0.1, ch > 0.15 ? rojo : azul]];
  for (const [cx, cy, r, n, a, cols] of G) { g_rueda(R, cx, cy, r, n, a, cols, { diente: 2 }); disco(cx, cy, 1.2, hex('#e8f4ff')); }
  // el contador de días que sube con la simulación (se para al chocar)
  R.numero(String(Math.round(si * 120)), x1 - 17, y0 + 8, { color: ch > 0.15 ? hex('#ff8a7a') : hex('#8af0b0'), sombra: false, fina: true, centro: false, ...{} });
  // la barra de avance
  R.recorte(null); g_rc(R, S, x0 + 2, y1 - 3, x1 - 2, y1 - 2, hex('#1a2a44')); g_rc(R, S, x0 + 2, y1 - 3, x0 + 2 + Math.round((x1 - x0 - 4) * si), y1 - 2, ch > 0.15 ? (Math.sin(t * 12) > 0 ? hex('#ff4a4a') : hex('#a82a2a')) : hex('#4ae88a')); R.recorte(S);
  // el choque: destello entre la mediana y la pequeña, y la «!»
  let choque = null;
  if (ch > 0.05) { const px = x0 + 39 + jx, py = y0 + 17, f = 0.5 + 0.5 * Math.sin(t * 16); choque = [px, py];
    R.halo(px, py, 4 + 3 * f, [hex('#ff4a3a'), hex('#ffb0a0'), C.blanco], 1.2);
    for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + t * 4; linea(px + Math.cos(a) * 3, py + Math.sin(a) * 3, px + Math.cos(a) * (6 + 2 * f), py + Math.sin(a) * (6 + 2 * f), hex('#ffd0a0')); }
    if (f > 0.25) { const ex = x0 + 6, ey = y0 + 3; R.rect(ex, ey, ex + 2, ey + 6, hex('#ff4a4a')); R.rect(ex, ey + 8, ex + 2, ey + 9, hex('#ff4a4a')); } }
  R.recorte(null);
  return { choque };
}

// el fondo fijo del escritorio de noche
function g_ordenadorFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, N = g_N;
  // el papel pintado azul noche: rayas verticales y rombos pequeños; en la esquina de Atom y bajo el año, solo las rayas
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) {
    const xr = x % 16, yr = y % 16, raya = xr === 0 || xr === 1, rombo = Math.abs(xr - 8) + Math.abs(yr - 8) === 3, tranquila = (x > 266 && y < 52) || (x < 176 && y < 22);
    let c = raya ? N.papS : N.pap; if (rombo && !tranquila) c = (xr + yr) % 2 ? N.papL : N.papR; if (!raya && h(x, y, 830) < 0.06) c = N.papS;
    pset(x, y, c);
  }
  g_degradado(R, 0, 0, 319, 6, [hex('#141c30'), N.papS]);   // la sombra del techo
  // el zócalo de madera y el suelo de tarima oscura en perspectiva
  rect(0, 116, 319, 127, N.zoc); rect(0, 116, 319, 116, N.zocL); rect(0, 121, 319, 121, N.zocD); rect(0, 127, 319, 127, N.zocD);
  for (let x = 6; x < 320; x += 40) rect(x, 117, x, 126, N.zocD);
  let y = 128; for (const alto of [3, 4, 5, 6, 7, 9, 11, 12]) { const y1 = Math.min(179, y + alto - 1); g_madera(R, 0, y, 319, y1, N.suelo, N.sueloS, N.sueloL, N.sueloD, 60 + alto, alto); y = y1 + 1; }
  // la alfombra azul con su cenefa, bajo la zona libre
  poligono([[18, 146], [102, 146], [110, 172], [8, 172]], hex('#1a2238')); poligono([[20, 147], [100, 147], [107, 170], [11, 170]], hex('#3a4a7a'));
  poligono([[24, 150], [96, 150], [101, 166], [17, 166]], hex('#2a3660')); for (let x = 22; x < 102; x += 4) pset(x, 148, hex('#c8a858')); for (let x = 14; x < 106; x += 4) pset(x, 168, hex('#c8a858'));
  // la luz de la Luna que entra por la ventana y cae en el suelo (un paralelogramo frío y tenue)
  for (let yy = 130; yy < 160; yy++) { const xa = 20 + (yy - 130) * 1.1, xb = xa + 46; for (let x = Math.round(xa); x < xb; x++) if (g_b4(x, yy) < 0.4 && !((x - xa) > 21 && (x - xa) < 25)) { const c = R.pget(x, yy); pset(x, yy, g_mezcla(c, hex('#9ab8e8'), 0.22)); } }
  // LA VENTANA: marco blanco en sombra azul, la cruz, el alféizar; las cortinas de terciopelo azul a los lados
  rect(12, 24, 76, 96, hex('#8a94a8')); rect(12, 24, 76, 25, hex('#b8c0d0')); rect(14, 26, 74, 96, C.k);
  rect(43, 26, 45, 96, hex('#8a94a8')); rect(14, 60, 74, 61, hex('#8a94a8'));
  rect(8, 96, 80, 100, hex('#a8b0c0')); rect(8, 96, 80, 96, hex('#d0d8e4')); rect(8, 100, 80, 101, hex('#5a6278'));
  for (const [xa, xb] of [[2, 13], [75, 86]]) for (let yy = 20; yy < 112; yy++) for (let x = xa; x <= xb; x++) { const f = Math.sin((x - xa) * 1.1 + yy * 0.02); pset(x, yy, x === xa || x === xb ? hex('#141a34') : f > 0.5 ? hex('#3a4a84') : f < -0.4 ? hex('#1c2448') : hex('#2a3668')); }
  rect(0, 21, 90, 22, hex('#8a6a3a')); rect(0, 21, 90, 21, hex('#c8a060'));
  // la balda con libros, la escafandra de juguete y la cajita del mecanismo de cartón
  rect(116, 60, 214, 63, N.mesaD); rect(116, 60, 214, 60, N.mesaL); rect(117, 61, 213, 62, N.mesa);
  for (const x of [124, 204]) { rect(x, 64, x + 2, 70, N.mesaD); linea(x, 64, x + 4, 64, N.mesaD); }
  g_tinte(R, 116, 64, 214, 67, C.k, 0.3, true);
  g_lomos(R, 118, 168, 59, 15, [hex('#8a3a32'), hex('#2a4a7a'), hex('#a8883a'), hex('#3a6a4a'), hex('#5a3a6a'), hex('#a8a090')], 3);
  { const cx = 178, cy = 52; disco(cx, cy, 6.5, C.k); disco(cx, cy, 5.5, hex('#b8723a')); disco(cx - 1, cy - 1, 3.5, hex('#d8924a')); disco(cx + 1, cy, 2.6, C.k); disco(cx + 1, cy, 1.8, hex('#6a8ab8')); pset(cx, cy - 1, hex('#c8e0f8')); rect(cx - 5, cy + 5, cx + 5, cy + 7, hex('#8a5a2a')); pset(cx - 4, cy - 3, hex('#f0b070')); }
  { rect(190, 50, 210, 59, C.k); rect(191, 51, 209, 59, g_CARTON.c); rect(191, 51, 209, 51, g_CARTON.cL); g_rueda(R, 197, 55, 3, 8, 0.2, [C.k, g_CARTON.cL, g_CARTON.cS, C.blanco], { diente: 1 }); g_rueda(R, 204, 54, 2.2, 6, 0.5, [C.k, hex('#a86a38'), hex('#7a4620'), hex('#d08a50')], { diente: 1 }); pset(197, 55, hex('#f0c040')); }
  // el cuadro de las espirales de atrás (las de la máquina, en papel)
  rect(218, 28, 262, 74, hex('#1e140c')); rect(220, 30, 260, 72, hex('#5a3e24')); rect(222, 32, 258, 70, hex('#c8bc9a'));
  for (const [cx, cy, vu] of [[240, 42, 5], [240, 61, 4]]) { for (let k = 0; k < vu * 40; k++) { const a = k / 40 * Math.PI * 2, r = 1.5 + k / 40 * 1.6; pset(Math.round(cx + Math.cos(a) * r * 1.3), Math.round(cy + Math.sin(a) * r * 0.85), hex('#5a4a3a')); } }
  pset(232, 40, hex('#3a2a1a')); disco(249, 63, 1.2, hex('#3a2a1a')); pset(229, 60, hex('#8a3a2a'));
  // el resplandor frío de las pantallas en la pared y el cálido del flexo (horneados)
  g_charco(R, 190, 112, 82, 26, hex('#5a8ac8'), 0.35);
  g_charco(R, 262, 128, 40, 22, N.calido, 0.3);
  // LA MESA de madera: el tablero visto desde arriba, el canto, el cajonero de la izquierda y las patas
  rect(104, 138, 302, 147, N.mesaD); g_madera(R, 105, 139, 301, 146, N.mesa, N.mesaS, N.mesaL, N.mesaD, 70, 4);
  rect(104, 147, 302, 150, N.mesaS); rect(104, 147, 302, 147, N.mesaL); rect(104, 150, 302, 150, N.mesaD);
  rect(108, 151, 136, 162, N.mesaD); rect(109, 151, 135, 161, N.mesaS); for (const yy of [151, 156]) { rect(110, yy + 1, 134, yy + 4, N.mesa); rect(119, yy + 2, 125, yy + 2, hex('#c8a060')); }
  rect(296, 151, 300, 162, N.mesaD); rect(297, 151, 298, 161, N.mesa);
  g_tinte(R, 137, 151, 295, 162, C.k, 0.45, true);
  // la torre bajo la mesa y la papelera con bolitas de papel
  rect(262, 151, 278, 162, C.k); rect(263, 152, 277, 161, hex('#2a2e3a')); rect(263, 152, 264, 161, hex('#4a5060')); for (let yy = 154; yy < 160; yy += 2) rect(266, yy, 270, yy, hex('#14161e'));
  rect(226, 154, 240, 162, C.k); for (let x = 227; x < 240; x++) for (let yy = 155; yy < 162; yy++) pset(x, yy, (x + yy) % 3 ? hex('#5a6070') : hex('#3a4050')); rect(226, 154, 240, 154, hex('#8a90a0'));
  disco(231, 153, 2, hex('#d8d4c8')); disco(235, 153, 1.6, hex('#c8c4b8'));
  // LAS DOS PANTALLAS: marco negro con su brillo, pie y base
  for (const [x0, x1] of [[124, 190], [192, 258]]) { rect(x0, 98, x1, 138, hex('#14161e')); rect(x0, 98, x1, 98, hex('#4a4e5e')); rect(x0, 98, x0, 138, hex('#3a3e4a')); rect(x0 + 2, 136, x1 - 2, 137, hex('#2a2c36')); pset(x1 - 4, 137, hex('#5ad8ff'));
    const m = (x0 + x1) >> 1; rect(m - 3, 139, m + 3, 141, hex('#2a2c36')); rect(m - 9, 142, m + 9, 143, hex('#1a1c24')); rect(m - 9, 142, m + 9, 142, hex('#5a5e6e')); }
  // el teclado, el ratón con su alfombrilla, la lupa, los papeles con ruedas dibujadas
  rect(150, 142, 200, 146, C.k); rect(151, 142, 199, 145, hex('#3a3e4a')); for (let x = 152; x < 199; x += 2) { pset(x, 143, hex('#8a90a0')); pset(x + 1, 144, hex('#6a7080')); } rect(160, 145, 186, 145, hex('#5a6070'));
  rect(206, 142, 222, 146, hex('#1a2238')); disco(214, 144, 2.2, C.k); disco(214, 144, 1.5, hex('#c8ccd8')); pset(213, 143, C.blanco); linea(214, 142, 212, 136, hex('#2a2a2a'));
  poligono([[228, 140], [248, 139], [250, 146], [226, 147]], hex('#c8c0a8')); R.anillo(236, 143, 2.5, hex('#5a5a6a')); R.anillo(243, 142.5, 1.8, hex('#5a5a6a')); linea(229, 145, 247, 144, hex('#9a94a0'));
  R.anillo(268, 143, 3.5, C.k); R.anillo(268, 143, 2.8, hex('#c8a040')); disco(268, 143, 2, hex('#6a8ab0')); pset(267, 142, C.blanco); linea(271, 145, 278, 146, C.k); linea(271, 144, 278, 145, hex('#3a2a1a'));
  // la taza (de la que sube el vapor) con su asa
  rect(113, 134, 122, 143, C.k); rect(114, 135, 121, 142, hex('#c84a3a')); rect(114, 135, 115, 142, hex('#e87a6a')); rect(114, 135, 121, 136, hex('#3a2014')); R.anillo(123.5, 138.5, 2.5, C.k);
  // EL FLEXO: base, brazo articulado con su muelle, la pantalla que mira a la mesa y la bombilla
  rect(280, 141, 292, 143, C.k); rect(281, 141, 291, 142, hex('#2a6a5a'));
  linea(286, 141, 290, 112, C.k); linea(287, 141, 291, 112, hex('#3a8a7a')); linea(290, 112, 274, 100, C.k); linea(290, 113, 274, 101, hex('#3a8a7a')); disco(290, 112, 1.6, hex('#c8c8c8'));
  for (let k = 0; k < 5; k++) pset(288 + (k & 1), 118 + k * 4, hex('#c8c8c8'));
  poligono([[266, 98], [278, 96], [282, 106], [262, 110]], C.k); poligono([[267, 99], [277, 97], [280, 105], [264, 108]], hex('#2a8a7a')); linea(267, 99, 277, 97, hex('#6ac8b8'));
  disco(271, 108, 2.4, hex('#fff4c8')); R.halo(271, 110, 7, [N.calido, hex('#fff4d8')], 0.9);
}

// la planta grande de la esquina, delante de los personajes (x 292–319, y 120–179): la maceta de barro con su luz y
// hojas anchas en abanico que se mecen un poco
function g_plantaDelante(R, t) {
  const { rect, pset, poligono } = R;
  for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.22 + Math.sin(t * 0.9 + k) * 0.04, L = 22 + (k % 3) * 8, bx = 306, by = 160, ex = bx + Math.cos(a) * L, ey = by + Math.sin(a) * L, nx = -Math.sin(a), ny = Math.cos(a), w = 4 + (k % 2);
    poligono([[bx, by], [bx + Math.cos(a) * L * 0.5 + nx * w, by + Math.sin(a) * L * 0.5 + ny * w], [ex, ey], [bx + Math.cos(a) * L * 0.5 - nx * w, by + Math.sin(a) * L * 0.5 - ny * w]], k % 2 ? hex('#1e3a2a') : hex('#2a4a34'));
    R.linea(bx, by, ex, ey, hex('#4a6a4a')); R.linea(bx + nx * 1, by + ny, ex + nx * w * 0.4, ey + ny * w * 0.4, hex('#3a5a40')); }
  rect(294, 158, 319, 179, C.k); rect(295, 159, 319, 179, hex('#8a4a2a')); rect(295, 159, 299, 179, hex('#a86a40')); rect(312, 159, 319, 179, hex('#6a3420')); rect(293, 158, 319, 161, hex('#9a5a34')); rect(293, 158, 319, 158, hex('#c88a5a'));
  for (let y = 164; y < 179; y += 5) for (let x = 297; x < 319; x += 3) pset(x, y, hex('#6a3420'));
}

// EL AULA (cámara 'globo' del encuadre 'ordenador'): el fondo fijo en su búfer; encima, el patio por la ventana, el reloj
// que anda, las motas en el rayo de sol, la lámpara-Sol que zumba, el globo que gira y la pelotita-Luna que le da vueltas
// (detrás del globo cuando pasa por el lado de allá)
function g_aula(R, t, o) {
  const { pset, linea, disco } = R;
  R.copiar(g_capa(R, 'aula', () => g_aulaFijo(R)));
  g_patio(R, t, [206, 28, 266, 98]);
  // la persiana a medias (lamas que tiemblan con el aire de la ventana abierta) y su cordón que se mece
  for (let y = 28; y <= 54; y += 3) { const sw = Math.round(Math.sin(t * 1.6 + y * 0.3) * 0.6); R.rect(206, y + sw, 266, y + 1 + sw, hex('#e8e4d8')); R.rect(206, y + 2 + sw, 266, y + 2 + sw, hex('#b8b4a8')); }
  R.rect(206, 55, 266, 57, hex('#d8d4c8')); R.rect(206, 57, 266, 57, hex('#8a8678'));
  { const a = Math.sin(t * 1.2) * 0.15; linea(262, 57, 262 + Math.sin(a) * 18, 57 + 18, hex('#f0ece0')); disco(262 + Math.sin(a) * 18, 76, 1.5, hex('#c8c4b8')); }
  // el reloj de pared: el segundero anda
  { const cx = 297, cy = 52, a = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(cx, cy, cx + Math.round(Math.cos(a) * 4), cy + Math.round(Math.sin(a) * 4), hex('#d83a3a')); pset(cx, cy, C.k); }
  // las motas de polvo de tiza en el rayo de sol
  for (let k = 0; k < 14; k++) { const u = (t * (0.02 + h(k, 1, 840) * 0.03) + h(k, 2, 840)) % 1, y = Math.round(100 + h(k, 3, 840) * 50 - u * 30), x = Math.round(190 - (y - 100) * 0.6 + h(k, 4, 840) * 30 + Math.sin(t * 0.8 + k) * 3); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#fffbe8')); }
  // la lámpara-Sol: la bombilla con su halo que late un poco
  const LX = 204, LY = 108, f = 0.5 + 0.5 * Math.sin(t * 7) * Math.sin(t * 2.3);
  R.halo(LX, LY, 15 + f * 2, [hex('#f0e090'), hex('#f8eca8'), hex('#fff8d0')], 1.0); disco(LX, LY, 5, hex('#c8a040')); disco(LX, LY, 4.2, hex('#ffe680')); disco(LX - 0.5, LY - 0.5, 2.6, hex('#fff8d0')); disco(LX - 1, LY - 1, 1.2, C.blanco);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.6; if ((k + Math.floor(t * 3)) % 3) pset(Math.round(LX + Math.cos(a) * (6 + f)), Math.round(LY + Math.sin(a) * (6 + f)), hex('#ffe070')); }
  // el globo y la pelotita: o.gira 0–1 (dos vueltas el globo, una la pelotita); sin o.gira giran despacio
  const gi = o.gira, lon = (gi ?? 0) * 4 * Math.PI + t * 0.12, ap = (gi ?? 0) * 2 * Math.PI + t * 0.1 + 1;
  const GX = 236, GY = 118, px = GX + Math.cos(ap) * 24, py = GY - 2 + Math.sin(ap) * 5, delante = Math.sin(ap) >= 0;
  // el brazo de alambre que sale de lo alto del eje y el hilo con la pelotita
  const bola = () => { const ax = GX + Math.cos(ap) * 24, ay = GY - 22 + Math.sin(ap) * 4; linea(GX + 1, GY - 21, ax, ay, hex('#7a5a2a')); linea(ax, ay, px, py - 3, hex('#e8e4d8'));
    const rr = 4.6; for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d > rr) continue; const lit = (i * (LX - px) + j * (LY - py)) > 0;
      pset(Math.round(px) + i, Math.round(py) + j, d > rr - 0.9 ? hex('#2a2a34') : lit ? (d < 2 && i < 0 && j < 0 ? C.blanco : hex('#f4f0e2')) : hex('#5a5a6c')); } };
  if (!delante) bola();
  g_globo(R, GX, GY, 16, lon, -1);
  if (delante) bola();
  return { pelota: [Math.round(px), Math.round(py)], globo: [GX, GY], lampara: [LX, LY] };
}

// el patio del colegio por la ventana del aula (hueco V): el cielo tramado con nubes de tres tonos a tres velocidades, la
// tapia y los tejados de enfrente, dos árboles que se mecen, la canasta y una bandada; todo recortado al hueco
function g_patio(R, t, V) {
  const { pset, disco, linea } = R, [x0, y0, x1, y1] = V;
  R.recorte(V);
  g_degradado(R, x0, y0, x1, 78, [hex('#5a9ae0'), hex('#78b0e8'), hex('#a0c8f0'), hex('#c8e0f8')]);
  for (const [y, w, v, k, cols] of [[60, 12, 0.6, 0, [hex('#b8d0ea'), hex('#dceaf6'), hex('#f4f8fc')]], [68, 16, 1.2, 1, [hex('#a8c4e0'), hex('#e8f0f8'), C.blanco]], [62, 20, 2, 2, [hex('#98b8d8'), hex('#eef4fa'), C.blanco]]]) {
    const span = (x1 - x0) + w * 2 + 30, cx = x0 - w + ((h(k, 1, 845) * span + t * v) % span);
    for (const [dx, dy, r] of [[0, 1, w * 0.3], [w * 0.32, 0, w * 0.24], [-w * 0.32, 2, w * 0.2]]) disco(cx + dx, y + dy, r, cols[0]);
    for (const [dx, dy, r] of [[0, -1, w * 0.27], [w * 0.32, -2, w * 0.2], [-w * 0.32, 0, w * 0.17]]) disco(cx + dx, y + dy, r, cols[1]);
    disco(cx - 1, y - 3, w * 0.13, cols[2]);
  }
  // los tejados de enfrente y la tapia de ladrillo con su albardilla
  for (let x = x0; x <= x1; x++) { const tt = 76 - Math.round(4 * Math.max(0, Math.sin((x - x0) / 22 * Math.PI))); for (let y = tt; y < 84; y++) pset(x, y, y === tt ? hex('#d87a5a') : y < tt + 3 ? hex('#b85a3a') : hex('#e8dcc8')); }
  for (let y = 84; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y === 84 ? hex('#d8d0c0') : ((y - 85) % 4 === 3 || (x + ((y - 85) >> 2) * 4) % 8 === 0) ? hex('#a85a3a') : hex('#c8724a'));
  // la canasta del patio
  linea(256, 98, 256, 72, hex('#5a5a6a')); R.rect(250, 68, 262, 75, hex('#f4f4f0')); R.anillo(256, 77, 2.5, hex('#e86a2a'));
  // dos árboles que se mecen (copas de tres tonos)
  for (const [cx, cy, r, k] of [[216, 82, 10, 0], [242, 86, 8, 1]]) { linea(cx, cy + r - 2, cx, 98, hex('#5a3a22')); const sw = Math.sin(t * 1.3 + k * 2) * 1.5;
    for (let i = 0; i < 18; i++) { const a = h(i, k, 846) * Math.PI * 2, d = Math.sqrt(h(i, k, 847)) * r * 0.8, x = cx + Math.cos(a) * d + sw * (1 - d / r), y = cy + Math.sin(a) * d * 0.8; disco(x, y, r * 0.38, i % 3 === 0 ? hex('#3a7a3a') : i % 3 === 1 ? hex('#5a9a4a') : hex('#7ab85a')); } }
  // la bandada
  for (let k = 0; k < 4; k++) { const x = Math.round(x0 + ((t * (5 + k) + k * 17) % (x1 - x0 + 20)) - 10), y = Math.round(y0 + 34 + k * 4 + Math.sin(t + k) * 2), a = Math.sin(t * 9 + k * 2) > 0 ? -1 : 1; pset(x, y, hex('#3a3a4a')); pset(x - 1, y + a, hex('#3a3a4a')); pset(x + 1, y + a, hex('#3a3a4a')); }
  R.recorte(null);
}

// el fondo fijo del aula
function g_aulaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // la pared verde pálido con su textura de pintura y la sombra del techo; el zócalo de azulejos con sus juntas
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 850); pset(x, y, n < 0.12 ? hex('#c8dcc0') : n > 0.94 ? hex('#e4f0dc') : hex('#d6e6ce')); }
  g_degradado(R, 0, 0, 319, 8, [hex('#b8ccb0'), hex('#d6e6ce')]);
  rect(0, 112, 319, 113, hex('#5a8a6a')); rect(0, 112, 319, 112, hex('#7aaa8a'));
  for (let y = 114; y < 128; y++) for (let x = 0; x < 320; x++) { const jx = x % 8 === 7, jy = (y - 114) % 7 === 6; pset(x, y, jx || jy ? hex('#a8b8a8') : ((x >> 3) + ((y - 114) / 7 | 0)) % 2 ? hex('#e8f0e8') : hex('#f4f8f2')); if (!jx && !jy && (x % 8) === 1 && (y - 114) % 7 === 1) pset(x, y, C.blanco); }
  // el linóleo a cuadros en perspectiva (fuga en x 160): crema y gris verdoso, con brillo y rozaduras
  for (let y = 128; y < 180; y++) { const z = (y - 120) / 60, fila = Math.floor(Math.log(z * 8) * 4); for (let x = 0; x < 320; x++) { const col = Math.floor(((x - 160) / z) / 26 + 100);
      let c = (col + fila) % 2 ? hex('#e8e2d0') : hex('#9aaa98'); if (h(x, y, 851) < 0.04) c = g_mezcla(c, C.k, 0.12); pset(x, y, c); } }
  rect(0, 128, 319, 128, hex('#4a6a5a'));
  // el rayo de sol de la ventana en el suelo
  for (let y = 132; y < 160; y++) { const xa = 196 - (y - 132) * 0.9, xb = xa + 64; for (let x = Math.round(xa); x < xb; x++) if (g_b4(x, y) < 0.45 && ((x - xa) % 32) < 29) pset(x, y, g_mezcla(R.pget(x, y), hex('#fff6d0'), 0.35)); }
  // el póster de las fases de la Luna (izquierda)
  rect(6, 34, 28, 82, hex('#2a3a5a')); rect(7, 35, 27, 81, hex('#1a2a4a')); rect(6, 34, 28, 34, hex('#5a6a8a'));
  for (let k = 0; k < 5; k++) { const cy = 42 + k * 9; disco(17, cy, 3.4, hex('#3a4a6a')); disco(17 + (k - 2) * 1.4, cy, k === 2 ? 3.4 : 2.6, hex('#f0ecd8')); if (k === 0) disco(17, cy, 3.4, hex('#3a4a6a')); }
  pset(17, 35, hex('#d83a3a'));
  // LA PIZARRA: marco de madera, el verde con borrones de tiza, los dibujos de tiza (el Sol, la órbita de la Tierra a
  // trazos, la Tierra con la órbita de la Luna, la línea de un eclipse con la sombra) y la repisa con tizas y borrador
  rect(32, 26, 190, 88, hex('#5a3a22')); rect(32, 26, 190, 26, hex('#8a5a32')); rect(33, 27, 189, 87, hex('#7a4a2a'));
  for (let y = 28; y <= 86; y++) for (let x = 34; x <= 188; x++) { const n = h(x >> 2, y >> 1, 852); pset(x, y, n < 0.18 ? hex('#3a5a48') : n > 0.9 ? hex('#4a6a58') : hex('#2e4e3e')); }
  for (let k = 0; k < 4; k++) { const cx = 60 + k * 36, cy = 40 + (k % 2) * 30; for (let i = -12; i < 12; i++) for (let j = -2; j <= 2; j++) if (h(i, j + k, 853) < 0.4) pset(cx + i + j, cy + j, hex('#5a7a68')); }
  const Z = hex('#f0f0e4'), Zs = hex('#c8d0c0');
  disco(58, 57, 7, hex('#f0e090')); R.anillo(58, 57, 7, Z); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; linea(58 + Math.cos(a) * 9, 57 + Math.sin(a) * 9, 58 + Math.cos(a) * 12, 57 + Math.sin(a) * 12, hex('#f0e090')); }
  for (let k = 0; k < 90; k++) { if (k % 3 === 2) continue; const a = k / 90 * Math.PI * 2; pset(Math.round(100 + Math.cos(a) * 48), Math.round(57 + Math.sin(a) * 20), Zs); }
  disco(148, 57, 4, hex('#8ab8e8')); R.anillo(148, 57, 4, Z); R.anillo(148, 57, 9, Zs, 4); disco(157, 55, 1.6, Z);
  for (let x = 66; x < 140; x += 3) pset(x, 76, Z); poligono([[150, 72], [176, 69], [176, 83]], hex('#3a5040')); linea(150, 72, 176, 69, Zs); linea(150, 80, 176, 83, Zs); disco(146, 76, 3, hex('#8ab8e8')); disco(156, 76, 1.8, Z);
  linea(170, 40, 182, 40, Z); linea(182, 40, 179, 37, Z); linea(182, 40, 179, 43, Z); R.anillo(176, 52, 3, Z, 2);
  rect(30, 88, 192, 91, hex('#6a4426')); rect(30, 88, 192, 88, hex('#a07040'));
  for (const [x, c] of [[60, '#f4f4ec'], [66, '#f0a0a0'], [140, '#a0c8f0']]) rect(x, 86, x + 4, 87, hex(c)); rect(100, 84, 112, 87, hex('#3a3a4a')); rect(100, 84, 112, 85, hex('#c8a060'));
  // los dibujos de los alumnos en la tira de corcho, bajo la pizarra (soles, lunas, una casa, un barco, ruedas)
  rect(36, 95, 186, 107, hex('#a87a4a')); for (let k = 0; k < 40; k++) pset(36 + Math.floor(h(k, 1, 854) * 150), 95 + Math.floor(h(k, 2, 854) * 12), hex('#8a5a32'));
  for (let k = 0; k < 6; k++) { const x = 40 + k * 24, y = 96 + (k % 2), tilt = (k % 3) - 1; rect(x, y, x + 16, y + 10, hex('#8a7a6a')); rect(x, y, x + 15, y + 9, k % 2 ? hex('#fffaf0') : hex('#f4f0ff')); pset(x + 7, y, hex(['#d83a3a', '#3a8ad8', '#e8c040'][k % 3]));
    if (k === 0) { disco(x + 7, y + 5, 2.5, hex('#f0c030')); for (let a = 0; a < 6; a++) pset(x + 7 + Math.round(Math.cos(a) * 4), y + 5 + Math.round(Math.sin(a) * 4), hex('#f0a030')); }
    if (k === 1) { disco(x + 8, y + 5, 3, hex('#c8c8d8')); disco(x + 9, y + 4, 2.5, k % 2 ? hex('#fffaf0') : hex('#f4f0ff')); }
    if (k === 2) { rect(x + 4, y + 4, x + 11, y + 8, hex('#d87a4a')); poligono([[x + 3, y + 4], [x + 7, y + 1], [x + 12, y + 4]], hex('#c83a3a')); }
    if (k === 3) { rect(x + 3, y + 7, x + 12, y + 8, hex('#3a6ab8')); poligono([[x + 7, y + 2], [x + 7, y + 6], [x + 11, y + 6]], hex('#d83a3a')); }
    if (k === 4) { R.anillo(x + 6, y + 5, 3, hex('#8a5a32')); R.anillo(x + 11, y + 4, 2, hex('#5a5a6a')); }
    if (k === 5) { disco(x + 8, y + 5, 3.4, hex('#3a8ad8')); pset(x + 7, y + 4, hex('#4aa84a')); pset(x + 9, y + 6, hex('#4aa84a')); } }
  // LA VENTANA del patio: el marco blanco, el alféizar con una maceta de geranios
  rect(202, 24, 270, 100, hex('#e8e8e0')); rect(202, 24, 270, 24, C.blanco); rect(268, 26, 270, 100, hex('#b8b8b0')); rect(206, 28, 266, 98, C.k);
  rect(198, 100, 274, 104, hex('#d8d8d0')); rect(198, 100, 274, 100, C.blanco); rect(198, 104, 274, 105, hex('#8a8a80'));
  rect(208, 92, 218, 99, C.k); rect(209, 93, 217, 99, hex('#c8603a')); for (const [x, y, c] of [[210, 89, '#d83a4a'], [214, 87, '#e84a5a'], [216, 90, '#d83a4a'], [212, 91, '#4a8a3a'], [217, 92, '#4a8a3a']]) disco(x, y, 1.8, hex(c));
  g_tinte(R, 202, 106, 274, 110, C.k, 0.15, true);
  // el armario de los libros con sus puertas de cristal, la planta de encima y el reloj de pared
  rect(276, 70, 318, 162, hex('#4a2e1a')); rect(277, 71, 317, 161, hex('#8a5a34')); rect(277, 71, 317, 72, hex('#b07a4a'));
  for (const y of [82, 102, 122]) { rect(279, y, 315, y + 1, hex('#5a3a22')); g_lomos(R, 280, 314, y - 1, 9, [hex('#c84a3a'), hex('#3a6aa8'), hex('#e0b040'), hex('#4a8a5a'), hex('#7a4a98')], y); }
  rect(279, 124, 315, 160, hex('#6a4426')); rect(296, 124, 297, 160, hex('#4a2e1a')); rect(292, 140, 293, 144, hex('#e8c060')); rect(300, 140, 301, 144, hex('#e8c060'));
  for (let y = 74; y < 122; y++) if ((y + 6) % 14 < 2) for (let x = 280; x < 314; x++) if (h(x, y, 855) < 0.5) pset(x, y, g_mezcla(R.pget(x, y), C.blanco, 0.25));
  rect(290, 62, 304, 70, C.k); rect(291, 63, 303, 70, hex('#c8603a')); rect(291, 63, 303, 64, hex('#e88a5a'));
  for (let k = 0; k < 10; k++) { const a = -Math.PI + 0.3 + k * 0.28, L = 6 + (k % 3) * 2; linea(297, 62, 297 + Math.cos(a) * L, 62 + Math.sin(a) * L * 0.6, k % 2 ? hex('#4a8a3a') : hex('#6aaa4a')); }
  disco(297, 52, 6, C.k); disco(297, 52, 5, hex('#f8f8f0')); R.anillo(297, 52, 5, hex('#3a3a4a'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(297 + Math.cos(a) * 3.8), Math.round(52 + Math.sin(a) * 3.8), hex('#3a3a4a')); }
  linea(297, 52, 297, 49, C.k); linea(297, 52, 299, 53, C.k);
  // LA MESA DEL PROFESOR: tablero de madera, el faldón de delante con sus paneles y su sombra en el suelo
  g_tinte(R, 184, 162, 276, 166, C.k, 0.3, true);
  rect(184, 138, 274, 146, hex('#4a2e1a')); g_madera(R, 185, 139, 273, 145, hex('#b07a4a'), hex('#8a5a34'), hex('#d09a64'), hex('#5a3a22'), 90, 4);
  rect(184, 146, 274, 162, hex('#5a3a22')); rect(186, 147, 272, 161, hex('#7a4a2a')); rect(186, 147, 272, 147, hex('#a87040'));
  for (const x0 of [190, 220, 250]) { rect(x0, 150, x0 + 18, 159, hex('#6a4024')); rect(x0, 150, x0 + 18, 150, hex('#4a2a14')); rect(x0, 159, x0 + 18, 159, hex('#9a6a3a')); }
  // en la mesa: la lámpara-Sol (pie y cable), los libros apilados, el bote de tizas, una manzana, las gafas
  rect(198, 136, 210, 138, C.k); rect(199, 136, 209, 137, hex('#5a5a6a')); linea(204, 136, 204, 112, C.k); linea(205, 136, 205, 112, hex('#8a8a9a')); rect(201, 111, 207, 113, hex('#c8c8d0'));
  linea(198, 138, 190, 142, hex('#2a2a2a'));
  for (let k = 0; k < 3; k++) { const y = 137 - k * 3, c = [hex('#3a6aa8'), hex('#c84a3a'), hex('#4a8a5a')][k]; rect(256, y - 2, 270, y, C.k); rect(257, y - 2, 269, y - 1, c); rect(266, y - 2, 269, y - 1, hex('#f4f0e0')); }
  disco(262, 126, 2.8, hex('#c83a2a')); pset(261, 125, hex('#f08a7a')); linea(262, 123, 263, 121, hex('#5a3a1a')); pset(264, 122, hex('#4a8a3a'));
  // el pie del globo (madera torneada) en la mesa
  rect(229, 136, 243, 138, C.k); rect(230, 136, 242, 137, hex('#8a5a34')); rect(234, 132, 238, 136, hex('#6a4024')); rect(235, 132, 236, 136, hex('#a87040'));
}

// lo de delante del aula: dos pupitres de la primera fila, de espaldas a nosotros, por debajo de los pies (x 0–74 y
// 112–186, tablero en y 166–170), con un cuaderno, un estuche y una mochila colgada
function g_pupitresDelante(R, t) {
  const { rect, pset, linea } = R;
  for (const [x0, x1, k] of [[-2, 74, 0], [112, 186, 1]]) {
    rect(x0, 165, x1, 171, C.k); rect(x0 + 1, 166, x1 - 1, 169, hex('#d8b07a')); rect(x0 + 1, 166, x1 - 1, 166, hex('#f0d0a0')); rect(x0 + 1, 170, x1 - 1, 170, hex('#9a6a3a'));
    for (let x = x0 + 4; x < x1 - 2; x += 9) pset(x, 167 + (x % 2), hex('#b88a5a'));
    rect(x0 + 1, 171, x1 - 1, 179, hex('#3a3a44')); rect(x0 + 1, 171, x1 - 1, 172, hex('#5a5a66'));
    for (const lx of [x0 + 5, x1 - 7]) { rect(lx, 172, lx + 2, 179, hex('#8a8a96')); pset(lx, 172, hex('#c8c8d0')); }
    if (k === 0) { rect(20, 163, 40, 167, hex('#2a5aa8')); rect(21, 163, 39, 164, hex('#4a7ac8')); rect(30, 163, 30, 167, hex('#f4f0e0')); linea(44, 166, 54, 164, hex('#f0c030')); pset(54, 164, hex('#3a3a3a')); }
    else { rect(130, 162, 150, 167, C.k); rect(131, 163, 149, 166, hex('#d84a6a')); rect(131, 163, 149, 163, hex('#f07a8a')); rect(160, 168, 172, 179, hex('#3a7a5a')); rect(160, 168, 172, 169, hex('#5a9a7a')); rect(165, 172, 167, 174, hex('#e8c060')); }
  }
}
