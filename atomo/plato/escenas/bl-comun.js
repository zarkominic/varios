// Fontanería y decorados del episodio 48 (El tesoro de Beale: una fortuna escondida en tres páginas de números), con el
// canon del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js: estudio) y
// añade: A Lynchburg 1820–1885 (lynchburg), B el oeste 1817–1821 (oeste), C el condado de Bedford (bedford), D el cuarto
// del amigo y la imprenta 1862–1885 (cuarto), E los buscadores 1898–1983 (buscadores), y las piezas (pausa y d_*).
// SIN LETRAS en pantalla (solo números y símbolos), con UNA excepción: las letras sueltas de la tira de Gillogly
// (d_tira). Las hojas de Beale son COLUMNAS DE NÚMEROS (la primera empieza 71, 194, 38, 1701…). La Declaración de
// Independencia se ve como un pergamino con renglones de rayitas, nunca legible. NADA MORBOSO: el cementerio de 1983 se ve
// de lejos (la iglesia blanca, la valla, un seto y la excavadora; ninguna tumba ni lápida a la vista); la dinamita, un
// resplandor y tierra que salta, lejos y sin nadie cerca. Personas reales, con respeto y sin parecidos inventados.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/bl-comun.js';
//   const { E, R, M } = await T.preparar('bl-gancho');
//   T.rodar(E, R, [[0, (t) => T.bedford(R, t, { encuadre: 'bosque', noche: true })]], { año: 1885 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 48 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores)
export { ELENCO_BL as BL } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43): se usa tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Lynchburg: ladrillo, tabaco curado, el río James, la madera de la posada, el hierro de la caja
    ladrillo: '#8a4a36', ladrilloS: '#5a2e22', tabaco: '#a8743a', tabacoS: '#6e4a24', rio: '#4a6a72', rioL: '#8aaab0',
    roble: '#6a4a2a', robleS: '#4a3220', hierro: '#3a3a42', hierroL: '#6a6a74', oxido: '#8a4a2a',
    // el oeste: la pradera, el polvo, el atardecer del barranco, el oro
    pradera: '#b0a058', polvo: '#c8a878', roca: '#9a6a4a', rocaS: '#6a4430', ocaso: '#e8885a', oro: '#f0c040', oroL: '#fff0a0', oroS: '#a87820',
    // Bedford: el bosque de robles y nogales, los picos de Otter, la noche con luna, el farol
    bosque: '#2e4a32', bosqueL: '#4a6a3e', picos: '#5a6a8a', noche: '#1a2236', luna: '#e8ecd8', farol: '#ffd890', farolS: '#e8a040',
    // el papel de las hojas y del folleto, la tinta, la vela
    papel: '#ece2c8', papelV: '#d8c890', tinta: '#1c1a2a', vela: '#ffd890',
    // los buscadores: el verde de las máquinas de 1930, el beige del UNIVAC, el ámbar de los terminales de 1980
    maquina: '#4a5a4a', univac: '#c8c0a8', ambar: '#f0a030', amarillo: '#e8c030',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep48');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: la llave (1817–1885, la caja, la clave y el folleto) y la pala (1886–hoy, los que cavan)
  Object.assign(R.ICONOS, {
    llave: ['.##....', '#..#...', '#..####', '.##..#.', '.....#.', '.......', '.......'],
    pala: ['......#', '.....#.', '....#..', '...#...', '.##....', '###....', '.#.....'],
  });
  R.tramosTiempo([[1817, 1886, R.PALA.ORO, 'llave'], [1886, 2027, R.PALA.ROJO, 'pala']]);
  R.companero = () => {};   // canon del 43: Atom no vive en la esquina, actúa en la escena (T.AT)
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };




// ── A · Lynchburg, 1820–1885 ─────────────────────────────────────────────────────────────────────────────────────────
// Un pueblo de tabaco de Virginia junto al río James, de ladrillo y madera. Cada encuadre pinta los 320 × 180 en cada
// fotograma: lo fijo va en un búfer y encima la vida (fuego, velas, humo, gente pequeña, barcas, perros, pájaros…).
// o.encuadre:
//   'calle' (por omisión): LA CALLE PRINCIPAL BAJANDO AL RÍO JAMES en invierno (1820): almacenes de tabaco de ladrillo con
//     sus portones y barricas (hogsheads) apiladas, una carreta de bueyes cargada, LA POSADA (el hotel Washington: dos
//     alturas de ladrillo con porche de columnas blancas, ventanas con luz y un letrero colgante con un dibujo de jarra,
//     sin letras) a la derecha con la puerta en x ~210–232; al fondo el río con barcas largas de tabaco (bateaux) y un
//     puente, la colina con casas; humo de chimeneas, gente pequeña con abrigos, un perro. o.soldados true (1862): por la
//     calle pasan soldados pequeños de gris y una carreta de suministros; banderines; sin armas en primer plano.
//     o.noche true (1885): de noche, con farolas de gas, la calle vacía y UNA ventana encendida en un piso alto (x
//     ~240–262, y ~60–84) donde se ve la silueta de un hombre escribiendo (devuelve .ventana [x, y]). Suelo y 150, libre
//     x 30–200. Cámara 'puerta': de cerca, el porche de la posada con la puerta abierta, la luz cálida de dentro y un buzón
//     de madera junto a la puerta (x ~250–266, y ~104–122; o.buzon 0–1 abre su tapa) para el gag del cartero; un banco.
//   'posada': EL COMEDOR DE LA POSADA de noche: vigas, chimenea grande con fuego y caldero (x ~20–90), mesas largas con
//     velas, jarras y platos, huéspedes pequeños de fondo que comen y charlan, EL MOSTRADOR de Morriss (x ~200–300,
//     tablero y 120) con su libro, una campanilla, llaves colgadas y botellas detrás; ventanas con la nieve fuera.
//     Suelo y 150, libre x 90–220. Cámara 'mostrador': de cerca el mostrador con el libro de registro abierto (renglones
//     de rayitas y, a la izquierda de cada renglón, un año en cifras); o.registro true: una fila vacía resaltada con
//     «1820» (devuelve .hueco [x, y]).
//   'despacho': EL DESPACHO DE MORRISS: escritorio de tapa con papeles y lámpara de aceite (x ~150–230, tablero y 122),
//     un armario de roble con puertas (x ~240–300, y ~40–150) donde se guarda LA CAJA DE HIERRO (o.caja 'armario' | 'mesa'
//     | false), un reloj de pie, un calendario de pared con un año en cifras (o.anyo, por omisión 1822; o.hojas 0–1 hace
//     volar las hojas del calendario para el gag de los diez años), un mapa de Virginia enmarcado (sin letras), una
//     chimenea pequeña, la ventana con el río. Suelo y 150, libre x 30–150. Cámara 'caja': de cerca, la caja sobre la
//     mesa a la luz de la lámpara: hierro remachado con óxido, un candado grande; o.abierta 0–1 la abre y deja ver DOS
//     CARTAS dobladas y TRES HOJAS DE NÚMEROS (d_hoja) dentro; o.roto true: el candado partido sobre la mesa.
// Devuelve { suelo, libre, … } con la geometría útil de cada encuadre. Llama a lynchburgDelante después de los actores
// (una barrica de tabaco en 'calle', el respaldo de un banco en 'posada', el canto del escritorio en 'despacho').
export function lynchburg(R, t, o = {}) { provisional(R, t, C.ladrilloS, C.tabaco); return { suelo: 150, libre: [30, 200] }; }
export function lynchburgDelante(R, t, o = {}) { return {}; }

