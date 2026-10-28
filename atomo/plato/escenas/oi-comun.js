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
// Tres encuadres de época; el decorado no pinta a Roosevelt ni a nadie del elenco (lo pone la escena). o.encuadre:
//   'bufete' (por defecto): un despacho de abogados de Nueva York en 1909. Techo de estaño prensado, papel pintado
//     adamascado con su moldura, friso de cuarterones de caoba y suelo de tablas con una alfombra persa. A la izquierda,
//     la ventana alta de guillotina con cortinas de terciopelo y radiador de hierro: por ella se ve la calle (nubes a dos
//     velocidades, la torre lejana, el edificio de ladrillo de enfrente con su chimenea que humea, el tendido del
//     tranvía, un tranvía amarillo y un coche de caballos que pasan, paseantes con sombrero y palomas), todo recortado al
//     cristal. La puerta de cristal esmerilado (con el rótulo insinuado en barras doradas) tras la que pasa a veces una
//     silueta; la carta náutica enmarcada de la costa, dos apliques de gas que titilan, la librería de abogado con
//     puertas de cristal y libros de leyes, el globo terráqueo encima, un ventilador de techo que gira, el reloj de
//     péndulo (las agujas andan), el fichero con el bombín, la luz de la ventana en el suelo con motas de polvo. La mesa
//     de despacho de caoba (de frente, con sus cajoneras y el sillón de cuero detrás) con la lámpara verde de banquero,
//     el teléfono de candelero, la escribanía, el cartapacio, el mapa enrollado, los legajos y la taza que humea.
//     Delante, la palmera en su macetero (izquierda) y el sillón Chester (derecha).
//     o.papel (true): el documento sobre el cartapacio; o.firma (0–1): la rúbrica azul se va escribiendo en él (sin
//     letras: un garabato); o.pluma (true): la pluma en su escribanía (false: no está, la tiene la mano de la escena);
//     o.luz (true): la lámpara de la mesa encendida.
//   'campobello': la casa de veraneo roja de tejado verde (de mansarda, con buhardillas y dos chimeneas) en la isla de
//     Campobello, un día de verano. Cielo tramado con nubes de tres tonos a tres velocidades y gaviotas; al fondo la costa
//     de enfrente con casitas y un campanario, el faro en su roca, el mar con brillos y dos veleros que navegan, la playa
//     con rocas, algas y una barca de remos varada (la espuma va y viene); los abetos detrás de la casa; el porche con
//     columnas blancas, barandilla (abierta en la escalera), la puerta, una mecedora que se mece y una cortina que sale
//     por una ventana abierta; el humo de una chimenea, la bandera de gallardete (sin escudos), el césped con un camino de
//     losas, lupinos que se mecen y una mariposa.
//   'cubierta': la cubierta de un barco en 1939 en una niebla espesa. Tablas de teca mojadas, la borda con candeleros,
//     pasamanos y cadenas, el salvavidas (blanco y rojo, sin letras), el bote en sus pescantes, la caseta de acero con
//     remaches, ojos de buey y puerta estanca, el farol enjaulado que brilla en la niebla, el ventilador de cuello de
//     cisne, la chimenea con su franja negra que echa humo y, de vez en cuando, el vapor de la sirena, los cubos rojos
//     contra incendios, el cabrestante, charcos; una gaviota posada en la borda que gira la cabeza; delante, las bitas
//     con el cabo en ocho y la adujada de cabo; jirones de niebla que pasan por delante de todo. Al otro lado de la borda, el mar gris con olas y un faro que apenas se ve
//     (su destello cada pocos segundos) y un barco escolta lejano. El barco cabecea despacio.
//     o.niebla (0–1, 0.75 por defecto): lo espesa que está la niebla (con 1 el faro casi desaparece); o.giro (0–1): el
//     barco gira, el horizonte se escora y el faro y el escolta se van hacia la izquierda hasta salir del cuadro.
// Devuelve la geometría del encuadre (suelo, dónde van los pies, los muebles y lo que se puede tocar). Lo que va por
// delante de los personajes está en d_rooseveltDelante (exportada), que la escena llama después de sus actores.
export function roosevelt(R, t, o = {}) {
  const enc = o.encuadre ?? 'bufete';
  if (enc === 'campobello') return d_campobello(R, t, o);
  if (enc === 'cubierta') return d_cubierta(R, t, o);
  return d_bufete(R, t, o);
}
// ── E · El gabinete de las teorías ──────────────────────────────────────────────────────────────────────────────────
// Un desván de madera bajo el tejado a dos aguas, lleno de cosas de las teorías del pozo. Todo sin letras. o.encuadre:
//   'desvan' (por defecto): el hastial del fondo de tablas verticales con el ventanuco redondo en el centro (por el
//     cristal: el cielo de la tarde con nubes a dos velocidades, una gaviota y el mar con una islita de robles), la viga
//     de atar con su pendolón, los pares y correas del techo en perspectiva, telarañas y una araña que sube y baja; a la
//     izquierda la librería (lomos de colores, un barco en una botella, un reloj de arena, un globo y rollos de mapas, con
//     una vela encima), el mapa de piratas clavado con chinchetas (la isla, el camino de puntos, la X, la rosa de los
//     vientos; la esquina se mueve con la corriente) y debajo el cofre de hierro con la bandera pirata doblada encima (una
//     moneda brilla en la rendija); a la derecha el catalejo en su trípode apuntando al ventanuco, el yelmo de templario en
//     su soporte (un brillo le recorre la visera) con el escudo de la cruz roja apoyado, y el escritorio con el libro
//     abierto, el tintero con la pluma, una vela sobre libros y encima el retrato de la dama con joyas (el collar
//     destella); el farol de aceite que se mece colgado de la viga, el barril con libros y vela a la izquierda y el timón
//     de barco a la derecha. En el suelo de tablas en perspectiva, iluminado por el haz del ventanuco (con motas de polvo),
//     el agujero redondo de bordes astillados con tierra alrededor, una tabla arrancada y una palanca; en primer término
//     una pila de libros (abajo a la izquierda) y una caja con una pala (abajo a la derecha). o.brillo (true): un destello
//     dorado y tenue que late en el fondo del agujero.
//   'retratos': la pared de la galería de buscadores: seis retratos colgados de clavos con su cordel, cada uno en un marco
//     distinto y con su año en una placa de latón: 1795 (el muchacho, marco de pino), 1803 (casaca y tricornio, óvalo
//     dorado), 1849 (barba y chistera, nogal con rosetas), 1909 (foto sepia con paspartú, canotier y bigote), 1965 (foto
//     en color con borde blanco, gorra y gafas de pasta) y hoy (un marco digital con cable, cuyas dos fotos se turnan);
//     los ojos de todos miran hacia arriba, a su burbuja, y parpadean de vez en cuando. Encima de cada uno, una burbuja de
//     pensamiento vacía que flota (la escena pinta dentro el tesoro soñado); a la derecha, la marca clara de un retrato
//     que falta y un clavo vacío. Tres candelabros de pie entre los retratos (llamas que tiemblan y su luz en la pared),
//     el zócalo de cuarterones, el suelo de tablas, un cordón de terciopelo entre postes de latón (que se mece) y un ratón
//     que cruza a lo largo del zócalo por detrás de los postes. o.burbujas (6): cuántas burbujas se ven, de izquierda a
//     derecha; la parte decimal hace crecer la última (para que vayan apareciendo); false o 0 las quita.
// Devuelve las posiciones útiles: suelo, y en 'desvan' agujero {x, y, rx, ry}, topo [x, y] (donde asoma), ventana,
// cofre, yelmo, mapa, escritorio, retrato, libreria; en 'retratos' retratos [{x, y, año}] y burbujas [{x, y, rx, ry, s}].
export function gabinete(R, t, o = {}) {
  return (o.encuadre ?? 'desvan') === 'retratos' ? e_retratos(R, t, o) : e_desvan(R, t, o);
}
// el topo del gag (un topo de nariz de estrella, el de Nueva Escocia, con su casco de minero y la lámpara): asoma del
// agujero, mira a un lado y a otro olfateando, sube las zarpas, coge algo por encima de la cabeza y se lo lleva abajo.
// x, y: el centro de la boca por donde sale (lo de debajo de y no se pinta; en el desván, gabinete devuelve topo:
// [160, 148]). o.fase 0–1: 0–0,15 sale, 0,15–0,4 olfatea, 0,4–0,5 sube las zarpas, 0,5–0,62 lo sujeta arriba, 0,62–0,8 se
// hunde con ello, después ya no está; con la salida y la bajada saltan terrones. o.fuera (0–1) fija cuánto asoma en vez
// de la fase. o.rasca: se rasca el casco con una zarpa, perplejo. o.mira (−1, 0, 1): hacia dónde mira. o.casco (true).
// Devuelve { mano: [x, y] (donde va lo que sujeta), cabeza: [x, y], fuera }.
export function topo(R, x, y, t, o = {}) {
  const f = o.fase ?? 0.3, ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
  const fuera = o.fuera ?? (f < 0.15 ? ease(cl(f / 0.15)) : f < 0.62 ? 1 : f < 0.8 ? 1 - ease(cl((f - 0.62) / 0.18)) : 0);
  const sube = o.rasca ? 0 : f < 0.4 ? 0 : f < 0.5 ? ease((f - 0.4) / 0.1) : 1;
  const by = Math.round(y + (1 - fuera) * 21 + (fuera >= 1 ? Math.round(Math.sin(t * 2.6) * 0.5) : 0));
  const olfa = !o.rasca && f > 0.15 && f < 0.42, mira = o.mira ?? (olfa ? (Math.sin((f - 0.15) * 40) > 0.3 ? 1 : Math.sin((f - 0.15) * 40) < -0.3 ? -1 : 0) : 0);
  const px = (i, j, c) => { const yy = by + j; if (yy <= y) R.pset(x + i, yy, c); };
  const PE = hex('#5a4a56'), PS = hex('#3c3040'), PL = hex('#7c6c78'), CO = hex('#22182a'), RO = hex('#f0a0b4'), ROS = hex('#c86a86'), UN = hex('#f4f0e6');
  // los terrones que saltan al salir y al hundirse
  for (const [f0, f1] of [[0, 0.2], [0.62, 0.85]]) if (o.fuera == null && f >= f0 && f < f1) { const u = (f - f0) / (f1 - f0);
    for (let k = 0; k < 7; k++) { const vx = (h(k, 1, 500) - 0.5) * 30, vy = 12 + h(k, 2, 500) * 10, xx = Math.round(x + vx * u), yy = Math.round(y - 2 - vy * u + 30 * u * u); if (yy <= y + 1) R.pset(xx, yy, k % 2 ? hex('#5a3e28') : hex('#7a5a3a')); } }
  if (fuera <= 0.02) return { mano: [x, y], cabeza: [x, y], fuera: 0 };
  // el cuerpo de terciopelo, con luz arriba a la izquierda y un pelo moteado
  for (let j = -18; j <= 2; j++) for (let i = -9; i <= 9; i++) {
    const nx = i / 8.2, ny = (j + 8) / 10; const d = nx * nx + ny * ny; if (d > 1) continue;
    const l = -(nx * 0.6 + ny * 0.8); let c = d > 0.86 ? CO : l > 0.35 ? PL : l > -0.3 ? PE : PS;
    if (d <= 0.86 && h(i, j, 501) < 0.16) c = l > 0 ? hex('#8c7c88') : hex('#4a3c4a');
    px(i, j, c);
  }
  // la cara: los ojillos, la nariz de estrella rosa (sus deditos se mueven al olfatear) y la boca
  const mx = mira * 2, ny0 = -8;
  for (let j = -3; j <= 4; j++) for (let i = -4; i <= 5; i++) if ((i - 0.5) ** 2 / 20 + (j - 0.5) ** 2 / 14 < 1) px(mx + i, ny0 + j, j > 2 ? PE : PL);
  // los ojillos (2 × 2, con su brillo; parpadean) y el antifaz más oscuro alrededor
  const cierra = (t * 0.9 + x * 0.1) % 3.1 < 0.12;
  for (const ex of [-4, 3]) { for (let i = -1; i <= 2; i++) px(ex + mx + i, -10, PS);
    if (cierra) { px(ex + mx, -11, hex('#0e0a10')); px(ex + mx + 1, -11, hex('#0e0a10')); }
    else { px(ex + mx, -12, hex('#ffffff')); px(ex + mx + 1, -12, hex('#0e0a10')); px(ex + mx, -11, hex('#0e0a10')); px(ex + mx + 1, -11, hex('#0e0a10')); } }
  const w = olfa && Math.sin(t * 22) > 0 ? 1 : 0;
  px(mx, ny0, RO); px(mx + 1, ny0, RO); px(mx, ny0 + 1, ROS); px(mx + 1, ny0 + 1, ROS);
  for (const [i, j] of [[-1, -1], [2, -1], [-1, 2], [2, 2], [-2, 0], [3, 0], [-2, 1], [3, 1], [0, -2], [1, -2], [0, 3], [1, 3]]) { const e = (j < 0 || j > 1) ? 0 : (i < 0 ? -w : w); px(mx + i + e, ny0 + j, (i + j) % 2 ? RO : ROS); }
  px(mx, ny0, hex('#fff0f4')); px(mx, ny0 + 4, hex('#2a1a24')); px(mx + 1, ny0 + 4, hex('#2a1a24'));
  // el casco de minero con su lámpara (y un hilo de luz)
  if (o.casco !== false) {
    const ty = o.rasca ? Math.round(Math.sin(t * 9)) : 0;
    for (let j = -20; j <= -15; j++) for (let i = -6; i <= 6; i++) { if ((i / 6.4) ** 2 + ((j + 15) / 5.6) ** 2 > 1) continue; px(i + ty, j, i < -2 ? hex('#f8e070') : i > 3 ? hex('#a8801c') : hex('#e8c030')); }
    for (let i = -8; i <= 8; i++) px(i + ty, -15, hex('#a8801c')); px(-7 + ty, -15, hex('#e8c030'));
    px(mx + ty, -18, hex('#5a5a66')); px(mx + ty + 1, -18, hex('#5a5a66')); px(mx + ty, -17, hex('#fff8d0')); px(mx + ty + 1, -17, hex('#fff8d0'));
    if (Math.sin(t * 5) > -0.6) { R.halo(x + mx + ty, by - 17, 6, [hex('#f8e8a8'), hex('#fff8d8')], 0.6); px(mx + ty, -17, hex('#ffffff')); }
  }
  // las zarpas rosas con sus uñas: abajo a los lados, arriba sujetando, o una rascando el casco
  const zarpa = (zx, zy, s) => { for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) + Math.abs(j) < 4) R.pset(zx + i, zy + j, zy + j <= y ? (j > 0 ? ROS : RO) : null); for (let k = -2; k <= 2; k += 2) if (zy - 3 <= y) R.pset(zx + k, zy - 3, UN); if (zy - 3 <= y) { R.pset(zx + s * 3, zy - 2, UN); } };
  const zs = (zx, zy, s) => { if (zy <= y + 2) zarpa(zx, zy, s); };
  let mano = [x, by - 22];
  if (o.rasca) { const rx = Math.round(Math.sin(t * 9) * 2); zs(x + 6 + rx, by - 18, 1); zs(x - 9, by - 4, -1); mano = [x - 9, by - 4]; }
  else { const ly = Math.round(lerp(-4, -22, sube)), lx = Math.round(lerp(9, 5, sube)); zs(x - lx, by + ly, -1); zs(x + lx - 1, by + ly, 1); mano = [x, by + ly - 2]; }
  // la sombra en el borde de la boca
  for (let i = -9; i <= 9; i++) if (Math.abs(i) > 5 || fuera < 1) R.pset(x + i, y, hex('#0e0806'));
  return { mano, cabeza: [x + mx, by - 16], fuera };
}
// ── F · El laboratorio del agua (y el campo de 1878) ──────────────────────────────────────────────────────────────────
// Un laboratorio luminoso de paredes verde menta (ventana al mar, pizarra con dibujos de tiza, estanterías de frascos y
// muestras de roca, la puerta del pasillo) y el campo de la isla en 1878. Devuelve las posiciones útiles. o.encuadre:
//   'mesa' (por defecto): la mesa de laboratorio (tablero negro, x 90–280, pies de la mesa en y 163) con el vaso de zumo
//     y su pajita transparente (el zumo de la pajita a la misma altura que el del vaso, con un cubito que flota y burbujas),
//     el trozo de yeso con su etiqueta (o.yeso false lo quita) y, al lado, el tanque de cristal grande con la isla en
//     corte: el mar a los dos lados (con un barquito de juguete y las burbujas del aireador), la hierba con dos arbolitos,
//     la arcilla arriba, la anhidrita blanca abajo con sus grietas por las que corre el agua, y el pozo en el centro que
//     se llena hasta el nivel del mar (o.nivel 0–1, por defecto 1; o.linea false quita la raya de puntos del nivel). Al
//     fondo: la ventana con la bahía (nubes de tres tonos, gaviotas, un velero, la isla), la pizarra con el vaso y el
//     pozo dibujados con tiza (sin letras), las estanterías (un vaso que hierve en la placa), la bata colgada, el
//     radiador, la puerta con alguien que pasa por el pasillo. Sitio libre: x 40–88 (personaje que señala) y x 284–316
//     (otro personaje delante de la puerta), los dos con los pies en y 163;
//   'tanque': de cerca, el corte del tanque (cristal x 8–238, y 18–145): el mar a la izquierda (algas de juguete, barquito,
//     burbujas), la arena, la arcilla con piedras, raíces y una lombriz, la anhidrita con cuevas que se van disolviendo
//     (o.disuelve 0–1: crecen llenas de agua, con gotas que caen y espuma en el borde que se come la roca), las grietas
//     que unen el mar con las cuevas y el pozo (a la derecha, x 184–198) y o.flechas (true o 0–1: flechitas de agua que
//     corren por las grietas hacia el pozo); o.nivel como en 'mesa' (por defecto 1); a la derecha, en la mesa, la
//     esponja en su plato bajo un cuentagotas que gotea (o.esponja 0–1: se empapa de abajo arriba, se hincha y deja un
//     charco en el plato) y un trozo de yeso; un personaje cabe de pie en x 284–316 con los pies en y 178;
//   'campo1878': el campo arado de la isla en 1878 (surcos en perspectiva, terrones, piedras, rastrojo sin arar a la
//     derecha), la cerca de troncos en zigzag, el bosque de robles y abetos a la izquierda, la granja de madera con su
//     chimenea que humea, la ropa tendida y el granero rojo con su veleta, el mar con una goleta y la costa al fondo; el
//     cielo con nubes a tres velocidades y gaviotas; o.hundido (0–1): en el suelo, delante (centro x 150, y 146), primero
//     se abren grietas y después el agujero se hunde (terrones que caen, polvo, la tierra en capas por dentro y agua al
//     fondo); los bueyes, el arado y la gente los pone la escena (suelo 150).
export function labAgua(R, t, o = {}) {
  if (o.encuadre === 'tanque') return f_labTanque(R, t, o);
  if (o.encuadre === 'campo1878') return f_campo1878(R, t, o);
  return f_labMesa(R, t, o);
}
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

// los colores propios de los tres encuadres de Roosevelt
const d_C = pal({
  // el despacho: estaño del techo, papel adamascado verde oliva, caoba, tablas, alfombra, terciopelo y cuero
  techo: '#c4bca2', techoS: '#aaa288', techoL: '#d6d0b8', pp: '#5e6a46', ppS: '#4c5838', ppL: '#707c54', ppD: '#46502f', ppO: '#7e865a',
  cao: '#6a3420', caoS: '#4a2214', caoL: '#8a4a2c', caoD: '#2e140c', caoV: '#7a3e26',
  par: '#8a5a34', parS: '#6e4426', parL: '#a2703f', parD: '#4a2c18',
  alf: '#8a2a26', alfS: '#6a1c1c', alfA: '#2a3a5e', alfAS: '#1e2a46', alfB: '#c8a060', alfC: '#e0d0a8',
  terc: '#2e5a3e', tercS: '#1e3e2a', tercL: '#4a7a56', cuero: '#2e4a36', cueroL: '#44664c', cueroS: '#1e3224',
  chester: '#6a2a1e', chesterS: '#4a1a12', chesterL: '#8a3e2a',
  tan: '#c8a06a', tanS: '#a07a48', vino: '#7a2a22', verdeL: '#2e4a32', marino: '#2a3458', negroL: '#2c2622',
  ny0: '#6e9ccc', ny1: '#8cb2da', ny2: '#aac6e4', ny3: '#c8dcec', lejos: '#9eacc0', lejosS: '#8a98ae',
  lad: '#8a4a36', ladS: '#6a3426', ladL: '#a85e44', piedra: '#c8b89c', piedraS: '#a8987c', calle: '#6a6862', calleS: '#56544e',
  tranvia: '#d8b040', tranviaS: '#a8862a', tranviaR: '#8a2e22', esmeril: '#c8d4cc', esmerilS: '#aebcb4', esmerilL: '#dfe8e2',
  lampara: '#2e8a4a', lamparaL: '#6ad08a', lamparaS: '#1e5a32', luzCalida: '#f4dca0',
  // Campobello: la casa roja, el tejado verde, la madera blanca, los abetos, el césped y los lupinos
  casa: '#a43c2c', casaS: '#7e2a20', casaL: '#c25038', casaD: '#5e1e16', tej: '#3e6e4c', tejS: '#2c5038', tejL: '#5a8e64', tejD: '#1e3a28',
  blancoC: '#ece8dc', blancoS: '#c4c0b4', abeto: '#2e5a3e', abetoS: '#1e4030', abetoL: '#46765a', abetoD: '#142e22',
  cesped: '#5e9a42', cespedS: '#4a7e34', cespedL: '#7cb456', cespedD: '#3a6a2a', lupino: '#7a5aa8', lupinoL: '#a888d0', lupinoR: '#c86a9a',
  cieloC0: '#5a9ad8', cieloC1: '#7ab0e2', cieloC2: '#9cc6ea', cieloC3: '#c2dcf0', costa: '#6a86a8', costaS: '#58729a', costaL: '#8aa0bc',
  marC: '#3a72a0', marCS: '#2c5c88', marCL: '#5a92bc', marCB: '#a8d0ea', roca: '#7a7468', rocaS: '#5a5448', rocaL: '#9a9488',
  // la cubierta: niebla, acero gris, teca mojada, chimenea, cabos y el mar gris
  niebla: '#b4bcc0', nieblaS: '#98a2a8', nieblaL: '#ccd4d6', nieblaD: '#7e8a92',
  acero: '#7c868e', aceroS: '#5e6870', aceroL: '#9aa4ac', aceroD: '#3e464e', teca: '#9a7e5a', tecaS: '#7a6244', tecaL: '#b4986e', tecaD: '#3a2e22',
  cabo: '#c8b288', caboS: '#9a845e', caboL: '#e0cca4', marG: '#4e5e68', marGS: '#3e4c56', marGL: '#6e7e88', clave: '#ff00fe',
});

const d_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el color de una rampa en (x, y) para un valor v continuo (0 … n − 1), con tramado ordenado de 4 × 4
function d_tono(cols, v, x, y) {
  const n = cols.length - 1; v = Math.max(0, Math.min(n, v)); const i = Math.min(n - 1, Math.floor(v));
  return (v - i) * 16 > d_BAY[(y & 3) * 4 + (x & 3)] + 0.5 ? cols[i + 1] : cols[i];
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function d_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// los búferes de lo fijo: cada uno se pinta una vez y luego se copia en cada fotograma
const d_capas = new Map();

function d_capa(R, clave, dibuja) {
  let b = d_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_capas.set(clave, b); }
  return b;
}

// ruido suave (rejilla de 8 px interpolada), para la niebla y las vetas largas
function d_ruido(x, y, k) {
  const gx = x / 8, gy = y / 8, i = Math.floor(gx), j = Math.floor(gy), s = (a) => a * a * (3 - 2 * a), u = s(gx - i), v = s(gy - j);
  return lerp(lerp(h(i, j, k), h(i + 1, j, k), u), lerp(h(i, j + 1, k), h(i + 1, j + 1, k), u), v);
}

// una nube de tres tonos (luz arriba, cuerpo, sombra abajo) pintada solo donde se=(color) dice que hay cielo
function d_nube(R, cx, cy, w, cols, se = null) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.42, 1.2, r * 0.75], [-w * 0.12, -0.6, r], [w * 0.2, -1.4, r * 0.9], [w * 0.45, 0.8, r * 0.7]];
  const x0 = Math.floor(cx - w), x1 = Math.ceil(cx + w), y0 = Math.floor(cy - r * 2), y1 = Math.ceil(cy + r * 1.6);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let dmin = 9, lum = 0;
    for (const [dx, dy, rr] of B) { const d = Math.hypot(x - cx - dx, (y - cy - dy) * 1.25) / rr; if (d < dmin) { dmin = d; lum = (cy + dy - y) / rr; } }
    if (y > cy + r * 0.55) continue;   // la base plana de los cúmulos
    if (dmin > 1) continue;
    if (se && !se(R.pget(x, y), x, y)) continue;
    R.pset(x, y, y > cy + r * 0.25 ? cols[2] : lum > 0.35 || (lum > 0.1 && ((x + y) & 1)) ? cols[0] : cols[1]);
  }
}

// un pájaro de dos píxeles de ala que aletea
function d_ave(R, x, y, t, c, k = 0) {
  x = Math.round(x); y = Math.round(y); const a = Math.sin(t * 11 + k * 2) > 0 ? 1 : 0;
  R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - a * 2 + 1 - a, c); R.pset(x + 2, y - a * 2 + 1 - a, c);
}

// lo fijo del despacho (en su búfer): techo, papel, friso, suelo, alfombra, ventana, puerta, librería, reloj, mesa…
function d_bufeteFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = d_C;
  // el techo de estaño prensado (cuarterones de 12 px con su rombo), en tonos suaves: por aquí pasa la barra del año
  for (let y = 0; y <= 14; y++) for (let x = 0; x < 320; x++) { const i = (x + 3) % 12, j = (y + 9) % 12, d = Math.abs(i - 6) + Math.abs(j - 6);
    pset(x, y, i === 0 || j === 0 ? K.techoS : i === 1 || j === 1 ? K.techoL : d === 3 ? K.techoS : d === 2 ? K.techoL : K.techo); }
  // la cornisa con sus dentículos
  rect(0, 15, 319, 15, K.caoS); rect(0, 16, 319, 16, K.caoL); rect(0, 17, 319, 19, K.cao); for (let x = 0; x < 320; x += 4) rect(x, 18, x + 1, 19, K.caoS); rect(0, 20, 319, 20, K.caoD);
  // el papel adamascado: raya fina, flor en rombo a tresbolillo, motas; más claro junto a la ventana, más oscuro arriba
  for (let y = 21; y <= 83; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 21) / 18), cy = (y - 21) % 18, dx = Math.abs(((x + (fila & 1 ? 8 : 0)) % 16) - 8), dy = Math.abs(cy - 9), r = dx + dy * 0.75;
    const v = 1.55 - Math.abs(x - 52) / 210 - (y < 32 ? (32 - y) * 0.05 : 0) - (y > 76 ? (y - 76) * 0.06 : 0);
    let c = d_tono([K.ppS, K.pp, K.ppL], v, x, y);
    if (r > 3.3 && r < 4.3) c = v > 0.9 ? K.ppD : K.ppS; else if ((dx === 0 && dy < 3) || (dy === 0 && dx < 2)) c = v > 0.9 ? K.ppO : K.pp; else if (x % 16 === 0) c = K.ppS;
    if (h(x, y, 400) < 0.04) c = K.ppD;
    pset(x, y, c);
  }
  rect(0, 30, 319, 30, K.caoL); rect(0, 31, 319, 31, K.cao); rect(0, 32, 319, 32, K.caoD);   // la moldura de colgar cuadros
  // el friso de cuarterones: barandilla, paneles en relieve con su bisel y su veta, el rodapié
  rect(0, 84, 319, 84, K.caoL); rect(0, 85, 319, 86, K.cao); rect(0, 87, 319, 87, K.caoD); rect(0, 88, 319, 111, K.caoS);
  for (let x0 = 2; x0 < 320; x0 += 34) { const x1 = Math.min(319, x0 + 29);
    rect(x0, 90, x1, 109, K.caoD); rect(x0 + 1, 91, x1 - 1, 108, K.cao); rect(x0 + 1, 91, x1 - 1, 91, K.caoL); rect(x0 + 1, 91, x0 + 1, 108, K.caoL);
    rect(x0 + 2, 108, x1 - 1, 108, K.caoS); rect(x1 - 1, 92, x1 - 1, 108, K.caoS);
    rect(x0 + 4, 94, x1 - 4, 105, K.caoV); rect(x0 + 4, 94, x1 - 4, 94, K.caoS); rect(x0 + 4, 105, x1 - 4, 105, K.caoL);
    for (let g = 0; g < 4; g++) { const gx = x0 + 7 + g * 5; for (let y = 96; y < 104; y++) if (h(gx, y, 401) < 0.75) pset(gx + Math.round(Math.sin(y * 0.7 + g + x0) * 1.2), y, g % 2 ? K.cao : K.caoS); } }
  rect(0, 112, 319, 112, K.caoL); rect(0, 113, 319, 118, K.cao); rect(0, 114, 319, 114, K.caoV); rect(0, 119, 319, 119, K.caoD);
  for (let x = 0; x < 320; x++) if (h(x, 1, 402) < 0.3) pset(x, 115 + (x % 3), K.caoS);
  // el suelo de tablas: filas que crecen hacia delante, juntas al tresbolillo, vetas; más oscuro junto a la pared
  let y0 = 120, alto = 2, r = 0;
  while (y0 < 180) { const y1 = Math.min(179, Math.round(y0 + alto) - 1), L = 26 + r * 7, off = Math.round(h(r, 1, 403) * L);
    for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) {
      const n = Math.floor((x + off) / L), tono = h(n, r, 404), fin = (x + off) % L === 0;
      let c = tono < 0.3 ? K.parS : tono > 0.8 ? K.parL : K.par;
      if (y === y1 || fin) c = K.parD; else if (h(x >> 2, y, 405 + n) < 0.13) c = c === K.parS ? K.parD : K.parS; else if (y === y0 && tono > 0.5) c = K.parL;
      if (r < 3 && ((x + y) & 1)) c = d_mezcla(c, K.parD, 0.4);
      pset(x, y, c); }
    y0 = y1 + 1; alto = Math.min(10, alto + 0.8); r++; }
  // la luz de la ventana tendida en el suelo
  for (let y = 121; y < 180; y++) { const d = (y - 121) * 0.9; for (let x = Math.round(30 + d); x <= Math.round(84 + d * 1.25); x++) if (((x + y) & 1) === 0 && x < 320) pset(x, y, d_mezcla(R.pget(x, y), K.luzCalida, 0.22)); }
  // la alfombra persa en perspectiva: flecos, cenefa azul con su greca dorada y campo rojo con medallón
  for (let y = 142; y <= 174; y++) { const v = (y - 142) / 32, xa = Math.round(78 - v * 26), xb = Math.round(246 + v * 26);
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), bu = Math.min(u, 1 - u) * (xb - xa), bv = Math.min(v, 1 - v) * 32;
      let c;
      if (bu < 1 || bv < 1) c = K.alfS;
      else if (bu < 9 || bv < 4) c = ((x + Math.round(y * 0.5)) % 6 < 2 && bu > 2 && bv > 1.5) ? K.alfB : bu < 2 || bv < 1.6 ? K.alfC : K.alfA;
      else if (bu < 10 || bv < 5) c = K.alfB;
      else { const m = Math.abs(u - 0.5) * 3.2 + Math.abs(v - 0.5) * 2;
        c = m < 0.18 ? K.alfC : m < 0.32 ? K.alfA : m < 0.4 ? K.alfB : m < 0.62 ? K.alf : m < 0.68 ? K.alfA : ((x * 3 + y * 5) % 11 === 0) ? K.alfB : (h(x >> 1, y >> 1, 406) < 0.25 ? K.alfS : K.alf);
        if ((Math.abs(u - 0.22) < 0.012 || Math.abs(u - 0.78) < 0.012) && Math.abs(v - 0.5) < 0.22 && (y & 1)) c = K.alfB; }
      if (x > 30 + (y - 121) * 0.9 && x < 84 + (y - 121) * 1.1 && ((x + y) & 1) === 0) c = d_mezcla(c, K.luzCalida, 0.2);
      pset(x, y, c); }
    if (y === 174) for (let x = xa + 1; x < xb; x += 2) { pset(x, 175, K.alfC); pset(x, 176, K.blancoS ?? K.alfC); } }
  // la ventana alta de guillotina: el marco (el cristal y la calle se pintan en cada fotograma), el alféizar y el radiador
  rect(18, 21, 84, 104, K.caoD); rect(19, 22, 83, 103, K.cao); rect(19, 22, 83, 22, K.caoL); rect(19, 22, 19, 103, K.caoL); rect(22, 24, 80, 101, K.caoS);
  rect(14, 104, 88, 105, K.caoL); rect(14, 106, 88, 107, K.cao); rect(14, 108, 88, 108, K.caoD);
  for (let x = 30; x <= 72; x += 3) { rect(x, 110, x + 1, 118, K.aceroL ?? hex('#9aa4ac')); pset(x, 110, hex('#c8d0d8')); pset(x + 1, 118, hex('#5e6870')); }
  rect(29, 111, 74, 111, hex('#6e7880')); rect(29, 117, 74, 117, hex('#6e7880')); rect(31, 119, 33, 119, K.k); rect(69, 119, 71, 119, K.k); rect(75, 113, 78, 114, hex('#5e6870'));
  // las cortinas de terciopelo con su galería y sus flecos dorados
  for (const [xa, xb, lado] of [[6, 19, -1], [83, 96, 1]]) for (let y = 23; y <= 110; y++) {
    const ata = 70, g = Math.max(0, 1 - Math.abs(y - ata) / 14), w = Math.round(xb - xa + 1 - g * 5), x0 = lado < 0 ? xa : xb - w + 1;
    for (let x = x0; x < x0 + w; x++) pset(x, y, [K.tercL, K.terc, K.tercS, K.terc][(x - x0 + (lado < 0 ? 0 : 1)) % 4]);
    pset(lado < 0 ? x0 + w - 1 : x0, y, K.tercS); if (y === 110) for (let x = x0; x < x0 + w; x += 2) pset(x, 111, C.oroS); }
  for (const x of [8, 87]) { rect(x, 69, x + 8, 71, C.oro); rect(x, 69, x + 8, 69, C.oroL); pset(x + 4, 72, C.oroS); pset(x + 4, 73, C.oro); }
  rect(4, 21, 98, 27, K.tercS); rect(4, 21, 98, 21, K.tercL); for (let x = 4; x <= 98; x += 6) poligono([[x, 27], [x + 5, 27], [x + 2.5, 31]], K.terc); for (let x = 5; x <= 98; x += 2) pset(x, 28 + (x % 4 === 1 ? 2 : 0), C.oro);
  rect(2, 20, 100, 20, C.oroS);
  // la puerta del pasillo: marco, cuarterones de abajo, pomo de latón (el cristal esmerilado se pinta en cada fotograma)
  rect(100, 34, 132, 119, K.caoD); rect(101, 35, 131, 119, K.cao); rect(101, 35, 131, 35, K.caoL); rect(101, 35, 101, 119, K.caoL);
  rect(104, 38, 128, 119, K.caoV); rect(104, 38, 128, 38, K.caoS);
  for (const [a, b] of [[106, 115], [117, 126]]) { rect(a, 82, b, 114, K.caoD); rect(a + 1, 83, b - 1, 113, K.cao); rect(a + 1, 83, b - 1, 83, K.caoL); rect(a + 3, 86, b - 3, 110, K.caoV); }
  rect(105, 78, 127, 79, K.caoS); disco(125, 90, 1.6, C.oro); pset(124, 89, C.oroL); rect(124, 92, 126, 95, C.oroS); pset(125, 93, K.caoD);
  // la carta náutica enmarcada: costa, sondas, rosa de los vientos y la derrota punteada (sin letras)
  rect(144, 37, 202, 73, C.oroS); rect(145, 38, 201, 72, C.oro); rect(146, 39, 200, 71, C.oroS); rect(147, 40, 199, 70, hex('#e6dcc0'));
  for (let y = 40; y <= 70; y++) for (let x = 147; x <= 199; x++) { const costa = 160 + Math.sin(y * 0.35) * 5 + (y - 40) * 0.9 + Math.sin(y * 1.3) * 1.5;
    if (x < costa) pset(x, y, ((x + y) & 1) ? hex('#d8c494') : hex('#cab486')); else { if (x < costa + 2) pset(x, y, hex('#8ab0c0')); else if (h(x, y, 407) < 0.05) pset(x, y, hex('#a8c0c8')); } }
  for (let k = 0; k < 9; k++) { const x = Math.round(176 + h(k, 1, 408) * 20), y = Math.round(44 + h(k, 2, 408) * 24); pset(x, y, hex('#7a8a9a')); }
  for (let i = 0; i < 9; i++) pset(158 + i * 4, 66 - i * 3, hex('#9a2a22'));
  disco(190, 48, 4, hex('#c8b88a')); linea(190, 43, 190, 53, hex('#5a4a3a')); linea(185, 48, 195, 48, hex('#5a4a3a')); pset(190, 43, hex('#9a2a22'));
  // los apliques de gas: brazo de latón y la tulipa (la llama se pinta en cada fotograma)
  for (const x of [139, 207]) { rect(x - 1, 54, x + 1, 58, C.oroS); pset(x, 53, C.oro); linea(x, 56, x, 50, C.oroS); rect(x - 3, 43, x + 3, 50, hex('#e8e0c8')); rect(x - 3, 43, x + 3, 43, hex('#f4eedc')); rect(x - 2, 50, x + 2, 50, hex('#c8bc9c')); }
  // la librería de abogado: cornisa, cuatro cuerpos con puerta de cristal, libros de leyes y el zócalo
  rect(212, 25, 278, 120, K.caoD); rect(213, 25, 277, 28, K.cao); rect(213, 25, 277, 25, K.caoL); rect(214, 28, 276, 28, K.caoS);
  const LIB = [[K.tan, K.tanS, 'eti'], [K.tan, K.tanS, 'eti'], [K.vino, K.alfS, 'oro'], [K.verdeL, hex('#1e3420'), 'oro'], [K.tan, K.tanS, 'eti'], [K.marino, hex('#1c2440'), 'oro'], [K.negroL, K.k, 'oro']];
  for (let s = 0; s < 4; s++) { const ya = 30 + s * 21, yb = ya + 18;
    rect(214, ya, 276, yb + 2, K.cao); rect(214, ya, 276, ya, K.caoL); rect(216, ya + 2, 274, yb, hex('#1e0e08'));
    let x = 217, k = 0;
    while (x < 272) { const tipo = LIB[Math.floor(h(k, s, 409) * LIB.length)], w = 3 + Math.round(h(k, s, 410) * 2), alto = 12 + Math.round(h(k, s, 411) * 4), top = yb - alto;
      if (s === 2 && x > 250 && x < 262) { poligono([[x, yb], [x + 3, yb], [x + 10, top + 2], [x + 7, top + 1]], tipo[0]); linea(x + 3, yb, x + 10, top + 2, tipo[1]); x += 12; k++; continue; }
      if (x + w > 273) break;
      rect(x, top, x + w - 1, yb, tipo[0]); rect(x + w - 1, top, x + w - 1, yb, tipo[1]); pset(x, top, tipo[1]);
      if (tipo[2] === 'eti') { rect(x, top + 3, x + w - 2, top + 4, K.vino); rect(x, top + 6, x + w - 2, top + 6, K.negroL); }
      else { rect(x, top + 2, x + w - 2, top + 2, C.oroS); rect(x, yb - 2, x + w - 2, yb - 2, C.oroS); pset(x + 1, top + 5, C.oro); }
      x += w; k++; }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 12; j++) { const xx = 226 + s * 7 + i * 13 + j, yy = ya + 2 + j; if (xx < 275 && yy <= yb) pset(xx, yy, d_mezcla(R.pget(xx, yy), C.blanco, 0.28)); }
    rect(214, yb + 1, 276, yb + 2, K.caoL); rect(244, yb + 1, 246, yb + 1, C.oroS); }
  rect(213, 113, 277, 119, K.cao); rect(213, 113, 277, 113, K.caoL); rect(213, 119, 277, 119, K.caoD);
  // encima de la librería, el globo terráqueo en su pie de latón
  disco(232, 18, 6, hex('#3e6a8a')); for (let k = 0; k < 14; k++) { const a = h(k, 1, 412) * 6.28, d = h(k, 2, 412) * 5; pset(Math.round(232 + Math.cos(a) * d), Math.round(18 + Math.sin(a) * d * 0.9), hex('#c8b47a')); }
  pset(229, 15, hex('#8ab0d0')); pset(230, 14, hex('#8ab0d0')); linea(225, 18, 232, 11, C.oroS); linea(232, 25, 239, 18, C.oroS); rect(229, 24, 235, 24, C.oro);
  rect(250, 19, 268, 24, K.vino); rect(250, 19, 268, 19, K.tan); rect(252, 16, 266, 18, K.verdeL); rect(252, 16, 266, 16, C.oroS);   // libros tumbados
  // la pared de la derecha: el reloj de péndulo (caja, esfera y su puerta de cristal) y el fichero con el bombín
  rect(286, 48, 308, 98, K.caoD); rect(287, 49, 307, 97, K.cao); poligono([[285, 50], [297, 44], [309, 50]], K.caoS); pset(297, 45, C.oro); rect(287, 49, 307, 49, K.caoL);
  disco(297, 60, 7, C.oroS); disco(297, 60, 6, hex('#f0e8d4')); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; pset(Math.round(297 + Math.cos(a) * 5), Math.round(60 + Math.sin(a) * 5), K.negroL); }
  rect(290, 70, 304, 94, hex('#2a140c')); rect(290, 70, 304, 70, C.oroS); rect(290, 94, 304, 94, C.oroS);
  rect(280, 101, 318, 124, K.caoD); rect(281, 102, 317, 123, K.cao); rect(281, 102, 317, 102, K.caoL);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const x = 283 + i * 12, y = 104 + j * 9; rect(x, y, x + 9, y + 7, K.caoV); rect(x, y, x + 9, y, K.caoL); rect(x + 3, y + 3, x + 6, y + 4, C.oroS); pset(x + 4, y + 3, C.oroL); rect(x + 3, y + 6, x + 6, y + 6, hex('#e8dcc0')); }
  poligono([[286, 101], [306, 101], [304, 99], [288, 99]], K.k); rect(290, 95, 302, 99, K.negroL); rect(290, 95, 302, 95, hex('#4a4440')); rect(290, 98, 302, 98, hex('#5a2a1e'));
  rect(308, 99, 314, 101, hex('#c8b896')); pset(309, 99, hex('#e0d4b4'));   // los guantes
  // el sillón de cuero, detrás de la mesa (respaldo capitoné con tachuelas)
  rect(148, 116, 176, 140, K.caoD); rect(149, 117, 175, 140, K.cuero); rect(149, 117, 175, 118, K.cueroL); rect(148, 115, 176, 116, K.cao); rect(148, 115, 176, 115, K.caoL);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const x = 152 + i * 6 + (j & 1) * 3, y = 121 + j * 6; pset(x, y, K.cueroS); pset(x + 1, y + 1, K.cueroL); }
  for (let x = 150; x <= 174; x += 2) pset(x, 119, C.oroS);
  // la mesa de despacho de caoba: tablero con veta y reflejo, canto con filete, cajoneras con tiradores y el hueco
  poligono([[118, 136], [206, 136], [213, 145], [111, 145]], K.caoD); poligono([[119, 137], [205, 137], [211, 144], [113, 144]], K.caoL);
  for (let y = 138; y <= 143; y++) { const xa = 120 - (y - 137), xb = 204 + (y - 137); for (let x = xa; x <= xb; x++) if (h(x >> 3, y, 413) < 0.25 && h(x, y, 414) < 0.8) pset(x, y, K.caoV); }
  rect(111, 145, 213, 147, K.cao); rect(111, 145, 213, 145, C.oroS); rect(111, 147, 213, 147, K.caoD);
  rect(113, 148, 211, 158, K.caoD);
  for (const [a, b] of [[114, 140], [184, 210]]) { rect(a, 148, b, 158, K.cao); rect(a, 148, a, 158, K.caoL);
    for (let j = 0; j < 3; j++) { const y = 149 + j * 3; rect(a + 2, y, b - 2, y + 2, K.caoV); rect(a + 2, y, b - 2, y, K.caoL); rect(Math.round((a + b) / 2) - 2, y + 1, Math.round((a + b) / 2) + 2, y + 1, C.oroS); } }
  rect(141, 148, 183, 158, hex('#1e0e08')); rect(141, 148, 183, 150, K.caoS); rect(143, 152, 181, 157, hex('#2a140c'));
  rect(112, 158, 141, 160, K.caoS); rect(183, 158, 212, 160, K.caoS); rect(112, 160, 141, 160, K.caoD); rect(183, 160, 212, 160, K.caoD);
  for (let x = 110; x <= 214; x++) for (let y = 161; y <= 163; y++) if (((x + y) & 1) === 0 || y === 161) pset(x, y, d_mezcla(R.pget(x, y), K.k, 0.45));
  // encima: el cartapacio, los legajos atados, el mapa enrollado, el teléfono de candelero y la escribanía de latón
  poligono([[138, 138], [182, 138], [185, 143], [135, 143]], K.cueroS); poligono([[140, 139], [180, 139], [182, 142], [138, 142]], K.cuero); rect(136, 142, 184, 142, K.cueroL);
  for (let i = 0; i < 4; i++) { rect(118 + i, 133 - i * 2, 132 + i, 134 - i * 2, i % 2 ? hex('#e8dcbc') : hex('#d4c49c')); pset(118 + i, 134 - i * 2, hex('#b8a47c')); }
  rect(124, 127, 125, 135, K.vino);
  for (let i = 0; i < 26; i++) { const x = 122 + i, y = 140 + Math.round(i * 0.08); rect(x, y - 1, x, y + 1, hex('#e0cfa0')); pset(x, y - 1, hex('#f0e4c0')); pset(x, y + 1, hex('#b8a274')); }
  rect(122, 139, 123, 141, hex('#c8b488')); pset(122, 140, hex('#8a7a5a')); rect(134, 139, 135, 142, hex('#9a2a22'));
  rect(194, 135, 200, 137, K.negroL); rect(196, 124, 198, 135, K.negroL); rect(195, 121, 199, 124, K.negroL); pset(196, 122, hex('#5a5450')); rect(194, 120, 200, 120, K.k);
  rect(201, 126, 202, 130, K.negroL); linea(201, 126, 199, 128, K.negroL); pset(203, 126, K.negroL); pset(203, 130, K.negroL);
  rect(166, 136, 186, 139, C.oroS); rect(166, 136, 186, 136, C.oro); rect(169, 132, 173, 136, hex('#2a3a4a')); rect(170, 133, 171, 133, hex('#8ab0c8')); rect(179, 132, 183, 136, hex('#2a3a4a')); rect(180, 133, 181, 133, hex('#8ab0c8'));
  rect(169, 131, 173, 131, C.oro); rect(179, 131, 183, 131, C.oro);
}

