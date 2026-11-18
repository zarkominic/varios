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
// o.encuadre (y o.camara). Lo de delante va en marDelante (se llama después de los actores). Opciones de todo el grupo:
// o.luz 'dia' (por omisión) | 'tormenta' (nubes negras, lluvia, olas grandes) | 'tarde'.
//   'cala': LA ISLA DE ANTICITERA desde el mar: acantilados de caliza ocre con matorral, una cala abrigada de agua
//     turquesa, el CAÍQUE (canon) fondeado con la vela recogida y la BOMBA DE AIRE en cubierta (dos hombres pequeños la
//     giran si o.bomba 1), la manguera que baja al agua con burbujas; gaviotas; en el horizonte, Creta difuminada.
//     o.tormenta 0–1: el cielo se cierra, el mar se pica y el caíque entra a refugiarse (de fuera de cuadro a la cala).
//     Deja sitio en la cubierta para stadiatisAK (que se pone la escafandra) y kontosAK. Devuelve suelo 150 (la
//     cubierta), libre [140, 260], burbujas: [x, y], horizonte: y. Cámara 'cubierta': LA CUBIERTA DEL CAÍQUE de cerca:
//     tablas, la bomba de aire con sus volantes, la manguera enrollada, redes y esponjas secándose colgadas, cestos, la
//     borda con la escalerilla que baja al agua y el mar que sube y baja detrás. Devuelve suelo 158, libre [20, 250],
//     escalera: [x, y], bomba: [x, y].
//   'rescate': EL RESCATE DE 1900–1901: el barco de vapor de la marina griega (casco gris, una chimenea con humo, la
//     bandera de franjas azules y blancas con la cruz, sin escudo) junto al caíque, una grúa de madera que iza con
//     cuerdas una ESTATUA de bronce que chorrea agua (o.iza 0–1), botes, buzos que suben y bajan; la isla detrás.
//     Devuelve suelo 152, libre [30, 230], gancho: [x, y]. Cámara 'hallazgos': LA CUBIERTA CON LOS HALLAZGOS: estatuas
//     de bronce y de mármol tumbadas sobre lonas, ánforas, vasos de vidrio, una caja de madera con joyitas que brillan; y
//     en un rincón, unos TERRONES verdes (canon) en un cesto que nadie mira (o.terron 0–1: un brillito de una rueda,
//     casi nada). Devuelve suelo 160, libre [20, 220], terrones: [x, y].
const V_MAR = {
  cala: { cam: 'cubierta', general: { col: ['#a8c8e0', '#2a6a9a'], geo: { suelo: 150, libre: [140, 260], burbujas: [120, 140], horizonte: 96 } }, cubierta: { col: ['#a8c8e0', '#8a5a34'], geo: { suelo: 158, libre: [20, 250], escalera: [270, 150], bomba: [90, 140] } } },
  rescate: { cam: 'hallazgos', general: { col: ['#a8c8e0', '#2a6a9a'], geo: { suelo: 152, libre: [30, 230], gancho: [200, 60] } }, hallazgos: { col: ['#a8c8e0', '#8a5a34'], geo: { suelo: 160, libre: [20, 220], terrones: [270, 150] } } },
};
export function mar(R, t, o = {}) {
  return vista(R, t, o, V_MAR);
}
export function marDelante(R, t, o = {}) {
  return {};
}

// ── B · El fondo y el naufragio ────────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en fondoDelante.
//   'naufragio': EL FONDO A UNOS 50 m: luz azul que baja en rayos desde arriba, partículas que flotan, arena y praderas de
//     posidonia que ondean, rocas con esponjas y erizos, EL BARCO ANTIGUO HUNDIDO (canon): tablas, ánforas, estatuas de
//     bronce y mármol tumbadas, un caballo de bronce; peces, un PULPO (el gag 3 lo usa la escena), burbujas. o.siluetas
//     0–1: con poca luz, las estatuas se ven como siluetas oscuras confusas (el susto del buzo) y al subir la luz se ve
//     que son estatuas (que no parezcan cuerpos de verdad). Deja sitio para buzoAK/stadiatisAK/kontosAK con escafandra.
//     Devuelve suelo 162, libre [20, 250], estatua: [x, y] (una de bronce con el brazo levantado, para el gag 2).
//     Cámara 'terron': EL TERRÓN EN EL FONDO de cerca (canon): medio enterrado en arena junto a un ánfora rota, con la
//     corrosión verde y la madera negra; o.brillo 0–1: un rayo de luz descubre una rueda dentada que asoma (para el
//     gancho). Devuelve terron: [x, y], suelo 180, libre [0, 0].
const V_FONDO = {
  naufragio: { cam: 'terron', general: { col: ['#2a6a9a', '#1a3a4a'], geo: { suelo: 162, libre: [20, 250], estatua: [200, 130] } }, terron: { col: ['#1a3a4a', '#c8b898'], geo: { suelo: 180, libre: [0, 0], terron: [160, 110] } } },
};
export function fondo(R, t, o = {}) {
  return vista(R, t, o, V_FONDO);
}
export function fondoDelante(R, t, o = {}) {
  return {};
}

