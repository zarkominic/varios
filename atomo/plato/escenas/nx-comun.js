// Fontanería y decorados del episodio 34 (El Arca de Noé: el relato, las religiones y la roca con forma de barco) en el
// estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la ladera de Durupınar (ladera),
// A2 el despacho del capitán, el mapa y la revista (papeles), B el relato (relato), C el Museo Británico (museo), D
// Mesopotamia (mesopotamia), E otros diluvios y la línea del tiempo (diluvios) y F hoy (hoy).
// CUIDADO (relato sagrado para tres religiones vivas): a NOÉ / NUH NO SE LE DIBUJA NUNCA, ni de lejos ni de espaldas, en
// ninguna tradición: se ven el barco, los animales, la lluvia, las montañas, la paloma, el arcoíris y las tablillas. Los
// tres libros sagrados, cerrados y con respeto (un símbolo cada uno), sin letras. Manu, Deucalión y la gente de
// Mesopotamia, solo como figuritas diminutas (6–10 px) y lejanas. Lo que dice el equipo de Durupınar va «SEGÚN ELLOS», en
// trazo de PLANO AZUL (fondo azul oscuro, líneas claras, cuadrícula), nunca como el decorado real. Nada de burla: «no
// confirmado» no es «mentira». Sin letras (solo números y símbolos). Nada morboso.
// Los personajes son los de ELENCO_NX y las piezas, PIEZAS_NX (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, vallas, mostradores) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14; las cifras del año
// bajan hasta y ≈ 20: nada en y 15–20 bajo x 20–45), también.
//
//   import * as T from '/atomo/plato/escenas/nx-comun.js';
//   const { E, R, M } = await T.preparar('nx-gancho');
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
// las piezas del episodio (PIEZAS_NX: la tablilla, el barquito de papel, la pecera, la foto aérea, el radar de suelo, el
// testigo del sondeo…), las crea el reparto
export const PIEZAS_NX = KIT.PIEZAS_NX || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la tierra ocre de la ladera y su barro, la nieve del Ararat, la arcilla de las tablillas, el adobe, el agua del
    // diluvio, la madera del barco, el betún, y el azul del plano «según ellos» con su línea clara
    tierra: '#b89868', tierraS: '#8a6c44', tierraL: '#d8c090', barro: '#7a5a3a', nieve: '#f0f4fa', nieveS: '#b8c8e0',
    arcilla: '#c89a6a', arcillaS: '#9a6e44', adobe: '#d8b078', adobeS: '#a87e4c', agua: '#3a6a9a', aguaS: '#284a74',
    tabla: '#8a5a30', tablaS: '#5e3a1c', betun: '#2a2228', plano: '#14284e', planoL: '#8ac0f0', hierba: '#7a9a52',
    hierbaS: '#4e7238', papel: '#efe6d0', papelS: '#cfc4a8', tinta: '#2a2a3a',
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
  const E = await escena(id, 'ep34');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1750 a. C.–1872 (las tablillas y los relatos), 1872–1959 (Londres), 1959–1996 (la roca y los
  // buscadores), 1996–2027 (los geólogos y lo nuevo)
  Object.assign(R.ICONOS, {
    tablilla: ['.......', '.#####.', '.#.#.#.', '.##.##.', '.#.#.#.', '.#####.', '.......'],
    lupa: ['..###..', '.#...#.', '.#...#.', '.#...#.', '..###..', '.....#.', '......#'],
    barco: ['.......', '...#...', '...##..', '...#...', '#######', '.#####.', '.......'],
    radar: ['.......', '#.....#', '.#...#.', '..#.#..', '...#...', '..###..', '.......'],
  });
  R.tramosTiempo([[-1750, 1872, R.PALA.ORO, 'tablilla'], [1872, 1959, R.PALA.ROJO, 'lupa'], [1959, 1996, R.PALA.AZUL ?? R.PALA.ROJO, 'barco'], [1996, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'radar']]);
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

// ── A · La ladera de Durupınar, Turquía (1959, 1960, 1977 y 2026) ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'ladera': la ladera del este de Turquía, a 2.000 m: una pendiente ancha de tierra ocre y hierba rala, y en ella LA
//     FORMA DE BARCO, vista en tres cuartos desde arriba: un óvalo alargado y puntiagudo de unos 150 m (ocupa casi todo
//     el ancho), con los bordes levantados como dos «bordas» de roca y barro y una loma de roca en el centro; alrededor,
//     el barro del deslizamiento con sus pliegues; al fondo, el monte ARARAT nevado, enorme, con su hermano pequeño al
//     lado, nubes que pasan a distintas velocidades, un águila; un pueblo de casas de piedra de techo plano con humo, un
//     rebaño de ovejas con su pastor diminuto, un camino de tierra. o.epoca: 1959 (sin nada más) | 1960 (mulas con cajas
//     y tiendas de lona de la expedición, y con o.hoyos 0–1 las zanjas que abren; o.polvo 0–1: la nube de una voladura
//     pequeña en un extremo) | 1977 (o.centro true: arriba, en la loma de enfrente, el centro de visitantes, un
//     edificio blanco redondeado con mirador y bandera roja con media luna, un autobús y turistas diminutos) | 2026
//     (el centro, y sobre la forma una cuadrícula de cordeles y banderines, dos tiendas, una furgoneta y la torre
//     pequeña de la perforadora; o.sondeos 0–1: cuántos puntos de sondeo marcados con estacas). o.hora: 'dia' |
//     'tarde' (dorada, sombras largas) | 'estaciones' con o.estacion 0–1 (de verano a nieve y vuelta: pasan los años).
//     Lo de delante (rocas, matas, una valla de alambre) en laderaDelante. Cámara 'cerca': a pie de la forma, dentro de
//     ella: el suelo de tierra donde se plantan los personajes (devuelve suelo), a los lados las dos «bordas» de roca
//     rojiza con vetas, la loma central, el Ararat al fondo; sitio libre en el centro para el radar o la perforadora
//     (los pone la escena con PIEZAS_NX); con o.epoca 2026, la cuadrícula de cordeles en el suelo.
//   'corte': la ladera EN CORTE, como una lámina de geología: capas de roca de colores plegadas en forma de cuenco
//     alargado (un sinclinal), con vetas rojizas de mineral de hierro; o.fase 0 las capas enteras bajo tierra, 1 la
//     erosión se lleva lo de arriba y deja el borde del cuenco asomando (flechas de lluvia y viento), 2 el barro de un
//     deslizamiento baja de la montaña y lo rodea por los dos lados (flechas), 3 visto desde arriba en un recuadro: la
//     forma de barco. o.plano true: lo mismo en PLANO AZUL «según ellos»: fondo azul oscuro con cuadrícula, la silueta
//     de la forma en línea clara y, debajo, líneas rectas y ángulos como pasillos y compartimentos (o.pasillos 0–1:
//     cuánto se ha dibujado), y a un lado dos barras (la de dentro, más alta) con sus bolsitas de muestra. Cámara
//     'sondeo': el corte vertical de un sondeo: arriba, la superficie con la torre de la perforadora y una furgoneta; el
//     tubo baja por capas de tierra, grava y arcilla (o.fondo 0–1: hasta 20 m, con una regla lateral y los números 9 y
//     20 con R.numero); a 9 m, una bolsa de tierra más oscura con unos trocitos negros (o.trozos 0–1: brillan).
export function ladera(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.tierra);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de ladera(); se llama después de los actores, con las mismas opciones
export function laderaDelante(R, t, o = {}) {
  return {};
}


// ── A2 · El despacho del capitán, el mapa y la revista (1959–1960) ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'capitan': un despacho militar turco de 1959: paredes encaladas con un mapa grande de curvas de nivel clavado, un
//     archivador metálico, una estufa, una percha con la gorra, la ventana con el patio del cuartel, un camión y
//     montañas (recortado), una bandera roja pequeña en su asta, un ventilador; la mesa (en papelesDelante) con pilas
//     de fotos aéreas, un estereoscopio de patas, una lupa y una lámpara de brazo. Cámara 'foto': UNA FOTO AÉREA de
//     cerca, en blanco y negro, sobre la mesa: montañas vistas desde arriba con sus sombras, barrancos, un camino, y en
//     el centro la silueta alargada y puntiaguda; o.giro (radianes): la foto girada sobre la mesa (la escena la va
//     girando hasta que el «barco» queda derecho); alrededor, otras fotos, un lápiz graso, la lupa (o.lupa [x, y]: la
//     lupa agranda lo que tiene debajo).
//   'mapa': un mapa del este de Turquía pintado a la acuarela: el Ararat (con su cifra de altura no: solo el dibujo del
//     monte nevado), la ladera marcada con un barquito, las fronteras con Irán y Armenia en línea de puntos, ríos, el
//     lago de Van; una regla que marca 30 (R.numero) entre el monte y la ladera (o.regla 0–1). o.judi 0–1: el mapa se
//     abre hacia el sur y aparece otro monte, el Judi, junto a las fronteras de Siria e Irak, con su propio barquito;
//     o.region 0–1: se sombrea una región entera de montañas entre los dos («los montes de Ararat»). Cámara 'revista':
//     una mesa de salón de 1960 con una revista grande abierta: a doble página, la foto aérea de la forma y columnas de
//     texto (rayas), otra foto pequeña de hombres con mulas; una taza, un cenicero no: unas gafas; o.manos: la revista
//     pasa de mano en mano (las manos las pone la escena con T.mano).
export function papeles(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.papel, C.madera);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de papeles(); se llama después de los actores, con las mismas opciones
export function papelesDelante(R, t, o = {}) {
  return {};
}


// ── B · El relato: el barco, los animales, la lluvia ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'astillero': un llano antiguo al atardecer y, en él, EL GRAN BARCO DE MADERA a medio hacer, enorme (casi todo el
//     ancho): un casco largo como un cajón con tres pisos, cuadernas a la vista, andamios, montones de tablones,
//     calderos de brea que humean, escaleras, herramientas apoyadas (NADIE: ni Noé ni obreros; se ve el trabajo, no
//     quién lo hace); o.obra 0–1: de esqueleto a casco cerrado con su puerta lateral y su tejadillo; una regla tendida a
//     lo largo con el número 300 (o.medida 0–1); nubes oscuras que se amontonan al fondo (o.nubes 0–1), pájaros que
//     huyen. Cámara 'fila': la rampa de entrada y LA FILA DE ANIMALES por parejas que sube: elefantes, jirafas, leones,
//     cebras, ovejas, osos, canguros no (solo fauna del Viejo Mundo), tortugas y, el último, un caracol (o.fila 0–1:
//     cuánto ha avanzado la fila; o.espera true: todos parados mirando atrás al caracol); primeras gotas (o.lluvia).
//   'diluvio': el barco, solo, flotando en un mar gris sin orilla bajo la lluvia (o.lluvia 0–1: de chaparrón a nada),
//     olas largas, relámpagos lejanos, cortinas de agua; un contador de días y noches lo pone la escena. o.calma 0–1:
//     deja de llover, se abren las nubes, el agua baja y asoman cumbres; el barco queda posado entre montañas; o.paloma
//     0–1: una paloma blanca sale, vuela lejos y vuelve con una hoja de olivo (HOJA, no rama); o.arco 0–1: el arcoíris.
//     Cámara 'libros': TRES LIBROS antiguos, cerrados y hermosos, uno junto a otro sobre un paño, cada uno con su
//     símbolo en la tapa (una estrella de seis puntas, una cruz, una media luna con estrella), con el mismo tamaño y la
//     misma luz (ninguno por encima de otro), una lámpara de aceite, y detrás una ventana con cielo; o.cuantos 1–3;
//     o.tablilla true: a su lado, una tablilla de arcilla; sin letras.
export function relato(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.agua);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de relato(); se llama después de los actores, con las mismas opciones
export function relatoDelante(R, t, o = {}) {
  return {};
}


// ── C · Londres: el Museo Británico en 1872 y en 2014 ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'sala': una sala de trabajo del Museo Británico en 1872: estanterías altas con cajas y bandejas de fragmentos de
//     tablillas numeradas, un gran relieve asirio de un toro alado en la pared del fondo, ventanales altos con la niebla
//     de Londres y tejados (recortado), lámparas de gas, una estufa de hierro, un perchero con chisteras, un reloj; las
//     mesas largas con fragmentos, pinceles y lupas van en museoDelante; dos colegas pequeños al fondo los pone la
//     escena. Cámara 'tablilla': UNA TABLILLA de arcilla de cerca, sobre fieltro verde: media tablilla rota, cubierta de
//     cuñas (trazos en cuña, nunca letras), con otros fragmentos alrededor que encajan (o.unidos 0–1: se juntan);
//     o.dibujo 0–1: sobre la arcilla se van dibujando, en línea clara como grabada, un barco, parejas de animales, la
//     lluvia y una paloma; o.pequena true: en su lugar, una tablilla pequeña como un teléfono móvil, entera, con un
//     círculo grabado (el barco redondo), junto a una regla y unos guantes.
//   'conferencia': una sala de conferencias victoriana, de noche, llena: la tarima con un atril y una mesa con la
//     tablilla en su caja, lámparas de araña, cortinajes, retratos; el público de espaldas, con chisteras y moños, en
//     museoDelante; un hueco en la primera fila para un señor mayor de patillas (lo pone la escena). Cámara 'taller':
//     el despacho de un conservador en 2014: estantes metálicos con cajones de tablillas, una mesa (en museoDelante) con
//     flexo, lupa de brazo, un ordenador y pilas de libros, una maqueta de barco redondo en una balda, una ventana con
//     el patio del museo.
export function museo(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.madera, C.papel);
  return { suelo: 152 };
}
// lo de delante de los personajes en cada encuadre de museo(); se llama después de los actores, con las mismas opciones
export function museoDelante(R, t, o = {}) {
  return {};
}