// la calle de Nueva York al otro lado del cristal de la ventana (24–78 × 26–100), con todo recortado al hueco
function d_calleNY(R, t) {
  const { pset, linea, disco, poligono } = R, K = d_C, X0 = 24, X1 = 78, Y0 = 26, Y1 = 100;
  R.recorte([X0, Y0, X1, Y1]);
  for (let y = Y0; y <= 60; y++) for (let x = X0; x <= X1; x++) pset(x, y, d_tono([K.ny0, K.ny1, K.ny2, K.ny3], (y - Y0) / 11, x, y));
  const esCielo = (c) => c === K.ny0 || c === K.ny1 || c === K.ny2 || c === K.ny3;
  for (let k = 0; k < 3; k++) { const v = [1.4, 2.3, 3.1][k], w = [12, 8, 10][k], cx = X0 - 16 + (((t * v + k * 37) % 90) + 90) % 90, cy = [32, 40, 28][k]; d_nube(R, cx, cy, w, [C.blanco, hex('#dde8f2'), hex('#b4c6da')], esCielo); }
  // lejos: la torre con su cúpula y su linterna, y otros edificios en la bruma
  for (const [a, b, top] of [[24, 34, 48], [56, 66, 44], [67, 78, 50]]) for (let y = top; y <= 62; y++) for (let x = a; x <= b; x++) pset(x, y, (x === a || (y - top) % 4 === 0 && x % 2) ? K.lejosS : K.lejos);
  for (let y = 36; y <= 62; y++) for (let x = 40; x <= 48; x++) pset(x, y, x === 40 || x === 48 ? K.lejosS : (y % 3 === 0 && x % 2 === 0) ? K.lejosS : K.lejos);
  poligono([[39, 36], [44, 29], [49, 36]], K.lejosS); disco(44, 31, 3, K.lejos); linea(44, 26, 44, 28, K.lejosS); pset(44, 27, K.lejos);
  // el humo de la chimenea de enfrente, que se lo lleva el viento
  for (let k = 0; k < 7; k++) { const u = ((t * 0.5 + k / 7) % 1), x = Math.round(70 - u * 26 + Math.sin(t + k) * 1.5), y = Math.round(50 - u * 18); disco(x, y, 1 + u * 2.4, u < 0.5 ? hex('#8a8c90') : hex('#a8acb2')); }
  // enfrente: el edificio de ladrillo con su cornisa de piedra, tres pisos de ventanas, toldos y portales
  for (let y = 52; y <= 91; y++) for (let x = X0; x <= X1; x++) { const fila = Math.floor((y - 52) / 3), j = (x + (fila & 1) * 2) % 4; pset(x, y, (y - 52) % 3 === 2 || j === 0 ? K.ladS : h(x >> 1, fila, 415) < 0.2 ? K.ladL : K.lad); }
  linea(X0, 52, X1, 52, K.piedra); linea(X0, 53, X1, 53, K.piedraS); linea(X0, 54, X1, 54, K.piedra); for (let x = X0; x <= X1; x += 3) pset(x, 55, K.piedraS);
  R.rect(68, 46, 71, 52, K.ladS); linea(67, 46, 72, 46, K.piedraS);   // la chimenea (dentro del cristal)
  for (const yv of [58, 70]) for (let x = X0 + 2; x < X1 - 3; x += 9) {
    for (let y = yv; y < yv + 7; y++) for (let xx = x; xx < x + 5; xx++) pset(xx, y, y === yv + 3 ? K.piedraS : ((xx + y + Math.floor(t * 0.2)) % 7 === 0 ? hex('#4a6a8a') : hex('#24303e')));
    linea(x - 1, yv - 1, x + 5, yv - 1, K.piedra); linea(x - 1, yv + 7, x + 5, yv + 7, K.piedraS); }
  // una ventana de enfrente con alguien que va y viene, y otra que se ilumina
  const vx = 42 + Math.round(Math.sin(t * 0.6) * 1.5); pset(vx, 72, hex('#e0b090')); pset(vx, 73, hex('#5a4a6a')); pset(vx, 74, hex('#5a4a6a'));
  for (let x = X0; x <= X1; x++) { const raya = Math.floor((x - X0) / 3) % 2; pset(x, 82, raya ? hex('#2e6a3e') : hex('#e8e0c8')); pset(x, 83, raya ? hex('#1e4a2a') : hex('#c8c0a8')); if (x % 3 === 1) pset(x, 84, hex('#2e6a3e')); }
  for (let y = 85; y <= 90; y++) for (let x = X0; x <= X1; x++) pset(x, y, (x % 14 < 5) ? hex('#2a1e1a') : (x % 14 === 5 ? K.piedraS : K.lad));
  // la acera, el empedrado y el cable del tranvía
  for (let x = X0; x <= X1; x++) { pset(x, 91, K.piedra); pset(x, 92, K.piedraS); for (let y = 93; y <= Y1; y++) pset(x, y, ((x + (y & 1) * 2) % 4 === 0 || y % 2 === 0 && h(x, y, 416) < 0.3) ? K.calleS : K.calle); }
  linea(X0, 97, X1, 97, hex('#8a8a8a')); linea(X0, 76, X1, 76, K.k);
  // un tranvía amarillo que pasa (de izquierda a derecha) con su trole en el cable
  const tx = Math.round(-40 + ((t * 18) % 200));
  if (tx > X0 - 36 && tx < X1 + 4) { R.recorte([X0, Y0, X1, Y1]);
    for (let y = 81; y <= 95; y++) for (let x = tx; x < tx + 32; x++) pset(x, y, y < 83 ? K.tranviaR : y < 89 ? ((x - tx) % 5 === 0 ? K.tranviaS : (y < 87 ? hex('#3a4a5a') : K.tranvia)) : y === 89 ? K.tranviaS : y < 94 ? K.tranvia : K.tranviaR);
    for (let x = tx + 2; x < tx + 30; x += 5) { pset(x, 85, hex('#e0c890')); pset(x + 1, 84, hex('#f0dca8')); }
    linea(tx + 22, 81, tx + 16, 76, K.k); disco(tx + 6, 96, 1.4, K.k); disco(tx + 25, 96, 1.4, K.k); if (Math.sin(t * 13) > 0.7) pset(tx + 16, 76, hex('#c8e8ff')); }
  // un coche de caballos que va al revés, con el trote del caballo (rc: un rectángulo recortado al cristal)
  const rc = (x0, y0, x1, y1, c) => { x0 = Math.max(X0, x0); x1 = Math.min(X1, x1); y0 = Math.max(Y0, y0); y1 = Math.min(Y1, y1); if (x0 <= x1 && y0 <= y1) R.rect(x0, y0, x1, y1, c); };
  const cx = Math.round(100 - ((t * 11 + 60) % 170)), paso = Math.floor(t * 6) % 2;
  if (cx > X0 - 30 && cx < X1 + 6) {
    rc(cx, 87, cx + 6, 90, hex('#6a4426')); pset(cx - 1, 86, hex('#6a4426')); pset(cx - 2, 86, hex('#6a4426')); pset(cx - 2, 87, hex('#4a2c18')); pset(cx + 7, 88, hex('#2a1a10'));
    for (const [lx, a] of [[cx, paso], [cx + 5, 1 - paso]]) { pset(lx + a, 91, hex('#4a2c18')); pset(lx + a, 92, hex('#4a2c18')); pset(lx + 1 - a, 91, hex('#4a2c18')); pset(lx + 1 - a, 92, hex('#4a2c18')); }
    rc(cx + 9, 83, cx + 18, 91, K.k); rc(cx + 10, 84, cx + 13, 87, hex('#3a4a5a')); rc(cx + 9, 82, cx + 17, 82, hex('#2a2a2a'));
    disco(cx + 16, 93, 2.4, K.k); disco(cx + 16, 93, 1.2, hex('#8a6a3a')); pset(cx + 8, 82, K.k); pset(cx + 8, 81, K.k); }
  // los paseantes con sombrero por la acera
  for (let k = 0; k < 4; k++) { const d = k % 2 ? 1 : -1, x = X0 + ((((t * (4 + k) * d + k * 17) % 60) + 60) % 60) - 3, ropa = [hex('#2a2a3a'), hex('#5a3a2a'), hex('#3a4a3a'), hex('#6a2a3a')][k];
    pset(x, 85, k === 3 ? hex('#e8d8b0') : K.k); pset(x - 1, 86, k === 3 ? hex('#e8d8b0') : K.k); pset(x + 1, 86, k === 3 ? hex('#e8d8b0') : K.k); pset(x, 86, hex('#e8c09a'));
    pset(x, 87, ropa); pset(x, 88, ropa); pset(x, 89, ropa); pset(x + (Math.floor(t * 4 + k) % 2), 90, K.k); }
  // las palomas
  for (let k = 0; k < 2; k++) { const u = (t * 0.09 + k * 0.4) % 1; d_ave(R, X0 - 6 + u * 70, 44 + k * 5 + Math.sin(t * 2 + k) * 2, t, hex('#5a5a66'), k); }
  R.recorte(null);
  // las hojas de la guillotina: el travesaño, el parteluz, el junquillo y los reflejos del cristal
  R.rect(X0, 61, X1, 64, d_C.cao); R.rect(X0, 61, X1, 61, d_C.caoL); R.rect(X0, 64, X1, 64, d_C.caoD); R.rect(50, Y0, 52, Y1, d_C.cao); R.rect(50, Y0, 50, Y1, d_C.caoL);
  R.rect(X0, Y0, X1, Y0, d_C.caoD); R.rect(X0, Y0, X0, Y1, d_C.caoD);
  for (const [px, py, n] of [[26, 30, 14], [30, 30, 8], [54, 68, 14], [58, 68, 7]]) for (let i = 0; i < n; i++) { const x = px + i, y = py + i * 2; if (x <= X1 && y <= Y1 && (y < 61 || y > 64) && x !== 50 && x !== 51 && x !== 52) pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.35)); }
}

function d_bufete(R, t, o) {
  const { pset, rect, linea, disco } = R, K = d_C;
  R.copiar(d_capa(R, 'oi-bufete', () => d_bufeteFijo(R)));
  d_calleNY(R, t);
  // el cristal esmerilado de la puerta: el rótulo insinuado en barras doradas y, a ratos, la silueta de alguien que pasa
  R.recorte([105, 40, 127, 76]);
  for (let y = 40; y <= 76; y++) for (let x = 105; x <= 127; x++) pset(x, y, d_tono([K.esmerilS, K.esmeril, K.esmerilL], 1.3 + Math.sin((x + y) * 0.3) * 0.4 + (y - 40) * 0.01, x, y));
  const sx = Math.round(96 + ((t * 9) % 60));
  if (sx < 134) for (let y = 48; y <= 76; y++) for (let x = sx - 5; x <= sx + 5; x++) { const cab = y < 56 && Math.hypot(x - sx, y - 52) < 4, som = y < 50 && Math.abs(x - sx) < 6 && y > 47, cuerpo = y >= 56 && Math.abs(x - sx) < 5 + (y - 56) * 0.1;
    if ((cab || som || cuerpo) && x >= 105 && x <= 127) pset(x, y, d_mezcla(R.pget(x, y), hex('#4a5a54'), 0.55)); }
  R.recorte(null);
  rect(110, 46, 122, 46, C.oroS); rect(108, 48, 124, 48, C.oro); rect(111, 50, 121, 50, C.oroS); rect(113, 70, 119, 70, C.oroS);
  for (let k = 0; k < 4; k++) pset(108 + k * 5, 58 + k * 3, K.esmerilL);
  rect(104, 39, 128, 39, K.caoD); rect(104, 77, 128, 77, K.caoD);
  // las llamas de gas de los apliques, que titilan, con su halo en la pared
  for (const [x, k] of [[139, 0], [207, 1]]) { const f = 0.7 + 0.3 * Math.sin(t * 9 + k * 2) * Math.sin(t * 5.3 + k), r = 9 + f * 3;
    for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j * 1.1); if (d < r && ((i + j) & 1) === 0 && !(Math.abs(i) <= 3 && j >= -4 && j <= 3)) { const xx = x + i, yy = 46 + j; pset(xx, yy, d_mezcla(R.pget(xx, yy), K.luzCalida, 0.32 * (1 - d / r))); } }
    rect(x - 2, 44, x + 2, 49, hex('#f6ecc8')); pset(x, 47 - Math.round(f), C.fuegoL); pset(x, 48, C.fuego); pset(x - 1 + (Math.sin(t * 7 + k) > 0 ? 1 : 0), 46 - Math.round(f), C.fuego); }
  // el ventilador de techo: varilla, motor y cuatro aspas en escorzo que giran despacio
  const fx = 196, fy = 23; rect(fx, 12, fx, 19, K.caoD); rect(fx - 1, 19, fx + 1, 21, C.oroS); disco(fx, 23, 3, C.oroS); rect(fx - 3, 22, fx + 3, 22, C.oro); pset(fx, 26, K.caoD);
  for (let a = 0; a < 4; a++) { const an = t * 2.2 + a * Math.PI / 2, ex = Math.cos(an) * 22, ey = Math.sin(an) * 3;
    for (let s = 0.2; s <= 1; s += 0.04) { const x = Math.round(fx + ex * s), y = Math.round(fy + ey * s); pset(x, y, Math.sin(an) > 0 ? K.caoS : K.cao); pset(x, y + 1, K.caoD); } }
  // el reloj: las agujas andan y el péndulo va y viene detrás de su cristal
  const mm = t * 0.6, hh = mm / 12 + 2.1;
  linea(297, 60, Math.round(297 + Math.sin(mm) * 5), Math.round(60 - Math.cos(mm) * 5), K.negroL); linea(297, 60, Math.round(297 + Math.sin(hh) * 3), Math.round(60 - Math.cos(hh) * 3), K.k);
  const pa = Math.sin(t * Math.PI) * 0.32, bx = Math.round(297 + Math.sin(pa) * 18), by = Math.round(70 + Math.cos(pa) * 18);
  R.recorte([290, 71, 304, 93]); linea(297, 71, bx, by, C.oroS); disco(bx, by, 2.4, C.oro); pset(bx - 1, by - 1, C.oroL); R.recorte(null);
  for (let i = 0; i < 6; i++) pset(292 + i, 73 + i * 3, d_mezcla(R.pget(292 + i, 73 + i * 3), C.blanco, 0.3));
  // las motas de polvo que flotan en la luz de la ventana
  for (let k = 0; k < 14; k++) { const y = Math.round(150 - ((h(k, 2, 417) * 50 + t * (1.2 + h(k, 3, 417) * 1.6)) % 50)), x = Math.round(36 + (y - 104) * 1.05 + h(k, 1, 417) * 52 + Math.sin(t * 0.5 + k) * 3);
    if (Math.sin(t * 1.5 + k * 1.9) > 0.2) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff4d0'), 0.6)); }
  // la lámpara verde de banquero (encendida: la pantalla brilla y deja un charco de luz en la mesa)
  const luz = o.luz !== false;
  if (luz) for (let y = 137; y <= 144; y++) for (let x = 118; x <= 162; x++) { const d = Math.hypot((x - 140) / 22, (y - 140) / 5); if (d < 1 && ((x + y) & 1) === 0) pset(x, y, d_mezcla(R.pget(x, y), K.luzCalida, 0.3 * (1 - d))); }
  rect(137, 136, 143, 137, C.oroS); rect(137, 136, 143, 136, C.oro); rect(139, 128, 140, 135, C.oroS);
  R.poligono([[131, 128], [148, 128], [146, 123], [133, 123]], K.lamparaS); R.poligono([[132, 127], [147, 127], [145, 124], [134, 124]], K.lampara); rect(134, 124, 144, 124, K.lamparaL);
  if (luz) { rect(133, 128, 146, 128, K.luzCalida); for (let x = 134; x <= 145; x += 3) pset(x, 129, hex('#f8eac0')); }
  pset(140, 122, C.oro); pset(146, 128, C.oro); rect(145, 129, 145, 131, C.oroS); pset(145, 132, C.oro);
  // la taza de café que humea
  rect(149, 135, 154, 139, C.blanco); rect(149, 139, 154, 139, hex('#c8c4bc')); rect(155, 136, 156, 137, C.blanco); rect(147, 140, 156, 140, hex('#d8d4cc')); rect(150, 135, 153, 135, hex('#4a2c18'));
  for (let k = 0; k < 3; k++) { const u = ((t * 0.7 + k / 3) % 1), x = Math.round(151 + Math.sin(t * 2 + u * 6 + k) * 1.5), y = Math.round(133 - u * 10); if (u < 0.85) pset(x, y, d_mezcla(R.pget(x, y), C.blanco, 0.6 - u * 0.5)); }
  // el documento sobre el cartapacio (renglones sin letras y la raya de la firma) y la rúbrica que se va escribiendo
  if (o.papel !== false) {
    R.poligono([[150, 138], [168, 138], [170, 143], [148, 143]], hex('#f4eedc')); rect(148, 143, 170, 143, hex('#c8c0a8'));
    for (const [y, a, b] of [[139, 152, 165], [140, 152, 162], [141, 151, 166]]) for (let x = a; x <= b; x += 1) if (h(x, y, 418) < 0.75) pset(x, y, hex('#9a9484'));
    rect(158, 142, 167, 142, hex('#6a6458'));
    const f = Math.max(0, Math.min(1, o.firma ?? 0));
    for (let i = 0; i < Math.round(f * 12); i++) pset(157 + i, 141 + (Math.sin(i * 1.7) > 0 ? 0 : 1) - (i % 4 === 1 ? 1 : 0), hex('#24346a'));
  }
  if (o.pluma !== false) { linea(176, 135, 182, 127, K.negroL); pset(183, 126, K.k); pset(177, 134, C.oro); }
  d_rooseveltDelante(R, t, { encuadre: 'bufete' });
  return { suelo: 160, roosevelt: [100, 160], socio: [224, 162], mesa: [111, 136, 213, 160], tablero: 141, papel: [159, 141], pluma: [180, 130],
    escribania: [176, 134], lampara: [140, 126], telefono: [197, 122], mapaEnrollado: [135, 140], ventana: [24, 26, 78, 100], puerta: [100, 34, 132, 119],
    carta: [147, 40, 199, 70], libreria: [212, 25, 278, 120], reloj: [297, 60], libre: [30, 162, 262, 179] };
}

function d_campobelloFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = d_C;
  // el cielo de verano, tramado en cuatro tonos (las nubes se pintan en cada fotograma)
  for (let y = 0; y < 82; y++) for (let x = 0; x < 320; x++) pset(x, y, d_tono([K.cieloC0, K.cieloC1, K.cieloC2, K.cieloC3], y / 24 + (x < 140 ? 0.2 : 0), x, y));
  // la costa de enfrente: lomas azuladas con casitas blancas y un campanario
  for (let x = 0; x < 320; x++) { const top = Math.round(72 - 5 * (0.5 + 0.5 * Math.sin(x * 0.045 + 1)) - 3 * d_ruido(x, 1, 420) - (x < 60 ? 2 : 0));
    for (let y = top; y < 82; y++) pset(x, y, y === top ? K.costaL : d_tono([K.costa, K.costaS], (y - top) / 6 + h(x, y, 421) * 0.3, x, y)); }
  for (let k = 0; k < 9; k++) { const x = 30 + Math.round(h(k, 1, 422) * 120), y = 74 + Math.round(h(k, 2, 422) * 4); rect(x, y, x + 2, y + 1, k % 3 ? hex('#e8ecf0') : hex('#c8a090')); pset(x + 1, y - 1, hex('#8a7a7a')); }
  rect(100, 64, 101, 75, hex('#e8ecf0')); poligono([[99, 64], [100.5, 59], [102, 64]], hex('#c8ccd4'));
  // el mar (los brillos y los veleros van en cada fotograma)
  for (let y = 80; y < 128; y++) for (let x = 0; x < 320; x++) { const v = (y - 80) / 16 + (Math.sin(x * 0.3 + y * 1.7) > 0.6 ? 0.6 : 0); pset(x, y, d_tono([K.marCL, K.marC, K.marCS], v, x, y)); }
  for (let x = 0; x < 320; x++) pset(x, 80, K.marCB);
  // el faro en su roca, a la izquierda
  poligono([[6, 86], [14, 80], [24, 81], [30, 86]], K.rocaS); poligono([[9, 85], [15, 81], [22, 82], [26, 85]], K.roca);
  rect(15, 68, 20, 81, C.blanco); rect(19, 68, 20, 81, hex('#d0d4d8')); rect(15, 72, 20, 73, hex('#c83a2a')); rect(15, 77, 20, 78, hex('#c83a2a'));
  rect(16, 64, 19, 67, hex('#2a3a4a')); poligono([[14, 64], [17.5, 60], [21, 64]], hex('#c83a2a')); rect(14, 67, 21, 67, K.k); rect(22, 76, 27, 81, C.blanco); poligono([[21, 76], [24.5, 73], [28, 76]], hex('#c83a2a'));
  // la tierra de la casa, que sube por la derecha, y los abetos detrás
  for (let x = 120; x < 320; x++) { const top = Math.round(104 - Math.min(1, (x - 120) / 50) * 10); for (let y = top; y < 132; y++) pset(x, y, d_tono([K.cespedL, K.cesped, K.cespedS], (y - top) / 8 + h(x, y, 423) * 0.6, x, y)); }
  for (let k = 0; k < 22; k++) { const x = 136 + Math.round(k * 8.6 + h(k, 1, 424) * 5), base = 100, alto = 34 + Math.round(h(k, 2, 424) * 26);
    const top = Math.max(x >= 270 ? 50 : 26, base - alto), w = 5 + h(k, 3, 424) * 4, lejos = k % 2 === 0;
    for (let y = top; y <= base; y++) { const half = Math.round((y - top) / (base - top) * w + ((y - top) % 5 === 4 ? 1 : 0));
      for (let i = -half; i <= half; i++) { const c = i < -half * 0.3 ? K.abetoL : i > half * 0.4 ? K.abetoD : K.abeto; pset(x + i, y, lejos ? d_mezcla(c, K.costa, 0.35) : c); } }
    pset(x, top - 1, lejos ? K.costa : K.abetoS); }
  // la casa: muro de tejuelas rojas, alero, tejado de mansarda verde con buhardillas, chimeneas de ladrillo
  for (let y = 64; y <= 124; y++) for (let x = 166; x <= 274; x++) { const fila = Math.floor((y - 64) / 3), j = (x + (fila & 1) * 3 + Math.floor(h(x >> 3, fila, 425) * 2)) % 6;
    let c = (y - 64) % 3 === 2 ? K.casaS : j === 0 ? K.casaD : h(x >> 1, fila, 426) < 0.2 ? K.casaL : K.casa; if (y < 70) c = d_mezcla(c, K.casaD, 0.45); if (x > 268) c = d_mezcla(c, K.casaD, 0.3); pset(x, y, c); }
  rect(165, 64, 275, 64, K.blancoS); rect(164, 62, 276, 63, K.blancoC);
  for (let y = 38; y <= 61; y++) { const ins = y < 48 ? Math.round((48 - y) * 0.8) : Math.round((61 - y) * 0.15); for (let x = 162 + ins; x <= 278 - ins - 2; x++) {
    const fila = Math.floor(y / 2), j = (x + (fila & 1) * 2) % 4; pset(x, y, y === 47 || y === 48 ? K.tejD : y % 2 === 0 ? K.tejS : j === 0 ? K.tejS : h(x, fila, 427) < 0.15 ? K.tejL : K.tej); } }
  rect(170, 38, 268, 38, K.tejL);
  for (const [x0, y0] of [[176, 26], [256, 30]]) { rect(x0, y0, x0 + 7, 44, K.casaS); for (let y = y0; y < 44; y += 2) for (let x = x0 + ((y >> 1) & 1); x <= x0 + 7; x += 3) pset(x, y, K.casaD); rect(x0 - 1, y0, x0 + 8, y0 + 1, hex('#5a2a1e')); rect(x0 + 1, y0 - 1, x0 + 6, y0 - 1, K.k); }
  for (const x of [186, 214, 242]) { poligono([[x - 2, 51], [x + 7, 43], [x + 16, 51]], K.tejS); poligono([[x, 50], [x + 7, 44], [x + 14, 50]], K.tej); rect(x + 1, 51, x + 13, 60, K.blancoC); rect(x + 3, 52, x + 11, 59, hex('#1e2a3a')); rect(x + 7, 52, x + 7, 59, K.blancoC); rect(x + 3, 55, x + 11, 55, K.blancoC); pset(x + 4, 53, hex('#8ab0d0')); pset(x + 9, 57, hex('#6a8aa8')); }
  // las ventanas del primer piso, con su moldura blanca
  for (const x of [176, 206, 236]) { rect(x - 1, 67, x + 13, 87, K.blancoC); rect(x + 1, 69, x + 11, 85, hex('#1e2a3a')); rect(x + 6, 69, x + 6, 85, K.blancoC); rect(x + 1, 77, x + 11, 77, K.blancoC); rect(x - 2, 87, x + 14, 88, K.blancoS);
    for (let i = 0; i < 5; i++) pset(x + 2 + i, 70 + i * 2, hex('#7a9ab8')); }
  // el porche: tejadillo, sombra, la pared de dentro con ventanas y la puerta, el suelo, la celosía y la escalera
  for (let y = 89; y <= 96; y++) for (let x = 160 - (y - 89); x <= 280 + (y - 89) && x < 320; x++) pset(x, y, (y & 1) ? K.tej : ((x + y) % 4 === 0 ? K.tejS : K.tejL));
  rect(152, 97, 288, 98, K.blancoC); rect(152, 99, 288, 99, K.blancoS);
  for (let y = 100; y <= 123; y++) for (let x = 162; x <= 274; x++) pset(x, y, d_mezcla(R.pget(x, y), hex('#3a1410'), 0.38 - (y - 100) * 0.008));
  for (const x of [176, 240]) { rect(x - 1, 102, x + 15, 117, K.blancoS); rect(x + 1, 104, x + 13, 115, hex('#1a2230')); rect(x + 7, 104, x + 7, 115, K.blancoS); pset(x + 3, 106, hex('#5a7a98')); }
  rect(209, 100, 229, 124, K.blancoS); rect(211, 102, 227, 124, hex('#2e5a3e')); rect(213, 104, 225, 112, hex('#1a2a30')); rect(219, 104, 219, 112, hex('#2e5a3e')); rect(213, 115, 225, 122, hex('#24482f')); pset(225, 117, C.oro);
  rect(156, 124, 284, 126, hex('#8a8478')); rect(156, 124, 284, 124, hex('#aaa498')); for (let x = 156; x <= 284; x += 7) pset(x, 125, hex('#6a665c'));
  rect(156, 127, 284, 129, K.blancoC); rect(156, 129, 284, 129, K.blancoS);
  for (let y = 130; y <= 137; y++) for (let x = 156; x <= 284; x++) if (x < 204 || x > 234) pset(x, y, ((x + y) % 4 === 0 || (x - y + 400) % 4 === 0) ? K.casaS : hex('#2a1410'));
  for (let s = 0; s < 3; s++) { const y = 130 + s * 3; rect(204 - s * 2, y, 234 + s * 2, y, hex('#b8b2a4')); rect(204 - s * 2, y + 1, 234 + s * 2, y + 2, hex('#8a8478')); }
  // la playa: arena, rocas y algas, y la barca de remos varada
  for (let x = 0; x < 160; x++) { const top = Math.round(124 + Math.sin(x * 0.05) * 2 + (x > 120 ? (x - 120) * -0.4 : 0)); for (let y = top; y < 136; y++) pset(x, y, d_tono([hex('#e0d0a8'), hex('#c8b48c'), hex('#a89470')], (y - top) / 5 + h(x, y, 428) * 0.8, x, y)); }
  for (let k = 0; k < 8; k++) { const x = 10 + Math.round(h(k, 1, 429) * 130), y = 126 + Math.round(h(k, 2, 429) * 7), r = 2 + h(k, 3, 429) * 3; disco(x, y, r, K.rocaS); disco(x - 0.6, y - 0.8, r * 0.7, K.roca); pset(Math.round(x - r * 0.4), Math.round(y - r * 0.6), K.rocaL); if (k % 2) pset(x + 1, Math.round(y + r - 1), hex('#5a6a3a')); }
  poligono([[63, 123], [97, 123], [92, 131], [68, 131]], hex('#2a1e18')); poligono([[64, 124], [96, 124], [91, 130], [69, 130]], hex('#e8e2d0')); rect(66, 127, 94, 128, hex('#2e6a4a')); rect(66, 124, 94, 125, hex('#8a6a44')); rect(67, 125, 93, 125, hex('#5a4028')); rect(74, 124, 75, 128, hex('#8a6a44')); rect(85, 124, 86, 128, hex('#8a6a44'));
  linea(78, 122, 100, 119, hex('#c8b088')); linea(57, 131, 66, 127, hex('#9a8460'));
  // el césped de delante (de la playa y el porche hasta abajo): franjas de siega, matas, tréboles y margaritas
  for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) {
    const borde = x < 160 ? 134 + Math.round(Math.sin(x * 0.21) * 1.5 + Math.sin(x * 0.05) * 2) : 132;
    if (y < borde || (y < 138 && x >= 156 && x <= 284)) continue;   // la playa, la celosía y la escalera ya están
    const franja = Math.floor((x + (y - 132) * 0.6) / 22) % 2, v = 1.1 + (y - 132) / 40 + (franja ? 0.35 : 0) + d_ruido(x, y * 1.5, 440) * 0.6 - 0.3;
    let c = d_tono([K.cespedL, K.cesped, K.cespedS, K.cespedD], v, x, y);
    if (h(x, y, 441) < 0.05) c = K.cespedD; else if (h(x, y, 442) < 0.03) c = K.cespedL;
    pset(x, y, c);
  }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 443) * 318), y = 140 + Math.round(h(k, 2, 443) * 36); pset(x, y, C.blanco); pset(x + 1, y, k % 3 ? C.blanco : hex('#f0d040')); pset(x, y + 1, K.cespedS); }
  // el camino de losas, de la escalera hacia abajo a la izquierda, con la sombra de cada losa
  for (let k = 0; k < 8; k++) { const u = k / 7, cx = Math.round(219 - u * 74), cy = Math.round(142 + u * 31), w = Math.round(6 + u * 6), hh = Math.round(2 + u * 2);
    for (let j = -hh; j <= hh + 1; j++) for (let i = -w; i <= w; i++) { const d = (i / w) ** 2 + (j / (hh + 0.5)) ** 2; if (d > 1) continue; pset(cx + i, cy + j, j === hh + 1 || d > 0.8 && j > 0 ? hex('#7a7468') : j < -hh + 1 ? hex('#c8c2b4') : h(cx + i, cy + j, 444) < 0.15 ? hex('#8a8478') : hex('#aaa498')); } }
  // las hortensias azules al pie del porche
  for (const [x, y] of [[170, 138], [190, 139], [252, 138], [272, 139]]) for (let k = 0; k < 9; k++) { const a = k * 0.7, r = 2 + (k % 3); disco(x + Math.cos(a) * 4, y - 3 + Math.sin(a) * 2, r, k % 2 ? hex('#7a9ad8') : hex('#5a7ac0')); }
  for (const [x, y] of [[170, 138], [190, 139], [252, 138], [272, 139]]) { pset(x - 1, y - 6, hex('#b8c8f0')); pset(x + 2, y - 4, hex('#b8c8f0')); rect(x - 6, y + 1, x + 6, y + 1, K.cespedD); }
}