// ── C · El Museo Arqueológico Nacional de Atenas, 1902 y 2005 ───────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en museoDelante.
//   'sala1902': UNA SALA DE TRABAJO DEL MUSEO EN 1902: paredes altas con molduras neoclásicas, ventanales con luz
//     dorada y polvo en el aire, estatuas en pedestales al fondo, vitrinas de madera y cristal, cajas con fragmentos y
//     etiquetas (rayas y números), y la MESA de Stais con el TERRÓN (canon) sobre un paño, una lupa grande, un
//     quinqué y papeles. o.polvo 0–1: pasan los años: el polvo cubre la vitrina, una telaraña, la luz cambia (para «medio
//     siglo»). Deja sitio para staisAK, spyridonAK, estudiosoAK, estudioso2AK. Devuelve suelo 160, libre [20, 250], mesa:
//     [x0, y0, x1, y1], vitrina: [x0, y0, x1, y1]. Cámara 'grieta': EL TERRÓN DE CERCA sobre el paño, con la lupa:
//     o.grieta 0–1: la madera seca se parte con un crujido y en la grieta aparece la RUEDA DENTADA (canon) que brilla.
//     Devuelve rueda: [x, y], suelo 180, libre [0, 0].
//   'escaner': LA SALA DEL MUSEO EN 2005 con el ESCÁNER de unas ocho toneladas: una máquina grande gris y blanca
//     (una cabina con puerta de plomo, luces de estado, cables), monitores en mesas, investigadores pequeños de fondo,
//     las vitrinas modernas; o.entra 0–1: el escáner entra por la PUERTA del museo sobre un carro, con un centímetro de
//     margen (el gag 5). Deja sitio para investigadorAK e investigadoraAK. Devuelve suelo 160, libre [20, 200], puerta:
//     [x0, y0, x1, y1], escaner: [x0, y0, x1, y1]. Cámara 'pantalla': UN MONITOR GRANDE de cerca con la imagen del
//     escáner: el fragmento en grises con sus capas; o.letras 0–1: aparecen FILAS DE GARABATOS DIMINUTOS que no se leen
//     (las inscripciones, canon); o.corte 0–1: un corte que recorre el fragmento y enseña ruedas por dentro. Devuelve
//     pantalla: [x0, y0, x1, y1].
const V_MUSEO = {
  sala1902: { cam: 'grieta', general: { col: ['#e8d8b8', '#7a5a3a'], geo: { suelo: 160, libre: [20, 250], mesa: [140, 125, 250, 150], vitrina: [30, 70, 100, 150] } }, grieta: { col: ['#7a5a3a', '#4a8a6a'], geo: { suelo: 180, libre: [0, 0], rueda: [160, 95] } } },
  escaner: { cam: 'pantalla', general: { col: ['#e8ecee', '#9aa0a8'], geo: { suelo: 160, libre: [20, 200], puerta: [30, 60, 90, 160], escaner: [180, 60, 280, 160] } }, pantalla: { col: ['#1a2030', '#9ab8d8'], geo: { suelo: 180, libre: [0, 0], pantalla: [50, 30, 270, 160] } } },
};
export function museo(R, t, o = {}) {
  return vista(R, t, o, V_MUSEO);
}
export function museoDelante(R, t, o = {}) {
  return {};
}

