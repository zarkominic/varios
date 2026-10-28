// Fontanería y decorados del episodio 14 (Oak Island, el Pozo del Dinero) en el estilo canónico pixel chibi, al nivel de
// episodios/ESTANDAR.md. Ocho decorados (guion.md): A Oak Island en 1795, B el pozo (en corte, la boca y el fondo),
// C Smith's Cove y la orilla sur, D Roosevelt (Nueva York 1909, Campobello y el barco de 1939), E el gabinete de las
// teorías, F el laboratorio del agua (con el campo de 1878), G Michigan y Miami en 1965, H Oak Island hoy. El mapa de papel
// es el del 13 (fa-comun.js), que ya pinta Canadá: Nueva Escocia se encuadra con o.zoom y o.centro. Sin marcas: ni
// History ni Reader's Digest. Sin morbo ni «maldición». Reutiliza del 10 la paleta, rodar, la mano, el brazo y la silla.
//
//   import * as T from '/atomo/plato/escenas/oi-comun.js';
//   const { E, R, M } = await T.preparar('oi-gancho');
//   T.rodar(E, R, [[0, (t) => T.isla1795(R, t, { encuadre: 'claro' })]], { año: 1795 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa };

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el mar del norte, la arcilla del pozo, el roble y la madera de las torres
    marN: '#3a6a8a', marNS: '#284e6a', marNL: '#6a9aba', espuma: '#e8f0f0',
    arcilla: '#9a7a5a', arcillaS: '#7a5a40', arcillaL: '#b8987a', roble: '#6a4a2a', robleS: '#4a3018', robleL: '#8a6a44',
    hoja: '#4a7a3a', hojaS: '#36602c', hojaL: '#6a9a4a', arena: '#d8c8a0', arenaS: '#b8a47c', algas: '#5a6a3a',
    // la anhidrita (blanca grisácea), el agua del pozo y el tinte rojo de 1898
    anhidrita: '#d8d4cc', anhidritaS: '#aeaaa2', aguaPozo: '#2e4a5a', aguaPozoL: '#4a7a8a', tinteRojo: '#c8283a',
    // el oro de la leyenda y el acero de hoy
    oro: '#e8b830', oroS: '#a8801c', acero: '#8a96a2', aceroS: '#5e6a76', aceroL: '#c8d2dc', alta: '#e8783a',
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
  const E = await escena(id, 'ep14');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // iconos de la barra de tiempo: la pala (los colonos), la polea (las máquinas de vapor) y la grúa (la ciencia)
  Object.assign(R.ICONOS, {
    pala: ['...#...', '...#...', '...#...', '...#...', '..###..', '.#####.', '..###..'],
    polea: ['...#...', '..###..', '.#...#.', '.#.#.#.', '.#...#.', '..###..', '...#...'],
    grua: ['#######', '#.....#', '#......', '#......', '#....#.', '#...###', '###....'],
  });
  // la barra de tiempo: las palas (1795–1848), el vapor (1849–1964) y la ciencia (1965–2026)
  R.tramosTiempo([[1795, 1848, R.PALA.ORO, 'pala'], [1849, 1964, R.PALA.AZUL, 'polea'], [1965, 2026, R.PALA.ROJO, 'grua']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }
// un instante dentro de la frase de la marca k: f = 0 su comienzo, f = 1 su final
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };

// sitios del mapa ([lon, lat]); para encuadrar Nueva Escocia: T.mapa(R, t, { zoom: 3.4, centro: [-66, 43.5] }); la costa de
// Nueva York a Nueva Escocia: { zoom: 2.4, centro: [-70, 42.5] }; de Miami o Michigan a Nueva Escocia: { zona: 'eeuu' }
export const LUGARES = {
  oakIsland: [-64.30, 44.51], halifax: [-63.57, 44.65], onslow: [-63.33, 45.40], nuevaYork: [-74.0, 40.71],
  campobello: [-66.95, 44.88], kingsford: [-88.07, 45.79], miami: [-80.19, 25.76],
};
// relleno provisional (lo sustituye el decorado de verdad): un degradado tramado, para que la página pinte
const provisional = (R, t, c0, c1) => { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (y / 180 + h(x >> 2, y >> 2) * 0.15) > 0.55 ? c1 : c0); };

// ── A · Oak Island en 1795 ──────────────────────────────────────────────────────────────────────────────────────────────
// La isla pequeña de robles en la bahía de Mahone (Nueva Escocia), a finales del verano de 1795. o.encuadre:
//   'bahia': desde el agua, la bahía con otras islitas boscosas, la costa al fondo, nubes del Atlántico a tres
//     velocidades y gaviotas; en primer término el agua con olas y reflejos; deja sitio en el agua para una barca de remos
//     (la pone la escena) y devuelve dónde está la playa de llegada;
//   'claro': dentro del bosque, el claro con el hoyo redondo hundido en la tierra (una hondonada con hierba distinta),
//     el gran roble a un lado con una rama gruesa que pasa por encima del hoyo y de la que cuelga la vieja polea de barco
//     (o.polea false la quita; cruje y se balancea con el viento), helechos, setas, troncos caídos, luz entre las hojas;
//     suelo para tres personajes y la cesta del almuerzo (o.cesta: pinta la cesta con el bocadillo; 0–1 lo que se ha
//     llevado la gaviota);
//   'orilla': la orilla rocosa de la isla con la marea (o.marea 0–1: baja–alta, el agua sube y baja sobre las rocas y la
//     arena), algas, conchas, troncos de deriva; con o.hoy, la misma orilla de hoy al atardecer (la calzada al fondo,
//     luces de casas en la costa); o.atardecer.
// Devuelve las posiciones útiles (suelo, hoyo, polea, playa).
export function isla1795(R, t, o = {}) { provisional(R, t, C.marN, C.hoja); return { suelo: 150 }; }
// la vieja polea de barco de la leyenda (bloque de madera con su roldana y un trozo de cabo), colgando en (x, y); o.giro
export function polea(R, x, y, t, o = {}) { R.disco(x, y, 3, C.robleS); }
// la gaviota del gag: vuela, se posa y se lleva el bocadillo (o.fase 0–1: llega, coge, se va)
export function gaviota(R, x, y, t, o = {}) { R.pset(x, y, C.blanco); }

// ── B · El pozo: en corte, la boca y el fondo ────────────────────────────────────────────────────────────────────────────
// o.epoca: '1795' (solo el hoyo con palas y sogas), '1803' (torre de madera con polea, cubos, sogas), '1849' (torre con
// taladro de mano gigante y un cabrestante), '1909' (perforadora de vapor con su caldera humeante). o.encuadre:
//   'corte': la isla vista en corte (cielo y bosque arriba, la tierra en capas de arcilla con piedras y raíces, el mar
//     a un lado con su nivel): el pozo baja de arriba abajo con las losas de piedra cerca de la boca y una plataforma de
//     troncos de roble cada diez pies (unas 9 plataformas visibles), capas de carbón vegetal, masilla y fibra de coco
//     hacia el fondo; o.nivel (0–1) el agua que llena el pozo (0 seco, 1 hasta treinta pies de la boca), con su brillo
//     y ondas; o.segundo (0–1) el segundo pozo al lado que se cava y se llena; o.marea (0–1) el nivel del mar que sube y
//     baja (el del pozo lo sigue si o.sigue); o.flechas: flechas de agua que entran por abajo (más gruesas cuanto más
//     hondo); o.tunel: la línea de puntos del túnel imaginario hasta el mar; devuelve la escala (pies → px) y dónde está
//     cada plataforma, para que las escenas pongan cavadores, cubos y farol dentro;
//   'boca': fuera, a ras de suelo: la boca del pozo con su brocal de troncos, la torre o la máquina de su época, montones
//     de tierra, carretillas, tablones, cubos, la tienda de los obreros, el bosque y la bahía detrás; vida: humo, pájaros,
//     ropa tendida; suelo para cuatro o cinco personajes;
//   'fondo': dentro del pozo, abajo, a la luz de un farol: las paredes de arcilla con marcas de pico, una plataforma de
//     troncos bajo los pies, la soga que sube a la luz; o.agua (0–1) el agua que empieza a brotar por las grietas.
export function pozo(R, t, o = {}) { provisional(R, t, C.arcillaS, C.arcilla); return { suelo: 150 }; }

// ── C · Smith's Cove y la orilla sur ──────────────────────────────────────────────────────────────────────────────────
// o.encuadre:
//   'playa': la ensenada de Smith's Cove con la marea baja: la arena mojada que «llora» agua en hilillos que bajan al mar
//     (animados), rocas con algas, la orilla de la isla con robles; o.cavado (0–1): la zanja de los buscadores de 1850
//     que deja ver la fibra de coco y los canales de piedra en abanico hacia el mar; o.dique (0–1) el dique de madera y
//     piedras que levantan, y o.ola (0–1) la marea alta que lo rompe y se lo lleva (tablones flotando); suelo para cuatro;
//   'canales': un inserto a ras de arena: los canales de piedra planas en abanico con la fibra de coco marrón entre las
//     piedras y el agua que corre por ellos; deja sitio para el cangrejo (lo pone la escena con T.cangrejo);
//   'sur': la orilla sur de la isla, rocosa, con el agua en calma; o.tinte (0–1) la mancha de tinte rojo que aparece en
//     el agua junto a las rocas y se extiende.
export function smithsCove(R, t, o = {}) { provisional(R, t, C.arena, C.marN); return { suelo: 150 }; }
// el cangrejo del gag (de lado, con sus pinzas y ojos de palo); o.dir, o.anda
export function cangrejo(R, x, y, t, o = {}) { R.pset(x, y, C.rojo ?? hex('#c84a3a')); }
// el pez del gag del tinte: asoma la cabeza del agua (o.rojo 0–1: teñido)
export function pez(R, x, y, t, o = {}) { R.pset(x, y, C.marNL); }

// ── D · Roosevelt: Nueva York 1909, Campobello y el barco de 1939 ──────────────────────────────────────────────────────
// o.encuadre:
//   'bufete': un despacho de abogados de Nueva York en 1909: paneles de madera oscura, estanterías de libros de leyes,
//     ventana alta con la calle (tranvía, coches de caballos, edificios), mesa con escribanía, lámpara de gas, un mapa
//     enrollado; sitio para dos personajes a la mesa (el joven Roosevelt firma);
//   'campobello': la casa de veraneo roja de tejado verde junto al mar en la isla de Campobello, con su porche, la hierba,
//     el mar y barcas de vela; sitio para un niño con un libro en el porche;
//   'cubierta': la cubierta de un barco en 1939 en una niebla espesa (o.niebla 0–1): barandilla, chimenea, cabos,
//     salvavidas, un faro que apenas se ve; el barco gira (o.giro 0–1); sitio para un marinero.
export function roosevelt(R, t, o = {}) { provisional(R, t, C.robleS, C.roble); return { suelo: 150 }; }

// ── E · El gabinete de las teorías ──────────────────────────────────────────────────────────────────────────────────
// Un desván de madera con vigas y un ventanuco redondo, lleno de cosas de las teorías del pozo: un mapa de piratas
// clavado, un cofre, un yelmo de templario, una pluma de escribir en su tintero, un retrato con joyas, una bandera
// pirata doblada, un catalejo, libros apilados, velas. o.encuadre:
//   'desvan': el desván entero con un agujero redondo en el suelo de tablas en el centro (de él salen las teorías, que
//     pinta la escena) y sitio para el topo del gag;
//   'retratos': una pared con una fila de retratos de buscadores de distintas épocas (1795, 1803, 1849, 1909, 1965, hoy)
//     en marcos distintos, cada uno con una burbuja vacía encima donde la escena pone el tesoro soñado.
export function gabinete(R, t, o = {}) { provisional(R, t, C.robleS, C.roble); return { suelo: 150 }; }
// el topo del gag: asoma del agujero, coge algo y lo devuelve dentro (o.fase 0–1)
export function topo(R, x, y, t, o = {}) { R.pset(x, y, C.k); }

// ── F · El laboratorio del agua (y el campo de 1878) ──────────────────────────────────────────────────────────────────
// o.encuadre:
//   'mesa': una mesa de laboratorio luminosa con un vaso de zumo con su pajita (el nivel de la pajita igual al del vaso)
//     y, al lado, un tanque de cristal grande con la isla en corte: el mar a los lados, la arcilla arriba, la anhidrita
//     blanca abajo con grietas, el pozo en el centro que se llena hasta el nivel del mar (o.nivel 0–1); al fondo,
//     estanterías con frascos, una pizarra con dibujos (sin letras), la ventana con el mar; sitio para Atom no hace falta
//     (va arriba): sitio para un personaje que señala;
//   'tanque': de cerca, el corte del tanque: la arcilla y, debajo, la anhidrita que se disuelve con gotas y deja cuevas
//     (o.disuelve 0–1), flechitas de agua por las grietas (o.flechas), una esponja en un plato al lado (o.esponja 0–1:
//     se empapa);
//   'campo1878': un campo arado de la isla en 1878, con surcos, piedras, el bosque y el mar al fondo, una granja de
//     madera; o.hundido (0–1): el agujero que se abre en el suelo delante (los bueyes y el arado los pone la escena).
export function labAgua(R, t, o = {}) { provisional(R, t, C.anhidrita, C.aguaPozo); return { suelo: 150 }; }

// ── G · 1965: la cocina de Michigan y el despacho de Miami ─────────────────────────────────────────────────────────────
// o.encuadre:
//   'cocina' (por defecto): la cocina de una casa del norte de Michigan una mañana de enero de 1965, cálida y entrañable.
//     Papel pintado de florecitas con la luz de la lámpara y de la ventana; la ventana de guillotina (x 26–98, y 24–82)
//     con cortinas de cuadros y un geranio, y por ella la nieve que cae a dos velocidades, nubes grises de tres tonos, un
//     pino nevado, la granja vecina con humo, la valla, un coche que pasa por la carretera, el vecino que quita nieve con
//     la pala y un cardenal que salta en el comedero; la encimera con fregadero (gota del grifo), escurreplatos, tostadora
//     y la radio de baquelita (dial encendido y notas que salen); el teléfono de pared; la cocina esmaltada con la tetera
//     que echa vapor y la balda de botes; el calendario (solo números), el reloj de sol dorado (las agujas se mueven), la
//     puerta de atrás con su ventanita nevada, el abrigo de cuadros y las botas que gotean, la nevera redonda (sin marca,
//     con el dibujo de un barco pirata del niño), la escoba; suelo de linóleo a cuadros en perspectiva y alfombra trenzada;
//     la lámpara colgante que se mece y alumbra la mesa; la mesa cromada con mantel de cuadros (va por delante: la pinta
//     R.delante), la silla del niño detrás y otra a la izquierda; en primer término, el cuenco del gato y la cesta de lana.
//     o.revista: 'abierta' (por defecto) | 'cerrada' (la portada inventada, sin letras) | false;
//     o.gato (0–1): el gato entra andando por la mesa desde la derecha y a 1 se sienta encima de la revista (el gag);
//     o.taza (true): la taza humeante; o.delante (true): la mesa se repinta delante de los personajes con R.delante.
//   'miami': el despacho de un constructor en Miami en 1965, a pleno sol. Pared de estuco aguamarina y friso de pino;
//     el ventanal (x 26–150, y 20–92): el paño izquierdo con la persiana veneciana bajada (o.persiana 0–1, por defecto 1)
//     y el derecho abierto; fuera, cielo con cúmulos de tres tonos a tres velocidades, el mar, un edificio en obras con
//     su grúa que gira y obreros, palmeras que se mecen, coches de la época y un paseante, un pelícano; la luz entra a
//     rayas por la persiana y cae sobre el terrazo y la mesa (con la sombra de las palmeras que se mueve y polvo en el
//     aire); el ventilador de techo que gira; el perchero con el casco de obra amarillo y la chaqueta; el mapa de Florida
//     con su chincheta en Miami; un cuadro de una casa; la fuente de agua con burbujas; el archivador con una planta; la
//     mesa de nogal (va por delante) con planos que se levantan con el aire del ventilador, el teléfono de disco, el
//     flexo, el café humeante y la misma revista; el sillón verde detrás; en primer término, una palmera en maceta y un
//     cubo de planos enrollados. o.revista como en la cocina; o.delante (true).
//   'revista': inserto de la mesa de la cocina vista desde arriba: el mantel de cuadros con sus pliegues y la luz de la
//     ventana, la revista grande en el centro (o.pagina 'articulo' por defecto: a la izquierda la isla con su roble y la
//     polea en el mar, a la derecha el corte del pozo con sus plataformas y las cotas 10–90; 'portada': la portada
//     inventada, sin letras), la taza humeante, el plato de galletas con migas, el vaso de leche y un lápiz; o.gato (0–1):
//     el gato atigrado entra por la derecha y se tumba encima de la página.
// Devuelve el suelo y las posiciones útiles (ver la geometría en cada encuadre).
export function casa1965(R, t, o = {}) {
  const enc = o.encuadre ?? 'cocina';
  if (enc === 'miami') return g_miami(R, t, o);
  if (enc === 'revista') return g_revistaMesa(R, t, o);
  return g_cocina(R, t, o);
}
// ── H · Oak Island hoy ──────────────────────────────────────────────────────────────────────────────────────────────
// La isla hoy (2014–2026) y la calzada de 1965. Sin logotipos de la televisión ni letras: solo números. Todo lo fijo de cada
// encuadre se pinta una vez en un búfer (R.nuevo) y se copia; encima va lo que vive. o.encuadre:
//   'excavacion' (por defecto): la zona del Pozo del Dinero hoy. Cielo tramado con cirros, nubes de tres tonos a tres
//     velocidades y gaviotas; la costa de enfrente con casitas, la bahía de Mahone con brillos y un velero; robles y abetos;
//     la valla de obra con malla naranja, los contenedores apilados (chapa ondulada, cerrojos, óxido), el grupo
//     electrógeno que humea, la miniexcavadora que carga tierra en el montón de barro, operarios pequeños (chaleco
//     naranja y casco) que van y vienen, uno con pala; a la derecha la grúa sobre orugas amarilla (orugas con tejas,
//     cabina con el operador, contrapeso con franjas, escape que humea, la baliza que destella, el pórtico y los tirantes)
//     y su pluma de celosía que llega hasta x 128; de la punta baja el cable al vibrador amarillo que agarra el tubo de
//     acero (28 px de ancho, más que una persona, con sus soldaduras y óxido) sobre el brocal del pozo, entre esteras de
//     madera; charcos que reflejan el cielo, conos, mangueras y una pila de tubos de repuesto en primer término.
//       o.tubo 0–1: el tubo baja (0 colgado sobre el brocal; 1 casi todo clavado, solo asoman 14 px), 0,5 por defecto;
//       o.sale 0–1: si se da (> 0), el tubo sale (1 fuera del todo, colgado a 10 px del suelo) embarrado, chorreando agua
//       y con la boca de abajo abierta y vacía; manda sobre o.tubo;
//       o.vibra: true/false fuerza el temblor del vibrador (por defecto vibra mientras baja o sale, entre 0,02 y 0,98);
//       o.vida false: sin la gente pequeña de fondo.
//   'calzada': de perfil, la calzada de tierra y piedra de unos 220 px que une la costa (izquierda, con abetos y una casa
//     de madera) con la isla (derecha, robles); el agua por delante y por detrás con la marea, olas, reflejos, gaviotas,
//     una barca langostera que cruza por detrás y una boya delante; escollera de piedras con algas y la línea mojada.
//       o.epoca '1965' (por defecto 'hoy'): se está construyendo; la calzada llega hasta o.avance (0–1, 0,75 por defecto)
//       con un talud de tierra al final, estacas con banderitas hasta la isla, la excavadora de cadenas naranja (o.excavadora:
//       la x donde va, y entonces anda hacia la isla; sin ella trabaja en el extremo con el brazo) y el volquete de la época
//       que trae piedra, la vuelca y se va (o.camion false lo quita). 'hoy': grava con roderas, postes de madera en el
//       borde de atrás, postes de la luz con cables, la grúa que asoma por encima de los robles de la isla con su baliza,
//       y pasan camiones y una camioneta (o.camiones false: sin tráfico);
//       o.marea 0–1 (por defecto sube y baja despacio): 0 bajamar (se ven las algas), 1 pleamar.
//   'caseta': dentro de la caseta de obra: paneles de madera, techo de placas con la luz fluorescente, la ventana con la
//     excavación detrás (nubes, robles, la pluma de la grúa con el tubo que sube y baja y un operario que pasa, recortado al
//     hueco), el plano de la isla clavado con chinchetas (cuadrícula con números y la cruz del pozo), la pantalla grande con
//     el escáner del subsuelo (capas de colores que ondulan, ecos en arco y el barrido que pasa; o.escaner 0–1 fija el
//     barrido, y en 'hueco' (o.hueco true) el eco claro de una cavidad que destella), el reloj de pared, cascos y chalecos
//     en los ganchos, el mostrador con dos portátiles, un monitor con la «ecografía» en abanico, cafés que humean, papeles,
//     una radio que carga; la fuente de agua con burbujas, el archivador con la cafetera y el suelo de linóleo con huellas
//     de barro.
//   'hallazgos': inserto de la mesa de los hallazgos bajo la lámpara: sobre el fieltro, tres monedas antiguas (la de plata
//     con el perfil gastado y el canto de puntos, una de cobre con cardenillo), tres clavos forjados a mano con óxido, dos
//     maderas antiguas empapadas con sus etiquetas de laboratorio (números y código de barras), una regla de escala, una
//     bolsa de muestras, un cuaderno con lápiz y los guantes azules; al fondo, en la pared, el cuadro de una granja de
//     colonos de 1760 (casa de madera, campos, valla, roble, una vaca y el mar) y un estante con frascos y un microscopio.
//     Vida: la lupa que se mece sobre o.lupa ('moneda' por defecto, 'clavo', 'madera' o false: sin lupa) y aumenta lo
//     que tapa, el destello que cruza la moneda y motas en la luz.
// o.delante false: sin el primer término que va por delante de los personajes (si no, lo deja en R.delante; también se
// puede llamar a oakHoyDelante()). Devuelve la geometría del encuadre (suelo, pies, libre y lo demás: ver H_OAK).
export function oakHoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'excavacion';
  const g = enc === 'calzada' ? h_calzada(R, t, o) : enc === 'caseta' ? h_caseta(R, t, o) : enc === 'hallazgos' ? h_hallazgos(R, t, o) : h_excavacion(R, t, o);
  R.recorte(null);
  if (o.delante !== false && (enc === 'excavacion' || enc === 'caseta')) { const antes = R.delante; R.delante = () => { antes?.(); oakHoyDelante(R, t, o); }; }
  return g;
}
// la mesa de la cocina o la del despacho, para pintarla a mano delante de los personajes (casa1965 ya lo hace solo con
// R.delante, salvo o.delante false); o igual que en casa1965 (encuadre, revista, gato)
export function casa1965Mesa(R, t, o = {}) {
  if ((o.encuadre ?? 'cocina') === 'miami') g_mesaMiami(R, t, o); else g_mesaCocina(R, t, o);
}

// tramado 4×4 (umbral entre 0 y 1) para los degradados y las luces
const g_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const g_b4 = (x, y) => (g_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// el búfer de lo fijo de cada encuadre: se pinta una vez y se copia en cada fotograma
const g_CACHE = new WeakMap();

function g_fijo(R, clave, dibuja) {
  let m = g_CACHE.get(R); if (!m) g_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// mezcla de dos colores (k = 0: a; k = 1: b)
function g_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara u oscurece un píxel ya pintado hacia el color c
function g_tiñe(R, x, y, c, k) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, g_mezcla(R.pget(x, y), c, k)); }

// un rectángulo que respeta un recorte (cl = [x0, y0, x1, y1]); R.rect no lo respeta
function g_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// degradado tramado vertical entre varios colores, dentro de un rectángulo; luz(x, y) suma o resta tono
function g_degradado(R, x0, y0, x1, y1, cols, luz = null) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = (y - y0) / alto * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// una nube de tres tonos hecha de bolas (c = [sombra, cuerpo, luz]); k da su forma; respeta R.recorte
function g_nube3(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(3, Math.floor(w / 14)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.8 + (h(k, i, 501) - 0.5) * 4, cy - m * (2 + h(k, i, 502) * 3), w * (0.12 + h(k, i, 503) * 0.08) + m * 2]); }
  for (const [x, y, r] of B) R.disco(x, y + 1.5, r, c[0]);
  for (const [x, y, r] of B) R.disco(x, y, r * 0.92, c[1]);
  for (const [x, y, r] of B) R.disco(x - r * 0.25, y - r * 0.35, r * 0.55, c[2]);
}

// vapor que sube de una taza o de una tetera (x, y: la boca), en bocanadas que crecen y se deshacen por el borde
function g_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 16) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.32 + i / 3 + k * 0.29) % 1, r = 1.2 + u * 3, cx = x + u * alto * 0.35 + Math.sin(u * 6 + k + t * 0.8) * 1.4, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (g_b4(xx, yy) < (1.05 - u) * (1.25 - d) * 0.9) R.pset(xx, yy, col); } }
}

// copos de nieve que caen con vaivén dentro de cl: n copos, v velocidad, g tamaño (1 o 2), k semilla
function g_nieve(R, t, cl, n, v, g, k, col = C.blanco, col2 = hex('#d8e2ee')) {
  const W = cl[2] - cl[0] + 1, H = cl[3] - cl[1] + 6;
  for (let i = 0; i < n; i++) { const vv = v * (0.75 + h(i, 3, k) * 0.5), y = cl[1] - 3 + ((h(i, 1, k) * H + t * vv) % H), x = cl[0] + (((h(i, 2, k) * W + Math.sin(t * 0.9 + i * 1.7) * 2.5 + t * v * 0.25) % W) + W) % W;
    R.pset(x, y, col); if (g > 1) { R.pset(x + 1, y, col2); R.pset(x, y + 1, col2); } }
}

// un pino nevado por pisos (x: el eje; base: el pie; alto; cols = [sombra, cuerpo, luz]; respeta R.recorte)
function g_pino(R, x, base, alto, cols, k = 0) {
  const pisos = Math.max(2, Math.round(alto / 7)), nv = hex('#f4f8fc'), nvS = hex('#c4d2e4');
  R.linea(x, base, x, base - 3, hex('#4a3a2e'));
  for (let p = 0; p < pisos; p++) { const yb = base - 2 - Math.round(p * (alto - 4) / pisos), ya = yb - Math.round(alto / pisos) - 3, w = Math.round((pisos - p) / pisos * alto * 0.36) + 1;
    R.poligono([[x - w, yb], [x + w + 1, yb], [x + 0.5, ya]], cols[1]);
    R.poligono([[x + 1, yb], [x + w + 1, yb], [x + 1, ya + 2]], cols[0]);
    for (let i = -w; i <= w; i++) { const yy = yb - Math.round((w - Math.abs(i)) * (yb - ya) / (w + 1)); if (h(i, p, 510 + k) < 0.75) { R.pset(x + i, yy, i < 0 ? nv : nvS); if (Math.abs(i) < w - 1 && h(i, p, 511 + k) < 0.5) R.pset(x + i, yy + 1, i < 0 ? nv : nvS); } }
    R.linea(x - w, yb, x + w, yb, nvS); for (let i = -w; i <= w; i += 2) R.pset(x + i, yb, nv); }
}

// geometría: pared hasta y 117, suelo de 118 a 179; encimera x 0–112 (encima, y 95), cocina esmaltada x 114–148, nevera
// x 258–298 × 58–117, puerta de atrás x 222–252 × 44–117; la mesa: tablero x 134–238 × 138–147, mantel hasta 156, patas
// hasta 164; el niño sentado detrás: actor x 168, suelo 145.
const G_PAPEL = ['#b8a684', '#d2c29c', '#e6d8b6', '#f2e8cc', '#faf4e0'].map(hex);

const G_MANTEL = ['#f6f0e6', '#eaa496', '#c8443c', '#9a2e2a', '#d8ccc0'].map(hex);

// el color del mantel de cuadros vingí en (x, y) con celdas de cw × ch; luz: -1…1
function g_vichy(x, y, cw, ch, luz = 0) {
  const a = Math.floor(x / cw) & 1, b = Math.floor(y / ch) & 1, base = a && b ? 3 : a || b ? 1 : 0;
  if (luz < -0.3 + g_b4(x, y) * 0.5) return base === 0 ? G_MANTEL[4] : base === 1 ? G_MANTEL[2] : hex('#7a2420');
  return base === 3 ? G_MANTEL[2] : base === 1 ? G_MANTEL[1] : G_MANTEL[0];
}