function d_campobello(R, t, o) {
  const { pset, rect, linea, disco, poligono } = R, K = d_C;
  R.copiar(d_capa(R, 'oi-campobello', () => d_campobelloFijo(R)));
  // las nubes a tres velocidades, solo sobre el cielo (pasan por detrás de los abetos y la casa)
  const esCielo = (c, x, y) => (x < 272 || y > 48) && (c === K.cieloC0 || c === K.cieloC1 || c === K.cieloC2 || c === K.cieloC3);
  for (let k = 0; k < 5; k++) { const v = [1.2, 2, 2.8, 1.6, 2.4][k], w = [22, 15, 11, 18, 9][k], cy = [20, 34, 48, 26, 56][k], cx = ((k * 83 + t * v) % 380) - 30;
    d_nube(R, cx, cy, w, [C.blanco, hex('#e0eaf4'), hex('#b0c4da')], esCielo); }
  // el mar: brillos que corren y olas pequeñas; los veleros lejanos que navegan
  for (let k = 0; k < 40; k++) { const x = Math.round(((h(k, 1, 430) * 170 + t * (3 + h(k, 2, 430) * 3)) % 170)), y = 83 + Math.round(h(k, 3, 430) * 38);
    if (Math.sin(t * 2 + k) > -0.2 && (R.pget(x, y) === K.marC || R.pget(x, y) === K.marCS || R.pget(x, y) === K.marCL)) { pset(x, y, K.marCB); if (y > 104) pset(x + 1, y, K.marCB); } }
  R.recorte([0, 70, 150, 120]);
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * (2.2 + k * 1.3) + k * 80) % 190) - 20), y = 88 + k * 14, s = 1 + k * 0.5, esc = (n) => Math.round(n * s), sw = Math.round(Math.sin(t * 1.4 + k) * 0.6);
    poligono([[x - esc(7), y], [x + esc(7), y], [x + esc(5), y + esc(2)], [x - esc(5), y + esc(2)]], k ? hex('#8a3a2a') : hex('#f0ece0'));
    linea(x, y - 1, x, y - esc(14), hex('#5a4a3a')); poligono([[x + 1, y - esc(13)], [x + 1 + esc(7) + sw, y - 2], [x + 1, y - 2]], C.blanco); poligono([[x - 1, y - esc(10)], [x - 1, y - 2], [x - esc(5) + sw, y - 2]], hex('#e0dcd0'));
    for (let i = -esc(6); i <= esc(6); i += 2) pset(x + i, y + esc(2) + 1, K.marCL); }
  R.recorte(null);
  // la espuma de la orilla, que sube y baja
  const ola = Math.sin(t * 1.1) * 2;
  for (let x = 0; x < 150; x++) { const top = Math.round(124 + Math.sin(x * 0.05) * 2 + (x > 120 ? (x - 120) * -0.4 : 0) - 1 + ola * 0.5 + Math.sin(x * 0.4 + t * 2) * 0.6);
    if (x > 60 && x < 98) continue; pset(x, top, K.blancoC); if ((x + Math.floor(t * 3)) % 3) pset(x, top - 1, K.marCB); if ((x + Math.floor(t * 2)) % 5 === 0) pset(x, top + 1, hex('#f4f0e4')); }
  // las gaviotas
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k * 0.33) % 1; d_ave(R, -10 + u * 180, 30 + k * 9 + Math.sin(t * 0.8 + k * 2) * 4, t * 0.6, hex('#f4f4f4'), k); }
  // el humo de la chimenea de la izquierda, que se lleva la brisa
  for (let k = 0; k < 6; k++) { const u = ((t * 0.35 + k / 6) % 1), x = Math.round(180 - u * 22 + Math.sin(t * 1.3 + k) * 1.5), y = Math.round(24 - u * 9); disco(x, y, 0.8 + u * 2.6, u < 0.5 ? hex('#d8dce2') : hex('#c4ccd8')); }
  // la cortina que sale por la ventana abierta del primer piso
  for (let y = 69; y <= 82; y++) { const w = Math.round(3 + Math.sin(t * 2.2 + y * 0.4) * 1.5 + (y - 69) * 0.15); for (let i = 0; i < w; i++) pset(237 + i, y, i === w - 1 ? K.blancoS : C.blanco); }
  // el mástil con su gallardete, que ondea
  rect(144, 50, 145, 128, K.blancoC); rect(145, 50, 145, 128, K.blancoS); disco(144.5, 49, 1.5, C.oro);
  for (let i = 0; i < 22; i++) { const y = 52 + Math.round(Math.sin(t * 4 - i * 0.45) * (i / 8)), a = Math.max(0, 4 - Math.round(i / 6)); for (let j = 0; j <= a; j++) pset(146 + i, y + j, j < a / 2 ? hex('#c8283a') : hex('#2a4a8a')); }
  // la mecedora del porche, que se mece (por detrás de la barandilla)
  const m = Math.sin(t * 1.6) * 2;
  linea(252 + Math.round(m), 106, 252, 120, K.casaD); linea(260 + Math.round(m), 106, 260, 120, K.casaD); rect(252, 115, 262, 116, hex('#8a6a44'));
  for (let x = 253; x < 260; x += 2) linea(x + Math.round(m), 107, x, 115, hex('#a88458')); linea(248 + Math.round(m * 0.3), 123, 266 - Math.round(m * 0.3), 121, hex('#6a4a2a'));
  // las columnas y la barandilla del porche (abierta en la escalera, donde cabe el niño)
  for (const x of [158, 202, 234, 280]) { rect(x - 1, 99, x + 2, 124, K.blancoC); rect(x + 2, 99, x + 2, 124, K.blancoS); rect(x - 2, 99, x + 3, 100, K.blancoS); }
  for (const [a, b] of [[161, 199], [237, 277]]) { rect(a, 111, b, 112, K.blancoC); rect(a, 113, b, 113, K.blancoS); rect(a, 122, b, 123, K.blancoC); for (let x = a + 1; x < b; x += 3) rect(x, 114, x, 121, K.blancoC); }
  // el césped de delante: hierba que se mece, el camino de losas, los lupinos y la mariposa
  d_rooseveltDelante(R, t, { encuadre: 'campobello' });
  return { suelo: 127, porche: [160, 124, 280, 127], nino: [218, 127], puerta: [211, 102, 227, 124], escalera: [204, 130, 234, 138], cesped: 160, mar: [0, 80, 150, 124],
    horizonte: 80, faro: [17, 60], casa: [164, 26, 278, 129], libre: [20, 140, 300, 179] };
}

function d_cubiertaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R, K = d_C;
  rect(0, 0, 319, 179, K.clave);   // lo que queda «clave» se rellena en cada fotograma con el mar y la niebla
  // el bote salvavidas en sus pescantes (arriba a la izquierda)
  for (const [x, d] of [[22, 1], [120, -1]]) { rect(x - 1, 46, x + 1, 94, K.aceroS); rect(x - 1, 46, x - 1, 94, K.aceroL);
    for (let i = 0; i <= 8; i++) { const px = Math.round(x + d * (8 - 8 * Math.cos(i / 8 * Math.PI / 2))), py = Math.round(46 - Math.sin(i / 8 * Math.PI / 2) * 7); rect(px - 1, py - 1, px + 1, py + 1, K.aceroS); pset(px, py - 1, K.aceroL); }
    rect(x - 2, 92, x + 2, 95, K.aceroD); }
  linea(29, 40, 29, 58, K.caboS); linea(113, 40, 113, 58, K.caboS); for (const x of [29, 113]) { rect(x - 1, 41, x + 1, 43, K.aceroD); }
  poligono([[14, 58], [128, 58], [120, 70], [22, 70]], K.k); poligono([[15, 59], [127, 59], [119, 69], [23, 69]], hex('#e8e6de')); rect(16, 59, 126, 60, hex('#b48a5a')); rect(20, 67, 122, 68, hex('#c8c4b8'));
  for (let x = 30; x < 120; x += 16) rect(x, 62, x + 6, 63, hex('#c8c4b8'));
  // la caseta de acero a la derecha: chapas con remaches, ojos de buey y la puerta estanca
  rect(196, 58, 319, 121, K.aceroD); rect(197, 59, 319, 121, K.acero);
  for (let y = 59; y <= 121; y++) for (let x = 197; x < 320; x++) { if ((x - 197) % 30 === 0) pset(x, y, K.aceroS); else if ((y - 59) % 20 === 0) pset(x, y, K.aceroS); else if (((x - 197) % 30 === 2 || (y - 59) % 20 === 2) && (x + y) % 3 === 0) pset(x, y, K.aceroL); else if (h(x >> 2, y >> 2, 431) < 0.06) pset(x, y, K.aceroS); }
  rect(196, 56, 319, 58, K.aceroL); rect(196, 58, 319, 58, K.aceroD); for (let x = 198; x < 320; x += 8) { rect(x, 48, x, 56, K.aceroS); } rect(196, 48, 319, 49, K.aceroL);
  for (const [x, y] of [[214, 80], [292, 80]]) { disco(x, y, 6, C.oroS); disco(x, y, 5, C.oro); disco(x, y, 4, hex('#22303a')); pset(x - 2, y - 2, hex('#8aa4b4')); pset(x - 1, y - 2, hex('#5a7488')); }
  rect(242, 76, 268, 121, K.aceroD); rect(244, 78, 266, 121, K.aceroS); rect(246, 80, 264, 119, K.acero); rect(246, 80, 264, 80, K.aceroL);
  for (const y of [84, 100, 114]) { rect(265, y, 268, y + 2, K.aceroD); pset(267, y + 1, K.aceroL); } rect(248, 98, 249, 100, K.aceroD);
  // la chimenea con su franja negra, el silbato y el ventilador de cuello de cisne
  for (let y = 15; y <= 48; y++) { const xa = 226 + Math.round((48 - y) * 0.18), xb = 262 + Math.round((48 - y) * 0.18);
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), negro = y < 24, anillo = !negro && (y - 24) % 7 === 0;
      pset(x, y, x === xa || x === xb ? K.aceroD : y === 15 ? hex('#4a4a50') : negro ? (u < 0.22 ? hex('#3a3a40') : u > 0.8 ? hex('#101012') : hex('#222226')) : anillo ? K.aceroS : u < 0.2 ? K.aceroL : u > 0.78 ? K.aceroS : K.acero); } }
  for (let x = 230; x <= 266; x++) pset(x, 24, K.aceroD);
  rect(222, 24, 223, 46, K.aceroS); rect(220, 22, 225, 24, C.oroS); pset(222, 21, C.oro);
  rect(205, 36, 209, 56, K.acero); rect(205, 36, 205, 56, K.aceroL); disco(209, 33, 6, K.acero); disco(211, 33, 4, hex('#9a2a22')); disco(211, 33, 2.4, hex('#5a1410')); rect(203, 29, 206, 39, K.acero);
  // la borda: candeleros, el pasamanos de madera y las cadenas (entre ellos se ve el mar)
  for (let x = 4; x < 196; x += 24) { rect(x, 94, x + 1, 121, K.aceroS); pset(x, 94, K.aceroL); rect(x - 1, 120, x + 2, 121, K.aceroD); }
  rect(0, 92, 195, 95, K.tecaD); rect(0, 92, 195, 93, K.tecaL); rect(0, 94, 195, 94, K.teca);
  for (const y0 of [104, 113]) for (let x = 0; x < 196; x++) { const y = y0 + Math.round(Math.sin(((x % 24) / 24) * Math.PI) * 1.5); pset(x, y, x % 2 ? K.aceroS : K.aceroD); }
  // el trancanil de acero y la cubierta de teca mojada, con sus juntas calafateadas y los reflejos
  rect(0, 120, 319, 122, K.aceroS); rect(0, 120, 319, 120, K.aceroL); rect(0, 122, 319, 122, K.aceroD);
  let y0 = 123, alto = 3, r = 0;
  while (y0 < 180) { const y1 = Math.min(179, Math.round(y0 + alto) - 1), L = 40 + r * 10, off = Math.round(h(r, 1, 432) * L);
    for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const n = Math.floor((x + off) / L), to = h(n, r, 433);
      let c = y === y1 ? K.tecaD : (x + off) % L === 0 ? K.tecaD : to < 0.3 ? K.tecaS : to > 0.82 ? K.tecaL : K.teca;
      if (c !== K.tecaD && h(x >> 3, y, 434 + n) < 0.12) c = K.tecaS; if (c !== K.tecaD && d_ruido(x * 0.5, y * 2, 435) > 0.72 && ((x + y) & 1)) c = d_mezcla(c, K.niebla, 0.35);
      pset(x, y, c); }
    y0 = y1 + 1; alto = Math.min(11, alto + 1); r++; }
  for (let y = 123; y < 180; y++) for (let x = 196; x < 320; x++) if (y < 128 && ((x + y) & 1)) pset(x, y, d_mezcla(R.pget(x, y), K.k, 0.3));   // la sombra de la caseta
  // las bitas con el cabo en ocho (delante a la izquierda) y la adujada de cabo (a la derecha)
  for (const x of [28, 46]) { rect(x - 4, 146, x + 4, 166, K.aceroD); rect(x - 3, 146, x + 3, 166, K.acero); rect(x - 3, 146, x - 2, 166, K.aceroL); rect(x - 5, 144, x + 5, 146, K.aceroS); rect(x - 5, 144, x + 5, 144, K.aceroL); }
  rect(18, 166, 56, 170, K.aceroD); rect(19, 166, 55, 168, K.aceroS);
  for (let i = 0; i < 4; i++) { linea(24, 150 + i * 4, 50, 153 + i * 4, K.caboS); linea(24, 151 + i * 4, 50, 152 + i * 4, K.cabo); linea(24, 153 + i * 4, 50, 150 + i * 4, K.caboS); linea(24, 154 + i * 4, 50, 151 + i * 4, K.caboL); }
  linea(56, 160, 100, 178, K.caboS); linea(56, 159, 100, 177, K.cabo);
  for (let rr = 13; rr >= 2; rr -= 2) { for (let a = 0; a < 6.3; a += 0.05) { const x = Math.round(286 + Math.cos(a) * rr), y = Math.round(166 + Math.sin(a) * rr * 0.4); pset(x, y, Math.sin(a) < 0 ? K.caboL : rr % 4 === 1 ? K.caboS : K.cabo); } }
  disco(286, 166, 1.2, K.tecaD);
  // el cabrestante (a la derecha, delante de la caseta): base, tambor con sus guardines y el sombrerete
  for (let y = 132; y <= 150; y++) { const w = y < 136 ? 8 : y > 146 ? 11 : 6; for (let x = 232 - w; x <= 232 + w; x++) { const u = (x - 232 + w) / (2 * w); pset(x, y, y === 132 || y === 136 || y === 146 ? K.aceroD : u < 0.25 ? K.aceroL : u > 0.75 ? K.aceroD : (y > 136 && y < 146 && (x - 226) % 4 === 0) ? K.aceroS : K.acero); } }
  rect(220, 150, 244, 152, K.aceroD); for (let x = 224; x <= 240; x += 4) pset(x, 148, K.aceroL);
  // los cubos contra incendios colgados en la caseta (rojos, sin letras) y los charcos de la cubierta mojada
  for (let k = 0; k < 3; k++) { const x = 276 + k * 12; rect(x - 4, 96, x + 4, 96, K.aceroD); poligono([[x - 4, 99], [x + 4, 99], [x + 3, 108], [x - 3, 108]], hex('#a82a22')); rect(x - 3, 99, x - 2, 107, hex('#c84a3a')); linea(x - 4, 99, x, 97, K.aceroD); linea(x + 4, 99, x, 97, K.aceroD); }
  for (const [cx, cy, rx] of [[110, 140, 16], [176, 163, 22], [64, 132, 10]]) for (let y = -2; y <= 2; y++) for (let x = -rx; x <= rx; x++) if ((x / rx) ** 2 + (y / 2.6) ** 2 < 1) { const c = R.pget(cx + x, cy + y); pset(cx + x, cy + y, ((x + y) & 1) ? d_mezcla(c, K.nieblaL, 0.4) : d_mezcla(c, K.aceroS, 0.25)); }
}

function d_cubierta(R, t, o) {
  const { pset, rect, linea, disco, poligono } = R, K = d_C, W = 320;
  const nb = Math.max(0, Math.min(1, o.niebla ?? 0.75)), giro = Math.max(0, Math.min(1, o.giro ?? 0));
  const rol = Math.sin(t * 0.8) * 1.6, esc = Math.sin(giro * Math.PI) * 5 + Math.sin(t * 0.5) * 0.8, dx = giro * 260;
  const hor = (x) => 84 + rol + esc * (x - 160) / 160;
  // el fondo en su búfer: niebla sobre el mar, el mar gris con sus olas, el faro y el escolta lejano
  const fondo = d_capa(R, 'oi-cubierta-fondo', () => {});
  const prev = R.usar(fondo);
  for (let y = 0; y < 124; y++) for (let x = 0; x < W; x++) { const hy = hor(x);
    if (y < hy) pset(x, y, d_tono([K.nieblaL, K.niebla, K.nieblaS], 0.6 + (y / hy) * 1.2, x, y));
    else { const ww = x + dx + t * 6, v = 0.4 + (y - hy) / 14 + (Math.sin(ww * 0.22 + y * 0.9 - t * 1.6) > 0.55 ? -0.7 : 0) + (Math.sin(ww * 0.09 - y * 0.5 + t) > 0.8 ? 0.6 : 0);
      pset(x, y, d_tono([K.marGL, K.marG, K.marGS], v, x, y)); } }
  // el faro en la costa lejana, con su destello cada cinco segundos, y el escolta que navega
  const fx = Math.round(160 - dx), fy = Math.round(hor(fx));
  if (fx > -30 && fx < 350) {
    for (let x = fx - 34; x < fx + 26; x++) { const top = Math.round(hor(x) - 5 - Math.sin((x - fx) * 0.08) * 3); for (let y = top; y < hor(x); y++) pset(x, y, K.nieblaD); }
    rect(fx - 2, fy - 20, fx + 2, fy - 6, K.nieblaD); rect(fx - 3, fy - 23, fx + 3, fy - 21, K.nieblaD); pset(fx, fy - 25, K.nieblaD);
    const fase = (t % 5) / 5, dest = Math.max(0, 1 - Math.abs(fase - 0.5) * 6);
    rect(fx - 1, fy - 22, fx + 1, fy - 21, d_mezcla(K.nieblaD, hex('#fff2c0'), 0.4 + dest * 0.6));
    const ang = t * 1.25;
    for (let s = 3; s < 70; s++) { const x = Math.round(fx + Math.cos(ang) * s), y = Math.round(fy - 22 + Math.sin(ang) * s * 0.12); if (Math.cos(ang) !== 0 && ((x + y + s) & 1) === 0) pset(x, y, d_mezcla(R.pget(x, y), hex('#f4ecd0'), 0.35 * (1 - s / 70))); }
    if (dest > 0) for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d < 9) { const x = fx + i, y = fy - 22 + j; pset(x, y, d_mezcla(R.pget(x, y), hex('#fff6d8'), dest * 0.6 * (1 - d / 9))); } }
  }
  const ex = Math.round(((90 - dx * 0.6 + t * 2.5) % 420 + 420) % 420 - 50), ey = Math.round(hor(ex));
  rect(ex - 14, ey - 3, ex + 14, ey - 1, K.nieblaD); rect(ex - 4, ey - 7, ex + 4, ey - 4, K.nieblaD); rect(ex - 1, ey - 10, ex + 1, ey - 8, K.nieblaD); linea(ex + 6, ey - 4, ex + 6, ey - 13, K.nieblaD);
  for (let k = 0; k < 2; k++) { const u = (t * 0.06 + k * 0.5) % 1; d_ave(R, 330 - u * 380, 50 + k * 8 + Math.sin(t + k) * 3, t * 0.7, K.nieblaD, k); }
  R.usar(prev);
  // la cubierta fija encima; donde quedó la «clave» entra el fondo tapado por la niebla, que se arrastra con el viento
  R.copiar(d_capa(R, 'oi-cubierta', () => d_cubiertaFijo(R)));
  const B = R.buf, F = fondo, KEY = K.clave, gris = K.niebla;
  for (let y = 0; y < 124; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (B[i] !== KEY) continue;
    const n = d_ruido(x + t * 7, y * 1.6, 436), d = Math.min(0.97, nb * (0.55 + 0.45 * n) + (y > hor(x) ? 0 : 0.1) - (y > hor(x) ? (y - hor(x)) * 0.006 : 0));
    B[i] = d_mezcla(F[i], gris, Math.max(0, d)); }
  // el destello del faro atraviesa la niebla (solo sobre lo que es fondo)
  { const fx = Math.round(160 - dx), fy = Math.round(hor(fx)) - 22, dest = Math.max(0, 1 - Math.abs((t % 5) / 5 - 0.5) * 6);
    if (dest > 0 && fx > -12 && fx < 332) for (let j = -12; j <= 12; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i * 0.8, j), x = fx + i, y = fy + j;
      if (d < 12 && x >= 0 && x < W && y >= 0 && y < 124 && R.pget(x, y) !== 0 && ((x + y) & 1 || d < 4)) { const c = d_capas.get('oi-cubierta')[y * W + x]; if (c === KEY) pset(x, y, d_mezcla(R.pget(x, y), hex('#fff4cc'), dest * (1 - nb * 0.4) * (1 - d / 12))); } } }
  // la gaviota posada en la borda, que gira la cabeza y a ratos se arregla las plumas
  { const gx = 64, gy = 91, mira = Math.sin(t * 0.9) > 0 ? 1 : -1, pica = (t % 7) < 0.6;
    rect(gx - 3, gy - 3, gx + 2, gy - 1, C.blanco); rect(gx - 3, gy - 3, gx + 2, gy - 3, hex('#f4f4f4')); rect(gx - 4, gy - 2, gx - 1, gy - 2, hex('#8a949c')); pset(gx - 5, gy - 2, K.aceroD);
    const cx = gx + (pica ? -1 : 2), cy = gy - (pica ? 3 : 5); rect(cx - 1, cy - 1, cx + 1, cy, C.blanco); pset(cx + mira, cy - 1, K.k); pset(cx + 2 * mira, cy, hex('#e8b030')); pset(gx - 1, gy, hex('#e8a040')); pset(gx + 1, gy, hex('#e8a040')); }
  // el salvavidas colgado de la borda (se mece un poco con el balanceo)
  const sx = 150 + Math.round(rol * 0.3), sy = 104;
  for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j); if (d <= 8 && d >= 4) { const a = Math.atan2(j, i), q = Math.floor(((a + Math.PI) / (Math.PI / 2)) + 0.5) % 4; pset(sx + i, sy + j, d > 7.2 || d < 4.8 ? hex('#8a8a84') : q % 2 ? hex('#c83a2a') : hex('#eeeae0')); } }
  for (const a of [0.8, 2.4, 3.9, 5.5]) pset(Math.round(sx + Math.cos(a) * 8), Math.round(sy + Math.sin(a) * 8), K.cabo); linea(sx, sy - 9, sx, 95, K.caboS);
  // el farol enjaulado de la caseta, con su halo en la niebla
  const fl = 0.85 + 0.15 * Math.sin(t * 6) * Math.sin(t * 2.3);
  for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j); if (d < 14 && ((i + j) & 1) === 0) { const x = 230 + i, y = 70 + j; pset(x, y, d_mezcla(R.pget(x, y), hex('#f4e0a8'), 0.4 * fl * (1 - d / 14))); } }
  rect(227, 66, 233, 74, K.aceroD); rect(228, 67, 232, 73, hex('#f8e4a4')); rect(229, 68, 231, 72, hex('#fff6d8')); for (const y of [69, 71]) rect(227, y, 233, y, K.aceroD); rect(229, 64, 231, 65, K.aceroD);
  // el humo de la chimenea, que la niebla se traga, y el vapor de la sirena cada pocos segundos
  for (let k = 0; k < 10; k++) { const u = ((t * 0.22 + k / 10) % 1), x = Math.round(246 - u * 70 - giro * 14 * u + Math.sin(t * 0.9 + k) * 3), y = Math.round(13 + u * 5 + Math.sin(k * 2 + t * 0.5) * 2);
    if (u < 0.9) disco(x, y, 3 + u * 7, d_mezcla(u < 0.3 ? hex('#4a4a50') : hex('#6a6c72'), gris, Math.min(1, u * 0.9 + nb * 0.25))); }
  const sv = (t % 6.5) / 6.5;
  if (sv < 0.3) for (let k = 0; k < 6; k++) { const u = sv / 0.3 + k * 0.05, x = Math.round(222 - u * 16 - k), y = Math.round(20 - u * 8 + Math.sin(k) * 2); if (u < 1.2) disco(x, y, 1 + u * 3, d_mezcla(C.blanco, gris, u * 0.6)); }
  // la última niebla, que pasa por delante de todo en jirones
  for (let y = 0; y < 180; y++) for (let x = 0; x < W; x++) { const n = d_ruido(x * 0.7 - t * 11, y * 2.2 + 40, 437); if (n > 0.55) { const i = y * W + x, a = (n - 0.55) * 1.3 * nb * (y < 124 ? 1 : 0.7); if (a > 0.04) B[i] = d_mezcla(B[i], K.nieblaL, Math.min(0.6, a)); } }
  d_rooseveltDelante(R, t, { encuadre: 'cubierta', niebla: nb });
  return { suelo: 150, marinero: [140, 150], libre: [70, 132, 190, 179], borda: 92, salvavidas: [sx, sy], chimenea: [244, 16], puerta: [244, 78, 266, 121], farol: [230, 70],
    faro: [Math.round(160 - dx), Math.round(84 + rol) - 22], horizonte: Math.round(84 + rol), bitas: [37, 146], adujada: [286, 166] };
}

// lo que va por delante de los personajes en los tres encuadres (la escena lo llama después de sus actores): en el
// despacho, la palmera en su macetero (izquierda, x 0–30) y el sillón Chester (derecha, x 266–319, desde y 136); en
// Campobello, matas de hierba y lupinos de los bordes de abajo, que se mecen, y la mariposa; en la cubierta, nada fijo
// (las bitas y la adujada son suelo), solo un jirón de niebla bajo. o.encuadre como en roosevelt.
export function d_rooseveltDelante(R, t, o = {}) {
  const { pset, rect, linea, disco, poligono } = R, K = d_C, enc = o.encuadre ?? 'bufete';
  if (enc === 'bufete') {
    // la palmera de salón: macetero de latón y frondas que se mecen con el aire del ventilador
    for (let f = 0; f < 7; f++) { const a = -2.6 + f * 0.42 + Math.sin(t * 1.3 + f) * 0.05, L = 30 + (f % 3) * 6;
      for (let s = 0; s < L; s++) { const u = s / L, x = Math.round(14 + Math.cos(a) * s), y = Math.round(150 + Math.sin(a) * s + u * u * 16);
        pset(x, y, C.hierbaS); if (s > 4 && s % 2 === 0) { const lh = Math.round(5 * Math.sin(u * Math.PI)); linea(x, y, x - Math.round(Math.sin(a) * lh) + 1, y + lh, s % 4 ? C.hierba : C.hierbaD); linea(x, y, x + Math.round(Math.sin(a) * lh) + 2, y + lh - 1, C.hierbaS); } } }
    rect(4, 154, 24, 176, C.oroS); rect(5, 155, 23, 175, C.oro); rect(5, 155, 7, 175, C.oroL); rect(20, 155, 23, 175, C.oroS); rect(2, 152, 26, 155, C.oroS); rect(3, 152, 25, 152, C.oroL);
    for (let x = 8; x < 20; x += 4) rect(x, 162, x + 1, 168, C.oroS); rect(6, 176, 22, 178, K.caoD);
    // el sillón Chester de cuero granate, de espaldas a un lado, con su capitoné
    poligono([[268, 140], [319, 136], [319, 179], [262, 179]], K.chesterS); poligono([[270, 142], [319, 139], [319, 160], [266, 162]], K.chester);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const x = 274 + i * 8 + (j & 1) * 4, y = 145 + j * 5 - Math.round(i * 0.4); pset(x, y, K.chesterS); pset(x - 1, y - 1, K.chesterL); }
    rect(262, 160, 319, 170, K.chesterL); rect(262, 160, 319, 160, hex('#a85a3e')); for (let x = 264; x < 319; x += 3) pset(x, 170, C.oroS);
    rect(262, 171, 319, 179, K.chesterS); disco(266, 166, 5, K.chester); disco(265, 165, 3, K.chesterL); rect(268, 177, 272, 179, K.caoD);
  } else if (enc === 'campobello') {
    for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 438) * 320), lado = x < 60 || x > 270, y = lado ? 150 + Math.round(h(k, 2, 438) * 28) : 172 + Math.round(h(k, 2, 438) * 7), hgt = 4 + Math.round(h(k, 3, 438) * 6), sw = Math.sin(t * 2.2 + x * 0.1);
      for (let i = 0; i < hgt; i++) pset(Math.round(x + sw * i / hgt * 2), y - i, i > hgt - 2 ? K.cespedL : i % 2 ? K.cesped : K.cespedS); }
    for (let k = 0; k < 9; k++) { const x = k < 5 ? 6 + k * 11 : 262 + (k - 5) * 13, y = 166 + (k % 3) * 4, sw = Math.round(Math.sin(t * 1.8 + k) * 1.4), c = k % 3 === 2 ? K.lupinoR : K.lupino;
      linea(x, y, x + sw, y - 16, K.cespedD); for (let i = 0; i < 10; i++) { const yy = y - 6 - i, xx = x + Math.round(sw * (i + 6) / 16); pset(xx - 1, yy, i % 2 ? c : K.lupinoL); pset(xx + 1, yy, c); if (i < 7) pset(xx, yy, c); } pset(x + sw, y - 17, K.lupinoL);
      linea(x - 3, y - 2, x, y - 4, K.cesped); linea(x + 3, y - 2, x, y - 4, K.cesped); }
    const bx = Math.round(40 + Math.sin(t * 0.7) * 26), by = Math.round(146 + Math.sin(t * 1.9) * 6), al = Math.sin(t * 16) > 0;
    pset(bx, by, K.k); pset(bx - 1, by - (al ? 1 : 0), hex('#f0b030')); pset(bx + 1, by - (al ? 1 : 0), hex('#f0b030')); if (al) { pset(bx - 2, by - 1, hex('#f0b030')); pset(bx + 2, by - 1, hex('#f0b030')); }
  } else {
    const nb = o.niebla ?? 0.75;
    for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) { const n = d_ruido(x * 0.5 + t * 14, y * 3, 439); if (n > 0.6 && ((x + y) & 1)) pset(x, y, d_mezcla(R.pget(x, y), K.nieblaL, (n - 0.6) * nb * 1.2)); }
  }
}

// las capas fijas de los encuadres: se pintan una vez en un búfer y se copian en cada fotograma
const e_capas = new Map();

function e_capa(R, k, pintar) {
  let b = e_capas.get(k);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); pintar(); R.usar(prev); e_capas.set(k, b); }
  return b;
}

// mezcla de dos colores (k = 0 el primero, 1 el segundo)
function e_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// oscurece (f > 0) o aclara con luz cálida (f < 0) lo ya pintado en un rectángulo; tram: solo uno de cada dos píxeles
function e_tinte(R, x0, y0, x1, y1, f, tram = false) {
  const N = hex('#140c08'), L = hex('#ffe6b0');
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    if (tram && ((x + y) & 1)) continue; const c = R.pget(x, y); if (c) R.pset(x, y, f > 0 ? e_mezcla(c, N, f) : e_mezcla(c, L, -f));
  }
}

// rectángulo que respeta R.recorte (R.rect no lo respeta)
function e_rc(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); }

// la llama de una vela que tiembla, con su halo (x, y: la base de la llama)
function e_llama(R, x, y, t, k = 0, r = 16) {
  const f = Math.sin(t * 9 + k * 3) + Math.sin(t * 13.7 + k), dx = f > 1.2 ? 1 : f < -1.2 ? -1 : 0, alta = Math.sin(t * 7 + k * 2) > 0 ? 1 : 0;
  R.halo(x, y - 3, r + (alta ? 1 : 0), [hex('#8a5a2a'), hex('#c8884a'), hex('#f0c070')], 0.75);
  R.pset(x + dx, y - 4 - alta, hex('#fff2c0')); R.rect(x, y - 3, x, y - 1, hex('#ffd060')); R.pset(x + dx, y - 3, hex('#fff8e0'));
  R.pset(x - 1, y - 1, hex('#f08a30')); R.pset(x + 1, y - 1, hex('#f08a30')); R.pset(x, y, hex('#3a2a20'));
}

// una araña colgada de su hilo que sube y baja (x, y0: de dónde cuelga)
function e_arana(R, x, y0, t, largo = 10, k = 0) {
  const y = Math.round(y0 + largo * (0.55 + 0.45 * Math.sin(t * 0.7 + k))), dx = Math.round(Math.sin(t * 1.3 + k) * 0.6);
  for (let j = y0; j < y - 1; j++) if ((j & 1) === 0) R.pset(x + Math.round(dx * (j - y0) / Math.max(1, y - y0)), j, hex('#b8b0a4'));
  const X = x + dx, P = hex('#1e1612'), pa = Math.sin(t * 6 + k) > 0 ? 1 : 0;
  R.rect(X - 1, y, X + 1, y + 2, P); R.pset(X, y - 1, P);
  for (const s of [-1, 1]) { R.pset(X + 2 * s, y - pa, P); R.pset(X + 3 * s, y - 1 - pa, P); R.pset(X + 2 * s, y + 2, P); R.pset(X + 3 * s, y + 3 + pa, P); R.pset(X + 2 * s, y + 1, P); }
  R.pset(X, y, hex('#6a4a3a'));
}

// una telaraña en un rincón (cx, cy: el rincón; dir: hacia dónde se abre)
function e_telarana(R, cx, cy, r, dx, dy) {
  const T = hex('#c8c0b4');
  const rayos = [0, 0.33, 0.66, 1].map((u) => [Math.cos(u * Math.PI / 2) * dx, Math.sin(u * Math.PI / 2) * dy]);
  for (const [ex, ey] of rayos) R.linea(cx, cy, cx + ex * r, cy + ey * r, (x, y, k) => (k % 2 ? null : T));
  for (const f of [0.35, 0.65, 0.95]) for (let i = 0; i < 3; i++) { const [ax, ay] = rayos[i], [bx, by] = rayos[i + 1]; R.linea(cx + ax * r * f, cy + ay * r * f, cx + (ax + bx) / 2 * r * f * 0.86, cy + (ay + by) / 2 * r * f * 0.86, T); R.linea(cx + (ax + bx) / 2 * r * f * 0.86, cy + (ay + by) / 2 * r * f * 0.86, cx + bx * r * f, cy + by * r * f, T); }
}

// un lomo de libro sin letras (dos bandas doradas y el canto de luz)
function e_libro(R, x, yb, w, alto, c, k) {
  const L = e_mezcla(c, hex('#ffffff'), 0.3), S = e_mezcla(c, hex('#000000'), 0.35);
  R.rect(x, yb - alto + 1, x + w - 1, yb, c); R.rect(x, yb - alto + 1, x, yb, L); if (w > 2) R.rect(x + w - 1, yb - alto + 1, x + w - 1, yb, S);
  R.rect(x, yb - alto + 2, x + w - 1, yb - alto + 2, hex('#d8b050')); if (h(k, 2, 430) < 0.6) R.rect(x, yb - 2, x + w - 1, yb - 2, hex('#c8a040'));
  R.rect(x, yb - alto + 1, x + w - 1, yb - alto + 1, S);
}