// ── D · El despacho de Price (1951–1974) ──────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en priceDelante.
//   'despacho': UN DESPACHO DE LOS AÑOS 50–70: estanterías con libros y cajas, una pizarra con ruedas dibujadas y números,
//     un escritorio de madera con una máquina de escribir, una regla de cálculo, un teléfono negro de disco (el gag 4: o.suena
//     1, tiembla), una lámpara de mesa, papeles con columnas de números; en la pared, un NEGATOSCOPIO con radiografías a
//     contraluz; y al fondo, por una puerta de cristal, el laboratorio con la máquina de rayos gamma (un brazo con su
//     cabezal sobre una mesa, con el terrón). Deja sitio para priceAK y karakalosAK. Devuelve suelo 160, libre [20, 240],
//     telefono: [x, y], negatoscopio: [x0, y0, x1, y1]. Cámara 'radiografia': LAS RADIOGRAFÍAS DE CERCA en el
//     negatoscopio: placas azuladas con capas de RUEDAS fantasmales unas encima de otras (como páginas pegadas); o.cuenta
//     0–1: unas marquitas de lápiz rojo van contando los dientes de una rueda, y o.pierde 1: se emborronan (el gag 4).
//     Devuelve rueda: [x, y, r].
const V_PRICE = {
  despacho: { cam: 'radiografia', general: { col: ['#c8b898', '#6a4a30'], geo: { suelo: 160, libre: [20, 240], telefono: [200, 125], negatoscopio: [60, 50, 140, 110] } }, radiografia: { col: ['#9ab8d8', '#2a3a5a'], geo: { suelo: 180, libre: [0, 0], rueda: [160, 90, 50] } } },
};
export function price(R, t, o = {}) {
  return vista(R, t, o, V_PRICE);
}
export function priceDelante(R, t, o = {}) {
  return {};
}

// ── E · La máquina reconstruida ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Es el decorado central del episodio: el máximo detalle, bronce que brilla, sombras, y TODO
// GIRA con o.giro (vueltas de manivela; por omisión t * 0.2). Sin letras: el zodiaco con iconitos, las inscripciones
// como garabatos. Lo de delante va en maquinaDelante.
//   'caja': EL MECANISMO DE FRENTE (canon) sobre una mesa de taller con herramientas antiguas y una lámpara de aceite:
//     la caja de madera, la esfera de delante con los dos anillos, las agujas del Sol y de la Luna y la bolita de las
//     fases; la MANIVELA a la derecha (gira con o.giro); o.fecha: un contador de números pequeño que avanza o retrocede
//     con la manivela; o.mareo 1: la bolita de la Luna da vueltas locas (el gag 6). Deja sitio a la izquierda para un
//     personaje o para Atom (que es la bola de arriba, no se pinta). Devuelve suelo 160, libre [20, 120], manivela:
//     [x, y], esfera: [x, y, r], bolita: [x, y]. Cámara 'dentro': LOS ENGRANAJES POR DENTRO (canon) a lo grande, con la
//     tapa quitada: ruedas de bronce de muchos tamaños girando en tren (cada una a su velocidad según sus dientes), la
//     rueda grande y las DOS RUEDECITAS CON LA CLAVIJA EN LA RANURA, que se mueven a tirones (rápido y lento); o.dos 1:
//     solo dos ruedas grandes de 20 y 40 dientes, una al lado de la otra, para el ejemplo de Price (la de 40 gira a la
//     mitad); o.atasco 0–1: dientes que chocan y el tren se para con un temblor. Devuelve clavija: [x, y], ruedas: [[x, y,
//     r]…].
//   'atras': LA PARTE DE ATRÁS (canon): las dos espirales con sus casillas, la aguja de cada una que recorre la espiral
//     (o.aguja 0–1), la esfera pequeña de los Juegos con 4 sectores (o.juegos 1: en sus sectores corren atletitas de 4 px),
//     las MARCAS de eclipse que se encienden una a una (o.eclipses 0–1); una lámpara ilumina de lado. Devuelve suelo 180,
//     libre [0, 0], arriba: [x, y, r], abajo: [x, y, r], juegos: [x, y, r]. Cámara 'rueda': LA RUEDA DE 223 DIENTES de
//     cerca, grande, con los dientes contados por una lucecita que los recorre (o.cuenta 0–1) y las dos ruedecitas de la
//     Luna montadas en ella; al lado, una palma de mano canónica para la escala (la pone la escena con T.mano: deja sitio
//     a la izquierda). Devuelve rueda: [x, y, r].
const V_MAQUINA = {
  caja: { cam: 'dentro', general: { col: ['#6a4a30', '#c8963a'], geo: { suelo: 160, libre: [20, 120], manivela: [262, 110], esfera: [190, 95, 45], bolita: [190, 80] } }, dentro: { col: ['#3a2a1c', '#c8963a'], geo: { suelo: 180, libre: [0, 0], clavija: [180, 90], ruedas: [[110, 90, 40], [200, 100, 50]] } } },
  atras: { cam: 'rueda', general: { col: ['#3a2a1c', '#c8963a'], geo: { suelo: 180, libre: [0, 0], arriba: [160, 60, 45], abajo: [160, 130, 40], juegos: [175, 55, 12] } }, rueda: { col: ['#2a1e14', '#c8963a'], geo: { suelo: 180, libre: [0, 0], rueda: [190, 95, 70] } } },
};
export function maquina(R, t, o = {}) {
  return vista(R, t, o, V_MAQUINA);
}
export function maquinaDelante(R, t, o = {}) {
  return {};
}