function g_cocina(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  g_fijo(R, 'cocina', () => g_cocinaFijo(R));
  // fuera de la ventana de guillotina (los cuatro cristales), con la nieve, recortado al hueco
  const CL = [30, 28, 94, 76];
  R.recorte(CL); g_fuera(R, t, CL); R.recorte(null);
  // los peinazos y el travesaño, la escarcha de las esquinas y un reflejo
  const MB = hex('#f2eee4'), MS = hex('#c8c0b0');
  rect(61, 28, 63, 76, MB); rect(63, 28, 63, 76, MS); rect(30, 50, 94, 53, MB); rect(30, 53, 94, 53, MS); rect(30, 49, 94, 49, hex('#fbf8f0'));
  for (const [x0, x1, yb] of [[30, 60, 49], [64, 94, 49], [30, 60, 76], [64, 94, 76]]) for (let j = 0; j < 8; j++) for (let x = x0; x <= x1; x++) { const d = Math.min(x - x0, x1 - x); if (d + j * 1.6 < 7 && g_b4(x, yb - j) < 0.6 - (d + j) * 0.05) pset(x, yb - j, hex('#eef4fa')); }
  for (let i = 0; i < 9; i++) { pset(68 + i, 44 - i, hex('#e2eaf2')); pset(70 + i, 44 - i, hex('#e2eaf2')); pset(34 + i, 72 - i, hex('#dce6f0')); }
  // las cortinas de cuadros recogidas con su lazo y la galería festoneada
  for (const [xa, dir] of [[18, 1], [106, -1]]) for (let y = 24; y <= 76; y++) {
    const ancho = y < 56 ? 13 - Math.round((y - 24) * 0.12) : y < 62 ? 7 : 7 + Math.round((y - 62) * 0.45);
    for (let i = 0; i < ancho; i++) { const x = xa + i * dir, pl = Math.sin(i * 1.3 + y * 0.05) < -0.4 ? -1 : 0; pset(x, y, g_vichy(x + 200, y, 3, 3, pl + (i === ancho - 1 ? -0.6 : 0))); }
    pset(xa + ancho * dir, y, K); }
  for (const xa of [18, 106]) { rect(xa - 2, 59, xa + 9, 61, K); rect(xa - 2, 60, xa + 9, 60, hex('#f2d27a')); }
  for (let y = 16; y <= 28; y++) for (let x = 16; x <= 108; x++) { const fest = 25 + Math.round(Math.abs(Math.sin((x - 16) * Math.PI / 13)) * 3); if (y > fest) continue; pset(x, y, y === fest ? K : g_vichy(x, y + 300, 3, 3, y < 18 ? 0.5 : y > fest - 2 ? -0.5 : 0)); }
  rect(14, 15, 110, 16, hex('#b89a5a')); rect(14, 15, 110, 15, hex('#f2d27a')); disco(13, 15, 2, hex('#c8a050')); disco(111, 15, 2, hex('#c8a050'));
  // el geranio en su maceta de barro y la botellita azul del alféizar
  rect(41, 71, 51, 78, K); rect(42, 72, 50, 77, hex('#c8683a')); rect(42, 72, 50, 73, hex('#e08a50')); rect(48, 74, 50, 77, hex('#a04e2a'));
  for (let k = 0; k < 9; k++) { const a = k * 0.7 + Math.sin(t * 0.6) * 0.04, x = Math.round(46 + Math.cos(a) * 5), y = Math.round(67 + Math.sin(a) * 3); disco(x, y, 2, k % 3 ? C.hierbaS : C.hierba); }
  for (const [x, y] of [[44, 62], [49, 63], [46, 59]]) { disco(x, y, 2, C.rojoS); pset(x, y - 1, hex('#f0604a')); pset(x - 1, y, C.rojo); pset(x + 1, y - 1, hex('#ff8a6a')); }
  rect(80, 70, 84, 78, K); rect(81, 71, 83, 77, hex('#3a6ab8')); pset(81, 72, hex('#a8d0f0')); rect(81, 68, 83, 70, K);
  // por la ventanita de la puerta de atrás: el porche nevado y la nieve que cae
  const PC = [226, 50, 248, 74];
  R.recorte(PC);
  g_degradado(R, 226, 50, 248, 64, ['#9aa6ba', '#b4bece', '#ccd4de'].map(hex));
  for (const [x, a] of [[229, 12], [238, 9], [246, 14]]) g_pino(R, x, 66, a, ['#4a5e66', '#5e727a', '#7a8e94'].map(hex), x);
  rect(226, 65, 248, 74, hex('#e6ecf2')); for (let x = 226; x <= 248; x++) if (h(x, 4, 520) < 0.4) pset(x, 66 + (x & 1), hex('#c8d4e2'));
  for (let x = 226; x <= 248; x += 5) { linea(x, 67, x, 74, hex('#8a6a4a')); pset(x, 66, C.blanco); } linea(226, 68, 248, 68, hex('#8a6a4a')); linea(226, 67, 248, 67, C.blanco);
  g_nieve(R, t, PC, 14, 9, 1, 521); g_nieve(R, t, PC, 5, 15, 2, 522);
  R.recorte(null);
  rect(236, 50, 237, 74, hex('#e8e0cc')); rect(226, 61, 248, 62, hex('#e8e0cc')); rect(237, 50, 237, 74, hex('#b8ae98'));
  // el reloj de sol dorado: las agujas y el segundero que salta
  { const cx = 200, cy = 34, hora = 7.6 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(ah) * 3), Math.round(cy + Math.sin(ah) * 3), K); linea(cx, cy, Math.round(cx + Math.cos(am) * 5), Math.round(cy + Math.sin(am) * 5), K);
    linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), C.rojo); pset(cx, cy, C.oroS); }
  // la radio: el dial que brilla y las notas que salen flotando
  { const br = 0.75 + 0.25 * Math.sin(t * 7) * Math.sin(t * 2.3); rect(17, 86, 23, 88, br > 0.8 ? hex('#ffd878') : hex('#f0b850')); pset(18 + Math.round((Math.sin(t * 0.2) + 1) * 2), 87, C.rojo);
    for (let k = 0; k < 3; k++) { const u = (t * 0.28 + k / 3) % 1, x = Math.round(14 + u * 18 + Math.sin(u * 9 + k) * 2), y = Math.round(82 - u * 26), c = u > 0.75 ? hex('#c8b894') : hex('#5a4a3a');
      if (u > 0.92) continue; pset(x, y, c); pset(x + 1, y, c); pset(x, y + 1, c); pset(x + 1, y + 1, c); linea(x + 2, y - 4, x + 2, y + 1, c); if (k % 2) pset(x + 3, y - 4, c); } }
  // la tetera que echa vapor, la gota del grifo y las botas que gotean
  g_vapor(R, 133, 86, t, 0, hex('#f4f2ee'), 18);
  { const u = (t % 3.1) / 3.1; if (u < 0.5) pset(66, 93, hex('#a8d0f0')); else if (u < 0.62) pset(66, 93 + Math.round((u - 0.5) * 30), hex('#a8d0f0')); }
  { const u = (t % 2.3) / 2.3; if (u < 0.75) pset(212, 113 + Math.round(u * 4), hex('#a8c8e0')); else { pset(210, 119, hex('#c8dcec')); pset(214, 119, hex('#c8dcec')); } }
  // la lámpara colgante de cristal de leche, que se mece un poco, con su luz
  { const s = Math.sin(t * 0.9) * 1.2, lx = Math.round(176 + s), ly = 70;
    for (let y = 0; y <= ly - 6; y++) pset(Math.round(176 + s * y / (ly - 6)), y, y < 15 ? hex('#a8987a') : hex('#4a3a30'));
    R.halo(lx, ly + 2, 15, [hex('#f6e6b4'), hex('#fbefc6'), hex('#fff6da')], 0.9);
    for (let j = 0; j < 7; j++) { const w = 2 + Math.round(j * 1.3); rect(lx - w - 1, ly - 6 + j, lx + w + 1, ly - 6 + j, K); rect(lx - w, ly - 6 + j, lx + w, ly - 6 + j, j < 2 ? hex('#fffaf0') : hex('#f2ead6')); pset(lx + w, ly - 6 + j, hex('#d8ccb0')); pset(lx - w + 1, ly - 6 + j, C.blanco); }
    rect(lx - 10, ly + 1, lx + 10, ly + 1, K); rect(lx - 9, ly + 1, lx + 9, ly + 1, hex('#e8d8b0')); rect(lx - 2, ly - 8, lx + 2, ly - 7, hex('#c8a050'));
    rect(lx - 3, ly + 2, lx + 3, ly + 3, hex('#fff6c8')); }
  // la mesa, el niño y el gato: la mesa se pinta aquí y otra vez delante de los personajes
  g_mesaCocina(R, t, o);
  if (o.delante !== false) R.delante = () => g_mesaCocina(R, t, o);
  return { suelo: 150, nino: [168, 145], mesa: [134, 138, 238, 164], revista: [182, 142], gato: [184, 143], ventana: [26, 24, 98, 82], puerta: [222, 44, 252, 117], nevera: [258, 58, 298, 117], cocina: [114, 82, 148, 117], radio: [14, 88], silla: [112, 166] };
}

// lo fijo de la cocina: pared, muebles, suelo y alfombra (en el búfer)
function g_cocinaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // el papel pintado: rayas finas y florecitas en tresbolillo, más claro junto a la lámpara y la ventana, más oscuro arriba
  // y en los rincones
  const ROJ = hex('#c8584a'), ROS = hex('#e8a48e'), VER = hex('#6a9a6a'), TEA = hex('#5aa49a');
  for (let y = 0; y <= 117; y++) for (let x = 0; x <= 319; x++) {
    const dl = Math.hypot(x - 176, (y - 72) * 1.3), dw = Math.hypot(x - 62, y - 52);
    let v = 1.4 + Math.max(0, 1 - dl / 120) * 1.5 + Math.max(0, 1 - dw / 80) * 0.6 - (y < 22 ? (22 - y) / 22 * 0.9 : 0) - (x > 296 ? (x - 296) / 24 * 0.8 : 0) - (x < 8 ? (8 - x) / 8 * 0.5 : 0);
    const raya = x % 14 === 0 || x % 14 === 2; if (raya) v -= 0.6;
    let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; l = Math.max(0, Math.min(4, l)); let c = G_PAPEL[l];
    const cx = x % 14, cy = (y + ((Math.floor(x / 14) & 1) ? 8 : 0)) % 16;
    if (cx === 7 && cy === 8) c = (Math.floor(x / 14) + Math.floor(y / 16)) % 3 ? ROJ : TEA;
    else if ((cx === 6 || cx === 8) && cy === 8 || cx === 7 && (cy === 7 || cy === 9)) c = (Math.floor(x / 14) + Math.floor(y / 16)) % 3 ? ROS : hex('#a8d4c8');
    else if (cx === 9 && cy === 10 || cx === 8 && cy === 11) c = VER;
    if (l <= 1 && c !== G_PAPEL[l]) c = g_mezcla(c, G_PAPEL[0], 0.45);
    pset(x, y, c);
  }
  // el friso de machihembrado verde menta a la derecha (detrás de la mesa), con su moldura
  for (let y = 86; y <= 113; y++) for (let x = 150; x <= 319; x++) { const b = (x - 150) % 5; const sh = Math.hypot(x - 176, y - 72) < 70 ? 0 : 1;
    pset(x, y, b === 0 ? hex('#7aa890') : b === 1 ? hex('#d6eede') : sh ? hex('#a8ccb6') : hex('#b8dac4')); }
  rect(150, 83, 319, 86, K); rect(150, 84, 319, 85, hex('#9a6a3a')); rect(150, 84, 319, 84, hex('#c8945a'));
  // el zócalo de madera
  rect(0, 113, 319, 117, hex('#6a4224')); rect(0, 113, 319, 113, hex('#a8743c')); rect(0, 117, 319, 117, K);
  // el teléfono de pared verde menta con su cable rizado
  rect(4, 50, 14, 70, K); rect(5, 51, 13, 69, hex('#9ccab4')); rect(5, 51, 13, 52, hex('#cceadb')); rect(12, 53, 13, 69, hex('#6a9a84'));
  disco(9, 63, 3, hex('#f2eee4')); for (let k = 0; k < 8; k++) pset(Math.round(9 + Math.cos(k * 0.78) * 2), Math.round(63 + Math.sin(k * 0.78) * 2), hex('#5a6a6a')); pset(9, 63, K);
  rect(3, 52, 5, 64, K); rect(2, 51, 5, 54, hex('#8abaa4')); rect(2, 61, 5, 64, hex('#8abaa4')); rect(3, 54, 4, 61, hex('#7aaa94'));
  for (let y = 65; y < 92; y++) pset(3 + Math.round(Math.sin(y * 1.6) * 1.5), y, y & 1 ? hex('#6a9a84') : hex('#3a5a4a'));
  // la ventana: el marco blanco con su sombra y el alféizar
  rect(25, 23, 99, 83, K); rect(26, 24, 98, 82, hex('#f2eee4')); rect(26, 24, 98, 25, C.blanco); rect(96, 26, 98, 82, hex('#d2cabb')); rect(29, 27, 95, 77, hex('#b8b0a0'));
  rect(22, 78, 102, 82, K); rect(23, 78, 101, 81, hex('#f2eee4')); rect(23, 78, 101, 78, C.blanco); rect(23, 81, 101, 81, hex('#c8c0b0')); rect(24, 83, 100, 84, hex('#b4a888'));
  // el alicatado de la encimera (azulejitos blancos con su junta)
  for (let y = 85; y <= 94; y++) for (let x = 0; x <= 112; x++) { const j = (x % 5 === 0) || ((y - 85) % 5 === 0); pset(x, y, j ? hex('#bcc4c8') : (x + y) % 9 === 0 ? C.blanco : hex('#e6ecee')); }
  // la radio de baquelita sobre la encimera: la rejilla, el dial y los dos botones
  rect(3, 83, 27, 95, K); rect(4, 84, 26, 95, hex('#7a4a2a')); rect(4, 84, 26, 85, hex('#a86a3a')); rect(25, 85, 26, 95, hex('#5a3418')); rect(5, 83, 25, 83, K);
  rect(6, 86, 14, 93, hex('#e8dcc0')); for (let y = 87; y <= 92; y += 2) rect(6, y, 14, y, hex('#b8a47c')); rect(16, 85, 24, 89, K);
  disco(18, 92, 1.5, hex('#f2e2c0')); disco(23, 92, 1.5, hex('#f2e2c0')); pset(18, 91, C.blanco); pset(23, 91, C.blanco);
  // la encimera de formica con el canto cromado
  rect(0, 95, 112, 99, hex('#f2e2b0')); for (let i = 0; i < 70; i++) { const x = Math.round(h(i, 1, 530) * 110), y = 96 + Math.round(h(i, 2, 530) * 2); pset(x, y, i % 3 ? hex('#d8c08a') : hex('#e8889a')); pset(x + 1, y, i % 3 ? hex('#d8c08a') : hex('#e8889a')); }
  rect(0, 95, 112, 95, hex('#fff6d8')); rect(0, 99, 112, 99, hex('#c8ccd4')); rect(0, 100, 112, 100, hex('#7a7e88')); rect(113, 95, 113, 100, K);
  // el fregadero, el grifo de cuello de cisne, el escurreplatos con los platos y la tostadora cromada
  rect(44, 95, 80, 98, K); rect(45, 96, 79, 98, hex('#8a96a2')); rect(45, 96, 79, 96, hex('#5e6a76')); rect(46, 98, 78, 98, hex('#aab4be'));
  linea(66, 95, 66, 87, hex('#c8d2dc')); linea(67, 95, 67, 87, hex('#7a8692')); linea(66, 87, 70, 86, hex('#c8d2dc')); linea(70, 86, 70, 90, hex('#c8d2dc')); pset(71, 87, hex('#7a8692')); for (const x of [60, 72]) { rect(x - 1, 92, x + 1, 94, hex('#c8d2dc')); pset(x, 91, C.blanco); }
  rect(82, 88, 97, 95, hex('#9aa4b0')); for (let x = 83; x <= 96; x += 2) linea(x, 88, x, 94, hex('#c8d0dc'));
  for (const [x, c] of [[85, '#f2eee4'], [88, '#e8b0a0'], [91, '#a8d4c8'], [94, '#f2eee4']]) for (let j = 0; j < 9; j++) { const w = Math.round(Math.sin((j + 0.5) / 9 * Math.PI) * 1.6); rect(x - w, 84 + j, x + w, 84 + j, hex(c)); pset(x - w, 84 + j, hex('#9a8a7a')); }
  rect(99, 86, 111, 95, K); rect(100, 87, 110, 95, hex('#c8d2dc')); rect(100, 87, 110, 88, C.blanco); rect(108, 88, 110, 95, hex('#7a8692')); rect(102, 86, 104, 86, hex('#3a3a4a')); rect(106, 86, 108, 86, hex('#3a3a4a')); rect(101, 90, 103, 93, hex('#e8eef4')); rect(111, 89, 112, 91, K);
  // los armarios bajos verde menta: puertas con su bisel, tiradores cromados y el rodapié
  rect(0, 101, 112, 112, hex('#9ccab4'));
  for (const [x0, x1] of [[1, 27], [29, 55], [57, 83], [85, 111]]) { rect(x0, 102, x1, 111, hex('#6a9a84')); rect(x0, 102, x1 - 1, 110, hex('#cceadb')); rect(x0 + 1, 103, x1 - 1, 110, hex('#a8d4c0')); rect(x0 + 3, 105, x1 - 3, 108, hex('#9ccab4')); rect(x0 + 3, 105, x1 - 3, 105, hex('#86b49e'));
    const hx = x0 + 13 > 55 && x0 < 60 ? x0 + 2 : (x0 < 30 ? x1 - 3 : x0 + 2); rect(hx, 104, hx + 1, 107, hex('#c8d2dc')); pset(hx, 104, C.blanco); }
  rect(0, 112, 112, 117, hex('#3a3236')); rect(0, 112, 112, 112, hex('#5a5256'));
  // la cocina esmaltada: el respaldo con sus botones, los fuegos, la tetera roja, la sartén y el horno con su ventanilla
  rect(113, 80, 149, 117, K); rect(114, 81, 148, 94, hex('#f2f0ea')); rect(114, 81, 148, 82, C.blanco); rect(146, 83, 148, 94, hex('#c8c4bc')); rect(114, 89, 148, 89, hex('#c8d2dc'));
  for (const x of [118, 124, 138, 144]) { disco(x, 86, 1.5, K); pset(x, 85, hex('#7a7e88')); }
  rect(128, 84, 134, 87, hex('#3a3a4a')); rect(129, 85, 133, 86, hex('#8ac0a8'));
  rect(114, 94, 148, 97, hex('#e8e6e0')); rect(114, 94, 148, 94, C.blanco); for (const x of [121, 141]) { rect(x - 5, 96, x + 5, 96, hex('#3a3a3a')); pset(x, 95, hex('#5a5a5a')); }
  // la tetera
  disco(131, 91, 5, K); disco(131, 91, 4, hex('#c83a3a')); rect(127, 92, 135, 95, K); rect(128, 92, 134, 94, hex('#c83a3a')); disco(130, 89, 1.5, hex('#f07a6a')); rect(129, 85, 133, 86, K); rect(130, 84, 132, 85, hex('#3a3a3a'));
  linea(135, 92, 138, 88, K); linea(135, 91, 137, 88, hex('#c83a3a')); rect(128, 95, 134, 95, hex('#8e2424'));
  // la sartén de hierro
  rect(138, 94, 148, 95, K); rect(139, 94, 147, 94, hex('#4a4a52')); linea(148, 94, 152, 92, K);
  rect(114, 98, 148, 116, hex('#f2f0ea')); rect(114, 98, 148, 98, C.blanco); rect(146, 98, 148, 116, hex('#c8c4bc'));
  rect(116, 100, 146, 100, hex('#c8d2dc')); rect(117, 99, 145, 99, hex('#7a8692'));
  rect(118, 103, 142, 112, K); rect(119, 104, 141, 111, hex('#2e2a30')); rect(120, 105, 126, 105, hex('#6a6470')); rect(119, 110, 141, 111, hex('#4a3a3a'));
  rect(116, 116, 119, 117, K); rect(143, 116, 146, 117, K);
  // la balda con los botes rojos graduados y un molinillo
  rect(112, 67, 150, 69, K); rect(113, 67, 149, 68, hex('#a8743c')); rect(113, 67, 149, 67, hex('#d09a5c'));
  for (const x of [116, 146]) { linea(x, 69, x + 3, 73, K); linea(x, 70, x + 2, 73, hex('#8a5a30')); }
  for (const [x, w, hh] of [[114, 9, 14], [124, 8, 12], [133, 7, 10], [141, 6, 8]]) { rect(x, 67 - hh, x + w, 66, K); rect(x + 1, 68 - hh, x + w - 1, 66, hex('#c83a3a')); rect(x + 1, 68 - hh, x + 2, 66, hex('#e8705a')); rect(x + w - 2, 68 - hh, x + w - 1, 66, hex('#8e2424')); rect(x, 65 - hh, x + w, 66 - hh, hex('#f2eee4')); rect(x + 2, 72 - hh, x + w - 2, 73 - hh, hex('#f2eee4')); pset(x + w / 2 | 0, 64 - hh, K); }
  // el calendario: la lámina del lago en verano y la cuadrícula de días (un día marcado en rojo)
  rect(151, 27, 173, 63, K); rect(152, 28, 172, 62, hex('#f6f0e2')); pset(162, 25, K); linea(162, 26, 154, 28, hex('#7a6a5a')); linea(162, 26, 170, 28, hex('#7a6a5a'));
  g_degradado(R, 153, 29, 171, 38, ['#5aa0d8', '#8ac4ea', '#c8e4f4'].map(hex)); rect(153, 39, 171, 41, hex('#3a78b0')); for (let x = 153; x <= 171; x += 3) pset(x, 40, hex('#a8d8f4'));
  poligono([[153, 39], [158, 33], [163, 39]], hex('#5a8a5a')); poligono([[160, 39], [166, 35], [172, 39]], hex('#4a7a4a')); rect(165, 36, 166, 39, C.blanco); linea(165, 35, 168, 38, C.blanco);
  rect(153, 42, 171, 44, hex('#4a7a3a')); disco(157, 31, 2, hex('#fff2b0'));
  for (let f = 0; f < 5; f++) for (let d = 0; d < 7; d++) { const x = 154 + d * 2.6 | 0, y = 47 + f * 3; pset(x, y, hex('#5a5a6a')); pset(x + 1, y, hex('#5a5a6a')); }
  { const x = 154 + 3 * 2.6 | 0, y = 47 + 2 * 3; for (let k = 0; k < 8; k++) pset(Math.round(x + 0.5 + Math.cos(k * 0.8) * 2), Math.round(y + Math.sin(k * 0.8) * 1.6), C.rojo); }
  // el reloj de sol dorado (rayos, el aro y la esfera)
  { const cx = 200, cy = 34; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, r = k % 2 ? 11 : 14; linea(Math.round(cx + Math.cos(a) * 8), Math.round(cy + Math.sin(a) * 8), Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), k % 4 < 2 ? hex('#c8a040') : hex('#e8c860')); pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#fff0a0')); }
    disco(cx, cy, 8, K); disco(cx, cy, 7, hex('#c8a040')); disco(cx, cy, 6, hex('#f6f0e2')); disco(cx - 1, cy - 1, 4, hex('#fffaf0'));
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5), Math.round(cy + Math.sin(k * Math.PI / 6) * 5), k % 3 ? hex('#9a8a6a') : K); }
  // el abrigo de cuadros y el gorro de lana en la percha, y las botas de nieve sobre su felpudo
  rect(203, 55, 219, 56, hex('#6a4224')); for (const x of [207, 215]) rect(x, 54, x, 58, hex('#c8a050'));
  for (let y = 57; y <= 92; y++) { const w = Math.round(4 + (y - 57) * 0.18); for (let x = 207 - w; x <= 207 + w; x++) { const c = ((x >> 1) + (y >> 1)) % 4 === 0 ? hex('#2a2a2a') : (x % 4 === 0 || y % 4 === 0) ? hex('#8e2424') : hex('#c83a3a'); pset(x, y, x === 207 + w ? K : x > 207 + w - 2 ? g_mezcla(c, K, 0.3) : c); } pset(207 - w - 1, y, K); }
  rect(206, 60, 208, 92, hex('#8e2424')); for (let y = 63; y < 92; y += 6) pset(208, y, hex('#3a2a20'));
  disco(215, 64, 4, K); disco(215, 64, 3, hex('#3a6ab8')); rect(211, 65, 219, 67, hex('#f2eee4')); for (let x = 211; x <= 219; x += 2) pset(x, 66, hex('#3a6ab8')); disco(215, 59, 2, hex('#f2eee4')); pset(214, 58, C.blanco);
  rect(201, 115, 223, 119, hex('#6a5a3a')); for (let x = 202; x < 223; x += 2) pset(x, 117, hex('#8a7a52'));
  for (const x of [204, 213]) { rect(x, 104, x + 6, 116, K); rect(x + 1, 105, x + 5, 115, hex('#4a3020')); rect(x + 1, 113, x + 8, 116, K); rect(x + 2, 113, x + 7, 115, hex('#3a2418')); rect(x, 104, x + 6, 106, hex('#d8d0c0')); pset(x + 1, 105, C.blanco); rect(x + 2, 106, x + 2, 112, hex('#6a4a30')); }
  // la puerta de atrás de cuarterones, con su marco, el pomo de latón y la ventanita
  rect(219, 41, 255, 117, K); rect(220, 42, 254, 117, hex('#f2eee4')); rect(220, 42, 254, 43, C.blanco);
  rect(222, 44, 252, 117, hex('#c89a64')); rect(222, 44, 222, 117, hex('#e0b47a')); rect(252, 44, 252, 117, hex('#8a6a3a'));
  rect(225, 48, 249, 76, K);
  for (const [x0, y0, x1, y1] of [[225, 80, 236, 112], [239, 80, 249, 112]]) { rect(x0, y0, x1, y1, hex('#8a6a3a')); rect(x0, y0, x1 - 1, y1 - 1, hex('#e0b47a')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#b88a54')); for (let y = y0 + 3; y < y1 - 1; y++) if (h(x0, y, 540) > 0.2) pset(x0 + 4 + Math.round(Math.sin(y * 0.2 + x0) * 1.2), y, hex('#a87a46')); }
  disco(248, 82, 2, K); disco(248, 82, 1.5, hex('#e8c040')); pset(247, 81, hex('#fff0a0')); rect(246, 86, 249, 89, hex('#c8a040'));
  // la nevera redonda de los cincuenta: esquinas redondeadas, el lateral en sombra, el tirador cromado, la rejilla, el
  // dibujo del niño (un barco pirata y una isla) y un imán de limón; encima, el bote de galletas
  { const x0 = 258, x1 = 298, y0 = 58, y1 = 113, r = 7;
    for (let y = y0; y <= y1; y++) { let a = x0, b = x1; if (y < y0 + r) { const d = r - Math.sqrt(Math.max(0, r * r - (y0 + r - y) ** 2)); a = Math.round(x0 + d); b = Math.round(x1 - d); }
      rect(a - 1, y, b + 1, y, K); for (let x = a; x <= b; x++) { const u = (x - x0) / (x1 - x0); pset(x, y, u < 0.06 ? hex('#ffffff') : u < 0.55 ? hex('#f4f2ec') : u < 0.86 ? hex('#e2e0d8') : u < 0.95 ? hex('#c4c2ba') : hex('#a8a69e')); } }
    rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, K); rect(x0 + 3, y0 + 2, x0 + 4, y0 + 30, C.blanco);
    rect(x0, 75, x1 - 1, 75, hex('#b8b6ae')); rect(x0, 76, x1 - 1, 76, C.blanco);
    rect(289, 66, 293, 82, K); rect(290, 67, 292, 81, hex('#c8d2dc')); rect(290, 67, 290, 81, C.blanco); rect(288, 70, 289, 78, hex('#7a8692'));
    rect(x0 + 2, 106, x1 - 2, 112, hex('#3a3a3a')); for (let x = x0 + 3; x < x1 - 2; x += 2) rect(x, 107, x, 111, hex('#9aa4b0')); rect(x0, 113, x1, 114, K); rect(x0 + 2, 115, x0 + 4, 117, K); rect(x1 - 4, 115, x1 - 2, 117, K);
    rect(265, 82, 281, 96, hex('#d8d0c0')); rect(264, 81, 280, 95, hex('#fdfaf0')); g_degradado(R, 265, 82, 279, 89, ['#8ac8f0', '#b8e0f8'].map(hex)); rect(265, 90, 279, 94, hex('#5a9ad8')); for (let x = 265; x <= 279; x += 2) pset(x, 90, hex('#2a6ab8'));
    rect(268, 87, 276, 89, hex('#8a5a30')); linea(270, 87, 270, 82, hex('#5a3a20')); poligono([[271, 82], [271, 86], [276, 86]], hex('#f6f2ea')); rect(270, 81, 272, 81, K); rect(268, 89, 276, 89, K);
    disco(276, 92, 2, hex('#e8c040')); pset(276, 93, hex('#5a9a3a')); rect(271, 80, 273, 81, C.rojo);
    disco(285, 99, 2, K); disco(285, 99, 1.5, hex('#f0d040')); pset(284, 98, C.blanco);
    rect(270, 49, 284, 58, K); rect(271, 50, 283, 57, hex('#e8d8b4')); rect(271, 50, 273, 57, hex('#fff6da')); rect(281, 50, 283, 57, hex('#b8a47c')); rect(270, 47, 284, 49, K); rect(271, 47, 283, 48, hex('#c83a3a')); rect(276, 45, 278, 46, K);
    for (let k = 0; k < 4; k++) disco(274 + k * 3, 54, 1, hex('#a8743c')); }
  // la escoba apoyada en el rincón y el recogedor
  linea(316, 54, 306, 104, hex('#c8a060')); linea(317, 54, 307, 104, hex('#8a6a3a'));
  poligono([[300, 104], [312, 103], [316, 117], [300, 117]], hex('#d8b45a')); for (let x = 301; x <= 314; x += 2) linea(x, 105, x + 1, 117, hex('#a8843a')); rect(301, 103, 312, 105, C.rojo);
  rect(301, 113, 299, 117, K);
  // el suelo de linóleo a cuadros rojos y crema en perspectiva, con juntas, brillo de cera y sombras junto a los muebles
  const L1 = ['#7e3a32', '#9a4c40', '#b25c4c', '#c26e5c'].map(hex), L2 = ['#bcae94', '#d0c2a6', '#e0d4ba', '#ece2cc'].map(hex);
  for (let y = 118; y <= 179; y++) { const d = y - 64, vv = 1150 / d, fv = vv - Math.floor(vv);
    for (let x = 0; x <= 319; x++) { const uu = (x - 176) / d * 7.5 + 100, fu = uu - Math.floor(uu), par = (Math.floor(uu) + Math.floor(vv)) & 1;
      let v = 1.6 + Math.max(0, 1 - Math.hypot(x - 176, (y - 150) * 2.2) / 120) * 1.2 - (y < 126 ? (126 - y) / 8 * 1.2 : 0) + (h(x >> 1, y, 545) - 0.5) * 0.5 - (y > 160 ? Math.abs(x - 176) / 160 * (y - 160) / 19 : 0);
      if ((x > 80 && x < 140 && y < 140 && (x - 80) * 0.8 > (y - 118) * 0.6) && ((x + y) & 1)) v += 0.5;
      let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; l = Math.max(0, Math.min(3, l));
      let c = (par ? L1 : L2)[l]; if (fu < 0.05 || fv < 0.07) c = g_mezcla(c, hex('#5a4a3a'), 0.35); pset(x, y, c); } }
  // la alfombra trenzada ovalada bajo la mesa, anillo a anillo
  const AN = ['#7a4a2a', '#c86a3a', '#d8a848', '#6a7a4a', '#3a4a6a', '#a83a32', '#c8945a'].map(hex);
  for (let y = 146; y <= 179; y++) for (let x = 96; x <= 280; x++) { const e = Math.hypot((x - 186) / 86, (y - 166) / 14); if (e > 1) continue; const ri = Math.floor(e * 12), c = AN[ri % AN.length], tr = ((x + ri * 2) >> 1) % 3 === 0;
    pset(x, y, e > 0.93 ? AN[0] : tr ? g_mezcla(c, K, 0.25) : y < 160 + (x & 1) ? c : g_mezcla(c, C.blanco, 0.12)); }
  // la sombra bajo la encimera, la cocina, la puerta y la nevera
  for (let x = 0; x <= 300; x++) for (let j = 0; j < 3; j++) if (g_b4(x, 118 + j) < 0.6 - j * 0.2) pset(x, 118 + j, g_mezcla(R.pget(x, 118 + j), K, 0.35));
  // la silla del niño (detrás de la mesa): respaldo de skai rojo con su capitoné y el cromo
  rect(163, 118, 189, 140, K); rect(164, 119, 188, 139, hex('#c83a3a')); rect(164, 119, 188, 121, hex('#e8705a')); rect(185, 121, 188, 139, hex('#8e2424'));
  for (const x of [170, 176, 182]) for (const y of [125, 132]) { pset(x, y, hex('#8e2424')); pset(x + 1, y + 1, hex('#f08a7a')); }
  rect(161, 117, 162, 140, hex('#c8d2dc')); rect(190, 117, 191, 140, hex('#7a8692')); pset(161, 117, C.blanco);
  // la otra silla, de lado, a la izquierda de la mesa
  rect(111, 124, 115, 147, K); rect(112, 125, 114, 146, hex('#c8d2dc')); rect(108, 126, 118, 140, K); rect(109, 127, 117, 139, hex('#c83a3a')); rect(109, 127, 117, 128, hex('#e8705a')); rect(116, 128, 117, 139, hex('#8e2424'));
  rect(110, 145, 134, 150, K); rect(111, 146, 133, 148, hex('#c83a3a')); rect(111, 146, 133, 146, hex('#f08a7a')); rect(111, 149, 133, 149, hex('#c8d2dc'));
  for (const x of [113, 130]) { rect(x, 150, x + 1, 165, hex('#c8d2dc')); rect(x + 1, 150, x + 1, 165, hex('#7a8692')); rect(x - 1, 165, x + 2, 166, K); }
  // en primer término: el cuenco del gato con leche y la cesta de mimbre con ovillos y agujas de punto
  rect(28, 170, 44, 175, K); rect(29, 170, 43, 174, hex('#3a78b0')); rect(29, 170, 43, 171, hex('#f6f2ea')); rect(30, 170, 42, 170, C.blanco); rect(29, 174, 43, 174, hex('#2a5a88')); pset(31, 172, hex('#8ab8e0'));
  for (let y = 158; y <= 179; y++) { const w = 15 + Math.round((y - 158) * 0.15); for (let x = 2 - w + 16; x <= 2 + w + 16; x++) { if (x < 0) continue; const fila = Math.floor((y - 158) / 3), c = (y - 158) % 3 === 2 ? hex('#7a5a2a') : ((x + fila * 2) % 4 < 2 ? hex('#d8b06a') : hex('#a88040')); pset(x, y, x === 18 - w || x === 18 + w ? K : x > 18 + w - 3 ? g_mezcla(c, K, 0.3) : c); } }
  rect(2, 158, 34, 159, hex('#e0c080')); rect(2, 157, 34, 157, K);
  for (const [x, y, c] of [[10, 154, '#c83a3a'], [20, 152, '#3a6ab8'], [28, 155, '#e8c040']]) { disco(x, y, 5, K); disco(x, y, 4, hex(c)); for (let k = -3; k <= 3; k += 2) linea(x + k, y - 3, x + k + 1, y + 3, g_mezcla(hex(c), K, 0.3)); pset(x - 2, y - 2, C.blanco); }
  linea(14, 140, 24, 158, hex('#c8a060')); linea(26, 141, 18, 158, hex('#c8a060')); disco(14, 140, 1, hex('#e8c040')); disco(26, 141, 1, hex('#e8c040'));
}