// un libro tumbado visto de canto (las hojas claras a un lado)
function e_libroTumbado(R, x0, x1, y, c) {
  R.rect(x0, y, x1, y + 2, c); R.rect(x0 + 1, y + 1, x1, y + 1, hex('#efe2c4')); R.rect(x0, y, x1, y, e_mezcla(c, hex('#ffffff'), 0.3)); R.pset(x0, y + 1, c);
}

const E_AG = { x: 160, y: 146, rx: 26, ry: 8 };   // el agujero del suelo

const E_VEN = [160, 57];                          // el ventanuco redondo

function e_desvan(R, t, o) {
  R.copiar(e_capa(R, 'desvan', () => e_desvanFijo(R)));
  const { pset, rect, disco, linea } = R, [wx, wy] = E_VEN;
  // el cielo por el ventanuco: la tarde, dos capas de nubes a distinta velocidad, una gaviota y el mar con la islita
  R.recorte([wx - 12, wy - 12, wx + 12, wy + 12]);
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) {
    if (i * i + j * j > 132) continue; const x = wx + i, y = wy + j;
    let c;
    if (j < 5) { const u = (j + 12) / 17; c = u < 0.35 ? hex('#7ab0dc') : u < 0.6 ? hex('#9cc4e4') : u < 0.85 ? hex('#d8d4c8') : hex('#f4d8a8'); if (h(x, y, 440) < 0.25 && u > 0.3 && u < 0.9) c = u < 0.6 ? hex('#8abade') : hex('#e8d8b8'); }
    else { c = j === 5 ? hex('#6a8aa0') : (j & 1) ? hex('#2e5a7a') : hex('#3a6a8a'); if (j > 5 && Math.sin(x * 0.9 + t * 3 + j * 2) > 0.85) c = hex('#a8d0e8'); }
    pset(x, y, c);
  }
  // la islita de robles en el horizonte
  for (let i = -4; i <= 5; i++) { const ht = Math.round(2.4 * Math.cos(i / 5.5 * Math.PI / 2)) + (h(i, 1, 441) > 0.5 ? 1 : 0); rect(wx + 4 + i, wy + 5 - ht, wx + 4 + i, wy + 4, hex('#2e4a32')); }
  pset(wx + 2, wy + 1, hex('#3e5e3a')); pset(wx + 5, wy, hex('#3e5e3a'));
  // nubes de tres tonos: unas lentas arriba, otras más rápidas abajo
  for (const [v, y0, w, k] of [[1.1, wy - 8, 9, 0], [2.3, wy - 2, 7, 1], [1.1, wy - 6, 6, 2]]) {
    const cx = wx - 20 + ((t * v + k * 17) % 44);
    for (const [ddx, ddy, rr] of [[-w * 0.4, 1, w * 0.3], [0, 0, w * 0.42], [w * 0.38, 1, w * 0.3]]) disco(cx + ddx, y0 + ddy + 1, rr, hex('#b8c4d4'));
    for (const [ddx, ddy, rr] of [[-w * 0.4, 1, w * 0.3], [0, 0, w * 0.42], [w * 0.38, 1, w * 0.3]]) disco(cx + ddx, y0 + ddy, rr * 0.9, hex('#e4ecf4'));
    disco(cx - 1, y0 - 1, w * 0.22, hex('#ffffff'));
  }
  { const u = (t % 9) / 9, gx = Math.round(wx + 16 - u * 34), gy = Math.round(wy - 3 + Math.sin(u * 6) * 2), a = Math.sin(t * 8) > 0 ? -1 : 0;
    pset(gx, gy, hex('#3a3a44')); pset(gx - 1, gy + a, hex('#3a3a44')); pset(gx + 1, gy + a, hex('#3a3a44')); pset(gx - 2, gy - 1 - a, hex('#5a5a64')); pset(gx + 2, gy - 1 - a, hex('#5a5a64')); }
  R.recorte(null);
  // el crucero del ventanuco y los reflejos del cristal
  rect(wx - 12, wy, wx + 12, wy, hex('#4a3020')); rect(wx, wy - 12, wx, wy + 12, hex('#4a3020')); rect(wx - 11, wy + 1, wx + 11, wy + 1, hex('#2a1a10'));
  for (let k = 0; k < 4; k++) pset(wx - 8 + k, wy - 4 - k, hex('#f4f8fc')); pset(wx - 6, wy - 9, hex('#f4f8fc')); pset(wx + 5, wy + 8, hex('#c8dcec'));
  // las motas de polvo que flotan en el haz de luz
  for (let k = 0; k < 18; k++) { const u = ((h(k, 1, 442) + t * (0.02 + h(k, 2, 442) * 0.03)) % 1), x = Math.round(150 + u * 42 - 8 + Math.sin(t * 0.6 + k) * 6 + h(k, 3, 442) * 14 * (u + 0.2)), y = Math.round(60 + u * 70 + Math.sin(t * 0.9 + k * 2) * 3);
    if (Math.sin(t * 2 + k * 1.7) > -0.3) pset(x, y, Math.sin(t * 3 + k) > 0.4 ? hex('#fff6d8') : hex('#e8c890')); }
  // las velas: en la librería, en el escritorio y en el barril
  e_llama(R, 80, 58, t, 0, 14); e_llama(R, 272, 80, t, 1, 15); e_llama(R, 21, 82, t, 2, 14);
  // el farol de aceite que se mece colgado de la viga
  { const sw = Math.sin(t * 1.25) * 2.2, lx = Math.round(210 + sw), ly = 50;
    for (let j = 39; j < ly - 4; j++) pset(Math.round(210 + sw * (j - 39) / (ly - 43)), j, (j & 1) ? hex('#2a2018') : hex('#6a5a48'));
    R.halo(lx, ly + 2, 17, [hex('#7a5028'), hex('#b07a40'), hex('#e8b060')], 0.7);
    rect(lx - 3, ly - 4, lx + 3, ly - 3, hex('#2a2018')); rect(lx - 2, ly - 5, lx + 2, ly - 5, hex('#4a3a2a')); rect(lx - 4, ly - 2, lx + 4, ly + 7, hex('#2a2018'));
    rect(lx - 3, ly - 1, lx + 3, ly + 6, hex('#f0c060')); rect(lx - 3, ly - 1, lx - 3, ly + 6, hex('#fff0b0')); rect(lx + 2, ly + 2, lx + 3, ly + 6, hex('#d8983a'));
    rect(lx, ly - 1, lx, ly + 6, hex('#2a2018')); const fl = Math.sin(t * 11) > 0 ? 1 : 0; pset(lx - 1, ly + 2 - fl, hex('#ffffff')); pset(lx - 1, ly + 3, hex('#fff6c0'));
    rect(lx - 4, ly + 7, lx + 4, ly + 8, hex('#4a3a2a')); rect(lx - 3, ly + 8, lx + 3, ly + 8, hex('#7a6a50')); }
  // una polilla que revolotea alrededor del farol
  { const px = Math.round(210 + Math.cos(t * 2.7) * 9 + Math.sin(t * 7) * 1.5), py = Math.round(53 + Math.sin(t * 3.9) * 6), a = Math.sin(t * 30) > 0;
    pset(px, py, hex('#d8ccb0')); pset(px - 1, py - (a ? 1 : 0), hex('#b8ac90')); pset(px + 1, py - (a ? 1 : 0), hex('#b8ac90')); }
  // la araña que baja de la viga
  e_arana(R, 140, 39, t, 9);
  // los destellos: la moneda en la rendija del cofre, el collar de la dama y la visera del yelmo
  { const b = (t * 0.8) % 3; if (b < 0.5) { const s = b < 0.25 ? 2 : 1; const X = 103, Y = 95; for (let k = 1; k <= s; k++) { pset(X - k, Y, hex('#fff8d0')); pset(X + k, Y, hex('#fff8d0')); pset(X, Y - k, hex('#fff8d0')); pset(X, Y + k, hex('#fff8d0')); } pset(X, Y, hex('#ffffff')); } }
  for (const [x, y, k] of [[247, 79, 0], [250, 80, 1], [253, 79, 2]]) if (Math.sin(t * 3 + k * 2.1) > 0.7) { pset(x, y, hex('#ffffff')); pset(x, y - 1, hex('#fff0c0')); }
  { const gx = Math.round(194 + ((t * 7) % 40)); if (gx <= 211) for (let y = 82; y <= 96; y++) { const x = gx + Math.round((y - 82) * 0.2); if (x >= 195 && x <= 211 && (y < 86 || y > 87) && Math.abs(x - 203) > 1) pset(x, y, hex('#f4f8fc')); } }
  // la esquina del mapa, que se levanta con la corriente del ventanuco
  { const a = Math.sin(t * 1.7) + 0.5 * Math.sin(t * 4.3), n = a > 0.6 ? 3 : a > 0 ? 2 : 1;
    for (let k = 0; k < n; k++) { rect(130 - k, 76 - n + k, 130, 76 - n + k, hex('#c8aa70')); pset(130 - k, 77 - n + k, hex('#8a6a3a')); }
    if (n > 1) { pset(131, 77, hex('#5a3e28')); pset(131, 78, hex('#5a3e28')); } }
  // el destello dorado que late en el fondo del agujero
  if (o.brillo !== false) { const b = 0.5 + 0.5 * Math.sin(t * 1.6); for (let k = 0; k < 5; k++) { const x = E_AG.x - 12 + Math.round(h(k, 1, 443) * 24), y = E_AG.y + 2 + Math.round(h(k, 2, 443) * 4); if (Math.sin(t * 2.3 + k * 1.9) > 0.55 - b * 0.4) pset(x, y, k % 2 ? hex('#c8902c') : hex('#f0c850')); } }
  return { suelo: 160, agujero: { ...E_AG }, topo: [E_AG.x, E_AG.y + 2], ventana: [wx, wy, 12], cofre: [109, 112], yelmo: [203, 89], mapa: [111, 63], escritorio: [256, 95], retrato: [250, 74], libreria: [65, 90] };
}

// el borde de delante del agujero: vuelve a pintar el suelo que tapa lo que se mete en el agujero (la escena lo llama
// después de pintar lo que cae dentro y el topo, y antes que los personajes que estén delante)
export function e_bordeAgujero(R) {
  const b = e_capas.get('desvan'); if (!b) return; const { x: cx, y: cy, rx, ry } = E_AG;
  for (let y = cy + 1; y <= cy + ry + 28; y++) for (let x = cx - rx - 3; x <= cx + rx + 3; x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > 1.04) R.pset(x, y, b[y * 320 + x]);
  }
}

// lo fijo del desván: techo, paredes y suelo en perspectiva, y todos los muebles y objetos
function e_desvanFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  const NEG = hex('#140c08'), LZ = hex('#ffe2a8');
  const T = [hex('#4e3524'), hex('#46301f'), hex('#563b28')], TG = hex('#24160c'), RAF = hex('#38261a'), RAFL = hex('#6a4c34'), PUR = hex('#3e2a1c'), PURL = hex('#76563a');
  const W = [hex('#8a6240'), hex('#7c5636'), hex('#946c48')], WG = hex('#3a2416'), WL = hex('#b08458'), WS = hex('#5e3e24');
  const S = [hex('#94704a'), hex('#86623e'), hex('#9c7850')], SG = hex('#3a2616'), SL = hex('#c09a6a'), SS = hex('#6a4a2e');
  // techo, hastial, paredes laterales y suelo, píxel a píxel (punto de fuga en 160, 80)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dx = x - 160, ax = Math.abs(dx), dy = y - 80, lateral = ax > 120;
    const yHast = 2 + ax * 68 / 120, yk = 80 - ax / 12, yf = 80 + ax * 32 / 120;
    const techo = lateral ? y < yk : y < yHast, suelo = lateral ? y >= yf : y >= 112;
    let c, osc = 0, luz = 0;
    if (techo) {
      const k = (68 * ax - 120 * dy) / 9360, ag = ax / k, tb = Math.floor(ag / 6), fr = ag - tb * 6;
      c = T[Math.floor(h(tb, 3, 401) * 3)];
      if (fr * k < 1) c = TG; else if (h(tb, Math.floor(k * 30), 402) < 0.16) c = T[1]; else if (h(tb, Math.floor(k * 22), 403) < 0.05) c = RAFL;
      const rf = ag % 30; if (rf < 3.4) c = rf * k < 1.2 ? RAFL : rf > 2.6 ? TG : RAF;
      for (const [k0, k1] of [[1.42, 1.58], [2.15, 2.4]]) if (k >= k0 && k <= k1) c = (k - k0) * 120 / Math.max(1, ax) < 0.02 || k - k0 < 0.02 ? PURL : k1 - k < 0.03 ? TG : PUR;
      osc = Math.min(0.55, (k - 1) * 0.3) + (x > 266 && y < 50 ? 0.18 : 0) + (y < 16 ? 0.12 : 0);
    } else if (!suelo && !lateral) {
      const tb = Math.floor((x - 40) / 9), p = (x - 40) - tb * 9;
      c = W[Math.floor(h(tb, 1, 410) * 3)];
      const vy = Math.floor((y + h(tb, 2, 411) * 30) / 4); if (h(x, vy, 412) < 0.1) c = WS; else if (h(x, vy, 413) < 0.04) c = WL;
      if (p === 0) c = WG; else if (p === 1) c = WL; else if (p === 8) c = WS;
      osc = (y < 46 ? (46 - y) / 46 * 0.45 : 0) + Math.max(0, 1 - (x - 40) / 26) * 0.3 + Math.max(0, 1 - (280 - x) / 26) * 0.3 + (y > 102 ? (y - 102) / 10 * 0.4 : 0) + Math.max(0, 1 - (y - yHast) / 5) * 0.3;
      const dv = Math.hypot(x - 160, (y - 57) * 1.2); if (dv < 84) luz = (1 - dv / 84) * 0.34;
    } else if (!suelo) {
      const kw = ax / 120, tb = Math.floor(kw / 0.045), fr = kw - tb * 0.045;
      c = W[Math.floor(h(tb, 5, 414) * 3)]; if (fr < 1 / 120) c = WG; else if (fr < 2 / 120) c = WL; else if (h(x, Math.floor(y / 5), 415) < 0.08) c = WS;
      osc = 0.32 + (kw - 1) * 0.5 + Math.max(0, 1 - (y - yk) / 4) * 0.3 + Math.max(0, 1 - (yf - y) / 6) * 0.3;
    } else {
      const D = 32 / (y - 80), u = 160 + dx * D, tb = Math.floor(u / 7), fr = u - tb * 7;
      c = S[Math.floor(h(tb, 1, 420) * 3)];
      const D1 = 32 / (y + 1 - 80), len = 0.2 + h(tb, 3, 421) * 0.12, off = h(tb, 4, 422);
      if (fr < D) c = SG; else if (fr < 2 * D) c = SL;
      else if (Math.floor(D / len + off) !== Math.floor(D1 / len + off)) c = SG;
      else { const g = h(Math.floor(u * 1.4), Math.floor(D * 16 + h(tb, 5, 423) * 6), 424); if (g < 0.12) c = SS; else if (g > 0.96) c = SL; }
      osc = (!lateral && y < 119 ? (119 - y) / 7 * 0.45 : 0) + (lateral ? Math.max(0, 1 - (y - yf) / 8) * 0.4 : 0) + (ax / 160) ** 2 * 0.4 + (y > 166 ? (y - 166) / 14 * 0.15 : 0);
      const dl = ((x - 152) / 54) ** 2 + ((y - 128) / 13) ** 2; if (dl < 1) luz = (1 - dl) * ((x + y) & 1 ? 0.3 : 0.42);
    }
    if (osc > 0) c = e_mezcla(c, NEG, Math.min(0.8, osc)); if (luz > 0) c = e_mezcla(c, LZ, luz);
    pset(x, y, c);
  }
  // algunos nudos en las tablas del hastial
  for (const [x, y] of [[64, 96], [118, 52], [196, 64], [232, 100], [150, 92], [268, 76]]) { rect(x - 2, y, x + 2, y, WS); rect(x - 1, y - 1, x + 1, y + 1, WS); pset(x, y, WG); }
  // la viga de atar con el pendolón y sus herrajes, y su sombra en la pared
  e_tinte(R, 104, 39, 216, 41, 0.35);
  rect(103, 32, 217, 38, hex('#5a3c24')); rect(103, 32, 217, 32, hex('#8a6440')); rect(103, 33, 217, 33, hex('#6e4c30')); rect(103, 38, 217, 38, hex('#2e1c10'));
  for (let k = 0; k < 22; k++) { const x = 104 + Math.round(h(k, 1, 450) * 106), y = 34 + Math.round(h(k, 2, 450) * 3); rect(x, y, x + 3 + Math.round(h(k, 3, 450) * 8), y, hex('#4a3020')); }
  rect(156, 0, 163, 31, hex('#4e3422')); rect(156, 0, 156, 31, hex('#6e5034')); rect(163, 0, 163, 31, hex('#2e1c10'));
  for (let y = 3; y < 30; y += 5) rect(158, y, 160, y, hex('#3e2818'));
  for (const x0 of [152, 162]) { rect(x0, 30, x0 + 5, 40, hex('#2a2a30')); pset(x0 + 1, 32, hex('#8a8a90')); pset(x0 + 4, 38, hex('#8a8a90')); }
  rect(103, 32, 104, 38, hex('#7a5a3a')); rect(216, 32, 217, 38, hex('#3e2818'));
  // el ventanuco redondo: el aro de madera con luz arriba a la izquierda y sus clavos (el cristal es animado)
  disco(160.5, 57.5, 16, hex('#24160c'));
  disco(160.5, 57.5, 15, (x, y) => { const a = (x - 160) + (y - 57); return a < -8 ? hex('#a8794a') : a < 4 ? hex('#7e5636') : hex('#5a3a22'); });
  disco(160.5, 57.5, 13, hex('#2a1a10'));
  for (const [x, y] of [[149, 46], [171, 46], [149, 68], [171, 68]]) pset(x, y, hex('#c8c0b0'));
  // telarañas en los rincones
  e_telarana(R, 41, 71, 11, 1, 1); e_telarana(R, 279, 71, 10, -1, 1); e_telarana(R, 105, 39, 8, 1, 1); e_telarana(R, 215, 39, 7, -1, 1);
  // la luz del ventanuco: el haz tramado que baja hasta el suelo
  for (let y = 66; y < 136; y++) { const u = (y - 66) / 70, xa = Math.round(150 - u * 44), xb = Math.round(172 + u * 26);
    for (let x = xa; x <= xb; x++) if (((x + y * 3) % 5) === 0) { const c = R.pget(x, y); R.pset(x, y, e_mezcla(c, LZ, 0.16)); } }
  // ── la librería de la izquierda
  { const x0 = 46, x1 = 84, y0 = 66, M = hex('#4a2e1a'), ML = hex('#7a5232'), F = hex('#2a1a0e');
    e_tinte(R, x1 + 1, y0 + 2, x1 + 3, 112, 0.35);
    rect(x0, y0, x1, 112, M); rect(x0 + 2, y0 + 2, x1 - 2, 108, F); rect(x0, y0, x1, y0, ML); rect(x0, y0, x0, 112, ML); rect(x0 - 1, y0 - 1, x1 + 1, y0, hex('#5a3a22'));
    for (const ys of [77, 88, 99]) { rect(x0 + 2, ys, x1 - 2, ys + 1, M); rect(x0 + 2, ys, x1 - 2, ys, ML); }
    rect(x0, 108, x1, 112, M); rect(x0 + 1, 109, x1 - 1, 109, ML);
    const COL = [hex('#8a2a2a'), hex('#2e5a3a'), hex('#2a3a6a'), hex('#6a4a2a'), hex('#a8803a'), hex('#5a2a4a'), hex('#3a5a5a')];
    // balda 1: libros, uno inclinado y un globo terráqueo
    let x = x0 + 3; for (let k = 0; k < 8 && x < 72; k++) { const w = 2 + Math.round(h(k, 1, 451) * 2), al = 6 + Math.round(h(k, 2, 451) * 3); e_libro(R, x, 76, w, al, COL[k % 7], k); x += w; }
    linea(x + 1, 76, x + 4, 70, COL[2]); linea(x + 2, 76, x + 5, 70, COL[2]); linea(x + 3, 76, x + 6, 70, hex('#4a5a8a'));
    disco(79, 72, 3.5, hex('#3a6a9a')); pset(78, 71, hex('#6a9a4a')); pset(80, 73, hex('#6a9a4a')); pset(79, 70, hex('#6a9a4a')); pset(77, 70, hex('#a8d0f0')); rect(79, 76, 79, 76, hex('#c8a040')); rect(77, 76, 81, 76, hex('#8a6a2a'));
    // balda 2: el barco en la botella tumbada y libros
    { const bx = 50, by = 84; rect(bx, by - 3, bx + 14, by + 2, hex('#2a4a3a')); rect(bx + 1, by - 2, bx + 13, by + 1, hex('#5a8a7a')); rect(bx + 15, by - 1, bx + 18, by, hex('#2a4a3a')); rect(bx + 19, by - 1, bx + 19, by, hex('#a87a4a'));
      rect(bx + 3, by, bx + 11, by + 1, hex('#6a3a1a')); rect(bx + 5, by - 2, bx + 5, by - 1, hex('#f0ecdc')); rect(bx + 8, by - 2, bx + 9, by - 1, hex('#f0ecdc')); pset(bx + 7, by - 2, hex('#4a2a1a'));
      rect(bx + 1, by - 2, bx + 12, by - 2, hex('#a8d8c8')); rect(bx, by + 3, bx + 15, by + 3, hex('#1a1008')); }
    x = 70; for (let k = 0; k < 4; k++) { const w = 2 + Math.round(h(k, 3, 451)), al = 7 + Math.round(h(k, 4, 451) * 2); e_libro(R, x, 87, w, al, COL[(k + 3) % 7], k + 10); x += w; }
    // balda 3: el reloj de arena y libros tumbados
    x = 49; for (let k = 0; k < 5; k++) { const w = 2 + Math.round(h(k, 5, 451) * 2), al = 6 + Math.round(h(k, 6, 451) * 3); e_libro(R, x, 98, w, al, COL[(k + 5) % 7], k + 20); x += w; }
    e_libroTumbado(R, 63, 74, 96, COL[0]); e_libroTumbado(R, 64, 73, 93, COL[4]);
    { const hx = 78; rect(hx - 3, 90, hx + 3, 90, hex('#7a5232')); rect(hx - 3, 98, hx + 3, 98, hex('#7a5232')); for (let j = 0; j < 7; j++) { const w = Math.abs(j - 3); rect(hx - w, 91 + j, hx + w, 91 + j, hex('#c8dce4')); } rect(hx - 2, 91, hx + 2, 92, hex('#e0c080')); rect(hx - 3, 96, hx + 3, 97, hex('#e0c080')); pset(hx, 94, hex('#e0c080')); rect(hx - 3, 90, hx - 3, 98, hex('#4a2e1a')); rect(hx + 3, 90, hx + 3, 98, hex('#4a2e1a')); }
    // balda 4: libros altos
    x = 49; for (let k = 0; k < 11 && x < 82; k++) { const w = 2 + Math.round(h(k, 7, 451) * 2), al = 6 + Math.round(h(k, 8, 451) * 2); e_libro(R, x, 107, w, al, COL[(k + 1) % 7], k + 30); x += w + (k === 5 ? 1 : 0); }
    // encima: rollos de mapas y la vela en su palmatoria
    for (const [rx, ry, l] of [[48, 63, 12], [50, 60, 10]]) { rect(rx, ry, rx + l, ry + 2, hex('#e0c890')); rect(rx, ry + 2, rx + l, ry + 2, hex('#b89a60')); rect(rx + l, ry, rx + l, ry + 2, hex('#a88a50')); pset(rx + l, ry + 1, hex('#6a4a2a')); rect(rx + 3, ry, rx + 3, ry + 2, hex('#a83a2a')); }
    rect(76, 64, 84, 65, hex('#a8802c')); rect(77, 64, 83, 64, hex('#e8c060')); rect(79, 58, 81, 63, hex('#f0e6cc')); rect(81, 59, 81, 63, hex('#c8bca0')); pset(79, 60, hex('#ffffff')); pset(78, 61, hex('#f0e6cc'));
  }
  // ── el mapa de piratas clavado (sin letras): la isla, el camino de puntos, la X y la rosa de los vientos
  { const x0 = 92, x1 = 131, y0 = 48, y1 = 77;
    e_tinte(R, x0 + 2, y0 + 2, x1 + 2, y1 + 2, 0.3);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const borde = Math.min(x - x0, x1 - x, y - y0, y1 - y), roto = h(x, y, 452) * 2.2;
      if (borde < roto - 0.6) continue;
      const m = h(x >> 2, y >> 2, 453) * 0.6 + h(x, y, 454) * 0.4; let c = m < 0.2 ? hex('#d8bc84') : m > 0.85 ? hex('#f0dcaa') : hex('#e6cf98');
      if (borde < roto + 0.6) c = hex('#a8804a'); pset(x, y, c);
    }
    // el mar con olitas, la isla con sus árboles, el camino y la X
    for (const [x, y] of [[96, 54], [124, 70], [98, 70], [118, 52]]) { pset(x, y, hex('#5a7a8a')); pset(x + 1, y - 1, hex('#5a7a8a')); pset(x + 2, y, hex('#5a7a8a')); pset(x + 3, y - 1, hex('#5a7a8a')); }
    disco(108, 63, 7, hex('#6a4a2a')); disco(116, 62, 5.5, hex('#6a4a2a')); disco(108, 63, 6, hex('#c4b070')); disco(116, 62, 4.5, hex('#c4b070'));
    for (const [x, y] of [[105, 60], [109, 59], [104, 65], [117, 60], [113, 66]]) { pset(x, y, hex('#4a6a3a')); pset(x + 1, y, hex('#4a6a3a')); pset(x, y - 1, hex('#6a8a4a')); }
    for (let k = 0; k < 6; k++) pset(102 + k * 2, 70 - k, hex('#b03030'));
    for (let k = -2; k <= 2; k++) { pset(113 + k, 63 + k, hex('#b02020')); pset(113 + k, 63 - k, hex('#b02020')); }
    // la rosa de los vientos
    { const cx = 125, cy = 54; linea(cx, cy - 4, cx, cy + 4, hex('#6a4a2a')); linea(cx - 4, cy, cx + 4, cy, hex('#6a4a2a')); pset(cx - 1, cy - 1, hex('#6a4a2a')); pset(cx + 1, cy + 1, hex('#6a4a2a')); pset(cx + 1, cy - 1, hex('#6a4a2a')); pset(cx - 1, cy + 1, hex('#6a4a2a')); pset(cx, cy - 4, hex('#b03030')); pset(cx, cy - 5, hex('#b03030')); }
    // las chinchetas
    for (const [x, y] of [[94, 50], [129, 50], [94, 75]]) { disco(x + 0.5, y + 0.5, 1.6, hex('#8a1a1a')); pset(x, y, hex('#e85a4a')); pset(x + 1, y + 2, hex('#2a1a10')); }
  }
  // ── el cofre de hierro con la bandera pirata doblada encima
  { const x0 = 92, x1 = 127, M = hex('#7a4a26'), ML = hex('#a06a3a'), MS = hex('#5a3418'), FE = hex('#4a4a54'), FEL = hex('#8a8a96');
    e_tinte(R, x0 - 2, 109, x1 + 5, 114, 0.45); e_tinte(R, x1 + 1, 88, x1 + 3, 112, 0.3);
    // el cuerpo de tablas
    rect(x0, 96, x1, 111, hex('#2a1a0e')); rect(x0 + 1, 97, x1 - 1, 110, M);
    for (const y of [101, 106]) { rect(x0 + 1, y, x1 - 1, y, MS); rect(x0 + 1, y + 1, x1 - 1, y + 1, ML); }
    for (let k = 0; k < 10; k++) { const x = x0 + 2 + Math.round(h(k, 1, 455) * 30), y = 98 + Math.round(h(k, 2, 455) * 11); rect(x, y, x + 3, y, MS); }
    rect(x0 + 1, 97, x0 + 1, 110, ML); rect(x1 - 2, 97, x1 - 1, 110, MS);
    // la tapa abombada
    for (let y = 86; y <= 95; y++) { const e = y === 86 ? 3 : y === 87 ? 1 : 0; rect(x0 + e, y, x1 - e, y, y === 86 ? hex('#2a1a0e') : y < 89 ? ML : y > 93 ? MS : M); pset(x0 + e, y, hex('#2a1a0e')); pset(x1 - e, y, hex('#2a1a0e')); }
    rect(x0, 95, x1, 96, FE); rect(x0, 95, x1, 95, FEL);
    // los flejes y los clavos
    for (const xb of [x0 + 4, x1 - 5]) { rect(xb, 87, xb + 1, 111, FE); rect(xb, 87, xb, 111, FEL); for (let y = 89; y < 111; y += 4) pset(xb + 1, y, hex('#c8c8d0')); }
    rect(x0, 110, x1, 111, FE); rect(x0, 110, x1, 110, FEL);
    // la cerradura de latón
    rect(107, 93, 112, 100, hex('#6a4a10')); rect(108, 94, 111, 99, hex('#c8a040')); rect(108, 94, 111, 94, hex('#f0d070')); pset(109, 96, hex('#1a1008')); rect(109, 97, 110, 98, hex('#1a1008')); pset(110, 96, hex('#1a1008'));
    // las monedas que asoman por la rendija
    for (const x of [100, 102, 104, 105]) { pset(x, 95, hex('#e8b830')); } pset(101, 95, hex('#fff0a0'));
    // la bandera pirata doblada encima de la tapa (una calavera de dibujo, sin letras)
    { const fx = 98, fy = 81, N = hex('#1e1a20'), NL = hex('#3a3440');
      rect(fx, fy, fx + 20, fy + 5, N); rect(fx, fy, fx + 20, fy, NL); rect(fx + 1, fy + 2, fx + 19, fy + 2, NL); rect(fx, fy + 5, fx + 20, fy + 5, hex('#0e0a10'));
      rect(fx + 21, fy + 1, fx + 21, fy + 4, NL);
      const B = hex('#e8e4d8'); rect(fx + 9, fy + 1, fx + 11, fy + 2, B); pset(fx + 9, fy + 2, N); pset(fx + 11, fy + 2, N); pset(fx + 10, fy + 3, B); pset(fx + 8, fy + 4, B); pset(fx + 12, fy + 4, B); pset(fx + 8, fy + 3, B); pset(fx + 12, fy + 3, B); }
  }
  // ── el catalejo de latón en su trípode, apuntando al ventanuco
  { const ax = 185, ay = 86, P = hex('#4a2e1a'), PL = hex('#7a5232');
    for (const [lx, ly] of [[176, 112], [194, 112], [186, 113]]) { linea(ax, ay, lx, ly, P); linea(ax + 1, ay, lx + 1, ly, PL); }
    e_tinte(R, 174, 112, 197, 114, 0.4);
    const L = hex('#e8c060'), M = hex('#b88a2c'), D = hex('#6a4a10');
    for (let k = 0; k <= 26; k++) { const u = k / 26, x = Math.round(lerp(195, 172, u)), y = Math.round(lerp(81, 66, u)), g = u < 0.4 ? 1 : 0; rect(x, y - 1 - g, x, y + 1, M); pset(x, y - 1 - g, L); pset(x, y + 1, D); }
    for (const u of [0.15, 0.4, 0.75]) { const x = Math.round(lerp(195, 172, u)), y = Math.round(lerp(81, 66, u)); rect(x, y - 2, x, y + 2, D); }
    disco(171.5, 65.5, 2.2, D); pset(171, 65, hex('#a8d0e0')); rect(195, 80, 197, 82, hex('#2a1a10')); rect(ax - 1, ay - 2, ax + 1, ay, hex('#2a2a30'));
  }
  // ── el yelmo de templario en su soporte y el escudo de la cruz roja apoyado en la pared
  { e_tinte(R, 196, 110, 211, 114, 0.4);
    rect(202, 97, 204, 111, hex('#4a2e1a')); rect(202, 97, 202, 111, hex('#7a5232')); rect(197, 110, 209, 112, hex('#4a2e1a')); rect(197, 110, 209, 110, hex('#7a5232'));
    for (let y = 77; y <= 98; y++) { const hw = y < 78 ? 5 : y < 79 ? 7 : y < 80 ? 8 : y < 82 ? 9 : 10;
      for (let x = 203 - hw; x <= 203 + hw; x++) {
        const u = (x - 203) / 10; let c = u < -0.6 ? hex('#d8dde4') : u < -0.1 ? hex('#aab2bc') : u < 0.5 ? hex('#828a96') : hex('#5a626e');
        if (Math.abs(x - 203) === hw || y === 77 || y === 98) c = hex('#22262e'); else if (y === 82) c = hex('#6a727e'); else if (y === 83 && u < 0.3) c = hex('#e8ecf0');
        if ((y === 86 || y === 87) && Math.abs(x - 203) < 9 && Math.abs(x - 203) > 1) c = y === 86 ? hex('#0e1014') : hex('#2a2e36');
        if ((Math.abs(x - 203) <= 1 && y > 78 && y < 98) || ((y === 90 || y === 91) && Math.abs(x - 203) < 8)) c = (x === 202 || y === 90) ? hex('#f0d070') : hex('#b88a2c');
        if (x > 205 && x < 211 && y > 92 && y < 97 && ((x + y) & 1) === 0 && (x & 1)) c = hex('#1a1c22');
        pset(x, y, c);
      } }
    for (const [x, y] of [[195, 84], [195, 95], [211, 84], [211, 95], [199, 80], [207, 80]]) pset(x, y, hex('#f0f2f4'));
    // el escudo
    for (let y = 90; y <= 112; y++) { const w = y < 103 ? 8 : Math.max(0, Math.round(8 * (1 - (y - 103) / 9.5))), cx = 222 + Math.round((y - 90) * 0.12);
      if (w <= 0) { pset(cx, y, hex('#22262e')); continue; }
      for (let x = cx - w; x <= cx + w; x++) { let c = x - cx > w * 0.4 ? hex('#c8bcac') : hex('#e8e0d0'); if (Math.abs(x - cx) <= 1 || (y >= 96 && y <= 97)) c = x - cx > w * 0.4 ? hex('#8a2020') : hex('#b02828'); if (h(x, y, 456) < 0.06) c = hex('#a8a090'); pset(x, y, c); }
      pset(cx - w - 1, y, hex('#22262e')); pset(cx + w + 1, y, hex('#22262e')); }
    rect(214, 89, 230, 89, hex('#22262e')); e_tinte(R, 232, 92, 233, 112, 0.3);
  }
  // ── el escritorio con el libro abierto, el tintero con la pluma, la vela sobre libros y el retrato de la dama
  { const M = hex('#5a3a22'), ML = hex('#9a6c44'), MS = hex('#3a2414');
    // el retrato con joyas: marco dorado, la dama con el pelo empolvado, la corona chiquita y el collar de piedras
    { const x0 = 238, x1 = 262, y0 = 62, y1 = 86; e_tinte(R, x0 + 2, y0 + 2, x1 + 2, y1 + 2, 0.35);
      rect(x0, y0, x1, y1, hex('#6a4a10')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#c8a040')); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#f0d070')); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#e8c060')); rect(x1 - 1, y0 + 1, x1 - 1, y1 - 1, hex('#8a6a1c')); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, hex('#8a6a1c'));
      for (const [x, y] of [[x0 + 1, y0 + 1], [x1 - 1, y0 + 1], [x0 + 1, y1 - 1], [x1 - 1, y1 - 1], [250, y0 + 1], [250, y1 - 1]]) pset(x, y, hex('#fff0a0'));
      rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, hex('#1e3a3a')); for (let y = y0 + 3; y <= y1 - 3; y++) for (let x = x0 + 3; x <= x1 - 3; x++) if (h(x, y, 457) < 0.2) pset(x, y, hex('#2a4a48'));
      e_busto(R, 250, y0 + 3, { fondo: null, piel: '#f0c8a8', pelo: '#e0dce4', peloS: '#a8a4b4', ropa: '#3a4a8a', ropaS: '#28346a', cuello: '#f4f0e8', tocado: 'empolvado', ancho: 8 });
      rect(247, 80, 253, 80, hex('#e8b830')); pset(246, 79, hex('#e8b830')); pset(254, 79, hex('#e8b830')); pset(247, 81, hex('#c82838')); pset(250, 81, hex('#28a848')); pset(253, 81, hex('#2848c8')); pset(250, 82, hex('#c82838'));
      rect(248, y0 + 3, 252, y0 + 3, hex('#e8b830')); pset(248, y0 + 2, hex('#e8b830')); pset(250, y0 + 2, hex('#e8b830')); pset(252, y0 + 2, hex('#e8b830')); pset(250, y0 + 3, hex('#c82838'));
      linea(250, y0 - 6, x0 + 4, y0, hex('#3a2a1a')); linea(250, y0 - 6, x1 - 4, y0, hex('#3a2a1a')); pset(250, y0 - 6, hex('#c8c0b0')); }
    e_tinte(R, 232, 98, 279, 112, 0.42);
    rect(233, 95, 278, 97, M); rect(233, 95, 278, 95, ML); rect(233, 97, 278, 97, MS);
    rect(235, 98, 276, 102, M); rect(235, 102, 276, 102, MS); rect(250, 99, 260, 101, hex('#4a2e1a')); rect(251, 100, 259, 100, hex('#6a4a2a')); pset(255, 100, hex('#e8c060'));
    for (const lx of [236, 273]) { rect(lx, 103, lx + 2, 112, M); rect(lx, 103, lx, 112, ML); rect(lx + 2, 103, lx + 2, 112, MS); }
    rect(239, 108, 272, 109, MS); rect(239, 108, 272, 108, hex('#6a4a2a'));
    // un rollo y un cesto de pergaminos debajo
    rect(241, 104, 253, 107, hex('#8a6a3a')); for (let x = 242; x < 253; x += 2) pset(x, 105, hex('#5a4020')); for (const x of [244, 248, 251]) { rect(x, 101, x + 1, 104, hex('#e0c890')); pset(x, 101, hex('#fff0c8')); }
    // el libro abierto: dos páginas con renglones sin letras
    for (let y = 90; y <= 94; y++) { rect(239, y, 246, y, hex('#f0e6cc')); rect(248, y, 255, y, hex('#e4d8b8')); }
    rect(239, 90, 255, 90, hex('#fffaf0')); rect(247, 90, 247, 94, hex('#a89870')); rect(238, 94, 256, 94, hex('#8a2a2a'));
    for (const y of [91, 93]) { rect(240, y, 245, y, hex('#a8a090')); rect(249, y, 254, y, hex('#a8a090')); } rect(240, 92, 243, 92, hex('#a8a090'));
    // el tintero y la pluma de escribir
    rect(258, 91, 263, 94, hex('#1a1a28')); rect(259, 90, 262, 90, hex('#2a2a3a')); pset(259, 92, hex('#6a7a9a')); rect(258, 94, 263, 94, hex('#0e0e18'));
    for (let k = 0; k <= 14; k++) { const x = Math.round(lerp(261, 268, k / 14)), y = Math.round(lerp(90, 74, k / 14)); pset(x, y, hex('#d8d0c0')); if (k > 3) { pset(x - 1, y, hex('#f4f0e8')); pset(x + 1, y + 1, hex('#b8b0a0')); } if (k > 6 && k < 13) pset(x - 2, y + 1, hex('#f4f0e8')); }
    // la vela sobre dos libros
    e_libroTumbado(R, 266, 277, 92, hex('#2e5a3a')); e_libroTumbado(R, 267, 276, 89, hex('#8a2a2a'));
    rect(269, 88, 275, 88, hex('#a8802c')); rect(271, 81, 273, 87, hex('#f0e6cc')); rect(273, 82, 273, 87, hex('#c8bca0')); pset(270, 84, hex('#f0e6cc')); pset(270, 85, hex('#f0e6cc'));
  }
  // ── a la izquierda, el barril con libros y una vela encima
  { const x0 = 6, x1 = 30, y0 = 102, y1 = 132; e_tinte(R, 4, y1 - 2, x1 + 6, y1 + 3, 0.45);
    for (let y = y0; y <= y1; y++) { const b = Math.sin((y - y0) / (y1 - y0) * Math.PI) * 2, a = Math.round(x0 - b), z = Math.round(x1 + b);
      for (let x = a; x <= z; x++) { const u = (x - a) / (z - a); let c = u < 0.2 ? hex('#a87a4a') : u < 0.55 ? hex('#8a5a32') : u < 0.85 ? hex('#6a4224') : hex('#4a2e18'); if (((x - a) % 5) === 0) c = hex('#3a2414'); if (x === a || x === z) c = hex('#24160c'); pset(x, y, c); } }
    for (const yh of [106, 117, 128]) { const b = Math.sin((yh - y0) / (y1 - y0) * Math.PI) * 2; rect(Math.round(x0 - b), yh, Math.round(x1 + b), yh + 1, hex('#3a3a42')); rect(Math.round(x0 - b) + 1, yh, Math.round(x0 - b) + 8, yh, hex('#8a8a96')); }
    for (let x = x0; x <= x1; x++) { pset(x, y0 - 1, hex('#5a3a22')); pset(x, y0 - 2, x < 14 ? hex('#9a6c44') : hex('#7a5232')); } rect(x0 + 1, y0 - 3, x1 - 1, y0 - 3, hex('#24160c'));
    e_libroTumbado(R, 9, 27, 97, hex('#2a3a6a')); e_libroTumbado(R, 11, 25, 94, hex('#a8803a')); e_libroTumbado(R, 10, 24, 91, hex('#5a2a4a'));
    rect(17, 90, 25, 90, hex('#a8802c')); rect(18, 90, 24, 90, hex('#e8c060')); rect(20, 83, 22, 89, hex('#f0e6cc')); rect(22, 84, 22, 89, hex('#c8bca0')); pset(19, 86, hex('#f0e6cc'));
  }
  // ── a la derecha, el timón de barco apoyado en la pared lateral y un rollo de cuerda
  { const cx = 301, cy = 106, M = hex('#7a5030'), ML = hex('#b0824e'), MS = hex('#4a2e18');
    e_tinte(R, 290, 120, 318, 126, 0.4);
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.2, ex = Math.cos(a), ey = Math.sin(a); linea(cx + ex * 3, cy + ey * 3, cx + ex * 15, cy + ey * 15, M); linea(cx + ex * 3 + 1, cy + ey * 3, cx + ex * 15 + 1, cy + ey * 15, MS); disco(cx + ex * 16, cy + ey * 16, 1.6, ML); pset(Math.round(cx + ex * 16) - 1, Math.round(cy + ey * 16) - 1, hex('#e0b07a')); }
    R.anillo(cx, cy, 12, MS); R.anillo(cx, cy, 11, M); R.anillo(cx, cy, 10, M); R.anillo(cx, cy, 10.5, ML); R.anillo(cx, cy, 9, MS);
    disco(cx, cy, 3.2, hex('#a8802c')); disco(cx - 0.5, cy - 0.5, 1.6, hex('#f0d070'));
    e_tinte(R, 282, 130, 312, 136, 0.4);
    for (let j = 0; j < 4; j++) { const cyr = 130 - j * 2, rx = 12 - j * 2.5, ry = 3.6 - j * 0.6;
      for (let a = 0; a < Math.PI * 2; a += 0.04) { const x = Math.round(296 + Math.cos(a) * rx), y = Math.round(cyr + Math.sin(a) * ry); pset(x, y + 1, hex('#5a4020')); }
      for (let a = 0; a < Math.PI * 2; a += 0.04) { const x = Math.round(296 + Math.cos(a) * rx), y = Math.round(cyr + Math.sin(a) * ry), tr = Math.floor(a * 6) % 2; pset(x, y, Math.sin(a) < 0 ? hex('#e0c890') : tr ? hex('#c8a868') : hex('#a8884a')); } }
    rect(295, 122, 296, 124, hex('#c8a868')); pset(297, 121, hex('#a8884a'));
  }
  // ── el agujero del suelo: bordes astillados por tabla, el canto claro de la madera, la viga de debajo y la tierra
  { const { x: cx, y: cy, rx, ry } = E_AG;
    // la tierra que ha salido del agujero, alrededor
    for (let k = 0; k < 70; k++) { const a = h(k, 1, 460) * Math.PI * 2, r = 1.05 + h(k, 2, 460) * 0.55, x = Math.round(cx + Math.cos(a) * rx * r), y = Math.round(cy + Math.sin(a) * ry * r); pset(x, y, k % 3 ? hex('#5a3e28') : hex('#7a5a3a')); if (k % 4 === 0) pset(x + 1, y, hex('#4a3020')); }
    for (let y = cy - ry - 2; y <= cy + ry + 2; y++) for (let x = cx - rx - 3; x <= cx + rx + 3; x++) {
      const D = 32 / (y - 80), u = 160 + (x - 160) * D, tb = Math.floor(u / 7), lim = 1 + (h(tb, 9, 461) - 0.5) * 0.3;
      const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d > lim) continue;
      const yTop = cy - ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2)) * Math.sqrt(lim), dd = y - yTop;
      let c = dd < 1 ? hex('#d8b080') : dd < 2 ? hex('#a87a4a') : dd < 4 ? hex('#4a3020') : dd < 5 ? hex('#6a4a2e') : dd < 8 ? (h(x, y, 462) < 0.3 ? hex('#3a2616') : hex('#2e1e12')) : dd < 11 ? hex('#1e140c') : hex('#120a06');
      if (dd >= 2 && dd < 4 && h(x >> 1, 1, 463) < 0.3) c = hex('#5a3a22');
      pset(x, y, c);
    }
    // astillas que asoman en el borde
    for (let k = 0; k < 9; k++) { const a = Math.PI + 0.3 + h(k, 3, 464) * 2.5, x = Math.round(cx + Math.cos(a) * rx * 0.96), y = Math.round(cy + Math.sin(a) * ry * 0.96); pset(x, y, hex('#e8c898')); pset(x + (Math.cos(a) > 0 ? -1 : 1), y + 1, hex('#c8a070')); }
    for (let x = cx - rx + 2; x <= cx + rx - 2; x++) { const y = Math.round(cy + ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2))); pset(x, y + 1, hex('#c09a6a')); pset(x, y, hex('#0e0806')); }
  }
  // la alfombra vieja, apartada del agujero con la esquina doblada (rojo, cenefa azul con puntos y medallón)
  { const ya = 139, yb = 174, F = hex('#9a2a2a'), FS = hex('#7a1e22'), B = hex('#2a3a6a'), BL = hex('#d8c8a0'), M1 = hex('#e0c890'), M2 = hex('#3a5a8a');
    for (let y = ya; y <= yb; y++) { const v = (y - ya) / (yb - ya), xl = lerp(46, 26, v), xr = lerp(124, 128, v);
      for (let x = Math.round(xl); x <= Math.round(xr); x++) { const u = (x - xl) / (xr - xl);
        if (u > 0.74 && v > 0.62 && (u - 0.74) / 0.26 + (v - 0.62) / 0.38 > 1) continue;
        let c = F; const bo = u < 0.08 || u > 0.92 || v < 0.1 || v > 0.9;
        if (bo) { c = B; if ((Math.round(u * 40) + Math.round(v * 20)) % 3 === 0 && (u > 0.02 && u < 0.98 && v > 0.03 && v < 0.97)) c = BL; }
        else { const m = Math.abs(u - 0.5) / 0.26 + Math.abs(v - 0.5) / 0.3; if (m < 0.45) c = M2; else if (m < 0.62) c = M1; else if (m < 0.75) c = B; else if (((Math.round(u * 24) + Math.round(v * 12)) & 3) === 0) c = FS; if (u < 0.12 || u > 0.88 || v < 0.15 || v > 0.85) c = (u < 0.11 || u > 0.89 || v < 0.13 || v > 0.87) ? M1 : c; }
        if (h(x, y, 467) < 0.08) c = e_mezcla(c, hex('#000000'), 0.25); else if (h(x, y, 468) < 0.05) c = e_mezcla(c, hex('#e8d8b0'), 0.3);
        pset(x, y, c); }
      // los flecos de atrás y de delante
      if (y === ya) for (let x = Math.round(xl) + 1; x < xr; x += 2) pset(x, ya - 1, BL);
    }
    for (let x = 27; x < 112; x += 2) { pset(x, yb + 1, BL); pset(x, yb + 2, hex('#b8a880')); }
    rect(27, yb + 3, 112, yb + 3, hex('#3a2616'));
    // la esquina doblada, del revés (la trama clara)
    { const p1 = [lerp(26, 128, 0.74) + 2, yb], p2 = [lerp(lerp(46, 26, 0.62), lerp(124, 128, 0.62), 1), lerp(ya, yb, 0.62)];
      R.poligono([p1, p2, [p2[0] - 9, p2[1] - 3]], hex('#c8b890')); R.linea(p1[0], p1[1], p2[0] - 9, p2[1] - 3, hex('#e8dcc0')); R.linea(p1[0], p1[1], p2[0], p2[1], hex('#6a5a40'));
      for (let k = 0; k < 6; k++) pset(Math.round(lerp(p1[0], p2[0] - 9, k / 6)) + 1, Math.round(lerp(p1[1], p2[1] - 3, k / 6)), hex('#a89870')); }
  }
  // la tabla arrancada (con sus clavos) y la palanca de hierro
  { e_tinte(R, 188, 157, 216, 160, 0.4);
    for (let k = 0; k <= 28; k++) { const x = 187 + k, y = 151 + Math.round(k * 0.2); rect(x, y, x, y + 3, h(k, 1, 465) < 0.15 ? hex('#7a5634') : hex('#9c7650')); pset(x, y, hex('#c8a070')); pset(x, y + 3, hex('#5a3c22')); }
    rect(187, 151, 187, 154, hex('#d8b080')); rect(215, 157, 215, 160, hex('#d8b080'));
    for (const [x, y] of [[190, 150], [212, 154]]) { rect(x, y - 3, x, y, hex('#8a8a96')); pset(x, y - 3, hex('#c8c8d0')); }
    e_tinte(R, 112, 160, 142, 162, 0.35);
    linea(114, 160, 140, 155, hex('#2a2a32')); linea(114, 159, 140, 154, hex('#5a5a66')); linea(115, 158, 139, 153, hex('#8a8a96')); pset(113, 159, hex('#2a2a32')); pset(112, 158, hex('#2a2a32')); pset(141, 153, hex('#2a2a32')); pset(142, 152, hex('#5a5a66'));
  }
  // ── primer término: la pila de libros viejos (izquierda) y la caja con la pala (derecha)
  { e_tinte(R, 0, 175, 38, 179, 0.4);
    const L = [[0, 34, 172, hex('#5a2a2a')], [2, 30, 168, hex('#2a3a5a')], [0, 27, 164, hex('#6a5a2a')], [4, 31, 160, hex('#3a4a3a')]];
    for (const [a, b, y, c] of L) { rect(a, y, b, y + 3, c); rect(a + 1, y + 1, b, y + 2, hex('#e8dcc0')); rect(a, y, b, y, e_mezcla(c, hex('#ffffff'), 0.3)); rect(a, y + 3, b, y + 3, e_mezcla(c, hex('#000000'), 0.4)); rect(b, y + 1, b, y + 2, c); for (let x = a + 3; x < b; x += 3) pset(x, y + 1, hex('#c8bca0')); }
    rect(0, 176, 36, 179, hex('#4a2a2a')); rect(0, 176, 36, 176, hex('#7a4a4a'));
    rect(10, 154, 30, 158, hex('#e0c890')); rect(10, 158, 30, 158, hex('#b89a60')); rect(30, 154, 31, 158, hex('#a88a50')); rect(18, 154, 19, 158, hex('#a83a2a'));
  }
  { const x0 = 290, y0 = 150, M = hex('#8a6440'), ML = hex('#b08458'), MS = hex('#5a3c22');
    // la pala apoyada detrás de la caja
    linea(282, 128, 296, 156, hex('#5a3a22')); linea(283, 128, 297, 156, hex('#8a6440')); rect(279, 125, 285, 126, hex('#4a2e1a'));
    e_tinte(R, x0 - 4, 176, 319, 179, 0.4);
    rect(x0, y0, 319, 179, hex('#2a1a0e')); rect(x0 + 1, y0 + 1, 319, 178, M);
    for (const y of [y0 + 9, y0 + 18]) { rect(x0 + 1, y, 319, y, MS); rect(x0 + 1, y + 1, 319, y + 1, ML); }
    rect(x0 + 1, y0 + 1, 319, y0 + 1, ML); linea(x0 + 2, y0 + 2, 318, 177, MS); linea(x0 + 2, 177, 318, y0 + 2, MS);
    for (let x = x0 + 4; x < 319; x += 3) { const ht = 2 + Math.round(h(x, 1, 466) * 3); linea(x, y0, x + 1, y0 - ht, hex('#d8b860')); }
    for (let k = 0; k < 5; k++) pset(x0 + 3 + Math.round(h(k, 2, 466) * 24), y0 + 3 + Math.round(h(k, 3, 466) * 22), MS);
    // la hoja de la pala asoma por encima
    poligono([[295, 146], [303, 146], [302, 156], [296, 156]], hex('#7a828e')); rect(296, 146, 297, 154, hex('#b8c0ca'));
  }
}