// ── D · Mesopotamia: la ciudad entre dos ríos ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'ciudad': una ciudad de adobe entre dos ríos, hace miles de años: murallas, casas de techo plano, un zigurat
//     escalonado, palmeras, huertos con canales, barcas de juncos en el río, gente diminuta (6–10 px) con cestas y
//     burros, pájaros; o.crecida 0–1: el río sube, se sale, cubre los huertos y llega a las casas (la gente sube a los
//     tejados). Cámara 'tejado': desde un tejado de adobe en primer término (en mesopotamiaDelante: el pretil, unas
//     vasijas, una escalera de mano), el agua parda hasta el horizonte, tejados y copas de palmera que asoman, el
//     zigurat lejos, nubes.
//   'barco': EL BARCO REDONDO de la tablilla, enorme, flotando: una cesta gigante de CUERDA TRENZADA enrollada en
//     espiral sobre costillas de madera, untada de betún negro, con un tejadillo; cabezas de animales que asoman por el
//     borde; o.giro (radianes): gira sobre sí mismo como una peonza y deja una estela en espiral; lluvia opcional
//     (o.lluvia). Cámara 'capas': un CORTE arqueológico de un montículo: abajo, restos de casas y vasijas; encima, una
//     capa gruesa de lodo limpio y liso (o.lodo 0–1: se resalta y parpadea); encima, más casas; arriba, la excavación de
//     1929: escaleras, cestos, arqueólogos diminutos con salacot, una tienda; una regla lateral.
export function mesopotamia(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.adobe, C.agua);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de mesopotamia(); se llama después de los actores, con las mismas opciones
export function mesopotamiaDelante(R, t, o = {}) {
  return {};
}