// fuera de la ventana de la cocina, recortado a cl: el cielo de nieve, las nubes, la granja con humo, los pinos, el campo
// nevado con la valla y la carretera (un coche que pasa), el vecino con la pala, el comedero con el cardenal y la nevada
function g_fuera(R, t, cl) {
  const { pset, disco, linea, poligono } = R, K = C.k;
  g_degradado(R, cl[0], cl[1], cl[2], 62, ['#7e8ca4', '#94a2b8', '#aab6c8', '#c4ccd8', '#d6dce4'].map(hex));
  const NB = ['#7a869c', '#9aa6ba', '#c8d0dc'].map(hex);
  for (const [x0, y, w, v, k] of [[10, 34, 40, 0.8, 0], [70, 30, 34, 1.4, 1], [40, 44, 28, 2.2, 2], [110, 40, 30, 1.1, 3]]) { const cx = cl[0] + ((x0 + t * v) % 130) - 30; g_nube3(R, cx, y, w, k, NB); }
  // las colinas lejanas y la línea de árboles azulada
  for (let x = cl[0]; x <= cl[2]; x++) { const top = 55 + Math.round(Math.sin(x * 0.09) * 1.5 + Math.sin(x * 0.23) * 0.8); linea(x, top, x, 62, hex('#dce4ee')); pset(x, top, hex('#b4c0d2'));
    if (h(x, 1, 550) < 0.5) { const a = 2 + Math.round(h(x, 2, 550) * 3); linea(x, top - a, x, top, hex('#6a7a8e')); if (a > 3) { pset(x - 1, top - 1, hex('#7a8a9c')); pset(x + 1, top - 1, hex('#7a8a9c')); } } }
  // la granja vecina: paredes rojas, tejado nevado, ventana con luz y humo de la chimenea
  { const x = 72, y = 61; poligono([[x - 1, y - 6], [x + 13, y - 6], [x + 6, y - 11]], hex('#f4f8fc')); linea(x + 6, y - 11, x + 13, y - 6, hex('#c4d2e4'));
    for (let j = 0; j < 6; j++) linea(x, y - 5 + j, x + 12, y - 5 + j, j === 0 ? hex('#7a2a24') : hex('#a83a32')); linea(x + 3, y - 3, x + 4, y - 3, hex('#ffd878')); pset(x + 3, y - 2, hex('#f0b850')); pset(x + 4, y - 2, hex('#ffd878'));
    linea(x + 8, y - 4, x + 9, y - 4, hex('#5a2a24')); linea(x + 8, y - 3, x + 9, y, hex('#5a2a24')); linea(x + 10, y - 12, x + 10, y - 9, hex('#6a4a3a')); linea(x + 11, y - 12, x + 11, y - 9, hex('#4a3a30'));
    g_vapor(R, x + 10, y - 13, t * 0.7, 2, hex('#e6eaf0'), 14); }
  // el campo nevado con ventisqueros y destellos
  for (let y = 62; y <= cl[3]; y++) for (let x = cl[0]; x <= cl[2]; x++) { const n = Math.sin(x * 0.12 + y * 0.4) + Math.sin(x * 0.05 - y * 0.2); pset(x, y, n > 1.1 && g_b4(x, y) < 0.6 ? hex('#c8d4e6') : n < -1.2 && g_b4(x, y) < 0.4 ? hex('#dae2ee') : hex('#eef2f8')); }
  for (let k = 0; k < 8; k++) { const x = cl[0] + Math.round(h(k, 1, 551) * 64), y = 64 + Math.round(h(k, 2, 551) * 12); if (Math.sin(t * 3 + k * 2.1) > 0.7) pset(x, y, C.blanco); }
  // la carretera quitanieves y el coche que pasa con los faros encendidos
  linea(cl[0], 66, cl[2], 66, hex('#a8b0bc')); linea(cl[0], 67, cl[2], 67, hex('#8a94a2')); for (let x = cl[0]; x <= cl[2]; x += 3) pset(x, 66, hex('#c8d0da'));
  { const u = ((t + 3) % 13) / 13, x = Math.round(cl[0] - 16 + u * 96), y = 66;
    linea(x, y - 1, x + 11, y - 1, K); linea(x, y - 2, x + 11, y - 2, hex('#3a7a6a')); linea(x + 3, y - 3, x + 8, y - 3, hex('#3a7a6a')); linea(x + 3, y - 4, x + 8, y - 4, hex('#c8d8e8')); pset(x + 5, y - 4, hex('#3a7a6a'));
    pset(x + 2, y, K); pset(x + 9, y, K); pset(x + 12, y - 2, hex('#fff2b0')); pset(x + 13, y - 2, hex('#fffad8')); pset(x - 1, y - 1, C.rojo); if ((t * 4 | 0) % 2) pset(x - 2, y - 2, hex('#c8ccd4')); }
  // la valla de madera con la nieve en los postes
  for (let x = cl[0] + 2; x <= cl[2]; x += 7) { linea(x, 67, x, 72, hex('#6a5040')); pset(x, 66, C.blanco); } linea(cl[0], 69, cl[2], 69, hex('#7a5a46')); linea(cl[0], 68, cl[2], 68, hex('#f4f8fc'));
  // el vecino que quita nieve con la pala, y la nieve que lanza
  { const x = 52, y = 74, f = (t * 0.9) % 1, sube = f < 0.5; linea(x, y - 1, x, y - 5, hex('#2a4a8a')); pset(x + 1, y - 3, hex('#2a4a8a')); pset(x - 1, y - 3, hex('#2a4a8a')); pset(x, y - 6, hex('#e8b090')); pset(x, y - 7, C.rojo); pset(x - 1, y, hex('#3a3a3a')); pset(x + 1, y, hex('#3a3a3a'));
    if (sube) { linea(x + 1, y - 3, x + 4, y - 1, hex('#8a6a4a')); linea(x + 4, y - 1, x + 6, y - 1, hex('#5a5a62')); }
    else { linea(x + 1, y - 4, x + 3, y - 7, hex('#8a6a4a')); linea(x + 3, y - 7, x + 4, y - 8, hex('#5a5a62')); const u = (f - 0.5) * 2; for (let k = 0; k < 4; k++) pset(Math.round(x + 4 + u * (6 + k)), Math.round(y - 8 - Math.sin(u * Math.PI) * (5 + k) + u * 4), C.blanco); }
    for (let i = 0; i < 6; i++) pset(x + 6 + i, y + (i & 1), hex('#d0dae8')); }
  // el pino grande de la izquierda, más cerca
  g_pino(R, 37, 80, 48, ['#1e3a2e', '#2e5040', '#4a6a54'].map(hex), 7);
  g_pino(R, 92, 78, 30, ['#24423a', '#34584a', '#4a6e5a'].map(hex), 9);
  // el comedero en su poste, con el tejadillo nevado, y el cardenal que salta y a veces se va volando
  { const px = 78; linea(px, 62, px, 76, hex('#5a4030')); poligono([[px - 6, 55], [px + 7, 55], [px + 0.5, 51]], hex('#8a5a30')); linea(px - 6, 54, px + 7, 54, C.blanco); poligono([[px - 5, 54], [px + 6, 54], [px + 0.5, 51]], hex('#f4f8fc'));
    linea(px - 4, 56, px - 4, 60, hex('#6a4a30')); linea(px + 5, 56, px + 5, 60, hex('#6a4a30')); linea(px - 5, 61, px + 6, 61, hex('#8a5a30')); for (let i = -3; i <= 4; i++) pset(px + i, 60, i & 1 ? hex('#d8b45a') : hex('#a8843a'));
    const c = t % 9, vuela = c > 7.2, hop = Math.floor(t * 1.3) % 3, bx = vuela ? Math.round(px + 2 + (c - 7.2) * 22) : px - 3 + hop * 3, by = vuela ? Math.round(60 - (c - 7.2) * 14) : 59 - (Math.sin(t * 6) > 0.85 ? 1 : 0);
    pset(bx, by, hex('#d8302a')); pset(bx + 1, by, hex('#d8302a')); pset(bx, by - 1, hex('#e84a3a')); pset(bx + 1, by - 2, hex('#c82820')); pset(bx + 2, by - 1, hex('#f0a040')); pset(bx - 1, by, hex('#a82018'));
    if (vuela) { const a = Math.sin(t * 20) > 0 ? -1 : 1; pset(bx - 1, by - 1 + a, hex('#c82820')); pset(bx + 1, by - 1 + a, hex('#c82820')); } }
  // la nevada: lejos, copos finos y lentos; cerca, copos gordos y rápidos
  g_nieve(R, t, cl, 34, 7, 1, 552, hex('#f4f8fc'));
  g_nieve(R, t, cl, 12, 14, 2, 553);
}

// la mesa de la cocina: el tablero con el mantel de cuadros, el faldón que cae con su borde, las patas cromadas, la
// revista, la taza humeante, el plato de galletas, el salero y el servilletero; y el gato (o.gato 0–1)
function g_mesaCocina(R, t, o) {
  const { rect, pset, disco, linea } = R, K = C.k;
  // la sombra de la mesa sobre la alfombra
  for (let y = 157; y <= 168; y++) for (let x = 132; x <= 240; x++) if (Math.hypot((x - 186) / 56, (y - 162) / 6) < 1 && g_b4(x, y) < 0.55) pset(x, y, g_mezcla(R.pget(x, y), K, 0.35));
  // las patas cromadas en ángulo
  for (const [xa, xb] of [[142, 138], [230, 234]]) { linea(xa, 154, xb, 164, K); linea(xa + 1, 154, xb + 1, 164, hex('#e8eef4')); linea(xa + 2, 154, xb + 2, 164, hex('#7a8692')); linea(xa + 3, 154, xb + 3, 164, K); rect(xb - 1, 164, xb + 4, 165, K); }
  // el tablero: el mantel en perspectiva, más claro bajo la lámpara
  for (let y = 138; y <= 147; y++) { const f = (y - 138) / 9, xa = Math.round(140 - f * 6), xb = Math.round(232 + f * 6);
    pset(xa - 1, y, K); pset(xb + 1, y, K);
    for (let x = xa; x <= xb; x++) { const u = (x - 186) / (xb - xa) * 92 + 186; const luz = 0.6 - Math.abs(x - 182) / 70; pset(x, y, g_vichy(Math.round(u * 1.0) + 300, Math.round((y - 138) * 1.6) + 300, 5, 3, luz)); } }
  rect(140, 137, 232, 137, K);
  // el faldón que cae por delante, con pliegues y el borde en picos
  for (let y = 148; y <= 156; y++) for (let x = 133; x <= 239; x++) { const pl = Math.sin((x - 133) * 0.32); const borde = 155 + (Math.abs(((x - 133) % 6) - 3) < 2 ? 1 : 0); if (y > borde) continue;
    pset(x, y, y === borde ? K : g_vichy(x + 300, y + 300, 5, 4, pl < -0.55 ? -0.9 : y === 148 ? 0.6 : 0.1 - (x > 228 ? 0.6 : 0))); }
  linea(133, 148, 239, 148, hex('#f6f0e6')); pset(132, 148, K); pset(240, 148, K); for (let y = 148; y <= 155; y++) { pset(132, y, K); pset(240, y, K); }
  // el plato con galletas, el salero y el pimentero, y el servilletero
  { const x = 150, y = 141; for (let j = -2; j <= 2; j++) { const w = Math.round(9 * Math.sqrt(1 - (j / 3) ** 2)); rect(x - w, y + j, x + w, y + j, j === 2 ? hex('#c8c4bc') : hex('#f6f4ee')); } rect(x - 9, y + 3, x + 9, y + 3, K);
    for (const [dx, dy] of [[-4, -1], [2, -2], [-1, 0], [5, 0]]) { disco(x + dx, y + dy, 2, hex('#a8743c')); pset(x + dx, y + dy - 1, hex('#d8a860')); pset(x + dx + 1, y + dy, hex('#5a3418')); } }
  for (const [x, c] of [[218, '#f6f2ea'], [222, '#4a4a52']]) { rect(x, 137, x + 2, 143, K); rect(x + 0, 138, x + 2, 142, hex(c)); rect(x, 136, x + 2, 137, hex('#c8d2dc')); pset(x, 138, C.blanco); }
  rect(226, 134, 232, 143, K); rect(227, 135, 231, 142, hex('#c8d2dc')); for (let k = 0; k < 3; k++) rect(228 + k, 133 - k % 2, 228 + k, 136, C.blanco); rect(227, 141, 231, 142, hex('#7a8692'));
  // la taza humeante
  if (o.taza !== false) { const x = 208, y = 143; rect(x - 4, y - 7, x + 4, y, K); rect(x - 3, y - 6, x + 3, y - 1, hex('#f2eee4')); rect(x - 3, y - 6, x + 3, y - 6, hex('#7a4a2a')); rect(x + 2, y - 5, x + 3, y - 1, hex('#c8c0b0')); rect(x - 3, y - 4, x + 3, y - 4, hex('#3a78b0'));
    rect(x + 5, y - 5, x + 6, y - 2, K); pset(x + 5, y - 4, hex('#f2eee4')); pset(x + 5, y - 3, hex('#f2eee4')); rect(x - 6, y, x + 6, y + 1, K); rect(x - 5, y, x + 5, y, hex('#f2eee4'));
    g_vapor(R, x - 1, y - 8, t, 1, hex('#f6f4f0'), 14); }
  // la revista: abierta (la isla y el pozo) o cerrada (la portada inventada)
  const rv = o.revista ?? 'abierta';
  if (rv === 'abierta') { const x0 = 170, y0 = 138; rect(x0 - 1, y0, x0 + 28, y0 + 7, K); rect(x0, y0 + 1, x0 + 13, y0 + 6, hex('#fbf6e8')); rect(x0 + 14, y0 + 1, x0 + 27, y0 + 6, hex('#f2ecda')); rect(x0 + 13, y0 + 1, x0 + 14, y0 + 6, hex('#c8bca0'));
    rect(x0 + 1, y0 + 1, x0 + 12, y0 + 4, hex('#5aa0d8')); disco(x0 + 6, y0 + 3, 2.5, hex('#4a8a3a')); pset(x0 + 6, y0 + 1, hex('#2e5e28')); pset(x0 + 7, y0 + 2, hex('#6aaa4a')); rect(x0 + 1, y0 + 5, x0 + 10, y0 + 5, hex('#9a9488'));
    rect(x0 + 16, y0 + 1, x0 + 18, y0 + 6, hex('#8a5a30')); for (let j = 2; j <= 6; j += 2) rect(x0 + 15, y0 + j, x0 + 19, y0 + j, hex('#5a3418')); for (const j of [2, 4, 6]) rect(x0 + 21, y0 + j - 1, x0 + 26, y0 + j - 1, hex('#9a9488')); }
  else if (rv === 'cerrada') { const x0 = 172, y0 = 138; rect(x0 - 1, y0, x0 + 22, y0 + 8, K); rect(x0, y0 + 1, x0 + 21, y0 + 7, hex('#f2e8cc')); rect(x0, y0 + 1, x0 + 21, y0 + 2, hex('#c83a3a')); for (let x = x0 + 2; x < x0 + 18; x += 4) rect(x, y0 + 1, x + 2, y0 + 1, hex('#f6f2ea'));
    rect(x0 + 2, y0 + 3, x0 + 19, y0 + 7, hex('#2a4a7a')); disco(x0 + 10, y0 + 6, 3, hex('#4a8a3a')); pset(x0 + 10, y0 + 3, hex('#2e5e28')); disco(x0 + 16, y0 + 4, 1, hex('#fff2b0')); rect(x0 + 2, y0 + 7, x0 + 19, y0 + 7, hex('#3a78b0')); }
  // el gato: entra andando por la mesa desde la derecha y se sienta encima de la revista
  const g = o.gato ?? 0;
  if (g > 0) { const u = Math.min(1, g), x = Math.round(lerp(236, 184, u)), y = 144 - (u < 1 && Math.floor(t * 6) % 2 ? 1 : 0); gato(R, x, y, t, { dir: -1 }); }
}

// geometría: pared hasta y 117, suelo de terrazo de 118 a 179; ventanal x 26–150 × 20–92 (cristal x 30–146 × 24–88); la
// mesa: tablero x 146–258 × 126–134, frente hasta 158, patas hasta 163; el sillón detrás (x 172–200); quien lee sentado:
// actor x 180, suelo 138; de pie, delante de la ventana x 40–140, suelo 160.
function g_miami(R, t, o) {
  const { rect, pset, disco, linea } = R, K = C.k;
  g_fijo(R, 'miami', () => g_miamiFijo(R));
  // fuera, recortado al cristal
  const CL = [30, 24, 146, 88];
  R.recorte(CL); g_fueraMiami(R, t, CL); R.recorte(null);
  // la persiana veneciana del paño izquierdo (bajada hasta o.persiana) y la del derecho recogida arriba
  const pb = Math.round(lerp(30, 72, Math.max(0, Math.min(1, o.persiana ?? 1))));
  for (let y = 24; y <= pb; y++) { const f = y % 3; if (f === 2) continue; for (let x = 30; x <= 86; x++) pset(x, y, f === 0 ? (x < 34 ? hex('#fffaf0') : hex('#f4eedc')) : hex('#cfc6ae')); }
  for (const x of [40, 76]) for (let y = 24; y <= pb; y++) if (y % 3 === 2) pset(x, y, hex('#e8e0c8'));
  rect(29, pb + 1, 87, pb + 2, K); rect(30, pb + 1, 86, pb + 1, hex('#f6f0e0'));
  { const sw = Math.round(Math.sin(t * 1.7) * 1.5); linea(84, pb + 2, 84 + sw, pb + 16, hex('#e8e0c8')); disco(84 + sw, pb + 17, 1.5, hex('#c8a050')); }
  for (let y = 24; y <= 33; y++) for (let x = 90; x <= 146; x++) pset(x, y, y % 2 ? hex('#cfc6ae') : hex('#f4eedc')); rect(89, 34, 147, 35, K); rect(90, 34, 146, 34, hex('#f6f0e0'));
  for (const x of [100, 136]) { linea(x, 35, x, 44, hex('#e8e0c8')); } { const sw = Math.round(Math.sin(t * 1.5 + 1) * 1.5); linea(142, 35, 142 + sw, 50, hex('#e8e0c8')); disco(142 + sw, 51, 1.5, hex('#c8a050')); }
  // el larguero central del ventanal y el reflejo en el cristal
  rect(87, 24, 89, 88, hex('#d8dce2')); rect(89, 24, 89, 88, hex('#9aa2ac')); rect(87, 24, 87, 88, C.blanco);
  for (let i = 0; i < 14; i++) { pset(96 + i, 86 - i, hex('#e6f2fa')); pset(99 + i, 86 - i, hex('#e6f2fa')); }
  // la luz a rayas sobre el suelo (con la sombra de las palmeras) y los rayos en el aire
  g_rayasMiami(R, t, 0, 118, 319, 179);
  for (let y = 89; y <= 117; y++) for (let x = 30; x <= 200; x++) { const sx = x - (y - 89) * 1.25; if (sx < 32 || sx > 145 || (sx > 86 && sx < 90)) continue; const s = sx < 87 ? ((y + Math.floor(sx * 0.15)) % 4) < 2 : true; if (s && ((x + y * 3) & 7) === 0) g_tiñe(R, x, y, hex('#fff2c8'), 0.3); }
  // el polvo que flota en los rayos
  for (let k = 0; k < 18; k++) { const u = (h(k, 1, 600) + t * 0.01 * (1 + k % 3)) % 1, y = 92 + Math.round(u * 70), x = Math.round(60 + (y - 92) * 1.25 + h(k, 2, 600) * 90 + Math.sin(t * 0.5 + k) * 3); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, hex('#fff6d8')); }
  // el ventilador de techo que gira (aspas con su estela)
  { const cx = 214, cy = 12; for (let y = 0; y <= 8; y++) { pset(cx, y, hex('#a8843a')); pset(cx + 1, y, hex('#6a4a20')); }
    const a0 = t * 4.2; for (let b = 0; b < 4; b++) { const a = a0 + b * Math.PI / 2;
      for (let s = 3; s >= 1; s--) { const aa = a - s * 0.13, ex = Math.cos(aa) * 30, ey = Math.sin(aa) * 3.5; for (let d = 0.2; d <= 1; d += 0.03) { const x = Math.round(cx + ex * d), y = Math.round(cy + ey * d); if (g_b4(x, y) < 0.18 * (4 - s)) pset(x, y, hex('#a8c8c0')); } }
      const ex = Math.cos(a) * 30, ey = Math.sin(a) * 3.5; for (let d = 0.2; d <= 1; d += 0.03) { const x = Math.round(cx + ex * d), y = Math.round(cy + ey * d); pset(x, y, hex('#7a4a2a')); pset(x, y + 1, Math.sin(a) > 0 ? hex('#5a3418') : hex('#a86a3a')); } }
    rect(cx - 5, 8, cx + 6, 12, K); rect(cx - 4, 8, cx + 5, 11, hex('#c8a050')); rect(cx - 4, 8, cx - 2, 11, hex('#f2d27a')); rect(cx - 2, 13, cx + 3, 15, K); rect(cx - 1, 13, cx + 2, 14, hex('#fff6da')); }
  // las agujas del reloj y el segundero
  { const cx = 258, cy = 40, hora = 10.3 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(ah) * 3), Math.round(cy + Math.sin(ah) * 3), K); linea(cx, cy, Math.round(cx + Math.cos(am) * 5), Math.round(cy + Math.sin(am) * 5), K); linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), C.rojo); }
  // la fuente de agua: una burbuja que sube de vez en cuando por la garrafa
  { const u = (t % 4) / 4; if (u < 0.6) { const y = Math.round(86 - u / 0.6 * 12); disco(254 + Math.round(Math.sin(u * 20)), y, u < 0.3 ? 1 : 1.5, hex('#d8f0fa')); pset(254, y - 1, C.blanco); } }
  // la planta del archivador se mece con el aire del ventilador
  for (let k = 0; k < 7; k++) { const a = -2.6 + k * 0.35 + Math.sin(t * 2.4 + k) * 0.06, L = 10 + (k % 3) * 3; for (let d = 2; d < L; d++) { const x = Math.round(286 + Math.cos(a) * d), y = Math.round(76 + Math.sin(a) * d * 0.9); pset(x, y, d > L - 3 ? hex('#5aaa5a') : hex('#2e7a3a')); pset(x, y + 1, hex('#1e5a2a')); } }
  g_mesaMiami(R, t, o);
  if (o.delante !== false) R.delante = () => g_mesaMiami(R, t, o);
  return { suelo: 160, lector: [180, 138], mesa: [146, 126, 258, 163], revista: [178, 129], ventana: [26, 20, 150, 92], ventilador: [214, 12], perchero: [13, 117], fuente: [254, 117], archivador: [270, 80, 302, 117] };
}

// la luz del sol que entra por el ventanal y cae a rayas (por la persiana) en el rectángulo dado, con la sombra de las
// palmeras que se mece
function g_rayasMiami(R, t, x0, y0, x1, y1) {
  const L = hex('#ffe6a0'), L2 = hex('#fff8e0'), sw = Math.sin(t * 1.1) * 3;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const sx = x - (y - 118) * 1.3 - 8; if (sx < 34 || sx > 146 || (sx > 85 && sx < 91)) continue;
    const borde = sx < 37 || sx > 143; let lit = sx < 86 ? ((y + Math.floor(sx * 0.1)) % 8) < 4 : true;
    if (lit && Math.sin((sx + sw) * 0.22) * Math.sin(y * 0.35 + sx * 0.05 + t * 0.6) > 0.55) lit = false;
    if (lit && (!borde || g_b4(x, y) < 0.5)) { g_tiñe(R, x, y, L, 0.5); if (g_b4(x, y) < 0.25) g_tiñe(R, x, y, L2, 0.3); } else if (!lit && sx < 86) g_tiñe(R, x, y, hex('#3a2a20'), 0.08); }
}