const E_RET = [
  { x: 30, año: 1795, marco: 'pino', busto: { fondo: '#6a8a6a', piel: '#f0c8a0', pelo: '#7a4a24', ropa: '#7a5230', ropaS: '#5a3a20', cuello: '#e8dcc0', tocado: 'despeinado' } },
  { x: 74, año: 1803, marco: 'ovalo', busto: { fondo: '#4a5a7a', piel: '#ecc4a0', pelo: '#5a3a24', ropa: '#2a3a6a', ropaS: '#1a2848', cuello: '#f4f0e8', tocado: 'tricornio' } },
  { x: 118, año: 1849, marco: 'nogal', busto: { fondo: '#5a3030', piel: '#e8bc98', pelo: '#3a2418', ropa: '#24202a', ropaS: '#141018', cuello: '#f0ece0', tocado: 'chistera', barba: '#4a2e1c' } },
  { x: 162, año: 1909, marco: 'foto', busto: { fondo: '#c8b08a', piel: '#d8bc94', pelo: '#5a4630', ropa: '#5a4834', ropaS: '#3e3022', cuello: '#ece0c8', tocado: 'canotier', bigote: '#4a3a28', sepia: true } },
  { x: 206, año: 1965, marco: 'color', busto: { fondo: '#8ab0c8', piel: '#f0c4a0', pelo: '#6a6a7a', ropa: '#a83a2a', ropaS: '#6a2018', cuello: '#2a2a2a', tocado: 'gorra', gorra: '#3a5a8a', gafas: true, cuadros: true } },
  { x: 250, año: 2026, marco: 'digital' },
];

const E_HOY = [
  { fondo: '#6aa0d8', piel: '#f0c4a0', pelo: '#b8bccc', ropa: '#4a5a3a', ropaS: '#2e3a24', cuello: '#e8d84a', tocado: 'gorra', gorra: '#3a6a3a', barba: '#c8ccd8' },
  { fondo: '#e8a868', piel: '#c8946a', pelo: '#2a1a14', ropa: '#e8783a', ropaS: '#b8562a', cuello: '#e8d84a', tocado: 'casco', gorra: '#f0f0f0' },
];

const E_MARCO = { y0: 58, y1: 94 };   // el alto de los marcos (de borde a borde)

function e_retratos(R, t, o) {
  R.copiar(e_capa(R, 'retratos', () => e_retratosFijo(R)));
  const { pset, rect, disco, linea } = R;
  // la luz de los candelabros que tiembla en la pared y en los marcos, y sus llamas
  for (const [x, k] of [[52, 0], [140, 1], [228, 2]]) { for (const dx of [-5, 0, 5]) e_llama(R, x + dx, dx ? 92 : 89, t, k * 3 + dx, dx ? 0 : 20); }
  // los ojos de los retratos: miran a su burbuja y parpadean cada uno a su ritmo
  E_RET.forEach((r, i) => { if (r.marco === 'digital') return; const ey = E_MARCO.y0 + 4 + 13, parp = ((t + i * 1.37) % (3.6 + i * 0.4)) < 0.14;
    if (parp) { const p = r.busto.sepia ? '#d8bc94' : r.busto.piel; for (const ex of [r.x - 2, r.x + 2]) { pset(ex, ey, hex(p)); pset(ex, ey + 1, e_mezcla(hex(p), hex('#000000'), 0.35)); } } });
  // el marco digital: dos fotos que se turnan con un deslizamiento, y su piloto
  { const r = E_RET[5], ix0 = r.x - 11, ix1 = r.x + 11, iy0 = E_MARCO.y0 + 4, iy1 = E_MARCO.y1 - 5, per = 5, p = t % (per * 2), cual = Math.floor(p / per), q = p % per;
    const des = q > per - 0.6 ? Math.round((q - (per - 0.6)) / 0.6 * 23) : 0;
    R.recorte([ix0, iy0, ix1, iy1]);
    e_busto(R, r.x - des, iy0, E_HOY[cual], true); if (des) e_busto(R, r.x - des + 23, iy0, E_HOY[1 - cual], true);
    for (let y = iy0; y <= iy1; y += 3) for (let x = ix0; x <= ix1; x++) { const c = R.pget(x, y); pset(x, y, e_mezcla(c, hex('#ffffff'), 0.08)); }
    pset(ix0 + 1, iy0 + 1, hex('#ffffff')); pset(ix0 + 2, iy0 + 1, hex('#e0f0ff')); pset(ix0 + 1, iy0 + 2, hex('#e0f0ff'));
    R.recorte(null);
    pset(r.x + 9, E_MARCO.y1 - 2, Math.sin(t * 2) > 0 ? hex('#5af07a') : hex('#2a7a3a'));}
  // las burbujas de pensamiento vacías, que flotan (la escena pinta dentro el tesoro soñado)
  const nb = o.burbujas === false ? 0 : (o.burbujas ?? 6), burbujas = [];
  E_RET.forEach((r, i) => {
    const s = Math.max(0, Math.min(1, nb - i)); if (s <= 0) return;
    const e = s < 1 ? s * (1.15 - 0.15 * s) : 1, bx = r.x + Math.round(Math.sin(t * 0.9 + i * 1.3) * 1.2), by = 33 + Math.round(Math.sin(t * 1.1 + i * 2) * 1.5), rx = Math.round(15 * e), ry = Math.round(9.5 * e);
    if (rx < 2) return;
    // la estela de bolitas que sube del marco
    if (s > 0.3) { disco(r.x + 13.5, 52.5, 1.3, hex('#3a3040')); pset(r.x + 13, 52, hex('#f8f4ea')); disco(r.x + 11.5, 47.5, 2.2, hex('#3a3040')); disco(r.x + 11.5, 47.5, 1.4, hex('#f8f4ea')); }
    for (let j = -ry - 1; j <= ry + 1; j++) for (let ii = -rx - 1; ii <= rx + 1; ii++) {
      const d = (ii / (rx + 0.5)) ** 2 + (j / (ry + 0.5)) ** 2, ond = 1 + 0.07 * Math.sin(Math.atan2(j, ii) * 7);
      if (d > ond * 1.16) continue;
      pset(bx + ii, by + j, d > ond ? hex('#3a3040') : (ii + j * 1.4) / (rx + ry) > 0.42 ? hex('#ddd6ca') : hex('#f8f4ea'));
    }
    if (rx > 6) { linea(bx - rx + 3, by - 3, bx - rx + 5, by - ry + 3, hex('#ffffff')); pset(bx - rx + 3, by - 2, hex('#ffffff')); }
    burbujas.push({ x: bx, y: by, rx, ry, s });
  });
  // la araña que baja de la viga entre dos burbujas
  e_arana(R, 96, 22, t, 14, 1);
  // las motas de polvo en la luz de las velas
  for (let k = 0; k < 14; k++) { const x = Math.round(20 + h(k, 1, 470) * 250 + Math.sin(t * 0.4 + k) * 8), y = Math.round(60 + ((h(k, 2, 470) * 60 - t * (1 + h(k, 3, 470) * 2)) % 60 + 60) % 60); if (Math.sin(t * 2.2 + k * 1.9) > 0) pset(x, y, hex('#f8e2b0')); }
  // el ratón que cruza a lo largo del zócalo (se para a olisquear), por detrás de los postes
  { const per = 11, q = (t % per) / per, para = q > 0.45 && q < 0.6, u = q < 0.45 ? q / 0.45 * 0.5 : q < 0.6 ? 0.5 : 0.5 + (q - 0.6) / 0.4 * 0.5, mx = Math.round(334 - u * 360), my = 140, pa = para ? 0 : Math.floor(t * 12) % 2;
    const G = hex('#7a7078'), GS = hex('#4a424a'), GL = hex('#a89ea6');
    rect(mx, my - 3, mx + 5, my - 1, G); rect(mx + 1, my - 4, mx + 4, my - 4, G); rect(mx + 1, my - 4, mx + 3, my - 4, GL); rect(mx, my - 1, mx + 5, my - 1, GS);
    rect(mx - 2, my - 2, mx - 1, my - 1, G); pset(mx - 3, my - 1 - (para && Math.sin(t * 14) > 0 ? 1 : 0), hex('#e8a0b0')); pset(mx - 1, my - 3, hex('#e8a0b0')); pset(mx - 1, my - 2, hex('#101010'));
    for (let k = 0; k < 6; k++) pset(mx + 6 + k, my - 2 + Math.round(Math.sin(k * 0.9 + t * 6) * 0.6) + (k > 3 ? 1 : 0), hex('#c89aa6'));
    pset(mx + 1 + pa, my, GS); pset(mx + 4 - pa, my, GS); }
  // el cordón de terciopelo entre los postes de latón, que se mece
  { const P = [8, 108, 210, 312], yb = 154, yt = 137;
    for (let i = 0; i < P.length - 1; i++) { const a = P[i] + 2, b = P[i + 1] - 2, sw = Math.sin(t * 0.9 + i) * 1.2;
      for (let x = a; x <= b; x++) { const u = (x - a) / (b - a), y = Math.round(yt + 1 + Math.sin(u * Math.PI) * (7 + sw)); pset(x, y, hex('#a82838')); pset(x, y + 1, hex('#6a1420')); pset(x, y - 1, hex('#d84858')); } }
    for (const x of P) { e_tinte(R, x - 4, yb, x + 4, yb + 2, 0.35); rect(x - 1, yt, x + 1, yb - 2, hex('#a8802c')); rect(x - 1, yt, x - 1, yb - 2, hex('#f0d070')); disco(x + 0.5, yt - 1.5, 2.2, hex('#c8a040')); pset(x - 1, yt - 3, hex('#fff0a0'));
      rect(x - 4, yb - 2, x + 4, yb, hex('#8a6a1c')); rect(x - 3, yb - 2, x + 3, yb - 2, hex('#e8c060')); }
  }
  return { suelo: 168, retratos: E_RET.map((r) => ({ x: r.x, y: Math.round((E_MARCO.y0 + E_MARCO.y1) / 2), año: r.año })), burbujas };
}

// un busto pintado de medio cuerpo dentro de un cuadro de 23 × 28 (cx: el centro; y0: el borde de arriba de la pintura).
// est: fondo, piel, pelo, ropa, ropaS, cuello, tocado ('despeinado', 'tricornio', 'chistera', 'canotier', 'gorra',
// 'casco', 'empolvado'), gorra (color de la gorra o del casco), barba, bigote, gafas, cuadros, sepia, ancho. Los ojos
// miran hacia arriba. Usa pset y disco, así que respeta R.recorte.
function e_busto(R, cx, y0, est, recortado = false) {
  const { pset, disco } = R, H = (c) => hex(c), sep = (c) => est.sepia ? e_mezcla(H(c), hex('#a88a5a'), 0.4) : H(c);
  const piel = sep(est.piel), pielS = e_mezcla(piel, hex('#6a3a2a'), 0.3), ropa = sep(est.ropa), ropaS = sep(est.ropaS), pelo = sep(est.pelo);
  if (est.fondo) for (let y = y0; y < y0 + 28; y++) for (let x = cx - 11; x <= cx + 11; x++) { const g = (y - y0) / 28 + (x - cx) * 0.01; let c = sep(est.fondo); if (g > 0.55) c = e_mezcla(c, hex('#000000'), (g - 0.55) * 0.6); else if (g < 0.3 && ((x + y) & 1)) c = e_mezcla(c, hex('#ffffff'), 0.12); pset(x, y, c); }
  const hy = y0 + 13, w = est.ancho ?? 10;
  // los hombros y el cuello de la camisa
  for (let y = y0 + 20; y < y0 + 28; y++) { const a = Math.min(w, 5 + (y - y0 - 20) * 1.5); for (let x = Math.round(cx - a); x <= Math.round(cx + a); x++) { let c = x > cx + a * 0.4 ? ropaS : ropa; if (est.cuadros && ((x + (y >> 1)) % 3 === 0 || y % 3 === 0)) c = e_mezcla(c, hex('#1a1a1a'), 0.45); pset(x, y, c); } }
  for (let y = y0 + 20; y < y0 + 24; y++) { pset(cx - 1, y, sep(est.cuello)); pset(cx, y, sep(est.cuello)); pset(cx + 1, y, sep(est.cuello)); } pset(cx - 2, y0 + 20, sep(est.cuello)); pset(cx + 2, y0 + 20, sep(est.cuello));
  pset(cx - 1, y0 + 19, pielS); pset(cx, y0 + 19, pielS); pset(cx + 1, y0 + 19, pielS);
  // la cabeza con su sombra a la derecha
  for (let j = -6; j <= 6; j++) for (let i = -5; i <= 5; i++) { if ((i / 5.2) ** 2 + (j / 6.3) ** 2 > 1) continue; pset(cx + i, hy + j, i > 2 ? pielS : piel); }
  pset(cx - 6, hy, piel); pset(cx + 6, hy, pielS);
  if (est.barba) { const b = sep(est.barba); for (let j = 1; j <= 6; j++) for (let i = -5; i <= 5; i++) { if ((i / 5.2) ** 2 + (j / 6.3) ** 2 > 1) continue; if (j > 2 || Math.abs(i) > 3) pset(cx + i, hy + j, (i + j) % 3 ? b : e_mezcla(b, hex('#ffffff'), 0.2)); } }
  if (est.bigote) { const b = sep(est.bigote); for (let i = -2; i <= 2; i++) pset(cx + i, hy + 3, b); }
  // el pelo
  for (let j = -7; j <= -3; j++) for (let i = -6; i <= 6; i++) { if ((i / 5.6) ** 2 + ((j + 2) / 5) ** 2 > 1) continue; pset(cx + i, hy + j, (i + j) % 4 ? pelo : e_mezcla(pelo, hex('#ffffff'), 0.2)); }
  pset(cx - 5, hy - 1, pelo); pset(cx + 5, hy - 1, pelo); pset(cx - 5, hy, pelo); pset(cx + 5, hy, pelo);
  // los ojos que miran arriba, las cejas, la nariz y la boca
  for (const ex of [cx - 2, cx + 2]) { pset(ex, hy + 1, hex('#f4f0e8')); pset(ex, hy, hex('#1a1414')); pset(ex, hy - 2, e_mezcla(pelo, hex('#000000'), 0.3)); }
  pset(cx, hy + 2, pielS); pset(cx - 1, hy + 4, hex('#a8584a')); pset(cx, hy + 4, hex('#a8584a'));
  if (est.gafas) { const G = hex('#2a1a14'); for (const ex of [cx - 2, cx + 2]) { pset(ex - 1, hy - 1, G); pset(ex, hy - 1, G); pset(ex + 1, hy - 1, G); pset(ex - 1, hy, G); pset(ex + 1, hy, G); pset(ex - 1, hy + 1, G); pset(ex + 1, hy + 1, G); } }
  // el sombrero o el tocado
  const N = sep('#1a1618'), NL = sep('#3a343a'), tc = est.tocado;
  if (tc === 'tricornio') { for (let i = -8; i <= 8; i++) { const up = Math.abs(i) > 5 ? Math.abs(i) - 5 : 0; pset(cx + i, hy - 6 - up, N); pset(cx + i, hy - 5 - up, N); } for (let j = -10; j <= -7; j++) for (let i = -4; i <= 4; i++) pset(cx + i, hy + j, j === -10 ? NL : N); pset(cx - 3, hy - 9, NL); }
  if (tc === 'chistera') { for (let j = -14; j <= -6; j++) for (let i = -4; i <= 4; i++) pset(cx + i, hy + j, i === -4 || j === -14 ? NL : N); for (let i = -7; i <= 7; i++) { pset(cx + i, hy - 5, N); } for (let i = -4; i <= 4; i++) pset(cx + i, hy - 7, sep('#6a2028')); }
  if (tc === 'canotier') { for (let j = -9; j <= -6; j++) for (let i = -5; i <= 5; i++) pset(cx + i, hy + j, j === -9 ? sep('#f0e0b0') : sep('#d8c088')); for (let i = -5; i <= 5; i++) pset(cx + i, hy - 7, sep('#3a2a20')); for (let i = -8; i <= 8; i++) pset(cx + i, hy - 5, sep('#c8b078')); }
  if (tc === 'gorra' || tc === 'casco') { const g = sep(est.gorra ?? '#3a5a8a'), gS = e_mezcla(g, hex('#000000'), 0.3), gL = e_mezcla(g, hex('#ffffff'), 0.35);
    for (let j = -9; j <= -4; j++) for (let i = -6; i <= 6; i++) { if ((i / 6.3) ** 2 + ((j + 4) / 5.5) ** 2 > 1) continue; pset(cx + i, hy + j, i > 3 ? gS : j < -7 ? gL : g); }
    if (tc === 'casco') for (let i = -8; i <= 8; i++) pset(cx + i, hy - 4, gS); else for (let i = -8; i <= -3; i++) pset(cx + i, hy - 4, gS); }
  if (tc === 'despeinado') { for (const [i, j] of [[-3, -8], [0, -9], [2, -8], [4, -7], [-5, -6]]) pset(cx + i, hy + j, pelo); }
  if (tc === 'empolvado') { const L = H(est.pelo), S2 = H(est.peloS ?? est.pelo); for (let j = -11; j <= -2; j++) for (let i = -7; i <= 7; i++) { if ((i / 7.2) ** 2 + ((j + 5) / 6.5) ** 2 > 1) continue; pset(cx + i, hy + j, (i + 2 * j) % 5 === 0 || i > 4 ? S2 : L); } for (const s of [-1, 1]) { disco(cx + s * 7, hy + 1, 2, L); pset(cx + s * 7, hy + 2, S2); } }
}

// cifras de 3 × 5 píxeles para las placas pequeñas (centradas en cx; y: la fila de arriba)
const E_CIF = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];

function e_cifras(R, txt, cx, y, c) {
  const x0 = Math.round(cx - (txt.length * 4 - 1) / 2);
  [...txt].forEach((d, k) => { const g = E_CIF[+d]; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j * 3 + i] === '1') R.pset(x0 + k * 4 + i, y + j, c); });
}

