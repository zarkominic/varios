// Fontanería y decorados del episodio 30 (Bajo las pirámides: lo que dicen que hay y lo que se ha comprobado) en el estilo
// canónico pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Giza hoy (la meseta, el pozo de Osiris,
// el cementerio con el georradar), B Italia 2025 (la rueda de prensa), C «según ellos» (el plano azul / holograma de lo que
// dicen Biondi, Malanga y Mei), D dentro de Keops (la Cámara de la Reina con los detectores, la cara norte con la rendija,
// el pasillo de 2023), E Hawara (el laberinto de Heródoto hacia el 450 a. C. y la excavación de Petrie en 1888) y F hoy (el
// estudio de Atom, el satélite de radar, el corte del suelo con el agua, la redacción de una revista).
// LO QUE DICEN LOS ITALIANOS se dibuja SOLO en C, con su propio código visual (fondo azul noche, rejilla, líneas cian que
// brillan, cotas sin letras, un leve parpadeo de holograma), nunca como un decorado real. Lo comprobado (A, D), en el
// estilo de siempre. Personas reales por sus atributos; nada de burla.
// Los personajes son los de ELENCO_GZ y PIEZAS_GZ (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, bordas, pupitres) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/gz-comun.js';
//   const { E, R, M } = await T.preparar('gz-gancho');
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
// las piezas del episodio (PIEZAS_GZ: la pirámide de pisapapeles, la linterna, los detectores de muones, el endoscopio, el carrito de georradar…), las crea el reparto
export const PIEZAS_GZ = KIT.PIEZAS_GZ || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // la piedra caliza de Giza a varias horas, la arena, el granito, el adobe de Hawara, el azul del plano «según ellos»
    // (fondo azul noche, líneas cian, rejilla) y el ámbar de los muones
    caliza: '#e0c890', calizaS: '#b8965e', calizaO: '#8a6a3e', arena: '#e8cc8a', arenaS: '#c4a060', granito: '#a8706a',
    granitoS: '#6e4440', adobe: '#a8805a', adobeS: '#76563a', planoFondo: '#0c1a3a', planoRejilla: '#1a3462',
    planoLinea: '#5ae0f0', planoBrillo: '#c8fbff', muon: '#ffd060', agua: '#3a7ab0',
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
  const E = await escena(id, 'ep30');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: hacia el 2550 a. C. (las pirámides), 450 a. C. (Heródoto), 1888 (Petrie), 2017–2024 (los muones y
  // el georradar), 2025–2026 (el anuncio y la retirada)
  Object.assign(R.ICONOS, {
    piramide: ['...#...', '..###..', '..###..', '.#####.', '.#####.', '#######', '.......'],
    columna: ['#######', '.#.#.#.', '.#.#.#.', '.#.#.#.', '.#.#.#.', '#######', '.......'],
    muon: ['#..#..#', '.#.#.#.', '..###..', '#######', '..###..', '.#.#.#.', '#..#..#'],
    satelite: ['##.#.##', '##.#.##', '..###..', '..###..', '##.#.##', '##.#.##', '.......'],
  });
  R.tramosTiempo([[-2600, -400, R.PALA.ORO, 'piramide'], [-400, 2000, R.PALA.ROJO, 'columna'], [2000, 2025, R.PALA.AZUL ?? R.PALA.ROJO, 'muon'], [2025, 2027, R.PALA.VERDE ?? R.PALA.ORO, 'satelite']]);
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



// ── A · Giza, hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). o.hora: 'dia' (omisión) | 'atardecer' |
// 'noche' en todos los exteriores (cielo tramado de seis tonos, sol con halo o luna, estrellas, Vía Láctea y fugaz,
// cirros y cúmulos de tres tonos a tres velocidades). Devuelve la geometría ({ suelo, … }: ver cada encuadre).
//   'meseta': Kefrén en el centro (más alta por su terreno, con el remate de caliza lisa), Keops a la derecha (cima
//     plana con el mástil) con sus tres reinas, Micerinos lejos a la izquierda (con la brecha) y sus reinas, El Cairo en
//     la bruma; la Esfinge de perfil en su foso con el templo del valle y la valla; arena con ondas, huellas y la pista;
//     camellos con jinete, un autobús que llega, turistas que hacen fotos, un grupo con guía, un milano, golondrinas,
//     arena que vuela. De noche: focos que barren el cielo y luz de colores en la base (luz y sonido).
//     o.vibra 0–1: Kefrén tiembla (va en su propia capa), ondas finas en el aire y arena que salta. suelo 162.
//     Cámara 'calzada': Kefrén grande a la izquierda con su templo alto en ruinas, la calzada en diagonal hasta el
//     templo del valle y la Esfinge (abajo a la derecha), la boca del túnel del pozo de Osiris con su verja y su guarda,
//     visitantes por la calzada, un camello. suelo 166.
//   'osiris': el pozo de Osiris en CORTE, como maqueta: la falda de Kefrén se sale del cuadro por arriba (escala), Keops
//     lejos, el muro de la calzada; la roca con estratos, numulites y grietas; tres niveles (escalones, escaleras de
//     hierro, bombillas que tiemblan), nichos y dos sarcófagos de granito cerrados en el 2.º, el sarcófago entre cuatro
//     pilares y el agua en el 3.º; el nivel freático. o.corte 0–1: la tapa de tierra se abre de arriba abajo (1 por
//     omisión); o.regla 0–1: la regla de cotas baja hasta «30» (0 por omisión). suelo 92 (la superficie).
//     Cámara 'fondo': el nivel de abajo de cerca: roca con cincel y humedad, la boca del pozo y la escalera con la luz
//     que baja, la pasarela de rejilla (suelo 160), el sarcófago cerrado en su isla, el agua que se mueve, gotas, focos.
//   'cementerio': Keops a la izquierda, tres filas de mastabas con puerta falsa, rodadas del georradar, cuadrícula de
//     cuerdas, GPS en trípode, cajas, la mesa plegable con la sombrilla y la pantalla del georradar (o.ele 0–1 la va
//     pintando: la L y la mancha), trabajadores con carretilla, banderitas. suelo 162. El carrito lo pone la escena.
//     Cámara 'pantalla': la pantalla de cerca sobre la mesa (cuaderno con el croquis, lápiz, botella, móvil): capas del
//     suelo, hipérbolas, cotas 0–4, la L clara que late, la mancha más abajo con «?» (con o.ele ≥ 0,85); o.ele por
//     omisión 1 (con 1, un cursor la repasa).
// gizaDelante (después de los actores, mismas opciones): sillares caídos en las esquinas (meseta), postes con cuerda
// (calzada), barandilla de la boca (osiris) o de la pasarela (fondo), cinta de la cuadrícula (cementerio).
export function giza(R, t, o = {}) {
  const enc = o.encuadre ?? 'meseta', cam = o.camara ?? 'general';
  if (enc === 'osiris') return cam === 'fondo' ? a_osirisFondo(R, t, o) : a_osirisCorte(R, t, o);
  if (enc === 'cementerio') return cam === 'pantalla' ? a_radarPantalla(R, t, o) : a_cementerio(R, t, o);
  if (cam === 'calzada') return a_calzada(R, t, o);
  return a_meseta(R, t, o);
}
// lo de delante de los personajes en cada encuadre de giza(); se llama después de los actores, con las mismas opciones
export function gizaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'meseta', cam = o.camara ?? 'general', P = a_paleta(o.hora);
  if (enc === 'meseta' && cam === 'general') {   // dos sillares caídos en las esquinas de abajo
    a_sillar(R, -6, 170, 26, 12, P, 1); a_sillar(R, 14, 176, 18, 8, P, 2); a_sillar(R, 298, 172, 28, 13, P, 3);
    return { sillares: [[0, 158, 20, 180], [298, 159, 320, 180]] };
  }
  if (enc === 'meseta' && cam === 'calzada') {   // los postes con la cuerda que cierran el paso a la calzada, abajo
    for (const [x, k] of [[4, 0], [52, 1], [100, 2]]) a_poste(R, x, 178, P, k);
    for (const [x0, x1] of [[4, 52], [52, 100]]) for (let x = x0; x <= x1; x++) { const y = Math.round(165 + Math.sin((x - x0) / (x1 - x0) * Math.PI) * 4 + Math.sin(t * 1.6 + x0) * 0.6); R.pset(x, y, P.cuerda); R.pset(x, y + 1, P.cuerdaS); }
    return { postes: [4, 52, 100] };
  }
  if (enc === 'osiris' && cam === 'general') {   // la barandilla de la boca del pozo, delante de quien se asome
    const { rect, pset } = R, X = A_POZO.x;
    for (const bx of [X - 14, X - 2, X + 10, X + 22]) { rect(bx, 74, bx + 1, 92, hex('#3a3a44')); pset(bx, 74, hex('#9a9aa8')); }
    rect(X - 15, 74, X + 23, 75, hex('#4a4a56')); rect(X - 15, 74, X + 23, 74, hex('#a8a8b8')); rect(X - 15, 83, X + 23, 83, hex('#3a3a44'));
    return { barandilla: [X - 15, 74, X + 23, 92] };
  }
  if (enc === 'osiris' && cam === 'fondo') {   // la barandilla de la pasarela, que tapa las piernas de quien esté en ella
    const { rect, pset } = R;
    rect(0, 148, 118, 149, hex('#6a6a78')); rect(0, 148, 118, 148, hex('#c8c8d4')); rect(0, 155, 118, 155, hex('#4a4a56'));
    for (let x = 2; x <= 116; x += 19) { rect(x, 148, x + 1, 162, hex('#4a4a56')); pset(x, 148, hex('#e0e0ea')); }
    for (let x = 0; x <= 118; x++) if (((x + Math.floor(t * 6)) % 23) === 0) R.pset(x, 148, hex('#fff2c0'));   // el brillo de la lámpara que corre por el pasamanos
    return { barandilla: [0, 148, 118, 162] };
  }
  if (enc === 'cementerio' && cam === 'general') {   // las estacas con la cinta de la cuadrícula, en primer término
    const { rect, pset } = R;
    for (let x = 0; x < 320; x++) { const y = 176 + Math.round(Math.sin(x * 0.05 + t * 1.2) * 0.6); pset(x, y, ((x >> 2) & 1) ? hex('#f0e8d8') : hex('#e8503a')); }
    for (const x of [16, 96, 176, 256]) { rect(x, 171, x + 1, 180, hex('#8a6a44')); pset(x, 171, hex('#c89a64')); const ond = Math.floor(t * 5 + x) % 2; rect(x + 2, 171 + ond, x + 5, 172 + ond, hex('#ff7a2a')); }
    return { cinta: 176 };
  }
  return {};
}
// ── B · Italia, 2025 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'prensa': la sala de la rueda de prensa (15 de marzo de 2025) en un palacio italiano, de frente: techo con carril de
//     focos, pared de yeso ocre con cornisa y zócalo de cuarterones verde salvia, una ventana de piedra gris con
//     persianas verdes abiertas por la que se ven tejados de teja, una cúpula, un campanario, nubes que pasan, pájaros y
//     ropa tendida que se mueve; la pantalla LED grande (2 × 2 paneles, con su brillo que pasa) que proyecta o.pantalla
//     ('satelite' por omisión: Giza desde arriba con la retícula sobre Kefrén, coches en la carretera; 'plano': el corte
//     azul de los pozos, en el código del plano azul; 'reves': el mismo plano girado 180°, y o.giro 0–1 lo endereza con
//     una flecha de giro; 'apagada'); la tarima de madera, un roll-up sin letras (pirámide y ondas), la bandera
//     italiana que se mece, la puerta con el pictograma verde de salida, dos cámaras de vídeo en trípode con su piloto
//     rojo y el suelo de espiga con la luz de la ventana y el reflejo de la pantalla. La mesa, sus cosas y el público de
//     espaldas van en italiaDelante. Destellos de fotos (o.flashes false los quita). o.habla 0–2: el sitio cuyo micro
//     tiene el piloto rojo (por omisión rota cada 2,6 s); o.portatil false: sin portátil en la mesa.
//     Cámara 'mesa': más cerca y a la altura de los ponentes: la ventana grande a la izquierda, la bandera, la pantalla
//     desplazada a la derecha; la mesa (en italiaDelante) ocupa el primer término con micrófonos de cuello de cisne,
//     botellas y vasos sin etiqueta, cartelas sin letras, libretas, el faldón con el emblema del acto (pirámide y ondas)
//     y un cable; detrás, una lámpara de latón en la pared; el portátil (PIEZAS_GZ.portatil, o.portatil
//     'piramide' | 'azul' | false), el ramo de micrófonos de prensa y un móvil que graba con el contador en marcha.
//   'video': el estudio casero de vídeo, al anochecer: estantería con libros, plantas y una pirámide de recuerdo, una
//     ventana con el estor a medio bajar (tejados con ventanas encendidas), paneles de espuma acústica, el foco de aro
//     encendido, un póster de una pirámide al atardecer, el friso de tablillas pintadas, una planta que se mece, la
//     cámara en su trípode con la pantallita abatible y el piloto, la pantalla verde a medio recoger, el
//     escritorio con el monitor (o.pantalla, 'plano' por omisión), la taza que humea, alfombra y cables.
//     Cámara 'movil': de noche, sobre un mapamundi de puntos con las señales que salen de Italia, tres ventanas a
//     sitios distintos del mundo, cada una con su reloj: una cocina por la mañana (la tele en la pared), un vagón de
//     metro por la tarde (la pantalla de encima de la puerta, el túnel que corre) y un bar de noche (la tele en lo alto,
//     la cafetera que humea, el ventilador); abajo, seis móviles tumbados. o.n 0–1: cuántas de las nueve pantallas se
//     han encendido con los dibujos azules (una a una; por omisión, todas).
// Devuelve { suelo, ... } con las coordenadas de cada encuadre (los sitios de los ponentes, la pantalla, los huecos libres).
export function italia(R, t, o = {}) {
  const enc = o.encuadre ?? 'prensa', cam = o.camara ?? 'general';
  if (enc === 'video') return cam === 'movil' ? b_movil(R, t, o) : b_estudioVideo(R, t, o);
  return cam === 'mesa' ? b_prensaMesa(R, t, o) : b_prensa(R, t, o);
}
// lo de delante de los personajes en cada encuadre de italia(); se llama después de los actores, con las mismas opciones:
// de las fotos; en 'prensa' la mesa de los ponentes (mantel, micrófonos, botellas, vasos, cartelas, el portátil de espaldas) y la
// fila del público de espaldas con sus sillas (deja libre el pasillo del centro, x 128–194, y los lados) y los destellos; en 'mesa' la
// mesa grande de cerca con todo lo de encima; en 'video' el borde del escritorio con el teclado y la taza no tapa a
// nadie, así que solo el cable que cruza el suelo; en 'movil', nada
export function italiaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'prensa', cam = o.camara ?? 'general';
  if (enc === 'video') { if (cam !== 'movil') b_cableSuelo(R, t); return {}; }
  if (cam === 'mesa') { b_mesaCerca(R, t, o); if (o.flashes !== false) b_flashes(R, t, [[6, 120], [314, 128], [40, 176], [280, 176]], 3.4); return {}; }
  b_mesaPrensa(R, t, o); b_publico(R, t); if (o.flashes !== false) b_flashes(R, t, [[72, 152], [100, 150], [226, 152], [256, 150]], 4.2); return {};
}
// ── C · «Según ellos»: el plano azul ─────────────────────────────────────────────────────────────────────────────────
// Lo que DICEN Biondi, Malanga y Mei, dibujado como un plano azul / holograma, nunca como un decorado real.
// SIEMPRE, en los seis encuadres: fondo azul noche tramado (degradado, motas de papel, líneas de barrido fijas), rejilla
//   fina cada 8 px y gruesa cada 32 px con cruces, marco con reglillas y esquinas, un cajetín abajo a la derecha (barras,
//   pirámide y brújula, sin letras), un radar de satélite que barre arriba a la izquierda (x 14–38, y 24–48) y una tira
//   de señal que vibra a la derecha (x 288–314, y 52–100). Las líneas del dibujo van en cian con halo y un brillo que
//   corre por ellas; lo «nuevo» en magenta; lo REAL (el pozo de Osiris) en blanco. Por encima, una línea de barrido que
//   sube despacio (unos 8 s por pantalla), algún salto de fila y un parpadeo leve (por t, sin azar).
//   EL SUELO PARA LOS PERSONAJES: una tarima de holograma (y 160–179, rejilla en perspectiva y emisores); los pies van en
//   y = 172 (se devuelve { suelo: 172 }). Su borde delantero y los proyectores de las esquinas van en planoDelante.
//   Sin letras: cotas con flechas y números (R.numero) como mucho.
// o.encuadre 'corte' (por omisión) y o.camara 'general' | 'pozos'; 'keops' con 'general' | 'leyenda'; 'mataha' con
//   'general' | 'regla'. Las opciones de cantidad van de 0 a 1 y valen 1 si no se dan (salvo o.agua y o.baja, 0).
//   'corte'/'general': el corte vertical de la meseta a escala (6,4 m por píxel): Kefrén arriba (x 144–176, y 29–50, con
//     su cota 136), Keops y Menkaure al lado en tenue, la superficie en y 50 y la roca rayada en corte. Debajo, según
//     ellos: cinco salas en la base (x 123–197, y 52–59) unidas por pasillos (o.salas: se encienden una a una), ocho
//     pozos huecos (x 118, 130 … 202) que bajan hasta y 136 (o.pozos: se dibujan bajando), cada uno con su rampa en
//     espiral que gira con t (o.espiral: hasta dónde llega), una galería que los une, dos cubos (x 116–132 y 188–204,
//     y 135–153; o.cubos: se dibujan arista a arista) y, más abajo, trazos que se pierden con flechas y «2000» (o.hondo).
//     o.regla: la regla de cotas (x 100, de 0 a 650) y la torre de 4,8 pirámides fantasma (x 222–254) que da la escala.
//     o.agua (0 por omisión): el agua subterránea sube desde el fondo hasta su nivel real (y 58, unas decenas de metros)
//     y los cubos se llenan como una pecera, con burbujas y un pececito (gag 7). Una leyenda sin letras (x 14–58,
//     y 62–122: sala 5, pozo 8, cubo 2) se enciende con ellas.
//   'corte'/'pozos': los pozos de cerca (1,5 m por píxel), tres a la vista (x 76, 160, 244) con la espiral como la rosca de
//     un tornillo; la cámara baja (o.baja 0–1): arriba la base de Kefrén y las salas, abajo los cubos. La rejilla y la
//     roca se desplazan con la bajada; una regla de profundidad a la izquierda (x 14–40) con la cifra que cambia, y un
//     plano en miniatura a la derecha (x 266–306, y 52–150) con el recuadro de lo que se ve.
//   'keops': el corte de la Gran Pirámide (vértice x 158, y 20; base x 64–252 en y 140): hiladas, la entrada, el pasillo
//     descendente hasta la cámara subterránea (x 140–158, y 147–153), el ascendente, la Gran Galería, la Cámara de la
//     Reina, la del Rey con sus cámaras de descarga, los conductos, el gran vacío de 2017 y el pasillo de 2023, todo en
//     cian; y lo «nuevo» del artículo de 2022 en magenta (o.nuevas: aparecen una a una con un anillo), salas y pozos que
//     bajan bajo la base. Cota 146 a la derecha.
//   'keops'/'leyenda': la Esfinge en holograma (x 96–246, y 44–104) y, debajo, según la leyenda: la escalera entre las
//     patas, la Sala de los Registros con seis columnas (x 140–236, y 114–150), una puerta al fondo que late (x 226–234),
//     una bajada a otro piso y túneles que van a tres pirámides pequeñas (x 26–84) (o.simbolos: se van dibujando).
//   'mataha': la rejilla de muros enterrados en perspectiva (lo que dicen haber visto en Hawara en 2008, x 70–250,
//     y 58–152) bajo una losa rayada, la pirámide de adobe de Hawara en tenue (x 18–74), ondas de radar que bajan y una
//     línea de escaneo que recorre los muros (o.muros: se van dibujando); una «?» grande que late (x 230–252, y 18–46).
//   'mataha'/'regla': la escala: Kefrén y los ocho pozos de 650 m (x 40–100) con su regla, y el pozo de Osiris (real, en
//     blanco): diminuto en la superficie (x 150) y en grande en una lupa (x 176–262, y 58–150) con sus tres niveles, los
//     sarcófagos y el agua del fondo, y su cota 30 (o.lupa: se abre la lupa).
// o.ox: desplaza todo el plano en horizontal (para medio encuadre; se respeta el R.recorte de la escena).
export function plano(R, t, o = {}) {
  const ox = Math.round(o.ox ?? 0);
  if (!ox) return c_plano(R, t, o);
  // con desplazamiento: se pinta en un búfer aparte y se copia corrido (respeta el recorte de la escena)
  if (!c_capas.has('~ox')) c_capas.set('~ox', R.nuevo());
  const b = c_capas.get('~ox'), prev = R.usar(b), g = c_plano(R, t, o); R.usar(prev);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const sx = x - ox; R.pset(x, y, b[y * 320 + (sx < 0 ? 0 : sx > 319 ? 319 : sx)]); }
  return g;
}
// lo de delante de los personajes en plano(): el borde delantero de la tarima (y 175–179) con sus emisores que laten y los
// dos proyectores de las esquinas (x 2–20 y 300–318, y 163–179), en código de plano. Nada pasa de y 163: no tapa caras.
// Se llama después de los actores, con las mismas opciones.
export function planoDelante(R, t, o = {}) {
  const PZ = c_PZ;
  R.rect(0, 176, 319, 179, PZ.f0); R.linea(0, 175, 319, 175, PZ.co); R.linea(0, 176, 319, 176, PZ.hal);
  for (let x = 0; x < 320; x += 4) R.pset(x, 178, PZ.rjM);
  for (let k = 0; k < 9; k++) { const x = 24 + k * 34, on = 0.5 + 0.5 * Math.sin(t * 3 - k * 0.8);
    R.linea(x - 3, 177, x + 3, 177, on > 0.6 ? PZ.ci : PZ.co); R.pset(x, 177, on > 0.8 ? PZ.br : PZ.ci); R.linea(x - 2, 178, x + 2, 178, PZ.hal2); }
  for (const [x0, d] of [[2, 1], [318, -1]]) {
    const xa = Math.min(x0, x0 + 18 * d), xb = Math.max(x0, x0 + 18 * d);
    R.rect(xa, 166, xb, 179, PZ.f1); R.linea(xa, 166, xb, 166, PZ.co); R.linea(xa, 166, xa, 179, PZ.rjC); R.linea(xb, 166, xb, 179, PZ.rjC);
    for (let y = 169; y < 178; y += 3) R.linea(xa + 2, y, xb - 2, y, PZ.rjM);
    const lx = x0 + 12 * d, pul = Math.sin(t * 4 + d) > 0;
    R.disco(lx, 165, 3, PZ.hal2); R.disco(lx, 165, 2, pul ? PZ.ci : PZ.co); R.pset(lx, 164, PZ.br);
    for (let k = 0; k < 3; k++) { const y = Math.round(162 - ((t * 10 + k * 4) % 10)); if ((y + k) % 2 === 0) R.pset(lx + Math.round(Math.sin(t * 3 + k) * 2), y, PZ.co); }
  }
  return {};
}
// ── D · Dentro de Keops ─────────────────────────────────────────────────────────────────────────────────
// Lo comprobado, en el estilo de siempre: piedra caliza de verdad (grandes bloques con juntas, eflorescencias de sal,
// desconchones, el canto de luz de cada sillar) y luz de trabajo cálida. Los muones son rayitas ámbar (C.muon).
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'reina': la Cámara de la Reina en perspectiva, mirando al este: el muro del fondo a dos aguas con el nicho escalonado
//     (a la derecha del centro), los muros norte y sur en grandes hiladas con sal blanca, el techo de vigas a dos aguas,
//     la boca del pasillo de entrada (abajo a la izquierda) y los dos canales de ventilación cuadrados; dos focos de
//     trípode que alumbran, cables naranja por el suelo, dos detectores (PIEZAS_GZ.detectorMuones) con sus lucecitas,
//     placas de película (PIEZAS_GZ.placaEmulsion) de pie y tumbadas, un maletín con el portátil y motas en la luz.
//     o.muones 0–1: lluvia de rayitas ámbar que cae atravesando la piedra (y los detectores destellan).
//     Cámara 'galeria': la Gran Galería en corte (la piedra cortada como una maqueta): el rellano abajo a la izquierda
//     con la boca del pasillo de la Reina, la galería que sube con sus siete hiladas en voladizo, las rampas laterales con
//     sus mechinales, la pasarela de madera con travesaños y barandilla, lámparas en la pared, dos turistas lejanos que
//     suben; arriba a la derecha la antecámara y la Cámara del Rey de granito con sus cámaras de descarga. Por encima de
//     la galería, el gran vacío alargado que se enciende (o.vacio 0–1, en blanco cálido que late, con su halo) y
//     o.muones 0–1 como en la general. La barandilla de delante va en keopsDelante.
//   'norte': la cara norte por fuera: las hiladas escalonadas de sillares erosionados (cada hilada con su huella de luz
//     y arena, palomas posadas), en el centro los grandes bloques en chevrón (dos pares a dos aguas) con el hueco
//     debajo y la entrada original con su reja; a la derecha el boquete de Al-Mamún con la escalera de los turistas; a la
//     izquierda el andamio de tubos con dos plataformas, escalera, el maletín con la pantallita y el carrete; el cable
//     del endoscopio sube hasta la rendija entre dos piedras (en RENDIJA) y entra con o.entra 0–1 (a 0 la cabecita
//     está fuera, a 1 dentro); o.polvo 0–1: la nube de polvo que sale de la rendija (gag 5). Vida: sombras de nubes
//     que barren la cara, palomas, turistas pequeños que pasan, arena que vuela, lucecitas. La barandilla de la
//     plataforma va en keopsDelante.
//     Cámara 'pasillo': lo que ve el endoscopio: el pasillo de 2023 en perspectiva de verdad (paredes de bloques, techo
//     en chevrón de losas, suelo con cascotes) que se pierde en la oscuridad, la luz de la cámara en la piedra, grano,
//     motas que flotan y un leve temblor; todo dentro de la viñeta redonda, con la carcasa del monitor alrededor
//     (marcas de mira, un punto rojo que parpadea, la batería, cifras de profundidad que suben con o.entra).
//   'anuncio': la rueda de prensa al pie de la pirámide (2 de marzo de 2023): cielo tramado con nubes de tres tonos,
//     sol y pájaros; Keops entera (la cara norte en sombra y la oeste al sol, aristas escalonadas, el chevrón diminuto) y
//     Kefrén asomando detrás; la explanada; el estrado con moqueta y un telón azul con la pirámide dorada, altavoces,
//     banderines al viento, una pantalla en su torre de truss que enseña el pasillo, cámaras de televisión en trípode
//     con su piloto rojo y periodistas pequeños de fondo con móviles que destellan. El atril va en keopsDelante.
//     Cámara 'radiografia': la placa de muones en el negatoscopio de la pared de un laboratorio: grano ámbar, la silueta
//     de la pirámide más oscura y, con o.revela 0–1 (un barrido de izquierda a derecha), las zonas claras donde hay
//     hueco: la Gran Galería, la Cámara del Rey, la de la Reina, el gran vacío y el pasillo del norte; una línea de
//     escaneo que corre. Debajo, el suelo de linóleo; a la izquierda una estantería con archivadores, a la derecha una
//     mesa con el microscopio de escaneo, cajas de placas, el portátil con barras, la lámpara y una taza que humea.
// Devuelve la geometría: { suelo, … } (ver cada encuadre).
export function keops(R, t, o = {}) {
  const enc = o.encuadre ?? 'reina', cam = o.camara ?? 'general';
  if (enc === 'norte') return cam === 'pasillo' ? d_pasilloPlano(R, t, o) : d_norte(R, t, o);
  if (enc === 'anuncio') return cam === 'radiografia' ? d_radiografia(R, t, o) : d_anuncio(R, t, o);
  return cam === 'galeria' ? d_galeria(R, t, o) : d_reina(R, t, o);
}
// lo de delante de los personajes en cada encuadre de keops(); se llama después de los actores, con las mismas opciones:
// 'reina' general: el maletín de los cables y el carrete en la esquina de abajo a la izquierda (x 0–34); 'galeria': la
// barandilla de la pasarela (pasamanos a 12 px del suelo); 'norte' general: la barandilla de la plataforma del andamio y
// su rodapié; 'anuncio' general: el atril con el micrófono de ramillete (en ATRIL). 'pasillo' y 'radiografia': nada.
export function keopsDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'reina', cam = o.camara ?? 'general', { rect, linea, pset } = R;
  if (enc === 'reina' && cam === 'galeria') {
    // la barandilla de delante: postes cada 18 px y el pasamanos de madera, paralelos al suelo de la galería
    const pas = (x) => d_galSuelo(x) - 12;
    for (let x = 30; x <= 258; x += 18) { const y = Math.round(d_galSuelo(x)); rect(x, Math.round(pas(x)), x + 1, y, d_P.maderaS); pset(x, Math.round(pas(x)), d_P.maderaL); }
    for (let x = 26; x <= 262; x++) { const y = Math.round(pas(x)); pset(x, y - 1, d_P.maderaL); pset(x, y, d_P.madera); pset(x, y + 1, d_P.maderaS); }
    return { pasamanos: 12 };
  }
  if (enc === 'reina') {
    // el maletín de transporte con el carrete de cable, en primer término
    rect(0, 158, 34, 179, C.k); rect(1, 159, 33, 179, d_P.caja); rect(1, 159, 33, 160, d_P.cajaL); rect(30, 161, 33, 179, d_P.cajaS);
    for (const x of [4, 28]) { rect(x, 162, x + 1, 179, d_P.metL); }
    rect(10, 166, 22, 168, d_P.metS); rect(11, 166, 21, 166, d_P.metL);
    R.disco(18, 152, 8, C.k); R.disco(18, 152, 7, d_P.cableN); R.anillo(18, 152, 5, d_P.cableN2); R.disco(18, 152, 2, d_P.metL);
    for (let a = 0; a < 6; a++) pset(Math.round(18 + Math.cos(a + 0.4) * 6), Math.round(152 + Math.sin(a + 0.4) * 6), d_P.cableL);
    linea(25, 152, 40, 160, d_P.cableN); linea(40, 160, 60, 164, d_P.cableN);
    return {};
  }
  if (enc === 'norte' && cam !== 'pasillo') {
    const p = d_NORTE.plataforma;
    for (const y of [p - 8, p - 15]) { rect(14, y, 114, y + 1, d_P.metS); rect(14, y, 114, y, d_P.metL); }
    for (const x of [22, 58, 94]) { rect(x, p - 16, x + 2, p, d_P.metS); pset(x, p - 16, d_P.metL); rect(x - 1, p - 9, x + 3, p - 7, d_P.acople); }
    rect(14, p - 4, 114, p, d_P.rodapie); rect(14, p - 4, 114, p - 4, d_P.rodapieL);
    for (let x = 18; x < 114; x += 9) pset(x, p - 2, d_P.rodapieS);
    return {};
  }
  if (enc === 'anuncio' && cam !== 'radiografia') {
    const [ax, ay] = d_ATRIL;
    // el atril de madera con el frente azul y el pictograma dorado de la pirámide (sin letras)
    R.poligono([[ax - 15, ay], [ax + 15, ay], [ax + 13, ay + 18], [ax - 13, ay + 18]], C.k);
    R.poligono([[ax - 14, ay + 1], [ax + 14, ay + 1], [ax + 12, ay + 17], [ax - 12, ay + 17]], (x, y) => d_tono(d_MAD, 3.4 - (x - ax + 14) / 9 + (h(x >> 1, y, 61) - 0.5) * 0.5, x, y));
    rect(ax - 10, ay + 4, ax + 10, ay + 13, d_P.telon); rect(ax - 10, ay + 4, ax + 10, ay + 4, d_P.telonL);
    R.poligono([[ax - 5, ay + 12], [ax, ay + 6], [ax + 5, ay + 12]], d_P.oro); linea(ax, ay + 6, ax + 5, ay + 12, d_P.oroS);
    rect(ax - 16, ay - 2, ax + 16, ay, d_P.maderaL); rect(ax - 16, ay, ax + 16, ay, d_P.maderaS);
    // el ramillete de micrófonos con sus cubos de colores, que tiemblan un poco
    const mics = [[-7, d_P.micR], [-3, d_P.micA], [1, d_P.micV], [5, d_P.micB], [8, d_P.micR]];
    mics.forEach(([dx, c], k) => { const mx = ax + dx, my = ay - 5 - (k % 2) + Math.round(Math.sin(t * 2 + k) * 0.4);
      linea(ax + (dx >> 2), ay - 2, mx, my + 3, C.k); rect(mx - 1, my, mx + 1, my + 2, c); rect(mx - 1, my - 2, mx + 1, my - 1, d_P.metS); pset(mx, my - 2, d_P.metL); });
    return { atril: d_ATRIL };
  }
  return {};
}
// ── E · Hawara, 450 a. C. y 1888 ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría: { suelo, … } (ver cada
// encuadre). Los cielos van tramados, con nubes de tres tonos a tres velocidades y pájaros; la esquina de Atom y la barra
// del año quedan como cielo o piedra tranquila.
//   'lago' (hacia el 450 a. C.): el gran lago (Moeris) con el laberinto inmenso en la orilla: fachada de piedra blanca de
//     punta a punta con dos columnatas pintadas (gente diminuta que pasa entre las columnas), cornisa de gola, el pilono
//     central con su puerta, el disco alado, relieves de trazos y dos mástiles con banderolas que ondean; vigías en la
//     azotea; la pirámide de adobe de Amenemhat III detrás (hiladas de ladrillo, cara al sol y cara en sombra), palmeras
//     detrás y delante (se mecen), la sierra del desierto con calima. El agua refleja todo con ondas, destellos del sol y
//     brillos que corren; juncos y papiros que se mecen, dos garzas (una pesca), un cocodrilo lejano que asoma los ojos
//     y deja su estela, una barquilla de papiro con un pescador. o.revela 0–1 (1 por omisión): con menos de 1 el
//     laberinto y la pirámide salen de la bruma. o.barca: x del centro de la barca de vela del viajero (150 por omisión;
//     false: sin barca). La vela y el mástil van aquí (detrás del viajero); el casco, el remo de popa, las ondas y los
//     juncos de primer plano, en hawaraDelante. o.vela 0–1 (1): la vela hinchada.
//     Cámara 'patio': uno de los doce patios techados: techo de grandes losas con dos aberturas por las que bajan haces
//     de sol (motas que flotan), arquitrabe pintado, dos columnas grandes de capitel de papiro abierto pintadas, columnas
//     del fondo, el muro del fondo con relieves en tres registros (procesiones de figuras de trazos, columnas de trazos)
//     y dos puertas a pasillos (por una pasa un sirviente con una bandeja, por otra alguien con un candil), dos braseros de
//     bronce con fuego y humo, tinajas, una mesa de ofrendas, el suelo de losas con las sombras de las columnas y un gato
//     que cruza. Las dos columnas grandes van en hawaraDelante (por delante de quien pase).
//   'escalera': el arranque de la escalera que baja a la oscuridad, en un vano con dintel pintado; muro de sillares con
//     el cocodrilo sagrado pintado sobre su altar (disco solar y plumas), columnas de trazos, una hornacina con lámpara de
//     aceite y una lámpara de pie (llamas que tiemblan, halos, humo), suelo de losas, un escarabajo que empuja su bola.
//     o.puerta 0–1: la puerta de madera con herrajes de bronce se cierra (va en hawaraDelante, por delante de todo);
//     o.portazo 0–1: el polvo que salta del marco con el golpe (con la puerta ya cerrada). El guardián se planta en el
//     vano (geometría .guardian) y la puerta lo tapa al cerrarse.
//     Cámara 'pasillos': un laberinto de pasillos con columnas pintadas en perspectiva, que se ramifica (dos pasillos
//     laterales con luz de día al fondo, uno a cada lado, y un cruce al final); lámparas en las columnas, motas, y una
//     figura diminuta con un candil que cruza al fondo (tapada por las columnas).
//   'petrie' (1888): la pirámide de adobe medio derruida (cima roma, surcos, derrubios, la boca de entrada), un campo
//     enorme de esquirlas blancas que se pierde a lo lejos (montones, destellos al sol, trozos de sillar, las estacas y el
//     cordel de Petrie, huellas de pies), la huella del edificio (o.huella 0–1: las zanjas de los muros asoman desde
//     nuestros pies hacia el fondo, anchas cerca y finas lejos, a la izquierda del campamento), el campamento (tienda de lona con la puerta que
//     se mueve, tienda redonda, cajas, cestas apiladas, una criba, una tinaja), trabajadores pequeños que llevan cestas a
//     la cabeza y cavan con la azada, un burro con alforjas, el canal con palmeras y una vela que pasa. En
//     hawaraDelante: una cesta llena y una azada en el primer plano izquierdo.
//     Cámara 'zanja': una zanja de cerca: estratos (esquirlas, arena, limo, cascotes, adobe), paredes laterales en
//     perspectiva, la losa de piedra del fondo (juntas, marcas de cincel), el borde de arriba con un trabajador que va y
//     viene con su cesta (las esquirlas caen por la pared y levantan polvillo); en 1888 el trípode con la polea por la que
//     suben y bajan una cesta, una escalera de madera con un farol que se mece, un pico y la mira de agrimensor a franjas
//     (las cestas del primer plano, en hawaraDelante); con o.año 2008, una escalera de aluminio, cables naranja y negro,
//     electrodos, el aparato de escaneo en su trípode con su pantalla que barre y un piloto que parpadea, banderitas y la
//     cinta métrica (la caja de plástico, en hawaraDelante), y arriba un técnico con chaleco.
export function hawara(R, t, o = {}) {
  const enc = o.encuadre ?? 'lago', cam = o.camara ?? 'general';
  if (enc === 'escalera') return cam === 'pasillos' ? e_pasillos(R, t, o) : e_escalera(R, t, o);
  if (enc === 'petrie') return cam === 'zanja' ? e_zanja(R, t, o) : e_petrie(R, t, o);
  return cam === 'patio' ? e_patio(R, t, o) : e_lago(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hawara(); se llama después de los actores, con las mismas opciones:
// 'lago' el casco de la barca, su remo y sus ondas, y los juncos de primer plano; 'patio' las dos columnas grandes;
// 'escalera' la puerta (o.puerta, o.portazo); 'petrie' la cesta y la azada del primer plano; 'zanja' las cestas (1888) o
// la caja de plástico (2008). Devuelve la geometría de lo que dibuja.
export function hawaraDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'lago', cam = o.camara ?? 'general';
  if (enc === 'escalera') return cam === 'pasillos' ? {} : e_escaleraDelante(R, t, o);
  if (enc === 'petrie') return cam === 'zanja' ? e_zanjaDelante(R, t, o) : e_petrieDelante(R, t, o);
  return cam === 'patio' ? e_patioDelante(R, t, o) : e_lagoDelante(R, t, o);
}
// ── F · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve { suelo, … } con la geometría del
// encuadre. LO DE DELANTE va en hoyDelante(R, t, o), que se llama DESPUÉS de los actores con las mismas opciones.
//   'estudio' (cámaras 'general' y 'mesa'): el estudio de Atom, de día. General: papel pintado de arena con rayas y
//     pirámides diminutas (liso arriba a la derecha), friso de nogal con cuarterones, suelo de tablas con un kilim; la
//     ventana con cortinas (cielo tramado, nubes de tres tonos a tres velocidades, pájaros, tejados de ladrillo con un
//     depósito de agua y una chimenea que humea, árboles que se mecen) con el gato en el alféizar y el radiador; en la
//     pared, EL ARMARIO EMPOTRADO (puerta forrada del mismo papel, casi invisible: solo la junta y el tirador hundido;
//     o.armario 0–1: la puerta se abre hacia nosotros y dentro se ve la barra con camisas, un abrigo y una bufanda que se
//     balancean, la balda con la sombrerera y un sombrero, zapatos, un paraguas y la aspiradora; gag 4); el mapa del
//     Nilo visto desde el espacio enmarcado, el reloj que anda, la lámpara de techo que se mece, la estantería con libros,
//     la maqueta de la pirámide en corte (las salas y la Gran Galería), una esfinge de escayola, un escarabeo, un
//     obelisco y una vasija; el papiro enmarcado (una barca en el Nilo, sin jeroglíficos) y la kentia que se mece; la
//     mesa con el flexo, el bote de lápices, los papeles con bocetos, la pila de libros, la taza que humea, la lupa y LA
//     PIRÁMIDE DE PISAPAPELES (PIEZAS_GZ.piramidePisapapeles). o.piramide (true; false: la pinta la escena), o.abre 0–1
//     (la punta se levanta, gag 1), o.lupa (true). hoyDelante: el sillón de lectura (izquierda) y la papelera con bolas
//     de papel (derecha), en las esquinas.
//     Cámara 'mesa': la mesa de cerca (tablero de nogal con vetas en perspectiva) con la pirámide grande (×3), la linterna,
//     el lápiz, la lupa, la libreta con el boceto de la pirámide en corte, la taza que humea, la goma y sus migas; detrás,
//     la ventana con el cielo y los tejados, el corcho con bocetos clavados (pirámide, esfinge, flechas, «?»), los libros
//     y el flexo con su cono de luz. o.abre 0–1; o.linterna: false | true (apagada) | 'encendida' (tumbada en la mesa,
//     con su haz); o.lapiz: 'mesa' (por omisión, junto a la libreta) | 'dentro' (asoma del hueco de la pirámide, gag 9;
//     sale con o.abre) | false; o.piramide (true). hoyDelante: el borde de la mesa con la taza grande y la goma.
//   'orbita' (cámaras 'general' y 'rebote'): el espacio (azul noche tramado, estrellas que titilan, una estrella fugaz
//     de vez en cuando) y la Tierra abajo, curva, con su halo de atmósfera: el Mediterráneo, el desierto con dunas, el
//     Nilo verde con su delta, el mar Rojo y nubes que pasan a dos velocidades; el sol en el borde izquierdo con su
//     destello. o.noche: la Tierra de noche (el Nilo y El Cairo, un hilo de luces que titilan). El satélite de radar
//     (cuerpo de lámina dorada que brilla, el panel de radar largo con sus celdas, dos alas de paneles solares, una luz
//     que parpadea) cabecea un poco en (o.satX, o.satY), por omisión (118, 46). o.ondas 0–1: arcos cian que bajan hacia
//     Giza y el eco ámbar que sube; o.trompetilla 0–1: el satélite saca la trompetilla de oído enorme (de latón, como
//     PIEZAS_GZ.trompetilla pero dibujada aquí, curva, para que apunte a Giza; devuelve r.boca) (gag 3).
//     Cámara 'rebote': más cerca del suelo: el horizonte curvo arriba, el desierto con el Nilo, El Cairo y la meseta de
//     Giza con las tres pirámides abajo a la izquierda (orilla oeste del Nilo; El Cairo enfrente); el satélite arriba. o.rebote 0–1: la onda baja como
//     una pelota cian con estela, choca con la roca (se aplasta, salta polvo), y vuelve al satélite (que retrocede del
//     golpe); gag 6.
//   'suelo' (cámaras 'general' y 'campo'): el corte del suelo de Giza: arriba el cielo de día con nubes y la pirámide
//     sobre la meseta (sin escala), una palmera y un camello; debajo, la arena con piedras, las capas de caliza en tres
//     tonos con fósiles (numulites), grietas y vetas, la roca más oscura abajo; la regla de cotas a la izquierda (10, 20,
//     30, 40, 50 en metros). o.radar 0–1: la onda del radar baja desde arriba y entra en la arena hasta unos diez metros,
//     donde se apaga (una línea cian que ondula y la cota de 10 se ilumina); o.agua 0–1: la capa de agua subterránea
//     (a unas pocas decenas de metros) se llena y brilla, con burbujas y ondas.
//     Cámara 'campo': un campo de pruebas de georradar en Estados Unidos: cielo con nubes de tres tonos y pájaros, monte y
//     bosque al fondo, una valla, la cuadrícula de cuerdas con banderitas que ondean, hierba que se mece, la camioneta
//     con la portezuela abierta y cajas, una mesa plegable con un portátil bajo una sombrilla, una manga de viento.
//   'redaccion' (cámaras 'general' y 'despacho'): la redacción de una revista científica en una ciudad europea (agosto de
//     2026): techo de vigas con plafones, ventanales con la ciudad (tejados de pizarra, una cúpula, una torre con reloj,
//     grúas, nubes y palomas), paredes de ladrillo visto con portadas enmarcadas (sin letras: pirámides, átomos, una
//     doble hélice), estantería de tomos encuadernados, pantallas que cambian, una impresora que escupe hojas, una
//     planta, un ventilador, al fondo la mesa de los autores (x 214–300) y en primer plano la mesa de los editores en
//     hoyDelante. o.sello 0–1: el sello rojo baja y estampa la revista que hay en la mesa de delante (0,7 golpe).
//     o.revista (true: la revista abierta en la mesa de delante).
//     Cámara 'despacho': un despacho de El Cairo: paredes de yeso con zócalo de azulejo, el ventanal con arco y celosía
//     por el que se ven los alminares, las azoteas con antenas y depósitos, la pirámide al fondo con la bruma y milanos
//     que planean; el ventilador de techo que gira, archivadores, estanterías con carpetas atadas con cinta, un perchero,
//     el reloj; la mesa (en hoyDelante) con la bandeja de entrada, el teléfono, el vaso de té que humea y el sello.
//     o.carpeta 0–1: la carpeta de solicitud (PIEZAS_GZ.carpeta) se desliza por la mesa hasta la bandeja (false: no).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'orbita') return cam === 'rebote' ? f_rebote(R, t, o) : f_orbita(R, t, o);
  if (enc === 'suelo') return cam === 'campo' ? f_campo(R, t, o) : f_corte(R, t, o);
  if (enc === 'redaccion') return cam === 'despacho' ? f_despacho(R, t, o) : f_redaccion(R, t, o);
  return cam === 'mesa' ? f_mesa(R, t, o) : f_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'orbita') return {};
  if (enc === 'suelo') return cam === 'campo' ? f_campoDelante(R, t, o) : {};
  if (enc === 'redaccion') return cam === 'despacho' ? f_despachoDelante(R, t, o) : f_redaccionDelante(R, t, o);
  return cam === 'mesa' ? f_mesaDelante(R, t, o) : f_estudioDelante(R, t, o);
}
const A_PAL = {
  dia: {
    cielo: ['#3a78cc', '#5292dc', '#74ace6', '#9cc6ee', '#c4dcec', '#e8e0c8'], cortes: [0, 0.2, 0.42, 0.62, 0.8, 0.94],
    nube: ['#ffffff', '#e6eef8', '#b8c8de'], cirro: ['#dce8f4', '#f4f8fc'], sol: [60, 36, 8], solC: ['#fffbe8', '#fff0b0', '#ffe9a0'],
    lit: '#ecd09a', lit2: '#ddbc84', litL: '#f8e4b8', sh: '#c39a66', sh2: '#ac8452', ln: '#b48c5c', lnS: '#8e6842', fil: '#6a4a30',
    capa: '#f4e6c4', capaS: '#dcc49a', bruma: '#e6dcc4', lej: '#c8bca8', ciudad: '#b4b0b4', ciudadS: '#9c98a4',
    arena: '#e6c486', arenaS: '#c8a46a', arenaL: '#f4daa2', arenaD: '#a8844e', roca: '#c0a070', rocaS: '#987650', rocaL: '#dcc092',
    huella: '#c49c60', esf: '#e4b070', esfS: '#b88050', esfL: '#f8d494', esfD: '#8a5a36', sombra: 0.78,
    cuerda: '#e8d8b0', cuerdaS: '#a88a5a', poste: '#7a6a5a', posteL: '#b0a090',
  },
  atardecer: {
    cielo: ['#2e2e6a', '#5a3c80', '#9a4c84', '#d8687a', '#f09060', '#f8c070'], cortes: [0, 0.18, 0.38, 0.58, 0.76, 0.9],
    nube: ['#ffd8a8', '#f0a080', '#a85a78'], cirro: ['#f8a888', '#ffd0a0'], sol: [88, 93, 11], solC: ['#fff4c0', '#ffd070', '#f8a050'],
    lit: '#e89a62', lit2: '#d48056', litL: '#ffc884', sh: '#9a5a56', sh2: '#844a4c', ln: '#c47852', lnS: '#6e3c44', fil: '#4a2834',
    capa: '#ffbc7c', capaS: '#b46a5c', bruma: '#f4b07a', lej: '#c4806e', ciudad: '#a06070', ciudadS: '#7a4a62',
    arena: '#d8925e', arenaS: '#a8644e', arenaL: '#f0b276', arenaD: '#7e4a42', roca: '#b47258', rocaS: '#844e46', rocaL: '#e09868',
    huella: '#a86a4e', esf: '#d08458', esfS: '#94584c', esfL: '#f4b07a', esfD: '#6a3a3e', sombra: 0.7,
    cuerda: '#f0c090', cuerdaS: '#8a5048', poste: '#5a3a3a', posteL: '#a06a5a',
  },
  noche: {
    cielo: ['#080a24', '#0e1432', '#141e44', '#1c2a56', '#2a3664', '#4a4270'], cortes: [0, 0.22, 0.44, 0.64, 0.82, 0.94],
    nube: ['#5a5e8a', '#3e4270', '#2a2e56'], cirro: ['#2a3060', '#3a4274'], luna: [232, 32, 6],
    lit: '#d6a462', lit2: '#c08c56', litL: '#f0c27a', sh: '#7a6070', sh2: '#64506a', ln: '#a87a50', lnS: '#4e4062', fil: '#26203a',
    capa: '#a8acc8', capaS: '#6e7090', bruma: '#3a3a64', lej: '#2e3058', ciudad: '#24264a', ciudadS: '#1c1e3c',
    arena: '#4e4a6a', arenaS: '#3a3858', arenaL: '#6a627e', arenaD: '#2a2846', roca: '#4a4664', rocaS: '#34324e', rocaL: '#646080',
    huella: '#3a3656', esf: '#d09a5e', esfS: '#8a6656', esfL: '#f0c27a', esfD: '#4a3a4e', sombra: 0.7, noche: true,
    cuerda: '#8a86a0', cuerdaS: '#4a4660', poste: '#3a3650', posteL: '#6a6680',
  },
};

const A_PALC = {};

// la paleta de una hora, ya convertida (y cacheada)
function a_paleta(hora = 'dia') {
  const k = A_PAL[hora] ? hora : 'dia'; if (A_PALC[k]) return A_PALC[k];
  const p = {}; for (const [n, v] of Object.entries(A_PAL[k])) p[n] = typeof v === 'string' ? hex(v) : Array.isArray(v) && typeof v[0] === 'string' ? v.map(hex) : v;
  return (A_PALC[k] = p);
}

// mezcla de dos colores (k = 0: a; k = 1: b)
function a_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// umbral de trama ordenada 4 × 4 (0–1): para pasar de un tono a otro sin bandas
const A_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_umb = (x, y) => (A_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// la esquina de Atom y la barra del año: ahí no se pinta nada que llame la atención
const a_quieta = (x, y) => (x > 272 && y < 50) || (x > 14 && x < 176 && y < 18);

// guarda en un búfer lo que se pinta una vez (clave: encuadre, cámara y hora); transparente: deja a 0 lo no pintado
const A_CAPAS = new Map();

function a_capa(R, clave, dibuja, transparente = false) {
  let b = A_CAPAS.get(clave); if (b && b.R === R) return b.buf;
  const buf = R.nuevo(); if (!transparente) buf.fill(0xff000000); const prev = R.usar(buf); dibuja(); R.usar(prev);
  A_CAPAS.set(clave, { R, buf }); return buf;
}

// pega una capa transparente sobre lo que hay (solo las filas y0–y1; dx: desplazada en x)
function a_pegar(R, L, y0 = 0, y1 = 179, dx = 0, x0 = 0, x1 = 319) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const f = y * 320; for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const sx = x - dx; if (sx < 0 || sx > 319) continue; const c = L[f + sx]; if (c) B[f + x] = c; } }
}

// el cielo tramado de la hora: seis bandas que pasan de una a otra con trama ordenada, el sol con su halo tramado (o la
// luna con su halo y las estrellas de fondo, fijas). Se pinta en el búfer del fondo
function a_cieloFijo(R, hor, P) {
  const B = R.buf, cs = P.cielo, lim = P.cortes.map((f) => Math.round(f * hor)), tr = 3;
  for (let y = 0; y < hor; y++) {
    let i = 0; while (i + 1 < cs.length && y >= lim[i + 1]) i++;
    let a = cs[i], b = -1, p = 0;
    if (i + 1 < cs.length && y >= lim[i + 1] - tr) { b = cs[i + 1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = cs[i - 1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = b >= 0 && a_umb(x, y) < p ? b : a;
  }
  if (P.sol) {   // el sol: el disco, un anillo más claro y el halo tramado que se deshace
    const [sx, sy, sr] = P.sol, R2 = sr + (P.noche ? 0 : sr * 1.9);
    for (let y = Math.max(0, Math.floor(sy - R2)); y <= Math.min(hor - 1, Math.ceil(sy + R2)); y++) for (let x = Math.max(0, Math.floor(sx - R2)); x <= Math.min(319, Math.ceil(sx + R2)); x++) {
      const d = Math.hypot(x - sx, y - sy), i = y * 320 + x; if (a_quieta(x, y) && d > sr) continue;
      if (d <= sr) B[i] = d < sr * 0.6 ? P.solC[0] : d < sr - 1 ? P.solC[1] : P.solC[2];
      else { const q = 1 - (d - sr) / (R2 - sr); if (a_umb(x, y) < q * q * 0.9) B[i] = a_mez(B[i], P.solC[1], 0.45); }
    }
  }
  if (P.luna) {   // la luna en cuarto creciente con su halo, y las estrellas fijas (las que titilan van aparte)
    const [lx, ly, lr] = P.luna, cl = hex('#f4f0d8'), clS = hex('#c8c4b0');
    for (let y = ly - lr - 6; y <= ly + lr + 6; y++) for (let x = lx - lr - 6; x <= lx + lr + 6; x++) {
      const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.25), i = y * 320 + x;
      if (d <= lr && d2 > lr * 0.85) B[i] = d > lr - 1 || (x * 3 + y) % 7 === 0 ? clS : cl;
      else if (d > lr && d < lr + 6 && a_umb(x, y) < (lr + 6 - d) / 12) B[i] = a_mez(B[i], cl, 0.22);
    }
    for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 1, 901) * 319), y = Math.round(h(k, 2, 901) ** 1.3 * (hor - 8)); if (a_quieta(x, y) || Math.hypot(x - lx, y - ly) < 12) continue; B[y * 320 + x] = h(k, 3, 901) < 0.3 ? hex('#8a90c0') : hex('#5a6098'); }
    // la Vía Láctea: un velo tramado en diagonal
    for (let y = 16; y < hor - 10; y++) for (let x = 0; x < 320; x++) { const d = Math.abs((x - 40) * 0.42 - (y - 4) * 1.0 - 30); if (d > 14 || a_quieta(x, y)) continue; const q = (1 - d / 14) * (0.45 + h(x >> 2, y >> 2, 902) * 0.55); if (a_umb(x, y) < q * 0.55) B[y * 320 + x] = a_mez(B[y * 320 + x], hex('#6a6aa8'), 0.35); }
  }
}

// lo que se mueve en el cielo: estrellas que titilan y una fugaz (noche); velos de cirro lentos, cúmulos medianos y
// cercanos de tres tonos a tres velocidades; las nubes no entran en la esquina de Atom ni en la barra del año
function a_cieloVivo(R, t, hor, P, o = {}) {
  const { pset } = R, B = R.buf;
  if (P.noche) {
    for (let k = 0; k < 46; k++) { const x = Math.round(h(k, 4, 903) * 319), y = Math.round(h(k, 5, 903) ** 1.2 * (hor - 10)); if (a_quieta(x, y)) continue; const tw = Math.sin(t * (1.3 + h(k, 6, 903) * 2.4) + k * 1.9);
      if (tw > -0.3) B[y * 320 + x] = tw > 0.5 ? hex('#ffffff') : hex('#c8ccf0'); if (k % 9 === 0 && tw > 0.7) { pset(x - 1, y, hex('#8a90c8')); pset(x + 1, y, hex('#8a90c8')); pset(x, y - 1, hex('#8a90c8')); pset(x, y + 1, hex('#8a90c8')); } }
    const k = Math.floor(t / 6.5), u = (t % 6.5) / 0.6; if (u < 1) { const x0 = 40 + h(k, 1, 904) * 150, y0 = 22 + h(k, 2, 904) * 26; for (let i = 0; i < 10; i++) { const x = Math.round(x0 + u * 54 - i * 1.8), y = Math.round(y0 + u * 18 - i * 0.6); if (!a_quieta(x, y)) pset(x, y, i < 2 ? hex('#ffffff') : hex('#9aa0d8')); } }
  }
  const [cL, cM, cS] = P.nube;
  // cirros: velos finos y lejanos, casi quietos
  for (let k = 0; k < 4; k++) { const w = 40 + Math.round(h(k, 5, 905) * 50), x0 = ((h(k, 6, 905) * 440 + t * (0.6 + k * 0.2)) % 480) - 90, y = Math.round(hor * (0.2 + k * 0.12)) + 4;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || a_quieta(x, y) || h(i >> 2, k, 906) < 0.25) continue; const e = Math.sin(i / w * Math.PI);
      pset(x, y, e > 0.4 ? P.cirro[1] : P.cirro[0]); if (e > 0.6 && i % 3) pset(x + 2, y - 1, P.cirro[0]); if (e > 0.5 && i % 5 === 0) pset(x - 3, y + 1, P.cirro[0]); } }
  // cúmulos (dos tamaños: los medianos más lentos que los cercanos)
  const nubes = o.nubes ?? [[30, 30, 30, 1.4], [150, 40, 22, 1.1], [240, 58, 36, 2.6], [96, 62, 44, 3.2], [330, 28, 26, 1.6]];
  for (const [x0, y, w, v] of nubes) { const x = ((x0 + t * v) % 420) - 50; a_nube(R, x, y, w, cL, cM, cS, h(x0, y, 907)); }
}

// un cúmulo de tres tonos: la sombra abajo, el cuerpo y la luz arriba, con la base plana; se recorta a las zonas libres
function a_nube(R, cx, cy, w, cL, cM, cS, sem) {
  const B = R.buf, n = 3 + Math.round(w / 12), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.16 + 0.15 * Math.cos(u * Math.PI) + 0.06 * h(i, sem, 908)); bolas.push([cx + u * w * 0.86, cy - r * 0.4, r]); }
  const pon = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179 || a_quieta(x, y)) return; B[y * 320 + x] = c; };
  const disco = (x0, y0, r, c, base) => { for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) if (i * i + j * j <= r * r && y0 + j <= base) pon(x0 + i, y0 + j, c); };
  const base = Math.round(cy + w * 0.06);
  for (const [x, y, r] of bolas) disco(x, y + 1, r, cS, base + 1);
  for (const [x, y, r] of bolas) disco(x, y, r * 0.96, cM, base - 1);
  for (const [x, y, r] of bolas) disco(x - 1, y - 2, r * 0.62, cL, base - 3);
}

// una pirámide vista en esquina: el vértice a, la esquina de la base a la izquierda bl, la esquina de delante fr y la de la
// derecha br. La cara izquierda (bl–fr) y la derecha (fr–br) con su luz; hiladas que se cortan, juntas de los bloques,
// piedras gastadas y caídas; o.capa (0–1): parte de arriba que conserva el revestimiento de caliza lisa (Kefrén);
// o.trunca: px de cima plana (Keops) y o.mastil, el mástil que marca la altura que tenía; o.brecha: la brecha de la cara
// (Micerinos); o.bruma 0–1: lo lejos que está; o.izqLuz: la cara izquierda es la del sol (si no, la derecha)
function a_piramide(R, a, bl, fr, br, P, o = {}) {
  const B = R.buf, [ax, ay] = a, alto = fr[1] - ay, paso = o.paso ?? (alto > 50 ? 3 : 2), k = o.k ?? 0, bru = o.bruma ?? 0, top = ay + (o.trunca ?? 0);
  const izqLuz = o.izqLuz ?? true, capaY = o.capa ? ay + Math.round(alto * o.capa) : -1;
  const ex = (p, q, y) => p[0] + (q[0] - p[0]) * (y - p[1]) / (q[1] - p[1]);
  const fb = (c) => (bru > 0 ? a_mez(c, P.bruma, bru) : c);
  const C0 = { L: fb(P.lit), L2: fb(P.lit2), LL: fb(P.litL), S: fb(P.sh), S2: fb(P.sh2), ln: fb(P.ln), lnS: fb(P.lnS), fil: fb(P.fil), cap: fb(P.capa), capS: fb(P.capaS) };
  for (let y = top; y <= fr[1]; y++) {
    if (y < 0 || y > 179) continue;
    const xl = Math.round(y <= bl[1] ? ex(a, bl, y) : ex(bl, fr, y)), xm = Math.round(ex(a, fr, y)), xr = Math.round(y <= br[1] ? ex(a, br, y) : ex(fr, br, y));
    const fila = Math.floor((y - ay) / paso), hil = (y - ay) % paso === paso - 1, u = (y - ay) / alto;
    const capa = y < capaY + Math.round(h(xl >> 1, y, 910 + k) * 2);
    for (let x = Math.max(0, xl); x <= Math.min(319, xr); x++) {
      const izq = x < xm, luz = izq === izqLuz; let c;
      if (capa && y < capaY + 3) {   // el borde roto del revestimiento: dientes irregulares
        const borde = y >= capaY - 1 + Math.round(h(x >> 1, 3, 911 + k) * 4);
        if (borde) { c = luz ? C0.L : C0.S; } else c = luz ? C0.cap : C0.capS;
      } else if (capa) c = luz ? C0.cap : C0.capS;
      else {
        c = luz ? (h(x >> 2, fila, 912 + k) < 0.3 ? C0.L2 : C0.L) : (h(x >> 2, fila, 912 + k) < 0.3 ? C0.S2 : C0.S);
        if (hil && h(x >> 3, fila, 913 + k) > 0.12) c = luz ? C0.ln : C0.lnS;
        else if (!hil && (x + fila * 5) % (paso === 3 ? 7 : 5) === 0 && h(x, fila, 914 + k) < 0.55) c = luz ? C0.ln : C0.lnS;   // la junta de los bloques
        else if (luz && (y - ay) % paso === 0 && h(x >> 1, fila, 915 + k) < 0.45) c = C0.LL;   // la luz en el canto de cada hilada
      }
      if (h(x, y, 916 + k) < 0.035) c = luz ? C0.L2 : C0.S2;   // piedras gastadas
      if (P.noche && !capa) c = a_mez(c, hex('#20203a'), Math.max(0, Math.min(0.85, (1 - u) * 0.95 - 0.1)));   // los focos de abajo: la luz se apaga hacia arriba
      if (x === xm && !capa) c = izqLuz ? C0.LL : C0.S2;   // la arista de delante
      if (x === xl || x === xr) c = C0.fil;
      B[y * 320 + x] = c;
    }
  }
  if (o.brecha) { const [gx, gy, gh] = o.brecha; for (let j = 0; j < gh; j++) for (let i = -1; i <= 1; i++) { const x = gx + i + Math.round(Math.sin(j * 0.7) * 0.6); if (x >= 0 && x < 320) B[(gy + j) * 320 + x] = i === 1 ? C0.fil : C0.S2; } }
  if (o.trunca) { const w = Math.round((o.trunca) * (fr[0] - bl[0]) / alto * 0.5) + 1; R.rect(ax - w, top - 1, ax + w, top - 1, C0.fil); if (o.mastil) { R.rect(ax, top - 6, ax, top - 2, C0.fil); R.pset(ax + 1, top - 6, C0.fil); } }
  R.linea(bl[0], bl[1], fr[0], fr[1], C0.fil); R.linea(fr[0], fr[1], br[0], br[1], C0.fil);
}

// el terreno de la meseta: arena con ondas del viento, piedras sueltas y matas secas, en la franja y0–y1 (fila a fila);
// suelo(x) da la línea de arriba
function a_arena(R, y0, y1, P, k = 0, suelo = null) {
  const B = R.buf;
  for (let x = 0; x < 320; x++) { const yt = suelo ? suelo(x) : y0;
    for (let y = Math.max(0, yt); y <= y1; y++) { const d = y - yt, f = (y - y0) / Math.max(1, y1 - y0);
      let c = d < 1 ? P.arenaL : (a_umb(x, y) < 0.25 + f * 0.25 ? P.arenaS : P.arena);
      const onda = Math.sin(x * 0.11 + y * 0.9 + Math.sin(y * 0.3 + k) * 2.4); if (onda > 0.86) c = P.arenaL; else if (onda < -0.9 && f > 0.2) c = P.arenaS;
      if (h(x, y, 920 + k) < 0.018) c = P.arenaD; else if (h(x, y, 921 + k) < 0.012) c = P.arenaL;
      B[y * 320 + x] = c; } }
  for (let i = 0; i < 70; i++) { const x = Math.round(h(i, 1, 922 + k) * 319), y = Math.round(y0 + 3 + h(i, 2, 922 + k) ** 0.7 * (y1 - y0 - 3)); const s = y > (y0 + y1) / 2 ? 2 : 1;   // piedras
    if (suelo && y < suelo(x) + 2) continue; R.rect(x, y, x + s, y + (s > 1 ? 1 : 0), P.roca); R.pset(x, y, P.rocaL); R.rect(x, y + s, x + s + 1, y + s, P.arenaS); }
}

// un sillar de caliza caído (x, base y, ancho, alto): la cara de delante con la luz arriba, la de encima, aristas gastadas
function a_sillar(R, x, base, w, alto, P, k = 0) {
  const { rect, pset } = R, top = base - alto;
  rect(x, top + 3, x + w, base, P.sh); rect(x + 2, top, x + w + 2, top + 3, P.lit); rect(x, top + 3, x + w, top + 3, P.litL);
  for (let i = 0; i < 18; i++) { const px = x + 1 + Math.round(h(i, 1, 930 + k) * (w - 2)), py = top + 4 + Math.round(h(i, 2, 930 + k) * (alto - 5)); pset(px, py, i % 3 ? P.sh2 : P.lit2); }
  rect(x + Math.round(w * 0.6), top + 5, x + Math.round(w * 0.6), base - 2, P.lnS);
  rect(x - 1, base + 1, x + w + 3, base + 1, P.arenaD); pset(x, top + 3, P.fil); pset(x + w + 2, top, P.fil);
}

// un poste de hierro del cordón de visitas (pie en base)
function a_poste(R, x, base, P, k = 0) { R.rect(x - 1, base - 14, x + 1, base, P.poste); R.rect(x - 1, base - 14, x - 1, base, P.posteL); R.rect(x - 2, base - 15, x + 2, base - 14, P.posteL); R.rect(x - 3, base, x + 3, base + 1, P.poste); }

// la Esfinge de perfil, mirando a la derecha (x: la grupa; b: la base): el cuerpo de león con las capas de roca que
// la erosión ha marcado, el nemes a rayas, la cara gastada sin nariz, el pecho y las patas largas reconstruidas con
// bloques
function a_esfinge(R, x, b, P) {
  const B = R.buf, pon = (px, py, c) => { if (px >= 0 && px < 320 && py >= 0 && py < 180) B[py * 320 + px] = c; };
  // el cuerpo: el lomo, la grupa redonda y la tripa, con bandas de erosión (blandas, más hundidas) que ondulan
  const lomo = (i) => (i < 8 ? b - 6 - Math.round(Math.sqrt(Math.max(0, 64 - (8 - i) ** 2)) * 0.95) : i < 46 ? b - 14 + (i > 20 && i < 34 ? 1 : 0) : b - 14 - Math.round((i - 46) * 0.6));
  for (let i = 0; i <= 56; i++) { const yt = lomo(i);
    for (let y = yt; y <= b; y++) { const d = y - yt, banda = ((y - b + 40 + Math.round(Math.sin((x + i) * 0.35) * 0.8)) % 4);
      let c = d === 0 ? P.esfL : banda === 0 ? P.esfS : banda === 3 && d > 2 ? P.esfD : P.esf;
      if (y > b - 4) c = banda === 0 ? P.esfD : P.esfS;   // la sombra de la tripa
      if (h(x + i, y, 940) < 0.06) c = P.esfD;
      pon(x + i, y, c); }
    pon(x + i, lomo(i) - 1, P.fil); }
  for (let y = b - 13; y <= b; y++) pon(x - 1 + Math.round((b - y) < 6 ? 0 : 1), y, P.fil);
  // la cola enroscada sobre el anca
  for (let i = 0; i < 9; i++) pon(x + 3 + i, b - 3 - Math.round(Math.sin(i / 8 * Math.PI) * 2), P.esfL);
  // la pata de atrás doblada (el muslo)
  for (let j = 0; j < 9; j++) for (let i = 0; i < 10 - j; i++) if (h(i, j, 941) < 0.85) pon(x + 6 + i + j, b - 9 + j, j === 0 ? P.esfL : P.esf);
  for (let i = 0; i < 12; i++) pon(x + 5 + i, b - 9 + Math.round(i * 0.7), P.esfD);
  // las patas de delante: largas, bajas, con bloques de la restauración y los dedos al final
  for (let i = 0; i < 26; i++) for (let y = b - 5; y <= b; y++) { const xx = x + 50 + i; let c = y === b - 5 ? P.esfL : y === b ? P.esfD : (((xx >> 1) + (y >> 1)) % 3 === 0 ? P.esfS : P.esf);
    if (i > 2 && i < 22 && (y === b - 3 || (xx % 5 === 0 && y > b - 5))) c = P.ln;   // las juntas de los bloques nuevos
    if (i > 22) c = (y + i) % 2 ? P.esfS : P.esfL; pon(xx, y, c); }
  for (let y = b - 5; y <= b; y++) pon(x + 76, y, P.fil);
  // el pecho
  for (let j = 0; j < 14; j++) for (let i = 0; i < 9; i++) { const y = b - 6 - j, xx = x + 48 + i - Math.round(j * 0.15); pon(xx, y, i === 8 ? P.esfS : ((y + 40) % 4 === 0 ? P.esfS : P.esf)); }
  // la cabeza: el nemes (tela a rayas que cae por detrás de la oreja), la cara y la cima redondeada
  const hx = x + 52, hy = b - 31;
  for (let j = 0; j < 12; j++) for (let i = -6; i <= 5; i++) { const y = hy + j, xx = hx + i;
    if (j === 0 && Math.abs(i + 0.5) > 4) continue; if (j === 1 && Math.abs(i + 0.5) > 5) continue;
    let c;
    if (i >= 2 && j >= 3) c = (i === 5 && (j === 6 || j === 7)) ? P.esfS : P.esf;   // la cara
    else c = (j % 2 === 0) ? P.esfL : P.esfS;   // las rayas del nemes
    if (i >= 2 && j === 5 && i === 3) c = P.esfD;   // el ojo
    if (i === 5 && j === 8) c = P.esfD;   // donde estaba la nariz, gastado
    if (i === 4 && j === 10) c = P.esfD;   // la boca
    pon(xx, y, c); }
  for (let j = 3; j < 18; j++) for (let i = -7; i <= -3; i++) { const y = hy + j; if (j > 11 && i < -6 + (j - 11)) continue; pon(hx + i, y, (j % 2 === 0) ? P.esfL : P.esfS); }   // la caída del nemes
  pon(hx + 1, hy + 4, P.esfD); pon(hx + 1, hy + 5, P.esfD); pon(hx, hy + 5, P.esfS);   // la oreja
  pon(hx + 2, hy + 2, P.esfL); pon(hx + 3, hy + 1, P.esfL);   // el ureo gastado en la frente
  for (let i = -5; i <= 4; i++) pon(hx + i, hy - 1, P.fil); for (let j = 0; j < 12; j++) pon(hx + 6, hy + j, j > 8 ? P.esfS : P.fil);
  pon(hx + 6, hy + 8, P.esfS); pon(hx + 7, hy + 8, P.esf);   // la nariz que falta deja el perfil chato
  // el contorno: todo píxel de la Esfinge que toca algo que no es ella se marca con el filo oscuro, por fuera
  const es = new Set([P.esf, P.esfS, P.esfL, P.esfD, P.ln]), borde = [];
  for (let y = hy - 1; y <= b; y++) for (let xx = x - 2; xx <= x + 78; xx++) { if (xx < 1 || xx > 318 || y < 1) continue; const c = B[y * 320 + xx]; if (es.has(c)) continue;
    if (es.has(B[y * 320 + xx + 1]) || es.has(B[y * 320 + xx - 1]) || es.has(B[(y + 1) * 320 + xx])) borde.push(y * 320 + xx); }
  for (const i of borde) B[i] = P.fil;
}

// una figurita de fondo (7 px): turista, guía, trabajador. k elige ropa y gorro; anda: mueve las piernas; foto: alza la cámara
function a_figura(R, x, suelo, t, k, dir = 1, anda = true, o = {}) {
  const { pset, rect } = R; x = Math.round(x);
  const ropa = [hex('#d84a4a'), hex('#3a7ac8'), hex('#f0f0f0'), hex('#e8b030'), hex('#4aa060'), hex('#a050a0'), hex('#f08a3a')][k % 7], pant = [hex('#2a2a40'), hex('#4a3a2a'), hex('#e8dcc0'), hex('#3a4a6a')][k % 4];
  const piel = [hex('#e8b48a'), hex('#a8704a'), hex('#c8906a'), hex('#7a4a30')][(k * 3) % 4], pelo = [hex('#2a1a14'), hex('#c89a4a'), hex('#5a3a22'), hex('#e8e0d0')][(k * 5) % 4];
  const p = anda ? Math.floor(t * 6 + k) % 2 : 0;
  pset(x - p, suelo, pant); pset(x + 1 + p, suelo, pant); pset(x, suelo - 1, pant); pset(x + 1, suelo - 1, pant);
  rect(x, suelo - 4, x + 1, suelo - 2, ropa); pset(dir > 0 ? x + 2 : x - 1, suelo - 3 - (o.foto ? 1 : 0), o.foto ? hex('#2a2a2a') : piel);
  pset(x, suelo - 5, piel); pset(x + 1, suelo - 5, piel); pset(dir > 0 ? x : x + 1, suelo - 6, pelo); pset(dir > 0 ? x + 1 : x, suelo - 6, k % 3 === 0 ? hex('#f0e8d0') : pelo);
  if (k % 3 === 0) { pset(x - 1, suelo - 6, hex('#f0e8d0')); pset(x + 2, suelo - 6, hex('#f0e8d0')); }   // un sombrero de ala
  if (o.foto && Math.sin(t * 2.3 + k * 4) > 0.97) { pset(dir > 0 ? x + 3 : x - 2, suelo - 4, hex('#ffffff')); pset(dir > 0 ? x + 3 : x - 2, suelo - 5, hex('#fff8c0')); }   // el flash
}

// un camello de fondo con su jinete (13 px de alto), que anda despacio (dir: hacia dónde mira): la joroba, el cuello
// curvo con la cabeza alta, la manta de colores y las patas largas que se cruzan al andar
const A_CAMELLO = ['............##..', '....###....####.', '...#####...##...', '..#######..#....', '.#########.#....', '#############...', '#############...', '.###########....'];

function a_camello(R, x, suelo, t, dir, P, k = 0, jinete = true) {
  const { pset } = R; x = Math.round(x); const c = hex(['#b8864e', '#a87a4a', '#c89a62'][k % 3]), cS = hex('#6e4a2a'), cL = hex('#e0b47e');
  const X = (i) => x + (i - 7) * dir, p = Math.floor(t * 3 + k) % 2, y0 = suelo - 12;
  A_CAMELLO.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { const arriba = j === 0 || A_CAMELLO[j - 1][i] !== '#'; pset(X(i), y0 + j, arriba ? cL : j === 7 ? cS : (i + j) % 5 === 0 ? cS : c); } });
  for (const [i, fase] of [[2, 0], [4, 1], [9, 1], [11, 0]]) { const off = fase === p ? 1 : 0; for (let j = 8; j < 12; j++) pset(X(i + (j > 9 ? off : 0)), y0 + j, cS); pset(X(i + off) + dir, suelo, cS); }
  pset(X(14), y0 + 1, cS); pset(X(13), y0, cS);   // el morro y el ojo
  for (let i = 3; i <= 8; i++) pset(X(i), y0 + 4, ((i + k) & 1) ? hex('#c83a3a') : hex('#e8c040'));   // la manta de colores
  if (jinete) { const r = hex(['#3a5ab8', '#f0f0f0', '#d84a4a'][k % 3]); for (let j = -5; j <= -1; j++) { pset(X(5), y0 + j + 2, r); pset(X(6), y0 + j + 2, r); } pset(X(5), y0 - 4, hex('#e0aa80')); pset(X(6), y0 - 4, hex('#e0aa80')); pset(X(5), y0 - 5, hex('#f0e8d0')); pset(X(6), y0 - 5, hex('#f0e8d0')); pset(X(7), y0 - 1, r); pset(X(6), y0 + 3, hex('#2a2a40')); }
}

// delante. Tres capas fijas por hora: el fondo (cielo, ciudad, Micerinos), Kefrén sola (para que tiemble con o.vibra) y lo
// de delante (Keops, el terreno, la Esfinge, el templo)
const A_KEF = { a: [150, 30], bl: [86, 112], fr: [170, 117], br: [214, 111] };

function a_meseta(R, t, o) {
  const hora = A_PAL[o.hora] ? o.hora : 'dia', P = a_paleta(hora), hor = 110, vib = o.vibra ?? 0;
  const fondo = a_capa(R, 'mes0' + hora, () => {
    a_cieloFijo(R, hor, P);
    // El Cairo lejos, entre la bruma: bloques bajos, minaretes y antenas (de noche, ventanas encendidas)
    for (let x = 0; x < 320; x++) { const alt = Math.round(3 + h(x >> 3, 1, 950) * 7 + (h(x >> 2, 2, 950) < 0.08 ? 6 : 0)); for (let y = hor - alt; y < hor + 4; y++) { const c = y === hor - alt ? P.ciudad : ((x >> 3) + (y >> 1)) % 4 === 0 ? P.ciudadS : P.ciudad;
      R.buf[y * 320 + x] = P.noche && ((x * 7 + y * 3) % 11 === 0) && h(x, y, 951) < 0.5 ? hex('#e8c070') : a_mez(c, P.bruma, 0.25 + (y - hor + 10) * 0.04); } }
    for (const mx of [44, 128, 236]) { R.rect(mx, hor - 18, mx + 1, hor - 8, P.ciudadS); R.pset(mx, hor - 19, P.ciudadS); R.rect(mx - 1, hor - 14, mx + 2, hor - 14, P.ciudadS); }
    // las dunas lejanas del desierto, con bruma
    for (let x = 0; x < 320; x++) { const yt = Math.round(hor + 1 - 2 * Math.sin(x * 0.04) - Math.sin(x * 0.13)); for (let y = yt; y < 122; y++) R.buf[y * 320 + x] = a_mez(y === yt ? P.arenaL : P.arena, P.bruma, 0.35); }
    // Micerinos (lejos, con la brecha en la cara) y sus tres reinas
    a_piramide(R, [62, 76], [34, 111], [72, 114], [90, 110], P, { bruma: 0.28, k: 3, brecha: [64, 92, 10] });
    for (const [cx, al, kk] of [[14, 9, 4], [24, 8, 5], [33, 7, 6]]) a_piramide(R, [cx, 113 - al], [cx - al, 113], [cx + 2, 114], [cx + al, 112], P, { bruma: 0.3, k: kk, paso: 2 });
  });
  const kef = a_capa(R, 'mesK' + hora, () => a_piramide(R, A_KEF.a, A_KEF.bl, A_KEF.fr, A_KEF.br, P, { capa: 0.22, k: 1, bruma: 0.08 }), true);
  const delante = a_capa(R, 'mesF' + hora, () => {
    // la meseta de roca: el escalón bajo Kefrén (la roca tallada con sus estratos) y el terreno que baja hacia nosotros
    const linea = (x) => Math.round(x < 80 ? 113 + (80 - x) * 0.02 : x < 220 ? 115 + Math.sin(x * 0.2) * 0.6 : 119 + Math.sin(x * 0.1));
    for (let x = 0; x < 320; x++) for (let y = linea(x); y < 124; y++) { const d = y - linea(x); let c = d === 0 ? P.rocaL : (y + Math.round(Math.sin(x * 0.3))) % 3 === 0 ? P.rocaS : P.roca; if (h(x, y, 952) < 0.05) c = P.arenaD; R.buf[y * 320 + x] = c; }
    // Keops, más cerca: cima plana con el mástil; y sus tres reinas delante
    a_piramide(R, [252, 40], [196, 116], [268, 122], [312, 115], P, { trunca: 3, mastil: true, k: 2, bruma: 0.04 });
    for (const [cx, al, kk] of [[262, 13, 7], [282, 12, 8], [302, 11, 9]]) a_piramide(R, [cx, 126 - al], [cx - al, 126], [cx + 3, 128], [cx + al, 125], P, { k: kk, paso: 2 });
    // el terreno medio y la arena de delante, con la pista de los visitantes
    a_arena(R, 122, 179, P, 1, (x) => 123 + Math.round(Math.sin(x * 0.07) * 1.2));
    for (let y = 126; y < 180; y++) { const c0 = Math.round(200 - (y - 126) * 1.2), w = 6 + Math.round((y - 126) * 0.5);   // la pista apisonada
      for (let x = c0 - w; x <= c0 + w; x++) if (x >= 0 && x < 320) R.buf[y * 320 + x] = a_mez(R.buf[y * 320 + x], P.arenaL, a_umb(x, y) < 0.6 ? 0.5 : 0.2); }
    for (let i = 0; i < 26; i++) { const y = 132 + i * 2, x = Math.round(196 - (y - 126) * 1.2 + (i % 2 ? 3 : -2));   // huellas por la pista
      R.pset(x, y, P.huella); R.pset(x + 1, y, P.huella); }
    for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 1, 953) * 300) + 10, y = 150 + Math.round(h(i, 2, 953) * 26); R.pset(x, y, P.huella); R.pset(x + 2, y + 1, P.huella); }
    // el foso de la Esfinge: la pared de roca tallada detrás, en sombra, con sus estratos, y el borde de delante
    for (let x = 88; x < 186; x++) { const yt = 127 + Math.round(Math.sin(x * 0.15) * 0.8); for (let y = yt; y < 140; y++) { const c = y === yt ? P.rocaL : (y + (x >> 4)) % 3 === 0 ? P.rocaS : a_mez(P.roca, P.fil, 0.3); R.buf[y * 320 + x] = h(x, y, 954) < 0.05 ? P.fil : c; } }
    // el templo del valle: muros de sillares enormes, la entrada en sombra
    for (let x = 50; x < 90; x++) for (let y = 124; y < 141; y++) { const fila = (y - 124) >> 2, junta = (y - 124) % 4 === 3 || (x + fila * 7) % 11 === 0; R.buf[y * 320 + x] = junta ? P.lnS : y === 124 ? P.litL : x > 84 ? P.sh : P.lit2; }
    R.rect(50, 123, 89, 123, P.fil); R.rect(62, 130, 67, 140, P.fil); R.rect(63, 131, 66, 140, hex('#2a1e22')); R.rect(74, 131, 77, 140, hex('#2a1e22'));
    a_esfinge(R, 96, 140, P);
    for (let x = 50; x < 188; x++) { R.buf[140 * 320 + x] = P.fil; R.buf[141 * 320 + x] = P.rocaS; R.buf[142 * 320 + x] = P.rocaL; }   // el borde del foso
    // la valla baja de los visitantes delante del foso
    for (let x = 92; x < 192; x += 8) { R.rect(x, 137, x, 143, P.poste); R.pset(x, 137, P.posteL); }
    R.rect(92, 139, 191, 139, P.poste);
  }, true);
  // ── cada fotograma: el fondo, el cielo vivo, Kefrén (que tiembla con o.vibra), lo de delante y la vida
  R.copiar(fondo);
  a_cieloVivo(R, t, hor, P, { nubes: [[30, 34, 30, 1.4], [170, 46, 22, 1.0], [250, 64, 34, 2.4], [110, 60, 40, 3.0], [330, 30, 24, 1.6]] });
  if (P.noche) a_focos(R, t, hor);
  else bandada(R, t, { tipo: 'golondrina', n: 4, y: 58, cada: 13, v: 34 });
  if (!P.noche) { const a = t * 0.4, hx = Math.round(206 + Math.cos(a) * 20), hy = Math.round(58 + Math.sin(a) * 5), b = Math.round(Math.sin(t * 2)); for (let i = -4; i <= 4; i++) R.pset(hx + i, hy - (Math.abs(i) > 2 ? b : 0), hex('#3a2a2a')); R.pset(hx, hy + 1, hex('#3a2a2a')); }   // un milano que planea
  const dx = vib > 0 ? Math.round(Math.sin(t * 47) * vib * 1.4) : 0;
  a_pegar(R, kef, 28, 118, dx, 80, 220);
  a_pegar(R, delante, 36, 179);
  // de noche, la luz de los focos baña la base de las pirámides y la Esfinge en ciclos de color (luz y sonido)
  if (P.noche) a_banoColor(R, t);
  // vida: los camelleros que cruzan a lo lejos, un autobús en la carretera, turistas junto a la valla con sus fotos
  for (let k = 0; k < 3; k++) { const d = k === 1 ? -1 : 1, v = 2.2 + k * 0.6, x = d > 0 ? ((t * v + k * 120) % 380) - 30 : 350 - ((t * v + k * 90) % 380); a_camello(R, x, k === 2 ? 128 : 125 + k, t, d, P, k, true); }
  { const x = Math.round(330 - ((t * 6) % 200)); if (x > 192 && x < 330) a_bus(R, x, 131, P); }   // el autobús llega por la derecha y aparca junto al foso
  for (const [x, k, d, f] of [[78, 0, 1, true], [84, 3, 1, false], [176, 1, -1, true], [182, 4, -1, false], [190, 2, -1, true]]) a_figura(R, x + (f ? 0 : Math.round(Math.sin(t * 0.5 + k) * 3)), 136, t, k, d, !f, { foto: f });
  for (let k = 0; k < 4; k++) { const x = (k < 2 ? 214 : 230) + k * 9 + Math.round(((t * (3 + k)) % 30)) * (k % 2 ? -1 : 1) * 0, y = 131 + (k % 2); a_figura(R, x + Math.round(Math.sin(t * 0.4 + k * 2) * 8), y, t, k + 2, Math.cos(t * 0.4 + k * 2) > 0 ? 1 : -1, true); }   // un grupo con su guía
  // la arena que levanta el viento, a ras de suelo
  for (let k = 0; k < 18; k++) { const x = Math.round(((h(k, 1, 955) * 360 + t * (24 + k)) % 360) - 20), y = 146 + Math.round(h(k, 2, 955) * 30 + Math.sin(t * 3 + k) * 1.5); if (x >= 0 && x < 320) R.pset(x, y, P.arenaL); }
  if (vib > 0) a_vibra(R, t, vib, P);
  return { suelo: 162, horizonte: hor, kefren: { vertice: A_KEF.a, base: [A_KEF.bl, A_KEF.fr, A_KEF.br] }, keops: { vertice: [252, 40], base: [[196, 116], [268, 122], [312, 115]] }, micerinos: { vertice: [62, 76] },
    esfinge: { x0: 96, x1: 172, base: 140, cabeza: [150, 109] }, sol: P.sol ?? null, luna: P.luna ?? null, libre: [[6, 92], [196, 290]] };
}

// el autobús blanco de los visitantes, chiquito y lejos (x: delante, mirando a la izquierda)
function a_bus(R, x, suelo, P) {
  const { rect, pset } = R; rect(x, suelo - 6, x + 15, suelo - 2, hex('#f0eee8')); rect(x, suelo - 6, x + 15, suelo - 6, hex('#ffffff'));
  for (let i = 2; i < 15; i += 3) rect(x + i, suelo - 5, x + i + 1, suelo - 4, P.noche ? hex('#f0d080') : hex('#4a6a8a'));
  rect(x, suelo - 3, x + 15, suelo - 3, hex('#3a7ac8')); pset(x + 3, suelo - 1, hex('#1c1a22')); pset(x + 12, suelo - 1, hex('#1c1a22'));
  if (P.noche) { pset(x - 1, suelo - 3, hex('#fff8c0')); pset(x - 2, suelo - 3, hex('#f8e8a0')); }
}

// de noche: dos haces de los focos que barren el cielo detrás de las pirámides (sin llegar a la barra del año ni a Atom)
function a_focos(R, t, hor) {
  const B = R.buf, c = hex('#a8b0e0');
  for (const [fx, fase, a0, a1] of [[120, 0, -2.2, -1.25], [196, 2.1, -1.9, -0.95]]) {
    const ang = a0 + (a1 - a0) * (0.5 + 0.5 * Math.sin(t * 0.35 + fase));
    for (let r = 4; r < 92; r++) { const w = 1 + r * 0.06, x0 = fx + Math.cos(ang) * r, y0 = hor + Math.sin(ang) * r; if (y0 < 20) break;
      for (let s = -w; s <= w; s++) { const x = Math.round(x0 - Math.sin(ang) * s), y = Math.round(y0 + Math.cos(ang) * s); if (x < 0 || x > 319 || y < 0 || y >= hor || a_quieta(x, y)) continue; const q = (1 - r / 92) * (1 - Math.abs(s) / (w + 1));
        if (a_umb(x, y) < q * 0.9) B[y * 320 + x] = a_mez(B[y * 320 + x], c, 0.3); } } }
}

// de noche, el color de luz y sonido sube y baja por la base de Kefrén y Keops (tramado, solo sobre la piedra)
function a_banoColor(R, t) {
  const B = R.buf, cols = [hex('#e8a040'), hex('#4a8ae0'), hex('#d85a8a'), hex('#e8c060')], u = (t / 4) % 4, i = Math.floor(u), f = u - i, c = a_mez(cols[i], cols[(i + 1) % 4], f);
  for (let y = 70; y < 122; y++) for (let x = 90; x < 316; x++) { const q = (y - 70) / 52; if (a_umb(x, y) > q * 0.55) continue; const p = B[y * 320 + x], s = (p & 255) + ((p >> 8) & 255) + ((p >> 16) & 255); if (s > 260 && y < 116) B[y * 320 + x] = a_mez(p, c, 0.28); }
}

// o.vibra: ondas finas en el aire alrededor de Kefrén y granos de arena que saltan junto a su base
function a_vibra(R, t, v, P) {
  const B = R.buf;
  for (let k = 0; k < 3; k++) { const r = ((t * 30 + k * 22) % 66) + 10;
    for (let a = -Math.PI; a < 0; a += 1 / r) { const x = Math.round(150 + Math.cos(a) * r * 1.5), y = Math.round(78 + Math.sin(a) * r); if (x < 0 || x > 319 || y < 18 || y > 179 || a_quieta(x, y) || ((x + y) & 1)) continue; B[y * 320 + x] = a_mez(B[y * 320 + x], hex('#ffffff'), 0.55 * v * (1 - (r - 10) / 66)); } }
  for (let k = 0; k < 16; k++) { const x = 90 + Math.round(h(k, 1, 956) * 130), salto = Math.abs(Math.sin(t * 9 + k * 1.7)) * 4 * v; R.pset(x, Math.round(117 - salto), P.arenaL); if (salto > 2) R.pset(x + 1, Math.round(118 - salto), P.arena); }
}

// de sillares, el piso gastado) baja en diagonal hacia la derecha hasta el templo del valle y la Esfinge, vista de
// espaldas; a mitad de la calzada, la boca del túnel que lleva al pozo de Osiris (x = A_POZO.x), con su verja
const A_POZO = { x: 206, boca: 93, n1: 115, n2: 143, n3: 159 };

function a_calzada(R, t, o) {
  const hora = A_PAL[o.hora] ? o.hora : 'dia', P = a_paleta(hora), hor = 76;
  const fijo = a_capa(R, 'calz' + hora, () => {
    a_cieloFijo(R, hor, P);
    for (let x = 0; x < 320; x++) { const yt = Math.round(hor - 1 - 2 * Math.sin(x * 0.05) - h(x >> 3, 1, 960) * 2); for (let y = yt; y < 112; y++) R.buf[y * 320 + x] = a_mez(y === yt ? P.arenaL : P.arena, P.bruma, 0.3); }
    // Keops lejos, a la derecha, y Kefrén grande con su remate de caliza
    a_piramide(R, [236, 48], [190, 82], [246, 85], [276, 80], P, { trunca: 2, mastil: true, k: 12, bruma: 0.3 });
    a_piramide(R, [84, 22], [-4, 100], [106, 106], [160, 98], P, { capa: 0.2, k: 11, bruma: 0.05 });
    // la meseta: roca y arena que bajan hacia nosotros
    a_arena(R, 98, 179, P, 3, (x) => 101 + Math.round(Math.sin(x * 0.05) * 1.5 + (x < 110 ? 6 - x * 0.05 : 0)));
    // el templo alto, en ruinas, al pie de Kefrén: muros cortados, sillares sueltos
    for (const [x0, x1, y0] of [[96, 122, 98], [124, 140, 101], [86, 96, 103]]) { for (let x = x0; x <= x1; x++) for (let y = y0; y <= 108; y++) { const fila = (y - y0) >> 2; R.buf[y * 320 + x] = (y - y0) % 4 === 3 || (x + fila * 5) % 9 === 0 ? P.lnS : y === y0 ? P.litL : x > x1 - 3 ? P.sh : P.lit2; } R.rect(x0, y0 - 1, x1, y0 - 1, P.fil); }
    // la calzada: dos muros bajos que bajan en diagonal y el piso entre ellos, más ancho cuanto más cerca
    const eje = (u) => [Math.round(lerp(132, 300, u)), Math.round(lerp(106, 150, u)), lerp(4, 16, u)];
    for (let i = 0; i <= 600; i++) { const u = i / 600, [cx, cy, w] = eje(u), alt = Math.round(lerp(2, 7, u));
      for (let s = -Math.round(w); s <= Math.round(w); s++) { const x = cx + Math.round(s * 0.35), y = cy + Math.round(s * 0.6); if (x < 0 || x > 319 || y > 179) continue;
        const borde = Math.abs(s) >= Math.round(w) - 1, losa = ((Math.round(u * 90) + (s >> 2)) % 5 === 0) || h(Math.round(u * 60), s >> 2, 961) < 0.06;
        for (let j = 0; j <= (borde ? alt : 0); j++) R.buf[(y - j) * 320 + x] = borde ? (j === alt ? P.litL : j === 0 ? P.lnS : (j + Math.round(u * 40)) % 3 === 0 ? P.ln : P.lit2) : losa ? P.arenaD : a_mez(P.lit, P.arena, 0.4); } }
    // el túnel bajo la calzada que lleva al pozo de Osiris: el arco oscuro, la verja de hierro, un foco
    { const X = A_POZO.x, y = 132; R.rect(X - 7, y - 9, X + 7, y + 4, P.fil); R.rect(X - 6, y - 8, X + 6, y + 4, hex('#1a1420')); for (let x = X - 5; x <= X + 5; x += 2) R.rect(x, y - 8, x, y + 4, hex('#5a5a66')); R.rect(X - 6, y - 4, X + 6, y - 4, hex('#5a5a66'));
      R.rect(X - 8, y - 11, X + 8, y - 10, P.litL); R.rect(X - 8, y - 9, X - 7, y + 4, P.lit2); R.rect(X + 7, y - 9, X + 8, y + 4, P.sh); R.rect(X - 2, y + 5, X + 2, y + 5, P.arenaD); }
    // el templo del valle y, a la derecha, la Esfinge de perfil en su foso
    for (let x = 250; x < 320; x++) { const yt = 140; for (let y = yt; y < 166; y++) R.buf[y * 320 + x] = y === yt ? P.rocaL : (y + (x >> 4)) % 3 === 0 ? P.rocaS : a_mez(P.roca, P.fil, 0.3); }
    for (let x = 176; x < 246; x++) for (let y = 150; y < 168; y++) { const fila = (y - 150) >> 2; R.buf[y * 320 + x] = (y - 150) % 4 === 3 || (x + fila * 7) % 12 === 0 ? P.lnS : y === 150 ? P.litL : x > 240 ? P.sh : P.lit2; }
    R.rect(176, 149, 245, 149, P.fil); R.rect(196, 158, 201, 167, hex('#2a1e22')); R.rect(220, 158, 223, 167, hex('#2a1e22'));
    a_esfinge(R, 252, 164, P);
    for (let x = 250; x < 320; x++) { R.buf[165 * 320 + x] = P.fil; R.buf[166 * 320 + x] = P.rocaL; R.buf[167 * 320 + x] = P.rocaS; }
  });
  R.copiar(fijo);
  a_cieloVivo(R, t, hor, P, { nubes: [[180, 26, 26, 1.2], [250, 54, 30, 2.4], [20, 50, 34, 2.8]] });
  // las nubes no pasan por delante de las pirámides: repinta Kefrén y Keops desde el fijo donde el cielo no está
  { const B = R.buf; for (let y = 18; y < hor + 4; y++) for (let x = 0; x < 290; x++) { const i = y * 320 + x, c = fijo[i]; if (!A_CIELO_SET[hora].has(c)) B[i] = c; } }
  if (P.noche) a_focos(R, t, hor);
  else bandada(R, t, { tipo: 'golondrina', n: 3, y: 40, cada: 12, v: 30 });
  // vida: visitantes que suben y bajan por la calzada, un guarda, un camello abajo y polvo
  for (let k = 0; k < 5; k++) { const v = 0.035 + k * 0.006, u = ((t * v + k * 0.21) % 1), sube = k % 2, uu = sube ? 1 - u : u; const x = Math.round(lerp(140, 290, uu)), y = Math.round(lerp(108, 146, uu)) + (k % 3) - 1; a_figura(R, x, y, t, k + 1, sube ? -1 : 1, true, { foto: k === 3 }); }
  a_figura(R, A_POZO.x + 10, 136, t, 5, -1, false);   // el guarda de la verja
  a_camello(R, 30 + ((t * 3) % 120), 128, t, 1, P, 1, true);
  for (let k = 0; k < 12; k++) { const x = Math.round(((h(k, 1, 962) * 360 + t * (18 + k)) % 360) - 20), y = 150 + Math.round(h(k, 2, 962) * 26 + Math.sin(t * 3 + k)); if (x >= 0 && x < 320) R.pset(x, y, P.arenaL); }
  return { suelo: 166, horizonte: hor, kefren: { vertice: [84, 22], base: [[-4, 100], [106, 106], [160, 98]] }, calzada: { arriba: [132, 106], abajo: [300, 150] }, tunel: [A_POZO.x, 132], esfinge: { x0: 252, x1: 320, base: 164, cabeza: [304, 133] }, libre: [[8, 120], [120, 170]] };
}

// los colores del cielo de cada hora (para saber qué es cielo en el búfer fijo)
const A_CIELO_SET = new Proxy({}, { get: (m, k) => m[k] ?? (m[k] = new Set([...a_paleta(k).cielo])) });

// Kefrén que se sale del cuadro por arriba (la pirámide entera mide casi cinco veces lo que baja el pozo); abajo, la roca
// cortada con sus estratos y fósiles: el pozo baja por tres niveles (escalones tallados, escaleras de hierro, bombillas),
// el del medio con nichos y dos sarcófagos de granito, el de abajo con el sarcófago entre cuatro pilares y el agua.
// o.corte 0–1: la tapa de tierra se abre de arriba abajo; o.regla 0–1: la regla de cotas baja hasta «30»
function a_osirisCorte(R, t, o) {
  const hora = A_PAL[o.hora] ? o.hora : 'dia', P = a_paleta(hora), sup = 92, X = A_POZO.x;
  const roca = pal({ r: '#b89a72', rS: '#9a7c58', rL: '#d0b48a', rD: '#6e5640', est: '#a88a64', hueco: '#3a2c2a', huecoS: '#2a2020', huecoL: '#5a443a', gran: '#a0686a', granS: '#6a4048', granL: '#c88a86', agua: '#3a7ab0', aguaL: '#8ac8f0', aguaS: '#24527e', metal: '#5a5a66', metalL: '#9a9aa8', luz: '#ffe8a0', tapa: '#c8a26e', tapaS: '#a8824e' });
  const fijo = a_capa(R, 'osir' + hora, () => {
    const B = R.buf;
    a_cieloFijo(R, sup, P);
    // la falda de Kefrén: hiladas grandes sin revestimiento, que suben y se salen del cuadro
    for (let y = 0; y <= sup; y++) { const xe = Math.round(130 - (sup - y) * 0.75); for (let x = 0; x <= Math.min(319, xe); x++) { const fila = Math.floor((sup - y) / 4), hil = (sup - y) % 4 === 0, junta = (x + fila * 9) % 13 === 0;
      let c = hil ? P.ln : junta ? P.lnS : h(x >> 2, fila, 963) < 0.3 ? P.lit2 : P.lit; if ((sup - y) % 4 === 3 && h(x >> 1, fila, 964) < 0.5) c = P.litL; if (h(x, y, 965) < 0.03) c = P.sh2; if (P.noche) c = a_mez(c, hex('#20203a'), 0.25 + (sup - y) / sup * 0.5); if (x === xe) c = P.fil; B[y * 320 + x] = c; } }
    // el muro de la calzada al fondo, la arena de arriba y la cabeza de la Esfinge lejos, a la derecha
    for (let x = 150; x < 320; x++) for (let y = 84; y < sup; y++) { const fila = (y - 84) >> 2; B[y * 320 + x] = y === 84 ? P.litL : (y - 84) % 4 === 3 || (x + fila * 6) % 10 === 0 ? P.ln : P.lit2; }
    R.rect(150, 83, 319, 83, P.fil);
    a_piramide(R, [296, 62], [272, 84], [300, 85], [316, 83], P, { trunca: 1, k: 30, bruma: 0.3, paso: 2 });   // Keops, lejos
    // la roca cortada: estratos ondulados, fósiles (numulites), grietas; por debajo de 155, mojada por el agua del subsuelo
    for (let y = sup; y < 180; y++) for (let x = 0; x < 320; x++) { const e = (y + Math.round(Math.sin(x * 0.05 + y * 0.1) * 2)) % 9;
      let c = y === sup ? P.arenaL : y < sup + 3 ? P.arena : e === 0 ? roca.rS : e === 5 ? roca.est : roca.r;
      if (y > sup + 3) { if (h(x, y, 966) < 0.025) c = roca.rD; else if (h(x >> 1, y >> 1, 967) < 0.03) c = roca.rL; }
      if (y >= A_POZO.n3 - 4) c = a_mez(c, hex('#4a78a0'), a_umb(x, y) < Math.min(0.85, (y - A_POZO.n3 + 6) / 12) ? 0.38 : 0.16); if (h(x, y, 990) < 0.02) c = roca.aguaL;
      B[y * 320 + x] = c; }
    for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 1, 968) * 316), y = sup + 6 + Math.round(h(k, 2, 968) * 80); R.disco(x, y, 1, roca.rL); R.pset(x, y, roca.rD); }   // numulites
    for (let k = 0; k < 6; k++) { let x = Math.round(h(k, 1, 969) * 300) + 10, y = sup + 4; const L = 10 + Math.round(h(k, 2, 969) * 30); for (let i = 0; i < L; i++) { R.pset(x, y, roca.rD); y++; x += Math.round(h(k, i, 970) * 2 - 0.6); } }   // grietas
    // el nivel freático: una línea de puntos azules de lado a lado
    for (let x = 0; x < 320; x += 3) R.pset(x, A_POZO.n3 - 4, roca.aguaL);
    // los huecos: pozos y salas (hueco oscuro con el canto de luz arriba y la sombra a la izquierda)
    const hueco = (x0, y0, x1, y1) => { R.rect(x0, y0, x1, y1, roca.hueco); R.rect(x0, y0, x0 + 1, y1, roca.huecoS); R.rect(x0, y1, x1, y1, roca.huecoL); R.rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, roca.rD); R.rect(x0 - 1, y0, x0 - 1, y1, roca.rD); R.rect(x1 + 1, y0, x1 + 1, y1, roca.rD); R.rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, roca.rL); };
    hueco(X - 6, sup + 1, X + 6, A_POZO.n1 - 1); hueco(X - 20, 104, X + 30, A_POZO.n1 - 1);   // primer pozo y primer nivel
    for (let s = 0; s < 6; s++) R.rect(X - 6, sup + 2 + s * 2, X - 6 + s * 2 + 1, sup + 2 + s * 2, roca.rS);   // los escalones tallados
    hueco(X + 18, A_POZO.n1, X + 28, 130); hueco(140, 130, 300, A_POZO.n2 - 1);   // segundo pozo y segundo nivel
    for (const nx of [146, 186, 226, 274]) { R.rect(nx, 133, nx + 12, A_POZO.n2 - 2, roca.huecoS); R.rect(nx, 133, nx + 12, 133, roca.rD); }   // los nichos
    hueco(150, A_POZO.n2, 162, 147); hueco(118, 147, 222, A_POZO.n3 - 1);   // tercer pozo y nivel de abajo
    // los sarcófagos de granito (tapa encima, cerrados), en sus nichos del segundo nivel y en el centro del de abajo
    const sarco = (x0, y1, w, alto) => { R.rect(x0, y1 - alto, x0 + w, y1, roca.gran); R.rect(x0, y1 - alto, x0 + w, y1 - alto, roca.granL); R.rect(x0 - 1, y1 - alto - 2, x0 + w + 1, y1 - alto - 1, roca.granL); R.rect(x0 + w - 1, y1 - alto, x0 + w, y1, roca.granS);
      for (let i = 0; i < w * alto / 3; i++) R.pset(x0 + 1 + Math.round(h(i, x0, 971) * (w - 2)), y1 - alto + 1 + Math.round(h(i, 2, 971) * (alto - 2)), i % 2 ? roca.granS : roca.granL); R.rect(x0 - 1, y1 + 1, x0 + w + 1, y1 + 1, roca.rD); };
    sarco(188, A_POZO.n2 - 2, 10, 6); sarco(276, A_POZO.n2 - 2, 10, 6);
    R.rect(152, A_POZO.n3 - 5, 186, A_POZO.n3 - 1, roca.rS); sarco(160, A_POZO.n3 - 6, 18, 6);   // la isla con el sarcófago
    for (const [px, d] of [[136, 0], [146, 1], [194, 1], [204, 0]]) { R.rect(px, 148, px + 4, A_POZO.n3 - 2, d ? roca.rS : roca.r); R.rect(px, 148, px, A_POZO.n3 - 2, roca.rL); R.rect(px + 4, 148, px + 4, A_POZO.n3 - 2, roca.rD); }   // los cuatro pilares
    // las escaleras de hierro del segundo y del tercer pozo
    for (const [lx, y0, y1] of [[X + 20, A_POZO.n1 - 1, 130], [153, A_POZO.n2 - 1, 148]]) { R.rect(lx, y0, lx, y1, roca.metal); R.rect(lx + 6, y0, lx + 6, y1, roca.metal); for (let y = y0 + 1; y < y1; y += 3) R.rect(lx, y, lx + 6, y, roca.metalL); }
    // los cables de las bombillas que bajan por el pozo
    R.linea(X + 4, sup + 1, X + 4, 105, roca.huecoL); R.linea(X + 4, 105, X + 26, 116, roca.huecoL); R.linea(X + 26, 116, X + 26, 131, roca.huecoL); R.linea(X + 26, 131, 160, 131, roca.huecoL); R.linea(160, 131, 160, 148, roca.huecoL);
  });
  R.copiar(fijo);
  a_cieloVivo(R, t, sup - 10, P, { nubes: [[150, 22, 24, 1.2], [230, 52, 30, 2.2], [330, 64, 22, 2.8]] });
  { const B = R.buf; for (let y = 0; y < sup; y++) { const xe = Math.min(319, Math.round(130 - (sup - y) * 0.75)); for (let x = 0; x <= xe; x++) B[y * 320 + x] = fijo[y * 320 + x]; } for (let y = 64; y < sup; y++) for (let x = 140; x < 320; x++) { const c = fijo[y * 320 + x]; if (!A_CIELO_SET[hora].has(c)) B[y * 320 + x] = c; } }
  if (!P.noche) bandada(R, t, { tipo: 'golondrina', n: 3, y: 44, cada: 12, v: 30 });
  // la vida de dentro: las bombillas que tiemblan con su halo, el agua que se mueve y las gotas que caen
  const B = R.buf;
  for (const [bx, by] of [[X + 4, 106], [X + 26, 133], [196, 133], [160, 150], [250, 133]]) { const f = 0.75 + 0.25 * Math.sin(t * 13 + bx) * Math.sin(t * 7.3 + by);
    for (let j = -6; j <= 8; j++) for (let i = -9; i <= 9; i++) { const x = bx + i, y = by + j, d = Math.hypot(i, j * 1.3); if (d > 9 || x < 0 || y >= 180) continue; const p = B[y * 320 + x]; if (p === roca.hueco || p === roca.huecoS) { if (a_umb(x, y) < (1 - d / 9) * f) B[y * 320 + x] = a_mez(p, roca.luz, 0.22); } }
    R.pset(bx, by, roca.luz); R.pset(bx, by - 1, roca.metal); }
  for (let x = 120; x <= 220; x++) { if (x >= 152 && x <= 186) continue; for (let y = A_POZO.n3 - 3; y < A_POZO.n3; y++) { const w = Math.sin(x * 0.5 - t * 3 + y) + Math.sin(x * 0.17 + t * 1.3); B[y * 320 + x] = y === A_POZO.n3 - 3 ? (w > 1 ? roca.aguaL : roca.agua) : w > 1.3 ? roca.agua : roca.aguaS; } }
  { const k = Math.floor(t / 1.7), u = (t % 1.7) / 1.7, gx = 126 + Math.round(h(k, 1, 972) * 20) + (k % 2 ? 66 : 0); if (u < 0.6) R.pset(gx, Math.round(148 + u / 0.6 * 8), roca.aguaL); else { const r = Math.round((u - 0.6) * 10); R.pset(gx - r, A_POZO.n3 - 3, roca.aguaL); R.pset(gx + r, A_POZO.n3 - 3, roca.aguaL); } }
  // o.corte: la tapa de tierra sin cortar cubre lo que aún no se ha abierto (de arriba abajo, con un borde roto)
  const corte = o.corte ?? 1;
  if (corte < 1) { const yc = sup + 1 + Math.round(corte * (179 - sup));
    for (let x = 100; x < 320; x++) { const yb = yc + Math.round(h(x >> 2, 1, 973) * 4 - 2); for (let y = Math.max(sup + 1, yb); y < 180; y++) { const c = y === yb ? roca.rL : ((x + y * 2) % 7 === 0 || h(x, y, 974) < 0.04) ? roca.tapaS : roca.tapa; B[y * 320 + x] = c; } } }
  // o.regla: la regla de cotas al lado del pozo: el tope arriba, las marcas cada tres metros, «0» y «30»
  const regla = o.regla ?? 0;
  if (regla > 0) { const rx = 306, y0 = sup + 1, y1 = Math.round(y0 + (A_POZO.n3 - y0) * Math.min(1, regla)), blanco = hex('#fff8e8'), rojo = hex('#e84a3a');
    R.rect(rx - 1, y0, rx + 1, y1, C.k); R.rect(rx, y0, rx, y1, blanco); R.rect(rx - 4, y0, rx + 4, y0, blanco);
    for (let k = 0; k <= 10; k++) { const y = Math.round(y0 + k * (A_POZO.n3 - y0) / 10); if (y > y1) break; R.rect(rx - (k % 5 ? 2 : 4), y, rx, y, k % 5 ? blanco : rojo); }
    if (regla >= 1) { R.rect(rx - 4, A_POZO.n3, rx + 4, A_POZO.n3, blanco); R.rect(283, A_POZO.n3 + 3, 302, A_POZO.n3 + 13, C.k); R.rect(284, A_POZO.n3 + 4, 301, A_POZO.n3 + 12, hex('#2a2030')); R.numero('30', 285, A_POZO.n3 + 12, { tam: 8 }); R.linea(rx, A_POZO.n3, 296, A_POZO.n3 + 3, blanco); } }
  return { suelo: sup, superficie: sup, boca: [X - 6, X + 6, sup], niveles: { n1: [X - 20, 104, X + 30, A_POZO.n1], n2: [140, 130, 300, A_POZO.n2], n3: [118, 147, 222, A_POZO.n3] }, pozos: [[X, sup, A_POZO.n1], [X + 23, A_POZO.n1, 130], [156, A_POZO.n2, 147]],
    sarcofagos: [[193, A_POZO.n2 - 2], [281, A_POZO.n2 - 2], [169, A_POZO.n3 - 6]], regla: [306, sup + 1, A_POZO.n3], libre: [[214, 300]], kefren: { arista: [[130, sup], [7, 0]] } };
}

// humedad que brillan; la boca del pozo arriba a la izquierda con la luz que baja y la escalera de hierro; la pasarela
// de rejilla a la izquierda (donde se pone el elenco); en el centro, el sarcófago de granito cerrado sobre su isla,
// rodeado de agua, entre cuatro pilares (uno roto). Las bombillas tiemblan, el agua se mueve, caen gotas
function a_osirisFondo(R, t, o) {
  const P = a_paleta('dia'), c = pal({ r: '#7a6450', rS: '#5e4a3c', rL: '#9a8266', rD: '#3e3028', hum: '#4a4a52', humL: '#8a9aa8', gran: '#9a6064', granS: '#5e3a40', granL: '#c48a88', granD: '#3a2228', agua: '#2a5a86', aguaS: '#1a3a5e', aguaL: '#7ab8e0', aguaB: '#c8ecff', metal: '#4a4a56', metalL: '#9a9aa8', rej: '#2a2a32', luz: '#ffe8a0', techo: '#4e3e32' });
  const fijo = a_capa(R, 'osfondo', () => {
    const B = R.buf;
    // la pared y el techo de roca: bloques de corte, marcas de cincel en diagonal, estratos y manchas de humedad
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const e = (y + Math.round(Math.sin(x * 0.04) * 3)) % 11;
      let k = y < 22 ? c.techo : e === 0 ? c.rS : c.r; if (((x + y * 2) % 9 === 0) && y > 22 && h(x >> 3, y >> 3, 975) < 0.6) k = c.rS; if (((x - y * 2) % 13 === 0) && h(x >> 3, y >> 2, 976) < 0.4) k = c.rL;
      if (h(x, y, 977) < 0.03) k = c.rD; if (y === 22) k = c.rD; if (y === 23) k = c.rL;
      const hum = Math.sin(x * 0.09) * 0.5 + h(x >> 2, 1, 978); if (hum > 1.05 && y > 30 && y < 140) k = a_mez(k, c.hum, 0.45);
      B[y * 320 + x] = k; }
    // la boca del pozo en el techo, arriba a la izquierda, y la escalera de hierro que baja hasta la pasarela
    R.rect(34, 0, 66, 21, c.rD); R.rect(36, 0, 64, 21, hex('#1c1418')); R.rect(36, 21, 64, 22, c.rL);
    for (const lx of [44, 56]) R.rect(lx, 0, lx + 1, 160, c.metal); for (let y = 4; y < 160; y += 7) { R.rect(44, y, 57, y, c.metalL); R.rect(44, y + 1, 57, y + 1, c.metal); }
    // los pilares: dos al fondo (más oscuros y pequeños) y dos delante, uno roto por la mitad
    const pilar = (x0, y0, y1, w, osc) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x0 + w; x++) { let k = x === x0 ? c.rL : x >= x0 + w - 2 ? c.rD : (y + x * 3) % 7 === 0 ? c.rS : c.r; if (osc) k = a_mez(k, c.rD, 0.35); B[y * 320 + x] = k; } };
    pilar(118, 34, 140, 10, true); pilar(214, 34, 140, 10, true); pilar(92, 22, 170, 16, false);
    pilar(250, 96, 170, 16, false); for (let i = 0; i < 17; i++) R.rect(250 + i, 92 + Math.round(h(i, 1, 979) * 5), 250 + i, 96, c.rL);   // el pilar roto, con su corte irregular
    for (let i = 0; i < 17; i++) R.rect(250 + i, 22, 250 + i, 30 + Math.round(h(i, 2, 979) * 5), c.rS);   // el muñón que cuelga del techo
    // la isla de roca y el sarcófago de granito, cerrado, con su tapa un poco movida
    R.rect(120, 140, 210, 152, c.rS); R.rect(120, 140, 210, 141, c.rL); R.rect(120, 150, 210, 152, c.rD);
    for (let y = 114; y <= 140; y++) for (let x = 132; x <= 198; x++) { let k = x > 190 ? c.granS : c.gran; if (h(x, y, 980) < 0.07) k = c.granD; else if (h(x, y, 981) < 0.05) k = c.granL; if ((y - 114) % 9 === 8) k = c.granS; if (y === 114) k = c.granL; B[y * 320 + x] = k; }
    for (let y = 106; y <= 113; y++) for (let x = 128; x <= 202; x++) { let k = y === 106 ? c.granL : y === 113 ? c.granD : x > 194 ? c.granS : c.gran; if (h(x, y, 982) < 0.06) k = c.granD; B[y * 320 + x] = k; }
    R.rect(132, 141, 198, 141, c.granD); R.rect(132, 114, 132, 140, c.granL);
    // la pasarela de rejilla a la izquierda (el suelo del elenco: y 160)
    R.rect(0, 160, 118, 166, c.metal); R.rect(0, 160, 118, 160, c.metalL); for (let x = 0; x <= 118; x += 3) R.rect(x, 161, x, 165, c.rej); R.rect(0, 167, 118, 168, c.rej);
    for (const px of [10, 60, 110]) R.rect(px, 168, px + 2, 179, c.metal);
    // los focos de obra en la pared con su cable
    R.linea(70, 30, 300, 30, c.rD); for (const fx of [150, 230, 290]) { R.linea(fx, 30, fx, 36, c.rD); R.rect(fx - 2, 36, fx + 2, 39, c.metal); }
  });
  R.copiar(fijo);
  const B = R.buf;
  // la luz que baja por el pozo: un haz tramado con motas de polvo
  for (let y = 22; y < 160; y++) { const x0 = Math.round(36 - (y - 22) * 0.12), x1 = Math.round(64 + (y - 22) * 0.18); for (let x = x0; x <= x1; x++) { const q = 0.35 * (1 - (y - 22) / 150); if (a_umb(x, y) < q) B[y * 320 + x] = a_mez(B[y * 320 + x], c.luz, 0.3); } }
  for (let k = 0; k < 14; k++) { const x = Math.round(40 + h(k, 1, 983) * 26 + Math.sin(t * 0.8 + k) * 3), y = Math.round(30 + ((h(k, 2, 983) * 120 + t * (3 + k % 3)) % 128)); R.pset(x, y, c.luz); }
  // las bombillas con su halo que tiembla
  for (const fx of [150, 230, 290]) { const f = 0.8 + 0.2 * Math.sin(t * 11 + fx) * Math.sin(t * 6.1 + fx); for (let j = 0; j < 30; j++) for (let i = -16; i <= 16; i++) { const x = fx + i, y = 40 + j, d = Math.hypot(i, j * 0.8); if (d > 16 || a_quieta(x, y)) continue; if (a_umb(x, y) < (1 - d / 16) * 0.6 * f) B[y * 320 + x] = a_mez(B[y * 320 + x], c.luz, 0.25); } R.rect(fx - 1, 40, fx + 1, 41, c.luz); }
  // el agua alrededor de la isla: ondas, los reflejos del sarcófago y de las luces, y las gotas que caen y hacen anillos
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { if (x < 119 && y >= 160) continue; if (x >= 120 && x <= 210 && y <= 152) continue; if (x >= 92 && x <= 108 && y <= 170) continue; if (x >= 250 && x <= 266 && y <= 170) continue;
    const w = Math.sin(x * 0.3 - t * 2.2 + y * 0.7) + Math.sin(x * 0.11 + t * 1.1 - y * 0.4), d = y - 150; let k = d < 3 ? c.aguaS : c.agua;
    if (w > 1.25) k = c.aguaL; else if (w < -1.3) k = c.aguaS;
    if (x > 128 && x < 202 && d >= 3 && d < 14 && (y + Math.round(Math.sin(t * 2 + x * 0.2))) % 3 === 0) k = a_mez(k, c.gran, 0.5);   // el reflejo del sarcófago
    if (Math.abs(x - 50) < 10 && w > 0.6 && y > 166) k = c.aguaB;
    B[y * 320 + x] = k; }
  for (let g = 0; g < 3; g++) { const per = 2.3 + g * 0.7, u = ((t + g * 1.1) % per) / per, gx = [140, 224, 290][g]; if (u < 0.45) { const y = Math.round(24 + u / 0.45 * (168 - 24)); R.pset(gx, y, c.aguaB); R.pset(gx, y - 1, c.aguaL); } else { const r = (u - 0.45) * 22; for (let a = 0; a < 6.28; a += 0.35) { const x = Math.round(gx + Math.cos(a) * r), y = Math.round(170 + Math.sin(a) * r * 0.3); if (y > 152 && y < 180 && x >= 0 && x < 320) R.pset(x, y, c.aguaB); } } }
  return { suelo: 160, pasarela: [0, 118, 160], escalera: [44, 57, 0, 160], boca: [36, 64, 0, 22], sarcofago: [128, 106, 202, 141], isla: [120, 140, 210, 152], agua: [0, 150, 320, 180], libre: [[6, 40], [66, 112]] };
}

// puerta falsa) separadas por calles de arena que se alejan; delante, la arena con las rodadas del georradar, la
// cuadrícula de cuerdas y estacas, una estación GPS en trípode, cajas de equipo y la mesa plegable con la sombrilla y la
// pantalla del georradar, que pinta la forma en L (o.ele 0–1)
function a_cementerio(R, t, o) {
  const hora = A_PAL[o.hora] ? o.hora : 'dia', P = a_paleta(hora), hor = 84;
  const fijo = a_capa(R, 'cem' + hora, () => {
    a_cieloFijo(R, hor, P);
    for (let x = 0; x < 320; x++) { const yt = Math.round(hor - 2 * Math.sin(x * 0.05) - 1); for (let y = yt; y < 104; y++) R.buf[y * 320 + x] = a_mez(y === yt ? P.arenaL : P.arena, P.bruma, 0.3); }
    a_piramide(R, [96, 24], [-24, 92], [124, 98], [196, 90], P, { trunca: 3, mastil: true, k: 21, bruma: 0.06, izqLuz: true });
    a_arena(R, 96, 179, P, 5, (x) => 97 + Math.round(Math.sin(x * 0.06)));
    // las mastabas en tres filas que se alejan (las de atrás más pequeñas y con bruma)
    const mastaba = (x, base, w, alto, bru) => { const B = R.buf, f = (k) => (bru ? a_mez(k, P.bruma, bru) : k), inc = Math.max(1, Math.round(alto / 4));
      for (let y = base - alto; y <= base; y++) { const d = Math.round((y - base + alto) / alto * inc); for (let xx = x - d; xx <= x + w + d; xx++) { if (xx < 0 || xx > 319) continue; const fila = (base - y) >> 1;
        let k = y === base - alto ? f(P.litL) : xx > x + w - 2 + d ? f(P.sh) : (base - y) % 3 === 0 ? f(P.ln) : (xx + fila * 4) % 7 === 0 ? f(P.lnS) : f(P.lit2); if (h(xx, y, 984) < 0.05) k = f(P.sh2); B[y * 320 + xx] = k; } }
      R.rect(x + Math.round(w * 0.3), base - Math.round(alto * 0.7), x + Math.round(w * 0.3) + 2, base, f(P.fil)); R.rect(x + Math.round(w * 0.3) + 1, base - Math.round(alto * 0.6), x + Math.round(w * 0.3) + 1, base, f(hex('#4a3428')));   // la puerta falsa
      R.rect(x - inc - 1, base + 1, x + w + inc + 1, base + 1, f(P.arenaD)); };
    for (let k = 0; k < 7; k++) mastaba(150 + k * 24, 100, 16, 6, 0.3);
    for (let k = 0; k < 5; k++) mastaba(132 + k * 38, 112, 26, 9, 0.15);
    for (let k = 0; k < 3; k++) mastaba(110 + k * 70, 126, 44, 12, 0);
    // las rodadas del carrito y la cuadrícula de cuerdas en la arena
    for (let x = 0; x < 320; x++) { for (const y of [150, 156]) R.pset(x, y + Math.round(Math.sin(x * 0.02)), P.arenaD); }
    for (let k = 0; k < 6; k++) R.linea(20 + k * 56, 179, 120 + k * 36, 132, P.cuerda);
    // la estación GPS en su trípode y las cajas de equipo
    R.linea(206, 150, 200, 162, P.poste); R.linea(206, 150, 212, 162, P.poste); R.linea(206, 150, 206, 162, P.poste); R.rect(204, 142, 208, 149, hex('#f0e8d0')); R.rect(205, 140, 207, 141, hex('#e8503a'));
    for (const [bx, bw, col] of [[16, 18, '#3a4a5a'], [36, 12, '#e8a030']]) { R.rect(bx, 154, bx + bw, 162, hex(col)); R.rect(bx, 154, bx + bw, 154, a_mez(hex(col), hex('#ffffff'), 0.4)); R.rect(bx + 2, 157, bx + bw - 2, 157, hex('#1c1a22')); R.rect(bx, 162, bx + bw, 162, hex('#1c1a22')); }
    // la mesa plegable (la tapa a y 150: 12 px sobre el suelo) y la sombrilla
    R.rect(244, 149, 304, 151, hex('#d8d4cc')); R.rect(244, 149, 304, 149, hex('#f4f2ec')); R.rect(244, 152, 304, 152, hex('#8a8680'));
    for (const lx of [248, 300]) R.linea(lx, 152, lx + (lx < 270 ? -3 : 3), 162, hex('#6a6a72'));
    R.rect(275, 92, 276, 149, hex('#8a8a92'));
  });
  R.copiar(fijo);
  a_cieloVivo(R, t, hor - 8, P, { nubes: [[200, 28, 26, 1.2], [250, 60, 30, 2.4], [40, 62, 36, 2.8]] });
  { const B = R.buf; for (let y = 18; y < hor; y++) for (let x = 0; x < 200; x++) { const i = y * 320 + x, c = fijo[i]; if (!A_CIELO_SET[hora].has(c)) B[i] = c; } }
  bandada(R, t, { tipo: 'golondrina', n: 3, y: 50, cada: 12, v: 30 });
  // la sombrilla, que se mece con el viento, y su sombra
  { const m = Math.round(Math.sin(t * 1.3) * 1); for (let i = -34; i <= 34; i++) { const y = Math.round(92 + Math.abs(i) * 0.22) + (Math.abs(i) > 26 ? m : 0); for (let j = 0; j < 4; j++) R.pset(275 + i, y + j - 2, (((i + 40) >> 3) & 1) ? hex('#e8503a') : hex('#f4ece0')); R.pset(275 + i, y + 2, hex('#8a3a2a')); }
    for (let x = 246; x < 304; x++) for (let y = 153; y < 166; y++) if (((x + y) & 1) === 0) R.buf[y * 320 + x] = a_mez(R.buf[y * 320 + x], C.k, 0.2); }
  // la pantalla del georradar sobre la mesa
  a_monitor(R, t, 252, 126, 296, 149, o.ele ?? 0, true);
  R.rect(286, 145, 296, 148, hex('#3a3a44')); R.rect(255, 147, 272, 148, hex('#2a6ab8'));   // una botella y un cuaderno
  // vida: trabajadores a lo lejos con una carretilla, las banderitas de las estacas, polvo
  for (let k = 0; k < 3; k++) { const u = ((t * 0.04 + k * 0.33) % 1), x = Math.round(lerp(146, 300, k === 1 ? 1 - u : u)), y = [106, 119, 134][k]; a_figura(R, x, y, t, k + 4, k === 1 ? -1 : 1, true); if (k === 2) { R.rect(x + 3, y - 3, x + 7, y - 1, hex('#5a5a66')); R.pset(x + 6, y, hex('#1c1a22')); } }
  for (const [fx, fy] of [[120, 132], [156, 132], [192, 132]]) { R.rect(fx, fy - 6, fx, fy, hex('#8a6a44')); const ond = Math.floor(t * 5 + fx) % 2; R.rect(fx + 1, fy - 6 + ond, fx + 3, fy - 5 + ond, hex('#ff7a2a')); }
  for (let k = 0; k < 10; k++) { const x = Math.round(((h(k, 1, 985) * 360 + t * (16 + k)) % 360) - 20), y = 140 + Math.round(h(k, 2, 985) * 34); if (x >= 0 && x < 320) R.pset(x, y, P.arenaL); }
  return { suelo: 162, horizonte: hor, keops: { vertice: [96, 24] }, mesa: [244, 304, 149], pantalla: [254, 128, 294, 146], gps: [206, 140], cajas: [[16, 34], [36, 48]], libre: [[54, 196], [212, 240]] };
}

// la pantalla del georradar (marco x0–x1, y0–y1): el radargrama con las capas del suelo, hipérbolas, la L clara a unos dos
// metros y, más abajo, una mancha con «?»; ele 0–1 la va descubriendo el barrido. Todo lo de dentro, recortado al cristal
function a_monitor(R, t, x0, y0, x1, y1, ele, pequeno = false) {
  const { rect } = R, s = (y1 - y0) / 104, sx = (x1 - x0) / 222, B = R.buf;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, hex('#3a3e48')); rect(x0, y0, x1, y0, hex('#6a6e7a'));
  const cx0 = x0 + Math.max(2, Math.round(6 * sx)), cy0 = y0 + Math.max(2, Math.round(6 * s)), cx1 = x1 - Math.max(2, Math.round(6 * sx)), cy1 = y1 - Math.max(3, Math.round(14 * s));
  const barr = cx0 + Math.round((cx1 - cx0) * Math.min(1, ele));
  const L = { x0: cx0 + (cx1 - cx0) * 0.28, x1: cx0 + (cx1 - cx0) * 0.6, y: cy0 + (cy1 - cy0) * 0.26, alto: (cy1 - cy0) * 0.26, g: Math.max(1, (cy1 - cy0) * 0.06) };
  const M = { x: cx0 + (cx1 - cx0) * 0.72, y: cy0 + (cy1 - cy0) * 0.74, r: (cy1 - cy0) * 0.09 };
  for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) { const v = (y - cy0) / (cy1 - cy0);
    if (x > barr) { B[y * 320 + x] = (y & 1) ? hex('#141820') : hex('#1a1e28'); continue; }
    const capa = Math.sin(v * 44 + Math.sin(x * 0.045) * 0.9 + (x - cx0) * 0.006) + (h(x >> 1, y, 988) - 0.5) * 0.5;
    let k = capa > 0.5 ? hex('#c8b898') : capa > -0.2 ? hex('#7a6e5e') : hex('#3a342e'); if (v > 0.55) k = a_mez(k, hex('#1c1a18'), (v - 0.55) * 1.4);
    for (const [hx, hy] of [[0.15, 0.4], [0.84, 0.32], [0.45, 0.62]]) { const dx = (x - cx0) / (cx1 - cx0) - hx; if (Math.abs(dx) > 0.06) continue; const d = v - hy - (Math.sqrt(dx * dx * 25 + 0.0009) - 0.03); if (Math.abs(d) < 0.011) k = hex('#e8dcc0'); }
    if (y === cy0 + 1) k = hex('#f0e8d8');
    const enL = (x >= L.x0 && x <= L.x1 && Math.abs(y - L.y) <= L.g) || (x >= L.x0 && x <= L.x0 + L.g * 2 && y >= L.y && y <= L.y + L.alto);
    if (enL) k = (x + y) & 1 ? hex('#ffe070') : hex('#fff4c0');
    const dm = Math.hypot(x - M.x, (y - M.y) * 1.3); if (dm < M.r) k = a_mez(k, hex('#f0a040'), 0.75 * (1 - dm / M.r) + 0.25);
    B[y * 320 + x] = k; }
  if (ele > 0 && ele < 1) R.linea(barr, cy0, barr, cy1, hex('#5af0a0'));
  else if (ele >= 1) { const cx = cx0 + Math.round(((t * 24) % (cx1 - cx0))); for (let y = cy0; y <= cy1; y += 2) B[y * 320 + cx] = a_mez(B[y * 320 + cx], hex('#5af0a0'), 0.7); }   // el cursor que repasa la lectura
  if (ele >= 1) { const pl = 0.25 + 0.25 * Math.sin(t * 4); for (let y = Math.round(L.y - L.g - 1); y <= Math.round(L.y + L.alto + 1); y++) for (let x = Math.round(L.x0 - 1); x <= Math.round(L.x1 + 1); x++) { if (x < cx0 || x > cx1 || y < cy0 || y > cy1) continue; const enL = (Math.abs(y - L.y) <= L.g + 1 && x <= L.x1 + 1) || (x <= L.x0 + L.g * 2 + 1 && y >= L.y); if (enL && ((x + y) & 1)) B[y * 320 + x] = a_mez(B[y * 320 + x], hex('#ffffff'), pl); } }   // la L late
  if (!pequeno) {   // el reflejo del sol en el cristal, los tornillos del marco y los botones de goma
    for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) { const d = (x - cx0) - (y - cy0) * 0.8 - 40; if (d > 0 && d < 10 && ((x + y) & 1) === 0) B[y * 320 + x] = a_mez(B[y * 320 + x], hex('#ffffff'), 0.18); }
    for (const [tx, ty] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) { R.pset(tx, ty, hex('#9a9ea8')); R.pset(tx + 1, ty + 1, hex('#1c1e24')); }
    for (let k = 0; k < 4; k++) { const bx = x1 - 60 + k * 12; rect(bx, y1 - 6, bx + 7, y1 - 3, hex('#22242c')); rect(bx, y1 - 6, bx + 7, y1 - 6, hex('#5a5e6a')); }
    R.disco(x0 + 14, y1 - 5, 2, hex('#22242c')); R.pset(x0 + 14, y1 - 5, Math.floor(t * 1.5) % 2 ? hex('#5af0a0') : hex('#2a6a4a'));
  }
  // las cotas de profundidad (solo números) y la barra de estado (pila, señal)
  if (!pequeno) { for (let m = 0; m <= 4; m++) { const y = Math.round(cy0 + (cy1 - cy0) * (m / 4) * 0.94) + 3; R.rect(cx0, y - 3, cx0 + 3, y - 3, hex('#f0f0f0')); a_cifras(R, String(m), cx0 + 5, y - 5, hex('#f0f0f0')); }
    if (ele >= 0.85) { R.icono('?', Math.round(M.x + M.r + 4), Math.round(M.y - 6), hex('#ffe070'), C.k, 2); R.linea(Math.round(L.x1 + 3), Math.round(L.y - 6), Math.round(L.x1 + 12), Math.round(L.y - 14), hex('#ffe070')); } }
  rect(cx0, cy1 + 2, cx0 + Math.round((cx1 - cx0) * 0.3), cy1 + 3, hex('#5af0a0')); rect(cx1 - 8, cy1 + 2, cx1, cy1 + 3, Math.floor(t * 2) % 2 ? hex('#e8503a') : hex('#5a2a2a'));
  return { L, M, cristal: [cx0, cy0, cx1, cy1] };
}

// sombrilla (cuaderno con un croquis, lápiz, botella, móvil, arena); detrás, borrosas, las mastabas y el cielo
function a_radarPantalla(R, t, o) {
  const P = a_paleta(o.hora);
  const fijo = a_capa(R, 'radarP' + (o.hora ?? 'dia'), () => {
    const B = R.buf;
    a_cieloFijo(R, 70, P);
    for (let y = 60; y < 150; y++) for (let x = 0; x < 320; x++) { const m = y < 96 && ((x >> 4) % 3 !== 0) && y > 74 + ((x >> 4) % 2) * 4; B[y * 320 + x] = m ? a_mez(P.lit2, P.bruma, 0.35) : a_mez(y < 100 ? P.arena : P.arenaS, P.bruma, y < 100 ? 0.3 : 0.1); }
    // el envés de la sombrilla arriba (tela a franjas, en sombra), sin pasar por la esquina de Atom
    for (let y = 0; y < 16; y++) for (let x = 0; x < 272; x++) { const k = (((x + y * 2) >> 4) & 1) ? hex('#a8402e') : hex('#c8b8a8'); B[y * 320 + x] = y > 13 - Math.round(Math.abs(x - 136) * 0.03) ? hex('#5a2a22') : a_mez(k, C.k, 0.35); }
    // la mesa: tablero claro con su veta y la sombra de la sombrilla
    for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { let k = (y + Math.round(Math.sin(x * 0.05) * 2)) % 7 === 0 ? hex('#bcb4a6') : hex('#d8d0c2'); if (y === 146) k = hex('#f4efe6'); if (h(x, y, 986) < 0.02) k = hex('#c8a46a'); B[y * 320 + x] = k; }
    // el cuaderno con el croquis de la L, el lápiz, la botella, el móvil
    R.rect(8, 152, 70, 176, hex('#f0ead8')); R.rect(8, 152, 70, 152, hex('#ffffff')); for (let y = 156; y < 176; y += 3) R.rect(12, y, 66, y, hex('#c8d0dc')); R.rect(38, 152, 39, 176, hex('#a8a090'));
    R.rect(16, 158, 32, 159, hex('#3a3a6a')); R.rect(16, 158, 17, 170, hex('#3a3a6a')); R.rect(46, 162, 60, 162, hex('#3a3a6a'));
    R.linea(70, 170, 92, 162, hex('#e8b030')); R.pset(92, 162, hex('#2a2a2a')); R.pset(70, 170, hex('#e8503a'));
    R.rect(290, 120, 304, 160, hex('#7ab0d8')); R.rect(292, 116, 302, 120, hex('#2a6ab8')); R.rect(291, 122, 292, 156, hex('#d8f0ff')); R.rect(290, 136, 304, 144, hex('#e8eef4'));
    R.rect(250, 160, 278, 176, hex('#1c1c24')); R.rect(252, 162, 276, 174, hex('#2a3a5a'));
  });
  R.copiar(fijo);
  // la pantalla (con su visera) y la mano de nadie: solo el aparato
  R.rect(28, 18, 284, 24, hex('#2a2a32')); R.rect(28, 18, 284, 18, hex('#4a4a56'));
  const m = a_monitor(R, t, 30, 24, 282, 140, o.ele ?? 1);
  R.rect(140, 141, 172, 148, hex('#2a2a32'));
  for (let k = 0; k < 8; k++) { const x = Math.round(((h(k, 1, 987) * 340 + t * (10 + k)) % 340) - 10), y = 150 + Math.round(h(k, 2, 987) * 26); if (x >= 0 && x < 320) R.pset(x, y, hex('#e8cc8a')); }   // granos de arena que trae el aire
  return { suelo: 176, pantalla: m.cristal, ele: [m.L.x0, m.L.y, m.L.x1, m.L.y + m.L.alto], mancha: [m.M.x, m.M.y, m.M.r], cuaderno: [8, 152, 70, 176], mesa: 146 };
}

// ·· piezas del decorado B ··
const B_IT = (() => { const P = {}; for (const [k, v] of Object.entries({
  yeso: '#d9b98a', yesoS: '#c6a274', yesoL: '#e6caa0', yesoD: '#b08c62', techo: '#e8dcc6', techoS: '#d4c6ac', salvia: '#8e9e86', salviaS: '#6e7e68', salviaL: '#aab8a0',
  salviaD: '#58664f', piedra: '#9a9c98', piedraS: '#727470', piedraL: '#bcbeb8', persiana: '#3e7a4e', persianaS: '#2a5638', persianaL: '#5a9a68',
  roble: '#b07a46', robleS: '#8a5a30', robleL: '#c8925a', robleD: '#6a4222', nogal: '#7a4e2e', nogalS: '#5a361e', nogalL: '#946240',
  teja: '#c0603a', tejaS: '#94442a', tejaL: '#d8805a', cielo0: '#9cc8ec', cielo1: '#b4d6f2', cielo2: '#cfe6f8', nube: '#ffffff', nubeM: '#e6eef8', nubeS: '#bccce0',
  tarde0: '#e89a6a', tarde1: '#c87a8a', tarde2: '#7a5a8a', tarde3: '#f2c08a',
  mantel: '#283c6a', mantelS: '#1a2a4e', mantelL: '#3a5288', mantelB: '#4c66a0', negro: '#1a1c22', grafito: '#2e3038', grafitoL: '#4a4e5a', metal: '#9aa4b4', metalL: '#d0d8e2', metalS: '#5c6474',
  cristal: '#cfe8f4', agua: '#8ac0e0', aguaL: '#e8f6fc', verdeIt: '#1e9a52', verdeItS: '#147040', blancoIt: '#f2f2ee', blancoItS: '#c8ccc6', rojoIt: '#d0303a', rojoItS: '#9a2028',
  oro: '#e0b450', oroS: '#a8822e', rojo: '#ff3a3a', rojoS: '#7a1a1a', piloto: '#5aff8a', croma: '#3aa84a', cromaS: '#287a36', cromaL: '#5ac46a', espuma: '#3a3c44', espumaL: '#5a5c66',
  pared2: '#c8bca8', pared2S: '#aea08a', pared2L: '#dcd2c0', mapa: '#0c1428', mapaD: '#1a2a4a', mapaL: '#2e4a7a', pin: '#ffd060',
})) P[k] = hex(v); return P; })();

const B_CIELO = [B_IT.cielo0, B_IT.cielo1, B_IT.cielo2];

// mezcla dos colores (k = 0: a; 1: b)
const b_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
function b_rc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// el fondo fijo de cada encuadre: se pinta una vez en un búfer propio y se copia en cada fotograma
const b_CACHE = new WeakMap();

function b_capa(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// un búfer de trabajo (para girar la imagen de la pantalla)
function b_borrador(R) { let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {})); return m.borrador ?? (m.borrador = R.nuevo()); }

// cifras de 3 × 5 (y «:», «.», «-») para relojes y pantallas
const b_CIFRAS = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001001010010', 8: '111101111101111', 9: '111101111001111', ':': '000010000010000', '.': '000000000000010', '-': '000000111000000' };

function b_dig(R, s, x, y, c) { for (const ch of String(s)) { const g = b_CIFRAS[ch]; if (g) for (let i = 0; i < 15; i++) if (g[i] === '1') R.pset(x + (i % 3), y + Math.floor(i / 3), c); x += ch === ':' || ch === '.' ? 3 : 4; } }

// yeso pintado: el color con un moteado de tres tonos en manchas, alguna grieta finísima y el polvo de abajo
function b_yeso(R, x0, y0, x1, y1, c, cS, cL, k = 0) {
  R.rect(x0, y0, x1, y1, c);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x >> 2, y >> 2, 600 + k) * 0.6 + h(x, y, 601 + k) * 0.4; if (n > 0.8) R.pset(x, y, cL); else if (n < 0.16) R.pset(x, y, cS); }
  for (let g = 0; g < 3; g++) { let x = x0 + Math.round(h(g, 1, 602 + k) * (x1 - x0)), y = y0 + Math.round(h(g, 2, 602 + k) * (y1 - y0) * 0.6); for (let i = 0; i < 9; i++) { R.pset(x, y, cS); x += h(g, i, 603) < 0.5 ? 1 : 0; y++; if (y > y1) break; } }
}

// cuarterones de pared (zócalo): moldura con luz arriba y sombra abajo, el campo rehundido y un junquillo
function b_zocalo(R, x0, y0, x1, y1, ancho, P) {
  const [c, cS, cL, cD] = P; R.rect(x0, y0, x1, y1, c); R.rect(x0, y0, x1, y0, cL); R.rect(x0, y0 + 1, x1, y0 + 1, cD); R.rect(x0, y0 + 2, x1, y0 + 2, cS);
  for (let x = x0 + 4; x + ancho - 4 <= x1; x += ancho) { const a = x, b = x + ancho - 6;
    R.rect(a, y0 + 6, b, y1 - 5, cD); R.rect(a + 1, y0 + 7, b, y1 - 5, cS); R.rect(a + 1, y0 + 7, b - 1, y1 - 6, c); R.rect(a + 1, y0 + 7, b - 1, y0 + 7, cS); R.rect(a + 2, y1 - 6, b - 1, y1 - 6, cL);
    R.rect(a + 3, y0 + 9, b - 3, y1 - 8, cS); R.rect(a + 4, y0 + 10, b - 3, y1 - 8, c); R.rect(a + 4, y1 - 8, b - 3, y1 - 8, cL); }
  R.rect(x0, y1 - 2, x1, y1, cD); R.rect(x0, y1 - 3, x1, y1 - 3, cL);
}

// suelo de espiga (tarima en espiga de roble): tiras de tablillas inclinadas alternas, juntas, veta y tono por tablilla
function b_espiga(R, x0, y0, x1, y1) {
  const T3 = [B_IT.roble, B_IT.robleL, b_mez(B_IT.roble, B_IT.robleS, 0.5)];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const ban = Math.floor(x / 10), lx = x - ban * 10, dirB = ban & 1 ? 1 : -1, v = y + dirB * lx, tab = Math.floor(v / 4);
    let c = T3[Math.floor(h(ban, tab, 610) * 3)];
    if (((v % 4) + 4) % 4 === 0 || lx === 0) c = B_IT.robleD; else if (h(x, y, 611) < 0.12) c = B_IT.robleS;
    R.pset(x, y, c);
  }
}

// la vista de una ciudad italiana por un hueco (x0, y0)–(x1, y1): cielo tramado (sus tres tonos, que luego reconocen las
// nubes), colinas lejanas, una cúpula con su linterna, un campanario con la campana, fachadas de colores con ventanas y
// persianas verdes, tejados de teja con chimeneas y antenas, y una azotea con macetas en primer término. tarde: al
// anochecer (cielo rosado y ventanas encendidas)
function b_vista(R, x0, y0, x1, y1, k = 0, tarde = false) {
  const cl = [x0, y0, x1, y1], W = x1 - x0, H = y1 - y0, rc = (a, b, c, d, col) => b_rc(R, cl, a, b, c, d, col);
  const CI = tarde ? [B_IT.tarde2, B_IT.tarde1, B_IT.tarde0] : B_CIELO;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / H; for (let x = x0; x <= x1; x++) { const z = u * 2.4 + (h(x, y, 620) - 0.5) * 0.5 + ((x + y) & 1) * 0.2; R.pset(x, y, CI[Math.max(0, Math.min(2, Math.floor(z)))]); } }
  if (tarde) { const sx = x0 + Math.round(W * 0.7), sy = y0 + Math.round(H * 0.5); R.recorte(cl); R.disco(sx, sy, 4, B_IT.tarde3); R.disco(sx, sy, 2, hex('#fff0c8')); R.recorte(null); }
  R.recorte(cl);
  const hz = y0 + Math.round(H * 0.5);
  for (let x = x0; x <= x1; x++) { const top = hz - 3 - Math.round(3 * Math.sin(x * 0.07 + k) + 2 * Math.sin(x * 0.19)); rc(x, top, x, hz + 4, tarde ? hex('#5a4a6a') : hex('#8aa4b4')); if (h(x, 1, 621) < 0.3) R.pset(x, top + 1, tarde ? hex('#6a5a7a') : hex('#9ab4c0')); }
  // la cúpula sobre su tambor, con nervios y la linterna
  { const cx = x0 + Math.round(W * 0.28), cy = hz - 4, r = Math.max(5, Math.round(W * 0.12));
    rc(cx - r, cy, cx + r, cy + 6, tarde ? hex('#a08a78') : hex('#d8c8a8')); for (let i = cx - r + 1; i < cx + r; i += 3) rc(i, cy + 1, i, cy + 5, tarde ? hex('#6a5a5a') : hex('#a89878'));
    for (let j = 0; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j)); for (let i = -w; i <= w; i++) R.pset(cx + i, cy - j, i < -w * 0.3 ? (tarde ? hex('#7a7a8a') : hex('#a8b0b8')) : i > w * 0.45 ? (tarde ? hex('#4a4a5a') : hex('#6a727c')) : (tarde ? hex('#5e5e6e') : hex('#8a929c'))); }
    for (const f of [-0.55, 0, 0.55]) for (let j = 0; j <= r; j++) R.pset(cx + Math.round(f * Math.sqrt(r * r - j * j)), cy - j, tarde ? hex('#6a6a7a') : hex('#b8c0c8'));
    rc(cx - 1, cy - r - 4, cx + 1, cy - r, hex('#f0e6d0')); R.pset(cx, cy - r - 5, B_IT.oro); }
  // el campanario de ladrillo con el hueco de la campana y el chapitel
  { const cx = x0 + Math.round(W * 0.7), top = y0 + Math.round(H * 0.16), w = Math.max(3, Math.round(W * 0.06));
    rc(cx - w, top + 6, cx + w, hz + 6, tarde ? hex('#8a5a4a') : hex('#b8704e')); rc(cx + w - 1, top + 6, cx + w, hz + 6, tarde ? hex('#6a4038') : hex('#94563a'));
    for (let y = top + 9; y < hz + 6; y += 3) rc(cx - w, y, cx + w, y, tarde ? hex('#7a4a3e') : hex('#a4603f'));
    rc(cx - w + 1, top + 7, cx + w - 1, top + 11, hex('#3a2a28')); R.pset(cx, top + 9, B_IT.oro); R.pset(cx, top + 10, B_IT.oroS);
    R.poligono([[cx - w - 1, top + 6], [cx + w + 1, top + 6], [cx, top]], B_IT.tejaS); R.linea(cx - w - 1, top + 6, cx, top, B_IT.tejaL); R.pset(cx, top - 1, hex('#5a5a5a')); }
  // las casas: fachadas, ventanas con persianas, cornisas y tejados con hileras de teja, chimeneas y antenas
  const FA = ['#e2b474', '#d89a6c', '#ecd29a', '#c88060', '#e8d6b4', '#d4a87c'].map(hex);
  for (let fila = 0; fila < 2; fila++) { let x = x0 - 6 + fila * 5; const base = fila ? y1 : hz + Math.round(H * 0.3);
    for (let n = 0; x < x1 + 4; n++) { const w = Math.max(9, Math.round(W * (0.16 + h(n, fila, 622 + k) * 0.12))), alto = Math.round(H * (fila ? 0.24 : 0.2) + h(n, 7, 623 + k) * H * 0.12), top = base - alto;
      const fc = FA[Math.floor(h(n, fila, 624 + k) * FA.length)]; rc(x, top, x + w, base, tarde ? b_mez(fc, hex('#4a3a5a'), 0.55) : fc); rc(x + w, top, x + w, base, b_mez(fc, hex('#000000'), 0.25));
      for (let wy = top + 4; wy < base - 2; wy += 6) for (let wx = x + 2; wx < x + w - 2; wx += 5) { const luz = tarde && h(wx, wy, 625 + k) < 0.45;
        rc(wx, wy, wx + 1, wy + 2, luz ? hex('#ffd890') : hex('#3a3236')); if (!luz) { R.pset(wx - 1, wy, B_IT.persianaS); R.pset(wx - 1, wy + 1, B_IT.persiana); R.pset(wx + 2, wy, B_IT.persianaS); R.pset(wx + 2, wy + 1, B_IT.persiana); } }
      rc(x - 1, top - 1, x + w + 1, top, tarde ? hex('#8a7a7a') : hex('#f0e2c4'));
      const tj = tarde ? b_mez(B_IT.teja, hex('#3a2a4a'), 0.45) : B_IT.teja, tjS = tarde ? b_mez(B_IT.tejaS, hex('#2a1a3a'), 0.45) : B_IT.tejaS;
      R.poligono([[x - 2, top - 1], [x + w + 2, top - 1], [x + w - 2, top - 5], [x + 2, top - 5]], tj);
      for (let ty = top - 4; ty < top; ty += 2) R.linea(x - 1, ty, x + w + 1, ty, tjS); for (let tx = x; tx < x + w; tx += 2) R.pset(tx, top - 2, tarde ? tj : B_IT.tejaL);
      if (h(n, 3, 626 + k) < 0.5) { const cx2 = x + 2 + Math.round(h(n, 4, 627) * (w - 5)); rc(cx2, top - 8, cx2 + 1, top - 4, tarde ? hex('#7a6a6a') : hex('#d8c4a0')); rc(cx2 - 1, top - 9, cx2 + 2, top - 9, hex('#6a5a5a')); }
      if (h(n, 5, 628 + k) < 0.35) { const ax = x + w - 3; R.linea(ax, top - 5, ax, top - 11, hex('#5a5a62')); R.linea(ax - 2, top - 9, ax + 2, top - 9, hex('#5a5a62')); R.linea(ax - 1, top - 11, ax + 1, top - 11, hex('#5a5a62')); }
      x += w + 1; } }
  R.recorte(null);
}

// lo que se mueve en la vista: nubes de tres tonos a dos velocidades (solo sobre el cielo), golondrinas que cruzan y la
// ropa tendida entre dos casas que se mece con el viento
function b_vistaVida(R, t, x0, y0, x1, y1, k = 0, tarde = false) {
  const cl = [x0, y0, x1, y1], W = x1 - x0, H = y1 - y0, CI = tarde ? [B_IT.tarde2, B_IT.tarde1, B_IT.tarde0] : B_CIELO;
  const esCielo = (c) => c === CI[0] || c === CI[1] || c === CI[2];
  const NB = tarde ? [hex('#f4c8b0'), hex('#d89aa0'), hex('#a07a98')] : [B_IT.nube, B_IT.nubeM, B_IT.nubeS];
  R.recorte(cl);
  for (let n = 0; n < 4; n++) { const v = 1.2 + (n % 2) * 1.6, w = 10 + Math.round(h(n, 1, 630 + k) * 10), span = W + w * 2 + 20;
    const cx = x0 - w + ((h(n, 2, 630 + k) * span + t * v) % span), cy = y0 + 4 + Math.round(h(n, 3, 630 + k) * H * 0.28);
    for (let j = -4; j <= 4; j++) for (let i = -w; i <= w; i++) { const d = (i / w) ** 2 + (j / 4) ** 2 - 0.25 * Math.sin(i * 0.6 + n); if (d > 1) continue;
      const x = Math.round(cx + i), y = cy + j; if (!esCielo(R.pget(x, y))) continue; R.pset(x, y, j > 1 ? NB[2] : j < -1 && i < w * 0.4 ? NB[0] : NB[1]); } }
  for (let b = 0; b < 3; b++) { const u = ((t * 0.09 + h(b, 1, 631 + k)) % 1), x = Math.round(x0 - 6 + u * (W + 12)), y = Math.round(y0 + H * 0.2 + h(b, 2, 631 + k) * H * 0.2 + Math.sin(t * 2 + b) * 2), ala = Math.sin(t * 9 + b * 2) > 0;
    const c = tarde ? hex('#3a2a3a') : hex('#3a3a4a'); for (const [dx, dy] of [[0, 0], [-1, ala ? -1 : 0], [1, ala ? -1 : 0], [-2, ala ? -1 : 1], [2, ala ? -1 : 1]]) if (esCielo(R.pget(x + dx, y + dy)) || R.pget(x + dx, y + dy) === NB[0] || R.pget(x + dx, y + dy) === NB[1] || R.pget(x + dx, y + dy) === NB[2]) R.pset(x + dx, y + dy, c); }
  { const ya = y1 - Math.round(H * 0.2), xa = x0 + Math.round(W * 0.08), xb = x0 + Math.round(W * 0.48), ROPA = [hex('#f2f2ee'), hex('#e85a5a'), hex('#5a8ad8'), hex('#f2d860'), hex('#f2f2ee')];
    for (let x = xa; x <= xb; x++) R.pset(x, ya + Math.round(Math.sin((x - xa) / (xb - xa) * Math.PI) * 2), hex('#6a6a6a'));
    ROPA.forEach((c, i) => { const px = xa + 3 + i * Math.max(4, Math.round((xb - xa - 6) / 5)), py = ya + Math.round(Math.sin((px - xa) / (xb - xa) * Math.PI) * 2) + 1, sw = Math.round(Math.sin(t * 2.4 + i * 1.3) * 1.2);
      for (let j = 0; j < 4 + (i & 1); j++) R.linea(px + Math.round(sw * j / 4), py + j, px + 2 + Math.round(sw * j / 4), py + j, tarde ? b_mez(c, hex('#3a2a4a'), 0.5) : c); }); }
  R.recorte(null);
}

// persiana de librillo verde (de lamas), abierta contra la pared, con su marco, la sombra y los pernios
function b_persiana(R, x0, y0, x1, y1) {
  R.rect(x0, y0, x1, y1, B_IT.persianaS); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, B_IT.persiana);
  for (let y = y0 + 3; y < y1 - 1; y += 3) { R.rect(x0 + 1, y, x1 - 1, y, B_IT.persianaS); R.rect(x0 + 1, y - 1, x1 - 1, y - 1, B_IT.persianaL); }
  R.rect(x0 + 1, Math.round((y0 + y1) / 2), x1 - 1, Math.round((y0 + y1) / 2) + 1, B_IT.persiana);
  for (const y of [y0 + 6, y1 - 6]) R.rect(x0, y, x0 + 1, y + 1, B_IT.negro);
}

// ventana de piedra gris con su alféizar, el vidrio con parteluz y travesaños, la vista y un reflejo; devuelve el hueco
function b_ventana(R, x0, y0, x1, y1, k = 0, tarde = false) {
  R.rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, B_IT.piedraS); R.rect(x0 - 3, y0 - 3, x1 + 2, y1 + 2, B_IT.piedra); R.rect(x0 - 3, y0 - 3, x1 + 2, y0 - 3, B_IT.piedraL); R.rect(x0 - 3, y0 - 3, x0 - 3, y1 + 2, B_IT.piedraL);
  for (let y = y0; y < y1; y += 9) { R.pset(x0 - 2, y, B_IT.piedraS); R.pset(x1 + 2, y + 4, B_IT.piedraS); }
  b_vista(R, x0, y0, x1, y1, k, tarde);
  const mx = Math.round((x0 + x1) / 2); R.rect(mx - 1, y0, mx + 1, y1, B_IT.blancoIt); R.rect(mx + 1, y0, mx + 1, y1, B_IT.blancoItS);
  for (const f of [0.34, 0.67]) { const y = Math.round(y0 + (y1 - y0) * f); R.rect(x0, y, x1, y + 1, B_IT.blancoIt); R.rect(x0, y + 1, x1, y + 1, B_IT.blancoItS); }
  R.rect(x0, y0, x1, y0 + 1, B_IT.blancoIt); R.rect(x0, y0, x0 + 1, y1, B_IT.blancoIt); R.rect(x1 - 1, y0, x1, y1, B_IT.blancoItS); R.rect(x0, y1 - 1, x1, y1, B_IT.blancoItS);
  for (let i = 0; i < 6; i++) { const rx = x0 + 4 + i, ry = y0 + 3 + i * 2; if (rx < mx - 1) R.pset(rx, ry, b_mez(R.pget(rx, ry), B_IT.nube, 0.5)); }
  R.rect(x0 - 5, y1 + 3, x1 + 5, y1 + 5, B_IT.piedra); R.rect(x0 - 5, y1 + 3, x1 + 5, y1 + 3, B_IT.piedraL); R.rect(x0 - 5, y1 + 6, x1 + 5, y1 + 6, B_IT.piedraS);
  return [x0 + 2, y0 + 2, x1 - 2, y1 - 2];
}

// la bandera italiana en su asta (puntas de latón y base), con la tela que se mece despacio y sus pliegues
function b_bandera(R, t, x, y, w, alto, suelo) {
  R.rect(x - 1, y - 2, x, suelo - 3, B_IT.oroS); R.rect(x - 1, y - 2, x - 1, suelo - 3, B_IT.oro); R.poligono([[x - 2, y - 3], [x + 1, y - 3], [x - 0.5, y - 8]], B_IT.oro);
  R.rect(x - 5, suelo - 3, x + 4, suelo - 1, B_IT.negro); R.rect(x - 4, suelo - 3, x + 3, suelo - 3, B_IT.grafitoL);
  for (let i = 0; i < w; i++) { const f = i / w, a = t * 1.4 - i * 0.32, dy = Math.round(Math.sin(a) * 1.6 * f + f * 3), luz = Math.cos(a);
    const P = f < 1 / 3 ? [B_IT.verdeIt, B_IT.verdeItS, hex('#3ab86a')] : f < 2 / 3 ? [B_IT.blancoIt, B_IT.blancoItS, hex('#ffffff')] : [B_IT.rojoIt, B_IT.rojoItS, hex('#e85058')];
    const c = luz > 0.55 ? P[2] : luz < -0.5 ? P[1] : P[0]; R.rect(x + 1 + i, y + dy, x + 1 + i, y + alto + dy - Math.round(f * 2), c); R.pset(x + 1 + i, y + alto + dy - Math.round(f * 2) + 1, P[1]); }
}

// lo que proyecta la pantalla, dentro de su hueco: 'satelite' (Giza desde arriba) o 'plano' (el corte azul de los pozos)
function b_contenido(R, t, x0, y0, x1, y1, modo) {
  const cl = [x0, y0, x1, y1], W = x1 - x0, H = y1 - y0, rc = (a, b, c, d, col) => b_rc(R, cl, a, b, c, d, col);
  if (modo === 'satelite') {
    const AR = [hex('#d8b47a'), hex('#e4c48c'), hex('#caa46a'), hex('#eed6a2')], CAMPO = [hex('#5a8a3a'), hex('#4a7a34'), hex('#7a9a44'), hex('#6a8a3a')];
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / W, v = (y - y0) / H, borde = 0.8 + Math.sin(v * 7) * 0.03; let c;
      if (u > borde + 0.08) { const bx = Math.floor((x - x0) / 4), by = Math.floor((y - y0) / 4), calle = (x - x0) % 4 === 0 || (y - y0) % 4 === 0;
        c = calle ? hex('#8a8478') : [hex('#d8d0c0'), hex('#c4b8a4'), hex('#b8a890'), hex('#e6dccc')][Math.floor(h(bx, by, 640) * 4)]; }
      else if (u > borde) { const p = Math.floor((x - x0) / 6) + Math.floor((y - y0) / 5) * 13; c = CAMPO[Math.floor(h(p, 1, 641) * 4)]; if ((x + y * 2) % 5 === 0) c = b_mez(c, hex('#2a4a1a'), 0.3); }
      else { const n = h(x >> 2, y >> 2, 642) * 0.35 + h(x, y, 644) * 0.25 + Math.sin(x * 0.21 + y * 0.6) * 0.08 + 0.2 + (u > 0.3 && u < 0.7 && v > 0.1 && v < 0.9 ? 0.18 : 0); c = AR[Math.max(0, Math.min(3, Math.floor(n * 4)))]; }
      R.pset(x, y, c); }
    const P = (fx, fy) => [Math.round(x0 + W * fx), Math.round(y0 + H * fy)];
    // las mastabas en hileras, al oeste y al este de Keops
    for (const [a, b, c2, d] of [[0.1, 0.08, 0.3, 0.34], [0.72, 0.08, 0.79, 0.34]]) for (let yy = y0 + Math.round(H * b); yy < y0 + H * d; yy += 4) for (let xx = x0 + Math.round(W * a); xx < x0 + W * c2; xx += 5) { rc(xx, yy, xx + 2, yy + 1, hex('#f2e2b8')); R.pset(xx + 3, yy + 1, hex('#9a7a4a')); R.pset(xx, yy + 2, hex('#b8945e')); }
    const pir = (cx, cy, s, cima) => { R.poligono([[cx + s, cy - s], [cx + s + s * 0.9, cy + s * 0.3], [cx + s * 0.9, cy + s * 1.7], [cx - s, cy + s]], hex('#a8844e'));
      for (let j = -s; j <= s; j++) for (let i = -s; i <= s; i++) { const ai = Math.abs(i), aj = Math.abs(j); let c = aj >= ai ? (j < 0 ? hex('#f6e4b4') : hex('#94744a')) : i < 0 ? hex('#dcc08a') : hex('#b0905c'); if (ai === aj) c = hex('#fff2cc'); if (cima && ai <= s * 0.22 && aj <= s * 0.22) c = aj >= ai && j < 0 ? hex('#fffaea') : hex('#f2ead8'); R.pset(cx + i, cy + j, c); } };
    const [kx, ky] = P(0.58, 0.25), [fx, fy] = P(0.4, 0.55), [mx, my] = P(0.24, 0.81), sK = Math.max(6, Math.round(H * 0.2));
    // las calzadas a los templos del valle y la Esfinge
    R.linea(kx + sK, ky + 2, x0 + W * 0.79, ky + 10, hex('#bca06a')); R.linea(fx + sK, fy, x0 + W * 0.74, fy - 3, hex('#bca06a')); R.linea(fx + sK, fy + 1, x0 + W * 0.74, fy - 2, hex('#f2dcaa')); R.linea(mx + 4, my, x0 + W * 0.7, my - 4, hex('#bca06a'));
    { const [sx, sy] = P(0.74, 0.5); rc(sx, sy, sx + 3, sy + 1, hex('#c09858')); R.pset(sx + 4, sy, hex('#f2dcaa')); rc(sx + 4, sy + 2, sx + 6, sy + 4, hex('#bca070')); }
    pir(kx, ky, sK, false); pir(fx, fy, sK - 1, true); pir(mx, my, Math.round(sK * 0.45), false);
    for (let i = 0; i < 3; i++) pir(mx + Math.round(sK * 0.45) + 4 + i * 5, my + 3, 2, false); for (let i = 0; i < 3; i++) pir(kx + sK + 4, ky - sK + 4 + i * 6, 2, false);
    // la carretera con coches que pasan
    { const rx = Math.round(x0 + W * 0.78); rc(rx, y0, rx + 1, y1, hex('#6a6460')); for (let c = 0; c < 4; c++) { const yy = y0 + ((Math.round(t * (5 + c * 2)) + c * 17) % (H + 1)); R.pset(rx + (c & 1), c & 1 ? y1 - (yy - y0) : yy, c % 3 ? hex('#ffffff') : hex('#e85a3a')); } }
    // la retícula sobre Kefrén, que parpadea, y las líneas que se cruzan sobre ella
    const on = Math.sin(t * 4) > -0.6, RE = hex('#7cf0a0'), r = sK + 3 + Math.round(Math.abs(Math.sin(t * 2)) * 2);
    for (let x = x0; x <= x1; x += 2) R.pset(x, fy, b_mez(R.pget(x, fy), RE, 0.45)); for (let y = y0; y <= y1; y += 2) R.pset(fx, y, b_mez(R.pget(fx, y), RE, 0.45));
    if (on) for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (const e of [0, 1]) { R.linea(fx + sx * (r + e), fy + sy * (r + e), fx + sx * (r - 4), fy + sy * (r + e), RE); R.linea(fx + sx * (r + e), fy + sy * (r + e), fx + sx * (r + e), fy + sy * (r - 4), RE); }
    // la barrida del escaneo, las coordenadas y la escala
    { const yb = y0 + Math.round((t * 9) % H); for (let x = x0; x <= x1; x++) R.pset(x, yb, b_mez(R.pget(x, yb), hex('#ffffff'), 0.3)); }
    rc(x0, y1 - 6, x0 + 23, y1, hex('#1a1e24')); b_dig(R, '29.97', x0 + 2, y1 - 5, RE);
    rc(x1 - 16, y1 - 3, x1 - 3, y1 - 3, hex('#ffffff')); rc(x1 - 16, y1 - 5, x1 - 16, y1 - 3, hex('#ffffff')); rc(x1 - 3, y1 - 5, x1 - 3, y1 - 3, hex('#ffffff'));
    return;
  }
  // el plano azul: rejilla, la superficie, la pirámide, las cinco salas, los ocho pozos con su rosca, los cubos y la regla
  rc(x0, y0, x1, y1, C.planoFondo);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const gx = (x - x0) % 8 === 0, gy = (y - y0) % 8 === 0; if (gx || gy) R.pset(x, y, (gx && gy) || (gx ? y : x) % 2 === 0 ? C.planoRejilla : b_mez(C.planoFondo, C.planoRejilla, 0.5)); }
  const cx = Math.round(x0 + W * 0.54), g = Math.round(y0 + H * 0.36), ap = y0 + 3, b = Math.round((g - ap) * 1.2);
  for (let x = x0; x <= x1; x++) R.pset(x, g, C.planoLinea); for (let x = x0; x <= x1; x += 3) R.pset(x, g + 1, b_mez(C.planoFondo, C.planoLinea, 0.4));
  for (let y = g + 4; y < y1; y += 7) for (let x = x0 + ((y * 3) % 5); x <= x1; x += 5) R.pset(x, y, C.planoRejilla);
  for (let y = ap; y <= g; y++) { const w = Math.round((y - ap) / (g - ap) * b); for (let x = cx - w; x <= cx + w; x++) if ((x + y) % 3 === 0) R.pset(x, y, b_mez(C.planoFondo, C.planoLinea, x > cx ? 0.22 : 0.38)); }
  R.linea(cx - b, g, cx, ap, C.planoLinea); R.linea(cx, ap, cx + b, g, C.planoBrillo); R.linea(cx, ap, cx, g, b_mez(C.planoFondo, C.planoLinea, 0.5)); R.pset(cx, ap - 1, C.planoBrillo);
  const salas = 5; for (let i = 0; i < salas; i++) { const sx = Math.round(cx - b * 0.8 + i * (b * 1.6) / (salas - 1)); R.linea(sx - 2, g + 4, sx + 2, g + 4, C.planoLinea); R.linea(sx - 2, g + 7, sx + 2, g + 7, C.planoLinea); R.linea(sx - 2, g + 4, sx - 2, g + 7, C.planoLinea); R.linea(sx + 2, g + 4, sx + 2, g + 7, C.planoLinea); R.pset(sx, g + 5, C.planoBrillo); }
  R.linea(cx - b * 0.8, g + 6, cx + b * 0.8, g + 6, b_mez(C.planoFondo, C.planoLinea, 0.6));
  const fondo = y1 - 13, gira = Math.floor(t * 8);
  for (let i = 0; i < 8; i++) { const sx = Math.round(cx - b * 0.85 + i * (b * 1.7) / 7);
    R.linea(sx - 1, g + 8, sx - 1, fondo, C.planoLinea); R.linea(sx + 1, g + 8, sx + 1, fondo, C.planoLinea);
    for (let y = g + 9 + ((gira + i * 2) % 5); y < fondo - 1; y += 5) { R.pset(sx - 2, y, C.planoBrillo); R.pset(sx - 1, y + 1, C.planoBrillo); R.pset(sx, y + 1, C.planoBrillo); R.pset(sx + 1, y + 2, C.planoLinea); R.pset(sx + 2, y + 2, C.planoLinea); } }
  for (const f of [-0.45, 0.45]) { const qx = Math.round(cx + b * f), qy = fondo + 2, s = 6; R.linea(qx - s, qy, qx + s, qy, C.planoLinea); R.linea(qx - s, qy + s, qx + s, qy + s, C.planoLinea); R.linea(qx - s, qy, qx - s, qy + s, C.planoLinea); R.linea(qx + s, qy, qx + s, qy + s, C.planoLinea);
    R.linea(qx - s, qy, qx - s + 3, qy - 3, C.planoBrillo); R.linea(qx + s, qy, qx + s + 3, qy - 3, C.planoBrillo); R.linea(qx - s + 3, qy - 3, qx + s + 3, qy - 3, C.planoBrillo); R.linea(qx + s + 3, qy - 3, qx + s + 3, qy + s - 3, C.planoLinea); }
  const rx = x0 + 5; R.linea(rx, g, rx, y1 - 4, C.planoLinea); R.linea(rx - 2, g + 2, rx, g, C.planoLinea); R.linea(rx + 2, g + 2, rx, g, C.planoLinea); R.linea(rx - 2, y1 - 6, rx, y1 - 4, C.planoLinea); R.linea(rx + 2, y1 - 6, rx, y1 - 4, C.planoLinea);
  for (let y = g + 6; y < y1 - 6; y += 6) R.pset(rx + 1, y, C.planoLinea); b_dig(R, '650', rx + 3, Math.round((g + y1) / 2) - 2, C.planoBrillo);
  { const ys = y1 - Math.round((t * 11) % (H + 1)), on = h(Math.floor(t * 6), 1, 643) > 0.15; for (let x = x0; x <= x1; x += on ? 1 : 2) R.pset(x, ys, b_mez(R.pget(x, ys), C.planoBrillo, 0.35)); }
}

// la pantalla: el contenido (girado si o.modo es 'reves': giro 0 del revés, 1 derecho), con la flecha de giro mientras
// gira, las juntas de los paneles LED (led), un brillo que pasa y el halo en la pared de alrededor
function b_pantalla(R, t, x0, y0, x1, y1, modo = 'satelite', giro = 1, led = true) {
  R.rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, B_IT.negro); R.rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, B_IT.grafitoL);
  if (modo === 'apagada') { R.rect(x0, y0, x1, y1, hex('#14161c')); for (let i = 0; i < (y1 - y0); i++) R.pset(x0 + 6 + i, y0 + i, hex('#2a2e38')); return; }
  const ang = modo === 'reves' ? Math.PI * (1 - Math.max(0, Math.min(1, giro))) : 0, m = modo === 'reves' ? 'plano' : modo;
  if (Math.abs(ang) < 0.01) { R.recorte([x0, y0, x1, y1]); b_contenido(R, t, x0, y0, x1, y1, m); R.recorte(null); }
  else {
    const S = b_borrador(R), prev = R.usar(S); R.recorte([x0, y0, x1, y1]); b_contenido(R, t, x0, y0, x1, y1, m); R.recorte(null); R.usar(prev);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, co = Math.cos(ang), si = Math.sin(ang);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const dx = x - cx, dy = y - cy, sx = Math.round(cx + dx * co + dy * si), sy = Math.round(cy - dx * si + dy * co);
      R.pset(x, y, sx >= x0 && sx <= x1 && sy >= y0 && sy <= y1 ? S[sy * 320 + sx] : hex('#060c1c')); }
    if (giro > 0 && giro < 1) { const ax = x1 - 9, ay = y0 + 9, A = hex('#ffffff'); for (let a = 0; a < 4.6; a += 0.15) R.pset(Math.round(ax + Math.cos(a - t * 3) * 5), Math.round(ay + Math.sin(a - t * 3) * 5), A);
      const ea = 4.6 - t * 3, ex = Math.round(ax + Math.cos(ea) * 5), ey = Math.round(ay + Math.sin(ea) * 5); R.disco(ex, ey, 1, A); }
  }
  if (led) { for (const f of [0.5]) { const sx = Math.round(x0 + (x1 - x0) * f), sy = Math.round(y0 + (y1 - y0) * f); for (let y = y0; y <= y1; y++) R.pset(sx, y, b_mez(R.pget(sx, y), hex('#000000'), 0.35)); for (let x = x0; x <= x1; x++) R.pset(x, sy, b_mez(R.pget(x, sy), hex('#000000'), 0.35)); } }
  const gb = Math.round(((t * 22) % ((x1 - x0) * 3)) - (y1 - y0)); for (let y = y0; y <= y1; y++) for (let i = 0; i < 4; i++) { const x = x0 + gb + (y1 - y) + i; if (x >= x0 && x <= x1 && (x + y) & 1) R.pset(x, y, b_mez(R.pget(x, y), hex('#ffffff'), 0.16)); }
}

// la cámara de vídeo profesional en su trípode (patas, cabeza, cuerpo, objetivo con su brillo, visor, el micro con la
// espuma y el piloto rojo que parpadea); dir: hacia dónde mira el objetivo
function b_camaraTripode(R, t, x, suelo, dir = 1, alto = 22) {
  const yc = suelo - alto, M = B_IT.metalS;
  R.linea(x, yc + 3, x - 8, suelo, M); R.linea(x, yc + 3, x + 8, suelo, M); R.linea(x + 1, yc + 3, x + 2, suelo - 2, B_IT.metal); R.linea(x - 1, yc + 3, x - 7, suelo, B_IT.metalL);
  R.linea(x - 5, suelo - 7, x + 5, suelo - 7, M); for (const dx of [-8, 8, 2]) R.rect(x + dx - 1, suelo, x + dx + 1, suelo, B_IT.negro);
  R.rect(x - 3, yc + 1, x + 3, yc + 3, B_IT.grafito); R.linea(x - dir * 3, yc + 3, x - dir * 12, yc + 7, B_IT.negro);
  const a = x - dir * 7, b = x + dir * 7; R.rect(Math.min(a, b), yc - 7, Math.max(a, b), yc, B_IT.negro); R.rect(Math.min(a, b) + 1, yc - 6, Math.max(a, b) - 1, yc - 1, B_IT.grafito); R.rect(Math.min(a, b) + 1, yc - 6, Math.max(a, b) - 1, yc - 6, B_IT.grafitoL);
  R.rect(Math.min(b, b + dir * 6), yc - 6, Math.max(b, b + dir * 6), yc - 1, B_IT.negro); R.rect(b + dir * 6, yc - 6, b + dir * 6, yc - 1, hex('#3a5a8a')); R.pset(b + dir * 6, yc - 5, hex('#c8e4ff'));
  R.rect(Math.min(a, a - dir * 3), yc - 5, Math.max(a, a - dir * 3), yc - 2, B_IT.grafitoL); R.rect(x - 4, yc - 10, x + 4, yc - 8, B_IT.negro); R.pset(x - 4, yc - 9, B_IT.grafito);
  R.rect(Math.min(x + dir * 2, x + dir * 8), yc - 12, Math.max(x + dir * 2, x + dir * 8), yc - 10, hex('#4a4c56')); R.rect(Math.min(x + dir * 7, x + dir * 10), yc - 13, Math.max(x + dir * 7, x + dir * 10), yc - 9, hex('#5a5c66'));
  R.pset(a + dir, yc - 8, Math.sin(t * 3.2 + x) > -0.2 ? B_IT.rojo : B_IT.rojoS);
}

// una cabeza del público vista de espaldas, con la nuca, las orejas, los hombros de la chaqueta y el respaldo de la silla
// por delante; se mueve un poco (asiente, gira); o.movil: la luz de un móvil en el regazo le ilumina la coronilla
function b_nuca(R, t, x, y, pelo, ropa, k, movil = false) {
  const dx = Math.round(Math.sin(t * 0.6 + k * 2.1) * 0.7 + (Math.sin(t * 0.23 + k) > 0.8 ? 1 : 0)), dy = Math.sin(t * 1.1 + k) > 0.92 ? 1 : 0, piel = k % 3 === 1 ? hex('#a8724a') : hex('#e8b48a');
  R.rect(x - 10, y + 7, x + 10, y + 20, B_IT.negro); R.rect(x - 9, y + 8, x + 9, y + 20, ropa); R.rect(x - 9, y + 8, x - 6, y + 20, b_mez(ropa, hex('#ffffff'), 0.18)); R.rect(x + 6, y + 8, x + 9, y + 20, b_mez(ropa, hex('#000000'), 0.25));
  R.rect(x - 2, y + 7, x + 2, y + 8, k % 2 ? hex('#f2f2f2') : b_mez(ropa, hex('#000000'), 0.3));
  R.rect(x - 2 + dx, y + 4 + dy, x + 2 + dx, y + 7, piel);
  R.disco(x + dx, y + dy, 7, B_IT.negro); R.disco(x + dx, y + dy, 6, pelo); R.pset(x - 7 + dx, y + 1 + dy, piel); R.pset(x + 7 + dx, y + 1 + dy, piel); R.pset(x - 7 + dx, y + 2 + dy, b_mez(piel, hex('#000000'), 0.2));
  for (let i = -3; i <= 2; i++) R.pset(x + i + dx, y - 4 + dy + (i & 1), b_mez(pelo, hex('#ffffff'), 0.28));
  if (k % 4 === 2) R.disco(x + dx, y - 1 + dy, 3, b_mez(pelo, piel, 0.75));
  if (k % 5 === 3) { R.rect(x - 1 + dx, y + 5 + dy, x + 1 + dx, y + 9, pelo); }
  if (movil) for (let i = -4; i <= 4; i++) R.pset(x + i + dx, y + 6, b_mez(R.pget(x + i + dx, y + 6), hex('#9ad8ff'), 0.5 + Math.sin(t * 3 + k) * 0.15));
  R.rect(x - 11, y + 13, x + 11, y + 20, B_IT.negro); R.rect(x - 10, y + 14, x + 10, y + 20, hex('#8a2a34')); R.rect(x - 10, y + 14, x + 10, y + 14, hex('#b04650')); R.rect(x - 10, y + 15, x - 9, y + 20, hex('#a03a44'));
  for (let i = -8; i <= 8; i += 4) R.pset(x + i, y + 17, hex('#6a1e28'));
}

// ·· prensa, general ··
function b_prensa(R, t, o) {
  b_capa(R, 'it-prensa', () => {
    // techo con su moldura y el carril de focos
    b_yeso(R, 0, 0, 319, 15, B_IT.techo, B_IT.techoS, hex('#f0e6d4'), 1);
    R.rect(0, 15, 319, 16, B_IT.techoS); R.rect(0, 17, 319, 17, hex('#f4ecdc')); R.rect(0, 18, 319, 18, B_IT.yesoS); R.rect(0, 19, 319, 19, B_IT.yesoD);
    R.rect(196, 5, 266, 6, B_IT.grafitoL); for (const fx of [202, 222, 242, 262]) { R.rect(fx - 1, 7, fx + 1, 8, B_IT.grafito); R.rect(fx - 2, 9, fx + 2, 12, B_IT.negro); R.rect(fx - 1, 12, fx + 1, 12, hex('#fff2c8')); }
    // la pared de yeso ocre y el zócalo de cuarterones verde salvia
    b_yeso(R, 0, 20, 319, 91, B_IT.yeso, B_IT.yesoS, B_IT.yesoL, 2);
    for (let y = 20; y < 30; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) && y < 20 + (x % 7 === 0 ? 4 : 9)) R.pset(x, y, b_mez(R.pget(x, y), B_IT.yesoD, 0.18));
    b_zocalo(R, 0, 92, 319, 120, 26, [B_IT.salvia, B_IT.salviaS, B_IT.salviaL, B_IT.salviaD]);
    // la ventana con las persianas abiertas, el radiador de hierro debajo
    b_ventana(R, 16, 30, 54, 96, 3); b_persiana(R, 3, 27, 11, 100); b_persiana(R, 59, 27, 67, 100);
    R.rect(18, 104, 52, 117, B_IT.negro); for (let x = 19; x < 52; x += 3) { R.rect(x, 105, x + 1, 117, hex('#c8c4b8')); R.rect(x + 1, 105, x + 1, 117, hex('#9a968a')); } R.rect(18, 104, 52, 105, hex('#dcd8cc'));
    // los dos altavoces en sus soportes
    for (const ax of [76, 226]) { R.rect(ax, 28, ax + 10, 44, B_IT.negro); R.rect(ax + 1, 29, ax + 9, 43, B_IT.grafito); for (let y = 30; y < 43; y += 2) for (let x = ax + 2; x < ax + 9; x += 2) R.pset(x, y, B_IT.negro); R.pset(ax + 8, 42, B_IT.piloto); R.rect(ax + 4, 45, ax + 6, 47, B_IT.metalS); }
    // el halo de la pantalla en la pared
    for (let y = 18; y < 98; y++) for (let x = 92; x < 229; x++) { const d = Math.max(0, Math.max(96 - x, x - 224, 22 - y, y - 94)); if (d > 0 && d < 7 && ((x + y) & 1) && h(x, y, 650) < 0.8 - d * 0.1) R.pset(x, y, b_mez(R.pget(x, y), hex('#bcd8f0'), 0.25)); }
    // el roll-up sin letras: degradado, la pirámide y las ondas, la barra de abajo y su pie
    { const a = 239, b = 260; R.rect(a, 42, b, 125, B_IT.negro); for (let y = 43; y < 124; y++) R.rect(a + 1, y, b - 1, y, b_mez(hex('#1e3a6a'), hex('#2a8a9a'), (y - 43) / 81));
      R.poligono([[a + 4, 70], [b - 4, 70], [(a + b) / 2, 54]], hex('#f2e2b0')); R.poligono([[(a + b) / 2, 54], [b - 4, 70], [(a + b) / 2 + 2, 70]], hex('#c8a870'));
      for (let k = 0; k < 3; k++) for (let x = a + 2; x < b - 1; x++) R.pset(x, 76 + k * 4 + Math.round(Math.sin(x * 0.7 + k) * 1), hex('#8ae0f0'));
      for (let k = 0; k < 4; k++) R.rect(a + 4, 96 + k * 5, b - 4 - (k % 2) * 6, 97 + k * 5, k ? hex('#c8e0f0') : hex('#ffffff'));
      R.rect(a - 1, 41, b + 1, 42, B_IT.metal); R.rect(a - 2, 124, b + 2, 127, B_IT.metalS); R.rect(a - 2, 124, b + 2, 124, B_IT.metalL); }
    // la puerta de la derecha con el pictograma verde de salida
    { R.rect(288, 56, 319, 120, B_IT.nogalS); R.rect(291, 59, 319, 120, B_IT.nogal); for (const [ya, yb] of [[62, 86], [90, 116]]) R.rect(294, ya, 316, yb, B_IT.nogalS), R.rect(295, ya + 1, 316, yb, B_IT.nogalL), R.rect(296, ya + 2, 316, yb - 1, B_IT.nogal);
      for (let y = 62; y < 116; y += 2) if (h(y, 1, 651) < 0.4) R.rect(298, y, 314, y, B_IT.nogalS); R.rect(295, 88, 316, 89, B_IT.metalL); R.rect(295, 89, 316, 89, B_IT.metalS);
      R.rect(296, 47, 311, 53, B_IT.negro); R.rect(297, 48, 310, 52, hex('#1e9a52')); const g = hex('#e8fff0'); R.pset(302, 48, g); R.linea(301, 49, 303, 50, g); R.linea(303, 50, 302, 52, g); R.linea(302, 50, 300, 52, g); R.linea(303, 49, 305, 49, g); R.rect(306, 49, 309, 51, g); R.rect(307, 50, 308, 50, hex('#1e9a52')); }
    // el suelo de espiga, la tarima con su canto y el rodapié
    b_espiga(R, 0, 121, 319, 179);
    R.rect(62, 121, 266, 127, B_IT.nogal); for (let x = 62; x < 267; x += 14) R.rect(x, 121, x, 127, B_IT.nogalS); R.rect(62, 121, 266, 121, B_IT.nogalL);
    R.rect(60, 128, 268, 136, B_IT.negro); R.rect(61, 128, 267, 135, hex('#2a2c34')); R.rect(61, 128, 267, 128, hex('#4a4c56')); for (let x = 64; x < 266; x += 3) R.pset(x, 132, hex('#24262c'));
    // la luz de la ventana en el suelo y el reflejo de la pantalla
    for (let y = 137; y < 180; y++) { const d = Math.round((y - 137) * 0.55); for (let x = 22 + d; x < 58 + d; x++) if (((x + y) & 1) === 0) R.pset(x, y, b_mez(R.pget(x, y), hex('#fff4d8'), 0.22)); }
    for (let y = 137; y < 150; y++) for (let x = 110; x < 210; x++) if (((x + y) & 1) && h(x, y, 652) < 0.5 - (y - 137) * 0.035) R.pset(x, y, b_mez(R.pget(x, y), hex('#bcd8f0'), 0.25));
  });
  const giro = o.giro ?? (o.pantalla === 'reves' ? 0 : 1);
  b_vistaVida(R, t, 18, 32, 52, 94, 3);
  b_pantalla(R, t, 100, 26, 220, 88, o.pantalla ?? 'satelite', giro);
  b_bandera(R, t, 270, 52, 16, 30, 137);
  // los focos del carril que se reflejan en la pared, la tira de luz bajo la pantalla
  for (let x = 102; x < 219; x += 3) R.pset(x, 91, Math.floor(t * 3 + x / 9) % 4 ? hex('#8ab8e0') : hex('#d8f0ff'));
  b_camaraTripode(R, t, 40, 152, 1, 26); b_camaraTripode(R, t + 0.7, 282, 152, -1, 26);
  return { suelo: 126, sala: 160, asientos: [120, 160, 200], mesa: [84, 236, 117], pantalla: [100, 26, 220, 88], ventana: [16, 30, 54, 96], puerta: [288, 56, 319, 120], pasillo: [128, 194], camaras: [40, 282] };
}

// los destellos de las cámaras de fotos (una estrella blanca y un halo), de vez en cuando, desde los sitios dados
function b_flashes(R, t, sitios, ritmo = 4) {
  const n = Math.floor(t * ritmo), u = t * ritmo - n; if (u > 0.35 || h(n, 1, 660) < 0.45) return;
  const [x, y] = sitios[Math.floor(h(n, 2, 660) * sitios.length)], r = Math.round(6 * (1 - u * 2.4));
  if (r < 1) return; R.halo?.(x, y, r + 4, [hex('#fff8e0'), hex('#ffffff')], 0.6);
  R.linea(x - r - 2, y, x + r + 2, y, hex('#ffffff')); R.linea(x, y - r - 2, x, y + r + 2, hex('#ffffff')); R.disco(x, y, Math.max(1, r >> 1), hex('#ffffff'));
}

// un micrófono de cuello de cisne con su base y el piloto (rojo cuando habla)
function b_microCisne(R, t, x, y, dir, on) {
  R.rect(x - 3, y, x + 3, y + 1, B_IT.negro); R.rect(x - 2, y - 1, x + 2, y - 1, B_IT.grafito); R.pset(x + 1, y - 1, on ? (Math.sin(t * 8) > -0.4 ? B_IT.rojo : B_IT.rojoS) : hex('#3a6a3a'));
  for (const [dx, dy] of [[0, -2], [0, -3], [0, -4], [dir, -5], [dir, -6], [2 * dir, -7], [3 * dir, -7]]) R.pset(x + dx, y + dy, B_IT.metalS);
  R.rect(Math.min(x + 3 * dir, x + 5 * dir), y - 8, Math.max(x + 3 * dir, x + 5 * dir), y - 7, B_IT.negro); if (on) R.pset(x + 5 * dir, y - 9, B_IT.rojo);
}

// una botella de agua sin etiqueta (tapón azul, el agua y su brillo) y un vaso
function b_botella(R, x, yb) { R.rect(x - 2, yb - 10, x + 2, yb, B_IT.negro); R.rect(x - 1, yb - 9, x + 1, yb - 1, B_IT.cristal); R.rect(x - 1, yb - 6, x + 1, yb - 1, B_IT.agua); R.pset(x - 1, yb - 8, B_IT.aguaL); R.rect(x - 1, yb - 12, x + 1, yb - 11, hex('#2a6ad8')); R.pset(x, yb - 13, hex('#2a6ad8')); }

function b_vaso(R, t, x, yb, k = 0) { R.rect(x - 2, yb - 5, x + 2, yb, B_IT.negro); R.rect(x - 1, yb - 4, x + 1, yb - 1, B_IT.cristal); R.rect(x - 1, yb - 2, x + 1, yb - 1, B_IT.agua); if (Math.sin(t * 1.9 + k) > 0.8) R.pset(x - 1, yb - 4, hex('#ffffff')); }

// la mesa de los ponentes (italiaDelante, 'prensa'): tablero con la luz de los focos, el mantel azul con sus pliegues y el
// faldón; en cada sitio el micrófono de cisne, la cartela sin letras y el vaso; entre sitios, las botellas, el
// portátil de espaldas (tapa sin logo) y una libreta. Los pies de los ponentes quedan detrás del faldón; se ve la
// cabeza y los hombros
function b_mesaPrensa(R, t, o) {
  const x0 = 84, x1 = 236, habla = o.habla ?? Math.floor(t / 2.6) % 3;
  R.rect(x0 - 1, 116, x1 + 1, 131, B_IT.negro); R.rect(x0, 117, x1, 118, hex('#f2f0ea')); R.rect(x0, 117, x1, 117, hex('#ffffff'));
  R.rect(x0, 119, x1, 130, B_IT.mantel); R.rect(x0, 119, x1, 119, B_IT.mantelL);
  for (let x = x0 + 4; x < x1; x += 7) { R.rect(x, 120, x, 130, B_IT.mantelS); R.rect(x + 1, 120, x + 1, 130, B_IT.mantelB); }
  R.rect(x0, 130, x1, 130, B_IT.mantelS);
  for (const [k, sx] of [[0, 120], [1, 160], [2, 200]]) { b_microCisne(R, t, sx + 14, 116, -1, k === habla); R.rect(sx - 6, 113, sx + 6, 116, B_IT.negro); R.rect(sx - 5, 114, sx + 5, 116, hex('#f4f4f0')); R.rect(sx - 3, 115, sx + 3, 115, hex('#9aa0aa')); b_vaso(R, t, sx - 10, 116, k); }
  b_botella(R, 102, 116); b_botella(R, 144, 116); b_botella(R, 218, 116);
  // el portátil de espaldas entre el segundo y el tercer sitio, y la libreta con el boli
  if (o.portatil !== false) { R.rect(172, 104, 188, 116, B_IT.negro); R.rect(173, 105, 187, 115, hex('#b8bec8')); R.rect(173, 105, 187, 105, hex('#dce2ea')); R.rect(187, 105, 187, 115, hex('#8a909a')); R.disco(180, 110, 1, hex('#ccd2dc')); for (let y = 106; y < 115; y++) R.pset(173, y, b_mez(hex('#b8bec8'), hex('#5ae0f0'), 0.4)); }
  R.rect(132, 115, 140, 116, hex('#f2ecd8')); R.linea(134, 114, 139, 116, hex('#2a3a8a'));
}

// la fila del público de espaldas (italiaDelante, 'prensa'): ocho cabezas con chaquetas y sillas tapizadas, en dos
// grupos que dejan libre el pasillo del centro (x 128–194) y los lados
function b_publico(R, t) {
  const PE = [hex('#2a1e16'), hex('#6a4a2a'), hex('#1a1a20'), hex('#a8a8b0'), hex('#8a5a2a'), hex('#3a2a20'), hex('#c8a060'), hex('#2a2228')];
  const RO = [hex('#3a4a6a'), hex('#5a3a3a'), hex('#4a5a4a'), hex('#2a2e3a'), hex('#6a5a48'), hex('#3a3a46'), hex('#7a3a4a'), hex('#2e4a5a')];
  [48, 72, 96, 116, 206, 228, 252, 274].forEach((x, k) => b_nuca(R, t, x, 162 + (k % 2) * 2, PE[k], RO[k], k, k === 2 || k === 6));
}

// ·· prensa, cámara 'mesa' ··
function b_prensaMesa(R, t, o) {
  b_capa(R, 'it-mesa', () => {
    b_yeso(R, 0, 0, 319, 99, B_IT.yeso, B_IT.yesoS, B_IT.yesoL, 7);
    for (let y = 0; y < 100; y++) for (let x = 280; x < 320; x++) if (((x + y) & 1) && h(x, y, 670) < (x - 280) / 60) R.pset(x, y, b_mez(R.pget(x, y), B_IT.yesoD, 0.15));
    b_zocalo(R, 0, 100, 319, 140, 34, [B_IT.salvia, B_IT.salviaS, B_IT.salviaL, B_IT.salviaD]);
    b_ventana(R, 14, 18, 70, 92, 11); b_persiana(R, 0, 15, 8, 96); b_persiana(R, 76, 15, 86, 96);
    // la sombra de la persiana en la pared y la luz que entra por la ventana sobre el zócalo
    for (let y = 100; y < 140; y++) { const d = Math.round((y - 100) * 0.6); for (let x = 20 + d; x < 66 + d; x++) if (((x + y) & 1) === 0) R.pset(x, y, b_mez(R.pget(x, y), hex('#fff4d8'), 0.2)); }
    // el halo de la pantalla
    for (let y = 40; y < 128; y++) for (let x = 156; x < 318; x++) { const d = Math.max(0, Math.max(164 - x, x - 310, 48 - y, y - 120)); if (d > 0 && d < 8 && ((x + y) & 1) && h(x, y, 671) < 0.8 - d * 0.09) R.pset(x, y, b_mez(R.pget(x, y), hex('#bcd8f0'), 0.25)); }
    // una lámpara de pared de latón entre la ventana y la pantalla, con su luz en el yeso
    for (let y = 30; y < 62; y++) for (let x = 120; x < 160; x++) { const d = Math.hypot(x - 140, (y - 38) * 1.4); if (d < 20 && ((x + y) & 1) && h(x, y, 672) < 1 - d / 20) R.pset(x, y, b_mez(R.pget(x, y), hex('#fff2d0'), 0.3)); }
    R.rect(138, 40, 142, 42, B_IT.oroS); R.rect(139, 36, 141, 40, B_IT.oro); R.poligono([[134, 36], [146, 36], [143, 30], [137, 30]], hex('#f4ead0')); R.linea(137, 30, 134, 36, hex('#d8c8a8'));
  });
  b_vistaVida(R, t, 16, 20, 68, 90, 11);
  b_bandera(R, t, 102, 26, 22, 40, 141);
  b_pantalla(R, t, 168, 52, 306, 116, o.pantalla ?? 'satelite', o.giro ?? (o.pantalla === 'reves' ? 0 : 1));
  return { suelo: 145, asientos: [90, 150, 210], mesa: [0, 319, 136], pantalla: [168, 52, 306, 116], ventana: [14, 18, 70, 92], portatil: [171, 120, 189, 134] };
}

// la mesa de cerca (italiaDelante, 'mesa'): el tablero con el mantel visto un poco desde arriba, los pliegues del
// faldón, y en cada sitio el micro de cisne, la cartela en blanco, el vaso y la libreta; las botellas, el portátil
// (PIEZAS_GZ.portatil, con la pantalla hacia nosotros), el ramo de micros de prensa de colores y el móvil que graba
function b_mesaCerca(R, t, o) {
  const habla = o.habla ?? Math.floor(t / 2.6) % 3;
  R.poligono([[-4, 135], [324, 135], [324, 151], [-4, 151]], B_IT.negro);
  for (let y = 136; y <= 150; y++) R.rect(0, y, 319, y, b_mez(B_IT.mantelL, B_IT.mantel, (y - 136) / 14));
  for (let x = 6; x < 320; x += 23) for (let y = 137; y < 150; y++) if (h(x, y, 680) < 0.8) R.pset(x + Math.round((y - 136) * 0.2), y, B_IT.mantelB);
  R.rect(0, 151, 319, 179, B_IT.mantel); R.rect(0, 151, 319, 151, B_IT.mantelB);
  for (let x = 4; x < 320; x += 9) { const sw = Math.round(Math.sin(t * 0.8 + x) * 0.4); for (let y = 152; y < 180; y++) { R.pset(x + sw * (y > 165 ? 1 : 0), y, B_IT.mantelS); R.pset(x + 1, y, B_IT.mantelL); } }
  for (let y = 166; y < 180; y += 2) for (let x = 0; x < 320; x += 2) if (h(x, y, 681) < 0.3) R.pset(x, y, B_IT.mantelS);
  for (const [k, sx] of [[0, 90], [1, 150], [2, 210]]) {
    const on = k === habla; R.rect(sx + 8, 145, sx + 18, 147, B_IT.negro); R.rect(sx + 9, 145, sx + 17, 146, B_IT.grafito); R.pset(sx + 16, 145, on ? (Math.sin(t * 8) > -0.4 ? B_IT.rojo : B_IT.rojoS) : hex('#3a6a3a'));
    for (const [dx, dy] of [[13, 144], [13, 143], [13, 142], [12, 141], [12, 140], [11, 139], [10, 138], [9, 138]]) R.pset(sx + dx, dy, B_IT.metalS);
    R.rect(sx + 5, 136, sx + 8, 138, B_IT.negro); if (on) R.pset(sx + 4, 137, B_IT.rojo);
    R.poligono([[sx - 9, 149], [sx + 5, 149], [sx + 3, 143], [sx - 7, 143]], B_IT.negro); R.poligono([[sx - 8, 148], [sx + 4, 148], [sx + 2, 144], [sx - 6, 144]], hex('#f4f4f0')); R.rect(sx - 5, 146, sx + 1, 146, hex('#9aa0aa'));
    R.rect(sx - 16, 141, sx - 12, 148, B_IT.negro); R.rect(sx - 15, 142, sx - 13, 147, B_IT.cristal); R.rect(sx - 15, 144, sx - 13, 147, B_IT.agua); if (Math.sin(t * 1.7 + k * 2) > 0.7) R.pset(sx - 15, 142, hex('#ffffff'));
    R.poligono([[sx + 20, 148], [sx + 31, 148], [sx + 29, 142], [sx + 20, 142]], B_IT.negro); R.poligono([[sx + 21, 147], [sx + 30, 147], [sx + 28, 143], [sx + 21, 143]], hex('#f2ecd8')); for (let y = 144; y < 147; y += 1) R.rect(sx + 22, y, sx + 27, y, y & 1 ? hex('#c8c0a8') : hex('#f2ecd8'));
  }
  for (const bx of [54, 124, 250]) { R.rect(bx - 2, 131, bx + 2, 148, B_IT.negro); R.rect(bx - 1, 132, bx + 1, 147, B_IT.cristal); R.rect(bx - 1, 138, bx + 1, 147, B_IT.agua); R.pset(bx - 1, 134, B_IT.aguaL); R.rect(bx - 1, 128, bx + 1, 130, hex('#2a6ad8')); R.rect(bx - 2, 130, bx + 2, 130, hex('#1a4ab0')); }
  if (o.portatil !== false && PIEZAS_GZ.portatil) PIEZAS_GZ.portatil(R, 171, 134, { pantalla: o.portatil ?? 'piramide' });
  // el ramo de micrófonos de prensa en sus pies, con espumas de colores (sin logos)
  R.rect(140, 148, 162, 150, B_IT.negro); R.rect(141, 148, 161, 148, B_IT.grafitoL);
  [[142, 140, '#d83a3a'], [147, 138, '#3a7ad8'], [152, 141, '#f0c030'], [157, 139, '#3ab86a'], [161, 141, '#e8e8e8']].forEach(([tx, ty, c], i) => {
    R.linea(tx, ty + 2, 140 + i * 5, 148, B_IT.negro); R.disco(tx, ty, 3, B_IT.negro); R.disco(tx, ty, 2, hex(c)); R.pset(tx - 1, ty - 1, b_mez(hex(c), hex('#ffffff'), 0.5)); R.pset(tx + 1, ty + 1, b_mez(hex(c), hex('#000000'), 0.3)); });
  // el móvil que graba, tumbado, con el punto rojo y el contador
  { const px = 266, py = 139; R.poligono([[px, py + 9], [px + 28, py + 9], [px + 26, py], [px + 2, py]], B_IT.negro); R.rect(px + 3, py + 1, px + 25, py + 8, hex('#1a2030')); R.disco(px + 7, py + 4, 1, Math.sin(t * 4) > -0.3 ? B_IT.rojo : B_IT.rojoS);
    const s = Math.floor(t + 42), mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0'); b_dig(R, mm + ':' + ss, px + 10, py + 2, hex('#ffffff')); R.rect(px + 1, py + 10, px + 27, py + 10, B_IT.mantelS); }
  // el faldón: el ribete claro, el emblema del acto (pirámide y ondas, sin letras) y el cable que cuelga
  R.rect(0, 153, 319, 154, B_IT.mantelB); R.rect(0, 155, 319, 155, B_IT.mantelS);
  { const ex = 160, ey = 170; R.disco(ex, ey, 9, B_IT.mantelS); R.disco(ex, ey, 8, hex('#e8e0c8')); R.poligono([[ex - 6, ey + 3], [ex + 6, ey + 3], [ex, ey - 6]], hex('#c8a060')); R.poligono([[ex, ey - 6], [ex + 6, ey + 3], [ex + 1, ey + 3]], hex('#987040'));
    for (let x = ex - 6; x <= ex + 6; x++) R.pset(x, ey + 5 + Math.round(Math.sin(x * 0.9 + t * 2) * 0.6), hex('#2a8a9a')); }
  for (let y = 151; y < 180; y++) R.pset(298 + Math.round(Math.sin(y * 0.2) * 2 + Math.sin(t * 0.9) * (y - 151) * 0.03), y, B_IT.negro);
}

// ·· vídeo: el estudio casero ··
function b_estudioVideo(R, t, o) {
  b_capa(R, 'it-video', () => {
    b_yeso(R, 0, 0, 319, 141, B_IT.pared2, hex('#b0a48e'), B_IT.pared2L, 21);
    // el friso de tablillas pintadas de abajo (machihembrado), con su moldura
    R.rect(0, 102, 319, 135, hex('#8a9aa4')); for (let x = 0; x < 320; x += 5) { R.rect(x, 105, x, 135, hex('#6e7e88')); R.rect(x + 1, 105, x + 1, 135, hex('#a4b2ba')); }
    for (let y = 106; y < 135; y++) for (let x = 0; x < 320; x++) if (h(x, y, 698) < 0.06) R.pset(x, y, hex('#7a8a94'));
    R.rect(0, 101, 319, 104, hex('#f0ebe0')); R.rect(0, 101, 319, 101, hex('#ffffff')); R.rect(0, 104, 319, 104, hex('#a89c88'));
    R.rect(0, 136, 319, 141, hex('#f0ebe0')); R.rect(0, 136, 319, 136, hex('#ffffff')); R.rect(0, 141, 319, 141, hex('#a89c88'));
    R.rect(226, 128, 234, 134, hex('#ece6da')); R.rect(228, 130, 229, 132, B_IT.negro); R.rect(231, 130, 232, 132, B_IT.negro); R.linea(230, 135, 230, 141, B_IT.negro);
    // la estantería de nogal: baldas con libros (lomos sin letras), plantas, una caja, la pirámide de recuerdo
    R.rect(4, 22, 66, 141, B_IT.nogalS); R.rect(6, 24, 64, 139, hex('#3a281c'));
    for (const y of [24, 48, 72, 96, 120]) { R.rect(6, y + 20, 64, y + 22, B_IT.nogal); R.rect(6, y + 20, 64, y + 20, B_IT.nogalL);
      let x = 8; while (x < 60) { const r = h(x, y, 690); if (r < 0.12 && x < 52) { R.poligono([[x, y + 19], [x + 9, y + 19], [x + 4.5, y + 11]], hex('#e0c890')); R.linea(x + 4.5, y + 11, x + 9, y + 19, hex('#a8844e')); x += 11; continue; }
        if (r < 0.22 && x < 54) { R.rect(x + 1, y + 14, x + 6, y + 19, hex('#b8603a')); R.rect(x + 1, y + 14, x + 6, y + 14, hex('#d8805a')); for (let i = 0; i < 6; i++) R.pset(x + 1 + i, y + 13 - (i % 3), i & 1 ? hex('#4a8a3a') : hex('#6aaa4a')); x += 9; continue; }
        const w = 2 + Math.floor(h(x, y, 691) * 3), al = 10 + Math.floor(h(x, y, 692) * 8), c = ['#8a2a2a', '#2a4a7a', '#3a6a4a', '#c8a050', '#5a3a6a', '#d8d0c0', '#2a2a2a'].map(hex)[Math.floor(h(x, y, 693) * 7)];
        const incl = h(x, y, 694) < 0.1; if (incl) { R.linea(x, y + 19, x + al * 0.6, y + 19 - al * 0.8, c); x += 6; continue; }
        R.rect(x, y + 20 - al, x + w - 1, y + 19, c); R.rect(x, y + 20 - al, x, y + 19, b_mez(c, hex('#ffffff'), 0.25)); R.rect(x, y + 22 - al, x + w - 1, y + 22 - al, b_mez(c, hex('#ffd890'), 0.5)); x += w; } }
    R.rect(4, 22, 66, 23, B_IT.nogalL);
    // la ventana con el estor a medio bajar y los tejados al anochecer
    b_ventana(R, 78, 30, 108, 80, 23, true); R.rect(76, 27, 110, 29, hex('#d8d0c0')); for (let y = 30; y < 50; y++) R.rect(78, y, 108, y, y % 4 ? hex('#ece6d8') : hex('#d4ccbc')); R.rect(78, 50, 108, 51, hex('#bcb4a4')); R.disco(93, 53, 1, hex('#8a8478'));
    // los paneles de espuma acústica (piramidal)
    for (let py = 0; py < 2; py++) for (let px = 0; px < 3; px++) { const ax = 120 + px * 18, ay = 26 + py * 16; R.rect(ax, ay, ax + 16, ay + 14, B_IT.espuma);
      for (let j = 0; j < 14; j += 4) for (let i = 0; i < 16; i += 4) { R.pset(ax + i + 2, ay + j + 1, B_IT.espumaL); R.pset(ax + i + 1, ay + j + 2, B_IT.espumaL); R.pset(ax + i + 3, ay + j + 3, hex('#24262c')); R.pset(ax + i + 2, ay + j + 3, hex('#2c2e34')); } }
    // un póster enmarcado (una pirámide al atardecer, sin letras) y el interruptor
    R.rect(152, 64, 186, 96, B_IT.negro); R.rect(153, 65, 185, 95, hex('#f2ecdc')); for (let y = 68; y < 92; y++) R.rect(156, y, 182, y, b_mez(hex('#f0a060'), hex('#6a4a8a'), (92 - y) / 26));
    R.disco(176, 76, 3, hex('#ffe0a0')); R.poligono([[158, 92], [180, 92], [168, 76]], hex('#c8804a')); R.poligono([[168, 76], [180, 92], [170, 92]], hex('#8a4a3a')); R.rect(156, 90, 182, 91, hex('#e0a060'));
    R.rect(196, 98, 200, 104, hex('#ece6da')); R.rect(197, 100, 199, 102, hex('#c8c0b0'));
    // la pantalla verde a medio recoger: el soporte, la tela con arrugas y el rollo de abajo con su pinza
    R.rect(214, 24, 266, 25, B_IT.metalS); for (const sx of [214, 266]) { R.rect(sx - 1, 24, sx, 136, B_IT.metalS); R.linea(sx, 136, sx - 7, 141, B_IT.metalS); R.linea(sx, 136, sx + 7, 141, B_IT.metalS); }
    for (let y = 26; y < 96; y++) for (let x = 216; x < 265; x++) { const w = Math.sin(x * 0.45 + y * 0.05) + Math.sin(x * 0.13 - y * 0.09) * 0.8; R.pset(x, y, w > 1 ? B_IT.cromaL : w < -0.9 ? B_IT.cromaS : B_IT.croma); }
    R.rect(215, 96, 265, 101, B_IT.cromaS); R.rect(215, 96, 265, 97, B_IT.croma); R.rect(215, 101, 265, 101, hex('#1a5024')); R.rect(238, 94, 242, 99, B_IT.negro); R.rect(239, 95, 241, 96, hex('#e0a020'));
    // el escritorio con el monitor (la pantalla se pinta encima), el teclado, la lámpara y el vaso de lápices
    R.rect(262, 118, 319, 122, B_IT.negro); R.rect(262, 118, 319, 120, hex('#c8a07a')); R.rect(262, 118, 319, 118, hex('#e0bc94')); R.rect(264, 122, 266, 150, B_IT.negro); R.rect(314, 122, 316, 150, B_IT.negro);
    R.rect(286, 112, 294, 117, B_IT.grafito); R.rect(282, 116, 298, 117, B_IT.negro);
    R.rect(272, 115, 280, 117, B_IT.grafito); for (let x = 273; x < 280; x += 2) R.pset(x, 116, B_IT.grafitoL);
    // el suelo de tarima con juntas y veta, la alfombra
    for (let y = 142; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 142) / 5), off = (f * 37) % 60, junta = (y - 142) % 5 === 0 || (x + off) % 60 === 0;
      R.pset(x, y, junta ? B_IT.robleD : h(x >> 3, y, 695) < 0.3 ? B_IT.robleS : h(x, y, 696) < 0.08 ? B_IT.robleL : B_IT.roble); }
    R.rect(100, 146, 200, 166, hex('#7a3a3a')); R.rect(102, 148, 198, 164, hex('#a85a4a')); for (let x = 106; x < 196; x += 6) for (let y = 151; y < 162; y += 5) R.pset(x + (y & 2), y, hex('#e0b070')); R.rect(102, 148, 198, 148, hex('#c87a62'));
    for (let y = 146; y <= 166; y += 2) { R.pset(99, y, hex('#e0c8a0')); R.pset(201, y, hex('#e0c8a0')); }
  });
  // la luz del foco de aro sobre la pared y el sitio del que habla
  for (let y = 70; y < 150; y++) for (let x = 108; x < 184; x++) if (((x + y) & 1) === 0 && h(x, y, 697) < 0.55 - Math.hypot(x - 144, y - 112) / 90) R.pset(x, y, b_mez(R.pget(x, y), hex('#fff6e8'), 0.18));
  b_vistaVida(R, t, 80, 52, 106, 78, 23, true);
  // el foco de aro: el anillo que brilla con su chispa que gira, el soporte y el móvil en el centro
  { const cx = 100, cy = 94, r = 11; for (let a = 0; a < 6.283; a += 0.04) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); R.pset(x, y, hex('#fffaf0')); R.pset(Math.round(cx + Math.cos(a) * (r + 1)), Math.round(cy + Math.sin(a) * (r + 1)), hex('#c8c0b0')); R.pset(Math.round(cx + Math.cos(a) * (r - 1)), Math.round(cy + Math.sin(a) * (r - 1)), hex('#e8e0d0')); }
    const a = t * 1.5; R.pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#ffffff')); R.rect(cx - 2, cy - 4, cx + 2, cy + 4, B_IT.negro); R.rect(cx - 1, cy - 3, cx + 1, cy + 3, hex('#3a5a8a'));
    R.rect(cx, cy + r + 1, cx, 144, B_IT.metalS); R.linea(cx, 144, cx - 8, 150, B_IT.metalS); R.linea(cx, 144, cx + 8, 150, B_IT.metalS); R.linea(cx, 144, cx + 1, 150, B_IT.metal); }
  // la planta junto a la estantería: la maceta y las hojas que se mecen
  { R.rect(70, 128, 82, 141, B_IT.negro); R.rect(71, 129, 81, 141, hex('#c8704a')); R.rect(71, 129, 81, 130, hex('#e08a5a')); R.rect(79, 131, 80, 140, hex('#a85a3a'));
    for (let k = 0; k < 9; k++) { const a = -2.6 + k * 0.33 + Math.sin(t * 1.3 + k) * 0.06, L = 10 + (k % 3) * 4; for (let i = 2; i < L; i++) R.pset(Math.round(76 + Math.cos(a) * i), Math.round(128 + Math.sin(a) * i), i > L - 3 ? hex('#7aba5a') : k & 1 ? hex('#3a7a3a') : hex('#4a9a4a')); } }
  // la cámara en su trípode, con la pantallita abatible que muestra al que habla
  b_camaraTripode(R, t, 196, 158, -1, 34);
  { const sx = 203, sy = 117; R.rect(sx, sy, sx + 8, sy + 6, B_IT.negro); R.rect(sx + 1, sy + 1, sx + 7, sy + 5, hex('#7a8a9a')); R.rect(sx + 3, sy + 2, sx + 5, sy + 3, hex('#2a1c14')); R.rect(sx + 3, sy + 4, sx + 5, sy + 5, hex('#4a5a7a')); }
  // el monitor del escritorio con el plano azul, la taza que humea
  b_pantalla(R, t, 270, 86, 310, 110, o.pantalla ?? 'plano', o.giro ?? 1, false);
  { R.rect(302, 112, 307, 117, B_IT.negro); R.rect(303, 113, 306, 117, hex('#e8e4da')); R.rect(307, 113, 308, 115, B_IT.negro); for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1; R.pset(Math.round(304 + Math.sin(t * 2 + k * 2) * 1.5), Math.round(111 - u * 12), b_mez(R.pget(304, 111 - u * 12), hex('#ffffff'), 0.6 * (1 - u))); } }
  return { suelo: 152, actor: [113, 165], foco: [100, 94], camara: [196, 158], monitor: [270, 86, 310, 110], escritorio: [262, 319, 118], poster: [152, 64, 186, 96] };
}

// el cable negro que cruza el suelo del estudio, de la cámara al enchufe (por delante de los pies, sin tapar nada)
function b_cableSuelo(R, t) { for (let x = 150; x < 320; x++) R.pset(x, Math.round(172 + Math.sin(x * 0.06) * 3), B_IT.negro); R.rect(296, 168, 316, 173, B_IT.negro); R.rect(297, 169, 315, 172, hex('#e8e4da')); for (let i = 0; i < 4; i++) R.pset(300 + i * 4, 170, i === 0 ? (Math.sin(t * 2) > 0 ? B_IT.rojo : B_IT.rojoS) : B_IT.negro); }

// ·· vídeo, cámara 'movil': las pantallas del mundo ··
// el plano azul en pequeño (para teles y móviles): fondo, la pirámide, la superficie y los pozos que bajan
function b_miniPlano(R, t, x0, y0, x1, y1, on) {
  const cl = [x0, y0, x1, y1]; if (!on) { b_rc(R, cl, x0, y0, x1, y1, hex('#14161c')); for (let i = 0; i < Math.min(x1 - x0, y1 - y0); i += 1) R.pset(x0 + 3 + i, y0 + i, hex('#262a34')); return; }
  const W = x1 - x0, H = y1 - y0, g = y0 + Math.round(H * 0.46), b = Math.max(2, Math.round((g - y0 - 1) * 1.2)), cx = Math.round(x0 + W * 0.5);
  R.recorte(cl); b_rc(R, cl, x0, y0, x1, y1, C.planoFondo);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x - x0) % 4 === 0 && (y & 1)) || ((y - y0) % 4 === 0 && (x & 1))) R.pset(x, y, C.planoRejilla);
  for (let y = y0 + 1; y <= g; y++) { const w = Math.round((y - y0 - 1) / Math.max(1, g - y0 - 1) * b); for (let x = cx - w; x <= cx + w; x++) if ((x + y) % 2 === 0) R.pset(x, y, b_mez(C.planoFondo, C.planoLinea, 0.35)); }
  R.linea(cx - b, g, cx, y0 + 1, C.planoLinea); R.linea(cx, y0 + 1, cx + b, g, C.planoBrillo); R.linea(x0, g, x1, g, C.planoLinea);
  const n = H > 16 ? 6 : 4, paso = Math.floor(t * 6);
  for (let i = 0; i < n; i++) { const sx = Math.round(cx - b * 0.8 + i * (b * 1.6) / (n - 1)); R.linea(sx, g + 2, sx, y1 - 1, C.planoLinea); for (let y = g + 2 + ((paso + i) % 3); y < y1; y += 3) R.pset(sx + 1, y, C.planoBrillo); }
  { const ys = y1 - Math.round((t * 6) % (H + 1)); for (let x = x0; x <= x1; x += 2) R.pset(x, ys, b_mez(R.pget(x, ys), C.planoBrillo, 0.4)); }
  R.recorte(null);
}

function b_movil(R, t, o) {
  const n = o.n ?? 1, enc = (i) => i < Math.round(n * 9);
  b_capa(R, 'it-movil', () => {
    // el mapamundi de puntos
    R.rect(0, 0, 319, 179, B_IT.mapa);
    const tierra = (u, v) => { const E = [[0.18, 0.32, 0.1, 0.14], [0.26, 0.62, 0.06, 0.16], [0.5, 0.28, 0.06, 0.08], [0.53, 0.55, 0.07, 0.16], [0.7, 0.3, 0.16, 0.12], [0.84, 0.66, 0.06, 0.06], [0.75, 0.48, 0.05, 0.06]]; return E.some(([a, b, c, d]) => ((u - a) / c) ** 2 + ((v - b) / d) ** 2 < 1 - h(Math.floor(u * 60), Math.floor(v * 40), 700) * 0.3); };
    for (let y = 2; y < 180; y += 3) for (let x = 2; x < 320; x += 3) { const ti = tierra(x / 320, y / 180); R.pset(x, y, ti ? B_IT.mapaL : B_IT.mapaD); if (ti) R.pset(x + 1, y, hex('#22385e')); }
    for (let y = 2; y < 180; y += 30) for (let x = 0; x < 320; x += 2) R.pset(x, y, hex('#142040')); for (let x = 10; x < 320; x += 40) for (let y = 0; y < 180; y += 2) R.pset(x, y, hex('#142040'));
    // las tres ventanas al mundo
    for (const [x0, k] of [[8, 0], [113, 1], [218, 2]]) { R.rect(x0 + 3, 51, x0 + 97, 159, hex('#060a14')); R.rect(x0 - 2, 46, x0 + 94, 156, hex('#cfc6b4')); R.rect(x0 - 2, 46, x0 + 94, 46, hex('#ece4d4')); R.rect(x0 - 1, 47, x0 + 93, 155, hex('#a89e8a')); b_cuarto(R, x0, 48, x0 + 92, 154, k); }
  });
  // las señales que salen de Italia hacia cada ventana
  { const ix = 166, iy = 30, ro = (t * 8) % 10; for (let a = 0; a < 6.28; a += 0.2) R.pset(Math.round(ix + Math.cos(a) * ro), Math.round(iy + Math.sin(a) * ro * 0.6), b_mez(B_IT.mapa, B_IT.pin, 0.6 * (1 - ro / 10)));
    for (const [tx, ty, k] of [[54, 46, 0], [160, 46, 1], [264, 46, 2]]) { if (!enc(k * 3)) continue; const N = 40, pulso = (t * 0.8 + k * 0.3) % 1;
      for (let i = 0; i <= N; i++) { const u = i / N, x = Math.round(ix + (tx - ix) * u), y = Math.round(iy + (ty - iy) * u - Math.sin(u * Math.PI) * 12); if (y > 44) continue; R.pset(x, y, i % 2 ? b_mez(B_IT.mapa, B_IT.pin, 0.45) : b_mez(B_IT.mapa, B_IT.pin, 0.75)); if (Math.abs(u - pulso) < 0.03) R.disco(x, y, 1, hex('#fff4c0')); } }
    R.disco(ix, iy, 3, hex('#1a1408')); R.disco(ix, iy, 2, B_IT.pin); R.pset(ix - 1, iy - 1, hex('#fff4c0')); }
  // la vida de cada cuarto y sus pantallas
  b_cuartoVida(R, t, 8, 48, 100, 154, 0, enc(0)); b_cuartoVida(R, t, 113, 48, 205, 154, 1, enc(3)); b_cuartoVida(R, t, 218, 48, 310, 154, 2, enc(6));
  // los seis móviles tumbados de abajo
  for (let i = 0; i < 6; i++) { const x = 14 + i * 50, y = 162, idx = [1, 2, 4, 5, 7, 8][i];
    R.rect(x, y, x + 30, y + 15, B_IT.negro); R.rect(x + 1, y + 1, x + 29, y + 14, hex('#2a2c34')); R.pset(x + 29, y + 7, hex('#4a4c56'));
    b_miniPlano(R, t + i, x + 3, y + 2, x + 27, y + 13, enc(idx));
    if (enc(idx) && Math.sin(t * 2 + i) > 0.6) { R.rect(x + 3, y + 2, x + 13, y + 4, hex('#f2f2f6')); R.rect(x + 4, y + 3, x + 6, y + 3, hex('#d83a3a')); R.rect(x + 8, y + 3, x + 12, y + 3, hex('#9aa0aa')); } }
  return { suelo: 152, cuartos: [[8, 48, 100, 154], [113, 48, 205, 154], [218, 48, 310, 154]], sueloCuarto: 146, sitios: [[30, 146], [182, 146], [292, 146]], pantallas: [[38, 66, 74, 90], [143, 58, 175, 72], [264, 60, 298, 80]] };
}

// el fondo fijo de cada cuarto (k 0: cocina de mañana; 1: vagón de metro; 2: bar de noche) dentro de (x0, y0)–(x1, y1)
function b_cuarto(R, x0, y0, x1, y1, k) {
  const cl = [x0, y0, x1, y1], rc = (a, b, c, d, col) => b_rc(R, cl, a, b, c, d, col), suelo = y1 - 8;
  if (k === 0) {
    rc(x0, y0, x1, suelo, hex('#f2ecd8')); for (let y = y0 + 40; y < suelo - 20; y += 4) for (let x = x0 + ((y >> 2) & 1) * 4; x < x1; x += 8) { rc(x, y, x + 7, y + 3, hex('#e8f0f2')); rc(x, y + 3, x + 7, y + 3, hex('#c8d4d8')); rc(x + 7, y, x + 7, y + 3, hex('#c8d4d8')); }
    rc(x0, y0, x1, y0 + 14, hex('#8aa8b8')); for (let x = x0 + 2; x < x1; x += 15) { rc(x, y0 + 1, x + 13, y0 + 13, hex('#a8c4d0')); rc(x, y0 + 13, x + 13, y0 + 13, hex('#6a8898')); rc(x + 6, y0 + 9, x + 8, y0 + 9, hex('#e0e4e8')); }
    rc(x0 + 56, y0 + 18, x0 + 84, y0 + 40, hex('#ffffff')); rc(x0 + 57, y0 + 19, x0 + 83, y0 + 39, hex('#fff0c0')); rc(x0 + 57, y0 + 31, x0 + 83, y0 + 39, hex('#a8d8a0')); R.recorte([x0 + 57, y0 + 19, x0 + 83, y0 + 39]); R.disco(x0 + 64, y0 + 26, 4, hex('#ffd860')); R.recorte(null); rc(x0 + 70, y0 + 19, x0 + 70, y0 + 39, hex('#ffffff'));
    rc(x0 + 2, y0 + 16, x0 + 18, suelo, hex('#dcdcd8')); rc(x0 + 2, y0 + 16, x0 + 4, suelo, hex('#f2f2f0')); rc(x0 + 2, y0 + 44, x0 + 18, y0 + 44, hex('#a8a8a4')); rc(x0 + 15, y0 + 30, x0 + 16, y0 + 40, hex('#8a8a86')); rc(x0 + 15, y0 + 48, x0 + 16, y0 + 56, hex('#8a8a86'));
    rc(x0 + 20, suelo - 22, x1, suelo - 20, hex('#5a4a3a')); rc(x0 + 20, suelo - 19, x1, suelo, hex('#c8a07a')); for (let x = x0 + 24; x < x1; x += 14) { rc(x, suelo - 17, x + 11, suelo - 2, hex('#b08a64')); rc(x + 5, suelo - 15, x + 6, suelo - 15, hex('#e0e0e0')); }
    rc(x0 + 70, suelo - 32, x0 + 80, suelo - 22, hex('#2a2a30')); rc(x0 + 72, suelo - 26, x0 + 75, suelo - 22, hex('#f2f2f2'));
    for (let y = suelo + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x >> 2) + (y >> 2)) & 1 ? hex('#e8e0d0') : hex('#5a5a62'));
  } else if (k === 1) {
    rc(x0, y0, x1, y1, hex('#c8ccd0')); rc(x0, y0, x1, y0 + 8, hex('#e8ecf0')); for (let x = x0 + 4; x < x1; x += 10) rc(x, y0 + 2, x + 6, y0 + 3, hex('#ffffff'));
    for (const wx of [x0 + 6, x0 + 58]) { rc(wx, y0 + 30, wx + 28, y0 + 52, hex('#5a6068')); rc(wx + 2, y0 + 32, wx + 26, y0 + 50, hex('#14161e')); }
    rc(x0 + 36, y0 + 26, x0 + 56, suelo, hex('#9aa0a8')); rc(x0 + 37, y0 + 27, x0 + 45, suelo, hex('#b8c0c8')); rc(x0 + 47, y0 + 27, x0 + 55, suelo, hex('#b8c0c8')); rc(x0 + 46, y0 + 27, x0 + 46, suelo, hex('#4a4e56')); rc(x0 + 39, y0 + 34, x0 + 43, y0 + 48, hex('#3a3e48')); rc(x0 + 49, y0 + 34, x0 + 53, y0 + 48, hex('#3a3e48'));
    rc(x0 + 28, y0 + 8, x0 + 64, y0 + 26, hex('#2a2c34'));
    rc(x0, y0 + 56, x1, y0 + 57, hex('#8a9098')); rc(x0 + 2, suelo - 14, x0 + 32, suelo - 9, hex('#2a6aa8')); rc(x0 + 60, suelo - 14, x1 - 2, suelo - 9, hex('#2a6aa8')); rc(x0 + 2, suelo - 14, x0 + 32, suelo - 14, hex('#4a8ac8')); rc(x0 + 60, suelo - 14, x1 - 2, suelo - 14, hex('#4a8ac8'));
    rc(x0 + 4, suelo - 8, x0 + 6, suelo, hex('#6a7078')); rc(x0 + 86, suelo - 8, x0 + 88, suelo, hex('#6a7078'));
    rc(x0 + 33, y0 + 9, x0 + 34, suelo, hex('#e0c040')); rc(x0 + 33, y0 + 9, x0 + 33, suelo, hex('#fff080'));
    for (let y = suelo + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 710) < 0.2 ? hex('#5a5e66') : hex('#6a6e76'));
  } else {
    rc(x0, y0, x1, suelo, hex('#4a2a2a')); for (let x = x0; x < x1; x += 6) rc(x, y0, x, suelo, hex('#3a2020'));
    rc(x0 + 4, y0 + 40, x0 + 60, y0 + 62, hex('#2a1810')); for (const sy of [y0 + 46, y0 + 56]) { rc(x0 + 4, sy + 5, x0 + 60, sy + 6, hex('#8a5a3a'));
      for (let bx = x0 + 6; bx < x0 + 58; bx += 4) { const c = ['#3a8a4a', '#c8a040', '#8a2a2a', '#e0e0d0', '#5a3a1a'].map(hex)[Math.floor(h(bx, sy, 711) * 5)]; rc(bx, sy, bx + 2, sy + 4, c); rc(bx + 1, sy - 2, bx + 1, sy, c); R.pset(bx, sy + 1, b_mez(c, hex('#ffffff'), 0.5)); } }
    for (let x = x0 + 4; x <= x0 + 60; x++) R.pset(x, y0 + 40, hex('#ffb060'));
    rc(x0, suelo - 22, x1, suelo, hex('#6a3a1e')); rc(x0, suelo - 22, x1, suelo - 20, hex('#a8683a')); rc(x0, suelo - 20, x1, suelo - 20, hex('#d8985a')); for (let x = x0 + 3; x < x1; x += 10) rc(x, suelo - 17, x + 7, suelo - 2, hex('#5a3018'));
    rc(x0 + 64, suelo - 34, x0 + 84, suelo - 22, hex('#c8ccd0')); rc(x0 + 64, suelo - 34, x0 + 84, suelo - 33, hex('#ffffff')); rc(x0 + 68, suelo - 28, x0 + 70, suelo - 23, hex('#2a2a30')); rc(x0 + 78, suelo - 28, x0 + 80, suelo - 23, hex('#2a2a30')); rc(x0 + 72, suelo - 31, x0 + 76, suelo - 29, hex('#e03a3a'));
    for (const sx of [x0 + 14, x0 + 44]) { rc(sx - 4, suelo + 1, sx + 4, suelo + 2, hex('#2a2a30')); }
    for (let y = suelo + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x + y * 3) >> 3) & 1 ? hex('#3a2418') : hex('#4a2e1e'));
  }
}

// lo que se mueve en cada cuarto: la tele o la pantalla con el plano azul (on), el reloj con su hora, el vapor del café,
// el árbol de la ventana; en el metro, las luces del túnel que corren y las asas que se mecen; en el bar, el ventilador
// del techo y el neón de una copa (sin letras)
function b_cuartoVida(R, t, x0, y0, x1, y1, k, on) {
  const cl = [x0, y0, x1, y1], suelo = y1 - 8;
  if (k === 0) {
    R.recorte([x0 + 57, y0 + 19, x0 + 83, y0 + 39]); for (let i = 0; i < 6; i++) R.disco(x0 + 78 + Math.round(Math.sin(t * 1.2 + i) * 1), y0 + 28 + i, 3 - (i >> 1), i & 1 ? hex('#4a8a3a') : hex('#6aaa4a')); R.recorte(null);
    b_rc(R, cl, x0 + 28, y0 + 16, x0 + 68, y0 + 44, B_IT.negro); b_miniPlano(R, t, x0 + 30, y0 + 18, x0 + 66, y0 + 42, on); b_rc(R, cl, x0 + 46, y0 + 45, x0 + 50, y0 + 46, B_IT.grafito);
    b_rc(R, cl, x0 + 22, suelo - 40, x0 + 40, suelo - 34, hex('#1a1a20')); b_dig(R, '7:15', x0 + 24, suelo - 39, hex('#5aff8a'));
    for (let i = 0; i < 4; i++) { const u = (t * 0.7 + i / 4) % 1; R.pset(Math.round(x0 + 75 + Math.sin(t * 2 + i * 2) * 1.5), Math.round(suelo - 33 - u * 12), b_mez(hex('#f2ecd8'), hex('#ffffff'), 1 - u)); }
  } else if (k === 1) {
    for (const wx of [x0 + 8, x0 + 60]) { R.recorte([wx, y0 + 32, wx + 24, y0 + 50]); for (let i = 0; i < 4; i++) { const lx = wx + 30 - ((t * 90 + i * 17) % 50); R.linea(lx, y0 + 38 + (i & 1) * 6, lx + 9, y0 + 38 + (i & 1) * 6, i & 1 ? hex('#f0d080') : hex('#a8c8ff')); } R.recorte(null); }
    b_miniPlano(R, t, x0 + 30, y0 + 10, x0 + 62, y0 + 24, on);
    for (let i = 0; i < 6; i++) { const ax = x0 + 6 + i * 15 + (i > 1 ? 30 : 0); if (ax > x1 - 4) continue; const sw = Math.round(Math.sin(t * 2.2 + i * 0.4) * 1.5); R.linea(ax, y0 + 9, ax + sw, y0 + 16, hex('#9aa0a8')); R.disco(ax + sw, y0 + 19, 2, hex('#e8e8ea')); R.disco(ax + sw, y0 + 19, 1, hex('#c8ccd0')); }
    b_rc(R, cl, x0 + 66, y0 + 13, x0 + 88, y0 + 21, hex('#1a1a20')); b_dig(R, '18:40', x0 + 67, y0 + 15, hex('#ffb040'));
  } else {
    b_rc(R, cl, x0 + 44, y0 + 10, x0 + 82, y0 + 34, B_IT.negro); b_miniPlano(R, t, x0 + 46, y0 + 12, x0 + 80, y0 + 32, on); R.linea(x0 + 63, y0 + 2, x0 + 63, y0 + 10, B_IT.grafito);
    { const cx = x0 + 20, cy = y0 + 8, a = t * 7; R.rect(cx - 1, y0, cx, cy, B_IT.grafito); for (let s = 0; s < 3; s++) { const an = a + s * 2.094, ex = Math.round(Math.cos(an) * 12); R.linea(cx, cy, cx + ex, cy + Math.round(Math.sin(an) * 1.5), hex('#6a4a2a')); } R.disco(cx, cy, 2, hex('#c8a040')); }
    { const nx = x0 + 18, ny = y0 + 22, c = Math.sin(t * 5) > -0.7 ? hex('#ff5ac8') : hex('#8a2a6a'); R.linea(nx - 6, ny, nx + 6, ny, c); R.linea(nx - 6, ny, nx, ny + 7, c); R.linea(nx + 6, ny, nx, ny + 7, c); R.linea(nx, ny + 7, nx, ny + 12, c); R.linea(nx - 4, ny + 12, nx + 4, ny + 12, c); R.pset(nx + 3, ny - 2, hex('#5affe0')); }
    b_rc(R, cl, x0 + 66, y0 + 40, x0 + 88, y0 + 48, hex('#1a1a20')); b_dig(R, '22:05', x0 + 67, y0 + 42, hex('#ff5a5a'));
    for (let i = 0; i < 5; i++) { const u = (t * 0.8 + i / 5) % 1; R.pset(Math.round(x0 + 74 + Math.sin(t * 2 + i * 2) * 2), Math.round(suelo - 35 - u * 10), b_mez(hex('#4a2a2a'), hex('#ffffff'), 0.8 * (1 - u))); }
  }
}

// los tonos del plano azul (solo para él): fondo, rejilla, halo, cian, brillo, magenta de lo «nuevo», blanco de lo real,
// el agua de la pecera y el pececito
const c_PZ = pal({
  f0: '#050c22', f1: '#08142e', f2: '#0c1a3a', f3: '#102248', f4: '#162d58', rj: '#132c56', rjM: '#1c3c70', rjC: '#2a568e',
  hal: '#113a62', hal2: '#1a5a88', co: '#2a8ab6', ci: '#5ae0f0', br: '#c8fbff', mg: '#e67ad8', mgO: '#8a4096', mgH: '#3a1c58',
  bl: '#f6f9ff', blO: '#a6b4d4', blH: '#34446c', ag0: '#0e3070', ag1: '#1a52a0', ag2: '#3a88d6', ag3: '#9ad6ff', pez: '#ffa848', pezS: '#c86a2a',
});

// las capas fijas del plano (un búfer por encuadre y cámara)
const c_capas = new Map();

// trama de Bayer 4×4 y el tono tramado de una rampa
const c_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

const c_tono = (r, v, x, y) => { let l = Math.floor(v); if (v - l > c_b4(x, y)) l++; return r[l < 0 ? 0 : l >= r.length ? r.length - 1 : l]; };

const c_cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// recorre los píxeles de un segmento (Bresenham) y llama a fn(x, y, i)
function c_raster(x0, y0, x1, y1, fn) {
  x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let e = dx + dy, i = 0;
  for (;;) { fn(x0, y0, i++); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } }
}

// la pluma del plano: junta los trazos y los pinta en dos pasadas (todo el halo y luego los núcleos, para que un halo no
// tape otra línea), con un brillo que corre por las líneas; luego los números. Tipos: 'c' cian, 'b' brillo, 'd' cian
// apagado sin halo, 'D' rejilla clara sin halo, 'm' magenta, 'w' blanco (lo real), 'a' agua. pt: punteado (periodo).
function c_pluma(R) {
  const L = [], N = [];
  const P = {
    l(x0, y0, x1, y1, k = 'c', pt = 0) { L.push([x0, y0, x1, y1, k, pt]); },
    p(x, y, k = 'c') { L.push([x, y, x, y, k, 0]); },
    caja(x0, y0, x1, y1, k = 'c', pt = 0) { P.l(x0, y0, x1, y0, k, pt); P.l(x1, y0, x1, y1, k, pt); P.l(x1, y1, x0, y1, k, pt); P.l(x0, y1, x0, y0, k, pt); },
    poli(pts, k = 'c', pt = 0, n = pts.length) { for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; P.l(a[0], a[1], b[0], b[1], k, pt); } },
    // una línea dibujada hasta la fracción u (para lo que se va trazando)
    parte(x0, y0, x1, y1, u, k = 'c', pt = 0) { if (u <= 0) return; u = Math.min(1, u); P.l(x0, y0, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, k, pt); if (u < 1) P.p(Math.round(x0 + (x1 - x0) * u), Math.round(y0 + (y1 - y0) * u), 'b'); },
    // flecha (punta de 3 px) en (x, y) hacia dx, dy (−1, 0, 1)
    flecha(x, y, dx, dy, k = 'c') { if (dy) { P.l(x - 2, y - 2 * dy, x, y, k); P.l(x + 2, y - 2 * dy, x, y, k); } else { P.l(x - 2 * dx, y - 2, x, y, k); P.l(x - 2 * dx, y + 2, x, y, k); } },
    // cota vertical con flechas y topes; el número, a su lado
    cotaV(x, y0, y1, k = 'c', num = null, nx = x + 4, ny = (y0 + y1) / 2 + 4, col = c_PZ.ci) {
      P.l(x, y0 + 1, x, y1 - 1, k); P.flecha(x, y0 + 1, 0, -1, k); P.flecha(x, y1 - 1, 0, 1, k); P.l(x - 3, y0, x + 3, y0, 'd'); P.l(x - 3, y1, x + 3, y1, 'd');
      if (num != null) P.n(num, nx, ny, col);
    },
    n(txt, x, y, col = c_PZ.ci) { N.push([String(txt), Math.round(x), Math.round(y), col]); },
    pintar(t, tenue) {
      const PZ = c_PZ;
      const HALO = { c: PZ.hal, b: PZ.hal2, m: PZ.mgH, w: PZ.blH, a: PZ.ag0 };
      const NUC = { e: tenue ? PZ.co : PZ.ci, c: tenue ? PZ.co : PZ.ci, b: tenue ? PZ.ci : PZ.br, d: PZ.co, D: PZ.rjC, m: tenue ? PZ.mgO : PZ.mg, w: PZ.bl, a: PZ.ag3 };
      for (const [x0, y0, x1, y1, k, pt] of L) { const hc = HALO[k]; if (!hc) continue;
        c_raster(x0, y0, x1, y1, (x, y, i) => { if (pt && i % pt >= pt / 2) return; R.pset(x + 1, y, hc); R.pset(x - 1, y, hc); R.pset(x, y + 1, hc); R.pset(x, y - 1, hc); }); }
      const fase = Math.floor(t * 30); let s = 0;
      for (const [x0, y0, x1, y1, k, pt] of L) { const c = NUC[k], corre = k === 'c' || k === 'm' || k === 'w';
        c_raster(x0, y0, x1, y1, (x, y, i) => { if (pt && i % pt >= pt / 2) return; R.pset(x, y, corre && ((s + i + 4000 - fase) % 83) < 3 ? (k === 'm' ? PZ.bl : PZ.br) : c); });
        s += 23; }
      for (const [txt, x, y, col] of N) R.numero(txt, x, y, { fina: true, color: tenue ? c_PZ.co : col });
    },
  };
  return P;
}

// el fondo común del plano: degradado tramado con motas y líneas de barrido fijas, la rejilla (si rejilla), el marco
// con reglillas, el cajetín y la tarima del holograma; extra() añade lo fijo de cada encuadre
function c_planoFondo(R, clave, rejilla, extra) {
  let b = c_capas.get(clave);
  if (!b) {
    b = R.nuevo(); const prev = R.usar(b), PZ = c_PZ, F = [PZ.f0, PZ.f1, PZ.f2, PZ.f3];
    for (let y = 0; y < 160; y++) for (let x = 0; x < 320; x++) {
      const d = Math.hypot((x - 160) / 190, (y - 86) / 120);
      let v = 0.5 + 1.0 * (1 - y / 200) + 1.3 * (1 - d) - (y % 3 === 0 ? 0.35 : 0);
      let c = c_tono(F, v, x, y);
      if (h(x, y, 3) > 0.993) c = PZ.f4;
      if (rejilla) {
        const gx = (x + 16) % 32 === 0, gy = (y + 16) % 32 === 0;
        if (gx || gy) c = (gx && gy) ? PZ.rjC : PZ.rjM;
        else if ((x % 8 === 0 || y % 8 === 0) && (x + y) % 2 === 0) c = PZ.rj;
        if (((x + 16) % 32 === 0 && Math.abs((y + 16) % 32 - 16) === 16 - 2) || ((y + 16) % 32 === 0 && Math.abs((x + 16) % 32 - 16) === 16 - 2)) c = PZ.rjC;
      }
      R.pset(x, y, c);
    }
    // la luz que sube de la tarima
    for (let y = 146; y < 160; y++) for (let x = 6; x < 314; x++) if ((y - 146) / 14 > c_b4(x, y) + 0.25 && y % 2 === 0) R.pset(x, y, (x + y) % 4 === 0 ? PZ.f4 : PZ.f3);
    // el marco con reglillas (sin la esquina de Atom)
    const M = PZ.rjC;
    R.linea(4, 4, 270, 4, PZ.rjM); R.linea(4, 4, 4, 156, M); R.linea(4, 156, 315, 156, M); R.linea(315, 50, 315, 156, M);
    for (let x = 12; x < 270; x += 8) R.pset(x, 5, x % 32 === 12 ? M : PZ.rjM);
    for (let y = 12; y < 156; y += 8) { R.pset(5, y, M); if (y % 32 === 12) R.pset(6, y, M); }
    for (let x = 8; x < 312; x += 8) { R.pset(x, 155, M); if (x % 32 === 8) R.pset(x, 154, M); }
    for (const [x, y, dx, dy] of [[4, 4, 1, 1], [4, 156, 1, -1], [315, 156, -1, -1]]) { R.linea(x, y, x + 9 * dx, y, PZ.co); R.linea(x, y, x, y + 9 * dy, PZ.co); }
    // el cajetín: casillas con barras, una pirámide y una brújula (sin letras)
    R.poligono([[262, 132], [313, 132], [313, 155], [262, 155]], (x, y) => ((x + y) % 2 ? PZ.f1 : PZ.f0));
    R.linea(262, 132, 313, 132, M); R.linea(262, 132, 262, 155, M); R.linea(262, 143, 313, 143, PZ.rjM); R.linea(288, 132, 288, 155, PZ.rjM);
    for (let k = 0; k < 3; k++) R.linea(266, 135 + k * 3, 266 + [18, 12, 15][k], 135 + k * 3, k ? PZ.rjC : PZ.co);
    R.poligono([[272, 153], [277, 146], [282, 153]], PZ.hal2); R.linea(272, 153, 277, 146, PZ.co); R.linea(277, 146, 282, 153, PZ.co); R.linea(270, 153, 285, 153, PZ.rjC);
    R.anillo(300, 138, 4, PZ.rjC); R.linea(300, 133, 300, 143, PZ.rjM); R.linea(295, 138, 305, 138, PZ.rjM); R.poligono([[298, 138], [300, 133], [302, 138]], PZ.co);
    for (let k = 0; k < 4; k++) R.linea(292, 147 + k * 2, 292 + [18, 10, 14, 6][k], 147 + k * 2, PZ.rjC);
    // la tarima del holograma: rejilla en perspectiva hacia (160, 70), bandas y emisores
    for (let y = 160; y < 180; y++) for (let x = 0; x < 320; x++) {
      const u = (y - 160) / 20; let c = c_tono([PZ.f0, PZ.f1, PZ.f2], 1.6 - u * 1.2 + 0.4 * (1 - Math.abs(x - 160) / 160), x, y);
      const z = (y - 70) / 90, rx = (x - 160) / z;
      if (Math.abs(((rx % 24) + 24) % 24) < 1 / z * 0.9) c = PZ.rjM;
      R.pset(x, y, c);
    }
    for (const y of [163, 167, 172]) R.linea(0, y, 319, y, PZ.rjM);
    R.linea(0, 160, 319, 160, PZ.co); R.linea(0, 161, 319, 161, PZ.hal);
    extra && extra(PZ);
    R.usar(prev); c_capas.set(clave, b);
  }
  R.copiar(b);
}

// la roca en corte (rayado en diagonal con estratos punteados) dentro de un rectángulo, para lo fijo de cada encuadre
function c_rocaCorte(R, x0, y0, x1, y1, PZ, estratos = []) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const k = (x + y) % 7; if (k === 0 && h(x >> 2, y >> 2, 5) > 0.22) R.pset(x, y, PZ.rj); else if (k === 3 && h(x, y, 6) > 0.86) R.pset(x, y, PZ.f4);
  }
  for (const ey of estratos) for (let x = x0; x <= x1; x++) { const y = Math.round(ey + Math.sin(x * 0.07 + ey) * 1.5); if ((x >> 1) % 4 !== 3) R.pset(x, y, PZ.rjM); }
}

// la vida del plano: el radar de satélite que barre (arriba a la izquierda), la tira de señal que vibra (a la derecha) y
// los pilotos del cajetín
function c_planoVida(R, t, minima) {
  const PZ = c_PZ;
  if (minima) { for (let k = 0; k < 3; k++) R.pset(306 + k * 3, 152, (Math.floor(t * 2 + k * 0.7) % 3) === k ? PZ.ci : PZ.hal2); return; }
  {
    const cx = 26, cy = 36;
    R.anillo(cx, cy, 11, PZ.rjC); R.anillo(cx, cy, 6, PZ.rjM, 2); R.linea(cx - 12, cy, cx + 12, cy, PZ.rj); R.linea(cx, cy - 12, cx, cy + 12, PZ.rj);
    const a = t * 2.1;
    for (let k = 0; k < 8; k++) { const b = a - k * 0.09; R.linea(cx, cy, Math.round(cx + Math.cos(b) * 10), Math.round(cy + Math.sin(b) * 10), k === 0 ? PZ.ci : k < 3 ? PZ.co : PZ.hal2); }
    for (let k = 0; k < 4; k++) { const ba = h(k, 1) * 6.28, br = 3 + h(k, 2) * 7, edad = ((a - ba) % 6.283 + 6.283) % 6.283; if (edad < 2.5) R.pset(Math.round(cx + Math.cos(ba) * br), Math.round(cy + Math.sin(ba) * br), edad < 0.6 ? PZ.br : PZ.co); }
    R.icono('satelite', cx + 9, cy - 22 + Math.round(Math.sin(t * 1.3)), PZ.co, PZ.f0);
  }
  // la señal: tres ondas que corren dentro de su marco
  R.linea(288, 52, 314, 52, PZ.rjC); R.linea(288, 100, 314, 100, PZ.rjC); R.linea(288, 52, 288, 100, PZ.rjM);
  for (let k = 0; k < 3; k++) { const y0 = 60 + k * 15; let py = y0;
    for (let x = 290; x < 313; x++) { const y = Math.round(y0 + Math.sin(x * (0.5 + k * 0.25) - t * (4 + k)) * (2 + k) * (0.6 + 0.4 * Math.sin(t * 0.7 + k))); R.linea(x - 1, py, x, y, k === 1 ? PZ.ci : PZ.co); py = y; } }
  // pilotos que parpadean
  for (let k = 0; k < 3; k++) R.pset(306 + k * 3, 152, (Math.floor(t * 2 + k * 0.7) % 3) === k ? PZ.ci : PZ.hal2);
}

// el barrido de holograma (una banda que sube aclarando lo que pisa), un salto de fila de vez en cuando
const c_MAS = new Map();

function c_holo(R, t) {
  const PZ = c_PZ;
  if (!c_MAS.size) for (const [a, b] of [[PZ.f0, PZ.f1], [PZ.f1, PZ.f2], [PZ.f2, PZ.f3], [PZ.f3, PZ.f4], [PZ.f4, PZ.rjM], [PZ.rj, PZ.rjM], [PZ.rjM, PZ.rjC], [PZ.rjC, PZ.co], [PZ.hal, PZ.hal2], [PZ.hal2, PZ.co], [PZ.co, PZ.ci], [PZ.ci, PZ.br], [PZ.mgH, PZ.mgO], [PZ.mgO, PZ.mg]]) c_MAS.set(a, b);
  const B = R.buf, ys = Math.round(158 - ((t * 20) % 190));
  for (let y = Math.max(0, ys); y <= Math.min(159, ys + 5); y++) {
    const r = y * 320;
    for (let x = 0; x < 320; x++) { if (y < 46 && x > 274) continue; const c = B[r + x], m = c_MAS.get(c); if (m !== undefined) B[r + x] = (y === ys && (x & 1)) ? (c_MAS.get(m) ?? m) : m; }
  }
  const g = Math.floor(t * 8);
  if (h(g, 3) > 0.9) { const y0 = 20 + Math.floor(h(g, 4) * 130), n = 1 + Math.floor(h(g, 5) * 3), d = h(g, 6) > 0.5 ? 2 : 1;
    for (let y = y0; y < y0 + n; y++) B.copyWithin(y * 320 + d, y * 320, y * 320 + 320 - d); }
}

// el plano sin desplazar
function c_plano(R, t, o) {
  const enc = o.encuadre ?? 'corte', cam = o.camara ?? 'general', clave = enc + '/' + cam;
  const P = c_pluma(R), tenue = h(Math.floor(t * 9), 7) > 0.94;
  let geo = {};
  if (clave === 'corte/pozos') { c_planoFondo(R, clave, false); geo = c_pozosCerca(R, t, o, P); }
  else if (enc === 'corte') { c_planoFondo(R, clave, true, (PZ) => { c_rocaCorte(R, 12, 51, 268, 157, PZ, [72, 96, 121, 146]); c_planoLeyendaFija(R, PZ); }); geo = c_corte(R, t, o, P); }
  else if (clave === 'keops/leyenda') { c_planoFondo(R, clave, true, (PZ) => c_rocaCorte(R, 12, 105, 300, 157, PZ, [128, 150])); geo = c_leyenda(R, t, o, P); }
  else if (enc === 'keops') { c_planoFondo(R, clave, true, (PZ) => c_rocaCorte(R, 12, 141, 300, 157, PZ, [152])); geo = c_keops(R, t, o, P); }
  else if (clave === 'mataha/regla') { c_planoFondo(R, clave, true, (PZ) => c_rocaCorte(R, 12, 47, 168, 157, PZ, [80, 118])); geo = c_regla(R, t, o, P); }
  else { c_planoFondo(R, clave, true); geo = c_mataha(R, t, o, P); }
  c_planoVida(R, t, clave === 'corte/pozos');
  P.pintar(t, tenue);
  if (geo.despues) geo.despues();
  c_holo(R, t);
  delete geo.despues;
  return { suelo: 172, ...geo };
}

// el marco de la leyenda del corte (lo fijo: casillas)
function c_planoLeyendaFija(R, PZ) {
  R.poligono([[14, 62], [58, 62], [58, 122], [14, 122]], (x, y) => ((x + y) % 3 ? PZ.f1 : PZ.f0));
  R.linea(14, 62, 58, 62, PZ.rjC); R.linea(14, 122, 58, 122, PZ.rjC); R.linea(14, 62, 14, 122, PZ.rjC); R.linea(58, 62, 58, 122, PZ.rjC);
  for (const y of [82, 102]) R.linea(15, y, 57, y, PZ.rjM);
}

// pirámide en línea (vértice cx, y0; base en yb; pendiente: mitad del ancho por píxel de alto)
function c_piramide(P, cx, y0, yb, m, k = 'c', relleno = null, R = null) {
  const w = (yb - y0) * m;
  if (relleno && R) R.poligono([[cx, y0], [cx + w, yb], [cx - w, yb]], relleno);
  P.l(cx - w, yb, cx, y0, k); P.l(cx, y0, cx + w, yb, k);
}

// una rampa en espiral alrededor de un pozo (cx, de ya a yb), radio r, paso p, girando con t; detras: solo las vueltas
// de atrás (se dibujan antes que el pozo) o solo las de delante; grueso: alto de la rampa
function c_espiral(P, cx, ya, yb, r, p, t, detras, grueso = 1, paso = 0.35, ymin = -1e9, ymax = 1e9) {
  let q = null;
  for (let y = Math.max(ya, ymin); y <= Math.min(yb, ymax); y += paso) {
    const a = (y - ya) / p * 6.2832 - t * 2.4, s = Math.sin(a), x = Math.round(cx + r * Math.cos(a)), yy = Math.round(y);
    if ((s > 0) === detras) { q = null; continue; }
    if (q && (q[0] !== x || q[1] !== yy)) {
      if (detras) P.l(q[0], q[1], x, yy, 'D', 0);
      else for (let g = 0; g < grueso; g++) P.l(q[0], q[1] + g, x, yy + g, g === 0 ? (Math.abs(Math.cos(a)) < 0.3 ? 'b' : 'e') : g === grueso - 1 ? 'd' : 'e');
    }
    if (!q || q[0] !== x || q[1] !== yy) q = [x, yy];
  }
}

// un cubo en alambre (frente x0..x0+s, y0..y0+s, fondo corrido dx, dy), dibujado hasta la fracción u (arista a arista)
function c_cubo(P, x0, y0, s, dx, dy, u, k = 'c') {
  const A = [[x0, y0], [x0 + s, y0], [x0 + s, y0 + s], [x0, y0 + s]], Bk = A.map(([x, y]) => [x + dx, y + dy]);
  const ar = [[Bk[0], Bk[1], 'd'], [Bk[1], Bk[2], 'd'], [Bk[2], Bk[3], 'D'], [Bk[3], Bk[0], 'D'], [A[3], Bk[3], 'D'], [A[0], Bk[0], k], [A[1], Bk[1], k], [A[2], Bk[2], k],
    [A[0], A[1], k], [A[1], A[2], k], [A[2], A[3], k], [A[3], A[0], k]];
  const n = u * ar.length;
  for (let i = 0; i < ar.length && i < n; i++) { const [a, b, kk] = ar[i]; P.parte(a[0], a[1], b[0], b[1], n - i, kk); }
}

// 'corte'/'general': la meseta en corte, a escala
function c_corte(R, t, o, P) {
  const PZ = c_PZ, S = 50;
  const salas = o.salas ?? 1, pozos = o.pozos ?? 1, esp = o.espiral ?? 1, cubos = o.cubos ?? 1, hondo = o.hondo ?? 1, regla = o.regla ?? 1, agua = o.agua ?? 0;
  // la superficie con su relieve, Keops y Menkaure en tenue, Kefrén en cian con su relleno
  let py = S; for (let x = 12; x <= 268; x += 4) { const y = S + Math.round(Math.sin(x * 0.09) * 0.6 + (x > 200 ? 0.5 : 0)); P.l(x - 4, py, x, y, 'c'); py = y; }
  c_piramide(P, 94, 27, S, 0.78, 'd'); P.l(94, 27, 98, S, 'D'); c_piramide(P, 216, 40, S, 0.8, 'd'); P.l(216, 40, 218, S, 'D');
  c_piramide(P, 160, 29, S, 0.76, 'c', (x, y) => ((x + y) % 3 === 0 ? PZ.hal : (x * 7 + y) % 5 === 0 ? PZ.f4 : PZ.f3), R);
  for (let y = 33; y < S; y += 3) { const w = (y - 29) * 0.76 - 1; P.l(160 - w, y, 160 + w, y, 'D', 2); }
  P.l(160, 29, 162, S, 'd'); P.l(157, 31, 163, 31, 'b');
  P.cotaV(184, 29, S, 'c', '136', 188, 43);
  // la leyenda: sala 5, pozo 8, cubo 2 (se encienden con lo suyo)
  const ley = [[salas, '5'], [pozos, '8'], [cubos, '2']];
  ley.forEach(([v, num], i) => { const y = 66 + i * 20, on = v > 0.02, k = on ? 'c' : 'D';
    if (i === 0) { P.caja(19, y + 3, 31, y + 11, k); P.l(19, y + 7, 31, y + 7, 'd'); }
    else if (i === 1) { P.l(23, y, 23, y + 14, k); P.l(27, y, 27, y + 14, k); for (let q = 0; q < 14; q += 4) P.l(20, y + q + 3, 30, y + q, on ? 'd' : 'D'); }
    else c_cubo(P, 19, y + 4, 9, 3, -3, 1, k);
    if (on) P.n(num, 40, y + 12, PZ.br); });
  // el agua (gag 7): sube desde el fondo hasta su nivel real
  const ny = agua > 0 ? 157 - (157 - 58) * c_cl(agua * 1.25) : 999;
  if (agua > 0) {
    for (let y = Math.ceil(ny); y < 158; y++) for (let x = 12; x <= 268; x++) if ((x * 3 + y * 5) % 7 === 0) R.pset(x, y, (x + y) % 2 ? PZ.ag0 : PZ.ag1);
    let wy = ny; for (let x = 12; x <= 268; x += 2) { const y = ny + Math.sin(x * 0.18 + t * 2.4) * 0.9; P.l(x - 2, wy, x, y, 'a', 0); wy = y; }
  }
  // las cinco salas en la base, unidas por pasillos, encendiéndose una a una
  const XS = [128, 144, 160, 176, 192], enc = salas * 5;
  XS.forEach((x, k) => {
    const u = c_cl(enc - k), on = u > 0, flash = on && u < 1;
    if (on) R.poligono([[x - 5, 52], [x + 6, 52], [x + 6, 60], [x - 5, 60]], (px, py2) => ((px + py2) % 2 ? (flash ? PZ.hal2 : PZ.hal) : PZ.f2));
    P.caja(x - 5, 52, x + 5, 59, on ? (flash || (Math.floor(t * 3) + k) % 7 === 0 ? 'b' : 'c') : 'D', on ? 0 : 2);
    P.l(x - 5, 56, x + 5, 56, on ? 'd' : 'D', 2); P.l(x - 3, 59, x, 56, on ? 'd' : 'D');
    if (k < 4) { const pon = enc - k > 1.4; P.l(x + 6, 54, x + 10, 54, pon ? 'c' : 'D', pon ? 0 : 2); P.l(x + 6, 57, x + 10, 57, pon ? 'c' : 'D', pon ? 0 : 2); }
  });
  // los ocho pozos con su rampa en espiral
  const PX = [118, 130, 142, 154, 166, 178, 190, 202], Y0 = 61, Y1 = 136, len = (Y1 - Y0) * c_cl(pozos);
  for (const x of PX) if (len > 0) c_espiral(P, x, Y0, Y0 + len * esp, 4, 9, t, true);
  for (const x of PX) if (len > 0) {
    for (let y = Y0; y < Y0 + len; y++) for (let dx = -1; dx <= 1; dx++) R.pset(x + dx, y, y > ny ? (y % 3 ? PZ.ag1 : PZ.ag0) : (y + dx) % 4 === 0 ? PZ.f2 : PZ.f0);
    P.l(x - 2, Y0, x - 2, Y0 + len, 'c'); P.l(x + 2, Y0, x + 2, Y0 + len, 'c');
    if (pozos < 1) P.p(x, Math.round(Y0 + len), 'b');
  }
  for (const x of PX) if (len > 0) c_espiral(P, x, Y0, Y0 + len * esp, 4, 9, t, false);
  // la galería que une los pozos y los dos cubos al fondo (con el agua de la pecera)
  if (cubos > 0) { P.parte(112, 134, 210, 134, cubos * 1.6, 'd'); P.parte(112, 137, 210, 137, cubos * 1.6, 'd'); }
  const CB = [[116, 138], [188, 138]];
  CB.forEach(([x0, y0], i) => {
    if (cubos <= 0) return;
    const nivel = agua > 0 ? c_cl((y0 + 15 - ny) / 15) : 0;
    if (nivel > 0) { const top = Math.round(y0 + 15 - 14 * nivel);
      R.poligono([[x0 + 1, top], [x0 + 15, top], [x0 + 15, y0 + 15], [x0 + 1, y0 + 15]], (x, y) => (y === top ? PZ.ag3 : (x + y) % 3 === 0 ? PZ.ag2 : PZ.ag1));
      for (let k = 0; k < 4; k++) { const by = y0 + 14 - ((t * 9 + k * 4.3) % 14); if (by > top + 1) R.pset(x0 + 3 + ((k * 5 + i * 3) % 11), Math.round(by), PZ.ag3); }
      if (nivel > 0.5) { const fx = Math.round(x0 + 8 + Math.sin(t * 1.3 + i * 2) * 4), fy = Math.round(y0 + 9 + Math.sin(t * 2.1 + i) * 1.5), d = Math.cos(t * 1.3 + i * 2) > 0 ? 1 : -1;
        R.pset(fx, fy, PZ.pez); R.pset(fx + d, fy, PZ.pez); R.pset(fx - d, fy, PZ.pezS); R.pset(fx - 2 * d, fy - 1, PZ.pezS); R.pset(fx - 2 * d, fy + 1, PZ.pezS); R.pset(fx + d, fy - 1, PZ.f0); } }
    c_cubo(P, x0, y0, 15, 4, -3, c_cl(cubos * 1.2 - i * 0.2));
  });
  // lo de más abajo, que se pierde
  if (hondo > 0) {
    for (const [x, d] of [[124, 0], [196, 1], [160, 2]]) { const yb = 153 + Math.round(5 * c_cl(hondo)); P.l(x, 153, x, yb, 'D', 2); }
    P.l(140, 147, 140, 153, 'd'); P.flecha(140, 153, 0, 1, 'd'); P.l(180, 147, 180, 153, 'd'); P.flecha(180, 153, 0, 1, 'd');
    if (hondo > 0.5) P.n('2000', 148, 153, PZ.co);
  }
  // la regla de cotas y la torre de 4,8 pirámides fantasma
  if (regla > 0) {
    const yb = S + Math.round(100 * c_cl(regla * 1.3));
    P.l(100, S, 100, yb, 'c'); P.flecha(100, S + 1, 0, -1); if (regla * 1.3 >= 1) P.flecha(100, yb - 1, 0, 1);
    for (let y = S; y <= yb; y += 10) P.l(y % 50 === 0 ? 95 : 97, y, 100, y, 'd');
    P.n('0', 90, S - 2, PZ.ci); if (regla * 1.3 >= 1) P.n('650', 78, 153, PZ.br);
    const n = 4.8 * c_cl(regla * 1.2);
    for (let k = 0; k < 5 && k < n; k++) { const y0 = S + k * 21, f = Math.min(1, n - k), yb2 = y0 + 21 * f;
      R.poligono([[238, y0 + 1], [238 + 15 * (yb2 - y0) / 21, yb2], [238 - 15 * (yb2 - y0) / 21, yb2]], (x, y) => ((x + y) % 3 === 0 ? PZ.hal : (y - y0) % 3 === 0 ? PZ.f4 : PZ.f2));
      P.l(238, y0, 238 - 16 * (yb2 - y0) / 21, yb2, k === 0 ? 'c' : 'd'); P.l(238, y0, 238 + 16 * (yb2 - y0) / 21, yb2, k === 0 ? 'c' : 'd');
      if (f >= 1) P.l(222, yb2, 254, yb2, 'D', 2); }
    if (n >= 4.8) P.n('×4.8', 228, 158, PZ.br);
  }
  return { superficie: S, piramide: [144, 29, 176, 50], salas: XS.map((x) => [x, 56]), pozos: PX, cubos: [[124, 146], [196, 146]], nivelAgua: 58 };
}

// 'corte'/'pozos': los pozos de cerca y la cámara que baja
function c_pozosCerca(R, t, o, P) {
  const PZ = c_PZ, baja = c_cl(o.baja ?? 0), esp = o.espiral ?? 1, agua = o.agua ?? 0;
  const FONDO = 500, cam = baja * (FONDO - 96), sy = (wy) => Math.round(62 + wy - cam);   // 1,5 m por píxel
  // la rejilla y la roca, que se mueven con la bajada
  const off = Math.round(cam);
  for (let y = 0; y < 160; y++) { const wy = y + off; const g = ((wy + 16) % 32 + 32) % 32 === 0, f = ((wy % 8) + 8) % 8 === 0;
    if (g) R.linea(0, y, 319, y, PZ.rjM); else if (f) for (let x = 0; x < 320; x += 2) R.pset(x + (y & 1), y, PZ.rj); }
  for (let x = 0; x < 320; x += 8) { const g = (x + 16) % 32 === 0; for (let y = 0; y < 160; y += g ? 1 : 2) R.pset(x, y, g ? PZ.rjM : PZ.rj); }
  const ys = Math.max(0, sy(0) + 1);
  for (let y = ys; y < 158; y++) { const wy = y + off; for (let x = 44 - ((wy * 1) % 7); x < 262; x += 7) if (h(x >> 3, wy >> 3, 5) > 0.25) R.pset(x, y, PZ.rj); }
  for (const ew of [60, 150, 260, 380]) { const y = sy(ew); if (y > 0 && y < 158) for (let x = 44; x < 262; x++) if ((x >> 1) % 4 !== 3) R.pset(x, Math.round(y + Math.sin(x * 0.06 + ew) * 2), PZ.rjM); }
  // el agua real, a unas decenas de metros (si o.agua)
  if (agua > 0) { const wy = sy(30 / 1.5); for (let y = Math.max(0, wy); y < 158; y++) for (let x = 44; x < 262; x++) if ((x * 3 + y * 5 + off * 5) % 9 === 0 && h(x, y + off) < agua) R.pset(x, y, PZ.ag0);
    if (wy > 0 && wy < 158) { let p = wy; for (let x = 44; x < 262; x += 2) { const y = wy + Math.sin(x * 0.15 + t * 2) * 1.2; P.l(x - 2, p, x, y, 'a'); p = y; } } }
  const P0 = P; P = c_pluma(R);
  // la superficie con la base de Kefrén y las salas
  const s0 = sy(0);
  if (s0 > -100) {
    P.l(44, s0, 262, s0, 'c');
    R.poligono([[92, s0], [228, s0], [195, s0 - 44], [125, s0 - 44]], (x, y) => ((x + y) % 3 === 0 ? PZ.hal : (x * 7 + y) % 5 === 0 ? PZ.f4 : PZ.f3));
    P.l(92, s0, 125, s0 - 44, 'c'); P.l(228, s0, 195, s0 - 44, 'c');
    for (let y = s0 - 4; y > s0 - 44; y -= 4) { const w = 68 - (s0 - y) * 0.75; P.l(160 - w, y, 160 + w, y, 'D', 2); }
    for (let k = 0; k < 5; k++) { const x = 100 + k * 30; P.caja(x - 10, s0 + 4, x + 10, s0 + 14, 'c'); P.l(x - 10, s0 + 9, x + 10, s0 + 9, 'd', 2); if (k < 4) { P.l(x + 11, s0 + 7, x + 19, s0 + 7, 'c'); P.l(x + 11, s0 + 11, x + 19, s0 + 11, 'c'); } }
  }
  // tres pozos con la rosca (las vueltas de atrás, el tubo hueco con sus anillos y las de delante)
  const XS = [76, 160, 244], W0 = 20, W1 = 433, vis0 = cam - 70, vis1 = cam + 100;
  for (const x of XS) c_espiral(P, x, sy(W0), sy(W1) - 2 + 0 * esp, 20, 26, t * 0.75, true, 1, 0.5, -10, 170);
  for (const x of XS) {
    const ya = Math.max(16, sy(W0)), yb = Math.min(157, sy(W1));
    if (yb > ya) {
      R.poligono([[x - 6, ya], [x + 7, ya], [x + 7, yb], [x - 6, yb]], (px, py) => (px < x - 2 ? PZ.f2 : px > x + 3 ? PZ.f0 : (px + py + off) % 3 === 0 ? PZ.f1 : PZ.f0));
      for (let wy = Math.ceil(vis0 / 13) * 13; wy < vis1; wy += 13) { const y = sy(wy); if (y > ya && y < yb) P.l(x - 6, y, x + 6, y, 'D', 2); }
      P.l(x - 7, ya, x - 7, yb, 'c'); P.l(x + 7, ya, x + 7, yb, 'c');
    }
  }
  for (const x of XS) c_espiral(P, x, sy(W0), sy(W1) - 2, 20, 26, t * 0.75, false, 4, 0.5, -10, 170);
  // la galería del fondo y los dos cubos enormes, con lo que sigue hacia abajo
  const g0 = sy(426);
  if (g0 < 170) {
    P.l(40, g0, 270, g0, 'c'); P.l(40, g0 + 6, 270, g0 + 6, 'c');
    for (const x0 of [84, 183]) { const y0 = sy(440); c_cubo(P, x0, y0, 52, 14, -10, c_cl(o.cubos ?? 1));
      for (let k = 1; k < 4; k++) P.l(x0 + k * 13, y0 + 1, x0 + k * 13, y0 + 51, 'D', 2); }
    for (const x of [110, 209]) { P.l(x, sy(494), x, sy(530), 'D', 2); P.flecha(x, Math.min(156, sy(530)), 0, 1, 'd'); }
  }
  R.recorte([0, 16, 319, 157]); P.pintar(t, h(Math.floor(t * 9), 7) > 0.94); R.recorte(null); P = P0;
  // la regla de profundidad con la cifra que cambia
  R.linea(30, 16, 30, 157, PZ.rjC);
  for (let wm = 0; wm <= 700; wm += 25) { const y = sy(wm / 1.5); if (y < 17 || y > 156) continue; R.linea(wm % 100 === 0 ? 24 : 27, y, 30, y, wm % 100 === 0 ? PZ.ci : PZ.co);
    if (wm % 100 === 0 && Math.abs(y - 100) > 7) P.n(String(wm), 8, y + 3, PZ.co); }
  const prof = Math.max(0, Math.round((cam + 38) * 1.5 / 10) * 10);
  R.poligono([[31, 100], [36, 96], [36, 104]], PZ.br); R.poligono([[6, 94], [28, 94], [28, 105], [6, 105]], PZ.f0); R.linea(6, 94, 28, 94, PZ.ci); R.linea(6, 105, 28, 105, PZ.ci);
  P.n(String(Math.min(650, prof)), 8, 103, PZ.br);
  // el plano en miniatura con el recuadro de lo que se ve
  R.poligono([[266, 52], [306, 52], [306, 150], [266, 150]], (x, y) => ((x + y) % 2 ? PZ.f1 : PZ.f0));
  R.linea(266, 52, 306, 52, PZ.rjC); R.linea(266, 150, 306, 150, PZ.rjC); R.linea(266, 52, 266, 150, PZ.rjC); R.linea(306, 52, 306, 150, PZ.rjC);
  R.linea(268, 66, 304, 66, PZ.co); R.poligono([[280, 66], [286, 58], [292, 66]], PZ.hal2); R.linea(280, 66, 286, 58, PZ.ci); R.linea(286, 58, 292, 66, PZ.ci);
  for (let k = 0; k < 8; k++) R.linea(272 + k * 4, 68, 272 + k * 4, 132, k % 2 ? PZ.co : PZ.ci);
  for (const x of [270, 290]) { R.linea(x, 133, x + 9, 133, PZ.ci); R.linea(x, 142, x + 9, 142, PZ.ci); R.linea(x, 133, x, 142, PZ.ci); R.linea(x + 9, 133, x + 9, 142, PZ.ci); }
  const vy = Math.round(66 + (cam - 46) / FONDO * 76), vh = 22;
  if (Math.floor(t * 3) % 4 !== 3) { R.linea(267, vy, 305, vy, PZ.br); R.linea(267, vy + vh, 305, vy + vh, PZ.br); R.linea(267, vy, 267, vy + vh, PZ.br); R.linea(305, vy, 305, vy + vh, PZ.br); }
  return { pozos: XS, superficie: s0, profundidad: prof };
}

// 'keops'/'general': la Gran Pirámide en corte, con lo conocido en cian y lo «nuevo» en magenta
function c_keops(R, t, o, P) {
  const PZ = c_PZ, nuevas = o.nuevas ?? 1, cx = 158, ya = 20, yb = 140, m = 94 / 120;
  const xL = (y) => cx - (y - ya) * m, xR = (y) => cx + (y - ya) * m;
  P.l(12, yb, 300, yb, 'c');
  R.poligono([[cx, ya], [xR(yb), yb], [xL(yb), yb]], (x, y) => ((x + y) % 4 === 0 ? PZ.hal : (x * 5 + y * 3) % 11 === 0 ? PZ.f4 : PZ.f3));
  for (let y = ya + 6; y < yb; y += 5) { P.l(xL(y) + 1, y, xR(y) - 1, y, 'D', 4); }
  for (let y = ya + 8; y < yb; y += 10) for (let x = Math.ceil(xL(y)) + 6; x < xR(y) - 4; x += 12) P.l(x + ((y / 5) % 2) * 6, y - 5, x + ((y / 5) % 2) * 6, y, 'D', 2);
  P.l(xL(yb), yb, cx, ya, 'c'); P.l(cx, ya, xR(yb), yb, 'c'); P.l(xL(yb) + 3, yb, cx, ya + 4, 'd', 3); P.l(cx, ya + 4, xR(yb) - 3, yb, 'd', 3);
  P.l(cx - 3, ya + 4, cx + 3, ya + 4, 'b');
  // lo conocido: la entrada, el pasillo descendente y la cámara subterránea
  P.l(83, 118, 141, 147, 'c'); P.l(84, 121, 141, 150, 'c'); P.caja(141, 146, 158, 153, 'c'); P.l(144, 150, 155, 150, 'd', 2);
  P.l(81, 116, 86, 113, 'd'); P.l(86, 113, 91, 116, 'd');                                            // los bloques en tejado de la entrada
  P.caja(90, 108, 104, 111, 'b'); P.l(90, 106, 97, 103, 'd'); P.l(97, 103, 104, 106, 'd');           // el pasillo de 2023 con su techo en tejado
  // el ascendente, la Gran Galería, la Cámara de la Reina y la del Rey con sus cámaras de descarga y conductos
  P.l(106, 129, 128, 118, 'c'); P.l(106, 132, 128, 121, 'c');
  P.l(128, 121, 154, 121, 'c'); P.l(128, 118, 152, 118, 'd', 2);
  P.caja(150, 113, 164, 121, 'c'); P.l(150, 113, 157, 108, 'c'); P.l(157, 108, 164, 113, 'c');
  P.l(128, 118, 166, 98, 'c'); P.l(128, 111, 166, 91, 'c'); P.l(128, 111, 128, 118, 'c'); for (let k = 1; k < 5; k++) P.l(128 + k * 7.6, 111 - k * 4 + 1, 128 + k * 7.6, 118 - k * 4 - 1, 'D');
  P.caja(168, 91, 184, 98, 'c'); for (let k = 0; k < 4; k++) P.l(168, 89 - k * 2, 184, 89 - k * 2, k ? 'd' : 'c'); P.l(168, 83, 176, 78, 'c'); P.l(176, 78, 184, 83, 'c');
  P.l(168, 93, 120, 60, 'd', 2); P.l(184, 93, 210, 72, 'd', 2); P.l(150, 116, 126, 97, 'D', 2); P.l(164, 116, 184, 100, 'D', 2);
  // el gran vacío de 2017, encima de la galería
  P.l(130, 102, 164, 84, 'b', 3); P.l(130, 106, 164, 88, 'b', 3); P.l(130, 102, 130, 106, 'b'); P.l(164, 84, 164, 88, 'b');
  // lo «nuevo» según el artículo de 2022, una a una con su anillo
  const NV = [[[112, 74, 124, 80]], [[196, 106, 206, 113]], [[118, 132, 128, 138]], [[178, 124, 190, 130]], [[150, 140, 150, 158, 'v'], [170, 140, 170, 158, 'v']], [[96, 140, 96, 156, 'v'], [218, 140, 218, 156, 'v']]];
  NV.forEach((grupo, k) => {
    const u = c_cl(nuevas * NV.length - k); if (u <= 0) return;
    for (const [x0, y0, x1, y1, v] of grupo) {
      if (v) { P.parte(x0, y0, x1, y1, u * 1.5, 'm'); P.l(x0 - 2, y0, x0 - 2, y0 + (y1 - y0) * c_cl(u * 1.5), 'm', 3); P.l(x0 + 2, y0, x0 + 2, y0 + (y1 - y0) * c_cl(u * 1.5), 'm', 3); }
      else { R.poligono([[x0, y0], [x1 + 1, y0], [x1 + 1, y1 + 1], [x0, y1 + 1]], (x, y) => ((x + y) % 2 ? PZ.mgH : PZ.f2)); P.caja(x0, y0, x1, y1, 'm'); P.l(x0, (y0 + y1) >> 1, x1, (y0 + y1) >> 1, 'm', 2); }
      if (u < 1) { const c = [(x0 + x1) / 2, (y0 + y1) / 2], r = 3 + u * 12; for (let a = 0; a < 6.28; a += 0.3) P.p(Math.round(c[0] + Math.cos(a) * r), Math.round(c[1] + Math.sin(a) * r * 0.7), 'm'); }
    }
  });
  // las cotas
  P.cotaV(262, ya, yb, 'c', '146', 266, 84);
  P.l(xL(yb), 144, xR(yb), 144, 'd'); P.flecha(xL(yb) + 1, 144, -1, 0, 'd'); P.flecha(xR(yb) - 1, 144, 1, 0, 'd');
  return { piramide: [64, 20, 252, 140], suelo0: yb, camaraRey: [176, 94], camaraReina: [157, 117], galeria: [128, 118, 166, 91], vacio: [130, 84, 164, 106], pasillo2023: [97, 109], subterranea: [150, 150] };
}

// 'keops'/'leyenda': la Esfinge en holograma y lo que cuenta la leyenda debajo
function c_leyenda(R, t, o, P) {
  const PZ = c_PZ, sim = o.simbolos ?? 1, G = 104;
  P.l(12, G, 300, G, 'c');
  // tres pirámides pequeñas al fondo, a la izquierda
  c_piramide(P, 40, 78, G, 0.8, 'd'); c_piramide(P, 66, 84, G, 0.8, 'd'); c_piramide(P, 86, 92, G, 0.8, 'D');
  // la Esfinge, mirando a la izquierda
  const ES = [[96, 104], [96, 98], [122, 97], [130, 94], [132, 86], [127, 84], [126, 78], [124, 76], [125, 72], [124, 66], [127, 60], [128, 50], [134, 44], [148, 44], [154, 50], [160, 62], [160, 74], [168, 76], [200, 75], [226, 77], [240, 82], [246, 90], [246, 104]];
  R.poligono(ES, (x, y) => (y % 3 === 0 ? PZ.hal : (x + y) % 2 === 0 ? PZ.f3 : PZ.f4));
  P.poli(ES, 'c');
  for (let y = 50; y < 76; y += 3) P.l(Math.max(134, 128 + (y - 50) * 0.2) + 6, y, 158, y, 'D', 2);   // las rayas del tocado
  P.l(134, 44, 140, 46, 'd'); P.l(140, 46, 150, 45, 'd');
  P.p(129, 60, 'b'); P.p(130, 60, 'b'); P.l(124, 66, 127, 66, 'd'); P.l(125, 70, 128, 70, 'd'); P.l(128, 52, 128, 76, 'D', 2);   // ojo, nariz, boca
  P.l(146, 78, 160, 98, 'd'); P.l(172, 80, 214, 80, 'D', 2); P.l(204, 86, 236, 86, 'D', 2); P.l(214, 104, 222, 96, 'd'); P.l(222, 96, 232, 96, 'd');
  P.l(100, 101, 122, 101, 'D', 2); P.l(240, 102, 214, 102, 'd');
  // la escalera entre las patas, el pasillo y la Sala de los Registros con sus columnas
  const u1 = c_cl(sim * 2.5), u2 = c_cl(sim * 2.5 - 0.6), u3 = c_cl(sim * 2.5 - 1.2), u4 = c_cl(sim * 2.5 - 1.6);
  if (u1 > 0) { for (let k = 0; k < 5; k++) { if (k / 5 > u1) break; P.l(110 + k * 3, 105 + k * 3, 113 + k * 3, 105 + k * 3, 'c'); P.l(113 + k * 3, 105 + k * 3, 113 + k * 3, 108 + k * 3, 'c'); }
    P.parte(125, 120, 140, 120, u1 * 1.2, 'c'); P.parte(125, 126, 140, 126, u1 * 1.2, 'c'); }
  if (u2 > 0) {
    R.poligono([[140, 114], [237, 114], [237, 151], [140, 151]], (x, y) => ((x + y) % 2 ? PZ.hal : PZ.f2));
    P.parte(140, 114, 236, 114, u2 * 1.3, 'c'); P.parte(140, 150, 236, 150, u2 * 1.3, 'c'); P.l(140, 114, 140, 119, 'c'); P.l(140, 127, 140, 150, 'c'); P.l(236, 114, 236, 150, 'c');
    for (let k = 0; k < 6; k++) { if (k / 6 > u2) break; const x = 152 + k * 13; R.poligono([[x - 2, 120], [x + 3, 120], [x + 3, 146], [x - 2, 146]], (px, py) => (px === x - 2 ? PZ.co : (py + px) % 3 ? PZ.hal2 : PZ.f4));
      P.l(x - 4, 119, x + 4, 119, 'c'); P.l(x - 3, 118, x + 3, 118, 'b'); P.l(x - 4, 147, x + 4, 147, 'c'); P.l(x - 2, 120, x - 2, 146, 'c'); P.l(x + 2, 120, x + 2, 146, 'd'); }
  }
  if (u3 > 0) {
    // puertas en el fondo y estantes con rollos
    // la puerta del fondo (que late) y otra que baja al piso de abajo
    const pv = 0.5 + 0.5 * Math.sin(t * 2); R.poligono([[226, 130], [234, 130], [234, 150], [226, 150]], (x, y) => ((x + y) % 2 ? PZ.hal2 : PZ.f2));
    P.caja(226, 130, 233, 149, pv > 0.7 ? 'b' : 'c'); P.l(224, 128, 235, 128, 'c'); P.l(225, 127, 234, 127, 'd'); P.p(231, 140, 'b');
    if (u3 > 0.5) { P.l(188, 150, 188, 156, 'c', 2); P.l(196, 150, 196, 156, 'c', 2); P.flecha(192, 157, 0, 1, 'd'); }
  }
  if (u4 > 0) {
    // túneles a las pirámides y las puertas que se abren
    P.parte(140, 140, 86, 140, u4, 'c', 4); P.parte(86, 140, 66, 120, u4 * 1.3 - 0.3, 'c', 4); P.parte(86, 140, 40, 116, u4 * 1.3 - 0.3, 'c', 4);
    P.parte(236, 132, 290, 132, u4, 'c', 4); P.parte(290, 132, 290, 150, u4 * 1.3 - 0.3, 'c', 4);
    if (u4 >= 1) { P.flecha(290, 150, 0, 1); P.flecha(40, 116, -1, 0); }
  }
  // un rótulo-símbolo que late sobre la sala (sin letras): el icono de la columna
  return { despues: () => { if (u2 >= 1) { const pul = Math.sin(t * 3) > 0; R.icono('?', 251, 116 + Math.round(Math.sin(t * 1.6)), pul ? PZ.br : PZ.ci, PZ.f0); R.icono('piramide', 250, 138 + Math.round(Math.sin(t * 1.6 + 1)), PZ.ci, PZ.f0); } },
    esfinge: [96, 44, 246, 104], suelo0: G, sala: [140, 114, 236, 150] };
}

// 'mataha'/'general': la rejilla de muros enterrados (Hawara 2008) bajo una losa, con la «?» que late
function c_mataha(R, t, o, P) {
  const PZ = c_PZ, muros = o.muros ?? 1, N = 10, k = 9, cx = 160, cy = 58, Hh = 7;
  const X = (i, j) => cx + (i - j) * k, Y = (i, j) => cy + (i + j) * k / 2;
  // la pirámide de adobe de Hawara, gastada, en tenue
  P.l(18, 76, 34, 52, 'd'); P.l(34, 52, 44, 50, 'd'); P.l(44, 50, 58, 60, 'd'); P.l(58, 60, 74, 76, 'd'); P.l(12, 76, 80, 76, 'd');
  for (let y = 56; y < 76; y += 4) P.l(30 - (y - 56) * 0.4 + 4, y, 60 + (y - 56) * 0.4, y, 'D', 2);
  // el suelo de la rejilla, la losa por encima y las ondas del radar que bajan
  R.poligono([[X(0, 0), Y(0, 0)], [X(N, 0), Y(N, 0)], [X(N, N), Y(N, N)], [X(0, N), Y(0, N)]], (x, y) => ((x + y) % 3 === 0 ? PZ.hal : PZ.f2));
  for (let a = 0; a <= N; a++) { P.l(X(a, 0), Y(a, 0), X(a, N), Y(a, N), 'D', 2); P.l(X(0, a), Y(0, a), X(N, a), Y(N, a), 'D', 2); }
  // la línea de escaneo que recorre la rejilla
  const sc = (t * 3) % (2 * N + 6) - 3;
  // los muros (de atrás hacia delante), que se dibujan con o.muros
  const muro = (i0, j0, i1, j1, kk) => {
    const a = [X(i0, j0), Y(i0, j0)], b = [X(i1, j1), Y(i1, j1)];
    P.l(a[0], a[1] - Hh, b[0], b[1] - Hh, kk); P.l(a[0], a[1], b[0], b[1], 'd'); P.l(a[0], a[1], a[0], a[1] - Hh, 'd'); P.l(b[0], b[1], b[0], b[1] - Hh, 'd');
  };
  for (let s = 0; s <= 2 * N; s++) for (let i = 0; i <= N; i++) { const j = s - i; if (j < 0 || j > N) continue;
    if (s > muros * 2 * N + 0.5) continue;
    const cerca = Math.abs(s - sc) < 1.2 ? 'b' : 'c';
    if (i < N && (j === 0 || j === N || h(i, j, 11) > 0.55)) muro(i, j, i + 1, j, cerca);
    if (j < N && (i === 0 || i === N || h(i, j, 12) > 0.6)) muro(i, j, i, j + 1, cerca);
  }
  if (sc > 0 && sc < 2 * N) { const i0 = Math.max(0, sc - N), i1 = Math.min(N, sc); P.l(X(i0, sc - i0), Y(i0, sc - i0), X(i1, sc - i1), Y(i1, sc - i1), 'b'); }
  // la losa (rayada, translúcida) por encima de los muros
  const L = 22, losa = [[X(0, 0), Y(0, 0) - L], [X(N, 0), Y(N, 0) - L], [X(N, N), Y(N, N) - L], [X(0, N), Y(0, N) - L]];
  P.poli(losa, 'd'); for (let a = 1; a < N; a += 2) P.l(X(a, 0), Y(a, 0) - L, X(a, N), Y(a, N) - L, 'D', 3);
  for (const q of [0, 1, 3]) P.l(losa[q][0], losa[q][1], losa[q][0], losa[q][1] + L - 2, 'd', 2);
  for (let r = 0; r < 3; r++) { const u = ((t * 0.5 + r / 3) % 1), rr = 8 + u * 60; if (u > 0.85) continue;
    for (let a = 0.35; a < 2.8; a += 2 / rr) P.p(Math.round(cx + Math.cos(a) * rr), Math.round(cy - 30 + Math.sin(a) * rr * 0.5), u < 0.4 ? 'c' : 'd'); }
  P.l(cx, 18, cx, cy - 30, 'd', 2); R.icono('satelite', cx - 3, 18, PZ.ci, PZ.f0);
  // la cota del grueso de la losa
  P.cotaV(X(0, N) - 8, Y(0, N) - L, Y(0, N), 'd');
  return { despues: () => {
    const pul = 0.5 + 0.5 * Math.sin(t * 3.2), y = 20 + Math.round(Math.sin(t * 1.4) * 1.5);
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.icono('?', 232 + dx, y + dy, PZ.hal2, PZ.hal2, 4);
    R.icono('?', 232, y, pul > 0.6 ? PZ.br : PZ.ci, PZ.f0, 4);
  }, rejilla: [70, 58, 250, 148], losa: L };
}

// 'mataha'/'regla': los pozos de 650 m junto a Kefrén y el pozo de Osiris (real, en blanco), en grande en una lupa
function c_regla(R, t, o, P) {
  const PZ = c_PZ, lupa = c_cl(o.lupa ?? 1), S = 46;
  P.l(12, S, 168, S, 'c');
  c_piramide(P, 70, 25, S, 0.76, 'c', (x, y) => ((x + y) % 3 === 0 ? PZ.hal : PZ.f3), R);
  const PX = [46, 53, 60, 67, 74, 81, 88, 95];
  for (const x of PX) c_espiral(P, x, S + 6, S + 92, 3, 5, t, true, 1, 0.5);
  for (const x of PX) { for (let y = S + 6; y < S + 92; y++) R.pset(x, y, PZ.f0); P.l(x - 1, S + 6, x - 1, S + 92, 'c'); P.l(x + 1, S + 6, x + 1, S + 92, 'c'); }
  for (const x of PX) c_espiral(P, x, S + 6, S + 92, 3, 5, t, false, 1, 0.5);
  P.l(42, S + 4, 99, S + 4, 'd'); c_cubo(P, 46, S + 92, 12, 3, -2, 1); c_cubo(P, 80, S + 92, 12, 3, -2, 1);
  P.cotaV(112, S, S + 104, 'c', '650', 116, S + 104, PZ.br);
  P.cotaV(90, 25, S, 'd', '136', 93, 38);
  // el pozo de Osiris, diminuto, junto a la calzada, y la lupa
  const ox = 150; P.l(ox - 1, S, ox - 1, S + 5, 'w'); P.l(ox + 1, S, ox + 1, S + 5, 'w'); P.l(ox - 2, S + 5, ox + 2, S + 5, 'w');
  P.l(122, S - 2, 148, S - 2, 'd', 2);   // la calzada de Kefrén
  const parp = Math.sin(t * 4) > 0;
  for (let a = 0; a < 6.28; a += 0.35) P.p(Math.round(ox + Math.cos(a) * 6), Math.round(S + 3 + Math.sin(a) * 6), parp ? 'w' : 'D');
  if (lupa > 0) {
    const x0 = 176, y0 = 58, x1 = Math.round(176 + 86 * lupa), y1 = Math.round(58 + 92 * lupa);
    P.l(ox + 5, S + 6, x0, y0, 'w', 3); P.l(ox + 3, S + 8, x0, y1, 'w', 3);
    R.poligono([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], (x, y) => ((x + y) % 2 ? PZ.f0 : PZ.f1));
    if (lupa >= 1) {
      // la roca rayada en blanco apagado y los tres niveles del pozo
      for (let y = y0 + 6; y < y1; y++) for (let x = x0 + 1; x < x1; x++) if ((x + y) % 6 === 0) R.pset(x, y, PZ.blH);
      P.l(x0 + 2, y0 + 6, x1 - 2, y0 + 6, 'w');
      const cxp = 214;
      P.l(cxp - 4, y0 + 6, cxp - 4, y0 + 24, 'w'); P.l(cxp + 4, y0 + 6, cxp + 4, y0 + 24, 'w');
      for (let k = 0; k < 5; k++) P.l(cxp - 3, y0 + 9 + k * 3, cxp + 3, y0 + 9 + k * 3, 'D');
      P.caja(cxp - 18, y0 + 24, cxp + 18, y0 + 36, 'w');                                // primer nivel
      P.l(cxp + 8, y0 + 36, cxp + 8, y0 + 52, 'w'); P.l(cxp + 14, y0 + 36, cxp + 14, y0 + 52, 'w');
      P.caja(cxp - 24, y0 + 52, cxp + 24, y0 + 66, 'w');                                // segundo: nichos con sarcófagos
      for (const sx of [-18, -6, 6]) { P.caja(cxp + sx, y0 + 59, cxp + sx + 8, y0 + 64, 'w'); P.l(cxp + sx, y0 + 58, cxp + sx + 8, y0 + 58, 'd'); }
      P.l(cxp - 16, y0 + 66, cxp - 16, y0 + 78, 'w'); P.l(cxp - 10, y0 + 66, cxp - 10, y0 + 78, 'w');
      // tercer nivel: el sarcófago en su isla, rodeado de agua
      R.poligono([[cxp - 30, y0 + 84], [cxp + 30, y0 + 84], [cxp + 30, y0 + 90], [cxp - 30, y0 + 90]], (x, y) => (y === y0 + 84 + (Math.round(Math.sin(x * 0.4 + t * 3)) > 0 ? 1 : 0) ? PZ.ag3 : (x + y) % 2 ? PZ.ag1 : PZ.ag2));
      P.caja(cxp - 30, y0 + 78, cxp + 30, y0 + 90, 'w'); P.caja(cxp - 6, y0 + 81, cxp + 6, y0 + 86, 'w'); P.l(cxp - 7, y0 + 80, cxp + 7, y0 + 80, 'w');
      P.cotaV(x0 + 8, y0 + 6, y0 + 90, 'w', '30', x0 + 11, y0 + 50, PZ.bl);
    }
    P.caja(x0, y0, x1, y1, 'w');
  }
  return { piramide: [54, 25, 86, 46], pozos: PX, osiris: [ox, S], lupa: [176, 58, 262, 150] };
}

// la paleta del decorado D: rampas de la caliza (de la junta a la luz), del granito, del ámbar de las placas, del
// cielo y del metal, y colores sueltos
const d_R = (L) => L.map(hex);

const d_CAL = d_R(['#20160e', '#3a2a1a', '#584027', '#785a35', '#987646', '#b4925a', '#c8aa70', '#dbc088', '#eacfa0', '#f6e6c4']);

const d_GRA = d_R(['#24130f', '#422422', '#643a36', '#86544c', '#a46e62', '#c08a7a', '#d8a898']);

const d_AMB = d_R(['#0e0804', '#24130a', '#40220c', '#6a3c10', '#a06418', '#d0902a', '#f2b840', '#ffd060', '#ffe89a', '#fff8dc']);

const d_CIE = d_R(['#3a78c8', '#4c8ad6', '#62a0e2', '#80b6ea', '#a2caf0', '#c4dcf0', '#e2e6e0', '#f0e2c4']);

const d_MET = d_R(['#16181e', '#2c313c', '#4a5260', '#717b8c', '#a4adbc', '#d4dae4']);

const d_MAD = d_R(['#2a160c', '#4a2a14', '#6e421e', '#94602e', '#b8804a', '#d4a46a']);

const d_ARE = d_R(['#6a5034', '#8e6e46', '#b08c5a', '#c8a46c', '#dcbc84', '#ecd29e', '#f6e4ba']);

const d_P = pal({
  caja: '#3a3e48', cajaL: '#5c6270', cajaS: '#24272e', metS: '#4a5260', metL: '#b4bcc8', acople: '#8a6a2a', rodapie: '#c4782a',
  rodapieL: '#e4a050', rodapieS: '#8a4c18', cableN: '#1e1e26', cableN2: '#34343e', cableL: '#5a5a66', cableO: '#e07a2a',
  cableOS: '#9a4a14', cableA: '#e8c040', madera: '#a0703a', maderaS: '#6a4422', maderaL: '#d2a060', telon: '#1e4a8a',
  telonL: '#3a6ab0', telonS: '#12305e', oro: '#f0c040', oroS: '#b08420', micR: '#d8382c', micA: '#2a6ad0', micV: '#3aa04a',
  micB: '#e8e8ee', luz: '#fff2c8', luzS: '#ffd890', piloto: '#ff3a2a', pantalla: '#0c1018', pared: '#c8ccd0', paredS: '#a8aeb4',
  paredL: '#dfe2e4', lino: '#8e9aa0', linoS: '#6e7a80', linoL: '#aab4b8', alfombra: '#a82a2a', alfombraS: '#701a1a',
  muonL: '#fff2b0', muonS: '#c88a20', sal: '#f2ece0', hierro: '#2a2a30', hierroL: '#5a5a66', paloma: '#8a8e9a', palomaS: '#5a5e6a',
  piel: '#c8875a', pielS: '#8e5a3a', ropa1: '#d84a3a', ropa2: '#3a7ad0', ropa3: '#e8d040', ropa4: '#f0f0f0', ropa5: '#4aa060',
  ropa6: '#7a4aa0', neg: '#0a0c10', verde: '#4ae070', rojo: '#e83a2a',
});

// la trama de Bayer 4 × 4 (umbral de 0 a 1) para tramar sin bandas
const d_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const d_umb = (x, y) => (d_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// el color de una rampa en el valor v (fraccionario), tramado entre los dos tonos vecinos
function d_tono(rp, v, x, y) { const n = rp.length - 1; if (!(v > 0)) return rp[0]; if (v >= n) return rp[n]; const i = Math.floor(v); return v - i > d_umb(x, y) ? rp[i + 1] : rp[i]; }

// mezcla dos colores: a = 0 deja c, a = 1 da d
function d_mez(c, d, a) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a) << s; return (r | 0xff000000) >>> 0; }

// la capa fija de un plano: se pinta una vez en un búfer y se copia entera en cada fotograma; con trans, el búfer
// empieza transparente (0) y solo se copian sus píxeles pintados, por encima de lo que ya hay
const d_CAPAS = new Map();

function d_capa(R, clave, dibuja, trans = false) {
  let b = d_CAPAS.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); d_CAPAS.set(clave, b); }
  if (!trans) { R.copiar(b); return; }
  const B = R.buf; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i];
}

// oscurece (o aclara, con col) lo ya pintado en un rectángulo, tramado
function d_velo(R, x0, y0, x1, y1, a, col = C.k) { for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const c = R.pget(x, y); if (c) R.pset(x, y, d_mez(c, col, a)); } }

// una nube de tres tonos (sombra abajo, cuerpo y luz arriba) hecha de bolas; evita la esquina de Atom
function d_nube(R, cx, cy, w, tonos) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.42, 1.2, r * 0.75], [-w * 0.15, -0.6, r * 1.05], [w * 0.18, -1.4, r * 0.95], [w * 0.42, 0.8, r * 0.72]];
  const bola = (x0, y0, rr, c) => { for (let y = Math.floor(y0 - rr); y <= y0 + rr; y++) for (let x = Math.floor(x0 - rr); x <= x0 + rr; x++) { if ((x > 270 && y < 48) || y < 0 || x < 0 || x > 319) continue; if ((x - x0) ** 2 + ((y - y0) * 1.25) ** 2 <= rr * rr) R.pset(x, y, c); } };
  for (const [dx, dy, rr] of B) bola(cx + dx, cy + dy + 1.6, rr, tonos[2]);
  for (const [dx, dy, rr] of B) bola(cx + dx, cy + dy, rr * 0.92, tonos[1]);
  for (const [dx, dy, rr] of B) bola(cx + dx - rr * 0.25, cy + dy - rr * 0.3, rr * 0.55, tonos[0]);
  for (let x = Math.round(cx - w * 0.6); x <= cx + w * 0.6; x++) if (!(x > 270 && cy < 48)) R.pset(x, Math.round(cy + r * 0.9 + 1.5), tonos[2]);
}

// un pájaro lejano que bate las alas (una uve de 5 px)
function d_ave(R, x, y, t, c = C.k) { x = Math.round(x); y = Math.round(y); if (x > 270 && y < 48) return; const a = Math.sin(t * 10) > 0 ? -1 : 1; R.pset(x, y, c); R.pset(x - 1, y + a, c); R.pset(x + 1, y + a, c); R.pset(x - 2, y + a * 2 * (a < 0 ? 1 : 0), c); R.pset(x + 2, y + a * 2 * (a < 0 ? 1 : 0), c); }

// la lluvia de muones: rayitas ámbar que caen casi en vertical (cabeza clara, cola tramada) atravesándolo todo;
// n: cuántas a la vez; zona [x0, y0, x1, y1]
function d_muones(R, t, n, zona = [0, 0, 319, 179]) {
  const [x0, y0, x1, y1] = zona, alto = y1 - y0 + 40;
  for (let k = 0; k < n; k++) {
    const v = 150 + h(k, 2, 701) * 120, ph = h(k, 3, 701) * alto, ciclo = Math.floor((t * v + ph) / alto), y = y0 - 20 + ((t * v + ph) % alto);
    const x = x0 + h(k, ciclo, 702) * (x1 - x0) + (y - y0) * (h(k, 4, 701) - 0.5) * 0.3, L = 5 + Math.round(h(k, 5, 701) * 5);
    for (let i = 0; i < L; i++) { const yy = Math.round(y - i), xx = Math.round(x - i * (h(k, 4, 701) - 0.5) * 0.3); if (yy < y0 || yy > y1 || (xx > 276 && yy < 46)) continue;
      if (i === 0) R.pset(xx, yy, d_P.muonL); else if (i < 3) R.pset(xx, yy, C.muon); else if ((xx + yy + i) & 1) R.pset(xx, yy, d_P.muonS); }
  }
}

// una figura pequeña de fondo (8–11 px): cabeza, cuerpo de color y piernas que se alternan al andar
function d_figura(R, x, suelo, t, ropa, o = {}) {
  const { rect, pset } = R, s = o.alto ?? 10, anda = o.anda !== false, f = anda ? Math.floor(t * 6 + x) % 2 : 0; x = Math.round(x); suelo = Math.round(suelo);
  const cab = suelo - s, pie = o.piel ?? d_P.piel;
  rect(x - 1, cab, x + 1, cab + 2, pie); pset(x + 1, cab + 2, d_P.pielS); if (o.gorra) rect(x - 1, cab - 1, x + 2, cab - 1, o.gorra); else rect(x - 1, cab - 1, x + 1, cab - 1, o.pelo ?? C.k);
  rect(x - 2, cab + 3, x + 1, suelo - 3, ropa); pset(x + 1, cab + 3, d_mez(ropa, C.k, 0.3)); rect(x - 2, suelo - 3, x + 1, suelo - 3, d_mez(ropa, C.k, 0.45));
  pset(x - 1 - f, suelo - 2, C.k); pset(x - 1 - f, suelo - 1, C.k); pset(x + f, suelo - 2, C.k); pset(x + f, suelo - 1, C.k);
  if (o.movil && Math.sin(t * 3 + x) > 0.6) { pset(x + 2, cab, C.blanco); pset(x + 2, cab + 1, d_P.metS); }
  else if (o.movil) { pset(x + 2, cab + 1, d_P.metS); pset(x + 2, cab + 2, d_P.metS); }
}

const d_SALA = { W: 2.62, He: 4.7, Ha: 6.23, L: 5.75 };

const d_CAMR = { x: -0.3, y: 1.45, z: 0.15, f: 92, hy: 126 };

// de un punto del mundo (metros) a la pantalla
const d_proy = (X, Y, Z, c = d_CAMR) => [160 + c.f * (X - c.x) / (Z - c.z), c.hy - c.f * (Y - c.y) / (Z - c.z)];

// el nicho escalonado del muro este: centro en X = 0.55, y cinco escalones que se estrechan hacia arriba
const d_NICHO = [[0, 1.85, 0.78], [1.85, 2.6, 0.62], [2.6, 3.35, 0.47], [3.35, 4.05, 0.32], [4.05, 4.67, 0.17]];

// las hiladas de los muros (alturas en m)
const d_HIL = [0, 1.02, 1.98, 2.86, 3.84, 4.7, 5.5, 6.3];

function d_hilada(Y) { let c = 0; while (c < d_HIL.length - 2 && Y >= d_HIL[c + 1]) c++; return c; }

// cada sillar de un muro (u: horizontal, Y): su número
function d_sillar(s, u, Y) { const c = d_hilada(Y), w = 1.15 + h(s, c, 703) * 1.1, b = Math.floor((u + h(s, c, 704) * 3) / w); return s * 1e6 + c * 1000 + b + 500; }

function d_reinaFija(R) {
  const G = d_SALA, c = d_CAMR, k = (G.Ha - G.He) / G.W, N = 320 * 180;
  const ID = new Int32Array(N), SU = new Uint8Array(N), VA = new Float32Array(N);
  const focos = [[-2.25, 1.75, 5.3, 1.9], [1.75, 1.35, 2.7, 1.3]];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dx = (x - 160) / c.f, dy = (c.hy - y) / c.f;
    let tb = G.L - c.z, s = 3;
    if (dx > 1e-6) { const q = (G.W - c.x) / dx; if (q < tb) { tb = q; s = 2; } }
    if (dx < -1e-6) { const q = (-G.W - c.x) / dx; if (q < tb) { tb = q; s = 1; } }
    if (dy < -1e-6) { const q = -c.y / dy; if (q < tb) { tb = q; s = 0; } }
    { const den = dy + k * dx; if (den > 1e-6) { const q = (G.Ha - k * c.x - c.y) / den; if (q > 0 && q < tb && c.x + dx * q >= 0) { tb = q; s = 5; } } }
    { const den = dy - k * dx; if (den > 1e-6) { const q = (G.Ha + k * c.x - c.y) / den; if (q > 0 && q < tb && c.x + dx * q < 0) { tb = q; s = 4; } } }
    const X = c.x + dx * tb, Y = c.y + dy * tb, Z = c.z + tb, i = y * 320 + x;
    let id, n, v = 0, sal = 0;
    if (s === 0) { const a = Math.floor((X + Math.sin(Z * 2.1) * 0.25) / 1.25), b = Math.floor((Z + h(a, 1, 705) * 0.7) / 0.95); id = a * 1000 + b + 500; n = [0, 1, 0]; v -= 0.25; }
    else if (s === 1 || s === 2) { id = d_sillar(s, Z, Y); n = [s === 1 ? 1 : -1, 0, 0]; sal = 1;
      if (s === 1 && Z > 3.95 && Z < 5.0 && Y < 1.17) { id = 7e6; v -= 3.2 + (1.17 - Y); }   // la boca del pasillo de entrada
      if (Z > 3.05 && Z < 3.27 && Y > 1.55 && Y < 1.77) { id = 8e6 + s; v -= 3.4; }   // los canales de ventilación
    } else if (s === 3) { n = [0, 0, -1]; id = d_sillar(3, X, Y); sal = 1;
      for (let e = 0; e < d_NICHO.length; e++) { const [ya, yb, w] = d_NICHO[e]; if (Y >= ya && Y < yb && Math.abs(X - 0.55) < w) { id = 6e6 + e * 10 + (X < 0.55 - w + 0.12 ? 1 : X > 0.55 + w - 0.12 ? 2 : 0); v -= 1.1 + (id % 10 === 2 ? 0.6 : id % 10 === 1 ? -0.3 : 0) + (4.67 - Y) * 0.05; } }
    } else { id = s * 1e6 + Math.floor((Z + 0.2) / 0.92); n = s === 5 ? [-k, -1, 0] : [k, -1, 0]; const m = Math.hypot(n[0], 1); n = [n[0] / m, n[1] / m, 0]; v -= 0.3; }
    // la luz: ambiente, la de los focos de trípode y la de las linternas frontales (desde la cámara)
    let lum = 0.1 + 0.16 / (1 + 0.05 * tb * tb);
    for (const [lx, ly, lz, I] of focos) { const vx = lx - X, vy = ly - Y, vz = lz - Z, d = Math.hypot(vx, vy, vz) + 1e-6, cs = (n[0] * vx + n[1] * vy + n[2] * vz) / d; if (cs > 0) lum += I * cs / (1 + d * d * 0.55); }
    if (s >= 1 && s !== 4 && s !== 5) lum *= 0.82 + 0.18 * Math.min(1, Y / 0.6);   // la penumbra al pie de los muros
    v += 0.7 + Math.min(lum, 1.5) * 5 + (h(id, 7, 706) - 0.5) * 0.9 + (h(x, y, 707) - 0.5) * 0.5;
    // la sal que aflora en los muros de la Cámara de la Reina (manchas blanquecinas moteadas)
    if (sal && id < 6e6 && Math.sin(X * 2.3 + Z * 2.1 + Y * 1.4) * Math.sin(Y * 3.1 - (X + Z) * 1.2 + 1.3) > 0.5 && h(x, y, 708) < 0.28) v += 1.6;
    ID[i] = id; SU[i] = s; VA[i] = v;
  }
  const B = R.buf;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const i = y * 320 + x; let v = VA[i];
    const der = x < 319 ? ID[i + 1] : ID[i], aba = y < 179 ? ID[i + 320] : ID[i], arr = y > 0 ? ID[i - 320] : ID[i];
    if (SU[i] !== (x < 319 ? SU[i + 1] : SU[i]) || SU[i] !== (y < 179 ? SU[i + 320] : SU[i])) v -= 2.2;
    else if (ID[i] !== der || ID[i] !== aba) v -= 2;
    else if (ID[i] !== arr) v += 0.8;
    if (h(x, y, 709) < 0.022) v -= 1.4;   // desconchones
    if ((x > 272 && y < 48) || (x > 14 && x < 176 && y < 18)) v = 2.6 + (v - 2.6) * 0.35;   // la esquina de Atom y la barra del año, tranquilas
    B[i] = d_tono(d_CAL, v, x, y);
  }
  // el polvo del suelo junto a los muros y unos cascotes
  for (let k = 0; k < 40; k++) { const X = -2.4 + h(k, 1, 710) * 4.8, Z = 2.6 + h(k, 2, 710) * 3, [px, py] = d_proy(X, 0, Z); R.pset(Math.round(px), Math.round(py), d_CAL[2]); R.pset(Math.round(px) + 1, Math.round(py), d_CAL[6]); }
  // los cables naranja y negros que serpentean por el suelo desde el pasillo hasta los detectores y el maletín
  const cable = (pts, col, colS) => { for (let j = 0; j + 1 < pts.length; j++) { const [ax, ay] = d_proy(...pts[j]), [bx, by] = d_proy(...pts[j + 1]); R.linea(ax, ay, bx, by, col); R.linea(ax, ay + 1, bx, by + 1, colS); } };
  cable([[-2.6, 0, 4.4], [-1.9, 0, 4.1], [-1.2, 0, 4.6], [-0.9, 0, 5.2]], d_P.cableO, d_P.cableOS);
  cable([[-2.6, 0, 4.6], [-1.6, 0, 3.6], [0.2, 0, 3.4], [1.2, 0, 4.2], [1.5, 0, 4.6]], d_P.cableN2, d_P.cableN);
  cable([[-1.6, 0, 3.6], [-1.7, 0, 3.0], [-1.4, 0, 2.6]], d_P.cableA, d_P.cableOS);
  // las placas de película: de pie contra los muros y una pila tumbada
  const placa = (X, Z, opc) => { const [px, py] = d_proy(X, 0, Z); PIEZAS_GZ.placaEmulsion?.(R, px, py + 1, opc); };
  placa(-2.35, 5.5, {}); placa(2.35, 5.0, { dir: -1 }); placa(0.55, 5.66, {});
  { const [px, py] = d_proy(-2.1, 0, 3.9); for (let j = 0; j < 3; j++) PIEZAS_GZ.placaEmulsion?.(R, px + j, py - j * 2, { tumbada: true }); }
  // el maletín con el portátil abierto, junto al muro sur
  { const [px, py] = d_proy(2.2, 0, 3.3); const x = Math.round(px), y = Math.round(py);
    R.rect(x - 12, y - 9, x + 12, y, C.k); R.rect(x - 11, y - 8, x + 11, y, d_P.caja); R.rect(x - 11, y - 8, x + 11, y - 8, d_P.cajaL); R.rect(x + 9, y - 7, x + 11, y, d_P.cajaS);
    R.rect(x - 4, y - 5, x + 4, y - 4, d_P.metS); PIEZAS_GZ.portatil?.(R, x - 2, y - 8, { pantalla: 'azul' }); }
}

function d_reina(R, t, o) {
  d_capa(R, 'reina', () => d_reinaFija(R));
  const mu = o.muones ?? 0;
  // los dos focos de trípode: las patas, la cabeza con la rejilla y el resplandor que tiembla un poco
  for (const [X, Y, Z, dir] of [[-2.25, 1.75, 5.3, 1], [1.75, 1.35, 2.7, -1]]) {
    const [px, py] = d_proy(X, Y, Z), [fx, fy] = d_proy(X, 0, Z), x = Math.round(px), y = Math.round(py), f = Math.round(fy);
    R.linea(x, y + 3, x - 5, f, C.k); R.linea(x, y + 3, x + 5, f, C.k); R.linea(x, y + 3, x, f, d_P.metS);
    R.rect(x - 4, y - 3, x + 4, y + 3, C.k); R.rect(x - 3, y - 2, x + 3, y + 2, d_P.luz); for (let j = -2; j <= 2; j += 2) R.rect(x - 3, y + j, x + 3, y + j, d_P.luzS);
    const g = 0.5 + 0.5 * Math.sin(t * 13 + X * 7) * Math.sin(t * 3.1 + Z);
    for (let a = 0; a < 12; a++) { const r = 6 + (a % 3) * 2 + Math.round(g), an = a * 0.52 + t * 0.2; if ((a + Math.floor(t * 8)) % 4 === 0) continue; R.pset(Math.round(x + dir * 2 + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.7), d_P.luzS); }
  }
  // los dos detectores en el suelo, con sus lucecitas
  const dets = [[-1.15, 0, 5.3], [1.35, 0, 4.7]].map(([X, Y, Z]) => d_proy(X, Y, Z));
  for (const [px, py] of dets) PIEZAS_GZ.detectorMuones?.(R, px, py + 1, { t });
  // motas de polvo que flotan en la luz de los focos
  for (let k = 0; k < 26; k++) { const x = Math.round(60 + h(k, 1, 712) * 200 + Math.sin(t * 0.5 + k) * 6), y = Math.round(40 + ((h(k, 2, 712) * 100 + t * (1.5 + h(k, 3, 712) * 2)) % 100)); if (Math.sin(t * 1.7 + k * 2) > -0.2) R.pset(x, y, d_P.luz); }
  if (mu > 0) {
    d_muones(R, t, Math.round(34 * mu));
    // cada detector destella cuando le llega uno
    dets.forEach(([px, py], k) => { const f = (t * 2.3 + k * 0.4) % 1; if (f < 0.18 * mu + 0.05) { for (let a = 0; a < 8; a++) R.pset(Math.round(px + Math.cos(a * 0.8) * 9), Math.round(py - 8 + Math.sin(a * 0.8) * 5), d_P.muonL); } });
  }
  const pie = (X, Z) => Math.round(d_proy(X, 0, Z)[1]);
  return { suelo: pie(0, 4.6), suelos: { fondo: pie(0, 5.5), medio: pie(0, 4.2), cerca: pie(0, 3.2) }, libre: [44, 270], nicho: [166, 66, 186, 143], detectores: dets.map(([x, y]) => [Math.round(x), Math.round(y)]), entrada: [8, 128, 30, 150] };
}

// el suelo de la galería: rellano horizontal (x 22–96, y 166) y después la rampa que sube hasta el gran escalón (x 262)
const d_galSuelo = (x) => x <= 96 ? 166 : x >= 262 ? 166 - 166 * 0.4 : 166 - (x - 96) * 0.4;

const d_GALTECHO = 74;   // la altura de la galería (px, en vertical)

const d_galVacio = (x) => d_galSuelo(x) - d_GALTECHO - 22;   // la línea media del gran vacío

function d_galeriaFija(R) {
  const { rect, pset, linea, poligono } = R, B = R.buf;
  // la piedra en corte: hiladas grandes, más frías y apagadas que lo que da la luz, con su rayado de corte suave
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const c = Math.floor((y + 3) / 15), w = 30 + Math.round(h(c, 1, 720) * 26), b = Math.floor((x + h(c, 2, 720) * 60) / w), id = c * 1000 + b;
    const jb = Math.floor((y + 4) / 15) !== c || Math.floor((x + 1 + h(c, 2, 720) * 60) / w) !== b, ja = Math.floor((y + 2) / 15) !== c;
    let v = 2.6 + (h(id, 3, 720) - 0.5) * 0.8 + (h(x, y, 721) - 0.5) * 0.6 + (jb ? -1.6 : ja ? 0.6 : 0) + ((x - y) % 7 === 0 ? -0.25 : 0);
    if (h(x, y, 722) < 0.02) v -= 1;
    B[y * 320 + x] = d_tono(d_CAL, v, x, y);
  }
  // el hueco de la galería: la pared del fondo con su luz, las siete hiladas en voladizo y el techo estrecho
  const sue = d_galSuelo, top = (x) => sue(x) - d_GALTECHO;
  for (let x = 22; x <= 262; x++) {
    const yS = Math.round(sue(x)), yT = Math.round(top(x));
    for (let y = yT; y <= yS; y++) {
      const z = yS - y;   // la altura sobre el suelo
      let v, cl = 0;
      if (z < 7) { v = 4.6; if (z === 6) v = 5.8; if (((x + 3) % 11) < 3 && z > 1 && z < 5 && x > 100) v = 1.4; }   // la rampa lateral con sus mechinales
      else if (z < 30) { v = 5.4 - (z - 7) * 0.02; const bl = Math.floor((x + Math.floor(z / 8) * 9) / 26); cl = bl; if ((x + Math.floor(z / 8) * 9) % 26 === 0) v -= 1.6; if (z % 8 === 0) v -= 1.2; }   // el muro bajo
      else if (z < d_GALTECHO - 4) { const q = z - 30, e = Math.floor(q / 6), r = q % 6; v = 5.2 - e * 0.32; if (r === 0) v += 1.1; if (r === 5) v -= 1.5; if (r === 4) v -= 0.5; }   // los voladizos
      else v = 1.6;   // el techo estrecho, en sombra
      // la luz de las lámparas de la pared, en charcos cálidos
      const lx = (Math.round((x - 40) / 46) * 46 + 40), d = Math.hypot(x - lx, (z - 40) * 1.3);
      v += Math.max(0, 1 - d / 34) * 1.2 - 0.4;
      v += (h(x, y, 723) - 0.5) * 0.55 + (h(cl, 4, 724) - 0.5) * 0.3;
      B[y * 320 + x] = d_tono(d_CAL, v, x, y);
    }
    // el borde del corte, arriba y abajo
    pset(x, yT - 1, d_CAL[1]); pset(x, yS + 1, d_CAL[1]); pset(x, yT - 2, d_CAL[6]);
  }
  // los cantos verticales del corte a los dos extremos
  linea(21, top(22), 21, 166, d_CAL[1]); linea(263, top(262), 263, sue(262), d_CAL[1]);
  // la pasarela de madera: tablones con travesaños, y la barandilla del fondo
  for (let x = 24; x <= 260; x++) { const y = Math.round(sue(x)); pset(x, y - 1, d_P.maderaL); pset(x, y, d_P.madera); pset(x, y + 1, d_P.maderaS); if (x > 96 && x % 5 === 0) { pset(x, y - 2, d_P.maderaS); pset(x, y - 1, d_P.maderaS); } }
  for (let x = 30; x <= 258; x += 18) { const y = Math.round(sue(x)); linea(x + 3, y - 1, x + 3, y - 15, d_P.maderaS); }
  for (let x = 28; x <= 262; x++) pset(x, Math.round(sue(x) - 15), d_P.madera);
  // el pasillo de la Cámara de la Reina, que sale del rellano hacia la izquierda
  rect(0, 148, 21, 166, d_CAL[0]); for (let y = 148; y <= 166; y++) for (let x = 0; x < 21; x++) if (d_umb(x, y) < (x / 21) * 0.5) pset(x, y, d_CAL[1]);
  rect(0, 147, 21, 147, d_CAL[5]); rect(0, 167, 21, 167, d_CAL[5]);
  // arriba a la derecha: el gran escalón, el pasillo bajo, la antecámara y la Cámara del Rey de granito con su sarcófago
  { const y = Math.round(sue(262)); rect(263, y - 18, 280, y, d_CAL[1]); rect(263, y - 19, 280, y - 19, d_CAL[6]); rect(263, y + 1, 280, y + 1, d_CAL[5]);
    for (let yy = 64; yy <= y; yy++) for (let x = 281; x <= 319; x++) { const jb = (yy - 64) % 9 === 0 || (x + Math.floor((yy - 64) / 9) * 7) % 13 === 0; B[yy * 320 + x] = d_tono(d_GRA, 3.6 + (jb ? -1.8 : 0) + (h(x, yy, 725) - 0.5) * 0.9 + (h(x >> 2, yy >> 3, 726) - 0.5) * 0.6, x, yy); }
    rect(286, 72, 319, y - 1, d_GRA[1]); for (let yy = 72; yy < y; yy++) for (let x = 286; x <= 319; x++) if (d_umb(x, yy) < 0.25 + (yy - 72) / 60) pset(x, yy, d_GRA[2]);
    rect(298, y - 9, 316, y - 1, C.k); rect(299, y - 8, 315, y - 1, d_GRA[4]); rect(299, y - 8, 315, y - 8, d_GRA[6]); rect(299, y - 5, 315, y - 5, d_GRA[3]);
    // las cámaras de descarga: vigas de granito con huecos negros (debajo de la esquina de Atom, tranquilas)
    for (let j = 0; j < 2; j++) { const yy = 50 + j * 7; rect(284, yy, 319, yy + 4, d_GRA[3]); rect(284, yy, 319, yy, d_GRA[5]); rect(288, yy + 5, 319, yy + 6, d_GRA[1]); }
  }
  // los mechinales del rellano y unos cascotes por el suelo
  for (let k = 0; k < 14; k++) { const x = 26 + Math.round(h(k, 1, 727) * 230), y = Math.round(sue(x)) - 2; pset(x, y, d_CAL[3]); }
}

function d_galeria(R, t, o) {
  d_capa(R, 'galeria', () => d_galeriaFija(R));
  const { pset, rect } = R, va = Math.max(0, Math.min(1, o.vacio ?? 0)), sue = d_galSuelo;
  // las lámparas de la pared, con su resplandor que parpadea muy poco
  for (let lx = 40; lx <= 250; lx += 46) { const y = Math.round(sue(lx) - 40), g = Math.sin(t * 11 + lx) > 0.9 ? 1 : 0;
    rect(lx - 1, y - 2, lx + 1, y + 1, d_P.hierro); rect(lx - 1, y - 1, lx + 1, y, g ? d_P.luzS : d_P.luz); pset(lx, y - 3, d_P.hierroL);
    for (let a = 0; a < 10; a++) { const an = a * 0.63 + t * 0.3, r = 4 + (a & 1); if (h(a, Math.floor(t * 6), 730) < 0.7) pset(Math.round(lx + Math.cos(an) * r), Math.round(y + Math.sin(an) * r * 0.8), d_P.luzS); } }
  // dos turistas lejanos que suben despacio por la pasarela, al fondo
  for (let k = 0; k < 2; k++) { const x = 150 + ((t * 3 + k * 46) % 100), y = sue(x); d_figura(R, x, y - 1, t, k ? d_P.ropa2 : d_P.ropa1, { alto: 9 }); }
  // el gran vacío: una forma alargada paralela a la galería; se enciende en blanco cálido con un halo que late
  if (va > 0) {
    const x0 = 112, x1 = 252, late = 0.85 + 0.15 * Math.sin(t * 3.2);
    for (let x = x0 - 8; x <= x1 + 8; x++) { const yc = d_galVacio(x);
      for (let y = Math.round(yc - 14); y <= yc + 14; y++) {
        const ex = x < x0 ? (x0 - x) / 8 : x > x1 ? (x - x1) / 8 : 0, dy = Math.abs(y - yc) / 6.5, d = Math.hypot(ex, Math.max(0, dy - 0) * 1);
        const c = R.pget(x, y); if (!c) continue;
        if (d <= 1) { const k = va * late; if (d_umb(x, y) < k) R.pset(x, y, d > 0.82 ? d_P.luzS : d < 0.45 && d_umb(x + 1, y) < k * 0.9 ? C.blanco : d_P.luz); }
        else if (d < 2.1) { const q = (2.1 - d) / 1.1 * va * late * 0.55; if (d_umb(x, y) < q) R.pset(x, y, d_mez(c, d_P.luzS, 0.5)); }
      } }
    // el contorno discontinuo mientras aparece
    if (va < 1) for (let x = x0; x <= x1; x += 2) { const yc = Math.round(d_galVacio(x)); pset(x, yc - 7, d_P.luzS); pset(x, yc + 7, d_P.luzS); }
  }
  if ((o.muones ?? 0) > 0) d_muones(R, t, Math.round(30 * o.muones));
  return { suelo: 166, sueloEn: sue, rellano: [26, 96], libre: [30, 96], vacio: [112, Math.round(d_galVacio(112)), 252, Math.round(d_galVacio(252))], camaraRey: [286, 72, 319, 98], pasilloReina: [0, 148, 21, 166] };
}

const d_NORTE = { suelo: 170, plataforma: 104, rendija: [102, 80], chevron: [150, 30], entrada: [140, 100, 160, 120], mamun: [222, 118, 256, 148] };

// las hiladas de la cara, de abajo arriba (más bajas cuanto más arriba): [y de arriba, y de abajo]
const d_HILN = (() => { const L = []; let y = 162; while (y > -12) { const a = Math.round(9 + (y / 162) * 6); L.push([y - a, y]); y -= a; } return L; })();

function d_norteFija(R) {
  const { rect, pset, linea, poligono } = R, B = R.buf, [cx, cy] = d_NORTE.chevron;
  // la cara: cada hilada con su huella de arriba (luz y arena), su frente erosionado y las juntas entre sillares
  for (let f = 0; f < d_HILN.length; f++) {
    const [y0, y1] = d_HILN[f];
    let x = -Math.round(h(f, 1, 740) * 30), b = 0;
    while (x < 320) {
      const w = 16 + Math.round(h(f, b, 741) * 22), xa = x, xb = x + w - 1, tono = (h(f, b, 742) - 0.5) * 0.9, falta = h(f, b, 743) < 0.035 && f > 2;
      for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let xx = Math.max(0, xa); xx <= Math.min(319, xb); xx++) {
        const dy = y - y0, dx = xx - xa, ddx = xb - xx;
        let v;
        if (falta) v = dy < 2 ? 4.6 : 1.4 + dy * 0.04;   // un sillar que falta: el hueco en sombra
        else if (dy === 0) v = 7.4;   // el canto de la huella, al sol
        else if (dy === 1) v = 6.4 + (h(xx, y, 744) < 0.3 ? 1 : 0);   // la huella, con arena
        else { v = 4.5 + tono - (dy / (y1 - y0)) * 0.9 + (dx === 0 ? 0.9 : 0) + (ddx === 0 ? -1.8 : ddx === 1 ? -0.6 : 0);
          if ((dx < 2 || ddx < 2) && dy > (y1 - y0) - 3) v -= 1;   // las esquinas gastadas
          if (h(xx >> 1, y >> 1, 745 + f) < 0.06) v -= 0.9; if (h(xx, y, 746) < 0.035) v += 1.2; }
        if (y === y1) v = 1.2;   // la sombra bajo la huella de la hilada de abajo
        v += (h(xx, y, 747) - 0.5) * 0.45;
        B[y * 320 + xx] = d_tono(d_CAL, v, xx, y);
      }
      x += w; b++;
    }
  }
  // la esquina de Atom, tranquila: la piedra se aplana hacia un tono medio
  for (let y = 2; y < 48; y++) for (let x = 272; x < 320; x++) B[y * 320 + x] = d_mez(B[y * 320 + x], d_CAL[5], 0.28 * Math.min(1, (x - 272) / 10, (48 - y) / 10));
  // el entorno de la entrada: sillares grandes y lisos de revestimiento, más claros
  for (let y = 88; y <= 128; y++) for (let x = 104; x <= 196; x++) { const c = Math.floor((y - 88) / 13), bb = Math.floor((x - 104 + c * 11) / 30), jb = (y - 88) % 13 === 12 || (x - 104 + c * 11) % 30 === 29, ja = (y - 88) % 13 === 0;
    B[y * 320 + x] = d_tono(d_CAL, 5.6 + (h(c, bb, 748) - 0.5) * 0.7 + (jb ? -2.4 : ja ? 0.9 : 0) + (h(x, y, 749) - 0.5) * 0.4 - (y - 88) * 0.012, x, y); }
  // los dos pares de bloques en chevrón (a dos aguas): el de atrás más alto y el de delante; debajo, el hueco del tejado
  const losa = (ax, ay, bx, by, g, luz) => { const nx = (ay - by), ny = (bx - ax), m = Math.hypot(nx, ny), ox = nx / m * g, oy = ny / m * g;
    poligono([[ax, ay], [bx, by], [bx + ox, by + oy], [ax + ox, ay + oy]], (x, y) => { const u = ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2), w = ((x - ax) * ox + (y - ay) * oy) / (g * g);
      let v = luz + (w < 0.12 ? 1.3 : w > 0.86 ? -1.6 : 0) - w * 0.6 + (h(x, y, 750) - 0.5) * 0.5 + (h(x >> 2, y >> 2, 751) - 0.5) * 0.5; if (Math.abs(u - 0.5) < 0.008) v -= 2; return d_tono(d_CAL, v, x, y); });
    linea(ax, ay, bx, by, d_CAL[8]); linea(ax + ox, ay + oy, bx + ox, by + oy, d_CAL[1]); };
  poligono([[cx - 62, 96], [cx, 26], [cx + 62, 96]], d_CAL[1]);
  losa(cx - 64, 94, cx, 22, 13, 5.9); losa(cx + 64, 94, cx, 22, -13, 5.1);
  poligono([[cx - 40, 98], [cx, 54], [cx + 40, 98]], (x, y) => d_tono(d_CAL, 1 + (h(x >> 1, y >> 1, 752) < 0.3 ? 0.8 : 0) + (y - 54) * 0.01, x, y));
  losa(cx - 46, 98, cx, 46, 12, 6.3); losa(cx + 46, 98, cx, 46, -12, 5.4);
  // la entrada original: la boca del pasillo descendente con su reja de hierro
  { const [x0, y0, x1, y1] = d_NORTE.entrada; rect(x0 - 1, y0 - 1, x1 + 1, y1, d_CAL[1]); for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, d_tono(d_CAL, 0.4 + (y1 - y) * 0.03, x, y));
    for (let x = x0 + 2; x < x1; x += 4) linea(x, y0, x, y1 - 1, d_P.hierroL); rect(x0, y0 + 5, x1, y0 + 5, d_P.hierroL); rect(x0, y1 - 4, x1, y1 - 4, d_P.hierro); rect(x0 - 2, y1, x1 + 2, y1 + 1, d_CAL[7]); }
  // la rendija entre dos piedras, a la izquierda del chevrón
  { const [rx, ry] = d_NORTE.rendija; linea(rx - 1, ry - 7, rx + 1, ry + 7, d_CAL[0]); linea(rx, ry - 7, rx + 2, ry + 7, d_CAL[1]); linea(rx + 2, ry - 7, rx + 3, ry + 7, d_CAL[8]); }
  // el boquete de Al-Mamún: piedra rota, la boca negra con una luz al fondo, y la escalera de los turistas
  { const [x0, y0, x1, y1] = d_NORTE.mamun, mx = (x0 + x1) / 2;
    poligono([[x0, y1], [x0 + 2, y0 + 8], [x0 + 8, y0 + 1], [mx, y0 - 2], [x1 - 6, y0 + 2], [x1, y0 + 9], [x1 + 1, y1]], d_CAL[1]);
    poligono([[x0 + 2, y1], [x0 + 4, y0 + 9], [x0 + 9, y0 + 3], [mx, y0 + 1], [x1 - 7, y0 + 4], [x1 - 2, y0 + 10], [x1 - 1, y1]], (x, y) => d_tono(d_CAL, 0.2 + Math.max(0, 1.3 - Math.hypot(x - mx - 3, y - y1 + 9) / 8), x, y));
    R.disco(mx + 3, y1 - 9, 1, d_P.luzS); rect(x0 - 2, y1, x1 + 2, y1 + 2, d_CAL[6]); rect(x0 - 2, y1 + 3, x1 + 2, y1 + 3, d_CAL[2]);
    // la escalera de madera y metal que baja hacia la derecha hasta el suelo
    for (let s = 0; s < 8; s++) { const sx = x1 + 2 + s * 6, sy = y1 + 3 + s * 3; rect(sx - 4, sy, sx + 4, sy + 2, d_P.madera); rect(sx - 4, sy, sx + 4, sy, d_P.maderaL); rect(sx - 4, sy + 3, sx + 4, sy + 3, d_CAL[2]); }
    linea(x1 + 2, y1 - 8, x1 + 50, y1 + 16, d_P.hierroL); linea(x1 + 2, y1 - 7, x1 + 50, y1 + 17, d_P.hierro);
    for (let s = 0; s < 9; s += 2) { const sx = x1 + 2 + s * 6; linea(sx, y1 - 8 + s * 3, sx, y1 + 3 + s * 3, d_P.hierro); } }
  // el andamio de tubos: tres pies, largueros, dos plataformas de tablones, diagonales y la escalera
  { const p = d_NORTE.plataforma, sue = d_NORTE.suelo, met = (x0, y0, x1, y1) => { linea(x0, y0, x1, y1, d_P.metS); linea(x0 + 1, y0, x1 + 1, y1, d_P.metL); };
    for (const x of [22, 58, 94]) { met(x, p - 16, x, sue); rect(x - 2, sue - 1, x + 3, sue, d_P.hierro); }
    for (const y of [p, 136]) { met(18, y, 112, y); for (const x of [22, 58, 94]) rect(x - 1, y - 1, x + 2, y + 1, d_P.acople); }
    met(22, 136, 58, p + 2); met(58, 136, 94, p + 2); met(22, sue - 2, 58, 138); met(58, sue - 2, 94, 138);
    for (const y of [p, 136]) { rect(16, y - 3, 114, y - 1, d_P.madera); rect(16, y - 3, 114, y - 3, d_P.maderaL); for (let x = 16; x < 114; x += 12) pset(x, y - 2, d_P.maderaS); }
    for (let y = 108; y < sue; y += 5) rect(40, y, 46, y, d_P.metL); linea(40, 104, 40, sue, d_P.metS); linea(46, 104, 46, sue, d_P.metS);
    // el maletín con la pantallita (enseña lo que ve la cámara) y el carrete del cable sobre la plataforma
    rect(60, p - 14, 76, p - 4, C.k); rect(61, p - 13, 75, p - 5, d_P.caja); rect(63, p - 12, 73, p - 7, d_P.pantalla); rect(61, p - 4, 75, p - 4, d_P.cajaS);
    R.disco(84, p - 8, 5, C.k); R.disco(84, p - 8, 4, d_P.cableO); R.anillo(84, p - 8, 2, d_P.cableOS); pset(84, p - 8, d_P.metL);
    // los cables que bajan por el andamio hasta el grupo electrógeno del suelo
    linea(76, p - 6, 96, p + 4, d_P.cableN); linea(96, p + 4, 96, sue - 6, d_P.cableN); linea(97, p + 4, 97, sue - 6, d_P.cableN2); }
  // el suelo: arena con cascotes, el camino de los turistas, la cuerda con sus postes y sillares caídos
  for (let y = 163; y < 180; y++) for (let x = 0; x < 320; x++) { const v = 3.6 + (y - 163) * 0.08 + (h(x >> 1, y, 753) - 0.5) * 0.9 + (h(x >> 3, y >> 2, 754) - 0.5) * 0.7 - (y < 166 ? 1.2 : 0); B[y * 320 + x] = d_tono(d_ARE, v, x, y); }
  for (let k = 0; k < 50; k++) { const x = Math.round(h(k, 1, 755) * 319), y = 166 + Math.round(h(k, 2, 755) * 12); rect(x, y, x + 1 + (k % 3), y + 1, d_CAL[5]); rect(x, y + 2, x + 1 + (k % 3), y + 2, d_CAL[2]); }
  for (const x of [128, 170, 212, 300]) { rect(x, 160, x + 1, 171, d_P.hierro); rect(x - 1, 159, x + 2, 160, d_P.oroS); }
  for (const [a, b] of [[128, 170], [170, 212]]) for (let x = a; x <= b; x++) pset(x, Math.round(162 + Math.sin((x - a) / (b - a) * Math.PI) * 3), d_P.cableOS);
  // el grupo electrógeno, abajo a la izquierda del andamio
  rect(98, 158, 118, 170, C.k); rect(99, 159, 117, 169, hex('#d8a020')); rect(99, 159, 117, 159, hex('#f0c850')); for (let x = 102; x < 115; x += 3) rect(x, 162, x + 1, 167, hex('#8a6410'));
  // sombra al pie de la cara
  for (let y = 158; y < 166; y++) for (let x = 0; x < 320; x++) if (d_umb(x, y) < 0.32 - (y - 158) * 0.035) pset(x, y, d_mez(B[y * 320 + x], C.k, 0.3));
}

function d_norte(R, t, o) {
  d_capa(R, 'norte', () => d_norteFija(R));
  const { pset, rect, linea } = R, [rx, ry] = d_NORTE.rendija, p = d_NORTE.plataforma, en = Math.max(0, Math.min(1, o.entra ?? 0)), po = Math.max(0, Math.min(1, o.polvo ?? 0));
  // la sombra de dos nubes que barren la cara despacio (borde tramado)
  for (const [v, w, y0, ph] of [[6, 70, 20, 0], [4.5, 90, 90, 160]]) {
    const cx = ((t * v + ph) % 480) - 80;
    for (let y = y0 - 26; y < y0 + 26; y++) for (let x = Math.round(cx - w); x < cx + w; x++) { if (x < 0 || x > 319 || y < 0 || y > 162 || (x > 270 && y < 48)) continue;
      const d = Math.hypot((x - cx) / w, (y - y0) / 26 + Math.sin(x * 0.07) * 0.15); if (d < 1 && d_umb(x, y) < Math.min(1, (1 - d) * 3) * 0.8) R.pset(x, y, d_mez(R.pget(x, y), hex('#3a2a40'), 0.22)); } }
  // la pantallita del maletín: la imagen del endoscopio (una mancha cálida que crece cuando entra)
  { const g = en; for (let y = p - 12; y <= p - 7; y++) for (let x = 63; x <= 73; x++) { const d = Math.hypot(x - 68, (y - p + 9.5) * 1.5); pset(x, y, d < 1 + g * 3 ? d_P.luzS : h(x, y + Math.floor(t * 8), 760) < 0.2 ? d_P.cableL : d_P.pantalla); } }
  // el piloto del grupo electrógeno y la baliza del andamio
  if (Math.sin(t * 4) > 0) pset(114, 161, d_P.verde); if (Math.sin(t * 2.2) > 0.4) { rect(21, p - 20, 23, p - 18, d_P.rojo); pset(22, p - 21, d_P.luz); } else rect(21, p - 20, 23, p - 18, d_P.rojoS ?? d_P.cableOS);
  // el cable del endoscopio: del carrete a la rendija, con su comba; la cabecita entra con o.entra
  { const x0 = 86, y0 = p - 10, x1 = rx, y1 = ry; let px = x0, py = y0;
    for (let i = 1; i <= 20; i++) { const u = i / 20, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 4 * (1 - en * 0.6); linea(px, py, x, y, C.k); px = x; py = y; }
    if (en < 0.95) { const hx = Math.round(rx - 4 * (1 - en)), hy = Math.round(ry - 1); rect(hx - 1, hy - 1, hx + 1, hy + 1, d_P.metS); pset(hx + 1, hy, d_P.luzS); if (Math.sin(t * 9) > 0) pset(hx + 2, hy, d_P.luz); }
    else pset(rx + 1, ry, Math.sin(t * 9) > 0 ? d_P.luz : d_CAL[1]); }
  // la nube de polvo que sale de la rendija (gag 5)
  if (po > 0) for (let k = 0; k < 36; k++) { const f = ((t * 0.7 + h(k, 1, 761)) % 1), r = (2 + f * 18) * po, an = h(k, 2, 761) * Math.PI * 2, x = Math.round(rx + 2 + Math.cos(an) * r * 1.2 - f * 4), y = Math.round(ry + Math.sin(an) * r * 0.7 - f * 6);
    if (f < 0.85) { R.disco(x, y, f < 0.4 ? 2 : 1, f < 0.3 ? d_CAL[8] : d_CAL[7]); if (f < 0.2) pset(x - 1, y - 1, d_CAL[9]); } }
  // las palomas: posadas en las huellas (cabecean) y una pareja que vuela
  for (const [x, f] of [[186, 6], [230, 8], [36, 4], [262, 12]]) { const y = d_HILN[f][0] - 1, b = Math.sin(t * 3 + x) > 0.6 ? 1 : 0; rect(x, y - 1, x + 2, y, d_P.paloma); pset(x + 3, y - 1 + b, d_P.palomaS); pset(x, y, d_P.palomaS); }
  for (let k = 0; k < 2; k++) { const x = ((t * 22 + k * 14) % 400) - 40, y = 60 + Math.sin(t * 0.8 + k) * 8 + k * 5; d_ave(R, x, y, t + k, d_P.palomaS); }
  // turistas pequeños que pasan por el camino y suben la escalera de Al-Mamún
  for (let k = 0; k < 3; k++) { const x = 330 - ((t * (7 + k * 2) + k * 70) % 220); d_figura(R, x, 166, t, [d_P.ropa1, d_P.ropa4, d_P.ropa3][k], { alto: 11, gorra: k === 1 ? d_P.ropa2 : null }); }
  { const u = (t * 0.12) % 1, s = u * 8, x = 258 + s * 6, y = 151 + s * 3; d_figura(R, x, y, t, d_P.ropa5, { alto: 10 }); }
  // la arena que vuela a ras de suelo
  for (let k = 0; k < 18; k++) { const x = Math.round((h(k, 1, 762) * 340 + t * (30 + k)) % 340) - 10, y = 166 + Math.round(h(k, 2, 762) * 12 + Math.sin(t * 3 + k)); pset(x, y, d_ARE[6]); pset(x - 1, y, d_ARE[5]); }
  return { suelo: d_NORTE.suelo, plataforma: p, andamio: [16, 114], rendija: [rx, ry], chevron: d_NORTE.chevron, entrada: d_NORTE.entrada, mamun: d_NORTE.mamun, escalera: [258, 151, 302, 172], libre: [118, 300] };
}

// pinta el pasillo de 2023 (2 m de ancho, techo de losas a dos aguas, 9 m) visto desde la cámara, dentro de zona
// [x0, y0, x1, y1] con el centro (cx, cy), la focal f y, si r, solo dentro del círculo de radio r; o.grano, o.tiembla
function d_pasilloVista(R, t, cx, cy, f, zona, r = 0, o = {}) {
  const G = { W: 1.0, He: 1.15, Ha: 2.05, L: 9 }, k = (G.Ha - G.He) / G.W, [x0, y0, x1, y1] = zona, B = R.buf, fr = Math.floor(t * 12);
  const ox = (o.tiembla ?? 1) * Math.sin(t * 1.3) * 0.03, oy = (o.tiembla ?? 1) * Math.sin(t * 1.7 + 1) * 0.02, cam = { x: 0.08 + ox, y: 0.95 + oy };
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    let rr = 0; if (r) { rr = Math.hypot(x - cx, y - cy) / r; if (rr > 1) continue; }
    const dx = (x - cx) / f + 0.02, dy = (cy - y) / f - 0.03;
    let tb = G.L, s = 3;
    if (dx > 1e-6) { const q = (G.W - cam.x) / dx; if (q < tb) { tb = q; s = 2; } }
    if (dx < -1e-6) { const q = (-G.W - cam.x) / dx; if (q < tb) { tb = q; s = 1; } }
    if (dy < -1e-6) { const q = -cam.y / dy; if (q < tb) { tb = q; s = 0; } }
    { const den = dy + k * dx; if (den > 1e-6) { const q = (G.Ha - k * cam.x - cam.y) / den; if (q > 0 && q < tb && cam.x + dx * q >= 0) { tb = q; s = 5; } } }
    { const den = dy - k * dx; if (den > 1e-6) { const q = (G.Ha + k * cam.x - cam.y) / den; if (q > 0 && q < tb && cam.x + dx * q < 0) { tb = q; s = 4; } } }
    const X = cam.x + dx * tb, Y = cam.y + dy * tb, Z = tb;
    let v, ju = false;
    if (s === 0) { const a = Math.floor((X + 3) * 1.6 + Math.sin(Z * 3) * 0.4), b = Math.floor(Z * 1.3 + h(a, 1, 770)); v = -0.2 + (h(a, b, 771) - 0.5) * 0.6; ju = (Z * 1.3 + h(a, 1, 770)) % 1 < 0.025 * tb; if (h(Math.floor(X * 9), Math.floor(Z * 9), 772) < 0.12) v += 0.8; }
    else if (s === 1 || s === 2) { const c = Math.floor(Y / 0.55), w = 0.9 + h(s, c, 773) * 0.8, uu = (Z + h(s, c, 774) * 2) / w; v = 0.1 + (h(s * 31 + c, Math.floor(uu), 775) - 0.5) * 0.6; ju = (uu % 1) < 0.022 * tb || (Y / 0.55) % 1 < 0.035 * tb; }
    else if (s === 3) { v = -0.5; }
    else { const uu = Z / 0.85; v = (s === 4 ? 0.25 : -0.05) + (h(s, Math.floor(uu), 776) - 0.5) * 0.4; ju = (uu % 1) < 0.03 * tb || Math.abs(X) < 0.02 * tb; }
    // la luz de la cámara: cae con la distancia y se abre en un cono
    const cono = Math.max(0, 1 - Math.hypot(dx, dy) * 0.55);
    let lum = 1.5 * cono * cono / (1 + 0.16 * tb * tb);
    let val = 0.3 + lum * 6.6 + v + (ju ? -1.5 : 0) + (h(x, y, 777 + (fr & 7)) - 0.5) * (o.grano ?? 0.9);
    if (r) val -= Math.pow(rr, 6) * 4;   // la viñeta
    B[y * 320 + x] = d_tono(d_CAL, val, x, y);
  }
  // las motas que flotan delante de la cámara, iluminadas
  for (let m = 0; m < 22; m++) { const Z = 0.6 + ((h(m, 1, 778) * 6 + t * 0.12) % 6), X = (h(m, 2, 778) - 0.5) * 1.6 + Math.sin(t * 0.4 + m) * 0.08, Y = 0.3 + h(m, 3, 778) * 1.5 + Math.sin(t * 0.6 + m * 2) * 0.06;
    const px = Math.round(cx + f * (X - cam.x) / Z), py = Math.round(cy - f * (Y - cam.y) / Z); if (px < x0 || px > x1 || py < y0 || py > y1 || (r && Math.hypot(px - cx, py - cy) > r - 2)) continue;
    R.pset(px, py, Z < 2 ? d_CAL[9] : d_CAL[7]); if (Z < 1.2) { R.pset(px + 1, py, d_CAL[8]); R.pset(px, py + 1, d_CAL[8]); } }
}

function d_pasilloPlano(R, t, o) {
  const { rect, pset, linea } = R, cx = 160, cy = 96, r = 74, en = o.entra ?? 1;
  // la carcasa del monitor del endoscopio: plástico oscuro con textura, tornillos y el bisel del círculo
  d_capa(R, 'pasilloMarco', () => { const B = R.buf;
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = d_tono(d_MET, 1.1 + (h(x >> 1, y >> 1, 780) - 0.5) * 0.35 + (y < 3 ? 0.8 : 0) - (y > 176 ? 0.6 : 0), x, y);
    for (let a = 0; a < 720; a++) { const an = a / 720 * Math.PI * 2; for (let d = r; d <= r + 5; d++) { const x = Math.round(cx + Math.cos(an) * d), y = Math.round(cy + Math.sin(an) * d); pset(x, y, d === r || d === r + 1 ? d_MET[0] : d_tono(d_MET, 2.4 - Math.sin(an + 0.8) * 1.2 - (d - r) * 0.15, x, y)); } }
    for (const [x, y] of [[10, 10], [309, 169], [10, 169], [250, 10]]) { R.disco(x, y, 2, d_MET[3]); pset(x - 1, y - 1, d_MET[5]); linea(x - 1, y + 1, x + 1, y - 1, d_MET[1]); }
    // las marcas de la mira alrededor del círculo
    for (let a = 0; a < 24; a++) { const an = a / 24 * Math.PI * 2, L = a % 6 === 0 ? 7 : 3; linea(cx + Math.cos(an) * (r + 7), cy + Math.sin(an) * (r + 7), cx + Math.cos(an) * (r + 7 + L), cy + Math.sin(an) * (r + 7 + L), a % 6 === 0 ? d_MET[4] : d_MET[3]); }
    // los mandos del lado izquierdo: dos ruedas y tres botones
    for (const [x, y] of [[30, 70], [30, 110]]) { R.disco(x, y, 9, C.k); R.disco(x, y, 8, d_MET[2]); for (let a = 0; a < 16; a++) pset(Math.round(x + Math.cos(a * 0.39) * 8), Math.round(y + Math.sin(a * 0.39) * 8), d_MET[4]); R.disco(x - 2, y - 2, 2, d_MET[3]); }
    for (let j = 0; j < 3; j++) { rect(22, 136 + j * 10, 38, 142 + j * 10, C.k); rect(23, 137 + j * 10, 37, 141 + j * 10, d_MET[2]); rect(23, 137 + j * 10, 37, 137 + j * 10, d_MET[4]); }
    // la rejilla del altavoz, a la derecha
    for (let y = 120; y < 164; y += 3) for (let x = 262; x < 300; x += 3) pset(x, y, d_MET[0]);
  });
  d_pasilloVista(R, t, cx, cy, 78, [cx - r, cy - r, cx + r, cy + r], r, o);
  // la cruz fina del centro y el punto rojo de grabación que parpadea; la batería; la profundidad
  for (const [dx, dy] of [[-6, 0], [-5, 0], [5, 0], [6, 0], [0, -6], [0, -5], [0, 5], [0, 6]]) pset(cx + dx, cy + dy, d_P.luz);
  if (Math.floor(t * 1.6) % 2 === 0) { R.disco(252, 24, 3, d_P.piloto); pset(251, 23, d_P.luz); }
  rect(232, 160, 250, 168, d_MET[4]); rect(233, 161, 249, 167, C.k); rect(251, 162, 252, 166, d_MET[4]); for (let k = 0; k < 3; k++) rect(235 + k * 5, 162, 238 + k * 5, 166, d_P.verde);
  R.numero(String(Math.round(2 + en * 7)), 70, 168); R.numero(String(Math.floor(t * 10) % 60).padStart(2, "0"), 92, 168, { fina: true });
  return { suelo: null, circulo: [cx, cy, r], sinActores: true, mandos: [30, 70, 30, 110] };
}

const d_ATRIL = [112, 137];

const d_PIR = { ax: 128, ay: 18, base: 132, iz: 36, de: 220, fondo: 238 };

function d_anuncio(R, t, o) {
  const { rect, pset, linea, poligono } = R, P = d_PIR;
  // el cielo tramado (fijo) con el sol y su halo
  d_capa(R, 'anuncioCielo', () => { const B = R.buf; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 238, y - 24); let v = 0.3 + (y / 135) * 6.3 + (h(x >> 3, y >> 2, 790) - 0.5) * 0.3; if (d < 22) v += (1 - d / 22) * 2.5; B[y * 320 + x] = d_tono(d_CIE, v, x, y); }
    R.disco(238, 24, 8, hex('#fff6d0')); R.disco(238, 24, 6, C.blanco); });
  // las nubes de tres tonos a tres velocidades, y pájaros
  const ton = [C.blanco, hex('#e4eef6'), hex('#b8cce0')];
  for (const [x0, y, w, v] of [[20, 30, 30, 1.2], [180, 30, 40, 0.8], [110, 56, 22, 2.1], [260, 70, 26, 1.6], [330, 44, 18, 2.6]]) d_nube(R, ((x0 + t * v) % 400) - 40, y, w, ton);
  for (let k = 0; k < 3; k++) d_ave(R, ((t * 14 + k * 9) % 380) - 30, 48 + k * 4 + Math.sin(t + k) * 2, t + k * 0.3, hex('#3a3a4a'));
  // Kefrén al fondo, más clara por la bruma; Keops delante (cara norte en sombra, oeste al sol, aristas escalonadas); la explanada y el estrado
  d_capa(R, 'anuncioFijo', () => {
    poligono([[252, 50], [330, 132], [196, 132]], (x, y) => d_tono(d_CAL, (x > 252 - (y - 50) * 0.1 ? 6.6 : 5.9) + ((y % 3) === 0 ? -0.4 : 0) + (h(x >> 1, y, 791) - 0.5) * 0.4, x, y));
    for (let y = 50; y < 60; y++) for (let x = 246; x < 260; x++) if (Math.abs(x - 252) < (y - 50) * 0.97) pset(x, y, d_CAL[8]);   // el remate liso de Kefrén
    // la arena del fondo y El Cairo en la bruma, a la izquierda
    for (let k = 0; k < 9; k++) { const x = 2 + k * 4, a = 4 + Math.round(h(k, 1, 792) * 9); rect(x, 132 - a, x + 3, 131, hex('#b8b0a8')); if (k % 3 === 0) { rect(x + 1, 132 - a - 6, x + 1, 132 - a, hex('#a8a098')); pset(x + 1, 132 - a - 7, hex('#c8c0b8')); } }
    poligono([[P.ax, P.ay], [P.de, P.base], [P.fondo, P.base - 6]], (x, y) => d_tono(d_CAL, 7.2 - (x - P.de) * 0.02 + (y % 3 === 0 ? -0.9 : 0) + (h(x, y, 793) - 0.5) * 0.5, x, y));
    poligono([[P.ax, P.ay], [P.iz, P.base], [P.de, P.base]], (x, y) => { const f = y % 3, v = 4.6 + (y - P.ay) * 0.008 + (f === 0 ? 0.9 : f === 2 ? -0.5 : 0) + (h(x >> 1, y, 794) - 0.5) * 0.6 + ((x + (Math.floor(y / 3) * 5)) % 9 === 0 ? -0.8 : 0); return d_tono(d_CAL, v, x, y); });
    // las aristas escalonadas (cada hilada asoma un píxel)
    for (let y = P.ay + 2; y < P.base; y += 3) { const u = (y - P.ay) / (P.base - P.ay); pset(Math.round(P.ax - u * (P.ax - P.iz)) - 1, y, d_CAL[3]); pset(Math.round(P.ax + u * (P.de - P.ax)) + 1, y, d_CAL[8]); }
    linea(P.ax, P.ay, P.de, P.base, d_CAL[9]);
    // el chevrón y Al-Mamún, chiquitos, y el andamio
    poligono([[P.ax - 5, 108], [P.ax, 103], [P.ax + 5, 108]], d_CAL[7]); rect(P.ax - 1, 108, P.ax + 1, 110, d_CAL[0]); rect(P.ax + 12, 116, P.ax + 15, 119, d_CAL[0]);
    for (let y = 104; y < 112; y += 2) linea(P.ax - 12, y, P.ax - 7, y, d_P.metS);
    // la explanada: arena tramada con piedras y el enlosado de la zona de prensa
    for (let y = 132; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 3.4 + (y - 132) * 0.035 + (h(x >> 1, y, 795) - 0.5) * 0.8 + (h(x >> 4, y >> 2, 796) - 0.5) * 0.6; if (y === 132) v -= 1;
      if (y > 150) { const z = (y - 150), fil = Math.floor(Math.log(z + 4) * 6), col = Math.floor((x - 160) / (14 + z * 0.9)); v = 4.4 + (h(fil, col, 797) - 0.5) * 0.5 + (h(x, y, 798) - 0.5) * 0.4; if (Math.floor(Math.log(z + 5) * 6) !== fil || Math.floor((x + 1 - 160) / (14 + z * 0.9)) !== col) v -= 1.4; }
      R.pset(x, y, d_tono(d_ARE, v, x, y)); }
    // el telón azul con la pirámide dorada (sin letras) y las rayas, y el estrado con moqueta
    rect(56, 100, 172, 146, C.k); for (let y = 101; y < 146; y++) for (let x = 57; x < 172; x++) pset(x, y, d_tono([d_P.telonS, d_P.telon, d_P.telonL], 1 + Math.sin(x * 0.5) * 0.45 - (y - 101) * 0.01, x, y));
    poligono([[96, 134], [114, 108], [132, 134]], d_P.oro); poligono([[114, 108], [132, 134], [122, 134]], d_P.oroS); for (const y of [104, 140]) rect(57, y, 171, y + 1, d_P.oro);
    rect(50, 146, 178, 155, C.k); rect(51, 147, 177, 154, d_P.alfombra); rect(51, 147, 177, 147, hex('#d04040')); rect(51, 152, 177, 154, d_P.alfombraS); for (let x = 54; x < 178; x += 10) pset(x, 150, d_P.alfombraS);
    // los altavoces en sus pies, a los lados del telón
    for (const x of [44, 182]) { rect(x - 5, 106, x + 5, 126, C.k); rect(x - 4, 107, x + 4, 125, d_MET[2]); R.disco(x, 112, 3, d_MET[0]); R.disco(x, 120, 3, d_MET[0]); pset(x - 1, 111, d_MET[4]); linea(x, 126, x - 5, 156, d_MET[1]); linea(x, 126, x + 5, 156, d_MET[1]); linea(x, 126, x, 156, d_MET[2]); }
    // la torre de truss con la pantalla
    for (const x of [190, 262]) { for (let y = 72; y < 158; y++) { pset(x - 2, y, d_MET[3]); pset(x + 2, y, d_MET[3]); if (y % 6 === 0) linea(x - 2, y, x + 2, y + 6, d_MET[2]); } rect(x - 4, 157, x + 4, 158, d_MET[1]); }
    rect(192, 72, 260, 120, C.k); rect(193, 73, 259, 119, d_MET[1]); rect(194, 74, 258, 118, d_P.pantalla);
    // los cables por el suelo hasta el estrado
    for (let x = 178; x < 300; x++) pset(x, Math.round(160 + Math.sin(x * 0.08) * 2), d_P.cableN);
  }, true);
  // la pantalla enseña lo que vio el endoscopio
  d_pasilloVista(R, t, 226, 96, 34, [195, 75, 257, 117], 0, { grano: 1.1, tiembla: 0.5 });
  // los banderines al viento, del altavoz a la torre
  for (let k = 0; k < 14; k++) { const x = 46 + k * 10.5, y = 99 + Math.sin(k / 13 * Math.PI) * -2 + 4, w = Math.round(Math.sin(t * 5 + k) * 1.5); poligono([[x, y], [x + 6, y], [x + 3 + w, y + 6]], [d_P.oro, d_P.micR, d_P.micB, d_P.micA][k % 4]); }
  for (let x = 44; x < 192; x++) pset(x, Math.round(103 + Math.sin((x - 44) / 148 * Math.PI) * -2), C.k);
  // camellos lejanos que pasan al pie de la pirámide
  for (let k = 0; k < 2; k++) { const x = Math.round(((t * 4 + k * 26) % 380) - 40), y = 131; rect(x, y - 4, x + 5, y - 2, hex('#8a6a4a')); pset(x + 2, y - 5, hex('#8a6a4a')); rect(x + 6, y - 6, x + 7, y - 4, hex('#8a6a4a')); pset(x + 1, y - 1, C.k); pset(x + 4, y - 1, C.k); pset(x + 2, y - 7, d_P.ropa4); }
  // la prensa de fondo: cámaras de televisión en trípode con su piloto rojo, y periodistas pequeños con móviles
  for (const [x, y] of [[16, 160], [214, 160], [292, 162]]) { linea(x, y - 9, x - 5, y, C.k); linea(x, y - 9, x + 5, y, C.k); linea(x, y - 9, x, y, d_MET[2]); rect(x - 6, y - 16, x + 6, y - 9, C.k); rect(x - 5, y - 15, x + 5, y - 10, d_MET[2]); rect(x - 5, y - 15, x + 5, y - 15, d_MET[4]); rect(x + 6, y - 14, x + 9, y - 11, d_MET[1]); pset(x + 9, y - 13, hex('#6ac0ff')); if (Math.sin(t * 2 + x) > -0.2) pset(x - 4, y - 14, d_P.piloto); }
  for (const [x, c, m] of [[30, d_P.ropa2, 1], [40, d_P.ropa4, 0], [196, d_P.ropa6, 1], [236, d_P.ropa1, 1], [252, d_P.ropa3, 0], [278, d_P.ropa5, 1], [306, d_P.ropa2, 0]]) d_figura(R, x, 156, t, c, { alto: 11, anda: false, movil: !!m });
  return { suelo: 172, estrado: [50, 146, 178], ministro: [d_ATRIL[0], 147], atril: d_ATRIL, pantalla: [194, 74, 258, 118], sol: [238, 24], piramide: [P.ax, P.ay, P.iz, P.de, P.base], libre: [196, 312], periodistas: 172 };
}

const d_NEG = [56, 22, 230, 122];

function d_radiografia(R, t, o) {
  const { rect, pset, linea } = R, [nx0, ny0, nx1, ny1] = d_NEG, rv = Math.max(0, Math.min(1, o.revela ?? 0));
  d_capa(R, 'radiografia', () => { const B = R.buf;
    // la pared pintada (gotelé fino), el zócalo, el suelo de linóleo con reflejos
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let c;
      if (y < 152) c = d_tono([d_P.paredS, d_P.pared, d_P.paredL], 1.1 + (h(x, y, 800) - 0.5) * 0.7 + (h(x >> 3, y >> 3, 801) - 0.5) * 0.3 - (y / 152) * 0.3, x, y);
      else if (y < 156) c = y === 152 ? hex('#e8eaec') : hex('#6a7078');
      else { const z = y - 156, fil = Math.floor(z / (2 + z * 0.2)); c = d_tono([d_P.linoS, d_P.lino, d_P.linoL], 1 + (h(x >> 4, fil, 802) - 0.5) * 0.4 + (h(x, y, 803) - 0.5) * 0.4 + (((x - 160) * 6 / (z + 6)) % 22 < 0.6 ? -0.8 : 0), x, y); }
      B[y * 320 + x] = c; }
    // el negatoscopio: el marco de aluminio con sombra en la pared, las pinzas de arriba y el cable
    rect(nx0 + 3, ny0 + 3, nx1 + 4, ny1 + 4, d_P.paredS); rect(nx0 - 4, ny0 - 4, nx1 + 4, ny1 + 4, C.k); rect(nx0 - 3, ny0 - 3, nx1 + 3, ny1 + 3, d_MET[3]); rect(nx0 - 3, ny0 - 3, nx1 + 3, ny0 - 3, d_MET[5]); rect(nx0 - 3, ny1 + 1, nx1 + 3, ny1 + 3, d_MET[2]);
    for (const x of [nx0 + 30, (nx0 + nx1) / 2, nx1 - 30]) { rect(x - 3, ny0 - 6, x + 3, ny0 + 1, C.k); rect(x - 2, ny0 - 5, x + 2, ny0, d_MET[4]); }
    linea(nx1 + 4, ny1, nx1 + 12, 150, C.k); rect(nx1 + 10, 146, nx1 + 15, 151, d_P.paredL); rect(nx1 + 11, 147, nx1 + 14, 150, d_MET[3]);
    // el reloj de pared, un extintor y una hoja clavada con un gráfico de barras (sin letras)
    R.disco(250, 66, 9, C.k); R.disco(250, 66, 8, C.blanco); R.anillo(250, 66, 8, d_MET[2]); for (let a = 0; a < 12; a++) pset(Math.round(250 + Math.cos(a * 0.524) * 6), Math.round(66 + Math.sin(a * 0.524) * 6), d_MET[1]);
    rect(258, 84, 274, 104, d_P.paredS); rect(257, 83, 273, 103, C.blanco); for (let k = 0; k < 5; k++) rect(260 + k * 3, 98 - Math.round(h(k, 1, 812) * 10), 261 + k * 3, 100, k === 2 ? C.muon : hex('#6a8ac0')); rect(260, 101, 271, 101, d_MET[2]); pset(265, 84, d_P.piloto);
    rect(222, 132, 228, 150, C.k); rect(223, 133, 227, 150, hex('#c8302a')); rect(223, 133, 224, 150, hex('#e85a4a')); rect(223, 128, 226, 132, d_MET[1]); linea(227, 129, 230, 138, C.k);
    // el reflejo ámbar del negatoscopio en el linóleo
    for (let y = 158; y < 180; y++) for (let x = nx0 + 10; x < nx1 - 10; x++) if (d_umb(x, y) < 0.32 - (y - 158) * 0.012) B[y * 320 + x] = d_mez(B[y * 320 + x], hex('#ffd060'), 0.28);
    // la estantería de la izquierda con archivadores de colores (sin letras) y cajas
    rect(0, 30, 44, 156, C.k); rect(1, 31, 43, 155, hex('#8a6a46')); for (const y of [62, 96, 128]) { rect(1, y, 43, y + 2, hex('#b88e5e')); rect(1, y + 3, 43, y + 3, hex('#5a4228')); }
    const cols = [hex('#c03a30'), hex('#2a6ac0'), hex('#e0b030'), hex('#3a9a5a'), hex('#e8e8e8'), hex('#7a4aa0')];
    for (const [y0, y1] of [[34, 61], [66, 95], [100, 127]]) { let x = 3; while (x < 40) { const w = 3 + Math.round(h(x, y0, 804) * 3), a = y1 - Math.round(h(x, y0, 805) * 8), c = cols[Math.floor(h(x, y1, 806) * 6)]; rect(x, a, x + w - 1, y1, c); rect(x, a, x, y1, d_mez(c, C.blanco, 0.35)); rect(x + w - 1, a, x + w - 1, y1, d_mez(c, C.k, 0.35)); rect(x + 1, a + 3, x + w - 2, a + 4, d_mez(c, C.blanco, 0.6)); x += w + 1; } }
    rect(4, 133, 40, 154, hex('#c8a878')); rect(4, 133, 40, 134, hex('#e0c498')); rect(18, 140, 26, 144, hex('#a08058'));
    // la mesa de la derecha: el tablero, el cajón, las patas; encima el microscopio, las cajas de placas, el portátil y la lámpara
    rect(236, 128, 319, 132, C.k); rect(237, 129, 319, 131, hex('#d8d0c0')); rect(237, 129, 319, 129, hex('#f0ece0'));
    rect(240, 133, 243, 160, d_MET[2]); rect(312, 133, 315, 162, d_MET[2]); rect(262, 133, 300, 146, d_MET[3]); rect(262, 133, 300, 133, d_MET[4]); rect(276, 139, 286, 140, d_MET[1]);
    { const x = 254; rect(x - 9, 124, x + 9, 128, C.k); rect(x - 8, 125, x + 8, 127, d_MET[4]); rect(x - 2, 98, x + 2, 124, d_MET[2]); rect(x - 1, 98, x - 1, 124, d_MET[4]); linea(x, 98, x + 8, 92, C.k); rect(x + 5, 86, x + 9, 93, d_MET[1]); rect(x - 7, 112, x + 7, 115, d_MET[3]); R.disco(x + 4, 104, 3, d_MET[1]); pset(x + 4, 104, d_MET[5]); }
    for (let j = 0; j < 3; j++) { rect(268, 120 - j * 5, 290, 124 - j * 5, C.k); rect(269, 121 - j * 5, 289, 124 - j * 5, j === 1 ? hex('#3a4a6a') : hex('#2a2e3a')); rect(269, 121 - j * 5, 289, 121 - j * 5, hex('#5a6a8a')); }
    { const x = 302; rect(x - 9, 126, x + 9, 128, d_MET[3]); rect(x - 8, 110, x + 8, 125, C.k); rect(x - 7, 111, x + 7, 124, d_P.pantalla); }
  });
  // la placa: grano ámbar; la pirámide más oscura (la piedra frena muones); las zonas huecas, más claras, con el barrido
  const px = (nx0 + nx1) / 2, base = ny1 + 26, apex = ny0 + 6, half = (base - apex) / 1.27, fr = Math.floor(t * 6);
  const barr = nx0 + (nx1 - nx0) * rv, lat = Math.sin(t * 3) * 0.3;
  // las zonas huecas (u: de −1 a 1 de lado a lado, w: de 0 en la base a 1 en la punta; ampliadas para que se lean)
  const seg = (u, w, ua, wa, ub, wb, g) => { const dx = ub - ua, dy = wb - wa, q = Math.max(0, Math.min(1, ((u - ua) * dx + (w - wa) * dy) / (dx * dx + dy * dy))); return Math.hypot(u - ua - q * dx, (w - wa - q * dy) * 1.4) / g; };
  const hueco = (u, w) => Math.min(seg(u, w, -0.2, 0.2, 0.06, 0.36, 0.045),   // la Gran Galería
    seg(u, w, 0.08, 0.38, 0.24, 0.38, 0.035), seg(u, w, -0.1, 0.17, 0.04, 0.17, 0.03),   // la Cámara del Rey y la de la Reina
    seg(u, w, -0.24, 0.47, 0.12, 0.6, 0.04) / (1 + lat * 0.2),   // el gran vacío
    seg(u, w, -0.62, 0.24, -0.46, 0.24, 0.02));   // el pasillo del norte
  for (let y = ny0; y <= ny1; y++) for (let x = nx0; x <= nx1; x++) {
    const enPir = y > apex && Math.abs(x - px) < (y - apex) / (base - apex) * half;
    let v = enPir ? 3.6 - (y - apex) / (base - apex) * 1.6 : 6.1 - (y - ny0) * 0.012;
    if (enPir && Math.abs(Math.abs(x - px) - (y - apex) / (base - apex) * half) < 1) v -= 0.8;
    if (enPir && x < barr) { const d = hueco((x - px) / half, (base - y) / (base - apex)); if (d < 1) v += 3.4 - d * 0.8; else if (d < 2) v += (2 - d) * 1.2; }
    v += (h(x, y, 810 + (fr & 3)) - 0.5) * 2 + (h(x >> 1, y >> 1, 811) - 0.5) * 0.8;
    pset(x, y, d_tono(d_AMB, v, x, y));
  }
  // la línea de escaneo que corre y el borde del barrido
  { const sx = Math.round(nx0 + ((t * 30) % (nx1 - nx0))); for (let y = ny0; y <= ny1; y++) if ((y & 1) === 0) pset(sx, y, d_P.muonL); }
  if (rv > 0 && rv < 1) for (let y = ny0; y <= ny1; y += 2) pset(Math.round(barr), y, C.blanco);
  // las agujas del reloj (el segundero corre)
  linea(250, 66, 250, 61, C.k); linea(250, 66, 254, 66, C.k); { const an = t * 1.05; linea(250, 66, Math.round(250 + Math.sin(an) * 6), Math.round(66 - Math.cos(an) * 6), d_P.piloto); }
  // el vapor de la taza y la lámpara, la pantalla del portátil con barras que cambian
  { const x = 246, y = 126; rect(x - 3, y - 6, x + 3, y, C.blanco); rect(x - 3, y - 6, x + 3, y - 6, hex('#5a3a2a')); pset(x + 4, y - 4, C.blanco); pset(x + 5, y - 3, C.blanco);
    for (let k = 0; k < 6; k++) { const f = (t * 0.6 + k / 6) % 1, yy = Math.round(y - 8 - f * 14), xx = Math.round(x + Math.sin(t * 2 + k + f * 5) * 2); if (d_umb(xx, yy) < 1 - f) pset(xx, yy, d_P.paredL); } }
  for (let k = 0; k < 6; k++) { const a = 2 + Math.round((0.5 + 0.5 * Math.sin(t * 2 + k * 1.3)) * 9); rect(296 + k * 2, 123 - a, 296 + k * 2, 123, k === 3 ? C.muon : hex('#6ab0ff')); }
  return { suelo: 166, negatoscopio: d_NEG, mesa: [236, 128, 319], libre: [52, 230], estanteria: [0, 30, 44, 156] };
}

// la paleta de Hawara: caliza blanca, adobe, pintura egipcia, agua, juncos, interiores, esquirlas, lona, estratos y cielo
const e_C = pal({
  k: '#1c1622',
  pL: '#fbf5e4', p: '#ebe1c6', pS: '#d0c2a0', pSS: '#a89678', pJ: '#c0ae8c', pO: '#7a6a56',
  aL: '#b48c6a', a: '#987254', aS: '#7c5c42', aSS: '#5c432f', aJ: '#6a4c34',
  rojo: '#c04a32', rojoS: '#8a3426', azul: '#3462b0', azulS: '#244482', verde: '#3e9060', verdeS: '#2a6644', ocre: '#e0b04a', ocreS: '#b08432',
  ag: '#3a78a8', agS: '#245276', agL: '#7cb6da', agB: '#d4ecf6',
  junco: '#5a9a3e', juncoS: '#386a2a', juncoL: '#a2cc5e', papiro: '#74b04a',
  are: '#e4cc94', areS: '#c4a46a', areL: '#f4e4b8', campo: '#6aa840', campoS: '#4a8030', campoL: '#94c45a',
  palma: '#3e7a34', palmaL: '#6aa84a', palmaS: '#285024', tronco: '#8a6440', troncoS: '#5c4128', datil: '#b05a2a',
  desL: '#ecdcb8', des: '#dcc8a0', desS: '#c8b08a',
  int: '#5a483a', int2: '#594739', intS: '#3a2e26', intSS: '#241c18', intL: '#8a7258',
  luz: '#ffd88a', llama: '#ffb43a', llamaL: '#fff4b8', llamaS: '#e0602a', humo: '#8a8078',
  bronce: '#b07a3a', bronceS: '#74502a', bronceL: '#e4b462',
  esq: '#eee8da', esqS: '#d2c9b4', esqSS: '#aca28a', esqL: '#fffdf4',
  lona: '#ece0c4', lonaS: '#c8b896', lonaSS: '#9a8a6c', mad: '#9a6a3e', madS: '#6a4626', madL: '#c48c54',
  e1: '#dccca8', e2: '#cdae76', e3: '#9c7c5a', e4: '#b89a78', e5: '#7c6248', e6: '#e8d6aa',
  c0: '#3a78c8', c1: '#5894da', c2: '#7eb0e4', c3: '#a8ccec', c4: '#d4e4ea', c5: '#ece2c8',
  n0: '#ffffff', n1: '#e6eef6', n2: '#b6c8de', sol: '#fff8d0', solS: '#ffe48a', halo: '#fff2b8',
  ave: '#2a2a36', piel: '#b07a50', pielS: '#8a5a38', tela: '#f0ead8', telaS: '#c8bea4', pelo: '#2a1c14',
  naranja: '#f07a22', naranjaS: '#b44e14', plastico: '#3a68c0', vidrio: '#2e3a4a', pantalla: '#5ae0a0', chaleco: '#f4d020',
});

// tramado ordenado 4 × 4: el umbral (0–1) de cada píxel, para degradados y transparencias sin bandas
const e_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_umb = (x, y) => (e_BAY[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla de dos colores (a: cuánto del segundo)
const e_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// las zonas tranquilas: la esquina de Atom y la barra del año (lo que pasa por ahí se pinta suave)
const e_tranquila = (x, y) => (x > 272 && y < 48) || (x > 14 && x < 176 && y < 17);

// un fondo fijo por lienzo y clave, pintado una vez en su búfer de R.nuevo() (lo vacío queda a 0, transparente)
const e_CACHE = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = e_CACHE.get(R); if (!m) e_CACHE.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(b); R.usar(prev); m.set(clave, b); }
  return b;
}

// pega en pantalla lo no vacío de una capa, entre las filas y0 e y1
function e_pegar(R, L, y0 = 0, y1 = 179) { const B = R.buf; for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = L[i]; if (c) B[i] = c; } }

// pset suave: en las zonas tranquilas el color se mezcla con lo de debajo
function e_ps(R, x, y, c, a = 1) { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; if (e_tranquila(x, y)) a *= 0.3; R.pset(x, y, a >= 1 ? c : e_mez(R.pget(x, y), c, a)); }

// el cielo de Egipto tramado (seis azules hacia la calima del horizonte), el sol con su halo, cirros lentos y cúmulos de
// tres tonos en tres capas a distinta velocidad (lejos pequeños y lentos, cerca grandes y rápidos). o.sol [x, y, r]
function e_cielo(R, t, hor, o = {}) {
  const B = R.buf, P = [e_C.c0, e_C.c1, e_C.c2, e_C.c3, e_C.c4, e_C.c5];
  for (let y = 0; y < hor; y++) { const u = Math.pow(y / hor, 0.9) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(u)), p = u - i, a = P[i], b = P[i + 1], f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = e_umb(x, y) < p ? b : a; }
  const sol = o.sol ?? [236, 26, 8];
  if (sol) { const [sx, sy, sr] = sol, R2 = sr + 16;
    for (let y = Math.max(0, sy - R2); y <= Math.min(hor - 1, sy + R2); y++) for (let x = sx - R2; x <= sx + R2; x++) { if (x < 0 || x > 319) continue; const d = Math.hypot(x - sx, y - sy);
      if (d <= sr) B[y * 320 + x] = d > sr - 1.2 ? e_C.solS : (x - sx < -2 && y - sy < -2 && d > sr * 0.4 ? e_C.n0 : e_C.sol);
      else if (d < R2) { const q = 1 - (d - sr) / (R2 - sr); if (e_umb(x, y) < q * q * 0.9) B[y * 320 + x] = e_mez(B[y * 320 + x], e_C.halo, 0.55); } } }
  // cirros: velos finos y lejanos que apenas se mueven
  for (let k = 0; k < 3; k++) { const w = 40 + Math.round(h(k, 5, 420) * 40), x0 = ((h(k, 6, 420) * 440 + t * (0.5 + k * 0.2)) % 480) - 90, y = Math.round(18 + k * 9 + h(k, 7, 420) * 4);
    if (y >= hor - 4) continue;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (x < 0 || x > 319 || h(i >> 2, k, 421) < 0.25) continue; const e = Math.sin(i / w * Math.PI); e_ps(R, x, y, e_C.n1, e > 0.4 ? 0.8 : 0.45); if (e > 0.6 && i % 3) e_ps(R, x + 4, y - 1, e_C.n0, 0.6); } }
  // cúmulos en tres capas
  const capas = o.nubes ?? [[hor - 12, 16, 0.7, 3], [hor - 24, 28, 1.5, 2], [hor - 38, 40, 2.6, 2]];
  capas.forEach(([cy, w, v, n], c) => { for (let k = 0; k < n; k++) { const x = ((h(k, c, 422) * 440 + k * 170 + t * v) % 460) - 70; e_nube(R, x, cy + Math.round(h(k, c, 423) * 6) - 3, w + Math.round(h(k, c, 424) * 10), k + c * 7); } });
}

// un cúmulo de tres tonos (luz arriba a la izquierda, cuerpo, sombra abajo) con la base plana
function e_nube(R, cx, cy, w, sem) {
  const r = Math.max(3, w * 0.24), n = w > 26 ? 5 : 3, D = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1) - 0.5; D.push([cx + u * w * 0.8, cy - (1 - Math.abs(u) * 1.5) * r * 0.65 - h(i, sem, 425) * 2, r * (0.7 + (0.5 - Math.abs(u)) * 0.7)]); }
  const den = (x, y) => { for (const [a, b, rr] of D) if ((x - a) ** 2 + (y - b) ** 2 <= rr * rr) return true; return false; };
  const base = cy + r * 0.5;
  for (let y = Math.floor(cy - r * 2); y <= base; y++) for (let x = Math.floor(cx - w / 2 - r); x <= cx + w / 2 + r; x++) {
    if (!den(x, y)) continue;
    let c = e_C.n1;
    if (y > base - 2 || !den(x - 1, y + 2)) c = e_C.n2; else if (!den(x + 1, y - 2) || (!den(x + 2, y - 3) && e_umb(x, y) < 0.5)) c = e_C.n0;
    e_ps(R, x, y, c);
  }
}

// una palmera datilera que se mece (x, base: pie del tronco; alto en px)
function e_palmera(R, x, base, alto, t, sem = 0, quieta = false) {
  const sw = quieta ? 0 : Math.sin(t * 1.1 + sem) * 1.3, inc = (h(sem, 1, 430) - 0.5) * 0.3;
  for (let j = 0; j <= alto; j++) { const u = j / alto, xx = Math.round(x + inc * j + sw * u * u * 2), y = base - j; R.pset(xx, y, j % 3 === 0 ? e_C.troncoS : e_C.tronco); R.pset(xx + 1, y, e_C.troncoS); if (u < 0.12) R.pset(xx - 1, y, e_C.tronco); }
  const tx = Math.round(x + inc * alto + sw * 2), ty = base - alto;
  for (let k = 0; k < 9; k++) { const a = Math.PI + k * (Math.PI / 8) + (quieta ? 0 : Math.sin(t * 1.7 + k + sem) * 0.07), L = alto * 0.3 + 6 + h(k, sem, 431) * 4;
    for (let s = 1; s <= L; s++) { const u = s / L, px = Math.round(tx + Math.cos(a) * s * 1.1), py = Math.round(ty + Math.sin(a) * s * 0.5 + u * u * L * 0.6);
      R.pset(px, py, u > 0.65 ? e_C.palmaS : e_C.palma); if (s % 2 === 0) { R.pset(px, py + 1, e_C.palmaS); R.pset(px + (Math.cos(a) > 0 ? 1 : -1), py - 1, k > 2 && k < 7 ? e_C.palmaL : e_C.palma); } } }
  R.rect(tx - 1, ty + 1, tx + 1, ty + 2, e_C.datil); R.pset(tx, ty + 3, e_C.datil); R.rect(tx - 1, ty - 1, tx + 1, ty, e_C.palmaL);
}

// juncos y papiros en el agua que se mecen (de x0 a x1, con su pie en base)
function e_juncos(R, t, x0, x1, base, alto, sem = 0, dens = 3) {
  for (let x = x0; x <= x1; x += dens) { const k = x * 7 + sem, hh = Math.round(alto * (0.55 + h(k, 1, 432) * 0.45)), sw = Math.sin(t * 1.6 + x * 0.21 + sem) * 1.6, pap = h(k, 2, 432) < 0.3;
    for (let j = 0; j < hh; j++) { const u = j / hh, xx = Math.round(x + sw * u * u + (h(k, 3, 432) - 0.5) * u * 4); R.pset(xx, base - j, u < 0.3 ? e_C.juncoS : (j & 1) ? e_C.junco : (pap ? e_C.papiro : e_C.junco)); }
    const tx = Math.round(x + sw + (h(k, 3, 432) - 0.5) * 4), ty = base - hh;
    if (pap) { for (let i = -3; i <= 3; i++) { R.pset(tx + i, ty - 2 + Math.round(Math.abs(i) * 0.5), e_C.papiro); if (i % 2 === 0) R.pset(tx + i, ty - 3 + Math.round(Math.abs(i) * 0.5), e_C.juncoL); } R.pset(tx, ty - 1, e_C.juncoS); }
    else if (h(k, 4, 432) < 0.35) { R.pset(tx, ty, e_C.troncoS); R.pset(tx, ty - 1, e_C.troncoS); R.pset(tx, ty - 2, e_C.tronco); } }
}

// una garza en el agua: blanca o gris; cada tanto baja el pico a pescar
function e_garza(R, x, y, t, gris, sem = 0) {
  const c = gris ? hex('#9aa4b4') : e_C.n0, cS = gris ? hex('#6a7484') : hex('#c8d0dc'), u = (t + sem) % 7, pesca = u > 5 && u < 6.2, d = gris ? -1 : 1;
  R.linea(x, y, x, y - 6, cS); R.linea(x + 2 * d, y, x + 1 * d, y - 6, cS);   // las patas
  R.rect(x - 2, y - 10, x + 3, y - 7, c); R.rect(x - 3 * d, y - 9, x - 4 * d, y - 8, cS); R.rect(x - 1, y - 7, x + 3, y - 7, cS);
  if (pesca) { R.linea(x + 3 * d, y - 9, x + 6 * d, y - 4, c); R.linea(x + 6 * d, y - 4, x + 9 * d, y - 1, e_C.ocre); R.pset(x + 7 * d, y, e_C.agB); }
  else { R.linea(x + 3 * d, y - 9, x + 4 * d, y - 13, c); R.linea(x + 4 * d, y - 13, x + 3 * d, y - 16, c); R.pset(x + 4 * d, y - 16, c); R.pset(x + 3 * d, y - 17, e_C.k); R.linea(x + 5 * d, y - 16, x + 8 * d, y - 15, e_C.ocre); }
  R.rect(x - 3, y + 1, x + 4, y + 1, e_C.agL);   // el anillo en el agua
}

// un cocodrilo lejano y tranquilo: los ojos, el morro y la cresta asoman y dejan una estela en uve
function e_cocodrilo(R, x, y, t) {
  x = Math.round(x); const ond = Math.floor(t * 3) % 2;
  for (let i = 1; i < 18; i++) { const dy = Math.round(i * 0.35); if (i % 2 === ond) { R.pset(x - i, y - dy, e_C.agL); R.pset(x - i, y + dy + 1, e_C.agL); } }
  R.rect(x - 7, y, x + 6, y, e_C.verdeS); for (const i of [-6, -4, -2]) R.pset(x + i, y - 1, e_C.verdeS);
  R.rect(x + 2, y - 1, x + 3, y - 1, hex('#4a6a3a')); R.pset(x + 2, y - 2, e_C.ocre); R.pset(x + 3, y - 2, e_C.k); R.rect(x + 6, y - 1, x + 8, y, hex('#4a6a3a')); R.pset(x + 8, y - 1, e_C.k);
  R.rect(x - 8, y + 1, x + 9, y + 1, e_C.agS);
}

// una figura diminuta (6–10 px) para la vida del fondo: andando, cavando o con una cesta a la cabeza
function e_figura(R, x, suelo, t, o = {}) {
  const s = o.alto ?? 8, d = o.dir ?? 1, tela = o.tela ?? e_C.tela, telaS = o.telaS ?? e_C.telaS, piel = o.piel ?? e_C.piel, paso = o.anda === false ? 0 : Math.floor(t * 5 + (o.sem ?? 0)) % 2, ps = o.ps ?? ((xx, yy, c) => R.pset(xx, yy, c));
  x = Math.round(x); suelo = Math.round(suelo);
  const pie = Math.max(1, Math.round(s * 0.25)), cuerpo = Math.round(s * 0.5);
  for (let j = 0; j < pie; j++) { ps(x - 1 + (paso ? 1 : 0), suelo - j, piel); ps(x + 1 - (paso ? 1 : 0), suelo - j, piel); }
  for (let j = pie; j < pie + cuerpo; j++) for (let i = -1; i <= 1; i++) ps(x + i, suelo - j, i === 1 ? telaS : tela);
  const hy = suelo - pie - cuerpo; ps(x, hy, piel); ps(x + d, hy, piel); ps(x, hy - 1, o.pelo ?? e_C.pelo); ps(x + d, hy - 1, o.pelo ?? e_C.pelo);
  if (o.turbante) { ps(x - 1, hy - 1, e_C.n0); ps(x, hy - 2, e_C.n0); ps(x + 1, hy - 1, e_C.n0); }
  if (o.cesta) { const cy = hy - 2 - (o.turbante ? 1 : 0); for (let i = -2; i <= 2; i++) { ps(x + i, cy, e_C.madS); ps(x + i, cy - 1, i & 1 ? e_C.mad : e_C.madL); } if (o.llena) { ps(x - 1, cy - 2, e_C.esq); ps(x, cy - 2, e_C.esqL); ps(x + 1, cy - 2, e_C.esqS); } ps(x + d * 2, hy + 1, piel); ps(x + d * 2, hy, piel); }
  if (o.azada) { const a = Math.sin(t * 5 + (o.sem ?? 0)), ex = x + d * (2 + Math.round(a * 2)), ey = hy + 2 - Math.round(a * 3); R.linea(x + d, hy + 2, ex, ey, e_C.madS); R.linea(ex, ey, ex + d, ey + 2, e_C.pSS); }
  if (o.lampara) { const fl = Math.sin(t * 13 + x) > 0; ps(x + d * 2, hy + 2, e_C.bronce); ps(x + d * 2, hy + 1, fl ? e_C.llamaL : e_C.llama); }
  if (o.bandeja) { for (let i = -1; i <= 3; i++) ps(x + d * i, hy, e_C.bronceL); ps(x + d * 2, hy - 1, e_C.ocre); ps(x + d, hy - 1, e_C.rojo); }
}

const e_ORILLA = 106;

function e_lago(R, t, o) {
  const B = R.buf, hor = 74, ori = e_ORILLA, rev = o.revela ?? 1;
  e_cielo(R, t, hor, { sol: [236, 24, 8] });
  bandada(R, t, { tipo: 'ibis', n: 3, y: 50, cada: 15, d: -1, v: 22, semilla: 3 });
  const L = e_capa(R, 'hw-lago', () => e_lagoFijo(R));
  e_pegar(R, L, 18, ori + 1);
  // gente diminuta que pasa por dentro de las columnatas (solo se ve entre las columnas)
  const hueco = (x, y) => L[y * 320 + x] === e_C.int2;
  for (let k = 0; k < 5; k++) { const d = k % 2 ? -1 : 1, v = 3 + k * 0.9, u = ((t * v + k * 83) % 300), x = d > 0 ? u : 320 - u, tel = [e_C.tela, e_C.n0, e_C.ocre, e_C.tela, e_C.azul][k];
    e_figura(R, x, 96, t, { alto: 7, dir: d, tela: tel, telaS: e_C.telaS, sem: k, ps: (xx, yy, c) => { if (xx >= 0 && xx < 320 && hueco(xx, yy)) R.pset(xx, yy, c); } }); }
  // los vigías de la azotea, que van y vienen despacio
  for (let k = 0; k < 2; k++) { const x = 60 + k * 170 + Math.sin(t * 0.25 + k * 2) * 26, dir = Math.cos(t * 0.25 + k * 2) > 0 ? 1 : -1; e_figura(R, x, 63, t, { alto: 7, dir, tela: e_C.n0, sem: k + 3 }); R.linea(Math.round(x) + 2 * dir, 54, Math.round(x) + 2 * dir, 62, e_C.madS); R.pset(Math.round(x) + 2 * dir, 53, e_C.bronceL); }
  // las banderolas de los mástiles del pilono, al viento
  for (const [mx, c1, c2] of [[144, e_C.rojo, e_C.n0], [180, e_C.azul, e_C.n0]]) for (let i = 0; i < 12; i++) { const yy = 32 + Math.round(Math.sin(t * 4 - i * 0.6) * (i / 6)) , ancho = i < 9 ? 2 : 1; for (let j = 0; j < ancho; j++) R.pset(mx + 1 + i, yy + j, j === 0 ? c1 : c2); }
  // la bruma de la que sale el laberinto
  if (rev < 1) { const m = 1 - Math.max(0, rev); for (let y = 20; y <= ori; y++) for (let x = 0; x < 320; x++) { const q = m * (0.75 + 0.25 * Math.sin(x * 0.05 + y * 0.1 + t * 0.6)) * Math.min(1, (y - 20) / 18); if (e_umb(x, y) < q) B[y * 320 + x] = e_umb(x + 1, y) < 0.5 ? e_C.c4 : e_C.c5; } }
  // las palmeras de la orilla, delante del laberinto
  e_palmera(R, 10, 108, 50, t, 1); e_palmera(R, 32, 107, 40, t, 2); e_palmera(R, 300, 108, 46, t, 3); e_palmera(R, 262, 107, 30, t, 4);
  // el agua: el reflejo de todo con ondas, más oscuro hacia nosotros, brillos que corren y los destellos del sol
  for (let y = ori + 1; y < 180; y++) { const f = y * 320, dd = y - ori, sy = Math.max(0, 2 * ori - y), amp = 1 + dd / 22, a = 0.34 + dd / 170;
    const ofs = Math.round(Math.sin(y * 0.55 + t * 2.1) * amp * 0.7 + Math.sin(y * 1.7 - t * 1.3) * 0.6), fila = y - ori, vel = 3 + (fila % 4) * 2, desf = Math.floor(h(fila, 0, 433) * 400 + t * vel);
    for (let x = 0; x < 320; x++) { const sx = Math.min(319, Math.max(0, x + ofs));
      let c = e_mez(B[sy * 320 + sx], dd > 40 ? e_C.agS : e_C.ag, a);
      const m = (x + desf) % (36 + (fila % 5) * 9);
      if (fila % 2 === 0 && m < 3 + (dd >> 4)) c = e_mez(c, e_C.agL, 0.75); else if (fila % 3 === 1 && m > 20 && m < 24 + (dd >> 4)) c = e_mez(c, e_C.agS, 0.6);
      if (Math.abs(x - 236) < 10 + dd * 0.25 && fila % 2 === 0 && h(x >> 1, y, Math.floor(t * 5)) < 0.06) c = e_C.agB;
      B[f + x] = c; } }
  R.rect(0, ori + 1, 319, ori + 1, e_C.agL);
  // la vida del agua: la barquilla de papiro con su pescador, el cocodrilo lejano, las garzas y los juncos
  { const u = (t * 2.2) % 420, x = Math.round(380 - u), y = 116; R.rect(x - 8, y - 1, x + 8, y, e_C.campoS); R.pset(x - 9, y - 2, e_C.campoS); R.pset(x + 9, y - 2, e_C.campoS); R.rect(x - 7, y - 1, x + 7, y - 1, e_C.ocreS);
    e_figura(R, x + 3, y - 2, t, { alto: 9, anda: false, tela: e_C.n0 }); const pa = Math.sin(t * 1.5) * 2; R.linea(x + 5, y - 9, x + 9 + Math.round(pa), y + 3, e_C.madS); R.rect(x - 9, y + 1, x + 9, y + 1, e_C.agS); }
  e_cocodrilo(R, 40 + ((t * 2.4) % 260), 126, t);
  e_garza(R, 64, 118, t, false, 0); e_garza(R, 246, 120, t, true, 3);
  e_juncos(R, t, 0, 52, 114, 18, 1, 3); e_juncos(R, t, 270, 319, 116, 20, 2, 3); e_juncos(R, t, 110, 128, 110, 9, 3, 4);
  // la barca del viajero: el mástil y la vela (el casco va en hawaraDelante)
  const bx = o.barca === false ? null : (o.barca ?? 150), bob = Math.round(Math.sin(t * 1.6) * 1.2), suelo = 156 + bob;
  if (bx != null) e_barcaVela(R, Math.round(bx), suelo, t, o.vela ?? 1);
  return { suelo, barca: bx == null ? null : { x: bx, suelo, borde: suelo - 6, mastil: bx + 18 }, orilla: ori, pilono: [142, 182, 54], puerta: [156, 168, 80, 102], piramide: [92, 24], sol: [236, 24] };
}

// lo fijo del lago: la sierra del desierto, la pirámide de adobe, las palmeras de detrás, el laberinto y la orilla
function e_lagoFijo(R) {
  const { rect, pset, linea } = R, B = R.buf;
  for (let x = 0; x < 320; x++) { const top = Math.round(60 + Math.sin(x * 0.031) * 3 + Math.sin(x * 0.11 + 1) * 1.5 + h(x >> 3, 0, 440) * 2);
    for (let y = top; y < 100; y++) { const q = (y - top) / 14; B[y * 320 + x] = y === top ? e_C.desL : e_umb(x, y) < q ? (e_umb(x + 2, y) < q - 0.5 ? e_C.desS : e_C.des) : e_C.desL; } }
  // la pirámide de adobe: hiladas de ladrillo, la cara al sol a la derecha, la de sombra, surcos de erosión y la caliza
  // que aún la forra abajo
  const ax = 92, ay = 24, by = 100;
  for (let y = ay; y < by; y++) { const w = (y - ay) * 0.97, xr = ax + (y - ay) * 0.22;
    for (let x = Math.round(ax - w); x <= Math.round(ax + w); x++) { if (x < 0 || x > 319) continue;
      const lit = x > xr, fila = Math.floor((y - ay) / 3), bxx = (x + (fila & 1) * 3) % 6, junta = (y - ay) % 3 === 2 || bxx === 0;
      let c = lit ? e_C.aL : e_C.aS; if (junta) c = lit ? e_C.a : e_C.aSS; else if (h(x >> 1, y, 441) < 0.12) c = lit ? e_C.a : e_C.aSS;
      if (h(x >> 2, 0, 442) < 0.16 && h(x, y >> 2, 443) < 0.55) c = lit ? e_C.a : e_C.aJ;
      if (Math.abs(x - xr) < 0.6) c = e_C.aL;
      if (x === Math.round(ax - w) || x === Math.round(ax + w)) c = e_C.aSS;
      B[y * 320 + x] = c; } }
  // palmeras de detrás del laberinto: solo asoman las copas
  for (const [x, a, s] of [[18, 22, 11], [206, 24, 12], [226, 20, 13], [250, 26, 14], [270, 18, 15], [314, 20, 16]]) e_palmera(R, x, 74, a, 0, s, true);
  e_fachada(R);
  // la orilla: escalinata de piedra, un murete con matas y el borde del agua
  for (let y = 102; y <= e_ORILLA; y++) for (let x = 0; x < 320; x++) { let c = y === 102 ? e_C.pL : y === 104 ? e_C.pS : y >= 105 ? (h(x >> 1, y, 444) < 0.3 ? e_C.areS : e_C.are) : e_C.p; if (y === 103 && x % 9 === 0) c = e_C.pJ; B[y * 320 + x] = c; }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 445) * 318), w = 2 + Math.round(h(k, 2, 445) * 4); for (let i = -w; i <= w; i++) { const hh = Math.round((w - Math.abs(i)) * 0.8 + 1); for (let j = 0; j < hh; j++) pset(x + i, e_ORILLA - j, j === hh - 1 ? e_C.campoL : (i + j) & 1 ? e_C.campo : e_C.campoS); } }
}

// la fachada del laberinto: muros de sillares, dos columnatas pintadas, el pilono con su puerta y el disco alado
function e_fachada(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  const tramos = [[0, 36, 'muro'], [36, 134, 'col'], [134, 142, 'muro'], [182, 190, 'muro'], [190, 280, 'col'], [280, 320, 'muro']];
  const sillar = (x, y, x0) => { const fila = (y - 66) >> 2, bx = (x - x0 + (fila & 1) * 6) % 13; if ((y - 66) % 4 === 3 || bx === 0) return e_C.pJ; return h((x - x0 + (fila & 1) * 6) / 13 | 0, fila, 446) < 0.18 ? e_C.pS : h(x, y, 447) < 0.04 ? e_C.pSS : e_C.p; };
  for (const [x0, x1, tipo] of tramos) for (let x = x0; x < x1; x++) {
    // la azotea con su pretil, la gola de la cornisa y el toro
    B[64 * 320 + x] = e_C.pL; B[65 * 320 + x] = e_C.p; B[66 * 320 + x] = (x % 7 === 0) ? e_C.pS : e_C.p; B[67 * 320 + x] = e_C.pJ;
    B[68 * 320 + x] = e_C.pL; B[69 * 320 + x] = e_C.p; B[70 * 320 + x] = e_C.pS; B[71 * 320 + x] = e_C.pSS; B[72 * 320 + x] = (x & 1) ? e_C.pL : e_C.p; B[73 * 320 + x] = e_C.pS;
    // el arquitrabe con su friso pintado (trazos de colores, sin letras)
    for (let y = 74; y < 78; y++) { let c = (x % 24 === 0) ? e_C.pJ : e_C.p; if (y === 75 || y === 76) { const s = (x >> 2) % 4; c = (x & 3) === 3 ? e_C.pS : [e_C.rojo, e_C.azul, e_C.verde, e_C.ocre][s]; if (y === 76 && (x & 1)) c = e_mez(c, e_C.k, 0.25); } if (y === 77) c = e_C.pS; B[y * 320 + x] = c; }
    for (let y = 78; y < 98; y++) { let c;
      if (tipo === 'muro') { c = sillar(x, y, x0); if (y >= 80 && y <= 94 && (x - x0) % 8 === 4 && (y & 1) && h(x, y, 448) < 0.7) c = e_C.pSS; }
      else { const cx = x0 + 6 + Math.round((x - x0 - 6) / 12) * 12, d = x - cx;
        if (Math.abs(d) <= 3 && y >= 81) { c = d === 3 ? e_C.pL : d >= 1 ? e_C.p : d === -3 ? e_C.pSS : e_C.pS; if (y >= 82 && y <= 85) c = [e_C.rojo, e_C.azul, e_C.verde, e_C.ocre][(y - 82)]; if (y >= 82 && y <= 85 && d === 3) c = e_mez(c, e_C.n0, 0.3); if (y >= 96) c = d >= 0 ? e_C.pL : e_C.pS; }
        else if (Math.abs(d) <= 4 && y <= 80) c = y === 78 ? (d > 0 ? e_C.verde : e_C.verdeS) : y === 79 ? (d & 1 ? e_C.azul : e_C.verde) : e_C.verdeS;
        else { c = y < 83 ? e_C.intSS : y < 93 ? e_C.int2 : y < 95 ? e_C.int : e_C.intL; if (d < -3 && d > -7 && y >= 83) c = y < 93 ? e_C.intS : e_C.int; } }
      B[y * 320 + x] = c; }
    for (let y = 98; y < 102; y++) B[y * 320 + x] = y === 98 ? e_C.pL : y === 101 ? e_C.pS : e_C.p;
  }
  // el pilono central: muros en talud, gola, toro en las aristas, la puerta, el disco alado y los relieves de trazos
  for (let y = 52; y < 102; y++) { const xl = Math.round(146 - (y - 52) * 0.08), xr = Math.round(178 + (y - 52) * 0.08);
    for (let x = xl; x <= xr; x++) { let c;
      if (y < 58) c = [e_C.pL, e_C.p, e_C.pS, e_C.pSS, e_C.pL, e_C.pJ][y - 52];
      else { const fila = (y - 58) >> 2; c = ((y - 58) % 4 === 3 || (x + (fila & 1) * 5) % 11 === 0) ? e_C.pJ : h((x + (fila & 1) * 5) / 11 | 0, fila, 449) < 0.15 ? e_C.pS : e_C.p;
        if (x > 162) c = c === e_C.p ? e_C.pL : c === e_C.pS ? e_C.p : c;   // la mitad al sol
        if (x === xl) c = e_C.pS; if (x === xr) c = e_C.pL;
        if (y > 61 && y < 96 && ([148, 151, 154, 170, 173, 176].includes(x)) && (y & 1) && h(x, y, 450) < 0.75) c = e_C.pSS; }
      B[y * 320 + x] = c; } }
  rect(155, 80, 169, 101, e_C.pSS); rect(156, 81, 168, 101, e_C.intSS); rect(157, 81, 160, 101, e_C.intS); rect(156, 99, 168, 101, e_C.int);
  rect(152, 76, 172, 79, e_C.p); disco(162, 77, 2, e_C.ocre); pset(161, 76, e_C.pL); for (let i = 3; i <= 9; i++) { pset(162 - i, 77 - (i < 6 ? 1 : 0), e_C.azul); pset(162 + i, 77 - (i < 6 ? 1 : 0), e_C.azul); pset(162 - i, 78, e_C.verde); pset(162 + i, 78, e_C.verde); }
  // los mástiles de las banderolas, metidos en sus ranuras
  for (const mx of [144, 180]) { linea(mx, 30, mx, 101, e_C.madS); linea(mx + (mx < 162 ? -1 : 1), 58, mx + (mx < 162 ? -1 : 1), 101, e_C.pSS); pset(mx, 29, e_C.bronceL); for (const yy of [62, 80]) rect(mx - 2, yy, mx + 2, yy, e_C.mad); }
  // remates de la azotea: los techos de losa de los patios que asoman y algún pretil
  for (const [x0, x1] of [[20, 70], [96, 126], [200, 240], [252, 276]]) { rect(x0, 60, x1, 63, e_C.p); rect(x0, 60, x1, 60, e_C.pL); rect(x0, 63, x1, 63, e_C.pS); rect(x1 - 2, 61, x1, 63, e_C.pS); for (let x = x0 + 8; x < x1; x += 12) pset(x, 62, e_C.pJ); }
}

// la vela y el mástil de la barca del viajero (detrás de él); vela 0–1: lo que se hincha
function e_barcaVela(R, bx, suelo, t, vela) {
  const mx = bx + 18, top = suelo - 62, sw = Math.sin(t * 1.3) * 1.5 * vela;
  R.rect(mx, top, mx + 1, suelo - 4, e_C.madS); R.pset(mx, top, e_C.mad);
  R.linea(mx, top + 2, bx - 26, suelo - 8, e_C.madS);   // el estay
  const y0 = top + 4, y1 = suelo - 18, xa = mx - 22, xb = mx + 22;
  R.linea(xa, y0, xb, y0 - 2, e_C.madS); R.linea(xa, y1 + 2, xb, y1, e_C.madS);
  for (let y = y0 + 1; y <= y1; y++) { const u = (y - y0) / (y1 - y0), comba = Math.sin(u * Math.PI) * (5 * vela + sw), x0 = Math.round(xa + comba * 0.4), x1 = Math.round(xb + comba);
    for (let x = x0; x <= x1; x++) { const v = (x - x0) / (x1 - x0); let c = v > 0.7 ? e_C.tela : v < 0.15 ? e_C.telaS : e_C.n0; if ((x - x0) % 9 === 0) c = e_C.telaS; if (y % 7 === 0 && v > 0.15) c = e_mez(c, e_C.telaS, 0.5); R.pset(x, y, c); }
    R.pset(x0, y, e_C.telaS); R.pset(x1, y, e_C.pSS); }
  R.linea(xb, y1, bx + 30, suelo - 6, e_C.madS);   // la escota
}

// lo de delante del lago: el casco de papiro y madera de la barca (proa y popa curvas con remate de loto), el remo de
// popa que se mueve, su reflejo y sus ondas; y los juncos del primer plano
function e_lagoDelante(R, t, o) {
  const bx = o.barca === false ? null : Math.round(o.barca ?? 150), bob = Math.round(Math.sin(t * 1.6) * 1.2), suelo = 156 + bob;
  if (bx != null) {
    const ag = suelo + 4;
    for (let i = -46; i <= 46; i++) { if ((i + Math.floor(t * 4)) % 5 === 0) R.pset(bx + i, ag + 2 + (Math.abs(i) > 30 ? 1 : 0), e_C.agL); }
    for (let y = ag + 1; y < ag + 7; y++) for (let x = bx - 36 + (y - ag) * 2; x <= bx + 36 - (y - ag) * 2; x++) if ((x + y) & 1) R.pset(x + Math.round(Math.sin(y + t * 3)), y, e_C.agS);
    for (let x = bx - 40; x <= bx + 40; x++) { const u = (x - bx) / 40, alza = Math.round(Math.pow(Math.abs(u), 3) * 14), top = suelo - 6 - alza, bot = ag - Math.round(Math.abs(u) * 3);
      for (let y = top; y <= bot; y++) { let c = y === top ? e_C.madL : y <= top + 1 ? e_C.ocre : (y - top) % 3 === 2 ? e_C.ocreS : e_C.mad; if (y === bot) c = e_C.madS; if (Math.abs(u) > 0.8 && (y - top) % 2 === 0) c = e_C.papiro; R.pset(x, y, c); }
      R.pset(x, top - 1, e_C.k); R.pset(x, bot + 1, e_C.k);
      if ((x - bx) % 6 === 0 && Math.abs(u) < 0.75) R.pset(x, top + 3, e_C.madS); }
    for (const s of [-1, 1]) { const ex = bx + s * 40, ey = suelo - 21; R.rect(ex - 1, ey - 1, ex + 1, ey, e_C.verde); R.pset(ex + s, ey - 2, e_C.verdeS); R.pset(ex - s, ey - 2, e_C.papiro); R.pset(ex, ey - 2, e_C.rojo); }
    const ang = 0.9 + Math.sin(t * 1.2) * 0.12, rx = bx + 34, ry = suelo - 10; R.linea(rx, ry, rx + Math.round(Math.cos(ang) * 22), ry + Math.round(Math.sin(ang) * 22), e_C.madS);
    R.rect(rx + Math.round(Math.cos(ang) * 18) - 1, ry + Math.round(Math.sin(ang) * 18), rx + Math.round(Math.cos(ang) * 22) + 1, ry + Math.round(Math.sin(ang) * 22) + 1, e_C.mad); R.pset(rx, ry - 1, e_C.madL);
  }
  e_juncos(R, t, 0, 22, 182, 40, 7, 3); e_juncos(R, t, 300, 319, 182, 36, 8, 3);
  return { suelo, barca: bx == null ? null : { x: bx, suelo, borde: suelo - 6, mastil: bx + 18 } };
}

function e_patio(R, t, o) {
  const L = e_capa(R, 'hw-patio', () => e_patioFijo(R));
  R.copiar(L);
  // el sirviente que pasa por el pasillo de la puerta izquierda, con su bandeja (recortado al vano)
  { const u = (t * 6) % 70, x = 86 + u; R.recorte([97, 92, 117, 139]); e_figura(R, x, 136, t, { alto: 10, dir: 1, tela: e_C.n0, bandeja: true, sem: 1 }); R.recorte(null); }
  { const u = (t * 4 + 30) % 60, x = 258 - u; R.recorte([227, 92, 247, 139]); e_figura(R, x, 134, t, { alto: 9, dir: -1, tela: e_C.ocre, lampara: true, sem: 2 }); R.recorte(null); }
  // las motas que flotan en los haces de sol
  for (const [x0, sh] of [[184, 0], [232, 1]]) for (let k = 0; k < 16; k++) { const y = 20 + ((h(k, sh, 460) * 130 + t * (2 + h(k, 2, 460) * 3)) % 130), x = x0 - (y - 16) * 0.35 + h(k, 3, 460) * 20 + Math.sin(t * 0.7 + k) * 2; if (Math.sin(t * 1.4 + k * 2) > -0.2) R.pset(Math.round(x), Math.round(y), e_C.luz); }
  // los braseros: fuego, chispas y humo
  for (const [bx, s] of [[84, 0], [214, 1]]) e_fuego(R, bx, 140, t, s, 1);
  // el gato que cruza el patio de vez en cuando
  { const u = ((t + 3) % 16) / 7; if (u < 1) { const x = Math.round(lerp(330, -12, u)), y = 146, p = Math.floor(t * 8) % 2, g = hex('#c89858'), gs = hex('#8a6438');
    R.rect(x, y - 4, x + 7, y - 2, g); R.rect(x, y - 2, x + 7, y - 2, gs); R.rect(x - 2, y - 6, x, y - 3, g); R.pset(x - 2, y - 7, gs); R.pset(x, y - 7, gs); R.pset(x - 2, y - 5, e_C.k);
    for (const lx of [x + 1, x + 6]) { R.pset(lx + p, y - 1, gs); R.pset(lx + p, y, gs); } R.linea(x + 7, y - 4, x + 10, y - 7 + Math.round(Math.sin(t * 3)), gs); } }
  return { suelo: 162, puertas: [[96, 118, 92, 140], [226, 248, 92, 140]], columnas: [26, 262], braseros: [[84, 156], [214, 156]], haces: [[137, 157], [185, 205]], libre: [44, 244] };
}

// lo de delante del patio: las dos columnas grandes con capitel de papiro abierto (por delante de quien pase)
function e_patioDelante(R, t, o) { for (const cx of [26, 262]) e_columna(R, cx, 30, 166, 11, 1); return { columnas: [[15, 37], [251, 273]] }; }

// un fuego de brasero o de lámpara: llamas que tiemblan, chispas que suben, humo; s: semilla; g: tamaño
function e_fuego(R, x, y, t, s = 0, g = 1) {
  const n = Math.round(7 * g);
  for (let k = 0; k < n; k++) { const dx = k - (n - 1) / 2, hh = Math.max(1, Math.round((3 + 5 * h(k, Math.floor(t * 10 + s * 7), 461)) * g * (1 - Math.abs(dx) / (n * 0.7))));
    for (let j = 0; j < hh; j++) R.pset(Math.round(x + dx + Math.sin(t * 9 + j + k) * (j > hh * 0.6 ? 0.6 : 0)), y - j, j < hh * 0.35 ? e_C.llamaL : j < hh * 0.7 ? e_C.llama : e_C.llamaS); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.8 + k / 3 + s * 0.37) % 1), yy = Math.round(y - 6 * g - u * 30 * g), xx = Math.round(x + Math.sin(u * 7 + k + s) * 3 * u * g); if (u < 0.25 && h(k, Math.floor(t * 6), 462) < 0.5) R.pset(xx, yy, e_C.llamaL); else if (u > 0.2) { R.pset(xx, yy, e_mez(R.pget(xx, yy), e_C.humo, 0.5 - u * 0.4)); R.pset(xx + 1, yy, e_mez(R.pget(xx + 1, yy), e_C.humo, 0.35 - u * 0.3)); } }
}

// lo fijo del patio: techo de losas con dos aberturas, arquitrabe pintado, muro con relieves y puertas, columnas, suelo,
// braseros y los haces de sol
function e_patioFijo(R) {
  const { rect, pset, linea, disco } = R, B = R.buf;
  // el techo: grandes losas (una sola piedra cada una) vistas por debajo, con sus juntas y la piedra en sombra
  for (let y = 0; y < 20; y++) for (let x = 0; x < 320; x++) { let c = (x % 92 === 40) ? e_C.intS : h(x >> 2, y >> 1, 463) < 0.15 ? e_C.int : hex('#66523f'); if (y === 19) c = e_C.intS; B[y * 320 + x] = c; }
  for (const [x0, x1] of [[184, 204], [232, 252]]) { rect(x0 - 1, 2, x1 + 1, 16, e_C.intSS); for (let y = 3; y <= 15; y++) for (let x = x0; x <= x1; x++) B[y * 320 + x] = e_umb(x, y) < (y - 3) / 14 ? e_C.c3 : e_C.c2; rect(x0, 15, x1, 16, e_C.pS); rect(x0, 16, x1, 16, e_C.pL); }
  // el arquitrabe: la viga de piedra sobre las columnas, con su friso de trazos pintados
  for (let y = 20; y < 30; y++) for (let x = 0; x < 320; x++) { let c = y < 22 ? e_C.pSS : y === 29 ? e_C.pSS : e_C.pS;
    if (y >= 23 && y <= 27) { const s = (x >> 3) % 4, m = x & 7; c = m === 0 ? e_C.pSS : [e_C.rojoS, e_C.azulS, e_C.verdeS, e_C.ocreS][s]; if (y === 25 && m > 1 && m < 6) c = e_C.pS; if (x > 272) c = e_C.pS; }
    if (y === 22) c = e_C.pS; B[y * 320 + x] = c; }
  // el muro del fondo: sillares en penumbra, relieves en tres registros (procesiones de figuras de trazos, columnas de
  // trazos) y dos puertas a los pasillos
  for (let y = 30; y < 140; y++) for (let x = 0; x < 320; x++) { const fila = (y - 30) >> 3, bx = (x + (fila & 1) * 9) % 18; let c = ((y - 30) % 8 === 7 || bx === 0) ? e_C.pO : h((x + (fila & 1) * 9) / 18 | 0, fila, 464) < 0.2 ? hex('#a08c70') : e_C.pSS;
    if (y > 120) c = e_mez(c, e_C.pO, (y - 120) / 40); B[y * 320 + x] = c; }
  for (const [ry, ah] of [[36, 18], [60, 18]]) { rect(0, ry - 1, 319, ry - 1, e_C.pO); rect(0, ry + ah, 319, ry + ah, e_C.pO);
    for (let x = 8; x < 316; x += 14) { if (x > 268 && ry < 50) continue; const k = (x / 14) | 0;
      if (k % 3 === 2) { for (let j = 0; j < ah - 2; j += 2) if (h(x, j, 465) < 0.8) { rect(x, ry + 1 + j, x + 3, ry + 1 + j, e_C.pO); } }   // una columna de trazos
      else { const fx = x + 4, fy = ry + ah - 1, c1 = k % 2 ? e_C.rojoS : e_C.azulS;   // una figura de perfil que lleva una ofrenda
        linea(fx, fy, fx + 1, fy - 5, e_C.pO); linea(fx + 3, fy, fx + 2, fy - 5, e_C.pO); rect(fx, fy - 11, fx + 3, fy - 5, c1); rect(fx + 1, fy - 14, fx + 3, fy - 12, e_C.piel); pset(fx + 1, fy - 15, e_C.pelo); pset(fx + 2, fy - 15, e_C.pelo);
        linea(fx + 3, fy - 10, fx + 6, fy - 12, e_C.piel); rect(fx + 5, fy - 14, fx + 7, fy - 13, [e_C.ocre, e_C.verde, e_C.rojo][k % 3]); } } }
  // las dos puertas a los pasillos, con su dintel y la luz del pasillo
  for (const [x0, x1] of [[96, 118], [226, 248]]) { rect(x0 - 3, 86, x1 + 3, 140, e_C.pS); rect(x0 - 3, 86, x1 + 3, 88, e_C.pL); rect(x0 - 2, 89, x1 + 2, 90, e_C.ocreS);
    for (let y = 92; y < 140; y++) for (let x = x0; x <= x1; x++) { const q = (y - 92) / 48; B[y * 320 + x] = y > 130 ? (e_umb(x, y) < 0.5 ? e_C.intL : e_C.int) : e_umb(x, y) < q * 0.7 ? e_C.int : e_C.intS; }
    rect(x0, 92, x0, 139, e_C.intSS); for (let x = x0 + 2; x < x1; x += 5) pset(x, 131, e_C.intS); }
  // el suelo de losas en perspectiva, con juntas que convergen y su brillo
  for (let y = 140; y < 180; y++) { const z = 60 / (y - 116), fila = Math.floor(z * 6);
    for (let x = 0; x < 320; x++) { const u = (x - 160) * z / 22 + (fila & 1) * 0.5, m = ((u % 1) + 1) % 1, junta = m < 0.06 || Math.abs(z * 6 - fila - 0.5) > 0.44;
      let c = junta ? e_C.pSS : h(Math.floor(u), fila, 466) < 0.25 ? e_C.pS : hex('#ddd0b0'); if (!junta && h(x, y, 467) < 0.05) c = e_C.pS; B[y * 320 + x] = c; } }
  // las columnas del fondo (más pequeñas)
  for (const cx of [50, 150, 250]) e_columna(R, cx, 30, 142, 5, 0.75);
  // los braseros de bronce sobre su trípode
  for (const bx of [84, 214]) { for (const s of [-1, 0, 1]) linea(bx + s * 2, 146, bx + s * 7, 157, e_C.bronceS); rect(bx - 9, 139, bx + 9, 147, e_C.k); rect(bx - 8, 140, bx + 8, 145, e_C.bronce); rect(bx - 8, 140, bx + 8, 140, e_C.bronceL); rect(bx - 7, 145, bx + 7, 146, e_C.bronceS); rect(bx - 6, 139, bx + 6, 139, e_C.llamaS); for (let i = -5; i <= 5; i += 2) pset(bx + i, 138, e_C.k); disco(bx, 158, 2, e_C.pSS); }
  // las sombras de las columnas sobre el suelo (la luz entra por la derecha)
  for (const [cx, r, yb] of [[26, 11, 166], [262, 11, 166], [50, 5, 142], [150, 5, 142], [250, 5, 142]]) for (let j = 0; j < 7; j++) { const y = yb - j; for (let x = cx - r - j * 6; x <= cx + r - j * 5; x++) if (x >= 0 && x < 320 && y >= 140) B[y * 320 + x] = e_mez(B[y * 320 + x], e_C.intS, 0.28); }
  // tinajas de agua y aceite junto a las columnas, y una mesa baja de ofrendas con panes y frutas
  for (const [x, y, s] of [[56, 160, 1], [66, 158, 0.8], [228, 160, 1], [238, 157, 0.8], [284, 150, 0.9]]) { const r = Math.round(5 * s); for (let j = -r * 2; j <= 0; j++) { const w = Math.round(Math.sin((j + r * 2) / (r * 2) * Math.PI) * r + 1); for (let i = -w; i <= w; i++) pset(x + i, y + j, i > w * 0.4 ? e_C.rojoS : i < -w * 0.5 ? hex('#d88a5a') : hex('#b8603e')); pset(x - w - 1, y + j, e_C.k); pset(x + w + 1, y + j, e_C.k); }
    rect(x - 2, y - r * 2 - 2, x + 2, y - r * 2, hex('#8a4030')); rect(x - 2, y - r * 2 - 2, x + 2, y - r * 2 - 2, hex('#d88a5a')); rect(x - r, y + 1, x + r, y + 1, e_C.pSS); for (let i = -r + 1; i < r; i += 3) pset(x + i, y - r, e_C.ocre); }
  { const x0 = 290, y = 160; rect(x0, y - 6, x0 + 22, y - 5, e_C.mad); rect(x0, y - 6, x0 + 22, y - 6, e_C.madL); rect(x0 + 1, y - 4, x0 + 2, y, e_C.madS); rect(x0 + 20, y - 4, x0 + 21, y, e_C.madS);
    disco(x0 + 5, y - 8, 2, e_C.ocreS); pset(x0 + 4, y - 9, e_C.ocre); disco(x0 + 11, y - 8, 2, e_C.verde); pset(x0 + 10, y - 9, e_C.campoL); disco(x0 + 17, y - 8, 2, e_C.rojo); rect(x0 + 6, y - 11, x0 + 15, y - 10, e_C.datil); }
  // los haces de sol que bajan de las aberturas del techo y la mancha que dejan en el suelo
  for (const x0 of [184, 232]) for (let y = 17; y < 170; y++) { const d = Math.round((y - 16) * 0.35); for (let x = x0 - d; x <= x0 + 20 - d; x++) { if (x < 0 || x > 319) continue; const suelo = y > 150, a = suelo ? 0.5 : 0.26 + (y < 40 ? 0.1 : 0);
    if (suelo ? y < 150 + Math.round(6 * Math.sin((x - x0 + d) / 20 * Math.PI)) + 6 : ((x + y) & 1) === 0) B[y * 320 + x] = e_mez(B[y * 320 + x], e_C.luz, a); } }
}

// una columna pintada de capitel de papiro abierto (cx, de top a base, radio r del fuste; f: luz 0–1)
function e_columna(R, cx, top, base, r, f = 1) {
  const B = R.buf, cap = Math.round(r * 1.25);
  for (let y = top; y <= base; y++) { if (y < 0 || y > 179) continue;
    let w = r; if (y < top + cap) w = Math.round(r + (r * 0.5) * (1 - (y - top) / cap)); if (y > base - 3) w = r + 2;
    for (let x = cx - w; x <= cx + w; x++) { if (x < 0 || x > 319) continue; const v = (cx - x) / w;   // la luz viene de la derecha
      let c = v < -0.85 ? e_C.pS : v < -0.3 ? e_C.pL : v < 0.4 ? e_C.p : v < 0.8 ? e_C.pS : e_C.pSS;
      if (y < top + cap) { const s = Math.floor((x - cx + w) / Math.max(2, Math.round(w / 3))); c = y < top + 2 ? e_C.ocre : (s % 2 ? e_C.verde : e_C.azul); if (v > 0.5) c = e_mez(c, e_C.k, 0.3); if (v < -0.4 && y > top + 1) c = e_mez(c, e_C.n0, 0.2); if ((y - top) % 4 === 3) c = e_C.ocreS; }
      else if (y < top + cap + 8) { const b = Math.floor((y - top - cap) / 2); c = [e_C.rojo, e_C.ocre, e_C.azul, e_C.verde][b % 4]; if (v > 0.5) c = e_mez(c, e_C.k, 0.3); if (v < -0.5) c = e_mez(c, e_C.n0, 0.2); }
      else if (y < base - 3 && Math.abs(x - cx) <= Math.round(r * 0.35) && y > top + cap + 12 && y < top + cap + 12 + (base - top) * 0.4) { c = (y & 1) && h(x, y, 468) < 0.7 ? e_C.pSS : e_C.p; }   // la banda de trazos
      else if (y > base - 3) c = y === base - 2 ? e_C.pL : e_C.pS;
      if (f < 1) c = e_mez(c, e_C.pO, 0.3);
      B[y * 320 + x] = c; } }
}

const e_VANO = [186, 246, 64, 150];   // la puerta de la escalera: x0, x1, y0 (dintel), y1 (umbral)

function e_escalera(R, t, o) {
  const L = e_capa(R, 'hw-escalera', () => e_escaleraFijo(R));
  R.copiar(L);
  // un resplandor lejano que tiembla allá abajo (¿alguien con un candil?)
  { const a = 0.4 + 0.3 * Math.sin(t * 1.3) + 0.15 * Math.sin(t * 7.1); for (let y = 112; y < 122; y++) for (let x = 208; x < 224; x++) { const d = Math.hypot(x - 216, (y - 117) * 1.6); if (d < 8 && e_umb(x, y) < a * (1 - d / 8)) R.pset(x, y, e_mez(R.pget(x, y), e_C.llama, 0.25)); } }
  // las lámparas: halo que respira, llama y humo
  for (const [lx, ly, s] of [[158, 80, 0], [272, 116, 1], [18, 82, 2]]) { const fl = 0.85 + 0.15 * Math.sin(t * 11 + s * 3) * Math.sin(t * 3.3 + s);
    for (let y = ly - 22; y <= ly + 18; y++) for (let x = lx - 24; x <= lx + 24; x++) { const d = Math.hypot(x - lx, (y - ly) * 1.1) / (22 * fl); if (d < 1 && d > 0.15 && e_umb(x, y) < (1 - d) * 0.8) R.pset(x, y, e_mez(R.pget(x, y), e_C.luz, 0.22)); }
    e_fuego(R, lx, ly, t, s, 0.5); }
  // el escarabajo que empuja su bola por el suelo, despacio
  { const u = (t * 5) % 360, x = Math.round(330 - u), y = 172, r = Math.floor(t * 6) % 2; R.disco(x - 4, y - 2, 2, e_C.aS); R.pset(x - 5, y - 3, e_C.aL); R.pset(x - 4 + (r ? 1 : -1), y - 2, e_C.aSS);
    R.rect(x, y - 2, x + 3, y, e_C.k); R.pset(x + 1, y - 2, hex('#3a4a5a')); R.pset(x - 1, y - 1, e_C.k); R.pset(x + 1 + r, y + 1, e_C.k); R.pset(x + 3 - r, y + 1, e_C.k); }
  return { suelo: 166, umbral: e_VANO[3], vano: e_VANO.slice(), guardian: [206, e_VANO[3]], cocodrilo: [28, 132, 44, 98], lamparas: [[158, 80], [272, 116], [18, 82]], libre: [40, 182] };
}

// lo fijo de la escalera: el techo, el muro de sillares, el cocodrilo sagrado pintado, la hornacina, el vano con la
// escalera que baja a oscuras, la lámpara de pie y el suelo de losas
function e_escaleraFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, [v0, v1, vt, vb] = e_VANO;
  // la luz de las lámparas sobre el muro (cálida cerca, fría y oscura lejos)
  const luzEn = (x, y) => { let s = 0; for (const [lx, ly, f] of [[158, 80, 1], [272, 116, 0.9], [18, 82, 0.8]]) s += f * Math.max(0, 1 - Math.hypot(x - lx, (y - ly) * 1.15) / 110); return Math.min(1, s); };
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { let c;
    if (y < 12) c = y === 11 ? e_C.intSS : h(x >> 3, y >> 2, 470) < 0.3 ? e_C.intS : e_C.int;
    else { const fila = (y - 12) >> 4, bx = (x + (fila & 1) * 17) % 34, jun = (y - 12) % 16 === 15 || bx === 0; let l = luzEn(x, y);
      const base = h((x + (fila & 1) * 17) / 34 | 0, fila, 471) < 0.25 ? 1 : 0; l = Math.max(0, Math.min(1, l + (e_umb(x, y) - 0.5) * 0.22));
      c = jun ? (l > 0.5 ? e_C.pSS : e_C.pO) : (l > 0.62 ? (base ? e_C.pS : e_C.p) : l > 0.38 ? (base ? e_C.pSS : e_C.pS) : l > 0.18 ? (base ? e_C.pO : e_C.pSS) : (base ? e_C.intL : e_C.pO));
      if (!jun && e_umb(x, y) < 0.3 && h(x, y, 472) < 0.08) c = e_C.pO;
      if (!jun && (y - 12) % 16 === 0) c = e_mez(c, e_C.pL, 0.3);   // el canto de luz de cada hilada
      if (l > 0.3 && e_umb(x, y) < (l - 0.3) * 0.6) c = e_mez(c, e_C.luz, 0.15); }
    B[y * 320 + x] = c; }
  // el cocodrilo sagrado pintado: el panel ocre con su marco de bandas, el altar y el cocodrilo con el disco y las plumas
  rect(28, 44, 132, 98, e_C.ocreS); rect(30, 46, 130, 96, hex('#e6c27a'));
  for (let x = 28; x <= 132; x++) { const c = [e_C.rojo, e_C.azul, e_C.verde][((x - 28) >> 2) % 3]; pset(x, 44, c); pset(x, 98, c); }
  for (let y = 44; y <= 98; y++) { const c = [e_C.rojo, e_C.azul, e_C.verde][((y - 44) >> 2) % 3]; pset(28, y, c); pset(132, y, c); }
  for (let y = 48; y < 95; y++) for (let x = 31; x < 130; x++) if (h(x, y, 473) < 0.06) pset(x, y, hex('#d4ae66'));
  rect(46, 82, 116, 94, e_C.n0); rect(46, 82, 116, 83, e_C.rojo); for (let x = 48; x < 116; x += 6) rect(x, 85, x + 2, 93, e_C.rojoS); rect(46, 94, 116, 94, e_C.ocreS);   // el altar
  { const cy = 76, verde = hex('#4e8a4a'), verdeS = hex('#2e5e34'), verdeL = hex('#8ac06a');
    poligono([[50, cy + 2], [64, cy - 4], [100, cy - 5], [112, cy - 2], [112, cy + 3], [56, cy + 4]], verde);
    linea(50, cy + 2, 40, cy + 4, verde); linea(40, cy + 4, 34, cy + 2, verde); pset(34, cy + 1, verdeS);   // la cola
    poligono([[100, cy - 5], [124, cy - 1], [124, cy + 2], [104, cy + 2]], verde); linea(104, cy + 1, 124, cy + 1, verdeS); pset(108, cy - 4, e_C.n0); pset(109, cy - 4, e_C.k);
    for (let x = 58; x < 110; x += 4) { pset(x, cy - 4, verdeS); pset(x + 1, cy - 5, verdeS); pset(x, cy - 1, verdeL); }
    rect(56, cy + 3, 108, cy + 3, verdeL); for (const lx of [62, 72, 94, 104]) { rect(lx, cy + 4, lx + 2, cy + 6, verde); rect(lx - 1, cy + 6, lx + 3, cy + 6, verdeS); }
    disco(106, cy - 12, 4, e_C.rojo); disco(105, cy - 13, 2, hex('#e86a48')); for (const px of [100, 102]) { linea(px, cy - 8, px - 1, cy - 26, e_C.n0); linea(px + 1, cy - 8, px, cy - 26, e_C.azul); }   // el disco solar y las plumas
  }
  for (const cx of [36, 42, 120, 126]) for (let y = 50; y < 80; y += 2) if (h(cx, y, 474) < 0.8) rect(cx - 2, y, cx + 1, y, e_C.ocreS);   // columnas de trazos
  // la hornacina con su lámpara de aceite
  rect(147, 64, 169, 86, e_C.pO); rect(149, 66, 167, 86, e_C.intS); rect(149, 84, 167, 86, e_C.pSS); rect(152, 81, 164, 83, e_C.bronce); rect(152, 81, 164, 81, e_C.bronceL); pset(164, 80, e_C.bronceS); pset(152, 82, e_C.bronceS);
  // el vano: jambas y dintel con el disco alado, y la escalera que baja a la oscuridad entre dos muros
  rect(v0 - 8, vt - 10, v1 + 8, vb, e_C.pS); rect(v0 - 8, vt - 10, v1 + 8, vt - 9, e_C.pL); rect(v0 - 8, vt - 2, v1 + 8, vt - 1, e_C.pSS);
  disco(216, vt - 6, 2, e_C.rojo); for (let i = 3; i <= 18; i++) { pset(216 - i, vt - 6 - (i < 9 ? 1 : 0), e_C.azul); pset(216 + i, vt - 6 - (i < 9 ? 1 : 0), e_C.azul); if (i % 2) { pset(216 - i, vt - 5, e_C.verde); pset(216 + i, vt - 5, e_C.verde); } }
  for (let y = vt; y <= vb; y++) { pset(v0 - 8, y, e_C.pSS); pset(v1 + 8, y, e_C.pL); for (const jx of [v0 - 5, v1 + 4]) if (y % 3 === 0) pset(jx, y, e_C.pSS); }
  // la escalera: muros del hueco que se estrechan y peldaños cada vez más lejos, más bajos y más oscuros
  for (let y = vt; y <= vb; y++) for (let x = v0; x <= v1; x++) { const q = Math.max(0, (y - vt - 30) / (vb - vt - 30)), lado = Math.round(2 + q * 0);
    B[y * 320 + x] = e_umb(x, y) < q * 0.25 ? e_C.intS : e_C.intSS; }
  const ys = [0, 7, 13, 18, 22.5, 26, 29, 31.5, 33.5, 35];
  for (let k = 0; k < ys.length - 1; k++) { const a = Math.pow(1 - k / (ys.length - 1), 1.4), yb = Math.round(vb - ys[k]), yt = Math.round(vb - ys[k + 1]), lado = Math.round(3 + k * 2.8);
    for (let y = yt; y <= yb; y++) { for (let x = v0; x <= v1; x++) { let c;
      if (x < v0 + lado || x > v1 - lado) { const izq = x < v0 + lado, fila = y >> 2; c = (y & 3) === 0 || (x + fila * 3) % 9 === 0 ? e_C.intSS : izq ? e_C.pO : e_C.pSS; c = e_mez(c, e_C.intSS, Math.min(1, 1.05 - a * (izq ? 0.8 : 1))); }
      else { c = y === yt ? e_C.intSS : y === yb ? e_mez(e_C.pL, e_C.intSS, 1 - a) : e_mez(h(x >> 2, k, 469) < 0.3 ? e_C.pSS : e_C.pS, e_C.intSS, 1 - a); if (y === yt + 1 && e_umb(x, y) < 0.5) c = e_mez(c, e_C.intSS, 0.5); }
      if (e_umb(x, y) > 0.35 + a * 0.65) c = e_mez(c, e_C.intSS, 0.6);
      B[y * 320 + x] = c; } } }
  for (let y = vt; y < vb - 35; y++) for (const x of [v0 + 30, v1 - 30]) if (e_umb(x, y) < 0.3) B[y * 320 + x] = e_C.intS;
  rect(v0, vb, v1, vb, e_C.pL);
  // la lámpara de pie de bronce junto a la puerta
  rect(271, 120, 273, 162, e_C.bronceS); rect(271, 120, 271, 162, e_C.bronceL); rect(266, 162, 278, 164, e_C.bronceS); rect(268, 161, 276, 161, e_C.bronce); rect(265, 117, 279, 119, e_C.bronce); rect(265, 117, 279, 117, e_C.bronceL);
  // la lámpara de la izquierda: una repisa con su candil
  rect(10, 86, 26, 88, e_C.pSS); rect(10, 86, 26, 86, e_C.pS); rect(13, 83, 23, 85, e_C.bronce); rect(13, 83, 23, 83, e_C.bronceL);
  // el suelo de losas, con la luz de las lámparas
  for (let y = 150; y < 180; y++) { const z = 50 / (y - 126), fila = Math.floor(z * 5);
    for (let x = 0; x < 320; x++) { const u = (x - 160) * z / 26 + (fila & 1) * 0.5, m = ((u % 1) + 1) % 1, jun = m < 0.07 || Math.abs(z * 5 - fila - 0.5) > 0.42, l = luzEn(x, y - 40);
      let c = jun ? e_C.pO : h(Math.floor(u), fila, 475) < 0.3 ? e_C.pSS : e_C.pS; if (!jun && l > 0.45 && e_umb(x, y) < l - 0.3) c = e_mez(c, e_C.luz, 0.2); if (!jun && h(x, y, 476) < 0.05) c = e_C.are; if (y === 150) c = e_C.pO;
      B[y * 320 + x] = c; } }
}

// la puerta de madera con herrajes de bronce que se cierra sobre la escalera (p 0–1); va por delante de todo
function e_escaleraDelante(R, t, o) {
  const p = Math.max(0, Math.min(1, o.puerta ?? 0)), [v0, v1, vt, vb] = e_VANO;
  if (p > 0) {
    const ang = (1 - p) * Math.PI * 0.5, w = Math.max(2, Math.round((v1 - v0) * Math.cos(ang))), xa = v1 - w, enc = Math.round(Math.sin(ang) * 6);
    for (let x = xa; x <= v1; x++) { const u = (x - xa) / Math.max(1, v1 - xa), top = vt + Math.round((1 - u) * enc * 0.5), bot = vb - Math.round((1 - u) * enc * 0.5);
      for (let y = top; y <= bot; y++) { const tabla = Math.floor((x - xa) / Math.max(2, w / 6)); let c = (x - xa) % Math.max(2, Math.round(w / 6)) === 0 ? e_C.madS : tabla % 2 ? e_C.mad : hex('#8a5c34');
        if (h(x, y >> 1, 477) < 0.08) c = e_C.madS; else if (h(x, y, 478) < 0.04) c = e_C.madL;
        for (const hy of [vt + 12, (vt + vb) >> 1, vb - 12]) if (Math.abs(y - hy) <= 1) c = y === hy - 1 ? e_C.bronceL : e_C.bronce;
        if (x === xa || y === top || y === bot) c = e_C.madS; R.pset(x, y, c); }
      for (const hy of [vt + 12, (vt + vb) >> 1, vb - 12]) if ((x - xa) % 5 === 2) R.pset(x, hy, e_C.bronceS); }
    if (w > 8) { const ax = xa + 5, ay = (vt + vb) >> 1; R.disco(ax, ay + 6, 2, e_C.bronceS); R.pset(ax, ay + 4, e_C.bronceL); }   // la argolla
    if (p >= 1 && (o.portazo ?? 0) > 0) { const q = o.portazo; for (let k = 0; k < 10; k++) { const y = vt + 6 + k * 8, x = v0 - 3 - Math.round(q * 6 * h(k, 1, 479)); R.pset(x, y, e_C.are); } }
  }
  return { suelo: 166, umbral: vb, vano: e_VANO.slice() };
}

const e_PAS = { vx: 160, vy: 96, f: 84, X: 1.5, piso: 1, techo: -1.7, lado: 2.7, fondo: 9.2 };

function e_pasillos(R, t, o) {
  const L = e_capa(R, 'hw-pasillos', () => e_pasillosFijo(R)), Z = e_CACHE.get(R).get('hw-pasillos-z');
  R.copiar(L);
  const { vx, vy, f, X } = e_PAS, sx = (x, z) => vx + x * f / z, sy = (y, z) => vy + y * f / z;
  // la figura diminuta que cruza el pasillo del fondo con su candil (tapada por las columnas)
  { const z = 8.4, u = ((t * 0.18) % 1.4), wx = lerp(-3.4, 3.4, u), x = sx(wx, z), y = sy(e_PAS.piso, z), dir = 1;
    if (u <= 1) e_figura(R, x, y, t, { alto: 9, dir, tela: e_C.n0, lampara: true, sem: 4, ps: (xx, yy, c) => { if (xx >= 0 && xx < 320 && yy >= 0 && yy < 180 && Z[yy * 320 + xx] > z) R.pset(xx, yy, c); } }); }
  // las lámparas de las columnas: llama y halo que tiembla
  for (let z = 2; z <= 7; z++) for (const s of [-1, 1]) { const lx = Math.round(sx(s * (X - 0.2), z)), ly = Math.round(sy(-0.35, z)), g = Math.max(0.3, 1.6 / z), fl = 0.8 + 0.2 * Math.sin(t * 9 + z * 2 + s);
    const rr = Math.round(14 * g * fl); for (let y = ly - rr; y <= ly + rr; y++) for (let x = lx - rr; x <= lx + rr; x++) { const d = Math.hypot(x - lx, y - ly) / rr; if (d < 1 && d > 0.2 && e_umb(x, y) < (1 - d) * 0.7) R.pset(x, y, e_mez(R.pget(x, y), e_C.luz, 0.2)); }
    e_fuego(R, lx, ly, t, z + s, g * 0.55); }
  // las motas en la luz de los pasillos laterales
  for (let k = 0; k < 20; k++) { const x = 30 + h(k, 1, 480) * 260 + Math.sin(t * 0.5 + k) * 4, y = 40 + ((h(k, 2, 480) * 120 + t * (1.5 + h(k, 3, 480) * 2)) % 120); if (Math.sin(t + k * 1.3) > 0) R.pset(Math.round(x), Math.round(y), e_C.luz); }
  return { suelo: 168, fuga: [vx, vy], libre: [90, 230], cruce: [Math.round(sx(-2.7, 8.4)), Math.round(sx(2.7, 8.4)), Math.round(sy(1, 8.4))] };
}

// lo fijo de los pasillos: un trazado de rayos por píxel (suelo de losas, techo de losas, muros con relieves, columnas
// pintadas a los lados, dos pasillos laterales con luz de día y el cruce del fondo), con la luz de las lámparas y la
// oscuridad que crece con la distancia; guarda la profundidad para tapar lo que pasa por detrás
function e_pasillosFijo(R) {
  const { vx, vy, f, X, piso, techo, lado, fondo } = e_PAS, B = R.buf, Z = new Float32Array(57600), cw = 0.17;
  const lamp = []; for (let z = 2; z <= 7; z++) for (const s of [-1, 1]) lamp.push([s * (X - 0.2), -0.35, z]);
  const luzEn = (px, py, pz) => { let l = 0; for (const [a, b, c] of lamp) { const d = Math.hypot(px - a, py - b, pz - c); l += Math.max(0, 1 - d / 2.4) * 0.7; } return Math.min(1, l); };
  const abiertoL = (z) => z > 2.2 && z < 3.2, abiertoR = (z) => z > 2.15 && z < 2.95, cruce = (z) => z > 7.6;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dx = (x - vx) / f, dy = (y - vy) / f; let zh = 1e9, tipo = 0, px = 0, py = 0;
    if (dy > 0.001) { const z = piso / dy; if (z < zh) { zh = z; tipo = 1; } } else if (dy < -0.001) { const z = techo / dy; if (z < zh) { zh = z; tipo = 2; } }
    if (Math.abs(dx) > 0.0005) { const z = lado / Math.abs(dx), s = Math.sign(dx); const abierto = cruce(z) || (s < 0 ? abiertoL(z) : abiertoR(z)); if (z < zh && !abierto) { zh = z; tipo = 3; } else if (z < zh && abierto && !cruce(z)) { const z2 = 6 / Math.abs(dx); if (z2 < zh) { zh = z2; tipo = 6; } } }
    if (fondo < zh) { const xx = dx * fondo; if (Math.abs(xx) < lado + 1.2 || true) { zh = fondo; tipo = 4; } }
    for (let z = 2; z <= 7; z++) for (const s of [-1, 1]) { const cx = s * X, xx = dx * z, yy = dy * z; if (Math.abs(xx - cx) < cw && yy > techo && yy < piso && z < zh) { zh = z; tipo = 5; px = (xx - cx) / cw; py = yy; } }
    const wx = dx * zh, wy = dy * zh, oscuro = Math.max(0, Math.min(1, (zh - 1.5) / 8.5)); let c;
    if (tipo === 1) { const u = wx / 0.6, v = zh / 0.6 + (Math.floor(u) & 1) * 0.5, ju = Math.abs(u - Math.round(u)) < 0.03 * zh || Math.abs(v - Math.round(v)) < 0.025 * zh + 0.02; c = ju ? e_C.pO : h(Math.floor(u), Math.floor(v), 481) < 0.3 ? e_C.pSS : e_C.pS; if (Math.abs(wx) > lado) c = e_mez(c, e_C.luz, 0.3); }
    else if (tipo === 2) { const v = zh / 1.0; c = Math.abs(v - Math.round(v)) < 0.02 * zh + 0.015 ? e_C.intSS : Math.abs(wx) < X - 0.25 ? (Math.floor(v) & 1 ? e_C.intS : e_C.int) : e_C.intS;
      if (Math.abs(Math.abs(wx) - (X - 0.05)) < 0.12 && zh < 8) c = e_C.pSS; }   // las vigas sobre las columnas
    else if (tipo === 3) { const fila = Math.floor((wy - techo) / 0.45), v = zh / 0.9 + (fila & 1) * 0.5, ju = Math.abs((wy - techo) / 0.45 - fila - 0.5) > 0.44 || Math.abs(v - Math.round(v)) < 0.03 * zh; c = ju ? e_C.pO : h(Math.floor(v), fila, 482) < 0.25 ? e_C.pSS : e_C.pS;
      if (!ju && fila >= 2 && fila <= 3 && h(Math.floor(zh * 3), Math.floor(wy * 4), 483) < 0.35) c = Math.floor(zh * 3) % 3 ? e_C.ocreS : e_C.rojoS; }   // relieves de trazos
    else if (tipo === 6) { const q = 1 - Math.min(1, (zh - 6) / 30); c = wy > piso - 0.3 ? e_C.pS : e_umb(x, y) < 0.5 ? e_C.p : e_C.pL; c = e_mez(c, e_C.luz, 0.25); if (wy > 0.2 && wy < piso && Math.abs(dx * 6) > 3.2 && (x & 3) === 0) c = e_C.pS; }   // la luz de día al fondo de un pasillo lateral
    else if (tipo === 4) { const ab = Math.abs(wx) > 1.2; c = ab ? (e_umb(x, y) < 0.3 ? e_C.pO : e_C.intS) : (Math.floor((wy - techo) / 0.4) % 2 ? e_C.pSS : e_C.pO); if (!ab && Math.abs(wx) < 0.5 && wy > -0.6 && wy < 0.3) c = (x + y) & 1 ? e_C.rojoS : e_C.ocreS; }   // el muro del cruce, con una pintura
    else if (tipo === 5) { const cap = py < techo + 0.45, banda = py > techo + 0.45 && py < techo + 0.75; c = px < -0.5 ? e_C.pL : px < 0.3 ? e_C.p : px < 0.75 ? e_C.pS : e_C.pSS;
      if (cap) c = Math.floor((py - techo) / 0.09) % 2 ? e_C.verde : e_C.azul; else if (banda) c = [e_C.rojo, e_C.ocre, e_C.azul][Math.floor((py - techo - 0.45) / 0.1) % 3];
      if (py > piso - 0.12) c = e_C.pS; if (dx > 0 && !cap && !banda && px > 0) c = e_mez(c, e_C.k, 0.15); }
    if (tipo !== 6) { const l = luzEn(wx, wy, zh); if (l > 0.05) c = e_mez(c, e_C.luz, l * 0.35); c = e_umb(x, y) < oscuro ? e_mez(c, e_C.intSS, 0.55 + oscuro * 0.3) : e_mez(c, e_C.intSS, oscuro * 0.5); }
    B[y * 320 + x] = c; Z[y * 320 + x] = zh;
  }
  e_CACHE.get(R).set('hw-pasillos-z', Z);
}

const e_HOR = 90;

// de la planta del suelo (X a lo ancho, Z hacia el fondo) a la pantalla
const e_suelo = (X, Z) => [160 + X * 120 / Z, e_HOR + 64 / Z];

function e_petrie(R, t, o) {
  const B = R.buf, hor = e_HOR;
  e_cielo(R, t, hor, { sol: [226, 26, 8], nubes: [[hor - 14, 16, 0.6, 3], [hor - 30, 26, 1.3, 2], [hor - 48, 38, 2.4, 2]] });
  bandada(R, t, { tipo: 'golondrina', n: 4, y: 46, cada: 10, v: 40, semilla: 5 });
  const L = e_capa(R, 'hw-petrie', () => e_petrieFijo(R));
  e_pegar(R, L, 30, 179);
  // la vela de una falúa que pasa por el canal, tras las palmeras
  { const u = (t * 3) % 220, x = Math.round(200 + u), y = 96; if (x < 330) { R.linea(x, y - 16, x, y - 1, e_C.madS); for (let j = 0; j < 14; j++) { const w = Math.round(j * 0.7); R.linea(x + 1, y - 16 + j, x + 1 + w, y - 16 + j, j % 4 === 0 ? e_C.telaS : e_C.n0); } R.rect(x - 6, y, x + 8, y, e_C.madS); } }
  e_palmera(R, 214, 100, 30, t, 21); e_palmera(R, 236, 99, 36, t, 22); e_palmera(R, 300, 101, 40, t, 23); e_palmera(R, 318, 100, 28, t, 24);
  // la huella del edificio que asoma bajo las esquirlas: zanjas de muros que van de nuestros pies hacia el fondo (de cerca a
  // lejos), anchas cerca y finas lejos, con su sombra arriba y el canto de luz abajo
  const hu = Math.max(0, Math.min(1, o.huella ?? 0));
  if (hu > 0) { const segs = e_huellaSegs(), n = segs.length; segs.forEach(([a, b], i) => { const q = Math.max(0, Math.min(1, (hu * (n + 2) - i) / 3)); if (q <= 0) return;
    const pasos = 160; for (let k = 0; k <= pasos * q; k++) { const u = k / pasos, X = a[0] + (b[0] - a[0]) * u, Z = a[1] + (b[1] - a[1]) * u, [x, y] = e_suelo(X, Z), xi = Math.round(x), yi = Math.round(y); if (yi < 100 || xi < 0 || xi > 319) continue;
      const g = Math.max(1, Math.round(2.6 / Z)); R.pset(xi, yi - 1, e_C.pSS); for (let j = 0; j < g; j++) R.pset(xi, yi + j, j === 0 && g > 1 ? e_C.e3 : e_C.pO); R.pset(xi, yi + g, e_C.pL); if (g > 2) R.pset(xi, yi + g + 1, e_C.esqL); } }); }
  // los destellos del sol en las esquirlas
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 490) * 319), y = 94 + Math.round(h(k, 2, 490) ** 0.7 * 84); if (Math.sin(t * (2 + h(k, 3, 490) * 3) + k * 2.3) > 0.93) { R.pset(x, y, e_C.n0); if (y > 130) { R.pset(x - 1, y, e_C.esqL); R.pset(x + 1, y, e_C.esqL); R.pset(x, y - 1, e_C.esqL); } } }
  // los trabajadores: los que llevan cestas de la excavación al montón y vuelven, y los que cavan
  for (let k = 0; k < 5; k++) { const ida = ((t * 0.07 + k * 0.2) % 1), va = ida < 0.5, u = va ? ida * 2 : 2 - ida * 2, x = lerp(70 + k * 6, 196 + k * 4, u), y = lerp(126 + (k % 3) * 4, 104 + (k % 2) * 2, u);
    e_figura(R, x, y, t, { alto: Math.round(lerp(10, 8, u)), dir: va ? 1 : -1, cesta: true, llena: va, turbante: true, sem: k, tela: k % 2 ? e_C.tela : hex('#d8d0c0') }); }
  for (const [x, y, s] of [[96, 122, 0], [118, 128, 1], [146, 118, 2]]) { e_figura(R, x, y, t, { alto: 10, dir: s % 2 ? -1 : 1, anda: false, azada: true, turbante: true, sem: s * 1.7 }); if (Math.sin(t * 5 + s * 1.7) < -0.85) for (let i = 0; i < 4; i++) R.pset(x + (s % 2 ? -4 : 4) + i - 2, y - 1 - (i & 1), e_C.esqS); }
  // el burro con sus alforjas: mueve la cola y las orejas
  { const x = 252, y = 128, g = hex('#8a8078'), gs = hex('#5e5650'), cola = Math.round(Math.sin(t * 3) * 2), or = Math.floor(t * 0.7) % 3 === 0 ? 1 : 0;
    R.rect(x, y - 9, x + 14, y - 4, g); R.rect(x, y - 4, x + 14, y - 4, gs); for (const lx of [x + 1, x + 4, x + 11, x + 13]) R.rect(lx, y - 3, lx, y, gs);
    R.rect(x + 14, y - 12, x + 17, y - 6, g); R.rect(x + 17, y - 8, x + 19, y - 6, g); R.pset(x + 19, y - 7, e_C.k); R.pset(x + 16, y - 10, e_C.k); R.linea(x + 15, y - 13, x + 15 - or, y - 16, gs); R.linea(x + 16, y - 13, x + 17 + or, y - 16, gs);
    R.linea(x, y - 8, x - 2 + cola, y - 3, gs); R.rect(x + 3, y - 11, x + 11, y - 9, e_C.rojoS); R.rect(x + 3, y - 8, x + 5, y - 3, e_C.mad); R.rect(x + 9, y - 8, x + 11, y - 3, e_C.mad); }
  // la puerta de la tienda, que mueve el aire
  { const ab = Math.round(1 + Math.sin(t * 1.7) * 1.2); R.poligono([[215, 116], [222, 104], [222 + ab, 116]], e_C.intS); R.linea(222, 104, 222 + ab + 2, 116, e_C.lonaS); }
  return { suelo: 160, piramide: [24, 150, 46, 98], tiendas: [[196, 236, 100, 117], [258, 286, 92, 116]], huella: e_huellaSegs().map(([a, b]) => [...e_suelo(...a).map(Math.round), ...e_suelo(...b).map(Math.round)]), libre: [40, 250], sol: [226, 26] };
}

// las líneas de los muros del laberinto en el suelo (en metros de planta: X a lo ancho, Z hacia el fondo), de cerca a lejos
function e_huellaSegs() {
  const s = [[[-3, 1], [0.3, 1]], [[-1.5, 1], [-1.5, 6.4]], [[-0.6, 1], [-0.6, 6.4]], [[0.3, 1], [0.3, 6.4]], [[-3, 1], [-3, 6.4]], [[-3, 1.6], [0.3, 1.6]], [[-3, 2.4], [-0.6, 2.4]],
    [[-1.5, 3.6], [0.3, 3.6]], [[-2.3, 1.6], [-2.3, 3.6]], [[-3, 4.8], [-0.6, 4.8]], [[-3, 6.4], [0.3, 6.4]]];
  return s;
}

// lo fijo de 1888: la sierra, el verde del canal, la pirámide derruida, el campo de esquirlas con sus montones, el
// campamento (tiendas, cajas, cestas, criba, tinaja) y las piedras del primer plano
function e_petrieFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, B = R.buf, hor = e_HOR;
  for (let x = 0; x < 320; x++) { const top = Math.round(80 + Math.sin(x * 0.04) * 3 + Math.sin(x * 0.13) * 1.5 + h(x >> 3, 1, 491) * 2); for (let y = top; y < 100; y++) B[y * 320 + x] = y === top ? e_C.desL : e_umb(x, y) < (y - top) / 10 ? e_C.des : e_C.desL; }
  // el verde del Fayum y el canal, a la derecha
  for (let y = 92; y < 100; y++) for (let x = 190; x < 320; x++) { const borde = 190 + (99 - y) * 3; if (x < borde) continue; B[y * 320 + x] = y === 97 || y === 96 ? (x + Math.floor(y)) % 5 ? e_C.ag : e_C.agL : h(x >> 1, y, 492) < 0.3 ? e_C.campoS : y < 95 ? e_C.campo : e_C.campoL; }
  // la pirámide de adobe medio derruida: cima roma, perfil comido, hiladas, surcos, derrubios y la boca de entrada
  const ax = 86, top = 54, base = 100;
  for (let x = 14; x < 170; x++) { const d = Math.abs(x - ax), perf = top + Math.max(0, d - 14) * 0.88 + (h(x >> 2, 2, 493) - 0.5) * 5 + (h(x >> 1, 4, 493) - 0.5) * 2 + (d < 14 ? h(x >> 1, 3, 493) * 3 : 0) + Math.max(0, 9 - Math.abs(x - 62) * 0.9) + Math.max(0, 6 - Math.abs(x - 108) * 0.7);
    for (let y = Math.round(perf); y < base; y++) { if (y < 0) continue; const lit = x > ax + (y - top) * 0.15, fila = (y - top) / 3 | 0, bxx = (x + (fila & 1) * 3) % 6, jun = (y - top) % 3 === 2 || bxx === 0;
      let c = lit ? e_C.aL : e_C.aS; if (jun) c = lit ? e_C.a : e_C.aSS; if (h(x >> 1, y >> 1, 494) < 0.18) c = lit ? e_C.a : e_C.aSS;
      if (h(x >> 2, 5, 495) < 0.22 && h(x, y >> 3, 496) < 0.6) c = lit ? e_C.aS : e_C.aJ;   // los surcos que dejó la lluvia
      const der = base - y < 10 + h(x >> 2, 6, 497) * 6; if (der) c = e_umb(x, y) < 0.5 ? (lit ? e_C.aL : e_C.a) : (lit ? hex('#c8a682') : e_C.aS);   // los derrubios del pie
      if (y === Math.round(perf)) c = lit ? hex('#c8a07c') : e_C.a;
      B[y * 320 + x] = c; } }
  rect(98, 82, 102, 86, e_C.aSS); rect(99, 83, 101, 86, e_C.intSS);
  // el campo de esquirlas: blanco, con piedrecillas más grandes hacia nosotros, y montones
  for (let y = 96; y < 180; y++) { const g = (y - 92) / 88;
    for (let x = 0; x < 320; x++) { if (y < 101 && B[y * 320 + x]) continue; const s = Math.max(1, Math.round(g * 3)), n = h(x / s | 0, y / s | 0, 498);
      let c = n < 0.25 ? e_C.esqS : n < 0.32 ? e_C.esqSS : n > 0.9 ? e_C.esqL : e_C.esq; if (g > 0.4 && n > 0.86 && h(x / s | 0, (y + 1) / s | 0, 498) < 0.86) c = e_C.esqSS;
      if (h(x >> 4, y >> 3, 499) < 0.2 && e_umb(x, y) < 0.3) c = e_C.e1;
      B[y * 320 + x] = c; } }
  for (const [mx, my, mw, mh] of [[176, 104, 22, 7], [150, 100, 14, 4], [290, 118, 30, 9], [30, 112, 26, 8]]) for (let y = my - mh; y <= my; y++) for (let x = mx - mw; x <= mx + mw; x++) { const q = ((x - mx) / mw) ** 2 + ((y - my) / mh) ** 2 * 1.2; if (q > 1 || y > my) continue; const lit = x > mx - (my - y) * 0.6, n = h(x, y, 500); B[y * 320 + x] = n < 0.2 ? e_C.esqSS : lit ? (n > 0.8 ? e_C.esqL : e_C.esq) : e_C.esqS; }
  // el campamento: la tienda de lona a dos aguas, la tienda redonda, sus vientos y estacas, cajas, cestas, la criba y la tinaja
  { const x0 = 196, x1 = 236, yb = 116, cum = 103;
    poligono([[x0, yb], [x0 + 8, cum], [x1 + 2, cum], [x1, yb]], e_C.lonaS); poligono([[x0 + 8, cum], [x0 + 20, yb], [x0, yb]], e_C.lona); linea(x0 + 8, cum, x1 + 2, cum, e_C.lonaSS);
    for (let x = x0 + 12; x < x1; x += 6) linea(x, cum + 1, x - 2, yb, e_C.lonaSS); linea(x0 + 8, cum, x0, yb, e_C.lonaSS); linea(x0, yb, x1, yb, e_C.lonaSS);
    linea(x0 + 8, cum, x0 - 6, yb + 2, e_C.madS); linea(x1 + 2, cum, x1 + 10, yb + 2, e_C.madS); pset(x0 - 6, yb + 2, e_C.mad); pset(x1 + 10, yb + 2, e_C.mad); rect(x0 + 8, cum - 3, x0 + 8, cum, e_C.madS); }
  { const cx = 272, yb = 116; for (let y = 92; y <= yb; y++) { const w = Math.round((y - 92) * 0.62); for (let x = cx - w; x <= cx + w; x++) B[y * 320 + x] = x > cx + w * 0.3 ? e_C.lonaS : (x - cx + 40) % 7 === 0 ? e_C.lonaS : e_C.lona; } rect(cx - 2, 108, cx + 2, yb, e_C.intS); linea(cx, 90, cx, 92, e_C.madS); pset(cx, 89, e_C.rojo); }
  for (const [x, y, w, hh] of [[240, 116, 8, 6], [250, 117, 6, 4], [186, 118, 7, 5]]) { rect(x, y - hh, x + w, y, e_C.mad); rect(x, y - hh, x + w, y - hh, e_C.madL); rect(x + w, y - hh, x + w, y, e_C.madS); linea(x, y - hh, x + w, y, e_C.madS); }
  for (const [x, y] of [[180, 120], [176, 117], [184, 116], [244, 121]]) { rect(x - 3, y - 3, x + 3, y, e_C.mad); rect(x - 3, y - 3, x + 3, y - 3, e_C.madL); for (let i = -3; i <= 3; i += 2) pset(x + i, y - 1, e_C.madS); }
  linea(226, 120, 230, 112, e_C.madS); linea(234, 120, 230, 112, e_C.madS); rect(226, 112, 234, 113, e_C.mad); for (let i = 227; i < 234; i += 2) pset(i, 113, e_C.madS);   // la criba
  disco(190, 122, 3, e_C.rojoS); rect(188, 118, 192, 119, e_C.rojoS); pset(189, 120, hex('#c46a48'));   // la tinaja
  // las zanjas abiertas de la excavación, donde cavan
  for (const [x0, x1, y] of [[86, 128, 124], [106, 152, 130], [134, 160, 120]]) { rect(x0, y, x1, y + 2, e_C.e3); rect(x0, y + 3, x1, y + 3, e_C.esqSS); rect(x0, y - 1, x1, y - 1, e_C.esqL); }
  // las piedras del primer plano
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 501) * 319), y = 150 + Math.round(h(k, 2, 501) * 28), r = 1 + Math.round(h(k, 3, 501) * 2); rect(x - r, y - r, x + r, y, e_C.esqS); rect(x - r, y - r, x + r - 1, y - r, e_C.esqL); rect(x - r + 1, y + 1, x + r + 1, y + 1, e_C.esqSS); }
  for (const [x, y, w] of [[70, 168, 7], [262, 160, 9], [300, 174, 6], [214, 176, 5], [150, 142, 5], [24, 140, 6]]) { const hh = Math.round(w * 0.6);   // trozos de sillar
    poligono([[x - w, y], [x - w + 2, y - hh], [x + w - 1, y - hh - 1], [x + w, y - 2], [x + w - 1, y]], e_C.k); poligono([[x - w + 1, y - 1], [x - w + 3, y - hh + 1], [x + w - 2, y - hh], [x + w - 1, y - 2], [x + w - 2, y - 1]], e_C.p);
    linea(x - w + 3, y - hh + 1, x + w - 2, y - hh, e_C.pL); linea(x + w - 2, y - hh + 1, x + w - 2, y - 2, e_C.pS); for (let i = -w; i <= w + 2; i++) pset(x + i, y + 1, e_C.esqSS); }
  for (const [x, y] of [[36, 150], [128, 154]]) { rect(x, y - 7, x + 1, y, e_C.madS); pset(x, y - 7, e_C.madL); } linea(37, 144, 129, 148, e_C.madL); rect(37, 143, 41, 145, e_C.rojo);   // las estacas y el cordel
  for (let k = 0; k < 9; k++) { const x = 176 - k * 5 + (k & 1) * 2, y = 178 - k * 4; rect(x, y, x + 1, y, e_C.esqSS); }   // huellas de pies
  // contornos oscuros de las tiendas
  linea(196, 116, 204, 103, e_C.lonaSS); linea(204, 103, 238, 103, e_C.lonaSS); linea(238, 103, 236, 116, e_C.lonaSS);
}

// lo de delante en 1888: una cesta llena de esquirlas y una azada apoyada, en el primer plano izquierdo
function e_petrieDelante(R, t, o) {
  const { rect, pset, linea } = R, x = 18, y = 178;
  for (let j = 0; j < 12; j++) { const w = 12 - Math.round(Math.abs(j - 6) * 0.3); for (let i = -w; i <= w; i++) pset(x + i, y - j, (i + j) % 3 === 0 ? e_C.madS : (j % 3 === 0 ? e_C.madL : e_C.mad)); }
  for (let i = -10; i <= 10; i++) for (let j = 0; j < 4 - Math.abs(i) / 4; j++) pset(x + i, y - 12 - j, h(i, j, 502) < 0.3 ? e_C.esqS : e_C.esq);
  linea(x - 12, y - 8, x - 12, y - 3, e_C.madS); linea(x + 12, y - 8, x + 12, y - 3, e_C.madS);
  linea(42, 179, 54, 150, e_C.madS); linea(43, 179, 55, 150, e_C.mad); rect(52, 146, 60, 149, e_C.pSS); rect(52, 146, 60, 146, e_C.pL);
  return { suelo: 160 };
}

const e_BORDE = 46;   // el borde de arriba de la zanja (por debajo de la esquina de Atom)

function e_zanja(R, t, o) {
  const moderno = (o.año ?? 1888) >= 2000, hor = 30, bo = e_BORDE;
  e_cielo(R, t, hor, { sol: null, nubes: [[18, 18, 0.8, 2], [24, 26, 1.6, 2]] });
  const L = e_capa(R, moderno ? 'hw-zanja08' : 'hw-zanja', () => e_zanjaFijo(R, moderno));
  e_pegar(R, L, 16, 179);
  // arriba, en el borde: el trabajador que va y vacía su cesta (1888) o el técnico con chaleco (2008)
  { const u = (t * 0.12) % 1, x = lerp(20, 250, u < 0.5 ? u * 2 : 2 - u * 2), dir = u < 0.5 ? 1 : -1;
    if (moderno) e_figura(R, x, bo - 1, t, { alto: 10, dir, tela: e_C.chaleco, telaS: hex('#c0a010'), sem: 1, pelo: hex('#6a4a2a') });
    else e_figura(R, x, bo - 1, t, { alto: 10, dir, cesta: true, llena: dir > 0, turbante: true, sem: 1 }); }
  // las esquirlas que se escurren por la pared, con su polvillo al llegar abajo
  for (let k = 0; k < 10; k++) { const x0 = 60 + Math.round(h(k, 1, 503) * 170), u = ((t * (0.4 + h(k, 2, 503) * 0.5) + h(k, 3, 503)) % 1), y = Math.round(bo + 2 + u * u * 84);
    if (u < 0.92) { R.pset(x0 + Math.round(u * 3), y, e_C.esq); if (k % 2) R.pset(x0 + Math.round(u * 3) + 1, y - 2, e_C.esqS); } else for (let i = -2; i <= 2; i++) R.pset(x0 + 3 + i, 131 - (i & 1), e_mez(R.pget(x0 + 3 + i, 131), e_C.e1, 0.6)); }
  if (moderno) { // la pantalla del aparato, que barre, y el piloto que parpadea
    const [px, py] = [232, 128]; R.recorte([px + 1, py + 1, px + 16, py + 10]);
    for (let y = py + 1; y <= py + 10; y++) for (let x = px + 1; x <= px + 16; x++) { const fase = (x - px + Math.floor(t * 8)) % 17, capa = Math.sin((x - px) * 0.5 + y * 1.3 + t) > 0.3; R.pset(x, y, fase === 0 ? e_C.n0 : capa ? e_C.pantalla : hex('#1a4a3a')); }
    R.recorte(null); R.pset(px + 18, py + 2, Math.floor(t * 2) % 2 ? hex('#ff3a3a') : hex('#5a1a1a'));
  } else {
    // la cesta que suben con la cuerda por la polea del trípode, y el farol que se mece colgado de la escalera
    const u = (Math.sin(t * 0.7) + 1) / 2, by = Math.round(lerp(150, 62, u)), bx = 136;
    R.linea(bx, 30, bx, by - 6, e_C.madS); R.linea(bx, by - 6, bx - 5, by - 2, e_C.madS); R.linea(bx, by - 6, bx + 5, by - 2, e_C.madS);
    for (let j = 0; j < 7; j++) { const w = 6 - Math.round(Math.abs(j - 3) * 0.3); for (let i = -w; i <= w; i++) R.pset(bx + i, by - 2 + j, j === 6 || Math.abs(i) === w ? e_C.k : (i + j) % 3 === 0 ? e_C.madS : j % 3 === 0 ? e_C.madL : e_C.mad); }
    for (let i = -4; i <= 4; i++) R.pset(bx + i, by - 3, h(i, 1, 516) < 0.4 ? e_C.esqS : e_C.esq);
    if (u < 0.08) for (let i = 0; i < 5; i++) R.pset(bx - 8 + i * 4, 150 - (i & 1), e_C.e1);
    const sw = Math.sin(t * 2.2) * 2.5, lx = Math.round(256 + sw), ly = 125; R.linea(254, 116, lx, ly - 4, e_C.k);
    R.rect(lx - 3, ly - 3, lx + 3, ly + 3, e_C.k); R.rect(lx - 2, ly - 2, lx + 2, ly + 2, e_C.llama); R.pset(lx, ly, e_C.llamaL); R.rect(lx - 3, ly - 4, lx + 3, ly - 4, e_C.bronceS);
    for (let y = ly - 14; y <= ly + 12; y++) for (let x = lx - 14; x <= lx + 14; x++) { const d = Math.hypot(x - lx, y - ly) / 14; if (d < 1 && d > 0.35 && e_umb(x, y) < (1 - d) * 0.6) R.pset(x, y, e_mez(R.pget(x, y), e_C.luz, 0.2)); }
  }
  return { suelo: 166, losa: [0, 319, 132, 180], borde: bo, escalera: moderno ? [246, 262] : [244, 262], aparato: moderno ? [222, 164] : null, polea: moderno ? null : [136, 30], libre: [40, 210] };
}

// lo de delante en la zanja: las cestas (1888) o la caja de plástico (2008) del primer plano
function e_zanjaDelante(R, t, o) {
  const moderno = (o.año ?? 1888) >= 2000;
  if (!moderno) for (const [x, y] of [[30, 172], [48, 176], [292, 174]]) { for (let j = 0; j < 9; j++) { const w = 8 - Math.round(Math.abs(j - 4) * 0.3); for (let i = -w; i <= w; i++) R.pset(x + i, y - j, Math.abs(i) === w || j === 0 ? e_C.k : (i + j) % 3 === 0 ? e_C.madS : j % 3 === 0 ? e_C.madL : e_C.mad); } for (let i = -6; i <= 6; i++) R.pset(x + i, y - 9, h(i, x, 517) < 0.4 ? e_C.esqS : e_C.esq); }
  else { R.rect(26, 164, 50, 176, e_C.k); R.rect(27, 165, 49, 175, e_C.plastico); R.rect(27, 165, 49, 165, hex('#6a9ae0')); R.rect(29, 168, 47, 168, hex('#2a4a90')); R.rect(33, 162, 43, 164, e_C.k); R.rect(34, 162, 42, 163, hex('#4a7ad0')); }
  return { suelo: 166 };
}

// lo fijo de la zanja: el campo de arriba con la pirámide lejos, los estratos, las paredes laterales en perspectiva, la
// losa del fondo y el atrezo de 1888 (trípode con polea, escalera de madera, pico, mira) o de 2008 (cables, electrodos,
// aparato)
function e_zanjaFijo(R, moderno) {
  const { rect, pset, linea, poligono } = R, B = R.buf, bo = e_BORDE;
  // la superficie lejana: el campo de esquirlas, la pirámide pequeña y una tienda (tranquilo en la esquina de Atom)
  for (let y = 24; y < bo; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 504); B[y * 320 + x] = e_tranquila(x, y) ? (n < 0.15 ? e_C.e1 : e_C.esq) : n < 0.25 ? e_C.esqS : n > 0.9 ? e_C.esqL : y < 28 ? e_C.e1 : e_C.esq; }
  for (let y = 20; y < 34; y++) { const w = (y - 20) * 1.6; for (let x = Math.round(40 - w); x <= 40 + w; x++) B[y * 320 + x] = x > 40 + (y - 20) * 0.2 ? (y % 2 ? e_C.aL : e_C.a) : (y % 2 ? e_C.aS : e_C.aSS); }
  poligono([[204, 36], [210, 28], [222, 28], [220, 36]], e_C.lonaS); poligono([[210, 28], [216, 36], [204, 36]], e_C.lona); linea(210, 28, 204, 36, e_C.lonaSS); linea(210, 28, 222, 28, e_C.lonaSS);
  // los estratos de la pared del fondo: esquirlas, arena, limo oscuro, cascotes de caliza y adobe, con marcas de pico
  const capas = [[bo + 6, e_C.esq], [bo + 14, e_C.e6], [bo + 25, e_C.e2], [bo + 35, e_C.e3], [bo + 41, e_C.e4], [bo + 61, e_C.e1], [bo + 74, e_C.e5], [132, e_C.e4]];
  for (let y = bo; y < 132; y++) for (let x = 0; x < 320; x++) { const ond = Math.sin(x * 0.05 + y * 0.02) * 2 + h(x >> 3, y >> 4, 505) * 2; let k = 0; while (k < capas.length - 1 && y + ond >= capas[k][0]) k++;
    let c = capas[k][1]; const n = h(x, y, 506); if (n < 0.12) c = e_mez(c, e_C.k, 0.15); else if (n > 0.92) c = e_mez(c, e_C.n0, 0.25);
    if (k === 0 && n < 0.3) c = e_C.esqS; if (k === 4 && h(x >> 2, y >> 2, 507) < 0.35) c = h(x, y >> 1, 508) < 0.5 ? e_C.pS : e_C.p;   // cascotes de caliza
    if (k === 6 && h(x >> 2, y >> 1, 509) < 0.25) c = e_C.aS;   // trozos de adobe
    if ((x * 3 + y * 7) % 23 === 0 && h(x, y, 510) < 0.5) c = e_mez(c, e_C.k, 0.25);   // marcas del pico
    if (y === bo) c = e_C.esqL; if (y === bo + 1) c = e_C.esqSS;
    B[y * 320 + x] = c; }
  // piedras grandes y trozos de sillar metidos en los estratos, con su luz y su sombra
  for (let k = 0; k < 16; k++) { const x = 40 + Math.round(h(k, 1, 515) * 240), y = bo + 10 + Math.round(h(k, 2, 515) * 70), w = 3 + Math.round(h(k, 3, 515) * 6), hh = 2 + Math.round(h(k, 4, 515) * 3);
    rect(x - w, y - hh, x + w, y + hh, k % 4 ? e_C.pS : e_C.aS); rect(x - w, y - hh, x + w, y - hh, k % 4 ? e_C.pL : e_C.aL); rect(x + w, y - hh, x + w, y + hh, k % 4 ? e_C.pSS : e_C.aSS); rect(x - w + 1, y + hh + 1, x + w + 1, y + hh + 1, e_C.e5); }
  // las paredes laterales en perspectiva, más oscuras
  const ancho = (y) => Math.round(Math.max(0, 34 - (y - bo) * 0.26));
  for (let y = bo; y < 180; y++) { const wl = ancho(y); for (let x = 0; x < wl; x++) B[y * 320 + x] = e_mez(B[y * 320 + x] || e_C.e3, e_C.intS, 0.35); for (let x = 319 - wl; x < 320; x++) B[y * 320 + x] = e_mez(B[y * 320 + x] || e_C.e3, e_C.k, 0.2); if (wl > 0) { pset(wl, y, e_C.e5); pset(319 - wl, y, e_C.esqL); } }
  // la losa del fondo: grandes bloques de caliza con juntas, marcas de cincel, un resto de mortero y esquirlas encima
  for (let y = 132; y < 180; y++) { const z = 60 / (y - 108), fila = Math.floor(z * 2.5), wl = ancho(y);
    for (let x = wl; x <= 319 - wl; x++) { const u = (x - 160) * z / 70 + (fila & 1) * 0.5, m = ((u % 1) + 1) % 1, jun = m < 0.02 || Math.abs(z * 2.5 - fila - 0.5) > 0.47;
      let c = jun ? e_C.pSS : h(Math.floor(u), fila, 511) < 0.3 ? e_C.pS : e_C.p; if (!jun && (x + y * 3) % 7 === 0 && h(x, y, 512) < 0.5) c = e_C.pS; if (!jun && h(x, y, 513) < 0.04) c = e_C.esqL; if (y === 132) c = e_C.pO; if (y === 133) c = e_C.pL;
      B[y * 320 + x] = c; } }
  rect(70, 150, 82, 152, e_C.e1); rect(72, 149, 79, 149, e_C.e6);
  for (let k = 0; k < 18; k++) { const x = 40 + Math.round(h(k, 1, 514) * 240), y = 140 + Math.round(h(k, 2, 514) * 36); pset(x, y, e_C.esq); pset(x + 1, y, e_C.esqSS); }
  if (!moderno) {
    // el trípode de madera con la polea en el borde, la escalera de madera apoyada, el pico y la mira de agrimensor a franjas
    linea(118, bo, 136, 28, e_C.madS); linea(154, bo, 136, 28, e_C.madS); linea(119, bo, 137, 28, e_C.mad); rect(133, 26, 139, 30, e_C.k); R.disco(136, 30, 2, e_C.bronce); pset(136, 30, e_C.k);
    for (const lx of [244, 260]) { linea(lx, bo - 4, lx + 2, 158, e_C.madS); linea(lx + 1, bo - 4, lx + 3, 158, e_C.mad); } for (let y = bo + 4; y < 156; y += 9) { const d = Math.round((y - bo) / 56); rect(245 + d, y, 260 + d, y + 1, e_C.mad); rect(245 + d, y, 260 + d, y, e_C.madL); }
    linea(196, 166, 214, 140, e_C.k); linea(197, 166, 215, 140, e_C.mad); linea(208, 138, 222, 142, e_C.k); linea(208, 139, 222, 143, e_C.pSS);
    for (let y = 72; y < 160; y++) { const c = Math.floor((y - 72) / 8) % 2 ? e_C.k : e_C.n0; rect(280, y, 282, y, c); pset(283, y, e_C.pSS); } rect(278, 160, 285, 161, e_C.madS);
  } else {
    // la escalera de aluminio, los cables naranja y negro que serpentean, los electrodos, el aparato en su trípode con su
    // pantalla, las banderitas y la cinta métrica
    for (const lx of [246, 262]) { linea(lx, bo - 4, lx + 2, 158, hex('#7a8494')); linea(lx + 1, bo - 4, lx + 3, 158, hex('#c8d0dc')); } for (let y = bo + 4; y < 156; y += 9) rect(247, y, 262, y, hex('#aab4c0'));
    for (const [c, k] of [[e_C.naranja, 0], [e_C.k, 1]]) { let px = 52, py = 158 + k * 4; for (let x = 52; x < 228; x += 2) { const y = Math.round(158 + k * 4 + Math.sin(x * 0.05 + k * 2) * 3); linea(px, py, x, y, c); px = x; py = y; } linea(px, py, 228, 150, c); }
    for (let x = 62; x < 220; x += 34) { rect(x, 148, x + 1, 160, hex('#9aa4b0')); rect(x - 1, 147, x + 2, 148, e_C.naranja); }
    linea(226, 164, 232, 140, e_C.k); linea(244, 164, 238, 140, e_C.k); linea(235, 164, 235, 140, e_C.k);
    rect(227, 123, 253, 142, e_C.k); rect(228, 124, 252, 141, hex('#e8c020')); rect(228, 124, 252, 124, hex('#f8e070')); rect(231, 127, 248, 139, e_C.k); rect(232, 128, 248, 138, hex('#1a4a3a')); rect(250, 129, 251, 131, e_C.k);
    for (const fx of [90, 150, 196]) { linea(fx, 138, fx, 150, e_C.k); rect(fx + 1, 138, fx + 5, 141, e_C.naranja); }
    rect(60, 176, 200, 176, e_C.chaleco); for (let x = 60; x < 200; x += 10) pset(x, 175, e_C.k);
  }
}

// los colores del decorado F (el estudio, el espacio, el corte del suelo, el campo, la redacción y el despacho)
const f_P = Object.fromEntries(Object.entries({
  k: '#1c1222', blanco: '#f6f8fa',
  pared: '#e4cc9c', paredS: '#ccb07e', paredL: '#eedab0', motivo: '#d6b886', moldura: '#f4ead4', molduraS: '#c8b494',
  friso: '#7a4a2c', frisoS: '#55301a', frisoL: '#9a6440', frisoV: '#683c22',
  tabla: '#a8703e', tablaS: '#7e4e28', tablaL: '#c08650', tablaJ: '#5a3418', sol: '#e0aa6a',
  kilim: '#a83a2a', kilimS: '#6e2218', kilimL: '#e0a050', kilimA: '#2e4a6a', kilimC: '#f0dcb0',
  marco: '#f2ece0', marcoS: '#b8ae9c',
  cielo0: '#5a98d8', cielo1: '#78b0e4', cielo2: '#a0cbee', nubeS: '#b8c8de', nube: '#e2ecf6', nubeL: '#ffffff',
  ladrillo: '#a85a3e', ladrilloS: '#7e3e2a', ladrilloL: '#c87a58', muro: '#e8d8b8', muroS: '#c4b08c',
  hoja: '#4a8a3a', hojaS: '#2e6224', hojaL: '#7ab85a', tronco: '#6a4a2a', troncoS: '#4a3018',
  cortina: '#4a7a8a', cortinaS: '#2e5664', cortinaL: '#6aa0ae',
  libro: ['#c8382e', '#2e5aa8', '#4a8a4a', '#d8a838', '#7a4a8a', '#3a7a8a', '#c86a2a', '#e4d8bc', '#5a3a2a'],
  ropa: ['#c8382e', '#3a6ab8', '#e8dcc0', '#4a8a4a', '#d8a838', '#7a4a8a'],
  corcho: '#c8945a', corchoS: '#a0703a', corchoL: '#dcae74', papel: '#f4eedc', papelS: '#d4c8a8', tinta: '#3a3a5a',
  gris: '#c8ced6', grisS: '#8e98a4', grisD: '#5a6470', grisK: '#3a424e',
  laton: '#d8a838', latonS: '#9a7020', latonL: '#f4d878', verdeB: '#2e7a4a', verdeBS: '#1e5232', verdeBL: '#5aae6a',
  amarillo: '#f0c838', rojo: '#d83a3a', rojoS: '#8a2020', luz: '#fff6d0', cafe: '#6a3a1e', cafeL: '#a8784a', cafeS: '#4a2410',
  yeso: '#e8e0cc', yesoS: '#c8bca0', caliza: '#e0c890', calizaS: '#b8965e', calizaO: '#8a6a3e', calizaL: '#f0dcac',
  armF: '#3e2a1c', armS: '#2a1a10', armL: '#5a3e28',
  // el espacio y la Tierra
  esp0: '#05071a', esp1: '#0a1030', esp2: '#121a44', estS: '#7a84b8',
  marT: '#1e4a8a', marTS: '#15386c', marTL: '#3a6aa8', des: '#d8b070', desS: '#b88c50', desL: '#ecc890', desD: '#9a7040',
  nilo: '#3a8a4a', niloL: '#6ab85a', niloS: '#24603a', atm: '#5aa8f0', atmL: '#b0dcff',
  marN: '#081428', desN: '#2a2636', desNL: '#36324a', luzC: '#ffd070', luzCL: '#fff2b0',
  oro: '#e8b838', oroS: '#a87a18', oroL: '#fce080', panel: '#2a4a9a', panelL: '#7aa8e8', panelS: '#16244e', onda: '#7af0ff', ondaS: '#2aa8c8', eco: '#ffd060',
  // el corte del suelo
  are: '#e8cc8a', areS: '#c8a060', areL: '#f4dca4', cal0: '#d8bc84', cal1: '#c4a470', cal2: '#a88a5a', cal3: '#8a6e48', cal4: '#6a5438', fosil: '#f0e0b8',
  agua: '#2e6ab0', aguaL: '#6ab0e8', aguaS: '#1e4a80', aguaB: '#bce4ff',
  // el campo
  hierba: '#6aa04a', hierbaS: '#4a7a34', hierbaL: '#94c46a', monte: '#7a96b8', monteS: '#5e7a9e', bosque: '#3e6a4a', bosqueS: '#2a4e36',
  camion: '#c84a3a', camionS: '#8a2e22', camionL: '#e87a5a', valla: '#c8b08a', vallaS: '#8a7458', bandera: '#f05a28',
  // la redacción y el despacho
  ladR: '#b46a4e', ladRS: '#8a4a34', ladRL: '#cc8a6a', junta: '#d8c8b0', viga: '#4a3424', vigaL: '#6a4a32', vigaS: '#2e1e14',
  pizarra: '#5a6478', pizarraS: '#3e4658', pizarraL: '#7a849a', piedra: '#d8ccb4', piedraS: '#aca088', cristal: '#2a3a52',
  pant: '#16243a', pantL: '#5ad0f0', pantV: '#7ae08a', mesaB: '#e8e4dc', mesaBS: '#b8b2a4', metal: '#9aa4b4', metalS: '#6c7688', metalL: '#c8d0dc',
  granito: '#a8706a', azul0: '#2a5a8a', azul1: '#3a7ab0', azulejo: '#2a7a8a', azulejoS: '#1e5a66', azulejoL: '#6ab4bc', azulejoB: '#e8dcc0',
  nogal: '#5a3420', nogalS: '#3a2010', nogalL: '#7a4a2c', nogalV: '#4a2a18', cairo: '#d8b888', cairoS: '#b8966a', cairoL: '#ecd2a4', bruma: '#e8d8c0', te: '#b84a1a', teL: '#e88a3a',
}).map(([k, v]) => [k, Array.isArray(v) ? v.map((c) => hex(c)) : hex(v)]));

// la capa fija de cada encuadre: se pinta una sola vez en un búfer (R.nuevo) y en cada fotograma se copia entera
const f_CAPAS = new WeakMap();

// pinta (la primera vez) o copia el búfer de la clave dada
function f_capa(R, clave, dibuja) {
  let m = f_CAPAS.get(R); if (!m) f_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) que cambia de forma despacio con t; la recorta R.recorte
function f_nube(R, x, y, w, t = 0, k = 0, P3 = null) {
  const [cS, c, cL] = P3 ?? [f_P.nubeS, f_P.nube, f_P.nubeL];
  const B = [[0, 0, 0.3], [-0.32, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.14, 0.25], [0.14, -0.1, 0.2]];
  const m = (i) => 1 + 0.16 * Math.sin(t * 0.4 + i * 1.7 + k);
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w, y + dy * w + 1, r * w * m(i), cS));
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w, y + dy * w, r * w * m(i), c));
  B.forEach(([dx, dy, r], i) => R.disco(x + dx * w - 1, y + dy * w - 1, r * w * 0.6 * m(i), cL));
}

// un pájaro de dos píxeles de ala que aletea (o planea si plana)
function f_pajaro(R, x, y, t, k = 0, c = f_P.k, plana = false) {
  const al = plana ? 0 : Math.sin(t * 12 + k) > 0 ? 1 : 0; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, c); R.pset(x - 1, y - al, c); R.pset(x + 1, y - al, c); R.pset(x - 2, y - al * 2 + (plana ? 0 : 1) * 0, c); R.pset(x + 2, y - al * 2, c);
}

// un cielo tramado [x0, y0, x1, y1] en tres tonos con nubes a tres velocidades y una bandada; deja puesto el recorte
// (quien llama lo quita con R.recorte(null)). cols: [alto, medio, bajo]
function f_cielo(R, x0, y0, x1, y1, t, k = 0, cols = null, nubes = 3) {
  const P = f_P, [c0, c1, c2] = cols ?? [P.cielo0, P.cielo1, P.cielo2], alto = y1 - y0 + 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / alto; for (let x = x0; x <= x1; x++) { const v = u * 2 + (((x + y * 3) % 4) / 4 - 0.4) * 0.5; R.pset(x, y, v < 0.7 ? c0 : v < 1.4 ? c1 : c2); } }
  R.recorte([x0, y0, x1, y1]);
  const w = x1 - x0 + 50;
  [[1.1, 0.18, 20, 0], [2.2, 0.36, 14, 0.5], [3.8, 0.5, 10, 0.25]].slice(0, nubes).forEach(([v, yy, ww, f]) => f_nube(R, x0 - 24 + ((t * v + f * w + k * 37) % w), y0 + alto * yy, ww * Math.min(1, (x1 - x0) / 80 + 0.3), t, k + f * 9));
  const ciclo = 10, u = ((t + k * 3) % ciclo) / ciclo;
  for (let p = 0; p < 3; p++) f_pajaro(R, x0 - 8 + u * (x1 - x0 + 16) - p * 5, y0 + 8 + p * 2 + Math.sin(t * 2 + p) * 1.5, t, p);
}

// tablas de madera: franjas horizontales que se ensanchan hacia abajo, con juntas al tresbolillo, vetas y nudos
function f_tablas(R, x0, y0, x1, y1, cols, k = 0) {
  const [c, s, l, j] = cols; let y = y0, fila = 0;
  while (y <= y1) {
    const hh = Math.min(y1 - y + 1, 5 + Math.floor((y - y0) / 9));
    R.rect(x0, y, x1, y + hh - 1, c); R.rect(x0, y, x1, y, l); R.rect(x0, y + hh - 1, x1, y + hh - 1, s);
    for (let i = 0; i < (x1 - x0) / 5; i++) { const vx = x0 + Math.floor(h(i, fila, 40 + k) * (x1 - x0)), vy = y + 1 + Math.floor(h(i, fila, 41 + k) * Math.max(1, hh - 2)), ln = 3 + Math.floor(h(i, fila, 42) * 9); R.rect(vx, vy, Math.min(x1, vx + ln), vy, i % 3 ? s : l); }
    let x = x0 - Math.floor(h(fila, 3, 43 + k) * 60);
    while (x < x1) { x += 50 + Math.floor(h(x, fila, 44) * 30); if (x > x0 && x < x1) R.rect(x, y, x, y + hh - 1, j); }
    if (h(fila, 7, 45) > 0.5) { const nx = x0 + Math.floor(h(fila, 8, 46) * (x1 - x0)); R.pset(nx, y + (hh >> 1), j); R.pset(nx + 1, y + (hh >> 1), s); }
    y += hh; fila++;
  }
}

// una fila de libros de lomo (x0, la balda, cuántos, semilla): alto, ancho y color variados, con la banda y la raya
// dorada del lomo (sin letras); devuelve la x donde acaba
function f_libros(R, x0, base, n, k, xmax = 999, alto = 1) {
  const P = f_P; let x = x0;
  for (let i = 0; i < n && x < xmax - 3; i++) { const w = 3 + Math.floor(h(i, k, 14) * 3), hh = Math.round((11 + Math.floor(h(i, k, 15) * 7)) * alto), c = P.libro[Math.floor(h(i, k, 16) * P.libro.length)];
    R.rect(x, base - hh, x + w - 1, base - 1, P.k); R.rect(x, base - hh + 1, x + w - 2, base - 1, c); R.rect(x, base - hh + 3, x + w - 2, base - hh + 3, P.k);
    if (w > 3) R.rect(x + 1, base - 5, x + w - 3, base - 5, P.amarillo); x += w; }
  return x;
}

// una vasija de barro (x: el centro, y: la base, r: el radio de la panza) con su luz y su sombra y una franja pintada
function f_vasija(R, x, y, r, c = f_P.cafeL, cS = f_P.cafe) {
  R.disco(x, y - r, r + 1, f_P.k); R.disco(x, y - r, r, c); R.rect(x - 2, y - 2 * r - 3, x + 2, y - 2 * r, f_P.k); R.rect(x - 1, y - 2 * r - 2, x + 1, y - 2 * r, c);
  for (let j = -r; j <= r; j++) for (let i = 0; i <= r; i++) if (i * i + j * j <= r * r && i > r * 0.35) R.pset(x + i, y - r + j, cS);
  R.rect(x - r + 1, y - r - 1, x + r - 1, y - r, f_P.kilimS); R.pset(x - Math.round(r / 2), y - r - 3, f_P.luz);
}

// la ventana del estudio de Atom por dentro de [x0, y0, x1, y1]: el cielo, los tejados de ladrillo con su depósito de
// agua y la chimenea que humea, y dos árboles que se mecen (lo recorta al hueco)
function f_vistaCiudad(R, x0, y0, x1, y1, t, k = 0) {
  const { rect, pset, poligono, disco } = R, P = f_P, Wd = x1 - x0, base = y1;
  f_cielo(R, x0, y0, x1, y1, t, k);
  // los edificios del fondo (azulados) y los de ladrillo, con ventanas que a ratos se encienden
  for (let i = 0; i < 6; i++) { const bx = x0 + Math.round(i * Wd / 5.5) - 6, al = 22 + Math.round(h(i, k, 70) * 14); rect(bx, base - al - 18, bx + 12, base, P.monte); for (let y = base - al - 15; y < base - 4; y += 4) for (let x = bx + 2; x < bx + 11; x += 3) pset(x, y, P.monteS); }
  for (let i = 0; i < 4; i++) {
    const bx = x0 + Math.round(i * Wd / 3.6) - 4, w = 18 + Math.round(h(i, k, 71) * 8), top = base - 18 - Math.round(h(i, k, 72) * 14);
    rect(bx, top, bx + w, base, P.ladrillo); rect(bx, top, bx + w, top + 1, P.ladrilloL); rect(bx + w - 2, top, bx + w, base, P.ladrilloS);
    for (let y = top + 3; y < base; y += 3) for (let x = bx + ((y >> 1) % 2) * 2; x < bx + w - 2; x += 4) pset(x, y, P.ladrilloS);
    for (let y = top + 5; y < base - 2; y += 7) for (let x = bx + 3; x < bx + w - 4; x += 6) { rect(x, y, x + 2, y + 3, P.k); rect(x, y, x + 2, y, P.muroS); if (h(x, y, k + Math.floor(t / 5)) > 0.65) rect(x, y + 1, x + 2, y + 3, P.amarillo); }
    if (i === 1) { // el depósito de agua de madera sobre sus patas, en el tejado
      const dx = bx + 5; for (const lx of [dx, dx + 9]) rect(lx, top - 7, lx, top, P.k); rect(dx - 1, top - 15, dx + 10, top - 7, P.tronco); for (let x = dx; x < dx + 10; x += 2) rect(x, top - 15, x, top - 7, P.troncoS); rect(dx - 1, top - 12, dx + 10, top - 12, P.k);
      poligono([[dx - 2, top - 15], [dx + 4.5, top - 20], [dx + 11, top - 15]], P.troncoS); }
    if (i === 2) { // la chimenea que humea
      rect(bx + 4, top - 6, bx + 7, top, P.ladrilloS); rect(bx + 3, top - 7, bx + 8, top - 6, P.k);
      for (let p = 0; p < 6; p++) { const f = (t * 0.3 + p / 6) % 1; disco(bx + 6 + f * 9 + Math.sin(f * 6 + p) * 1.2, top - 8 - f * 16, 1 + f * 2.2, f < 0.5 ? P.nube : P.nubeS); } }
  }
  // dos árboles que se mecen delante
  for (const [ax, al, kk] of [[x0 + 10, 16, 1], [x1 - 14, 12, 2]]) {
    const m = Math.sin(t * 1.2 + kk) * 1.4, cx = ax + m, cy = base - al;
    rect(ax, cy + 4, ax + 1, base, P.tronco);
    const B = [[0, 0, 7], [-5, 3, 5], [5, 3, 5], [-2, -4, 5], [3, -4, 4]];
    for (const [dx, dy, r] of B) disco(cx + dx, cy + dy + 1, r, P.hojaS);
    for (const [dx, dy, r] of B) disco(cx + dx - 1, cy + dy, r - 1, P.hoja);
    for (const [dx, dy, r] of B) disco(cx + dx - 2, cy + dy - 2, Math.max(1, r - 4), P.hojaL);
  }
  R.recorte(null);
}

// el armario empotrado por dentro (x0..x1, y0..y1) con la ropa que se balancea (a: cuánto está abierta la puerta)
function f_armarioDentro(R, x0, y0, x1, y1, t, a) {
  const { rect, pset, linea, disco, poligono } = R, P = f_P;
  rect(x0, y0, x1, y1, P.armS); for (let x = x0 + 2; x < x1; x += 7) rect(x, y0, x, y1, P.armF); rect(x0, y0, x1, y0 + 2, P.k);
  // la luz que entra por la puerta, en diagonal
  for (let y = y0 + 3; y < y1; y++) for (let x = x0; x < x0 + 10 + (y - y0) * 0.1; x++) if ((x + y) % 2 === 0) pset(x, y, P.armL);
  // la balda de arriba con la sombrerera de rayas, un sombrero y una caja
  rect(x0, y0 + 14, x1, y0 + 15, P.armL); rect(x0, y0 + 16, x1, y0 + 16, P.k);
  rect(x0 + 4, y0 + 5, x0 + 18, y0 + 13, P.k); rect(x0 + 5, y0 + 6, x0 + 17, y0 + 13, P.kilimL); for (let x = x0 + 6; x < x0 + 17; x += 3) rect(x, y0 + 7, x, y0 + 13, P.kilim); rect(x0 + 5, y0 + 6, x0 + 17, y0 + 7, P.kilimC);
  rect(x0 + 24, y0 + 10, x0 + 36, y0 + 13, P.k); rect(x0 + 27, y0 + 6, x0 + 33, y0 + 11, P.k); rect(x0 + 25, y0 + 11, x0 + 35, y0 + 12, P.grisD); rect(x0 + 28, y0 + 7, x0 + 32, y0 + 10, P.grisD); rect(x0 + 28, y0 + 9, x0 + 32, y0 + 9, P.rojoS);
  rect(x0 + 40, y0 + 7, x1 - 2, y0 + 13, P.k); rect(x0 + 41, y0 + 8, x1 - 3, y0 + 13, P.corcho); rect(x0 + 41, y0 + 8, x1 - 3, y0 + 8, P.corchoL);
  // la barra y la ropa colgada en sus perchas: cada prenda se mece (más al abrir)
  const by = y0 + 21; rect(x0 + 1, by, x1 - 1, by, P.gris); rect(x0 + 1, by + 1, x1 - 1, by + 1, P.grisS);
  const prendas = [[x0 + 7, 0, 30, 'camisa'], [x0 + 16, 1, 46, 'abrigo'], [x0 + 26, 2, 30, 'camisa'], [x0 + 35, 4, 22, 'jersey'], [x0 + 43, 5, 36, 'bufanda']];
  prendas.forEach(([px, ci, largo, tipo], i) => {
    const sw = Math.sin(t * 2.4 + i * 1.3) * a * 2.2, c = P.ropa[ci], cS = a_osc(c);
    linea(px, by - 2, px, by, P.grisS); pset(px + 1, by - 3, P.grisS); linea(px - 5, by + 3, px, by, P.gris); linea(px, by, px + 5, by + 3, P.gris);
    if (tipo === 'bufanda') { for (let y = by + 2; y < by + largo; y++) { const xx = Math.round(px + sw * (y - by) / largo); rect(xx - 1, y, xx + 2, y, ((y >> 2) % 2) ? c : P.kilimC); } return; }
    const ancho = tipo === 'abrigo' ? 6 : 5;
    for (let y = by + 3; y < by + largo; y++) { const xx = Math.round(px + sw * (y - by) / largo), w = y < by + 6 ? ancho + 1 : ancho;
      rect(xx - w, y, xx + w, y, P.k); rect(xx - w + 1, y, xx + w - 1, y, c); pset(xx + w - 1, y, cS); if (tipo !== 'jersey') pset(xx, y, cS);
      if (tipo === 'jersey' && (y - by) % 3 === 0) rect(xx - w + 1, y, xx + w - 1, y, cS); }
    const xb = Math.round(px + sw); rect(xb - ancho, by + largo, xb + ancho, by + largo, P.k);
    if (tipo === 'camisa') { pset(px - 1, by + 4, P.blanco); pset(px + 1, by + 4, P.blanco); for (let y = by + 8; y < by + largo - 2; y += 5) pset(Math.round(px + sw * (y - by) / largo), y, P.blanco); }
  });
  // abajo: los zapatos, el paraguas apoyado y la aspiradora con su manguera
  for (const [zx, c] of [[x0 + 5, P.cafe], [x0 + 14, P.k]]) { rect(zx, y1 - 4, zx + 6, y1 - 1, P.k); rect(zx + 1, y1 - 4, zx + 5, y1 - 2, c); rect(zx + 1, y1 - 4, zx + 2, y1 - 4, P.cafeL); }
  linea(x0 + 26, y1 - 1, x0 + 30, y1 - 30, P.k); poligono([[x0 + 27, y1 - 4], [x0 + 31, y1 - 26], [x0 + 34, y1 - 6]], P.verdeB); linea(x0 + 31, y1 - 26, x0 + 33, y1 - 6, P.verdeBL); disco(x0 + 26, y1 - 1, 1, P.k);
  rect(x1 - 14, y1 - 12, x1 - 3, y1 - 1, P.k); rect(x1 - 13, y1 - 11, x1 - 4, y1 - 2, P.rojo); rect(x1 - 13, y1 - 11, x1 - 4, y1 - 10, hex('#f07070')); disco(x1 - 11, y1 - 1, 2, P.k); disco(x1 - 5, y1 - 1, 2, P.k);
  linea(x1 - 9, y1 - 12, x1 - 7, y1 - 34, P.grisD); linea(x1 - 8, y1 - 12, x1 - 6, y1 - 34, P.gris); rect(x1 - 9, y1 - 37, x1 - 5, y1 - 34, P.k);
}

const a_osc = (c) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((c >>> s) & 255) * 0.7) << s; return (r | 0xff000000) >>> 0; };

// el estudio de Atom, plano general (ver la cabecera de hoy). Geometría: el suelo de los personajes y = 158 (entre 150 y
// 170); la pared acaba en y 137; la mesa (tablero y 108–113, x 170–268); la puerta del armario x 112–162, y 22–137
// (bisagra a la izquierda); la ventana x 10–94, y 14–96
function f_estudio(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = f_P, AX0 = 112, AX1 = 162, AY0 = 22, AY1 = 137;
  // el papel pintado con sus rayas y las pirámides diminutas al tresbolillo; arriba a la derecha, liso (Atom)
  const papel = (x, y) => { const m = x % 16; let c = m === 0 ? P.paredS : m === 8 ? P.paredL : P.pared;
    if (y > 8 && !(x > 262 && y < 52)) { const fila = Math.floor((y - 8) / 18), u = (x + (fila % 2) * 8) % 16 - 4, v = (y - 8) % 18 - 7; if (v >= 0 && v <= 3 && Math.abs(u) <= v) c = v === 3 ? P.paredS : P.motivo; }
    if (h(x, y, 3) > 0.988) c = P.paredS; return c; };
  f_capa(R, 'gz-estudio', () => {
    for (let y = 0; y < 97; y++) for (let x = 0; x < 320; x++) pset(x, y, papel(x, y));
    rect(0, 0, 319, 4, P.moldura); rect(0, 5, 319, 5, P.molduraS); rect(0, 6, 319, 6, P.paredS);
    // el friso de nogal con sus cuarterones y el zócalo
    rect(0, 97, 319, 101, P.frisoL); rect(0, 97, 319, 97, P.moldura); rect(0, 101, 319, 101, P.frisoS); rect(0, 102, 319, 137, P.friso);
    for (let x = 0; x < 320; x += 40) { rect(x + 4, 106, x + 35, 130, P.frisoS); rect(x + 5, 107, x + 35, 130, P.frisoV); rect(x + 5, 107, x + 34, 107, P.frisoS); rect(x + 5, 130, x + 35, 130, P.frisoL); rect(x + 35, 107, x + 35, 130, P.frisoL);
      for (let i = 0; i < 7; i++) { const vy = 110 + Math.floor(h(x, i, 7) * 18); rect(x + 7 + Math.floor(h(x, i, 8) * 10), vy, x + 14 + Math.floor(h(x, i, 9) * 18), vy, i % 2 ? P.frisoS : P.friso); } }
    rect(0, 132, 319, 137, P.frisoS); rect(0, 132, 319, 132, P.frisoL);
    // el suelo de tablas, el kilim (rombos rojos, azules y crema con su fleco) y la mancha de sol de la ventana
    f_tablas(R, 0, 138, 319, 179, [P.tabla, P.tablaS, P.tablaL, P.tablaJ]);
    for (let y = 140; y < 180; y++) { const a = 14 + (y - 140) * 0.9, b = 96 + (y - 140) * 0.9; for (let x = Math.round(a); x < b; x++) if ((x + y) % 2 === 0) pset(x, y, P.sol); }
    for (let y = 150; y <= 173; y++) { const fx = (y - 150) * 0.6; for (let x = Math.round(70 - fx); x <= Math.round(262 + fx); x++) {
      const bd = y === 150 || y === 173 || x <= 72 - fx || x >= 260 + fx, u = Math.abs(((x - 166) % 24 + 24) % 24 - 12), v = Math.abs(y - 161.5);
      pset(x, y, bd ? P.kilimS : (y === 152 || y === 171) ? P.kilimL : u + v * 1.4 < 5 ? P.kilimC : u + v * 1.4 < 8 ? P.kilimA : (u + v * 1.4 < 10 && (x + y) % 2) ? P.kilimL : P.kilim); } }
    for (let x = 64; x < 270; x += 2) { pset(x, 174, P.kilimC); pset(x + 1, 175, P.kilimL); }
    // la ventana: marco blanco, alféizar y el radiador con sus aletas y la llave
    rect(10, 14, 94, 95, P.k); rect(11, 15, 93, 94, P.marco); rect(11, 92, 93, 94, P.marcoS);
    rect(6, 94, 98, 98, P.k); rect(7, 95, 97, 97, P.marco); rect(7, 97, 97, 97, P.marcoS);
    rect(20, 106, 84, 128, P.k); rect(21, 107, 83, 127, P.marco); for (let x = 23; x < 82; x += 4) { rect(x, 108, x + 1, 126, P.marcoS); pset(x, 108, P.blanco); }
    rect(21, 107, 83, 108, P.blanco); rect(84, 120, 88, 122, P.grisD); disco(89, 121, 2, P.rojoS); rect(22, 129, 24, 133, P.grisD); rect(80, 129, 82, 133, P.grisD);
    // la puerta del armario cerrada: del mismo papel, solo se ve la junta, la sombra fina y el tirador hundido
    rect(AX0, AY0, AX1, AY0, P.paredS); rect(AX0, AY0, AX0, AY1, P.paredS); rect(AX1, AY0, AX1, AY1, P.paredS); rect(AX1 + 1, AY0, AX1 + 1, 96, P.paredL);
    for (const y of [102, 132]) rect(AX0 + 1, y, AX1 - 1, y, P.frisoS);
    rect(AX1 - 6, 70, AX1 - 4, 76, P.paredS); rect(AX1 - 5, 71, AX1 - 5, 75, P.motivo); pset(AX1 - 4, 76, P.paredL);
    for (const y of [AY0 + 8, AY1 - 30]) { rect(AX0 + 1, y, AX0 + 2, y + 4, P.molduraS); pset(AX0 + 1, y, P.latonS); }
    // el mapa del Nilo visto desde el espacio, enmarcado: desierto, el valle verde, el delta, el mar arriba y el mar Rojo
    rect(170, 20, 214, 62, P.k); rect(171, 21, 213, 61, P.friso); rect(171, 21, 213, 21, P.frisoL); rect(174, 24, 210, 58, P.k);
    for (let y = 25; y <= 57; y++) for (let x = 175; x <= 209; x++) { const nx = 191 + Math.sin(y * 0.25) * 2 + (y - 40) * 0.12;
      let c = (h(x, y, 50) > 0.7 ? P.desS : P.des); if (y < 31) c = y < 29 ? P.marT : P.marTL; else if (y < 36 && Math.abs(x - 191) < (36 - y) * 1.6) c = (x + y) % 2 ? P.nilo : P.niloL;
      else if (Math.abs(x - nx) < 1.6) c = P.nilo; else if (x > 203 + (y - 40) * 0.3 && y > 36) c = P.marTS; pset(x, y, c); }
    for (let y = 28; y < 34; y++) pset(186 + (y - 28), y, P.marTL);
    // la estantería: costados, baldas, el fondo de madera y lo de cada balda (la mesa tapa la de abajo)
    rect(220, 46, 274, 137, P.k); rect(221, 47, 273, 137, P.frisoS); rect(224, 49, 270, 136, P.frisoV);
    for (let y = 51; y < 136; y += 3) rect(224 + Math.floor(h(y, 1, 13) * 22), y, 232 + Math.floor(h(y, 2, 13) * 36), y, P.frisoS);
    rect(221, 47, 223, 137, P.frisoL); rect(271, 47, 273, 137, P.friso);
    for (const y of [70, 92]) { rect(221, y, 273, y + 2, P.frisoL); rect(221, y + 3, 273, y + 3, P.k); rect(224, y + 4, 270, y + 5, P.frisoS); }
    rect(219, 44, 275, 47, P.frisoL); rect(219, 44, 275, 44, P.moldura);
    // balda 1: libros, y la maqueta de la pirámide en corte (la Cámara del Rey, la de la Reina y la Gran Galería)
    const xl = f_libros(R, 225, 70, 4, 1);
    { const cx = 254, base = 69; poligono([[cx - 15, base], [cx, base - 16], [cx + 15, base]], P.k); poligono([[cx - 13, base - 1], [cx, base - 14], [cx, base - 1]], P.caliza); poligono([[cx, base - 14], [cx + 13, base - 1], [cx, base - 1]], P.calizaS);
      for (let j = 3; j < 14; j += 3) linea(cx - 13 + j, base - j, cx + 13 - j, base - j, P.calizaO);
      linea(cx - 1, base - 3, cx + 2, base - 9, P.k); rect(cx + 2, base - 10, cx + 5, base - 9, P.k); rect(cx - 3, base - 5, cx, base - 4, P.k); linea(cx - 6, base - 2, cx - 1, base - 3, P.k); pset(cx, base - 12, P.oroL);
      rect(cx - 17, base, cx + 17, base, P.frisoL); }
    pset(xl + 1, 69, P.k);
    // balda 2: la esfinge de escayola, el escarabeo y libros tumbados
    { const ex = 230, b = 91; rect(ex, b - 4, ex + 14, b, P.k); rect(ex + 1, b - 3, ex + 13, b, P.calizaL); rect(ex + 1, b - 1, ex + 13, b, P.calizaS);
      rect(ex + 10, b - 10, ex + 15, b - 4, P.k); rect(ex + 11, b - 9, ex + 14, b - 4, P.calizaL); rect(ex + 9, b - 9, ex + 10, b - 5, P.amarillo); rect(ex + 15, b - 9, ex + 16, b - 5, P.amarillo); pset(ex + 13, b - 7, P.k); rect(ex + 1, b - 6, ex + 3, b - 4, P.calizaL); }
    disco(253, 89, 3, P.k); disco(253, 89, 2, P.verdeB); pset(252, 88, P.verdeBL); linea(253, 87, 253, 91, P.k);
    for (let i = 0; i < 3; i++) { rect(258, 88 - i * 3, 270 - i, 90 - i * 3, P.k); rect(259, 88 - i * 3, 269 - i, 89 - i * 3, P.libro[i + 3]); }
    // el obelisco y la vasija en la de abajo, que asoman por encima de la mesa
    poligono([[232, 106], [234, 96], [236, 106]], P.k); rect(233, 97, 235, 106, P.granito); pset(234, 95, P.oroL); f_vasija(R, 252, 106, 4);
    // el papiro enmarcado: el Nilo, una barca con vela, palmeras y un sol (dibujo, sin jeroglíficos)
    rect(282, 56, 314, 90, P.k); rect(283, 57, 313, 89, P.friso); rect(285, 59, 311, 87, P.k);
    for (let y = 60; y <= 86; y++) for (let x = 286; x <= 310; x++) pset(x, y, (x * 3 + y) % 7 === 0 ? P.calizaS : y % 4 === 0 ? P.caliza : P.calizaL);
    for (let x = 286; x <= 310; x++) { pset(x, 80 + Math.round(Math.sin(x * 0.6) * 0.6), P.azul1); pset(x, 82, P.azul0); }
    rect(292, 76, 304, 78, P.cafe); poligono([[296, 75], [298, 64], [303, 75]], P.blanco); linea(298, 63, 298, 76, P.cafeS); linea(296, 75, 303, 75, P.cafe);
    linea(288, 79, 288, 68, P.troncoS); for (const d of [-3, 3]) linea(288, 68, 288 + d, 71, P.hojaS); disco(307, 64, 2.4, P.kilim);
    // la mesa: el tablero con canto y vetas, la pata, la cajonera con tiradores y su sombra en el suelo
    for (let x = 168; x <= 270; x++) for (let y = 138; y <= 142; y++) if ((x + y) % 2) pset(x, y, P.tablaJ);
    rect(168, 108, 270, 114, P.k); rect(169, 109, 269, 111, P.frisoL); rect(169, 112, 269, 113, P.friso); for (let i = 0; i < 14; i++) { const vx = 170 + Math.floor(h(i, 3, 17) * 92); rect(vx, 110, vx + 6, 110, P.friso); }
    rect(172, 115, 176, 138, P.k); rect(173, 115, 175, 137, P.frisoV);
    rect(228, 115, 266, 138, P.k); rect(229, 115, 265, 137, P.friso); for (const y of [115, 122, 129]) { rect(230, y + 1, 264, y + 5, P.frisoV); rect(230, y + 1, 264, y + 1, P.frisoL); rect(244, y + 3, 251, y + 3, P.latonS); rect(245, y + 3, 250, y + 3, P.laton); }
    // el flexo verde, el bote de lápices, los papeles con el boceto de la pirámide y la pila de libros
    rect(174, 105, 186, 107, P.k); rect(175, 105, 185, 106, P.laton); rect(179, 95, 180, 105, P.latonS);
    poligono([[171, 96], [175, 90], [185, 90], [189, 96]], P.k); poligono([[172, 95], [176, 91], [184, 91], [188, 95]], P.verdeB); linea(176, 91, 184, 91, P.verdeBL); rect(172, 95, 188, 95, P.verdeBS);
    rect(190, 100, 196, 107, P.k); rect(191, 101, 195, 107, P.kilimA); for (const [lx, c] of [[191, P.amarillo], [193, P.rojo], [195, P.verdeB]]) linea(lx, 101, lx + (lx - 193), 95, c);
    poligono([[214, 107], [218, 104], [234, 104], [232, 107]], P.k); poligono([[215, 106], [219, 105], [233, 105], [231, 106]], P.papel); linea(222, 106, 226, 105, P.tinta);
    for (let i = 0; i < 3; i++) { rect(250 - i, 102 - i * 3, 264 - i, 104 - i * 3 + 1, P.k); rect(251 - i, 102 - i * 3, 263 - i, 104 - i * 3, P.libro[i * 2 + 1]); }
  });
  // la ventana: el cielo y la ciudad; el parteluz y el travesaño con reflejos
  f_vistaCiudad(R, 14, 18, 90, 90, t, 1);
  rect(51, 15, 53, 93, P.marco); rect(11, 52, 93, 54, P.marco); rect(11, 54, 93, 54, P.marcoS);
  for (const d of [20, 60]) for (let i = 0; i < 10; i++) pset(d + i, 46 - i, P.cielo2);
  // las cortinas que ondean un poco con la corriente, y la barra
  for (const [x0, dir] of [[2, 1], [88, -1]]) for (let y = 12; y < 104; y++) { const w = 10 + Math.round(Math.sin(y * 0.09 + t * 1.3 + x0) * 1.2) + (y > 84 ? Math.round((y - 84) * 0.15) : 0);
    for (let i = 0; i < w; i++) { const x = dir > 0 ? x0 + i : x0 + 11 - i; pset(x, y, i % 4 === 1 ? P.cortinaS : i % 4 === 3 ? P.cortinaL : P.cortina); } }
  rect(0, 10, 104, 12, P.k); rect(1, 11, 103, 11, P.latonS); disco(1, 11, 2, P.laton); disco(103, 11, 2, P.laton);
  gato(R, 28, 94, t, { dir: 1 });
  // la puerta del armario que se abre hacia nosotros (bisagra a la izquierda); por detrás, el armario por dentro
  const ab = Math.max(0, Math.min(1, o.armario ?? 0));
  if (ab > 0) {
    f_armarioDentro(R, AX0 + 1, AY0 + 1, AX1 - 1, AY1, t, ab);
    const th = ab * 1.95, ex = AX0 + (AX1 - AX0) * Math.cos(th), crece = 7 * Math.sin(th), frente = Math.cos(th) > 0;
    const x0 = Math.min(AX0, Math.round(ex)), x1 = Math.max(AX0, Math.round(ex));
    for (let x = x0; x <= x1; x++) { const f = Math.abs(x - AX0) / Math.max(1, Math.abs(ex - AX0)), y0 = Math.round(AY0 - crece * f), y1 = Math.round(AY1 + crece * f);
      const borde = Math.abs(x - Math.round(ex)) < 1 || x === AX0;
      for (let y = y0; y <= y1; y++) { let c;
        if (borde) c = P.k; else if (frente) { const yy = Math.round(AY0 + (y - y0) * (AY1 - AY0) / Math.max(1, y1 - y0)), xx = AX0 + Math.round(f * (AX1 - AX0)); c = yy > 97 ? (yy > 101 ? P.frisoV : P.frisoL) : papel(xx, yy); if (Math.cos(th) < 0.6 && (x + y) % 3 === 0) c = P.paredS; }
        else c = (x % 6 === 0) ? P.armF : P.armL;
        pset(x, y, c); } }
    // la sombra que la puerta deja en la pared
    if (frente) for (let y = AY0; y < AY1; y++) for (let x = AX0 - 3; x < AX0; x++) if ((x + y) % 2) pset(x, y, P.paredS);
  }
  // el reloj de pared que anda y la lámpara de techo que se mece con su halo
  { const cx = 192, cy = 76; disco(cx, cy, 8, P.k); disco(cx, cy, 7, P.laton); disco(cx, cy, 6, P.blanco);
    for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5), Math.round(cy + Math.sin(k * Math.PI / 6) * 5), k % 3 ? P.gris : P.k);
    const am = t * 0.1 - 1.2, as = t * 1.05 - 1.57; linea(cx, cy, Math.round(cx + Math.cos(am) * 3), Math.round(cy + Math.sin(am) * 3), P.k); linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), P.rojo); pset(cx, cy, P.k); pset(cx - 5, cy - 4, P.latonL); }
  { const a = Math.sin(t * 0.9) * 0.06, lx = Math.round(244 + Math.sin(a) * 18), ly = 16;
    linea(244, 0, lx, ly - 4, P.k); poligono([[lx - 7, ly + 2], [lx - 3, ly - 4], [lx + 3, ly - 4], [lx + 7, ly + 2]], P.k); poligono([[lx - 6, ly + 1], [lx - 3, ly - 3], [lx + 3, ly - 3], [lx + 6, ly + 1]], P.kilim); rect(lx - 2, ly - 3, lx + 1, ly - 2, P.kilimL);
    disco(lx, ly + 3, 2, P.luz); for (let y = ly + 4; y < ly + 13; y++) for (let x = lx - 4 - (y - ly) * 0.6; x < lx + 4 + (y - ly) * 0.6; x++) if ((Math.round(x) + y * 3) % 6 === 0) pset(Math.round(x), y, P.paredL); }
  // la luz del flexo sobre la mesa
  for (let y = 97; y < 108; y++) for (let x = 172 - (y - 97) * 0.4; x < 188 + (y - 97) * 0.6; x++) if ((Math.round(x) + y * 3) % 8 === 0) pset(Math.round(x), y, P.luz);
  // la kentia que se mece, en su maceta
  { const px = 296; rect(px - 7, 126, px + 7, 137, P.k); rect(px - 6, 127, px + 6, 137, P.cafe); rect(px - 6, 127, px + 6, 128, P.cafeL); rect(px + 3, 129, px + 6, 137, P.cafeS);
    for (let k = 0; k < 7; k++) { const an = -2.6 + k * 0.38 + Math.sin(t * 1.1 + k) * 0.05, L = 30 + (k % 3) * 6; let x = px, y = 126;
      for (let s = 0; s < L; s++) { x += Math.cos(an) * 1; y += Math.sin(an) * 1 + s * 0.035; const xx = Math.round(x), yy = Math.round(y); if (yy < 50) break; pset(xx, yy, P.hojaS); if (s > 4 && s % 2 === 0) { pset(xx - 1, yy + 1, P.hoja); pset(xx + 1, yy + 1, P.hoja); pset(xx, yy + 2, s % 4 ? P.hojaL : P.hoja); pset(xx - 2, yy + 2, P.hojaS); pset(xx + 2, yy + 2, P.hojaS); } } } }
  // la pirámide de pisapapeles y la lupa en la mesa; la taza que humea
  const pir = { x: 205, y: 108, s: 1 };
  if (o.piramide !== false && PIEZAS_GZ.piramidePisapapeles) PIEZAS_GZ.piramidePisapapeles(R, pir.x, pir.y, { abre: o.abre ?? 0 });
  if (o.lupa !== false) { disco(226, 101, 4, P.k); disco(226, 101, 3, P.cielo2); pset(225, 100, P.blanco); linea(229, 104, 234, 107, P.k); linea(230, 104, 234, 106, P.cafe); }
  rect(240, 101, 246, 107, P.k); rect(241, 102, 245, 107, P.blanco); rect(246, 103, 247, 105, P.k); rect(241, 102, 245, 102, P.cafe);
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; pset(Math.round(243 + Math.sin(f * 7 + k) * 1.5), Math.round(99 - f * 10), f < 0.6 ? P.blanco : P.paredL); }
  motas(R, t, 18, 110, 100, 150, 12, P.luz);
  return { suelo: 158, sueloMin: 150, sueloMax: 170, mesa: { x0: 170, x1: 268, y: 108 }, piramide: [pir.x, pir.y], punta: [pir.x, pir.y - 15], hueco: [pir.x, pir.y - 10], lupa: [226, 101],
    armario: { x0: AX0, x1: AX1, y0: AY0, y1: AY1, golpe: [138, 66] }, ventana: [10, 14, 94, 96], estanteria: [220, 44, 274, 137], reloj: [192, 76] };
}

// lo de delante del estudio general: el sillón de lectura de cuero en la esquina izquierda y la papelera de mimbre con
// bolas de papel a la derecha
function f_estudioDelante(R, t, o) {
  const { rect, pset, disco } = R, P = f_P;
  rect(0, 146, 30, 179, P.k); rect(0, 147, 29, 179, P.kilimS); rect(0, 147, 29, 150, P.kilim); for (let y = 152; y < 180; y += 5) for (let x = 3; x < 28; x += 6) pset(x + (y % 2) * 3, y, P.k);
  rect(22, 140, 34, 179, P.k); rect(23, 141, 33, 179, P.kilim); rect(23, 141, 33, 143, hex('#d0584a')); rect(31, 144, 33, 179, P.kilimS);
  rect(298, 158, 316, 179, P.k); for (let y = 159; y < 180; y++) for (let x = 299; x < 316; x++) pset(x, y, (x + (y >> 1)) % 4 === 0 ? P.cafeL : ((x >> 1) + y) % 4 === 0 ? P.cafeS : hex('#b08850'));
  rect(297, 157, 317, 159, hex('#c8a060'));
  for (const [bx, by] of [[303, 155], [310, 154], [306, 151]]) { disco(bx, by, 3, P.k); disco(bx, by, 2.4, P.papel); pset(bx - 1, by - 1, P.blanco); pset(bx + 1, by + 1, P.papelS); }
  return { sillon: [0, 140, 34, 180], papelera: [297, 150, 318, 180] };
}

// la mesa de cerca (ver la cabecera de hoy): el tablero ocupa y 112–179; la pirámide grande en (150, 160) a escala 3
function f_mesa(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = f_P;
  f_capa(R, 'gz-mesa', () => {
    // la pared del papel de rayas con pirámides diminutas (lisa arriba a la derecha)
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const m = x % 20; let c = m === 0 ? P.paredS : m === 10 ? P.paredL : P.pared;
      if (y > 6 && !(x > 258 && y < 50)) { const fila = Math.floor(y / 22), u = (x + (fila % 2) * 10) % 20 - 5, v = y % 22 - 9; if (v >= 0 && v <= 4 && Math.abs(u) <= v) c = v === 4 ? P.paredS : P.motivo; }
      pset(x, y, c); }
    // la ventana de la izquierda con su marco (el cielo, por fotograma)
    rect(6, 18, 104, 100, P.k); rect(7, 19, 103, 99, P.marco); rect(7, 97, 103, 99, P.marcoS); rect(2, 98, 108, 103, P.k); rect(3, 99, 107, 102, P.marco); rect(3, 102, 107, 102, P.marcoS);
    { // el corcho, 6 px más abajo que sus cifras (para dejar tranquila la barra del año)
    const D6 = 6, rect = (a, b, c, d, col) => R.rect(a, b + D6, c, d + D6, col), pset = (x, y, c) => R.pset(x, y + D6, c), linea = (a, b, c, d, col) => R.linea(a, b + D6, c, d + D6, col),
      disco = (x, y, r, c) => R.disco(x, y + D6, r, c), poligono = (pts, c) => R.poligono(pts.map(([x, y]) => [x, y + D6]), c), icono = (n, x, y, c, sm, e) => R.icono(n, x, y + D6, c, sm, e);
    // el corcho con los bocetos clavados: la pirámide en corte, la esfinge, una flecha y una «?»
    rect(124, 18, 206, 84, P.k); rect(125, 19, 205, 83, P.friso); rect(128, 22, 202, 80, P.corcho);
    for (let i = 0; i < 260; i++) pset(128 + Math.floor(h(i, 1, 60) * 75), 22 + Math.floor(h(i, 2, 60) * 59), h(i, 3, 60) > 0.5 ? P.corchoS : P.corchoL);
    const hoja = (x0, y0, w, al, inc) => { rect(x0 + 1, y0 + 1, x0 + w + 1, y0 + al + 1, P.corchoS); rect(x0, y0, x0 + w, y0 + al, P.papel); rect(x0, y0 + al, x0 + w, y0 + al, P.papelS); disco(x0 + (w >> 1), y0 + 2, 1.5, inc); };
    hoja(132, 26, 30, 26, P.rojo); poligono([[136, 49], [147, 31], [158, 49]], P.tinta); poligono([[138, 48], [147, 33], [156, 48]], P.papel); linea(147, 45, 150, 40, P.tinta); rect(150, 39, 153, 40, P.tinta); rect(144, 43, 146, 44, P.tinta); linea(140, 47, 145, 46, P.tinta);
    hoja(168, 28, 30, 18, P.azul1); rect(172, 40, 190, 42, P.tinta); rect(186, 34, 191, 40, P.tinta); rect(187, 35, 190, 39, P.papel); pset(189, 37, P.tinta); rect(172, 38, 176, 40, P.tinta);
    hoja(136, 56, 24, 20, P.verdeB); for (let i = 0; i < 12; i++) pset(140 + i, 66 - Math.round(Math.sin(i * 0.5) * 3), P.tinta); linea(152, 66, 156, 66, P.tinta); linea(154, 64, 156, 66, P.tinta); linea(154, 68, 156, 66, P.tinta);
    hoja(168, 52, 26, 24, P.amarillo); icono('?', 177, 58, P.rojo, P.papel, 1);
    linea(150, 26, 182, 30, P.rojo); linea(150, 26, 148, 58, P.rojo);
    }
    // la estantería de la derecha con libros y un reloj de arena
    rect(214, 52, 262, 112, P.k); rect(215, 53, 261, 111, P.frisoV); rect(215, 53, 217, 111, P.frisoL); for (const y of [80]) { rect(215, y, 261, y + 2, P.frisoL); rect(215, y + 3, 261, y + 3, P.k); }
    f_libros(R, 218, 80, 7, 4, 248, 1.4); f_libros(R, 230, 111, 6, 5, 260, 1.4);
    poligono([[251, 66], [259, 66], [255, 72], [259, 79], [251, 79], [255, 72]], P.k); poligono([[252, 67], [258, 67], [255, 71]], P.cielo2); poligono([[253, 78], [257, 78], [255, 74]], P.kilimL); rect(250, 65, 260, 66, P.friso); rect(250, 79, 260, 80, P.friso);
    rect(219, 92, 228, 111, P.k); rect(220, 93, 227, 111, P.caliza); rect(222, 95, 225, 98, P.calizaS);
    // el tablero en perspectiva: nogal con vetas que corren hacia nosotros, el canto de atrás y la luz del flexo
    for (let y = 112; y < 180; y++) { const e = (y - 112) / 68; for (let x = 0; x < 320; x++) { const xv = (x - 160) / (0.75 + e * 0.5) + 160, vet = Math.sin(xv * 0.21 + Math.sin(y * 0.05 + xv * 0.02) * 2.2);
      pset(x, y, vet > 0.82 ? P.frisoS : vet < -0.86 ? P.frisoL : (h(Math.round(xv / 3), y, 8) > 0.93 ? P.frisoV : P.friso)); } }
    rect(0, 111, 319, 112, P.frisoS); rect(0, 113, 319, 113, P.frisoL);
    // la libreta abierta con el boceto de la pirámide en corte
    poligono([[44, 172], [60, 128], [118, 128], [116, 172]], P.k); poligono([[46, 171], [61, 129], [88, 129], [82, 171]], P.papel); poligono([[84, 171], [90, 129], [117, 129], [115, 171]], hex('#fbf6e8'));
    for (let y = 134; y < 170; y += 4) { linea(54 - (y - 134) * 0.35 + 6, y, 84 - (y - 134) * 0.1, y, P.papelS); linea(89 - (y - 134) * 0.05, y, 115, y, P.papelS); }
    poligono([[58, 162], [68, 138], [78, 162]], P.tinta); poligono([[60, 161], [68, 141], [76, 161]], P.papel); linea(68, 155, 70, 149, P.tinta); rect(70, 148, 72, 149, P.tinta);
    for (let i = 0; i < 4; i++) linea(92, 140 + i * 6, 108 - i * 2, 140 + i * 6, P.tinta);
    // la goma y sus migas
    rect(124, 166, 134, 171, P.k); rect(125, 167, 133, 170, hex('#f0a0b0')); rect(125, 167, 133, 167, hex('#ffc8d0')); for (const [mx, my] of [[137, 170], [140, 168], [121, 172]]) pset(mx, my, hex('#f0a0b0'));
  });
  // la ventana: el cielo y la ciudad; el parteluz
  f_vistaCiudad(R, 10, 22, 100, 96, t, 3);
  rect(54, 19, 56, 97, P.marco); rect(7, 52, 103, 54, P.marco); rect(7, 54, 103, 54, P.marcoS);
  for (const d of [14, 62]) for (let i = 0; i < 12; i++) pset(d + i, 48 - i, P.cielo2);
  // el flexo grande de la derecha con su cono de luz que tiembla un poco
  { const bx = 288, by = 128; rect(bx - 14, by - 4, bx + 14, by, P.k); rect(bx - 13, by - 4, bx + 13, by - 1, P.verdeB); rect(bx - 13, by - 4, bx + 13, by - 4, P.verdeBL);
    linea(bx, by - 4, bx - 6, 70, P.k); linea(bx + 1, by - 4, bx - 5, 70, P.latonS); linea(bx - 6, 70, 246, 56, P.k); linea(bx - 6, 71, 246, 57, P.latonS); disco(bx - 6, 70, 2, P.laton);
    poligono([[232, 64], [240, 50], [256, 54], [254, 68]], P.k); poligono([[234, 63], [241, 51], [255, 55], [253, 66]], P.verdeB); linea(241, 52, 254, 55, P.verdeBL);
    const fl = 0.85 + 0.15 * Math.sin(t * 7) * Math.sin(t * 2.3);
    for (let y = 68; y < 150; y++) { const a = 234 - (y - 66) * 0.85, b = 254 + (y - 66) * 0.35; for (let x = Math.round(a); x < b; x++) if (((x + y * 3) % 7 === 0) && h(x, y, 77) < fl) pset(x, y, P.luz); } }
  // la pirámide grande, la linterna, el lápiz y la lupa
  const s = 3, pir = { x: 168, y: 160 }, ab = Math.max(0, Math.min(1, o.abre ?? 0));
  for (let x = pir.x - 30; x <= pir.x + 40; x++) for (let y = pir.y - 1; y <= pir.y + 3; y++) if ((x + y) % 2 && Math.abs(x - pir.x - 5) < 35 - (y - pir.y) * 3) pset(x, y, P.frisoS);
  if (o.piramide !== false && PIEZAS_GZ.piramidePisapapeles) PIEZAS_GZ.piramidePisapapeles(R, pir.x, pir.y, { s, abre: ab });
  if (o.lapiz === 'dentro' && PIEZAS_GZ.lapiz && ab > 0.3) { const sale = (ab - 0.3) / 0.7; PIEZAS_GZ.lapiz(R, pir.x, Math.round(pir.y - 10 * s + 1 - sale * 9), { s: 1 }); }
  if (o.lapiz !== false && o.lapiz !== 'dentro' && PIEZAS_GZ.lapiz) PIEZAS_GZ.lapiz(R, 236, 170, { s: 2 });
  if (o.linterna && PIEZAS_GZ.linterna) PIEZAS_GZ.linterna(R, 222, 146, { s: 2, encendida: o.linterna === 'encendida' });
  { const lx = 290, ly = 160; disco(lx, ly, 9, P.k); disco(lx, ly, 8, P.laton); disco(lx, ly, 6, P.cielo2); disco(lx - 1, ly - 1, 3, hex('#c8e4f8')); pset(lx - 3, ly - 3, P.blanco); pset(lx - 2, ly - 4, P.blanco);
    for (let i = 0; i < 16; i++) { rect(lx + 6 + i, ly + 6 + i, lx + 8 + i, ly + 7 + i, P.k); pset(lx + 7 + i, ly + 6 + i, P.cafeL); } }
  return { suelo: 179, mesa: 112, piramide: [pir.x, pir.y, s], punta: [pir.x, pir.y - 15 * s], hueco: [pir.x, pir.y - 10 * s], linterna: [222, 146], lapiz: [236, 170], lupa: [290, 160], corcho: [124, 24, 206, 90], ventana: [6, 18, 104, 100] };
}

// lo de delante de la mesa de cerca: el canto del tablero abajo y la taza grande que humea a la izquierda
function f_mesaDelante(R, t, o) {
  const { rect, pset, disco } = R, P = f_P;
  rect(0, 176, 319, 179, P.k); rect(0, 177, 319, 178, P.frisoL); for (let x = 0; x < 320; x += 23) rect(x, 178, x + 9, 178, P.frisoS);
  const cx = 18, cy = 162; rect(cx - 12, cy - 18, cx + 10, cy + 12, P.k); rect(cx - 11, cy - 17, cx + 9, cy + 12, P.blanco); rect(cx + 4, cy - 17, cx + 9, cy + 12, P.gris); rect(cx - 11, cy - 17, cx + 9, cy - 15, P.cafe);
  rect(cx - 9, cy - 8, cx + 4, cy - 2, P.kilimA); R.poligono([[cx - 6, cy - 3], [cx - 2, cy - 7], [cx + 2, cy - 3]], P.oro);
  rect(cx + 10, cy - 10, cx + 16, cy + 4, P.k); rect(cx + 11, cy - 8, cx + 14, cy + 2, P.blanco); rect(cx + 12, cy - 6, cx + 13, cy, P.k);
  for (let k = 0; k < 5; k++) { const f = (t * 0.5 + k / 5) % 1; disco(cx - 2 + Math.sin(f * 7 + k) * 3, cy - 20 - f * 22, 1 + f * 1.6, f < 0.5 ? P.blanco : P.paredL); }
  return { taza: [cx, cy] };
}

// el fondo del espacio en un búfer: azul noche tramado en tres tonos, una banda tenue de la Vía Láctea y estrellas fijas
function f_espacio(R, y1 = 179) {
  const { pset } = R, P = f_P;
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) { const v = y / 180 * 1.6 + (((x + y * 3) % 4) / 4 - 0.4) * 0.4, via = Math.abs(y - 20 - x * 0.28) < 9 + 4 * Math.sin(x * 0.05);
    let c = v < 0.5 ? P.esp0 : v < 1.1 ? P.esp1 : P.esp2; if (via && h(x, y, 90) > 0.55) c = P.esp2; if (via && h(x, y, 91) > 0.93) c = P.estS; pset(x, y, c); }
  for (let k = 0; k < 140; k++) { const x = Math.floor(h(k, 1, 92) * 320), y = Math.floor(h(k, 2, 92) * y1); if (x > 274 && y < 48) continue; pset(x, y, h(k, 3, 92) > 0.7 ? P.blanco : P.estS); }
}

// las estrellas que titilan y la estrella fugaz de vez en cuando (por fotograma, sobre el espacio hasta y1)
function f_titilan(R, t, y1) {
  const P = f_P;
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 5, 93) * 320), y = Math.floor(h(k, 6, 93) * y1); if (x > 274 && y < 48) continue; const b = Math.sin(t * (1.5 + h(k, 7, 93) * 3) + k);
    if (b > 0.3) { R.pset(x, y, P.blanco); if (b > 0.85) { R.pset(x - 1, y, P.estS); R.pset(x + 1, y, P.estS); R.pset(x, y - 1, P.estS); R.pset(x, y + 1, P.estS); } } }
  const c = 11, u = (t % c) / 1.2; if (u < 1) { const x0 = 40 + (Math.floor(t / c) * 97) % 180, x = x0 + u * 60, y = 18 + u * 20; for (let i = 0; i < 10; i++) R.pset(Math.round(x - i * 1.5), Math.round(y - i * 0.5), i < 3 ? P.blanco : P.estS); }
}

// la Tierra vista desde la órbita, en un búfer: el disco (centro cx, cy y radio r) con el Mediterráneo arriba, el
// desierto (mesetas en tres tonos, campos de dunas, uadis secos y piedras), el Nilo oscuro entre su franja de campos
// verdes en parcelas, el delta en abanico con sus brazos, el Sinaí, el golfo de Suez, el mar Rojo, y la atmósfera en el
// borde; de noche, oscura con las luces del Nilo y de El Cairo. esc: cuántas unidades del mapa por píxel (menos, más cerca)
function f_tierra(R, cx, cy, r, noche, esc = 1) {
  const { pset } = R, P = f_P;
  for (let y = Math.max(0, cy - r - 4); y < 180; y++) for (let x = 0; x < 320; x++) {
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
    if (d > r + 5) continue;
    if (d > r) { if (d < r + 2 || (d < r + 4 && (x + y) % 2 === 0) || (x + y * 2) % 5 === 0) pset(x, y, d < r + 2 ? P.atm : d < r + 4 ? P.atm : P.esp2); continue; }
    const lim = cy - Math.sqrt(Math.max(0, r * r - dx * dx)), pv = Math.min(1, (y - lim) / 40), v = ((y - lim) * (1.2 + 1.6 * (1 - pv)) + 2) * esc, mx = 160 + (x - 160) * esc;
    const costa = 24 + 5 * Math.sin(mx * 0.04) + 2 * Math.sin(mx * 0.13), mar = v < costa;
    const deltaA = v < 52 && v >= costa - 2 && Math.abs(mx - 166) < (52 - v) * 0.85 + 1;
    const rioX = 166 + 8 * Math.sin((v - 50) * 0.03) + 3 * Math.sin(v * 0.1), dr = Math.abs(mx - rioX), rio = v >= 50 && dr < 0.9 * esc + 0.5, valle = v >= 50 && dr < 3.8 * esc + 0.6;
    const rojoX = 226 + (v - 30) * 0.42, rojo = v > 30 && Math.abs(mx - rojoX) < 5 + v * 0.03, suez = v > 24 && v < 46 && Math.abs(mx - (204 + (v - 24) * 0.6)) < 1.6;
    const vv = Math.round(v);
    let c;
    if (noche) {
      if (mar || rojo || suez) c = h(mx >> 2, vv >> 1, 97) > 0.85 ? P.marTS : P.marN; else c = h(x >> 2, y >> 1, 94) > 0.6 ? P.desNL : P.desN;
      if (!mar && (deltaA || valle) && h(mx, vv, 95) > (deltaA ? 0.5 : 0.55)) c = h(mx, vv, 85) > 0.8 ? P.luzCL : P.luzC;
      if (!mar && Math.hypot(mx - 166, (v - 52) * 1.3) < 7) c = h(mx, vv, 96) > 0.3 ? P.luzCL : P.luzC;
      if (!mar && !rojo && h(mx, vv, 79) > 0.996) c = P.luzC;
    } else {
      if (mar || rojo || suez) { c = (h(mx >> 2, vv >> 1, 97) > 0.8) ? P.marTL : P.marT; if (v > costa - 3 && !rojo && !suez) c = P.marTL; }
      else if (rio) c = P.niloS;
      else if (deltaA) { const brazo = Math.abs(mx - 166 - (52 - v) * 0.45) < 0.8 || Math.abs(mx - 166 + (52 - v) * 0.5) < 0.8; c = brazo ? P.niloS : (((mx >> 1) + (vv >> 1)) % 3 === 0 ? P.niloL : h(mx >> 1, vv >> 1, 98) > 0.5 ? P.nilo : P.hojaL); }
      else if (valle) c = h(mx >> 1, vv >> 1, 98) > 0.55 ? P.niloL : P.nilo;
      else {
        const m = Math.sin(mx * 0.045 + v * 0.03) + Math.sin(mx * 0.021 - v * 0.065 + 1) + 0.6 * Math.sin(mx * 0.11 + v * 0.09), duna = m > 0.9 && Math.sin(mx * 0.5 + v * 0.8) > 0.55;
        const uadi = Math.abs(Math.sin(mx * 0.07 + Math.sin(v * 0.08) * 2.5) ) < 0.04 && v > 60;
        c = duna ? P.desL : m < -1.1 ? P.desD : m < -0.3 ? ((x + y) % 2 ? P.desS : P.des) : m > 1.3 ? P.desL : P.des;
        if (uadi) c = P.desS; if (h(mx, vv, 99) > 0.985) c = P.desD;
      }
      if (d > r - 3) c = (x + y) % 2 ? P.atmL : c; else if (d > r - 8 && (x + y) % 3 === 0) c = P.atm;
    }
    pset(x, y, c);
  }
}

// las nubes sobre la Tierra (cx, cy, r): cúmulos de cuatro lóbulos en tres tonos, aplastados hacia el borde, con su
// sombra en el suelo (de día), a dos velocidades; de noche, gris azulado
function f_nubesTierra(R, t, cx, cy, r, noche, n = 7, vel = 1) {
  const P = f_P, cs = noche ? [hex('#26304a'), hex('#323e5c'), hex('#44506e')] : [P.nubeS, P.nube, P.nubeL];
  for (let k = 0; k < n; k++) {
    const sp = (k % 2 ? 2.2 : 1.1) * vel, x0 = ((h(k, 1, 88) * 400 + t * sp) % 400) - 40, lim = cy - Math.sqrt(Math.max(0, r * r - (x0 - cx) ** 2));
    const y0 = lim + 8 + h(k, 2, 88) * 66, p = Math.min(1, (y0 - lim) / 40) * 0.6 + 0.4, w = 6 + h(k, 3, 88) * 8;
    const L = [[0, 0, 1], [-0.7, 0.2, 0.7], [0.75, 0.15, 0.75], [0.25, -0.35, 0.65], [-0.3, -0.3, 0.55]].map(([a, b, s], i) => [x0 + a * w + Math.sin(t * 0.3 + k + i) * 0.6, y0 + b * w * p, s * w * 0.7, s * w * 0.7 * p]);
    for (const pas of noche ? [1, 2] : [0, 1, 2]) for (const [lx, ly, rx, ry] of L) for (let j = -Math.ceil(ry); j <= Math.ceil(ry); j++) for (let i = -Math.ceil(rx); i <= Math.ceil(rx); i++) {
      const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue;
      const xx = Math.round(lx + i + (pas === 0 ? 4 : 0)), yy = Math.round(ly + j + (pas === 0 ? 5 * p : 0)), lm = cy - Math.sqrt(Math.max(0, r * r - (xx - cx) ** 2)); if (yy <= lm + 2) continue;
      if (pas === 0) { if ((xx + yy) % 2 === 0) R.pset(xx, yy, P.desD); continue; }
      if (pas === 1) R.pset(xx, yy, e > 0.55 && j > 0 ? cs[0] : cs[1]); else if (j < -ry * 0.25 && i < rx * 0.3 && e < 0.6) R.pset(xx, yy, cs[2]);
    }
  }
}

// el satélite de radar (centro x, y; s escala): cuerpo de lámina dorada que brilla, el panel del radar largo con sus
// celdas (a la derecha, hacia abajo), dos alas de paneles solares (a la izquierda), la antena y la luz que parpadea
function f_satelite(R, x, y, t, s = 1) {
  const { rect, pset, linea, poligono } = R, P = f_P, X = (i) => Math.round(x + i * s), Y = (j) => Math.round(y + j * s);
  // el brazo y las dos alas de paneles solares con sus celdas y el brillo que corre
  rect(X(-12), Y(-1), X(-6), Y(0), P.grisS);
  for (const [a0, a1] of [[-64, -38], [-36, -12]]) { rect(X(a0) - 1, Y(-7) - 1, X(a1) + 1, Y(6) + 1, P.grisS); rect(X(a0) - 1, Y(6) + 1, X(a1) + 1, Y(6) + 1, P.grisD); rect(X(a0), Y(-7), X(a1), Y(6), P.panel);
    for (let i = a0; i <= a1; i += 4) rect(X(i), Y(-7), X(i), Y(6), P.panelS); for (let j = -7; j <= 6; j += 3) rect(X(a0), Y(j), X(a1), Y(j), P.panelS);
    const b = ((t * 14) % 90) - 64; for (let j = -7; j <= 6; j++) { const xx = X(b + j * 0.6); if (xx >= X(a0) && xx <= X(a1)) pset(xx, Y(j), P.panelL); } }
  // el cuerpo: lámina dorada arrugada que destella
  rect(X(-7) - 1, Y(-6) - 1, X(7) + 1, Y(6) + 1, P.k);
  for (let j = -6; j <= 6; j++) for (let i = -7; i <= 7; i++) { const g = h(i + 20, j + 20, 87 + Math.floor(t * 3) % 4); pset(X(i), Y(j), g > 0.88 ? P.oroL : g < 0.25 ? P.oroS : j > 3 || i > 5 ? P.oroS : P.oro); }
  rect(X(-7), Y(-6), X(7), Y(-6), P.oroL);
  // el panel del radar, largo, colgado debajo del cuerpo, con sus celdas y el canto claro
  poligono([[X(-4), Y(7)], [X(58), Y(12)], [X(58), Y(16)], [X(-4), Y(11)]], P.k);
  poligono([[X(-3), Y(8)], [X(57), Y(13)], [X(57), Y(15)], [X(-3), Y(10)]], P.grisD);
  for (let i = -2; i < 57; i += 3) linea(X(i), Y(8 + (i + 4) * 0.08), X(i), Y(10 + (i + 4) * 0.08), P.grisK);
  linea(X(-3), Y(8), X(57), Y(13), P.gris);
  // la antena de enlace (un platito) y la luz roja que parpadea
  linea(X(3), Y(-6), X(5), Y(-12), P.grisS); poligono([[X(2), Y(-12)], [X(8), Y(-14)], [X(7), Y(-10)]], P.gris); pset(X(5), Y(-12), P.blanco);
  if (Math.floor(t * 1.6) % 2) { pset(X(-7) - 1, Y(-6) - 2, P.rojo); pset(X(-7) - 1, Y(-6) - 3, hex('#ff9a9a')); }
  return { radar: [X(28), Y(14)], cuerpo: [X(0), Y(0)] };
}

// la trompetilla de oído del gag 3, pintada en la dirección (dx, dy) desde la base (x, y): el tubo que sale del cuerpo y
// se curva, y el pabellón de latón que se abre con la boca oscura; L 0–1: cuánto ha salido
function f_trompetilla(R, x, y, dx, dy, L, t) {
  const P = f_P, n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, px = -uy, py = ux, largo = 64 * L, tiembla = Math.sin(t * 9) * 0.6 * L;
  if (L <= 0) return null;
  for (let s = 0; s <= largo; s += 0.5) { const f = s / 64, r = f < 0.5 ? 2.2 : 2.2 + Math.pow((f - 0.5) / 0.5, 2) * 14, cv = Math.sin(f * Math.PI) * 4;
    const cxp = x + ux * s + px * (cv + tiembla * f), cyp = y + uy * s + py * (cv + tiembla * f);
    for (let w = -r; w <= r; w += 0.5) { const xx = Math.round(cxp + px * w), yy = Math.round(cyp + py * w), borde = Math.abs(w) > r - 1;
      R.pset(xx, yy, borde ? P.k : w > r * 0.3 ? P.latonS : w < -r * 0.4 ? P.latonL : P.laton); } }
  // la boca: el aro y lo oscuro de dentro
  const f = largo / 64, r = f < 0.5 ? 2.2 : 2.2 + Math.pow((f - 0.5) / 0.5, 2) * 14, cv = Math.sin(f * Math.PI) * 4, bx = x + ux * largo + px * cv, by = y + uy * largo + py * cv;
  if (r > 3) for (let w = -r + 1; w <= r - 1; w += 0.5) { R.pset(Math.round(bx + px * w), Math.round(by + py * w), P.cafeS); R.pset(Math.round(bx + px * w - ux), Math.round(by + py * w - uy), P.latonL); }
  return [Math.round(bx), Math.round(by)];
}

// el sol en el borde, con su halo tramado y cuatro rayos de destello que laten
function f_sol(R, x, y, t) {
  const P = f_P;
  for (let j = -26; j <= 26; j++) for (let i = -26; i <= 26; i++) { const d = Math.hypot(i, j); if (d < 9) R.pset(x + i, y + j, d < 6 ? P.blanco : P.luz); else if (d < 26 && (i + j * 3) % (d < 16 ? 3 : 5) === 0) R.pset(x + i, y + j, d < 16 ? P.luz : P.esp2); }
  const L = 30 + Math.sin(t * 2) * 4; for (let k = 0; k < L; k++) { if (k % 2) continue; R.pset(x + k, y, P.luz); R.pset(x, y + k, P.luz); R.pset(x + Math.round(k * 0.7), y + Math.round(k * 0.7), k < 14 ? P.luz : P.estS); }
}

// la órbita (ver la cabecera de hoy). Geometría: Giza en (168, 124); el satélite en (o.satX, o.satY) = (118, 46)
function f_orbita(R, t, o) {
  const P = f_P, N = !!o.noche, cx = 168, cy = 440, r = 336;
  f_capa(R, N ? 'gz-orbitaN' : 'gz-orbita', () => { f_espacio(R, 150); f_tierra(R, cx, cy, r, N, 1); });
  f_titilan(R, t, 110);
  if (!N) f_sol(R, 6, 56, t);
  f_nubesTierra(R, t, cx, cy, r, N, 8, 1);
  // Giza: en la orilla izquierda del Nilo, al pie del delta; un destello que late para encontrarla
  const G = [160, 0]; { const lim = cy - Math.sqrt(r * r - (G[0] - cx) ** 2); for (let yy = Math.ceil(lim); yy < 180; yy++) { const pv = Math.min(1, (yy - lim) / 40); if ((yy - lim) * (1.2 + 1.6 * (1 - pv)) + 2 >= 56) { G[1] = yy; break; } } }
  if (Math.sin(t * 3) > 0) { R.pset(G[0], G[1], N ? P.blanco : P.k); }
  const sx = o.satX ?? 112, sy = (o.satY ?? 44) + Math.round(Math.sin(t * 0.8) * 1.5);
  const sat = f_satelite(R, sx, sy, t, 1.5), [rx, ry] = sat.radar;
  // las ondas que bajan (cian) y el eco que sube (ámbar): arcos perpendiculares a la línea satélite–Giza
  const on = Math.max(0, Math.min(1, o.ondas ?? 0));
  if (on > 0) { const dx = G[0] - rx, dy = G[1] - ry, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    for (let k = 0; k < 5; k++) { if (k / 5 > on * 1.01) continue;
      const fb = (t * 0.45 + k / 5) % 1, fs = (t * 0.45 + k / 5 + 0.5) % 1;
      for (const [f, c, sube] of [[fb, P.onda, false], [fs, P.eco, true]]) { const pos = sube ? 1 - f : f, ax = rx + dx * pos, ay = ry + dy * pos, rad = 6 + pos * 16;
        for (let a = -0.9; a <= 0.9; a += 0.08) { const ca = Math.cos(a), sa = Math.sin(a), vx = (sube ? -ux : ux) * ca - (sube ? -uy : uy) * sa, vy = (sube ? -ux : ux) * sa + (sube ? -uy : uy) * ca;
          const qx = Math.round(ax + vx * rad - (sube ? -ux : ux) * rad), qy = Math.round(ay + vy * rad - (sube ? -uy : uy) * rad); R.pset(qx, qy, Math.abs(a) > 0.7 ? P.ondaS : c); if (Math.abs(a) < 0.6) R.pset(qx, qy - 1, c); } } } }
  // la trompetilla que sale del cuerpo y apunta a Giza
  const tr = Math.max(0, Math.min(1, o.trompetilla ?? 0)); let boca = null;
  if (tr > 0) boca = f_trompetilla(R, sat.cuerpo[0] + 2, sat.cuerpo[1] + 6, G[0] - sat.cuerpo[0], G[1] - sat.cuerpo[1], tr, t);
  return { suelo: null, giza: G, satelite: sat.cuerpo, radar: sat.radar, boca, sol: N ? null : [6, 56], horizonte: cy - r };
}

// las tres pirámides de Giza vistas desde muy alto (de lado y un poco desde arriba), con la cara de luz y la de sombra
// y su sombra en la arena; (x, base, s) de la grande
function f_piramidesLejos(R, x, base, s = 1) {
  const P = f_P;
  for (const [dx, al] of [[0, 14], [16, 13], [30, 8]]) { const px = Math.round(x + dx * s), a = Math.round(al * s), b = base - Math.round(dx * 0.3 * s);
    R.poligono([[px, b - a], [px + a * 1.6, b + 2], [px + a * 0.2, b + 3]], P.desD);
    R.poligono([[px - a, b], [px, b - a], [px, b]], P.caliza); R.poligono([[px, b - a], [px + a, b], [px, b]], P.calizaS);
    R.linea(px - a, b, px + a, b, P.calizaO); for (let j = 3; j < a; j += 3) R.linea(px - a + j, b - j, px - 1, b - j, P.calizaL); }
}

// la cámara 'rebote' (ver la cabecera de hoy). Geometría: el satélite en (206, 30); la roca donde rebota en (112, 150),
// en la meseta de Giza (orilla izquierda del Nilo); las pirámides en (96..129, 158); El Cairo en la otra orilla
function f_rebote(R, t, o) {
  const P = f_P, cx = 160, cy = 1000, r = 960;
  f_capa(R, 'gz-rebote', () => {
    f_espacio(R, 60); f_tierra(R, cx, cy, r, false, 0.55);
    // El Cairo: una mancha gris de calles junto al Nilo, con manzanas y avenidas
    for (let y = 104; y < 150; y++) for (let x = 174; x < 244; x++) { const e = ((x - 208) / 34) ** 2 + ((y - 124) / 20) ** 2 + 0.35 * h(x >> 3, y >> 3, 81); if (e > 1) continue;
      const cx4 = x >> 2, cy3 = Math.floor(y / 3), b = h(cx4, cy3, 82), calle = x % 4 === 0 || y % 3 === 0, aven = Math.abs((x - 174) - (y - 104) * 1.3) < 1 || Math.abs(y - 126) < 1;
      R.pset(x, y, aven ? P.grisD : calle ? (e > 0.7 ? P.desS : P.cairoS) : b > 0.9 ? P.nilo : b > 0.6 ? P.cairoL : b < 0.15 ? P.grisS : P.cairo); }
    // la meseta de Giza: la roca más clara y las tres pirámides
    for (let y = 136; y < 172; y++) for (let x = 70; x < 166; x++) { const e = ((x - 116) / 44) ** 2 + ((y - 152) / 16) ** 2 + 0.25 * h(x >> 2, y >> 2, 84); if (e < 1) R.pset(x, y, h(x, y, 83) > 0.75 ? P.calizaS : P.desL); }
    f_piramidesLejos(R, 92, 160, 1.6);
  });
  f_titilan(R, t, 40);
  f_nubesTierra(R, t, cx, cy, r, false, 6, 0.6);
  // el Nilo que brilla: destellos que corren río abajo
  for (let k = 0; k < 8; k++) { const v = ((t * 10 + k * 17) % 150) + 40, mx = 168 + 7 * Math.sin(v * 0.035) + 3 * Math.sin(v * 0.11), x = Math.round(160 + (mx - 160) / 0.55), lim = cy - Math.sqrt(r * r - (x - cx) ** 2), y = Math.round(lim + (v - 4) / (1.7 * 0.55)); if (y < 180) R.pset(x, y, P.blanco); }
  // un avión diminuto con su estela
  { const u = (t % 14) / 14, ax = Math.round(-10 + u * 340), ay = Math.round(150 - u * 40); for (let i = 2; i < 26; i++) if (i % 2 === 0 || i < 8) R.pset(ax - i, ay + Math.round(i * 0.12), i < 10 ? P.blanco : P.nubeS); R.pset(ax, ay, P.blanco); R.pset(ax - 1, ay - 1, P.gris); R.pset(ax - 1, ay + 1, P.gris); }
  // la pelota del radar: baja, se aplasta contra la roca con polvo y vuelve; el satélite retrocede con el golpe
  const rb = o.rebote, S = [232, 46], I = [112, 152];
  let sx = S[0], sy = S[1] + Math.round(Math.sin(t * 0.8) * 1.2);
  if (rb != null && rb > 0.93) { const g = (rb - 0.93) / 0.07; sx -= Math.round(Math.sin(g * Math.PI) * 5); sy -= Math.round(Math.sin(g * Math.PI) * 3); }
  const sat = f_satelite(R, sx, sy, t, 1.15);
  if (rb != null && rb > 0 && rb < 1) {
    const ida = rb < 0.45, pega = rb >= 0.45 && rb < 0.55, f = ida ? rb / 0.45 : pega ? 1 : 1 - (rb - 0.55) / 0.4;
    const bx = lerp(sat.radar[0], I[0], f), by = lerp(sat.radar[1], I[1], f) - (ida ? 0 : Math.sin(f * Math.PI) * 18);
    // la estela de puntos
    for (let i = 1; i < 9; i++) { const g = Math.max(0, Math.min(1, f + (ida ? -1 : 1) * i * 0.035)), tx = lerp(sat.radar[0], I[0], g), ty = lerp(sat.radar[1], I[1], g) - (ida ? 0 : Math.sin(g * Math.PI) * 18); if (i % 2) R.pset(Math.round(tx), Math.round(ty), i < 4 ? P.onda : P.ondaS); }
    const ap = pega ? 1 - Math.abs((rb - 0.5) / 0.05) : 0, rx = 7 + ap * 4, ry = 7 - ap * 3.5;
    for (let j = -8; j <= 8; j++) for (let i = -11; i <= 11; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e <= 1) R.pset(Math.round(bx + i), Math.round(by + j + ap * 2), e > 0.7 ? P.ondaS : (i < -1 && j < -1) ? P.blanco : P.onda); }
    R.pset(Math.round(bx) - 2, Math.round(by) - 3, P.blanco);
    // el aro de la onda alrededor y el polvo que salta al chocar
    if (pega || (rb > 0.55 && rb < 0.66)) { const g = pega ? (rb - 0.45) / 0.1 : 1 + (rb - 0.55) / 0.11;
      for (let k = 0; k < 10; k++) { const a = Math.PI + k / 9 * Math.PI, d = 3 + g * 9; R.pset(Math.round(I[0] + Math.cos(a) * d * 1.4), Math.round(I[1] + 4 + Math.sin(a) * d * 0.6), k % 2 ? P.desL : P.calizaL); }
      for (let a = 0; a < Math.PI * 2; a += 0.15) R.pset(Math.round(I[0] + Math.cos(a) * g * 9), Math.round(I[1] + 5 + Math.sin(a) * g * 3), P.ondaS); }
  }
  return { suelo: null, satelite: sat.cuerpo, radar: sat.radar, roca: I, piramides: [92, 160], cairo: [204, 114], horizonte: 40 };
}

// la pirámide de la meseta en el corte (sin escala): las dos caras con las hiladas, las piedras sueltas y la base
function f_piramideCorte(R, cx, base, al) {
  const P = f_P, an = al * 1.25;
  R.poligono([[cx - an - 1, base + 1], [cx, base - al - 1], [cx + an + 1, base + 1]], P.k);
  R.poligono([[cx - an, base], [cx, base - al], [cx, base]], P.caliza); R.poligono([[cx, base - al], [cx + an, base], [cx, base]], P.calizaS);
  for (let j = 3; j < al; j += 3) { const w = an * (1 - j / al); R.linea(Math.round(cx - w), base - j, cx - 1, base - j, P.calizaO); R.linea(cx + 1, base - j, Math.round(cx + w), base - j, P.calizaO);
    for (let i = 0; i < w * 2; i += 7) R.pset(Math.round(cx - w + i + (j % 6)), base - j + 1, (i / 7) % 2 ? P.calizaO : P.calizaL); }
  R.linea(cx, base - al, cx, base, P.calizaL);
}

// un camello de perfil que camina despacio (x: el centro, suelo, dir), con las patas que se alternan y la cabeza que
// cabecea; pequeño (16 px de alto), de fondo
function f_camello(R, x, suelo, t, dir = 1) {
  const P = f_P, c = hex('#c89a5a'), cS = hex('#8e6a38'), X = (i) => Math.round(x + i * dir), p = Math.sin(t * 5);
  for (const [i, ph] of [[-5, 0], [-3, 1], [3, 1], [5, 0]]) { const dx = Math.round((ph ? p : -p) * 1.2); R.linea(X(i), suelo - 7, X(i) + dx, suelo, ph ? cS : c); }
  R.disco(X(0), suelo - 9, 4, c); R.disco(X(-1), suelo - 11, 3, c); R.disco(X(-1), suelo - 13, 2, c); R.rect(Math.min(X(-6), X(6)), suelo - 9, Math.max(X(-6), X(6)), suelo - 7, c);
  R.pset(X(-2), suelo - 14, hex('#e0b878')); R.linea(X(-6), suelo - 9, X(-8), suelo - 5, cS);
  const cb = Math.round(Math.sin(t * 5 + 1) * 0.8); R.linea(X(6), suelo - 9, X(9), suelo - 14 + cb, c); R.rect(Math.min(X(9), X(12)), suelo - 15 + cb, Math.max(X(9), X(12)), suelo - 13 + cb, c); R.pset(X(10), suelo - 15 + cb, P.k);
  // la manta roja con borlas
  R.rect(Math.min(X(-3), X(3)), suelo - 12, Math.max(X(-3), X(3)), suelo - 10, P.kilim); R.pset(X(-3), suelo - 9, P.kilimL); R.pset(X(3), suelo - 9, P.kilimL);
}

// una palmera datilera (x: el pie, suelo, alto) con el tronco anillado y las hojas que se mecen con el viento
function f_palmera(R, x, suelo, al, t, k = 0) {
  const P = f_P, m = Math.sin(t * 1.1 + k) * 1.5;
  for (let j = 0; j < al; j++) { const xx = Math.round(x + Math.sin(j / al * 1.4) * 4 + m * (j / al)); R.rect(xx, suelo - j, xx + 2, suelo - j, j % 3 === 0 ? P.troncoS : P.tronco); }
  const tx = Math.round(x + Math.sin(1.4) * 4 + m), ty = suelo - al;
  for (let f = 0; f < 8; f++) { const an = -Math.PI + f * Math.PI / 7 + Math.sin(t * 1.6 + f + k) * 0.08, L = 13 + (f % 2) * 4;
    for (let s = 0; s < L; s++) { const xx = Math.round(tx + 1 + Math.cos(an) * s), yy = Math.round(ty + Math.sin(an) * s * 0.7 + s * s * 0.03); R.pset(xx, yy, P.hojaS); if (s > 2 && s % 2) { R.pset(xx, yy + 1, P.hoja); R.pset(xx + (Math.cos(an) > 0 ? -1 : 1), yy + 2, s % 4 === 1 ? P.hojaL : P.hoja); } } }
  R.disco(tx + 1, ty + 2, 2, P.cafe); R.pset(tx + 2, ty + 3, P.kilimL);
}

// el corte del suelo de Giza (ver la cabecera de hoy). Escala: la superficie en y 64 y 10 m = 22 px (10 m en y 86, 20 m
// en 108, 30 en 130, 40 en 152); el agua subterránea desde y 140 (unos 35 m) hacia abajo
function f_corte(R, t, o) {
  const { rect, pset, linea, disco } = R, P = f_P, S0 = 64, Y = (m) => S0 + m * 2.2, AG = 140;
  const capa = (x, y) => { const b1 = 77 + 2 * Math.sin(x * 0.03), b2 = 100 + 3 * Math.sin(x * 0.025 + 1), b3 = 124 + 3 * Math.sin(x * 0.02 + 2), b4 = 150 + 2 * Math.sin(x * 0.035 + 3);
    return y < b1 ? 0 : y < b2 ? 1 : y < b3 ? 2 : y < b4 ? 3 : 4; };
  f_capa(R, 'gz-corte', () => {
    // el cielo tramado y las dunas lejanas con la bruma
    for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { const v = y / 60 * 2 + (((x + y * 3) % 4) / 4 - 0.4) * 0.5; pset(x, y, v < 0.7 ? P.cielo0 : v < 1.4 ? P.cielo1 : P.cielo2); }
    for (let x = 0; x < 320; x++) { const d1 = 52 + Math.round(3 * Math.sin(x * 0.04) + 2 * Math.sin(x * 0.11)), d2 = 56 + Math.round(2 * Math.sin(x * 0.06 + 2));
      for (let y = d1; y < 60; y++) pset(x, y, (x + y) % 2 ? P.areL : P.cielo2); for (let y = d2; y < 60; y++) pset(x, y, y === d2 ? P.areL : P.are); }
    // la superficie de la meseta: arena con piedras, huellas y su filo
    for (let y = 58; y <= S0; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 30) > 0.85 ? P.areS : y === S0 ? P.areS : P.are);
    for (let i = 0; i < 30; i++) { const x = Math.floor(h(i, 1, 31) * 320), y = 59 + Math.floor(h(i, 2, 31) * 4); pset(x, y, P.calizaO); pset(x + 1, y, P.calizaL); }
    for (let i = 0; i < 12; i++) pset(20 + i * 9, 61 + (i % 2), P.areS);
    // bajo tierra: la arena con granos, la caliza en capas (luz arriba de cada capa, juntas, numulites, grietas)
    const cols = [[P.cal0, P.calizaL, P.cal1], [P.cal1, P.cal0, P.cal2], [P.cal2, P.cal1, P.cal3], [P.cal3, P.cal2, P.cal4], [P.cal4, P.cal3, hex('#4e3e2a')]];
    for (let y = S0 + 1; y < 180; y++) for (let x = 0; x < 320; x++) {
      if (y < 76 + Math.round(Math.sin(x * 0.07) * 1.5)) { const g = h(x, y, 32); pset(x, y, g > 0.8 ? P.areS : g < 0.12 ? P.areL : P.are); continue; }
      const k = capa(x, y), [c, cL, cS] = cols[k], k1 = capa(x, y - 1), k2 = capa(x, y + 2), g = h(x >> 1, y, 33 + k);
      let cc = k1 !== k ? P.k : k2 !== k ? cS : g > 0.88 ? cS : g < 0.08 ? cL : ((y + (x >> 3)) % 7 === 0 && g > 0.4) ? cS : c;
      if (k1 !== k && (x + y) % 2) cc = cL; pset(x, y, cc); }
    // los fósiles de numulites (moneditas de piedra con su espiral) y las grietas
    for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 3, 34) * 318), y = 80 + Math.floor(h(i, 4, 34) * 96), r = 1 + (i % 3 === 0 ? 1 : 0); disco(x, y, r, P.fosil); pset(x, y, P.cal2); if (r > 1) { pset(x + 1, y, P.cal2); pset(x - 1, y - 1, P.blanco); } }
    for (let i = 0; i < 9; i++) { let x = 10 + Math.floor(h(i, 5, 35) * 300), y = 80 + Math.floor(h(i, 6, 35) * 70); for (let s = 0; s < 22; s++) { pset(x, y, P.cal4); pset(x + 1, y, P.cal1); x += h(i, s, 36) > 0.5 ? 1 : -1; y += 1; } }
    // piedras sueltas y guijarros en la arena
    for (let i = 0; i < 26; i++) { const x = Math.floor(h(i, 7, 37) * 320), y = 67 + Math.floor(h(i, 8, 37) * 8); rect(x, y, x + 2, y + 1, P.calizaO); pset(x, y, P.calizaL); }
    // la regla de cotas a la izquierda: un listón de madera con rayas cada 5 m y su sombra
    rect(2, S0, 9, 179, P.k); rect(3, S0, 8, 179, P.papel); rect(8, S0, 8, 179, P.papelS);
    for (let m = 0; m <= 52; m += 5) { const y = Math.round(Y(m)); rect(3, y, m % 10 === 0 ? 8 : 6, y, m % 10 === 0 ? P.kilim : P.tinta); }
  });
  // las nubes que pasan, los pájaros, la pirámide, la palmera y el camello que camina
  R.recorte([0, 0, 319, 50]);
  for (const [v, yy, ww, f] of [[1.2, 16, 18, 0], [2.4, 30, 13, 0.5], [3.9, 40, 9, 0.25]]) f_nube(R, -30 + ((t * v + f * 380) % 380), yy, ww, t, f * 9);
  for (let p = 0; p < 3; p++) f_pajaro(R, ((t * 9 + p * 7) % 360) - 20, 30 + p * 2 + Math.sin(t * 2 + p) * 1.5, t, p);
  R.recorte(null);
  f_piramideCorte(R, 206, S0 - 1, 44);
  f_palmera(R, 34, S0, 28, t, 1); f_palmera(R, 262, S0, 22, t, 2);
  f_camello(R, 24 + ((t * 3) % 120), S0, t, 1);
  const rd = Math.max(0, Math.min(1, o.radar ?? 0));
  // la onda del radar: baja del cielo, entra en la arena y se apaga en unos diez metros
  if (rd > 0) {
    const yf = rd < 0.4 ? lerp(-4, S0, rd / 0.4) : rd < 0.85 ? lerp(S0, Y(10), (rd - 0.4) / 0.45) : Y(10), dentro = yf > S0;
    if (yf > S0) for (let y = S0 + 1; y < yf; y++) for (let x = 44; x < 196; x++) if ((x * 3 + y * 5 + Math.floor(t * 6)) % 11 === 0) pset(x, y, P.ondaS);
    for (let x = 44; x < 196; x++) { const y = Math.round(yf + Math.sin(x * 0.22 - t * 8) * 1.6); if (!dentro || (x + Math.floor(t * 10)) % (rd < 0.85 ? 1 : 2) === 0) { pset(x, y, P.onda); if (!dentro) pset(x, y - 1, P.ondaS); } }
    for (let x = 52; x < 196; x += 18) for (let y = 0; y < Math.min(yf, S0); y += 3) pset(x + Math.round(Math.sin(y * 0.3 + t * 5)), y, P.onda);
    if (rd >= 0.85) for (let k = 0; k < 3; k++) { const f = (t * 0.7 + k / 3) % 1, y = Math.round(Y(10) - f * 22); for (let x = 60 + k * 40; x < 84 + k * 40; x++) if ((x + k) % 2) pset(x, y, f < 0.5 ? P.onda : P.ondaS); }
  }
  // el agua subterránea: llena los poros de la roca desde abajo hasta y 140, con su filo que brilla y burbujas
  const ag = Math.max(0, Math.min(1, o.agua ?? 0));
  if (ag > 0) { const nivel = Math.round(lerp(180, AG, ag));
    for (let y = nivel; y < 180; y++) for (let x = 12; x < 320; x++) { const g = h(x >> 1, y >> 1, 38); if (g > 0.82) continue; const w = Math.sin(x * 0.12 + y * 0.5 - t * 2.5) + 0.5 * Math.sin(x * 0.05 - t); pset(x, y, y === nivel ? P.aguaL : w > 1.1 ? P.aguaL : w < -0.9 ? P.aguaS : (y + (x >> 2)) % 4 === 0 ? P.aguaS : P.agua); }
    for (let x = 12; x < 320; x++) if (Math.sin(x * 0.3 - t * 3) > 0.6) pset(x, nivel - 1, P.aguaB);
    for (let k = 0; k < 10; k++) { const f = (t * 0.4 + h(k, 1, 39)) % 1, x = 20 + Math.floor(h(k, 2, 39) * 290), y = Math.round(178 - f * (178 - nivel)); if (y > nivel) { pset(x, y, P.aguaB); pset(x + 1, y - 1, P.aguaL); } } }
  // las cotas: 10, 20, 30, 40 (la de 10 se ilumina cuando la onda se para ahí)
  for (const m of [10, 20, 30, 40, 50]) { const y = Math.round(Y(m)), luce = m === 10 && rd > 0.8; if (luce) for (let x = 2; x < 34; x++) if ((x + y) % 2) pset(x, y, P.onda);
    R.numero(String(m), 12, y + 4, { rampa: luce ? [P.ondaS, P.blanco, P.onda] : [P.k, P.blanco, P.papel] }); }
  return { suelo: S0, superficie: S0, piramide: { x: 206, base: S0, alto: 44 }, cotas: { 10: Y(10), 20: Y(20), 30: Y(30), 40: Y(40) }, agua: AG, regla: [2, S0, 9, 179], libre: [14, 140] };
}

// el campo de pruebas del georradar (ver la cabecera de hoy). Geometría: el suelo de los personajes y = 160 (entre 140
// y 172); la camioneta x 226–306 (portezuela abierta a la izquierda, x 222); la mesa plegable x 18–64 (tablero y 136)
function f_campo(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, P = f_P, VP = [160, 70];
  f_capa(R, 'gz-campo', () => {
    for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) { const v = y / 80 * 2 + (((x + y * 3) % 4) / 4 - 0.4) * 0.5; pset(x, y, v < 0.7 ? P.cielo0 : v < 1.4 ? P.cielo1 : P.cielo2); }
    // las Montañas Rocosas al fondo: dos cordilleras con nieve en las cumbres y su sombra
    for (let x = 0; x < 320; x++) { const m1 = 58 + Math.round(10 * Math.abs(Math.sin(x * 0.021 + 1)) * -1 + 8 * Math.sin(x * 0.05) + 4 * Math.sin(x * 0.13)), m2 = 74 + Math.round(5 * Math.sin(x * 0.04 + 2) + 3 * Math.sin(x * 0.17));
      for (let y = Math.max(46, m1); y < 96; y++) { const ny = y - m1; pset(x, y, ny < 4 + Math.sin(x * 0.5) * 2 ? (Math.sin(x * 0.21) > 0 ? P.blanco : P.gris) : (Math.sin(x * 0.21 + y * 0.1) > 0.3 ? P.monte : P.monteS)); }
      for (let y = m2; y < 96; y++) pset(x, y, (x + y) % 5 === 0 ? P.monte : P.monteS); }
    // el bosque de abetos
    for (let i = 0; i < 70; i++) { const x = Math.floor(h(i, 1, 50) * 330) - 5, al = 7 + Math.floor(h(i, 2, 50) * 7), b = 98 + Math.floor(h(i, 3, 50) * 4);
      for (let j = 0; j < al; j++) { const w = Math.floor((j + 1) * 0.45); rect(x - w, b - al + j, x + w, b - al + j, j % 3 === 0 ? P.bosqueS : P.bosque); pset(x - w, b - al + j, P.hojaS); } }
    // el prado: hierba con matas y flores en tres tonos, más grandes cerca
    for (let y = 98; y < 180; y++) for (let x = 0; x < 320; x++) { const e = (y - 98) / 82, g = h(x >> (e > 0.5 ? 1 : 0), y, 51); pset(x, y, g > 0.86 ? P.hierbaL : g < 0.2 ? P.hierbaS : ((x + y * 2) % 7 === 0 ? P.hierbaS : P.hierba)); }
    for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 4, 52) * 320), y = 104 + Math.floor(h(i, 5, 52) * 74); pset(x, y, i % 3 ? P.amarillo : P.blanco); }
    // la valla de madera con sus postes y dos alambres
    for (let x = 0; x < 320; x += 16) { rect(x, 92, x + 1, 104, P.vallaS); rect(x, 92, x, 104, P.valla); }
    for (const y of [95, 99]) linea(0, y, 319, y, P.grisS);
    // el camino de tierra con roderas hacia la camioneta
    for (let y = 104; y < 180; y++) { const a = 250 - (y - 104) * 0.5, b = 274 + (y - 104) * 0.8; for (let x = Math.round(a); x < b; x++) pset(x, y, h(x, y, 53) > 0.8 ? P.areS : (x - a < 3 || b - x < 3) ? P.hierbaS : P.cal0); }
    // la cuadrícula de cuerdas en perspectiva, con estacas
    const filas = [114, 126, 142, 164];
    for (const y of filas) { const e = (y - VP[1]) / 110, x0 = 160 - 150 * e * 1.4, x1 = 160 + 120 * e * 1.4; for (let x = Math.round(x0); x < x1; x++) if (x % 2 === 0) pset(x, y, P.blanco); }
    for (let k = -2; k <= 2; k++) for (let y = filas[0]; y <= filas[3]; y++) { const e = (y - VP[1]) / 110, x = Math.round(160 + k * 52 * e * 1.4); if (y % 2 === 0) pset(x, y, P.blanco); }
    // la camioneta roja: caja con portezuela bajada y cajas de material, cabina, ruedas y su sombra
    { const cx = 226, b = 150; for (let x = cx - 2; x < cx + 84; x++) for (let y = b - 1; y < b + 3; y++) if ((x + y) % 2) pset(x, y, P.hierbaS);
      rect(cx, b - 22, cx + 46, b - 8, P.k); rect(cx + 1, b - 21, cx + 45, b - 9, P.camion); rect(cx + 1, b - 21, cx + 45, b - 20, P.camionL); rect(cx + 1, b - 11, cx + 45, b - 9, P.camionS);
      rect(cx + 46, b - 32, cx + 70, b - 8, P.k); rect(cx + 47, b - 31, cx + 69, b - 9, P.camion); rect(cx + 50, b - 29, cx + 66, b - 20, P.cristal); linea(cx + 52, b - 28, cx + 57, b - 22, P.cielo2); rect(cx + 47, b - 31, cx + 69, b - 30, P.camionL);
      rect(cx + 70, b - 22, cx + 80, b - 8, P.k); rect(cx + 71, b - 21, cx + 79, b - 9, P.camion); rect(cx + 77, b - 19, cx + 79, b - 16, P.amarillo); rect(cx + 72, b - 12, cx + 80, b - 10, P.gris);
      for (const wx of [cx + 12, cx + 62]) { disco(wx, b - 6, 7, P.k); disco(wx, b - 6, 4, P.grisD); disco(wx, b - 6, 2, P.gris); }
      rect(cx - 8, b - 10, cx, b - 8, P.k); rect(cx - 7, b - 10, cx - 1, b - 9, P.camionS);
      for (const [bx, bw, c] of [[cx + 4, 12, P.cafeL], [cx + 18, 10, P.grisS], [cx + 30, 12, P.bandera]]) { rect(bx, b - 30, bx + bw, b - 22, P.k); rect(bx + 1, b - 29, bx + bw - 1, b - 22, c); rect(bx + 1, b - 29, bx + bw - 1, b - 29, P.blanco); } }
    // la mesa plegable con su sombra
    for (let x = 16; x < 70; x++) for (let y = 152; y < 155; y++) if ((x + y) % 2) pset(x, y, P.hierbaS);
    rect(18, 134, 64, 137, P.k); rect(19, 134, 63, 135, P.blanco); for (const lx of [22, 60]) { linea(lx, 137, lx - 3, 153, P.grisD); linea(lx, 137, lx + 3, 153, P.grisD); }
    // la caja del material con el cable enrollado
    rect(72, 140, 90, 152, P.k); rect(73, 141, 89, 151, hex('#e8b030')); rect(73, 141, 89, 142, hex('#f8d070')); rect(78, 145, 84, 146, P.k);
    disco(98, 150, 4, P.k); disco(98, 150, 3, P.grisD); disco(98, 150, 1, P.k);
  });
  // las nubes por encima de los montes y los pájaros
  R.recorte([0, 0, 319, 54]);
  for (const [v, yy, ww, f] of [[1.0, 16, 22, 0], [2.0, 32, 15, 0.5], [3.4, 44, 10, 0.25]]) f_nube(R, -30 + ((t * v + f * 380) % 380), yy, ww, t, f * 9);
  for (let p = 0; p < 4; p++) f_pajaro(R, ((t * 11 + p * 6) % 360) - 20, 36 + p * 2 + Math.sin(t * 2 + p) * 1.5, t, p);
  R.recorte(null);
  // las banderitas naranjas de las estacas, que ondean
  const filas = [114, 126, 142, 164];
  for (const y of filas) for (let k = -2; k <= 2; k++) { const e = (y - VP[1]) / 110, x = Math.round(160 + k * 52 * e * 1.4), al = Math.round(4 + e * 6), s = Math.max(1, Math.round(e * 3));
    linea(x, y, x, y - al, P.k); for (let i = 0; i < s + 2; i++) for (let j = 0; j < s + 1; j++) pset(x + 1 + i, y - al + j + Math.round(Math.sin(t * 6 + i * 0.8 + k + y) * 0.6 * (i / (s + 2))), j === 0 ? P.camionL : P.bandera); }
  // la manga de viento en su poste
  { const mx = 120, my = 74; rect(mx, my, mx + 1, 104, P.grisD); for (let i = 0; i < 12; i++) { const yy = Math.round(my + 1 + i * 0.25 + Math.sin(t * 4 - i * 0.5) * (i / 12) * 1.5), w = Math.max(1, Math.round(2.5 - i * 0.15)); for (let j = -w; j <= w; j++) pset(mx + 2 + i, yy + j, (i >> 2) % 2 ? P.blanco : P.bandera); } }
  // la sombrilla y el portátil de la mesa, con la pantalla del radargrama que avanza
  { const sx = 40, u = Math.sin(t * 2) * 0.6; linea(sx, 134, sx + 2, 98, P.grisD); poligono([[sx - 20, 108 + u], [sx + 2, 96], [sx + 24, 108 - u]], P.k); poligono([[sx - 18, 107 + u], [sx + 2, 97], [sx + 22, 107 - u]], P.bandera);
    for (let i = -16; i <= 20; i += 6) linea(sx + 2, 97, sx + i, 107, P.camionS); for (let i = -18; i <= 22; i += 4) pset(sx + i, 108 + Math.round(u * (i < 2 ? 1 : -1)), P.blanco);
    rect(26, 122, 46, 134, P.k); rect(27, 123, 45, 132, P.pant); for (let i = 0; i < 18; i++) { const x = 27 + i, yy = 125 + Math.round(Math.sin((i + Math.floor(t * 6)) * 0.5) * 1.5); pset(x, yy, P.pantL); if ((i + Math.floor(t * 6)) % 9 < 4) pset(x, 129 - Math.round(Math.abs(Math.sin((i + Math.floor(t * 6)) * 0.35)) * 2), P.amarillo); }
    rect(24, 133, 48, 134, P.grisS); rect(52, 131, 58, 134, P.k); rect(53, 132, 57, 134, P.blanco); }
  // briznas de hierba que se mecen por el prado
  for (let i = 0; i < 40; i++) { const x = Math.floor(h(i, 8, 54) * 320), y = 110 + Math.floor(h(i, 9, 54) * 66), al = 2 + Math.floor((y - 100) / 20), m = Math.round(Math.sin(t * 2.5 + x * 0.05) * al * 0.4); linea(x, y, x + m, y - al, i % 2 ? P.hierbaL : P.hierbaS); }
  return { suelo: 160, sueloMin: 140, sueloMax: 172, camioneta: { x0: 226, x1: 306, b: 150, portezuela: [222, 140] }, mesa: { x0: 18, x1: 64, y: 134 }, portatil: [36, 128], filas: [114, 126, 142, 164], manga: [120, 74] };
}

// lo de delante del campo: dos matas altas de hierba que se mecen en las esquinas de abajo
function f_campoDelante(R, t, o) {
  const P = f_P;
  for (const [x0, x1] of [[0, 30], [290, 320]]) for (let i = 0; i < 18; i++) { const x = x0 + Math.floor(h(i, 1, 55) * (x1 - x0)), al = 10 + Math.floor(h(i, 2, 55) * 14), m = Math.sin(t * 2.2 + i) * 3;
    for (let s = 0; s < al; s++) { const xx = Math.round(x + m * (s / al) ** 2), yy = 179 - s; R.pset(xx, yy, s > al - 4 ? P.hierbaL : i % 2 ? P.hierba : P.hierbaS); } }
  return {};
}

// la ciudad europea por los ventanales [x0, y0, x1, y1]: el cielo con nubes y palomas, los tejados de pizarra con
// mansardas y chimeneas, la cúpula de cobre verde, la torre del reloj (las agujas andan) y una grúa que gira despacio
function f_vistaEuropa(R, x0, y0, x1, y1, t) {
  const { rect, pset, disco, poligono, linea } = R, P = f_P, b = y1;
  f_cielo(R, x0, y0, x1, y1, t, 4);
  // la grúa al fondo, con la pluma que gira un poco y el cable con su carga
  { const gx = x0 + 18, gy = b - 52, a = Math.sin(t * 0.25) * 6; rect(gx, gy, gx + 1, b, P.amarillo); for (let y = gy; y < b; y += 3) pset(gx + (y % 2), y, P.camionS);
    linea(gx - 10 + a * 0.3, gy, gx + 34 + a, gy - 1, P.amarillo); linea(gx + 26 + a, gy - 1, gx + 26 + a, gy + 14, P.grisD); rect(gx + 24 + a, gy + 14, gx + 28 + a, gy + 17, P.grisS); }
  // edificios del fondo azulados
  for (let i = 0; i < 9; i++) { const bx = x0 + i * 18 - 4, al = 26 + Math.round(h(i, 1, 60) * 12); rect(bx, b - al, bx + 16, b, P.monte); for (let y = b - al + 3; y < b; y += 4) for (let x = bx + 2; x < bx + 15; x += 3) pset(x, y, P.monteS); }
  // la cúpula de cobre verde con su linterna y la torre del reloj
  { const cx = x0 + 70, cb = b - 30; rect(cx - 13, cb, cx + 13, b, P.piedra); for (let x = cx - 11; x < cx + 12; x += 4) rect(x, cb + 3, x + 1, cb + 10, P.piedraS);
    for (let j = 0; j <= 13; j++) { const w = Math.round(Math.sqrt(169 - j * j)); rect(cx - w, cb - j, cx + w, cb - j, j > 9 ? hex('#7ab8a0') : hex('#5a9a84')); pset(cx + w, cb - j, hex('#3e7a66')); }
    for (let k = -2; k <= 2; k++) linea(cx + k * 4, cb, cx + k * 1.5, cb - 12, hex('#3e7a66')); rect(cx - 2, cb - 19, cx + 2, cb - 13, P.piedra); rect(cx - 1, cb - 23, cx + 1, cb - 19, hex('#5a9a84')); pset(cx, cb - 24, P.oro); }
  { const tx = x1 - 28, tb = b; rect(tx, tb - 58, tx + 12, tb, P.piedra); rect(tx + 10, tb - 58, tx + 12, tb, P.piedraS); for (let y = tb - 54; y < tb; y += 4) rect(tx, y, tx + 12, y, P.piedraS);
    poligono([[tx - 1, tb - 58], [tx + 6, tb - 74], [tx + 13, tb - 58]], P.pizarra); linea(tx + 6, tb - 74, tx + 13, tb - 58, P.pizarraS); pset(tx + 6, tb - 75, P.oro);
    const cx = tx + 6, cy = tb - 48; disco(cx, cy, 5, P.k); disco(cx, cy, 4, P.blanco); const am = t * 0.08, ah = t * 0.007; linea(cx, cy, Math.round(cx + Math.sin(am) * 3), Math.round(cy - Math.cos(am) * 3), P.k); linea(cx, cy, Math.round(cx + Math.sin(ah) * 2), Math.round(cy - Math.cos(ah) * 2), P.k); }
  // los tejados de pizarra de delante con mansardas, buhardillas y chimeneas que humean
  for (let i = 0; i < 6; i++) { const bx = x0 + i * 28 - 8, w = 26, top = b - 20 - Math.round(h(i, 2, 61) * 6);
    rect(bx, top + 8, bx + w, b, i % 2 ? P.muro : P.piedra); for (let x = bx + 3; x < bx + w - 3; x += 6) { rect(x, top + 11, x + 2, top + 15, P.cristal); pset(x, top + 11, P.cielo2); }
    poligono([[bx - 1, top + 8], [bx + 4, top], [bx + w - 4, top], [bx + w + 1, top + 8]], P.pizarra); for (let y = top + 2; y < top + 8; y += 2) linea(bx + 2, y, bx + w - 2, y, P.pizarraS); linea(bx + 4, top, bx + w - 4, top, P.pizarraL);
    if (i % 2 === 0) { rect(bx + 10, top + 2, bx + 14, top + 7, P.muro); pset(bx + 12, top + 4, P.cristal); }
    const chx = bx + w - 8; rect(chx, top - 5, chx + 3, top, P.ladR); rect(chx - 1, top - 6, chx + 4, top - 5, P.k);
    if (i % 3 === 1) for (let p = 0; p < 4; p++) { const f = (t * 0.3 + p / 4) % 1; disco(chx + 2 + f * 7, top - 7 - f * 12, 1 + f * 1.8, f < 0.5 ? P.nube : P.nubeS); } }
  // las palomas que se posan y echan a volar en el alero
  for (let k = 0; k < 3; k++) { const c = (t * 0.2 + k * 0.33) % 1, px = x0 + 30 + k * 34, py = b - 24; if (c < 0.6) { pset(px, py, P.grisD); pset(px + 1, py - 1, P.grisS); pset(px + 2, py, P.grisD); }
    else f_pajaro(R, px + (c - 0.6) * 90, py - (c - 0.6) * 60, t, k, P.grisD); }
  R.recorte(null);
}

// una portada enmarcada sin letras (x0, y0, w, al) con su dibujo: 'piramide' | 'atomo' | 'helice'
function f_portada(R, x0, y0, w, al, dib) {
  const { rect, pset, linea, disco, poligono } = R, P = f_P;
  rect(x0 - 2, y0 - 2, x0 + w + 2, y0 + al + 2, P.k); rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + al + 1, P.metalS); rect(x0, y0, x0 + w, y0 + al, P.blanco);
  rect(x0, y0, x0 + w, y0 + 3, dib === 'atomo' ? P.kilim : dib === 'helice' ? P.verdeB : P.azul0);
  const cx = x0 + (w >> 1), cy = y0 + 4 + ((al - 8) >> 1);
  rect(x0 + 2, y0 + 5, x0 + w - 2, y0 + al - 5, P.pant);
  if (dib === 'piramide') { poligono([[cx - 7, cy + 5], [cx, cy - 6], [cx + 7, cy + 5]], P.pantL); poligono([[cx - 5, cy + 4], [cx, cy - 4], [cx + 5, cy + 4]], P.pant); linea(cx, cy + 4, cx + 2, cy, P.pantL); }
  if (dib === 'atomo') { for (let a = 0; a < 6.28; a += 0.2) { pset(Math.round(cx + Math.cos(a) * 7), Math.round(cy + Math.sin(a) * 3), P.pantL); pset(Math.round(cx + Math.sin(a) * 3), Math.round(cy + Math.cos(a) * 6), P.pantV); } disco(cx, cy, 1.5, P.amarillo); }
  if (dib === 'helice') for (let j = -7; j <= 7; j++) { const a = j * 0.6; pset(Math.round(cx + Math.sin(a) * 4), cy + j, P.pantV); pset(Math.round(cx - Math.sin(a) * 4), cy + j, P.pantL); if (j % 2 === 0) linea(Math.round(cx + Math.sin(a) * 4), cy + j, Math.round(cx - Math.sin(a) * 4), cy + j, P.grisD); }
  for (let y = y0 + al - 3; y < y0 + al; y += 2) rect(x0 + 2, y, x0 + w - 4, y, P.grisS);
}

// la redacción (ver la cabecera de hoy). Geometría: el suelo de los editores y = 170 (detrás de la mesa de delante,
// tablero y 162–166, x 22–198: asoman cabeza y hombros; x 56–100 y 120–168 libres); los autores, de pie detrás de la
// mesa del fondo, y = 140 (tablero y 130–134, x 204–314; x 230–286 libres entre las dos pantallas); la revista en
// (110, 162); los ventanales x 10–164, y 20–94
function f_redaccion(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = f_P;
  f_capa(R, 'gz-redaccion', () => {
    // el techo de yeso con vigas suaves
    rect(0, 0, 319, 13, P.yeso); for (let x = 30; x < 320; x += 60) { rect(x, 0, x + 7, 11, P.yesoS); rect(x, 11, x + 7, 11, P.molduraS); } rect(0, 12, 319, 13, P.yesoS);
    // el ladrillo visto (aparejo a soga, juntas claras y piezas de tono variado); arriba a la derecha, encalado y liso
    for (let y = 14; y < 120; y++) for (let x = 0; x < 320; x++) { const fila = (y - 14) >> 2, jx = (x + (fila % 2) * 6) % 12, junta = (y - 14) % 4 === 3 || jx === 11;
      let c = junta ? P.junta : (h((x + (fila % 2) * 6) / 12 | 0, fila, 62) > 0.7 ? P.ladRL : h((x + (fila % 2) * 6) / 12 | 0, fila, 63) < 0.2 ? P.ladRS : P.ladR);
      if (x > 268 && y < 52) c = junta ? P.yeso : (h(x, y, 64) > 0.9 ? P.yesoS : P.yeso); pset(x, y, c); }
    rect(268, 14, 268, 52, P.yesoS); rect(268, 52, 319, 53, P.yesoS);
    // el zócalo y el suelo de tarima de roble
    rect(0, 118, 319, 121, P.vigaL); rect(0, 118, 319, 118, P.moldura); f_tablas(R, 0, 122, 319, 179, [P.tablaL, P.tabla, P.sol, P.tablaS], 3);
    // los ventanales de acero (el exterior, por fotograma) y su repisa
    rect(8, 18, 166, 96, P.k); rect(4, 95, 170, 99, P.piedraS); rect(4, 95, 170, 95, P.piedra);
    // los radiadores bajo las ventanas
    for (const x0 of [16, 92]) { rect(x0, 102, x0 + 60, 116, P.k); rect(x0 + 1, 103, x0 + 59, 115, P.mesaB); for (let x = x0 + 3; x < x0 + 58; x += 4) rect(x, 104, x + 1, 114, P.mesaBS); }
    // las portadas enmarcadas sin letras
    f_portada(R, 178, 24, 22, 30, 'piramide'); f_portada(R, 210, 24, 22, 30, 'atomo'); f_portada(R, 242, 24, 22, 30, 'helice');
    // la estantería de tomos encuadernados (lomos con bandas doradas) y cajas de archivo
    rect(176, 62, 266, 120, P.k); rect(177, 63, 265, 119, P.vigaS); for (const y of [82, 102]) { rect(177, y, 265, y + 2, P.vigaL); rect(177, y + 3, 265, y + 3, P.k); }
    rect(177, 63, 265, 64, P.vigaL);
    for (const [base, k] of [[82, 7], [102, 8], [119, 9]]) { let x = 179; for (let i = 0; i < 22 && x < 262; i++) { const w = 3 + Math.floor(h(i, k, 65) * 2), al = 13 + Math.floor(h(i, k, 66) * 4), c = [P.kilimS, P.azul0, P.verdeBS, P.vigaL][i % 4];
      if (h(i, k, 67) > 0.85) { rect(x, base - 12, x + 8, base - 1, P.k); rect(x + 1, base - 11, x + 7, base - 1, P.cafeL); rect(x + 3, base - 7, x + 5, base - 6, P.k); x += 10; continue; }
      rect(x, base - al, x + w - 1, base - 1, P.k); rect(x, base - al + 1, x + w - 2, base - 1, c); rect(x, base - al + 3, x + w - 2, base - al + 3, P.oro); rect(x, base - 4, x + w - 2, base - 4, P.oro); x += w; } }
    // el armario bajo con las pilas de revistas (PIEZAS_GZ.revista) y la impresora
    rect(270, 92, 318, 120, P.k); rect(271, 93, 317, 120, P.mesaB); rect(271, 93, 317, 94, P.blanco); rect(294, 96, 294, 119, P.mesaBS); rect(288, 106, 290, 107, P.grisD); rect(298, 106, 300, 107, P.grisD);
    for (let i = 0; i < 6; i++) { rect(274, 90 - i * 2, 290, 91 - i * 2, P.k); rect(275, 90 - i * 2, 289, 90 - i * 2, i % 2 ? P.blanco : P.azul1); }
    // el reloj de pared
    disco(290, 68, 7, P.k); disco(290, 68, 6, P.blanco);
  });
  // los ventanales: la ciudad, los montantes de acero en cuadrícula y los reflejos
  f_vistaEuropa(R, 10, 20, 164, 94, t);
  for (const x of [8, 87, 164]) rect(x, 18, x + 2, 96, P.k);
  for (let x = 28; x < 164; x += 20) if (x !== 88) rect(x, 20, x, 94, P.grisK);
  for (const y of [42, 68]) rect(10, y, 164, y, P.grisK);
  for (const d of [16, 98]) for (let i = 0; i < 14; i++) pset(d + i, 90 - i * 2, P.cielo2);
  // el reloj anda
  { const as = t * 1.05 - 1.57, am = t * 0.1; linea(290, 68, Math.round(290 + Math.cos(as) * 5), Math.round(68 + Math.sin(as) * 5), P.rojo); linea(290, 68, Math.round(290 + Math.sin(am) * 4), Math.round(68 - Math.cos(am) * 4), P.k); pset(290, 68, P.k); }
  // la impresora que escupe hojas y las lámparas que cuelgan
  { rect(296, 80, 316, 92, P.k); rect(297, 81, 315, 91, P.gris); rect(297, 81, 315, 82, P.blanco); rect(299, 86, 313, 87, P.grisK); pset(313, 84, Math.floor(t * 2) % 2 ? P.pantV : P.grisS);
    const f = (t * 0.5) % 1; if (f < 0.7) { const y = 86 + Math.round(f * 8); rect(300, y, 312, y + 2, P.blanco); rect(300, y + 2, 312, y + 2, P.papelS); } for (let i = 0; i < 3; i++) rect(298 + i, 92 - i, 314 - i, 92 - i, P.papel); }
  for (const lx of [196, 248]) { linea(lx, 0, lx, 15, P.k); poligono([[lx - 6, 21], [lx - 3, 15], [lx + 3, 15], [lx + 6, 21]], P.k); rect(lx - 4, 16, lx + 4, 20, P.verdeBS); rect(lx - 3, 16, lx + 3, 16, P.verdeBL); disco(lx, 22, 1.6, P.luz);
    for (let y = 23; y < 40; y++) for (let x = lx - 3 - (y - 23) * 0.5; x < lx + 3 + (y - 23) * 0.5; x++) if ((Math.round(x) + y * 3) % 7 === 0) pset(Math.round(x), y, P.ladRL); }
  // el ventilador de pie que gira y la planta que se mece con su aire
  { const vx = 182, vy = 112; rect(vx - 1, vy, vx + 1, 134, P.grisD); rect(vx - 7, 134, vx + 7, 136, P.k); disco(vx, vy, 9, P.grisS); disco(vx, vy, 8, P.cristal);
    for (let k = 0; k < 3; k++) { const a = t * 18 + k * 2.09; for (let s = 2; s < 8; s++) { pset(Math.round(vx + Math.cos(a) * s), Math.round(vy + Math.sin(a) * s), P.gris); pset(Math.round(vx + Math.cos(a + 0.25) * s), Math.round(vy + Math.sin(a + 0.25) * s), P.grisS); } }
    for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(vx + Math.cos(a) * 8), Math.round(vy + Math.sin(a) * 8), P.metalL); disco(vx, vy, 1.5, P.metalL); }
  { const px = 6; rect(px - 5, 124, px + 6, 136, P.k); rect(px - 4, 125, px + 5, 136, P.kilimS);
    for (let k = 0; k < 7; k++) { const an = -2.5 + k * 0.33 + Math.sin(t * 3 + k) * 0.12, L = 18 + (k % 3) * 5; let x = px, y = 124; for (let s = 0; s < L; s++) { x += Math.cos(an); y += Math.sin(an) + s * 0.03; pset(Math.round(x), Math.round(y), s % 3 ? P.hoja : P.hojaL); if (s % 2) pset(Math.round(x) + 1, Math.round(y) + 1, P.hojaS); } } }
  return { suelo: 170, editores: 170, autores: 140, mesaDelante: { x0: 22, x1: 198, y: 162 }, mesaFondo: { x0: 204, x1: 314, y: 130 }, revista: [110, 162], ventanas: [10, 20, 164, 94], portadas: [[189, 39], [221, 39], [253, 39]] };
}

// lo de delante de la redacción: la mesa del fondo (la de los autores, con dos pantallas que cambian, papeles y una taza)
// y la mesa de los editores en primer plano (las traseras de dos pantallas, bandejas, la revista en su atril, el sello)
function f_redaccionDelante(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = f_P;
  // la mesa del fondo
  rect(204, 130, 314, 134, P.k); rect(205, 130, 313, 132, P.mesaB); rect(205, 133, 313, 133, P.mesaBS); rect(208, 135, 211, 146, P.grisD); rect(307, 135, 310, 146, P.grisD); rect(210, 135, 308, 140, P.mesaBS);
  for (const [mx, k] of [[206, 0], [292, 1]]) { rect(mx, 114, mx + 18, 127, P.k); rect(mx + 1, 115, mx + 17, 125, P.pant); rect(mx + 8, 127, mx + 10, 130, P.grisD);
    const f = Math.floor(t * 0.8 + k * 3) % 3; for (let y = 117; y < 124; y += 2) rect(mx + 3, y, mx + 3 + Math.floor(h(y, f, 68 + k) * 12), y, f === 1 ? P.pantV : P.pantL); }
  for (const [px, py] of [[240, 128], [262, 129]]) { rect(px, py, px + 12, py + 1, P.k); rect(px + 1, py, px + 11, py, P.papel); } rect(284, 125, 288, 129, P.k); rect(285, 126, 287, 129, P.kilim);
  // la mesa de delante: tablero de haya, faldón con vetas y dos pantallas de espaldas
  rect(22, 162, 198, 167, P.k); rect(23, 162, 197, 164, P.tablaL); rect(23, 165, 197, 166, P.tabla); rect(26, 168, 194, 179, P.tablaS); for (let i = 0; i < 14; i++) { const vx = 28 + Math.floor(h(i, 1, 69) * 160), vy = 170 + Math.floor(h(i, 2, 69) * 9); rect(vx, vy, vx + 8, vy, P.tablaJ); }
  rect(26, 168, 194, 168, P.k); rect(100, 169, 120, 174, P.tabla); rect(108, 171, 112, 171, P.laton);
  for (const mx of [26, 170]) { rect(mx, 144, mx + 24, 159, P.k); rect(mx + 1, 145, mx + 23, 158, P.gris); rect(mx + 1, 145, mx + 23, 146, P.metalL); rect(mx + 9, 159, mx + 15, 162, P.grisD); rect(mx + 5, 161, mx + 19, 162, P.k); pset(mx + 20, 156, Math.floor(t * 1.5) % 2 ? P.pantV : P.grisS); }
  // la bandeja con papeles, el bote de lápices y el tampón
  rect(54, 156, 70, 162, P.k); rect(55, 157, 69, 161, P.grisS); for (let i = 0; i < 3; i++) rect(56, 157 + i, 68, 157 + i, P.papel);
  rect(158, 154, 164, 162, P.k); rect(159, 155, 163, 162, P.kilimA); linea(160, 155, 158, 149, P.amarillo); linea(162, 155, 164, 150, P.rojo);
  rect(124, 158, 134, 162, P.k); rect(125, 159, 133, 161, P.kilimS);
  // la revista en su atril y el sello rojo que baja, estampa y vuelve a subir
  const se = Math.max(0, Math.min(1, o.sello ?? 0)), x = 110, y = 162;
  if (o.revista !== false) { linea(x - 4, y, x + 2, y - 30, P.vigaS); rect(x - 12, y - 2, x + 12, y, P.vigaL); if (PIEZAS_GZ.revista) PIEZAS_GZ.revista(R, x, y - 2, { s: 1.4, sello: se >= 0.7 }); }
  if (se > 0 && PIEZAS_GZ.selloRojo) { const sy = se < 0.7 ? lerp(100, y - 14, (se / 0.7) ** 2) : lerp(y - 14, y - 34, Math.min(1, (se - 0.7) / 0.2));
    PIEZAS_GZ.selloRojo(R, x, Math.round(sy), { s: 2 });
    if (se >= 0.7 && se < 0.8) for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28, d = 6 + (se - 0.7) * 120; pset(Math.round(x + Math.cos(a) * d), Math.round(y - 18 + Math.sin(a) * d * 0.6), P.blanco); } }
  return { mesaDelante: { x0: 22, x1: 198, y: 162 }, mesaFondo: { x0: 204, x1: 314, y: 130 }, revista: [x, y], sello: se };
}

// la vista de El Cairo por el ventanal con arco [x0..x1, y0..y1]: la bruma cálida, la pirámide al fondo, los
// alminares y las cúpulas, las azoteas con depósitos, antenas y ropa tendida, y los milanos que planean
function f_vistaCairo(R, x0, y0, x1, y1, t) {
  const { rect, pset, disco, poligono, linea } = R, P = f_P, b = y1;
  f_cielo(R, x0, y0, x1, y1, t, 5, [hex('#8ab8d8'), hex('#b8d0d8'), P.bruma], 2);
  // la pirámide lejana en la bruma y la ciudad del fondo
  poligono([[x0 + 22, b - 28], [x0 + 46, b - 52], [x0 + 70, b - 28]], hex('#d8c4a0')); poligono([[x0 + 46, b - 52], [x0 + 70, b - 28], [x0 + 46, b - 28]], hex('#c8b090'));
  poligono([[x0 + 64, b - 28], [x0 + 78, b - 42], [x0 + 92, b - 28]], hex('#d8c4a0'));
  for (let i = 0; i < 14; i++) { const bx = x0 + i * 8 - 3, al = 14 + Math.round(h(i, 1, 70) * 12); rect(bx, b - al, bx + 8, b, (i % 2) ? hex('#d0bc9c') : hex('#c4ae8c')); for (let y = b - al + 3; y < b; y += 4) pset(bx + 3, y, P.cairoS); }
  // los alminares (fuste, balconcillos y remate) y una cúpula
  for (const [mx, al] of [[x0 + 104, 50], [x0 + 124, 42]]) { rect(mx - 2, b - al, mx + 2, b, P.piedra); rect(mx + 1, b - al, mx + 2, b, P.piedraS); for (const y of [b - al + 10, b - al + 22]) rect(mx - 3, y, mx + 3, y + 1, P.piedraS);
    rect(mx - 1, b - al - 6, mx + 1, b - al, P.piedra); poligono([[mx - 2, b - al - 6], [mx, b - al - 12], [mx + 2, b - al - 6]], P.cairoS); pset(mx, b - al - 13, P.oro); }
  { const cx = x0 + 114, cb = b - 20; for (let j = 0; j <= 9; j++) { const w = Math.round(Math.sqrt(81 - j * j)); rect(cx - w, cb - j, cx + w, cb - j, j > 6 ? P.cairoL : P.cairo); } rect(cx - 10, cb, cx + 10, b, P.piedra); }
  // las azoteas de delante: depósitos de agua, antenas parabólicas, la ropa tendida que ondea
  for (let i = 0; i < 5; i++) { const bx = x0 + i * 26 - 6, top = b - 14 - Math.round(h(i, 2, 71) * 6); rect(bx, top, bx + 24, b, i % 2 ? P.cairo : P.cairoL); rect(bx, top, bx + 24, top, P.cairoS);
    for (let x = bx + 3; x < bx + 22; x += 6) { rect(x, top + 4, x + 2, top + 7, P.cristal); }
    if (i % 2 === 0) { rect(bx + 4, top - 6, bx + 10, top - 1, P.grisS); rect(bx + 4, top - 6, bx + 10, top - 6, P.gris); }
    else { disco(bx + 16, top - 4, 3, P.gris); pset(bx + 17, top - 5, P.blanco); linea(bx + 16, top - 4, bx + 16, top, P.grisD); }
    if (i === 2) { linea(bx + 2, top - 5, bx + 22, top - 5, P.grisD); for (let k = 0; k < 4; k++) { const cx = bx + 4 + k * 5, sw = Math.round(Math.sin(t * 3 + k) * 1); rect(cx + sw, top - 4, cx + 2 + sw, top - 1, [P.kilim, P.blanco, P.azul1, P.amarillo][k]); } } }
  // los milanos que planean en círculos
  for (let k = 0; k < 2; k++) { const a = t * 0.5 + k * 3, mx = x0 + 60 + k * 30 + Math.cos(a) * 18, my = y0 + 26 + Math.sin(a) * 6; f_pajaro(R, mx, my, t, k, P.cafeS, true); R.pset(Math.round(mx) - 3, Math.round(my) + 1, P.cafeS); R.pset(Math.round(mx) + 3, Math.round(my) + 1, P.cafeS); }
  R.recorte(null);
}

// el despacho de El Cairo (ver la cabecera de hoy). Geometría: el suelo del funcionario y = 164 (detrás de la mesa,
// tablero y 160–164, x 50–252: asoman cabeza y hombros; x 110–190 libre); de pie delante de la mesa, y = 177 (a los
// lados, x < 46 o x > 256); la bandeja de entrada en (211, 152); la ventana con arco x 24–122, y 22–108
function f_despacho(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = f_P, AX = 73, AY = 62, AR = 46;
  const enArco = (x, y) => x >= AX - AR && x <= AX + AR && y <= 108 && (y >= AY || (x - AX) ** 2 + (y - AY) ** 2 <= AR * AR);
  f_capa(R, 'gz-despacho', () => {
    // la pared de yeso con su textura y la cornisa
    for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const g = h(x >> 1, y >> 1, 72); pset(x, y, g > 0.93 ? P.yesoS : g < 0.05 ? hex('#f2ead8') : P.yeso); }
    rect(0, 0, 319, 4, P.yesoS); rect(0, 5, 319, 5, P.moldura); rect(0, 6, 319, 6, P.yesoS);
    // el zócalo de azulejos de estrellas y el suelo de baldosa hidráulica en rombos
    for (let y = 112; y < 130; y++) for (let x = 0; x < 320; x++) { const u = x % 12 - 6, v = (y - 112) % 9 - 4, e = Math.abs(u) + Math.abs(v); pset(x, y, y === 112 || y === 129 ? P.azulejoS : (x % 12 === 0 || (y - 112) % 9 === 8) ? P.azulejoB : e < 3 ? P.azulejoL : e < 5 ? P.azulejo : (Math.abs(u) === Math.abs(v)) ? P.azulejoS : P.azulejoB); }
    for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { const s = 10 + (y - 130) * 0.25, u = ((x - 160) / s + 40) % 2, v = ((y - 130) / (s * 0.45)) % 2, rb = Math.abs(u - 1) + Math.abs(v - 1);
      pset(x, y, Math.abs(rb - 1) < 0.07 ? P.cairoS : rb < 1 ? ((x + y) % 7 === 0 ? P.cairo : P.cairoL) : (rb > 1.75 ? P.te : (x * 3 + y) % 9 === 0 ? P.yesoS : P.yeso)); }
    // el ventanal: el arco de piedra, el alféizar (la vista y la celosía, por fotograma)
    for (let y = AY - AR - 4; y <= 112; y++) for (let x = AX - AR - 4; x <= AX + AR + 4; x++) { const d = Math.hypot(x - AX, Math.min(0, y - AY)); if (d > AR && d <= AR + 4 && y <= 110) pset(x, y, d > AR + 3 ? P.piedraS : ((Math.atan2(y - AY, x - AX) * 8) | 0) % 2 ? P.piedra : P.piedraS); }
    rect(AX - AR - 6, 108, AX + AR + 6, 112, P.piedraS); rect(AX - AR - 6, 108, AX + AR + 6, 108, P.piedra);
    // el casillero de carpetas atadas con cinta (rojas, blancas), cartapacios y legajos
    rect(140, 26, 230, 110, P.k); rect(141, 27, 229, 109, P.nogal);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const x0 = 143 + i * 22, y0 = 29 + j * 20; rect(x0, y0, x0 + 19, y0 + 17, P.nogalS);
      for (let k = 0; k < 3 + ((i + j) % 2); k++) { const yy = y0 + 15 - k * 4, c = h(i, j * 9 + k, 75) > 0.5 ? P.papel : P.cafeL; rect(x0 + 1, yy, x0 + 17, yy + 2, P.k); rect(x0 + 2, yy, x0 + 16, yy + 1, c); rect(x0 + 8, yy, x0 + 9, yy + 2, k % 2 ? P.kilim : P.blanco); } }
    // el archivador metálico verde oliva con sus cajones y tiradores
    rect(240, 56, 276, 130, P.k); rect(241, 57, 275, 130, hex('#6a7a5a')); rect(241, 57, 275, 58, hex('#8a9a78'));
    for (let j = 0; j < 4; j++) { const y = 60 + j * 17; rect(243, y, 273, y + 14, hex('#5a6a4a')); rect(243, y, 273, y, hex('#8a9a78')); rect(254, y + 5, 262, y + 6, P.metalL); rect(256, y + 2, 260, y + 3, P.papel); }
    // la planta sobre el archivador (la maceta de barro)
    f_vasija(R, 258, 56, 5, P.cafeL, P.cafe);
    // el perchero con la chaqueta y el sombrero
    rect(300, 52, 302, 130, P.nogalS); rect(294, 128, 308, 130, P.nogalS); linea(296, 54, 306, 54, P.nogalS);
    rect(294, 56, 308, 92, P.k); rect(295, 57, 307, 92, hex('#4a5a7a')); rect(300, 57, 302, 70, P.blanco); rect(295, 57, 297, 92, hex('#5a6a8a'));
  });
  // el ventanal: la vista de El Cairo recortada al arco y la celosía de madera abajo
  f_vistaCairo(R, AX - AR, AY - AR, AX + AR, 108, t);
  for (let y = AY - AR; y < AY; y++) for (let x = AX - AR; x <= AX + AR; x++) if (!enArco(x, y)) pset(x, y, P.yeso);
  for (let y = 84; y < 108; y++) for (let x = AX - AR; x <= AX + AR; x++) { const u = (x - AX + 60) % 8, v = (y - 84) % 8; if (u < 2 || v < 2 || (u === v)) pset(x, y, (u + v) % 3 ? P.nogal : P.nogalL); }
  rect(AX - 1, AY - AR, AX + 1, 108, P.nogalS); rect(AX - AR, 84, AX + AR, 85, P.nogalS);
  // el ventilador de techo que gira
  { const vx = 238, vy = 16; linea(vx, 0, vx, 12, P.k); rect(vx - 3, 12, vx + 3, 16, P.nogalS); rect(vx - 2, 12, vx + 2, 12, P.laton);
    for (let k = 0; k < 4; k++) { const a = t * 9 + k * Math.PI / 2, ex = Math.cos(a) * 26, ey = Math.sin(a) * 4; for (let s = 3; s <= 26; s++) { const f = s / 26; pset(Math.round(vx + ex * f), Math.round(vy + ey * f), P.nogal); pset(Math.round(vx + ex * f), Math.round(vy + ey * f + 1), P.nogalS); } }
    disco(vx, vy + 2, 2, P.laton); }
  // el reloj de pared que anda
  { const cx = 258, cy = 30; disco(cx, cy, 8, P.k); disco(cx, cy, 7, P.nogal); disco(cx, cy, 6, P.blanco); for (let k = 0; k < 12; k += 3) pset(Math.round(cx + Math.cos(k * Math.PI / 6) * 5), Math.round(cy + Math.sin(k * Math.PI / 6) * 5), P.k);
    const as = t * 1.05 - 1.57; linea(cx, cy, Math.round(cx + Math.cos(as) * 5), Math.round(cy + Math.sin(as) * 5), P.rojo); linea(cx, cy, cx + 2, cy - 3, P.k); pset(cx, cy, P.k); }
  // la luz de la ventana en el suelo y las motas que flotan
  for (let y = 132; y < 172; y++) for (let x = Math.round(40 + (y - 132) * 1.1); x < 120 + (y - 132) * 1.1; x++) if ((x + y) % 3 === 0) pset(x, y, P.luz);
  motas(R, t, 40, 160, 90, 160, 12, P.luz);
  return { suelo: 164, funcionario: 164, delante: 177, mesa: { x0: 50, x1: 252, y: 160 }, bandeja: [211, 152], ventana: [AX - AR, AY - AR, AX + AR, 108], casillero: [140, 26, 230, 110] };
}

// lo de delante del despacho: la mesa de nogal con el tapete verde, la bandeja de entrada, el teléfono de disco, el vaso
// de té que humea en su platillo, el tampón y el sello, la placa de latón sin letras y la carpeta que llega (o.carpeta)
function f_despachoDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, P = f_P;
  rect(50, 160, 252, 165, P.k); rect(51, 160, 251, 162, P.nogalL); rect(51, 163, 251, 164, P.nogal); rect(64, 160, 238, 161, P.verdeBS);
  rect(54, 166, 248, 185, P.nogal); rect(54, 166, 248, 166, P.k); for (const x0 of [60, 128, 196]) { rect(x0, 170, x0 + 46, 184, P.nogalS); rect(x0 + 1, 171, x0 + 46, 184, P.nogalV ?? P.nogal); rect(x0 + 1, 171, x0 + 45, 171, P.nogalS); rect(x0 + 46, 171, x0 + 46, 184, P.nogalL); rect(x0 + 20, 176, x0 + 26, 177, P.laton); }
  // el teléfono de disco
  rect(66, 152, 84, 159, P.k); rect(67, 153, 83, 159, hex('#2a2a2a')); rect(64, 149, 86, 152, P.k); rect(65, 150, 85, 151, hex('#3a3a3a')); disco(75, 156, 3, P.grisS); disco(75, 156, 1, P.k);
  // el vaso de té en su platillo, que humea
  rect(96, 158, 108, 159, P.gris); rect(99, 149, 105, 158, P.k); rect(100, 150, 104, 157, P.te); rect(100, 150, 104, 151, P.teL); pset(100, 152, P.blanco);
  for (let k = 0; k < 4; k++) { const f = (t * 0.55 + k / 4) % 1; pset(Math.round(102 + Math.sin(f * 7 + k) * 1.6), Math.round(147 - f * 13), f < 0.5 ? P.blanco : P.yesoS); }
  // el tampón y el sello de madera
  rect(118, 156, 130, 159, P.k); rect(119, 157, 129, 158, P.kilimA); if (PIEZAS_GZ.selloRojo) PIEZAS_GZ.selloRojo(R, 144, 160, {});
  // la placa de latón sin letras
  rect(156, 154, 184, 159, P.k); rect(157, 155, 183, 158, P.laton); rect(157, 155, 183, 155, P.latonL); rect(161, 156, 179, 157, P.latonS);
  // la bandeja de entrada de rejilla con papeles
  rect(196, 152, 226, 159, P.k); rect(197, 153, 225, 158, P.metalS); for (let x = 199; x < 225; x += 3) rect(x, 153, x, 158, P.metalL); for (let i = 0; i < 2; i++) rect(198, 152 - i, 224, 152 - i, P.papel);
  // el montón de legajos atados con cinta roja
  for (let i = 0; i < 3; i++) { rect(232 - i, 156 - i * 4, 248 - i, 159 - i * 4, P.k); rect(233 - i, 156 - i * 4, 247 - i, 158 - i * 4, P.cafeL); rect(239 - i, 156 - i * 4, 240 - i, 159 - i * 4, P.kilim); }
  // la carpeta de solicitud que se desliza por la mesa hasta la bandeja
  const ca = o.carpeta; if (ca != null && ca !== false && PIEZAS_GZ.carpeta) { const u = Math.max(0, Math.min(1, ca)), e = 1 - (1 - u) ** 3, cx = Math.round(lerp(40, 211, e)), cy = Math.round(lerp(161, 152, Math.max(0, (e - 0.8) / 0.2)));
    if (u > 0.05 && u < 0.9) for (let k = 1; k < 4; k++) linea(cx - 14 - k * 5, cy - 4 - k * 2, cx - 10 - k * 5, cy - 4 - k * 2, P.blanco);
    PIEZAS_GZ.carpeta(R, cx, cy, {}); }
  return { mesa: { x0: 50, x1: 252, y: 160 }, bandeja: [211, 152], telefono: [75, 152], te: [102, 149] };
}