// lo fijo del despacho de Miami (en el búfer)
function g_miamiFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // la pared de estuco aguamarina con su grano, más clara a la izquierda (el ventanal) y más oscura arriba
  const EST = ['#7aaaa2', '#94c2b8', '#acd6cc', '#c2e6dc', '#d6f2ea'].map(hex);
  for (let y = 0; y <= 89; y++) for (let x = 0; x <= 319; x++) { let v = 2.2 + Math.max(0, 1 - Math.hypot(x - 90, y - 60) / 150) * 1.2 - (y < 20 ? (20 - y) / 20 * 1.0 : 0) - (x > 296 ? (x - 296) / 24 * 0.7 : 0) + (h(x, y, 610) - 0.5) * 0.9 + (h(x >> 2, y >> 2, 611) - 0.5) * 0.5;
    let l = Math.floor(v); if (v - l > g_b4(x, y)) l++; pset(x, y, EST[Math.max(0, Math.min(4, l))]); }
  rect(0, 0, 319, 2, hex('#f2f6f0')); rect(0, 3, 319, 3, hex('#8ab8b0'));
  // el friso de pino con sus tablas verticales, nudos y la moldura
  for (let y = 92; y <= 113; y++) for (let x = 0; x <= 319; x++) { const b = x % 9, n = h(x >> 3, y >> 2, 612); pset(x, y, b === 0 ? hex('#6a4224') : b === 1 ? hex('#e0aa6a') : n < 0.08 ? hex('#8a5a30') : (Math.sin(y * 0.5 + x * 0.3 + (x / 9 | 0)) > 0.8 ? hex('#b07a44') : hex('#c8915a'))); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 613) * 310) + 4, y = 96 + Math.round(h(k, 2, 613) * 14); disco(x, y, 1.2, hex('#7a4a24')); pset(x, y, hex('#4a2a14')); }
  rect(0, 89, 319, 91, K); rect(0, 89, 319, 90, hex('#a86a3a')); rect(0, 89, 319, 89, hex('#d8a060'));
  rect(0, 113, 319, 117, hex('#5a3418')); rect(0, 113, 319, 113, hex('#8a5a30')); rect(0, 117, 319, 117, K);
  // el ventanal de aluminio con su vierteaguas
  rect(25, 19, 151, 93, K); rect(26, 20, 150, 92, hex('#d8dce2')); rect(26, 20, 150, 21, C.blanco); rect(148, 22, 150, 92, hex('#9aa2ac')); rect(29, 23, 147, 89, hex('#6a7480'));
  rect(22, 89, 154, 93, K); rect(23, 89, 153, 92, hex('#e6eaee')); rect(23, 89, 153, 89, C.blanco); rect(23, 92, 153, 92, hex('#9aa2ac'));
  // el perchero con la chaqueta caqui, el casco de obra amarillo y un paraguas apoyado
  rect(12, 42, 14, 115, K); rect(13, 42, 13, 115, hex('#8a5a30')); for (const d of [-6, 6]) { linea(13, 112, 13 + d, 117, K); linea(13, 111, 13 + d, 116, hex('#6a4224')); }
  for (const d of [-5, 5]) { linea(13, 48, 13 + d, 45, K); pset(13 + d, 44, hex('#c8a050')); }
  // el casco de obra amarillo colgado del gancho izquierdo: la cúpula con su nervio y su brillo, y el ala
  for (let y = 35; y <= 43; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((43 - y) / 9) ** 2)) * 7); rect(8 - w - 1, y, 8 + w + 1, y, K); rect(8 - w, y, 8 + w, y, y < 38 ? hex('#ffe070') : hex('#f0c030')); if (w > 1) rect(8 + w - 1, y, 8 + w, y, hex('#c89818')); }
  rect(7, 35, 9, 43, hex('#d8a820')); rect(7, 35, 7, 42, hex('#fff0a0')); rect(4, 38, 5, 40, hex('#fff6c8'));
  rect(-1, 44, 17, 45, K); rect(0, 44, 16, 44, hex('#e8b828')); rect(0, 45, 16, 45, hex('#a87a10'));
  // la chaqueta caqui colgada del gancho derecho: los hombros, el cuello, las mangas caídas y los botones
  for (let y = 47; y <= 86; y++) { const w = y < 51 ? 2 + (y - 47) * 2 : y < 80 ? 10 - Math.round((y - 51) * 0.06) : 8; const cx = 19;
    for (let x = cx - w; x <= cx + w; x++) { const borde = x === cx - w || x === cx + w, manga = Math.abs(x - cx) > w - 3 && y > 52; pset(x, y, borde ? K : manga ? (x > cx ? hex('#7a6a48') : hex('#a8946a')) : x > cx + 2 ? hex('#8a7a56') : (x + y) % 13 === 0 ? hex('#b8a47a') : hex('#a8946a')); }
    if (y > 53 && y < 85) { pset(cx - w + 3, y, hex('#6a5a3a')); pset(cx + w - 3, y, hex('#5a4a2e')); } }
  for (let y = 48; y <= 56; y++) { const d = Math.round((y - 48) * 0.7); pset(19 - d, y, hex('#5a4a2e')); pset(19 + d, y, hex('#5a4a2e')); } rect(19, 56, 19, 86, hex('#7a6a48'));
  for (let y = 60; y < 84; y += 7) { pset(20, y, hex('#e8dcc0')); pset(21, y, hex('#c8b894')); } rect(13, 66, 16, 67, hex('#7a6a48')); rect(22, 66, 25, 67, hex('#6a5a3a'));
  linea(4, 80, 9, 116, K); linea(5, 80, 10, 116, hex('#2a3a5a')); poligono([[3, 80], [8, 80], [9, 104], [6, 104]], hex('#3a4a6a')); disco(4, 79, 1.5, hex('#8a5a30'));
  // el mapa de Florida clavado con chinchetas (la península en verde sobre el mar) y la chincheta roja en Miami
  rect(159, 25, 201, 63, K); rect(160, 26, 200, 62, hex('#f2ead6')); g_degradado(R, 162, 28, 198, 60, ['#8ac4e0', '#a8d8ec'].map(hex));
  poligono([[162, 31], [190, 31], [192, 34], [180, 35], [181, 40], [186, 48], [190, 54], [190, 58], [186, 59], [182, 54], [178, 46], [175, 40], [172, 35], [162, 35]], hex('#8ab86a'));
  linea(162, 35, 172, 35, hex('#6a9a4a')); linea(172, 35, 178, 46, hex('#6a9a4a')); linea(178, 46, 182, 54, hex('#6a9a4a')); linea(182, 54, 186, 59, hex('#6a9a4a')); for (const [x, y] of [[176, 44], [183, 50], [168, 33], [186, 37]]) pset(x, y, hex('#3a78b0'));
  for (let k = 0; k < 6; k++) pset(185 + k, 60 + (k & 1), hex('#6a9a4a'));
  disco(189, 55, 2, K); disco(189, 55, 1.5, C.rojo); pset(188, 54, hex('#ff9a8a')); for (const [x, y] of [[161, 27], [199, 27], [161, 61], [199, 61]]) { pset(x, y, hex('#e8c040')); }
  // el cuadro de la casa que construyó: una casita de Florida con su palmera
  rect(207, 31, 239, 55, K); rect(208, 32, 238, 54, hex('#a86a3a')); rect(208, 32, 238, 32, hex('#d09a5c')); rect(210, 34, 236, 52, hex('#f6f2e2'));
  g_degradado(R, 212, 36, 234, 44, ['#6ab4e8', '#a8d8f4'].map(hex)); rect(212, 45, 234, 50, hex('#8ac85a'));
  rect(216, 42, 230, 48, hex('#f2c8b0')); poligono([[214, 42], [232, 42], [223, 37]], hex('#c86a5a')); rect(222, 45, 224, 48, hex('#6a8ab8')); rect(218, 44, 220, 45, hex('#a8d8f4')); rect(226, 44, 228, 45, hex('#a8d8f4'));
  linea(232, 48, 233, 39, hex('#8a6a4a')); for (let k = 0; k < 5; k++) linea(233, 39, 233 + Math.round(Math.cos(k * 0.8 - 3) * 4), 39 + Math.round(Math.sin(k * 0.8 - 3) * 2) + 1, hex('#3a8a3a'));
  // la fuente de agua: la garrafa de cristal azul y el cuerpo con el grifo y el dispensador de vasos
  rect(246, 72, 262, 88, K); rect(247, 73, 261, 87, hex('#a8d8ea')); rect(247, 77, 261, 87, hex('#7ac0dc')); rect(248, 73, 249, 86, hex('#e6f6fc')); rect(259, 74, 260, 87, hex('#5aa0c0')); rect(251, 70, 257, 72, K); rect(252, 70, 256, 71, hex('#c8d2dc'));
  rect(245, 88, 263, 113, K); rect(246, 89, 262, 113, hex('#e6e6e0')); rect(246, 89, 262, 90, C.blanco); rect(259, 91, 262, 113, hex('#b8b8b0')); rect(250, 95, 256, 98, hex('#3a3a3a')); rect(252, 99, 253, 101, hex('#c8d2dc')); rect(248, 106, 260, 108, hex('#9aa4b0'));
  rect(264, 92, 267, 104, K); rect(265, 93, 266, 103, C.blanco);
  // el archivador verde oliva de tres cajones con tiradores cromados y portaetiquetas
  rect(269, 79, 303, 117, K); rect(270, 80, 302, 116, hex('#7a8a5a')); rect(270, 80, 302, 81, hex('#a8b47a')); rect(298, 82, 302, 116, hex('#5a6a42'));
  for (const y of [82, 93, 104]) { rect(272, y, 296, y + 9, hex('#5a6a42')); rect(272, y, 295, y + 8, hex('#9aa86e')); rect(273, y + 1, 295, y + 8, hex('#86965e')); rect(281, y + 2, 287, y + 3, hex('#f2eee4')); rect(281, y + 5, 287, y + 6, hex('#c8d2dc')); rect(281, y + 5, 287, y + 5, C.blanco); }
  rect(278, 72, 294, 79, K); rect(279, 73, 293, 79, hex('#c8683a')); rect(279, 73, 281, 79, hex('#e08a50')); rect(278, 72, 294, 73, hex('#a04e2a'));
  // el sillón giratorio de piel verde detrás de la mesa, con sus botones
  rect(170, 104, 202, 128, K); rect(171, 105, 201, 127, hex('#3a6a4a')); rect(171, 105, 201, 107, hex('#5a8a6a')); rect(197, 107, 201, 127, hex('#2a4e36'));
  for (const x of [176, 186, 196]) for (const y of [111, 119]) { pset(x, y, hex('#1e3a28')); pset(x - 1, y - 1, hex('#7aa88a')); }
  // el suelo de terrazo: crema con esquirlas de colores, juntas de latón en perspectiva y el brillo del pulido
  const TZ = ['#a89a80', '#bcae94', '#cabea4', '#d8ceb6'].map(hex), CH = ['#c87a5a', '#6a8a7a', '#a89878', '#4a4a4a', '#f8f4ea', '#d8a860'].map(hex);
  for (let y = 118; y <= 179; y++) { const d = y - 60, vv = 900 / d, fv = vv - Math.floor(vv);
    for (let x = 0; x <= 319; x++) { const uu = (x - 160) / d * 3.2 + 100, fu = uu - Math.floor(uu);
      let v = 1.8 - (y < 126 ? (126 - y) / 8 * 1.2 : 0) + (h(x, y, 614) - 0.5) * 0.6 + Math.max(0, 1 - Math.hypot(x - 90, (y - 122) * 3) / 60) * 0.8; let l = Math.floor(v); if (v - l > g_b4(x, y)) l++;
      let c = TZ[Math.max(0, Math.min(3, l))]; const s = h(x, y, 615); if (s < 0.09) c = CH[Math.floor(s / 0.09 * 6)]; if (fu < 0.03 || fv < 0.05) c = hex('#c8a050'); pset(x, y, c); } }
  // la alfombra ovalada de los sesenta delante de la ventana: anillos coral y turquesa con rombos
  for (let y = 152; y <= 179; y++) for (let x = 30; x <= 200; x++) { const e = Math.hypot((x - 112) / 80, (y - 166) / 12); if (e > 1) continue; const r = Math.floor(e * 6);
    let c = [hex('#e8785a'), hex('#f2c890'), hex('#2a9a9a'), hex('#e8785a'), hex('#f2e2c0'), hex('#2a7a8a')][r]; if (r === 1 && (Math.abs(((x - 112) % 10 + 10) % 10 - 5) + Math.abs(y - 166) * 0.6) < 2.5) c = hex('#2a7a8a'); if (e > 0.94) c = hex('#1e5a6a'); pset(x, y, ((x + y) % 4 === 0) ? g_mezcla(c, K, 0.15) : c); }
  // el reloj de pared cromado y el calendario con la playa
  { const cx = 258, cy = 40; disco(cx, cy, 9, K); disco(cx, cy, 8, hex('#c8d2dc')); disco(cx - 1, cy - 1, 7, hex('#eef2f6')); disco(cx, cy, 7, hex('#c8d2dc')); disco(cx, cy, 6, hex('#fbfaf6'));
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5), Math.round(cy + Math.sin(k * Math.PI / 6) * 5), k % 3 ? hex('#9a9aa4') : K); }
  rect(213, 61, 235, 87, K); rect(214, 62, 234, 86, hex('#f6f2e6')); g_degradado(R, 215, 63, 233, 70, ['#5ab4e8', '#9ad4f4'].map(hex)); rect(215, 71, 233, 73, hex('#2aa8b8')); rect(215, 74, 233, 75, hex('#f2dca0'));
  linea(228, 74, 229, 66, hex('#8a6a4a')); for (let k = 0; k < 5; k++) linea(229, 66, 229 + Math.round(Math.cos(k * 0.8 - 3) * 4), 66 + Math.round(Math.sin(k * 0.8 - 3) * 2) + 1, hex('#3a8a3a')); disco(219, 65, 1.5, hex('#fff2b0'));
  for (let fi = 0; fi < 4; fi++) for (let d = 0; d < 7; d++) pset(216 + d * 2.6 | 0, 78 + fi * 2, hex('#6a6a7a')); pset(224, 63, K); linea(224, 59, 216, 62, hex('#7a6a5a')); linea(224, 59, 232, 62, hex('#7a6a5a'));
  // el reflejo del ventanal en el terrazo pulido
  for (let y = 119; y <= 128; y++) for (let x = 32; x <= 146; x++) if (((x + y) & 3) === 0 && !(x > 85 && x < 91)) g_tiñe(R, x, y, hex('#e6f6fc'), 0.35 - (y - 119) * 0.03);
  for (let x = 0; x <= 319; x++) for (let j = 0; j < 3; j++) if (g_b4(x, 118 + j) < 0.6 - j * 0.2) pset(x, 118 + j, g_mezcla(R.pget(x, 118 + j), K, 0.3));
  // en primer término: el cubo con planos enrollados y la palmera de interior en su maceta
  for (let y = 150; y <= 179; y++) { const w = 11 - Math.round((y - 150) * 0.05); rect(20 - w, y, 20 + w, y, y === 150 ? hex('#c8d2dc') : hex('#6a7480')); pset(20 - w, y, K); pset(20 + w, y, K); rect(20 - w + 1, y, 20 - w + 2, y, hex('#9aa4b0')); }
  for (const [x, a, c] of [[14, 124, '#4a7ac8'], [19, 130, '#f2ead6'], [24, 120, '#3a6ab8'], [28, 134, '#e8dcc0']]) { rect(x - 2, a, x + 2, 150, K); rect(x - 1, a + 1, x + 1, 150, hex(c)); rect(x - 1, a + 1, x + 1, a + 2, C.blanco); pset(x, a + 1, hex('#8a96a2')); }
  rect(292, 156, 318, 179, K); for (let y = 157; y <= 179; y++) rect(293 + Math.round((y - 157) * 0.1), y, 317 - Math.round((y - 157) * 0.1), y, y < 160 ? hex('#e8dcc0') : (y % 4 === 0 ? hex('#a86a3a') : hex('#c8844a'))); rect(293, 157, 317, 158, hex('#f6f0e0'));
}

// las fuentes de la palmera de interior (la del primer término), que se mecen con el ventilador
function g_palmeraMaceta(R, t) {
  for (let f = 0; f < 9; f++) { const a = -2.9 + f * 0.33 + Math.sin(t * 2.2 + f * 0.7) * 0.05, L = 22 + (f % 3) * 6;
    for (let d = 0; d < L; d++) { const x = Math.round(305 + Math.cos(a) * d), y = Math.round(156 + Math.sin(a) * d + (d * d) / (L * 1.6)); R.pset(x, y, hex('#2e6a3a')); if (d > 4 && d % 2 === 0) { R.pset(x - 1, y + 2, hex('#4a9a4a')); R.pset(x + 1, y + 2, hex('#3a8a42')); R.pset(x, y + 3, hex('#5aaa5a')); } } }
}

// fuera del ventanal de Miami, recortado a cl: el cielo, los cúmulos a tres velocidades, el mar, el edificio en obras con
// su grúa y obreros, las casas de colores, la calle con coches de la época y un paseante, las palmeras y un pelícano
function g_fueraMiami(R, t, cl) {
  const { pset, disco, linea, poligono } = R, K = C.k;
  g_degradado(R, cl[0], cl[1], cl[2], 70, ['#3a86d8', '#4a98e0', '#62ace8', '#82c2ee', '#a8d8f4'].map(hex));
  const NB = ['#b8d0e8', '#e2eef8', '#ffffff'].map(hex);
  for (const [x0, y, w, v, k] of [[0, 34, 36, 0.6, 0], [60, 30, 28, 1.2, 1], [100, 46, 24, 2.0, 2], [150, 40, 30, 0.9, 3]]) g_nube3(R, cl[0] + ((x0 + t * v) % 170) - 30, y, w, k, NB);
  // el pelícano que planea
  { const u = (t / 18) % 1, x = Math.round(cl[2] + 10 - u * 150), y = Math.round(40 + Math.sin(u * 6) * 3), a = Math.sin(t * 2) > 0.6 ? 1 : 0; linea(x - 4, y - a, x, y, hex('#5a5a62')); linea(x, y, x + 4, y - a, hex('#5a5a62')); pset(x - 1, y + 1, hex('#e8c060')); pset(x - 2, y + 1, hex('#e8c060')); }
  // el mar al fondo con sus destellos
  for (let y = 66; y <= 72; y++) linea(cl[0], y, cl[2], y, y < 68 ? hex('#2a9ab0') : hex('#3ab4c0'));
  for (let k = 0; k < 10; k++) { const x = cl[0] + Math.round(h(k, 1, 620) * 116), y = 66 + Math.round(h(k, 2, 620) * 6); if (Math.sin(t * 3 + k * 1.7) > 0.5) { pset(x, y, C.blanco); pset(x + 1, y, hex('#c8f0f8')); } }
  // las casas y apartamentos de colores pastel
  for (const [x0, w, a, c] of [[30, 16, 12, '#f2b8b0'], [48, 12, 8, '#f6e2a0'], [62, 14, 14, '#a8e0d8'], [144, 10, 10, '#f2c8e0']]) { R.poligono([[x0, 73], [x0 + w, 73], [x0 + w, 73 - a], [x0, 73 - a]], hex(c)); linea(x0, 73 - a, x0 + w, 73 - a, C.blanco); linea(x0 + w, 73 - a, x0 + w, 73, g_mezcla(hex(c), K, 0.25));
    for (let y = 75 - a; y < 72; y += 3) for (let x = x0 + 2; x < x0 + w - 1; x += 3) pset(x, y, hex('#5a7a9a')); }
  // el edificio en obras: el esqueleto de hormigón, los andamios y los obreros pequeños que van y vienen
  { const x0 = 100, x1 = 130, y0 = 42, y1 = 73;
    for (let y = y0; y <= y1; y += 6) linea(x0, y, x1, y, hex('#b8b4ac')); for (let x = x0; x <= x1; x += 6) linea(x, y0, x, y1, hex('#9a968e'));
    for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if ((x - x0) % 6 && (y - y0) % 6 && y > y0 + 12) pset(x, y, ((x + y) & 1) ? hex('#d6d2c8') : hex('#c4c0b6'));
    for (let x = x0 - 2; x <= x0; x++) for (let y = y0 + 6; y <= y1; y++) if ((x + y) % 3 === 0) pset(x, y, hex('#8a6a4a'));
    for (let k = 0; k < 3; k++) { const piso = y0 + 5 + k * 6 + 6, u = (Math.sin(t * 0.5 + k * 2) + 1) / 2, x = Math.round(x0 + 3 + u * 22); pset(x, piso - 1, hex('#e8c040')); pset(x, piso, hex('#3a5a8a')); } }
  // la grúa torre, que gira despacio (la pluma se acorta y se alarga) y sube una viga
  { const mx = 136, top = 30, giro = Math.cos(t * 0.25), L = Math.round(26 * giro), cnt = -Math.round(8 * giro);
    for (let y = top; y <= 73; y++) { pset(mx, y, hex('#e8a020')); pset(mx + 2, y, hex('#c88010')); if (y % 3 === 0) pset(mx + 1, y, hex('#e8a020')); }
    linea(mx + 1, top, mx + 1 - L, top, hex('#e8a020')); linea(mx + 1, top - 3, mx + 1 - Math.round(L * 0.7), top, hex('#c88010')); linea(mx + 1, top, mx + 1 - cnt, top, hex('#e8a020')); pset(mx + 1 - cnt, top + 1, hex('#5a5a62')); pset(mx + 1 - cnt, top + 2, hex('#5a5a62'));
    pset(mx + 1, top - 4, hex('#e8a020')); pset(mx + 1, top - 5, Math.sin(t * 4) > 0 ? C.rojo : hex('#8e2424'));
    const hx = mx + 1 - Math.round(L * 0.8), hy = top + 10 + Math.round((Math.sin(t * 0.4) + 1) * 8); linea(hx, top + 1, hx, hy, hex('#4a4a52')); linea(hx - 3, hy + 1, hx + 3, hy + 1, hex('#8a5a3a')); }
  // la calle: la acera, el asfalto y los coches con aletas que pasan en los dos sentidos; un paseante con sombrero
  linea(cl[0], 74, cl[2], 74, hex('#d8d4c8')); for (let y = 75; y <= 84; y++) linea(cl[0], y, cl[2], y, y === 79 ? hex('#e8d84a') : hex('#5a5a66')); for (let x = cl[0]; x <= cl[2]; x += 8) linea(x, 79, x + 3, 79, hex('#5a5a66'));
  linea(cl[0], 85, cl[2], 85, hex('#c8c4b8')); for (let y = 86; y <= cl[3]; y++) linea(cl[0], y, cl[2], y, hex('#e0dcd0'));
  for (const [per, dir, c, y, d0] of [[9, 1, '#4ac0b0', 78, 0], [12, -1, '#f08aa0', 83, 5]]) { const u = ((t + d0) % per) / per, x = Math.round(dir > 0 ? cl[0] - 22 + u * 160 : cl[2] + 22 - u * 160);
    const xa = dir > 0 ? x : x - 18; linea(xa, y - 1, xa + 18, y - 1, hex(c)); linea(xa, y, xa + 18, y, K); linea(xa + 1, y - 2, xa + 17, y - 2, hex(c)); linea(xa + 5, y - 3, xa + 13, y - 3, hex('#c8e8f4')); linea(xa + 5, y - 4, xa + 12, y - 4, C.blanco);
    pset(dir > 0 ? xa : xa + 18, y - 3, hex(c)); linea(xa + 1, y - 1, xa + 17, y - 1, g_mezcla(hex(c), C.blanco, 0.4)); disco(xa + 4, y + 1, 1.5, K); disco(xa + 14, y + 1, 1.5, K); pset(dir > 0 ? xa + 18 : xa, y - 2, hex('#fff6c8')); }
  { const u = (t / 16) % 1, x = Math.round(cl[0] + 4 + u * 112), f = Math.floor(t * 4) % 2; linea(x, 82, x, 86, hex('#e8e0d0')); pset(x, 81, hex('#d8a880')); linea(x - 1, 80, x + 1, 80, hex('#e8d8a0')); pset(x - f, 87, hex('#4a4a5a')); pset(x + 1 - f, 87, hex('#4a4a5a')); }
  // las palmeras, que se mecen con la brisa
  g_palmeraAlta(R, 50, 74, 40, t, 0); g_palmeraAlta(R, 96, 74, 46, t, 1.7); g_palmeraAlta(R, 120, 86, 36, t, 3.1);
}

// una palmera alta con el tronco anillado y las hojas en tres tonos que se mecen (x, suelo: el pie; alto en px)
function g_palmeraAlta(R, x, suelo, alto, t, k = 0) {
  const m = Math.sin(t * 1.2 + k) * 1.6;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + Math.sin(u * 1.4) * 4 + m * u * u); R.pset(px, suelo - j, j % 3 ? hex('#a89070') : hex('#7a6448')); R.pset(px + 1, suelo - j, hex('#6a5438')); }
  const tx = Math.round(x + Math.sin(1.4) * 4 + m), ty = suelo - alto;
  for (let f = 0; f < 9; f++) { const a = -Math.PI - 0.15 + f * (Math.PI + 0.3) / 8 + Math.sin(t * 1.8 + f + k) * 0.08, L = 15 + (f % 2) * 4;
    for (let d = 1; d < L; d++) { const px = Math.round(tx + Math.cos(a) * d), py = Math.round(ty + Math.sin(a) * d * 0.5 + d * d / 20); R.pset(px, py, d > L - 4 ? hex('#2e6a2e') : hex('#3a8a3a')); if (d % 2 === 0) R.pset(px, py + 1, hex('#5aaa4a')); } }
  R.disco(tx, ty + 1, 1.5, hex('#6a4a2a'));
}

// la mesa de nogal del despacho: el tablero con los planos (la esquina se levanta con el ventilador), el teléfono de disco,
// el flexo, el café, la revista y el portanombres sin letras; el frente con cajones y patas; la luz a rayas encima; y la
// palmera de la maceta del primer término
function g_mesaMiami(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // el tablero en perspectiva
  for (let y = 126; y <= 134; y++) { const f = (y - 126) / 8, xa = Math.round(150 - f * 4), xb = Math.round(254 + f * 4); pset(xa - 1, y, K); pset(xb + 1, y, K);
    for (let x = xa; x <= xb; x++) pset(x, y, Math.sin(x * 0.15 + y * 0.9 + Math.sin(x * 0.03) * 3) > 0.7 ? hex('#5a3418') : y === 126 ? hex('#5a3418') : hex('#7a4a2a')); }
  rect(150, 125, 254, 125, K); rect(145, 135, 259, 136, hex('#9a6a40')); rect(145, 135, 259, 135, hex('#c8945a')); rect(145, 137, 259, 137, K);
  // el frente: el panel con vetas, los cajones con tiradores cromados y las patas
  rect(146, 138, 258, 157, hex('#6a4024')); for (let y = 139; y < 157; y++) for (let x = 147; x < 216; x++) { if (h(x >> 3, y, 630) < 0.16) pset(x, y, hex('#83552c')); else if (h(x >> 2, y, 631) < 0.07) pset(x, y, hex('#4e2c14')); }
  rect(146, 138, 146, 157, K); rect(258, 138, 258, 157, K); rect(146, 157, 258, 158, K);
  for (const y of [139, 145, 151]) { rect(218, y, 256, y + 5, K); rect(219, y, 255, y + 4, hex('#83552c')); rect(219, y, 255, y, hex('#a8743c')); rect(233, y + 2, 241, y + 2, hex('#c8d2dc')); pset(233, y + 2, C.blanco); }
  for (const x of [149, 254]) { poligono([[x - 2, 158], [x + 2, 158], [x + 1, 163], [x - 1, 163]], hex('#5a3418')); rect(x - 1, 163, x + 1, 163, hex('#c8a050')); }
  for (let x = 148; x <= 256; x++) for (let j = 0; j < 3; j++) if (g_b4(x, 164 + j) < 0.5 - j * 0.15) pset(x, 164 + j, g_mezcla(R.pget(x, 164 + j), K, 0.3));
  // los planos azules extendidos con sus líneas blancas; la esquina se levanta con el aire del ventilador
  { const lev = Math.max(0, Math.sin(t * 2.6)) * 2.5; poligono([[200, 127], [242, 127], [246, 133], [198, 133]], hex('#2a5aa8'));
    for (let x = 204; x < 242; x += 6) linea(x, 128, x - 1, 132, hex('#6a9ad8')); linea(201, 130, 244, 130, hex('#6a9ad8')); rect(210, 128, 222, 131, hex('#e8f0fa')); rect(211, 129, 221, 130, hex('#2a5aa8')); linea(226, 128, 236, 132, C.blanco);
    poligono([[238, 133], [246, 133], [244 - lev, 131 - lev], [240, 131 - lev * 0.5]], hex('#e8f0fa')); linea(246, 133, 244 - Math.round(lev), 131 - Math.round(lev), hex('#2a5aa8')); }
  // el teléfono de disco negro
  rect(240, 120, 254, 127, K); rect(241, 121, 253, 126, hex('#2a2a32')); rect(241, 121, 253, 121, hex('#5a5a66')); disco(247, 124, 2.5, hex('#e8e6e0')); disco(247, 124, 1, K); rect(239, 118, 255, 120, K); rect(240, 118, 254, 119, hex('#3a3a44')); pset(241, 118, hex('#8a8a9a'));
  // el flexo verde con su luz, el café humeante y el portanombres (barras, sin letras)
  linea(160, 126, 158, 112, K); linea(161, 126, 159, 112, hex('#3a6a4a')); linea(158, 112, 166, 106, K); linea(159, 112, 167, 106, hex('#3a6a4a'));
  poligono([[163, 104], [171, 104], [173, 111], [161, 111]], hex('#2e5a3e')); linea(163, 104, 171, 104, hex('#5a8a6a')); rect(162, 111, 172, 112, hex('#fff6c8')); rect(156, 126, 164, 127, K); rect(157, 126, 163, 126, hex('#5a8a6a'));
  rect(188, 124, 194, 130, K); rect(189, 125, 193, 129, hex('#f2eee4')); rect(189, 125, 193, 125, hex('#5a3418')); rect(195, 126, 196, 128, K); g_vapor(R, 190, 122, t, 2, hex('#f6f4f0'), 12);
  rect(214, 132, 232, 136, K); rect(215, 133, 231, 135, hex('#c8a050')); rect(215, 133, 231, 133, hex('#f2d27a')); rect(218, 134, 228, 134, hex('#5a3418'));
  // la revista: la misma de Michigan
  const rv = o.revista ?? 'abierta';
  if (rv === 'abierta') { const x0 = 168, y0 = 127; rect(x0 - 1, y0, x0 + 22, y0 + 6, K); rect(x0, y0 + 1, x0 + 10, y0 + 5, hex('#fbf6e8')); rect(x0 + 11, y0 + 1, x0 + 21, y0 + 5, hex('#f2ecda'));
    rect(x0 + 1, y0 + 1, x0 + 9, y0 + 3, hex('#5aa0d8')); disco(x0 + 5, y0 + 2, 1.8, hex('#4a8a3a')); rect(x0 + 13, y0 + 1, x0 + 14, y0 + 5, hex('#8a5a30')); for (const j of [2, 4]) rect(x0 + 16, y0 + j, x0 + 20, y0 + j, hex('#9a9488')); }
  else if (rv === 'cerrada') { const x0 = 170, y0 = 127; rect(x0 - 1, y0, x0 + 16, y0 + 7, K); rect(x0, y0 + 1, x0 + 15, y0 + 6, hex('#2a4a7a')); rect(x0, y0 + 1, x0 + 15, y0 + 2, hex('#c83a3a')); disco(x0 + 8, y0 + 5, 2, hex('#4a8a3a')); }
  g_rayasMiami(R, t, 145, 125, 259, 137);
  g_palmeraMaceta(R, t);
}

function g_revistaMesa(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  g_fijo(R, 'revistaMesa-' + (o.pagina ?? 'articulo'), () => g_revistaFijo(R, o.pagina ?? 'articulo'));
  // la luz de la ventana que entra por la izquierda, con la sombra de los copos que caen fuera (manchitas que bajan)
  for (let k = 0; k < 10; k++) { const u = (h(k, 1, 700) + t * (0.05 + (k % 3) * 0.02)) % 1, x = Math.round(10 + h(k, 2, 700) * 70 + Math.sin(t + k) * 4), y = Math.round(u * 190 - 5); for (const [dx, dy] of [[0, 0], [1, 0], [0, 1]]) g_tiñe(R, x + dx, y + dy, K, 0.12); }
  // el vapor de la taza
  g_vapor(R, 278, 132, t, 0, hex('#fbfaf6'), 26); g_vapor(R, 284, 134, t, 1.3, hex('#f2f0ea'), 22);
  // migas que tiemblan cuando el niño mueve la mesa, y la cucharilla que brilla
  if (Math.sin(t * 1.3) > 0.9) pset(60, 172, hex('#fff6d8'));
  // el gato atigrado que entra por la derecha y se tumba sobre la página
  const g = o.gato ?? 0;
  if (g > 0) { const u = Math.min(1, g), cx = Math.round(lerp(360, 212, u)), cy = 98, resp = Math.sin(t * 2.4) > 0.6 ? 1 : 0;
    const NA = hex('#e8984a'), NS = hex('#b86a2a'), NL = hex('#f8c88a');
    for (let j = -18; j <= 18; j++) for (let i = -26; i <= 26; i++) { const e = (i / (26 + resp)) ** 2 + (j / (18 + resp)) ** 2; if (e > 1) continue; const c = e > 0.88 ? NS : (Math.floor((i + 30) / 5) % 2 && e < 0.8) ? NS : j < -6 ? NL : NA; pset(cx + i, cy + j, c); }
    // la cabeza con las orejas, los ojos cerrados de gusto y los bigotes
    const hx = cx - 22, hy = cy - 6; disco(hx, hy, 11, K); disco(hx, hy, 10, NA); disco(hx - 1, hy - 2, 7, NL); for (const d of [-6, 6]) { poligono([[hx + d - 4, hy - 7], [hx + d + 4, hy - 7], [hx + d, hy - 15]], K); poligono([[hx + d - 3, hy - 8], [hx + d + 3, hy - 8], [hx + d, hy - 13]], NA); pset(hx + d, hy - 10, hex('#f0a0a0')); }
    for (const d of [-4, 4]) { linea(hx + d - 2, hy - 1, hx + d + 2, hy - 1, K); pset(hx + d - 2, hy - 2, K); pset(hx + d + 2, hy - 2, K); } rect(hx - 1, hy + 2, hx + 1, hy + 3, hex('#e87a8a'));
    for (const s of [-1, 1]) for (let k = 0; k < 2; k++) linea(hx + s * 4, hy + 4 + k, hx + s * 15, hy + 3 + k * 3, hex('#f8f0e6'));
    for (let k = 0; k < 3; k++) rect(hx - 4 + k * 3, hy - 9, hx - 4 + k * 3, hy - 6, NS);
    // la cola que se mueve despacio
    for (let i = 0; i < 26; i++) { const a = i / 26, x = Math.round(cx + 24 + Math.sin(a * 2.4) * 10), y = Math.round(cy + 10 + a * 18 + Math.sin(t * 1.8 + a * 3) * a * 6); disco(x, y, 3, (i >> 2) & 1 ? NS : NA); }
    for (const d of [-12, -4]) { disco(cx + d, cy + 17, 4, K); disco(cx + d, cy + 16, 3.4, NL); } }
  return { suelo: 179, revista: [80, 30, 240, 156], taza: [278, 140], plato: [40, 150] };
}