// lo fijo de la galería: techo inclinado, la viga, la pared de tablas, los retratos, los candelabros, el zócalo y el suelo
function e_retratosFijo(R) {
  const { rect, pset, linea, disco } = R;
  const NEG = hex('#140c08'), LZ = hex('#ffe2a8');
  const W = [hex('#946c48'), hex('#8a6240'), hex('#9c744e')], WG = hex('#3a2416'), WL = hex('#b88c60'), WS = hex('#6a4a2e');
  const S = [hex('#8a6440'), hex('#7e5a38'), hex('#94704a')], SG = hex('#33200f'), SL = hex('#b08a5a'), SS = hex('#634428');
  const LUCES = [[52, 90], [140, 90], [228, 90]];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c, osc = 0, luz = 0;
    if (y < 15) {
      // el techo inclinado: tablas en diagonal y los pares
      const d = x + y * 2.4, tb = Math.floor(d / 7); c = [hex('#4e3524'), hex('#46301f'), hex('#563b28')][Math.floor(h(tb, 1, 480) * 3)];
      if (d - tb * 7 < 1) c = hex('#24160c'); const rf = (d + 1000) % 56; if (rf < 6) c = rf < 1.5 ? hex('#6a4c34') : rf > 4.5 ? hex('#1e120a') : hex('#38261a');
      osc = 0.15 + (15 - y) / 15 * 0.25 + (x > 266 ? 0.15 : 0);
    } else if (y < 22) {
      // la correa: una viga gruesa con su veta
      c = y === 15 ? hex('#8a6440') : y === 21 ? hex('#24160c') : y === 20 ? hex('#3a2616') : h(x >> 2, y, 481) < 0.2 ? hex('#4a3020') : hex('#5a3c24');
      if (h(x >> 3, y, 482) < 0.1 && y > 16 && y < 20) c = hex('#6e4c30');
      osc = x > 266 ? 0.15 : 0;
    } else if (y < 108) {
      // la pared de tablas horizontales (a tope y con alguna junta vertical)
      const tb = Math.floor((y - 22) / 7), p = (y - 22) - tb * 7; c = W[Math.floor(h(tb, 1, 483) * 3)];
      const g = h(Math.floor((x + h(tb, 2, 484) * 40) / 6), y, 485); if (g < 0.1) c = WS; else if (g > 0.97) c = WL;
      if (p === 0) c = WG; else if (p === 1) c = WL; else if (p === 6) c = WS;
      const jx = Math.round(h(tb, 3, 486) * 120) + 30; if (((x - jx) % 120 + 120) % 120 === 0 && p > 0) c = WG;
      osc = (y < 34 ? (34 - y) / 12 * 0.4 : 0) + 0.12 + (x > 266 && y < 46 ? 0.1 : 0);
      for (const [lx, ly] of LUCES) { const dv = Math.hypot((x - lx) * 0.8, y - ly); if (dv < 64) luz = Math.max(luz, (1 - dv / 64) * 0.4); }
      if (x >= 280 && x <= 304 && y >= 60 && y <= 92) { osc -= 0.1; if (x === 280 || x === 304 || y === 60 || y === 92) osc += 0.12; }
    } else if (y < 138) {
      // el zócalo de cuarterones: el remate, los marcos con bisel y el rodapié
      const M = hex('#6a4428'), ML = hex('#9a6c44'), MS = hex('#3e2614');
      if (y < 112) c = y === 108 ? ML : y === 111 ? MS : M;
      else if (y > 132) c = y === 133 ? ML : y === 137 ? hex('#1e120a') : hex('#4a2e1a');
      else { const px = ((x + 4) % 40), py = y - 112; c = M;
        if (px > 5 && px < 36 && py > 3 && py < 17) { c = hex('#74492a'); if (py === 4 || px === 6) c = ML; else if (py === 16 || px === 35) c = MS; else if (h(x, y >> 2, 487) < 0.12) c = hex('#5a3820'); }
        else if (px < 2) c = MS; else if (h(x, y, 488) < 0.08) c = hex('#5a3820'); }
      osc = 0.15 + (y > 128 ? 0.1 : 0);
      for (const [lx] of LUCES) { const dv = Math.abs(x - lx); if (dv < 34) luz = Math.max(luz, (1 - dv / 34) * 0.25); }
    } else {
      // el suelo de tablas en perspectiva (fuga en 160, 50)
      const D = 88 / (y - 50), u = 160 + (x - 160) * D, tb = Math.floor(u / 9), fr = u - tb * 9; c = S[Math.floor(h(tb, 1, 489) * 3)];
      const D1 = 88 / (y + 1 - 50), len = 0.18 + h(tb, 3, 490) * 0.1, off = h(tb, 4, 491);
      if (fr < D) c = SG; else if (fr < 2 * D) c = SL; else if (Math.floor(D / len + off) !== Math.floor(D1 / len + off)) c = SG;
      else { const g = h(Math.floor(u * 1.3), Math.floor(D * 18), 492); if (g < 0.12) c = SS; else if (g > 0.96) c = SL; }
      osc = (y < 143 ? (143 - y) / 5 * 0.4 : 0) + ((x - 160) / 170) ** 2 * 0.35 + (y > 168 ? (y - 168) / 12 * 0.15 : 0);
      for (const [lx] of LUCES) { const dl = ((x - lx) / 30) ** 2 + ((y - 143) / 7) ** 2; if (dl < 1) luz = Math.max(luz, (1 - dl) * ((x + y) & 1 ? 0.22 : 0.32)); }
    }
    if (osc > 0) c = e_mezcla(c, NEG, Math.min(0.8, osc)); else if (osc < 0) c = e_mezcla(c, LZ, -osc);
    if (luz > 0) c = e_mezcla(c, LZ, luz);
    pset(x, y, c);
  }
  // la alfombra de pasillo delante de la pared: campo rojo, cenefas doradas y azules, rombos en perspectiva
  for (let y = 157; y < 180; y++) { const D = 88 / (y - 50), v = (y - 157) / 22;
    for (let x = 0; x < 320; x++) { const u = 160 + (x - 160) * D; let c = hex('#8a2228');
      if (v < 0.1 || v > 0.92) c = hex('#24305a'); else if (v < 0.17 || v > 0.85) c = ((Math.floor(u / 4) & 1) ? hex('#d8b050') : hex('#a8802c'));
      else { const m = Math.abs(((u % 30) + 30) % 30 - 15) / 9 + Math.abs(v - 0.51) / 0.26; if (m < 0.5) c = hex('#e0c890'); else if (m < 0.75) c = hex('#24305a'); else if (m < 0.9) c = hex('#d8b050'); else if (((Math.floor(u) + y) & 3) === 0) c = hex('#741a20'); }
      const os = ((x - 160) / 170) ** 2 * 0.35 + (y > 170 ? (y - 170) / 10 * 0.12 : 0); if (h(x, y, 495) < 0.06) c = e_mezcla(c, hex('#000000'), 0.25);
      pset(x, y, os > 0 ? e_mezcla(c, NEG, os) : c); } }
  for (let x = 0; x < 320; x += 2) pset(x, 156, hex('#d8c8a0'));
  // los clavos de la correa
  for (let x = 12; x < 320; x += 26) { pset(x, 17, hex('#2a2a30')); pset(x, 18, hex('#9a9aa4')); }
  // telarañas en los rincones de la viga
  e_telarana(R, 0, 22, 12, 1, 1); e_telarana(R, 266, 22, 8, 1, 1);
  // el clavo vacío del retrato que falta
  pset(292, 54, hex('#c8c0b0')); pset(292, 55, hex('#3a3a40')); e_tinte(R, 293, 55, 293, 56, 0.3);
  // los retratos, cada uno con su marco, su cordel y su placa con el año
  const { y0, y1 } = E_MARCO;
  for (const r of E_RET) {
    const x0 = r.x - 15, x1 = r.x + 15, ix0 = r.x - 11, ix1 = r.x + 11, iy0 = y0 + 4, iy1 = y1 - 5;
    // el cordel y el clavo
    linea(r.x, 49, x0 + 5, y0, hex('#3a2a1a')); linea(r.x, 49, x1 - 5, y0, hex('#3a2a1a')); pset(r.x, 49, hex('#c8c0b0')); pset(r.x, 48, hex('#3a3a40'));
    e_tinte(R, x0 + 2, y0 + 2, x1 + 3, y1 + 3, 0.38);
    if (r.marco === 'ovalo') {
      for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) { const d = ((i - r.x) / 15.5) ** 2 + ((j - (y0 + y1) / 2) / 18.5) ** 2; if (d > 1) continue; const a = (i - r.x) + (j - 76) * 0.8; pset(i, j, d > 0.9 ? hex('#6a4a10') : a < -6 ? hex('#f0d070') : a < 6 ? hex('#c8a040') : hex('#8a6a1c')); }
      e_busto(R, r.x, iy0, r.busto);
      for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) { const d = ((i - r.x) / 15.5) ** 2 + ((j - (y0 + y1) / 2) / 18.5) ** 2, di = ((i - r.x) / 11.5) ** 2 + ((j - (y0 + y1) / 2) / 14.5) ** 2; if (d <= 1 && di > 1) { const a = (i - r.x) + (j - 76) * 0.8; pset(i, j, d > 0.9 ? hex('#6a4a10') : di < 1.1 ? hex('#5a3e10') : a < -6 ? hex('#f0d070') : a < 6 ? hex('#c8a040') : hex('#8a6a1c')); } }
      for (const a of [0, 1.57, 3.14, 4.71]) pset(Math.round(r.x + Math.cos(a) * 13.5), Math.round(76 + Math.sin(a) * 16.5), hex('#fff0a0'));
    } else {
      const P = { pino: ['#b08a58', '#d8b07a', '#7a5a30', 3], nogal: ['#4a2e1a', '#7a5232', '#2a1a0e', 4], foto: ['#1e1a1e', '#3a343a', '#0e0a0e', 2], color: ['#a8b0b8', '#e0e6ec', '#6a727a', 2], digital: ['#1a1a20', '#3a3a44', '#0a0a0e', 3] }[r.marco];
      rect(x0, y0, x1, y1, hex('#140c08')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex(P[0])); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex(P[1])); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex(P[1])); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, hex(P[2])); rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex(P[2]));
      if (r.marco === 'pino') for (let k = 0; k < 8; k++) pset(x0 + 2 + Math.round(h(k, 1, 493) * 26), h(k, 2, 493) < 0.5 ? y0 + 2 : y1 - 2, hex('#8a6a3a'));
      if (r.marco === 'nogal') { rect(ix0 - 1, iy0 - 1, ix1 + 1, iy0 - 1, hex('#c8a040')); rect(ix0 - 1, iy0 - 1, ix0 - 1, iy1 + 1, hex('#c8a040')); rect(ix1 + 1, iy0 - 1, ix1 + 1, iy1 + 1, hex('#8a6a1c')); rect(ix0 - 1, iy1 + 1, ix1 + 1, iy1 + 1, hex('#8a6a1c'));
        for (const [cx, cy] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) { disco(cx + 0.5, cy + 0.5, 1.6, hex('#c8a040')); pset(cx, cy, hex('#fff0a0')); } }
      if (r.marco === 'foto') { rect(ix0 - 2, iy0 - 2, ix1 + 2, iy1 + 2, hex('#ece4d0')); rect(ix0 - 2, iy1 + 2, ix1 + 2, iy1 + 2, hex('#c8bea8')); }
      if (r.marco === 'color') { rect(ix0 - 1, iy0 - 1, ix1 + 1, iy1 + 1, hex('#f4f4f0')); }
      if (r.marco === 'digital') { rect(ix0, iy0, ix1, iy1, hex('#0a1420'));
        // el cable que baja por la pared hasta el zócalo
        for (let y = y1 + 1; y < 110; y++) pset(x1 - 4 + Math.round(Math.sin((y - y1) * 0.25) * 1.2), y, hex('#1a1a20')); }
      else e_busto(R, r.x, iy0, r.busto);
      if (r.marco === 'foto') for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) if (h(x, y, 494) < 0.05) pset(x, y, e_mezcla(R.pget(x, y), hex('#f0e0c0'), 0.3));
      if (r.marco === 'color') { for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) pset(x, y, e_mezcla(R.pget(x, y), hex('#f0d8b8'), 0.18)); pset(ix0, iy0, hex('#f4f4f0')); pset(ix1, iy0, hex('#f4f4f0')); }
    }
    // la placa de latón con el año
    const py = y1 + 3; rect(r.x - 11, py, r.x + 11, py + 8, hex('#6a4a10')); rect(r.x - 10, py + 1, r.x + 10, py + 7, hex('#d8b050')); rect(r.x - 10, py + 1, r.x + 10, py + 1, hex('#f8e090')); rect(r.x - 10, py + 7, r.x + 10, py + 7, hex('#a8802c'));
    e_cifras(R, String(r.año), r.x, py + 2, hex('#3a2408'));
  }
  // los tres candelabros de pie entre los retratos (las llamas son animadas)
  for (const [cx] of LUCES) {
    const L = hex('#f0d070'), M = hex('#c8a040'), D = hex('#7a5a14');
    e_tinte(R, cx - 8, 138, cx + 8, 141, 0.45);
    for (const s of [-1, 1]) { linea(cx, 132, cx + s * 6, 139, D); linea(cx, 131, cx + s * 6, 138, M); }
    rect(cx - 1, 100, cx + 1, 133, M); rect(cx - 1, 100, cx - 1, 133, L); rect(cx + 1, 100, cx + 1, 133, D);
    for (const y of [104, 116, 126]) { rect(cx - 2, y, cx + 2, y + 1, M); rect(cx - 2, y, cx + 2, y, L); }
    linea(cx - 5, 96, cx - 5, 99, M); linea(cx + 5, 96, cx + 5, 99, M); rect(cx - 5, 99, cx + 5, 100, M); rect(cx - 5, 99, cx + 5, 99, L);
    for (const dx of [-5, 0, 5]) { const top = dx ? 93 : 90; rect(cx + dx - 2, top + 3 + (dx ? 0 : 3), cx + dx + 2, top + 4 + (dx ? 0 : 3), M); rect(cx + dx - 1, top, cx + dx + 1, top + 3 + (dx ? 0 : 3), hex('#f0e6cc')); pset(cx + dx + 1, top + 1, hex('#c8bca0')); pset(cx + dx - 1, top + 2, hex('#fffaf0')); }
  }
}

// los colores del laboratorio, del tanque y del campo de 1878
const FP = pal({
  pared: '#e0e8da', paredS: '#c8d2c2', paredL: '#eef3e8', paredJ: '#b2bead',
  techo: '#eaece2', techoS: '#d0d4c8', techoJ: '#b8beb0',
  azul: '#c2dcd6', azulS: '#a2c0ba', azulL: '#dceee8', azulJ: '#88a6a0',
  zocalo: '#55666a', zocaloL: '#7a8e90',
  suelo1: '#b8b09e', suelo2: '#a89f8c', sueloS: '#8c8474', sueloL: '#cec6b4', sueloJ: '#958d7c',
  tablero: '#353b45', tableroL: '#545c69', tableroS: '#23272e', tableroB: '#6c7684',
  mueble: '#a2b4a8', muebleS: '#7e9286', muebleL: '#c2d0c4', muebleD: '#56665c',
  pizarra: '#2f4b3d', pizarraS: '#26402f', pizarraL: '#3c5a4a', tiza: '#e6ece0', tizaS: '#9cb4a4', tizaA: '#f0d878', tizaZ: '#94cce4',
  zumo: '#f0a030', zumoS: '#c87618', zumoL: '#f8c868', pulpa: '#e88a20', vidrio: '#d8eef2', vidrioS: '#86a4b0', vidrioL: '#ffffff',
  agua: '#5aa2cc', aguaS: '#3e80ae', aguaD: '#2c6290', aguaL: '#9cd4ec', aire: '#e8f1f0', aireS: '#d4e3e3', aireJ: '#c4d6d6',
  cueva: '#2e5f86', cuevaS: '#244c6e', cuevaL: '#4f8ab4', borde: '#8a8479', grieta: '#8e887e',
  anhL: '#eeebe4', arcillaD: '#5e4430', pozoD: '#2c2018', pozoS: '#45342a',
  pajita: '#e04a4a', esponja: '#f0c444', esponjaS: '#c8982a', esponjaL: '#f8e088', esponjaW: '#a8842e', esponjaWS: '#7e6224',
  plato: '#f2f2ee', platoS: '#c8ccd0', pera: '#c83a3a',
  yeso: '#efebe2', yesoS: '#c6c0b4', yesoL: '#ffffff',
  bata: '#f2f4f2', bataS: '#cfd6d4', puerta: '#a07850', puertaS: '#7e5a38', puertaL: '#bc9668', pasillo: '#cfd4d8', pasilloS: '#b2b8be',
  // el campo de 1878 (cielo y mar con tonos propios: la capa del cielo los reconoce)
  c0: '#5b97d3', c1: '#73abe1', c2: '#91c2ea', c3: '#b3d5ef', c4: '#d3e5f1',
  nS: '#a9bdd5', nM: '#dbe5f0', nL: '#f7f9fc', sol: '#fff6d0', solH: '#f2eed8',
  m0: '#3b6f95', m1: '#4b83a9', m2: '#6699bb', mL: '#a3cbe1', costa: '#8aa2b6', costaS: '#73909f', costaL: '#a7bccb',
  tierra: '#6e4a2e', tierraS: '#4e331f', tierraL: '#8e6a46', tierraD: '#38241a', terron: '#a07a52',
  pradoL: '#a6c46a', prado: '#86a84e', pradoS: '#64863a', rastrojo: '#c8b46e', rastrojoS: '#a08c4e',
  b0: '#3c6a44', b1: '#2c5636', b2: '#1e402a', b3: '#5a8a4e', abeto: '#1e4232', abetoL: '#2e5a42',
  casa: '#e6dcc2', casaS: '#c4b898', casaL: '#f4ecd8', tejado: '#5a5c68', tejadoS: '#40424c', tejadoL: '#767a88',
  granero: '#a8432f', graneroS: '#7e2e20', graneroL: '#c45a42', ladr: '#9a4a3a',
  valla: '#8a7458', vallaS: '#5e4c38', vallaL: '#ae987a', altramuz: '#9a6ac8', altramuzR: '#e07aa8', polvo: '#b8a084',
});

const f_lim = (v) => Math.max(0, Math.min(1, v));

// umbral de tramado (Bayer 4×4)
const f_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const f_umb = (x, y) => (f_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// mezcla dos colores: a = 0 deja c, a = 1 da d
function f_mezclaF(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// los fondos fijos de cada encuadre, pintados una vez en su búfer
const f_capasF = new Map();

function f_capaF(R, clave, dibuja) {
  let b = f_capasF.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); f_capasF.set(clave, b); }
  return b;
}

// cifras pequeñas de 3 × 5 (etiquetas de muestras y la pizarra)
const f_DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001011001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111' };

function f_cifra(R, n, x, y, c, salta = 0) {
  String(n).split('').forEach((d, k) => { const p = f_DIG[d]; for (let i = 0; i < 15; i++) if (p[i] === '1' && (!salta || h(x + k * 4 + i % 3, y + (i / 3 | 0), 77) > salta)) R.pset(x + k * 4 + i % 3, y + (i / 3 | 0), c); });
}

// una línea de tiza: se salta algún píxel, como la tiza de verdad
function f_tiza(R, x0, y0, x1, y1, c, hueco = 0.18) { R.linea(x0, y0, x1, y1, (x, y) => (h(x, y, 31) > hueco ? c : null)); }

// nube de tres tonos (sombra, cuerpo y luz) hecha de bolas; ps es el pset que respeta el hueco donde va
function f_nubeF(ps, cx, cy, w, cols) {
  const bolas = [[0, 0, 0.32], [-0.34, 0.08, 0.22], [0.32, 0.06, 0.25], [-0.12, -0.13, 0.25], [0.15, -0.09, 0.22], [0.5, 0.12, 0.14], [-0.52, 0.13, 0.13]];
  const disco = (x0, y0, r, c) => { for (let y = Math.floor(y0 - r); y <= Math.ceil(y0 + r); y++) for (let x = Math.floor(x0 - r); x <= Math.ceil(x0 + r); x++) if ((x + 0.5 - x0) ** 2 + (y + 0.5 - y0) ** 2 <= r * r) ps(x, y, c); };
  for (const [dx, dy, r] of bolas) disco(cx + dx * w, cy + dy * w + 1.2, Math.max(1, r * w), cols[0]);
  for (const [dx, dy, r] of bolas) disco(cx + dx * w, cy + dy * w, Math.max(1, r * w), cols[1]);
  for (const [dx, dy, r] of bolas) if (dy < 0.07) disco(cx + dx * w - 1, cy + dy * w - 1, Math.max(1, r * w * 0.62), cols[2]);
}

// una gaviota pequeña en vuelo (dos alas que baten)
function f_gaviotaF(ps, x, y, t, k = 0) {
  const a = Math.sin(t * 7 + k * 1.7) > 0 ? -1 : 0; x = Math.round(x); y = Math.round(y);
  ps(x, y, C.blanco); ps(x - 1, y + a, C.blanco); ps(x + 1, y + a, C.blanco); ps(x - 2, y + a * 2 - (a ? 0 : 1) + 1, FP.nS); ps(x + 2, y + a * 2 - (a ? 0 : 1) + 1, FP.nS);
}

const f_MESA = { suelo: 163, top: 133, vaso: [118, 103, 137], tanque: [148, 72, 266, 138], mar: 93, pozo: [204, 210, 124] };

function f_labMesa(R, t, o) {
  const { pset, disco, linea } = R, G = f_MESA;
  R.copiar(f_capaF(R, 'mesa', () => f_mesaFijo(R)));
  // la bahía por la ventana, el alféizar y la puerta del pasillo
  f_ventanaMar(R, t, 13, 25, 77, 75, 53);
  f_marcoVentana(R);
  f_alfeizar(R, t);
  f_puertaPasa(R, t);
  // el calor del radiador: unos puntos que tiemblan encima
  for (let k = 0; k < 10; k++) { const x = 22 + k * 5, u = (t * 0.7 + k * 0.37) % 1; pset(Math.round(x + Math.sin(t * 3 + k) * 1.2), Math.round(102 - u * 8), u < 0.5 ? FP.azulL : FP.paredL); }
  // el vaso de precipitados que hierve en la placa del estante de abajo (luz roja, burbujas y vapor)
  { const on = Math.sin(t * 5) > -0.6; pset(229, 62, on ? C.rojo : hex('#6a2a2a'));
    for (let k = 0; k < 4; k++) { const u = (t * 1.6 + k / 4) % 1; pset(225 + ((k * 3 + Math.floor(t * 4)) % 6), Math.round(60 - u * 5), FP.aguaL); }
    for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; pset(Math.round(228 + Math.sin(t * 2 + k * 2) * 2 + u * 2), Math.round(52 - u * 9), u < 0.6 ? FP.paredL : FP.blancoV ?? C.blanco); } }
  // el vaso de zumo y la pajita
  f_vasoZumo(R, t, G.vaso[0], G.vaso[1], G.vaso[2], 112);
  // el tanque con la isla en corte
  f_tanqueMesa(R, t, o);
  // la bomba del aireador: la luz verde late y el visor se mueve
  pset(275, 133, Math.floor(t * 2) % 2 ? C.verdeL ?? hex('#6ad86a') : hex('#2e5a2e'));
  for (let i = 0; i < 4; i++) pset(269 + i, 135, i <= Math.floor(t * 3) % 4 ? hex('#8ad0f0') : hex('#24323c'));
  // el trozo de yeso con su etiqueta
  if (o.yeso !== false) f_yeso(R, 140, 137);
  return { suelo: G.suelo, mesa: { x0: 90, x1: 280, y: G.top, borde: 139 }, vaso: { x: G.vaso[0], y0: G.vaso[1], y1: G.vaso[2], zumo: 112, pajita: [134, 84] },
    tanque: { x0: G.tanque[0], y0: G.tanque[1], x1: G.tanque[2], y1: G.tanque[3], mar: G.mar, pozo: { x: 207, boca: 85, fondo: 124 } }, yeso: [140, 133],
    pizarra: [91, 22, 177, 74], ventana: [13, 25, 77, 75], puerta: [282, 46, 318, 141], libre: [[40, 88], [284, 316]] };
}

// el fondo fijo de 'mesa': techo, paredes, ventana, pizarra, estanterías, bata, radiador, puerta, mesa y suelo
function f_mesaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de placas con su rejilla en perspectiva y la pantalla fluorescente con su difusor
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) {
    const u = (x - 160) * (14 / (14 + 12 - y)), lin = y === 5 || y === 11 || ((Math.round(u) % 34) + 34) % 34 === 0;
    pset(x, y, lin ? FP.techoJ : h(x, y, 1) < 0.07 ? FP.techoS : FP.techo);
  }
  rect(192, 2, 256, 8, C.k); rect(193, 3, 255, 7, C.blanco); for (let x = 197; x < 254; x += 5) rect(x, 3, x, 7, FP.techoS); rect(193, 7, 255, 7, FP.techoS);
  rect(0, 12, 319, 14, FP.techoS); rect(0, 14, 319, 14, FP.paredL);
  // la pared de pintura con sus juntas de panel y un velo de luz que viene de la ventana; el brillo del fluorescente
  for (let y = 15; y < 96; y++) for (let x = 0; x < 320; x++) {
    const luz = 0.75 - Math.abs(x - 46) / 260 - (y - 15) / 300, n = h(x, y, 2);
    let c = FP.pared; if (f_umb(x, y) < luz * 0.45) c = FP.paredL; else if (f_umb(x, y) > 0.86 + luz * 0.2) c = FP.paredS;
    if (n < 0.025) c = FP.paredS; if (y < 22 && x > 186 && x < 262 && (x + y) % 3 === 0) c = FP.paredL;
    pset(x, y, c);
  }
  for (const x of [84, 182, 278]) { rect(x, 15, x, 95, FP.paredJ); rect(x + 1, 15, x + 1, 95, FP.paredL); }
  // el pasamanos y el alicatado (azulejos con su llaga y el brillo de arriba)
  rect(0, 95, 319, 98, FP.muebleS); rect(0, 95, 319, 95, FP.muebleL); rect(0, 98, 319, 98, FP.muebleD);
  for (let y = 99; y < 137; y++) for (let x = 0; x < 320; x++) {
    const tx = x % 10, ty = (y - 99) % 7, k = h(Math.floor(x / 10), Math.floor((y - 99) / 7), 3);
    pset(x, y, tx === 0 || ty === 0 ? FP.azulJ : ty === 1 && tx < 5 ? FP.azulL : k < 0.15 && tx > 6 ? FP.azulS : FP.azul);
  }
  rect(0, 137, 319, 141, FP.zocalo); rect(0, 137, 319, 137, FP.zocaloL);
  // el suelo de linóleo en perspectiva: baldosas, llagas, motas, la mancha de luz de la ventana y el reflejo de la mesa
  for (let y = 142; y < 180; y++) { const s = y - 40, fila = Math.floor(Math.log(s) * 9);
    for (let x = 0; x < 320; x++) {
      const u = (x - 160) / s * 60, col = Math.floor(u / 14), fu = u / 14 - col, fv = Math.log(s) * 9 - fila;
      let c = (col + fila) % 2 ? FP.suelo1 : FP.suelo2;
      if (fu < 0.06 || fv < 0.12) c = FP.sueloJ; else { const n = h(x, y, 4); if (n < 0.05) c = FP.sueloS; else if (n > 0.96) c = FP.sueloL; }
      const lx = x - (y - 142) * 1.1; if (lx > 18 && lx < 84 && f_umb(x, y) < 0.5) c = f_mezclaF(c, FP.sueloL, 0.6);
      if (x > 92 && x < 280 && y < 168 && f_umb(x, y) < 0.35 * (168 - y) / 26) c = f_mezclaF(c, FP.tableroS, 0.5);
      pset(x, y, c);
    } }
  // la ventana (el exterior lo pinta cada fotograma) con su repisa
  rect(10, 22, 80, 78, C.k); rect(11, 23, 79, 77, C.blanco); rect(11, 77, 79, 77, FP.paredS);
  rect(7, 76, 83, 80, C.k); rect(8, 76, 82, 78, C.blanco); rect(8, 79, 82, 79, FP.techoS);
  for (let x = 8; x < 82; x++) if (f_umb(x, 81) < 0.6) pset(x, 81, FP.paredS); for (let x = 8; x < 82; x += 2) pset(x, 82, FP.paredS);
  // el radiador bajo la ventana: columnas con luz y sombra, el tubo y la llave roja
  rect(16, 104, 74, 129, C.k);
  for (let x = 17; x < 73; x += 4) { rect(x, 105, x + 2, 128, C.metal); rect(x, 105, x, 128, C.metalL); rect(x + 2, 106, x + 2, 128, C.metalS); pset(x + 1, 105, C.blanco); }
  rect(17, 122, 73, 123, C.metalS); rect(74, 112, 80, 114, C.k); rect(75, 113, 80, 113, C.metal); disco(80, 111, 2, C.rojo); pset(79, 110, C.blanco);
  rect(18, 130, 72, 131, FP.azulS); rect(18, 129, 18, 136, C.metalS); rect(72, 129, 72, 136, C.metalS);
  // la bata blanca colgada de su percha, con sus pliegues, el bolsillo y un bolígrafo
  rect(88, 80, 96, 81, C.metalD); pset(92, 79, C.metalD);
  poligono([[86, 83], [98, 83], [101, 118], [83, 118]], FP.bataS); poligono([[87, 83], [97, 83], [99, 116], [85, 116]], FP.bata);
  linea(92, 84, 91, 116, FP.bataS); linea(88, 90, 86, 116, FP.bataS); linea(97, 92, 98, 116, FP.bataS);
  rect(94, 96, 97, 100, FP.bataS); rect(95, 94, 95, 97, C.azul ?? hex('#2a4fa8')); pset(92, 88, FP.bataS); pset(92, 102, FP.bataS);
  for (let x = 83; x < 102; x++) if (f_umb(x, 119) < 0.5) pset(x + 2, 119, FP.azulS);
  // un cartel de seguridad (el triángulo con la exclamación y el de la gota) junto a la bata
  poligono([[108, 92], [116, 79], [124, 92]], C.k); poligono([[110, 91], [116, 81], [122, 91]], C.amarillo); rect(116, 84, 116, 88, C.k); pset(116, 90, C.k);
  rect(128, 80, 144, 94, C.k); rect(129, 81, 143, 93, C.blanco); disco(136, 89, 3, FP.agua); poligono([[133, 88], [136, 82], [139, 88]], FP.agua); pset(135, 88, FP.aguaL);
  // la pizarra: el marco de madera, la piedra con borrones de tiza y los dibujos del vaso y del pozo
  rect(88, 19, 180, 79, C.k); rect(89, 20, 179, 78, C.madera); rect(89, 20, 179, 20, C.maderaL); rect(89, 78, 179, 78, C.maderaS);
  for (let y = 22; y < 75; y++) for (let x = 91; x < 178; x++) {
    const b = Math.sin(x * 0.05 + y * 0.02) + Math.sin(x * 0.013 - y * 0.07) * 0.8 + (h(x >> 2, y, 5) - 0.5) * 0.6;
    pset(x, y, b > 1.2 && f_umb(x, y) < 0.4 ? FP.pizarraL : b < -1.3 && f_umb(x, y) < 0.5 ? FP.pizarraS : FP.pizarra);
  }
  for (let k = 0; k < 6; k++) { const y = 26 + Math.floor(h(k, 6) * 44), x = 94 + Math.floor(h(k, 7) * 60); for (let i = 0; i < 14; i++) if (h(i, k, 8) > 0.4) pset(x + i, y, FP.pizarraL); }
  // el vaso con la pajita y la raya de nivel
  f_tiza(R, 98, 32, 102, 62, FP.tiza); f_tiza(R, 120, 32, 116, 62, FP.tiza); f_tiza(R, 102, 62, 116, 62, FP.tiza);
  for (let x = 100; x < 119; x += 2) pset(x, 42 + (x % 4 ? 0 : 1), FP.tizaA); for (let y = 44; y < 61; y += 3) for (let x = 102; x < 117; x += 4) pset(x + (y % 2), y, FP.tizaA);
  f_tiza(R, 110, 60, 124, 26, FP.tiza); f_tiza(R, 112, 60, 126, 27, FP.tiza);
  for (let x = 94; x < 176; x += 4) { pset(x, 42, FP.tizaA); pset(x + 1, 42, FP.tizaA); }
  // la isla en corte con el pozo: olas azules, la loma, el pozo con su agua y las flechitas que entran por abajo
  for (let x = 134; x < 146; x++) pset(x, 42 + Math.round(Math.sin(x * 0.9)), FP.tizaZ); for (let x = 164; x < 176; x++) pset(x, 42 + Math.round(Math.sin(x * 0.9)), FP.tizaZ);
  for (let x = 146; x <= 164; x++) pset(x, Math.round(42 - Math.sin((x - 146) / 18 * Math.PI) * 6), FP.tiza);
  f_tiza(R, 152, 38, 152, 66, FP.tiza); f_tiza(R, 158, 38, 158, 66, FP.tiza); f_tiza(R, 152, 66, 158, 66, FP.tiza);
  for (let y = 43; y < 66; y += 2) for (let x = 153; x < 158; x += 2) pset(x + (y % 4 ? 1 : 0), y, FP.tizaZ);
  for (let x = 134; x < 176; x += 3) if (x < 151 || x > 159) { pset(x, 52, FP.tizaS); pset(x + 1, 58, FP.tizaS); }
  f_tiza(R, 136, 64, 149, 64, FP.tizaZ, 0.05); linea(147, 62, 149, 64, FP.tizaZ); linea(147, 66, 149, 64, FP.tizaZ);
  f_tiza(R, 174, 64, 161, 64, FP.tizaZ, 0.05); linea(163, 62, 161, 64, FP.tizaZ); linea(163, 66, 161, 64, FP.tizaZ);
  rect(127, 44, 131, 44, FP.tiza); rect(127, 47, 131, 47, FP.tiza);
  f_cifra(R, 1, 96, 67, FP.tiza, 0.15); f_cifra(R, 2, 137, 68, FP.tiza, 0.15);
  // la repisa de la tiza con las tizas y el borrador
  rect(86, 79, 182, 82, C.k); rect(87, 79, 181, 81, C.maderaL); rect(87, 81, 181, 81, C.madera);
  rect(100, 78, 105, 78, FP.tiza); rect(110, 78, 113, 78, FP.tizaA); rect(118, 78, 120, 78, FP.tizaZ);
  rect(150, 76, 162, 79, C.k); rect(151, 76, 161, 77, C.maderaL); rect(151, 78, 161, 78, FP.tizaS);
  for (let x = 86; x < 183; x++) if (f_umb(x, 83) < 0.55) pset(x, 83, FP.paredS);
  // las estanterías de metal: libros, matraces, tarros de muestras de roca, el microscopio, la gradilla, la placa
  rect(186, 17, 187, 67, C.metalS); rect(271, 17, 272, 67, C.metalS); rect(186, 17, 186, 67, C.metalL);
  for (const y of [33, 49, 65]) { rect(186, y, 272, y + 1, C.metalL); rect(186, y + 2, 272, y + 2, C.metalS); for (let x = 188; x < 271; x++) if (f_umb(x, y + 3) < 0.6) pset(x, y + 3, FP.paredS); }
  // estante 1: libros, el matraz redondo verde, los tarros de rocas, el reloj de arena y la caracola
  [[189, 11, C.rojo], [192, 12, hex('#3a5a8a')], [195, 10, hex('#5a8a4a')], [198, 13, hex('#8a6a3a')], [201, 11, hex('#6a3a6a')], [204, 12, hex('#c8a040')]].forEach(([x, a, c]) => {
    rect(x, 33 - a, x + 2, 32, c); rect(x, 33 - a, x, 32, f_mezclaF(c, C.blanco, 0.3)); rect(x, 33 - a + 2, x + 2, 33 - a + 2, f_mezclaF(c, C.k, 0.3)); pset(x + 1, 29, f_mezclaF(c, C.blanco, 0.5)); });
  rect(207, 22, 209, 32, hex('#4a3a2a')); linea(207, 22, 210, 32, hex('#6a5a4a'));
  disco(217, 27, 5, C.k); disco(217, 27, 4, hex('#d8eef0')); for (let y = 27; y <= 31; y++) for (let x = 213; x <= 221; x++) if ((x - 216.5) ** 2 + (y - 26.5) ** 2 <= 16) pset(x, y, hex('#5ab86a')); rect(216, 18, 218, 22, C.k); pset(217, 19, hex('#d8eef0')); pset(215, 25, C.blanco);
  for (const [x, c] of [[226, C.piedra], [235, FP.arcilla ?? C.arcilla], [244, FP.yeso]]) { rect(x, 22, x + 7, 32, C.k); rect(x + 1, 23, x + 6, 31, hex('#dcecee')); rect(x, 21, x + 7, 22, C.metalD);
    disco(x + 3, 29, 2, c); disco(x + 5, 30, 1.6, c); pset(x + 2, 28, C.blanco); rect(x + 2, 25, x + 5, 26, C.blanco); f_cifra(R, (x / 9 | 0) % 10, x + 3, 24, C.k); }
  rect(254, 22, 260, 23, C.madera); rect(254, 31, 260, 32, C.madera); poligono([[255, 24], [259, 24], [257, 27]], hex('#e8d8a8')); poligono([[257, 27], [255, 31], [259, 31]], hex('#e8d8a8')); rect(256, 29, 258, 30, hex('#d8b46a'));
  disco(266, 30, 3, hex('#f0c8b0')); linea(264, 30, 268, 30, hex('#c89a88')); pset(265, 28, C.blanco);
  // estante 2: los matraces de colores, los frascos de reactivos con su etiqueta (solo números) y el microscopio
  for (const [x, c] of [[190, hex('#4a8ad0')], [201, hex('#d84a6a')], [211, hex('#e8c040')]]) {
    poligono([[x + 3, 37], [x + 6, 37], [x + 9, 48], [x, 48]], C.k); poligono([[x + 4, 38], [x + 5, 38], [x + 8, 47], [x + 1, 47]], hex('#dcecee'));
    poligono([[x + 2, 43], [x + 7, 43], [x + 8, 47], [x + 1, 47]], c); rect(x + 2, 43, x + 7, 43, f_mezclaF(c, C.blanco, 0.4)); pset(x + 3, 40, C.blanco); }
  for (const x of [222, 230]) { rect(x, 38, x + 6, 48, C.k); rect(x + 1, 39, x + 5, 47, hex('#7a4a1e')); rect(x + 2, 36, x + 4, 38, C.k); rect(x + 1, 42, x + 5, 45, C.blanco); f_cifra(R, x === 222 ? 4 : 9, x + 2, 41, C.k); pset(x + 2, 40, hex('#a8743c')); }
  rect(246, 46, 262, 48, C.k); rect(247, 46, 261, 47, C.metalD); rect(252, 36, 255, 45, C.k); rect(253, 37, 254, 45, C.blanco); linea(250, 35, 256, 41, C.k); rect(249, 33, 251, 36, C.k); pset(250, 34, C.metalL);
  rect(257, 40, 261, 41, C.k); disco(258, 43, 2, C.metalS); pset(253, 39, C.metalS);
  // estante 3: la gradilla de tubos, la placa calefactora con su vaso, el tarro de arena y los testigos de roca
  rect(189, 60, 207, 64, C.k); rect(190, 61, 206, 63, hex('#d8d8e0')); for (let k = 0; k < 6; k++) { const x = 191 + k * 3; rect(x, 53, x + 1, 60, hex('#e8f4f4')); rect(x, 57, x + 1, 60, [hex('#5aa2cc'), C.rojo, hex('#e8c040'), hex('#5ab86a'), hex('#d84a6a'), hex('#5aa2cc')][k]); }
  rect(220, 61, 236, 64, C.k); rect(221, 61, 235, 63, C.metal); rect(221, 61, 235, 61, C.metalL);
  rect(222, 52, 232, 60, C.k); rect(223, 53, 231, 60, hex('#dcecee')); rect(223, 56, 231, 60, FP.agua); rect(223, 56, 231, 56, FP.aguaL); pset(224, 54, C.blanco);
  rect(242, 54, 250, 64, C.k); rect(243, 55, 249, 64, hex('#dcecee')); for (let y = 58; y < 64; y++) for (let x = 243; x < 250; x++) pset(x, y, h(x, y, 9) < 0.3 ? FP.arenaS ?? C.arenaS : FP.arena ?? C.arena); rect(242, 53, 250, 54, C.madera);
  for (let k = 0; k < 3; k++) { const x = 254 + k * 6; rect(x, 57, x + 4, 64, C.k); rect(x + 1, 57, x + 3, 64, k === 1 ? FP.yeso : C.arcilla); rect(x + 1, 61, x + 3, 61, k === 1 ? FP.yesoS : C.arcillaS); pset(x + 1, 58, C.blanco); }
  // la pared bajo los estantes, tras el tanque: la sombra que echa el tanque
  for (let y = 74; y < 138; y++) for (let x = 266; x < 272; x++) if (f_umb(x, y) < 0.55 - (x - 266) * 0.08) pset(x, y, y < 96 ? FP.paredS : FP.azulS);
  // la puerta del pasillo: marco, tablero de madera con vetas, la mirilla (el pasillo lo pinta cada fotograma), el
  // cartel de la gota, la manilla y la placa de patadas
  rect(280, 46, 319, 141, C.k); rect(281, 47, 319, 141, C.metalL); rect(281, 47, 281, 141, C.blanco);
  rect(284, 50, 319, 141, FP.puerta);
  for (let x = 285; x < 320; x++) for (let y = 51; y < 140; y++) { const v = Math.sin(x * 0.9 + Math.sin(y * 0.05 + x) * 2); if (v > 0.85) pset(x, y, FP.puertaS); else if (v < -0.92) pset(x, y, FP.puertaL); }
  rect(284, 50, 319, 50, FP.puertaL); rect(284, 50, 284, 141, FP.puertaL);
  rect(290, 56, 310, 80, C.k); rect(291, 57, 309, 79, FP.pasillo);
  poligono([[292, 95], [300, 83], [308, 95]], C.k); poligono([[294, 94], [300, 85], [306, 94]], C.amarillo); disco(300, 91, 1.6, FP.agua); pset(300, 88, FP.agua);
  rect(285, 102, 292, 104, C.k); rect(286, 102, 292, 103, C.metalL); disco(287, 103, 2, C.metal); pset(286, 102, C.blanco);
  rect(285, 128, 319, 139, C.metalS); rect(285, 128, 319, 128, C.metalL); for (let x = 288; x < 319; x += 6) pset(x, 133, C.metal);
  // la mesa: el tablero de resina negra con reflejos de la ventana, el canto, los cajones y los armarios
  for (let y = 133; y < 140; y++) for (let x = 90; x < 281; x++) {
    const r = (x - y * 1.6) % 47, n = h(x, y, 11);
    pset(x, y, y === 133 ? FP.tableroB : r > 0 && r < 3 && f_umb(x, y) < 0.5 ? FP.tableroL : n < 0.04 ? FP.tableroL : FP.tablero);
  }
  rect(90, 139, 280, 142, FP.tableroS); rect(90, 139, 280, 139, FP.tableroL);
  rect(92, 143, 278, 159, FP.mueble);
  for (let k = 0; k < 6; k++) { const x0 = 93 + k * 31, x1 = x0 + 29;
    rect(x0, 143, x1, 147, FP.muebleL); rect(x0 + 1, 144, x1 - 1, 146, FP.mueble); rect(x0 + 12, 145, x0 + 17, 145, C.metalD);
    rect(x0, 148, x1, 158, FP.mueble); rect(x0, 148, x1, 148, FP.muebleL); rect(x0, 148, x0, 158, FP.muebleL); rect(x1, 148, x1, 158, FP.muebleS); rect(x0, 158, x1, 158, FP.muebleS);
    rect(x1 - 4, 151, x1 - 3, 155, C.metalD); pset(x1 - 4, 151, C.metalL); }
  rect(92, 142, 278, 142, FP.muebleD); rect(94, 159, 276, 163, FP.muebleD); rect(94, 159, 276, 159, C.k);
  // la sombra del vaso y del tanque sobre el tablero (la luz viene de la ventana)
  for (let y = 134; y < 139; y++) { for (let x = 130; x < 140; x++) if (f_umb(x, y) < 0.5) pset(x, y, FP.tableroS); for (let x = 266; x < 280; x++) if (f_umb(x, y) < 0.6) pset(x, y, FP.tableroS); }
  // el marco del tanque (perfiles de aluminio con su luz, tornillos y la placa con su número) y sus patas de goma
  const [X0, Y0, X1, Y1] = f_MESA.tanque;
  rect(X0, Y0, X1, Y1, C.k); rect(X0 + 1, Y0 + 1, X1 - 1, Y0 + 2, C.metalL); rect(X0 + 1, Y1 - 3, X1 - 1, Y1 - 1, C.metal); rect(X0 + 1, Y1 - 1, X1 - 1, Y1 - 1, C.metalS);
  rect(X0 + 1, Y0 + 1, X0 + 2, Y1 - 1, C.metalL); rect(X1 - 2, Y0 + 1, X1 - 1, Y1 - 1, C.metal); rect(X1 - 1, Y0 + 1, X1 - 1, Y1 - 1, C.metalS);
  for (const [x, y] of [[X0 + 1, Y0 + 1], [X1 - 2, Y0 + 1], [X0 + 1, Y1 - 3], [X1 - 2, Y1 - 3]]) pset(x, y, C.blanco);
  rect(201, Y1 - 3, 213, Y1 - 1, C.oroS ?? hex('#a8801c')); rect(202, Y1 - 3, 212, Y1 - 3, C.oro); f_cifra(R, 14, 203, Y1 - 4, C.k);
  // la bomba del aireador con su rejilla y el tubo que sube por fuera y se mete en el tanque
  rect(267, 128, 280, 138, C.k); rect(268, 129, 279, 137, hex('#d8dcd8')); rect(268, 129, 279, 129, C.blanco); for (let y = 131; y < 134; y += 2) rect(276, y, 278, y, hex('#9aa4a4')); rect(268, 134, 273, 136, hex('#24323c'));
  linea(271, 128, 270, 76, hex('#c8dcd4')); linea(272, 128, 271, 76, hex('#9ab4ac')); linea(270, 75, 268, 70, hex('#c8dcd4')); linea(268, 70, 264, 70, hex('#c8dcd4')); linea(264, 70, 262, 72, hex('#c8dcd4')); linea(271, 75, 269, 71, hex('#9ab4ac'));
  // el taburete de laboratorio, delante a la izquierda (asiento redondo, patas cromadas y el aro para los pies)
  rect(6, 140, 30, 143, C.k); rect(7, 140, 29, 142, hex('#3a5a7a')); rect(7, 140, 29, 140, hex('#5a7a9a'));
  for (const [a, b] of [[10, 4], [26, 32]]) { linea(a, 144, b, 170, C.metalS); linea(a + 1, 144, b + 1, 170, C.metalL); }
  linea(17, 144, 16, 172, C.metalS); linea(18, 144, 18, 172, C.metalL); rect(8, 160, 28, 160, C.metal); rect(8, 161, 28, 161, C.metalS);
  for (let x = 2; x < 36; x++) if (f_umb(x, 173) < 0.5) { pset(x, 173, FP.sueloS); if (x > 6 && x < 32) pset(x, 174, FP.sueloS); }
  // una papelera a la derecha del taburete, en el suelo
  rect(282, 152, 296, 170, C.k); rect(283, 153, 295, 169, C.metal); rect(283, 153, 284, 169, C.metalL); rect(294, 153, 295, 169, C.metalS); rect(283, 153, 295, 154, C.metalD); for (let x = 287; x < 293; x += 2) rect(x, 156, x, 167, C.metalS);
  rect(287, 150, 290, 152, C.blanco); pset(288, 150, FP.tizaS);
}

