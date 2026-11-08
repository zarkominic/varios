// Fontanería y decorados del episodio 26 (Atari enterró sus juegos en el desierto) en el estilo canónico pixel chibi, al
// nivel de episodios/ESTANDAR.md. Decorados (guion.md): A Atari (un bar de 1972 con la máquina de Pong, un salón de 1977,
// las oficinas de 1982, el despacho del programador, la sala de juntas), B las tiendas (la juguetería de 1982 y de 1984,
// el almacén), M el mundo (el cine de 1982, una tienda de Tokio en 1983, un escaparate de Nueva York en 1985), C el
// desierto (el vertedero de Alamogordo en 1983 y en 2014, el pueblo de noche, la carpa de los arqueólogos) y E hoy (el
// estudio de Atom con el foso, la consulta del psicoterapeuta, la vitrina del museo).
// SIN E.T. NI LOGOS: los juegos son cartuchos genéricos con un icono pixel sin letras, y las pantallas, juegos inventados
// al estilo de la consola (fosos, un teléfono, flores). Los personajes son los de ELENCO_AT y PIEZAS_AT (pixel-chibi.js).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' por omisión y la otra que diga su cabecera), con el mismo detalle:
// dentro de una escena un encuadre no se repite. LO QUE VA DELANTE DE LOS PERSONAJES (mostradores, mesas, la barra del
// bar, vallas) va en su propia función <x>Delante, y la cabecera lo dice: «llama a <x>Delante después de los actores».
// La esquina de Atom (x 278–318, y 4–44), siempre tranquila, y la barra del tiempo (x 20–170, y 0–14), también.
//
//   import * as T from '/atomo/plato/escenas/at-comun.js';
//   const { E, R, M } = await T.preparar('at-gancho');
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
// las piezas del episodio (PIEZAS_AT: cartuchos genéricos, la consola vieja, la tele, el foso…), las crea el reparto
export const PIEZAS_AT = KIT.PIEZAS_AT || {};

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // los ochenta: madera de consola, negro, naranja y marrón de la época, el verde de los monitores
    maderaC: '#8a5a2a', maderaCS: '#5a3a1a', negroC: '#1a1a1e', naranja80: '#e07a2a', marron80: '#7a4a24', verdeMon: '#5adc5a',
    // el desierto: arena, matorral, cielo de Nuevo México, cemento
    arena: '#d8b47a', arenaS: '#a8844a', matorral: '#7a8a4a', cieloNM: '#5aa8e0', cemento: '#9a9a96', cementoS: '#6a6a66',
    // cartuchos y cajas
    carton: '#c8a06a', cartonS: '#8a6a3a', plastico: '#2a2a30',
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
  const E = await escena(id, 'ep26');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo: 1972 (Pong), 1982 (E.T. y el entierro), 1985 (la vuelta), 2014 (la excavación) y 2026
  Object.assign(R.ICONOS, {
    mando: ['...#...', '...#...', '..###..', '.#####.', '#######', '#######', '.......'],
    cartucho: ['#######', '#.....#', '#.###.#', '#.###.#', '#######', '.#.#.#.', '.......'],
    estrella: ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##', '.......'],
    pala: ['...#...', '...#...', '...#...', '..###..', '.#####.', '.#####.', '..###..'],
  });
  R.tramosTiempo([[1972, 1982, R.PALA.ORO, 'mando'], [1982, 1985, R.PALA.ROJO, 'cartucho'], [1985, 2014, R.PALA.AZUL ?? R.PALA.ROJO, 'estrella'], [2014, 2026, R.PALA.VERDE ?? R.PALA.ORO, 'pala']]);
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







// ── A · Atari ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara: 'general' por omisión o la segunda de cada uno). Devuelve la geometría del encuadre ({ suelo, … }).
//   'bar72' (suelo 152): un bar de California en 1972, de anochecer. Techo de vigas oscuras, papel pintado granate con
//     rombos, friso de tablas con vetas y suelo de baldosas a cuadros en perspectiva con reflejos de los neones. A la
//     izquierda la ventana a la calle (x 16–72, y 34–96: cielo de atardecer tramado con nubes de tres tonos, un diner con
//     ventanas encendidas, palmeras que se mecen, un coche de época y un paseante que pasan, recortados al hueco; persiana
//     y un neón de copa en el cristal) y debajo el reservado de vinilo rojo con dos parroquianos pequeños que beben y el
//     humo de un cenicero. La máquina de Pong de madera (x 88–128, y 84–142; pantalla x 95–121, y 97–113 con las dos palas,
//     la pelota que rebota y el marcador en cifras), un póster de surf, el botellero con espejo, estantes de botellas y la
//     caja registradora, tres neones sin letras (estrella, copa, rayo) que parpadean, la gramola (x 266–306, y 86–142) con
//     tubos de colores y burbujas, dos lámparas colgantes y un ventilador de techo que gira. La barra (x 146–320, tablero
//     y 131–138) y dos taburetes (x 176 y 306) van en atariDelante; el camarero va detrás de la barra con el suelo en 140
//     (x 160–220 o 248–300: en 229–242 están los grifos), y los jugadores del Pong, delante, a los lados de la máquina.
//     Cámara 'pantalla': la pantalla de la máquina de cerca (CRT x 56–264, y 26–118 con barrido y reflejo): las dos palas,
//     la pelota que rebota con estela y el marcador en cifras (o.marcador [a, b] lo fija; si no, cuenta solo); debajo el
//     panel con los dos mandos que giran con las palas (centros 100,150 y 220,150), la ranura de monedas encendida, una
//     pila de monedas y una cerveza que suda. o.vel: velocidad de la pelota (0,55).
//   'salon77' (suelo 154): un salón de 1977: techo de gotelé, papel pintado marrón de rayas con flores, friso de madera,
//     moqueta naranja de pelo largo, estantería de discos, la tele de madera de pie (pantalla x 49–87, y 93–121) con la
//     consola (PIEZAS_AT.consolaVieja) encima y sus cables, una planta y una foto; la lámpara de lava con sus burbujas, un
//     cuadro de un velero, una maceta de macramé, la ventana con cortinas a una calle de suburbio (x 160–232, y 26–90:
//     casas, un árbol, un coche y un niño en bici que pasan), el sofá de pana verde (x 140–272) con cojines y un gato que
//     respira dormido en el brazo, el reloj de sol en la pared y una lámpara de pie. o.pantalla(R, t, [x0, y0, x1, y1])
//     pinta dentro de la tele (si no, un juego inventado de naves); o.cartucho (color) y o.palancas, los de la consola.
//     La mesita con cartuchos y mandos (x 136–244, tablero y 160) va en atariDelante.
//     Cámara 'tele': la tele de cerca (pantalla x 52–188, y 34–122) con o.pantalla, el dial de canales y el volumen, la
//     rejilla del altavoz, y en la moqueta la consola grande con cartucho, los dos mandos con sus cables y cartuchos.
//   'oficinas' (suelo 150): las oficinas de 1982: techo de placas con fluorescentes (uno parpadea), ventanales a
//     California (x 6–118, y 28–90: cielo con nubes, montes, palmeras que se mecen y el aparcamiento con coches y gente),
//     tres pósteres de juegos inventados sin letras, dos máquinas recreativas con su demo, la máquina de café que humea, un
//     reloj, los cubículos de tela con monitores encendidos y cabezas que asoman y un oficinista pequeño que cruza el
//     pasillo con papeles, papeles clavados en los paneles, la fuente de agua con burbujas, un carrito con cajas de
//     cartuchos y una silla con ruedas; moqueta azul con rombos y la luz de los ventanales. Las dos mesas de delante
//     (x 0–86 y 234–320, tablero y 140) van en atariDelante; el centro (x 90–230) queda libre.
//     Cámara 'calendario' (suelo 170): la pared de cerca con el calendario gigante (x 62–190, y 18–150; o.mes 7–9, o.dia:
//     tacha los días hasta ese, o.marca 0–1 o true: el 1 de septiembre se rodea en rojo, o.hojas 0–1: la hoja del mes se
//     arranca y sale volando y debajo queda el mes siguiente), el cronómetro colgado (centro 236,72; o.crono 0–1 la vuelta
//     de la aguja, si no gira con t), el corcho con notas, el archivador, la ventana con una palmera y la moqueta.
//   'despachoProg' (suelo 152): el despacho del programador de noche: pared de bloques azul oscuro, la pizarra blanca
//     (x 16–112, y 24–80) con dibujos de fosos, un muñeco que salta, un teléfono y una flor, el calendario pequeño
//     (x 124–150, y 30–62; o.hojas 0–1 arranca hojas, o.mes), la ventana de noche (x 196–268, y 24–92: estrellas que
//     titilan, luna, luces de la ciudad y un avión), el archivador con la cafetera que humea, torres de manuales, la
//     estantería de carpetas, el carrito con la tele de pruebas (pantalla x 212–244, y 101–123, con el juego) y la consola,
//     y la moqueta con cables, bolas de papel, las hojas caídas y una caja de pizza. El escritorio (x 18–180, tablero
//     y 146; quien teclea va detrás con el suelo en 152 y asoma de cabeza y hombros) con la terminal de texto verde,
//     el teclado, las tazas, los manuales, el flexo y el papel continuo va en atariDelante.
//     Cámara 'pantalla': la tele de pruebas de cerca (pantalla x 52–250, y 22–128) con el juego inventado: o.juego
//     'fosos' | 'telefono' | 'retocado'; el muñequito verde genérico anda por la hierba entre flores; o.cae 0–1: cae en
//     el foso y vuelve a salir; 'retocado': salta por encima de los fosos; 'telefono': junta las piezas del teléfono en
//     el marcador (o.piezas 0–3). Debajo, la consola, el mando, cartuchos y una taza.
//   'juntas' (suelo 150): la sala de juntas de 1983: paneles de nogal, la ventana a la ciudad (x 10–112, y 24–104:
//     rascacielos con ventanas que se encienden, nubes, pájaros y un helicóptero), el reloj, la pantalla de proyección
//     (x 140–252, y 22–100) con la gráfica que cae (o.grafica 0–1) y el haz del proyector con motas, una planta, la puerta
//     (x 266–306, y 54–138; o.letrero true: cuelga un cartel de venta con una flecha y una llave) y los sillones de cuero
//     (o.sillas, x de cada uno; por omisión [52, 96, 140, 184, 228]); o.cifra, la cifra roja encima de la gráfica.
//     La mesa (x 0–256, tablero y 143–153; los consejeros asoman de cabeza y hombros) con el
//     proyector va en atariDelante; delante de la puerta (x 256–318) se puede estar de pie.
//     Cámara 'grafica': la pantalla de proyección de cerca (x 26–266, y 20–150) con la gráfica: barras y la línea que sube
//     y se desploma en rojo (o.grafica 0–1), los años en cifras, y o.cifra (texto de cifras, p. ej. '-536') en rojo grande
//     encima de la gráfica, arriba a la derecha;
//     abajo los respaldos de los sillones y el cabezal del proyector con su haz.
export function atari(R, t, o = {}) {
  const enc = A_ENC[o.encuadre] ? o.encuadre : 'bar72', cam = o.camara && o.camara !== 'general' ? 1 : 0;
  return A_ENC[enc][cam](R, t, o);
}
// lo de delante de los personajes en cada encuadre de atari(); se llama después de los actores, con las mismas opciones.
// 'bar72': la barra acolchada con su tablero, los grifos de cerveza, vasos, cacahuetes, el cenicero y dos taburetes;
// 'salon77': la mesita con cartuchos, la caja, los dos mandos con sus cables, palomitas y un refresco; 'oficinas': las dos
// mesas de los lados con monitores, teclados, placas de prototipo, tazas y cajas; 'despachoProg': el escritorio con la
// terminal (texto verde que corre), el teclado, las tazas que humean, los manuales, el flexo y el papel continuo;
// 'juntas': la mesa larga de nogal con el reflejo de la ventana, carpetas, vasos, la jarra, la calculadora y el
// proyector. Las cámaras de cerca no tienen nada delante.
export function atariDelante(R, t, o = {}) {
  if (o.camara && o.camara !== 'general') return {};
  const f = A_DELANTE[o.encuadre ?? 'bar72'];
  return f ? f(R, t, o) : {};
}
// ── B · Las tiendas ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Coordenadas: suelo = donde se plantan los pies de los personajes (el y de R.actor).
//   'jugueteria82' (por omisión): una juguetería de centro comercial en la Navidad de 1982. Techo de placas con cuatro
//     fluorescentes, la franja «supergráfica» naranja y marrón de la época, dos góndolas de pared abarrotadas de cajitas de
//     cartuchos de colores (A x 60–132 y B x 210–276, con cabecero de pictograma y guirnalda de espumillón), en el centro el
//     póster de un juego espacial (x 140–204, y 38–66) y la tele de demostración sobre su mueble (PIEZAS_AT.teleCRT en
//     x 156, pantalla con un matamarcianos que se mueve; PIEZAS_AT.consolaVieja al lado; dos joysticks en el hueco), el
//     cartel giratorio colgado del techo, la entrada al centro comercial a la izquierda (x 0–53, y 38–127: claraboya,
//     bolas de Navidad que se mecen, un escaparate de enfrente y gente que pasa, recortada al hueco), la mesa del
//     ordenador doméstico con su monitor y su precio (o.ordenador, x 62–120), la pirámide de PIEZAS_AT.cajaCartucho
//     iguales con su cartel de estrella y tres globos (x 196–248), la pared de detrás del mostrador (estante con cajas de
//     consola, reloj que anda, armario bajo) y el suelo de linóleo a cuadros en perspectiva con el reflejo de los tubos.
//     El mostrador con la caja registradora va en tiendasDelante.
//     o.ordenador (true): la mesa del ordenador; o.precioPC (199): su precio; o.devoluciones: un montón de cajas devueltas
//     con la flecha de vuelta en el armario de detrás del mostrador; o.gente (true): gente que pasa por el centro comercial.
//     Cámara 'estante': el estante de cerca, a pantalla completa: tres baldas de PIEZAS_AT.cajaCartucho al doble, iguales y
//     chillonas (la misma portada en ocho colores), las etiquetas de precio en el canto azul (o.precio, 35 por omisión), el
//     colgante de estrella que se mece y el brillo del celofán que barre las cajas.
//   'jugueteria84': la misma tienda en 1984, de bajón: el mismo plano de planta, con las góndolas medio vacías (cajas
//     tumbadas, polvo, huecos), los colores desvaídos, un fluorescente muerto y otro que parpadea (la pared se apaga debajo),
//     banderines rojos y amarillos de rebajas, la tele de demostración con nieve, el escaparate de enfrente cerrado con
//     persiana y un globo desinflado; en lugar de la pirámide, el poste del cartel de rebajas (%). Las dos cestas de saldo
//     (con su etiqueta, o.precio, 5 por omisión) y el mostrador van en tiendasDelante.
//     Cámara 'cesta': una cesta de saldo de cerca: la tienda desenfocada detrás (góndolas vacías, banderines, el tubo que
//     parpadea, alguien que pasa), la cesta de rejilla llena de PIEZAS_AT.cartucho y cajaCartucho al doble, revueltos, y el
//     cartel clavado con el precio (o.precio, grande; o.precioAntes: el precio viejo tachado en la franja roja).
//     o.etiqueta false: sin el cartel (lo pinta la escena).
//   'almacen': un almacén enorme: cerchas de acero con claraboyas y haces de luz con polvo, lámparas colgadas que se mecen,
//     la pared de chapa, la estantería de palés (cuatro calles × cinco alturas) con cajas de cartón hasta el techo, cada
//     una con el dibujo de o.icono ('varios' por omisión: queso, nave, flor y foso alternados; o uno solo: 'comecocos', que es
//     el bocadito de queso con agujeros, 'foso', 'nave', 'flor' o 'consola'), la puerta de carga abierta (x 244–314,
//     y 53–124) con el remolque de un camión (o.camion, true) y el cielo con nubes detrás, la carretilla elevadora que va y
//     viene con un palé (o.carretilla, true; o.carretillaX fija su x), un mozo pequeño al fondo con su carretilla de mano
//     y el suelo de hormigón con juntas, líneas amarillas, manchas de aceite y la luz de la puerta. Lo de delante (el palé
//     de cajas de la izquierda, con cartuchos asomando, y el bolardo) va en tiendasDelante.
//     Cámara 'pasillo': un pasillo entre estanterías en perspectiva central (fuga en 160, 88), con cajas que se pierden al
//     fondo, la fila de lámparas del techo (la del fondo parpadea), sus charcos de luz en el suelo, la línea amarilla del
//     centro, polvo en el aire, una carretilla que cruza al fondo y un mozo pequeño. Sin nada delante.
// Devuelve { suelo, … } con la geometría del encuadre (la cabecera de cada auxiliar la detalla).
export function tiendas(R, t, o = {}) {
  const enc = o.encuadre ?? 'jugueteria82', cam = o.camara ?? 'general';
  if (enc === 'almacen') return cam === 'pasillo' ? b_pasillo(R, t, o) : b_almacen(R, t, o);
  const e84 = enc === 'jugueteria84';
  if (cam === 'estante') return b_estante(R, t, o, e84);
  if (cam === 'cesta') return b_cestaCerca(R, t, o);
  return b_jugueteria(R, t, o, e84);
}
// lo de delante de los personajes en cada encuadre de tiendas(); se llama después de los actores, con las mismas opciones:
// en las jugueterías, el mostrador (x 244–319, encimera en y 143) con la caja registradora y el bote de caramelos; en la de
// 1984, además, las dos cestas de saldo (x 34–104 y 190–240, borde en y 150) con sus carteles de precio; en el almacén, el
// palé de cajas de la izquierda (x 0–46) y el bolardo amarillo (x 304–316). Las cámaras de cerca no tienen nada delante.
export function tiendasDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'jugueteria82', cam = o.camara ?? 'general';
  if (cam !== 'general') return {};
  if (enc === 'almacen') { b_almacenDelante(R, t, o); return { pale: [0, 46], bolardo: [304, 316] }; }
  const e84 = enc === 'jugueteria84';
  b_mostrador(R, t, o, e84);
  if (e84) { b_cesta(R, 34, 104, 150, 177, t, 1, o.precio ?? 5, true); b_cesta(R, 190, 240, 152, 177, t, 2, o.precio ?? 5, false); }
  return { mostrador: [244, 319, 143], cestas: e84 ? [[34, 104, 150], [190, 240, 152]] : [] };
}
// ── M · El mundo ─────────────────────────────────────────────────────────────────────────────────
// Tres encuadres con dos cámaras cada uno (o.encuadre y o.camara); devuelve { suelo } (donde se plantan los pies).
//   'cine82' (suelo 148): la calle de un cine de 1982 de noche. Cielo tramado con estrellas que titilan, la luna, nubes de
//     tres tonos a tres velocidades y un avión; la ciudad al fondo en dos capas con ventanas que se encienden y una antena
//     con su luz roja; a la izquierda la cafetería (fachada de acero, taza de neón, la barra con el cocinero y el vapor) con
//     un piso encima (cortina, tele que parpadea); el cine: pretil art déco con su abanico, el letrero vertical con bombillas
//     que corren y símbolos que se encienden, la marquesina (sin letras: una luna grande con una bicicleta en silueta que
//     la cruza, renglones de trazos, bombillas que corren por el borde y el alero con bombillas que bañan la fachada), dos
//     vitrinas de carteles (la luna y la bicicleta; un planeta con anillos), tres puertas de cristal con el vestíbulo (alguien
//     cruza, palomitas que saltan) y la taquilla con la taquillera y su precio; a la derecha el edificio de la esquina con la
//     cabina de teléfono (alguien dentro) y la cola de gente pequeña, que da la vuelta a la esquina por la bocacalle; la acera
//     con losas, chicles y charcos de luz, el bordillo y la calzada con su raya, la alcantarilla que echa vapor y los
//     reflejos. Los coches que pasan y las farolas van en mundoDelante.
//     o.cola (true): la cola de gente pequeña junto a la fachada (x 200–300, pies en y 140, más pequeños en la bocacalle).
//     Cámara 'taquilla' (suelo 176): la taquilla de cerca, un templete art déco dorado con el arco de rayos; detrás del cristal
//     la taquillera (o.taquillera, true por omisión), el reloj, el ventilador que gira, los rollos de entradas y el precio;
//     la bandeja con la entrada que sale (o.entrada 0–1; sin o.entrada sale sola cada pocos segundos), la rejilla para
//     hablar y los reflejos del cristal; a la izquierda la vitrina grande del cartel (la luna y la bicicleta) con bombillas,
//     a la derecha la puerta del vestíbulo con la máquina de palomitas que revientan, el mostrador de golosinas y la gente;
//     arriba el alero con bombillas que corren; el suelo de terrazo con su brillo, palomitas y una entrada caída. Los postes
//     de latón con el cordón de terciopelo van en mundoDelante.
//   'tokio83' (suelo 160): una tienda de electrónica de Tokio en 1983 por dentro. Techo de placas con fluorescentes (uno
//     parpadea) y una guirnalda de banderines que se mece; a la izquierda el escaparate a la calle de noche (recortado a su
//     hueco: neones verticales sin letras que se encienden por tramos, el tren elevado que pasa con sus ventanillas, gente y
//     una bici que pasan, niños que esperan fuera); al fondo la pared de televisores (tres filas de cinco, con juegos,
//     béisbol y dibujos que cambian) con carteles sin letras encima (un robot, un cohete, la consola); a la derecha estantes
//     con cajas de cartuchos, radiocasetes y calculadoras; en medio el pedestal rojo y blanco con la consola japonesa
//     (PIEZAS_AT.consolaJaponesa al doble) bajo un foco, con su tele de muestra; el suelo de linóleo a cuadros con los
//     reflejos. El mostrador de cristal con la caja registradora va en mundoDelante.
//     Cámara 'escaparate' (suelo 176): el escaparate de cerca desde la calle de noche: el rótulo luminoso con símbolos, dos
//     neones verticales que se encienden por tramos, dentro un abanico de rayos rojo y blanco que gira, la consola japonesa
//     al triple en lo alto de las gradas, cajas de cartuchos apiladas, la tele con el juego, etiquetas con precios en
//     cifras; el cristal con reflejos, gotas de lluvia que resbalan y luces de coches que cruzan; la acera mojada con los
//     reflejos de los neones.
//   'ny85' (suelo 150): una calle de Nueva York en 1985, de día, nevando. Cielo nublado tramado con nubes de tres tonos a
//     tres velocidades y palomas; la ciudad al fondo entre la bruma con una torre art déco; a la izquierda un edificio de
//     ladrillo con escalera de incendios nevada, depósito de agua, ventanas (una con un gato) y la charcutería con su toldo;
//     en medio la juguetería: ladrillo claro con coronas en las ventanas, el toldo de rayas con nieve, el escaparate con la
//     consola gris (PIEZAS_AT.consolaGris), el sello dorado (PIEZAS_AT.selloCalidad), cajas de cartuchos, una tele con el
//     juego y luces de colores que parpadean, y la puerta con su corona; a la derecha un edificio de piedra con el carrito
//     de pretzels y su vapor; la acera nevada con pisadas, la gente pequeña con abrigos que pasa por detrás, el bordillo
//     con la nieve apilada, la calzada con rodadas y la chimenea de rayas naranjas y blancas que echa vapor. Lo de delante
//     (los taxis que pasan, la boca de riego y los montones de nieve de los extremos) va en mundoDelante.
//     Cámara 'escaparate' (suelo 178): el escaparate de cerca: el marco verde, dentro el terciopelo rojo con guirnaldas y
//     luces de colores, la consola gris al triple en el podio blanco, el sello dorado al triple con su destello, una
//     pirámide de cajas de cartuchos, una tele con el juego y un tren de juguete que da vueltas; el cristal con escarcha en
//     las esquinas y reflejos, la nieve que cae, el alféizar nevado con carámbanos que gotean y el zócalo de ladrillo. La
//     nieve más cercana, por delante de los personajes, va en mundoDelante.
// Llama a mundoDelante después de los actores, con las mismas opciones. o.coches (true): los coches que pasan.
export function mundo(R, t, o = {}) {
  const enc = o.encuadre ?? 'cine82', cam = o.camara ?? 'general';
  if (enc === 'tokio83') return cam === 'escaparate' ? m_tokioEscaparate(R, t, o) : m_tokio(R, t, o);
  if (enc === 'ny85') return cam === 'escaparate' ? m_nyEscaparate(R, t, o) : m_ny(R, t, o);
  return cam === 'taquilla' ? m_taquilla(R, t, o) : m_cine(R, t, o);
}
// lo de delante de los personajes en cada encuadre de mundo(); se llama después de los actores, con las mismas opciones:
// cine82, los coches de época que pasan por la calzada (una ranchera con paneles de madera y una berlina, con los faros
// y su haz) y las dos farolas con su halo y las polillas; taquilla, los postes de latón con el cordón de terciopelo que
// va hacia los bordes; tokio83, el mostrador de cristal con su madera, lo de dentro de la vitrina, la caja registradora
// y una calculadora (el dependiente, detrás, asoma cabeza y hombros); tokio83 'escaparate', una bici aparcada en el
// borde derecho; ny85, los taxis amarillos que pasan por la calzada, la boca de riego con su gorro de nieve y los
// montones de nieve de los extremos; ny85 'escaparate', los copos más cercanos.
export function mundoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'cine82', cam = o.camara ?? 'general', coches = o.coches !== false;
  if (enc === 'cine82' && cam === 'taquilla') { m_cordon(R, t); return {}; }
  if (enc === 'cine82') {
    if (coches) { m_trafico(R, t, [[hex('#8a2a2a'), 'ranchera', 1, 42, 0], [hex('#3a5a7a'), 'berlina', -1, 34, 11], [hex('#c8b890'), 'berlina', 1, 42, 23]], true); }
    for (const x of [6, 313]) m_farola(R, x, 150, t);
    return {};
  }
  if (enc === 'tokio83' && cam === 'escaparate') { m_bici(R, 300, 178); return {}; }
  if (enc === 'tokio83') { m_mostradorTokio(R, t); return {}; }
  if (enc === 'ny85' && cam === 'escaparate') { m_nieve(R, t, 0, 0, 319, 179, 22, 2, 7); return {}; }
  if (enc === 'ny85') {
    if (coches) m_trafico(R, t, [[hex('#e8b818'), 'taxi', 1, 44, 0], [hex('#e8b818'), 'taxi', -1, 38, 9], [hex('#5a5a6a'), 'berlina', 1, 44, 19]], false);
    m_montonNieve(R, 0, 34, 156); m_montonNieve(R, 292, 319, 156);
    m_bocaRiego(R, 22, 152);
    m_nieve(R, t, 0, 0, 319, 179, 10, 2, 8);
    return {};
  }
  return {};
}
// ── C · El desierto ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Las montañas de fondo (la sierra de Sacramento, al este de Alamogordo) son LAS MISMAS en el
// vertedero de 1983 y en la excavación de 2014 (c_sierra): el mismo sitio con otra luz y otro estado. Luz de la mañana
// desde la izquierda (el sol, arriba a la izquierda, lejos de la esquina de Atom).
//   'vertedero83' (suelo 168): el vertedero municipal de Alamogordo en septiembre de 1983: cielo tramado con nubes de tres
//     tonos a tres velocidades y cuervos, la sierra azulada con pinos, la llanura con matorral, yucas, roderas, postes de
//     la luz, la caseta del vertedero con su manga de viento, montones de basura con gaviotas, coches por la carretera del
//     horizonte, un remolino de polvo y una planta rodadora. En el centro la fosa (x 70–236, borde de atrás y 104, fondo
//     y 112–146, labio de delante y 146–150) llena de cajas de cartón y cartuchos.
//     o.camion 0–1: el volquete (cabina crema con franjas naranja y marrón) entra por la derecha (0–0,15), se para con la
//       caja sobre la fosa (x 214–310, ruedas en y 140), la levanta (0,15–0,55), las cajas caen a chorro a la fosa
//       (0,3–0,9) y la baja (0,85–1). Sin o.camion: aparcado con la caja bajada.
//     o.apisonadora 0–1: la compactadora amarilla de ruedas de púas cruza la fosa de x 74 a x 168 (ruedas en y 142); las
//       cajas que deja atrás quedan aplastadas. Sin ella: aparcada a la izquierda de la fosa (x 74).
//     o.cemento 0–1: la hormigonera (x 0–84, ruedas en y 140, tambor que gira) echa cemento por la canaleta y la capa gris
//       cubre la fosa de izquierda a derecha. Sin ella: la hormigonera espera con el tambor girando.
//     o.noche (true): de noche: estrellas que titilan, luna, la torre de focos encendida con su cono, faros de los
//       vehículos y la ventana de la caseta con luz; todo lo demás, azulado. La torre de focos está en x 246–254, y 58–104.
//     o.conductor (true): siluetas oscuras en las cabinas (false para vaciarlas).
//     Cámara 'cemento' (suelo 52 en el borde de arriba, x 150–270): la fosa de cerca: cajas aplastadas, cartuchos sueltos
//       (alguno brilla), papeles que vuelan y el cemento que avanza (o.cemento 0–1) desde la canaleta de arriba a la
//       izquierda, con su brillo húmedo y burbujas; la rueda de la apisonadora asoma a la derecha.
//   'pueblo' (suelo 148 en la acera; 172 en la calzada): Alamogordo de noche en 1983: estrellas, luna, la sierra en
//     silueta, el depósito de agua; de izquierda a derecha el café cerrado (x 0–62), la imprenta del periódico de ladrillo
//     con las ventanas encendidas y la rotativa girando dentro (x 64–150, puerta x 100–114), un hueco con el desierto,
//     la valla del vertedero y su torre de focos a lo lejos (x 150–180), la ferretería (x 180–222) y el motel (x 222–320)
//     con el cartel de neón sin letras (flecha y estrella que parpadean), puertas numeradas, una tele que parpadea, la
//     máquina de refrescos y un coche aparcado (x 270–312). Farolas con polillas, un gato en el muro, cables.
//     Cámara 'imprenta' (suelo 162; libre x 30–140 delante de la máquina): la rotativa de cerca (x 70–232, y 40–140):
//     bastidor de hierro verde con remaches, rodillos que giran, la cadena, el manómetro, los engranajes, el panel con
//     pilotos, la banda de papel que corre, los periódicos que caen a la mesa de salida (x 226–300, tablero y 120) con su
//     pila; el de encima se ve de frente: cabecera en barras, la foto del vertedero y columnas de rayas (o.sale 0–1: un
//     periódico sale de la máquina y se posa delante, en x 150–214, y 132–176). Pared de ladrillo, lámparas verdes que se
//     mecen (x 124 y 176), bobinas de papel, latas de tinta, el reloj (x 210, y 30), el calendario de septiembre del 83
//     (x 236–266) y la ventana a la noche (x 226–272, y 54–94).
//   'excavacion14' (suelo 160, detrás de la valla de desiertoDelante, que tapa de y 150 a 166): el mismo vertedero el 26 de
//     abril de 2014, de día: la misma sierra; la excavación abierta con capas de basura de colores (x 84–244, y 100–142),
//     montones de tierra con basura, la excavadora grande (cadenas en y 128, x 216–276) que cava con el brazo hacia la
//     izquierda y la pequeña del fondo, dos carpas blancas con banderines y gente debajo (x 4–104), cámaras de televisión
//     en trípodes con su piloto rojo (x 110–150), un dron, público pequeño con camisetas de colores detrás de la valla del
//     fondo, polvo que se lleva el viento. o.excavadora 0–1 (por omisión, cíclico con t): el brazo cava y sube.
//     Cámara 'pala' (suelo 172 en el saliente de abajo a la izquierda, x 10–100): la cuchara de la excavadora vista de
//       frente (centro x 170; o.saca 0–1: sube de y 198 a y 112; sin o.saca, cíclica con t), con el balancín y el
//       cilindro que suben hacia arriba a la derecha, el montón de tierra con cartuchos (dos grandes), una caja rota y un
//       periódico, la tierra que cae por los lados y el polvo; la pared de la fosa con capas de basura y el público
//       asomado al borde de arriba. Devuelve también { cuchara: [x, y] } (el borde de arriba de la cuchara).
//   'carpa' (suelo 160, detrás de la mesa de desiertoDelante, cuyo tablero está en y 152: asoman cabeza y hombros; libre
//     x 104–206, los extremos de la mesa llevan cosas): la carpa de los arqueólogos:
//     el techo de lona con costuras que ondea, mástiles, por la abertura (x 20–300, y 34–100) el desierto con la misma
//     sierra y la excavadora a lo lejos que cava, gente pequeña que pasa, la mesa del fondo (tablero y 104, x 36–284) con
//     cajas de plástico numeradas, bolsas, un portátil con una gráfica que cambia, un termo, una cámara, un ventilador que
//     gira, bolsas colgadas del mástil central (x 158) que se mueven, la pizarra con las capas (x 250–300, y 60–98) y el
//     suelo de lona azul con manchas de arena y costuras.
//     Cámara 'mesa' (suelo 80 detrás de la mesa, x 100–150 o 226–280; el canto de la mesa en y 70): la mesa de cerca: el
//       periódico de 1983 (x 100–212, y 80–156: cabecera en barras, la fecha en cifras, la foto del vertedero, columnas
//       de rayas), el cartucho limpio grande (centro x 250, base y 136, con un brillo que pasa), tres cartuchos sucios en
//       una bandeja azul (x 10–84, y 80–124), la bolsa numerada, pinceles, una paleta, una lupa (x 290, y 132) y una regla
//       de escala; al fondo, la carpa con la abertura (nube y un arqueólogo pequeño que cruza) y una mosca en la mesa.
//   Devuelve { suelo } (y en el vertedero, { suelo, fosa: [x0, y0, x1, y1] }).
export function desierto(R, t, o = {}) {
  const enc = o.encuadre ?? 'vertedero83', cam = o.camara ?? 'general';
  if (enc === 'pueblo') return cam === 'imprenta' ? c_imprenta(R, t, o) : c_pueblo(R, t, o);
  if (enc === 'excavacion14') return cam === 'pala' ? c_pala(R, t, o) : c_excavacion(R, t, o);
  if (enc === 'carpa') return cam === 'mesa' ? c_mesaCerca(R, t, o) : c_carpa(R, t, o);
  return cam === 'cemento' ? c_cementoCerca(R, t, o) : c_vertedero(R, t, o);
}
// lo de delante de los personajes en cada encuadre de desierto(); se llama después de los actores, con las mismas
// opciones. Devuelve la zona que tapa ({ valla } o { mesa }). 'vertedero83': la valla de tela metálica con alambre de espino y el cartel sin letras (un camión y un
// círculo de prohibido) a la izquierda (x 0–62, y 132–180), un matorral abajo a la derecha y la planta rodadora que
// cruza. 'pueblo': o.coche (0–1) un coche que cruza la calzada por delante (y 156–180) con sus faros. 'excavacion14': la
// valla de obra (barandillas metálicas, y 150–166, de lado a lado) y, abajo, el público de espaldas con camisetas de
// colores que se mueve (y 166–180); o.valla false la quita. 'carpa': la mesa plegable de delante (tablero y 152–158,
// x 30–290, patas en X) con una bandeja de cartuchos limpios a la izquierda (x 32–100) y, a la derecha, bolsas con
// etiquetas numeradas, el periódico doblado y un pincel (x 196–290); o.mesa false la quita. Las cámaras de cerca no llevan nada delante.
export function desiertoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'vertedero83', cam = o.camara ?? 'general';
  if (cam !== 'general') return {};
  const k = enc === 'vertedero83' && o.noche || enc === 'pueblo' ? c_oscuro : c_igual;
  if (enc === 'vertedero83') { c_vallaVertedero(R, t, k, !!o.noche); return { valla: [0, 132, 62, 180] }; }
  if (enc === 'pueblo') { if (o.coche != null && o.coche > 0 && o.coche < 1) c_cocheCalle(R, Math.round(lerp(-70, 340, o.coche)), 178, t, 1); return {}; }
  if (enc === 'excavacion14') { if (o.valla !== false) c_vallaObra(R, t); return { valla: [0, 150, 319, 180] }; }
  if (enc === 'carpa') { if (o.mesa !== false) c_mesaDelante(R, t); return { mesa: [30, 152, 290, 180] }; }
  return {};
}
// ── E · Hoy ─────────────────────────────────────────────────────────────────────────────────
// o.encuadre (y o.camara). Cada encuadre pinta los 320 × 180 en cada fotograma: lo fijo va en un búfer de R.nuevo() (uno
// por encuadre y cámara) y encima la vida animada. Devuelve la geometría para las escenas (suelo, foso, mesa, sillas…).
//   'estudio' (por omisión): el estudio de Atom al atardecer, cálido y lleno de cosas retro: papel pintado de rayas de los
//     setenta con su rombo, friso de nogal con cuarterones, tarima de roble con vetas y la luz del ocaso que entra por la
//     ventana (x 20–68 × 20–58: la ciudad al atardecer con nubes de tres tonos, pájaros, la antena que parpadea y un avión;
//     cortinas de cuadros), una máquina recreativa (pantalla con naves que se mueven, monedero que parpadea), la
//     estantería (x 118–168) con cajas de juegos, consolas, una lámpara de lava que burbujea y un robot de juguete, dos
//     pósteres sin letras (el marcianito y el cohete), el aparador con la tele de tubo grande (pantalla x 204–232 × 63–83:
//     o.pantalla(R, t, [x0, y0, x1, y1]) la pinta; si no, el juego inventado de los fosos), el tocadiscos que gira, el
//     neón del mando que tintinea, una planta y la alfombra trenzada. La mesa (x 172–300, tablero y 124) con la consola
//     vieja, los mandos, las cajas y el cajón de cartuchos va en hoyDelante, por delante de los personajes.
//     o.foso 0–1: el foso negro que se abre en el suelo en (o.fosoX 146, o.fosoY 162), hasta 26 × 8 px de radio: la pared
//     de tablas rotas del fondo, el filo con astillas, grietas y polvo mientras se abre. hoyDelante, con o.tapaFoso, vuelve
//     a pintar el suelo de delante del foso (para que quien cae se hunda en él).
//     Cámara 'mesa': la mesa de cerca: la tele de tubo grande con el juego (o.pantalla igual; hueco x 42–110 × 34–86), la
//     consola vieja al triple (o.cartuchoPuesto: color del cartucho pinchado, 'naranja' por omisión; false sin él), dos
//     mandos con sus cables, la caja de un juego y el cajón de cartuchos, la taza que humea, la lámpara con su charco de
//     luz y motas; el canto de la mesa (y 172–179) va en hoyDelante.
//   'consulta': la consulta de un psicoterapeuta en Silicon Valley: pared de yeso cálido, el ventanal de acero (x 120–250
//     × 20–90) a las colinas doradas con robles, oficinas de cristal con reflejos que corren, coches pequeños en la
//     carretera, nubes y pájaros; visillos que se mecen, la estantería de libros, el cartucho viejo enmarcado con su luz
//     de cuadro, el reloj que anda, un ficus grande que se mueve, la lámpara de arco, la alfombra y el parquet de espiga,
//     la mesita con el vaso de agua, los pañuelos y un cartucho viejo. El sillón de cuero (para el terapeuta, x 46–96) y el
//     diván de terciopelo (para el paciente, x 186–270): los respaldos aquí; asiento, brazos y patas en hoyDelante.
//     Cámara 'divan': el diván de cerca, con la pared de diplomas (rayas), el aplique, la ventana con su estor a las colinas,
//     y la mesita (x 4–60) con el vaso de agua que tiembla, la caja de pañuelos (el pañuelo se mece) y el cartucho viejo.
//     El frente del asiento del diván va en hoyDelante.
//   'museo': la sala de un museo: pared de tela azul con los abanicos de luz de los focos, carril de focos en el techo,
//     la pantalla grande (x 112–208 × 22–72) con el documental sin letras (o.documental 0–2 fija la escena; si no, cambia
//     cada 5 s: excavadora en el desierto, el público y los camiones, el cartucho en la arena), una línea del tiempo de
//     pictogramas, dos hornacinas iluminadas con consolas, mandos, teles y cartuchos, suelo de piedra pulida con reflejos y
//     charcos de luz, visitantes pequeños que pasan al fondo, dos peanas con vitrina y la vitrina central (x 136–184) con
//     el cartucho sucio del desierto bajo su foco. El cordón con sus postes va en hoyDelante.
//     Cámara 'vitrina': la vitrina de cerca: el cartucho sucio al cuádruple, con arena y arañazos, sobre su montoncito de
//     arena; la caja rota y aplastada; la tarjeta (rayas y un pictograma); el foco con motas, los reflejos del cristal que
//     se deslizan y el museo desenfocado detrás (luces y visitantes borrosos que pasan).
export function hoy(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'consulta') return cam === 'divan' ? e_divan(R, t, o) : e_consulta(R, t, o);
  if (enc === 'museo') return cam === 'vitrina' ? e_vitrina(R, t, o) : e_museo(R, t, o);
  return cam === 'mesa' ? e_mesaCerca(R, t, o) : e_estudio(R, t, o);
}
// lo de delante de los personajes en cada encuadre de hoy(); se llama después de los actores, con las mismas opciones:
//   estudio: la mesa con la consola, los mandos, las cajas, el cajón de cartuchos y el flexo (y con o.foso y o.tapaFoso,
//     el suelo de delante del foso); cámara 'mesa': el canto de la mesa; consulta: el asiento, los brazos y las patas del
//     sillón y del diván; cámara 'divan': el frente del diván con sus cojines; museo: el cordón de terciopelo con sus
//     postes; cámara 'vitrina': nada
export function hoyDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'estudio', cam = o.camara ?? 'general';
  if (enc === 'consulta') { if (cam === 'divan') e_divanDelante(R, t); else { e_sillonDelante(R); e_divanLejosDelante(R); } return {}; }
  if (enc === 'museo') { if (cam !== 'vitrina') e_cordon(R, t); return {}; }
  if (cam === 'mesa') { e_cantoMesa(R); return {}; }
  if ((o.foso ?? 0) > 0 && o.tapaFoso) e_tapaFoso(R, o);
  e_mesaEstudio(R, t, o);
  return {};
}
// los fondos fijos de cada encuadre: se pintan una vez en su búfer de R.nuevo() y se copian en cada fotograma
const a_capas = new Map();

function a_capa(R, clave, dibuja) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); a_capas.set(clave, b); }
  return b;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function a_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// tiñe un rectángulo hacia un color (paso 2: solo la mitad de los píxeles, en tramado); respeta R.recorte
function a_velo(R, x0, y0, x1, y1, col, a, paso = 1) {
  for (let y = Math.max(0, y0 | 0); y <= Math.min(179, y1 | 0); y++) for (let x = Math.max(0, x0 | 0); x <= Math.min(319, x1 | 0); x++) if (paso === 1 || (x + y) % paso === 0) R.pset(x, y, a_mezcla(R.pget(x, y), col, a));
}

// la trama ordenada 4 × 4 (umbral 0–1 de cada píxel) y el degradado tramado de arriba abajo entre varios colores
const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const a_tr = (x, y) => (a_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

function a_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > a_tr(x, y) ? cols[i + 1] : cols[i]); }
}

// un rectángulo que respeta R.recorte (R.rect no lo respeta)
function a_caja(R, x0, y0, x1, y1, c) { for (let y = Math.round(y0); y <= y1; y++) for (let x = Math.round(x0); x <= x1; x++) R.pset(x, y, c); }

// tablas de madera con vetas: cols = [base, junta, canto de luz, veta]; o.w ancho de tabla, o.vertical (por omisión),
// o.k semilla, o.nudos (por omisión sí)
function a_tablas(R, x0, y0, x1, y1, cols, o = {}) {
  const [b, s, l, v] = cols, w = o.w ?? 12, k = o.k ?? 0, vert = o.vertical !== false;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const a = vert ? x - x0 : y - y0, c = vert ? y : x, i = Math.floor(a / w), r = a - i * w;
    let col = b;
    if (r === w - 1) col = s; else if (r === 0) col = l;
    else { const q = r + Math.sin(c * 0.07 + i * 1.9) * 2.2 + Math.sin(c * 0.023 + i * 4.1) * 1.5, fr = q - Math.floor(q / 3.4) * 3.4;
      if (fr < 0.6 && h(i, c >> 1, k) < 0.85) col = v; else if (h(x, y, k + 5) < 0.035) col = s; else if (h(i, 3, k) < 0.4 && fr > 2.9 && (x + y) % 2 === 0) col = v; }
    R.pset(x, y, col);
  }
  if (o.nudos !== false) for (let i = 0; i * w < (vert ? x1 - x0 : y1 - y0); i++) if (h(i, 9, k) < 0.35) {
    const lado = vert ? y1 - y0 : x1 - x0, p = Math.round(h(i, 8, k) * lado * 0.8 + lado * 0.1), m = i * w + Math.round(w / 2);
    const cx = vert ? x0 + m : x0 + p, cy = vert ? y0 + p : y0 + m;
    R.pset(cx, cy, s); R.pset(cx + (vert ? 0 : 1), cy + (vert ? 1 : 0), s); R.pset(cx - 1, cy, v); R.pset(cx + 1, cy + 1, v);
  }
}

// una nube de tres tonos (luz arriba a la izquierda, sombra abajo): cx, cy el centro, w el ancho; respeta R.recorte
function a_nube(R, cx, cy, w, [l, m, s]) {
  const r = w / 5, B = [[-1.6, 0.4, 0.8], [1.6, 0.5, 0.75], [-0.5, -0.35, 1.05], [0.8, -0.15, 0.92]];
  for (const [dx, dy, f] of B) R.disco(cx + dx * r, cy + dy * r + 1.2, r * f, s);
  for (const [dx, dy, f] of B) R.disco(cx + dx * r, cy + dy * r, r * f, m);
  for (const [dx, dy, f] of B) if (dy < 0.3) R.disco(cx + dx * r - r * 0.25, cy + dy * r - r * 0.3, r * f * 0.62, l);
}

// el cielo de una ventana recortado a su hueco: degradado tramado, nubes de tres tonos a tres velocidades y dos pájaros
function a_cielo(R, t, [x0, y0, x1, y1], cols, nubes, o = {}) {
  a_degradado(R, x0, y0, x1, y1, cols);
  R.recorte([x0, y0, x1, y1]);
  const W = x1 - x0 + 50;
  for (let k = 0; k < (o.n ?? 4); k++) { const vel = [1.1, 2.0, 3.2][k % 3], w = 12 + (k % 3) * 5 + h(k, 1, o.k ?? 9) * 6;
    const x = x0 - 25 + ((h(k, 2, o.k ?? 9) * W + t * vel) % W), y = y0 + 5 + h(k, 3, o.k ?? 9) * (y1 - y0) * (o.alto ?? 0.4); a_nube(R, x, y, w, nubes); }
  if (o.pajaros !== false) for (let k = 0; k < 2; k++) {
    const x = Math.round(x0 - 8 + ((t * (7 + k * 3) + k * 41) % (W - 30))), y = Math.round(y0 + 7 + k * 5 + Math.sin(t * 1.7 + k) * 2), a = Math.floor(t * 5 + k * 2) % 2, c = o.pajaro ?? hex('#2a2430');
    R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a, c); R.pset(x + 2, y - 1 + a, c);
  }
  R.recorte(null);
}

// una palmera: tronco curvo con anillos y el penacho de hojas que se mece con el viento; o.c [tronco, sombra, hoja,
// hojaS, hojaL] (para la silueta de noche, todo oscuro)
function a_palmera(R, x, base, alto, t, o = {}) {
  const [tr, trS, ho, hoS, hoL] = o.c ?? [hex('#8a6a4a'), hex('#5a4430'), hex('#3a7a3a'), hex('#24502a'), hex('#62a24e')];
  const sway = Math.sin(t * 1.3 + x * 0.7) * 1.6, curva = o.curva ?? 0.18;
  let px = x, py = base;
  for (let j = 0; j <= alto; j++) { const u = j / alto, cx = Math.round(x + Math.sin(u * 1.6) * alto * curva + sway * u * u);
    R.pset(cx, base - j, j % 3 === 0 ? trS : tr); R.pset(cx + 1, base - j, trS); px = cx; py = base - j; }
  const L = alto * 0.5;
  for (let k = 0; k < 8; k++) { const an = -Math.PI - 0.1 + k * (Math.PI + 0.2) / 7 + Math.sin(t * 1.9 + k + x) * 0.07;
    for (let s = 1; s <= L; s++) { const u = s / L, xx = Math.round(px + Math.cos(an) * s), yy = Math.round(py + Math.sin(an) * s * 0.55 + u * u * L * 0.55);
      R.pset(xx, yy, u > 0.75 ? hoS : ho); if (s % 2 === 0 && s > 2) R.pset(xx, yy + 1, hoS); if (s % 3 === 1 && u < 0.7) R.pset(xx, yy - 1, hoL); } }
  R.disco(px + 0.5, py + 1.5, 1.6, trS);
}

// un coche de época visto de lado (largo ≈30, 11 de alto): carrocería con luz y sombra, cristales, cromados, faros y
// ruedas con tapacubos que giran; o.dir 1 hacia la derecha; respeta R.recorte
function a_coche(R, x, base, col, t, o = {}) {
  const L = o.largo ?? 30, d = o.dir ?? 1, cs = a_mezcla(col, hex('#000000'), 0.35), cl = a_mezcla(col, hex('#ffffff'), 0.35), cromo = hex('#d8dce4'), vid = o.vidrio ?? hex('#9ac8e0');
  const X = (i) => (d > 0 ? x + i : x + L - 1 - i), P = (i, j, c) => R.pset(X(i), base - j, c);
  for (let i = 0; i < L; i++) for (let j = 2; j <= 6; j++) P(i, j, j === 6 ? cl : j === 2 ? cs : (i === 0 || i === L - 1) ? cs : col);
  for (let i = 9; i < 23; i++) for (let j = 7; j <= 10; j++) { if ((j === 10 && (i < 11 || i > 20)) || (j === 9 && (i < 10 || i > 21))) continue;
    P(i, j, j < 10 && i > 10 && i < 21 && i !== 16 ? (j === 9 && i < 14 ? hex('#d8f0f8') : vid) : j === 10 ? cl : col); }
  for (let i = 0; i < L; i++) if (i < 3 || i > L - 4) P(i, 3, cromo);
  for (let i = 3; i < L - 3; i++) if (i % 2 === 0) P(i, 4, a_mezcla(col, cromo, 0.3));
  P(L - 1, 5, o.faros ? hex('#fff8c0') : hex('#f8e8a0')); P(0, 5, hex('#d8402a'));
  for (const wx of [6, L - 7]) { const cx = X(wx); R.disco(cx + 0.5, base - 1, 2.7, hex('#18161a')); R.pset(cx, base - 1, cromo);
    const a = t * 9 * d; R.pset(cx + Math.round(Math.cos(a) * 1.4), base - 1 + Math.round(Math.sin(a) * 1.4), hex('#6a6a72')); }
}

// una persona pequeña de fondo (11 px): pelo, cara, camisa con su sombra, pantalón y piernas que andan; o.anda, o.dir,
// o.sentado (sin piernas, para detrás de una mesa), o.brazo 0–1 (levanta el brazo: beber, saludar), o.carga (papeles)
function a_gente(R, x, pie, t, ropa, o = {}) {
  const { pset } = R, piel = o.piel ?? hex('#e8b088'), pelo = o.pelo ?? hex('#4a2a18'), pant = o.pant ?? hex('#34446a'), rs = a_mezcla(ropa, hex('#000000'), 0.32), d = o.dir ?? 1;
  const p = o.anda ? Math.floor(t * 6 + x * 0.1) % 2 : 0, bob = o.anda && p ? 1 : 0, y = pie - bob;
  // cabeza
  for (let i = -1; i <= 1; i++) { pset(x + i, y - 11, pelo); pset(x + i, y - 10, piel); pset(x + i, y - 9, piel); }
  pset(x - d, y - 10, pelo); pset(x + d, y - 10, a_mezcla(piel, hex('#000000'), 0.2));
  // torso y brazos
  for (let j = 8; j >= 4; j--) for (let i = -2; i <= 2; i++) pset(x + i, y - j, i === -2 * d ? rs : ropa);
  const ba = o.brazo ?? 0;
  pset(x - 3 * d, y - 7, ropa); pset(x - 3 * d, y - 6 + (o.anda && !p ? -1 : 0), ropa); pset(x - 3 * d, y - 5, piel);
  if (ba > 0.5) { pset(x + 3 * d, y - 8, ropa); pset(x + 3 * d, y - 9, piel); } else { pset(x + 3 * d, y - 7, ropa); pset(x + 3 * d, y - 6, ropa); pset(x + 3 * d, y - 5 + (o.anda && p ? -1 : 0), piel); }
  if (o.carga) { pset(x + 3 * d, y - 6, hex('#f4f0e4')); pset(x + 4 * d, y - 6, hex('#f4f0e4')); pset(x + 4 * d, y - 7, hex('#dcd8cc')); }
  if (o.sentado) return;
  // piernas
  for (let j = 3; j >= 0; j--) { pset(x - 1 + (p && j < 2 ? -d : 0), y - j + (j === 0 ? bob : 0), pant); pset(x + 1 + (!p && o.anda && j < 2 ? d : 0), y - j + (j === 0 ? bob : 0), pant); }
  pset(x - 1 + (p ? -d : 0), pie, hex('#2a201c')); pset(x + 1 + (!p && o.anda ? d : 0), pie, hex('#2a201c'));
}

// un neón sin letras: tubo de color con su halo en la pared; lineas = varias polilíneas [[x, y], …]; on 0–1 (parpadeo)
function a_neon(R, lineas, col, on = 1) {
  const vivo = a_mezcla(col, hex('#ffffff'), 0.5), apagado = a_mezcla(col, hex('#000000'), 0.55);
  for (const pts of lineas) for (let i = 0; i + 1 < pts.length; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    if (on > 0.5) for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) R.linea(ax + dx, ay + dy, bx + dx, by + dy, (x, y) => a_mezcla(R.pget(x, y), col, 0.4));
  }
  for (const pts of lineas) for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; R.linea(ax, ay, bx, by, on > 0.5 ? vivo : apagado); }
}

// el cristal de un tubo de imagen: líneas de barrido, esquinas redondeadas y oscuras y un reflejo en diagonal
function a_crt(R, x0, y0, x1, y1, o = {}) {
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rx = (x1 - x0) / 2 + 0.5, ry = (y1 - y0) / 2 + 0.5, NEG = hex('#000000'), BL = hex('#ffffff'), marco = o.marco ?? hex('#0c0a0c'), W = x1 - x0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry, v = dx * dx * dx * dx + dy * dy * dy * dy;
    if (v > 1) { R.pset(x, y, marco); continue; }
    let p = R.pget(x, y), a = (y & 1) ? (o.barrido ?? 0.16) : 0;
    if (v > 0.45) a += (v - 0.45) * 0.8;
    if (a > 0) p = a_mezcla(p, NEG, Math.min(0.8, a));
    const r = (x - x0) + (y - y0) * 1.3;
    if (r > W * 0.1 && r < W * 0.17 && y < cy) p = a_mezcla(p, BL, 0.14);
    if (dx < -0.55 && dy < -0.5 && v < 0.75 && (x + y) % 3 === 0) p = a_mezcla(p, BL, 0.18);
    R.pset(x, y, p);
  }
}

// cifras de 3 × 5 (y el signo menos) escaladas por esc; no son letras: el marcador del Pong, el calendario
const A_DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '###', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'],
  5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '..#', '..#', '..#'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'], '-': ['...', '...', '###', '...', '...'] };

function a_digitos(R, txt, x, y, esc, col, sombra) {
  let cx = x;
  for (const ch of String(txt)) { const g = A_DIG[ch]; if (!g) { cx += 2 * esc; continue; }
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j][i] === '#') { if (sombra != null) a_caja(R, cx + i * esc + 1, y + j * esc + 1, cx + i * esc + esc, y + j * esc + esc, sombra); a_caja(R, cx + i * esc, y + j * esc, cx + i * esc + esc - 1, y + j * esc + esc - 1, col); }
    cx += 4 * esc; }
  return cx - x;
}

// la sombra suave de un objeto en el suelo (un óvalo tramado)
function a_sombra(R, cx, cy, rx, ry, a = 0.35) {
  for (let y = Math.round(cy - ry); y <= cy + ry; y++) for (let x = Math.round(cx - rx); x <= cx + rx; x++) { const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1) R.pset(x, y, a_mezcla(R.pget(x, y), hex('#000000'), a * (d < 0.5 ? 1 : 0.6))); }
}

// el humo o el vapor que sube haciendo eses desde (x, y): n volutas tramadas
function a_humo(R, x, y, t, col, o = {}) {
  const n = o.n ?? 6, alto = o.alto ?? 16;
  for (let k = 0; k < n; k++) { const u = ((t * (o.vel ?? 0.5) + k / n) % 1), yy = Math.round(y - u * alto), xx = Math.round(x + Math.sin(u * 7 + t * 1.3 + k) * (1 + u * 3));
    if (u < 0.85) { R.pset(xx, yy, a_mezcla(R.pget(xx, yy), col, 0.75 - u * 0.6)); if (u > 0.3) R.pset(xx + 1, yy, a_mezcla(R.pget(xx + 1, yy), col, 0.5 - u * 0.4)); } }
}

// una moqueta tramada: base, sombra y luz en motas y briznas; o.pelo (pelo largo: briznas verticales), o.fondo (la fila
// del fondo, que se oscurece en tramado hacia ella)
function a_moqueta(R, x0, y0, x1, y1, [b, s, l], o = {}) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const v = h(x, y, o.k ?? 3); let c = v < 0.16 ? s : v > 0.86 ? l : b;
    if (o.pelo && h(x, y >> 1, 4) < 0.12) c = (y & 1) ? s : l;
    if (y - y0 < 10 && a_tr(x, y) > (y - y0) / 10) c = a_mezcla(c, hex('#000000'), 0.25);
    R.pset(x, y, c);
  }
}

// las botellas de un estante: de x0 a x1 con la base en y; colores de cristal con su brillo y su tapón, alguna etiqueta lisa
function a_botellas(R, x0, x1, y, k) {
  const CR = [hex('#6a8a3a'), hex('#a8642a'), hex('#c8a04a'), hex('#4a6a9a'), hex('#d8d8c8'), hex('#8a2a2a'), hex('#3a5a3a')];
  let x = x0;
  while (x < x1 - 3) { const i = Math.floor(h(x, y, k) * CR.length), c = CR[i], cs = a_mezcla(c, hex('#000000'), 0.4), alto = 8 + Math.floor(h(x, 1, k) * 6), ancho = h(x, 2, k) < 0.3 ? 4 : 3;
    for (let j = 0; j < alto; j++) for (let a = 0; a < ancho; a++) { const cuello = j > alto - 4; if (cuello && (a === 0 || a === ancho - 1) && ancho > 2) continue; R.pset(x + a, y - j, a === ancho - 1 ? cs : a === 1 && !cuello ? a_mezcla(c, hex('#ffffff'), 0.4) : c); }
    R.pset(x + 1, y - alto, hex('#d8b040')); if (alto > 10 && h(x, 3, k) < 0.6) for (let a = 0; a < ancho; a++) { R.pset(x + a, y - 3, hex('#e8dcc0')); R.pset(x + a, y - 4, hex('#e8dcc0')); }
    x += ancho + 1 + (h(x, 4, k) < 0.2 ? 1 : 0); }
}

// marcador en cifras; o.marcador [a, b] fija los tantos (si no, suben solos con t); o.vel velocidad
function a_pong(R, t, [x0, y0, x1, y1], o = {}) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, s = Math.max(1, Math.round(W / 64)), fondo = hex('#0e1612'), fos = hex('#e8f6ee'), fosS = hex('#6a8a7a'), fosD = hex('#2a3e34');
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 77) < 0.05 ? hex('#16201a') : fondo);
  const cx = Math.round((x0 + x1) / 2 - s / 2);
  for (let y = y0 + s; y <= y1 - s; y += 4 * s) a_caja(R, cx, y, cx + s - 1, Math.min(y1, y + 2 * s - 1), fosS);
  const pw = s * (s > 1 ? 2 : 1), ph = s * 6, mx = x0 + 3 * s, Mx = x1 - 3 * s - pw + 1;
  const pos = (tt) => { const u = tt * (o.vel ?? 0.55), f = u % 2, tri = f < 1 ? f : 2 - f, g = (tt * 0.83 + 0.3) % 2, tg = g < 1 ? g : 2 - g;
    return [Math.round(mx + pw + tri * (Mx - mx - pw - s)), Math.round(y0 + s * 2 + tg * (H - 5 * s))]; };
  const [bx, by] = pos(t);
  const sigue = (lado) => Math.round(Math.max(y0 + s, Math.min(y1 - ph - s + 1, by - ph / 2 + Math.sin(t * 2.1 + lado) * s * 2.5)));
  const pl = sigue(0), pr = sigue(2);
  // el marcador, detrás de la pelota
  const m = o.marcador ?? [Math.floor(t / 6.5) % 10, Math.floor((t + 3) / 5.2) % 10], e = Math.max(1, s), dy = y0 + 2 * s;
  a_digitos(R, m[0], Math.round((x0 + cx) / 2 - 1.5 * e), dy, e * (s > 1 ? 2 : 1), fos);
  a_digitos(R, m[1], Math.round((cx + x1) / 2 - 1.5 * e), dy, e * (s > 1 ? 2 : 1), fos);
  a_caja(R, mx, pl, mx + pw - 1, pl + ph - 1, fos); a_caja(R, Mx, pr, Mx + pw - 1, pr + ph - 1, fos);
  for (let k = 3; k >= 1; k--) { const [qx, qy] = pos(t - k * 0.035 * (s > 1 ? 1 : 2)); a_caja(R, qx, qy, qx + s - 1, qy + s - 1, k > 1 ? fosD : fosS); }
  a_caja(R, bx, by, bx + s - 1, by + s - 1, fos);
  return { pelota: [bx, by], palas: [pl, pr] };
}

// el juego inventado de la tele de pruebas, visto de lado: el cielo de bandas con estrellas, la hierba con flores, la
// tierra con los fosos, una pieza de teléfono que brilla, el marcador (cifras y las tres piezas) y el muñequito verde
// genérico; o.juego 'fosos' | 'telefono' | 'retocado', o.cae 0–1 (cae en el primer foso y sale), o.piezas 0–3
function a_juego(R, t, [x0, y0, x1, y1], o = {}) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, s = Math.max(1, Math.round(W / 50)), GW = Math.floor(W / s), GH = Math.floor(H / s);
  const cel = (i, j, c) => { if (i < 0 || j < 0 || i >= GW || j >= GH) return; R.rect(x0 + i * s, y0 + j * s, Math.min(x1, x0 + i * s + s - 1), Math.min(y1, y0 + j * s + s - 1), c); };
  const juego = o.juego ?? 'fosos', suelo = Math.round(GH * 0.6), hud = 6;
  // bandas del cielo (al estilo de la consola) y estrellas que parpadean
  const BAND = [hex('#1a1a5a'), hex('#24287a'), hex('#30409a'), hex('#4a62b8'), hex('#6a8ad0')];
  for (let j = 0; j < suelo; j++) { const c = j < hud ? hex('#101018') : BAND[Math.min(4, Math.floor((j - hud) / Math.max(1, (suelo - hud) / 5)))]; for (let i = 0; i < GW; i++) cel(i, j, c); }
  for (let k = 0; k < 9; k++) { const i = Math.floor(h(k, 1, 51) * GW), j = hud + 1 + Math.floor(h(k, 2, 51) * (suelo - hud) * 0.45); if (Math.sin(t * 3 + k * 2) > -0.3) cel(i, j, hex('#e8e8ff')); }
  // hierba (dos verdes) y tierra a bandas
  for (let i = 0; i < GW; i++) { cel(i, suelo, (i + Math.floor(t * 2)) % 4 ? hex('#4ac84a') : hex('#7ae86a')); cel(i, suelo + 1, hex('#2a9a3a')); }
  for (let j = suelo + 2; j < GH; j++) { const c = [hex('#8a5a2a'), hex('#7a4a22'), hex('#6a3e1c')][Math.floor((j - suelo - 2) / 3) % 3]; for (let i = 0; i < GW; i++) cel(i, j, (i * 3 + j * 5) % 11 === 0 ? hex('#a87a3a') : c); }
  // los fosos: pozos negros con el borde
  const FOS = [0.24, 0.56, 0.84].map((f) => Math.round(GW * f)), fa = 3;
  for (const fx of FOS) for (let j = suelo; j < GH - 1; j++) for (let i = fx - fa; i <= fx + fa; i++) cel(i, j, i === fx - fa || i === fx + fa ? hex('#3a2410') : j === GH - 2 ? hex('#1a1210') : hex('#05040a'));
  // flores (una se mece) en la hierba
  for (const [fi, col] of [[Math.round(GW * 0.1), hex('#f07aa8')], [Math.round(GW * 0.4), hex('#f0d040')], [Math.round(GW * 0.7), hex('#f07aa8')], [Math.round(GW * 0.95), hex('#f0d040')]]) {
    const m = Math.sin(t * 2 + fi) > 0.6 ? 1 : 0; cel(fi, suelo - 1, hex('#2a9a3a')); cel(fi + m, suelo - 2, col); cel(fi - 1 + m, suelo - 3, col); cel(fi + 1 + m, suelo - 3, col); cel(fi + m, suelo - 4, col); cel(fi + m, suelo - 3, hex('#ffffff'));
  }
  // la pieza de teléfono que brilla en el aire (el auricular, a bloques)
  const pz = o.piezas ?? (juego === 'telefono' ? Math.floor(t / 1.8) % 4 : 1);
  if (juego !== 'retocado' || true) { const pi = Math.round(GW * 0.7), pj = suelo - 8 + Math.round(Math.sin(t * 3)), pc = Math.sin(t * 8) > 0 ? hex('#f8f8f8') : hex('#c8c8d8');
    for (const [a, b] of [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1], [-1, 1], [4, 1]]) cel(pi + a, pj + b, pc); }
  // el marcador: la puntuación en cifras y las tres piezas del teléfono
  const pt = String(o.puntos ?? (1200 + Math.floor(t * 3) * 10)), e = Math.max(1, s);
  a_digitos(R, pt, x0 + 2 * s, y0 + s, e, hex('#f0d040'));
  for (let k = 0; k < 3; k++) { const i0 = GW - 14 + k * 4, col = k < pz ? hex('#f0f0f0') : hex('#3a3a4a'); for (const [a, b] of [[0, 1], [1, 1], [2, 1], [0, 2], [2, 2]]) cel(i0 + a, b + 1, col); }
  // el muñequito verde: cabeza redonda, ojos, cuerpo y piernas que andan (genérico, sin cuello largo)
  let mi, mj = suelo - 1, cae = 0, salto = 0;
  if (o.cae != null) {
    const u = Math.max(0, Math.min(1, o.cae)); mi = FOS[0];
    if (u < 0.35) { const v = u / 0.35; mi = Math.round(FOS[0] - 6 + v * 6); mj = suelo - 1 + Math.round(Math.max(0, v - 0.45) / 0.55 * (GH - suelo - 3)); cae = v > 0.45 ? 1 : 0; }
    else if (u < 0.55) { mj = GH - 3; cae = 1; }
    else { const v = (u - 0.55) / 0.45; mj = Math.round(GH - 3 - v * (GH - suelo - 2)); cae = v < 1 ? 2 : 0; }
  } else {
    const ciclo = GW + 12; mi = Math.round(((t * 7) % ciclo) - 6);
    if (juego === 'retocado') for (const fx of FOS) { const d = mi - fx; if (Math.abs(d) < 7) salto = Math.round((1 - (d / 7) ** 2) * 6); }
    else if (juego === 'fosos') { for (const fx of FOS) if (Math.abs(mi - fx) < fa) { const d = ((t * 7) % ciclo); mi = fx; mj = suelo - 1 + Math.min(GH - suelo - 2, Math.round((d % 1) * 0)); } }
  }
  mj -= salto;
  const V = hex('#5adc5a'), VS = hex('#2a8a3a'), paso = Math.floor(t * 8) % 2;
  const recorta = cae ? (i, j) => j <= GH - 2 : () => true;
  const M = (a, b, c) => { const i = mi + a, j = mj + b; if (recorta(i, j)) cel(i, j, c); };
  M(-1, -6, V); M(0, -6, V); M(1, -6, V); M(-1, -5, V); M(0, -5, hex('#0a2a0a')); M(1, -5, V); M(-2, -5, V); M(2, -5, V);
  M(-1, -4, V); M(0, -4, V); M(1, -4, V);
  for (let a = -1; a <= 1; a++) { M(a, -3, VS); M(a, -2, V); }
  if (cae === 2) { M(-2, -4, V); M(2, -4, V); } else { M(-2, -3, V); M(2, -3, V); }
  M(-1, -1, VS); M(1, -1, VS); if (salto || cae) { M(-1, 0, V); M(1, 0, V); } else { M(paso ? -2 : -1, 0, V); M(paso ? 1 : 2, 0, V); }
  return { suelo: y0 + suelo * s, fosos: FOS.map((f) => x0 + f * s), s };
}

// un juego inventado de naves para la tele de 1977 (si la escena no pasa o.pantalla): estrellas que corren, dos naves
// de colores que se disparan y bloques que saltan en pedazos
function a_naves(R, t, [x0, y0, x1, y1]) {
  const W = x1 - x0 + 1, H = y1 - y0 + 1, s = Math.max(1, Math.round(W / 40));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, hex('#0a0c1e'));
  for (let k = 0; k < 14; k++) { const x = x0 + Math.floor(((h(k, 1, 61) * W) - t * (6 + k % 3 * 5) % W + W) % W), y = y0 + Math.floor(h(k, 2, 61) * H); R.pset(x, y, k % 3 ? hex('#6a6a9a') : hex('#e8e8ff')); }
  const nave = (cx, cy, col, d) => { for (const [a, b] of [[0, 0], [1, 0], [2, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [1, 1], [2 * d, 0], [-d, -1], [-d, 1]]) a_caja(R, cx + a * s, cy + b * s, cx + a * s + s - 1, cy + b * s + s - 1, col); };
  const ay = Math.round(y0 + H * 0.3 + Math.sin(t * 1.4) * H * 0.18), by = Math.round(y0 + H * 0.66 + Math.sin(t * 1.1 + 2) * H * 0.16);
  nave(x0 + 3 * s, ay, hex('#e8803a'), 1); nave(x1 - 4 * s, by, hex('#5adc5a'), -1);
  for (let k = 0; k < 2; k++) { const u = (t * 0.9 + k * 0.5) % 1, x = Math.round(x0 + 6 * s + u * (W - 12 * s)), y = Math.round(ay + (by - ay) * u); if (h(Math.floor(t * 0.9 + k * 0.5), k, 62) < 0.8) a_caja(R, x, y, x + s - 1, y, k ? hex('#f0f0a0') : hex('#f06a4a')); }
  for (let k = 0; k < 4; k++) { const x = Math.round(x0 + W * (0.35 + k * 0.1)), y = Math.round(y0 + H * (0.2 + (k % 2) * 0.5)); a_caja(R, x, y, x + 2 * s, y + 2 * s, [hex('#d84a4a'), hex('#4a8ad8'), hex('#d8c84a'), hex('#a84ad8')][k]); }
  a_digitos(R, String(Math.floor(t * 2) % 100), x0 + 2, y0 + 2, 1, hex('#e8803a'));
}

// ═══ 'bar72' ═══
function a_bar72Fijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de vigas, oscuro y tranquilo
  for (let y = 0; y <= 17; y++) for (let x = 0; x < 320; x++) { const vi = (x + 20) % 64 < 9; let c = vi ? hex('#36201a') : hex('#281612');
    if (y === 17) c = hex('#1a0e0c'); else if (vi && (x + 20) % 64 === 0) c = hex('#42281e'); else if (!vi && h(x >> 1, y, 1) < 0.06) c = hex('#301a16'); pset(x, y, c); }
  // el papel pintado granate con rombos y florecillas (sin dibujo en la esquina de Atom), más oscuro arriba
  for (let y = 18; y <= 95; y++) for (let x = 0; x < 320; x++) {
    let c = hex('#5a2622'); const q = (x + y) % 14, r = (x - y + 280) % 14, tranquila = x > 270 && y < 50;
    if (!tranquila && (q === 0 || r === 0)) c = hex('#6c3029');
    if (!tranquila && (x % 14 === 7) && (y % 14 === 0)) c = hex('#8a4a32');
    if (y < 30 && a_tr(x, y) > (y - 18) / 12) c = a_mezcla(c, hex('#000000'), 0.3);
    if (h(x, y, 2) < 0.03) c = hex('#4a1e1c');
    pset(x, y, c);
  }
  // el friso de tablas y el rodapié
  rect(0, 96, 319, 97, hex('#2e1a10')); rect(0, 96, 319, 96, hex('#8a5a32'));
  a_tablas(R, 0, 98, 319, 123, [hex('#6a3e22'), hex('#3e2212'), hex('#8a5632'), hex('#5a321c')], { w: 11, k: 3 });
  rect(0, 124, 319, 127, hex('#2a1810')); rect(0, 124, 319, 124, hex('#5a3a22'));
  // el suelo de baldosas a cuadros en perspectiva, más oscuro al fondo, con rozaduras
  for (let y = 128; y < 180; y++) { const z = y - 110;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z * 3.2, v = 230 / z, chk = (Math.floor(u) + Math.floor(v)) & 1;
      let c = chk ? hex('#c8b48c') : hex('#5a4638');
      if (Math.abs(u - Math.round(u)) < 0.04 || Math.abs(v - Math.round(v)) < 0.03) c = chk ? hex('#a8946c') : hex('#46362c');
      else if (chk && h(Math.floor(u), Math.floor(v), 6) < 0.3 && h(x, y, 7) < 0.3) c = hex('#bca880');
      if (y < 140 && a_tr(x, y) > (y - 128) / 12) c = a_mezcla(c, hex('#000000'), 0.35);
      if (h(x, y, 4) < 0.025) c = a_mezcla(c, hex('#000000'), 0.3); pset(x, y, c); } }
  // la ventana a la calle: el marco de madera (el hueco se pinta en cada fotograma)
  rect(12, 30, 76, 100, hex('#2a160e')); rect(13, 31, 75, 99, hex('#7a4a28')); rect(13, 31, 75, 31, hex('#a8703e')); rect(13, 31, 13, 99, hex('#a8703e')); rect(75, 32, 75, 99, hex('#4a2a16'));
  rect(10, 98, 78, 101, hex('#8a5a32')); rect(10, 101, 78, 101, hex('#3e2212'));
  // el reservado: el respaldo de vinilo rojo capitoné y el asiento
  rect(8, 102, 82, 127, hex('#2a0e0e')); for (let y = 103; y <= 120; y++) for (let x = 9; x <= 81; x++) { const bx = (x - 9) % 9, by = (y - 103) % 6; let c = hex('#a82a2a'); if (bx === 0 || by === 0) c = hex('#7a1a1e'); else if (bx === 1 || by === 1) c = hex('#c8443a'); if (bx === 4 && by === 3) c = hex('#5a1216'); pset(x, y, c); }
  rect(9, 121, 81, 125, hex('#c8443a')); rect(9, 125, 81, 126, hex('#6a161a')); rect(9, 121, 81, 121, hex('#e8705a'));
  // la máquina de Pong: laterales de madera, marquesina de rayas, el marco negro de la pantalla, el panel, la puerta de las monedas
  a_sombra(R, 108, 142, 26, 3, 0.45);
  rect(88, 84, 128, 142, hex('#1e120a'));
  a_tablas(R, 89, 85, 127, 141, [hex('#8a5a2e'), hex('#5a3418'), hex('#b07a40'), hex('#74482a')], { w: 39, k: 11, nudos: false });
  rect(91, 86, 125, 93, hex('#1a1210')); for (let x = 92; x <= 124; x++) { const c = x % 6 < 2 ? hex('#e8a03a') : x % 6 < 4 ? hex('#f0d060') : hex('#d8582a'); rect(x, 87, x, 92, c); } rect(92, 87, 124, 87, hex('#fff0b0'));
  rect(91, 95, 125, 115, hex('#141012')); rect(92, 96, 124, 96, hex('#3a3236')); rect(94, 96, 122, 114, hex('#05040a'));
  rect(90, 116, 126, 122, hex('#2a2a30')); rect(90, 116, 126, 116, hex('#9a9aa8')); rect(90, 117, 126, 117, hex('#6a6a74'));
  rect(92, 124, 124, 135, hex('#3a3a40')); rect(92, 124, 124, 124, hex('#7a7a84'));
  for (const cx of [101, 115]) { rect(cx - 3, 126, cx + 3, 133, hex('#58585e')); rect(cx - 3, 126, cx + 3, 126, hex('#8a8a92')); rect(cx - 1, 128, cx + 1, 128, hex('#1a1a1e')); }
  rect(88, 136, 128, 142, hex('#1a0e08')); rect(89, 136, 127, 136, hex('#4a2a14'));
  // el póster de surf (una ola, el sol y la tabla, sin letras)
  rect(132, 40, 147, 72, hex('#e8e0c8')); rect(133, 41, 146, 71, hex('#f0a050'));
  for (let y = 41; y <= 71; y++) for (let x = 133; x <= 146; x++) { const u = (y - 41) / 30; pset(x, y, u < 0.45 ? (u + (a_tr(x, y) - 0.5) * 0.15 < 0.25 ? hex('#f0c060') : hex('#e88a50')) : u < 0.55 ? hex('#2a7aa8') : hex('#1a5a8a')); }
  disco(140, 52, 3.5, hex('#fff0a0')); for (let x = 133; x <= 146; x++) { const y = Math.round(56 + Math.sin(x * 0.7) * 1.5); pset(x, y, hex('#e8f8ff')); }
  linea(135, 66, 144, 58, hex('#f8f0e0')); linea(136, 66, 145, 58, hex('#d84a3a')); pset(140, 65, hex('#1a1a1e'));
  rect(132, 40, 147, 40, hex('#b8b09a')); pset(139, 39, hex('#c8c8d0'));
  // el botellero: espejo con su marco, dos estantes con botellas y vasos, y el mueble de abajo con puertas
  rect(150, 40, 262, 95, hex('#2a160c')); rect(152, 42, 260, 93, hex('#4a3e44'));
  for (let y = 42; y <= 93; y++) for (let x = 152; x <= 260; x++) { const d = (x - 152) - (y - 42) * 0.8; let c = (y + Math.floor(x / 3)) % 2 ? hex('#4a3e44') : hex('#544850'); if (d > 30 && d < 36) c = hex('#6a5e66'); if (d > 74 && d < 77) c = hex('#625660'); pset(x, y, c); }
  for (const ys of [64, 92]) { rect(152, ys, 260, ys + 1, hex('#8a5a32')); rect(152, ys + 2, 260, ys + 2, hex('#3a2212')); }
  a_botellas(R, 154, 258, 63, 21); a_botellas(R, 154, 230, 91, 22);
  for (let i = 0; i < 4; i++) for (let j = 0; j <= i; j++) { const x = 236 + j * 6 - i * 3 + 9, y = 91 - (3 - i) * 5; rect(x, y - 3, x + 3, y, hex('#a8c8d0')); pset(x, y - 3, hex('#e8f8ff')); }
  rect(150, 96, 262, 127, hex('#2a160c'));
  a_tablas(R, 151, 97, 261, 126, [hex('#5a321c'), hex('#2e1a0e'), hex('#7a4a28'), hex('#4a2a16')], { w: 22, k: 7 });
  for (let k = 0; k < 5; k++) { const x = 155 + k * 22; rect(x, 101, x + 14, 122, hex('#3a2010')); rect(x + 1, 102, x + 13, 102, hex('#7a4a28')); rect(x + 7, 110, x + 7, 113, hex('#d8a84a')); }
  // la caja registradora de latón sobre el mueble
  rect(232, 78, 254, 95, hex('#2a1a0a')); rect(233, 79, 253, 94, hex('#b88a3a')); rect(233, 79, 253, 80, hex('#e8c060')); for (let x = 235; x <= 251; x += 3) for (let y = 84; y <= 90; y += 3) pset(x, y, hex('#f0e0c0'));
  rect(237, 72, 249, 78, hex('#2a1a0a')); rect(238, 73, 248, 77, hex('#1a1a14'));
  // la gramola: base, rejilla cromada, la ventana de los discos y el arco (los tubos de colores van en cada fotograma)
  a_sombra(R, 286, 142, 24, 3, 0.45);
  disco(286, 106, 20, hex('#2a1408')); rect(266, 106, 306, 142, hex('#2a1408'));
  disco(286, 106, 18, hex('#7a4a28')); rect(268, 106, 304, 141, hex('#7a4a28')); for (let y = 90; y <= 141; y++) { pset(268, y, hex('#a8703e')); pset(304, y, hex('#4a2a16')); }
  disco(286, 106, 12, hex('#3a2a20')); rect(274, 104, 298, 116, hex('#1a1214')); rect(275, 105, 297, 115, hex('#4a6a8a'));
  for (let k = 0; k < 5; k++) { disco(279 + k * 4.5, 111, 2.2, hex('#141018')); pset(279 + k * 4.5, 110, hex('#d8a84a')); }
  rect(272, 118, 300, 134, hex('#3a3a44')); for (let y = 119; y <= 133; y++) for (let x = 273; x <= 299; x++) pset(x, y, (x + y) % 3 === 0 ? hex('#e8e8f0') : (x % 3 === 0 ? hex('#8a8a98') : hex('#5a5a66')));
  rect(270, 136, 302, 141, hex('#4a2a16')); rect(270, 136, 302, 136, hex('#c8a060'));
  // las dos lámparas colgantes (cable, pantalla de cristal verde) y su luz en la pared
  for (const lx of [108, 206]) { linea(lx, 18, lx, 33, hex('#141010'));
    for (let y = 38; y <= 120; y++) { const r = (y - 38) * 0.45 + 4; for (let x = Math.round(lx - r); x <= lx + r; x++) if ((x + y) % 2 === 0 && h(x, y, 8) < 0.7) { const p = R.pget(x, y); pset(x, y, a_mezcla(p, hex('#f8d890'), 0.12)); } }
    poligono([[lx - 3, 33], [lx + 3, 33], [lx + 8, 39], [lx - 8, 39]], hex('#1e5a3a')); linea(lx - 2, 34, lx - 6, 38, hex('#4a9a6a')); rect(lx - 8, 39, lx + 8, 39, hex('#0e3a22')); rect(lx - 2, 40, lx + 2, 41, hex('#fff4c0')); }
  // el motor del ventilador de techo
  rect(246, 18, 254, 21, hex('#1a1210')); rect(247, 22, 253, 25, hex('#6a4a2a')); rect(248, 22, 250, 22, hex('#a8784a'));
}

function a_bar72(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(a_capa(R, 'bar72', () => a_bar72Fijo(R)));
  // la calle por la ventana: el cielo de anochecer, el diner de enfrente, palmeras, la acera, un coche y un paseante
  const V = [16, 34, 72, 96];
  a_cielo(R, t, V, [hex('#4a3a8a'), hex('#8a5aa0'), hex('#d8789a'), hex('#f0a07a'), hex('#f8c88a')], [hex('#f8c0b0'), hex('#d888a0'), hex('#9a5a8a')], { n: 3, alto: 0.25, k: 4 });
  R.recorte(V);
  a_caja(R, 16, 62, 72, 84, hex('#3a2a4a')); a_caja(R, 22, 58, 60, 62, hex('#4a3458')); a_caja(R, 16, 62, 72, 63, hex('#5a4468'));
  for (let k = 0; k < 6; k++) { const x = 19 + k * 9, on = Math.sin(t * 0.7 + k * 1.9) > -0.7; a_caja(R, x, 67, x + 5, 74, on ? hex('#f8d888') : hex('#5a4a5a')); a_caja(R, x, 67, x + 5, 67, on ? hex('#fff4c8') : hex('#6a5a6a')); }
  a_caja(R, 30, 52, 31, 58, hex('#2a2030')); { const on = Math.sin(t * 5) > -0.2; R.disco(31, 50, 3, on ? hex('#f86a8a') : hex('#6a3a4a')); R.disco(31, 50, 1.5, on ? hex('#ffd0e0') : hex('#5a2a3a')); }
  a_palmera(R, 22, 86, 34, t, { c: [hex('#4a3040'), hex('#2e1e2a'), hex('#2e4a3a'), hex('#1e3428'), hex('#4a6a4a')] });
  a_palmera(R, 64, 86, 30, t + 1, { c: [hex('#4a3040'), hex('#2e1e2a'), hex('#2e4a3a'), hex('#1e3428'), hex('#4a6a4a')], curva: -0.15 });
  a_caja(R, 16, 84, 72, 88, hex('#8a7a7a')); a_caja(R, 16, 84, 72, 84, hex('#b8a8a0')); a_caja(R, 16, 89, 72, 96, hex('#3a3440')); for (let x = 18; x < 72; x += 8) pset(x + Math.round(t * 0) , 93, hex('#c8b860'));
  { const ciclo = 11, u = (t % ciclo) / ciclo, cx = Math.round(-36 + u * 170); a_coche(R, cx, 95, hex('#2a8a7a'), t, { faros: true }); }
  { const px = Math.round(80 - ((t * 5 + 30) % 90)); a_gente(R, px, 87, t, hex('#c8603a'), { anda: true, dir: -1 }); }
  R.recorte(null);
  // el parteluz, la persiana a medio bajar y el neón de copa que cuelga del cristal
  rect(43, 32, 45, 98, hex('#7a4a28')); rect(43, 32, 43, 98, hex('#a8703e'));
  for (let y = 34; y <= 46; y += 2) { rect(16, y, 72, y, hex('#d8c8a8')); rect(16, y + 1, 72, y + 1, hex('#a89878')); } rect(16, 47, 72, 47, hex('#8a7858'));
  for (const x of [28, 58]) linea(x, 34, x, 47, hex('#6a5a4a'));
  { const on = (Math.sin(t * 13) > -0.95 || Math.floor(t * 2) % 7) ? 1 : 0;
    a_neon(R, [[[50, 58], [64, 58], [57, 66], [50, 58]], [[57, 66], [57, 74]], [[53, 74], [61, 74]], [[61, 56], [65, 52]]], hex('#f05a9a'), on);
    R.disco(54, 59, 1.2, on ? hex('#8ae86a') : hex('#3a5a3a')); }
  // el reservado: dos parroquianos que beben, la mesa, el cenicero y su humo
  a_gente(R, 24, 122, t, hex('#3a6a9a'), { sentado: true, dir: 1, brazo: Math.sin(t * 0.9) > 0.7 ? 1 : 0, pelo: hex('#2a1a10') });
  a_gente(R, 66, 122, t, hex('#d8a03a'), { sentado: true, dir: -1, brazo: Math.sin(t * 0.7 + 2) > 0.8 ? 1 : 0, pelo: hex('#a8743c'), piel: hex('#c88a60') });
  rect(30, 113, 60, 115, hex('#2a1408')); rect(30, 113, 60, 113, hex('#a8703e')); rect(43, 116, 47, 125, hex('#3a3a40'));
  rect(36, 109, 38, 112, hex('#e8c060')); rect(36, 109, 38, 109, hex('#fff8e0')); rect(52, 109, 54, 112, hex('#a8c8d0'));
  rect(46, 111, 49, 112, hex('#6a6a74')); a_humo(R, 47, 110, t, hex('#c8c0c8'), { alto: 20, n: 7 });
  // la pantalla del Pong
  const pong = a_pong(R, t, [95, 97, 121, 113], { marcador: o.marcador, vel: o.vel });
  a_crt(R, 94, 96, 122, 114, { barrido: 0.12 });
  // los tres neones de la pared del fondo, cada uno con su parpadeo
  const pa = (k) => (Math.sin(t * (9 + k * 4) + k) > -0.9 || Math.floor(t * 1.5 + k) % 5 ? 1 : 0);
  a_neon(R, [[[170, 22], [173, 29], [181, 29], [175, 33], [177, 40], [170, 36], [163, 40], [165, 33], [159, 29], [167, 29], [170, 22]]], hex('#f0d040'), pa(0));
  a_neon(R, [[[198, 24], [214, 24], [206, 32], [198, 24]], [[206, 32], [206, 38]], [[201, 38], [211, 38]], [[204, 27], [208, 27]]], hex('#4ad8e8'), pa(1));
  a_neon(R, [[[236, 22], [244, 22], [239, 30], [248, 30], [234, 40], [240, 32], [232, 32], [236, 22]]], hex('#f05a3a'), pa(2) * (Math.floor(t * 4) % 9 === 3 ? 0 : 1));
  // los reflejos de los neones en las baldosas
  for (const [x, c] of [[170, hex('#f0d040')], [206, hex('#4ad8e8')], [240, hex('#f05a3a')]]) for (let y = 129; y < 136; y++) for (let i = -4; i <= 4; i++) if ((i + y) % 2 === 0) pset(x + i + (y - 129), y, a_mezcla(R.pget(x + i + (y - 129), y), c, 0.18));
  // la gramola: los tubos del arco cambian de color y suben burbujas
  const TUB = [hex('#f05a3a'), hex('#f0b03a'), hex('#f0e060'), hex('#5ad86a'), hex('#4ab8f0'), hex('#c06ae8')];
  for (let k = 0; k < 3; k++) { const r = 17 - k * 2, c = TUB[(Math.floor(t * 2) + k * 2) % 6];
    for (let a = 0; a <= 40; a++) { const an = Math.PI + a / 40 * Math.PI; pset(Math.round(286 + Math.cos(an) * r), Math.round(106 + Math.sin(an) * r), c); } }
  for (const x of [270, 302]) for (let y = 106; y <= 134; y++) pset(x, y, TUB[(Math.floor(t * 2 - y / 6) % 6 + 6) % 6]);
  for (let k = 0; k < 6; k++) { const x = k % 2 ? 302 : 270, y = Math.round(134 - ((t * 9 + k * 5) % 28)); pset(x, y, hex('#ffffff')); }
  { const lx = 279 + (Math.floor(t * 0.5) % 5) * 4.5; pset(Math.round(lx), 107, hex('#fff0a0')); }
  // el ventilador de techo que gira (aspas en escorzo)
  for (let k = 0; k < 4; k++) { const an = t * 5 + k * Math.PI / 2, ex = Math.cos(an) * 22, ey = Math.sin(an) * 2.5;
    linea(250, 24, Math.round(250 + ex), Math.round(24 + ey), hex('#5a3a22')); linea(250, 25, Math.round(250 + ex * 0.9), Math.round(25 + ey), hex('#3a2414')); }
  rect(248, 24, 252, 27, hex('#2a1a10')); rect(249, 28, 251, 29, hex('#f8e8b0'));
  // destellos que corren por las botellas
  for (let k = 0; k < 3; k++) { const x = 156 + Math.floor(((t * 0.6 + k * 0.33) % 1) * 100); pset(x, k % 2 ? 56 : 84, hex('#fff8e0')); }
  return { suelo: 152, pong: [108, 142], pantalla: [95, 97, 121, 113], ventana: V, reservado: [8, 102, 82, 127], botellero: [150, 40, 262, 127], gramola: [266, 86, 306, 142], barra: [146, 131, 320, 180], pelota: pong.pelota };
}

// la barra acolchada (tablero y 131–138) con grifos, vasos, cacahuetes y el cenicero, y dos taburetes
function a_bar72Delante(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R;
  // los taburetes (por detrás del canto de la barra no: van delante, a los lados)
  const taburete = (x) => { a_sombra(R, x, 178, 9, 2, 0.4); rect(x - 1, 158, x + 1, 176, hex('#c8ccd4')); pset(x - 1, 160, hex('#ffffff')); rect(x - 6, 168, x + 6, 168, hex('#9a9ea8')); rect(x - 7, 176, x + 7, 178, hex('#6a6e78')); rect(x - 7, 176, x + 7, 176, hex('#c8ccd4'));
    disco(x, 153, 8, hex('#3a0e0e')); disco(x, 152, 7.5, hex('#b82a2a')); disco(x - 2, 151, 3.5, hex('#e05a4a')); rect(x - 8, 155, x + 8, 157, hex('#7a7e88')); rect(x - 8, 155, x + 8, 155, hex('#d8dce4')); };
  // el tablero de madera brillante y el rulo acolchado
  poligono([[150, 130], [320, 130], [320, 138], [146, 138]], hex('#2a1408'));
  for (let y = 131; y <= 136; y++) for (let x = 149 - (y - 131); x <= 319; x++) { let c = (h(x >> 2, y, 31) < 0.3) ? hex('#6a3a1c') : hex('#7e4826'); if (y === 131) c = hex('#b07a46'); const b = Math.round((t * 22) % 260) + 120; if (Math.abs(x - b - (y - 131) * 2) < 3) c = hex('#c8925a'); pset(x, y, c); }
  rect(144, 137, 319, 140, hex('#5a1216')); rect(144, 137, 319, 137, hex('#d84a3a')); rect(144, 138, 319, 138, hex('#a82a2a'));
  // el frente capitoné, el pasamanos de latón y el zócalo
  for (let y = 141; y <= 171; y++) for (let x = 146; x <= 319; x++) { const bx = (x - 146) % 12, by = (y - 141) % 8, dd = Math.abs(bx - 6) + Math.abs(by - 4); let c = hex('#9a2626'); if (dd <= 1) c = hex('#5a1014'); else if (dd > 6) c = hex('#7a1a1e'); else if (bx < 4 && by < 3) c = hex('#c03a32'); if (x < 149) c = hex('#6a161a'); pset(x, y, c); }
  rect(146, 141, 146, 171, hex('#3a0a0c'));
  rect(146, 162, 319, 163, hex('#c8a040')); rect(146, 162, 319, 162, hex('#f8e090')); rect(146, 164, 319, 164, hex('#6a4a10'));
  for (let x = 160; x < 320; x += 40) { rect(x, 160, x + 1, 165, hex('#8a6a20')); }
  rect(146, 172, 319, 179, hex('#2a1408')); rect(146, 172, 319, 172, hex('#5a3418'));
  // la torre de grifos de cerveza (tres mangos de color) y lo que hay en la barra
  rect(232, 116, 240, 131, hex('#8a8e98')); rect(233, 116, 234, 131, hex('#e0e4ec')); rect(230, 114, 242, 116, hex('#c8ccd4'));
  for (const [k, c] of [[0, hex('#d84a3a')], [1, hex('#e8c040')], [2, hex('#3a8ad8')]]) { const x = 229 + k * 5, y = 106 + (k === 1 ? Math.round(Math.sin(t) * 0) : 0); rect(x, y, x + 2, y + 8, c); rect(x, y, x + 2, y, hex('#ffffff')); rect(x + 1, y + 9, x + 1, 117, hex('#c8ccd4')); }
  const vaso = (x, lleno) => { rect(x, 121, x + 5, 130, hex('#c8e0e8')); rect(x + 1, 121 + (lleno ? 2 : 6), x + 4, 129, hex('#e8a83a')); if (lleno) { rect(x + 1, 121, x + 4, 123, hex('#fff8ec')); } pset(x + 1, 125, hex('#fff4c0')); if (Math.sin(t * 3 + x) > 0.4) pset(x + 3, 127 - Math.floor((t * 6 + x) % 4), hex('#fff0b0')); };
  vaso(172, true); vaso(282, true); vaso(300, false);
  disco(204, 128, 5, hex('#3a3a40')); disco(204, 127, 4.5, hex('#c8c8d0')); for (let k = 0; k < 9; k++) pset(201 + (k % 4) * 2, 124 + Math.floor(k / 4), hex('#c8904a'));
  rect(258, 126, 264, 130, hex('#4a4a54')); rect(259, 126, 263, 126, hex('#8a8a94')); a_humo(R, 261, 125, t + 1, hex('#d0c8d0'), { alto: 22 });
  rect(186, 123, 194, 130, hex('#c8ccd4')); for (let y = 124; y <= 129; y++) rect(187, y, 193, y, y % 2 ? hex('#f8f8f0') : hex('#e0e0d8'));
  taburete(176); taburete(306);
  return { barra: [146, 130, 320, 180], taburetes: [176, 306] };
}

// la pantalla del Pong de cerca: marco negro, panel con mandos, monedas y una cerveza
function a_bar72PantallaFijo(R) {
  const { rect, pset, disco, linea } = R;
  // el frente de la máquina: madera de chapa con veta horizontal
  a_tablas(R, 0, 0, 319, 179, [hex('#8a5a2e'), hex('#5a3418'), hex('#a8743e'), hex('#74482a')], { w: 45, vertical: false, k: 41 });
  a_velo(R, 272, 0, 319, 48, hex('#6a4426'), 0.5);
  // el bisel de la pantalla, con su sombra
  rect(44, 16, 276, 130, hex('#0c0a0c')); rect(42, 14, 278, 15, hex('#3a2414')); rect(277, 16, 278, 131, hex('#c8925a')); rect(42, 131, 278, 132, hex('#c8925a'));
  rect(48, 20, 272, 124, hex('#1a1618')); rect(48, 20, 272, 20, hex('#2e282c'));
  // el panel de los mandos: chapa negra con rayas y los dos mandos
  rect(20, 136, 300, 179, hex('#1a1a1e')); rect(20, 136, 300, 137, hex('#8a8a96')); rect(20, 138, 300, 138, hex('#4a4a54'));
  for (let x = 24; x < 300; x += 7) rect(x, 141, x + 3, 141, hex('#2e2e34'));
  for (const cx of [100, 220]) { disco(cx + 1, 152, 14, hex('#0a0a0c')); disco(cx, 150, 13, hex('#3a3a42')); disco(cx, 150, 11, hex('#c8ccd4')); disco(cx - 2, 148, 7, hex('#e8ecf4')); disco(cx, 150, 5, hex('#8a8e98'));
    for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 12), Math.round(150 + Math.sin(a) * 12), k % 2 ? hex('#6a6e78') : hex('#a8acb4')); } }
  // la ranura de las monedas y la pila de monedas
  rect(150, 144, 170, 174, hex('#2a2a30')); rect(150, 144, 170, 144, hex('#6a6a74')); rect(158, 150, 162, 162, hex('#0a0a0c'));
  for (let k = 0; k < 6; k++) { const y = 172 - k * 2; rect(176, y, 186, y + 1, k % 2 ? hex('#a8acb4') : hex('#d8dce4')); pset(176, y, hex('#6a6e78')); }
  rect(188, 174, 196, 175, hex('#c8ccd4')); rect(189, 174, 195, 174, hex('#f0f4f8'));
}

function a_bar72Pantalla(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(a_capa(R, 'bar72p', () => a_bar72PantallaFijo(R)));
  const p = a_pong(R, t, [56, 26, 264, 118], { marcador: o.marcador, vel: o.vel });
  a_crt(R, 52, 22, 268, 122, { marco: hex('#1a1618') });
  // el resplandor de la pantalla en el bisel
  for (let x = 52; x <= 268; x += 2) pset(x, 124, a_mezcla(R.pget(x, 124), hex('#a8e8c8'), 0.12));
  // los mandos giran con las palas
  for (const [cx, py] of [[100, p.palas[0]], [220, p.palas[1]]]) { const a = -Math.PI * 0.75 + (py - 26) / 80 * Math.PI * 1.5; linea(cx, 150, Math.round(cx + Math.cos(a) * 9), Math.round(150 + Math.sin(a) * 9), hex('#1a1a1e')); pset(Math.round(cx + Math.cos(a) * 9), Math.round(150 + Math.sin(a) * 9), hex('#d84a3a')); }
  // la luz naranja de la ranura, que tiembla
  const lz = 0.6 + Math.sin(t * 7) * 0.2 + (h(Math.floor(t * 9), 1, 3) < 0.1 ? -0.4 : 0);
  for (let y = 147; y <= 165; y++) for (let x = 153; x <= 167; x++) if (x < 158 || x > 162 || y < 150 || y > 162) { const d = Math.hypot(x - 160, (y - 156) * 0.7); if (d < 8 && (x + y) % 2 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8a040'), lz * (1 - d / 8))); }
  rect(158, 150, 162, 162, a_mezcla(hex('#3a1a0a'), hex('#f88a2a'), lz));
  // la cerveza que suda en el canto del panel
  rect(268, 140, 284, 174, hex('#c8e0e8')); rect(270, 148, 282, 173, hex('#d8902a')); rect(270, 142, 282, 148, hex('#fff8ec')); rect(270, 148, 282, 148, hex('#f8e0a0'));
  rect(271, 150, 272, 170, hex('#f0b850')); rect(268, 140, 268, 174, hex('#e8f8ff'));
  for (let k = 0; k < 5; k++) { const y = Math.round(172 - ((t * 10 + k * 7) % 22)); pset(274 + k * 2, y, hex('#fff0c0')); }
  for (let k = 0; k < 3; k++) { const y = Math.round(150 + ((t * 3 + k * 9) % 24)); pset(284, y, hex('#e8f8ff')); }
  return { suelo: 179, pantalla: [56, 26, 264, 118], mandos: [[100, 150], [220, 150]], ranura: [160, 156], pelota: p.pelota, palas: p.palas };
}

// ═══ 'salon77' ═══
function a_salon77Fijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de gotelé y la moldura
  for (let y = 0; y <= 13; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 1) < 0.2 ? hex('#c8bc9e') : h(x, y, 2) < 0.1 ? hex('#e4dac0') : hex('#d6cbb0'));
  rect(0, 14, 319, 15, hex('#a8946e')); rect(0, 14, 319, 14, hex('#ece2c8'));
  // el papel pintado: rayas marrones con florecillas naranjas (lisas en la esquina de Atom), más oscuro arriba
  for (let y = 16; y <= 99; y++) for (let x = 0; x < 320; x++) { const tranquila = x > 270 && y < 50; let c = (x >> 3) & 1 ? hex('#7a5232') : hex('#6e4a2c'); if ((x & 7) === 0) c = hex('#62422a');
    if (tranquila) c = a_tr(x, y) < 0.5 ? hex('#74502f') : hex('#704c2e'); const fx = (x + (Math.floor(y / 20) % 2) * 8) % 16, fy = y % 20;
    if (!tranquila && ((fx === 8 && (fy === 9 || fy === 11)) || (fy === 10 && (fx === 7 || fx === 9)))) c = hex('#c8783a'); if (!tranquila && fx === 8 && fy === 10) c = hex('#e8b050');
    if (y < 26 && a_tr(x, y) > (y - 16) / 10) c = a_mezcla(c, hex('#000000'), 0.25); pset(x, y, c); }
  rect(0, 100, 319, 101, hex('#3e2414')); rect(0, 100, 319, 100, hex('#a8784a'));
  a_tablas(R, 0, 102, 319, 128, [hex('#6a4426'), hex('#3e2614'), hex('#8a5c34'), hex('#5a3820')], { w: 9, k: 13 });
  rect(0, 129, 319, 131, hex('#2e1c10')); rect(0, 129, 319, 129, hex('#7a5232'));
  // la moqueta naranja de pelo largo
  a_moqueta(R, 0, 132, 319, 179, [hex('#c0602a'), hex('#8e4420'), hex('#e0843e')], { pelo: true, k: 17 });
  // la estantería de discos: tres baldas con lomos de colores, libros y un trofeo
  rect(4, 50, 36, 131, hex('#2a1a0c')); a_tablas(R, 5, 51, 35, 130, [hex('#7a4e2a'), hex('#4a2c16'), hex('#9a683a'), hex('#6a4224')], { w: 31, k: 15, nudos: false });
  for (const ys of [76, 102, 128]) { rect(5, ys, 35, ys + 2, hex('#9a683a')); rect(5, ys + 2, 35, ys + 2, hex('#3a2212')); }
  const LP = [hex('#d84a3a'), hex('#e8c040'), hex('#3a8ad8'), hex('#f0f0e0'), hex('#2a2a30'), hex('#5aa84a'), hex('#e87a2a'), hex('#a84ad8')];
  for (const [y0, y1] of [[54, 75], [80, 101], [106, 127]]) { let x = 7; while (x < 33) { const c = LP[Math.floor(h(x, y0, 5) * 8)], alto = y1 - y0 - Math.floor(h(x, y0, 6) * 6), inclin = h(x, y0, 7) < 0.15; rect(x, y1 - alto, x, y1, c); rect(x + 1, y1 - alto, x + 1, y1, a_mezcla(c, hex('#000000'), 0.35)); if (inclin) pset(x + 2, y1 - alto + 1, c); x += 2 + (inclin ? 1 : 0); } }
  rect(14, 44, 26, 50, hex('#c8a040')); rect(18, 40, 22, 44, hex('#e8c860')); disco(20, 38, 3, hex('#f0d878')); pset(19, 37, hex('#fff8d0'));
  // el cuadro del velero
  rect(110, 38, 136, 62, hex('#5a3a1a')); rect(111, 39, 135, 61, hex('#c8a050')); rect(113, 41, 133, 59, hex('#8ac8e8'));
  for (let y = 41; y <= 59; y++) for (let x = 113; x <= 133; x++) if (y > 52) pset(x, y, (x + y) % 5 ? hex('#2a6aa8') : hex('#8ac0e8')); else if (y < 46 && a_tr(x, y) > 0.5) pset(x, y, hex('#aad8f0'));
  poligono([[122, 43], [122, 51], [128, 51]], hex('#f8f4e8')); poligono([[121, 45], [121, 51], [117, 51]], hex('#e8d8c0')); rect(117, 52, 128, 53, hex('#8a3a2a')); disco(129, 45, 2, hex('#f8e080'));
  // la ventana con el marco blanco, el alféizar, la cortina dorada con pliegues y la galería
  rect(158, 24, 234, 94, hex('#e8e0d0')); rect(156, 92, 236, 95, hex('#f0ece0')); rect(156, 95, 236, 95, hex('#8a7a60'));
  const cortina = (x0, x1) => { for (let y = 20; y <= 104; y++) for (let x = x0; x <= x1; x++) { const f = (x - x0 + Math.round(Math.sin(y * 0.1) * 0.6)) % 4; pset(x, y, f === 0 ? hex('#8a6a1e') : f === 1 ? hex('#e8c060') : f === 3 ? hex('#a8841e') : hex('#c8a040')); } for (let x = x0; x <= x1; x++) pset(x, 104, hex('#6a4a10')); };
  cortina(148, 160); cortina(232, 244);
  rect(144, 16, 248, 22, hex('#5a3a1a')); for (let x = 145; x <= 247; x++) { pset(x, 17, hex('#8a5c34')); if (x % 6 === 0) pset(x, 21, hex('#3a2010')); } rect(144, 22, 248, 22, hex('#2a1808'));
  // el reloj de sol de la pared (los rayos dorados; las agujas en cada fotograma)
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, L = k % 2 ? 12 : 9; linea(Math.round(262 + Math.cos(a) * 5), Math.round(62 + Math.sin(a) * 5), Math.round(262 + Math.cos(a) * L), Math.round(62 + Math.sin(a) * L), k % 2 ? hex('#c89a30') : hex('#e8c050')); pset(Math.round(262 + Math.cos(a) * L), Math.round(62 + Math.sin(a) * L), hex('#f8e8a0')); }
  disco(262, 62, 5, hex('#5a3a10')); disco(262, 62, 4.3, hex('#f4ecd4'));
  // la lámpara de pie: base, poste y la pantalla de tambor con su luz en la pared
  for (let y = 58; y <= 120; y++) for (let x = 270; x <= 314; x++) { const d = Math.hypot(x - 292, (y - 66) * 0.8); if (d < 26 && (x + y) % 2 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8e0a0'), 0.18 * (1 - d / 26))); }
  rect(291, 70, 292, 148, hex('#c8a040')); rect(291, 70, 291, 148, hex('#f0d880')); rect(285, 148, 298, 150, hex('#5a4010')); rect(285, 148, 298, 148, hex('#c8a040'));
  poligono([[284, 56], [300, 56], [303, 70], [281, 70]], hex('#e8dcb8')); for (let y = 57; y <= 69; y++) { pset(282 + Math.round((70 - y) * 0.2), y, hex('#c8b890')); pset(301 - Math.round((70 - y) * 0.2), y, hex('#c8b890')); }
  rect(281, 70, 303, 70, hex('#fff4c8'));
  // la tele de pie de madera: mueble, bisel, el hueco de la pantalla, los mandos, el altavoz y las patas
  a_sombra(R, 74, 132, 38, 3, 0.4);
  rect(38, 82, 110, 130, hex('#24140a'));
  a_tablas(R, 39, 83, 109, 129, [hex('#7a4a26'), hex('#4a2a14'), hex('#9a643a'), hex('#683e20')], { w: 71, vertical: false, k: 19, nudos: false });
  rect(39, 83, 109, 85, hex('#a8703e')); rect(39, 83, 109, 83, hex('#c8925a'));
  rect(45, 89, 91, 125, hex('#1a120c')); rect(46, 90, 90, 124, hex('#3a2a22')); rect(46, 90, 90, 90, hex('#5a463a'));
  rect(93, 89, 105, 125, hex('#3a2414')); for (let y = 105; y <= 124; y++) for (let x = 94; x <= 104; x++) pset(x, y, (x + y) % 2 ? hex('#6a5a3a') : hex('#4a3a24'));
  for (const [cy, r] of [[95, 3], [101, 2]]) { disco(99, cy, r + 0.5, hex('#1a1a1a')); disco(99, cy, r, hex('#c8c8c0')); pset(98, cy - 1, hex('#ffffff')); }
  rect(42, 130, 46, 131, hex('#2a1a0c')); rect(102, 130, 106, 131, hex('#2a1a0c'));
  // encima de la tele: una planta y una foto enmarcada
  rect(44, 76, 52, 82, hex('#c86a3a')); rect(44, 76, 52, 76, hex('#e88a5a'));
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * 0.45; linea(48, 76, Math.round(48 + Math.cos(a) * 8), Math.round(76 + Math.sin(a) * 7), k % 2 ? hex('#3a8a3a') : hex('#5aa84a')); }
  rect(96, 74, 106, 82, hex('#c8a040')); rect(97, 75, 105, 81, hex('#8ab8d8')); rect(97, 79, 105, 81, hex('#5a9a4a')); disco(101, 77, 1.2, hex('#e8a080'));
  // la mesita auxiliar de la lámpara de lava
  rect(112, 112, 134, 114, hex('#5a3418')); rect(112, 112, 134, 112, hex('#9a643a')); rect(114, 115, 115, 131, hex('#4a2a14')); rect(131, 115, 132, 131, hex('#4a2a14')); rect(114, 124, 132, 125, hex('#6a4224'));
  rect(116, 120, 130, 123, hex('#d84a3a')); rect(116, 120, 130, 120, hex('#f07a5a'));
  // el sofá de pana verde: respaldo, cojines, brazos y el frente
  a_sombra(R, 206, 146, 70, 3, 0.4);
  const pana = (x0, y0, x1, y1, luz) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c = x % 2 ? hex('#5a6a2e') : hex('#6e7e3a'); if (y === y0 && luz) c = hex('#8a9a4a'); if (y === y1) c = hex('#3e4a1e'); pset(x, y, c); } };
  rect(139, 99, 273, 146, hex('#1e2410'));
  pana(146, 100, 266, 122, true); for (let x = 186; x <= 226; x += 40) rect(x, 101, x, 121, hex('#3e4a1e'));
  for (let k = 0; k < 3; k++) { const x0 = 150 + k * 39; pana(x0, 120, x0 + 37, 131, true); rect(x0, 131, x0 + 37, 131, hex('#2e3812')); }
  pana(140, 108, 150, 145, true); pana(262, 108, 272, 145, true); rect(140, 108, 150, 109, hex('#9aaa5a')); rect(262, 108, 272, 109, hex('#9aaa5a'));
  pana(150, 132, 262, 145, false); rect(150, 132, 262, 132, hex('#2e3812'));
  rect(142, 146, 144, 148, hex('#2a1a0c')); rect(268, 146, 270, 148, hex('#2a1a0c'));
  // dos cojines estampados
  for (const cx of [158, 252]) { rect(cx - 7, 108, cx + 7, 121, hex('#3a1a0c')); for (let y = 109; y <= 120; y++) for (let x = cx - 6; x <= cx + 6; x++) pset(x, y, ((x + y) % 6 < 3) ? hex('#e8803a') : hex('#c8a040')); rect(cx - 6, 109, cx + 6, 109, hex('#f8b060')); }
}

function a_salon77(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(a_capa(R, 'salon77', () => a_salon77Fijo(R)));
  // la calle de suburbio por la ventana: cielo con nubes, casas, un árbol que se mece, césped, un coche y un niño en bici
  const V = [160, 26, 232, 90];
  a_cielo(R, t, V, [hex('#5a9ae0'), hex('#7ab4ea'), hex('#a8d0f0'), hex('#d0e8f4')], [hex('#ffffff'), hex('#e0eaf4'), hex('#a8b8d0')], { n: 4, alto: 0.3, k: 6 });
  R.recorte(V);
  for (const [x0, w, tc, pc] of [[156, 30, hex('#a84a3a'), hex('#f0e0c0')], [194, 34, hex('#5a5a6a'), hex('#c8d8e8')]]) {
    R.poligono([[x0 - 3, 64], [x0 + w / 2, 52], [x0 + w + 3, 64]], tc); linea(x0 - 3, 64, x0 + w / 2, 52, a_mezcla(tc, hex('#ffffff'), 0.3));
    a_caja(R, x0, 64, x0 + w, 78, pc); for (let y = 66; y < 78; y += 3) for (let x = x0; x <= x0 + w; x++) pset(x, y, a_mezcla(pc, hex('#000000'), 0.12));
    a_caja(R, x0 + 4, 67, x0 + 10, 73, hex('#4a6a8a')); pset(x0 + 5, 68, hex('#c8e0f0')); a_caja(R, x0 + w - 10, 68, x0 + w - 5, 78, hex('#7a3a2a')); }
  { const sw = Math.sin(t * 1.5) * 1.2; a_caja(R, 189, 64, 191, 80, hex('#5a3a22')); for (let k = 0; k < 4; k++) { const cx = 190 + sw * (k / 3) + [0, -4, 4, 0][k], cy = [56, 60, 60, 52][k]; R.disco(cx, cy + 1, 6, hex('#2a5a2a')); R.disco(cx - 1, cy, 5.5, hex('#3a7a3a')); R.disco(cx - 2, cy - 2, 3, hex('#5a9a4a')); } }
  a_caja(R, 160, 78, 232, 83, hex('#5aa84a')); for (let x = 160; x <= 232; x++) if (h(x, 3, 3) < 0.4) pset(x, 78 + (Math.sin(t * 2 + x * 0.5) > 0.5 ? 0 : 1), hex('#7ac85a'));
  a_caja(R, 160, 84, 232, 90, hex('#6a6a72')); a_caja(R, 160, 84, 232, 84, hex('#9a9aa0'));
  { const u = (t % 13) / 13, cx = Math.round(268 - u * 160); a_coche(R, cx, 90, hex('#c8a040'), t, { dir: -1, largo: 32 }); }
  { const bx = Math.round(150 + ((t * 9) % 110)), p = Math.floor(t * 6) % 2; R.disco(bx - 3, 82, 1.6, hex('#1a1a1e')); R.disco(bx + 3, 82, 1.6, hex('#1a1a1e')); linea(bx - 3, 82, bx + 3, 82, hex('#d84a3a')); linea(bx, 82, bx + 2, 79, hex('#d84a3a'));
    a_gente(R, bx, 81 - 2, t, hex('#3a8ad8'), { sentado: true, dir: 1 }); pset(bx - 1 + p, 81, hex('#34446a')); }
  R.recorte(null);
  // el marco de la ventana: el parteluz y el travesaño
  rect(195, 26, 197, 90, hex('#f0ece0')); rect(197, 26, 197, 90, hex('#b8b0a0')); rect(160, 56, 232, 57, hex('#f0ece0')); rect(160, 58, 232, 58, hex('#b8b0a0'));
  // la planta de macramé que cuelga y se mece
  { const sw = Math.round(Math.sin(t * 0.9) * 1.2); linea(141, 16, 141 + sw, 44, hex('#e8dcc0')); linea(138, 30, 141 + sw, 44, hex('#d8c8a0')); linea(144, 30, 141 + sw, 44, hex('#d8c8a0'));
    rect(136 + sw, 44, 146 + sw, 50, hex('#c86a3a')); rect(136 + sw, 44, 146 + sw, 44, hex('#e88a5a'));
    for (let k = 0; k < 5; k++) { const x = 136 + sw + k * 2.5, L = 8 + (k % 3) * 4 + Math.round(Math.sin(t * 1.3 + k)); for (let j = 0; j < L; j++) pset(Math.round(x + Math.sin(j * 0.5 + k) * 0.8), 50 + j, j % 3 ? hex('#3a8a3a') : hex('#6ab85a')); } }
  // las agujas del reloj de sol
  { const m = t * 0.5, hh = t * 0.04; linea(262, 62, Math.round(262 + Math.sin(m) * 4), Math.round(62 - Math.cos(m) * 4), hex('#2a1a0a')); linea(262, 62, Math.round(262 + Math.sin(hh) * 3), Math.round(62 - Math.cos(hh) * 3), hex('#2a1a0a')); pset(262, 62, hex('#c83a2a')); }
  // la lámpara de lava: el resplandor, el cono dorado, el cristal y las burbujas que suben y bajan
  for (let y = 70; y <= 112; y++) for (let x = 104; x <= 142; x++) { const d = Math.hypot(x - 123, y - 94); if (d < 20 && (x + y) % 2 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8784a'), 0.16 * (1 - d / 20))); }
  for (let y = 82; y <= 104; y++) { const w = Math.round(2 + (y - 82) / 22 * 2); for (let x = 123 - w; x <= 123 + w; x++) pset(x, y, x === 123 - w ? hex('#f8c86a') : hex('#f0a040')); }
  R.recorte([119, 82, 127, 104]);
  for (let k = 0; k < 4; k++) { const u = (t * (0.08 + k * 0.03) + k * 0.31) % 2, f = u < 1 ? u : 2 - u, y = 102 - f * 18, x = 123 + Math.sin(t * 0.7 + k) * 1.2, r = 1.5 + (k % 2) + Math.sin(t * 1.3 + k) * 0.4; R.disco(x, y, r, hex('#e83a2a')); R.disco(x - 0.5, y - 0.5, r * 0.5, hex('#f86a4a')); }
  R.recorte(null);
  rect(121, 80, 125, 81, hex('#c8a040')); rect(117, 105, 129, 111, hex('#b8862a')); rect(117, 105, 129, 105, hex('#f0d070')); rect(118, 107, 119, 110, hex('#f0d070'));
  // la tele: lo que pinta la escena (o un juego de naves) y el cristal
  const P = [49, 93, 87, 121];
  R.recorte(P); if (typeof o.pantalla === 'function') o.pantalla(R, t, P); else a_naves(R, t, P); R.recorte(null);
  a_crt(R, 47, 91, 89, 123, { marco: hex('#3a2a22'), barrido: 0.1 });
  for (let x = 40; x <= 108; x += 2) for (let y = 126; y <= 131; y++) if ((x + y) % 4 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#a8c8f0'), 0.08));
  // la consola encima de la tele, con su cartucho, y los cables que bajan a la moqueta
  a_pieza('consolaVieja', R, 74, 83, { cartucho: o.cartucho ?? 'rojo', palancas: o.palancas ?? 0 });
  linea(88, 80, 110, 96, hex('#1a1a1e')); linea(110, 96, 110, 134, hex('#1a1a1e')); linea(110, 134, 104, 172, hex('#1a1a1e')); linea(104, 172, 120, 179, hex('#1a1a1e')); linea(89, 81, 112, 98, hex('#2a2a30')); linea(112, 98, 113, 140, hex('#2a2a30')); linea(113, 140, 140, 176, hex('#2a2a30'));
  // el gato dormido en el brazo del sofá, que respira y mueve la cola
  { const r = Math.sin(t * 2) > 0 ? 1 : 0, cola = Math.round(Math.sin(t * 1.2) * 2);
    rect(260, 103 - r, 272, 107, hex('#2a1a10')); rect(261, 104 - r, 271, 107, hex('#e8903a')); for (let x = 262; x <= 270; x += 3) pset(x, 105 - r, hex('#b8602a'));
    rect(258, 102, 263, 107, hex('#e8903a')); pset(258, 101, hex('#e8903a')); pset(262, 101, hex('#e8903a')); pset(259, 104, hex('#2a1a10')); pset(261, 104, hex('#2a1a10')); pset(260, 105, hex('#f0a0a0'));
    linea(272, 106, 275, 104 + cola, hex('#e8903a')); pset(275, 104 + cola, hex('#b8602a')); }
  return { suelo: 154, tele: P, consola: [74, 83], sofa: [140, 100, 272, 146], ventana: V, lava: [123, 93], mesita: [136, 159, 244, 179] };
}

// la mesita baja con cartuchos, la caja, los dos mandos con sus cables, palomitas y un refresco
function a_salon77Delante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const X = 30;   // la mesita está a la derecha de la tele, delante del sofá (x 136–244, tablero y 160)
  a_sombra(R, 160 + X, 179, 52, 2, 0.35);
  rect(106 + X, 159, 214 + X, 166, hex('#2a1608'));
  a_tablas(R, 107 + X, 160, 213 + X, 164, [hex('#8a5a2e'), hex('#5a3418'), hex('#b07a40'), hex('#74482a')], { w: 107, vertical: false, k: 23, nudos: false });
  rect(107 + X, 160, 213 + X, 160, hex('#c8925a')); rect(108 + X, 165, 212 + X, 169, hex('#5a3418')); rect(108 + X, 169, 212 + X, 169, hex('#2a1608'));
  for (const x of [110 + X, 206 + X]) { rect(x, 170, x + 3, 179, hex('#4a2a14')); rect(x, 170, x, 179, hex('#8a5a2e')); }
  a_pieza('cartucho', R, 120 + X, 160, { color: 'amarillo', icono: 'nave' });
  a_pieza('cajaCartucho', R, 140 + X, 160, { color: 'azul', icono: 'flor' });
  a_pieza('cartucho', R, 196 + X, 160, { color: 'verde', icono: 'foso' });
  // los mandos con sus cables, que cruzan la moqueta hasta la tele
  a_pieza('joystick', R, 160 + X, 160, { inclina: Math.sin(t * 2) * 0.6 }); a_pieza('joystick', R, 176 + X, 160, { inclina: Math.sin(t * 1.4 + 1) * 0.8 });
  linea(160 + X, 160, 150 + X, 172, hex('#1a1a1e')); linea(150 + X, 172, 120, 179, hex('#1a1a1e')); linea(176 + X, 160, 182 + X, 174, hex('#2a2a30')); linea(182 + X, 174, 230, 179, hex('#2a2a30'));
  // el cuenco de palomitas y la lata de refresco que suda
  disco(118 + X, 164, 6, hex('#3a6ad8')); rect(112 + X, 164, 124 + X, 166, hex('#2a4aa8')); for (let k = 0; k < 10; k++) disco(114 + X + (k % 5) * 2.2, 158 + Math.floor(k / 5) * 2, 1.4, k % 3 ? hex('#fff4d0') : hex('#f0d080'));
  rect(203 + X, 150, 208 + X, 159, hex('#d84a3a')); rect(203 + X, 150, 208 + X, 150, hex('#c8ccd4')); rect(204 + X, 152, 204 + X, 158, hex('#f8a08a')); rect(205 + X, 154, 207 + X, 155, hex('#f8f0e0'));
  if (Math.sin(t * 2.5) > 0.6) pset(208 + X, 153 + Math.floor(t * 3) % 5, hex('#e8f8ff'));
  return { mesita: [136, 159, 244, 179] };
}

// la tele de cerca: el mueble, la pantalla con o.pantalla, los diales, el altavoz y en la moqueta la consola y los mandos
function a_salon77TeleFijo(R) {
  const { rect, pset, linea, disco } = R;
  for (let y = 0; y <= 139; y++) for (let x = 0; x < 320; x++) { let c = (x >> 3) & 1 ? hex('#7a5232') : hex('#6e4a2c'); if ((x & 7) === 0) c = hex('#62422a'); if (x > 270 && y < 50) c = a_tr(x, y) < 0.5 ? hex('#74502f') : hex('#704c2e'); pset(x, y, c); }
  a_moqueta(R, 0, 140, 319, 179, [hex('#c0602a'), hex('#8e4420'), hex('#e0843e')], { pelo: true, k: 27 });
  a_sombra(R, 150, 141, 126, 4, 0.45);
  rect(28, 16, 272, 140, hex('#1e1008'));
  a_tablas(R, 29, 17, 271, 137, [hex('#7a4a26'), hex('#4a2a14'), hex('#9a643a'), hex('#683e20')], { w: 121, vertical: false, k: 29 });
  rect(29, 17, 271, 21, hex('#a8703e')); rect(29, 17, 271, 17, hex('#d8a060')); rect(29, 136, 271, 137, hex('#3a2010'));
  rect(42, 26, 198, 130, hex('#140c08')); rect(44, 28, 196, 128, hex('#3a2a22')); rect(44, 28, 196, 28, hex('#5a463a')); rect(44, 28, 44, 128, hex('#5a463a'));
  rect(206, 26, 264, 130, hex('#2e1a0c')); rect(207, 27, 263, 27, hex('#5a3a1e'));
  // el dial de canales (rayitas) y el del volumen
  disco(234, 48, 14, hex('#1a1a1a')); disco(234, 48, 12, hex('#c8c4b8')); disco(233, 47, 8, hex('#e8e4d8'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(234 + Math.cos(a) * 11), Math.round(48 + Math.sin(a) * 11), hex('#3a3a3a')); }
  disco(234, 76, 8, hex('#1a1a1a')); disco(234, 76, 6.5, hex('#c8c4b8')); pset(232, 74, hex('#ffffff'));
  for (let y = 90; y <= 126; y++) for (let x = 210; x <= 260; x++) pset(x, y, ((x + (y >> 1)) % 3 === 0) ? hex('#3a2e1e') : (x + y) % 2 ? hex('#6a5a3a') : hex('#5a4a30'));
  rect(208, 88, 262, 89, hex('#c8a040'));
  rect(40, 138, 50, 142, hex('#1a1008')); rect(250, 138, 260, 142, hex('#1a1008'));
  // encima: el tapete de ganchillo y una figurita
  for (let x = 214; x <= 256; x++) pset(x, 16, (x % 3) ? hex('#f0ece0') : hex('#c8c0b0')); for (let x = 216; x <= 254; x += 3) pset(x, 15, hex('#f0ece0'));
  rect(228, 6, 238, 15, hex('#3a8aa8')); rect(229, 6, 230, 15, hex('#6ab8d0')); disco(233, 4, 3, hex('#e8803a'));
}

function a_salon77Tele(R, t, o) {
  const { pset, linea } = R;
  R.copiar(a_capa(R, 'salon77t', () => a_salon77TeleFijo(R)));
  const P = [52, 34, 188, 122];
  R.recorte(P); if (typeof o.pantalla === 'function') o.pantalla(R, t, P); else a_naves(R, t, P); R.recorte(null);
  a_crt(R, 48, 30, 192, 126, { marco: hex('#3a2a22') });
  // el dial gira despacio, como si alguien cambiara de canal
  { const a = -Math.PI / 2 + Math.round(t * 0.3) * (Math.PI / 6); linea(234, 48, Math.round(234 + Math.cos(a) * 7), Math.round(48 + Math.sin(a) * 7), hex('#2a2a2a')); }
  // en la moqueta: la consola grande con cartucho, los dos mandos con sus cables y cartuchos
  a_pieza('consolaVieja', R, 150, 172, { s: 2, cartucho: o.cartucho ?? 'rojo', palancas: o.palancas ?? 0 });
  a_pieza('joystick', R, 60, 176, { s: 2, inclina: Math.sin(t * 2.2) * 0.8, pulsado: Math.sin(t * 5) > 0.7 });
  a_pieza('joystick', R, 252, 176, { s: 2, inclina: Math.sin(t * 1.6 + 1) * 0.8 });
  linea(66, 156, 100, 160, hex('#1a1a1e')); linea(100, 160, 118, 152, hex('#1a1a1e')); linea(246, 156, 210, 162, hex('#2a2a30')); linea(210, 162, 182, 152, hex('#2a2a30'));
  a_pieza('cartucho', R, 98, 178, { color: 'naranja', icono: 'comecocos' }); a_pieza('cartucho', R, 212, 178, { color: 'morado', icono: 'nave' });
  a_pieza('cajaCartucho', R, 290, 178, { color: 'verde', icono: 'flor' });
  return { suelo: 179, tele: P, consola: [150, 172], mandos: [[60, 176], [252, 176]] };
}

// ═══ 'oficinas' ═══
function a_oficinasFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo de placas acústicas con la rejilla y los fluorescentes apagados (se encienden en cada fotograma)
  for (let y = 0; y <= 20; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 1) < 0.12 ? hex('#c8c2b2') : hex('#d8d2c2'); if (x % 32 === 0 || y % 7 === 6) c = hex('#b0a898'); pset(x, y, c); }
  rect(0, 21, 319, 22, hex('#8a8272'));
  // la pared beige con juntas verticales y motas
  for (let y = 23; y <= 96; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 2) < 0.07 ? hex('#cabea6') : hex('#d8ccb4'); if (x % 40 === 39 && !(x > 270 && y < 50)) c = hex('#c4b8a0'); if (y < 30 && a_tr(x, y) > (y - 23) / 7) c = hex('#c4b8a0'); pset(x, y, c); }
  // el ventanal (marco de aluminio; el exterior va en cada fotograma)
  rect(4, 26, 120, 92, hex('#6a6e78')); rect(5, 27, 119, 91, hex('#a8acb4')); rect(4, 92, 122, 95, hex('#c8ccd4')); rect(4, 95, 122, 95, hex('#6a6e78'));
  // los tres pósteres de juegos inventados (una nave sobre un planeta, un laberinto, un castillo con dragón), sin letras
  const poster = (x0, dib) => { rect(x0 - 1, 33, x0 + 22, 65, hex('#8a8e98')); rect(x0, 34, x0 + 21, 64, hex('#101024')); dib(x0); rect(x0 - 1, 33, x0 + 22, 33, hex('#c8ccd4')); };
  poster(128, (x) => { for (let k = 0; k < 12; k++) pset(x + Math.floor(h(k, 1, 3) * 22), 35 + Math.floor(h(k, 2, 3) * 28), hex('#e8e8ff')); disco(x + 15, 58, 9, hex('#d8783a')); disco(x + 13, 56, 6, hex('#f0a050')); poligono([[x + 5, 48], [x + 9, 38], [x + 13, 48]], hex('#c8ccd4')); rect(x + 7, 48, x + 11, 50, hex('#f0603a')); pset(x + 9, 52, hex('#f0d040')); });
  poster(156, (x) => { for (let j = 0; j < 7; j++) for (let i = 0; i < 5; i++) { const a = h(i, j, 7) < 0.5; if (a) rect(x + 2 + i * 4, 36 + j * 4, x + 5 + i * 4, 36 + j * 4, hex('#3a6ad8')); else rect(x + 2 + i * 4, 36 + j * 4, x + 2 + i * 4, 39 + j * 4, hex('#3a6ad8')); } disco(x + 11, 62 - 2, 1.5, hex('#f0d040')); pset(x + 5, 43, hex('#f05a5a')); pset(x + 17, 51, hex('#f05a5a')); });
  poster(184, (x) => { for (let y = 34; y <= 64; y++) for (let xx = x; xx <= x + 21; xx++) pset(xx, y, y < 50 ? (a_tr(xx, y) > (y - 34) / 16 ? hex('#2a1a4a') : hex('#6a2a5a')) : hex('#3a5a2a')); rect(x + 4, 44, x + 12, 56, hex('#8a8a96')); rect(x + 4, 42, x + 5, 44, hex('#8a8a96')); rect(x + 8, 42, x + 9, 44, hex('#8a8a96')); rect(x + 11, 42, x + 12, 44, hex('#8a8a96')); rect(x + 7, 51, x + 9, 56, hex('#2a1a10'));
    poligono([[x + 14, 40], [x + 20, 37], [x + 19, 44], [x + 15, 45]], hex('#3a9a4a')); pset(x + 19, 39, hex('#f0d040')); for (let k = 0; k < 3; k++) pset(x + 13 - k, 41 + k, k % 2 ? hex('#f0a030') : hex('#f05a2a')); });
  // dos máquinas recreativas al fondo (laterales de color, marquesina con rayas; la demo va en cada fotograma)
  for (const [x0, c, c2] of [[214, hex('#2a4aa8'), hex('#d84a3a')], [240, hex('#a82a6a'), hex('#e8c040')]]) {
    rect(x0, 50, x0 + 22, 124, hex('#141018')); rect(x0 + 1, 51, x0 + 3, 123, c); rect(x0 + 19, 51, x0 + 21, 123, c);
    rect(x0 + 4, 52, x0 + 18, 58, c2); for (let x = x0 + 4; x <= x0 + 18; x += 3) rect(x, 53, x, 57, hex('#fff0c0'));
    rect(x0 + 4, 60, x0 + 18, 76, hex('#2a2a30')); rect(x0 + 3, 78, x0 + 19, 82, hex('#3a3a44')); pset(x0 + 7, 80, hex('#d84a3a')); pset(x0 + 14, 80, hex('#e8c040')); pset(x0 + 16, 80, hex('#3ad84a'));
  }
  // la máquina de café, la jarra y los vasos
  rect(268, 62, 300, 124, hex('#2a2a30')); rect(269, 63, 299, 123, hex('#8a3a2a')); rect(269, 63, 299, 64, hex('#c8604a'));
  rect(272, 68, 296, 78, hex('#1a1a1e')); for (let k = 0; k < 4; k++) { rect(274 + k * 6, 70, 277 + k * 6, 76, [hex('#5a3a22'), hex('#d8c8a8'), hex('#3a2a1a'), hex('#c8a060')][k]); }
  rect(276, 84, 292, 100, hex('#141418')); rect(281, 94, 287, 100, hex('#f4f0e8')); rect(282, 95, 286, 96, hex('#5a3418'));
  rect(272, 104, 296, 106, hex('#c8ccd4'));
  // los cubículos: paneles de tela con postes y remate de aluminio
  for (let y = 96; y <= 124; y++) for (let x = 0; x < 320; x++) { let c = (x + y * 3) % 5 === 0 ? hex('#8a5a2e') : h(x, y, 9) < 0.18 ? hex('#c08a50') : hex('#a8743e'); if (x % 64 === 0 || x % 64 === 1) c = hex('#6a6e78'); pset(x, y, c); }
  rect(0, 96, 319, 97, hex('#c8ccd4')); rect(0, 98, 319, 98, hex('#6a6e78'));
  // papeles clavados en los paneles, los portanombres (sin letras) y la sombra del remate
  for (let x = 0; x < 320; x++) if ((x + 1) % 2) pset(x, 99, hex('#8a5a2e'));
  for (const [x, y, w, hh, c] of [[10, 102, 8, 10, hex('#f4f0e4')], [22, 104, 6, 8, hex('#f8e890')], [84, 103, 10, 8, hex('#f4f0e4')], [140, 101, 7, 11, hex('#a8d8f0')], [206, 104, 9, 7, hex('#f4f0e4')], [218, 102, 6, 9, hex('#f8c8d8')], [276, 103, 8, 10, hex('#f4f0e4')]]) {
    rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#7a4e26')); rect(x, y, x + w, y + hh, c); for (let j = y + 3; j < y + hh - 1; j += 2) rect(x + 1, j, x + 1 + Math.floor(h(x, j, 4) * (w - 2)), j, hex('#8a8a96')); pset(x + (w >> 1), y, hex('#d84a3a')); }
  for (const x of [40, 104, 168, 232, 296]) { rect(x - 6, 113, x + 6, 117, hex('#6a6e78')); rect(x - 5, 114, x + 5, 116, hex('#c8ccd4')); rect(x - 3, 115, x + 3, 115, hex('#8a8e98')); }
  // la moqueta azul con un dibujo de rombos de los ochenta, en perspectiva, y la luz de los ventanales
  for (let y = 125; y < 180; y++) { const z = y - 104;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z * 4, v = 200 / z, du = u - Math.floor(u), dv = v - Math.floor(v), rom = Math.abs(du - 0.5) + Math.abs(dv - 0.5);
      let c = h(x, y, 33) < 0.16 ? hex('#38465e') : h(x, y, 34) > 0.86 ? hex('#62729a') : hex('#4a5a7a');
      if (rom > 0.46 && rom < 0.54) c = hex('#56688c'); else if (rom < 0.1) c = hex('#5e3a5a');
      const sol = (x - (y - 125) * 1.4); if (sol > 0 && sol < 110 && (x + y) % 2 === 0 && y < 165) c = a_mezcla(c, hex('#f8f0d0'), 0.16);
      if (y < 133 && a_tr(x, y) > (y - 125) / 8) c = hex('#38465e'); pset(x, y, c); } }
  for (let x = 0; x < 320; x++) { pset(x, 125, hex('#2a3448')); if (x % 2) pset(x, 126, hex('#38465e')); }
  // la fuente de agua con su garrafa (las burbujas van en cada fotograma)
  a_sombra(R, 120, 137, 9, 2, 0.4); rect(113, 112, 127, 137, hex('#2a2e38')); rect(114, 113, 126, 136, hex('#e8e8ee')); rect(124, 113, 126, 136, hex('#b8bcc8')); rect(116, 118, 118, 120, hex('#3a6ad8')); rect(121, 118, 123, 120, hex('#d84a3a'));
  rect(114, 91, 126, 112, hex('#4a7ab8')); for (let y = 92; y <= 111; y++) for (let x = 115; x <= 125; x++) pset(x, y, y < 96 ? hex('#c8e4f8') : x < 118 ? hex('#a8d0f0') : hex('#78b0e0')); rect(118, 89, 122, 91, hex('#4a7ab8'));
  // un carrito con cajas de cartuchos y una silla con ruedas, en el pasillo de atrás
  a_sombra(R, 196, 138, 16, 2, 0.4); rect(182, 132, 210, 134, hex('#8a8e98')); rect(182, 132, 210, 132, hex('#c8ccd4')); for (const x of [184, 208]) { R.disco(x, 136.5, 1.8, hex('#1a1a1e')); }
  for (let k = 0; k < 5; k++) { const x = 184 + (k % 3) * 9, y = 131 - Math.floor(k / 3) * 9; rect(x, y - 8, x + 8, y, hex('#8a6a3a')); rect(x, y - 8, x + 8, y - 8, hex('#c8a060')); rect(x + 7, y - 7, x + 8, y, hex('#6a4a2a')); rect(x + 2, y - 5, x + 5, y - 3, [hex('#d84a3a'), hex('#3a6ad8'), hex('#e8c040')][k % 3]); }
  a_sombra(R, 92, 137, 9, 2, 0.4); rect(86, 116, 98, 126, hex('#2a2a30')); rect(87, 117, 97, 125, hex('#4a4a54')); rect(87, 117, 97, 117, hex('#6a6a74')); rect(85, 127, 99, 129, hex('#2a2a30')); rect(91, 130, 93, 133, hex('#6a6e78'));
  for (const [x, y] of [[84, 135], [92, 136], [100, 135]]) { rect(x - 2, y - 1, x + 2, y - 1, hex('#6a6e78')); pset(x, y, hex('#1a1a1e')); }
  // la maceta grande del rincón (un ficus)
  rect(298, 132, 316, 150, hex('#c86a3a')); rect(298, 132, 316, 133, hex('#e88a5a')); rect(312, 134, 316, 150, hex('#9a4a2a'));
  rect(306, 106, 307, 132, hex('#5a3a22'));
}

function a_oficinas(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(a_capa(R, 'oficinas', () => a_oficinasFijo(R)));
  // los fluorescentes: tubos encendidos con su rejilla; el segundo parpadea
  for (const [x0, k] of [[180, 0], [236, 1]]) { const on = k === 1 ? (Math.sin(t * 23) > -0.6 || Math.floor(t * 1.3) % 4 ? 1 : 0) : 1; rect(x0, 7, x0 + 30, 12, hex('#9a9a90')); rect(x0 + 1, 8, x0 + 29, 11, on ? hex('#fbfaf0') : hex('#c8c8bc')); for (let x = x0 + 4; x < x0 + 30; x += 5) rect(x, 8, x, 11, hex('#d8d8cc')); }
  // por el ventanal: cielo con nubes, montes, palmeras que se mecen y el aparcamiento con coches y gente
  const V = [6, 28, 118, 90];
  a_cielo(R, t, V, [hex('#4a8ad8'), hex('#6aa8e8'), hex('#9acaf0'), hex('#c8e4f4')], [hex('#ffffff'), hex('#e4ecf6'), hex('#a8b8d4')], { n: 4, alto: 0.3, k: 7 });
  R.recorte(V);
  R.poligono([[6, 66], [30, 54], [52, 62], [80, 50], [104, 60], [118, 56], [118, 72], [6, 72]], hex('#8a9ab8')); R.poligono([[6, 70], [40, 62], [70, 68], [100, 61], [118, 66], [118, 74], [6, 74]], hex('#7a8a6a'));
  a_caja(R, 6, 72, 118, 90, hex('#7a7a80')); for (let x = 10; x < 118; x += 12) linea(x, 76, x - 3, 90, hex('#e8e8e0'));
  for (const [x, c] of [[14, hex('#c83a2a')], [40, hex('#e8e0c8')], [66, hex('#3a6aa8')], [92, hex('#a8a040')]]) a_coche(R, x, 86, c, 0, { largo: 22 });
  { const cx = Math.round(((t * 18) % 200) - 40); a_coche(R, cx, 80, hex('#5a8a3a'), t, { largo: 24 }); }
  { const px = Math.round(130 - ((t * 4) % 140)); a_gente(R, px, 89, t, hex('#e8e0d0'), { anda: true, dir: -1, pant: hex('#5a4a3a') }); }
  for (const [x, a] of [[24, 40], [58, 46], [100, 42]]) a_palmera(R, x, 78, a, t);
  R.recorte(null);
  rect(43, 27, 45, 91, hex('#a8acb4')); rect(81, 27, 83, 91, hex('#a8acb4')); rect(45, 27, 45, 91, hex('#6a6e78')); rect(83, 27, 83, 91, hex('#6a6e78'));
  for (const x of [8, 48, 86]) for (let y = 30; y < 58; y++) if ((x + y) % 2 === 0) pset(x + (y - 30), y, a_mezcla(R.pget(x + (y - 30), y), hex('#ffffff'), 0.15));
  // la demo de las recreativas: estrellas que corren y bloques de color
  for (const [x0, k] of [[218, 0], [244, 1]]) { R.recorte([x0, 60, x0 + 14, 76]); a_caja(R, x0, 60, x0 + 14, 76, hex('#05040e'));
    for (let s = 0; s < 6; s++) { const yy = 60 + Math.floor((h(s, k, 5) * 17 + t * (8 + s * 3)) % 17); pset(x0 + Math.floor(h(s, 1 + k, 5) * 15), yy, hex('#c8c8f0')); }
    const fx = x0 + 3 + Math.round((Math.sin(t * 2 + k) + 1) * 4); a_caja(R, fx, 72, fx + 3, 74, k ? hex('#e8c040') : hex('#3ad84a'));
    for (let i = 0; i < 4; i++) if (Math.floor(t * 2 + i + k) % 5) a_caja(R, x0 + 1 + i * 4, 62 + (Math.floor(t * 2) % 3), x0 + 2 + i * 4, 63 + (Math.floor(t * 2) % 3), [hex('#f05a5a'), hex('#f0a040'), hex('#c06ae8'), hex('#4ab8f0')][i]);
    R.recorte(null); }
  // las burbujas de la fuente de agua
  for (let k = 0; k < 3; k++) { const y = Math.round(110 - ((t * 6 + k * 7) % 18)); if (Math.floor(t * 0.5) % 3 === 0 || k === 0) pset(118 + k * 3, y, hex('#ffffff')); }
  // el café: el piloto, el vaso y el vapor
  pset(294, 66, Math.sin(t * 4) > 0 ? hex('#f04a3a') : hex('#6a2a2a')); a_humo(R, 284, 93, t, hex('#ffffff'), { alto: 20, n: 7 });
  // el reloj de la pared
  disco(258, 40, 6, hex('#3a3a40')); disco(258, 40, 5, hex('#f4f0e8')); { const m = t * 0.4; linea(258, 40, Math.round(258 + Math.sin(m) * 4), Math.round(40 - Math.cos(m) * 4), hex('#1a1a1e')); linea(258, 40, 260, 38, hex('#1a1a1e')); pset(258, 40, hex('#d84a3a')); }
  // los monitores de los cubículos (asoman por encima de los paneles) y las cabezas de la gente que trabaja
  for (const [x, k] of [[20, 0], [74, 1], [150, 2], [196, 3], [280, 4]]) { rect(x, 84, x + 14, 96, hex('#c8c0a8')); rect(x, 84, x + 14, 84, hex('#e8e0c8')); rect(x + 2, 86, x + 12, 94, hex('#0a1a0e'));
    for (let j = 0; j < 4; j++) { const L = Math.floor(h(j, Math.floor(t * 1.5 + k), 3) * 9) + 1; rect(x + 3, 87 + j * 2, x + 2 + L, 87 + j * 2, k % 2 ? hex('#f0a040') : hex('#5adc5a')); } }
  for (const [x, k, pel] of [[40, 0, hex('#3a2a1a')], [100, 1, hex('#c8a060')], [176, 2, hex('#1a1a1e')], [226, 3, hex('#8a4a2a')]]) { const y = 90 + Math.round(Math.sin(t * 1.3 + k * 2) * 1); rect(x - 2, y, x + 2, y + 5, hex('#e8b088')); rect(x - 2, y - 1, x + 2, y + 1, pel); pset(x + 2, y + 2, hex('#e8b088')); rect(x - 3, y + 6, x + 3, 96, k % 2 ? hex('#3a6aa8') : hex('#e8e0d0')); }
  // un oficinista que cruza el pasillo de atrás con papeles (va por detrás de los paneles bajos de delante)
  { const u = (t * 10) % 380, x = Math.round(u - 30); a_gente(R, x, 132, t, hex('#d8d0c0'), { anda: true, dir: 1, carga: true, pelo: hex('#5a3a1a'), pant: hex('#5a4a3a') }); }
  // el ficus que se mece con el aire acondicionado
  for (let k = 0; k < 18; k++) { const a = h(k, 1, 13) * Math.PI * 2, r = h(k, 2, 13) * 12, cx = Math.round(307 + Math.cos(a) * r + Math.sin(t * 1.4 + k) * 0.7), cy = Math.round(108 + Math.sin(a) * r * 0.9); disco(cx, cy, 2.4, hex('#2a6a2a')); pset(cx - 1, cy - 1, hex('#5aa84a')); pset(cx, cy - 1, hex('#3a8a3a')); }
  return { suelo: 150, ventana: V, posters: [128, 33, 206, 65], recreativas: [214, 50, 262, 124], cafe: [268, 62, 300, 124], mesas: [[0, 140, 86, 180], [234, 140, 320, 180]], libre: [90, 230] };
}

// las dos mesas de los lados con monitores, teclados, placas de prototipo, tazas, cajas y un teléfono
function a_oficinasDelante(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const mesa = (x0, x1) => { rect(x0, 139, x1, 146, hex('#2a1e14')); rect(x0, 140, x1, 144, hex('#b89a6a')); for (let x = x0; x <= x1; x++) if (h(x >> 2, 1, 41) < 0.4) pset(x, 142, hex('#a88a5a')); rect(x0, 140, x1, 140, hex('#d8c094')); rect(x0, 145, x1, 146, hex('#6a5034'));
    for (let y = 147; y <= 179; y++) for (let x = x0 + 2; x <= x1 - 2; x++) pset(x, y, (x % 20 < 1) ? hex('#4a3a2a') : (y - 147) % 10 === 0 ? hex('#5a4630') : hex('#7a6248')); rect(x0 + 2, 147, x1 - 2, 147, hex('#3a2a1a')); };
  mesa(0, 86); mesa(234, 319);
  for (const x of [20, 70]) rect(x - 3, 160, x + 3, 160, hex('#c8ccd4'));
  for (const x of [252, 300]) rect(x - 3, 160, x + 3, 160, hex('#c8ccd4'));
  // el monitor de la izquierda: carcasa beige, la pantalla con sprites que cambian
  const monitor = (x0, k) => { rect(x0, 112, x0 + 30, 139, hex('#7a7462')); rect(x0 + 1, 113, x0 + 29, 138, hex('#d8d0b8')); rect(x0 + 1, 113, x0 + 29, 113, hex('#f0e8d0')); rect(x0 + 4, 116, x0 + 26, 132, hex('#0a0e1a'));
    const P = [x0 + 5, 117, x0 + 25, 131]; R.recorte(P);
    if (k) { for (let j = 0; j < 7; j++) { const L = Math.floor(h(j, Math.floor(t * 2), 7) * 16) + 2; a_caja(R, x0 + 6, 118 + j * 2, x0 + 5 + L, 118 + j * 2, hex('#5adc5a')); } if (Math.floor(t * 2) % 2) a_caja(R, x0 + 6, 132, x0 + 8, 132, hex('#5adc5a')); }
    else { for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const c = [hex('#f05a5a'), hex('#f0d040'), hex('#4ab8f0'), hex('#c06ae8')][(i + j + Math.floor(t)) % 4]; a_caja(R, x0 + 7 + i * 5, 118 + j * 4, x0 + 9 + i * 5, 119 + j * 4, c); } const fx = x0 + 7 + Math.round((Math.sin(t * 2) + 1) * 7); a_caja(R, fx, 129, fx + 3, 130, hex('#5adc5a')); }
    R.recorte(null); a_crt(R, x0 + 4, 116, x0 + 26, 132, { marco: hex('#d8d0b8'), barrido: 0.12 }); rect(x0 + 24, 135, x0 + 26, 136, hex('#3ad84a')); };
  monitor(10, 0); monitor(278, 1);
  // teclados beige con las teclas
  for (const x0 of [44, 244]) { rect(x0, 135, x0 + 30, 140, hex('#8a826e')); rect(x0 + 1, 135, x0 + 29, 139, hex('#d8d0b8')); for (let x = x0 + 2; x < x0 + 29; x += 2) { pset(x, 136, hex('#a89e86')); pset(x + 1, 138, hex('#a89e86')); } }
  // la placa verde del prototipo, la taza que humea, la pila de cajas de cartuchos y el teléfono
  rect(58, 130, 74, 134, hex('#1a6a3a')); for (let x = 60; x < 74; x += 3) rect(x, 131, x + 1, 132, hex('#1a1a1e')); rect(58, 134, 74, 134, hex('#e8c040'));
  rect(78, 129, 84, 138, hex('#e8e0d0')); rect(78, 129, 84, 130, hex('#5a3418')); rect(85, 132, 86, 135, hex('#e8e0d0')); a_humo(R, 81, 128, t, hex('#ffffff'), { alto: 14 });
  for (let k = 0; k < 3; k++) a_pieza('cajaCartucho', R, 254 + k * 2, 135 - k * 0 - (k === 2 ? 0 : 0), { color: ['rojo', 'amarillo', 'turquesa'][k], icono: ['nave', 'comecocos', 'foso'][k] });
  rect(238, 131, 248, 139, hex('#2a2a30')); rect(239, 131, 247, 133, hex('#c83a2a')); rect(240, 129, 246, 130, hex('#c83a2a')); if (Math.floor(t * 3) % 4 === 0) pset(246, 137, hex('#f0d040'));
  rect(4, 128, 8, 139, hex('#2a2a30')); linea(6, 128, 14, 118, hex('#2a2a30')); rect(12, 114, 20, 118, hex('#d84a3a'));
  return { mesas: [[0, 139, 86, 180], [234, 139, 320, 180]] };
}

// el calendario gigante: la hoja de un mes (cabecera de color con el número del mes, la fila de los días de la semana y
// la cuadrícula con las cifras), pintada en (x0, y0) de 128 × 70; dia: tacha hasta ese día; marca 0–1: el círculo rojo del día 1
const A_MESES = { 6: [2, 30], 7: [4, 31], 8: [0, 31], 9: [3, 30], 10: [5, 31] };

function a_hojaMes(R, x0, y0, mes, dia = 0, marca = 0) {
  const { rect, pset } = R, COL = { 6: hex('#3a9a4a'), 7: hex('#e8803a'), 8: hex('#d8a020'), 9: hex('#3a6ad8'), 10: hex('#a84ab8') }, c = COL[mes] ?? hex('#d84a3a');
  rect(x0, y0, x0 + 127, y0 + 69, hex('#fbf8f0')); rect(x0, y0, x0 + 127, y0 + 11, c); rect(x0, y0 + 11, x0 + 127, y0 + 11, a_mezcla(c, hex('#000000'), 0.4));
  a_digitos(R, mes, x0 + 64 - (mes > 9 ? 7 : 3), y0 + 1, 2, hex('#ffffff'), a_mezcla(c, hex('#000000'), 0.45));
  for (let i = 0; i < 7; i++) rect(x0 + 5 + i * 18, y0 + 14, x0 + 12 + i * 18, y0 + 15, i === 0 ? hex('#d84a3a') : hex('#8a8a96'));
  const [off, n] = A_MESES[mes] ?? [0, 30];
  for (let r = 0; r <= 5; r++) rect(x0 + 1, y0 + 18 + r * 10, x0 + 126, y0 + 18 + r * 10, hex('#d8d4c8'));
  for (let i = 1; i < 7; i++) rect(x0 + i * 18 + 1, y0 + 18, x0 + i * 18 + 1, y0 + 68, hex('#d8d4c8'));
  for (let d = 1; d <= n; d++) { const k = off + d - 1, i = k % 7, r = Math.floor(k / 7), cx = x0 + 3 + i * 18, cy = y0 + 20 + Math.min(4, r) * 10;
    a_digitos(R, d, cx, cy, 1, i === 0 ? hex('#d84a3a') : hex('#3a3a44'));
    if (d <= dia) { for (let a = 0; a < 8; a++) { pset(cx + 4 + a, cy + a, hex('#4a4a5a')); pset(cx + 11 - a, cy + a, hex('#4a4a5a')); } }
    if (d === 1 && marca > 0) { const N = Math.round(40 * Math.min(1, marca)); for (let a = 0; a < N; a++) { const an = -2.2 + a / 40 * Math.PI * 2.15, px = Math.round(cx + 7 + Math.cos(an) * 10), py = Math.round(cy + 3 + Math.sin(an) * 6); pset(px, py, hex('#e02a2a')); pset(px, py + 1, hex('#a81a1a')); } } }
}

function a_calendarioFijo(R) {
  const { rect, pset, linea, disco } = R;
  // la pared pintada con su textura y una luz suave desde la ventana
  for (let y = 0; y <= 157; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 2) < 0.08 ? hex('#cabea6') : hex('#d8ccb4'); if ((x > 200) && a_tr(x, y) < (x - 200) / 300) c = hex('#e2d8c2'); pset(x, y, c); }
  rect(0, 154, 319, 157, hex('#8a7a62')); rect(0, 154, 319, 154, hex('#b8a888'));
  a_moqueta(R, 0, 158, 319, 179, [hex('#4a5a7a'), hex('#38465e'), hex('#62729a')], { k: 37 });
  // el corcho con notas, fotos y chinchetas
  rect(6, 38, 50, 120, hex('#6a4a2a')); for (let y = 40; y <= 118; y++) for (let x = 8; x <= 48; x++) pset(x, y, h(x, y, 5) < 0.3 ? hex('#a8784a') : h(x, y, 6) < 0.3 ? hex('#c8945a') : hex('#b8864e'));
  for (const [x, y, w, hh, c] of [[11, 44, 14, 16, hex('#f8f0a0')], [28, 48, 16, 12, hex('#ffffff')], [12, 66, 18, 14, hex('#a8d8f0')], [32, 64, 12, 18, hex('#f8c8d8')], [14, 86, 28, 22, hex('#ffffff')]]) {
    rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#6a4a2a')); rect(x, y, x + w, y + hh, c); for (let j = y + 4; j < y + hh - 1; j += 3) rect(x + 2, j, x + 2 + Math.floor(h(x, j, 2) * (w - 4)), j, hex('#6a6a7a')); disco(x + w / 2, y + 1, 1.3, hex('#d84a3a')); }
  rect(16, 90, 38, 104, hex('#3a6ad8')); disco(27, 97, 4, hex('#f0d040'));
  // el archivador de metal
  a_sombra(R, 224, 158, 28, 2, 0.35); rect(198, 108, 250, 156, hex('#4a4e58')); rect(199, 109, 249, 155, hex('#8a909c')); rect(199, 109, 249, 109, hex('#c8ccd4'));
  for (let k = 0; k < 3; k++) { const y = 113 + k * 14; rect(203, y, 245, y + 11, hex('#6a707c')); rect(203, y, 245, y, hex('#a8aeb8')); rect(219, y + 4, 229, y + 5, hex('#c8ccd4')); rect(221, y + 2, 227, y + 2, hex('#f0ece0')); }
  // la ventana de la derecha (marco; el exterior va en cada fotograma)
  rect(268, 56, 319, 128, hex('#6a6e78')); rect(269, 57, 319, 127, hex('#a8acb4')); rect(266, 128, 319, 131, hex('#c8ccd4'));
  // el clavo y el cordel del calendario
  linea(126, 10, 66, 18, hex('#8a7a62')); linea(126, 10, 186, 18, hex('#8a7a62')); disco(126, 10, 1.5, hex('#4a4a54'));
  // la sombra del calendario en la pared
  a_velo(R, 66, 22, 194, 154, hex('#000000'), 0.18);
  // la parte de arriba del calendario: el dibujo de un juego (una nave sobre un planeta) y la espiral
  rect(62, 18, 190, 76, hex('#1a1a2a')); for (let y = 19; y <= 75; y++) for (let x = 63; x <= 189; x++) pset(x, y, a_tr(x, y) > (y - 19) / 70 ? hex('#141032') : hex('#2a1a5a'));
  for (let k = 0; k < 30; k++) pset(63 + Math.floor(h(k, 1, 8) * 126), 19 + Math.floor(h(k, 2, 8) * 50), k % 4 ? hex('#8a8ac8') : hex('#ffffff'));
  disco(150, 92, 34, hex('#c8603a')); R.recorte([63, 19, 189, 75]); disco(150, 92, 34, (x, y, d) => (d > 0.85 ? hex('#8a3a2a') : (x - y) % 9 === 0 ? hex('#a84a2a') : h(x >> 2, y >> 2, 3) < 0.3 ? hex('#e8804a') : hex('#d0683a'))); R.recorte(null);
  R.poligono([[92, 56], [102, 30], [112, 56]], hex('#c8ccd4')); R.poligono([[102, 30], [112, 56], [107, 56]], hex('#8a909c')); rect(96, 56, 108, 59, hex('#3a6ad8')); R.poligono([[92, 56], [86, 64], [96, 58]], hex('#d84a3a')); R.poligono([[112, 56], [118, 64], [108, 58]], hex('#d84a3a')); disco(102, 42, 2.4, hex('#4ab8f0')); pset(101, 41, hex('#ffffff'));
  rect(62, 76, 190, 78, hex('#3a3a44')); for (let x = 66; x < 188; x += 6) { rect(x, 75, x + 2, 79, hex('#c8ccd4')); pset(x, 75, hex('#ffffff')); }
  // el gancho y la anilla del cronómetro
  disco(236, 34, 1.5, hex('#4a4a54'));
}

function a_calendario(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(a_capa(R, 'calendario', () => a_calendarioFijo(R)));
  // por la ventana: cielo, una palmera que se mece y un tejado
  const V = [270, 58, 319, 126];
  a_cielo(R, t, V, [hex('#5a9ae0'), hex('#8ac0ec'), hex('#c8e2f4')], [hex('#ffffff'), hex('#e4ecf6'), hex('#a8b8d4')], { n: 3, alto: 0.4, k: 8 });
  R.recorte(V); a_caja(R, 270, 108, 319, 126, hex('#a84a3a')); for (let x = 270; x <= 319; x += 4) R.linea(x, 108, x - 2, 126, hex('#8a3a2a')); a_palmera(R, 296, 112, 46, t); R.recorte(null);
  rect(292, 57, 294, 127, hex('#a8acb4'));
  // la hoja del mes y, si se arranca, la de debajo y la que sale volando
  const mes = Math.max(6, Math.min(10, Math.round(o.mes ?? 7))), u = Math.max(0, Math.min(1, o.hojas ?? 0));
  const marca = o.marca === true ? 1 : (o.marca || 0), dia = o.dia ?? 0;
  const X0 = 62, Y0 = 80;
  if (u <= 0) a_hojaMes(R, X0, Y0, mes, dia, mes === 9 ? marca : 0);
  else {
    a_hojaMes(R, X0, Y0, mes + 1, 0, mes + 1 === 9 ? marca : 0);
    for (let x = X0; x < X0 + 128; x++) if (h(x, 1, 44) < 0.6) pset(x, Y0 + (h(x, 2, 44) < 0.5 ? 1 : 0), hex('#fbf8f0'));
    if (u < 1) { // la hoja arrancada: se pinta en un búfer y se copia girada y desplazada
      let b = a_capas.get('~hoja'); if (!b) { b = R.nuevo(); a_capas.set('~hoja', b); } b.fill(0); const prev = R.usar(b); a_hojaMes(R, X0, Y0, mes, dia, 0); R.usar(prev);
      const an = -u * 1.4, ca = Math.cos(an), sa = Math.sin(an), dx = -u * 150 + Math.sin(u * 7) * 6, dy = u * u * 70 - Math.sin(u * Math.PI) * 30, cx = X0 + 64, cy = Y0;
      for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const qx = x - cx - dx, qy = y - cy - dy, sx = Math.round(cx + qx * ca + qy * sa), sy = Math.round(cy - qx * sa + qy * ca);
        if (sx < X0 || sx > X0 + 127 || sy < Y0 || sy > Y0 + 69) continue; const c = b[sy * 320 + sx]; if (c) pset(x, y, (sy - Y0) / 70 > 1 - u ? a_mezcla(c, hex('#000000'), 0.15) : c); }
    }
  }
  // el cronómetro colgado: caja plateada con la corona, la esfera con las marcas y la aguja roja que gira
  const cr = o.crono != null ? o.crono : (t / 6) % 1, CX = 236, CY = 72;
  linea(CX, 34, CX, 44, hex('#8a8e98'));
  rect(CX - 3, 44, CX + 3, 49, hex('#6a6e78')); rect(CX - 2, 44, CX + 2, 45, hex('#e8ecf4')); rect(CX - 5, 46, CX - 4, 48, hex('#8a8e98')); rect(CX + 4, 46, CX + 5, 48, hex('#8a8e98'));
  disco(CX + 1, CY + 2, 22, hex('#4a4a54')); disco(CX, CY, 22, hex('#5a5e68')); disco(CX, CY, 21, hex('#c8ccd4')); disco(CX - 3, CY - 3, 15, hex('#e8ecf4')); disco(CX, CY, 18, hex('#f8f6ee'));
  for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2, L = k % 5 ? 16 : 14; pset(Math.round(CX + Math.cos(a) * L), Math.round(CY + Math.sin(a) * L), k % 5 ? hex('#a8a8b0') : hex('#2a2a30')); if (k % 15 === 0) pset(Math.round(CX + Math.cos(a) * 13), Math.round(CY + Math.sin(a) * 13), hex('#2a2a30')); }
  disco(CX, CY + 7, 4, hex('#e8e4d8')); { const a = -Math.PI / 2 + cr * 12 * Math.PI * 2 / 12 * 0.2; linea(CX, CY + 7, Math.round(CX + Math.cos(a) * 3), Math.round(CY + 7 + Math.sin(a) * 3), hex('#3a3a44')); }
  { const a = -Math.PI / 2 + cr * Math.PI * 2; linea(CX, CY, Math.round(CX + Math.cos(a) * 15), Math.round(CY + Math.sin(a) * 15), hex('#d82a2a')); linea(CX, CY, Math.round(CX - Math.cos(a) * 4), Math.round(CY - Math.sin(a) * 4), hex('#d82a2a')); }
  disco(CX, CY, 1.6, hex('#2a2a30')); pset(CX - 9, CY - 12, hex('#ffffff')); pset(CX - 10, CY - 11, hex('#ffffff'));
  return { suelo: 170, calendario: [62, 18, 190, 150], hoja: [X0, Y0, X0 + 127, Y0 + 69], crono: [CX, CY], ventana: V, archivador: [198, 108, 250, 156] };
}

// ═══ 'despachoProg' ═══
function a_despachoFijo(R) {
  const { rect, pset, linea, disco, poligono } = R;
  // la pared de bloques pintados de azul oscuro, con su junta y la luz del flexo
  for (let y = 0; y <= 129; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 8), bx = (x + (fila % 2) * 8) % 16, by = y % 8, tranquila = x > 272 && y < 48;
    let c = h(x, y, 3) < 0.08 ? hex('#2a3042') : hex('#2e3446'); if (!tranquila && (bx === 0 || by === 0)) c = hex('#242a3a'); else if (!tranquila && by === 1) c = hex('#363c50');
    const d = Math.hypot(x - 168, (y - 118) * 1.4); if (d < 70 && a_tr(x, y) < (1 - d / 70) * 0.7) c = a_mezcla(c, hex('#c8985a'), 0.18); pset(x, y, c); }
  rect(0, 126, 319, 129, hex('#1a1e28')); rect(0, 126, 319, 126, hex('#3a4054'));
  // la moqueta de losetas oscuras
  for (let y = 130; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x, y, 5) < 0.15 ? hex('#30303a') : hex('#3a3a46'); if (x % 30 === 0 || (y - 130) % 18 === 0) c = hex('#2a2a32'); if (y < 138 && a_tr(x, y) > (y - 130) / 8) c = hex('#26262e'); pset(x, y, c); }
  // la pizarra blanca: marco de aluminio, manchas y los dibujos a rotulador (fosos, un muñeco que salta, un teléfono, una flor)
  rect(16, 24, 112, 80, hex('#6a6e78')); rect(17, 25, 111, 79, hex('#e8eaee')); rect(17, 25, 111, 25, hex('#c8ccd4'));
  for (let y = 26; y <= 78; y++) for (let x = 18; x <= 110; x++) if (h(x >> 1, y >> 1, 7) < 0.06) pset(x, y, hex('#d0d4dc'));
  const az = hex('#2a4ab8'), ro = hex('#c82a2a'), ne = hex('#2a2a30'), ve = hex('#2a8a3a');
  linea(22, 56, 106, 56, ne); for (const fx of [36, 62, 88]) { rect(fx - 5, 57, fx + 5, 70, hex('#e8eaee')); linea(fx - 5, 56, fx - 5, 70, ne); linea(fx + 5, 56, fx + 5, 70, ne); linea(fx - 5, 70, fx + 5, 70, ne); for (let y = 57; y < 70; y++) for (let x = fx - 4; x <= fx + 4; x++) pset(x, y, (x + y) % 2 ? ne : hex('#5a5a66')); }
  disco(27, 46, 2, ve); linea(27, 48, 27, 53, ve); linea(25, 50, 29, 50, ve); linea(27, 53, 25, 55, ve); linea(27, 53, 29, 55, ve);
  for (let k = 0; k <= 10; k++) { const x = 30 + k * 2.4, y = 50 - Math.sin(k / 10 * Math.PI) * 14; pset(Math.round(x), Math.round(y), ro); } linea(56, 50, 53, 47, ro); linea(56, 50, 52, 51, ro);
  rect(70, 32, 80, 35, ne); rect(70, 36, 72, 38, ne); rect(78, 36, 80, 38, ne); linea(82, 34, 88, 30, ro); linea(88, 30, 86, 30, ro); rect(90, 30, 96, 36, az); linea(91, 31, 95, 35, az);
  disco(104, 44, 2.5, ro); for (const [a, b] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) disco(104 + a, 44 + b, 1.4, ro); linea(104, 47, 104, 54, ve); linea(104, 51, 107, 49, ve);
  a_digitos(R, '8', 40, 30, 1, az); linea(46, 36, 54, 36, az); a_digitos(R, '5', 58, 30, 1, ro);
  rect(14, 80, 114, 82, hex('#8a8e98')); rect(30, 79, 38, 80, hex('#2a4ab8')); rect(42, 79, 50, 80, hex('#c82a2a')); rect(90, 78, 100, 80, hex('#3a3a44'));
  // la estantería de carpetas de la derecha
  rect(272, 60, 318, 128, hex('#1a1408')); a_tablas(R, 273, 61, 317, 127, [hex('#5a3a1e'), hex('#3a2410'), hex('#7a5230'), hex('#4a2e18')], { w: 45, k: 31, nudos: false });
  for (const ys of [82, 104, 126]) { rect(273, ys, 317, ys + 1, hex('#7a5230')); let x = 275; while (x < 315) { const c = [hex('#d84a3a'), hex('#3a6ad8'), hex('#e8c040'), hex('#3a9a4a'), hex('#e8e0d0')][Math.floor(h(x, ys, 3) * 5)], al = 16 + Math.floor(h(x, ys, 4) * 4); rect(x, ys - al, x + 3, ys - 1, c); rect(x + 3, ys - al, x + 3, ys - 1, a_mezcla(c, hex('#000000'), 0.4)); rect(x + 1, ys - al + 3, x + 2, ys - al + 4, hex('#f8f4e8')); x += 5; } }
  // el archivador con la cafetera (la luz y el vapor van en cada fotograma)
  rect(158, 96, 190, 130, hex('#2a2e38')); rect(159, 97, 189, 129, hex('#5a606c')); rect(159, 97, 189, 97, hex('#8a909c'));
  for (let k = 0; k < 2; k++) { const y = 101 + k * 14; rect(162, y, 186, y + 11, hex('#4a505c')); rect(162, y, 186, y, hex('#7a808c')); rect(170, y + 4, 178, y + 5, hex('#a8aeb8')); }
  rect(164, 78, 184, 96, hex('#1a1a1e')); rect(165, 79, 183, 82, hex('#3a3a44')); rect(167, 86, 179, 95, hex('#c8d8e0')); rect(168, 89, 178, 95, hex('#4a2a14')); rect(168, 89, 178, 89, hex('#7a4a24')); rect(180, 87, 182, 92, hex('#1a1a1e'));
  // torres de manuales en el suelo
  for (const [x0, n, k] of [[2, 9, 0], [188, 4, 1]]) for (let i = 0; i < n; i++) { const y = 150 - i * 6, c = [hex('#e8e0c8'), hex('#3a6ad8'), hex('#d84a3a'), hex('#e8c040'), hex('#f0ece0')][(i + k) % 5], dx = Math.round((h(i, k, 9) - 0.5) * 3);
    rect(x0 + dx, y - 5, x0 + dx + 18, y, hex('#1a1a1e')); rect(x0 + dx + 1, y - 4, x0 + dx + 17, y - 1, c); rect(x0 + dx + 1, y - 4, x0 + dx + 17, y - 4, a_mezcla(c, hex('#ffffff'), 0.4)); rect(x0 + dx + 3, y - 2, x0 + dx + 9, y - 2, a_mezcla(c, hex('#000000'), 0.4)); }
  // la ventana de noche: el marco (el cielo va en cada fotograma)
  rect(194, 22, 270, 94, hex('#4a4e58')); rect(195, 23, 269, 93, hex('#6a6e78')); rect(192, 94, 272, 96, hex('#8a8e98'));
  // el carrito de la tele de pruebas: la tele de madera y la balda de abajo
  a_sombra(R, 234, 153, 32, 2, 0.45);
  rect(204, 128, 264, 131, hex('#8a8e98')); rect(204, 128, 264, 128, hex('#c8ccd4')); rect(206, 142, 262, 144, hex('#6a6e78')); rect(206, 142, 262, 142, hex('#a8acb4'));
  for (const x of [206, 261]) rect(x, 131, x + 1, 150, hex('#6a6e78')); for (const x of [207, 261]) { disco(x, 151, 2, hex('#1a1a1e')); pset(x, 150, hex('#6a6a72')); }
  rect(206, 96, 262, 128, hex('#24140a')); a_tablas(R, 207, 97, 261, 127, [hex('#7a4a26'), hex('#4a2a14'), hex('#9a643a'), hex('#683e20')], { w: 55, vertical: false, k: 33, nudos: false });
  rect(210, 99, 246, 125, hex('#140c08')); rect(250, 100, 258, 124, hex('#3a2414')); for (let y = 110; y < 124; y += 2) rect(251, y, 257, y, hex('#5a4a30'));
  disco(254, 103, 2, hex('#c8c4b8')); disco(254, 107, 1.5, hex('#c8c4b8'));
  // bolas de papel, cables y una caja de pizza en la moqueta
  for (const [x, y] of [[150, 170], [120, 176], [266, 166], [300, 174], [186, 160]]) { disco(x, y, 2.5, hex('#e8e8e0')); pset(x - 1, y - 1, hex('#ffffff')); pset(x + 1, y, hex('#b8b8b0')); }
  linea(234, 144, 250, 160, hex('#141418')); linea(250, 160, 300, 162, hex('#141418')); linea(212, 140, 196, 150, hex('#141418'));
  R.poligono([[276, 166], [306, 166], [310, 173], [272, 173]], hex('#c8a060')); rect(272, 173, 310, 175, hex('#8a6a3a')); R.disco(291, 169, 3, hex('#d84a3a')); rect(280, 167, 285, 168, hex('#a8803a')); pset(298, 170, hex('#f0d080'));
}

function a_despacho(R, t, o) {
  const { rect, pset, linea, disco } = R;
  R.copiar(a_capa(R, 'despacho', () => a_despachoFijo(R)));
  // la noche por la ventana: estrellas que titilan, la luna, los montes con las luces de la ciudad, palmeras y un avión
  const V = [196, 24, 268, 92];
  a_degradado(R, 196, 24, 268, 92, [hex('#0a0e24'), hex('#141a3e'), hex('#22285a'), hex('#3a3a6a')]);
  R.recorte(V);
  for (let k = 0; k < 26; k++) { const x = 196 + Math.floor(h(k, 1, 71) * 72), y = 24 + Math.floor(h(k, 2, 71) * 46); if (Math.sin(t * (1 + h(k, 3, 71) * 3) + k) > -0.4) pset(x, y, k % 5 ? hex('#a8b0d8') : hex('#ffffff')); }
  disco(252, 38, 6, hex('#f0ecd0')); disco(255, 36, 5.5, hex('#0e1430')); pset(248, 40, hex('#d8d4b8'));
  R.poligono([[196, 74], [214, 66], [232, 72], [252, 62], [268, 68], [268, 92], [196, 92]], hex('#141428'));
  for (let k = 0; k < 30; k++) { const x = 198 + Math.floor(h(k, 4, 72) * 68), y = 74 + Math.floor(h(k, 5, 72) * 16); if (Math.sin(t * 2 + k * 3) > -0.8) pset(x, y, [hex('#f8d870'), hex('#f8f0c8'), hex('#f08a4a')][k % 3]); }
  a_palmera(R, 206, 92, 30, t, { c: [hex('#0a0a18'), hex('#0a0a18'), hex('#0e1020'), hex('#0a0a18'), hex('#1a1e34')] }); a_palmera(R, 260, 92, 24, t + 2, { c: [hex('#0a0a18'), hex('#0a0a18'), hex('#0e1020'), hex('#0a0a18'), hex('#1a1e34')], curva: -0.2 });
  { const u = (t % 14) / 14, ax = Math.round(186 + u * 100), ay = Math.round(34 + u * 6); pset(ax, ay, hex('#c8c8d8')); pset(ax + 1, ay, hex('#c8c8d8')); if (Math.floor(t * 3) % 2) pset(ax + 2, ay, hex('#f03a3a')); else pset(ax - 1, ay, hex('#3af06a')); }
  R.recorte(null);
  for (let y = 24; y <= 40; y += 2) { rect(196, y, 268, y, hex('#a8acb4')); rect(196, y + 1, 268, y + 1, hex('#6a6e78')); }
  rect(231, 24, 233, 92, hex('#6a6e78'));
  // el calendario pequeño de la pared, que pierde hojas (o.hojas) y el clavo
  { const mes = Math.max(6, Math.min(10, Math.round(o.mes ?? 8))), u = Math.max(0, Math.min(1, o.hojas ?? 0)), CB = { 6: hex('#3a9a4a'), 7: hex('#e8803a'), 8: hex('#d8a020'), 9: hex('#3a6ad8'), 10: hex('#a84ab8') };
    const hoja = (x0, y0, m) => { rect(x0, y0, x0 + 26, y0 + 30, hex('#f0ece0')); rect(x0, y0, x0 + 26, y0 + 7, CB[m] ?? hex('#d84a3a')); a_digitos(R, m, x0 + 12, y0 + 1, 1, hex('#ffffff')); for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) pset(x0 + 3 + i * 4, y0 + 11 + j * 5, hex('#6a6a7a')); };
    disco(137, 28, 1.2, hex('#8a8e98')); hoja(124, 32, u > 0 ? mes + 1 : mes);
    if (u > 0 && u < 1) { const x = Math.round(124 - u * 60 + Math.sin(u * 9) * 4), y = Math.round(32 + u * u * 100 - Math.sin(u * Math.PI) * 12), w = Math.max(4, Math.round(26 * Math.abs(Math.cos(u * 8))));
      rect(x + 13 - (w >> 1), y, x + 13 + (w >> 1), y + 28, hex('#f8f4e8')); rect(x + 13 - (w >> 1), y, x + 13 + (w >> 1), y + 6, CB[mes] ?? hex('#d84a3a')); rect(x + 13 + (w >> 1), y, x + 13 + (w >> 1), y + 28, hex('#b8b4a8')); }
    // hojas ya caídas en la moqueta
    for (let k = 0; k < Math.max(0, mes - 6); k++) { const x = 120 + k * 9, y = 168 + (k % 2) * 4; rect(x, y, x + 8, y + 2, hex('#e8e4d8')); rect(x, y, x + 2, y + 2, CB[6 + k] ?? hex('#d84a3a')); } }
  // la cafetera: el piloto y el vapor
  pset(181, 84, Math.sin(t * 3) > -0.3 ? hex('#f03a2a') : hex('#6a1a1a')); a_humo(R, 173, 85, t, hex('#c8d0e0'), { alto: 18, n: 7 });
  // la tele de pruebas con el juego
  const P = [212, 101, 244, 123];
  const j = a_juego(R, t, P, { juego: o.juego, cae: o.cae, piezas: o.piezas });
  a_crt(R, 210, 99, 246, 125, { marco: hex('#140c08'), barrido: 0.1 });
  for (let x = 206; x <= 262; x += 2) pset(x, 129, a_mezcla(R.pget(x, 129), hex('#5adc5a'), 0.2));
  a_pieza('consolaVieja', R, 234, 142, { cartucho: 'verde' });
  return { suelo: 152, pizarra: [16, 24, 112, 80], calendario: [124, 32, 150, 62], ventana: V, tele: P, carrito: [204, 96, 264, 153], consola: [234, 142], escritorio: [18, 145, 180, 180], terminal: [36, 110, 78, 138], teclado: [86, 142, 126, 149] };
}

// el escritorio de delante: la terminal con texto verde que corre, el teclado, las tazas que humean, los manuales, el
// flexo con su luz y el papel continuo que cuelga del canto
function a_despachoDelante(R, t, o) {
  const { rect, pset, linea, disco, poligono } = R;
  // el tablero (y 146–151) con la luz del flexo, el faldón con su veta y los cajones
  rect(18, 145, 180, 152, hex('#1a120a'));
  for (let y = 146; y <= 151; y++) for (let x = 19; x <= 179; x++) { let c = h(x >> 3, y, 51) < 0.35 ? hex('#6a4a2a') : hex('#7a5632'); if (y === 146) c = hex('#a87a4a'); const d = Math.abs(x - 160); if (d < 30 && a_tr(x, y) < (1 - d / 30)) c = a_mezcla(c, hex('#f8d890'), 0.3); pset(x, y, c); }
  rect(20, 153, 178, 179, hex('#3a2814')); for (let y = 154; y <= 179; y++) for (let x = 21; x <= 177; x++) if (h(x >> 2, y, 52) < 0.2) pset(x, y, hex('#4a3420'));
  rect(20, 153, 178, 154, hex('#2a1a0c')); rect(24, 157, 64, 167, hex('#4a3420')); rect(24, 157, 64, 157, hex('#6a4a2a')); rect(40, 161, 48, 162, hex('#a8a090')); rect(24, 170, 64, 179, hex('#4a3420')); rect(24, 170, 64, 170, hex('#6a4a2a')); rect(40, 174, 48, 175, hex('#a8a090'));
  // la terminal: carcasa, pantalla con renglones verdes que corren y el cursor
  rect(32, 106, 82, 146, hex('#5a5648')); rect(33, 107, 81, 145, hex('#b8b09a')); rect(33, 107, 81, 107, hex('#d8d0b8')); rect(81, 108, 81, 145, hex('#8a8270'));
  rect(36, 110, 78, 138, hex('#06140a'));
  const sc = Math.floor(t * 3);
  for (let j = 0; j < 12; j++) { const fila = j + sc, L = 4 + Math.floor(h(fila, 1, 53) * 30), ind = Math.floor(h(fila, 2, 53) * 3) * 3, y = 112 + j * 2; if (y > 136) break; let x = 38 + ind; while (x < 38 + ind + L && x < 76) { const w = 1 + Math.floor(h(fila, x, 54) * 4); rect(x, y, Math.min(76, x + w - 1), y, j === 11 ? hex('#a8f8a8') : hex('#3ad84a')); x += w + 1; } }
  if (Math.floor(t * 2) % 2) rect(40, 136, 42, 136, hex('#c8ffc8'));
  a_crt(R, 36, 110, 78, 138, { marco: hex('#06140a'), barrido: 0.2 });
  rect(38, 140, 46, 141, hex('#3a3a30')); rect(70, 141, 72, 142, Math.sin(t * 2) > 0 ? hex('#3ad84a') : hex('#1a4a1a'));
  for (let x = 30; x <= 84; x += 2) pset(x, 147, a_mezcla(R.pget(x, 147), hex('#3ad84a'), 0.25));
  // el teclado
  rect(86, 142, 126, 149, hex('#5a5648')); rect(87, 142, 125, 148, hex('#b8b09a')); for (let x = 88; x < 124; x += 3) for (const y of [143, 145, 147]) { pset(x, y, hex('#e8e0c8')); pset(x + 1, y, hex('#8a8270')); }
  if (Math.sin(t * 9) > 0.3) pset(90 + (Math.floor(t * 7) % 11) * 3, 145, hex('#5a5648'));
  // las tazas con café y vapor
  for (const x of [130, 140]) { rect(x, 139, x + 6, 146, hex('#e8e0d0')); rect(x, 139, x + 6, 139, hex('#ffffff')); rect(x + 6, 140, x + 6, 145, hex('#b8b0a0')); rect(x + 7, 141, x + 8, 144, hex('#e8e0d0')); rect(x + 1, 140, x + 5, 140, hex('#4a2a14')); a_humo(R, x + 3, 138, t + x, hex('#c8c8d0'), { alto: 14 }); }
  // la pila de manuales
  for (let i = 0; i < 4; i++) { const y = 145 - i * 4, c = [hex('#3a6ad8'), hex('#e8e0c8'), hex('#d84a3a'), hex('#3a9a4a')][i]; rect(150 + (i % 2), y - 3, 166 + (i % 2), y, hex('#1a1a1e')); rect(151 + (i % 2), y - 2, 165 + (i % 2), y - 1, c); rect(151 + (i % 2), y - 2, 165 + (i % 2), y - 2, a_mezcla(c, hex('#ffffff'), 0.35)); }
  // el flexo: pie, brazo, la pantalla y el cono de luz
  rect(168, 143, 178, 146, hex('#2a2a30')); rect(168, 143, 178, 143, hex('#5a5a66')); linea(172, 143, 176, 126, hex('#3a3a44')); linea(176, 126, 166, 116, hex('#3a3a44'));
  poligono([[160, 114], [170, 112], [170, 120], [158, 120]], hex('#2a6a4a')); linea(160, 114, 170, 112, hex('#4a9a6a')); rect(160, 120, 168, 121, hex('#fff4c0'));
  for (let y = 122; y <= 145; y++) { const w = (y - 121) * 0.9; for (let x = Math.round(164 - w); x <= 164 + w; x++) if ((x + y) % 2 === 0 && x > 18 && x < 180) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8e0a0'), 0.18)); }
  // el papel continuo que cuelga del canto, con sus rayas verdes y sus agujeros
  for (let y = 147; y <= 174; y++) { const off = Math.round(Math.sin(y * 0.15 + t * 0.6) * 1.2); for (let x = 96 + off; x <= 114 + off; x++) { let c = Math.floor((y - 147) / 3) % 2 ? hex('#d8f0d8') : hex('#f4f8f0'); if (x === 96 + off || x === 114 + off) c = (y % 3 === 0) ? hex('#a8b0a0') : hex('#e8ece0'); pset(x, y, c); } }
  for (let x = 92; x <= 118; x++) pset(x, 175 + Math.round(Math.sin(x * 0.4) * 1), hex('#c8d0c0'));
  return { escritorio: [18, 145, 180, 180], terminal: [36, 110, 78, 138], teclado: [86, 142, 126, 149], tazas: [[133, 139], [143, 139]], flexo: [164, 120] };
}

// la tele de pruebas de cerca, con el juego inventado y, debajo, la consola, el mando, cartuchos y una taza
function a_despachoPantallaFijo(R) {
  const { rect, pset, disco } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 10), bx = (x + (fila % 2) * 10) % 20, by = y % 10, tranquila = x > 270 && y < 48; let c = hex('#2e3446'); if (!tranquila && (bx === 0 || by === 0)) c = hex('#242a3a'); pset(x, y, c); }
  rect(36, 8, 284, 144, hex('#1e1008')); a_tablas(R, 37, 9, 283, 143, [hex('#7a4a26'), hex('#4a2a14'), hex('#9a643a'), hex('#683e20')], { w: 135, vertical: false, k: 35 });
  a_velo(R, 272, 9, 283, 48, hex('#4a2a14'), 0.5);
  rect(44, 14, 258, 136, hex('#140c08')); rect(46, 16, 256, 134, hex('#3a2a22')); rect(46, 16, 256, 16, hex('#5a463a'));
  rect(264, 30, 278, 130, hex('#2e1a0c')); for (let y = 70; y < 128; y += 3) rect(265, y, 277, y, hex('#5a4a30')); disco(271, 40, 5, hex('#c8c4b8')); disco(271, 56, 4, hex('#c8c4b8')); pset(270, 39, hex('#ffffff'));
  // la balda de abajo: chapa del carrito
  rect(0, 146, 319, 179, hex('#5a5e68')); rect(0, 146, 319, 147, hex('#a8acb4')); for (let x = 0; x < 320; x += 2) if (h(x, 1, 3) < 0.4) pset(x, 150 + (x % 7), hex('#6a6e78'));
}

function a_despachoPantalla(R, t, o) {
  const { rect, pset, linea } = R;
  R.copiar(a_capa(R, 'despachoP', () => a_despachoPantallaFijo(R)));
  const P = [52, 22, 250, 128];
  const j = a_juego(R, t, P, { juego: o.juego, cae: o.cae, piezas: o.piezas, puntos: o.puntos });
  a_crt(R, 48, 18, 254, 132, { marco: hex('#3a2a22') });
  for (let x = 48; x <= 254; x += 2) pset(x, 136, a_mezcla(R.pget(x, 136), hex('#6a8ad0'), 0.18));
  a_pieza('consolaVieja', R, 132, 176, { s: 2, cartucho: 'verde' });
  a_pieza('joystick', R, 232, 178, { s: 2, inclina: Math.sin(t * 2.5) * 0.9, pulsado: Math.sin(t * 6) > 0.6 });
  linea(226, 160, 200, 166, hex('#141418')); linea(200, 166, 166, 160, hex('#141418'));
  a_pieza('cartucho', R, 40, 178, { color: 'verde', icono: 'foso' }); a_pieza('cartucho', R, 58, 178, { color: 'rosa', icono: 'flor' });
  rect(280, 158, 292, 176, hex('#e8e0d0')); rect(280, 158, 292, 159, hex('#ffffff')); rect(293, 162, 295, 170, hex('#e8e0d0')); rect(281, 160, 291, 160, hex('#4a2a14')); a_humo(R, 286, 157, t, hex('#c8c8d0'), { alto: 16 });
  return { suelo: 179, pantalla: P, juego: j, consola: [132, 176], mando: [232, 178] };
}

// ═══ 'juntas' ═══
// la gráfica de la pantalla de proyección en el rectángulo [x0, y0, x1, y1]: rejilla, años en cifras, barras azules y
// la línea que sube y se desploma en rojo (u 0–1 la dibuja), con la flecha al final; o.cifra en rojo grande
function a_grafica(R, t, [x0, Y0, x1, y1], u, o = {}) {
  const { pset } = R, W = x1 - x0, e = W > 150 ? 2 : 1, ec = e * 2, y0 = o.cifra != null ? Y0 + ec * 5 + 4 : Y0, ax = x0 + 8 * e, ay = y1 - 9 * e;
  for (let y = y0; y <= ay; y += 6 * e) for (let x = ax; x <= x1; x += 2) pset(x, y, hex('#c8ccd4'));
  for (let y = y0; y <= ay; y++) { pset(ax, y, hex('#3a3a44')); if (e > 1) pset(ax - 1, y, hex('#3a3a44')); }
  for (let x = ax; x <= x1; x++) { pset(x, ay, hex('#3a3a44')); if (e > 1) pset(x, ay + 1, hex('#3a3a44')); }
  const V = [0.42, 0.55, 0.68, 0.8, 0.88, 0.74, 0.38, 0.08], n = V.length, X = (i) => ax + 4 * e + i * (x1 - ax - 8 * e) / (n - 1), Y = (v) => ay - 2 - v * (ay - y0 - 4);
  for (let i = 0; i < n; i++) { const bw = 2 * e + 1, x = Math.round(X(i)) - bw; a_caja(R, x, Math.round(Y(V[i] * 0.6)), x + bw - 1, ay - 1, i < 5 ? hex('#8ab0e0') : hex('#e8a8a8')); }
  for (let k = 0; k < 4; k++) a_digitos(R, k, x0 + 1, Math.round(Y(k / 3)) - 2 * e, e, hex('#5a5a66'));
  for (const [i, yy] of [[0, 81], [3, 82], [6, 83]]) a_digitos(R, yy, Math.round(X(i)) - 3 * e, ay + 3 * e, e, hex('#5a5a66'));
  const L = Math.max(0, Math.min(1, u)) * (n - 1);
  for (let i = 0; i < Math.ceil(L) && i < n - 1; i++) { const f = Math.min(1, L - i), xa = X(i), ya = Y(V[i]), xb = xa + (X(i + 1) - xa) * f, yb = ya + (Y(V[i + 1]) - ya) * f, c = V[i + 1] < V[i] ? hex('#e02a2a') : hex('#2a8a3a');
    for (let d = -Math.floor(e / 2) - 1; d <= Math.floor(e / 2); d++) R.linea(Math.round(xa), Math.round(ya) + d, Math.round(xb), Math.round(yb) + d, c);
    if (V[i + 1] < V[i]) for (let x = Math.round(xa); x <= xb; x++) { const yl = ya + (yb - ya) * (x - xa) / Math.max(1, xb - xa); for (let y = Math.round(yl) + 2; y < ay; y += 2) if ((x + y) % 4 === 0) pset(x, y, hex('#f0b0b0')); }
    if (i === Math.ceil(L) - 1) { const sx = Math.round(xb), sy = Math.round(yb); R.disco(sx, sy, 1.5 * e, c); if (u >= 1) { R.poligono([[sx - 3 * e, sy - 2 * e], [sx + 3 * e, sy - 2 * e], [sx, sy + 3 * e]], hex('#e02a2a')); } } }
  if (o.cifra != null) { const s = String(o.cifra); a_digitos(R, s, Math.round(x1 - s.length * 4 * ec), Y0, ec, hex('#d82a2a'), hex('#8a1a1a')); }
}

function a_juntasFijo(R, sillas) {
  const { rect, pset, linea, disco, poligono } = R;
  // el techo con focos empotrados y la moldura
  for (let y = 0; y <= 14; y++) for (let x = 0; x < 320; x++) pset(x, y, h(x, y, 1) < 0.1 ? hex('#cec6b2') : hex('#dcd4c0'));
  for (const x of [190, 236]) { disco(x, 8, 3, hex('#a89e88')); disco(x, 8, 2, hex('#fff8e0')); }
  rect(0, 15, 319, 17, hex('#4a2a14')); rect(0, 15, 319, 15, hex('#8a5a32'));
  // los paneles de nogal (lisos y oscuros en la esquina de Atom) con la moldura horizontal
  a_tablas(R, 0, 18, 319, 137, [hex('#5a3420'), hex('#341c10'), hex('#74462a'), hex('#4a2a18')], { w: 14, k: 51 });
  for (let y = 18; y <= 50; y++) for (let x = 272; x < 320; x++) pset(x, y, a_tr(x, y) < 0.2 ? hex('#56321e') : hex('#5a3420'));
  rect(0, 100, 319, 102, hex('#341c10')); rect(0, 100, 319, 100, hex('#8a5a36'));
  // la ventana (marco; el exterior va en cada fotograma) y la credencia de debajo
  rect(8, 22, 114, 106, hex('#2a1a10')); rect(9, 23, 113, 105, hex('#8a8e98'));
  rect(12, 106, 110, 137, hex('#2a160a')); a_tablas(R, 13, 107, 109, 136, [hex('#6a3e22'), hex('#3e2212'), hex('#8a5632'), hex('#5a321c')], { w: 24, k: 53 });
  // el estuche de la pantalla y el reloj
  rect(134, 17, 258, 21, hex('#4a4e58')); rect(134, 17, 258, 17, hex('#a8acb4')); rect(256, 18, 258, 21, hex('#2a2a30'));
  disco(124, 42, 7, hex('#2a1a10')); disco(124, 42, 6, hex('#c8a040')); disco(124, 42, 5, hex('#f4f0e4'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(124 + Math.cos(a) * 4), Math.round(42 + Math.sin(a) * 4), hex('#5a5a66')); }
  // la puerta con sus cuarterones, el pomo de latón y el marco
  rect(262, 50, 310, 138, hex('#2a160a')); rect(264, 52, 308, 137, hex('#8a5a32'));
  a_tablas(R, 266, 54, 306, 137, [hex('#7a4a28'), hex('#4a2a16'), hex('#9a643a'), hex('#683e20')], { w: 41, k: 55, nudos: false });
  for (const [a, b] of [[58, 92], [98, 132]]) for (const [c, d] of [[270, 284], [288, 302]]) { rect(c, a, d, b, hex('#4a2a16')); rect(c + 1, a + 1, d - 1, b - 1, hex('#6a3e22')); rect(c + 1, a + 1, d - 1, a + 1, hex('#a8703e')); }
  disco(300, 98, 2, hex('#6a4a10')); disco(300, 97, 1.6, hex('#e8c050')); pset(299, 96, hex('#fff4c0'));
  // la planta alta entre la pantalla y la puerta
  rect(250, 120, 262, 137, hex('#3a3a44')); rect(250, 120, 262, 121, hex('#6a6a74'));
  // el suelo: moqueta granate con dibujo de rombos
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { let c = ((x + y * 2) % 12 === 0 || (x - y * 2 + 600) % 12 === 0) ? hex('#5a1a22') : h(x, y, 7) < 0.15 ? hex('#6a222a') : hex('#7a2a30'); if (y < 144 && a_tr(x, y) > (y - 138) / 6) c = hex('#4a141a'); pset(x, y, c); }
  // los sillones de cuero (respaldo capitoné con los botones; los consejeros se sientan delante)
  for (const x of sillas) { rect(x - 10, 106, x + 10, 138, hex('#1a0e08')); for (let y = 107; y <= 137; y++) for (let i = -9; i <= 9; i++) { const bx = (i + 9) % 6, by = (y - 107) % 6; let c = hex('#3a2014'); if (bx === 3 && by === 3) c = hex('#1a0e08'); else if (bx < 2 && by < 2) c = hex('#5a3420'); if (i === -9) c = hex('#6a4028'); pset(x + i, y, c); }
    rect(x - 9, 106, x + 9, 107, hex('#7a4a30')); pset(x - 10, 106, hex('#2a1608')); pset(x + 10, 106, hex('#2a1608')); }
}

function a_juntas(R, t, o) {
  const { rect, pset, linea, disco } = R;
  const sillas = o.sillas ?? [52, 96, 140, 184, 228];
  R.copiar(a_capa(R, 'juntas' + sillas.join(','), () => a_juntasFijo(R, sillas)));
  // la ciudad por la ventana: cielo con nubes, rascacielos con ventanas que se encienden, un helicóptero y pájaros
  const V = [10, 24, 112, 104];
  a_cielo(R, t, V, [hex('#6a9ad0'), hex('#8ab4e0'), hex('#b8d4ec'), hex('#dceaf2')], [hex('#ffffff'), hex('#e0e8f2'), hex('#a8b4cc')], { n: 4, alto: 0.3, k: 11 });
  R.recorte(V);
  const TOR = [[10, 64, 18, hex('#7a8aa0')], [26, 44, 16, hex('#5a6a84')], [40, 58, 14, hex('#8a96a8')], [52, 36, 20, hex('#4a5a74')], [70, 54, 16, hex('#6a7a90')], [84, 40, 14, hex('#7a8aa0')], [96, 60, 16, hex('#5a6a84')]];
  for (const [x, y, w, c] of TOR) { a_caja(R, x, y, x + w, 104, c); a_caja(R, x + w - 2, y, x + w, 104, a_mezcla(c, hex('#000000'), 0.3)); a_caja(R, x, y, x + w, y, a_mezcla(c, hex('#ffffff'), 0.3));
    for (let yy = y + 3; yy < 104; yy += 4) for (let xx = x + 2; xx < x + w - 2; xx += 3) { const on = h(xx, yy, Math.floor(t * 0.4 + xx * 0.1)) < 0.25; pset(xx, yy, on ? hex('#f8e8a0') : hex('#9ab4cc')); pset(xx + 1, yy, on ? hex('#e8d080') : hex('#8aa4bc')); } }
  if (Math.floor(t * 1.5) % 2) pset(62, 35, hex('#f03a2a'));
  { const u = (t % 16) / 16, hx = Math.round(130 - u * 150), hy = Math.round(40 + Math.sin(t * 2) * 1.5); a_caja(R, hx, hy, hx + 6, hy + 3, hex('#3a3a44')); a_caja(R, hx + 7, hy + 1, hx + 13, hy + 1, hex('#3a3a44')); pset(hx + 1, hy + 1, hex('#a8d0e8'));
    const a = Math.floor(t * 20) % 2; R.linea(hx - 4 + a * 2, hy - 2, hx + 10 - a * 2, hy - 2, hex('#2a2a30')); R.linea(hx + 3, hy - 1, hx + 3, hy, hex('#2a2a30')); R.linea(hx + 1, hy + 4, hx + 6, hy + 4, hex('#2a2a30')); }
  R.recorte(null);
  for (let y = 24; y <= 36; y += 2) { rect(10, y, 112, y, hex('#e8e4d8')); rect(10, y + 1, 112, y + 1, hex('#b8b4a8')); }
  rect(60, 24, 62, 104, hex('#8a8e98')); rect(10, 64, 112, 65, hex('#8a8e98'));
  // la pantalla de proyección con la gráfica, iluminada por el proyector
  const S = [140, 22, 252, 100];
  for (let y = 22; y <= 100; y++) for (let x = 140; x <= 252; x++) { const d = Math.hypot((x - 196) / 56, (y - 62) / 40); pset(x, y, d < 0.6 ? hex('#fbf8f0') : a_tr(x, y) < (d - 0.6) * 1.2 ? hex('#d8d4c8') : hex('#eeeae0')); }
  rect(140, 100, 252, 102, hex('#2a2a30')); linea(196, 102, 196, 108, hex('#8a8e98')); disco(196, 109, 1.5, hex('#c8ccd4'));
  a_grafica(R, t, [146, 28, 246, 92], o.grafica ?? 0.5, { cifra: o.cifra });
  // el haz del proyector, con motas de polvo que flotan
  for (let y = 24; y <= 112; y += 1) { const f = (y - 24) / 88, xa = Math.round(140 + (196 - 140) * f), xb = Math.round(252 - (252 - 198) * f);
    if (y > 102) for (let x = xa; x <= xb; x++) if ((x + y) % 3 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8f0d0'), 0.15)); }
  for (let k = 0; k < 14; k++) { const y = Math.round(103 + ((h(k, 1, 91) * 9 + t * (1 + h(k, 2, 91) * 2)) % 9)), f = (y - 24) / 88, xa = 140 + 56 * f, xb = 252 - 54 * f, x = Math.round(xa + h(k, 3, 91) * (xb - xa) + Math.sin(t + k) * 2); if (Math.sin(t * 1.5 + k) > 0) pset(x, y, hex('#f8f0d0')); }
  // las agujas del reloj
  { const m = t * 0.5; linea(124, 42, Math.round(124 + Math.sin(m) * 4), Math.round(42 - Math.cos(m) * 4), hex('#1a1a1e')); linea(124, 42, 126, 40, hex('#1a1a1e')); }
  // la planta que se mece
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32 + Math.sin(t * 1.2 + k) * 0.05, L = 14 + (k % 3) * 4; for (let s = 0; s < L; s++) { const x = Math.round(256 + Math.cos(a) * s), y = Math.round(120 + Math.sin(a) * s + (s * s) / (L * 4)); pset(x, y, s > L * 0.6 ? hex('#3a8a3a') : hex('#2a6a2a')); if (s % 3 === 0) pset(x + 1, y, hex('#5aa84a')); } }
  // el cartel de venta en la puerta: una flecha y una llave
  if (o.letrero) { const sw = Math.round(Math.sin(t * 2) * 1); linea(280, 60, 274 + sw, 66, hex('#c8c0a8')); linea(292, 60, 298 + sw, 66, hex('#c8c0a8')); disco(286, 59, 1.2, hex('#c8a040'));
    rect(270 + sw, 66, 302 + sw, 84, hex('#5a1a10')); rect(271 + sw, 67, 301 + sw, 83, hex('#e83a2a')); rect(271 + sw, 67, 301 + sw, 67, hex('#f87a5a'));
    R.poligono([[274 + sw, 75], [282 + sw, 69], [282 + sw, 73], [288 + sw, 73], [288 + sw, 77], [282 + sw, 77], [282 + sw, 81]], hex('#ffffff'));
    disco(294 + sw, 72, 3, hex('#f0d040')); disco(294 + sw, 72, 1.2, hex('#e83a2a')); rect(293 + sw, 75, 295 + sw, 81, hex('#f0d040')); rect(295 + sw, 78, 297 + sw, 78, hex('#f0d040')); rect(295 + sw, 80, 297 + sw, 80, hex('#f0d040')); }
  return { suelo: 150, sillas, pantalla: S, ventana: V, puerta: [264, 52, 308, 138], libre: [256, 318], mesa: [0, 138, 254, 180] };
}

// la mesa larga de nogal con el reflejo de la ventana, carpetas, vasos, la jarra, la calculadora y el proyector
function a_juntasDelante(R, t, o) {
  const { rect, pset, poligono, linea, disco } = R;
  // el tablero (y 143–153) con la veta, el reflejo de la ventana y un brillo que lo recorre
  poligono([[6, 142], [246, 142], [256, 154], [0, 154]], hex('#1a0c06'));
  for (let y = 143; y <= 153; y++) { const xa = Math.round(6 - (y - 142) * 0.55), xb = Math.round(246 + (y - 142) * 0.85);
    for (let x = Math.max(0, xa); x <= xb; x++) { let c = h(x >> 3, y, 61) < 0.25 ? hex('#4a2614') : hex('#5a3018'); if (y === 143) c = hex('#8a5030'); if (x > 30 + (y - 143) && x < 60 + (y - 143) && (x + y) % 2 === 0) c = hex('#7a4a30');
      const b = Math.round((t * 18) % 300) - 20; if (Math.abs(x - b - (y - 143) * 2) < 2) c = hex('#9a6038'); pset(x, y, c); } }
  rect(0, 154, 256, 157, hex('#341a0c')); rect(0, 154, 256, 154, hex('#a87040'));
  for (let y = 158; y <= 179; y++) for (let x = 0; x <= 254; x++) { let c = hex('#3e2010'); if ((x % 50) < 2) c = hex('#2a1608'); else if ((x % 50) === 2) c = hex('#6a3a20'); else if (h(x >> 2, y, 62) < 0.15) c = hex('#4a2814'); pset(x, y, c); }
  rect(255, 154, 256, 179, hex('#1a0c06'));
  // en la mesa: carpetas, vasos de agua, la jarra y la calculadora con cifras
  for (const [x, c] of [[30, hex('#e8e0c8')], [74, hex('#3a6ad8')], [118, hex('#e8e0c8')], [162, hex('#d84a3a')]]) { poligono([[x, 146], [x + 16, 146], [x + 18, 151], [x - 2, 151]], c); linea(x, 146, x + 16, 146, a_mezcla(c, hex('#ffffff'), 0.4)); for (let y = 147; y <= 150; y += 2) linea(x + 1, y, x + 13, y, a_mezcla(c, hex('#000000'), 0.25)); }
  for (const x of [52, 96, 140, 228]) { rect(x, 137, x + 4, 146, hex('#c8e0e8')); rect(x + 1, 140, x + 3, 146, hex('#8ac0e0')); pset(x + 1, 138, hex('#ffffff')); if (Math.sin(t * 1.3 + x) > 0.9) pset(x + 3, 141, hex('#ffffff')); }
  rect(12, 133, 19, 147, hex('#c8e0e8')); rect(13, 137, 18, 147, hex('#8ac0e0')); rect(20, 136, 21, 142, hex('#c8e0e8')); pset(14, 138, hex('#ffffff')); rect(14, 140, 15, 141, hex('#e8f8ff'));
  rect(206, 143, 222, 151, hex('#2a2a30')); rect(207, 144, 221, 146, hex('#9ab88a')); a_digitos(R, Math.floor(t * 3) % 1000, 208, 144, 1, hex('#1a2a1a')); for (let x = 208; x < 221; x += 3) pset(x, 149, hex('#c8ccd4'));
  // el proyector: la caja, el ventilador que gira, el brazo con el espejo y la luz
  rect(184, 129, 208, 146, hex('#2a2a30')); rect(185, 130, 207, 145, hex('#6a6e78')); rect(185, 130, 207, 131, hex('#a8acb4')); rect(186, 135, 206, 136, hex('#fff4c8'));
  for (let k = 0; k < 4; k++) { const a = t * 12 + k * Math.PI / 2; pset(Math.round(201 + Math.cos(a) * 2), Math.round(140 + Math.sin(a) * 2), hex('#2a2a30')); }
  rect(194, 115, 196, 129, hex('#3a3a44')); rect(190, 111, 200, 115, hex('#2a2a30')); rect(191, 112, 199, 113, hex('#c8d8e8')); pset(196, 116, hex('#fff4c8'));
  return { mesa: [0, 142, 256, 180], proyector: [196, 115] };
}

// la pantalla de proyección de cerca con la gráfica, los respaldos de los sillones y el proyector
function a_graficaFijo(R) {
  const { rect, pset, disco } = R;
  a_tablas(R, 0, 0, 319, 179, [hex('#5a3420'), hex('#341c10'), hex('#74462a'), hex('#4a2a18')], { w: 18, k: 57 });
  for (let y = 0; y <= 50; y++) for (let x = 270; x < 320; x++) pset(x, y, a_tr(x, y) < 0.2 ? hex('#56321e') : hex('#5a3420'));
  rect(20, 14, 272, 20, hex('#4a4e58')); rect(20, 14, 272, 15, hex('#a8acb4')); rect(268, 15, 272, 20, hex('#2a2a30'));
  rect(26, 150, 266, 154, hex('#2a2a30'));
}

function a_graficaCerca(R, t, o) {
  const { rect, pset, disco, poligono } = R;
  R.copiar(a_capa(R, 'grafica', () => a_graficaFijo(R)));
  for (let y = 20; y <= 149; y++) for (let x = 26; x <= 266; x++) { const d = Math.hypot((x - 146) / 120, (y - 84) / 66); pset(x, y, d < 0.55 ? hex('#fbf8f0') : a_tr(x, y) < (d - 0.55) * 1.1 ? hex('#d8d4c8') : hex('#eeeae0')); }
  a_grafica(R, t, [36, 30, 256, 138], o.grafica ?? 0.5, { cifra: o.cifra });
  // la sombra de un dedo de polvo y las motas del haz
  for (let k = 0; k < 22; k++) { const y = Math.round(150 + ((h(k, 1, 93) * 30 + t * (1 + h(k, 2, 93) * 2)) % 30)), x = Math.round(146 + (h(k, 3, 93) - 0.5) * (y - 140) * 2.4 + Math.sin(t + k) * 2); if (Math.sin(t * 1.5 + k) > -0.2) pset(x, y, hex('#f8f0d0')); }
  for (let y = 154; y < 180; y++) { const w = (y - 150) * 1.2; for (let x = Math.round(146 - w); x <= 146 + w; x++) if ((x + y) % 3 === 0) pset(x, y, a_mezcla(R.pget(x, y), hex('#f8f0d0'), 0.12)); }
  // los respaldos de dos sillones (por delante, oscuros) y el cabezal del proyector con su espejo
  for (const x of [52, 252]) { disco(x, 172, 26, hex('#1a0e08')); for (let y = 148; y < 180; y++) for (let i = -24; i <= 24; i++) { const d = Math.hypot(i, y - 172); if (d > 25) continue; const bx = (i + 24) % 7, by = (y - 148) % 7; pset(x + i, y, bx === 3 && by === 3 ? hex('#140a06') : d > 22 ? hex('#4a2a1a') : hex('#2e180e')); } }
  rect(138, 162, 154, 179, hex('#2a2a30')); rect(139, 163, 153, 164, hex('#6a6e78')); poligono([[134, 158], [158, 158], [154, 164], [138, 164]], hex('#1a1a1e')); rect(140, 159, 152, 160, hex('#c8d8e8')); rect(143, 165, 149, 166, hex('#fff4c8'));
  return { suelo: 179, pantalla: [26, 20, 266, 150], grafica: [36, 30, 256, 138] };
}

// los encuadres y sus segundas cámaras, y lo de delante de cada uno
const A_ENC = { bar72: [a_bar72, a_bar72Pantalla], salon77: [a_salon77, a_salon77Tele], oficinas: [a_oficinas, a_calendario], despachoProg: [a_despacho, a_despachoPantalla], juntas: [a_juntas, a_graficaCerca] };

const A_DELANTE = { bar72: a_bar72Delante, salon77: a_salon77Delante, oficinas: a_oficinasDelante, despachoProg: a_despachoDelante, juntas: a_juntasDelante };

// una pieza del reparto del 26 (PIEZAS_AT), si el kit la trae
function a_pieza(n, R, x, y, o) { const f = PIEZAS_AT[n]; if (f) f(R, x, y, o); }

// la paleta de las tiendas: techo de placas, pared crema, la franja de la época, góndolas, linóleo, madera, cartón, acero,
// hormigón y el cielo de la puerta de carga
const b_P = Object.fromEntries(Object.entries({
  techo: '#d6d0c0', techoS: '#b4ae9e', techoL: '#e6e2d4', troffer: '#8e8a80', tubo: '#fffbea', tuboS: '#ece6c8', tuboOff: '#7c7a74',
  pared: '#ecdcb8', paredS: '#d4c098', paredL: '#f6ead0',
  f1: '#f0b03a', f2: '#e0702a', f3: '#b8462a', f4: '#6e3420',
  peg: '#cfb488', pegS: '#ab9064', pegH: '#7e6644',
  gond: '#ebe7de', gondS: '#bdb8ae', gondD: '#7e7a72', gondL: '#fbf9f4',
  labio: '#2e5eb0', labioL: '#5a8ad8', labioS: '#1c3a78',
  s1: '#e8dcbc', s2: '#c46a42', s1S: '#d4c6a2', s2S: '#a85638', junta: '#9a8a6c', brillo: '#fbf4e2',
  madera: '#a8703a', maderaS: '#7a4a22', maderaL: '#c8904e', maderaD: '#4e2e14',
  beige: '#d8ccb0', beigeS: '#b0a486', beigeL: '#ece4d0',
  pant: '#1a2440', noche: '#0e1020',
  carton: '#c8a06a', cartonS: '#9a7444', cartonL: '#e0bc84', cartonD: '#6a4a26', cinta: '#e2cfa2',
  acero: '#3a64b0', aceroS: '#24447e', aceroL: '#6a94d8', viga: '#e8782a', vigaS: '#a84e1a', vigaL: '#f8a04a',
  hormi: '#a6a29a', hormiS: '#8e8a82', hormiL: '#bab6ae', hormiD: '#6e6a64', amarillo: '#f0c43a', amarilloS: '#b88a1a', amarilloL: '#f8e07a',
  chapa: '#8a9098', chapaS: '#6e747c', chapaL: '#a4aab2', cercha: '#3a3f48', cerchaL: '#5e646e', cubierta: '#2a2e36',
  cielo1: '#5aa0e0', cielo2: '#82bcec', cielo3: '#b0d6f2', nube: '#ffffff', nubeM: '#e6eef8', nubeS: '#bccce0',
  rojo: '#d83a3a', rojoS: '#9a2424', rojoL: '#f06a5a', verde: '#3a9a4a', verdeL: '#7ad87a', crema: '#fff6e0', papel: '#f4f0e4',
  negro: '#1a1a1e', gris: '#5a5a62', grisL: '#9a9aa4', oro: '#e8b830', oroL: '#fce69a', azulPC: '#3a4ac8', azulPCL: '#8a9aff',
}).map(([k, v]) => [k, hex(v)]));

// los colores chillones de las cajitas (los mismos nombres que PIEZAS_AT) y el de su dibujo
const b_CHILLON = ['rosa', 'naranja', 'turquesa', 'amarillo', 'morado', 'verde', 'rojo', 'azul'];

const b_CHILLON_HEX = { rosa: '#e86a9a', naranja: '#e8803a', turquesa: '#2aa8a0', amarillo: '#e8c840', morado: '#8a4ab8', verde: '#3a9a4a', rojo: '#d0383a', azul: '#3a6ad8' };

const b_DIBUJO = [hex('#f0d040'), hex('#7ad87a'), hex('#a8c8f0'), hex('#f07aa8')];

// un fondo fijo de las tiendas: se pinta una vez por lienzo y clave en un búfer de R.nuevo() y se copia en cada fotograma
const b_CACHE = new WeakMap();

function b_fijo(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// una capa con huecos (VACIO) que se pinta una vez y se pone encima en cada fotograma (lo que tapa a la vida de detrás)
const b_VACIO = 0x01020304;

function b_capa(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(); b.fill(b_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  const b = m[clave], d = R.buf; for (let i = 0; i < b.length; i++) if (b[i] !== b_VACIO) d[i] = b[i];
}

// mezcla dos colores (k = 0 el primero, 1 el segundo)
function b_mez(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }

// oscurece (o aclara, con col claro) el píxel que ya hay
function b_tinta(R, x, y, k, col = b_P.negro) { R.pset(x, y, b_mez(R.pget(x, y), col, k)); }

// un tubo que falla: true cuando está apagado (a ratos, con tartamudeo)
const b_falla = (t, s = 0) => ((t * 1.3 + s) % 4.1) < 0.8 && Math.sin(t * 37 + s) > -0.2;

// pinta una rejilla de caracteres con un mapa de colores ('.' no pinta)
function b_rej(R, filas, x, y, mapa, esc = 1) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = mapa[f[i]]; if (c != null) R.rect(x + i * esc, y + j * esc, x + i * esc + esc - 1, y + j * esc + esc - 1, c); } }); }

// una cajita de cartucho en la estantería (la caja de PIEZAS_AT en pequeño, 6 × 9): cartón del color, canto en sombra, la
// franja negra de arriba y la portada oscura con dos puntos del dibujo; (x, yb) = esquina de abajo a la izquierda
function b_cajita(R, x, yb, c, k = 0, alto = 9) {
  const { rect, pset } = R, cS = b_mez(c, b_P.negro, 0.38), cL = b_mez(c, b_P.crema, 0.4), y0 = yb - alto + 1;
  rect(x, y0, x + 5, yb, c); rect(x + 5, y0 + 1, x + 5, yb, cS); rect(x, y0, x + 4, y0 + 1, b_P.negro); pset(x + 1, y0 + 1, b_P.gris);
  rect(x + 1, y0 + 3, x + 3, yb - 2, b_P.pant); pset(x + 1 + (k % 2), y0 + 4, b_DIBUJO[k % 4]); pset(x + 2, y0 + 5 + (k % 2), b_DIBUJO[(k + 1) % 4]);
  rect(x, y0 + 2, x, yb - 1, cL); rect(x, yb, x + 4, yb, cS);
}

// la caja grande de una consola (beige, con la foto de la consola de madera y negro), 14 × 11
function b_cajaConsola(R, x, yb) {
  const { rect, pset } = R, y0 = yb - 10;
  rect(x, y0, x + 13, yb, b_P.beige); rect(x + 13, y0, x + 13, yb, b_P.beigeS); rect(x, y0, x + 12, y0, b_P.beigeL);
  rect(x + 1, y0 + 1, x + 12, y0 + 2, b_P.rojo); rect(x + 2, y0 + 4, x + 11, y0 + 6, b_P.negro); rect(x + 2, y0 + 7, x + 11, y0 + 8, b_P.madera);
  pset(x + 4, y0 + 4, b_P.grisL); pset(x + 9, y0 + 4, b_P.grisL); rect(x + 6, y0 + 5, x + 7, y0 + 5, b_P.gris);
}

// la gente pequeña de fondo (11 px): piernas que se alternan al andar, cuerpo, brazo, cabeza y pelo; o.dir, o.anda,
// o.bolsa (un color: lleva una bolsa de la compra), o.casco (un mozo con casco amarillo)
const b_GENTE = [
  ['#f0c090', '#5a3418', '#d84a4a', '#2a3a6a'], ['#c88a5a', '#1a1410', '#3a8ad8', '#4a4a52'], ['#f4d0a8', '#e8c040', '#4aa86a', '#6a4a2a'],
  ['#8a5a3a', '#1a1410', '#e8a03a', '#2a2a3a'], ['#f0c090', '#8a4a20', '#a84ab8', '#3a4a7a'],
].map((v) => v.map(hex));

function b_gente(R, x, suelo, t, k, o = {}) {
  const [piel, pelo, top, bajo] = b_GENTE[k % b_GENTE.length], dir = o.dir ?? 1, p = o.anda ? Math.floor(t * 5 + k * 0.7) % 2 : 0;
  const S = Math.round(suelo), X = Math.round(x), px = (i, j, c) => R.pset(X + i * dir, S - j, c), topS = b_mez(top, b_P.negro, 0.3);
  if (p) { for (let j = 1; j <= 3; j++) { px(j < 2 ? -2 : -1, j, bajo); px(j < 2 ? 2 : 1, j, bajo); } px(-2, 0, b_P.negro); px(2, 0, b_P.negro); }
  else { for (let j = 1; j <= 3; j++) { px(-1, j, bajo); px(1, j, bajo); } px(0, 3, bajo); px(-1, 0, b_P.negro); px(1, 0, b_P.negro); }
  for (let j = 4; j <= 7; j++) { px(-1, j, topS); px(0, j, top); px(1, j, top); }
  px(2, 6, top); px(2, 5, top); px(2, 4, piel);
  if (o.bolsa) { R.rect(Math.min(X + 2 * dir, X + 4 * dir), S - 4, Math.max(X + 2 * dir, X + 4 * dir), S - 2, o.bolsa); px(3, 5, b_P.negro); }
  for (let j = 8; j <= 9; j++) for (let i = -1; i <= 1; i++) px(i, j, piel);
  px(1, 9, b_P.negro); px(-1, 9, pelo); for (let i = -1; i <= 1; i++) px(i, 10, o.casco ? b_P.amarillo : pelo);
  if (o.casco) { px(2, 10, b_P.amarillo); px(-2, 10, b_P.amarillo); }
}

// una nube de tres tonos (sombra abajo, cuerpo, luz arriba) para el cielo de la puerta de carga
function b_nube(R, cx, cy, w) {
  const { disco, rect } = R, n = Math.max(2, Math.round(w / 6));
  for (let i = 0; i < n; i++) disco(cx - w / 2 + 3 + i * (w - 6) / (n - 1), cy + 1, 3, b_P.nubeS);
  for (let i = 0; i < n; i++) disco(cx - w / 2 + 3 + i * (w - 6) / (n - 1), cy - (i % 2), 3, b_P.nubeM);
  disco(cx - 1, cy - 3, 3, b_P.nube); disco(cx + 3, cy - 2, 2, b_P.nube); rect(cx - w / 2 + 1, cy + 3, cx + w / 2 - 1, cy + 3, b_P.nubeS);
}

// ════ las jugueterías (general) ════
// suelo 158 (delante, x 116–240 libre; en 1984, x 106–188 entre las cestas); suelo de fondo 140 (delante del mueble de la
// tele, x 136–206, donde un niño puede jugar); el dependiente, detrás del mostrador, con los pies en 150 y x 254–278 (asoman
// la cabeza y los hombros por encima de la encimera, en y 143)
function b_jugueteria(R, t, o, e84) {
  const { rect, pset, linea, disco } = R, P = b_P;
  b_fijo(R, e84 ? 'jug84' : 'jug82', () => b_jugFijo(R, e84));
  // los fluorescentes: en 1984 el cuarto está muerto y el segundo parpadea, y la pared se apaga debajo
  for (let k = 0; k < 4; k++) {
    const x = 14 + k * 70, off = e84 && (k === 3 || (k === 1 && b_falla(t, 1)));
    rect(x + 2, 9, x + 37, 10, off ? P.tuboOff : P.tubo);
    if (!off) { rect(x + 2, 10, x + 37, 10, P.tuboS); pset(x + 3 + Math.floor(t * 9 + k * 11) % 34, 9, P.blanco ?? P.crema); }
    if (off && k === 1) for (let y = 21; y < 46; y++) for (let xx = x - 10 + (y & 1); xx < x + 50; xx += 2) b_tinta(R, xx, y, 0.18);
  }
  // la vida del centro comercial, solo dentro del hueco de la entrada
  R.recorte([0, 39, 53, 126]);
  if (!e84) for (const [bx, by, c] of [[12, 51, P.rojo], [38, 48, P.oro], [26, 55, P.verde]]) {   // las bolas de Navidad de la claraboya
    const sw = Math.round(Math.sin(t * 1.1 + bx) * 1.3); linea(bx, 39, bx + sw, by - 4, P.gondD); disco(bx + sw, by, 3, c); pset(bx + sw - 1, by - 1, P.crema); pset(bx + sw, by - 4, P.oroL);
  }
  if (o.gente !== false) {
    const n = e84 ? 1 : 3;
    for (let k = 0; k < n; k++) {
      const v = e84 ? 4 : 7 + k * 3, d = k % 2 ? -1 : 1, u = ((t * v + k * 41) % 95) - 21, x = d > 0 ? u : 53 - u;
      b_gente(R, x, 116 + k * 4, t, k + (e84 ? 3 : 0), { anda: true, dir: d, bolsa: !e84 && k !== 1 ? [P.rojo, 0, P.verde][k] : 0 });
    }
  }
  R.recorte(null);
  // la tele de demostración: en 1982 un matamarcianos; en 1984, nieve
  PIEZAS_AT.teleCRT?.(R, 156, 100, { t, pantalla: (R2, [x0, y0, x1, y1]) => b_juegoDemo(R, x0, y0, x1, y1, t, e84) });
  // el ordenador doméstico: la pantalla con renglones que se escriben y el cursor; el precio de la tarjeta
  if (o.ordenador !== false) {
    rect(79, 116, 93, 126, P.azulPC);
    const n = Math.floor(t * 3) % 14;
    for (let l = 0; l < 4; l++) { const w = l < Math.floor(n / 3) ? 4 + ((l * 5) % 8) : l === Math.floor(n / 3) ? (n % 3) * 3 : 0; if (w) rect(80, 117 + l * 2, 80 + w, 117 + l * 2, P.azulPCL); }
    if (Math.floor(t * 2.5) % 2) rect(80 + ((n % 3) * 3) + 1, 117 + Math.min(3, Math.floor(n / 3)) * 2, 81 + ((n % 3) * 3) + 1, 117 + Math.min(3, Math.floor(n / 3)) * 2, P.crema);
    rect(100, 125, 119, 136, P.negro); rect(101, 126, 118, 135, P.papel); rect(101, 126, 118, 127, P.rojo);
    R.numero('$' + (o.precioPC ?? 199), 110, 134, { color: P.negro, centro: true, sombra: false, fina: true });
  }
  if (!e84) {
    // el cartel giratorio colgado del techo, con el joystick
    const g = Math.cos(t * 0.9), w = Math.max(1, Math.round(Math.abs(g) * 12)), cx = 172;
    linea(cx, 20, cx, 22, P.gondD); rect(cx - w, 22, cx + w, 34, P.negro); rect(cx - w + 1, 23, cx + w - 1, 33, g > 0 ? P.rojo : P.labio);
    if (w > 8) R.icono('mando', cx - 3, 25, P.crema, P.rojoS);
    // la avioneta de juguete colgada del techo, que da vueltas despacio
    { const a = t * 0.9, ax = 96 + Math.round(Math.cos(a) * 8), ay = 29 + Math.round(Math.sin(a) * 1.5), d = Math.sin(a) > 0 ? -1 : 1;
      linea(96, 20, ax, ay - 2, P.gondD); rect(ax - 6, ay, ax + 6, ay + 1, P.rojo); rect(ax - 6, ay + 1, ax + 6, ay + 1, P.rojoS); rect(ax - 1, ay - 2, ax + 2, ay + 3, P.oro); rect(ax - 1, ay - 2, ax + 2, ay - 2, P.oroL);
      rect(ax - 7 * d, ay - 3, ax - 6 * d, ay, P.rojo); pset(ax + 7 * d, ay, P.gris); pset(ax + 7 * d, ay + (Math.floor(t * 12) % 2 ? -1 : 2), P.grisL); pset(ax + 3 * d, ay, P.labioL); }
    // los tres globos atados a la pirámide, que cabecean
    for (const [dx, dy, c, f] of [[-9, -26, P.rojo, 0], [2, -32, P.oro, 1.7], [11, -23, P.labioL, 3.1]]) {
      const bx = 222 + dx + Math.round(Math.sin(t * 0.8 + f) * 1.5), by = 84 + dy + Math.round(Math.sin(t * 1.3 + f) * 1.2);
      linea(222, 86, bx, by + 6, P.gondS); disco(bx, by, 5, b_mez(c, P.negro, 0.25)); disco(bx - 1, by - 1, 4, c); pset(bx - 2, by - 3, P.crema); pset(bx, by + 5, c);
    }
    // destellos que corren por el espumillón
    for (let k = 0; k < 5; k++) { const x = 62 + ((Math.floor(t * 6) * 13 + k * 47) % 212); if (x < 133 || x > 210) pset(x, 47 + ((x >> 2) % 2), P.crema); }
  } else {
    // los banderines de rebajas colgados de lado a lado, que se mecen con el aire
    for (let k = 0; k < 22; k++) {
      const x = 60 + k * 10, sag = Math.round(5 * Math.sin(Math.PI * (k / 21))), sw = Math.round(Math.sin(t * 1.4 + k * 0.6) * 1), y = 22 + sag;
      pset(x, y, P.gondD); pset(x + 5, y + 1, P.gondD); R.poligono([[x + 1, y], [x + 8, y], [x + 4 + sw, y + 7]], k % 2 ? P.oro : P.rojo); pset(x + 2, y + 1, k % 2 ? P.oroL : P.rojoL);
    }
    // el globo desinflado atado al poste de rebajas, que cuelga y se balancea
    { const bx = 238 + Math.round(Math.sin(t * 0.6) * 1.5); linea(229, 92, bx, 106, P.gondS); disco(bx, 109, 3, P.rojoS); disco(bx - 1, 109, 2, b_mez(P.rojo, P.gondS, 0.4)); pset(bx, 113, P.rojoS); }
    // las motas de polvo en el aire, a contraluz de la entrada
    for (let k = 0; k < 14; k++) { const x = Math.round(60 + h(k, 2, 26) * 200 + Math.sin(t * 0.4 + k) * 6), y = Math.round(40 + ((h(k, 3, 26) * 90 + t * 3) % 90)); if (Math.sin(t * 1.7 + k * 2.1) > 0) pset(x, y, P.paredL); }
  }
  // las cajas devueltas en el armario de detrás del mostrador, con la flecha de vuelta
  if (o.devoluciones) {
    for (const [x, y, c] of [[298, 100, 'verde'], [313, 100, 'verde'], [305, 80, 'verde']]) PIEZAS_AT.cajaCartucho?.(R, x, y, { color: c, icono: 'foso' });
    rect(294, 85, 306, 96, P.negro); rect(295, 86, 305, 95, P.papel);
    linea(303, 88, 303, 92, P.rojo); linea(303, 92, 297, 92, P.rojo); linea(297, 92, 299, 90, P.rojo); linea(297, 92, 299, 94, P.rojo); linea(303, 88, 300, 88, P.rojo);
  }
  // el reloj de la pared del fondo, que anda
  { const m = t * 0.1 - Math.PI / 2, s = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(284, 84, 284 + Math.round(Math.cos(m) * 3), 84 + Math.round(Math.sin(m) * 3), P.negro); pset(284 + Math.round(Math.cos(s) * 3), 84 + Math.round(Math.sin(s) * 3), P.rojo); }
  return { suelo: 158, sueloFondo: 140, dependiente: [258, 150], mostrador: [244, 143], tele: [156, 100], pc: [86, 138], piramide: e84 ? null : [222, 146], puerta: [0, 38, 53, 127] };
}

// la pantalla de la tele de demostración (16 × 16): naves que bajan, la nave del jugador que dispara y estrellas; apagado:
// nieve con la franja que sube
function b_juegoDemo(R, x0, y0, x1, y1, t, nieve) {
  const { rect, pset } = R, w = x1 - x0 + 1, hh = y1 - y0 + 1;
  if (nieve) {
    const f = Math.floor(t * 12);
    for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) { const v = h(i + f * 3, j + f * 7, 9); pset(x0 + i, y0 + j, v > 0.66 ? hex('#d8dce8') : v > 0.33 ? hex('#8a8e9a') : hex('#3a3e4a')); }
    const yb = y0 + Math.floor((t * 6) % hh); rect(x0, yb, x1, Math.min(y1, yb + 1), hex('#eef0f6')); return;
  }
  rect(x0, y0, x1, y1, hex('#0a0c1e'));
  for (let k = 0; k < 7; k++) pset(x0 + Math.floor(h(k, 1, 33) * w), y0 + Math.floor((h(k, 2, 33) * hh + t * 6) % hh), hex('#7a7aa0'));
  const ex = Math.round(Math.sin(t * 1.5) * 2), ey = Math.floor(t * 0.7) % 4;
  for (let k = 0; k < 4; k++) { const ax = x0 + 2 + k * 3 + ex, ay = y0 + 2 + ey; if (((Math.floor(t / 2.2) + k) % 5) === 0) { pset(ax, ay, hex('#f8e07a')); pset(ax + 1, ay + 1, hex('#f08a3a')); continue; } rect(ax, ay, ax + 1, ay, hex('#f07aa8')); pset(ax, ay + 1, hex('#c04a80')); pset(ax + 1, ay + 1, hex('#c04a80')); }
  const sx = x0 + 7 + Math.round(Math.sin(t * 2.1) * 5); rect(sx - 1, y1 - 1, sx + 1, y1 - 1, hex('#5adc5a')); pset(sx, y1 - 2, hex('#5adc5a'));
  const sy = y1 - 3 - Math.floor((t * 20) % 11); pset(sx, sy, hex('#fff6a0'));
  rect(x0, y0, x0 + 3, y0, hex('#f8e07a'));   // el marcador (rayas)
}

// lo fijo de la juguetería (el mismo plano de planta en 1982 y en 1984)
function b_jugFijo(R, e84) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P, des = (c) => (e84 ? b_mez(c, hex('#a8a090'), 0.3) : c);
  // el techo de placas con su rejilla, las motas y la moldura
  rect(0, 0, 319, 19, P.techo);
  for (let x = 0; x < 320; x += 20) rect(x, 0, x, 19, P.techoS);
  rect(0, 3, 319, 3, P.techoS); rect(0, 16, 319, 16, P.techoS);
  for (let k = 0; k < 220; k++) { const x = Math.floor(h(k, 1, 260) * 320), y = Math.floor(h(k, 2, 260) * 19); if (x % 20 && y !== 3 && y !== 16) pset(x, y, h(k, 3, 260) > 0.5 ? P.techoS : P.techoL); }
  if (e84) for (const [x, y] of [[46, 4], [212, 5]]) { rect(x, y, x + 18, y + 10, hex('#c8b890')); for (let k = 0; k < 9; k++) pset(x + 2 + Math.floor(h(k, x, 261) * 15), y + 2 + Math.floor(h(k, y, 261) * 7), hex('#a8945a')); }   // placas con manchas de goteras
  rect(0, 19, 319, 19, P.techoS); rect(0, 20, 319, 20, P.gondD);
  // los marcos de los fluorescentes, con la rejilla del difusor
  for (let k = 0; k < 4; k++) { const x = 14 + k * 70; rect(x, 7, x + 39, 12, P.troffer); rect(x, 7, x + 39, 7, P.techoL); rect(x, 12, x + 39, 12, P.gondD); for (let i = x + 4; i < x + 38; i += 5) pset(i, 11, P.gondS); }
  // la pared con el papel de rayas finas y la luz de los tubos
  rect(0, 21, 319, 127, des(P.pared));
  for (let x = 2; x < 320; x += 8) rect(x, 21, x, 127, des(P.paredL));
  for (let k = 0; k < 400; k++) pset(Math.floor(h(k, 4, 260) * 320), 21 + Math.floor(h(k, 5, 260) * 106), des(P.paredS));
  for (let k = 0; k < 4; k++) { if (e84 && k === 3) continue; const x = 14 + k * 70; for (let y = 21; y < 40; y++) for (let xx = Math.round(x - (y - 21) / 2); xx < x + 40 + (y - 21) / 2; xx++) if ((xx + y) % 3 === 0) pset(xx, y, P.crema); }
  // la franja supergráfica de la época (naranja, rojo teja, marrón), que acaba en escalera antes de la esquina de Atom
  [P.f1, P.f2, P.f3, P.f4].forEach((c, s) => { const y = 24 + s * 2, fin = 266 - s * 4; rect(0, y, fin, y + 1, des(c)); rect(fin + 1, y, fin + 2, y + 1, b_mez(des(c), P.pared, 0.5)); });
  if (e84) { poligono([[120, 23], [131, 23], [127, 32], [118, 31]], P.paredS); linea(118, 31, 127, 32, P.gondS); }   // un trozo despegado
  // la entrada al centro comercial: lo fijo de lo que se ve por el hueco
  b_centroComercial(R, e84);
  rect(0, 30, 57, 37, P.gondD); for (let x = 1; x < 57; x += 3) rect(x, 31, x, 36, P.gondS); rect(0, 30, 57, 30, P.gondL);   // la caja de la persiana enrollada
  rect(54, 38, 57, 127, P.gondD); rect(54, 38, 54, 127, P.gondL); rect(57, 38, 57, 127, P.negro);
  // las góndolas de la pared: A (cartuchos) y B (más cartuchos)
  b_gondola(R, 60, 132, 34, 127, 1, e84, P.rojo, 'cartucho');
  b_gondola(R, 208, 276, 34, 127, 7, e84, P.labio, 'estrella');
  // la guirnalda de espumillón con bolas (1982) por el canto de los cabeceros
  if (!e84) for (const [a, b] of [[60, 132], [208, 276]]) for (let x = a; x <= b; x++) { const y = 46 + Math.round(2 * Math.sin(Math.PI * ((x - a) % 24) / 24)); pset(x, y, P.verde); pset(x, y + 1, (x * 7) % 3 ? hex('#2a6a3a') : P.verdeL); if ((x - a) % 24 === 12) { disco(x, y + 3, 1, (x >> 3) % 2 ? P.rojo : P.oro); } }
  // el póster del juego espacial (sin letras): estrellas, un planeta con anillo, la nave y un rayo
  rect(140, 37, 204, 66, P.negro); rect(141, 38, 203, 65, hex('#1a1e4a'));
  for (let k = 0; k < 30; k++) pset(142 + Math.floor(h(k, 6, 262) * 60), 39 + Math.floor(h(k, 7, 262) * 25), k % 3 ? hex('#8a8ac8') : P.crema);
  disco(186, 50, 7, hex('#c86a3a')); disco(184, 48, 5, hex('#e89a4a')); linea(175, 53, 197, 47, hex('#f0d07a')); linea(176, 54, 198, 48, hex('#a87a3a'));
  poligono([[150, 62], [158, 44], [166, 62]], hex('#c8d0e0')); rect(156, 52, 160, 55, hex('#3a8ad8')); poligono([[146, 63], [152, 56], [152, 63]], P.rojo); poligono([[164, 56], [170, 63], [164, 63]], P.rojo); rect(154, 63, 162, 64, P.oro);
  linea(166, 44, 180, 40, P.verdeL); rect(141, 38, 203, 38, hex('#3a3e7a'));
  if (e84) { poligono([[196, 38], [203, 38], [203, 46]], P.paredL); linea(196, 38, 203, 46, P.gondS); }   // la esquina que se despega
  // el mueble de la tele: chapado de madera con vetas, el hueco con los joysticks y los cartuchos, las puertas
  rect(136, 100, 206, 127, P.maderaD); rect(137, 101, 205, 126, P.madera); rect(137, 101, 205, 101, P.maderaL);
  for (let k = 0; k < 18; k++) { const y = 103 + Math.floor(h(k, 8, 262) * 22), x = 138 + Math.floor(h(k, 9, 262) * 60); rect(x, y, x + 3 + (k % 5), y, P.maderaS); }
  rect(140, 104, 202, 115, P.maderaD); rect(141, 105, 201, 114, hex('#2a1a0e'));
  PIEZAS_AT.joystick?.(R, 148, 115, { inclina: -0.5 }); PIEZAS_AT.joystick?.(R, 162, 115, { inclina: 0.5 });
  for (let k = 0; k < 4; k++) PIEZAS_AT.cartucho?.(R, 178 + k * 7, 115, { color: b_CHILLON[(k + 2) % 8] });
  for (const x of [141, 172]) { rect(x, 117, x + 29, 125, P.maderaS); rect(x + 1, 118, x + 28, 124, P.madera); rect(x + 13, 120, x + 15, 121, P.oro); }
  PIEZAS_AT.consolaVieja?.(R, 189, 100, { cartucho: 'rojo', palancas: 5 });
  linea(176, 96, 178, 104, P.negro);   // el cable de la antena
  // la pared de detrás del mostrador: estante con cajas de consola, el reloj y el armario bajo
  rect(278, 70, 319, 72, P.maderaS); rect(278, 70, 319, 70, P.maderaL); for (const x of [279, 294]) b_cajaConsola(R, x, 69); rect(310, 61, 316, 69, P.rojo); rect(311, 62, 315, 63, P.crema);
  // el reloj de pared (las agujas, en cada fotograma)
  disco(284, 84, 5, P.negro); disco(284, 84, 4, P.crema); for (let k = 0; k < 12; k += 3) { const a = k * Math.PI / 6; pset(Math.round(284 + Math.cos(a) * 4), Math.round(84 + Math.sin(a) * 4), P.gondD); }
  // un calendario de pared y una guirnalda de la caja (la pared de detrás del mostrador no queda lisa)
  rect(300, 76, 314, 90, P.negro); rect(301, 77, 313, 89, P.papel); rect(301, 77, 313, 79, P.rojo); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(303 + i * 3, 82 + j * 2, P.gondS);
  rect(278, 100, 319, 127, P.maderaD); rect(279, 101, 319, 126, P.madera); rect(279, 101, 319, 102, P.maderaL); rect(298, 103, 299, 126, P.maderaD);
  for (const x of [292, 305]) rect(x, 112, x + 2, 113, P.oro);
  rect(278, 92, 319, 100, P.beigeS); for (let k = 0; k < 4; k++) rect(281 + k * 9, 93, 287 + k * 9, 99, [P.rojo, P.labio, P.oro, P.verde][k]);   // bolsas dobladas en su sitio
  // el suelo de linóleo a cuadros en perspectiva, con los reflejos de los tubos
  for (let y = 128; y < 180; y++) {
    const d = y - 100, fila = Math.floor(420 / d), lh = fila !== Math.floor(420 / (d - 1));
    let cp = null;
    for (let x = 0; x < 320; x++) {
      const col = Math.floor((x - 160) * 1.9 / d + 100), j = lh || (cp !== null && col !== cp); cp = col;
      const par = (col + fila) & 1, r = h(x, y, 263);
      let c = j ? P.junta : par ? (r > 0.93 ? P.s1S : P.s1) : (r > 0.93 ? P.s2S : P.s2);
      if (e84 && !j && r > 0.985) c = P.junta;
      pset(x, y, des(c));
    }
  }
  for (let k = 0; k < 4; k++) { if (e84 && k === 3) continue; const xc = 34 + k * 70;
    for (let y = 131; y < 178; y++) { const xr = Math.round(160 + (xc - 160) * (y - 100) / 30), w = 2 + Math.floor((y - 128) / 12); for (let x = xr - w; x <= xr + w; x++) if ((x + y) % 2 === 0) pset(x, y, b_mez(R.pget(x, y), P.brillo, 0.55)); } }
  for (let x = 58; x < 278; x++) for (let y = 128; y < 131; y++) if ((x + y) % 2 === 0 || y === 128) b_tinta(R, x, y, 0.25);   // la sombra al pie de las góndolas
  // la alfombrilla de la entrada, con sus nervios
  rect(0, 129, 50, 137, P.maderaD); rect(1, 130, 49, 136, hex('#6a3a2a')); for (let x = 3; x < 49; x += 3) rect(x, 131, x, 135, hex('#4a2418'));
  // marcas de suelas y, en 1984, papeles tirados
  for (let k = 0; k < 10; k++) { const x = Math.floor(h(k, 10, 262) * 300) + 10, y = 140 + Math.floor(h(k, 11, 262) * 36); rect(x, y, x + 2 + (k % 3), y, P.junta); }
  if (e84) for (const [x, y] of [[150, 166], [86, 172], [262, 170]]) { rect(x, y, x + 5, y + 3, P.papel); rect(x, y + 3, x + 5, y + 3, P.gondS); pset(x + 2, y + 1, P.rojo); }
  // la mesa del ordenador doméstico (formica, patas cromadas) con el ordenador de teclado y el monitor
  rect(62, 137, 120, 140, P.maderaD); rect(62, 137, 120, 137, P.maderaL); rect(62, 141, 120, 142, P.maderaS);
  for (const x of [64, 117]) { rect(x, 143, x + 1, 152, P.grisL); pset(x, 143, P.crema); } for (const x of [68, 112]) rect(x, 143, x + 1, 148, P.gris);
  for (let x = 60; x < 124; x++) for (let y = 151; y < 154; y++) if ((x + y) % 2 === 0) b_tinta(R, x, y, 0.3);
  rect(75, 112, 97, 130, P.beigeS); rect(76, 113, 96, 129, P.beige); rect(76, 113, 96, 113, P.beigeL); rect(78, 115, 94, 127, P.negro); rect(84, 130, 88, 131, P.beigeS);
  rect(68, 131, 104, 136, P.beigeS); rect(69, 131, 103, 134, P.beige); rect(69, 131, 103, 131, P.beigeL);
  for (let j = 0; j < 2; j++) for (let i = 0; i < 15; i++) pset(71 + i * 2 + j, 132 + j, P.gris);
  rect(71, 135, 101, 135, P.maderaS); rect(98, 132, 101, 133, P.rojo);
  // la pirámide de cajas iguales (1982) o el poste del cartel de rebajas (1984)
  if (!e84) {
    rect(194, 146, 250, 150, P.rojoS); rect(194, 146, 250, 146, P.rojo);
    for (const [x, y] of [[205, 146], [222, 146], [239, 146], [213, 126], [230, 126], [222, 106]]) PIEZAS_AT.cajaCartucho?.(R, x, y, { color: 'verde', icono: 'foso' });
    // el cartel de estrella encima (sin letras: la estrella y el signo de admiración)
    const pts = []; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 - Math.PI / 2, r = k % 2 ? 6 : 10; pts.push([222 + Math.cos(a) * r, 95 + Math.sin(a) * r]); }
    poligono(pts.map(([x, y]) => [x + 1, y + 1]), P.rojoS); poligono(pts, P.oro); disco(222, 95, 5, P.rojo); R.icono('!', 221, 92, P.crema, P.rojoS);
    for (let x = 192; x < 254; x++) for (let y = 150; y < 153; y++) if ((x + y) % 2 === 0) b_tinta(R, x, y, 0.3);
  } else {
    rect(228, 92, 229, 145, P.grisL); rect(229, 92, 229, 145, P.gris); rect(222, 145, 236, 147, P.gris);
    rect(212, 76, 246, 94, P.negro); rect(213, 77, 245, 93, P.rojo); rect(213, 77, 245, 78, P.rojoL); rect(213, 92, 245, 93, P.rojoS);
    R.numero('%', 229, 91, { color: P.crema, centro: true, sombra: false, tam: 16 });
    for (const [x, c] of [[204, 'naranja'], [252, 'morado']]) PIEZAS_AT.cajaCartucho?.(R, x, 146, { color: c, icono: 'nave' });   // dos cajas que sobraron, una tumbada
  }
}

// lo que se ve por la entrada (x 0–53, y 38–127): la claraboya, la barandilla de la planta de arriba, el escaparate de
// enfrente con su toldo (o la persiana bajada, en 1984), el ficus en su jardinera y el terrazo con brillos
function b_centroComercial(R, e84) {
  const { rect, pset, linea, disco } = R, P = b_P;
  R.recorte([0, 38, 53, 127]);
  rect(0, 38, 53, 50, hex('#a8d0ec')); for (let x = 0; x < 54; x += 9) linea(x, 38, x + 4, 50, P.crema); rect(0, 49, 53, 50, P.gondS);
  rect(0, 51, 53, 57, P.beige); for (let x = 1; x < 54; x += 4) rect(x, 52, x, 56, P.gondD); rect(0, 51, 53, 51, P.gondL); rect(0, 57, 53, 57, P.beigeS);
  rect(0, 58, 53, 104, hex('#e4d8c0')); rect(0, 58, 6, 104, hex('#d0c4aa')); rect(47, 58, 53, 104, hex('#d0c4aa'));
  if (!e84) {
    for (let x = 8; x < 46; x += 4) rect(x, 60, x + 1, 64, (x >> 2) % 2 ? P.rojo : P.crema); rect(8, 65, 45, 65, P.rojoS);
    rect(8, 66, 45, 96, P.negro); rect(9, 67, 44, 95, hex('#f8f0dc'));
    for (let k = 0; k < 4; k++) { const x = 12 + k * 9; rect(x, 78, x + 4, 92, [P.rojo, P.labio, P.verde, P.oro][k]); disco(x + 2, 75, 2, hex('#f0c090')); rect(x - 1, 92, x + 5, 93, P.gondS); }
    for (let k = 0; k < 6; k++) pset(10 + k * 6, 69, P.oro);
  } else {
    rect(8, 60, 45, 96, P.gondD); for (let y = 61; y < 96; y += 2) rect(9, y, 44, y, P.gondS);
    rect(20, 72, 34, 82, P.papel); rect(20, 72, 34, 72, P.rojo); disco(25, 77, 2, P.oro); rect(27, 77, 31, 77, P.oro); rect(30, 78, 30, 79, P.oro);   // el cartel de «se alquila»: una llave
  }
  rect(0, 105, 53, 127, hex('#e8e0cc')); for (let k = 0; k < 120; k++) pset(Math.floor(h(k, 12, 262) * 54), 105 + Math.floor(h(k, 13, 262) * 22), [hex('#c8b8a0'), hex('#a89070'), hex('#d8ccb4')][k % 3]);
  for (const y of [109, 115, 123]) rect(0, y, 53, y, hex('#d4c8b0'));
  for (let y = 106; y < 126; y += 2) pset(30 + ((y * 3) % 6), y, P.crema);
  rect(30, 96, 50, 105, P.maderaS); rect(31, 97, 49, 104, P.madera); rect(30, 96, 50, 96, P.maderaL);
  for (const [dx, dy, r] of [[0, -10, 5], [-5, -16, 4], [5, -18, 4], [0, -24, 4], [-3, -6, 3], [4, -8, 3]]) disco(40 + dx, 96 + dy, r, dy < -14 ? hex('#3a7a3a') : hex('#2a5a2e'));
  for (const [dx, dy] of [[-2, -20], [3, -14], [-6, -12], [2, -26]]) pset(40 + dx, 96 + dy, P.verdeL);
  R.recorte(null);
}

// una góndola de pared: cabecero de color con su pictograma, trasera de tablero perforado, cuatro baldas con el canto azul y
// las etiquetas, y cajitas de cartuchos de colores (en 1984, medio vacía: huecos con polvo y cajas tumbadas)
function b_gondola(R, x0, x1, y0, y1, sem, e84, cab, pict) {
  const { rect, pset } = R, P = b_P, ladeo = e84 ? 2 : 0;
  rect(x0, y0, x1, y1, P.gondD);
  rect(x0 + 3, y0 + 12, x1 - 3, y1 - 4, P.peg);
  for (let y = y0 + 14; y < y1 - 4; y += 3) for (let x = x0 + 5 + (((y - y0) / 3) & 1) * 2; x < x1 - 3; x += 4) pset(x, y, P.pegH);
  // el cabecero (en 1984, torcido: cuelga de un lado)
  for (let x = x0; x <= x1; x++) { const dy = Math.round(ladeo * (x - x0) / (x1 - x0)); rect(x, y0 + dy, x, y0 + 11 + dy, P.negro); if (x > x0 && x < x1) { rect(x, y0 + 1 + dy, x, y0 + 10 + dy, e84 ? b_mez(cab, P.gondS, 0.35) : cab); pset(x, y0 + 1 + dy, b_mez(cab, P.crema, 0.4)); pset(x, y0 + 10 + dy, b_mez(cab, P.negro, 0.35)); } }
  const cx = Math.round((x0 + x1) / 2); R.icono(pict, cx - 4, y0 + 2 + ladeo, P.crema, b_mez(cab, P.negro, 0.45)); R.icono(pict, x0 + 6, y0 + 2, b_mez(cab, P.crema, 0.5), b_mez(cab, P.negro, 0.45)); R.icono(pict, x1 - 12, y0 + 2 + ladeo, b_mez(cab, P.crema, 0.5), b_mez(cab, P.negro, 0.45));
  rect(x0, y0 + 12, x0 + 2, y1, P.gond); rect(x0, y0 + 12, x0, y1, P.gondL); rect(x1 - 2, y0 + 12, x1, y1, P.gondS); rect(x1, y0 + 12, x1, y1, P.gondD);
  const baldas = [62, 79, 96, 113];
  baldas.forEach((yb, j) => {
    // las cajitas de la balda (en la de abajo, cajas de consola)
    if (j === 3) { for (let x = x0 + 4; x < x1 - 16; x += 16) if (!e84 || h(x, j, sem) < 0.5) b_cajaConsola(R, x, yb - 1); }
    else for (let i = 0, x = x0 + 4; x < x1 - 8; i++, x += 7) {
      const r = h(i, j, sem), c = hex(b_CHILLON_HEX[b_CHILLON[Math.floor(h(i, j, sem + 1) * 8)]]);
      if (!e84 || r < 0.38) b_cajita(R, x, yb - 1, c, i + j);
      else if (r < 0.5) { rect(x, yb - 4, x + 8, yb - 1, c); rect(x, yb - 4, x + 8, yb - 4, P.negro); rect(x + 2, yb - 3, x + 6, yb - 2, P.pant); rect(x, yb - 1, x + 8, yb - 1, b_mez(c, P.negro, 0.35)); x += 3; }   // una caja tumbada
      else if (r < 0.7) { pset(x + 1, yb - 1, P.pegS); pset(x + 4, yb - 1, P.pegS); }   // polvo en el hueco
    }
    // el canto azul con las etiquetas de precio y la sombra que echa sobre la balda de debajo
    rect(x0 + 3, yb, x1 - 3, yb + 2, P.labio); rect(x0 + 3, yb, x1 - 3, yb, P.labioL); rect(x0 + 3, yb + 2, x1 - 3, yb + 2, P.labioS);
    for (let x = x0 + 6; x < x1 - 6; x += 12) { rect(x, yb + 1, x + 4, yb + 2, e84 && (x >> 2) % 3 === 0 ? P.oro : P.papel); pset(x + 1, yb + 1, P.rojo); }
    for (let x = x0 + 3; x <= x1 - 3; x++) { if ((x + yb) % 2 === 0) b_tinta(R, x, yb + 3, 0.22); }
  });
  rect(x0 + 3, y1 - 4, x1 - 3, y1, P.gondS); rect(x0 + 3, y1 - 4, x1 - 3, y1 - 4, P.gond);
}

// el mostrador de la caja (por delante del dependiente, que asoma la cabeza y los hombros): encimera con vetas, frente de
// listones con la franja de la época, el zócalo, la caja registradora con su visor que cambia, el rollo de papel y el bote
// de caramelos
function b_mostrador(R, t, o, e84) {
  const { rect, pset, linea, disco } = R, P = b_P;
  rect(244, 141, 319, 142, P.negro); rect(244, 143, 319, 146, P.maderaL); for (let k = 0; k < 10; k++) { const x = 246 + Math.floor(h(k, 1, 264) * 66); rect(x, 144 + (k % 2), x + 4 + (k % 4), 144 + (k % 2), P.madera); }
  rect(244, 146, 319, 146, P.maderaS);
  rect(244, 147, 319, 163, P.madera); for (let x = 246; x < 320; x += 4) rect(x, 147, x, 163, P.maderaS); for (let x = 247; x < 320; x += 4) pset(x, 148, P.maderaL);
  rect(244, 151, 319, 152, P.f2); rect(244, 153, 319, 153, P.f3); rect(244, 150, 319, 150, P.f1);
  rect(244, 164, 319, 167, P.maderaD); rect(244, 147, 245, 167, P.maderaD);
  for (let x = 240; x < 320; x++) for (let y = 168; y < 171; y++) if ((x + y) % 2 === 0) b_tinta(R, x, y, 0.3);
  // la caja registradora
  rect(286, 128, 312, 142, P.beigeS); rect(287, 129, 311, 141, P.beige); rect(287, 129, 311, 129, P.beigeL); rect(311, 129, 311, 141, P.beigeS);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) rect(289 + i * 3, 131 + j * 2, 290 + i * 3, 131 + j * 2, j === 0 && i > 3 ? P.rojo : P.gris);
  rect(288, 138, 310, 141, P.beigeS); rect(296, 139, 302, 139, P.gondD);
  rect(300, 118, 311, 128, P.gondD); rect(301, 119, 310, 124, P.negro);
  { const v = e84 ? '5' : String(10 + (Math.floor(t * 0.8) * 7) % 40); R.numero(v, 306, 124, { color: hex('#5adc5a'), centro: true, sombra: false, fina: true }); }
  rect(290, 122, 294, 128, P.papel); rect(290, 122, 294, 122, P.gondS); pset(292, 121, P.papel);
  // el bote de caramelos de la esquina
  rect(248, 133, 256, 142, P.negro); rect(249, 134, 255, 141, hex('#d8eef4')); for (let k = 0; k < 10; k++) pset(250 + (k * 3) % 5, 137 + (k % 4), [P.rojo, P.oro, P.verde, P.labioL][k % 4]); rect(248, 131, 256, 133, P.rojo); pset(250, 135, P.crema);
  if (e84) { rect(262, 154, 280, 162, P.papel); rect(262, 154, 280, 155, P.rojo); R.numero('%', 271, 162, { color: P.rojo, centro: true, sombra: false, fina: true }); }   // un cartelito de rebajas pegado al frente
}

// una cesta de saldo de rejilla (en 1984, por delante): cartuchos revueltos que asoman, la rejilla con su brillo, el aro
// del borde, las ruedas, y el cartel clavado con el precio (con precio) o con el %
function b_cesta(R, x0, x1, yt, yb, t, sem, precio, conPrecio) {
  const { rect, pset, linea } = R, P = b_P;
  for (let k = 0, x = x0 + 4; x < x1 - 6; k++, x += 9) PIEZAS_AT.cartucho?.(R, x + 4, yt + 2 - Math.floor(h(k, 1, sem) * 4), { color: b_CHILLON[Math.floor(h(k, 2, sem) * 8)], icono: ['foso', 'nave', 'flor', 'comecocos'][k % 4], dir: k % 2 ? -1 : 1 });
  for (let k = 0, x = x0 + 8; x < x1 - 8; k++, x += 11) PIEZAS_AT.cartucho?.(R, x + 4, yt + 6 - Math.floor(h(k, 3, sem) * 3), { color: b_CHILLON[Math.floor(h(k, 4, sem) * 8)], icono: k % 2 ? 'foso' : 'flor' });
  rect(x0, yt + 4, x1, yb, hex('#3a2e2a'));
  for (let k = 0; k < (x1 - x0) * 2; k++) pset(x0 + 1 + Math.floor(h(k, 5, sem) * (x1 - x0 - 1)), yt + 5 + Math.floor(h(k, 6, sem) * (yb - yt - 6)), hex(b_CHILLON_HEX[b_CHILLON[k % 8]]));
  for (let x = x0; x <= x1; x += 4) linea(x, yt + 4, x, yb, P.grisL);
  for (let y = yt + 7; y <= yb; y += 4) linea(x0, y, x1, y, P.grisL);
  for (let y = yt + 5; y <= yb; y += 4) for (let x = x0 + 1; x < x1; x += 4) pset(x, y, P.crema);
  rect(x0 - 1, yt + 2, x1 + 1, yt + 4, P.grisL); rect(x0 - 1, yt + 2, x1 + 1, yt + 2, P.crema); rect(x0 - 1, yt + 4, x1 + 1, yt + 4, P.gris);
  rect(x0, yb - 1, x1, yb, P.gris);
  for (const x of [x0 + 3, x1 - 3]) { rect(x - 2, yb + 1, x + 2, yb + 3, P.negro); pset(x, yb + 2, P.grisL); }
  for (let x = x0 - 2; x <= x1 + 2; x++) if ((x + yb) % 2 === 0) b_tinta(R, x, yb + 4, 0.35);
  // el cartel clavado en la cesta
  const cx = Math.round((x0 + x1) / 2) + (conPrecio ? -8 : 6), sw = Math.round(Math.sin(t * 1.2 + sem) * 0.6);
  rect(cx, yt - 10, cx + 1, yt + 4, P.gris);
  rect(cx - 13 + sw, yt - 28, cx + 14 + sw, yt - 10, P.negro); rect(cx - 12 + sw, yt - 27, cx + 13 + sw, yt - 11, P.papel); rect(cx - 12 + sw, yt - 27, cx + 13 + sw, yt - 24, P.rojo);
  for (let x = cx - 11 + sw; x < cx + 13 + sw; x += 3) pset(x, yt - 26, P.rojoL);
  R.numero(conPrecio ? '$' + Math.round(precio) : '%', cx + 1 + sw, yt - 13, { color: P.rojo, centro: true, sombra: false });
}

// ════ cámara 'estante' ════
// tres baldas de cajas al doble (fila 1: abajo en y 94, fila 2: abajo en y 152, la tercera asoma abajo); los cantos azules
// en y 94–101 y 152–159 con las etiquetas (o.precio). Una mano que coge una caja entra por abajo o por un lado.
function b_estante(R, t, o, e84) {
  const { rect, pset, linea } = R, P = b_P;
  b_fijo(R, e84 ? 'est84' : 'est82', () => b_estanteFijo(R, e84));
  // las etiquetas de precio de los cantos
  for (const yb of [94, 152]) for (let x = 9; x < 320; x += 36) { if (e84 && ((x >> 2) % 3 === 1)) continue; rect(x, yb + 1, x + 21, yb + 6, P.papel); rect(x, yb + 1, x + 21, yb + 1, P.gondS); R.numero('$' + Math.round(o.precio ?? 35), x + 11, yb + 6, { color: e84 ? P.rojo : P.negro, centro: true, sombra: false, fina: true }); }
  // el brillo del celofán que barre las cajas cada pocos segundos
  { const u = (t % 4.5) / 4.5, bx = Math.round(-60 + u * 440);
    for (const [ya, yb] of [[54, 93], [112, 151], [170, 179]]) for (let y = ya; y <= yb; y++) { const x = bx - (y - ya) / 2; for (let d = 0; d < 3; d++) if ((y + d) % 2 === 0) { const xx = Math.round(x + d), p = R.pget(xx, y); if (p !== P.peg && p !== P.pegH) b_tinta(R, xx, y, 0.45, P.crema); } } }
  // el colgante de estrella que cuelga del canto y se mece
  { const sw = Math.sin(t * 1.6) * 3, cx = 162 + Math.round(sw), cy = 112;
    linea(162, 101, cx, cy - 8, P.gris);
    const pts = []; for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 - Math.PI / 2 + sw * 0.05, r = k % 2 ? 6 : 10; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    R.poligono(pts.map(([x, y]) => [x + 1, y + 1]), P.rojoS); R.poligono(pts, e84 ? b_mez(P.oro, P.gondS, 0.4) : P.oro); R.disco(cx, cy, 5, P.rojo); R.icono('!', cx - 1, cy - 3, P.crema, P.rojoS); }
  // motas de polvo que brillan en la luz
  for (let k = 0; k < (e84 ? 12 : 5); k++) { const x = Math.round(h(k, 1, 27) * 320 + Math.sin(t * 0.5 + k) * 5), y = Math.round((h(k, 2, 27) * 180 + t * 4) % 180); if ((x >= 274 && y <= 48) || (x <= 176 && y <= 18)) continue; if (Math.sin(t * 2 + k) > 0.2) pset(x, y, P.crema); }
  return { suelo: 179, baldas: [94, 152], cajas: { x0: 20, paso: 36, filas: [94, 152], ancho: 34, alto: 40 } };
}
function b_estanteFijo(R, e84) {
  const { rect, pset } = R, P = b_P;
  // arriba, el tablero perforado en la sombra de la balda de encima (tranquilo para la barra del año y para Atom: el canto
  // de la balda va por debajo de su esquina, en y 45–52), con los blísteres de mandos colgados de sus ganchos en medio
  rect(0, 0, 319, 179, P.peg);
  for (let y = 1; y < 180; y += 4) for (let x = 2 + ((y >> 2) & 1) * 3; x < 320; x += 6) { pset(x, y, P.pegH); pset(x + 1, y, P.pegS); }
  for (let y = 0; y < 45; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 || y < 24) b_tinta(R, x, y, 0.3 - y * 0.004);
  b_blisteres(R);
  rect(0, 45, 319, 52, b_mez(P.labio, P.negro, 0.25)); rect(0, 45, 319, 45, P.labio); rect(0, 52, 319, 52, P.labioS);
  for (let x = 0; x < 320; x++) for (let y = 53; y < 55; y++) if ((x + y) % 2 === 0) b_tinta(R, x, y, 0.3);
  // las tres filas de cajas iguales: la misma portada en colores chillones
  const filas = [[94, 'nave', 0], [152, 'nave', 3], [210, 'flor', 5]];
  for (const [yb, ico, d] of filas) {
    for (let i = 0; i < 9; i++) {
      const x = 20 + i * 36, hueco = e84 && h(i, yb, 28) < 0.45;
      // en 1984, los huecos: polvo, a veces una telaraña en la esquina y una caja tumbada
      if (hueco) { for (let k = 0; k < 6; k++) pset(x - 14 + Math.floor(h(k, i, yb) * 28), yb - 1, P.pegS); if (h(i, yb, 30) < 0.6) { const cy = yb - 39, tela = b_mez(P.peg, P.crema, 0.45); for (let d = 0; d < 8; d++) { if (d % 2) pset(x - 17 + d, cy + Math.round(d * 0.6), tela); pset(x - 17 + Math.round(d * 0.5), cy + d, tela); } for (const r of [3, 6]) for (let a = 0; a <= 6; a++) pset(x - 17 + Math.round(Math.cos(a / 4) * r), cy + Math.round(Math.sin(a / 4) * r), tela); } if (h(i, yb, 29) < 0.5) { rect(x - 16, yb - 12, x + 16, yb - 1, P.negro); rect(x - 15, yb - 11, x + 15, yb - 1, hex(b_CHILLON_HEX[b_CHILLON[(i + d) % 8]])); rect(x - 8, yb - 9, x + 8, yb - 3, P.pant); rect(x - 15, yb - 2, x + 15, yb - 1, P.gondD); } continue; }
      PIEZAS_AT.cajaCartucho?.(R, x, yb, { color: b_CHILLON[(i + d) % 8], icono: ico, s: 2 });
      for (let y = yb - 39; y < yb - 36; y++) for (let xx = x - 17; xx < x + 17; xx++) if ((xx + y) % 2 === 0) b_tinta(R, xx, y, 0.25);
    }
    if (yb > 179) continue;
    rect(0, yb, 319, yb + 7, P.labio); rect(0, yb, 319, yb, P.labioL); rect(0, yb + 7, 319, yb + 7, P.labioS); rect(0, yb + 1, 319, yb + 1, b_mez(P.labioL, P.labio, 0.5));
    for (let x = 0; x < 320; x++) for (let y = yb + 8; y < yb + 12; y++) if ((x + y) % 2 === 0 || y === yb + 8) b_tinta(R, x, y, 0.3);
  }
  // el montante de la góndola a la izquierda
  rect(0, 0, 4, 179, P.gondS); rect(0, 0, 0, 179, P.gondD); rect(1, 0, 1, 179, P.gond); for (let y = 3; y < 180; y += 6) pset(3, y, P.gondD);
}
// ════ cámara 'cesta' ════
// la cesta de rejilla a pantalla casi completa (borde delantero en y 104, x 14–306); el cartel en x 214–274, y 46–82. Si
// la escena pone un cartucho que se encoge, va encima del montón, en y 70–100.
function b_cestaCerca(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P;
  b_fijo(R, 'cestaFondo', () => b_cestaFondo(R));
  // el tubo del fondo que parpadea: la tienda se apaga a ratos
  const off = b_falla(t, 2);
  rect(118, 6, 168, 8, off ? P.tuboOff : hex('#e8e2c8'));
  if (off) for (let y = 0; y < 92; y++) for (let x = (y & 1); x < 320; x += 2) b_tinta(R, x, y, 0.22);
  // alguien que pasa desenfocado por el pasillo de detrás
  { const u = ((t * 9) % 420) - 50, x = Math.round(u), c = hex('#7a5a8a'), cS = hex('#5a4068');
    for (let y = 58; y < 96; y++) for (let i = -6; i <= 6; i++) { const ancho = y < 68 ? 3 : 6; if (Math.abs(i) > ancho || (i + y) % 2 && Math.abs(i) === ancho) continue; pset(x + i, y, y < 68 ? hex('#c8a088') : y < 84 ? (i < 0 ? cS : c) : hex('#4a4a5a')); } }
  // los banderines de rebajas, que se mecen
  for (let k = 0; k < 18; k++) { const x = 4 + k * 15, sag = Math.round(6 * Math.sin(Math.PI * k / 17)), y = 18 + sag, sw = Math.round(Math.sin(t * 1.3 + k * 0.7)); if (x > 262) break; R.poligono([[x, y], [x + 11, y], [x + 5 + sw, y + 10]], b_mez(k % 2 ? P.oro : P.rojo, hex('#a89880'), 0.35)); pset(x + 13, y + 1, P.gondD); }
  b_capa(R, 'cestaCapa', () => b_cestaCapa(R));
  // motas de polvo y el cartel con el precio
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 4, 30) * 320 + Math.sin(t * 0.6 + k) * 4), y = Math.round((h(k, 5, 30) * 100 + t * 3) % 100); if (Math.sin(t * 2 + k) > 0.3) pset(x, y, P.crema); }
  if (o.etiqueta !== false) {
    const sw = Math.round(Math.sin(t * 0.9) * 1), cx = 244 + sw;
    rect(243, 82, 245, 110, P.gris); rect(243, 82, 243, 110, P.grisL);
    rect(cx - 31, 45, cx + 31, 83, P.negro); rect(cx - 30, 46, cx + 30, 82, P.papel); rect(cx - 30, 46, cx + 30, 55, P.rojo); rect(cx - 30, 55, cx + 30, 55, P.rojoS);
    for (let x = cx - 28; x < cx + 30; x += 4) pset(x, 47, P.rojoL);
    rect(cx + 24, 79, cx + 30, 82, P.gondS); rect(cx - 30, 82, cx + 30, 82, P.gondS);
    if (o.precioAntes != null) { R.numero('$' + Math.round(o.precioAntes), cx, 54, { color: P.crema, centro: true, sombra: false, fina: true }); linea(cx - 12, 52, cx + 12, 49, P.negro); }
    R.numero('$' + Math.round(o.precio ?? 5), cx, 77, { color: P.rojo, centro: true, tam: 16 });
  }
  return { suelo: 179, borde: 104, monton: [30, 290, 70, 100], cartel: [214, 274, 46, 82] };
}

function b_cestaFondo(R) {
  const { rect, pset } = R, P = b_P, des = (c) => b_mez(c, hex('#8a8478'), 0.45);
  rect(0, 0, 319, 12, des(P.techo)); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 12, des(P.techoS)); rect(116, 5, 170, 9, des(P.troffer));
  rect(0, 13, 319, 105, des(P.pared)); for (let x = 3; x < 320; x += 8) rect(x, 13, x, 105, des(P.paredL));
  // las góndolas del fondo, desenfocadas y medio vacías
  for (const [x0, x1] of [[0, 92], [118, 210], [236, 319]]) {
    rect(x0, 34, x1, 105, des(P.peg)); rect(x0, 30, x1, 37, des(P.labio));
    for (const yb of [56, 76, 96]) {
      for (let x = x0 + 3; x < x1 - 6; x += 7) if (h(x, yb, 31) < 0.4) for (let y = yb - 9; y < yb; y++) for (let i = 0; i < 6; i++) if ((i + y) % 2 === 0 || (i > 0 && i < 5)) pset(x + i, y, des(hex(b_CHILLON_HEX[b_CHILLON[(x >> 3) % 8]])));
      for (let x = x0; x <= x1; x++) { pset(x, yb, des(P.labio)); if ((x + yb) % 2) pset(x, yb + 1, des(P.labio)); pset(x, yb + 2, des(P.pegS)); }
    }
  }
  for (let y = 98; y < 106; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) b_tinta(R, x, y, 0.2);
  // el suelo de baldosas, desenfocado, que asoma a los lados de la cesta (y 106–179), con la sombra de la cesta
  for (let y = 106; y < 180; y++) for (let x = 0; x < 320; x++) {
    const u = (y - 106) / 74, X = Math.floor((x - 160) / (14 + u * 18) + 100), Y = Math.floor((y - 106) / (6 + u * 10));
    let c = des((X + Y) % 2 ? P.s2 : P.s1); if (h(x, y, 33) < 0.06) c = b_mez(c, P.junta, 0.4);
    if (x < 12 || x > 308) c = b_mez(c, P.negro, Math.max(0, 0.35 - Math.min(Math.abs(x - 10), Math.abs(x - 310)) * 0.04));
    pset(x, y, c);
  }
}
function b_cestaCapa(R) {
  const { rect, pset, linea } = R, P = b_P;
  rect(10, 88, 310, 92, P.gris); rect(10, 88, 310, 88, P.grisL);
  for (let x = 12; x < 310; x += 6) linea(x, 92, x + 3, 104, P.grisL);
  rect(12, 92, 308, 104, hex('#2a2224'));
  // el montón: cajas detrás y cartuchos revueltos delante
  for (let k = 0; k < 6; k++) { const x = 34 + k * 48 + Math.round(h(k, 1, 32) * 10); PIEZAS_AT.cajaCartucho?.(R, x, 100 - Math.round(h(k, 2, 32) * 6), { color: b_CHILLON[(k * 3) % 8], icono: ['foso', 'nave', 'flor', 'comecocos'][k % 4], s: 2, dir: k % 2 ? -1 : 1 }); }
  for (let k = 0; k < 12; k++) { const x = 24 + k * 24 + Math.round(h(k, 3, 32) * 8); PIEZAS_AT.cartucho?.(R, x, 106 - Math.round(h(k, 4, 32) * 8), { color: b_CHILLON[(k * 5 + 1) % 8], icono: ['foso', 'flor', 'comecocos', 'nave'][k % 4], s: 2, dir: k % 2 ? -1 : 1 }); }
  for (let k = 0; k < 8; k++) { const x = 40 + k * 34 + Math.round(h(k, 5, 32) * 8); PIEZAS_AT.cartucho?.(R, x, 110, { color: b_CHILLON[(k * 3 + 2) % 8], icono: ['comecocos', 'foso'][k % 2] }); }
  // el frente de la cesta: interior oscuro con los colores de los cartuchos y la rejilla en rombos con su brillo
  rect(12, 106, 308, 179, hex('#2a2224'));
  for (let k = 0; k < 900; k++) { const x = 14 + Math.floor(h(k, 6, 32) * 292), y = 108 + Math.floor(h(k, 7, 32) * 70); pset(x, y, b_mez(hex(b_CHILLON_HEX[b_CHILLON[k % 8]]), hex('#2a2224'), 0.25 + (y - 108) / 140)); }
  for (let y = 106; y < 180; y++) for (let x = 12; x <= 308; x++) { const a = (x + y) % 10, b = (x - y + 400) % 10; if (a === 0 || b === 0) pset(x, y, y < 112 || (x + y) % 20 < 3 ? P.crema : P.grisL); else if (a === 1 || b === 1) pset(x, y, P.gris); }
  rect(8, 102, 312, 107, P.grisL); rect(8, 102, 312, 102, P.crema); rect(8, 103, 312, 103, hex('#e8eaf0')); rect(8, 107, 312, 107, P.gris);
  for (let x = 20; x < 300; x += 37) { pset(x, 103, P.papel); pset(x + 1, 103, P.papel); }
  rect(8, 102, 13, 179, P.grisL); rect(307, 102, 312, 179, P.gris); rect(8, 102, 8, 179, P.crema);
}

// ════ el almacén (general) ════
// suelo 160 (x 50–290 libre; la puerta de carga, a la derecha: el gerente señala hacia x 280, y 90); la carretilla va y
// viene entre x 40 y 160 con las ruedas en y 141 (detrás de los personajes); el mozo pequeño pasa al fondo en y 127
function b_almacen(R, t, o) {
  const { rect, pset, linea, disco } = R, P = b_P, ico = o.icono ?? 'varios', cam = o.camion !== false;
  b_fijo(R, 'alm|' + ico + '|' + cam, () => b_almacenFijo(R, ico, cam));
  // el cielo y la vida de fuera, solo por el hueco de la puerta
  R.recorte([244, 53, 314, 124]);
  for (const [v, y, w, f] of [[2.2, 58, 18, 0], [3.4, 64, 12, 40], [1.4, 55, 24, 80]]) b_nube(R, 244 + ((t * v + f) % 110) - 20, y, w);
  if (!cam) b_gente(R, 314 - ((t * 6) % 90), 116, t, 3, { anda: true, dir: -1, casco: true });
  { const u = (t * 0.12) % 1, bx = Math.round(244 + u * 80), by = 60 + Math.round(Math.sin(t * 2) * 2), a = Math.floor(t * 6) % 2; pset(bx, by, P.negro); pset(bx - 1, by - a, P.negro); pset(bx + 1, by - a, P.negro); }
  R.recorte(null);
  if (cam) { const on = Math.floor(t * 1.5) % 2; for (const x of [254, 304]) rect(x - 1, 116, x + 1, 117, on ? P.rojoL : P.rojoS); }
  // las lámparas colgadas de las cerchas, que se mecen
  for (const [x, f] of [[54, 0], [140, 1.3], [216, 2.6]]) {
    const sw = Math.round(Math.sin(t * 0.7 + f) * 1.2); linea(x, 26, x + sw, 33, P.cercha);
    rect(x + sw - 4, 34, x + sw + 4, 36, P.cerchaL); rect(x + sw - 2, 33, x + sw + 2, 33, P.cercha); rect(x + sw - 3, 37, x + sw + 3, 37, P.crema); pset(x + sw - 3, 34, P.chapaL);
  }
  // el polvo que baila en los haces de luz de las claraboyas
  for (let k = 0; k < 26; k++) { const u = h(k, 1, 40), y = Math.round(10 + ((h(k, 2, 40) * 110 + t * (2 + k % 3)) % 110)), x = Math.round(lerp(176, 140, (y - 6) / 118) + u * 50 + Math.sin(t * 0.6 + k) * 3); if (Math.sin(t * 1.4 + k * 1.7) > -0.3) pset(x, y, P.crema); }
  // el mozo del fondo, que empuja su carretilla de mano por el pasillo de atrás
  { const u = ((t * 7) % 260) / 260, x = Math.round(20 + u * 200); b_gente(R, x, 127, t, 1, { anda: true, dir: 1, casco: true }); rect(x + 3, 120, x + 4, 127, P.gris); rect(x + 4, 125, x + 9, 126, P.gris); rect(x + 5, 119, x + 9, 124, P.carton); rect(x + 5, 119, x + 9, 119, P.cartonL); pset(x + 6, 127, P.negro); }
  // la carretilla elevadora: va, sube el palé, vuelve
  if (o.carretilla !== false) {
    let x, dir, alza;
    if (typeof o.carretillaX === 'number') { x = o.carretillaX; dir = o.carretillaDir ?? 1; alza = o.alza ?? 4; }
    else { const c = (t % 16) / 16; dir = c < 0.5 ? 1 : -1; const u = c < 0.5 ? c / 0.5 : (1 - c) / 0.5; x = Math.round(40 + Math.min(1, Math.max(0, (u - 0.1) / 0.8)) * 120); alza = Math.round(Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (u - 0.85) / 0.15)))) * 12) + 2; }
    b_carretilla(R, x, 141, t, { dir, alza });
  }
  return { suelo: 160, puerta: [244, 53, 314, 124], camion: cam ? [252, 66, 306, 118] : null, carretilla: o.carretilla !== false ? 141 : null, estanteria: [0, 231, 22, 124] };
}
// la carretilla elevadora amarilla (x = el centro, suelo = donde apoyan las ruedas): contrapeso, asiento, el conductor con
// casco, el techo protector, el mástil con las horquillas a la altura o.alza, el palé con cajas, la luz naranja que gira
function b_carretilla(R, x, suelo, t, o = {}) {
  const { disco, pset, linea } = R, P = b_P, dir = o.dir ?? 1, alza = Math.round(o.alza ?? 2), S = Math.round(suelo), X = Math.round(x);
  const r = (i0, j0, i1, j1, c) => { const a = X + i0 * dir, b = X + i1 * dir; R.rect(Math.min(a, b), S - j1, Math.max(a, b), S - j0, c); };
  for (let i = -18; i <= 22; i++) if ((i + S) % 2 === 0) b_tinta(R, X + i * dir, S + 1, 0.35);
  r(-16, 4, -11, 17, P.amarilloS); r(-16, 17, -12, 17, P.amarillo);
  r(-14, 4, 9, 12, P.amarillo); r(-14, 12, 9, 12, P.amarilloL); r(-14, 4, 9, 5, P.amarilloS);
  r(-6, 8, 2, 8, P.negro);
  r(-9, 13, -3, 15, P.negro); r(-10, 13, -9, 21, P.negro);
  r(-7, 16, -4, 21, hex('#e8783a')); r(-7, 19, -4, 19, P.amarillo); r(-6, 22, -4, 24, hex('#f0c090')); r(-7, 25, -3, 26, P.amarillo); pset(X - 3 * dir, S - 23, P.negro);
  r(-3, 18, -1, 18, hex('#f0c090'));
  linea(X + 1 * dir, S - 13, X + 3 * dir, S - 19, P.negro); r(1, 19, 4, 19, P.negro);
  r(-12, 12, -11, 30, P.negro); r(5, 12, 6, 30, P.negro); r(-13, 30, 7, 31, P.negro); for (let i = -11; i < 6; i += 3) r(i, 31, i, 31, P.gris);
  if (Math.floor(t * 3) % 2) { r(-8, 32, -6, 33, hex('#f8a040')); r(-9, 33, -5, 33, b_mez(hex('#f8a040'), P.crema, 0.4)); } else r(-8, 32, -6, 33, hex('#a8582a'));
  r(9, 2, 11, 36, P.gris); r(12, 2, 13, 36, P.grisL); r(10, 3, 10, 35, P.negro);
  r(12, 2 + alza, 14, 14 + alza, P.negro); r(14, 2 + alza, 26, 3 + alza, P.grisL); r(14, 2 + alza, 26, 2 + alza, P.gris);
  r(14, 4 + alza, 27, 6 + alza, P.madera); for (const i of [16, 21, 26]) r(i, 4 + alza, i, 6 + alza, P.maderaD);
  r(15, 7 + alza, 26, 19 + alza, P.carton); r(15, 19 + alza, 26, 19 + alza, P.cartonL); r(20, 7 + alza, 21, 19 + alza, P.cinta); r(15, 13 + alza, 26, 13 + alza, P.cartonS);
  for (const [i, j] of [[17, 10], [24, 16]]) { R.disco(X + i * dir, S - j - alza, 1, P.oro); }
  for (const i of [-9, 6]) { disco(X + i * dir, S - 4, 4, P.negro); disco(X + i * dir, S - 4, 2, P.gris); pset(X + i * dir, S - 4, P.grisL); pset(X + i * dir + Math.round(Math.cos(t * 3) * 3), S - 4 + Math.round(Math.sin(t * 3) * 3), P.gris); }
}

// un cartón de almacén (w × hh, esquina de abajo a la izquierda en x, yb): luz arriba, sombra al lado, la cinta, la
// etiqueta y el dibujo impreso (comecocos: el bocadito amarillo; foso: el muñequito sobre el agujero; o una consola)
function b_carton(R, x, yb, w, hh, ico, k) {
  const { rect, pset } = R, P = b_P, y0 = yb - hh + 1, c = [P.carton, b_mez(P.carton, P.cartonL, 0.5), b_mez(P.carton, P.cartonS, 0.3)][k % 3];
  rect(x, y0, x + w - 1, yb, c); rect(x, y0, x + w - 2, y0, P.cartonL); rect(x + w - 1, y0, x + w - 1, yb, P.cartonS); rect(x, yb, x + w - 1, yb, P.cartonD);
  const m = x + (w >> 1); rect(m, y0, m, yb - 1, P.cinta);
  const i = (k >> 1) % 3, d = b_icoDe(ico, k), grande = hh >= 11 && w >= 11, n = grande ? 6 : 3, ix = x + 2 + (k % 2) * (w - 4 - n), iy = y0 + 2;
  if (hh < 6) return;
  b_icoCaja(R, ix, iy, d, 1, (q) => b_mez(q, c, 0.18), !grande);   // impreso sobre el cartón: un poco comido por su color
  if (grande) { rect(ix - 1, iy + 7, ix + 6, iy + 7, P.cartonS); if (w >= 18) for (let j = 0; j < 4; j++) rect(x + w - 8 + j, yb - 5, x + w - 8 + j, yb - 3 - (j % 2), j % 2 ? P.cartonD : P.negro); }   // la raya de debajo y el código de barras
  if (i === 0 && w > 10) { rect(x + w - 5, yb - 3, x + w - 3, yb - 2, P.papel); pset(x + w - 4, yb - 2, P.cartonS); }
}
// lo fijo del almacén: cubierta y cerchas, claraboyas con sus haces, la pared de chapa, la estantería de palés llena, la
// puerta de carga con el camión (o el patio), el suelo de hormigón, la luz de la puerta y el palé del centro
function b_almacenFijo(R, ico, cam) {
  const { rect, pset, linea, disco, poligono } = R, P = b_P;
  // la cubierta por dentro, con las correas, y las claraboyas
  rect(0, 0, 319, 30, P.cubierta); for (let y = 2; y < 30; y += 5) rect(0, y, 319, y, hex('#343842'));
  for (const [a, b] of [[178, 224], [236, 268]]) { rect(a, 0, b, 5, hex('#c8e0f0')); rect(a, 5, b, 5, hex('#8aa8c0')); for (let x = a + 6; x < b; x += 8) rect(x, 0, x, 4, hex('#9ab8d0')); }
  // las cerchas: cordón de arriba y de abajo, montantes y diagonales
  rect(0, 7, 319, 8, P.cercha); rect(0, 7, 319, 7, P.cerchaL); rect(0, 25, 319, 27, P.cercha); rect(0, 25, 319, 25, P.cerchaL);
  for (let x = 0; x < 320; x += 32) { rect(x, 8, x + 1, 25, P.cercha); linea(x + 1, 9, x + 31, 24, P.cercha); linea(x + 1, 10, x + 31, 25, P.cerchaL); }
  // la pared de chapa grecada, con los largueros y el óxido
  rect(0, 31, 319, 124, P.chapa);
  for (let x = 0; x < 320; x += 5) { rect(x, 31, x, 124, P.chapaL); rect(x + 3, 31, x + 3, 124, P.chapaS); }
  for (const y of [60, 96]) { rect(0, y, 319, y + 2, P.chapaS); rect(0, y, 319, y, P.chapaL); }
  for (let k = 0; k < 14; k++) { const x = Math.floor(h(k, 1, 41) * 320), y = 62 + Math.floor(h(k, 2, 41) * 30); for (let j = 0; j < 6 + k % 6; j++) if ((x + j) % 2 === 0) pset(x, y + j, hex('#9a6a4a')); }
  // los haces de luz de las claraboyas, que bajan en diagonal hasta el suelo
  for (const [a, b] of [[178, 224], [236, 268]]) for (let y = 6; y < 170; y++) { const dx = Math.round((y - 6) * -0.32); for (let x = a + dx; x <= b + dx; x++) if ((x + y) % 3 === 0) pset(x, y, b_mez(R.pget(x, y), P.crema, 0.25)); }
  // la estantería de palés: postes azules, largueros naranjas, palés de madera y cajas hasta arriba
  const vigas = [100, 76, 52, 28], postes = [0, 57, 114, 171, 228];
  for (let b = 0; b < 4; b++) {
    const xa = postes[b] + 4, xb = postes[b + 1] - 1;
    [124, ...vigas].forEach((yv, l) => {
      if (yv === 28) { for (let k = 0, x = xa + 2; x + 12 < xb; k++, x += 13) if (h(b, k, 42) < 0.8) b_carton(R, x, 27, 12, 9 + (k % 2) * 3, ico, k + b); return; }
      const yp = yv - 1, yTop = (l === 0 ? 100 : vigas[l]) + 4;
      rect(xa, yp - 2, xb, yp, P.madera); for (let x = xa + 2; x < xb; x += 8) rect(x, yp - 1, x + 2, yp, P.maderaD); rect(xa, yp - 2, xb, yp - 2, P.maderaL);
      const alto = yp - 3 - yTop, filas = Math.max(1, Math.floor((alto + 1) / 8));
      for (let f = 0; f < filas; f++) for (let k = 0, x = xa + 1; x + 12 <= xb; k++, x += 13) {
        if (f === filas - 1 && h(b * 7 + l, k, 43) < 0.18) continue;
        b_carton(R, x, yp - 3 - f * 8, 13, 8, ico, k + f * 3 + l + b);
      }
      for (let y = yTop; y < yp - 3; y += 3) { const x = xa + ((y * 5) % (xb - xa)); for (let d = 0; d < 6; d++) if (x + d <= xb) pset(x + d, y + d % 2, b_mez(R.pget(x + d, y + d % 2), P.crema, 0.3)); }   // el brillo del film
    });
  }
  for (const yv of vigas) { rect(0, yv, 231, yv + 3, P.viga); rect(0, yv, 231, yv, P.vigaL); rect(0, yv + 3, 231, yv + 3, P.vigaS); for (let x = 0; x < 232; x++) if ((x + yv) % 2) pset(x, yv + 4, b_mez(R.pget(x, yv + 4), P.negro, 0.3)); }
  for (const x of postes) { rect(x, 22, x + 3, 124, P.acero); rect(x, 22, x, 124, P.aceroL); rect(x + 3, 22, x + 3, 124, P.aceroS); for (let y = 26; y < 124; y += 4) pset(x + 2, y, P.aceroS); rect(x - 1, 122, x + 4, 124, P.aceroS); }
  for (let x = 0; x < 232; x++) for (let y = 4; y < 22; y++) if (R.pget(x, y) !== P.cubierta && (x + y) % 2) pset(x, y, b_mez(R.pget(x, y), P.cubierta, 0.35));
  // las placas con el número de cada calle en los postes
  postes.slice(0, 4).forEach((x, b) => { rect(x - 2, 106, x + 6, 115, P.negro); rect(x - 1, 107, x + 5, 114, P.papel); R.numero(String(b + 1), x + 3, 114, { color: P.negro, centro: true, sombra: false, fina: true }); });
  // una caja reventada al pie de la estantería, con cartuchos por el suelo
  b_carton(R, 124, 131, 12, 7, ico, 4); R.poligono([[124, 124], [130, 120], [131, 124]], P.cartonS); R.linea(124, 124, 130, 120, P.cartonL);
  for (const [x, y, c] of [[140, 132, 'amarillo'], [148, 133, 'verde'], [117, 132, 'naranja']]) { rect(x, y - 3, x + 5, y, P.negro); rect(x + 1, y - 3, x + 4, y - 2, hex(b_CHILLON_HEX[c])); }
  // el polvo sobre las cajas de arriba
  for (let k = 0; k < 120; k++) { const x = Math.floor(h(k, 3, 44) * 232), y = 14 + Math.floor(h(k, 4, 44) * 90); if (R.pget(x, y) === P.cartonL) pset(x, y, hex('#d8d0c4')); }
  // el hueco entre la estantería y la puerta: el extintor y el cuadro eléctrico
  rect(234, 98, 238, 112, P.rojo); rect(235, 96, 237, 97, P.negro); rect(234, 98, 234, 112, P.rojoL); rect(232, 66, 239, 82, P.gris); rect(233, 67, 238, 81, P.grisL); pset(236, 70, P.amarillo);
  // la puerta de carga: dintel con la persiana enrollada, jambas con franjas amarillas y negras
  rect(240, 44, 318, 52, P.chapaS); for (let x = 241; x < 318; x += 3) rect(x, 45, x, 51, P.chapa); rect(240, 44, 318, 44, P.chapaL); rect(240, 52, 318, 52, P.negro);
  for (const [a, b] of [[240, 243], [315, 318]]) for (let y = 53; y <= 124; y++) for (let x = a; x <= b; x++) pset(x, y, ((x + y) >> 2) % 2 ? P.amarillo : P.negro);
  b_patio(R, cam, ico);
  // el suelo de hormigón: textura, juntas que fugan, líneas amarillas, manchas de aceite y rodadas
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) { const r = h(x, y, 45); pset(x, y, r > 0.9 ? P.hormiS : r < 0.08 ? P.hormiL : P.hormi); }
  for (let y = 125; y < 180; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0) { const d = (y - 125) / 55, k = 0.18 * (1 - d); if (k > 0.02) pset(x, y, b_mez(R.pget(x, y), P.hormiD, k)); }
  for (const xb of [-240, -80, 80, 240, 400, 560]) linea(160 + (xb - 160) * 0.39, 125, xb, 179, P.hormiS);
  for (const y of [133, 146, 166]) rect(0, y, 319, y, P.hormiS);
  rect(0, 128, 236, 129, P.amarillo); rect(0, 129, 236, 129, P.amarilloS);
  for (let k = 0; k < 6; k++) { const x = 250 + k * 10; linea(x, 126, x + 6, 132, P.amarillo); }
  for (const [cx, cy, rx, ry] of [[96, 152, 9, 2], [180, 138, 6, 2], [40, 170, 7, 2], [262, 160, 8, 2]]) for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1 && (i + j) % 2 === 0) pset(cx + i, cy + j, P.hormiD);
  for (let x = 30; x < 300; x++) { const y1 = Math.round(150 + Math.sin(x / 40) * 6), y2 = y1 + 5; if (x % 3) { pset(x, y1, P.hormiS); pset(x, y2, P.hormiS); } }
  // la luz de la puerta que entra por el suelo, y los charcos de luz de las lámparas
  for (let y = 125; y < 180; y++) { const u = (y - 125) / 55, a = Math.round(244 - u * 44), b = Math.round(314 + u * 30); for (let x = a; x <= b; x++) if ((x + y) % 2 === 0) pset(x, y, b_mez(R.pget(x, y), P.crema, 0.35 * (1 - u * 0.6))); }
  for (const x of [54, 140, 216]) for (let j = -4; j <= 4; j++) for (let i = -22; i <= 22; i++) if ((i / 22) ** 2 + (j / 4) ** 2 <= 1 && (i + j) % 2 === 0) pset(x + i, 136 + j, b_mez(R.pget(x + i, 136 + j), P.crema, 0.25));
  // el palé del centro con cajas envueltas (al fondo, junto a la puerta) y una transpaleta aparcada
  rect(196, 133, 230, 136, P.madera); rect(196, 133, 230, 133, P.maderaL); for (let x = 198; x < 230; x += 8) rect(x, 135, x + 2, 136, P.maderaD);
  for (let f = 0; f < 3; f++) for (let k = 0; k < 3; k++) b_carton(R, 197 + k * 11, 132 - f * 9, 11, 9, ico, k + f * 2);
  for (let y = 106; y < 132; y += 4) linea(197, y, 229, y + 3, b_mez(P.carton, P.crema, 0.45));
  rect(160, 132, 186, 133, P.rojoS); rect(160, 131, 186, 131, P.rojo); rect(186, 118, 187, 132, P.rojoS); rect(184, 117, 190, 118, P.negro); disco(162, 134, 1, P.negro); disco(184, 134, 1, P.negro);
}
// lo que se ve por la puerta de carga (x 244–314, y 53–124): el cielo tramado, la sierra lejana, la valla y el patio; con
// el camión, la trasera del remolque con las puertas abiertas, la carga dentro, el parachoques y la rampa
function b_patio(R, cam, ico = 'varios') {
  const { rect, pset, linea, disco } = R, P = b_P;
  R.recorte([244, 53, 314, 124]);
  for (let y = 53; y < 96; y++) for (let x = 244; x <= 314; x++) { const u = (y - 53) / 43 + (h(x >> 1, y >> 1, 46) - 0.5) * 0.25; pset(x, y, u < 0.35 ? P.cielo1 : u < 0.7 ? P.cielo2 : P.cielo3); }
  R.poligono([[244, 92], [256, 84], [268, 88], [282, 80], [300, 87], [314, 83], [314, 96], [244, 96]], hex('#b89a7a'));
  R.poligono([[244, 94], [262, 90], [290, 93], [314, 90], [314, 97], [244, 97]], hex('#a07a5a'));
  rect(244, 97, 314, 124, hex('#6a6866')); for (let k = 0; k < 60; k++) pset(244 + Math.floor(h(k, 1, 47) * 70), 98 + Math.floor(h(k, 2, 47) * 26), hex('#5a5856'));
  for (let x = 244; x <= 314; x += 3) rect(x, 92, x, 97, P.gris); rect(244, 92, 314, 92, P.grisL);
  linea(300, 60, 300, 97, hex('#5a4a3a')); rect(296, 61, 304, 62, hex('#5a4a3a'));
  if (cam) {
    rect(250, 66, 308, 117, hex('#c8ccd4')); for (let x = 252; x < 308; x += 4) rect(x, 66, x, 117, hex('#a8acb4')); rect(250, 66, 308, 67, hex('#e8eaf0'));
    rect(255, 70, 303, 116, hex('#2a2622'));
    R.poligono([[255, 70], [303, 70], [292, 80], [266, 80]], hex('#3a3430')); R.poligono([[255, 116], [303, 116], [292, 104], [266, 104]], hex('#4a3e30'));
    rect(266, 80, 292, 104, hex('#3a3430'));
    for (let f = 0; f < 3; f++) for (let k = 0; k < 2; k++) b_carton(R, 268 + k * 12, 103 - f * 8, 11, 8, ico, k + f);
    for (let y = 106; y < 116; y += 3) rect(258 + (y - 106), y, 300 - (y - 106), y, hex('#5a4a38'));
    rect(244, 68, 250, 117, hex('#9a9ea8')); rect(308, 68, 314, 117, hex('#9a9ea8')); rect(249, 68, 249, 117, hex('#6a6e78')); rect(309, 68, 309, 117, hex('#6a6e78'));
    rect(250, 116, 308, 119, P.negro); rect(250, 116, 308, 116, P.gris);
    rect(250, 119, 308, 124, hex('#8a8e96')); for (let y = 120; y < 124; y += 2) for (let x = 251 + (y % 4); x < 308; x += 4) pset(x, y, hex('#b0b4bc'));
    rect(245, 110, 249, 122, P.negro); rect(309, 110, 313, 122, P.negro);
  } else {
    rect(262, 108, 296, 118, hex('#3a6a9a')); rect(266, 101, 284, 108, hex('#3a6a9a')); rect(268, 102, 282, 106, hex('#a8c8e0')); rect(262, 108, 296, 108, hex('#5a8aba'));
    for (const x of [270, 290]) { disco(x, 119, 3, P.negro); pset(x, 119, P.grisL); }
  }
  R.recorte(null);
}
// lo de delante en el almacén: el palé de cajas grandes de la izquierda (la de arriba abierta, con cartuchos que asoman y
// el film que brilla) y el bolardo amarillo y negro de la derecha
function b_almacenDelante(R, t, o) {
  const { rect, pset, linea } = R, P = b_P, ico = o.icono ?? 'varios';
  rect(0, 172, 46, 179, P.madera); rect(0, 172, 46, 172, P.maderaL); for (let x = 2; x < 46; x += 10) rect(x, 175, x + 4, 179, P.maderaD);
  for (let f = 0; f < 2; f++) for (let k = 0; k < 2; k++) b_carton(R, k * 22 - 2, 171 - f * 17, 22, 17, ico, k + f + 1);
  // la caja de arriba, abierta: el fondo oscuro, los cartuchos que asoman, el frente y las solapas
  rect(0, 120, 23, 127, P.cartonD);
  for (let k = 0; k < 3; k++) PIEZAS_AT.cartucho?.(R, 5 + k * 7, 131 - (k % 2) * 3, { color: ['amarillo', 'verde', 'naranja'][k], icono: b_icoDe(ico, k + 1, true), dir: k % 2 ? -1 : 1 });
  rect(0, 127, 23, 137, P.carton); rect(0, 127, 23, 127, P.cartonL); rect(23, 127, 23, 137, P.cartonS); rect(11, 127, 11, 136, P.cinta); rect(0, 137, 23, 137, P.cartonD);
  R.poligono([[23, 127], [33, 119], [33, 123], [24, 129]], P.cartonS); R.linea(23, 127, 33, 119, P.cartonL);
  R.poligono([[0, 120], [6, 113], [12, 113], [8, 120]], P.carton); R.linea(6, 113, 12, 113, P.cartonL);
  for (let y = 141; y < 168; y += 5) linea(0, y, 42, y + 4, b_mez(P.carton, P.crema, 0.5));
  { const g = (t % 5) / 5, y = Math.round(140 + g * 60); for (let x = 0; x < 44; x++) if ((x + y) % 2 === 0 && y + (x >> 2) < 171) pset(x, y + (x >> 2), b_mez(R.pget(x, y + (x >> 2)), P.crema, 0.5)); }   // el brillo que corre por el film
  for (let y = 132; y <= 179; y++) for (let x = 304; x <= 316; x++) { const borde = x === 304 || x === 316; pset(x, y, borde ? P.negro : ((y >> 2) % 2 ? P.amarillo : P.negro)); }
  rect(305, 130, 315, 133, P.amarilloL); rect(305, 130, 315, 130, P.crema); rect(305, 132, 305, 179, b_mez(P.amarillo, P.crema, 0.4));
}
// ════ cámara 'pasillo' ════
// perspectiva central: fuga en (160, 88); el suelo de un punto a profundidad z está en y = 88 + 240 / z y las caras de las
// estanterías en x = 160 ± 320 / z. Un personaje con los pies en y 165 está en z ≈ 3.1 (pasillo libre entre x 60 y 260);
// en y 150, x 108–212. Al fondo (z 30), la puerta iluminada en x 152–168, y 76–96.
function b_pasillo(R, t, o) {
  const { rect, pset } = R, P = b_P, ico = o.icono ?? 'varios';
  b_fijo(R, 'pas|' + ico, () => b_pasilloFijo(R, ico));
  // la lámpara del fondo que parpadea, y la baliza naranja que gira sobre la puerta del fondo
  if (b_falla(t, 3)) { rect(157, 69, 163, 69, hex('#5a5a5a')); }
  { const f = Math.floor(t * 4) % 4; rect(159, 72, 161, 72, f === 0 ? hex('#ffb040') : hex('#8a5a2a')); if (f === 0) { pset(157, 72, b_mez(hex('#ffb040'), P.cubierta, 0.5)); pset(163, 72, b_mez(hex('#ffb040'), P.cubierta, 0.5)); } }
  // el cartel con el número de la calle, colgado del techo con dos cadenas, que se mece un poco
  { const sw = Math.round(Math.sin(t * 0.8) * 1.2), cx = 160 + sw;
    for (const d of [-6, 6]) R.linea(160 + d, 18, cx + d, 30, P.gris);
    rect(cx - 9, 30, cx + 9, 42, P.negro); rect(cx - 8, 31, cx + 8, 41, P.amarillo); rect(cx - 8, 31, cx + 8, 31, P.amarilloL); rect(cx - 8, 41, cx + 8, 41, P.amarilloS);
    R.numero('7', cx, 40, { color: P.negro, centro: true, sombra: false }); }
  // la carretilla que cruza al fondo, recortada al hueco del pasillo
  R.recorte([149, 60, 171, 97]);
  { const u = (t % 10) / 10, x = Math.round(140 + u * 44), s = 97; rect(x - 4, s - 3, x + 3, s - 1, P.amarillo); rect(x - 4, s - 3, x + 3, s - 3, P.amarilloL); rect(x - 2, s - 7, x - 2, s - 3, P.negro); rect(x + 1, s - 7, x + 1, s - 3, P.negro); rect(x - 2, s - 7, x + 1, s - 7, P.negro); rect(x + 4, s - 9, x + 4, s - 1, P.gris); rect(x + 5, s - 4, x + 8, s - 3, P.carton); pset(x - 3, s, P.negro); pset(x + 2, s, P.negro); }
  R.recorte(null);
  // el mozo pequeño que cruza el pasillo empujando una transpaleta
  { const u = ((t * 0.09) % 1), x = Math.round(118 + u * 84), dir = 1; b_gente(R, x, 118, t, 2, { anda: true, dir, casco: true }); rect(x + 3, 112, x + 3, 118, P.rojoS); rect(x + 3, 117, x + 9, 118, P.rojo); }
  // el polvo que flota en la luz de las lámparas
  for (let k = 0; k < 30; k++) { const z = 2.5 + h(k, 1, 48) * 14, X = (h(k, 2, 48) - 0.5) * 4 + Math.sin(t * 0.3 + k) * 0.3, Y = ((h(k, 3, 48) * 7 + t * 0.15) % 7) - 4.8, x = Math.round(160 + X * 100 / z), y = Math.round(88 + Y * 100 / z); if (Math.sin(t * 1.5 + k * 1.9) > -0.2) pset(x, y, z < 6 ? P.crema : P.chapaL); }
  return { suelo: 165, fuga: [160, 88], libre: [60, 260], puertaFondo: [152, 76, 168, 96] };
}
// lo fijo del pasillo: techo con la tubería de los rociadores y la bandeja de cables, el suelo con sus juntas, rodadas y la
// mancha de aceite, la pared del fondo con la puerta, las lámparas y las dos estanterías de cajas con su cartón, su luz y
// lo impreso (el dibujo de ico, la etiqueta con el código de barras, las flechas de «hacia arriba» y el asa)
function b_pasilloFijo(R, ico) {
  const { rect, pset, poligono, linea } = R, P = b_P, VX = 160, VY = 88, F = 100, ZF = 30;
  const px = (X, z) => VX + X * F / z, py = (Y, z) => VY + Y * F / z, niebla = hex('#2a2a30');
  const fogz = (c, z) => b_mez(c, niebla, Math.min(0.8, z / ZF * 0.85));
  const quad = (X1, Y1, z1, X2, Y2, z2, c, modo) => {   // un rectángulo en el plano X = cte (modo 'x') o z = cte (modo 'z')
    const p = modo === 'x' ? [[px(X1, z1), py(Y1, z1)], [px(X1, z2), py(Y1, z2)], [px(X1, z2), py(Y2, z2)], [px(X1, z1), py(Y2, z1)]]
      : [[px(X1, z1), py(Y1, z1)], [px(X2, z1), py(Y1, z1)], [px(X2, z1), py(Y2, z1)], [px(X1, z1), py(Y2, z1)]];
    poligono(p.map(([x, y]) => [Math.round(x), Math.round(y)]), c);
  };
  const lamps = [3, 7, 11, 15, 19, 23, 27];
  // el techo y el suelo, píxel a píxel, con la niebla del fondo y los charcos de luz de las lámparas; en el suelo, las
  // rodadas de las carretillas y una mancha de aceite
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (y > VY) {
      const z = 240 / (y - VY); if (z > ZF) { c = hex('#6a6a70'); pset(x, y, c); continue; }
      const X = (x - VX) * z / F, r = h(x, y, 49); c = r > 0.9 ? P.hormiS : r < 0.08 ? P.hormiL : P.hormi;
      if (Math.abs(Math.abs(X) - 0.25) < 0.05 + z * 0.002) c = P.amarillo;
      if (Math.abs(Math.abs(X) - 1.05) < 0.07 + z * 0.002 && h(Math.floor(z * 2), X > 0 ? 1 : 2, 53) < 0.7 && r < 0.75) c = b_mez(c, P.hormiD, 0.35);
      if ((X - 0.7) ** 2 / 0.12 + (z - 5.6) ** 2 / 0.6 < 1 && (x + y) % 2 === 0) c = b_mez(c, P.hormiD, 0.6);
      if ((z % 2) < 0.04 * z ** 0.6) c = P.hormiS;
      let luz = 0; for (const zl of lamps) luz += Math.exp(-((z - zl) ** 2) / 1.5 - X * X / 2.5) * 0.45;
      if (luz > 0.05 && (x + y) % 2 === 0) c = b_mez(c, P.crema, Math.min(0.6, luz));
      c = fogz(c, z);
    } else {
      const z = 600 / (VY - y + 0.001); if (z > ZF || y >= VY) { pset(x, y, hex('#3a3a40')); continue; }
      const X = (x - VX) * z / F;
      c = (z % 2) < 0.05 * z ** 0.6 ? P.cerchaL : Math.abs(X % 0.8) < 0.03 ? hex('#343842') : P.cubierta;
      let luz = 0; for (const zl of lamps) luz += Math.exp(-((z - zl) ** 2) / 0.8 - X * X / 1.2) * 0.3;
      if (luz > 0.04 && (x + y) % 2 === 0) c = b_mez(c, P.crema, Math.min(0.35, luz));
      c = b_mez(c, niebla, Math.min(0.7, z / ZF * 0.7));
    }
    pset(x, y, c);
  }
  // por el techo: la tubería roja de los rociadores y la bandeja de cables, que fugan al fondo, con sus colgadores
  for (const [X, Y, c, cl] of [[-1.5, -5.6, P.rojoS, P.rojo], [1.5, -5.65, hex('#5a5e68'), hex('#9a9ea8')]]) {
    for (let z = 8; z < ZF; z += 0.5) { const w = Math.max(1, Math.round(0.14 * F / z)); for (let d = 0; d < w; d++) linea(Math.round(px(X, z)), Math.round(py(Y, z)) + d, Math.round(px(X, z + 0.5)), Math.round(py(Y, z + 0.5)) + d, fogz(d === 0 ? cl : c, z)); }
    for (let z = 9; z < ZF; z += 3) { const x = Math.round(px(X, z)); linea(x, Math.round(py(-6, z)), x, Math.round(py(Y, z)), fogz(P.cercha, z)); if (X < 0) pset(x, Math.round(py(Y, z)) + 1, fogz(P.oro, z)); }
  }
  // la pared del fondo con su puerta iluminada y el pictograma de salida
  rect(Math.round(px(-3.2, ZF)), Math.round(py(-6, ZF)), Math.round(px(3.2, ZF)), Math.round(py(2.4, ZF)), hex('#5a5a62'));
  rect(155, 79, 165, 96, hex('#f0e8c8')); rect(155, 79, 165, 79, hex('#c8c0a0')); rect(158, 74, 162, 77, P.verde); pset(159, 75, P.crema); pset(160, 75, P.crema);
  // las lámparas del techo en fila
  for (const z of lamps) poligono([[px(-0.7, z), py(-6, z)], [px(0.7, z), py(-6, z)], [px(0.7, z + 0.6), py(-6, z + 0.6)], [px(-0.7, z + 0.6), py(-6, z + 0.6)]].map(([x, y]) => [Math.round(x), Math.round(y)]), b_mez(P.tubo, niebla, Math.min(0.6, z / ZF * 0.6)));
  // la cara de una caja que da al pasillo (X = ±3,2, de z1 a z2, de yt a yb), de cerca: el cartón con motas y rozaduras,
  // la luz de las lámparas, la solapa de arriba, la cinta y el canto del fondo en sombra; y lo impreso, que se aparta de
  // la esquina de Atom y de la barra del año: el dibujo, la etiqueta con su código de barras, las flechas y el asa
  const cara = (X, s, z1, z2, yt, yb, c, n) => {
    const xa = Math.round(px(X, z1)), xb = Math.round(px(X, z2));
    for (let x = Math.max(0, Math.min(xa, xb)); x <= Math.min(319, Math.max(xa, xb)); x++) {
      const z = x === VX ? -1 : X * F / (x - VX); if (z < z1 - 0.01 || z > z2 + 0.01) continue;
      const u = (z - z1) / (z2 - z1), ya = Math.max(0, Math.round(py(yt, z))), yB = Math.min(179, Math.round(py(yb, z)));
      const ym = py((yt + yb) / 2, z), cin = 0.05 * F / z, sol = py(yt + 0.16, z);
      let luz = 0; for (const zl of lamps) luz += Math.exp(-((z - zl) ** 2) / 2) * 0.2;
      for (let y = ya; y <= yB; y++) {
        const r = h(x, y, 52); let col = r < 0.05 ? P.cartonS : r > 0.96 ? P.cartonL : c;
        if (Math.abs(y - ym) <= cin) col = r < 0.3 ? b_mez(P.cinta, P.cartonL, 0.5) : P.cinta;
        else if (Math.abs(y - sol) < 0.6) col = P.cartonS;
        if (y === ya) col = P.cartonL;
        col = b_mez(col, P.cartonD, Math.max(0, u - 0.8) * 2.2 + Math.max(0, (y - ya) / Math.max(1, yB - ya) - 0.7) * 0.5);
        pset(x, y, fogz(b_mez(col, P.crema, Math.min(0.3, luz)), z));
      }
    }
    const zi = z1 + 0.14, e = 0.065 * F / zi; if (e < 0.6) return;
    const sc = Math.max(1, Math.round(e)), lado = 6 * sc, xi = Math.round(s < 0 ? px(X, zi) : px(X, zi) - lado), yi = Math.round(py(yt + 0.24, zi));
    const libre = (a, b, c2, d) => !(c2 >= 274 && b <= 48) && !(c2 >= 16 && a <= 176 && b <= 18) && a >= 0 && c2 <= 319;
    if (libre(xi, yi, xi + lado, yi + lado)) b_icoCaja(R, xi, yi, b_icoDe(ico, n), sc, (q) => fogz(b_mez(q, c, 0.15), zi));
    if (sc < 2) return;
    // la etiqueta blanca con el código de barras
    const za = z1 + 0.5, zb = z1 + 0.75, ya2 = yt + 0.26, yb2 = yt + 0.52;
    const ex = [Math.round(px(X, za)), Math.round(px(X, zb))], ey = Math.round(py(ya2, za));
    if (libre(Math.min(...ex), ey, Math.max(...ex), Math.round(py(yb2, za)))) {
      quad(X, ya2, za, 0, yb2, zb, fogz(P.papel, za), 'x');
      for (let k = 0; k < 9; k++) { const zz = lerp(za + 0.03, zb - 0.03, k / 8); if (h(k, n, 54) < 0.6) { const x = Math.round(px(X, zz)); linea(x, Math.round(py(ya2 + 0.12, zz)), x, Math.round(py(yb2 - 0.03, zz)), fogz(P.negro, zz)); } }
      quad(X, ya2 + 0.03, za + 0.03, 0, ya2 + 0.07, zb - 0.06, fogz(P.cartonS, za), 'x');
    }
    // las dos flechas de «hacia arriba», abajo, y el asa troquelada
    for (const zz of [z1 + 0.18, z1 + 0.3]) {
      const x = Math.round(px(X, zz)), y0 = Math.round(py(yb - 0.3, zz)), y1 = Math.round(py(yb - 0.08, zz)), a = Math.max(1, Math.round(0.04 * F / zz));
      if (!libre(x - a, y0, x + a, y1)) continue;
      linea(x, y0, x, y1, fogz(P.cartonD, zz)); linea(x - a, y0 + a, x, y0, fogz(P.cartonD, zz)); linea(x + a, y0 + a, x, y0, fogz(P.cartonD, zz));
    }
    { const z0 = z1 + 0.55, z3 = z1 + 0.72; if (libre(Math.min(px(X, z0), px(X, z3)), py(yb - 0.3, z0), Math.max(px(X, z0), px(X, z3)), py(yb - 0.2, z0))) quad(X, yb - 0.3, z0, 0, yb - 0.21, z3, fogz(P.cartonD, z0), 'x'); }
  };
  // las estanterías de los dos lados, de atrás hacia delante: fondo oscuro, cajas, largueros y postes
  const nivel = [[1.0, 2.4], [-0.6, 1.0], [-2.2, -0.6], [-3.8, -2.2], [-5.4, -3.8]];
  for (let za = ZF - 1.5; za > 0.3; za -= 2) {
    const zb = za + 2, fog = (c, z) => b_mez(c, niebla, Math.min(0.8, z / ZF * 0.85));
    for (const s of [-1, 1]) {
      const X = 3.2 * s;
      quad(X, -5.6, za, 0, 2.4, zb, fog(hex('#1e2026'), za), 'x');
      nivel.forEach(([y1, y2], l) => {
        for (const [z1, z2] of [[za + 0.1, za + 0.95], [za + 1.05, za + 1.9]]) {
          const k = Math.floor(h(za * 3 + l, z1 * 7, s + 50) * 3), c = [P.carton, b_mez(P.carton, P.cartonL, 0.5), b_mez(P.carton, P.cartonS, 0.3)][k];
          if (z1 > 5 && h(za + l, z1, s + 51) < 0.07) continue;
          const yt = y1 + 0.12, yb = y2 - 0.25;
          quad(X, yt, z1, X + 1.2 * s, yb, z1, fog(P.cartonL, z1), 'z');
          quad(X, yt, z1, 0, yb, z2, fog(c, z1), 'x');
          quad(X, yt, z1, 0, yt + 0.06, z2, fog(P.cartonL, z1), 'x');
          quad(X, (yt + yb) / 2 - 0.05, z1, 0, (yt + yb) / 2 + 0.05, z2, fog(P.cinta, z1), 'x');
          if (z1 < 12) cara(X, s, z1, z2, yt, yb, c, Math.floor(za) * 5 + l * 3 + (z1 > za + 1 ? 1 : 0) + (s > 0 ? 2 : 0));
        }
        quad(X, y2 - 0.25, za, 0, y2, zb, fog(P.madera, za), 'x');
        if (za < 10) for (let zz = za + 0.3; zz < zb; zz += 0.5) quad(X, y2 - 0.2, zz, 0, y2 - 0.05, zz + 0.12, fog(P.maderaD, za), 'x');   // las tablas del palé
        quad(X, y2, za, 0, y2 + 0.22, zb, fog(P.viga, za), 'x'); quad(X, y2, za, 0, y2 + 0.05, zb, fog(P.vigaL, za), 'x');
      });
      quad(X, -5.6, za - 0.08, 0, 2.4, za + 0.08, fog(P.acero, za), 'x'); quad(X + 1.2 * s, -5.6, za - 0.08, 0, 2.4, za + 0.08, fog(P.aceroS, za), 'x');
      quad(X, -5.6, za - 0.08, X + 1.2 * s, 2.4, za - 0.08, fog(P.aceroL, za), 'z');
      if (za < 14) for (let Y = -5.2; Y < 2.2; Y += 0.4) { const x = Math.round(px(X, za)), y = Math.round(py(Y, za)); if (y > 50 && y < 179) pset(x + s * -1, y, fog(P.aceroS, za)); }   // los taladros del poste
    }
  }
  // la sombra del techo arriba (la barra del año y la esquina de Atom, tranquilas)
  for (let y = 0; y < 56; y++) { const k = (56 - y) / 56 * 0.55; for (let x = 0; x < 320; x++) pset(x, y, b_mez(R.pget(x, y), hex('#14161c'), k)); }
}
// la trama ordenada 4 × 4 (0–1): degradados, halos y brumas tramados
const M_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const m_b4 = (x, y) => (M_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// mezcla dos colores (f = 0, el primero; f = 1, el segundo)
const m_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };

// los colores del mundo
const MC = pal({
  k: '#141018', blanco: '#fbf6ea', oro: '#d8a838', oroL: '#fff0a8', oroS: '#8a6420', bombOff: '#7a5a3a', crema: '#f2e2b8',
  ladr: '#7a3a30', ladrL: '#8e4a3a', ladrS: '#5e2a26', junta: '#4a2a28', cristal: '#2a3a5a', cromo: '#c8ccd8', cromoS: '#7a7e8e',
  asfalto: '#2a2836', asfaltoL: '#363448', acera: '#5e5870', aceraL: '#6e6880', neonR: '#ff5a8a', neonA: '#5ad8ff', neonV: '#7aff8a', neonM: '#ffd84a',
});

const M_NOCHE = ['#0c1030', '#121842', '#1a2052', '#242862', '#34306e', '#4c3876', '#6a427a'].map(hex);

const M_INVIERNO = ['#7a8aa0', '#8a9aae', '#9aa8ba', '#aab6c4', '#bac4ce', '#c8d0d6', '#d4dadc'].map(hex);

// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo; luz(x, y) suma pasos de la rampa
function m_degradado(R, x0, y0, x1, y1, cols, luz = null, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > m_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}

// las capas fijas de cada encuadre: se pintan una vez en un búfer (con la máscara de lo que es cielo, para que las nubes
// y las estrellas pasen solo por él) y se copian en cada fotograma
const M_CAPAS = new WeakMap();

function m_capa(R, clave, cielo, resto) {
  let m = M_CAPAS.get(R); if (!m) { m = new Map(); M_CAPAS.set(R, m); }
  let c = m.get(clave);
  if (!c) { const b = R.nuevo(), prev = R.usar(b); let cie = null; if (cielo) { cielo(); cie = b.slice(); } resto(); R.usar(prev);
    let mask = null; if (cie) { mask = new Uint8Array(320 * 180); for (let i = 0; i < mask.length; i++) mask[i] = b[i] === cie[i] ? 1 : 0; }
    c = { b, mask }; m.set(clave, c); }
  R.copiar(c.b); return c.mask;
}

// pinta solo donde la máscara dice cielo
const m_enCielo = (R, mask) => (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < 320 && y >= 0 && y < 180 && mask[y * 320 + x]) R.pset(x, y, c); };

// un rectángulo recortado a cl = [x0, y0, x1, y1] (R.rect no respeta R.recorte)
const m_rc = (R, cl, x0, y0, x1, y1, c) => R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c);

// nube alargada (cx, cy: el centro de su base; w el ancho; k la semilla); c = [arriba, cuerpo, abajo, filo]; px pinta
function m_nube(px, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) px(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 1) ? c[0] : c[1]);
}

// vapor que sube (x, y: la boca), en bocanadas que crecen y se deshacen por el borde tramado
function m_vapor(R, x, y, t, k = 0, col = MC.blanco, alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1.6 + u * 3.4, cx = x + u * alto * 0.45 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (d < 0.7 && u < 0.6) R.pset(xx, yy, col); else if (m_b4(xx, yy) < (1.1 - u) * (1.3 - d)) R.pset(xx, yy, col); } }
}

// ladrillo con juntas, piezas de tonos distintos y alguna mancha; c = [base, luz, sombra, junta]
function m_ladrillo(R, x0, y0, x1, y1, c, k = 0, alto = 4, ancho = 8) {
  for (let y = y0; y <= y1; y++) { const fy = y - y0, fila = Math.floor(fy / alto);
    for (let x = x0; x <= x1; x++) { const dx = x - x0 + (fila & 1) * (ancho >> 1);
      if (fy % alto === alto - 1 || dx % ancho === ancho - 1) { R.pset(x, y, c[3]); continue; }
      const v = h(Math.floor(dx / ancho), fila, k); R.pset(x, y, v < 0.2 ? c[2] : v > 0.82 ? c[1] : h(x, y, k + 3) < 0.05 ? c[2] : fy % alto === 0 && v > 0.5 ? c[1] : c[0]); } }
}

// una persona pequeña de fondo (12 px; o.chico: un niño de 9 px), con abrigo, bufanda o gorro, que anda (o.anda) o espera
// moviéndose un poco; k elige la ropa; o.dir mira a la derecha (1) o a la izquierda (−1); o.nieve: copos en los hombros
const M_ABRIGOS = ['#6a3a2a', '#2a3a5a', '#7a2a2a', '#3a4a3a', '#7a6a4a', '#4a2a4a', '#8a6a3a', '#2a2a30', '#3a5a6a', '#9a4a2a'].map(hex);

const M_PIELES = ['#f0c8a0', '#d8a070', '#a86a40', '#7a4a2a', '#e8b890'].map(hex);

const M_PELOS = ['#2a1a10', '#5a3418', '#8a5a2a', '#1a1a1a', '#c8a060', '#9a9a9a'].map(hex);

function m_figura(R, x, y, t, k, o = {}) {
  const { rect, pset } = R; x = Math.round(x); y = Math.round(y);
  const ab = o.abrigo ?? M_ABRIGOS[k % 10], abS = m_mezcla(ab, MC.k, 0.4), abL = m_mezcla(ab, MC.blanco, 0.2), piel = M_PIELES[(k * 3) % 5], pelo = M_PELOS[(k * 5 + 1) % 6];
  const d = o.dir ?? 1, pc = o.pantalon ?? (k & 1 ? hex('#2a2a3a') : hex('#3a3a5a')), luz = o.luz;
  const ch = o.chico ? 1 : 0, ph = o.anda ? Math.floor(t * 6 + k * 0.7) % 2 : 0;
  const bob = o.anda ? ph : (Math.sin(t * 1.3 + k * 1.7) > 0.9 ? 1 : 0);
  const top = y - (ch ? 8 : 11) + bob;
  // las piernas, que se cruzan al andar
  if (o.anda && ph) { rect(x - 2, y - 2 + ch, x - 1, y - 1, pc); rect(x, y - 2 + ch, x + 1, y, pc); pset(x - 3 * d, y, pc); pset(x - 2, y, MC.k); }
  else { rect(x - 2, y - 2 + ch, x - 1, y, pc); rect(x + 1, y - 2 + ch, x + 2, y, pc); pset(x - 2, y, MC.k); pset(x + 2, y, MC.k); pset(x - 1, y, MC.k); pset(x + 1, y, MC.k); }
  // el abrigo con su sombra y su luz, los brazos y el faldón
  const cy0 = top + (ch ? 3 : 4), cy1 = y - (ch ? 2 : 3);
  rect(x - 2, cy0, x + 2, cy1, ab); rect(x + (d > 0 ? -2 : 2), cy0, x + (d > 0 ? -2 : 2), cy1, abS); pset(x + d, cy0, abL);
  if (!ch && k % 3 === 0) { rect(x - 3, cy1, x + 3, cy1, ab); pset(x - 3, cy1, abS); }
  const brazo = o.brazo && Math.sin(t * 0.9 + k) > 0.2;
  if (brazo) { pset(x + 3 * d, cy0, abS); pset(x + 3 * d, cy0 - 1, piel); } else { rect(x - 3, cy0 + 1, x - 3, cy1 - 1, abS); rect(x + 3, cy0 + 1, x + 3, cy1 - 1, abS); if (o.anda) { pset(x + (ph ? 3 : -3), cy1, piel); } }
  if (k % 4 === 1) rect(x - 2, cy0, x + 2, cy0, k & 2 ? hex('#c83a3a') : hex('#e8c840'));   // la bufanda
  // la cabeza con su pelo (de espaldas a un lado) y el ojo
  rect(x - 1, top + 1, x + 1, top + 3, piel); rect(x - 1, top, x + 1, top, pelo); pset(x - 2 * d, top + 1, pelo); pset(x - d, top + 1, pelo);
  if (k % 5 === 2) { pset(x - 2 * d, top + 2, pelo); pset(x - 2 * d, top + 3, pelo); }
  if ((t + k * 0.37) % 4 > 0.15) pset(x + d, top + 2, MC.k);
  if (o.gorro || k % 6 === 3) { const g = o.gorro ?? hex('#3a3a4a'); rect(x - 2, top - 1, x + 2, top, g); if (k % 6 === 3) rect(x - 1, top - 2, x + 1, top - 2, g); }
  if (o.nieve) { pset(x - 1, cy0 - 0, MC.blanco); pset(x + 2, cy0, MC.blanco); if (o.gorro || k % 6 === 3) pset(x, top - 1, MC.blanco); }
  if (luz) { pset(x - d * 2, cy0 + 1, luz); pset(x - d, top, luz); }
}

// un coche de época visto de lado (x el centro, suelo la línea de las ruedas; dir 1 mira a la derecha); tipo 'berlina',
// 'ranchera' (con paneles de madera) o 'taxi' (amarillo, con el piloto del techo y la franja de cuadros, sin letras);
// noche: los faros encendidos con su haz tramado y los pilotos rojos
function m_coche(R, x, suelo, tipo, col, dir, t, noche) {
  const { pset } = R, X = (dx) => Math.round(x + dx * dir), Y = (dy) => Math.round(suelo + dy);
  const rr = (a, b, c, d, cc) => { const x0 = Math.min(X(a), X(c)), x1 = Math.max(X(a), X(c)); R.rect(x0, Y(b), x1, Y(d), cc); };
  const cS = m_mezcla(col, MC.k, 0.4), cL = m_mezcla(col, MC.blanco, 0.3), vid = noche ? hex('#1a2238') : hex('#5a7a9a'), vidL = noche ? hex('#3a4a6a') : hex('#a8c8e0');
  // la sombra en el suelo
  rr(-24, 0, 24, 0, m_mezcla(MC.k, MC.asfalto, 0.4));
  // la carrocería: el capó, el maletero y el lateral con su luz arriba y su sombra abajo
  rr(-23, -10, 23, -4, col); rr(-23, -10, 23, -10, cL); rr(-23, -5, 23, -4, cS); rr(-24, -9, -24, -5, cS);
  rr(21, -9, 23, -6, col); rr(23, -9, 23, -9, cL);
  // la cabina
  const atras = tipo === 'ranchera' ? -21 : -12, techo = tipo === 'taxi' ? -17 : -16;
  for (let yy = -11; yy >= techo; yy--) { const u = (yy + 11) / (techo + 11); const a = Math.round(atras + (tipo === 'ranchera' ? 0 : u * 3)), b = Math.round(8 - u * 5); rr(a, yy, b, yy, yy === techo ? cL : col); }
  // las ventanillas con el reflejo y el montante
  for (let yy = -12; yy >= techo + 1; yy--) { const u = (yy + 11) / (techo + 11); const a = Math.round(atras + 1 + (tipo === 'ranchera' ? 0 : u * 3)), b = Math.round(7 - u * 5); rr(a, yy, b, yy, vid); }
  rr(-2, -15, -1, -11, col); if (tipo === 'ranchera') rr(-12, -15, -11, -11, col);
  pset(X(4), Y(-14), vidL); pset(X(3), Y(-13), vidL); pset(X(-6), Y(-14), vidL);
  // los paneles de madera de la ranchera, la franja de cuadros del taxi y su piloto
  if (tipo === 'ranchera') { rr(-21, -9, 18, -6, hex('#8a5a2a')); rr(-21, -9, 18, -9, hex('#c8a060')); rr(-21, -6, 18, -6, hex('#c8a060')); for (const dx of [-21, -1, 18]) rr(dx, -9, dx, -6, hex('#c8a060')); for (let dx = -18; dx < 16; dx += 5) pset(X(dx), Y(-8), hex('#6a4220')); }
  if (tipo === 'taxi') { for (let dx = -20; dx <= 18; dx++) { pset(X(dx), Y(-7), ((dx >> 1) & 1) ? MC.k : MC.blanco); } rr(-6, -19, -2, -18, hex('#f8f0c0')); rr(-6, -19, -2, -19, hex('#fffbe0')); }
  // la puerta, la manija, el parachoques cromado, los faros y los pilotos
  rr(0, -10, 0, -5, cS); pset(X(2), Y(-9), MC.cromo); if (tipo !== 'ranchera') { rr(-11, -10, -11, -5, cS); pset(X(-9), Y(-9), MC.cromo); }
  rr(22, -5, 24, -4, MC.cromo); rr(-24, -5, -22, -4, MC.cromo); rr(22, -5, 24, -5, MC.blanco);
  rr(23, -9, 23, -8, noche ? hex('#fff8d0') : hex('#e8e8d8')); rr(-23, -9, -23, -7, noche ? hex('#ff3a3a') : hex('#a82a2a'));
  // las ruedas con el tapacubos y el radio que gira
  for (const dx of [-14, 14]) { R.disco(X(dx), Y(-3), 3, MC.k); R.disco(X(dx), Y(-3), 1, MC.cromo); const a = t * 9 * dir; pset(Math.round(X(dx) + Math.cos(a) * 2), Math.round(Y(-3) + Math.sin(a) * 2), MC.cromoS); rr(dx - 4, -7, dx + 4, -7, cS); }
  // de noche, el haz de los faros sobre el asfalto
  if (noche) for (let i = 1; i < 34; i++) for (let j = -2 - (i >> 3); j <= 1 + (i >> 4); j++) if (m_b4(X(24 + i), Y(-7 + j + (i >> 2))) < 0.42 - i * 0.011) pset(X(24 + i), Y(-7 + j + (i >> 2)), hex('#e8d8a0'));
}

// el tráfico de la calzada: cada coche [color, tipo, dir, segundos de una pasada, desfase]; los que van a la derecha por el
// carril de delante (ruedas en y 177), los otros por el de atrás (y 166)
function m_trafico(R, t, lista, noche) {
  for (const [col, tipo, dir, per, off] of lista) { const u = ((t + off) % per) / per, x = dir > 0 ? -40 + u * 400 : 360 - u * 400; m_coche(R, Math.round(x), dir > 0 ? 177 : 166, tipo, col, dir, t, noche); }
}

// una farola de hierro (x el poste, suelo su base) con el farol encendido, el halo tramado y las polillas
function m_farola(R, x, suelo, t) {
  const { rect, pset } = R; R.halo(x, suelo - 92, 10, [hex('#4a3e62'), hex('#8a6e6a')], 1.4);
  rect(x - 1, suelo - 86, x + 1, suelo, hex('#24242e')); rect(x, suelo - 86, x, suelo, hex('#4a4a5e')); rect(x - 3, suelo - 8, x + 3, suelo, hex('#24242e')); rect(x - 2, suelo - 8, x - 2, suelo, hex('#4a4a5e'));
  rect(x - 2, suelo - 30, x + 2, suelo - 28, hex('#24242e'));
  rect(x - 4, suelo - 96, x + 4, suelo - 95, hex('#24242e')); rect(x - 3, suelo - 94, x + 3, suelo - 88, hex('#fff2c0')); rect(x - 3, suelo - 94, x - 3, suelo - 88, hex('#f8d890')); rect(x - 4, suelo - 87, x + 4, suelo - 87, hex('#24242e')); pset(x, suelo - 97, hex('#24242e'));
  for (let k = 0; k < 3; k++) { const a = t * (3 + k) + k * 2; pset(Math.round(x + Math.cos(a) * (5 + k * 2)), Math.round(suelo - 91 + Math.sin(a * 1.3) * 4), hex('#e8dcc8')); }
}

// una fila de bombillas que corren alrededor de un rectángulo (paso px entre bombillas)
function m_bombillas(R, x0, y0, x1, y1, paso, t, on = MC.oroL, off = MC.bombOff, vel = 6) {
  const per = []; for (let x = x0; x < x1; x += paso) per.push([x, y0]); for (let y = y0; y < y1; y += paso) per.push([x1, y]); for (let x = x1; x > x0; x -= paso) per.push([x, y1]); for (let y = y1; y > y0; y -= paso) per.push([x0, y]);
  const f = Math.floor(t * vel);
  per.forEach(([x, y], i) => { const e = (i + f) % 3 === 0; R.pset(x, y, e ? on : off); if (e) { const m = m_mezcla(on, off, 0.5); R.pset(x + 1, y, m); R.pset(x - 1, y, m); R.pset(x, y - 1, m); R.pset(x, y + 1, m); } });
}

// la luna con una bicicleta en silueta que la cruza (el emblema de la película, sin letras): cx, cy, el radio r; la bici
// con su ciclista y la cesta se mece un poco con t
function m_lunaBici(R, cx, cy, r, t, luna = hex('#f4ecc0'), sil = hex('#141a30')) {
  const { pset, disco } = R, lunaS = m_mezcla(luna, hex('#b8a880'), 0.55);
  R.halo(cx, cy, r + 4, [m_mezcla(luna, sil, 0.75), m_mezcla(luna, sil, 0.55)], 1.0);
  disco(cx, cy, r, luna);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d < r && d > r - 1.6 && i + j > 0) pset(cx + i, cy + j, lunaS); }
  for (const [a, b, q] of [[-0.4, -0.35, 0.18], [0.3, 0.4, 0.13], [0.45, -0.3, 0.1], [-0.2, 0.55, 0.08]]) { disco(Math.round(cx + a * r), Math.round(cy + b * r), Math.max(1, Math.round(q * r)), lunaS); }
  const s = r / 9, bx = cx + Math.round(Math.sin(t * 0.8) * s), by = cy + Math.round(Math.sin(t * 1.6) * s * 0.6) + Math.round(s * 1.5);
  const P = (dx, dy) => [Math.round(bx + dx * s), Math.round(by + dy * s)], L = (a, b) => { R.linea(...P(...a), ...P(...b), sil); if (s >= 1.8) R.linea(P(...a)[0], P(...a)[1] + 1, P(...b)[0], P(...b)[1] + 1, sil); };
  const rueda = (wx, wy) => { const [qx, qy] = P(wx, wy), rr = 2.3 * s; for (let a = 0; a < 6.3; a += 0.25 / s) { pset(Math.round(qx + Math.cos(a) * rr), Math.round(qy + Math.sin(a) * rr), sil); if (s >= 1.8) pset(Math.round(qx + Math.cos(a) * (rr - 1)), Math.round(qy + Math.sin(a) * (rr - 1)), sil); } pset(qx, qy, sil); };
  rueda(-4, 3); rueda(4, 3);
  L([-4, 3], [-1, -1]); L([-1, -1], [0, 3]); L([0, 3], [-4, 3]); L([0, 3], [3, -1]); L([-1, -1], [3, -1]); L([3, -1], [4, 3]); L([3, -1], [3, -2.5]); L([2.2, -2.6], [3.8, -2.6]);
  // la cesta delante del manillar, con la manta que asoma
  L([3.4, -1.6], [5.6, -1.6]); L([3.6, -0.4], [5.4, -0.4]); L([3.4, -1.6], [3.6, -0.4]); L([5.6, -1.6], [5.4, -0.4]); { const [qx, qy] = P(4.6, -2.3); disco(qx, qy, Math.max(1, Math.round(s * 0.9)), sil); }
  // el ciclista: el tronco inclinado, la cabeza con la capucha, el brazo al manillar y la pierna al pedal
  L([-1, -1], [0.4, -5]); L([-0.6, -1.2], [0.8, -4.8]); { const [qx, qy] = P(0.9, -6.4); disco(qx, qy, Math.max(1, Math.round(s * 1.3)), sil); }
  L([0.4, -4.2], [3, -2.5]); const pd = Math.sin(t * 5) * 0.8; L([-1, -1], [0.3 + pd, 1.3]); L([0.3 + pd, 1.3], [0.2 + pd * 0.6, 3.4]);
}

// un símbolo de neón sin letras (centro cx, cy; 7 × 7 a la escala e): k 0 corazón, 1 estrella, 2 rombo, 3 ondas,
// 4 sol, 5 rayo
const M_SIMB = [
  ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...', '.......'],
  ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '##...##'],
  ['...#...', '..#.#..', '.#...#.', '#..#..#', '.#...#.', '..#.#..', '...#...'],
  ['.......', '##...##', '..#.#..', '...#...', '##...##', '..#.#..', '...#...'],
  ['#..#..#', '.#...#.', '..###..', '#.###.#', '..###..', '.#...#.', '#..#..#'],
  ['....##.', '...##..', '..####.', '.####..', '...##..', '..##...', '.##....'],
];

function m_simbolo(R, cx, cy, k, c, e = 1) {
  const g = M_SIMB[((k % 6) + 6) % 6], x0 = Math.round(cx - 3.5 * e), y0 = Math.round(cy - 3.5 * e);
  g.forEach((f, j) => { for (let i = 0; i < 7; i++) if (f[i] === '#') R.rect(x0 + i * e, y0 + j * e, x0 + i * e + e - 1, y0 + j * e + e - 1, c); });
}

// nieve que cae en [x0, x1] × [y0, y1]: n copos por cada 100 px de ancho, tam 1 (lejos) o 2 (cerca), vel en px/s
function m_nieve(R, t, x0, y0, x1, y1, n, tam = 1, vel = 6) {
  const w = x1 - x0 + 1, hh = y1 - y0 + 1, N = Math.round(n * w / 100);
  for (let k = 0; k < N; k++) { const yy = y0 + ((h(k, tam, 151) * hh + t * vel * (0.8 + h(k, 2, 152) * 0.5)) % hh), xx = x0 + ((h(k, 1, 153) * w + Math.sin(t * 0.9 + k) * 3 + t * 2) % w);
    const X = Math.round(xx), Y = Math.round(yy); R.pset(X, Y, MC.blanco); if (tam > 1) { R.pset(X + 1, Y, hex('#dce6f0')); R.pset(X, Y + 1, hex('#dce6f0')); R.pset(X + 1, Y + 1, hex('#c8d4e2')); } }
}

// la pantalla de un juego inventado dentro de [x0, y0, x1, y1] (recortado a su hueco): k 0 plataformas (el muñequito que
// corre y salta sobre ladrillos, nubes y un tubo), 1 naves (estrellas que caen, la nave que dispara a una fila de bichos),
// 2 béisbol (el campo verde, el lanzador y la pelota), 3 dibujos (un gato que persigue una pelota); las rayas de barrido
function m_juego(R, x0, y0, x1, y1, t, k = 0) {
  const cl = [x0, y0, x1, y1], r = (a, b, c, d, col) => m_rc(R, cl, a, b, c, d, col), w = x1 - x0 + 1, hh = y1 - y0 + 1, P = (x, y, c) => { if (x >= x0 && x <= x1 && y >= y0 && y <= y1) R.pset(x, y, c); };
  if (k === 0) {
    r(x0, y0, x1, y1, hex('#5a8af8')); const gy = y1 - Math.max(2, Math.round(hh * 0.22)), off = Math.floor(t * 10);
    for (let i = 0; i < 3; i++) { const cx = x0 + (((i * 19 - Math.floor(t * 4)) % (w + 10)) + w + 10) % (w + 10) - 5, cy = y0 + 2 + (i % 2) * 3; r(cx, cy, cx + 5, cy + 1, MC.blanco); r(cx + 1, cy - 1, cx + 3, cy - 1, MC.blanco); }
    for (let y = gy; y <= y1; y++) for (let x = x0; x <= x1; x++) P(x, y, ((x + off) % 4 === 0 || (y - gy) % 3 === 0) ? hex('#5a2a10') : hex('#c86a2a'));
    const tx = x0 + ((((40 - off) % (w + 12)) + w + 12) % (w + 12)) - 6; r(tx, gy - 5, tx + 3, gy - 1, hex('#2a9a2a')); r(tx - 1, gy - 6, tx + 4, gy - 5, hex('#5ad85a'));
    const salto = Math.max(0, Math.sin(t * 3.2)) * Math.min(7, hh * 0.35), mx = x0 + Math.round(w * 0.35), my = Math.round(gy - 1 - salto);
    r(mx, my - 3, mx + 2, my, hex('#e83a2a')); P(mx + 1, my - 4, hex('#f0c8a0')); P(mx, my, hex('#3a2a8a')); P(mx + 2, my, hex('#3a2a8a'));
    if (Math.floor(t * 3) % 2) { P(mx + 6, gy - 7, hex('#ffd84a')); P(mx + 6, gy - 8, hex('#ffd84a')); }
  } else if (k === 1) {
    r(x0, y0, x1, y1, hex('#06081a'));
    for (let i = 0; i < 12; i++) P(x0 + Math.floor(h(i, 1, 161) * w), y0 + Math.floor((h(i, 2, 161) * hh + t * (6 + i % 3 * 4)) % hh), i % 3 ? hex('#6a6aa8') : MC.blanco);
    const sx = x0 + Math.round(w / 2 + Math.sin(t * 1.7) * w * 0.3); r(sx - 1, y1 - 2, sx + 1, y1 - 1, hex('#5ad8ff')); P(sx, y1 - 3, MC.blanco);
    const by = y1 - 4 - Math.floor((t * 30) % Math.max(4, hh - 6)); P(sx, by, hex('#ffd84a'));
    for (let i = 0; i < 4; i++) { const bx = x0 + 2 + i * Math.max(3, Math.floor((w - 4) / 4)) + Math.round(Math.sin(t * 1.2) * 2); r(bx, y0 + 2, bx + 1, y0 + 3, i & 1 ? hex('#ff5a8a') : hex('#7aff8a')); }
  } else if (k === 2) {
    r(x0, y0, x1, y1, hex('#3a9a3a')); for (let y = y0; y <= y1; y += 2) r(x0, y, x1, y, hex('#46a846'));
    const mx = x0 + (w >> 1), my = y0 + Math.round(hh * 0.6); for (let i = -4; i <= 4; i++) { P(mx + i, my + Math.abs(i) - 4, hex('#d8b47a')); P(mx + i, my - Math.abs(i) + 4, hex('#d8b47a')); }
    r(mx - 1, my - 1, mx + 1, my + 1, hex('#d8b47a')); P(mx, my - 3, MC.blanco); P(mx, my - 2, hex('#3a3aa8'));
    const u = (t * 0.8) % 1; P(mx, Math.round(my - 2 + u * (y1 - my + 2)), MC.blanco); P(mx, y1 - 1, hex('#c83a3a')); P(mx, y1 - 2, hex('#c83a3a'));
  } else {
    r(x0, y0, x1, y1, hex('#f8d870')); r(x0, y1 - 2, x1, y1, hex('#c8783a'));
    const u = (Math.sin(t * 1.5) + 1) / 2, bx = Math.round(x0 + 3 + u * (w - 8)), gx = Math.round(bx - 5 + Math.sin(t * 6) * 0.6);
    R.disco(bx, y1 - 4, 1, hex('#e83a3a')); r(gx - 2, y1 - 6, gx + 1, y1 - 3, hex('#6a6a7a')); P(gx + 1, y1 - 7, hex('#6a6a7a')); P(gx - 2, y1 - 7, hex('#6a6a7a')); P(gx, y1 - 5, MC.k);
  }
  for (let y = y0 + 1; y <= y1; y += 2) if ((y + Math.floor(t * 20)) % 6 === 0) for (let x = x0; x <= x1; x += 2) P(x, y, m_mezcla(R.pget(x, y), MC.k, 0.25));
  P(x0, y0, MC.blanco); P(x0 + 1, y0, hex('#c8d8f0')); P(x0, y0 + 1, hex('#c8d8f0'));
}

function m_cineFijo(R) {
  const { rect, pset, poligono, linea, disco } = R;
  // la ciudad al fondo: la capa lejana, con ventanas apagadas, y la cercana, con ventanas encendidas; depósito y antena
  for (let x = -6, k = 0; x < 320; k++) { const w = 12 + Math.floor(h(k, 1, 197) * 14); let top = 20 + Math.floor(h(k, 2, 197) * 18); if (x + w > 266) top = Math.max(top, 50);
    rect(x, top, x + w - 1, 74, hex('#2e2a58')); rect(x, top, x + w - 1, top, hex('#443c70'));
    for (let wy = top + 3; wy < 60; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) pset(wx, wy, h(wx, wy, 198) < 0.12 ? hex('#a88a8a') : hex('#36305e'));
    x += w; }
  for (let x = -4, k = 0; x < 320; k++) { const w = 16 + Math.floor(h(k, 3, 197) * 18); let top = 32 + Math.floor(h(k, 4, 197) * 12); if (x + w > 266) top = Math.max(top, 52);
    rect(x, top, x + w - 1, 74, hex('#221e3e')); rect(x, top, x + w - 1, top, hex('#302a52'));
    for (let wy = top + 3; wy < 64; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 4) if (h(wx, wy, 199) < 0.2) pset(wx, wy, h(wx, wy, 200) < 0.5 ? hex('#f0c870') : hex('#a8c8e8'));
    x += w; }
  // el depósito de agua sobre un tejado, con sus patas
  rect(30, 34, 30, 40, hex('#1a1630')); rect(42, 34, 42, 40, hex('#1a1630')); rect(28, 24, 44, 34, hex('#2a2440')); for (let x = 29; x < 44; x += 3) rect(x, 25, x, 33, hex('#221e38')); poligono([[27, 24], [45, 24], [36, 18]], hex('#2a2440')); linea(28, 30, 44, 30, hex('#1a1630'));
  // la antena del edificio alto
  rect(196, 16, 196, 30, hex('#1e1a36')); for (let y = 19; y < 30; y += 3) { pset(195, y, hex('#1e1a36')); pset(197, y, hex('#1e1a36')); }
  // la cafetería de la izquierda: el piso de ladrillo con dos ventanas, la fachada de acero estriado y la cristalera
  m_ladrillo(R, 0, 42, 56, 86, [hex('#4a2a30'), hex('#5a3438'), hex('#3a2026'), hex('#2a1820')], 7);
  rect(0, 42, 56, 44, hex('#6a4a4a')); rect(0, 45, 56, 45, MC.k);
  for (const wx of [6, 32]) { rect(wx, 52, wx + 16, 72, MC.k); rect(wx - 1, 73, wx + 17, 74, hex('#7a5a5a')); rect(wx - 1, 50, wx + 17, 51, hex('#6a4a4a')); }
  rect(7, 53, 21, 71, hex('#f2c878')); rect(7, 53, 10, 71, hex('#b84a4a')); rect(18, 53, 21, 71, hex('#b84a4a')); rect(14, 53, 14, 71, MC.k); rect(7, 62, 21, 62, MC.k);
  rect(33, 53, 47, 71, hex('#232a50')); rect(40, 53, 40, 71, MC.k); rect(33, 62, 47, 62, MC.k);
  rect(0, 86, 56, 96, hex('#8a8e9e')); for (let x = 0; x < 57; x += 2) rect(x, 86, x, 96, hex('#a8acbc')); rect(0, 86, 56, 86, hex('#d8dce8')); rect(0, 96, 56, 96, hex('#5a5e6e'));
  rect(0, 97, 56, 134, MC.k); rect(2, 99, 54, 126, hex('#f0c27a')); rect(2, 99, 54, 101, hex('#f8dca0'));
  for (let x = 4; x < 54; x += 10) { rect(x, 103, x + 6, 106, hex('#e8d0a0')); }   // los carteles de precios, en trazos
  for (let x = 6; x < 54; x += 9) pset(x, 104, hex('#a84a3a'));
  rect(2, 112, 54, 116, hex('#c83a3a')); rect(2, 112, 54, 112, hex('#e86a5a')); rect(2, 117, 54, 126, hex('#8a3a2a')); for (const x of [8, 20, 32, 44]) { rect(x, 117, x, 124, hex('#d8d8e0')); rect(x - 2, 116, x + 2, 117, hex('#c83a3a')); }
  rect(40, 105, 52, 111, hex('#d8e8f0')); rect(40, 105, 52, 105, MC.blanco); for (let i = 0; i < 3; i++) disco(43 + i * 4, 109, 1, [hex('#e8a040'), hex('#c84a6a'), hex('#e8d070')][i]);
  rect(19, 99, 19, 126, hex('#3a2a2a')); rect(37, 99, 37, 126, hex('#3a2a2a'));
  linea(3, 99, 13, 126, hex('#f8e0b0')); linea(4, 99, 14, 126, hex('#f8e0b0'));
  rect(0, 126, 56, 134, hex('#5a5e6e')); for (let x = 0; x < 56; x += 4) pset(x, 128, hex('#8a8e9e'));
  // el cine: el pretil escalonado, el abanico art déco y la fachada estucada con estrías
  rect(56, 30, 264, 58, hex('#c8a07a')); for (let x = 58; x < 264; x += 6) rect(x, 34, x, 58, hex('#b08a64')); for (let x = 60; x < 264; x += 6) rect(x, 34, x, 58, hex('#d8b48a'));
  for (let y = 36; y < 58; y++) for (let x = 56; x <= 264; x++) if (h(x, y, 203) < 0.04) pset(x, y, hex('#a8825e'));
  for (let x = 60; x < 262; x += 8) { R.linea(x, 50, x + 4, 46, hex('#a8825e')); R.linea(x + 4, 46, x + 8, 50, hex('#a8825e')); R.linea(x, 51, x + 4, 47, hex('#e8c8a0')); R.linea(x + 4, 47, x + 8, 51, hex('#e8c8a0')); }
  for (const cx of [96, 200]) { disco(cx, 40, 5, hex('#8a6a4a')); disco(cx, 40, 4, hex('#f0c070')); disco(cx - 1, 39, 2, hex('#fff0c0')); R.linea(cx - 4, 40, cx + 4, 40, hex('#8a6a4a')); R.linea(cx, 36, cx, 44, hex('#8a6a4a')); }
  rect(56, 28, 264, 30, hex('#e8c898')); rect(56, 31, 264, 31, hex('#8a6a4a'));
  for (const [x0, x1, top] of [[56, 90, 24], [230, 264, 24], [120, 200, 22]]) { rect(x0, top, x1, 28, hex('#d8b48a')); rect(x0, top, x1, top, hex('#f0d0a0')); }
  poligono([[140, 22], [180, 22], [160, 14]], hex('#d8b48a')); linea(140, 22, 160, 14, hex('#f0d0a0'));
  for (let k = 0; k < 7; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 7; linea(160, 30, Math.round(160 + Math.cos(a) * 18), Math.round(30 + Math.sin(a) * 7), k & 1 ? hex('#b08a64') : MC.oro); }
  rect(56, 31, 58, 58, hex('#8a6a4a')); rect(262, 31, 264, 58, hex('#8a6a4a'));
  // la marquesina: la caja que vuela sobre la acera con su remate dorado y su panel blanco
  rect(66, 56, 254, 60, MC.oroS); rect(66, 56, 254, 56, MC.oro); for (let x = 68; x < 254; x += 4) { pset(x, 58, MC.oroL); pset(x + 1, 59, MC.oro); }
  rect(64, 60, 256, 84, MC.k); rect(66, 61, 254, 82, hex('#f0e2b8')); rect(66, 61, 254, 62, hex('#fff6d8')); rect(66, 81, 254, 82, hex('#d0bc90'));
  for (let y = 63; y < 81; y++) for (let x = 67; x < 254; x++) if (h(x, y, 204) < 0.03) pset(x, y, hex('#e0d0a4'));
  // el disco del centro: el cielo azul donde va la luna
  disco(160, 71, 15, MC.k); disco(160, 71, 14, MC.oro); disco(160, 71, 13, hex('#1e2a5a')); for (let j = -13; j <= 13; j++) for (let i = -13; i <= 13; i++) if (i * i + j * j < 169 && j > 4 && m_b4(160 + i, 71 + j) < (j - 4) / 10) pset(160 + i, 71 + j, hex('#2a3a72'));
  // los renglones de piezas negras y rojas (sin letras) a los lados
  for (const [x0, x1] of [[74, 142], [178, 246]]) for (const [fy, n] of [[65, 0], [74, 1]]) { let x = x0; for (let w = 0; x < x1 && w < 9; w++) { const L = 3 + Math.floor(h(x0, w + n * 11, 205) * 6); rect(x, fy, Math.min(x + L, x1), fy + 4, n ? hex('#b02a2a') : hex('#1a1a24')); rect(x, fy, Math.min(x + L, x1), fy, n ? hex('#d84a4a') : hex('#3a3a48')); x += L + 3; } }
  // el alero de la marquesina por debajo: el techo oscuro con la luz que cae sobre la fachada
  rect(64, 84, 256, 87, hex('#3a1a24')); for (let x = 68; x < 254; x += 6) pset(x, 85, hex('#ffe8a8'));
  // la fachada de abajo: azulejo granate con bandas, el zócalo de granito
  rect(56, 88, 264, 134, hex('#6a1e2c')); for (let x = 60; x < 264; x += 8) rect(x, 88, x, 124, hex('#5a1824')); for (let y = 92; y < 124; y += 8) rect(56, y, 264, y, hex('#5e1a28'));
  for (let y = 88; y < 98; y++) for (let x = 56; x <= 264; x++) if ((98 - y) / 11 > m_b4(x, y)) pset(x, y, hex('#8a3444'));
  rect(56, 124, 264, 134, hex('#1e1a24')); rect(56, 124, 264, 124, hex('#5a5068')); for (let x = 60; x < 262; x += 18) rect(x, 127, x + 7, 127, hex('#34303e'));
  // las vitrinas de los carteles: la luna con la bicicleta y la de la película de naves (un planeta con anillos)
  for (const [x0, x1] of [[72, 108], [236, 260]]) { rect(x0, 92, x1, 128, MC.k); rect(x0 + 1, 93, x1 - 1, 127, MC.oro); rect(x0 + 2, 94, x1 - 2, 126, MC.oroS); }
  m_degradado(R, 76, 97, 104, 123, ['#0c1030', '#142050', '#1e3072', '#2a3e8a'].map(hex));
  for (let k = 0; k < 9; k++) pset(77 + Math.floor(h(k, 1, 206) * 26), 98 + Math.floor(h(k, 2, 206) * 10), MC.blanco);
  for (let x = 76; x <= 104; x++) { const tp = 117 - Math.round(Math.abs(Math.sin(x * 0.9)) * 5 + h(x, 1, 207) * 2); rect(x, tp, x, 123, hex('#0a0e1e')); }
  rect(78, 120, 102, 121, hex('#c83a3a')); rect(82, 123, 98, 123, hex('#8a8aa8'));
  m_degradado(R, 240, 97, 256, 123, ['#1a0a2a', '#2a1240', '#3a1a50'].map(hex));
  for (let k = 0; k < 7; k++) pset(241 + Math.floor(h(k, 1, 208) * 15), 98 + Math.floor(h(k, 2, 208) * 24), MC.blanco);
  disco(248, 108, 5, hex('#d87a3a')); disco(247, 107, 3, hex('#f0a85a')); for (let i = -9; i <= 9; i++) { const y = 108 + Math.round(i * 0.25); if (Math.abs(i) > 5) pset(248 + i, y, hex('#e8d8a0')); } linea(239, 106, 257, 110, hex('#e8d8a0'));
  rect(242, 119, 254, 120, hex('#5ad8ff')); rect(244, 122, 252, 122, hex('#8a8aa8'));
  // las tres puertas de cristal con el vestíbulo detrás: lámparas, alfombra roja, el mostrador de palomitas
  for (const x of [118, 144, 170]) { rect(x, 92, x + 24, 134, MC.cromoS);
    for (let y = 93; y <= 133; y++) rect(x + 1, y, x + 23, y, y < 112 ? hex('#f8d890') : y < 122 ? hex('#f0c87a') : hex('#a83a3a'));
    rect(x + 1, 122, x + 23, 122, hex('#c84a4a')); disco(x + 12, 96, 2, MC.oroL); rect(x + 5, 95, x + 19, 95, MC.oroS);
    rect(x + 12, 93, x + 12, 133, MC.cromoS); rect(x + 3, 113, x + 10, 114, MC.cromo); rect(x + 14, 113, x + 21, 114, MC.cromo);
    for (const d of [2, 14]) linea(x + d, 106, x + d + 8, 94, hex('#fff2d0')); }
  rect(146, 112, 166, 121, hex('#c8343a')); rect(146, 112, 166, 113, hex('#f0e0b0')); rect(149, 104, 155, 111, hex('#f8f0d8')); rect(149, 104, 155, 104, hex('#c8343a'));
  rect(194, 92, 196, 134, MC.cromoS);
  // la taquilla: el templete cromado con su arco, el cristal, la repisa y el precio
  rect(200, 90, 232, 134, MC.k); rect(201, 91, 231, 133, hex('#c8a040')); rect(203, 96, 229, 118, hex('#f8e8b0')); rect(203, 96, 229, 97, hex('#fff6d8'));
  for (let i = 0; i < 4; i++) rect(205 + i * 6, 99, 208 + i * 6, 100, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#5aa86a')][i]);
  rect(201, 90, 231, 92, hex('#e8c860')); poligono([[204, 90], [228, 90], [216, 84]], hex('#c8a040')); pset(216, 85, MC.oroL);
  rect(203, 118, 229, 120, hex('#8a6a3a')); rect(210, 119, 222, 119, MC.k); rect(201, 121, 231, 133, hex('#5a1a2a')); rect(203, 123, 229, 123, MC.oro);
  // el edificio de la esquina: ladrillo, ventanas, la persiana de la tienda cerrada y la cabina de teléfono
  m_ladrillo(R, 264, 52, 319, 134, [hex('#5a3a3a'), hex('#6a4646'), hex('#462c2e'), hex('#3a2426')], 9);
  rect(264, 52, 319, 54, hex('#7a5a56')); rect(264, 55, 319, 55, MC.k);
  for (const [wx, wy] of [[268, 60], [286, 60], [304, 60], [268, 76], [286, 76], [304, 76]]) { rect(wx, wy, wx + 10, wy + 11, MC.k); rect(wx + 1, wy + 1, wx + 9, wy + 10, h(wx, wy, 209) < 0.5 ? hex('#2a3058') : hex('#e8b870')); rect(wx + 5, wy + 1, wx + 5, wy + 10, MC.k); rect(wx - 1, wy + 12, wx + 11, wy + 12, hex('#8a6a66')); }
  rect(266, 94, 298, 134, hex('#6a6a76')); for (let y = 95; y < 134; y += 2) rect(266, y, 298, y, hex('#5a5a66')); rect(266, 94, 298, 94, hex('#8a8a96')); rect(266, 92, 298, 93, MC.k);
  rect(300, 96, 318, 134, MC.k); rect(301, 97, 317, 134, hex('#4a3020')); rect(303, 99, 315, 112, hex('#e8b870')); rect(309, 99, 309, 112, hex('#4a3020')); pset(304, 122, MC.oro); rect(299, 94, 319, 95, hex('#8a6a66'));
  // la acera: losas con juntas, chicles, grietas y la luz de la marquesina
  rect(0, 134, 319, 150, MC.acera); for (let x = 0; x <= 299; x++) for (let y = 134; y < 141; y++) if (x > 60 && x < 260 && (141 - y) / 8 > m_b4(x, y)) pset(x, y, MC.aceraL);
  for (const [x0, x1] of [[119, 141], [145, 167], [171, 193], [202, 230]]) { poligono([[x0, 135], [x1, 135], [x1 + 6, 147], [x0 - 6, 147]], hex('#7e6a74')); poligono([[x0 + 3, 135], [x1 - 3, 135], [x1 + 1, 141], [x0 - 1, 141]], hex('#94787a')); }
  for (let x = 0; x < 320; x += 22) rect(x, 134, x, 149, hex('#4e4860')); rect(0, 142, 319, 142, hex('#544e66'));
  for (let k = 0; k < 26; k++) pset(Math.floor(h(k, 1, 211) * 300), 135 + Math.floor(h(k, 2, 211) * 14), hex('#3e3a4a'));
  linea(30, 136, 38, 140, hex('#4a4458')); linea(38, 140, 44, 139, hex('#4a4458'));
  // la papelera de rejilla y la boca de riego junto al bordillo
  { const x = 54; rect(x - 5, 133, x + 5, 147, hex('#3a4a3a')); for (let i = x - 4; i <= x + 4; i += 2) rect(i, 134, i, 146, hex('#5a6a5a')); rect(x - 6, 132, x + 6, 133, hex('#6a7a6a')); rect(x - 5, 147, x + 5, 147, MC.k); pset(x - 2, 131, hex('#e8e0c8')); pset(x + 1, 130, hex('#c83a3a')); pset(x + 2, 131, hex('#c83a3a')); }
  { const x = 30; rect(x - 2, 138, x + 2, 148, hex('#c8a018')); rect(x - 4, 141, x + 4, 142, hex('#c8a018')); rect(x - 3, 136, x + 3, 138, hex('#a88010')); rect(x - 2, 138, x - 2, 148, hex('#e8c840')); rect(x - 3, 148, x + 3, 149, hex('#6a5a10')); }
  rect(0, 149, 319, 149, hex('#8a8498')); rect(0, 150, 319, 151, hex('#7a7488')); rect(0, 152, 319, 153, hex('#1e1c28'));
  // la calzada: asfalto con grano, la raya de en medio y la tapa de la alcantarilla
  rect(0, 154, 319, 179, MC.asfalto); for (let k = 0; k < 90; k++) pset(Math.floor(h(k, 1, 212) * 320), 154 + Math.floor(h(k, 2, 212) * 26), MC.asfaltoL);
  for (let x = 4; x < 320; x += 30) rect(x, 168, x + 15, 169, hex('#a89a50'));
  for (let j = -2; j <= 2; j++) for (let i = -8; i <= 8; i++) if ((i / 8) ** 2 + (j / 2.5) ** 2 < 1) pset(96 + i, 173 + j, (i + j) & 1 ? hex('#3a3848') : hex('#4a4858'));
}

function m_cine(R, t, o = {}) {
  const { rect, pset, disco } = R;
  const mask = m_capa(R, 'cine82', () => {
    m_degradado(R, 0, 0, 319, 74, M_NOCHE, (x, y) => (y > 40 ? (y - 40) / 34 * 0.8 : 0), 1.1);
    // la luna menguante
    const mx = 238, my = 14; R.halo(mx, my, 12, [hex('#1e2456'), hex('#2a3066')], 1.0); disco(mx, my, 5, hex('#f4ecd0')); disco(mx + 2, my - 1, 4, hex('#141a44')); pset(mx - 3, my + 2, hex('#d8ccb0'));
  }, () => m_cineFijo(R));
  const cielo = m_enCielo(R, mask);
  // las estrellas que titilan (fuera de la esquina de Atom) y tres nubes a tres velocidades
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 220) * 320), y = Math.floor(h(k, 2, 220) * 40); if (x > 270 && y < 46) continue; const b = Math.sin(t * (1.1 + (k % 4) * 0.6) + k); if (b > -0.3) cielo(x, y, b > 0.6 ? hex('#ece6fa') : hex('#6a6aa8')); }
  const NUB = [[hex('#2e3270'), hex('#262a62'), hex('#3a3a7a'), hex('#5a5a96')], [hex('#262a5e'), hex('#20245a'), hex('#30306c'), hex('#4a4a88')], [hex('#30306a'), hex('#2a2a62'), hex('#3e3a78'), hex('#6a6aa6')]];
  for (const [k, y, w, v] of [[0, 18, 46, 1.2], [1, 30, 60, 2.1], [2, 10, 34, 0.7]]) { const x = ((h(k, 1, 221) * 400 + t * v) % 400) - 40; m_nube(cielo, x, y, w, k + 30, NUB[k]); }
  { const u = (t / 30 + 0.2) % 1, ax = Math.round(250 - u * 270), ay = Math.round(20 + u * 6); cielo(ax, ay, hex('#5a5a7a')); cielo(ax + 1, ay, hex('#5a5a7a')); cielo(ax + 2, ay, Math.floor(t * 1.5) % 2 ? hex('#ff4a4a') : hex('#5a2030')); if (Math.sin(t * 8) > 0.6) cielo(ax - 1, ay, MC.blanco); }
  pset(196, 15, Math.floor(t * 1.2) % 2 ? hex('#ff4a4a') : hex('#5a2030'));
  // ventanas de la ciudad que se encienden y se apagan
  for (let k = 0; k < 10; k++) { const x = 6 + Math.floor(h(k, 1, 222) * 250), y = 40 + Math.floor(h(k, 2, 222) * 6) * 4; if (Math.sin(t * 0.5 + k * 1.9) > 0.3) pset(x, y, hex('#f0c870')); }
  // la cafetería: la tele del piso, la taza de neón que late, el cocinero que va y viene y el vapor del café
  rect(34, 54, 46, 61, Math.sin(t * 6) > 0.2 ? hex('#6a8ad8') : hex('#4a5ab0')); rect(34, 59, 46, 61, hex('#2a2a4a'));
  { const on = Math.sin(t * 2.3) > -0.6 || Math.floor(t * 9) % 2, c = on ? MC.neonR : hex('#6a2a4a'); rect(22, 88, 30, 88, c); rect(22, 88, 22, 94, c); rect(30, 88, 30, 94, c); rect(23, 95, 29, 95, c); rect(31, 90, 33, 90, c); rect(33, 90, 33, 92, c); rect(31, 92, 33, 92, c); if (on) for (let q = 0; q < 2; q++) pset(24 + q * 3, 86 - Math.round((t * 3 + q) % 2), c); }
  { const cx = Math.round(28 + Math.sin(t * 0.7) * 12); m_figura(R, cx, 112, t, 4, { abrigo: MC.blanco, dir: Math.cos(t * 0.7) > 0 ? 1 : -1, anda: true }); rect(cx - 2, 101, cx + 2, 101, MC.blanco); }
  for (const x of [10, 46]) { rect(x - 1, 112, x + 1, 112, MC.blanco); } m_vapor(R, 46, 111, t, 0.3, hex('#fff4e0'), 8);
  // el letrero vertical: bombillas que corren y símbolos (estrella, círculo, rombo) que se encienden de uno en uno
  rect(222, 30, 236, 58, MC.k); rect(223, 31, 235, 57, hex('#5a1424')); rect(227, 26, 231, 30, hex('#4a4a5a'));
  for (let k = 0; k < 3; k++) { const on = Math.floor(t * 2.5) % 4 > k - 1, cy = 36 + k * 8, c = on ? hex('#fff0c0') : hex('#8a5a4a'); if (k === 1) { disco(229, cy, 2, c); pset(229, cy, hex('#5a1424')); } else if (k === 0) { pset(229, cy - 2, c); rect(227, cy - 1, 231, cy - 1, c); rect(228, cy, 230, cy, c); pset(227, cy + 1, c); pset(231, cy + 1, c); } else { pset(229, cy - 2, c); rect(228, cy - 1, 230, cy - 1, c); rect(227, cy, 231, cy, c); rect(228, cy + 1, 230, cy + 1, c); pset(229, cy + 2, c); } }
  for (let y = 32; y < 57; y += 2) { pset(222, y, ((y >> 1) + Math.floor(t * 8)) % 3 === 0 ? MC.oroL : MC.bombOff); pset(236, y, ((y >> 1) + Math.floor(t * 8) + 1) % 3 === 0 ? MC.oroL : MC.bombOff); }
  // la marquesina: bombillas que corren por el borde, la luna con la bicicleta y las bombillas del alero que titilan
  m_bombillas(R, 66, 61, 254, 82, 4, t);
  m_lunaBici(R, 160, 71, 9, t, hex('#fff2a8'));
  for (let x = 68; x < 254; x += 6) if (Math.sin(t * 3 + x) > 0.85) pset(x, 85, MC.blanco);
  // las vitrinas: bombillas alrededor, la luna del cartel con su bici, el planeta que brilla
  m_bombillas(R, 73, 93, 107, 127, 4, t, MC.oroL, MC.bombOff, 4); m_bombillas(R, 237, 93, 259, 127, 4, t + 1, MC.oroL, MC.bombOff, 4);
  m_lunaBici(R, 90, 106, 9, t + 2);
  pset(244, 104, Math.floor(t * 2) % 2 ? hex('#fff0c0') : hex('#f0a85a'));
  // el vestíbulo: alguien que cruza tras las puertas y las palomitas que saltan en la máquina
  for (let i = 0; i < 4; i++) pset(150 + i, 106 + (Math.floor(t * 6 + i) % 4), hex('#fff4c8'));
  R.recorte([119, 93, 193, 133]); { const p = (t % 10) / 10; if (p < 0.6) { const px = Math.round(120 + p / 0.6 * 72); m_figura(R, px, 121, t, 8, { anda: true, dir: 1 }); } } R.recorte(null);
  for (const x of [118, 144, 170]) { rect(x + 12, 93, x + 12, 133, MC.cromoS); rect(x, 92, x, 134, MC.cromoS); rect(x + 24, 92, x + 24, 134, MC.cromoS); }
  // la taquillera, que mira y parpadea, y el precio
  { const mira = Math.sin(t * 0.6) > 0.7 ? -1 : 0; disco(216, 108, 4, hex('#e8c8a0')); rect(212, 103, 220, 106, hex('#5a3418')); pset(212, 107, hex('#5a3418')); pset(220, 107, hex('#5a3418')); if ((t % 3.1) > 0.12) { pset(214 + mira, 108, MC.k); pset(218 + mira, 108, MC.k); } rect(212, 112, 220, 117, hex('#a8283a')); rect(215, 112, 217, 113, MC.blanco); }
  R.numero('$3', 216, 132, { color: MC.oroL, centro: true, sombra: false });
  // la cabina de teléfono de la esquina, con su luz que parpadea y alguien dentro que habla
  { rect(270, 100, 284, 134, MC.k); rect(271, 104, 283, 133, hex('#c8d8c0')); const on = (t % 6) > 0.25; rect(271, 101, 283, 103, on ? hex('#fff0b0') : hex('#8a8a7a')); rect(277, 104, 277, 133, hex('#5a6a5a')); rect(271, 118, 283, 118, hex('#5a6a5a'));
    m_figura(R, 276, 132, t, 1, { brazo: true, dir: 1 }); rect(281, 112, 282, 116, hex('#3a3a3a')); }
  // la cola de gente pequeña junto a la fachada, hacia la taquilla, que da la vuelta por la bocacalle
  if (o.cola !== false) {
    for (let k = 0; k < 4; k++) m_figura(R, 238 + k * 7, 140, t, k + 11, { dir: -1, brazo: k === 3, luz: k < 3 ? hex('#f8d890') : null });
    for (let k = 0; k < 4; k++) m_figura(R, 291 + k * 7, 140, t, k + 15, { dir: -1, brazo: k === 2, chico: k === 1 });
  }
  // la acera: brillos de humedad; la alcantarilla con su vapor
  for (let k = 0; k < 6; k++) { const x = Math.floor(h(k, 1, 223) * 300) + 10, y = 136 + Math.floor(h(k, 2, 223) * 12); if (Math.sin(t * 3 + k * 2) > 0.4) pset(x, y, hex('#f8e0b0')); }
  m_vapor(R, 96, 170, t, 0.4, hex('#8a86a0'), 22); m_vapor(R, 92, 171, t, 2.1, hex('#6e6a86'), 16);
  // los reflejos de las luces en el asfalto, que tiemblan
  for (const [x, c] of [[160, '#f0d890'], [229, '#ffd0c0'], [26, '#ff7ab8'], [216, '#e8c060']]) for (let y = 156; y < 178; y += 3) if (h(x, y, Math.floor(t * 4)) > 0.35) { const ond = Math.round(Math.sin(y * 0.8 + t * 3 + x) * 1.5); rect(x - 2 + ond, y, x + 2 + ond, y, m_mezcla(hex(c), MC.asfalto, 0.35 + (y - 156) / 40)); }
  return { suelo: 148 };
}

function m_taquillaFijo(R) {
  const { rect, pset, disco, poligono, linea } = R;
  // el alero de arriba, oscuro, con los casetones y las bombillas apagadas
  rect(0, 0, 319, 23, hex('#2e1218')); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 20, hex('#3a1820')); rect(0, 10, 319, 10, hex('#3a1820'));
  for (let y = 4; y < 20; y += 8) for (let x = 10; x < 320; x += 12) pset(x, y, hex('#5a3a2a'));
  rect(0, 20, 319, 23, MC.oroS); rect(0, 20, 319, 20, MC.oro);
  // la pared: paneles de laca roja con pilastras doradas estriadas y la cenefa de zigzag
  rect(0, 24, 319, 150, hex('#7a1e2c')); for (let y = 24; y < 150; y++) for (let x = 0; x < 320; x++) if (h(x, y, 230) < 0.03) pset(x, y, hex('#6a1826'));
  for (let y = 28; y < 34; y++) for (let x = 0; x < 320; x++) if (((x + (y - 28) * 2) % 12) < 2 || ((x - (y - 28) * 2 + 120) % 12) < 2) pset(x, y, MC.oroS);
  for (const x of [4, 102, 214, 308]) { rect(x, 34, x + 8, 150, MC.oroS); for (let i = 1; i < 8; i += 2) rect(x + i, 36, x + i, 148, MC.oro); rect(x, 34, x + 8, 35, MC.oroL); rect(x - 1, 146, x + 9, 150, MC.oroS); }
  for (let y = 36; y < 150; y++) for (let x = 0; x < 320; x++) if ((y - 36) < 10 && (10 - (y - 36)) / 14 > m_b4(x, y)) pset(x, y, hex('#9a3040'));
  // la vitrina del cartel grande: el marco dorado, el cielo de noche con estrellas, el bosque y la franja del título
  rect(14, 40, 96, 140, MC.k); rect(15, 41, 95, 139, MC.oro); rect(17, 43, 93, 137, MC.oroS); rect(19, 45, 91, 135, MC.k);
  m_degradado(R, 20, 46, 90, 134, ['#080c26', '#0e1640', '#162258', '#1e2e70', '#283c86', '#36509a'].map(hex));
  for (let k = 0; k < 24; k++) pset(21 + Math.floor(h(k, 1, 231) * 68), 47 + Math.floor(h(k, 2, 231) * 34), k % 4 ? hex('#a8b0e0') : MC.blanco);
  for (let x = 20; x <= 90; x++) { const tp = 112 - Math.round(Math.abs(Math.sin(x * 0.55)) * 9 + h(x, 1, 232) * 3); rect(x, tp, x, 134, hex('#0a0e20')); if (x % 9 === 3) { for (let j = 0; j < 12; j++) { const w = Math.round(j * 0.45); rect(x - w, tp - 12 + j, x + w, tp - 12 + j, hex('#0c1226')); } } }
  for (let x = 20; x <= 90; x++) { const tp = 120 - Math.round(Math.abs(Math.sin(x * 0.3 + 1)) * 5); rect(x, tp, x, 134, hex('#060812')); }
  rect(26, 124, 84, 128, hex('#c83a3a')); rect(26, 124, 84, 124, hex('#e86a5a')); for (let x = 28; x < 84; x += 7) rect(x, 125, x + 4, 127, hex('#8a1a2a')); rect(34, 131, 76, 131, hex('#7a7a98')); rect(40, 133, 70, 133, hex('#5a5a78'));
  // la taquilla: el arco exterior dorado con sus rayos, los montantes y el cristal en arco
  for (let j = -46; j <= 0; j++) for (let i = -46; i <= 46; i++) { const d = Math.hypot(i, j); if (d <= 46) pset(162 + i, 80 + j, d > 44 ? MC.k : d > 41 ? MC.oro : d > 39 ? MC.oroS : hex('#3a1a22')); }
  for (let k = 0; k < 11; k++) { const a = Math.PI + (k + 0.5) * Math.PI / 11; linea(162 + Math.round(Math.cos(a) * 30), 80 + Math.round(Math.sin(a) * 30), 162 + Math.round(Math.cos(a) * 39), 80 + Math.round(Math.sin(a) * 39), k & 1 ? MC.oroS : MC.oro); }
  rect(116, 80, 208, 176, MC.k); rect(117, 80, 207, 176, MC.oro); rect(119, 80, 205, 176, MC.oroS); for (const x of [117, 205]) for (let y = 84; y < 146; y += 4) pset(x + 1, y, MC.oroL);
  // dentro del cristal: la pared de papel rayado, el estante con los rollos de entradas, el reloj y la lámpara
  for (let j = -30; j <= 0; j++) for (let i = -30; i <= 30; i++) if (Math.hypot(i, j) <= 30) pset(162 + i, 86 + j, (162 + i) % 6 < 3 ? hex('#f2dca8') : hex('#e8d098'));
  for (let y = 86; y <= 146; y++) for (let x = 126; x <= 198; x++) pset(x, y, x % 6 < 3 ? hex('#f2dca8') : hex('#e8d098'));
  for (let y = 120; y <= 146; y++) for (let x = 126; x <= 198; x++) if ((y - 120) / 30 > m_b4(x, y)) pset(x, y, hex('#d8b880'));
  rect(128, 104, 196, 106, hex('#8a5a2a')); rect(128, 104, 196, 104, hex('#b07a3a')); rect(128, 107, 196, 107, hex('#5a3a1a'));
  for (const [x, c] of [[134, '#c83a3a'], [142, '#3a6ac8'], [184, '#e8c040'], [192, '#5aa86a']]) { disco(x, 100, 4, MC.k); disco(x, 100, 3, hex(c)); disco(x, 100, 1, m_mezcla(hex(c), MC.blanco, 0.5)); rect(x - 1, 103, x + 1, 103, hex('#f8f0d8')); }
  rect(150, 60, 174, 66, hex('#3a2a1a')); rect(151, 61, 173, 65, hex('#1a1a24'));
  // el calendario colgado con el año en cifras y la foto enmarcada
  rect(130, 112, 144, 128, hex('#8a8a96')); rect(131, 113, 143, 127, MC.blanco); rect(131, 113, 143, 116, hex('#c83a3a')); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(133 + i * 3, 119 + j * 3, hex('#5a5a66')); pset(136, 122, hex('#c83a3a')); pset(137, 111, MC.k);
  rect(180, 86, 194, 98, MC.oroS); rect(181, 87, 193, 97, hex('#5a8ac8')); rect(181, 94, 193, 97, hex('#5aa86a')); R.disco(187, 91, 2, hex('#f8e8a0'));
  // el cristal: el borde del montante y el marco interior
  for (let j = -31; j <= 0; j++) for (let i = -31; i <= 31; i++) { const d = Math.hypot(i, j); if (d > 30 && d <= 31.5) pset(162 + i, 86 + j, MC.oroS); }
  rect(125, 86, 125, 146, MC.oroS); rect(199, 86, 199, 146, MC.oroS);
  // la base de la taquilla: el panel granate con galones dorados y la placa
  rect(119, 151, 205, 176, hex('#5a1a2a')); for (let x = 121; x < 204; x += 8) { linea(x, 160, x + 4, 156, MC.oro); linea(x + 4, 156, x + 8, 160, MC.oro); } rect(121, 164, 203, 164, MC.oroS); rect(121, 151, 203, 152, hex('#3a0e18'));
  // la puerta del vestíbulo a la derecha: el marco cromado y dentro la pared, los carteles y la alfombra
  rect(222, 50, 306, 150, MC.k); rect(223, 51, 305, 150, MC.cromoS);
  for (let y = 53; y <= 150; y++) for (let x = 225; x <= 303; x++) pset(x, y, y < 120 ? (x % 10 < 5 ? hex('#e8c88a') : hex('#e0bc7c')) : hex('#a8343a'));
  for (const [x0, c] of [[232, '#3a4a8a'], [284, '#7a3a8a']]) { rect(x0, 60, x0 + 14, 80, MC.oro); rect(x0 + 1, 61, x0 + 13, 79, hex(c)); disco(x0 + 7, 68, 3, hex('#f0d8a0')); rect(x0 + 2, 75, x0 + 12, 76, hex('#e8e0c0')); }
  for (let x = 225; x <= 303; x++) for (let y = 120; y < 126; y++) if ((126 - y) / 7 > m_b4(x, y)) pset(x, y, hex('#c8484a'));
  // la máquina de palomitas: el carro rojo con su vitrina, la lámpara y el cazo
  rect(246, 92, 274, 124, MC.k); rect(247, 93, 273, 97, hex('#c82a2a')); rect(247, 93, 273, 93, hex('#e85a4a')); rect(247, 98, 273, 118, hex('#fff2c8')); rect(247, 112, 273, 118, hex('#f8e0a0'));
  for (let x = 248; x < 273; x++) for (let y = 110; y < 118; y++) if (h(x, y, 233) < 0.6) pset(x, y, h(x, y, 234) < 0.5 ? hex('#fffbe8') : hex('#f0d890'));
  rect(247, 119, 273, 124, hex('#c82a2a')); rect(259, 98, 260, 104, hex('#8a8a96')); rect(255, 104, 263, 106, hex('#a8a8b4'));
  rect(260, 92, 260, 98, MC.k);
  // el mostrador de golosinas: cristal con cajas de colores y la repisa
  rect(280, 108, 303, 132, MC.k); rect(281, 109, 303, 131, hex('#c8e0e8')); for (let i = 0; i < 6; i++) rect(282 + i * 4, 120, 284 + i * 4, 129, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#2a2a36'), hex('#5aa86a'), hex('#e87a3a')][i]); rect(280, 107, 303, 108, hex('#8a5a2a'));
  // los montantes y los tiradores de la puerta
  rect(263, 51, 265, 150, MC.cromoS); rect(256, 110, 261, 112, MC.cromo); rect(267, 110, 272, 112, MC.cromo);
  // el suelo de terrazo con las tiras de latón y su brillo
  rect(0, 150, 319, 179, hex('#c8b4a0'));
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 235); if (v < 0.12) pset(x, y, hex('#a8907a')); else if (v < 0.17) pset(x, y, hex('#e8d8c8')); else if (v < 0.19) pset(x, y, hex('#7a5a4a')); }
  for (let y = 150; y < 156; y++) for (let x = 0; x < 320; x++) if ((156 - y) / 8 > m_b4(x, y)) pset(x, y, hex('#8a6a5a'));
  for (const y of [158, 170]) rect(0, y, 319, y, MC.oroS); for (let x = 20; x < 320; x += 60) linea(x, 150, x - 14, 179, MC.oroS);
  for (let x = 116; x <= 208; x++) for (let y = 177; y < 180; y++) if (m_b4(x, y) < 0.5) pset(x, y, hex('#a8907a'));
}

function m_taquilla(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  m_capa(R, 'taquilla', null, () => m_taquillaFijo(R));
  // las bombillas del alero que corren (fuera de la barra del año y de la esquina de Atom) y las que titilan
  for (let x = 4, i = 0; x < 272; x += 6, i++) { const on = (i + Math.floor(t * 8)) % 4 === 0; pset(x, 22, on ? MC.oroL : MC.bombOff); if (on) { pset(x - 1, 22, MC.oro); pset(x + 1, 22, MC.oro); pset(x, 23, MC.oro); } }
  for (let y = 4; y < 20; y += 8) for (let x = 178; x < 272; x += 12) if (Math.sin(t * 2 + x * 0.7 + y) > 0.6) pset(x, y, hex('#c89a5a'));
  // el cartel: las bombillas del marco, la luna grande con la bicicleta y una estrella fugaz de vez en cuando
  m_bombillas(R, 15, 41, 95, 139, 5, t, MC.oroL, MC.bombOff, 5);
  m_lunaBici(R, 55, 80, 20, t);
  { const u = (t % 7) / 1.2; if (u < 1) { R.recorte([20, 46, 90, 134]); for (let i = 0; i < 6; i++) pset(Math.round(84 - u * 50 - i), Math.round(52 + u * 12 - i * 0.3), i < 2 ? MC.blanco : hex('#8a90c0')); R.recorte(null); } }
  // dentro de la taquilla: el reloj de la pared con sus agujas, el ventilador que gira y el precio en cifras
  { const cx = 162, cy = 72; disco(cx, cy, 7, MC.k); disco(cx, cy, 6, hex('#f8f4e8')); for (let k = 0; k < 12; k++) pset(Math.round(cx + Math.cos(k * 0.5236) * 5), Math.round(cy + Math.sin(k * 0.5236) * 5), hex('#8a8a96'));
    const am = t * 0.5, ah = t * 0.04 + 2; linea(cx, cy, Math.round(cx + Math.sin(am) * 5), Math.round(cy - Math.cos(am) * 5), MC.k); linea(cx, cy, Math.round(cx + Math.sin(ah) * 3), Math.round(cy - Math.cos(ah) * 3), hex('#c83a3a')); }
  R.numero('$3', 162, 65, { color: MC.oroL, centro: true, sombra: false }); rect(150, 60, 174, 60, hex('#3a2a1a'));
  { const fx = 188, fy = 122; rect(fx - 1, fy + 4, fx + 1, fy + 10, hex('#5a5a66')); rect(fx - 4, fy + 10, fx + 4, fy + 11, hex('#4a4a56')); disco(fx, fy, 5, hex('#7a7a86')); const a = t * 14;
    for (let k = 0; k < 3; k++) { const b = a + k * 2.094; linea(fx, fy, Math.round(fx + Math.cos(b) * 4), Math.round(fy + Math.sin(b) * 4), hex('#c8ccd8')); } disco(fx, fy, 1, hex('#3a3a46')); for (let j = -5; j <= 5; j += 2) for (let i = -5; i <= 5; i += 2) if (i * i + j * j > 16 && i * i + j * j < 30) pset(fx + i, fy + j, hex('#3a3a46')); }
  // la taquillera (una figura del elenco detrás del cristal: asoman la cabeza y los hombros)
  if (o.taquillera !== false && R.actor && ELENCO_CHIBI.cajera) { const def = ELENCO_CHIBI.cajera; R.actor({ ...def, pal: { ...def.pal, C: hex('#a8283a'), W: hex('#a8283a'), c: hex('#f2eee2') } }, 158, 158, t, { dir: 1, sonrisa: true, habla: Math.sin(t * 1.3) > 0.5 }); }
  // la repisa de latón con la ranura y la entrada que sale, la rejilla para hablar y los reflejos del cristal
  rect(119, 146, 205, 150, hex('#c8a040')); rect(119, 146, 205, 146, MC.oroL); rect(119, 150, 205, 150, MC.oroS); rect(146, 148, 178, 149, hex('#5a3a1a')); rect(148, 148, 176, 148, MC.k);
  { const u = o.entrada ?? Math.min(1, Math.max(0, ((t % 6) - 2) / 0.8)); if (u > 0) { const ty = Math.round(148 - 2 + u * 3), tx = 154; rect(tx, ty, tx + 14, ty + 2, hex('#e83a4a')); rect(tx, ty, tx + 14, ty, hex('#ff8a8a')); for (let x = tx + 1; x < tx + 14; x += 3) pset(x, ty + 1, hex('#f8e0b0')); pset(tx + 10, ty + 1, hex('#8a1a2a')); } }
  disco(182, 134, 4, MC.oroS); disco(182, 134, 3, hex('#a8a8b4')); for (let j = -2; j <= 2; j += 2) for (let i = -2; i <= 2; i += 2) pset(182 + i, 134 + j, hex('#3a3a46'));
  R.recorte([126, 56, 198, 146]); for (const [d, w] of [[0, 3], [12, 1]]) for (let k = 0; k < w; k++) linea(128 + d + k, 146, 168 + d + k, 56, (x, y) => (m_b4(x, y) < 0.5 ? hex('#fffaf0') : null)); R.recorte(null);
  // el vestíbulo: palomitas que revientan, el destello de la lámpara y alguien que pasa con su cubo
  for (let i = 0; i < 8; i++) { const u = (t * 1.6 + i * 0.37) % 1, x = Math.round(250 + h(i, 1, 236) * 22), y = Math.round(110 - Math.sin(u * Math.PI) * (6 + h(i, 2, 236) * 8)); pset(x, y, MC.blanco); if (u < 0.15) pset(x + 1, y, hex('#fff4c8')); }
  pset(250, 99, Math.sin(t * 9) > 0 ? MC.blanco : hex('#fff2c8'));
  R.recorte([225, 53, 303, 150]); { const p = (t % 11) / 11; if (p < 0.55) { const px = Math.round(232 + p / 0.55 * 70), py = 126; m_figura(R, px, py, t, 5, { anda: true, dir: 1 }); rect(px + 3, py - 7, px + 5, py - 5, hex('#e83a3a')); pset(px + 4, py - 8, MC.blanco); } } R.recorte(null);
  rect(263, 51, 265, 150, MC.cromoS); for (const d of [228, 270]) linea(d, 106, d + 20, 56, (x, y) => (m_b4(x, y) < 0.35 ? hex('#fff8e0') : null));
  // en el suelo, el brillo de las bombillas que se mueve y alguna palomita
  for (let k = 0; k < 8; k++) { const x = Math.floor(h(k, 1, 237) * 310) + 5, y = 154 + Math.floor(h(k, 2, 237) * 24); if (Math.sin(t * 2.4 + k * 1.3) > 0.5) pset(x, y, MC.blanco); }
  for (const [x, y] of [[60, 166], [238, 172], [252, 160], [98, 175]]) { pset(x, y, MC.blanco); pset(x + 1, y, hex('#f0d890')); }
  { const x = 30, y = 170; rect(x, y, x + 8, y + 2, hex('#c83a4a')); rect(x, y, x + 8, y, hex('#e86a6a')); pset(x + 3, y + 1, hex('#f8e0b0')); }
  return { suelo: 176 };
}

// los postes de latón con el cordón de terciopelo, que cuelga hacia los bordes (por delante de los personajes)
function m_cordon(R, t) {
  const { rect, pset, disco } = R;
  for (const [x, hacia] of [[96, 0], [228, 319]]) {
    const sw = Math.round(Math.sin(t * 1.2 + x) * 1);
    for (let i = 0; i <= Math.abs(hacia - x); i++) { const xx = x + Math.sign(hacia - x) * i, u = i / Math.abs(hacia - x), y = Math.round(150 + Math.sin(u * Math.PI) * 7 + sw * Math.sin(u * Math.PI)); pset(xx, y, hex('#a81a2a')); pset(xx, y + 1, hex('#6a0e1a')); if (i % 9 === 4) pset(xx, y, hex('#d84a5a')); }
    rect(x - 1, 148, x + 1, 176, hex('#c8a040')); rect(x - 1, 148, x - 1, 176, MC.oroL); rect(x + 1, 148, x + 1, 176, MC.oroS); disco(x, 147, 2, hex('#c8a040')); pset(x - 1, 146, MC.oroL);
    rect(x - 5, 175, x + 5, 177, hex('#c8a040')); rect(x - 5, 175, x + 5, 175, MC.oroL); rect(x - 6, 178, x + 6, 178, hex('#7a6a5a'));
  }
}

function m_tokioFijo(R) {
  const { rect, pset, disco, poligono, linea } = R;
  // el techo de placas con puntitos y las vigas
  rect(0, 0, 319, 24, hex('#d8d4c8')); for (let y = 0; y < 24; y++) for (let x = 0; x < 320; x++) { if (x % 32 === 0 || y % 12 === 0) pset(x, y, hex('#c4c0b4')); else if (h(x, y, 240) < 0.06) pset(x, y, hex('#b8b4a8')); }
  rect(0, 24, 319, 25, hex('#a8a498')); rect(0, 26, 319, 26, hex('#8a867a'));
  // el escaparate a la calle (el hueco de x 4–86, y 30–136 lo pinta cada fotograma) con su marco de aluminio
  rect(0, 26, 92, 140, hex('#8a8e9a')); rect(2, 28, 88, 138, hex('#5a5e6a'));
  // la pared del fondo: papel claro con rayas finas y el zócalo
  rect(92, 27, 319, 132, hex('#e8e0cc')); for (let x = 92; x < 320; x += 4) rect(x, 27, x, 132, hex('#e0d8c2')); for (let y = 27; y < 132; y++) for (let x = 92; x < 320; x++) if (h(x, y, 241) < 0.025) pset(x, y, hex('#d4cab4'));
  rect(92, 128, 319, 132, hex('#8a7a5a')); rect(92, 128, 319, 128, hex('#a89870'));
  // los carteles sin letras: el robot, el cohete y la consola
  for (const [x0, fondo] of [[100, '#f8d84a'], [136, '#5ac8f0'], [196, '#f86a8a']]) { rect(x0, 30, x0 + 26, 50, MC.k); rect(x0 + 1, 31, x0 + 25, 49, hex(fondo)); for (let k = 0; k < 6; k++) linea(x0 + 13, 40, x0 + 13 + Math.round(Math.cos(k * 1.05) * 14), 40 + Math.round(Math.sin(k * 1.05) * 10), m_mezcla(hex(fondo), MC.blanco, 0.4)); rect(x0 + 1, 31, x0 + 25, 49, m_mezcla(hex(fondo), MC.blanco, 0)); }
  for (let k = 0; k < 6; k++) linea(113, 40, 113 + Math.round(Math.cos(k * 1.05) * 12), 40 + Math.round(Math.sin(k * 1.05) * 9), hex('#fff0a0'));
  rect(108, 35, 118, 43, hex('#8a9aaa')); rect(110, 37, 111, 38, hex('#ff3a3a')); rect(115, 37, 116, 38, hex('#ff3a3a')); rect(111, 41, 115, 41, MC.k); rect(112, 33, 113, 34, hex('#8a9aaa')); rect(110, 44, 116, 48, hex('#6a7a8a')); rect(106, 44, 107, 47, hex('#6a7a8a')); rect(119, 44, 120, 47, hex('#6a7a8a'));
  poligono([[149, 33], [153, 41], [153, 46], [145, 46], [145, 41]], hex('#f2eee2')); rect(147, 38, 151, 40, hex('#3a6ac8')); poligono([[145, 44], [142, 48], [145, 47]], hex('#c83a3a')); poligono([[153, 44], [156, 48], [153, 47]], hex('#c83a3a')); for (let i = 0; i < 3; i++) pset(148 + i, 47 + (i & 1), hex('#ffb040'));
  for (let k = 0; k < 4; k++) pset(160 + k * 2, 34 + (k * 5) % 12, MC.blanco);
  rect(201, 37, 217, 44, hex('#f2eee2')); rect(201, 42, 217, 44, hex('#a8282e')); rect(204, 38, 208, 39, hex('#a8282e')); for (let k = 0; k < 3; k++) pset(212 + k * 2, 39, hex('#c83a3a'));
  // el mueble de los televisores: madera con vetas, tres baldas, y los marcos de las teles (las pantallas las pinta cada fotograma)
  rect(96, 52, 234, 128, hex('#6a4a2a')); for (let y = 52; y < 128; y++) for (let x = 96; x <= 234; x++) if (h(x >> 3, y, 242) < 0.3 && (x + y) % 5 === 0) pset(x, y, hex('#5a3a20'));
  for (const y of [76, 101, 126]) { rect(96, y, 234, y + 2, hex('#8a6a3a')); rect(96, y, 234, y, hex('#b08a50')); }
  for (let f = 0; f < 3; f++) for (let c = 0; c < 5; c++) { const x0 = 100 + c * 27, y0 = 55 + f * 25; rect(x0, y0, x0 + 24, y0 + 20, hex('#2a2a30')); rect(x0, y0, x0 + 24, y0, hex('#5a5a66')); rect(x0 + 19, y0 + 3, x0 + 22, y0 + 16, hex('#3a3a44')); pset(x0 + 20, y0 + 5, hex('#8a8a96')); pset(x0 + 20, y0 + 8, hex('#8a8a96')); for (let y = y0 + 11; y < y0 + 17; y += 2) rect(x0 + 19, y, x0 + 22, y, hex('#1a1a20')); }
  // los estantes de la derecha: metal con cajas de cartuchos, radiocasetes y calculadoras
  rect(240, 52, 319, 128, hex('#c8c4b8')); for (let x = 240; x < 320; x += 2) rect(x, 52, x, 128, hex('#c0bcb0'));
  for (const y of [76, 101, 126]) { rect(240, y, 319, y + 2, hex('#8a8e9a')); rect(240, y, 319, y, hex('#b8bcc8')); }
  rect(240, 52, 242, 128, hex('#7a7e8a')); rect(317, 52, 319, 128, hex('#7a7e8a'));
  const COL = ['rojo', 'azul', 'verde', 'naranja', 'morado', 'amarillo', 'rosa', 'turquesa'], ICO = ['foso', 'nave', 'flor', 'comecocos'];
  if (PIEZAS_AT.cajaCartucho) for (let i = 0; i < 4; i++) PIEZAS_AT.cajaCartucho(R, 253 + i * 18, 75, { color: COL[i], icono: ICO[i] });
  for (let i = 0; i < 3; i++) { const x0 = 246 + i * 24; rect(x0, 86, x0 + 20, 99, hex('#3a3a44')); rect(x0, 86, x0 + 20, 86, hex('#6a6a76')); disco(x0 + 5, 93, 4, hex('#1a1a20')); disco(x0 + 15, 93, 4, hex('#1a1a20')); disco(x0 + 5, 93, 2, hex('#5a5a66')); disco(x0 + 15, 93, 2, hex('#5a5a66')); rect(x0 + 8, 88, x0 + 12, 90, hex('#8ab8c8')); rect(x0 + 2, 82, x0 + 18, 83, hex('#8a8a96')); pset(x0 + 10, 85, [hex('#c83a3a'), hex('#e8c040'), hex('#3a6ac8')][i]); }
  for (let i = 0; i < 6; i++) { const x0 = 246 + i * 12; rect(x0, 111, x0 + 9, 125, i & 1 ? hex('#3a3a44') : hex('#e8e4d8')); rect(x0 + 1, 112, x0 + 8, 114, hex('#8aa878')); for (let j = 0; j < 3; j++) for (let ii = 0; ii < 3; ii++) pset(x0 + 2 + ii * 2, 117 + j * 2, i & 1 ? hex('#8a8a96') : hex('#5a5a66')); }
  // el pedestal escalonado rojo y blanco con su faldón
  rect(130, 128, 206, 156, MC.k); rect(131, 129, 205, 155, hex('#f2eee2')); for (let x = 131; x <= 205; x++) if (((x - 131) >> 2) & 1) rect(x, 136, x, 155, hex('#c8282e'));
  rect(131, 129, 205, 135, hex('#f8f6ee')); rect(131, 129, 205, 129, MC.blanco); rect(131, 135, 205, 135, hex('#c8c0b0'));
  for (let x = 131; x <= 205; x += 4) pset(x, 156, MC.k);
  rect(126, 156, 210, 158, hex('#8a8476'));
  // el foco del techo
  rect(164, 24, 172, 28, hex('#3a3a44')); rect(166, 29, 170, 30, hex('#fff8d8'));
  // el suelo de linóleo a cuadros en perspectiva, con el brillo de la pared de teles
  for (let y = 132; y < 180; y++) { const p = (y - 128) / 52, tam = 6 + p * 18, off = 160; for (let x = 0; x < 320; x++) { const u = Math.floor((x - off) / tam + 100), v = Math.floor((y - 132) / (3 + p * 6)); pset(x, y, (u + v) & 1 ? hex('#b8b0a0') : hex('#d8d2c4')); } }
  for (let y = 132; y < 150; y++) for (let x = 96; x < 236; x++) if ((150 - y) / 24 > m_b4(x, y)) pset(x, y, hex('#e8eef4'));
  for (let y = 132; y < 136; y++) rect(92, y, 319, y, m_mezcla(hex('#8a7a5a'), hex('#b8b0a0'), (y - 132) / 4));
  // junto al escaparate: cajas de cartón del reparto con su cinta y su pegatina, y una cesta roja de la compra
  for (const [x0, y0, w, hh] of [[6, 144, 26, 18], [10, 130, 20, 14], [34, 150, 16, 12]]) { rect(x0 - 1, y0 - 1, x0 + w + 1, y0 + hh + 1, hex('#5a4020')); rect(x0, y0, x0 + w, y0 + hh, hex('#c8a06a')); rect(x0, y0, x0 + w, y0 + 1, hex('#e0bc84')); rect(x0 + w - 3, y0, x0 + w, y0 + hh, hex('#9a7444')); rect(x0 + (w >> 1) - 1, y0, x0 + (w >> 1) + 1, y0 + hh, hex('#e0d0a8')); rect(x0 + 3, y0 + 5, x0 + 8, y0 + 9, hex('#e8283a')); rect(x0 + 4, y0 + 6, x0 + 7, y0 + 8, MC.blanco); pset(x0 + 5, y0 + 7, hex('#e8283a')); for (let i = 0; i < 3; i++) pset(x0 + 3 + i * 2, y0 + hh - 3, hex('#8a6a3a')); }
  { const x0 = 56, y0 = 154; rect(x0, y0, x0 + 14, y0 + 8, hex('#c8282e')); for (let x = x0 + 1; x < x0 + 14; x += 3) rect(x, y0 + 2, x + 1, y0 + 6, hex('#8a1a1e')); rect(x0, y0, x0 + 14, y0, hex('#e85a5a')); R.linea(x0 + 2, y0, x0 + 4, y0 - 5, hex('#8a1a1e')); R.linea(x0 + 4, y0 - 5, x0 + 10, y0 - 5, hex('#8a1a1e')); R.linea(x0 + 10, y0 - 5, x0 + 12, y0, hex('#8a1a1e')); rect(x0 + 1, y0 + 9, x0 + 14, y0 + 9, hex('#9a9284')); }
}

function m_tokio(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  m_capa(R, 'tokio83', null, () => m_tokioFijo(R));
  // los fluorescentes (uno parpadea) y la guirnalda de banderines que se mece
  for (const [x0, k] of [[30, 0], [110, 1], [196, 2]]) { const on = !(k === 1 && (t % 4.3) < 0.5 && Math.floor(t * 16) % 2); rect(x0, 16, x0 + 44, 19, hex('#a8a498')); rect(x0 + 1, 17, x0 + 43, 18, on ? hex('#fffff4') : hex('#c8c8bc')); }
  for (let i = 0; i < 18; i++) { const x = 96 + i * 10, sw = Math.round(Math.sin(t * 1.6 + i * 0.6) * 1), y = 26 + Math.round(Math.sin(i / 17 * Math.PI) * 3); poligono([[x, y], [x + 7, y], [x + 3 + sw, y + 6]], [hex('#e83a3a'), hex('#f2eee2'), hex('#3a6ac8'), hex('#f8d84a')][i % 4]); }
  linea(96, 26, 272, 26, hex('#5a5a5a'));
  // la calle por el escaparate (recortada a su hueco): la noche, el tren elevado, los neones, la gente y los niños que esperan
  const HU = [4, 30, 86, 136]; R.recorte(HU);
  m_degradado(R, 4, 30, 86, 60, ['#0a0c2a', '#141a44', '#20286a', '#2e3480'].map(hex));
  for (let k = 0; k < 5; k++) { const x0 = 4 + k * 18, top = 34 + Math.floor(h(k, 1, 243) * 14); rect(x0, top, x0 + 16, 120, hex('#1e1a36')); for (let y = top + 3; y < 100; y += 4) for (let x = x0 + 2; x < x0 + 15; x += 3) if (h(x, y, 244) < 0.3) pset(x, y, h(x, y, 245) < 0.5 ? hex('#f0c870') : hex('#a8e8f8')); }
  rect(4, 58, 86, 62, hex('#3a3a48')); rect(4, 58, 86, 58, hex('#5a5a6a')); for (let x = 6; x < 86; x += 14) { rect(x, 63, x + 2, 90, hex('#2a2a38')); }
  { const u = ((t + 3) % 9) / 9, tx = Math.round(-120 + u * 330); for (let c = 0; c < 3; c++) { const x0 = tx + c * 42; for (let x = Math.max(4, x0); x <= Math.min(86, x0 + 39); x++) { rect(x, 48, x, 57, hex('#c8ccd0')); pset(x, 48, hex('#e8eaee')); pset(x, 55, hex('#3a8a5a')); } for (let w = 0; w < 5; w++) for (let x = x0 + 3 + w * 7; x < x0 + 8 + w * 7; x++) if (x >= 4 && x <= 86) rect(x, 50, x, 53, hex('#f8e8a0')); } }
  const NEON = [MC.neonR, MC.neonA, MC.neonM, MC.neonV];
  for (const [nx, k] of [[14, 0], [44, 1], [72, 2]]) { rect(nx, 64, nx + 9, 118, hex('#1a1424')); for (let s = 0; s < 5; s++) { const on = (Math.floor(t * 2 + k) % 6) > s - 1 || (s + k) % 3 === 0, c = on ? NEON[(s + k) % 4] : m_mezcla(NEON[(s + k) % 4], MC.k, 0.7), y0 = 66 + s * 10;
      m_simbolo(R, nx + 4, y0 + 4, s * 2 + k, c); } }
  rect(4, 118, 86, 136, hex('#3a3848')); rect(4, 118, 86, 118, hex('#5a5868')); for (let x = 4; x < 87; x += 8) pset(x, 126, hex('#4a4858'));
  for (let k = 0; k < 2; k++) { const u = ((t * 0.09 + k * 0.5) % 1), px = Math.round(-6 + u * 100); m_figura(R, px, 128, t, k + 2, { anda: true, dir: 1 }); }
  { const u = ((t * 0.16 + 0.3) % 1), bx = Math.round(96 - u * 110); rect(bx - 4, 132, bx + 4, 132, hex('#5a5a66')); disco(bx - 4, 133, 2, MC.k); disco(bx + 4, 133, 2, MC.k); m_figura(R, bx, 129, t, 7, { dir: -1 }); }
  for (let k = 0; k < 3; k++) m_figura(R, 58 + k * 8, 134, t, k + 14, { chico: true, dir: 1 });
  R.recorte(null);
  // el cristal: el montante, los reflejos y la puerta corredera
  rect(44, 28, 46, 138, hex('#8a8e9a')); for (const d of [8, 52]) linea(d, 134, d + 30, 32, (x, y) => (m_b4(x, y) < 0.3 ? hex('#c8d8f0') : null));
  rect(4, 30, 86, 30, hex('#a8acb8'));
  // la pared de televisores: cada pantalla con su programa
  for (let f = 0; f < 3; f++) for (let c = 0; c < 5; c++) { const x0 = 102 + c * 27, y0 = 57 + f * 25, k = (f * 5 + c) % 7, x1 = x0 + 15, y1 = y0 + 16;
    if (k < 4) m_juego(R, x0, y0, x1, y1, t + f * 0.7 + c, k); else if (k === 4) { const fase = Math.floor(t / 2 + c) % 2; for (let i = 0; i < 7; i++) R.rect(x0 + Math.floor(i * 16 / 7), y0, x0 + Math.floor((i + 1) * 16 / 7) - 1, y1, [hex('#f2f2f2'), hex('#f2f240'), hex('#40f2f2'), hex('#40f240'), hex('#f240f2'), hex('#f24040'), hex('#4040f2')][(i + fase) % 7]); }
    else if (k === 5) { R.rect(x0, y0, x1, y1, hex('#1a2a5a')); R.disco(x0 + 8, y0 + 8, 4 + Math.round(Math.sin(t * 2 + c)), hex('#f8d84a')); pset(x0 + 7, y0 + 7, MC.k); pset(x0 + 9, y0 + 7, MC.k); }
    else m_juego(R, x0, y0, x1, y1, t * 1.3 + c, 0); }
  // el pedestal: el haz del foco, la consola japonesa al doble, sus mandos y la tele de muestra en lo alto
  for (let y = 31; y < 128; y++) { const w = 2 + (y - 31) * 0.36; for (let x = Math.round(168 - w); x <= 168 + w; x++) if (m_b4(x, y) < 0.09 + 0.04 * Math.sin(t * 2) + (y > 100 ? 0.08 : 0)) pset(x, y, hex('#fff8e0')); }
  if (PIEZAS_AT.consolaJaponesa) PIEZAS_AT.consolaJaponesa(R, 168, 128, { s: 2 }); else rect(136, 104, 200, 128, hex('#f2eee2'));
  { const g = Math.floor(t * 3) % 6; if (g < 2) { pset(141 + g * 3, 107, MC.blanco); pset(142 + g * 3, 106, MC.blanco); } }
  // en el suelo, el reflejo que tiembla de las teles
  for (let k = 0; k < 7; k++) { const x = 104 + k * 19, y = 140 + (k % 3) * 4; if (Math.sin(t * 2 + k) > 0) rect(x, y, x + 6, y, hex('#f2f6fa')); }
  return { suelo: 160 };
}

// el mostrador de cristal de la tienda de Tokio (por delante del dependiente): la madera, la vitrina con relojes,
// cartuchos y calculadoras, la caja registradora con su cajón y la calculadora
function m_mostradorTokio(R, t) {
  const { rect, pset, disco } = R;
  rect(232, 140, 319, 168, MC.k); rect(233, 141, 319, 143, hex('#8a5a2a')); rect(233, 141, 319, 141, hex('#c8904a'));
  rect(234, 144, 319, 160, hex('#bcd8e0')); rect(234, 144, 319, 144, hex('#e8f4f8'));
  for (let i = 0; i < 6; i++) { const x0 = 238 + i * 13; if (i % 3 === 0) { disco(x0 + 4, 154, 3, hex('#c8c8d4')); disco(x0 + 4, 154, 2, hex('#2a2a36')); pset(x0 + 4, 153, hex('#ff5a5a')); } else if (i % 3 === 1) { rect(x0, 150, x0 + 8, 158, [hex('#d0383a'), hex('#3a6ad8')][i & 1]); rect(x0 + 1, 151, x0 + 7, 153, hex('#1a2440')); } else { rect(x0, 150, x0 + 8, 158, hex('#3a3a44')); rect(x0 + 1, 151, x0 + 7, 152, hex('#8aa878')); } }
  for (let x = 236; x < 319; x += 24) { pset(x, 146, MC.blanco); pset(x + 1, 145, MC.blanco); }
  rect(234, 160, 319, 168, hex('#6a4220')); for (let x = 236; x < 319; x += 6) pset(x, 164, hex('#4a2a14')); rect(232, 140, 233, 168, hex('#4a2a14'));
  // la caja registradora con las teclas, la pantallita en cifras y el cajón
  rect(286, 124, 314, 141, MC.k); rect(287, 125, 313, 140, hex('#8a8e9a')); rect(287, 125, 313, 126, hex('#b8bcc8')); rect(289, 118, 303, 124, MC.k); rect(290, 119, 302, 123, hex('#1a2a1a'));
  R.numero(String(1000 + (Math.floor(t * 0.8) % 9) * 1200), 296, 124, { color: hex('#7aff8a'), centro: true, sombra: false, fina: true });
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) pset(290 + i * 4, 128 + j * 3, [hex('#f2eee2'), hex('#c83a3a'), hex('#f2eee2')][j]);
  rect(287, 137, 313, 140, hex('#6a6e7a'));
  // la calculadora sobre el mostrador
  rect(246, 136, 256, 141, hex('#2a2a30')); rect(247, 137, 255, 138, hex('#8aa878'));
}

function m_tokioEscFijo(R) {
  const { rect, pset, disco, linea } = R;
  // la fachada oscura arriba (tranquila) y el rótulo luminoso con sus símbolos
  rect(0, 0, 319, 40, hex('#1a1824')); for (let y = 0; y < 40; y += 6) rect(0, y, 319, y, hex('#22202e'));
  rect(40, 16, 280, 36, MC.k); rect(42, 18, 278, 34, hex('#f8f4e8')); rect(42, 18, 278, 19, MC.blanco);
  disco(66, 26, 6, hex('#e8283a')); rect(84, 22, 104, 30, hex('#3a6ac8')); rect(86, 24, 102, 28, hex('#8ac8f0'));
  for (let i = 0; i < 5; i++) rect(116 + i * 9, 22, 122 + i * 9, 30, [hex('#e8283a'), hex('#f8a83a'), hex('#e8283a'), hex('#3a6ac8'), hex('#e8283a')][i]);
  rect(176, 22, 196, 30, hex('#f8d84a')); rect(178, 24, 194, 28, hex('#e8283a')); for (let i = 0; i < 4; i++) rect(208 + i * 8, 22, 213 + i * 8, 30, i & 1 ? hex('#1a1a24') : hex('#e8283a'));
  rect(42, 34, 278, 34, hex('#c8c0b0'));
  // los pilares con su azulejo
  for (const [x0, x1] of [[0, 40], [280, 319]]) { rect(x0, 40, x1, 158, hex('#3a3644')); for (let y = 40; y < 158; y += 6) rect(x0, y, x1, y, hex('#2e2a38')); for (let x = x0; x <= x1; x += 8) rect(x, 40, x, 158, hex('#2e2a38')); }
  // el escaparate: el marco de aluminio y, dentro, las gradas blancas
  rect(40, 38, 280, 152, hex('#8a8e9a')); rect(44, 42, 276, 148, hex('#c83a3a'));
  rect(60, 124, 260, 148, hex('#e8e4d8')); rect(60, 124, 260, 125, MC.blanco); rect(84, 108, 236, 124, hex('#f2eee2')); rect(84, 108, 236, 109, MC.blanco); rect(84, 123, 236, 123, hex('#c8c0b0'));
  rect(60, 147, 260, 147, hex('#c8c0b0'));
  // el alféizar, el zócalo de azulejo y la acera mojada
  rect(36, 150, 284, 154, hex('#a8acb8')); rect(36, 150, 284, 150, hex('#d8dce8')); rect(0, 154, 319, 160, hex('#4a4656')); for (let x = 0; x < 320; x += 6) rect(x, 154, x, 160, hex('#3a3646'));
  rect(0, 160, 319, 179, hex('#2a2834')); for (let k = 0; k < 70; k++) pset(Math.floor(h(k, 1, 250) * 320), 160 + Math.floor(h(k, 2, 250) * 20), hex('#34323e'));
  for (let x = 0; x < 320; x += 40) rect(x, 160, x, 179, hex('#22202a')); rect(0, 168, 319, 168, hex('#22202a'));
}

function m_tokioEscaparate(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  m_capa(R, 'tokio83e', null, () => m_tokioEscFijo(R));
  // dentro: el abanico de rayos rojo y blanco que gira (recortado al hueco)
  const HU = [44, 42, 276, 107]; R.recorte(HU);
  { const cx = 160, cy = 108, a0 = t * 0.25; for (let y = 42; y <= 107; y++) for (let x = 44; x <= 276; x++) { const a = Math.atan2(y - cy, x - cx) - a0, s = Math.floor(((a / (Math.PI * 2)) * 24 % 24 + 24) % 24); pset(x, y, s & 1 ? hex('#d8303a') : hex('#f8ece0')); } }
  R.recorte(null);
  // las cajas de cartuchos apiladas a los lados, la tele con el juego, la consola en lo alto y las etiquetas de precio
  const COL = ['rojo', 'azul', 'amarillo', 'verde', 'naranja', 'morado'], ICO = ['nave', 'flor', 'foso', 'comecocos'];
  if (PIEZAS_AT.cajaCartucho) { for (let i = 0; i < 3; i++) PIEZAS_AT.cajaCartucho(R, 76 + i * 18, 147, { color: COL[i], icono: ICO[i % 4] }); for (let i = 0; i < 2; i++) PIEZAS_AT.cajaCartucho(R, 85 + i * 18, 127, { color: COL[i + 3], icono: ICO[(i + 1) % 4] }); PIEZAS_AT.cajaCartucho(R, 94, 107, { color: 'rosa', icono: 'flor' });
    for (let i = 0; i < 2; i++) PIEZAS_AT.cajaCartucho(R, 214 + i * 18, 147, { color: COL[(i + 2) % 6], icono: ICO[(i + 2) % 4] }); }
  if (PIEZAS_AT.teleCRT) PIEZAS_AT.teleCRT(R, 244, 127, { s: 2, t, pantalla: (RR, [a, b, c, d]) => m_juego(RR, a, b, c, d, t, 1) });
  if (PIEZAS_AT.consolaJaponesa) PIEZAS_AT.consolaJaponesa(R, 160, 108, { s: 3 });
  { const g = (t % 3) / 3; if (g < 0.3) { const x = Math.round(120 + g / 0.3 * 80); pset(x, 76, MC.blanco); pset(x + 1, 75, MC.blanco); pset(x - 1, 77, hex('#fff4e0')); } }
  for (const [x, y, n] of [[160, 120, '14800'], [94, 86, '3800'], [232, 140, '4500']]) { const sw = Math.round(Math.sin(t * 1.4 + x) * 1); rect(x - 13 + sw, y - 7, x + 13 + sw, y + 1, MC.blanco); rect(x - 13 + sw, y - 7, x + 13 + sw, y - 7, hex('#e8283a')); linea(x + sw, y - 8, x, y - 12, hex('#8a8a96')); R.numero(n, x + sw, y, { color: hex('#e8283a'), centro: true, sombra: false, fina: true }); }
  // el cristal: los reflejos en diagonal, las luces de los coches que cruzan reflejadas y las gotas que resbalan
  R.recorte([44, 42, 276, 148]);
  for (const [d, w] of [[30, 4], [44, 1], [170, 3], [182, 1]]) for (let k = 0; k < w; k++) linea(44 + d + k, 148, 94 + d + k, 42, (x, y) => (m_b4(x, y) < 0.3 ? hex('#fff4f0') : null));
  { const u = (t % 5) / 5, lx = Math.round(320 - u * 400); for (let x = lx; x < lx + 26; x++) for (let y = 128; y < 134; y++) if (m_b4(x, y) < 0.35 - Math.abs(x - lx - 13) / 50) pset(x, y, hex('#fff2b0')); }
  for (let k = 0; k < 14; k++) { const x = 48 + Math.floor(h(k, 1, 251) * 224), y0 = 44 + Math.floor(h(k, 2, 251) * 60), u = (t * (0.15 + h(k, 3, 251) * 0.2) + h(k, 4, 251)) % 1, y = Math.round(y0 + u * 40); pset(x, y, hex('#e8f0f8')); pset(x, y - 1, hex('#a8b8d0')); if (u > 0.3) pset(x, y - 3, hex('#8a9ab8')); }
  R.recorte(null);
  // los neones verticales de los pilares, que se encienden por tramos
  const NEON = [MC.neonR, MC.neonA, MC.neonM, MC.neonV];
  for (const [nx, k] of [[10, 0], [290, 2]]) { rect(nx - 2, 48, nx + 20, 150, MC.k); rect(nx, 50, nx + 18, 148, hex('#1a1424'));
    for (let s = 0; s < 6; s++) { const on = (Math.floor(t * 2.2 + k) % 8) > s - 1 || (s + k) % 3 === 0, c = on ? NEON[(s + k) % 4] : m_mezcla(NEON[(s + k) % 4], MC.k, 0.72), y0 = 53 + s * 16, cx = nx + 9;
      if (on) R.halo(cx, y0 + 6, 9, [m_mezcla(c, hex('#1a1424'), 0.8), m_mezcla(c, hex('#1a1424'), 0.65)], 0.9);
      m_simbolo(R, cx, y0 + 6, s + k * 3, c, 2); } }
  // el rótulo: las bombillas del borde que corren
  m_bombillas(R, 41, 17, 279, 35, 6, t, hex('#fff8d0'), hex('#8a8a8a'), 5);
  // la acera mojada con los reflejos de los neones y del escaparate, que tiemblan
  for (const [x, c, w] of [[19, MC.neonR, 3], [299, MC.neonM, 3], [100, hex('#f87a7a'), 8], [160, hex('#fff0e0'), 12], [220, hex('#f87a7a'), 8]]) for (let y = 161; y < 179; y += 2) if (h(x, y, Math.floor(t * 5)) > 0.3) { const ond = Math.round(Math.sin(y * 0.9 + t * 3 + x) * 1.5), L = Math.max(1, Math.round(w * (1 - (y - 161) / 30))); rect(x - L + ond, y, x + L + ond, y, m_mezcla(c, hex('#2a2834'), 0.35 + (y - 161) / 36)); }
  for (let k = 0; k < 5; k++) { const u = (t * 0.7 + k * 0.2) % 1, x = Math.floor(h(k, 1, 252) * 300) + 10, y = 164 + Math.floor(h(k, 2, 252) * 12), r = Math.round(u * 4); if (r > 0) { pset(x - r, y, hex('#5a5868')); pset(x + r, y, hex('#5a5868')); } }
  return { suelo: 176 };
}

// una bici aparcada de lado (x el centro, suelo la línea de las ruedas), por delante de los personajes
function m_bici(R, x, suelo) {
  const { pset, linea } = R, c = hex('#2a6ac8'), rueda = (cx) => { for (let a = 0; a < 6.3; a += 0.2) pset(Math.round(cx + Math.cos(a) * 7), Math.round(suelo - 7 + Math.sin(a) * 7), MC.k); pset(cx, suelo - 7, MC.cromo); for (let a = 0; a < 6.3; a += 0.8) linea(cx, suelo - 7, Math.round(cx + Math.cos(a) * 6), Math.round(suelo - 7 + Math.sin(a) * 6), hex('#8a8e9a')); };
  rueda(x - 11); rueda(x + 11);
  linea(x - 11, suelo - 7, x - 2, suelo - 18, c); linea(x - 2, suelo - 18, x, suelo - 7, c); linea(x, suelo - 7, x - 11, suelo - 7, c); linea(x - 2, suelo - 18, x + 9, suelo - 18, c); linea(x + 9, suelo - 18, x + 11, suelo - 7, c); linea(x, suelo - 7, x + 9, suelo - 18, c);
  linea(x - 5, suelo - 21, x, suelo - 21, MC.k); linea(x - 2, suelo - 18, x - 3, suelo - 21, MC.k); linea(x + 9, suelo - 18, x + 8, suelo - 23, MC.cromoS); linea(x + 6, suelo - 23, x + 11, suelo - 23, MC.k);
  R.rect(x + 9, suelo - 22, x + 15, suelo - 19, hex('#8a8e9a')); linea(x + 9, suelo - 19, x + 15, suelo - 19, MC.k);
}

function m_nyFijo(R) {
  const { rect, pset, disco, poligono, linea } = R;
  // la ciudad al fondo entre la bruma, con la torre art déco
  for (let x = -4, k = 0; x < 320; k++) { const w = 12 + Math.floor(h(k, 1, 260) * 16); let top = 26 + Math.floor(h(k, 2, 260) * 20); if (x + w > 266) top = Math.max(top, 52);
    rect(x, top, x + w - 1, 80, hex('#a8b0c0')); for (let wy = top + 3; wy < 76; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) pset(wx, wy, hex('#9aa2b4')); x += w; }
  rect(198, 30, 214, 80, hex('#9aa2b4')); rect(201, 22, 211, 30, hex('#9aa2b4')); rect(203, 16, 209, 22, hex('#9aa2b4')); poligono([[204, 16], [208, 16], [206, 8]], hex('#9aa2b4')); rect(206, 2, 206, 8, hex('#9aa2b4'));
  for (let y = 32; y < 80; y += 3) for (let x = 200; x < 213; x += 3) pset(x, y, hex('#8a92a6'));
  // el edificio de la izquierda: ladrillo, cornisa, ventanas, el depósito de agua y la escalera de incendios nevada
  m_ladrillo(R, 0, 26, 112, 136, [hex('#8a4a36'), hex('#9a5a42'), hex('#6e3a2c'), hex('#5a3028')], 11);
  rect(0, 24, 112, 28, hex('#b8a890')); rect(0, 24, 112, 24, MC.blanco); rect(0, 29, 112, 29, hex('#5a4a3a'));
  rect(2, 20, 2, 24, hex('#3a3030')); rect(16, 20, 16, 24, hex('#3a3030')); rect(0, 12, 18, 20, hex('#6a5040')); for (let x = 1; x < 18; x += 3) rect(x, 13, x, 19, hex('#5a4030')); poligono([[-1, 12], [19, 12], [9, 6]], hex('#5a4a40')); rect(0, 11, 18, 11, MC.blanco); linea(0, 16, 18, 16, hex('#3a3030'));
  for (const wy of [34, 58, 82]) for (const wx of [6, 30, 62, 86]) { rect(wx, wy, wx + 14, wy + 17, hex('#e8e0d0')); rect(wx + 1, wy + 1, wx + 13, wy + 16, hex('#3a4a5a')); rect(wx + 7, wy + 1, wx + 7, wy + 16, hex('#e8e0d0')); rect(wx + 1, wy + 8, wx + 13, wy + 8, hex('#e8e0d0')); rect(wx - 1, wy + 18, wx + 15, wy + 19, hex('#c8c0b0')); rect(wx - 1, wy + 17, wx + 15, wy + 17, MC.blanco); pset(wx + 3, wy + 3, hex('#8ab0d0')); pset(wx + 10, wy + 10, hex('#8ab0d0')); }
  rect(63, 59, 69, 74, hex('#f0c87a')); rect(63, 59, 64, 74, hex('#c8504a')); rect(87, 35, 93, 50, hex('#f0d8a0')); rect(87, 35, 88, 50, hex('#4a7a5a'));
  for (const [y0, y1] of [[52, 56], [76, 80], [100, 104]]) { rect(2, y0, 56, y0, hex('#1e1e24')); for (let x = 2; x <= 56; x += 2) rect(x, y0 - 4, x, y0, hex('#2a2a30')); rect(2, y0 - 4, 56, y0 - 4, hex('#1e1e24')); rect(2, y0 - 5, 56, y0 - 5, MC.blanco); for (let x = 2; x <= 56; x += 3) pset(x, y0 - 6, hex('#e8eef4')); }
  linea(10, 52, 26, 76, hex('#1e1e24')); linea(11, 52, 27, 76, hex('#2a2a30')); linea(48, 76, 32, 100, hex('#1e1e24')); linea(47, 76, 31, 100, hex('#2a2a30')); for (let i = 0; i < 8; i++) { pset(12 + i * 2, 55 + i * 3, hex('#e8eef4')); pset(46 - i * 2, 79 + i * 3, hex('#e8eef4')); }
  // la charcutería de abajo: el toldo verde con nieve, la cristalera con embutidos colgados y la puerta
  rect(0, 106, 112, 108, MC.blanco); poligono([[0, 108], [112, 108], [116, 116], [-4, 116]], hex('#2a6a4a')); for (let x = 0; x < 114; x += 8) rect(x, 109, x + 3, 115, hex('#3a8a5a')); for (let x = -2; x < 116; x += 4) pset(x, 116, hex('#1a4a34'));
  rect(0, 117, 112, 136, hex('#3a2a20')); rect(4, 119, 70, 134, hex('#f0d8a0')); rect(4, 128, 70, 134, hex('#c8a870'));
  for (let i = 0; i < 8; i++) { const x = 8 + i * 8; rect(x, 119, x, 121, hex('#5a3a2a')); rect(x - 1, 122, x + 1, 127 - (i % 3), i & 1 ? hex('#a83a2a') : hex('#c87a4a')); }
  for (let i = 0; i < 5; i++) disco(14 + i * 12, 131, 3, i & 1 ? hex('#e8c860') : hex('#f8f0d8'));
  rect(80, 119, 104, 136, hex('#5a3a2a')); rect(83, 121, 101, 133, hex('#c8a870')); rect(92, 121, 92, 136, hex('#3a2a20')); pset(89, 128, MC.oro); pset(95, 128, MC.oro);
  // la juguetería: ladrillo claro, ventanas en arco con coronas, la cornisa nevada
  m_ladrillo(R, 112, 32, 236, 136, [hex('#c89a6a'), hex('#d8aa7a'), hex('#a87a52'), hex('#8a6448')], 13);
  rect(112, 28, 236, 32, hex('#e8dcc8')); rect(112, 28, 236, 28, MC.blanco); rect(112, 33, 236, 33, hex('#7a6448'));
  for (const wy of [40, 62]) for (const wx of [120, 148, 176, 204]) { rect(wx, wy + 3, wx + 16, wy + 17, hex('#f2ece0')); disco(wx + 8, wy + 4, 8, hex('#f2ece0')); rect(wx + 1, wy + 4, wx + 15, wy + 16, hex('#3a4a5a')); disco(wx + 8, wy + 4, 7, hex('#3a4a5a')); rect(wx, wy + 18, wx + 16, wy + 18, MC.blanco); rect(wx + 8, wy - 3, wx + 8, wy + 16, hex('#f2ece0'));
    for (let a = 0; a < 6.3; a += 0.4) pset(Math.round(wx + 8 + Math.cos(a) * 4), Math.round(wy + 9 + Math.sin(a) * 4), (a * 10 | 0) % 3 ? hex('#2a6a3a') : hex('#3a8a4a')); pset(wx + 8, wy + 13, hex('#c8283a')); pset(wx + 7, wy + 14, hex('#c8283a')); pset(wx + 9, wy + 14, hex('#c8283a')); }
  // el toldo de rayas rojas y blancas con la nieve encima y su faldón ondulado
  rect(112, 80, 236, 83, MC.blanco); for (let x = 112; x <= 236; x++) pset(x, 79, h(x, 1, 261) < 0.5 ? MC.blanco : hex('#d8e2ee'));
  poligono([[112, 83], [236, 83], [240, 92], [108, 92]], hex('#c8283a')); for (let x = 108; x < 240; x += 8) for (let y = 83; y < 92; y++) { const xx = x + Math.round((y - 83) * ((x - 174) / 70)); if (xx >= 108) rect(xx, y, xx + 3, y, hex('#f2ece0')); }
  for (let x = 108; x < 240; x += 4) { rect(x, 92, x + 3, 93, ((x >> 2) & 1) ? hex('#f2ece0') : hex('#c8283a')); pset(x + 1, 94, ((x >> 2) & 1) ? hex('#f2ece0') : hex('#c8283a')); }
  // la fachada del escaparate: madera roja, el escaparate (lo de dentro lo pinta cada fotograma) y la puerta con su corona
  rect(112, 94, 236, 136, hex('#8a1e2a')); rect(112, 94, 236, 95, hex('#a83a44')); rect(116, 128, 206, 136, hex('#6a1620')); rect(116, 128, 206, 128, hex('#a8343e'));
  rect(116, 96, 206, 127, MC.k);
  rect(210, 96, 232, 136, MC.k); rect(211, 97, 231, 136, hex('#5a1620')); rect(213, 99, 229, 118, hex('#e8d8b0')); rect(213, 99, 229, 100, hex('#f8ecd0')); for (let a = 0; a < 6.3; a += 0.35) pset(Math.round(221 + Math.cos(a) * 5), Math.round(108 + Math.sin(a) * 5), (a * 10 | 0) % 3 ? hex('#2a6a3a') : hex('#3a8a4a')); pset(221, 113, hex('#c8283a')); rect(213, 124, 229, 126, MC.oro); rect(228, 120, 229, 121, MC.oro);
  // el edificio de piedra de la derecha
  rect(236, 52, 319, 136, hex('#9a968e')); for (let y = 52; y < 136; y += 6) rect(236, y, 319, y, hex('#86827a')); for (let y = 52; y < 136; y += 6) for (let x = 236 + ((y / 6) & 1) * 9; x < 320; x += 18) rect(x, y, x, y + 5, hex('#86827a'));
  for (let y = 52; y < 136; y++) for (let x = 236; x < 320; x++) if (h(x, y, 262) < 0.04) pset(x, y, hex('#aaa69e'));
  rect(236, 50, 319, 52, hex('#c8c4bc')); rect(236, 49, 319, 49, MC.blanco);
  for (const wx of [244, 270, 296]) for (const wy of [58, 82]) { rect(wx, wy, wx + 14, wy + 17, hex('#5a5650')); rect(wx + 1, wy + 1, wx + 13, wy + 16, hex('#3a4656')); rect(wx + 1, wy + 8, wx + 13, wy + 8, hex('#5a5650')); rect(wx - 1, wy + 18, wx + 15, wy + 18, MC.blanco); pset(wx + 3, wy + 3, hex('#8ab0d0')); }
  rect(271, 83, 283, 90, hex('#f0d8a0'));
  rect(240, 106, 319, 136, hex('#4a4a52')); rect(244, 110, 300, 132, hex('#2a3446')); for (let x = 246; x < 300; x += 10) rect(x, 110, x, 132, hex('#4a4a52')); rect(240, 104, 319, 106, MC.blanco);
  // la acera nevada: la nieve tramada, el camino pisado gris, las pisadas y la nieve al pie de las fachadas
  rect(0, 136, 319, 152, hex('#e8eef4')); for (let y = 136; y < 152; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 263); if (v < 0.12) pset(x, y, hex('#d0dae6')); else if (v > 0.97) pset(x, y, MC.blanco); }
  for (let y = 141; y < 149; y++) for (let x = 0; x < 320; x++) if (m_b4(x, y) < 0.45 + Math.sin(x * 0.05) * 0.2) pset(x, y, hex('#a8b0bc'));
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 264) * 316), y = 140 + Math.floor(h(k, 2, 264) * 10); pset(x, y, hex('#8a92a0')); pset(x + 1, y, hex('#8a92a0')); }
  for (let x = 0; x < 320; x++) { const a = Math.round(2 + Math.sin(x * 0.3) * 1 + h(x, 1, 265) * 1.5); rect(x, 136 - a, x, 136, x % 5 ? hex('#f4f8fc') : hex('#dce6f0')); }
  // el bordillo con la nieve apilada, la calzada con rodadas y el aguanieve, y la tapa de la alcantarilla
  for (let x = 0; x < 320; x++) { const a = Math.round(3 + Math.sin(x * 0.17) * 2 + h(x, 2, 265) * 2); rect(x, 152 - a, x, 154, hex('#eef4f8')); pset(x, 152 - a, MC.blanco); pset(x, 154, hex('#b8c4d0')); }
  rect(0, 155, 319, 179, hex('#5a5e68')); for (let k = 0; k < 120; k++) pset(Math.floor(h(k, 1, 266) * 320), 155 + Math.floor(h(k, 2, 266) * 25), h(k, 3, 266) < 0.5 ? hex('#6a6e78') : hex('#4a4e58'));
  for (const y of [160, 163, 172, 175]) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 267) < 0.7) pset(x, y, hex('#8a909c'));
  for (let x = 0; x < 320; x++) { if (h(x, 1, 268) < 0.5) pset(x, 155, hex('#c8d0dc')); if (h(x, 2, 268) < 0.3) pset(x, 156, hex('#a8b0bc')); }
  for (let j = -2; j <= 2; j++) for (let i = -8; i <= 8; i++) if ((i / 8) ** 2 + (j / 2.5) ** 2 < 1) pset(150 + i, 167 + j, (i + j) & 1 ? hex('#3a3e48') : hex('#4a4e58'));
}

function m_ny(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  const mask = m_capa(R, 'ny85', () => m_degradado(R, 0, 0, 319, 80, M_INVIERNO, null, 0.9), () => m_nyFijo(R));
  const cielo = m_enCielo(R, mask);
  // las nubes de nieve a tres velocidades y tres tonos, y las palomas
  const NUB = [[hex('#9aa6b6'), hex('#8e9aac'), hex('#7e8a9e'), hex('#6e7a90')], [hex('#b8c2ce'), hex('#acb6c4'), hex('#9aa6b6'), hex('#8a96a8')], [hex('#c8d0d8'), hex('#bcc6d0'), hex('#aab4c2'), hex('#98a4b4')]];
  for (const [k, y, w, v] of [[0, 14, 70, 1.4], [1, 26, 54, 2.4], [2, 8, 40, 0.8], [0, 34, 46, 2.0]]) { const x = ((h(k, y, 270) * 420 + t * v) % 420) - 50; m_nube(cielo, x, y, w, k + y, NUB[k]); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.05 + k * 0.13) % 1), bx = Math.round(330 - u * 360) + k * 6, by = Math.round(40 + k * 3 + Math.sin(t * 2 + k) * 2), ala = Math.floor(t * 8 + k) % 2; cielo(bx, by, hex('#4a4e5a')); cielo(bx - 1, by - ala, hex('#4a4e5a')); cielo(bx + 1, by - ala, hex('#4a4e5a')); }
  m_nieve(R, t, 0, 0, 319, 179, 9, 1, 9);
  // ventanas con vida: un gato que mueve la cola, una persona que sacude un trapo, una luz que se enciende
  { const wx = 30, wy = 58; rect(wx + 2, wy + 12, wx + 6, wy + 15, hex('#2a2a2e')); disco(wx + 4, wy + 11, 2, hex('#2a2a2e')); pset(wx + 3, wy + 9, hex('#2a2a2e')); pset(wx + 5, wy + 9, hex('#2a2a2e')); pset(wx + 3, wy + 11, hex('#e8d84a')); const c = Math.round(Math.sin(t * 2.4) * 2); linea(wx + 6, wy + 15, wx + 9, wy + 13 + c, hex('#2a2a2e')); }
  { const p = Math.sin(t * 4) > 0 ? 1 : 0; rect(150, 70, 156, 76, hex('#e8c8a0')); rect(149, 76, 157, 80, hex('#6a3a5a')); rect(157, 75 + p, 165, 76 + p, hex('#f2f2e8')); for (let i = 0; i < 3; i++) pset(166 + i, 74 + p + (i & 1), MC.blanco); }
  if (Math.sin(t * 0.4) > 0) rect(297, 59, 309, 66, hex('#f0d8a0'));
  // el escaparate de la juguetería: el terciopelo, la tele con el juego, las cajas, la consola gris, el sello y las luces
  const HU = [117, 97, 205, 126];
  for (let y = 97; y <= 126; y++) for (let x = 117; x <= 205; x++) pset(x, y, (x % 6 < 2) ? hex('#6a0e1a') : hex('#8a1624'));
  rect(117, 120, 205, 126, hex('#f2ece0')); rect(117, 120, 205, 120, MC.blanco);
  if (PIEZAS_AT.teleCRT) PIEZAS_AT.teleCRT(R, 131, 120, { t, pantalla: (RR, [a, b, c, d]) => m_juego(RR, a, b, c, d, t, 0) });
  if (PIEZAS_AT.cajaCartucho) { PIEZAS_AT.cajaCartucho(R, 190, 120, { color: 'azul', icono: 'nave' }); PIEZAS_AT.cajaCartucho(R, 199, 120, { color: 'rojo', icono: 'flor' }); }
  if (PIEZAS_AT.consolaGris) PIEZAS_AT.consolaGris(R, 162, 120, { encendida: true });
  if (PIEZAS_AT.selloCalidad) PIEZAS_AT.selloCalidad(R, 162, 106, { t });
  for (let x = 118; x < 205; x += 4) { const y = 98 + Math.round(Math.sin((x - 118) / 87 * Math.PI * 2) * 1.5) + 1; const on = ((x >> 2) + Math.floor(t * 3)) % 4; pset(x, y, [hex('#ff4a4a'), hex('#4aff6a'), hex('#ffd84a'), hex('#4a8aff')][(x >> 2) % 4]); if (on === 0) pset(x, y + 1, MC.blanco); }
  R.recorte(HU); for (const d of [10, 60]) linea(117 + d, 126, 137 + d, 97, (x, y) => (m_b4(x, y) < 0.3 ? hex('#f8f4f0') : null)); R.recorte(null);
  rect(116, 96, 206, 96, hex('#3a0e14')); for (let x = 116; x <= 206; x += 3) pset(x, 127, MC.blanco);
  // el carrito de pretzels con su sombrilla, el vendedor y el vapor
  { const cx = 280; rect(cx - 14, 124, cx + 14, 140, hex('#c8ccd4')); rect(cx - 14, 124, cx + 14, 125, MC.blanco); for (let x = cx - 12; x < cx + 14; x += 4) rect(x, 128, x, 138, hex('#a8acb8')); rect(cx - 16, 122, cx + 16, 123, hex('#8a8e9a')); disco(cx - 10, 141, 2, MC.k); disco(cx + 10, 141, 2, MC.k);
    rect(cx, 102, cx, 122, hex('#5a5a66')); for (let i = -14; i <= 14; i++) { const y = 98 + Math.round(Math.abs(i) * 0.3); rect(cx + i, y, cx + i, y + 2, ((i + 14) >> 2) & 1 ? hex('#f2ece0') : hex('#2a6ac8')); pset(cx + i, y - 1, MC.blanco); }
    for (let i = 0; i < 3; i++) { disco(cx - 8 + i * 8, 119, 2, hex('#a8642a')); pset(cx - 8 + i * 8, 119, hex('#e8d0a0')); }
    m_figura(R, cx + 20, 140, t, 6, { dir: -1, gorro: hex('#c83a3a'), nieve: true, brazo: true }); m_vapor(R, cx - 4, 117, t, 0.2, hex('#f4f8fc'), 14); }
  // la chimenea de rayas naranjas y blancas en la calzada, con su vapor
  { const x = 304; for (let y = 156; y < 172; y++) rect(x - 3, y, x + 3, y, ((y >> 2) & 1) ? hex('#f2ece0') : hex('#e8702a')); rect(x - 3, 156, x - 3, 171, hex('#a8501a')); rect(x - 4, 155, x + 4, 155, hex('#c8c8c8')); m_vapor(R, x, 154, t, 0, hex('#f4f8fc'), 26); m_vapor(R, x - 2, 155, t, 1.6, hex('#dce4ec'), 22); }
  m_vapor(R, 150, 166, t, 0.7, hex('#dce4ec'), 16);
  // la gente con abrigos que pasa por la acera, por detrás de los personajes
  for (let k = 0; k < 4; k++) { const dir = k & 1 ? -1 : 1, per = 16 + k * 3, u = ((t + k * 5.3) % per) / per, x = dir > 0 ? -10 + u * 340 : 330 - u * 340; m_figura(R, Math.round(x), 139 + (k & 1), t, k * 3 + 1, { anda: true, dir, nieve: true, gorro: k === 2 ? hex('#3a3a6a') : undefined }); }
  // las palomas del toldo que cabecean
  for (const [x, k] of [[128, 0], [196, 1]]) { const p = Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0; rect(x, 77, x + 4, 79, hex('#7a7e8a')); rect(x + 4 + p, 75 + p, x + 5 + p, 76 + p, hex('#6a6e7a')); pset(x + 5 + p, 75 + p, MC.k); pset(x - 1, 78, hex('#5a5e6a')); pset(x + 3, 80, hex('#e8a040')); }
  return { suelo: 150 };
}

// un montón de nieve en el bordillo (de x0 a x1, base en y), por delante de los personajes
function m_montonNieve(R, x0, x1, y) {
  for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), a = Math.round(Math.sin(u * Math.PI) * 9 + h(x, 1, 271) * 2); for (let yy = y - a; yy <= y + 2; yy++) R.pset(x, yy, yy === y - a ? MC.blanco : (yy - y + a) / (a + 2) > 0.7 ? hex('#c8d4e2') : hex('#e8eef4')); if (h(x, 2, 271) < 0.15) R.pset(x, y - a + 3, hex('#8a92a0')); }
}

// la boca de riego roja con su gorro de nieve (x el centro, y la base)
function m_bocaRiego(R, x, y) {
  const { rect, pset } = R; rect(x - 3, y - 12, x + 3, y, hex('#c8283a')); rect(x - 3, y - 12, x - 2, y, hex('#e85a5a')); rect(x + 2, y - 12, x + 3, y, hex('#8a1a24')); rect(x - 5, y - 8, x + 5, y - 6, hex('#c8283a')); pset(x - 5, y - 7, hex('#8a1a24')); pset(x + 5, y - 7, hex('#8a1a24'));
  rect(x - 4, y - 14, x + 4, y - 12, hex('#a8202e')); rect(x - 4, y - 16, x + 4, y - 14, MC.blanco); rect(x - 2, y - 17, x + 2, y - 17, MC.blanco); rect(x - 4, y, x + 4, y + 1, hex('#8a1a24'));
}

function m_nyEscFijo(R) {
  const { rect, pset, disco, poligono } = R;
  // el ladrillo de alrededor (tranquilo arriba, donde van el año y Atom) y el faldón del toldo
  m_ladrillo(R, 0, 0, 319, 179, [hex('#b08a64'), hex('#b8926c'), hex('#a8825e'), hex('#9a7656')], 17);
  for (let x = 0; x < 320; x += 8) { rect(x, 16, x + 3, 20, hex('#c8283a')); rect(x + 4, 16, x + 7, 20, hex('#f2ece0')); } rect(0, 15, 319, 15, hex('#8a6a50'));
  for (let x = 0; x < 320; x++) { const d = Math.round(2 + Math.sin(x * 0.785) * 2); rect(x, 21, x, 20 + d, ((x >> 3) & 1) ? hex('#f2ece0') : hex('#c8283a')); pset(x, 21 + d, hex('#6a5a4a')); }
  // el marco verde de madera con sus molduras
  rect(18, 26, 302, 156, hex('#1e4a32')); rect(20, 28, 300, 154, hex('#2a6a44')); rect(20, 28, 300, 29, hex('#4a8a5a')); rect(24, 32, 296, 148, hex('#1a3a28'));
  // dentro: el terciopelo rojo con sus pliegues
  for (let y = 34; y <= 146; y++) for (let x = 26; x <= 294; x++) { const f = Math.sin(x * 0.35 + Math.sin(y * 0.05) * 0.5); pset(x, y, f > 0.55 ? hex('#a8202e') : f > -0.3 ? hex('#8a1624') : hex('#6a0e1a')); }
  // las guirnaldas doradas en ondas arriba
  for (let k = 0; k < 4; k++) for (let i = 0; i <= 66; i++) { const x = 28 + k * 67 + i, y = 38 + Math.round(Math.sin(i / 66 * Math.PI) * 8); pset(x, y, MC.oro); pset(x, y + 1, MC.oroS); if (i % 4 === 0) pset(x, y - 1, MC.oroL); }
  // el podio blanco en dos gradas, en el centro, y el pedestal del sello
  rect(98, 120, 222, 146, hex('#e8e2d4')); rect(98, 120, 222, 121, MC.blanco); rect(98, 145, 222, 146, hex('#c8c0b0')); rect(112, 108, 208, 120, hex('#f2ece0')); rect(112, 108, 208, 109, MC.blanco); rect(112, 119, 208, 119, hex('#c8c0b0'));
  for (let x = 100; x < 222; x += 12) rect(x, 124, x, 144, hex('#d8d0c0'));
  // en la grada de abajo: paquetes de regalo con su lazo
  for (const [x0, w, hh, c, l] of [[104, 16, 12, '#2a6ac8', '#f8d84a'], [124, 12, 9, '#3a9a4a', '#e8283a'], [176, 14, 10, '#f8d84a', '#c8283a']]) { rect(x0, 145 - hh, x0 + w, 145, hex(c)); rect(x0 + w - 2, 145 - hh, x0 + w, 145, m_mezcla(hex(c), MC.k, 0.3)); rect(x0 + (w >> 1), 145 - hh, x0 + (w >> 1) + 1, 145, hex(l)); rect(x0, 145 - (hh >> 1), x0 + w, 145 - (hh >> 1), hex(l)); pset(x0 + (w >> 1) - 2, 144 - hh, hex(l)); pset(x0 + (w >> 1) + 3, 144 - hh, hex(l)); pset(x0 + (w >> 1) - 1, 145 - hh, hex(l)); pset(x0 + (w >> 1) + 2, 145 - hh, hex(l)); }
  rect(232, 104, 260, 146, hex('#f2ece0')); rect(232, 104, 260, 105, MC.blanco); rect(258, 104, 260, 146, hex('#c8c0b0'));
  // el alféizar con la nieve amontonada y los carámbanos, y el zócalo de abajo con su rejilla
  rect(14, 156, 306, 162, hex('#8a8a86')); rect(14, 156, 306, 156, hex('#b8b8b4'));
  for (let x = 14; x <= 306; x++) { const a = Math.round(3 + Math.sin(x * 0.11) * 2 + h(x, 1, 280) * 2); rect(x, 155 - a, x, 155, hex('#eef4f8')); pset(x, 155 - a, MC.blanco); if (h(x, 3, 280) < 0.3) pset(x, 155, hex('#c8d4e2')); }
  for (let k = 0; k < 14; k++) { const x = 20 + Math.floor(h(k, 1, 281) * 280), L = 2 + Math.floor(h(k, 2, 281) * 6); for (let j = 0; j < L; j++) { pset(x, 163 + j, j < L - 1 ? hex('#d8e6f2') : MC.blanco); if (j < L / 2) pset(x + 1, 163 + j, hex('#a8c0d8')); } }
  rect(120, 166, 200, 178, hex('#3a3a3e')); for (let x = 122; x < 200; x += 4) rect(x, 167, x + 1, 177, hex('#1a1a1e'));
  for (let x = 0; x < 320; x++) { const a = Math.round(2 + Math.sin(x * 0.2) + h(x, 4, 280) * 2); rect(x, 179 - a, x, 179, hex('#eef4f8')); }
}

function m_nyEscaparate(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  m_capa(R, 'ny85e', null, () => m_nyEscFijo(R));
  // las luces de colores que cuelgan bajo las guirnaldas, que parpadean por turnos
  for (let k = 0; k < 4; k++) for (let i = 2; i <= 64; i += 6) { const x = 28 + k * 67 + i, y = 41 + Math.round(Math.sin(i / 66 * Math.PI) * 8), c = [hex('#ff4a4a'), hex('#4aff6a'), hex('#ffd84a'), hex('#4a8aff')][(i / 6 + k) % 4 | 0], on = ((i / 6 | 0) + k + Math.floor(t * 2.5)) % 3 !== 0;
    pset(x, y, hex('#1a3a1a')); disco(x, y + 2, 1, on ? c : m_mezcla(c, MC.k, 0.55)); if (on) pset(x, y + 1, MC.blanco); }
  // la pirámide de cajas de cartuchos a la izquierda
  const COL = ['rojo', 'azul', 'amarillo', 'verde', 'naranja', 'morado'], ICO = ['nave', 'flor', 'foso', 'comecocos', 'nave', 'flor'];
  if (PIEZAS_AT.cajaCartucho) { for (let i = 0; i < 2; i++) PIEZAS_AT.cajaCartucho(R, 48 + i * 34, 146, { color: COL[i], icono: ICO[i], s: 2 }); PIEZAS_AT.cajaCartucho(R, 65, 106, { color: COL[2], icono: ICO[2], s: 2 }); }
  // el sello dorado al triple sobre su pedestal, con el destello que lo recorre
  if (PIEZAS_AT.selloCalidad) PIEZAS_AT.selloCalidad(R, 246, 104, { s: 3, t });
  { const u = (t % 2.5) / 2.5; if (u < 0.4) { const a = u / 0.4 * Math.PI * 2, x = Math.round(246 + Math.cos(a) * 20), y = Math.round(76 + Math.sin(a) * 20); pset(x, y, MC.blanco); pset(x - 1, y, MC.oroL); pset(x + 1, y, MC.oroL); pset(x, y - 1, MC.oroL); pset(x, y + 1, MC.oroL); } }
  // la consola gris al triple en lo alto del podio, con su luz roja
  if (PIEZAS_AT.consolaGris) PIEZAS_AT.consolaGris(R, 160, 108, { s: 3, encendida: true });
  // la tele pequeña con el juego, sobre la grada de abajo
  if (PIEZAS_AT.teleCRT) PIEZAS_AT.teleCRT(R, 207, 146, { t, pantalla: (RR, [a, b, c, d]) => m_juego(RR, a, b, c, d, t, 0) });
  // el tren de juguete que da vueltas por delante del podio (recortado al cristal)
  R.recorte([24, 32, 296, 148]);
  for (let x = 24; x <= 296; x += 3) { pset(x, 147, hex('#5a4a3a')); } R.linea(24, 146, 296, 146, hex('#8a8e9a'));
  { const u = (t * 0.12) % 1, tx = Math.round(10 + u * 320); for (let c = 0; c < 3; c++) { const x0 = tx - c * 15; for (let x = x0; x < x0 + 13; x++) for (let y = 138; y < 145; y++) pset(x, y, c === 0 ? (y < 140 ? MC.k : hex('#2a2a30')) : [hex('#c8283a'), hex('#2a6ac8')][c - 1]); for (const dx of [2, 10]) { disco(x0 + dx, 145, 1, MC.k); } if (c === 0) { for (let y = 133; y < 138; y++) pset(x0 + 10, y, hex('#2a2a30')); pset(x0 + 12, 141, hex('#fff0a0')); } }
    m_vapor(R, tx + 10, 132, t * 2, 0.5, hex('#e8eef4'), 10); }
  // el cristal: la escarcha de las esquinas, los reflejos en diagonal y el reflejo amarillo de un taxi que pasa
  for (const [cx, cy] of [[24, 32], [296, 32], [24, 148], [296, 148]]) for (let j = -22; j <= 22; j++) for (let i = -22; i <= 22; i++) { const d = Math.hypot(i, j) / 22, x = cx + i, y = cy + j; if (x < 24 || x > 296 || y < 32 || y > 148) continue; if (d < 1 && m_b4(x, y) < (1 - d) * 0.9 && h(x, y, 282) < 0.85) pset(x, y, d < 0.4 ? MC.blanco : hex('#dce8f4')); }
  for (const [d, w] of [[40, 5], [52, 1], [190, 3], [200, 1]]) for (let k = 0; k < w; k++) linea(24 + d + k, 148, 84 + d + k, 32, (x, y) => (m_b4(x, y) < 0.28 ? hex('#fffaf4') : null));
  { const u = (t % 6) / 6, lx = Math.round(340 - u * 420); for (let x = lx; x < lx + 40; x++) for (let y = 124; y < 136; y++) if (m_b4(x, y) < 0.22 - Math.abs(x - lx - 20) / 120) pset(x, y, hex('#f8d84a')); }
  R.recorte(null);
  // la nieve que cae por delante del cristal y los carámbanos que gotean
  m_nieve(R, t, 0, 0, 319, 179, 14, 1, 10);
  for (let k = 0; k < 4; k++) { const x = 20 + Math.floor(h(k * 3, 1, 281) * 280), L = 2 + Math.floor(h(k * 3, 2, 281) * 6), u = (t * 0.6 + k * 0.31) % 1; pset(x, Math.round(163 + L + u * 14), hex('#a8c8e8')); }
  return { suelo: 178 };
}

// fondos fijos: se pintan una vez en un búfer de R.nuevo() y se copian en cada fotograma
const c_CACHE = new WeakMap();

function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); m[clave + ':datos'] = dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]); return m[clave + ':datos'];
}

// umbral del tramado ordenado 4 × 4 (transiciones tramadas limpias)
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_umbral = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla de dos colores del lienzo (0xAABBGGRR) en la proporción a
function c_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// la versión de noche de un color (azulada y oscura, como nocturno() de ov-comun), con memoria
const c_NOCHE = new Map();

function c_oscuro(c) {
  let n = c_NOCHE.get(c); if (n !== undefined) return n;
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  n = (0xff000000 | (Math.min(255, Math.round(b * 0.5 + 40)) << 16) | (Math.min(255, Math.round(g * 0.36 + 20)) << 8) | Math.min(255, Math.round(r * 0.3 + 16))) >>> 0;
  c_NOCHE.set(c, n); return n;
}

const c_igual = (c) => c;

// los colores del desierto
const CD = pal({
  arenaL: '#f0d6a2', arena: '#dcb880', arenaM: '#c8a068', arenaS: '#a8844e', arenaSS: '#7e6038', arenaF: '#c4a888',
  tierraL: '#a8805a', tierra: '#8a6644', tierraS: '#6a4c32', tierraSS: '#46301e', estrato: '#b8946a',
  mat: '#7a8a4a', matL: '#9aa860', matS: '#4e5c30', matSS: '#36401f', yuca: '#6a8a5a', yucaL: '#a0b880', flor: '#f4ecc8',
  sierraL: '#a6a8cc', sierra: '#8a8cb8', sierraS: '#6c6c9a', pino: '#5a6488', loma: '#b08a72', lomaL: '#c8a284', lomaS: '#8a6a5c',
  carton: '#c8a06a', cartonL: '#e0bc84', cartonS: '#8a6a3a', cartonSS: '#5e4628', cinta: '#d8cca0',
  crema: '#ece2c8', cremaS: '#b8ac90', cremaSS: '#857a64', naranja: '#e07a2a', marron: '#7a4a24', cajaR: '#c4502c', cajaRL: '#e2703e', cajaRS: '#8a3420',
  chasis: '#2a2a30', neum: '#1c1c20', neumL: '#3a3a40', llanta: '#b0b0a6', llantaS: '#7a7a72', cromo: '#d8dce0', cromoS: '#8a9098',
  amar: '#e8b830', amarL: '#f8d860', amarS: '#a87c1a', amarSS: '#6e4e10', acero: '#8a8a88', aceroL: '#b8b8b4', aceroS: '#5a5a5a',
  cemento: '#a2a29c', cementoL: '#c4c4bc', cementoS: '#76766e', cementoH: '#dedcd2', vidrio: '#3a5a7a', vidrioL: '#9ac4e0', vidrioS: '#22344a',
  tambor: '#e8e4dc', tamborS: '#a8a49c', tamborR: '#d05a2a', humo: '#8a8478', humoL: '#b4aea0', madera: '#7a4a2a', maderaS: '#4a2a18',
  ladrillo: '#9a4a34', ladrilloL: '#b8624a', ladrilloS: '#6a3024', junta: '#c8b8a0', asfalto: '#3a3a40', asfaltoL: '#4a4a52', acera: '#9a968c', aceraS: '#76736a',
  lona: '#f4f2ea', lonaS: '#d6d2c6', lonaSS: '#b0aca0', lonaA: '#3a6ab8', lonaAS: '#2a4e8a', lonaAL: '#5a8ad0',
  piel: '#f0c090', pielS: '#c88a60', pelo: '#3a2618', blanco: '#ffffff', negro: '#16141a',
  luz: '#ffe8a0', luzL: '#fff8d8', luzN: '#ffb050', neonR: '#ff4a8a', neonRL: '#ffb0d0', neonA: '#4ad8ff', neonAL: '#c0f4ff',
  mesa: '#ecebe4', mesaS: '#c4c2b8', mesaSS: '#8c8a82', hierro: '#3a5a48', hierroL: '#5a7e66', hierroS: '#24382c', papel: '#f0ead8', papelS: '#c8c0a8', tinta: '#2a2a34',
});

// los cielos: [fracción de la altura hasta el horizonte, color] y los tres tonos de sus nubes
const c_CIELOS = {
  dia: [[0, '#3a88d8'], [0.22, '#4aa2e6'], [0.45, '#6ab8ee'], [0.66, '#8ccaf0'], [0.84, '#b0dcf2'], [0.95, '#dcecec']],
  noche: [[0, '#080c26'], [0.3, '#10163a'], [0.6, '#1a2250'], [0.84, '#283064'], [0.95, '#38406e']],
};
for (const k in c_CIELOS) c_CIELOS[k] = c_CIELOS[k].map(([f, c]) => [f, hex(c)]);

const c_NUBES = { dia: ['#a8cce6', '#d8ecf8', '#ffffff'].map(hex), noche: ['#141a40', '#1e2650', '#2a3462'].map(hex) };

// degradado en bandas con la transición tramada entre y0 e y1 (P: [fracción, color])
function c_degradado(R, y0, y1, P) {
  const B = R.buf, alto = y1 - y0, lim = P.map(([f]) => y0 + Math.round(f * alto)), tr = 3;
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    let i = 0; while (i + 1 < P.length && y >= lim[i + 1]) i++;
    let a = P[i][1], b = -1, p = 0;
    if (i + 1 < P.length && y >= lim[i + 1] - tr) { b = P[i + 1][1]; p = (y - lim[i + 1] + tr + 0.5) / (2 * tr); }
    else if (i > 0 && y < lim[i] + tr) { b = a; a = P[i - 1][1]; p = (y - lim[i] + tr + 0.5) / (2 * tr); }
    const f = y * 320; if (b < 0) B.fill(a, f, f + 320); else for (let x = 0; x < 320; x++) B[f + x] = c_umbral(x, y) < p ? b : a;
  }
}

// el fondo de cielo fijo: degradado, halo del sol o luna y Vía Láctea (de noche)
function c_cieloFijo(R, hor, noche, sol = [40, 32, 7]) {
  const B = R.buf; c_degradado(R, 0, hor, noche ? c_CIELOS.noche : c_CIELOS.dia);
  if (noche) {
    for (let k = 0; k < 520; k++) { const u = h(k, 1, 40), x = Math.round(u * 340 - 10), y = Math.round(4 + u * hor * 0.7 + (h(k, 2, 40) - 0.5) * 22); if (y >= 0 && y < hor - 4 && x >= 0 && x < 320 && !(x > 272 && y < 48)) B[y * 320 + x] = c_mezcla(B[y * 320 + x], hex('#6a70a8'), h(k, 3, 40) < 0.3 ? 0.55 : 0.3); }
    const [lx, ly, lr] = [222, 22, 6];
    for (let y = ly - lr - 6; y <= ly + lr + 6; y++) for (let x = lx - lr - 6; x <= lx + lr + 6; x++) { const d = Math.hypot(x - lx, y - ly), d2 = Math.hypot(x - lx - lr * 0.55, y - ly + lr * 0.2);
      if (d <= lr && d2 > lr * 0.85) B[y * 320 + x] = d > lr - 1 || (x + y) % 5 === 0 ? hex('#c8c0a8') : hex('#f4ecd0'); else if (d > lr && d < lr + 6 && c_umbral(x, y) < (lr + 6 - d) / 10) B[y * 320 + x] = c_mezcla(B[y * 320 + x], hex('#f4ecd0'), 0.25); }
  } else {
    const [sx, sy, sr] = sol, R2 = sr + 14;
    for (let y = Math.max(0, sy - R2); y <= sy + R2; y++) for (let x = sx - R2; x <= sx + R2; x++) { const d = Math.hypot(x - sx, y - sy); if (d <= sr || d > R2) continue; const q = 1 - (d - sr) / (R2 - sr); if (c_umbral(x, y) < q * q) B[y * 320 + x] = c_mezcla(B[y * 320 + x], hex('#fff8dc'), 0.45); }
  }
}

// cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) con la base plana; sem cambia la forma
function c_nube(R, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.14 + 0.16 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y + 1), Math.round(r), c[0]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x), Math.round(y), Math.round(r), c[1]);
  for (const [x, y, r] of bolas) R.disco(Math.round(x - 1), Math.round(y - 2), Math.round(r * 0.7), c[2]);
  const y0 = Math.round(cy + w * 0.08); R.linea(Math.round(cx - w * 0.45), y0, Math.round(cx + w * 0.45), y0, c[0]);
}

// lo que se mueve en el cielo, encima del fondo fijo y solo donde aún es cielo (y < cresta[x] − 2): cirros casi quietos,
// cúmulos lejanos lentos y cercanos más rápidos, el disco del sol, cuervos que planean (de día) o estrellas que titilan,
// una fugaz y las luces de un avión (de noche). Respeta la esquina de Atom
function c_cieloVivo(R, t, hor, noche, cresta, sol = [40, 32, 7]) {
  const B = R.buf, atom = (x, y) => x > 272 && y < 48, cielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < (cresta ? cresta[x] - 1 : hor) && !atom(x, y);
  const cn = noche ? c_NUBES.noche : c_NUBES.dia;
  if (noche) {
    for (let k = 0; k < 110; k++) { const x = Math.round(h(k, 1, 301) * 319), y = Math.round(h(k, 2, 301) ** 1.3 * (hor - 6)); if (!cielo(x, y)) continue; const tw = Math.sin(t * (1.4 + h(k, 3, 301) * 2.2) + k * 1.7);
      if (tw > -0.5) B[y * 320 + x] = tw > 0.45 ? CD.blanco : hex('#8a94c0'); if (k % 9 === 0 && tw > 0.7) for (const [i, j] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) if (cielo(x + i, y + j)) B[(y + j) * 320 + x + i] = hex('#8a94c0'); }
    { const kk = Math.floor(t / 6.5), u = (t % 6.5) / 0.6; if (u < 1) { const x0 = 40 + h(kk, 1, 305) * 160, y0 = 8 + h(kk, 2, 305) * 20; for (let i = 0; i < 9; i++) { const x = Math.round(x0 + u * 50 - i * 1.7), y = Math.round(y0 + u * 16 - i * 0.55); if (cielo(x, y)) B[y * 320 + x] = i < 2 ? CD.blanco : hex('#8a94c0'); } } }
    const ax = Math.round(((t * 9 + 60) % 420) - 50), ay = 30 + Math.round(ax * 0.03); if (cielo(ax, ay)) { B[ay * 320 + ax] = Math.floor(t * 2.5) % 2 ? hex('#ff4a3a') : CD.blanco; if (cielo(ax - 2, ay)) B[ay * 320 + ax - 2] = hex('#6a70a8'); }
  }
  // cirros
  for (let k = 0; k < 3; k++) { const w = 40 + Math.round(h(k, 5, 302) * 40), x0 = ((h(k, 6, 302) * 440 + t * (0.8 + k * 0.3)) % 470) - 80, y = 14 + k * 9;
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (!cielo(x, y) || h(i >> 2, k, 303) < 0.25) continue; const e = Math.sin(i / w * Math.PI); B[y * 320 + x] = e > 0.35 ? cn[1] : cn[0]; if (e > 0.6 && i % 4 && cielo(x + 3, y - 1)) B[(y - 1) * 320 + x + 3] = cn[2]; } }
  // cúmulos: tres lejanos y lentos, dos cercanos más grandes y rápidos (por encima de la sierra)
  R.recorte([0, 0, 319, hor - 32]);
  for (let k = 4; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 8 : 14 + ((k * 7) % 9), v = cerca ? 2.6 + k : 1 + k * 0.3, y = cerca ? 34 + k * 5 : 26 + (k - 2) * 5, x = ((h(k, 7, 302) * 470 + t * v) % 500) - 90;
    if (x + w / 2 > 266 && y < 50) continue; c_nube(R, Math.round(x), y, w, k + (noche ? 9 : 0), cn); }
  R.recorte(null);
  if (!noche) {
    const [sx, sy, sr] = sol; R.disco(sx, sy, sr + 1, hex('#fff0b0')); R.disco(sx, sy, sr, hex('#fff6c8')); R.disco(sx - 2, sy - 2, 3, CD.blanco);
    // cuervos que planean en círculos, aleteando de vez en cuando
    for (let k = 0; k < 3; k++) { const a = t * (0.35 + k * 0.08) + k * 2.1, x = Math.round(150 + k * 30 + Math.cos(a) * (22 + k * 6)), y = Math.round(36 + k * 5 + Math.sin(a) * 6), al = Math.sin(t * 9 + k) > 0.3 ? -1 : 0;
      if (!cielo(x, y)) continue; R.pset(x, y, CD.negro); R.pset(x - 1, y + al, CD.negro); R.pset(x + 1, y + al, CD.negro); R.pset(x - 2, y + al * 2 - (al ? 0 : 0), CD.negro); R.pset(x + 2, y + al * 2, CD.negro); }
  }
}

// la sierra de Sacramento: la misma en 1983 y en 2014. La cordillera lejana azulada (con laderas al sol y en sombra,
// barrancos y pinos arriba) y las lomas pardas de delante; devuelve la cresta (y de cada columna) para el cielo
function c_sierra(R, hor, k = c_igual) {
  const B = R.buf, cresta = new Int16Array(320), lomas = new Int16Array(320);
  for (let x = 0; x < 320; x++) {
    const yc = Math.round(hor - 14 - 16 * (0.5 + 0.3 * Math.sin(x * 0.021 + 1.3) + 0.16 * Math.sin(x * 0.057 + 4.1) + 0.08 * Math.sin(x * 0.15 + 0.7)) - (x > 250 ? (x - 250) * 0.12 : 0));
    cresta[x] = Math.max(hor - 34, yc); lomas[x] = Math.round(hor - 6 - 5 * (0.5 + 0.5 * Math.sin(x * 0.043 + 2.2)) - 2 * Math.sin(x * 0.11));
  }
  for (let x = 0; x < 320; x++) {
    const pend = cresta[Math.min(319, x + 2)] - cresta[Math.max(0, x - 2)];   // > 0: la ladera mira a la izquierda, al sol
    for (let y = cresta[x]; y < hor; y++) {
      const prof = (y - cresta[x]) / Math.max(1, hor - cresta[x]), barr = h(Math.round(x / 3 + y * 0.35), 7, 41) < 0.22 && prof > 0.15;
      let c = pend > 0 || (pend === 0 && h(x >> 2, y >> 2, 42) < 0.5) ? CD.sierraL : CD.sierra; if (barr) c = CD.sierraS;
      if (prof > 0.6 && c_umbral(x, y) < (prof - 0.6) * 2) c = c_mezcla(c, CD.arenaF, 0.5);
      if (prof < 0.3 && h(x, y, 43) < 0.18 && y > cresta[x] + 1) c = CD.pino;
      B[y * 320 + x] = k(c);
    }
    if ((x * 7) % 5) B[cresta[x] * 320 + x] = k(CD.sierraL);
  }
  for (let x = 0; x < 320; x++) for (let y = lomas[x]; y < hor + 2; y++) { const c = y === lomas[x] ? CD.lomaL : h(x >> 1, y, 44) < 0.25 ? CD.lomaS : (x + y * 3) % 11 === 0 ? CD.matS : CD.loma; B[y * 320 + x] = k(c); }
  return cresta;
}

// la llanura del desierto entre y0 e y1: arena en bandas por la distancia, granos, piedrecitas y sombras de las matas
function c_llanura(R, y0, y1, k = c_igual) {
  const B = R.buf;
  for (let y = y0; y < y1; y++) { const d = (y - y0) / (y1 - y0);
    for (let x = 0; x < 320; x++) {
      const n = h(x >> 1, y >> 1, 45) * 0.6 + h(x >> 3, y >> 2, 46) * 0.4; let c = d < 0.15 ? (c_umbral(x, y) < d * 6 ? CD.arena : CD.arenaM) : n < 0.25 ? CD.arenaM : n > 0.82 ? CD.arenaL : CD.arena;
      const g = h(x, y, 47); if (g < 0.04) c = CD.arenaS; else if (g > 0.985) c = CD.arenaL;
      if (d > 0.3 && Math.sin(x * 0.09 + y * 0.6 + Math.sin(y * 0.3) * 2) > 0.93) c = CD.arenaM;   // ondas que deja el viento
      B[y * 320 + x] = k(c);
    } }
}

// una mata de gobernadora (creosota) de radio r con su sombra a la derecha
function c_mata(R, x, y, r, k = c_igual, sem = 0) {
  R.poligono([[x - r * 0.4, y], [x + r * 1.8, y], [x + r * 1.5, y + 2], [x - r * 0.2, y + 2]], k(CD.arenaS));
  for (let i = 0; i < 6 + r * 3; i++) { const a = h(i, sem, 48) * Math.PI - Math.PI, l = r * (0.5 + h(i, sem, 49) * 0.6), px = Math.round(x + Math.cos(a) * l), py = Math.round(y + Math.sin(a) * l * 0.9);
    R.linea(x, y, px, py, k(CD.matSS)); R.pset(px, py, k(h(i, sem, 50) < 0.5 ? CD.mat : CD.matL)); R.pset(px + 1, py, k(CD.matS)); }
  R.disco(x, y - r * 0.5, Math.max(1, r * 0.55), k(CD.matS)); R.disco(x - 1, y - r * 0.6, Math.max(1, r * 0.35), k(CD.mat));
}

// una yuca: tronco corto, roseta de hojas en punta y la vara de flores (se mece con el viento)
function c_yuca(R, x, y, t, k = c_igual, a = 1) {
  R.linea(x, y, x, y - 3 * a, k(CD.marron));
  for (let i = -3; i <= 3; i++) { R.linea(x, y - 3 * a, x + i * 2 * a, y - 3 * a - (6 - Math.abs(i)) * a, k(i < 0 ? CD.yucaL : CD.yuca)); }
  const m = Math.round(Math.sin(t * 1.6 + x) * 1.2); R.linea(x, y - 6 * a, x + m, y - 14 * a, k(CD.marron)); for (let j = 0; j < 3; j++) R.pset(x + m + (j % 2 ? 1 : -1), y - 11 * a - j * a, k(CD.flor));
}

// un poste de la luz de madera con su cruceta (los cables los tiende quien llama)
function c_poste(R, x, base, alto, k = c_igual) {
  R.rect(x, base - alto, x + 1, base, k(CD.marron)); R.pset(x, base - alto, k(CD.arenaS)); R.rect(x - 4, base - alto + 2, x + 5, base - alto + 2, k(CD.marron));
  for (const i of [-4, 5]) R.pset(x + i, base - alto + 1, k(CD.cromo));
}

// una rueda de radio r que gira (ang): cubierta con tacos, llanta, tuercas y brillo arriba a la izquierda
function c_rueda(R, cx, cy, r, ang, k = c_igual) {
  R.disco(cx, cy, r, k(CD.neum));
  for (let i = 0; i < 10; i++) { const a = ang + i * Math.PI / 5; R.pset(Math.round(cx + Math.cos(a) * (r - 0.6)), Math.round(cy + Math.sin(a) * (r - 0.6)), k(CD.neumL)); }
  R.disco(cx, cy, r * 0.55, k(CD.llantaS)); R.disco(cx - 0.4, cy - 0.4, r * 0.45, k(CD.llanta)); R.disco(cx, cy, Math.max(1, r * 0.18), k(CD.chasis));
  for (let i = 0; i < 4; i++) { const a = ang + i * Math.PI / 2; R.pset(Math.round(cx + Math.cos(a) * r * 0.32), Math.round(cy + Math.sin(a) * r * 0.32), k(CD.aceroS)); }
  R.pset(Math.round(cx - r * 0.6), Math.round(cy - r * 0.6), k(CD.neumL));
}

// humo que sale de un tubo de escape y se lleva el viento a la derecha
function c_humo(R, x, y, t, k = c_igual, fuerza = 1) {
  for (let i = 0; i < 5; i++) { const u = ((t * 0.9 + i / 5) % 1), px = Math.round(x + u * 16 + Math.sin(t * 2 + i) * 1.5), py = Math.round(y - u * 12), r = 1 + u * 3 * fuerza;
    if (u < 0.85) R.disco(px, py, r, k(u < 0.4 ? CD.humo : hex('#b4aea0'))); }
}

// una caja de cartón de cartuchos (w × hh) con la tapa, la cinta y un lateral en sombra; aplastada: más baja y torcida
function c_caja(R, x, y, w, hh, sem, k = c_igual, aplastada = false) {
  const col = [CD.carton, CD.cartonL, CD.cajaR, CD.carton, CD.crema][sem % 5], colS = sem % 5 === 2 ? CD.cajaRS : CD.cartonS;
  if (aplastada) { const a = (h(sem, 1, 51) - 0.5) * 3; R.poligono([[x, y], [x + w + 2, y + a], [x + w + 1, y - 3 + a], [x + 1, y - 3]], k(colS)); R.linea(x + 1, y - 3, x + w + 1, y - 3 + a, k(col)); R.pset(x + 3, y - 2, k(CD.cinta)); return; }
  R.rect(x, y - hh, x + w, y, k(col)); R.rect(x + w - 2, y - hh, x + w, y, k(colS)); R.rect(x, y - hh, x + w, y - hh, k(sem % 5 === 2 ? CD.cajaRL : CD.cartonL));
  R.rect(x + Math.round(w / 2) - 1, y - hh, x + Math.round(w / 2), y - 1, k(CD.cinta)); R.rect(x, y, x + w, y, k(CD.cartonSS));
  if (w > 7 && sem % 3 === 0) { R.rect(x + 2, y - hh + 3, x + 4, y - hh + 5, k(CD.chasis)); R.pset(x + 3, y - hh + 4, k(CD.amar)); }   // el dibujito de la caja, sin letras
}

// un cartucho pequeño suelto (5 × 6) con su etiqueta de color, tumbado o de pie
function c_cartuchito(R, x, y, sem, k = c_igual, brilla = false) {
  const col = [hex('#d0383a'), hex('#3a6ad8'), hex('#3a9a4a'), hex('#e8803a'), hex('#8a4ab8'), hex('#e8c840')][sem % 6];
  R.rect(x, y - 5, x + 4, y, k(CD.chasis)); R.rect(x + 1, y - 4, x + 3, y - 2, k(col)); R.pset(x + 2, y - 3, k(hex('#1a2440'))); R.pset(x + 4, y - 5, k(CD.neumL));
  if (brilla) { R.pset(x - 1, y - 6, CD.blanco); R.pset(x + 5, y - 7, CD.luzL); }
}

// gente pequeña (8–10 px) de fondo: cabeza, pelo, camiseta del color c, piernas; o.mano: brazo levantado (saluda o
// graba con el móvil); o.anda; o.gorra; se balancea un poco con t
function c_persona(R, x, s, t, c, sem, k = c_igual, o = {}) {
  const b = Math.sin(t * 3 + sem) > 0.6 ? -1 : 0, pie = o.anda ? Math.floor(t * 6 + sem) % 2 : 0, piel = [CD.piel, hex('#d8a070'), hex('#a86a44'), hex('#f4d0a8')][sem % 4], pelo = [CD.pelo, hex('#6a4020'), hex('#c8a060'), hex('#1a1414')][(sem >> 2) % 4];
  const y = s + b; R.rect(x - 1, y - 3, x - 1, y, k(CD.tinta)); R.rect(x + 1, y - 3 + pie, x + 1, y, k(CD.tinta)); R.pset(x + 1, y, k(CD.negro)); R.pset(x - 1, y, k(CD.negro));
  R.rect(x - 2, y - 7, x + 2, y - 4, k(c)); R.pset(x + 2, y - 4, k(c_mezcla(c, CD.negro, 0.35)));
  R.rect(x - 1, y - 10, x + 1, y - 8, k(piel)); R.rect(x - 1, y - 10, x + 1, y - 10, k(pelo)); if (o.gorra) { R.rect(x - 1, y - 11, x + 2, y - 10, k(o.gorra)); }
  if (o.mano) { const m = Math.sin(t * 6 + sem) > 0 ? 1 : 0; R.linea(x + 2, y - 7, x + 3 + m, y - 11, k(piel)); if (o.movil) R.rect(x + 3, y - 13, x + 4, y - 12, k(CD.chasis)); }
}

// x0: el extremo trasero de la caja; s: el suelo bajo las ruedas; vuelco 0–1: lo que se levanta la caja; gira: el ángulo
// de las ruedas; chorro 0–1: cuántas cajas caen; o.noche: faros encendidos
function c_volquete(R, x0, s, t, k, vuelco, gira, chorro, o = {}) {
  const a = vuelco * 0.62, ca = Math.cos(a), sa = Math.sin(a), Hx = x0 + 3, Hy = s - 13;
  const P = (u, v) => [Hx + u * ca - v * sa, Hy - (u * sa + v * ca)];
  // el chasis y el depósito
  R.rect(x0 + 2, s - 13, x0 + 92, s - 10, k(CD.chasis)); R.rect(x0 + 64, s - 13, x0 + 76, s - 8, k(CD.aceroS)); R.rect(x0 + 64, s - 12, x0 + 76, s - 12, k(CD.aceroL)); R.pset(x0 + 70, s - 10, k(CD.chasis));
  // el cilindro hidráulico de la caja
  const [cx1, cy1] = P(40, 0); R.linea(x0 + 46, s - 12, cx1, cy1, k(CD.cromo)); R.linea(x0 + 47, s - 12, cx1 + 1, cy1, k(CD.cromoS));
  // la carga: las cajas que asoman por encima de la caja (giran con ella)
  if (chorro < 0.95) for (let i = 0; i < 9; i++) { if (vuelco > 0.25 && i < Math.round(chorro * 9)) continue; const u = 3 + i * 6, hv = 3 + (i * 5) % 4, [p0x, p0y] = P(u, 23), [p1x, p1y] = P(u + 5, 23), [p2x, p2y] = P(u + 5, 23 + hv), [p3x, p3y] = P(u, 23 + hv);
    R.poligono([[p0x, p0y], [p1x, p1y], [p2x, p2y], [p3x, p3y]], k(i % 3 === 1 ? CD.cajaR : i % 2 ? CD.cartonL : CD.carton)); R.linea(p3x, p3y, p2x, p2y, k(CD.cartonL)); }
  // la caja basculante, con nervios verticales, el borde de arriba claro y el de abajo en sombra
  R.poligono([P(0, 0), P(58, 0), P(58, 24), P(0, 24)], (x, y) => { const dx = x + 0.5 - Hx, dy = Hy - (y + 0.5), u = dx * ca + dy * sa, v = -dx * sa + dy * ca;
    if (v > 21.5) return k(CD.cajaRL); if (v < 2) return k(CD.cajaRS); if (u % 8 < 1.3 && u > 3) return k(CD.cajaRS); if (u % 8 < 2.2 && u > 3) return k(CD.cajaRL); return k(h(Math.round(u), Math.round(v), 52) < 0.06 ? CD.cajaRS : CD.cajaR); });
  R.linea(...P(57, 0), ...P(57, 25), k(CD.cajaRS)); R.linea(...P(0, 24), ...P(58, 24), k(CD.negro)); R.linea(...P(56, 24), ...P(62, 30), k(CD.cajaRS));   // la visera sobre la cabina
  R.linea(...P(56, 25), ...P(62, 31), k(CD.cajaR));
  // el portón de atrás: cerrado, o colgando de arriba cuando la caja se levanta
  const [gx, gy] = P(0, 24); if (vuelco > 0.12) { R.rect(Math.round(gx) - 2, Math.round(gy), Math.round(gx), Math.round(gy) + 21, k(CD.cajaRS)); R.pset(Math.round(gx) - 1, Math.round(gy), k(CD.cromo)); } else R.linea(gx, gy, ...P(0, 0), k(CD.cajaRS));
  // de noche: el foco de trabajo de atrás del chasis (encendido mientras bascula) y su charco de luz sobre la fosa
  if (o.noche && (vuelco > 0.05 || chorro > 0)) { c_charcoLuz(R, Hx - 20, Hy + 14, 50, 24, 0.5); const bri = 0.85 + Math.sin(t * 23) * 0.15;
    for (let j = 0; j < 14; j++) { const f = j / 13, y = Math.round(s - 12 + f * 8); for (let x = Math.round(x0 - f * 16); x <= x0; x++) if (c_umbral(x, y) < 0.35 * (1 - f)) R.pset(x, y, c_mezcla(R.pget(x, y), CD.luzL, 0.5 * bri)); }
    R.rect(x0 + 1, s - 16, x0 + 5, s - 13, CD.chasis); R.rect(x0 + 1, s - 15, x0 + 2, s - 14, CD.luzL); R.pset(x0 + 3, s - 15, CD.luz); }
  // las cajas que caen a la fosa por detrás, a chorro: cajas de cartón con su contorno oscuro, la tapa clara, la cinta y
  // el canto en sombra (de noche, encendidas por el foco); dan vueltas al caer
  if (vuelco > 0.3 && chorro > 0 && chorro < 1) { const kc = o.noche ? c_lucido : k;
    for (let i = 0; i < 7; i++) { const u = (t * 1.3 + i / 7) % 1, bx = Math.round(Hx - 4 - u * 20 - (i % 3) * 3), by = Math.round(Hy - 8 + u * u * 34), gi = Math.floor(u * 4 + i) % 2;
      const col = [CD.carton, CD.cajaR, CD.cartonL, CD.crema][i % 4], colS = i % 4 === 1 ? CD.cajaRS : CD.cartonS, colL = i % 4 === 1 ? CD.cajaRL : CD.cartonL, w = gi ? 3 : 4, hh = gi ? 4 : 3;
      R.rect(bx - w - 1, by - hh - 1, bx + w + 1, by + hh, CD.negro); R.rect(bx - w, by - hh, bx + w, by + hh - 1, kc(col)); R.rect(bx - w, by - hh, bx + w, by - hh, kc(o.noche ? CD.blanco : colL));
      R.rect(bx + w - 1, by - hh + 1, bx + w, by + hh - 1, kc(colS)); R.rect(bx - 1 + gi, by - hh, bx + gi, by + hh - 1, kc(CD.cinta)); if (i % 3 === 0) { R.rect(bx - w + 1, by, bx - w + 2, by + 1, kc(CD.chasis)); R.pset(bx - w + 1, by, kc(CD.amar)); }
      if (i % 2) c_cartuchito(R, bx - 9, by + 4, i, kc); } }
  // la cabina crema con la franja naranja y marrón, el capó, la parrilla y el parachoques
  R.rect(x0 + 62, s - 40, x0 + 85, s - 13, k(CD.crema)); R.rect(x0 + 62, s - 40, x0 + 63, s - 13, k(CD.cremaS)); R.rect(x0 + 62, s - 40, x0 + 85, s - 40, k(CD.cremaSS));
  R.rect(x0 + 84, s - 28, x0 + 96, s - 13, k(CD.crema)); R.rect(x0 + 84, s - 28, x0 + 96, s - 28, k(CD.blanco)); R.rect(x0 + 84, s - 16, x0 + 96, s - 13, k(CD.cremaS));
  for (let x = x0 + 64; x <= x0 + 96; x++) { R.pset(x, s - 22, k(CD.naranja)); R.pset(x, s - 21, k(CD.naranja)); R.pset(x, s - 20, k(CD.marron)); }
  R.rect(x0 + 95, s - 27, x0 + 97, s - 15, k(CD.cromoS)); for (let y = s - 26; y < s - 15; y += 2) R.pset(x0 + 96, y, k(CD.cromo));
  R.rect(x0 + 93, s - 13, x0 + 98, s - 11, k(CD.cromo)); R.rect(x0 + 93, s - 11, x0 + 98, s - 11, k(CD.cromoS));
  R.rect(x0 + 95, s - 25, x0 + 97, s - 23, k(o.noche ? CD.luzL : CD.luz));
  // la ventanilla con su reflejo, el conductor en silueta, la puerta con su tirador, el espejo y el escalón
  R.rect(x0 + 72, s - 37, x0 + 84, s - 28, k(CD.vidrio)); R.linea(x0 + 74, s - 29, x0 + 80, s - 37, k(CD.vidrioL)); R.linea(x0 + 76, s - 29, x0 + 82, s - 37, k(CD.vidrioL));
  if (o.conductor !== false) { R.rect(x0 + 75, s - 34, x0 + 78, s - 31, k(CD.vidrioS)); R.rect(x0 + 74, s - 30, x0 + 79, s - 28, k(CD.vidrioS)); }
  R.rect(x0 + 72, s - 37, x0 + 84, s - 37, k(CD.cremaSS)); R.linea(x0 + 70, s - 38, x0 + 70, s - 14, k(CD.cremaS)); R.rect(x0 + 80, s - 25, x0 + 82, s - 25, k(CD.chasis));
  R.rect(x0 + 86, s - 38, x0 + 86, s - 32, k(CD.chasis)); R.rect(x0 + 86, s - 36, x0 + 88, s - 32, k(CD.cromo)); R.rect(x0 + 72, s - 12, x0 + 80, s - 11, k(CD.aceroS));
  // el tubo de escape vertical y su humo
  R.rect(x0 + 60, s - 50, x0 + 61, s - 14, k(CD.cromoS)); R.pset(x0 + 60, s - 48, k(CD.cromo)); R.rect(x0 + 60, s - 51, x0 + 61, s - 51, k(CD.chasis)); c_humo(R, x0 + 61, s - 53, t, k, 0.8);
  // las ruedas (dos traseras y la delantera), los guardabarros y la faldilla
  for (const wx of [x0 + 13, x0 + 28, x0 + 86]) { R.rect(wx - 8, s - 15, wx + 8, s - 14, k(CD.chasis)); c_rueda(R, wx, s - 7, 7, gira, k); }
  R.rect(x0 + 3, s - 12, x0 + 4, s - 3, k(CD.neum));
  // de noche: los faros abren su cono hacia la derecha
  if (o.noche) for (let x = x0 + 98; x < x0 + 150; x++) { const d = x - x0 - 98, y0 = s - 24 - d * 0.18, y1 = s - 24 + d * 0.32; for (let y = Math.round(y0); y <= y1; y++) if (c_umbral(x, y) < 0.5 - d / 110) R.pset(x, y, c_mezcla(R.pget(x, y), CD.luz, 0.35)); }
}
// la compactadora de vertedero (una apisonadora de ruedas de acero con púas): amarilla, la pala delante, la cabina con su
// jaula, el motor detrás con su escape y la baliza naranja que gira. x: la rueda de atrás menos 14; mira a la derecha
function c_compactadora(R, x, s, t, k, gira, o = {}) {
  // las ruedas de acero con las púas que giran
  const rueda = (cx) => { R.disco(cx, s - 10, 10, k(CD.aceroS)); R.disco(cx, s - 10, 8, k(CD.acero)); R.disco(cx - 1, s - 11, 5, k(CD.aceroL)); R.disco(cx, s - 10, 3, k(CD.amarS)); R.disco(cx, s - 10, 1.5, k(CD.amar));
    for (let i = 0; i < 12; i++) { const a = gira + i * Math.PI / 6, px = Math.round(cx + Math.cos(a) * 10.5), py = Math.round(s - 10 + Math.sin(a) * 10.5); R.rect(px - 1, py - 1, px, py, k(CD.aceroS)); R.pset(px - 1, py - 1, k(CD.aceroL)); }
    for (let i = 0; i < 6; i++) { const a = gira * 1 + i * Math.PI / 3; R.pset(Math.round(cx + Math.cos(a) * 6), Math.round(s - 10 + Math.sin(a) * 6), k(CD.aceroS)); } };
  // el bastidor y la articulación
  R.rect(x + 6, s - 22, x + 62, s - 12, k(CD.amarS)); R.rect(x + 6, s - 22, x + 62, s - 21, k(CD.amar));
  // el motor detrás (a la izquierda) con su rejilla y el escape
  R.rect(x - 4, s - 32, x + 20, s - 16, k(CD.amar)); R.rect(x - 4, s - 32, x + 20, s - 31, k(CD.amarL)); R.rect(x - 4, s - 20, x + 20, s - 16, k(CD.amarS));
  for (let i = 0; i < 4; i++) R.rect(x - 2 + i * 5, s - 28, x + 1 + i * 5, s - 23, k(CD.chasis)); R.rect(x - 4, s - 32, x - 3, s - 16, k(CD.amarS));
  R.rect(x + 12, s - 40, x + 13, s - 32, k(CD.chasis)); c_humo(R, x + 13, s - 42, t, k, 0.7);
  // la cabina con su jaula antivuelco, el cristal y el operario en silueta
  R.rect(x + 22, s - 48, x + 42, s - 22, k(CD.amar)); R.rect(x + 24, s - 46, x + 40, s - 32, k(CD.vidrio)); R.linea(x + 26, s - 33, x + 33, s - 46, k(CD.vidrioL));
  if (o.conductor !== false) { R.rect(x + 30, s - 42, x + 33, s - 38, k(CD.vidrioS)); R.rect(x + 29, s - 37, x + 34, s - 33, k(CD.vidrioS)); }
  R.rect(x + 21, s - 50, x + 43, s - 48, k(CD.chasis)); R.rect(x + 21, s - 50, x + 22, s - 22, k(CD.chasis)); R.rect(x + 42, s - 50, x + 43, s - 22, k(CD.chasis)); R.rect(x + 23, s - 49, x + 41, s - 49, k(CD.aceroS));
  const bal = Math.sin(t * 8) > 0; R.rect(x + 31, s - 53, x + 33, s - 51, k(bal ? CD.luzN : hex('#a85a1a'))); if (bal) { R.pset(x + 30, s - 53, CD.luzN); R.pset(x + 34, s - 53, CD.luzN); }
  // la pala de delante, curva y en sombra por dentro, con su filo brillante
  R.rect(x + 60, s - 20, x + 66, s - 16, k(CD.amarS)); R.poligono([[x + 66, s - 26], [x + 72, s - 28], [x + 74, s - 2], [x + 68, s - 1]], k(CD.amar)); R.linea(x + 72, s - 28, x + 74, s - 2, k(CD.amarL)); R.linea(x + 66, s - 26, x + 68, s - 1, k(CD.amarS)); R.linea(x + 68, s - 1, x + 74, s - 1, k(CD.cromo));
  rueda(x + 12); rueda(x + 54);
  // franja de peligro en el bastidor
  for (let i = 0; i < 6; i++) R.rect(x + 22 + i * 4, s - 18, x + 23 + i * 4, s - 16, k(i % 2 ? CD.chasis : CD.amarL));
  if (o.noche) { R.rect(x + 74, s - 30, x + 75, s - 28, CD.luzL); for (let xx = x + 76; xx < x + 120; xx++) { const d = xx - x - 76; for (let y = Math.round(s - 30 - d * 0.1); y <= s - 29 + d * 0.38; y++) if (c_umbral(xx, y) < 0.42 - d / 120) R.pset(xx, y, c_mezcla(R.pget(xx, y), CD.luz, 0.3)); } }
}

// la hormigonera de 1983: cabina a la izquierda, el tambor de franjas que gira, la canaleta atrás (a la derecha) que echa
// el cemento cuando vierte > 0. x: el parachoques de delante
function c_hormigonera(R, x, s, t, k, vierte, o = {}) {
  R.rect(x + 2, s - 13, x + 70, s - 10, k(CD.chasis));
  // la cabina, de cara a la izquierda
  R.rect(x + 2, s - 34, x + 22, s - 13, k(CD.blanco)); R.rect(x + 2, s - 34, x + 22, s - 34, k(CD.cremaS)); R.rect(x, s - 22, x + 4, s - 13, k(CD.crema)); R.rect(x, s - 14, x + 3, s - 12, k(CD.cromo));
  R.rect(x + 4, s - 31, x + 15, s - 23, k(CD.vidrio)); R.linea(x + 6, s - 23, x + 11, s - 31, k(CD.vidrioL)); if (o.conductor !== false) R.rect(x + 9, s - 29, x + 12, s - 24, k(CD.vidrioS));
  for (let xx = x + 2; xx <= x + 22; xx++) { R.pset(xx, s - 19, k(CD.tamborR)); R.pset(xx, s - 18, k(CD.marron)); }
  R.rect(x + 1, s - 21, x + 2, s - 19, k(o.noche ? CD.luzL : CD.luz));
  // el tambor: un huso inclinado con franjas en espiral que corren al girar
  const giro = t * 6;
  for (let u = 0; u <= 44; u++) { const xx = x + 26 + u, cy = s - 26 - u * 0.16, r = 11 * Math.sin(Math.PI * (0.18 + 0.82 * u / 44)) + 2;
    for (let j = -r; j <= r; j++) { const y = Math.round(cy + j), v = (j / r + 1) / 2, f = ((u * 0.5 + v * 9 + giro) % 9 + 9) % 9;
      let c = f < 2.2 ? CD.tamborR : CD.tambor; if (v > 0.72) c = c === CD.tamborR ? CD.cajaRS : CD.tamborS; else if (v < 0.22 && c === CD.tambor) c = CD.blanco; R.pset(xx, y, k(c)); } }
  R.rect(x + 24, s - 30, x + 26, s - 14, k(CD.aceroS)); R.rect(x + 66, s - 34, x + 68, s - 14, k(CD.aceroS));
  // la tolva y la canaleta (baja hacia la derecha) y el chorro de cemento
  R.poligono([[x + 70, s - 40], [x + 76, s - 40], [x + 74, s - 32], [x + 71, s - 32]], k(CD.aceroS)); R.linea(x + 70, s - 40, x + 76, s - 40, k(CD.aceroL));
  R.poligono([[x + 70, s - 28], [x + 88, s - 18], [x + 88, s - 15], [x + 70, s - 25]], k(CD.acero)); R.linea(x + 70, s - 28, x + 88, s - 18, k(CD.aceroL));
  if (vierte > 0 && vierte < 1) { for (let y = s - 16; y < s + 14; y++) { const w = 1 + Math.sin(y * 0.7 + t * 14) * 0.6; for (let i = -1; i <= Math.round(w); i++) R.pset(x + 89 + i, y, k(i === -1 ? CD.cementoL : (y + Math.floor(t * 20)) % 4 === 0 ? CD.cementoH : CD.cemento)); }
    R.rect(x + 82, s - 19, x + 88, s - 17, k(CD.cemento)); }
  for (const wx of [x + 12, x + 46, x + 60]) { R.rect(wx - 8, s - 15, wx + 8, s - 14, k(CD.chasis)); c_rueda(R, wx, s - 7, 7, t * 0.3, k); }
  if (o.noche) for (let xx = x - 60; xx < x; xx++) { const d = x - xx; for (let y = Math.round(s - 20 - d * 0.1); y <= s - 19 + d * 0.3; y++) if (c_umbral(xx, y) < 0.4 - d / 150) R.pset(xx, y, c_mezcla(R.pget(xx, y), CD.luz, 0.3)); }
}

const V_HOR = 76, V_FOSA = [70, 104, 236, 150];

// el campo de cajas del fondo de la fosa: [x, y, w, alto, semilla]
const V_CAJAS = []; for (let i = 0; i < 46; i++) { const x = 76 + Math.round(h(i, 1, 60) * 150), y = 122 + Math.round(h(i, 2, 60) * 22); V_CAJAS.push([x, y, 6 + Math.round(h(i, 3, 60) * 6), 4 + Math.round(h(i, 4, 60) * 4), i]); }
V_CAJAS.sort((a, b) => a[1] - b[1]);

function c_vertedero(R, t, o) {
  const noche = !!o.noche, k = noche ? c_oscuro : c_igual, { pset, linea } = R;
  const cresta = c_fijo(R, 'v83' + (noche ? 'n' : 'd'), () => {
    c_cieloFijo(R, V_HOR, noche); const cr = c_sierra(R, V_HOR, k); c_llanura(R, V_HOR, 180, k);
    // las roderas que bajan a la fosa y a la caseta
    for (let y = V_HOR + 6; y < 180; y++) { const u = (y - V_HOR) / (180 - V_HOR); for (const x of [Math.round(250 + u * 40), Math.round(256 + u * 58), Math.round(40 - u * 20), Math.round(48 - u * 6)]) { pset(x, y, k(CD.arenaS)); if (u > 0.4) pset(x + 1, y, k(CD.arenaM)); } }
    // la carretera del horizonte con su asfalto y la raya
    R.rect(0, V_HOR + 3, 319, V_HOR + 4, k(CD.asfaltoL)); for (let x = 0; x < 320; x += 6) pset(x, V_HOR + 3, k(CD.amarL));
    // montones de basura del fondo (izquierda y derecha) con bolsas y chatarra de colores
    for (const [cx, w, alto] of [[22, 26, 10], [292, 30, 9], [196, 18, 5]]) for (let i = -w; i <= w; i++) { const top = Math.round(V_HOR + 12 - alto * Math.cos(i / w * Math.PI / 2) - h(i, cx, 61) * 2);
      for (let y = top; y < V_HOR + 13; y++) { const n = h(cx + i, y, 62); pset(cx + i, y, k(n < 0.1 ? CD.cajaR : n < 0.18 ? CD.vidrio : n < 0.3 ? CD.crema : n < 0.6 ? CD.tierra : y === top ? CD.tierraL : CD.tierraS)); } }
    // la caseta del vertedero (izquierda) con su tejado de chapa y la ventana
    R.rect(54, 82, 82, 96, k(CD.crema)); R.rect(54, 82, 56, 96, k(CD.cremaS)); R.rect(52, 79, 84, 81, k(CD.aceroS)); for (let x = 52; x <= 84; x += 3) pset(x, 80, k(CD.aceroL));
    R.rect(60, 86, 68, 91, k(CD.vidrio)); pset(61, 87, k(CD.vidrioL)); R.rect(72, 86, 77, 96, k(CD.marron)); pset(76, 91, k(CD.cromo)); R.rect(56, 96, 84, 97, k(CD.arenaS));
    for (let i = 0; i < 3; i++) { R.rect(86 + i * 5, 92, 89 + i * 5, 96, k([CD.cajaR, CD.vidrio, CD.amarS][i])); R.rect(86 + i * 5, 92, 89 + i * 5, 92, k(CD.aceroL)); }   // bidones
    // los postes de la luz que se alejan y sus cables combados
    const postes = [[8, 112, 36], [104, 92, 22], [150, 85, 16], [180, 81, 11]]; for (const [x, b, a] of postes) c_poste(R, x, b, a, k);
    for (let i = 0; i + 1 < postes.length; i++) { const [x0, b0, a0] = postes[i], [x1, b1, a1] = postes[i + 1]; for (const dx of [-4, 5]) for (let s = 0; s <= 1; s += 0.01) pset(Math.round(x0 + dx + (x1 - x0) * s), Math.round(b0 - a0 + 1 + (b1 - a1 - b0 + a0) * s + Math.sin(s * Math.PI) * 4), k(CD.chasis)); }
    // la fosa: pared del fondo con estratos, fondo de tierra, laderas
    for (let y = 104; y < 150; y++) { const sl = (y - 104) * 0.25, x0 = Math.round(70 + sl), x1 = Math.round(236 - sl);
      for (let x = x0; x <= x1; x++) { let c; if (y < 118) { const est = (y + Math.round(Math.sin(x * 0.08) * 1.5)) % 5; c = est === 0 ? CD.estrato : est === 3 ? CD.tierraS : CD.tierra; if (h(x, y, 63) < 0.05) c = CD.tierraSS; if (y < 106) c = CD.tierraL; }
        else c = h(x >> 1, y, 64) < 0.3 ? CD.tierraS : CD.tierra; if (x - x0 < 3 || x1 - x < 3) c = CD.tierraSS; pset(x, y, k(c)); } }
    // matas, yucas y piedras por la llanura (más grandes cuanto más cerca)
    for (let i = 0; i < 46; i++) { const y = Math.round(V_HOR + 6 + h(i, 1, 65) ** 1.5 * 100), x = Math.round(h(i, 2, 65) * 319); if (x > 62 && x < 244 && y > 98 && y < 156) continue; if (x < 100 && x > 46 && y < 100) continue;
      const r = 1 + (y - V_HOR) / 22; if (i % 7 === 0) c_yuca(R, x, y, 0, k, r / 4 + 0.4); else c_mata(R, x, y, r, k, i); }
    for (let i = 0; i < 30; i++) { const x = Math.round(h(i, 3, 66) * 319), y = Math.round(152 + h(i, 4, 66) * 26); if (x < 80) continue; R.rect(x, y, x + 1, y, k(CD.arenaS)); pset(x, y - 1, k(CD.arenaL)); }
    // basura suelta por el suelo de delante: papeles, un neumático, latas
    for (let i = 0; i < 14; i++) { const x = Math.round(80 + h(i, 5, 66) * 230), y = Math.round(154 + h(i, 6, 66) * 24); R.rect(x, y, x + 2, y + 1, k(i % 3 ? CD.papel : CD.cartonS)); }
    R.disco(296, 172, 5, k(CD.neum)); R.disco(296, 172, 2.5, k(CD.arenaS)); pset(293, 169, k(CD.neumL));
    return cr;
  });
  c_cieloVivo(R, t, V_HOR, noche, cresta);
  // los coches de la carretera del horizonte y la polvareda de un remolino
  for (let i = 0; i < 2; i++) { const x = Math.round(((t * (14 + i * 6) + i * 170) % 380) - 30) * (i ? -1 : 1) + (i ? 320 : 0), y = V_HOR + 2; R.rect(x, y - 1, x + 4, y, k(i ? CD.vidrio : CD.cajaR)); pset(x + 1, y - 2, k(CD.vidrioL)); if (noche) pset(i ? x : x + 4, y, CD.luzL); }
  if (!noche) { const dx = 120 + Math.sin(t * 0.3) * 30; for (let j = 0; j < 22; j++) { const y = V_HOR + 4 - j, w = 1 + j * 0.18, cx = dx + Math.sin(t * 3 + j * 0.4) * (1 + j * 0.08); for (let i = -w; i <= w; i++) if (c_umbral(Math.round(cx + i), y) < 0.35 - j * 0.01) pset(Math.round(cx + i), y, c_mezcla(R.pget(Math.round(cx + i), y), CD.arenaL, 0.5)); } }
  // la manga de viento de la caseta, que ondea
  linea(84, 72, 84, 82, k(CD.aceroS)); for (let i = 0; i < 7; i++) { const y = 72 + Math.round(Math.sin(t * 5 - i * 0.8) * (i / 7) * 1.5); pset(85 + i, y, k(i % 2 ? CD.blanco : CD.naranja)); pset(85 + i, y + 1, k(i % 2 ? CD.lonaS : CD.cajaRS)); }
  if (noche) { R.rect(60, 86, 68, 91, CD.luz); pset(61, 87, CD.luzL); }
  // gaviotas sobre el montón de basura de la izquierda
  for (let i = 0; i < 4; i++) { const a = t * 1.1 + i * 1.6, x = Math.round(24 + Math.cos(a) * (10 + i * 3)), y = Math.round(V_HOR - 2 + Math.sin(a * 1.3) * 3 - i), al = Math.sin(t * 10 + i) > 0 ? -1 : 0; pset(x, y, k(CD.blanco)); pset(x - 1, y + al, k(CD.lonaS)); pset(x + 1, y + al, k(CD.lonaS)); }
  // la torre de focos (de noche, encendida con su cono sobre la fosa)
  { const tx = 246, tb = 104; linea(tx, tb, tx + 3, tb - 40, k(CD.aceroS)); linea(tx + 8, tb, tx + 5, tb - 40, k(CD.aceroS)); for (let y = tb - 36; y < tb; y += 6) { linea(tx + 1, y, tx + 7, y + 6, k(CD.aceroS)); linea(tx + 7, y, tx + 1, y + 6, k(CD.aceroS)); }
    R.rect(tx, tb - 46, tx + 8, tb - 41, k(CD.chasis)); for (let i = 0; i < 4; i++) R.rect(tx + 1 + i * 2, tb - 45, tx + 1 + i * 2, tb - 43, noche ? CD.luzL : k(CD.aceroL));
    if (noche) for (let y = tb - 41; y < 150; y++) { const d = y - tb + 41, x0 = tx + 4 - d * 1.1, x1 = tx + 4 - d * 0.1; for (let x = Math.round(x0); x <= x1; x++) if (c_umbral(x, y) < 0.32 - d / 400) pset(x, y, c_mezcla(R.pget(x, y), CD.luz, 0.3)); } }
  // el contenido de la fosa: las cajas (aplastadas por donde ha pasado la compactadora) y los cartuchos sueltos
  const ap = o.apisonadora, axC = Math.round(ap == null ? 74 : lerp(74, 168, ap)), cem = o.cemento ?? 0, xCem = Math.round(lerp(72, 238, Math.min(1, cem)));
  for (const [x, y, w, hh, sem] of V_CAJAS) c_caja(R, x, y, w, hh, sem, k, ap != null && x + w < axC + 10);
  for (let i = 0; i < 24; i++) { const x = 78 + Math.round(h(i, 7, 60) * 146), y = 126 + Math.round(h(i, 8, 60) * 18); c_cartuchito(R, x, y, i, k, !noche && i % 6 === 0 && Math.sin(t * 2 + i) > 0.8); }
  // el cemento: una capa gris con ondas y brillo húmedo que avanza, con su frente abombado
  if (cem > 0) for (let y = 112; y < 148; y++) { const sl = (y - 104) * 0.25, x0 = Math.round(72 + sl), fr = Math.round(xCem - (y - 130) ** 2 * 0.03 + Math.sin(y * 0.6 + t * 3) * 1.5);
    for (let x = x0; x < Math.min(fr, 234 - sl); x++) { const ond = Math.sin(x * 0.12 + Math.sin(y * 0.45 + x * 0.02) * 2 - t * 1.5), g = h(x, y, 121), d = fr - x;
      pset(x, y, k(d < 2 ? CD.cementoL : d < 4 ? CD.cementoS : d < 30 && d % 6 === 0 ? CD.cementoL : g < 0.07 ? CD.cementoS : ond > 0.96 ? CD.cementoH : ond > 0.78 ? CD.cementoL : CD.cemento)); } }
  // la hormigonera a la izquierda con la canaleta sobre la fosa
  c_hormigonera(R, -6, 140, t, k, o.cemento == null ? 0 : cem > 0 && cem < 1 ? 0.5 : 0, o);
  // la compactadora en la fosa (ruedas en y 142) y el polvo que levanta al avanzar
  { const anda = ap != null && ap > 0 && ap < 1; c_compactadora(R, axC, 142, t, k, anda ? axC / 10.5 : 0, o);
    if (anda) for (let i = 0; i < 6; i++) { const u = (t * 1.5 + i / 6) % 1; R.disco(Math.round(axC - 4 - u * 18), Math.round(140 - u * 8), 1 + u * 3, k(c_mezcla(CD.arenaL, CD.tierraL, u))); } }
  // el volquete: entra, para, bascula y vacía
  { const c = o.camion; let x0 = 214, vu = 0, ch = 0, gira = 0;
    if (c != null) { if (c < 0.15) { x0 = Math.round(lerp(330, 214, c / 0.15)); gira = -x0 / 7; } vu = c < 0.15 ? 0 : c < 0.55 ? (c - 0.15) / 0.4 : c < 0.85 ? 1 : Math.max(0, 1 - (c - 0.85) / 0.15); ch = Math.max(0, Math.min(1, (c - 0.3) / 0.6)); }
    c_volquete(R, x0, 140, t, k, vu, gira, ch, o); }
  // el labio de delante de la fosa (tapa las ruedas de abajo)
  for (let x = 66; x <= 240; x++) { const top = 146 + Math.round(Math.sin(x * 0.2) * 0.8 + h(x >> 2, 1, 67)); for (let y = top; y < 151; y++) pset(x, y, k(y === top ? CD.tierraL : y < top + 2 ? CD.arenaM : CD.arenaS)); }
  // la planta rodadora que cruza el suelo de delante con el viento (salta y gira)
  { const u = (t * 0.09 + 0.3) % 1, x = Math.round(lerp(-20, 340, u)), y = 166 - Math.round(Math.abs(Math.sin(t * 4)) * 4), r = 5; R.disco(x + 2, 167, 4, k(CD.arenaS));
    for (let i = 0; i < 18; i++) { const a = t * 6 + i * 2.3, b = i * 1.7; linea(Math.round(x + Math.cos(a) * r), Math.round(y - r + Math.sin(a) * r), Math.round(x + Math.cos(a + b) * r * 0.6), Math.round(y - r + Math.sin(a + b) * r * 0.6), k(i % 3 ? CD.arenaSS : CD.loma)); } }
  return { suelo: 168, fosa: V_FOSA };
}

// la valla de tela metálica del vertedero (con alambre de espino) y el cartel sin letras, a la izquierda; un matorral
// abajo a la derecha
function c_vallaVertedero(R, t, k, noche) {
  const { pset, linea, rect } = R;
  for (const x of [4, 32, 60]) { rect(x, 138, x + 1, 179, k(CD.aceroS)); pset(x, 138, k(CD.aceroL)); linea(x, 138, x - 4, 132, k(CD.aceroS)); }
  for (let y = 142; y <= 179; y++) for (let x = 0; x <= 61; x++) { const d1 = (x + y) % 5, d2 = (x - y + 600) % 5; if (d1 === 0 || d2 === 0) pset(x, y, k(d1 === d2 ? CD.aceroL : CD.acero)); }
  linea(0, 142, 61, 142, k(CD.aceroS)); linea(0, 141, 61, 141, k(CD.aceroL));
  for (const yy of [132, 135]) for (let x = 0; x < 62; x++) { pset(x, yy + (x % 6 < 3 ? 0 : 1), k(CD.aceroS)); if (x % 6 === 2) { pset(x, yy - 1, k(CD.aceroL)); pset(x, yy + 2, k(CD.aceroL)); } }
  // el cartel: tablero blanco con el pictograma del camión y el círculo rojo de prohibido, atornillado a la valla
  { const dy = 14; rect(12, 132 + dy, 34, 150 + dy, k(CD.aceroS)); rect(13, 133 + dy, 33, 149 + dy, k(CD.blanco)); rect(13, 147 + dy, 33, 149 + dy, k(CD.lonaS));
  R.disco(23, 140 + dy, 6, k(hex('#d0383a'))); R.disco(23, 140 + dy, 4.5, k(CD.blanco)); rect(19, 139 + dy, 26, 141 + dy, k(CD.tinta)); rect(24, 137 + dy, 26, 139 + dy, k(CD.tinta)); pset(20, 142 + dy, k(CD.tinta)); pset(25, 142 + dy, k(CD.tinta));
  linea(19, 144 + dy, 27, 136 + dy, k(hex('#d0383a'))); linea(19, 145 + dy, 28, 136 + dy, k(hex('#d0383a')));
  for (const [x, y] of [[13, 133], [33, 133], [13, 149], [33, 149]]) pset(x, y + dy, k(CD.aceroS)); }
  // un trozo de papel enganchado en la valla que aletea
  { const f = Math.sin(t * 7) > 0 ? 1 : 0; rect(44, 166, 47, 168 + f, k(CD.papel)); pset(48, 167, k(CD.papelS)); }
  // el matorral de delante, abajo a la derecha, que se mece
  const m = Math.round(Math.sin(t * 1.8) * 1); for (let i = 0; i < 16; i++) { const a = -Math.PI + h(i, 9, 68) * Math.PI, l = 8 + h(i, 8, 68) * 7; linea(306, 180, Math.round(306 + Math.cos(a) * l + m), Math.round(180 + Math.sin(a) * l), k(i % 3 ? CD.matS : CD.mat)); pset(Math.round(306 + Math.cos(a) * l + m), Math.round(180 + Math.sin(a) * l), k(CD.matL)); }
}

function c_cementoCerca(R, t, o) {
  const noche = !!o.noche, k = noche ? c_lunar : c_igual, { pset, linea } = R, cem = o.cemento ?? 0.4;
  const cresta = c_fijo(R, 'v83c' + (noche ? 'n' : 'd'), () => {
    // arriba, el borde de la fosa con una franja de cielo y la sierra (sin sol: la barra del año queda tranquila)
    c_cieloFijo(R, 30, noche, [-40, -40, 6]); const cr = new Int16Array(320);
    for (let x = 0; x < 320; x++) { const yc = Math.round(22 + 4 * Math.sin(x * 0.03 + 1) + 2 * Math.sin(x * 0.09)); cr[x] = yc; for (let y = yc; y < 38; y++) pset(x, y, k(h(x >> 1, y, 69) < 0.2 ? CD.sierraS : y < yc + 2 ? CD.sierraL : CD.sierra)); }
    // de noche, la torre de focos en el borde de enfrente (x 228–244), con su caseta de chapa y el generador
    if (noche) { const tx = 180; for (let y = 16; y < 48; y++) { pset(tx + Math.round((y - 16) * -0.08), y, CD.chasis); pset(tx + 12 + Math.round((y - 16) * 0.08), y, CD.chasis); }
      for (let y = 18; y < 46; y += 6) { linea(tx, y, tx + 12, y + 6, CD.chasis); linea(tx + 12, y, tx, y + 6, CD.chasis); }
      R.rect(tx - 4, 8, tx + 16, 15, CD.chasis); R.rect(tx - 3, 9, tx + 15, 9, k(CD.aceroL));
      R.rect(tx + 20, 40, tx + 34, 48, k(CD.amarS)); R.rect(tx + 20, 40, tx + 34, 41, k(CD.amar)); for (let i = 0; i < 3; i++) R.rect(tx + 23 + i * 4, 43, tx + 24 + i * 4, 46, CD.chasis); }
    for (let x = 0; x < 320; x++) for (let y = 30; y < 58; y++) { const top = 52 + Math.round(Math.sin(x * 0.07) * 2); if (y < top - 18) continue; pset(x, y, k(y < top - 16 ? CD.arenaM : y < top ? (h(x, y, 70) < 0.1 ? CD.arenaS : CD.arena) : y === top ? CD.tierraL : CD.tierra)); }
    // la pared de la fosa con estratos y el fondo de cajas aplastadas
    for (let y = 54; y < 180; y++) for (let x = 0; x < 320; x++) { const est = (y + Math.round(Math.sin(x * 0.05) * 2)) % 7; let c = y < 76 ? (est === 0 ? CD.estrato : est === 4 ? CD.tierraS : CD.tierra) : (h(x >> 2, y >> 1, 71) < 0.3 ? CD.tierraS : CD.tierraSS); if (y >= 54 && y < 76 && h(x, y, 72) < 0.04) c = CD.tierraL; pset(x, y, k(c)); }
    // las cajas aplastadas y rotas, en capas, con cartuchos que asoman
    for (let i = 0; i < 70; i++) { const x = Math.round(h(i, 1, 73) * 330 - 10), y = Math.round(84 + h(i, 2, 73) ** 0.9 * 96), w = 14 + Math.round(h(i, 3, 73) * 18), a = (h(i, 4, 73) - 0.5) * 10, col = [CD.carton, CD.cartonL, CD.cajaR, CD.crema, CD.carton][i % 5];
      R.poligono([[x, y], [x + w, y + a], [x + w - 2, y + a - 6], [x + 2, y - 7]], k(c_mezcla(col, CD.cartonSS, 0.25))); linea(x + 2, y - 7, x + w - 2, y + a - 6, k(i % 5 === 2 ? CD.cajaRL : CD.cartonL)); linea(x, y, x + w, y + a, k(CD.cartonSS));
      linea(x + w / 2, y - 6 + a / 2, x + w / 2 + 2, y + a / 2, k(CD.cinta)); if (i % 4 === 0) { R.rect(x + 4, y - 5, x + 7, y - 3, k(CD.chasis)); pset(x + 5, y - 4, k(CD.amar)); } }
    for (let i = 0; i < 26; i++) { const x = Math.round(h(i, 5, 73) * 300 + 6), y = Math.round(92 + h(i, 6, 73) * 84); c_cartuchito(R, x, y, i, k); }
    // de noche: el foco de la torre ilumina el fondo de la fosa (cajas, tapas claras y cartuchos que se leen)
    if (noche) { const B = R.buf; for (let y = 54; y < 180; y++) for (let x = 0; x < 320; x++) { const f = c_focoCem(x, y); if (f <= 0) continue; const l = Math.min(3, Math.floor(f * 3.4 + c_umbral(x, y) - 0.2)); if (l > 0) B[y * 320 + x] = c_mezcla(B[y * 320 + x], CD.luz, [0, 0.16, 0.3, 0.42][l]); }
      // el haz que baja del foco por el aire hasta la fosa, tramado
      for (let y = 16; y < 64; y++) { const f = (y - 16) / 48, xa = 184 - f * 110, xb = 190 - f * 20; for (let x = Math.round(xa); x <= xb; x++) if (c_umbral(x, y) < 0.22 - f * 0.1) B[y * 320 + x] = c_mezcla(B[y * 320 + x], CD.luzL, 0.3); } }
    return cr;
  });
  c_cieloVivo(R, t, 30, noche, cresta, [-40, -40, 6]);
  // la canaleta de la hormigonera arriba a la izquierda y el chorro que cae
  const xf = Math.round(lerp(-10, 330, Math.min(1, cem)));
  R.poligono([[0, 26], [44, 44], [44, 50], [0, 33]], k(CD.acero)); linea(0, 26, 44, 44, k(CD.aceroL)); linea(0, 33, 44, 50, k(CD.aceroS));
  if (cem > 0 && cem < 1) { for (let y = 46; y < 120; y++) { const w = 3 + Math.sin(y * 0.5 + t * 12) * 1.2; for (let i = -1; i <= w; i++) pset(46 + i + Math.round((y - 46) * 0.12), y, k(i === -1 ? CD.cementoL : (y + Math.floor(t * 30)) % 5 === 0 ? CD.cementoH : CD.cemento)); }
    for (let i = 0; i < 8; i++) { const u = (t * 2 + i / 8) % 1; R.disco(Math.round(54 + Math.cos(i * 2.3) * u * 14), Math.round(118 - u * 6), 1, k(CD.cementoL)); } }
  // el cemento que avanza: capa gris con ondas, brillo húmedo, burbujas y el frente abombado
  if (cem > 0) for (let y = 80; y < 180; y++) { const fr = Math.round(xf - (y - 130) ** 2 * 0.008 + Math.sin(y * 0.3 + t * 2.4) * 3);
    for (let x = 0; x < Math.min(320, fr); x++) { const ond = Math.sin(x * 0.05 + Math.sin(y * 0.08 + x * 0.01) * 2.2 - t * 1.2), g = h(x, y, 115);
      const lento = Math.sin(x * 0.02 + y * 0.035 + 1.7); let c = ond > 0.985 ? CD.cementoH : ond > 0.8 ? CD.cementoL : lento < -0.6 && c_umbral(x, y) < 0.5 ? CD.cementoS : lento > 0.6 && c_umbral(x, y) < 0.4 ? CD.cementoL : CD.cemento; if (g < 0.08) c = CD.cementoS; else if (g > 0.975) c = CD.cementoH; else if (g > 0.93) c = hex('#8a8478'); else if (fr - x < 44 && (fr - x + Math.round(Math.sin(y * 0.2) * 2)) % 8 === 0) c = CD.cementoL; else if (fr - x < 44 && (fr - x + Math.round(Math.sin(y * 0.2) * 2)) % 8 === 1) c = CD.cementoS;
      if (fr - x < 6) c = fr - x < 2 ? CD.cementoL : CD.cementoS;
      if (noche) { const f = c_focoCem(x, y); let q = k(c); if (f > 0) { const l = Math.min(3, Math.floor(f * 3.4 + c_umbral(x, y) - 0.2)); q = c_mezcla(q, CD.luz, [0, 0.18, 0.34, 0.48][Math.max(0, l)]);
        if (ond > 0.95 && f > 0.25) q = (x + 2 * y + Math.floor(t * 5)) % 4 ? c_mezcla(q, CD.luzL, 0.55) : CD.luzL; else if (ond > 0.82 && f > 0.4 && c_umbral(x, y) < 0.4) q = c_mezcla(q, CD.luzL, 0.4); } pset(x, y, q); } else pset(x, y, k(c)); }
    if (fr >= 0 && fr < 318) { pset(fr, y, k(CD.tierraSS)); pset(fr + 1, y, k(CD.tierraSS)); } }
  // las cajas medio hundidas que asoman del cemento, manchadas de gris
  if (cem > 0) for (let i = 0; i < 9; i++) { const x = Math.round(10 + h(i, 1, 116) * 300), y = Math.round(96 + h(i, 2, 116) * 78); if (x > xf - 30) continue; const w = 10 + Math.round(h(i, 3, 116) * 10);
    const kb = noche && c_focoCem(x, y) > 0.2 ? c_lucido : k;
    R.poligono([[x - 1, y + 1], [x + w + 1, y - 2], [x + w + 3, y - 10], [x + 2, y - 8]], noche ? CD.negro : k(CD.cartonSS));
    R.poligono([[x, y], [x + w, y - 3], [x + w + 2, y - 9], [x + 3, y - 7]], kb(i % 3 === 1 ? CD.cajaRS : CD.cartonS)); linea(x + 3, y - 7, x + w + 2, y - 9, kb(i % 3 === 1 ? CD.cajaRL : CD.cartonL)); linea(x + 4, y - 6, x + w + 1, y - 8, kb(i % 3 === 1 ? CD.cajaR : CD.carton)); linea(x, y, x + w, y - 3, k(CD.cementoS)); for (let j = 0; j < 4; j++) pset(x + 2 + j * 3, y - 2 - (j % 2), k(CD.cementoL)); }
  // los papeles que vuelan con el viento por encima de la fosa
  for (let i = 0; i < 3; i++) { const u = (t * (0.12 + i * 0.03) + i * 0.33) % 1, x = Math.round(lerp(-10, 330, u)), y = Math.round(64 + i * 22 + Math.sin(t * 2 + i) * 8), f = Math.sin(t * 8 + i) > 0;
    R.poligono([[x, y], [x + 6, y + (f ? -1 : 1)], [x + 5, y + 4], [x - 1, y + 3]], k(CD.papel)); linea(x + 1, y + 1, x + 4, y + 1, k(CD.papelS)); }
  // la rueda de púas de la compactadora que asoma a la derecha
  { const cx = 318, cy = 150; R.disco(cx, cy, 30, k(CD.aceroS)); R.disco(cx, cy, 26, k(CD.acero)); R.disco(cx - 3, cy - 3, 18, k(CD.aceroL)); R.disco(cx, cy, 9, k(CD.amar)); R.disco(cx - 1, cy - 1, 6, k(CD.amarL));
    for (let i = 0; i < 14; i++) { const a = -t * 0.4 + i * Math.PI / 7, px = Math.round(cx + Math.cos(a) * 31), py = Math.round(cy + Math.sin(a) * 31); R.disco(px, py, 3, k(CD.aceroS)); R.pset(px - 1, py - 1, k(CD.aceroL)); } }
  // de noche: los cuatro focos de la torre encendidos (uno parpadea) y las polillas que dan vueltas a su luz
  if (noche) { const tx = 180; for (let i = 0; i < 4; i++) { const on = i !== 2 || Math.sin(t * 17) > -0.6; R.rect(tx - 2 + i * 5, 10, tx + i * 5, 13, on ? CD.luzL : CD.luzN); if (on) pset(tx - 1 + i * 5, 11, CD.blanco); }
    for (let i = 0; i < 5; i++) { const a = t * (3 + i * 0.7) + i * 1.3; pset(Math.round(tx + 7 + Math.cos(a) * (6 + i * 2)), Math.round(18 + Math.sin(a * 1.4) * (3 + i)), (i + Math.floor(t * 8)) % 2 ? CD.luzL : CD.cremaS); } }
  return { suelo: 52 };
}
// una fachada de ladrillo entre x0 y x1, de y0 a la acera: ladrillos en hileras con sus juntas, cornisa y zócalo
function c_ladrillo(R, x0, y0, x1, y1, k) {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const fila = Math.floor((y - y0) / 3), jx = (x - x0 + (fila % 2) * 4) % 8; let c = (y - y0) % 3 === 2 || jx === 0 ? CD.junta : h(Math.floor((x - x0 + (fila % 2) * 4) / 8), fila, 75) < 0.3 ? CD.ladrilloS : h(x >> 3, fila, 76) > 0.85 ? CD.ladrilloL : CD.ladrillo;
    R.pset(x, y, k(c)); }
  R.rect(x0 - 1, y0 - 3, x1 + 1, y0 - 1, k(CD.cremaS)); R.rect(x0 - 1, y0 - 3, x1 + 1, y0 - 3, k(CD.crema));
}

// una ventana iluminada (o apagada) con su marco y el reflejo; dentro, lo que pinte dentro(x0, y0, x1, y1) recortado
function c_ventana(R, x0, y0, x1, y1, luz, k, dentro) {
  R.rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, k(CD.cremaSS)); R.rect(x0, y0, x1, y1, luz ? CD.luzN : k(CD.vidrioS));
  if (luz) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (c_umbral(x, y) < (y - y0) / (y1 - y0 + 1) * 0.6) R.pset(x, y, CD.luz);
  if (dentro) { R.recorte([x0, y0, x1, y1]); dentro(x0, y0, x1, y1); R.recorte(null); }
  R.rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, k(CD.crema));
}

const P_HOR = 92;

function c_pueblo(R, t, o) {
  const k = c_oscuro, { pset, linea, rect } = R;
  const cresta = c_fijo(R, 'pueblo', () => {
    c_cieloFijo(R, P_HOR + 10, true); const cr = c_sierra(R, P_HOR, (c) => c_mezcla(c_oscuro(c), hex('#141a3a'), 0.4));
    // el depósito de agua del pueblo, en silueta sobre la sierra, con su luz roja
    { const x = 196; for (const dx of [0, 14]) rect(x + dx, 58, x + dx, 92, hex('#1a1e38')); linea(x, 74, x + 14, 88, hex('#1a1e38')); linea(x + 14, 74, x, 88, hex('#1a1e38')); R.disco(x + 7, 52, 10, hex('#1e2440')); rect(x - 3, 52, x + 17, 60, hex('#1e2440')); rect(x - 3, 60, x + 17, 61, hex('#262c4c')); for (let i = -2; i < 18; i += 3) pset(x + i, 56, hex('#2a3256')); }
    // el café (izquierda): fachada estucada, toldo a rayas, escaparate oscuro con taburetes y una luz de guardia
    rect(0, 70, 62, 140, k(CD.crema)); for (let y = 70; y < 140; y++) for (let x = 0; x < 63; x++) if (h(x, y, 77) < 0.12) pset(x, y, k(CD.cremaS)); rect(0, 66, 62, 70, k(CD.cremaS)); rect(0, 66, 62, 66, k(CD.blanco));
    for (let x = 0; x < 62; x++) for (let y = 98; y < 106; y++) pset(x, y, k(((x >> 2) % 2 ? hex('#d04a3a') : CD.blanco)));
    for (let x = 0; x < 62; x += 4) pset(x + 2, 106, k(hex('#d04a3a')));
    rect(4, 108, 44, 136, k(CD.vidrioS)); for (let i = 0; i < 4; i++) { rect(8 + i * 9, 128, 10 + i * 9, 136, k(CD.aceroS)); rect(7 + i * 9, 127, 11 + i * 9, 128, k(hex('#d04a3a'))); } rect(4, 125, 44, 126, k(CD.cremaS));
    rect(48, 110, 58, 140, k(CD.marron)); pset(56, 125, k(CD.cromo)); for (let x = 4; x <= 44; x += 20) rect(x, 108, x, 136, k(CD.cremaSS));
    // el letrero del café en el toldo (una taza pintada, sin letras)
    rect(14, 74, 46, 90, k(CD.marron)); rect(15, 75, 45, 89, k(CD.crema)); rect(24, 79, 33, 86, k(hex('#d04a3a'))); rect(34, 81, 36, 84, k(hex('#d04a3a'))); for (let i = 0; i < 3; i++) pset(26 + i * 3, 77 - (i % 2), k(CD.lonaS));
    // la imprenta: dos plantas de ladrillo, cornisa, ventanas encendidas abajo y una arriba, y la puerta
    c_ladrillo(R, 64, 56, 150, 140, k); rect(64, 96, 150, 98, k(CD.cremaS));
    // el bajante de chapa entre el café y la imprenta, con sus abrazaderas
    rect(63, 58, 63, 140, k(CD.aceroS)); for (let y = 64; y < 140; y += 14) pset(63, y, k(CD.aceroL));
    rect(98, 108, 116, 140, k(CD.cremaSS)); rect(100, 110, 114, 140, CD.luzN); for (let y = 110; y < 140; y++) for (let x = 100; x <= 114; x++) if (c_umbral(x, y) < 0.35) pset(x, y, CD.luz); rect(106, 110, 107, 140, k(CD.marron)); rect(98, 104, 116, 106, k(CD.crema));
    // el rótulo de la imprenta: un periódico pintado (barras, sin letras) sobre la puerta
    rect(84, 62, 130, 76, k(CD.tinta)); rect(86, 64, 128, 74, k(CD.papel)); rect(88, 66, 126, 67, k(CD.tinta)); for (let x = 88; x < 126; x += 7) rect(x, 70, x + 4, 72, k(CD.papelS));
    // el hueco: el desierto hasta la valla del vertedero, a lo lejos
    for (let y = P_HOR; y < 140; y++) for (let x = 151; x < 180; x++) pset(x, y, k(y < P_HOR + 6 ? CD.arenaM : h(x, y, 78) < 0.1 ? CD.arenaS : CD.arena));
    for (let x = 151; x < 180; x++) { pset(x, P_HOR + 7, k(CD.aceroS)); if (x % 3 === 0) pset(x, P_HOR + 5, k(CD.aceroS)); if (x % 6 === 0) rect(x, P_HOR + 4, x, P_HOR + 9, k(CD.chasis)); }
    for (let y = 120; y < 140; y++) { pset(160 + Math.round((y - 120) * 0.2), y, k(CD.arenaS)); pset(170 - Math.round((y - 120) * 0.1), y, k(CD.arenaS)); }
    // la ferretería: escaparate oscuro con herramientas colgadas, toldo verde y una rueda de carretilla
    rect(180, 76, 222, 140, k(hex('#8a7a5a'))); for (let y = 76; y < 140; y += 4) linea(180, y, 222, y, k(hex('#6e6046'))); rect(180, 74, 222, 76, k(CD.crema));
    for (let x = 180; x < 222; x++) for (let y = 94; y < 100; y++) pset(x, y, k((x >> 2) % 2 ? hex('#3a7a4a') : CD.blanco));
    rect(184, 104, 206, 134, k(CD.vidrioS)); for (let i = 0; i < 4; i++) { linea(188 + i * 5, 108, 188 + i * 5, 116 + i, k(CD.aceroL)); pset(188 + i * 5, 117 + i, k(CD.cajaR)); } rect(186, 128, 204, 134, k(CD.chasis)); R.disco(194, 126, 3, k(CD.cajaR));
    rect(210, 106, 220, 140, k(CD.marron)); pset(212, 124, k(CD.cromo)); rect(188, 78, 216, 92, k(hex('#3a7a4a'))); rect(189, 79, 215, 91, k(hex('#4a8a5a'))); R.poligono([[192, 82], [206, 82], [206, 88], [192, 86]], k(CD.aceroL)); for (let x = 192; x < 206; x += 2) pset(x, 87 + (x > 199 ? 1 : 0), k(CD.aceroS)); rect(206, 81, 212, 89, k(CD.madera)); rect(208, 83, 210, 87, k(hex('#4a8a5a'))); linea(192, 82, 206, 82, k(CD.blanco));
    // el motel: una planta larga con tejado a dos aguas, puertas numeradas, ventanas y el pasillo cubierto
    rect(222, 92, 319, 140, k(hex('#e0c8a0'))); for (let y = 92; y < 140; y++) for (let x = 222; x < 320; x++) if (h(x, y, 79) < 0.1) pset(x, y, k(hex('#c8ae84')));
    R.poligono([[220, 94], [244, 80], [319, 80], [319, 94]], k(hex('#8a4a3a'))); for (let x = 222; x < 320; x += 3) linea(x, 94, x + 4, 81, k(hex('#6a3428'))); rect(220, 94, 319, 96, k(hex('#5a2a20')));
    for (let i = 0; i < 4; i++) { const x = 228 + i * 24; rect(x, 110, x + 9, 136, k([hex('#3a8a8a'), hex('#c06a3a'), hex('#3a8a8a'), hex('#c06a3a')][i])); rect(x, 110, x + 9, 110, k(CD.blanco)); pset(x + 7, 123, k(CD.cromo)); R.numero(String(i + 1), x + 3, 119, { tam: 8, fina: true, color: k(CD.crema), sombra: false }); rect(x + 12, 112, x + 20, 122, k(CD.vidrioS)); rect(x + 12, 112, x + 20, 113, k(hex('#c8a0a0'))); }
    for (let x = 222; x < 320; x += 24) rect(x, 96, x + 1, 140, k(CD.blanco)); rect(222, 136, 319, 140, k(CD.aceraS));
    // la máquina de hielo y la de refrescos (sin letras, con su panel de luz)
    rect(312, 118, 319, 138, k(CD.cajaR)); rect(313, 120, 318, 128, CD.luzL); for (let y = 130; y < 137; y += 2) rect(313, y, 318, y, k(CD.cajaRS));
    // la acera con sus losas y el bordillo; la calzada con la raya amarilla y manchas
    for (let y = 140; y < 151; y++) for (let x = 0; x < 320; x++) pset(x, y, k(y >= 149 ? (y === 149 ? CD.acera : CD.aceraS) : x % 22 === 0 || y === 140 ? CD.aceraS : h(x >> 1, y, 80) < 0.15 ? CD.aceraS : CD.acera));
    for (let y = 151; y < 180; y++) for (let x = 0; x < 320; x++) { const n = h(x, y, 81); pset(x, y, k(n < 0.1 ? CD.asfaltoL : n > 0.97 ? CD.acera : CD.asfalto)); }
    for (let x = 0; x < 320; x++) if ((x >> 3) % 2 === 0) { pset(x, 166, k(CD.amar)); pset(x, 167, k(CD.amarS)); }
    for (let i = 0; i < 8; i++) R.disco(Math.round(h(i, 1, 82) * 300), Math.round(156 + h(i, 2, 82) * 20), 2 + h(i, 3, 82) * 3, k(hex('#2e2e34')));
    // el coche aparcado delante del motel (una berlina de los setenta)
    { const x = 266, s = 150; R.poligono([[x, s - 6], [x + 6, s - 13], [x + 26, s - 13], [x + 34, s - 7], [x + 44, s - 6], [x + 44, s - 2], [x, s - 2]], k(hex('#6a8ab8'))); rect(x + 8, s - 12, x + 25, s - 8, k(CD.vidrioS)); rect(x + 16, s - 12, x + 16, s - 8, k(hex('#6a8ab8')));
      linea(x, s - 6, x + 44, s - 6, k(CD.cromo)); R.disco(x + 9, s - 2, 3.5, k(CD.neum)); R.disco(x + 36, s - 2, 3.5, k(CD.neum)); R.disco(x + 9, s - 2, 1.5, k(CD.llanta)); R.disco(x + 36, s - 2, 1.5, k(CD.llanta)); }
    // en la acera: parquímetros, la caja de periódicos, la boca de incendios, la papelera y el banco del motel
    for (const x of [26, 88, 134]) { rect(x, 138, x, 148, k(CD.aceroS)); rect(x - 1, 133, x + 1, 137, k(CD.acero)); pset(x, 134, k(CD.vidrioL)); pset(x - 1, 133, k(CD.aceroL)); }
    rect(118, 134, 128, 148, k(hex('#2a5ab8'))); rect(118, 134, 128, 134, k(hex('#5a8ae0'))); rect(120, 136, 126, 141, k(CD.papel)); rect(120, 136, 126, 136, k(CD.tinta)); pset(121, 139, k(CD.papelS)); pset(124, 139, k(CD.papelS)); rect(119, 143, 127, 144, k(hex('#1a3a8a')));
    rect(172, 142, 176, 148, k(hex('#c8302a'))); rect(171, 141, 177, 142, k(hex('#e85a4a'))); rect(170, 144, 178, 145, k(hex('#a8201a'))); pset(173, 143, k(hex('#ff8a7a')));
    rect(58, 138, 63, 148, k(CD.aceroS)); rect(57, 137, 64, 138, k(CD.acero)); for (let y = 140; y < 148; y += 2) rect(58, y, 63, y, k(CD.chasis)); pset(59, 136, k(CD.papel));
    rect(230, 140, 252, 141, k(CD.madera)); rect(230, 137, 252, 137, k(CD.madera)); for (const x of [232, 250]) rect(x, 141, x, 146, k(CD.aceroS));
    // el muro bajo del hueco y los cables de una esquina a otra
    rect(150, 128, 180, 140, k(CD.cremaS)); rect(150, 128, 180, 129, k(CD.crema));
    for (let s = 0; s <= 1; s += 0.004) { pset(Math.round(s * 320), Math.round(46 + s * 20 + Math.sin(s * Math.PI) * 10), hex('#1a1e30')); pset(Math.round(s * 320), Math.round(50 + s * 18 + Math.sin(s * Math.PI) * 12), hex('#1a1e30')); }
    return cr;
  });
  c_cieloVivo(R, t, P_HOR, true, cresta);
  // la torre de focos del vertedero, a lo lejos por el hueco, y un coche que va por allí con los faros
  pset(165, P_HOR - 2, CD.luzL); pset(164, P_HOR - 2, CD.luz); pset(166, P_HOR - 1, CD.luz);
  { R.recorte([151, P_HOR, 179, 127]); const u = (t * 0.12) % 1, x = Math.round(lerp(150, 182, u)); pset(x, P_HOR + 12, CD.luzL); pset(x + 1, P_HOR + 12, CD.luz); R.recorte(null); }
  // las ventanas de la imprenta, encendidas, con la rotativa que gira dentro y un operario que va y viene
  for (const [x0, y0, x1, y1] of [[68, 106, 94, 132], [120, 106, 146, 132], [72, 70, 82, 90], [134, 70, 144, 90]]) c_ventana(R, x0, y0, x1, y1, true, k, (a, b, c, d) => {
    if (d < 100) { if (Math.sin(t * 0.7 + a) > 0.3) R.disco(a + 5, b + 8, 2, CD.luzL); return; }
    // la rotativa por dentro: el volante grande de radios que gira y la banda de papel que corre
    { const cx = a + 9, cy = d - 6, an = t * 2; R.disco(cx, cy, 8, hex('#3a4a38')); R.disco(cx, cy, 6, CD.luzN); for (let i = 0; i < 4; i++) R.linea(cx, cy, Math.round(cx + Math.cos(an + i * Math.PI / 2) * 7), Math.round(cy + Math.sin(an + i * Math.PI / 2) * 7), hex('#3a4a38')); R.disco(cx, cy, 1.5, hex('#2a3428')); }
    for (let x = a; x <= c; x++) { const y = d - 15 + Math.round(Math.sin(x * 0.3) * 1); R.pset(x, y, (x + Math.floor(t * 12)) % 5 === 0 ? CD.papelS : CD.papel); R.pset(x, y + 1, CD.papelS); }
    const px = Math.round(a + 6 + (Math.sin(t * 0.8 + a) * 0.5 + 0.5) * 14); R.disco(px, b + 6, 2, hex('#5a3a2a')); R.linea(px, b + 8, px, b + 14, hex('#5a3a2a')); });
  // el cartel de neón del motel (sin letras): la flecha que se enciende por tramos y la estrella que parpadea
  { const x = 240, y = 40; rect(x + 14, y + 24, x + 16, 92, k(CD.aceroS)); rect(x, y, x + 32, y + 24, k(hex('#2a2a44'))); rect(x + 1, y + 1, x + 31, y + 23, k(hex('#3a3a5a')));
    const fallo = Math.sin(t * 13) > 0.85 && Math.sin(t * 1.3) > 0.3, est = !fallo;
    const estrella = [[16, 4], [15, 6], [17, 6], [13, 7], [14, 7], [18, 7], [19, 7], [15, 8], [17, 8], [14, 10], [18, 10]];
    for (const [i, j] of estrella) pset(x + i, y + j, est ? CD.neonAL : k(CD.neonA)); if (est) for (const [i, j] of estrella) { pset(x + i + 1, y + j, CD.neonA); }
    const tramos = Math.floor(t * 3) % 5; for (let i = 0; i < 26; i++) { const on = Math.floor(i / 6) <= tramos; pset(x + 3 + i, y + 16, on ? CD.neonRL : k(CD.neonR)); pset(x + 3 + i, y + 17, on ? CD.neonR : k(CD.neonR)); }
    for (let j = 0; j < 5; j++) { const on = tramos >= 4; pset(x + 28 - j, y + 14 - j, on ? CD.neonRL : k(CD.neonR)); pset(x + 28 - j, y + 18 + j, on ? CD.neonRL : k(CD.neonR)); }
    for (let i = 0; i < 6; i++) pset(x + 4 + i * 5, y + 21, Math.floor(t * 4 + i) % 2 ? CD.luzL : k(CD.luz));
    // el resplandor del neón en la fachada y el tejado
    for (let yy = y + 24; yy < y + 60; yy++) for (let xx = x - 10; xx < x + 44; xx++) { const d = Math.hypot(xx - x - 16, (yy - y - 14) * 0.8); if (d < 40 && c_umbral(xx, yy) < (est ? 0.18 : 0.08) - d / 400) pset(xx, yy, c_mezcla(R.pget(xx, yy), CD.neonR, 0.35)); } }
  // los charcos de la calzada: reflejan el neón del motel (rosa y azul, temblando) y la luz de la imprenta
  for (const [cx, cy, rx, col] of [[256, 158, 18, CD.neonR], [108, 160, 14, CD.luzN], [196, 174, 22, CD.neonA]]) for (let y = cy - 3; y <= cy + 3; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    if (((x - cx) / rx) ** 2 + ((y - cy) / 3.5) ** 2 > 1) continue; const on = col !== CD.neonR || Math.sin(t * 13) < 0.85, w = Math.sin(x * 0.5 + t * 3 + y) > 0.6;
    pset(x, y, c_mezcla(k(CD.asfaltoL), on ? col : k(col), w ? 0.55 : 0.3)); }
  // las ventanas del motel: una con la tele que cambia de color, otra que se enciende y se apaga
  { const tv = [hex('#6aa8ff'), hex('#a0d0ff'), hex('#5a7ad0'), hex('#c8e0ff')][Math.floor(t * 3.3) % 4]; R.rect(253, 114, 259, 121, c_mezcla(k(CD.vidrioS), tv, 0.5)); R.pset(254, 115, tv);
    if (Math.sin(t * 0.5) > -0.2) { R.rect(301, 114, 307, 121, CD.luzN); R.rect(302, 116, 306, 121, CD.luz); } }
  // las farolas con su cono de luz y las polillas
  for (const fx of [40, 196]) { rect(fx, 100, fx + 1, 148, k(CD.aceroS)); rect(fx, 98, fx + 8, 99, k(CD.aceroS)); rect(fx + 6, 100, fx + 9, 101, CD.luzL);
    for (let y = 102; y < 151; y++) { const d = y - 102, x0 = fx + 7 - d * 0.45, x1 = fx + 8 + d * 0.45; for (let x = Math.round(x0); x <= x1; x++) if (c_umbral(x, y) < 0.22 - d / 300) pset(x, y, c_mezcla(R.pget(x, y), CD.luz, 0.35)); }
    for (let i = 0; i < 3; i++) { const a = t * (3 + i) + i * 2; pset(Math.round(fx + 7 + Math.cos(a) * (3 + i)), Math.round(104 + Math.sin(a * 1.3) * 3), CD.luzL); } }
  // el gato sobre el muro bajo del hueco: se lame y mueve la cola
  { const x = 160, y = 127; rect(x, y - 3, x + 5, y, hex('#1c1c28')); rect(x + 5, y - 6, x + 8, y - 3, hex('#1c1c28')); pset(x + 5, y - 7, hex('#1c1c28')); pset(x + 8, y - 7, hex('#1c1c28'));
    pset(x + 7, y - 5, Math.sin(t * 0.9) > 0.9 ? hex('#1c1c28') : hex('#c8e05a')); const c = Math.round(Math.sin(t * 2) * 2); linea(x, y - 1, x - 3, y - 4 + c, hex('#1c1c28')); }
  return { suelo: 148, calzada: 172 };
}
// un coche de 1983 que cruza la calzada por delante (un sedán ancho con faros encendidos); x: su parte de atrás
function c_cocheCalle(R, x, s, t, dir) {
  const k = c_oscuro, c = hex('#b84a3a'), cS = hex('#7a2a20');
  R.poligono([[x, s - 9], [x + 10, s - 18], [x + 38, s - 18], [x + 48, s - 10], [x + 64, s - 9], [x + 64, s - 3], [x, s - 3]], k(c)); R.linea(x + 10, s - 18, x + 38, s - 18, k(hex('#e06a5a')));
  R.rect(x + 12, s - 17, x + 37, s - 11, k(CD.vidrioS)); R.rect(x + 24, s - 17, x + 25, s - 11, k(c)); R.linea(x + 14, s - 12, x + 19, s - 17, k(CD.vidrio));
  R.rect(x, s - 6, x + 64, s - 5, k(CD.cromo)); R.rect(x, s - 4, x + 64, s - 3, k(cS));
  for (const wx of [x + 13, x + 51]) c_rueda(R, wx, s - 3, 5, -x / 5, k);
  R.rect(x + 62, s - 9, x + 64, s - 7, CD.luzL); R.rect(x, s - 9, x + 1, s - 7, hex('#ff3a2a'));
  for (let xx = x + 65; xx < x + 130; xx++) { const d = xx - x - 65; for (let y = Math.round(s - 9 - d * 0.05); y <= s - 7 + d * 0.15; y++) if (c_umbral(xx, y) < 0.5 - d / 140) R.pset(xx, y, c_mezcla(R.pget(xx, y), CD.luz, 0.4)); }
}

// el periódico de 1983 visto de frente (sin letras): cabecera en barras, fecha en cifras, la foto del vertedero (la
// fosa, un camión y la sierra) y columnas de rayas. (x, y): arriba a la izquierda; w × hh
function c_periodico(R, x, y, w, hh, k = c_igual, fecha = true) {
  R.rect(x + 1, y + 1, x + w + 1, y + hh + 1, k(CD.papelS)); R.rect(x, y, x + w, y + hh, k(CD.papel));
  for (let i = 0; i < 8; i++) R.pset(x + Math.round(h(i, 1, 83) * w), y + Math.round(h(i, 2, 83) * hh), k(CD.papelS));
  R.rect(x + 2, y + 2, x + w - 2, y + 5, k(CD.tinta)); for (let xx = x + 3; xx < x + w - 2; xx += 4) R.pset(xx, y + 3, k(CD.papelS));
  R.rect(x + 2, y + 7, x + w - 2, y + 7, k(CD.tinta));
  if (fecha && w > 40) R.numero('1983', x + w - 20, y + 13, { tam: 8, fina: true, color: k(CD.tinta), sombra: false });
  const fx0 = x + 3, fy0 = y + 10, fx1 = x + Math.round(w * 0.62), fy1 = y + Math.round(hh * 0.58);
  R.rect(fx0 - 1, fy0 - 1, fx1 + 1, fy1 + 1, k(CD.tinta));
  // la foto: el cielo, la sierra, el llano, la fosa con las cajas y el volquete basculando (en grises, con trama)
  for (let yy = fy0; yy <= fy1; yy++) for (let xx = fx0; xx <= fx1; xx++) { const u = (yy - fy0) / Math.max(1, fy1 - fy0), v = (xx - fx0) / Math.max(1, fx1 - fx0), cr = 0.3 + 0.05 * Math.sin(v * 13) + 0.03 * Math.sin(v * 31);
    let c = u < cr ? hex('#d4d4d0') : u < 0.44 ? hex('#7a7a82') : hex('#b8b4ac');
    if (u > 0.6 && u < 0.86 && v > 0.06 && v < 0.6) c = (Math.round(v * 40) + Math.round(u * 20)) % 3 === 0 ? hex('#8a8a86') : hex('#48484e');
    if (u > 0.52 && u < 0.76 && v > 0.74 && v < 0.94) c = hex('#2e2e34'); if (u > 0.56 && u < 0.64 && v > 0.84 && v < 0.92) c = hex('#c8c8c4');
    if (v > 0.58 && v < 0.76 && u > 0.36 + (0.76 - v) * 0.9 && u < 0.62 + (0.76 - v) * 0.3) c = hex('#6a6a6e');
    if (u > 0.76 && u < 0.82 && ((v > 0.62 && v < 0.68) || (v > 0.86 && v < 0.92))) c = hex('#1a1a1e');
    if ((xx + yy) % 2 && u > cr) c = c_mezcla(c, hex('#ffffff'), 0.12); R.pset(xx, yy, k(c)); }
  for (let yy = fy0 + 2; yy < y + hh - 2; yy += 2) { if (yy <= fy1 + 1) { R.rect(fx1 + 3, yy, x + w - 3, yy, k(CD.papelS)); continue; } R.rect(x + 3, yy, x + Math.round(w / 2) - 2, yy, k(CD.papelS)); R.rect(x + Math.round(w / 2) + 1, yy, x + w - 3 - (yy % 6 === 0 ? 4 : 0), yy, k(CD.papelS)); }
}

function c_imprenta(R, t, o) {
  const { pset, linea, rect } = R, k = c_igual;
  c_fijo(R, 'imprenta', () => {
    // la pared de ladrillo, la ventana a la noche, el reloj, el calendario, estantes con latas de tinta y bobinas
    c_ladrillo(R, 0, 3, 319, 134, k); rect(0, 0, 319, 2, CD.cremaSS);
    { const X = 226; rect(X - 2, 52, X + 48, 96, CD.cremaSS); rect(X, 54, X + 46, 94, hex('#141a3a')); for (let i = 0; i < 20; i++) pset(X + 1 + Math.round(h(i, 1, 84) * 44), 55 + Math.round(h(i, 2, 84) * 22), hex('#8a94c0')); R.rect(X, 80, X + 46, 94, hex('#1e2244'));
    for (const [x, w, a] of [[4, 6, 10], [12, 8, 6], [24, 6, 12], [34, 10, 8]]) { rect(X + x, 94 - a, X + x + w, 94, hex('#262c4c')); if (a > 7) pset(X + x + 2, 94 - a + 3, CD.luz); }
    rect(X + 22, 54, X + 23, 94, CD.cremaSS); rect(X, 73, X + 46, 74, CD.cremaSS); rect(X - 4, 96, X + 50, 98, CD.crema); }
    // el reloj de pared
    R.disco(210, 30, 11, CD.tinta); R.disco(210, 30, 10, CD.papel); for (let i = 0; i < 12; i++) pset(Math.round(210 + Math.cos(i * Math.PI / 6) * 8), Math.round(30 + Math.sin(i * Math.PI / 6) * 8), CD.tinta);
    // el calendario de septiembre del 83 (cifras y la rejilla de días)
    const CX = 236, CY = 18; rect(CX, CY, CX + 30, CY + 36, CD.papelS); rect(CX + 1, CY + 1, CX + 29, CY + 35, CD.papel); rect(CX + 1, CY + 1, CX + 29, CY + 8, hex('#c8503a')); R.numero('9', CX + 5, CY + 7, { tam: 8, fina: true, color: CD.blanco, sombra: false }); R.numero('83', CX + 15, CY + 7, { tam: 8, fina: true, color: CD.blanco, sombra: false });
    for (let j = 0; j < 5; j++) for (let i = 0; i < 7; i++) rect(CX + 3 + i * 4, CY + 12 + j * 4, CX + 4 + i * 4, CY + 13 + j * 4, j * 7 + i === 15 ? hex('#c8503a') : CD.papelS);
    // los estantes con latas de tinta de colores y la caja de tipos
    for (const y of [70, 92]) { rect(6, y, 70, y + 2, CD.madera); rect(6, y + 2, 70, y + 2, CD.maderaS);
      for (let i = 0; i < 6; i++) { const x = 9 + i * 10, c = [hex('#2a2a34'), hex('#c8303a'), hex('#2a6ac8'), hex('#e8c830'), hex('#2a2a34'), hex('#3a9a4a')][(i + y) % 6]; rect(x, y - 10, x + 7, y - 1, CD.aceroL); rect(x, y - 7, x + 7, y - 3, c); rect(x, y - 10, x + 7, y - 10, CD.cromo); pset(x + 1, y - 9, CD.blanco); } }
    // las bobinas de papel apiladas a la izquierda, con sus capas
    for (const [cx, cy, r] of [[22, 146, 14], [50, 150, 12], [36, 124, 12]]) { R.disco(cx, cy, r, CD.papelS); R.disco(cx - 1, cy - 1, r - 1, CD.papel); for (let rr = 3; rr < r; rr += 3) for (let a = 0; a < 6.3; a += 0.15) pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), CD.papelS); R.disco(cx, cy, 2.5, CD.marron); }
    // el suelo de cemento pulido con manchas de tinta y juntas
    for (let y = 135; y < 180; y++) for (let x = 0; x < 320; x++) { let c = h(x >> 2, y >> 1, 85) < 0.2 ? CD.cementoS : CD.cemento; if (x % 64 === 0 || y === 150) c = CD.cementoS; if (y === 135) c = CD.cementoSS ?? CD.cementoS; pset(x, y, c); }
    for (let i = 0; i < 9; i++) R.disco(Math.round(70 + h(i, 1, 86) * 240), Math.round(150 + h(i, 2, 86) * 28), 1.5 + h(i, 3, 86) * 3, c_mezcla(CD.cemento, CD.tinta, 0.55));
    // la mesa de salida a la derecha con sus patas
    rect(226, 120, 300, 123, CD.madera); rect(226, 120, 300, 120, hex('#a8704a')); rect(226, 123, 300, 124, CD.maderaS); for (const x of [229, 296]) rect(x, 124, x + 2, 162, CD.maderaS);
    rect(230, 150, 298, 152, CD.maderaS);
  });
  // las lámparas verdes que cuelgan y se mecen un poco, con su luz (fuera de la barra del año: x 20–170)
  for (const lx of [10, 178]) { const m = Math.round(Math.sin(t * 0.8 + lx) * 1); linea(lx, 0, lx + m, 14, CD.tinta); R.poligono([[lx + m - 7, 20], [lx + m - 3, 14], [lx + m + 3, 14], [lx + m + 7, 20]], hex('#2a6a4a')); R.rect(lx + m - 7, 20, lx + m + 7, 20, hex('#1a4a30')); R.rect(lx + m - 2, 21, lx + m + 2, 21, CD.luzL);
    for (let y = 22; y < 120; y++) { const d = y - 22; for (let x = Math.round(lx + m - 6 - d * 0.35); x <= lx + m + 6 + d * 0.35; x++) if (c_umbral(x, y) < 0.14 - d / 900) pset(x, y, c_mezcla(R.pget(x, y), CD.luzL, 0.3)); } }
  // las agujas del reloj
  { const a = t * 0.5 - Math.PI / 2, b = t * 0.04 + 1; linea(210, 30, Math.round(210 + Math.cos(a) * 7), Math.round(30 + Math.sin(a) * 7), CD.tinta); linea(210, 30, Math.round(210 + Math.cos(b) * 5), Math.round(30 + Math.sin(b) * 5), CD.tinta); pset(210, 30, hex('#c8503a')); }
  // LA ROTATIVA: el bastidor de hierro verde con remaches, los rodillos que giran y la banda de papel que corre
  const H = CD.hierro, HL = CD.hierroL, HS = CD.hierroS;
  rect(76, 50, 226, 136, HS); rect(78, 52, 224, 134, H); rect(78, 52, 224, 54, HL); rect(78, 52, 80, 134, HL);
  for (let x = 84; x < 224; x += 10) { pset(x, 56, HL); pset(x, 130, HS); }
  rect(70, 134, 232, 140, HS); rect(70, 134, 232, 134, HL);
  // los huecos del bastidor, oscuros, por donde se ven los rodillos
  rect(86, 62, 216, 120, hex('#1a2620'));
  for (let x = 92; x < 214; x += 12) { rect(x, 62, x + 1, 120, hex('#22322a')); pset(x, 62, HS); }   // los tirantes del fondo
  for (const y of [70, 92, 114]) { rect(86, y, 216, y + 1, hex('#2a3a30')); rect(86, y, 216, y, hex('#3a4a40')); }
  for (let i = 0; i < 4; i++) { const x = 134 + i * 2, f = Math.floor(t * 6 + i) % 4; for (let y = 64; y < 118; y += 4) pset(x, y + f, hex('#5a5a50')); }   // la cadena de transmisión que corre
  R.disco(204, 66, 4, CD.aceroS); R.disco(204, 66, 3, CD.papel); linea(204, 66, Math.round(204 + Math.cos(t) * 2), Math.round(66 + Math.sin(t) * 2), CD.tinta);   // el manómetro
  for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1; pset(118 + i * 40, Math.round(84 + u * 30), CD.tinta); }   // gotas de tinta
  const giro = t * 4;
  const rodillos = [[100, 76, 9], [124, 76, 9], [148, 76, 9], [172, 76, 9], [196, 76, 9], [112, 104, 8], [160, 104, 8], [204, 104, 7]];
  // la banda de papel en zigzag entre los rodillos, con rayas que corren
  const banda = [[86, 92], [100, 86], [124, 66], [148, 86], [172, 66], [196, 86], [204, 96], [208, 112], [216, 116]];
  for (let i = 0; i + 1 < banda.length; i++) { const [x0, y0] = banda[i], [x1, y1] = banda[i + 1]; linea(x0, y0, x1, y1, (x, y, n) => ((n + Math.floor(t * 20)) % 6 < 2 ? CD.papelS : CD.papel)); linea(x0, y0 + 1, x1, y1 + 1, CD.papelS); }
  for (const [cx, cy, r] of rodillos) { R.disco(cx, cy, r, CD.aceroS); R.disco(cx, cy, r - 1, CD.acero); R.disco(cx - 2, cy - 2, r - 4, CD.aceroL);
    for (let i = 0; i < 3; i++) { const a = giro * (r > 8 ? 1 : -1.2) + i * 2.1; linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), CD.aceroS); } R.disco(cx, cy, 2, CD.tinta); }
  // los tinteros: rodillos negros de tinta brillante encima
  for (const x of [112, 160]) { R.disco(x, 64, 5, CD.tinta); pset(x - 2, 62, CD.aceroL); }
  // engranajes grandes en el lado, que giran
  for (const [cx, cy, r, s] of [[96, 124, 10, 1], [118, 128, 6, -1.6]]) { R.disco(cx, cy, r, HS); R.disco(cx, cy, r - 2, HL); for (let i = 0; i < 10; i++) { const a = t * s + i * Math.PI / 5; R.rect(Math.round(cx + Math.cos(a) * r) - 1, Math.round(cy + Math.sin(a) * r) - 1, Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), HS); } R.disco(cx, cy, 2, CD.tinta); }
  // el panel de mandos con pilotos que parpadean y la palanca
  rect(84, 40, 120, 50, HS); rect(85, 41, 119, 49, hex('#2a3a30')); for (let i = 0; i < 5; i++) pset(88 + i * 6, 44, Math.floor(t * 2 + i * 0.7) % 3 === 0 ? hex('#ff4a3a') : hex('#4ae05a')); rect(110, 42, 111, 47, CD.cromo); R.disco(111, 42, 1.5, hex('#d0383a'));
  // la salida: los periódicos que caen doblados a la pila de la mesa
  const n0 = Math.floor(t * 1.4); for (let i = 0; i < 2; i++) { const u = (t * 1.4 + i * 0.5) % 1, x = Math.round(lerp(216, 250, u)), y = Math.round(lerp(116, 112 - (n0 % 3), u)); R.rect(x - 8, y - 2, x + 8, y + 1, CD.papel); R.rect(x - 8, y - 2, x + 8, y - 2, CD.papelS); R.rect(x - 6, y - 1, x - 2, y, CD.tinta); }
  { const alto = 10 + (n0 % 3); for (let j = 0; j < alto; j++) { const dx = Math.round(h(j, 1, 87) * 3) - 1; rect(238 + dx, 119 - j, 290 + dx, 119 - j, j % 2 ? CD.papel : CD.papelS); } c_periodico(R, 240, 119 - alto - 30, 48, 30, k); }
  // vapor de tinta y papel que se levanta
  for (let i = 0; i < 4; i++) { const u = (t * 0.35 + i / 4) % 1; R.disco(Math.round(150 + i * 14 + Math.sin(t + i) * 3), Math.round(48 - u * 30), 1 + u * 3, c_mezcla(CD.ladrillo, CD.papel, 0.35 * (1 - u))); }
  // o.sale: el periódico que sale de la máquina y se posa delante, de frente, grande
  if (o.sale != null) { const s = Math.min(1, Math.max(0, o.sale)), x = Math.round(lerp(220, 150, s)), y = Math.round(lerp(110, 132, s)), w = Math.round(lerp(18, 64, s)), hh = Math.round(lerp(12, 44, s)); c_periodico(R, x, y, w, hh, k, s > 0.6); }
  return { suelo: 162, mesa: [226, 120, 300, 162] };
}
// la excavadora de cadenas amarilla (mira a la izquierda): las cadenas con sus rodillos que corren, la tornamesa, la
// cabina de cristal, el contrapeso, la pluma y el balancín con sus cilindros cromados y la cuchara con dientes. x: la
// punta izquierda de las cadenas; e: escala; fase 0–1: el ciclo del brazo (baja, cava, sube con carga, gira); carga:
// cuántos cartuchos asoman de la cuchara
function c_excavadora(R, x, s, t, k, e, fase, o = {}) {
  const P = (u, v) => [x + u * e, s - v * e], poli = (pts, c) => R.poligono(pts.map(([u, v]) => P(u, v)), c);
  // las cadenas
  poli([[0, 4], [4, 0], [56, 0], [60, 4], [56, 12], [4, 12]], k(CD.chasis)); poli([[3, 4], [6, 2], [54, 2], [57, 4], [54, 10], [6, 10]], k(CD.neumL));
  for (let i = 0; i < 6; i++) { const [rx, ry] = P(8 + i * 9, 5); R.disco(rx, ry, 2.2 * e, k(CD.aceroS)); R.disco(rx, ry, 1 * e, k(CD.aceroL)); }
  for (let i = 0; i < 14; i++) { const u = ((i * 4.6 - (o.anda ? t * 8 : 0)) % 64 + 64) % 64; if (u < 56) { const [a, b] = P(2 + u, 12); R.pset(a, b, k(CD.aceroS)); const [c, d] = P(2 + u, 0); R.pset(c, d, k(CD.aceroS)); } }
  // la tornamesa y la caja superior
  poli([[10, 12], [52, 12], [52, 15], [10, 15]], k(CD.chasis));
  poli([[8, 15], [62, 15], [62, 32], [30, 32], [30, 36], [8, 36]], k(CD.amar)); poli([[8, 15], [62, 15], [62, 18], [8, 18]], k(CD.amarS));
  poli([[44, 18], [62, 18], [62, 31], [44, 31]], k(CD.amarS)); for (let i = 0; i < 4; i++) poli([[46 + i * 4, 21], [48 + i * 4, 21], [48 + i * 4, 28], [46 + i * 4, 28]], k(CD.chasis));
  poli([[30, 31], [62, 31], [62, 32], [30, 32]], k(CD.amarL));
  // la cabina con cristales, el operario y el reflejo del sol
  poli([[8, 36], [26, 36], [28, 52], [10, 52]], k(CD.chasis)); poli([[10, 38], [25, 38], [26, 50], [11, 50]], k(CD.vidrio));
  { const [a, b] = P(12, 40), [c, d] = P(18, 50); R.linea(a, b, c, d, k(CD.vidrioL)); } if (o.conductor !== false) poli([[16, 40], [21, 40], [21, 47], [16, 47]], k(CD.vidrioS));
  poli([[8, 52], [28, 52], [28, 54], [8, 54]], k(CD.amar));
  { const [a, b] = P(36, 32); R.rect(a, b - 8 * e, a + Math.max(1, e), b, k(CD.chasis)); c_humo(R, a + 1, b - 9 * e, t, k, e * 0.8); }
  const bal = Math.sin(t * 8) > 0; { const [a, b] = P(17, 54); R.rect(a - e, b - 2 * e, a + e, b, bal ? CD.luzN : k(hex('#a85a1a'))); }
  // el brazo: la pluma (desde el pie, x 26, y 30) y el balancín, por el ciclo de cavado
  const f = fase % 1, cav = f < 0.35 ? f / 0.35 : f < 0.5 ? 1 : f < 0.85 ? 1 - (f - 0.5) / 0.35 : 0;   // 1 = abajo, en la fosa
  const aB = lerp(2.05, 2.55, cav), fi = lerp(-2.6, -1.75, cav), aC = fi + lerp(-1.1, 0.5, f < 0.5 ? cav : cav * 0.3);
  const pie = [24, 30], L1 = 46, L2 = 40, codo = [pie[0] + Math.cos(aB) * L1, pie[1] + Math.sin(aB) * L1], muneca = [codo[0] + Math.cos(fi) * L2, codo[1] + Math.sin(fi) * L2];
  const viga = (p, q, a0, a1) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l;
    poli([[p[0] + nx * a0, p[1] + ny * a0], [q[0] + nx * a1, q[1] + ny * a1], [q[0] - nx * a1, q[1] - ny * a1], [p[0] - nx * a0, p[1] - ny * a0]], k(CD.amar));
    const [a, b] = P(p[0] + nx * a0, p[1] + ny * a0), [c, d] = P(q[0] + nx * a1, q[1] + ny * a1); R.linea(a, b, c, d, k(CD.amarL)); const [g, hh] = P(p[0] - nx * a0, p[1] - ny * a0), [i, j] = P(q[0] - nx * a1, q[1] - ny * a1); R.linea(g, hh, i, j, k(CD.amarS)); };
  // la pluma de dos tramos (sube y se acoda) y el balancín
  const cumbre = [(pie[0] + codo[0]) / 2 + 3, (pie[1] + codo[1]) / 2 + 9];
  viga(pie, cumbre, 4, 3.5); viga(cumbre, codo, 3.5, 3); viga(codo, muneca, 2.6, 2);
  // los cilindros hidráulicos cromados
  { const [a, b] = P(30, 20), [c, d] = P(cumbre[0] + 2, cumbre[1] - 4); R.linea(a, b, c, d, k(CD.cromo)); R.linea(a + 1, b, c + 1, d, k(CD.cromoS)); const [g, hh] = P(cumbre[0], cumbre[1] + 2), [i, j] = P(codo[0] + 2, codo[1] + 5); R.linea(g, hh, i, j, k(CD.cromo)); }
  for (const p of [pie, cumbre, codo]) { const [a, b] = P(p[0], p[1]); R.disco(a, b, 1.6 * e, k(CD.aceroS)); }
  // la cuchara con sus dientes, girada por aC; la tierra y lo que lleva dentro cuando sube cargada
  const ca = Math.cos(aC), sa = Math.sin(aC), Q = (u, v) => [muneca[0] + u * ca - v * sa, muneca[1] + u * sa + v * ca];
  const cuch = [Q(0, 3), Q(0, -3), Q(9, -5), Q(13, 0), Q(10, 4)];
  poli(cuch, k(CD.amarS)); poli([Q(1, 2), Q(1, -2), Q(8, -3.5), Q(10, 0)], k(CD.amar));
  for (let i = 0; i < 3; i++) { const [a, b] = P(...Q(13 + 1.5, -1.5 + i * 1.5)); R.pset(a, b, k(CD.cromo)); }
  const lleva = f > 0.4 && f < 0.95; if (lleva) { const [a, b] = P(...Q(5, -4)); R.disco(a, b, 3.2 * e, k(CD.tierra)); R.disco(a - e, b - e, 2 * e, k(CD.tierraL)); if (e >= 0.9) { c_cartuchito(R, a - 3, b - 1, 1, k); R.rect(a + 2, b - 4, a + 5, b - 2, k(CD.carton)); } }
  // la tierra que cae de la cuchara al subir
  if (lleva && f < 0.8 && e >= 0.9) { const [a, b] = P(...Q(10, 2)); for (let i = 0; i < 6; i++) { const u = (t * 2.2 + i / 6) % 1; R.pset(a + Math.round(Math.sin(i * 3) * 2), Math.round(b + u * 16), k(i % 2 ? CD.tierra : CD.tierraL)); } }
  return { cuchara: P(...Q(6, 0)) };
}

const X_HOR = 76;

// el público del fondo (detrás de la valla de lejos), con camisetas de colores retro: [x, y, color, semilla]
const X_PUB = []; { const cols = ['#d0383a', '#3a6ad8', '#e8c840', '#3a9a4a', '#e8803a', '#8a4ab8', '#2a2a34', '#f0f0f0', '#2aa8a0'].map(hex); for (let i = 0; i < 46; i++) { const lado = i < 28, x = lado ? 4 + Math.round(h(i, 1, 90) * 100) : 252 + Math.round(h(i, 1, 90) * 64); X_PUB.push([x, 136 + Math.round(h(i, 2, 90) * 6), cols[i % cols.length], i]); } X_PUB.sort((a, b) => a[1] - b[1]); }

function c_excavacion(R, t, o) {
  const { pset, linea, rect } = R, k = c_igual;
  const cresta = c_fijo(R, 'exc14', () => {
    c_cieloFijo(R, X_HOR, false); const cr = c_sierra(R, X_HOR, k); c_llanura(R, X_HOR, 180, k);
    R.rect(0, X_HOR + 3, 319, X_HOR + 4, CD.asfaltoL); for (let x = 0; x < 320; x += 6) pset(x, X_HOR + 3, CD.amarL);
    // la excavación: el hoyo irregular con la pared de capas de basura de 1983 (cartón, plástico de colores, papeles)
    for (let y = 100; y < 146; y++) for (let x = 80; x < 250; x++) { const bx = 80 + (146 - y) * 0.2 + Math.sin(y * 0.3) * 2, ex = 250 - (146 - y) * 0.15 - Math.sin(y * 0.25) * 2, top = 100 + Math.sin(x * 0.07) * 2 + h(x >> 3, 1, 91) * 2;
      if (x < bx || x > ex || y < top) continue; const capa = Math.floor((y - top + Math.sin(x * 0.05) * 2) / 5); let c = [CD.tierraL, CD.tierra, CD.estrato, CD.tierraS, CD.tierra, CD.tierraSS, CD.tierraS, CD.tierraSS, CD.tierraSS][Math.max(0, Math.min(8, capa))];
      const n = h(x, y, 92); if (capa >= 2 && n < 0.1) c = [CD.cajaR, CD.vidrio, CD.carton, CD.papel, hex('#3a9a4a'), CD.amar][Math.floor(n * 60) % 6]; else if (capa >= 2 && n < 0.16) c = CD.cartonL;
      if (y > 136) c = h(x >> 1, y, 93) < 0.4 ? CD.tierraSS : CD.tierraS; pset(x, y, c); }
    // los montones de tierra y basura sacada, con su lado al sol y en sombra
    for (const [cx, w, alto, sem] of [[60, 28, 22, 1], [270, 34, 18, 2], [168, 22, 8, 3]]) for (let i = -w; i <= w; i++) { const top = Math.round((cx === 168 ? 100 : 118) - alto * Math.cos(i / w * Math.PI / 2) ** 1.4 - h(i, sem, 94) * 2);
      for (let y = top; y < (cx === 168 ? 101 : 120); y++) { const n = h(cx + i, y, 95); pset(cx + i, y, n < 0.06 ? [CD.cajaR, CD.vidrio, CD.papel, CD.cartonL][Math.floor(n * 100) % 4] : y === top ? CD.tierraL : i < -w * 0.2 ? (n < 0.5 ? CD.tierraL : CD.tierra) : (n < 0.4 ? CD.tierraS : CD.tierra)); } }
    // roderas de las cadenas en la tierra
    for (let x = 180; x < 320; x++) for (const y of [130, 133, 152, 155]) if (x % 3) pset(x, y + Math.round((x - 180) * 0.02), CD.arenaS);
    // la valla de lejos (la del público), postes y la cinta
    for (let x = 0; x < 320; x++) { if (x > 108 && x < 250) continue; pset(x, 142, CD.aceroS); if (x % 10 === 0) rect(x, 138, x, 146, CD.aceroS); }
    // las matas y piedras del primer término
    for (let i = 0; i < 26; i++) { const y = Math.round(X_HOR + 6 + h(i, 1, 96) ** 1.6 * 70), x = Math.round(h(i, 2, 96) * 319); if (x > 40 && x < 300 && y > 92 && y < 150) continue; c_mata(R, x, y, 1 + (y - X_HOR) / 22, k, i); }
    for (let i = 0; i < 4; i++) c_yuca(R, [12, 296, 34, 310][i], [104, 106, 92, 96][i], 0, k, 0.6);
    return cr;
  });
  c_cieloVivo(R, t, X_HOR, false, cresta);
  // las carpas blancas con sus banderines y la gente debajo
  for (const [x0, x1, top] of [[4, 52, 98], [56, 104, 102]]) { const s = 128;
    for (let y = top; y < top + 8; y++) { const u = (y - top) / 8; R.poligono([[x0 + (x1 - x0) / 2 - (x1 - x0) / 2 * u - 2, y], [x0 + (x1 - x0) / 2 + (x1 - x0) / 2 * u + 2, y], [x0 + (x1 - x0) / 2 + (x1 - x0) / 2 * u + 2, y + 1], [x0 + (x1 - x0) / 2 - (x1 - x0) / 2 * u - 2, y + 1]], y < top + 3 ? CD.blanco : CD.lona); }
    for (let x = x0 - 2; x <= x1 + 2; x++) { const o2 = Math.round(Math.sin(t * 5 + x * 0.5) * 0.7); pset(x, top + 8 + o2, CD.lonaS); pset(x, top + 9 + ((x >> 2) % 2) + o2, CD.lonaS); }
    rect(x0, top + 10, x1, s, c_mezcla(CD.arena, CD.arenaSS, 0.45)); for (const x of [x0, x1]) rect(x, top + 8, x, s, CD.aceroL);
    linea(x0 + (x1 - x0) / 2, top - 6, x0 + (x1 - x0) / 2, top, CD.aceroS); for (let i = 0; i < 5; i++) pset(x0 + (x1 - x0) / 2 + 1 + i, top - 6 + Math.round(Math.sin(t * 6 - i) * (i / 4)) + (i > 2 ? 1 : 0), [CD.cajaR, CD.amar][i % 2]);
    rect(x0 + 4, s - 6, x1 - 4, s - 5, CD.mesa); for (const x of [x0 + 5, x1 - 5]) rect(x, s - 4, x, s, CD.mesaSS);
    for (let i = 0; i < 3; i++) c_persona(R, x0 + 10 + i * 14, s, t, [CD.cajaR, CD.lonaA, CD.amar][(i + x0) % 3], i + x0, k, { mano: i === 1, gorra: i === 2 ? CD.tinta : null }); }
  // las cámaras de televisión en trípode, con el piloto rojo y su operador
  for (const [cx, sem] of [[118, 1], [140, 2]]) { const s = 136; linea(cx, s - 10, cx - 4, s, CD.chasis); linea(cx, s - 10, cx + 4, s, CD.chasis); linea(cx, s - 10, cx, s, CD.aceroS);
    rect(cx - 5, s - 15, cx + 4, s - 10, CD.chasis); rect(cx - 8, s - 14, cx - 5, s - 11, CD.aceroS); pset(cx - 8, s - 13, CD.vidrioL); rect(cx - 3, s - 17, cx + 2, s - 16, CD.aceroS); if (Math.floor(t * 1.5 + sem) % 2) pset(cx + 3, s - 14, hex('#ff3a3a'));
    c_persona(R, cx + 9, s, t, CD.tinta, sem + 7, k, { gorra: CD.cajaR }); }
  // la excavadora pequeña del fondo, que va y viene con tierra
  { const x = Math.round(196 + Math.sin(t * 0.25) * 14); c_excavadora(R, x, 98, t, k, 0.4, (t * 0.2) % 1, { anda: true }); }
  // el público del fondo detrás de su valla: saltan, saludan y graban con el móvil
  for (const [x, y, c, sem] of X_PUB) c_persona(R, x, y, t, c, sem, k, { mano: sem % 4 === 0, movil: sem % 8 === 0 });
  // la excavadora grande en el borde, que cava en la fosa
  const fase = o.excavadora ?? (t * 0.16) % 1; c_excavadora(R, 214, 128, t, k, 1, fase, o);
  // un dron que vigila la excavación
  { const x = Math.round(150 + Math.sin(t * 0.4) * 40), y = Math.round(56 + Math.sin(t * 1.1) * 3); rect(x - 2, y, x + 2, y + 1, CD.chasis); for (const dx of [-4, 4]) { rect(x + dx - (Math.floor(t * 20) % 2 ? 2 : 1), y - 1, x + dx + (Math.floor(t * 20) % 2 ? 2 : 1), y - 1, CD.aceroL); linea(x, y, x + dx, y - 1, CD.chasis); } if (Math.floor(t * 2) % 2) pset(x, y + 2, hex('#4ae05a')); }
  // el polvo que levanta la excavadora y se lleva el viento a la derecha
  for (let i = 0; i < 8; i++) { const u = (t * 0.22 + i / 8) % 1, x = Math.round(150 + u * 150), y = Math.round(128 - u * 30 + Math.sin(t + i) * 3), r = 2 + u * 7;
    for (let yy = Math.round(y - r); yy <= y + r; yy++) for (let xx = Math.round(x - r); xx <= x + r; xx++) if (Math.hypot(xx - x, yy - y) < r && c_umbral(xx, yy) < 0.4 * (1 - u)) pset(xx, yy, c_mezcla(R.pget(xx, yy), CD.arenaL, 0.5)); }
  return { suelo: 160, fosa: [84, 100, 244, 142] };
}
// la valla de obra de delante (barandillas metálicas galvanizadas, de lado a lado, y 150–166) y el público de espaldas
// de abajo, con camisetas de colores, que se mueve y levanta los móviles
function c_vallaObra(R, t) {
  const { rect, linea, pset } = R;
  for (let x0 = -8; x0 < 320; x0 += 44) { rect(x0 + 2, 150, x0 + 42, 151, CD.aceroL); rect(x0 + 2, 152, x0 + 42, 152, CD.aceroS); rect(x0 + 2, 163, x0 + 42, 164, CD.aceroS);
    for (let x = x0 + 4; x < x0 + 42; x += 3) { linea(x, 152, x, 163, CD.acero); pset(x, 153, CD.aceroL); }
    rect(x0 + 2, 150, x0 + 3, 166, CD.aceroS); rect(x0 + 41, 150, x0 + 42, 166, CD.aceroS); linea(x0 + 2, 166, x0 - 2, 170, CD.aceroS); linea(x0 + 42, 166, x0 + 46, 170, CD.aceroS); }
  // una cinta de plástico atada a la valla que ondea
  for (let i = 0; i < 9; i++) pset(108 + i, 152 + Math.round(Math.sin(t * 7 - i * 0.7) * (i / 5)), i % 2 ? CD.cajaR : CD.blanco);
  // el público de espaldas, abajo: cabezas y hombros que se mueven, algún móvil levantado
  const cols = ['#d0383a', '#3a6ad8', '#e8c840', '#3a9a4a', '#2a2a34', '#e8803a', '#8a4ab8', '#f0f0f0'].map(hex), pelos = [CD.pelo, hex('#6a4020'), hex('#c8a060'), hex('#1a1414')];
  for (let i = 0; i < 13; i++) { const x = 6 + i * 25 + Math.round(h(i, 1, 97) * 8), b = Math.round(Math.sin(t * 2.4 + i * 1.3) * 1.2), y = 168 + b + (i % 2) * 3, c = cols[i % cols.length];
    R.poligono([[x - 9, 181], [x - 8, y + 4], [x - 4, y + 2], [x + 4, y + 2], [x + 8, y + 4], [x + 9, 181]], c); linea(x - 8, y + 4, x - 4, y + 2, c_mezcla(c, CD.blanco, 0.3)); rect(x - 2, y + 6, x + 2, 181, c_mezcla(c, CD.negro, 0.15));
    R.disco(x, y - 2, 4.5, pelos[i % 4]); R.disco(x - 1, y - 3, 2.5, c_mezcla(pelos[i % 4], CD.blanco, 0.15)); if (i % 3 === 0) { R.rect(x - 5, y - 6, x + 4, y - 4, cols[(i + 3) % 8]); R.rect(x - 5, y - 4, x - 7, y - 4, cols[(i + 3) % 8]); }
    if (i % 4 === 1 && Math.sin(t * 0.7 + i) > -0.3) { linea(x + 6, y + 3, x + 9, y - 8, CD.piel); rect(x + 8, y - 13, x + 11, y - 8, CD.chasis); pset(x + 9, y - 12, CD.vidrioL); } }
}

function c_pala(R, t, o) {
  const { pset, linea, rect } = R, k = c_igual, sa = Math.min(1, Math.max(0, o.saca ?? (t * 0.18) % 1));
  c_fijo(R, 'pala', () => {
    // arriba, el cielo y el borde de la fosa con el público asomado (detrás) y la pared de capas de basura
    c_cieloFijo(R, 34, false, [40, 10, 5]);
    for (let x = 0; x < 320; x++) for (let y = 26; y < 34; y++) pset(x, y, h(x >> 1, y, 98) < 0.3 ? CD.sierraS : CD.sierra);
    // la llanura lejana entre la sierra y el borde de la fosa (donde el borde baja)
    for (let x = 0; x < 320; x++) for (let y = 34; y < 42; y++) pset(x, y, y === 34 ? CD.arenaS : h(x >> 1, y, 97) < 0.25 ? CD.arenaS : CD.arenaM);
    for (let y = 30; y < 180; y++) for (let x = 0; x < 320; x++) { const top = 36 + Math.round(Math.sin(x * 0.05) * 3); if (y < top) continue;
      const capa = Math.floor((y - top + Math.sin(x * 0.04) * 4) / 12); let c = [CD.arenaM, CD.tierraL, CD.estrato, CD.tierra, CD.tierraS, CD.tierra, CD.tierraS, CD.tierraSS, CD.tierraSS, CD.tierraSS, CD.tierraSS, CD.tierraSS][Math.max(0, Math.min(11, capa))];
      if (y === top) c = CD.arenaL; const n = h(x >> 1, y >> 1, 99); if (capa >= 3 && n < 0.006) c = [CD.cajaR, CD.vidrio, CD.cartonL, CD.papel, hex('#3a9a4a'), CD.amar][Math.floor(n * 1000) % 6]; else if (n > 0.8) c = c_mezcla(c, CD.negro, 0.12);
      if ((y - top + Math.round(Math.sin(x * 0.04) * 4)) % 12 === 0 && capa > 0) c = c_mezcla(c, CD.negro, 0.25); pset(x, y, c); }
    // trozos de cajas y periódicos enterrados en la pared
    for (let i = 0; i < 12; i++) { const x = Math.round(h(i, 4, 100) * 300), y = Math.round(80 + h(i, 5, 100) * 90); R.rect(x, y - 4, x + 3, y, [CD.cajaR, CD.aceroL, hex('#3a9a4a')][i % 3]); R.rect(x, y - 4, x + 3, y - 4, CD.cromo); pset(x + 1, y - 3, CD.blanco); }   // latas y botes
    for (let i = 0; i < 34; i++) { const x = Math.round(h(i, 1, 100) * 310), y = Math.round(70 + h(i, 2, 100) * 105), w = 8 + Math.round(h(i, 3, 100) * 12); R.poligono([[x, y], [x + w, y + 1], [x + w - 1, y - 4], [x + 1, y - 5]], i % 3 ? CD.cartonS : CD.papelS); linea(x + 1, y - 5, x + w - 1, y - 4, i % 3 ? CD.carton : CD.papel); }
    // el saliente de abajo a la izquierda donde están los arqueólogos
    for (let y = 172; y < 180; y++) for (let x = 0; x < 110; x++) pset(x, y, y === 172 ? CD.arenaL : h(x, y, 101) < 0.3 ? CD.arenaS : CD.arenaM);
  });
  // el público asomado al borde de arriba, pequeño y a contraluz
  for (let i = 0; i < 18; i++) { const x = 8 + i * 15 + Math.round(h(i, 1, 102) * 6); if (x > 266) continue; c_persona(R, x, 38 + Math.round(Math.sin(x * 0.05) * 3), t, [CD.cajaR, CD.lonaA, CD.amar, hex('#3a9a4a'), CD.tinta][i % 5], i, k, { mano: i % 3 === 0, movil: i % 6 === 0 }); }
  // la cuchara vista de frente: sube desde la fosa (saca 0) hasta media altura (saca 1), cargada y algo inclinada
  const bx = 170, by = Math.round(lerp(198, 112, sa)), ang = lerp(0.14, -0.08, sa), ca = Math.cos(ang), sn = Math.sin(ang);
  const Q = (u, v) => [bx + u * ca - v * sn, by + u * sn + v * ca];
  // el balancín (sube recto, entre las dos orejas) y el cilindro cromado, fuera de las esquinas tranquilas
  R.poligono([Q(-16, -50), Q(12, -50), [236, by - 150], [212, by - 150]], CD.amarS); R.poligono([Q(-12, -50), Q(8, -50), [232, by - 150], [216, by - 150]], CD.amar); linea(...Q(-12, -50), 216, by - 150, CD.amarL);
  for (let j = 0; j < 5; j++) { const f = (j + 1) / 6, x = Math.round(lerp(Q(-2, -50)[0], 224, f)), y = Math.round(lerp(Q(-2, -50)[1], by - 150, f)); R.disco(x - 6, y, 1.2, CD.amarSS); R.disco(x + 6, y, 1.2, CD.amarSS); pset(x - 7, y - 1, CD.amarL); }
  for (const dx of [-9, -7]) linea(...Q(-14 + dx * 0.2, -48), 212 + dx, by - 150, (x, y, n) => (n % 9 < 1 ? CD.aceroS : CD.chasis));   // las mangueras hidráulicas
  { const [x, y] = Q(-2, -50); R.poligono([[x - 13, y - 6], [x + 9, y - 6], [x + 11, y + 2], [x - 15, y + 2]], CD.amarS); linea(x - 13, y - 6, x + 9, y - 6, CD.amarL); }
  linea(...Q(24, -46), 252, by - 150, CD.cromo); linea(...Q(25, -46), 253, by - 150, CD.cromoS); linea(...Q(23, -46), 251, by - 150, CD.aceroL);
  // las orejas con sus bulones
  for (const u of [-24, 16]) { R.poligono([Q(u, -30), Q(u + 8, -30), Q(u + 7, -52), Q(u + 1, -52)], CD.amarS); R.disco(...Q(u + 4, -46), 3.5, CD.aceroS); R.disco(...Q(u + 4, -46), 1.6, CD.aceroL); }
  // la carga: un montón de tierra por encima del borde, con cartuchos, una caja rota y un periódico
  const carga = (x, y) => { const g = h(x >> 1, y >> 1, 104); return g < 0.28 ? CD.tierraS : g > 0.86 ? CD.tierraL : CD.tierra; };
  R.poligono([Q(-50, -27), Q(-44, -36), Q(-30, -42), Q(-14, -47), Q(4, -46), Q(22, -43), Q(38, -37), Q(50, -27)], carga);
  for (let i = 0; i < 9; i++) { const [x, y] = Q(-42 + i * 10, -38 + Math.abs(i - 4) * 2); R.disco(Math.round(x), Math.round(y), 2, i % 2 ? CD.tierraL : CD.tierraS); }
  { const [x, y] = Q(-26, -36); R.poligono([[x - 10, y + 6], [x + 8, y], [x + 11, y + 9], [x - 8, y + 13]], CD.carton); linea(x - 10, y + 6, x + 8, y, CD.cartonL); linea(x + 8, y, x + 11, y + 9, CD.cartonS); R.rect(Math.round(x) - 3, Math.round(y) + 5, Math.round(x), Math.round(y) + 8, CD.chasis); pset(Math.round(x) - 2, Math.round(y) + 6, CD.amar); }
  { const [x, y] = Q(28, -38); R.poligono([[x - 6, y - 2], [x + 8, y - 6], [x + 10, y + 5], [x - 4, y + 8]], CD.papel); for (let j = 0; j < 4; j++) linea(x - 3, y + j * 2, x + 8, y - 3 + j * 2, CD.papelS); R.rect(Math.round(x) - 3, Math.round(y) - 1, Math.round(x) + 2, Math.round(y), CD.tinta); }
  for (const [u, v, col, ic, es] of [[-40, -28, 'verde', 'flor', 1], [42, -27, 'naranja', 'comecocos', 1], [-6, -36, 'rojo', 'foso', 2], [14, -32, 'azul', 'nave', 2]]) { const [x, y] = Q(u, v); PIEZAS_AT.cartucho ? PIEZAS_AT.cartucho(R, Math.round(x), Math.round(y), { s: es, color: col, icono: ic }) : c_cartuchito(R, x, y, 1, k); }
  // el cuerpo: chapa amarilla gastada con la luz arriba, costuras soldadas, roces de acero, barro y óxido
  R.poligono([Q(-52, -29), Q(52, -29), Q(56, 0), Q(46, 24), Q(-46, 24), Q(-56, 0)], CD.amarSS);
  R.poligono([Q(-49, -27), Q(49, -27), Q(53, 0), Q(44, 21), Q(-44, 21), Q(-53, 0)], (x, y) => { const v = (y - by) / 48 + 0.5, g = h(x >> 1, y >> 1, 103), r = h(x >> 2, y >> 2, 113);
    if (r < 0.06) return CD.tierraS; if (g < 0.07) return CD.aceroL; if (r > 0.95) return hex('#a8582a'); return v < 0.22 ? CD.amarL : v > 0.8 ? CD.amarS : (x + y) % 11 === 0 ? CD.amarS : CD.amar; });
  linea(...Q(-49, -27), ...Q(49, -27), CD.amarSS); linea(...Q(-48, -25), ...Q(48, -25), CD.amarL);
  for (const u of [-18, 18]) { linea(...Q(u, -24), ...Q(u * 0.9, 20), CD.amarS); linea(...Q(u + 1, -24), ...Q(u * 0.9 + 1, 20), CD.amarL); }
  // el filo de acero de abajo y los dientes
  R.poligono([Q(-47, 20), Q(47, 20), Q(45, 27), Q(-45, 27)], CD.aceroS); linea(...Q(-46, 21), ...Q(46, 21), CD.aceroL);
  for (let i = 0; i < 7; i++) { const u = -39 + i * 13; R.poligono([Q(u - 4, 26), Q(u + 4, 26), Q(u + 1, 37), Q(u - 1, 37)], CD.aceroS); linea(...Q(u - 3, 27), ...Q(u, 36), CD.aceroL); }
  // los terrones que se quedan pegados a la chapa
  for (let i = 0; i < 7; i++) { const [x, y] = Q(-40 + h(i, 1, 114) * 80, -16 + h(i, 2, 114) * 30); R.disco(Math.round(x), Math.round(y), 1.5 + h(i, 3, 114) * 1.5, CD.tierraS); pset(Math.round(x) - 1, Math.round(y) - 1, CD.tierra); }
  // la tierra que cae por los lados al subir y el polvo
  if (sa > 0.05 && sa < 0.98) for (let i = 0; i < 16; i++) { const u = (t * 1.8 + i / 16) % 1, [x0, y0] = Q(i % 2 ? -52 : 52, -6), x = Math.round(x0 + (i % 2 ? -1 : 1) * (2 + (i % 5))), y = Math.round(y0 + u * 70); if (y < 180) { pset(x, y, i % 3 ? CD.tierra : CD.tierraL); if (i % 4 === 0) pset(x + 1, y + 1, CD.tierraS); } }
  for (let i = 0; i < 6; i++) { const u = (t * 0.4 + i / 6) % 1, x = Math.round(bx - 40 + i * 16 + u * 30), y = Math.round(by + 30 - u * 30), r = 3 + u * 6; for (let yy = Math.round(y - r); yy <= y + r; yy++) for (let xx = Math.round(x - r); xx <= x + r; xx++) if (Math.hypot(xx - x, yy - y) < r && c_umbral(xx, yy) < 0.3 * (1 - u)) pset(xx, yy, c_mezcla(R.pget(xx, yy), CD.arenaL, 0.5)); }
  return { suelo: 172, cuchara: Q(0, -30).map(Math.round) };
}
function c_carpa(R, t, o) {
  const { pset, linea, rect } = R, k = c_igual;
  const cresta = c_fijo(R, 'carpa', () => {
    // por la abertura: el cielo, la misma sierra, la llanura y la valla de lejos
    c_cieloFijo(R, 72, false, [70, 46, 6]); const cr = c_sierra(R, 72, k); c_llanura(R, 72, 110, k);
    for (let x = 0; x < 320; x++) { pset(x, 90, CD.aceroS); if (x % 9 === 0) rect(x, 86, x, 92, CD.aceroS); }
    for (let i = 0; i < 10; i++) c_mata(R, Math.round(h(i, 1, 105) * 319), Math.round(78 + h(i, 2, 105) * 26), 2, k, i);
    // el suelo: la lona azul con arena por encima, arrugas y pisadas
    for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) { const mancha = Math.sin(x * 0.045 + 1) * Math.sin(y * 0.11 + x * 0.01) + h(x >> 3, y >> 3, 106) * 0.5, ar = mancha > 0.75 || (mancha > 0.55 && c_umbral(x, y) < (mancha - 0.55) * 4) || h(x, y, 107) < 0.025, ond = Math.sin(x * 0.06 + y * 0.25 + Math.sin(y * 0.1) * 3) > 0.94;
      pset(x, y, ar ? (h(x, y, 108) < 0.7 ? CD.arena : CD.arenaM) : ond ? CD.lonaAL : y < 114 ? CD.lonaAS : Math.sin(x * 0.06 + y * 0.25 + Math.sin(y * 0.1) * 3) > 0.82 ? CD.lonaAS : (x + y * 7) % 37 === 0 ? CD.lonaAS : CD.lonaA); }
    for (let x = 0; x < 320; x += 40) for (let y = 112; y < 180; y++) if ((y >> 1) % 2) pset(x + Math.round((y - 112) * (x - 160) / 300), y, CD.lonaAS);   // las costuras de la lona
    for (let i = 0; i < 8; i++) { const x = 120 + i * 12, y = 170 - i * 3; R.rect(x, y, x + 3, y + 1, CD.lonaAS); }
    // la mesa del fondo con su faldón, cajas de plástico numeradas, bolsas, el termo, la cámara y la pizarra
    rect(36, 104, 284, 107, CD.mesa); rect(36, 104, 284, 104, CD.blanco); rect(36, 107, 284, 108, CD.mesaSS); for (const x of [40, 160, 280]) rect(x, 108, x + 1, 126, CD.mesaSS);
    for (let i = 0; i < 5; i++) { const x = 44 + i * 26; rect(x, 92, x + 20, 104, [CD.lonaA, hex('#3a9a4a'), CD.amar, CD.lonaA, CD.cajaR][i]); rect(x, 92, x + 20, 93, CD.blanco); rect(x + 6, 96, x + 14, 100, CD.blanco); R.numero(String(i + 1), x + 8, 101, { tam: 8, fina: true, color: CD.tinta, sombra: false }); }
    for (let i = 0; i < 4; i++) { const x = 182 + i * 9; rect(x, 96, x + 6, 104, hex('#e8eef0')); rect(x + 1, 97, x + 5, 98, CD.cajaR); pset(x + 3, 101, CD.cartonS); }
    rect(222, 90, 226, 104, CD.cajaR); rect(222, 88, 226, 89, CD.blanco); rect(230, 98, 238, 104, CD.chasis); R.disco(234, 101, 2, CD.aceroS); pset(233, 100, CD.vidrioL);
    // la pizarra con un esquema de las capas (cifras y rayas)
    rect(250, 60, 300, 98, CD.aceroS); rect(251, 61, 299, 97, CD.blanco); for (let j = 0; j < 4; j++) { rect(256, 66 + j * 7, 290, 70 + j * 7, [CD.tierraL, CD.estrato, CD.tierra, CD.tierraS][j]); } R.numero('83', 280, 92, { tam: 8, fina: true, color: CD.cajaR, sombra: false }); linea(275, 85, 280, 81, CD.cajaR);
    for (const x of [262, 288]) rect(x, 98, x + 1, 108, CD.aceroS);
    // las sombras de la carpa en el suelo
    for (let y = 110; y < 180; y++) for (let x = 0; x < 320; x++) if ((x < 18 || x > 302) && c_umbral(x, y) < 0.5) pset(x, y, c_mezcla(R.pget(x, y), CD.negro, 0.3));
    return cr;
  });
  c_cieloVivo(R, t, 72, false, cresta, [70, 46, 6]);
  // la excavadora a lo lejos, por la abertura, que cava
  R.recorte([20, 34, 300, 100]); c_excavadora(R, 120, 86, t, k, 0.35, (t * 0.18) % 1, {}); R.recorte(null);
  // gente pequeña que pasa por fuera
  { R.recorte([20, 34, 300, 103]); for (let i = 0; i < 3; i++) { const u = (t * 0.035 + i * 0.37) % 1, x = Math.round(lerp(10, 310, i % 2 ? 1 - u : u)); c_persona(R, x, 96 + i * 3, t, [CD.cajaR, CD.amar, CD.lonaA][i], i + 20, k, { anda: true }); } R.recorte(null); }
  // el techo de lona: costuras, pliegues tramados y el faldón ondulado que ondea, con los vientos y los mástiles
  for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) { const u = Math.abs(x - 160) / 160, top = y / 34, pl = Math.sin(x * 0.12 + Math.sin(t * 0.8) * 0.6) * 0.5 + 0.5;
    let c = pl > 0.75 ? CD.lona : pl < 0.2 ? CD.lonaSS : CD.lonaS; if (top > 0.6 && c_umbral(x, y) < (top - 0.6) * 2) c = CD.lona; if (x % 64 === 0) c = CD.lonaSS; if (y < 3 && u > 0.2) c = CD.lonaSS; pset(x, y, c); }
  for (let x = 0; x < 320; x++) { const o2 = Math.round(Math.sin(t * 4 + x * 0.2) * 1.2), fl = 34 + ((x >> 3) % 2 ? 2 : 0) + o2; for (let y = 34; y <= fl; y++) pset(x, y, y === fl ? CD.lonaSS : CD.lona); }
  for (const x of [8, 312]) { rect(x - 2, 30, x + 1, 179, CD.aceroS); rect(x - 2, 30, x - 2, 179, CD.aceroL); }
  rect(158, 36, 160, 104, CD.aceroS); rect(158, 36, 158, 104, CD.aceroL);
  // el lateral de lona de la carpa (izquierda y derecha), recogido, con sombra
  for (const [x0, x1] of [[10, 22], [298, 310]]) for (let y = 36; y < 150; y++) for (let x = x0; x <= x1; x++) { const pl = Math.sin(x * 0.9 + y * 0.05) > 0.4; pset(x, y, pl ? CD.lonaS : CD.lonaSS); }
  // el portátil de la mesa del fondo con una gráfica que cambia, y el ventilador que gira
  { rect(200, 88, 216, 98, CD.chasis); rect(201, 89, 215, 97, hex('#1a2a3a')); for (let i = 0; i < 6; i++) { const v = 2 + Math.round((Math.sin(t * 1.5 + i) * 0.5 + 0.5) * 5); rect(203 + i * 2, 96 - v, 203 + i * 2, 96, i % 2 ? hex('#4ae05a') : hex('#4aa8ff')); } rect(198, 98, 218, 100, CD.aceroS); pset(201, 89, CD.vidrioL); }
  { const cx = 140, cy = 92; rect(cx, cy + 4, cx + 1, 104, CD.aceroS); R.disco(cx, cy, 6, CD.aceroL); for (let i = 0; i < 3; i++) { const a = t * 18 + i * 2.1; linea(cx, cy, Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), CD.lonaA); } pset(cx, cy, CD.chasis); for (let i = 0; i < 6; i++) pset(Math.round(cx + Math.cos(i) * 6), Math.round(cy + Math.sin(i) * 6), CD.aceroS); }
  // las bolsas colgadas del mástil que se mueven con el aire del ventilador
  for (let i = 0; i < 3; i++) { const m = Math.round(Math.sin(t * 3 + i) * 1); linea(161, 46 + i * 12, 165 + m, 48 + i * 12, CD.aceroS); rect(164 + m, 48 + i * 12, 170 + m, 56 + i * 12, hex('#e8eef0')); rect(165 + m, 49 + i * 12, 169 + m, 50 + i * 12, CD.cajaR); }
  return { suelo: 160 };
}

// la mesa plegable de delante de la carpa: tablero blanco con su canto, patas en X, y encima los cartuchos en filas,
// bolsas con etiquetas numeradas, un pincel y un periódico doblado
function c_mesaDelante(R, t) {
  const { rect, linea, pset } = R;
  rect(30, 152, 290, 156, CD.mesa); rect(30, 152, 290, 152, CD.blanco); rect(30, 156, 290, 158, CD.mesaSS); rect(30, 158, 290, 158, CD.mesaS);
  for (let x = 34; x < 288; x += 23) pset(x, 154, CD.mesaS);   // rayas del uso
  for (const [a, b] of [[40, 66], [254, 280]]) { linea(a, 159, b, 180, CD.aceroS); linea(b, 159, a, 180, CD.aceroS); linea(a + 1, 159, b + 1, 180, CD.aceroL); }
  // a la izquierda, una bandeja con los cartuchos limpios en fila
  rect(32, 149, 100, 152, CD.lonaAS); rect(32, 149, 100, 149, CD.lonaAL);
  for (let i = 0; i < 5; i++) PIEZAS_AT.cartucho ? PIEZAS_AT.cartucho(R, 40 + i * 14, 150, { color: ['rojo', 'azul', 'verde', 'naranja', 'gris'][i], icono: ['foso', 'nave', 'flor', 'comecocos', 'foso'][i] }) : c_cartuchito(R, 36 + i * 14, 150, i);
  // a la derecha, las bolsas numeradas, el periódico doblado y el pincel
  for (let i = 0; i < 2; i++) { const x = 216 + i * 20; rect(x, 141, x + 15, 152, hex('#e8eef0')); rect(x, 141, x + 15, 142, CD.lonaS); rect(x + 2, 144, x + 9, 149, CD.blanco); R.numero(String(14 + i), x + 3, 150, { tam: 8, fina: true, color: CD.cajaR, sombra: false }); c_cartuchito(R, x + 10, 151, i + 2); }
  c_periodico(R, 256, 136, 30, 16, c_igual, false);
  linea(196, 151, 210, 147, CD.madera); rect(210, 146, 214, 148, CD.marron); for (let i = 0; i < 4; i++) pset(215, 146 + i % 3, CD.cartonL);
  // una mota de arena que cae del tablero, por la vida
  const u = (t * 0.6) % 1; if (u < 0.5) pset(120, Math.round(158 + u * 40), CD.arena);
}

function c_mesaCerca(R, t, o) {
  const { pset, linea, rect } = R, k = c_igual;
  c_fijo(R, 'mesaCerca', () => {
    // al fondo, el interior de la carpa: el techo de lona con pliegues, la abertura al desierto con la sierra, un mástil,
    // la mesa del fondo con cajas numeradas, bolsas colgadas y una lámpara de obra (desenfocado: tonos suaves)
    for (let y = 0; y < 70; y++) for (let x = 0; x < 320; x++) { const pl = Math.sin(x * 0.09 + Math.sin(y * 0.05) * 2) * 0.5 + 0.5; let c = y < 22 ? (pl > 0.7 ? CD.lona : pl < 0.25 ? CD.lonaSS : CD.lonaS) : (pl > 0.6 ? CD.lonaS : c_mezcla(CD.lonaS, CD.lonaSS, 0.5)); if (y < 22 && x % 80 === 0) c = CD.lonaSS; pset(x, y, c); }
    for (let x = 0; x < 320; x++) { const fl = 22 + ((x >> 3) % 2); for (let y = 20; y <= fl; y++) pset(x, y, CD.lona); pset(x, fl + 1, CD.lonaSS); }
    for (let y = 26; y < 56; y++) for (let x = 156; x < 296; x++) { const c = y < 38 ? c_mezcla(hex('#8ccaf0'), hex('#d8ecf4'), (y - 26) / 12) : y < 46 ? (Math.sin(x * 0.08) * 3 + 40 < y ? CD.sierra : CD.sierraL) : (h(x >> 2, y >> 1, 117) < 0.3 ? CD.arenaM : CD.arena); pset(x, y, c); }
    for (let i = 0; i < 4; i++) c_mata(R, 170 + i * 34, 52 + (i % 2) * 2, 2, c_igual, i);
    rect(154, 24, 156, 66, CD.lonaSS); rect(296, 24, 298, 66, CD.lonaSS); rect(224, 24, 225, 58, CD.aceroS);
    rect(0, 56, 320, 59, CD.mesaS); rect(0, 56, 320, 56, CD.mesa);
    for (let i = 0; i < 5; i++) { const x = 8 + i * 28, c = c_mezcla([CD.lonaA, hex('#3a9a4a'), CD.amar, CD.lonaA, CD.cajaR][i], CD.lonaS, 0.3); rect(x, 42, x + 22, 56, c); rect(x, 42, x + 22, 43, c_mezcla(c, CD.blanco, 0.4)); rect(x + 7, 47, x + 15, 52, c_mezcla(CD.blanco, CD.lonaS, 0.2)); R.numero(String(i + 6), x + 9, 52, { tam: 8, fina: true, color: CD.lonaSS, sombra: false }); }
    for (let i = 0; i < 4; i++) { const x = 236 + i * 14; linea(x + 3, 24, x + 3, 30, CD.aceroS); rect(x, 30, x + 7, 40, c_mezcla(hex('#e8eef0'), CD.lonaS, 0.3)); rect(x + 1, 31, x + 6, 32, c_mezcla(CD.cajaR, CD.lonaS, 0.3)); }
    linea(140, 0, 140, 12, CD.aceroS); R.poligono([[134, 18], [137, 12], [143, 12], [146, 18]], CD.amarS); rect(136, 18, 144, 18, CD.luzL);
    for (let y = 59; y < 70; y++) for (let x = 0; x < 320; x++) pset(x, y, c_umbral(x, y) < 0.5 ? CD.lonaSS : CD.mesaSS);
    // el tablero de la mesa: plástico blanco con la luz de la abertura, rayas del uso, manchas de tierra en corros y el canto
    for (let y = 70; y < 180; y++) for (let x = 0; x < 320; x++) { const l = (x - 230) / 200, luz = 1 - l * l - (y - 70) / 300; let c = luz > 0.75 && c_umbral(x, y) < (luz - 0.75) * 3 ? CD.blanco : luz < 0.2 && c_umbral(x, y) < (0.2 - luz) * 3 ? CD.mesaS : CD.mesa;
      if (y < 73) c = y === 70 ? CD.blanco : CD.mesaS; if (Math.sin(x * 0.4 + y * 2.3) > 0.996 || Math.sin(x * 0.31 - y * 1.7) > 0.997) c = CD.mesaS;
      const m = Math.hypot(x - 46, (y - 112) * 0.8), m2 = Math.hypot(x - 196, (y - 170) * 1.2); if ((m < 34 && h(x, y, 118) < 0.45 - m / 80) || (m2 < 16 && h(x, y, 119) < 0.3 - m2 / 60)) c = h(x, y, 120) < 0.5 ? CD.arenaM : CD.arena; pset(x, y, c); }
    // las sombras de los objetos sobre el tablero (abajo a la izquierda: la luz entra por la abertura)
    const sombra = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (c_umbral(x, y) < 0.5) pset(x, y, c_mezcla(R.pget(x, y), CD.mesaSS, 0.5)); };
    sombra(94, 84, 98, 160); sombra(94, 157, 210, 160); sombra(20, 130, 24, 160); sombra(20, 157, 66, 160); sombra(274, 128, 278, 146);
    // la bandeja azul de los cartuchos sucios
    rect(10, 80, 84, 124, CD.lonaAS); rect(12, 82, 82, 122, CD.lonaA); rect(12, 82, 82, 82, CD.lonaAL); for (let x = 24; x < 82; x += 12) linea(x, 83, x, 121, CD.lonaAS);
    // la regla de escala a cuadros blancos y negros con cifras
    for (let i = 0; i < 10; i++) rect(14 + i * 8, 164, 21 + i * 8, 168, i % 2 ? CD.blanco : CD.tinta); rect(14, 163, 93, 163, CD.tinta); R.numero('10', 94, 168, { tam: 8, fina: true, color: CD.tinta, sombra: false });
    // el periódico de 1983, grande, un poco amarillento y con una esquina doblada
    c_periodico(R, 100, 80, 112, 76, (c) => c_mezcla(c, hex('#e8d8a8'), 0.18), true);
    R.poligono([[205, 156], [214, 147], [214, 156]], CD.papelS); linea(205, 156, 214, 147, CD.cartonS);
    // los cartuchos sucios a la izquierda, con tierra
    for (let i = 0; i < 3; i++) { const x = 24 + i * 23, y = 114 + (i % 2) * 4; PIEZAS_AT.cartucho ? PIEZAS_AT.cartucho(R, x, y, { s: 2, color: ['gris', 'naranja', 'azul'][i] }) : c_cartuchito(R, x, y, i); for (let j = 0; j < 30; j++) { const px = x - 11 + Math.round(h(j, i, 110) * 22), py = y - 29 + Math.round(h(j, i, 111) * 28); pset(px, py, h(j, i, 112) < 0.5 ? CD.tierra : CD.tierraS); } }
    // la bolsa con su etiqueta numerada
    rect(24, 128, 66, 156, hex('#e2eaee')); rect(24, 128, 66, 130, CD.cajaR); rect(28, 136, 52, 148, CD.blanco); R.numero('23', 32, 146, { tam: 8, fina: true, color: CD.tinta, sombra: false }); for (let i = 0; i < 3; i++) linea(26 + i * 15, 131, 34 + i * 15, 155, hex('#f8fcff'));
    // la paleta del arqueólogo y los pinceles
    R.poligono([[226, 160], [250, 150], [254, 158], [230, 168]], CD.aceroL); linea(226, 160, 250, 150, CD.blanco); rect(254, 154, 272, 157, CD.madera); rect(254, 154, 272, 154, hex('#a8704a'));
    for (let i = 0; i < 2; i++) { linea(232, 100 + i * 14, 268, 92 + i * 14, CD.madera); rect(268, 90 + i * 14, 276, 94 + i * 14, CD.cromo); for (let j = 0; j < 4; j++) pset(277 + j % 2, 90 + i * 14 + j, CD.pelo); }
    // la lupa
    R.disco(290, 132, 13, CD.chasis); R.disco(290, 132, 11, hex('#cfe4f0')); R.disco(286, 128, 3, CD.blanco); rect(298, 142, 314, 146, CD.chasis);
  });
  // el cartucho limpio, grande, en el centro de la mesa (lo cogerá una mano canónica): con un brillo que pasa
  PIEZAS_AT.cartucho ? PIEZAS_AT.cartucho(R, 250, 136, { s: 3, color: 'naranja', icono: 'foso' }) : c_cartuchito(R, 244, 136, 3);
  { const u = (t * 0.4) % 1; if (u < 0.3) { const x = Math.round(236 + u / 0.3 * 30); for (let j = 0; j < 8; j++) pset(x + j, 98 + j * 3, CD.blanco); } }
  // por la abertura del fondo: una nube que pasa y un arqueólogo pequeño que cruza con un cubo
  R.recorte([157, 26, 295, 55]); { const x = Math.round(((t * 4) % 200) + 120); c_nube(R, x, 32, 20, 3, c_NUBES.dia); }
  { const u = (t * 0.06) % 1, x = Math.round(lerp(150, 300, u)); c_persona(R, x, 54, t, CD.cartonL, 5, c_igual, { anda: true, gorra: CD.cartonS }); for (let j = 49; j <= 52; j++) R.linea(x + 3, j, x + 5, j, CD.aceroS); } R.recorte(null);
  // granos de arena que caen del cartucho sucio y una mosca que se pasea por la mesa (la vida)
  for (let i = 0; i < 3; i++) { const u = (t * 0.9 + i / 3) % 1; pset(52 + i * 3, Math.round(112 + u * 14), CD.tierra); }
  { const a = t * 0.9, x = Math.round(150 + Math.cos(a) * 40 + Math.sin(a * 2.3) * 10), y = Math.round(150 + Math.sin(a * 1.3) * 12); pset(x, y, CD.negro); pset(x + 1, y, CD.negro); if (Math.floor(t * 20) % 2) { pset(x, y - 1, CD.lonaS); pset(x + 1, y - 1, CD.lonaS); } }
  // la sombra del ventilador/la lona que pasa por la mesa
  { const x0 = Math.round(Math.sin(t * 0.5) * 40 + 20); for (let y = 74; y < 180; y++) for (let x = x0; x < x0 + 24; x++) if (c_umbral(x, y) < 0.18) pset(x, y, c_mezcla(R.pget(x, y), CD.lonaSS, 0.4)); }
  return { suelo: 80 };
}

// mezcla dos colores (a = 0: c; a = 1: d)
const e_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

// la matriz de Bayer 4 × 4 para las tramas
const e_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const e_b4 = (x, y) => (e_BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

// tiñe un trozo de lo ya pintado hacia col (a: cuánto); con trama, solo en damero
function e_tinte(R, x0, y0, x1, y1, col, a, trama = false) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { if (trama && ((x + y) & 1)) continue; const c = R.pget(x, y); if (c) R.pset(x, y, e_mezcla(c, col, a)); }
}

// un halo de luz redondo (más fuerte en el centro, tramado en el borde)
function e_halo(R, cx, cy, rx, ry, col, a) {
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d >= 1) continue; const f = (1 - d) * a; if (f < e_b4(cx + i, cy + j) * 0.5 * a) continue; const c = R.pget(cx + i, cy + j); if (c) R.pset(cx + i, cy + j, e_mezcla(c, col, Math.min(0.85, f))); }
}

// la sombra blanda en elipse (f: cuánto se oscurece)
function e_sombra(R, cx, cy, rx, ry, f = 0.25) {
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, e_mezcla(c, C.k, f)); } }
}

// las capas fijas: cada encuadre y cámara pinta lo que no se mueve una vez en un búfer de R.nuevo() y se copia
const e_CAPAS = new WeakMap();

function e_capa(R, clave, pintar) {
  let m = e_CAPAS.get(R); if (!m) e_CAPAS.set(R, (m = new Map()));
  let b = m.get(clave); if (!b) { b = R.nuevo(); const prev = R.usar(b); pintar(R); R.usar(prev); m.set(clave, b); }
  R.copiar(b); return b;
}

// un cielo tramado entre varios colores (de arriba abajo), recortado a (x0, y0)–(x1, y1)
function e_degradado(R, x0, y0, x1, y1, cols) {
  const n = cols.length - 1;
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) R.pset(x, y, f > e_b4(x, y) ? cols[i + 1] : cols[i]); }
}

// una nube de tres tonos (sombra, cuerpo, luz)
function e_nube(R, cx, cy, w, [cS, c, cL]) {
  const r = Math.max(2, w * 0.3), B = [[-w * 0.38, 1, r * 0.75], [0, -1, r], [w * 0.36, 0.5, r * 0.8], [w * 0.15, 1.5, r * 0.7]];
  for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), rr, cS);
  for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx), Math.round(cy + dy), rr * 0.9, c);
  for (const [dx, dy, rr] of B) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 1), rr * 0.5, cL);
}

// un pájaro de dos píxeles de ala que aletea
function e_pajaro(R, x, y, t, c) { const a = Math.sin(t * 9 + x) > 0 ? 1 : 0; R.pset(x, y, c); R.pset(x - 1, y - a, c); R.pset(x + 1, y - a, c); R.pset(x - 2, y - 1 + a, c); R.pset(x + 2, y - 1 + a, c); }

// la tarima de roble vista de frente: hileras más altas cuanto más cerca, tablas de tres tonos con su junta, vetas y
// algún nudo (P: [tono, sombra, luz, junta])
function e_tarima(R, y0, y1, P, k = 0) {
  for (let y = y0, f = 0; y <= y1; f++) {
    const hh = Math.max(2, Math.round(2 + (y - y0) * 0.12)), yb = Math.min(y1, y + hh - 1);
    let x = -Math.floor(h(f, 1, 600 + k) * 60);
    while (x < 320) {
      const L = Math.round(34 + h(x, f, 601 + k) * 54 + (y - y0) * 0.6), u = h(x, f, 602 + k), c = u < 0.28 ? P[1] : u > 0.82 ? P[2] : P[0];
      R.rect(Math.max(0, x), y, Math.min(319, x + L - 1), yb, c);
      for (let g = 0; g < Math.max(1, hh >> 1); g++) { const gy = y + Math.floor(h(x, g, 603 + k) * hh); let gx = x + 2;
        while (gx < x + L - 3) { const l = 3 + Math.floor(h(gx, gy, 604 + k) * 14); if (gx < 320 && gx + l >= 0) R.rect(Math.max(0, gx), gy, Math.min(319, x + L - 3, gx + l), gy, c === P[1] ? P[3] : P[1]); gx += l + 3 + Math.floor(h(gx, g, 605 + k) * 9); } }
      if (hh > 4 && h(x, f, 606 + k) < 0.25) { const nx = x + 6 + Math.floor(h(x, f, 607 + k) * (L - 12)), ny = y + (hh >> 1); R.rect(nx - 2, ny, nx + 2, ny, P[3]); R.pset(nx, ny - 1, P[1]); R.pset(nx, ny + 1, P[1]); }
      if (x >= 0) R.rect(x, y, x, yb, P[3]);
      x += L;
    }
    if (hh > 3) R.rect(0, y, 319, y, P[2]);
    R.rect(0, yb, 319, yb, P[3]); y = yb + 1;
  }
}

// tablero de madera con vetas verticales onduladas (frentes de mueble, cuarterones)
function e_vetasV(R, x0, y0, x1, y1, c, cS, cL, k = 0) {
  R.rect(x0, y0, x1, y1, c);
  for (let i = x0 + 1; i < x1; i += 3) { const fase = h(i, k, 610) * 6, tono = h(i, k, 611) < 0.3 ? cL : cS;
    for (let y = y0; y <= y1; y++) { if (h(i, y >> 2, 612 + k) < 0.3) continue; const x = i + Math.round(Math.sin(y * 0.18 + fase) * 0.8); if (x > x0 && x < x1) R.pset(x, y, tono); } }
}

// una hilera de lomos de libros o de cajas de juegos en una balda (x0–x1, apoyados en yb, alto hasta hmax); con caja,
// lomos más anchos con su franja y su pictograma claro
function e_lomos(R, x0, x1, yb, hmax, cols, k = 0, caja = false) {
  let x = x0, i = 0;
  while (x < x1) {
    const w = caja ? 4 + Math.floor(h(i, k, 620) * 3) : 2 + Math.floor(h(i, k, 620) * 3); if (x + w - 1 > x1) break;
    const hh = hmax - Math.floor(h(i, k, 621) * Math.min(caja ? 3 : 6, hmax / 3)), c = cols[Math.floor(h(i, k, 622) * cols.length)];
    if (!caja && h(i, k, 623) < 0.07 && x + hh < x1) { // un libro tumbado
      R.rect(x, yb - w + 1, x + hh - 1, yb, c); R.rect(x, yb - w + 1, x + hh - 1, yb - w + 1, e_mezcla(c, C.blanco, 0.3)); x += hh + 1; i++; continue; }
    R.rect(x, yb - hh + 1, x + w - 1, yb, c); R.rect(x, yb - hh + 1, x, yb, e_mezcla(c, C.blanco, 0.25)); R.rect(x + w - 1, yb - hh + 1, x + w - 1, yb, e_mezcla(c, C.k, 0.35));
    if (caja) { R.rect(x, yb - hh + 1, x + w - 1, yb - hh + 3, C.negroC); R.rect(x + 1, yb - hh + 6, x + w - 2, yb - hh + 6, e_mezcla(c, C.blanco, 0.55)); R.pset(x + (w >> 1), yb - 3, e_mezcla(c, C.blanco, 0.6)); }
    else if (hh > 7) { R.rect(x, yb - hh + 3, x + w - 1, yb - hh + 3, e_mezcla(c, hex('#f0d890'), 0.5)); R.rect(x, yb - 3, x + w - 1, yb - 3, e_mezcla(c, hex('#f0d890'), 0.4)); }
    x += w + (h(i, k, 624) < 0.1 ? 1 : 0); i++;
  }
}

// una persona pequeña de fondo (8–11 px): pelo, cara, ropa, piernas que alternan al andar
function e_gente(R, x, suelo, t, ropa, pelo, o = {}) {
  const alto = o.alto ?? 10, anda = o.anda ?? true, p = anda ? Math.floor(t * 6 + x * 0.1) % 2 : 0, piel = o.piel ?? hex('#e8b890');
  const yc = suelo - alto, pierna = o.pantalon ?? hex('#3a3a4a');
  R.rect(x - 1, yc, x + 1, yc + 2, piel); R.rect(x - 1, yc, x + 1, yc, pelo); R.pset(o.dir < 0 ? x + 1 : x - 1, yc + 1, pelo);
  R.rect(x - 2, yc + 3, x + 2, suelo - 4, ropa); R.rect(x - 2, yc + 3, x - 2, suelo - 4, e_mezcla(ropa, C.k, 0.3));
  R.rect(x - 1, suelo - 3, x - 1, suelo - (p ? 1 : 0), pierna); R.rect(x + 1, suelo - 3, x + 1, suelo - (p ? 0 : 1), pierna);
}

const E_P = pal({
  papel: '#d7954e', papelS: '#cb8846', papelL: '#e3a862', papelM: '#bd7a3e', techo: '#4a2818', techoL: '#62361e',
  nogal: '#6e3c20', nogalS: '#57301a', nogalL: '#8a5230', nogalD: '#3e1f0e', roble: '#b8743e', robleS: '#a06232', robleL: '#cc8a50', robleD: '#73441e',
  teca: '#9a5426', tecaS: '#7a3e1a', tecaL: '#b8693a', tecaD: '#4e2410', crema: '#efe0c0', cremaS: '#d2be98',
  alfR: '#b8402a', alfN: '#e07a2a', alfA: '#e6b04a', alfM: '#7a2c1a', cortina: '#c8682a', cortinaS: '#9a4a1e', cortinaL: '#e08a3e',
  neonR: '#ff5aa8', neonA: '#5ae8ff', ocaso1: '#5a4a8e', ocaso2: '#8a5a9a', ocaso3: '#d8708a', ocaso4: '#f4a066', ocaso5: '#fcd08a',
});

// lo fijo del estudio general
function e_estudioFijo(R) {
  const { rect, pset, disco, linea, poligono } = R, P = E_P;
  // el techo de madera oscura con su moldura
  rect(0, 0, 319, 5, P.techo); for (let x = 0; x < 320; x += 23) rect(x, 0, x, 4, hex('#3a1e10')); rect(0, 5, 319, 5, P.techoL);
  // el papel pintado de rayas de los setenta, con el rombito, la luz de la lámpara y la sombra junto al techo
  for (let y = 6; y < 68; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((x + 3) / 12) & 1, xi = (x + 3) % 12;
    let c = b ? P.papelS : P.papel; if (xi === 0 || xi === 11) c = P.papelM;
    if (!b && (y % 16 === 8 || y % 16 === 9) && (xi === 5 || xi === 6)) c = P.papelL; if (!b && y % 16 === 8 && (xi === 4 || xi === 7) && x < 270) c = P.papelL;
    if (y < 10 && ((x + y) & 1)) c = e_mezcla(c, C.k, 0.18); if (h(x, y, 630) < 0.04) c = P.papelM; pset(x, y, c); }
  // el friso de nogal: moldura, cuarterones con vetas, luz arriba y sombra abajo, y el rodapié
  rect(0, 68, 319, 71, P.nogalD); rect(0, 68, 319, 68, P.nogalL); rect(0, 70, 319, 70, P.nogal);
  for (let x0 = 2; x0 < 320; x0 += 34) { const x1 = Math.min(319, x0 + 30); e_vetasV(R, x0, 74, x1, 104, P.nogal, P.nogalS, P.nogalL, x0);
    rect(x0, 74, x1, 74, P.nogalL); rect(x0, 74, x0, 104, P.nogalL); rect(x0, 104, x1, 104, P.nogalD); rect(x1, 74, x1, 104, P.nogalD);
    rect(x0 + 3, 77, x1 - 3, 77, P.nogalS); rect(x0 + 3, 101, x1 - 3, 101, P.nogalL); }
  for (let x = 0; x < 320; x += 34) rect(x, 72, x + 1, 105, P.nogalS);
  rect(0, 72, 319, 73, P.nogalS); rect(0, 105, 319, 111, P.nogalD); rect(0, 106, 319, 106, P.nogalL); rect(0, 111, 319, 111, hex('#2a140a'));
  // la tarima, la luz del ocaso que entra por la ventana y la alfombra trenzada
  e_tarima(R, 112, 179, [P.roble, P.robleS, P.robleL, P.robleD]);
  for (let y = 112; y < 150; y++) { const d = Math.round((y - 112) * 0.9); for (let x = 22 + d; x <= 70 + d * 1.4; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); R.pset(x, y, e_mezcla(c, hex('#ffd890'), 0.28 * (1 - (y - 112) / 40))); } }
  for (let j = -15; j <= 15; j++) for (let i = -52; i <= 52; i++) { const d = Math.sqrt((i / 52) ** 2 + (j / 15) ** 2); if (d > 1) continue;
    const anillo = Math.floor(d * 7), tr = ((i >> 1) + j * 2) & 1, cols = [P.alfA, P.alfN, P.alfR, P.alfM, P.alfN, P.alfA, P.alfR];
    let c = cols[anillo]; if (tr) c = e_mezcla(c, C.k, 0.15); if (d > 0.96) c = P.alfM; if (j > 10) c = e_mezcla(c, C.k, 0.12); pset(62 + i, 152 + j, c); }
  // la planta (monstera) en su maceta de barro, en el rincón
  rect(2, 112, 18, 126, C.k); rect(3, 113, 17, 125, hex('#b8582a')); rect(3, 113, 17, 115, hex('#d8783a')); rect(15, 116, 16, 125, hex('#8a3a1a'));
  e_sombra(R, 10, 127, 10, 2, 0.3);
  // la máquina recreativa: mueble negro con su franja lateral, marquesina, pantalla, mandos, monedero y su sombra
  e_sombra(R, 98, 118, 18, 3, 0.35);
  poligono([[84, 30], [112, 30], [112, 118], [84, 118]], C.k); rect(85, 31, 111, 117, hex('#2a2a3a')); rect(85, 31, 86, 117, hex('#4a4a62'));
  for (let y = 36; y < 116; y++) { const x = 87 + Math.round((y - 36) * 0.05); pset(x, y, hex('#e05a2a')); pset(x + 1, y, hex('#e8b040')); }
  rect(86, 32, 110, 42, hex('#1a1a28')); rect(88, 34, 108, 40, hex('#4a2a8a')); for (let x = 89; x < 108; x += 4) { rect(x, 35, x + 2, 39, x % 8 < 4 ? hex('#e86aa8') : hex('#5ad8f0')); }
  rect(88, 45, 108, 71, hex('#0a0a12')); rect(89, 46, 107, 70, hex('#14142a'));
  poligono([[86, 72], [110, 72], [112, 82], [84, 82]], hex('#3a3a50')); rect(84, 82, 112, 83, C.k); rect(90, 74, 91, 79, C.k); disco(90, 74, 1.5, hex('#e03a3a'));
  for (const [x, c] of [[98, '#e8c040'], [102, '#3ac0e8'], [106, '#e85a8a']]) { disco(x, 77, 1.2, hex(c)); pset(x - 1, 76, C.blanco); }
  rect(91, 90, 105, 104, hex('#1a1a26')); rect(93, 93, 96, 100, hex('#3a3a4a')); rect(100, 93, 103, 100, hex('#3a3a4a'));
  // la estantería de nogal: cuatro baldas con cajas de juegos, consolas, cintas, un cubo y libros; su sombra en la pared
  e_tinte(R, 169, 20, 172, 117, C.k, 0.25);
  rect(118, 18, 168, 118, P.nogalD); rect(120, 20, 166, 117, hex('#3a1c0c'));
  for (let y = 21; y < 117; y += 2) for (let x = 121; x < 166; x += 5) pset(x + (y % 4 ? 2 : 0), y, hex('#46220f'));
  const LOMOS = [hex('#d03a3a'), hex('#3a6ad8'), hex('#e8c040'), hex('#3a9a4a'), hex('#e8803a'), hex('#8a4ab8'), hex('#f0ece0'), hex('#2aa8a0')];
  e_lomos(R, 122, 164, 41, 18, LOMOS, 1, true);
  e_lomos(R, 122, 146, 65, 18, LOMOS, 2, true);
  PIEZAS_AT.consolaGris?.(R, 140, 89, {}); e_lomos(R, 157, 165, 89, 10, [hex('#2a2a2a'), hex('#e8e0d0')], 3);
  rect(122, 81, 127, 89, C.k); rect(123, 82, 126, 85, hex('#d03a3a')); rect(123, 86, 126, 88, hex('#3a6ad8')); pset(125, 83, hex('#f0f0f0')); pset(124, 87, hex('#e8c040'));
  e_lomos(R, 122, 150, 113, 16, [hex('#7a3a2a'), hex('#2a4a6a'), hex('#c8a060'), hex('#4a6a3a'), hex('#8a2a3a'), hex('#e0d0b0')], 4);
  for (const y of [42, 66, 90, 114]) { rect(119, y, 167, y + 2, P.nogal); rect(119, y, 167, y, P.nogalL); rect(119, y + 2, 167, y + 2, P.nogalD); }
  rect(118, 18, 120, 118, P.nogal); rect(166, 18, 168, 118, P.nogalS); rect(118, 18, 168, 19, P.nogalL);
  // los pósteres sin letras: el marcianito verde y el cohete sobre un planeta, con sus chinchetas y su sombra
  e_tinte(R, 178, 21, 203, 50, C.k, 0.22); rect(176, 19, 201, 48, C.k); rect(177, 20, 200, 47, hex('#141a30'));
  for (let k = 0; k < 14; k++) pset(178 + Math.floor(h(k, 1, 631) * 22), 21 + Math.floor(h(k, 2, 631) * 25), hex('#8a9ac8'));
  ['..#.....#..', '...#...#...', '..#######..', '.##.###.##.', '###########', '#.#######.#', '#.#.....#.#', '...##.##...'].forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') rect(178 + i * 2, 25 + j * 2, 179 + i * 2, 26 + j * 2, hex('#5adc5a')); });
  rect(180, 43, 197, 44, hex('#e8c040'));
  e_tinte(R, 211, 18, 238, 47, C.k, 0.22); rect(209, 16, 236, 45, C.k); rect(210, 17, 235, 44, hex('#4a2a6a'));
  e_degradado(R, 210, 17, 235, 44, [hex('#2a1a4a'), hex('#5a2a6a'), hex('#c8506a')]);
  for (let y = 34; y <= 44; y++) for (let x = 210; x <= 235; x++) if ((x - 222) ** 2 + ((y - 50) * 1.2) ** 2 < 256) pset(x, y, y < 38 ? hex('#f0a050') : (x + y) % 5 ? hex('#e0803a') : hex('#b85a2a'));
  rect(220, 21, 223, 31, hex('#e8e8f0')); rect(222, 21, 223, 31, hex('#a8a8c0')); poligono([[220, 21], [223, 21], [221, 17]], hex('#e83a3a')); rect(219, 28, 219, 31, hex('#e83a3a')); rect(224, 28, 224, 31, hex('#e83a3a'));
  rect(176, 45, 201, 48, C.k); rect(177, 45, 200, 47, hex('#141a30')); rect(209, 45, 236, 45, C.k);
  for (const [x, y] of [[178, 21], [199, 21], [211, 18], [234, 18]]) { pset(x, y, hex('#e83a3a')); pset(x, y - 1, hex('#ff9a8a')); }
  // el aparador de teca con sus puertas de lamas y tiradores
  e_sombra(R, 228, 112, 50, 3, 0.35);
  rect(180, 90, 276, 111, P.tecaD); e_vetasV(R, 182, 94, 274, 108, P.teca, P.tecaS, P.tecaL, 7);
  rect(180, 90, 276, 93, P.tecaL); rect(180, 93, 276, 93, P.tecaS);
  for (let x = 184; x < 272; x += 22) { rect(x, 95, x + 19, 107, P.tecaS); for (let y = 96; y < 107; y += 2) rect(x + 1, y, x + 18, y, P.teca); rect(x + 1, 96, x + 1, 106, P.tecaL); rect(x + 9, 100, x + 10, 102, hex('#e8c060')); }
  rect(182, 108, 184, 111, P.tecaD); rect(272, 108, 274, 111, P.tecaD);
  // la tele de tubo grande sobre el aparador: mueble de madera, marco, ruedas, rejilla y antenas
  linea(220, 54, 206, 42, hex('#c8c8d0')); linea(222, 54, 240, 44, hex('#c8c8d0')); disco(206, 42, 1, hex('#e8e8f0')); disco(240, 44, 1, hex('#e8e8f0')); rect(216, 53, 226, 56, C.k);
  rect(198, 56, 252, 90, C.k); e_vetasV(R, 199, 57, 251, 89, P.teca, P.tecaS, P.tecaL, 3); rect(199, 57, 251, 57, P.tecaL);
  rect(201, 60, 235, 86, C.k); rect(202, 61, 234, 85, hex('#1a1e22'));
  rect(238, 60, 249, 86, hex('#2a2a30')); disco(243, 65, 2.5, hex('#9a9aa8')); disco(243, 65, 1, hex('#5a5a62')); disco(243, 72, 2.5, hex('#9a9aa8')); disco(243, 72, 1, hex('#5a5a62'));
  for (let y = 77; y < 85; y += 2) rect(239, y, 248, y, C.k);
  rect(202, 88, 206, 90, C.k); rect(244, 88, 248, 90, C.k);
  // el tocadiscos y su altavoz
  rect(254, 82, 274, 90, C.k); rect(255, 83, 273, 89, hex('#c8b898')); rect(255, 83, 273, 83, hex('#e8dcc0'));
  rect(262, 62, 274, 81, C.k); rect(263, 63, 273, 80, hex('#5a3a22')); disco(268, 70, 4, hex('#2a1a12')); disco(268, 70, 2, hex('#4a3020')); disco(268, 77, 2, hex('#2a1a12'));
  // la ventana: marco de madera clara, alféizar con el cactus y el robotito, cortinas de cuadros con sus pliegues
  rect(16, 16, 72, 62, hex('#4a2a16')); rect(18, 18, 70, 60, hex('#e8d8b0'));
  rect(10, 62, 78, 65, hex('#e8d8b0')); rect(10, 62, 78, 62, C.blanco); rect(10, 65, 78, 66, hex('#8a6a4a'));
  rect(24, 55, 30, 61, hex('#b8582a')); rect(26, 49, 28, 55, hex('#4a8a3a')); rect(25, 51, 25, 53, hex('#4a8a3a')); rect(29, 50, 29, 52, hex('#4a8a3a')); pset(27, 48, hex('#ff7aa8'));
  rect(56, 53, 62, 61, hex('#9aa4b4')); rect(57, 54, 61, 57, hex('#c8d0dc')); pset(58, 55, hex('#5ad8f0')); pset(60, 55, hex('#5ad8f0')); rect(59, 51, 59, 52, hex('#6c7688')); pset(59, 50, hex('#e83a3a'));
  rect(6, 11, 82, 12, hex('#6a4a2a')); disco(6, 11, 1.5, hex('#8a6a4a')); disco(82, 11, 1.5, hex('#8a6a4a'));
  // el puf de pana en la esquina de delante y la pila de revistas (rayas de colores) junto a la mesa
  e_sombra(R, 12, 178, 18, 3, 0.35);
  for (let y = 158; y < 180; y++) for (let x = 0; x < 28; x++) { const d = ((x - 10) / 18) ** 2 + ((y - 172) / 14) ** 2; if (d > 1) continue; let c = d > 0.85 ? hex('#5a3a1a') : x + (y - 158) * 0.5 < 14 ? hex('#c89a40') : hex('#a87a2a'); if (x % 3 === 0 && d < 0.85) c = e_mezcla(c, C.k, 0.15); pset(x, y, c); }
  for (let k = 0; k < 6; k++) { const y = 163 - k * 2; rect(302 + (k & 1), y, 317 + (k & 1), y + 1, [hex('#d03a3a'), hex('#f0ece0'), hex('#3a6ad8'), hex('#e8c040'), hex('#f0ece0'), hex('#3a9a4a')][k]); pset(303 + (k & 1), y, C.blanco); }
  e_sombra(R, 310, 165, 9, 1, 0.3);
  // el foco del techo: un aplique de latón entre la estantería y los pósteres, con su cono de luz en la pared
  rect(172, 30, 173, 34, hex('#a8843a')); rect(170, 34, 175, 37, hex('#d8b050')); pset(171, 34, hex('#fff0b0'));
  for (let y = 38; y < 66; y++) for (let x = 172 - (y - 38) * 0.35; x <= 173 + (y - 38) * 0.35; x++) if (((Math.round(x) + y) & 1) === 0) { const c = R.pget(Math.round(x), y); R.pset(Math.round(x), y, e_mezcla(c, hex('#ffe8a8'), 0.22)); }
  // el borde de la sombra del techo en la esquina de Atom: pared tranquila
}

// la ciudad al atardecer por la ventana (cielo, nubes, pájaros, avión, antena, ventanas que se encienden)
function e_ventanaEstudio(R, t) {
  const P = E_P; R.recorte([19, 19, 69, 59]);
  e_degradado(R, 19, 19, 69, 59, [P.ocaso1, P.ocaso2, P.ocaso3, P.ocaso4, P.ocaso5]);
  R.disco(52, 50, 5, hex('#ffe8a8')); R.disco(52, 50, 4, hex('#fff6d8'));
  for (const [x0, y, w, v, k] of [[10, 26, 22, 0.6, 0], [60, 32, 16, 1.1, 1], [30, 40, 14, 1.7, 2]]) { const cx = 19 + ((x0 + t * v) % 80) - 15; e_nube(R, cx, y, w, k === 2 ? [hex('#c86a7a'), hex('#f0a07a'), hex('#ffd8a0')] : [hex('#6a4a8a'), hex('#a86a9a'), hex('#e8a0a0')]); }
  { const u = (t / 14) % 1, ax = Math.round(16 + u * 60), ay = 24 + Math.round(u * 3); R.pset(ax, ay, C.blanco); if (Math.floor(t * 3) % 2) R.pset(ax - 1, ay, hex('#ff5a5a')); for (let i = 2; i < 8; i++) if ((ax - i) & 1) R.pset(ax - i, ay, hex('#d8a0b0')); }
  for (let k = 0; k < 3; k++) { const u = ((t * 0.07 + k * 0.31) % 1), x = Math.round(72 - u * 60), y = 34 + k * 3 + Math.round(Math.sin(t + k) * 1.5); e_pajaro(R, x, y, t + k, hex('#3a2a4a')); }
  // la ciudad: dos capas de edificios con ventanas que se encienden, la antena con su luz
  for (let x = 19; x <= 69; x++) { const hh = 6 + Math.round(h(x >> 2, 1, 640) * 8); R.rect(x, 59 - hh, x, 59, hex('#5a3a6a')); }
  for (let x = 19; x <= 69; x++) { const b = x >> 3, hh = 3 + Math.round(h(b, 2, 641) * 9); R.rect(x, 59 - hh, x, 59, hex('#3a2448'));
    for (let y = 61 - hh; y < 59; y += 3) if ((x % 3 === 1) && h(x, y + Math.floor((t + b) / 3), 642) < 0.35) R.pset(x, y, hex('#ffd878')); }
  R.rect(38, 36, 38, 47, hex('#3a2448')); if (Math.sin(t * 3) > 0) R.pset(38, 35, hex('#ff4a4a'));
  R.recorte(null);
  // el cristal: un reflejo diagonal y los parteluces
  for (let i = 0; i < 12; i++) { R.pset(24 + i, 34 - i, e_mezcla(R.pget(24 + i, 34 - i), C.blanco, 0.35)); }
  R.rect(44, 18, 45, 60, hex('#e8d8b0')); R.rect(18, 38, 70, 39, hex('#e8d8b0')); R.rect(45, 18, 45, 60, hex('#b8a880'));
  // las cortinas de cuadros, que se mecen un poco
  for (const [x0, lado] of [[8, 1], [68, -1]]) for (let y = 13; y < 72; y++) { const sw = Math.round(Math.sin(t * 1.2 + y * 0.08) * (y - 13) / 40); for (let i = 0; i < 12; i++) { const x = x0 + i + sw * lado;
    let c = (i % 4 === 0) ? P.cortinaS : (i % 4 === 2) ? P.cortinaL : P.cortina; if ((y >> 2) % 3 === 0 && i % 4 !== 0) c = e_mezcla(c, hex('#f0d8a0'), 0.35); if (i === 0 || i === 11) c = P.cortinaS; R.pset(x, y, c); } }
}

// el juego inventado de los fosos en una pantalla [x0, y0, x1, y1]: campo verde, fosos negros, el muñequito que anda y se
// cae (y vuelve a salir), el marcador en bloques, líneas de barrido y las esquinas redondeadas
function e_juegoFosos(R, t, [x0, y0, x1, y1]) {
  const w = x1 - x0 + 1, hh = y1 - y0 + 1, s = Math.max(1, Math.floor(w / 26)), { rect } = R;
  rect(x0, y0, x1, y1, hex('#2a7a3a'));
  rect(x0, y0, x1, y0 + Math.round(hh * 0.18), hex('#1a3a6a'));
  for (let i = 0; i < 4; i++) { const c = i < (Math.floor(t * 0.5) % 5) ? hex('#f0d040') : hex('#3a5a8a'); rect(x0 + 2 * s + i * 3 * s, y0 + s, x0 + 3 * s + i * 3 * s, y0 + 2 * s, c); }
  for (let y = y0 + Math.round(hh * 0.18) + 1; y <= y1; y += 2 * s) R.rect(x0, y, x1, y, hex('#3a8a42'));
  const fosos = [[0.3, 0.45], [0.72, 0.4], [0.5, 0.78]];
  for (const [fx, fy] of fosos) { const cx = x0 + Math.round(fx * w), cy = y0 + Math.round(fy * hh), rx = Math.round(w * 0.12), ry = Math.max(2, Math.round(hh * 0.08));
    for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) if ((i / rx) ** 2 + (j / ry) ** 2 <= 1) R.pset(cx + i, cy + j, j < -ry / 2 ? hex('#1a4a22') : hex('#08100a')); }
  // el muñequito: anda hacia el foso, se cae, sale y vuelve
  const c = t % 4, fx = x0 + Math.round(0.3 * w), fy = y0 + Math.round(0.45 * hh);
  let mx = Math.round(x0 + 0.05 * w + Math.min(c, 1.8) / 1.8 * (fx - x0 - 0.05 * w)), my = fy - 2 * s, vis = 1;
  if (c > 1.8 && c < 2.6) { my = fy - 2 * s + Math.round((c - 1.8) * 8 * s); vis = c < 2.2 ? 1 : 0; }
  else if (c >= 2.6) { my = fy - Math.round((c - 2.6) / 1.4 * 3 * s); vis = c > 3.2 ? 1 : 0; }
  if (vis) { const k = hex('#c8e870'); rect(mx - s, my - 3 * s, mx + s, my - s, k); rect(mx, my - 4 * s, mx, my - 4 * s, k); rect(mx - s, my, mx - s, my + s, k); rect(mx + s, my, mx + s, my + s, k); R.pset(mx, my - 2 * s, hex('#1a1a1a')); }
  // las flores y una pieza del teléfono que brilla
  for (const [u, v] of [[0.15, 0.8], [0.85, 0.7], [0.6, 0.3]]) { R.pset(x0 + Math.round(u * w), y0 + Math.round(v * hh), hex('#f07aa8')); R.pset(x0 + Math.round(u * w), y0 + Math.round(v * hh) + 1, hex('#3a9a4a')); }
  if (Math.sin(t * 5) > 0) R.pset(x0 + Math.round(0.72 * w), y0 + Math.round(0.4 * hh), hex('#f0d040'));
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) { const p = R.pget(x, y); if (p) R.pset(x, y, e_mezcla(p, C.k, 0.18)); }
  for (const [cx, cy] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) R.pset(cx, cy, C.k);
  R.pset(x0 + 2, y0 + 2, e_mezcla(R.pget(x0 + 2, y0 + 2), C.blanco, 0.6)); R.pset(x0 + 3, y0 + 2, e_mezcla(R.pget(x0 + 3, y0 + 2), C.blanco, 0.4));
}

// el foso negro en el suelo del estudio, de radio 26 × 8 cuando está abierto del todo (u 0–1)
function e_foso(R, t, fx, fy, u) {
  if (u <= 0) return null;
  const e = u < 1 ? 1 - (1 - u) ** 3 : 1, rx = Math.max(2, Math.round(26 * e)), ry = Math.max(1, Math.round(8 * e)), pared = Math.max(1, Math.round(ry * 0.75));
  // la sombra tramada alrededor del agujero
  for (let j = -ry - 3; j <= ry + 3; j++) for (let i = -rx - 6; i <= rx + 6; i++) { const d = (i / rx) ** 2 + (j / ry) ** 2; if (d <= 1 || d > 1.6) continue; if (d > 1.3 && ((i + j) & 1)) continue; const c = R.pget(fx + i, fy + j); if (c) R.pset(fx + i, fy + j, e_mezcla(c, C.k, d < 1.3 ? 0.35 : 0.2)); }
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) {
    const d = (i / rx) ** 2 + (j / ry) ** 2; if (d > 1) continue;
    const d2 = (i / rx) ** 2 + ((j - pared) / ry) ** 2, x = fx + i, y = fy + j;
    let c;
    if (d2 > 1 && j < pared) { // la pared del fondo: las tablas cortadas, el entramado y la tierra, cada vez más oscuras
      const prof = (j + ry) / (ry + pared), tabla = ((x - 1) % 7 === 0);
      c = prof < 0.25 ? E_P.robleD : prof < 0.5 ? (tabla ? hex('#2a160a') : hex('#4a2a14')) : prof < 0.75 ? hex('#24140c') : hex('#120a08');
      if (prof >= 0.25 && h(x, y, 650) < 0.12) c = hex('#5a3a22');
    } else c = (j < pared + 2 && ((x + y) & 1)) ? hex('#0c0810') : hex('#050408');
    R.pset(x, y, c);
  }
  // el filo: el canto claro de las tablas al fondo, una línea oscura delante, las astillas y las grietas
  for (let i = -rx; i <= rx; i++) { const jj = -Math.round(ry * Math.sqrt(Math.max(0, 1 - (i / rx) ** 2))); R.pset(fx + i, fy + jj - 1, E_P.robleL); R.pset(fx + i, fy - jj + 1, E_P.robleD); }
  if (e > 0.4) {
    for (const [a, l] of [[0.35, 3], [-0.6, 2], [-1.9, 3], [-2.6, 2]]) { const px = fx + Math.round(Math.cos(a) * rx * 0.85), py = fy + Math.round(Math.sin(a) * ry * 0.85) - 1; R.linea(px, py, px + Math.round(Math.cos(a) * l), py + 1, E_P.robleL); R.pset(px, py + 1, E_P.robleD); }
    for (const [a, l] of [[-0.3, 6], [-2.8, 7], [3.4, 5], [0.1, 5]]) { let x = fx + Math.round(Math.cos(a) * (rx + 1)), y = fy + Math.round(Math.sin(a) * (ry + 1)); for (let k = 0; k < l; k++) { x += Math.cos(a) > 0 ? 1 : -1; y += k % 3 === 1 ? Math.sign(Math.sin(a) || 1) : 0; R.pset(x, y, E_P.robleD); } }
  }
  // el polvo que salta mientras se abre
  if (u > 0 && u < 1) for (let k = 0; k < 14; k++) { const a = h(k, 1, 651) * Math.PI * 2, r = 1 + u * (4 + h(k, 2, 651) * 8); R.pset(fx + Math.round(Math.cos(a) * (rx + r)), fy + Math.round(Math.sin(a) * (ry + r * 0.4)) - Math.round(u * 6 * h(k, 3, 651)), k % 2 ? hex('#e8c8a0') : hex('#c8a880')); }
  return { x: fx, y: fy, rx, ry };
}

// el estudio general: lo fijo, la ventana, la vida y el foso
function e_estudio(R, t, o) {
  const P = E_P; e_capa(R, 'estudio', e_estudioFijo);
  e_ventanaEstudio(R, t);
  // la monstera, que se mece
  for (const [a, l, s] of [[-2.2, 16, 5], [-1.6, 20, 6], [-1.1, 17, 5], [-2.7, 12, 4], [-0.6, 13, 4]]) { const aa = a + Math.sin(t * 1.3 + a * 3) * 0.06, bx = 10 + Math.round(Math.cos(aa) * l), by = 113 + Math.round(Math.sin(aa) * l);
    R.linea(10, 113, bx, by, hex('#3a6a2a')); R.disco(bx, by, s, hex('#2a5a2a')); R.disco(bx - 1, by - 1, s - 1, hex('#3a8a3a')); R.pset(bx - 2, by - 2, hex('#7ac05a')); R.pset(bx + 1, by, hex('#2a5a2a')); R.pset(bx, by + 1, hex('#2a5a2a')); }
  // la recreativa: la pantalla con las naves y las estrellas que bajan, el monedero que parpadea y la marquesina que late
  R.recorte([89, 46, 107, 70]);
  R.rect(89, 46, 107, 70, hex('#0a0a1e'));
  for (let k = 0; k < 12; k++) R.pset(89 + Math.floor(h(k, 1, 652) * 19), 46 + Math.floor((h(k, 2, 652) * 25 + t * (6 + k % 3 * 4)) % 25), k % 3 ? hex('#6a6aa8') : C.blanco);
  for (let k = 0; k < 4; k++) { const x = 92 + k * 4 + Math.round(Math.sin(t * 1.5)), y = 50 + (Math.floor(t * 2) % 2); R.rect(x, y, x + 2, y + 1, hex('#e86aa8')); R.pset(x + 1, y + 2, hex('#e86aa8')); }
  { const sx = 98 + Math.round(Math.sin(t * 1.1) * 6); R.rect(sx - 1, 66, sx + 1, 67, hex('#5ad8f0')); R.pset(sx, 65, hex('#5ad8f0')); if ((t % 1) < 0.5) R.rect(sx, 58 + Math.round((1 - (t % 1) * 2) * 6), sx, 59 + Math.round((1 - (t % 1) * 2) * 6), hex('#f0f070')); }
  R.recorte(null);
  for (const x of [94, 101]) R.pset(x, 96, Math.sin(t * 4 + x) > 0 ? hex('#ff4a3a') : hex('#7a2a1a'));
  if (Math.sin(t * 2.2) > 0.3) for (let x = 89; x < 108; x += 4) R.pset(x + 1, 37, C.blanco);
  // la lámpara de lava de la estantería: el cristal en cono y las burbujas que suben y bajan
  { const lx = 156, base = 64; R.rect(lx - 3, base - 2, lx + 3, base, hex('#a8a8b8')); R.rect(lx - 2, base - 19, lx + 2, base - 18, hex('#a8a8b8'));
    for (let y = base - 17; y < base - 2; y++) { const w = 1 + Math.round((y - (base - 17)) * 0.18); R.rect(lx - w, y, lx + w, y, hex('#5a1a6a')); }
    R.recorte([lx - 4, base - 17, lx + 4, base - 3]);
    for (let k = 0; k < 3; k++) { const y = base - 4 - Math.round((Math.sin(t * 0.6 + k * 2.1) * 0.5 + 0.5) * 12); R.disco(lx + (k - 1), y, 1.6, hex('#ff7a3a')); R.pset(lx + k - 1, y - 1, hex('#ffc070')); }
    R.recorte(null); e_halo(R, lx, base - 10, 8, 10, hex('#ff8a5a'), 0.18); }
  // el robotito de cuerda que anda por la balda de abajo y da la vuelta
  { const u = (t * 0.12) % 2, rx = Math.round(152 + (u < 1 ? u : 2 - u) * 10), d = u < 1 ? 1 : -1, y = 113, p = Math.floor(t * 6) % 2;
    R.rect(rx - 2, y - 7, rx + 2, y - 3, hex('#b8c0cc')); R.rect(rx - 1, y - 6, rx + 1, y - 5, hex('#3a4a5a')); R.pset(rx + d, y - 6, hex('#5ad8f0'));
    R.rect(rx - 1, y - 2, rx - 1, y - p, hex('#7a8494')); R.rect(rx + 1, y - 2, rx + 1, y - 1 + p, hex('#7a8494')); R.pset(rx, y - 8, Math.sin(t * 6) > 0 ? hex('#ff4a4a') : hex('#7a2a2a')); R.pset(rx - 3 * d, y - 5 + p, hex('#e8c040')); }
  // la tele: o.pantalla o el juego de los fosos, y el brillo de la pantalla en el aparador
  const pant = [204, 63, 232, 83];
  R.rect(202, 61, 234, 85, hex('#101418'));
  if (typeof o.pantalla === 'function') { R.recorte(pant); o.pantalla(R, t, pant); R.recorte(null); } else e_juegoFosos(R, t, pant);
  R.rect(202, 61, 234, 62, hex('#202a30')); R.pset(205, 64, e_mezcla(R.pget(205, 64), C.blanco, 0.5));
  e_tinte(R, 198, 91, 250, 93, hex('#7ae08a'), 0.12, true);
  // el disco que gira en el tocadiscos y el brazo
  { const a = t * 3.5; R.disco(262, 85, 4, hex('#1a1a1e')); R.pset(262 + Math.round(Math.cos(a) * 3), 85 + Math.round(Math.sin(a) * 1), hex('#5a5a62')); R.pset(262, 85, hex('#d03a3a')); R.linea(271, 83, 266, 86, hex('#d8d8e0')); }
  // el neón del mando sobre el altavoz, que tintinea de vez en cuando
  { const on = !((t % 6.1) > 5.6 && Math.sin(t * 40) > 0); const cR = on ? P.neonR : hex('#7a3a5a'), cA = on ? P.neonA : hex('#3a6a7a');
    if (on) e_halo(R, 262, 54, 14, 8, hex('#ff8ac0'), 0.22);
    R.rect(254, 56, 270, 59, cR); R.rect(255, 57, 269, 58, on ? hex('#ffd0e8') : cR); R.linea(262, 55, 260, 48, cA); R.disco(260, 47, 1.5, cA); R.pset(257, 57, cA); R.pset(266, 57, cA); }
  // el polvo que flota en la luz de la ventana
  for (let k = 0; k < 10; k++) { const x = 30 + Math.round((h(k, 1, 653) * 60 + t * 2 + Math.sin(t * 0.8 + k) * 3) % 70), y = 70 + Math.round((h(k, 2, 653) * 60 - t * 1.5 + 600) % 60); if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, hex('#ffe8b8')); }
  const f = e_foso(R, t, o.fosoX ?? 146, o.fosoY ?? 162, Math.max(0, Math.min(1, o.foso ?? 0)));
  return { suelo: 158, sueloMesa: 134, mesa: { x0: 172, x1: 300, y: 124, borde: 172, libre: [174, 214] }, foso: f ?? { x: o.fosoX ?? 146, y: o.fosoY ?? 162, rx: 0, ry: 0 }, pantalla: pant, ventana: [20, 20, 68, 58] };
}

// la mesa del estudio, por delante de los personajes: tablero de teca con su canto, cajones con tiradores, el hueco de
// las rodillas, la consola vieja con su cable, los dos mandos, dos cajas de juegos, el cajón de cartuchos y el flexo
function e_mesaEstudio(R, t, o) {
  const P = E_P, { rect, pset, linea, disco } = R;
  e_sombra(R, 236, 160, 66, 3, 0.3);
  rect(172, 124, 300, 131, C.k); rect(173, 125, 299, 129, P.tecaL); rect(173, 125, 299, 125, hex('#d8915a')); rect(173, 130, 299, 131, P.tecaS);
  for (let x = 176; x < 298; x += 9) pset(x + Math.round(h(x, 1, 660) * 4), 127, P.teca);
  rect(176, 132, 206, 158, C.k); e_vetasV(R, 177, 132, 205, 157, P.teca, P.tecaS, P.tecaL, 11);
  rect(266, 132, 296, 158, C.k); e_vetasV(R, 267, 132, 295, 157, P.teca, P.tecaS, P.tecaL, 12);
  rect(207, 132, 265, 136, C.k); rect(208, 132, 264, 135, P.tecaS); rect(207, 137, 265, 150, P.tecaD);
  for (const [x0, x1] of [[177, 205], [267, 295]]) for (const y of [140, 149]) { rect(x0, y, x1, y, P.tecaD); rect(x0, y + 1, x1, y + 1, P.tecaL); rect(((x0 + x1) >> 1) - 3, y - 4, ((x0 + x1) >> 1) + 3, y - 3, hex('#e8c060')); pset(((x0 + x1) >> 1) - 3, y - 4, hex('#fff0b0')); }
  rect(178, 158, 182, 160, C.k); rect(200, 158, 204, 160, C.k); rect(268, 158, 272, 160, C.k); rect(290, 158, 294, 160, C.k);
  // lo de encima (de derecha a izquierda queda libre el tablero x 174–214 para el cartucho que rueda): el flexo, el
  // cable, los mandos con su cable rizado, la consola, el cajón de cartuchos con su caja apoyada
  rect(292, 121, 300, 124, C.k); rect(293, 121, 299, 123, hex('#d84a2a')); linea(296, 121, 300, 104, hex('#d84a2a')); linea(300, 104, 288, 94, hex('#d84a2a')); disco(300, 104, 1, hex('#a8a8b0'));
  R.poligono([[290, 91], [282, 95], [285, 100], [293, 96]], hex('#d84a2a')); linea(284, 98, 292, 95, hex('#fff0b0'));
  linea(268, 124, 276, 110, hex('#2a2a2a'));
  PIEZAS_AT.joystick?.(R, 224, 128, { inclina: Math.sin(t * 0.7) * 0.4 }); for (let x = 227; x < 236; x++) pset(x, 125 + Math.round(Math.sin(x * 1.3)), C.k);
  PIEZAS_AT.consolaVieja?.(R, 252, 127, { cartucho: o.cartuchoMesa ?? 'naranja', palancas: Math.floor(t * 0.5) % 3 === 0 ? 5 : 0 });
  for (const [x, c, ic] of [[279, 'rojo', 'foso'], [285, 'verde', 'flor'], [291, 'amarillo', 'comecocos']]) PIEZAS_AT.cartucho?.(R, x, 118, { color: c, icono: ic });
  rect(274, 114, 296, 127, C.k); rect(275, 115, 295, 126, hex('#c8985a')); for (const y of [118, 122]) rect(275, y, 295, y, hex('#9a6a3a')); rect(275, 115, 295, 115, hex('#e8c080')); pset(277, 120, hex('#6a4a2a')); pset(293, 120, hex('#6a4a2a'));
  PIEZAS_AT.cajaCartucho?.(R, 296, 128, { color: 'azul', icono: 'nave' });
  e_halo(R, 270, 126, 26, 4, hex('#ffe8a8'), 0.3);
}

// el suelo de delante del foso, que se vuelve a pintar desde la capa fija para que quien cae se hunda en el agujero
function e_tapaFoso(R, o) {
  const b = e_CAPAS.get(R)?.get('estudio'); if (!b) return;
  const fx = o.fosoX ?? 146, fy = o.fosoY ?? 162, u = Math.max(0, Math.min(1, o.foso ?? 0)), e = u < 1 ? 1 - (1 - u) ** 3 : 1, rx = Math.max(2, Math.round(26 * e)), ry = Math.max(1, Math.round(8 * e));
  for (let y = fy + 1; y <= Math.min(179, fy + ry + 22); y++) for (let x = fx - rx - 1; x <= fx + rx + 1; x++) { const d = ((x - fx) / rx) ** 2 + ((y - fy) / ry) ** 2; if (d > 1) R.pset(x, y, d < 1.45 ? e_mezcla(b[y * 320 + x], C.k, 0.3) : b[y * 320 + x]); }
  for (let i = -rx; i <= rx; i++) { const jj = Math.round(ry * Math.sqrt(Math.max(0, 1 - (i / rx) ** 2))); if (jj >= 1) R.pset(fx + i, fy + jj + 1, E_P.robleD); }
}

// la mesa de cerca: lo fijo (pared, tele, tablero, cajón, caja) y la vida (pantalla, taza que humea, luz y motas)
function e_mesaFija(R) {
  const P = E_P, { rect, pset, disco, linea } = R;
  for (let y = 0; y < 62; y++) for (let x = 0; x < 320; x++) { const b = Math.floor((x + 3) / 16) & 1, xi = (x + 3) % 16; let c = b ? P.papelS : P.papel; if (xi === 0 || xi === 15) c = P.papelM;
    if (!b && y % 22 === 11 && xi > 5 && xi < 10 && x < 266) c = P.papelL; if (h(x, y, 670) < 0.03) c = P.papelM; pset(x, y, c); }
  rect(0, 62, 319, 65, P.nogalD); rect(0, 62, 319, 62, P.nogalL);
  e_vetasV(R, 0, 66, 319, 96, P.nogal, P.nogalS, P.nogalL, 21); for (let x = 30; x < 320; x += 60) { rect(x, 66, x + 1, 96, P.nogalD); rect(x + 2, 66, x + 2, 96, P.nogalL); }
  // el póster del marcianito, grande y cortado por el borde, y el banderín de cuadros
  rect(180, 18, 232, 58, C.k); rect(181, 19, 231, 57, hex('#141a30'));
  ['..#.....#..', '...#...#...', '..#######..', '.##.###.##.', '###########', '#.#######.#', '#.#.....#.#', '...##.##...'].forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') rect(185 + i * 4, 22 + j * 4, 188 + i * 4, 25 + j * 4, hex('#5adc5a')); });
  for (let k = 0; k < 20; k++) pset(182 + Math.floor(h(k, 1, 671) * 48), 20 + Math.floor(h(k, 2, 671) * 36), hex('#8a9ac8'));
  for (const [x, y] of [[182, 20], [230, 20]]) pset(x, y, hex('#e83a3a'));
  // el tablero de la mesa visto desde arriba, en perspectiva: vetas largas, juntas de las tablas y el canto de atrás
  rect(0, 96, 319, 99, P.tecaD); rect(0, 96, 319, 96, P.tecaL);
  for (let y = 100; y < 180; y++) { const f = (y - 100) / 80; for (let x = 0; x < 320; x++) { const vx = x + Math.round(Math.sin(y * 0.05 + x * 0.002) * 3);
    let c = P.tecaL; if ((vx % 41) === 0) c = P.tecaD; else if (h(vx >> 1, y >> 2, 672) < 0.18) c = P.teca; else if (h(vx, y >> 1, 673) < 0.05) c = P.tecaS; if (f < 0.15 && ((x + y) & 1)) c = e_mezcla(c, C.k, 0.12); pset(x, y, c); } }
  // la tele grande: mueble con vetas, marco negro, ruedas, rejilla, antenas; su sombra en el tablero
  e_sombra(R, 88, 104, 56, 5, 0.3);
  linea(84, 22, 72, 15, hex('#c8c8d0')); linea(88, 22, 100, 16, hex('#c8c8d0')); disco(72, 15, 1, C.blanco); disco(100, 16, 1, C.blanco); rect(80, 20, 92, 24, C.k);
  rect(32, 24, 144, 104, C.k); e_vetasV(R, 33, 25, 143, 103, P.teca, P.tecaS, P.tecaL, 31); rect(33, 25, 143, 26, P.tecaL);
  rect(38, 30, 114, 90, C.k); rect(40, 32, 112, 88, hex('#101418'));
  rect(118, 30, 140, 98, hex('#2a2a30')); for (const y of [40, 56]) { disco(129, y, 6, hex('#9a9aa8')); disco(129, y, 4, hex('#c8c8d0')); disco(129, y, 1.5, hex('#4a4a52')); for (let a = 0; a < 8; a++) pset(129 + Math.round(Math.cos(a * 0.785) * 5), y + Math.round(Math.sin(a * 0.785) * 5), hex('#6a6a72')); }
  for (let y = 68; y < 96; y += 3) rect(120, y, 138, y, C.k);
  rect(36, 104, 46, 107, C.k); rect(130, 104, 140, 107, C.k);
  rect(38, 92, 114, 100, P.tecaS); for (let x = 42; x < 112; x += 8) rect(x, 94, x + 4, 97, P.tecaD);
  // la caja de un juego apoyada y el cajón de cartuchos al fondo derecha
  e_sombra(R, 262, 122, 36, 4, 0.3);
  for (const [x, c, ic] of [[244, 'rojo', 'foso'], [258, 'verde', 'flor'], [272, 'morado', 'nave'], [286, 'amarillo', 'comecocos']]) PIEZAS_AT.cartucho?.(R, x, 104, { color: c, icono: ic, s: 2 });
  rect(230, 96, 300, 124, C.k); rect(231, 97, 299, 123, hex('#c8985a')); for (const y of [104, 112]) { rect(231, y, 299, y, hex('#9a6a3a')); rect(231, y + 1, 299, y + 1, hex('#e0b070')); } rect(231, 97, 299, 98, hex('#e8c080'));
  for (let x = 236; x < 298; x += 11) pset(x, 108 + (x & 1), hex('#6a4a2a'));
  PIEZAS_AT.cajaCartucho?.(R, 306, 126, { color: 'azul', icono: 'nave', s: 2 });
}

function e_mesaCerca(R, t, o) {
  const P = E_P; e_capa(R, 'mesa', e_mesaFija);
  const pant = [42, 34, 110, 86];
  if (typeof o.pantalla === 'function') { R.recorte(pant); o.pantalla(R, t, pant); R.recorte(null); } else e_juegoFosos(R, t, pant);
  for (let i = 0; i < 18; i++) { const x = 46 + i, y = 50 - i; R.pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.3)); }
  e_tinte(R, 36, 100, 140, 112, hex('#7ae08a'), 0.1, true);
  // la consola al triple con el cartucho pinchado, los cables en curva y los dos mandos
  e_sombra(R, 196, 130, 54, 4, 0.35);
  for (const [x0, y0, x1, y1] of [[160, 116, 120, 150], [236, 116, 262, 146]]) { for (let k = 0; k <= 30; k++) { const u = k / 30, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 10); R.pset(x, y, C.k); R.pset(x, y + 1, hex('#3a3a3e')); } }
  const puesto = o.cartuchoPuesto === undefined ? 'naranja' : o.cartuchoPuesto;
  PIEZAS_AT.consolaVieja?.(R, 196, 128, { s: 3, cartucho: puesto || undefined, palancas: (Math.floor(t * 0.4) % 4) === 1 ? 2 : 0 });
  e_sombra(R, 120, 152, 12, 2, 0.35); e_sombra(R, 262, 148, 12, 2, 0.35);
  PIEZAS_AT.joystick?.(R, 120, 152, { s: 2, inclina: Math.sin(t * 1.3) * 0.6, pulsado: Math.sin(t * 3) > 0.7 });
  PIEZAS_AT.joystick?.(R, 262, 148, { s: 2, dir: -1 });
  // la taza de café que humea, con su asa y su brillo
  { const x = 14, y = 160; e_sombra(R, x + 6, y + 1, 9, 2, 0.35); R.rect(x, y - 14, x + 12, y, C.k); R.rect(x + 1, y - 13, x + 11, y - 1, hex('#e8e0d0')); R.rect(x + 1, y - 13, x + 11, y - 12, hex('#4a2a1a')); R.rect(x + 9, y - 11, x + 11, y - 1, hex('#c8c0b0'));
    R.rect(x + 13, y - 10, x + 15, y - 4, C.k); R.rect(x + 13, y - 9, x + 14, y - 5, hex('#e8e0d0')); R.rect(x + 3, y - 8, x + 7, y - 6, hex('#d84a2a'));
    for (let k = 0; k < 3; k++) for (let j = 0; j < 14; j++) { const yy = y - 15 - j - Math.floor((t * 6 + k * 5) % 6), xx = x + 4 + k * 2 + Math.round(Math.sin(t * 2 + j * 0.5 + k) * 1.5); if ((j + k) % 3 && yy > y - 34) R.pset(xx, yy, e_mezcla(R.pget(xx, yy), C.blanco, 0.45 - j * 0.025)); } }
  // la luz del flexo (fuera de cuadro, a la derecha) y las motas que flotan en ella
  e_halo(R, 250, 150, 70, 22, hex('#ffe8b0'), 0.18);
  for (let k = 0; k < 12; k++) { const x = 190 + Math.round((h(k, 1, 674) * 110 + Math.sin(t * 0.7 + k) * 4) % 120), y = 60 + Math.round((h(k, 2, 674) * 80 + t * (1 + k % 3)) % 80); if (Math.sin(t * 2.4 + k * 1.7) > -0.2) R.pset(x, y, hex('#fff0c8')); }
  return { suelo: 172, mesa: { y: 160, x0: 0, x1: 319, libre: [40, 150, 300, 170], borde: 172 }, pantalla: pant, consola: [145, 86, 247, 128] };
}

// el canto de la mesa de cerca, por delante: lo que cae por el borde queda detrás
function e_cantoMesa(R) { R.rect(0, 172, 319, 179, E_P.tecaS); R.rect(0, 172, 319, 172, hex('#e0a060')); R.rect(0, 173, 319, 173, E_P.tecaL); for (let x = 0; x < 320; x += 5) R.pset(x + (x % 3), 176, E_P.tecaD); R.rect(0, 179, 319, 179, E_P.tecaD); }

const E_Q = pal({
  yeso: '#e9dcc4', yesoS: '#ddcdb2', yesoL: '#f3e9d6', zocalo: '#f6f0e4', zocaloS: '#cfc2aa', parq: '#b98652', parqS: '#9e6e40', parqL: '#d09a62', parqD: '#7a5030',
  cuero: '#b8743a', cueroS: '#8a5226', cueroL: '#d8975a', cueroD: '#5a3014', terc: '#3e6a5a', tercS: '#2a4c40', tercL: '#5a8a74', tercD: '#1a3028',
  alf1: '#c8b48e', alf2: '#a8543a', alf3: '#5a7a6a', cielo1: '#6aaee0', cielo2: '#9acbe8', cielo3: '#cfe6ee', colina: '#d8b060', colinaS: '#b88e44', colinaL: '#ecc878',
  roble: '#3e5a2e', cristal: '#5a8aa8', cristalL: '#9ac8e0', cristalS: '#3a6a88', acero: '#2a2a30',
});

// el parqué de espiga
function e_espiga(R, y0, y1) {
  const Q = E_Q;
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const u = Math.floor((x + y * 2) / 8), v = Math.floor((x - y * 2 + 2000) / 8), a = (u + v) & 1;
    const tono = h(a ? u : v, a ? v >> 1 : u >> 1, 680); let c = tono < 0.3 ? Q.parqS : tono > 0.85 ? Q.parqL : Q.parq;
    if (((x + y * 2) % 8 === 0 && a) || ((x - y * 2 + 2000) % 8 === 0 && !a)) c = Q.parqD; R.pset(x, y, c); }
}

// la vista del ventanal: cielo tramado, nubes de tres tonos, pájaros, colinas doradas con robles, oficinas de cristal
// con reflejos que corren, la carretera con coches y el seto que se mece; dentro de [x0, y0, x1, y1]
function e_vistaValle(R, t, x0, y0, x1, y1, hor) {
  const Q = E_Q; R.recorte([x0, y0, x1, y1]);
  const rc = (a, b, c, d, col) => { a = Math.max(a, x0); b = Math.max(b, y0); c = Math.min(c, x1); d = Math.min(d, y1); if (a <= c && b <= d) R.rect(a, b, c, d, col); };   // R.rect no respeta el recorte
  e_degradado(R, x0, y0, x1, hor, [Q.cielo1, Q.cielo2, Q.cielo3]);
  for (const [xa, y, w, v] of [[0, y0 + 8, 30, 1.2], [70, y0 + 14, 22, 2.1], [120, y0 + 5, 18, 0.7], [40, y0 + 20, 14, 3]]) { const cx = x0 + ((xa + t * v) % (x1 - x0 + 60)) - 30; e_nube(R, cx, y, w, [hex('#b8cce0'), hex('#e6eef6'), C.blanco]); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.05 + k * 0.27) % 1, x = Math.round(x1 + 10 - u * (x1 - x0 + 20)), y = y0 + 12 + k * 4 + Math.round(Math.sin(t * 1.3 + k) * 2); e_pajaro(R, x, y, t + k, hex('#3a3a4a')); }
  // las colinas en dos capas y los robles
  for (let x = x0; x <= x1; x++) { const a = hor - 10 - Math.round(6 * Math.sin(x * 0.03 + 1) + 3 * Math.sin(x * 0.11)); rc(x, a, x, hor + 12, hex('#c8a870')); if ((x + a) & 1) R.pset(x, a, hex('#e6cc96')); }
  for (let x = x0; x <= x1; x++) { const a = hor - 2 - Math.round(4 * Math.sin(x * 0.05 + 3)); for (let y = a; y <= y1; y++) R.pset(x, y, (h(x, y, 681) < 0.15) ? Q.colinaS : (y === a ? Q.colinaL : Q.colina)); }
  for (let k = 0; k < 9; k++) { const x = x0 + 6 + Math.floor(h(k, 1, 682) * (x1 - x0 - 12)), y = hor + Math.floor(h(k, 2, 682) * 6); R.disco(x, y - 2, 2 + (k % 2), Q.roble); R.pset(x - 1, y - 3, hex('#5a7a3a')); R.pset(x, y, hex('#4a3a2a')); }
  // las oficinas de cristal: bloques con su rejilla y un reflejo que corre por la fachada
  for (const [bx, bw, bh, k] of [[x0 + 18, 26, 22, 0], [x0 + 52, 34, 16, 1], [x0 + 96, 22, 26, 2]]) { const yb = hor + 8;
    rc(bx, yb - bh, bx + bw, yb, Q.cristalS); for (let y = yb - bh + 1; y < yb; y++) for (let x = bx + 1; x < bx + bw; x++) { let c = (y - (yb - bh)) % 4 === 0 ? Q.acero : (x - bx) % 6 === 0 ? hex('#4a7a98') : Q.cristal; if (((x - bx + y - (yb - bh) - Math.floor(t * 8) + k * 20) % 40 + 40) % 40 < 4) c = Q.cristalL; R.pset(x, y, c); }
    rc(bx, yb - bh, bx + bw, yb - bh, hex('#d8e8f0')); rc(bx + bw, yb - bh, bx + bw, yb, hex('#2a4a5a')); }
  // la carretera con los coches que pasan, y el seto
  rc(x0, y1 - 7, x1, y1 - 4, hex('#7a7a80')); for (let x = x0; x <= x1; x += 6) rc(x, y1 - 6, x + 2, y1 - 6, hex('#e8e0b0'));
  for (const [v, c, d] of [[0.09, '#d83a3a', 1], [0.06, '#f0f0f0', -1], [0.12, '#3a6ad8', 1]]) { const u = (t * v + d * 0.3 + 1) % 1, x = d > 0 ? Math.round(x0 - 10 + u * (x1 - x0 + 20)) : Math.round(x1 + 10 - u * (x1 - x0 + 20)), y = d > 0 ? y1 - 5 : y1 - 7;
    rc(x - 3, y - 2, x + 3, y, hex(c)); rc(x - 2, y - 3, x + 1, y - 3, hex('#a8c8e0')); R.pset(x - 2, y + 1, C.k); R.pset(x + 2, y + 1, C.k); }
  for (let x = x0; x <= x1; x++) { const a = y1 - 2 - Math.round(1 + Math.sin(x * 0.7 + t * 2) * 0.8 + h(x, 1, 683)); rc(x, a, x, y1, h(x, 2, 683) < 0.3 ? hex('#3a5a2a') : hex('#4e7a36')); if (h(x, 3, 683) < 0.2) R.pset(x, a, hex('#8ab05a')); }
  R.recorte(null);
}

// lo fijo de la consulta
function e_consultaFija(R) {
  const Q = E_Q, { rect, pset, disco, linea, poligono } = R;
  // la cornisa, la pared de yeso con su estuco y la luz que entra, y el rodapié
  rect(0, 0, 319, 4, hex('#d6c8ae')); rect(0, 4, 319, 4, hex('#f6eedc')); rect(0, 5, 319, 6, hex('#c8b89a'));
  for (let y = 7; y < 108; y++) for (let x = 0; x < 320; x++) { let c = Q.yeso; const n = h(x, y, 690); if (n < 0.08) c = Q.yesoS; else if (n > 0.95) c = Q.yesoL; if (y < 14 && ((x + y) & 1)) c = e_mezcla(c, C.k, 0.06); pset(x, y, c); }
  rect(0, 108, 319, 113, Q.zocalo); rect(0, 108, 319, 108, C.blanco); rect(0, 113, 319, 113, Q.zocaloS);
  e_tarima(R, 114, 179, [Q.parq, Q.parqS, Q.parqL, Q.parqD], 3);
  // la alfombra de lana: campo de arena, cenefa de rombos terracota y verde, flecos
  for (let y = 126; y <= 176; y++) { const f = (y - 126) / 50, xa = Math.round(40 - f * 30), xb = Math.round(290 + f * 26);
    for (let x = xa; x <= xb; x++) { const bord = Math.min(x - xa, xb - x, y - 126, 176 - y); let c = Q.alf1;
      if (bord < 2) c = Q.alf2; else if (bord < 6) c = ((x + y * 2) % 6 < 3) ? Q.alf3 : Q.alf2; else if (bord < 7) c = Q.alf2; else if ((x * 3 + y * 7) % 23 === 0) c = hex('#b8a07a');
      if (((x + y) & 1) && bord > 7) c = e_mezcla(c, hex('#fff6e0'), 0.06); pset(x, y, c); } }
  for (let x = 12; x < 318; x += 2) pset(x, 177, hex('#e8dcc0'));
  // la estantería de nogal con libros, plantas, un jarrón, un trofeo y fotos
  e_tinte(R, 81, 20, 84, 113, C.k, 0.2);
  rect(6, 18, 80, 113, hex('#4a2c18')); rect(8, 20, 78, 112, hex('#2e1a0e'));
  const LIB = [hex('#a83a2a'), hex('#2a4a6a'), hex('#d8c08a'), hex('#4a6a3a'), hex('#8a2a3a'), hex('#e8dcc8'), hex('#3a3a4a'), hex('#c87a3a')];
  e_lomos(R, 10, 76, 40, 16, LIB, 11); e_lomos(R, 10, 50, 63, 16, LIB, 12); e_lomos(R, 28, 76, 86, 16, LIB, 13); e_lomos(R, 10, 60, 109, 16, LIB, 14);
  rect(56, 54, 66, 63, hex('#b8582a')); rect(57, 54, 65, 55, hex('#d8783a')); for (const [dx, dy] of [[-4, -6], [0, -9], [4, -5], [-2, -3], [3, -2]]) { disco(61 + dx, 53 + dy, 2, hex('#3a7a3a')); pset(60 + dx, 52 + dy, hex('#7ac05a')); }
  rect(68, 52, 74, 63, C.k); rect(69, 53, 73, 62, hex('#e8dcc8')); rect(70, 55, 72, 59, hex('#7aa8c8'));
  rect(12, 72, 24, 86, hex('#c8a040')); rect(13, 73, 23, 85, hex('#e8e0d0')); rect(14, 76, 22, 82, hex('#8ab0c8')); disco(18, 80, 2, hex('#e8b890'));
  rect(64, 98, 70, 109, hex('#5a7a9a')); rect(63, 96, 71, 98, hex('#5a7a9a')); rect(65, 99, 65, 107, hex('#8aaac8'));
  rect(70, 104, 76, 109, hex('#d8a040')); rect(72, 100, 74, 104, hex('#d8a040')); disco(73, 99, 2, hex('#f0c860'));
  for (const y of [41, 64, 87, 110]) { rect(7, y, 79, y + 2, hex('#6a4024')); rect(7, y, 79, y, hex('#8a5a34')); }
  rect(6, 18, 8, 113, hex('#6a4024')); rect(78, 18, 80, 113, hex('#3a2010')); rect(6, 18, 80, 19, hex('#8a5a34'));
  // el cartucho viejo enmarcado: caja de sombra, paspartú verde, su sombra y la luz de cuadro de latón
  e_tinte(R, 89, 33, 113, 63, C.k, 0.25);
  rect(86, 30, 110, 60, hex('#1e1a16')); rect(87, 31, 109, 59, hex('#3a3026')); rect(89, 33, 107, 57, hex('#2a4a3a'));
  for (let y = 34; y < 57; y++) for (let x = 90; x < 107; x++) if ((x + y) % 3 === 0) pset(x, y, hex('#24402f'));
  PIEZAS_AT.cartucho?.(R, 98, 52, { color: 'gris', icono: 'foso' }); rect(92, 54, 104, 54, hex('#e8dcc8'));
  rect(92, 27, 104, 28, hex('#c8a040')); rect(97, 26, 99, 29, hex('#8a6a20')); rect(92, 27, 104, 27, hex('#f0d880'));
  for (let y = 30; y < 44; y++) for (let x = 90 - (y - 30) * 0.3; x < 106 + (y - 30) * 0.3; x++) if (((Math.round(x) + y) & 1) === 0) { const c = R.pget(Math.round(x), y); R.pset(Math.round(x), y, e_mezcla(c, hex('#fff0c0'), 0.18)); }
  // el ventanal de acero: marco negro, tres hojas, travesaño, alféizar
  rect(118, 18, 252, 92, Q.acero);
  rect(119, 92, 251, 95, hex('#f6f0e4')); rect(116, 95, 254, 96, Q.zocaloS); rect(116, 92, 254, 92, C.blanco);
  // la luz del ventanal en el suelo
  for (let y = 114; y < 176; y++) { const d = Math.round((y - 114) * 0.7); for (let x = 120 + d; x <= 250 + d; x++) if (((x + y) & 1) === 0 && x < 320) { const c = R.pget(x, y); R.pset(x, y, e_mezcla(c, hex('#fff4d8'), 0.2 * (1 - (y - 114) / 70))); } }
  // los marcos de la pared derecha: dos diplomas con rayas
  for (const [x0, y0] of [[260, 48], [260, 66]]) { e_tinte(R, x0 + 2, y0 + 2, x0 + 15, y0 + 13, C.k, 0.2); rect(x0, y0, x0 + 13, y0 + 11, hex('#2a2420')); rect(x0 + 1, y0 + 1, x0 + 12, y0 + 10, hex('#f6f0e0')); rect(x0 + 3, y0 + 3, x0 + 10, y0 + 3, hex('#8a8a96')); rect(x0 + 3, y0 + 5, x0 + 9, y0 + 5, hex('#b8b8c0')); rect(x0 + 3, y0 + 7, x0 + 10, y0 + 7, hex('#b8b8c0')); disco(x0 + 9, y0 + 9, 1, hex('#c83a3a')); }
  // la lámpara de arco: base de mármol, el arco de latón y la pantalla sobre el sillón
  rect(98, 136, 112, 140, hex('#e8e4dc')); rect(98, 136, 112, 136, C.blanco); rect(98, 140, 112, 140, hex('#a8a49c'));
  for (let k = 0; k <= 80; k++) { const u = k / 80, x = Math.round((1 - u) ** 2 * 105 + 2 * u * (1 - u) * 124 + u * u * 74), y = Math.round((1 - u) ** 2 * 136 + 2 * u * (1 - u) * 40 + u * u * 72); pset(x, y, hex('#c8a040')); pset(x + 1, y, hex('#8a6a20')); }
  // la mesita redonda con el vaso, los pañuelos y el cartucho viejo
  e_sombra(R, 148, 150, 26, 3, 0.3);
  rect(146, 139, 150, 150, hex('#5a3a22')); rect(138, 149, 158, 151, hex('#5a3a22'));
  for (let j = -3; j <= 3; j++) for (let i = -24; i <= 24; i++) if ((i / 24) ** 2 + (j / 3.5) ** 2 <= 1) pset(148 + i, 136 + j, j < -1 ? hex('#c8925a') : j < 2 ? hex('#a8703a') : hex('#7a4a22'));
  rect(124, 137, 172, 139, hex('#6a4024'));
  rect(130, 126, 135, 134, hex('#c8dce6')); rect(131, 129, 134, 134, hex('#9ac0d8')); rect(130, 126, 130, 134, C.blanco);
  rect(152, 128, 166, 134, hex('#e8f0f0')); rect(152, 128, 166, 128, C.blanco); rect(152, 131, 166, 131, hex('#7ab0c0'));
  PIEZAS_AT.cartucho?.(R, 143, 135, { color: 'gris', icono: 'foso' });
  // el sillón de cuero del terapeuta (respaldo con capitoné) y el diván de terciopelo del paciente (respaldo y rulo)
  e_sombra(R, 72, 154, 30, 3, 0.35); e_sombra(R, 228, 152, 46, 3, 0.35);
  disco(71, 116, 22, C.k); rect(48, 116, 94, 140, C.k);
  for (let y = 95; y <= 140; y++) for (let x = 49; x <= 93; x++) { if (y < 116 && (x - 71) ** 2 + (y - 116) ** 2 > 21 * 21) continue; const u = (x - 49) / 44; let c = u < 0.2 ? Q.cueroL : u > 0.8 ? Q.cueroS : Q.cuero;
    if ((y - 92) % 10 === 0 && (x - 51) % 8 === 0) c = Q.cueroD; else if ((y - 92) % 10 === 1 && (x - 51) % 8 === 0) c = Q.cueroL; pset(x, y, c); }
  rect(188, 114, 270, 138, C.k);
  for (let y = 115; y <= 137; y++) for (let x = 189; x <= 269; x++) { const u = (y - 115) / 22; let c = u < 0.15 ? Q.tercL : u > 0.85 ? Q.tercS : Q.terc; if ((y - 119) % 8 === 0 && (x - 193 + ((y - 119) % 16 ? 5 : 0)) % 10 === 0) c = Q.tercD; if (((x + y) & 3) === 0) c = e_mezcla(c, Q.tercL, 0.2); pset(x, y, c); }
  rect(262, 106, 276, 138, C.k); for (let y = 107; y <= 137; y++) for (let x = 263; x <= 275; x++) pset(x, y, x < 266 ? Q.tercL : x > 272 ? Q.tercD : Q.terc); for (let y = 110; y < 136; y += 6) rect(263, y, 275, y, Q.tercS);
  disco(234, 126, 6, hex('#a87a20')); disco(233, 125, 5, hex('#d8a040')); pset(231, 122, hex('#f0d080')); rect(246, 120, 257, 131, hex('#7a3a26')); rect(247, 121, 256, 130, hex('#a8543a')); rect(247, 121, 256, 122, hex('#c87a5a'));
  // la mesita auxiliar del terapeuta con la libreta y la taza
  rect(20, 128, 40, 130, hex('#5a3a22')); rect(20, 128, 40, 128, hex('#8a5a34')); rect(22, 131, 23, 150, hex('#5a3a22')); rect(37, 131, 38, 150, hex('#5a3a22'));
  rect(23, 124, 33, 127, hex('#f6f0e0')); rect(23, 124, 33, 124, hex('#3a5a8a')); rect(34, 121, 38, 127, hex('#e8e0d0')); rect(34, 121, 38, 122, hex('#6a3a1a'));
}

function e_consulta(R, t, o) {
  const Q = E_Q; e_capa(R, 'consulta', e_consultaFija);
  e_vistaValle(R, t, 120, 20, 250, 90, 60);
  // los parteluces y el reflejo del cristal
  for (const x of [162, 207]) R.rect(x, 20, x + 1, 90, Q.acero); R.rect(120, 63, 250, 64, Q.acero);
  for (let i = 0; i < 14; i++) for (const x0 of [128, 214]) { const x = x0 + i, y = 40 - i; R.pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.3)); R.pset(x + 1, y, e_mezcla(R.pget(x + 1, y), C.blanco, 0.2)); }
  // los visillos de lino que se mecen con el aire
  for (const [x0, lado] of [[108, 1], [244, 0]]) for (let y = 14; y < 106; y++) { const sw = Math.round(Math.sin(t * 0.9 + y * 0.06) * (y - 14) / 50); for (let i = 0; i < 14; i++) { const x = x0 + i + sw; let c = (i % 5 === 0) ? hex('#e0d6c2') : (i % 5 === 2) ? hex('#fbf6ec') : hex('#f2eadc'); if (i === (lado ? 13 : 0)) c = hex('#d6cab4'); R.pset(x, y, ((x + y) & 1) && i % 5 > 2 ? e_mezcla(c, R.pget(x, y), 0.25) : c); } }
  R.rect(104, 12, 262, 13, hex('#2a2a30'));
  // el reloj de pared: las agujas andan
  { const cx = 270, cy = 92; R.disco(cx, cy, 7, hex('#2a2420')); R.disco(cx, cy, 6, hex('#f6f0e4')); for (let k = 0; k < 12; k++) R.pset(cx + Math.round(Math.cos(k * 0.5236) * 5), cy + Math.round(Math.sin(k * 0.5236) * 5), hex('#8a8a96'));
    const am = t * 0.1 - Math.PI / 2, as = t * 1.05 - Math.PI / 2; R.linea(cx, cy, cx + Math.round(Math.cos(am) * 4), cy + Math.round(Math.sin(am) * 4), C.k); R.linea(cx, cy, cx + Math.round(Math.cos(1.2) * 3), cy + Math.round(Math.sin(1.2) * 3), C.k); R.linea(cx, cy, cx + Math.round(Math.cos(as) * 5), cy + Math.round(Math.sin(as) * 5), hex('#c83a3a')); }
  // el ficus de hoja de violín en su maceta, que se mueve con el aire
  { const px = 292; R.rect(282, 116, 302, 134, C.k); R.rect(283, 117, 301, 133, hex('#e8e0d0')); R.rect(283, 117, 301, 119, C.blanco); R.rect(298, 120, 300, 133, hex('#c8c0b0')); e_sombra(R, 292, 135, 12, 2, 0.3);
    R.linea(px, 116, px - 2, 70, hex('#6a4a2a')); R.linea(px - 1, 96, px + 8, 80, hex('#6a4a2a')); R.linea(px - 1, 86, px - 10, 70, hex('#6a4a2a'));
    for (let k = 0; k < 16; k++) { const bx = px - 14 + Math.floor(h(k, 1, 684) * 28) + Math.round(Math.sin(t * 1.1 + k) * (k % 3 === 0 ? 1 : 0)), by = 58 + Math.floor(h(k, 2, 684) * 50), s = 3 + (k % 2);
      R.disco(bx, by, s, hex('#2a5a2a')); R.disco(bx - 1, by - 1, s - 1, hex('#3e7a34')); R.pset(bx - 2, by - 2, hex('#7ab05a')); R.linea(bx - s + 2, by + s - 2, bx + 1, by - 1, hex('#2a5a2a')); } }
  // la lámpara: la pantalla de latón y su luz cálida sobre el sillón; el vapor de la taza; el agua del vaso que brilla
  R.poligono([[66, 72], [80, 72], [84, 80], [62, 80]], hex('#c8a040')); R.rect(63, 80, 83, 80, hex('#fff0b0')); e_halo(R, 72, 100, 30, 26, hex('#ffe8b0'), 0.18);
  for (let k = 0; k < 2; k++) for (let j = 0; j < 10; j++) { const yy = 119 - j - Math.floor((t * 5 + k * 4) % 5), xx = 36 + k + Math.round(Math.sin(t * 2 + j * 0.6 + k) * 1.2); if ((j + k) % 3) R.pset(xx, yy, e_mezcla(R.pget(xx, yy), C.blanco, 0.4 - j * 0.03)); }
  R.pset(132 + (Math.floor(t * 2) % 2), 129, C.blanco);
  // el pañuelo que asoma de la caja, mecido
  { const sw = Math.round(Math.sin(t * 2) * 1); R.poligono([[157, 128], [161, 128], [160 + sw, 122], [158 + sw, 123]], C.blanco); R.pset(159 + sw, 124, hex('#d8e0e8')); }
  return { suelo: 160, sillon: { x: 64, suelo: 148, tapa: 139 }, divan: { x: 210, suelo: 146, tapa: 137, x0: 190, x1: 262 }, mesita: { x: 148, y: 133 }, ventana: [120, 20, 250, 90], cartuchoMesa: [143, 135] };
}

// el asiento, los brazos y las patas del sillón de cuero, por delante de quien se sienta
function e_sillonDelante(R) {
  const Q = E_Q; R.rect(44, 138, 98, 152, C.k);
  for (let y = 139; y <= 151; y++) for (let x = 45; x <= 97; x++) { const brazo = x < 54 || x > 88; let c = brazo ? (x < 48 || x > 94 ? Q.cueroS : Q.cuero) : y < 141 ? Q.cueroL : Q.cuero; if (y > 148) c = Q.cueroS; if (!brazo && y === 145) c = Q.cueroS; R.pset(x, y, c); }
  for (const x0 of [44, 89]) { R.rect(x0, 124, x0 + 9, 140, C.k); for (let y = 125; y <= 140; y++) for (let x = x0 + 1; x <= x0 + 8; x++) R.pset(x, y, y < 127 ? Q.cueroL : x < x0 + 3 ? Q.cueroL : x > x0 + 6 ? Q.cueroS : Q.cuero); R.rect(x0 + 1, 125, x0 + 8, 125, hex('#f0b878')); }
  for (const x of [48, 92]) { R.rect(x, 152, x + 2, 156, hex('#3a2010')); R.pset(x + 2, 156, hex('#c8a040')); }
}

// el frente del diván de la consulta (asiento con su vivo y las patas), por delante del paciente
function e_divanLejosDelante(R) {
  const Q = E_Q; R.rect(186, 136, 272, 150, C.k);
  for (let y = 137; y <= 149; y++) for (let x = 187; x <= 271; x++) { let c = y < 139 ? Q.tercL : y > 146 ? Q.tercS : Q.terc; if (y === 143) c = Q.tercD; if (((x + y) & 3) === 0 && y < 146) c = e_mezcla(c, Q.tercL, 0.2); R.pset(x, y, c); }
  R.rect(262, 120, 276, 149, C.k); for (let y = 121; y <= 148; y++) for (let x = 263; x <= 275; x++) R.pset(x, y, x < 266 ? Q.tercL : x > 272 ? Q.tercD : Q.terc); R.rect(263, 121, 275, 122, hex('#7aa890'));
  for (const x of [192, 266]) { R.linea(x, 150, x - 2, 155, hex('#3a2010')); R.linea(x + 1, 150, x - 1, 155, hex('#5a3a22')); }
}

// el diván de cerca, a la escala de los personajes: lo fijo (la pared de yeso con el cuadro abstracto, los diplomas, la
// ventana alta con su estor, el diván con el rulo y los cojines, la mesita con el vaso, los pañuelos y el cartucho
// viejo, la lámpara de pie, la planta, el suelo de tablas y la alfombra) y la vida
function e_divanFijo(R) {
  const Q = E_Q, { rect, pset, disco } = R;
  for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) { let c = Q.yeso; const n = h(x, y, 691); if (n < 0.08) c = Q.yesoS; else if (n > 0.95) c = Q.yesoL; if (y < 8 && ((x + y) & 1)) c = e_mezcla(c, C.k, 0.08); pset(x, y, c); }
  rect(0, 0, 319, 3, hex('#d6c8ae')); rect(0, 3, 319, 3, hex('#f6eedc'));
  rect(0, 120, 319, 125, Q.zocalo); rect(0, 120, 319, 120, C.blanco); rect(0, 125, 319, 125, Q.zocaloS);
  e_tarima(R, 126, 179, [Q.parq, Q.parqS, Q.parqL, Q.parqD], 5);
  for (let y = 150; y < 180; y++) { const f = (y - 150) / 30, xa = Math.round(60 - f * 20), xb = Math.round(250 + f * 20); for (let x = xa; x <= xb; x++) { const b = Math.min(x - xa, xb - x, y - 150); pset(x, y, b < 2 ? Q.alf2 : b < 5 ? ((x + y * 2) % 6 < 3 ? Q.alf3 : Q.alf2) : ((x * 3 + y * 7) % 19 === 0 ? hex('#b8a07a') : Q.alf1)); } }
  // los diplomas con rayas y su sello, y el cuadro abstracto (colinas y sol en campos de color) sobre el diván
  for (const [x0, y0, w, hh] of [[16, 30, 26, 18], [48, 34, 20, 14], [22, 54, 18, 12]]) { e_tinte(R, x0 + 2, y0 + 2, x0 + w + 2, y0 + hh + 2, C.k, 0.2); rect(x0, y0, x0 + w, y0 + hh, hex('#2a2420')); rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#c8a040')); rect(x0 + 2, y0 + 2, x0 + w - 2, y0 + hh - 2, hex('#f6f0e0'));
    for (let y = y0 + 4; y < y0 + hh - 3; y += 2) rect(x0 + 4, y, x0 + w - 4 - ((y >> 1) % 3) * 2, y, hex('#a8a8b4')); disco(x0 + w - 4, y0 + hh - 4, 1.5, hex('#c83a3a')); }
  e_tinte(R, 124, 46, 222, 104, C.k, 0.22);
  rect(120, 42, 218, 100, hex('#2a2420')); rect(122, 44, 216, 98, hex('#f2e8d4'));
  for (let y = 46; y <= 96; y++) for (let x = 124; x <= 214; x++) { const a = 80 - Math.round(8 * Math.sin((x - 124) * 0.05)), b = 88 - Math.round(5 * Math.sin((x - 124) * 0.09 + 2)); let c = y > b ? hex('#3e6a5a') : y > a ? hex('#d8a040') : hex('#e8dcc4'); if ((x - 186) ** 2 + (y - 62) ** 2 < 100) c = hex('#c8543a'); if (((x * 7 + y * 3) % 11) === 0) c = e_mezcla(c, C.k, 0.08); pset(x, y, c); }
  rect(140, 50, 141, 76, hex('#2a2420')); rect(141, 60, 150, 61, hex('#2a2420'));
  // la ventana alta de la derecha con su marco de acero y el alféizar
  rect(234, 46, 272, 112, Q.acero); rect(230, 112, 276, 115, hex('#f6f0e4')); rect(230, 112, 276, 112, C.blanco);
  // la planta grande de la izquierda en su maceta (se mece aparte) y la lámpara de pie de la derecha
  rect(4, 140, 30, 162, C.k); rect(5, 141, 29, 161, hex('#b8582a')); rect(5, 141, 29, 143, hex('#d8783a')); rect(26, 144, 28, 161, hex('#8a3a1a')); e_sombra(R, 17, 163, 14, 2, 0.3);
  rect(286, 158, 300, 161, hex('#2a2a30')); rect(292, 92, 293, 158, hex('#c8a040')); rect(292, 92, 292, 158, hex('#f0d880')); e_sombra(R, 293, 162, 10, 2, 0.3);
  // la mesita redonda de la izquierda del diván: tablero, pie torneado y base
  e_sombra(R, 84, 160, 18, 2, 0.35);
  for (let j = -2; j <= 2; j++) for (let i = -18; i <= 18; i++) if ((i / 18) ** 2 + (j / 2.6) ** 2 <= 1) pset(84 + i, 133 + j, j < 0 ? hex('#c8925a') : hex('#a8703a'));
  rect(66, 134, 102, 136, hex('#6a4024')); rect(82, 137, 86, 156, hex('#5a3a22')); rect(82, 137, 82, 156, hex('#8a5a34')); rect(80, 144, 88, 145, hex('#6a4024')); rect(74, 156, 94, 159, hex('#5a3a22')); rect(74, 156, 94, 156, hex('#8a5a34'));
  // la caja de pañuelos y el cartucho viejo
  rect(76, 125, 88, 132, C.k); rect(77, 126, 87, 131, hex('#e8f0f0')); rect(77, 126, 87, 126, C.blanco); rect(77, 129, 87, 129, hex('#7ab0c0')); rect(80, 126, 84, 126, hex('#c8d4d8'));
  e_sombra(R, 96, 133, 6, 1, 0.3); PIEZAS_AT.cartucho?.(R, 96, 133, { color: 'gris', icono: 'foso' });
  // el diván de terciopelo: respaldo con capitoné, rulo de la izquierda, cojines y el asiento
  e_sombra(R, 172, 160, 70, 3, 0.35);
  rect(116, 116, 236, 140, C.k);
  for (let y = 117; y <= 139; y++) for (let x = 117; x <= 235; x++) { const u = (y - 117) / 22; let c = u < 0.12 ? Q.tercL : u > 0.85 ? Q.tercS : Q.terc; const fy = (y - 121) % 8, fx = (x - 120 + ((Math.floor((y - 121) / 8) & 1) ? 6 : 0)) % 12;
    if (fy === 0 && fx === 0) c = Q.tercD; else if (fy === 1 && fx === 0) c = Q.tercL; else if (fy === 0 && (fx === 1 || fx === 11)) c = Q.tercS; if (((x + y) & 3) === 0) c = e_mezcla(c, Q.tercL, 0.15); pset(x, y, c); }
  disco(112, 122, 9, C.k); rect(103, 122, 121, 150, C.k);
  for (let y = 114; y <= 149; y++) for (let x = 104; x <= 120; x++) { const d = (x - 112) ** 2 + (y - 122) ** 2; if (y < 122 && d > 8 * 8) continue; let c = x < 107 ? Q.tercL : x > 117 ? Q.tercS : Q.terc; if (y < 122 && d < 3 * 3) c = Q.tercD; else if (y < 122 && d < 5 * 5) c = Q.tercS; pset(x, y, c); }
  disco(112, 122, 1, hex('#c8a040'));
  for (const [cx, cy, r, c, cS] of [[214, 130, 7, '#d8a040', '#a87a20'], [227, 128, 7, '#a8543a', '#7a3a26']]) { disco(cx, cy, r, C.k); disco(cx, cy, r - 1, hex(cS)); disco(cx - 1, cy - 1, r - 2, hex(c)); pset(cx - 3, cy - 3, hex('#fff0c0')); }
  rect(117, 138, 235, 141, Q.tercL); rect(117, 138, 235, 138, hex('#8ab8a0'));
}

function e_divan(R, t, o) {
  const Q = E_Q; e_capa(R, 'divan', e_divanFijo);
  e_vistaValle(R, t, 236, 48, 270, 110, 84);
  // el estor de lino a medio bajar, que se mece, y el reflejo del cristal
  { const y1 = 66 + Math.round(Math.sin(t * 0.8) * 1); for (let y = 48; y <= y1; y++) for (let x = 236; x <= 270; x++) R.pset(x, y, (y - 48) % 5 === 4 ? hex('#d6cab4') : ((x + y) & 1) ? hex('#f2eadc') : hex('#ece2d0')); R.rect(236, y1, 270, y1 + 1, hex('#c8bca4')); R.disco(253, y1 + 3, 1, hex('#c8a040')); R.pset(253, y1 + 2, hex('#a8a090')); }
  R.rect(236, 88, 270, 88, Q.acero);
  for (let i = 0; i < 9; i++) R.pset(242 + i, 104 - i, e_mezcla(R.pget(242 + i, 104 - i), C.blanco, 0.3));
  // la luz de la ventana sobre el suelo, con motas
  for (let y = 126; y < 160; y++) for (let x = 226 - (y - 126); x < 262 - (y - 126); x++) if (((x + y) & 1) === 0) R.pset(x, y, e_mezcla(R.pget(x, y), hex('#fff4d8'), 0.18));
  for (let k = 0; k < 8; k++) { const x = 214 + Math.round((h(k, 1, 692) * 40 + Math.sin(t * 0.6 + k) * 3) % 44), y = 96 + Math.round((h(k, 2, 692) * 50 + t * 1.2) % 54); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#fff6d8')); }
  // la lámpara de pie: la pantalla de lino y su luz cálida
  R.poligono([[285, 80], [301, 80], [304, 92], [282, 92]], hex('#f0e4c8')); R.rect(283, 92, 303, 92, hex('#d8c8a8')); R.rect(286, 80, 300, 80, C.blanco); e_halo(R, 293, 100, 30, 26, hex('#fff0c0'), 0.16);
  // la planta, que se mece con el aire
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.28 + Math.sin(t * 1.1 + k) * 0.05, l = 18 + (k % 3) * 8, bx = 17 + Math.round(Math.cos(a) * l), by = 141 + Math.round(Math.sin(a) * l);
    R.linea(17, 141, bx, by, hex('#3a6a2a')); R.disco(bx, by, 4, hex('#2a5a2a')); R.disco(bx - 1, by - 1, 3, hex('#3e7a34')); R.pset(bx - 2, by - 2, hex('#7ab05a')); R.linea(bx - 2, by + 2, bx + 1, by - 1, hex('#2a5a2a')); }
  // el vaso de agua (el nivel tiembla) y el pañuelo que asoma y se mece
  { const x = 68, yb = 132, nivel = 126 + Math.round(Math.sin(t * 3) * 0.6); R.rect(x, 122, x + 5, yb, hex('#a8c0cc')); R.rect(x + 1, 122, x + 4, yb - 1, hex('#e0eef4')); R.rect(x + 1, nivel, x + 4, yb - 1, hex('#9ac8e0'));
    R.rect(x + 1, nivel, x + 4, nivel, Math.floor(t * 3) % 2 ? C.blanco : hex('#c8e4f0')); R.pset(x + 1, 123, C.blanco); R.pset(x + 1, 124, C.blanco); }
  { const sw = Math.round(Math.sin(t * 1.8) * 1.5); R.poligono([[80, 126], [85, 126], [84 + sw, 119], [81 + sw, 118]], C.blanco); R.linea(81, 125, 82 + sw, 120, hex('#d8e0e8')); }
  return { suelo: 166, divan: { x: 160, suelo: 150, tapa: 141, x0: 118, x1: 206 }, mesita: { x: 84, y: 132 }, vaso: [68, 122, 73, 132], panuelos: [76, 125, 88, 132], cartucho: [96, 133], ventana: [236, 48, 270, 110] };
}

// el frente del diván de cerca (el asiento con su vivo, el rulo y las patas), por delante de quien se sienta
function e_divanDelante(R, t) {
  const Q = E_Q; R.rect(103, 141, 237, 154, C.k);
  for (let y = 142; y <= 153; y++) for (let x = 104; x <= 236; x++) { let c = y < 144 ? Q.tercL : y > 150 ? Q.tercD : Q.terc; if (y === 147) c = Q.tercS; if (((x + y) & 3) === 0 && y < 150) c = e_mezcla(c, Q.tercL, 0.18); R.pset(x, y, c); }
  for (let y = 136; y <= 153; y++) for (let x = 104; x <= 116; x++) R.pset(x, y, x < 107 ? Q.tercL : x > 113 ? Q.tercS : Q.terc);
  R.rect(103, 136, 117, 136, C.k);
  for (const x of [108, 230]) { R.rect(x, 154, x + 2, 158, hex('#3a2010')); R.rect(x + 2, 154, x + 2, 158, hex('#7a5030')); R.rect(x, 158, x + 2, 158, hex('#c8a040')); }
}

const E_M = pal({
  pared: '#26385a', paredS: '#20304e', paredL: '#33486e', techo: '#141c2c', suelo: '#3a3c48', sueloS: '#30323c', sueloL: '#4a4c5a', junta: '#24262e',
  peana: '#e8e6e0', peanaS: '#b8b6b0', peanaL: '#fbfaf6', vitrina: '#f6f0dc', luz: '#fff0c8', laton: '#c8a040', rojo: '#a8243a', rojoL: '#d84a5a',
});

// lo fijo del museo
function e_museoFijo(R) {
  const M = E_M, { rect, pset, disco, linea } = R;
  rect(0, 0, 319, 9, M.techo); for (let x = 0; x < 320; x += 4) pset(x, 3, hex('#1a2436'));
  rect(10, 7, 270, 8, hex('#2a3242'));
  // la pared de tela azul con su trama y los abanicos de luz de los focos
  for (let y = 10; y < 118; y++) for (let x = 0; x < 320; x++) { let c = (x % 3 === 0) ? M.paredS : M.pared; if ((y % 4 === 0) && (x & 1)) c = M.paredS; if (h(x, y, 700) < 0.03) c = M.paredL; pset(x, y, c); }
  for (const fx of [40, 100, 160, 220]) for (let y = 12; y < 117; y++) { const w = (y - 10) * 0.42; for (let x = Math.round(fx - w); x <= fx + w; x++) { const f = 1 - Math.abs(x - fx) / (w + 1) - (y - 12) / 150; if (f > e_b4(x, y) * 0.9) pset(x, y, e_mezcla(R.pget(x, y), hex('#8a9ac8'), 0.22 * f + 0.05)); } }
  rect(0, 112, 319, 117, hex('#1a2238')); rect(0, 112, 319, 112, hex('#4a5a7a'));
  // la línea del tiempo de pictogramas bajo la pantalla
  rect(96, 86, 224, 86, hex('#c8b890')); for (let k = 0; k < 6; k++) { const x = 100 + k * 24; disco(x, 86, 2, hex('#e8d8a8')); rect(x - 3, 78, x + 3, 82, hex('#c8b890')); rect(x - 2, 79, x + 2, 81, M.pared); pset(x, 90, hex('#8a8aa8')); rect(x - 2, 92, x + 2, 92, hex('#6a7a9a')); }
  // las dos hornacinas iluminadas con consolas, mandos, teles y cartuchos en sus baldas de cristal
  for (const [x0, x1, y0, y1, k] of [[14, 84, 30, 96, 0], [222, 296, 50, 100, 1]]) {
    rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, hex('#141c2c')); e_degradado(R, x0, y0, x1, y1, [hex('#f4ead0'), hex('#e0d4b4'), hex('#c8bc9c')]);
    rect(x0, y0, x1, y0 + 1, hex('#fffbe8')); for (let y = y0; y < y1; y++) { pset(x0, y, hex('#a89c80')); pset(x1, y, hex('#a89c80')); }
    const ym = Math.round((y0 + y1) / 2) + 2; rect(x0 + 1, ym, x1 - 1, ym + 1, hex('#dceef4')); rect(x0 + 1, ym + 2, x1 - 1, ym + 2, hex('#a8b8c0')); rect(x0 + 1, y1 - 2, x1 - 1, y1, hex('#b8ac90'));
    if (k === 0) { PIEZAS_AT.consolaJaponesa?.(R, 34, ym, {}); PIEZAS_AT.consolaGris?.(R, 66, ym, {}); PIEZAS_AT.teleCRT?.(R, 30, y1 - 2, { encendida: false }); PIEZAS_AT.joystick?.(R, 52, y1 - 2, {}); PIEZAS_AT.cartucho?.(R, 66, y1 - 2, { color: 'azul', icono: 'nave' }); PIEZAS_AT.cartucho?.(R, 77, y1 - 2, { color: 'rosa', icono: 'flor' }); }
    else { PIEZAS_AT.consolaVieja?.(R, 246, ym, {}); PIEZAS_AT.cajaCartucho?.(R, 280, ym, { color: 'naranja', icono: 'comecocos' }); PIEZAS_AT.teleCRT?.(R, 240, y1 - 2, { encendida: false }); PIEZAS_AT.joystick?.(R, 262, y1 - 2, { dir: -1 }); PIEZAS_AT.cartucho?.(R, 280, y1 - 2, { color: 'verde', icono: 'foso' }); }
    for (let i = 0; i < 16; i++) { pset(x0 + 4 + i, y0 + 22 - i, e_mezcla(R.pget(x0 + 4 + i, y0 + 22 - i), C.blanco, 0.35)); }
    rect(x0 + 10, y1 + 5, x1 - 10, y1 + 5, hex('#8a9ab8')); rect(x0 + 10, y1 + 7, x1 - 20, y1 + 7, hex('#5a6a8a'));
  }
  // el suelo de piedra pulida: losas grandes con sus juntas, vetas, reflejos de las hornacinas y charcos de luz
  for (let y = 118; y < 180; y++) { const f = (y - 118) / 62; for (let x = 0; x < 320; x++) { const lx = Math.round((x - 160) / (1 + f * 1.2)); let c = (((Math.floor(lx / 28) + Math.floor((y - 118) / (8 + f * 14))) & 1) ? M.suelo : M.sueloS);
    if (((lx % 28) + 28) % 28 === 0) c = M.junta; if (h(x >> 1, y, 701) < 0.04) c = M.sueloL; pset(x, y, c); } }
  for (let y = 118; y < 180; y += 0) { const st = 8 + (y - 118) / 62 * 14; y = Math.round(y + st); if (y < 180) rect(0, y, 319, y, M.junta); }
  for (const [x0, x1] of [[14, 84], [222, 296]]) for (let y = 118; y < 140; y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && h(x, y >> 1, 702) > (y - 118) / 34) pset(x, y, e_mezcla(R.pget(x, y), hex('#d8ccb0'), 0.28));
  for (const fx of [40, 100, 160, 220]) e_halo(R, fx, 162, 26, 7, hex('#9aa8d0'), 0.18);
}

// el documental en la pantalla grande: tres escenas sin letras (la excavadora en el desierto, el público con los camiones,
// el cartucho en la arena)
function e_documental(R, t, n, [x0, y0, x1, y1]) {
  const w = x1 - x0, hh = y1 - y0, hor = y0 + Math.round(hh * 0.45);
  e_degradado(R, x0, y0, x1, hor, [hex('#5aa0d8'), hex('#a8d0e8'), hex('#f0e0c0')]);
  if (n === 2) { // el cartucho en la arena, de cerca, con la arena que cae
    R.rect(x0, y0, x1, y1, hex('#c8a46a')); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (h(x, y, 703) < 0.18) R.pset(x, y, h(x, y, 704) < 0.5 ? hex('#a8844a') : hex('#e0c088'));
    const cx = x0 + (w >> 1), cy = y1 - 6; PIEZAS_AT.cartucho?.(R, cx, cy, { color: 'gris', icono: 'foso', s: 2 }); for (let i = -12; i <= 12; i++) { const yy = cy - 2 + Math.round(Math.abs(i) * 0.2); R.pset(cx + i, yy, hex('#d8b47a')); R.pset(cx + i, yy + 1, hex('#a8844a')); }
    for (let k = 0; k < 8; k++) R.pset(cx - 8 + k * 2, y0 + Math.floor((t * 20 + k * 7) % hh), hex('#e8d0a0'));
  } else {
    for (let x = x0; x <= x1; x++) { const a = hor - Math.round(2 + 2 * Math.sin(x * 0.12)); R.rect(x, a, x, hor, hex('#b89a8a')); }
    for (let y = hor; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, h(x, y, 705) < 0.12 ? hex('#b8945a') : hex('#d8b47a'));
    for (let k = 0; k < 6; k++) { const bx = x0 + 6 + k * 15, by = y1 - 4 - (k % 2) * 3; R.rect(bx, by - 2, bx + 4, by, k % 2 ? hex('#d03a3a') : hex('#3a6ad8')); R.pset(bx + 2, by - 3, hex('#e8e0d0')); }
    if (n === 0) { const ex = x0 + 20 + Math.round(((t * 6) % (w - 40))); R.rect(ex, hor + 2, ex + 14, hor + 8, hex('#e8b030')); R.rect(ex + 3, hor - 2, ex + 9, hor + 2, hex('#e8b030')); R.rect(ex + 4, hor - 1, ex + 8, hor + 1, hex('#5a8ab0')); R.rect(ex - 4, hor + 4, ex - 1, hor + 9, hex('#9a9aa0')); R.rect(ex, hor + 9, ex + 14, hor + 11, hex('#2a2a2e'));
      for (let k = 0; k < 6; k++) R.pset(ex - 5 - k, hor + 8 - (Math.floor(t * 8 + k) % 3), hex('#e8d0a0')); }
    else { for (let k = 0; k < 14; k++) { const px = x0 + 4 + k * 6, py = hor + 6 + (k % 3); R.rect(px, py - 3, px + 1, py, [hex('#d84a3a'), hex('#3a6ad8'), hex('#e8c040'), hex('#3a9a4a')][k % 4]); R.pset(px, py - 4 - (Math.sin(t * 4 + k) > 0.6 ? 1 : 0), hex('#e8b890')); }
      R.rect(x0 + 60, hor - 6, x0 + 84, hor + 2, hex('#e8e8f0')); R.rect(x0 + 84, hor - 3, x0 + 92, hor + 2, hex('#d03a3a')); R.disco(x0 + 66, hor + 3, 2, C.k); R.disco(x0 + 88, hor + 3, 2, C.k); }
  }
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x++) R.pset(x, y, e_mezcla(R.pget(x, y), C.k, 0.12));
}

// una peana blanca con su vitrina de cristal (x0–x1; la vitrina de yv a yc, la peana de yc a ys) y lo de dentro
function e_peana(R, t, x0, x1, yv, yc, ys, dentro) {
  const M = E_M, { rect, pset } = R;
  e_sombra(R, (x0 + x1) >> 1, ys + 1, ((x1 - x0) >> 1) + 4, 2, 0.4);
  for (let y = ys + 2; y < Math.min(179, ys + 14); y++) for (let x = x0; x <= x1; x++) if (((x + y) & 1) === 0 && h(x, y, 706) > (y - ys) / 14) pset(x, y, e_mezcla(R.pget(x, y), M.peana, 0.2));
  rect(x0, yc, x1, ys, C.k); rect(x0 + 1, yc + 1, x1 - 1, ys - 1, M.peana); rect(x0 + 1, yc + 1, x0 + 3, ys - 1, M.peanaL); rect(x1 - 5, yc + 1, x1 - 1, ys - 1, M.peanaS); rect(x0 + 1, ys - 2, x1 - 1, ys - 1, M.peanaS);
  rect(x0 + 6, yc + 6, x1 - 8, yc + 6, hex('#c8c6c0'));
  rect(x0 - 1, yc - 2, x1 + 1, yc, hex('#2a2a30')); rect(x0 - 1, yc - 2, x1 + 1, yc - 2, hex('#6a6a72'));
  for (let y = yv; y < yc - 2; y++) for (let x = x0 + 1; x < x1; x++) R.pset(x, y, e_mezcla(R.pget(x, y), hex('#e8f0f8'), 0.18 + (y - yv) / (yc - yv) * 0.1));
  dentro();
  rect(x0, yv, x1, yv, hex('#e8f0f8')); rect(x0, yv, x0, yc - 3, hex('#c8d8e8')); rect(x1, yv, x1, yc - 3, hex('#8a9ab0'));
  const g = ((t * 6 + x0) % 60) - 10; for (let i = 0; i < 6; i++) { const x = Math.round(x0 + 2 + g + i), y = yv + 2 + i * 2; if (x > x0 && x < x1 && y < yc - 3) { R.pset(x, y, e_mezcla(R.pget(x, y), C.blanco, 0.55)); R.pset(x + 1, y, e_mezcla(R.pget(x + 1, y), C.blanco, 0.3)); } }
}

// el cartucho del desierto, sucio: la pieza, la arena pegada y los arañazos (s: escala)
function e_cartuchoSucio(R, x, y, s) {
  PIEZAS_AT.cartucho?.(R, x, y, { color: 'gris', icono: 'foso', s });
  const x0 = Math.round(x - 6 * s), y0 = y - 15 * s;
  for (let k = 0; k < 14 * s * s; k++) { const i = Math.floor(h(k, s, 707) * 12 * s), j = Math.floor(h(k, s, 708) * 15 * s); if (h(i >> 1, j >> 1, 709) < 0.55 + j / (15 * s) * 0.4) R.pset(x0 + i, y0 + j, h(k, 3, 707) < 0.5 ? hex('#b89460') : hex('#d8b47a')); }
  for (let k = 0; k < 2 + s; k++) { const i = Math.floor(h(k, 5, 710) * 10 * s) + s, j = Math.floor(h(k, 6, 710) * 8 * s) + s; R.linea(x0 + i, y0 + j, x0 + i + 2 * s, y0 + j + s, hex('#e8e0d0')); }
  R.rect(x0 + s, y - 2 * s, x0 + 11 * s, y - 1, hex('#a8844a'));
}

function e_museo(R, t, o) {
  const M = E_M; e_capa(R, 'museo', e_museoFijo);
  // los focos del carril, con su luz
  for (const fx of [40, 100, 160, 220]) { R.rect(fx - 2, 8, fx + 2, 12, hex('#3a3e4a')); R.rect(fx - 2, 12, fx + 2, 12, hex('#fff0c8')); }
  // la pantalla grande con el documental
  const pant = [114, 24, 206, 70]; R.rect(110, 20, 210, 74, C.k); R.rect(111, 21, 209, 73, hex('#2a2a30'));
  const n = o.documental ?? Math.floor(t / 5) % 3; R.recorte(pant); e_documental(R, t, n, pant); R.recorte(null);
  e_tinte(R, 100, 74, 220, 78, hex('#8ab0e0'), 0.12, true);
  // los visitantes pequeños que pasan al fondo, junto a la pared
  for (const [v, d, ropa, pelo, k] of [[0.035, 1, '#d84a3a', '#3a2a1a', 0], [0.028, -1, '#e8c040', '#8a5a2a', 1], [0.045, 1, '#3a9a6a', '#1a1a1a', 2], [0.022, -1, '#8a5ab8', '#d8b860', 3]]) {
    const u = (t * v + k * 0.27) % 1, x = d > 0 ? Math.round(-10 + u * 340) : Math.round(330 - u * 340); e_gente(R, x, 119 + (k % 2), t, hex(ropa), hex(pelo), { dir: d, alto: 10 }); }
  // las peanas con sus vitrinas: el mando y el cartucho, la tele encendida y, en medio, el cartucho del desierto
  e_peana(R, t, 30, 70, 108, 132, 156, () => { PIEZAS_AT.joystick?.(R, 42, 129, {}); PIEZAS_AT.cartucho?.(R, 58, 129, { color: 'rojo', icono: 'foso' }); });
  e_peana(R, t, 250, 290, 102, 132, 156, () => { PIEZAS_AT.teleCRT?.(R, 270, 130, { t }); });
  // el foso de luz del foco central
  for (let y = 12; y < 112; y++) { const w = 4 + (y - 12) * 0.26; for (let x = Math.round(160 - w); x <= 160 + w; x++) if (((x + y) & 1) === 0 && h(x, y, 711) < 0.55) R.pset(x, y, e_mezcla(R.pget(x, y), M.luz, 0.12)); }
  e_peana(R, t, 134, 186, 86, 120, 156, () => { for (let i = -10; i <= 10; i++) { R.pset(160 + i, 117 - Math.round((10 - Math.abs(i)) * 0.25), hex('#d8b47a')); R.rect(160 + i, 118 - Math.round((10 - Math.abs(i)) * 0.25), 160 + i, 117, hex('#c8a46a')); } e_cartuchoSucio(R, 160, 116, 2); e_halo(R, 160, 100, 16, 14, M.luz, 0.22); });
  R.rect(146, 134, 174, 140, hex('#d8d6d0')); R.rect(149, 136, 170, 136, hex('#8a8a96')); R.rect(149, 138, 164, 138, hex('#a8a8b0'));
  for (let k = 0; k < 8; k++) { const x = 150 + Math.round((h(k, 1, 712) * 20 + Math.sin(t * 0.6 + k) * 3)), y = 90 + Math.round((h(k, 2, 712) * 24 + t * 1.5) % 26); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#fff6d8')); }
  return { suelo: 162, fondo: 119, vitrina: { x: 160, y0: 86, y1: 120, x0: 134, x1: 186, pie: 156 }, pantalla: pant, peanas: [[30, 70, 156], [250, 290, 156]], libre: [[86, 130, 156, 176], [190, 240, 156, 176]] };
}

// el cordón de terciopelo con sus postes de latón, por delante de los personajes
function e_cordon(R, t) {
  const M = E_M;
  for (const x of [104, 216]) { e_sombra(R, x, 176, 6, 1, 0.4); R.rect(x - 4, 174, x + 4, 176, M.laton); R.rect(x - 4, 174, x + 4, 174, hex('#f0d880')); R.rect(x - 1, 156, x + 1, 174, M.laton); R.rect(x - 1, 156, x - 1, 174, hex('#f0d880')); R.disco(x, 155, 2, M.laton); R.pset(x - 1, 154, hex('#fff0b0')); }
  for (let x = 106; x <= 214; x++) { const u = (x - 104) / 112, y = 158 + Math.round(Math.sin(u * Math.PI) * 7 + Math.sin(t * 1.4) * Math.sin(u * Math.PI) * 0.6); R.pset(x, y, M.rojo); R.pset(x, y + 1, M.rojo); R.pset(x, y + 2, hex('#6a1a26')); if (x % 9 === 0) R.pset(x, y, M.rojoL); }
}

// la vitrina de cerca: lo fijo (el museo desenfocado, el marco, el fondo de lino, la peana, la tarjeta, la caja rota) y la vida
function e_vitrinaFija(R) {
  const M = E_M, { rect, pset, disco } = R;
  e_degradado(R, 0, 0, 319, 179, [hex('#141c2c'), hex('#1e2a44'), hex('#2a3a5a'), hex('#22283a')]);
  // las luces desenfocadas del museo (manchas redondas tramadas)
  for (let k = 0; k < 12; k++) { const x = Math.floor(h(k, 1, 720) * 320), y = 20 + Math.floor(h(k, 2, 720) * 120), r = 5 + Math.floor(h(k, 3, 720) * 8); if (x > 270 && y < 50) continue; const c = h(k, 4, 720) < 0.5 ? hex('#5a6a9a') : hex('#8a7a5a');
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j < r * r && ((i + j) & 1) === 0) pset(x + i, y + j, c); }
  // la vitrina: el fondo de lino iluminado desde arriba, con su trama
  rect(30, 20, 270, 140, hex('#0e1018'));
  for (let y = 24; y < 136; y++) for (let x = 34; x < 266; x++) { const f = Math.max(0, 1 - Math.hypot((x - 150) / 140, (y - 30) / 120)); let c = e_mezcla(hex('#6a6458'), hex('#f0e8d4'), f); if ((x + y * 3) % 5 === 0) c = e_mezcla(c, C.k, 0.08); pset(x, y, c); }
  // en el fondo de la vitrina: la foto de la excavación en sepia (cielo, dunas, la excavadora y la gente pequeña) con su
  // marco fino, y el friso de la línea del tiempo con tres pictogramas (la consola, el cartucho y la pala)
  e_tinte(R, 44, 32, 114, 92, C.k, 0.2);
  rect(40, 28, 110, 88, hex('#3a3026'));
  for (let y = 30; y <= 86; y++) for (let x = 42; x <= 108; x++) { const hor = 62 - Math.round(3 * Math.sin(x * 0.12)); let c = y < hor ? (y < 44 ? hex('#d8c8a8') : hex('#e8dcc0')) : (h(x, y, 727) < 0.2 ? hex('#a88a5a') : hex('#c8aa78')); if ((x + y) % 3 === 0) c = e_mezcla(c, hex('#5a4a3a'), 0.08); pset(x, y, c); }
  rect(70, 60, 84, 66, hex('#6a5a40')); rect(74, 55, 80, 60, hex('#6a5a40')); rect(60, 64, 68, 66, hex('#5a4a34')); R.linea(70, 62, 62, 56, hex('#6a5a40')); R.linea(62, 56, 58, 62, hex('#6a5a40'));
  for (let k = 0; k < 7; k++) { const x = 46 + k * 9 + (k > 2 ? 30 : 0); if (x > 104) continue; rect(x, 72, x + 1, 76, hex('#5a4a34')); pset(x, 71, hex('#7a6a50')); }
  disco(96, 38, 4, hex('#f6ecd0'));
  rect(150, 34, 262, 34, hex('#8a7a5a'));
  for (const [x, g] of [[170, ['#####', '#.#.#', '#####']], [206, ['.###.', '.#.#.', '.###.', '..#..']], [242, ['..#..', '..#..', '.###.', '.###.']]]) { disco(x, 34, 2, hex('#6a5a40')); g.forEach((fila, j) => { for (let i = 0; i < 5; i++) if (fila[i] === '#') rect(x - 5 + i * 2, 40 + j * 2, x - 4 + i * 2, 41 + j * 2, hex('#7a6a50')); }); }
  // el montoncito de arena y la peanita inclinada
  for (let y = 116; y < 136; y++) for (let x = 34; x < 266; x++) pset(x, y, (y === 116) ? hex('#d8d0bc') : h(x, y, 721) < 0.1 ? hex('#a8a090') : hex('#c8c0ac'));
  for (let i = -40; i <= 40; i++) { const top = 128 - Math.round((1 - (i / 40) ** 2) * 10); for (let y = top; y <= 130; y++) pset(150 + i, y, h(150 + i, y, 722) < 0.3 ? hex('#b8945a') : y === top ? hex('#ecd098') : hex('#d8b47a')); }
  // la caja rota: la pieza de cartón con la esquina arrancada y aplastada, con manchas de tierra
  PIEZAS_AT.cajaCartucho?.(R, 222, 128, { color: 'gris', icono: 'foso', s: 3 });
  R.poligono([[232, 68], [250, 68], [250, 88], [244, 80], [238, 84], [236, 74]], e_mezcla(hex('#6a6458'), hex('#f0e8d4'), 0.5));
  for (const [a, b] of [[[232, 68], [236, 74]], [[236, 74], [238, 84]], [[238, 84], [244, 80]], [[244, 80], [250, 88]]]) { R.linea(a[0], a[1], b[0], b[1], hex('#8a7a5a')); R.linea(a[0] - 1, a[1] + 1, b[0] - 1, b[1] + 1, hex('#e8e0c8')); }
  for (let k = 0; k < 60; k++) { const x = 196 + Math.floor(h(k, 1, 723) * 52), y = 70 + Math.floor(h(k, 2, 723) * 58); if (h(x >> 2, y >> 2, 724) < 0.5) pset(x, y, h(k, 3, 723) < 0.5 ? hex('#8a6a3a') : hex('#b89460')); }
  R.linea(200, 100, 214, 106, hex('#5a5a62')); R.linea(214, 106, 226, 102, hex('#5a5a62'));
  // la tarjeta de la pieza (rayas y el pictograma de la pala)
  e_tinte(R, 62, 108, 106, 128, C.k, 0.25);
  for (let y = 104; y < 124; y++) for (let x = 58; x < 102; x++) pset(x, y, y === 104 ? C.blanco : hex('#f6f2e8'));
  for (const [y, w] of [[109, 30], [112, 36], [115, 26], [118, 32]]) rect(62, y, 62 + w, y, hex('#8a8a96'));
  rect(92, 106, 93, 114, hex('#6a5a4a')); rect(90, 114, 95, 118, hex('#7a7a84'));
  // el marco de la vitrina: perfiles negros con filo de latón y la peana de abajo
  rect(26, 16, 274, 20, hex('#14141a')); rect(26, 16, 274, 16, M.laton); rect(26, 136, 274, 142, hex('#14141a')); rect(26, 142, 274, 142, M.laton);
  rect(26, 16, 30, 142, hex('#14141a')); rect(270, 16, 274, 142, hex('#14141a')); rect(30, 20, 30, 136, hex('#4a4a52')); rect(270, 20, 270, 136, hex('#4a4a52'));
  rect(20, 143, 280, 179, M.peanaS); for (let y = 144; y < 180; y++) for (let x = 20; x <= 280; x++) pset(x, y, x < 26 ? M.peanaL : y < 147 ? M.peanaL : h(x, y, 725) < 0.05 ? M.peanaS : M.peana);
  for (let y = 144; y < 152; y++) for (let x = 26; x <= 280; x++) if (((x + y) & 1) === 0 && (y - 144) < 8 - h(x, 1, 728) * 3) pset(x, y, e_mezcla(R.pget(x, y), C.k, 0.18));
  for (const x of [90, 210]) { rect(x, 152, x, 179, M.peanaS); rect(x + 1, 152, x + 1, 179, M.peanaL); }
  rect(20, 176, 280, 179, M.peanaS);
  rect(120, 156, 180, 166, hex('#c8a040')); rect(121, 157, 179, 165, hex('#e8c860')); rect(126, 160, 168, 160, hex('#8a6a20')); rect(126, 162, 158, 162, hex('#8a6a20'));
  for (const [x, y] of [[123, 159], [177, 159], [123, 164], [177, 164]]) pset(x, y, hex('#8a6a20'));
}

function e_vitrina(R, t, o) {
  const M = E_M; e_capa(R, 'vitrina', e_vitrinaFija);
  // los visitantes desenfocados que pasan por detrás, a los lados de la vitrina
  for (const [v, d, c, k] of [[0.05, 1, '#5a4a7a', 0], [0.035, -1, '#7a4a3a', 1]]) { const u = (t * v + k * 0.5) % 1, x = d > 0 ? Math.round(-30 + u * 380) : Math.round(350 - u * 380);
    R.recorte([0, 0, 319, 179]); for (let j = -14; j <= 40; j++) for (let i = -12; i <= 12; i++) { const cab = (i / 6) ** 2 + ((j + 6) / 7) ** 2 < 1, cuerpo = j > 2 && Math.abs(i) < 11 - Math.max(0, (8 - j)); if (!cab && !cuerpo) continue; const X = x + i, Y = 70 + j;
      if ((X >= 26 && X <= 274 && Y >= 16 && Y <= 142) || ((X + Y) & 1)) continue; R.pset(X, Y, hex(cab ? '#6a5a5a' : c)); } R.recorte(null); }
  // el cartucho sucio al cuádruple y el polvo que flota en la luz del foco
  e_sombra(R, 150, 124, 26, 2, 0.35);
  e_cartuchoSucio(R, 150, 124, 4);
  e_halo(R, 150, 60, 70, 40, M.luz, 0.14);
  for (let k = 0; k < 18; k++) { const x = 70 + Math.round((h(k, 1, 726) * 160 + Math.sin(t * 0.5 + k) * 5) % 170), y = 26 + Math.round((h(k, 2, 726) * 90 + t * (1.5 + (k % 3))) % 90); if (Math.sin(t * 1.7 + k * 2) > -0.2) R.pset(x, y, hex('#fff8e0')); }
  // los reflejos del cristal: dos bandas que se deslizan despacio
  for (const [v, w, a, k] of [[9, 10, 0.16, 0], [6, 4, 0.22, 1]]) { const g = ((t * v + k * 120) % 340) - 60; for (let y = 21; y < 136; y++) { const xa = Math.round(g + (136 - y) * 0.5); for (let x = xa; x < xa + w; x++) if (x > 30 && x < 270) R.pset(x, y, e_mezcla(R.pget(x, y), C.blanco, a)); } }
  return { suelo: 143, vitrina: [31, 21, 269, 135], cartucho: [150, 124], caja: [222, 128], tarjeta: [58, 104, 101, 123] };
}

// los blísteres colgados del tablero de arriba (x 96–156 y 186–266, y 15–43, por debajo de la barra del año): el gancho, el cartón de color con su
// agujero, la burbuja de plástico con el brillo y dentro un mando (palanca con su botón rojo o la rueda de un paddle)
function b_blisteres(R) {
  const { rect, pset, linea, disco } = R, P = b_P;
  [96, 118, 140, 186, 208, 230, 252].forEach((x, i) => {
    const y = 19 + (i % 2) * 2, c = b_mez(hex(b_CHILLON_HEX[b_CHILLON[(i * 3 + 1) % 8]]), P.negro, 0.22);
    linea(x + 7, 15, x + 7, y + 2, P.gondD); pset(x + 7, 15, P.gondS); rect(x + 6, 15, x + 8, 15, P.gondD);
    rect(x + 1, y + 1, x + 15, y + 24, b_mez(P.pegH, P.negro, 0.3));
    rect(x, y, x + 14, y + 23, c); rect(x, y, x + 14, y, b_mez(c, P.crema, 0.3)); rect(x + 14, y, x + 14, y + 23, b_mez(c, P.negro, 0.3));
    rect(x + 6, y + 2, x + 8, y + 3, b_mez(P.pegH, P.negro, 0.4));
    rect(x + 2, y + 6, x + 12, y + 21, b_mez(c, P.crema, 0.35)); rect(x + 2, y + 6, x + 12, y + 6, P.crema); rect(x + 2, y + 6, x + 2, y + 21, b_mez(P.crema, c, 0.3));
    if (i % 3 === 2) { disco(x + 7, y + 13, 4, hex('#2a2628')); disco(x + 7, y + 13, 2, P.gris); pset(x + 7, y + 10, P.crema); rect(x + 5, y + 18, x + 9, y + 19, hex('#2a2628')); }
    else { rect(x + 4, y + 16, x + 10, y + 20, hex('#2a2628')); rect(x + 4, y + 16, x + 10, y + 16, P.gris); rect(x + 7, y + 10, x + 7, y + 15, P.negro); disco(x + 7, y + 10, 1, P.rojo); pset(x + 9, y + 18, P.rojo); }
    pset(x + 11, y + 8, P.papel); pset(x + 11, y + 9, P.papel); pset(x + 3, y + 20, P.papel);
    rect(x + 1, y + 22, x + 13, y + 22, b_mez(c, P.negro, 0.35));
  });
}

// los dibujos impresos en las cajas (6 × 6, los de las etiquetas de PIEZAS_AT, sin letras ni marcas): el bocadito de queso
// con agujeros ('comecocos'), el muñequito sobre el foso, la nave, la flor y la consola con su franja de madera
const b_ICO = {
  comecocos: ['.YYY..', 'YYYyY.', 'YyYYYY', 'YYYYyY', 'YYyYYY', '.YYYY.'],
  foso: ['..S...', '.AAA..', '..A...', '.A.A..', 'VV..VV', 'VVkkVV'],
  nave: ['..A...', '..A...', '.AEA..', 'AAAAA.', 'A.R.A.', '..R...'],
  flor: ['.P.P..', 'PPYPP.', '.PPP..', '..V...', '.VV...', '..V...'],
  consola: ['......', 'kkkkkk', 'kEkkRk', 'kkkkkk', 'MMMMMM', 'kkkkkk'],
};

// los mismos en 3 × 3, para los cartones pequeños de la estantería
const b_ICO3 = { comecocos: ['YY.', 'YyY', 'YYY'], foso: ['.S.', '.A.', 'kkk'], nave: ['.A.', 'AEA', 'R.R'], flor: ['.P.', 'PYP', '.V.'], consola: ['kRk', 'kkk', 'MMM'] };

const b_ICO_COL = Object.fromEntries(Object.entries({ S: '#f6c290', Y: '#f0d040', y: '#a8602a', V: '#3a9a4a', A: '#a8c8f0', E: '#ffffff', R: '#f0603a', P: '#f07aa8', k: '#1a1418', M: '#a8703a' }).map(([k, v]) => [k, hex(v)]));

// 'varios' (lo de por omisión): los cuatro dibujos propios, alternados
const b_VARIOS = ['comecocos', 'nave', 'flor', 'foso'];

// el dibujo que toca a la caja n con la opción ico (las de PIEZAS_AT, si solo valen esas: sin la consola)
const b_icoDe = (ico, n, pieza = false) => ico === 'varios' || !b_ICO[ico] || (pieza && ico === 'consola') ? b_VARIOS[((n % 4) + 4) % 4] : ico;

// pinta el dibujo d con la esquina de arriba a la izquierda en (x, y), cada celda de sc × sc; tono(c) lo oscurece o lo empaña
function b_icoCaja(R, x, y, d, sc = 1, tono = (c) => c, mini = false) {
  const filas = (mini ? b_ICO3 : b_ICO)[d] ?? b_ICO3.comecocos;
  filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) { const c = b_ICO_COL[f[i]]; if (c != null) R.rect(x + i * sc, y + j * sc, x + i * sc + sc - 1, y + j * sc + sc - 1, tono(c)); } });
}

// la versión de noche de un color pero iluminada por un foco cercano (se lee casi con su color de día), con memoria
const c_LUCIDO = new Map();

function c_lucido(c) {
  let n = c_LUCIDO.get(c); if (n === undefined) { n = c_mezcla(c_oscuro(c), c, 0.82); c_LUCIDO.set(c, n); } return n;
}

// la noche de luna del fondo de la fosa (más clara y con más contraste que c_oscuro), con memoria
const c_LUNAR = new Map();

function c_lunar(c) {
  let n = c_LUNAR.get(c); if (n === undefined) { n = c_mezcla(c_oscuro(c), c, 0.3); c_LUNAR.set(c, n); } return n;
}

// un charco de luz cálida tramado en bandas (elipse de centro cx, cy y radios rx, ry; fuerza máx. de mezcla): aclara lo
// que ya está pintado, con tres escalones de luz y el tramado ordenado entre ellos
function c_charcoLuz(R, cx, cy, rx, ry, fuerza, col = CD.luz) {
  const B = R.buf, x0 = Math.max(0, Math.round(cx - rx)), x1 = Math.min(319, Math.round(cx + rx)), y0 = Math.max(0, Math.round(cy - ry)), y1 = Math.min(179, Math.round(cy + ry));
  for (let y = y0; y <= y1; y++) { const dy = ((y - cy) / ry) ** 2; for (let x = x0; x <= x1; x++) { const d = ((x - cx) / rx) ** 2 + dy; if (d >= 1) continue;
    const l = Math.min(3, Math.floor((1 - d) * 3 + c_umbral(x, y))); if (l > 0) B[y * 320 + x] = c_mezcla(B[y * 320 + x], col, fuerza * [0, 0.38, 0.7, 1][l]); } }
}

// el foco de la torre de noche sobre la fosa de cerca (0–1): un charco ancho centrado abajo a la izquierda del foco
const c_focoCem = (x, y) => { const d = ((x - 150) / 128) ** 2 + ((y - 126) / 62) ** 2; return d < 1 ? 1 - d : 0; };