// lo fijo del inserto: el mantel con pliegues y luz, la revista abierta (o la portada), el plato, el vaso, la taza, el lápiz
function g_revistaFijo(R, pagina) {
  const { rect, pset, disco, linea, poligono } = R, K = C.k;
  // el mantel de cuadros visto desde arriba, con sus pliegues suaves y la luz de la ventana por la izquierda
  for (let y = 0; y <= 179; y++) for (let x = 0; x <= 319; x++) { const pl = Math.sin(x * 0.045 + y * 0.012) * 0.5 + Math.sin(y * 0.08 + x * 0.01) * 0.3, luz = 0.5 - x / 420 + pl * 0.6;
    pset(x, y, g_vichy(x + Math.round(Math.sin(y * 0.05) * 2), y, 12, 12, luz)); }
  // la sombra de la revista sobre el mantel
  for (let y = 34; y <= 162; y++) for (let x = 84; x <= 250; x++) if (g_b4(x, y) < 0.5) g_tiñe(R, x, y, K, 0.3);
  if (pagina === 'portada') {
    // la portada inventada: la franja de cabecera (barras), la ilustración (la isla con su roble, la luna, el mar con
    // olas, un barco), barras de titulares y el número de la revista
    rect(110, 26, 212, 160, K); rect(111, 27, 211, 159, hex('#f2e8cc'));
    rect(113, 29, 209, 46, hex('#c83a3a')); for (const [x, w] of [[118, 22], [144, 14], [162, 26], [192, 12]]) { rect(x, 33, x + w, 36, hex('#f6f2ea')); rect(x, 39, x + w - 4, 41, hex('#f2c8a0')); }
    g_degradado(R, 115, 49, 207, 122, ['#1e2a5a', '#2a3a7a', '#3a5a9a', '#5a7ab8'].map(hex));
    for (let k = 0; k < 18; k++) pset(116 + Math.round(h(k, 1, 710) * 90), 51 + Math.round(h(k, 2, 710) * 30), hex('#e8e6fa')); disco(188, 62, 7, hex('#fff2c0')); disco(190, 60, 6, hex('#2a3a7a'));
    for (let y = 104; y <= 122; y++) for (let x = 115; x <= 207; x++) pset(x, y, Math.sin(x * 0.4 + y * 1.3) > 0.6 ? hex('#8ab8d8') : y < 110 ? hex('#2a5a8a') : hex('#1e4a78'));
    poligono([[132, 106], [190, 106], [180, 98], [146, 96]], hex('#4a7a3a')); poligono([[132, 106], [150, 106], [146, 96]], hex('#3a6a2e')); rect(160, 82, 162, 98, hex('#5a3a20')); disco(161, 80, 9, hex('#2e5e28')); disco(158, 77, 6, hex('#4a8a3a')); disco(165, 79, 5, hex('#3a7a32'));
    linea(162, 86, 172, 86, hex('#5a3a20')); linea(171, 86, 171, 92, hex('#c8b894')); disco(171, 93, 1.5, hex('#8a8a92'));
    poligono([[120, 112], [132, 112], [130, 116], [122, 116]], hex('#6a4a2a')); linea(126, 112, 126, 102, hex('#4a3a2a')); poligono([[127, 103], [127, 111], [133, 111]], hex('#f2eee4'));
    rect(115, 127, 207, 129, hex('#2a2a32')); rect(115, 133, 180, 135, hex('#5a5a62')); rect(115, 139, 196, 140, hex('#8a8a92')); rect(115, 144, 170, 145, hex('#8a8a92')); rect(115, 149, 188, 150, hex('#8a8a92'));
    R.numero('25', 196, 156, { tam: 8 });
  } else {
    // la revista abierta: las dos páginas con la sombra del lomo y el borde de las hojas
    rect(84, 30, 240, 158, K); rect(85, 31, 161, 157, hex('#fbf6e8')); rect(163, 31, 239, 157, hex('#f6f0de')); for (let x = 156; x <= 168; x++) { const k = 1 - Math.abs(x - 162) / 6; rect(x, 31, x, 157, g_mezcla(hex('#fbf6e8'), hex('#a89878'), k * 0.6)); } rect(162, 31, 162, 157, hex('#8a7a5a'));
    for (let y = 156; y <= 159; y++) { linea(86, y, 160, y, (y & 1) ? hex('#e8dcc0') : hex('#c8bca0')); linea(164, y, 238, y, (y & 1) ? hex('#e8dcc0') : hex('#c8bca0')); }
    // página izquierda: la ilustración de la isla de robles en la bahía, con la polea en la rama, y el texto en barras
    rect(90, 36, 156, 96, hex('#3a4a5a')); g_degradado(R, 91, 37, 155, 70, ['#8ac4ea', '#a8d4f0', '#d8ecf8'].map(hex));
    for (let y = 70; y <= 95; y++) for (let x = 91; x <= 155; x++) pset(x, y, Math.sin(x * 0.5 + y * 1.1) > 0.7 ? hex('#a8d8f0') : hex('#3a78b0'));
    poligono([[100, 80], [146, 80], [140, 70], [108, 68]], hex('#5a8a3a')); poligono([[100, 80], [114, 80], [108, 68]], hex('#3a6a2e')); for (const [x, y, r] of [[112, 60, 7], [124, 55, 9], [136, 61, 6]]) { disco(x, y, r, hex('#2e5e28')); disco(x - 1, y - 2, r * 0.6, hex('#5a9a4a')); rect(x - 1, y + r - 2, x, 70, hex('#5a3a20')); }
    linea(124, 58, 138, 58, hex('#5a3a20')); linea(136, 58, 136, 66, hex('#c8b894')); disco(136, 67, 1.5, hex('#8a8a92')); disco(136, 70, 3, hex('#4a3020')); disco(136, 70, 2, hex('#2a1a10'));
    for (let k = 0; k < 3; k++) { const x = 100 + k * 18, y = 46 + (k & 1) * 4; pset(x, y, hex('#5a5a62')); pset(x - 1, y - 1, hex('#5a5a62')); pset(x + 1, y - 1, hex('#5a5a62')); }
    for (let r = 0; r < 9; r++) rect(90, 102 + r * 6, r === 8 ? 128 : 156 - (r % 3) * 4, 103 + r * 6, hex('#a8a090'));
    rect(90, 100, 96, 105, hex('#c83a3a'));
    // página derecha: el corte del pozo con sus plataformas de troncos cada diez pies y las cotas, y texto en barras
    rect(168, 36, 236, 46, hex('#e8dcc0')); for (const [x, w] of [[172, 26], [202, 18]]) rect(x, 39, x + w, 42, hex('#5a5a62'));
    { const px0 = 196, px1 = 212; for (let y = 50; y <= 150; y++) { for (let x = 170; x <= 234; x++) if (x < px0 || x > px1) pset(x, y, ((x * 3 + y * 7) % 11 === 0) ? hex('#b89a74') : hex('#d8c4a0')); }
      rect(px0, 50, px1, 150, hex('#8a6a48')); rect(px0, 50, px0, 150, hex('#5a3a20')); rect(px1, 50, px1, 150, hex('#5a3a20')); for (let y = 52; y < 150; y += 3) pset(px0 + 3 + ((y * 7) % 10), y, hex('#a8885a'));
      for (let k = 1; k <= 9; k++) { const y = 50 + k * 10; rect(px0 - 1, y, px1 + 1, y + 1, hex('#5a3418')); for (let x = px0; x <= px1; x += 3) pset(x, y, hex('#a8743c')); linea(px1 + 3, y, px1 + 6, y, hex('#5a5a62')); R.numero(String(k * 10), px1 + 8, y + 4, { tam: 8, fina: true }); }
      for (let x = 170; x <= 234; x++) pset(x, 50, hex('#4a8a3a')); for (let x = 170; x <= 234; x += 2) pset(x, 49, hex('#6aaa4a'));
      rect(px0 + 4, 141, px1 - 4, 149, hex('#3a78b0')); rect(px0 + 4, 141, px1 - 4, 141, hex('#a8d8f0')); disco(204, 146, 2, hex('#e8b830')); pset(203, 145, hex('#fff0a0'));
      R.icono('?', 202, 128, hex('#c83a3a'), hex('#5a3418')); }
    for (let r = 0; r < 4; r++) rect(170, 50 + r * 6 + 0, 188, 51 + r * 6, hex('#a8a090'));
  }
  // la taza de café con su plato (abajo a la derecha), el plato de galletas con migas (abajo a la izquierda), el vaso de
  // leche (arriba a la izquierda), el lápiz y la cucharilla
  { const x = 278, y = 150; disco(x, y, 24, K); disco(x, y, 23, hex('#e8e4dc')); disco(x - 3, y - 3, 18, hex('#f6f4ee')); disco(x, y - 2, 14, K); disco(x, y - 2, 13, hex('#3a78b0')); disco(x, y - 2, 11, K); disco(x, y - 2, 10, hex('#6a3a1a')); disco(x - 2, y - 4, 6, hex('#8a5228')); pset(x - 4, y - 6, hex('#c8945a'));
    rect(x + 12, y - 4, x + 20, y + 1, K); rect(x + 13, y - 3, x + 19, y, hex('#3a78b0')); linea(x - 18, y + 14, x - 6, y + 4, hex('#c8d2dc')); disco(x - 19, y + 15, 2.5, hex('#c8d2dc')); }
  { const x = 40, y = 152; disco(x, y, 30, K); disco(x, y, 29, hex('#e8e4dc')); disco(x - 3, y - 3, 24, hex('#fbfaf6')); disco(x, y, 20, hex('#efece4'));
    for (const [dx, dy] of [[-10, -6], [6, -10], [-2, 6], [12, 4], [-14, 8]]) { disco(x + dx, y + dy, 7, K); disco(x + dx, y + dy, 6, hex('#c8904c')); disco(x + dx - 1, y + dy - 1, 4, hex('#e0ac64')); for (let k = 0; k < 4; k++) pset(x + dx + Math.round(h(k, dx, 720) * 6 - 3), y + dy + Math.round(h(k, dy, 720) * 6 - 3), hex('#4a2a14')); }
    for (let k = 0; k < 14; k++) pset(x + 22 + Math.round(h(k, 1, 721) * 24), y + 12 + Math.round(h(k, 2, 721) * 10), hex('#c8904c')); }
  { const x = 46, y = 52; disco(x, y + 3, 15, g_mezcla(hex('#c8443c'), K, 0.4)); disco(x, y, 15, K); disco(x, y, 14, hex('#e6f0f6')); disco(x, y, 12, hex('#fbfaf6')); disco(x - 4, y - 4, 4, C.blanco); for (let a = 0; a < 6.3; a += 0.15) pset(Math.round(x + Math.cos(a) * 14), Math.round(y + Math.sin(a) * 14), a > 3.5 && a < 5.5 ? C.blanco : hex('#b8c8d4')); }
  { linea(86, 170, 136, 162, K); linea(86, 171, 136, 163, hex('#e8c040')); linea(87, 172, 136, 164, hex('#c89a20')); linea(136, 162, 142, 162, hex('#e8c8a0')); pset(143, 162, K); rect(82, 170, 86, 172, hex('#e88a9a')); }
}

// lo que va por delante de los personajes: en 'excavacion', un cono y el caballete con la malla naranja abajo a la
// izquierda (x 0–34, y 150–180) y barro en el borde de abajo; en 'caseta', la papelera y el felpudo de abajo a la izquierda
// (x 0–40, y 160–180). Los demás encuadres no llevan nada delante
export function oakHoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'excavacion', { rect, pset, linea, poligono } = R;
  if (enc === 'excavacion') {
    // el caballete con malla naranja
    rect(2, 156, 3, 179, hex('#5a5a62')); rect(30, 156, 31, 179, hex('#5a5a62'));
    for (let y = 157; y < 170; y++) for (let x = 4; x < 30; x++) if (((x + y) & 3) === 0 || ((x - y) & 3) === 0) pset(x, y, (x + y) % 7 === 0 ? hex('#f8a45a') : hex('#e8783a'));
    rect(2, 156, 31, 156, hex('#c85a24')); rect(2, 170, 31, 170, hex('#c85a24'));
    // el cono con su franja reflectante
    h_cono(R, 44, 179, 1.3);
    for (let x = 0; x < 320; x++) { const y = 177 + Math.round(h(x >> 2, 9, 41) * 3); for (let yy = y; yy < 180; yy++) pset(x, yy, (x + yy) % 5 === 0 ? hex('#4e3e2c') : hex('#5e4a34')); }
  } else if (enc === 'caseta') {
    // la papelera de rejilla y el felpudo
    poligono([[6, 162], [26, 162], [24, 179], [8, 179]], (x, y) => ((x + y) % 3 === 0 ? hex('#2a2e34') : x < 12 ? hex('#5a626a') : hex('#444a52')));
    rect(5, 160, 27, 162, hex('#6e767e')); rect(5, 160, 27, 160, hex('#9aa2aa'));
    for (const [x, y, c] of [[10, 158, '#f0ece0'], [15, 157, '#d8c89a'], [20, 159, '#e8e4d8']]) { rect(x, y, x + 3, y + 2, hex(c)); pset(x, y, hex('#ffffff')); }
    linea(30, 179, 40, 172, hex('#3a3026'));
  }
}

// lo que las escenas necesitan de cada encuadre de oakHoy (coordenadas del lienzo de 320 × 180; pies = la y que se pasa a R.actor)
export const H_OAK = {
  excavacion: { pies: [150, 172], libre: [[14, 106], [146, 196]], brocal: [128, 140], tubo: { x: [114, 142], abajo: (o) => h_tuboAbajo(o), largo: 80 }, punta: [128, 24], grua: { orugas: [194, 130, 288, 148], cabina: [202, 94, 226, 124] }, contenedores: [2, 80, 58, 126], generador: [62, 108, 96, 130], montón: [148, 114, 192, 138], tubosRepuesto: [252, 140, 318, 179], charcos: [[60, 164], [176, 170], [30, 150]], horizonte: 63, sol: null },
  calzada: { pies: [117, 121], carretera: [114, 121], costa: [0, 56], isla: [246, 320], agua: (marea) => Math.round(136 - marea * 6), horizonte: 70, muelle: { pies: 153, x: [4, 92], tablas: [150, 156], bote: [104, 162] }, casa: [30, 84], postesLuz: [70, 150, 230], senal: [56, 94], barca: 96 },
  caseta: { pies: [152, 172], libre: [[36, 290]], mostrador: { x: [92, 282], tablero: 128, frente: [134, 148] }, ventana: [10, 24, 72, 86], plano: [82, 22, 138, 74], pozoPlano: [117, 49], pantalla: [149, 23, 235, 86], monitor: [196, 100, 226, 124], portatiles: [[104, 114, 128, 131], [234, 114, 258, 131]], cafes: [[136, 124], [190, 123], [302, 92]], cascos: [[256, 66], [276, 66], [296, 66]], reloj: [258, 32], fuente: [16, 92, 32, 148], archivador: [288, 98, 316, 148] },
  hallazgos: { mesa: [14, 70, 306, 178], cuadro: [24, 16, 124, 58], monedas: [[78, 104, 11], [112, 132, 8], [58, 142, 6]], clavos: [[140, 92, 186, 108], [150, 124, 192, 134], [138, 150, 170, 160]], maderas: [[206, 84, 262, 112], [208, 124, 254, 150]], etiquetas: [[264, 82, 292, 96], [258, 130, 288, 144]], regla: [24, 164, 124, 168], guantes: [224, 156, 300, 178], manos: [110, 230] },
};

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
const h_mez = (c1, c2, a) => {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
};

// el tramado ordenado 4 × 4 (umbral entre 0 y 1)
const h_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const h_umbral = (x, y) => h_BAYER[((y & 3) << 2) | (x & 3)];

const h_lim = (u) => Math.max(0, Math.min(1, u));

const h_hx = (a) => a.map(hex);

// las capas fijas de oakHoy: se pintan una vez en un búfer de R.nuevo() y se copian en cada fotograma
const h_CAPAS = new Map();

function h_capa(R, clave, dibuja) {
  let b = h_CAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); h_CAPAS.set(clave, b); }
  R.copiar(b);
  return b;
}

// degradado de arriba abajo entre los colores de cols, liso dentro de cada banda y tramado en los cambios
function h_degradado(R, y0, y1, cols, x0 = 0, x1 = 319) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) {
    const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = h_lim((u - i - 0.5) * 2.4 + 0.5);
    for (let x = x0; x <= x1; x++) R.pset(x, y, h_umbral(x, y) < f ? cols[i + 1] : cols[i]);
  }
}

// cifras pequeñas de 3 × 5 (etiquetas, escalas, cuadrículas)
const h_DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001010010', '111101111101111', '111101111001111'];

function h_cifras(R, txt, x, y, c) { for (const ch of String(txt)) { const g = h_DIG[ch.charCodeAt(0) - 48]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x + i, y + j, c); x += 4; } }

// el cielo de Nueva Escocia: azul tramado hasta el horizonte, con cirros finos (no en la zona de Atom ni en la del año)
const H_CIELO = h_hx(['#3f84cc', '#5296d8', '#6eaae2', '#8cc0ea', '#acd4f0', '#c8e2f2']);

function h_cieloFijo(R, y0, y1, x0 = 0, x1 = 319) {
  h_degradado(R, y0, y1, H_CIELO, x0, x1);
  const ci = hex('#d4e6f6'), ci2 = hex('#b6d4ee');
  for (let k = 0; k < 9; k++) {
    const cx = x0 + Math.round(h(k, 1, 77) * (x1 - x0)), cy = y0 + 18 + Math.round(h(k, 2, 77) * (y1 - y0) * 0.45), w = 14 + Math.round(h(k, 3, 77) * 26);
    if ((cx > 262 && cy < 50) || (cx < 180 && cy < 18)) continue;
    for (let i = 0; i < w; i++) { const x = cx + i - (w >> 1), y = cy + Math.round(Math.sin(i * 0.2 + k) * 1.2); if (x > 262 && y < 50) continue; if ((i + k) % 3) R.pset(x, y, i % 4 === 0 ? ci : ci2); }
  }
}

// una nube de tres tonos (luz arriba a la izquierda, cuerpo, sombra y la base plana); clip [x0, y0, x1, y1]
function h_nube(R, cx, cy, w, sem, tonos, clip) {
  const [cl, cm, cs] = tonos, n = Math.max(3, Math.round(w / 7));
  R.recorte([clip[0], clip[1], clip[2], Math.min(clip[3], cy + 2)]);
  const rs = [];
  for (let k = 0; k < n; k++) { const u = k / (n - 1); rs.push([cx - w / 2 + u * w, (w * 0.17 + 2) * (0.5 + 0.5 * Math.sin(u * Math.PI)) * (0.8 + 0.4 * h(k, sem, 5))]); }
  for (const [x, r] of rs) R.disco(x, cy - r * 0.4 + 1, r, cs);
  for (const [x, r] of rs) R.disco(x - 0.5, cy - r * 0.4 - 0.5, r - 1, cm);
  for (const [x, r] of rs) if (r > 3) R.disco(x - 1, cy - r * 0.75 - 0.5, r * 0.55, cl);
  R.recorte(null);
}

// tres capas de nubes que corren a tres velocidades (las lejanas, pequeñas, azuladas y lentas) por encima de hor
const H_NUBES = [h_hx(['#eef4fa', '#d2e0ee', '#acc0d6']), h_hx(['#f8fbff', '#e2ecf6', '#b8c8dc']), h_hx(['#ffffff', '#ebf1f8', '#c0cede'])];

function h_nubes(R, t, hor, clip = [0, 0, 319, 179], sem = 0) {
  const capas = [[3, 12, 20, 0.9, hor - 30], [3, 22, 34, 2.2, hor - 20], [2, 34, 52, 4.2, hor - 8]];
  capas.forEach(([n, w0, w1, v, ym], c) => {
    for (let k = 0; k < n; k++) {
      const w = Math.round(w0 + h(k, c, 31 + sem) * (w1 - w0)), per = 320 + w + 40;
      const x = ((h(k, c + 4, 31 + sem) * per + t * v) % per) - w / 2 - 20, y = Math.round(Math.max(20 + c * 6, ym - h(k, c + 8, 31 + sem) * 14));
      h_nube(R, x, y, w, k * 7 + c + sem, H_NUBES[c], clip);
    }
  });
}

// gaviotas que planean y aletean (fuera de la zona de Atom y de la del año); clip opcional
function h_gaviotas(R, t, n, y0, y1, clip = null, sem = 0) {
  const bl = hex('#f6f6f2'), gr = hex('#8a929c'), ne = hex('#2a2e34');
  for (let k = 0; k < n; k++) {
    const v = 6 + h(k, 1, 51 + sem) * 8, dir = h(k, 2, 51 + sem) < 0.5 ? 1 : -1, per = 380;
    let x = ((h(k, 3, 51 + sem) * per + t * v) % per) - 30; if (dir < 0) x = 320 - x;
    const y = y0 + h(k, 4, 51 + sem) * (y1 - y0) + Math.sin(t * 0.7 + k * 2) * 3;
    const X = Math.round(x), Y = Math.round(y);
    if ((X > 266 && Y < 50) || (X < 176 && Y < 18)) continue;
    if (clip && (X < clip[0] || X > clip[2] || Y < clip[1] || Y > clip[3])) continue;
    const f = Math.floor(t * 4 + k * 1.7) % 4, ala = f === 0 ? -2 : f === 1 ? -1 : f === 2 ? 0 : -1;
    R.pset(X, Y, bl); R.pset(X + dir, Y, bl); R.pset(X + 2 * dir, Y - 1, gr);
    for (const s of [-1, 1]) { R.pset(X + s, Y + Math.round(ala / 2), bl); R.pset(X + 2 * s, Y + ala, bl); R.pset(X + 3 * s, Y + ala + (ala < 0 ? 0 : 1), ne); }
  }
}

// la copa de un roble: racimos de hojas con luz arriba a la izquierda y la sombra abajo
const H_HOJA = h_hx(['#1c3a24', '#2a5232', '#3a6a3c', '#55864a', '#76a45a']);

function h_copa(R, cx, cy, r, sem, cols = H_HOJA) {
  const f = (x, y) => { const l = 0.55 - ((x - cx) * 0.4 + (y - cy) * 0.8) / (r * 1.6) + (h(x >> 1, y >> 1, sem) - 0.5) * 0.45; return cols[l < 0.12 ? 0 : l < 0.38 ? 1 : l < 0.62 ? 2 : l < 0.85 ? 3 : 4]; };
  const n = 4 + Math.round(r / 4);
  for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2 + sem, d = r * (0.35 + 0.25 * h(k, sem, 3)); R.disco(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7, r * (0.45 + 0.2 * h(k, sem, 4)), f); }
  R.disco(cx, cy, r * 0.6, f);
}

// un abeto: pisos de ramas dentadas, el lado de la luz a la izquierda
function h_abeto(R, x, base, alto, sem, c = h_hx(['#16302a', '#22443a', '#34604a'])) {
  for (let j = 0; j < alto; j++) {
    const u = j / alto, w = Math.round(1 + u * alto * 0.3 * (0.75 + 0.25 * ((j % 4) / 3)) + (h(j, sem, 8) - 0.5));
    for (let i = -w; i <= w; i++) R.pset(x + i, base - alto + j, i < -w * 0.4 ? c[2] : i > w * 0.3 ? c[0] : c[1]);
  }
  R.rect(x, base - 1, x, base, hex('#3a2a1e'));
}

// un operario pequeño de fondo (13 px): casco, chaleco naranja con la banda reflectante, pantalón oscuro; o.anda (la dir en
// que camina), o.pala (cava con la pala), o.casco (color)
function h_obrero(R, x, suelo, t, k, o = {}) {
  const X = Math.round(x), S = Math.round(suelo), piel = [hex('#e8b890'), hex('#c08a64'), hex('#8a5a3c')][k % 3];
  const casco = o.casco ?? [hex('#f6f2ea'), hex('#e8c040'), hex('#e8783a')][k % 3], ch = hex('#e8783a'), chS = hex('#b8561c'), ref = hex('#f0f0a0'), pan = hex('#2e3442');
  const paso = o.anda ? Math.floor(t * 6 + k) % 2 : 0, cav = o.pala ? Math.sin(t * 3 + k) : 0;
  R.rect(X - 1 - paso, S - 3, X - 1 - paso, S, pan); R.rect(X + 1 + paso, S - 3, X + 1 + paso, S, pan); R.pset(X - 1 - paso, S, hex('#1a1c22')); R.pset(X + 1 + paso, S, hex('#1a1c22'));
  R.rect(X - 2, S - 8, X + 2, S - 4, ch); R.rect(X + 1, S - 8, X + 2, S - 4, chS); R.rect(X - 2, S - 6, X + 2, S - 6, ref);
  R.rect(X - 1, S - 11, X + 1, S - 9, piel); R.rect(X - 2, S - 12, X + 2, S - 12, casco); R.rect(X - 1, S - 13, X + 1, S - 13, casco);
  const d = o.anda ?? o.dir ?? 1;
  if (o.pala) { const hy = S - 7 + Math.round(cav * 2); R.linea(X + 2 * d, hy, X + 6 * d, S - 1 + Math.round(cav), hex('#8a6a44')); R.rect(X + 5 * d, S - 1 + Math.round(cav), X + 7 * d, S + Math.round(cav), hex('#8a929c')); R.pset(X + 2 * d, hy, piel); }
  else { R.pset(X - 3, S - 7 + paso, ch); R.pset(X + 3, S - 7 + (1 - paso), chS); R.pset(X - 3, S - 6 + paso, piel); R.pset(X + 3, S - 6 + (1 - paso), piel); }
}

// un cono de obra naranja con su franja reflectante; s escala
function h_cono(R, x, suelo, s = 1) {
  const a = Math.round(9 * s), w = Math.round(4 * s);
  R.rect(x - w - 1, suelo - 1, x + w + 1, suelo, hex('#2a2a30'));
  R.poligono([[x - w, suelo - 1], [x - 1, suelo - a], [x + 1, suelo - a], [x + w + 1, suelo - 1]], (xx, yy) => (Math.abs(yy - (suelo - a * 0.55)) < 1.2 * s ? hex('#f4f4ee') : xx > x ? hex('#c85a1c') : hex('#f08a3a')));
}

// el humo que sale de un escape: bocanadas que suben, crecen, se aclaran y se las lleva el viento
function h_humo(R, x, y, t, n = 5, c = h_hx(['#5a5a62', '#7a7a84', '#a0a0aa']), v = 6) {
  for (let k = 0; k < n; k++) { const u = ((t * 0.5 + k / n) % 1), px = x + u * v * 4 + Math.sin(t * 2 + k) * u * 2, py = y - u * 22; R.disco(px, py, 1 + u * 3.2, c[Math.min(2, Math.floor(u * 3))]); }
}

// un contenedor de chapa ondulada visto de lado, con su puerta en un extremo (puerta: 1 a la derecha, -1 a la izquierda)
function h_contenedor(R, x0, y0, x1, y1, [cL, c, cS], puerta = 1, sem = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const m = (x - x0) % 3; R.pset(x, y, m === 0 ? cS : m === 1 ? cL : c); }
  R.rect(x0, y0, x1, y0 + 1, cL); R.rect(x0, y1 - 1, x1, y1, cS); R.rect(x0, y0, x0 + 1, y1, cS); R.rect(x1 - 1, y0, x1, y1, cS);
  for (const [x, y] of [[x0, y0], [x1 - 2, y0], [x0, y1 - 2], [x1 - 2, y1 - 2]]) R.rect(x, y, x + 2, y + 2, hex('#2a2a30'));
  const xp = puerta > 0 ? x1 - 12 : x0 + 3;
  R.rect(xp, y0 + 2, xp + 9, y1 - 2, c); R.rect(xp + 4, y0 + 2, xp + 4, y1 - 2, cS);
  for (const bx of [xp + 2, xp + 7]) { R.rect(bx, y0 + 2, bx, y1 - 2, hex('#4a4a52')); R.pset(bx, (y0 + y1) >> 1, hex('#c8ccd0')); }
  for (let k = 0; k < 10; k++) { const x = x0 + 2 + Math.round(h(k, sem, 13) * (x1 - x0 - 4)), l = 2 + Math.round(h(k, sem, 14) * 5); for (let j = 0; j < l; j++) if ((x - x0) % 3 !== 0) R.pset(x, y0 + 2 + j, h_mez(R.pget(x, y0 + 2 + j), hex('#8a4a24'), 0.6 - j * 0.08)); }
  R.rect(x0 + 1, y1 + 1, x1 + 2, y1 + 2, hex('#4a3a2a'));
}

const H_SUELO = h_hx(['#5e4a36', '#6e5840', '#7e664a', '#8e7656', '#a08a68']);

const H_MAR = h_hx(['#6a9ab8', '#4e84a8', '#3a6a8a', '#30607c']);

const H_MAR_SET = new Set(H_MAR);

// la y de la boca de abajo del tubo según o.tubo / o.sale
function h_tuboAbajo(o = {}) { const s = o.sale ?? 0; return s > 0 ? Math.round(lerp(212, 130, h_lim(s))) : Math.round(lerp(126, 214, h_lim(o.tubo ?? 0.5))); }