// el marco y los parteluces de la ventana (se repintan encima del exterior)
function f_marcoVentana(R) {
  const { rect } = R; rect(44, 25, 46, 75, C.blanco); rect(46, 26, 46, 75, FP.paredS); rect(13, 49, 77, 50, C.blanco); rect(13, 51, 77, 51, FP.paredS);
  rect(13, 25, 77, 25, FP.paredS); rect(13, 25, 13, 75, FP.paredS); rect(60, 30, 61, 31, hex('#c8a040'));
}

// la bahía de Mahone por la ventana: cielo tramado, nubes de tres tonos a dos velocidades, la costa, la isla con sus
// robles, el mar con su oleaje y los brillos, un velero y gaviotas; todo recortado al hueco [x0, y0, x1, y1]
function f_ventanaMar(R, t, x0, y0, x1, y1, hor) {
  const { pset } = R;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let c;
    if (y < hor) { const f = (y - y0) / (hor - y0) * 3 + f_umb(x, y) - 0.5; c = [C.cielo1, C.cielo2, C.cielo3, C.cielo3][Math.max(0, Math.min(3, Math.floor(f)))];
      const cs = hor - 3 - Math.round(1.5 * Math.sin(x * 0.18) + (x > 50 ? 1 : 0)); if (y >= cs) c = y === cs ? FP.costaL : FP.costa; }
    else { const d = y - hor, u = x + t * (2 + d * 0.3); c = d < 2 ? C.marNL : d < 9 ? C.marN : C.marNS;
      if (h(Math.floor(u / 5), y, 12) > 0.86 - d * 0.004) c = d < 6 ? C.espuma : C.marNL;
      if (d > 1 && Math.sin(x * 0.7 + t * 2 + y * 3) > 0.96) c = C.blanco; }
    pset(x, y, c);
  }
  // nubes: dos lejanas y lentas, una más baja y deprisa
  const ps = (x, y, c) => pset(x, y, c), NC = [hex('#b8c8dc'), hex('#e2ecf6'), C.blanco];
  f_nubeF(ps, x0 - 20 + ((t * 1.1) % 100), y0 + 8, 16, NC);
  f_nubeF(ps, x0 - 20 + ((t * 1.1 + 52) % 100), y0 + 5, 11, NC);
  f_nubeF(ps, x0 - 16 + ((t * 2.4 + 30) % 96), y0 + 17, 9, NC);
  // la isla de los robles en el horizonte
  for (let x = 52; x < 72; x++) { const a = Math.round(3 - Math.abs(x - 62) * 0.25); for (let y = hor - a; y < hor + 1; y++) pset(x, y, y === hor - a ? C.hojaL : C.hojaS); }
  for (const [x, r] of [[56, 2], [60, 3], [65, 2.5], [69, 2]]) { R.disco(x, hor - 4, r, C.hojaS); R.disco(x - 0.5, hor - 4.5, r * 0.6, C.hoja); }
  // el velero que cruza despacio y se mece
  { const vx = x0 - 8 + ((t * 2.2) % 80), vy = hor + 6 + Math.round(Math.sin(t * 1.6)); R.poligono([[vx - 5, vy], [vx + 5, vy], [vx + 3, vy + 2], [vx - 3, vy + 2]], C.madera);
    R.poligono([[vx, vy - 12], [vx, vy - 1], [vx + 6, vy - 1]], C.blanco); R.poligono([[vx - 1, vy - 10], [vx - 1, vy - 1], [vx - 5, vy - 1]], hex('#e8e0d0')); R.linea(vx, vy - 13, vx, vy, C.k); pset(vx, vy - 14, C.rojo); }
  // gaviotas
  for (let k = 0; k < 2; k++) { const u = ((t * (5 + k * 2) + k * 37) % 90), gx = x0 - 8 + u, gy = y0 + 10 + k * 8 + Math.sin(t * 1.3 + k) * 2; f_gaviotaF(ps, gx, gy, t, k); }
  // el reflejo del cristal: dos rayas en diagonal
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = (x - x0) + (y - y0) * 0.8; if ((d > 34 && d < 38) || (d > 41 && d < 43)) if (f_umb(x, y) < 0.5) pset(x, y, f_mezclaF(R.pget(x, y), C.blanco, 0.45)); }
  R.recorte(null);
}

// lo que hay en el alféizar: el cactus en su maceta, la caracola y los prismáticos
function f_alfeizar(R, t) {
  const { rect, pset, disco } = R;
  rect(16, 70, 24, 76, C.k); rect(17, 71, 23, 75, hex('#c8643a')); rect(17, 71, 23, 71, hex('#e08a5a')); rect(16, 69, 24, 70, hex('#a84a2a'));
  rect(19, 60, 21, 69, hex('#3a7a4a')); rect(19, 60, 19, 69, hex('#5aa060')); rect(16, 63, 18, 64, hex('#3a7a4a')); rect(16, 61, 16, 63, hex('#3a7a4a')); rect(22, 65, 24, 66, hex('#3a7a4a')); rect(24, 62, 24, 65, hex('#3a7a4a')); pset(20, 59, hex('#e87aa8'));
  disco(54, 74, 3, hex('#f0c8b0')); R.linea(51, 74, 57, 74, hex('#c89a88')); pset(53, 72, C.blanco);
  rect(62, 70, 72, 75, C.k); disco(64, 73, 2.5, hex('#2a2a32')); disco(70, 73, 2.5, hex('#2a2a32')); rect(64, 71, 70, 72, hex('#3a3a44')); pset(63, 72, hex('#8ac0e0')); pset(69, 72, hex('#8ac0e0'));
}

// la mirilla de la puerta: el pasillo con su zócalo, un extintor, y de vez en cuando alguien con bata que pasa
function f_puertaPasa(R, t) {
  const { pset } = R;
  R.recorte([291, 57, 309, 79]);
  const u = (t % 9) / 9, px = Math.round(286 + u * 40);
  if (u < 0.75) { R.disco(px, 66, 3, hex('#e8b890')); R.disco(px - 1, 64, 3, hex('#5a3418')); R.disco(px + 1, 66.5, 2, hex('#e8b890'));
    R.poligono([[px - 6, 72], [px + 6, 72], [px + 7, 80], [px - 7, 80]], FP.bata); R.linea(px, 72, px, 80, FP.bataS); pset(px + 2, 66, C.k); }
  R.recorte(null);
  for (let x = 291; x < 310; x++) if ((x + 57) % 3 === 0) pset(x, 57 + ((x - 291) >> 2), f_mezclaF(R.pget(x, 57 + ((x - 291) >> 2)), C.blanco, 0.5));
}

// el vaso de zumo (x centro, y0 boca, y1 fondo, nivel del zumo jl) con su pajita transparente de rayas, un cubito que
// flota, la rodaja de naranja en el borde y burbujas; el zumo de dentro de la pajita llega a la misma altura
function f_vasoZumo(R, t, cx, y0, y1, jl) {
  const { pset, linea, disco } = R, ola = (x) => jl + Math.round(Math.sin(x * 0.7 + t * 2.4) * 0.5);
  const hw = (y) => 13 - (y - y0) / (y1 - y0) * 3;
  for (let y = y0; y <= y1; y++) { const w = hw(y);
    for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) {
      const fx = (x - (cx - w)) / (2 * w); let c;
      if (y >= y1 - 3) c = f_mezclaF(FP.vidrio, FP.zumoL, 0.25);
      else if (y >= ola(x)) { c = fx < 0.18 ? FP.zumoL : fx > 0.8 ? FP.zumoS : FP.zumo; if (h(x, y, 13) < 0.06) c = FP.pulpa; if (y === ola(x)) c = FP.zumoL; }
      else c = f_mezclaF(R.pget(x, y), FP.vidrio, 0.45);
      pset(x, y, c);
    } }
  // burbujas que suben
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1, y = Math.round(y1 - 5 - u * (y1 - 5 - jl)); pset(Math.round(cx - 8 + k * 4 + Math.sin(t * 3 + k) * 0.8), y, FP.zumoL); }
  // el cubito de hielo que flota y se mece
  { const ix = Math.round(cx - 7 + Math.sin(t * 0.8) * 2), iy = jl - 2 + Math.round(Math.sin(t * 1.7) * 0.6); R.rect(ix, iy, ix + 5, iy + 4, FP.vidrioS); R.rect(ix + 1, iy + 1, ix + 4, iy + 3, hex('#eef8fa')); pset(ix + 1, iy + 1, C.blanco); pset(ix + 4, iy + 3, FP.aireJ); }
  // la pajita: transparente con rayas rojas en espiral, y el zumo dentro hasta el nivel del vaso
  { const ax = cx + 3, ay = y1 - 4, bx = cx + 16, by = 84, n = Math.ceil(Math.hypot(bx - ax, by - ay)), nx = (ay - by) / n, ny = (bx - ax) / n;
    for (let i = 0; i <= n; i++) { const x = ax + (bx - ax) * i / n, y = ay + (by - ay) * i / n, dentro = y >= ola(Math.round(x)) && y > y0;
      for (let s = -1.5; s <= 1.5; s += 0.5) { const px = Math.round(x + nx * s), py = Math.round(y + ny * s), borde = Math.abs(s) > 1;
        const raya = ((i + Math.round(s * 1.5)) % 7) < 2; pset(px, py, borde ? (raya ? FP.pajita : FP.vidrioS) : raya ? FP.pajita : dentro ? FP.zumo : hex('#f2fafa')); } }
    pset(bx, by - 1, FP.vidrioS); }
  // el cristal: el canto, el brillo vertical, el reflejo de la boca y el fondo grueso
  for (let y = y0; y <= y1; y++) { const w = hw(y); pset(Math.round(cx - w), y, FP.vidrioS); pset(Math.round(cx + w), y, FP.vidrioS); if (y > y0 + 2 && y < y1 - 5) { pset(Math.round(cx - w) + 2, y, f_mezclaF(R.pget(Math.round(cx - w) + 2, y), C.blanco, 0.7)); if (y < y0 + 20) pset(Math.round(cx + w) - 3, y, f_mezclaF(R.pget(Math.round(cx + w) - 3, y), C.blanco, 0.4)); } }
  R.rect(Math.round(cx - 13), y0, Math.round(cx + 13), y0, FP.vidrioL); linea(cx - 9, y1 - 3, cx + 9, y1 - 3, FP.vidrioS); linea(cx - 10, y1, cx + 10, y1, FP.vidrioS);
  // la rodaja de naranja en el borde
  for (let j = 0; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d > 6.4) continue; pset(cx + 12 + i, y0 - j + 3, d > 5.4 ? hex('#e07818') : d > 4.6 ? hex('#fff0c8') : (Math.round(Math.atan2(j, i) * 3) % 2 ? FP.zumo : FP.zumoL)); }
  R.rect(cx + 11, y0 + 1, cx + 13, y0 + 4, hex('#e07818'));
}

// el trozo de yeso blanco (cristalino, con caras de luz y de sombra) y su etiqueta de cordel con un número
function f_yeso(R, x, y) {
  const { poligono, pset, linea } = R;
  poligono([[x - 5, y + 1], [x - 4, y - 4], [x, y - 7], [x + 4, y - 5], [x + 6, y + 1]], C.k);
  poligono([[x - 4, y], [x - 3, y - 4], [x, y - 6], [x + 3, y - 4], [x + 5, y]], FP.yeso);
  poligono([[x, y - 6], [x + 3, y - 4], [x + 5, y], [x + 1, y]], FP.yesoS); linea(x - 2, y - 4, x, y - 6, FP.yesoL); pset(x - 2, y - 2, FP.yesoL); pset(x + 3, y - 2, FP.anhidritaS ?? FP.yesoS);
  for (let i = 0; i < 9; i++) if (i % 2) pset(x + 7 + i, y + 1, FP.tableroS);
  linea(x + 4, y - 3, x + 9, y - 1, C.maderaL); R.rect(x + 8, y - 3, x + 13, y + 1, C.k); R.rect(x + 9, y - 2, x + 12, y, hex('#f2e8c8')); pset(x + 10, y - 1, C.rojo); pset(x + 11, y - 1, C.k);
}

// el tanque de la mesa: la isla entera en corte (mar a los dos lados, hierba, arcilla, anhidrita con grietas, el pozo que
// se llena hasta el nivel del mar), el barquito, el aireador, la raya del nivel y los reflejos del cristal
function f_tanqueMesa(R, t, o) {
  const { pset, linea } = R, [X0, Y0, X1, Y1] = f_MESA.tanque, IX0 = X0 + 3, IX1 = X1 - 3, IY0 = Y0 + 3, IY1 = Y1 - 4, SL = f_MESA.mar, PC = 207;
  const nivel = f_lim(o.nivel ?? 1), fondoP = 124, aguaP = fondoP - (fondoP - SL) * nivel;
  const sup = (x) => { const d = Math.abs(x - PC); return d < 28 ? 85 + (d / 28) ** 2 * 8 : Math.min(118, 93 + (d - 28) * 0.85); };
  const lim = (x) => 110 + Math.sin(x * 0.13) * 1.5;
  for (let x = IX0; x <= IX1; x++) { const s = sup(x), b = lim(x), ola = SL + Math.round(Math.sin(x * 0.35 + t * 3) * 0.6 + Math.sin(x * 0.11 - t * 1.3) * 0.5), enPozo = x >= 204 && x <= 210;
    for (let y = IY0; y <= IY1; y++) { let c;
      if (enPozo && y >= 84 && y <= fondoP) { // el pozo: tiro oscuro con plataformas de troncos y el agua que sube
        const ap = aguaP + Math.round(Math.sin(t * 3 + x) * 0.4);
        c = y >= ap ? (y === ap ? FP.aguaL : h(x, y, 14) < 0.1 ? FP.aguaS : C.aguaPozoL ?? FP.aguaS) : (y - 86) % 6 === 0 ? C.robleS : x === 204 || x === 210 ? FP.pozoS : FP.pozoD; }
      else if (y < s) { if (y >= ola && s > SL - 0.5) { const d = y - SL; c = d <= 0 ? FP.aguaL : d < 7 ? FP.agua : d < 16 ? FP.aguaS : FP.aguaD; if (d > 0 && d < 9 && Math.sin(x * 0.5 + y * 0.9 - t * 3) > 0.93) c = FP.aguaL; if (d >= 7 && f_umb(x, y) < 0.3 && d < 9) c = FP.agua; }
        else c = (y + x) % 11 === 0 || f_umb(x, y) > 0.9 ? FP.aireS : FP.aire; }
      else if (y < s + 2 && s < SL) c = y < s + 1 ? C.hojaL : C.hoja;
      else if (s >= SL - 0.5 && y < s + 3) c = h(x, y, 15) < 0.3 ? C.arenaS : C.arena;
      else if (y < b) { const k = Math.sin(y * 0.6 + x * 0.03 + h(x >> 3, y >> 2, 16) * 2); c = k > 0.6 ? C.arcillaL : k < -0.6 ? C.arcillaS : C.arcilla; if (h(x, y, 17) < 0.04) c = C.piedra; }
      else { c = h(x, y, 18) < 0.12 ? C.anhidritaS : FP.anhL; if ((y + Math.round(Math.sin(x * 0.07) * 2)) % 7 === 0 && h(x, y, 19) < 0.6) c = C.anhidritaS; if (y > IY1 - 4 && f_umb(x, y) < 0.5) c = C.anhidritaS; if (h(x, y, 20) > 0.985) c = C.blanco; }
      pset(x, y, c);
    } }
  // la hierba en pelos, los dos arbolitos de maqueta y la banderita roja en la boca del pozo
  for (let x = 181; x < 234; x += 2) if (x < 203 || x > 211) pset(x, Math.round(sup(x)) - 1, C.hojaL);
  for (const ax of [189, 225]) { const s = Math.round(sup(ax)); R.rect(ax, s - 5, ax, s - 1, C.robleS); R.disco(ax, s - 7, 3, C.hojaS); R.disco(ax - 0.6, s - 7.6, 2, C.hoja); pset(ax - 1, s - 9, C.hojaL); }
  { const s = Math.round(sup(212)); linea(212, s - 1, 212, s - 8, C.k); const f = Math.sin(t * 2.4) > 0 ? 0 : 1; R.rect(213, s - 8, 215, s - 7 + f, C.rojo); pset(213, s - 8, hex('#f07a7a')); }
  // las grietas de la anhidrita (del fondo del mar al pozo) y el agua que corre por ellas en gotitas
  const GR = [[[156, 118], [168, 121], [182, 120], [194, 123], [204, 122]], [[262, 118], [248, 122], [232, 121], [220, 124], [210, 122]], [[176, 120], [184, 128], [196, 130], [205, 125]], [[240, 121], [228, 129], [214, 128]]];
  for (const g of GR) for (let i = 0; i + 1 < g.length; i++) linea(g[i][0], g[i][1], g[i + 1][0], g[i + 1][1], FP.grieta);
  GR.forEach((g, k) => { for (let j = 0; j < 3; j++) { const u = (t * 0.22 + j / 3 + k * 0.17) % 1, f = u * (g.length - 1), i = Math.floor(f), e = f - i;
    pset(Math.round(g[i][0] + (g[i + 1][0] - g[i][0]) * e), Math.round(g[i][1] + (g[i + 1][1] - g[i][1]) * e), FP.aguaS); } });
  // el barquito de juguete en el mar de la izquierda
  { const bx = Math.round(166 + Math.sin(t * 0.35) * 6), by = SL + Math.round(Math.sin(t * 2.2) * 0.6);
    R.poligono([[bx - 5, by - 1], [bx + 5, by - 1], [bx + 3, by + 2], [bx - 3, by + 2]], C.rojo); R.rect(bx - 4, by - 1, bx + 4, by - 1, hex('#f07a7a'));
    linea(bx, by - 9, bx, by - 1, C.k); R.poligono([[bx + 1, by - 9], [bx + 1, by - 2], [bx + 5, by - 2]], C.blanco); }
  // el tubo del aireador y las burbujas del mar de la derecha
  linea(262, 76, 257, 127, hex('#c8dcd4')); R.rect(255, 127, 259, 128, hex('#7a8a8a'));
  for (let k = 0; k < 7; k++) { const u = (t * 0.55 + k / 7) % 1, y = Math.round(126 - u * (126 - SL - 1)), x = Math.round(256 + Math.sin(t * 4 + k * 1.3) * 1.2 - u * 2); if (u < 0.8) pset(x, y, FP.aguaL); else R.disco(x, y, 1, C.blanco); }
  // la raya de puntos del nivel del mar a todo lo ancho
  if (o.linea !== false) for (let x = IX0; x <= IX1; x++) if (((x + Math.floor(t * 4)) % 6) < 3) pset(x, SL, f_mezclaF(R.pget(x, SL), C.blanco, 0.6));
  // los reflejos del cristal y el canto de luz de la izquierda
  for (let y = IY0; y <= IY1; y++) for (let x = IX0; x <= IX1; x++) { const d = (x - IX0) - (IY1 - y) * 0.6; if (((d > 64 && d < 70) || (d > 74 && d < 77)) && f_umb(x, y) < 0.5) pset(x, y, f_mezclaF(R.pget(x, y), C.blanco, 0.35)); }
  for (let y = IY0; y <= IY1; y++) pset(IX0, y, f_mezclaF(R.pget(IX0, y), C.blanco, 0.5));
}

const f_TQ = { x0: 8, y0: 18, x1: 238, y1: 145, mar: 50, pozo: [184, 198, 130], suelo: 178 };

const f_CUEVAS = [[46, 112, 12], [88, 124, 14], [120, 103, 11], [152, 119, 16], [172, 97, 8], [214, 120, 11]];

const f_GRIETAS = [[[14, 99], [30, 103], [46, 112], [64, 118], [88, 126], [112, 124], [152, 120], [168, 126], [184, 127]],
  [[42, 92], [62, 92], [84, 94], [104, 98], [120, 102], [140, 110], [152, 120]], [[152, 120], [162, 108], [172, 98], [184, 104]],
  [[234, 110], [222, 114], [214, 118], [198, 124]], [[88, 126], [96, 136], [120, 138]]];

function f_labTanque(R, t, o) {
  const { pset, linea, disco } = R, G = f_TQ;
  R.copiar(f_capaF(R, 'tanque', () => f_tanqueFijo(R)));
  const IX0 = G.x0 + 3, IX1 = G.x1 - 3, IY0 = G.y0 + 3, IY1 = G.y1 - 4, SL = G.mar;
  const nivel = f_lim(o.nivel ?? 1), dis = f_lim(o.disuelve ?? 0), fl = o.flechas === true ? 1 : f_lim(+(o.flechas || 0));
  const fondoP = G.pozo[2], aguaP = fondoP - (fondoP - SL) * nivel;
  const sup = (x) => x < 84 ? 98 - (x - 11) * (58 / 73) + (x < 70 ? 1.6 * Math.sin(x * 0.31) + Math.sin(x * 0.13) : 0) : 40 + 1.5 * Math.sin(x * 0.07);
  const lim = (x) => 84 + 2 * Math.sin(x * 0.09) + 1.2 * Math.sin(x * 0.23);
  const radio = (k) => { const g = f_lim(dis * 1.5 - k * 0.09); return f_CUEVAS[k][2] * (0.15 + 0.85 * g) * (dis > 0 ? 1 : 0); };
  const RC = f_CUEVAS.map((c, k) => radio(k));
  for (let x = IX0; x <= IX1; x++) { const s = sup(x), b = lim(x), ola = SL + Math.round(Math.sin(x * 0.3 + t * 2.6) * 0.8 + Math.sin(x * 0.09 - t * 1.1) * 0.6), enPozo = x >= G.pozo[0] && x <= G.pozo[1];
    for (let y = IY0; y <= IY1; y++) { let c;
      if (enPozo && y >= s - 1 && y <= fondoP) {
        const ap = Math.round(aguaP + Math.sin(t * 2.5 + x * 0.6) * 0.6), lado = x <= G.pozo[0] + 1 || x >= G.pozo[1] - 1;
        if (y >= ap) c = y === ap ? FP.aguaL : lado ? FP.aguaD : h(x, y, 21) < 0.08 ? C.aguaPozoL ?? FP.agua : y < ap + 3 ? FP.agua : FP.aguaS;
        else c = (y - 46) % 9 === 0 ? (lado ? C.robleS : C.roble) : (y - 46) % 9 === 1 && !lado ? C.robleS : lado ? (x === G.pozo[0] || x === G.pozo[1] ? C.robleS : FP.pozoS) : (h(x, y, 22) < 0.06 ? FP.pozoS : FP.pozoD);
        if (y === fondoP) c = FP.pozoS; }
      else if (y < s) {
        if (x < 84 && y >= ola) { const d = y - SL; c = d <= 0 ? FP.aguaL : d < 12 ? FP.agua : d < 30 ? FP.aguaS : FP.aguaD; if (d > 2 && d < 26 && Math.sin(x * 0.42 + y * 0.8 - t * 2.4) + Math.sin(x * 0.17 - y * 0.3 + t) * 0.6 > 1.35) c = FP.aguaL;
          if ((d === 12 || d === 30) && f_umb(x, y) < 0.5) c = d === 12 ? FP.aguaS : FP.aguaD; }
        else { const tx = (x - IX0) % 14, ty = (y - IY0) % 10; c = tx === 0 || ty === 0 ? FP.aireJ : f_umb(x, y) > 0.92 ? FP.aireS : FP.aire; }
      }
      else if (x >= 71 && x < 84 && y < s + 3) c = h(x, y, 23) < 0.35 ? C.arenaS : C.arena;
      else if (x >= 84 && y < s + 2) c = y < s + 1 ? C.hojaL : C.hoja;
      else if (x < 84 && y < s + 3) c = h(x, y, 23) < 0.35 ? C.arenaS : C.arena;
      else if (y < b) { const k = Math.sin(y * 0.45 + x * 0.025 + h(x >> 3, y >> 2, 24) * 1.6); c = k > 0.55 ? C.arcillaL : k < -0.55 ? C.arcillaS : C.arcilla; if (y > b - 3) c = f_umb(x, y) < 0.5 ? C.arcillaS : FP.arcillaD; if (h(x, y, 25) < 0.025) c = FP.arcillaD; }
      else { c = h(x, y, 26) < 0.12 ? C.anhidritaS : FP.anhL; if ((y + Math.round(Math.sin(x * 0.05) * 2)) % 8 === 0 && h(x, y, 27) < 0.65) c = C.anhidritaS; if (h(x, y, 28) > 0.985) c = C.blanco;
        if (y > IY1 - 10 && f_umb(x, y) < (y - IY1 + 10) / 14) c = C.anhidritaS;
        // las cuevas que se disuelven: agua dentro, borde oscuro y, mientras crecen, espuma blanca que se come la roca
        for (let k = 0; k < 6; k++) { const r = RC[k]; if (r < 0.5) continue; const [cx, cy] = f_CUEVAS[k], dx = x - cx, dy = (y - cy) * 1.35;
          if (Math.abs(dx) > r * 1.5 || Math.abs(dy) > r * 1.5) continue;
          const a = Math.atan2(dy, dx), rr = r * (1 + 0.1 * Math.sin(3 * a + k) + 0.06 * Math.sin(5 * a + 2 * k) - (dy > 0 ? 0.12 : 0)), d = Math.hypot(dx, dy);
          if (d < rr - 1) { c = dy < -rr * 0.3 ? FP.cueva : dy > rr * 0.4 ? FP.cuevaS : FP.cueva; if (Math.sin(x * 0.8 + y * 0.6 + t * 2) > 0.92) c = FP.cuevaL; if (dy < -rr + 3 && d > rr - 3) c = FP.cuevaS; }
          else if (d < rr) c = dis < 1 && h(x + Math.floor(t * 6), y, 29) < 0.5 ? C.blanco : FP.borde;
          else if (d < rr + 1.2 && dis < 1 && h(x, y + Math.floor(t * 5), 30) < 0.35) c = FP.anhL; } }
      pset(x, y, c);
    } }
  // las grietas: con el agua que las moja (más anchas cuanto más disuelta está la roca)
  for (const g of f_GRIETAS) for (let i = 0; i + 1 < g.length; i++) { linea(g[i][0], g[i][1] - 1, g[i + 1][0], g[i + 1][1] - 1, FP.borde); linea(g[i][0], g[i][1], g[i + 1][0], g[i + 1][1], dis > 0.3 || fl > 0 ? FP.aguaS : FP.grieta); linea(g[i][0], g[i][1] + 1, g[i + 1][0], g[i + 1][1] + 1, FP.grieta); }
  for (const g of f_GRIETAS) for (let j = 0; j < 4; j++) { const u = (t * 0.2 + j / 4) % 1, f = u * (g.length - 1), i = Math.floor(f), e = f - i; pset(Math.round(g[i][0] + (g[i + 1][0] - g[i][0]) * e), Math.round(g[i][1] + (g[i + 1][1] - g[i][1]) * e), FP.agua); }
  // las gotas que caen del techo de cada cueva
  RC.forEach((r, k) => { if (r < 3) return; const [cx, cy] = f_CUEVAS[k], u = (t * 0.8 + k * 0.31) % 1, y = Math.round(cy - r / 1.35 + 1 + u * (r * 1.4 / 1.35)); pset(cx + (k % 3) - 1, y, FP.aguaL); if (u < 0.2) pset(cx + (k % 3) - 1, Math.round(cy - r / 1.35 + 1), FP.aguaL); });
  // las flechitas de agua que corren por las grietas hacia el pozo (con su estela de puntos)
  if (fl > 0) for (const [gi, n] of [[0, 3], [1, 2], [2, 1], [3, 2]]) { const g = gi === 1 ? f_GRIETAS[1].concat(f_GRIETAS[2].slice(1)) : f_GRIETAS[gi], L = [0];
    for (let i = 0; i + 1 < g.length; i++) L.push(L[i] + Math.hypot(g[i + 1][0] - g[i][0], g[i + 1][1] - g[i][1]));
    const en = (s) => { let i = 0; while (i < g.length - 2 && L[i + 1] < s) i++; const e = (s - L[i]) / (L[i + 1] - L[i]); return [g[i][0] + (g[i + 1][0] - g[i][0]) * e, g[i][1] + (g[i + 1][1] - g[i][1]) * e]; };
    for (let j = 0; j < n; j++) { const s = ((t * (14 + gi * 2) * (0.5 + fl * 0.5) + j * L[L.length - 1] / n + gi * 23) % L[L.length - 1]); if (s < 6) continue;
      const [x, y] = en(s), [xa, ya] = en(s - 4), dx = x - xa, dy = y - ya, m = Math.hypot(dx, dy) || 1, ux = dx / m, uy = dy / m;
      for (let q = 8; q <= 16; q += 4) { const [tx, ty] = en(Math.max(0, s - 4 - q)); pset(Math.round(tx), Math.round(ty), FP.aguaL); }
      const tip = [x + ux * 4, y + uy * 4], a1 = [x - ux * 3 - uy * 4, y - uy * 3 + ux * 4], a2 = [x - ux * 3 + uy * 4, y - uy * 3 - ux * 4];
      linea(x - ux * 9, y - uy * 9 + 1, x, y + 1, FP.aguaD); linea(x - ux * 9, y - uy * 9, x, y, FP.aguaL);
      R.poligono([[tip[0] + 1, tip[1] + 1], [a1[0] + 1, a1[1] + 1], [a2[0] + 1, a2[1] + 1]], FP.aguaD); R.poligono([tip, a1, a2], FP.aguaL);
      linea(a1[0], a1[1], tip[0], tip[1], C.blanco); pset(Math.round(x), Math.round(y), C.blanco); } }
  // las piedras de la arcilla, las raíces de la hierba y la lombriz que se pasea
  for (let k = 0; k < 16; k++) { const x = 90 + Math.floor(h(k, 1, 40) * 140), y = 50 + Math.floor(h(k, 2, 40) * 28); if (x > 180 && x < 202) continue; const r = 1 + Math.floor(h(k, 3, 40) * 2.2);
    disco(x, y, r + 0.4, C.piedraS); disco(x - 0.4, y - 0.4, r * 0.7, C.piedra); pset(x - 1, y - 1, hex('#c8c4cc')); }
  for (let k = 0; k < 9; k++) { const x0 = 92 + k * 15 + Math.floor(h(k, 4, 41) * 6); if (x0 > 178 && x0 < 204) continue; let x = x0, y = Math.round(sup(x0)) + 2; for (let i = 0; i < 6 + (k % 3) * 3; i++) { pset(x, y, FP.arcillaD); y++; if (h(k, i, 42) < 0.3) x += h(k, i, 43) < 0.5 ? -1 : 1; if (i === 4) pset(x + 1, y, FP.arcillaD); } }
  { const wx = 128 + Math.sin(t * 0.3) * 14, wy = 66; for (let i = 0; i < 9; i++) { const x = Math.round(wx + i), y = Math.round(wy + Math.sin(i * 0.8 - t * 4) * 1.2); pset(x, y, i === 8 ? hex('#e89a9a') : hex('#d87a8a')); if (i % 3 === 0) pset(x, y + 1, hex('#a85a6a')); } }
  // la hierba en pelos y los arbolitos de maqueta, la banderita del pozo
  for (let x = 85; x < 235; x += 2) if (x < G.pozo[0] - 1 || x > G.pozo[1] + 1) { const s = Math.round(sup(x)); pset(x, s - 1, C.hojaL); if (h(x, 1, 44) < 0.4) pset(x, s - 2, C.hoja); }
  for (const [ax, sc] of [[112, 1], [150, 1.3], [222, 1.1]]) { const s = Math.round(sup(ax)); R.rect(ax, s - Math.round(7 * sc), ax + 1, s - 1, C.robleS); disco(ax + 0.5, s - 9 * sc, 4 * sc, C.hojaS); disco(ax, s - 9.6 * sc, 3 * sc, C.hoja); disco(ax - 1, s - 10.6 * sc, 1.6 * sc, C.hojaL); }
  { const s = Math.round(sup(200)); linea(201, s - 1, 201, s - 11, C.k); const f = Math.round(Math.sin(t * 2.4)); R.rect(202, s - 11, 206, s - 8 + (f > 0 ? 1 : 0), C.rojo); pset(202, s - 11, hex('#f07a7a')); }
  // el mar: dos algas de juguete que se mecen, el barquito y las burbujas del aireador
  for (const [ax, a] of [[30, 16], [58, 12]]) { const s = Math.round(sup(ax)); for (let i = 0; i < a; i++) { const x = Math.round(ax + Math.sin(t * 1.6 + i * 0.35 + ax) * i * 0.18); pset(x, s - i, i % 4 === 0 ? C.hojaL : C.hoja); if (i % 4 === 2) pset(x + 1, s - i, C.hojaS); } }
  { const bx = Math.round(46 + Math.sin(t * 0.3) * 10), by = SL + Math.round(Math.sin(t * 2) * 0.7);
    R.poligono([[bx - 8, by - 2], [bx + 8, by - 2], [bx + 5, by + 2], [bx - 5, by + 2]], C.rojo); R.rect(bx - 7, by - 2, bx + 7, by - 2, hex('#f07a7a')); R.rect(bx - 4, by, bx + 4, by, C.blanco);
    linea(bx, by - 15, bx, by - 2, C.k); R.poligono([[bx + 1, by - 15], [bx + 1, by - 3], [bx + 8, by - 3]], C.blanco); R.poligono([[bx - 1, by - 13], [bx - 1, by - 3], [bx - 6, by - 3]], hex('#e8e0d0')); pset(bx, by - 16, C.rojo); }
  linea(14, 24, 18, 93, hex('#c8dcd4')); R.rect(16, 93, 21, 95, hex('#7a8a8a'));
  for (let k = 0; k < 8; k++) { const u = (t * 0.45 + k / 8) % 1, y = Math.round(92 - u * (92 - SL - 1)), x = Math.round(19 + Math.sin(t * 4 + k * 1.3) * 1.5 + u * 3); if (u < 0.7) pset(x, y, FP.aguaL); else disco(x, y, 1, C.blanco); }
  // el caracol que repta por dentro del cristal, en el aire
  { const sx = Math.round(130 + ((t * 1.2) % 60)), sy = 31; R.disco(sx, sy, 3, hex('#a8743c')); R.anillo(sx, sy, 1.6, hex('#6a4a24')); R.rect(sx - 5, sy + 2, sx + 1, sy + 3, hex('#c8b8a0')); pset(sx - 5, sy, hex('#c8b8a0')); pset(sx - 5, sy + 1, hex('#c8b8a0')); pset(sx - 6, sy - 1, C.k); }
  // la raya de puntos del nivel del mar a todo lo ancho
  if (o.linea !== false) for (let x = IX0; x <= IX1; x++) if (((x + Math.floor(t * 4)) % 6) < 3) pset(x, SL, f_mezclaF(R.pget(x, SL), C.blanco, 0.6));
  f_regla(R, 228, 22, 140);
  // los reflejos del cristal: dos bandas en diagonal y el canto izquierdo
  for (let y = IY0; y <= IY1; y++) for (let x = IX0; x <= IX1; x++) { const d = (x - IX0) - (IY1 - y) * 0.55; if (((d > 150 && d < 160) || (d > 166 && d < 170) || (d > 12 && d < 16)) && f_umb(x, y) < 0.45) pset(x, y, f_mezclaF(R.pget(x, y), C.blanco, 0.3)); }
  for (let y = IY0; y <= IY1; y++) pset(IX0, y, f_mezclaF(R.pget(IX0, y), C.blanco, 0.55));
  // la esponja en su plato, el cuentagotas que gotea y el rollo de papel que se mece
  f_esponja(R, t, f_lim(o.esponja ?? 0));
  { const sw = Math.sin(t * 1.4) * 1.2; for (let y = 74; y < 90; y++) { const dx = Math.round(sw * (y - 74) / 16); R.rect(292 + dx, y, 306 + dx, y, y % 5 === 0 ? FP.bataS : C.blanco); pset(292 + dx, y, FP.bataS); } }
  return { suelo: G.suelo, tanque: { x0: G.x0, y0: G.y0, x1: G.x1, y1: G.y1, mar: SL }, pozo: { x0: G.pozo[0], x1: G.pozo[1], boca: 40, fondo: fondoP, agua: Math.round(aguaP) },
    cuevas: f_CUEVAS.map(([x, y], k) => ({ x, y, r: Math.round(RC[k]) })), esponja: { x: 268, y: 138 }, plato: { x: 268, y: 146 }, gotero: { x: 268, y: 119 }, mesa: 143, libre: [[284, 316]] };
}

