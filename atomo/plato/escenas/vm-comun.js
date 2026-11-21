// Fontanería y decorados del episodio 25 (El manuscrito Voynich: el libro que nadie puede leer) en el estilo canónico
// pixel chibi, al nivel de episodios/ESTANDAR.md. Decorados (guion.md): A la biblioteca de Yale (la sala de libros raros,
// la mesa de estudio), B Praga y Roma (el gabinete de Rodolfo II hacia 1610, el estudio de Kircher en el Colegio Romano,
// el laboratorio del alquimista Baresch, la villa Mondragone en 1912, Nueva York en los sesenta), C los descifradores (el
// despacho de Newbold en Filadelfia en 1921, la oficina de descifrado de los cuarenta), D el laboratorio (radiocarbono en
// Arizona en 2009, la sala de ordenadores, un taller de escribas del siglo XV) y E hoy (el estudio de Atom con la maceta).
// Las páginas del libro, reinterpretadas en pixel (plantas, ruedas de estrellas, estanques, tarros), sin copiar páginas
// enteras; las figuras de los estanques, pequeñas y sin desnudos; los signos del libro, inventados (no letras reales).
// Los personajes son los de ELENCO_VM y PIEZAS_VM (pixel-chibi.js), sin logos ni letras legibles.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mesas, atriles, bancos) va en su
// propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/vm-comun.js';
//   const { E, R, M } = await T.preparar('vm-gancho');
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
// las piezas del episodio (PIEZAS_VM: el libro, la planta imposible, la lupa, el microscopio…), las crea el reparto
export const PIEZAS_VM = KIT.PIEZAS_VM || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el pergamino y la tinta del libro, el verde de los estanques, el oro de Praga
    pergamino: '#e8d8b0', pergaminoS: '#b8a07a', tinta: '#5a3a24', verdeE: '#6aa86a', azulE: '#5a8ac8', oroP: '#d8a840',
    // las bibliotecas y laboratorios: mármol, madera oscura, bata, pantallas
    marmol: '#d8d0c0', marmolS: '#a8a090', nogal: '#5a3a24', nogalS: '#3a2414', bata: '#eef0f2', pantalla: '#2a5a8a',
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
  const E = await escena(id, 'ep25');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1404 (el pergamino), 1600 (Praga), 1912 (Voynich), 1944 (los descifradores), 2026
  Object.assign(R.ICONOS, {
    libro: ['#######', '#..#..#', '#..#..#', '#..#..#', '#..#..#', '#######', '.......'],
    corona: ['#..#..#', '##.#.##', '#######', '#######', '.#####.', '.......', '.......'],
    lupa: ['.###...', '#...#..', '#...#..', '#...#..', '.###...', '....##.', '.....##'],
    planta: ['..#.#..', '.#.#.#.', '..###..', '...#...', '..###..', '.#.#.#.', '#..#..#'],
  });
  R.tramosTiempo([[1404, 1600, R.PALA.ORO, 'libro'], [1600, 1912, R.PALA.ROJO, 'corona'], [1912, 1990, R.PALA.AZUL ?? R.PALA.ROJO, 'lupa'], [1990, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'planta']]);
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







// ── A · La biblioteca ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno):
//   'biblioteca' (por omisión): la sala de libros raros de Yale de noche, evocada (sin fachada ni escudo): techo de
//     casetones con focos, la pared del fondo de paneles de mármol translúcido con su rejilla de granito, por los que entra
//     una luz dorada con vetas (cada 11 s la luz de unos faros de fuera barre los paneles); el entresuelo con su barandilla
//     de bronce, por donde pasan dos lectores pequeños en silueta y otro lee apoyado; en el centro, la torre de cristal de
//     seis pisos llena de libros de lomos de cuero (reflejos en diagonal; dentro, un bibliotecario pequeño empuja un carrito
//     por el tercer piso); abajo, en penumbra, dos vitrinas iluminadas con libros abiertos (un brillo recorre el cristal),
//     los postes de cordón y el suelo de piedra pulida con juntas en perspectiva y los reflejos dorados de la torre. Un foco
//     del techo baja en cono (con motas de polvo) sobre el atril del centro. Línea de suelo y = 152.
//     El atril con el libro abierto (PIEZAS_VM.libroVoynich; o.pagina, o.brilla), su cartela (o.numero: un número, p. ej.
//     408) y en primer término la vitrina baja de la izquierda y el poste con cordón de la derecha van en bibliotecaDelante.
//     Cámara 'mesa': la mesa de estudio, de cerca: detrás, los paneles de mármol grandes, un trozo de la torre de cristal a
//     la izquierda y una librería baja de nogal con lomos, por detrás de la cual pasa una lectora (asoma cabeza y hombros);
//     delante, la mesa de nogal con el tapete verde: el libro abierto grande sobre su atril de espuma gris, con el dibujo
//     de o.pagina ('planta' | 'estrellas' | 'estanques' | 'tarros') a la izquierda y renglones de signos inventados, la
//     cadena de cuentas que sujeta la hoja, los guantes blancos, la lupa de latón (destella), la libreta con un boceto y el
//     lápiz, y la lámpara verde de banquero con su cadenita que se mece y su luz (motas en el haz); o.brilla: los signos
//     del libro en oro con destellos; o.mueve: tiemblan. Los personajes van detrás de la mesa con los pies en y = 121
//     (valen 118–122): se recortan con la cabeza y los hombros sobre el mármol encendido y el pecho sobre la librería baja
//     (tapa en y 104), y el borde del tablero (y 120) solo les tapa los pies; la mesa entera va en bibliotecaDelante.
//   'pagina': un inserto, el libro abierto a pantalla completa sobre la mesa: dos páginas de pergamino con manchas,
//     moteado, el cosido y la sombra del lomo, el dibujo grande de o.pagina a la izquierda (planta de raíces como patas,
//     rueda de estrellas, estanques verdes con figuritas vestidas, tarros de botica) y renglones de signos inventados
//     (bucles, rizos y «gallows» de trazos altos, nunca letras) que rodean una plantita en la derecha; la esquina de abajo
//     se levanta y baja, y flotan motas en la luz. o.brilla 0–1: los signos se vuelven oro y un destello los recorre;
//     o.mueve: los signos tiemblan para no dejarse leer; o.pasa 0–1: la hoja derecha se levanta, cruza el lomo y cae a la
//     izquierda; lo que destapa es la página o.siguiente ('estrellas', o 'planta' si o.pagina es 'estrellas'), y con
//     o.pasa 1 ya se ve la siguiente entera.
//     Cámara 'tablero': un tablero de detective sobre la mesa, visto desde arriba: el libro cerrado en el centro con una
//     tarjeta clavada con un «?» que se mece; hilos rojos (o.hilos 0–1 los va tendiendo, uno tras otro) a una moneda de
//     oro con una corona (destella), una foto de un microscopio, la etiqueta de librero (o.numero: un número en ella) y un
//     mapa de Europa con chinchetas en Praga y Roma y otra en Nueva York, al otro lado del mar (laten); fichas, un clip
//     y unas pinzas por la mesa.
// Devuelve la geometría del encuadre (suelo, atril, libro, mesa…; ver cada caso).
export function biblioteca(R, t, o = {}) {
  const enc = o.encuadre ?? 'biblioteca', cam = o.camara ?? 'general';
  R.recorte(null);
  if (enc === 'pagina') return cam === 'tablero' ? a_tablero(R, t, o) : a_pagina(R, t, o);
  return cam === 'mesa' ? a_salaMesa(R, t, o) : a_sala(R, t, o);
}
// lo de delante de los personajes en cada encuadre de biblioteca(); se llama después de los actores, con las mismas
// opciones. 'biblioteca': el atril con el libro abierto bajo el foco (x 139–181, tablero y 117–128, pie en y 152) y su
//   cartela con o.numero, la vitrina baja del primer término (x 0–58, y 154–179) y el poste de bronce con el cordón
//   rojo (x 270–319, y 146–179); con o.libro false el atril queda vacío (solo su cuña de espuma y la luz del foco), para
//   que una escena lleve el libro en la mano de alguien. Cámara 'mesa': la mesa entera (y ≥ 92: tablero y 120–179,
//   lámpara x 14–62) con todo lo de encima. 'pagina' no tiene nada delante.
export function bibliotecaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'biblioteca', cam = o.camara ?? 'general';
  R.recorte(null);
  if (enc === 'pagina') return {};
  if (cam === 'mesa') { a_mesaEstudio(R, t, o); return { mesa: [0, 120, 319, 179] }; }
  a_salaDelante(R, t, o);
  return { atril: [160, 121] };
}
// ── B · Praga y Roma ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara), con el suelo de los personajes en 150 en los cinco generales (pies en y = 150). Devuelve
// { suelo, detras?, mesa?, … } con la geometría que necesitan las escenas (ver cada encuadre). Llama a praguaDelante
// después de los actores, con las mismas opciones: pinta la mesa, el escritorio, el mostrador o las cajas de delante.
//   'gabinete' (Praga hacia 1610, el general): techo de vigas con la gran viga maestra, de la que cuelga por dos cuerdas un
//     cocodrilo disecado que se mece; pared de estuco verde con rosetas y friso de roleos, arrimadero de cuarterones de
//     nogal; a la izquierda la ventana de piedra con cruz y vidrios emplomados por la que se ve el castillo de Praga (el
//     palacio, la catedral con su torre de cúpula verde, los tejados rojos de la ciudad con humo, nubes y pájaros); dos
//     apliques con velas; el bodegón de frutas con marco dorado; el dosel rojo con el paño de honor y el trono pequeño
//     sobre su tarima; el globo terráqueo de pie que gira; a la derecha el gran armario de ébano y oro con conchas, coral,
//     una copa de huevo de avestruz, un reloj de torre (las agujas andan), un astrolabio (la red gira), una copa de nautilo,
//     un pájaro autómata en su jaula (gira la cabeza, aletea y salta), un globo pequeño que gira y minerales; suelo de
//     mármol rojo y blanco en perspectiva con la alfombra turca y el sol de la ventana con polvo que flota.
//     praguaDelante: la mesa de las rarezas (x 208–316, tablero en y 131) con paño de terciopelo y fleco de oro, la esfera
//     armilar que gira y la copa de nautilo; o.mesa: false la quita. El tablero queda libre en x 236–280 (libro, bolsa).
//     Cámara 'ultravioleta' (inserto, sin suelo): el libro abierto en grande sobre la mesa en la penumbra, la primera
//     página con renglones de signos inventados y, abajo a la derecha (x 196–250, y 138–152), una firma borrada (rayas y
//     garabatos, sin letras) que aparece y brilla con o.uv 0–1; la lámpara de luz violeta arriba a la izquierda tiñe la
//     página en su cono (o.uv 0: apagada) y el polvo flota en la luz.
//   'colegio' (Roma, 1665): artesonado de madera, friso de jeroglíficos pintados (pictogramas, no letras), la gran
//     estantería de libros a la izquierda con un reloj de arena que corre, la maqueta del obelisco de granito con sus
//     signos, el grabado enmarcado, el reloj de péndulo que oscila, la ventana de arco a los tejados de Roma (pinos, una
//     cúpula, campanarios, chimeneas con humo, golondrinas, nubes) con sus postigos abiertos, el telescopio de latón en su
//     trípode, la linterna mágica que parpadea, suelo de barro cocido. praguaDelante: el escritorio de Kircher (x 168–278,
//     tablero en y 126), libros, tintero y vela; libre encima en x 196–246; quien está detrás tiene los pies en 130.
//     Cámara 'carta' (inserto): el escritorio visto desde arriba, el vade verde, el libro de jeroglíficos, la vela, el
//     tintero con la pluma y la carta en el centro (160, 108) que se abre con o.abre 0–1 (doblada con el lacre rojo; abierta,
//     renglones de garabatos y el lacre partido).
//   'alquimista' (Praga hacia 1639): bóveda de piedra, el atanor de ladrillo con el fuego vivo y la campana tiznada, el
//     fuelle, la leña, las estanterías de tarros y frascos de colores, el ventanuco enrejado a la calle (pasan pies), su haz
//     de luz con polvo, los manojos de hierbas que cuelgan y se mecen, el alambique al fuego que burbujea y gotea en el
//     recipiente, una balanza, un gato que duerme junto al fuego (mueve la cola), losas de piedra con paja.
//     praguaDelante: la mesa de trabajo (x 132–266, tablero en y 126) con el libro, el mortero, frascos y la vela; libre
//     encima en x 176–226; quien está detrás tiene los pies en 130.
//     Cámara 'copia': más cerca; Baresch (lo pone la escena) detrás de la mesa con los pies en 120 (x 130–190); pragua
//     pinta la pared (estantería de tarros, pergamino, ajos, la hornacina con el candil que humea, la balda con el reloj
//     de arena que corre, una araña que sube y baja) y la mesa entera (canto de atrás en y 114–115, tablero desde 116) con
//     la vela grande, el libro abierto (página de planta) y la copia, cuyos renglones se van llenando con o.copia 0–1 (por
//     omisión, con el tiempo); praguaDelante vuelve a pintar la mesa de y 114 abajo: a quien tiene los pies en 120 le
//     tapa las piernas y deja ver cabeza, hombros, manos y pecho (manos en y 105–112).
//   'villa' (villa Mondragone, 1912): techo artesonado dorado y desvaído, frescos de paisajes desconchados entre pilastras
//     de falso mármol, el ventanal con postigos a los jardines (cipreses que se mecen, la balaustrada, la fuente con su
//     chorro, colinas, un jardinero que rastrilla, nubes y pájaros), los haces de luz con polvo, las cajas de libros de los
//     jesuitas al fondo, la lámpara envuelta en una tela que se mece, los muebles tapados con sábanas, huellas en el polvo
//     del suelo. praguaDelante: las cajas abiertas con libros y paja (x 0–70 y x 248–319); el centro x 76–244 queda libre.
//     Cámara 'caja' (inserto): una caja abierta desde arriba, llena de libros viejos y paja, con el libro de pergamino claro
//     en el centro (x 136–186, y 82–118; o.libro: false lo quita para que lo pinte la escena; o.sale 0–1 lo levanta).
//   'nuevaYork' (una librería en los sesenta): techo de chapa estampada, ventilador que gira y lámparas colgantes,
//     estanterías de libros de colores con la escalera de ruedas, el escaparate y la puerta de cristal a la calle (pasan
//     taxis amarillos y paseantes; enfrente casas de ladrillo con escaleras de incendios), la caja fuerte negra con filete
//     de oro (x 236–278) con el cartel del precio en cifras (o.precio, '24500' por omisión) y el gato de la tienda.
//     praguaDelante: el mostrador (x 140–262, tablero en y 124) con la vitrina, la caja registradora y la lámpara; libre
//     encima en x 182–226; quien está detrás tiene los pies en 128.
//     Cámara 'cajaFuerte' (inserto): la caja fuerte de cerca entre estanterías; la rueda gira y la puerta se abre con
//     o.abre 0–1 y deja ver el libro en el estante de dentro, con su brillo (o.libro: false lo quita).
export function pragua(R, t, o = {}) {
  const enc = o.encuadre ?? 'gabinete', cam = o.camara ?? 'general';
  const f = PG_ENC[enc + ':' + cam] ?? PG_ENC[enc + ':general'] ?? PG_ENC['gabinete:general'];
  return f(R, t, o);
}
// lo de delante de los personajes en cada encuadre de pragua(); se llama después de los actores, con las mismas opciones
export function praguaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'gabinete', cam = o.camara ?? 'general';
  const f = PG_DEL[enc + ':' + cam];
  return f ? f(R, t, o) : {};
}
// ── C · Los descifradores ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara):
//   'filadelfia' (suelo 146): el despacho de Newbold en Filadelfia en 1921. Techo con su cornisa de dentículos (tranquila
//     bajo el año), papel pintado verde de rombos con la luz de la ventana, friso de nogal con cuarterones y suelo de
//     tablas con vetas y una alfombra persa. A la izquierda, la librería alta (libros de lomos variados, el globo, el
//     busto de yeso, el armarito); en medio, la pizarra con renglones de signos inventados, un signo ampliado con flechas,
//     una tabla de cifras, un «?» y el cajetín de las tizas; el calendario de taco (o.año, 1921 por omisión; el día, en
//     rojo); la ventana de guillotina con cortinas granates, la galería y el estor: por ella, Filadelfia (el cielo
//     tramado con nubes de tres tonos a tres velocidades, el ayuntamiento con su torre y su estatua, casas de ladrillo
//     con chimeneas que humean, la chimenea de una fábrica con su humo, un depósito de agua, palomas que cruzan y una
//     paloma que picotea en el alféizar, todo recortado a los cristales); el radiador de hierro que suelta vapor; el reloj
//     de péndulo (el péndulo y el segundero se mueven); el perchero con el bombín y el abrigo; la pila de periódicos en
//     el suelo; el haz de sol con motas de polvo y una mosca pequeña que zumba por el cuarto (o.moscaVuela: false la
//     quita). o.tarde: la luz de la tarde (cielo malva y naranja, ventanas encendidas, el haz más cálido y la lámpara
//     de la mesa encendida): para «el mismo despacho, años después» (con o.año 1931). o.vuelan 0–1: los periódicos de
//     la pila salen volando en arco hacia arriba y fuera del plano.
//     El escritorio (con el microscopio, la lámpara de banquero, el tintero, los fotostatos negros, la taza que humea) y
//     el respaldo del sillón de cuero de delante van en descifradoresDelante. Quien está detrás del escritorio pisa en
//     y 138 (asoman cabeza y hombros); en la alfombra, en y 146 (libre x 64–176).
//     Cámara 'ocular': lo que se ve por el microscopio: el círculo del ocular (aro de latón moleteado, franja de color
//     del borde y viñeta) sobre el despacho desenfocado; dentro, el pergamino ampliado con sus fibras y poros y un trazo
//     de tinta enorme con el borde más oscuro, el grano y sus grietas (algunas con forma de signo); la aguja del ocular
//     señala una grieta; motas que flotan. o.grietas 0–1: las grietas se encienden en ámbar (la prueba de Manly).
//     o.mosca 0–1: la mosca (el gag): entra andando por la izquierda (0–0,35), se para y se frota las patas
//     (0,35–0,65) y se va volando arriba a la derecha (0,65–1).
//     Cámara 'pizarra' (suelo 160): la pizarra grande de cerca: a la izquierda, el signo ampliado con sus grietas; una
//     flecha a tres renglones con el MISMO signo y tres resultados distintos (cifras, «≠» y «?»); a la derecha, el dibujo
//     a tiza de un microscopio y unas grietas; el cajetín con las tizas y el borrador; al lado, el diploma enmarcado y la
//     cortina con el sol que entra; el haz de luz recorre despacio la pizarra con sus motas. o.marca 0–1: Manly rodea
//     con tiza amarilla tres grietas del signo (se dibujan los círculos); o.tacha 0–1: un aspa de tiza tacha los tres
//     resultados. La esquina del escritorio de delante va en descifradoresDelante.
//   'oficina44' (suelo 150): una oficina de descifrado de los cuarenta: techo de placas con tres lámparas de esmalte
//     verde que se mecen (y sus conos de luz), pared verde de oficina con zócalo; el tablero de corcho con un mapa
//     inventado (mar, costas, cuadrícula, chinchetas e hilos rojos, fichas clavadas), la hoja de frecuencias (barras
//     con signos debajo y cifras), el cartel de «silencio» (un perfil con el dedo en los labios, sin letras), la ventana
//     con la persiana veneciana (por ella, el cielo con nubes, árboles y un edificio de ladrillo; la luz de las lamas en
//     el suelo), el reloj, los archivadores con un cajón abierto, el ventilador que gira; al fondo, dos mesas con
//     mecanógrafos pequeños que teclean (el carro avanza y vuelve), la clasificadora de tarjetas con las fichas que caen
//     en los cajetines y su operaria, y un mensajero que cruza con un montón de fichas; suelo de linóleo a cuadros con
//     brillo; en medio, la máquina de descifrar (PIEZAS_VM.maquinaDescifrar, a doble tamaño, o.tira 0–1 su tira de
//     papel, o.pregunta el «?» al final, o.maquina: false la quita). La mesa larga de delante (máquina de escribir,
//     ficheros, fichas, taza, flexo) va en descifradoresDelante; quien está detrás de ella pisa en y 142.
//     Cámara 'fichas': las fichas del texto extendidas sobre la mesa, vistas desde arriba: el tablero de roble, el
//     secante verde con cantoneras, veinte fichas con renglones de signos y su número, el fichero de madera, la hoja de
//     recuento con palotes y cifras, el lápiz, la goma, los clips y la taza de café que humea, bajo la luz de la lámpara;
//     una lupa que recorre las fichas y las amplía (o.lupa [x, y] la fija; o.lupa false la quita). o.n 0–1: cuántas
//     fichas hay ya puestas (de izquierda a derecha y de arriba abajo); o.marca (0–19): esa ficha, rodeada con lápiz rojo.
//     Cámara 'maquina' (suelo 162): la máquina de descifrar de cerca (a triple tamaño) junto a la pared, con su cable al
//     enchufe; la tira (o.tira 0–1) cruza todo el suelo hasta el «?» (o.pregunta) junto al archivador; detrás, la tabla
//     de signos y cifras, el reloj, el calendario (o.año, 1944 por omisión), la balda con archivadores y ficheros, el
//     tablón con fichas clavadas, la puerta de cristal esmerilado por la que pasan siluetas y la lámpara que se mece.
export function descifradores(R, t, o = {}) {
  const enc = o.encuadre ?? 'filadelfia', cam = o.camara ?? 'general';
  if (enc === 'oficina44') {
    if (cam === 'fichas') return c_fichas(R, t, o);
    if (cam === 'maquina') return c_maquinaCerca(R, t, o);
    return c_oficina(R, t, o);
  }
  if (cam === 'ocular') return c_ocular(R, t, o);
  if (cam === 'pizarra') return c_pizarra(R, t, o);
  return c_despacho(R, t, o);
}
// lo de delante de los personajes en cada encuadre de descifradores(); se llama después de los actores, con las mismas
// opciones. 'filadelfia' general: el escritorio de nogal (x 182–312, tablero en y 133–137, frente de 141 abajo, con
//   cajones, tiradores de latón y el hueco de las rodillas) con el microscopio (x 204), los libros, el tintero con la
//   pluma, los fotostatos negros en su atril, la taza que humea, el periódico doblado y la lámpara de banquero (encendida
//   con o.tarde u o.lampara); y el respaldo del sillón Chester abajo a la izquierda (x 0–40, y 150–179).
//   'filadelfia' / 'pizarra': la esquina del escritorio abajo a la derecha (x 236–319, tablero en y 148) con el
//   microscopio, libros y papeles. 'oficina44' general: la mesa larga de la izquierda (x 0–122, tablero en y 138–141)
//   con la máquina de escribir, dos ficheros, fichas sueltas, la taza que humea y el flexo. Las demás cámaras: nada.
export function descifradoresDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'filadelfia', cam = o.camara ?? 'general';
  if (enc === 'oficina44') { if (cam === 'general') return c_mesaOficina(R, t, o); return {}; }
  if (cam === 'pizarra') return c_esquinaMesa(R, t, o);
  if (cam === 'general') return c_escritorio(R, t, o);
  return {};
}
// ── D · El laboratorio ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Todos devuelven { suelo, … } con las posiciones de lo que la escena necesita (ver cada caso).
//   'radiocarbono' (por omisión): el laboratorio de radiocarbono de Arizona en 2009, sin logotipos. Al fondo, el tanque
//     azul del acelerador (x 116–234, y 34–90) sobre sus dos patas, con sus aros, pernos, la escotilla, la placa sin
//     letras y la baliza amarilla que gira; a su izquierda, la fuente de iones enjaulada (brilla azul) y dos batas
//     colgadas; a su derecha, el imán de análisis rojo con sus bobinas de cobre, el tubo del haz y el detector (cuenta);
//     el rack de electrónica (LED y osciloscopio) bajo la esquina de Atom, un técnico pequeño que va del rack al
//     detector, el reloj, el cartel de radiación. A la izquierda, la ventana al desierto (cielo tramado, nubes de tres
//     tonos a tres velocidades, un halcón, mesetas, saguaros, una camioneta con polvo por la carretera y una planta
//     rodadora), con la persiana a medio bajar; debajo, el banco de preparación: placa con vaso que humea, el termo de
//     nitrógeno que echa vaho, el hornito que brilla, la gradilla. Suelo de resina con juntas en perspectiva, reflejos y la
//     franja de seguridad. La mesa de muestras va en laboratorioDelante. Delante de todo, abajo a la izquierda (x 6–30, y 156–179, por debajo
//     de los pies), el caballete amarillo de aviso. Devuelve { suelo: 150, mesa: [112, 252, 140],
//     libro: [140, 141]: el BORDE IZQUIERDO y la base del hueco del libro en la mesa (el hueco va de x 140 a 174); como
//     PIEZAS_VM.libroVoynich se coloca por el centro y la base, el libro va en (libro[0] + 17, libro[1]), que es
//     libroCentro: [157, 141]; detras: [x0, x1] (dónde se pone quien trabaja tras la mesa),
//     libres: [[x0, x1], …] (suelo libre para andar), ventana, acelerador, iman, detector, rack }.
//     Cámara 'muestra': la mesa de cerca: el pergamino (con su planta y sus signos inventados) sobre papel de aluminio,
//     la gradilla de viales, el bisturí, la regla, la placa de Petri y el monitor con la curva de calibración. o.corta
//     (0–1; por omisión avanza con t en 4,5 s): las pinzas, en la mano canónica, llegan, pellizcan el trocito de la
//     esquina del pergamino (queda la muesca), lo llevan a la placa de Petri, lo sueltan y se retiran; o.franja (0–1;
//     por omisión desde t = 2,5): en la pantalla se marca la franja entre las dos rayas doradas y aparece «1404-1438».
//     o.mano false: sin mano ni pinzas. Devuelve { pinzas: [x, y] (la punta), muestra: [x, y], pantalla, franja }.
//   'ordenadores': una sala de ordenadores de hoy: la ventana al campus (nubes, edificio de ladrillo, árboles que se
//     mecen, un ciclista), la pizarra blanca con filas de signos del libro rodeados y flechas, y una gráfica de barras a
//     rotulador, la pantalla de pared con una red de palabras que gira, la fila de mesas del fondo con monitores de
//     barras que cambian, una persona pequeña de espaldas que teclea, la cafetera con vapor, el rack con sus LED, el
//     ficus que se mece y la moqueta. La mesa de delante (portátiles, taza, papeles) va en laboratorioDelante.
//     Devuelve { suelo: 150, mesa: [96, 244, 140], detras, libres, pizarra, tele }.
//     Cámara 'grafica': la pantalla de cerca con la gráfica de frecuencias (13 barras que bajan como en un idioma y la
//     línea de puntos naranja del idioma de verdad, leyenda de dos colores sin palabras); o.baila (0–1): las barras se
//     igualan en fila y bailan en ola, con patitas que patean bajo el eje. Delante, en la mesa, el teclado, la taza que
//     humea, la libreta con signos y o.plumas (por omisión true): cinco tinteros con su pluma y cinco tintas distintas
//     (negra, sepia, roja, verde y azul), cada una con su muestra de letra en una tira de papel. Devuelve { pantalla,
//     barras: { x0, paso, ancho, base }, plumas: [x, …] }.
//   'escriptorio': un taller de escribas del siglo XV: techo de vigas, muro de sillares, la ventana gótica con
//     vidrieras de rombos (cielo, nubes, una torre lejana, un pájaro) y el haz de luz con motas que cae al suelo, el
//     armario de libros y rollos, el candil de pared, el bastidor con una piel tensada con cordeles, la repisa de
//     pigmentos con hierbas colgadas, un escriba pequeño de fondo en su atril que escribe, el gato que duerme y el suelo
//     de baldosas de barro. Los pupitres de delante van en laboratorioDelante (o.pupitres: los x de su centro; por
//     omisión [70, 160, 250]). Devuelve { suelo: 150, pupitres, ventana, libres }.
//     Cámara 'pluma': un pupitre de cerca: el pergamino con la planta dibujada y renglones de signos inventados, la vela
//     que titila, el tintero; o.escribe (0–1; por omisión un renglón cada 6 s): la pluma, en la mano canónica, escribe
//     signos en el último renglón (el último signo brilla de tinta fresca). o.mano false: sin mano ni pluma. Devuelve
//     { punta: [x, y] }.
export function laboratorio(R, t, o = {}) {
  const enc = o.encuadre ?? 'radiocarbono', cam = o.camara ?? 'general';
  if (enc === 'ordenadores') return cam === 'grafica' ? d_grafica(R, t, o) : d_ordenadores(R, t, o);
  if (enc === 'escriptorio') return cam === 'pluma' ? d_pluma(R, t, o) : d_escriptorio(R, t, o);
  return cam === 'muestra' ? d_muestra(R, t, o) : d_radiocarbono(R, t, o);
}
// lo de delante de los personajes en cada encuadre de laboratorio(); se llama después de los actores, con las mismas
// opciones: 'radiocarbono' la mesa de muestras (microscopio, aluminio, placas, viales, balanza que pesa; el hueco del
// libro de x 140 a 174, con la base en y 141: libroVoynich va centrado en x 157) y, abajo a la izquierda, el caballete
// amarillo de aviso; 'ordenadores' la mesa de trabajo (dos portátiles en los extremos, taza que humea, papeles con
// signos, una maceta, faldón de chapa perforada, mochila apoyada, regleta) y, en primer término abajo a la izquierda
// (x 0–34, y 112–179), una costilla de Adán grande en su maceta que se mece; 'escriptorio' los pupitres inclinados
// (o.pupitres) con pergamino, tintero de cuerno, pluma y una vela en el del medio. Las cámaras de cerca no llevan nada
// delante. Devuelve lo mismo que la mesa de su encuadre (radiocarbono: { mesa, libro, libroCentro, detras }).
export function laboratorioDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'radiocarbono', cam = o.camara ?? 'general';
  if (cam !== 'general') return {};
  if (enc === 'ordenadores') return d_mesaOrdenadores(R, t, o);
  if (enc === 'escriptorio') return d_pupitres(R, t, o);
  return d_mesaMuestras(R, t, o);
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// El estudio de Atom, de noche, en dos encuadres (o.encuadre 'estudio', el único; o.camara 'general' | 'pantalla').
//   'general': el estudio visto de frente. Papel pintado adamascado con sus juntas, friso de paneles de nogal, tarima en
//     perspectiva con una alfombra persa. A la izquierda, la librería alta (x 2–58, y 16–132) con libros antiguos de piel
//     y lomos dorados, un reloj de arena, un astrolabio, rollos, un tarro con una planta en espiral y una vela que tiembla;
//     el globo terráqueo de pie (centro 72, 110) que gira despacio. La ventana (cristal x 96–152, y 22–88) con la noche:
//     cielo tramado, estrellas que titilan, la luna, nubes de tres tonos a tres velocidades que pasan por delante de ella,
//     tejados con chimeneas que humean, ventanas que se encienden y se apagan, una rama que se mece y un murciélago; en el
//     alféizar, el gato con la cola que se mueve; cortinas de terciopelo bajo su galería de madera que ondean y, debajo, el banco de la ventana con
//     cojines y libros. La chimenea de piedra (boca x 178–204, y 100–132) con el fuego vivo, las chispas y el brillo en
//     el hogar; en la repisa (y 82), velas, un reloj de arena y un tarro de flores secas; encima, la carta de la rueda de
//     estrellas enmarcada (x 172–210, y 28–72). A la derecha, la lámina de una planta (x 228–262, y 42–82) y el reloj de
//     péndulo (x 290–310, y 54–110). Motas en la luz de la lámpara y el rayo de luna en la tarima.
//     LA MESA va en hoyDelante (x 220–318, tablero en y 136–140, frente hasta y 158), con la maceta de la planta imposible
//     (PIEZAS_VM.plantaImposible a escala 2, o.crece, o.flor; se mece), el libro abierto y la lámpara de banquero.
//   'pantalla': el otro lado del estudio: entre dos librerías (la izquierda x 0–52 entera; la derecha x 250–318 desde
//     y 52, con un planetario de latón que gira), la gran pantalla de Atom colgada en el panelado (cristal x 66–234,
//     y 22–110) con el libro escaneado: miniaturas a la izquierda, el pliego abierto con sus dibujos (planta, estrellas,
//     estanques, tarros) y renglones de signos inventados, las hojas que pasan solas, una lupa que recorre la página y la
//     barra de avance. Debajo, el aparador bajo (x 64–236, tablero en y 128, pie en y 150) con el escáner de libros (su
//     luz destella con cada hoja), libros y altavoces; a la derecha, la peana (x 262–284, tablero en y 124) con la maceta;
//     dos apliques encendidos; tarima en espiga con una alfombra azul; un robot aspirador que va y viene por el suelo
//     (por detrás de los personajes). El sillón de orejas de delante, abajo a la izquierda, va en hoyDelante.
// Opciones: o.crece (0–1, 1), o.flor, o.maceta (false: no pinta la maceta, la pinta la escena); o.libro (false: sin el
//   libro abierto de la mesa); o.pagina (la primera hoja de la pantalla: 'planta' | 'estrellas' | 'estanques' | 'tarros');
//   o.pasa (segundos por hoja, 3; 0: quieta); o.lupa (false: sin la lupa de la pantalla); o.aspira (false: sin el robot);
//   o.modo 'ia' (pantalla): un programa de inteligencia artificial lee la página (una barra la recorre) y escupe
//   «palabras» (bloques de signos, sin letras) en el panel de la derecha, una a una; o.ia (0–1) cuántas han salido (por
//   omisión avanzan solas con t); o.rechazo (0–1) los expertos las van tachando con aspas rojas y a 1 cae el sello rojo
//   del «no» (un círculo tachado); o.tono 'azul' (2018, por omisión) | 'ambar' (2019).
// Devuelve la geometría: { suelo, sueloMin, sueloMax, libre: [x0, x1], maceta: [x, ySuelo, escala], … } (ver cada encuadre).
export function hoy(R, t, o = {}) {
  if (o.camara === 'pantalla') { R.copiar(e_capa(R, 'hoy-pantalla', () => e_pantallaFijo(R))); return e_pantallaVivo(R, t, o); }
  R.copiar(e_capa(R, 'hoy-estudio', () => e_estudioFijo(R)));
  return e_estudioVivo(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
// en 'general', la mesa del estudio con la maceta, el libro y la lámpara; en 'pantalla', el sillón de orejas (x 0–54, y ≥ 128)
export function hoyDelante(R, t, o = {}) {
  if (o.camara === 'pantalla') { e_sillon(R, t); return { sillon: [0, 128, 54, 179] }; }
  return e_escritorio(R, t, o);
}
// la paleta de la biblioteca: granito, mármol dorado (de oscuro a luz), bronce, vidrio, piedra del suelo, pergamino,
// tintas de los dibujos, nogal, tapete, lámpara de banquero, guantes, hilo rojo y el mapa
const A_ = pal({
  techo: '#17151b', techoL: '#24212a', techoS: '#0e0c12',
  gran: '#3a3632', granL: '#57524a', granS: '#24211e', granD: '#2e2b27',
  m0: '#3a220f', m1: '#653a15', m2: '#965a20', m3: '#c48634', m4: '#e8b058', m5: '#fcd890', m6: '#fff0c4',
  bronce: '#8a6a3a', bronceL: '#c8a060', bronceS: '#4a3820',
  vidrio: '#5a7a90', lomoF: '#24160c',
  suelo: '#25211e', sueloL: '#3a3430', sueloS: '#171513', sueloJ: '#100e0d',
  perg: '#ecdcb2', pergL: '#f7ecd2', pergS: '#d2bc90', pergD: '#a88c60', pergM: '#dcc698',
  tinta: '#4a2e1c', tintaL: '#7a5034', oro: '#e8b830', oroL: '#ffe890', oroS: '#a87a18',
  verde: '#5a9a4a', verdeL: '#9ac870', verdeS: '#2e6a2a', azul: '#4a7ac0', azulL: '#8ab0e0', azulS: '#2a4a8a',
  rojo: '#b0482e', rojoL: '#d87a50', rojoS: '#7a2a1a', ocre: '#c8a050', ocreS: '#9a7430', piel: '#f2c49a',
  nogal: '#5a3a24', nogalL: '#7a5232', nogalS: '#3a2414', nogalD: '#2a180c',
  tapete: '#2e5a3a', tapeteL: '#3e7048', tapeteS: '#1e3e28',
  lamp: '#1e6a3a', lampL: '#3a9a5a', lampS: '#0e3e20', laton: '#c8a040', latonL: '#f0d080', latonS: '#8a6420',
  guante: '#f4f2ea', guanteS: '#c8c4b8', papel: '#f2eedc', papelS: '#cfc8b0', raya: '#9ab0c8', espuma: '#8a8c92', espumaS: '#5e6066',
  hilo: '#d0202a', hiloS: '#7a1018', mar: '#a8c4cc', marS: '#8aa8b4', tierra: '#e6d6a8', tierraS: '#c4ae7a', costa: '#6a5a3a',
  vellum: '#e2d6b6', vellumS: '#b8a67e', vellumD: '#8e7c58', terciopelo: '#8a1e2a', terciopeloL: '#b83a44',
});

const A_RAMPA = [A_.m0, A_.m1, A_.m2, A_.m3, A_.m4, A_.m5];

const A_LOMOS = pal({ a: '#6a2a1e', b: '#8a4a26', c: '#3a4a2a', d: '#a87a3a', e: '#4a2a3a', f: '#7a6a4a', g: '#2a3a52', i: '#9a3a24', j: '#5a4a2a' });

const A_LOMOS_L = Object.values(A_LOMOS);

const A_VACIO = 0x01020304;

// mezcla dos colores (k = 0 el primero, 1 el segundo)
const a_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

// aclara (o tiñe) un píxel hacia col
const a_tine = (R, x, y, k, col) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_mez(R.pget(x, y), col, k)); };

// un búfer que se dibuja una sola vez por lienzo y clave (con vacio, lo que no se pinta queda transparente)
const a_CACHE = new WeakMap();

function a_buf(R, clave, dibuja, vacio = false) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(); if (vacio) b.fill(A_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// pega las filas y0–y1 de un búfer con huecos transparentes
function a_pega(R, b, y0, y1) { for (let y = y0; y <= y1; y++) { const f = y * 320; for (let x = 0; x < 320; x++) { const c = b[f + x]; if (c !== A_VACIO) R.pset(x, y, c); } } }

// un panel de mármol translúcido iluminado desde detrás: más luz en el centro, vetas onduladas oscuras, una veta fina
// cruzada y el grano; luz 0–1
function a_panel(R, x0, y0, x1, y1, k, luz) {
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2 + 1, ry = (y1 - y0) / 2 + 1, f = h(k, 3) * 6.3, ang = h(k, 7) * 0.5 - 0.25;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
    const v1 = Math.sin(x * (0.2 + ang * 0.2) + y * (0.09 + ang) + f + 2.6 * Math.sin(y * 0.15 + x * 0.04 + f));
    const v2 = Math.sin(x * 0.47 - y * 0.29 + f * 2 + 1.5 * Math.sin(x * 0.11 + f));
    let g = luz * (1.08 - d * 0.5) + (h(x >> 1, y >> 1, k) - 0.5) * 0.16;
    if (Math.abs(v1) < 0.09) g -= 0.3; else if (Math.abs(v1) < 0.2) g -= 0.11;
    if (Math.abs(v2) < 0.05) g -= 0.17;
    if (x === x0 || y === y0) g -= 0.18;
    const v = g * 5.3 + ((x + y) & 1) * 0.45 - 0.2;
    R.pset(x, y, A_RAMPA[Math.max(0, Math.min(5, Math.floor(v)))]);
  }
}

// granito moteado en un rectángulo
function a_granito(R, x0, y0, x1, y1, c = A_.gran, cL = A_.granL, cS = A_.granS, k = 0) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, k); R.pset(x, y, n < 0.12 ? cL : n > 0.86 ? cS : c); }
}

// una balda de libros: lomos de 2–4 px de ancho y alturas distintas, con su luz arriba y a la izquierda, algún libro
// tumbado o inclinado y huecos oscuros; la balda de bronce debajo
function a_balda(R, x0, x1, yb, alto, k, esc = 1) {
  const { rect, pset } = R;
  rect(x0, yb - alto, x1, yb - 1, A_.lomoF);
  let x = x0, n = 0;
  while (x < x1) {
    const r = h(n, k, 11), w = (2 + Math.floor(r * 3)) * esc, hh = Math.round(alto * (0.62 + h(n, k, 12) * 0.34)), c = A_LOMOS_L[Math.floor(h(n, k, 13) * A_LOMOS_L.length)];
    n++;
    if (r > 0.94) { x += 2 * esc; continue; }   // un hueco
    if (r > 0.9 && x + 10 * esc < x1) {   // un libro tumbado
      rect(x, yb - 3 * esc, x + 9 * esc, yb - 1, c); rect(x, yb - 3 * esc, x + 9 * esc, yb - 3 * esc, a_mez(c, A_.m5, 0.35)); x += 11 * esc; continue;
    }
    const xe = Math.min(x1, x + w - 1);
    rect(x, yb - hh, xe, yb - 1, c);
    rect(x, yb - hh, xe, yb - hh, a_mez(c, A_.m5, 0.4)); rect(x, yb - hh, x, yb - 1, a_mez(c, A_.m5, 0.2)); if (xe > x) rect(xe, yb - hh, xe, yb - 1, a_mez(c, A_.k ?? 0xff000000, 0.35));
    if (hh > 6) { const yy = yb - hh + 2 + Math.floor(h(n, k, 14) * 3); rect(x, yy, xe, yy, a_mez(c, A_.oro, 0.45)); if (hh > 9) rect(x, yb - 4, xe, yb - 4, a_mez(c, A_.oro, 0.3)); }
    x = xe + 1;
  }
  rect(x0, yb, x1, yb + esc, A_.bronceS); rect(x0, yb, x1, yb, A_.bronce);
  for (let i = x0; i <= x1; i += 2) pset(i, yb - alto, a_mez(A_.lomoF, A_.m4, 0.25));
}

// una figurita de fondo (9–10 px de alto) dibujada con pset, para que respete R.recorte: cabeza, pelo, cuerpo con su
// luz, brazos que se balancean y piernas que andan (paso: la fase de la zancada; null quieta). Silueta: o.silueta
function a_gente(R, x, pies, paso, o = {}) {
  const { pset } = R, sil = o.silueta, cu = sil ? A_.techoS : o.cuerpo, cuL = sil ? A_.granS : a_mez(o.cuerpo, 0xffffffff, 0.3), pi = sil ? A_.techoS : (o.piel ?? A_.piel), pe = sil ? A_.techoS : (o.pelo ?? A_.nogalD), pa = sil ? A_.techoS : (o.piernas ?? A_.granS);
  const fa = paso == null ? 0 : Math.round(Math.sin(paso) * 1.4), al = o.alto ?? 10;
  // piernas
  for (let j = 0; j < 3; j++) { pset(x - 1 - (j === 2 ? fa : 0), pies - j, pa); pset(x + 1 + (j === 2 ? fa : 0), pies - j, pa); }
  // cuerpo
  const yc = pies - 3, yh = pies - al + 3;
  for (let y = yh; y < yc; y++) for (let i = -1; i <= 1; i++) pset(x + i, y, i === -1 ? cuL : cu);
  for (let i = -2; i <= 2; i++) pset(x + i, yh, cu);
  pset(x - 2, yh + 1 + (fa > 0 ? 1 : 0), cu); pset(x - 2, yh + 2 + (fa > 0 ? 1 : 0), pi); pset(x + 2, yh + 1 + (fa < 0 ? 1 : 0), cu); pset(x + 2, yh + 2 + (fa < 0 ? 1 : 0), pi);
  // cabeza
  for (let j = 0; j < 3; j++) for (let i = -1; i <= 1; i++) pset(x + i, yh - 3 + j, j === 0 ? pe : pi);
  pset(x + (o.dir ?? 1) * -1, yh - 2, pe);
}

function a_salaFondo(R) {
  const { rect, pset, linea } = R;
  // el techo de casetones oscuros con los focos empotrados (apagados y tenues: es de noche)
  rect(0, 0, 319, 17, A_.techo);
  for (let x = 0; x < 320; x += 20) { rect(x, 0, x, 16, A_.techoS); rect(x + 1, 0, x + 1, 16, A_.techoL); }
  rect(0, 7, 319, 7, A_.techoS); rect(0, 8, 319, 8, A_.techoL);
  for (let x = 10; x < 320; x += 40) { rect(x - 2, 12, x + 2, 13, A_.techoS); rect(x - 1, 13, x + 1, 13, A_.granS); }
  rect(0, 15, 319, 15, A_.granS); rect(0, 16, 319, 17, A_.gran); rect(0, 16, 319, 16, A_.granL);
  // la pared de mármol translúcido: rejilla de granito y tres filas de paneles dorados (más apagados en la esquina de Atom)
  a_granito(R, 0, 18, 319, 92, A_.gran, A_.granL, A_.granS, 1);
  for (let c = 0; c < 14; c++) for (let r = 0; r < 3; r++) {
    const x0 = -9 + c * 25 + 3, y0 = 18 + r * 25 + 3, x1 = x0 + 21, y1 = Math.min(92, y0 + 21);
    let luz = 0.8 + h(c, r, 5) * 0.2 - Math.abs(x0 + 10 - 160) / 700;
    if (x0 > 255 && y0 < 48) luz = 0.38; else if (x0 > 230 && y0 < 48) luz *= 0.8;
    a_panel(R, x0, y0, x1, y1, c * 3 + r, luz);
    rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, A_.granS); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, A_.granL);
  }
  // el resplandor dorado de los paneles sobre el granito (tramado)
  for (let y = 18; y < 92; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0 && h(x, y, 9) < 0.18) { const p = R.pget(x, y); if (p === A_.gran) pset(x, y, A_.m0); }
  // el entresuelo: el canto de la losa de granito y su sombra
  a_granito(R, 0, 93, 319, 100, A_.granD, A_.gran, A_.granS, 2); rect(0, 93, 319, 93, A_.granL); rect(0, 100, 319, 100, A_.granS);
  // abajo, en penumbra: la pared de granito oscuro con la sombra del entresuelo y la luz de las vitrinas
  a_granito(R, 0, 101, 319, 141, A_.granS, A_.granD, A_.techoS, 3);
  for (let y = 101; y < 106; y++) for (let x = (y & 1); x < 320; x += 2) pset(x, y, A_.techoS);
  for (let x = 30; x < 320; x += 60) for (let j = 0; j < 22; j++) { const y = 106 + j; for (let i = -6 + (j >> 2); i <= 6 - (j >> 2); i++) if (((i + y) & 1) === 0) a_tine(R, x + i, y, 0.2, A_.m3); }
  rect(0, 141, 319, 141, A_.granL);
  // las dos vitrinas de abajo: mueble de nogal con cuarterones, la caja de cristal con su luz, los libros abiertos dentro
  for (const [a, b] of [[10, 86], [234, 310]]) {
    rect(a, 124, b, 141, A_.nogalS); rect(a + 1, 125, b - 1, 140, A_.nogal); rect(a + 1, 125, b - 1, 125, A_.nogalL);
    for (let x = a + 4; x + 14 < b; x += 18) { rect(x, 128, x + 14, 138, A_.nogalS); rect(x + 1, 129, x + 13, 137, A_.nogal); rect(x + 1, 129, x + 13, 129, A_.nogalL); rect(x + 14, 129, x + 14, 138, A_.nogalD); }
    rect(a - 1, 122, b + 1, 124, A_.bronceS); rect(a - 1, 122, b + 1, 122, A_.bronceL);
    rect(a, 110, b, 121, a_mez(A_.m2, A_.vidrio, 0.35));
    for (let y = 110; y <= 121; y++) for (let x = a; x <= b; x++) if (((x + y) & 1) && y < 116) pset(x, y, a_mez(A_.m3, A_.vidrio, 0.3));
    rect(a, 120, b, 121, A_.terciopelo); rect(a, 120, b, 120, A_.terciopeloL);
    // dentro: un libro abierto con su dibujo (una planta verde y una rueda azul), un libro cerrado de pie en su atril y
    // un rollo de pergamino atado
    { const x = a + 6; rect(x, 114, x + 9, 119, A_.perg); rect(x + 10, 114, x + 19, 119, A_.pergL); rect(x + 9, 114, x + 10, 119, A_.pergS); rect(x - 1, 119, x + 20, 119, A_.nogalS);
      rect(x + 4, 115, x + 4, 118, A_.verdeS); pset(x + 3, 115, A_.verde); pset(x + 5, 116, A_.verde); pset(x + 3, 117, A_.verdeL); pset(x + 4, 114, A_.rojo);
      for (const [i, j] of [[14, 115], [13, 116], [15, 116], [14, 117], [12, 116], [16, 116]]) pset(x + i, j, j === 116 && i !== 14 ? A_.azulS : A_.azul); pset(x + 14, 116, A_.oro); }
    { const x = Math.round((a + b) / 2) - 4; rect(x, 111, x + 8, 119, A_.vellumD); rect(x + 1, 112, x + 7, 119, A_.vellum); rect(x + 1, 112, x + 2, 119, A_.vellumS); pset(x + 5, 114, A_.vellumS); rect(x - 2, 119, x + 10, 119, A_.bronce); }
    { const x = b - 22; rect(x, 116, x + 14, 119, A_.pergS); rect(x, 116, x + 14, 117, A_.perg); rect(x + 14, 116, x + 15, 119, A_.pergD); rect(x + 6, 116, x + 7, 119, A_.rojoS); }
    rect(a - 1, 109, b + 1, 109, A_.bronceL); rect(a - 1, 109, a - 1, 121, A_.bronce); rect(b + 1, 109, b + 1, 121, A_.bronce);
    for (let x = a + 10; x < b; x += 24) rect(x, 110, x, 121, a_mez(A_.bronce, A_.vidrio, 0.3));
    for (let y = 104; y < 109; y++) for (let x = a + 4; x <= b - 4; x++) if (((x + y) & 1) === 0) a_tine(R, x, y, 0.12 + (y - 104) * 0.03, A_.m4);
  }
  // los postes de bronce con el cordón de terciopelo, a los lados de la torre
  for (const [p0, p1] of [[92, 100], [220, 228]]) {
    for (const px of [p0, p1]) { rect(px - 1, 128, px + 1, 141, A_.bronceS); rect(px, 128, px, 141, A_.bronceL); rect(px - 2, 127, px + 2, 128, A_.bronce); rect(px - 2, 141, px + 2, 142, A_.bronceS); }
    for (let x = p0 + 1; x < p1; x++) { const y = 129 + Math.round(Math.sin((x - p0) / (p1 - p0) * Math.PI) * 3); pset(x, y, A_.terciopelo); pset(x, y + 1, A_.rojoS); }
  }
  // el suelo de piedra pulida: moteado, juntas que huyen hacia el fondo y juntas horizontales cada vez más separadas
  a_granito(R, 0, 142, 319, 179, A_.suelo, A_.sueloL, A_.sueloS, 4);
  for (let r = 0, y = 145; y < 180; r++, y += 3 + r * 2) rect(0, y, 319, y, A_.sueloJ);
  for (let xb = -360; xb <= 680; xb += 48) linea(160 + (xb - 160) * (142 - 96) / (180 - 96), 142, xb, 180, A_.sueloJ);
  // los reflejos dorados de la torre y de las vitrinas en la piedra
  for (let y = 143; y < 178; y++) {
    const k = 0.34 - (y - 143) * 0.009;
    for (let x = 106; x <= 214; x++) if (((x + y) & 1) === 0 && (x % 28) > 1 && h(x >> 1, y, 6) > 0.25) a_tine(R, x, y, k * (0.6 + 0.4 * Math.sin(x * 0.9)), A_.m4);
    for (const [a, b] of [[12, 84], [236, 308]]) if (y < 156) for (let x = a; x <= b; x += 2) if (h(x, y, 8) > 0.4) a_tine(R, x + (y & 1), y, 0.16, A_.m3);
  }
  // la torre de cristal: marco de bronce, seis pisos de libros, la luz cálida de dentro y los reflejos del cristal
  rect(104, 18, 216, 141, A_.lomoF);
  for (let p = 0; p < 6; p++) {
    const yb = 37 + p * 20;
    for (let y = yb - 19; y < yb - 13; y++) for (let x = 106; x <= 214; x++) if (((x + y) & 1) === 0) pset(x, y, a_mez(A_.lomoF, A_.m3, 0.22 - (y - yb + 19) * 0.03));
    a_balda(R, 106, 214, yb, 13, p + 20);
    rect(106, yb - 19, 214, yb - 19, a_mez(A_.m5, A_.lomoF, 0.3));
  }
  rect(106, 138, 214, 141, A_.bronceS);
  for (const vx of [132, 160, 188]) { rect(vx, 18, vx, 141, A_.bronceS); rect(vx + 1, 18, vx + 1, 141, A_.bronce); }
  rect(104, 18, 105, 141, A_.bronce); rect(104, 18, 104, 141, A_.bronceL); rect(215, 18, 216, 141, A_.bronceS);
  rect(104, 18, 216, 19, A_.bronceL);
  for (let y = 20; y < 141; y++) for (let x = 106; x <= 214; x++) {
    const d = ((x - y * 0.55) % 52 + 52) % 52, d2 = ((x - y * 0.55 + 20) % 52 + 52) % 52;
    if (d < 5) a_tine(R, x, y, 0.16, A_.vidrio); else if (d < 7) a_tine(R, x, y, 0.32, 0xffffffff); else if (d2 < 1) a_tine(R, x, y, 0.2, 0xffffffff);
  }
}

// la sala de noche, entera (ver la cabecera de biblioteca)
function a_sala(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(a_buf(R, 'sala', () => a_salaFondo(R)));
  // los faros de un coche, fuera, barren los paneles de mármol cada 11 s
  { const u = (t % 11) / 4.5; if (u < 1) { const bx = Math.round(-30 + u * 380);
    for (let y = 21; y < 92; y++) for (let x = bx - 16; x <= bx + 16; x++) { if (x < 0 || x > 319 || (x >= 103 && x <= 217) || (x > 255 && y < 48)) continue; const k = 0.22 * (1 - Math.abs(x - bx) / 17); if (((x + y) & 1) === 0 || k > 0.15) a_tine(R, x, y, k, A_.m6); } } }
  // el entresuelo: dos lectores que pasan en silueta y otro que lee apoyado en la barandilla (pasa la página)
  R.recorte([0, 70, 102, 92]);
  { const p = (t / 17) % 2, x = Math.round(p < 1 ? 6 + p * 92 : 98 - (p - 1) * 92); a_gente(R, x, 92, t * 7, { silueta: true, dir: p < 1 ? 1 : -1 }); }
  { const x = 40 + Math.round(Math.sin(t * 0.3) * 6); a_gente(R, x, 92, null, { silueta: true }); }
  R.recorte([218, 70, 319, 92]);
  { const p = (t / 21 + 0.4) % 2, x = Math.round(p < 1 ? 222 + p * 92 : 314 - (p - 1) * 92); a_gente(R, x, 92, t * 6, { silueta: true }); }
  a_gente(R, 252, 92, null, { silueta: true }); rect(254, 86, 256, 88, A_.m5); if (Math.floor(t / 2.3) % 2) pset(256, 86, A_.m6);
  R.recorte(null);
  // la barandilla de bronce, por delante de los lectores
  for (const [a, b] of [[0, 103], [217, 319]]) { rect(a, 84, b, 84, A_.bronceL); rect(a, 85, b, 85, A_.bronceS); for (let x = a + 3; x < b; x += 6) rect(x, 86, x, 92, A_.bronceS); rect(a, 91, b, 91, A_.bronce); }
  // dentro de la torre, un bibliotecario pequeño empuja el carrito por el tercer piso (tras el cristal)
  R.recorte([106, 62, 214, 76]);
  { const p = (t / 14) % 2, d = p < 1 ? 1 : -1, x = Math.round(p < 1 ? 116 + p * 86 : 202 - (p - 1) * 86), cx = x + d * 7;
    a_gente(R, x, 76, t * 6, { cuerpo: hex('#3a4a6a'), pelo: hex('#c8c0b0'), dir: d });
    for (let j = 0; j < 4; j++) linea(cx - 4, 70 + j, cx + 4, 70 + j, j === 0 ? A_.bronceL : A_.bronce);
    for (let i = -3; i <= 3; i += 2) linea(cx + i, 66 + (i & 2 ? 1 : 0), cx + i, 69, A_LOMOS_L[(i + 3) % 9]);
    pset(cx - 3, 75, A_.techoS); pset(cx + 3, 75, A_.techoS); linea(cx - d * 4, 70, cx - d * 6, 68, A_.bronceL); }
  R.recorte(null);
  // el foco del techo: su luz baja en cono sobre el atril, con motas de polvo
  rect(156, 14, 164, 18, A_.techoS); rect(157, 18, 163, 19, A_.bronceS); rect(158, 19, 162, 19, A_.m6);
  for (let y = 20; y < 118; y++) { const w = 2 + (y - 20) * 0.2; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) if (((x + y + (y >> 3)) & 1) === 0) a_tine(R, x, y, 0.14 + (Math.abs(x - 160) < w * 0.5 ? 0.08 : 0), A_.m6); }
  for (let k = 0; k < 16; k++) { const fy = (h(k, 1, 31) * 96 + t * (3 + h(k, 2, 31) * 4)) % 96, y = Math.round(22 + fy), w = 2 + fy * 0.2, x = Math.round(160 + (h(k, 3, 31) * 2 - 1) * w * 0.9 + Math.sin(t * 0.7 + k) * 1.5); if (Math.sin(t * 1.3 + k * 2.1) > -0.3) pset(x, y, A_.m6); }
  // el charco de luz del foco en el suelo
  for (let y = 145; y < 160; y++) for (let x = 120; x <= 200; x++) { const e = ((x - 160) / 40) ** 2 + ((y - 152) / 7) ** 2; if (e < 1 && (((x + y) & 1) === 0 || e < 0.45)) a_tine(R, x, y, 0.2 * (1 - e), A_.m5); }
  // un brillo que recorre el cristal de las vitrinas
  for (const [a, b, f] of [[10, 86, 0], [234, 310, 3]]) { const g = ((t + f) % 6.5) / 1.3; if (g < 1) { const x0 = Math.round(a + g * (b - a)); for (let j = 0; j < 12; j++) { pset(x0 + j / 2, 110 + j, a_mez(R.pget(x0 + j / 2, 110 + j), 0xffffffff, 0.45)); pset(x0 + 3 + j / 2, 110 + j, a_mez(R.pget(x0 + 3 + j / 2, 110 + j), 0xffffffff, 0.25)); } } }
  // la luz de dentro de la torre respira un poco (un piso se enciende algo más)
  { const p = Math.floor(t / 4) % 6, yb = 37 + p * 20, k = 0.07 * (0.5 + 0.5 * Math.sin(t * 1.6)); for (let y = yb - 13; y < yb; y++) for (let x = 106 + (y & 1); x <= 214; x += 2) a_tine(R, x, y, k, A_.m5); }
  return { suelo: 152, atril: [160, 121], libro: [160, 112], torre: [104, 18, 216, 141], vitrinas: [[10, 109, 86, 141], [234, 109, 310, 141]], entresuelo: 92, foco: [160, 19] };
}

// lo de delante en la sala: el atril con el libro bajo el foco y su cartela, la vitrina baja y el poste con cordón
function a_salaDelante(R, t, o) {
  const { rect, pset, linea, poligono, disco } = R;
  // el atril: pie redondo, columna de bronce y tablero inclinado de nogal con su reborde
  for (let y = 149; y <= 153; y++) for (let x = 148; x <= 172; x++) if (((x - 160) / 12) ** 2 + ((y - 151) / 2.6) ** 2 < 1) pset(x, y, y < 151 ? A_.bronce : A_.bronceS);
  rect(158, 126, 162, 150, A_.bronceS); rect(159, 126, 160, 150, A_.bronce); rect(159, 128, 159, 148, A_.bronceL);
  rect(156, 140, 164, 141, A_.bronceS); rect(156, 140, 164, 140, A_.bronceL);
  poligono([[141, 117], [179, 117], [182, 127], [138, 127]], A_.nogal); rect(140, 117, 180, 117, A_.nogalL); rect(138, 126, 182, 128, A_.nogalS); rect(138, 126, 182, 126, A_.nogalL);
  for (let x = 142; x < 178; x += 5) pset(x + 1, 122, A_.nogalS);
  // el libro abierto encima, con los signos que brillan si o.brilla; la luz del foco sobre las hojas. Con o.libro false,
  // el atril vacío: la cuña de espuma gris y el cordón de cuentas sueltos, a la espera del libro
  const conLibro = o.libro !== false;
  if (conLibro && PIEZAS_VM.libroVoynich) PIEZAS_VM.libroVoynich(R, 160, 125, { abierto: true, pagina: o.pagina ?? 'planta', brilla: !!o.brilla, mueve: true, t });
  if (!conLibro) {
    poligono([[146, 125], [158, 121], [158, 125]], A_.espumaS); poligono([[162, 121], [174, 125], [162, 125]], A_.espumaS);
    linea(147, 124, 157, 121, A_.espuma); linea(163, 121, 173, 124, A_.espuma);
    for (let x = 150; x <= 170; x += 2) pset(x, 125 + ((x >> 1) & 1), A_.guante);
  }
  for (let y = 108; y < 125; y++) for (let x = 144; x <= 176; x++) if (((x + y) & 1) === 0) a_tine(R, x, y, 0.08, A_.m6);
  if (o.brilla && conLibro) { for (let k = 0; k < 4; k++) { const a = t * 3 + k * 1.6, x = Math.round(168 + Math.cos(a) * 9), y = Math.round(114 + Math.sin(a) * 5); pset(x, y, A_.oroL); pset(x + 1, y, A_.oro); pset(x, y - 1, A_.oro); } }
  // la cartela del atril con su número (o.numero)
  if (o.numero != null) { rect(145, 131, 175, 143, A_.nogalD); rect(146, 132, 174, 142, A_.papel); rect(146, 142, 174, 142, A_.papelS); R.numero(String(o.numero), 160, 141, { centro: true }); }
  // la vitrina baja del primer término: base de nogal con cuarterones, la caja de cristal con un libro cerrado, una
  // pluma y una tarjeta, y el reflejo que se desliza
  rect(0, 165, 58, 179, A_.nogalD); rect(0, 166, 57, 179, A_.nogal); rect(0, 166, 57, 166, A_.nogalL);
  for (let x = 2; x < 52; x += 17) { rect(x, 169, x + 13, 177, A_.nogalS); rect(x + 1, 170, x + 12, 176, A_.nogal); rect(x + 1, 170, x + 12, 170, A_.nogalL); }
  poligono([[0, 153], [52, 153], [58, 164], [0, 164]], a_mez(A_.terciopelo, A_.vidrio, 0.25));
  rect(0, 162, 57, 164, A_.terciopelo); rect(0, 162, 57, 162, A_.terciopeloL);
  rect(10, 155, 26, 161, A_.vellumS); rect(11, 155, 25, 160, A_.vellum); rect(11, 155, 12, 160, A_.vellumD); pset(19, 157, A_.vellumD); pset(21, 158, A_.vellumD);
  linea(32, 161, 44, 155, A_.pergL); linea(33, 161, 45, 155, A_.pergS); rect(46, 157, 52, 161, A_.papel); rect(47, 159, 51, 159, A_.raya);
  rect(0, 152, 53, 152, A_.bronceL); linea(53, 152, 58, 163, A_.bronceL);
  { const g = (t % 7) / 1.4; if (g < 1) { const x0 = Math.round(g * 60); for (let j = 0; j < 10; j++) { a_tine(R, x0 + j, 153 + j, 0.4, 0xffffffff); a_tine(R, x0 + j + 2, 153 + j, 0.2, 0xffffffff); } } }
  // el poste de bronce con el cordón de terciopelo que cae hacia el borde
  rect(292, 146, 297, 179, A_.bronceS); rect(293, 146, 295, 179, A_.bronce); rect(293, 148, 293, 178, A_.bronceL);
  disco(294.5, 145, 4, A_.bronceS); disco(294.5, 145, 3, A_.bronce); pset(293, 143, A_.bronceL);
  rect(289, 175, 300, 179, A_.bronceS); rect(289, 175, 300, 175, A_.bronceL);
  const sw = Math.sin(t * 0.8) * 1.2;
  for (let x = 270; x <= 292; x++) { const u = (292 - x) / 22, y = Math.round(150 + u * 14 - Math.sin(u * Math.PI) * (2 + sw)); pset(x, y, A_.terciopeloL); pset(x, y + 1, A_.terciopelo); pset(x, y + 2, A_.rojoS); }
  for (let x = 297; x <= 319; x++) { const u = (x - 297) / 22, y = Math.round(150 + u * 10 + Math.sin(u * Math.PI) * (3 + sw)); pset(x, y, A_.terciopeloL); pset(x, y + 1, A_.terciopelo); pset(x, y + 2, A_.rojoS); }
}
// una hoja alargada (elipse girada) con su luz, su sombra y el nervio
function a_hoja(R, cx, cy, l, w, ang, c, cL, cS, borde) {
  const ca = Math.cos(ang), sa = Math.sin(ang);
  for (let j = -l; j <= l; j++) for (let i = -w; i <= w; i++) {
    const e = (j / l) ** 2 + (i / w) ** 2; if (e > 1) continue;
    const x = Math.round(cx + j * ca - i * sa), y = Math.round(cy + j * sa + i * ca);
    R.pset(x, y, e > 0.72 ? borde : i === 0 ? cS : i < 0 ? cL : c);
  }
}

function a_dibujo(R, pag, x0, y0, w, a, k = 0) {
  const { pset, disco, linea, rect } = R, s = Math.min(w, a) / 100, X = (u) => Math.round(x0 + u * w / 100), Y = (v) => Math.round(y0 + v * a / 100);
  const T = A_.tinta;
  if (pag === 'estrellas') {
    // la rueda: aros concéntricos de tinta, la corona exterior en sectores con estrellas, el aro azul y el sol del centro
    const cx = X(50), cy = Y(50), r = 48 * s;
    disco(cx, cy, r + 1, T); disco(cx, cy, r, A_.pergM); disco(cx, cy, r * 0.74 + 1, T); disco(cx, cy, r * 0.74, A_.azulL); disco(cx, cy, r * 0.5 + 1, T); disco(cx, cy, r * 0.5, A_.perg); disco(cx, cy, r * 0.28 + 1, T); disco(cx, cy, r * 0.28, A_.oro);
    for (let n = 0; n < 12; n++) { const an = n / 12 * Math.PI * 2; linea(cx + Math.cos(an) * r * 0.74, cy + Math.sin(an) * r * 0.74, cx + Math.cos(an) * r, cy + Math.sin(an) * r, T);
      const am = an + Math.PI / 12, sx = Math.round(cx + Math.cos(am) * r * 0.87), sy = Math.round(cy + Math.sin(am) * r * 0.87), c = n % 3 ? A_.rojo : A_.oro; pset(sx, sy, c); pset(sx - 1, sy, c); pset(sx + 1, sy, c); pset(sx, sy - 1, c); pset(sx, sy + 1, c); }
    for (let n = 0; n < 9; n++) { const an = n / 9 * Math.PI * 2 + 0.2, sx = Math.round(cx + Math.cos(an) * r * 0.62), sy = Math.round(cy + Math.sin(an) * r * 0.62); pset(sx, sy, A_.azulS); pset(sx + 1, sy, A_.azulS); pset(sx, sy + 1, A_.azulS); pset(sx - 1, sy - 1, 0xffffffff); }
    for (let n = 0; n < 7; n++) { const an = n / 7 * Math.PI * 2, sx = Math.round(cx + Math.cos(an) * r * 0.39), sy = Math.round(cy + Math.sin(an) * r * 0.39); pset(sx, sy, A_.oroS); pset(sx, sy - 1, A_.oro); }
    for (let n = 0; n < 16; n++) { const an = n / 16 * Math.PI * 2; linea(cx + Math.cos(an) * r * 0.29, cy + Math.sin(an) * r * 0.29, cx + Math.cos(an + 0.1) * r * 0.36, cy + Math.sin(an + 0.1) * r * 0.36, A_.ocreS); }
    disco(cx, cy, r * 0.14, A_.oroL);
    return;
  }
  if (pag === 'estanques') {
    // dos estanques de tinta verde unidos por tubos, con el agua azul que riza y figuritas vestidas metidas hasta la cintura
    const est = (ux, uy, uw, uh) => { const cx = X(ux), cy = Y(uy), rx = uw * w / 200, ry = uh * a / 200;
      for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (e > 1) continue; pset(x, y, e > 0.8 ? T : e > 0.62 ? A_.verde : y < cy - ry * 0.3 ? A_.pergM : (((x * 3 + y * 5) % 7) === 0 ? A_.azulL : A_.azul)); } return [cx, cy, rx, ry]; };
    const tubo = (ax, ay, bx, by) => { for (let d = -2; d <= 2; d++) linea(X(ax), Y(ay) + d, X(bx), Y(by) + d, Math.abs(d) === 2 ? T : d === -1 ? A_.verdeL : A_.verde); };
    tubo(18, 30, 40, 72); tubo(60, 34, 84, 66); tubo(30, 30, 70, 34);
    const e1 = est(30, 34, 52, 30), e2 = est(64, 74, 62, 32);
    for (const [ex, ey, rx, ry, n] of [[...e1, 3], [...e2, 4]]) for (let i = 0; i < n; i++) {
      const fx = Math.round(ex - rx * 0.6 + i * rx * 1.2 / (n - 1)), fy = Math.round(ey - ry * 0.1), c = [A_.azulS, A_.rojo, A_.ocreS, A_.verdeS][(i + n) % 4];
      for (let j = -5; j <= 0; j++) for (let ii = -1; ii <= 1; ii++) pset(fx + ii, fy + j, ii === -1 ? a_mez(c, 0xffffffff, 0.3) : c);
      pset(fx - 2, fy - 4, c); pset(fx + 2, fy - 4, c); for (let j = 0; j < 2; j++) for (let ii = -1; ii <= 0; ii++) pset(fx + ii, fy - 8 + j, A_.piel); pset(fx - 1, fy - 8, T); pset(fx, fy - 8, T);
      for (let ii = -2; ii <= 2; ii++) pset(fx + ii, fy + 1, A_.azulL);
    }
    // el arco de lluvia de estrellas por encima
    for (let n = 0; n < 9; n++) { const sx = X(10 + n * 10), sy = Y(4 + Math.abs(n - 4) * 2); pset(sx, sy, A_.oro); pset(sx, sy + 1, A_.oroS); }
    return;
  }
  if (pag === 'tarros') {
    // tres tarros de botica con tapa, bandas pintadas y raíces y hojas que asoman al lado
    const tarro = (ux, uw, uh, c, cL) => { const x1 = X(ux), x2 = X(ux + uw), yb = Y(96), yt = Y(96 - uh);
      for (let y = yt; y <= yb; y++) { const cur = Math.round(Math.sin((y - yt) / (yb - yt) * Math.PI) * 2); for (let x = x1 - cur; x <= x2 + cur; x++) pset(x, y, x === x1 - cur || x === x2 + cur || y === yb ? T : x < x1 + 2 ? cL : c); }
      for (const f of [0.25, 0.6]) { const y = Math.round(yt + (yb - yt) * f); linea(x1 - 1, y, x2 + 1, y, A_.oro); linea(x1, y + 1, x2, y + 1, A_.oroS); for (let x = x1 + 2; x < x2; x += 4) pset(x, y + 3, T); }
      rect(x1 - 2, yt - 4, x2 + 2, yt - 1, T); rect(x1 - 1, yt - 3, x2 + 1, yt - 2, A_.ocre); rect(Math.round((x1 + x2) / 2) - 1, yt - 7, Math.round((x1 + x2) / 2) + 1, yt - 4, T); pset(Math.round((x1 + x2) / 2), yt - 6, A_.oro); };
    tarro(6, 22, 52, A_.azul, A_.azulL); tarro(38, 24, 70, A_.rojo, A_.rojoL); tarro(72, 22, 44, A_.verde, A_.verdeL);
    for (const [ux, uy, l] of [[30, 30, 10], [66, 22, 9], [92, 40, 8]]) { a_hoja(R, X(ux), Y(uy), Math.round(l * s * 1.6), Math.max(1, Math.round(3 * s)), -0.9, A_.verde, A_.verdeL, A_.verdeS, T); linea(X(ux), Y(uy), X(ux) + 1, Y(uy + 30), A_.ocreS); for (let k = 0; k < 4; k++) linea(X(ux) + 1, Y(uy + 30), X(ux - 4 + k * 3), Y(uy + 40), A_.ocreS); }
    return;
  }
  // 'planta': la planta imposible: el bulbo con raíces como patas, el tallo, hojas de dos verdes y una flor roja y azul
  const bx = X(50), by = Y(78), rb = 10 * s;
  for (let k = 0; k < 5; k++) { let px = bx, py = by; const dx = (k - 2) * 4.2 * s; for (let n = 0; n < 9; n++) { const nx = px + dx * 0.5 + Math.sin(n * 0.9 + k) * 2 * s, ny = py + 2.2 * s; linea(px, py, nx, ny, T); linea(px + 1, py, nx + 1, ny, A_.ocreS); px = nx; py = ny; } }
  for (let y = Math.floor(by - rb); y <= by + rb; y++) for (let x = Math.floor(bx - rb * 1.3); x <= bx + rb * 1.3; x++) { const e = ((x - bx) / (rb * 1.3)) ** 2 + ((y - by) / rb) ** 2; if (e <= 1) pset(x, y, e > 0.78 ? T : x < bx - rb * 0.4 ? A_.ocre : (((x + y) % 5) === 0 ? A_.ocreS : A_.tierraS)); }
  for (let d = -1; d <= 1; d++) linea(bx + d, by - rb, bx + d + Math.round(2 * s), Y(16), d === 0 ? A_.verdeS : A_.verde);
  const HOJAS = [[30, 1, 0.5], [44, -1, 0.35], [56, 1, 0.25], [66, -1, 0.15], [36, -1, 0.6], [24, 1, 0.1]];
  HOJAS.forEach(([uy, lado, inc], n) => { const cy = Y(uy), cx = bx + lado * 13 * s; a_hoja(R, cx, cy, Math.round(13 * s), Math.max(2, Math.round(4.2 * s)), lado > 0 ? -inc : Math.PI + inc, n % 2 ? A_.verde : A_.verdeS, A_.verdeL, A_.verdeS, T); });
  const fx = bx + Math.round(2 * s), fy = Y(13);
  for (let n = 0; n < 6; n++) { const an = n / 6 * Math.PI * 2; a_hoja(R, fx + Math.cos(an) * 5 * s, fy + Math.sin(an) * 4 * s, Math.max(2, Math.round(5 * s)), Math.max(1, Math.round(2.4 * s)), an, n % 2 ? A_.rojo : A_.azul, n % 2 ? A_.rojoL : A_.azulL, n % 2 ? A_.rojoS : A_.azulS, T); }
  disco(fx, fy, Math.max(1.5, 2.6 * s), A_.oro); pset(fx - 1, fy - 1, A_.oroL);
}

// LOS SIGNOS INVENTADOS, más grandes que los del kit: bucles con cola, rizos, ganchos y «gallows» de trazos altos con
// lazo; ninguno es una letra. Cada uno es una plantilla de filas ('#' tinta), alineada abajo
const A_SIGNOS = [
  ['.###.', '#...#', '#.#.#', '#..#.', '.#...'], ['.#.#.', '#.#.#', '.#.#.'], ['#....', '.#...', '.##..', '.#.#.', '.#..#'],
  ['.##..', '#..#.', '.##..', '..#..', '.#...'], ['.#...', '#.#.#', '...#.'], ['.#.#.#.', '#.#.#.#'], ['.#..', '###.', '.#.#', '..#.'],
  ['..##', '.#..', '#.##', '#..#', '.##.', '...#'], ['#.#', '.#.', '#.#', '..#', '.#.'],
];

const A_HORCAS = [
  ['..#.#', '.#..#', '..#.#', '.##.#', '#.#.#', '#.###', '.#...'],
  ['.#.#.', '#.#.#', '#.#.#', '.#.#.', '.#.#.', '.#.#.', '##.##'],
  ['.##...', '#..#..', '.##...', '.#.#..', '.#..#.', '.#..#.', '.#..##'],
];

// un renglón de signos: palabras de 2–5 signos; esc el tamaño del trazo; c(i, x) el color de cada signo (o un color);
// mueve: cuánto tiemblan; devuelve hasta dónde llegó
function a_renglon(R, x0, yb, ancho, semilla, c, esc = 1, mueve = 0, t = 0) {
  let x = x0, n = 0, k = semilla * 7 + 3;
  const rnd = () => { k = (k * 1103515245 + 12345) & 0x7fffffff; return k / 0x7fffffff; };
  while (x < x0 + ancho) {
    const pal_ = 2 + Math.floor(rnd() * 4);
    for (let m = 0; m < pal_; m++) {
      const horca = m === 0 && rnd() < 0.22, g = horca ? A_HORCAS[Math.floor(rnd() * A_HORCAS.length)] : A_SIGNOS[Math.floor(rnd() * A_SIGNOS.length)];
      const gw = g[0].length * esc; if (x + gw > x0 + ancho) { x = x0 + ancho; break; }
      const col = typeof c === 'function' ? c(n, x) : c, dy = mueve ? Math.round(Math.sin(t * 5 + n * 1.7) * mueve * (h(n, semilla) > 0.6 ? 1 : 0)) : 0, top = yb - g.length * esc + 1 + dy;
      g.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') { for (let a = 0; a < esc; a++) for (let b = 0; b < esc; b++) R.pset(x + i * esc + a, top + j * esc + b, col); } });
      x += gw + esc; n++;
    }
    x += 2 * esc;
  }
  return x;
}

// pergamino moteado: base con manchas suaves, poros, alguna mancha de humedad y el borde más oscuro
function a_pergamino(R, x0, y0, x1, y1, k) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const n = h(x >> 2, y >> 2, k) * 0.5 + h(x >> 3, y >> 3, k + 1) * 0.5, b = Math.min(x - x0, x1 - x, y - y0, y1 - y);
    let c = n > 0.78 ? A_.pergM : n < 0.2 ? A_.pergL : A_.perg;
    const mancha = Math.sin(x * 0.05 + k) * Math.sin(y * 0.07 + k * 2) > 0.82;
    if (mancha) c = A_.pergS;
    if (b < 3) c = b === 0 ? A_.pergD : A_.pergS; else if (b < 6 && ((x + y) & 1)) c = A_.pergM;
    if (h(x, y, k + 2) > 0.985) c = A_.pergS;
    R.pset(x, y, c);
  }
}

function a_mesaFondo(R) {
  const { rect, pset } = R;
  // la cornisa de granito, oscura y tranquila bajo el año
  a_granito(R, 0, 0, 319, 116, A_.gran, A_.granL, A_.granS, 11);
  rect(0, 0, 319, 10, A_.techo); rect(0, 10, 319, 10, A_.granS); rect(0, 11, 319, 11, A_.granL);
  // tres filas de paneles de mármol grandes (la de abajo, a medias tras la librería; el de la esquina de Atom, apagado)
  for (let c = 0; c < 9; c++) for (let r = 0; r < 3; r++) {
    const x0 = -14 + c * 40 + 4, y0 = 14 + r * 36, x1 = x0 + 34, y1 = Math.min(102, y0 + 32);
    let luz = 0.82 + h(c, r, 15) * 0.18; if (x0 > 250 && r === 0) luz = 0.36; else if (x0 > 214 && r === 0) luz *= 0.82;
    a_panel(R, x0, y0, x1, y1, 40 + c * 2 + r, luz); rect(x0 - 1, y0 - 1, x1 + 1, y0 - 1, A_.granS); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 1, A_.granL);
  }
  // un trozo de la torre de cristal a la izquierda: tres pisos de libros grandes, el marco y los reflejos
  rect(0, 12, 62, 116, A_.lomoF);
  for (let p = 0; p < 4; p++) { const yb = 36 + p * 26; for (let y = yb - 25; y < yb - 17; y++) for (let x = (y & 1); x <= 60; x += 2) pset(x, y, a_mez(A_.lomoF, A_.m3, 0.2)); a_balda(R, 0, 60, yb, 17, p + 60, 2); }
  rect(61, 12, 62, 116, A_.bronce); rect(61, 12, 61, 116, A_.bronceL); rect(30, 12, 30, 116, A_.bronceS);
  for (let y = 12; y < 116; y++) for (let x = 0; x <= 60; x++) { const d = ((x - y * 0.55) % 60 + 60) % 60; if (d < 6) a_tine(R, x, y, 0.15, A_.vidrio); else if (d < 8) a_tine(R, x, y, 0.3, 0xffffffff); }
  // el zócalo y el suelo de tarima entre la pared y la mesa (y 117–119), con la sombra de la librería
  rect(0, 117, 319, 119, A_.nogalD); for (let x = 0; x < 320; x += 7) { pset(x, 118, A_.nogalS); pset(x + 3, 119, A_.nogalS); }
  rect(0, 117, 319, 117, A_.techoS);
  // la librería baja de nogal, al fondo de la sala de lectura, más baja que antes (tapa en y 104) para que los que están
  // tras la mesa se recorten con la cabeza y los hombros sobre el mármol encendido: tapa, una balda de lomos y costados
  rect(64, 104, 319, 116, A_.nogalS); rect(64, 104, 319, 106, A_.nogal); rect(64, 104, 319, 104, A_.nogalL);
  a_balda(R, 66, 319, 115, 8, 71);
  for (let x = 64; x < 320; x += 64) { rect(x, 107, x + 2, 116, A_.nogal); rect(x, 107, x, 116, A_.nogalL); }
  // sobre la librería, solo a la izquierda (donde no pasa nadie): una lámpara de lectura pequeña con su luz, una esfera
  // armilar de latón y unos libros apilados
  rect(68, 98, 78, 103, A_.lamp); rect(68, 98, 78, 98, A_.lampL); rect(72, 103, 73, 103, A_.laton);
  for (let y = 104; y < 107; y++) for (let x = 62; x <= 84; x++) if (((x + y) & 1) === 0) a_tine(R, x, y, 0.25, A_.m5);
  { const cx = 96, cy = 94; for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2; pset(Math.round(cx + Math.cos(an) * 5), Math.round(cy + Math.sin(an) * 5), A_.laton); pset(Math.round(cx + Math.cos(an) * 5), Math.round(cy + Math.sin(an) * 2), A_.latonS); pset(Math.round(cx + Math.cos(an) * 2), Math.round(cy + Math.sin(an) * 5), A_.latonS); } rect(cx - 1, cy + 5, cx + 1, 103, A_.latonS); rect(cx - 3, 103, cx + 3, 103, A_.laton); }
  for (let k = 0; k < 3; k++) { rect(106 + k, 102 - k * 2, 124 - k, 103 - k * 2, A_LOMOS_L[k + 2]); rect(106 + k, 102 - k * 2, 124 - k, 102 - k * 2, a_mez(A_LOMOS_L[k + 2], A_.m5, 0.4)); }
}
// la mesa de estudio con todo lo de encima, en un búfer con huecos (por clave de página)
function a_mesaCapa(R, pag) {
  const { rect, pset, linea, poligono, disco } = R;
  // la lámpara de banquero: base redonda de latón, columna, pantalla verde de cristal con su luz por dentro
  // el tablero de nogal con vetas, el tapete verde con su filete dorado, el canto y el faldón
  for (let y = 120; y <= 171; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.045 + Math.sin(y * 0.35 + x * 0.01) * 1.7 + y * 0.6); pset(x, y, v > 0.86 ? A_.nogalL : v < -0.9 ? A_.nogalS : A_.nogal); }
  rect(0, 120, 319, 120, A_.nogalL); rect(0, 121, 319, 121, a_mez(A_.nogal, A_.nogalL, 0.5));
  poligono([[22, 122], [298, 122], [312, 168], [8, 168]], A_.tapete);
  for (let y = 122; y < 168; y++) for (let x = 8; x < 312; x++) if (h(x, y, 21) > 0.9) { const p = R.pget(x, y); if (p === A_.tapete) pset(x, y, A_.tapeteS); }
  linea(22, 122, 298, 122, A_.tapeteS); linea(25, 124, 295, 124, A_.oroS); linea(12, 165, 308, 165, A_.oroS); linea(25, 124, 12, 165, A_.oroS); linea(295, 124, 308, 165, A_.oroS);
  rect(0, 172, 319, 179, A_.nogalS); rect(0, 172, 319, 173, A_.nogalL); rect(0, 174, 319, 174, A_.nogal); rect(0, 179, 319, 179, A_.nogalD);
  for (let x = 0; x < 320; x += 4) pset(x, 176, A_.nogal);
  // la luz de la lámpara sobre el tapete
  for (let y = 122; y < 170; y++) for (let x = 0; x < 140; x++) { const e = ((x - 46) / 80) ** 2 + ((y - 138) / 26) ** 2; if (e < 1 && (((x + y) & 1) === 0 || e < 0.3)) a_tine(R, x, y, 0.18 * (1 - e), A_.m5); }
  // el atril de espuma gris (dos cuñas) bajo el libro
  poligono([[98, 158], [158, 160], [158, 167], [94, 166]], A_.espumaS); poligono([[162, 160], [222, 158], [226, 166], [162, 167]], A_.espumaS);
  rect(96, 158, 224, 159, A_.espuma);
  // el libro abierto: dos páginas que se curvan hacia el lomo, el canto de las hojas y la sombra del lomo
  for (let x = 100; x <= 220; x++) {
    const dl = Math.abs(x - 160), dip = Math.round(4 * Math.exp(-((dl / 9) ** 2))), top = 123 + dip + (dl > 50 ? 1 : 0), bot = 160 - Math.round(dip / 2);
    for (let y = top; y <= bot; y++) { const n = h(x >> 2, y >> 2, 31); let c = n > 0.8 ? A_.pergM : n < 0.18 ? A_.pergL : A_.perg; if (y === top) c = A_.pergS; if (dl < 6) c = a_mez(c, A_.pergD, (6 - dl) / 9); pset(x, y, c); }
    for (let j = 1; j <= 3; j++) pset(x, bot + j, j === 3 ? A_.pergD : ((x + j) & 1) ? A_.pergS : A_.pergM);
  }
  rect(99, 124, 99, 162, A_.pergD); rect(221, 124, 221, 162, A_.pergD); rect(160, 128, 160, 158, A_.pergD);
  for (let y = 126; y < 160; y += 5) { pset(159, y, A_.tinta); pset(161, y + 2, A_.tinta); }   // el cosido
  for (let k = 0; k < 9; k++) { const x = 104 + k * 6, y = 152 + (k % 3); pset(x, y, A_.pergS); }
  // el dibujo de la página izquierda y una plantita a la derecha
  a_dibujo(R, pag, 106, 128, 50, 26, 3);
  if (pag !== 'planta') a_dibujo(R, 'planta', 196, 140, 20, 18, 4); else a_dibujo(R, 'estrellas', 196, 140, 20, 18, 4);
  // la cadena de cuentas blancas que sujeta la hoja derecha
  for (let x = 166; x <= 216; x += 2) { pset(x, 161, A_.guante); pset(x, 162, A_.guanteS); }
  // los guantes blancos de algodón, uno sobre otro, con los dedos y la costura
  const guante = (gx, gy, dir) => { rect(gx, gy, gx + 12, gy + 9, A_.guanteS); rect(gx + 1, gy + 1, gx + 11, gy + 8, A_.guante); for (let f = 0; f < 4; f++) { const fx = gx + 1 + f * 3; rect(fx, gy - 7 + Math.abs(f - 1.5) | 0, fx + 2, gy, A_.guanteS); rect(fx, gy - 6 + (Math.abs(f - 1.5) | 0), fx + 1, gy, A_.guante); }
    rect(gx + (dir > 0 ? 12 : -4), gy + 2, gx + (dir > 0 ? 16 : 0), gy + 6, A_.guanteS); rect(gx + (dir > 0 ? 12 : -3), gy + 3, gx + (dir > 0 ? 15 : 0), gy + 5, A_.guante);
    rect(gx - 1, gy + 9, gx + 13, gy + 13, A_.guanteS); rect(gx, gy + 10, gx + 12, gy + 12, A_.guante); for (let x = gx; x <= gx + 12; x += 2) pset(x, gy + 11, A_.guanteS); };
  guante(62, 146, 1); guante(74, 150, -1);
  // la lupa de latón con su mango de madera
  linea(244, 152, 256, 164, A_.nogalD); linea(245, 152, 257, 164, A_.madera ?? A_.nogalL); linea(245, 151, 257, 163, A_.nogalL);
  disco(238, 145, 10, A_.latonS); disco(238, 145, 9, A_.laton); disco(238, 145, 7.5, a_mez(A_.tapete, A_.azulL, 0.45)); disco(237, 144, 4, a_mez(A_.tapeteL, A_.azulL, 0.6));
  pset(234, 141, 0xffffffff); pset(235, 141, 0xffffffff); pset(234, 142, 0xffffffff);
  // la libreta abierta con renglones azules, un boceto a lápiz de la planta y cuatro rayitas de cuenta; el lápiz
  poligono([[252, 126], [304, 125], [308, 156], [254, 158]], A_.papelS); poligono([[253, 127], [279, 126], [280, 156], [255, 157]], A_.papel); poligono([[281, 126], [303, 126], [307, 155], [282, 156]], A_.papel);
  linea(280, 126, 281, 156, A_.papelS);
  for (let y = 131; y < 155; y += 4) { linea(256, y, 278, y - 1, A_.raya); linea(283, y - 1, 304, y - 1, A_.raya); }
  for (let k = 0; k < 6; k++) linea(262 + k * 2, 148 - k * 2, 266 + k, 146 - k * 3, A_.granL);
  linea(266, 150, 266, 134, A_.granS); for (let k = 0; k < 3; k++) { linea(266, 144 - k * 4, 262 - k, 141 - k * 4, A_.granS); linea(266, 142 - k * 4, 271 + k, 139 - k * 4, A_.granS); }
  for (let k = 0; k < 4; k++) linea(286 + k * 3, 140, 286 + k * 3, 146, A_.granS); linea(285, 145, 297, 141, A_.granS);
  linea(258, 167, 296, 161, A_.ocreS); linea(258, 166, 296, 160, A_.amarillo ?? A_.oro); linea(258, 165, 296, 159, A_.oroL); linea(296, 161, 300, 160, A_.piel); pset(301, 160, A_.granS); rect(255, 165, 258, 167, A_.rojoL);
  // la lámpara verde, encima de todo lo de la izquierda
  for (let y = 128; y <= 134; y++) for (let x = 24; x <= 52; x++) if (((x - 38) / 14) ** 2 + ((y - 131) / 3.4) ** 2 < 1) pset(x, y, y < 130 ? A_.latonL : y < 132 ? A_.laton : A_.latonS);
  rect(37, 108, 39, 129, A_.latonS); rect(37, 108, 37, 129, A_.latonL); rect(36, 118, 40, 119, A_.laton);
  poligono([[16, 106], [24, 95], [52, 95], [60, 106]], A_.lampS); poligono([[18, 105], [25, 96], [51, 96], [58, 105]], A_.lamp);
  for (let y = 96; y < 105; y++) for (let x = 20; x < 56; x++) if (((x + y) % 5) === 0 && R.pget(x, y) === A_.lamp) pset(x, y, A_.lampL);
  rect(16, 106, 60, 107, A_.latonS); rect(18, 106, 58, 106, A_.laton); rect(24, 95, 52, 95, A_.lampL);
  for (let x = 20; x < 57; x++) if (x & 1) pset(x, 108, A_.m6); else pset(x, 108, A_.m5);
}
// la mesa con lo de encima, más lo que se mueve: la cadenita de la lámpara, motas en su luz, el destello de la lupa y
// los renglones de signos (que brillan con o.brilla)
function a_mesaEstudio(R, t, o) {
  const { pset, linea } = R, pag = o.pagina ?? 'planta';
  a_pega(R, a_buf(R, 'mesa_' + pag, () => a_mesaCapa(R, pag), true), 92, 179);
  const oro = (n) => ((n + Math.floor(t * 8)) % 9 === 0 ? A_.oroL : A_.oro), tinta = o.brilla ? oro : A_.tinta;
  a_renglon(R, 107, 159, 50, 2, tinta, 1, o.mueve ? 1 : 0, t);
  for (let l = 0; l < 3; l++) a_renglon(R, 165, 132 + l * 6, 50, 5 + l, tinta, 1, o.mueve ? 1 : 0, t);
  for (let l = 0; l < 3; l++) a_renglon(R, 165, 144 + l * 6, l === 2 ? 50 : 28, 9 + l, tinta, 1, o.mueve ? 1 : 0, t);
  // la cadenita de la lámpara, que se mece
  const sw = Math.sin(t * 1.7) * 1.5;
  for (let j = 0; j < 8; j++) pset(Math.round(46 + sw * j / 8), 108 + j, j % 2 ? A_.latonS : A_.laton);
  pset(Math.round(46 + sw), 116, A_.latonL); pset(Math.round(46 + sw), 117, A_.laton);
  // motas de polvo en la luz de la lámpara
  for (let k = 0; k < 10; k++) { const fy = (h(k, 5, 41) * 30 + t * (2 + h(k, 6, 41) * 3)) % 30, x = Math.round(22 + h(k, 7, 41) * 36 + Math.sin(t * 0.8 + k) * 2), y = Math.round(110 + fy); if (Math.sin(t * 1.5 + k) > -0.2) pset(x, y, A_.m6); }
  // el destello que recorre el cristal de la lupa
  { const g = (t % 5) / 0.9; if (g < 1) { const a = -2.2 + g * 2.6; pset(Math.round(238 + Math.cos(a) * 6), Math.round(145 + Math.sin(a) * 6), 0xffffffff); pset(Math.round(238 + Math.cos(a) * 5), Math.round(145 + Math.sin(a) * 5), A_.m6); } }
  if (o.brilla) for (let k = 0; k < 5; k++) { const x = Math.round(166 + ((t * 30 + k * 13) % 50)), y = 130 + (k % 5) * 6; pset(x, y, A_.oroL); pset(x, y - 1, 0xffffffff); }
}

// la cámara 'mesa' entera: el fondo, la lectora que pasa tras la librería y la mesa
function a_salaMesa(R, t, o) {
  R.copiar(a_buf(R, 'mesaFondo', () => a_mesaFondo(R)));
  // la luz de los paneles respira un poco, despacio
  { const u = (t % 13) / 6; if (u < 1) { const bx = Math.round(60 + u * 280); for (let y = 15; y < 104; y++) for (let x = bx - 12; x <= bx + 12; x++) if (x > 63 && x < 320 && !(x > 250 && y < 48) && ((x + y) & 1) === 0) a_tine(R, x, y, 0.14 * (1 - Math.abs(x - bx) / 13), A_.m6); } }
  // una lectora pasa por detrás de la librería, a la derecha (lejos de los de la mesa): asoman la cabeza y los hombros,
  // con un libro bajo el brazo
  R.recorte([236, 80, 319, 103]);
  { const p = (t / 9) % 2, d = p < 1 ? 1 : -1, x = Math.round(p < 1 ? 240 + p * 74 : 314 - (p - 1) * 74), b = Math.round(Math.abs(Math.sin(t * 6)) * 1), y0 = 27;
    const { pset } = R; for (let j = 0; j < 9; j++) for (let i = -4; i <= 4; i++) if (Math.abs(i) <= 2 + (j > 3 ? 2 : 0)) pset(x + i, y0 + 71 + j - b, i < -2 + (j > 3 ? -1 : 1) ? hex('#6a5a7a') : hex('#4a3a5a'));
    for (let j = 0; j < 6; j++) for (let i = -2; i <= 2; i++) pset(x + i, y0 + 64 + j - b, j < 2 || (i === -d * 2) ? A_.nogalD : A_.piel);
    pset(x - 3, y0 + 65 - b, A_.nogalD); pset(x + 3, y0 + 65 - b, A_.nogalD); pset(x + d, y0 + 67 - b, A_.tinta);
    for (let i = 0; i < 4; i++) pset(x - d * (3 + i), y0 + 76 - b, A_.vellum); }
  R.recorte(null);
  a_mesaEstudio(R, t, o);
  return { suelo: 121, mesa: [0, 120, 319, 179], libro: [100, 123, 220, 163], paginaIzq: [102, 126, 157, 158], paginaDer: [163, 126, 218, 158], lupa: [238, 145], guantes: [62, 140, 90, 163], libreta: [252, 125, 308, 158], lampara: [38, 95] };
}
function a_paginaFondo(R, pag) {
  const { rect, pset, linea } = R;
  // la mesa de nogal con vetas alrededor, y la luz cálida de la lámpara que entra por la izquierda
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.03 + Math.sin(y * 0.3 + x * 0.02) * 1.8 + y * 0.5); pset(x, y, v > 0.85 ? A_.nogalL : v < -0.88 ? A_.nogalS : A_.nogal); }
  // la tapa flexible de vitela, un poco mayor que las hojas, con sus manchas
  rect(6, 12, 314, 178, A_.vellumD); rect(7, 13, 313, 177, A_.vellumS);
  for (let y = 13; y < 178; y++) for (let x = 7; x < 314; x++) if (h(x >> 1, y >> 1, 51) > 0.7) pset(x, y, A_.vellum);
  // el canto de las hojas, abajo y a los lados
  for (let j = 0; j < 6; j++) { const y = 171 + j; linea(14 + j, y, 306 - j, y, j % 2 ? A_.pergS : A_.pergM); }
  // las dos páginas
  a_pergamino(R, 14, 18, 157, 170, 61); a_pergamino(R, 163, 18, 306, 170, 62);
  // la sombra del lomo y el cosido
  for (let x = 150; x <= 170; x++) { const d = Math.abs(x - 160); for (let y = 18; y <= 170; y++) if (d < 11 && ((x + y) & 1 || d < 4)) pset(x, y, a_mez(R.pget(x, y), A_.pergD, (11 - d) / 14)); }
  rect(158, 16, 162, 172, A_.pergD); rect(159, 16, 161, 172, A_.vellumD);
  for (let y = 26; y < 166; y += 18) { rect(159, y, 161, y + 4, A_.tintaL); pset(160, y + 2, A_.pergS); }
  // el dibujo grande a la izquierda
  a_dibujo(R, pag, 30, 26, 112, 100, 7);
  // la plantita de la derecha, que los renglones rodean
  a_dibujo(R, pag === 'planta' ? 'tarros' : 'planta', 258, 92, 40, 44, 8);
  // la mancha de agua de una esquina y una costura vieja de la piel
  for (let y = 140; y < 168; y++) for (let x = 18; x < 52; x++) { const e = ((x - 18) / 34) ** 2 + ((y - 168) / 28) ** 2; if (e < 1 && e > 0.8) pset(x, y, A_.pergS); else if (e < 0.8 && ((x + y) & 1)) a_tine(R, x, y, 0.08, A_.pergD); }
  for (let k = 0; k < 6; k++) { pset(232 + k * 3, 28 + (k & 1), A_.pergD); pset(233 + k * 3, 28 + (k & 1), A_.pergS); }
  // la luz de la lámpara (de arriba a la izquierda) y la penumbra del lado contrario
  for (let y = 0; y < 180; y++) for (let x = ((y & 1) ? 1 : 0); x < 320; x += 2) { const d = Math.hypot(x - 40, y - 10) / 330; if (d > 0.62) a_tine(R, x, y, Math.min(0.28, (d - 0.62) * 0.9), A_.nogalD); }
}

// los renglones de signos de una página del inserto: dos bajo el dibujo de la izquierda; a la derecha, renglones enteros
// y luego cortos junto a la plantita (la esquina de arriba a la derecha queda libre, bajo Atom). lado: 'izq' | 'der'
function a_renglonesPagina(R, pag, lado, col, mv, t) {
  const k = pag.length * 7;
  if (lado === 'izq') { a_renglon(R, 26, 146, 124, 11 + k, col, 2, mv, t); a_renglon(R, 26, 164, 96, 12 + k, col, 2, mv, t); return; }
  a_renglon(R, 172, 40, 84, 21 + k, col, 2, mv, t);
  for (let l = 0; l < 3; l++) a_renglon(R, 172, 58 + l * 16, 128, 22 + l + k, col, 2, mv, t);
  for (let l = 0; l < 3; l++) a_renglon(R, 172, 106 + l * 16, 80, 25 + l + k, col, 2, mv, t);
  a_renglon(R, 172, 154, 128, 28 + k, col, 2, mv, t);
}

// el inserto de la página (ver la cabecera de biblioteca)
function a_pagina(R, t, o) {
  const { pset, poligono, linea } = R, pag = o.pagina ?? 'planta', br = Math.max(0, Math.min(1, o.brilla === true ? 1 : o.brilla || 0)), mv = o.mueve ? 1 : 0;
  const sig = o.siguiente ?? (pag === 'estrellas' ? 'planta' : 'estrellas'), u = Math.max(0, Math.min(1, o.pasa ?? 0));
  if (u >= 1) return a_pagina(R, t, { ...o, pagina: sig, pasa: 0, siguiente: undefined });
  R.copiar(a_buf(R, 'pagina_' + pag, () => a_paginaFondo(R, pag)));
  const col = (n, x) => { if (br <= 0) return A_.tinta; const ola = Math.sin(x * 0.08 - t * 6) > 0.7; return br < 0.5 ? (ola ? A_.oro : A_.tintaL) : ola ? A_.oroL : A_.oro; };
  a_renglonesPagina(R, pag, 'izq', col, mv, t);
  if (u <= 0) {
    a_renglonesPagina(R, pag, 'der', col, mv, t);
    // la esquina de abajo a la derecha se levanta y baja con el aire
    const l = Math.round(3 + Math.sin(t * 1.3) * 2); poligono([[306 - l * 3, 170], [306, 170 - l * 3], [306, 170]], A_.vellumS); poligono([[306 - l * 3, 170], [306 - l, 170 - l * 2], [306, 170 - l * 3]], A_.pergM); linea(306 - l * 3, 170, 306 - l, 170 - l * 2, A_.pergD);
  } else {
    // la hoja que pasa: se levanta de la derecha, cruza el lomo y cae a la izquierda; lo que destapa es la página siguiente
    const ex = Math.round(306 - u * 292), lift = Math.round(Math.sin(u * Math.PI) * 12), frente = ex > 160, xr = frente ? ex : 163;
    const bs = a_buf(R, 'pagina_' + sig, () => a_paginaFondo(R, sig));
    for (let y = 16; y <= 172; y++) for (let x = xr; x <= 306; x++) pset(x, y, bs[y * 320 + x]);
    if (frente) { R.recorte([163, 0, ex - 1, 179]); a_renglonesPagina(R, pag, 'der', col, mv, t); }
    R.recorte([xr, 0, 306, 179]); a_renglonesPagina(R, sig, 'der', A_.tinta, 0, t); R.recorte(null);
    // la sombra que la hoja echa sobre lo destapado
    for (let y = 18; y <= 170; y++) for (let d = 1; d <= 6; d++) if (((y + d) & 1) === 0 || d < 3) { const x = frente ? ex + d : 160 + d; if (x <= 306) R.pset(x, y, a_mez(R.pget(x, y), A_.pergD, 0.35 - d * 0.05)); }
    // la hoja, con su luz de canto, la curva de arriba y abajo y lo que transparenta
    const a0 = frente ? 160 : ex, a1 = frente ? ex : 160, w = Math.max(1, a1 - a0);
    const sube = (x) => Math.round(lift * (frente ? (x - a0) / w : (a1 - x) / w));
    for (let x = a0; x <= a1; x++) { const v = (x - a0) / w, c0 = frente ? a_mez(A_.perg, A_.pergD, v * 0.35) : a_mez(A_.pergL, A_.pergS, (1 - v) * 0.5), dy = sube(x);
      for (let y = 18 - dy; y <= 170 - dy; y++) pset(x, y, (y === 18 - dy || y === 170 - dy) ? A_.pergD : ((x * 7 + y * 3) % 23 === 0 ? A_.pergS : c0));
      if (x % 3 === 0) for (let y = 34; y < 160; y += 9) if (h(x, y, 71) > 0.35) pset(x, y - dy, frente ? A_.tintaL : A_.pergM); }
    linea(ex, 18 - lift, ex, 170 - lift, A_.pergD);
  }
  if (br > 0 && u <= 0) for (let k = 0; k < 8; k++) { const x = Math.round(172 + ((t * 40 + k * 37) % 128)), y = 40 + (k % 8) * 16 - 6; if (y < 160) { pset(x, y, 0xffffffff); pset(x - 1, y, A_.oroL); pset(x + 1, y, A_.oroL); pset(x, y - 1, A_.oroL); pset(x, y + 1, A_.oroL); } }
  // motas de polvo que flotan en la luz
  for (let k = 0; k < 14; k++) { const fx = (h(k, 1, 81) * 340 + t * (3 + h(k, 2, 81) * 4)) % 340 - 10, x = Math.round(fx), y = Math.round(20 + h(k, 3, 81) * 140 + Math.sin(t * 0.7 + k) * 6); if (Math.sin(t * 1.1 + k * 1.7) > 0) pset(x, y, A_.pergL); }
  return { pagina: [[14, 18, 157, 170], [163, 18, 306, 170]], dibujo: [30, 26, 142, 126], lomo: 160, esquina: [306, 170] };
}

// el mapa de Europa (lon −12…32, lat 35…62) en una hoja de 110 × 74, con su mar, costas, ríos y la rosa
const A_COSTAS = [
  [[-9, 43.5], [-1.5, 43.4], [-1.2, 46], [-4.5, 48.4], [-1.5, 48.7], [1.5, 50.9], [4, 51.5], [5, 53.2], [8.5, 53.6], [8.6, 55.5], [10.5, 57.6], [10.6, 54.5], [14, 54], [18.5, 54.7], [21, 55], [21.5, 57.5], [24, 57.5], [28, 60], [32, 60], [32, 45], [29.7, 45.3], [28, 43.5], [27, 40.9], [24, 40.3], [22.5, 40.5], [23.5, 38], [22.5, 36.5], [21, 37.5], [19.5, 40.5], [19.3, 42], [16, 43.5], [13.6, 45.2], [12.3, 45.4], [12.3, 44.2], [13.5, 43.6], [16, 41.5], [18.5, 40.2], [16.5, 39], [15.6, 38], [15.6, 40], [14.3, 40.9], [12.5, 41.6], [10.5, 43], [8.8, 44.4], [7.5, 43.8], [6, 43.1], [3, 43.3], [3.3, 41.8], [0.5, 40.5], [-0.3, 39], [0, 38.7], [-2, 36.7], [-5.6, 36], [-6.5, 37], [-8.9, 37], [-8.9, 38.7], [-9.5, 39.5], [-8.7, 42]],
  [[5.3, 62], [5, 59], [6.5, 58], [8, 58], [10.5, 59.3], [11.2, 58.4], [12.5, 56.2], [14.3, 55.5], [16.4, 56.6], [16.6, 57.9], [18.8, 59.5], [17.3, 60.6], [17.5, 62]],
  [[21.5, 60.5], [25, 60.2], [28.5, 60.6], [30, 62], [21.3, 62]],
  [[-5.7, 50], [1.4, 51.2], [1.7, 52.7], [0, 53.5], [-0.3, 54.5], [-1.6, 55.6], [-2, 57], [-1.8, 57.6], [-4, 57.6], [-3, 58.6], [-5, 58.6], [-6, 57.6], [-5.6, 56.3], [-4.9, 55], [-3, 54.9], [-3.4, 54.3], [-3, 53.4], [-4.6, 53.3], [-4.3, 52.8], [-5.2, 51.8], [-3.2, 51.4], [-4.3, 51.1]],
  [[-6, 52.2], [-6.2, 53.9], [-5.8, 54.6], [-7.3, 55.3], [-8.5, 54.3], [-10, 53.9], [-10, 51.6], [-8, 51.6]],
  [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7]], [[8.4, 41], [9.8, 41], [9.6, 39.2], [8.4, 39]],
];

const A_MAPA = [14, 96];

const a_mapaXY = (lon, lat) => [A_MAPA[0] + (lon + 12) * 2.5, A_MAPA[1] + (62 - lat) * 2.74];

const A_PRAGA = a_mapaXY(14.4, 50.1).map(Math.round), A_ROMA = a_mapaXY(12.5, 41.9).map(Math.round), A_NY = [A_MAPA[0] + 6, A_MAPA[1] + 30];

function a_tableroFondo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // la mesa de nogal vista desde arriba: tablones con vetas y nudos, sus juntas y la luz de la lámpara en el centro
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor(y / 26), v = Math.sin(x * 0.05 + tb * 3 + Math.sin(x * 0.013 + y * 0.4 + tb) * 2.2), n = h(x >> 1, y, tb); pset(x, y, y % 26 === 0 ? A_.nogalD : v > 0.84 ? A_.nogalL : v < -0.86 || n > 0.93 ? A_.nogalS : A_.nogal); }
  for (const [kx, ky] of [[40, 30], [210, 160], [290, 88]]) { disco(kx, ky, 3, A_.nogalS); disco(kx, ky, 1.5, A_.nogalD); }
  for (let y = 0; y < 180; y++) for (let x = (y & 1); x < 320; x += 2) { const d = Math.hypot((x - 160) / 1.6, y - 100) / 150; if (d > 0.5) a_tine(R, x, y, Math.min(0.35, (d - 0.5) * 0.9), A_.nogalD); else a_tine(R, x, y, (0.5 - d) * 0.18, A_.m5); }
  // fichas de cartulina sueltas con renglones ondulados (sin letras) y un clip
  for (const [fx, fy, w, hh] of [[96, 18, 30, 18], [128, 24, 28, 16], [190, 150, 34, 20]]) { rect(fx + 2, fy + 2, fx + w + 2, fy + hh + 2, A_.nogalD); rect(fx, fy, fx + w, fy + hh, A_.papel); rect(fx, fy, fx + w, fy + 2, A_.rojoL); for (let y = fy + 6; y < fy + hh - 2; y += 4) for (let x = fx + 3; x < fx + w - 3; x++) if (Math.sin(x * 1.3 + y) > -0.4) pset(x, y, A_.raya); }
  rect(122, 20, 123, 30, C.metalL); rect(122, 20, 126, 20, C.metalL); rect(126, 20, 126, 27, C.metalL); rect(124, 22, 124, 28, C.metalS);
  // unas pinzas de archivo
  linea(286, 166, 316, 158, A_.nogalD); linea(284, 163, 314, 156, C.metalL); linea(284, 164, 314, 157, C.metal); linea(284, 166, 314, 157, C.metalL); linea(284, 167, 314, 158, C.metalS); rect(284, 163, 287, 167, C.metalS);
  // el mapa de Europa: la hoja con su sombra, el mar con olas, las costas y la tierra moteada, dos ríos y la rosa
  const [mx, my] = A_MAPA;
  rect(mx + 3, my + 3, mx + 113, my + 77, A_.nogalD);
  rect(mx, my, mx + 110, my + 74, A_.mar);
  for (let y = my; y <= my + 74; y += 3) for (let x = mx + ((y >> 1) & 3); x <= mx + 110; x += 6) pset(x, y, A_.marS);
  R.recorte([mx, my, mx + 110, my + 74]);
  for (const c of A_COSTAS) { const pts = c.map(([lo, la]) => a_mapaXY(lo, la)); poligono(pts, (x, y) => (h(x, y, 91) > 0.8 ? A_.tierraS : A_.tierra)); for (let i = 0; i < pts.length; i++) { const [a, b] = [pts[i], pts[(i + 1) % pts.length]]; linea(a[0], a[1], b[0], b[1], A_.costa); } }
  for (const rio of [[[8, 51.5], [10, 50], [14.4, 50.1], [16, 49]], [[-1, 47], [2.3, 48.8], [4.5, 47.5]], [[12, 45.6], [16, 45.5], [20, 44.8], [28, 44.5]]]) for (let i = 0; i + 1 < rio.length; i++) { const a = a_mapaXY(...rio[i]), b = a_mapaXY(...rio[i + 1]); linea(a[0], a[1], b[0], b[1], A_.azul); }
  R.recorte(null);
  rect(mx, my, mx + 110, my, A_.costa); rect(mx, my + 74, mx + 110, my + 74, A_.costa); rect(mx, my, mx, my + 74, A_.costa); rect(mx + 110, my, mx + 110, my + 74, A_.costa);
  { const rx = mx + 14, ry = my + 60; linea(rx, ry - 6, rx, ry + 6, A_.costa); linea(rx - 6, ry, rx + 6, ry, A_.costa); pset(rx, ry - 7, A_.rojo); disco(rx, ry, 1.5, A_.oro); }
  // Nueva York, al otro lado del mar: un recuadro con los rascacielos en pictograma
  { const [nx, ny] = A_NY; rect(nx - 6, ny - 12, nx + 10, ny + 4, A_.costa); rect(nx - 5, ny - 11, nx + 9, ny + 3, A_.tierra);
    for (const [bx, bh] of [[-3, 6], [0, 11], [3, 8], [6, 5]]) { rect(nx + bx, ny + 2 - bh, nx + bx + 2, ny + 2, A_.granD); for (let j = ny + 3 - bh; j < ny + 1; j += 2) pset(nx + bx + 1, j, A_.oro); }
    rect(nx + 1, ny - 12, nx + 1, ny - 9, A_.granD); }
  // la foto del microscopio, con su borde blanco y su sombra
  rect(226, 52, 270, 104, A_.nogalD); rect(222, 48, 266, 100, A_.papel); rect(226, 52, 262, 90, hex('#c8d8e0'));
  for (let y = 52; y <= 90; y++) for (let x = 226; x <= 262; x++) if (y > 80) pset(x, y, ((x + y) & 1) ? hex('#a8b8c0') : hex('#b8c8d0'));
  if (PIEZAS_VM.microscopio) PIEZAS_VM.microscopio(R, 244, 87, { s: 2 });
  rect(228, 93, 258, 94, A_.raya);
  // la etiqueta de librero: cartulina con el borde rojo, el ojal con su anilla y las rayas de los datos
  rect(236, 126, 290, 156, A_.nogalD); rect(232, 122, 286, 152, A_.papel); rect(234, 124, 284, 150, A_.rojo); rect(236, 126, 282, 148, A_.papel);
  disco(240, 137, 3, A_.latonS); disco(240, 137, 2, A_.laton); pset(240, 137, A_.nogal);
  for (let k = 0; k < 2; k++) rect(250, 129 + k * 5, 278 - k * 8, 130 + k * 5, A_.tintaL);
  // la moneda de oro con la corona en relieve, el cordón de cuentas y la sombra
  { const cx = 70, cy = 52; disco(cx + 3, cy + 3, 15, A_.nogalD); disco(cx, cy, 15, A_.oroS); disco(cx, cy, 14, (x, y) => (x + y < cx + cy - 8 ? A_.oroL : x + y > cx + cy + 10 ? A_.oroS : A_.oro));
    for (let k = 0; k < 36; k++) { const a = k / 36 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 12), Math.round(cy + Math.sin(a) * 12), A_.oroS); }
    disco(cx, cy, 10, A_.oro);
    poligono([[cx - 7, cy + 4], [cx - 7, cy - 4], [cx - 3, cy], [cx, cy - 6], [cx + 3, cy], [cx + 7, cy - 4], [cx + 7, cy + 4]], A_.oroS);
    poligono([[cx - 6, cy + 3], [cx - 6, cy - 2], [cx - 3, cy + 1], [cx, cy - 4], [cx + 3, cy + 1], [cx + 6, cy - 2], [cx + 6, cy + 3]], A_.oroL);
    rect(cx - 7, cy + 4, cx + 7, cy + 6, A_.oroS); rect(cx - 6, cy + 4, cx + 6, cy + 5, A_.oro); for (const dx of [-4, 0, 4]) pset(cx + dx, cy + 5, A_.rojo);
    for (const [dx, dy] of [[-7, -5], [0, -7], [7, -5]]) pset(cx + dx, cy + dy, A_.oroL); }
  // el libro cerrado en el centro: tapa de vitela flexible con manchas, las solapas, las tiras de cuero y el lomo cosido
  { const x0 = 128, y0 = 74, x1 = 192, y1 = 152;
    rect(x0 + 4, y0 + 4, x1 + 4, y1 + 4, A_.nogalD);
    rect(x0, y0, x1, y1, A_.vellumD); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, A_.vellum);
    for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const n = h(x >> 1, y >> 1, 101); if (n > 0.82) pset(x, y, A_.vellumS); else if (n < 0.08) pset(x, y, 0xfff0e8d4); }
    for (let y = y0 + 1; y < y1; y++) for (let x = x0 + 1; x < x1; x++) { const b = Math.min(x - x0, x1 - x, y - y0, y1 - y); if (b < 5 && ((x + y) & 1 || b < 2)) pset(x, y, a_mez(R.pget(x, y), A_.vellumD, (5 - b) * 0.12)); }
    for (let y = y0 + 2; y < y1 - 1; y++) pset(x0 + 5, y, A_.vellumS); rect(x0 + 1, y0 + 1, x0 + 4, y1 - 1, A_.vellumS);
    for (let y = y0 + 8; y < y1; y += 12) { rect(x0 + 1, y, x0 + 4, y + 2, A_.vellumD); pset(x0 + 2, y + 1, A_.tinta); }
    rect(x1 - 1, y0 + 2, x1 + 1, y1 - 2, A_.pergM); for (let y = y0 + 3; y < y1 - 2; y += 2) pset(x1 + 1, y, A_.pergS);
    for (const yy of [y0 + 18, y1 - 18]) { rect(x1 - 6, yy, x1 + 7, yy + 1, A_.nogalS); rect(x1 + 4, yy - 1, x1 + 9, yy + 2, A_.nogal); }
    for (let y = y0 + 40; y < y0 + 56; y++) for (let x = x0 + 14; x < x0 + 34; x++) if (((x - x0 - 24) / 10) ** 2 + ((y - y0 - 48) / 8) ** 2 < 1 && ((x + y) & 1)) pset(x, y, A_.vellumS);
    rect(x0 + 8, y0 + 4, x1 - 6, y0 + 4, A_.vellumS); rect(x0 + 8, y1 - 4, x1 - 6, y1 - 4, A_.vellumS);
    // el número de signatura a lápiz en la tapa, como rayitas
    for (let k = 0; k < 3; k++) rect(x0 + 12 + k * 6, y1 - 8, x0 + 15 + k * 6, y1 - 8, A_.granS); }
}

// el tablero de detective (ver la cabecera de biblioteca)
function a_tablero(R, t, o) {
  const { rect, pset, disco, linea } = R;
  R.copiar(a_buf(R, 'tablero', () => a_tableroFondo(R)));
  // los destellos: el canto de la moneda y el espejo del microscopio
  { const g = (t % 4.5) / 1.1; if (g < 1) { const a = -2.6 + g * Math.PI * 2, x = Math.round(70 + Math.cos(a) * 14), y = Math.round(52 + Math.sin(a) * 14); pset(x, y, 0xffffffff); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pset(x + dx, y + dy, A_.oroL); } }
  if (Math.sin(t * 2.2) > 0.75) { pset(240, 82, 0xffffffff); pset(241, 81, A_.oroL); }
  // los hilos rojos, tendidos uno tras otro con o.hilos (0–1), que se comban y se mecen un poco
  const centro = [172, 87], HILOS = [[centro, [70, 40]], [centro, [244, 51]], [centro, [240, 137]], [centro, A_PRAGA], [A_PRAGA, A_ROMA], [A_ROMA, A_NY]];
  const u = Math.max(0, Math.min(1, o.hilos ?? 1)), n = HILOS.length;
  HILOS.forEach(([a, b], i) => {
    const f = Math.max(0, Math.min(1, u * n - i)); if (f <= 0) return;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), sag = 3 + L * 0.03 + Math.sin(t * 1.4 + i) * 1.2, pasos = Math.ceil(L * f);
    let px = a[0], py = a[1];
    for (let s = 1; s <= pasos; s++) { const v = s / Math.ceil(L), x = a[0] + (b[0] - a[0]) * v, y = a[1] + (b[1] - a[1]) * v + Math.sin(v * Math.PI) * sag; linea(px, py + 1, x, y + 1, A_.nogalD); linea(px, py, x, y, A_.hilo); px = x; py = y; }
  });
  // las chinchetas en cada punta (las del mapa laten)
  const pins = [[70, 40], [244, 51], [240, 137], A_PRAGA, A_ROMA, A_NY];
  pins.forEach(([x, y], i) => { if (i >= 3) { const r = 3 + ((t * 1.6 + i * 0.4) % 1) * 4; for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2; if (((t * 1.6 + i * 0.4) % 1) < 0.7) pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), A_.rojoL); } }
    disco(x + 1, y + 1, 2.5, A_.nogalD); disco(x, y, 2.5, A_.hiloS); disco(x, y, 1.8, A_.hilo); pset(x - 1, y - 1, A_.rojoL); });
  // la tarjeta clavada en el libro con el «?», que se mece
  { const an = Math.sin(t * 2.1) * 0.12, cx = 172, cy = 96, pv = [172, 86];
    const pt = (dx, dy) => [pv[0] + dx * Math.cos(an) - dy * Math.sin(an), pv[1] + dx * Math.sin(an) + dy * Math.cos(an)];
    R.poligono([pt(-8, 1), pt(10, 1), pt(10, 25), pt(-8, 25)], A_.vellumD); R.poligono([pt(-9, 0), pt(9, 0), pt(9, 24), pt(-9, 24)], A_.papel);
    const [qx, qy] = pt(-4, 6); R.icono('?', Math.round(qx), Math.round(qy), A_.hilo, A_.hiloS, 2);
    disco(pv[0] + 1, pv[1] + 2, 2.5, A_.nogalD); disco(pv[0], pv[1] + 1, 2.5, A_.hiloS); disco(pv[0], pv[1] + 1, 1.8, A_.hilo); pset(pv[0] - 1, pv[1], A_.rojoL); }
  // el número de la etiqueta (o.numero)
  if (o.numero != null) R.numero(String(o.numero), 264, 149, { centro: true });
  // motas en la luz de la lámpara
  for (let k = 0; k < 10; k++) { const x = Math.round((h(k, 1, 111) * 320 + t * (2 + h(k, 2, 111) * 3)) % 320), y = Math.round(30 + h(k, 3, 111) * 130 + Math.sin(t + k) * 4); if (Math.sin(t * 1.2 + k) > 0.1) a_tine(R, x, y, 0.5, A_.m6); }
  return { libro: [128, 74, 192, 152], pregunta: [172, 98], moneda: [70, 52], microscopio: [222, 48, 266, 100], etiqueta: [232, 122, 286, 152], mapa: [A_MAPA[0], A_MAPA[1], A_MAPA[0] + 110, A_MAPA[1] + 74], praga: A_PRAGA, roma: A_ROMA, nuevaYork: A_NY };
}

// la paleta propia de Praga y Roma
const PG = pal({
  viga: '#4a2e1c', vigaL: '#6a4428', vigaS: '#33200f', vigaD: '#24160b',
  verde: '#5e6e54', verdeL: '#6c7c60', verdeS: '#525f49', verdeD: '#3e4a37',
  terc: '#8a2430', tercL: '#ac3a40', tercS: '#601822', tercD: '#3e0f16',
  ebano: '#2c2226', ebanoL: '#4a3a3e', ebanoS: '#18101a',
  laton: '#c89a40', latonL: '#f0d080', latonS: '#8a6420',
  marR: '#9a4a3e', marRL: '#b4604e', marRS: '#7a3428', marB: '#e2d8c6', marBS: '#c6b9a4', marBL: '#f4ede0', marJ: '#6a5248',
  coco: '#5c6638', cocoL: '#7c864a', cocoS: '#3e4626', cocoB: '#c8c08a', cocoBS: '#a09868',
  ocre: '#d2aa74', ocreL: '#e2c08a', ocreS: '#b88e5c', ocreD: '#9a7248',
  cotto: '#b25e3a', cottoL: '#c6724a', cottoS: '#924a2c', cottoJ: '#6a3420',
  granito: '#a24a3e', granitoL: '#c0645a', granitoS: '#763028',
  pied: '#6e6874', piedL: '#88828c', piedS: '#544e5a', piedD: '#3a3640', hollin: '#2a2428',
  ladr: '#8a4630', ladrL: '#a65a3e', ladrS: '#663220', ladrJ: '#4a2a1e',
  fuego: '#ff9a30', fuegoL: '#ffe48a', fuegoS: '#d8501c', brasa: '#8a2a10',
  fresco: '#d6c6a6', frescoL: '#e6dabe', frescoS: '#b8a688', frescoV: '#a6b28e', frescoA: '#a6bac8', frescoR: '#c69a84',
  cipres: '#2e4a32', cipresL: '#46664a', cipresS: '#1e3424',
  tejado: '#b85a3a', tejadoL: '#d07a52', tejadoS: '#8a3e28',
  lata: '#d6caae', lataS: '#bcae90', lataL: '#e8dec4',
  tienda: '#2e5a46', tiendaL: '#467a62', tiendaS: '#1e3e30',
  taxi: '#f0c020', taxiS: '#b88c10', taxiL: '#fff080',
  ladrNY: '#8a4a3a', ladrNYS: '#6a3428', ladrNYL: '#a8604c',
  fuerte: '#26302c', fuerteL: '#3e4c46', fuerteS: '#141c18',
  uv: '#8a5ae8', uvL: '#c8b0ff', firma: '#d8f6ff',
  cielo0: '#5a8ad0', cielo1: '#78a4de', cielo2: '#a6c6ea', nubeL: '#ffffff', nubeM: '#e2ecf6', nubeS: '#b6cae0',
  colina: '#7a9a6a', colinaS: '#5a7a52', colinaL: '#94b47e', lejos: '#9ab0c8', lejosS: '#8298b4',
  paja: '#d8b860', pajaS: '#a88a40',
  nogal: '#5a3a24', nogalL: '#7a5034', nogalS: '#3e2616', nogalD: '#2a180c',
  roble: '#8a6038', robleL: '#a87a4a', robleS: '#6a4626', robleD: '#4e321a',
  vela: '#f0e6c8', velaS: '#c8b890',
});

const PG_HUECO = 0x01020304;

// mezcla dos colores (a = 0: c; a = 1: d)
const b_pgMez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// tiñe un píxel ya pintado hacia col (a: cuánto)
function b_pgTi(R, x, y, a, col) { const c = R.pget(x, y); if (c && c !== PG_HUECO) R.pset(x, y, b_pgMez(c, col, a)); }

// el fondo fijo de cada encuadre: se pinta una vez en su búfer y se copia en cada fotograma
const b_pgCapas = new Map();

function b_pgCapa(R, clave, dibuja) {
  let b = b_pgCapas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); b_pgCapas.set(clave, b); }
  return b;
}

// lo que se ve por un hueco (ventana, escaparate) del fondo fijo: pinta() dentro de (x0, y0)–(x1, y1) con el recorte
// puesto y luego se devuelve todo lo del fondo que no es hueco (marcos, plomos, parteluces, lo que está delante), con un
// reflejo tenue en diagonal sobre el cristal
function b_pgHueco(R, fijo, x0, y0, x1, y1, pinta, reflejo = 0.12) {
  R.recorte([x0, y0, x1, y1]); pinta(); R.recorte(null);
  const B = R.buf;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * 320 + x, f = fijo[i];
    if (f !== PG_HUECO) B[i] = f; else if (reflejo && ((x - y * 0.6 + 400) % 26) < 5 && ((x + y) & 1) === 0) B[i] = b_pgMez(B[i], 0xffffffff, reflejo); }
}

// rectángulo que respeta un recorte propio (R.rect no respeta R.recorte)
function b_pgRc(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba)
function b_pgNube(R, cx, cy, w, cols = [PG.nubeL, PG.nubeM, PG.nubeS]) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.4, 1, r * 0.75], [-w * 0.1, -1, r], [w * 0.25, 0, r * 0.9], [w * 0.45, 1.5, r * 0.6]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1.2, rr, cols[2]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.92, cols[1]);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.55, cols[0]);
}

// el cielo que se ve por una ventana: degradado tramado de tres azules, nubes de tres tonos a tres velocidades y pájaros
// que aletean (o.nubes, o.pajaros, o.cols)
function b_pgCielo(R, t, x0, y0, x1, y1, o = {}) {
  const [c0, c1, c2] = o.cols ?? [PG.cielo0, PG.cielo1, PG.cielo2], H = Math.max(1, (o.hor ?? y1) - y0), W = x1 - x0, B = R.buf, BY = [0, 0.5, 0.75, 0.25];
  for (let y = Math.max(0, y0); y <= y1; y++) { const u = Math.min(1.99, (y - y0) / H * 2);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const b = Math.floor(u + BY[(x & 1) + 2 * (y & 1)] - 0.25); B[y * 320 + x] = b <= 0 ? c0 : b === 1 ? c1 : c2; } }
  const n = o.nubes ?? 3;
  for (let k = 0; k < n; k++) { const v = [1.2, 2.4, 3.8][k % 3], L = W + 50, w = 9 + h(k, 1, 520) * 12;
    const cx = x0 - 25 + ((h(k, 2, 520) * L + t * v) % L), cy = y0 + 5 + h(k, 3, 520) * Math.min(26, H * 0.45);
    b_pgNube(R, cx, cy, w, k % 3 === 2 ? [PG.nubeM, PG.nubeS, PG.lejosS] : undefined); }
  const np = o.pajaros ?? 2;
  for (let k = 0; k < np; k++) { const L = W + 40, x = Math.round(x0 - 20 + ((h(k, 4, 521) * L + t * (7 + k * 3)) % L)), y = Math.round(y0 + 8 + h(k, 5, 521) * H * 0.35 + Math.sin(t * 2 + k) * 2), a = Math.floor(t * 6 + k) % 2, c = o.colPajaro ?? hex('#3a3a4a');
    R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - a * 2 + (a ? 0 : 1), c); R.pset(x + 2, y - a * 2 + (a ? 0 : 1), c); }
}

// tablas de madera (horizontales, o verticales con vert): juntas, vetas claras y oscuras y algún nudo
function b_pgTablas(R, x0, y0, x1, y1, [c, cL, cS, cD], k = 0, ancho = 8, vert = false) {
  const r = (a, b, cc, d, col) => (vert ? R.rect(b, a, d, cc, col) : R.rect(a, b, cc, d, col));
  const A0 = vert ? y0 : x0, A1 = vert ? y1 : x1, B0 = vert ? x0 : y0, B1 = vert ? x1 : y1;
  R.rect(x0, y0, x1, y1, c);
  for (let b = B0, f = 0; b <= B1; b += ancho, f++) {
    r(A0, Math.min(B1, b + ancho - 1), A1, Math.min(B1, b + ancho - 1), cD);
    for (let g = 0; g < 3; g++) { const gb = b + 1 + Math.round(h(f, g, 530 + k) * (ancho - 3)); let a = A0 - Math.round(h(f, g, 531 + k) * 20);
      while (a < A1) { const L = 6 + Math.round(h(a, gb, 532 + k) * 26); if (h(a, g, 533 + k) < 0.7 && gb < B1) r(Math.max(A0, a), gb, Math.min(A1, a + L), gb, g === 2 ? cL : cS); a += L + 3 + Math.round(h(a, gb, 534 + k) * 10); } }
    if (h(f, 9, 535 + k) < 0.4 && b + 4 < B1) { const na = A0 + 6 + Math.round(h(f, 7, 536 + k) * Math.max(1, A1 - A0 - 12)), nb = b + (ancho >> 1) - 1; r(na - 2, nb, na + 2, nb, cS); r(na - 1, nb - 1, na + 1, nb + 1, cS); r(na, nb, na, nb, cD); }
  }
}

// un cuarterón (panel en relieve): marco, bisel con luz arriba e izquierda y sombra abajo y derecha, y dos vetas
function b_pgCuart(R, x0, y0, x1, y1, c, cL, cS, cD, k = 0) {
  const { rect } = R; rect(x0, y0, x1, y1, cD); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, cS); rect(x0 + 1, y0 + 1, x1 - 2, y0 + 1, cL); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 2, cL);
  rect(x0 + 3, y0 + 3, x1 - 3, y1 - 3, c); rect(x0 + 3, y1 - 3, x1 - 3, y1 - 3, cS); rect(x1 - 3, y0 + 3, x1 - 3, y1 - 3, cS); rect(x0 + 3, y0 + 3, x1 - 4, y0 + 3, cL);
  for (let g = 0; g < 2; g++) { const gx = x0 + 5 + Math.round(h(k, g, 540) * Math.max(1, x1 - x0 - 10)); rect(gx, y0 + 5, gx, y1 - 5 - Math.round(h(k, g, 541) * 4), g ? cL : cS); }
}

// suelo en perspectiva entre y0 e y1 (lado: ancho de la baldosa abajo; o.fuga: distancia al horizonte; o.vx: punto de
// fuga): col(iu, iv, junta, x, y) da el color de cada píxel según su baldosa
function b_pgSuelo(R, y0, y1, lado, col, o = {}) {
  const fuga = o.fuga ?? 80, vx = o.vx ?? 160, yh = y0 - fuga, D = y1 - yh, prof = o.prof ?? 0.5, B = R.buf;
  for (let y = y0; y <= y1; y++) { const Z = D / (y - yh), v = Z * D / (lado * prof), jv = Z * Z / (lado * prof), iv = Math.floor(v), fv = v - iv;
    for (let x = 0; x < 320; x++) { const u = (x - vx) * Z / lado + 1000, iu = Math.floor(u), fu = u - iu;
      B[y * 320 + x] = col(iu, iv, fu < Z / lado * 0.9 || fv < jv, x, y, fu, fv); } }
}

// una vela en su palmatoria (x, yb: la base); la llama tiembla y su halo cálido aclara lo de alrededor
function b_pgVela(R, x, yb, t, k = 0, o = {}) {
  const { rect, pset } = R, alto = o.alto ?? 7, yt = yb - 2 - alto, fl = h(Math.floor(t * 11), k, 550), dx = fl < 0.2 ? -1 : fl > 0.85 ? 1 : 0, hl = 3 + (fl > 0.5 ? 1 : 0);
  if (o.halo !== false) { const r = o.radio ?? 11; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.1) / r; if (d < 1 && ((i + j) & 1) === 0) b_pgTi(R, x + i, yt - 2 + j, (1 - d) * 0.22 * (0.9 + fl * 0.2), hex('#ffd890')); } }
  if (o.palmatoria !== false) { rect(x - 3, yb - 1, x + 3, yb, C.k); rect(x - 2, yb - 1, x + 2, yb - 1, PG.latonL); rect(x - 4, yb, x + 4, yb, PG.latonS); }
  rect(x - 1, yt, x + 1, yb - 2, PG.vela); rect(x + 1, yt, x + 1, yb - 2, PG.velaS); pset(x - 1, yt + 1, C.blanco); pset(x - 2, yt + 2, PG.vela);
  pset(x, yt - 1, C.k);
  for (let j = 0; j < hl; j++) { const yy = yt - 2 - j, xx = x + (j === hl - 1 ? dx : 0); pset(xx, yy, j === 0 ? PG.fuegoL : j < hl - 1 ? PG.fuego : PG.fuegoS); if (j < hl - 2) { pset(xx - 1, yy, PG.fuego); pset(xx + 1, yy, PG.fuegoS); } }
}

// motas de polvo que flotan dentro de un haz (xa: borde izquierdo arriba en y0; ancho; inclin: cuánto se tuerce por fila)
function b_pgPolvo(R, t, xa, y0, ancho, y1, inclin, n, k = 0, col = hex('#fff2d0')) {
  for (let i = 0; i < n; i++) { const fy = (h(i, 1, 560 + k) * (y1 - y0) + t * (1.5 + h(i, 2, 560 + k) * 2.5)) % (y1 - y0), y = Math.round(y0 + fy);
    const x = Math.round(xa + fy * inclin + h(i, 3, 560 + k) * ancho + Math.sin(t * 0.7 + i) * 2);
    if (Math.sin(t * 1.3 + i * 2.1) > -0.3) R.pset(x, y, col); }
}

// un haz de luz tramado: el paralelogramo de (xa, y0) con ancho, hasta y1, torcido inclin por fila; a: cuánto aclara
function b_pgHaz(R, xa, y0, ancho, y1, inclin, a = 0.2, col = hex('#fff0c8'), corte = null) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = xa + d; x <= xa + d + ancho; x++) if (((x + y) & 1) === 0 && (!corte || !corte(x - d, y))) b_pgTi(R, x, y, a * (1 - (y - y0) / (y1 - y0 + 1) * 0.5), col); }
}

// los colores de los lomos de libros viejos (piel, becerro, pergamino) y los de los sesenta
const PG_LIB = ['#7a3a24', '#5a2a1a', '#8a5a2e', '#a8783e', '#d8c8a0', '#c8b48a', '#3e4a2a', '#6a2a2a', '#4a3020', '#9a6a3a', '#2e3a4a'].map(hex);

const PG_LIB60 = ['#c83a2a', '#2a5a9a', '#e0b840', '#3a8a5a', '#e8e0d0', '#d86a2a', '#6a3a8a', '#24242a', '#8ac0d8', '#7a3a24', '#a8783e', '#3a4a6a'].map(hex);

// una balda llena de libros entre x0 y x1 con la base en yb: lomos de alto y grueso variados con sus nervios, alguno
// inclinado, algún hueco y algún montón tumbado
function b_pgLibros(R, x0, x1, yb, alto, k = 0, cols = PG_LIB, nervios = true) {
  const { rect, pset, linea } = R; let x = x0, i = 0;
  while (x < x1 - 1) { i++; const r = h(i, 1, 570 + k);
    if (r < 0.06 && x < x1 - 8) { x += 3; continue; }
    if (r > 0.94 && x < x1 - 10) { const w = Math.min(x1 - x, 9 + Math.round(h(i, 2, 570 + k) * 4)); for (let s = 0; s < 3; s++) { const c = cols[Math.floor(h(i, s, 571 + k) * cols.length)], y = yb - 2 * s - 1; rect(x, y - 1, x + w - 1 - s, y, C.k); rect(x, y - 1, x + w - 2 - s, y - 1, c); pset(x + w - 3 - s, y - 1, PG.vela); } x += w + 1; continue; }
    const w = 2 + Math.floor(h(i, 3, 570 + k) * 3), hh = Math.max(4, alto - Math.floor(h(i, 4, 570 + k) * alto * 0.35)), c = cols[Math.floor(h(i, 5, 570 + k) * cols.length)];
    if (x + w > x1) break;
    if (r > 0.88 && x + w + 3 < x1) { // un libro inclinado contra el anterior
      R.poligono([[x, yb + 1], [x + w + 1, yb + 1], [x + w + 3 + Math.round(hh * 0.25), yb - hh + 1], [x + 2 + Math.round(hh * 0.25), yb - hh + 1]], C.k);
      R.poligono([[x + 1, yb], [x + w, yb], [x + w + 2 + Math.round(hh * 0.25), yb - hh + 2], [x + 2 + Math.round(hh * 0.25), yb - hh + 2]], c);
      x += w + 4; continue; }
    rect(x, yb - hh, x + w, yb, C.k); rect(x, yb - hh + 1, x + w - 1, yb, c); rect(x, yb - hh + 1, x, yb, b_pgMez(c, C.blanco, 0.25)); if (w > 2) rect(x + w - 1, yb - hh + 1, x + w - 1, yb, b_pgMez(c, C.k, 0.3));
    if (nervios) { const n1 = yb - Math.round(hh * 0.75), n2 = yb - Math.round(hh * 0.3); rect(x, n1, x + w - 1, n1, b_pgMez(c, C.k, 0.4)); rect(x, n2, x + w - 1, n2, b_pgMez(c, C.k, 0.4)); if (h(i, 6, 570 + k) < 0.5) rect(x + 1, n1 + 2, x + w - 2, n1 + 2, PG.laton); }
    else { if (h(i, 6, 570 + k) < 0.6) rect(x, yb - Math.round(hh * 0.6), x + w - 1, yb - Math.round(hh * 0.6) + 1, b_pgMez(c, C.blanco, 0.5)); }
    x += w + 1; }
}

// signos inventados del libro (no son letras): un renglón de glifos pequeños de 3 × 4 desde x0 en y (base) con su tinta
const PG_GLIFOS = [[0b010, 0b101, 0b101, 0b010], [0b110, 0b001, 0b011, 0b101], [0b100, 0b111, 0b101, 0b101], [0b011, 0b100, 0b100, 0b011], [0b101, 0b111, 0b001, 0b001], [0b111, 0b010, 0b101, 0b110], [0b010, 0b011, 0b110, 0b010], [0b100, 0b110, 0b011, 0b001]];

function b_pgSignos(R, x0, y, ancho, k, col, esc = 1) {
  let x = x0, i = 0;
  while (x < x0 + ancho - 3 * esc) { const g = PG_GLIFOS[Math.floor(h(i, k, 580) * PG_GLIFOS.length)];
    for (let j = 0; j < 4; j++) for (let b = 0; b < 3; b++) if (g[j] & (4 >> b)) R.rect(x + b * esc, y - (4 - j) * esc, x + b * esc + esc - 1, y - (4 - j) * esc + esc - 1, col);
    if (h(i, k, 581) < 0.2 && esc === 1) R.pset(x + 1, y - 6, col);   // un trazo alto, como los de «horca»
    x += (4 + (h(i, k, 582) < 0.22 ? 3 : 0)) * esc; i++; }
}

// garabatos de pluma (una carta, una firma): una línea ondulada con lazos, sin letras
function b_pgGarabato(R, x0, y, ancho, k, col, alto = 1.5) {
  let py = y;
  for (let x = x0; x < x0 + ancho; x++) { if (h(Math.floor((x - x0) / 7), k, 590) < 0.12) { py = y; continue; }
    const yy = Math.round(y + Math.sin(x * 0.9 + k) * alto + (h(x, k, 591) < 0.1 ? -2 : 0)); R.linea(x - 1, py, x, yy, col); py = yy;
    if (h(x, k, 592) < 0.06) { R.pset(x, yy - 2, col); R.pset(x + 1, yy - 3, col); } }
}

// un globo terráqueo antiguo que gira (cx, cy, r): mares de color agua, tierras ocre y la luz arriba a la izquierda
function b_pgGlobo(R, cx, cy, r, t, vel = 0.25) {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d > 1) continue;
    const lon = Math.asin(Math.max(-1, Math.min(1, i / (r * Math.sqrt(Math.max(0.05, 1 - (j / r) ** 2)))))) + t * vel, lat = j / r;
    const tierra = h(Math.floor(lon * 3.2 + 50), Math.floor(lat * 3 + 9), 600) < 0.42, luz = (i + j) / r;
    let c = tierra ? hex('#c8a868') : hex('#7aa0a8'); if (luz < -0.7) c = b_pgMez(c, C.blanco, 0.35); else if (d > 0.82 || luz > 0.8) c = b_pgMez(c, C.k, 0.35);
    R.pset(cx + i, cy + j, c); }
  R.pset(cx - Math.round(r * 0.45), cy - Math.round(r * 0.5), C.blanco);
}

// el fondo fijo del gabinete (todo lo que no se mueve)
function b_pgGabFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  // el techo: las vigas que vienen hacia nosotros con sus vetas y la gran viga maestra con los ganchos
  rect(0, 0, 319, 19, PG.vigaD);
  for (let x = -8; x < 320; x += 22) { rect(x, 0, x + 13, 12, PG.viga); rect(x, 0, x + 1, 12, PG.vigaL); rect(x + 12, 0, x + 13, 12, PG.vigaS);
    for (let g = 0; g < 3; g++) { const gx = x + 3 + Math.round(h(x, g, 501) * 7); rect(gx, 1 + g * 3, gx, 3 + g * 3 + Math.round(h(x, g, 502) * 3), PG.vigaS); } }
  rect(0, 12, 319, 19, PG.viga); rect(0, 12, 319, 12, PG.vigaL); rect(0, 18, 319, 18, PG.vigaS); rect(0, 19, 319, 19, PG.vigaD);
  for (let x = 0; x < 320; x++) if (h(x, 15, 503) < 0.3) pset(x, 14 + Math.round(h(x, 16, 503) * 3), h(x, 17, 503) < 0.6 ? PG.vigaS : PG.vigaL);
  for (const gx of [122, 164]) { rect(gx - 1, 18, gx + 1, 20, K); pset(gx, 21, K); }
  // la pared de estuco verde con su moteado, las rosetas estarcidas y el friso de roleos (tranquila junto a Atom)
  rect(0, 20, 319, 71, PG.verde);
  for (let y = 20; y < 72; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 504); if (n < 0.1) pset(x, y, PG.verdeS); else if (n > 0.93) pset(x, y, PG.verdeL); }
  for (let y = 34, f = 0; y < 70; y += 14, f++) for (let x = (f % 2) * 9 + 4; x < 272; x += 18) {
    pset(x, y - 2, PG.verdeL); pset(x, y + 2, PG.verdeL); pset(x - 2, y, PG.verdeL); pset(x + 2, y, PG.verdeL); pset(x, y, PG.verdeD); pset(x - 1, y - 1, PG.verdeS); pset(x + 1, y + 1, PG.verdeS); }
  rect(0, 20, 319, 26, PG.tercS); rect(0, 26, 319, 26, PG.vigaS); rect(0, 21, 319, 21, PG.tercD);
  for (let x = 0; x < 320; x++) { const y = 23 + Math.round(Math.sin(x * 0.55) * 1.4); pset(x, y, x > 272 ? PG.tercL : C.oroS); if (x % 9 === 0 && x < 272) pset(x, y - 1, C.oro); }
  // el arrimadero de nogal: cornisa, cuarterones y zócalo
  rect(0, 72, 319, 112, PG.nogal); rect(0, 72, 319, 72, PG.nogalL); rect(0, 73, 319, 74, PG.nogalS); rect(0, 75, 319, 75, PG.nogalD);
  for (let x = 2; x < 320; x += 24) b_pgCuart(R, x, 79, x + 20, 103, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, x);
  rect(0, 106, 319, 112, PG.nogalS); rect(0, 106, 319, 106, PG.nogalL); rect(0, 111, 319, 112, PG.nogalD);
  // la ventana de piedra: el derrame en sombra, el marco con su bisel, la cruz de piedra y los plomos en rombo
  rect(6, 24, 68, 110, PG.piedD); rect(7, 25, 67, 108, PG.pied); rect(7, 25, 67, 25, PG.piedL); rect(7, 25, 7, 108, PG.piedL); rect(67, 25, 67, 108, PG.piedS);
  for (let y = 26; y < 108; y += 9) { rect(7, y, 11, y, PG.piedS); rect(63, y + 4, 67, y + 4, PG.piedS); }
  rect(11, 28, 63, 104, PG.piedS); rect(12, 29, 62, 103, PG.piedD);
  rect(14, 30, 60, 102, PG_HUECO);
  for (let y = 30; y <= 102; y++) for (let x = 14; x <= 60; x++) if ((x + y) % 9 === 0 || ((x - y) % 9 + 9) % 9 === 0) pset(x, y, hex('#4e4c56'));
  rect(36, 30, 38, 102, PG.pied); rect(36, 30, 36, 102, PG.piedL); rect(38, 30, 38, 102, PG.piedS);
  rect(14, 55, 60, 57, PG.pied); rect(14, 55, 60, 55, PG.piedL); rect(14, 57, 60, 57, PG.piedS);
  rect(2, 104, 72, 110, K); rect(3, 104, 71, 108, PG.piedL); rect(3, 108, 71, 109, PG.piedS); rect(3, 104, 71, 104, PG.marBL);
  // el bodegón: marco dorado con bisel, fondo oscuro, la mesa pintada, la fuente de peltre y las frutas con su brillo
  rect(84, 30, 136, 68, K); rect(85, 31, 135, 67, C.oro); rect(85, 31, 135, 31, C.oroL); rect(85, 31, 85, 67, C.oroL); rect(135, 31, 135, 67, C.oroS); rect(85, 67, 135, 67, C.oroS);
  for (let x = 87; x < 134; x += 3) { pset(x, 33, C.oroS); pset(x + 1, 65, C.oroL); }
  rect(89, 35, 131, 63, K); rect(90, 36, 130, 62, hex('#2a2218'));
  for (let y = 36; y < 63; y++) for (let x = 90; x < 131; x++) if (h(x, y, 505) < 0.12) pset(x, y, hex('#3a3022'));
  rect(90, 56, 130, 62, hex('#5a3a22')); rect(90, 56, 130, 56, hex('#7a5232'));
  for (let i = -14; i <= 14; i++) { const w = Math.round(3 * Math.sqrt(1 - (i / 15) ** 2)); rect(110 + i, 55 - w, 110 + i, 55, i < -6 ? hex('#c8ccd4') : hex('#9aa0ac')); }
  for (const [x, y] of [[98, 46], [96, 49], [99, 50], [97, 52], [100, 53], [102, 48], [95, 46]]) { disco(x, y, 1.6, hex('#4a2a5a')); pset(x - 1, y - 1, hex('#8a6aa8')); }
  disco(108, 49, 3.4, hex('#a82a2a')); pset(106, 47, hex('#f08a7a')); disco(116, 51, 3, hex('#c83a2a')); pset(115, 49, hex('#f8a08a'));
  poligono([[121, 44], [124, 44], [126, 52], [119, 52]], hex('#b8b848')); pset(121, 46, hex('#e8e890')); disco(112, 44, 2.4, hex('#e8c830')); pset(111, 43, hex('#fff4a0'));
  for (const [x, y] of [[104, 43], [126, 48], [93, 44]]) { linea(x, y, x + 3, y - 2, hex('#3a6a2a')); pset(x + 1, y - 2, hex('#5a8a3a')); }
  // los apliques de latón de las velas (las llamas, en cada fotograma)
  for (const ax of [76, 191]) { rect(ax - 2, 40, ax + 2, 50, K); rect(ax - 1, 41, ax + 1, 49, PG.laton); pset(ax - 1, 41, PG.latonL); linea(ax, 50, ax, 53, PG.latonS); }
  // el dosel de terciopelo con su cornisa dorada y el fleco, y el paño de honor con su adamascado y sus pliegues
  rect(140, 36, 184, 108, PG.terc);
  for (let y = 36; y < 108; y++) for (let x = 140; x <= 184; x++) { const pl = Math.sin((x - 140) * 0.7); if (pl > 0.75) pset(x, y, PG.tercL); else if (pl < -0.8) pset(x, y, PG.tercS); if (((x - 140) % 8 === 4 && (y - 36) % 10 === 5) || ((x - 140) % 8 === 0 && (y - 36) % 10 === 0)) { pset(x, y, C.oroS); pset(x, y - 1, PG.tercL); } }
  rect(140, 36, 140, 108, PG.tercD); rect(184, 36, 184, 108, PG.tercD);
  rect(134, 26, 190, 38, K); rect(135, 27, 189, 37, PG.tercS); rect(135, 27, 189, 28, C.oro); rect(135, 27, 189, 27, C.oroL);
  for (let x = 135; x < 190; x++) { const y = 36 + ((x % 6) < 3 ? 0 : 2); rect(x, 36, x, y, PG.tercS); pset(x, y + 1, (x % 6) === 4 ? C.oroL : C.oroS); if (x % 6 === 4) pset(x, y + 2, C.oro); }
  // la tarima y el trono: respaldo de terciopelo con botones y marco dorado, remates de bola, brazos y patas de león
  rect(128, 106, 196, 118, K); rect(129, 107, 195, 117, PG.nogal); rect(129, 107, 195, 108, PG.nogalL); rect(129, 116, 195, 117, PG.nogalS); rect(142, 107, 182, 108, PG.tercL);
  rect(149, 62, 175, 98, K); rect(150, 63, 174, 97, C.oro); rect(150, 63, 150, 97, C.oroL); rect(174, 63, 174, 97, C.oroS);
  rect(153, 66, 171, 95, PG.terc); rect(153, 66, 171, 66, PG.tercL);
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { const bx = 156 + i * 6 + (j % 2) * 3, by = 70 + j * 6; if (bx < 170) { pset(bx, by, C.oroS); pset(bx - 1, by - 1, PG.tercL); } }
  for (const fx of [150, 174]) { disco(fx, 60, 2.4, K); disco(fx, 60, 1.6, C.oro); pset(fx - 1, 59, C.oroL); }
  for (const ax of [143, 175]) { rect(ax, 86, ax + 6, 99, K); rect(ax + 1, 87, ax + 5, 98, C.oro); rect(ax + 1, 87, ax + 5, 88, PG.tercL); rect(ax + 1, 89, ax + 5, 89, PG.tercS); }
  rect(148, 94, 176, 100, K); rect(149, 95, 175, 99, PG.tercL); rect(149, 95, 175, 95, hex('#c8505a'));
  for (const lx of [150, 172]) { rect(lx, 100, lx + 3, 106, K); rect(lx + 1, 100, lx + 2, 105, C.oroS); rect(lx - 1, 105, lx + 4, 106, C.oro); }
  // el suelo de mármol rojo y blanco en perspectiva, con sus vetas y el brillo pulido
  b_pgSuelo(R, 113, 179, 26, (iu, iv, j, x, y) => {
    if (j) return PG.marJ; const roja = (iu + iv) & 1, n = h(x >> 1, y, 506 + roja);
    const c = roja ? PG.marR : PG.marB; return n < 0.08 ? (roja ? PG.marRS : PG.marBS) : n > 0.95 ? (roja ? PG.marRL : PG.marBL) : c; }, { fuga: 60 });
  rect(0, 113, 319, 113, PG.nogalD);
  for (let y = 114; y < 122; y++) for (let x = 196; x < 278; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, 0.28 - (y - 114) * 0.03, PG.ebanoS);
  // la alfombra turca: cenefa azul con su greca, campo rojo, el medallón y los flecos de delante
  for (let y = 136; y <= 175; y++) { const xa = Math.round(98 - (y - 136) * 0.85), xb = Math.round(232 + (y - 136) * 0.85), v = (y - 136) / 39;
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa), bu = Math.min(u, 1 - u) * (xb - xa), bv = Math.min(y - 136, 175 - y);
      let c = hex('#8a2a2a');
      if (bu < 6 || bv < 3) c = (bu < 1 || bv < 1) ? hex('#1a1a2a') : (((x + y) % 4 === 0) ? hex('#d8b860') : hex('#2a3a6a'));
      else { const du = Math.abs(u - 0.5) * 3.2, dv = Math.abs(v - 0.5) * 2; if (du + dv < 0.55) c = du + dv < 0.3 ? (((x + y) & 3) === 0 ? hex('#d8b860') : hex('#2a3a6a')) : hex('#c86a3a'); else if (((x * 3 + y * 5) % 23) === 0) c = hex('#d8b860'); else if (h(x, y, 507) < 0.06) c = hex('#6a2020'); }
      pset(x, y, c); } }
  for (let x = 64; x <= 266; x += 2) { rect(x, 176, x, 178, PG.vela); pset(x, 179, PG.velaS); }
  // el sol de la ventana en el suelo, con la sombra de la cruz de piedra
  b_pgHaz(R, 16, 114, 40, 150, 1.25, 0.24, hex('#fff0c8'), (x, y) => Math.abs(x - 37) < 2 || Math.abs(y - 128) < 1);
  // el globo grande de pie: trípode de nogal y el meridiano de latón (la esfera gira en cada fotograma)
  linea(74, 112, 80, 98, K); linea(88, 112, 82, 98, K); linea(81, 114, 81, 98, K); linea(75, 112, 80, 99, PG.nogalL); linea(87, 112, 82, 99, PG.nogalS);
  rect(70, 95, 92, 97, K); rect(71, 95, 91, 96, PG.nogalL);
  // el gran armario de ébano y oro de las rarezas: frontón, pilastras, cuatro baldas forradas de terciopelo y los cajones
  rect(194, 26, 278, 113, K); rect(195, 27, 277, 112, PG.ebano);
  rect(195, 27, 277, 30, PG.ebanoL); rect(195, 31, 277, 31, C.oroS); disco(236, 26, 3, K); disco(236, 26, 2, C.oro); pset(235, 25, C.oroL);
  for (const px of [195, 272]) { rect(px, 31, px + 5, 112, PG.ebanoL); rect(px + 1, 33, px + 4, 110, PG.ebano); rect(px + 2, 34, px + 2, 108, PG.ebanoS); rect(px, 32, px + 5, 33, C.oro); rect(px, 86, px + 5, 87, C.oro); }
  for (const [ya, yb] of [[33, 45], [49, 65], [69, 85]]) { rect(201, ya, 271, yb, PG.tercD); for (let y = ya; y <= yb; y++) for (let x = 201; x <= 271; x++) if (h(x, y, 508) < 0.12) pset(x, y, PG.tercS); rect(201, ya, 271, ya, K); }
  for (const y of [46, 66, 86]) { rect(200, y, 272, y + 2, PG.ebanoL); rect(200, y, 272, y, C.oroS); rect(200, y + 2, 272, y + 2, PG.ebanoS); }
  for (let i = 0; i < 3; i++) { const x = 202 + i * 23; rect(x, 90, x + 20, 109, K); rect(x + 1, 91, x + 19, 108, PG.ebanoL); rect(x + 1, 91, x + 19, 91, hex('#5e4c50')); rect(x + 3, 93, x + 17, 106, PG.ebano); disco(x + 10, 99, 1.5, C.oro); pset(x + 10, 102, K); }
  // el estante de arriba: caracola, coral, la copa de huevo de avestruz, el cuerpo del reloj y una drusa de amatista
  for (let j = 0; j < 7; j++) { const w = 7 - j; rect(204 + j, 45 - j, 204 + j + w, 45 - j, j % 2 ? hex('#f0d0c0') : hex('#e8b8a0')); } pset(206, 42, hex('#c88878')); pset(210, 39, hex('#fff0e8'));
  linea(221, 45, 221, 36, hex('#c83a3a')); linea(221, 40, 217, 35, hex('#c83a3a')); linea(221, 38, 225, 34, hex('#e85a4a')); linea(218, 37, 216, 38, hex('#c83a3a')); pset(225, 34, hex('#ff8a7a'));
  rect(231, 43, 237, 45, C.oroS); rect(233, 40, 235, 43, C.oro); disco(234, 37, 3.6, hex('#f0ead8')); pset(232, 35, C.blanco); rect(230, 38, 238, 38, C.oro);
  rect(244, 44, 260, 45, K); rect(245, 43, 259, 44, C.oro); rect(246, 31, 258, 43, C.oroS); rect(247, 32, 257, 42, C.oro); disco(252, 35, 2, C.oroL); pset(252, 30, C.oroL); pset(252, 29, C.oro);
  for (const [x, hh] of [[263, 4], [265, 6], [267, 3], [269, 5]]) { rect(x, 45 - hh, x + 1, 45, hex('#7a4aa8')); pset(x, 45 - hh, hex('#c8a0f0')); }
  // el estante del medio: el pie del astrolabio, la copa de nautilo, libros tumbados y un caballito de bronce
  rect(207, 64, 213, 65, PG.latonS); rect(209, 62, 211, 63, PG.laton);
  rect(226, 62, 232, 65, C.oroS); rect(228, 58, 230, 62, C.oro);
  disco(229, 53, 5.6, hex('#e8d8c0')); for (let a = 0; a < 6; a++) { const r = 5 - a * 0.7; R.anillo(229 - a * 0.4, 53 + a * 0.2, r, a % 2 ? hex('#d8884a') : hex('#c8a888')); } pset(226, 50, C.blanco); rect(223, 53, 235, 53, C.oro);
  for (let s = 0; s < 3; s++) { rect(240 + s, 63 - s * 2, 254 - s, 64 - s * 2, K); rect(240 + s, 63 - s * 2, 253 - s, 63 - s * 2, PG_LIB[s * 3]); }
  rect(258, 64, 268, 65, hex('#5a4a2a')); rect(259, 58, 266, 61, hex('#8a6a3a')); rect(260, 61, 260, 64, hex('#8a6a3a')); rect(265, 61, 265, 64, hex('#8a6a3a')); rect(265, 54, 267, 58, hex('#8a6a3a')); pset(268, 55, hex('#8a6a3a')); pset(259, 57, hex('#b08a4a')); pset(266, 54, hex('#b08a4a'));
  // el estante de abajo: la base de la jaula, el pie del globo pequeño, conchas y una geoda abierta
  rect(201, 84, 219, 85, K); rect(202, 83, 218, 84, C.oro);
  rect(229, 84, 237, 85, PG.latonS); rect(232, 82, 234, 84, PG.laton);
  for (const [x, c] of [[244, '#f0d8c8'], [249, '#e8c0a0'], [254, '#d8d0c0']]) { disco(x, 83, 2.2, hex(c)); pset(x, 82, C.blanco); pset(x + 1, 84, hex('#a88878')); }
  disco(264, 80, 4.4, hex('#6a5a5a')); disco(264, 80, 3, hex('#7a4aa8')); disco(264, 80, 1.6, hex('#c8a0f0')); pset(263, 79, C.blanco);
}

// el cocodrilo disecado que cuelga de la viga maestra por dos cuerdas y se mece despacio (sin heridas: un objeto de gabinete)
function b_pgCocodrilo(R, t) {
  const { pset, linea } = R, K = C.k, dx = Math.round(Math.sin(t * 0.6) * 1.6), dy = Math.round(Math.sin(t * 0.6 + 1) * 0.6), x0 = 96 + dx, y0 = 33 + dy;
  const V = hex('#6a7a3e'), VL = hex('#90a058'), VS = hex('#45502a'), VB = hex('#dcd49a'), VBS = hex('#b0a870');
  linea(122, 21, x0 + 26, y0 - 3, hex('#a8946a')); linea(164, 21, x0 + 70, y0 - 4, hex('#a8946a')); linea(123, 21, x0 + 27, y0 - 3, hex('#6a5a3a')); linea(165, 21, x0 + 71, y0 - 4, hex('#6a5a3a'));
  const N = 92, grosor = (i) => (i < 30 ? 0.8 + i * 0.13 : i < 66 ? 4.6 : i < 74 ? 3.8 : i < 88 ? 3.4 - (i - 74) * 0.12 : 1.8);
  const yc = (i) => y0 + 3 + (i < 28 ? -Math.round((28 - i) * 0.16) : 0);
  for (const [li, s] of [[34, 0], [60, 0], [38, 1], [64, 1]]) { const by = yc(li) + 4; for (let e = 0; e < 3; e++) linea(x0 + li + e, by, x0 + li - 3 + s * 5 + e, by + 6, e === 0 ? K : s ? VL : V); for (let d = -1; d <= 1; d++) { pset(x0 + li - 3 + s * 5 + d * 2, by + 7, K); pset(x0 + li - 3 + s * 5 + d * 2, by + 6, VS); } }
  for (let i = 0; i <= N; i++) { const g = grosor(i), c = yc(i), top = Math.round(c - g), bot = Math.round(c + g * 0.8), x = x0 + i;
    pset(x, top - 1, K); for (let y = top; y <= bot; y++) { const v = (y - top) / Math.max(1, bot - top); pset(x, y, v < 0.2 ? VS : v < 0.5 ? V : v < 0.7 ? VL : (i % 3 === 0 ? VBS : VB)); }
    pset(x, bot + 1, K);
    if (i < 70 && i % 3 === 0) { pset(x, top - 1, VS); pset(x, top - 2, K); } if (i < 70 && i % 3 === 1) pset(x, top, VL);
    if (i > 10 && i < 70 && i % 4 === 1) pset(x, Math.round(c - g * 0.2), VS); if (i > 74 && i % 3 === 0) pset(x, bot, C.blanco); }
  linea(x0 + 74, yc(74) + 1, x0 + N, yc(N) + 1, K); pset(x0 + 78, yc(78) - 4, K); pset(x0 + 79, yc(79) - 4, K); pset(x0 + 78, yc(78) - 3, hex('#f0d040')); pset(x0 + N - 1, yc(N) - 2, VS);
}

// las piezas del armario que se mueven: las agujas del reloj, la red del astrolabio, el pájaro autómata y el globo pequeño
function b_pgArmario(R, t) {
  const { pset, linea, disco, rect } = R, K = C.k;
  disco(252, 38, 4, K); disco(252, 38, 3.2, hex('#f4ecd8')); for (let k = 0; k < 4; k++) pset(252 + [0, 3, 0, -3][k], 38 + [-3, 0, 3, 0][k], C.oroS);
  const am = t * 1.6, ah = t * 0.13; linea(252, 38, Math.round(252 + Math.cos(am) * 3), Math.round(38 + Math.sin(am) * 3), K); linea(252, 38, Math.round(252 + Math.cos(ah) * 2), Math.round(38 + Math.sin(ah) * 2), hex('#5a3a24'));
  // el astrolabio: la madre de latón con su graduación y la red de estrellas que gira
  disco(210, 50, 1.6, PG.latonS); disco(210, 56, 7, K); disco(210, 56, 6.2, PG.laton); disco(210, 56, 4.6, PG.latonS);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; pset(Math.round(210 + Math.cos(a) * 5.6), Math.round(56 + Math.sin(a) * 5.6), PG.latonL); }
  const ar = t * 0.35; R.anillo(210 + Math.cos(ar) * 1.4, 56 + Math.sin(ar) * 1.4, 3.2, PG.latonL);
  for (let k = 0; k < 4; k++) { const a = ar + k * 1.7; pset(Math.round(210 + Math.cos(a) * 3.8), Math.round(56 + Math.sin(a) * 3.8), C.blanco); }
  pset(210, 56, K); linea(210, 56, Math.round(210 + Math.cos(-ar * 2) * 5), Math.round(56 + Math.sin(-ar * 2) * 5), hex('#5a3a18'));
  // el pájaro autómata en su jaula: gira la cabeza, aletea y da un saltito; los barrotes por delante
  { const f = t % 3.4, salto = f > 2.6 && f < 2.9 ? 1 : 0, dir = Math.floor(t / 1.7) % 2 ? 1 : -1, ala = Math.floor(t * 8) % 2 && f < 1.2, bx = 210, by = 80 - salto;
    rect(204, 81, 216, 81, PG.latonS); rect(bx - 2, by - 2, bx + 2, by, C.oro); rect(bx - 2, by - 2, bx + 2, by - 2, C.oroL); pset(bx + dir * 2, by - 3, C.oro); pset(bx + dir * 3, by - 3, hex('#e86a2a')); pset(bx + dir * 2, by - 4, C.oro); pset(bx + dir * 2, by - 3, C.k);
    pset(bx - dir * 3, by - 1, C.oroS); pset(bx - dir * 4, by - 2, C.oroS); if (ala) { pset(bx - dir, by - 4, C.oroL); pset(bx, by - 4, C.oroL); } else pset(bx - dir, by - 1, C.oroS);
    for (let x = 203; x <= 217; x += 2) { const top = 74 - Math.round(3 * Math.sqrt(Math.max(0, 1 - ((x - 210) / 8) ** 2))); linea(x, top, x, 82, PG.latonL); }
    R.anillo(210, 75, 7, PG.laton); pset(210, 69, PG.latonL); pset(210, 68, PG.latonS); }
  b_pgGlobo(R, 233, 77, 5, t, 0.5); R.anillo(233.5, 77.5, 6, PG.laton);
}

// la vista de Praga desde la ventana: el castillo en su colina (el palacio y la catedral con la torre de cúpula verde),
// los tejados rojos de la ciudad con chimeneas que echan humo y un campanario
function b_pgVistaPraga(R, t) {
  const { pset, linea, disco, poligono } = R, cl = [14, 30, 60, 102], rc = (a, b, c, d, col) => b_pgRc(R, cl, a, b, c, d, col);
  poligono([[0, 74], [14, 66], [30, 62], [50, 60], [70, 63], [70, 110], [0, 110]], PG.colina);
  for (let y = 62; y < 80; y++) for (let x = 14; x <= 60; x++) if (h(x, y, 509) < 0.18) pset(x, y, PG.colinaS);
  rc(14, 50, 40, 64, hex('#e0c890')); rc(14, 47, 40, 50, PG.tejado); rc(14, 47, 40, 47, PG.tejadoL);
  for (let x = 16; x < 40; x += 3) for (const y of [53, 58]) pset(x, y, hex('#5a4a3a'));
  rc(41, 44, 56, 64, hex('#b8b0a4')); rc(41, 44, 56, 45, hex('#8a8478'));
  for (let x = 42; x < 56; x += 3) { linea(x, 48, x, 58, hex('#5a6a8a')); pset(x, 47, hex('#d8d0c4')); pset(x + 1, 43, hex('#8a8478')); }
  rc(46, 36, 52, 50, hex('#c8c0b2')); rc(46, 36, 46, 50, hex('#e0d8ca')); rc(51, 36, 52, 50, hex('#9a9284')); pset(48, 40, hex('#3a3a4a')); pset(49, 40, hex('#3a3a4a')); pset(48, 45, hex('#3a3a4a'));
  disco(49.5, 33.5, 3.2, hex('#5a9a7a')); pset(48, 32, hex('#9ad0b0')); linea(49, 30, 49, 26, hex('#3a5a4a')); pset(49, 25, C.oro);
  rc(30, 58, 34, 64, hex('#e0c890'));
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) { const x = 12 + k * 9 + (r % 2) * 4 + Math.round(h(k, r, 510) * 3), y = 72 + r * 8, w = 4 + Math.round(h(k, r, 511) * 2);
    poligono([[x - w, y + 3], [x, y - 2], [x + w, y + 3]], (k + r) % 3 ? PG.tejado : PG.tejadoS); linea(x - w, y + 3, x, y - 2, PG.tejadoL);
    rc(x - w + 1, y + 4, x + w - 1, y + 9, (k + r) % 2 ? hex('#e8dcc0') : hex('#d8c8a0')); pset(x - 1, y + 6, hex('#5a4a3a')); pset(x + 2, y + 6, hex('#5a4a3a'));
    if (h(k, r, 512) < 0.3) { rc(x + 2, y - 3, x + 3, y, hex('#7a3a28')); for (let s = 0; s < 4; s++) { const u = ((t * 0.5 + s * 0.25 + k * 0.13) % 1); pset(Math.round(x + 3 + u * 4 + Math.sin(t + s) * 1), Math.round(y - 4 - u * 9), b_pgMez(hex('#c8c8cc'), PG.cielo2, u)); } } }
  rc(20, 64, 23, 80, hex('#e8dcc0')); poligono([[19, 65], [21.5, 56], [24, 65]], PG.cipres); pset(21, 55, C.oro);
  for (let k = 0; k < 5; k++) { const x = 14 + k * 11 + Math.round(h(k, 1, 513) * 4); disco(x, 69, 3, hex('#4a7a3a')); pset(x - 1, 67, hex('#6a9a4a')); }
  // un centinela diminuto que pasea por la muralla
  const gx = Math.round(17 + ((t * 2) % 20)); rc(gx, 61, gx, 63, hex('#3a2a4a')); pset(gx, 60, hex('#e0b090'));
}

function b_pgGabinete(R, t, o) {
  const fijo = b_pgCapa(R, 'gab', () => b_pgGabFijo(R));
  R.copiar(fijo);
  b_pgHueco(R, fijo, 14, 30, 60, 102, () => { b_pgCielo(R, t, 14, 30, 60, 102, { hor: 70, nubes: 3, pajaros: 2 }); b_pgVistaPraga(R, t); });
  b_pgGlobo(R, 81, 85, 9, t, 0.18); R.anillo(81.5, 85.5, 10, PG.laton); R.pset(81, 75, PG.latonL); R.pset(81, 95, PG.latonS);
  b_pgVela(R, 76, 41, t, 1, { palmatoria: false, alto: 6 }); b_pgVela(R, 191, 41, t, 2, { palmatoria: false, alto: 6 });
  b_pgArmario(R, t);
  b_pgCocodrilo(R, t);
  b_pgPolvo(R, t, 18, 60, 40, 150, 1.0, 16, 1);
  return { suelo: 150, mesa: { x0: 208, x1: 316, y: 131, libre: [236, 280] }, trono: { x: 162, y: 106 }, ventana: [14, 30, 60, 102] };
}

// la mesa de las rarezas, por delante de los personajes
function b_pgGabDelante(R, t, o) {
  if (o.mesa === false) return {};
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  for (let y = 174; y <= 179; y++) for (let x = 204; x <= 319; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, 0.35, C.k);
  for (const lx of [214, 260, 306]) { rect(lx - 3, 150, lx + 3, 177, K); rect(lx - 2, 150, lx + 2, 176, PG.nogal); rect(lx - 2, 150, lx - 2, 176, PG.nogalL); rect(lx - 3, 160, lx + 3, 162, PG.nogalS); disco(lx, 167, 3, K); disco(lx, 167, 2.2, PG.nogalL); rect(lx - 3, 175, lx + 3, 177, C.oroS); }
  rect(204, 128, 319, 152, K); rect(205, 129, 319, 151, PG.terc);
  for (let x = 205; x <= 319; x++) { const pl = Math.sin((x - 205) * 0.32); if (pl > 0.7) rect(x, 136, x, 150, PG.tercL); else if (pl < -0.7) rect(x, 136, x, 150, PG.tercS); }
  rect(205, 129, 319, 131, PG.tercL); rect(205, 132, 319, 133, PG.terc); rect(205, 134, 319, 135, PG.tercS);
  for (let x = 205; x <= 319; x++) { const y = 151 + (x % 4 < 2 ? 0 : 1); rect(x, 150, x, y, C.oroS); pset(x, y + 1, x % 4 === 1 ? C.oroL : C.oroS); }
  rect(205, 149, 319, 149, C.oro);
  // la copa de nautilo
  rect(218, 126, 228, 128, C.oroS); rect(222, 120, 224, 126, C.oro); disco(223, 114, 6.4, hex('#e8d8c0'));
  for (let a = 0; a < 6; a++) R.anillo(223 - a * 0.5, 114 + a * 0.2, 5.6 - a * 0.8, a % 2 ? hex('#d8884a') : hex('#c8a888')); pset(220, 110, C.blanco); rect(216, 114, 230, 114, C.oro);
  // un cofrecillo de monedas, con las monedas que brillan por turnos
  rect(284, 120, 300, 128, K); rect(285, 121, 299, 127, PG.nogal); rect(285, 121, 299, 121, PG.nogalL); rect(285, 124, 299, 124, C.oroS); rect(291, 123, 293, 125, C.oro);
  for (let k = 0; k < 5; k++) { const cx = 286 + k * 3, cy = 119 - (k % 2); disco(cx, cy, 1.6, C.oroS); pset(cx, cy, C.oro); if (Math.floor(t * 2 + k * 1.3) % 5 === 0) pset(cx - 1, cy - 1, C.blanco); }
  // la esfera armilar sobre su pie, con los anillos que giran
  rect(304, 126, 316, 128, K); rect(305, 126, 315, 127, PG.latonS); rect(309, 114, 311, 126, PG.laton);
  const cx = 310, cy = 106, a = t * 0.6;
  R.anillo(cx + 0.5, cy + 0.5, 7, PG.latonS);
  for (let k = 0; k < 40; k++) { const u = k / 40 * Math.PI * 2; pset(Math.round(cx + Math.cos(u) * 7 * Math.cos(a)), Math.round(cy + Math.sin(u) * 7), PG.latonL); pset(Math.round(cx + Math.cos(u) * 7), Math.round(cy + Math.sin(u) * 2.2 + Math.cos(u) * 2 * Math.sin(a * 0.5)), PG.laton); }
  disco(cx, cy, 1.6, hex('#5a9ad8')); linea(cx - 9, cy + 4, cx + 9, cy - 4, PG.latonS);
  return { tablero: 131 };
}

// el fondo fijo: la sala en penumbra desenfocada, la mesa de nogal y el libro abierto con su primera página
function b_pgUvFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  rect(0, 0, 319, 98, hex('#1c161c'));
  for (const [x0, y0, x1, y1, c] of [[0, 8, 70, 40, '#2a2026'], [0, 44, 70, 90, '#2c2228'], [84, 0, 180, 30, '#241c22'], [200, 10, 270, 60, '#2e2228'], [196, 64, 276, 96, '#2a2026']]) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 || h(x, y, 610) < 0.3) pset(x, y, hex(c)); }
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 611) * 270), y = 8 + Math.round(h(k, 2, 611) * 82); if (x > 270 && y < 46) continue; disco(x, y, 1 + h(k, 3, 611) * 2, PG_LIB[k % PG_LIB.length] === undefined ? K : b_pgMez(PG_LIB[k % PG_LIB.length], hex('#1c161c'), 0.6)); }
  // la mesa de nogal, con vetas y el canto de luz del fondo
  b_pgTablas(R, 0, 98, 319, 179, [PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD], 7, 11);
  rect(0, 98, 319, 99, PG.nogalD); rect(0, 100, 319, 100, PG.nogalL);
  // el libro: la cubierta de pergamino flexible que asoma, el lomo, las dos páginas con su curva y los cantos de las hojas
  b_pgSombraElipse(R, 162, 166, 116, 8, 0.6);
  poligono([[50, 36], [270, 36], [274, 164], [46, 164]], hex('#8a7448')); poligono([[52, 37], [268, 37], [271, 162], [49, 162]], hex('#c4ac7c'));
  for (let y = 37; y < 162; y++) for (let x = 50; x < 272; x++) if (h(x, y, 612) < 0.08 && R.pget(x, y) === hex('#c4ac7c')) pset(x, y, hex('#a8905e'));
  const pagina = (xa, xb, izq) => { for (let y = 32; y <= 158; y++) { const curva = Math.round(3 * Math.sin(Math.PI * (y - 32) / 126)); for (let x = xa; x <= xb; x++) {
    const dg = izq ? xb - x : x - xa, borde = izq ? x - xa : xb - x, top = 32 + Math.round(3 * (1 - dg / 100));
    if (y < top) continue; let c = C.pergamino; const n = h(x >> 1, y >> 1, 613 + (izq ? 1 : 0));
    if (n < 0.07) c = C.pergaminoS; else if (n > 0.93) c = hex('#f2e6c4'); if (dg < 10) c = b_pgMez(c, hex('#6a5030'), (10 - dg) / 22); if (borde < 2 + curva * 0) c = b_pgMez(c, hex('#8a7450'), 0.35);
    pset(x, y, c); } } };
  pagina(60, 159, true); pagina(161, 260, false);
  for (let k = 0; k < 3; k++) { linea(58 - k, 40 + k * 2, 58 - k, 158 + k, hex('#d8c8a0')); linea(262 + k, 40 + k * 2, 262 + k, 158 + k, hex('#d8c8a0')); linea(60, 159 + k, 260, 159 + k, k % 2 ? hex('#b8a47c') : hex('#e0d0a8')); }
  rect(159, 34, 161, 158, hex('#6a5030')); for (let y = 40; y < 158; y += 14) { pset(160, y, hex('#e8dcc0')); pset(160, y + 1, hex('#3a2a18')); }
  // manchas y la mancha de humedad de la esquina
  for (const [cx, cy, r, c] of [[90, 140, 9, '#d4c098'], [240, 48, 7, '#dac8a2'], [120, 60, 5, '#d8c6a0']]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j < r * r && h(cx + i, cy + j, 614) < 0.6) b_pgTi(R, cx + i, cy + j, 0.35, hex(c));
  // la página de la izquierda: el reverso de la tapa, con una etiqueta pegada con rayas y un número de estante
  rect(86, 54, 132, 84, hex('#8a7450')); rect(87, 55, 131, 83, hex('#efe4c8')); for (let k = 0; k < 4; k++) b_pgGarabato(R, 92, 61 + k * 6, 30 - k * 4, 30 + k, hex('#6a5a4a'), 0.8);
  R.numero('36', 120, 81, { color: hex('#6a5a4a'), sombra: false, fina: true });
  // la página de la derecha (la primera del libro): párrafos de signos inventados, con iniciales grandes de tinta rojiza
  const tinta = C.tinta, rojiza = hex('#9a4a2a');
  let y = 50;
  for (let p = 0; p < 4; p++) { b_pgSignos(R, 174, y + 4, 10, 40 + p, rojiza, 2);
    for (let l = 0; l < 4 && y < 132; l++) { b_pgSignos(R, l === 0 ? 186 : 174, y, l === 3 ? 40 + Math.round(h(p, l, 615) * 30) : 76 - (l === 0 ? 12 : 0), p * 5 + l, tinta); y += 7; }
    y += 4; }
  // la firma borrada, casi invisible a simple vista (con la luz violeta se enciende)
  b_pgFirma(R, b_pgMez(C.pergamino, C.pergaminoS, 0.3));
  // el cuello de cisne de la lámpara de luz violeta, que entra por la izquierda
  for (let k = 0; k < 30; k++) { const u = k / 29, x = Math.round(-2 + u * 26), yy = Math.round(110 - Math.sin(u * Math.PI * 0.8) * 52); disco(x, yy, 1.6, K); pset(x, yy - 1, hex('#5a5a66')); }
  poligono([[20, 52], [48, 42], [56, 60], [28, 70]], K); poligono([[22, 53], [47, 44], [53, 59], [29, 68]], hex('#3a3a46')); linea(23, 54, 46, 45, hex('#6a6a7a')); for (let k = 0; k < 4; k++) linea(26 + k * 6, 58 - k * 2, 28 + k * 6, 63 - k * 2, hex('#2a2a34'));
}

// la firma borrada (rayas y lazos, sin letras) en x 196–250, y 138–152, del color col
function b_pgFirma(R, col) { b_pgFirmaEn(R, 0, 0, col); }

// la misma firma desplazada (ox, oy): sirve para su halo
function b_pgFirmaEn(R, ox, oy, col) { b_pgGarabato(R, 198 + ox, 144 + oy, 50, 77, col, 2.2); b_pgGarabato(R, 204 + ox, 150 + oy, 30, 78, col, 1.2); R.linea(196 + ox, 153 + oy, 252 + ox, 151 + oy, col); }

// la sombra blanda bajo un objeto: oscurece una elipse
function b_pgSombraElipse(R, cx, cy, rx, ry, f = 0.7) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) b_pgTi(R, x, cy + j, 1 - f, C.k); }
}

function b_pgUv(R, t, o) {
  const fijo = b_pgCapa(R, 'uv', () => b_pgUvFijo(R)), uv = Math.max(0, Math.min(1, o.uv ?? 0));
  R.copiar(fijo);
  // las velas lejanas de la sala, desenfocadas, que tiemblan
  for (const [x, y, k] of [[34, 30, 1], [236, 70, 2], [120, 16, 3]]) { const a = 0.25 + h(Math.floor(t * 8), k, 616) * 0.1; for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) if (i * i + j * j < 16 && ((i + j) & 1) === 0) b_pgTi(R, x + i, y + j, a * (1 - Math.hypot(i, j) / 4), hex('#ffc870')); R.pset(x, y, hex('#ffe0a0')); }
  if (uv > 0) {
    // el cono de luz violeta: tiñe la página y lo que toca, más fuerte cerca de la lámpara, con un zumbido leve
    const lx = 52, ly = 58, ax = Math.atan2(140 - ly, 210 - lx), zumbido = 0.94 + 0.06 * Math.sin(t * 37);
    for (let y = ly; y < 180; y++) for (let x = lx; x < 320; x++) { const d = Math.hypot(x - lx, y - ly), a = Math.abs(Math.atan2(y - ly, x - lx) - ax);
      if (a < 0.36 && d < 260) b_pgTi(R, x, y, uv * 0.62 * (1 - d / 340) * (1 - a / 0.42) * zumbido, PG.uv); }
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j < 10) R.pset(53 + i, 58 + j, b_pgMez(hex('#3a3a46'), PG.uvL, uv * (1 - Math.hypot(i, j) / 4)));
    // la firma aparece y brilla, con un halo que respira
    const brillo = uv * (0.85 + 0.15 * Math.sin(t * 3));
    for (let y = 136; y <= 156; y++) for (let x = 192; x <= 256; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, brillo * 0.3, PG.uvL);
    for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { R.recorte([0, 0, 319, 179]); b_pgFirmaEn(R, ox, oy, b_pgMez(b_pgMez(C.pergamino, PG.uv, 0.4), PG.uvL, brillo * 0.8)); R.recorte(null); }
    b_pgFirma(R, b_pgMez(b_pgMez(C.pergamino, PG.uv, 0.4), PG.firma, brillo));
    b_pgPolvo(R, t, 70, 64, 30, 176, 1.1, 18, 9, b_pgMez(PG.uvL, C.blanco, 0.5));
  }
  return { libro: [60, 32, 260, 160], firma: [196, 138, 252, 154], lampara: [53, 58] };
}

// pictogramas egipcios (símbolos, no letras), 5 × 7: ojo, ibis, agua, junco, ankh, sol, serpiente, búho, escarabajo
const PG_JERO = [
  ['.....', '.###.', '#.#.#', '.###.', '..#..', '..##.', '.....'], ['..##.', '..#..', '.##..', '####.', '.###.', '.#.#.', '.#..#'],
  ['.....', '#.#.#', '.#.#.', '.....', '#.#.#', '.#.#.', '.....'], ['..#..', '.##..', '..#..', '..#.#', '..##.', '..#..', '..#..'],
  ['.###.', '.#.#.', '.###.', '#####', '..#..', '..#..', '..#..'], ['.....', '.###.', '#####', '##.##', '#####', '.###.', '.....'],
  ['.....', '.##..', '#..#.', '...#.', '..#..', '.#...', '#####'], ['.###.', '#.#.#', '#####', '.###.', '.###.', '.#.#.', '##.##'],
  ['#...#', '.###.', '#####', '.###.', '#####', '.###.', '#...#']];

function b_pgJero(R, x, y, k, col, esc = 1) { const g = PG_JERO[k % PG_JERO.length]; g.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') R.rect(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, col); }); }

function b_pgColFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  // el artesonado de madera oscura con sus rosetas, tranquilo bajo la barra del año
  rect(0, 0, 319, 15, PG.vigaD);
  for (let x = -6; x < 320; x += 24) for (let y = -2; y < 14; y += 10) { rect(x, y, x + 20, y + 7, PG.viga); rect(x + 2, y + 2, x + 18, y + 7, PG.vigaS); rect(x + 2, y + 2, x + 18, y + 2, PG.vigaD); pset(x + 10, y + 5, C.oroS); }
  rect(0, 14, 319, 18, PG.ocreD); rect(0, 14, 319, 14, PG.ocreL); for (let x = 0; x < 320; x += 4) rect(x, 16, x + 1, 17, PG.ocreS);
  // la pared de estuco ocre con su moteado y manchas de humedad
  rect(0, 19, 319, 112, PG.ocre);
  for (let y = 19; y < 113; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 620); if (n < 0.1) pset(x, y, PG.ocreS); else if (n > 0.94) pset(x, y, PG.ocreL); }
  for (let y = 19; y < 30; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, 0.12 * (30 - y) / 11, PG.vigaD);
  rect(0, 100, 319, 112, PG.ocreD); rect(0, 100, 319, 100, PG.ocreL); rect(0, 111, 319, 112, PG.nogalD);
  // el friso de jeroglíficos pintados: banda clara con filetes rojos y pictogramas en rojo y azul, algo desvaídos
  rect(68, 22, 184, 38, PG.ocreD); rect(68, 23, 184, 37, hex('#e8d8b0')); rect(68, 23, 184, 23, hex('#a8402a')); rect(68, 37, 184, 37, hex('#a8402a'));
  for (let k = 0, x = 71; x < 180; x += 8, k++) b_pgJero(R, x, 27, k * 7 + 3, k % 3 === 0 ? hex('#3a5a8a') : k % 3 === 1 ? hex('#8a3a2a') : hex('#3a6a5a'));
  for (let y = 23; y < 38; y++) for (let x = 68; x < 185; x++) if (h(x, y, 621) < 0.08) pset(x, y, hex('#e8d8b0'));
  // la estantería de la izquierda: costados, cinco baldas de libros viejos, rollos y el pie del reloj de arena
  rect(0, 20, 66, 113, K); rect(1, 21, 65, 112, PG.nogal); rect(1, 21, 65, 23, PG.nogalL); rect(5, 25, 61, 108, PG.nogalD);
  for (let y = 25; y < 108; y++) for (let x = 5; x < 62; x++) if (h(x, y, 622) < 0.1) pset(x, y, PG.vigaD);
  [42, 60, 78, 96].forEach((yb, i) => { if (i === 1) b_pgLibros(R, 6, 34, yb, 14, 10 + i); else b_pgLibros(R, 6, 60, yb, 14, 10 + i); rect(4, yb + 1, 62, yb + 3, PG.nogalL); rect(4, yb + 3, 62, yb + 3, PG.nogalS); });
  b_pgLibros(R, 6, 60, 106, 8, 15); rect(1, 107, 65, 112, PG.nogal);
  for (let k = 0; k < 3; k++) { disco(49 + k * 4, 29 + (k % 2), 1.8, hex('#e8dcc0')); pset(49 + k * 4, 29 + (k % 2), hex('#a89878')); } rect(40, 31, 60, 31, PG.nogalS); b_pgLibros(R, 6, 38, 31, 9, 16);
  rect(38, 57, 50, 60, PG.nogalL); rect(38, 45, 50, 46, PG.nogalL); for (const x of [38, 50]) rect(x, 46, x, 57, PG.nogalS);
  // la escalera de mano apoyada en la estantería
  linea(70, 112, 58, 24, K); linea(78, 112, 66, 24, K); linea(71, 112, 59, 24, PG.roble); linea(77, 112, 65, 24, PG.robleS);
  for (let y = 30; y < 110; y += 10) { const d = (112 - y) * (12 / 88); linea(Math.round(71 - d), y, Math.round(77 - d), y, PG.robleL); }
  // el grabado enmarcado: un obelisco con su trama y rayos de sol (sin letras)
  rect(106, 44, 150, 82, K); rect(107, 45, 149, 81, PG.nogal); rect(107, 45, 149, 45, PG.nogalL); rect(110, 48, 146, 78, hex('#ece0c4'));
  for (let y = 48; y < 79; y++) for (let x = 110; x < 147; x++) if (h(x, y, 623) < 0.05) pset(x, y, hex('#d8c8a8'));
  poligono([[124, 74], [132, 74], [130, 54], [128, 51], [126, 54]], hex('#5a4a3a')); for (let y = 55; y < 74; y += 2) linea(126, y, 131, y, hex('#ece0c4'));
  rect(118, 74, 138, 76, hex('#5a4a3a')); for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.15 + k * 0.12); linea(Math.round(140 + Math.cos(a) * 3), Math.round(58 + Math.sin(a) * 3), Math.round(140 + Math.cos(a) * 6), Math.round(58 + Math.sin(a) * 6), hex('#5a4a3a')); }
  disco(140, 58, 2, hex('#5a4a3a')); for (let x = 112; x < 145; x += 2) pset(x, 77, hex('#8a7a62'));
  // la maqueta del obelisco de granito en su pedestal, con signos grabados y luz de un lado
  rect(72, 92, 102, 113, K); rect(73, 93, 101, 112, PG.pied); rect(73, 93, 101, 94, PG.piedL); rect(73, 110, 101, 112, PG.piedS); rect(76, 97, 98, 107, PG.piedS); rect(77, 98, 97, 106, PG.pied);
  poligono([[79, 92], [95, 92], [92, 44], [82, 44]], K); poligono([[80, 91], [94, 91], [91, 45], [83, 45]], PG.granito); poligono([[88, 91], [94, 91], [91, 45], [87, 45]], PG.granitoS);
  poligono([[82, 45], [92, 45], [87, 37]], K); poligono([[83, 44], [91, 44], [87, 38]], C.oro); poligono([[87, 44], [91, 44], [87, 38]], C.oroS);
  for (let y = 48; y < 89; y += 5) for (let x = 83; x < 92; x += 3) if (h(x, y, 624) < 0.7) { pset(x, y, PG.granitoS); pset(x, y + 1, PG.granitoL); }
  linea(83, 45, 81, 91, PG.granitoL);
  // el reloj de péndulo: capitel, la esfera, la caja con su ventanita y el pie (el péndulo, en cada fotograma)
  rect(158, 38, 180, 100, K); rect(159, 39, 179, 99, PG.nogal); rect(157, 37, 181, 40, K); rect(158, 38, 180, 39, PG.nogalL);
  disco(169, 49, 7, K); disco(169, 49, 6, hex('#efe6d0')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(169 + Math.cos(a) * 5), Math.round(49 + Math.sin(a) * 5), K); }
  rect(163, 59, 175, 92, K); rect(164, 60, 174, 91, hex('#2a1e18')); rect(164, 60, 164, 91, hex('#4a3a30')); rect(159, 95, 179, 99, PG.nogalS); disco(169, 56, 1, C.oro);
  // la ventana de arco con su marco y los postigos abiertos, el alféizar y el hueco (lo de fuera, en cada fotograma)
  for (const [x0, x1] of [[184, 197], [261, 274]]) { rect(x0, 26, x1, 102, K); rect(x0 + 1, 27, x1 - 1, 101, PG.roble); for (let y = 30; y < 100; y += 24) b_pgCuart(R, x0 + 2, y, x1 - 2, y + 20, PG.roble, PG.robleL, PG.robleS, PG.robleD, x0 + y); }
  for (let y = 20; y <= 104; y++) for (let x = 196; x <= 262; x++) { const dx = x - 229, dy = y - 54, fuera = y < 54 ? dx * dx + dy * dy > 33 * 33 : Math.abs(dx) > 33; if (!fuera) pset(x, y, PG.piedS); }
  for (let y = 20; y <= 100; y++) for (let x = 199; x <= 259; x++) { const dx = x - 229, dy = y - 54, dentro = y < 54 ? dx * dx + dy * dy <= 29 * 29 : Math.abs(dx) <= 29; if (dentro && y <= 98) pset(x, y, PG_HUECO); }
  for (let y = 24; y <= 98; y++) for (let x = 200; x <= 258; x++) { if (R.pget(x, y) !== PG_HUECO) continue; if (x === 229 || x === 228 || y === 66 || (y > 66 && (x - 200) % 15 === 0) || (y < 66 && y > 30 && (x - 214) % 15 === 0)) pset(x, y, x === 228 ? PG.robleL : PG.roble); }
  for (let a = 0; a <= Math.PI; a += 0.02) { pset(Math.round(229 + Math.cos(a) * 30), Math.round(54 - Math.sin(a) * 30), PG.roble); pset(Math.round(229 + Math.cos(a) * 31), Math.round(54 - Math.sin(a) * 31), PG.piedL); }
  rect(192, 99, 266, 104, K); rect(193, 99, 265, 102, PG.piedL); rect(193, 99, 265, 99, C.blanco); rect(193, 103, 265, 104, PG.piedS);
  // el telescopio de latón en su trípode, delante de la ventana
  linea(214, 86, 204, 113, K); linea(214, 86, 226, 113, K); linea(214, 86, 215, 115, K); linea(213, 86, 203, 113, PG.robleL); linea(215, 86, 227, 113, PG.robleS);
  for (let k = 0; k < 48; k++) { const u = k / 47, x = Math.round(194 + u * 50), y = Math.round(90 - u * 26), r = u < 0.15 ? 1 : u < 0.6 ? 2 : 2.6;
    for (let d = -Math.ceil(r); d <= Math.ceil(r); d++) pset(x, y + d, Math.abs(d) >= r ? K : d < 0 ? PG.latonL : u > 0.6 ? PG.laton : PG.nogalL); if (k % 9 === 0) { pset(x, y - Math.ceil(r), PG.latonL); pset(x, y + Math.ceil(r), PG.latonS); } }
  disco(244, 64, 3.4, K); disco(244, 64, 2.4, hex('#7ab0d0')); pset(243, 63, C.blanco); disco(214, 85, 2, PG.latonS);
  // el mueble de la derecha con la linterna mágica de hojalata encima (su luz, en cada fotograma)
  rect(276, 84, 319, 113, K); rect(277, 85, 319, 112, PG.nogal); rect(277, 85, 319, 86, PG.nogalL); b_pgCuart(R, 280, 90, 298, 108, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, 5); b_pgCuart(R, 300, 90, 318, 108, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, 6);
  rect(286, 64, 306, 84, K); rect(287, 65, 305, 83, hex('#8a8a96')); rect(287, 65, 305, 66, hex('#b8b8c4')); rect(304, 67, 305, 83, hex('#5a5a66')); for (let y = 69; y < 82; y += 4) rect(290, y, 302, y, hex('#6a6a76'));
  rect(293, 54, 299, 64, K); rect(294, 55, 298, 63, hex('#7a7a86')); rect(292, 52, 300, 54, K); rect(279, 70, 286, 77, K); rect(280, 71, 286, 76, PG.laton); rect(280, 71, 286, 71, PG.latonL);
  // el suelo de barro cocido en perspectiva, con baldosas de tonos distintos y la mancha de sol de la ventana
  b_pgSuelo(R, 113, 179, 24, (iu, iv, j, x, y) => { if (j) return PG.cottoJ; const n = h(iu, iv, 625), m = h(x >> 1, y, 626); const c = n < 0.3 ? PG.cottoS : n > 0.8 ? PG.cottoL : PG.cotto; return m < 0.06 ? PG.cottoS : m > 0.96 ? PG.cottoL : c; }, { fuga: 70, prof: 0.6 });
  rect(0, 113, 319, 113, PG.nogalD);
  b_pgHaz(R, 196, 114, 56, 160, -0.9, 0.26, hex('#fff2d0'), (x, y) => Math.abs(x - 228) < 2 || Math.abs(y - 128) < 1);
}

// la vista de Roma por la ventana: colinas, la gran cúpula con su linterna, un campanario, pinos, cipreses y los tejados
// de teja con chimeneas que humean y una cuerda de ropa tendida que ondea
function b_pgVistaRoma(R, t) {
  const { pset, linea, disco, poligono } = R, cl = [199, 20, 259, 98], rc = (a, b, c, d, col) => b_pgRc(R, cl, a, b, c, d, col);
  poligono([[190, 72], [214, 64], [236, 68], [270, 62], [270, 80], [190, 80]], PG.lejos);
  rc(236, 58, 252, 70, hex('#d8d0c0')); for (let x = 237; x < 252; x += 3) rc(x, 61, x, 67, hex('#9a9080'));
  for (let j = 0; j <= 10; j++) { const w = Math.round(9 * Math.sqrt(1 - (j / 10.5) ** 2)); rc(244 - w, 58 - j, 244 + w, 58 - j, j > 7 ? hex('#c8d0d8') : hex('#a8b4c0')); }
  for (const dx of [-5, 0, 5]) linea(244 + dx, 58, 244 + Math.round(dx * 0.4), 49, hex('#8a96a4')); rc(243, 44, 245, 48, hex('#d8d0c0')); pset(244, 43, C.oro);
  rc(210, 50, 216, 80, hex('#e0c8a0')); rc(210, 50, 210, 80, hex('#f0dcb8')); rc(216, 50, 216, 80, hex('#b8a080')); for (const y of [54, 62]) { rc(212, y, 214, y + 3, hex('#3a2a2a')); } poligono([[209, 50], [213, 44], [217, 50]], PG.tejado);
  for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { const x = 196 + k * 12 + (r % 2) * 6, y = 76 + r * 8;
    rc(x - 5, y, x + 6, y + 9, [hex('#e8c890'), hex('#d8a878'), hex('#ecd8b0')][(k + r) % 3]); rc(x - 6, y - 2, x + 7, y, PG.tejado); rc(x - 6, y - 2, x + 7, y - 2, PG.tejadoL);
    for (let i = -5; i < 7; i += 2) pset(x + i, y - 1, PG.tejadoS); pset(x - 2, y + 4, hex('#4a3a3a')); pset(x + 3, y + 4, hex('#4a3a3a'));
    if (h(k, r, 627) < 0.35) { rc(x + 3, y - 5, x + 4, y - 2, hex('#a85a3a')); for (let s = 0; s < 4; s++) { const u = (t * 0.45 + s * 0.25 + k * 0.17) % 1; pset(Math.round(x + 4 + u * 5 + Math.sin(t + s)), Math.round(y - 6 - u * 10), b_pgMez(hex('#d8d8dc'), PG.cielo2, u)); } } }
  // los pinos piñoneros (copa ancha y plana que se mece) y un ciprés
  for (const [px, py, w] of [[204, 64, 9], [255, 70, 7]]) { const m = Math.round(Math.sin(t * 0.9 + px) * 0.8); linea(px, py + 12, px + m, py + 2, hex('#5a3a2a')); for (let i = -w; i <= w; i++) { const hh = Math.round(3 * Math.sqrt(1 - (i / (w + 1)) ** 2)); for (let j = -hh; j <= hh; j++) pset(px + i + m, py + j, j < 0 ? hex('#4a7a3a') : hex('#2e5a2e')); } pset(px - 3 + m, py - 2, hex('#6a9a4a')); }
  { const m = Math.round(Math.sin(t * 1.1) * 0.7); poligono([[226, 80], [229 + m, 60], [232, 80]], PG.cipres); linea(228, 78, 229 + m, 62, PG.cipresL); }
  // la ropa tendida entre dos casas, que ondea
  linea(226, 84, 252, 83, hex('#5a4a3a')); for (let k = 0; k < 4; k++) { const x = 230 + k * 6, o = Math.round(Math.sin(t * 4 + k) * 1); rc(x, 84, x + 3, 87 + o, [C.blanco, hex('#c84a3a'), hex('#4a7ac8'), hex('#e8d880')][k]); }
}

function b_pgColegio(R, t, o) {
  const fijo = b_pgCapa(R, 'col', () => b_pgColFijo(R));
  R.copiar(fijo);
  b_pgHueco(R, fijo, 199, 20, 259, 98, () => { b_pgCielo(R, t, 199, 20, 259, 98, { hor: 72, nubes: 3, pajaros: 3, colPajaro: hex('#2a2a3a') }); b_pgVistaRoma(R, t); });
  // el péndulo que oscila tras su ventanita y las agujas del reloj
  const a = Math.sin(t * Math.PI / 1.0) * 0.22, px = Math.round(169 + Math.sin(a) * 26), py = Math.round(60 + Math.cos(a) * 26);
  R.linea(169, 60, px, py, PG.latonS); R.disco(px, py, 2.4, PG.laton); R.pset(px - 1, py - 1, PG.latonL);
  R.linea(169, 49, Math.round(169 + Math.cos(t * 0.8) * 4), Math.round(49 + Math.sin(t * 0.8) * 4), C.k); R.linea(169, 49, Math.round(169 + Math.cos(t * 0.07) * 3), Math.round(49 + Math.sin(t * 0.07) * 3), C.k);
  // el reloj de arena de la estantería: la arena baja y vuelve a empezar
  { const u = (t % 8) / 8; for (let j = 0; j < 5; j++) { const w = 4 - j; R.rect(44 - w, 47 + j, 44 + w, 47 + j, hex('#cfe0e8')); R.rect(44 - j, 56 - j, 44 + j, 56 - j, hex('#cfe0e8')); }
    const arriba = Math.round(4 * (1 - u)), abajo = Math.round(4 * u); for (let j = 5 - arriba; j < 5; j++) R.rect(44 - (4 - j), 47 + j, 44 + (4 - j), 47 + j, hex('#e8c880'));
    for (let j = 0; j < abajo; j++) R.rect(44 - (4 - j), 56 - j, 44 + (4 - j), 56 - j, hex('#e8c880')); if (u < 0.97 && Math.floor(t * 8) % 2) R.pset(44, 52, hex('#e8c880')); R.pset(44, 53, hex('#e8c880')); }
  // la linterna mágica: la luz parpadea por las rendijas y la lente
  const lz = 0.6 + 0.4 * h(Math.floor(t * 9), 3, 628);
  for (let y = 70; y < 82; y += 4) R.rect(290, y + 1, 302, y + 1, b_pgMez(hex('#8a6a3a'), hex('#ffe08a'), lz)); R.disco(281, 73.5, 2.4, b_pgMez(hex('#c89a40'), hex('#fff4c0'), lz));
  for (let k = 0; k < 4; k++) { const sx = 292 + Math.round(Math.sin(t * 1.3 + k) * 2), sy = 50 - ((t * 6 + k * 4) % 14); R.pset(sx, Math.round(sy), b_pgMez(hex('#9a9aa0'), PG.ocre, ((t * 6 + k * 4) % 14) / 14)); }
  b_pgPolvo(R, t, 200, 100, 50, 160, -0.9, 10, 3);
  return { suelo: 150, detras: 130, escritorio: { x0: 168, x1: 278, y: 126, libre: [196, 246] }, ventana: [199, 20, 259, 98] };
}

// el escritorio de Kircher, por delante de los personajes (quien escribe detrás, con los pies en 130)
function b_pgColDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = C.k;
  b_pgSombraElipse(R, 224, 175, 62, 4, 0.6);
  for (const lx of [174, 272]) { rect(lx - 4, 156, lx + 4, 174, K); rect(lx - 3, 156, lx + 3, 173, PG.nogal); rect(lx - 3, 156, lx - 2, 173, PG.nogalL); disco(lx, 165, 4, K); disco(lx, 165, 3, PG.nogalL); rect(lx - 5, 172, lx + 5, 175, K); rect(lx - 4, 172, lx + 4, 174, PG.nogalS); pset(lx - 3, 172, PG.nogalL); }
  rect(166, 128, 280, 158, K); rect(167, 129, 279, 157, PG.nogal); rect(166, 124, 280, 129, K); rect(167, 125, 279, 127, PG.nogalL); rect(167, 128, 279, 128, PG.nogalS);
  for (let i = 0; i < 3; i++) { const x = 172 + i * 36; b_pgCuart(R, x, 132, x + 32, 154, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, 30 + i); rect(x + 13, 140, x + 19, 142, K); rect(x + 14, 140, x + 18, 141, PG.latonL); }
  rect(167, 157, 279, 157, PG.nogalD);
  // encima: libros apilados, papeles con garabatos, el tintero con la pluma y la vela (que tiembla)
  for (let s = 0; s < 4; s++) { const c = PG_LIB[(s * 3 + 1) % PG_LIB.length]; rect(170 + s, 122 - s * 3, 190 - s, 124 - s * 3, K); rect(170 + s, 122 - s * 3, 189 - s, 123 - s * 3, c); rect(187 - s, 122 - s * 3, 188 - s, 123 - s * 3, PG.vela); }
  rect(232, 121, 250, 124, hex('#e8dcc0')); rect(232, 124, 250, 124, hex('#b8a888')); for (let k = 0; k < 2; k++) b_pgGarabato(R, 234, 122 + k, 14, 50 + k, hex('#6a5a4a'), 0.4);
  rect(252, 118, 258, 124, K); rect(253, 119, 257, 123, hex('#3a3a46')); rect(253, 119, 257, 119, hex('#6a6a7a')); linea(256, 118, 262, 104, hex('#e8e4da')); linea(257, 117, 263, 105, hex('#b8b4aa')); pset(262, 103, C.blanco);
  b_pgVela(R, 270, 125, t, 7, { alto: 8 });
  return { tablero: 125 };
}

function b_pgCartaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  b_pgTablas(R, 0, 0, 319, 179, [PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD], 11, 14);
  for (let y = 0; y < 46; y++) for (let x = 262; x < 320; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, 0.3, PG.nogal);
  // el vade de piel verde con su filete dorado
  b_pgSombraElipse(R, 162, 172, 104, 4, 0.6);
  rect(58, 40, 264, 172, K); rect(59, 41, 263, 171, hex('#2e5a3e')); for (let y = 41; y < 172; y++) for (let x = 59; x < 264; x++) if (h(x, y, 630) < 0.1) pset(x, y, hex('#264e34'));
  rect(63, 45, 259, 45, C.oroS); rect(63, 167, 259, 167, C.oroS); rect(63, 45, 63, 167, C.oroS); rect(259, 45, 259, 167, C.oroS); for (let x = 66; x < 258; x += 5) { pset(x, 47, C.oroS); pset(x, 165, C.oroS); }
  // el libro de jeroglíficos abierto a la izquierda
  poligono([[4, 18], [66, 14], [70, 106], [8, 110]], K); poligono([[6, 19], [36, 17], [38, 106], [9, 108]], hex('#efe4c6')); poligono([[37, 17], [64, 15], [68, 104], [39, 106]], hex('#e6d8b8'));
  for (let k = 0; k < 12; k++) b_pgJero(R, 12 + (k % 3) * 8, 24 + Math.floor(k / 3) * 12, k * 5 + 1, k % 2 ? hex('#8a3a2a') : hex('#3a4a6a'));
  poligono([[48, 30], [56, 30], [55, 80], [49, 80]], hex('#5a4a3a')); poligono([[49, 30], [55, 30], [52, 22]], hex('#5a4a3a')); for (let y = 84; y < 100; y += 4) linea(42, y, 64, y - 1, hex('#8a7a62'));
  linea(37, 17, 38, 106, hex('#b8a888'));
  // el tintero de peltre con la pluma y el salvadera
  disco(286, 128, 12, K); disco(286, 128, 11, hex('#7a7a86')); disco(286, 127, 7, hex('#9a9aa6')); disco(286, 127, 4, K); disco(286, 127, 3, hex('#141018')); pset(281, 122, C.blanco);
  linea(284, 126, 310, 84, hex('#e8e4da')); linea(285, 126, 311, 85, hex('#c8c4ba')); for (let k = 0; k < 18; k++) { const u = k / 17, x = Math.round(296 + u * 14), y = Math.round(108 - u * 23); pset(x + 2, y, hex('#f4f0e8')); pset(x - 2, y + 1, hex('#d8d4ca')); }
  disco(290, 160, 6, K); disco(290, 160, 5, hex('#8a7a62')); disco(290, 159, 3, hex('#b8a888')); for (const [i, j] of [[-1, -1], [1, 0], [0, 1]]) pset(290 + i, 159 + j, K);
  // unas monedas y un lacre en barra
  for (const [x, y] of [[96, 26], [104, 30]]) { disco(x, y, 4, K); disco(x, y, 3.2, C.oro); pset(x - 1, y - 1, C.oroL); }
  // un boceto de jeroglíficos en una hoja suelta, un sello de latón y unas monedas
  poligono([[228, 54], [256, 50], [260, 98], [232, 102]], K); poligono([[229, 55], [255, 51], [259, 97], [233, 101]], hex('#e8dcc0'));
  for (let k = 0; k < 6; k++) b_pgJero(R, 233 + (k % 3) * 8, 58 + Math.floor(k / 3) * 12, k * 4 + 2, hex('#5a4a3a'));
  for (let k = 0; k < 3; k++) b_pgGarabato(R, 236, 86 + k * 4, 18, 95 + k, hex('#6a5a4a'), 0.5);
  disco(80, 150, 6, K); disco(80, 150, 5, PG.laton); disco(80, 150, 3, PG.latonS); pset(78, 148, PG.latonL); rect(78, 136, 82, 146, K); rect(79, 136, 81, 145, PG.nogal); disco(80, 135, 3, K); disco(80, 135, 2, PG.nogalL);
  for (const [x, y] of [[74, 60], [80, 64], [86, 58]]) { disco(x, y, 3.4, K); disco(x, y, 2.6, C.oro); pset(x - 1, y - 1, C.oroL); }
  rect(236, 22, 254, 26, K); rect(237, 23, 253, 25, hex('#b82a2a')); rect(237, 23, 253, 23, hex('#e85a4a'));
}

// la carta: doblada en tres con el lacre (abre 0) o abierta con sus renglones de garabatos y el lacre partido (abre 1)
function b_pgCarta(R, t, abre) {
  const { rect, pset, disco } = R, K = C.k, x0 = 98, x1 = 222, ym0 = 88, ym1 = 122, alto = 34, P = hex('#efe6cc'), PS = hex('#d8ccae'), PD = hex('#b8a888'), tinta = hex('#4a3426');
  const ua = Math.max(0, Math.min(1, abre * 2)), ub = Math.max(0, Math.min(1, abre * 2 - 1));
  b_pgSombraElipse(R, 162, ym1 + 4 + Math.round(ub * alto), 66, 3, 0.75);
  const panel = (ya, yb, dentro, k) => { rect(x0, ya, x1, yb, K); rect(x0 + 1, ya + 1, x1 - 1, yb - 1, dentro ? P : PS); if (dentro) for (let y = ya + 4; y < yb - 2; y += 4) b_pgGarabato(R, x0 + 6, y, x1 - x0 - 14 - (h(y, k, 631) * 20 | 0), y + k, tinta, 0.6); };
  // la hoja de abajo (se despliega en la segunda mitad)
  panel(ym0, ym1, true, 1);
  { const hb = Math.round(alto * Math.abs(Math.cos(Math.PI * ub))); if (ub < 0.5) { if (hb > 1) { panel(ym1 - hb, ym1, false, 3); rect(x0 + 1, ym1 - hb, x1 - 1, ym1 - hb, PD); } } else { panel(ym1, ym1 + hb, true, 3); if (ub > 0.9) b_pgFirma0(R, x1 - 44, ym1 + hb - 6, tinta); } }
  // la hoja de arriba (se despliega en la primera mitad), con el lacre
  const hp = Math.round(alto * Math.abs(Math.cos(Math.PI * ua)));
  if (ua < 0.5) { if (hp > 0) { panel(ym0, ym0 + hp, false, 2); rect(x0 + 1, ym0 + hp - 1, x1 - 1, ym0 + hp - 1, PD); } const sy = ym0 + hp - 2; disco(160, sy, 6, K); disco(160, sy, 5, hex('#b82a2a')); disco(160, sy, 3, hex('#9a1e1e')); pset(158, sy - 2, hex('#f07a6a')); R.anillo(160.5, sy + 0.5, 3, hex('#d84a3a'));
    if (abre === 0) for (let k = 0; k < 3; k++) { const a = t * 2 + k * 2.1; pset(Math.round(160 + Math.cos(a) * 9), Math.round(sy + Math.sin(a) * 5), C.oroL); } }
  else { panel(ym0 - hp, ym0, true, 2); disco(160, ym0 - hp + 1, 3, hex('#9a1e1e')); rect(156, ym0 - hp - 2, 164, ym0 - hp, hex('#efe6cc')); disco(160, ym0 + 2, 3, hex('#b82a2a')); rect(156, ym0 + 2, 164, ym0 + 5, P); pset(158, ym0 + 1, hex('#f07a6a')); }
}

function b_pgFirma0(R, x, y, col) { b_pgGarabato(R, x, y, 34, 91, col, 1.8); R.linea(x, y + 3, x + 36, y + 2, col); }

function b_pgCartaPlano(R, t, o) {
  const fijo = b_pgCapa(R, 'carta', () => b_pgCartaFijo(R));
  R.copiar(fijo);
  b_pgVela(R, 30, 160, t, 8, { alto: 14, radio: 22 });
  b_pgCarta(R, t, Math.max(0, Math.min(1, o.abre ?? 0)));
  return { carta: [98, 54, 222, 156], tintero: [286, 127], pluma: [310, 84] };
}

// sillares de piedra entre (x0, y0) y (x1, y1): hiladas a matajunta, cada piedra con su tono, luz arriba y sombra abajo
function b_pgSillares(R, x0, y0, x1, y1, w, a, k = 0, cols = [PG.pied, PG.piedL, PG.piedS, PG.piedD]) {
  const { rect, pset } = R, [c, cL, cS, cD] = cols; rect(x0, y0, x1, y1, cD);
  for (let f = 0, y = y0; y <= y1; y += a, f++) { const off = (f % 2) * (w >> 1) - Math.round(h(f, 1, 640 + k) * 4);
    for (let x = x0 - w + off; x <= x1; x += w) { const xa = Math.max(x0, x + 1), xb = Math.min(x1, x + w - 1), ya = y + 1, yb = Math.min(y1, y + a - 1); if (xb < xa || yb < ya) continue;
      const n = h(x, f, 641 + k), cc = n < 0.25 ? cS : n > 0.85 ? b_pgMez(c, cL, 0.5) : c; rect(xa, ya, xb, yb, cc); rect(xa, ya, xb, ya, cL); rect(xa, yb, xb, yb, b_pgMez(cc, cD, 0.5));
      for (let s = 0; s < (xb - xa) * (yb - ya) / 9; s++) pset(xa + Math.round(h(s, x + f, 642 + k) * (xb - xa)), ya + 1 + Math.round(h(s, x - f, 643 + k) * Math.max(0, yb - ya - 2)), h(s, f, 644 + k) < 0.5 ? cS : cL); } }
}

// un tarro o frasco de botica (x centro, yb base): tipo 0 frasco de vidrio redondo con líquido, 1 tarro de barro con
// tela atada, 2 botella alta, 3 mortero
function b_pgTarro(R, x, yb, tipo, col, esc = 1) {
  const { rect, pset, disco } = R, K = C.k, s = esc;
  if (tipo === 0) { disco(x, yb - 4 * s, 4 * s + 0.6, K); disco(x, yb - 4 * s, 4 * s - 0.4, hex('#b8d8d0')); for (let j = 0; j <= 4 * s; j++) { const w = Math.round(Math.sqrt(Math.max(0, (4 * s - 0.4) ** 2 - j * j))); rect(x - w, yb - 4 * s + j, x + w, yb - 4 * s + j, col); } rect(x - s, yb - 10 * s, x + s - 1 + (s > 1 ? 1 : 0), yb - 7 * s, K); rect(x - s + 1, yb - 10 * s, x + s - 1, yb - 7 * s, hex('#b8d8d0')); rect(x - s, yb - 11 * s, x + s, yb - 10 * s, PG.robleS); pset(x - 2 * s, yb - 6 * s, C.blanco); }
  else if (tipo === 1) { rect(x - 3 * s, yb - 8 * s, x + 3 * s, yb, K); rect(x - 3 * s + 1, yb - 8 * s + 1, x + 3 * s - 1, yb, col); rect(x - 3 * s + 1, yb - 8 * s + 1, x - 3 * s + 1, yb, b_pgMez(col, C.blanco, 0.3)); rect(x - 3 * s, yb - 10 * s, x + 3 * s, yb - 8 * s, hex('#d8ccb0')); rect(x - 3 * s, yb - 8 * s, x + 3 * s, yb - 8 * s, hex('#8a6a3a')); pset(x + 3 * s, yb - 9 * s, hex('#8a6a3a')); }
  else if (tipo === 2) { rect(x - 2 * s, yb - 9 * s, x + 2 * s, yb, K); rect(x - 2 * s + 1, yb - 9 * s + 1, x + 2 * s - 1, yb, col); rect(x - s + 1, yb - 13 * s, x + s - 1, yb - 9 * s, K); rect(x - 2 * s + 1, yb - 8 * s, x - 2 * s + 1, yb - 2 * s, b_pgMez(col, C.blanco, 0.5)); pset(x, yb - 14 * s, hex('#8a6a3a')); }
  else { rect(x - 4 * s, yb - 5 * s, x + 4 * s, yb, K); rect(x - 4 * s + 1, yb - 5 * s + 1, x + 4 * s - 1, yb, hex('#a8a090')); rect(x - 3 * s, yb - 5 * s + 1, x + 3 * s, yb - 5 * s + 1, hex('#5a5048')); R.linea(x + s, yb - 5 * s, x + 4 * s, yb - 10 * s, hex('#c8c0b0')); }
}

const PG_LIQ = ['#5aa85a', '#d8a030', '#b83a3a', '#4a7ac8', '#8a5ab8', '#c8c050', '#3a8a8a'].map(hex);

const PG_BARRO = ['#a86a3a', '#8a5a3a', '#c8a070', '#6a7a5a', '#b88a5a'].map(hex);

function b_pgAlqFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k, ya = (x) => 42 - 34 * Math.sqrt(Math.max(0, 1 - ((x - 160) / 200) ** 2));
  // la pared de sillares, ennegrecida de hollín cerca del horno, y la bóveda de cañón con sus dovelas
  b_pgSillares(R, 0, 0, 319, 113, 16, 8, 1);
  for (let y = 0; y < 113; y++) for (let x = 0; x < 320; x++) { if (y < ya(x)) { const c = R.pget(x, y); pset(x, y, b_pgMez(c, PG.hollin, 0.55 - y / 120)); } else if (x < 110) { const a = Math.max(0, (110 - x) / 110 * (1 - y / 140)) * 0.7; if (a > 0.02 && ((x + y) & 1) === 0) b_pgTi(R, x, y, a, PG.hollin); } }
  for (let x = 0; x < 320; x++) { const y = Math.round(ya(x)); rect(x, y, x, y + 2, (Math.floor(x / 9) % 2) ? PG.piedL : PG.pied); pset(x, y + 3, PG.piedD); if (x % 9 === 0) rect(x, y, x, y + 2, PG.piedD); }
  // el atanor: la campana tiznada, el cuerpo de ladrillo, la repisa con la retorta y el crisol, y la boca del fuego
  poligono([[10, 52], [76, 52], [58, 16], [28, 16]], K); poligono([[12, 51], [74, 51], [57, 17], [29, 17]], hex('#6a5a52'));
  for (let y = 17; y < 52; y++) for (let x = 12; x < 75; x++) if (R.pget(x, y) === hex('#6a5a52')) { const a = (52 - y) / 40; if (h(x >> 1, y >> 1, 645) < 0.3 + a * 0.5) pset(x, y, b_pgMez(hex('#6a5a52'), PG.hollin, 0.4 + a * 0.4)); }
  rect(8, 50, 78, 54, K); rect(9, 50, 77, 53, PG.piedL); rect(9, 50, 77, 50, PG.marBL);
  rect(12, 54, 74, 113, K);
  for (let f = 0, y = 55; y < 113; y += 4, f++) for (let x = 13 - (f % 2) * 4; x < 74; x += 8) { const n = h(x, f, 646); rect(Math.max(13, x), y, Math.min(73, x + 6), y + 2, n < 0.3 ? PG.ladrS : n > 0.8 ? PG.ladrL : PG.ladr); rect(Math.max(13, x), y, Math.min(73, x + 6), y, b_pgMez(PG.ladr, PG.ladrL, 0.6)); }
  for (let y = 55; y < 113; y++) for (let x = 13; x < 74; x++) if (((x + y) & 1) === 0 && h(x >> 2, y >> 2, 647) < 0.25) b_pgTi(R, x, y, 0.4, PG.hollin);
  for (let y = 78; y <= 108; y++) for (let x = 26; x <= 60; x++) { const dx = x - 43, dy = y - 92; if (y < 92 ? dx * dx + dy * dy <= 17 * 17 : Math.abs(dx) <= 17) pset(x, y, K); }
  for (let a = Math.PI; a <= Math.PI * 2; a += 0.05) for (const r of [18, 19]) pset(Math.round(43 + Math.cos(a) * r), Math.round(92 + Math.sin(a) * r), r === 18 ? PG.piedL : PG.pied);
  rect(24, 108, 62, 112, PG.piedS); rect(24, 108, 62, 108, PG.piedL);
  // la retorta de vidrio en la repisa y el crisol
  disco(66, 44, 5, K); disco(66, 44, 4, hex('#a8c8b8')); rect(62, 45, 70, 48, hex('#7a3a2a')); linea(62, 41, 50, 32, K); linea(62, 40, 50, 31, hex('#c8e0d8')); pset(64, 42, C.blanco);
  rect(20, 44, 30, 50, K); rect(21, 45, 29, 49, hex('#8a6a5a')); rect(21, 45, 29, 45, hex('#c8a090'));
  // el fuelle y la leña
  poligono([[78, 112], [92, 112], [98, 92], [86, 90]], K); poligono([[79, 111], [91, 111], [96, 93], [87, 91]], PG.roble);
  for (let k = 0; k < 4; k++) linea(80 + k * 3, 106 - k, 88 + k * 2, 94 + k, PG.robleS); poligono([[86, 90], [98, 92], [100, 88], [90, 86]], hex('#6a4a3a')); linea(98, 92, 104, 86, K);
  // el ventanuco enrejado con su derrame (lo de fuera, en cada fotograma)
  rect(108, 20, 150, 46, PG.piedD); poligono([[108, 20], [150, 20], [144, 26], [114, 26]], PG.piedL); poligono([[108, 46], [150, 46], [144, 40], [114, 40]], PG.piedS);
  rect(114, 26, 144, 40, PG_HUECO); for (let x = 117; x < 144; x += 5) rect(x, 26, x, 40, hex('#2a2a30')); rect(114, 33, 144, 33, hex('#2a2a30'));
  // las estanterías de tarros y frascos sobre escuadras de hierro
  for (const sx of [92, 176]) { rect(sx - 1, 48, sx + 2, 112, K); rect(sx, 48, sx + 1, 112, PG.robleS); }
  [64, 84, 104].forEach((yb, f) => { rect(90, yb + 1, 178, yb + 3, K); rect(91, yb + 1, 177, yb + 2, PG.roble); rect(91, yb + 1, 177, yb + 1, PG.robleL); linea(96, yb + 4, 100, yb + 8, hex('#3a3a40')); linea(170, yb + 4, 166, yb + 8, hex('#3a3a40'));
    let x = 97, i = 0; while (x < 172) { const tipo = Math.floor(h(i, f, 648) * 4), col = tipo === 1 ? PG_BARRO[Math.floor(h(i, f, 649) * 5)] : PG_LIQ[Math.floor(h(i, f, 649) * 7)];
      if (h(i, f, 650) < 0.15) { b_pgLibros(R, x, x + 10, yb, 9, f * 10 + i); x += 12; } else if (h(i, f, 650) > 0.88) { for (let s = 0; s < 3; s++) { disco(x + 2 + s * 3, yb - 2, 1.8, K); disco(x + 2 + s * 3, yb - 2, 1.2, hex('#e8dcc0')); } x += 11; } else { b_pgTarro(R, x + 4, yb, tipo, col); x += 10; } i++; } });
  // la viga de las hierbas (los manojos, en cada fotograma) y el soporte del alambique
  rect(180, 38, 272, 41, K); rect(180, 38, 272, 40, PG.roble); rect(180, 38, 272, 38, PG.robleL); for (const x of [184, 268]) linea(x, 38, x + (x < 200 ? -4 : 4), Math.round(ya(x + (x < 200 ? -4 : 4))) + 3, hex('#8a7a5a'));
  rect(196, 86, 234, 113, K); for (let f = 0, y = 87; y < 113; y += 4, f++) for (let x = 197 - (f % 2) * 4; x < 234; x += 8) rect(Math.max(197, x), y, Math.min(233, x + 6), y + 2, h(x, f, 651) < 0.3 ? PG.ladrS : PG.ladr);
  rect(205, 98, 225, 108, K); rect(194, 85, 236, 88, K); rect(195, 85, 235, 87, PG.piedL);
  // el taburete del recipiente
  rect(242, 100, 266, 103, K); rect(243, 100, 265, 102, PG.roble); rect(243, 100, 265, 100, PG.robleL); linea(246, 103, 243, 113, PG.robleS); linea(262, 103, 265, 113, PG.robleS); linea(254, 103, 254, 113, PG.roble);
  // la balda de la balanza y los utensilios colgados (tenazas, cazo)
  rect(276, 84, 314, 87, K); rect(277, 84, 313, 86, PG.roble); rect(277, 84, 313, 84, PG.robleL); linea(280, 87, 284, 92, hex('#3a3a40')); linea(310, 87, 306, 92, hex('#3a3a40'));
  rect(293, 66, 297, 84, K); rect(294, 67, 296, 83, PG.laton); rect(290, 82, 300, 84, PG.latonS);
  linea(284, 92, 284, 110, hex('#4a4a52')); linea(288, 92, 286, 110, hex('#4a4a52')); pset(286, 92, hex('#6a6a76'));
  linea(300, 92, 300, 104, hex('#6a6a76')); disco(300, 107, 3, K); disco(300, 107, 2, hex('#8a8a96')); pset(300, 92, K);
  // el suelo de losas irregulares con paja suelta
  b_pgSuelo(R, 113, 179, 30, (iu, iv, j, x, y, fu, fv) => { const des = (iv & 1) ? 0.5 : 0, u2 = fu + des, ju = j && fv > 0.3 ? (u2 % 1) < 0.08 : j; if (ju || (j && fv <= 0.3)) return PG.piedD; const n = h(iu * 2 + (iv & 1), iv, 652), m = h(x >> 1, y, 653);
    const c = n < 0.3 ? PG.piedS : n > 0.75 ? b_pgMez(PG.pied, hex('#8a7a6a'), 0.5) : b_pgMez(PG.pied, hex('#7a6a5a'), 0.3); return m < 0.07 ? PG.piedD : m > 0.95 ? PG.piedL : c; }, { fuga: 70, prof: 0.55 });
  rect(0, 113, 319, 113, PG.piedD);
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 654) * 319), y = 116 + Math.round(h(k, 2, 654) * 62), l = 2 + Math.round(h(k, 3, 654) * 3); linea(x, y, x + l, y + (k % 3) - 1, k % 2 ? PG.paja : PG.pajaS); }
  for (let k = 0; k < 5; k++) { const y = 108 + k * 3; rect(0, y, 12 + (k % 2) * 4, y + 2, K); rect(0, y, 11 + (k % 2) * 4, y + 1, PG.roble); disco(11 + (k % 2) * 4, y + 1, 1.4, PG.ocreL); pset(11 + (k % 2) * 4, y + 1, PG.robleS); }
  // el resplandor fijo del fuego en el suelo
  for (let y = 113; y < 140; y++) for (let x = 0; x < 100; x++) { const d = Math.hypot((x - 43) / 60, (y - 113) / 26); if (d < 1 && ((x + y) & 1) === 0) b_pgTi(R, x, y, 0.3 * (1 - d), hex('#ff9a40')); }
  b_pgHaz(R, 116, 42, 26, 150, 0.95, 0.2, hex('#fff2d0'));
}

// la calle vista por el ventanuco: el cielo, el empedrado y, de vez en cuando, los pies de alguien que pasa
function b_pgVistaCalle(R, t) {
  const cl = [114, 26, 144, 40], rc = (a, b, c, d, col) => b_pgRc(R, cl, a, b, c, d, col);
  for (let x = 114; x <= 144; x++) for (let y = 34; y <= 40; y++) R.pset(x, y, ((x >> 2) + (y >> 1)) % 2 ? hex('#8a8478') : hex('#a8a090'));
  rc(114, 33, 144, 33, hex('#6a6458'));
  const u = (t % 9) / 9, px = Math.round(104 + u * 60), paso = Math.floor(t * 6) % 2;
  if (u < 0.75) { rc(px, 28, px + 2, 34, hex('#4a3a5a')); rc(px + 4, 28, px + 6, 34, hex('#3a2e4a')); rc(px - 1 + paso, 35, px + 3 + paso, 36, hex('#2a1e14')); rc(px + 3 - paso, 35, px + 7 - paso, 36, hex('#2a1e14')); }
  const gx = Math.round(150 - ((t * 5) % 50)); rc(gx, 32, gx + 3, 33, hex('#8a8a96')); R.pset(gx, 31, hex('#8a8a96')); R.pset(gx - 1, 31, hex('#e8a030'));
}

// el fuego vivo en una boca (cx, yb base, w medio ancho, alto)
function b_pgFuego(R, cx, yb, w, alto, t, k = 0) {
  for (let i = -w; i <= w; i++) { const n = h(i, Math.floor(t * 10), 655 + k), hh = Math.round(alto * (1 - Math.abs(i) / (w + 1)) * (0.6 + n * 0.5));
    for (let j = 0; j < hh; j++) { const v = j / Math.max(1, hh); R.pset(cx + i, yb - j, v < 0.35 ? PG.fuegoL : v < 0.7 ? PG.fuego : PG.fuegoS); } }
  for (let i = -w; i <= w; i += 2) R.pset(cx + i, yb + 1, h(i, Math.floor(t * 4), 656 + k) < 0.5 ? PG.brasa : PG.fuegoS);
}

function b_pgAlquimista(R, t, o) {
  const fijo = b_pgCapa(R, 'alq', () => b_pgAlqFijo(R));
  R.copiar(fijo);
  b_pgHueco(R, fijo, 114, 26, 144, 40, () => { b_pgCielo(R, t, 114, 26, 144, 33, { nubes: 2, pajaros: 1 }); b_pgVistaCalle(R, t); }, 0);
  // el fuego del atanor y su luz que late en la boca
  b_pgFuego(R, 43, 106, 13, 14, t, 1); for (let k = 0; k < 6; k++) { const u = (t * 0.8 + k / 6) % 1; R.pset(Math.round(43 + Math.sin(t * 3 + k) * 6), Math.round(104 - u * 22), u < 0.5 ? PG.fuegoL : PG.fuego); }
  // el alambique: la brasa, el matraz con su líquido que burbujea, la cabeza, el pico y la gota que cae al recipiente
  b_pgFuego(R, 215, 107, 9, 8, t, 2);
  R.disco(215, 74, 10, C.k); R.disco(215, 74, 9, hex('#b8d8d0')); for (let j = 0; j <= 9; j++) { const w = Math.round(Math.sqrt(81 - j * j)); R.rect(215 - w, 74 + j, 215 + w, 74 + j, hex('#c88a30')); } R.rect(207, 74, 223, 74, hex('#e8b050'));
  for (let k = 0; k < 4; k++) { const u = (t * 1.4 + k * 0.27) % 1; R.pset(Math.round(211 + k * 3 + Math.sin(t * 5 + k)), Math.round(82 - u * 8), hex('#f8e0a0')); }
  R.pset(209, 69, C.blanco); R.pset(210, 68, C.blanco); R.rect(212, 60, 218, 65, C.k); R.rect(213, 61, 217, 64, hex('#b8d8d0'));
  R.disco(215, 58, 5, C.k); R.disco(215, 58, 4, hex('#c8a060')); R.pset(213, 56, hex('#f0d090'));
  R.linea(219, 59, 248, 86, C.k); R.linea(219, 58, 248, 85, hex('#c8a060'));
  R.disco(254, 93, 7, C.k); R.disco(254, 93, 6, hex('#b8d8d0')); for (let j = 1; j <= 6; j++) { const w = Math.round(Math.sqrt(36 - j * j)); R.rect(254 - w, 93 + j, 254 + w, 93 + j, hex('#d8a030')); } R.rect(252, 84, 256, 87, C.k); R.rect(253, 84, 255, 87, hex('#b8d8d0')); R.pset(250, 90, C.blanco);
  { const u = (t % 1.6) / 1.6; if (u < 0.55) R.pset(248, 87, hex('#f0c060')); else { const yy = Math.round(87 + (u - 0.55) / 0.45 * 7); R.pset(250, yy, hex('#f0c060')); } }
  // los manojos de hierbas que cuelgan de la viga y se mecen
  for (let k = 0; k < 9; k++) { const x = 188 + k * 10, m = Math.sin(t * 1.2 + k * 0.8) * 1.2, L = 10 + Math.round(h(k, 1, 657) * 6), col = [hex('#6a8a3a'), hex('#8a9a4a'), hex('#a88a4a'), hex('#5a7a4a')][k % 4];
    R.linea(x, 41, Math.round(x + m * 0.5), 44, hex('#8a7a5a')); for (let s = -2; s <= 2; s++) R.linea(Math.round(x + m * 0.5), 44, Math.round(x + s * 2 + m), 44 + L - Math.abs(s), s % 2 ? col : b_pgMez(col, C.k, 0.25)); R.rect(x - 1, 44, x + 1, 45, hex('#c84a3a')); if (k % 3 === 1) R.pset(Math.round(x + m), 44 + L, hex('#c8a0e0')); }
  // la balanza, que se mece
  { const a = Math.sin(t * 0.9) * 0.12, dx = Math.cos(a) * 12, dy = Math.sin(a) * 12; R.linea(Math.round(295 - dx), Math.round(66 - dy), Math.round(295 + dx), Math.round(66 + dy), PG.latonS);
    for (const s of [-1, 1]) { const px = Math.round(295 + s * dx), py = Math.round(66 + s * dy); R.linea(px, py, px - 3, py + 8, hex('#8a7a5a')); R.linea(px, py, px + 3, py + 8, hex('#8a7a5a')); R.rect(px - 4, py + 8, px + 4, py + 9, PG.laton); } R.pset(295, 64, PG.latonL); }
  // el gato dormido junto al fuego: respira y mueve la punta de la cola
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, x = 64, y = 124; R.disco(x, y - 3 - r * 0.3, 6 + r * 0.3, C.k); R.disco(x, y - 3, 5 + r * 0.3, hex('#d88a3a')); R.disco(x + 5, y - 4, 3.4, C.k); R.disco(x + 5, y - 4, 2.6, hex('#d88a3a'));
    R.pset(x + 4, y - 8, hex('#d88a3a')); R.pset(x + 7, y - 8, hex('#d88a3a')); R.pset(x + 4, y - 4, C.k); R.pset(x + 6, y - 4, C.k); for (let i = -4; i < 4; i += 3) R.pset(x + i, y - 6, hex('#a85a2a'));
    const c = Math.round(Math.sin(t * 1.5) * 2); R.linea(x - 5, y, x - 9, y - 1 + c, hex('#d88a3a')); R.pset(x - 9, y - 1 + c, hex('#f0c080')); R.rect(x - 6, y + 1, x + 7, y + 1, b_pgMez(PG.pied, C.k, 0.4)); }
  // el resplandor del fuego que tiembla en la pared del horno
  const lz = 0.12 + h(Math.floor(t * 8), 5, 658) * 0.08; for (let y = 60; y < 78; y++) for (let x = 26; x < 62; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, lz * (1 - Math.abs(x - 43) / 20), hex('#ffb060'));
  b_pgPolvo(R, t, 116, 44, 24, 150, 0.95, 14, 4);
  return { suelo: 150, detras: 130, mesa: { x0: 132, x1: 266, y: 126, libre: [176, 226] }, ventana: [114, 26, 144, 40], fuego: [43, 96] };
}

// la mesa de trabajo del alquimista, por delante de los personajes
function b_pgAlqDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = C.k;
  b_pgSombraElipse(R, 200, 175, 72, 4, 0.6);
  for (const lx of [138, 260]) { rect(lx - 4, 136, lx + 4, 176, K); rect(lx - 3, 136, lx + 3, 175, PG.roble); rect(lx - 3, 136, lx - 2, 175, PG.robleL); rect(lx + 2, 136, lx + 3, 175, PG.robleS); }
  rect(142, 160, 256, 164, K); rect(142, 161, 256, 163, PG.robleS); rect(142, 161, 256, 161, PG.roble);
  // bajo la mesa: un cesto de mimbre y un cántaro
  rect(160, 150, 182, 166, K); for (let y = 151; y < 166; y++) for (let x = 161; x < 182; x++) pset(x, y, ((x + (y >> 1)) % 3) ? hex('#b88a4a') : hex('#8a6a3a')); rect(160, 150, 182, 151, hex('#d8a860'));
  disco(234, 158, 7, K); disco(234, 158, 6, hex('#a8603a')); rect(231, 148, 237, 152, K); rect(232, 148, 236, 152, hex('#a8603a')); pset(231, 155, hex('#d8885a'));
  rect(130, 124, 268, 137, K); rect(131, 125, 267, 136, PG.roble); rect(131, 125, 267, 127, PG.robleL); rect(131, 128, 267, 128, PG.robleS);
  for (let k = 0; k < 14; k++) { const x = 134 + Math.round(h(k, 1, 659) * 128), y = 130 + Math.round(h(k, 2, 659) * 5); linea(x, y, x + 3 + Math.round(h(k, 3, 659) * 8), y, k % 3 ? PG.robleS : PG.robleD); }
  for (let k = 0; k < 4; k++) { const x = 140 + k * 34; pset(x, 126, PG.robleD); pset(x + 1, 126, PG.robleD); }
  // encima: el libro abierto, papeles, frascos, el mortero y la vela
  rect(136, 119, 170, 124, K); rect(137, 119, 152, 123, C.pergamino); rect(154, 119, 169, 123, C.pergamino); rect(153, 119, 153, 124, C.pergaminoS);
  b_pgSignos(R, 156, 122, 12, 3, C.tinta); b_pgSignos(R, 139, 122, 12, 4, C.tinta); disco(144, 120, 1.4, hex('#5aa85a'));
  rect(176, 121, 192, 124, hex('#e8dcc0')); rect(176, 124, 192, 124, hex('#b8a888'));
  b_pgTarro(R, 230, 124, 0, PG_LIQ[0]); b_pgTarro(R, 222, 124, 2, PG_LIQ[2]); if (Math.floor(t * 3) % 2) pset(230, 116, C.blanco); { const u = (t * 1.1) % 1; pset(229 + (Math.floor(t * 3) % 3), Math.round(122 - u * 5), hex('#d8f0c0')); }
  b_pgTarro(R, 246, 124, 3, 0);
  b_pgVela(R, 260, 125, t, 6, { alto: 7 });
  return { tablero: 125 };
}

// el fondo fijo de la copia: la pared de sillares con la estantería de tarros, el pergamino de la planta, la ristra de
// ajos, la hornacina del candil, la balda de la derecha y la mesa entera con todo lo que no se mueve
function b_pgCopiaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  b_pgSillares(R, 0, 0, 319, 113, 30, 14, 2);
  for (let y = 0; y < 30; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, (30 - y) / 30 * 0.5, PG.hollin);
  // humedad y salitre en las juntas de abajo, y una grieta con musgo
  for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 1, 690) * 319), y = 84 + Math.round(h(k, 2, 690) * 24); if (x > 4 && x < 121) continue; pset(x, y, k % 3 ? hex('#8a8a88') : hex('#a8a49a')); if (k % 4 === 0) pset(x + 1, y, hex('#5a6a4a')); }
  { let x = 128, y = 40; for (let s = 0; s < 22; s++) { pset(x, y, PG.piedD); if (s % 5 === 2) pset(x + 1, y, hex('#4a5a3a')); x += h(s, 1, 691) < 0.5 ? 1 : 0; y++; } }
  // la estantería grande de tarros a la izquierda
  rect(4, 22, 120, 113, K); rect(5, 23, 119, 113, PG.robleD);
  [56, 92].forEach((yb, f) => { rect(4, yb + 1, 120, yb + 4, K); rect(5, yb + 1, 119, yb + 3, PG.roble); rect(5, yb + 1, 119, yb + 1, PG.robleL);
    let x = 12, i = 0; while (x < 112) { const tipo = Math.floor(h(i, f, 660) * 3), col = tipo === 1 ? PG_BARRO[Math.floor(h(i, f, 661) * 5)] : PG_LIQ[Math.floor(h(i, f, 661) * 7)]; if (h(i, f, 662) < 0.18) { b_pgLibros(R, x - 3, x + 14, yb, 22, 20 + f * 5 + i); x += 20; } else { b_pgTarro(R, x + 4, yb, tipo, col, 2); x += 18; } i++; } });
  rect(5, 96, 119, 113, PG.roble); b_pgCuart(R, 8, 98, 60, 112, PG.roble, PG.robleL, PG.robleS, PG.robleD, 3); b_pgCuart(R, 64, 98, 116, 112, PG.roble, PG.robleL, PG.robleS, PG.robleD, 4);
  for (const x of [34, 90]) { rect(x - 2, 103, x + 2, 104, K); rect(x - 1, 103, x + 1, 103, PG.latonL); }
  // telarañas en las esquinas de arriba de la estantería
  for (let k = 0; k < 5; k++) { linea(5, 23 + k * 3, 5 + k * 3, 23, hex('#b8b4ac')); } linea(5, 23, 18, 36, hex('#9a968e'));
  // un pergamino clavado en la pared con un dibujo de planta y garabatos, y una ristra de ajos
  rect(150, 22, 196, 70, K); rect(151, 23, 195, 69, hex('#e8d8b0')); for (let y = 23; y < 70; y++) for (let x = 151; x < 196; x++) if (h(x, y, 663) < 0.07) pset(x, y, hex('#d0bc94'));
  rect(151, 66, 195, 69, hex('#d8c49c')); poligono([[188, 69], [195, 62], [195, 69]], hex('#c8b48a')); linea(188, 69, 195, 62, hex('#a8946a'));
  linea(166, 64, 166, 34, hex('#4a6a3a')); for (let k = 0; k < 5; k++) { const y = 38 + k * 5, s = k % 2 ? 1 : -1; linea(166, y, 166 + s * 8, y - 3, hex('#5a8a4a')); pset(166 + s * 8, y - 4, hex('#5a8a4a')); } disco(166, 32, 3, hex('#6a8ac8')); disco(166, 66, 3, hex('#8a6a4a'));
  for (let k = 0; k < 5; k++) b_pgGarabato(R, 176, 30 + k * 7, 16, 70 + k, C.tinta, 0.6); for (const [x, y] of [[152, 22], [194, 22]]) { pset(x, y, PG.piedD); pset(x, y + 1, hex('#5a5a62')); }
  linea(214, 0, 214, 40, hex('#8a7a5a')); for (let k = 0; k < 6; k++) { const y = 8 + k * 6, s = k % 2 ? 3 : -3; disco(214 + s, y, 2.6, K); disco(214 + s, y, 2, hex('#f0ead8')); pset(214 + s - 1, y - 1, C.blanco); }
  // la hornacina de arco con el candil de barro (la llama y el humo los pinta b_pgCopia) y el hollín que deja encima
  for (let y = 48; y < 82; y++) for (let x = 226; x <= 256; x++) { const d = y < 60 ? Math.hypot(x - 241, y - 60) : Math.abs(x - 241); if (d > 15) continue; const borde = d > 13.5;
    pset(x, y, borde ? hex('#9a948e') : b_pgMez(hex('#2e2a30'), hex('#4a4248'), Math.max(0, (y - 52) / 40) + ((x + y) & 1) * 0.08)); }
  for (let y = 30; y < 47; y++) for (let x = 232; x <= 250; x++) if (((x + y) & 1) === 0 && Math.abs(x - 241) < (47 - y) * 0.6) b_pgTi(R, x, y, (y - 30) / 17 * 0.5, PG.hollin);
  rect(225, 82, 257, 84, K); rect(226, 82, 256, 83, hex('#a8a29a')); rect(226, 82, 256, 82, hex('#c8c2b8'));
  disco(241, 77, 5, K); disco(241, 77, 4, hex('#a8603a')); rect(236, 76, 246, 77, hex('#c8784a')); rect(245, 74, 249, 76, K); rect(246, 74, 248, 75, hex('#a8603a')); pset(239, 75, hex('#d8946a'));
  linea(234, 79, 232, 74, hex('#7a4a2a')); pset(232, 73, hex('#7a4a2a'));
  // la balda de la derecha con sus escuadras: el reloj de arena (la arena cae en b_pgCopia), libros, un mortero y una caracola
  rect(196, 96, 276, 99, K); rect(197, 96, 275, 98, PG.roble); rect(197, 96, 275, 96, PG.robleL); rect(197, 98, 275, 98, PG.robleS);
  for (const x of [204, 266]) { linea(x, 100, x, 108, K); linea(x, 100, x + 6, 100, K); linea(x + 1, 101, x + 5, 101, hex('#5a5a62')); linea(x, 108, x + 6, 100, hex('#3a3a42')); }
  rect(205, 82, 217, 83, K); rect(206, 82, 216, 82, PG.roble); rect(205, 94, 217, 95, K); rect(206, 94, 216, 94, PG.roble); linea(206, 84, 206, 93, PG.robleS); linea(216, 84, 216, 93, PG.robleS);
  poligono([[208, 84], [214, 84], [212, 89], [214, 93], [208, 93], [210, 89]], hex('#c8dce0')); pset(209, 85, C.blanco);
  b_pgLibros(R, 222, 250, 96, 16, 9);
  disco(259, 92, 4, K); disco(259, 92, 3, hex('#9a948a')); rect(255, 88, 263, 89, K); rect(256, 88, 262, 88, hex('#b8b2a8')); linea(260, 88, 266, 82, hex('#7a5a3a')); pset(258, 91, hex('#c8c2b8'));
  disco(270, 93, 3, K); disco(270, 93, 2.2, hex('#e8c8b0')); pset(269, 92, C.blanco); pset(272, 94, hex('#c89878'));
  // la escarpia de la derecha con la bolsa de cuero colgada (se mece en b_pgCopia) y una llave grande de hierro
  rect(294, 52, 298, 54, K); rect(295, 52, 297, 53, hex('#5a5a62')); pset(296, 51, hex('#8a8a96'));
  disco(306, 84, 3, K); disco(306, 84, 2, hex('#6a6a76')); linea(306, 87, 306, 100, K); linea(307, 87, 307, 100, hex('#6a6a76')); rect(304, 96, 309, 97, K); rect(304, 99, 307, 100, K);
  // la mesa: el canto de atrás, el tablero de tablas con vetas, la luz caliente de la izquierda y la penumbra de la derecha
  rect(0, 114, 319, 114, K); rect(0, 115, 319, 115, PG.robleL);
  b_pgTablas(R, 0, 116, 319, 179, [PG.roble, PG.robleL, PG.robleS, PG.robleD], 9, 13);
  for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) { const a = x < 110 ? (110 - x) / 110 * 0.18 : x > 260 ? (x - 260) / 60 * 0.3 : 0; if (a > 0.02) b_pgTi(R, x, y, a, x < 110 ? hex('#ffc070') : PG.robleD); }
  for (let y = 116; y < 120; y++) for (let x = 0; x < 320; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, (120 - y) * 0.08, K);
  for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 665) * 319), y = 118 + Math.round(h(k, 2, 665) * 58); linea(x, y, x + 2 + Math.round(h(k, 3, 665) * 6), y + (k % 3) - 1, PG.robleD); }
  // marcas de cuchillo, migas, gotas de tinta y el cerco de una jarra
  for (let k = 0; k < 8; k++) { const x = 170 + Math.round(h(k, 1, 692) * 140), y = 120 + Math.round(h(k, 2, 692) * 6); linea(x, y, x + 4, y + 1, PG.robleD); pset(x + 1, y - 1, PG.robleL); }
  for (let k = 0; k < 22; k++) { const x = Math.round(h(k, 1, 693) * 319), y = 118 + Math.round(h(k, 2, 693) * 60); pset(x, y, k % 3 ? hex('#d8b878') : C.tinta); }
  disco(288, 160, 9, b_pgMez(PG.roble, hex('#3a1e10'), 0.5)); disco(288, 160, 7, PG.roble); for (let k = 0; k < 6; k++) pset(281 + k * 3, 152 + (k % 2), PG.robleS);
  disco(168, 172, 3, C.tinta); disco(171, 170, 1.5, C.tinta); pset(173, 168, C.tinta);
  // el libro abierto: dos páginas de pergamino con la planta pintada y renglones de signos
  b_pgSombraElipse(R, 120, 170, 46, 4, 0.6);
  poligono([[80, 126], [160, 126], [164, 170], [76, 170]], hex('#8a7448'));
  poligono([[82, 124], [119, 125], [120, 167], [79, 167]], C.pergamino); poligono([[121, 125], [158, 124], [161, 167], [122, 167]], C.pergamino);
  for (let y = 124; y < 168; y++) for (let x = 79; x < 162; x++) { const c = R.pget(x, y); if (c === C.pergamino) { if (Math.abs(x - 120) < 4) pset(x, y, b_pgMez(c, hex('#6a5030'), 0.35)); else if (h(x, y, 666) < 0.06) pset(x, y, C.pergaminoS); } }
  linea(100, 162, 100, 136, hex('#4a6a3a')); for (let k = 0; k < 4; k++) { const y = 140 + k * 5, s = k % 2 ? 1 : -1; poligono([[100, y], [100 + s * 10, y - 4], [100 + s * 12, y], [100 + s * 4, y + 2]], hex('#6a9a4a')); linea(100, y, 100 + s * 10, y - 2, hex('#4a6a3a')); }
  disco(100, 133, 4, hex('#5a7ac8')); disco(100, 133, 2, hex('#8aa8e0')); disco(97, 163, 3, hex('#8a6a4a')); disco(103, 164, 3, hex('#8a6a4a'));
  for (let l = 0; l < 6; l++) b_pgSignos(R, 126, 134 + l * 5, 32, 30 + l, C.tinta);
  rect(118, 167, 122, 175, hex('#a83a2a')); pset(120, 175, hex('#7a2418'));
  // al fondo de la mesa: dos libros cerrados apilados, la caja de plumas y la salvadera con su arenilla
  rect(4, 116, 44, 125, K); rect(5, 117, 43, 120, hex('#6a2a2a')); rect(5, 117, 43, 117, hex('#8a3a34')); rect(7, 121, 41, 124, hex('#4a3020')); rect(7, 121, 41, 121, hex('#6a4a30')); for (const x of [14, 34]) { rect(x, 117, x, 120, hex('#c8a048')); rect(x, 121, x, 124, hex('#c8a048')); }
  rect(260, 117, 298, 125, K); rect(261, 118, 297, 124, PG.nogal); rect(261, 118, 297, 118, PG.nogalL); rect(263, 120, 295, 122, PG.nogalD);
  for (let k = 0; k < 4; k++) { linea(266 + k * 7, 121, 274 + k * 7, 114 - (k % 2) * 2, hex('#e8e4da')); pset(275 + k * 7, 113 - (k % 2) * 2, hex('#c8c4ba')); }
  disco(306, 124, 5, K); disco(306, 124, 4, PG.laton); rect(302, 120, 310, 121, PG.latonS); pset(304, 122, PG.latonL); for (let k = 0; k < 5; k++) pset(304 + k, 120 + (k & 1), hex('#e8d8a0'));
  // el lacre en barra y el sello de latón, junto al tintero
  rect(244, 168, 262, 170, K); rect(245, 168, 261, 169, C.lacre); rect(245, 168, 261, 168, hex('#e05a50')); rect(258, 168, 261, 170, hex('#1a1a1a'));
  rect(268, 164, 272, 172, K); rect(269, 164, 271, 171, PG.nogal); disco(270, 173, 3.4, K); disco(270, 173, 2.6, PG.laton); pset(269, 172, PG.latonL);
  // el tintero, la pluma de repuesto, un frasquito y el rollo atado
  disco(250, 150, 7, K); disco(250, 150, 6, hex('#3a3a46')); disco(250, 149, 3, K); pset(247, 146, C.blanco); linea(252, 147, 266, 122, hex('#e8e4da')); linea(253, 147, 267, 123, hex('#c8c4ba'));
  b_pgTarro(R, 290, 140, 0, PG_LIQ[3], 2);
  rect(20, 158, 60, 166, K); rect(21, 159, 59, 165, hex('#e8d8b0')); rect(21, 159, 59, 159, C.blanco); rect(38, 158, 41, 166, hex('#a83a2a')); disco(60, 162, 4, K); disco(60, 162, 3, hex('#d8c8a0'));
  // la cera que ha chorreado alrededor de la vela
  for (const [x, y, r] of [[48, 141, 2], [61, 142, 1.6], [52, 144, 1.2], [58, 139, 1]]) { disco(x, y, r + 0.6, PG.velaS); disco(x, y, r, PG.vela); }
}
function b_pgCopia(R, t, o) {
  const K = C.k, fijo = b_pgCapa(R, 'copia', () => b_pgCopiaFijo(R));
  R.copiar(fijo);
  // la luz del horno, fuera de cuadro a la izquierda, que tiembla en la pared y la estantería
  const lz = 0.18 + h(Math.floor(t * 7), 1, 664) * 0.1; for (let y = 0; y < 114; y++) for (let x = 0; x < 60; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, lz * (1 - x / 60), hex('#ff9a40'));
  // los manojos de hierbas grandes que cuelgan arriba a la derecha y se mecen
  for (let k = 0; k < 4; k++) { const x = 232 + k * 12, m = Math.sin(t * 1.1 + k) * 1.5, L = 18 + (k % 2) * 6, col = [hex('#6a8a3a'), hex('#a88a4a'), hex('#5a7a4a'), hex('#8a9a4a')][k];
    R.linea(x, 0, x, 6, hex('#8a7a5a')); for (let s = -3; s <= 3; s++) R.linea(x, 6, Math.round(x + s * 2 + m), 6 + L - Math.abs(s) * 2, s % 2 ? col : b_pgMez(col, C.k, 0.25)); R.rect(x - 2, 6, x + 2, 8, hex('#c84a3a')); }
  // el candil de la hornacina: la llama que tiembla, su luz en el arco y el hilo de humo que sube y se riza
  { const fl = h(Math.floor(t * 9), 3, 694), dx = fl < 0.25 ? -1 : fl > 0.8 ? 1 : 0;
    for (let j = -11; j <= 11; j++) for (let i = -11; i <= 11; i++) { const d = Math.hypot(i, j) / 11; if (d < 1 && ((i + j) & 1) === 0) b_pgTi(R, 249 + i, 70 + j, (1 - d) * (0.3 + fl * 0.1), hex('#ffc070')); }
    R.pset(249, 73, PG.fuegoS); R.pset(249 + dx, 72, PG.fuego); R.pset(249 + dx, 71, PG.fuegoL); R.pset(248 + dx, 72, PG.fuego); R.pset(250 + dx, 72, PG.fuegoS); if (fl > 0.4) R.pset(249 + dx, 70, PG.fuegoL);
    for (let k = 0; k < 7; k++) { const v = (t * 0.35 + k / 7) % 1, y = Math.round(68 - v * 22), x = Math.round(249 + Math.sin(t * 1.8 + v * 7) * v * 4); if (y > 49) R.pset(x, y, b_pgMez(hex('#8a8690'), hex('#3a3640'), v)); } }
  // el reloj de arena de la balda: la arena cae y se amontona
  { const u = (t * 0.12) % 1; for (let j = 0; j < 4; j++) R.linea(Math.round(209 + j * 0.5), 85 + j, Math.round(213 - j * 0.5), 85 + j, j < Math.round((1 - u) * 4) ? hex('#d8b060') : hex('#c8dce0'));
    R.pset(211, 89 + (Math.floor(t * 8) % 2), hex('#e8c070')); R.pset(211, 90, hex('#e8c070')); const a = Math.round(u * 3); for (let j = 0; j < a; j++) R.linea(209 + j, 93 - j, 213 - j, 93 - j, hex('#d8b060')); }
  // la bolsa de cuero colgada de la escarpia, que se mece un poco con la corriente
  { const m = Math.sin(t * 0.9) * 1.5, bx = Math.round(296 + m), by = 66; R.linea(296, 54, bx, by - 6, hex('#5a3a1a')); R.disco(bx, by, 6, K); R.disco(bx, by, 5, hex('#8a5a2e')); R.disco(bx - 1, by - 1, 3, hex('#a8743e')); R.rect(bx - 3, by - 6, bx + 3, by - 5, hex('#6a4220')); R.pset(bx - 2, by - 2, hex('#c8945a')); R.pset(bx + 3, by + 3, hex('#5a3a1a')); }
  // una araña que baja y sube por su hilo junto al pergamino
  { const v = (Math.sin(t * 0.5) + 1) / 2, y = Math.round(44 + v * 18); R.linea(204, 30, 204, y - 1, hex('#c8c4bc')); R.disco(204, y, 1.4, hex('#24202a')); for (const s of [-1, 1]) { R.pset(204 + s * 2, y - 1 + (Math.floor(t * 5) % 2), hex('#24202a')); R.pset(204 + s * 2, y + 1, hex('#24202a')); } }
  b_pgPolvo(R, t, 120, 10, 160, 106, 0.2, 14, 6);
  b_pgCopiaMesa(R, t, o, true);
  return { suelo: 120, mesa: PG_CMESA, libre: [130, 190] };
}
// la mesa de la copia por delante de Baresch: vuelve a pintar el tablero desde PG_CMESA hacia abajo (le tapa las piernas
// y deja a la vista la cabeza, los hombros y las manos) con el libro, la hoja que se va llenando, el tintero y la vela
function b_pgCopiaDelante(R, t, o) {
  const fijo = b_pgCapa(R, 'copia', () => b_pgCopiaFijo(R));
  { const B = R.buf; for (let i = PG_CMESA * 320; i < 180 * 320; i++) B[i] = fijo[i]; }
  b_pgCopiaMesa(R, t, o, false);
  return { hoja: [176, 128, 236, 168], libro: [80, 124, 162, 168], tintero: [250, 150] };
}
// una caja de madera de embalaje vista de frente (x0, y0)–(x1, y1): tablas con vetas, listones, clavos y una marca de
// tiza en rayas (sin letras); abierta: libros y paja asoman por arriba
function b_pgCajon(R, x0, y0, x1, y1, k = 0, abierta = true) {
  const { rect, pset, linea } = R, K = C.k;
  if (abierta) { b_pgLibros(R, x0 + 3, x1 - 3, y0 + 2, 10, 70 + k); for (let i = 0; i < (x1 - x0) * 0.7; i++) { const x = x0 + 2 + Math.round(h(i, k, 670) * (x1 - x0 - 4)), y = y0 - Math.round(h(i, k, 671) * 5); linea(x, y0 + 2, x + Math.round(h(i, k, 672) * 6) - 3, y, i % 2 ? PG.paja : PG.pajaS); } }
  rect(x0, y0, x1, y1, K); b_pgTablas(R, x0 + 1, y0 + 1, x1 - 1, y1, [hex('#c89a62'), hex('#dcb47a'), hex('#a87a4a'), hex('#7a5232')], k, 7);
  for (const x of [x0 + 1, x1 - 4]) { rect(x, y0 + 1, x + 3, y1, hex('#a87a4a')); rect(x, y0 + 1, x, y1, hex('#dcb47a')); }
  for (const y of [y0 + 3, y1 - 3]) for (const x of [x0 + 2, x1 - 3]) pset(x, y, hex('#3a3a40'));
  const mx = (x0 + x1) >> 1, my = (y0 + y1) >> 1; for (let i = 0; i < 3; i++) linea(mx - 8 + i * 6, my - 3, mx - 5 + i * 6, my + 3, hex('#e8e4da')); linea(mx - 9, my + 5, mx + 9, my + 5, hex('#e8e4da'));
}

function b_pgVillaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  // el artesonado dorado y desvaído, con su cornisa de dentículos
  rect(0, 0, 319, 16, hex('#a89070'));
  for (let x = -4; x < 320; x += 20) for (let y = -4; y < 14; y += 12) { rect(x, y, x + 17, y + 9, hex('#8a7458')); rect(x + 2, y + 2, x + 15, y + 9, hex('#b8a080')); rect(x + 2, y + 2, x + 15, y + 2, hex('#7a6448')); pset(x + 9, y + 6, hex('#c8a860')); }
  rect(0, 14, 319, 20, hex('#d8ccb4')); rect(0, 14, 319, 14, hex('#e8dec8')); for (let x = 0; x < 320; x += 4) rect(x, 17, x + 1, 19, hex('#a89a80')); rect(0, 20, 319, 20, hex('#8a7a62'));
  // las paredes: frescos de paisaje desvaídos entre pilastras de falso mármol, con desconchones y grietas
  rect(0, 21, 319, 96, PG.fresco);
  for (let y = 21; y < 97; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 673); if (n < 0.1) pset(x, y, PG.frescoS); else if (n > 0.93) pset(x, y, PG.frescoL); }
  const panel = (x0, x1, k) => { rect(x0, 26, x1, 90, hex('#8a5a42')); rect(x0 + 1, 27, x1 - 1, 89, hex('#c8bc9e'));
    for (let y = 27; y < 60; y++) for (let x = x0 + 1; x < x1; x++) pset(x, y, ((x + y) & 1) && y > 40 ? hex('#e0cfa8') : b_pgMez(PG.frescoA, PG.fresco, 0.35 + (y - 27) / 70));
    poligono([[x0 + 1, 66], [x0 + (x1 - x0) * 0.3, 54], [x0 + (x1 - x0) * 0.6, 60], [x1, 52], [x1, 89], [x0 + 1, 89]], PG.frescoV);
    poligono([[x0 + 1, 74], [x0 + (x1 - x0) * 0.5, 68], [x1, 76], [x1, 89], [x0 + 1, 89]], b_pgMez(PG.frescoV, PG.fresco, 0.4));
    for (let i = 0; i < 3; i++) { const tx = x0 + 8 + Math.round(h(i, k, 674) * (x1 - x0 - 16)); rect(tx, 58, tx, 70, hex('#8a7a5a')); disco(tx, 56, 4 + i % 2, b_pgMez(PG.cipres, PG.fresco, 0.45)); }
    if (k % 2) { const cx = x0 + (x1 - x0) * 0.7; rect(cx - 4, 50, cx + 4, 74, PG.frescoL); rect(cx - 5, 48, cx + 5, 50, PG.frescoS); rect(cx + 3, 50, cx + 4, 74, PG.frescoS); }
    for (let i = 0; i < 4; i++) { const cx = x0 + 6 + Math.round(h(i, k, 675) * (x1 - x0 - 12)), cy = 32 + Math.round(h(i, k, 676) * 50), r = 2 + h(i, k, 677) * 5; for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) if (ii * ii + j * j * 1.4 < r * r && h(cx + ii, cy + j, 678) < 0.85) pset(cx + ii, cy + j, PG.frescoL); }
    let gx = x0 + 4 + Math.round(h(k, 1, 679) * (x1 - x0 - 8)), gy = 27; while (gy < 89) { const nx = gx + Math.round(h(gy, k, 680) * 4) - 2, ny = gy + 3; linea(gx, gy, nx, ny, PG.frescoS); gx = Math.max(x0 + 2, Math.min(x1 - 2, nx)); gy = ny; }
    // el marco pintado: filete rojo almagre, cenefa ocre con perlas y una guirnalda de hojas colgando arriba
    for (let i = 0; i < 3; i++) { const c = [hex('#9a4a36'), hex('#d8b878'), hex('#9a4a36')][i]; rect(x0 + 1 + i, 27 + i, x1 - 1 - i, 27 + i, c); rect(x0 + 1 + i, 89 - i, x1 - 1 - i, 89 - i, c); rect(x0 + 1 + i, 27 + i, x0 + 1 + i, 89 - i, c); rect(x1 - 1 - i, 27 + i, x1 - 1 - i, 89 - i, c); }
    for (let x = x0 + 4; x < x1 - 3; x += 3) { pset(x, 28, hex('#f0e0b0')); pset(x, 88, hex('#f0e0b0')); }
    for (let x = x0 + 5; x < x1 - 4; x++) { const y = 31 + Math.round(Math.abs(Math.sin((x - x0) * Math.PI / ((x1 - x0) / 2))) * 4); pset(x, y, b_pgMez(hex('#5a7a3a'), PG.fresco, 0.3)); if (x % 3 === 0) pset(x, y + 1, b_pgMez(hex('#7a9a4a'), PG.fresco, 0.3)); if (x % 7 === 0) pset(x, y + 2, b_pgMez(hex('#c86a5a'), PG.fresco, 0.3)); }
    for (let y = 27; y < 90; y++) for (let x = x0 + 1; x < x1; x++) if (h(x >> 1, y >> 1, 699) < 0.1) b_pgTi(R, x, y, 0.3, PG.frescoS); };
  panel(8, 62, 1); panel(76, 130, 2); panel(144, 198, 3);
  for (const px of [0, 66, 134, 202]) { rect(px, 21, px + 7, 96, hex('#b8a890')); for (let y = 21; y < 97; y++) for (let x = px; x < px + 8; x++) if (h(x, y >> 1, 681) < 0.15) pset(x, y, hex('#9a8a70')); rect(px, 21, px, 96, hex('#d8ccb4')); rect(px + 7, 21, px + 7, 96, hex('#8a7a62')); rect(px - 1, 21, px + 8, 24, hex('#d8ccb4')); }
  // el arrimadero de falso mármol
  rect(0, 96, 319, 114, hex('#a89880')); rect(0, 96, 319, 97, hex('#d8ccb4')); for (let x = 2; x < 320; x += 30) { rect(x, 100, x + 26, 110, hex('#8a6a5a')); rect(x + 1, 101, x + 25, 109, hex('#b88a72')); for (let k = 0; k < 3; k++) linea(x + 2 + k * 8, 102, x + 8 + k * 7, 108, hex('#d8a890')); }
  rect(0, 112, 319, 114, hex('#6a5a4a'));
  // el ventanal con sus postigos abiertos, el marco y el parteluz (lo de fuera, en cada fotograma)
  for (const [x0, x1] of [[204, 214], [270, 280]]) { rect(x0, 24, x1, 112, K); rect(x0 + 1, 25, x1 - 1, 111, hex('#6a7a5a')); for (let y = 28; y < 110; y += 4) rect(x0 + 2, y, x1 - 2, y + 1, hex('#56664a')); rect(x0 + 1, 25, x0 + 1, 111, hex('#8a9a72')); }
  rect(212, 22, 272, 112, hex('#e0d4bc')); rect(212, 22, 272, 23, C.blanco); rect(216, 26, 268, 106, PG_HUECO);
  rect(241, 26, 243, 106, hex('#e8e0cc')); rect(243, 26, 243, 106, hex('#a89a80')); for (const y of [50, 76]) { rect(216, y, 268, y + 1, hex('#e8e0cc')); rect(216, y + 1, 268, y + 1, hex('#a89a80')); }
  rect(208, 106, 276, 112, K); rect(209, 106, 275, 110, hex('#e8e0cc')); rect(209, 106, 275, 106, C.blanco);
  // los muebles tapados con sábanas y las cajas de libros del fondo
  poligono([[146, 112], [196, 112], [194, 84], [184, 76], [160, 78], [148, 86]], K); poligono([[147, 111], [195, 111], [193, 85], [183, 77], [161, 79], [149, 87]], hex('#e8e4da'));
  for (let k = 0; k < 6; k++) linea(152 + k * 7, 110, 158 + k * 5, 84, hex('#c8c4ba')); linea(160, 79, 184, 77, C.blanco);
  b_pgCajon(R, 8, 88, 44, 113, 1, true); b_pgCajon(R, 46, 92, 84, 113, 2, false); b_pgCajon(R, 14, 70, 40, 88, 3, false); b_pgCajon(R, 100, 98, 128, 113, 4, true);
  for (let s = 0; s < 6; s++) { const c = PG_LIB[(s * 5) % PG_LIB.length]; rect(130 - s, 111 - s * 3, 142 + (s % 2), 113 - s * 3, K); rect(131 - s, 111 - s * 3, 141 + (s % 2), 112 - s * 3, c); }
  // el suelo de mármol en damero desvaído, polvoriento, con huellas de zapatos que van a las cajas
  b_pgSuelo(R, 115, 179, 32, (iu, iv, j, x, y) => { if (j) return hex('#8a7e70'); const c = (iu + iv) & 1 ? hex('#b8aca0') : hex('#d8d0c4'), m = h(x >> 1, y, 682); return m < 0.1 ? b_pgMez(c, hex('#a89a8a'), 0.5) : m > 0.93 ? b_pgMez(c, C.blanco, 0.4) : c; }, { fuga: 64 });
  rect(0, 115, 319, 115, hex('#6a5a4a'));
  for (let k = 0; k < 10; k++) { const u = k / 9, x = Math.round(150 - u * 110 + (k % 2) * 6), y = Math.round(172 - u * 52); rect(x, y, x + 2 + Math.round(2 * (1 - u)), y + 1, hex('#a89a8a')); }
  // los haces de sol del ventanal que caen en diagonal sobre el suelo
  for (const [xa, w] of [[216, 24], [245, 22]]) b_pgHaz(R, xa, 26, w, 179, -0.62, 0.17, hex('#fff2d0'));
}

// los jardines por el ventanal: colinas, cipreses que se mecen, la balaustrada, la fuente con su chorro y un jardinero
function b_pgVistaJardin(R, t) {
  const { pset, linea, disco, poligono } = R, cl = [216, 26, 268, 106], rc = (a, b, c, d, col) => b_pgRc(R, cl, a, b, c, d, col);
  poligono([[200, 70], [230, 60], [252, 64], [280, 58], [280, 110], [200, 110]], PG.lejos);
  poligono([[200, 78], [236, 72], [280, 76], [280, 110], [200, 110]], PG.colina);
  for (let y = 72; y < 107; y++) for (let x = 216; x <= 268; x++) if (h(x, y, 683) < 0.12 && R.pget(x, y) === PG.colina) pset(x, y, PG.colinaS);
  for (let k = 0; k < 6; k++) { const x = 220 + k * 9, m = Math.round(Math.sin(t * 1.2 + k) * 0.8), top = 54 + (k % 2) * 4; poligono([[x - 3, 86], [x + m, top], [x + 3, 86]], PG.cipres); linea(x - 1, 84, x + m, top + 2, PG.cipresL); }
  rc(216, 94, 268, 106, hex('#d8d0c0')); rc(216, 94, 268, 95, C.blanco); for (let x = 218; x < 268; x += 4) { rc(x, 96, x + 1, 104, hex('#b8b0a0')); pset(x, 96, C.blanco); } rc(216, 104, 268, 106, hex('#c8c0b0'));
  disco(236, 92, 5, hex('#c8c0b0')); rc(231, 90, 241, 93, hex('#b8b0a0'));
  for (let k = 0; k < 10; k++) { const u = ((t * 1.3 + k / 10) % 1), x = 236 + Math.round(Math.sin(k * 2.3) * u * 4), y = Math.round(88 - Math.sin(u * Math.PI) * 9); pset(x, y, u < 0.5 ? C.blanco : hex('#c8e0f0')); }
  const gx = 252 + Math.round(Math.sin(t * 0.4) * 5), r = Math.round(Math.sin(t * 3) * 1.5); rc(gx, 82, gx + 1, 86, hex('#4a4a5a')); pset(gx, 81, hex('#e0b090')); rc(gx - 1, 80, gx + 2, 80, hex('#d8c060')); linea(gx + 1, 83, gx - 3 + r, 89, hex('#8a6a4a')); linea(gx - 5 + r, 89, gx - 1 + r, 89, hex('#6a5a4a'));
}

function b_pgVilla(R, t, o) {
  const fijo = b_pgCapa(R, 'villa', () => b_pgVillaFijo(R));
  R.copiar(fijo);
  b_pgHueco(R, fijo, 216, 26, 268, 106, () => { b_pgCielo(R, t, 216, 26, 268, 106, { hor: 70, nubes: 3, pajaros: 2 }); b_pgVistaJardin(R, t); });
  // la lámpara envuelta en una tela que se mece colgada de su cadena
  { const m = Math.sin(t * 0.7) * 1.5, x = 110 + Math.round(m); R.linea(110, 16, x, 28, hex('#5a4a3a')); R.poligono([[x - 8, 40], [x + 8, 40], [x + 5, 30], [x, 28], [x - 5, 30]], C.k); R.poligono([[x - 7, 39], [x + 7, 39], [x + 4, 31], [x, 29], [x - 4, 31]], hex('#d8d0c0'));
    R.linea(x - 3, 31, x - 5, 39, hex('#b8b0a0')); R.linea(x + 2, 30, x + 3, 39, hex('#b8b0a0')); R.rect(x - 7, 40, x + 7, 41, hex('#a8a090')); R.linea(x - 1, 32, x - 2, 38, C.blanco); }
  // el polvo que flota en los haces de sol
  b_pgPolvo(R, t, 216, 30, 24, 176, -0.62, 22, 5); b_pgPolvo(R, t, 245, 30, 22, 176, -0.62, 18, 6);
  return { suelo: 150, libre: [76, 244], ventana: [216, 26, 268, 106] };
}

// las cajas de libros de los jesuitas en primer término, por delante de los personajes
function b_pgVillaDelante(R, t, o) {
  const fijo = b_pgCapa(R, 'villaDel', () => {
    b_pgCajon(R, -2, 140, 64, 179, 5, true); b_pgCajon(R, 250, 148, 322, 179, 6, true);
    R.poligono([[244, 179], [252, 128], [262, 128], [254, 179]], C.k); R.poligono([[245, 178], [253, 129], [261, 129], [253, 178]], hex('#c89a62'));
    for (let k = 0; k < 6; k++) R.linea(247 + k, 172 - k * 8, 250 + k, 172 - k * 8, hex('#a87a4a')); R.pset(252, 140, hex('#3a3a40')); R.pset(251, 160, hex('#3a3a40'));
    R.linea(66, 176, 84, 170, C.k); R.linea(66, 175, 84, 169, hex('#5a5a66')); R.linea(84, 169, 86, 172, C.k);
  });
  b_pgSombraElipse(R, 36, 177, 40, 3, 0.6); b_pgSombraElipse(R, 286, 177, 40, 3, 0.6);
  // se copia solo lo pintado del búfer (lo vacío queda transparente)
  const B = R.buf; for (let y = 120; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, c = fijo[i]; if (c) B[i] = c; }
  // unas pajas sueltas que tiemblan con la corriente
  for (let k = 0; k < 5; k++) { const x = 8 + k * 11, m = Math.round(Math.sin(t * 2 + k) * 1.2); R.linea(x, 140, x + m + (k % 2 ? 2 : -2), 134, PG.paja); }
  return {};
}

function b_pgCajaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  b_pgSuelo(R, 0, 179, 46, (iu, iv, j, x, y) => { if (j) return hex('#8a7e70'); const c = (iu + iv) & 1 ? hex('#b8aca0') : hex('#d8d0c4'); return h(x >> 1, y >> 1, 684) < 0.1 ? b_pgMez(c, hex('#a89a8a'), 0.5) : c; }, { fuga: 120, prof: 0.8 });
  b_pgSombraElipse(R, 166, 172, 110, 6, 0.6);
  // la caja vista desde arriba: el canto de las cuatro tablas, el interior en sombra y la tapa apoyada con sus clavos
  poligono([[50, 22], [272, 22], [284, 170], [38, 170]], K);
  poligono([[52, 24], [270, 24], [281, 168], [41, 168]], hex('#a87a4a'));
  poligono([[62, 34], [260, 34], [268, 158], [54, 158]], hex('#5a3e24'));
  for (let y = 24; y < 169; y++) for (let x = 40; x < 283; x++) { const c = R.pget(x, y); if (c === hex('#a87a4a') && h(x, y >> 2, 685) < 0.2) pset(x, y, hex('#c89a62')); }
  for (const [a, b] of [[[52, 24], [270, 24]], [[41, 168], [281, 168]]]) linea(a[0], a[1], b[0], b[1], hex('#dcb47a'));
  for (const [x, y] of [[58, 28], [264, 28], [48, 160], [274, 160], [160, 28], [160, 164]]) pset(x, y, hex('#3a3a40'));
  // dentro, los libros viejos apilados y torcidos, con paja entre ellos
  const libro = (x, y, w, hh, c, inc) => { poligono([[x, y], [x + w, y + inc], [x + w - inc * 0.3, y + hh + inc], [x - inc * 0.3, y + hh]], K); poligono([[x + 1, y + 1], [x + w - 1, y + inc + 1], [x + w - 1 - inc * 0.3, y + hh + inc - 1], [x + 1 - inc * 0.3, y + hh - 1]], c); linea(x + 2, y + 2, x + w - 2, y + inc + 2, b_pgMez(c, C.blanco, 0.3)); };
  for (let k = 0; k < 14; k++) { const x = 64 + (k % 5) * 40 + Math.round(h(k, 1, 686) * 8), y = 38 + Math.floor(k / 5) * 40 + Math.round(h(k, 2, 686) * 8); libro(x, y, 34 + Math.round(h(k, 3, 686) * 8), 26, PG_LIB[k % PG_LIB.length], Math.round(h(k, 4, 686) * 8) - 4); }
  for (let i = 0; i < 160; i++) { const x = 60 + Math.round(h(i, 1, 687) * 205), y = 36 + Math.round(h(i, 2, 687) * 120); linea(x, y, x + Math.round(h(i, 3, 687) * 8) - 4, y + Math.round(h(i, 4, 687) * 6) - 3, i % 2 ? PG.paja : PG.pajaS); }
  // un hueco oscuro en el centro, donde está el libro
  poligono([[132, 78], [192, 78], [194, 124], [130, 124]], hex('#3a2614'));
  // la tapa apoyada a la izquierda y la palanqueta a la derecha
  poligono([[0, 40], [30, 30], [42, 176], [0, 179]], K); b_pgTablas(R, 1, 34, 34, 178, [hex('#c89a62'), hex('#dcb47a'), hex('#a87a4a'), hex('#7a5232')], 9, 10, true);
  for (let y = 40; y < 180; y++) { const xe = Math.round(30 + (y - 30) * 12 / 146); for (let x = xe; x < 42; x++) pset(x, y, R.pget(x, y)); }
  linea(290, 60, 312, 170, K); linea(291, 60, 313, 170, hex('#5a5a66')); linea(290, 60, 296, 56, K);
}

function b_pgCaja(R, t, o) {
  const fijo = b_pgCapa(R, 'cajaInserto', () => b_pgCajaFijo(R));
  R.copiar(fijo);
  b_pgHaz(R, 40, 0, 70, 179, 0.6, 0.16, hex('#fff2d0'));
  if (o.libro !== false) {
    // el libro de pergamino claro, flexible, con las tiras de cuero (o.sale lo levanta)
    const s = Math.max(0, Math.min(1, o.sale ?? 0)), dy = -Math.round(s * 40), x0 = 136, y0 = 82 + dy;
    if (s > 0) b_pgSombraElipse(R, 162, 122, 30, 4, 0.7 - s * 0.2);
    R.poligono([[x0, y0], [x0 + 50, y0 - 1], [x0 + 51, y0 + 36], [x0 + 1, y0 + 37]], C.k);
    R.poligono([[x0 + 1, y0 + 1], [x0 + 49, y0], [x0 + 50, y0 + 35], [x0 + 2, y0 + 36]], hex('#e8dcb8'));
    for (let y = y0 + 2; y < y0 + 35; y++) for (let x = x0 + 2; x < x0 + 49; x++) { const n = h(x, y, 688); if (n < 0.08) R.pset(x, y, hex('#c8b890')); else if (n > 0.96) R.pset(x, y, C.blanco); }
    R.linea(x0 + 2, y0 + 35, x0 + 50, y0 + 34, hex('#b8a47c')); R.linea(x0 + 1, y0 + 2, x0 + 1, y0 + 35, hex('#c8b890'));
    R.linea(x0 + 50, y0 + 14, x0 + 58, y0 + 18, hex('#8a5a3a')); R.linea(x0 + 50, y0 + 22, x0 + 57, y0 + 28, hex('#8a5a3a'));
    if (Math.floor(t * 1.2) % 3 === 0) { const g = (t * 1.2 % 1) * 40; R.pset(Math.round(x0 + 6 + g), y0 + 3, C.blanco); R.pset(Math.round(x0 + 5 + g), y0 + 4, hex('#fff4d8')); }
  }
  b_pgPolvo(R, t, 40, 0, 70, 176, 0.6, 24, 7);
  return { libro: [136, 82, 186, 118] };
}

function b_pgNyFijo(R) {
  const { rect, pset, linea, disco, poligono } = R, K = C.k;
  // el techo de chapa estampada con su cornisa
  rect(0, 0, 319, 16, PG.lata);
  for (let x = 0; x < 320; x += 12) for (let y = 0; y < 16; y += 12) { rect(x, y, x + 11, y, PG.lataS); rect(x, y, x, y + 11, PG.lataS); rect(x + 3, y + 3, x + 8, y + 8, PG.lataL); rect(x + 4, y + 4, x + 7, y + 7, PG.lata); pset(x + 5, y + 5, PG.lataS); }
  rect(0, 15, 319, 19, hex('#9a8a6a')); rect(0, 15, 319, 15, PG.lataL); for (let x = 0; x < 320; x += 3) pset(x, 17, hex('#7a6a4a'));
  // la pared de detrás: papel pintado de rayas verdes, tranquilo junto a Atom
  rect(0, 20, 319, 113, hex('#c8c8a0')); for (let x = 0; x < 320; x++) if (x % 6 < 2) rect(x, 20, x, 113, hex('#b8bc94')); for (let y = 20; y < 114; y++) for (let x = 0; x < 320; x++) if (h(x >> 1, y >> 1, 690) < 0.05) pset(x, y, hex('#a8ac86'));
  rect(0, 106, 319, 113, PG.nogal); rect(0, 106, 319, 106, PG.nogalL);
  // la gran estantería de la izquierda, hasta el techo, con la barra y la escalera de ruedas
  rect(0, 20, 118, 113, K); rect(1, 21, 117, 112, PG.nogal); rect(4, 24, 114, 108, PG.nogalD);
  [38, 56, 74, 92].forEach((yb, i) => { b_pgLibros(R, 5, 113, yb, 14, 30 + i, PG_LIB60, false); rect(3, yb + 1, 115, yb + 3, PG.nogal); rect(3, yb + 1, 115, yb + 1, PG.nogalL); });
  b_pgLibros(R, 5, 113, 106, 10, 35, PG_LIB60, false); rect(1, 21, 117, 23, PG.nogalL);
  rect(0, 25, 118, 26, PG.latonS); linea(82, 26, 72, 113, K); linea(94, 26, 84, 113, K); linea(83, 26, 73, 113, PG.robleL); linea(93, 26, 83, 113, PG.robleS); for (let y = 34; y < 110; y += 9) { const d = (y - 26) * (10 / 87); linea(Math.round(83 - d), y, Math.round(93 - d), y, PG.robleL); } disco(73, 112, 2, K);
  // el escaparate y la puerta de cristal, con su marco verde (lo de fuera, en cada fotograma)
  rect(120, 22, 224, 113, K); rect(121, 23, 223, 112, PG.tienda); rect(121, 23, 223, 24, PG.tiendaL);
  rect(125, 28, 195, 96, PG_HUECO); rect(200, 30, 219, 108, PG_HUECO);
  rect(160, 28, 161, 96, PG.tienda); rect(160, 28, 160, 96, PG.tiendaL); rect(201, 66, 218, 68, PG.tienda); rect(203, 84, 205, 90, PG.latonL); rect(203, 84, 205, 84, C.blanco);
  rect(121, 96, 199, 112, PG.tienda); b_pgCuart(R, 126, 100, 158, 110, PG.tienda, PG.tiendaL, PG.tiendaS, K, 1); b_pgCuart(R, 162, 100, 194, 110, PG.tienda, PG.tiendaL, PG.tiendaS, K, 2);
  // los libros del escaparate, de pie en sus atriles, de espaldas a nosotros
  for (let k = 0; k < 4; k++) { const x = 130 + k * 16; rect(x, 84, x + 9, 96, K); rect(x + 1, 85, x + 8, 96, PG_LIB60[(k * 3 + 2) % PG_LIB60.length]); rect(x + 1, 85, x + 8, 86, b_pgMez(PG_LIB60[(k * 3 + 2) % PG_LIB60.length], C.k, 0.4)); }
  rect(124, 95, 196, 96, PG.nogalL);
  // la campanilla de la puerta
  linea(210, 24, 210, 28, K); disco(210, 30, 2, PG.laton); pset(209, 29, PG.latonL);
  // la caja fuerte negra con filete de oro, la rueda y la manija, sobre su peana
  rect(234, 66, 280, 113, K); rect(235, 67, 279, 110, PG.fuerte); rect(235, 67, 279, 68, PG.fuerteL); rect(278, 69, 279, 110, PG.fuerteS);
  rect(238, 71, 276, 106, C.oroS); rect(239, 72, 275, 105, PG.fuerte); rect(241, 74, 273, 103, PG.fuerteL); rect(242, 75, 272, 102, PG.fuerte);
  for (const [x, y] of [[242, 75], [272, 75], [242, 102], [272, 102]]) { pset(x, y, C.oro); pset(x + (x < 250 ? 1 : -1), y, C.oroS); pset(x, y + (y < 90 ? 1 : -1), C.oroS); }
  disco(257, 85, 6, K); disco(257, 85, 5, hex('#8a8a96')); disco(257, 85, 3, hex('#5a5a66')); pset(255, 83, C.blanco); rect(262, 93, 270, 95, K); rect(263, 93, 269, 94, PG.latonL); rect(234, 110, 280, 113, PG.nogalS); for (const x of [238, 274]) disco(x, 112, 2, K);
  // el cartel del precio sobre la caja fuerte (lo pinta pragua con o.precio)
  rect(240, 46, 274, 64, K); rect(241, 47, 273, 63, C.blanco); rect(241, 47, 273, 48, hex('#c83a2a')); linea(250, 64, 246, 66, K); linea(264, 64, 268, 66, K);
  // las baldas de la derecha, por debajo de Atom
  rect(282, 48, 319, 113, K); rect(283, 49, 319, 112, PG.nogal); rect(285, 51, 319, 108, PG.nogalD);
  [66, 86, 106].forEach((yb, i) => { b_pgLibros(R, 286, 319, yb, 13, 40 + i, PG_LIB60, false); rect(284, yb + 1, 319, yb + 2, PG.nogalL); });
  // el suelo de tablas en perspectiva, encerado, con su brillo y la alfombra
  b_pgSuelo(R, 114, 179, 14, (iu, iv, j, x, y, fu) => { const tabla = iu, n = h(tabla, Math.floor(iv / 6), 691), m = h(x, y >> 1, 692); if (fu < 0.07) return PG.robleD; if (j && (iv + tabla * 3) % 6 === 0) return PG.robleD;
    const c = n < 0.3 ? PG.robleS : n > 0.8 ? PG.robleL : PG.roble; return m < 0.06 ? b_pgMez(c, PG.robleD, 0.5) : c; }, { fuga: 60, prof: 2.5 });
  rect(0, 113, 319, 114, PG.nogalD);
  for (let y = 115; y < 150; y++) for (let x = 120; x < 224; x++) if (((x + y) & 1) === 0) b_pgTi(R, x, y, 0.16 * (1 - (y - 115) / 35), hex('#f8f0d8'));
  for (let y = 152; y <= 176; y++) { const xa = Math.round(40 - (y - 152) * 0.7), xb = Math.round(130 + (y - 152) * 0.7); for (let x = xa; x <= xb; x++) { const bu = Math.min(x - xa, xb - x), bv = Math.min(y - 152, 176 - y); pset(x, y, bu < 3 || bv < 2 ? hex('#3a2a4a') : ((x + y) % 7 === 0 ? hex('#d8a040') : hex('#7a2a3a'))); } }
}

// la calle vista por el escaparate: casas de ladrillo con escaleras de incendios y ventanas, la acera, la farola,
// paseantes y taxis amarillos que pasan
function b_pgVistaNY(R, t) {
  const { pset, linea, disco } = R, cl = [125, 28, 219, 108], rc = (a, b, c, d, col) => b_pgRc(R, cl, a, b, c, d, col);
  rc(125, 28, 219, 80, PG.ladrNY);
  for (let y = 28; y < 80; y += 3) for (let x = 125 + ((y / 3) % 2) * 3; x < 220; x += 6) { pset(x, y, PG.ladrNYS); if (h(x, y, 693) < 0.2) rc(x + 1, y + 1, x + 4, y + 1, PG.ladrNYL); }
  for (let k = 0; k < 6; k++) for (let f = 0; f < 2; f++) { const x = 128 + k * 16, y = 34 + f * 22, luz = h(k, f, 694) < 0.35;
    rc(x, y, x + 8, y + 12, C.k); rc(x + 1, y + 1, x + 7, y + 11, luz ? hex('#f0d890') : hex('#4a5a7a')); rc(x + 1, y + 6, x + 7, y + 6, C.k); rc(x - 1, y + 13, x + 9, y + 13, hex('#d8c8b0')); rc(x - 1, y - 1, x + 9, y - 1, hex('#d8c8b0')); }
  for (let f = 0; f < 2; f++) { const y = 48 + f * 22; rc(156, y, 186, y, C.k); for (let x = 156; x <= 186; x += 3) linea(x, y, x, y - 5, C.k); rc(156, y - 5, 186, y - 5, C.k); linea(160, y, 182, y + 22 - 5 * f, hex('#2a2a30')); }
  rc(125, 80, 219, 108, hex('#7a7a80')); rc(125, 80, 219, 82, hex('#a8a8ac')); for (let x = 125; x < 220; x += 12) linea(x, 82, x - 4, 88, hex('#6a6a70'));
  rc(125, 88, 219, 108, hex('#4a4a52')); for (let x = 125; x < 220; x += 14) rc(x, 99, x + 6, 99, hex('#e8d880'));
  rc(146, 52, 147, 86, hex('#2a3a2a')); disco(146.5, 51, 2.4, hex('#2a3a2a')); pset(146, 52, hex('#fff0a0'));
  // los paseantes por la acera
  for (let k = 0; k < 3; k++) { const L = 120, u = (t * (6 + k * 2) + h(k, 1, 695) * L) % L, x = Math.round(k % 2 ? 222 - u : 118 + u), y = 86, paso = Math.floor(t * 5 + k) % 2, ropa = [hex('#3a4a7a'), hex('#8a3a3a'), hex('#5a5a3a')][k];
    rc(x, y - 6, x + 2, y - 2, ropa); pset(x + 1, y - 7, hex('#e0b090')); pset(x + 1, y - 8, k === 1 ? hex('#2a1a10') : hex('#4a3a2a')); if (k === 0) rc(x, y - 9, x + 2, y - 9, hex('#3a3a3a')); pset(x + paso * 2, y - 1, C.k); pset(x + 2 - paso * 2, y - 1, C.k); }
  // los taxis amarillos y algún coche que pasan por la calzada
  for (let k = 0; k < 2; k++) { const L = 200, u = (t * (22 + k * 8) + k * 90) % L, dir = k ? -1 : 1, x = Math.round(dir > 0 ? 100 + u : 244 - u), y = k ? 98 : 104, col = k ? hex('#3a6aa8') : PG.taxi, colS = k ? hex('#2a4a80') : PG.taxiS;
    rc(x - 13, y - 6, x + 13, y, col); rc(x - 8, y - 10, x + 7, y - 6, col); rc(x - 7, y - 9, x - 1, y - 7, hex('#a8c8e0')); rc(x + 1, y - 9, x + 6, y - 7, hex('#a8c8e0')); rc(x - 13, y - 1, x + 13, y, colS);
    if (!k) for (let i = -12; i < 12; i += 2) pset(x + i, y - 4, i % 4 === 0 ? C.k : C.blanco);
    if (!k) rc(x - 2, y - 12, x + 2, y - 11, PG.taxiL); disco(x - 8, y + 1, 2.4, C.k); disco(x + 8, y + 1, 2.4, C.k); pset(x - 8, y + 1, hex('#8a8a96')); pset(x + 8, y + 1, hex('#8a8a96')); pset(dir > 0 ? x + 13 : x - 13, y - 4, hex('#fff4c0')); }
  // una paloma en la acera que picotea
  { const px = 206, pc = Math.floor(t * 3) % 3 === 0 ? 1 : 0; rc(px, 84 + pc, px + 3, 85, hex('#8a8a96')); pset(px + 3 + pc, 83 + pc, hex('#6a6a76')); pset(px + 4, 86, hex('#e88a6a')); }
}

function b_pgNuevaYork(R, t, o) {
  const fijo = b_pgCapa(R, 'ny', () => b_pgNyFijo(R));
  R.copiar(fijo);
  b_pgHueco(R, fijo, 125, 28, 219, 108, () => { R.rect(125, 28, 219, 108, PG.ladrNY); b_pgVistaNY(R, t); }, 0.14);
  // el ventilador del techo que gira y las lámparas colgantes
  { const cx = 60, cy = 22; R.linea(cx, 16, cx, 20, C.k); R.disco(cx, 21, 2.4, hex('#5a4a3a')); for (let k = 0; k < 4; k++) { const a = t * 6 + k * Math.PI / 2, ex = Math.cos(a) * 16, ey = Math.sin(a) * 2; R.linea(cx, cy, Math.round(cx + ex), Math.round(cy + ey), PG.nogal); R.linea(cx, cy + 1, Math.round(cx + ex * 0.9), Math.round(cy + ey + 1), PG.nogalS); } }
  for (const lx of [176, 258]) { R.linea(lx, 19, lx, 26, C.k); R.poligono([[lx - 6, 32], [lx + 6, 32], [lx + 3, 26], [lx - 3, 26]], hex('#e8e4d8')); R.rect(lx - 6, 32, lx + 6, 32, hex('#c8c4b8')); const lz = 0.9 + 0.1 * Math.sin(t * 13 + lx); for (let j = 0; j < 7; j++) for (let i = -8 - j; i <= 8 + j; i++) if (((i + j) & 1) === 0) b_pgTi(R, lx + i, 33 + j, 0.12 * lz * (1 - j / 7), hex('#fff4c8')); }
  // el precio en cifras sobre la caja fuerte
  R.numero(String(o.precio ?? '24500'), 257, 60, { centro: true, color: hex('#2a2a3a'), sombra: false, fina: true });
  // el gato de la tienda, dormido en lo alto de la estantería: respira y mueve la cola
  { const r = Math.sin(t * 2) > 0 ? 1 : 0, x = 30, y = 38; R.disco(x, y - 3, 4 + r * 0.3, C.k); R.disco(x, y - 3, 3.2 + r * 0.3, hex('#3a3a3a')); R.disco(x + 4, y - 4, 2.6, C.k); R.disco(x + 4, y - 4, 2, hex('#3a3a3a')); R.pset(x + 3, y - 7, hex('#3a3a3a')); R.pset(x + 5, y - 7, hex('#3a3a3a')); R.pset(x + 5, y - 4, hex('#a8d860')); const c = Math.round(Math.sin(t * 1.4) * 2); R.linea(x - 4, y - 1, x - 6, y + 3 + c, hex('#3a3a3a')); }
  return { suelo: 150, detras: 128, mostrador: { x0: 140, x1: 262, y: 124, libre: [182, 226] }, cajaFuerte: [234, 66, 280, 113], puerta: [200, 30, 219, 108], escaparate: [125, 28, 195, 96] };
}

// el mostrador de la librería, por delante de los personajes
function b_pgNyDelante(R, t, o) {
  const { rect, pset, linea, disco } = R, K = C.k;
  b_pgSombraElipse(R, 200, 176, 66, 3, 0.6);
  rect(138, 122, 264, 172, K); rect(139, 128, 263, 171, PG.nogal); rect(136, 122, 266, 128, K); rect(137, 123, 265, 126, PG.nogalL); rect(137, 127, 265, 127, PG.nogalS);
  // la vitrina con libros antiguos dentro y el reflejo del cristal
  rect(144, 132, 200, 160, K); rect(145, 133, 199, 159, hex('#3a2a20'));
  for (let k = 0; k < 4; k++) { const x = 148 + k * 13; rect(x, 148 - (k % 2) * 3, x + 10, 158, K); rect(x + 1, 149 - (k % 2) * 3, x + 9, 158, PG_LIB[(k * 4 + 1) % PG_LIB.length]); rect(x + 1, 149 - (k % 2) * 3, x + 9, 149 - (k % 2) * 3, PG.laton); }
  rect(145, 140, 199, 140, hex('#6a5a4a')); for (let k = 0; k < 3; k++) { disco(152 + k * 16, 137, 2, C.oroS); pset(151 + k * 16, 136, C.oroL); }
  for (let y = 133; y < 160; y++) for (let x = 145; x < 200; x++) if (((x - y * 0.5 + 300) % 30) < 4 && ((x + y) & 1) === 0) b_pgTi(R, x, y, 0.35, C.blanco);
  b_pgCuart(R, 206, 132, 232, 166, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, 7); b_pgCuart(R, 236, 132, 260, 166, PG.nogal, PG.nogalL, PG.nogalS, PG.nogalD, 8); rect(138, 166, 264, 172, PG.nogalS);
  // encima: la lámpara verde de banquero, una pila de libros, la campanilla y la caja registradora de latón
  rect(150, 120, 160, 122, K); rect(154, 112, 156, 120, PG.latonS); R.poligono([[146, 112], [164, 112], [161, 106], [149, 106]], K); R.poligono([[147, 111], [163, 111], [160, 107], [150, 107]], hex('#2a7a4a')); rect(150, 107, 160, 107, hex('#4aa86a'));
  for (let j = 0; j < 5; j++) for (let i = -10 - j; i <= 10 + j; i++) if (((i + j) & 1) === 0) b_pgTi(R, 155 + i, 113 + j, 0.2 * (1 - j / 5), hex('#fff4c0'));
  for (let s = 0; s < 3; s++) { const c = PG_LIB60[(s * 5 + 3) % PG_LIB60.length]; rect(166 + s, 119 - s * 3, 180 - s, 121 - s * 3, K); rect(166 + s, 119 - s * 3, 179 - s, 120 - s * 3, c); }
  disco(232, 120, 3, K); disco(232, 120, 2.2, PG.laton); pset(231, 119, PG.latonL); rect(229, 122, 235, 122, K);
  rect(238, 104, 260, 122, K); rect(239, 105, 259, 121, PG.laton); rect(239, 105, 259, 106, PG.latonL); rect(241, 98, 257, 104, K); rect(242, 99, 256, 103, hex('#2a2a2a'));
  const n = Math.floor(t / 3) % 3; R.numero(['0', '5', '12'][n], 249, 103, { centro: true, color: hex('#e8e4da'), sombra: false, fina: true });
  for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) { disco(242 + i * 4, 110 + j * 5, 1.4, K); pset(242 + i * 4, 110 + j * 5, C.blanco); }
  linea(260, 112, 264, 106, K); disco(264, 105, 1.6, hex('#c83a2a'));
  return { tablero: 124 };
}

function b_pgFuerteFijo(R) {
  const { rect, pset } = R, K = C.k;
  rect(0, 0, 319, 179, hex('#c8c8a0')); for (let x = 0; x < 320; x++) if (x % 8 < 3) rect(x, 0, x, 150, hex('#b8bc94'));
  for (const [x0, x1] of [[0, 74], [246, 319]]) { rect(x0, 0, x1, 152, K); rect(x0 + 1, 0, x1 - 1, 151, PG.nogal); rect(x0 + 4, 0, x1 - 4, 148, PG.nogalD);
    [34, 70, 106, 142].forEach((yb, i) => { if (x0 > 200 && yb < 48) { rect(x0 + 4, 0, x1 - 4, yb + 3, PG.nogal); return; } b_pgLibros(R, x0 + 5, x1 - 5, yb, 28, 50 + i + x0, PG_LIB60, false); rect(x0 + 2, yb + 1, x1 - 2, yb + 5, PG.nogal); rect(x0 + 2, yb + 1, x1 - 2, yb + 1, PG.nogalL); }); }
  b_pgSuelo(R, 152, 179, 22, (iu, iv, j, x, y, fu) => (fu < 0.08 ? PG.robleD : h(iu, Math.floor(iv / 4), 696) < 0.3 ? PG.robleS : PG.roble), { fuga: 50, prof: 2.5 });
  rect(0, 151, 319, 152, PG.nogalD);
  b_pgSombraElipse(R, 160, 168, 80, 6, 0.55);
}

function b_pgCajaFuerte(R, t, o) {
  const fijo = b_pgCapa(R, 'fuerte', () => b_pgFuerteFijo(R));
  R.copiar(fijo);
  const { rect, pset, disco, linea, poligono } = R, K = C.k, u = Math.max(0, Math.min(1, o.abre ?? 0)), x0 = 96, x1 = 224, y0 = 30, y1 = 160;
  // el cuerpo de la caja, el zócalo y las ruedas
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, K); rect(x0 - 1, y0 - 1, x1 + 1, y1, PG.fuerte); rect(x0 - 1, y0 - 1, x1 + 1, y0, PG.fuerteL); rect(x1, y0, x1 + 1, y1, PG.fuerteS);
  rect(x0 - 2, y1, x1 + 2, y1 + 6, K); rect(x0 - 1, y1 + 1, x1 + 1, y1 + 5, hex('#3a2a20')); for (const x of [x0 + 6, x1 - 6]) { disco(x, y1 + 8, 4, K); disco(x, y1 + 8, 2.6, hex('#8a8a96')); }
  // el interior: forro de terciopelo, la balda y el libro con su brillo
  rect(x0 + 6, y0 + 6, x1 - 6, y1 - 6, hex('#1a1214')); rect(x0 + 8, y0 + 8, x1 - 8, y1 - 8, PG.tercD); for (let y = y0 + 8; y < y1 - 8; y++) for (let x = x0 + 8; x < x1 - 8; x++) if (h(x, y, 697) < 0.1) pset(x, y, PG.tercS);
  rect(x0 + 8, 112, x1 - 8, 116, K); rect(x0 + 8, 112, x1 - 8, 114, PG.fuerteL);
  for (let s = 0; s < 3; s++) { rect(x0 + 14, 88 + s * 8, x0 + 44, 92 + s * 8, K); rect(x0 + 15, 89 + s * 8, x0 + 43, 91 + s * 8, hex('#e8dcc0')); } linea(x0 + 14, 112, x0 + 44, 112, K);
  rect(x1 - 40, 96, x1 - 14, 111, K); rect(x1 - 39, 97, x1 - 15, 110, hex('#5a4a8a')); rect(x1 - 39, 97, x1 - 15, 98, hex('#7a6aaa'));
  if (o.libro !== false) { const lx = 140, ly = 80; rect(lx, ly, lx + 40, ly + 32, K); rect(lx + 1, ly + 1, lx + 39, ly + 31, hex('#e8dcb8')); for (let y = ly + 2; y < ly + 31; y++) for (let x = lx + 2; x < lx + 39; x++) if (h(x, y, 698) < 0.08) pset(x, y, hex('#c8b890')); rect(lx + 1, ly + 29, lx + 39, ly + 31, hex('#c8b890')); rect(lx + 1, ly + 1, lx + 1, ly + 31, hex('#f4ecd4')); linea(lx + 40, ly + 10, lx + 44, ly + 12, hex('#8a5a3a'));
    if (u > 0.3) { const g = (u - 0.3) / 0.7, b = 0.5 + 0.5 * Math.sin(t * 3); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + t * 0.4, L = 8 + g * 10 * b; for (let r = 24; r < 24 + L; r += 2) b_pgTi(R, Math.round(lx + 20 + Math.cos(a) * r), Math.round(ly + 16 + Math.sin(a) * r * 0.8), 0.35 * g, hex('#fff0b0')); } } }
  // la puerta: gira sobre las bisagras de la izquierda; de frente se estrecha y luego se ve su canto grueso con los cerrojos
  const W = x1 - x0, c = Math.cos(u * Math.PI * 0.62), wf = Math.round(W * c);
  if (wf > 2) { const xa = x0, xb = x0 + wf; rect(xa, y0, xb, y1, K); rect(xa + 1, y0 + 1, xb - 1, y1 - 1, PG.fuerte); rect(xa + 1, y0 + 1, xb - 1, y0 + 2, PG.fuerteL);
    const sx = (v) => Math.round(xa + v * c); rect(sx(6), y0 + 6, sx(W - 6), y1 - 6, C.oroS); rect(sx(7), y0 + 7, sx(W - 7), y1 - 7, PG.fuerte); rect(sx(10), y0 + 10, sx(W - 10), y1 - 10, PG.fuerteL); rect(sx(11), y0 + 11, sx(W - 11), y1 - 11, PG.fuerte);
    for (const [vx, vy] of [[11, 11], [W - 11, 11], [11, 119], [W - 11, 119]]) { pset(sx(vx), y0 + vy, C.oro); pset(sx(vx), y0 + vy + (vy < 60 ? 1 : -1), C.oroS); }
    for (let k = 0; k < 20; k++) { const v = 14 + k * 5; if (v < W - 14) { pset(sx(v), y0 + 13, C.oroS); pset(sx(v), y1 - 13, C.oroS); } }
    const dx = sx(W / 2), dy = 82, rr = Math.max(2, 14 * c); for (let j = -14; j <= 14; j++) for (let i = -Math.ceil(rr); i <= Math.ceil(rr); i++) { const d = (i / rr) ** 2 + (j / 14) ** 2; if (d <= 1) pset(dx + i, dy + j, d > 0.75 ? K : d > 0.5 ? hex('#8a8a96') : hex('#b8b8c4')); }
    const ang = t * 1.5 + u * 8; for (let k = 0; k < 12; k++) { const a = ang + k / 12 * Math.PI * 2; pset(Math.round(dx + Math.cos(a) * rr * 0.65), Math.round(dy + Math.sin(a) * 9), K); } linea(dx, dy, Math.round(dx + Math.cos(ang) * rr * 0.4), Math.round(dy + Math.sin(ang) * 6), hex('#c83a2a'));
    rect(sx(W / 2 + 16), 118, sx(W / 2 + 34), 122, K); rect(sx(W / 2 + 17), 119, sx(W / 2 + 33), 121, PG.latonL); }
  if (u > 0.5) { const e = Math.round((u - 0.5) / 0.5 * 26); rect(x0 - e, y0 - 1, x0, y1 + 1, K); rect(x0 - e + 1, y0, x0 - 1, y1, PG.fuerteS); rect(x0 - e + 1, y0, x0 - e + 1, y1, PG.fuerteL); for (let k = 0; k < 4; k++) { const y = y0 + 20 + k * 30; rect(x0 - Math.round(e * 0.8), y, x0 - 2, y + 4, PG.latonS); rect(x0 - Math.round(e * 0.8), y, x0 - 2, y, PG.latonL); } }
  for (const y of [y0 + 18, y1 - 18]) { rect(x0 - 3, y, x0 + 1, y + 8, K); rect(x0 - 2, y + 1, x0, y + 7, PG.latonS); }
  return { cajaFuerte: [x0, y0, x1, y1], libro: [140, 80, 180, 112], suelo: 166 };
}

const PG_ENC = {
  'gabinete:general': b_pgGabinete, 'gabinete:ultravioleta': b_pgUv,
  'colegio:general': b_pgColegio, 'colegio:carta': b_pgCartaPlano,
  'alquimista:general': b_pgAlquimista, 'alquimista:copia': b_pgCopia,
  'villa:general': b_pgVilla, 'villa:caja': b_pgCaja,
  'nuevaYork:general': b_pgNuevaYork, 'nuevaYork:cajaFuerte': b_pgCajaFuerte,
};

const PG_DEL = {
  'gabinete:general': b_pgGabDelante, 'colegio:general': b_pgColDelante, 'alquimista:general': b_pgAlqDelante,
  'alquimista:copia': b_pgCopiaDelante, 'villa:general': b_pgVillaDelante, 'nuevaYork:general': b_pgNyDelante,
};

// la capa fija de un encuadre: se pinta una vez por lienzo y por variante en un búfer y luego se copia entera
const c_CACHE = new WeakMap();

function c_capa(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = new Map()));
  let b = m.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); m.set(clave, b); }
  R.copiar(b);
}

// mezcla dos colores: k = 0 deja a, k = 1 da b
function c_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// aclara (u oscurece) un píxel hacia el color c
function c_aclara(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c_mezcla(R.pget(x, y), c, a)); }

const c_lim = (u) => Math.max(0, Math.min(1, u));

// las cifras de 3 × 5 (y + - = ? : .), a escala e
const c_DIG = { 0: '111101101101111', 1: '010110010010111', 2: '111001111100111', 3: '111001111001111', 4: '101101111001001', 5: '111100111001111', 6: '111100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001111', '.': '000000000000010', '-': '000000111000000', '+': '000010111010000', '=': '000111000111000', '?': '111001011000010', ':': '000010000010000', '#': '101111101111101' };

function c_digitos(R, s, x, y, c, e = 1) { for (const ch of String(s)) { const g = c_DIG[ch]; if (g) for (let k = 0; k < 15; k++) if (g[k] === '1') { const px = x + (k % 3) * e, py = y + Math.floor(k / 3) * e; if (e === 1) R.pset(px, py, c); else R.rect(px, py, px + e - 1, py + e - 1, c); } x += 4 * e; } }

// los signos inventados de 3 × 4 (lazos, colas y horcas; ninguno es una letra) y un renglón de «palabras» de signos
const c_SIG = [['.#.', '#.#', '.##', '..#'], ['##.', '..#', '.#.', '##.'], ['#.#', '.#.', '#.#', '#..'], ['#..', '###', '#.#', '.##'],
  ['.##', '#..', '##.', '..#'], ['###', '.#.', '##.', '..#'], ['#.#', '###', '#.#', '..#'], ['.#.', '##.', '.##', '.#.'], ['##.', '#.#', '.##', '#..']];

function c_signo(R, x, y, k, c, e = 1) { const g = c_SIG[((k % c_SIG.length) + c_SIG.length) % c_SIG.length]; for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') { if (e === 1) R.pset(x + i, y + j, c); else R.rect(x + i * e, y + j * e, x + i * e + e - 1, y + j * e + e - 1, c); } }

function c_signos(R, x, y, n, semilla, c, xmax = 999) { for (let i = 0; i < n; i++) { if (x + 3 > xmax) return x; c_signo(R, x, y, Math.floor(h(i, semilla, 601) * 9), c); x += 4; if (h(i, semilla, 602) < 0.28) x += 3; } return x; }

// una nube de tres tonos que solo se pinta sobre el cielo (pasa por detrás de los tejados)
function c_nubeCielo(R, cx, cy, w, cols, esCielo) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.42, 1, r * 0.8], [0, -1, r], [w * 0.38, 0.5, r * 0.85], [w * 0.15, 1.5, r * 0.7]];
  const disco = (x0, y0, rr, c) => { for (let j = -Math.ceil(rr); j <= rr; j++) for (let i = -Math.ceil(rr); i <= rr; i++) if (i * i + j * j * 2 <= rr * rr) { const x = Math.round(x0 + i), y = Math.round(y0 + j); if (esCielo(x, y, R.pget(x, y))) R.pset(x, y, c); } };
  for (const [dx, dy, rr] of B) disco(cx + dx, cy + dy + 1, rr, cols[2]);
  for (const [dx, dy, rr] of B) disco(cx + dx, cy + dy, rr * 0.9, cols[1]);
  for (const [dx, dy, rr] of B) disco(cx + dx - 1, cy + dy - 1, rr * 0.55, cols[0]);
}

// una figura pequeña de fondo (unos 16 px de pie): cabeza, pelo, camisa, falda o pantalón; anda (piernas que se
// alternan), teclea (brazos al frente que se mueven) o lleva un montón de fichas
function c_figura(R, x, pie, t, f = {}) {
  const { rect, pset, disco } = R, piel = f.piel ?? hex('#e8b088'), cam = f.camisa ?? hex('#e8e4d8'), pan = f.pantalon ?? hex('#4a4a5a'), pelo = f.pelo ?? hex('#4a3020');
  const paso = f.anda ? Math.floor(t * 6) % 2 : 0, dir = f.dir ?? 1;
  if (!f.sentado) { rect(x - 2, pie - 5, x - 1, pie - (paso ? 1 : 0), pan); rect(x + 1, pie - 5, x + 2, pie - (paso ? 0 : 1), pan); rect(x - 2, pie, x - 1, pie, hex('#2a2024')); rect(x + 1, pie, x + 2, pie, hex('#2a2024')); }
  if (f.falda) rect(x - 3, pie - 7, x + 3, pie - 4, f.falda);
  rect(x - 3, pie - 12, x + 3, pie - 6, cam); rect(x + 3 * dir, pie - 12, x + 3 * dir, pie - 6, c_mezcla(cam, hex('#000000'), 0.25));
  if (f.tirantes) { pset(x - 2, pie - 11, f.tirantes); pset(x - 2, pie - 9, f.tirantes); pset(x + 2, pie - 11, f.tirantes); pset(x + 2, pie - 9, f.tirantes); }
  disco(x, pie - 15, 3, piel); rect(x - 3, pie - 18, x + 3, pie - 17, pelo); pset(x - 3 * dir, pie - 16, pelo); pset(x - 3 * dir, pie - 15, pelo);
  if (f.moño) disco(x - 3 * dir, pie - 17, 1.5, pelo);
  pset(x + 1 * dir, pie - 15, hex('#2a2024'));
  if (f.teclea) { const k = Math.floor(t * 9 + x) % 2; rect(x + 2 * dir, pie - 9 - k, x + 5 * dir, pie - 9 - k, cam); pset(x + 6 * dir, pie - 9 - k, piel); rect(x - 2 * dir, pie - 9 + k - 1, x + 1 * dir, pie - 9 + k - 1, cam); }
  if (f.fichas) { rect(x + 2 * dir, pie - 11, x + 6 * dir, pie - 8, hex('#f2e6bc')); for (let j = pie - 11; j <= pie - 8; j += 2) pset(x + 4 * dir, j, hex('#c8b890')); pset(x + 2 * dir, pie - 8, piel); }
}

const P_FIL = Object.fromEntries(Object.entries({
  techo: '#c4b898', techoS: '#b2a684', cornisa: '#d2c6a8', cornisaS: '#a89a7c',
  pared: '#5e7048', paredS: '#4e5e3c', paredL: '#6e8256', paredD: '#3a4630', rail: '#6a4428',
  nogal: '#5a3a24', nogalS: '#3e2616', nogalL: '#7a5234', nogalD: '#24160c', nogalB: '#9a6a40',
  suelo: '#8a5a32', sueloS: '#704626', sueloL: '#a26c3c', sueloD: '#4e2e18',
  alf: '#7a2430', alfS: '#5a1822', alfB: '#28325a', alfO: '#c8a050', alfL: '#a8404a',
  piz: '#2e3c34', pizS: '#27332c', pizL: '#3c4a42', tiza: '#e2e2d6', tizaS: '#a4aca0', tizaO: '#f0dc70',
  cortina: '#842a2c', cortinaS: '#5a1a1e', cortinaL: '#a8423e',
  marco: '#ddd4be', marcoS: '#a49c86', marcoL: '#f2ecdc', rad: '#8a8478', radS: '#5a564e', radL: '#b0aa9c',
  laton: '#c89a40', latonS: '#8a6420', latonL: '#f0d080',
  c1: '#6e9cc8', c2: '#98b8d4', c3: '#ccceba', t1: '#5a4a86', t2: '#c06a74', t3: '#f0a660',
  lejos: '#a0a8b6', lejosT: '#8a6a86', ladr: '#8a4a3c', ladrS: '#6a3830', ladrL: '#a65e48', piedra: '#c4b292', piedraS: '#8e7c62',
  humo: '#8e8e90', humoL: '#bebcb6', luz: '#fff2c8', luzT: '#ffb870', papel: '#ece4d0', papelS: '#c4bca6', foto: '#2a2a30',
}).map(([k, v]) => [k, hex(v)]));

const C_LIBROS = ['#7a2a2a', '#2a4a6a', '#3a5a3a', '#6a4a2a', '#8a6a3a', '#4a2a4a', '#2a3a3a', '#9a4a2a', '#5a5a3a', '#3a3a5a'].map(hex);

// el papel pintado de rombos con la flor en medio, más claro hacia la ventana (luzX)
function c_papel(R, x0, x1, y0, y1, luzX, tarde) {
  const P = P_FIL, luz = tarde ? P.luzT : P.luz;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const fila = Math.floor((y - y0) / 18) % 2, mx = ((x + (fila ? 8 : 0)) % 16), my = (y - y0) % 18, dx = Math.abs(mx - 8), dy = Math.abs(my - 9);
    let c = P.pared; const d = dx + dy * 0.85;
    if (d > 5.6 && d < 6.6) c = P.paredS; else if ((dx <= 1 && dy <= 2) || (dy === 0 && dx <= 2)) c = P.paredL; else if (mx === 0 && my % 3 === 0) c = P.paredS;
    if (h(x, y, 611) < 0.05) c = c_mezcla(c, P.paredD, 0.4);
    const k = Math.max(0, 1 - Math.abs(x - luzX) / 130) * (tarde ? 0.2 : 0.16) - (y - y0) * 0.0012;
    R.pset(x, y, k > 0 ? c_mezcla(c, luz, k) : c);
  }
}

// el friso de nogal con cuarterones (y0 la moldura, y1 el pie del zócalo)
function c_friso(R, y0, y1, paso = 36) {
  const { rect, pset } = R, P = P_FIL;
  rect(0, y0, 319, y1, P.nogal); rect(0, y0, 319, y0 + 2, P.nogalL); rect(0, y0, 319, y0, P.nogalB); rect(0, y0 + 3, 319, y0 + 3, P.nogalD);
  for (let x = 4 - paso; x < 320; x += paso) { const a = x + 3, b = x + paso - 4, ya = y0 + 6, yb = y1 - 7;
    rect(a, ya, b, yb, P.nogalS); rect(a + 1, ya + 1, b, yb, P.nogalL); rect(a + 2, ya + 2, b - 1, yb - 1, P.nogal);
    for (let y = ya + 3; y < yb - 1; y++) for (let i = a + 3; i < b - 2; i++) if (Math.sin(i * 0.31 + y * 1.7 + h(x, y, 612) * 2) > 0.92) pset(i, y, P.nogalS); }
  rect(0, y1 - 5, 319, y1, P.nogalS); rect(0, y1 - 5, 319, y1 - 5, P.nogalL); rect(0, y1, 319, y1, P.nogalD);
}

// el suelo de tablas con vetas y juntas al tresbolillo (filas: los cortes de cada hilada, de atrás adelante)
function c_tablas(R, filas) {
  const P = P_FIL;
  for (let r = 0; r < filas.length - 1; r++) { const y0 = filas[r], y1 = filas[r + 1] - 1; let x = -Math.floor(h(r, 1, 613) * 60);
    while (x < 320) { const L = 40 + Math.floor(h(r, x, 614) * 50) + r * 8, tono = h(r, x, 615), base = tono < 0.3 ? P.sueloS : tono > 0.8 ? P.sueloL : P.suelo;
      for (let y = y0; y <= y1; y++) for (let xx = Math.max(0, x); xx < Math.min(320, x + L); xx++) {
        const v = Math.sin(xx * 0.07 + y * 0.9 + tono * 20 + Math.sin(xx * 0.02 + tono * 9) * 2); let c = base;
        if (v > 0.86) c = c_mezcla(base, P.sueloD, 0.35); else if (v < -0.92) c = c_mezcla(base, P.sueloL, 0.35);
        if (y === y0) c = P.sueloD; else if (y === y0 + 1) c = c_mezcla(base, P.sueloL, 0.25);
        R.pset(xx, y, c); }
      if (x >= 0) R.rect(x, y0, x, y1, P.sueloD); x += L; } }
}

// una fila de libros en un estante (x0–x1, apoyados en yb, alto máximo hm) con lomos de colores, nervios dorados,
// alguno inclinado y algún montón tumbado
function c_libros(R, x0, x1, yb, hm, k) {
  const { rect, pset, linea } = R; let x = x0;
  while (x < x1 - 2) { const r = h(x, k, 616);
    if (r < 0.08 && x + 12 < x1) { for (let j = 0; j < 3; j++) { const w = 9 + Math.floor(h(x, j, 617) * 3), c = C_LIBROS[Math.floor(h(x, j, 618) * 10)]; rect(x, yb - 2 - j * 3, x + w, yb - j * 3, C.k); rect(x + 1, yb - 1 - j * 3, x + w - 1, yb - 1 - j * 3, c); pset(x + w - 2, yb - 1 - j * 3, P_FIL.papel); } x += 13; continue; }
    const w = 2 + Math.floor(h(x, k, 619) * 3), hb = Math.min(hm, 9 + Math.floor(h(x, k, 620) * 9)), c = C_LIBROS[Math.floor(h(x, k, 621) * 10)];
    if (r > 0.93 && x + 6 < x1) { for (let i = 0; i < hb; i++) { const xx = x + Math.round(i * 0.4); rect(xx, yb - i, xx + 2, yb - i, i === hb - 1 ? C.k : c); pset(xx + 3, yb - i, C.k); } x += 7; continue; }
    rect(x, yb - hb, x + w, yb, C.k); rect(x, yb - hb + 1, x + w - 1, yb, c); rect(x, yb - hb + 1, x, yb, c_mezcla(c, C.blanco, 0.25));
    if (w > 2) { pset(x + 1, yb - hb + 3, P_FIL.laton); pset(x + 1, yb - 3, P_FIL.laton); if (hb > 12) pset(x + 1, yb - hb + 6, c_mezcla(c, C.blanco, 0.4)); }
    x += w + 1; }
  linea(x0, yb + 1, x1, yb + 1, P_FIL.nogalD);
}

// la vista de Filadelfia por la ventana, fija (cielo tramado, ayuntamiento, casas de ladrillo, fábrica, depósito)
function c_vistaFila(R, x0, y0, x1, y1, tarde) {
  const { rect, pset, disco, poligono } = R, P = P_FIL, [k1, k2, k3] = tarde ? [P.t1, P.t2, P.t3] : [P.c1, P.c2, P.c3];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / (y1 - y0) + (h(x, y, 621) - 0.5) * 0.12; pset(x, y, u < 0.36 ? k1 : u < 0.68 ? k2 : k3); }
  if (tarde) disco(x0 + 12, y1 - 22, 6, hex('#fff0b0'));
  const lej = tarde ? P.lejosT : P.lejos;
  for (let x = x0; x <= x1; x += 4) { const hh = 8 + Math.floor(h(x >> 2, 1, 622) * 14); rect(x, y1 - 14 - hh, x + 3, y1, lej); if (h(x, 2, 622) < 0.4) rect(x + 1, y1 - 17 - hh, x + 1, y1 - 14 - hh, lej); }
  // el ayuntamiento: cuerpo, torre, el reloj, la cúpula y la estatua
  const cx = x1 - 13, pi = tarde ? hex('#d8a888') : P.piedra, ps = tarde ? hex('#8a5a6a') : P.piedraS;
  rect(cx - 9, y1 - 30, cx + 9, y1, ps); rect(cx - 9, y1 - 30, cx + 2, y1, pi); for (let y = y1 - 27; y < y1; y += 4) for (let x = cx - 7; x < cx + 8; x += 3) pset(x, y, tarde && h(x, y, 623) < 0.5 ? hex('#ffe08a') : ps);
  rect(cx - 4, y1 - 50, cx + 4, y1 - 30, ps); rect(cx - 4, y1 - 50, cx, y1 - 30, pi); for (let y = y1 - 47; y < y1 - 32; y += 4) pset(cx - 1, y, ps);
  rect(cx - 5, y1 - 56, cx + 5, y1 - 50, pi); disco(cx, y1 - 53, 2, hex('#f2ecd8')); pset(cx, y1 - 53, C.k); pset(cx, y1 - 54, C.k);
  poligono([[cx - 4, y1 - 56], [cx, y1 - 64], [cx + 4, y1 - 56]], ps); rect(cx - 3, y1 - 59, cx, y1 - 57, pi);
  rect(cx, y1 - 68, cx, y1 - 64, hex('#4a4a40')); pset(cx - 1, y1 - 66, hex('#4a4a40')); pset(cx + 1, y1 - 67, hex('#4a4a40'));
  // la chimenea de la fábrica, con sus anillos
  const fx = x0 + 9; rect(fx - 2, y1 - 56, fx + 2, y1 - 14, P.ladrS); rect(fx - 2, y1 - 56, fx, y1 - 14, P.ladr); for (let y = y1 - 52; y < y1 - 14; y += 8) rect(fx - 2, y, fx + 2, y, P.ladrS); rect(fx - 3, y1 - 57, fx + 3, y1 - 56, hex('#3a2a2a'));
  // las casas de ladrillo con cornisa, ventanas y chimeneas
  for (let k = 0; k < 5; k++) { const a = x0 + k * 11 - 2, b = a + 10, top = y1 - 22 + Math.floor(h(k, 3, 624) * 6);
    rect(a, top, b, y1, k % 2 ? P.ladr : P.ladrS); rect(a, top, b, top, hex('#d8ccb0')); rect(a, top + 1, b, top + 1, P.ladrS);
    for (let y = top + 4; y < y1 - 2; y += 5) for (let x = a + 2; x < b - 1; x += 4) { rect(x, y, x + 1, y + 2, tarde && h(x, y, 625) < 0.45 ? hex('#ffd880') : hex('#2a2a3a')); pset(x, y + 3, hex('#d8ccb0')); }
    if (h(k, 4, 624) < 0.7) { const chx = a + 2 + Math.floor(h(k, 5, 624) * 6); rect(chx, top - 4, chx + 2, top - 1, P.ladrS); rect(chx, top - 5, chx + 2, top - 5, hex('#3a2a2a')); } }
  // el depósito de agua de madera sobre el tejado de enfrente y el pretil
  const dx = x0 + 22; rect(dx - 5, y1 - 26, dx + 5, y1 - 16, hex('#6a4a30')); for (let x = dx - 4; x <= dx + 4; x += 2) rect(x, y1 - 25, x, y1 - 17, hex('#7e5a3a')); rect(dx - 5, y1 - 23, dx + 5, y1 - 23, hex('#2a2a2a')); rect(dx - 5, y1 - 19, dx + 5, y1 - 19, hex('#2a2a2a'));
  poligono([[dx - 6, y1 - 26], [dx, y1 - 31], [dx + 6, y1 - 26]], hex('#4a3a2a')); for (const lx of [dx - 4, dx + 4]) rect(lx, y1 - 16, lx, y1 - 8, hex('#2a2a2a'));
  rect(x0, y1 - 8, x1, y1, hex('#5a4a44')); rect(x0, y1 - 8, x1, y1 - 8, hex('#8a7a6a')); for (let x = x0; x <= x1; x += 3) pset(x, y1 - 5, hex('#4a3c38'));
}

// lo que se mueve por la ventana: nubes, humo, palomas que cruzan y la paloma del alféizar
function c_vidaVentana(R, t, x0, y0, x1, y1, barras, tarde) {
  const P = P_FIL, cielos = tarde ? [P.t1, P.t2, P.t3] : [P.c1, P.c2, P.c3];
  const enCristal = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1 && !barras.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);
  const esCielo = (x, y, p) => enCristal(x, y) && cielos.includes(p);
  const nubes = tarde ? [hex('#f8d8b8'), hex('#e8a094'), hex('#a8708a')] : [hex('#ffffff'), hex('#e2e8f0'), hex('#b4c2d4')];
  const W = x1 - x0 + 60;
  [[0.8, 36, 18, 0], [1.4, 44, 13, 25], [2.2, 52, 10, 50], [1.1, 40, 15, 70]].forEach(([v, y, w, d]) => c_nubeCielo(R, x0 - 30 + ((t * v + d) % W), y0 + y - 31, w, nubes, esCielo));
  // el humo de la fábrica y de las chimeneas, empujado por el viento hacia la derecha
  const P1 = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (enCristal(x, y)) R.pset(x, y, c); };
  const humo = (sx, sy, n, alto, esc) => { for (let p = 0; p < n; p++) { const u = (t * 0.22 + p / n) % 1, x = sx + u * 22 * esc + Math.sin(t * 1.3 + p) * 1.5, y = sy - u * alto, r = (1 + u * 4) * esc, c = u < 0.4 ? P.humo : P.humoL;
    for (let j = -Math.ceil(r); j <= r; j++) for (let i = -Math.ceil(r); i <= r; i++) if (i * i + j * j <= r * r && (u < 0.6 || (i + j + Math.floor(t * 4)) % 2 === 0)) P1(x + i, y + j, c); } };
  humo(x0 + 9, y1 - 59, 7, 22, 1); humo(x0 + 26, y1 - 30, 4, 10, 0.6); humo(x0 + 42, y1 - 28, 4, 9, 0.5);
  // tres palomas que cruzan aleteando
  for (let k = 0; k < 3; k++) { const u = ((t * 9 + k * 23) % 90), x = x0 - 10 + u, y = y0 + 12 + k * 5 + Math.round(Math.sin(t * 2 + k) * 2), al = Math.floor(t * 8 + k) % 2, c = tarde ? hex('#3a2a3a') : hex('#4a4a56');
    P1(x, y, c); P1(x + 1, y, c); P1(x - 1, y - al, c); P1(x - 2, y - 1 + al * 2 - al, c); P1(x + 2, y - al, c); P1(x + 3, y - 1 + al, c); }
  // la paloma del alféizar, que picotea
  { const px = x1 - 28, py = y1 - 1, pic = (t % 2.4) < 0.5 ? 2 : 0;
    for (const [i, j, c] of [[0, -2, hex('#8a8a96')], [1, -2, hex('#8a8a96')], [2, -2, hex('#9a9aa8')], [-1, -1, hex('#6a6a76')], [0, -1, hex('#a8a8b4')], [1, -1, hex('#a8a8b4')], [2, -1, hex('#8a8a96')], [3, -1, hex('#6a6a76')], [1, 0, hex('#c87a5a')], [2, 0, hex('#c87a5a')]]) P1(px + i, py + j, c);
    P1(px + 3, py - 3 + pic, hex('#6a7a8a')); P1(px + 4, py - 3 + pic, hex('#5a8a6a')); P1(px + 5, py - 3 + pic, hex('#d8a040')); P1(px + 4, py - 4 + pic, hex('#6a7a8a')); }
}

// el reloj de pared con su caja de péndulo (cx el eje, y0 lo alto del copete): fijo
function c_relojFijo(R, cx, y0) {
  const { rect, pset, disco, poligono } = R, P = P_FIL;
  poligono([[cx - 10, y0 + 6], [cx, y0], [cx + 10, y0 + 6]], P.nogalS); poligono([[cx - 8, y0 + 5], [cx, y0 + 1], [cx + 8, y0 + 5]], P.nogalL); rect(cx - 10, y0 + 6, cx + 10, y0 + 7, P.nogalD);
  rect(cx - 9, y0 + 8, cx + 9, y0 + 25, P.nogalS); rect(cx - 8, y0 + 8, cx + 8, y0 + 24, P.nogal);
  disco(cx, y0 + 16, 8, P.latonS); disco(cx, y0 + 16, 7, P.laton); disco(cx, y0 + 16, 6, hex('#efe6cc'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 5), Math.round(y0 + 16 + Math.sin(a) * 5), k % 3 ? hex('#8a8070') : C.k); }
  rect(cx - 8, y0 + 26, cx + 8, y0 + 60, P.nogalS); rect(cx - 7, y0 + 26, cx + 7, y0 + 59, P.nogal); rect(cx - 7, y0 + 26, cx - 7, y0 + 59, P.nogalL);
  rect(cx - 5, y0 + 28, cx + 5, y0 + 55, hex('#24180e')); for (let j = 0; j < 22; j += 2) pset(cx - 4 + (j >> 2), y0 + 30 + j, hex('#4a3a2a'));
  for (const wx of [cx - 3, cx + 3]) { rect(wx - 1, y0 + 31, wx + 1, y0 + 37, P.latonS); rect(wx - 1, y0 + 31, wx, y0 + 37, P.laton); }
  poligono([[cx - 6, y0 + 60], [cx, y0 + 66], [cx + 6, y0 + 60]], P.nogalS); disco(cx, y0 + 64, 1, P.laton);
}

// lo que se mueve del reloj: agujas (la del segundero) y el péndulo de latón
function c_relojVivo(R, t, cx, y0) {
  const { linea, disco, pset } = R, P = P_FIL, cy = y0 + 16;
  const a = (10.2 / 12) * Math.PI * 2 - Math.PI / 2, m = (t / 3600 + 0.62) * Math.PI * 2 - Math.PI / 2, s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(a) * 3), Math.round(cy + Math.sin(a) * 3), C.k); linea(cx, cy, Math.round(cx + Math.cos(m) * 5), Math.round(cy + Math.sin(m) * 5), C.k);
  linea(cx, cy, Math.round(cx + Math.cos(s) * 5), Math.round(cy + Math.sin(s) * 5), hex('#a83a2a')); pset(cx, cy, P.latonS);
  const an = Math.sin(t * Math.PI) * 0.22, bx = Math.round(cx + Math.sin(an) * 20), by = Math.round(y0 + 30 + Math.cos(an) * 20);
  linea(cx, y0 + 29, bx, by, P.latonS); disco(bx, by, 3, P.latonS); disco(bx, by, 2, P.laton); pset(bx - 1, by - 1, P.latonL);
}

// el despacho de Filadelfia: la capa fija
function c_despachoFijo(R, tarde, año) {
  const { rect, pset, disco, linea, poligono } = R, P = P_FIL;
  // el techo y la cornisa de dentículos (tranquilos bajo la barra del año)
  rect(0, 0, 319, 12, P.techo); for (let x = 16; x < 320; x += 64) rect(x, 0, x, 10, P.techoS); rect(0, 11, 319, 11, P.techoS);
  rect(0, 12, 319, 18, P.cornisa); rect(0, 14, 319, 14, P.cornisaS); for (let x = 0; x < 320; x += 5) rect(x, 16, x + 2, 17, P.cornisaS); rect(0, 18, 319, 18, P.cornisaS);
  // el papel pintado, la moldura de colgar cuadros y el friso
  c_papel(R, 0, 319, 19, 99, 222, tarde);
  rect(0, 23, 319, 24, P.rail); rect(0, 23, 319, 23, P.nogalB);
  c_friso(R, 100, 124);
  // el suelo de tablas
  c_tablas(R, [125, 128, 132, 137, 143, 150, 158, 167, 180]);
  for (let x = 0; x < 320; x++) { c_aclara(R, x, 125, P.nogalD, 0.5); c_aclara(R, x, 126, P.nogalD, 0.25); }
  // el reflejo de la ventana en el suelo encerado
  for (let y = 126; y < 142; y++) for (let x = 198 - (y - 126); x < 250 - (y - 126); x++) if ((x + y) % 2 === 0) c_aclara(R, x, y, tarde ? P.luzT : P.luz, 0.22 - (y - 126) * 0.012);
  // la alfombra persa: cenefa azul con su greca dorada, el campo granate con el medallón y los flecos
  { const q = (a, b) => poligono(a, b);
    q([[72, 136], [172, 136], [184, 172], [58, 172]], P.alfB); q([[75, 138], [169, 138], [180, 170], [62, 170]], P.alfO); q([[77, 139], [167, 139], [177, 169], [65, 169]], P.alfB);
    q([[81, 141], [163, 141], [172, 166], [70, 166]], P.alf);
    for (let y = 142; y < 166; y++) for (let x = 70; x < 173; x++) { if (R.pget(x, y) !== P.alf) continue; if ((x * 3 + y * 5) % 11 === 0) pset(x, y, P.alfL); else if ((x + y * 2) % 13 === 0) pset(x, y, P.alfS); }
    q([[121, 144], [138, 153], [121, 162], [104, 153]], P.alfB); q([[121, 147], [132, 153], [121, 159], [110, 153]], P.alfO); q([[121, 149], [128, 153], [121, 157], [114, 153]], P.alfS); pset(121, 153, P.alfO);
    for (let x = 64; x < 180; x += 2) { const yy = 137 + Math.round((x - 64) * 0); if (x > 72 && x < 172) pset(x, 135, P.papelS); pset(x - 6 + Math.round((x - 64) * 0.1), 173, P.papel); }
    for (let x = 60; x < 182; x += 4) for (let y = 140; y < 168; y += 9) { if (R.pget(x, y) === P.alfB) pset(x, y, P.alfO); } }
  // la sombra de los muebles en el suelo
  for (let y = 125; y < 130; y++) for (let x = 0; x < 64; x++) c_aclara(R, x, y, P.sueloD, 0.35);

  // la librería alta: costados, copete, fondo oscuro, baldas con libros, el globo, el busto y el armarito
  rect(0, 19, 62, 21, P.nogalS); rect(0, 19, 62, 19, P.nogalB); rect(1, 22, 61, 124, P.nogalD);
  rect(1, 22, 5, 124, P.nogal); rect(1, 22, 1, 124, P.nogalL); rect(57, 22, 61, 124, P.nogal); rect(61, 22, 61, 124, P.nogalS);
  rect(6, 23, 56, 104, hex('#1c120a'));
  const baldas = [42, 62, 82, 102];
  for (const y of baldas) { rect(6, y, 56, y + 2, P.nogal); rect(6, y, 56, y, P.nogalB); rect(6, y + 2, 56, y + 2, P.nogalS); }
  c_libros(R, 7, 40, 41, 16, 1);
  disco(48, 33, 6, C.k); disco(48, 33, 5, hex('#5a8aa8')); for (const [i, j] of [[-2, -2], [-1, -2], [-3, 0], [-2, 0], [0, 1], [1, 2], [2, -1], [1, -3]]) pset(48 + i, 33 + j, hex('#c8b070')); pset(46, 31, C.blanco);
  R.anillo(48, 33, 6, P.laton); rect(47, 39, 49, 41, P.latonS);
  c_libros(R, 7, 56, 61, 17, 2); c_libros(R, 7, 38, 81, 17, 3);
  disco(47, 71, 4, hex('#e8e2d4')); rect(44, 75, 50, 79, hex('#e8e2d4')); rect(42, 79, 52, 81, hex('#c8c0b0')); pset(46, 70, hex('#b8b0a0')); pset(48, 70, hex('#b8b0a0')); rect(50, 68, 51, 73, hex('#c8c0b0'));
  c_libros(R, 7, 56, 101, 17, 4);
  rect(6, 105, 56, 123, P.nogal); for (const a of [7, 32]) { rect(a, 106, a + 23, 122, P.nogalS); rect(a + 1, 107, a + 23, 122, P.nogalL); rect(a + 2, 108, a + 22, 121, P.nogal); disco(a + (a < 20 ? 21 : 3), 114, 1, P.laton); }

  // la pizarra: marco, pizarra con borrones, renglones de signos, el signo ampliado con flechas, la tabla y el «?»
  rect(66, 28, 164, 92, P.nogalS); rect(67, 29, 163, 91, P.nogal); rect(67, 29, 163, 29, P.nogalB);
  rect(70, 32, 160, 88, P.piz);
  for (let y = 32; y <= 88; y++) for (let x = 70; x <= 160; x++) { const s = Math.sin((x + y * 0.6) * 0.21 + h(x >> 3, y >> 3, 631) * 4); if (s > 0.86 && h(x, y, 632) < 0.7) pset(x, y, P.pizL); else if (h(x, y, 633) < 0.04) pset(x, y, P.pizS); }
  for (const y of [36, 42, 48]) c_signos(R, 73, y, 12, y, P.tiza, 116);
  { const T = P.tiza; R.anillo(84, 63, 7, T); R.anillo(84, 63, 6, T); linea(90, 67, 96, 80, T); linea(91, 67, 97, 80, T); linea(96, 80, 99, 79, T);
    for (const [x, y] of [[80, 57], [89, 60], [79, 68]]) { pset(x, y, P.piz); pset(x + 1, y + 1, P.piz); }
    linea(102, 66, 112, 66, T); linea(110, 64, 112, 66, T); linea(110, 68, 112, 66, T); c_digitos(R, '=', 115, 64, T); c_digitos(R, '174', 121, 64, T); c_digitos(R, '?', 135, 64, P.tizaO); }
  { const T = P.tizaS; for (let j = 0; j <= 4; j++) linea(122, 34 + j * 6, 156, 34 + j * 6, T); for (let i = 0; i <= 3; i++) linea(122 + i * 11, 34, 122 + i * 11, 58, T);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { if (i === 0) c_signo(R, 126, 35 + j * 6, j * 3 + 1, P.tiza); else c_digitos(R, String(Math.floor(h(i, j, 634) * 90) + 10), 125 + i * 11, 35 + j * 6, P.tiza); } }
  rect(74, 74, 88, 86, P.tizaS); rect(75, 75, 87, 85, P.piz); linea(81, 75, 81, 85, P.tizaS); c_signos(R, 76, 77, 2, 9, P.tiza, 80); c_signos(R, 83, 77, 1, 4, P.tiza, 87);
  c_digitos(R, '1921', 96, 80, P.tizaS); c_digitos(R, '?', 144, 74, P.tiza, 2);
  rect(64, 92, 166, 95, P.nogalS); rect(64, 92, 166, 92, P.nogalL);
  for (const [x, w] of [[78, 4], [90, 3], [150, 5]]) { rect(x, 91, x + w, 92, C.blanco); pset(x + w, 92, P.tizaS); }
  rect(118, 89, 128, 92, hex('#6a5040')); rect(118, 91, 128, 92, hex('#9a9a9a'));

  // el calendario de taco con el año y el día en rojo
  pset(175, 31, P.latonS); linea(175, 31, 168, 35, hex('#6a5a4a')); linea(175, 31, 182, 35, hex('#6a5a4a'));
  rect(166, 35, 184, 61, P.papelS); rect(167, 35, 184, 60, P.papel); rect(167, 35, 184, 41, hex('#7a2a2a'));
  c_digitos(R, String(año), 168, 36, P.papel); c_digitos(R, '14', 169, 44, hex('#a83a2a'), 2);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) pset(169 + i * 3, 56 + j * 2, P.papelS);
  rect(184, 36, 184, 60, hex('#9a927e'));

  // la ventana de guillotina: la vista, el estor, el marco, las cortinas, la galería, el alféizar y el radiador
  c_vistaFila(R, 197, 31, 249, 95, tarde);
  rect(197, 31, 249, 35, hex('#e2d6b4')); rect(197, 35, 249, 35, hex('#b8ac8a')); disco(223, 37, 1, P.laton); linea(223, 35, 223, 36, P.latonS);
  rect(193, 27, 253, 30, P.marco); rect(193, 27, 196, 98, P.marco); rect(250, 27, 253, 98, P.marco); rect(193, 95, 253, 98, P.marco);
  rect(193, 60, 253, 63, P.marco); rect(222, 31, 224, 95, P.marco);
  rect(196, 31, 196, 95, P.marcoS); rect(253, 27, 253, 98, P.marcoS); rect(193, 63, 253, 63, P.marcoS); rect(224, 31, 224, 95, P.marcoS); rect(193, 27, 253, 27, P.marcoL);
  rect(220, 60, 226, 61, P.latonS); rect(221, 60, 225, 60, P.laton);
  for (const [px, py] of [[200, 33], [226, 33], [200, 66], [226, 66]]) for (let i = 0; i < 9; i += 1) if (i % 3 !== 2) c_aclara(R, px + 8 + i, py + 14 - i * 2 + 6, C.blanco, 0.2);
  // las cortinas de terciopelo con sus pliegues, recogidas con un cordón dorado
  const cortina = (a, b, rec) => { for (let y = 22; y <= 112; y++) { const est = y < 72 ? (y - 22) / 50 : 1 - (y - 72) / 60, ancho = Math.round((b - a) * (y < 72 ? 1 - est * 0.4 : 0.6 + (1 - est) * 0.4)), x0 = rec < 0 ? a : b - ancho;
    for (let x = x0; x <= x0 + ancho; x++) { const f = (x - x0 + Math.round(y * 0.05)) % 5; pset(x, y, f === 0 ? P.cortinaS : f === 2 ? P.cortinaL : P.cortina); } pset(rec < 0 ? x0 + ancho + 1 : x0 - 1, y, P.cortinaS); }
    const tx = rec < 0 ? a + 4 : b - 4; rect(tx - 4, 71, tx + 4, 73, P.laton); rect(tx - 4, 73, tx + 4, 73, P.latonS); rect(tx + (rec < 0 ? 3 : -3), 74, tx + (rec < 0 ? 4 : -4), 78, P.laton); };
  cortina(184, 196, -1); cortina(250, 262, 1);
  rect(181, 21, 265, 22, P.latonS); rect(181, 21, 265, 21, P.laton); disco(181, 21, 2, P.laton); disco(265, 21, 2, P.laton);
  rect(183, 23, 263, 28, P.cortina); rect(183, 23, 263, 23, P.cortinaL); for (let x = 186; x < 262; x += 8) { disco(x + 3, 28, 4, P.cortina); R.anillo(x + 3, 28, 4, P.cortinaS); }
  rect(183, 23, 263, 26, P.cortina); for (let x = 184; x < 263; x += 2) pset(x, 33 - Math.abs(((x - 183) % 8) - 4) * 0.5 | 0, P.laton);
  rect(190, 98, 256, 101, P.marco); rect(190, 98, 256, 98, P.marcoL); rect(190, 101, 256, 101, P.marcoS); rect(192, 102, 254, 103, P.paredD);
  for (let x = 200; x <= 246; x += 3) { rect(x, 105, x + 2, 121, P.radS); rect(x, 106, x + 1, 121, P.rad); rect(x, 106, x, 120, P.radL); pset(x + 1, 105, P.rad); }
  rect(199, 110, 248, 110, P.radS); rect(199, 118, 248, 118, P.radS); rect(198, 121, 249, 123, P.radS); rect(201, 122, 203, 124, C.k); rect(244, 122, 246, 124, C.k);
  disco(196, 116, 2, P.laton); pset(196, 116, P.latonS); rect(196, 119, 197, 124, P.radS);
  for (let y = 105; y < 124; y++) c_aclara(R, 250, y, C.k, 0.3);

  // el reloj de pared y el perchero con el bombín y el abrigo
  c_relojFijo(R, 280, 48);
  rect(306, 58, 308, 146, P.nogalS); rect(306, 58, 306, 146, P.nogalL); disco(307, 57, 2, P.nogalL);
  for (const [a, b] of [[300, 62], [314, 62]]) { linea(307, 64, a, b, P.nogalS); pset(a, b - 1, P.nogalS); }
  poligono([[299, 68], [315, 68], [318, 112], [296, 112]], hex('#4a4e5a')); poligono([[300, 70], [306, 70], [303, 110], [297, 110]], hex('#5a5e6a'));
  linea(307, 68, 305, 92, hex('#363a44')); linea(307, 68, 309, 92, hex('#363a44')); for (let y = 75; y < 110; y += 6) pset(302 + (y % 4), y, hex('#363a44')); disco(310, 80, 1, hex('#2a2a30')); disco(310, 88, 1, hex('#2a2a30'));
  disco(301, 61, 4, hex('#24242a')); rect(296, 63, 306, 64, hex('#24242a')); rect(297, 62, 305, 62, hex('#4a3a2a')); pset(299, 59, hex('#4a4a56'));
  for (const dx of [-6, 0, 6]) linea(307, 140, 307 + dx, 146, P.nogalS);
  // la pila de periódicos en el suelo y una hoja suelta
  for (let j = 0; j < 7; j++) { const xx = 160 + (j % 2), y = 145 - j * 2; rect(xx, y, xx + 19, y + 1, P.papelS); rect(xx + 1, y, xx + 18, y, P.papel); }
  rect(161, 132, 179, 132, P.papel); for (let i = 0; i < 4; i++) rect(162 + i * 4, 132, 164 + i * 4, 132, C.k);
  poligono([[140, 147], [156, 145], [158, 150], [142, 152]], P.papel); linea(144, 148, 152, 147, hex('#5a5a5a')); linea(145, 150, 154, 149, P.papelS);
  // el haz de sol que entra en diagonal (más largo y cálido por la tarde), tramado
  const L = tarde ? P.luzT : P.luz;
  for (let y = 40; y < 146; y++) { const u = (y - 40) / 106, a = Math.round(lerp(198, tarde ? 120 : 140, u)), b = Math.round(lerp(248, tarde ? 172 : 190, u));
    for (let x = a; x <= b; x++) if ((x + y) % 2 === 0 && !(x >= 197 && x <= 249 && y <= 95)) c_aclara(R, x, y, L, tarde ? 0.12 : 0.09); }
}

function c_despacho(R, t, o) {
  const tarde = !!o.tarde, año = o.año ?? 1921, P = P_FIL;
  c_capa(R, 'fila|' + tarde + '|' + año, () => c_despachoFijo(R, tarde, año));
  c_vidaVentana(R, t, 197, 31, 249, 95, [[193, 60, 253, 63], [222, 31, 224, 95], [197, 31, 249, 35]], tarde);
  c_relojVivo(R, t, 280, 48);
  // el vapor del radiador: un soplo cada pocos segundos por la válvula
  { const u = (t % 5.5) / 1.6; if (u < 1) for (let p = 0; p < 5; p++) { const v = c_lim(u * 1.4 - p * 0.12); if (v <= 0 || v >= 1) continue; const x = Math.round(194 - v * 4 + Math.sin(t * 6 + p) * 1), y = Math.round(113 - v * 16); c_aclara(R, x, y, C.blanco, 0.55 * (1 - v)); c_aclara(R, x + 1, y, C.blanco, 0.4 * (1 - v)); c_aclara(R, x, y - 1, C.blanco, 0.3 * (1 - v)); } }
  // las motas de polvo del haz de sol
  for (let k = 0; k < 16; k++) { const u = ((h(k, 1, 641) + t * (0.015 + h(k, 2, 641) * 0.02)) % 1), y = Math.round(44 + u * 98), a = lerp(198, tarde ? 120 : 140, (y - 40) / 106), b = lerp(248, tarde ? 172 : 190, (y - 40) / 106), x = Math.round(a + (b - a) * h(k, 3, 641) + Math.sin(t * 0.7 + k) * 3);
    if (Math.sin(t * 2 + k * 1.7) > -0.3) c_aclara(R, x, y, C.blanco, 0.6); }
  // la mosca pequeña que zumba por el cuarto
  if (o.moscaVuela !== false) { const x = Math.round(150 + Math.sin(t * 1.3) * 34 + Math.sin(t * 5.1) * 6), y = Math.round(78 + Math.sin(t * 1.9 + 1) * 20 + Math.cos(t * 6.3) * 4);
    R.pset(x, y, C.k); R.pset(x + 1, y, C.k); if (Math.floor(t * 24) % 2) { R.pset(x, y - 1, hex('#c8ccd8')); R.pset(x + 1, y - 1, hex('#c8ccd8')); } else { R.pset(x - 1, y - 1, hex('#c8ccd8')); R.pset(x + 2, y - 1, hex('#c8ccd8')); } }
  // los periódicos que salen volando de la pila
  const v = o.vuelan ?? 0;
  if (v > 0) for (let k = 0; k < 6; k++) { const u = c_lim(v * 1.5 - k * 0.1); if (u <= 0 || u >= 1) continue;
    const x = lerp(170, 30 + k * 38, u), y = 136 - Math.sin(u * Math.PI * 0.85) * (70 + k * 6) - u * 40, gira = Math.cos(t * 7 + k * 1.3), w = Math.max(2, Math.round(Math.abs(gira) * 10)), alto = 7;
    const x0 = Math.round(x - w), y0 = Math.round(y), sk = Math.round(Math.sin(t * 5 + k) * 2);
    R.poligono([[x0, y0 + sk], [x0 + 2 * w, y0 - sk], [x0 + 2 * w, y0 - sk + alto], [x0, y0 + sk + alto]], gira > 0 ? P.papel : P.papelS);
    if (gira > 0 && w > 4) { R.rect(x0 + 2, y0 + 2, x0 + 2 * w - 3, y0 + 2, C.k); R.rect(x0 + 2, y0 + 4, x0 + w, y0 + 5, hex('#5a5a5a')); R.rect(x0 + w + 2, y0 + 4, x0 + 2 * w - 2, y0 + 4, P.papelS); } }
  return { suelo: 146, libre: [64, 176], escritorio: [182, 312, 133], microscopio: [204, 137], pizarra: [70, 32, 160, 88], ventana: [197, 31, 249, 95], periodicos: [170, 138] };
}

// el escritorio de Newbold por delante, y el respaldo del sillón de cuero (despacho general)
function c_escritorio(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = P_FIL, tarde = !!o.tarde, lamp = o.lampara ?? tarde;
  // el tablero con su canto y el secante de cuero verde
  rect(180, 132, 314, 140, C.k); rect(181, 133, 313, 137, P.nogalL); for (let x = 182; x < 313; x++) if (Math.sin(x * 0.4 + h(x >> 3, 1, 651) * 6) > 0.8) pset(x, 134 + (x % 3), P.nogal);
  rect(222, 133, 272, 136, hex('#2e5a3e')); rect(222, 133, 272, 133, hex('#4a7a5a')); rect(222, 133, 226, 136, hex('#5a3a24')); rect(268, 133, 272, 136, hex('#5a3a24'));
  rect(181, 138, 313, 139, P.nogal); rect(181, 138, 313, 138, P.nogalB);
  // el frente: dos cajoneras con tres cajones y tiradores de latón, el hueco de las rodillas con el panel tallado
  rect(184, 141, 310, 179, P.nogalS);
  for (const [a, b] of [[186, 226], [268, 308]]) { rect(a, 141, b, 179, P.nogal); rect(a, 141, a, 179, P.nogalL);
    for (const y of [143, 156, 169]) { rect(a + 2, y, b - 2, y + 10, P.nogalD); rect(a + 3, y + 1, b - 2, y + 10, P.nogalL); rect(a + 4, y + 2, b - 3, y + 9, P.nogal);
      for (let x = a + 5; x < b - 4; x++) if (Math.sin(x * 0.25 + y) > 0.9) pset(x, y + 5, P.nogalS);
      const mx = (a + b) >> 1; rect(mx - 4, y + 5, mx + 4, y + 6, P.latonS); rect(mx - 4, y + 5, mx + 4, y + 5, P.laton); pset(mx - 5, y + 5, P.latonS); pset(mx + 5, y + 5, P.latonS); } }
  rect(228, 141, 266, 179, P.nogalD); rect(230, 143, 264, 160, P.nogalS); rect(232, 145, 262, 158, P.nogal); poligono([[247, 147], [258, 152], [247, 157], [236, 152]], P.nogalL); poligono([[247, 149], [253, 152], [247, 155], [241, 152]], P.nogalS);
  // el microscopio de latón con su caja de portaobjetos
  if (PIEZAS_VM.microscopio) PIEZAS_VM.microscopio(R, o.microscopioX ?? 204, 137, { t });
  rect(186, 130, 196, 133, C.k); rect(187, 130, 195, 132, hex('#6a4a2a')); rect(187, 130, 195, 130, hex('#8a6a3a')); for (let x = 189; x < 194; x += 2) pset(x, 131, hex('#c8d8e0'));
  rect(212, 131, 218, 131, hex('#c8e0e8')); pset(215, 131, hex('#5a3a24'));
  // el periódico doblado
  poligono([[226, 132], [244, 131], [245, 133], [227, 134]], P.papel); rect(229, 132, 240, 132, C.k);
  // el atril con los fotostatos negros (signos en blanco)
  linea(252, 136, 256, 112, P.nogalS); rect(250, 112, 266, 132, C.k); rect(251, 113, 265, 131, P.foto);
  for (let y = 115; y < 130; y += 3) c_signos(R, 252, y, 4, y + 7, hex('#d8d8d0'), 264);
  rect(249, 132, 267, 133, P.nogalS);
  // los libros apilados, el tintero con la pluma y la taza que humea
  for (let j = 0; j < 4; j++) { const c = C_LIBROS[(j * 3 + 1) % 10]; rect(270 + (j % 2), 133 - j * 3 - 2, 286 - (j % 2), 133 - j * 3, C.k); rect(271 + (j % 2), 132 - j * 3 - 1, 285 - (j % 2), 132 - j * 3, c); rect(283 - (j % 2), 132 - j * 3 - 1, 285 - (j % 2), 132 - j * 3, P.papel); }
  if (PIEZAS_VM.tintero) PIEZAS_VM.tintero(R, 240, 137, { pluma: true });
  rect(186, 135, 196, 136, P.papelS); rect(188, 133, 194, 135, C.blanco); rect(195, 133, 196, 134, C.blanco); pset(188, 133, hex('#d8d0c0'));
  for (let p = 0; p < 4; p++) { const u = (t * 0.5 + p / 4) % 1; c_aclara(R, Math.round(191 + Math.sin(t * 3 + p * 2) * 1.5 + u * 2), Math.round(131 - u * 12), C.blanco, 0.5 * (1 - u)); }
  // la lámpara de banquero: pie de latón, tulipa verde (encendida, su luz en el tablero)
  rect(290, 134, 302, 136, P.latonS); rect(291, 134, 301, 134, P.laton); rect(295, 120, 296, 134, P.latonS); rect(295, 120, 295, 133, P.laton);
  poligono([[286, 122], [290, 116], [302, 116], [306, 122]], C.k); poligono([[287, 121], [291, 117], [301, 117], [305, 121]], hex('#2a7a4a')); rect(292, 117, 300, 117, hex('#6ac08a')); rect(287, 121, 305, 122, lamp ? hex('#fff0a0') : hex('#1e4a30'));
  if (lamp) { for (let y = 123; y < 140; y++) for (let x = 278 - (y - 123); x <= 314 + (y - 123) * 0.3; x++) if ((x + y) % 2 === 0 && x > 180 && x < 314) c_aclara(R, x, y, hex('#fff0b0'), 0.18 * (1 - (y - 123) / 18)); for (let x = 287; x <= 305; x++) c_aclara(R, x, 115, hex('#fff0a0'), 0.25); }
  // el respaldo del sillón Chester de cuero, con capitoné y tachuelas
  poligono([[0, 152], [10, 148], [30, 148], [40, 154], [40, 179], [0, 179]], C.k); poligono([[0, 153], [10, 149], [30, 149], [39, 155], [39, 179], [0, 179]], hex('#6a2a1e'));
  for (let y = 156; y < 180; y += 7) for (let x = 4 + ((y / 7) % 2) * 4; x < 38; x += 8) { pset(x, y, hex('#3a140e')); pset(x - 1, y - 2, hex('#8a3a2a')); pset(x + 1, y - 2, hex('#8a3a2a')); }
  for (let x = 2; x < 38; x += 3) pset(x, 152 + (x < 10 ? 0 : x > 30 ? Math.round((x - 30) * 0.6) : -2) + 1, P.laton);
  rect(0, 150, 26, 151, hex('#8a3a2a'));
  return { tablero: 133, microscopio: [o.microscopioX ?? 204, 137], lampara: [296, 116] };
}

const c_OCU = { cx: 160, cy: 90, r: 72 };

let c_grietas = null;   // los píxeles de las grietas (se calculan una vez) para encenderlos con o.grietas

function c_ocularFijo(R) {
  const { pset } = R, { cx, cy, r } = c_OCU;
  // la máscara del trazo de tinta: un lazo grande y una cola que baja
  const M = new Uint8Array(320 * 180), sello = (x0, y0, rr) => { for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) if (i * i + j * j <= rr * rr) { const x = Math.round(x0 + i), y = Math.round(y0 + j); if (x >= 0 && x < 320 && y >= 0 && y < 180) M[y * 320 + x] = 1; } };
  for (let a = 0.35; a < Math.PI * 2 + 0.1; a += 0.02) { const rr = 7 + Math.sin(a * 2) * 1.5; sello(146 + Math.cos(a) * 33, 74 + Math.sin(a) * 28, rr); }
  for (let s = 0; s <= 1; s += 0.01) { const x = (1 - s) * (1 - s) * 177 + 2 * s * (1 - s) * 196 + s * s * 210, y = (1 - s) * (1 - s) * 84 + 2 * s * (1 - s) * 112 + s * s * 160; sello(x, y, 8 - s * 4); }
  const tinta = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && M[y * 320 + x] === 1;
  // las grietas: caminos al azar dentro del trazo, que se ramifican
  const G = new Uint8Array(320 * 180), lista = [];
  for (let k = 0; k < 26; k++) { let x = 0, y = 0, n = 0; do { x = Math.floor(100 + h(k, n, 661) * 130); y = Math.floor(40 + h(n, k, 662) * 120); n++; } while (!tinta(x, y) && n < 60);
    let ang = h(k, 3, 663) * Math.PI * 2; const L = 8 + Math.floor(h(k, 4, 663) * 22);
    for (let s = 0; s < L; s++) { ang += (h(k, s, 664) - 0.5) * 1.3; x += Math.round(Math.cos(ang)); y += Math.round(Math.sin(ang)); if (!tinta(x, y) || !tinta(x + 1, y) || !tinta(x - 1, y) || !tinta(x, y + 1) || !tinta(x, y - 1)) break; if (!G[y * 320 + x]) { G[y * 320 + x] = 1; lista.push([x, y]); } } }
  // tres grietas con forma de signo (lo que Newbold leía como letras)
  for (const [gx, gy, k] of [[138, 47, 2], [118, 82, 5], [190, 112, 0]]) { const g = c_SIG[k]; for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') for (const [a, b] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const x = gx + i * 2 + a, y = gy + j * 2 + b; if (tinta(x, y) && !G[y * 320 + x]) { G[y * 320 + x] = 1; lista.push([x, y]); } } }
  c_grietas = lista;
  // fuera del círculo: el despacho desenfocado (luz de la lámpara, el tablero, manchas de luz); el aro de latón moleteado
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const d = Math.hypot(x - cx, y - cy);
    if (d > r + 9) { const lam = Math.max(0, 1 - Math.hypot(x - 40, y - 26) / 120), mesa = y > 130 ? (y - 130) / 50 : 0, bok = Math.max(0, 1 - Math.hypot(x - 270, y - 150) / 26) + Math.max(0, 1 - Math.hypot(x - 30, y - 140) / 18) * 0.6;
      let c = c_mezcla(hex('#140e0a'), hex('#5a4024'), lam * 0.7); c = c_mezcla(c, hex('#3a2414'), mesa * 0.7); c = c_mezcla(c, hex('#7a5a30'), bok * 0.45);
      if ((x + y) % 2 === 0 && h(x >> 2, y >> 2, 665) < 0.5) c = c_mezcla(c, hex('#000000'), 0.15); pset(x, y, c); continue; }
    if (d > r) { const u = (d - r) / 9, ang = Math.atan2(y - cy, x - cx), mol = Math.floor(ang * 40) % 2 === 0 && u > 0.55;
      pset(x, y, u < 0.15 ? hex('#0a0806') : mol ? hex('#8a6420') : u < 0.4 ? hex('#f0d080') : u < 0.7 ? hex('#c89a40') : hex('#6a4a18')); continue; }
    // dentro: el pergamino ampliado (fibras, poros, manchas) y la tinta con su borde, su grano y las grietas
    const fib = h(Math.floor(x / 7 + y * 0.18), y, 669), fib2 = h(Math.floor(x / 3 - y * 0.1), y >> 1, 670), por = h(x >> 1, y >> 1, 666);
    let c = hex('#e6d4a8'); if (fib < 0.14) c = hex('#d6c292'); else if (fib > 0.9) c = hex('#f2e4c0'); else if (fib2 < 0.06) c = hex('#ccb686'); if (por < 0.012) c = hex('#a88a5a'); else if (por > 0.985) c = hex('#c8b080');
    if (Math.hypot(x - 96, y - 120) < 14 + h(x >> 2, y >> 2, 667) * 4) c = c_mezcla(c, hex('#b89a6a'), 0.25);
    if (tinta(x, y)) { const borde = !tinta(x - 2, y) || !tinta(x + 2, y) || !tinta(x, y - 2) || !tinta(x, y + 2), gr = h(x, y, 668);
      c = borde ? hex('#2e1a0e') : gr < 0.12 ? hex('#6e4a2c') : gr > 0.9 ? hex('#3a2414') : hex('#4e3220');
      if (G[y * 320 + x]) c = hex('#d4c094'); else if (G[(y - 1) * 320 + x]) c = hex('#24140a'); }
    // la viñeta y la franja de color del borde de la lente
    const v = d / r; if (v > 0.8) c = c_mezcla(c, hex('#4a3420'), (v - 0.8) * 2.6);
    if (d > r - 2) c = c_mezcla(c, d > r - 1 ? hex('#5a6ab0') : hex('#d8904a'), 0.4);
    pset(x, y, c);
  }
  // la aguja del ocular que señala una grieta
  for (let x = 196; x <= cx + r; x++) { pset(x, 108, hex('#1a1410')); if (x > 200) pset(x, 107, hex('#1a1410')); }
}

function c_ocular(R, t, o) {
  const { cx, cy, r } = c_OCU;
  c_capa(R, 'ocular', () => c_ocularFijo(R));
  const dentro = (x, y) => (x - cx) * (x - cx) + (y - cy) * (y - cy) < (r - 1) * (r - 1);
  // las grietas que se encienden
  const g = c_lim(o.grietas ?? 0);
  if (g > 0 && c_grietas) { const c = c_mezcla(hex('#d4c094'), hex('#ffd040'), g), pul = 0.5 + 0.5 * Math.sin(t * 5); for (const [x, y] of c_grietas) { R.pset(x, y, c); if (g > 0.5 && (x + y) % 3 === 0) c_aclara(R, x, y - 1, hex('#ffe080'), 0.35 * pul * g); } }
  // las motas que flotan en el ojo
  for (let k = 0; k < 4; k++) { const x = Math.round(cx - 50 + ((t * (3 + k) + k * 37) % 100)), y = Math.round(cy - 40 + k * 22 + Math.sin(t * 0.6 + k) * 6), rr = 3 + k % 2;
    for (let a = 0; a < 6.28; a += 0.4) { const px = Math.round(x + Math.cos(a) * rr), py = Math.round(y + Math.sin(a) * rr); if (dentro(px, py)) c_aclara(R, px, py, hex('#ffffff'), 0.18); } }
  // la mosca
  const m = o.mosca ?? 0;
  if (m > 0 && m < 1) {
    let x, y, fase;
    if (m < 0.35) { const u = m / 0.35; x = lerp(40, 150, u); y = lerp(150, 98, u) + Math.sin(u * 20) * 2; fase = 'anda'; }
    else if (m < 0.65) { x = 150; y = 98; fase = 'frota'; }
    else { const u = (m - 0.65) / 0.35; x = lerp(150, 290, u * u); y = lerp(98, -20, u * u) + Math.sin(u * 30) * 3; fase = 'vuela'; }
    c_moscaGrande(R, Math.round(x), Math.round(y), t, fase, dentro);
  }
  return { centro: [cx, cy], radio: r, mosca: [150, 98] };
}

// la mosca grande vista desde arriba (mira a la derecha): ojos rojos, tórax rayado, abdomen con brillo, alas
// transparentes con venas y seis patas que andan, se frotan o cuelgan al volar; solo dentro del ocular
function c_moscaGrande(R, x, y, t, fase, dentro) {
  const P1 = (xx, yy, c) => { if (dentro(xx, yy)) R.pset(xx, yy, c); }, A1 = (xx, yy, c, a) => { if (dentro(xx, yy)) c_aclara(R, xx, yy, c, a); };
  const elipse = (ex, ey, rx, ry, c, f = P1, a) => { for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i * i) / (rx * rx) + (j * j) / (ry * ry) <= 1) f(ex + i, ey + j, c, a); };
  const L = (x0, y0, x1, y1, c) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let s = 0; s <= n; s++) P1(Math.round(x0 + (x1 - x0) * s / n), Math.round(y0 + (y1 - y0) * s / n), c); };
  const pata = hex('#1a1418'), paso = fase === 'anda' ? Math.sin(t * 14) * 3 : 0;
  // las patas: tres pares; al volar, recogidas
  const pares = [[4, 1], [0, 0], [-5, -1]];
  pares.forEach(([dx, k], idx) => { for (const s of [-1, 1]) { const ph = (idx % 2 ? 1 : -1) * s * paso;
    if (fase === 'vuela') { L(x + dx, y + s * 3, x + dx - 4, y + s * 6, pata); continue; }
    if (fase === 'frota' && idx === 0) { const f = Math.sin(t * 16) * 2; L(x + 6, y + s * 3, x + 11, y + s * 2 + f * s * 0.5, pata); L(x + 11, y + s * 2 + f * s * 0.5, x + 14, y + s * (1 + f * 0.5), pata); continue; }
    const kx = x + dx + 2 + k * 4 + ph, ky = y + s * 9, fx = x + dx + 4 + k * 8 + ph * 1.5, fy = y + s * 15; L(x + dx, y + s * 3, Math.round(kx), ky, pata); L(Math.round(kx), ky, Math.round(fx), fy, pata); P1(Math.round(fx) + 1, fy, pata); } });
  // el abdomen con sus anillos y el brillo, el tórax rayado y la cabeza con los ojos rojos
  elipse(x - 11, y, 9, 6, hex('#3e3640')); for (let i = -18; i <= -4; i += 3) for (let j = -5; j <= 5; j++) if (((i + 11) * (i + 11)) / 81 + (j * j) / 36 <= 1) P1(x + i, y + j, hex('#2a242c'));
  for (let i = -14; i <= -8; i++) P1(x + i, y - 3, hex('#7a7a90')); P1(x - 12, y - 4, hex('#a8a8c0'));
  elipse(x, y, 6, 5, hex('#2e2a34')); for (const j of [-2, 0, 2]) for (let i = -4; i <= 4; i++) P1(x + i, y + j, hex('#5a5662')); for (const [i, j] of [[-3, -4], [2, -4], [4, 3], [-2, 4], [0, -5]]) P1(x + i, y + j, hex('#0e0a10'));
  elipse(x + 8, y, 3, 5, hex('#241e28'));
  for (const s of [-1, 1]) { elipse(x + 8, y + s * 4, 3, 3, hex('#8a2416')); for (let j = -2; j <= 2; j += 2) for (let i = -2; i <= 2; i += 2) P1(x + 8 + i, y + s * 4 + j, hex('#6a1a10')); P1(x + 7, y + s * 4 - 1, hex('#e87a5a')); P1(x + 8, y + s * 4 - 2, hex('#f0a080')); }
  // las alas: transparentes, con venas; al volar, un borrón que vibra
  for (const s of [-1, 1]) {
    if (fase === 'vuela') { const k = Math.floor(t * 40) % 2, a = s * (k ? 0.9 : 0.4); for (let q = 0; q < 2; q++) { const ang = a + q * 0.25 * s; for (let d = 2; d < 20; d++) for (let w = -3; w <= 3; w++) { const xx = Math.round(x - 2 - Math.cos(ang) * d + Math.sin(ang) * w * 0.6), yy = Math.round(y + s * 2 + Math.sin(ang) * d * s * s + Math.cos(ang) * w); A1(xx, yy, hex('#ffffff'), 0.18); } } continue; }
    // el ala: una elipse girada hacia atrás y afuera, casi transparente, con su borde y dos venas
    const ang = s * 0.42, ca = Math.cos(ang), sa = Math.sin(ang), ox = x - 11, oy = y + s * 5, rx = 12, ry = 4;
    for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const u = (i * ca + j * sa) / rx, v = (-i * sa + j * ca) / ry, d = u * u + v * v;
      if (d <= 1) { if (d > 0.72) P1(ox + i, oy + j, hex('#5a5a6e')); else A1(ox + i, oy + j, hex('#e8f0ff'), 0.3); } }
    for (let k = -9; k <= 9; k++) { P1(Math.round(ox + k * ca - 1 * sa * s), Math.round(oy + k * sa), hex('#6a6a80')); if (k > -4 && k % 2) P1(Math.round(ox + k * ca + 2 * sa * s), Math.round(oy + k * sa + 2 * s), hex('#7a7a90')); }
  }
}

function c_pizarraFija(R, tarde) {
  const { rect, pset, disco, linea } = R, P = P_FIL, T = P.tiza;
  rect(0, 0, 319, 8, P.techo); rect(0, 9, 319, 13, P.cornisa); rect(0, 10, 319, 10, P.cornisaS); for (let x = 0; x < 320; x += 5) rect(x, 12, x + 2, 13, P.cornisaS);
  c_papel(R, 0, 319, 14, 119, 330, tarde);
  rect(0, 17, 319, 18, P.rail); rect(0, 17, 319, 17, P.nogalB);
  c_friso(R, 120, 142, 44);
  c_tablas(R, [143, 147, 152, 158, 165, 172, 180]);
  for (let x = 0; x < 320; x++) { c_aclara(R, x, 143, P.nogalD, 0.5); c_aclara(R, x, 144, P.nogalD, 0.25); }
  // la alfombra que asoma por delante
  R.poligono([[60, 168], [250, 168], [262, 180], [48, 180]], P.alfB); R.poligono([[64, 170], [246, 170], [256, 180], [54, 180]], P.alfO); R.poligono([[66, 171], [244, 171], [253, 180], [57, 180]], P.alf);
  for (let y = 172; y < 180; y++) for (let x = 58; x < 252; x++) if (R.pget(x, y) === P.alf && (x * 3 + y * 5) % 11 === 0) pset(x, y, P.alfL);
  for (let x = 62; x < 248; x += 2) pset(x, 167, P.papel);
  // la pizarra: marco, borrones, el signo ampliado (con sus grietas), la flecha, los tres renglones y el microscopio a tiza
  rect(30, 20, 262, 118, P.nogalS); rect(31, 21, 261, 117, P.nogal); rect(31, 21, 261, 22, P.nogalB); rect(34, 25, 258, 113, P.nogalD);
  rect(35, 26, 257, 112, P.piz);
  for (let y = 26; y <= 112; y++) for (let x = 35; x <= 257; x++) { const s = Math.sin((x + y * 0.5) * 0.12 + h(x >> 4, y >> 4, 671) * 5); if (s > 0.88 && h(x, y, 672) < 0.65) pset(x, y, P.pizL); else if (h(x, y, 673) < 0.03) pset(x, y, P.pizS); }
  // el signo enorme: un lazo y su cola, en trazo grueso de tiza
  for (let a = 0.4; a < Math.PI * 2 + 0.2; a += 0.03) { const x = 76 + Math.cos(a) * 20, y = 56 + Math.sin(a) * 17; disco(Math.round(x), Math.round(y), 3, T); }
  for (let s = 0; s <= 1; s += 0.02) { const x = (1 - s) * (1 - s) * 94 + 2 * s * (1 - s) * 106 + s * s * 112, y = (1 - s) * (1 - s) * 62 + 2 * s * (1 - s) * 80 + s * s * 100; disco(Math.round(x), Math.round(y), 3 - s, T); }
  for (let y = 30; y < 108; y++) for (let x = 50; x < 120; x++) if (R.pget(x, y) === T && h(x, y, 674) < 0.12) pset(x, y, P.tizaS);
  for (const [x, y] of [[62, 46], [88, 42], [58, 66], [92, 66], [104, 84], [74, 73]]) { linea(x - 1, y - 1, x + 1, y + 1, P.piz); pset(x + 1, y, P.piz); pset(x - 1, y + 1, P.piz); }
  // la flecha y los tres renglones con el MISMO signo y resultados distintos
  linea(122, 60, 140, 60, T); linea(122, 61, 140, 61, T); linea(136, 56, 141, 60, T); linea(136, 65, 141, 61, T);
  for (const [j, res] of [[0, '3141'], [1, '2718'], [2, '?']]) { const y = 36 + j * 24; for (let i = 0; i < 4; i++) c_signo(R, 150 + i * 8, y, [2, 5, 0, 7][i], T, 2);
    linea(184, y + 4, 194, y + 4, P.tizaS); linea(191, y + 2, 194, y + 4, P.tizaS); linea(191, y + 6, 194, y + 4, P.tizaS);
    c_digitos(R, res, 199, y + 1, j === 2 ? P.tizaO : T, 2); }
  for (const y of [52, 76]) { linea(238, y - 1, 246, y - 1, T); linea(238, y + 2, 246, y + 2, T); linea(244, y - 4, 240, y + 5, T); }
  // el microscopio a tiza y la grieta dibujada con su ramificación
  { const x = 246, y = 108; linea(x - 8, y, x + 8, y, T); linea(x + 4, y, x + 4, y - 14, T); linea(x + 4, y - 14, x - 2, y - 24, T); linea(x - 2, y - 24, x - 6, y - 32, T); linea(x - 8, y - 32, x - 4, y - 34, T); linea(x - 6, y - 10, x + 2, y - 10, T); }
  for (const [a, b, c, d] of [[214, 92, 220, 96], [220, 96, 218, 102], [220, 96, 226, 98], [226, 98, 228, 104]]) linea(a, b, c, d, P.tizaS);
  // el cajetín con las tizas y el borrador
  rect(28, 118, 264, 122, P.nogalS); rect(28, 118, 264, 118, P.nogalL);
  for (const [x, w] of [[52, 5], [66, 4], [180, 6], [196, 3]]) { rect(x, 116, x + w, 117, C.blanco); pset(x + w, 117, P.tizaS); }
  rect(120, 113, 136, 117, hex('#6a5040')); rect(120, 116, 136, 117, hex('#9a9a9a')); rect(120, 113, 136, 113, hex('#8a6a50'));
  for (let x = 40; x < 250; x += 3) if (h(x, 1, 675) < 0.5) pset(x, 119, hex('#c8c8bc'));
  // a la derecha, el diploma enmarcado (renglones y sello, sin letras) y el estante con la campana de cristal
  rect(272, 54, 306, 80, P.nogalS); rect(273, 55, 305, 79, P.laton); rect(275, 57, 303, 77, hex('#efe4c4')); rect(281, 60, 297, 60, hex('#6a5a4a'));
  for (let y = 64; y < 74; y += 3) rect(279, y, 299 - (y % 2) * 4, y, hex('#a89878')); disco(296, 73, 3, hex('#a83a2a')); pset(295, 72, hex('#d8604a'));
  rect(270, 96, 312, 98, P.nogalL); rect(270, 98, 312, 99, P.nogalS); for (const x of [274, 308]) linea(x, 99, x + 2, 104, P.nogalS);
  rect(280, 90, 292, 95, hex('#4a3a2a')); R.anillo(286, 89, 5, hex('#c8d8e0')); for (let j = 0; j < 5; j++) pset(282, 86 + j, hex('#e8f0f4'));
  for (let j = 0; j < 3; j++) { rect(295 + j * 4, 85 - j, 297 + j * 4, 95, C_LIBROS[j * 3]); pset(296 + j * 4, 88, P.laton); }
}

function c_pizarra(R, t, o) {
  const P = P_FIL, T = P.tiza, tarde = !!o.tarde;
  c_capa(R, 'pizarra|' + tarde, () => c_pizarraFija(R, tarde));
  // el haz de sol que recorre despacio la pizarra, con sus motas
  const L = tarde ? P.luzT : P.luz, des = Math.sin(t * 0.15) * 14;
  for (let y = 26; y < 143; y++) { const a = Math.round(200 + des - (y - 26) * 0.7), b = a + 46; for (let x = Math.max(0, a); x <= Math.min(319, b); x++) if ((x + y) % 2 === 0) c_aclara(R, x, y, L, 0.1); }
  for (let k = 0; k < 14; k++) { const y = Math.round(28 + ((h(k, 1, 676) * 110 + t * (3 + k % 4)) % 112)), a = 200 + des - (y - 26) * 0.7, x = Math.round(a + h(k, 2, 676) * 46 + Math.sin(t * 0.8 + k) * 2); if (Math.sin(t * 2.2 + k) > -0.2) c_aclara(R, x, y, C.blanco, 0.55); }
  // los círculos de Manly alrededor de tres grietas
  const m = c_lim(o.marca ?? 0), Ty = P.tizaO;
  [[62, 46], [92, 66], [104, 84]].forEach(([x, y], k) => { const u = c_lim(m * 3 - k); if (u <= 0) return; const fin = u * Math.PI * 2.1; for (let a = 0; a < fin; a += 0.08) { R.pset(Math.round(x + Math.cos(a - 1.5) * 7), Math.round(y + Math.sin(a - 1.5) * 6), Ty); R.pset(Math.round(x + Math.cos(a - 1.5) * 8), Math.round(y + Math.sin(a - 1.5) * 6), Ty); } });
  // el aspa que tacha los tres resultados
  const x2 = c_lim(o.tacha ?? 0);
  if (x2 > 0) { const u1 = c_lim(x2 * 2), u2 = c_lim(x2 * 2 - 1); for (let s = 0; s <= u1; s += 0.01) { const x = Math.round(lerp(194, 240, s)), y = Math.round(lerp(30, 104, s)); R.rect(x, y, x + 1, y + 1, T); } for (let s = 0; s <= u2; s += 0.01) { const x = Math.round(lerp(240, 194, s)), y = Math.round(lerp(30, 104, s)); R.rect(x, y, x + 1, y + 1, T); } }
  // la mosca, que se ha posado en la pizarra y anda un poco
  if (o.moscaVuela !== false) { const u = (t % 9) / 9, x = Math.round(150 + Math.sin(u * Math.PI * 2) * 10), y = Math.round(96 + Math.cos(u * Math.PI * 4) * 3); R.pset(x, y, C.k); R.pset(x + 1, y, C.k); R.pset(x, y - 1, hex('#8a8ea0')); }
  return { suelo: 160, pizarra: [35, 26, 257, 112], signo: [76, 56], grietas: [[62, 46], [92, 66], [104, 84]], renglones: [[150, 36], [150, 60], [150, 84]], resultados: [199, 37], libre: [20, 230] };
}

// la esquina del escritorio por delante en la cámara de la pizarra: el tablero, el microscopio, libros y papeles
function c_esquinaMesa(R, t, o) {
  const { rect, pset, poligono } = R, P = P_FIL;
  rect(236, 147, 319, 152, C.k); rect(237, 148, 319, 150, P.nogalL); rect(237, 151, 319, 151, P.nogal); rect(237, 148, 319, 148, P.nogalB);
  rect(240, 153, 319, 179, P.nogal); rect(240, 153, 240, 179, P.nogalL); rect(244, 156, 319, 168, P.nogalD); rect(245, 157, 319, 167, P.nogalL); rect(246, 158, 319, 166, P.nogal);
  rect(270, 161, 280, 162, P.latonS); rect(270, 161, 280, 161, P.laton); rect(244, 171, 319, 179, P.nogalS);
  if (PIEZAS_VM.microscopio) PIEZAS_VM.microscopio(R, 300, 149, { t, s: 2 });
  for (let j = 0; j < 3; j++) { const c = C_LIBROS[(j * 4 + 2) % 10]; rect(246, 147 - j * 3 - 2, 270 - j, 147 - j * 3, C.k); rect(247, 146 - j * 3 - 1, 269 - j, 146 - j * 3, c); rect(266 - j, 146 - j * 3 - 1, 269 - j, 146 - j * 3, P.papel); }
  poligono([[272, 147], [284, 146], [286, 148], [274, 149]], P.papel); R.linea(275, 147, 282, 147, hex('#6a6a6a'));
  return { tablero: 148 };
}

const P_OF = Object.fromEntries(Object.entries({
  techo: '#d6d2bc', techoS: '#c4c0a8', pared: '#a6b698', paredS: '#96a888', paredL: '#b6c4a6', zocalo: '#6a7e64', zocaloS: '#56684f', zocaloL: '#7e9276', rodapie: '#3a4636',
  lino1: '#7a3a30', lino1S: '#68302a', lino2: '#bfae8c', lino2S: '#ab9a78', brillo: '#f4ead8',
  corcho: '#b88a5a', corchoS: '#9a7044', mar: '#5a7a9a', marL: '#6e90ae', tierra: '#d8c89a', tierraS: '#b4a476', hoja: '#ece8d6', rejilla: '#c4d0d8',
  archivo: '#7a8474', archivoS: '#5e6858', archivoL: '#94a08c', mesa: '#8a6a44', mesaS: '#6a4e30', mesaL: '#a8845a', mesaD: '#4a3420',
  maquina: '#2a2a30', maquinaL: '#4a4a56', persiana: '#e2ddcc', persianaS: '#b4ae9a', lampara: '#3e6a4e', lamparaL: '#6a9a7a',
  c1: '#7aa6d0', c2: '#9cc0dc', c3: '#c8dce8', arbol: '#4a7a3a', arbolS: '#365e2c', arbolL: '#6a9a4a', ladr: '#9a5040', ladrS: '#7a3c30',
  ficha: '#f2e6c4', fichaS: '#d4c49c', tela: '#3a5a48', telaS: '#2e4a3a', telaL: '#466a56',
}).map(([k, v]) => [k, hex(v)]));

// el linóleo a cuadros en perspectiva, con brillo de cera y el reflejo de la ventana (ventX)
function c_linoleo(R, y0, ventX, fuga = 60) {
  const P = P_OF, filas = []; for (let v = y0, k = 0; v < 180; k++) { filas.push(v); v += 4 + k * 1.5; }
  for (let y = y0; y < 180; y++) { let fila = 0; while (fila + 1 < filas.length && filas[fila + 1] <= y) fila++;
    for (let x = 0; x < 320; x++) { const col = Math.floor((x - 160) * fuga / (y - y0 + fuga) / 14 + 100), cl = (col + fila) % 2 === 0;
      let c = cl ? P.lino1 : P.lino2; if (h(x >> 1, y, 681) < 0.06) c = cl ? P.lino1S : P.lino2S;
      const ref = Math.max(0, 1 - Math.abs(x - ventX - (y - y0) * 0.3) / 26) * Math.max(0, 1 - (y - y0) / 50), br = Math.sin(x * 0.05 + y * 0.3) > 0.97 ? 0.15 : 0;
      if (ref + br > 0.05 && (x + y) % 2 === 0) c = c_mezcla(c, P.brillo, (ref * 0.45 + br)); R.pset(x, y, c); } }
}

// la pared de oficina: verde con brocha, la moldura y el zócalo (yR la moldura, yB el pie)
function c_paredOficina(R, y0, yR, yB, luzX) {
  const { rect, pset } = R, P = P_OF;
  for (let y = y0; y < yR; y++) for (let x = 0; x < 320; x++) { const n = h(x, y >> 1, 682); let c = n < 0.1 ? P.paredS : n > 0.93 ? P.paredL : P.pared; const k = Math.max(0, 1 - Math.abs(x - luzX) / 110) * 0.14; pset(x, y, k > 0 ? c_mezcla(c, hex('#fff8e0'), k) : c); }
  rect(0, yR, 319, yR + 2, P.mesaS); rect(0, yR, 319, yR, P.mesaL);
  for (let y = yR + 3; y < yB - 4; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 40 === 0 ? P.zocaloS : x % 40 === 1 ? P.zocaloL : h(x, y, 683) < 0.06 ? P.zocaloS : P.zocalo);
  rect(0, yB - 4, 319, yB, P.rodapie); rect(0, yB - 4, 319, yB - 4, P.zocaloL);
}

function c_oficinaFija(R) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  // el techo de placas (tranquilo bajo la barra del año)
  rect(0, 0, 319, 13, P.techo); for (let x = 10; x < 320; x += 24) rect(x, 0, x, 11, P.techoS); rect(0, 6, 319, 6, P.techoS); rect(0, 12, 319, 13, hex('#b0ac96'));
  c_paredOficina(R, 14, 70, 112, 206);
  c_linoleo(R, 113, 206);
  // la luz de las lamas de la persiana en el suelo
  for (let k = 0; k < 6; k++) for (let y = 120 + k * 7; y < 123 + k * 7; y++) for (let x = 180 + k * 2; x < 236 + k * 6; x++) if ((x + y) % 2 === 0) c_aclara(R, x, y, hex('#fff4d0'), 0.16);
  // el tablero de corcho con el mapa inventado, la cuadrícula, chinchetas, hilos y fichas
  rect(6, 26, 90, 76, P.mesaD); rect(7, 27, 89, 75, P.mesaS); rect(9, 29, 87, 73, P.corcho); for (let k = 0; k < 120; k++) pset(9 + Math.floor(h(k, 1, 684) * 78), 29 + Math.floor(h(k, 2, 684) * 44), P.corchoS);
  rect(12, 31, 84, 66, hex('#e8e0c8'));
  for (let y = 32; y < 66; y++) for (let x = 13; x < 84; x++) { const f = Math.sin(x * 0.11 + 1) + Math.sin(y * 0.17 + x * 0.04) + Math.sin((x + y) * 0.07 + 2) + (h(x >> 2, y >> 2, 685) - 0.5) * 0.6;
    let c = f > 0.9 ? P.tierra : P.mar; if (f > 0.9 && f < 1.05) c = P.tierraS; if (c === P.mar && (y % 4 === 0 && (x + y * 2) % 6 < 2)) c = P.marL; if (x % 12 === 0 || y % 10 === 0) c = c_mezcla(c, hex('#e8eef4'), 0.35); pset(x, y, c); }
  const pins = [[24, 40, hex('#d83a2a')], [44, 52, hex('#2a5ac8')], [60, 38, hex('#d83a2a')], [72, 58, hex('#e8c040')], [34, 60, hex('#d83a2a')]];
  for (let i = 0; i < pins.length - 1; i++) linea(pins[i][0], pins[i][1], pins[i + 1][0], pins[i + 1][1], hex('#b82a2a'));
  for (const [x, y, c] of pins) { pset(x + 1, y + 1, hex('#2a2a2a')); disco(x, y, 1, c); pset(x, y - 1, C.blanco); }
  for (const [x, y] of [[14, 67], [40, 67], [66, 67]]) { rect(x, y, x + 14, y + 6, P.hoja); rect(x, y, x + 14, y, hex('#c84a4a')); c_digitos(R, String(10 + x), x + 2, y + 1, hex('#3a3a4a')); pset(x + 7, y - 1, hex('#d83a2a')); }
  // la hoja de frecuencias: papel cuadriculado con barras, signos debajo y cifras en el eje
  rect(96, 26, 166, 78, hex('#8a8a7a')); rect(97, 27, 165, 77, P.hoja); for (let y = 29; y < 77; y += 4) rect(97, y, 165, y, P.rejilla); for (let x = 99; x < 165; x += 4) rect(x, 27, x, 77, P.rejilla);
  linea(104, 30, 104, 66, hex('#2a2a3a')); linea(104, 66, 162, 66, hex('#2a2a3a'));
  for (let k = 0; k < 11; k++) { const x = 107 + k * 5, hb = Math.round(6 + Math.pow(h(k, 1, 686), 0.6) * 28 * (k === 2 ? 1.25 : 1)); rect(x, 66 - hb, x + 3, 65, k === 2 ? hex('#a83a3a') : hex('#3a4a6a')); rect(x, 66 - hb, x, 65, hex('#6a7a9a')); c_signo(R, x, 69, k, hex('#2a2a3a')); }
  c_digitos(R, '30', 98, 30, hex('#2a2a3a')); c_digitos(R, '20', 98, 42, hex('#2a2a3a')); c_digitos(R, '10', 98, 54, hex('#2a2a3a'));
  R.anillo(118, 33, 5, hex('#c83a3a'));
  for (const [x, y] of [[98, 28], [163, 28], [98, 75], [163, 75]]) pset(x, y, hex('#c83a2a'));
  // el cartel de «silencio»: un perfil con el dedo en los labios, sin letras
  rect(98, 82, 120, 104, hex('#a83a2a')); rect(100, 84, 118, 102, hex('#ece0c0'));
  { const k = hex('#2a2a3a'); disco(107, 90, 5, k); rect(103, 86, 110, 88, k); pset(112, 90, k); pset(112, 91, k); rect(105, 95, 109, 97, k); rect(101, 98, 113, 102, k); rect(113, 86, 114, 95, hex('#e8b088')); rect(113, 95, 115, 98, hex('#e8b088')); pset(113, 86, hex('#c88a68')); }
  // la ventana con la persiana veneciana: lo de fuera, las lamas, el cordón y el alféizar
  rect(172, 18, 240, 92, hex('#e8e4d4')); rect(172, 18, 240, 18, C.blanco); rect(240, 18, 240, 92, hex('#b8b4a4'));
  { const x0 = 176, y0 = 22, x1 = 236, y1 = 86;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const u = (y - y0) / 50 + (h(x, y, 687) - 0.5) * 0.12; pset(x, y, u < 0.35 ? P.c1 : u < 0.7 ? P.c2 : P.c3); }
    for (let x = x0; x <= x1; x++) { const top = 52 + Math.round(Math.sin(x * 0.3) * 2 + h(x >> 2, 1, 688) * 3); rect(x, top + 12, x, y1, P.ladrS); }
    rect(x0, 62, x0 + 30, y1, P.ladr); for (let y = 65; y < y1; y += 5) for (let x = x0 + 2; x < x0 + 30; x += 5) rect(x, y, x + 2, y + 2, hex('#e8e0c8'));
    for (let k = 0; k < 6; k++) { const ax = x0 + 34 + k * 5, ay = 62 + Math.round(h(k, 1, 689) * 6); disco(ax, ay, 5, P.arbolS); disco(ax - 1, ay - 1, 4, P.arbol); pset(ax - 2, ay - 3, P.arbolL); pset(ax + 1, ay - 2, P.arbolL); rect(ax, ay + 4, ax, y1, hex('#4a3a2a')); }
    rect(x0, 80, x1, y1, hex('#6a8a4a')); for (let x = x0; x <= x1; x += 2) pset(x, 80, hex('#8aaa5a')); }
  rect(174, 20, 238, 21, P.persianaS);
  for (let y = 22; y < 62; y += 3) { rect(176, y, 236, y + 1, P.persiana); rect(176, y + 1, 236, y + 1, P.persianaS); }
  rect(174, 62, 238, 64, P.persiana); rect(174, 64, 238, 64, P.persianaS); for (const x of [190, 222]) rect(x, 20, x, 62, hex('#d8d0b8'));
  linea(234, 64, 234, 84, hex('#d8d0b8')); disco(234, 85, 1, hex('#c8b890'));
  rect(204, 22, 206, 86, hex('#e8e4d4')); rect(176, 52, 236, 53, hex('#e8e4d4'));
  rect(170, 92, 242, 95, hex('#e8e4d4')); rect(170, 92, 242, 92, C.blanco); rect(170, 95, 242, 95, hex('#a8a494'));
  // el reloj de oficina
  disco(256, 54, 8, hex('#2a2a30')); disco(256, 54, 7, hex('#f4f0e4')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(256 + Math.cos(a) * 5), Math.round(54 + Math.sin(a) * 5), hex('#5a5a60')); }
  // los archivadores: cuatro cajones con tirador y tarjetero; uno abierto, con fichas
  for (let k = 0; k < 3; k++) { const a = 246 + k * 24, b = a + 23; rect(a, 62, b, 112, hex('#2a2e2a')); rect(a + 1, 63, b - 1, 112, P.archivo); rect(a + 1, 63, a + 1, 112, P.archivoL);
    for (let j = 0; j < 4; j++) { const y = 64 + j * 12; rect(a + 2, y, b - 2, y + 10, P.archivoS); rect(a + 3, y + 1, b - 2, y + 10, P.archivoL); rect(a + 4, y + 2, b - 3, y + 9, P.archivo); const mx = (a + b) >> 1;
      rect(mx - 4, y + 3, mx + 4, y + 5, hex('#c8c8c0')); rect(mx - 3, y + 4, mx + 3, y + 4, hex('#f0ece0')); rect(mx - 3, y + 7, mx + 3, y + 8, hex('#d8d8d0')); pset(mx - 3, y + 7, hex('#4a4a4a')); } }
  rect(272, 88, 292, 99, hex('#2a2e2a')); rect(273, 89, 291, 98, P.archivoL); for (let x = 274; x < 291; x += 2) rect(x, 85 + (x % 3), x, 90, P.ficha); rect(276, 84, 278, 86, hex('#c84a4a'));
  rect(246, 62, 318, 62, hex('#2a2e2a'));
  for (let j = 0; j < 4; j++) { rect(282 + (j % 2), 59 - j * 2, 314 - (j % 2), 61 - j * 2, hex('#2a2a2a')); rect(283 + (j % 2), 59 - j * 2, 313 - (j % 2), 60 - j * 2, j % 2 ? P.hoja : P.ficha); }
  // los conos de luz de las lámparas
  for (const lx of [54, 134]) for (let y = 30; y < 124; y++) { const w = (y - 30) * 0.45; for (let x = Math.round(lx - w); x <= lx + w; x++) if ((x + y) % 3 === 0) c_aclara(R, x, y, hex('#fff4c8'), 0.08 * (1 - (y - 24) / 110)); }
  // las mesas del fondo, bajas (las de los mecanógrafos), con sus máquinas de escribir, papeles y una lámpara
  for (const a of [12, 70]) { const b = a + 46; rect(a, 113, b, 115, P.mesaD); rect(a, 113, b, 113, P.mesaL); rect(a + 1, 116, b - 1, 122, P.mesaS); rect(a + 1, 116, b - 1, 116, P.mesaD);
    rect(a + 1, 116, a + 3, 122, P.mesa); rect(b - 3, 116, b - 1, 122, P.mesa); for (let x = a + 6; x < b - 6; x += 3) pset(x, 119, P.mesaD);
    for (let j = 0; j < 3; j++) rect(a + 34 + (j % 2), 112 - j, a + 43, 112 - j, j % 2 ? P.hoja : P.ficha); }
  rect(118, 106, 120, 112, hex('#2a3a2a')); poligono([[115, 106], [117, 103], [121, 103], [123, 106]], P.lampara);
  // la clasificadora de tarjetas: cuerpo, cajetines, tolva y patas
  rect(184, 100, 232, 121, hex('#2a2e34')); rect(185, 101, 231, 120, hex('#6a7a8a')); rect(185, 101, 231, 101, hex('#8a9aaa')); rect(185, 103, 231, 104, hex('#4a5a6a'));
  for (let k = 0; k < 12; k++) { const x = 187 + k * 4; rect(x, 108, x + 2, 115, hex('#2a3038')); rect(x, 112 - (k * 7) % 4, x + 2, 115, P.ficha); }
  rect(224, 90, 236, 101, hex('#2a2e34')); rect(225, 91, 235, 100, hex('#7a8a9a')); for (let y = 92; y < 100; y++) rect(226, y, 234, y, y % 2 ? P.ficha : P.fichaS);
  for (let k = 0; k < 4; k++) pset(188 + k * 3, 117, k % 2 ? hex('#3a8a4a') : hex('#c8a040'));
  rect(186, 121, 188, 123, hex('#2a2e34')); rect(228, 121, 230, 123, hex('#2a2e34'));
  // la sombra de los archivadores y de las mesas en el suelo; fichas caídas y marcas de las ruedas de los carritos
  for (let x = 0; x < 320; x++) { c_aclara(R, x, 113, hex('#000000'), 0.3); c_aclara(R, x, 114, hex('#000000'), 0.15); }
  for (let y = 123; y < 127; y++) for (let x = 12; x < 238; x++) if (y < 125 || x % 2) c_aclara(R, x, y, hex('#000000'), 0.18);
  for (const [x, y, a] of [[148, 168, 0], [204, 160, 1], [262, 171, 0], [176, 176, 1]]) { R.poligono([[x, y], [x + 7, y - a], [x + 8, y + 4 - a], [x + 1, y + 5]], P.ficha); pset(x + 2, y + 2, hex('#a8a090')); pset(x + 4, y + 2, hex('#a8a090')); }
  for (let k = 0; k < 3; k++) for (let i = 0; i < 70; i++) { const x = 130 + i * 2, y = Math.round(132 + k * 13 + Math.sin(i * 0.08 + k) * 3); if (h(i, k, 695) < 0.7) c_aclara(R, x, y, hex('#000000'), 0.12); }
}

function c_oficina(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  c_capa(R, 'oficina44', () => c_oficinaFija(R));
  // las nubes y los pájaros por la persiana (solo sobre el cielo)
  { const cielos = [P.c1, P.c2, P.c3], esCielo = (x, y, p) => x >= 176 && x <= 236 && y >= 22 && y <= 86 && cielos.includes(p), nubes = [hex('#ffffff'), hex('#e4ecf2'), hex('#b8c8d8')];
    [[0.9, 34, 14, 0], [1.6, 44, 10, 30], [2.4, 28, 8, 60]].forEach(([v, y, w, d]) => c_nubeCielo(R, 166 + ((t * v + d) % 90), y, w, nubes, esCielo));
    for (let k = 0; k < 2; k++) { const x = Math.round(170 + ((t * 11 + k * 40) % 80)), y = 40 + k * 8 + Math.round(Math.sin(t * 2 + k)), al = Math.floor(t * 7 + k) % 2; for (const [i, j] of [[0, 0], [-1, -al], [1, -al], [-2, al - 1], [2, al - 1]]) if (esCielo(x + i, y + j, R.pget(x + i, y + j)) || cielos.includes(R.pget(x + i, y + j))) pset(x + i, y + j, hex('#3a3a4a')); } }
  // el reloj: agujas y segundero
  { const a = (2.6 / 12) * Math.PI * 2 - Math.PI / 2, m = (t / 3600 + 0.3) * Math.PI * 2 - Math.PI / 2, s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
    linea(256, 54, Math.round(256 + Math.cos(a) * 3), Math.round(54 + Math.sin(a) * 3), C.k); linea(256, 54, Math.round(256 + Math.cos(m) * 5), Math.round(54 + Math.sin(m) * 5), C.k); linea(256, 54, Math.round(256 + Math.cos(s) * 5), Math.round(54 + Math.sin(s) * 5), hex('#c83a2a')); }
  // el ventilador del archivador, que gira y oscila
  { const ox = 262 + Math.round(Math.sin(t * 0.7) * 1); rect(260, 58, 264, 61, hex('#2a2e2a')); rect(261, 52, 262, 58, hex('#4a4e4a')); disco(ox, 49, 5, hex('#2a2e2a')); R.anillo(ox, 49, 5, hex('#8a9088'));
    for (let k = 0; k < 3; k++) { const a = t * 20 + k * 2.1; linea(ox, 49, Math.round(ox + Math.cos(a) * 4), Math.round(49 + Math.sin(a) * 4), hex('#b8beb4')); } pset(ox, 49, hex('#c8a040')); }
  // las lámparas colgantes, que se mecen un poco
  for (const [lx, k] of [[54, 0], [134, 1], [224, 2]]) { const sw = Math.round(Math.sin(t * 0.9 + k * 1.7) * 1.4); linea(lx, 0, lx + sw, 22, hex('#9a968a')); rect(lx + sw - 1, 21, lx + sw + 1, 22, hex('#4a4a40'));
    poligono([[lx + sw - 9, 29], [lx + sw - 3, 22], [lx + sw + 3, 22], [lx + sw + 9, 29]], C.k); poligono([[lx + sw - 8, 28], [lx + sw - 3, 23], [lx + sw + 3, 23], [lx + sw + 8, 28]], P.lampara); rect(lx + sw - 2, 23, lx + sw + 1, 23, P.lamparaL); rect(lx + sw - 8, 29, lx + sw + 8, 29, hex('#f4f0d8')); pset(lx + sw, 30, hex('#fff8c0')); }
  // los mecanógrafos del fondo, el carro de sus máquinas que avanza y vuelve (y la chispa de la campanilla)
  [[30, 0, { camisa: hex('#e8e4d8'), tirantes: hex('#4a3a2a'), pelo: hex('#3a2a1a') }], [88, 1, { camisa: hex('#c8a0a8'), pelo: hex('#8a5a2a'), moño: true }]].forEach(([x, k, f]) => {
    c_figura(R, x, 120, t, { ...f, sentado: true, teclea: true, pantalon: hex('#4a4a5a') });
    const u = ((t + k * 1.7) % 4) / 4, cx = Math.round(x - 6 + u * 10); rect(x - 8, 108, x + 6, 112, P.maquina); rect(x - 7, 108, x + 5, 108, P.maquinaL); for (let i = x - 6; i < x + 5; i += 2) pset(i, 110, hex('#8a8a90'));
    rect(cx - 8, 106, cx + 4, 107, hex('#3a3a40')); rect(cx - 5, 101, cx + 1, 105, P.hoja); for (let j = 102; j < 105; j += 2) rect(cx - 4, j, cx, j, hex('#9a9aa8')); pset(cx - 9, 106, hex('#c8c8c8'));
    if (u > 0.96) { pset(x + 8, 103, hex('#fff0a0')); pset(x + 9, 102, hex('#fff0a0')); } });
  // la clasificadora: las fichas que corren por arriba y caen en los cajetines; su operaria
  for (let k = 0; k < 3; k++) { const u = ((t * 0.9 + k / 3) % 1), x = Math.round(lerp(224, 188 + ((k * 5 + Math.floor(t * 0.9)) % 12) * 4, u)), y = u < 0.8 ? 99 : Math.round(lerp(99, 108, (u - 0.8) / 0.2)); rect(x, y, x + 3, y, P.ficha); pset(x, y + 1, P.fichaS); }
  if (Math.floor(t * 3) % 2) pset(221, 117, hex('#e85a3a'));
  c_figura(R, 240, 122, t, { camisa: hex('#5a7a9a'), falda: hex('#3a3a4a'), pelo: hex('#2a1a14'), moño: true, dir: -1, fichas: Math.sin(t * 1.5) > 0 });
  // el mensajero que cruza con un montón de fichas (pasa por detrás de la máquina y de la mesa de delante)
  { const per = 18, u = (t % per) / per, ida = u < 0.5, x = Math.round(ida ? lerp(4, 236, u * 2) : lerp(236, 4, u * 2 - 1)); c_figura(R, x, 126, t, { anda: true, dir: ida ? 1 : -1, camisa: hex('#e8e0c8'), pantalon: hex('#5a4a3a'), pelo: hex('#5a3a1a'), fichas: true }); }
  // la máquina de descifrar con su tira
  if (o.maquina !== false && PIEZAS_VM.maquinaDescifrar) {
    const mx = o.maquinaX ?? 150; for (let x = mx - 30; x <= mx + 30; x++) for (const y of [150, 151]) c_aclara(R, x, y, hex('#000000'), 0.3);
    linea(mx - 28, 120, mx - 40, 113, hex('#2a2a2a')); linea(mx - 40, 113, mx - 40, 112, hex('#2a2a2a'));
    PIEZAS_VM.maquinaDescifrar(R, mx, 150, { s: 2, t, tira: o.tira ?? 0.5, pregunta: !!o.pregunta });
  }
  return { suelo: 150, libre: [180, 310], maquina: [o.maquinaX ?? 150, 150], mesaDelante: [0, 122, 138], ventana: [176, 22, 236, 86] };
}

// la mesa larga de delante (oficina general): tablero, faldón, patas torneadas, la máquina de escribir, ficheros,
// fichas, la taza que humea y el flexo
function c_mesaOficina(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  rect(0, 137, 122, 142, C.k); rect(0, 138, 121, 140, P.mesaL); for (let x = 0; x < 121; x++) if (Math.sin(x * 0.35 + h(x >> 3, 2, 691) * 5) > 0.82) pset(x, 139, P.mesa); rect(0, 141, 121, 141, P.mesa);
  rect(0, 143, 121, 150, P.mesaS); rect(0, 143, 121, 143, P.mesaD); rect(0, 150, 121, 150, P.mesaD);
  rect(2, 151, 8, 179, P.mesaD); rect(3, 151, 7, 179, P.mesa); rect(3, 151, 3, 179, P.mesaL); rect(1, 160, 9, 162, P.mesaS); rect(112, 151, 118, 179, P.mesaD); rect(113, 151, 117, 179, P.mesa); rect(113, 151, 113, 179, P.mesaL); rect(111, 160, 119, 162, P.mesaS);
  rect(9, 170, 111, 172, P.mesaS); rect(9, 170, 111, 170, P.mesa);
  // debajo: la papelera con bolas de papel
  rect(70, 166, 84, 179, hex('#2a2e2a')); rect(71, 167, 83, 179, hex('#5a6a5a')); for (let x = 73; x < 83; x += 3) rect(x, 169, x, 178, hex('#6a7a6a')); for (const [x, y] of [[74, 165], [79, 164]]) { disco(x, y, 2, C.k); disco(x, y, 1.6, C.blanco); }
  // la máquina de escribir negra de frente: cuerpo, teclas redondas, el carro con sus rodillos y la hoja con signos
  rect(4, 128, 32, 138, C.k); rect(5, 129, 31, 137, P.maquina); rect(5, 129, 31, 129, P.maquinaL);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { const x = 7 + i * 4 + j, y = 131 + j * 2; pset(x, y, hex('#d8d4c8')); pset(x + 1, y, hex('#8a8a8a')); }
  const ca = Math.round(((t % 5) / 5) * 6); rect(0 + ca, 125, 30 + ca, 127, C.k); rect(1 + ca, 126, 29 + ca, 126, hex('#4a4a52')); disco(ca, 126, 2, C.k); disco(30 + ca, 126, 2, C.k);
  rect(8 + ca, 114, 24 + ca, 125, P.hoja); rect(8 + ca, 114, 8 + ca, 125, hex('#d8d4c4')); for (let y = 116; y < 124; y += 3) c_signos(R, 10 + ca, y, 3, y + 3, hex('#2a2a3a'), 22 + ca);
  // los dos ficheros de madera con fichas y las fichas sueltas
  for (const a of [36, 96]) { rect(a, 131, a + 14, 138, P.mesaD); rect(a + 1, 132, a + 13, 137, P.mesa); rect(a + 1, 132, a + 13, 132, P.mesaL); for (let x = a + 2; x < a + 13; x += 2) rect(x, 129 + (x % 3 === 0 ? -1 : 0), x, 131, P.ficha); rect(a + 6, 128, a + 8, 129, hex('#c84a4a')); disco(a + 7, 135, 1, hex('#c8a040')); }
  for (let k = 0; k < 4; k++) { const x = 54 + k * 9; rect(x, 136 - (k % 2), x + 7, 137, P.fichaS); rect(x, 136 - (k % 2), x + 7, 136 - (k % 2), P.ficha); }
  // la taza que humea
  rect(86, 133, 91, 137, C.k); rect(87, 133, 90, 137, hex('#e8e4d8')); pset(92, 134, C.k); pset(92, 135, C.k); rect(87, 133, 90, 133, hex('#5a3a24'));
  for (let p = 0; p < 4; p++) { const u = (t * 0.5 + p / 4) % 1; c_aclara(R, Math.round(88 + Math.sin(t * 3 + p * 2) * 1.5), Math.round(131 - u * 12), C.blanco, 0.5 * (1 - u)); }
  // el flexo de brazo articulado, con su luz sobre la mesa
  rect(112, 136, 120, 137, hex('#2a2e2a')); linea(116, 136, 120, 124, hex('#3a3e3a')); linea(120, 124, 112, 116, hex('#3a3e3a')); poligono([[106, 120], [108, 114], [114, 114], [116, 120]], P.lampara); rect(107, 120, 115, 120, hex('#fff4c0'));
  for (let y = 121; y < 138; y++) for (let x = 100 - (y - 121); x < 122; x++) if ((x + y) % 2 === 0) c_aclara(R, x, y, hex('#fff4c0'), 0.12);
  return { tablero: 138 };
}

const c_FICHAS = Array.from({ length: 20 }, (_, i) => [56 + (i % 5) * 38 + Math.round((h(i, 1, 692) - 0.5) * 3), 28 + Math.floor(i / 5) * 30 + Math.round((h(i, 2, 692) - 0.5) * 3)]);

function c_fichasFija(R) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  // el tablero de roble en tablas, con vetas
  for (let y = 0; y < 180; y++) { const tabla = Math.floor(y / 30); for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.6 + tabla * 3 + Math.sin(x * 0.013 + tabla) * 3); let c = v > 0.8 ? P.mesaS : v < -0.9 ? P.mesaL : P.mesa; if (y % 30 === 0) c = P.mesaD; pset(x, y, c); } }
  // el secante verde con cantoneras de cuero
  rect(44, 18, 300, 170, P.telaS); rect(45, 19, 299, 169, P.tela); for (let y = 19; y < 170; y++) for (let x = 45; x < 300; x++) if (h(x, y, 693) < 0.12) pset(x, y, (x + y) % 2 ? P.telaS : P.telaL);
  for (const [x, y, sx, sy] of [[44, 18, 1, 1], [300, 18, -1, 1], [44, 170, 1, -1], [300, 170, -1, -1]]) { poligono([[x, y], [x + sx * 16, y], [x, y + sy * 16]], hex('#6a3a24')); linea(x + sx * 16, y, x, y + sy * 16, hex('#8a5a34')); }
  // el fichero de madera con fichas de pie y separadores de colores
  rect(4, 22, 40, 92, P.mesaD); rect(6, 24, 38, 90, hex('#5a3a20')); for (let y = 26; y < 89; y += 2) { rect(8, y, 36, y, P.ficha); if (y % 14 === 0) rect(8 + (y % 3) * 9, y - 1, 16 + (y % 3) * 9, y, [hex('#c84a4a'), hex('#4a7ac8'), hex('#c8a040')][y % 3]); } rect(18, 90, 26, 92, hex('#c8a040'));
  // la hoja de recuento: palotes y cifras
  rect(250, 52, 292, 128, hex('#a8a090')); rect(251, 53, 291, 127, P.hoja); for (let y = 58; y < 127; y += 6) rect(252, y, 290, y, P.rejilla); rect(258, 53, 258, 127, hex('#e0a0a0'));
  for (let j = 0; j < 11; j++) { const y = 59 + j * 6; c_signo(R, 253, y, j, hex('#2a2a3a')); const n = 2 + Math.floor(h(j, 1, 694) * 9); for (let k = 0; k < n; k++) { const x = 261 + k * 2 + Math.floor(k / 5) * 2; if (k % 5 === 4) linea(x - 8, y + 3, x, y, hex('#3a3a4a')); else rect(x, y, x, y + 3, hex('#3a3a4a')); } c_digitos(R, String(n * 7 + 3), 281, y, hex('#a83a2a')); }
  // el lápiz, la goma y los clips
  for (let i = 0; i < 30; i++) { const x = 150 + i, y = 160 - Math.round(i * 0.25); pset(x, y, hex('#e8c040')); pset(x, y + 1, hex('#c89a20')); }
  pset(149, 160, hex('#e8c8a0')); pset(148, 161, hex('#3a3a3a')); rect(180, 152, 182, 153, hex('#c8c8c0')); rect(183, 151, 185, 152, hex('#e88a9a'));
  rect(196, 150, 206, 155, hex('#e8a0a0')); rect(196, 150, 206, 150, hex('#f8c0c0'));
  for (const [x, y] of [[214, 154], [222, 158]]) { R.anillo(x, y, 2, hex('#c8ccd8')); pset(x + 2, y + 2, hex('#c8ccd8')); }
  // el mazo que queda por poner
  for (let j = 0; j < 5; j++) { rect(60 - j, 146 - j, 92 - j, 166 - j, P.fichaS); rect(60 - j, 146 - j, 91 - j, 165 - j, P.ficha); }
  rect(56, 145, 87, 145, hex('#c84a4a'));
  // el plato de la taza
  disco(276, 150, 14, hex('#b8b4a8')); disco(276, 150, 13, hex('#e8e4d8')); R.anillo(276, 150, 9, hex('#d4d0c4'));
  // la luz de la lámpara: un charco cálido y los bordes más oscuros
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 150, (y - 80) * 1.3) / 190; if (d < 0.5) { if ((x + y) % 2 === 0) c_aclara(R, x, y, hex('#fff0c0'), 0.14 * (1 - d * 2)); } else if (d > 0.75) c_aclara(R, x, y, hex('#000000'), Math.min(0.35, (d - 0.75) * 1.2)); }
}

// una ficha del texto (x, y la esquina): sombra, la raya roja, los renglones azules, signos y su número
function c_ficha(R, x, y, i) {
  const { rect } = R, P = P_OF;
  rect(x + 1, y + 1, x + 32, y + 22, hex('#1e3a2a')); rect(x, y, x + 31, y + 21, P.ficha); rect(x, y, x + 31, y, hex('#fff8e0'));
  rect(x + 1, y + 4, x + 30, y + 4, hex('#d85a5a')); for (const j of [9, 14, 19]) rect(x + 1, y + j, x + 30, y + j, hex('#a8c0d8'));
  c_digitos(R, String(100 + i), x + 18, y + 1, hex('#6a6a7a'));
  c_signos(R, x + 2, y + 5, 7, i * 3 + 1, hex('#2a2a3a'), x + 29); c_signos(R, x + 2, y + 10, 6, i * 3 + 2, hex('#2a2a3a'), x + 29); c_signos(R, x + 2, y + 15, 5, i * 3 + 3, hex('#2a2a3a'), x + 24);
  R.pset(x, y + 21, hex('#d8c8a0')); R.pset(x + 31, y, hex('#d8c8a0'));
}

function c_fichas(R, t, o) {
  const { rect, pset, disco, linea } = R, P = P_OF;
  c_capa(R, 'fichas', () => c_fichasFija(R));
  const n = Math.round(c_lim(o.n ?? 1) * 20);
  for (let i = 0; i < n; i++) c_ficha(R, c_FICHAS[i][0], c_FICHAS[i][1], i);
  // la ficha marcada con lápiz rojo
  if (o.marca != null && o.marca < n) { const [x, y] = c_FICHAS[o.marca], u = c_lim((t % 100) * 0.8); for (let a = 0; a < u * 6.6; a += 0.05) { pset(Math.round(x + 16 + Math.cos(a) * 21), Math.round(y + 11 + Math.sin(a) * 15), hex('#d83a2a')); pset(Math.round(x + 16 + Math.cos(a) * 22), Math.round(y + 11 + Math.sin(a) * 15), hex('#d83a2a')); } }
  // la taza de café desde arriba y su vapor
  disco(276, 150, 8, hex('#c8c4b8')); disco(276, 150, 7, hex('#f2eee4')); disco(276, 150, 5, hex('#4a2a14')); pset(274, 148, hex('#8a5a34')); pset(275, 148, hex('#c89a6a')); rect(284, 149, 287, 151, hex('#e8e4d8'));
  for (let p = 0; p < 6; p++) { const u = (t * 0.35 + p / 6) % 1, x = Math.round(276 + Math.sin(t * 2 + p * 1.7 + u * 5) * (2 + u * 4)), y = Math.round(146 - u * 30); c_aclara(R, x, y, C.blanco, 0.45 * (1 - u)); c_aclara(R, x + 1, y, C.blanco, 0.3 * (1 - u)); }
  // la lupa que recorre las fichas y las amplía
  if (o.lupa !== false) {
    const [lx, ly] = Array.isArray(o.lupa) ? o.lupa : [Math.round(150 + Math.sin(t * 0.45) * 66), Math.round(80 + Math.sin(t * 0.73 + 1) * 34)], r = 15;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= (r + 2) * (r + 2)) c_aclara(R, lx + i + 5, ly + j + 6, hex('#000000'), 0.25);
    const muestra = []; for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) muestra.push([i, j, R.pget(lx + Math.round(i * 0.55), ly + Math.round(j * 0.55))]);
    for (const [i, j, c] of muestra) pset(lx + i, ly + j, c_mezcla(c, hex('#e8f4ff'), 0.08));
    for (let k = 0; k < 14; k++) { const x = lx + r + 3 + k, y = ly + r + 3 + k; rect(x, y, x + 2, y + 2, k < 3 ? hex('#8a6420') : hex('#5a3a20')); pset(x, y, k < 3 ? hex('#f0d080') : hex('#7a5232')); }
    R.anillo(lx, ly, r + 1, hex('#8a6420')); R.anillo(lx, ly, r + 2, hex('#c89a40')); R.anillo(lx, ly, r + 3, hex('#2a1a0a'));
    for (let a = 3.6; a < 4.4; a += 0.05) pset(Math.round(lx + Math.cos(a) * (r - 3)), Math.round(ly + Math.sin(a) * (r - 3)), C.blanco); pset(lx - 6, ly - 8, C.blanco);
  }
  return { fichas: c_FICHAS.map(([x, y]) => [x + 16, y + 11]), mazo: [76, 156], taza: [276, 150] };
}

function c_maquinaFija(R, año) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  rect(0, 0, 319, 3, P.techo); rect(0, 3, 319, 4, hex('#b0ac96'));
  c_paredOficina(R, 5, 92, 140, 120);
  c_linoleo(R, 141, 160, 90);
  // la tabla de signos y cifras clavada en la pared
  rect(116, 22, 204, 82, hex('#8a8a7a')); rect(117, 23, 203, 81, P.hoja); for (let y = 30; y < 81; y += 7) rect(118, y, 202, y, P.rejilla); for (let x = 132; x < 203; x += 14) rect(x, 24, x, 80, P.rejilla);
  rect(117, 23, 203, 28, hex('#d8d0b8'));
  for (let j = 0; j < 7; j++) { const y = 31 + j * 7; c_signo(R, 121, y + 1, j + 2, hex('#2a2a3a')); c_signo(R, 125, y + 1, j * 2 + 1, hex('#2a2a3a')); for (let i = 0; i < 5; i++) c_digitos(R, String(Math.floor(h(i, j, 701) * 90) + 10), 136 + i * 14, y + 1, i === 2 && j === 3 ? hex('#c83a2a') : hex('#3a3a4a')); }
  for (const [x, y] of [[118, 24], [202, 24]]) pset(x, y, hex('#c83a2a'));
  // el reloj
  disco(72, 34, 10, hex('#2a2a30')); disco(72, 34, 9, hex('#f4f0e4')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(72 + Math.cos(a) * 7), Math.round(34 + Math.sin(a) * 7), hex('#5a5a60')); }
  // el calendario de la pared (o.año), la balda con archivadores de lomo y cajas de fichas, y el tablón con fichas clavadas
  rect(92, 22, 110, 50, hex('#9a927e')); rect(92, 22, 109, 49, P.hoja); rect(92, 22, 109, 28, hex('#3a5a7a')); c_digitos(R, String(año), 93, 23, P.hoja); c_digitos(R, '6', 97, 31, hex('#a83a2a'), 3);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) pset(94 + i * 3, 46 + j * 2, hex('#a8a090')); pset(100, 21, hex('#4a4a4a'));
  rect(4, 68, 86, 70, P.mesaS); rect(4, 68, 86, 68, P.mesaL); for (const x of [10, 78]) poligono([[x, 71], [x + 4, 71], [x, 76]], P.mesaD);
  for (let k = 0; k < 9; k++) { const x = 6 + k * 5, c = [hex('#3a4a6a'), hex('#6a3a2a'), hex('#3a5a3a'), hex('#8a7a4a')][k % 4]; rect(x, 52, x + 4, 67, C.k); rect(x, 53, x + 3, 67, c); rect(x + 1, 57, x + 2, 59, P.hoja); }
  for (let k = 0; k < 2; k++) { const x = 54 + k * 16; rect(x, 58, x + 14, 67, P.mesaD); rect(x + 1, 59, x + 13, 67, P.mesa); for (let i = x + 2; i < x + 13; i += 2) rect(i, 56 + (i % 3 === 0 ? -1 : 0), i, 58, P.ficha); rect(x + 6, 62, x + 8, 63, hex('#c8a040')); }
  rect(14, 80, 64, 112, P.mesaD); rect(15, 81, 63, 111, P.corcho); for (let k = 0; k < 60; k++) pset(15 + Math.floor(h(k, 3, 703) * 48), 81 + Math.floor(h(k, 4, 703) * 30), P.corchoS);
  for (let k = 0; k < 6; k++) { const x = 18 + (k % 3) * 15, y = 84 + Math.floor(k / 3) * 13; rect(x, y, x + 12, y + 9, P.ficha); rect(x, y + 2, x + 12, y + 2, hex('#d85a5a')); c_signos(R, x + 1, y + 4, 3, k + 40, hex('#2a2a3a'), x + 11); pset(x + 6, y, hex('#c83a2a')); }
  // el enchufe en el zócalo
  rect(16, 124, 22, 130, hex('#d8d4c8')); pset(18, 126, C.k); pset(20, 126, C.k); pset(19, 128, C.k);
  // la puerta con el cristal esmerilado, el marco y el pomo
  rect(212, 26, 266, 140, hex('#5a4030')); rect(214, 28, 264, 140, P.mesa); rect(214, 28, 215, 140, P.mesaL);
  rect(219, 34, 259, 88, hex('#3a2a20')); rect(220, 35, 258, 87, hex('#c8d0c8')); for (let y = 35; y < 88; y++) for (let x = 220; x < 259; x++) if (h(x, y, 702) < 0.25) pset(x, y, hex('#d8e0d8'));
  for (let y = 94; y < 136; y += 14) { rect(219, y, 259, y + 11, P.mesaD); rect(220, y + 1, 259, y + 11, P.mesaL); rect(221, y + 2, 258, y + 10, P.mesa); }
  disco(260, 100, 2, hex('#c8a040')); pset(259, 99, hex('#f0d080'));
  // el archivador de la derecha
  rect(272, 56, 319, 140, hex('#2a2e2a')); rect(273, 57, 319, 140, P.archivo); rect(273, 57, 273, 140, P.archivoL);
  for (let j = 0; j < 4; j++) { const y = 59 + j * 20; rect(275, y, 319, y + 17, P.archivoS); rect(276, y + 1, 319, y + 17, P.archivoL); rect(277, y + 2, 319, y + 16, P.archivo); rect(290, y + 5, 304, y + 8, hex('#c8c8c0')); rect(291, y + 6, 303, y + 7, hex('#f0ece0')); rect(292, y + 11, 302, y + 13, hex('#d8d8d0')); }
  for (let j = 0; j < 3; j++) { rect(276 + (j % 2), 53 - j * 2, 318, 55 - j * 2, hex('#2a2a2a')); rect(277 + (j % 2), 53 - j * 2, 318, 54 - j * 2, j % 2 ? P.hoja : P.ficha); }
  // una papelera y un taburete de metal
  rect(176, 128, 190, 140, hex('#2a2e2a')); rect(177, 129, 189, 140, hex('#5a6a5a')); for (let x = 179; x < 189; x += 3) rect(x, 131, x, 139, hex('#6a7a6a'));
  for (let k = 0; k < 4; k++) { disco(179 + k * 3, 127 - (k % 2), 2, C.k); disco(179 + k * 3, 127 - (k % 2), 1.6, (k % 2) ? P.ficha : C.blanco); }
  rect(150, 118, 166, 120, hex('#3a3e3a')); rect(150, 118, 166, 118, hex('#6a6e6a')); for (const x of [152, 164]) linea(x, 120, x + (x < 158 ? -3 : 3), 140, hex('#3a3e3a')); linea(150, 132, 166, 132, hex('#3a3e3a'));
  // la sombra del zócalo en el suelo
  for (let x = 0; x < 320; x++) c_aclara(R, x, 141, hex('#000000'), 0.3);
}

function c_maquinaCerca(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = P_OF;
  const año = o.año ?? 1944;
  c_capa(R, 'maquina44|' + año, () => c_maquinaFija(R, año));
  // el reloj: segundero
  { const m = (t / 3600 + 0.2) * Math.PI * 2 - Math.PI / 2, s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2, a = 0.6 * Math.PI * 2 - Math.PI / 2;
    linea(72, 34, Math.round(72 + Math.cos(a) * 4), Math.round(34 + Math.sin(a) * 4), C.k); linea(72, 34, Math.round(72 + Math.cos(m) * 7), Math.round(34 + Math.sin(m) * 7), C.k); linea(72, 34, Math.round(72 + Math.cos(s) * 7), Math.round(34 + Math.sin(s) * 7), hex('#c83a2a')); }
  // las siluetas borrosas que pasan detrás del cristal esmerilado
  for (let k = 0; k < 2; k++) { const u = ((t * 0.13 + k * 0.55) % 1), x = Math.round(lerp(206, 272, u)), dir = k ? -1 : 1, xx = dir > 0 ? x : 478 - x;
    for (let j = 0; j < 40; j++) for (let i = -6; i <= 6; i++) { const px = xx + i, py = 50 + j; if (px < 220 || px > 258 || py > 87) continue; const cab = j < 10 ? Math.hypot(i, j - 5) < 5 : Math.abs(i) < 7 - (j < 14 ? 2 : 0); if (cab && (px + py) % 2 === 0) c_aclara(R, px, py, hex('#5a6a6a'), 0.35); } }
  // la lámpara colgante (fuera de la barra del año), que se mece; su luz
  { const sw = Math.round(Math.sin(t * 0.9) * 1.5), lx = 186; linea(lx, 0, lx + sw, 6, hex('#8a8678')); poligono([[lx + sw - 10, 14], [lx + sw - 4, 6], [lx + sw + 4, 6], [lx + sw + 10, 14]], C.k); poligono([[lx + sw - 9, 13], [lx + sw - 4, 7], [lx + sw + 4, 7], [lx + sw + 9, 13]], P.lampara); rect(lx + sw - 3, 7, lx + sw + 2, 7, P.lamparaL); rect(lx + sw - 9, 14, lx + sw + 9, 14, hex('#f4f0d8')); }
  // el cable de la máquina al enchufe y la máquina a triple tamaño con su tira por el suelo
  const mx = o.maquinaX ?? 67;
  for (let x = mx - 46; x <= mx + 46; x++) for (const y of [162, 163, 164]) c_aclara(R, x, y, hex('#000000'), 0.32);
  linea(mx - 40, 150, 26, 146, hex('#2a2a2a')); linea(26, 146, 19, 131, hex('#2a2a2a'));
  if (PIEZAS_VM.maquinaDescifrar) PIEZAS_VM.maquinaDescifrar(R, mx, 162, { s: 3, t, tira: o.tira ?? 1, pregunta: !!o.pregunta });
  const largo = Math.round(c_lim(o.tira ?? 1) * 80), finX = Math.max(mx + 51, mx - 42 + Math.max(0, largo - 25 + 31) * 3);
  return { suelo: 162, maquina: [mx, 162], finTira: [Math.min(316, finX), 160], libre: [120, 270] };
}

// los colores del laboratorio: Arizona (pared, resina, tanque, imán, desierto), la sala de ordenadores y el escriptorio
const D = pal({
  paredA: '#dcd6c6', paredAS: '#c4bca8', paredAL: '#eee8da', juntaA: '#a8a08c', techoA: '#cac6ba', techoAS: '#aeaa9e',
  sueloA: '#8e9a94', sueloAS: '#7a8680', sueloAL: '#a8b4ae', sueloAJ: '#6a7670',
  tanque: '#3a78a8', tanqueL: '#62a2cc', tanqueS: '#285c88', tanqueD: '#1a3e60', tanqueB: '#a8d0ea',
  iman: '#c8402e', imanL: '#e86a4a', imanS: '#8a2a1e', cobre: '#d0843e', cobreS: '#8e5226', cobreL: '#f0b06a',
  resina: '#2a2e34', resinaL: '#464c56', resinaS: '#1a1d22', armario: '#d4d8dc', armarioS: '#a8aeb6', armarioL: '#eceef0',
  cielo1: '#5aa0e0', cielo2: '#84bcec', cielo3: '#b8daf2', meseta: '#c8704a', mesetaS: '#9a4e34', mesetaL: '#e0905e',
  lejos: '#b88a8a', lejosS: '#a07a80', arena: '#e0b47a', arenaS: '#c8945a', arenaL: '#eccc96',
  saguaro: '#4a8a3a', saguaroS: '#2e5a26', saguaroL: '#72aa52', matorral: '#7a8a4a',
  bata: '#eef0f2', bataS: '#c4cad4', bataD: '#9aa2b0',
  pantO: '#101a28', pantOL: '#1c2c42', pantOR: '#2a3e5a', cian: '#5ad0e8', oro: '#f0c040', oroS: '#a8801c',
  paredO: '#dedce6', paredOS: '#c6c4d2', paredOL: '#eeecf4', moq1: '#5a6070', moq2: '#4c5262', moqL: '#6a7084', moqS: '#3e4452',
  pizarra: '#f4f6f8', pizarraS: '#c8ccd4', rotu1: '#2a5ab8', rotu2: '#c83a3a', rotu3: '#2a8a5a',
  barra: '#4a9ad8', barraL: '#8ac8f0', barraS: '#2a6aa8', naranja: '#f0904a',
  mesaO: '#c8a070', mesaOS: '#a07c50', mesaOL: '#e0bc8c', mesaOD: '#7a5a38',
  ladrillo: '#a8543e', ladrilloS: '#844032', ladrilloL: '#c06c50', hoja: '#4a9a4a', hojaS: '#2e6e34', hojaL: '#7ac05a',
  piedra: '#a89a84', piedraS: '#8a7c68', piedraL: '#c2b49c', piedraJ: '#6a5e4e', piedraD: '#5a4e40',
  viga: '#4e3424', vigaS: '#36241a', vigaL: '#6a4a32', baldosa: '#a8644a', baldosaS: '#88503c', baldosaL: '#c07a58', baldosaJ: '#5e3428',
  luz: '#fff2c4', vidrio: '#b8d4dc', vidrioS: '#8eb0bc', plomo: '#3a3a44', habito: '#6a4a30', habitoS: '#4a3220',
  vela: '#f0e6c8', velaS: '#c8b890', llama: '#ffd860', llamaL: '#fff8d0', llamaS: '#e8802a',
  pergamino: '#ead8ae', pergaminoS: '#c8b080', pergaminoL: '#f6e8c6', tinta: '#4a2e1c', tintaF: '#7a5236',
  aluminio: '#d8dee6', aluminioS: '#aab4c0', laton: '#c8a040', latonS: '#8a6a24',
});

const d_CACHE = new WeakMap();

// el fondo fijo de un encuadre: se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma
function d_fijo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// la mezcla de dos colores (a hacia b en la proporción k)
const d_mez = (a, b, k) => { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; };

const d_lim = (u) => Math.max(0, Math.min(1, u));

const d_suave = (u) => { u = d_lim(u); return u * u * (3 - 2 * u); };

// aclara (o tiñe) un píxel ya pintado hacia el color c en la proporción k
const d_tine = (R, x, y, c, k) => { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, d_mez(R.pget(x, y), c, k)); };

// la trama ordenada 2 × 2 para los degradados tramados
const d_bayer = (x, y) => [[0.12, 0.62], [0.87, 0.37]][y & 1][x & 1];

// un cielo tramado en tres tonos dentro de [x0, y0, x1, y1] (respeta R.recorte: va con pset)
function d_cieloTramado(R, x0, y0, x1, y1, c1, c2, c3) {
  for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * 2; for (let x = x0; x <= x1; x++) { const i = Math.floor(f), fr = f - i, k = fr > d_bayer(x, y) ? i + 1 : i; R.pset(x, y, k <= 0 ? c1 : k === 1 ? c2 : c3); } }
}

// una nube de tres tonos hecha con discos (respeta R.recorte); w: el ancho
function d_nube(R, x, y, w) {
  const B = [[0, 0, 0.3], [-0.3, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.14, 0.24]];
  for (const [dx, dy, r] of B) R.disco(Math.round(x + dx * w), Math.round(y + dy * w + 1), Math.max(1, r * w), hex('#c4d4e6'));
  for (const [dx, dy, r] of B) R.disco(Math.round(x + dx * w), Math.round(y + dy * w), Math.max(1, r * w), hex('#e4eef6'));
  for (const [dx, dy, r] of B) R.disco(Math.round(x + dx * w - 1), Math.round(y + dy * w - 1), Math.max(1, r * w * 0.68), C.blanco);
}

// las cifras pequeñas de 3 × 5 (las pantallas y la regla); esc: el tamaño del píxel
const d_DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'], '-': ['...', '...', '###', '...', '...'] };

function d_num(R, s, x, y, c, esc = 1) {
  let cx = x;
  for (const ch of String(s)) { const g = d_DIG[ch]; if (g) for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') { for (let b = 0; b < esc; b++) for (let a = 0; a < esc; a++) R.pset(cx + i * esc + a, y + j * esc + b, c); } cx += 4 * esc; }
  return cx - x;
}

// LOS SIGNOS INVENTADOS (no son letras de ningún alfabeto): bucles, horcas y colas de 5 filas
const d_GLIFOS = [
  ['.##.', '#..#', '.###', '...#', '..#.'], ['#.#..', '###..', '#.###', '#...#', '.###.'], ['.#..', '#.#.', '.##.', '..#.', '.#..'],
  ['#...', '#.#.', '##.#', '#..#', '#..#'], ['.#.#.', '#.#.#', '#.#.#', '.#.#.', '..#..'], ['..#', '.#.', '.##', '#.#', '.#.'],
  ['#..#', '####', '#..#', '.##.', '..#.'], ['.#.', '#.#', '.#.', '#.#', '##.'], ['#.#', '#.#', '.#.', '.#.', '#..'],
];

// un renglón de n signos inventados desde (x, y) (arriba a la izquierda), con huecos de palabra; k: la semilla.
// Devuelve las posiciones [x, y] de cada signo (para que la pluma vaya de uno a otro)
function d_renglon(R, x, y, n, c, k, esc = 1) {
  const pos = []; let cx = x;
  for (let i = 0; i < n; i++) {
    const g = d_GLIFOS[Math.floor(h(i, k, 251) * d_GLIFOS.length)];
    for (let j = 0; j < 5; j++) for (let a = 0; a < g[j].length; a++) if (g[j][a] === '#') for (let b = 0; b < esc; b++) for (let e = 0; e < esc; e++) R.pset(cx + a * esc + e, y + j * esc + b, c);
    pos.push([cx + g[0].length * esc, y + 4 * esc]); cx += (g[0].length + 1) * esc + (h(i, k, 252) < 0.22 ? 3 * esc : 0);
  }
  return pos;
}

// una figura pequeña de fondo (12 px): pelo, cara, ropa y piernas; c.anda (paso), c.espalda (de espaldas), c.dir
function d_figura(R, x, pie, t, c = {}) {
  const { rect, pset } = R, ropa = c.ropa ?? D.bata, ropaS = c.ropaS ?? D.bataS, piel = c.piel ?? hex('#e8b48a'), pelo = c.pelo ?? hex('#4a3020'), pierna = c.pierna ?? hex('#3a4a6a');
  const paso = c.anda ? Math.floor(t * 6 + x) % 2 : 0, d = c.dir ?? 1;
  rect(x - 2, pie - 12, x + 2, pie - 8, C.k); rect(x - 1, pie - 11, x + 1, pie - 9, c.espalda ? pelo : piel); rect(x - 1, pie - 11, x + 1, pie - 11, pelo);
  if (!c.espalda) pset(x + d, pie - 10, C.k);
  rect(x - 3, pie - 8, x + 3, pie - 2, C.k); rect(x - 2, pie - 7, x + 2, pie - 3, ropa); rect(x + 1, pie - 7, x + 2, pie - 3, ropaS);
  if (c.brazo) { pset(x + 3 * d, pie - 6 - c.brazo, piel); pset(x + 3 * d, pie - 5, ropa); }
  rect(x - 2, pie - 2, x - 1, pie - (paso ? 1 : 0), pierna); rect(x + 1, pie - 2, x + 2, pie - (paso ? 0 : 1), pierna);
  rect(x - 2, pie, x + 2, pie, C.k);
}

function d_radioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared de paneles con su vinilo moteado, juntas con brillo, el pasamanos de protección y el zócalo
  rect(0, 0, 319, 179, D.paredA);
  for (let y = 17; y < 108; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 201); if (n < 0.05) pset(x, y, D.paredAS); else if (n > 0.975) pset(x, y, D.paredAL); }
  for (let x = 48; x < 320; x += 48) { rect(x, 18, x, 107, D.juntaA); rect(x + 1, 18, x + 1, 107, D.paredAL); }
  rect(0, 99, 319, 101, D.paredAS); rect(0, 99, 319, 99, D.paredAL); rect(0, 102, 319, 102, D.juntaA);
  rect(0, 108, 319, 113, D.juntaA); rect(0, 108, 319, 108, D.paredAS); for (let x = 3; x < 320; x += 9) pset(x, 111, D.paredAS);
  // el techo de placas perforadas (tranquilo bajo la barra del año), la cornisa
  rect(0, 0, 319, 14, D.techoA); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 14, D.techoAS); rect(0, 7, 319, 7, D.techoAS);
  for (let k = 0; k < 260; k++) pset(Math.floor(h(k, 1, 202) * 320), Math.floor(h(k, 2, 202) * 14), D.techoAS);
  rect(0, 15, 319, 17, D.paredAS); rect(0, 15, 319, 15, D.paredAL); rect(0, 17, 319, 17, D.juntaA);
  // los plafones (encima del acelerador) con su resplandor tramado
  for (const [x0, x1] of [[178, 228]]) { rect(x0, 1, x1, 6, C.k); rect(x0 + 1, 2, x1 - 1, 5, C.blanco); for (let x = x0 + 5; x < x1; x += 5) rect(x, 2, x, 5, D.techoA);
    for (let y = 7; y < 15; y++) for (let x = x0 - (y - 7); x <= x1 + (y - 7); x++) if ((x + y) % 4 === 0) pset(x, y, D.paredAL); }
  // la bandeja de cables bajo el techo, con sus colgadores, y los cables que bajan al rack por fuera de la esquina de Atom
  for (const x of [128, 200, 262]) rect(x, 15, x, 19, C.metalD);
  rect(96, 19, 276, 19, C.metalS); rect(96, 24, 276, 24, C.metalS); for (let x = 98; x < 276; x += 6) rect(x, 19, x, 24, C.metalD);
  [hex('#c83a3a'), hex('#3a5ab8'), hex('#e8c040'), hex('#2a2a30')].forEach((c, i) => { rect(96, 20 + i, 270 + i, 20 + i, c); rect(270 + i, 20 + i, 270 + i, 47 - i, c); rect(270 + i, 47 - i, 282, 47 - i, c); });
  rect(268, 24, 268, 48, C.metalS); rect(275, 24, 275, 48, C.metalS);
  // la ventana al desierto: el marco de aluminio (el cristal se pinta en cada fotograma) y el alféizar
  rect(6, 22, 94, 84, C.k); rect(7, 23, 93, 83, C.metalL); rect(9, 25, 91, 81, C.metalS); rect(7, 23, 93, 23, C.blanco);
  rect(4, 84, 96, 87, C.k); rect(5, 84, 95, 85, D.paredAL); rect(5, 86, 95, 86, D.paredAS);
  // el banco de preparación bajo la ventana: encimera de resina, armarios con tiradores
  rect(2, 97, 98, 113, C.k); rect(3, 97, 97, 98, D.resinaL); rect(3, 99, 97, 99, D.resina);
  rect(3, 100, 97, 112, D.armario); for (let x = 5; x < 96; x += 23) { rect(x, 102, x + 20, 111, D.armarioS); rect(x + 1, 103, x + 20, 111, D.armario); rect(x + 1, 103, x + 19, 103, D.armarioL); rect(x + 8, 105, x + 12, 105, C.metalD); }
  // la placa calefactora con el vaso, el termo de nitrógeno, el hornito y la gradilla de tubos
  rect(9, 92, 27, 96, C.k); rect(10, 93, 26, 95, C.metalL); pset(12, 94, C.rojo); rect(15, 94, 22, 94, C.metalS);
  rect(12, 80, 24, 92, C.k); rect(13, 80, 23, 91, hex('#d8eef6')); rect(13, 86, 23, 91, hex('#b8a888')); rect(13, 86, 23, 86, hex('#d8c8a8')); rect(14, 81, 14, 90, C.blanco); rect(11, 80, 13, 80, C.k);
  rect(31, 78, 43, 96, C.k); rect(32, 79, 42, 95, C.metalL); rect(32, 79, 34, 95, C.blanco); rect(40, 79, 42, 95, C.metalS); rect(31, 78, 43, 80, C.metalD); rect(33, 88, 41, 88, C.metalS);
  rect(48, 80, 72, 96, C.k); rect(49, 81, 71, 95, hex('#e8e4dc')); rect(49, 81, 71, 82, C.blanco); rect(69, 83, 71, 95, hex('#c8c2b6')); rect(52, 84, 64, 92, C.k);
  for (const x of [66, 68]) pset(x, 86, C.k); rect(66, 90, 68, 92, C.metalD);
  rect(76, 90, 96, 96, C.k); rect(77, 91, 95, 92, C.metalL); rect(77, 95, 95, 95, C.metalS);
  for (let k = 0; k < 6; k++) { const x = 78 + k * 3; rect(x, 84, x + 1, 94, C.blanco); rect(x, 83, x + 1, 84, [C.rojo, hex('#3a8ac8'), C.amarillo][k % 3]); if (k % 2) rect(x, 90, x + 1, 93, hex('#c8a060')); }
  // las dos batas colgadas de sus perchas
  for (const [x, c, s] of [[98, D.bata, D.bataS], [105, hex('#e6eaee'), D.bataD]]) {
    rect(x + 4, 28, x + 6, 30, C.metalD);
    poligono([[x + 1, 31], [x + 9, 31], [x + 11, 36], [x + 11, 70], [x - 1, 70], [x - 1, 36]], C.k);
    poligono([[x + 2, 32], [x + 8, 32], [x + 10, 37], [x + 10, 69], [x, 69], [x, 37]], c);
    rect(x + 8, 38, x + 10, 69, s); linea(x + 3, 32, x + 5, 40, C.k); linea(x + 7, 32, x + 5, 40, C.k); rect(x + 5, 40, x + 5, 69, s);
    rect(x + 1, 52, x + 3, 56, s); rect(x + 1, 52, x + 3, 52, C.k); for (const y of [44, 50, 56, 62]) pset(x + 6, y, C.metalS);
    rect(x - 1, 38, x, 62, s);
  }
  // la fuente de iones en su jaula, con la franja amarilla y negra y el rayo de alto voltaje
  rect(96, 72, 116, 113, C.k); rect(97, 73, 115, 112, hex('#3a3e48'));
  for (let y = 74; y < 106; y += 3) rect(97, y, 115, y, C.metalS); for (let x = 98; x < 115; x += 3) rect(x, 73, x, 105, C.metalS);
  for (let x = 97; x < 116; x++) for (let y = 106; y < 112; y++) pset(x, y, ((x + y) >> 1) % 2 ? C.amarillo : C.k);
  poligono([[103, 76], [110, 76], [106, 82], [109, 82], [102, 92], [104, 84], [101, 84]], C.amarillo);
  // el tanque del acelerador: el cilindro sombreado (luz arriba, sombra abajo), los casquetes, los aros con sus pernos
  const cy = 62, ry = 28, X0 = 120, X1 = 230;
  const fila = (y) => { const u = (y - (cy - ry)) / (2 * ry); return u < 0.06 ? D.tanqueL : u < 0.11 ? D.tanqueB : u < 0.22 ? D.tanqueL : u < 0.62 ? D.tanque : u < 0.86 ? D.tanqueS : D.tanqueD; };
  for (let y = cy - ry - 1; y <= cy + ry + 1; y++) { const w = Math.round(6 * Math.sqrt(Math.max(0, 1 - ((y - cy) / (ry + 1)) ** 2))); rect(X0 - w - 1, y, X1 + w + 1, y, C.k); }
  for (let y = cy - ry; y <= cy + ry; y++) { const w = Math.round(6 * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2))), c = fila(y);
    for (let x = X0 - w; x <= X1 + w; x++) { const u = (y - (cy - ry)) / (2 * ry), borde = Math.abs(u - 0.22) < 0.03 || Math.abs(u - 0.62) < 0.03; pset(x, y, borde && (x + y) % 2 ? fila(y + (u < 0.4 ? 2 : -2)) : c); }
    if (w > 0) { rect(X0 - w, y, X0 - w + 1, y, d_mez(c, C.blanco, 0.2)); rect(X1 + w - 2, y, X1 + w, y, d_mez(c, C.k, 0.35)); } }
  for (let x = 134; x < 230; x += 16) for (let y = cy - ry; y <= cy + ry; y++) { const c = fila(y); pset(x, y, d_mez(c, C.k, 0.35)); pset(x + 1, y, d_mez(c, C.blanco, 0.25)); pset(x + 2, y, d_mez(c, C.k, 0.2)); if ((y - cy) % 6 === 0) pset(x + 1, y, D.tanqueB); }
  rect(X0, cy - ry, X0, cy + ry, C.k); rect(X1, cy - ry, X1, cy + ry, C.k);
  for (let y = cy - ry + 3; y < cy + ry; y += 5) { pset(X0 + 2, y, D.tanqueB); pset(X1 - 2, y, D.tanqueL); }
  // la escotilla con su volante, la placa de datos (rayas, sin letras), el manómetro
  disco(176, 70, 10, C.k); disco(176, 70, 9, D.tanqueS); disco(176, 70, 7, D.tanque); R.anillo(176, 70, 7, D.tanqueD);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(Math.round(176 + Math.cos(a) * 8), Math.round(70 + Math.sin(a) * 8), C.metalL); }
  R.anillo(176, 70, 4, C.metalL); linea(172, 70, 180, 70, C.metalL); linea(176, 66, 176, 74, C.metalL); disco(176, 70, 1, C.metalD);
  rect(146, 44, 166, 52, C.k); rect(147, 45, 165, 51, C.metalL); for (const y of [46, 48, 50]) rect(149, y, 149 + Math.round(6 + h(y, 1, 205) * 10), y, C.metalD); pset(147, 45, C.blanco);
  disco(206, 48, 5, C.k); disco(206, 48, 4, C.blanco); R.anillo(206, 48, 4, C.metalS); pset(208, 50, C.rojo);
  // la tubería de gas aislante que sale por arriba hacia la pared
  rect(212, 26, 215, 35, C.k); rect(213, 26, 214, 35, C.metalL); rect(212, 25, 245, 28, C.k); rect(213, 26, 245, 27, C.metalL); rect(213, 26, 245, 26, C.blanco);
  // las patas de apoyo (perfiles de acero con sus placas) y la sombra en el suelo
  for (const x0 of [136, 200]) { poligono([[x0, 84], [x0 + 16, 84], [x0 + 18, 112], [x0 - 2, 112]], C.k); poligono([[x0 + 1, 85], [x0 + 15, 85], [x0 + 16, 111], [x0, 111]], hex('#4a5262')); rect(x0 + 6, 86, x0 + 9, 110, hex('#5e6878')); rect(x0 - 3, 111, x0 + 19, 113, C.k); rect(x0 - 2, 111, x0 + 18, 112, C.metalS); }
  // el tubo del haz: del tanque al imán de análisis, con brida, el cuadrupolo y el vacuómetro
  rect(234, 59, 246, 65, C.k); rect(234, 60, 246, 64, C.metalL); rect(234, 60, 246, 60, C.blanco); rect(234, 64, 246, 64, C.metalS);
  rect(237, 56, 240, 68, C.k); rect(238, 57, 239, 67, C.metal);
  disco(243, 54, 3, C.k); disco(243, 54, 2, C.blanco); rect(243, 57, 243, 59, C.k);
  // el imán de análisis: bloque rojo con las bobinas de cobre y sus pernos
  rect(246, 44, 272, 84, C.k); rect(247, 45, 271, 83, D.iman); rect(247, 45, 271, 46, D.imanL); rect(268, 47, 271, 83, D.imanS); rect(247, 80, 271, 83, D.imanS);
  for (const y of [49, 72]) { rect(244, y, 274, y + 7, C.k); rect(245, y + 1, 273, y + 6, D.cobre); for (let x = 245; x < 274; x += 2) rect(x, y + 1, x, y + 6, D.cobreS); rect(245, y + 1, 273, y + 1, D.cobreL); }
  for (const [x, y] of [[250, 60], [266, 60], [250, 66], [266, 66]]) { pset(x, y, D.imanL); pset(x + 1, y + 1, D.imanS); }
  // del imán baja el tubo al detector: la caja gris con su pantallita, diales y tiradores
  rect(255, 84, 260, 90, C.k); rect(256, 84, 259, 90, C.metalL);
  rect(244, 89, 276, 113, C.k); rect(245, 90, 275, 112, hex('#d8dce2')); rect(245, 90, 275, 91, C.blanco); rect(272, 92, 275, 112, hex('#b0b6c0'));
  rect(248, 93, 266, 99, C.k); rect(249, 94, 265, 98, hex('#0e1a14'));
  for (const x of [250, 258]) { disco(x, 105, 3, C.k); disco(x, 105, 2, C.metalL); pset(x, 103, C.k); }
  rect(264, 103, 270, 109, C.k); rect(265, 104, 269, 108, hex('#4a5262'));
  // el cartel de radiación (trébol en amarillo, sin letras) y el reloj de pared
  rect(246, 28, 258, 40, C.k); rect(247, 29, 257, 39, C.amarillo); disco(252, 34, 1, C.k);
  for (const a of [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]) for (let r = 2; r <= 4; r++) for (let d = -0.5; d <= 0.5; d += 0.25) pset(Math.round(252 + Math.cos(a + d) * r), Math.round(34 + Math.sin(a + d) * r), C.k);
  disco(264, 34, 6, C.k); disco(264, 34, 5, C.blanco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(264 + Math.cos(a) * 4), Math.round(34 + Math.sin(a) * 4), C.metalS); }
  // el rack de electrónica (bajo la esquina de Atom): módulos, rejillas, el osciloscopio
  rect(280, 48, 317, 113, C.k); rect(281, 49, 316, 112, hex('#2e323a')); rect(281, 49, 282, 112, hex('#4a505a')); rect(315, 49, 316, 112, hex('#22252c'));
  for (let y = 51; y < 110; y += 10) { rect(284, y, 313, y + 8, hex('#3e434c')); rect(284, y, 313, y, hex('#5a606a')); pset(285, y + 4, C.metalL); pset(312, y + 4, C.metalL); }
  rect(286, 52, 302, 59, C.k); rect(287, 53, 301, 58, hex('#0e2018'));
  for (let y = 83; y < 90; y += 2) rect(288, y, 310, y, hex('#2a2e36'));
  for (const x of [304, 308]) { disco(x, 55, 1, C.metalL); }
  // el suelo de resina: moteado, juntas en perspectiva, el reflejo azul del tanque y de los plafones, la franja de seguridad
  for (let y = 114; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y, 203); pset(x, y, n < 0.07 ? D.sueloAS : n > 0.95 ? D.sueloAL : D.sueloA); }
  rect(0, 114, 319, 115, D.sueloAJ);
  for (const y of [121, 131, 146, 168]) rect(0, y, 319, y, D.sueloAJ);
  for (let k = -9; k <= 9; k++) linea(160 + k * 22, 116, 160 + k * 62, 179, D.sueloAJ);
  for (let y = 116; y < 128; y += 2) for (let x = 118; x < 232; x++) if ((x + y) % 3) d_tine(R, x, y, D.tanque, 0.2 - (y - 116) * 0.012);
  for (let y = 116; y < 124; y += 2) for (let x = 246; x < 274; x++) d_tine(R, x, y, D.iman, 0.15);
  for (const [x, y, w] of [[176, 138, 40], [190, 158, 34], [20, 150, 30], [280, 140, 26], [70, 172, 40]]) { rect(x, y, x + w, y, D.sueloAL); rect(x + 5, y + 2, x + w - 6, y + 2, D.sueloAL); }
  for (let x = 92; x < 280; x++) for (let y = 117; y <= 118; y++) pset(x, y, ((x + y) >> 2) % 2 ? C.amarillo : C.k);
  for (const x of [136, 200]) for (let y = 114; y < 117; y++) for (let i = -4; i < 22; i++) d_tine(R, x + i, y, C.k, 0.3);
  // la tapa de la canaleta de cables, de chapa estriada, y el sumidero
  rect(0, 161, 92, 165, C.k); rect(0, 162, 92, 164, C.metal); for (let x = 2; x < 92; x += 4) { pset(x, 162, C.metalL); pset(x + 1, 164, C.metalS); }
  rect(292, 164, 306, 168, C.k); rect(293, 165, 305, 167, C.metalD); for (let x = 295; x < 305; x += 2) rect(x, 165, x, 167, C.k);
  d_radioMas(R);
}
// la ventana al desierto de Arizona: cielo tramado, nubes de tres tonos a tres velocidades, el halcón, las mesetas
// lejanas, el llano con matas, la carretera con la camioneta que levanta polvo, la planta rodadora y los saguaros
function d_desierto(R, t, x0, y0, x1, y1) {
  const { pset, linea, poligono, disco } = R, hz = Math.round(y0 + (y1 - y0) * 0.6), W = x1 - x0;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= hz; y++) { const f = (y - y0) / Math.max(1, hz - y0) * 2; for (let x = x0; x <= x1; x++) { const i = Math.floor(f), k = f - i > d_bayer(x, y) ? i + 1 : i; pset(x, y, k <= 0 ? D.cielo1 : k === 1 ? D.cielo2 : D.cielo3); } }
  for (const [v, y, w, d] of [[1.2, y0 + 7, 16, 0], [2.1, y0 + 15, 11, 40], [3.4, y0 + 22, 8, 70]]) d_nube(R, x0 - 14 + ((t * v + d) % (W + 30)), y, w);
  { const a = t * 0.7, bx = Math.round(x0 + W * 0.62 + Math.cos(a) * 12), by = Math.round(y0 + 12 + Math.sin(a) * 4), al = Math.sin(t * 9) > 0;
    pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); pset(bx - 2, by - (al ? 1 : -1), C.k); pset(bx + 2, by - (al ? 1 : -1), C.k); }
  // las sierras lejanas y las mesetas con sus estratos
  poligono([[x0, hz - 3], [x0 + 14, hz - 8], [x0 + 30, hz - 5], [x0 + 46, hz - 10], [x1 + 1, hz - 4], [x1 + 1, hz + 1], [x0, hz + 1]], D.lejos);
  for (let x = x0; x <= x1; x += 3) pset(x, hz - 2, D.lejosS);
  poligono([[x0 + 6, hz], [x0 + 10, hz - 13], [x0 + 30, hz - 13], [x0 + 33, hz - 6], [x0 + 38, hz]], D.meseta);
  poligono([[x0 + 52, hz], [x0 + 56, hz - 9], [x0 + 68, hz - 9], [x0 + 72, hz]], D.meseta);
  for (const [a, b, y] of [[x0 + 10, x0 + 30, hz - 13], [x0 + 56, x0 + 68, hz - 9]]) { linea(a, y, b, y, D.mesetaL); linea(a + 1, y + 4, b + 1, y + 4, D.mesetaS); linea(a, y + 8, b + 2, y + 8, D.mesetaS); }
  // el llano: bandas de arena tramadas, matas, la carretera
  for (let y = hz + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) { const n = h(x, y, 212); pset(x, y, n < 0.08 ? D.arenaS : n > 0.93 ? D.arenaL : (y - hz) < 4 && (x + y) % 2 ? D.arenaL : D.arena); }
  for (let k = 0; k < 18; k++) { const mx = x0 + Math.floor(h(k, 1, 213) * W), my = hz + 3 + Math.floor(h(k, 2, 213) * (y1 - hz - 3)); pset(mx, my, D.matorral); pset(mx + 1, my, D.saguaroS); if (my > hz + 10) pset(mx, my - 1, D.matorral); }
  const yc = hz + 8; linea(x0, yc, x1, yc, hex('#6a6470')); linea(x0, yc + 1, x1, yc + 1, hex('#58525e'));
  for (let x = x0 + Math.round(t * 2) % 6; x <= x1; x += 6) pset(x, yc, C.amarillo);
  { const u = (t / 9) % 1, cx = Math.round(x0 - 12 + u * (W + 24)); if (Math.floor(t / 9) % 2 === 0) {
    for (let i = 1; i < 10; i++) { const r = Math.min(3, 1 + i / 3); disco(cx - 3 - i * 2, yc - 1 - Math.round(i / 4), r, i % 2 ? D.arenaL : hex('#f0dcb0')); }
    linea(cx - 4, yc - 1, cx + 4, yc - 1, C.k); linea(cx - 4, yc - 2, cx + 4, yc - 2, C.blanco); linea(cx + 1, yc - 3, cx + 3, yc - 3, hex('#a8c8e0')); linea(cx - 4, yc - 3, cx, yc - 3, C.rojo); pset(cx - 3, yc, C.k); pset(cx + 2, yc, C.k); } }
  { const u = ((t + 4) / 7) % 1, rx = Math.round(x1 + 4 - u * (W + 10)), ry = y1 - 6 - Math.round(Math.abs(Math.sin(t * 5)) * 2);
    disco(rx, ry, 2, D.arenaS); pset(rx + Math.round(Math.cos(t * 8)), ry + Math.round(Math.sin(t * 8)), hex('#7a5a34')); pset(rx - 1, ry, D.arenaL); }
  // los saguaros (el grande delante, a la derecha), con su luz y sombra
  for (const [sx, s] of [[x1 - 14, 1], [x0 + 20, 0.6], [x0 + 44, 0.42]]) d_saguaro(R, sx, y1 + 1, s);
  R.recorte(null);
}

// un saguaro (cactus columnar) de pie en (x, base), de tamaño s (1: 26 px)
function d_saguaro(R, x, base, s) {
  const { pset } = R, alto = Math.round(26 * s), g = s > 0.7 ? 2 : 1;
  const col = (cx, y0, y1) => { for (let y = y0; y <= y1; y++) { pset(cx - g, y, C.k); pset(cx + g + 1, y, C.k); for (let i = -g + 1; i <= g; i++) pset(cx + i, y, i <= -g + 1 ? D.saguaroL : i >= g ? D.saguaroS : (y % 3 ? D.saguaro : D.saguaroS)); } pset(cx, y0 - 1, C.k); pset(cx + 1, y0 - 1, C.k); };
  col(x, base - alto, base);
  const ab = base - Math.round(alto * 0.45), ad = base - Math.round(alto * 0.6), lb = Math.round(5 * s) + 1, la = Math.round(9 * s) + 1;
  for (let i = 1; i <= lb; i++) { pset(x - g - i, ab, D.saguaro); pset(x - g - i, ab + 1, C.k); pset(x - g - i, ab - 1, C.k); }
  col(x - g - lb, ab - la, ab);
  for (let i = 1; i <= lb - 1; i++) { pset(x + g + i, ad, D.saguaroS); pset(x + g + i, ad + 1, C.k); pset(x + g + i, ad - 1, C.k); }
  col(x + g + lb, ad - la + 2, ad);
}

function d_radiocarbono(R, t, o) {
  const { rect, pset, linea, disco } = R;
  d_fijo(R, 'rc', () => d_radioFijo(R));
  // la ventana: el desierto y, encima, la persiana a medio bajar con su cordón que se balancea y el parteluz
  d_desierto(R, t, 10, 26, 90, 80);
  for (let y = 26; y < 37; y++) rect(10, y, 90, y, y % 2 ? hex('#e8e6de') : hex('#c8c4b8'));
  rect(10, 37, 90, 38, hex('#a8a498')); rect(10, 39, 90, 39, C.k);
  { const sw = Math.round(Math.sin(t * 1.1) * 1.5); linea(84, 39, 84 + sw, 54, C.k); rect(83 + sw, 54, 85 + sw, 57, hex('#c8c4b8')); }
  rect(49, 39, 51, 81, C.metalS); rect(50, 39, 50, 81, C.metalL); rect(10, 58, 90, 59, C.metalS);
  for (let i = 0; i < 18; i++) for (const d of [0, 1, 4]) d_tine(R, 16 + i + d, 78 - i, C.blanco, 0.35);
  // el banco: el vaso hierve y humea, el termo echa vaho de nitrógeno que cae, el hornito brilla
  for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4) % 1, vx = Math.round(18 + Math.sin(t * 2 + k * 2) * (1 + u * 3)), vy = Math.round(79 - u * 16); if (u < 0.85) { pset(vx, vy, hex('#f0f4f8')); pset(vx + 1, vy, u < 0.5 ? C.blanco : hex('#d8e0e8')); } }
  for (let k = 0; k < 3; k++) { const bx = 15 + ((k * 3 + Math.floor(t * 6)) % 7), by = 90 - Math.floor((t * 4 + k) % 4); pset(bx, by, C.blanco); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1, vx = Math.round(37 + (k % 2 ? 1 : -1) * (2 + u * 7)), vy = Math.round(77 + u * 14 - Math.sin(u * 3) * 3); if (vx > 31 && vx < 43 && vy < 80) continue; pset(vx, vy, u < 0.6 ? hex('#f4f8fc') : hex('#d8e2ea')); }
  { const f = 0.75 + Math.sin(t * 5) * 0.12 + Math.sin(t * 13) * 0.06; for (let y = 85; y < 92; y++) for (let x = 53; x < 64; x++) pset(x, y, d_mez(hex('#c83a10'), hex('#ffd060'), d_lim(f - (Math.abs(x - 58) + Math.abs(y - 88)) * 0.06))); }
  pset(66, 94, Math.floor(t * 2) % 2 ? C.rojo : hex('#6a2a2a'));
  // la fuente de iones: un resplandor azul que late dentro de la jaula
  for (let k = 0; k < 10; k++) { const a = h(k, 1, 221) * 6.28 + t * 2, r = 3 + h(k, 2, 221) * 4 + Math.sin(t * 6 + k) * 1.5; d_tine(R, Math.round(106 + Math.cos(a) * r), Math.round(96 + Math.sin(a) * r * 0.7), hex('#8ab8ff'), 0.5); }
  disco(106, 96, 2, Math.sin(t * 9) > -0.3 ? hex('#c8e0ff') : hex('#8ab0e8'));
  // la baliza amarilla que gira sobre el tanque, con sus destellos
  { const bx = 192, by = 31; rect(bx - 3, by + 2, bx + 3, by + 4, C.k); rect(bx - 2, by + 2, bx + 2, by + 3, C.metalD); disco(bx, by, 3, C.k); disco(bx, by, 2, Math.sin(t * 7) > 0 ? hex('#ffd040') : hex('#c89020')); pset(bx - 1, by - 1, hex('#fff4b0'));
    const a = t * 4; for (let d = 5; d < 13; d += 2) { const px = Math.round(bx + Math.cos(a) * d), py = Math.round(by + Math.sin(a) * d * 0.4); if (py < 34) d_tine(R, px, py, hex('#ffe070'), 0.6); } }
  // el manómetro y el vacuómetro tiemblan, el reloj marca la hora (la aguja de segundos corre)
  { const a = -2.2 + Math.sin(t * 3) * 0.1 + 1.6; linea(206, 48, Math.round(206 + Math.cos(a) * 3), Math.round(48 + Math.sin(a) * 3), C.k); }
  { const a = -1.4 + Math.sin(t * 11) * 0.15; pset(Math.round(243 + Math.cos(a) * 2), Math.round(54 + Math.sin(a) * 2), C.k); }
  { const s = t / 60 * Math.PI * 2 - Math.PI / 2; linea(264, 34, 264, 31, C.k); linea(264, 34, 267, 35, C.k); linea(264, 34, Math.round(264 + Math.cos(s) * 4), Math.round(34 + Math.sin(s) * 4), C.rojo); pset(264, 34, C.k); }
  // el detector cuenta los átomos de carbono 14 y sus luces parpadean
  d_num(R, String(1000 + Math.floor(t * 37) % 9000), 250, 94, hex('#5ae08a'));
  for (let k = 0; k < 3; k++) pset(266 + k * 2, 100, Math.floor(t * 4 + k) % 3 === 0 ? C.rojo : hex('#5a2a2a'));
  // el rack: LED que parpadean y el osciloscopio con su onda que corre
  for (let r = 0; r < 6; r++) for (let k = 0; k < 6; k++) { const on = h(r, k + Math.floor(t * (2 + r % 3)), 222) > 0.45; pset(288 + k * 3, 64 + r * 10 + (r > 1 ? 0 : 0), on ? [hex('#5ae08a'), hex('#ffb040'), hex('#5ac8f0')][(r + k) % 3] : hex('#1e2228')); }
  for (let x = 287; x < 302; x++) { const y = Math.round(55.5 + Math.sin((x - t * 30) * 0.7) * 2); pset(x, y, hex('#7af0a0')); }
  // el técnico pequeño de fondo: mira el rack, va al detector y vuelve
  { const c = t % 12, x = c < 5 ? 296 : c < 7 ? 296 - (c - 5) * 11 : c < 10 ? 274 : 274 + (c - 10) * 11, anda = (c >= 5 && c < 7) || c >= 10;
    d_figura(R, Math.round(x), 113, t, { anda, dir: c < 7 && c >= 5 ? -1 : c >= 10 ? 1 : c < 5 ? 1 : -1, brazo: !anda && Math.sin(t * 3) > 0 ? 1 : 0, pelo: hex('#2a1e18'), pierna: hex('#4a4a5a') }); }
  // la bomba de vacío: las aletas del motor tiemblan, el manómetro baila y el piloto verde parpadea
  { const v = Math.floor(t * 18) % 2; for (let x = 163 + v; x < 176; x += 2) pset(x, 99, hex('#7a8494'));
    pset(183 + Math.round(Math.sin(t * 9)), 104, C.k); pset(192, 99, Math.floor(t * 1.5) % 2 ? hex('#5ae08a') : hex('#2a4a2a')); }
  // el reflejo de la baliza que gira, barriendo el suelo de resina bajo el tanque
  { const a = t * 4, k = Math.sin(a), fx = Math.round(192 + Math.cos(a) * 44); if (k > 0.15) for (let j = 0; j < 4; j++) for (let i = -8; i <= 8; i++) if ((i + j) % 2 === 0) d_tine(R, fx + i, 120 + j * 2, hex('#ffe070'), 0.3 * k * (1 - Math.abs(i) / 9)); }
  // el plafón de la izquierda parpadea a ratos
  if ((t % 8.3) < 0.2 && Math.sin(t * 60) > 0) rect(179, 2, 227, 5, D.techoA);
  return { suelo: 150, mesa: [112, 252, 140], libro: [140, 141], libroCentro: [157, 141], detras: [182, 222], libres: [[14, 104], [256, 304]],
    ventana: [10, 26, 90, 80], acelerador: [116, 34, 234, 90], iman: [246, 44, 272, 84], detector: [244, 89, 276, 113], rack: [280, 48, 317, 113] };
}
// la mesa de muestras de Arizona, delante de los personajes: encimera de resina negra con su canto de luz y reflejos,
// armarios grises con tiradores; encima, el microscopio (a la izquierda), el papel de aluminio, dos placas de Petri, la
// gradilla de viales y la balanza con su urna de cristal que pesa (las cifras bailan); el hueco del centro, para el libro
function d_mesaMuestras(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(110, 139, 254, 147, C.k); rect(111, 140, 253, 146, D.resina); rect(111, 140, 253, 140, D.resinaL); rect(111, 146, 253, 146, D.resinaS);
  for (const x of [150, 214]) { rect(x, 142, x + 12, 142, D.resinaL); }
  rect(112, 147, 252, 179, C.k); rect(113, 148, 251, 176, D.armario); rect(113, 148, 251, 149, D.armarioL);
  for (let x = 116; x < 248; x += 34) { rect(x, 151, x + 30, 172, D.armarioS); rect(x + 1, 152, x + 30, 172, D.armario); rect(x + 1, 152, x + 29, 152, D.armarioL); rect(x + 12, 155, x + 18, 156, C.metalD); pset(x + 12, 155, C.metalL);
    // la rejilla de ventilación, el portaetiquetas (rayas, sin letras), la cerradura y el brillo vertical de la chapa
    for (let y = 165; y < 171; y += 2) { rect(x + 5, y, x + 25, y, D.armarioS); rect(x + 5, y + 1, x + 25, y + 1, D.armarioL); }
    rect(x + 3, 158, x + 11, 162, C.k); rect(x + 4, 159, x + 10, 161, C.blanco); rect(x + 5, 160, x + 5 + Math.floor(h(x, 1, 223) * 4) + 2, 160, C.metalS);
    pset(x + 26, 156, C.k); pset(x + 26, 157, C.metalD); for (let y = 153; y < 171; y++) if (y % 5) pset(x + 22, y, D.armarioL); }
  rect(231, 158, 237, 164, C.k); rect(232, 159, 236, 163, C.amarillo); pset(234, 161, C.k); pset(233, 162, C.k); pset(235, 162, C.k); pset(234, 160, C.k);
  for (let y = 148; y < 151; y++) for (let x = 113; x < 252; x++) d_tine(R, x, y, C.k, 0.28 - (y - 148) * 0.08);
  rect(113, 174, 251, 176, D.armarioS); rect(113, 177, 251, 179, hex('#3a3e46'));
  for (let k = 0; k < 9; k++) { const x = 116 + Math.floor(h(k, 4, 223) * 130); rect(x, 177 + (k % 2), x + 2 + (k % 3), 177 + (k % 2), hex('#5a5e66')); }
  for (let y = 148; y < 180; y++) for (let x = 253; x < 259; x++) d_tine(R, x, y, C.k, 0.22 * (1 - (x - 253) / 6));
  // en primer término, abajo a la izquierda (por debajo de los pies), el caballete amarillo de suelo mojado con su «!»
  poligono([[6, 179], [13, 156], [23, 156], [30, 179]], C.k); poligono([[8, 179], [14, 158], [22, 158], [28, 179]], C.amarillo);
  poligono([[22, 158], [28, 179], [24, 179], [20, 158]], hex('#c8a020')); rect(14, 158, 22, 158, hex('#fff0a0'));
  rect(16, 162, 18, 171, C.k); rect(16, 174, 18, 176, C.k); rect(12, 155, 24, 156, C.k); rect(13, 155, 23, 155, hex('#e8e8e0'));
  // el microscopio: base, columna, platina con su muestra, el tubo y los dos oculares; la luz de la platina
  rect(114, 137, 134, 140, C.k); rect(115, 137, 133, 139, hex('#e8eaee'));
  rect(126, 116, 130, 137, C.k); rect(127, 117, 129, 136, hex('#e8eaee')); rect(129, 117, 129, 136, hex('#b8bcc4'));
  rect(116, 128, 128, 130, C.k); rect(117, 128, 127, 129, C.metalD); pset(121, 127, Math.sin(t * 2) > 0 ? hex('#fff4b0') : hex('#f0d880'));
  linea(126, 118, 119, 122, C.k); linea(126, 119, 119, 123, C.k); rect(118, 120, 121, 127, C.k); rect(119, 121, 120, 126, C.metalL);
  for (const x of [122, 126]) { rect(x, 112, x + 2, 117, C.k); rect(x + 1, 113, x + 1, 116, C.metal); }
  disco(131, 126, 2, C.k); pset(131, 126, C.metalL);
  // el papel de aluminio con sus arrugas y brillo, y las dos placas de Petri
  rect(138, 140, 156, 144, D.aluminioS); rect(139, 140, 155, 143, D.aluminio); for (let k = 0; k < 6; k++) pset(140 + k * 3, 141 + (k % 2), D.aluminioS); if (Math.sin(t * 3) > 0.6) pset(148, 141, C.blanco);
  for (const x of [204, 218]) { rect(x, 141, x + 11, 144, C.k); rect(x + 1, 141, x + 10, 143, hex('#d8eef6')); rect(x + 2, 141, x + 9, 141, C.blanco); pset(x + 5, 142, D.pergaminoS); }
  // la gradilla de viales
  rect(232, 136, 237, 141, C.k); for (let k = 0; k < 3; k++) { rect(232 + k * 2, 132, 232 + k * 2, 140, hex('#e8f4fa')); pset(232 + k * 2, 131, [C.rojo, hex('#3a8ac8'), C.amarillo][k]); }
  // la balanza de precisión, con su urna de cristal y las cifras que bailan hasta pararse
  rect(238, 124, 252, 141, C.k); rect(239, 136, 251, 140, hex('#e8eaee')); rect(239, 125, 251, 135, hex('#cfe6f0')); rect(239, 125, 240, 135, C.blanco);
  rect(241, 133, 249, 134, C.metalL); rect(240, 137, 247, 139, C.k); d_num(R, Math.sin(t * 6) > 0.9 ? '18' : '17', 241, 137, hex('#5ae08a'));
  pset(250, 138, Math.floor(t * 2) % 2 ? hex('#5ae08a') : hex('#2a4a2a'));
  return { mesa: [112, 252, 140], libro: [140, 141], libroCentro: [157, 141], detras: [182, 222] };
}
function d_muestraFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared del fondo, desenfocada: el vinilo, una junta, el tanque azul al fondo a la derecha (borroso, tramado), el extintor
  rect(0, 0, 319, 104, D.paredA);
  for (let y = 0; y < 104; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 231); if (n < 0.08) pset(x, y, D.paredAS); else if (n > 0.96) pset(x, y, D.paredAL); }
  rect(158, 0, 159, 103, D.juntaA);
  // al fondo, desenfocado: el tanque del acelerador con sus aros y pernos, la baliza, el imán rojo con el cobre; la balda
  const fd = (c) => d_mez(c, D.paredA, 0.3);
  for (let y = 8; y < 94; y++) { const u = (y - 8) / 86, c = u < 0.08 ? D.tanqueL : u < 0.14 ? D.tanqueB : u < 0.3 ? D.tanqueL : u < 0.66 ? D.tanque : u < 0.88 ? D.tanqueS : D.tanqueD;
    for (let x = 166; x < 262; x++) { const borde = y < 10 || y > 91; if (borde && (x + y) % 2) continue; pset(x, y, fd(c)); } }
  for (let x = 176; x < 262; x += 22) for (let y = 8; y < 94; y++) { pset(x, y, fd(D.tanqueD)); pset(x + 1, y, fd(D.tanqueS)); pset(x + 2, y, fd(D.tanqueL)); if (y % 7 === 0) pset(x + 1, y, fd(D.tanqueB)); }
  for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i, j); if (d <= 8) pset(214 + i, 56 + j, fd(d > 6.5 ? D.tanqueD : d > 3 ? D.tanqueS : D.tanque)); }
  for (let y = 30; y < 76; y++) for (let x = 262; x < 280; x++) pset(x, y, fd(y < 33 ? D.imanL : x > 276 ? D.imanS : D.iman));
  for (const y0 of [36, 62]) for (let y = y0; y < y0 + 7; y++) for (let x = 260; x < 280; x++) pset(x, y, fd(x % 2 ? D.cobreS : D.cobre));
  rect(244, 2, 252, 7, fd(C.k)); disco(248, 4, 2, fd(C.amarillo));
  for (const [x, y, r] of [[186, 100, 3], [232, 98, 2], [270, 92, 3], [176, 30, 2]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) d_tine(R, x + i, y + j, C.blanco, 0.35);
  rect(160, 94, 290, 96, fd(C.k)); rect(160, 94, 290, 94, fd(C.metalL));
  for (let k = 0; k < 7; k++) { const x = 166 + k * 17; rect(x, 84, x + 7, 93, fd(C.k)); rect(x + 1, 85, x + 6, 93, fd([hex('#d8eef6'), hex('#e8e4dc'), hex('#c8a060')][k % 3])); }
  rect(296, 58, 306, 98, d_mez(C.k, D.paredA, 0.3)); rect(297, 60, 305, 97, d_mez(C.rojo, D.paredA, 0.25)); rect(298, 60, 299, 97, d_mez(hex('#e86a6a'), D.paredA, 0.25)); rect(298, 52, 304, 58, d_mez(C.k, D.paredA, 0.4));
  // el monitor (el contenido se pinta en cada fotograma) con su pie
  rect(12, 20, 152, 100, C.k); rect(13, 21, 151, 99, hex('#2c2e36')); rect(13, 21, 151, 21, hex('#4a4e5a')); pset(82, 97, hex('#5ae08a'));
  rect(76, 100, 88, 104, C.k); rect(77, 100, 87, 103, hex('#3a3e48')); rect(66, 104, 98, 107, C.k); rect(67, 104, 97, 106, hex('#4a4e5a'));
  // la encimera de resina negra: moteado, reflejos de la ventana y del monitor, el canto
  for (let y = 104; y < 180; y++) for (let x = 0; x < 320; x++) { if (y < 108 && x > 64 && x < 100) continue; const n = h(x, y, 232); pset(x, y, n < 0.05 ? D.resinaL : n > 0.97 ? hex('#5a606a') : (y < 112 ? D.resinaS : D.resina)); }
  for (let y = 110; y < 128; y += 2) for (let x = 20; x < 140; x++) if ((x + y) % 3 === 0) pset(x, y, hex('#343a44'));
  // la gradilla de viales con tapones de colores y etiquetas de rayas
  rect(12, 128, 84, 140, C.k); rect(13, 129, 83, 139, C.metalL); rect(13, 129, 83, 129, C.blanco); rect(13, 137, 83, 139, C.metalS);
  for (let k = 0; k < 6; k++) { const x = 16 + k * 11; rect(x, 110, x + 7, 132, C.k); rect(x + 1, 111, x + 6, 131, hex('#d8eef6')); rect(x + 1, 111, x + 1, 131, C.blanco); rect(x, 106, x + 7, 111, C.k); rect(x + 1, 107, x + 6, 110, [C.rojo, hex('#3a8ac8'), C.amarillo, hex('#5ab85a'), hex('#8a5ad8'), C.rojo][k]);
    rect(x + 2, 118, x + 5, 125, C.blanco); rect(x + 3, 120, x + 4, 120, C.k); rect(x + 3, 122, x + 5, 122, C.k); if (k < 3) rect(x + 2, 127, x + 5, 130, D.pergaminoS); }
  // el bisturí y la regla con sus marcas y cifras
  linea(24, 152, 70, 146, C.k); linea(24, 153, 70, 147, C.k); linea(25, 152, 60, 148, hex('#8a8e98')); poligono([[70, 145], [82, 143], [70, 148]], C.metalL); linea(70, 145, 81, 143, C.blanco);
  rect(10, 160, 90, 170, C.k); rect(11, 161, 89, 169, hex('#e8e0c8')); rect(11, 161, 89, 161, C.blanco);
  for (let x = 13; x < 89; x += 3) rect(x, 161, x, (x - 13) % 15 === 0 ? 165 : 163, C.k); for (let k = 0; k < 5; k++) d_num(R, String(k + 1), 25 + k * 15, 164, C.k);
  // el papel de aluminio arrugado bajo el pergamino
  poligono([[96, 110], [262, 106], [272, 178], [90, 179]], D.aluminioS); poligono([[98, 111], [260, 107], [270, 177], [92, 178]], D.aluminio);
  for (let k = 0; k < 40; k++) { const x = 96 + Math.floor(h(k, 1, 233) * 170), y = 108 + Math.floor(h(k, 2, 233) * 68); linea(x, y, x + 4, y + 1, k % 3 ? D.aluminioS : C.blanco); }
  // el pergamino: borde irregular, manchas, la planta dibujada y los renglones de signos inventados
  const P = [[104, 114], [130, 112], [170, 113], [210, 111], [246, 110], [250, 116], [252, 140], [250, 170], [200, 172], [150, 171], [106, 173], [104, 150], [102, 130]];
  poligono(P.map(([x, y]) => [x + 1, y + 1]), D.pergaminoS); poligono(P, D.pergamino);
  for (let y = 112; y < 173; y++) for (let x = 102; x < 253; x++) { if (R.pget(x, y) !== D.pergamino) continue; const n = h(x >> 1, y >> 1, 234); if (n < 0.06) pset(x, y, D.pergaminoS); else if (n > 0.95) pset(x, y, D.pergaminoL); }
  for (const [x, y, r] of [[230, 160, 5], [120, 128, 3]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (i + j) % 2 === 0) d_tine(R, x + i, y + j, D.pergaminoS, 0.5);
  for (let k = 0; k < 4; k++) linea(144 + k * 2, 166, 146 + k * 2, 138, hex('#6a8a3a'));
  for (const [x, y, d] of [[140, 146, -1], [152, 140, 1], [138, 134, -1], [154, 152, 1]]) { disco(x + d * 3, y, 4, hex('#3e7a3a')); disco(x + d * 3, y, 3, D.hoja); pset(x + d * 3 - 1, y - 1, D.hojaL); linea(x, y + 1, x + d * 6, y - 1, D.hojaS); }
  disco(147, 128, 4, hex('#3a5aa8')); disco(147, 128, 3, hex('#5a8ac8')); pset(146, 127, hex('#a8c8f0'));
  for (const [dx, dy] of [[-4, 0], [0, 0], [4, 1], [-2, 2], [2, 2]]) linea(147, 166, 147 + dx * 2, 170 + dy, D.tinta);
  for (let k = 0; k < 7; k++) d_renglon(R, k < 5 ? 166 : 114, 118 + k * 7, k < 5 ? 11 : 19, D.tinta, k + 40);
  for (let y = 116; y < 168; y += 7) for (let x = 108; x < 248; x += 3) if (R.pget(x, y) === D.pergamino) pset(x, y, d_mez(D.pergamino, D.pergaminoS, 0.4));
  // la placa de Petri vacía, a la derecha, donde caerá la muestra
  for (let j = -9; j <= 9; j++) { const w = Math.round(Math.sqrt(1 - (j / 9.5) ** 2) * 20); rect(283 - w, 150 + j, 283 + w, 150 + j, C.k); }
  for (let j = -8; j <= 8; j++) { const w = Math.round(Math.sqrt(1 - (j / 8.5) ** 2) * 19); rect(283 - w, 150 + j, 283 + w, 150 + j, j < -5 ? hex('#e4f2f8') : hex('#c8e2ee')); }
  for (let j = -5; j <= 5; j++) { const w = Math.round(Math.sqrt(1 - (j / 5.5) ** 2) * 14); rect(283 - w, 151 + j, 283 + w, 151 + j, hex('#b0d0e0')); }
  linea(268, 145, 276, 143, C.blanco); linea(292, 157, 298, 155, C.blanco);
}

function d_muestra(R, t, o) {
  const { rect, pset, linea, disco } = R;
  d_fijo(R, 'rcM', () => d_muestraFijo(R));
  // la pantalla: la curva de calibración (cian), la edad medida (campana roja), la franja dorada y «1404-1438»
  const S = [16, 24, 148, 96], fr = o.franja ?? d_lim((t - 2.5) / 1.5);
  rect(S[0], S[1], S[2], S[3], D.pantO); rect(S[0], S[1], S[2], S[1] + 5, D.pantOL);
  [C.rojo, C.amarillo, hex('#5ab85a')].forEach((c, i) => pset(S[0] + 3 + i * 3, S[1] + 2, c)); rect(S[0] + 16, S[1] + 2, S[0] + 34, S[1] + 3, D.pantOR); rect(S[0] + 38, S[1] + 2, S[0] + 52, S[1] + 3, D.pantOR);
  const ax = 30, ay = 86;
  for (let x = ax + 8; x < 144; x += 12) for (let y = 34; y < ay; y += 2) pset(x, y, D.pantOL);
  for (let y = 40; y < ay; y += 12) for (let x = ax; x < 144; x += 2) pset(x, y, D.pantOL);
  linea(ax, 32, ax, ay, hex('#8a9ab0')); linea(ax, ay, 144, ay, hex('#8a9ab0'));
  for (let x = ax + 8; x < 144; x += 12) pset(x, ay + 1, hex('#8a9ab0'));
  const curva = (x) => 44 + (x - ax) * 0.34 + Math.sin(x * 0.31) * 3 + Math.sin(x * 0.11 + 1) * 4;
  for (let x = ax + 1; x < 143; x++) { linea(x, Math.round(curva(x)), x + 1, Math.round(curva(x + 1)), D.cian); pset(x, Math.round(curva(x)) - 1, d_mez(D.cian, D.pantO, 0.6)); }
  const y0 = 60; for (let j = -10; j <= 10; j++) { const w = Math.round(9 * Math.exp(-(j * j) / 30)); if (w > 0) linea(ax + 1, y0 + j, ax + w, y0 + j, j % 2 ? hex('#c84a4a') : hex('#e86a6a')); }
  for (let x = ax + 10; x < 96; x += 3) pset(x, y0, hex('#e86a6a'));
  const b0 = 82, b1 = 100, alto = Math.round(fr * (ay - 34));
  if (fr > 0) { for (let y = ay - alto; y < ay; y++) for (let x = b0; x <= b1; x++) if ((x + y) % 2 === 0) pset(x, y, d_mez(D.oro, D.pantO, 0.45)); rect(b0, ay - alto, b0, ay, D.oro); rect(b1, ay - alto, b1, ay, D.oro);
    for (let y = y0; y < ay; y += 2) { pset(b0 + 1, y, D.oro); } }
  if (fr > 0.6) { const n = Math.min(9, Math.ceil((fr - 0.6) / 0.4 * 9)); rect(48, 33, 132, 49, C.k); rect(49, 34, 131, 48, hex('#1a2436')); rect(49, 34, 131, 34, D.oroS); R.numero('1404-1438', 89, 46, { centro: true, n: n * 8, rampa: R.PAL.TITLE });
    if (fr >= 1 && Math.floor(t * 2) % 2) rect(126, 40, 127, 46, D.oro); }
  for (let i = 0; i < 10; i++) pset(130 + i, 30 + i, hex('#2a3c56'));
  // las pinzas en la mano canónica: llegan, pellizcan la esquina, llevan el trocito a la placa, lo sueltan y se van
  const u = o.corta ?? d_lim(t / 4.5), A = [252, 62], B = [246, 112], Pt = [283, 148], Z = [304, 92];
  const cerrada = u > 0.32 && u < 0.78, lleva = u > 0.38 && u < 0.8;
  let tx, ty;
  if (u < 0.3) { const k = d_suave(u / 0.3); tx = A[0] + (B[0] - A[0]) * k; ty = A[1] + (B[1] - A[1]) * k; }
  else if (u < 0.4) { tx = B[0] + Math.sin(u * 300) * 0.6; ty = B[1]; }
  else if (u < 0.75) { const k = d_suave((u - 0.4) / 0.35); tx = B[0] + (Pt[0] - B[0]) * k; ty = B[1] + (Pt[1] - B[1]) * k - Math.sin(k * Math.PI) * 14; }
  else if (u < 0.85) { tx = Pt[0]; ty = Pt[1] - (u - 0.75) * 30; }
  else { const k = d_suave((u - 0.85) / 0.15); tx = Pt[0] + (Z[0] - Pt[0]) * k; ty = Pt[1] - 3 + (Z[1] - Pt[1]) * k; }
  tx = Math.round(tx); ty = Math.round(ty);
  // la muesca que deja el trocito y el trocito, que viaja en las pinzas o descansa en la placa
  if (u > 0.38) { for (let y = 110; y <= 115; y++) for (let x = 243; x <= 252; x++) if (R.pget(x, y) === D.pergamino || R.pget(x, y) === D.pergaminoS || R.pget(x, y) === D.pergaminoL) pset(x, y, D.aluminio); linea(243, 115, 252, 115, D.pergaminoS); }
  const pieza = (x, y) => { rect(x - 3, y - 2, x + 3, y + 2, C.k); rect(x - 2, y - 1, x + 2, y + 1, D.pergamino); pset(x - 2, y - 1, D.pergaminoL); pset(x + 1, y + 1, D.pergaminoS); };
  if (u <= 0.38) { pieza(247, 112); linea(243, 115, 251, 115, D.pergaminoS); }
  else if (lleva) pieza(tx, ty + 1);
  else { pieza(283, 151); }
  if (o.mano !== false) {
    const hx = tx + 26, hy = ty - 16, ab = cerrada ? 0 : 2;
    linea(hx, hy - 1, tx - 1, ty - ab, C.k); linea(hx, hy + 2, tx + 1, ty + ab, C.k);
    linea(hx, hy, tx, ty - ab, C.metalL); linea(hx, hy + 1, tx, ty + ab, C.metal); pset(tx, ty - ab, C.blanco);
    brazo(R, hx + 46, hy + 22, hx + 6, hy + 2, '#eef0f2', -1);
  }
  return { suelo: 180, pinzas: [tx, ty], muestra: lleva ? [tx, ty + 1] : u <= 0.38 ? [247, 112] : [283, 151], pantalla: S, franja: [82, 100] };
}

function d_ordenadoresFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 0, 319, 179, D.paredO);
  for (let y = 17; y < 98; y++) for (let x = 0; x < 320; x++) { const n = h(x, y >> 1, 241); if (n < 0.05) pset(x, y, D.paredOS); else if (n > 0.975) pset(x, y, D.paredOL); }
  // el techo de placas con los dos paneles de luz y la rejilla del aire
  rect(0, 0, 319, 14, hex('#d4d2dc')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 14, hex('#bab8c6')); rect(0, 7, 319, 7, hex('#bab8c6'));
  for (let k = 0; k < 200; k++) pset(Math.floor(h(k, 1, 242) * 320), Math.floor(h(k, 2, 242) * 14), hex('#c2c0cc'));
  for (const x0 of [180, 222]) { rect(x0, 1, x0 + 36, 6, C.k); rect(x0 + 1, 2, x0 + 35, 5, C.blanco); rect(x0 + 1, 5, x0 + 35, 5, hex('#e4e8f0'));
    for (let y = 7; y < 15; y++) for (let x = x0 - (y - 7); x <= x0 + 36 + (y - 7); x++) if ((x + y) % 4 === 0) pset(x, y, D.paredOL); }
  rect(0, 15, 319, 16, D.paredOS); rect(0, 15, 319, 15, D.paredOL);
  // el zócalo
  rect(0, 106, 319, 111, hex('#9a98a8')); rect(0, 106, 319, 106, hex('#b8b6c4'));
  // la ventana al campus: el marco (el paisaje se pinta en cada fotograma)
  rect(4, 20, 68, 96, C.k); rect(5, 21, 67, 95, hex('#8a8e9a')); rect(5, 21, 67, 21, hex('#b0b4c0'));
  rect(2, 96, 70, 99, C.k); rect(3, 96, 69, 97, D.paredOL); rect(3, 98, 69, 98, D.paredOS);
  // la pizarra blanca: marco, superficie con borrones, filas de signos rodeados, flechas y la gráfica de barras a rotulador
  rect(74, 21, 176, 77, C.k); rect(75, 22, 175, 76, C.metalL); rect(77, 24, 173, 74, D.pizarra); rect(175, 23, 175, 76, C.metalS);
  for (let k = 0; k < 8; k++) { const x = 80 + Math.floor(h(k, 1, 243) * 80), y = 28 + Math.floor(h(k, 2, 243) * 40); for (let i = 0; i < 14; i++) if ((i + k) % 3) pset(x + i, y + (i % 3 === 0 ? 1 : 0), hex('#e2e6ec')); }
  const r1 = d_renglon(R, 82, 29, 9, D.rotu1, 61); d_renglon(R, 82, 39, 7, D.rotu1, 62); d_renglon(R, 82, 49, 8, D.rotu1, 63);
  R.anillo(88, 31, 6, D.rotu2); R.anillo(108, 41, 6, D.rotu2);
  linea(95, 33, 104, 39, D.rotu2); linea(104, 39, 101, 39, D.rotu2); linea(104, 39, 103, 36, D.rotu2);
  linea(82, 62, 120, 62, D.rotu1); linea(82, 64, 112, 64, D.rotu1); R.icono('?', 124, 58, D.rotu2, D.pizarra);
  linea(140, 70, 170, 70, D.rotu3); linea(140, 70, 140, 30, D.rotu3); [32, 22, 15, 11, 9, 7].forEach((v, i) => { rect(143 + i * 5, 70 - v, 146 + i * 5, 69, D.rotu3); rect(144 + i * 5, 71 - v, 145 + i * 5, 69, D.pizarra); });
  for (let x = 141; x < 172; x += 2) pset(x, 70 - Math.round(34 / ((x - 140) / 5 + 1) ** 0.9), D.rotu2);
  rect(77, 24, 85, 31, hex('#f0e070')); rect(77, 31, 85, 31, hex('#c8b850')); rect(78, 26, 83, 26, hex('#a89840')); rect(78, 28, 82, 28, hex('#a89840'));
  rect(164, 26, 172, 33, hex('#f0a0c0')); rect(164, 33, 172, 33, hex('#c87898')); rect(165, 28, 170, 28, hex('#a86080'));
  rect(74, 77, 176, 79, C.k); rect(75, 77, 175, 78, C.metalL); [[86, D.rotu1], [94, D.rotu2], [102, D.rotu3]].forEach(([x, c]) => { rect(x, 76, x + 6, 77, c); rect(x + 6, 76, x + 7, 77, C.k); }); rect(150, 75, 162, 77, hex('#2a2a3a')); rect(150, 75, 162, 75, hex('#4a4a6a'));
  // la pantalla de pared (el contenido, en cada fotograma) con su soporte y el cable
  rect(182, 22, 266, 70, C.k); rect(183, 23, 265, 69, hex('#24262e')); rect(183, 23, 265, 23, hex('#3a3e48')); rect(222, 70, 226, 72, C.k); rect(224, 72, 224, 96, hex('#3a3e48'));
  // la fila de mesas del fondo con los monitores (las barras se pintan en cada fotograma), torres, sillas
  rect(70, 96, 276, 99, C.k); rect(71, 96, 275, 97, D.mesaOL); rect(71, 98, 275, 98, D.mesaOS); for (const x of [72, 172, 272]) rect(x, 100, x + 2, 111, hex('#6a6a78'));
  for (const x of [78, 112, 188, 236]) { rect(x, 80, x + 26, 94, C.k); rect(x + 1, 81, x + 25, 93, hex('#2a2c34')); rect(x + 11, 94, x + 15, 95, C.k); rect(x + 8, 95, x + 18, 95, hex('#3a3e48')); }
  for (const x of [96, 200]) { rect(x, 100, x + 10, 111, C.k); rect(x + 1, 101, x + 9, 110, hex('#2e3038')); pset(x + 8, 102, hex('#5ac8f0')); }
  // el rack de los servidores, bajo la esquina de Atom
  rect(280, 48, 317, 112, C.k); rect(281, 49, 316, 111, hex('#2a2e36')); for (let y = 51; y < 110; y += 6) { rect(283, y, 314, y + 4, hex('#3a3f48')); rect(283, y, 314, y, hex('#525862')); for (let x = 300; x < 313; x += 2) rect(x, y + 2, x, y + 3, hex('#22252c')); }
  // la moqueta de losetas en perspectiva: cada loseta con su tono y su fibra en rayas, unas a lo largo y otras a lo
  // ancho (como se colocan las losetas), las juntas, el sol de la ventana con la sombra del parteluz y una mancha de café
  const MQ = [D.moq1, D.moq2, hex('#545a6c')], fil = (d) => Math.floor(d / (6 + d * 0.18));
  for (let y = 112; y < 180; y++) { const d = y - 112, fy = fil(d), junY = fil(d + 1) !== fy, s = 22 + d * 0.5;
    for (let x = 0; x < 320; x++) { const rx = (x - 160) / s + 100, fx = Math.floor(rx), tono = MQ[Math.floor(h(fx, fy, 243) * 3)], n = h(x, y, 244);
      const raya = (fx + fy) % 2 ? y % 2 === 0 : (x >> 1) % 2 === 0; let c = raya ? d_mez(tono, C.k, 0.14) : tono;
      if (n < 0.07) c = D.moqS; else if (n > 0.94) c = D.moqL; if (junY || rx - fx < 0.04) c = d_mez(D.moqS, C.k, 0.2); pset(x, y, c); } }
  rect(0, 112, 319, 113, D.moqS);
  for (let y = 113; y < 162; y++) { const k = (y - 113) / 49, a = Math.round(6 + k * 30), b = Math.round(66 + k * 50), m = Math.round(35 + k * 40);
    for (let x = a; x <= b; x++) if (Math.abs(x - m) > 1 && Math.abs(y - (136 + (x - a) * 0.05)) > 0) { if ((x + y) % 2 === 0) d_tine(R, x, y, hex('#fff0c0'), 0.3 * (1 - k * 0.7)); } }
  for (let j = -3; j <= 3; j++) for (let i = -7; i <= 7; i++) if ((i / 7) ** 2 + (j / 3) ** 2 <= 1 && h(i, j, 239) > 0.25) d_tine(R, 280 + i, 168 + j, hex('#3a2a1a'), 0.35);
  // el radiador bajo la ventana, con sus aletas y la llave
  rect(6, 100, 48, 112, C.k); rect(7, 101, 47, 111, hex('#e6e6ee')); rect(7, 101, 47, 101, C.blanco); for (let x = 9; x < 46; x += 3) { rect(x, 102, x, 110, hex('#b4b4c4')); pset(x + 1, 102, C.blanco); }
  rect(47, 106, 50, 108, C.k); rect(48, 107, 49, 107, C.metalL);
  // en la mesa del fondo: los archivadores de colores, el flexo y la planta pequeña entre los monitores
  [['#c83a3a', 216], ['#3a6ab8', 220], ['#e8c040', 224]].forEach(([c, x]) => { rect(x, 83, x + 3, 95, C.k); rect(x + 1, 84, x + 2, 95, hex(c)); rect(x + 1, 90, x + 2, 91, C.blanco); });
  linea(230, 95, 228, 86, C.k); linea(228, 86, 233, 82, C.k); rect(231, 80, 235, 83, C.k); rect(232, 81, 234, 82, hex('#e8e0c0')); rect(227, 95, 233, 96, C.k);
  rect(105, 90, 110, 95, C.k); rect(106, 91, 109, 95, hex('#e8e4dc')); for (const [dx, dy] of [[0, -2], [-2, -3], [2, -4], [0, -5]]) disco(107 + dx, 89 + dy, 1, D.hoja);
  // el termostato y el interruptor, entre la pantalla y el rack
  rect(268, 58, 276, 66, C.k); rect(269, 59, 275, 65, hex('#eceaf2')); rect(270, 60, 274, 62, hex('#2a3a4a')); pset(272, 64, hex('#5ac8f0'));
  rect(269, 76, 275, 84, C.k); rect(270, 77, 274, 83, C.blanco); rect(271, 79, 273, 81, hex('#d0d0da'));
  for (const x0 of [70, 172, 272]) for (let i = 0; i < 6; i++) d_tine(R, x0 + i - 2, 112 + (i % 2), C.k, 0.3);
  // la silla de oficina con ruedas y la papelera, a la derecha
  rect(290, 118, 306, 132, C.k); rect(291, 119, 305, 131, hex('#3a3e4a')); rect(291, 119, 305, 120, hex('#5a5e6a')); rect(286, 132, 310, 136, C.k); rect(287, 133, 309, 135, hex('#2e323c'));
  rect(297, 136, 299, 144, C.k); for (const dx of [-10, -4, 4, 10]) { linea(298, 144, 298 + dx, 148, C.k); R.disco(298 + dx, 148, 1, hex('#2a2a30')); }
  rect(306, 150, 316, 164, C.k); rect(307, 151, 315, 163, hex('#6a7084')); rect(307, 151, 315, 152, hex('#8a90a4')); for (let x = 309; x < 315; x += 2) rect(x, 154, x, 162, hex('#565c70')); rect(308, 149, 312, 150, C.blanco);
  // la canaleta de cables por el suelo
  rect(150, 112, 156, 179, hex('#4a4e5c')); for (let y = 114; y < 180; y += 4) pset(153, y, hex('#62667a'));
}
// lo que se ve por la ventana del campus: cielo tramado, nubes, el edificio de ladrillo con sus ventanas, los árboles
// que se mecen, el césped, el camino y un ciclista que pasa
function d_campus(R, t, x0, y0, x1, y1) {
  const { pset, linea, disco, poligono } = R, W = x1 - x0;
  R.recorte([x0, y0, x1, y1]);
  d_cieloTramado(R, x0, y0, x1, y0 + 34, D.cielo1, D.cielo2, D.cielo3);
  for (const [v, y, w, d] of [[1.0, y0 + 6, 14, 0], [1.8, y0 + 14, 9, 30], [2.9, y0 + 22, 7, 55]]) d_nube(R, x0 - 12 + ((t * v + d) % (W + 26)), y, w);
  { const u = ((t + 2) / 8) % 1, bx = Math.round(x0 + u * W), by = y0 + 10 + Math.round(Math.sin(t * 1.5) * 2), al = Math.sin(t * 10) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); }
  for (let y = y0 + 22; y <= y1 - 18; y++) for (let x = x0 + 8; x <= x1 - 4; x++) { const jy = (y - y0 - 22) % 4 === 3, jx = (x + ((y >> 2) % 2) * 3) % 6 === 0; pset(x, y, jy || jx ? D.ladrilloS : h(x, y, 245) < 0.1 ? D.ladrilloL : D.ladrillo); }
  for (let x = x0 + 8; x <= x1 - 4; x++) { pset(x, y0 + 21, hex('#d8d0c0')); pset(x, y0 + 22, hex('#b8b0a0')); }
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const wx = x0 + 12 + c * 13, wy = y0 + 26 + r * 11; for (let j = 0; j < 7; j++) for (let i = 0; i < 7; i++) pset(wx + i, wy + j, i === 0 || j === 0 || i === 6 || j === 6 ? hex('#e8e0d0') : j < 3 ? hex('#a8d0e8') : hex('#6a90b0')); if ((r + c + Math.floor(t / 3)) % 5 === 0) pset(wx + 3, wy + 4, hex('#ffe890')); }
  for (let y = y1 - 17; y <= y1; y++) for (let x = x0; x <= x1; x++) pset(x, y, y > y1 - 7 && y < y1 - 3 ? (h(x, y, 246) < 0.2 ? hex('#b8b0a0') : hex('#d0c8b8')) : h(x, y, 247) < 0.25 ? D.hojaS : y % 2 ? D.hoja : hex('#5aa84a'));
  for (const [tx, s, k] of [[x0 + 6, 1, 0], [x1 - 6, 0.8, 2]]) { const m = Math.round(Math.sin(t * 1.4 + k) * 1.5); for (let y = 0; y < 14 * s; y++) { pset(tx, y1 - 10 - y, hex('#5a3a24')); pset(tx + 1, y1 - 10 - y, hex('#3a2414')); }
    const cy = Math.round(y1 - 10 - 14 * s); for (const [dx, dy, r, c] of [[0, 2, 7, hex('#2e6e34')], [-3, 0, 5, D.hoja], [3, -1, 5, D.hoja], [0, -4, 5, D.hoja], [-2, -3, 3, D.hojaL], [2, 0, 2, D.hojaL]]) disco(tx + dx + m, cy + dy, Math.round(r * s), c); }
  { const u = (t / 6) % 1, cx = Math.round(x0 - 8 + u * (W + 16)), cy = y1 - 6, rd = Math.floor(t * 8) % 2;
    R.anillo(cx - 3, cy, 2, C.k); R.anillo(cx + 3, cy, 2, C.k); linea(cx - 3, cy, cx, cy - 3, C.rojo); linea(cx, cy - 3, cx + 3, cy, C.rojo); pset(cx - 3 + rd, cy - 1, C.k);
    poligono([[cx - 1, cy - 9], [cx + 1, cy - 9], [cx + 1, cy - 4], [cx - 1, cy - 4]], hex('#3a8a5a')); pset(cx, cy - 11, hex('#e8b48a')); pset(cx, cy - 10, hex('#e8b48a')); pset(cx + 1, cy - 11, hex('#3a2414')); }
  R.recorte(null);
}

function d_ordenadores(R, t, o) {
  const { rect, pset, linea, disco } = R;
  d_fijo(R, 'or', () => d_ordenadoresFijo(R));
  d_campus(R, t, 8, 24, 64, 92);
  rect(35, 24, 36, 92, hex('#8a8e9a')); rect(8, 56, 64, 57, hex('#8a8e9a')); for (let i = 0; i < 16; i++) { pset(14 + i, 50 - i, hex('#e8f4fa')); pset(42 + i, 88 - i, hex('#e8f4fa')); }
  // la pantalla de pared: una red de palabras (nodos y enlaces) que gira y late, y una fila de barras que suben
  { const S = [184, 24, 264, 68], cx = 222, cy = 44; rect(S[0], S[1], S[2], S[3], D.pantO); for (let x = S[0]; x <= S[2]; x += 8) for (let y = S[1] + 1; y < S[3]; y += 2) pset(x, y, D.pantOL);
    const N = []; for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + t * 0.4, r = 10 + (k % 3) * 5; N.push([Math.round(cx + Math.cos(a) * r * 1.3), Math.round(cy + Math.sin(a) * r * 0.75)]); }
    R.recorte(S); for (let k = 0; k < 9; k++) { linea(cx, cy, N[k][0], N[k][1], D.pantOR); linea(N[k][0], N[k][1], N[(k + 2) % 9][0], N[(k + 2) % 9][1], hex('#22364e')); }
    for (let k = 0; k < 9; k++) { const p = Math.sin(t * 3 + k) > 0.6; disco(N[k][0], N[k][1], k % 3 === 0 ? 2 : 1, p ? D.oro : [D.cian, D.naranja, D.barraL][k % 3]); }
    disco(cx, cy, 3, D.oro); pset(cx - 1, cy - 1, C.blanco); R.recorte(null);
    for (let k = 0; k < 6; k++) { const v = Math.round(3 + 4 * (0.5 + 0.5 * Math.sin(t * 1.3 + k))); rect(250 + k * 2, 66 - v, 250 + k * 2, 66, D.barra); } }
  // los monitores del fondo: barras que cambian, una línea que corre, una lista que baja
  [78, 112, 188, 236].forEach((x, i) => { const S = [x + 2, 82, x + 24, 92]; rect(S[0], S[1], S[2], S[3], D.pantO);
    if (i % 2 === 0) for (let k = 0; k < 6; k++) { const v = Math.round(2 + 7 / (k + 1) + 2 * Math.sin(t * (1 + i * 0.3) + k)); rect(S[0] + 2 + k * 3, S[3] - v, S[0] + 3 + k * 3, S[3] - 1, k === 0 ? D.naranja : D.barra); }
    else { for (let x2 = S[0] + 1; x2 < S[2]; x2++) pset(x2, Math.round(87 + Math.sin((x2 + t * 12) * 0.5) * 3), D.cian); }
    pset(S[2] - 1, S[1] + 1, Math.floor(t * 2 + i) % 2 ? hex('#5ae08a') : D.pantO); });
  // la persona pequeña de espaldas que teclea en la mesa del fondo, en su silla
  { const x = 160; rect(x - 6, 86, x + 6, 98, C.k); rect(x - 5, 87, x + 5, 97, hex('#3a3e4a')); rect(x - 4, 80, x + 4, 92, C.k); rect(x - 3, 81, x + 3, 91, hex('#5a7ab0')); rect(x - 3, 75, x + 3, 81, C.k); rect(x - 2, 76, x + 2, 80, hex('#2a1e18')); pset(x - 2, 80, hex('#d8a07a'));
    const tec = Math.floor(t * 8) % 2; pset(x - 5, 89 - tec, hex('#d8a07a')); pset(x + 5, 89 - (1 - tec), hex('#d8a07a')); rect(x - 7, 102, x + 7, 111, C.k); rect(x - 1, 99, x + 1, 108, hex('#3a3e4a')); rect(x - 7, 109, x + 7, 110, hex('#5a5e6a')); }
  // la cafetera en la mesa del fondo, con su vapor, y una taza
  { rect(258, 82, 270, 96, C.k); rect(259, 83, 269, 95, hex('#3a3a44')); rect(259, 83, 269, 84, hex('#5a5a66')); rect(261, 89, 267, 95, hex('#22222a')); rect(262, 92, 266, 95, C.blanco); pset(267, 86, Math.floor(t) % 2 ? C.rojo : hex('#5a2a2a'));
    for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1, vx = Math.round(264 + Math.sin(t * 2 + k * 1.7) * (1 + u * 2)), vy = Math.round(80 - u * 12); if (u < 0.8) pset(vx, vy, u < 0.4 ? C.blanco : D.paredOS); } }
  // el rack: LED que parpadean
  for (let r = 0; r < 10; r++) for (let k = 0; k < 4; k++) { const on = h(r, k + Math.floor(t * (3 + r % 4)), 248) > 0.4; pset(285 + k * 3, 53 + r * 6, on ? [hex('#5ae08a'), hex('#5ac8f0'), hex('#ffb040')][(r + k) % 3] : hex('#1a1d22')); }
  // las motas de polvo que flotan en el sol de la ventana, sobre la moqueta
  for (let k = 0; k < 10; k++) { const u = (h(k, 1, 238) + t * 0.025 * (1 + k % 3)) % 1, y = Math.round(150 - u * 44), kk = (y - 113) / 49, x = Math.round(14 + kk * 30 + h(k, 2, 238) * (54 + kk * 20) + Math.sin(t * 0.8 + k) * 2); if (y > 113) pset(x, y, Math.sin(t * 2 + k) > 0 ? hex('#fff4d0') : D.moqL); }
  // el ficus junto a la ventana, que se mece con el aire acondicionado
  { const m = Math.sin(t * 1.2) * 1.2; rect(52, 100, 66, 112, C.k); rect(53, 101, 65, 111, hex('#c8784a')); rect(53, 101, 65, 102, hex('#e0946a')); rect(63, 103, 65, 111, hex('#a05a34'));
    linea(59, 100, 59 + Math.round(m), 74, hex('#5a3a24'));
    for (let k = 0; k < 16; k++) { const a = h(k, 1, 249) * 6.28, r = 3 + h(k, 2, 249) * 9, lx = Math.round(59 + m * (1 - r / 16) + Math.cos(a) * r), ly = Math.round(80 + Math.sin(a) * r * 0.9); disco(lx, ly, 2, k % 3 ? D.hoja : D.hojaS); pset(lx - 1, ly - 1, D.hojaL); } }
  return { suelo: 150, mesa: [96, 244, 140], detras: [122, 220], libres: [[8, 90], [250, 300]], pizarra: [74, 21, 176, 77], tele: [182, 22, 266, 70], ventana: [8, 24, 64, 92] };
}
// la mesa de trabajo de la sala de ordenadores, delante de los personajes: tablero de madera con su canto y vetas, el
// faldón; encima, dos portátiles abiertos de espaldas (en los extremos, sin marca), una maceta, papeles con signos
// inventados y una taza que humea
function d_mesaOrdenadores(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(94, 140, 246, 146, C.k); rect(95, 141, 245, 145, D.mesaO); rect(95, 141, 245, 141, D.mesaOL); rect(95, 145, 245, 145, D.mesaOS);
  for (let k = 0; k < 10; k++) { const y = 142 + (k % 3), x = 96 + Math.floor(h(k, 1, 250) * 130); rect(x, y, x + 10 + (k % 4) * 3, y, D.mesaOS); }
  // el faldón de chapa perforada (la trama de agujeros), en sombra bajo el tablero, con el pasacables
  rect(98, 146, 242, 172, C.k); rect(99, 147, 241, 171, hex('#8a8e9a')); rect(99, 147, 241, 147, hex('#a8acb8')); rect(99, 170, 241, 171, hex('#6a6e7a'));
  for (let y = 151; y < 169; y += 3) for (let x = 102 + ((y / 3) % 2 ? 1 : 0); x < 239; x += 3) { pset(x, y, hex('#4e525e')); pset(x + 1, y, hex('#9a9eaa')); }
  for (let y = 147; y < 151; y++) for (let x = 99; x < 242; x++) d_tine(R, x, y, C.k, 0.3 - (y - 147) * 0.07);
  R.anillo(196, 152, 3, C.k); disco(196, 152, 2, hex('#2a2c34')); pset(195, 151, hex('#6a6e7a'));
  // bajo el faldón: los cables que bajan a la regleta del suelo, con su piloto, y las patas con su zapata
  for (const [x, c] of [[195, hex('#22242a')], [197, hex('#3a6ab8')]]) for (let y = 172; y < 178; y++) pset(x + (y > 175 ? 1 : 0), y, c);
  rect(184, 176, 212, 179, C.k); rect(185, 177, 211, 178, C.blanco); for (let x = 188; x < 208; x += 5) pset(x, 177, C.k); pset(209, 177, Math.floor(t * 0.7) % 2 ? C.rojo : hex('#ff8080'));
  for (const x of [98, 239]) { rect(x, 146, x + 3, 179, C.k); rect(x + 1, 146, x + 2, 178, hex('#5a5e6a')); rect(x + 1, 146, x + 1, 178, hex('#7a7e8a')); rect(x - 1, 178, x + 4, 179, C.k); }
  // la mochila apoyada en la pata de la izquierda, con su bolsillo, la cremallera y el asa
  { const x = 104; rect(x, 158, x + 15, 179, C.k); rect(x + 1, 159, x + 14, 178, hex('#3a6a9a')); rect(x + 1, 159, x + 14, 160, hex('#5a8aba')); rect(x + 12, 161, x + 14, 178, hex('#284e74'));
    rect(x + 3, 167, x + 12, 177, C.k); rect(x + 4, 168, x + 11, 176, hex('#4a7aaa')); rect(x + 4, 168, x + 11, 168, hex('#2a4a6a')); pset(x + 10, 169, C.metalL);
    linea(x + 4, 158, x + 6, 154, C.k); linea(x + 6, 154, x + 10, 154, C.k); linea(x + 10, 154, x + 11, 158, C.k); }
  // en primer término, abajo a la izquierda, la costilla de Adán grande en su maceta: las hojas acorazonadas, con su
  // nervio, su luz y sus cortes, se mecen con el aire acondicionado (de noche, si la escena ha teñido la sala, en sombra)
  { const m = Math.sin(t * 0.9) * 1.5, c0 = R.pget(1, 15), noche = ((c0 >>> 8) & 255) < 150, nc = (c) => noche ? d_mez(c, hex('#0e122e'), 0.5) : c;
    const hoja = (bx, by, ex, ey, w) => { const dx = ex - bx, dy = ey - by, l = Math.hypot(dx, dy), px = -dy / l, py = dx / l;
      const P = (u, v) => [Math.round(bx + dx * u + px * v), Math.round(by + dy * u + py * v)];
      poligono([P(0.1, 0), P(0.25, w + 1), P(0.6, w + 1), P(1.08, 0), P(0.6, -w - 1), P(0.25, -w - 1)], C.k);
      poligono([P(0.14, 0), P(0.27, w), P(0.6, w * 0.95), P(1, 0), P(0.6, -w * 0.95), P(0.27, -w)], nc(D.hoja));
      poligono([P(0.2, 0), P(0.3, w - 1), P(0.6, w * 0.85 - 1), P(0.95, 0)], nc(D.hojaL));
      R.linea(...P(0.12, 0), ...P(0.98, 0), nc(D.hojaS));
      for (const u of [0.35, 0.55, 0.75]) { R.linea(...P(u, w), ...P(u - 0.06, w * 0.35), nc(D.hojaS)); R.linea(...P(u + 0.04, -w), ...P(u - 0.03, -w * 0.35), nc(D.hojaS)); } };
    for (const [bx, by, l, a, w, k] of [[14, 158, 26, -2.5, 5, 3], [18, 158, 30, -0.55, 5, 4], [15, 157, 38, -1.95, 6, 0], [17, 157, 40, -1.35, 7, 1], [19, 158, 30, -0.95, 6, 2]]) {
      const ex = Math.round(bx + Math.cos(a) * l + m * (k % 2 ? 1 : 0.6)), ey = Math.round(by + Math.sin(a) * l);
      const mx = Math.round(bx + Math.cos(a) * l * 0.4), my = Math.round(by + Math.sin(a) * l * 0.4);
      R.linea(bx, by, mx, my, C.k); R.linea(bx + 1, by, mx + 1, my, nc(hex('#2e6e34')));
      hoja(mx, my, ex, ey, w); }
    rect(3, 158, 31, 179, C.k); rect(4, 159, 30, 179, nc(hex('#4a4e5a'))); rect(4, 159, 30, 160, nc(hex('#6a6e7a'))); rect(25, 161, 30, 179, nc(hex('#363a44'))); rect(5, 161, 6, 179, nc(hex('#5e6270')));
    rect(2, 157, 32, 159, C.k); rect(3, 157, 31, 158, nc(hex('#5e6270'))); for (let y = 164; y < 178; y += 4) rect(8, y, 23, y, nc(hex('#3e424e'))); }
  // los dos portátiles (la tapa por detrás, gris, sin marca), con el brillo de la pantalla a su alrededor
  for (const x of [100, 222]) { rect(x, 127, x + 20, 141, C.k); rect(x + 1, 128, x + 19, 140, hex('#a8acb8')); rect(x + 1, 128, x + 19, 128, hex('#c8ccd8')); rect(x + 18, 129, x + 19, 140, hex('#8a8e9a')); disco(x + 10, 134, 2, hex('#b8bcc8'));
    if (Math.sin(t * 2 + x) > 0) pset(x + 2, 127, hex('#bfe4ff')); }
  // la maceta con una planta pequeña
  rect(128, 134, 136, 141, C.k); rect(129, 135, 135, 140, hex('#e8e4dc')); for (const [dx, dy] of [[-2, -3], [2, -4], [0, -6], [-3, -6], [3, -7]]) { R.disco(132 + dx + Math.round(Math.sin(t + dx) * 0.6), 132 + dy, 2, D.hoja); pset(132 + dx, 131 + dy, D.hojaL); }
  // papeles con signos y una gráfica, y un bolígrafo
  rect(150, 140, 176, 144, hex('#d8d8d0')); rect(151, 140, 175, 143, C.blanco); for (let x = 153; x < 172; x += 3) pset(x, 141, D.rotu1); rect(170, 142, 173, 143, D.naranja);
  rect(180, 141, 198, 144, hex('#e8e0c8')); for (let x = 182; x < 196; x += 2) pset(x, 142, D.tinta); linea(184, 145, 196, 143, D.rotu1);
  // la taza que humea
  rect(206, 135, 213, 142, C.k); rect(207, 136, 212, 141, C.blanco); rect(207, 136, 212, 136, hex('#6a4024')); rect(213, 137, 215, 140, C.k); pset(214, 138, C.blanco);
  for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1, vx = Math.round(209 + Math.sin(t * 2 + k * 2) * (1 + u * 2)), vy = Math.round(133 - u * 10); if (u < 0.8) pset(vx, vy, u < 0.4 ? C.blanco : D.paredOS); }
  return { mesa: [96, 244, 140], detras: [122, 220] };
}
function d_graficaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  rect(0, 0, 319, 136, D.paredO);
  for (let y = 0; y < 136; y++) for (let x = 0; x < 320; x++) { const n = h(x >> 1, y >> 1, 261); if (n < 0.07) pset(x, y, D.paredOS); else if (n > 0.965) pset(x, y, D.paredOL); }
  // la luz de la ventana (a la izquierda, fuera de cuadro) en la pared, tramada
  for (let y = 10; y < 130; y++) for (let x = 0; x < 18; x++) if ((x + y) % 2 === 0 || x < 6) pset(x, y, d_mez(D.paredO, C.blanco, 0.5));
  // la planta de detrás del monitor (a la derecha, bajo la esquina de Atom)
  rect(286, 112, 306, 136, C.k); rect(287, 113, 305, 135, hex('#c8784a')); rect(287, 113, 305, 114, hex('#e0946a')); rect(302, 115, 305, 135, hex('#a05a34'));
  // el monitor: marco, cámara, la luz de encendido, el pie y su base
  rect(20, 18, 274, 130, C.k); rect(21, 19, 273, 129, hex('#2a2c34')); rect(21, 19, 273, 19, hex('#4a4e5a')); rect(21, 125, 273, 129, hex('#22242a'));
  disco(147, 21, 1, hex('#0e0e12')); pset(262, 127, hex('#5ae08a'));
  rect(136, 130, 158, 142, C.k); rect(137, 130, 157, 141, hex('#9aa0ac')); rect(137, 130, 139, 141, hex('#c0c6d0')); rect(155, 130, 157, 141, hex('#7a808c'));
  // la mesa: tablero con vetas, el reflejo azul de la pantalla y la sombra del pie
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.05 + y * 0.9 + Math.sin(x * 0.02) * 3) + (h(x >> 2, y, 262) - 0.5) * 0.8; pset(x, y, v > 1.1 ? D.mesaOL : v < -1.2 ? D.mesaOS : D.mesaO); }
  rect(0, 136, 319, 136, D.mesaOD); rect(0, 176, 319, 179, D.mesaOD); rect(0, 175, 319, 175, D.mesaOS);
  for (let y = 137; y < 146; y++) for (let x = 24 + (y - 137); x < 270 - (y - 137); x++) if ((x + y) % 3 === 0) d_tine(R, x, y, hex('#5a8ac8'), 0.18);
  for (let j = -3; j <= 3; j++) { const w = Math.round(Math.sqrt(1 - (j / 3.5) ** 2) * 30); rect(147 - w, 144 + j, 147 + w, 144 + j, j < 0 ? hex('#b0b6c0') : hex('#8a909c')); } rect(117, 147, 177, 148, d_mez(D.mesaO, C.k, 0.35));
  // el teclado con sus teclas y el ratón
  rect(28, 150, 112, 164, C.k); rect(29, 151, 111, 163, hex('#d8dce4')); rect(29, 163, 111, 163, hex('#a8aeb8'));
  for (let r = 0; r < 4; r++) for (let x = 31 + (r % 2) * 2; x < 108; x += 5) { rect(x, 152 + r * 3, x + 3, 153 + r * 3, hex('#f4f6fa')); pset(x + 3, 153 + r * 3, hex('#b8bec8')); }
  rect(50, 161, 88, 162, hex('#f4f6fa'));
  // la libreta abierta con signos y una gráfica a lápiz
  rect(120, 154, 172, 176, C.k); rect(121, 155, 145, 175, hex('#f4f0e4')); rect(147, 155, 171, 175, hex('#f4f0e4')); rect(145, 155, 146, 175, hex('#b8b0a0'));
  for (let y = 158; y < 174; y += 4) { rect(123, y, 143, y, hex('#d8d4e4')); rect(149, y, 169, y, hex('#d8d4e4')); }
  d_renglon(R, 123, 157, 4, D.tinta, 71); d_renglon(R, 123, 165, 3, D.tinta, 72); linea(150, 172, 150, 158, hex('#6a6a7a')); linea(150, 172, 168, 172, hex('#6a6a7a')); for (let k = 0; k < 6; k++) rect(152 + k * 3, 172 - Math.round(12 / (k + 1)), 153 + k * 3, 171, hex('#6a6a7a'));
  // la tira de papel donde cada tinta deja su muestra de letra
  rect(178, 171, 306, 176, hex('#c8c0a8')); rect(179, 171, 305, 175, hex('#f4ecd8'));
}

const d_TINTAS = ['#2a2430', '#6a3a1e', '#b02a2a', '#2a7a3a', '#2a4aa8'];

function d_grafica(R, t, o) {
  const { rect, pset, linea, disco } = R;
  d_fijo(R, 'orG', () => d_graficaFijo(R));
  // la pantalla: barra de ventana, la columna de iconos, la rejilla, los ejes con sus cifras y la leyenda sin palabras
  const S = [26, 24, 268, 122]; rect(S[0], S[1], S[2], S[3], D.pantO); rect(S[0], S[1], S[2], S[1] + 6, D.pantOL);
  [C.rojo, C.amarillo, hex('#5ab85a')].forEach((c, i) => disco(S[0] + 5 + i * 5, S[1] + 3, 1, c)); rect(S[0] + 24, S[1] + 2, S[0] + 54, S[1] + 4, D.pantOR); rect(S[0] + 58, S[1] + 2, S[0] + 80, S[1] + 4, hex('#24344a'));
  rect(S[0], S[1] + 7, S[0] + 22, S[3], hex('#0c1420'));
  for (let k = 0; k < 6; k++) { const y = S[1] + 12 + k * 13; rect(S[0] + 4, y, S[0] + 8, y + 4, k === 2 ? D.barra : D.pantOR); rect(S[0] + 11, y + 1, S[0] + 18, y + 2, D.pantOR); if (k === 2) rect(S[0], y - 2, S[0] + 1, y + 6, D.barra); }
  const base = 114, x0 = 62, paso = 15, ancho = 10, n = 13, b = d_suave(o.baila ?? 0);
  for (let y = base - 16; y > 34; y -= 16) for (let x = x0 - 4; x < 262; x += 2) pset(x, y, D.pantOL);
  linea(x0 - 4, 34, x0 - 4, base, hex('#8a9ab0')); linea(x0 - 4, base, 262, base, hex('#8a9ab0'));
  [0, 25, 50, 75].forEach((v, i) => d_num(R, String(v), x0 - 6 - (v ? 4 * String(v).length : 4), base - 2 - i * 16, hex('#8a9ab0')));
  rect(212, 36, 216, 40, D.barra); rect(219, 37, 232, 38, D.pantOR); for (let x = 237; x < 248; x += 3) rect(x, 38, x + 1, 38, D.naranja); rect(251, 37, 260, 38, D.pantOR);
  // las barras: bajan como las palabras de un idioma; con o.baila se igualan en fila y bailan en ola, con patitas
  for (let i = 0; i < n; i++) {
    const z = 76 / Math.pow(i + 1, 0.85), ola = Math.sin(t * 7 - i * 0.8), v = Math.round(z + (30 - z) * b + b * ola * 6), salto = Math.round(b * Math.max(0, ola) * 3);
    const x = x0 + i * paso, top = base - 1 - v - salto;
    rect(x, top, x + ancho - 1, base - 1 - salto, D.barraS); rect(x + 1, top + 1, x + ancho - 2, base - 1 - salto, D.barra); rect(x + 1, top + 1, x + 2, base - 1 - salto, D.barraL); rect(x + 1, top, x + ancho - 2, top, D.barraL);
    if (b > 0.4) { const p = ola > 0; linea(x + 2, base - salto, p ? x - 1 : x + 2, base + 3 - salto, D.barraL); linea(x + ancho - 3, base - salto, p ? x + ancho - 3 : x + ancho, base + 3 - salto, D.barraL); if (salto) linea(x, base, x + ancho - 1, base, D.pantOL); }
  }
  for (let i = 0; i < n - 1; i++) { const ya = base - 1 - 78 / Math.pow(i + 1, 0.86), yb = base - 1 - 78 / Math.pow(i + 2, 0.86), xa = x0 + i * paso + ancho / 2, xb = xa + paso;
    for (let s = 0; s <= 1; s += 0.08) if (Math.floor(s * 12) % 2 === 0) pset(Math.round(xa + (xb - xa) * s), Math.round(ya + (yb - ya) * s), D.naranja); }
  // el puntero que pasea por la gráfica
  { const px = Math.round(150 + Math.sin(t * 0.6) * 60), py = Math.round(70 + Math.sin(t * 0.9) * 18); for (let j = 0; j < 7; j++) { linea(px, py + j, px + Math.min(j, 4), py + j, C.blanco); pset(px - 1, py + j, C.k); pset(px + Math.min(j, 4) + 1, py + j, C.k); } }
  for (let i = 0; i < 14; i++) pset(236 + i, 30 + i, hex('#22344c'));
  // la taza que humea a la izquierda
  { rect(6, 146, 22, 166, C.k); rect(7, 147, 21, 165, hex('#e8e4dc')); rect(7, 147, 21, 148, hex('#5a3418')); rect(19, 149, 21, 165, hex('#c8c2b6')); rect(22, 151, 26, 160, C.k); rect(23, 152, 25, 159, hex('#e8e4dc')); rect(23, 153, 24, 158, C.k);
    for (let k = 0; k < 5; k++) { const u = (t * 0.45 + k / 5) % 1, vx = Math.round(14 + Math.sin(t * 2 + k * 1.3) * (1 + u * 4)), vy = Math.round(144 - u * 22); if (u < 0.85) { pset(vx, vy, u < 0.4 ? C.blanco : D.paredOS); pset(vx + 1, vy, D.paredOL); } } }
  // los cinco tinteros con su pluma y su tinta, y la muestra de letra de cada uno en la tira de papel
  const xs = [190, 214, 238, 262, 286];
  if (o.plumas !== false) xs.forEach((x, i) => { const c = hex(d_TINTAS[i]);
    rect(x - 6, 152, x + 6, 168, C.k); rect(x - 5, 153, x + 5, 167, hex('#cfe2ea')); rect(x - 5, 158, x + 5, 167, c); rect(x - 5, 158, x + 5, 158, d_mez(c, C.blanco, 0.35)); rect(x - 4, 153, x - 4, 166, C.blanco);
    rect(x - 3, 149, x + 3, 152, C.k); rect(x - 2, 150, x + 2, 151, hex('#8a8e98'));
    const fx = x + 10 + (i % 2) * 3, fy = 118 + (i % 3) * 3; linea(x, 156, fx, fy, C.k);
    R.poligono([[x + 3, 146], [fx - 3, fy + 2], [fx, fy - 1], [fx + 2, fy + 2], [x + 5, 146]], C.k); R.poligono([[x + 3, 145], [fx - 2, fy + 2], [fx, fy], [fx + 1, fy + 2], [x + 4, 145]], i === 2 ? hex('#f4ecd8') : C.blanco);
    for (let k = 0; k < 5; k++) { const yy = fy + 6 + k * 5, xx = Math.round(x + 3 + (fx - x - 3) * (1 - (yy - fy) / (146 - fy))); pset(xx - 1, yy, hex('#c8c4bc')); }
    linea(x, 150, fx, fy, c === hex(d_TINTAS[0]) ? hex('#6a6470') : d_mez(c, C.blanco, 0.3));
    d_renglon(R, x - 9, 171, 3, c, 80 + i * 7);
    if (Math.sin(t * 2.2 + i * 1.3) > 0.85) pset(x - 3, 160, C.blanco); });
  return { pantalla: S, barras: { x0, paso, ancho, base }, plumas: xs, taza: [14, 146] };
}

// dentro de la ventana gótica (el arco apuntado de arriba y el rectángulo de abajo)
const d_enArco = (x, y, e = 0) => { if (x < 119 - e || x > 165 + e || y > 96) return false; return y >= 46 || (Math.hypot(x - 143, y - 46) <= 23 + e && Math.hypot(x - 141, y - 46) <= 23 + e); };

function d_escriptorioFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de tablas con las vigas (tranquilo bajo la barra del año) y la viga maestra
  for (let y = 0; y < 16; y++) for (let x = 0; x < 320; x++) pset(x, y, y % 4 === 3 ? D.vigaS : h(x >> 3, y, 271) < 0.15 ? D.vigaL : D.viga);
  for (let x = 6; x < 320; x += 34) { rect(x, 0, x + 6, 15, D.vigaS); rect(x, 0, x, 15, D.viga); }
  rect(0, 16, 319, 21, C.k); rect(0, 17, 319, 20, D.vigaL); rect(0, 17, 319, 17, hex('#8a6a4a')); rect(0, 20, 319, 20, D.vigaS); for (let x = 4; x < 320; x += 11) rect(x, 18, x + 6, 18, D.viga);
  // el muro de sillares: cada piedra con su tono, luz arriba a la izquierda, sombra abajo, juntas y desconchones
  for (let y = 22; y < 114; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor((y - 22) / 10), off = fy % 2 ? 11 : 0, fx = Math.floor((x + off) / 22), lx = (x + off) % 22, ly = (y - 22) % 10;
    if (lx === 0 || ly === 0) { pset(x, y, D.piedraJ); continue; } const v = h(fx, fy, 272), n = h(x, y, 273); let c = v < 0.3 ? D.piedraS : v > 0.8 ? D.piedraL : D.piedra;
    if (ly === 1 || lx === 1) c = d_mez(c, C.blanco, 0.15); if (ly === 9 || lx === 21) c = d_mez(c, C.k, 0.18); if (n < 0.04) c = D.piedraS; if (n > 0.985) c = D.piedraL; pset(x, y, c); }
  // la esquina de Atom, tranquila: el muro algo más oscuro y liso de juntas
  for (let y = 22; y < 46; y++) for (let x = 276; x < 320; x++) pset(x, y, d_mez(R.pget(x, y), D.piedra, 0.6));
  // el derrame de la ventana (la piedra en bisel, iluminada) y el alféizar
  for (let y = 14; y < 98; y++) for (let x = 108; x <= 176; x++) { if (d_enArco(x, y) || !d_enArco(x, y, 9)) continue; const n = h(x, y, 274); pset(x, y, x < 142 ? (n < 0.1 ? D.piedra : D.piedraL) : (n < 0.1 ? D.piedraJ : D.piedraS)); if (!d_enArco(x, y, 8)) pset(x, y, D.piedraJ); }
  rect(106, 98, 178, 104, C.k); rect(107, 98, 177, 101, D.piedraL); rect(107, 102, 177, 103, D.piedraS);
  // la maceta de romero en el alféizar
  rect(160, 90, 170, 98, C.k); rect(161, 91, 169, 97, hex('#b0603a')); rect(161, 91, 169, 91, hex('#c87a50'));
  // el armario de libros y rollos: la madera con vetas, las baldas, lomos de colores apagados, rollos con sus discos
  rect(4, 26, 76, 113, C.k); rect(5, 27, 75, 112, D.viga); rect(5, 27, 75, 30, D.vigaL); rect(5, 27, 6, 112, D.vigaL); rect(74, 27, 75, 112, D.vigaS);
  for (let y = 31; y < 112; y++) for (let x = 8; x < 72; x++) pset(x, y, h(x >> 1, y >> 3, 275) < 0.3 ? D.vigaS : hex('#2a1a10'));
  [46, 66, 88, 110].forEach((y) => { rect(7, y, 73, y + 2, D.vigaL); rect(7, y + 2, 73, y + 2, D.vigaS); });
  [[31, 45], [49, 65], [69, 87]].forEach(([a, b2], r) => { let x = 9; while (x < 70) { const w = 3 + Math.floor(h(x, r, 276) * 3), hh = b2 - a - Math.floor(h(x, r, 277) * 6); if (h(x, r, 278) < 0.15 && r === 1) { // los rollos apilados
        for (let k = 0; k < 3; k++) { disco(x + 3, b2 - 2 - k * 5, 2, C.k); disco(x + 3, b2 - 2 - k * 5, 1, D.pergamino); } x += 8; continue; }
      const c = [hex('#7a2a24'), hex('#5a3a24'), hex('#3a4a2a'), hex('#6a5a3a'), hex('#4a2a3a'), hex('#8a6a3a')][Math.floor(h(x, r, 279) * 6)];
      rect(x, b2 - hh, x + w - 1, b2, C.k); rect(x, b2 - hh + 1, x + w - 2, b2, c); pset(x, b2 - hh + 3, C.oroP); pset(x, b2 - 3, hex('#d8a840')); x += w + (h(x, r, 280) < 0.2 ? 2 : 0); } });
  // el libro grande tumbado con su cadena en la balda de abajo, y un tarro
  rect(10, 102, 40, 109, C.k); rect(11, 103, 39, 108, hex('#6a3a24')); rect(11, 103, 39, 103, hex('#8a5a3a')); rect(13, 104, 37, 107, D.pergamino); for (let x = 40; x < 56; x += 2) pset(x, 108 - ((x / 2) % 2), C.metalS);
  rect(58, 98, 66, 109, C.k); rect(59, 99, 65, 108, hex('#8a9a7a')); rect(58, 96, 66, 98, hex('#6a5a3a'));
  // el candil de pared: el soporte de hierro (la llama se pinta en cada fotograma)
  rect(92, 58, 94, 70, C.k); linea(94, 66, 100, 62, C.k); rect(96, 60, 104, 63, C.k); rect(97, 60, 103, 62, hex('#4a4a52')); rect(98, 52, 102, 60, D.vela); rect(98, 52, 98, 60, C.blanco); rect(102, 53, 102, 60, D.velaS); pset(101, 56, D.velaS);
  // el bastidor de secar pieles: el marco, la piel tensada con sus venas y los cordeles
  rect(184, 32, 246, 108, C.k); rect(185, 33, 245, 107, D.vigaL); rect(189, 37, 241, 103, C.k);
  for (let y = 38; y < 103; y++) for (let x = 190; x < 241; x++) { const fy = Math.floor((y - 22) / 10), off = fy % 2 ? 11 : 0, lx = (x + off) % 22, ly = (y - 22) % 10;
    pset(x, y, lx === 0 || ly === 0 ? D.piedraD : h(x, y, 273) < 0.06 ? D.piedraJ : d_mez(D.piedraS, D.piedraJ, (ly === 1 || y < 42 || x < 194) ? 0.6 : 0.2)); }
  const PI = [[196, 44], [214, 41], [234, 45], [236, 70], [233, 97], [214, 99], [195, 96], [193, 70]];
  poligono(PI, D.pergaminoS); poligono(PI.map(([x, y]) => [x + (x < 214 ? 1 : -1), y + (y < 70 ? 1 : -1)]), D.pergamino);
  for (let y = 44; y < 98; y++) for (let x = 195; x < 236; x++) if (R.pget(x, y) === D.pergamino) { const n = h(x >> 1, y >> 1, 281); if (n < 0.08) pset(x, y, D.pergaminoS); else if (n > 0.94) pset(x, y, D.pergaminoL); }
  linea(206, 50, 212, 80, d_mez(D.pergamino, D.pergaminoS, 0.6)); linea(224, 52, 220, 88, d_mez(D.pergamino, D.pergaminoS, 0.6));
  for (const [a, b2] of [[[196, 44], [190, 38]], [[214, 41], [214, 37]], [[234, 45], [240, 38]], [[236, 70], [240, 70]], [[233, 97], [240, 102]], [[214, 99], [214, 102]], [[195, 96], [190, 102]], [[193, 70], [190, 70]], [[205, 42], [202, 37]], [[225, 43], [228, 37]], [[235, 58], [240, 56]], [[235, 84], [240, 86]], [[194, 58], [190, 56]], [[194, 84], [190, 86]]]) linea(a[0], a[1], b2[0], b2[1], hex('#c8b890'));
  for (let y = 36; y < 106; y += 8) { pset(186, y, D.vigaS); pset(244, y, D.vigaS); }
  rect(186, 108, 190, 113, C.k); rect(240, 108, 244, 113, C.k);
  // el atril del escriba de fondo con su libro
  rect(252, 86, 274, 90, C.k); rect(253, 86, 273, 88, D.vigaL); rect(255, 82, 271, 86, D.pergamino); rect(263, 82, 263, 86, D.pergaminoS); rect(262, 90, 264, 113, C.k); rect(256, 111, 270, 113, C.k);
  // la repisa de pigmentos (bajo la esquina de Atom): tarros de colores, el mortero, el bote de plumas; hierbas colgadas
  for (const y of [70, 92]) { rect(278, y, 318, y + 3, C.k); rect(279, y, 317, y + 1, D.vigaL); rect(279, y + 2, 317, y + 2, D.vigaS); linea(282, y + 4, 286, y + 8, C.k); linea(314, y + 4, 310, y + 8, C.k); }
  [['#c8902a', 280], ['#2a4aa8', 289], ['#3a8a5a', 298], ['#b8302a', 307]].forEach(([c, x], i) => { rect(x, 60, x + 7, 70, C.k); rect(x + 1, 61, x + 6, 69, hex('#d8cdb0')); rect(x + 1, 64, x + 6, 69, hex(c)); rect(x + 1, 64, x + 6, 64, d_mez(hex(c), C.blanco, 0.4)); rect(x, 59, x + 7, 60, hex('#6a5a3a')); });
  rect(282, 86, 294, 92, C.k); rect(283, 86, 293, 91, D.piedraL); rect(283, 86, 293, 86, D.piedraS); linea(290, 86, 296, 78, C.k); linea(291, 86, 297, 78, D.vigaL);
  rect(302, 82, 310, 92, C.k); rect(303, 83, 309, 91, hex('#8a6a4a')); for (const [dx, a] of [[0, -6], [3, -3], [5, 2]]) linea(304 + dx, 82, 304 + dx + a, 70, C.blanco);
  // el suelo de baldosas de barro en perspectiva, con juntas, tonos, desgaste y paja suelta
  for (let y = 114; y < 180; y++) { const fy = Math.floor(Math.log(1 + (y - 114) / 6) * 3.2); for (let x = 0; x < 320; x++) { const s = 14 + (y - 114) * 0.45, fx = Math.floor((x - 160) / s + 100), lx = ((x - 160) / s + 100) - fx;
    const yb = 114 + 6 * (Math.exp((fy + 1) / 3.2) - 1); let c = h(fx, fy, 282) < 0.3 ? D.baldosaS : h(fx, fy, 282) > 0.85 ? D.baldosaL : D.baldosa;
    if (lx < 0.06 || yb - y < 1) c = D.baldosaJ; else if (h(x, y, 283) < 0.05) c = D.baldosaS; pset(x, y, c); } }
  rect(0, 114, 319, 115, D.baldosaJ);
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 284) * 316), y = 118 + Math.floor(h(k, 2, 284) * 58); linea(x, y, x + 3, y - (k % 2), hex('#d8b45a')); }
  rect(0, 108, 319, 113, D.piedraJ); for (let x = 0; x < 320; x += 11) pset(x, 110, D.piedraS);
  d_escMas(R);
}
function d_escriptorio(R, t, o) {
  const { rect, pset, linea, disco } = R;
  d_fijo(R, 'es', () => d_escriptorioFijo(R));
  // la ventana gótica: el cielo, las nubes, una torre lejana con su bandera, un pájaro; los rombos de plomo y el parteluz
  R.recorte([119, 22, 165, 96]);
  for (let y = 22; y <= 96; y++) { const f = (y - 22) / 52 * 2; for (let x = 119; x <= 165; x++) if (d_enArco(x, y)) { const i = Math.floor(f), k = f - i > d_bayer(x, y) ? i + 1 : i; pset(x, y, k <= 0 ? D.cielo1 : k === 1 ? D.cielo2 : D.cielo3); } }
  for (const [v, y, w, d] of [[1.1, 36, 12, 0], [1.9, 50, 8, 25], [2.8, 62, 6, 40]]) { const cx = 110 + ((t * v + d) % 66); d_nube(R, cx, y, w); }
  for (let y = 74; y <= 96; y++) for (let x = 118; x <= 166; x++) pset(x, y, y < 80 ? (h(x, y, 285) < 0.5 ? hex('#7a9a6a') : hex('#8aaa7a')) : y < 86 ? hex('#6a8a5a') : hex('#5a7a4a'));
  for (let y = 56; y < 76; y++) for (let x = 147; x <= 153; x++) pset(x, y, x === 147 ? hex('#b8b0a0') : x === 153 ? hex('#7a7468') : hex('#a09888'));
  R.poligono([[146, 56], [150, 46], [154, 56]], hex('#6a5a5a')); for (let y = 60; y < 74; y += 5) pset(150, y, C.k);
  { const fl = Math.sin(t * 6) > 0; pset(150, 45, C.k); pset(150, 44, C.k); pset(151, 44, C.rojo); pset(152, 44 + (fl ? 1 : 0), C.rojo); }
  { const u = ((t + 1) / 6) % 1, bx = Math.round(116 + u * 54), by = 40 + Math.round(Math.sin(t * 2) * 3), al = Math.sin(t * 11) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); }
  for (let y = 22; y <= 96; y++) for (let x = 119; x <= 165; x++) { if (!d_enArco(x, y)) continue; if ((x + y) % 8 === 0 || (x - y + 400) % 8 === 0) pset(x, y, D.plomo); else if ((x + y) % 8 === 1 && y < 74) pset(x, y, d_mez(R.pget(x, y), C.blanco, 0.25)); }
  R.recorte(null);
  rect(141, 26, 143, 96, C.k); rect(142, 26, 142, 96, D.piedraL); rect(118, 60, 166, 61, C.k);
  // el haz de luz que entra por la ventana y cae al suelo, con las motas de polvo que flotan
  const lu = 0.16 + 0.04 * Math.sin(t * 0.7);
  for (let y = 60; y < 178; y++) { const k = (y - 60) / 118, a = Math.round(120 + k * 70), b2 = Math.round(166 + k * 96); for (let x = a; x <= b2; x++) if ((x + y) % 2 === 0 || y > 150) d_tine(R, x, y, D.luz, lu * (y > 150 ? 1.2 : 0.9)); }
  for (let k = 0; k < 18; k++) { const u = (h(k, 1, 286) + t * 0.03 * (1 + k % 3)) % 1, y = Math.round(64 + u * 100), kk = (y - 60) / 118, x = Math.round(120 + kk * 70 + h(k, 2, 286) * (46 + kk * 26) + Math.sin(t + k) * 2); pset(x, y, Math.sin(t * 3 + k) > 0 ? C.blanco : D.luz); }
  // la llama del candil de pared y su resplandor
  { const f = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5; for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j); if (d < 10 && (i + j) % 2 === 0) d_tine(R, 100 + i, 49 + j, D.llama, 0.18 * (1 - d / 10)); }
    pset(100, 51, C.k); disco(100, 48, 2, D.llamaS); pset(100 + Math.round(f), 46, D.llama); pset(100, 47, D.llamaL); pset(100, 48, D.llamaL); pset(100 + Math.round(f), 45, D.llama); }
  // el humo del candil, que sube en hilo y se deshace
  for (let k = 0; k < 6; k++) { const u = (t * 0.4 + k / 6) % 1, x = Math.round(100 + Math.sin(t * 1.7 + u * 6) * u * 4), y = Math.round(43 - u * 18); d_tine(R, x, y, hex('#e8e4dc'), 0.5 * (1 - u)); }
  // los manojos de hierbas que cuelgan de la viga, mecidos por la corriente de la ventana
  for (const [x0, k, col] of [[86, 0, D.hoja], [258, 1, hex('#8a9a4a')]]) { const m = Math.round(Math.sin(t * 1.1 + k * 2) * 1.5);
    linea(x0, 21, x0 + m, 27, C.k); rect(x0 - 1 + m, 27, x0 + 1 + m, 28, hex('#b8302a'));
    for (let i = -3; i <= 3; i++) { linea(x0 + m, 29, x0 + m + i * 1.4, 39 + Math.abs(i) % 2, col === D.hoja ? D.hojaS : hex('#6a7a34')); pset(Math.round(x0 + m + i * 1.4), 38 + Math.abs(i) % 2, col); pset(Math.round(x0 + m + i), 33, col); } }
  // un ratón que asoma bajo el alféizar, corre por el zócalo y vuelve a su agujero
  { const c = t % 10; if (c > 6) { const u = c < 8 ? (c - 6) / 2 : 1 - (c - 8) / 2, x = Math.round(176 - d_suave(u) * 70), d = c < 8 ? -1 : 1, p = Math.floor(t * 10) % 2;
      rect(x - 2, 110, x + 2, 112, C.k); rect(x - 1, 110, x + 1, 111, hex('#8a8078')); pset(x + 3 * d, 111, C.k); pset(x + 2 * d, 109, hex('#c8a0a0')); linea(x - 3 * d, 112, x - 6 * d, 111 - p, C.k); pset(x - 1 + p, 113, C.k); pset(x + 1 - p, 113, C.k); }
    rect(178, 109, 181, 113, C.k); pset(179, 108, C.k); pset(180, 108, C.k); }
  // el escriba de fondo en su atril: de perfil, con hábito pardo; la mano con la pluma sube y baja
  { const x = 278, pie = 113; rect(x - 4, pie - 19, x + 4, pie, C.k); rect(x - 3, pie - 18, x + 3, pie - 1, D.habito); rect(x + 1, pie - 18, x + 3, pie - 1, D.habitoS);
    rect(x - 3, pie - 25, x + 2, pie - 19, C.k); rect(x - 2, pie - 24, x + 1, pie - 20, hex('#e0a87a')); rect(x - 2, pie - 25, x + 2, pie - 23, D.habito); pset(x - 2, pie - 22, C.k);
    const e = Math.floor(t * 4) % 2; linea(x - 3, pie - 14, x - 9, pie - 26 - e, D.habito); pset(x - 10, pie - 27 - e, hex('#e0a87a')); linea(x - 10, pie - 28 - e, x - 7, pie - 34 - e, C.blanco); }
  // el gato que duerme en el suelo, junto al armario: la respiración y la cola que se mueve
  { const x = 24, y = 122, r = Math.sin(t * 2) > 0 ? 1 : 0; rect(x - 6, y - 3 - r, x + 5, y + 1, C.k); rect(x - 5, y - 2 - r, x + 4, y, hex('#d8883a')); for (let i = -4; i < 4; i += 2) pset(x + i, y - 2 - r, hex('#a8602a'));
    rect(x + 4, y - 5, x + 8, y, C.k); rect(x + 5, y - 4, x + 7, y - 1, hex('#d8883a')); pset(x + 5, y - 6, C.k); pset(x + 7, y - 6, C.k); pset(x + 6, y - 2, C.k);
    const c = Math.sin(t * 1.6); linea(x - 6, y, x - 10, y - 1 + Math.round(c * 2), C.k); linea(x - 6, y - 1, x - 9, y - 2 + Math.round(c * 2), hex('#d8883a')); }
  const pupitres = o.pupitres ?? [70, 160, 250];
  return { suelo: 150, pupitres, ventana: [118, 24, 166, 96], libres: [[8, 300]] };
}
// los pupitres inclinados del escriptorio, delante de los personajes: o.pupitres (los x de su centro; por omisión
// [70, 160, 250]); cada uno con el tablero inclinado de madera, el pergamino con renglones de signos, el tintero de
// cuerno con su pluma, el frente tallado con un arco y las patas; el del medio, con una vela que titila
function d_pupitres(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R, xs = o.pupitres ?? [70, 160, 250];
  xs.forEach((c, i) => {
    poligono([[c - 19, 152], [c - 17, 145], [c + 17, 145], [c + 19, 152]], C.k); poligono([[c - 18, 151], [c - 16, 146], [c + 16, 146], [c + 18, 151]], D.vigaL);
    poligono([[c - 12, 151], [c - 10, 146], [c + 8, 146], [c + 10, 151]], D.pergamino); linea(c - 10, 146, c + 8, 146, D.pergaminoL);
    for (let y = 147; y < 151; y += 2) for (let x = c - 9 + (y - 147) / 2; x < c + 7; x += 2) if (h(x, y, 290 + i) > 0.25) pset(Math.round(x), y, D.tinta);
    rect(c - 20, 152, c + 20, 155, C.k); rect(c - 19, 153, c + 19, 154, D.viga); rect(c - 19, 153, c + 19, 153, D.vigaL);
    rect(c - 17, 155, c + 17, 172, C.k); rect(c - 16, 156, c + 16, 171, D.viga); rect(c - 16, 156, c - 15, 171, D.vigaL); rect(c + 14, 156, c + 16, 171, D.vigaS);
    for (let y = 158; y < 170; y++) for (let x = c - 8; x <= c + 8; x++) { const dx = Math.abs(x - c), arco = y < 162 ? Math.hypot(dx, y - 162) <= 8 && Math.hypot(dx, y - 162) > 6.5 : dx > 6.5 && dx <= 8; if (arco) pset(x, y, x < c ? D.vigaL : D.vigaS); }
    for (let x = c - 6; x <= c + 6; x += 3) rect(x, 163, x, 169, D.vigaS);
    // las vetas del frente, los clavos de forja de las esquinas y el canto gastado del tablero
    for (let k = 0; k < 7; k++) { const y = 157 + Math.floor(h(k, c, 293) * 14), x = c - 15 + Math.floor(h(k, c, 294) * 22); if (Math.abs(x - c) > 9 || y < 158) rect(x, y, x + 3 + (k % 3), y, D.vigaS); }
    for (const [dx, dy] of [[-14, 158], [14, 158], [-14, 169], [14, 169]]) { pset(c + dx, dy, C.k); pset(c + dx - 1, dy - 1, D.vigaL); }
    for (let x = c - 18; x <= c + 18; x += 5) pset(x, 153, d_mez(D.vigaL, C.blanco, 0.3));
    for (const dx of [-15, 13]) { rect(c + dx, 172, c + dx + 2, 183, C.k); rect(c + dx + 1, 172, c + dx + 1, 182, D.viga); }
    for (let x = c - 18; x <= c + 18; x++) d_tine(R, x, 179, C.k, 0.35);
    // el tintero de cuerno encajado en el lado, con su pluma
    rect(c + 12, 143, c + 16, 150, C.k); rect(c + 13, 144, c + 15, 149, hex('#5a4a3a')); pset(c + 13, 144, hex('#8a7a5a'));
    linea(c + 14, 144, c + 22, 130, C.k); poligono([[c + 16, 140], [c + 21, 129], [c + 24, 128], [c + 19, 139]], C.blanco); linea(c + 17, 139, c + 22, 130, hex('#c8c4bc'));
    if (i === 1 || xs.length === 1) { rect(c - 17, 138, c - 13, 146, C.k); rect(c - 16, 139, c - 14, 145, D.vela); const f = Math.sin(t * 12 + i) > 0 ? 1 : 0; pset(c - 15, 137, C.k); pset(c - 15, 136, D.llamaS); pset(c - 15 + f, 135, D.llama); pset(c - 15, 134, D.llamaL); }
  });
  return { pupitres: xs };
}
// la vela que titila, con su resplandor (x, y: la mecha)
function d_vela(R, t, x, y, r = 22) {
  const { pset } = R, f = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5, g = 0.22 + 0.04 * f;
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j * 1.1); if (d < r && (i + j) % 2 === 0) d_tine(R, x + i, y + j, D.llama, g * (1 - d / r)); }
  R.disco(x, y - 2, 2, D.llamaS); R.disco(x + Math.round(f * 0.6), y - 3, 1, D.llama); pset(x, y - 2, D.llamaL); pset(x + Math.round(f), y - 5, D.llama); pset(x + Math.round(f), y - 6, D.llamaL); pset(x, y, C.k);
}

const d_RENGLON_P = 150, d_X0P = 60, d_X1P = 236;

function d_plumaFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // arriba, el muro desenfocado y la luz de la ventana; la esquina de Atom, tranquila
  for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) { const fy = Math.floor(y / 12), fx = Math.floor((x + (fy % 2) * 18) / 36), j = y % 12 === 0 || (x + (fy % 2) * 18) % 36 === 0;
    pset(x, y, j ? D.piedraD : h(fx, fy, 291) < 0.4 ? D.piedraS : d_mez(D.piedraS, D.piedra, 0.5)); }
  for (let y = 0; y < 26; y++) for (let x = 180; x < 270; x++) if ((x + y) % 2 === 0) d_tine(R, x, y, D.luz, 0.25);
  // el tablero inclinado del pupitre, con vetas
  for (let y = 20; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(y * 0.08 + x * 0.6 + Math.sin(y * 0.03) * 4) + (h(x, y >> 2, 292) - 0.5) * 0.8; pset(x, y, v > 1.1 ? D.vigaL : v < -1.2 ? D.vigaS : hex('#5a3c26')); }
  rect(0, 20, 319, 22, C.k); rect(0, 22, 319, 22, D.vigaL);
  rect(0, 172, 319, 179, C.k); rect(0, 173, 319, 176, D.vigaL); rect(0, 173, 319, 173, hex('#8a6a4a')); rect(0, 177, 319, 179, D.vigaS);
  // el cortaplumas en el listón
  rect(240, 170, 270, 172, C.k); rect(241, 170, 258, 171, hex('#4a3020')); poligono([[258, 169], [272, 170], [258, 172]], C.metalL);
  // el pergamino: borde irregular, manchas, picados en el margen, pautas tenues
  const P = [[34, 28], [120, 26], [200, 27], [262, 29], [264, 90], [262, 168], [180, 170], [100, 169], [36, 168], [34, 100]];
  poligono(P.map(([x, y]) => [x + 2, y + 2]), d_mez(hex('#5a3c26'), C.k, 0.4)); poligono(P, D.pergamino);
  for (let y = 26; y < 171; y++) for (let x = 34; x < 265; x++) { if (R.pget(x, y) !== D.pergamino) continue; const n = h(x >> 1, y >> 1, 293); if (n < 0.05) pset(x, y, D.pergaminoS); else if (n > 0.94) pset(x, y, D.pergaminoL); else if (x < 40 || y < 32) pset(x, y, d_mez(D.pergamino, D.pergaminoS, 0.35)); }
  for (const [x, y, r] of [[240, 50, 6], [70, 150, 4], [200, 160, 3]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && (i + j) % 2 === 0) d_tine(R, x + i, y + j, D.pergaminoS, 0.45);
  for (let k = 0; k < 9; k++) { const y = 36 + k * 14; pset(44, y + 4, d_mez(D.pergaminoS, D.tinta, 0.4)); pset(254, y + 4, d_mez(D.pergaminoS, D.tinta, 0.4)); for (let x = 48; x < 252; x += 2) pset(x, y + 10, d_mez(D.pergamino, D.pergaminoS, 0.45)); }
  // la planta dibujada a la izquierda: raíces de tinta, el tallo, hojas verdes con sus nervios y una flor azul
  for (const [dx, dy] of [[-10, 8], [-4, 10], [4, 9], [10, 7], [0, 12]]) { linea(80, 108, 80 + dx, 108 + dy, D.tinta); linea(80 + dx, 108 + dy, 80 + dx + Math.sign(dx) * 2, 110 + dy, D.tinta); }
  disco(80, 106, 4, D.tinta); disco(80, 106, 3, hex('#a87a4a'));
  linea(80, 102, 80, 50, D.tinta); linea(81, 102, 81, 50, hex('#5a8a3a'));
  for (const [y, d, s] of [[92, -1, 10], [82, 1, 11], [70, -1, 9], [62, 1, 8]]) { const cx = 80 + d * (s + 2), cy = y - 3;
    for (let j = -4; j <= 4; j++) for (let i = -s; i <= s; i++) if ((i * i) / (s * s) + (j * j) / 16 <= 1) pset(cx + i, cy + j + Math.round(i * d * -0.2), (i + j) % 3 ? D.hoja : D.hojaS);
    linea(80, y, cx + d * s, cy - d * s * 0.2 * d, D.tinta); for (let i = -s; i <= s; i += 3) pset(cx + i, cy + Math.round(i * d * -0.2) + 2, D.hojaS); }
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; disco(Math.round(80 + Math.cos(a) * 5), Math.round(44 + Math.sin(a) * 4), 3, hex('#3a5aa8')); }
  disco(80, 44, 3, hex('#5a8ac8')); disco(80, 44, 1, D.oro);
  // los renglones ya escritos (a la derecha de la planta y, debajo de ella, de margen a margen)
  for (let k = 0; k < 8; k++) { const y = 32 + k * 14, x0 = y < 112 ? 108 : d_X0P; d_renglon(R, x0, y, Math.floor((d_X1P - x0) / 11), D.tinta, 100 + k, 2); }
  for (let y = 30; y < 140; y++) for (let x = 46; x < 252; x++) if (R.pget(x, y) === D.tinta && h(x, y, 294) < 0.25) pset(x, y, D.tintaF);
  // la vela: el platillo de latón y la cera con sus goterones (la llama, en cada fotograma)
  rect(4, 148, 32, 154, C.k); rect(5, 149, 31, 152, D.laton); rect(5, 149, 31, 149, hex('#e8c860')); rect(5, 153, 31, 153, D.latonS);
  rect(11, 92, 25, 149, C.k); rect(12, 93, 24, 148, D.vela); rect(12, 93, 14, 148, C.blanco); rect(22, 93, 24, 148, D.velaS);
  for (const [x, l] of [[16, 14], [21, 22], [13, 8]]) { rect(x, 93, x + 1, 93 + l, D.vela); pset(x, 93 + l + 1, D.velaS); }
  rect(12, 92, 24, 93, hex('#f8f0d8'));
  // el tintero de barro a la derecha, con la tinta que brilla
  for (let j = -18; j <= 18; j++) { const w = Math.round(17 * Math.sqrt(1 - (j / 19) ** 2)); rect(285 - w - 1, 134 + j, 285 + w + 1, 134 + j, C.k); }
  for (let j = -17; j <= 17; j++) { const w = Math.round(16 * Math.sqrt(1 - (j / 18) ** 2)); for (let i = -w; i <= w; i++) pset(285 + i, 134 + j, i < -w * 0.5 ? hex('#a87a52') : i > w * 0.55 ? hex('#5a3a22') : (j + 40) % 7 === 0 ? hex('#6a4a30') : hex('#7e5a3a')); }
  rect(275, 113, 295, 118, C.k); rect(276, 114, 294, 117, hex('#8a6a46')); rect(278, 114, 292, 116, C.k); rect(279, 115, 291, 115, hex('#1a1014'));
  rect(272, 150, 298, 153, C.k); rect(273, 150, 297, 151, d_mez(hex('#5a3c26'), C.k, 0.3));
}

function d_pluma(R, t, o) {
  const { rect, pset, linea, poligono } = R;
  d_fijo(R, 'esP', () => d_plumaFijo(R));
  // la tinta del tintero brilla y la llama de la vela titila con su resplandor sobre el pergamino
  if (Math.sin(t * 1.7) > 0) { pset(282, 115, hex('#8a8aaa')); pset(283, 115, hex('#5a5a7a')); }
  d_vela(R, t, 18, 88, 34);
  // el renglón que se escribe ahora: los signos que ya están, el último con brillo de tinta fresca, y la pluma
  const u = o.escribe ?? ((t / 6) % 1), n = Math.floor(16 * u), pos = d_renglon(R, d_X0P, d_RENGLON_P - 8, n, D.tinta, 150, 2);
  if (n > 0) { const [lx, ly] = pos[n - 1]; pset(lx - 2, ly - 6, hex('#8a6a5a')); pset(lx - 1, ly - 5, hex('#a88a7a')); }
  const [px, py] = n > 0 ? pos[n - 1] : [d_X0P, d_RENGLON_P - 4], fr = (16 * u) % 1, tx = Math.round(px + fr * 6 + Math.sin(t * 22) * 0.8), ty = Math.round(py - 2 - Math.abs(Math.sin(t * 9)) * 3);
  if (o.mano !== false) {
    const fx = tx + 44, fy = ty - 70;
    poligono([[tx + 6, ty - 12], [fx - 6, fy + 4], [fx, fy - 2], [fx + 4, fy + 2], [tx + 10, ty - 10]], C.k);
    poligono([[tx + 7, ty - 13], [fx - 5, fy + 4], [fx, fy], [fx + 2, fy + 2], [tx + 9, ty - 11]], C.blanco);
    for (let k = 1; k < 12; k++) { const a = k / 12, x = Math.round(tx + 8 + (fx - tx - 8) * a), y = Math.round(ty - 12 + (fy - ty + 12) * a); pset(x + 2, y + 1, hex('#c8c4bc')); pset(x - 2, y - 1, hex('#dcd8d0')); }
    linea(tx, ty, fx, fy, hex('#c8b890')); linea(tx, ty, tx + 3, ty - 4, C.k); pset(tx, ty, D.tinta);
    brazo(R, tx + 54, ty + 46, tx + 21, ty - 6, '#6a4a30', -1);
  }
  return { suelo: 180, punta: [tx, ty], renglon: [d_X0P, d_RENGLON_P, d_X1P] };
}

// las capas fijas de hoy(): se pintan una vez en un búfer y se copian en cada fotograma
const e_capas = new Map();

function e_capa(R, clave, dibuja) {
  let b = e_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); e_capas.set(clave, b); }
  return b;
}

// mezcla de dos colores (a: cuánto del segundo)
const e_mez = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// el umbral de Bayer 4 × 4 para los tramados
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const e_umbral = (x, y) => e_BAYER[((y & 3) << 2) | (x & 3)];

// la paleta del estudio de noche
const e_P = pal({
  pap: '#3e5446', papS: '#33473a', papM: '#4e6650', papL: '#5e7a5e', cornisa: '#22140c', cornisaL: '#4a3020',
  nogal: '#5a3a22', nogalS: '#3a2414', nogalD: '#24160c', nogalL: '#7a5232', nogalM: '#4a2e1a',
  tabla: '#6a4428', tablaS: '#56361e', tablaL: '#7e5432', tablaD: '#3a2414',
  hueco: '#140c08', oro: '#c8a050', oroS: '#8a6a2a', oroL: '#f0d080', laton: '#b08a3a', latonS: '#6a4e1e',
  perg: '#e2cfa2', pergS: '#cbb385', pergD: '#a88c60', tinta: '#4a2e1c', verde: '#4a8a3a', verdeS: '#2e5a24', azul: '#4a7ab8', rojoT: '#a83a2a',
  cieloA: '#0a1028', cieloB: '#141c3c', cieloC: '#232a52', cieloD: '#353660', luna: '#f4ecc8', lunaS: '#c8c0a0',
  nubeL: '#6a7298', nubeM: '#464e78', nubeS: '#2c3458', tejado: '#10142a', tejadoS: '#0a0c1c', ventanaL: '#f0c060',
  piedra: '#8a8070', piedraS: '#6a6256', piedraL: '#a89e8a', piedraD: '#4a443c', ladrillo: '#4a1e16', ladrilloS: '#2e120c',
  fuegoA: '#fff4b0', fuegoB: '#ffc848', fuegoC: '#f07828', fuegoD: '#a83018', brasa: '#ff6020',
  terciop: '#6a1c26', terciopS: '#4a1018', terciopL: '#8a2a34', cojin: '#2a5a5a', cojinS: '#1c4040',
  alfR: '#7a2020', alfRS: '#5a1616', alfN: '#22305a', alfO: '#c8a050', alfC: '#d8c8a0',
  oscuro: '#07060c', calido: '#ffb060', frio: '#7a90d0',
  pared2: '#3a2618', pared2S: '#2c1c12', pared2L: '#4a3220', azulA: '#2a4a7a', azulAS: '#1c3458', crema: '#e8dcc0',
  ui: '#121c28', uiB: '#1e2c3a', uiL: '#2e4054', uiT: '#8ab0d0', cian: '#8ad8f0', ambar: '#f0c870', rojoNo: '#e03a3a',
});

function e_estudioFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P, B = R.buf;
  // la cornisa del techo, oscura y tranquila
  rect(0, 0, 319, 3, P.cornisa); rect(0, 4, 319, 4, P.cornisaL); rect(0, 5, 319, 5, P.nogalD);
  // el papel pintado adamascado (rombos con su flor), con las juntas de los paños y manchas de viejo
  for (let y = 6; y < 96; y++) for (let x = 0; x < 320; x++) {
    const fila = Math.floor((y - 6) / 18), u = ((x + (fila & 1) * 9) % 18) - 9, v = ((y - 6) % 18) - 9, d = Math.abs(u) + Math.abs(v) * 0.8;
    let c = P.pap;
    if ((d >= 5.2 && d < 6.2) || d < 1.6 || (u === 0 && Math.abs(v) >= 2 && Math.abs(v) <= 3)) c = P.papM;
    else if (Math.abs(v) === 0 && Math.abs(u) >= 2 && Math.abs(u) <= 3) c = P.papM;
    else if (d < 2.4) c = P.papL;
    else if ((x % 18 === 0 || x % 18 === 17) && (y & 1)) c = P.papS;
    if (x % 54 === 53) c = P.papS;
    if (h(x >> 2, y >> 2, 501) < 0.05) c = e_mez(c, P.papS, 0.6);
    B[y * 320 + x] = c;
  }
  // la moldura a media pared y el friso de paneles de nogal con su veta y sus biseles
  rect(0, 96, 319, 96, P.nogalL); rect(0, 97, 319, 98, P.nogal); rect(0, 99, 319, 99, P.nogalD);
  for (let y = 100; y < 128; y++) for (let x = 0; x < 320; x++) {
    const px = x % 32, en = px >= 4 && px <= 27 && y >= 103 && y <= 124;
    let c = en ? P.nogalM : P.nogal;
    if (en && (px === 4 || y === 103)) c = P.nogalD; else if (en && (px === 27 || y === 124)) c = P.nogalL;
    else if (en && (px === 5 || y === 104)) c = P.nogalS;
    else if (h(x >> 3, y, 502) < 0.16) c = e_mez(c, P.nogalD, 0.4);
    B[y * 320 + x] = c;
  }
  rect(0, 128, 319, 128, P.nogalL); rect(0, 129, 319, 131, P.nogalS); rect(0, 132, 319, 132, P.nogalD);   // el rodapié
  // la tarima en perspectiva: tablas cada vez más anchas hacia delante, con sus juntas, su veta y su color
  const filas = [133, 136, 140, 145, 151, 158, 166, 175, 185];
  for (let r = 0; r < filas.length - 1; r++) { const L = 22 + r * 9, off = Math.floor(h(r, 1, 503) * L);
    for (let y = filas[r]; y < Math.min(180, filas[r + 1]); y++) for (let x = 0; x < 320; x++) {
      const n = Math.floor((x + off) / L), j = (x + off) % L, k = h(n, r, 504);
      let c = k < 0.33 ? P.tabla : k < 0.66 ? P.tablaS : P.tablaL;
      if (y === filas[r]) c = P.tablaD; else if (j === 0) c = P.tablaD; else if (y === filas[r] + 1) c = e_mez(c, P.tablaL, 0.4);
      else if (h(x >> 1, y, 505 + r) < 0.12) c = e_mez(c, P.tablaD, 0.45);
      B[y * 320 + x] = c;
    } }
  // la alfombra persa en perspectiva: cenefa dorada y roja, campo rojo con el medallón azul y flecos
  for (let y = 146; y <= 172; y++) { const u = (y - 146) / 26, xa = Math.round(42 - u * 18), xb = Math.round(194 + u * 18);
    for (let x = xa; x <= xb; x++) { const dx = Math.min(x - xa, xb - x), dy = Math.min(y - 146, 172 - y), bd = Math.min(dx, dy * 2);
      let c;
      if (bd === 0) c = P.alfO; else if (bd < 4) c = (x + y) % 4 === 0 ? P.alfO : P.alfRS; else if (bd < 5) c = P.alfO;
      else { const cx = (xa + xb) / 2, mu = Math.abs(x - cx) / ((xb - xa) / 2), mv = Math.abs(y - 159) / 13, m = mu * 1.5 + mv;
        if (m < 0.5) c = m < 0.18 ? P.alfO : (((x >> 1) + y) % 3 === 0 ? P.alfC : P.alfN);
        else if (m < 0.56) c = P.alfO;
        else c = ((x >> 2) + (y >> 1)) % 5 === 0 ? P.alfRS : ((x + y * 3) % 11 === 0 ? P.alfO : P.alfR); }
      B[y * 320 + x] = c; } }
  for (let x = 25; x < 212; x += 2) pset(x, 173, P.alfC);
  // ── la librería alta de la izquierda
  rect(2, 16, 58, 132, P.nogalD); rect(3, 17, 57, 21, P.nogal); rect(3, 17, 57, 17, P.nogalL); rect(3, 22, 57, 22, P.nogalD);
  rect(3, 23, 6, 131, P.nogal); rect(4, 23, 4, 131, P.nogalL); rect(54, 23, 57, 131, P.nogalS);
  const baldas = [[24, 40], [43, 60], [63, 80], [83, 100], [103, 122]];
  for (const [y0, y1] of baldas) { rect(7, y0, 53, y1, P.hueco); rect(7, y0, 53, y0, P.oscuro); rect(7, y1 + 1, 53, y1 + 2, P.nogal); rect(7, y1 + 1, 53, y1 + 1, P.nogalL); }
  rect(3, 125, 57, 131, P.nogal); rect(8, 126, 52, 130, P.nogalS);   // el zócalo
  e_libros(R, 8, 52, 40, 15, 1, [[38, 'arena']]);
  e_libros(R, 8, 52, 60, 16, 2, [[8, 'tumbados']]);
  e_libros(R, 8, 52, 80, 16, 3, [[36, 'astrolabio'], [8, 'vela']]);
  e_libros(R, 8, 52, 100, 16, 4, [[30, 'rollos']]);
  e_libros(R, 8, 52, 122, 18, 5, [[40, 'tarro']]);
  // el globo: el trípode y el meridiano de latón (la esfera gira en lo vivo)
  for (const [ex, ey] of [[63, 146], [81, 146], [72, 148]]) { linea(72, 124, ex, ey, P.nogalD); linea(72, 125, ex + (ex < 72 ? 1 : ex > 72 ? -1 : 0), ey, P.nogal); }
  rect(70, 122, 74, 125, P.nogalS); rect(71, 122, 73, 122, P.nogalL);
  // la ventana: el marco, el alféizar y el banco con cojines (la noche y los parteluces van en lo vivo)
  rect(92, 18, 156, 92, P.nogalD); rect(93, 19, 155, 21, P.nogal); rect(93, 19, 155, 19, P.nogalL); rect(93, 22, 95, 91, P.nogal); rect(153, 22, 155, 91, P.nogalS);
  rect(88, 89, 160, 94, P.nogal); rect(88, 89, 160, 89, P.nogalL); rect(88, 94, 160, 95, P.nogalD);
  rect(90, 104, 158, 132, P.nogalD); rect(91, 111, 157, 131, P.nogal); for (const px of [92, 114, 136]) { rect(px + 2, 114, px + 19, 128, P.nogalM); rect(px + 2, 114, px + 19, 114, P.nogalD); rect(px + 2, 128, px + 19, 128, P.nogalL); }
  rect(90, 104, 158, 110, P.cojin); rect(90, 104, 158, 104, e_mez(P.cojin, P.crema, 0.3)); rect(90, 110, 158, 110, P.cojinS); for (let x = 98; x < 156; x += 12) pset(x, 107, P.cojinS);
  for (const [cx, c] of [[100, P.terciop], [147, P.alfO]]) { disco(cx, 100, 6, P.oscuro); disco(cx, 100, 5, c); disco(cx - 2, 98, 2, e_mez(c, P.crema, 0.35)); pset(cx, 100, P.oscuro); }
  for (const [i, c] of [[0, P.verdeS], [1, P.rojoT], [2, P.azulA]]) { rect(118, 101 - i * 3, 134 - i * 2, 103 - i * 3, P.oscuro); rect(119, 101 - i * 3, 133 - i * 2, 102 - i * 3, c); rect(130 - i * 2, 101 - i * 3, 133 - i * 2, 102 - i * 3, P.perg); }
  // ── la chimenea de piedra: la repisa, el friso con dentículos, los sillares, la boca con su arco y el hogar
  rect(162, 81, 220, 86, P.nogalD); rect(163, 82, 219, 84, P.nogal); rect(163, 82, 219, 82, P.nogalL);
  rect(166, 87, 216, 132, P.piedra);
  for (let y = 87; y < 132; y++) for (let x = 166; x <= 216; x++) { const f = Math.floor((y - 87) / 9), jx = (x - 166 + (f & 1) * 6) % 12;
    if ((y - 87) % 9 === 8 || jx === 11) B[y * 320 + x] = P.piedraD; else if ((y - 87) % 9 === 0 || jx === 0) B[y * 320 + x] = P.piedraL; else if (h(x, y, 506) < 0.1) B[y * 320 + x] = P.piedraS; }
  rect(166, 87, 216, 92, P.piedraS); for (let x = 167; x < 216; x += 4) rect(x, 88, x + 1, 90, P.piedraL);
  rect(166, 87, 167, 132, P.piedraL); rect(215, 87, 216, 132, P.piedraD);
  for (let y = 99; y <= 132; y++) for (let x = 176; x <= 206; x++) { const dx = x - 191, top = 113 - Math.sqrt(Math.max(0, 15 * 15 - dx * dx)); if (y < top - 1) continue;
    const borde = y < top + 1 || x === 176 || x === 206;
    B[y * 320 + x] = borde ? P.piedraD : y < top + 3 ? P.oscuro : (((y - 100) % 5 === 4) || ((x + (Math.floor((y - 100) / 5) & 1) * 4) % 8 === 0)) ? P.ladrilloS : P.ladrillo; }
  rect(180, 129, 202, 132, P.oscuro); for (let x = 181; x < 202; x += 3) rect(x, 126, x, 131, hex('#1a1414'));   // la cesta de hierro
  for (const [x0, x1, y] of [[180, 198, 124], [185, 203, 121]]) { rect(x0, y, x1, y + 3, hex('#3a2416')); rect(x0, y, x1, y, hex('#5a3a22')); disco(x1, y + 1.5, 2, hex('#8a6a44')); pset(x1, y + 1, hex('#6a4a2a')); }
  rect(160, 132, 222, 138, P.piedraS); rect(160, 132, 222, 132, P.piedraL); rect(160, 138, 222, 138, P.piedraD);   // el hogar
  // los atizadores
  linea(161, 112, 161, 136, P.oscuro); for (const dx of [-2, 0, 2]) linea(161, 114, 161 + dx, 135, hex('#2a2a32')); rect(159, 111, 163, 112, P.laton); rect(158, 136, 164, 137, P.latonS);
  // la repisa: candeleros (las llamas, en lo vivo), reloj de arena, catalejo y tarro con flores secas
  for (const cx of [167, 215]) { rect(cx - 2, 79, cx + 2, 81, P.laton); rect(cx - 1, 72, cx + 1, 78, P.laton); pset(cx - 1, 73, P.oroL); rect(cx - 1, 66, cx + 1, 71, P.crema); pset(cx + 1, 67, P.pergS); }
  rect(178, 72, 184, 73, P.nogal); rect(178, 80, 184, 81, P.nogal); for (let j = 0; j < 6; j++) { const w = Math.abs(j - 2.5) < 1 ? 0 : Math.round(Math.abs(j - 2.5)); rect(181 - w, 74 + j, 181 + w, 74 + j, j > 3 ? P.alfO : e_mez(P.crema, P.cieloD, 0.4)); } rect(178, 73, 178, 80, P.nogalS); rect(184, 73, 184, 80, P.nogalS);
  rect(188, 77, 198, 79, P.laton); rect(188, 77, 198, 77, P.oroL); rect(196, 76, 199, 80, P.latonS);
  rect(203, 74, 209, 81, P.oscuro); rect(204, 75, 208, 81, hex('#4a6a7a')); pset(205, 76, P.crema);
  for (let k = 0; k < 5; k++) { const a = -2.2 + k * 0.32; for (let d = 2; d < 8; d++) pset(Math.round(206 + Math.cos(a) * d * 0.8), Math.round(74 + Math.sin(a) * d), k % 2 ? hex('#8a6a3a') : hex('#a8885a')); pset(Math.round(206 + Math.cos(a) * 6.4), Math.round(74 + Math.sin(a) * 8), [P.terciopL, P.alfO, P.crema][k % 3]); }
  // la carta de la rueda de estrellas enmarcada, encima de la repisa
  rect(172, 28, 210, 72, P.oscuro); rect(173, 29, 209, 71, P.laton); rect(173, 29, 209, 29, P.oroL); rect(209, 29, 209, 71, P.latonS); rect(173, 71, 209, 71, P.latonS); rect(175, 31, 207, 69, P.latonS);
  rect(176, 32, 206, 68, P.perg);
  for (let y = 32; y <= 68; y++) for (let x = 176; x <= 206; x++) { const m = h(x >> 1, y >> 1, 507); if (m < 0.1 || x === 176 || y === 68) pset(x, y, P.pergS); else if (m > 0.97) pset(x, y, P.pergD); }
  { const cx = 191, cy = 50; for (const [r, c] of [[15, P.tinta], [11, P.tinta], [6, P.tinta]]) for (let a = 0; a < 6.29; a += 0.05) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), c);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; linea(Math.round(cx + Math.cos(a) * 6), Math.round(cy + Math.sin(a) * 6), Math.round(cx + Math.cos(a) * 11), Math.round(cy + Math.sin(a) * 11), P.pergD);
      const am = a + Math.PI / 12; pset(Math.round(cx + Math.cos(am) * 8.5), Math.round(cy + Math.sin(am) * 8.5), k % 3 ? P.azul : P.rojoT); pset(Math.round(cx + Math.cos(am) * 13), Math.round(cy + Math.sin(am) * 13), P.tinta); }
    disco(cx, cy, 4, P.oroS); disco(cx, cy, 3, P.alfO); disco(cx - 1, cy - 1, 1, P.oroL);
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), P.alfO); } }
  // la lámina de la planta, a la derecha
  rect(228, 42, 262, 82, P.oscuro); rect(229, 43, 261, 81, P.nogal); rect(229, 43, 261, 43, P.nogalL); rect(231, 45, 259, 79, P.perg);
  for (let y = 45; y <= 79; y++) for (let x = 231; x <= 259; x++) if (h(x >> 1, y >> 1, 508) < 0.08) pset(x, y, P.pergS);
  { const bx = 245; disco(bx, 70, 4, hex('#8a5a3a')); disco(bx - 1, 69, 2, hex('#a8784a')); for (const [dx, dy] of [[-7, 6], [-3, 8], [3, 8], [7, 6]]) linea(bx, 72, bx + dx, 72 + dy, hex('#6a4024'));
    for (let y = 50; y < 66; y++) pset(bx + Math.round(Math.sin(y * 0.5) * 1.2), y, P.verdeS);
    for (const [y, d] of [[62, -1], [58, 1], [54, -1]]) { disco(bx + d * 5, y, 3, P.verdeS); disco(bx + d * 5, y - 1, 2, P.verde); linea(bx, y + 1, bx + d * 5, y, P.verdeS); }
    disco(bx, 48, 3, hex('#b84a6a')); disco(bx, 48, 1, P.alfO);
    for (let k = 0; k < 3; k++) e_signos(R, 233, 75 + (k % 2) * 0, 4 + k, 600 + k, P.tinta, 233 + k * 9); }
  // el reloj de péndulo de pared: la caja, la esfera y la puerta de cristal (el péndulo y las agujas, en lo vivo)
  rect(289, 51, 311, 111, P.oscuro); rect(290, 52, 310, 110, P.nogal); rect(290, 52, 310, 52, P.nogalL); rect(309, 53, 310, 110, P.nogalS);
  poligono([[292, 52], [300, 47], [308, 52]], P.nogalS); pset(300, 47, P.laton);
  disco(300, 63, 9, P.latonS); disco(300, 63, 8, P.crema); disco(301, 64, 7, e_mez(P.crema, P.pergS, 0.4)); disco(300, 63, 7, P.crema);
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(300 + Math.cos(a) * 6), Math.round(63 + Math.sin(a) * 6), k % 3 ? P.pergD : P.tinta); }
  rect(293, 75, 307, 106, P.oscuro); rect(294, 76, 306, 105, hex('#1a1210')); rect(294, 76, 294, 105, P.nogalD);
  for (let k = 0; k < 6; k++) pset(296 + k, 78 + k * 3, hex('#3a3040'));
  // la sombra de la mesa en la tarima (la mesa la pinta hoyDelante) y la del globo
  for (let y = 156; y <= 161; y++) for (let x = 216; x < 320; x++) if (e_umbral(x, y) < 0.75 - (y - 156) * 0.12) B[y * 320 + x] = e_mez(B[y * 320 + x], P.oscuro, 0.5);
  for (let y = 145; y <= 149; y++) for (let x = 60; x <= 85; x++) if (((x - 72) / 13) ** 2 + ((y - 147) / 2.5) ** 2 < 1) B[y * 320 + x] = e_mez(B[y * 320 + x], P.oscuro, 0.45);
  // la luz: el fuego y la lámpara alumbran; lo lejano se queda en penumbra (tramado en cuatro niveles), con un tinte cálido junto al fuego
  e_alumbra(R, (x, y) => { const f = Math.max(0, 1 - Math.hypot((x - 191) * 0.9, (y - 118) * 1.1) / 150), l = Math.max(0, 1 - Math.hypot(x - 306, (y - 116) * 1.2) / 100), v = Math.max(0, 1 - Math.hypot(x - 124, (y - 70) * 1.3) / 70);
    return [0.16 + f * 1.05 + l * 0.75 + v * 0.3, f]; });
}

// pasa la luz por la capa fija: lum(x, y) → [luz, calor]; oscurece en niveles tramados hacia e_P.oscuro y calienta lo de cerca del fuego
function e_alumbra(R, lum, tinte = e_P.calido) {
  const B = R.buf;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const [l, f] = lum(x, y), d = Math.max(0, Math.min(1, (0.85 - l) / 0.7)), n = Math.min(3, Math.floor(d * 3 + e_umbral(x, y) * 0.95));
    let c = B[y * 320 + x]; if (n > 0) c = e_mez(c, e_P.oscuro, [0, 0.24, 0.42, 0.58][n]);
    if (f > 0.35 && e_umbral(x, y) < (f - 0.35) * 1.6) c = e_mez(c, tinte, 0.14);
    B[y * 320 + x] = c;
  }
}

// una balda de libros antiguos (x0–x1, pie en yb, alto máximo al), con piel, nervios y tejuelos dorados; extras: [[x, tipo]]
// con 'arena' (reloj de arena), 'tumbados' (un montón tumbado), 'astrolabio', 'vela' (el candelero; la llama va en lo vivo),
// 'rollos' (pergaminos enrollados) y 'tarro' (un tarro con una planta en espiral)
function e_libros(R, x0, x1, yb, al, sem, extras = []) {
  const { rect, pset, disco, linea } = R, P = e_P;
  const pieles = [hex('#6a2a20'), hex('#3a4a2a'), hex('#5a3a1e'), hex('#2a3448'), hex('#7a5a2a'), hex('#4a1e24'), hex('#8a6a3a'), hex('#3a2a40')];
  const ocupado = (x) => extras.some(([ex, tp]) => x >= ex - 1 && x <= ex + (tp === 'tumbados' ? 14 : tp === 'astrolabio' || tp === 'rollos' ? 12 : 8));
  let x = x0;
  for (let k = 0; x < x1 - 2; k++) {
    if (ocupado(x)) { x++; continue; }
    const w = 3 + Math.floor(h(k, sem, 510) * 3), hh = al - 4 + Math.floor(h(k, sem, 511) * 5), c = pieles[Math.floor(h(k, sem, 512) * 8)];
    if (x + w > x1 || ocupado(x + w)) { x++; continue; }
    if (h(k, sem, 513) < 0.1 && !ocupado(x + w + 4)) {   // un libro inclinado
      for (let j = 0; j < hh; j++) { const dx = Math.round(j * 0.3); rect(x + dx, yb - j, x + dx + w - 1, yb - j, j === hh - 1 ? P.oscuro : c); pset(x + dx, yb - j, P.oscuro); }
      x += w + 5; continue; }
    rect(x, yb - hh, x + w - 1, yb, P.oscuro); rect(x + 1, yb - hh + 1, x + w - 1, yb, c);
    rect(x + 1, yb - hh + 1, x + 1, yb, e_mez(c, P.crema, 0.25));
    for (const j of [3, hh - 4]) rect(x + 1, yb - j, x + w - 1, yb - j, P.oro);
    if (hh > 12) { rect(x + 1, yb - Math.round(hh / 2) - 1, x + w - 1, yb - Math.round(hh / 2), e_mez(c, P.oscuro, 0.45)); pset(x + 2, yb - Math.round(hh / 2) - 1, P.oroS); }
    x += w + (h(k, sem, 514) < 0.15 ? 1 : 0);
  }
  for (const [ex, tp] of extras) {
    if (tp === 'arena') { rect(ex, yb - 11, ex + 6, yb - 10, P.nogal); rect(ex, yb - 1, ex + 6, yb, P.nogal); for (let j = 0; j < 8; j++) { const w = Math.round(Math.abs(j - 3.5) * 0.8); rect(ex + 3 - w, yb - 9 + j, ex + 3 + w, yb - 9 + j, j > 4 ? P.alfO : hex('#4a5068')); } rect(ex, yb - 10, ex, yb - 1, P.nogalS); rect(ex + 6, yb - 10, ex + 6, yb - 1, P.nogalS); }
    if (tp === 'tumbados') for (let i = 0; i < 4; i++) { const c = pieles[(i * 3 + sem) % 8]; rect(ex, yb - 3 - i * 3, ex + 13 - (i % 2) * 2, yb - i * 3, P.oscuro); rect(ex + 1, yb - 2 - i * 3, ex + 12 - (i % 2) * 2, yb - i * 3, c); rect(ex + 9 - (i % 2) * 2, yb - 2 - i * 3, ex + 12 - (i % 2) * 2, yb - 1 - i * 3, P.perg); }
    if (tp === 'astrolabio') { const cx = ex + 6, cy = yb - 7; disco(cx, cy, 6, P.latonS); disco(cx, cy, 5, P.laton); disco(cx, cy, 3, P.latonS); for (let k = 0; k < 6; k++) { const a = k * 1.047; linea(cx, cy, Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), P.oroS); } pset(cx - 2, cy - 4, P.oroL); rect(cx - 1, yb - 1, cx + 1, yb, P.latonS); }
    if (tp === 'vela') { rect(ex, yb - 1, ex + 4, yb, P.laton); rect(ex + 1, yb - 8, ex + 3, yb - 2, P.crema); pset(ex + 3, yb - 7, P.pergS); }
    if (tp === 'rollos') for (let i = 0; i < 3; i++) { const yy = yb - 2 - i * 4 + (i === 2 ? 2 : 0), xx = ex + (i === 2 ? 3 : 0); rect(xx, yy - 2, xx + 10, yy, P.perg); rect(xx, yy, xx + 10, yy, P.pergS); disco(xx, yy - 1, 1.5, P.pergD); pset(xx, yy - 1, P.tinta); }
    if (tp === 'tarro') { rect(ex, yb - 11, ex + 7, yb, P.oscuro); rect(ex + 1, yb - 10, ex + 6, yb, hex('#3a5a5a')); rect(ex + 1, yb - 12, ex + 6, yb - 11, P.laton); rect(ex + 1, yb - 10, ex + 1, yb - 1, hex('#6a9a9a'));
      for (let j = 0; j < 7; j++) pset(ex + 3 + Math.round(Math.sin(j * 1.3) * 1.5), yb - 2 - j, P.verde); pset(ex + 4, yb - 9, P.verde); }
  }
}

// una fila de n signos inventados del libro (no son letras: ganchos, bucles, horcas y colas de 3 × 4), con la semilla sem;
// xMin recorta por la izquierda (para no pisar el marco). Devuelve dónde acaba la fila
const e_GLIFOS = [['##.', '#.#', '.##', '..#'], ['.#.', '###', '.#.', '#.#'], ['#.#', '.#.', '#.#', '##.'], ['.##', '#.#', '.#.', '#..'], ['#..', '###', '#.#', '.##'], ['###', '#.#', '#.#', '#.#'], ['.#.', '#.#', '##.', '.##']];

function e_signos(R, x, y, n, sem, c, xMin = -1, xMax = 999, esc = 1) {
  for (let k = 0; k < n; k++) { const g = e_GLIFOS[Math.floor(h(k, sem, 520) * e_GLIFOS.length)];
    for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') { const px = x + i * esc, py = y + j * esc; if (px >= xMin && px + esc - 1 <= xMax) R.rect(px, py, px + esc - 1, py + esc - 1, c); }
    x += (4 + (h(k, sem, 521) < 0.25 ? 2 : 0)) * esc; }
  return x;
}

function e_estudioVivo(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P, B = R.buf;
  // la noche por la ventana, recortada al cristal
  e_noche(R, t, 96, 22, 152, 88);
  // los parteluces, la cruceta y los brillos del cristal
  rect(123, 22, 125, 88, P.nogal); rect(123, 22, 123, 88, P.nogalL); rect(96, 44, 152, 45, P.nogal); rect(96, 66, 152, 67, P.nogal); rect(96, 44, 152, 44, P.nogalL); rect(96, 66, 152, 66, P.nogalL);
  for (const [x0, y0] of [[100, 40], [128, 62], [104, 84]]) for (let i = 0; i < 7; i++) if ((i + Math.floor(t * 0.5)) % 9 !== 0) pset(x0 + i, y0 - i, hex('#4a5480'));
  // el gato en el alféizar, de espaldas mirando la noche, con la cola que se mueve
  { const gx = 110, gy = 89, g = hex('#1c1820'), gL = hex('#3a3440');
    disco(gx, gy - 6, 5, g); rect(gx - 5, gy - 6, gx + 5, gy - 1, g); disco(gx, gy - 13, 3.5, g); poligono([[gx - 4, gy - 15], [gx - 3, gy - 20], [gx - 1, gy - 16]], g); poligono([[gx + 1, gy - 16], [gx + 3, gy - 20], [gx + 4, gy - 15]], g);
    pset(gx - 3, gy - 18, hex('#5a3a40')); pset(gx + 3, gy - 18, hex('#5a3a40')); linea(gx - 4, gy - 7, gx - 4, gy - 2, gL); pset(gx - 3, gy - 11, gL);
    for (let j = -16; j <= -1; j++) for (let i = -6; i <= 6; i++) { const x = gx + i, y = gy + j; if (R.pget(x, y) === g && R.pget(x, y - 1) !== g && R.pget(x - 1, y) !== g) pset(x, y, hex('#6a6488')); }   // el contorno que le pinta la luna
    const mv = Math.sin(t * 2.1); let px = gx + 5, py = gy - 2; for (let i = 0; i < 9; i++) { const nx = px + 1, ny = py + (i < 4 ? 0 : -1) + Math.round(mv * (i > 4 ? 0.8 : 0)); linea(px, py, nx, ny, g); pset(nx, ny + 1, g); px = nx; py = ny; } }
  // las cortinas de terciopelo en su barra, con pliegues que ondean y el alzapaños
  // la galería de madera oscura que tapa la barra (tranquila: queda debajo del año)
  rect(80, 15, 168, 21, P.nogalD); rect(81, 16, 167, 19, P.nogalS); rect(81, 20, 167, 20, P.nogal); for (let x = 84; x < 166; x += 6) pset(x, 18, P.nogalM);
  for (let y = 22; y < 106; y++) { const ata = Math.max(0, 1 - Math.abs(y - 80) / 22), ond = Math.sin(t * 0.8 + y * 0.07) * 1.2;
    for (const [xa, dir] of [[84, 1], [164, -1]]) { const w = Math.round(13 - ata * 5 + (y > 80 ? (y - 80) * 0.15 : 0) + ond * (dir > 0 ? 1 : -0.6));
      for (let i = 0; i <= w; i++) { const x = xa + dir * (i - 2), f = (i + Math.round(ond)) % 5; pset(x, y, i === w ? P.oscuro : f === 0 ? P.terciopL : f === 3 ? P.terciopS : P.terciop); } } }
  for (const x of [86, 162]) { rect(x - 3, 79, x + 3, 81, P.alfO); pset(x, 82, P.alfO); pset(x, 83, P.oroS); }
  // el fuego: llamas que suben y tiemblan, brasas que laten y chispas
  for (let x = 180; x <= 202; x++) { const c0 = 1 - Math.abs(x - 191) / 13, al = Math.max(2, Math.round((7 + 10 * c0) * (0.75 + 0.25 * Math.sin(t * 7 + x * 0.9) + 0.15 * Math.sin(t * 13.1 + x * 1.7))));
    for (let j = 0; j < al; j++) { const y = 125 - j, f = j / al, w = Math.sin(t * 9 + j * 0.7 + x) * 0.6; const xx = Math.round(x + w * f * 2); if (y < 102) break;
      pset(xx, y, f < 0.25 ? P.fuegoA : f < 0.5 ? P.fuegoB : f < 0.8 ? P.fuegoC : P.fuegoD); } }
  for (let x = 181; x < 202; x += 2) if (Math.sin(t * 5 + x * 2.3) > 0) pset(x, 128, P.brasa); else pset(x, 128, P.fuegoD);
  for (let k = 0; k < 4; k++) { const ph = (t * 0.7 + k * 0.27) % 1, sx = Math.round(186 + h(k, Math.floor(t * 0.7 + k * 0.27), 530) * 12 + Math.sin(ph * 9) * 2), sy = Math.round(118 - ph * 22); if (sy > 101) pset(sx, sy, ph < 0.5 ? P.fuegoA : P.fuegoC); }
  { const fl = 0.08 + 0.06 * Math.sin(t * 6.3) + 0.04 * Math.sin(t * 11); for (let y = 132; y <= 140; y++) for (let x = 168; x <= 214; x++) if (((x + y) & 1) === 0 && e_umbral(x, y) < 0.6 - (y - 132) * 0.06) B[y * 320 + x] = e_mez(B[y * 320 + x], P.fuegoB, fl); }
  // las llamas de las velas (repisa y librería)
  for (const [cx, cy, k] of [[167, 65, 0], [215, 65, 1], [10, 71, 2]]) { const dx = Math.round(Math.sin(t * 5 + k * 2) * 0.6); pset(cx + dx, cy, P.fuegoB); pset(cx + dx, cy - 1, P.fuegoA); if (Math.sin(t * 7 + k) > -0.3) pset(cx + dx, cy - 2, P.fuegoC); pset(cx, cy + 1, P.oscuro); }
  // el globo terráqueo que gira despacio, con la luz del fuego por la derecha
  { const cx = 72, cy = 110, r = 9, gira = t * 0.5;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d2 = i * i + j * j; if (d2 > r * r) continue; const z = Math.sqrt(r * r - d2), lon = Math.atan2(i, z) + gira, lat = j / r;
      const tierra = Math.sin(lon * 2 + lat * 2.2) + Math.sin(lon * 3.3 - lat * 3.1 + 1) * 0.7 > 0.55, luz = (i * 0.6 - j * 0.3 + z * 0.5) / r;
      let c = tierra ? (luz > 0.35 ? hex('#b8a06a') : hex('#8a7448')) : (luz > 0.35 ? hex('#4a7aa8') : hex('#2e5a86')); if (luz < -0.05) c = e_mez(c, P.oscuro, 0.4); pset(cx + i, cy + j, c); }
    for (let a = -1.4; a < 2.3; a += 0.06) pset(Math.round(cx + Math.cos(a) * 11), Math.round(cy + Math.sin(a) * 11), a < 0.2 ? P.oroL : P.laton);
    pset(cx + 3, cy - 5, P.crema); pset(cx, cy - 12, P.laton); pset(cx, cy + 12, P.latonS); }
  // el reloj: el péndulo que oscila y las agujas que avanzan
  { const a = Math.sin(t * Math.PI) * 0.32, px = Math.round(300 + Math.sin(a) * 22), py = Math.round(78 + Math.cos(a) * 22); linea(300, 77, px, py - 3, P.laton); disco(px, py - 2, 2.5, P.laton); pset(px - 1, py - 3, P.oroL);
    const m = t * 0.1 - 1.2, hh = -2.4; linea(300, 63, Math.round(300 + Math.cos(m) * 6), Math.round(63 + Math.sin(m) * 6), P.tinta); linea(300, 63, Math.round(300 + Math.cos(hh) * 4), Math.round(63 + Math.sin(hh) * 4), P.tinta); pset(300, 63, P.laton); }
  // el brillo que recorre el cristal de la carta
  { const g = ((t * 0.35) % 2.2) * 40 - 10; for (let y = 32; y <= 68; y++) { const x = Math.round(176 + g - (y - 32) * 0.4); if (x >= 176 && x <= 206 && (y & 1)) pset(x, y, e_mez(R.pget(x, y), P.crema, 0.5)); } }
  // el rayo de luna en la tarima y motas en la luz de la lámpara
  for (let y = 133; y <= 150; y++) { const d = Math.round((y - 133) * 1.2), a0 = 100 + d, a1 = 140 + d; for (let x = a0; x <= a1; x++) if (e_umbral(x, y) < 0.32 - (y - 133) * 0.012) B[y * 320 + x] = e_mez(B[y * 320 + x], P.frio, 0.22); }
  for (let k = 0; k < 10; k++) { const x = Math.round(282 + h(k, 1, 531) * 34 + Math.sin(t * 0.6 + k) * 3), y = Math.round(100 + ((h(k, 2, 531) * 34 + t * (1.2 + h(k, 3, 531))) % 34)); if (Math.sin(t * 1.4 + k * 2) > -0.1 && y > 52) pset(x, y, hex('#f8e6b0')); }
  return { suelo: 162, sueloMin: 140, sueloMax: 176, libre: [8, 214], mesa: { x0: 220, x1: 318, tablero: 137, frente: [141, 158] }, maceta: [246, 138, 2],
    ventana: [96, 22, 152, 88], gato: [110, 89], chimenea: [176, 99, 206, 132], hogar: [160, 132, 222, 138], globo: [72, 110, 9], reloj: [300, 63], libreria: [2, 16, 58, 132], carta: [172, 28, 210, 72], libro: [280, 138] };
}

// la noche de la ventana (cristal x0–x1, y0–y1, recortada): cielo tramado, estrellas que titilan, la luna, nubes de tres
// tonos a tres velocidades, tejados y una torre con ventanas que se encienden, chimeneas que humean, una rama que se mece y
// un murciélago que cruza
function e_noche(R, t, x0, y0, x1, y1) {
  const { pset, disco, linea } = R, P = e_P, B = R.buf, al = y1 - y0;
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) { const p = (y - y0) / al; for (let x = x0; x <= x1; x++) { const u = e_umbral(x, y);
    B[y * 320 + x] = p < 0.3 ? (u < p * 1.2 ? P.cieloB : P.cieloA) : p < 0.62 ? (u < (p - 0.3) * 3 ? P.cieloC : P.cieloB) : (u < (p - 0.62) * 2.6 ? P.cieloD : P.cieloC); } }
  for (let k = 0; k < 22; k++) { const x = x0 + Math.round(h(k, 1, 540) * (x1 - x0)), y = y0 + Math.round(h(k, 2, 540) * al * 0.6), tw = Math.sin(t * (1.2 + h(k, 3, 540) * 2.5) + k * 2.1); if (tw > -0.3) pset(x, y, tw > 0.6 ? hex('#ffffff') : hex('#a8b0d8')); if (tw > 0.92) { pset(x - 1, y, hex('#6a74a8')); pset(x + 1, y, hex('#6a74a8')); } }
  // la luna con sus mares y el halo
  { const mx = x0 + 12, my = y0 + 11; for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) { const d = Math.hypot(i, j); if (d > 6 && d < 9 && e_umbral(mx + i, my + j) < (9 - d) / 8) pset(mx + i, my + j, P.cieloD); }
    disco(mx, my, 6, P.lunaS); disco(mx - 1, my - 1, 5, P.luna); pset(mx + 1, my + 1, P.lunaS); disco(mx - 2, my + 1, 1, P.lunaS); pset(mx + 2, my - 2, P.lunaS); }
  // las nubes: tres capas a tres velocidades, cada una con sombra, cuerpo y luz
  for (const [vel, yy, w, sem] of [[1.1, y0 + 14, 22, 0], [2.0, y0 + 26, 16, 1], [3.2, y0 + 8, 12, 2]]) {
    const span = x1 - x0 + 50, cx = x0 - 25 + ((h(sem, 4, 541) * span + t * vel) % span), cy = yy;
    for (const [dx, dy, r] of [[-w * 0.35, 1, w * 0.22], [0, -1, w * 0.3], [w * 0.35, 0.5, w * 0.24]]) disco(cx + dx, cy + dy + 1, r, P.nubeS);
    for (const [dx, dy, r] of [[-w * 0.35, 1, w * 0.22], [0, -1, w * 0.3], [w * 0.35, 0.5, w * 0.24]]) disco(cx + dx, cy + dy, r * 0.9, P.nubeM);
    for (const [dx, dy, r] of [[-w * 0.35, 1, w * 0.22], [0, -1, w * 0.3]]) disco(cx + dx - 1, cy + dy - 1, r * 0.5, P.nubeL);
  }
  // los tejados, la torre, las ventanas encendidas y el humo de las chimeneas
  const tej = [[x0, 72, 14], [x0 + 12, 69, 12], [x0 + 22, 75, 10], [x0 + 30, 67, 14], [x0 + 42, 71, 16]];
  for (const [tx, ty, tw] of tej) { for (let y = ty; y <= y1; y++) for (let x = tx; x < tx + tw; x++) pset(x, y, y < ty + Math.abs(x - tx - tw / 2) * 0.6 - 3 ? P.cieloC : P.tejado); }
  for (const [tx, ty, tw] of tej) for (let i = 0; i < 2; i++) { const wx = tx + 3 + i * 5, wy = ty + 6, on = h(tx, i + Math.floor(t / 4 + tx * 0.1) * 3, 542) < 0.5; if (wx < tx + tw - 2) { pset(wx, wy, on ? P.ventanaL : P.tejadoS); pset(wx + 1, wy, on ? P.ventanaL : P.tejadoS); pset(wx, wy + 1, on ? hex('#c89040') : P.tejadoS); pset(wx + 1, wy + 1, on ? hex('#c89040') : P.tejadoS); } }
  { const tx = x0 + 36; for (let y = 52; y <= 68; y++) for (let x = tx - 3; x <= tx + 3; x++) pset(x, y, P.tejado); for (let j = 0; j < 9; j++) linea(tx - Math.floor(j / 3), 43 + j, tx + Math.floor(j / 3), 43 + j, P.tejado); pset(tx, 42, P.tejado); pset(tx, 41, Math.floor(t * 1.1) % 2 ? hex('#e04040') : hex('#4a2a2a')); pset(tx + 1, 58, P.ventanaL); pset(tx + 1, 59, hex('#c89040')); }
  for (const [cx, cy, k] of [[x0 + 18, 65, 0], [x0 + 50, 67, 1]]) { pset(cx, cy, P.tejado); pset(cx, cy + 1, P.tejado); pset(cx + 1, cy, P.tejado); pset(cx + 1, cy + 1, P.tejado);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6 + k * 0.3) % 1, sx = Math.round(cx + ph * 8 + Math.sin(ph * 6 + k) * 1.5), sy = Math.round(cy - 1 - ph * 14); pset(sx, sy, ph < 0.5 ? hex('#5a6080') : hex('#3e4466')); } }
  // la rama del árbol que entra por la derecha, con hojas que se mecen
  { const m = Math.sin(t * 0.9) * 1.5, rx = x1, ry = y0 + 40; linea(rx, ry, rx - 14, Math.round(ry - 6 + m * 0.5), hex('#0c0e18')); linea(rx, ry + 1, rx - 13, Math.round(ry - 5 + m * 0.5), hex('#0c0e18'));
    for (let k = 0; k < 7; k++) { const lx = Math.round(rx - 2 - k * 2 + Math.sin(t * 1.5 + k) * 0.8), ly = Math.round(ry - 3 - k * 0.6 + m * (k / 7) + (k % 2 ? 2 : -1)); pset(lx, ly, hex('#141a26')); pset(lx - 1, ly, hex('#141a26')); pset(lx, ly + 1, hex('#1a2030')); } }
  // el murciélago que cruza de vez en cuando
  { const u = (t % 9) / 9, bx = Math.round(x1 + 6 - u * (x1 - x0 + 14)), by = Math.round(y0 + 30 + Math.sin(u * 14) * 4), al2 = Math.floor(t * 8) % 2; if (u < 0.6) { pset(bx, by, hex('#05060a')); pset(bx - 1, by - al2, hex('#05060a')); pset(bx + 1, by - al2, hex('#05060a')); pset(bx - 2, by - 1 + al2, hex('#05060a')); pset(bx + 2, by - 1 + al2, hex('#05060a')); } }
  R.recorte(null);
}

// la mesa del estudio, por delante de los personajes: el tablero de nogal con su veta y el canto, los dos cajoneros con
// tiradores de latón y el hueco de las piernas; encima, la maceta de la planta imposible (x 246, sobre y 138, escala 2),
// el libro abierto (x 280) y la lámpara de banquero verde (x 306) con su charco de luz
function e_escritorio(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, B = R.buf;
  rect(220, 135, 319, 158, P.oscuro);
  rect(221, 136, 319, 138, P.tablaL); for (let k = 0; k < 7; k++) { const x0 = 224 + Math.round(h(k, 1, 550) * 80); rect(x0, 136 + (k % 3), Math.min(319, x0 + 8 + Math.round(h(k, 2, 550) * 16)), 136 + (k % 3), P.tabla); }
  rect(221, 139, 319, 140, P.nogalL); rect(221, 141, 319, 141, P.nogalD);
  // el charco de luz de la lámpara sobre el tablero
  for (let y = 136; y <= 138; y++) for (let x = 284; x <= 319; x++) if (e_umbral(x, y) < 0.7 - Math.abs(x - 306) / 30) B[y * 320 + x] = e_mez(B[y * 320 + x], hex('#f8d890'), 0.35);
  // los cajoneros y el hueco
  for (const [a, b] of [[222, 252], [286, 319]]) { rect(a, 142, b, 157, P.nogal); rect(a, 142, a, 157, P.nogalL);
    for (const [y0, y1] of [[143, 149], [151, 156]]) { rect(a + 2, y0, b - 2, y1, P.nogalM); rect(a + 2, y0, b - 2, y0, P.nogalD); rect(a + 2, y1, b - 2, y1, P.nogalL); const cx = Math.round((a + b) / 2); rect(cx - 2, Math.round((y0 + y1) / 2), cx + 2, Math.round((y0 + y1) / 2), P.laton); pset(cx - 2, Math.round((y0 + y1) / 2), P.oroL); } }
  rect(253, 142, 285, 154, hex('#120a06')); rect(253, 142, 285, 143, P.oscuro); rect(253, 155, 285, 157, P.nogalS);
  rect(222, 158, 319, 158, P.nogalD);
  // el libro abierto (el facsímil) y la lámpara de banquero
  if (o.libro !== false && PIEZAS_VM.libroVoynich) PIEZAS_VM.libroVoynich(R, 279, 138, { abierto: true, pagina: o.pagina ?? 'planta', t });
  rect(298, 135, 314, 137, P.latonS); rect(299, 134, 313, 135, P.laton); rect(305, 118, 307, 133, P.laton); rect(305, 118, 305, 133, P.oroL);
  for (let j = 0; j < 8; j++) { const w = 8 + Math.round(j * 0.6); rect(306 - w, 111 + j, 306 + w, 111 + j, j === 7 ? P.oscuro : j < 2 ? hex('#3a9a5a') : hex('#1e6a3a')); }
  rect(298, 119, 314, 119, hex('#f8e8a0')); pset(312, 121, P.laton); linea(312, 121, 312, 125, P.laton); disco(312, 126, 1, P.oroL);
  // la maceta con la planta imposible
  if (o.maceta !== false && PIEZAS_VM.plantaImposible) PIEZAS_VM.plantaImposible(R, 246, 138, { s: 2, crece: o.crece ?? 1, flor: !!o.flor, t });
  return { mesa: { x0: 220, x1: 319, tablero: 137, frente: [141, 158] }, maceta: [246, 138, 2], libro: [279, 138], lampara: [306, 111] };
}

function e_pantallaFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = e_P, B = R.buf;
  // el panelado de madera oscura, en tablas verticales con su veta, la cornisa y el rodapié
  rect(0, 0, 319, 3, P.cornisa); rect(0, 4, 319, 4, P.cornisaL); rect(0, 5, 319, 5, P.nogalD);
  for (let y = 6; y < 142; y++) for (let x = 0; x < 320; x++) { const j = x % 14; let c = j === 0 ? P.pared2S : j === 1 ? P.pared2L : P.pared2;
    if (j > 1 && h(x, y >> 2, 560) < 0.13) c = e_mez(c, P.pared2S, 0.6); if (y % 46 === 5 && j > 1) c = P.pared2S; B[y * 320 + x] = c; }
  rect(0, 138, 319, 138, P.nogalL); rect(0, 139, 319, 141, P.nogalS); rect(0, 142, 319, 145, P.nogalD);
  // la tarima en espiga
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const col = Math.floor(x / 10), i = x % 10, s = col & 1 ? i : 9 - i, id = Math.floor((y * 2 + s) / 7), k = h(col, id, 561);
    let c = k < 0.33 ? P.tabla : k < 0.66 ? P.tablaS : P.tablaL; if ((y * 2 + s) % 7 === 0 || i === 0) c = P.tablaD; else if (h(x, y, 562) < 0.07) c = e_mez(c, P.tablaD, 0.5); B[y * 320 + x] = c; }
  // la alfombra azul ovalada con su greca crema
  for (let y = 152; y < 180; y++) for (let x = 40; x < 280; x++) { const d = ((x - 160) / 118) ** 2 + ((y - 168) / 15) ** 2; if (d >= 1) continue;
    B[y * 320 + x] = d > 0.86 ? P.crema : d > 0.78 ? ((x + y) % 4 ? P.azulAS : P.alfO) : d > 0.7 ? P.crema : (((x >> 2) + (y >> 1)) % 6 === 0 ? P.azul : (x + y * 2) % 13 === 0 ? P.crema : P.azulA); }
  // la librería de la izquierda, entera
  rect(0, 16, 52, 146, P.nogalD); rect(0, 17, 51, 21, P.nogal); rect(0, 17, 51, 17, P.nogalL); rect(48, 22, 51, 146, P.nogalS);
  for (const [y0, y1] of [[24, 42], [45, 64], [67, 86], [89, 108], [111, 130]]) { rect(2, y0, 47, y1, P.hueco); rect(2, y1 + 1, 47, y1 + 2, P.nogal); rect(2, y1 + 1, 47, y1 + 1, P.nogalL); }
  rect(0, 133, 51, 146, P.nogal); rect(4, 135, 46, 144, P.nogalS);
  e_libros(R, 2, 47, 42, 16, 11, [[30, 'arena']]); e_libros(R, 2, 47, 64, 17, 12); e_libros(R, 2, 47, 86, 17, 13, [[4, 'tumbados']]); e_libros(R, 2, 47, 108, 17, 14, [[32, 'tarro']]); e_libros(R, 2, 47, 130, 17, 15, [[6, 'rollos']]);
  // la librería de la derecha, desde y 52 (la esquina de Atom queda tranquila); la balda alta guarda el planetario
  rect(250, 52, 319, 146, P.nogalD); rect(251, 53, 319, 57, P.nogal); rect(251, 53, 319, 53, P.nogalL); rect(251, 58, 254, 146, P.nogal); rect(251, 58, 251, 146, P.nogalL);
  for (const [y0, y1] of [[60, 80], [83, 102], [105, 124]]) { rect(255, y0, 319, y1, P.hueco); rect(255, y1 + 1, 319, y1 + 2, P.nogal); rect(255, y1 + 1, 319, y1 + 1, P.nogalL); }
  rect(251, 127, 319, 146, P.nogal); rect(256, 130, 286, 143, P.nogalS); rect(290, 130, 319, 143, P.nogalS); rect(270, 136, 272, 137, P.laton); rect(304, 136, 306, 137, P.laton);
  e_libros(R, 255, 286, 80, 17, 16); e_libros(R, 255, 319, 102, 16, 17, [[290, 'astrolabio']]); e_libros(R, 255, 319, 124, 17, 18, [[300, 'tumbados']]);
  rect(288, 79, 312, 80, P.latonS);   // la peana del planetario
  // los dos apliques (las pantallitas encendidas)
  for (const cx of [57, 244]) { rect(cx - 1, 54, cx + 1, 62, P.laton); rect(cx - 3, 62, cx + 3, 63, P.latonS); for (let j = 0; j < 6; j++) rect(cx - 2 - (j >> 1), 46 + j, cx + 2 + (j >> 1), 46 + j, j < 2 ? hex('#fff0c0') : hex('#f0d090')); rect(cx - 4, 51, cx + 4, 51, hex('#c8a060')); }
  // el aparador bajo: el tablero, cuatro puertas con cuarterones y tiradores, las patas
  rect(64, 127, 236, 147, P.oscuro); rect(65, 128, 235, 130, P.tablaL); rect(65, 128, 235, 128, hex('#a8703c')); rect(65, 131, 235, 131, P.nogalD);
  rect(65, 132, 235, 146, P.nogal);
  for (let k = 0; k < 4; k++) { const a = 67 + k * 42, b = a + 39; rect(a, 133, b, 145, P.nogalS); rect(a + 3, 135, b - 3, 143, P.nogalM); rect(a + 3, 135, b - 3, 135, P.nogalD); rect(a + 3, 143, b - 3, 143, P.nogalL); pset(k % 2 ? a + 2 : b - 2, 139, P.oroL); pset(k % 2 ? a + 2 : b - 2, 140, P.laton); }
  for (const x of [66, 233]) rect(x, 147, x + 2, 150, P.nogalD);
  // en el aparador: los altavoces, el escáner de libros (la cuna en V con el libro, el brazo y la cámara) y una pila de libros
  for (const x of [68, 224]) { rect(x, 112, x + 9, 127, P.oscuro); rect(x + 1, 113, x + 8, 126, hex('#2a2a32')); disco(x + 4.5, 117, 2.5, hex('#18181e')); disco(x + 4.5, 117, 1, hex('#4a4a56')); disco(x + 4.5, 123, 2, hex('#18181e')); pset(x + 4, 122, hex('#4a4a56')); }
  rect(88, 125, 136, 127, hex('#2a2e36')); rect(88, 125, 136, 125, hex('#4a4e5a'));
  poligono([[90, 118], [111, 124], [111, 125], [90, 121]], P.pergD); poligono([[134, 118], [113, 124], [113, 125], [134, 121]], P.pergD);
  poligono([[91, 117], [111, 123], [91, 120]], P.perg); poligono([[133, 117], [113, 123], [133, 120]], P.perg); rect(111, 122, 113, 125, P.tinta);
  for (let k = 0; k < 4; k++) { linea(94 + k * 4, 118 + k, 96 + k * 4, 119 + k, P.tinta); linea(118 + k * 4, 121 - k, 120 + k * 4, 120 - k, P.tinta); }
  rect(137, 112, 139, 126, hex('#3a3e48')); rect(112, 111, 139, 113, hex('#3a3e48')); rect(112, 111, 139, 111, hex('#5a5e6a')); rect(108, 110, 116, 115, P.oscuro); rect(109, 111, 115, 114, hex('#2a2e36')); disco(112, 115, 1, hex('#5a7aa0'));
  for (let i = 0; i < 4; i++) { const c = [hex('#6a2a20'), hex('#2a3448'), hex('#3a4a2a'), hex('#7a5a2a')][i]; rect(180 - i, 124 - i * 3, 206 - i * 2, 127 - i * 3, P.oscuro); rect(181 - i, 125 - i * 3, 205 - i * 2, 127 - i * 3, c); rect(200 - i * 2, 125 - i * 3, 205 - i * 2, 126 - i * 3, P.perg); }
  disco(192, 108, 3, P.latonS); disco(192, 108, 2, hex('#c8e0f0')); linea(194, 110, 198, 114, P.nogalD);   // la lupa encima de la pila
  rect(212, 120, 219, 127, P.oscuro); rect(213, 121, 218, 127, P.crema); rect(219, 122, 220, 125, P.oscuro); rect(213, 121, 218, 121, hex('#5a3a2a'));   // la taza
  // la peana de la maceta: tablero, columna torneada y pie
  rect(261, 123, 285, 127, P.oscuro); rect(262, 124, 284, 126, P.tablaL); rect(262, 124, 284, 124, hex('#a8703c'));
  for (let y = 128; y < 150; y++) { const w = 5 + (y > 145 ? 2 : 0) + ((y - 128) % 7 === 0 ? 2 : 0); rect(273 - w, y, 273 + w, y, P.nogal); pset(273 - w, y, P.nogalL); pset(273 + w, y, P.nogalD); }
  rect(263, 150, 283, 153, P.nogalD); rect(264, 150, 282, 150, P.nogal);
  // las sombras del aparador y de la peana en la tarima
  for (let y = 147; y <= 152; y++) for (let x = 62; x <= 240; x++) if (e_umbral(x, y) < 0.8 - (y - 147) * 0.15) B[y * 320 + x] = e_mez(B[y * 320 + x], P.oscuro, 0.45);
  // la luz: la pantalla baña la sala de azul; los apliques ponen dos manchas cálidas
  e_alumbra(R, (x, y) => { const s = Math.max(0, 1 - Math.hypot((x - 150) * 0.72, (y - 70)) / 128), a = Math.max(0, 1 - Math.hypot(x - 57, (y - 52) * 1.2) / 48), b = Math.max(0, 1 - Math.hypot(x - 244, (y - 52) * 1.2) / 48);
    return [0.18 + s * 0.85 + (a + b) * 0.5, s * 0.9]; }, P.frio);
  // el marco negro de la pantalla, colgado (con su sombra en el panelado)
  rect(64, 20, 238, 114, P.oscuro); rect(62, 18, 236, 112, hex('#0c0c12')); rect(62, 18, 236, 18, hex('#3a3a48')); rect(62, 18, 62, 112, hex('#2a2a36'));
  rect(146, 112, 152, 113, hex('#1a1a22'));
}

function e_pantallaVivo(R, t, o) {
  const { rect, pset, disco, linea } = R, P = e_P, B = R.buf;
  const X0 = 66, Y0 = 22, X1 = 232, Y1 = 108, paso = o.pasa ?? 3;
  const hojas = ['planta', 'estrellas', 'estanques', 'tarros'], i0 = Math.max(0, hojas.indexOf(o.pagina ?? 'planta'));
  const n = paso > 0 ? Math.floor(t / paso) : 0, fase = paso > 0 ? (t % paso) / paso : 0, gira = paso > 0 && fase > 0.72 ? (fase - 0.72) / 0.28 : -1;
  // el fondo de la interfaz, con su rejilla tenue y la barra de arriba (iconos, sin letras)
  rect(X0, Y0, X1, Y1, P.ui); for (let y = Y0 + 10; y < Y1; y += 6) for (let x = X0 + 2; x < X1; x += 6) pset(x, y, P.uiB);
  rect(X0, Y0, X1, Y0 + 7, P.uiB); rect(X0, Y0 + 8, X1, Y0 + 8, P.uiL);
  for (let k = 0; k < 3; k++) disco(X0 + 4 + k * 5, Y0 + 3.5, 1.5, [hex('#c85a5a'), hex('#d8b04a'), hex('#5aa86a')][k]);
  if (o.modo === 'ia') e_pantallaIA(R, t, o, X0, Y0, X1, Y1, hojas, i0);
  else {
    R.icono('lupa', X0 + 20, Y0, P.uiT, P.uiB); R.icono('libro', X0 + 30, Y0, P.uiT, P.uiB);
    // las miniaturas que suben al pasar las hojas, con la actual en oro
    R.recorte([X0 + 2, Y0 + 10, X0 + 19, Y1 - 2]);
    const sube = (n + Math.max(0, gira)) * 16;
    for (let k = -1; k < 7; k++) { const yy = Math.round(Y0 + 12 + k * 16 - (sube % 16)), idx = n + k - 1 + Math.floor(Math.max(0, gira)), tp = hojas[((idx + i0) % 4 + 4) % 4];
      for (let y = yy; y < yy + 13; y++) for (let x = X0 + 4; x <= X0 + 17; x++) pset(x, y, (y === yy || x === X0 + 4) ? P.pergS : P.perg);
      const cc = tp === 'planta' ? P.verde : tp === 'estrellas' ? P.alfO : tp === 'estanques' ? P.azul : hex('#a86a3a'); disco(X0 + 10, yy + 6, 3, cc); for (let j = 0; j < 3; j++) linea(X0 + 13, yy + 3 + j * 3, X0 + 16, yy + 3 + j * 3, P.pergD);
      if (idx === n + (gira >= 0.5 ? 1 : 0)) for (let y = yy - 1; y <= yy + 13; y++) { pset(X0 + 3, y, P.oroL); pset(X0 + 18, y, P.oroL); } }
    R.recorte(null);
    // el pliego escaneado: la hoja izquierda y la derecha, con el lomo en sombra
    const L = [X0 + 26, Y0 + 12, X0 + 94, Y1 - 10], D = [X0 + 96, Y0 + 12, X1 - 4, Y1 - 10];
    const izq = hojas[(n + i0) % 4], der = gira >= 0 ? hojas[(n + 1 + i0) % 4] : hojas[(n + i0 + 2) % 4];
    e_hoja(R, L, izq, n * 2, 1); e_hoja(R, D, gira >= 0 ? hojas[(n + i0 + 3) % 4] : der, n * 2 + 1, -1);
    if (gira >= 0) {   // la hoja que pasa: se levanta, se estrecha hacia el lomo y cae del otro lado
      const lomo = X0 + 95, ce = Math.cos(Math.PI * gira), xe = Math.round(lomo + ce * 68), lev = Math.round(Math.sin(Math.PI * gira) * 6);
      const a = Math.min(lomo, xe), b = Math.max(lomo, xe);
      for (let x = a; x <= b; x++) { const f = Math.abs(x - lomo) / 68, ya = Math.round(D[1] - lev * f), yb = Math.round(D[3] - lev * f * 0.3);
        for (let y = ya; y <= yb; y++) pset(x, y, x === xe ? P.pergD : gira < 0.5 ? e_mez(P.perg, P.pergS, f * 0.5) : e_mez(P.perg, P.pergD, (1 - f) * 0.35)); }
      if (b - a > 6) for (let k = 0; k < 6; k++) { const y = D[1] + 8 + k * 7; linea(a + 3, y, b - 3, y, P.pergD); }
    }
    // la lupa que recorre la página derecha y agranda los signos
    if (o.lupa !== false) { const lx = Math.round(D[0] + 34 + Math.sin(t * 0.7) * 20), ly = Math.round(D[1] + 30 + Math.sin(t * 0.43 + 1) * 16);
      R.recorte([lx - 9, ly - 9, lx + 9, ly + 9]); for (let j = -9; j <= 9; j++) for (let i = -9; i <= 9; i++) if (i * i + j * j <= 81) pset(lx + i, ly + j, P.perg);
      e_signos(R, lx - 9 - ((lx * 2) % 8), ly - 6, 4, n * 7 + 1, P.tinta, lx - 9, lx + 9, 2); e_signos(R, lx - 12 + ((ly * 2) % 6), ly + 3, 4, n * 7 + 2, P.tinta, lx - 9, lx + 9, 2); R.recorte(null);
      for (let a = 0; a < 6.29; a += 0.05) { pset(Math.round(lx + Math.cos(a) * 10), Math.round(ly + Math.sin(a) * 10), P.uiT); pset(Math.round(lx + Math.cos(a) * 11), Math.round(ly + Math.sin(a) * 11), P.ui); }
      linea(lx + 8, ly + 8, lx + 13, ly + 13, P.uiT); linea(lx + 9, ly + 8, lx + 14, ly + 13, P.uiL); pset(lx - 5, ly - 6, hex('#ffffff')); }
    // la barra de avance de abajo, con su tirador
    rect(X0 + 26, Y1 - 5, X1 - 4, Y1 - 4, P.uiL); const av = Math.round(X0 + 26 + ((n + Math.max(0, gira)) * 6 % (X1 - X0 - 30))); rect(X0 + 26, Y1 - 5, av, Y1 - 4, P.uiT); disco(av, Y1 - 4.5, 2, hex('#e8f0f8'));
  }
  // el reflejo del cristal: una banda tenue en diagonal
  for (let y = Y0; y <= Y1; y++) for (let x = X0 + 104 - (y - Y0); x < X0 + 116 - (y - Y0); x++) if (x >= X0 && ((x + y) & 1) === 0) pset(x, y, e_mez(R.pget(x, y), hex('#ffffff'), 0.07));
  pset(226, 111, Math.floor(t * 0.8) % 3 ? hex('#5ad87a') : hex('#2a6a3a'));   // el piloto
  // el escáner del aparador: destella con cada hoja que pasa
  if (gira >= 0 && gira < 0.35 && o.modo !== 'ia') { for (let y = 116; y <= 124; y++) { const w = Math.round((y - 115) * 1.7); for (let x = 112 - w; x <= 112 + w; x++) if (((x + y) & 1) === 0) pset(x, y, e_mez(R.pget(x, y), hex('#fffbe8'), 0.45)); } pset(112, 115, hex('#ffffff')); }
  else pset(112, 115, Math.floor(t * 2) % 2 ? hex('#5a8aff') : hex('#2a3a6a'));
  // el planetario de latón de la balda alta: los planetas dan vueltas alrededor del sol
  { const cx = 300, cy = 70; linea(cx, cy + 3, cx, 79, P.latonS); disco(cx, cy, 2, hex('#f0c040')); pset(cx - 1, cy - 1, hex('#fff0a0'));
    for (const [r, v, c] of [[5, 1.3, hex('#a8a8b8')], [8, 0.8, hex('#5a8ad8')], [11, 0.5, hex('#d86a4a')]]) { const a = t * v + r; for (let k = 0; k < 24; k++) if (k % 3 === 0) pset(Math.round(cx + Math.cos(k * 0.2618) * r), Math.round(cy + Math.sin(k * 0.2618) * r * 0.35), P.latonS);
      const px = Math.round(cx + Math.cos(a) * r), py = Math.round(cy + Math.sin(a) * r * 0.35); disco(px, py, 1, c); } }
  // el robot aspirador que va y viene por la tarima (por detrás de los personajes)
  if (o.aspira !== false) { const per = 22, u = (t % per) / per, ida = u < 0.5, f = ida ? u * 2 : (1 - u) * 2, rx = Math.round(84 + Math.min(1, Math.max(0, f * 1.08 - 0.04)) * 140), ry = 154;
    for (let j = -3; j <= 3; j++) for (let i = -8; i <= 8; i++) if ((i / 8.5) ** 2 + (j / 3.5) ** 2 < 1) pset(rx + i, ry + j, j < -1 ? hex('#5a5e6a') : j < 2 ? hex('#3a3e48') : hex('#1e2028'));
    rect(rx - 7, ry - 1, rx + 7, ry - 1, hex('#2a2c34')); pset(rx + (ida ? 3 : -3), ry - 2, Math.floor(t * 3) % 2 ? hex('#5ad8ff') : hex('#2a6a8a')); pset(rx + (ida ? 7 : -7), ry, hex('#8a8e9a')); }
  // motas en la luz de la pantalla
  for (let k = 0; k < 10; k++) { const x = Math.round(80 + h(k, 1, 563) * 150 + Math.sin(t * 0.5 + k) * 4), y = Math.round(114 + ((h(k, 2, 563) * 30 + t * (1 + h(k, 3, 563))) % 30)); if (Math.sin(t * 1.3 + k * 2) > 0) pset(x, y, hex('#a8c8e8')); }
  // la maceta en su peana
  if (o.maceta !== false && PIEZAS_VM.plantaImposible) PIEZAS_VM.plantaImposible(R, 273, 124, { s: 2, crece: o.crece ?? 1, flor: !!o.flor, t });
  return { suelo: 164, sueloMin: 152, sueloMax: 176, libre: [56, 254], pantalla: [X0, Y0, X1, Y1], aparador: { x0: 64, x1: 236, tablero: 128, pie: 150 }, escaner: [112, 122],
    maceta: [273, 124, 2], peana: [262, 124, 284, 153], hoja: gira, pagina: n, libreriaIzq: [0, 16, 52, 146], libreriaDer: [250, 52, 319, 146], planetario: [300, 70] };
}

// una hoja del libro escaneado en la pantalla (caja [x0, y0, x1, y1]): pergamino con manchas y borde gastado, el dibujo
// del tipo y los renglones de signos; lado 1 izquierda (lomo a la derecha), -1 derecha
function e_hoja(R, [x0, y0, x1, y1], tipo, sem, lado) {
  const { pset, disco, linea } = R, P = e_P, lomo = lado > 0 ? x1 : x0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const m = h(x >> 1, (y >> 1) + sem * 31, 570), dl = Math.abs(x - lomo);
    let c = m < 0.08 ? P.pergS : P.perg; if (dl < 5 && e_umbral(x, y) < (5 - dl) / 5) c = P.pergD; if (y === y0 || y === y1 || x === (lado > 0 ? x0 : x1)) c = P.pergS; pset(x, y, c); }
  const w = x1 - x0, hh = y1 - y0, cx = Math.round(x0 + w / 2 - lado * 2), cy = y0 + Math.round(hh * 0.38);
  if (tipo === 'planta') { disco(cx, cy + 14, 5, hex('#8a5a3a')); disco(cx - 1, cy + 13, 3, hex('#a8784a')); for (const [dx, dy] of [[-9, 6], [-4, 8], [4, 8], [9, 6]]) linea(cx, cy + 16, cx + dx, cy + 16 + dy, hex('#6a4024'));
    for (let y = cy - 12; y < cy + 10; y++) pset(cx + Math.round(Math.sin(y * 0.4) * 1.5), y, P.verdeS);
    for (const [y, d] of [[cy + 5, -1], [cy, 1], [cy - 5, -1], [cy - 9, 1]]) { disco(cx + d * 7, y, 3.5, P.verdeS); disco(cx + d * 7, y - 1, 2.5, P.verde); linea(cx, y + 1, cx + d * 7, y, P.verdeS); }
    disco(cx, cy - 15, 3.5, hex('#3a5aa8')); disco(cx, cy - 15, 1.5, hex('#c84a5a')); }
  if (tipo === 'estrellas') { for (const r of [16, 11, 5]) for (let a = 0; a < 6.29; a += 0.05) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + 2 + Math.sin(a) * r), P.tinta);
    for (let k = 0; k < 12; k++) { const a = k * 0.5236; linea(Math.round(cx + Math.cos(a) * 5), Math.round(cy + 2 + Math.sin(a) * 5), Math.round(cx + Math.cos(a) * 11), Math.round(cy + 2 + Math.sin(a) * 11), P.pergD); const am = a + 0.26; disco(Math.round(cx + Math.cos(am) * 13.5), Math.round(cy + 2 + Math.sin(am) * 13.5), 1, k % 2 ? P.alfO : P.azul); }
    disco(cx, cy + 2, 4, P.alfO); disco(cx - 1, cy + 1, 1, P.oroL); }
  if (tipo === 'estanques') { for (const [px, py, rx] of [[-10, 2, 9], [8, -4, 8], [2, 12, 12]]) for (let j = -4; j <= 4; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / 4.5) ** 2 < 1) pset(cx + px + i, cy + py + j, j < -2 ? hex('#6ab0a0') : (i + j) % 5 === 0 ? hex('#8ac8b8') : hex('#4a9a8a'));
    linea(cx - 2, cy + 2, cx + 3, cy - 3, hex('#4a9a8a')); linea(cx + 6, cy + 1, cx + 4, cy + 8, hex('#4a9a8a'));
    for (const [px, py] of [[-13, 0], [-8, 1], [6, -6], [10, -5], [0, 10], [5, 11]]) { pset(cx + px, cy + py, hex('#e8b890')); pset(cx + px, cy + py - 1, hex('#e8b890')); pset(cx + px, cy + py - 2, hex('#5a3a24')); } }
  if (tipo === 'tarros') for (let k = 0; k < 4; k++) { const tx = cx - 21 + k * 14, ty = cy - 6 + (k % 2) * 3, c = [hex('#c86a3a'), hex('#3a7ab8'), hex('#5a9a4a'), hex('#b8a040')][k];
    for (let y = ty; y < ty + 18; y++) for (let x = tx - 4; x <= tx + 4; x++) pset(x, y, x === tx - 4 || x === tx + 4 ? P.tinta : (x + y) % 4 === 0 ? e_mez(c, P.crema, 0.3) : c);
    linea(tx - 5, ty - 1, tx + 5, ty - 1, P.tinta); linea(tx - 3, ty - 2, tx + 3, ty - 2, P.alfO); pset(tx, ty - 4, P.verde); pset(tx - 1, ty - 3, P.verde); pset(tx + 1, ty - 5, P.verde); }
  // los renglones de signos inventados debajo del dibujo
  for (let r = 0; r < 4; r++) { const y = y0 + Math.round(hh * 0.72) + r * 5; if (y + 4 > y1 - 1) break; e_signos(R, x0 + 4 + (r === 0 ? 4 : 0), y, 14, sem * 13 + r, P.tinta, x0 + 2, x1 - 3); }
}

// la pantalla en modo 'ia': la página a la izquierda con la barra que la lee, flechas, y el panel de salida con las
// «palabras» (bloques de signos claros) que van saliendo; o.rechazo las tacha y pone el sello rojo
function e_pantallaIA(R, t, o, X0, Y0, X1, Y1, hojas, i0) {
  const { rect, pset, disco, linea } = R, P = e_P, col = o.tono === 'ambar' ? P.ambar : P.cian, rech = Math.max(0, Math.min(1, o.rechazo ?? 0));
  // el icono de la red (nodos unidos) en la barra de arriba
  for (const [a, b] of [[[X0 + 22, Y0 + 2], [X0 + 27, Y0 + 5]], [[X0 + 27, Y0 + 5], [X0 + 32, Y0 + 2]], [[X0 + 22, Y0 + 2], [X0 + 22, Y0 + 6]]]) linea(a[0], a[1], b[0], b[1], P.uiT);
  for (const [x, y] of [[X0 + 22, Y0 + 2], [X0 + 27, Y0 + 5], [X0 + 32, Y0 + 2], [X0 + 22, Y0 + 6]]) pset(x, y, col);
  // la página que se lee, con la barra que la recorre
  const pg = [X0 + 6, Y0 + 12, X0 + 66, Y1 - 4]; e_hoja(R, pg, hojas[i0], 3, -1);
  { const yb = pg[1] + 4 + Math.round(((t * 9) % (pg[3] - pg[1] - 8))); for (let y = yb; y <= yb + 2; y++) for (let x = pg[0] + 1; x < pg[2]; x++) if (((x + y) & 1) === 0) pset(x, y, e_mez(R.pget(x, y), col, 0.5)); linea(pg[0], yb + 1, pg[2], yb + 1, col); }
  // las flechas que corren de la página al panel
  for (let k = 0; k < 3; k++) { const x = X0 + 70 + ((Math.floor(t * 6) + k) % 3) * 4; linea(x, Y0 + 44, x + 2, Y0 + 47, k === 2 ? col : P.uiL); linea(x + 2, Y0 + 47, x, Y0 + 50, k === 2 ? col : P.uiL); }
  // el panel de salida: la rueda que piensa y las «palabras» que salen una a una
  const px0 = X0 + 84, px1 = X1 - 4, py0 = Y0 + 12, py1 = Y1 - 4, borde = rech >= 1 ? P.rojoNo : P.uiL;
  rect(px0, py0, px1, py1, borde); rect(px0 + 1, py0 + 1, px1 - 1, py1 - 1, hex('#0c141e')); rect(px0 + 1, py0 + 1, px1 - 1, py0 + 8, P.uiB);
  for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 4, c = k === 0 ? col : e_mez(col, P.ui, k / 8); pset(Math.round(px0 + 7 + Math.cos(a) * 3), Math.round(py0 + 5 + Math.sin(a) * 3), c); }
  rect(px0 + 14, py0 + 4, px0 + 14 + Math.round(((t * 0.3) % 1) * 40), py0 + 5, col);
  const filas = 8, p = o.ia ?? Math.max(0, Math.min(1, t / 6)), vistas = p * filas;
  for (let r = 0; r < filas; r++) { if (r > vistas) break; const y = py0 + 12 + r * 8, parcial = r + 1 > vistas ? vistas - r : 1; let x = px0 + 5; const fin = px0 + 5 + Math.round(parcial * (px1 - px0 - 22));
    for (let k = 0; x < fin; k++) { const L = 3 + Math.floor(h(r, k, 580) * 9); for (let i = 0; i < L && x + i < fin; i++) { pset(x + i, y, col); if ((i + k) % 3 !== 1) pset(x + i, y + 1, e_mez(col, P.ui, 0.35)); if ((i * 7 + r + k) % 5 === 0) pset(x + i, y - 1, col); } x += L + 3; }
    if (parcial < 1 && Math.floor(t * 4) % 2) rect(fin + 1, y - 1, fin + 3, y + 2, col);
    if (rech * filas > r && parcial >= 1) { linea(px0 + 4, y, fin, y, P.rojoNo); R.icono('X', px1 - 10, y - 2, P.rojoNo, hex('#3a0c0c')); } }
  if (rech >= 1) { const cx = Math.round((px0 + px1) / 2), cy = Math.round((py0 + py1) / 2) + 4; for (let a = 0; a < 6.29; a += 0.03) for (const r of [17, 18, 19]) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), P.rojoNo);
    for (let i = -13; i <= 13; i++) for (let w = -1; w <= 1; w++) pset(cx + i + w, cy - i, P.rojoNo); }
}

// el sillón de orejas de cuero, de espaldas, abajo a la izquierda (por delante de los personajes): el respaldo con sus
// tachuelas de latón, la oreja, el brazo enrollado y una manta de cuadros que cuelga y se mueve un poco
function e_sillon(R, t) {
  const { rect, pset, disco, poligono } = R, P = e_P, cu = hex('#6a2a1e'), cuS = hex('#4a1a12'), cuL = hex('#8a3e2a');
  poligono([[0, 132], [30, 128], [44, 136], [48, 180], [0, 180]], P.oscuro); poligono([[0, 134], [29, 130], [42, 137], [46, 180], [0, 180]], cu);
  for (let y = 134; y < 180; y++) for (let x = 0; x < 46; x++) { const c = R.pget(x, y); if (c !== cu) continue; if ((x + Math.floor(y / 6)) % 9 === 0) pset(x, y, cuS); else if (x > 36) pset(x, y, cuS); else if (x < 4 || (y - 134) % 12 === 0) pset(x, y, cuL); }
  for (let x = 2; x < 42; x += 4) disco(x, 137 + Math.round(x * 0.05), 0.8, P.laton);
  disco(48, 152, 8, P.oscuro); disco(48, 152, 7, cu); disco(47, 150, 4, cuL); disco(49, 153, 3, cuS); rect(40, 152, 54, 180, P.oscuro); rect(41, 153, 53, 180, cu); rect(51, 153, 53, 180, cuS);
  const m = Math.round(Math.sin(t * 0.7)); poligono([[8, 140], [28, 138], [30 + m, 168], [10 + m, 170]], hex('#2a3a5a'));
  for (let y = 139; y < 170; y++) for (let x = 8; x < 31 + m; x++) { const c = R.pget(x, y); if (c !== hex('#2a3a5a')) continue; if ((x + 2) % 6 === 0 || y % 6 === 0) pset(x, y, hex('#a83a2a')); else if ((x + y) % 2 === 0) pset(x, y, hex('#22304e')); }
  for (let x = 11 + m; x < 30 + m; x += 2) { pset(x, 171, hex('#c8b8a0')); pset(x, 172, hex('#a89880')); }
}

// la línea de la mesa de la copia: por encima, la pared y quien está detrás; desde PG_CMESA hacia abajo, lo que
// praguaDelante vuelve a pintar por delante de él (con los pies en 120 se le ven cabeza, hombros, manos y el pecho)
const PG_CMESA = 114;

// lo de la mesa de la copia que cambia: la hoja que se va llenando (o.copia 0–1; por omisión, con el tiempo) y la vela
// grande; la pintan pragua (todo) y praguaDelante (lo de delante); conHalo: false deja la luz de la vela sin repetir
function b_pgCopiaMesa(R, t, o, conHalo = true) {
  const { poligono } = R, K = C.k;
  const u = Math.max(0, Math.min(1, o.copia ?? ((t * 0.08) % 1)));
  b_pgSombraElipse(R, 206, 170, 32, 3, 0.65);
  poligono([[176, 128], [234, 127], [238, 168], [174, 168]], K); poligono([[177, 129], [233, 128], [236, 167], [175, 167]], hex('#ece2c8'));
  poligono([[177, 129], [182, 129], [180, 167], [175, 167]], hex('#e0d4b8')); poligono([[229, 128], [233, 128], [236, 167], [233, 167]], hex('#f6eedc'));
  const n = Math.floor(u * 7); for (let l = 0; l < n; l++) b_pgSignos(R, 182, 136 + l * 4.5 | 0, 46, 30 + l, C.tinta);
  if (n < 7) { const parte = Math.round((u * 7 - n) * 46); if (parte > 4) b_pgSignos(R, 182, 136 + n * 4.5 | 0, parte, 30 + n, C.tinta); }
  if (u > 0 && u < 1) { const yy = (136 + n * 4.5 | 0) + 1, xx = 182 + Math.round((u * 7 - n) * 46); if (Math.floor(t * 4) % 2) R.pset(xx + 1, yy, hex('#4a4a6a')); }
  if (conHalo) b_pgVela(R, 54, 140, t, 5, { alto: 22, radio: 30 });
  else { R.recorte([0, PG_CMESA, 319, 179]); b_pgVela(R, 54, 140, t, 5, { alto: 22, radio: 30 }); R.recorte(null); b_pgVela(R, 54, 140, t, 5, { alto: 22, halo: false }); }
}

// lo que completa el fondo fijo del laboratorio de Arizona: cada baldosa de resina con su tono, rozaduras y marcas de
// ruedas, la alfombrilla del banco, el cubo de residuos con su pedal, el taburete con ruedas, la bomba de vacío bajo el
// tanque (su piloto y su temblor van en vivo), el extintor en su pie, el enchufe del pasamanos y el trébol del suelo
// junto al rack
function d_radioMas(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // las baldosas: el mismo tablero en perspectiva que las juntas, cada una algo más clara u oscura
  const filas = [121, 131, 146, 168, 999];
  for (let y = 119; y < 180; y++) { const fy = filas.findIndex((v) => v > y), s = 22 + (y - 116) * 40 / 63;
    for (let x = 0; x < 320; x++) { const v = h(Math.floor((x - 160) / s + 100), fy, 207); if (v < 0.3) d_tine(R, x, y, D.sueloAJ, 0.4); else if (v > 0.72) d_tine(R, x, y, D.sueloAL, 0.5); } }
  // el suelo de delante, algo más en sombra (profundidad), y el brillo de los plafones en la resina, en bandas
  for (let y = 164; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) d_tine(R, x, y, C.k, (y - 164) * 0.012);
  for (let y = 124; y < 160; y += 3) for (let x = 168 + (y - 124); x < 214 + (y - 124) * 1.4; x++) if (h(x >> 1, y, 206) > 0.3) d_tine(R, x, y, C.blanco, 0.22);
  // rozaduras negras y las marcas de las ruedas de los carritos
  for (let k = 0; k < 26; k++) { const x = Math.floor(h(k, 1, 208) * 300) + 6, y = 124 + Math.floor(h(k, 2, 208) * 54), l = 2 + Math.floor(h(k, 3, 208) * 4); linea(x, y, x + l, y + (k % 3 === 0 ? 1 : 0), D.sueloAJ); }
  for (const yy of [156, 160]) for (let x = 20; x < 300; x += 1) if (h(x >> 2, yy, 209) > 0.35) d_tine(R, x, yy + Math.round(Math.sin(x * 0.02) * 2), D.sueloAJ, 0.35);
  // la alfombrilla de goma delante del banco, con sus tacos
  rect(4, 119, 92, 128, C.k); rect(5, 120, 91, 127, hex('#3a3e44')); rect(5, 120, 91, 120, hex('#5a6068')); rect(5, 127, 91, 127, hex('#24272c'));
  for (let y = 122; y < 127; y += 2) for (let x = 7 + ((y >> 1) % 2) * 2; x < 90; x += 4) { pset(x, y, hex('#24272c')); pset(x + 1, y, hex('#4a4e56')); }
  // el cubo de residuos con su pedal y la tapa naranja; el aviso en triángulo (sin letras)
  rect(12, 110, 28, 126, C.k); rect(13, 113, 27, 125, hex('#dcdee2')); rect(13, 113, 14, 125, C.blanco); rect(24, 113, 27, 125, hex('#aeb2ba'));
  rect(11, 109, 29, 112, C.k); rect(12, 110, 28, 111, hex('#e8902a')); rect(12, 110, 28, 110, hex('#ffc060'));
  poligono([[16, 122], [20, 115], [24, 122]], C.k); poligono([[17, 121], [20, 116], [23, 121]], C.amarillo); pset(20, 118, C.k); pset(20, 120, C.k);
  rect(14, 126, 19, 127, C.k); rect(15, 126, 18, 126, C.metalS);
  // el taburete con ruedas: asiento azul, columna con el aro de los pies y la estrella de cinco patas
  { const x = 66; rect(x - 8, 109, x + 8, 113, C.k); rect(x - 7, 110, x + 7, 111, hex('#3a6aa8')); rect(x - 7, 110, x + 7, 110, hex('#6a9ad8')); rect(x - 7, 112, x + 7, 112, hex('#28487a'));
    rect(x - 1, 114, x + 1, 122, C.k); pset(x, 115, C.metalL); pset(x, 117, C.metalL); rect(x - 5, 118, x + 5, 119, C.k); rect(x - 4, 118, x + 4, 118, C.metalL);
    for (const dx of [-8, -3, 3, 8]) { linea(x, 123, x + dx, 125, C.k); linea(x, 122, x + dx, 124, C.metalD); disco(x + dx, 126, 1, C.k); pset(x + dx, 125, C.metalS); } }
  // la bomba de vacío bajo el tanque, entre las patas: el motor de aletas, el cuerpo naranja, la manguera al tanque
  rect(158, 112, 196, 113, C.k);
  rect(160, 97, 194, 112, C.k); rect(161, 98, 193, 111, hex('#5a6270')); rect(161, 98, 193, 98, hex('#7a8494')); rect(161, 110, 193, 111, hex('#3e4450'));
  for (let x = 163; x < 176; x += 2) rect(x, 100, x, 108, hex('#3e4450'));
  rect(178, 100, 191, 108, C.k); rect(179, 101, 190, 107, hex('#e06a2a')); rect(179, 101, 190, 101, hex('#f0905a')); rect(188, 102, 190, 107, hex('#a8481a'));
  rect(181, 103, 186, 105, C.k); rect(182, 104, 185, 104, hex('#f0e8d8'));
  rect(184, 91, 186, 97, C.k); rect(185, 91, 185, 97, C.metalL);
  // el extintor en su pie, entre la pata y el detector, con la manguera y la etiqueta de rayas
  rect(224, 112, 238, 113, C.k); rect(227, 93, 233, 96, C.k); rect(228, 94, 232, 95, C.metalD); rect(230, 91, 235, 93, C.k);
  rect(226, 96, 234, 112, C.k); rect(227, 97, 233, 111, hex('#c83a2a')); rect(227, 97, 228, 111, hex('#e86a4a')); rect(232, 97, 233, 111, hex('#8a2a1e'));
  rect(227, 102, 233, 106, hex('#ece6da')); rect(228, 103, 231, 103, C.k); rect(228, 105, 232, 105, hex('#8a8478'));
  linea(234, 94, 238, 100, C.k); linea(238, 100, 237, 109, C.k); rect(236, 109, 238, 111, C.k);
  // el enchufe del pasamanos, bajo el tanque
  for (const x of [120]) { rect(x, 97, x + 6, 103, C.k); rect(x + 1, 98, x + 5, 102, C.blanco); pset(x + 2, 100, C.k); pset(x + 4, 100, C.k); }
  // el trébol pintado en el suelo, junto al rack (en perspectiva)
  for (let j = -3; j <= 3; j++) for (let i = -11; i <= 11; i++) if ((i / 11) ** 2 + (j / 3.4) ** 2 <= 1) pset(298 + i, 131 + j, Math.abs(i) > 9 || Math.abs(j) === 3 ? C.k : C.amarillo);
  for (const a of [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]) for (let r = 2; r <= 6; r++) for (let d = -0.45; d <= 0.45; d += 0.2) pset(Math.round(298 + Math.cos(a + d) * r * 1.3), Math.round(131 + Math.sin(a + d) * r * 0.42), C.k);
  pset(298, 131, C.k);
}

// lo que completa el fondo fijo del escriptorio: la piel del bastidor con sus poros y su borde más oscuro, la cuchilla
// de media luna colgada de su clavo, el cubo de cal de las pieles, la cesta de rollos en el suelo, manchas de tinta y una
// pluma caída en las baldosas, la sombra del armario y los clavos de las vigas
function d_escMas(R) {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 44; y < 99; y++) for (let x = 194; x < 237; x++) { const c = R.pget(x, y); if (c !== D.pergamino && c !== D.pergaminoL && c !== D.pergaminoS) continue;
    if (h(x, y, 291) < 0.035) pset(x, y, d_mez(D.pergamino, D.tinta, 0.25));
    const b = Math.min(x - 194, 236 - x, y - 43, 98 - y); if (b < 3 && (x + y) % 2 === 0) pset(x, y, D.pergaminoS); }
  // la cuchilla de media luna (lunellum) colgada de un clavo junto al bastidor
  pset(249, 46, C.k); rect(248, 47, 250, 54, C.k); rect(249, 47, 249, 54, D.vigaL);
  for (let a = 0.15; a <= Math.PI - 0.15; a += 0.08) { const x = Math.round(249 + Math.cos(a) * 6), y = Math.round(55 + Math.sin(a) * 5); pset(x, y, C.k); pset(x, y + 1, C.metalL); }
  rect(244, 55, 254, 55, C.k);
  // el cubo de cal (duelas, aros de hierro) entre el armario y la ventana, con su pala
  rect(79, 99, 93, 113, C.k); rect(80, 100, 92, 112, D.vigaL); for (let x = 82; x < 92; x += 3) rect(x, 100, x, 112, D.viga); rect(91, 100, 92, 112, D.vigaS);
  for (const y of [102, 109]) rect(79, y, 93, y, C.metalD); rect(80, 99, 92, 100, hex('#e8e6dc')); linea(88, 99, 92, 88, C.k); linea(89, 99, 93, 88, D.vigaL);
  // la cesta de mimbre con rollos, en el suelo delante del armario
  rect(38, 113, 60, 125, C.k); for (let y = 114; y < 125; y++) for (let x = 39; x < 60; x++) pset(x, y, ((x + (y >> 1)) % 3 === 0) ? hex('#8a6a3a') : (y % 2 ? hex('#c89a5a') : hex('#b0844a')));
  rect(38, 113, 60, 114, hex('#6a4a2a'));
  for (const [x, y, l] of [[36, 110, 18], [42, 106, 16], [40, 102, 20]]) { rect(x, y - 2, x + l, y + 2, C.k); rect(x, y - 1, x + l - 1, y + 1, D.pergamino); rect(x, y + 1, x + l - 1, y + 1, D.pergaminoS);
    disco(x + l, y, 2, C.k); disco(x + l, y, 1, D.pergaminoL); pset(x + l, y, D.pergaminoS); rect(x + 6, y - 2, x + 7, y + 2, C.rojo); }
  // manchas de tinta y una pluma caída en las baldosas; la sombra del armario sobre el suelo
  for (const [cx, cy, r] of [[118, 132, 3], [214, 126, 2], [292, 140, 2]]) for (let j = -r; j <= r; j++) for (let i = -r * 2; i <= r * 2; i++) if ((i / (2 * r)) ** 2 + (j / r) ** 2 <= 1 && h(i, j + cx, 292) > 0.2) d_tine(R, cx + i, cy + j, D.tinta, 0.55);
  linea(232, 130, 242, 127, C.blanco); linea(233, 131, 242, 128, hex('#c8c4bc')); pset(231, 131, C.k);
  for (let y = 114; y < 122; y++) for (let x = 4; x < 82 + (y - 114); x++) if ((x + y) % 2 === 0) d_tine(R, x, y, C.k, 0.2 * (1 - (y - 114) / 8));
  for (let x = 6; x < 320; x += 34) { pset(x + 3, 3, D.vigaL); pset(x + 3, 12, D.vigaL); }
}