// ── E · Otros diluvios y la línea del tiempo ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'india': un río de la India antigua, con templos de piedra lejanos, lotos y garzas: o.fase 0 un cuenco con un
//     pececillo dorado en la orilla, 1 el pez en un estanque, 2 el pez, ya enorme, en el río crecido, que remolca con
//     una cuerda una barca (una figurita diminuta en ella) hacia una montaña nevada, 3 la barca amarrada a la cumbre;
//     pinta el pez y la barca el decorado. Cámara 'grecia': el mar griego bajo la tormenta: un arca como un cofre
//     grande de madera que flota (dos figuritas diminutas asomadas), el monte Parnaso al fondo con un templo de
//     columnas; o.dias 0–9: soles y lunas que pasan en arco por el cielo, contados con R.numero.
//   'marnegro': un mapa en PLANO AZUL (es una HIPÓTESIS discutida): el Mediterráneo, el estrecho del Bósforo y un lago
//     más bajo donde hoy está el mar Negro; o.lleno 0–1: el agua entra por el estrecho en cascada y el lago crece hasta
//     ser el mar; un signo de interrogación grande (R.icono o dibujado) arriba a la izquierda (o.duda true). Cámara
//     'linea': una LÍNEA DEL TIEMPO horizontal sobre papel antiguo, de izquierda (antiguo) a derecha (hoy): marcas con
//     iconos (una tablilla pequeña, una tablilla grande, un libro, otro libro, otro libro) que la escena enciende con
//     o.marcas 0–5; debajo de cada una, sitio para un número (lo pone la escena).
export function diluvios(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.agua);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de diluvios(); se llama después de los actores, con las mismas opciones
export function diluviosDelante(R, t, o = {}) {
  return {};
}