// ── B · El oeste, 1817–1821 ──────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'llanura' (por omisión): LAS GRANDES LLANURAS en primavera: cielo grande con nubes de tres tonos a tres velocidades,
//     hierba alta que ondula con el viento, una MANADA DE BÚFALOS (de 10–14 px, varias decenas en tres términos) que pasta
//     y se mueve, unos JINETES pequeños a lo lejos con sus caballos y una mula de carga, flores, un arroyo con álamos,
//     buitres o halcones planeando. Suelo y 150, libre x 40–260.
//   'barranco': UN BARRANCO AL NORTE DE SANTA FE al atardecer: paredes de roca rojiza con estratos y grietas, pinos
//     piñoneros, un arroyo al fondo; EL CAMPAMENTO: una hoguera (x ~120–140, y ~140) con su olla, tiendas de lona, sillas
//     de montar, mantas, caballos atados que mueven la cola; el cielo naranja y violeta con las primeras estrellas; en
//     una grieta de la roca (x ~220–240, y ~100–120) algo que brilla (o.brillo 0–1: de un destello pequeño a una veta de
//     oro que reluce, con chispas; devuelve .brillo [x, y]). o.mina true: el mismo barranco año y medio después, con
//     picos, palas, cribas, un torno, montones de roca y sacos (sin la hoguera de la cena). Suelo y 150, libre x 30–200.
//     Cámara 'roca': de cerca la grieta con la veta de oro y una mano que la toca (T.mano si la escena la pide).
//   'camino': UNA FILA DE MULAS DE CARGA CON DIEZ JINETES cruzando unos montes boscosos hacia el este (la escena puede
//     pintarlos; el decorado da el camino y, de fondo, montes en tres términos, un río con vado, nubes, pájaros), y
//     o.recua true dibuja la recua pequeña de fondo andando (alforjas pesadas). Suelo y 150, libre x 20–300.
// Llama a oesteDelante después de los actores (matas de hierba alta en 'llanura', una roca en 'barranco', ramas en
// 'camino').
export function oeste(R, t, o = {}) { provisional(R, t, C.rocaS, C.pradera); return { suelo: 150, libre: [30, 260] }; }
export function oesteDelante(R, t, o = {}) { return {}; }

// ── C · El condado de Bedford ────────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'bosque' (por omisión): EL BOSQUE DE BEDFORD con LOS PICOS DE OTTER al fondo (dos cumbres azuladas, una más
//     puntiaguda): robles, nogales y pinos en tres términos, hojas en el suelo, un arroyo con piedras, un muro de piedra
//     seca medio caído, ardillas, pájaros; o.noche true: de noche bajo la LUNA, con niebla baja y luciérnagas, la luz fría
//     en las copas; o.hoja true: una hoja vieja de papel con números en el suelo entre las hojas (devuelve .hoja [x, y]);
//     o.hoy true: de día, hoy, con un sendero señalizado por marcas de pintura en los troncos (sin letras). Suelo y 150,
//     libre x 30–260. Cámara 'claro': un claro de noche junto a un arroyo (Goose Creek) con UN ROBLE GRANDE (x ~200–260)
//     de raíces a la vista, un hoyo en la tierra (o.hoyo 0–1, con su montón de tierra y una pala clavada), faroles en el
//     suelo; o.estallido 0–1: lejos, junto al roble, un resplandor y tierra y piedras que saltan, sin nadie cerca.
//   'taberna': LA TABERNA DE BUFORD hacia 1820: una casa de troncos y piedra de dos alturas junto al camino, con porche,
//     un abrevadero y caballos atados, una diligencia, humo en la chimenea; detrás los picos de Otter. Suelo y 150, libre
//     x 30–220.
//   'iglesia': UNA IGLESIA BLANCA DE MADERA EN EL CAMPO (1983), DE DÍA Y DE LEJOS: su campanario, una valla blanca y un
//     seto alto que no deja ver nada del interior del cementerio (ninguna tumba ni lápida a la vista), árboles, una
//     carretera de tierra; o.excavadora 0–1: una excavadora amarilla de los ochenta junto a la valla (x ~150–210), con
//     el brazo que se mueve y tierra; o.sheriff true: un coche del sheriff de los ochenta (sin letras ni escudos, una
//     estrella dibujada) parado en la carretera con su luz que gira. Suelo y 150, libre x 30–150. Cámara 'valla': más
//     cerca de la valla y el seto con la excavadora parada.
// Llama a bedfordDelante después de los actores (helechos y ramas en 'bosque', el abrevadero en 'taberna', la cuneta y
// unas flores en 'iglesia').
export function bedford(R, t, o = {}) { provisional(R, t, C.noche, C.bosque); return { suelo: 150, libre: [30, 260] }; }
export function bedfordDelante(R, t, o = {}) { return {}; }