function h_excFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el cielo y la costa de enfrente con sus casitas
  h_cieloFijo(R, 0, 63);
  const lomaF = (x) => 57 + Math.round(Math.sin(x * 0.025 + 1) * 2.5 + Math.sin(x * 0.07) * 1.2);
  for (let x = 0; x < 320; x++) { for (let y = lomaF(x); y < 64; y++) pset(x, y, y < lomaF(x) + 2 ? hex('#88a4ac') : (x + y) % 4 === 0 ? hex('#6e8c92') : hex('#7896a0')); }
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 91) * 300) + 8, y = lomaF(x) + 2 + Math.round(h(k, 2, 91) * 3); rect(x, y, x + 2, y + 1, hex('#e8e8e0')); pset(x, y - 1, hex('#9a5a4a')); pset(x + 1, y - 1, hex('#9a5a4a')); }
  for (let x = 0; x < 320; x += 3) if (h(x, 5, 92) > 0.5) pset(x, lomaF(x) - 1, hex('#5a7a7e'));
  // la bahía, con vetas de luz
  for (let y = 64; y < 96; y++) for (let x = 0; x < 320; x++) { const u = Math.min(1, (y - 64) / 18); let c = H_MAR[Math.max(0, Math.min(2, Math.floor(u * 2.8 + (h_umbral(x, y) - 0.5) * 0.6)))]; if (h(x >> 3, y, 93) > 0.93) c = H_MAR[0]; pset(x, y, c); }
  // los robles y abetos de la isla: masas a los lados, matorral bajo en el centro
  for (let k = 0; k < 9; k++) h_abeto(R, 6 + k * 13 + Math.round(h(k, 1, 94) * 6), 100, 22 + Math.round(h(k, 2, 94) * 14), k);
  for (const [x, y, r] of [[14, 84, 14], [42, 80, 16], [76, 86, 13], [100, 90, 10], [236, 86, 12], [262, 80, 16], [294, 82, 15], [316, 88, 12]]) h_copa(R, x, y, r, x);
  for (let k = 0; k < 7; k++) h_abeto(R, 244 + k * 12 + Math.round(h(k, 3, 94) * 5), 100, 18 + Math.round(h(k, 4, 94) * 12), k + 20);
  for (let x = 104; x < 236; x += 9) h_copa(R, x, 94 + Math.round(h(x, 1, 95) * 3), 6 + Math.round(h(x, 2, 95) * 3), x + 3);
  // el suelo de la obra: barro y grava, con roderas, piedras y manchas húmedas
  for (let y = 96; y < 180; y++) for (let x = 0; x < 320; x++) {
    const u = (y - 96) / 84, n = h(x >> 1, y >> 1, 96) * 0.5 + h(x >> 3, y >> 2, 97) * 0.5;
    let i = Math.round(3.6 - u * 2.2 + (n - 0.5) * 1.8 + (h_umbral(x, y) - 0.5) * 0.6); i = Math.max(0, Math.min(4, i));
    if (y > 104 && Math.sin(x * 0.05 + y * 0.13) + Math.sin(x * 0.021 - y * 0.07) > 1.15) i = Math.max(0, i - 1);
    pset(x, y, H_SUELO[i]);
    if (h(x, y, 98) > 0.985) pset(x, y, hex('#c0b090'));
  }
  // roderas de camión que vienen de abajo a la izquierda
  for (const [a, b, s] of [[20, 0.35, 0], [32, 0.35, 1]]) for (let y = 104; y < 180; y++) { const x = Math.round(a + (180 - y) * b + Math.sin(y * 0.05) * 6 + (y - 104) * 0.1); if ((y + s) % 3) { pset(x, y, H_SUELO[0]); pset(x + 1, y, H_SUELO[1]); } if (y % 3 === 0) pset(x + 2, y, H_SUELO[4]); }
  // la valla de obra al fondo: postes con sus pies de hormigón, la malla y tramos de malla naranja
  for (let x = 0; x < 320; x++) for (let y = 92; y < 105; y++) if (((x + y) % 4 === 0 || (x - y + 400) % 4 === 0)) pset(x, y, h_mez(R.pget(x, y), hex('#c8ccd0'), 0.45));
  rect(0, 92, 319, 92, hex('#9aa0a6'));
  for (let x = 4; x < 320; x += 22) { rect(x, 90, x, 105, hex('#7a8088')); rect(x - 2, 104, x + 2, 106, hex('#a8a49c')); }
  for (const [x0, x1] of [[108, 152], [196, 230]]) for (let x = x0; x < x1; x++) for (let y = 95; y < 103; y++) if ((x + y) % 2) pset(x, y, (y === 95 || y === 102) ? hex('#c85a24') : hex('#e8783a'));
  // el cartel de la valla (pictogramas: el casco y la exclamación)
  rect(160, 94, 176, 104, hex('#f0f0e8')); rect(160, 94, 176, 94, hex('#2a5aa8')); disco(165, 100, 3, hex('#2a5aa8')); rect(163, 98, 167, 98, hex('#f0f0e8'));
  poligono([[171, 103], [174, 97], [177, 103]], hex('#e8c040')); pset(174, 100, C.k); pset(174, 102, C.k);
  // matas de hierba al pie de la valla y piedras sueltas con su luz y su sombra
  for (let x = 0; x < 320; x += 2) if (h(x, 1, 102) > 0.45) { const l = 1 + Math.round(h(x, 2, 102) * 3); for (let j = 0; j < l; j++) pset(x + (j === l - 1 ? (x % 4 ? 1 : -1) : 0), 106 - j, j ? hex('#6a9a4a') : hex('#4a7a3a')); }
  for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 1, 103) * 318), y = 108 + Math.round(h(k, 2, 103) * 70), r = 1 + Math.round(h(k, 3, 103) * 1.6); if (x > 96 && x < 160 && y > 130 && y < 152) continue; disco(x, y, r, hex('#7a7468')); pset(x - 1, y - r + 1, hex('#b8b2a4')); pset(x + r - 1, y + 1, hex('#4a4438')); }
  // los tablones puestos sobre el barro para pasar, de abajo a la izquierda hacia el brocal
  for (const [x0, y0, x1, y1] of [[18, 176, 60, 166], [64, 165, 98, 156]]) for (let k = 0; k < 6; k++) { linea(x0, y0 + k, x1, y1 + k, k === 0 ? hex('#c89a64') : k === 5 ? hex('#5e4228') : (k === 2 ? hex('#8a6a44') : hex('#a8804c'))); }
  // la torre de luz portátil, detrás de la grúa: el mástil, los cuatro focos y el remolque
  rect(234, 56, 235, 98, hex('#9aa0a6')); rect(226, 54, 244, 55, hex('#5a5a62')); for (const x of [227, 232, 238, 242]) { rect(x - 1, 50, x + 1, 53, hex('#2a2a30')); pset(x, 51, hex('#f6f2c8')); }
  rect(226, 96, 244, 104, hex('#e8c040')); rect(226, 96, 244, 96, hex('#f6d870'));
  // la carretilla con barro y la bobina de manguera
  { const x = 214, y = 168; poligono([[x - 10, y - 8], [x + 6, y - 8], [x + 3, y - 2], [x - 7, y - 2]], hex('#2a6a9a')); rect(x - 10, y - 9, x + 6, y - 9, hex('#4a8aba')); disco(x - 2, y - 9, 4, hex('#6e5840')); rect(x - 7, y - 10, x + 3, y - 9, hex('#5e4a34'));
    disco(x - 9, y - 1, 2, hex('#1a1a20')); linea(x + 4, y - 6, x + 12, y - 5, hex('#5a5a62')); linea(x + 4, y - 4, x + 6, y, hex('#5a5a62')); }
  { const x = 42, y = 134; disco(x, y, 6, hex('#d8402a')); disco(x, y, 4, hex('#1e1e24')); disco(x, y, 2, hex('#d8402a')); rect(x - 7, y + 5, x + 7, y + 6, hex('#5a5a62')); }
  // los contenedores (azul abajo, rojo de óxido encima) y su sombra
  h_contenedor(R, 2, 104, 52, 126, h_hx(['#5a8ac0', '#3a6a9a', '#2a4e74']), 1, 1);
  h_contenedor(R, 8, 82, 56, 103, h_hx(['#c86a54', '#a84a3a', '#7a3226']), -1, 2);
  // el grupo electrógeno: caja verde con rejillas, el panel y el depósito; el escape arriba
  rect(62, 110, 96, 130, hex('#4a6a52')); rect(62, 110, 96, 111, hex('#6a8a6e')); rect(95, 110, 96, 130, hex('#34503c')); rect(62, 129, 96, 130, hex('#2e4434'));
  for (let y = 114; y < 126; y += 2) rect(66, y, 80, y, hex('#2e4434'));
  rect(84, 114, 92, 122, hex('#2a2e34')); pset(86, 116, hex('#e8c040')); rect(86, 119, 90, 119, hex('#8a929c'));
  rect(62, 131, 97, 133, hex('#3a3a40')); rect(90, 100, 91, 110, hex('#3a3a40')); rect(89, 100, 92, 100, hex('#5a5a62'));
  // las mangueras por el suelo, del generador al brocal
  for (let k = 0; k < 2; k++) { let px = 96, py = 128 + k * 2; for (let i = 1; i <= 20; i++) { const x = 96 + i, y = Math.round(128 + k * 2 + Math.sin(i * 0.3) * 1.5 + i * 0.45); linea(px, py, x, y, hex('#1e1e24')); pset(x, y - 1, hex('#4a4a54')); px = x; py = y; } }
  // el montón de barro que sacan del tubo
  poligono([[148, 138], [158, 120], [168, 114], [180, 117], [192, 138]], (x, y) => { const n = h(x >> 1, y >> 1, 99); return n > 0.8 ? hex('#4a3826') : (x - 168) * 0.5 + (y - 114) * 0.3 + n * 8 > 8 ? hex('#5a4630') : hex('#7a6044'); });
  for (let k = 0; k < 12; k++) disco(152 + h(k, 1, 100) * 36, 124 + h(k, 2, 100) * 12, 1.2, hex('#8a7254'));
  // las esteras de madera alrededor del brocal y la boca del pozo
  for (let y = 132; y < 150; y++) for (let x = 98; x < 160; x++) { const tb = Math.floor((y - 132) / 4), c = (y - 132) % 4 === 3 ? hex('#4a3420') : h(x >> 2, tb, 101) > 0.7 ? hex('#7a5a38') : (x + tb * 7) % 13 === 0 ? hex('#5e4228') : hex('#8a6a44'); pset(x, y, c); }
  for (let y = 132; y < 150; y += 4) rect(98, y, 159, y, hex('#a8885a'));
  for (let x = 0; x < 64; x++) { const a = x / 63 * Math.PI; pset(Math.round(128 - Math.cos(a) * 20), Math.round(140 - Math.sin(a) * 5), hex('#2a2a30')); }
  for (let j = -5; j <= 5; j++) for (let i = -19; i <= 19; i++) if ((i * i) / 361 + (j * j) / 25 <= 1) pset(128 + i, 140 + j, j < 0 ? hex('#1e1812') : hex('#2a2018'));
  // la grúa sobre orugas
  h_gruaFija(R);
  // la pila de tubos de repuesto en primer término, sobre calzos
  rect(252, 174, 318, 179, hex('#5e4228')); rect(252, 174, 318, 174, hex('#8a6a44'));
  for (const [cx, cy] of [[266, 163], [294, 163], [280, 145]]) h_tuboBoca(R, cx, cy, 11);
  // los conos, los charcos que reflejan el cielo
  h_cono(R, 104, 152); h_cono(R, 160, 152); h_cono(R, 196, 156);
  for (const [cx, cy, rx, ry] of [[60, 164, 15, 3], [176, 170, 11, 2], [30, 150, 9, 2], [228, 160, 8, 2]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) {
    const d = (i * i) / (rx * rx) + (j * j) / (ry * ry); if (d > 1) continue; pset(cx + i, cy + j, d > 0.7 ? hex('#4a3a2a') : j < 0 ? hex('#8cc0ea') : (i + j) % 5 === 0 ? hex('#c8e2f2') : hex('#6eaae2'));
  }
}

// la boca de un tubo de acero visto de frente: el canto con luz y sombra, el hueco oscuro y algo de óxido
function h_tuboBoca(R, cx, cy, r) {
  R.disco(cx + 1, cy + 1, r + 1, hex('#2e2a26'));
  R.disco(cx, cy, r, (x, y) => (y - cy + (x - cx) * 0.6 < -3 ? hex('#c8d2dc') : y - cy + (x - cx) * 0.6 > 4 ? hex('#5e6a76') : hex('#8a96a2')));
  R.disco(cx, cy, r - 2, (x, y) => (y - cy < -2 ? hex('#3a4048') : hex('#14161a')));
  for (let k = 0; k < 5; k++) { const a = h(k, cx, 7) * 6.28; R.pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), hex('#9a5a34')); }
}

// la grúa sobre orugas, fija: orugas, cuerpo, cabina, motor, contrapeso con franjas, pórtico, pluma de celosía y tirantes
const H_GRUA = { pie: [214, 110], punta: [128, 24], portico: [252, 80] };

function h_gruaFija(R) {
  const { rect, pset, linea, disco, poligono } = R;
  const am = hex('#e8b830'), amS = hex('#b8861c'), amL = hex('#f6d870'), os = hex('#2a2a32'), osL = hex('#4a4a56');
  // la sombra en el suelo
  for (let j = 0; j < 6; j++) for (let i = 186; i < 300; i++) if ((i + j) % 2 === 0 || j > 1) pset(i, 147 + j, h_mez(R.pget(i, 147 + j), hex('#2a2018'), 0.55));
  // las orugas: el bastidor redondeado, las tejas y los rodillos
  for (let y = 130; y <= 148; y++) for (let x = 192; x <= 290; x++) {
    const dx = x < 201 ? 201 - x : x > 281 ? x - 281 : 0, dy = y - 139; if (dx * dx + dy * dy * (dx ? 1 : 0) > 81 && dx) continue;
    const borde = y < 132 || y > 146 || dx > 6; pset(x, y, borde ? ((x + y) % 3 === 0 ? os : hex('#3a3a44')) : osL);
  }
  for (let x = 198; x < 286; x += 8) { disco(x, 139, 3, hex('#5a5a66')); disco(x, 139, 1, hex('#2a2a32')); pset(x - 1, 137, hex('#8a8a96')); }
  rect(198, 133, 285, 133, hex('#6a6a76'));
  // la plataforma giratoria y el cuerpo
  rect(204, 124, 282, 129, hex('#3a3a42')); rect(204, 124, 282, 124, hex('#5a5a66'));
  rect(206, 100, 286, 124, am); rect(206, 100, 286, 101, amL); rect(206, 122, 286, 124, amS); rect(284, 100, 286, 124, amS);
  // la cabina con sus cristales (el cielo reflejado en diagonal)
  rect(202, 92, 228, 124, am); rect(202, 92, 228, 93, amL); rect(202, 92, 203, 124, amL);
  rect(205, 96, 225, 112, hex('#2a3440'));
  for (let y = 97; y < 112; y++) for (let x = 206; x < 225; x++) pset(x, y, (x - y + 300) % 11 < 2 ? hex('#a8d0ea') : y < 103 ? hex('#6a9ac0') : hex('#4a7090'));
  rect(215, 96, 215, 112, hex('#2a3440')); rect(205, 114, 225, 121, amS); rect(208, 116, 222, 116, am);
  // el motor con sus rejillas y la puertecilla
  for (let y = 104; y < 120; y += 2) rect(234, y, 256, y, amS);
  rect(234, 104, 256, 104, hex('#7a5a14'));
  // el contrapeso: placas, tornillos y franjas de peligro
  rect(262, 102, 290, 128, hex('#c89a24')); for (let y = 108; y < 126; y += 6) rect(262, y, 290, y, amS);
  for (const [x, y] of [[265, 105], [287, 105], [265, 125], [287, 125]]) pset(x, y, hex('#7a5a14'));
  for (let x = 262; x <= 290; x++) for (let y = 126; y <= 129; y++) pset(x, y, ((x + y) >> 1) % 2 ? C.k : hex('#e8c040'));
  // el escape y la barandilla de arriba
  rect(258, 88, 260, 100, hex('#3a3a40')); rect(257, 88, 261, 88, hex('#5a5a62'));
  rect(232, 96, 280, 96, hex('#c8ccd0')); for (let x = 232; x <= 280; x += 8) rect(x, 96, x, 100, hex('#9aa0a6'));
  // el pórtico en A
  linea(244, 100, 252, 80, hex('#3a3a42')); linea(262, 100, 252, 80, hex('#3a3a42')); linea(245, 100, 253, 80, hex('#5a5a66')); disco(252, 80, 2, hex('#5a5a66'));
  // la pluma de celosía, del pie a la punta, con los dos cordones, las diagonales y la luz arriba
  const [fx, fy] = H_GRUA.pie, [tx, ty] = H_GRUA.punta, L = Math.hypot(tx - fx, ty - fy), dx = (tx - fx) / L, dy = (ty - fy) / L, nx = -dy, ny = dx;
  const P = (u, s) => [fx + dx * u * L + nx * s * lerp(4.5, 1.6, u), fy + dy * u * L + ny * s * lerp(4.5, 1.6, u)];
  for (let k = 0; k < 22; k++) { const a = P(k / 22, 1), b = P((k + 1) / 22, -1), c = P((k + 1) / 22, 1); linea(a[0], a[1], b[0], b[1], amS); linea(b[0], b[1], c[0], c[1], amS); }
  { const a = P(0, 1), b = P(1, 1), c = P(0, -1), d = P(1, -1); linea(a[0], a[1], b[0], b[1], amL); linea(a[0] + 1, a[1], b[0] + 1, b[1], am); linea(c[0], c[1], d[0], d[1], amS); linea(c[0] + 1, c[1], d[0] + 1, d[1], hex('#8a6414')); }
  rect(fx - 4, fy - 2, fx + 4, fy + 4, hex('#3a3a42'));
  // los tirantes del pórtico a la punta y la cabeza con sus poleas
  linea(252, 80, tx + 2, ty + 1, hex('#4a4a52')); linea(252, 81, tx + 3, ty + 2, hex('#6a6a74'));
  disco(tx, ty, 3.5, hex('#3a3a42')); disco(tx, ty, 2, hex('#8a929c')); pset(tx - 1, ty - 1, hex('#c8d2dc'));
}

function h_excavacion(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  const vida = o.vida !== false, TX = 128, GY = 140, L = 80, sale = h_lim(o.sale ?? 0), yb0 = h_tuboAbajo(o);
  const mueve = sale > 0 ? sale < 0.98 && sale > 0.02 : h_lim(o.tubo ?? 0.5) > 0.02 && h_lim(o.tubo ?? 0.5) < 0.98, vibra = o.vibra ?? mueve;
  const jx = vibra ? (Math.floor(t * 24) % 2 ? 1 : 0) : 0, yb = yb0 + (vibra ? Math.floor(t * 30) % 2 : 0), top = yb - L;
  h_capa(R, 'oak-exc', () => h_excFijo(R));
  // el cielo vivo, los brillos de la bahía y el velero
  h_nubes(R, t, 58, [0, 0, 319, 56], 3);
  h_gaviotas(R, t, 5, 24, 60, null, 2);
  for (let k = 0; k < 30; k++) { const x = Math.round((h(k, 3, 9) * 330 + t * (2 + k % 3)) % 330) - 5, y = 65 + Math.round(h(k, 4, 9) * 15); if (H_MAR_SET.has(R.pget(x, y)) && Math.sin(t * 3 + k) > 0) { pset(x, y, hex('#d8ecf6')); if (H_MAR_SET.has(R.pget(x + 1, y))) pset(x + 1, y, hex('#a8cce2')); } }
  { const bx = Math.round(150 + ((t * 2.5) % 120)), by = 72 + Math.round(Math.sin(t * 1.4)); const en = (x, y) => H_MAR_SET.has(R.pget(x, y)) || H_CIELO.includes(R.pget(x, y));
    for (let j = 0; j < 7; j++) for (let i = 0; i <= j >> 1; i++) if (en(bx + i, by - 7 + j)) pset(bx + i, by - 7 + j, hex('#f6f2ea'));
    for (let i = -3; i <= 4; i++) if (en(bx + i, by)) pset(bx + i, by, i < 0 ? hex('#a84a3a') : hex('#c86a54')); }
  // el humo del generador y el de la grúa
  h_humo(R, 91, 98, t, 5, h_hx(['#6a6a72', '#8a8a94', '#acacb6']), 5);
  h_humo(R, 259, 86, t + 0.3, 6, h_hx(['#3a3a42', '#5a5a64', '#8a8a94']), vibra ? 9 : 5);
  // la gente pequeña de fondo: dos que pasan junto a la valla, uno que cava junto al montón, otro que mira el generador
  if (vida) {
    const a = (t * 7) % 360 - 20; if (a < 96 || a > 236) h_obrero(R, a, 112, t, 0, { anda: 1 });
    const b = 340 - (t * 5 + 120) % 360; if (b < 100 || b > 232) h_obrero(R, b, 116, t, 1, { anda: -1 });
    h_obrero(R, 144, 134, t, 2, { pala: true, dir: 1 });
    h_obrero(R, 102, 131, t, 1, { dir: -1 });
  }
  // la miniexcavadora junto al montón: el brazo carga y vuelca
  { const x = 176, s = 128, f = 0.5 + 0.5 * Math.sin(t * 1.3), ex = hex('#e8c040'), exS = hex('#b8901c');
    rect(x - 7, s - 3, x + 7, s, hex('#2a2a32')); for (let i = x - 6; i <= x + 6; i += 3) pset(i + Math.floor(t * 6) % 3 * 0, s - 1, hex('#5a5a66'));
    rect(x - 5, s - 10, x + 4, s - 4, ex); rect(x - 5, s - 5, x + 4, s - 4, exS); rect(x - 4, s - 14, x - 0, s - 10, hex('#2a3440')); pset(x - 3, s - 13, hex('#8ac0e0')); rect(x - 5, s - 15, x + 1, s - 15, ex);
    const ax = x - 6 - Math.round(f * 4), ay = s - 16 + Math.round(f * 3), bx2 = x - 14 + Math.round(f * 2), by2 = s - 6 - Math.round((1 - f) * 8);
    linea(x - 4, s - 8, ax, ay, exS); linea(x - 4, s - 9, ax, ay - 1, ex); linea(ax, ay, bx2, by2, exS);
    poligono([[bx2 - 2, by2 - 1], [bx2 + 2, by2 - 1], [bx2 + 1, by2 + 3], [bx2 - 2, by2 + 2]], hex('#4a4a52'));
    if (f < 0.25) for (let k = 0; k < 3; k++) pset(bx2 - 1 + k, by2 + 4 + Math.floor((t * 8 + k) % 4), hex('#6a5038')); }
  // la grúa viva: el operador en la cabina, el destello del cristal y la baliza naranja
  { const cab = Math.round(Math.sin(t * 0.8)); disco(220 + cab, 106, 2.4, hex('#e8b890')); rect(218 + cab, 103, 222 + cab, 104, hex('#f6f2ea')); rect(218 + cab, 109, 222 + cab, 112, hex('#e8783a'));
    const g = ((t * 0.35) % 1) * 40 - 8; for (let y = 97; y < 112; y++) { const x = Math.round(206 + g + (112 - y) * 0.5); if (x > 205 && x < 225 && x !== 215) pset(x, y, hex('#d8ecf6')); }
    const on = Math.floor(t * 3) % 3 === 0; disco(240, 97, 1.6, on ? hex('#ffb040') : hex('#a85a1c')); if (on) { pset(237, 97, hex('#ffd890')); pset(243, 97, hex('#ffd890')); pset(240, 94, hex('#ffd890')); } }
  // el cable de la punta al vibrador
  const [px, py] = H_GRUA.punta, hy = top - 14;
  linea(px, py + 3, TX + jx, hy, hex('#2a2a30')); if (hy - py > 8) linea(px + 1, py + 3, TX + 1 + jx, hy, hex('#5a5a62'));
  disco(TX + jx, hy - 3, 2.5, hex('#3a3a42')); pset(TX + jx, hy - 4, hex('#8a929c'));
  // las mangueras hidráulicas que cuelgan del vibrador al suelo
  for (let k = 0; k < 2; k++) { let ax = TX - 16 + jx - k * 2, ay = hy + 6; for (let i = 1; i <= 16; i++) { const u = i / 16, x = Math.round(lerp(TX - 16 - k * 2, 112 + k * 2, u) - Math.sin(u * Math.PI) * 6) + jx * (1 - u), y = Math.round(lerp(hy + 6, 137, u) + Math.sin(u * Math.PI) * 4); linea(ax, ay, x, y, hex('#1e1e24')); ax = x; ay = y; } }
  // el tubo de acero: de arriba hasta el suelo (lo de abajo está dentro de la tierra)
  const x0 = TX - 14 + jx, x1 = TX + 14 + jx, fin = Math.min(yb, GY - 1), barro = sale > 0 ? GY - (212 - yb) : 999;
  for (let y = top; y <= fin; y++) for (let x = x0; x <= x1; x++) {
    const u = (x - x0) / 28; let c = u < 0.12 ? hex('#5e6a76') : u < 0.3 ? hex('#8a96a2') : u < 0.42 ? hex('#c8d2dc') : u < 0.75 ? hex('#8a96a2') : u < 0.9 ? hex('#6e7a86') : hex('#4e5a66');
    const rel = y - top; if (rel % 20 === 19) c = hex('#4e5a66'); else if (rel % 20 === 0 && rel > 0) c = hex('#aab6c2');
    if (h(x, rel >> 2, 61) > 0.93 && u > 0.1) c = hex('#9a5a34');
    if (sale > 0 && y >= barro + Math.round(h(x, 1, 64) * 4)) { c = u < 0.12 ? hex('#3e2e1e') : u < 0.3 ? hex('#5e4a34') : u < 0.42 ? hex('#8a7456') : u < 0.75 ? hex('#5e4a34') : u < 0.9 ? hex('#4e3c2a') : hex('#3a2c1e'); if (h(x >> 1, rel >> 2, 62) > 0.86) c = hex('#2e2216');
      if (h(x, 0, 65) > 0.78 && ((y - Math.floor(t * 18) + x * 7) % 26 + 26) % 26 < 7) c = u > 0.25 && u < 0.45 ? hex('#c8e2f2') : hex('#7aa0b4'); }
    pset(x, y, c);
  }
  rect(x0, top, x1, top, hex('#c8d2dc'));
  // la boca de abajo, abierta y vacía, cuando el tubo está fuera; el agua y el barro que chorrean
  if (sale > 0 && yb < GY - 1) {
    for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i * i) / 196 + (j * j) / 9 <= 1) pset(TX + jx + i, yb + j, (i * i) / 196 + (j * j) / 9 > 0.6 ? hex('#4e5a66') : j < 0 ? hex('#0e1014') : hex('#1a1c20'));
    for (let k = 0; k < 9; k++) { const x = TX - 12 + jx + Math.round(h(k, 1, 63) * 24), v = 40 + h(k, 2, 63) * 30, y = yb + 3 + ((t * v + h(k, 3, 63) * 40) % Math.max(4, GY - yb - 2)); if (y < GY) { pset(x, Math.round(y), hex('#a8d0ea')); pset(x, Math.round(y) - 1, hex('#6aa0c8')); } }
    for (let k = 0; k < 4; k++) { const f = (t * 1.5 + k * 0.25) % 1, x = TX - 10 + k * 7 + jx; pset(x - Math.round(f * 3), GY - 1 - Math.round(Math.sin(f * Math.PI) * 3), hex('#c8e2f2')); pset(x + Math.round(f * 3), GY - 1 - Math.round(Math.sin(f * Math.PI) * 3), hex('#c8e2f2')); }
  }
  // el vibrador amarillo que agarra el tubo, con los pesos y las mordazas; tiembla y suelta rayitas
  { const vx = TX + jx, am = hex('#e8b830'), amS = hex('#b8861c'), amL = hex('#f6d870');
    rect(vx - 18, hy, vx + 18, top + 2, am); rect(vx - 18, hy, vx + 18, hy, amL); rect(vx - 18, top, vx + 18, top + 2, amS); rect(vx + 16, hy, vx + 18, top + 2, amS);
    rect(vx - 12, hy + 3, vx - 4, hy + 9, hex('#3a3a42')); rect(vx + 4, hy + 3, vx + 12, hy + 9, hex('#3a3a42')); disco(vx - 8, hy + 6, 2, hex('#5a5a66')); disco(vx + 8, hy + 6, 2, hex('#5a5a66'));
    for (let x = vx - 18; x <= vx + 18; x++) pset(x, top - 2, ((x >> 1) & 1) ? C.k : hex('#e8c040'));
    rect(vx - 16, top + 2, vx - 13, top + 7, hex('#3a3a42')); rect(vx + 13, top + 2, vx + 16, top + 7, hex('#3a3a42'));
    if (vibra) for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const x = vx + s * (21 + k * 2); if ((Math.floor(t * 12) + k) % 2) linea(x, hy + 2 + k, x, top - 1 - k, hex('#f6f2ea')); } }
  // el brocal de acero por delante del tubo y el barro que salta al clavar
  for (let i = -20; i <= 20; i++) { const y = Math.round(140 + Math.sqrt(Math.max(0, 1 - (i * i) / 400)) * 5); pset(128 + i, y, hex('#8a96a2')); pset(128 + i, y - 1, hex('#c8d2dc')); pset(128 + i, y + 1, hex('#3a3a42')); }
  if (vibra && sale === 0) for (let k = 0; k < 8; k++) { const f = (t * 2.2 + k / 8) % 1, sx = k % 2 ? 1 : -1, x = TX + sx * (14 + f * 10 + k), y = GY - Math.sin(f * Math.PI) * (5 + k % 3 * 2); pset(Math.round(x), Math.round(y), hex('#5a4630')); }
  // las ondas en los charcos y las gotas que caen en ellos
  for (const [cx, cy, rx, k] of [[60, 164, 15, 0], [176, 170, 11, 1], [30, 150, 9, 2]]) { const f = (t * 0.7 + k * 0.37) % 1, r = 1 + f * (rx - 3); for (let a = 0; a < 6.28; a += 0.35) { const x = Math.round(cx - 4 + k * 3 + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.25); if (Math.abs(x - cx) < rx - 2 && f < 0.85) pset(x, y, hex('#d8ecf6')); } }
  return { ...H_OAK.excavacion, abajo: yb, arriba: top, vibrador: [TX + jx, hy] };
}