// ── F · La Grecia antigua, el cielo y lo que vino después ─────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en antiguaDelante. Opciones de todo el grupo: o.luz 'dia' | 'tarde' | 'noche'.
//   'taller': UN TALLER DE BRONCE EN RODAS O SIRACUSA, hacia el 150 a. C.: paredes de piedra encalada, una ventana al
//     puerto con trirremes y el mar (recortado), un banco con limas, compases, láminas de bronce y ruedas a medio cortar,
//     un HORNO pequeño con brasas (o.horno 1: un crisol que funde bronce viejo, para «se fundía»), ánforas, una lucerna,
//     un gato. Deja sitio para artesanoAK, hiparcoAK, arquimedesAK, posidonioAK. Devuelve suelo 160, libre [20, 240],
//     banco: [x0, y0, x1, y1], horno: [x, y]. Cámara 'cielo': EL CIELO DE NOCHE desde una terraza con columnas: estrellas
//     a montones, la Vía Láctea, la LUNA que cruza (o.luna 0–1, su posición; o.prisa 1: se adelanta y se atrasa a ratos,
//     para el truco), o.eclipse 0–1: un eclipse de Sol de día (el disco que se come y la corona) o de Luna (o.eclipse
//     'luna': se pone rojiza); un templo en la colina. Deja sitio para un astrónomo pequeño (hiparcoAK, babilonioAK).
//     Devuelve suelo 160, libre [20, 140], luna: [x, y].
//   'olimpia': EL ESTADIO DE OLIMPIA: la pista de tierra larga con las líneas de salida de piedra, los taludes de hierba
//     con gente pequeña sentada, el templo de Zeus y los olivos detrás, el sol; o.carrera 0–1: atletas que corren.
//     Devuelve suelo 158, libre [20, 260]. Cámara 'mapa': EL MAR MEDITERRÁNEO EN UN MAPA ANTIGUO (sin rótulos), papiro o
//     pergamino: Grecia, Sicilia, Creta, Asia Menor, Egipto, con barquitos; o.marca 'corinto' | 'siracusa' | 'rodas' |
//     'anticitera' | 'roma' | null: un circulito que late sobre ese lugar; o.ruta 'roma': una línea de puntos de Rodas
//     a Roma que pasa por Anticitera. Devuelve corinto: [x, y], siracusa: [x, y], rodas: [x, y], anticitera: [x, y], roma:
//     [x, y].
//   'reloj': UN RELOJ ASTRONÓMICO MEDIEVAL en la torre de una plaza europea (siglo XIV, de fantasía, sin copiar uno real):
//     la esfera grande azul y oro con el Sol y la Luna, figuritas, la plaza con gente pequeña y palomas. o.siglos 0–1: una
//     línea de tiempo de piedrecitas o hitos en el suelo que va desde la caja antigua hasta el reloj (para «mil
//     cuatrocientos años»). Devuelve suelo 160, libre [20, 240], esfera: [x, y, r]. Cámara 'tablillas': UN OBSERVATORIO
//     BABILONIO en una azotea de adobe al anochecer: tablillas de arcilla con marquitas (sin cuneiforme legible: rayitas),
//     un astrónomo pequeño que apunta, el cielo con la Luna; o.apunta 0–1: aparecen marquitas en una tablilla. Devuelve
//     suelo 160, libre [20, 220], tablilla: [x, y].
const V_ANTIGUA = {
  taller: { cam: 'cielo', general: { col: ['#e8dcc0', '#8a6a44'], geo: { suelo: 160, libre: [20, 240], banco: [150, 120, 260, 150], horno: [60, 130] } }, cielo: { col: ['#141a34', '#4a4a5a'], geo: { suelo: 160, libre: [20, 140], luna: [200, 60] } } },
  olimpia: { cam: 'mapa', general: { col: ['#b8d8f0', '#c8a878'], geo: { suelo: 158, libre: [20, 260] } }, mapa: { col: ['#efe6d0', '#7ab0c8'], geo: { suelo: 180, libre: [0, 0], corinto: [170, 80], siracusa: [80, 95], rodas: [240, 110], anticitera: [180, 110], roma: [50, 40] } } },
  reloj: { cam: 'tablillas', general: { col: ['#b8d0e8', '#9a8a6a'], geo: { suelo: 160, libre: [20, 240], esfera: [190, 70, 30] } }, tablillas: { col: ['#4a3a5a', '#c8a878'], geo: { suelo: 160, libre: [20, 220], tablilla: [200, 140] } } },
};
export function antigua(R, t, o = {}) {
  return vista(R, t, o, V_ANTIGUA);
}
export function antiguaDelante(R, t, o = {}) {
  return {};
}