// ── F · Hoy: el estudio de Atom, el geólogo y el laboratorio ──────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre (suelo y
// los puntos que usan las escenas).
//   'estudio': el estudio de Atom, de día: papel pintado, zócalo, tarima con mancha de sol, la ventana con cortinas (por
//     ella, un parque y lluvia fina opcional, o.lluvia), estantería con libros y un barco en una botella, un sillón con
//     el gato que mira fijo hacia la mesa, un mapa enmarcado, el reloj de pared, y el escritorio (en hoyDelante) con LA
//     PECERA redonda (PIEZAS_NX.pecera; o.pecera false la quita para que la ponga la escena), libros y un flexo. Cámara
//     'mesa': el escritorio de cerca: el tablero con sus vetas, la pecera grande en el centro con su agua, sus plantas,
//     sus burbujas y su pez naranja (o.pez false: la escena pone el pez), una lupa, un libro abierto, hojas de papel
//     para doblar; al fondo, desenfocada en tramas, la ventana.
//   'geologo': el despacho de un geólogo: estanterías con muestras de roca etiquetadas (números), un cilindro de hielo
//     en una vitrina fría con sus capas finas, una lámina grande con un corte de rocas en capas de colores, martillos
//     colgados, un microscopio, botas con barro, una ventana con montañas; la mesa en hoyDelante. Cámara 'laboratorio':
//     un laboratorio moderno: una máquina grande de datación con luces, campana extractora, tubos y viales, una bandeja
//     de entrada con sobres acolchados (o.sobres 0–4), un monitor con una gráfica y un «?» (o.resultado false) y una
//     revista científica cerrada en un atril (o.revista true); o.vacio true: nadie, las luces a medias.
//   'lista': un tablero de corcho grande en una pared: cuatro fichas clavadas, cada una con un dibujo (una pala en una
//     zanja abierta, un trozo de madera bajo una lupa, tres matraces, una revista) y su casilla vacía al lado (o.hechas
//     0–4: se van marcando; por omisión, todas vacías), un calendario de 2027 (R.numero) con un sello de permiso sin
//     estampar, hilos y chinchetas. Cámara 'casillas': tres casillas grandes en fila sobre papel, cada una con su icono
//     (un corazón, un bocadillo de hablar, una lupa), que la escena enciende con o.luz 0–3.
export function hoy(R, t, o = {}) {
  // ESQUELETO: lo sustituye la primera versión de los decorados
  provisional(R, t, C.cielo, C.madera);
  return { suelo: 150 };
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  return {};
}