// ── D · El cuarto del amigo y la imprenta, 1862–1885 ─────────────────────────────────────────────────────────────────
// o.encuadre:
//   'cuarto' (por omisión): EL CUARTO DEL AMIGO de noche: una mesa (x ~110–230, tablero y 124) con LAS TRES HOJAS DE
//     NÚMEROS (d_hoja), una vela que se consume (o.vela 0–1: de entera a casi gastada), un tintero, papeles con cuentas,
//     una pila de libros; estanterías llenas, una cama estrecha, una chimenea con brasas, una ventana con la noche y la
//     luna, un reloj; o.pergamino true: un pergamino grande abierto sobre la mesa (la Declaración, renglones de rayitas);
//     o.vacio true (1885): el mismo cuarto años después, casi sin muebles (los vendió), papeles por todas partes, el suelo
//     lleno de hojas, la chimenea apagada; o.familia true deja la puerta abierta con luz (la escena pone a la familia).
//     Suelo y 150, libre x 30–110. Cámara 'mesa': de cerca la mesa con las hojas, el pergamino y la vela; o.letras 0–1:
//     de la segunda hoja salen formas luminosas que dibujan, como un sueño en el aire, el bosque, la cámara de piedra a
//     seis pies y las ollas de hierro (devuelve .vision [x, y]).
//   'imprenta': LA IMPRENTA DE LYNCHBURG EN 1885: una prensa de hierro grande con su volante, cajas de tipos, resmas,
//     FOLLETOS AMARILLOS colgados a secar y apilados, una ventana a la calle con un cartelito con «50» y el símbolo del
//     centavo; tinta, rodillos; o.humo 0–1: humo que sale por la puerta de atrás y un resplandor naranja (el incendio que
//     dijo Ward, sin llamas grandes ni nadie en peligro). Suelo y 150, libre x 30–200. Cámara 'periodico': un periódico de
//     1885 sobre una mesa con columnas de rayitas y un hueco vacío donde no está la noticia.
// Llama a cuartoDelante después de los actores (el respaldo de la silla en 'cuarto', una pila de resmas en 'imprenta').
export function cuarto(R, t, o = {}) { provisional(R, t, C.robleS, C.vela); return { suelo: 150, libre: [30, 110] }; }
export function cuartoDelante(R, t, o = {}) { return {}; }

// ── E · Los buscadores, 1898–1983 ────────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'sesion' (por omisión): UNA SESIÓN CON UN MÉDIUM EN 1898: un saloncito a oscuras con papel pintado, cortinas
//     pesadas, una mesa redonda con mantel (x ~110–220, tablero y 126), velas, una BOLA DE CRISTAL (o.empanada 0–1: se
//     empaña), un reloj, retratos en óvalo, humo de vela. Suelo y 150, libre x 40–260.
//   'sis': LA OFICINA DEL SERVICIO DE DESCIFRADO DEL EJÉRCITO, AÑOS TREINTA: pupitres de madera con alumnos (la escena
//     los pone), máquinas de cifrar con rotores en las mesas, una pizarra con columnas de NÚMEROS, archivadores verdes,
//     lámparas de flexo, ventanas de guillotina con Washington al fondo, una bandera de barras y estrellas en un rincón,
//     humo de pipa. Suelo y 150, libre x 40–260. Cámara 'mesa': el escritorio del jefe con las hojas de Beale, una lupa,
//     papeles con cuadrículas de números y una taza.
//   'univac': LA SALA DE UN ORDENADOR GIGANTE DE 1970: armarios de cintas magnéticas que giran a saltos, consolas con
//     filas de luces que parpadean, una impresora de papel continuo que va soltando una TIRA DE PAPEL (o.tira 0–1),
//     suelo técnico, tubos fluorescentes. Suelo y 150, libre x 60–240.
//   'rand': UN DESPACHO DE 1980: un terminal con pantalla verde o ámbar (o.pantalla: lo que pinta la escena), papel
//     continuo plegado en el suelo, una pizarra blanca con números, plantas, persianas con luz de California. Suelo y 150,
//     libre x 40–220. Cámara 'pantalla': de cerca la pantalla del terminal, para que la escena escriba la tira (d_tira).
//   'estudio82': EL ESTUDIO DE UN INVESTIGADOR EN 1982: escritorio con lupa, copias de cartas viejas, un diccionario
//     grande abierto, fichas, una máquina de escribir, estanterías y una lámpara verde. Suelo y 150, libre x 40–220.
// Llama a buscadoresDelante después de los actores.
export function buscadores(R, t, o = {}) { provisional(R, t, C.maquina, C.univac); return { suelo: 150, libre: [40, 260] }; }
export function buscadoresDelante(R, t, o = {}) { return {}; }