function h_calzFijo(R, e65, avance) {
  const { rect, pset, linea, disco, poligono } = R;
  h_cieloFijo(R, 0, 70);
  // la otra orilla de la bahía, lejos
  for (let x = 40; x < 260; x++) { const y0 = 64 + Math.round(Math.sin(x * 0.04) * 2 + Math.sin(x * 0.11) * 1); for (let y = y0; y < 71; y++) pset(x, y, y === y0 ? hex('#8aa6b0') : (x + y) % 3 === 0 ? hex('#6e8c96') : hex('#7896a0')); }
  // el agua de detrás, con vetas
  for (let y = 70; y < 150; y++) for (let x = 0; x < 320; x++) { const u = Math.min(1, (y - 70) / 46); let c = H_MAR[Math.max(0, Math.min(3, Math.floor(u * 2.6 + (h_umbral(x, y) - 0.5) * 0.7)))]; if (h(x >> 3, y, 113) > 0.94) c = hex('#8ab8d4'); pset(x, y, c); }
  // la costa de la izquierda: el talud de hierba con abetos y la casa de madera
  poligono([[0, 66], [22, 64], [48, 80], [58, 116], [62, 144], [0, 144]], (x, y) => (h(x >> 1, y >> 1, 114) > 0.75 ? hex('#4a7a3a') : y < 84 ? hex('#6a9a4a') : hex('#5a8a42')));
  for (let k = 0; k < 4; k++) h_abeto(R, 4 + k * 10, 70 + k * 2, 22 + k * 3, k + 40);
  { const x = 30, b = 84; rect(x - 9, b - 10, x + 9, b, e65 ? hex('#f0ece0') : hex('#d8e4ea')); for (let y = b - 9; y < b; y += 2) rect(x - 9, y, x + 9, y, e65 ? hex('#d0ccc0') : hex('#b8c8d0'));
    poligono([[x - 11, b - 10], [x, b - 17], [x + 11, b - 10]], hex('#5a3a2a')); linea(x - 11, b - 10, x, b - 17, hex('#7a5a40'));
    rect(x - 6, b - 7, x - 3, b - 4, hex('#3a5a7a')); rect(x + 3, b - 7, x + 6, b - 4, hex('#3a5a7a')); rect(x - 1, b - 6, x + 1, b, hex('#7a3a2a')); rect(x + 6, b - 20, x + 8, b - 14, hex('#8a6a5a')); }
  // la isla de la derecha: robles y abetos sobre la orilla
  poligono([[244, 116], [254, 96], [276, 86], [320, 82], [320, 144], [240, 144]], (x, y) => (h(x >> 1, y >> 1, 115) > 0.7 ? hex('#3e6a34') : hex('#4e7a3c')));
  if (!e65) { // la grúa de hoy asoma por encima de los robles, con su baliza
    const am = hex('#d8b040'); linea(300, 100, 264, 52, am); linea(303, 100, 266, 52, am); for (let k = 0; k < 12; k++) { const u = k / 12; linea(lerp(300, 264, u), lerp(100, 52, u), lerp(303, 266, u + 0.083), lerp(100, 52, u + 0.083), hex('#9a7a2a')); }
    linea(265, 52, 265, 76, hex('#3a3a42')); rect(262, 76, 268, 79, hex('#d8b040')); }
  for (const [x, y, r] of [[256, 94, 10], [276, 82, 13], [300, 78, 14], [320, 82, 12], [288, 96, 9], [262, 106, 8]]) h_copa(R, x, y, r, x + 7);
  for (let k = 0; k < 3; k++) h_abeto(R, 268 + k * 20, 110, 22 + k * 4, k + 50);
  for (let x = 246; x < 320; x++) { const y = Math.round(114 - (x - 246) * 0.12 + Math.sin(x * 0.3)); for (let j = 0; j < 3; j++) pset(x, y + j, j ? hex('#c8b890') : hex('#a89870')); }
  // la calzada: el firme de arriba y la escollera de piedras por delante, hasta el agua
  const xf = e65 ? Math.round(lerp(100, 252, avance)) : 262;
  for (let y = 114; y < 122; y++) for (let x = 44; x <= xf + (y - 114); x++) {
    const n = h(x, y, 116); let c;
    if (e65) c = y === 114 ? hex('#a8885a') : (y === 117 || y === 119) && (x % 7) > 1 ? hex('#6e5438') : n > 0.8 ? hex('#7a6044') : hex('#94785a');
    else c = y === 114 ? hex('#c8bea8') : (y === 117 || y === 119) && (x % 9) > 2 ? hex('#8a8272') : n > 0.85 ? hex('#787266') : n > 0.6 ? hex('#aaa290') : hex('#9e9684');
    pset(x, y, c);
  }
  for (let y = 122; y < 146; y++) { const xa = 44 - (y - 122) * 0.5, xb = xf + 8 + (y - 122) * 0.6; for (let x = Math.round(xa); x <= Math.round(xb); x++) pset(x, y, hex('#5a564e')); }
  // las piedras de la escollera: cada una con su luz y su sombra
  for (let k = 0; k < 230; k++) {
    const y = 121 + Math.round(h(k, 1, 117) * 22), xa = 44 - (y - 122) * 0.5, xb = xf + 6 + (y - 122) * 0.6, x = Math.round(xa + h(k, 2, 117) * (xb - xa)), w = 5 + Math.round(h(k, 3, 117) * 5), hh = 3 + Math.round(h(k, 4, 117) * 2);
    const tono = h(k, 5, 117), base = e65 && tono > 0.6 ? h_hx(['#c8ae88', '#9a8262', '#5e4a36']) : tono > 0.5 ? h_hx(['#d0ccc2', '#a09c92', '#5e5a54']) : h_hx(['#bab4a6', '#8e887c', '#54504a']);
    for (let j = 0; j <= hh; j++) for (let i = 0; i <= w; i++) { if ((i === 0 || i === w) && (j === 0 || j === hh)) continue; pset(x + i, y + j, j === 0 || i === 0 ? base[0] : j === hh || i === w ? base[2] : base[1]); }
  }
  // las algas en la parte baja de la escollera (se ven con la bajamar)
  for (let x = 30; x < xf + 22; x++) { const l = Math.round(h(x, 3, 118) * 4); for (let j = 0; j < l; j++) pset(x, 140 - j + Math.round(h(x, 4, 118)), j > 1 ? hex('#7a8a3a') : hex('#4a5a2a')); }
  if (e65) {
    // el talud de tierra del extremo, recién vertido
    poligono([[xf - 2, 114], [xf + 6, 114], [xf + 24, 146], [xf - 4, 146]], (x, y) => (h(x >> 1, y >> 1, 119) > 0.75 ? hex('#6e5438') : (x + y) % 5 === 0 ? hex('#a8885a') : hex('#8a6e4c')));
    // las estacas con banderitas hasta la isla
    for (let x = xf + 30; x < 246; x += 22) { rect(x, 106, x, 128, hex('#c8a87a')); rect(x + 1, 106, x + 4, 108, hex('#e8783a')); }
  } else {
    // los postes de madera del borde de atrás y los postes de la luz con los cables
    for (let x = 48; x < 262; x += 12) { rect(x, 109, x + 1, 114, hex('#8a6a44')); pset(x, 109, hex('#f0ece0')); pset(x + 1, 109, hex('#f0ece0')); }
    const postes = [70, 150, 230];
    for (const x of postes) { rect(x, 64, x + 1, 114, hex('#6a4a2a')); rect(x + 1, 64, x + 1, 114, hex('#4a3018')); rect(x - 5, 67, x + 6, 68, hex('#5a3a20')); pset(x - 4, 66, hex('#c8d8e0')); pset(x + 5, 66, hex('#c8d8e0')); }
    rect(146, 72, 149, 77, hex('#7a8088'));
    for (let p = -1; p < postes.length; p++) { const a = p < 0 ? 0 : postes[p], b = p + 1 < postes.length ? postes[p + 1] : 262; for (const s of [-4, 5]) for (let x = a; x <= b; x++) { const u = (x - a) / Math.max(1, b - a); pset(x, Math.round((s < 0 ? 66 : 68) + Math.sin(u * Math.PI) * 4), hex('#2a2e34')); } }
    // la señal de la entrada (pictograma: la grúa) y el buzón
    rect(56, 100, 56, 114, hex('#7a8088')); rect(51, 94, 61, 101, hex('#2a6a4a')); rect(51, 94, 61, 94, hex('#4a8a6a')); linea(53, 100, 58, 95, hex('#f0ece0')); linea(58, 95, 58, 99, hex('#f0ece0'));
  }
  return xf;
}

// un volquete de perfil (o.epoca '1965': morro redondo; 'hoy': cabina cuadrada), con la caja que bascula (o.bascula 0–1) y la
// carga de piedra (o.carga); dir 1 mira a la derecha; las ruedas giran con x
function h_volquete(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, e65 = o.epoca === '1965', X = (u) => Math.round(x + u * d), S = suelo, { rect, pset, disco, poligono } = R;
  const cab = e65 ? h_hx(['#6a9a7a', '#4a7a5a', '#2e5a40']) : h_hx(['#f0ece0', '#c8c4b8', '#8a867e']), caja = e65 ? h_hx(['#8a8a84', '#6a6a66', '#4a4a48']) : h_hx(['#e8b830', '#c8961c', '#8a6414']);
  const bas = h_lim(o.bascula ?? 0);
  // el chasis y la cabina delante
  rect(Math.min(X(-16), X(14)), S - 7, Math.max(X(-16), X(14)), S - 5, hex('#2a2a30'));
  if (e65) { poligono([[X(6), S - 6], [X(6), S - 17], [X(11), S - 17], [X(12), S - 12], [X(17), S - 11], [X(17), S - 6]], cab[1]); rect(Math.min(X(7), X(10)), S - 16, Math.max(X(7), X(10)), S - 13, hex('#8ac0e0')); rect(Math.min(X(12), X(17)), S - 11, Math.max(X(12), X(17)), S - 11, cab[0]); }
  else { rect(Math.min(X(6), X(17)), S - 19, Math.max(X(6), X(17)), S - 6, cab[1]); rect(Math.min(X(6), X(17)), S - 19, Math.max(X(6), X(17)), S - 19, cab[0]); rect(Math.min(X(10), X(16)), S - 17, Math.max(X(10), X(16)), S - 12, hex('#5a8ab0')); pset(X(15), S - 16, hex('#c8e2f2')); rect(Math.min(X(16), X(17)), S - 9, Math.max(X(16), X(17)), S - 8, hex('#f6e8a0')); pset(X(7), S - 21, Math.floor(t * 3) % 2 ? hex('#ffb040') : hex('#a85a1c')); }
  // la caja, que gira alrededor de su bisagra de atrás
  const hx0 = X(-16), hy0 = S - 8, a = bas * 0.8, pt = (u, v) => [hx0 + (u * Math.cos(a)) * d - 0, hy0 - v - u * Math.sin(a)];
  const P = [pt(0, 0), pt(21, 0), pt(21, 11), pt(0, 11)].map(([px, py]) => [px, py]);
  poligono(P, (xx, yy) => ((xx + yy) % 4 === 0 ? caja[2] : caja[1]));
  { const [ax, ay] = pt(0, 11), [bx, by] = pt(21, 11); R.linea(ax, ay, bx, by, caja[0]); }
  if (o.carga !== false && bas < 0.3) for (let k = 0; k < 8; k++) { const [cx, cy] = pt(2 + k * 2.5, 12 + (k % 3)); disco(cx, cy, 2, k % 2 ? hex('#8a867e') : hex('#a8a49a')); }
  if (bas > 0.3 && o.carga !== false) for (let k = 0; k < 6; k++) { const f = (t * 1.6 + k / 6) % 1; disco(hx0 - d * (2 + f * 5), hy0 + f * 8, 1.5, hex('#8a867e')); }
  // las ruedas con su tapacubos que gira
  for (const u of [-13, -6, 11]) { const wx = X(u), r = 3.5; disco(wx, S - 3, r, hex('#1a1a20')); disco(wx, S - 3, 1.6, hex('#8a929c')); const ga = x * 0.6; pset(Math.round(wx + Math.cos(ga) * 2.6), Math.round(S - 3 + Math.sin(ga) * 2.6), hex('#5a5a62')); }
  // el polvo que levanta
  if (o.anda) for (let k = 0; k < 4; k++) { const f = (t * 2 + k / 4) % 1; pset(Math.round(X(-18) - d * f * 8), Math.round(S - 1 - f * 4), hex('#c8b898')); }
}

// la excavadora de cadenas de 1965 (naranja, con la cabina, el brazo y la cuchara); o.anda (las cadenas se mueven),
// o.cava 0–1 (la postura del brazo); dir 1 mira a la derecha
function h_excavadora65(R, x, suelo, t, o = {}) {
  const d = o.dir ?? 1, X = (u) => Math.round(x + u * d), S = suelo, { rect, pset, linea, disco, poligono } = R;
  const na = hex('#e0901c'), naS = hex('#a8641a'), naL = hex('#f6b84a');
  // las cadenas
  rect(Math.min(X(-17), X(15)), S - 6, Math.max(X(-17), X(15)), S, hex('#2a2a32'));
  for (let u = -16; u <= 14; u += 3) pset(X(u + (o.anda ? Math.floor(t * 8) % 3 : 0)), S, hex('#5a5a66'));
  for (const u of [-13, -5, 3, 11]) disco(X(u), S - 3, 2, hex('#5a5a66'));
  // la casa giratoria, la cabina y el contrapeso
  rect(Math.min(X(-15), X(9)), S - 20, Math.max(X(-15), X(9)), S - 7, na); rect(Math.min(X(-15), X(9)), S - 20, Math.max(X(-15), X(9)), S - 20, naL); rect(Math.min(X(-15), X(9)), S - 8, Math.max(X(-15), X(9)), S - 7, naS);
  rect(Math.min(X(0), X(9)), S - 27, Math.max(X(0), X(9)), S - 20, na); rect(Math.min(X(2), X(8)), S - 26, Math.max(X(2), X(8)), S - 21, hex('#3a4a5a')); pset(X(7), S - 25, hex('#a8d0ea'));
  rect(Math.min(X(-17), X(-14)), S - 18, Math.max(X(-17), X(-14)), S - 9, naS);
  rect(Math.min(X(-8), X(-7)), S - 26, Math.max(X(-8), X(-7)), S - 20, hex('#3a3a40'));
  h_humo(R, X(-7.5), S - 28, t, 4, h_hx(['#2a2a30', '#4a4a54', '#7a7a84']), 4 * -d);
  // el brazo y la cuchara
  const c = o.cava ?? (0.5 + 0.5 * Math.sin(t * 1.4)), bx = X(9), by = S - 16, ex = X(9 + 14 + c * 4), ey = S - 30 + c * 14, kx = X(9 + 24 + c * 2), ky = S - 6 + c * 4;
  linea(bx, by, ex, ey, naS); linea(bx, by - 1, ex, ey - 1, na); linea(bx, by - 2, ex, ey - 2, naL); linea(ex, ey, kx, ky, naS); linea(ex + 1, ey, kx + 1, ky, na);
  poligono([[kx - 3 * d, ky - 2], [kx + 3 * d, ky - 2], [kx + 3 * d, ky + 3], [kx, ky + 4], [kx - 3 * d, ky + 1]], hex('#4a4a52'));
  if (c > 0.6) for (let k = 0; k < 3; k++) pset(kx + k - 1, ky - 3, hex('#8a6e4c'));
}

function h_calzada(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const e65 = String(o.epoca ?? 'hoy') === '1965', av = e65 ? h_lim(o.avance ?? 0.75) : 1, marea = o.marea ?? (0.5 + 0.5 * Math.sin(t * 0.12));
  const yA = Math.round(136 - h_lim(marea) * 6);
  let xf = 0; h_capa(R, 'oak-calz|' + (e65 ? '65|' + av.toFixed(2) : 'hoy'), () => { xf = h_calzFijo(R, e65, av); });
  xf = e65 ? Math.round(lerp(100, 252, av)) : 262;
  h_nubes(R, t, 64, [0, 0, 319, 62], 7);
  h_gaviotas(R, t, 6, 24, 66, null, 4);
  // los brillos del agua de detrás y la barca langostera que cruza despacio
  for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 3, 19) * 330 + t * (2 + k % 4)) % 330) - 5, y = 72 + Math.round(h(k, 4, 19) * 40); if (H_MAR_SET.has(R.pget(x, y)) && Math.sin(t * 2.5 + k * 1.3) > 0.2) { pset(x, y, hex('#d8ecf6')); pset(x + 1, y, hex('#a8cce2')); } }
  { const bx = Math.round(((t * 5 + 60) % 420) - 50), by = 96 + Math.round(Math.sin(t * 1.3)); if (bx > -20 && bx < 330) {
    R.poligono([[bx - 9, by - 2], [bx + 10, by - 2], [bx + 8, by + 2], [bx - 7, by + 2]], (x, y) => (y > by ? hex('#a84a3a') : hex('#f0ece0')));
    rect(bx + 1, by - 7, bx + 6, by - 3, hex('#f0ece0')); rect(bx + 2, by - 6, bx + 5, by - 5, hex('#3a5a7a')); rect(bx - 6, by - 4, bx - 5, by - 3, hex('#e8c040')); linea(bx - 4, by - 9, bx - 4, by - 3, hex('#5a5a62'));
    for (let i = 1; i < 18; i++) if ((i + Math.floor(t * 6)) % 3) pset(bx - 9 - i, by + 2 - (i % 2), hex('#d8ecf6')); } }
  // en 1965: el volquete que trae piedra y la excavadora; hoy: el tráfico
  if (e65) {
    if (o.camion !== false) {
      const per = 16, f = (t % per) / per, ida = f < 0.4, vu = f >= 0.4 && f < 0.6, fx = xf - 30;
      const x = ida ? lerp(-30, fx, f / 0.4) : vu ? fx : lerp(fx, -30, (f - 0.6) / 0.4);
      h_volquete(R, x, 120, t, { epoca: '1965', dir: ida || vu ? 1 : -1, bascula: vu ? Math.sin((f - 0.4) / 0.2 * Math.PI) : 0, carga: ida || vu ? (vu && f > 0.5 ? false : true) : false, anda: !vu });
    }
    if (o.excavadora != null) h_excavadora65(R, o.excavadora, 120, t, { dir: 1, anda: true, cava: 0.15 });
    else h_excavadora65(R, xf - 8, 120, t, { dir: 1 });
    // el capataz pequeño con la bandera en la orilla
    h_obrero(R, 36, 110, t, 0, { casco: hex('#f6f2ea'), dir: 1 }); { const fl = Math.floor(t * 2) % 2; linea(39, 102, 42, 98 + fl, hex('#8a6a44')); rect(42, 97 + fl, 45, 99 + fl, hex('#e84a3a')); }
  } else if (o.camiones !== false) {
    const a = ((t * 18) % 460) - 60; h_volquete(R, a, 120, t, { epoca: 'hoy', dir: 1, anda: true });
    const b = 340 - ((t * 24 + 230) % 460); { const x = Math.round(b), S = 120;
      rect(x - 11, S - 7, x + 11, S - 3, hex('#3a5a8a')); rect(x - 11, S - 7, x + 11, S - 7, hex('#5a7aaa')); rect(x - 10, S - 12, x, S - 7, hex('#3a5a8a')); rect(x - 8, S - 11, x - 2, S - 8, hex('#8ac0e0')); pset(x - 11, S - 5, hex('#f6e8a0')); pset(x + 11, S - 5, hex('#c83a3a'));
      for (const u of [-7, 7]) { disco(x + u, S - 2, 2.6, hex('#1a1a20')); disco(x + u, S - 2, 1, hex('#8a929c')); } }
    // la baliza de la grúa de la isla
    if (Math.floor(t * 2.4) % 3 === 0) { pset(265, 51, hex('#ff8a3a')); pset(264, 51, hex('#ffd890')); pset(266, 51, hex('#ffd890')); }
  }
  // el agua de delante con la marea: el reflejo de la escollera, olas que corren, la espuma contra las piedras
  const B = R.buf;
  for (let y = yA; y < 180; y++) { const u = (y - yA) / (180 - yA), base = u < 0.15 ? 2 : u < 0.5 ? 2 : 3, ref = y < yA + 7, ol = Math.sin(y * 1.7) * 0.5;
    for (let x = 0; x < 320; x++) { let c = H_MAR[base]; if (ref && (x + y) % 2 === 0 && x > 30 && x < xf + 24) c = hex('#2e4e5e');
      const w = Math.sin(x * (0.08 + u * 0.04) + t * (1.2 + u) + y * 0.9 + ol); if (w > 0.94 - u * 0.04) c = hex('#a8cce2'); else if (w > 0.86) c = H_MAR[1]; else if (h_umbral(x, y) > 0.85 && u > 0.6) c = hex('#284e68');
      B[y * 320 + x] = c; } }
  for (let x = 20; x < xf + 26; x++) { const e = Math.sin(x * 0.4 + t * 3) + Math.sin(x * 0.17 - t * 2); if (e > 0.2) pset(x, yA, hex('#f0f6f8')); if (e > 1) pset(x, yA - 1, hex('#d8ecf6')); }
  // la línea mojada sobre el agua, más oscura
  for (let y = yA - 3; y < yA; y++) for (let x = 24; x < xf + 26; x++) { const c = R.pget(x, y); if (!H_MAR_SET.has(c) && y > 106) pset(x, y, h_mez(c, hex('#2a2a26'), 0.35)); }
  // la boya que se mece y las rocas de la orilla de delante con algas
  { const bx = 196, by = yA + 22 + Math.round(Math.sin(t * 1.6) * 1.5); R.poligono([[bx - 3, by], [bx + 3, by], [bx + 2, by - 6], [bx - 2, by - 6]], (x, y) => (y < by - 3 ? hex('#e84a3a') : hex('#f0ece0'))); pset(bx, by - 8, Math.floor(t * 1.5) % 2 ? hex('#ffe08a') : hex('#8a6a2a')); linea(bx - 6, by + 1, bx + 6, by + 1, hex('#d8ecf6')); }
  for (const [cx, cy, r, s] of [[300, 178, 18, 3], [270, 182, 9, 4], [214, 184, 8, 5]]) {
    R.disco(cx, cy, r, (x, y) => { const l = (x - cx) * -0.5 + (y - cy) * -0.8 + (h(x >> 1, y >> 1, s) - 0.5) * 6; return l > 6 ? hex('#8a867e') : l > 0 ? hex('#6a665e') : hex('#46423c'); });
    for (let i = -r; i <= r; i += 2) { const y = Math.round(cy - Math.sqrt(Math.max(0, r * r - i * i))) + 1; pset(cx + i, y, hex('#5a6a2a')); pset(cx + i, y + 1, hex('#7a8a3a')); }
    const e = Math.sin(t * 2 + s); if (e > 0) for (let i = -r; i <= r; i += 1) if ((i + s) % 3) pset(cx + i, cy - r + 4 + Math.round(e * 2), hex('#f0f6f8'));
  }
  // el pantalán flotante de la orilla, delante a la izquierda: tablas, pilotes, nasas de langosta con sus boyas, el bote amarrado
  { const dy = Math.round(Math.sin(t * 1.2) * 0.6), y0 = 150 + dy;
    for (const x of [8, 88]) { rect(x, 132, x + 3, 170, hex('#5a4026')); rect(x, 132, x, 170, hex('#8a6a44')); rect(x - 1, 131, x + 4, 132, hex('#3a2a1a')); for (let y = 160; y < 170; y++) if (y % 3 === 0) pset(x + 1, y, hex('#5a6a2a')); }
    for (let x = 0; x <= 96; x++) for (let y = y0; y <= y0 + 5; y++) pset(x, y, y === y0 ? hex('#c8a87a') : x % 8 === 0 ? hex('#5e4228') : h(x >> 1, y, 142) > 0.8 ? hex('#8a6a44') : hex('#a8804c'));
    rect(0, y0 + 6, 96, y0 + 9, hex('#2e2a26')); for (let x = 0; x <= 96; x += 2) pset(x, y0 + 10, hex('#d8ecf6'));
    for (const [x, k] of [[50, 0], [64, 1], [57, 2]]) { const yb = y0 - (k === 2 ? 9 : 0); rect(x - 6, yb - 8, x + 6, yb - 1, hex('#3a2e24')); for (let yy = yb - 7; yy < yb - 1; yy++) for (let xx = x - 5; xx < x + 6; xx++) pset(xx, yy, (xx + yy) % 2 ? hex('#5a8a6a') : hex('#2a3a30')); rect(x - 6, yb - 8, x + 6, yb - 8, hex('#7aaa8a')); }
    for (const [x, c] of [[74, '#e8c040'], [79, '#c83a3a']]) { rect(x - 1, y0 - 5, x + 1, y0 - 1, hex(c)); pset(x - 1, y0 - 5, hex('#ffffff')); rect(x, y0 - 7, x, y0 - 6, hex('#8a6a44')); }
    const bb = 162 + Math.round(Math.sin(t * 1.5 + 1) * 1.2), bx = 104;
    R.poligono([[bx - 14, bb - 4], [bx + 14, bb - 4], [bx + 10, bb + 2], [bx - 11, bb + 2]], (x, y) => (y === bb - 4 ? hex('#f6f2ea') : y < bb - 1 ? hex('#3a7a9a') : hex('#2a5a74')));
    rect(bx - 9, bb - 5, bx + 9, bb - 5, hex('#8a6a44')); linea(bx - 6, bb - 6, bx + 6, bb - 6, hex('#a8804c')); linea(bx + 13, bb - 4, 92, y0 + 3, hex('#e8e0c8'));
    for (let i = -12; i <= 12; i += 3) pset(bx + i, bb + 3, hex('#5a7e98')); }
  return { ...H_OAK.calzada, agua: yA, fin: xf };
}

function h_casetaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de placas y las juntas
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 32 === 0 || y === 6) ? hex('#b8b4aa') : h(x, y, 121) > 0.8 ? hex('#c8c4ba') : hex('#d6d2c8'));
  rect(0, 12, 319, 13, hex('#8a7a62'));
  rect(184, 2, 260, 7, hex('#e8e8e0')); rect(186, 3, 258, 5, hex('#fafaf0')); rect(184, 7, 260, 7, hex('#a8a89c'));
  // los paneles de madera de la pared, con vetas y juntas, más claros arriba por la luz
  for (let y = 14; y < 148; y++) for (let x = 0; x < 320; x++) {
    const p = x % 14, veta = Math.sin(y * 0.3 + h(Math.floor(x / 14), 1, 122) * 9 + Math.sin(x * 0.7) * 1.5);
    let c = veta > 0.75 ? hex('#a8845c') : veta < -0.85 ? hex('#c8a47a') : hex('#b8946a');
    if (p === 0) c = hex('#7a5a3c'); else if (p === 1) c = hex('#d0ac80');
    if (y > 120 && h_umbral(x, y) < (y - 120) / 60) c = h_mez(c, hex('#5a3e28'), 0.25);
    pset(x, y, c);
  }
  rect(0, 146, 319, 148, hex('#4a3a2a'));
  // la ventana: marco de aluminio, montante, persiana subida arriba y el alféizar
  rect(8, 22, 74, 88, hex('#9aa0a6')); rect(8, 22, 74, 22, hex('#d8dce0')); rect(10, 24, 72, 86, hex('#2a3440'));
  rect(8, 86, 76, 90, hex('#e8e4dc')); rect(8, 90, 76, 90, hex('#a8a49c'));
  // el plano de la isla clavado: el agua con la cuadrícula, la isla, la costa, las chinchetas y la cruz del pozo
  rect(83, 23, 139, 75, hex('#5a4a3a'));
  for (let y = 22; y < 74; y++) for (let x = 82; x < 138; x++) pset(x, y, ((x - 82) % 9 === 0 || (y - 22) % 9 === 0) ? hex('#7ab0cc') : h(x, y, 123) > 0.9 ? hex('#a8d0e2') : hex('#9cc8de'));
  poligono([[82, 22], [138, 22], [138, 30], [120, 28], [100, 31], [82, 34]], hex('#c8d8a0'));
  poligono([[94, 54], [102, 44], [114, 42], [122, 46], [130, 42], [134, 50], [128, 60], [116, 62], [104, 64], [96, 60]], (x, y) => (h(x >> 1, y >> 1, 124) > 0.6 ? hex('#7aa05a') : hex('#8ab86a')));
  for (let i = 0; i < 40; i++) { const a = i / 40 * 6.28; pset(Math.round(114 + Math.cos(a) * 19), Math.round(53 + Math.sin(a) * 10), hex('#e8dcb0')); }
  linea(100, 31, 98, 48, hex('#8a6a44')); linea(101, 31, 99, 48, hex('#8a6a44'));
  linea(115, 47, 119, 51, hex('#c83a3a')); linea(119, 47, 115, 51, hex('#c83a3a'));
  for (let k = 0; k < 8; k++) pset(104 + k * 2, 56 - (k % 2), hex('#c83a3a'));
  h_cifras(R, '1', 84, 67, hex('#2a4a6a')); h_cifras(R, '2', 93, 67, hex('#2a4a6a')); h_cifras(R, '3', 102, 67, hex('#2a4a6a'));
  for (const [x, y, c] of [[84, 24, '#c83a3a'], [136, 24, '#e8c040'], [84, 72, '#3a8a5a'], [136, 72, '#c83a3a'], [126, 44, '#e8c040']]) { disco(x, y, 1.5, hex(c)); pset(x - 1, y - 1, hex('#ffffff')); }
  poligono([[130, 74], [138, 66], [138, 74]], hex('#d8ceb4'));
  // la pantalla grande colgada: marco, soporte y la luz de encendido
  rect(186, 14, 198, 20, hex('#3a3a42'));
  rect(146, 20, 238, 89, hex('#16181e')); rect(146, 20, 238, 20, hex('#3a3c44')); rect(148, 88, 236, 88, hex('#2a2c34'));
  // el reloj de pared
  disco(258, 32, 9, hex('#2a2a30')); disco(258, 32, 8, hex('#f6f2ea')); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.28; pset(Math.round(258 + Math.cos(a) * 6), Math.round(32 + Math.sin(a) * 6), k % 3 ? hex('#8a8a96') : C.k); }
  // los ganchos con cascos y chalecos
  rect(246, 62, 314, 63, hex('#6a5a48')); rect(246, 62, 314, 62, hex('#8a7a62'));
  for (const [x, c, cS] of [[256, '#f6f2ea', '#c8c4b8'], [276, '#e8783a', '#b8561c'], [296, '#e8c040', '#b8901c']]) {
    rect(x, 63, x, 65, hex('#3a3a40'));
    for (let j = -6; j <= 0; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36) pset(x + i, 70 + j, i < -1 ? hex(c) : hex(cS)); rect(x - 7, 70, x + 7, 71, hex(cS)); pset(x - 3, 66, hex('#ffffff'));
  }
  for (const x of [266, 286]) { rect(x, 63, x, 66, hex('#3a3a40')); poligono([[x - 7, 68], [x + 7, 68], [x + 8, 98], [x - 8, 98]], (xx, yy) => (Math.abs(yy - 86) < 2 || Math.abs(yy - 92) < 1 ? hex('#d8dce0') : Math.abs(xx - x) < 2 && yy < 86 ? hex('#8a5a3a') : xx > x + 3 ? hex('#c85a24') : hex('#e8783a'))); rect(x - 2, 68, x + 2, 76, hex('#8a6a4a')); }
  // la fuente de agua con su garrafa azul
  rect(16, 104, 32, 148, hex('#e8e8e0')); rect(16, 104, 18, 148, hex('#ffffff')); rect(30, 104, 32, 148, hex('#c8c8c0'));
  rect(20, 112, 28, 116, hex('#3a3a42')); pset(21, 114, hex('#4a8ae8')); pset(26, 114, hex('#e84a3a')); rect(19, 126, 29, 127, hex('#a8a8a0'));
  for (let y = 88; y < 104; y++) { const w = y < 92 ? 3 : 7; for (let x = 24 - w; x <= 24 + w; x++) pset(x, y, x < 24 - w + 2 ? hex('#a8d0f0') : x > 24 + w - 2 ? hex('#4a8ac0') : hex('#7ab0e0')); }
  // el mostrador: el tablero de formica, el frente con cajones y tiradores
  rect(92, 128, 282, 133, hex('#d8d4c8')); rect(92, 128, 282, 128, hex('#f0ece0')); rect(92, 133, 282, 133, hex('#a8a498'));
  for (let y = 134; y < 148; y++) for (let x = 92; x <= 282; x++) pset(x, y, x % 38 === 0 ? hex('#6a5a48') : h(x >> 1, y, 125) > 0.85 ? hex('#9a8c78') : hex('#a89c88'));
  for (let x = 110; x < 282; x += 38) { rect(x, 138, x + 6, 139, hex('#c8ccd0')); rect(x, 139, x + 6, 139, hex('#7a7e84')); }
  // lo que hay sobre el mostrador: papeles, el casco, la radio que carga y el archivador con la cafetera
  rect(150, 126, 176, 127, hex('#f6f2ea')); rect(152, 125, 174, 125, hex('#e8e4d8')); for (let x = 154; x < 172; x += 3) pset(x, 126, hex('#8a8a96')); disco(170, 126, 2, hex('#c8a87a'));
  for (let j = -5; j <= 0; j++) for (let i = -5; i <= 5; i++) if (i * i + j * j <= 25) pset(165 + i, 127 + j, i < -1 ? hex('#f6f2ea') : hex('#c8c4b8')); rect(159, 127, 171, 127, hex('#c8c4b8'));
  rect(264, 120, 274, 127, hex('#2a2a30')); rect(266, 112, 268, 120, hex('#3a3a42')); rect(267, 108, 267, 112, hex('#2a2a30'));
  rect(286, 98, 316, 148, hex('#8a929c')); rect(286, 98, 316, 98, hex('#b8c0c8')); for (const y of [114, 131]) rect(286, y, 316, y, hex('#5e6670'));
  for (const y of [105, 121, 138]) { rect(297, y, 305, y + 1, hex('#c8d0d8')); rect(299, y + 3, 303, y + 4, hex('#f0ece0')); }
  rect(292, 82, 310, 98, hex('#2a2a30')); rect(294, 84, 308, 86, hex('#3a3a42')); rect(296, 88, 306, 97, hex('#4a5058')); disco(301, 93, 3, hex('#3a2418')); rect(304, 85, 305, 85, hex('#e84a3a'));
  // los portátiles (la carcasa; la pantalla se pinta viva) y el monitor del mostrador
  for (const [x0, x1] of [[104, 128], [234, 258]]) { rect(x0, 113, x1, 127, hex('#2a2c34')); rect(x0 - 2, 127, x1 + 2, 130, hex('#8a929c')); rect(x0 - 2, 127, x1 + 2, 127, hex('#b8c0c8')); for (let x = x0 + 2; x < x1; x += 2) pset(x, 129, hex('#5e6670')); }
  rect(196, 100, 226, 122, hex('#1a1c22')); rect(209, 122, 213, 127, hex('#3a3a42')); rect(203, 127, 219, 128, hex('#3a3a42'));
  // las tazas
  rect(134, 121, 139, 127, hex('#f6f2ea')); rect(139, 123, 140, 125, hex('#f6f2ea')); rect(134, 121, 139, 121, hex('#5a3a24'));
  poligono([[188, 120], [194, 120], [193, 127], [189, 127]], hex('#e8e0d0')); rect(188, 119, 194, 119, hex('#3a3a42')); rect(188, 123, 194, 124, hex('#8a6a44'));
  // el suelo de linóleo con baldosas, el brillo de la ventana y las huellas de barro
  for (let y = 148; y < 180; y++) for (let x = 0; x < 320; x++) {
    const u = (y - 148) / 32, fx = Math.round((x - 160) / (0.6 + u * 0.8)) + 1000, ft = Math.floor((y - 148 + 4) / (5 + u * 6));
    let c = (fx % 24 === 0 || (y - 148 + 4) % Math.round(5 + u * 6) === 0) ? hex('#6a6e66') : ((Math.floor(fx / 24) + ft) % 2 ? hex('#8a8e86') : hex('#7e8278'));
    if (h(x, y, 126) > 0.97) c = hex('#a8aca2');
    pset(x, y, c);
  }
  for (let y = 150; y < 166; y++) for (let x = 0; x < 70; x++) { const xx = x + (y - 150) * 1.4; if (xx > 14 && xx < 70 && h_umbral(x, y) < 0.35) pset(x + Math.round((y - 150) * 1.4), y, hex('#a8ac9e')); }
  for (let k = 0; k < 9; k++) { const x = 40 + k * 26 + (k % 2) * 6, y = 160 + (k % 2) * 6 + Math.round(h(k, 1, 127) * 5); rect(x, y, x + 3, y + 1, hex('#5a4630')); rect(x + 1, y + 2, x + 2, y + 3, hex('#5a4630')); }
  rect(0, 148, 319, 148, hex('#5a5e56'));
}