// ── G · Hoy: el estudio de Atom ───────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Lo de delante va en hoyDelante.
//   'estudio': EL ESTUDIO DE ATOM: estanterías con libros (lomos sin letras), una ventana con el mar Egeo de hoy y una
//     isla (recortado), un globo terráqueo de aula, una lámpara, una alfombra, una planta, un póster de engranajes, y la
//     MESA con el MECANISMO DE CARTÓN (canon); o.gira 0–1: la manivela de lápiz gira; o.atasco 1: se atasca, tiembla y
//     una rueda de cartón sale rodando por el suelo (el gag 1); o.final 1: gira bien y una Luna de cartón sale volando
//     por la ventana (el gag 8). Devuelve suelo 158, libre [30, 230], carton: [x, y], ventana: [x0, y0, x1, y1]. Cámara
//     'carton': EL MECANISMO DE CARTÓN DE CERCA: las ruedas de cartón ondulado con dientes recortados, las chinchetas,
//     la manivela de lápiz, cinta adhesiva, una bolita de papel mitad pintada de negro; o.gira, o.atasco y o.final como
//     arriba. Devuelve manivela: [x, y].
//   'ordenador': EL ESCRITORIO CON EL ORDENADOR de Atom, de noche, con luz de flexo: dos pantallas (una con la imagen del
//     escáner del fragmento en grises, la otra con una simulación de ruedas que giran: o.simula 0–1; o.choca 1: dos
//     dientes chocan con un destello rojo y el tren se para), tazas, papeles con ruedas dibujadas, una lupa. Devuelve
//     suelo 160, libre [20, 120], pantallas: [[x0, y0, x1, y1], [x0, y0, x1, y1]]. Cámara 'globo': UN AULA de colegio con
//     un GLOBO TERRÁQUEO grande en la mesa del profesor, una lámpara que hace de Sol y una pelotita que hace de Luna
//     colgada (un modelo para enseñar), la pizarra con un dibujo de órbitas (sin letras), pupitres; o.gira 0–1: el globo
//     gira y la pelotita da vueltas. Devuelve suelo 160, libre [20, 200], globo: [x, y].
const V_HOY = {
  estudio: { cam: 'carton', general: { col: ['#e8d8c0', '#7a5a40'], geo: { suelo: 158, libre: [30, 230], carton: [150, 125], ventana: [220, 40, 270, 100] } }, carton: { col: ['#e8d8c0', '#c8a878'], geo: { suelo: 180, libre: [0, 0], manivela: [240, 100] } } },
  ordenador: { cam: 'globo', general: { col: ['#2a2a3a', '#5a4a3a'], geo: { suelo: 160, libre: [20, 120], pantallas: [[140, 50, 210, 100], [215, 50, 285, 100]] } }, globo: { col: ['#e8e0cc', '#7a5a40'], geo: { suelo: 160, libre: [20, 200], globo: [230, 110] } } },
};
export function hoy(R, t, o = {}) {
  return vista(R, t, o, V_HOY);
}
export function hoyDelante(R, t, o = {}) {
  return {};
}

// todas las vistas del esqueleto (para la lista de comprobar-decorados y el reparto de encuadres)
export const VISTAS_AK = { mar: V_MAR, fondo: V_FONDO, museo: V_MUSEO, price: V_PRICE, maquina: V_MAQUINA, antigua: V_ANTIGUA, hoy: V_HOY };