// ── Piezas ───────────────────────────────────────────────────────────────────────────────────────────────────────────
// d_hoja(R, x, y, o): UNA HOJA DE BEALE (papel envejecido, ~22 × 30 px a escala 1; o.escala 2) con columnas de números
//   pequeños (R.numero) separados por comas; o.n 1–3 elige la hoja (la 1 empieza 71, 194, 38, 1701…); o.brillo 0–1 la
//   ilumina. Devuelve {}.
// d_folleto(R, x, y, o): EL FOLLETO DE 1885 cerrado o abierto (o.abierto 0–1), de papel amarillento, con números dentro.
// d_caja(R, x, y, o): LA CAJA DE HIERRO suelta (o.abierta 0–1), para las escenas que la llevan en las manos.
// d_tira(R, x, y, letras, o): LA TIRA DE GILLOGLY: letras sueltas en pixel (a b f d e f g h i i j k l m m n o h p p) que
//   aparecen de una en una (o.n cuántas), con las dos «tropezadas» (f y h) marcadas en otro color si o.marca. ES LA ÚNICA
//   EXCEPCIÓN A LA REGLA DE «SIN LETRAS».
// pausa(R, x, y, t, o): los objetos de las pausas (los saca Atom a color en el mundo congelado; pixel art limpio, a
//   escala 2, con su sombra), o.cual:
//   'balanza': una balanza de dos platos: en uno, lingotes y ollas de hierro llenas de oro; en el otro, un coche pequeño
//     de juguete; los platos se equilibran (o.peso 0–1) y aparece el «2921»;
//   'pergamino': el pergamino de la Declaración con sus palabras como bloquecitos numerados (1, 2, 3…) y una flecha que va
//     de un número de la hoja a su bloque y saca la primera letra como un cuadradito luminoso (o.paso 0–1);
//   'tragaperras': una máquina tragaperras de juguete con tres rodillos de frutas que se paran a una de ganar (o.giro
//     0–1), y un cerebro de dibujo que se ilumina igual que con un premio; «2009»;
//   'bombo': un bombo de lotería que suelta letras revueltas, y al lado una mano (T.mano) que elige números mirando un
//     pergamino; el «1 / 100 000 000 000 000» en pequeño;
//   'torre': una torre de bloques con números (1014, 6, 4) que crece y parece más firme y, de pronto, se tambalea (o.tiembla
//     0–1); «1983»;
//   'teatrillo': un teatrillo de títeres de madera con su telón rojo, y dentro tres títeres: la caja, el posadero y el
//     amigo sin cara (o.telon 0–1 abre el telón).
// x, y: el centro de la base; devuelven {}.
export function d_hoja(R, x, y, o = {}) { R.rect(x - 11, y - 15, x + 11, y + 15, C.papel); return {}; }
export function d_folleto(R, x, y, o = {}) { R.rect(x - 10, y - 14, x + 10, y + 14, C.papelV); return {}; }
export function d_caja(R, x, y, o = {}) { R.rect(x - 12, y - 10, x + 12, y, C.hierro); return {}; }
export function d_tira(R, x, y, letras, o = {}) { R.rect(x, y, x + 100, y + 8, C.ambar); return {}; }
export function pausa(R, x, y, t, o = {}) { R.rect(x - 20, y - 30, x + 20, y, C.oro); return {}; }