// el fondo fijo de 'tanque': la pared de azulejos, el cartel de los estratos, el dispensador de papel, la mesa, el plato,
// el soporte del cuentagotas, el yeso y el marco del tanque
function f_tanqueFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, G = f_TQ;
  for (let y = 0; y < 143; y++) for (let x = 0; x < 320; x++) {
    const tx = x % 12, ty = y % 9, k = h(Math.floor(x / 12), Math.floor(y / 9), 50), luz = y < 60 ? 0.2 : 0;
    let c = tx === 0 || ty === 0 ? FP.azulJ : ty === 1 && tx < 6 ? FP.azulL : k < 0.15 && tx > 8 ? FP.azulS : FP.azul;
    if (x > 276 && y < 46 && c === FP.azulJ) c = FP.azulS; if (c === FP.azul && f_umb(x, y) < luz) c = FP.azulL;
    pset(x, y, c);
  }
  // el cartel de los estratos (sin letras: la ola, la hierba, la arcilla y la roca blanca con su gota), con sus chinchetas
  rect(246, 50, 278, 98, C.k); rect(247, 51, 277, 97, C.blanco); rect(247, 97, 277, 97, FP.platoS);
  for (let x = 249; x < 276; x++) { pset(x, 55 + Math.round(Math.sin(x * 0.8)), FP.agua); pset(x, 56 + Math.round(Math.sin(x * 0.8)), FP.aguaS); }
  rect(249, 60, 275, 62, C.hoja); rect(249, 63, 275, 74, C.arcilla); for (let x = 250; x < 275; x += 3) pset(x, 66 + (x % 2) * 4, C.arcillaS);
  rect(249, 75, 275, 92, FP.anhL); for (let x = 250; x < 275; x += 2) pset(x, 80 + (x % 3) * 4, C.anhidritaS); disco(262, 85, 4, FP.cueva); disco(261, 84, 1.5, FP.cuevaL);
  for (let y = 60; y < 93; y += 4) rect(276, y, 277, y, C.k); disco(248, 52, 1.5, C.rojo); disco(276, 52, 1.5, C.rojo);
  poligono([[270, 97], [277, 90], [277, 97]], FP.platoS);
  // el dispensador de papel de pared
  rect(288, 56, 310, 75, C.k); rect(289, 57, 309, 74, C.blanco); rect(289, 57, 309, 58, FP.platoS); rect(298, 64, 300, 66, FP.platoS); rect(289, 73, 309, 74, FP.platoS);
  // el enchufe doble
  rect(298, 110, 310, 120, C.k); rect(299, 111, 309, 119, C.blanco); disco(302, 115, 1.5, FP.platoS); disco(306, 115, 1.5, FP.platoS);
  // la mesa: el tablero negro con reflejos, el canto y los armarios
  for (let y = 143; y < 150; y++) for (let x = 0; x < 320; x++) { const r = (x - y * 1.6) % 53; pset(x, y, y === 143 ? FP.tableroB : r > 0 && r < 3 && f_umb(x, y) < 0.5 ? FP.tableroL : h(x, y, 51) < 0.04 ? FP.tableroL : FP.tablero); }
  rect(0, 149, 319, 152, FP.tableroS); rect(0, 149, 319, 149, FP.tableroL);
  rect(0, 153, 319, 172, FP.mueble);
  for (let k = 0; k < 11; k++) { const x0 = 2 + k * 30, x1 = x0 + 27;
    rect(x0, 153, x1, 156, FP.muebleL); rect(x0 + 1, 154, x1 - 1, 155, FP.mueble); rect(x0 + 11, 154, x0 + 16, 154, C.metalD);
    rect(x0, 158, x1, 171, FP.mueble); rect(x0, 158, x1, 158, FP.muebleL); rect(x0, 158, x0, 171, FP.muebleL); rect(x1, 158, x1, 171, FP.muebleS); rect(x1 - 4, 162, x1 - 3, 166, C.metalD); }
  rect(0, 172, 319, 175, FP.muebleD); rect(0, 172, 319, 172, C.k);
  for (let y = 176; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 52) < 0.06 ? FP.sueloS : (Math.floor(x / 16) + (y > 177 ? 1 : 0)) % 2 ? FP.suelo1 : FP.suelo2);
  // la sombra del tanque sobre los azulejos y el tablero
  for (let y = 22; y < 149; y++) for (let x = 239; x < 246; x++) if (f_umb(x, y) < 0.55 - (x - 239) * 0.07) pset(x, y, y < 143 ? FP.azulS : FP.tableroS);
  // el plato blanco con su borde y su sombra
  for (let y = 141; y < 151; y++) for (let x = 244; x < 294; x++) { const e = ((x - 268) / 23) ** 2 + ((y - 146) / 4.5) ** 2; if (e < 1) pset(x, y, e > 0.72 ? (y < 146 ? FP.platoS : C.blanco) : e > 0.55 ? FP.platoS : FP.plato); else if (e < 1.25 && y > 146 && f_umb(x, y) < 0.5) pset(x, y, FP.tableroS); }
  // el soporte del cuentagotas: la base, la varilla, la nuez y el brazo
  rect(294, 145, 314, 148, C.k); rect(295, 145, 313, 147, C.metalD); rect(295, 145, 313, 145, C.metal);
  rect(305, 96, 306, 145, C.metalS); rect(305, 96, 305, 145, C.metalL);
  rect(302, 99, 309, 103, C.k); rect(303, 100, 308, 102, C.metal); disco(310, 101, 1.5, C.metalD);
  rect(271, 100, 302, 101, C.metalS); rect(271, 100, 302, 100, C.metalL); rect(265, 98, 272, 104, C.k); rect(266, 99, 271, 103, C.metal);
  // el cuentagotas: la pera roja y el tubo de cristal con su agua
  rect(266, 89, 270, 97, C.k); rect(267, 90, 269, 96, FP.pera); pset(267, 91, hex('#e87a7a')); disco(268, 89, 2, FP.pera);
  rect(267, 104, 269, 117, FP.vidrioS); rect(268, 104, 268, 116, hex('#e6f4f8')); rect(268, 109, 268, 116, FP.agua); pset(268, 118, FP.vidrioS);
  // el trozo de yeso en la mesa
  f_yeso(R, 286, 145);
  // el marco del tanque (perfiles de aluminio, tornillos) y la regla de los niveles por dentro del cristal
  rect(G.x0, G.y0, G.x1, G.y1, C.k); rect(G.x0 + 1, G.y0 + 1, G.x1 - 1, G.y0 + 2, C.metalL); rect(G.x0 + 1, G.y1 - 4, G.x1 - 1, G.y1 - 1, C.metal); rect(G.x0 + 1, G.y1 - 1, G.x1 - 1, G.y1 - 1, C.metalS);
  rect(G.x0 + 1, G.y0 + 1, G.x0 + 2, G.y1 - 1, C.metalL); rect(G.x1 - 2, G.y0 + 1, G.x1 - 1, G.y1 - 1, C.metal); rect(G.x1 - 1, G.y0 + 1, G.x1 - 1, G.y1 - 1, C.metalS);
  for (const [x, y] of [[G.x0 + 1, G.y0 + 1], [G.x1 - 2, G.y0 + 1], [G.x0 + 1, G.y1 - 4], [G.x1 - 2, G.y1 - 4], [123, G.y1 - 3]]) pset(x, y, C.blanco);
  rect(G.x0 + 3, G.y1 + 1, G.x0 + 10, G.y1 + 2, C.k); rect(G.x1 - 10, G.y1 + 1, G.x1 - 3, G.y1 + 2, C.k);
}

// la regla amarilla de los niveles (va por delante del corte: se pinta con el tanque)
function f_regla(R, x, y0, y1) {
  R.rect(x, y0, x + 5, y1, C.k); R.rect(x + 1, y0 + 1, x + 4, y1 - 1, hex('#e8c840'));
  for (let y = y0 + 3; y < y1; y += 4) R.rect(x + 1, y, x + ((y - y0 - 3) % 20 === 0 ? 4 : 2), y, C.k);
}

// la esponja amarilla en su plato (e 0–1: el agua sube de abajo arriba, se oscurece, se hincha y deja charco y gotas);
// el cuentagotas suelta una gota cada poco
function f_esponja(R, t, e) {
  const { pset, rect, disco } = R, hin = e > 0.5 ? 1 : 0, x0 = 252 - hin, x1 = 284 + hin, y0 = 127 - hin, y1 = 144, frente = Math.round(y1 - e * (y1 - y0 + 1));
  // el charco que crece en el plato
  if (e > 0.05) for (let y = 143; y < 150; y++) for (let x = 246; x < 292; x++) { const q = ((x - 268) / (8 + e * 14)) ** 2 + ((y - 146.5) / (1.5 + e * 2)) ** 2; if (q < 1) pset(x, y, q < 0.4 && Math.sin(x * 0.6 + t * 2) > 0.7 ? FP.aguaL : f_mezclaF(R.pget(x, y), FP.agua, 0.45)); }
  rect(x0, y0, x1, y1, C.k);
  for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const moj = y >= frente, top = y <= y0 + 2, der = x >= x1 - 2;
    let c = moj ? (top ? FP.esponjaW : der ? FP.esponjaWS : FP.esponjaW) : top ? FP.esponjaL : der ? FP.esponjaS : FP.esponja;
    if (h(x, y, 60) < 0.16) c = moj ? FP.esponjaWS : FP.esponjaS; if (moj && y === frente && f_umb(x, y) < 0.6) c = FP.esponjaS;
    if (moj && h(x, y + Math.floor(t * 2), 61) > 0.94) c = FP.aguaL; pset(x, y, c); }
  // los poros grandes de la cara de delante
  for (let k = 0; k < 9; k++) { const x = x0 + 3 + Math.floor(h(k, 1, 62) * (x1 - x0 - 6)), y = y0 + 4 + Math.floor(h(k, 2, 62) * (y1 - y0 - 6)); pset(x, y, y >= frente ? FP.esponjaWS : FP.esponjaS); pset(x + 1, y, y >= frente ? FP.esponjaWS : FP.esponjaS); }
  // la gota que cae del cuentagotas y salpica
  { const u = (t % 1.4) / 1.4; if (u < 0.6) { const y = Math.round(119 + (u / 0.6) ** 2 * (y0 - 119)); pset(268, y, FP.agua); pset(268, y - 1, FP.aguaL); if (u > 0.3) pset(268, y - 2, FP.aguaL); }
    else if (u < 0.75) { pset(266, y0 - 1, FP.aguaL); pset(270, y0 - 1, FP.aguaL); pset(265, y0 - 2, FP.aguaL); pset(271, y0 - 2, FP.aguaL); } else pset(268, 119, FP.aguaL); }
  // las gotas que resbalan por los lados cuando está empapada
  if (e > 0.7) for (const x of [x0 - 1, x1 + 1]) { const u = (t * 0.7 + (x > 268 ? 0.5 : 0)) % 1; pset(x, Math.round(y0 + 6 + u * (y1 - y0 - 4)), FP.aguaL); }
}

const f_CAMPO = { suelo: 150, hoyo: [150, 146] };

let f_mascaraCampo = null;

function f_campo1878(R, t, o) {
  const { pset, linea, disco } = R;
  const capa = f_capaF(R, 'campo1878', () => f_campoFijo(R));
  R.copiar(capa);
  const B = R.buf, M = f_mascaraCampo;
  const enCielo = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && M[y * 320 + x] === 1) B[y * 320 + x] = c; };
  // las nubes de tres tonos a tres velocidades (las de abajo, lejanas y lentas; las de arriba, cerca y deprisa)
  const NC = [FP.nS, FP.nM, FP.nL];
  [[30, 18, 0.5, 0], [44, 30, 0.9, 1], [50, 22, 1.4, 2], [36, 14, 1.8, 3], [46, 9, 2.6, 4]].forEach(([y, w, v, k]) => {
    const x = ((h(k, 1, 70) * 380 + t * v) % 380) - 30; f_nubeF(enCielo, x, y, w, NC); });
  // gaviotas que planean (y alguna golondrina deprisa)
  for (let k = 0; k < 4; k++) { const u = ((t * (6 + k * 2.5) + h(k, 2, 71) * 400) % 400) - 40, gy = 24 + k * 7 + Math.sin(t * 0.9 + k) * 3; f_gaviotaF(enCielo, u, gy, t, k); }
  // el mar: el brillo que corre y la espuma; la goleta que navega despacio
  for (let y = 56; y < 78; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x; if (M[i] !== 2) continue; const d = y - 56, u = x + t * (1.5 + d * 0.4);
    let c = d < 3 ? FP.m2 : d < 9 ? FP.m1 : FP.m0; if (h(Math.floor(u / 6), y, 72) > 0.84) c = d < 4 ? FP.mL : FP.m2; if (Math.abs(x - 236) < 16 - d && Math.sin(x * 1.3 + t * 3 + y * 2) > 0.6) c = FP.mL; B[i] = c; }
  { const gx = ((t * 3 + 40) % 260) - 30, gy = 64, en = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && M[y * 320 + x]) B[y * 320 + x] = c; };
    for (let i = -9; i <= 9; i++) { en(gx + i, gy, FP.tejadoS); if (Math.abs(i) < 8) en(gx + i, gy + 1, FP.tejadoS); } en(gx - 9, gy - 1, FP.tejadoS);
    for (const [mx, a] of [[-4, 13], [4, 11]]) { for (let j = 1; j < a; j++) en(gx + mx, gy - j, C.k); for (let j = 2; j < a - 1; j++) for (let i = 1; i < 2 + (j * 5) / a; i++) en(gx + mx + i, gy - j, j % 3 ? FP.nL : FP.nM); }
    for (let i = 1; i < 6; i++) en(gx + 9 + i * 0.6, gy - 1 - i * 0.8, C.k); }
  // el humo de la chimenea, que el viento tumba hacia la derecha
  for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1, x = 231 + u * 22 + Math.sin(t + k) * 1.5, y = 46 - u * 16, r = 1 + u * 2.5; disco(x, y, r, u > 0.6 ? FP.nM : FP.nS); if (r > 2) pset(Math.round(x - 1), Math.round(y - 1), FP.nL); }
  // la veleta del granero (el gallo gira con el viento)
  { const a = Math.sin(t * 0.7) * 0.6, x = 288, y = 50, ex = Math.cos(a) * 5; linea(x, y + 4, x, y - 2, C.k); linea(x - ex, y - 2, x + ex, y - 2, C.k); disco(x + ex * 0.6, y - 4, 1.4, C.k); pset(Math.round(x + ex), y - 3, C.k); }
  // la ropa tendida que ondea
  for (const [x0, w, c, k] of [[164, 6, C.blanco, 0], [172, 5, hex('#4a6aa8'), 1], [179, 4, C.rojo, 2]]) for (let i = 0; i < w; i++) { const sw = Math.round(Math.sin(t * 4 + i * 0.7 + k) * 1.2 * (i / w)), y0 = 80 + Math.round(Math.abs(x0 + i - 174) * 0.06);
    for (let j = 0; j < 8 - k; j++) pset(x0 + i + Math.round(sw * j / 6), y0 + j, j === 0 ? C.k : (i + j) % 5 === 0 ? f_mezclaF(c, C.k, 0.2) : c); }
  // las gallinas que picotean junto a la casa
  for (let k = 0; k < 3; k++) { const x = Math.round(204 + k * 11 + Math.sin(t * 0.4 + k * 2) * 4), y = 99 + (k % 2), pica = Math.sin(t * 3 + k * 1.7) > 0.4;
    R.rect(x, y - 3, x + 3, y - 1, k === 1 ? hex('#a8643a') : C.blanco); pset(x + (pica ? 4 : 3), y - (pica ? 1 : 4), k === 1 ? hex('#a8643a') : C.blanco); pset(x + (pica ? 5 : 4), y - (pica ? 0 : 4), C.amarillo); pset(x + (pica ? 4 : 3), y - (pica ? 2 : 5), C.rojo); pset(x + 1, y, C.amarillo); pset(x + 2, y, C.amarillo); }
  // la hierba del rastrojo y del primer término al viento, con los altramuces
  const racha = Math.sin(t * 1.3) * 0.8 + Math.sin(t * 3.1) * 0.3;
  for (let k = 0; k < 60; k++) { const y = 104 + Math.floor(h(k, 1, 73) * 66), xb = 240 + (y - 96) * 0.55, x = Math.round(xb + 4 + h(k, 2, 73) * (320 - xb)), a = 2 + Math.floor((y - 96) / 22);
    for (let j = 0; j < a; j++) pset(x + Math.round(racha * j / a * 1.5), y - j, j === a - 1 ? FP.pradoL : FP.prado); }
  for (const [x0, x1] of [[0, 40], [262, 320]]) for (let x = x0; x < x1; x += 2) { const a = 4 + Math.floor(h(x, 3, 74) * 6), dx = racha * (0.6 + h(x, 4, 74));
    for (let j = 0; j < a; j++) pset(Math.round(x + dx * j / a * 2), 179 - j, j > a - 2 ? FP.pradoL : j < 2 ? FP.pradoS : FP.prado);
    if (h(x, 5, 74) < 0.18) for (let j = 0; j < 5; j++) pset(Math.round(x + dx * 2), 179 - a - j, j % 2 ? FP.altramuz : FP.altramuzR); }
  // el agujero que se abre en el campo
  const ho = f_hoyo(R, t, f_lim(o.hundido ?? 0));
  // dos gaviotas que siguen el arado y picotean en los surcos
  for (let k = 0; k < 2; k++) { const x = Math.round(92 + k * 22 + Math.sin(t * 0.5 + k * 3) * 6), y = 126 + k * 10, pica = Math.sin(t * 2.6 + k * 2) > 0.3;
    R.rect(x - 2, y - 3, x + 2, y - 1, C.blanco); R.rect(x - 2, y - 2, x + 1, y - 2, FP.nS); pset(x + 3, y - (pica ? 1 : 4), C.blanco); pset(x + 4, y - (pica ? 0 : 4), C.amarillo); pset(x - 3, y - 3, FP.tejadoS); pset(x, y, C.amarillo); }
  return { suelo: f_CAMPO.suelo, hoyo: ho, casa: { x0: 182, x1: 252, puerta: [215, 96] }, granero: { x0: 256, x1: 318 }, cerca: 96, horizonte: 56, sol: [244, 26], libre: [[40, 250]] };
}

// el agujero del campo (s 0–1): grietas, después el hundimiento con los terrones que caen, el polvo, la tierra en capas
// por dentro y el agua al fondo; devuelve su centro y sus radios
function f_hoyo(R, t, s) {
  const { pset, linea, disco } = R, [hx, hy] = f_CAMPO.hoyo, g = f_lim((s - 0.18) / 0.82), rx = g > 0 ? 5 + 25 * g : 0, ry = rx * 0.36;
  // las grietas que se abren en estrella
  if (s > 0) { const lg = f_lim(s / 0.25); for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + h(k, 1, 80) * 0.5, L = (rx + 8 + h(k, 2, 80) * 14) * lg; let x = hx, y = hy;
      for (let i = 0; i < L; i += 2) { const nx = hx + Math.cos(a) * i + (h(k, i, 81) - 0.5) * 2, ny = hy + Math.sin(a) * i * 0.4 + (h(k, i, 82) - 0.5); linea(x, y, nx, ny, FP.tierraD); x = nx; y = ny; } } }
  if (g > 0) {
    // el hueco: la pared de enfrente con sus capas (tierra negra, arcilla), la sombra y el fondo; el agua brilla abajo
    for (let y = Math.floor(hy - ry - 1); y <= Math.ceil(hy + ry + 1); y++) for (let x = Math.floor(hx - rx - 1); x <= Math.ceil(hx + rx + 1); x++) {
      const e = ((x - hx) / rx) ** 2 + ((y - hy) / ry) ** 2; if (e > 1) continue;
      const prof = (y - (hy - ry * Math.sqrt(Math.max(0, 1 - ((x - hx) / rx) ** 2)))) / (2 * ry);
      let c = prof < 0.14 ? FP.tierraS : prof < 0.32 ? (h(x, y, 83) < 0.3 ? C.arcillaS : C.arcilla) : prof < 0.5 ? C.arcillaS : FP.tierraD;
      if (prof >= 0.5 && h(x, y, 84) < 0.08) c = C.k; if (g > 0.6 && prof > 0.62 && prof < 0.8 && Math.abs(x - hx) < rx * 0.5 && Math.sin(x * 0.9 + t * 3) > 0.2) c = prof < 0.7 ? FP.aguaS : FP.aguaD;
      if (g > 0.6 && Math.abs(prof - 0.7) < 0.05 && Math.abs(x - hx) < rx * 0.4 && Math.sin(x * 1.7 + t * 5) > 0.85) c = FP.aguaL;
      pset(x, y, c); }
    // el borde roto: terrones y hierba arrancada alrededor
    for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2, x = hx + Math.cos(a) * (rx + 1), y = hy + Math.sin(a) * (ry + 1); disco(x, y, 1.6 + h(k, 3, 85), FP.terron); pset(Math.round(x - 1), Math.round(y - 1), FP.tierraL); if (Math.sin(a) > 0.3) pset(Math.round(x), Math.round(y + 2), FP.tierraD); }
    // los terrones que caen dentro
    for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k / 4) % 1; if (g >= 1 && k > 1) continue; const a = h(k, 4, 86) * Math.PI, x = hx + Math.cos(a) * rx * 0.8, y0 = hy - Math.sin(a) * ry; pset(Math.round(x), Math.round(y0 + u * ry * 1.6), FP.terron); }
    // el polvo mientras se hunde
    const p = Math.sin(Math.PI * g) * (g < 1 ? 1 : 0); if (p > 0.05) for (let k = 0; k < 10; k++) { const u = (t * 0.6 + k / 10) % 1, a = k / 10 * Math.PI * 2, x = hx + Math.cos(a) * (rx + u * 10), y = hy + Math.sin(a) * ry - u * 12 * p, r = (1 + u * 2.5) * p;
      if (r > 0.6) disco(x, y, r, u > 0.5 ? FP.casaS : FP.polvo); }
  }
  return { x: hx, y: hy, rx: Math.round(rx), ry: Math.round(ry) };
}

// el fondo fijo del campo: cielo tramado con el sol, la costa, el mar, el bosque, la granja, el granero, la cerca, el
// campo arado y el rastrojo; deja una máscara de cielo (1) y mar (2) para lo que se mueve
function f_campoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el cielo en degradado tramado y el sol con su halo
  const SC = [FP.c0, FP.c1, FP.c2, FP.c3, FP.c4];
  for (let y = 0; y < 56; y++) for (let x = 0; x < 320; x++) { const f = y / 56 * 4.3 + f_umb(x, y) - 0.5, d = Math.hypot(x - 244, (y - 26) * 1.1); let c = SC[Math.max(0, Math.min(4, Math.floor(f)))];
    if (d < 20 && f_umb(x, y) < (20 - d) / 20 * 0.9) c = FP.c3; if (d < 12 && f_umb(x, y) < (12 - d) / 12) c = FP.c4; pset(x, y, c); }
  disco(244, 26, 6, FP.solH); disco(244, 26, 5, FP.sol); disco(243, 25, 2.5, C.blanco);
  // la costa de tierra firme al fondo, con un pueblecito y su campanario blancos
  for (let x = 0; x < 320; x++) { const top = 50 + Math.round(2 * Math.sin(x * 0.04) + 1.5 * Math.sin(x * 0.13 + 1)); for (let y = top; y < 56; y++) pset(x, y, y === top ? FP.costaL : h(x, y, 90) < 0.2 ? FP.costaS : FP.costa); }
  for (let k = 0; k < 6; k++) { const x = 60 + k * 5 + Math.floor(h(k, 1, 91) * 3); rect(x, 51, x + 2, 53, FP.casaL); pset(x, 50, FP.costaS); } rect(92, 46, 93, 53, FP.casaL); pset(92, 45, FP.casaL);
  // el mar (la base: el brillo lo pinta cada fotograma)
  for (let y = 56; y < 80; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 59 ? FP.m2 : y < 65 ? FP.m1 : FP.m0);
  // el prado de detrás de la cerca
  for (let y = 78; y < 98; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 92) < 0.2 ? FP.pradoS : h(x, y, 93) > 0.9 ? FP.pradoL : FP.prado);
  // el bosque de robles y abetos de la isla, a la izquierda: tres filas de copas con luz y sombra, troncos y sotobosque
  for (let k = 0; k < 7; k++) { const x = 6 + k * 24 + h(k, 1, 94) * 8, y = 92, a = 22 + h(k, 2, 94) * 10; poligono([[x, y - a], [x - 7, y], [x + 7, y]], FP.abeto); linea(x, y - a, x + 6, y - 1, FP.abetoL); }
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 12; k++) { const x = k * 15 + fila * 6 + h(k, fila, 95) * 6, r = 8 + h(k, fila, 96) * 4 - fila, y = 78 + fila * 6 - h(k, fila, 97) * 6;
    if (x > 168 - fila * 8) continue; const cs = fila === 0 ? [FP.b2, FP.b1, FP.b0] : fila === 1 ? [FP.b1, FP.b0, FP.b3] : [FP.b1, FP.b0, FP.b3];
    disco(x + 1, y + 1, r, cs[0]); disco(x, y, r - 1, cs[1]); disco(x - r * 0.3, y - r * 0.35, r * 0.55, cs[2]);
    for (let q = 0; q < 8; q++) pset(Math.round(x + (h(k, q, 98) - 0.5) * r * 1.6), Math.round(y + (h(q, k, 99) - 0.5) * r * 1.4), q % 2 ? cs[0] : cs[2]); }
  for (let x = 0; x < 168; x++) for (let y = 88; y < 97; y++) if (f_umb(x, y) < (y - 86) / 10) pset(x, y, h(x, y, 100) < 0.5 ? FP.b2 : FP.b1);
  for (let k = 0; k < 10; k++) { const x = 8 + k * 16 + Math.floor(h(k, 5, 94) * 6); rect(x, 88, x + 1, 96, hex('#3a2a1e')); }
  // el manzano junto a la casa, con sus manzanas
  rect(172, 82, 174, 97, C.robleS); disco(174, 74, 11, FP.b1); disco(173, 72, 10, FP.b0); disco(170, 68, 5, FP.b3); for (let k = 0; k < 7; k++) pset(166 + Math.floor(h(k, 1, 101) * 16), 66 + Math.floor(h(k, 2, 101) * 14), C.rojo);
  // la casa de la granja: tablas de chilla, ventanas con cortinas, la puerta verde, el porche, el tejado de tejuelas y
  // la chimenea de ladrillo
  rect(186, 66, 246, 98, FP.casa); for (let y = 68; y < 98; y += 3) rect(186, y, 246, y, FP.casaS); rect(186, 66, 188, 98, FP.casaL); rect(244, 66, 246, 98, FP.casaS);
  poligono([[180, 67], [216, 47], [252, 67]], C.k); poligono([[183, 66], [216, 49], [249, 66]], FP.tejado);
  for (let y = 52; y < 66; y += 3) for (let x = 183; x < 250; x++) if (Math.abs(x - 216) < (y - 49) * 1.95) pset(x, y, (x + (y % 2) * 2) % 5 === 0 ? FP.tejadoS : FP.tejadoL);
  linea(216, 49, 250, 66, FP.tejadoS); poligono([[205, 66], [216, 58], [227, 66]], FP.casa); rect(213, 60, 219, 64, C.k); rect(214, 61, 218, 63, hex('#3a4a5a')); pset(216, 62, FP.casaL);
  rect(228, 44, 234, 58, C.k); rect(229, 45, 233, 58, FP.ladr); for (let y = 47; y < 58; y += 3) rect(229, y, 233, y, hex('#7a3a2a')); rect(227, 44, 235, 45, hex('#5a5a5a'));
  for (const [x, y] of [[194, 70], [234, 70], [192, 82], [234, 82]]) { rect(x - 1, y - 1, x + 9, y + 10, C.blanco); rect(x, y, x + 8, y + 9, hex('#2a3448')); rect(x + 4, y, x + 4, y + 9, C.blanco); rect(x, y + 4, x + 8, y + 4, C.blanco); pset(x + 1, y + 1, hex('#8ac0e0')); pset(x + 5, y + 1, hex('#8ac0e0'));
    rect(x, y, x + 1, y + 9, C.rojo); rect(x + 7, y, x + 8, y + 9, C.rojo); rect(x - 2, y + 10, x + 10, y + 10, FP.casaS); }
  rect(211, 80, 221, 98, C.k); rect(212, 81, 220, 98, hex('#3a6a4a')); rect(213, 82, 219, 88, hex('#2e5a3e')); rect(213, 90, 219, 96, hex('#2e5a3e')); pset(219, 90, C.oro);
  rect(207, 77, 225, 79, FP.tejadoS); rect(208, 79, 209, 98, C.blanco); rect(223, 79, 224, 98, C.blanco); rect(208, 97, 224, 99, FP.valla);
  // el cobertizo pegado a la casa
  rect(246, 76, 256, 98, FP.casaS); for (let y = 78; y < 98; y += 3) rect(246, y, 256, y, hex('#a89c7c')); poligono([[246, 74], [258, 78], [246, 78]], FP.tejadoS);
  // el granero rojo: tablas verticales, tejado a la holandesa, las puertas con su cruz blanca y el pajar
  poligono([[255, 72], [262, 61], [288, 54], [314, 61], [321, 72]], C.k); poligono([[257, 71], [263, 62], [288, 56], [313, 62], [320, 71]], FP.tejado);
  for (let y = 59; y < 71; y += 3) for (let x = 257; x < 320; x++) if ((x + y) % 6 === 0) pset(x, y, FP.tejadoL);
  rect(258, 71, 319, 98, FP.granero); for (let x = 260; x < 320; x += 4) rect(x, 72, x, 98, FP.graneroS); rect(258, 71, 319, 72, FP.graneroL);
  rect(274, 76, 302, 98, C.blanco); rect(276, 78, 300, 98, FP.graneroS); linea(276, 78, 288, 98, C.blanco); linea(288, 78, 276, 98, C.blanco); linea(288, 78, 300, 98, C.blanco); linea(300, 78, 288, 98, C.blanco); rect(288, 78, 288, 98, C.blanco);
  rect(283, 62, 293, 70, C.blanco); rect(284, 63, 292, 70, hex('#3a2a1e')); for (let x = 285; x < 292; x += 2) pset(x, 69, FP.paja ?? hex('#d8b45a')); rect(284, 70, 292, 70, hex('#d8b45a'));
  rect(304, 88, 318, 98, hex('#d8b45a')); for (let x = 304; x < 318; x += 2) pset(x, 88 + (x % 4 ? 0 : 1), hex('#ecd08a')); poligono([[303, 89], [311, 82], [319, 89]], hex('#d8b45a'));
  // los postes del tendedero (la ropa la pinta cada fotograma)
  rect(162, 78, 163, 98, FP.vallaS); rect(186, 78, 187, 98, FP.vallaS); linea(163, 79, 186, 79, hex('#8a8a7a'));
  // la cerca de troncos en zigzag
  for (let k = 0; k < 24; k++) { const x0 = k * 14 - 4, y0 = 94 + (k % 2) * 4, x1 = x0 + 14, y1 = 94 + ((k + 1) % 2) * 4;
    for (let r = 0; r < 3; r++) { linea(x0, y0 - r * 3, x1, y1 - r * 3, FP.vallaS); linea(x0, y0 - r * 3 - 1, x1, y1 - r * 3 - 1, r === 2 ? FP.vallaL : FP.valla); } rect(x0, y0 - 9, x0 + 1, y0 + 1, FP.vallaS); }
  // el campo arado: surcos que convergen al fondo, con su caballón de luz y su sombra, terrones y piedras; a la derecha,
  // el rastrojo sin arar
  for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) {
    const borde = 240 + (y - 96) * 0.55; let c;
    if (x > borde) { c = h(x, y, 102) < 0.3 ? FP.rastrojoS : h(x, y, 103) < 0.25 ? FP.pradoS : FP.rastrojo; if (x < borde + 3) c = FP.tierraL; }
    else { const u = (x - 150) / (y - 20) * 26, fu = u - Math.floor(u), n = h(x, y, 104);
      c = fu < 0.3 ? FP.tierraL : fu < 0.55 ? FP.tierra : fu < 0.8 ? FP.tierraS : FP.tierra;
      if (n < 0.06) c = FP.terron; else if (n > 0.95) c = FP.tierraD; if (y < 108 && f_umb(x, y) < (108 - y) / 14) c = f_mezclaF(c, FP.prado, 0.35); }
    pset(x, y, c); }
  for (let k = 0; k < 22; k++) { const y = 102 + Math.floor(h(k, 1, 105) * 76), x = Math.floor(h(k, 2, 105) * (230 + (y - 96) * 0.5)), r = 0.8 + (y - 96) / 40 + h(k, 3, 105);
    if (Math.abs(x - 150) < 36 && Math.abs(y - 146) < 14) continue; disco(x + 0.5, y + 0.6, r, FP.tierraD); disco(x, y, r, C.piedra); pset(Math.round(x - r * 0.4), Math.round(y - r * 0.4), hex('#c8c4cc')); }
  // el montón de piedras de la esquina, delante
  for (const [x, y, r] of [[6, 172, 6], [16, 170, 5], [10, 164, 4], [24, 175, 4], [2, 165, 3]]) { disco(x + 1, y + 1, r, C.piedraS); disco(x, y, r, C.piedra); disco(x - r * 0.3, y - r * 0.35, r * 0.45, hex('#b8b4c0')); }
  // la máscara: el cielo y el mar se reconocen por sus tonos propios
  const B = R.buf, CI = new Set([...SC]), MAR = new Set([FP.m0, FP.m1, FP.m2]); f_mascaraCampo = new Uint8Array(320 * 180);
  for (let i = 0; i < 320 * 180; i++) f_mascaraCampo[i] = CI.has(B[i]) ? 1 : MAR.has(B[i]) ? 2 : 0;
}