function h_caseta(R, t, o) {
  const { rect, pset, linea, disco } = R;
  h_capa(R, 'oak-caseta', () => h_casetaFijo(R));
  // por la ventana: el cielo con nubes, los robles, la pluma de la grúa con su tubo que sube y baja, y un operario que pasa
  const V = [10, 24, 72, 86];
  for (let y = V[1]; y <= 60; y++) for (let x = V[0]; x <= V[2]; x++) pset(x, y, H_CIELO[Math.max(0, Math.min(5, Math.floor((y - V[1]) / 6 + (h_umbral(x, y) - 0.5) * 0.8)))]);
  R.recorte(V); h_nubes(R, t * 1.2, 44, V, 11); R.recorte(V);
  linea(74, 30, 34, 76, hex('#e8b830')); linea(76, 32, 36, 78, hex('#b8861c')); for (let k = 0; k < 8; k++) linea(74 - k * 5, 30 + k * 5.75, 76 - k * 5 - 3, 32 + k * 5.75 + 3, hex('#b8861c'));
  const ty = 58 + Math.round(Math.sin(t * 0.5) * 6); linea(36, 76, 36, ty, hex('#2a2a30')); rect(31, ty, 41, ty + 4, hex('#e8b830')); for (let y = ty + 5; y <= 86; y++) for (let x = 32; x <= 40; x++) pset(x, y, x < 34 ? hex('#5e6a76') : x < 36 ? hex('#c8d2dc') : hex('#8a96a2'));
  for (const [x, y, r] of [[14, 70, 9], [62, 66, 10], [48, 74, 7]]) h_copa(R, x, y, r, x + 2);
  rect(50, 70, 72, 80, hex('#e8b830')); rect(50, 70, 72, 70, hex('#f6d870')); rect(52, 72, 58, 77, hex('#4a7090')); rect(48, 79, 72, 82, hex('#2a2a32'));
  for (let x = 11; x < 28; x++) for (let y = 70; y < 79; y++) pset(x, y, (x - 11) % 3 === 0 ? hex('#7a3226') : hex('#a84a3a'));
  for (let y = 78; y <= 86; y++) for (let x = V[0]; x <= V[2]; x++) pset(x, y, h(x >> 1, y, 128) > 0.6 ? hex('#7e664a') : hex('#8e7656'));
  { const wx = ((t * 9) % 110) - 20; h_obrero(R, wx, 85, t, 1, { anda: 1 }); }
  h_gaviotas(R, t, 2, 30, 50, V, 9);
  R.recorte(null);
  rect(41, 24, 42, 86, hex('#9aa0a6')); rect(41, 24, 41, 86, hex('#d8dce0'));
  for (let y = 25; y < 36; y += 2) { rect(10, y, 72, y, hex('#e8e4dc')); rect(10, y + 1, 72, y + 1, hex('#b8b4aa')); }
  // la pantalla grande: el escáner del subsuelo (capas que ondulan, ecos en arco, la cavidad y el barrido) y la escala
  const S = [149, 23, 235, 86], bar = o.escaner != null ? h_lim(o.escaner) : (t * 0.12) % 1, xb = Math.round(S[0] + 12 + bar * (S[2] - S[0] - 14));
  const CAP = h_hx(['#14204a', '#1e3468', '#28588a', '#36809a', '#6a9a7a', '#b8a860', '#d89048', '#c0703a', '#9a5632', '#7a4428']);
  for (let y = S[1] + 6; y <= S[3]; y++) for (let x = S[0] + 10; x <= S[2]; x++) {
    const d = (y - S[1] - 6) / (S[3] - S[1] - 6), w = Math.sin(x * 0.12 + t * 0.6) * 0.03 + Math.sin(x * 0.05 - t * 0.3) * 0.04;
    let i = Math.floor((d + w) * 10 + (h(x >> 1, y >> 1, 129) - 0.5) * 0.7); i = Math.max(0, Math.min(9, 9 - i));
    let c = CAP[i]; if (x > xb) c = h_mez(c, hex('#0e1218'), 0.6);
    pset(x, y, c);
  }
  // los ecos en arco (hipérbolas) y la cavidad que destella
  for (const [cx, cy, k] of [[178, 60, 0], [210, 50, 1], [224, 74, 2]]) for (let i = -10; i <= 10; i++) { const x = cx + i, y = Math.round(cy + Math.sqrt(9 + i * i * 0.6) - 3); if (x <= xb) { pset(x, y, hex('#f6f2ea')); if (k === 0) pset(x, y + 2, hex('#c8c4b8')); } }
  if (o.hueco !== false) { const on = 0.5 + 0.5 * Math.sin(t * 4); if (xb > 192) { for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) if (i * i + j * j <= 16 && 196 + i <= xb) pset(196 + i, 66 + j, hex('#0a0a12')); if (on > 0.4) { R.anillo(196, 66, 6 + on * 2, hex('#ffe08a'), 2); } } }
  linea(xb, S[1] + 6, xb, S[3], hex('#f6f2ea')); pset(xb - 1, S[1] + 6, hex('#f6f2ea')); pset(xb + 1, S[1] + 6, hex('#f6f2ea'));
  rect(S[0], S[1], S[2], S[1] + 5, hex('#22262e')); for (const [x, c] of [[152, '#e84a3a'], [156, '#e8c040'], [160, '#5ac85a']]) pset(x, S[1] + 2, hex(c)); rect(166, S[1] + 2, 196, S[1] + 2, hex('#4a5a6a')); rect(204, S[1] + 2, 214, S[1] + 2, hex('#4a5a6a'));
  rect(S[0], S[1] + 6, S[0] + 9, S[3], hex('#14161c')); for (let k = 0; k < 4; k++) { h_cifras(R, String(k * 50), S[0] + 1 - (k ? 0 : 0), S[1] + 8 + k * 15, hex('#8a96a2')); }
  for (let i = 0; i < 12; i++) pset(S[0] + 12 + i, S[1] + 18 - i, hex('#3a4450'));
  pset(236, 87, Math.floor(t * 1.3) % 2 ? hex('#5ac85a') : hex('#2a6a3a'));
  // el reloj de pared con el segundero
  { const sg = Math.floor(t) / 60 * 6.28 - 1.57, mn = (14 + t / 60) / 60 * 6.28 - 1.57; linea(258, 32, Math.round(258 + Math.cos(mn) * 5), Math.round(32 + Math.sin(mn) * 5), C.k); linea(258, 32, 261, 30, C.k); linea(258, 32, Math.round(258 + Math.cos(sg) * 6), Math.round(32 + Math.sin(sg) * 6), hex('#c83a3a')); }
  // el monitor del mostrador: la «ecografía» en abanico, con el barrido que va y viene
  { const cx = 211, cy = 102, a0 = 0.6 + 0.5 * Math.sin(t * 1.1);
    for (let y = 101; y <= 121; y++) for (let x = 197; x <= 225; x++) { const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy), a = Math.atan2(dx, dy); if (Math.abs(a) > 0.75 || r > 19) { pset(x, y, hex('#0a0c10')); continue; }
      const n = h(x, y + Math.floor(t * 8), 130), ban = Math.sin(r * 0.9 - a * 2) > 0.5 ? 0.3 : 0; let v = n * 0.6 + ban + (Math.abs(a - (a0 - 1.1)) < 0.08 ? 0.5 : 0); if (r > 10 && r < 14 && Math.abs(a + 0.1) < 0.25) v = 0.05;
      pset(x, y, v > 0.75 ? hex('#d8f0f0') : v > 0.5 ? hex('#7ab8c0') : v > 0.25 ? hex('#3a6a74') : hex('#1a3038')); } }
  // los portátiles: uno con barras que suben y bajan, otro con un corte de capas que se va dibujando
  for (let k = 0; k < 6; k++) { const a = 2 + Math.round((0.5 + 0.5 * Math.sin(t * 1.3 + k)) * 8); rect(106 + k * 4, 125 - a, 108 + k * 4, 125, k % 2 ? hex('#3aa8a0') : hex('#e8a03a')); }
  rect(106, 115, 126, 115, hex('#4a5a6a'));
  { const n = Math.floor((t * 6) % 22); for (let j = 0; j < 6; j++) for (let i = 0; i <= Math.min(n, 21); i++) pset(236 + i, 115 + j * 2 + Math.round(Math.sin(i * 0.4 + j) * 0.8), CAP[j + 2]); }
  // el vapor de los cafés y de la cafetera
  for (const [x, y, k] of [[136, 120, 0], [191, 118, 1], [301, 81, 2]]) for (let i = 0; i < 4; i++) { const f = (t * 0.6 + i / 4 + k * 0.3) % 1, yy = Math.round(y - f * 12), xx = Math.round(x + Math.sin(f * 7 + k + t) * 1.5); if (h_umbral(xx, yy) > f * 0.8) pset(xx, yy, hex('#f0ece6')); }
  // las luces: la radio que carga, la cafetera y la burbuja de la fuente
  pset(272, 122, Math.floor(t * 0.8) % 2 ? hex('#5ac85a') : hex('#e8a03a'));
  { const f = (t * 0.45) % 1; if (f < 0.5) { const y = Math.round(102 - f * 26); disco(24 + Math.round(Math.sin(f * 9)), y, f < 0.1 ? 1 : 1.5, hex('#d8ecf8')); } }
  // el parpadeo leve del fluorescente
  if (Math.floor(t * 7) % 23 === 0) rect(186, 3, 258, 5, hex('#d8d8c8'));
  return H_OAK.caseta;
}

function h_hallFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared del laboratorio, el zócalo de madera
  for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x >> 1, y >> 1, 131) > 0.82 ? hex('#bcc8c0') : h_umbral(x, y) < y / 140 ? hex('#b8c4bc') : hex('#c8d4cc'));
  rect(0, 58, 319, 61, hex('#8a6a44')); rect(0, 58, 319, 58, hex('#a8885a'));
  // el cuadro de la granja de colonos: marco dorado y la escena pintada
  rect(24, 16, 124, 58, hex('#a87a28')); rect(24, 16, 124, 16, hex('#e8c060')); rect(24, 16, 24, 58, hex('#d8a848')); rect(124, 16, 124, 58, hex('#7a5a1c')); rect(24, 58, 124, 58, hex('#6a4a14'));
  for (let x = 26; x < 123; x += 3) { pset(x, 17, hex('#f6d880')); pset(x, 57, hex('#8a6a1c')); }
  rect(27, 19, 121, 55, hex('#5a4a24'));
  for (let y = 20; y < 55; y++) for (let x = 28; x < 121; x++) { let c = y < 32 ? (h_umbral(x, y) < (y - 20) / 12 ? hex('#d8e0c8') : hex('#a8c0c8')) : y < 34 ? hex('#6a8a9a') : (y + Math.floor(x / 9)) % 3 === 0 ? hex('#7a8a3a') : y > 46 ? hex('#8a7a3a') : hex('#6a8a3a'); pset(x, y, c); }
  for (let x = 28; x < 121; x++) if ((x * 7) % 5 === 0) pset(x, 47 + (x % 3), hex('#5a4a28'));
  rect(60, 34, 80, 44, hex('#8a6a44')); for (let y = 35; y < 44; y += 2) rect(60, y, 80, y, hex('#6a4a2a'));
  poligono([[58, 34], [70, 26], [82, 34]], hex('#4a3a2a')); linea(58, 34, 70, 26, hex('#6a5a3a')); rect(76, 26, 78, 31, hex('#8a8478'));
  rect(68, 38, 71, 44, hex('#3a2a1a')); rect(63, 37, 65, 39, hex('#e8d890')); rect(74, 37, 76, 39, hex('#e8d890'));
  for (let x = 30; x < 58; x += 4) { rect(x, 42, x, 46, hex('#c8b48a')); } rect(30, 43, 58, 43, hex('#c8b48a'));
  for (let x = 84; x < 118; x += 4) rect(x, 42, x, 46, hex('#c8b48a')); rect(84, 43, 118, 43, hex('#c8b48a'));
  h_copa(R, 104, 32, 7, 5, h_hx(['#2a4a24', '#3a5a2a', '#4a6a34', '#5a7a3a', '#6a8a4a'])); rect(103, 37, 105, 44, hex('#4a3a24'));
  rect(44, 48, 49, 50, hex('#f0ece0')); rect(45, 49, 46, 50, hex('#3a2a1a')); rect(44, 51, 44, 52, hex('#3a2a1a')); rect(49, 51, 49, 52, hex('#3a2a1a')); pset(50, 48, hex('#3a2a1a'));
  rect(64, 59, 84, 60, hex('#c8a040'));
  // el estante con frascos y el microscopio (lejos de la zona de Atom)
  rect(148, 44, 268, 46, hex('#8a6a44')); rect(148, 44, 268, 44, hex('#a8885a')); rect(150, 47, 152, 52, hex('#6a4a2a')); rect(264, 47, 266, 52, hex('#6a4a2a'));
  for (let k = 0; k < 7; k++) { const x = 154 + k * 12, al = 8 + (k % 3) * 3, c = h_hx(['#a8d0c0', '#c8b890', '#d0c0d8', '#a8c8e0'])[k % 4]; rect(x, 44 - al, x + 7, 43, c); rect(x, 44 - al, x + 1, 43, hex('#e8f0f0')); rect(x - 1, 43 - al, x + 8, 44 - al, hex('#5a5a62')); }
  rect(242, 38, 258, 43, hex('#2a2a30')); rect(248, 22, 251, 38, hex('#3a3a42')); rect(246, 20, 252, 24, hex('#f0ece0')); linea(252, 26, 256, 34, hex('#3a3a42'));
  // la mesa: el canto de madera, el fieltro con su trama y su pespunte, y la luz de la lámpara en el centro
  rect(0, 62, 319, 69, hex('#a8743c')); rect(0, 62, 319, 62, hex('#c89058')); for (let x = 0; x < 320; x++) if (h(x >> 2, 1, 132) > 0.6) pset(x, 65 + (x % 3), hex('#8a5a2c'));
  for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (x < 10 || x > 309) { pset(x, y, (y + x) % 7 === 0 ? hex('#8a5a2c') : hex('#a8743c')); continue; }
    const l = 1 - Math.hypot((x - 160) / 170, (y - 116) / 90), w = ((x + y) & 1) ? 0.05 : -0.05; const v = l + w + (h_umbral(x, y) - 0.5) * 0.25;
    pset(x, y, v > 0.62 ? hex('#4e5e70') : v > 0.4 ? hex('#445466') : v > 0.15 ? hex('#3a4a5a') : hex('#2e3c4a'));
  }
  for (let x = 14; x < 306; x += 2) { pset(x, 73, hex('#6a7a8a')); pset(x, 175, hex('#6a7a8a')); } for (let y = 74; y < 176; y += 2) { pset(13, y, hex('#6a7a8a')); pset(306, y, hex('#6a7a8a')); }
  // las sombras de los objetos, abajo a la derecha (luz de arriba a la izquierda)
  const sombra = (f) => { for (let y = 70; y < 178; y++) for (let x = 12; x < 308; x++) if (f(x - 2, y - 2) && !f(x, y)) pset(x, y, h_mez(R.pget(x, y), hex('#141c24'), 0.55)); };
  // las monedas: la de plata grande (perfil gastado y canto de puntos), la de cobre con cardenillo, la pequeña
  const monedas = [[78, 104, 11, h_hx(['#e8ecf0', '#b8c0c8', '#8a929c', '#5e6670'])], [112, 132, 8, h_hx(['#e8a870', '#c87a48', '#9a5a34', '#5a8a6a'])], [58, 142, 6, h_hx(['#dcdcd0', '#a8a89c', '#7a7a70', '#5a5a52'])]];
  sombra((x, y) => monedas.some(([cx, cy, r]) => Math.hypot(x + 0.5 - cx, y + 0.5 - cy) <= r));
  for (const [cx, cy, r, c] of monedas) {
    disco(cx, cy, r, (x, y, d) => { const l = -(x - cx) * 0.6 - (y - cy) * 0.8; if (d > 0.86) return l > 0 ? c[0] : c[2]; const n = h(x, y, cx); if (c[3] === hex('#5a8a6a') && n > 0.82) return c[3]; return l > 6.5 ? c[0] : l > -4 ? (n > 0.75 ? c[2] : c[1]) : c[2]; });
    for (let k = 0; k < r * 3; k++) { const a = k / (r * 3) * 6.28; if (k % 2) pset(Math.round(cx + Math.cos(a) * (r - 2.2)), Math.round(cy + Math.sin(a) * (r - 2.2)), c[2]); }
    if (r > 9) { // el perfil del rey, gastado
      poligono([[cx - 2, cy - 6], [cx + 2, cy - 6], [cx + 4, cy - 3], [cx + 3, cy], [cx + 5, cy + 2], [cx + 2, cy + 3], [cx + 3, cy + 6], [cx - 3, cy + 6], [cx - 4, cy + 1], [cx - 4, cy - 3]], (x, y) => ((x + y) % 3 === 0 ? c[1] : c[0]));
      linea(cx - 4, cy - 3, cx - 2, cy - 6, c[3]); linea(cx - 4, cy + 1, cx - 4, cy - 3, c[3]); linea(cx - 3, cy + 6, cx - 4, cy + 1, c[3]); linea(cx + 2, cy - 6, cx + 4, cy - 3, c[3]); linea(cx + 5, cy + 2, cx + 3, cy + 6, c[3]); pset(cx + 1, cy - 2, c[3]); linea(cx - 3, cy - 6, cx + 2, cy - 7, c[2]);
    } else { rect(cx - 2, cy - 1, cx + 2, cy + 1, c[2]); pset(cx - 1, cy - 1, c[0]); }
  }
  // los clavos forjados: la caña cuadrada que se afila, la cabeza irregular, el óxido
  const clavos = [[140, 92, 186, 108], [150, 124, 192, 134], [138, 150, 170, 160]];
  const enClavo = (x, y) => clavos.some(([ax, ay, bx, by], k) => { const L = Math.hypot(bx - ax, by - ay), u = ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (L * L); if (u < -0.05 || u > 1) return false; const d = Math.abs((x - ax) * (by - ay) - (y - ay) * (bx - ax)) / L; return d < (u < 0.04 ? 3.4 : 2.2 * (1 - u * 0.85)); });
  sombra(enClavo);
  for (const [ax, ay, bx, by] of clavos) { const L = Math.hypot(bx - ax, by - ay);
    for (let y = Math.min(ay, by) - 4; y <= Math.max(ay, by) + 4; y++) for (let x = Math.min(ax, bx) - 4; x <= Math.max(ax, bx) + 4; x++) {
      const u = ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (L * L); if (u < -0.05 || u > 1) continue; const sd = ((x - ax) * (by - ay) - (y - ay) * (bx - ax)) / L, d = Math.abs(sd), w = u < 0.04 ? 3.4 : 2.2 * (1 - u * 0.85); if (d >= w) continue;
      const n = h(x, y, 133); pset(x, y, n > 0.8 ? hex('#c8784a') : sd < -w * 0.3 ? hex('#a86a40') : sd > w * 0.4 ? hex('#4a2a18') : n > 0.5 ? hex('#7a4a2a') : hex('#8a5432'));
    } }
  // las dos maderas empapadas, con vetas, agujeros de gusano y su etiqueta atada
  const maderas = [[[206, 88], [250, 84], [262, 92], [258, 108], [214, 112], [204, 102]], [[208, 128], [246, 124], [254, 134], [250, 148], [212, 150], [206, 140]]];
  const dentro = (P, x, y) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  sombra((x, y) => maderas.some((P) => dentro(P, x + 0.5, y + 0.5)));
  maderas.forEach((P, k) => poligono(P, (x, y) => { const v = Math.sin(y * 1.3 + Math.sin(x * 0.15 + k) * 2); const n = h(x, y, 134 + k); return n > 0.96 ? hex('#140c08') : v > 0.7 ? hex('#6a4a30') : v < -0.6 ? hex('#2e1e12') : y < P[0][1] + 3 ? hex('#5a3e26') : hex('#4a3220'); }));
  for (const [[x0, y0, x1, y1], [sx, sy]] of [[[264, 82, 292, 96], [258, 92]], [[258, 130, 288, 144], [252, 138]]]) {
    linea(sx, sy, x0, y0 + 5, hex('#e8e0c8'));
    for (let y = y0 + 2; y <= y1 + 2; y++) for (let x = x0 + 2; x <= x1 + 2; x++) pset(x, y, h_mez(R.pget(x, y), hex('#141c24'), 0.5));
    rect(x0, y0, x1, y1, hex('#f6f2ea')); rect(x0, y0, x1, y0, hex('#ffffff')); rect(x0, y1, x1, y1, hex('#d8d4c8')); disco(x0 + 3, y0 + 3, 1.2, hex('#a8a49c'));
    h_cifras(R, y0 < 100 ? '347' : '348', x0 + 7, y0 + 2, hex('#2a2a30'));
    for (let x = x0 + 7; x < x1 - 2; x++) if (h(x, y0, 135) > 0.4) rect(x, y0 + 9, x, y1 - 2, hex('#2a2a30'));
    rect(x1 - 5, y0 + 2, x1 - 2, y0 + 5, hex('#c83a3a'));
  }
  // la regla de escala, la bolsa de muestras, el cuaderno con el lápiz y los guantes azules
  rect(24, 164, 124, 168, hex('#f0ece0')); for (let x = 24; x <= 124; x++) { if (x % 10 === 4) rect(x, 164, x, 166, C.k); else if (x % 2 === 0) pset(x, 164, C.k); } for (let k = 0; k < 10; k += 2) rect(24 + k * 10, 167, 33 + k * 10, 168, C.k);
  h_cifras(R, '0', 24, 158, hex('#c8d0d8')); h_cifras(R, '10', 116, 158, hex('#c8d0d8'));
  rect(188, 156, 214, 176, hex('#5a6e82')); for (let y = 157; y < 176; y++) for (let x = 189; x < 214; x++) if ((x - y + 300) % 9 === 0) pset(x, y, hex('#8aa0b4')); rect(188, 156, 214, 157, hex('#c83a3a')); linea(196, 166, 206, 170, hex('#8a5432')); rect(195, 165, 197, 167, hex('#7a4a2a'));
  rect(138, 160, 178, 179, hex('#f0ece0')); rect(138, 160, 140, 179, hex('#3a3a42')); for (let y = 164; y < 179; y += 3) rect(143, y, 175, y, hex('#a8c0d8')); for (let x = 144; x < 168; x += 1) if (h(x, 1, 136) > 0.4) pset(x, 166 + (x % 4 === 0 ? 1 : 0), hex('#4a4a52'));
  linea(150, 178, 176, 168, hex('#e8c040')); linea(151, 179, 177, 169, hex('#b8901c')); pset(176, 168, hex('#e8a0a0')); pset(150, 178, hex('#2a2a30'));
  for (const [x, y, d] of [[230, 160, 1], [262, 164, -1]]) {
    poligono([[x, y + 4], [x + 24 * d, y], [x + 30 * d, y + 10], [x + 6 * d, y + 16]], (xx, yy) => (h(xx >> 1, yy >> 1, 137) > 0.7 ? hex('#3a7ac8') : yy < y + 6 ? hex('#7ab0e8') : hex('#5a96d8')));
    for (let k = 0; k < 4; k++) linea(x + 24 * d + k * 2 * d, y + 1 + k * 2, x + 32 * d + k * 2 * d, y - 2 + k * 3, hex('#5a96d8'));
  }
}

function h_hallazgos(R, t, o) {
  const { pset, linea, disco } = R;
  const b = h_capa(R, 'oak-hall', () => h_hallFijo(R));
  // motas de polvo en el cono de la lámpara
  for (let k = 0; k < 14; k++) { const x = Math.round(90 + h(k, 1, 141) * 140 + Math.sin(t * 0.4 + k) * 8), y = Math.round(((h(k, 2, 141) * 110 - t * (1.5 + k % 3)) % 110 + 110) % 110 + 66); if (h_umbral(x, y) < 0.7) pset(x, y, h_mez(R.pget(x, y), hex('#f6f2d8'), 0.55)); }
  // el destello que cruza la moneda de plata y el que salta en la de cobre
  { const f = (t * 0.4) % 1.6; if (f < 1) for (let j = -11; j <= 11; j++) { const x = Math.round(68 + f * 22 + j * 0.5), y = 104 + j; if (Math.hypot(x - 78, y - 104) < 10) { pset(x, y, hex('#ffffff')); pset(x + 1, y, hex('#e8ecf0')); } } }
  if (Math.floor(t * 1.7) % 4 === 0) { pset(109, 128, hex('#fff0d0')); pset(108, 128, hex('#f0c090')); pset(110, 128, hex('#f0c090')); pset(109, 127, hex('#f0c090')); pset(109, 129, hex('#f0c090')); }
  // la lupa: se mece sobre lo que señala y aumenta lo que tapa (lo lee del búfer fijo)
  const lup = o.lupa ?? 'moneda';
  if (lup) {
    const [tx, ty] = lup === 'clavo' ? [163, 100] : lup === 'madera' ? [232, 98] : [78, 104];
    const cx = Math.round(tx + Math.sin(t * 0.9) * 3 + 2), cy = Math.round(ty + Math.cos(t * 0.7) * 2 - 1), r = 15;
    for (let j = 0; j < 22; j++) { const u = j / 22; linea(cx + 11 + u * 22, cy + 11 + u * 20, cx + 13 + u * 22, cy + 10 + u * 20, j < 4 ? hex('#c8d0d8') : j % 5 === 0 ? hex('#3a2418') : hex('#6a3a20')); pset(Math.round(cx + 12 + u * 22) + 2, Math.round(cy + 12 + u * 20) + 2, hex('#1a1c22')); }
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; const sx = Math.round(cx + i / 1.8), sy = Math.round(cy + j / 1.8); let c = b[Math.max(0, Math.min(179, sy)) * 320 + Math.max(0, Math.min(319, sx))]; if (d > r - 4) c = h_mez(c, hex('#a8c8e0'), 0.15); pset(cx + i, cy + j, c); }
    R.anillo(cx + 0.5, cy + 0.5, r + 1, hex('#2a2a30')); R.anillo(cx + 0.5, cy + 0.5, r + 2, hex('#8a929c')); R.anillo(cx + 0.5, cy + 0.5, r + 3, hex('#2a2a30'));
    for (let a = 3.6; a < 4.5; a += 0.08) pset(Math.round(cx + Math.cos(a) * (r - 3)), Math.round(cy + Math.sin(a) * (r - 3)), hex('#ffffff'));
    pset(cx - 6, cy - 9, hex('#ffffff')); pset(cx - 7, cy - 8, hex('#ffffff'));
  }
  return H_OAK.hallazgos;
}
